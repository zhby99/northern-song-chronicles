import type { SaveSlotId } from '../types/game'

export const CURRENT_SAVE_SCHEMA_VERSION = 'M1.5.5' as const

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

export function purgeLegacySaveDatabases(): void {
  if (legacyPurged) return
  legacyPurged = true

  try {
    if (typeof localStorage !== 'undefined') {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i += 1) {
        const k = localStorage.key(i)
        if (k && LEGACY_LS_PREFIXES.some((p) => k.startsWith(p))) {
          keysToRemove.push(k)
        }
      }
      for (const k of keysToRemove) {
        localStorage.removeItem(k)
      }
    }
  } catch {
    // ignore storage errors
  }

  try {
    if (typeof indexedDB !== 'undefined') {
      for (const legacyDb of LEGACY_IDB_DB_NAMES) {
        indexedDB.deleteDatabase(legacyDb)
      }
    }
  } catch {
    // ignore indexedDB errors
  }
}

function isValidSchemaEnvelopeRecord(rec: unknown): boolean {
  if (!rec || typeof rec !== 'object' || Array.isArray(rec)) return false
  const obj = rec as Record<string, unknown>
  return (
    obj.schemaVersion === CURRENT_SAVE_SCHEMA_VERSION &&
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
