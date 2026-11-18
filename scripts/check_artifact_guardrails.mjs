#!/usr/bin/env node
/**
 * Layer 1 静态防回归护栏 (`scripts/check_artifact_guardrails.mjs`)
 * 挂载于 `npm run lint` 之后自动执行（耗时 < 200ms），从源头拦截会导致 `build:artifact` 损坏的四类隐患：
 * 1. 裸静态路径绑定（`<img src={rawUrl}>` 未经过 `resolveAssetUrl` / `useLazyImage` / `ManagedAssetImg` / `CutoutPortraitImg`）；
 * 2. 新增 `<audio>` / `new Audio()` 绕过 Web Audio 内联解码管线；
 * 3. 未加 `try/catch` 保护的 `localStorage` / `sessionStorage` / `indexedDB` 访问（在严格沙箱 `null` origin 下会直接白屏）；
 * 4. `vite.config.ts` 单包 IIFE 关键配置丢失，或未压缩母版大图误放入 `public/assets/`。
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const SRC_DIR = path.join(ROOT_DIR, 'src')
const PUBLIC_ASSETS_DIR = path.join(ROOT_DIR, 'public', 'assets')

const MAX_SINGLE_IMAGE_BYTES = 4.5 * 1024 * 1024 // 4.5 MB
const MAX_SINGLE_AUDIO_BYTES = 12 * 1024 * 1024 // 12 MB

/** @type {string[]} */
const errors = []

function walkFiles(dir, extRegex) {
  /** @type {string[]} */
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      results.push(...walkFiles(full, extRegex))
    } else if (ent.isFile() && extRegex.test(ent.name)) {
      results.push(full)
    }
  }
  return results
}

function lineNumberAt(text, index) {
  let line = 1
  for (let i = 0; i < index; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1
  }
  return line
}

// 1. Scan all TS/TSX/CSS files in src/
const srcFiles = walkFiles(SRC_DIR, /\.(ts|tsx|css)$/)

const SAFE_IMG_WRAPPER_FILES = new Set([
  'src/components/common/ManagedAssetImg.tsx',
  'src/components/common/CutoutPortraitImg.tsx',
  'src/components/menu/PortraitLightbox.tsx',
])

for (const absFile of srcFiles) {
  const relFile = path.relative(ROOT_DIR, absFile).replace(/\\/g, '/')
  const content = fs.readFileSync(absFile, 'utf-8')

  if (relFile.endsWith('.css')) {
    // Disallow url(/assets/...) in CSS because CSS is inlined without asset-pack rewriting
    const cssUrlRe = /url\(\s*['"]?\/assets\//g
    let m
    while ((m = cssUrlRe.exec(content)) !== null) {
      const line = lineNumberAt(content, m.index)
      errors.push(
        `${relFile}:${line} — 禁止在 CSS 中硬编码 url(/assets/...)（单文件 HTML 无法重写静态 CSS 路径），请在 TSX 中通过 resolveAssetUrl() 绑定内联样式或使用 <ManagedAssetImg>。`,
      )
    }
    continue
  }

  // Check <img ... src=...> in TSX
  if (relFile.endsWith('.tsx') && !SAFE_IMG_WRAPPER_FILES.has(relFile)) {
    const imgTagRe = /<img\b([\s\S]*?)\/>/g
    let m
    while ((m = imgTagRe.exec(content)) !== null) {
      const attrs = m[1]
      const line = lineNumberAt(content, m.index)
      const srcLiteralMatch = /\bsrc\s*=\s*['"](\/assets\/[^'"]+)['"]/.exec(attrs)
      if (srcLiteralMatch) {
        errors.push(
          `${relFile}:${line} — 检测到裸路径 <img src="${srcLiteralMatch[1]}">，在 build:artifact 单文件模式下会裂图！请改用 src={resolveAssetUrl('${srcLiteralMatch[1]}')} 或 <ManagedAssetImg>。`,
        )
        continue
      }

      const srcExprMatch = /\bsrc\s*=\s*\{([^}]+)\}/.exec(attrs)
      if (srcExprMatch) {
        const expr = srcExprMatch[1].trim()
        const isDirectResolve = expr.includes('resolveAssetUrl(')
        // Allow variables proven to come from useLazyImage(...) or resolveAssetUrl(...) in the same file
        const isHookResolvedVar =
          /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(expr) &&
          (new RegExp(`:\\s*${expr}\\b[\\s\\S]{0,80}=\\s*useLazyImage\\(`).test(content) ||
            new RegExp(`\\b${expr}\\s*=\\s*resolveAssetUrl\\(`).test(content))

        if (!isDirectResolve && !isHookResolvedVar) {
          errors.push(
            `${relFile}:${line} — <img src={${expr}}> 未经 resolveAssetUrl() 或 useLazyImage() 解析！单文件离线版无法加载原始 /assets/ 路径，请改为 src={resolveAssetUrl(${expr})} 或 <ManagedAssetImg>。`,
          )
        }
      }
    }
  }

  // Disallow raw <audio> or new Audio() (must use Web Audio bgmManager / combatSfx)
  const rawAudioRe = /\bnew\s+Audio\s*\(|<audio\b/g
  let audMatch
  while ((audMatch = rawAudioRe.exec(content)) !== null) {
    const line = lineNumberAt(content, audMatch.index)
    errors.push(
      `${relFile}:${line} — 禁止直接使用 <audio> 或 new Audio()，请统一走 bgmManager.ts / combatSfx.ts 的 Web Audio 管线以兼容单文件离线解码与 CSP 沙箱。`,
    )
  }

  // Check every Web Storage / IndexedDB API call is enclosed within an active try { ... } block
  const storageApiGlobalRe =
    /\b(?:window\.)?(?:localStorage|sessionStorage)\s*\.\s*(?:getItem|setItem|removeItem|clear|key|length)\b|\b(?:window\.)?indexedDB\s*\.\s*(?:open|deleteDatabase)\b/g
  if (storageApiGlobalRe.test(content)) {
    // Blank out comments and string/template literals while preserving character offsets & newlines
    const masked = content
      .replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, (seg) =>
        seg.replace(/[^\n]/g, ' '),
      )
    storageApiGlobalRe.lastIndex = 0
    /** @type {Array<{ start: number; end: number }>} */
    const tryRanges = []
    /** @type {Array<{ start: number; isTry: boolean }>} */
    const braceStack = []
    for (let i = 0; i < masked.length; i += 1) {
      const ch = masked[i]
      if (ch === '{') {
        const prefix = masked.slice(Math.max(0, i - 32), i)
        const isTry = /\btry\s*$/.test(prefix)
        braceStack.push({ start: i, isTry })
      } else if (ch === '}') {
        const popped = braceStack.pop()
        if (popped?.isTry) {
          tryRanges.push({ start: popped.start, end: i })
        }
      }
    }

    let stMatch
    while ((stMatch = storageApiGlobalRe.exec(masked)) !== null) {
      const pos = stMatch.index
      const enclosed = tryRanges.some((r) => pos > r.start && pos < r.end)
      if (!enclosed) {
        const line = lineNumberAt(content, pos)
        errors.push(
          `${relFile}:${line} — 调用了 ${stMatch[0].trim()} 但该调用点未被包裹在 try { ... } 块内，在严格沙箱预览 (null origin) 下会抛出 SecurityError 导致白屏。`,
        )
      }
    }
  }
}

// 2. Verify vite.config.ts single-bundle invariants
const viteConfigPath = path.join(ROOT_DIR, 'vite.config.ts')
if (fs.existsSync(viteConfigPath)) {
  const viteCfg = fs.readFileSync(viteConfigPath, 'utf-8')
  const requiredTokens = [
    ["process.env.ARTIFACT_BUNDLE === '1'", 'ARTIFACT_BUNDLE 环境变量开关'],
    ["format: 'iife'", 'IIFE 单文件输出格式'],
    ['codeSplitting: false', '禁用代码分块 (codeSplitting: false)'],
    ['copyPublicDir: false', '禁用重复拷贝 public 目录 (copyPublicDir: false)'],
    ['modulePreload: false', '禁用 ESM modulePreload 注入 (modulePreload: false)'],
  ]
  for (const [token, desc] of requiredTokens) {
    if (!viteCfg.includes(token)) {
      errors.push(`vite.config.ts — 缺少单文件构建关键配置项：${desc} (${token})`)
    }
  }
}

// 3. Check public/assets/ for accidental uncompressed raw masters
const assetFiles = walkFiles(
  PUBLIC_ASSETS_DIR,
  /\.(jpg|jpeg|png|webp|gif|svg|mp3|m4a|ogg|opus|wav|aac|flac|webm)$/i,
)
for (const absAsset of assetFiles) {
  const stat = fs.statSync(absAsset)
  const relAsset = path.relative(ROOT_DIR, absAsset).replace(/\\/g, '/')
  const isAudio = relAsset.startsWith('public/assets/audio/')
  if (!isAudio && stat.size > MAX_SINGLE_IMAGE_BYTES) {
    errors.push(
      `${relAsset} (${(stat.size / 1048576).toFixed(2)} MB) — 单张运行时图片超过 4.5 MB 上限！未压缩母版请放入 assets_raw_masters/，public/assets/ 仅存放压缩后运行时素材。`,
    )
  } else if (isAudio && stat.size > MAX_SINGLE_AUDIO_BYTES) {
    errors.push(
      `${relAsset} (${(stat.size / 1048576).toFixed(2)} MB) — 单首运行时音频超过 12 MB 上限！请压缩后再放入 public/assets/audio/。`,
    )
  }
}

if (errors.length > 0) {
  console.error(`\n❌ [artifact-guardrails] 检测到 ${errors.length} 项单文件离线版防回归违规：`)
  for (const e of errors) {
    console.error(`  - ${e}`)
  }
  process.exit(1)
} else {
  console.log(
    `✅ [artifact-guardrails] 扫描通过 (${srcFiles.length} 个源码文件, ${assetFiles.length} 项运行时素材，零裸路径/沙箱违规)。`,
  )
}
