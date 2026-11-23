#!/usr/bin/env node
/**
 * 《北宋立志传》3D 演武场（即梦 + Tripo3D）可断点续跑资产管线
 *
 * 用法：
 *   node scripts/gen_combat3d_assets.mjs --list             # 列出当前 3D 资产清单与本地状态（零扣费）
 *   node scripts/gen_combat3d_assets.mjs --quote            # 查询即梦积分余额 & Tripo3D 账户余额（零扣费）
 *   node scripts/gen_combat3d_assets.mjs --run-tripo        # 上传设定图至 Tripo3D、生模、自动绑骨并下载 .glb
 */

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(ROOT_DIR, 'assets_raw_masters', 'combat3d', 'manifest.json')
const CONCEPTS_DIR = path.join(ROOT_DIR, 'assets_raw_masters', 'combat3d', 'concepts')
const OUT_MODELS_DIR = path.join(ROOT_DIR, 'public', 'assets', 'combat3d', 'models')

const TRIPO_BASE = 'https://api.tripo3d.ai/v2/openapi'

const TRIPO_JOBS = [
  { id: 'npc_NPC-0104', name: '慕容博（宗师3D建模）', conceptFile: 'npc_NPC-0104.jpg', targetGlb: 'npc_NPC-0104.glb', needsRig: true, faceLimit: 12000 },
  { id: 'npc_NPC-0105', name: '萧远山（宗师3D建模）', conceptFile: 'npc_NPC-0105.jpg', targetGlb: 'npc_NPC-0105.glb', needsRig: true, faceLimit: 12000 },
  { id: 'prop_shaolin_censer', name: '少林青铜三足香炉', conceptFile: 'prop_shaolin_censer.jpg', targetGlb: 'prop_shaolin_censer.glb', needsRig: false, faceLimit: 7000 },
  { id: 'prop_shaolin_pillar', name: '少林八角青石经幢灯柱', conceptFile: 'prop_shaolin_pillar.jpg', targetGlb: 'prop_shaolin_pillar.glb', needsRig: false, faceLimit: 7000 },
]

function loadEnvLocal() {
  const envPath = path.join(ROOT_DIR, '.env.local')
  const map = {}
  if (!fs.existsSync(envPath)) return map
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/.exec(line)
    if (m) map[m[1]] = m[2]
  }
  return map
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { updatedAt: null, items: {} }
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'))
}

function saveManifest(manifest) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  manifest.updatedAt = new Date().toISOString()
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
}

async function checkBalances() {
  const env = loadEnvLocal()
  const tripoKey = process.env.TRIPO_API_KEY || env.TRIPO_API_KEY
  if (tripoKey) {
    try {
      const res = await fetch(`${TRIPO_BASE}/user/balance`, {
        headers: { Authorization: `Bearer ${tripoKey}` },
      })
      const json = await res.json()
      console.log('[Tripo3D] 余额查询:', JSON.stringify(json))
    } catch (err) {
      console.log('[Tripo3D] 查询失败:', err.message)
    }
  } else {
    console.log('[Tripo3D] 未配置 TRIPO_API_KEY')
  }

  const jimengBin = process.platform === 'win32'
    ? path.join(process.env.USERPROFILE || '', 'bin', 'dreamina-canvas.exe')
    : 'dreamina-canvas'
  const jimengRes = spawnSync(jimengBin, ['auth', 'account', '--format', 'json'], { encoding: 'utf-8' })
  if (jimengRes.status === 0) {
    console.log('[即梦 CLI] 账号与积分:', jimengRes.stdout.trim())
  } else {
    console.log('[即梦 CLI] 未登录或不可用:', (jimengRes.stderr || jimengRes.stdout || '').trim())
  }
}

async function uploadImageToTripo(apiKey, filePath) {
  const buf = fs.readFileSync(filePath)
  const form = new FormData()
  form.append('file', new Blob([buf], { type: 'image/png' }), path.basename(filePath))
  const res = await fetch(`${TRIPO_BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  })
  return await res.json()
}

async function createTripoTask(apiKey, payload) {
  const res = await fetch(`${TRIPO_BASE}/task`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return await res.json()
}

async function pollTripoTask(apiKey, taskId, timeoutMs = 300000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${TRIPO_BASE}/task/${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    const json = await res.json()
    const status = json?.data?.status
    if (status === 'success' || status === 'failed' || status === 'cancelled' || status === 'unknown') {
      return json
    }
    await new Promise((r) => setTimeout(r, 3500))
  }
  throw new Error(`Tripo task ${taskId} timed out after ${timeoutMs}ms`)
}

async function runTripoPipeline(manifest) {
  const env = loadEnvLocal()
  const apiKey = process.env.TRIPO_API_KEY || env.TRIPO_API_KEY
  if (!apiKey) {
    throw new Error('未找到 TRIPO_API_KEY（请检查 .env.local）')
  }
  fs.mkdirSync(OUT_MODELS_DIR, { recursive: true })

  for (const job of TRIPO_JOBS) {
    const outPath = path.join(OUT_MODELS_DIR, job.targetGlb)
    if (fs.existsSync(outPath)) {
      console.log(`[跳过] ${job.id} 已存在目标模型: ${outPath}`)
      continue
    }
    const conceptPath = path.join(CONCEPTS_DIR, job.conceptFile)
    if (!fs.existsSync(conceptPath)) {
      console.log(`[跳过] ${job.id} 缺少设定图: ${conceptPath}`)
      continue
    }

    const entry = (manifest.items[job.id] = manifest.items[job.id] || {})

    const ensureUpload = async (forceReupload = false) => {
      if (!forceReupload && entry.imageToken) return true
      console.log(`[Tripo3D] 正在上传设定图 ${job.conceptFile}...`)
      const up = await uploadImageToTripo(apiKey, conceptPath)
      if (up.code !== 0 || !up.data?.image_token) {
        console.log(`[Tripo3D] 上传失败 (${job.id}):`, JSON.stringify(up))
        saveManifest(manifest)
        return false
      }
      entry.imageToken = up.data.image_token
      entry.status = 'uploaded'
      saveManifest(manifest)
      console.log(`[Tripo3D] 上传成功 image_token=${entry.imageToken}`)
      return true
    }

    if (!(await ensureUpload(false))) continue

    if (!entry.modelTaskId) {
      console.log(`[Tripo3D] 提交 image_to_model 任务: ${job.id}...`)
      let taskRes = await createTripoTask(apiKey, {
        type: 'image_to_model',
        file: { type: 'png', file_token: entry.imageToken },
        face_limit: job.faceLimit,
      })
      if (taskRes.code !== 0) {
        // 兼容参数不支持 face_limit 或隔夜 imageToken 过期
        const reuploaded = await ensureUpload(true)
        if (reuploaded) {
          taskRes = await createTripoTask(apiKey, {
            type: 'image_to_model',
            file: { type: 'png', file_token: entry.imageToken },
            face_limit: job.faceLimit,
          })
          if (taskRes.code !== 0) {
            taskRes = await createTripoTask(apiKey, {
              type: 'image_to_model',
              file: { type: 'png', file_token: entry.imageToken },
            })
          }
        }
      }
      if (taskRes.code !== 0 || !taskRes.data?.task_id) {
        entry.status = 'blocked_or_failed'
        entry.lastError = taskRes
        saveManifest(manifest)
        console.log(`[Tripo3D] 任务未受理 (${job.id}):`, JSON.stringify(taskRes))
        continue
      }
      entry.modelTaskId = taskRes.data.task_id
      entry.status = 'modeling'
      saveManifest(manifest)
      console.log(`[Tripo3D] 已受理 modelTaskId=${entry.modelTaskId}`)
    }

    const modelDone = await pollTripoTask(apiKey, entry.modelTaskId)
    if (modelDone?.data?.status !== 'success') {
      entry.status = 'model_failed'
      entry.lastError = modelDone
      saveManifest(manifest)
      console.log(`[Tripo3D] 建模失败 (${job.id}):`, JSON.stringify(modelDone))
      continue
    }

    let finalModelUrl =
      modelDone?.data?.output?.pbr_model ||
      modelDone?.data?.output?.model ||
      modelDone?.data?.output?.base_model

    if (job.needsRig) {
      if (!entry.rigTaskId) {
        console.log(`[Tripo3D] 提交 animate_rig 自动绑骨: ${job.id}...`)
        let rigTask = await createTripoTask(apiKey, {
          type: 'animate_rig',
          original_model_task_id: entry.modelTaskId,
          out_format: 'glb',
          spec: 'mixamo',
        })
        if (rigTask.code !== 0) {
          rigTask = await createTripoTask(apiKey, {
            type: 'animate_rig',
            original_model_task_id: entry.modelTaskId,
            out_format: 'glb',
          })
        }
        if (rigTask.code === 0 && rigTask.data?.task_id) {
          entry.rigTaskId = rigTask.data.task_id
          saveManifest(manifest)
        } else {
          console.log(`[Tripo3D] 绑骨请求失败 (${job.id})，将回退静态模型:`, JSON.stringify(rigTask))
        }
      }

      if (entry.rigTaskId) {
        const rigDone = await pollTripoTask(apiKey, entry.rigTaskId)
        if (rigDone?.data?.status === 'success') {
          finalModelUrl =
            rigDone?.data?.output?.model ||
            rigDone?.data?.output?.pbr_model ||
            finalModelUrl
          entry.rigged = true
        } else {
          console.log(`[Tripo3D] 绑骨未成功 (${job.id})，回退静态模型:`, JSON.stringify(rigDone))
        }
      }
    }

    if (finalModelUrl) {
      const dlRes = await fetch(finalModelUrl)
      const ab = await dlRes.arrayBuffer()
      fs.writeFileSync(outPath, Buffer.from(ab))
      entry.status = 'ready'
      saveManifest(manifest)
      console.log(`[Tripo3D] 已保存模型 -> ${outPath} (${ab.byteLength} bytes)`)
    }
  }
}

async function main() {
  const args = new Set(process.argv.slice(2))
  const manifest = loadManifest()

  if (args.has('--quote')) {
    await checkBalances()
    return
  }

  if (args.has('--run-tripo')) {
    await runTripoPipeline(manifest)
    return
  }

  console.log('=== 《北宋立志传》3D 演武场资产清单（默认零扣费预览）===')
  for (const job of TRIPO_JOBS) {
    const outPath = path.join(OUT_MODELS_DIR, job.targetGlb)
    const exists = fs.existsSync(outPath)
    const status = manifest.items[job.id]?.status || (exists ? 'ready' : 'procedural_fallback')
    console.log(`- [${status}] ${job.id} (${job.name}) -> public/assets/combat3d/models/${job.targetGlb}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
