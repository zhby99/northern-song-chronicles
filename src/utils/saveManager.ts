import type {
  EquipmentSlotKey,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameSaveEnvelope,
  InventoryStack,
  LearnedArtEntry,
  MartialArtSlotKey,
  SaveSlotId,
  SerializableGameState,
  TerrainType,
  ViewMode,
  WildernessCamp,
} from '../types/game'
import { BUILDING_DB_MAP, MARTIAL_ART_DB_MAP, REGION_DB_MAP } from '../data/gameDb'
import {
  DEFAULT_EQUIPPED_SLOTS,
  DEFAULT_INITIAL_INVENTORY,
  ITEM_DB_MAP,
} from '../data/itemsDb'
import {
  canArtFitSlot,
  DEFAULT_EQUIPPED_ARTS,
  DEFAULT_LEARNED_ARTS,
} from '../data/playerMartialArts'

export const CURRENT_SAVE_SCHEMA_VERSION = 'M1.2.0' as const

export const SAVE_SLOT_DEFS: Array<{
  slotId: SaveSlotId
  label: string
  badge: string
  isAuto?: boolean
}> = [
  { slotId: 'autosave', label: '云笈自动卷宗', badge: '自动', isAuto: true },
  { slotId: 'slot-1', label: '卷宗壹 · 天枢册', badge: '壹' },
  { slotId: 'slot-2', label: '卷宗贰 · 天璇册', badge: '贰' },
  { slotId: 'slot-3', label: '卷宗叁 · 天玑册', badge: '叁' },
  { slotId: 'slot-4', label: '卷宗肆 · 天权册', badge: '肆' },
  { slotId: 'slot-5', label: '卷宗伍 · 玉衡册', badge: '伍' },
  { slotId: 'slot-6', label: '卷宗陆 · 开阳册', badge: '陆' },
]

// 升级全新存储库命名并自动清理早期 M0/M1.0/M1.1 历史遗留存档
const LEGACY_IDB_DB_NAMES = ['NorthernSongChroniclesDB']
const LEGACY_LS_PREFIX = 'nsc_save_v1_'

const IDB_DB_NAME = 'NorthernSongChroniclesSaves_v2'
const IDB_DB_VERSION = 1
const IDB_STORE_NAME = 'saves'
const LS_FALLBACK_PREFIX = 'nsc_save_v2_'

let idbPromise: Promise<IDBDatabase> | null = null
let legacyPurged = false

export function purgeLegacySaveDatabases(): void {
  if (legacyPurged) return
  legacyPurged = true

  try {
    if (typeof localStorage !== 'undefined') {
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i += 1) {
        const k = localStorage.key(i)
        if (k && k.startsWith(LEGACY_LS_PREFIX)) {
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

function openSaveDatabase(): Promise<IDBDatabase> {
  purgeLegacySaveDatabases()
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB unavailable'))
  }
  if (!idbPromise) {
    idbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open(IDB_DB_NAME, IDB_DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
          db.createObjectStore(IDB_STORE_NAME, { keyPath: 'slotId' })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => {
        idbPromise = null
        reject(req.error ?? new Error('Failed to open IndexedDB'))
      }
    })
  }
  return idbPromise
}

export async function putSaveEnvelope(
  envelope: GameSaveEnvelope,
): Promise<'indexeddb' | 'localstorage'> {
  try {
    localStorage.setItem(`${LS_FALLBACK_PREFIX}${envelope.slotId}`, JSON.stringify(envelope))
  } catch {
    // Ignore localStorage quota warnings when IndexedDB is primary
  }

  try {
    const db = await openSaveDatabase()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite')
      const store = tx.objectStore(IDB_STORE_NAME)
      store.put(envelope)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error ?? new Error('IndexedDB put failed'))
    })
    return 'indexeddb'
  } catch {
    return 'localstorage'
  }
}

export async function getSaveEnvelope(slotId: SaveSlotId): Promise<GameSaveEnvelope | null> {
  try {
    const db = await openSaveDatabase()
    const record = await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readonly')
      const store = tx.objectStore(IDB_STORE_NAME)
      const req = store.get(slotId)
      req.onsuccess = () => resolve(req.result ?? null)
      req.onerror = () => reject(req.error ?? new Error('IndexedDB get failed'))
    })
    if (record !== null) {
      const validated = validateSaveEnvelope(record)
      if (validated) return validated
      await deleteSaveSlot(slotId)
    }
  } catch {
    // Fallback to localStorage
  }

  try {
    const raw = localStorage.getItem(`${LS_FALLBACK_PREFIX}${slotId}`)
    if (!raw) return null
    const validated = validateSaveEnvelope(JSON.parse(raw))
    if (!validated) {
      localStorage.removeItem(`${LS_FALLBACK_PREFIX}${slotId}`)
    }
    return validated
  } catch {
    return null
  }
}

export async function listAllSaveEnvelopes(): Promise<Record<SaveSlotId, GameSaveEnvelope | null>> {
  purgeLegacySaveDatabases()
  const result: Record<SaveSlotId, GameSaveEnvelope | null> = {
    autosave: null,
    'slot-1': null,
    'slot-2': null,
    'slot-3': null,
    'slot-4': null,
    'slot-5': null,
    'slot-6': null,
  }

  for (const def of SAVE_SLOT_DEFS) {
    result[def.slotId] = await getSaveEnvelope(def.slotId)
  }
  return result
}

export async function deleteSaveSlot(slotId: SaveSlotId): Promise<void> {
  try {
    localStorage.removeItem(`${LS_FALLBACK_PREFIX}${slotId}`)
  } catch {
    // ignore
  }
  try {
    const db = await openSaveDatabase()
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_NAME, 'readwrite')
      tx.objectStore(IDB_STORE_NAME).delete(slotId)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error ?? new Error('IndexedDB delete failed'))
    })
  } catch {
    // ignore
  }
}

export async function clearAllSaveSlots(): Promise<void> {
  purgeLegacySaveDatabases()
  for (const def of SAVE_SLOT_DEFS) {
    await deleteSaveSlot(def.slotId)
  }
}

function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

const VALID_VIEW_MODES: ReadonlySet<ViewMode> = new Set(['world', 'region', 'building'])
const EQUIP_SLOT_KEYS: EquipmentSlotKey[] = [
  'weapon',
  'armor',
  'shoes',
  'bow',
  'accessory1',
  'accessory2',
  'mount',
]

const ART_SLOT_KEYS: MartialArtSlotKey[] = [
  'neigong',
  'qinggong',
  'move1',
  'move2',
  'move3',
  'move4',
]

export function validateSaveEnvelope(raw: unknown): GameSaveEnvelope | null {
  if (!isRecord(raw)) return null
  if (raw.gameTitle !== '北宋立志传') return null
  if (raw.schemaVersion !== CURRENT_SAVE_SCHEMA_VERSION) {
    return null
  }
  if (!isRecord(raw.summary) || !isRecord(raw.state)) return null

  const st = raw.state
  if (typeof st.dayCount !== 'number' || st.dayCount < 1) return null
  if (typeof st.viewMode !== 'string' || !VALID_VIEW_MODES.has(st.viewMode as ViewMode)) {
    return null
  }
  if (typeof st.activeRegionId !== 'string' || !REGION_DB_MAP[st.activeRegionId]) {
    return null
  }
  if (typeof st.currentNodeId !== 'string' || !REGION_DB_MAP[st.currentNodeId]) {
    return null
  }

  let normalizedViewMode = st.viewMode as ViewMode
  let normalizedInteriorId =
    typeof st.activeBuildingInteriorId === 'string' ? st.activeBuildingInteriorId : null
  if (normalizedViewMode === 'building') {
    const bldg = normalizedInteriorId ? BUILDING_DB_MAP[normalizedInteriorId] : null
    if (!bldg || !bldg.interior) {
      normalizedViewMode = 'region'
      normalizedInteriorId = null
    }
  }

  const slotId = SAVE_SLOT_DEFS.some((d) => d.slotId === raw.slotId)
    ? (raw.slotId as SaveSlotId)
    : 'slot-1'

  let cleanEquipped: EquippedSlotsMap = { ...DEFAULT_EQUIPPED_SLOTS }
  if (isRecord(st.equipped)) {
    cleanEquipped = {
      weapon: null,
      armor: null,
      shoes: null,
      bow: null,
      accessory1: null,
      accessory2: null,
      mount: null,
    }
    for (const k of EQUIP_SLOT_KEYS) {
      const val = st.equipped[k]
      cleanEquipped[k] = typeof val === 'string' && ITEM_DB_MAP[val] ? val : null
    }
  }

  let cleanLearnedArts: LearnedArtEntry[] = DEFAULT_LEARNED_ARTS.map((x) => ({ ...x }))
  if (Array.isArray(st.learnedArts)) {
    const seen = new Set<string>()
    const parsedArts: LearnedArtEntry[] = []
    for (const entry of st.learnedArts) {
      if (
        isRecord(entry) &&
        typeof entry.artId === 'string' &&
        Boolean(MARTIAL_ART_DB_MAP[entry.artId]) &&
        !seen.has(entry.artId)
      ) {
        seen.add(entry.artId)
        const lv =
          typeof entry.level === 'number' ? Math.max(1, Math.min(10, Math.floor(entry.level))) : 1
        const xp =
          typeof entry.exp === 'number' ? Math.max(0, Math.min(100, Math.floor(entry.exp))) : 0
        parsedArts.push({ artId: entry.artId, level: lv, exp: xp })
      }
    }
    if (parsedArts.length > 0) {
      cleanLearnedArts = parsedArts
    }
  }

  const learnedSet = new Set(cleanLearnedArts.map((a) => a.artId))
  let cleanEquippedArts: EquippedArtsMap = { ...DEFAULT_EQUIPPED_ARTS }
  if (isRecord(st.equippedArts)) {
    cleanEquippedArts = {
      neigong: null,
      qinggong: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    }
    const usedArts = new Set<string>()
    for (const k of ART_SLOT_KEYS) {
      const val = st.equippedArts[k]
      if (typeof val === 'string' && learnedSet.has(val) && !usedArts.has(val)) {
        const artRec = MARTIAL_ART_DB_MAP[val]
        if (artRec && canArtFitSlot(artRec, k)) {
          cleanEquippedArts[k] = val
          usedArts.add(val)
        }
      }
    }
  }

  let cleanInventory: InventoryStack[] = DEFAULT_INITIAL_INVENTORY.map((x) => ({ ...x }))
  if (Array.isArray(st.inventory)) {
    cleanInventory = st.inventory
      .filter(
        (entry): entry is Record<string, unknown> =>
          isRecord(entry) &&
          typeof entry.itemId === 'string' &&
          Boolean(ITEM_DB_MAP[entry.itemId]) &&
          typeof entry.qty === 'number' &&
          entry.qty > 0,
      )
      .map((entry) => ({
        itemId: entry.itemId as string,
        qty: Math.floor(entry.qty as number),
      }))
  }

  const mountItem = cleanEquipped.mount ? ITEM_DB_MAP[cleanEquipped.mount] : null
  const derivedMountKey = mountItem?.equipBonus?.mountKey ?? 'walk'

  const hpVal = typeof st.hp === 'number' ? Math.max(1, Math.floor(st.hp)) : 1200
  const maxHpVal =
    typeof st.maxHp === 'number' ? Math.max(hpVal, Math.floor(st.maxHp)) : Math.max(1395, hpVal)
  const mpVal = typeof st.mp === 'number' ? Math.max(0, Math.floor(st.mp)) : 950
  const maxMpVal =
    typeof st.maxMp === 'number' ? Math.max(mpVal, Math.floor(st.maxMp)) : Math.max(1030, mpVal)
  const maxStaminaVal =
    typeof st.maxStamina === 'number' ? Math.max(20, Math.floor(st.maxStamina)) : 140
  const staminaVal =
    typeof st.stamina === 'number'
      ? Math.min(maxStaminaVal, Math.max(0, Math.floor(st.stamina)))
      : maxStaminaVal

  let cleanCampPos: WildernessCamp | null = null
  if (
    isRecord(st.campPos) &&
    typeof st.campPos.x === 'number' &&
    typeof st.campPos.y === 'number' &&
    typeof st.campPos.u === 'string' &&
    Boolean(REGION_DB_MAP[st.campPos.u]) &&
    typeof st.campPos.v === 'string' &&
    Boolean(REGION_DB_MAP[st.campPos.v]) &&
    typeof st.campPos.distU === 'number' &&
    typeof st.campPos.distV === 'number' &&
    (st.campPos.terrain === 'official' ||
      st.campPos.terrain === 'water' ||
      st.campPos.terrain === 'steppe' ||
      st.campPos.terrain === 'mountain')
  ) {
    cleanCampPos = {
      x: st.campPos.x,
      y: st.campPos.y,
      u: st.campPos.u,
      v: st.campPos.v,
      distU: Math.max(0, st.campPos.distU),
      distV: Math.max(0, st.campPos.distV),
      terrain: st.campPos.terrain as TerrainType,
    }
  }

  const cleanState: SerializableGameState = {
    dayCount: Math.floor(st.dayCount),
    shichenIdx:
      typeof st.shichenIdx === 'number' ? ((Math.floor(st.shichenIdx) % 12) + 12) % 12 : 4,
    viewMode: normalizedViewMode,
    showRegionLabels: Boolean(st.showRegionLabels ?? true),
    activeRegionId: st.activeRegionId,
    activeBuildingInteriorId: normalizedInteriorId,
    selectedNodeId: typeof st.selectedNodeId === 'string' ? st.selectedNodeId : null,
    selectedBuildingId: typeof st.selectedBuildingId === 'string' ? st.selectedBuildingId : null,
    selectedSpotId: typeof st.selectedSpotId === 'string' ? st.selectedSpotId : null,
    currentNodeId: st.currentNodeId,
    campPos: cleanCampPos,
    mountKey: derivedMountKey,
    qinggongBonus: typeof st.qinggongBonus === 'number' ? st.qinggongBonus : 0.15,
    ridingSkill: typeof st.ridingSkill === 'number' ? st.ridingSkill : 45,
    agility: typeof st.agility === 'number' ? st.agility : 65,
    silver: typeof st.silver === 'number' ? st.silver : 120,
    food: typeof st.food === 'number' ? st.food : 25,
    hp: hpVal,
    maxHp: maxHpVal,
    mp: mpVal,
    maxMp: maxMpVal,
    stamina: staminaVal,
    maxStamina: maxStaminaVal,
    res: typeof st.res === 'number' ? st.res : 40,
    skills: isRecord(st.skills)
      ? (Object.fromEntries(
          Object.entries(st.skills).filter(([, v]) => typeof v === 'number'),
        ) as Record<string, number>)
      : {},
    equipped: cleanEquipped,
    learnedArts: cleanLearnedArts,
    equippedArts: cleanEquippedArts,
    inventory: cleanInventory,
    overlays: isRecord(st.overlays)
      ? {
          cityLabels: Boolean(st.overlays.cityLabels ?? true),
          sectPassLabels: Boolean(st.overlays.sectPassLabels ?? true),
          masters: Boolean(st.overlays.masters ?? false),
          distance: Boolean(st.overlays.distance ?? false),
          factions: Boolean(st.overlays.factions ?? false),
          alerts: Boolean(st.overlays.alerts ?? false),
        }
      : {
          cityLabels: true,
          sectPassLabels: true,
          masters: false,
          distance: false,
          factions: false,
          alerts: false,
        },
    roamingMasters: Array.isArray(st.roamingMasters)
      ? (st.roamingMasters as SerializableGameState['roamingMasters'])
      : [],
    worldPan: isRecord(st.worldPan)
      ? {
          x: Number(st.worldPan.x) || 0,
          y: Number(st.worldPan.y) || 0,
          scale: Number(st.worldPan.scale) || 1,
        }
      : { x: 0, y: 0, scale: 1 },
    regionPan: isRecord(st.regionPan)
      ? {
          x: Number(st.regionPan.x) || 0,
          y: Number(st.regionPan.y) || 0,
          scale: Number(st.regionPan.scale) || 1,
        }
      : { x: 0, y: 0, scale: 1 },
    logs: Array.isArray(st.logs) ? (st.logs as SerializableGameState['logs']) : [],
  }

  const sum = raw.summary
  return {
    gameTitle: '北宋立志传',
    schemaVersion: CURRENT_SAVE_SCHEMA_VERSION,
    slotId,
    savedAt: typeof raw.savedAt === 'string' ? raw.savedAt : new Date().toISOString(),
    note: typeof raw.note === 'string' ? raw.note : '',
    summary: {
      songDate: typeof sum.songDate === 'string' ? sum.songDate : '皇祐二年',
      dayCount: cleanState.dayCount,
      shichenIdx: cleanState.shichenIdx,
      regionId: cleanState.activeRegionId,
      regionName:
        typeof sum.regionName === 'string'
          ? sum.regionName
          : (REGION_DB_MAP[cleanState.activeRegionId]?.name ?? cleanState.activeRegionId),
      viewMode: cleanState.viewMode,
      buildingId: cleanState.activeBuildingInteriorId,
      buildingName:
        cleanState.activeBuildingInteriorId
          ? (BUILDING_DB_MAP[cleanState.activeBuildingInteriorId]?.name ?? null)
          : null,
      hp: cleanState.hp,
      maxHp: cleanState.maxHp,
      stamina: cleanState.stamina,
      maxStamina: cleanState.maxStamina,
      mp: cleanState.mp,
      silver: cleanState.silver,
      food: cleanState.food,
    },
    state: cleanState,
  }
}

export function downloadSaveAsJsonFile(envelope: GameSaveEnvelope): void {
  const safeRegion = envelope.summary.regionName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9_-]/g, '')
  const filename = `北宋立志传_${envelope.slotId}_第${envelope.summary.dayCount}日_${safeRegion}.json`
  const blob = new Blob([JSON.stringify(envelope, null, 2)], {
    type: 'application/json;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function parseSaveJsonFile(file: File): Promise<GameSaveEnvelope> {
  const text = await file.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('JSON 文件格式损坏，无法解析。')
  }
  const validated = validateSaveEnvelope(parsed)
  if (!validated) {
    throw new Error(
      `非当前版本的《北宋立志传》卷宗存档（仅支持 ${CURRENT_SAVE_SCHEMA_VERSION}），旧版测试存档已停用。`,
    )
  }
  return validated
}
