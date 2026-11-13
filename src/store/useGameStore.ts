import { create } from 'zustand'
import { BUILDING_DB_MAP, MARTIAL_ART_DB_MAP } from '../data/gameDb'
import {
  canItemFitSlot,
  computeEquipmentTotals,
  DEFAULT_EQUIPPED_SLOTS,
  DEFAULT_INITIAL_INVENTORY,
  ITEM_DB_MAP,
} from '../data/itemsDb'
import {
  canArtFitSlot,
  computeEquippedArtsTotals,
  DEFAULT_EQUIPPED_ARTS,
  DEFAULT_LEARNED_ARTS,
} from '../data/playerMartialArts'
import type {
  ActionEffect,
  BagCategoryKey,
  CameraPan,
  EquipmentSlotKey,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameSaveEnvelope,
  InventoryStack,
  LabelToggleKey,
  LearnedArtEntry,
  LogEntry,
  MartialArtSlotKey,
  MenuTabKey,
  MountKey,
  NodeNpc,
  OverlayToggles,
  RoamingMaster,
  SaveSlotId,
  SerializableGameState,
  TooltipPayload,
  TravelState,
  ViewMode,
} from '../types/game'
import {
  ADJACENCY_MAP,
  findBestRoute,
  formatSongDate,
  getRegionAllBuildings,
  getRegionViewBoxSize,
  getSongDateParts,
  NODE_MAP,
  REGIONAL_CONFIGS,
  WORLD_GRAPH,
} from '../utils/mapMath'
import {
  deleteSaveSlot,
  listAllSaveEnvelopes,
  putSaveEnvelope,
} from '../utils/saveManager'

const LABEL_KEYS: LabelToggleKey[] = ['cityLabels', 'sectPassLabels', 'masters', 'distance']

interface RoadEventDef {
  tag: string
  msg: string
  apply: (draft: {
    hp: number
    maxHp: number
    mp: number
    maxMp: number
    stamina: number
    maxStamina: number
    silver: number
    res: number
    skills: Record<string, number>
  }) => void
}

const ROAD_EVENTS: RoadEventDef[] = [
  {
    tag: '胡商偶遇',
    msg: '途遇西域高昌驼队，购得天山雪莲散少许（气血 +45，体能 +15）。',
    apply: (d) => {
      d.hp = Math.min(d.maxHp, d.hp + 45)
      d.stamina = Math.min(d.maxStamina, d.stamina + 15)
    },
  },
  {
    tag: '名侠同行',
    msg: '古道茶寮偶遇游方高僧论及经义内息（内力 +25，经义 +1）。',
    apply: (d) => {
      d.mp = Math.min(d.maxMp, d.mp + 25)
      d.skills['经义'] = Math.min(100, (d.skills['经义'] ?? 60) + 1)
    },
  },
  {
    tag: '绿林劫道',
    msg: '山道窜出剪径匪类，少侠弹指震飞匪首兵刃，缴获纹银 12 两！',
    apply: (d) => {
      d.silver += 12
    },
  },
  {
    tag: '密探截杀',
    msg: '荒野突遭一品堂/辽廷暗探毒箭伏击！凭护体抗性硬接并击退强敌（抗性 +2）。',
    apply: (d) => {
      d.res = Math.min(100, d.res + 2)
    },
  },
  {
    tag: '万里山河',
    msg: '策马纵览九州山海壮阔，胸襟大开，赋词一首（诗词 +2，体能 +10）。',
    apply: (d) => {
      d.skills['诗词'] = Math.min(100, (d.skills['诗词'] ?? 55) + 2)
      d.stamina = Math.min(d.maxStamina, d.stamina + 10)
    },
  },
]

let nextLogSeq = 1
function createLogEntry(
  dayCount: number,
  tag: string,
  text: string,
  highlight = false,
  shichenIdx?: number,
): LogEntry {
  const parts = getSongDateParts(dayCount, shichenIdx ?? 4)
  const datePart =
    typeof shichenIdx === 'number'
      ? `${parts.monthDay}·${parts.shichen.name}`
      : parts.monthDay
  nextLogSeq += 1
  return {
    id: `log-${Date.now()}-${nextLogSeq}`,
    date: datePart,
    tag,
    text,
    highlight,
  }
}

function advanceShichenClock(dayCount: number, shichenIdx: number, deltaShichen: number) {
  const total = shichenIdx + deltaShichen
  const daysAdded = Math.floor(total / 12)
  const nextShichen = ((total % 12) + 12) % 12
  return {
    dayCount: Math.max(1, dayCount + daysAdded),
    shichenIdx: nextShichen,
    daysAdded,
  }
}

function addItemToInventory(list: InventoryStack[], itemId: string, qty = 1): InventoryStack[] {
  const def = ITEM_DB_MAP[itemId]
  if (!def || qty <= 0) return list
  const next = list.map((x) => ({ ...x }))
  const existing = next.find((x) => x.itemId === itemId)
  if (existing) {
    existing.qty += qty
  } else {
    next.push({ itemId, qty })
  }
  return next
}

function removeItemFromInventory(
  list: InventoryStack[],
  itemId: string,
  qty = 1,
): InventoryStack[] | null {
  const idx = list.findIndex((x) => x.itemId === itemId)
  if (idx === -1 || list[idx].qty < qty) return null
  const next = list.map((x) => ({ ...x }))
  next[idx].qty -= qty
  if (next[idx].qty <= 0) {
    next.splice(idx, 1)
  }
  return next
}

const INITIAL_EQUIP_TOTALS = computeEquipmentTotals(DEFAULT_EQUIPPED_SLOTS)
const INITIAL_ART_TOTALS = computeEquippedArtsTotals(
  DEFAULT_EQUIPPED_ARTS,
  DEFAULT_LEARNED_ARTS,
)

export interface GameStoreState {
  dayCount: number
  shichenIdx: number
  viewMode: ViewMode
  showRegionLabels: boolean
  activeRegionId: string
  activeBuildingInteriorId: string | null
  selectedNodeId: string | null
  selectedBuildingId: string | null
  selectedSpotId: string | null
  currentNodeId: string

  mountKey: MountKey
  qinggongBonus: number
  ridingSkill: number
  agility: number
  silver: number
  food: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  stamina: number
  maxStamina: number
  res: number
  skills: Record<string, number>

  equipped: EquippedSlotsMap
  learnedArts: LearnedArtEntry[]
  equippedArts: EquippedArtsMap
  inventory: InventoryStack[]
  activeBagCategory: BagCategoryKey

  overlays: OverlayToggles
  roamingMasters: RoamingMaster[]
  traveling: TravelState | null
  campPos: { x: number; y: number } | null

  worldPan: CameraPan
  regionPan: CameraPan

  actionFeedback: { text: string; tone: 'success' | 'warn' | 'talk' } | null
  tooltip: TooltipPayload | null
  logs: LogEntry[]
  logDrawerOpen: boolean

  menuOpen: boolean
  activeMenuTab: MenuTabKey

  // Save/Load state
  saveSlots: Record<SaveSlotId, GameSaveEnvelope | null>
  saveBusy: boolean
  saveNotice: { text: string; tone: 'success' | 'error' } | null

  // Actions
  setTooltip: (payload: TooltipPayload | null) => void
  moveTooltip: (x: number, y: number) => void
  clearFloatingSelection: () => void
  selectWorldNode: (nodeId: string | null) => void
  selectRegionBuilding: (bldgId: string | null) => void
  selectBuildingSpot: (spotId: string | null) => void

  enterRegionMap: (nodeId: string, logSwitch?: boolean) => void
  enterBuildingMap: (bldgId: string) => void
  exitBuildingMap: () => void
  exitToWorldMap: () => void
  handleUpperLevelBack: () => void

  toggleRegionLabels: () => void
  toggleOverlay: (key: keyof OverlayToggles) => void
  setAllLabelToggles: (enabled: boolean) => void

  setWorldPan: (pan: CameraPan) => void
  zoomWorldBy: (factor: number, cx?: number, cy?: number) => void
  focusZhongyuan: () => void
  focusMacroRegimes: () => void
  resetWorldView: () => void

  setRegionPan: (pan: CameraPan) => void
  zoomRegionBy: (factor: number, cx?: number | null, cy?: number | null) => void
  focusSelectedBuilding: () => void
  resetRegionView: () => void

  setMountKey: (mountKey: MountKey) => void
  setQinggongBonus: (bonus: number) => void
  replenishSupplies: () => void
  restRecoverStamina: () => void
  setBagCategory: (cat: BagCategoryKey) => void
  equipItemToSlot: (itemId: string, targetSlot?: EquipmentSlotKey) => void
  unequipSlot: (slot: EquipmentSlotKey) => void
  equipArtToSlot: (artId: string, slot: MartialArtSlotKey) => void
  unequipArtSlot: (slot: MartialArtSlotKey) => void
  practiceLearnedArt: (artId: string) => void
  consumeInventoryItem: (itemId: string) => void

  doBuildingAction: (item: {
    name: string
    cost?: number
    effect: ActionEffect
  }) => void
  interactNpc: (npc: NodeNpc, mode: 'talk' | 'art' | 'spar') => void

  startJourney: (targetId: string) => void
  stepTravelTick: () => void
  campStop: () => void

  toggleLogDrawer: () => void
  openMenu: (tab?: MenuTabKey) => void
  closeMenu: () => void
  setMenuTab: (tab: MenuTabKey) => void

  // Save/Load actions
  buildSaveEnvelope: (slotId: SaveSlotId, note?: string) => GameSaveEnvelope
  refreshSaveSlots: () => Promise<void>
  saveToSlot: (slotId: SaveSlotId, note?: string, silent?: boolean) => Promise<void>
  loadFromEnvelope: (envelope: GameSaveEnvelope, closeAfterLoad?: boolean) => void
  removeSaveSlot: (slotId: SaveSlotId) => Promise<void>
  setSaveNotice: (notice: { text: string; tone: 'success' | 'error' } | null) => void
}

function extractSerializableState(s: GameStoreState): SerializableGameState {
  return {
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    viewMode: s.viewMode,
    showRegionLabels: s.showRegionLabels,
    activeRegionId: s.activeRegionId,
    activeBuildingInteriorId: s.activeBuildingInteriorId,
    selectedNodeId: s.selectedNodeId,
    selectedBuildingId: s.selectedBuildingId,
    selectedSpotId: s.selectedSpotId,
    currentNodeId: s.currentNodeId,
    mountKey: s.mountKey,
    qinggongBonus: s.qinggongBonus,
    ridingSkill: s.ridingSkill,
    agility: s.agility,
    silver: s.silver,
    food: s.food,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    stamina: s.stamina,
    maxStamina: s.maxStamina,
    res: s.res,
    skills: { ...s.skills },
    equipped: { ...s.equipped },
    learnedArts: s.learnedArts.map((x) => ({ ...x })),
    equippedArts: { ...s.equippedArts },
    inventory: s.inventory.map((x) => ({ ...x })),
    overlays: { ...s.overlays },
    roamingMasters: s.roamingMasters.map((m) => ({ ...m })),
    worldPan: { ...s.worldPan },
    regionPan: { ...s.regionPan },
    logs: s.logs.slice(0, 60),
  }
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  dayCount: 1,
  shichenIdx: 4, // 辰时 (食时 07:00-09:00)
  viewMode: 'region',
  showRegionLabels: true,
  activeRegionId: 'bianliang',
  activeBuildingInteriorId: null,
  selectedNodeId: null,
  selectedBuildingId: null,
  selectedSpotId: null,
  currentNodeId: 'bianliang',

  mountKey: INITIAL_EQUIP_TOTALS.mountKey,
  qinggongBonus: INITIAL_ART_TOTALS.qinggongBonus || 0.15,
  ridingSkill: 45 + INITIAL_EQUIP_TOTALS.riding,
  agility: 65 + INITIAL_EQUIP_TOTALS.agility + INITIAL_ART_TOTALS.agility,
  silver: 120,
  food: 25,
  hp: 1200 + INITIAL_EQUIP_TOTALS.maxHp + INITIAL_ART_TOTALS.maxHp,
  maxHp: 1200 + INITIAL_EQUIP_TOTALS.maxHp + INITIAL_ART_TOTALS.maxHp,
  mp: 950 + INITIAL_EQUIP_TOTALS.maxMp + INITIAL_ART_TOTALS.maxMp,
  maxMp: 950 + INITIAL_EQUIP_TOTALS.maxMp + INITIAL_ART_TOTALS.maxMp,
  stamina: 100 + INITIAL_EQUIP_TOTALS.maxStamina,
  maxStamina: 100 + INITIAL_EQUIP_TOTALS.maxStamina,
  res: 40 + INITIAL_EQUIP_TOTALS.res + INITIAL_ART_TOTALS.res,
  skills: {
    算术: 52,
    经义: 60,
    策论: 48,
    诗词: 55,
    琴: 42,
    棋: 50,
    书: 46,
    画: 40,
    辩才: 64,
  },

  equipped: { ...DEFAULT_EQUIPPED_SLOTS },
  learnedArts: DEFAULT_LEARNED_ARTS.map((x) => ({ ...x })),
  equippedArts: { ...DEFAULT_EQUIPPED_ARTS },
  inventory: DEFAULT_INITIAL_INVENTORY.map((x) => ({ ...x })),
  activeBagCategory: 'scrolls',

  overlays: {
    cityLabels: true,
    sectPassLabels: true,
    masters: false,
    distance: false,
    factions: false,
    alerts: false,
  },
  roamingMasters: WORLD_GRAPH.roamingMasters.map((m) => ({ ...m })),
  traveling: null,
  campPos: null,

  worldPan: { x: 0, y: 0, scale: 1 },
  regionPan: { x: 0, y: 0, scale: 1 },

  actionFeedback: null,
  tooltip: null,
  logs: [
    createLogEntry(
      1,
      '行囊枢机',
      '已实装独立【主角面板】、【披挂与武学（7槽装备 + 6槽武学运使修炼）】与【行囊四库】三大核心卷宗！',
      true,
      4,
    ),
    createLogEntry(
      1,
      '东京展卷',
      '当前驻留【开封府】半3D全景舆图。点击顶部状态条或按 ESC 即可检视主角属性、调配武学披挂与行囊器物。',
      true,
      4,
    ),
  ],
  logDrawerOpen: false,

  menuOpen: false,
  activeMenuTab: 'hero',

  saveSlots: {
    autosave: null,
    'slot-1': null,
    'slot-2': null,
    'slot-3': null,
    'slot-4': null,
    'slot-5': null,
    'slot-6': null,
  },
  saveBusy: false,
  saveNotice: null,

  setTooltip: (payload) => set({ tooltip: payload }),
  moveTooltip: (x, y) =>
    set((s) => (s.tooltip ? { tooltip: { ...s.tooltip, x, y } } : s)),

  clearFloatingSelection: () => {
    const s = get()
    if (s.viewMode === 'world') {
      set({ selectedNodeId: null, actionFeedback: null })
    } else if (s.viewMode === 'building') {
      set({ selectedSpotId: null, actionFeedback: null })
    } else {
      set({ selectedBuildingId: null, actionFeedback: null })
    }
  },

  selectWorldNode: (nodeId) => set({ selectedNodeId: nodeId, actionFeedback: null }),
  selectRegionBuilding: (bldgId) => set({ selectedBuildingId: bldgId, actionFeedback: null }),
  selectBuildingSpot: (spotId) => set({ selectedSpotId: spotId, actionFeedback: null }),

  enterRegionMap: (nodeId, logSwitch = false) => {
    const s = get()
    const node = NODE_MAP[nodeId]
    const cfg = REGIONAL_CONFIGS[nodeId]
    if (!node || !cfg) return
    if (s.traveling) {
      get().campStop()
    }
    const logs = logSwitch
      ? [
          createLogEntry(
            s.dayCount,
            '地区切换',
            `展卷踏入【${node.name}】专属半3D全景互动地图。`,
            true,
          ),
          ...s.logs,
        ].slice(0, 60)
      : s.logs

    set({
      tooltip: null,
      viewMode: 'region',
      activeRegionId: nodeId,
      activeBuildingInteriorId: null,
      selectedSpotId: null,
      selectedBuildingId: null,
      currentNodeId: nodeId,
      selectedNodeId: nodeId,
      campPos: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs,
    })

    if (logSwitch) {
      void get().saveToSlot('autosave', `踏入${node.name}`, true)
    }
  },

  enterBuildingMap: (bldgId) => {
    const s = get()
    const bRecord = BUILDING_DB_MAP[bldgId]
    const node = NODE_MAP[s.activeRegionId]
    if (!bRecord || !bRecord.interior || !node) return
    const modeDesc =
      bRecord.interior.mode === 'image' ? '半3D手绘建筑内景图' : '宋式营造矢量内景卷'
    set({
      tooltip: null,
      viewMode: 'building',
      activeBuildingInteriorId: bldgId,
      selectedBuildingId: null,
      selectedSpotId: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '踏入建筑',
          `由【${node.name}】步入【${bRecord.name}】（${modeDesc}）！`,
          true,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  exitBuildingMap: () => {
    const s = get()
    if (s.viewMode !== 'building') return
    const prevName =
      (s.activeBuildingInteriorId && BUILDING_DB_MAP[s.activeBuildingInteriorId]?.name) || '建筑'
    const node = NODE_MAP[s.activeRegionId]
    set({
      tooltip: null,
      viewMode: 'region',
      activeBuildingInteriorId: null,
      selectedBuildingId: null,
      selectedSpotId: null,
      regionPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '步出建筑',
          `自【${prevName}】步出，返回【${node?.name ?? '本州'}】地区半3D全景图。`,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  exitToWorldMap: () => {
    const s = get()
    const node = NODE_MAP[s.currentNodeId]
    set({
      tooltip: null,
      viewMode: 'world',
      activeBuildingInteriorId: null,
      selectedNodeId: null,
      actionFeedback: null,
      logs: [
        createLogEntry(
          s.dayCount,
          '出城返图',
          `自【${node?.name ?? '城池'}】步出城门，重展《华夏山海全景舆图》。`,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  handleUpperLevelBack: () => {
    if (get().viewMode === 'building') {
      get().exitBuildingMap()
    } else {
      get().exitToWorldMap()
    }
  },

  toggleRegionLabels: () => set((s) => ({ showRegionLabels: !s.showRegionLabels })),

  toggleOverlay: (key) =>
    set((s) => ({
      overlays: { ...s.overlays, [key]: !s.overlays[key] },
    })),

  setAllLabelToggles: (enabled) =>
    set((s) => {
      const next = { ...s.overlays }
      for (const k of LABEL_KEYS) {
        next[k] = enabled
      }
      return { overlays: next }
    }),

  setWorldPan: (pan) => set({ worldPan: pan }),

  zoomWorldBy: (factor, cx = 800, cy = 500) =>
    set((s) => {
      const nextScale = Math.min(3.4, Math.max(0.56, s.worldPan.scale * factor))
      const ratio = nextScale / s.worldPan.scale
      return {
        worldPan: {
          x: cx - (cx - s.worldPan.x) * ratio,
          y: cy - (cy - s.worldPan.y) * ratio,
          scale: nextScale,
        },
      }
    }),

  focusZhongyuan: () => set({ worldPan: { x: -340, y: -165, scale: 1.48 } }),
  focusMacroRegimes: () => set({ worldPan: { x: 185, y: 112, scale: 0.74 } }),
  resetWorldView: () => set({ worldPan: { x: 0, y: 0, scale: 1 } }),

  setRegionPan: (pan) => set({ regionPan: pan }),

  zoomRegionBy: (factor, cx = null, cy = null) =>
    set((s) => {
      const [vw, vh] = getRegionViewBoxSize(s.viewMode, s.activeRegionId)
      const pivotX = cx !== null ? cx : vw / 2
      const pivotY = cy !== null ? cy : vh / 2
      const nextScale = Math.min(4.2, Math.max(0.62, s.regionPan.scale * factor))
      const ratio = nextScale / s.regionPan.scale
      return {
        regionPan: {
          x: pivotX - (pivotX - s.regionPan.x) * ratio,
          y: pivotY - (pivotY - s.regionPan.y) * ratio,
          scale: nextScale,
        },
      }
    }),

  focusSelectedBuilding: () => {
    const s = get()
    const [vw, vh] = getRegionViewBoxSize(s.viewMode, s.activeRegionId)
    let target: { x: number; y: number } | null = null

    if (s.viewMode === 'building' && s.activeBuildingInteriorId) {
      const bInterior = BUILDING_DB_MAP[s.activeBuildingInteriorId]?.interior
      if (bInterior) {
        target = s.selectedSpotId
          ? (bInterior.spots.find((sp) => sp.id === s.selectedSpotId) ?? null)
          : null
      }
    } else {
      const buildings = getRegionAllBuildings(s.activeRegionId)
      target = s.selectedBuildingId
        ? (buildings.find((b) => b.id === s.selectedBuildingId) ?? null)
        : null
    }

    if (!target) {
      set({
        actionFeedback: {
          text: '请先点击画中建筑或内景热区选中一处地点，再使用「聚焦」。',
          tone: 'warn',
        },
      })
      return
    }

    const targetScale = 2.05
    set({
      regionPan: {
        x: vw / 2 - target.x * targetScale,
        y: vh / 2 - target.y * targetScale,
        scale: targetScale,
      },
    })
  },

  resetRegionView: () => set({ regionPan: { x: 0, y: 0, scale: 1 } }),

  setMountKey: (mountKey) => set({ mountKey }),
  setQinggongBonus: (qinggongBonus) => set({ qinggongBonus }),
  setBagCategory: (activeBagCategory) => set({ activeBagCategory }),

  replenishSupplies: () => {
    const s = get()
    if (s.silver < 5) {
      set({
        logs: [
          createLogEntry(s.dayCount, '市集', '纹银不足 5 两，无法补给干粮！', true, s.shichenIdx),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }
    set({
      silver: s.silver - 5,
      food: s.food + 20,
      logs: [
        createLogEntry(
          s.dayCount,
          '补给',
          '花费 5 两纹银购入行军干粮 +20 日份。',
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  restRecoverStamina: () => {
    const s = get()
    if (s.silver < 3) {
      set({
        actionFeedback: { text: '投宿小憩需纹银 3 两，当前银两不足！', tone: 'warn' },
      })
      return
    }
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 3)
    const nextHp = Math.min(s.maxHp, s.hp + 200)
    const nextMp = Math.min(s.maxMp, s.mp + 120)
    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      silver: s.silver - 3,
      hp: nextHp,
      mp: nextMp,
      stamina: s.maxStamina,
      actionFeedback: {
        text: '于客舍安睡三个时辰，体能全满，气血与内息尽数平复！',
        tone: 'success',
      },
      logs: [
        createLogEntry(
          clock.dayCount,
          '客舍调息',
          `花费 3 两纹银小憩三个时辰，体能恢复至 ${s.maxStamina}/${s.maxStamina}。`,
          false,
          clock.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  equipItemToSlot: (itemId, preferredSlot) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def || !def.equipSlot) return

    let slot: EquipmentSlotKey = def.equipSlot
    if (preferredSlot && canItemFitSlot(def, preferredSlot)) {
      slot = preferredSlot
    } else if (def.equipSlot === 'accessory1' || def.equipSlot === 'accessory2') {
      if (!s.equipped.accessory1) slot = 'accessory1'
      else if (!s.equipped.accessory2) slot = 'accessory2'
      else slot = preferredSlot ?? 'accessory1'
    }

    const afterRemove = removeItemFromInventory(s.inventory, itemId, 1)
    if (!afterRemove) return

    const oldEquipId = s.equipped[slot]
    const nextInv = oldEquipId ? addItemToInventory(afterRemove, oldEquipId, 1) : afterRemove

    const oldTotals = computeEquipmentTotals(s.equipped)
    const nextEquipped: EquippedSlotsMap = {
      ...s.equipped,
      [slot]: itemId,
    }
    const newTotals = computeEquipmentTotals(nextEquipped)

    const deltaMaxHp = newTotals.maxHp - oldTotals.maxHp
    const deltaMaxMp = newTotals.maxMp - oldTotals.maxMp
    const deltaMaxStamina = newTotals.maxStamina - oldTotals.maxStamina
    const deltaAgi = newTotals.agility - oldTotals.agility
    const deltaRes = newTotals.res - oldTotals.res
    const deltaRiding = newTotals.riding - oldTotals.riding

    const nextMaxHp = Math.max(100, s.maxHp + deltaMaxHp)
    const nextMaxMp = Math.max(50, s.maxMp + deltaMaxMp)
    const nextMaxStamina = Math.max(40, s.maxStamina + deltaMaxStamina)

    const nextSkills = { ...s.skills }
    const allSkillKeys = new Set([
      ...Object.keys(oldTotals.skills),
      ...Object.keys(newTotals.skills),
    ])
    for (const sk of allSkillKeys) {
      const diff = (newTotals.skills[sk] ?? 0) - (oldTotals.skills[sk] ?? 0)
      nextSkills[sk] = Math.max(0, Math.min(100, (nextSkills[sk] ?? 40) + diff))
    }

    set({
      equipped: nextEquipped,
      inventory: nextInv,
      mountKey: newTotals.mountKey,
      maxHp: nextMaxHp,
      hp: Math.min(nextMaxHp, Math.max(1, s.hp + Math.max(0, deltaMaxHp))),
      maxMp: nextMaxMp,
      mp: Math.min(nextMaxMp, Math.max(0, s.mp + Math.max(0, deltaMaxMp))),
      maxStamina: nextMaxStamina,
      stamina: Math.min(nextMaxStamina, Math.max(0, s.stamina + Math.max(0, deltaMaxStamina))),
      agility: Math.max(1, s.agility + deltaAgi),
      res: Math.max(0, s.res + deltaRes),
      ridingSkill: Math.max(0, s.ridingSkill + deltaRiding),
      skills: nextSkills,
      logs: [
        createLogEntry(
          s.dayCount,
          '披挂换装',
          `已装备【${def.name}】${oldEquipId && ITEM_DB_MAP[oldEquipId] ? `（替换下 ${ITEM_DB_MAP[oldEquipId].name}）` : ''}。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  unequipSlot: (slot) => {
    const s = get()
    const oldItemId = s.equipped[slot]
    if (!oldItemId) return
    const oldDef = ITEM_DB_MAP[oldItemId]

    const oldTotals = computeEquipmentTotals(s.equipped)
    const nextEquipped: EquippedSlotsMap = {
      ...s.equipped,
      [slot]: null,
    }
    const newTotals = computeEquipmentTotals(nextEquipped)
    const nextInv = addItemToInventory(s.inventory, oldItemId, 1)

    const deltaMaxHp = newTotals.maxHp - oldTotals.maxHp
    const deltaMaxMp = newTotals.maxMp - oldTotals.maxMp
    const deltaMaxStamina = newTotals.maxStamina - oldTotals.maxStamina
    const deltaAgi = newTotals.agility - oldTotals.agility
    const deltaRes = newTotals.res - oldTotals.res
    const deltaRiding = newTotals.riding - oldTotals.riding

    const nextMaxHp = Math.max(100, s.maxHp + deltaMaxHp)
    const nextMaxMp = Math.max(50, s.maxMp + deltaMaxMp)
    const nextMaxStamina = Math.max(40, s.maxStamina + deltaMaxStamina)

    const nextSkills = { ...s.skills }
    for (const [sk, val] of Object.entries(oldTotals.skills)) {
      const diff = (newTotals.skills[sk] ?? 0) - val
      nextSkills[sk] = Math.max(0, Math.min(100, (nextSkills[sk] ?? 40) + diff))
    }

    set({
      equipped: nextEquipped,
      inventory: nextInv,
      mountKey: newTotals.mountKey,
      maxHp: nextMaxHp,
      hp: Math.min(nextMaxHp, s.hp),
      maxMp: nextMaxMp,
      mp: Math.min(nextMaxMp, s.mp),
      maxStamina: nextMaxStamina,
      stamina: Math.min(nextMaxStamina, s.stamina),
      agility: Math.max(1, s.agility + deltaAgi),
      res: Math.max(0, s.res + deltaRes),
      ridingSkill: Math.max(0, s.ridingSkill + deltaRiding),
      skills: nextSkills,
      logs: [
        createLogEntry(
          s.dayCount,
          '卸除佩备',
          `已将【${oldDef?.name ?? oldItemId}】收入行囊杂物栏。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  equipArtToSlot: (artId, slot) => {
    const s = get()
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art || !canArtFitSlot(art, slot)) return
    if (!s.learnedArts.some((x) => x.artId === artId)) return

    const oldTotals = computeEquippedArtsTotals(s.equippedArts, s.learnedArts)
    const nextEquippedArts: EquippedArtsMap = { ...s.equippedArts }

    // Ensure the same martial art is not duplicated in two slots
    for (const k of Object.keys(nextEquippedArts) as MartialArtSlotKey[]) {
      if (nextEquippedArts[k] === artId) {
        nextEquippedArts[k] = null
      }
    }
    const prevInSlot = s.equippedArts[slot]
    nextEquippedArts[slot] = artId

    const newTotals = computeEquippedArtsTotals(nextEquippedArts, s.learnedArts)
    const deltaMaxHp = newTotals.maxHp - oldTotals.maxHp
    const deltaMaxMp = newTotals.maxMp - oldTotals.maxMp
    const deltaAgi = newTotals.agility - oldTotals.agility
    const deltaRes = newTotals.res - oldTotals.res

    const nextMaxHp = Math.max(100, s.maxHp + deltaMaxHp)
    const nextMaxMp = Math.max(50, s.maxMp + deltaMaxMp)

    set({
      equippedArts: nextEquippedArts,
      qinggongBonus: newTotals.qinggongBonus,
      maxHp: nextMaxHp,
      hp: Math.min(nextMaxHp, Math.max(1, s.hp + Math.max(0, deltaMaxHp))),
      maxMp: nextMaxMp,
      mp: Math.min(nextMaxMp, Math.max(0, s.mp + Math.max(0, deltaMaxMp))),
      agility: Math.max(1, s.agility + deltaAgi),
      res: Math.max(0, s.res + deltaRes),
      logs: [
        createLogEntry(
          s.dayCount,
          '武学配招',
          `已将【${art.name}】运使至武学槽位${prevInSlot && prevInSlot !== artId && MARTIAL_ART_DB_MAP[prevInSlot] ? `（替换下 ${MARTIAL_ART_DB_MAP[prevInSlot].name}）` : ''}。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  unequipArtSlot: (slot) => {
    const s = get()
    const oldArtId = s.equippedArts[slot]
    if (!oldArtId) return
    const oldArt = MARTIAL_ART_DB_MAP[oldArtId]

    const oldTotals = computeEquippedArtsTotals(s.equippedArts, s.learnedArts)
    const nextEquippedArts: EquippedArtsMap = {
      ...s.equippedArts,
      [slot]: null,
    }
    const newTotals = computeEquippedArtsTotals(nextEquippedArts, s.learnedArts)

    const deltaMaxHp = newTotals.maxHp - oldTotals.maxHp
    const deltaMaxMp = newTotals.maxMp - oldTotals.maxMp
    const deltaAgi = newTotals.agility - oldTotals.agility
    const deltaRes = newTotals.res - oldTotals.res

    const nextMaxHp = Math.max(100, s.maxHp + deltaMaxHp)
    const nextMaxMp = Math.max(50, s.maxMp + deltaMaxMp)

    set({
      equippedArts: nextEquippedArts,
      qinggongBonus: newTotals.qinggongBonus,
      maxHp: nextMaxHp,
      hp: Math.min(nextMaxHp, s.hp),
      maxMp: nextMaxMp,
      mp: Math.min(nextMaxMp, s.mp),
      agility: Math.max(1, s.agility + deltaAgi),
      res: Math.max(0, s.res + deltaRes),
      logs: [
        createLogEntry(
          s.dayCount,
          '收功卸招',
          `已散去槽位上的【${oldArt?.name ?? oldArtId}】。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  practiceLearnedArt: (artId) => {
    const s = get()
    const art = MARTIAL_ART_DB_MAP[artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === artId)
    if (!art || idx === -1) return

    const cur = s.learnedArts[idx]
    if (cur.level >= 10) {
      set({
        actionFeedback: {
          text: `【${art.name}】已臻十重返璞归真之境，无需再演武苦修！`,
          tone: 'success',
        },
      })
      return
    }
    if (s.stamina < 10) {
      set({
        actionFeedback: {
          text: `演武精修需耗费 10 点体能（当前 ${s.stamina}/${s.maxStamina}），请先调息或服用茶食！`,
          tone: 'warn',
        },
      })
      return
    }

    const oldTotals = computeEquippedArtsTotals(s.equippedArts, s.learnedArts)
    const nextLearned = s.learnedArts.map((x) => ({ ...x }))
    let nextLv = cur.level
    let nextExp = cur.exp + 45
    let leveledUp = false
    if (nextExp >= 100) {
      nextLv = Math.min(10, nextLv + 1)
      nextExp = nextLv >= 10 ? 100 : nextExp - 100
      leveledUp = true
    }
    nextLearned[idx] = { artId, level: nextLv, exp: nextExp }

    const newTotals = computeEquippedArtsTotals(s.equippedArts, nextLearned)
    const deltaMaxHp = newTotals.maxHp - oldTotals.maxHp
    const deltaMaxMp = newTotals.maxMp - oldTotals.maxMp
    const deltaAgi = newTotals.agility - oldTotals.agility
    const deltaRes = newTotals.res - oldTotals.res

    const nextMaxHp = Math.max(100, s.maxHp + deltaMaxHp)
    const nextMaxMp = Math.max(50, s.maxMp + deltaMaxMp)
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      stamina: Math.max(0, s.stamina - 10),
      learnedArts: nextLearned,
      qinggongBonus: newTotals.qinggongBonus,
      maxHp: nextMaxHp,
      hp: Math.min(nextMaxHp, s.hp + Math.max(0, deltaMaxHp)),
      maxMp: nextMaxMp,
      mp: Math.min(nextMaxMp, s.mp + Math.max(0, deltaMaxMp)),
      agility: Math.max(1, s.agility + deltaAgi),
      res: Math.max(0, s.res + deltaRes),
      logs: [
        createLogEntry(
          clock.dayCount,
          leveledUp ? '武学突破' : '演武苦修',
          leveledUp
            ? `潜心演练【${art.name}】一个时辰（体能 -10），火候突破至第 ${nextLv} 重！`
            : `潜心演练【${art.name}】一个时辰（体能 -10，熟练度 ${nextExp}/100）。`,
          leveledUp,
          clock.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  consumeInventoryItem: (itemId) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def) return
    if (def.equipSlot) {
      get().equipItemToSlot(itemId)
      return
    }
    const eff = def.useEffect
    if (!eff) return

    // Consume stackable medicine/food; keep non-stackable books/scrolls after reading if desired, or consume medicine
    const shouldConsume = def.category === 'medicine' || def.stackable
    const nextInv = shouldConsume
      ? (removeItemFromInventory(s.inventory, itemId, 1) ?? s.inventory)
      : s.inventory

    let nextHp = s.hp
    let nextMaxHp = s.maxHp
    let nextMp = s.mp
    let nextMaxMp = s.maxMp
    let nextStamina = s.stamina
    let nextAgi = s.agility
    let nextRes = s.res
    let nextFood = s.food
    let nextQinggongBonus = s.qinggongBonus
    let nextLearnedArts = s.learnedArts
    const nextSkills = { ...s.skills }
    const notes: string[] = []

    if (eff.learnArtId && MARTIAL_ART_DB_MAP[eff.learnArtId]) {
      const targetArt = MARTIAL_ART_DB_MAP[eff.learnArtId]
      const oldTotals = computeEquippedArtsTotals(s.equippedArts, s.learnedArts)
      const cloned = s.learnedArts.map((x) => ({ ...x }))
      const existIdx = cloned.findIndex((x) => x.artId === eff.learnArtId)
      if (existIdx === -1) {
        cloned.push({ artId: eff.learnArtId, level: 1, exp: 20 })
        notes.push(`新习得武学【${targetArt.name}（第1重）】`)
      } else if (cloned[existIdx].level < 10) {
        let lv = cloned[existIdx].level
        let xp = cloned[existIdx].exp + 50
        if (xp >= 100) {
          lv = Math.min(10, lv + 1)
          xp = lv >= 10 ? 100 : xp - 100
          notes.push(`【${targetArt.name}】突破至第 ${lv} 重`)
        } else {
          notes.push(`【${targetArt.name}】熟练度 +50`)
        }
        cloned[existIdx] = { artId: eff.learnArtId, level: lv, exp: xp }
      }
      nextLearnedArts = cloned
      const newTotals = computeEquippedArtsTotals(s.equippedArts, nextLearnedArts)
      nextMaxHp = Math.max(100, nextMaxHp + (newTotals.maxHp - oldTotals.maxHp))
      nextMaxMp = Math.max(50, nextMaxMp + (newTotals.maxMp - oldTotals.maxMp))
      nextAgi = Math.max(1, nextAgi + (newTotals.agility - oldTotals.agility))
      nextRes = Math.max(0, nextRes + (newTotals.res - oldTotals.res))
      nextQinggongBonus = newTotals.qinggongBonus
    }

    if (eff.hp) {
      nextHp = Math.min(nextMaxHp, nextHp + eff.hp)
      notes.push(`气血 +${eff.hp}`)
    }
    if (eff.mp) {
      nextMp = Math.min(nextMaxMp, nextMp + eff.mp)
      notes.push(`内力 +${eff.mp}`)
    }
    if (eff.stamina) {
      nextStamina = Math.min(s.maxStamina, nextStamina + eff.stamina)
      notes.push(`体能 +${eff.stamina}`)
    }
    if (eff.res) {
      nextRes = Math.min(100, nextRes + eff.res)
      notes.push(`抗性 +${eff.res}`)
    }
    if (eff.food) {
      nextFood += eff.food
      notes.push(`粮草 +${eff.food}日份`)
    }
    if (eff.skillGain) {
      const [sk, gain] = eff.skillGain
      nextSkills[sk] = Math.min(100, (nextSkills[sk] ?? 40) + gain)
      notes.push(`【${sk}】+${gain}`)
    }
    if (eff.learnArtHint && !eff.learnArtId) {
      notes.push(eff.learnArtHint)
    }

    set({
      inventory: nextInv,
      learnedArts: nextLearnedArts,
      qinggongBonus: nextQinggongBonus,
      hp: nextHp,
      maxHp: nextMaxHp,
      mp: nextMp,
      maxMp: nextMaxMp,
      stamina: nextStamina,
      agility: nextAgi,
      res: nextRes,
      food: nextFood,
      skills: nextSkills,
      logs: [
        createLogEntry(
          s.dayCount,
          def.category === 'scrolls' ? '展卷研读' : '服食丹膳',
          `使用【${def.name}】：${notes.join('，')}。`,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  doBuildingAction: (item) => {
    const s = get()
    const cost = item.cost ?? 0
    if (cost > 0 && s.silver < cost) {
      set({
        actionFeedback: {
          text: `囊中羞涩，纹银不足 ${cost} 两！可先去衙门揭榜领赏。`,
          tone: 'warn',
        },
      })
      return
    }

    const isRestInn = item.name.includes('客栈') || item.name.includes('馆驿')
    const staminaCost = isRestInn ? 0 : 12
    if (!isRestInn && s.stamina < staminaCost) {
      set({
        actionFeedback: {
          text: `体能不支（当前 ${s.stamina}/${s.maxStamina}），请先赴客栈投宿调息或服用茯苓酥酪饼！`,
          tone: 'warn',
        },
      })
      return
    }

    let nextSilver = s.silver - cost
    let nextHp = s.hp
    let nextMaxHp = s.maxHp
    let nextMp = s.mp
    let nextMaxMp = s.maxMp
    let nextStamina = isRestInn ? s.maxStamina : Math.max(0, s.stamina - staminaCost)
    let nextAgi = s.agility
    let nextRes = s.res
    let nextRiding = s.ridingSkill
    const nextSkills = { ...s.skills }
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, isRestInn ? 4 : 2)
    const nextDay = clock.dayCount

    const eff = item.effect
    const gains: string[] = []

    if (eff.hp) {
      nextMaxHp += Math.round(eff.hp * 0.25)
      nextHp = Math.min(nextMaxHp, nextHp + eff.hp)
      gains.push(`气血 +${eff.hp}`)
    }
    if (eff.mp) {
      nextMaxMp += Math.round(eff.mp * 0.25)
      nextMp = Math.min(nextMaxMp, nextMp + eff.mp)
      gains.push(`内力 +${eff.mp}`)
    }
    if (isRestInn) {
      nextHp = nextMaxHp
      nextMp = nextMaxMp
      gains.push(`体能全满 (${s.maxStamina})`)
    } else {
      gains.push(`体能 -${staminaCost}`)
    }
    if (eff.agi) {
      nextAgi = Math.min(120, nextAgi + eff.agi)
      gains.push(`身法 +${eff.agi}（现 ${nextAgi}）`)
    }
    if (eff.res) {
      nextRes = Math.min(120, nextRes + eff.res)
      gains.push(`抗性 +${eff.res}（现 ${nextRes}）`)
    }
    if (eff.riding) {
      nextRiding = Math.min(120, nextRiding + eff.riding)
      gains.push(`骑术 +${eff.riding}（现 ${nextRiding}）`)
    }
    if (eff.silver) {
      nextSilver += eff.silver
      gains.push(`纹银 +${eff.silver} 两`)
    }

    const tuples = [eff.skill, eff.skill2, eff.skill3]
    for (const tup of tuples) {
      if (tup) {
        const [sName, delta] = tup
        nextSkills[sName] = Math.min(100, (nextSkills[sName] ?? 40) + delta)
        gains.push(`【${sName}】+${delta}（现 ${nextSkills[sName]}/100）`)
      }
    }

    const shichenLabel = getSongDateParts(nextDay, clock.shichenIdx).shichen.name
    const summary = `于【${item.name}】修历至${shichenLabel}：${gains.join('、')}！`
    const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
    let nextLogs = [
      createLogEntry(nextDay, regionName, summary, false, clock.shichenIdx),
      ...s.logs,
    ]
    let nextMasters = s.roamingMasters

    if (clock.daysAdded > 0 && (nextDay - 1) % 30 === 0) {
      nextMasters = s.roamingMasters.map((m) => {
        const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
        if (neighbors.length === 0) return m
        const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
        return { ...m, nodeId: pick.to }
      })
      const sample = nextMasters[Math.floor(Math.random() * nextMasters.length)]
      if (sample) {
        nextLogs = [
          createLogEntry(
            nextDay,
            '月度风云',
            `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
            true,
            clock.shichenIdx,
          ),
          ...nextLogs,
        ]
      }
    }

    set({
      dayCount: nextDay,
      shichenIdx: clock.shichenIdx,
      silver: nextSilver,
      hp: nextHp,
      maxHp: nextMaxHp,
      mp: nextMp,
      maxMp: nextMaxMp,
      stamina: nextStamina,
      agility: nextAgi,
      res: nextRes,
      ridingSkill: nextRiding,
      skills: nextSkills,
      roamingMasters: nextMasters,
      actionFeedback: { text: summary, tone: 'success' },
      logs: nextLogs.slice(0, 60),
    })

    void get().saveToSlot('autosave', `${regionName} · ${item.name}`, true)
  },

  interactNpc: (npc, mode) => {
    const s = get()
    if (mode === 'talk') {
      set({
        actionFeedback: {
          text: `${npc.name}：${npc.talk}`,
          tone: 'talk',
        },
      })
      return
    }
    if (s.stamina < 6) {
      set({
        actionFeedback: {
          text: `体能不足（需 6 点体能），请稍作调息或用膳后再与名宿切磋雅集。`,
          tone: 'warn',
        },
      })
      return
    }
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
    if (mode === 'art') {
      const nextSkills = {
        ...s.skills,
        诗词: Math.min(100, (s.skills['诗词'] ?? 55) + 2),
        琴: Math.min(100, (s.skills['琴'] ?? 42) + 1),
      }
      set({
        dayCount: clock.dayCount,
        shichenIdx: clock.shichenIdx,
        stamina: Math.max(0, s.stamina - 6),
        skills: nextSkills,
        actionFeedback: {
          text: `与 ${npc.name} 抚琴唱和半个时辰（体能 -6，【诗词】${nextSkills['诗词']}/100、【琴】${nextSkills['琴']}/100）。`,
          tone: 'success',
        },
      })
      return
    }
    if (s.stamina < 10) {
      set({
        actionFeedback: {
          text: `拆招切磋需耗费 10 点体能，请先调息恢复体能！`,
          tone: 'warn',
        },
      })
      return
    }
    const nextMaxMp = s.maxMp + 18
    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      stamina: Math.max(0, s.stamina - 10),
      maxMp: nextMaxMp,
      mp: Math.min(nextMaxMp, s.mp + 18),
      actionFeedback: {
        text: `向 ${npc.name}（${npc.realm}）请益实战拆招，内力修为 +18（体能 -10）！`,
        tone: 'success',
      },
    })
  },

  startJourney: (targetId) => {
    const s = get()
    if (s.traveling) return
    let route = findBestRoute(s.currentNodeId, targetId, {
      mountKey: s.mountKey,
      qinggongBonus: s.qinggongBonus,
      ridingSkill: s.ridingSkill,
      agility: s.agility,
    })
    if (s.campPos && targetId === s.currentNodeId) {
      const targetNode = NODE_MAP[targetId]
      const distPx = targetNode ? Math.hypot(targetNode.x - s.campPos.x, targetNode.y - s.campPos.y) : 40
      const li = Math.max(10, Math.round(distPx * 3.5))
      const days = Math.max(0.25, Number((li / 120).toFixed(2)))
      route = {
        nodes: [s.currentNodeId, targetId],
        segments: [{ from: s.currentNodeId, to: targetId, dist: Math.round(distPx), terrain: 'official', days }],
        totalLi: li,
        totalDays: days,
      }
    }
    if (!route || route.segments.length === 0) return

    if (s.food <= 0) {
      set({
        logs: [
          createLogEntry(
            s.dayCount,
            '粮尽警示',
            '行囊粮草已尽！请点击顶部状态栏【粮草】或开启背包补给后再远征。',
            true,
            s.shichenIdx,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    const currNode = NODE_MAP[s.currentNodeId]
    const targetNode = NODE_MAP[targetId]
    const startPos = s.campPos ?? { x: currNode?.x ?? 856, y: currNode?.y ?? 380 }
    set({
      viewMode: 'world',
      tooltip: null,
      actionFeedback: null,
      campPos: null,
      traveling: {
        targetId,
        route,
        segIdx: 0,
        segProgressDays: 0,
        dayAccumulator: 0,
        playerPos: startPos,
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '启程',
          `自【${currNode?.name ?? s.currentNodeId}】策马出发，奔赴【${targetNode?.name ?? targetId}】（全程 ${route.totalLi} 里）。`,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  stepTravelTick: () => {
    const s = get()
    const tr = s.traveling
    if (!tr) return

    // 行路时钟铁律：每 tick（0.25s）前进一步（整整一个时辰 = 1/12 日），一日十二时辰累计 3.0s
    const stepDay = 1 / 12
    const seg = tr.route.segments[tr.segIdx]
    if (!seg) return

    let segProgressDays = tr.segProgressDays + stepDay
    let dayAccumulator = tr.dayAccumulator + stepDay
    const ratio = Math.min(1, segProgressDays / seg.days)
    const fromNode = NODE_MAP[seg.from]
    const toNode = NODE_MAP[seg.to]
    const curX = fromNode.x + (toNode.x - fromNode.x) * ratio
    const curY = fromNode.y + (toNode.y - fromNode.y) * ratio

    // 每一个 tick 推进恰好一个时辰
    const nextShichenIdx = (s.shichenIdx + 1) % 12

    let nextDayCount = s.dayCount
    let nextFood = s.food
    let nextSilver = s.silver
    let nextHp = s.hp
    let nextMp = s.mp
    let nextStamina = s.stamina
    let nextRes = s.res
    const nextSkills = { ...s.skills }
    const nextLogs = [...s.logs]
    let nextMasters = s.roamingMasters

    if (dayAccumulator >= 1.0) {
      dayAccumulator -= 1.0
      nextDayCount += 1
      if (nextFood > 0) {
        nextFood -= 1
        nextStamina = Math.max(15, nextStamina - 4)
      } else {
        if (nextSilver >= 2) nextSilver -= 2
        nextStamina = Math.max(5, nextStamina - 14)
      }

      if (Math.random() < 0.16) {
        const ev = ROAD_EVENTS[Math.floor(Math.random() * ROAD_EVENTS.length)]
        if (ev) {
          const draft = {
            hp: nextHp,
            maxHp: s.maxHp,
            mp: nextMp,
            maxMp: s.maxMp,
            stamina: nextStamina,
            maxStamina: s.maxStamina,
            silver: nextSilver,
            res: nextRes,
            skills: nextSkills,
          }
          ev.apply(draft)
          nextHp = draft.hp
          nextMp = draft.mp
          nextStamina = draft.stamina
          nextSilver = draft.silver
          nextRes = draft.res
          nextLogs.unshift(createLogEntry(nextDayCount, ev.tag, ev.msg, true, nextShichenIdx))
        }
      }

      if ((nextDayCount - 1) % 30 === 0) {
        nextMasters = s.roamingMasters.map((m) => {
          const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
          if (neighbors.length === 0) return m
          const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
          return { ...m, nodeId: pick.to }
        })
        const sample = nextMasters[Math.floor(Math.random() * nextMasters.length)]
        if (sample) {
          nextLogs.unshift(
            createLogEntry(
              nextDayCount,
              '月度风云',
              `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
              true,
              nextShichenIdx,
            ),
          )
        }
      }
    }

    if (ratio >= 1) {
      const arrivedNodeId = seg.to
      const nextSegIdx = tr.segIdx + 1
      if (nextSegIdx >= tr.route.segments.length) {
        const destName = NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId
        nextLogs.unshift(
          createLogEntry(
            nextDayCount,
            '抵达入图',
            `千里风霜，顺利抵达【${destName}】！主视口已按需展开【${destName}】半3D全景舆图。`,
            true,
            nextShichenIdx,
          ),
        )
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          food: nextFood,
          silver: nextSilver,
          hp: nextHp,
          mp: nextMp,
          stamina: nextStamina,
          res: nextRes,
          skills: nextSkills,
          roamingMasters: nextMasters,
          traveling: null,
          campPos: null,
          currentNodeId: arrivedNodeId,
          selectedNodeId: arrivedNodeId,
          activeRegionId: arrivedNodeId,
          activeBuildingInteriorId: null,
          selectedBuildingId: null,
          selectedSpotId: null,
          viewMode: 'region',
          regionPan: { x: 0, y: 0, scale: 1 },
          logs: nextLogs.slice(0, 60),
        })
        void get().saveToSlot('autosave', `策马抵达${destName}`, true)
        return
      }

      nextLogs.unshift(
        createLogEntry(
          nextDayCount,
          '途经',
          `途经要冲【${NODE_MAP[arrivedNodeId]?.name ?? arrivedNodeId}】，换马饮水后继续前行。`,
          false,
          nextShichenIdx,
        ),
      )
      segProgressDays = 0
      set({
        dayCount: nextDayCount,
        shichenIdx: nextShichenIdx,
        food: nextFood,
        silver: nextSilver,
        hp: nextHp,
        mp: nextMp,
        stamina: nextStamina,
        res: nextRes,
        skills: nextSkills,
        roamingMasters: nextMasters,
        currentNodeId: arrivedNodeId,
        traveling: {
          ...tr,
          segIdx: nextSegIdx,
          segProgressDays,
          dayAccumulator,
          playerPos: { x: toNode.x, y: toNode.y },
        },
        logs: nextLogs.slice(0, 60),
      })
      return
    }

    set({
      dayCount: nextDayCount,
      shichenIdx: nextShichenIdx,
      food: nextFood,
      silver: nextSilver,
      hp: nextHp,
      mp: nextMp,
      stamina: nextStamina,
      res: nextRes,
      skills: nextSkills,
      roamingMasters: nextMasters,
      traveling: {
        ...tr,
        segProgressDays,
        dayAccumulator,
        playerPos: { x: curX, y: curY },
      },
      logs: nextLogs.slice(0, 60),
    })
  },

  campStop: () => {
    const s = get()
    if (!s.traveling) return
    const curPos = s.traveling.playerPos
    const seg = s.traveling.route.segments[s.traveling.segIdx]
    const fromName = seg ? (NODE_MAP[seg.from]?.name ?? seg.from) : '前站'
    const toName = seg ? (NODE_MAP[seg.to]?.name ?? seg.to) : '下一城'
    set({
      traveling: null,
      selectedNodeId: null,
      campPos: curPos,
      stamina: Math.min(s.maxStamina, s.stamina + 20),
      logs: [
        createLogEntry(
          s.dayCount,
          '原地露营',
          `少侠收缰驻马，于【${fromName}】至【${toName}】旷野中途原地安营扎寨（体能 +20）。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  toggleLogDrawer: () => set((s) => ({ logDrawerOpen: !s.logDrawerOpen })),

  openMenu: (tab) => {
    set((s) => ({
      menuOpen: true,
      tooltip: null,
      saveNotice: null,
      activeMenuTab: tab ?? s.activeMenuTab,
    }))
    void get().refreshSaveSlots()
  },

  closeMenu: () => set({ menuOpen: false, saveNotice: null }),
  setMenuTab: (tab) => {
    set({ activeMenuTab: tab, saveNotice: null })
    if (tab === 'save' || tab === 'load') {
      void get().refreshSaveSlots()
    }
  },

  buildSaveEnvelope: (slotId, note = '') => {
    const s = get()
    const st = extractSerializableState(s)
    const regionName = NODE_MAP[st.activeRegionId]?.name ?? st.activeRegionId
    const buildingName = st.activeBuildingInteriorId
      ? (BUILDING_DB_MAP[st.activeBuildingInteriorId]?.name ?? null)
      : null

    return {
      gameTitle: '北宋立志传',
      schemaVersion: 'M1.1.0',
      slotId,
      savedAt: new Date().toISOString(),
      note: note.trim(),
      summary: {
        songDate: formatSongDate(st.dayCount, st.shichenIdx),
        dayCount: st.dayCount,
        shichenIdx: st.shichenIdx,
        regionId: st.activeRegionId,
        regionName,
        viewMode: st.viewMode,
        buildingId: st.activeBuildingInteriorId,
        buildingName,
        hp: st.hp,
        maxHp: st.maxHp,
        stamina: st.stamina,
        maxStamina: st.maxStamina,
        mp: st.mp,
        silver: st.silver,
        food: st.food,
      },
      state: st,
    }
  },

  refreshSaveSlots: async () => {
    const slots = await listAllSaveEnvelopes()
    set({ saveSlots: slots })
  },

  saveToSlot: async (slotId, note = '', silent = false) => {
    if (!silent) {
      set({ saveBusy: true, saveNotice: null })
    }
    const envelope = get().buildSaveEnvelope(slotId, note)
    const backend = await putSaveEnvelope(envelope)
    const slots = await listAllSaveEnvelopes()
    if (silent) {
      set({ saveSlots: slots })
    } else {
      set({
        saveBusy: false,
        saveSlots: slots,
        saveNotice: {
          text: `已将当前江湖进度封入【${slotId === 'autosave' ? '自动卷宗' : slotId.toUpperCase()}】（存储引擎：${backend === 'indexeddb' ? 'IndexedDB' : 'localStorage'}）。`,
          tone: 'success',
        },
      })
    }
  },

  loadFromEnvelope: (envelope, closeAfterLoad = true) => {
    const st = envelope.state
    const restoredLogs = [
      createLogEntry(
        st.dayCount,
        '卷宗启封',
        `已读取存档【${envelope.summary.songDate} · ${envelope.summary.regionName}${envelope.summary.buildingName ? ` · ${envelope.summary.buildingName}` : ''}】。`,
        true,
        st.shichenIdx,
      ),
      ...st.logs,
    ].slice(0, 60)

    set({
      ...st,
      traveling: null,
      tooltip: null,
      actionFeedback: null,
      logs: restoredLogs,
      menuOpen: !closeAfterLoad,
      saveNotice: closeAfterLoad
        ? null
        : {
            text: `已成功回溯至【${envelope.summary.songDate} · ${envelope.summary.regionName}】！`,
            tone: 'success',
          },
    })
  },

  removeSaveSlot: async (slotId) => {
    set({ saveBusy: true, saveNotice: null })
    await deleteSaveSlot(slotId)
    const slots = await listAllSaveEnvelopes()
    set({
      saveBusy: false,
      saveSlots: slots,
      saveNotice: {
        text: `已清空槽位【${slotId === 'autosave' ? '自动卷宗' : slotId.toUpperCase()}】。`,
        tone: 'success',
      },
    })
  },

  setSaveNotice: (notice) => set({ saveNotice: notice }),
}))
