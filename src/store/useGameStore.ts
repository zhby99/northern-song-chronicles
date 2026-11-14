import { create } from 'zustand'
import {
  BUILDING_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  UNIQUE_ARTIFACT_MAP,
} from '../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  canItemFitSlot,
  checkGearEquipRequirements,
  checkMountEquipRequirements,
  checkWeaponEquipRequirements,
  DEFAULT_EQUIPPED_SLOTS,
  DEFAULT_INITIAL_INVENTORY,
  ITEM_DB_MAP,
  normalizeItemTier,
} from '../data/itemsDb'
import {
  canArtFitSlot,
  DEFAULT_EQUIPPED_ARTS,
  DEFAULT_LEARNED_ARTS,
  getArtExpRequired,
} from '../data/playerMartialArts'
import type {
  ActionEffect,
  BagCategoryKey,
  CameraPan,
  CompendiumTabKey,
  EquipmentSlotKey,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameSaveEnvelope,
  HeroBaseStats,
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
  WildernessCamp,
} from '../types/game'
import {
  calcPracticeArtExpGain,
  cloneHeroBaseStats,
  DEFAULT_HERO_BASE_STATS,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
} from '../utils/heroStats'
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
  CURRENT_SAVE_SCHEMA_VERSION,
  deleteSaveSlot,
  listAllSaveEnvelopes,
  putSaveEnvelope,
} from '../utils/saveManager'
import {
  INITIAL_NPC_FAVOR,
  computeGiftFavorGain,
  getNpcFavorProfile,
} from '../utils/npcFavor'
import {
  buildPlayerCombatant,
  createCombatSession,
  resolveCombatRound,
  type CombatActionChoice,
  type CombatSessionState,
} from '../utils/combatEngine'

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
    baseStats: HeroBaseStats
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
      d.baseStats.skills['经义'] = Math.min(
        HERO_BASE_CAPS.civilSkill,
        (d.baseStats.skills['经义'] ?? 60) + 1,
      )
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
    msg: '荒野突遭一品堂/辽廷暗探毒箭伏击！凭护体抗性硬接并击退强敌（抗性根基 +2）。',
    apply: (d) => {
      d.baseStats.res = Math.min(HERO_BASE_CAPS.res, d.baseStats.res + 2)
    },
  },
  {
    tag: '万里山河',
    msg: '策马纵览九州山海壮阔，胸襟大开，赋词一首（诗词 +2，体能 +10）。',
    apply: (d) => {
      d.baseStats.skills['诗词'] = Math.min(
        HERO_BASE_CAPS.civilSkill,
        (d.baseStats.skills['诗词'] ?? 55) + 2,
      )
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

const INITIAL_DERIVED_STATS = deriveHeroEffectiveStats(
  DEFAULT_HERO_BASE_STATS,
  DEFAULT_EQUIPPED_SLOTS,
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

  baseStats: HeroBaseStats
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
  consumedUniqueIds: string[]
  activeBagCategory: BagCategoryKey

  overlays: OverlayToggles
  roamingMasters: RoamingMaster[]
  traveling: TravelState | null
  campPos: WildernessCamp | null

  worldPan: CameraPan
  regionPan: CameraPan

  actionFeedback: { text: string; tone: 'success' | 'warn' | 'talk' } | null
  tooltip: TooltipPayload | null
  logs: LogEntry[]
  logDrawerOpen: boolean

  menuOpen: boolean
  activeNpcInteraction: NodeNpc | null
  activeCombat: CombatSessionState | null
  activeMenuTab: MenuTabKey
  compendiumOpen: boolean
  activeCompendiumTab: CompendiumTabKey
  inspectedNpcId: string | null

  // Save/Load state
  saveSlots: Record<SaveSlotId, GameSaveEnvelope | null>
  saveBusy: boolean
  saveNotice: { text: string; tone: 'success' | 'error' } | null

  // Actions
  clearActionFeedback: () => void
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
  acquireWeaponToBag: (weaponId: string) => void
  acquireItemToBag: (itemId: string) => void
  equipArtToSlot: (artId: string, slot: MartialArtSlotKey) => void
  unequipArtSlot: (slot: MartialArtSlotKey) => void
  practiceLearnedArt: (artId: string) => void
  consumeInventoryItem: (itemId: string, forceUseEffect?: boolean) => void

  doBuildingAction: (item: {
    name: string
    cost?: number
    effect: ActionEffect
  }) => void
  interactNpc: (npc: NodeNpc, mode: 'talk' | 'art' | 'spar') => void
  startNpcCombat: (npc: NodeNpc, mode?: 'spar' | 'duel') => void
  submitCombatAction: (choice: CombatActionChoice) => void
  finishCombatSession: () => void

  startJourney: (targetId: string) => void
  stepTravelTick: () => void
  campStop: () => void

  toggleLogDrawer: () => void
  openMenu: (tab?: MenuTabKey) => void
  npcFavor: Record<string, number>
  openNpcInteraction: (npc: NodeNpc) => void
  closeNpcInteraction: () => void
  giftNpcItem: (npc: NodeNpc, itemId: string) => void
  closeMenu: () => void
  setMenuTab: (tab: MenuTabKey) => void
  openCompendium: (tab?: CompendiumTabKey) => void
  closeCompendium: () => void
  setCompendiumTab: (tab: CompendiumTabKey) => void
  openNpcDetailInCompendium: (npcId: string) => void
  navigateToNpcLeafInCurrentRegion: (npcId: string) => void

  // Save/Load actions
  buildSaveEnvelope: (slotId: SaveSlotId, note?: string) => GameSaveEnvelope
  refreshSaveSlots: () => Promise<void>
  saveToSlot: (slotId: SaveSlotId, note?: string, silent?: boolean) => Promise<void>
  loadFromEnvelope: (envelope: GameSaveEnvelope, closeAfterLoad?: boolean) => void
  removeSaveSlot: (slotId: SaveSlotId) => Promise<void>
  setSaveNotice: (notice: { text: string; tone: 'success' | 'error' } | null) => void
}

function computeCombatSettlement(
  s: Pick<
    GameStoreState,
    'baseStats' | 'equipped' | 'equippedArts' | 'learnedArts' | 'npcFavor'
  >,
  session: CombatSessionState,
) {
  const nextBaseStats = cloneHeroBaseStats(s.baseStats)
  const nextLearnedArts = s.learnedArts.map((x) => ({ ...x }))
  const nextNpcFavor = { ...s.npcFavor }
  const outcome = session.outcome

  const isStrongOpponent = session.npc.maxMp >= session.player.maxMp * 0.85
  const expMult =
    outcome === 'player_win'
      ? isStrongOpponent
        ? 1.0
        : 0.8
      : outcome === 'draw'
        ? 0.6
        : outcome === 'npc_win'
          ? 0.45
          : 0.2

  const practicedArtIds = new Set<string>(session.player.usedArtIdsHistory)
  if (session.lastRoundSummary !== null) {
    if (s.equippedArts.neigong) practicedArtIds.add(s.equippedArts.neigong)
    if (s.equippedArts.qinggong) practicedArtIds.add(s.equippedArts.qinggong)
  }

  const artGainNotes: string[] = []
  let anyBreakthrough = false

  for (const artId of practicedArtIds) {
    const idx = nextLearnedArts.findIndex((x) => x.artId === artId)
    const art = MARTIAL_ART_DB_MAP[artId]
    if (idx === -1 || !art) continue
    const cur = nextLearnedArts[idx]!
    if (cur.level >= 10) continue

    const baseExp = calcPracticeArtExpGain(art, s.baseStats.talents)
    const gain = Math.max(4, Math.round(baseExp * expMult))
    let nextLv = cur.level
    let nextExp = cur.exp + gain
    let leveledUp = false
    while (nextLv < 10) {
      const reqExp = getArtExpRequired(art, nextLv)
      if (reqExp <= 0 || nextExp < reqExp) break
      nextExp -= reqExp
      nextLv += 1
      leveledUp = true
    }
    if (nextLv >= 10) nextExp = 0
    nextLearnedArts[idx] = { artId, level: nextLv, exp: nextExp }

    if (leveledUp) {
      anyBreakthrough = true
      artGainNotes.push(`《${art.cleanName}》突破至第${nextLv}重`)
    } else {
      artGainNotes.push(`《${art.cleanName}》熟练 +${gain}`)
    }
  }

  const npcKey = session.targetNpcNode.id ?? session.targetNpcNode.name
  const curFavor = nextNpcFavor[npcKey] ?? INITIAL_NPC_FAVOR
  let mpRootGain = 0
  let hpRootGain = 0
  let favorGain = 0

  if (outcome === 'player_win') {
    mpRootGain = isStrongOpponent ? 22 : 14
    hpRootGain = isStrongOpponent ? 14 : 8
    favorGain = 4
  } else if (outcome === 'draw') {
    mpRootGain = 10
    hpRootGain = 6
    favorGain = 2
  } else if (outcome === 'npc_win') {
    mpRootGain = 6
    favorGain = 1
  }

  nextBaseStats.maxMp += mpRootGain
  nextBaseStats.maxHp += hpRootGain
  if (favorGain > 0) {
    nextNpcFavor[npcKey] = Math.min(100, curFavor + favorGain)
  }

  const derived = deriveHeroEffectiveStats(
    nextBaseStats,
    s.equipped,
    s.equippedArts,
    nextLearnedArts,
  )
  const deltaMaxHp = Math.max(0, derived.maxHp - session.player.maxHp)
  const deltaMaxMp = Math.max(0, derived.maxMp - session.player.maxMp)
  const minSafeHp =
    session.mode === 'spar' ? Math.max(1, Math.round(derived.maxHp * 0.15)) : 1
  const nextHp = Math.min(
    derived.maxHp,
    Math.max(minSafeHp, session.player.hp + deltaMaxHp),
  )
  const nextMp = Math.min(
    derived.maxMp,
    Math.max(0, session.player.mp + deltaMaxMp),
  )

  const summaryParts: string[] = []
  if (hpRootGain > 0) summaryParts.push(`气血根基 +${hpRootGain}`)
  if (mpRootGain > 0) summaryParts.push(`内力根基 +${mpRootGain}`)
  if (favorGain > 0) {
    summaryParts.push(`${session.npc.name}好感 +${favorGain}（现 ${nextNpcFavor[npcKey]}/100）`)
  }
  if (artGainNotes.length > 0) {
    summaryParts.push(artGainNotes.join('、'))
  }
  if (session.mode === 'spar' && session.player.hp <= 0) {
    summaryParts.push(`切磋点到为止（调息保底气血 ${nextHp}/${derived.maxHp}）`)
  }

  const rewardsSummary =
    summaryParts.length > 0
      ? summaryParts.join(' · ')
      : '虚晃一招全身而退，未有额外武学感悟。'

  const outcomeTitle =
    outcome === 'player_win'
      ? `力挫【${session.npc.name}】（${session.round}合获胜）`
      : outcome === 'draw'
        ? `与【${session.npc.name}】拆招${session.round}合秋色平分`
        : outcome === 'escaped'
          ? `与【${session.npc.name}】交锋中途飘然脱战`
          : `向【${session.npc.name}】请益${session.round}合惜败`

  const logTag =
    outcome === 'player_win'
      ? '武林凯旋'
      : anyBreakthrough
        ? '实战突破'
        : '实战切磋'

  return {
    nextBaseStats,
    nextLearnedArts,
    derived,
    nextHp,
    nextMp,
    nextNpcFavor,
    rewardsSummary,
    logTag,
    logText: `${outcomeTitle}：${rewardsSummary}。`,
    anyBreakthrough,
  }
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
    campPos: s.campPos ? { ...s.campPos } : null,
    baseStats: cloneHeroBaseStats(s.baseStats),
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
    consumedUniqueIds: [...s.consumedUniqueIds],
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

  baseStats: cloneHeroBaseStats(DEFAULT_HERO_BASE_STATS),
  mountKey: INITIAL_DERIVED_STATS.mountKey,
  qinggongBonus: INITIAL_DERIVED_STATS.qinggongBonus,
  ridingSkill: INITIAL_DERIVED_STATS.ridingSkill,
  agility: INITIAL_DERIVED_STATS.agility,
  silver: 5120,
  food: 25,
  hp: INITIAL_DERIVED_STATS.maxHp,
  maxHp: INITIAL_DERIVED_STATS.maxHp,
  mp: INITIAL_DERIVED_STATS.maxMp,
  maxMp: INITIAL_DERIVED_STATS.maxMp,
  stamina: INITIAL_DERIVED_STATS.maxStamina,
  maxStamina: INITIAL_DERIVED_STATS.maxStamina,
  res: INITIAL_DERIVED_STATS.res,
  skills: { ...INITIAL_DERIVED_STATS.skills },

  equipped: { ...DEFAULT_EQUIPPED_SLOTS },
  learnedArts: DEFAULT_LEARNED_ARTS.map((x) => ({ ...x })),
  equippedArts: { ...DEFAULT_EQUIPPED_ARTS },
  inventory: DEFAULT_INITIAL_INVENTORY.map((x) => ({ ...x })),
  consumedUniqueIds: [],
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
      '百兵入典',
      '已清空旧版占位披挂，正式载入《皇祐披挂总纲 · 百兵谱》100 种武器（10天阶 · 20地阶 · 30良阶 · 40凡阶）与兵武共鸣系统！',
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
  activeNpcInteraction: null,
  activeCombat: null,
  activeMenuTab: 'hero',
  compendiumOpen: false,
  activeCompendiumTab: 'regions',
  inspectedNpcId: null,

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

  clearActionFeedback: () => set({ actionFeedback: null }),
  setTooltip: (payload) => set({ tooltip: payload }),
  moveTooltip: (x, y) =>
    set((s) => (s.tooltip ? { tooltip: { ...s.tooltip, x, y } } : s)),

  clearFloatingSelection: () => {
    const s = get()
    if (s.viewMode === 'world') {
      set({ selectedNodeId: null, actionFeedback: null })
    } else if (s.viewMode === 'building') {
      set({ selectedSpotId: null, selectedBuildingId: null, actionFeedback: null })
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
    const hasSubSpots = bRecord.interior.spots.length > 0
    const modeDesc =
      bRecord.interior.mode === 'image'
        ? '半3D手绘建筑内景图'
        : hasSubSpots
          ? '宋式营造矢量内景卷'
          : '市井独堂实景（无子建筑）'
    set({
      tooltip: null,
      viewMode: 'building',
      activeBuildingInteriorId: bldgId,
      selectedBuildingId: hasSubSpots ? null : bldgId,
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
        if (bInterior.spots.length === 0) {
          target = { x: vw / 2, y: vh / 2 - 36 }
        } else {
          target = s.selectedSpotId
            ? (bInterior.spots.find((sp) => sp.id === s.selectedSpotId) ?? null)
            : null
        }
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

    if (def.weaponMeta) {
      const reqCheck = checkWeaponEquipRequirements(def.weaponMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: s.baseStats.talents,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以驾驭${def.weaponMeta.fullTier}神兵【${def.name}】！未达佩备门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '神兵反噬', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

    if (def.gearMeta) {
      const reqCheck = checkGearEquipRequirements(def.gearMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: s.baseStats.talents,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以穿佩${def.gearMeta.tier}${def.gearMeta.grade}重宝【${def.name}】！未达披挂门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '宝甲奇珍受限', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

    if (def.mountMeta) {
      const reqCheck = checkMountEquipRequirements(def.mountMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: s.baseStats.talents,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以驯服${def.mountMeta.fullTier}烈马【${def.name}】！未达乘骑门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '神驹不受羁勒', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

    if (def.gearMeta) {
      const reqCheck = checkGearEquipRequirements(def.gearMeta, {
        maxHp: s.maxHp,
        maxMp: s.maxMp,
        agility: s.agility,
        res: s.res,
        ridingSkill: s.ridingSkill,
        skills: s.skills,
        talents: s.baseStats.talents,
      })
      if (!reqCheck.ok) {
        const unmetStr = reqCheck.details
          .filter((d) => !d.met)
          .map((d) => `${d.stat} ${d.current}/${d.min}`)
          .join('、')
        const warnMsg = `难以佩备${def.gearMeta.tier}${def.gearMeta.grade}重宝【${def.name}】！未达佩备门槛：${unmetStr}`
        set({
          actionFeedback: {
            text: warnMsg,
            tone: 'warn',
          },
          logs: [
            createLogEntry(s.dayCount, '佩备受阻', warnMsg, true, s.shichenIdx),
            ...s.logs,
          ].slice(0, 60),
        })
        return
      }
    }

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

    const nextEquipped: EquippedSlotsMap = {
      ...s.equipped,
      [slot]: itemId,
    }
    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      nextEquipped,
      s.equippedArts,
      s.learnedArts,
    )

    set({
      equipped: nextEquipped,
      inventory: nextInv,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      maxStamina: derived.maxStamina,
      stamina: Math.min(derived.maxStamina, s.stamina),
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      actionFeedback: {
        text: `已佩备【${def.name}】！`,
        tone: 'success',
      },
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

    const nextEquipped: EquippedSlotsMap = {
      ...s.equipped,
      [slot]: null,
    }
    const nextInv = addItemToInventory(s.inventory, oldItemId, 1)
    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      nextEquipped,
      s.equippedArts,
      s.learnedArts,
    )

    set({
      equipped: nextEquipped,
      inventory: nextInv,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      maxStamina: derived.maxStamina,
      stamina: Math.min(derived.maxStamina, s.stamina),
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      actionFeedback: {
        text: `已卸下【${oldDef?.name ?? oldItemId}】，角色自身属性根基毫发无损。`,
        tone: 'talk',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '卸除佩备',
          `已将【${oldDef?.name ?? oldItemId}】收入${oldDef?.category === 'tools' ? '雅器百工' : '行囊杂物'}栏。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acquireWeaponToBag: (weaponId) => {
    const s = get()
    const def = ITEM_DB_MAP[weaponId]
    if (!def || !def.weaponMeta) return
    if (s.equipped.weapon === weaponId || s.inventory.some((x) => x.itemId === weaponId)) {
      set({
        actionFeedback: {
          text: `【${def.name}】已在少侠随身佩备或行囊之中！`,
          tone: 'talk',
        },
      })
      return
    }
    const nextInv = addItemToInventory(s.inventory, weaponId, 1)
    set({
      inventory: nextInv,
      actionFeedback: {
        text: `已将${def.weaponMeta.fullTier}兵刃【${def.name}】收入【行囊四库 → 行囊杂物】！`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '百兵品鉴',
          `自《百兵谱》调取【${def.name}（${def.weaponMeta.fullTier}·${def.weaponMeta.weaponType}）】入囊备用。`,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acquireItemToBag: (itemId) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def) return
    const isEquipped = Object.values(s.equipped).includes(itemId)
    const existingQty = s.inventory.find((x) => x.itemId === itemId)?.qty ?? 0

    if (s.consumedUniqueIds.includes(itemId)) {
      set({
        actionFeedback: {
          text: `【${def.name}】乃天地孤品（举世仅此一件），已由少侠服食炼化，世间再无复本！`,
          tone: 'warn',
        },
      })
      return
    }
    if (!def.stackable && (isEquipped || existingQty > 0)) {
      set({
        actionFeedback: {
          text: `【${def.name}】已在少侠随身佩备或行囊之中！`,
          tone: 'talk',
        },
      })
      return
    }
    if (def.stackable && existingQty >= 99) {
      set({
        actionFeedback: {
          text: `【${def.name}】随身携带数量已达上限（99件）！`,
          tone: 'talk',
        },
      })
      return
    }

    const catLabel =
      BAG_CATEGORY_METAS.find((c) => c.key === def.category)?.label ?? '行囊四库'
    const tierLabel = normalizeItemTier(def.rarity)
    const nextInv = addItemToInventory(s.inventory, itemId, 1)

    set({
      inventory: nextInv,
      actionFeedback: {
        text: `已自《博物图鉴》调取${tierLabel}【${def.name}】收入【行囊四库 → ${catLabel}】！`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          '博物品鉴',
          `自《皇祐博物图鉴》调取【${def.name}（${tierLabel}·${def.subType}）】×1 收入${catLabel}栏。`,
          true,
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

    const nextEquippedArts: EquippedArtsMap = { ...s.equippedArts }

    // Ensure the same martial art is not duplicated in two slots
    for (const k of Object.keys(nextEquippedArts) as MartialArtSlotKey[]) {
      if (nextEquippedArts[k] === artId) {
        nextEquippedArts[k] = null
      }
    }
    const prevInSlot = s.equippedArts[slot]
    nextEquippedArts[slot] = artId

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      nextEquippedArts,
      s.learnedArts,
    )

    set({
      equippedArts: nextEquippedArts,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: {
        text: `已将【${art.name}】运使入槽！`,
        tone: 'success',
      },
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

    const nextEquippedArts: EquippedArtsMap = {
      ...s.equippedArts,
      [slot]: null,
    }
    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      nextEquippedArts,
      s.learnedArts,
    )

    set({
      equippedArts: nextEquippedArts,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: {
        text: `已散去槽位上的【${oldArt?.name ?? oldArtId}】。`,
        tone: 'talk',
      },
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

    const expGain = calcPracticeArtExpGain(art, s.baseStats.talents)
    const nextLearned = s.learnedArts.map((x) => ({ ...x }))
    let nextLv = cur.level
    let nextExp = cur.exp + expGain
    let leveledUp = false
    while (nextLv < 10) {
      const reqExp = getArtExpRequired(art, nextLv)
      if (reqExp <= 0 || nextExp < reqExp) break
      nextExp -= reqExp
      nextLv += 1
      leveledUp = true
    }
    if (nextLv >= 10) {
      nextExp = 0
    }
    nextLearned[idx] = { artId, level: nextLv, exp: nextExp }

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      s.equippedArts,
      nextLearned,
    )
    const deltaMaxHp = Math.max(0, derived.maxHp - s.maxHp)
    const deltaMaxMp = Math.max(0, derived.maxMp - s.maxMp)
    const nextReqExp = getArtExpRequired(art, nextLv)
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
    const msgText = leveledUp
      ? `潜心演练【${art.name}】一个时辰（体能 -10，熟练度 +${expGain}），火候突破至第 ${nextLv} 重！`
      : `潜心演练【${art.name}】一个时辰（体能 -10，熟练度 +${expGain} → ${nextExp}/${nextReqExp}）。`

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      stamina: Math.max(0, s.stamina - 10),
      learnedArts: nextLearned,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp + deltaMaxHp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp + deltaMaxMp),
      agility: derived.agility,
      res: derived.res,
      actionFeedback: {
        text: msgText,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          clock.dayCount,
          leveledUp ? '武学突破' : '演武苦修',
          msgText,
          leveledUp,
          clock.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  consumeInventoryItem: (itemId, forceUseEffect = false) => {
    const s = get()
    const def = ITEM_DB_MAP[itemId]
    if (!def) return
    if (def.equipSlot && !forceUseEffect) {
      get().equipItemToSlot(itemId)
      return
    }
    const eff = def.useEffect
    if (!eff) return

    // 铁律：武学秘籍只能用于初次学会入门（第 1 重），不可靠继续翻阅刷熟练度或重复领属性
    if (eff.learnArtId && MARTIAL_ART_DB_MAP[eff.learnArtId]) {
      const targetArt = MARTIAL_ART_DB_MAP[eff.learnArtId]
      const alreadyLearned = s.learnedArts.some((x) => x.artId === eff.learnArtId)
      if (alreadyLearned) {
        set({
          actionFeedback: {
            text: `少侠已通晓【${targetArt.name}】入门心法！秘籍仅作初窥门径之用，无法靠重复翻阅提升熟练度，请赴【披挂与武学】演练精修。`,
            tone: 'warn',
          },
        })
        return
      }
    }

    const requiresStudyStamina =
      (def.category === 'tools' || def.category === 'scrolls') && !def.stackable && !eff.stamina
    if (requiresStudyStamina && s.stamina < 6) {
      set({
        actionFeedback: {
          text: `${def.category === 'scrolls' ? '展卷参悟典籍' : '把玩雅器修习'}需耗费 6 点体能（当前 ${s.stamina}/${s.maxStamina}），请先调息歇脚！`,
          tone: 'warn',
        },
      })
      return
    }

    // Consume stackable medicine/food/consumable tools; keep non-stackable books/scrolls & durable curio tools
    const shouldConsume = def.category === 'medicine' || def.stackable
    const nextInv = shouldConsume
      ? (removeItemFromInventory(s.inventory, itemId, 1) ?? s.inventory)
      : s.inventory

    const nextBaseStats = cloneHeroBaseStats(s.baseStats)
    let nextLearnedArts = s.learnedArts
    let nextFood = s.food
    const notes: string[] = []

    const clock =
      def.category === 'tools' || def.category === 'scrolls'
        ? advanceShichenClock(s.dayCount, s.shichenIdx, 1)
        : { dayCount: s.dayCount, shichenIdx: s.shichenIdx, daysAdded: 0 }

    if (eff.learnArtId && MARTIAL_ART_DB_MAP[eff.learnArtId]) {
      const targetArt = MARTIAL_ART_DB_MAP[eff.learnArtId]
      nextLearnedArts = [
        ...s.learnedArts.map((x) => ({ ...x })),
        { artId: eff.learnArtId, level: 1, exp: 0 },
      ]
      notes.push(`初窥门径，习得武学【${targetArt.name}（第1重）】`)
    }

    if (eff.maxHp) {
      nextBaseStats.maxHp += eff.maxHp
      notes.push(`气血根基上限 +${eff.maxHp}`)
    }
    if (eff.maxMp) {
      nextBaseStats.maxMp += eff.maxMp
      notes.push(`内力根基上限 +${eff.maxMp}`)
    }
    if (eff.maxStamina) {
      nextBaseStats.maxStamina += eff.maxStamina
      notes.push(`体能根基上限 +${eff.maxStamina}`)
    }
    if (eff.agi) {
      const prev = nextBaseStats.agility
      nextBaseStats.agility = Math.min(HERO_BASE_CAPS.agility, prev + eff.agi)
      notes.push(
        nextBaseStats.agility > prev
          ? `身法根基 +${nextBaseStats.agility - prev}`
          : `身法根基已臻上限 (${HERO_BASE_CAPS.agility})`,
      )
    }
    if (eff.res) {
      const prev = nextBaseStats.res
      nextBaseStats.res = Math.min(HERO_BASE_CAPS.res, prev + eff.res)
      notes.push(
        nextBaseStats.res > prev
          ? `抗性根基 +${nextBaseStats.res - prev}`
          : `抗性根基已臻上限 (${HERO_BASE_CAPS.res})`,
      )
    }
    if (eff.riding) {
      const prev = nextBaseStats.ridingSkill
      nextBaseStats.ridingSkill = Math.min(HERO_BASE_CAPS.ridingSkill, prev + eff.riding)
      notes.push(
        nextBaseStats.ridingSkill > prev
          ? `【骑术】+${nextBaseStats.ridingSkill - prev}`
          : `【骑术】根基已满 (${HERO_BASE_CAPS.ridingSkill})`,
      )
    }
    if (eff.skillGain) {
      const [sk, gain] = eff.skillGain
      const prev = nextBaseStats.skills[sk] ?? 40
      nextBaseStats.skills[sk] = Math.min(HERO_BASE_CAPS.civilSkill, prev + gain)
      notes.push(
        nextBaseStats.skills[sk] > prev
          ? `【${sk}】+${nextBaseStats.skills[sk] - prev}`
          : `【${sk}】根基已满 (${HERO_BASE_CAPS.civilSkill})`,
      )
    }
    if (eff.food) {
      nextFood += eff.food
      notes.push(`粮草 +${eff.food}日份`)
    }

    const derived = deriveHeroEffectiveStats(
      nextBaseStats,
      s.equipped,
      s.equippedArts,
      nextLearnedArts,
    )

    let nextHp = Math.min(derived.maxHp, s.hp)
    let nextMp = Math.min(derived.maxMp, s.mp)
    let nextStamina = requiresStudyStamina
      ? Math.max(0, Math.min(derived.maxStamina, s.stamina) - 6)
      : Math.min(derived.maxStamina, s.stamina)

    if (eff.hp) {
      nextHp = Math.min(derived.maxHp, nextHp + eff.hp)
      notes.push(`气血 +${eff.hp}`)
    }
    if (eff.mp) {
      nextMp = Math.min(derived.maxMp, nextMp + eff.mp)
      notes.push(`内力 +${eff.mp}`)
    }
    if (eff.stamina) {
      nextStamina = Math.min(derived.maxStamina, nextStamina + eff.stamina)
      notes.push(`体能 +${eff.stamina}`)
    } else if (requiresStudyStamina) {
      notes.push('体能 -6')
    }
    if (eff.learnArtHint && !eff.learnArtId) {
      notes.push(eff.learnArtHint)
    }

    const logTag =
      def.category === 'scrolls'
        ? '展卷研读'
        : def.category === 'tools'
          ? '雅器修习'
          : '服食丹膳'

    const nextConsumedUnique =
      shouldConsume && UNIQUE_ARTIFACT_MAP[itemId] && !s.consumedUniqueIds.includes(itemId)
        ? [...s.consumedUniqueIds, itemId]
        : s.consumedUniqueIds

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      inventory: nextInv,
      baseStats: nextBaseStats,
      consumedUniqueIds: nextConsumedUnique,
      learnedArts: nextLearnedArts,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      hp: nextHp,
      maxHp: derived.maxHp,
      mp: nextMp,
      maxMp: derived.maxMp,
      stamina: nextStamina,
      maxStamina: derived.maxStamina,
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      food: nextFood,
      skills: derived.skills,
      actionFeedback: {
        text: `${logTag}【${def.name}】：${notes.join('，')}。`,
        tone: 'success',
      },
      logs: [
        createLogEntry(
          clock.dayCount,
          logTag,
          `使用【${def.name}】：${notes.join('，')}。`,
          true,
          clock.shichenIdx,
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
    const nextBaseStats = cloneHeroBaseStats(s.baseStats)
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, isRestInn ? 4 : 2)
    const nextDay = clock.dayCount

    const eff = item.effect
    const gains: string[] = []

    if (eff.hp) {
      nextBaseStats.maxHp += Math.round(eff.hp * 0.25)
    }
    if (eff.mp) {
      nextBaseStats.maxMp += Math.round(eff.mp * 0.25)
    }
    if (eff.agi) {
      nextBaseStats.agility = Math.min(HERO_BASE_CAPS.agility, nextBaseStats.agility + eff.agi)
    }
    if (eff.res) {
      nextBaseStats.res = Math.min(HERO_BASE_CAPS.res, nextBaseStats.res + eff.res)
    }
    if (eff.riding) {
      nextBaseStats.ridingSkill = Math.min(
        HERO_BASE_CAPS.ridingSkill,
        nextBaseStats.ridingSkill + eff.riding,
      )
    }
    if (eff.silver) {
      nextSilver += eff.silver
    }

    const tuples = [eff.skill, eff.skill2, eff.skill3]
    for (const tup of tuples) {
      if (tup) {
        const [sName, delta] = tup
        nextBaseStats.skills[sName] = Math.min(
          HERO_BASE_CAPS.civilSkill,
          (nextBaseStats.skills[sName] ?? 40) + delta,
        )
      }
    }

    const derived = deriveHeroEffectiveStats(
      nextBaseStats,
      s.equipped,
      s.equippedArts,
      s.learnedArts,
    )

    let nextHp = Math.min(derived.maxHp, s.hp + (eff.hp ?? 0))
    let nextMp = Math.min(derived.maxMp, s.mp + (eff.mp ?? 0))
    const nextStamina = isRestInn
      ? derived.maxStamina
      : Math.max(0, Math.min(derived.maxStamina, s.stamina) - staminaCost)

    if (eff.hp) gains.push(`气血 +${eff.hp}`)
    if (eff.mp) gains.push(`内力 +${eff.mp}`)
    if (isRestInn) {
      nextHp = derived.maxHp
      nextMp = derived.maxMp
      gains.push(`体能全满 (${derived.maxStamina})`)
    } else {
      gains.push(`体能 -${staminaCost}`)
    }
    if (eff.agi) gains.push(`身法 +${eff.agi}（现 ${derived.agility}）`)
    if (eff.res) gains.push(`抗性 +${eff.res}（现 ${derived.res}）`)
    if (eff.riding) gains.push(`骑术 +${eff.riding}（现 ${derived.ridingSkill}）`)
    if (eff.silver) gains.push(`纹银 +${eff.silver} 两`)
    for (const tup of tuples) {
      if (tup) {
        const [sName, delta] = tup
        gains.push(`【${sName}】+${delta}（根基 ${nextBaseStats.skills[sName]}/100）`)
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
      baseStats: nextBaseStats,
      hp: nextHp,
      maxHp: derived.maxHp,
      mp: nextMp,
      maxMp: derived.maxMp,
      stamina: nextStamina,
      maxStamina: derived.maxStamina,
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
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
    if (mode === 'spar') {
      get().startNpcCombat(npc, 'spar')
      return
    }
    if (s.stamina < 6) {
      set({
        actionFeedback: {
          text: `体能不足（需 6 点体能），请稍作调息或用膳后再与名宿雅集论道。`,
          tone: 'warn',
        },
      })
      return
    }
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
    const civilKeys = ['算术', '经义', '策论', '诗词', '琴', '棋', '书', '画', '辩才'] as const
    let primarySkill: (typeof civilKeys)[number] = '诗词'
    let secondarySkill: (typeof civilKeys)[number] = '琴'
    if (npc.tenArts) {
      const sorted = [...civilKeys].sort(
        (a, b) => (npc.tenArts?.[b] ?? 0) - (npc.tenArts?.[a] ?? 0),
      )
      primarySkill = sorted[0] ?? '诗词'
      secondarySkill = sorted[1] ?? '琴'
    }
    const nextBaseStats = cloneHeroBaseStats(s.baseStats)
    const nextPrimaryBase = Math.min(
      HERO_BASE_CAPS.civilSkill,
      (nextBaseStats.skills[primarySkill] ?? 45) + 2,
    )
    const nextSecondaryBase = Math.min(
      HERO_BASE_CAPS.civilSkill,
      (nextBaseStats.skills[secondarySkill] ?? 45) + 1,
    )
    nextBaseStats.skills[primarySkill] = nextPrimaryBase
    nextBaseStats.skills[secondarySkill] = nextSecondaryBase
    const derived = deriveHeroEffectiveStats(
      nextBaseStats,
      s.equipped,
      s.equippedArts,
      s.learnedArts,
    )
    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      stamina: Math.max(0, s.stamina - 6),
      baseStats: nextBaseStats,
      skills: derived.skills,
      actionFeedback: {
        text: `与 ${npc.name} 雅集论道半个时辰（体能 -6，【${primarySkill}】+2 根基 ${nextPrimaryBase}/100、【${secondarySkill}】+1 根基 ${nextSecondaryBase}/100）。`,
        tone: 'success',
      },
    })
  },

  startNpcCombat: (npc, mode = 'spar') => {
    const s = get()
    if (s.stamina < 10) {
      set({
        actionFeedback: {
          text: `登台拆招需耗费 10 点体能（当前 ${s.stamina}/${s.maxStamina}），请先调息歇脚或用膳恢复！`,
          tone: 'warn',
        },
      })
      return
    }
    if (s.hp <= 1) {
      set({
        actionFeedback: {
          text: `少侠当前气血奄奄一息（${s.hp}/${s.maxHp}），请先服食伤药或调息恢复气血后再与名宿拆招！`,
          tone: 'warn',
        },
      })
      return
    }

    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
    const playerCombatant = buildPlayerCombatant({
      hp: s.hp,
      mp: s.mp,
      baseStats: s.baseStats,
      equipped: s.equipped,
      equippedArts: s.equippedArts,
      learnedArts: s.learnedArts,
    })
    const session = createCombatSession({
      mode,
      player: playerCombatant,
      npcNode: npc,
    })

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      stamina: Math.max(0, s.stamina - 10),
      activeCombat: session,
      menuOpen: false,
      compendiumOpen: false,
      tooltip: null,
      actionFeedback: null,
    })
  },

  submitCombatAction: (choice) => {
    const s = get()
    if (!s.activeCombat || s.activeCombat.outcome !== 'ongoing') return

    let nextInventory = s.inventory
    let nextBaseStats = s.baseStats
    let nextConsumedUniqueIds = s.consumedUniqueIds
    let nextFood = s.food
    let nextStamina = s.stamina

    if (choice.type === 'item') {
      const def = ITEM_DB_MAP[choice.itemId]
      if (!def || def.category !== 'medicine') return
      const removed = removeItemFromInventory(s.inventory, choice.itemId, 1)
      if (!removed) return
      nextInventory = removed
      if (
        UNIQUE_ARTIFACT_MAP[choice.itemId] &&
        !s.consumedUniqueIds.includes(choice.itemId)
      ) {
        nextConsumedUniqueIds = [...s.consumedUniqueIds, choice.itemId]
      }
      const eff = def.useEffect
      if (eff) {
        const cloned = cloneHeroBaseStats(s.baseStats)
        if (eff.maxHp) cloned.maxHp += eff.maxHp
        if (eff.maxMp) cloned.maxMp += eff.maxMp
        if (eff.maxStamina) cloned.maxStamina += eff.maxStamina
        if (eff.agi) {
          cloned.agility = Math.min(HERO_BASE_CAPS.agility, cloned.agility + eff.agi)
        }
        if (eff.res) {
          cloned.res = Math.min(HERO_BASE_CAPS.res, cloned.res + eff.res)
        }
        if (eff.skillGain) {
          const [sk, gain] = eff.skillGain
          cloned.skills[sk] = Math.min(
            HERO_BASE_CAPS.civilSkill,
            (cloned.skills[sk] ?? 40) + gain,
          )
        }
        if (eff.food) nextFood += eff.food
        if (eff.stamina) {
          const derivedTmp = deriveHeroEffectiveStats(
            cloned,
            s.equipped,
            s.equippedArts,
            s.learnedArts,
          )
          nextStamina = Math.min(derivedTmp.maxStamina, s.stamina + eff.stamina)
        }
        nextBaseStats = cloned
      }
    }

    let nextSession = resolveCombatRound(s.activeCombat, choice)
    if (nextSession.outcome !== 'ongoing') {
      const preview = computeCombatSettlement(
        {
          ...s,
          baseStats: nextBaseStats,
        },
        nextSession,
      )
      nextSession = {
        ...nextSession,
        rewardsSummary: preview.rewardsSummary,
      }
    }
    set({
      activeCombat: nextSession,
      inventory: nextInventory,
      baseStats: nextBaseStats,
      consumedUniqueIds: nextConsumedUniqueIds,
      food: nextFood,
      stamina: nextStamina,
    })
  },

  finishCombatSession: () => {
    const s = get()
    const session = s.activeCombat
    if (!session || session.outcome === 'ongoing') return

    const res = computeCombatSettlement(s, session)
    const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'

    set({
      activeCombat: null,
      baseStats: res.nextBaseStats,
      learnedArts: res.nextLearnedArts,
      npcFavor: res.nextNpcFavor,
      mountKey: res.derived.mountKey,
      qinggongBonus: res.derived.qinggongBonus,
      ridingSkill: res.derived.ridingSkill,
      agility: res.derived.agility,
      res: res.derived.res,
      skills: res.derived.skills,
      maxHp: res.derived.maxHp,
      hp: res.nextHp,
      maxMp: res.derived.maxMp,
      mp: res.nextMp,
      maxStamina: res.derived.maxStamina,
      stamina: Math.min(res.derived.maxStamina, s.stamina),
      actionFeedback: {
        text: res.logText,
        tone: session.outcome === 'npc_win' || session.outcome === 'escaped' ? 'warn' : 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          res.logTag,
          res.logText,
          session.outcome === 'player_win' || res.anyBreakthrough,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })

    void get().saveToSlot('autosave', `${regionName} · 战后调息`, true)
  },

  startJourney: (targetId) => {
    const s = get()
    if (s.traveling) return
    const route = findBestRoute(
      s.currentNodeId,
      targetId,
      {
        mountKey: s.mountKey,
        qinggongBonus: s.qinggongBonus,
        ridingSkill: s.ridingSkill,
        agility: s.agility,
      },
      s.campPos,
    )
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
    const wasCamped = Boolean(s.campPos)
    const startPos = s.campPos
      ? { x: s.campPos.x, y: s.campPos.y }
      : { x: currNode?.x ?? 856, y: currNode?.y ?? 380 }
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
          wasCamped
            ? `拔营启程，自旷野营地策马直奔【${targetNode?.name ?? targetId}】（全程 ${route.totalLi} 里）。`
            : `自【${currNode?.name ?? s.currentNodeId}】策马出发，奔赴【${targetNode?.name ?? targetId}】（全程 ${route.totalLi} 里）。`,
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
    const fromPos = seg.fromCoords ?? NODE_MAP[seg.from]
    const toNode = NODE_MAP[seg.to]
    const curX = fromPos.x + (toNode.x - fromPos.x) * ratio
    const curY = fromPos.y + (toNode.y - fromPos.y) * ratio

    // 每一个 tick 推进恰好一个时辰
    const nextShichenIdx = (s.shichenIdx + 1) % 12

    let nextDayCount = s.dayCount
    let nextFood = s.food
    let nextSilver = s.silver
    let nextHp = s.hp
    let nextMp = s.mp
    let nextStamina = s.stamina
    let nextBaseStats = s.baseStats
    let nextRes = s.res
    let nextSkills = s.skills
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
          const clonedBase = cloneHeroBaseStats(s.baseStats)
          const draft = {
            hp: nextHp,
            maxHp: s.maxHp,
            mp: nextMp,
            maxMp: s.maxMp,
            stamina: nextStamina,
            maxStamina: s.maxStamina,
            silver: nextSilver,
            baseStats: clonedBase,
          }
          ev.apply(draft)
          const derived = deriveHeroEffectiveStats(
            clonedBase,
            s.equipped,
            s.equippedArts,
            s.learnedArts,
          )
          nextBaseStats = clonedBase
          nextHp = Math.min(derived.maxHp, draft.hp)
          nextMp = Math.min(derived.maxMp, draft.mp)
          nextStamina = Math.min(derived.maxStamina, draft.stamina)
          nextSilver = draft.silver
          nextRes = derived.res
          nextSkills = derived.skills
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
          baseStats: nextBaseStats,
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
        baseStats: nextBaseStats,
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
      baseStats: nextBaseStats,
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
    if (!seg) return

    const r = Math.min(1, Math.max(0, s.traveling.segProgressDays / seg.days))
    let camp: WildernessCamp
    if (seg.campEdge) {
      const { u, v, distU, distV, terrain } = seg.campEdge
      if (seg.to === v) {
        camp = {
          x: curPos.x,
          y: curPos.y,
          u,
          v,
          distU: distU + distV * r,
          distV: distV * (1 - r),
          terrain,
        }
      } else {
        camp = {
          x: curPos.x,
          y: curPos.y,
          u,
          v,
          distU: distU * (1 - r),
          distV: distV + distU * r,
          terrain,
        }
      }
    } else {
      camp = {
        x: curPos.x,
        y: curPos.y,
        u: seg.from,
        v: seg.to,
        distU: seg.dist * r,
        distV: seg.dist * (1 - r),
        terrain: seg.terrain,
      }
    }

    const fromName = NODE_MAP[camp.u]?.name ?? camp.u
    const toName = NODE_MAP[camp.v]?.name ?? camp.v
    set({
      traveling: null,
      selectedNodeId: null,
      campPos: camp,
      stamina: Math.min(s.maxStamina, s.stamina + 20),
      logs: [
        createLogEntry(
          s.dayCount,
          '原地露营',
          `少侠收缰驻马，于【${fromName}】至【${toName}】旷野中途原地安营扎寨（距${fromName} ${Math.round(camp.distU)} 里 · 距${toName} ${Math.round(camp.distV)} 里，体能 +20）。`,
          false,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  toggleLogDrawer: () => set((s) => ({ logDrawerOpen: !s.logDrawerOpen })),

  npcFavor: {},

  openNpcInteraction: (npc) => {
    set({
      activeNpcInteraction: npc,
      tooltip: null,
    })
  },

  closeNpcInteraction: () => {
    set({ activeNpcInteraction: null })
  },

  giftNpcItem: (npc, itemId) => {
    const s = get()
    const item = ITEM_DB_MAP[itemId]
    if (!item) return
    const existing = s.inventory.find((st) => st.itemId === itemId && st.qty > 0)
    if (!existing) return
    const nextInventory = s.inventory
      .map((st) => (st.itemId === itemId ? { ...st, qty: st.qty - 1 } : st))
      .filter((st) => st.qty > 0)

    const npcKey = npc.id ?? npc.name
    const currentFavor = s.npcFavor[npcKey] ?? INITIAL_NPC_FAVOR
    const profile = getNpcFavorProfile(npc)
    const res = computeGiftFavorGain(currentFavor, item, profile)

    const reactionText =
      res.reaction === 'liked'
        ? `${npc.name}见是心爱之物「${res.giftCategory}」，大喜过望（好感度 +${res.favorGain}，2.0×）。`
        : res.reaction === 'disliked'
          ? `${npc.name}对「${res.giftCategory}」素来厌恶，只得勉强收下（好感度 +${res.favorGain}，0.2×）。`
          : `${npc.name}欣然收下，言谈间亲近了几分（好感度 +${res.favorGain}）。`

    set({
      inventory: nextInventory,
      npcFavor: {
        ...s.npcFavor,
        [npcKey]: res.nextFavor,
      },
      actionFeedback: {
        text: `向【${npc.name}】赠予「${item.name}」（价值${item.value}两），${reactionText} 当前好感度：${res.nextFavor}/100。`,
        tone: res.reaction === 'disliked' ? 'warn' : 'success',
      },
    })
  },

  openMenu: (tab) => {
    set((s) => ({
      menuOpen: true,
      compendiumOpen: false,
      tooltip: null,
      saveNotice: null,
      activeMenuTab: tab ?? s.activeMenuTab,
    }))
    void get().refreshSaveSlots()
  },

  openCompendium: (tab) => {
    set((s) => ({
      compendiumOpen: true,
      menuOpen: false,
      tooltip: null,
      saveNotice: null,
      activeCompendiumTab: tab ?? s.activeCompendiumTab,
    }))
  },

  closeCompendium: () => set({ compendiumOpen: false, saveNotice: null }),
  setCompendiumTab: (tab) => set({ activeCompendiumTab: tab, saveNotice: null }),

  openNpcDetailInCompendium: (npcId) => {
    set({
      inspectedNpcId: npcId,
      compendiumOpen: true,
      menuOpen: false,
      tooltip: null,
      saveNotice: null,
      activeCompendiumTab: 'portraits',
    })
  },

  navigateToNpcLeafInCurrentRegion: (npcId) => {
    const s = get()
    const npc = NPC_DB_MAP[npcId]
    if (!npc) return
    if (s.currentNodeId !== npc.regionId || s.campPos || s.traveling) return

    const bRecord = BUILDING_DB_MAP[npc.assignedBuildingId]
    if (!bRecord) return

    if (npc.assignedSpotId && bRecord.interior) {
      set({
        menuOpen: false,
        compendiumOpen: false,
        saveNotice: null,
        tooltip: null,
        viewMode: 'building',
        activeRegionId: npc.regionId,
        activeBuildingInteriorId: bRecord.id,
        selectedBuildingId: null,
        selectedSpotId: npc.assignedSpotId,
        regionPan: { x: 0, y: 0, scale: 1 },
        actionFeedback: {
          text: `已循名帖步入【${npc.fullLocationLabel}】，可与 ${npc.name} 交互。`,
          tone: 'success',
        },
      })
    } else if (bRecord.interior) {
      set({
        menuOpen: false,
        compendiumOpen: false,
        saveNotice: null,
        tooltip: null,
        viewMode: 'building',
        activeRegionId: npc.regionId,
        activeBuildingInteriorId: bRecord.id,
        selectedBuildingId: bRecord.id,
        selectedSpotId: null,
        regionPan: { x: 0, y: 0, scale: 1 },
        actionFeedback: {
          text: `已循名帖步入【${npc.fullLocationLabel}】大堂，可与 ${npc.name} 交互。`,
          tone: 'success',
        },
      })
    } else {
      set({
        menuOpen: false,
        compendiumOpen: false,
        saveNotice: null,
        tooltip: null,
        viewMode: 'region',
        activeRegionId: npc.regionId,
        activeBuildingInteriorId: null,
        selectedSpotId: null,
        selectedBuildingId: bRecord.id,
        regionPan: { x: 0, y: 0, scale: 1 },
        actionFeedback: {
          text: `已循名帖前往【${npc.fullLocationLabel}】，可与 ${npc.name} 交互。`,
          tone: 'success',
        },
      })
    }
  },

  closeMenu: () => set({ menuOpen: false, compendiumOpen: false, saveNotice: null }),
  setMenuTab: (tab) => {
    set({ activeMenuTab: tab, saveNotice: null })
    if (tab === 'save' || tab === 'load') {
      void get().refreshSaveSlots()
    }
  },

  buildSaveEnvelope: (slotId, note = '') => {
    const s = get()
    const st = extractSerializableState(s)
    const regionName = st.campPos
      ? `${NODE_MAP[st.campPos.u]?.name ?? st.campPos.u}—${NODE_MAP[st.campPos.v]?.name ?? st.campPos.v}旷野营地`
      : (NODE_MAP[st.activeRegionId]?.name ?? st.activeRegionId)
    const buildingName = st.activeBuildingInteriorId
      ? (BUILDING_DB_MAP[st.activeBuildingInteriorId]?.name ?? null)
      : null

    return {
      gameTitle: '北宋立志传',
      schemaVersion: CURRENT_SAVE_SCHEMA_VERSION,
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
    const cleanBase = cloneHeroBaseStats(st.baseStats)
    const derived = deriveHeroEffectiveStats(
      cleanBase,
      st.equipped,
      st.equippedArts,
      st.learnedArts,
    )
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
      baseStats: cleanBase,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      ridingSkill: derived.ridingSkill,
      agility: derived.agility,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, st.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, st.mp),
      maxStamina: derived.maxStamina,
      stamina: Math.min(derived.maxStamina, st.stamina),
      res: derived.res,
      skills: derived.skills,
      consumedUniqueIds: st.consumedUniqueIds ?? [],
      campPos: st.campPos ?? null,
      traveling: null,
      activeCombat: null,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      logs: restoredLogs,
      compendiumOpen: false,
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
