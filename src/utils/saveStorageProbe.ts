import type { SaveSlotId } from '../types/game'

export const CURRENT_SAVE_SCHEMA_VERSION = 'M1.5.6' as const

/**
 * 存档结构历代版本（自 `NorthernSongChroniclesSaves_v3` 库启用起，旧→新）。
 * 递增 `CURRENT_SAVE_SCHEMA_VERSION` 时：把新版本号追加到末尾，并在 `saveMigrations.ts` 补一条迁移步骤。
 */
export const SAVE_SCHEMA_HISTORY = [
  'M1.2.0',
  'M1.3.0',
  'M1.3.1',
  'M1.4.0',
  'M1.4.1',
  'M1.5.0',
  'M1.5.1',
  'M1.5.2',
  'M1.5.3',
  'M1.5.4',
  'M1.5.5',
  CURRENT_SAVE_SCHEMA_VERSION,
] as const

/** 解析 `M主.次.修` 版本号；格式不符返回 null */
export function parseSaveSchemaVersion(v: unknown): [number, number, number] | null {
  if (typeof v !== 'string') return null
  const m = /^M(\d+)\.(\d+)\.(\d+)$/.exec(v.trim())
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

/** a < b 返回负数，相等 0，a > b 正数（无法解析者视为最旧） */
export function compareSaveSchemaVersions(a: unknown, b: unknown): number {
  const pa = parseSaveSchemaVersion(a) ?? [0, 0, 0]
  const pb = parseSaveSchemaVersion(b) ?? [0, 0, 0]
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] !== pb[i]) return pa[i]! - pb[i]!
  }
  return 0
}

/** 可读取的存档版本：历代最早版本至当前版本（含）；更新版本写出的存档不可降级读取 */
export function isSupportedSaveSchemaVersion(v: unknown): boolean {
  if (!parseSaveSchemaVersion(v)) return false
  return (
    compareSaveSchemaVersions(v, SAVE_SCHEMA_HISTORY[0]) >= 0 &&
    compareSaveSchemaVersions(v, CURRENT_SAVE_SCHEMA_VERSION) <= 0
  )
}

/** 存档出自比本游戏更新的版本（不可读取，但也绝不自动删除） */
export function isFutureSaveSchemaVersion(v: unknown): boolean {
  return Boolean(parseSaveSchemaVersion(v)) && compareSaveSchemaVersions(v, CURRENT_SAVE_SCHEMA_VERSION) > 0
}

export const LEGACY_IDB_DB_NAMES = [
  'NorthernSongChroniclesDB',
  'NorthernSongChroniclesSaves_v2',
] as const
export const LEGACY_LS_PREFIXES = ['nsc_save_v1_', 'nsc_save_v2_'] as const

export const IDB_DB_NAME = 'NorthernSongChroniclesSaves_v3'
export const IDB_DB_VERSION = 1
export const IDB_STORE_NAME = 'saves'
export const LS_FALLBACK_PREFIX = 'nsc_save_v3_'

export const ALL_SAVE_SLOT_IDS: readonly SaveSlotId[] = [
  'autosave',
  'slot-1',
  'slot-2',
  'slot-3',
  'slot-4',
  'slot-5',
  'slot-6',
]

let legacyPurged = false

/**
 * 早期 v1 / v2 存档库（M1.2.0 以前，结构已无法迁移）。
 * 存档兼容恢复后不再主动删除任何玩家数据：此函数保留为空操作，只为兼容既有调用点。
 */
export function purgeLegacySaveDatabases(): void {
  if (legacyPurged) return
  legacyPurged = true
}

function isValidSchemaEnvelopeRecord(rec: unknown): boolean {
  if (!rec || typeof rec !== 'object' || Array.isArray(rec)) return false
  const obj = rec as Record<string, unknown>
  return (
    isSupportedSaveSchemaVersion(obj.schemaVersion) &&
    typeof obj.slotId === 'string' &&
    Boolean(obj.state && typeof obj.state === 'object')
  )
}

/**
 * 零数据库依赖的轻量存档计数探针：供首屏 `<StartScreen>` 在未加载 `gameDb`（4.5MB）前
 * 快速读取有效卷宗数量，严格包裹 `try/catch` 以兼容 `file://` 与严格无源 CSP 沙箱。
 */
export async function peekExistingSaveCount(): Promise<number> {
  purgeLegacySaveDatabases()
  const foundSlots = new Set<string>()

  try {
    if (typeof indexedDB !== 'undefined') {
      const records = await new Promise<unknown[]>((resolve, reject) => {
        try {
          const req = indexedDB.open(IDB_DB_NAME, IDB_DB_VERSION)
          req.onupgradeneeded = () => {
            const db = req.result
            if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
              db.createObjectStore(IDB_STORE_NAME, { keyPath: 'slotId' })
            }
          }
          req.onsuccess = () => {
            try {
              const db = req.result
              const tx = db.transaction(IDB_STORE_NAME, 'readonly')
              const store = tx.objectStore(IDB_STORE_NAME)
              const allReq = store.getAll()
              allReq.onsuccess = () => {
                const res = Array.isArray(allReq.result) ? allReq.result : []
                db.close()
                resolve(res)
              }
              allReq.onerror = () => {
                db.close()
                reject(allReq.error ?? new Error('IDB getAll failed'))
              }
            } catch (txErr) {
              reject(txErr instanceof Error ? txErr : new Error('IDB tx failed'))
            }
          }
          req.onerror = () => reject(req.error ?? new Error('IDB open failed'))
        } catch (openErr) {
          reject(openErr instanceof Error ? openErr : new Error('IDB blocked'))
        }
      })
      for (const rec of records) {
        if (isValidSchemaEnvelopeRecord(rec)) {
          foundSlots.add((rec as { slotId: string }).slotId)
        }
      }
    }
  } catch {
    // Fallback to localStorage check below
  }

  try {
    if (typeof localStorage !== 'undefined') {
      for (const slotId of ALL_SAVE_SLOT_IDS) {
        if (foundSlots.has(slotId)) continue
        const raw = localStorage.getItem(`${LS_FALLBACK_PREFIX}${slotId}`)
        if (!raw) continue
        try {
          const parsed: unknown = JSON.parse(raw)
          if (isValidSchemaEnvelopeRecord(parsed)) {
            foundSlots.add(slotId)
          }
        } catch {
          // ignore malformed JSON
        }
      }
    }
  } catch {
    // ignore localStorage SecurityError
  }

  return foundSlots.size
}
