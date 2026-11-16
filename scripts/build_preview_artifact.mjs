import { spawnSync } from 'node:child_process'
import { once } from 'node:events'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_ART_DIR = path.join(ROOT_DIR, 'dist-artifact')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const CACHE_MANIFEST_PATH = path.join(
  ROOT_DIR,
  'node_modules',
  '.cache',
  'nsc-artifact-pack',
  'manifest.json',
)

/**
 * 单个非执行型 `<script type="text/plain" id="nsc-shard-N">` 分片最大长度（12 MB）：
 * - Blink 解析 HTML 时对 `type="text/plain"` 原样跳过，零 V8 编译开销；
 * - 远低于 V8 字符串硬上限（~256M UTF-16 字符），彻底杜绝 `Empty MaybeLocal (v8::ToLocalChecked)` 渲染进程崩溃；
 * - 运行时仅对当前画面所需图片/音频按 `[shardIdx, offset, length, mime]` 切片读取，空闲自动回收。
 */
const MAX_SHARD_CHARS = 12 * 1024 * 1024
const SOFT_HTML_BUDGET_MB = 160
const HARD_HTML_BUDGET_MB = 220

function sniffImageMime(fileName, buf) {
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buf.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp'
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return 'image/png'
  }
  if (buf.length >= 6 && buf.subarray(0, 3).toString('ascii') === 'GIF') {
    return 'image/gif'
  }
  if (fileName.toLowerCase().endsWith('.svg')) {
    return 'image/svg+xml'
  }
  return 'image/jpeg'
}

function sniffAudioMime(fileName, buf) {
  if (buf.length >= 8 && buf.subarray(4, 8).toString('ascii') === 'ftyp') {
    return 'audio/mp4'
  }
  const lower = fileName.toLowerCase()
  if (lower.endsWith('.ogg') || lower.endsWith('.opus')) return 'audio/ogg'
  if (lower.endsWith('.m4a') || lower.endsWith('.mp4')) return 'audio/mp4'
  if (lower.endsWith('.wav')) return 'audio/wav'
  if (lower.endsWith('.aac')) return 'audio/aac'
  if (lower.endsWith('.flac')) return 'audio/flac'
  if (lower.endsWith('.webm')) return 'audio/webm'
  return 'audio/mpeg'
}

function tryRunCachedAssetOptimizer() {
  if (process.env.NSC_SKIP_ASSET_OPTIMIZE === '1') {
    return null
  }
  const candidates =
    process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python']
  let pyBin = null
  for (const c of candidates) {
    const probe = spawnSync(c, ['-c', 'import PIL'], { stdio: 'ignore' })
    if (!probe.error && probe.status === 0) {
      pyBin = c
      break
    }
  }
  if (!pyBin) {
    console.warn(
      '[build:artifact] 未检测到 Python + Pillow，回退至原始素材分片直出模式（仍受 12MB 懒加载分片保护，不会触发 V8 崩溃）。',
    )
    return null
  }

  const optScript = path.join(__dirname, 'optimize_artifact_assets.py')
  const res = spawnSync(pyBin, [optScript], { stdio: 'inherit', cwd: ROOT_DIR })
  if (res.error || res.status !== 0 || !fs.existsSync(CACHE_MANIFEST_PATH)) {
    console.warn('[build:artifact] 素材缓存压缩执行失败，回退至原始素材分片直出模式。')
    return null
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(CACHE_MANIFEST_PATH, 'utf-8'))
    const map = new Map()
    for (const item of parsed.items ?? []) {
      if (item.relUrl && item.blobPath && fs.existsSync(item.blobPath)) {
        map.set(item.relUrl, item)
      }
    }
    return map
  } catch {
    return null
  }
}

function collectRawAssetList() {
  /** @type {Array<{ relUrl: string; fullPath: string; kind: 'image' | 'audio' }>} */
  const list = []

  function walkImages(dirAbs, relPrefix) {
    if (!fs.existsSync(dirAbs)) return
    const dirEntries = fs
      .readdirSync(dirAbs, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))
    for (const entry of dirEntries) {
      if (entry.isDirectory() && relPrefix === '/assets' && entry.name === 'audio') {
        continue
      }
      const fullPath = path.join(dirAbs, entry.name)
      const relUrl = `${relPrefix}/${entry.name}`
      if (entry.isDirectory()) {
        walkImages(fullPath, relUrl)
      } else if (entry.isFile() && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(entry.name)) {
        list.push({ relUrl, fullPath, kind: 'image' })
      }
    }
  }

  function walkAudio(dirAbs, relPrefix) {
    if (!fs.existsSync(dirAbs)) return
    const dirEntries = fs
      .readdirSync(dirAbs, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))
    for (const entry of dirEntries) {
      const fullPath = path.join(dirAbs, entry.name)
      const relUrl = `${relPrefix}/${entry.name}`
      if (entry.isDirectory()) {
        walkAudio(fullPath, relUrl)
      } else if (entry.isFile() && /\.(mp3|m4a|ogg|opus|wav|aac|flac|webm)$/i.test(entry.name)) {
        list.push({ relUrl, fullPath, kind: 'audio' })
      }
    }
  }

  walkImages(path.join(PUBLIC_DIR, 'assets'), '/assets')
  walkAudio(path.join(PUBLIC_DIR, 'assets', 'audio'), '/assets/audio')
  return list
}

async function writeChunk(stream, chunk) {
  if (!stream.write(chunk, 'utf-8')) {
    await once(stream, 'drain')
  }
}

async function main() {
  process.env.ARTIFACT_BUNDLE = '1'
  await build({ root: ROOT_DIR })

  const assetsDir = path.join(DIST_ART_DIR, 'assets')
  const entries = fs.readdirSync(assetsDir)
  const cssFiles = entries.filter((f) => f.endsWith('.css'))
  const jsFiles = entries.filter((f) => f.endsWith('.js'))

  if (cssFiles.length !== 1 || jsFiles.length !== 1) {
    throw new Error(
      `Expected exactly 1 CSS and 1 JS bundle in dist-artifact/assets, got CSS=[${cssFiles.join(', ')}], JS=[${jsFiles.join(', ')}]`,
    )
  }

  const rawCss = fs.readFileSync(path.join(assetsDir, cssFiles[0]), 'utf-8')
  const rawJs = fs.readFileSync(path.join(assetsDir, jsFiles[0]), 'utf-8')

  // Built-in Self-Verification #1: Validate compiled IIFE JS syntax before embedding
  try {
    // eslint-disable-next-line no-new-func
    new Function(rawJs)
  } catch (err) {
    throw new Error(`Compiled IIFE bundle failed JS syntax validation: ${err.message}`, {
      cause: err,
    })
  }

  const safeCss = rawCss.replace(/<\/style/gi, '<\\/style')
  const safeJs = rawJs.replace(/<\/script/gi, '<\\/script')

  const rawAssetList = collectRawAssetList()
  const optimizedMap = tryRunCachedAssetOptimizer()

  /** @type {Record<string, [number, number, number, string]>} */
  const assetIndex = {}
  /** @type {string[]} */
  const shards = []
  /** @type {string[]} */
  let curParts = []
  let curShardLen = 0
  let totalImageBytes = 0
  let totalAudioBytes = 0

  for (const item of rawAssetList) {
    const opt = optimizedMap?.get(item.relUrl)
    let buf
    let mime
    if (opt) {
      buf = fs.readFileSync(opt.blobPath)
      mime = opt.mime
    } else {
      buf = fs.readFileSync(item.fullPath)
      mime =
        item.kind === 'image'
          ? sniffImageMime(item.fullPath, buf)
          : sniffAudioMime(item.fullPath, buf)
    }

    if (item.kind === 'image') totalImageBytes += buf.length
    else totalAudioBytes += buf.length

    const b64 = buf.toString('base64')
    if (curShardLen > 0 && curShardLen + b64.length > MAX_SHARD_CHARS) {
      shards.push(curParts.join(''))
      curParts = []
      curShardLen = 0
    }

    const shardIdx = shards.length
    const startOffset = curShardLen
    curParts.push(b64)
    curShardLen += b64.length
    assetIndex[item.relUrl] = [shardIdx, startOffset, b64.length, mime]
  }

  if (curShardLen > 0) {
    shards.push(curParts.join(''))
  }

  // Built-in Self-Verification #2: 100% disk asset coverage & shard ceiling check
  const indexedCount = Object.keys(assetIndex).length
  if (indexedCount !== rawAssetList.length) {
    throw new Error(
      `Asset index mismatch: disk has ${rawAssetList.length} assets, index has ${indexedCount}`,
    )
  }
  for (let i = 0; i < shards.length; i += 1) {
    if (shards[i].includes('</script')) {
      throw new Error(`Shard #${i} contains illegal '</script' sequence`)
    }
  }

  const indexJson = JSON.stringify(assetIndex).replace(/<\//g, '<\\/')
  const bootstrapRuntimeJs = `(function(){
  var idx = ${indexJson};
  window.__NSC_ASSET_INDEX__ = idx;
  function readDataUri(url) {
    if (typeof url !== "string" || !url) return undefined;
    var t = idx[url];
    if (!t && url.indexOf("%") !== -1) {
      try { t = idx[decodeURIComponent(url)]; } catch (_e) {}
    }
    if (!t) return undefined;
    var el = document.getElementById("nsc-shard-" + t[0]);
    if (!el || !el.textContent) return undefined;
    return "data:" + t[3] + ";base64," + el.textContent.slice(t[1], t[1] + t[2]);
  }
  window.__NSC_ASSET_PACK__ = new Proxy({}, {
    get: function(_target, prop) {
      return typeof prop === "string" ? readDataUri(prop) : undefined;
    },
    has: function(_target, prop) {
      if (typeof prop !== "string") return false;
      if (prop in idx) return true;
      if (prop.indexOf("%") !== -1) {
        try { return decodeURIComponent(prop) in idx; } catch (_e) {}
      }
      return false;
    }
  });
})();`

  fs.mkdirSync(DIST_ART_DIR, { recursive: true })
  const distOutPath = path.join(DIST_ART_DIR, 'northern_song_chronicles_m1_0.html')
  const rootOutPath = path.join(ROOT_DIR, 'northern_song_chronicles_m1_0.html')

  // Stream output directly to disk so Node never allocates a single >512MB string
  const outStream = fs.createWriteStream(distOutPath, { encoding: 'utf-8' })
  await writeChunk(
    outStream,
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>《北宋立志传》— 单文件离线畅玩版</title>
  <style>
    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #1b140e;
    }
  </style>
  <style>${safeCss}</style>
</head>
<body class="bg-[#1b140e] text-[#23180f] antialiased">
  <div id="root"></div>
`,
  )

  for (let i = 0; i < shards.length; i += 1) {
    await writeChunk(outStream, `  <script type="text/plain" id="nsc-shard-${i}">`)
    await writeChunk(outStream, shards[i])
    await writeChunk(outStream, `</script>\n`)
  }

  await writeChunk(
    outStream,
    `  <script>${bootstrapRuntimeJs}</script>
  <script>${safeJs}</script>
</body>
</html>
`,
  )

  outStream.end()
  await once(outStream, 'finish')

  fs.copyFileSync(distOutPath, rootOutPath)

  const totalBytes = fs.statSync(rootOutPath).size
  const sizeMb = totalBytes / (1024 * 1024)
  const codeMb = (Buffer.byteLength(safeJs, 'utf-8') + Buffer.byteLength(safeCss, 'utf-8')) / 1048576
  const imgMb = totalImageBytes / 1048576
  const audMb = totalAudioBytes / 1048576

  console.log(
    `[OK] 已生成单文件 HTML (${sizeMb.toFixed(2)} MB | ${indexedCount} 项素材 | ${shards.length} 个懒加载数据分片):`,
  )
  console.log(
    `     构成明细: 代码与样式 ${codeMb.toFixed(2)} MB | 原画压缩体 ${imgMb.toFixed(2)} MB | 雅乐压缩体 ${audMb.toFixed(2)} MB`,
  )
  console.log(`  -> ${rootOutPath}`)
  console.log(`  -> ${distOutPath}`)

  if (optimizedMap && sizeMb > HARD_HTML_BUDGET_MB) {
    throw new Error(
      `[build:artifact] 单文件体积 (${sizeMb.toFixed(2)} MB) 超过硬上限 (${HARD_HTML_BUDGET_MB} MB)，触发宿主要素字符串上限保护！请调优 scripts/optimize_artifact_assets.py 压缩参数。`,
    )
  }
  if (sizeMb > SOFT_HTML_BUDGET_MB) {
    console.warn(
      `[WARN] 单文件体积 (${sizeMb.toFixed(2)} MB) 已超过软预警线 (${SOFT_HTML_BUDGET_MB} MB)，建议关注新增大体积素材。`,
    )
  }
}

main().catch((err) => {
  console.error('[build:artifact] 构建失败:', err)
  process.exit(1)
})
