#!/usr/bin/env node
/**
 * 单文件预览包 (build:artifact) 专用 Node.js 增量缓存资源压缩器：
 * - 绝不修改 public/assets/ 下的原始运行时素材；
 * - 压缩产物按 (profileVersion, relUrl, size, mtimeNs, specTag) 缓存在 node_modules/.cache/nsc-artifact-pack/；
 * - 使用 sharp (libvips) 并行压缩图片并保留立绘抠图 (RGBA WebP) 透明通道；
 * - 使用 ffmpeg-static (或系统 ffmpeg) 将 >0.85MB 音频重编码为 56kbps 立体声 MP3 (-vn 剥离内嵌封面)。
 */

import { spawn, spawnSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegStaticPath from 'ffmpeg-static'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const PUBLIC_ASSETS_DIR = path.join(PUBLIC_DIR, 'assets')
const CACHE_DIR = path.join(ROOT_DIR, 'node_modules', '.cache', 'nsc-artifact-pack')
const BLOBS_DIR = path.join(CACHE_DIR, 'blobs')

const PROFILE_VERSION = 'v3-node'
const IMAGE_EXT_RE = /\.(jpg|jpeg|png|webp|gif|svg)$/i
const AUDIO_EXT_RE = /\.(mp3|m4a|ogg|opus|wav|aac|flac|webm)$/i
const AUDIO_TRANSCODE_MIN_BYTES = Math.floor(0.85 * 1024 * 1024)

function resolveFfmpegBin() {
  if (typeof ffmpegStaticPath === 'string' && ffmpegStaticPath && fs.existsSync(ffmpegStaticPath)) {
    return ffmpegStaticPath
  }
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' })
  if (!probe.error && probe.status === 0) {
    return 'ffmpeg'
  }
  return null
}

const FFMPEG_BIN = resolveFfmpegBin()
const HAS_FFMPEG = FFMPEG_BIN !== null

function sniffImageMime(fileName, buf) {
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buf.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp'
  }
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
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

function classifyImageSpec(relUrl) {
  if (relUrl.startsWith('/assets/characters/avatars/')) return { maxDim: 144, quality: 70 }
  if (relUrl.startsWith('/assets/items/')) return { maxDim: 176, quality: 72 }
  if (relUrl.startsWith('/assets/characters/cutouts/')) {
    return { maxDim: 480, quality: 62, alphaQuality: 70 }
  }
  if (relUrl.startsWith('/assets/characters/')) return { maxDim: 480, quality: 60 }
  if (relUrl.startsWith('/assets/regions/')) return { maxDim: 1024, quality: 70 }
  if (relUrl.startsWith('/assets/quests/')) return { maxDim: 720, quality: 56 }
  if (relUrl.startsWith('/assets/buildings/')) return { maxDim: 760, quality: 58 }
  return { maxDim: 760, quality: 60 }
}

function runFfmpegTranscode(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      FFMPEG_BIN,
      [
        '-y',
        '-v',
        'error',
        '-i',
        inputPath,
        '-vn',
        '-ac',
        '2',
        '-ar',
        '44100',
        '-c:a',
        'libmp3lame',
        '-b:a',
        '56k',
        outputPath,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    )

    let stderr = ''
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString('utf-8')
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`ffmpeg exited with code ${code}: ${stderr.trim()}`))
      }
    })
  })
}

async function optimizeImage(relUrl, fullPath, raw) {
  const ext = path.extname(fullPath).toLowerCase()
  if (ext === '.svg' || ext === '.gif') {
    return {
      outBytes: raw,
      outMime: sniffImageMime(fullPath, raw),
    }
  }

  const { maxDim, quality, alphaQuality } = classifyImageSpec(relUrl)
  try {
    const pipeline = sharp(raw, { failOn: 'none' }).rotate()
    const meta = await pipeline.metadata()
    const width = meta.width ?? 0
    const height = meta.height ?? 0
    if (Math.max(width, height) > maxDim) {
      pipeline.resize({
        width: maxDim,
        height: maxDim,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }
    const webpOpts =
      alphaQuality !== undefined ? { quality, alphaQuality, effort: 4 } : { quality, effort: 4 }
    const candidate = await pipeline.webp(webpOpts).toBuffer()
    if (candidate.length > 0 && candidate.length < raw.length) {
      return {
        outBytes: candidate,
        outMime: 'image/webp',
      }
    }
  } catch {
    // Fall back to raw bytes on decode/transform error
  }

  return {
    outBytes: raw,
    outMime: sniffImageMime(fullPath, raw),
  }
}

async function optimizeAudio(fullPath, raw, cacheKey) {
  if (HAS_FFMPEG && raw.length > AUDIO_TRANSCODE_MIN_BYTES) {
    const tmpMp3 = path.join(BLOBS_DIR, `${cacheKey}.tmp.mp3`)
    try {
      await runFfmpegTranscode(fullPath, tmpMp3)
      const candidate = await fs.promises.readFile(tmpMp3)
      if (candidate.length > 0 && candidate.length < Math.floor(raw.length * 0.92)) {
        return {
          outBytes: candidate,
          outMime: 'audio/mpeg',
        }
      }
    } catch {
      // Fall back to raw bytes on transcode error
    } finally {
      await fs.promises.rm(tmpMp3, { force: true }).catch(() => {})
    }
  }

  return {
    outBytes: raw,
    outMime: sniffAudioMime(fullPath, raw),
  }
}

async function processOneItem(task) {
  const { relUrl, fullPath, kind, cacheKey } = task
  const blobPath = path.join(BLOBS_DIR, `${cacheKey}.bin`)
  const metaPath = path.join(BLOBS_DIR, `${cacheKey}.json`)

  if (fs.existsSync(blobPath) && fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(await fs.promises.readFile(metaPath, 'utf-8'))
      return {
        relUrl,
        blobPath,
        mime: meta.mime,
        origBytes: meta.origBytes,
        optBytes: meta.optBytes,
        kind,
        cached: true,
      }
    } catch {
      // Cache entry corrupt; regenerate
    }
  }

  const raw = await fs.promises.readFile(fullPath)
  const origBytes = raw.length
  const { outBytes, outMime } =
    kind === 'image'
      ? await optimizeImage(relUrl, fullPath, raw)
      : await optimizeAudio(fullPath, raw, cacheKey)

  await fs.promises.writeFile(blobPath, outBytes)
  await fs.promises.writeFile(
    metaPath,
    JSON.stringify({
      mime: outMime,
      origBytes,
      optBytes: outBytes.length,
    }),
    'utf-8',
  )

  return {
    relUrl,
    blobPath,
    mime: outMime,
    origBytes,
    optBytes: outBytes.length,
    kind,
    cached: false,
  }
}

function collectTasks() {
  /** @type {Array<{ relUrl: string; fullPath: string; kind: 'image' | 'audio'; cacheKey: string }>} */
  const tasks = []
  if (!fs.existsSync(PUBLIC_ASSETS_DIR)) return tasks

  function walk(dirAbs) {
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dirAbs, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }
      if (!entry.isFile()) continue

      const relPosix = path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/')
      const relUrl = `/${relPosix}`
      const isInAudio = relUrl.startsWith('/assets/audio/')

      let kind
      let specTag
      if (!isInAudio && IMAGE_EXT_RE.test(entry.name)) {
        kind = 'image'
        const spec = classifyImageSpec(relUrl)
        specTag =
          spec.alphaQuality !== undefined
            ? `${spec.maxDim}x${spec.quality}x${spec.alphaQuality}`
            : `${spec.maxDim}x${spec.quality}`
      } else if (isInAudio && AUDIO_EXT_RE.test(entry.name)) {
        kind = 'audio'
        specTag = `mp3_56k_ffmpeg=${HAS_FFMPEG}`
      } else {
        continue
      }

      const st = fs.statSync(fullPath, { bigint: true })
      const keySrc = `${PROFILE_VERSION}|${relUrl}|${st.size}|${st.mtimeNs}|${specTag}`
      const cacheKey = crypto.createHash('sha1').update(keySrc).digest('hex')
      tasks.push({ relUrl, fullPath, kind, cacheKey })
    }
  }

  walk(PUBLIC_ASSETS_DIR)
  tasks.sort((a, b) => a.relUrl.localeCompare(b.relUrl))
  return tasks
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length)
  let nextIdx = 0

  async function runWorker() {
    while (true) {
      const idx = nextIdx
      nextIdx += 1
      if (idx >= items.length) return
      results[idx] = await worker(items[idx])
    }
  }

  const poolSize = Math.min(concurrency, Math.max(1, items.length))
  await Promise.all(Array.from({ length: poolSize }, () => runWorker()))
  return results
}

async function main() {
  fs.mkdirSync(BLOBS_DIR, { recursive: true })
  const tasks = collectTasks()
  const imageTasks = tasks.filter((t) => t.kind === 'image')
  const audioTasks = tasks.filter((t) => t.kind === 'audio')

  const cpuCount = os.cpus().length || 4
  const imageConcurrency = Math.min(8, Math.max(2, cpuCount))
  const audioConcurrency = Math.min(4, Math.max(2, Math.floor(cpuCount / 2)))

  const [imageResults, audioResults] = await Promise.all([
    runPool(imageTasks, imageConcurrency, processOneItem),
    runPool(audioTasks, audioConcurrency, processOneItem),
  ])

  const allResults = [...imageResults, ...audioResults].sort((a, b) =>
    a.relUrl.localeCompare(b.relUrl),
  )

  const manifestItems = allResults.map(({ kind: _kind, ...item }) => item)
  const manifestOut = path.join(CACHE_DIR, 'manifest.json')
  fs.writeFileSync(
    manifestOut,
    JSON.stringify({ version: PROFILE_VERSION, items: manifestItems }),
    'utf-8',
  )

  const sumOrig = (arr) => arr.reduce((acc, r) => acc + r.origBytes, 0)
  const sumOpt = (arr) => arr.reduce((acc, r) => acc + r.optBytes, 0)
  const origTotal = sumOrig(allResults)
  const optTotal = sumOpt(allResults)
  const imgOrig = sumOrig(imageResults)
  const imgOpt = sumOpt(imageResults)
  const audOrig = sumOrig(audioResults)
  const audOpt = sumOpt(audioResults)
  const cachedHits = allResults.filter((r) => r.cached).length

  console.error(
    `[optimize:artifact:node] ${allResults.length} 项素材已就绪 ` +
      `(原始 ${(origTotal / 1048576).toFixed(1)} MB -> 压缩后 ${(optTotal / 1048576).toFixed(1)} MB | ` +
      `原画 ${(imgOrig / 1048576).toFixed(1)}->${(imgOpt / 1048576).toFixed(1)} MB, ` +
      `音频 ${(audOrig / 1048576).toFixed(1)}->${(audOpt / 1048576).toFixed(1)} MB | ` +
      `ffmpeg=${HAS_FFMPEG ? 'on' : 'off'} | 缓存命中 ${cachedHits}/${allResults.length})`,
  )
}

main().catch((err) => {
  console.error('[optimize:artifact:node] 压缩失败:', err)
  process.exit(1)
})
