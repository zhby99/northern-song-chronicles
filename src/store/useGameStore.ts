import { create } from 'zustand'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPCS_DB,
  NPC_DB_MAP,
  resolveNpcByName,
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
  getArtCombatExpRequired,
  getArtExpRequired,
} from '../data/playerMartialArts'
import { QUEST_MAP } from '../data/quests'
import {
  cloneQuestRuntimeState,
  DEFAULT_QUEST_RUNTIME_STATE,
  evaluateQuestCondition,
  findMatchingLocationTriggers,
  resolveQuestCombatOpponent,
  type QuestEvalContext,
} from '../engine/questEngine'
import type {
  ActionEffect,
  BagCategoryKey,
  CameraPan,
  CompendiumTabKey,
  CultivationDurationMode,
  CultivationSessionState,
  EquipmentSlotKey,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameOverState,
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
  PlayerSectState,
  RoamingMaster,
  SaveSlotId,
  SectRankLevel,
  SerializableGameState,
  TooltipPayload,
  TravelState,
  ViewMode,
  WildernessCamp,
} from '../types/game'
import type {
  ActiveStorySceneState,
  QuestEffect,
  QuestRuntimeState,
  QuestTargetLocationHint,
} from '../types/quest'
import {
  calcDailyCultivationExpGain,
  cloneHeroBaseStats,
  DAILY_INN_LODGING_COST,
  DEFAULT_HERO_BASE_STATS,
  deriveHeroEffectiveStats,
  getHeroAge,
  HERO_BASE_CAPS,
  isPlayerInOwnSectRegion,
  resolveCultivationVenue,
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
  MAX_NPC_FAVOR,
  MIN_NPC_FAVOR,
  computeGiftFavorGain,
  getNpcFavorProfile,
} from '../utils/npcFavor'
import {
  buildPlayerCombatant,
  createCombatSession,
  resolveCombatRound,
  type CombatActionChoice,
  type CombatSessionState,
  type DuelStakesKind,
} from '../utils/combatEngine'
import {
  applySongLiaoSuspicionFavorPenalty,
  buildNodeNpcFromLiaoSpy,
  buildZhanZhaoArrestNodeNpc,
  canPlayerLearnSectArt,
  CHANGSHAN_ADULT_AGE,
  clonePlayerSectState,
  DEFAULT_PLAYER_SECT_STATE,
  evaluateSectEntry,
  evaluateSectPromotion,
  getChangshanMonthlyStipend,
  getSectRankTitle,
  getSectTeachableArts,
  isSongAlignedNpc,
  isSongOfficialForRobbery,
  KAIFENG_RECOMMENDATION_ITEM_ID,
  LIAO_SPY_HALF_YEAR_DAYS,
  REFERRAL_BRIBE_BY_SOURCE_SECT,
  spawnAnnualLiaoSpy,
} from '../utils/sectMechanics'

const LABEL_KEYS: LabelToggleKey[] = ['cityLabels', 'sectPassLabels', 'masters', 'distance']

interface RoadEventDef {
  tag: string
  msg: string
  apply: (draft: {
    hp: number
    maxHp: number
    mp: number
    maxMp: number
    combatExp: number
    silver: number
    baseStats: HeroBaseStats
  }) => void
}

const ROAD_EVENTS: RoadEventDef[] = [
  {
    tag: '胡商偶遇',
    msg: '途遇西域高昌驼队，购得天山雪莲散少许（气血 +45，内力 +30）。',
    apply: (d) => {
      d.hp = Math.min(d.maxHp, d.hp + 45)
      d.mp = Math.min(d.maxMp, d.mp + 30)
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
    msg: '山道窜出剪径匪类，少侠弹指震飞匪首兵刃，缴获纹银 12 两（战斗经验 +15）！',
    apply: (d) => {
      d.silver += 12
      d.combatExp += 15
    },
  },
  {
    tag: '密探截杀',
    msg: '荒野突遭一品堂/辽廷暗探毒箭伏击！少侠运起护体真气震飞冷箭并击退强敌，缴获密囊纹银 18 两（战斗经验 +20）。',
    apply: (d) => {
      d.silver += 18
      d.combatExp += 20
    },
  },
  {
    tag: '万里山河',
    msg: '策马纵览九州山海壮阔，胸襟大开，赋词一首（诗词 +2，内力 +20）。',
    apply: (d) => {
      d.baseStats.skills['诗词'] = Math.min(
        HERO_BASE_CAPS.civilSkill,
        (d.baseStats.skills['诗词'] ?? 55) + 2,
      )
      d.mp = Math.min(d.maxMp, d.mp + 20)
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
  combatExp: number
  silver: number
  food: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
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
  cultivationSession: CultivationSessionState | null
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
  activeStoryScene: ActiveStorySceneState | null
  gameOver: GameOverState | null
  sectState: PlayerSectState
  questState: QuestRuntimeState
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
  cultivateLearnedArt: (artId: string, mode?: CultivationDurationMode) => void
  stepCultivationTick: () => void
  stopCultivationEarly: () => void
  breakthroughLearnedArt: (artId: string) => void
  consumeInventoryItem: (itemId: string, forceUseEffect?: boolean) => void

  doBuildingAction: (item: {
    name: string
    cost?: number
    effect: ActionEffect
  }) => void
  interactNpc: (npc: NodeNpc, mode: 'talk' | 'art' | 'spar') => void
  startNpcCombat: (
    npc: NodeNpc,
    mode?: 'spar' | 'duel',
    duelStakes?: DuelStakesKind,
    forceMandatory?: boolean,
  ) => void
  submitCombatAction: (choice: CombatActionChoice) => void
  finishCombatSession: () => void
  restartAfterGameOver: () => void

  // Sect & Faction Mechanics
  joinSect: (targetSectId: string, mentorNpc?: NodeNpc) => void
  leaveSect: () => void
  acceptToumingzhuang: (npc?: NodeNpc) => void
  performSectDuty: (npc?: NodeNpc) => void
  promoteSectRank: () => void
  bribeForReferral: (npc: NodeNpc) => void
  claimKaifengRecommendation: (npc?: NodeNpc) => void
  learnSectMartialArt: (artId: string) => void

  // Declarative Quest & Story Scene Engine
  runQuestEffects: (effects: QuestEffect[], contextNpc?: NodeNpc | null) => void
  advanceStoryScene: () => void
  selectStoryChoice: (choiceId: string) => void
  closeStoryScene: () => void
  fireLocationTriggersForCurrentSpot: (loc: {
    regionId: string
    buildingId?: string | null
    spotId?: string | null
    isPassThrough?: boolean
  }) => boolean
  checkExpiredQuestDeadlines: () => void
  locateQuestTargetOnMap: (target: QuestTargetLocationHint) => void

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

function applyDayProgressionSectHooks(params: {
  nextDayCount: number
  shichenIdx: number
  silver: number
  sectState: PlayerSectState
  logs: LogEntry[]
}): {
  silver: number
  sectState: PlayerSectState
  logs: LogEntry[]
  overdueSpyAmbush: NodeNpc | null
} {
  let nextSilver = params.silver
  const nextSect = clonePlayerSectState(params.sectState)
  const nextLogs = [...params.logs]
  let overdueSpyAmbush: NodeNpc | null = null

  if (nextSect.sectId === 'SECT-22') {
    const heroAge = getHeroAge(params.nextDayCount)
    const curMonthIdx = Math.floor((params.nextDayCount - 1) / 30)
    if (heroAge < CHANGSHAN_ADULT_AGE) {
      // 未满18岁暂不支领军饷，亦不派发燕云诛谍军令
      if (curMonthIdx > nextSect.lastStipendMonth) {
        nextSect.lastStipendMonth = curMonthIdx
      }
    } else {
      if (curMonthIdx > nextSect.lastStipendMonth) {
        const months = curMonthIdx - nextSect.lastStipendMonth
        const perMonth = getChangshanMonthlyStipend(nextSect.rank)
        const totalStipend = perMonth * months
        nextSilver += totalStipend
        nextSect.lastStipendMonth = curMonthIdx
        nextLogs.unshift(
          createLogEntry(
            params.nextDayCount,
            '常山军饷',
            `河北边军按月支放【常山枪派 · ${nextSect.rankLabel}】月度军饷 +${totalStipend} 两纹银！`,
            true,
            params.shichenIdx,
          ),
        )
      }

      if (nextSect.activeLiaoSpy && params.nextDayCount > nextSect.activeLiaoSpy.deadlineDay) {
        overdueSpyAmbush = buildNodeNpcFromLiaoSpy(nextSect.activeLiaoSpy)
        nextLogs.unshift(
          createLogEntry(
            params.nextDayCount,
            '军令逾限',
            `半年度锄奸军令期限已至！潜伏燕云之辽国密谍【${nextSect.activeLiaoSpy.name}】反追踪而至，展开不死不休截杀！`,
            true,
            params.shichenIdx,
          ),
        )
      } else {
        const curHalfYearIdx = Math.floor((params.nextDayCount - 1) / LIAO_SPY_HALF_YEAR_DAYS) + 1
        if (!nextSect.activeLiaoSpy && curHalfYearIdx > nextSect.lastLiaoSpyMissionYear) {
          const spy = spawnAnnualLiaoSpy(curHalfYearIdx, params.nextDayCount)
          nextSect.lastLiaoSpyMissionYear = curHalfYearIdx
          nextSect.activeLiaoSpy = spy
          nextLogs.unshift(
            createLogEntry(
              params.nextDayCount,
              '燕云锄奸',
              `【常山枪派第${curHalfYearIdx}期半年度强制军令】辽国密谍【${spy.name}（${spy.title} · ${spy.realm}）】现踪燕云【${spy.regionName} · ${spy.buildingName}】！须于第 ${spy.deadlineDay} 日前寻获并生死决战诛除！`,
              true,
              params.shichenIdx,
            ),
          )
        }
      }
    }
  }

  return {
    silver: nextSilver,
    sectState: nextSect,
    logs: nextLogs,
    overdueSpyAmbush,
  }
}

function grantArtProficiency(
  learnedArts: LearnedArtEntry[],
  artId: string | null | undefined,
  rawGain: number,
): { note: string | null; leveledUp: boolean } {
  if (!artId || rawGain <= 0) return { note: null, leveledUp: false }
  const idx = learnedArts.findIndex((x) => x.artId === artId)
  const art = MARTIAL_ART_DB_MAP[artId]
  if (idx === -1 || !art) return { note: null, leveledUp: false }
  const cur = learnedArts[idx]!
  if (cur.level >= 10) {
    return { note: `《${art.cleanName}》已臻第10重圆满`, leveledUp: false }
  }

  const gain = Math.max(1, Math.round(rawGain))
  let nextLv = cur.level
  let nextExp = cur.exp + gain
  let leveledUp = false
  let hitCombatExpGate = false
  while (nextLv < 10) {
    const reqExp = getArtExpRequired(art, nextLv)
    if (reqExp <= 0 || nextExp < reqExp) break
    const reqCombatExp = getArtCombatExpRequired(art, nextLv)
    if (reqCombatExp > 0) {
      nextExp = reqExp
      hitCombatExpGate = true
      break
    }
    nextExp -= reqExp
    nextLv += 1
    leveledUp = true
  }
  if (nextLv >= 10) nextExp = 0
  learnedArts[idx] = { artId, level: nextLv, exp: nextExp }

  return {
    note: leveledUp
      ? `《${art.cleanName}》突破至第${nextLv}重`
      : hitCombatExpGate
        ? `《${art.cleanName}》第${nextLv}重火候已满（待战经破境）`
        : `《${art.cleanName}》熟练 +${gain}`,
    leveledUp,
  }
}

function computeCombatSettlement(
  s: Pick<
    GameStoreState,
    'baseStats' | 'combatExp' | 'equipped' | 'equippedArts' | 'learnedArts' | 'npcFavor'
  >,
  session: CombatSessionState,
) {
  const nextBaseStats = cloneHeroBaseStats(s.baseStats)
  const nextLearnedArts = s.learnedArts.map((x) => ({ ...x }))
  const nextNpcFavor = { ...s.npcFavor }
  const outcome = session.outcome

  const isStrongOpponent = session.npc.maxMp >= session.player.maxMp * 0.85
  const oppMp = session.npc.maxMp
  const tierCombatBase =
    oppMp < 450 ? 15 : oppMp < 950 ? 22 : oppMp < 1800 ? 30 : oppMp < 3200 ? 40 : 50

  let combatExpGain = 0
  if (session.mode === 'spar') {
    if (outcome === 'player_win') {
      combatExpGain = Math.max(15, Math.round(tierCombatBase * (isStrongOpponent ? 1.0 : 0.85)))
    } else if (outcome === 'draw') {
      combatExpGain = Math.max(10, Math.round(tierCombatBase * 0.6))
    } else if (outcome === 'npc_win') {
      combatExpGain = Math.max(6, Math.round(tierCombatBase * 0.4))
    }
  } else {
    if (outcome === 'player_win') {
      combatExpGain = Math.round(tierCombatBase * 2.0)
      if (session.duelStakes === 'liao_spy_duel') combatExpGain += 80
      else if (session.duelStakes === 'rob_official') combatExpGain += 60
      else if (session.duelStakes === 'zhan_zhao_arrest') combatExpGain += 100
    } else if (outcome === 'draw') {
      combatExpGain = Math.max(15, Math.round(tierCombatBase * 1.0))
    }
  }
  const nextCombatExp = s.combatExp + combatExpGain

  const expMult =
    outcome === 'player_win'
      ? isStrongOpponent
        ? 1.15
        : 0.9
      : outcome === 'draw'
        ? 0.65
        : outcome === 'npc_win'
          ? 0.5
          : 0.2

  const practicedArtIds = new Set<string>(session.player.usedArtIdsHistory)
  if (session.lastRoundSummary !== null) {
    if (s.equippedArts.neigong) practicedArtIds.add(s.equippedArts.neigong)
    if (s.equippedArts.qinggong) practicedArtIds.add(s.equippedArts.qinggong)
  }

  const artGainNotes: string[] = []
  let anyBreakthrough = false

  for (const artId of practicedArtIds) {
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art) continue
    const baseDaily = calcDailyCultivationExpGain(art, s.baseStats.talents, 1.0)
    const gain = Math.max(20, Math.round(baseDaily * 0.5 * expMult))
    const res = grantArtProficiency(nextLearnedArts, artId, gain)
    if (res.note && !res.note.includes('已臻第10重圆满')) {
      artGainNotes.push(res.note)
    }
    if (res.leveledUp) {
      anyBreakthrough = true
    }
  }

  const npcKey = session.targetNpcNode.id ?? session.targetNpcNode.name
  const curFavor = nextNpcFavor[npcKey] ?? INITIAL_NPC_FAVOR
  let favorGain = 0

  if (session.mode === 'spar') {
    if (outcome === 'player_win') {
      favorGain = 4
    } else if (outcome === 'draw') {
      favorGain = 2
    } else if (outcome === 'npc_win') {
      favorGain = 1
    }
  }

  if (favorGain > 0) {
    nextNpcFavor[npcKey] = Math.min(MAX_NPC_FAVOR, curFavor + favorGain)
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
  if (combatExpGain > 0) {
    summaryParts.push(`战斗经验 +${combatExpGain}（现 ${nextCombatExp}）`)
  }
  if (artGainNotes.length > 0) {
    summaryParts.push(artGainNotes.join('、'))
  }
  if (favorGain > 0) {
    summaryParts.push(`${session.npc.name}好感 +${favorGain}（现 ${nextNpcFavor[npcKey]}/100）`)
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
      ? session.mode === 'duel'
        ? `生死决战诛胜【${session.npc.name}】（${session.round}合）`
        : `力挫【${session.npc.name}】（${session.round}合获胜）`
      : outcome === 'draw'
        ? `与【${session.npc.name}】拆招${session.round}合秋色平分`
        : outcome === 'escaped'
          ? `与【${session.npc.name}】交锋中途飘然脱战`
          : session.mode === 'duel'
            ? `与【${session.npc.name}】生死相搏${session.round}合败亡`
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
    nextCombatExp,
    combatExpGain,
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
    combatExp: s.combatExp,
    silver: s.silver,
    food: s.food,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    res: s.res,
    skills: { ...s.skills },
    equipped: { ...s.equipped },
    learnedArts: s.learnedArts.map((x) => ({ ...x })),
    equippedArts: { ...s.equippedArts },
    inventory: s.inventory.map((x) => ({ ...x })),
    consumedUniqueIds: [...s.consumedUniqueIds],
    npcFavor: { ...s.npcFavor },
    sectState: clonePlayerSectState(s.sectState),
    questState: cloneQuestRuntimeState(s.questState),
    overlays: { ...s.overlays },
    roamingMasters: s.roamingMasters.map((m) => ({ ...m })),
    worldPan: { ...s.worldPan },
    regionPan: { ...s.regionPan },
    logs: s.logs.slice(0, 60),
  }
}

export function buildStoreEvalContext(
  s: Pick<
    GameStoreState,
    | 'dayCount'
    | 'shichenIdx'
    | 'silver'
    | 'food'
    | 'hp'
    | 'maxHp'
    | 'mp'
    | 'maxMp'
    | 'agility'
    | 'res'
    | 'baseStats'
    | 'skills'
    | 'inventory'
    | 'learnedArts'
    | 'npcFavor'
    | 'sectState'
    | 'questState'
  >,
  targetNpc?: NodeNpc | null,
): QuestEvalContext {
  return {
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    silver: s.silver,
    food: s.food,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    agility: s.agility,
    res: s.res,
    baseStats: s.baseStats,
    skills: s.skills,
    inventory: s.inventory,
    learnedArts: s.learnedArts,
    npcFavor: s.npcFavor,
    sectState: s.sectState,
    questState: s.questState,
    targetNpc: targetNpc ?? null,
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
  combatExp: 80,
  silver: 5120,
  food: 25,
  hp: INITIAL_DERIVED_STATS.maxHp,
  maxHp: INITIAL_DERIVED_STATS.maxHp,
  mp: INITIAL_DERIVED_STATS.maxMp,
  maxMp: INITIAL_DERIVED_STATS.maxMp,
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
  cultivationSession: null,
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
  activeStoryScene: null,
  gameOver: null,
  sectState: clonePlayerSectState(DEFAULT_PLAYER_SECT_STATE),
  questState: cloneQuestRuntimeState(DEFAULT_QUEST_RUNTIME_STATE),
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
  selectRegionBuilding: (bldgId) => {
    set({ selectedBuildingId: bldgId, actionFeedback: null })
    if (bldgId) {
      const s = get()
      const bRec = BUILDING_DB_MAP[bldgId]
      // Base city buildings have no interior sub-map; selecting them visits the leaf building
      if (!bRec?.interior && s.currentNodeId === s.activeRegionId && !s.campPos && !s.traveling) {
        get().fireLocationTriggersForCurrentSpot({
          regionId: s.activeRegionId,
          buildingId: bldgId,
          spotId: null,
        })
      }
    }
  },
  selectBuildingSpot: (spotId) => {
    set({ selectedSpotId: spotId, actionFeedback: null })
    if (spotId) {
      const s = get()
      if (
        s.activeBuildingInteriorId &&
        s.currentNodeId === s.activeRegionId &&
        !s.campPos &&
        !s.traveling
      ) {
        get().fireLocationTriggersForCurrentSpot({
          regionId: s.activeRegionId,
          buildingId: s.activeBuildingInteriorId,
          spotId,
        })
      }
    }
  },

  enterRegionMap: (nodeId, logSwitch = false) => {
    const s = get()
    const node = NODE_MAP[nodeId]
    const cfg = REGIONAL_CONFIGS[nodeId]
    if (!node || !cfg) return
    if (s.traveling) {
      get().campStop()
    }
    const isKaifengAmbush =
      nodeId === 'bianliang' &&
      (s.sectState.songCourtBlacklisted || Boolean(s.questState.flags.song_court_blacklisted))
    let logs = logSwitch
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

    if (isKaifengAmbush) {
      logs = [
        createLogEntry(
          s.dayCount,
          '开封缉捕',
          '少侠身负劫掠大宋朝廷官员之海捕黑名单，甫一踏入东京开封府，御前四品带刀护卫「南侠」展昭已执剑拦路，不死不休！',
          true,
          s.shichenIdx,
        ),
        ...logs,
      ].slice(0, 60)
    }

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

    get().fireLocationTriggersForCurrentSpot({
      regionId: nodeId,
      buildingId: null,
      spotId: null,
    })

    if (isKaifengAmbush && !get().activeStoryScene && !get().activeCombat && !get().gameOver) {
      get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
      return
    }

    if (logSwitch && !get().activeStoryScene && !get().activeCombat && !get().gameOver) {
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

    if (s.currentNodeId === s.activeRegionId && !s.campPos && !s.traveling) {
      get().fireLocationTriggersForCurrentSpot({
        regionId: s.activeRegionId,
        buildingId: bldgId,
        spotId: null,
      })
    }
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
    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, s.sectState.sectId)
    const lodgingCost = inOwnSectCity ? 0 : DAILY_INN_LODGING_COST
    if (lodgingCost > 0 && s.silver < lodgingCost) {
      set({
        actionFeedback: {
          text: `异乡客舍投宿调息需纹银 ${lodgingCost} 两，当前银两不足！`,
          tone: 'warn',
        },
      })
      return
    }
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 3)
    const nextHp = s.maxHp
    const nextMp = s.maxMp
    const logTitle = inOwnSectCity ? '师门调息' : '客舍调息'
    const logMsg = inOwnSectCity
      ? '于本门驻地静室安睡调息三个时辰（师门驻地免宿费），周身气血与真气内息尽数充盈！'
      : `花费 ${lodgingCost} 两纹银于客舍安睡三个时辰，周身气血与真气内息尽数平复充盈！`
    const baseLogs = [
      createLogEntry(clock.dayCount, logTitle, logMsg, false, clock.shichenIdx),
      ...s.logs,
    ]
    const dayHook =
      clock.daysAdded > 0
        ? applyDayProgressionSectHooks({
            nextDayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            silver: s.silver - lodgingCost,
            sectState: s.sectState,
            logs: baseLogs,
          })
        : {
            silver: s.silver - lodgingCost,
            sectState: s.sectState,
            logs: baseLogs,
            overdueSpyAmbush: null,
          }
    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      silver: dayHook.silver,
      sectState: dayHook.sectState,
      hp: nextHp,
      mp: nextMp,
      actionFeedback: {
        text: logMsg,
        tone: 'success',
      },
      logs: dayHook.logs.slice(0, 60),
    })
    if (dayHook.overdueSpyAmbush) {
      get().startNpcCombat(dayHook.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    }
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
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      actionFeedback: {
        text: `已卸下【${oldDef?.name ?? oldItemId}】，实战属性已按当前运使武学与其余披挂重算。`,
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

  breakthroughLearnedArt: (artId) => {
    const s = get()
    const art = MARTIAL_ART_DB_MAP[artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === artId)
    if (!art || idx === -1) return

    const cur = s.learnedArts[idx]!
    if (cur.level >= 10) {
      set({
        actionFeedback: {
          text: `【${art.name}】已臻十重返璞归真之境！`,
          tone: 'success',
        },
      })
      return
    }

    const reqExp = getArtExpRequired(art, cur.level)
    if (cur.exp < reqExp) {
      set({
        actionFeedback: {
          text: `【${art.name}】当前熟练度 ${cur.exp.toLocaleString()}/${reqExp.toLocaleString()}，尚未修满第 ${cur.level} 重火候，请先闭关修炼！`,
          tone: 'warn',
        },
      })
      return
    }

    const reqCombatExp = getArtCombatExpRequired(art, cur.level)
    if (s.combatExp < reqCombatExp) {
      set({
        actionFeedback: {
          text: `战斗经验不足！《${art.cleanName}》突破至第 ${cur.level + 1} 重需消耗 ${reqCombatExp} 点战斗经验（当前 ${s.combatExp} 点），请通过切磋、决战、门派当差或衙门缉凶积攒！`,
          tone: 'warn',
        },
      })
      return
    }

    const nextLv = cur.level + 1
    const nextExp = nextLv >= 10 ? 0 : Math.max(0, cur.exp - reqExp)
    const nextCombatExp = s.combatExp - reqCombatExp
    const nextLearned = s.learnedArts.map((x) => ({ ...x }))
    nextLearned[idx] = { artId, level: nextLv, exp: nextExp }

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      s.equippedArts,
      nextLearned,
    )
    const deltaMaxHp = Math.max(0, derived.maxHp - s.maxHp)
    const deltaMaxMp = Math.max(0, derived.maxMp - s.maxMp)
    const msgText =
      reqCombatExp > 0
        ? `以实战武道印证心法（消耗战斗经验 ${reqCombatExp} 点，余 ${nextCombatExp}），【${art.name}】豁然贯通，破境升至第 ${nextLv} 重！`
        : `水到渠成！【${art.name}】顺利突破至第 ${nextLv} 重！`

    set({
      combatExp: nextCombatExp,
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
        createLogEntry(s.dayCount, '武学破境', msgText, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  cultivateLearnedArt: (artId, mode = 1) => {
    const s = get()
    if (s.cultivationSession) return
    const art = MARTIAL_ART_DB_MAP[artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === artId)
    if (!art || idx === -1) return

    const cur = s.learnedArts[idx]!
    if (cur.level >= 10) {
      set({
        actionFeedback: {
          text: `【${art.name}】已臻十重返璞归真之境，无需再闭关苦修！`,
          tone: 'success',
        },
      })
      return
    }

    const initReqExp = getArtExpRequired(art, cur.level)
    const initReqCombat = getArtCombatExpRequired(art, cur.level)
    if (cur.exp >= initReqExp) {
      if (s.combatExp >= initReqCombat) {
        get().breakthroughLearnedArt(artId)
        return
      }
      set({
        actionFeedback: {
          text: `《${art.cleanName}》第 ${cur.level} 重火候已满！破境升入第 ${cur.level + 1} 重需消耗 ${initReqCombat} 点战斗经验（当前 ${s.combatExp} 点），请先出关实战历练！`,
          tone: 'warn',
        },
      })
      return
    }

    const venueStatus = resolveCultivationVenue({
      traveling: Boolean(s.traveling),
      campPos: s.campPos,
      viewMode: s.viewMode,
      currentNodeId: s.currentNodeId,
      activeRegionId: s.activeRegionId,
      activeBuildingInteriorId: s.activeBuildingInteriorId,
      selectedBuildingId: s.selectedBuildingId,
      sectId: s.sectState.sectId,
    })

    if (!venueStatus.venue) {
      set({
        actionFeedback: {
          text:
            venueStatus.blockedReason ??
            '只能在【客栈】、【本门派演武场】或大地图【野外扎营】发起闭关修炼！',
          tone: 'warn',
        },
      })
      return
    }

    if (venueStatus.dailySilverCost > 0 && s.silver < venueStatus.dailySilverCost) {
      set({
        actionFeedback: {
          text: `客栈闭关每日需宿费 ${venueStatus.dailySilverCost} 两纹银（当前 ${s.silver} 两），银两不足无法闭关！`,
          tone: 'warn',
        },
      })
      return
    }

    if (venueStatus.dailyFoodCost > 0 && s.food < venueStatus.dailyFoodCost) {
      set({
        actionFeedback: {
          text: `野外扎营闭关每日需消耗 ${venueStatus.dailyFoodCost} 份行军干粮，当前粮草已尽！`,
          tone: 'warn',
        },
      })
      return
    }

    const targetShichens = mode === 'until_breakthrough' ? 3600 * 12 : mode * 12
    const dailyGain = calcDailyCultivationExpGain(
      art,
      s.baseStats.talents,
      venueStatus.multiplier,
    )

    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      cultivationSession: {
        artId,
        artName: art.name,
        artCleanName: art.cleanName,
        artFullTier: art.fullTier,
        mode,
        venue: venueStatus.venue,
        venueLabel: venueStatus.venueLabel,
        multiplier: venueStatus.multiplier,
        dailySilverCost: venueStatus.dailySilverCost,
        dailyFoodCost: venueStatus.dailyFoodCost,
        dailyGain,
        targetShichens,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: cur.level,
        startExp: cur.exp,
      },
    })
  },

  stepCultivationTick: () => {
    const s = get()
    const session = s.cultivationSession
    if (!session || s.gameOver || s.activeCombat || s.activeStoryScene) return

    const art = MARTIAL_ART_DB_MAP[session.artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === session.artId)
    if (!art || idx === -1) {
      set({ cultivationSession: null })
      return
    }

    const finalize = (stopNote: string | null, overdueSpyAmbush: NodeNpc | null = null) => {
      const latest = get()
      const sess = latest.cultivationSession
      if (!sess) return
      const curArt = MARTIAL_ART_DB_MAP[sess.artId]
      const curIdx = latest.learnedArts.findIndex((x) => x.artId === sess.artId)
      const curEntry = curIdx !== -1 ? latest.learnedArts[curIdx]! : { artId: sess.artId, level: sess.startLevel, exp: sess.startExp }

      const fullDays = Math.floor(sess.shichensElapsed / 12)
      const remShichen = sess.shichensElapsed % 12
      const durationLabel =
        fullDays > 0 && remShichen > 0
          ? `${fullDays} 天 ${remShichen} 时辰`
          : fullDays > 0
            ? `${fullDays} 天`
            : `${remShichen} 时辰`

      const daysFrac = sess.shichensElapsed / 12
      const recoveryRate = sess.venue === 'wilderness_camp' ? 0.4 : 1.0
      const nextHp = Math.min(
        latest.maxHp,
        latest.hp + Math.round(latest.maxHp * recoveryRate * daysFrac),
      )
      const nextMp = Math.min(
        latest.maxMp,
        latest.mp + Math.round(latest.maxMp * recoveryRate * daysFrac),
      )

      const leveledUp = curEntry.level > sess.startLevel
      const costParts: string[] = []
      if (sess.silverSpent > 0) costParts.push(`宿费 -${sess.silverSpent}两`)
      else if (sess.foodSpent > 0) costParts.push(`干粮 -${sess.foodSpent}份`)
      else costParts.push('师门驻地免费')
      if (sess.combatExpSpent > 0) costParts.push(`破境耗战经 ${sess.combatExpSpent}`)

      const nextReqExp = curArt ? getArtExpRequired(curArt, curEntry.level) : 0
      const progressPart =
        curEntry.level >= 10
          ? '已臻第 10 重返璞归真大圆满！'
          : leveledUp
            ? `突破至第 ${curEntry.level} 重（${curEntry.exp.toLocaleString()}/${nextReqExp.toLocaleString()}）！`
            : `第 ${curEntry.level} 重（${curEntry.exp.toLocaleString()}/${nextReqExp.toLocaleString()}）`

      const msgText =
        sess.shichensElapsed <= 0
          ? stopNote
            ? `闭关未成：${stopNote}`
            : `甫一入定便即收功出关，未耗时辰。`
          : `于【${sess.venueLabel}】闭关潜修【${sess.artName}】${durationLabel}（${costParts.join(' · ')} · 熟练度 +${sess.totalExpGained.toLocaleString()}）：${progressPart}${stopNote ? ` [${stopNote}]` : ''}`

      const nextLogs =
        sess.shichensElapsed > 0 || Boolean(stopNote)
          ? [
              createLogEntry(
                latest.dayCount,
                leveledUp ? '闭关突破' : '闭关苦修',
                msgText,
                leveledUp || Boolean(stopNote),
                latest.shichenIdx,
              ),
              ...latest.logs,
            ].slice(0, 60)
          : latest.logs

      set({
        cultivationSession: null,
        hp: nextHp,
        mp: nextMp,
        actionFeedback: {
          text: msgText,
          tone: stopNote && !leveledUp ? 'warn' : 'success',
        },
        logs: nextLogs,
      })

      if (overdueSpyAmbush) {
        get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        return
      }

      if (sess.shichensElapsed >= 84 || leveledUp) {
        void get().saveToSlot('autosave', `闭关潜修${sess.artCleanName}`, true)
      }
    }

    let nextSilver = s.silver
    let nextFood = s.food
    let nextSilverSpent = session.silverSpent
    let nextFoodSpent = session.foodSpent

    if (session.shichensElapsed % 12 === 0) {
      if (session.dailySilverCost > 0 && nextSilver < session.dailySilverCost) {
        finalize('纹银不足支付后续宿费，提前收功出关')
        return
      }
      if (session.dailyFoodCost > 0 && nextFood < session.dailyFoodCost) {
        finalize('行囊干粮耗尽，提前收功拔营')
        return
      }
      nextSilver -= session.dailySilverCost
      nextFood -= session.dailyFoodCost
      nextSilverSpent += session.dailySilverCost
      nextFoodSpent += session.dailyFoodCost
    }

    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
    const nextDayCount = clock.dayCount
    const nextShichenIdx = clock.shichenIdx
    const nextShichensElapsed = session.shichensElapsed + 1

    const targetFloor = Math.round((session.dailyGain * nextShichensElapsed) / 12)
    const deltaExp = Math.max(0, targetFloor - session.settledExpFloor)
    let nextTotalExpGained = session.totalExpGained + deltaExp

    const cur = s.learnedArts[idx]!
    let nextLv = cur.level
    let nextExp = cur.exp + deltaExp
    let nextCombatExp = s.combatExp
    let nextCombatExpSpent = session.combatExpSpent
    let hitBottleneck = false
    let brokeThroughNow = false
    let stopNote: string | null = null

    while (nextLv < 10) {
      const stepReqExp = getArtExpRequired(art, nextLv)
      if (stepReqExp <= 0 || nextExp < stepReqExp) break
      const stepReqCombat = getArtCombatExpRequired(art, nextLv)
      if (nextCombatExp >= stepReqCombat) {
        nextCombatExp -= stepReqCombat
        nextCombatExpSpent += stepReqCombat
        nextExp -= stepReqExp
        nextLv += 1
        brokeThroughNow = true
      } else {
        const overflow = nextExp - stepReqExp
        nextExp = stepReqExp
        nextTotalExpGained = Math.max(0, nextTotalExpGained - overflow)
        hitBottleneck = true
        stopNote = `第 ${nextLv} 重火候圆满，待积攒 ${stepReqCombat} 点战斗经验破境（当前 ${nextCombatExp}）`
        break
      }
    }
    if (nextLv >= 10) {
      nextExp = 0
    }

    let nextSectState = s.sectState
    let nextLogs = s.logs
    let nextMasters = s.roamingMasters
    let overdueSpyAmbush: NodeNpc | null = null

    if (clock.daysAdded > 0) {
      if ((nextDayCount - 1) % 30 === 0) {
        nextMasters = nextMasters.map((m) => {
          const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
          if (neighbors.length === 0) return m
          const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
          return { ...m, nodeId: pick!.to }
        })
        const sample = nextMasters[Math.floor(Math.random() * nextMasters.length)]
        if (sample) {
          nextLogs = [
            createLogEntry(
              nextDayCount,
              '月度风云',
              `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
              true,
              nextShichenIdx,
            ),
            ...nextLogs,
          ]
        }
      }

      const dayHook = applyDayProgressionSectHooks({
        nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: clonePlayerSectState(nextSectState),
        logs: [...nextLogs],
      })
      nextSilver = dayHook.silver
      nextSectState = dayHook.sectState
      nextLogs = dayHook.logs
      overdueSpyAmbush = dayHook.overdueSpyAmbush
      if (overdueSpyAmbush) {
        stopNote = '边关锄奸军令期限已至，被迫提前收功应战'
      }
    }

    const nextLearned = s.learnedArts.map((x) => ({ ...x }))
    nextLearned[idx] = { artId: session.artId, level: nextLv, exp: nextExp }

    const derived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      s.equippedArts,
      nextLearned,
    )

    set({
      dayCount: nextDayCount,
      shichenIdx: nextShichenIdx,
      silver: nextSilver,
      food: nextFood,
      combatExp: nextCombatExp,
      sectState: nextSectState,
      roamingMasters: nextMasters,
      learnedArts: nextLearned,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      logs: nextLogs.slice(0, 60),
      cultivationSession: {
        ...session,
        shichensElapsed: nextShichensElapsed,
        silverSpent: nextSilverSpent,
        foodSpent: nextFoodSpent,
        combatExpSpent: nextCombatExpSpent,
        totalExpGained: nextTotalExpGained,
        settledExpFloor: targetFloor,
      },
    })

    if (clock.daysAdded > 0) {
      get().checkExpiredQuestDeadlines()
    }

    const reachedTarget = nextShichensElapsed >= session.targetShichens
    const reachedMax = nextLv >= 10
    const reachedBreakthrough = session.mode === 'until_breakthrough' && brokeThroughNow

    if (
      reachedTarget ||
      reachedMax ||
      reachedBreakthrough ||
      hitBottleneck ||
      Boolean(overdueSpyAmbush)
    ) {
      finalize(stopNote, overdueSpyAmbush)
    }
  },

  stopCultivationEarly: () => {
    const s = get()
    const sess = s.cultivationSession
    if (!sess) return
    const curArt = MARTIAL_ART_DB_MAP[sess.artId]
    const curIdx = s.learnedArts.findIndex((x) => x.artId === sess.artId)
    const curEntry =
      curIdx !== -1
        ? s.learnedArts[curIdx]!
        : { artId: sess.artId, level: sess.startLevel, exp: sess.startExp }

    const fullDays = Math.floor(sess.shichensElapsed / 12)
    const remShichen = sess.shichensElapsed % 12
    const durationLabel =
      fullDays > 0 && remShichen > 0
        ? `${fullDays} 天 ${remShichen} 时辰`
        : fullDays > 0
          ? `${fullDays} 天`
          : `${remShichen} 时辰`

    const daysFrac = sess.shichensElapsed / 12
    const recoveryRate = sess.venue === 'wilderness_camp' ? 0.4 : 1.0
    const nextHp = Math.min(
      s.maxHp,
      s.hp + Math.round(s.maxHp * recoveryRate * daysFrac),
    )
    const nextMp = Math.min(
      s.maxMp,
      s.mp + Math.round(s.maxMp * recoveryRate * daysFrac),
    )

    const leveledUp = curEntry.level > sess.startLevel
    const costParts: string[] = []
    if (sess.silverSpent > 0) costParts.push(`宿费 -${sess.silverSpent}两`)
    else if (sess.foodSpent > 0) costParts.push(`干粮 -${sess.foodSpent}份`)
    else costParts.push('师门驻地免费')
    if (sess.combatExpSpent > 0) costParts.push(`破境耗战经 ${sess.combatExpSpent}`)

    const nextReqExp = curArt ? getArtExpRequired(curArt, curEntry.level) : 0
    const progressPart =
      curEntry.level >= 10
        ? '已臻第 10 重返璞归真大圆满！'
        : leveledUp
          ? `突破至第 ${curEntry.level} 重（${curEntry.exp.toLocaleString()}/${nextReqExp.toLocaleString()}）！`
          : `第 ${curEntry.level} 重（${curEntry.exp.toLocaleString()}/${nextReqExp.toLocaleString()}）`

    const stopNote = '主动收功出关'
    const msgText =
      sess.shichensElapsed <= 0
        ? `甫一入定便即收功出关，未耗时辰。`
        : `于【${sess.venueLabel}】闭关潜修【${sess.artName}】${durationLabel}（${costParts.join(' · ')} · 熟练度 +${sess.totalExpGained.toLocaleString()}）：${progressPart} [${stopNote}]`

    const nextLogs =
      sess.shichensElapsed > 0
        ? [
            createLogEntry(
              s.dayCount,
              leveledUp ? '闭关突破' : '闭关苦修',
              msgText,
              leveledUp,
              s.shichenIdx,
            ),
            ...s.logs,
          ].slice(0, 60)
        : s.logs

    set({
      cultivationSession: null,
      hp: nextHp,
      mp: nextMp,
      actionFeedback: {
        text: msgText,
        tone: leveledUp ? 'success' : 'warn',
      },
      logs: nextLogs,
    })

    if (sess.shichensElapsed >= 84 || leveledUp) {
      void get().saveToSlot('autosave', `闭关潜修${sess.artCleanName}`, true)
    }
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
            text: `少侠已通晓【${targetArt.name}】入门心法！秘籍仅作初窥门径之用，无法靠重复翻阅提升熟练度，请赴【披挂与武学】按日闭关精修。`,
            tone: 'warn',
          },
        })
        return
      }
    }

    // Consume stackable medicine/food/consumable tools; keep non-stackable books/scrolls & durable curio tools
    const shouldConsume = def.category === 'medicine' || def.stackable
    const nextInv = shouldConsume
      ? (removeItemFromInventory(s.inventory, itemId, 1) ?? s.inventory)
      : s.inventory

    const nextBaseStats = cloneHeroBaseStats(s.baseStats)
    const nextLearnedArts = s.learnedArts.map((x) => ({ ...x }))
    let nextFood = s.food
    const notes: string[] = []

    const clock =
      def.category === 'tools' || def.category === 'scrolls'
        ? advanceShichenClock(s.dayCount, s.shichenIdx, 1)
        : { dayCount: s.dayCount, shichenIdx: s.shichenIdx, daysAdded: 0 }

    if (eff.learnArtId && MARTIAL_ART_DB_MAP[eff.learnArtId]) {
      const targetArt = MARTIAL_ART_DB_MAP[eff.learnArtId]
      nextLearnedArts.push({ artId: eff.learnArtId, level: 1, exp: 0 })
      notes.push(`初窥门径，习得武学【${targetArt.name}（第1重）】`)
    }

    const neigongExpPulse =
      (eff.maxHp ? Math.round(eff.maxHp * 0.8) : 0) +
      (eff.maxMp ? Math.round(eff.maxMp * 0.9) : 0) +
      (eff.res ? eff.res * 14 : 0)
    if (neigongExpPulse > 0) {
      const ngRes = grantArtProficiency(nextLearnedArts, s.equippedArts.neigong, neigongExpPulse)
      notes.push(ngRes.note ? `灵药催动周天（${ngRes.note}）` : '药力化入丹田周天')
    }

    if (eff.agi && eff.agi > 0) {
      const qgRes = grantArtProficiency(nextLearnedArts, s.equippedArts.qinggong, eff.agi * 18)
      notes.push(qgRes.note ? `药力轻健经络（${qgRes.note}）` : '药力贯通足三阳经')
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

    if (eff.hp) {
      nextHp = Math.min(derived.maxHp, nextHp + eff.hp)
      notes.push(`气血 +${eff.hp}`)
    }
    if (eff.mp) {
      nextMp = Math.min(derived.maxMp, nextMp + eff.mp)
      notes.push(`内力 +${eff.mp}`)
    }
    if (eff.learnArtHint && !eff.learnArtId) {
      notes.push(eff.learnArtHint)
    }

    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, s.sectState.sectId)
    const lodgingFee =
      clock.daysAdded > 0 && !inOwnSectCity && !s.campPos
        ? Math.min(s.silver, DAILY_INN_LODGING_COST * clock.daysAdded)
        : 0
    if (lodgingFee > 0) {
      notes.push(`异乡宿费 -${lodgingFee}两`)
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

    const baseLogs = [
      createLogEntry(
        clock.dayCount,
        logTag,
        `使用【${def.name}】：${notes.join('，')}。`,
        true,
        clock.shichenIdx,
      ),
      ...s.logs,
    ]
    const dayHook =
      clock.daysAdded > 0
        ? applyDayProgressionSectHooks({
            nextDayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            silver: s.silver - lodgingFee,
            sectState: s.sectState,
            logs: baseLogs,
          })
        : {
            silver: s.silver - lodgingFee,
            sectState: s.sectState,
            logs: baseLogs,
            overdueSpyAmbush: null,
          }

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      silver: dayHook.silver,
      sectState: dayHook.sectState,
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
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      food: nextFood,
      skills: derived.skills,
      actionFeedback: {
        text: `${logTag}【${def.name}】：${notes.join('，')}。`,
        tone: 'success',
      },
      logs: dayHook.logs.slice(0, 60),
    })
    if (dayHook.overdueSpyAmbush) {
      get().startNpcCombat(dayHook.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    }
  },

  doBuildingAction: (item) => {
    const s = get()
    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, s.sectState.sectId)
    const isRestInn =
      item.name.includes('客栈') ||
      item.name.includes('馆驿') ||
      item.name.includes('驿馆') ||
      item.name.includes('客舍')
    const cost = isRestInn && inOwnSectCity ? 0 : (item.cost ?? 0)
    if (cost > 0 && s.silver < cost) {
      set({
        actionFeedback: {
          text: `囊中羞涩，纹银不足 ${cost} 两！可先去衙门揭榜领赏。`,
          tone: 'warn',
        },
      })
      return
    }

    let nextSilver = s.silver - cost
    let nextCombatExp = s.combatExp
    const nextBaseStats = cloneHeroBaseStats(s.baseStats)
    const nextLearnedArts = s.learnedArts.map((x) => ({ ...x }))
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, isRestInn ? 4 : 2)
    const nextDay = clock.dayCount

    const eff = item.effect
    const gains: string[] = []

    if (isRestInn) {
      gains.push(inOwnSectCity ? '师门驻地免宿费' : `住店宿费 -${cost}两`)
    }

    const neigongSpotExp =
      (!isRestInn && eff.mp ? Math.round(eff.mp * 0.6) : 0) + (eff.res ? eff.res * 12 : 0)
    const ngSpotRes =
      neigongSpotExp > 0
        ? grantArtProficiency(nextLearnedArts, s.equippedArts.neigong, neigongSpotExp)
        : { note: null, leveledUp: false }

    const qgSpotRes =
      eff.agi && eff.agi > 0
        ? grantArtProficiency(nextLearnedArts, s.equippedArts.qinggong, eff.agi * 15)
        : { note: null, leveledUp: false }

    if (eff.riding) {
      nextBaseStats.ridingSkill = Math.min(
        HERO_BASE_CAPS.ridingSkill,
        nextBaseStats.ridingSkill + eff.riding,
      )
    }
    if (eff.silver) {
      nextSilver += eff.silver
    }

    // 衙门悬赏缉凶与校场武馆演武额外奖励战斗经验
    let buildingCombatExp = 0
    if (/衙门|府衙|巡检|枢密|帅司|六扇门/.test(item.name)) {
      buildingCombatExp = 45
    } else if (/演武|校场|武馆|拳馆|镖局|讲武|铜人|木人/.test(item.name)) {
      buildingCombatExp = 35
    }
    if (buildingCombatExp > 0) {
      nextCombatExp += buildingCombatExp
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
      nextLearnedArts,
    )

    let nextHp = Math.min(derived.maxHp, s.hp + (eff.hp ?? 0))
    let nextMp = Math.min(derived.maxMp, s.mp + (eff.mp ?? 0))

    if (isRestInn) {
      nextHp = derived.maxHp
      nextMp = derived.maxMp
      gains.push('气血与内息全满')
    } else {
      if (eff.hp) gains.push(`气血恢复 +${eff.hp}`)
      if (eff.mp) gains.push(`内力调息 +${eff.mp}`)
    }
    if (buildingCombatExp > 0) {
      gains.push(`战斗经验 +${buildingCombatExp}（现 ${nextCombatExp}）`)
    }
    if (ngSpotRes.note) gains.push(ngSpotRes.note)
    if (qgSpotRes.note) gains.push(qgSpotRes.note)
    if (eff.riding) gains.push(`骑术 +${eff.riding}（现 ${derived.ridingSkill}）`)
    if (eff.silver) gains.push(`纹银 +${eff.silver} 两`)
    for (const tup of tuples) {
      if (tup) {
        const [sName, delta] = tup
        gains.push(`【${sName}】+${delta}（根基 ${nextBaseStats.skills[sName]}/100）`)
      }
    }

    if (!isRestInn && clock.daysAdded > 0 && !inOwnSectCity) {
      const lodgingFee = Math.min(nextSilver, DAILY_INN_LODGING_COST * clock.daysAdded)
      if (lodgingFee > 0) {
        nextSilver -= lodgingFee
        gains.push(`跨日异乡宿费 -${lodgingFee}两`)
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
        return { ...m, nodeId: pick!.to }
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

    const dayHook =
      clock.daysAdded > 0
        ? applyDayProgressionSectHooks({
            nextDayCount: nextDay,
            shichenIdx: clock.shichenIdx,
            silver: nextSilver,
            sectState: s.sectState,
            logs: nextLogs,
          })
        : { silver: nextSilver, sectState: s.sectState, logs: nextLogs, overdueSpyAmbush: null }

    set({
      dayCount: nextDay,
      shichenIdx: clock.shichenIdx,
      combatExp: nextCombatExp,
      silver: dayHook.silver,
      sectState: dayHook.sectState,
      baseStats: nextBaseStats,
      learnedArts: nextLearnedArts,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      hp: nextHp,
      maxHp: derived.maxHp,
      mp: nextMp,
      maxMp: derived.maxMp,
      agility: derived.agility,
      res: derived.res,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      roamingMasters: nextMasters,
      actionFeedback: { text: summary, tone: 'success' },
      logs: dayHook.logs.slice(0, 60),
    })

    if (dayHook.overdueSpyAmbush) {
      get().startNpcCombat(dayHook.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
      return
    }

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
    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, s.sectState.sectId)
    const lodgingFee =
      clock.daysAdded > 0 && !inOwnSectCity
        ? Math.min(s.silver, DAILY_INN_LODGING_COST * clock.daysAdded)
        : 0
    const dayHook =
      clock.daysAdded > 0
        ? applyDayProgressionSectHooks({
            nextDayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            silver: s.silver - lodgingFee,
            sectState: s.sectState,
            logs: s.logs,
          })
        : {
            silver: s.silver - lodgingFee,
            sectState: s.sectState,
            logs: s.logs,
            overdueSpyAmbush: null,
          }

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      silver: dayHook.silver,
      sectState: dayHook.sectState,
      logs: dayHook.logs.slice(0, 60),
      baseStats: nextBaseStats,
      skills: derived.skills,
      actionFeedback: {
        text: `与 ${npc.name} 雅集论道一个时辰（【${primarySkill}】+2 根基 ${nextPrimaryBase}/100、【${secondarySkill}】+1 根基 ${nextSecondaryBase}/100${lodgingFee > 0 ? ` · 异乡宿费 -${lodgingFee}两` : ''}）。`,
        tone: 'success',
      },
    })
    if (dayHook.overdueSpyAmbush) {
      get().startNpcCombat(dayHook.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    }
  },

  startNpcCombat: (npc, mode = 'spar', duelStakes, forceMandatory = false) => {
    const s = get()
    if (s.gameOver) return

    const effectiveStakes: DuelStakesKind = duelStakes ?? (mode === 'duel' ? 'duel' : 'spar')
    const effectiveMode: 'spar' | 'duel' = effectiveStakes === 'spar' ? 'spar' : 'duel'

    if (effectiveStakes === 'rob_official') {
      const dbNpc = (npc.id && NPC_DB_MAP[npc.id]) || resolveNpcByName(npc.name)
      if (
        !isSongOfficialForRobbery({
          id: npc.id ?? dbNpc?.id,
          factionId: npc.factionId ?? dbNpc?.factionId,
        })
      ) {
        set({
          actionFeedback: {
            text: '「纳投名状」须挑大宋朝廷命官下手，寻常江湖人物不算数！',
            tone: 'warn',
          },
        })
        return
      }
    }

    if (!forceMandatory && s.hp <= 1) {
      set({
        actionFeedback: {
          text: `少侠当前气血奄奄一息（${s.hp}/${s.maxHp}），请先服食伤药或调息恢复气血后再与名宿交手！`,
          tone: 'warn',
        },
      })
      return
    }

    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, s.sectState.sectId)
    const lodgingFee =
      !forceMandatory && clock.daysAdded > 0 && !inOwnSectCity && !s.campPos
        ? Math.min(s.silver, DAILY_INN_LODGING_COST * clock.daysAdded)
        : 0
    const startHp = Math.max(1, s.hp)
    const playerCombatant = buildPlayerCombatant({
      hp: startHp,
      mp: s.mp,
      baseStats: s.baseStats,
      equipped: s.equipped,
      equippedArts: s.equippedArts,
      learnedArts: s.learnedArts,
    })
    const session = createCombatSession({
      mode: effectiveMode,
      duelStakes: effectiveStakes,
      player: playerCombatant,
      npcNode: npc,
    })

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      silver: s.silver - lodgingFee,
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
    let nextLearnedArts = s.learnedArts
    let nextConsumedUniqueIds = s.consumedUniqueIds
    let nextFood = s.food

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
        const clonedArts = s.learnedArts.map((x) => ({ ...x }))
        const neigongExpPulse =
          (eff.maxHp ? Math.round(eff.maxHp * 0.8) : 0) +
          (eff.maxMp ? Math.round(eff.maxMp * 0.9) : 0) +
          (eff.res ? eff.res * 14 : 0)
        if (neigongExpPulse > 0) {
          grantArtProficiency(clonedArts, s.equippedArts.neigong, neigongExpPulse)
        }
        if (eff.agi && eff.agi > 0) {
          grantArtProficiency(clonedArts, s.equippedArts.qinggong, eff.agi * 18)
        }
        if (eff.skillGain) {
          const [sk, gain] = eff.skillGain
          cloned.skills[sk] = Math.min(
            HERO_BASE_CAPS.civilSkill,
            (cloned.skills[sk] ?? 40) + gain,
          )
        }
        if (eff.food) nextFood += eff.food
        nextBaseStats = cloned
        nextLearnedArts = clonedArts
      }
    }

    let nextSession = resolveCombatRound(s.activeCombat, choice)
    if (nextSession.outcome !== 'ongoing') {
      const preview = computeCombatSettlement(
        {
          ...s,
          baseStats: nextBaseStats,
          learnedArts: nextLearnedArts,
        },
        nextSession,
      )
      const qHook = nextSession.questCombatHook
      const deathNotice =
        nextSession.mode === 'duel' && nextSession.outcome === 'npc_win'
          ? qHook?.deathDetail
            ? `${qHook.deathDetail}（游戏结束）`
            : nextSession.duelStakes === 'zhan_zhao_arrest'
              ? '少侠重伤被南侠展昭生擒归案，即将押赴开封府市曹处斩（游戏结束）！'
              : `生死决斗败亡！少侠命陨于【${nextSession.npc.name}】之手（游戏结束）！`
          : nextSession.surviveToWin &&
              nextSession.outcome === 'player_win' &&
              nextSession.npc.hp > 0
            ? `稳守撑满 ${nextSession.maxRounds} 合考校不倒！ · ${preview.rewardsSummary}`
            : preview.rewardsSummary
      nextSession = {
        ...nextSession,
        rewardsSummary: deathNotice,
      }
    }
    set({
      activeCombat: nextSession,
      inventory: nextInventory,
      baseStats: nextBaseStats,
      learnedArts: nextLearnedArts,
      consumedUniqueIds: nextConsumedUniqueIds,
      food: nextFood,
    })
  },

  finishCombatSession: () => {
    const s = get()
    const session = s.activeCombat
    if (!session || session.outcome === 'ongoing') return

    const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
    const songDate = formatSongDate(s.dayCount, s.shichenIdx)
    const qHook = session.questCombatHook

    // 1. 非切磋类的生死对决失败 -> 死亡机制（Game Over）
    if (session.mode === 'duel' && session.outcome === 'npc_win') {
      const gameOverPayload: GameOverState =
        qHook?.deathTitle || qHook?.deathDetail
          ? {
              reasonTitle: qHook.deathTitle ?? '命陨江湖 · 侠踪绝响',
              reasonDetail:
                qHook.deathDetail ??
                `生死相搏，刀剑无眼！少侠在与【${session.npc.name}】的生死决战中气绝败北。`,
              killerName: session.npc.name,
              songDate,
              locationName: regionName,
            }
          : session.duelStakes === 'zhan_zhao_arrest'
            ? {
                reasonTitle: '开封府市曹处斩',
                reasonDetail:
                  '少侠因领绿林「纳投名状」劫掠大宋朝廷命官，名列朝廷黑名单。今踏入东京开封府被御前四品带刀护卫「南侠」展昭缉拿归案，押赴开封府市曹，狗头铡下明正典刑！',
                killerName: session.npc.name,
                songDate,
                locationName: regionName,
              }
            : session.duelStakes === 'liao_spy_duel'
              ? {
                  reasonTitle: '喋血燕云 · 为国捐躯',
                  reasonDetail: `少侠奉常山枪派军令赴燕云诛除契丹密谍，在与【${session.npc.name}】的生死决战中力竭重创，命陨塞北，马革裹尸！`,
                  killerName: session.npc.name,
                  songDate,
                  locationName: regionName,
                }
              : session.duelStakes === 'rob_official'
                ? {
                    reasonTitle: '劫官败亡 · 伏尸当场',
                    reasonDetail: `少侠欲劫掠大宋官员【${session.npc.name}】以纳绿林投名状，岂料失手落败，当场毙命于刀兵之下！`,
                    killerName: session.npc.name,
                    songDate,
                    locationName: regionName,
                  }
                : {
                    reasonTitle: '命陨江湖 · 侠踪绝响',
                    reasonDetail: `生死相搏，刀剑无眼！少侠在与【${session.npc.name}】的生死对决中气绝败北，血染尘沙，一世风云就此落幕。`,
                    killerName: session.npc.name,
                    songDate,
                    locationName: regionName,
                  }

      set({
        activeCombat: null,
        activeNpcInteraction: null,
        activeStoryScene: null,
        hp: 0,
        gameOver: gameOverPayload,
        logs: [
          createLogEntry(
            s.dayCount,
            gameOverPayload.reasonTitle,
            gameOverPayload.reasonDetail,
            true,
            s.shichenIdx,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    // 2. 存活结算（切磋/剧情试炼/撑回合任意结局 或 生死对决获胜/平局/脱逃）
    const res = computeCombatSettlement(s, session)
    let nextSilver = s.silver
    const nextSectState = clonePlayerSectState(s.sectState)
    const nextQuestState = cloneQuestRuntimeState(s.questState)
    let extraLogText = res.logText
    let extraLogTag = res.logTag
    let triggerKaifengZhanZhao = false

    // 同门切磋获胜积攒微末功绩
    const dbTarget =
      (session.targetNpcNode.id && NPC_DB_MAP[session.targetNpcNode.id]) ||
      resolveNpcByName(session.targetNpcNode.name)
    if (
      session.outcome === 'player_win' &&
      nextSectState.sectId &&
      dbTarget?.factionId === nextSectState.sectId
    ) {
      nextSectState.contribution += 12
      extraLogText += `（同门印证获门派功绩 +12，现 ${nextSectState.contribution}）`
    }

    // 绿林盟「纳投名状」劫官胜利（非声明式 hook 调用时的直通兜底）
    if (!qHook && session.duelStakes === 'rob_official' && session.outcome === 'player_win') {
      nextSilver += 60
      nextSectState.toumingzhuangState = 'completed'
      nextSectState.songCourtBlacklisted = true
      nextQuestState.flags.toumingzhuang_state = 'completed'
      nextQuestState.flags.toumingzhuang_completed = true
      nextQuestState.flags.song_court_blacklisted = true
      if (nextQuestState.activeQuests['QST-SECT-18-TOUMINGZHUANG']) {
        nextQuestState.activeQuests['QST-SECT-18-TOUMINGZHUANG'] = {
          ...nextQuestState.activeQuests['QST-SECT-18-TOUMINGZHUANG']!,
          stepId: 'return_to_join',
        }
      }
      extraLogTag = '投名状成'
      extraLogText = `劫掠大宋官员【${session.npc.name}】得手，夺得官银 +60 两、战斗经验 +${res.combatExpGain}，已完成绿林【纳投名状】！⚠️ 少侠已被列入大宋朝廷黑名单：其他城池无碍，一旦进入【开封府】必遭南侠展昭挑战缉斩！`
      if (s.activeRegionId === 'bianliang') {
        triggerKaifengZhanZhao = true
      }
    }

    // 常山枪派「半年度燕云锄奸」诛杀辽谍胜利
    if (session.duelStakes === 'liao_spy_duel' && session.outcome === 'player_win') {
      nextSectState.activeLiaoSpy = null
      nextSectState.contribution += 100
      nextSilver += 50
      extraLogTag = '燕云锄奸'
      extraLogText = `浴血诛除辽国密谍【${session.npc.name}】！圆满完成常山枪派半年度军令，获门派功绩 +100（现 ${nextSectState.contribution}）、战斗经验 +${res.combatExpGain}、犒赏纹银 +50 两！`
    }

    // 若从展昭剑下侥幸获胜
    if (session.duelStakes === 'zhan_zhao_arrest' && session.outcome === 'player_win') {
      extraLogTag = '震动东京'
      extraLogText = `少侠竟在东京街头力挫御前四品带刀护卫「南侠」展昭（战斗经验 +${res.combatExpGain}），杀出重围！然朝廷黑名单未消，再度踏入开封仍将遭展昭截杀！`
    }

    set({
      activeCombat: null,
      activeNpcInteraction:
        qHook || (session.duelStakes === 'liao_spy_duel' && session.outcome === 'player_win')
          ? null
          : s.activeNpcInteraction,
      combatExp: res.nextCombatExp,
      silver: nextSilver,
      sectState: nextSectState,
      questState: nextQuestState,
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
      actionFeedback: {
        text: extraLogText,
        tone: session.outcome === 'npc_win' || session.outcome === 'escaped' ? 'warn' : 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          extraLogTag,
          extraLogText,
          session.outcome === 'player_win' || res.anyBreakthrough,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })

    // 3. 若挂载了声明式剧情战后回调钩子，按结局分支执行 QuestEffect[]
    if (qHook) {
      const followUp =
        session.outcome === 'player_win'
          ? qHook.onWin
          : session.outcome === 'npc_win'
            ? (qHook.onLose ?? [])
            : session.outcome === 'escaped'
              ? (qHook.onEscape ?? [])
              : (qHook.onDraw ?? [])

      if (followUp.length > 0) {
        get().runQuestEffects(followUp, session.targetNpcNode)
      }

      const afterHook = get()
      if (
        session.duelStakes === 'rob_official' &&
        session.outcome === 'player_win' &&
        afterHook.activeRegionId === 'bianliang' &&
        (afterHook.sectState.songCourtBlacklisted ||
          Boolean(afterHook.questState.flags.song_court_blacklisted)) &&
        !afterHook.activeCombat &&
        !afterHook.gameOver
      ) {
        triggerKaifengZhanZhao = true
      }
    }

    if (triggerKaifengZhanZhao) {
      get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
      return
    }

    if (!get().activeCombat && !get().gameOver) {
      void get().saveToSlot('autosave', `${regionName} · 战后调息`, true)
    }
  },

  restartAfterGameOver: () => {
    const freshBase = cloneHeroBaseStats(DEFAULT_HERO_BASE_STATS)
    const freshEquip = { ...DEFAULT_EQUIPPED_SLOTS }
    const freshLearned = DEFAULT_LEARNED_ARTS.map((x) => ({ ...x }))
    const freshEqArts = { ...DEFAULT_EQUIPPED_ARTS }
    const derived = deriveHeroEffectiveStats(freshBase, freshEquip, freshEqArts, freshLearned)

    set({
      dayCount: 1,
      shichenIdx: 4,
      viewMode: 'region',
      activeRegionId: 'bianliang',
      activeBuildingInteriorId: null,
      selectedNodeId: null,
      selectedBuildingId: null,
      selectedSpotId: null,
      currentNodeId: 'bianliang',
      traveling: null,
      cultivationSession: null,
      campPos: null,
      baseStats: freshBase,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      ridingSkill: derived.ridingSkill,
      agility: derived.agility,
      combatExp: 80,
      silver: 5120,
      food: 25,
      hp: derived.maxHp,
      maxHp: derived.maxHp,
      mp: derived.maxMp,
      maxMp: derived.maxMp,
      res: derived.res,
      skills: { ...derived.skills },
      equipped: freshEquip,
      learnedArts: freshLearned,
      equippedArts: freshEqArts,
      inventory: DEFAULT_INITIAL_INVENTORY.map((x) => ({ ...x })),
      consumedUniqueIds: [],
      npcFavor: {},
      sectState: clonePlayerSectState(DEFAULT_PLAYER_SECT_STATE),
      questState: cloneQuestRuntimeState(DEFAULT_QUEST_RUNTIME_STATE),
      gameOver: null,
      activeCombat: null,
      activeStoryScene: null,
      activeNpcInteraction: null,
      menuOpen: false,
      compendiumOpen: false,
      actionFeedback: {
        text: '大梦初醒，重返皇祐二年正月初一东京汴梁！',
        tone: 'success',
      },
      logs: [
        createLogEntry(
          1,
          '重入江湖',
          '前尘旧梦俱散，少侠重返皇祐二年正月初一【开封府】，再谱武林新篇！',
          true,
          4,
        ),
      ],
    })
  },

  joinSect: (targetSectId, mentorNpc) => {
    const s = get()
    const evalRes = evaluateSectEntry({
      targetSectId,
      sectState: s.sectState,
      silver: s.silver,
      baseStats: s.baseStats,
      inventory: s.inventory,
    })

    if (!evalRes.canJoin) {
      const warn = evalRes.blockedReason ?? '尚未满足入门条件。'
      set({
        actionFeedback: { text: warn, tone: 'warn' },
      })
      return
    }

    const faction = FACTION_DB_MAP[targetSectId]
    if (!faction) return

    let nextSilver = s.silver - evalRes.costSilver
    let nextInv = s.inventory
    if (evalRes.consumeItemId) {
      const removed = removeItemFromInventory(nextInv, evalRes.consumeItemId, 1)
      if (!removed) {
        set({
          actionFeedback: { text: '行囊中缺少所需荐书信物！', tone: 'warn' },
        })
        return
      }
      nextInv = removed
    }

    const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
    const curHalfYearIdx = Math.floor((s.dayCount - 1) / LIAO_SPY_HALF_YEAR_DAYS) + 1
    const heroAge = getHeroAge(s.dayCount)
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      sectId: targetSectId,
      rank: evalRes.startingRank,
      rankLabel: evalRes.startingRankLabel,
      contribution: 0,
      joinedDay: s.dayCount,
      lastStipendMonth: curMonthIdx,
      activeLiaoSpy: evalRes.allowOfficialTransferFromChangshan
        ? null
        : s.sectState.activeLiaoSpy,
    }

    // 同步完结对应的入门剧情任务链（若曾开启）
    const nextQuest = cloneQuestRuntimeState(s.questState)
    const entryQuestBySect: Record<string, string> = {
      'SECT-18': 'QST-SECT-18-TOUMINGZHUANG',
      'SECT-16': 'QST-SECT-16-REFERRAL',
      'SECT-23': 'QST-SECT-23-REFERRAL',
      'SECT-24': 'QST-SECT-24-REFERRAL',
    }
    const linkedQuestId = entryQuestBySect[targetSectId]
    if (
      linkedQuestId &&
      (nextQuest.activeQuests[linkedQuestId] || targetSectId === 'SECT-18')
    ) {
      delete nextQuest.activeQuests[linkedQuestId]
      const prevComp = nextQuest.completedQuests[linkedQuestId]
      nextQuest.completedQuests[linkedQuestId] = {
        questId: linkedQuestId,
        outcome: 'joined',
        completedDay: s.dayCount,
        count: (prevComp?.count ?? 0) + 1,
      }
    }

    const newLogs: LogEntry[] = []
    let feedbackMsg = `正式拜入【${faction.name}】，授职【${evalRes.startingRankLabel}】！`
    if (evalRes.costSilver > 0) {
      feedbackMsg += `（奉上拜师束脩 ${evalRes.costSilver} 两纹银）`
    }
    if (evalRes.consumeItemId && ITEM_DB_MAP[evalRes.consumeItemId]) {
      feedbackMsg += `（呈交《${ITEM_DB_MAP[evalRes.consumeItemId]!.name}》）`
    }
    if (evalRes.allowOfficialTransferFromChangshan) {
      const originName = s.sectState.sectId
        ? (FACTION_DB_MAP[s.sectState.sectId]?.name ?? s.sectState.sectId)
        : '原门派'
      const letterName =
        (evalRes.consumeItemId && ITEM_DB_MAP[evalRes.consumeItemId]?.name) || '举荐公函'
      feedbackMsg = `由【${originName}】呈验《${letterName}》，正式奉调入职【${faction.name} · ${evalRes.startingRankLabel}】（正当保举调任）！`
    }

    // 常山枪派：年满18岁方可领饷并接半年度燕云诛谍强制军令
    if (targetSectId === 'SECT-22') {
      if (heroAge < CHANGSHAN_ADULT_AGE) {
        feedbackMsg += `（少侠年方${heroAge}岁未满十八，暂免燕云诛谍军令，亦暂不支领边军月饷；待年满十八岁后按月领饷并每半年领受一次诛谍军令）`
      } else {
        const stipendAmt = getChangshanMonthlyStipend(nextSect.rank)
        feedbackMsg += ` 每满一月可领边军饷银 ${stipendAmt} 两。`
        if (!nextSect.activeLiaoSpy && nextSect.lastLiaoSpyMissionYear < curHalfYearIdx) {
          const spy = spawnAnnualLiaoSpy(curHalfYearIdx, s.dayCount)
          nextSect.lastLiaoSpyMissionYear = curHalfYearIdx
          nextSect.activeLiaoSpy = spy
          const spyMsg = `【常山半年度强制军令】辽国密谍【${spy.name}（${spy.title} · ${spy.realm}）】已潜入燕云【${spy.regionName} · ${spy.buildingName}】！请于第 ${spy.deadlineDay} 日前寻获并开启生死对决！`
          feedbackMsg += ` ${spyMsg}`
          newLogs.push(createLogEntry(s.dayCount, '燕云锄奸', spyMsg, true, s.shichenIdx))
        }
      }
    }

    newLogs.push(
      createLogEntry(
        s.dayCount,
        '拜入宗门',
        `${mentorNpc ? `经【${mentorNpc.name}】引见，` : ''}${feedbackMsg}`,
        true,
        s.shichenIdx,
      ),
    )

    set({
      silver: nextSilver,
      inventory: nextInv,
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: feedbackMsg, tone: 'success' },
      logs: [...newLogs, ...s.logs].slice(0, 60),
    })
  },

  leaveSect: () => {
    const s = get()
    const curSectId = s.sectState.sectId
    if (!curSectId) return
    const factionName = FACTION_DB_MAP[curSectId]?.name ?? curSectId

    if (curSectId === 'SECT-22') {
      const { nextFavor, affectedCount } = applySongLiaoSuspicionFavorPenalty(s.npcFavor, 30)
      const nextSect: PlayerSectState = {
        ...clonePlayerSectState(s.sectState),
        sectId: null,
        rank: 1,
        rankLabel: '无门无派',
        contribution: 0,
        activeLiaoSpy: null,
        liaoSuspicionDebuff: true,
      }
      const nextQuest = cloneQuestRuntimeState(s.questState)
      nextQuest.flags.liao_suspicion_debuff = true
      const msg = `少侠主动退出【${factionName}】，因擅离河北抗辽军伍，背上【通辽嫌疑】恶名！所有大宋朝野与武林人物（共 ${affectedCount} 人）对少侠好感度 -30！`
      set({
        sectState: nextSect,
        questState: nextQuest,
        npcFavor: nextFavor,
        actionFeedback: { text: msg, tone: 'warn' },
        logs: [
          createLogEntry(s.dayCount, '通辽恶名', msg, true, s.shichenIdx),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      sectId: null,
      rank: 1,
      rankLabel: '无门无派',
      contribution: 0,
    }
    const msg = `少侠已向【${factionName}】缴回腰牌，正式脱离门墙，恢复自由游侠之身。`
    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'talk' },
      logs: [
        createLogEntry(s.dayCount, '脱离门派', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acceptToumingzhuang: (npc) => {
    const s = get()
    if (s.sectState.toumingzhuangState === 'completed') {
      set({
        actionFeedback: {
          text: '少侠已纳过投名状，可直接拜入【太行/京东绿林盟】！',
          tone: 'success',
        },
      })
      return
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      toumingzhuangState: 'accepted',
    }
    const nextQuest = cloneQuestRuntimeState(s.questState)
    nextQuest.flags.toumingzhuang_state = 'accepted'
    if (!nextQuest.activeQuests['QST-SECT-18-TOUMINGZHUANG']) {
      nextQuest.activeQuests['QST-SECT-18-TOUMINGZHUANG'] = {
        questId: 'QST-SECT-18-TOUMINGZHUANG',
        stepId: 'rob_official',
        startedDay: s.dayCount,
        deadlineDay: null,
        vars: {},
      }
    }
    const msg = `已向${npc ? `【${npc.name}】` : '绿林盟'}立誓领受【纳投名状】任务！请前往外州府寻任一大宋官员发起【劫道纳投名状（生死战）】（切记：得手后将入大宋官府黑名单，踏入开封府会被展昭挑战处斩！）。`
    set({
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: msg, tone: 'warn' },
      logs: [
        createLogEntry(s.dayCount, '纳投名状', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  performSectDuty: (npc) => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId) return

    const factionName = FACTION_DB_MAP[sectId]?.name ?? sectId
    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 2)
    const contribGain = 35
    const combatExpGain = 40
    const silverReward = 8
    const inOwnSectCity = isPlayerInOwnSectRegion(s.currentNodeId, s.campPos, sectId)
    const lodgingFee =
      clock.daysAdded > 0 && !inOwnSectCity
        ? Math.min(s.silver + silverReward, DAILY_INN_LODGING_COST * clock.daysAdded)
        : 0

    const updatedSect = clonePlayerSectState(s.sectState)
    updatedSect.contribution += contribGain
    const nextCombatExp = s.combatExp + combatExpGain

    const msg = `于【${factionName}】${npc ? `随 ${npc.name} ` : ''}校场当差巡防两个时辰：门派功绩 +${contribGain}（现 ${updatedSect.contribution}）、战斗经验 +${combatExpGain}（现 ${nextCombatExp}）、津贴纹银 +${silverReward} 两${lodgingFee > 0 ? `（异乡宿费 -${lodgingFee} 两）` : ''}！`
    const baseLogs = [
      createLogEntry(clock.dayCount, '门派当差', msg, false, clock.shichenIdx),
      ...s.logs,
    ]
    const dayHook =
      clock.daysAdded > 0
        ? applyDayProgressionSectHooks({
            nextDayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            silver: s.silver + silverReward - lodgingFee,
            sectState: updatedSect,
            logs: baseLogs,
          })
        : {
            silver: s.silver + silverReward - lodgingFee,
            sectState: updatedSect,
            logs: baseLogs,
            overdueSpyAmbush: null,
          }

    set({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      combatExp: nextCombatExp,
      silver: dayHook.silver,
      sectState: dayHook.sectState,
      actionFeedback: { text: msg, tone: 'success' },
      logs: dayHook.logs.slice(0, 60),
    })
    if (clock.daysAdded > 0) {
      get().checkExpiredQuestDeadlines()
    }
    if (dayHook.overdueSpyAmbush) {
      get().startNpcCombat(dayHook.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    }
  },

  promoteSectRank: () => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId) return
    const promo = evaluateSectPromotion({
      sectId,
      currentRank: s.sectState.rank,
      contribution: s.sectState.contribution,
      learnedArts: s.learnedArts,
    })
    if (!promo) {
      set({
        actionFeedback: { text: '少侠已位列本门最高掌门尊位！', tone: 'success' },
      })
      return
    }
    if (!promo.canPromote) {
      set({
        actionFeedback: { text: promo.reason, tone: 'warn' },
      })
      return
    }

    const factionName = FACTION_DB_MAP[sectId]?.name ?? sectId
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      rank: promo.targetRank,
      rankLabel: promo.targetRankLabel,
    }
    let msg = `功勋卓著！少侠于【${factionName}】正式晋升为第 ${promo.targetRank} 阶【${promo.targetRankLabel}】！`
    if (sectId === 'SECT-22' && promo.targetRank === 3) {
      msg += ' 已达【演武教习】职阶，现可向掌门或首座领取《开封府推荐信》！'
    }

    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '门派晋升', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  bribeForReferral: (npc) => {
    const s = get()
    const curSectId = s.sectState.sectId
    if (!curSectId) return
    const refCfg = REFERRAL_BRIBE_BY_SOURCE_SECT[curSectId]
    if (!refCfg) return

    const dbNpc = (npc.id && NPC_DB_MAP[npc.id]) || resolveNpcByName(npc.name)
    const npcFaction = npc.factionId ?? dbNpc?.factionId
    const npcRank = npc.sectRank ?? dbNpc?.sectRank ?? 1

    if (npcFaction !== curSectId || npcRank !== 4) {
      set({
        actionFeedback: {
          text: `须向本门第4阶【${refCfg.elderTitleHint}】奉银求取《${refCfg.itemName}》！`,
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.rank < 2) {
      set({
        actionFeedback: {
          text: `须先晋升为本门第2阶内门（当前为【${s.sectState.rankLabel}】），方有资格向${refCfg.elderTitleHint}贿赂求取《${refCfg.itemName}》！`,
          tone: 'warn',
        },
      })
      return
    }
    if (s.inventory.some((st) => st.itemId === refCfg.itemId && st.qty > 0)) {
      set({
        actionFeedback: {
          text: `少侠行囊中已持有《${refCfg.itemName}》，脱离本门后即可前往拜入【${refCfg.targetSectName}】！`,
          tone: 'talk',
        },
      })
      return
    }
    if (s.silver < refCfg.costSilver) {
      set({
        actionFeedback: {
          text: `贿赂${refCfg.elderTitleHint}需纹银 ${refCfg.costSilver} 两（当前 ${s.silver} 两）！`,
          tone: 'warn',
        },
      })
      return
    }

    const nextInv = addItemToInventory(s.inventory, refCfg.itemId, 1)
    const nextSect = clonePlayerSectState(s.sectState)
    if (!nextSect.bribedReferralSects.includes(refCfg.targetSectId)) {
      nextSect.bribedReferralSects.push(refCfg.targetSectId)
    }

    const nextQuest = cloneQuestRuntimeState(s.questState)
    const referralQuestStepMap: Record<string, { questId: string; stepId: string }> = {
      'SECT-16': { questId: 'QST-SECT-16-REFERRAL', stepId: 'join_caobang' },
      'SECT-23': { questId: 'QST-SECT-23-REFERRAL', stepId: 'join_baji' },
      'SECT-24': { questId: 'QST-SECT-24-REFERRAL', stepId: 'join_zhenyuan' },
    }
    const rq = referralQuestStepMap[refCfg.targetSectId]
    if (rq && !nextQuest.completedQuests[rq.questId]) {
      const prev = nextQuest.activeQuests[rq.questId]
      nextQuest.activeQuests[rq.questId] = {
        questId: rq.questId,
        stepId: rq.stepId,
        startedDay: prev?.startedDay ?? s.dayCount,
        deadlineDay: prev?.deadlineDay ?? null,
        vars: prev?.vars ?? {},
      }
    }

    const msg = `暗中奉上 ${refCfg.costSilver} 两纹银，【${npc.name}】捻须笑纳，修书一封授少侠《${refCfg.itemName}》！持此帖脱离本门后即可拜入二流名门【${refCfg.targetSectName}】！`

    set({
      silver: s.silver - refCfg.costSilver,
      inventory: nextInv,
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '暗通关节', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  claimKaifengRecommendation: (npc) => {
    const s = get()
    if (s.sectState.sectId !== 'SECT-22') return
    if (s.sectState.rank < 3) {
      set({
        actionFeedback: {
          text: `须在【常山枪派】晋升至第3阶【演武教习】（当前为【${s.sectState.rankLabel}】），方可获授《开封府推荐信》！`,
          tone: 'warn',
        },
      })
      return
    }
    if (
      s.sectState.claimedKaifengLetter ||
      s.inventory.some((st) => st.itemId === KAIFENG_RECOMMENDATION_ITEM_ID && st.qty > 0)
    ) {
      set({
        actionFeedback: {
          text: '少侠已领受过《开封府推荐信》，可赴东京开封府呈交包龙图或展护卫调任入府！',
          tone: 'talk',
        },
      })
      return
    }

    const nextInv = addItemToInventory(s.inventory, KAIFENG_RECOMMENDATION_ITEM_ID, 1)
    const nextSect = clonePlayerSectState(s.sectState)
    nextSect.claimedKaifengLetter = true
    const msg = `${npc ? `【${npc.name}】` : '常山枪派掌门'}嘉许少侠边关抗辽军功，亲颁河北都部署《开封府推荐信》一封！持信赴东京开封府即可正当调任入职，不沾叛军通辽之嫌！`

    set({
      inventory: nextInv,
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '荣膺军荐', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  learnSectMartialArt: (artId) => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId) return

    if (s.learnedArts.some((e) => e.artId === artId)) {
      const art = MARTIAL_ART_DB_MAP[artId]
      set({
        actionFeedback: {
          text: `少侠已习得《${art?.cleanName ?? artId}》，请赴【披挂与武学】演武提升火候！`,
          tone: 'talk',
        },
      })
      return
    }

    const teachList = getSectTeachableArts(sectId)
    const entry = teachList.find((x) => x.art.id === artId)
    if (!entry) {
      set({
        actionFeedback: { text: '此武学非本门可传授之列。', tone: 'warn' },
      })
      return
    }

    if (!canPlayerLearnSectArt(s.sectState.rank, entry.requiredRank)) {
      set({
        actionFeedback: {
          text: `职阶不足！《${entry.art.cleanName}》（${entry.art.fullTier}）需本门【${entry.requiredRankLabel}】方可修习（当前为【${s.sectState.rankLabel}】）。`,
          tone: 'warn',
        },
      })
      return
    }

    const nextLearned: LearnedArtEntry[] = [
      ...s.learnedArts.map((x) => ({ ...x })),
      { artId: entry.art.id, level: 1, exp: 0 },
    ]
    const sharedTag = entry.isSharedFromShaolin ? '（南北少林同源共传）' : ''
    const msg = `蒙师门传授，正式习得${entry.art.fullTier}${entry.art.category}《${entry.art.cleanName}》第 1 重入门${sharedTag}！`

    set({
      learnedArts: nextLearned,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '师门传功', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  runQuestEffects: (effects, contextNpc = null) => {
    for (const eff of effects) {
      const s = get()
      if (s.gameOver) return

      switch (eff.type) {
        case 'openScene': {
          set({
            activeStoryScene: {
              scene: eff.scene,
              beatIndex: 0,
              contextNpc: contextNpc ?? null,
            },
            activeNpcInteraction: null,
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
          })
          break
        }

        case 'startQuest': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          const stepId = eff.stepId ?? qDef?.initialStepId ?? 'init'
          nextQuest.activeQuests[eff.questId] = {
            questId: eff.questId,
            stepId,
            startedDay: s.dayCount,
            deadlineDay: eff.deadlineDays ? s.dayCount + eff.deadlineDays : null,
            vars: { ...(eff.vars ?? {}) },
          }
          delete nextQuest.completedQuests[eff.questId]

          const stepTitle = qDef?.steps[stepId]?.title ?? stepId
          const msg = `开启江湖卷宗《${qDef?.title ?? eff.questId}》——当前指引：${stepTitle}`
          set({
            questState: nextQuest,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'success' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事开篇', msg, true, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'setQuestStep': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          const prev = nextQuest.activeQuests[eff.questId]
          nextQuest.activeQuests[eff.questId] = {
            questId: eff.questId,
            stepId: eff.stepId,
            startedDay: prev?.startedDay ?? s.dayCount,
            deadlineDay:
              eff.deadlineDays === undefined
                ? (prev?.deadlineDay ?? null)
                : eff.deadlineDays === null
                  ? null
                  : s.dayCount + eff.deadlineDays,
            vars: { ...(prev?.vars ?? {}), ...(eff.varsPatch ?? {}) },
          }
          const stepTitle = qDef?.steps[eff.stepId]?.title ?? eff.stepId
          const msg = `《${qDef?.title ?? eff.questId}》推进至新阶段：【${stepTitle}】`
          set({
            questState: nextQuest,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'talk' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事推进', msg, false, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'completeQuest': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          delete nextQuest.activeQuests[eff.questId]
          const prevComp = nextQuest.completedQuests[eff.questId]
          const outcomeStr = eff.outcome ?? 'completed'
          nextQuest.completedQuests[eff.questId] = {
            questId: eff.questId,
            outcome: outcomeStr,
            completedDay: s.dayCount,
            count: (prevComp?.count ?? 0) + 1,
          }
          const isSuccessOutcome = outcomeStr !== 'failed' && outcomeStr !== 'abandoned'
          const combatExpBonus =
            typeof eff.combatExp === 'number'
              ? eff.combatExp
              : isSuccessOutcome
                ? qDef?.category === 'main_story'
                  ? 120
                  : 60
                : 0
          const nextCombatExp = Math.max(0, s.combatExp + combatExpBonus)
          const msg = `圆满了结江湖卷宗《${qDef?.title ?? eff.questId}》${
            combatExpBonus > 0 ? `（战斗经验 +${combatExpBonus}，现 ${nextCombatExp}）` : ''
          }！`
          set({
            questState: nextQuest,
            combatExp: nextCombatExp,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'success' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事完结', msg, true, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'abandonQuest': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          delete nextQuest.activeQuests[eff.questId]
          nextQuest.dynamicActors = nextQuest.dynamicActors.filter(
            (a) => a.questId !== eff.questId,
          )
          const msg = `任务《${qDef?.title ?? eff.questId}》已中止作罢。`
          set({
            questState: nextQuest,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'warn' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事中止', msg, false, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'setFlag': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          nextQuest.flags[eff.flag] = eff.value
          const nextSect = clonePlayerSectState(s.sectState)
          if (
            eff.flag === 'toumingzhuang_state' &&
            (eff.value === 'none' || eff.value === 'accepted' || eff.value === 'completed')
          ) {
            nextSect.toumingzhuangState = eff.value
          }
          if (eff.flag === 'song_court_blacklisted') {
            nextSect.songCourtBlacklisted = Boolean(eff.value)
          }
          if (eff.flag === 'liao_suspicion_debuff') {
            nextSect.liaoSuspicionDebuff = Boolean(eff.value)
          }
          set({ questState: nextQuest, sectState: nextSect })
          break
        }

        case 'addFlagNumber': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          const curVal = Number(nextQuest.flags[eff.flag] ?? 0)
          nextQuest.flags[eff.flag] = curVal + eff.delta
          set({ questState: nextQuest })
          break
        }

        case 'giveSilver': {
          set({ silver: Math.max(0, s.silver + eff.amount) })
          break
        }

        case 'giveFood': {
          set({ food: Math.max(0, s.food + eff.amount) })
          break
        }

        case 'giveCombatExp': {
          set({ combatExp: Math.max(0, s.combatExp + eff.amount) })
          break
        }

        case 'giveItem': {
          const nextInv = addItemToInventory(s.inventory, eff.itemId, eff.qty ?? 1)
          set({ inventory: nextInv })
          break
        }

        case 'removeItem': {
          const needQty = eff.qty ?? 1
          const existing = s.inventory.find((x) => x.itemId === eff.itemId)
          if (existing) {
            const actualRemove = Math.min(existing.qty, needQty)
            const nextInv = removeItemFromInventory(s.inventory, eff.itemId, actualRemove)
            if (nextInv) set({ inventory: nextInv })
          }
          break
        }

        case 'modifyTalent': {
          const nextBase = cloneHeroBaseStats(s.baseStats)
          const cur = nextBase.talents[eff.key] ?? 50
          nextBase.talents[eff.key] = Math.max(1, Math.min(100, cur + eff.delta))
          const derived = deriveHeroEffectiveStats(
            nextBase,
            s.equipped,
            s.equippedArts,
            s.learnedArts,
          )
          set({
            baseStats: nextBase,
            maxHp: derived.maxHp,
            hp: Math.min(derived.maxHp, s.hp),
            maxMp: derived.maxMp,
            mp: Math.min(derived.maxMp, s.mp),
            agility: derived.agility,
            res: derived.res,
            skills: derived.skills,
          })
          break
        }

        case 'modifySkill': {
          const nextBase = cloneHeroBaseStats(s.baseStats)
          if (eff.key === '骑术') {
            nextBase.ridingSkill = Math.max(
              0,
              Math.min(HERO_BASE_CAPS.ridingSkill, nextBase.ridingSkill + eff.delta),
            )
          } else {
            const cur = nextBase.skills[eff.key] ?? 40
            nextBase.skills[eff.key] = Math.max(
              0,
              Math.min(HERO_BASE_CAPS.civilSkill, cur + eff.delta),
            )
          }
          const derived = deriveHeroEffectiveStats(
            nextBase,
            s.equipped,
            s.equippedArts,
            s.learnedArts,
          )
          set({
            baseStats: nextBase,
            ridingSkill: derived.ridingSkill,
            skills: derived.skills,
          })
          break
        }

        case 'healPlayer': {
          const addHp = eff.hpPct ? Math.round(s.maxHp * (eff.hpPct / 100)) : 0
          const addMp = eff.mpPct ? Math.round(s.maxMp * (eff.mpPct / 100)) : 0
          set({
            hp: Math.max(1, Math.min(s.maxHp, s.hp + addHp)),
            mp: Math.max(0, Math.min(s.maxMp, s.mp + addMp)),
          })
          break
        }

        case 'teachMartialArt': {
          const art = MARTIAL_ART_DB_MAP[eff.artId]
          if (!art) break
          const targetLv = Math.max(1, Math.min(10, eff.level ?? 1))
          const nextLearned = s.learnedArts.map((x) => ({ ...x }))
          const idx = nextLearned.findIndex((x) => x.artId === eff.artId)
          if (idx === -1) {
            nextLearned.push({ artId: eff.artId, level: targetLv, exp: 0 })
          } else if (targetLv > nextLearned[idx]!.level) {
            nextLearned[idx] = { artId: eff.artId, level: targetLv, exp: 0 }
          }
          const derived = deriveHeroEffectiveStats(
            s.baseStats,
            s.equipped,
            s.equippedArts,
            nextLearned,
          )
          const msg = `剧情传功：领悟${art.fullTier}${art.category}《${art.cleanName}》（第 ${targetLv} 重）！`
          set({
            learnedArts: nextLearned,
            maxHp: derived.maxHp,
            hp: Math.min(derived.maxHp, s.hp),
            maxMp: derived.maxMp,
            mp: Math.min(derived.maxMp, s.mp),
            agility: derived.agility,
            res: derived.res,
            qinggongBonus: derived.qinggongBonus,
            logs: [
              createLogEntry(s.dayCount, '绝学传授', msg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'joinSect': {
          const faction = FACTION_DB_MAP[eff.sectId]
          if (!faction) break
          const startRank: SectRankLevel =
            eff.rank ?? (faction.acceptsOuterDisciple === false ? 2 : 1)
          const rankLabel = getSectRankTitle(eff.sectId, startRank)
          const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
          const curHalfYearIdx = Math.floor((s.dayCount - 1) / LIAO_SPY_HALF_YEAR_DAYS) + 1
          const heroAge = getHeroAge(s.dayCount)

          const nextSect: PlayerSectState = {
            ...clonePlayerSectState(s.sectState),
            sectId: eff.sectId,
            rank: startRank,
            rankLabel,
            contribution: 0,
            joinedDay: s.dayCount,
            lastStipendMonth: curMonthIdx,
            activeLiaoSpy: eff.allowOfficialTransfer ? null : s.sectState.activeLiaoSpy,
          }

          if (
            eff.sectId === 'SECT-22' &&
            heroAge >= CHANGSHAN_ADULT_AGE &&
            !nextSect.activeLiaoSpy &&
            nextSect.lastLiaoSpyMissionYear < curHalfYearIdx
          ) {
            nextSect.lastLiaoSpyMissionYear = curHalfYearIdx
            nextSect.activeLiaoSpy = spawnAnnualLiaoSpy(curHalfYearIdx, s.dayCount)
          }

          const msg = `正式拜入【${faction.name}】，授职第 ${startRank} 阶【${rankLabel}】！`
          set({
            sectState: nextSect,
            actionFeedback: { text: msg, tone: 'success' },
            logs: [
              createLogEntry(s.dayCount, '拜入宗门', msg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'leaveSect': {
          if (!s.sectState.sectId) break
          if (eff.skipPenalty) {
            const factionName =
              FACTION_DB_MAP[s.sectState.sectId]?.name ?? s.sectState.sectId
            const nextSect: PlayerSectState = {
              ...clonePlayerSectState(s.sectState),
              sectId: null,
              rank: 1,
              rankLabel: '无门无派',
              contribution: 0,
              activeLiaoSpy: null,
            }
            set({
              sectState: nextSect,
              logs: [
                createLogEntry(
                  s.dayCount,
                  '奉命离宗',
                  `少侠依约脱离【${factionName}】。`,
                  false,
                  s.shichenIdx,
                ),
                ...s.logs,
              ].slice(0, 60),
            })
          } else {
            get().leaveSect()
          }
          break
        }

        case 'addSectContribution': {
          if (!s.sectState.sectId) break
          const nextSect = clonePlayerSectState(s.sectState)
          nextSect.contribution = Math.max(0, nextSect.contribution + eff.amount)
          set({ sectState: nextSect })
          break
        }

        case 'modifyNpcFavor': {
          const nextFavor = { ...s.npcFavor }
          if (eff.target.kind === 'npc') {
            const cur = nextFavor[eff.target.npcId] ?? INITIAL_NPC_FAVOR
            nextFavor[eff.target.npcId] = Math.max(
              MIN_NPC_FAVOR,
              Math.min(MAX_NPC_FAVOR, cur + eff.delta),
            )
          } else {
            for (const npc of NPCS_DB) {
              if (!isSongAlignedNpc(npc)) continue
              const cur = nextFavor[npc.id] ?? INITIAL_NPC_FAVOR
              nextFavor[npc.id] = Math.max(
                MIN_NPC_FAVOR,
                Math.min(MAX_NPC_FAVOR, cur + eff.delta),
              )
            }
          }
          set({ npcFavor: nextFavor })
          break
        }

        case 'spawnDynamicActor': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          nextQuest.dynamicActors = [
            ...nextQuest.dynamicActors.filter((a) => a.actorId !== eff.actor.actorId),
            {
              ...eff.actor,
              stats: { ...eff.actor.stats },
            },
          ]
          set({ questState: nextQuest })
          break
        }

        case 'removeDynamicActor': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          nextQuest.dynamicActors = nextQuest.dynamicActors.filter((a) => {
            if (eff.actorId && a.actorId === eff.actorId) return false
            if (eff.questId && a.questId === eff.questId) return false
            return true
          })
          set({ questState: nextQuest })
          break
        }

        case 'teleportPlayer': {
          const bRec = eff.buildingId ? BUILDING_DB_MAP[eff.buildingId] : null
          const enterBldg = Boolean(bRec?.interior)
          set({
            traveling: null,
            campPos: null,
            currentNodeId: eff.regionId,
            activeRegionId: eff.regionId,
            selectedNodeId: eff.regionId,
            viewMode: enterBldg ? 'building' : 'region',
            activeBuildingInteriorId: enterBldg && bRec ? bRec.id : null,
            selectedBuildingId: enterBldg
              ? eff.spotId
                ? null
                : (bRec?.id ?? null)
              : (eff.buildingId ?? null),
            selectedSpotId: enterBldg ? (eff.spotId ?? null) : null,
            regionPan: { x: 0, y: 0, scale: 1 },
          })
          break
        }

        case 'advanceShichen': {
          const clock = advanceShichenClock(s.dayCount, s.shichenIdx, eff.count)
          const dayHook =
            clock.daysAdded > 0
              ? applyDayProgressionSectHooks({
                  nextDayCount: clock.dayCount,
                  shichenIdx: clock.shichenIdx,
                  silver: s.silver,
                  sectState: s.sectState,
                  logs: s.logs,
                })
              : {
                  silver: s.silver,
                  sectState: s.sectState,
                  logs: s.logs,
                  overdueSpyAmbush: null,
                }
          set({
            dayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            silver: dayHook.silver,
            sectState: dayHook.sectState,
            logs: dayHook.logs.slice(0, 60),
          })
          if (clock.daysAdded > 0) {
            get().checkExpiredQuestDeadlines()
          }
          break
        }

        case 'startCombat': {
          const opp = resolveQuestCombatOpponent(
            eff.opponent,
            contextNpc ?? null,
            s.questState.dynamicActors,
          )
          if (!opp) break

          const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
          const startHp = Math.max(1, s.hp)
          const playerCombatant = buildPlayerCombatant({
            hp: startHp,
            mp: s.mp,
            baseStats: s.baseStats,
            equipped: s.equipped,
            equippedArts: s.equippedArts,
            learnedArts: s.learnedArts,
          })

          const isLethalDuel = eff.rule === 'duel'
          const isSurviveRounds = eff.rule === 'survive_rounds'
          const stakes: DuelStakesKind =
            eff.duelStakesTag ?? (isLethalDuel ? 'duel' : 'spar')

          const session = createCombatSession({
            mode: isLethalDuel ? 'duel' : 'spar',
            duelStakes: stakes,
            player: playerCombatant,
            npcNode: opp,
            maxRounds: eff.maxRounds ?? (isSurviveRounds ? 10 : undefined),
            surviveToWin: isSurviveRounds,
            forbidEscapeReason:
              eff.forbidEscapeReason !== undefined
                ? eff.forbidEscapeReason
                : isSurviveRounds
                  ? '师门考校试炼之中，不可临阵脱逃！'
                  : null,
            customIntroText: eff.introText,
            questCombatHook: {
              questId: eff.questId,
              rule: eff.rule,
              deathTitle: eff.deathTitle,
              deathDetail: eff.deathDetail,
              onWin: eff.onWin,
              onLose: eff.onLose,
              onEscape: eff.onEscape,
              onDraw: eff.onDraw,
            },
          })

          set({
            dayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            activeCombat: session,
            activeStoryScene: null,
            activeNpcInteraction: null,
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
          })
          break
        }

        case 'triggerGameOver': {
          const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
          const songDate = formatSongDate(s.dayCount, s.shichenIdx)
          const payload: GameOverState = {
            reasonTitle: eff.reasonTitle,
            reasonDetail: eff.reasonDetail,
            killerName: eff.killerName ?? '江湖劫数',
            songDate,
            locationName: regionName,
          }
          set({
            activeCombat: null,
            activeStoryScene: null,
            activeNpcInteraction: null,
            hp: 0,
            gameOver: payload,
            logs: [
              createLogEntry(s.dayCount, eff.reasonTitle, eff.reasonDetail, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          return
        }

        case 'toast': {
          set({
            actionFeedback: {
              text: eff.text,
              tone: eff.tone ?? 'talk',
            },
            logs: [
              createLogEntry(
                s.dayCount,
                eff.logTag ?? '江湖纪事',
                eff.text,
                true,
                s.shichenIdx,
              ),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'branch': {
          const evalRes = evaluateQuestCondition(
            eff.condition,
            buildStoreEvalContext(s, contextNpc),
          )
          const subEffects = evalRes.passed ? eff.thenEffects : (eff.elseEffects ?? [])
          if (subEffects.length > 0) {
            get().runQuestEffects(subEffects, contextNpc)
          }
          break
        }
      }
    }
  },

  advanceStoryScene: () => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur) return

    if (cur.beatIndex + 1 < cur.scene.beats.length) {
      set({
        activeStoryScene: {
          ...cur,
          beatIndex: cur.beatIndex + 1,
        },
      })
      return
    }

    // Reached final beat: if there are no choices, close scene and execute onFinishEffects
    if (!cur.scene.choices || cur.scene.choices.length === 0) {
      const finishEffects = cur.scene.onFinishEffects ?? []
      const ctxNpc = cur.contextNpc
      set({ activeStoryScene: null })
      if (finishEffects.length > 0) {
        get().runQuestEffects(finishEffects, ctxNpc)
      }
    }
  },

  selectStoryChoice: (choiceId) => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur || !cur.scene.choices) return
    const choice = cur.scene.choices.find((c) => c.id === choiceId)
    if (!choice) return

    if (choice.condition) {
      const check = evaluateQuestCondition(
        choice.condition,
        buildStoreEvalContext(s, cur.contextNpc),
      )
      if (!check.passed) {
        set({
          actionFeedback: {
            text: check.reason ?? '尚未满足该抉择条件。',
            tone: 'warn',
          },
        })
        return
      }
    }

    const ctxNpc = cur.contextNpc
    set({ activeStoryScene: null })
    if (choice.effects.length > 0) {
      get().runQuestEffects(choice.effects, ctxNpc)
    }
  },

  closeStoryScene: () => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur || cur.scene.mandatory) return
    // Only allow direct close if there are no choices, or if one of the choices has empty effects
    if (cur.scene.choices && cur.scene.choices.length > 0) {
      const safeExit = cur.scene.choices.find((c) => !c.condition && c.effects.length === 0)
      if (!safeExit) return
      set({ activeStoryScene: null })
      return
    }
    const finishEffects = cur.scene.onFinishEffects ?? []
    const ctxNpc = cur.contextNpc
    set({ activeStoryScene: null })
    if (finishEffects.length > 0) {
      get().runQuestEffects(finishEffects, ctxNpc)
    }
  },

  fireLocationTriggersForCurrentSpot: (loc) => {
    const s = get()
    if (s.gameOver || s.activeCombat) return false
    const matched = findMatchingLocationTriggers(loc, buildStoreEvalContext(s))
    if (matched.length === 0) return false

    for (const { trigger } of matched) {
      const latest = get()
      if (latest.gameOver || latest.activeCombat) break
      if (trigger.onceFlag) {
        const nextQuest = cloneQuestRuntimeState(latest.questState)
        nextQuest.flags[trigger.onceFlag] = true
        set({ questState: nextQuest })
      }
      get().runQuestEffects(trigger.effects, null)
    }
    return true
  },

  checkExpiredQuestDeadlines: () => {
    const s = get()
    if (s.gameOver) return
    const activeEntries = Object.values(s.questState.activeQuests)
    for (const prog of activeEntries) {
      if (prog.deadlineDay === null || s.dayCount <= prog.deadlineDay) continue
      const qDef = QUEST_MAP[prog.questId]
      // Clear deadline first so it never loops infinitely
      const nextQuest = cloneQuestRuntimeState(get().questState)
      if (nextQuest.activeQuests[prog.questId]) {
        nextQuest.activeQuests[prog.questId] = {
          ...nextQuest.activeQuests[prog.questId]!,
          deadlineDay: null,
        }
        set({ questState: nextQuest })
      }
      if (
        qDef?.onDeadlineExpired &&
        (!qDef.onDeadlineExpired.stepId || qDef.onDeadlineExpired.stepId === prog.stepId)
      ) {
        get().runQuestEffects(qDef.onDeadlineExpired.effects, null)
      }
    }
  },

  locateQuestTargetOnMap: (target) => {
    const s = get()
    const regNode = NODE_MAP[target.regionId]
    if (!regNode) return

    if (s.currentNodeId === target.regionId && !s.campPos && !s.traveling) {
      if (target.buildingId) {
        const bRec = BUILDING_DB_MAP[target.buildingId]
        if (bRec?.interior) {
          set({
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
            viewMode: 'building',
            activeRegionId: target.regionId,
            activeBuildingInteriorId: bRec.id,
            selectedBuildingId: target.spotId ? null : bRec.id,
            selectedSpotId: target.spotId ?? null,
            regionPan: { x: 0, y: 0, scale: 1 },
            actionFeedback: {
              text: `已循任务卷宗步入【${target.customLabel ?? bRec.name}】！`,
              tone: 'success',
            },
          })
          if (target.spotId) {
            get().fireLocationTriggersForCurrentSpot({
              regionId: target.regionId,
              buildingId: bRec.id,
              spotId: target.spotId,
            })
          } else {
            get().fireLocationTriggersForCurrentSpot({
              regionId: target.regionId,
              buildingId: bRec.id,
              spotId: null,
            })
          }
          return
        }
        if (bRec) {
          set({
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
            viewMode: 'region',
            activeRegionId: target.regionId,
            activeBuildingInteriorId: null,
            selectedBuildingId: bRec.id,
            selectedSpotId: null,
            regionPan: { x: 0, y: 0, scale: 1 },
            actionFeedback: {
              text: `已定位至本州【${target.customLabel ?? bRec.name}】！`,
              tone: 'success',
            },
          })
          get().fireLocationTriggersForCurrentSpot({
            regionId: target.regionId,
            buildingId: bRec.id,
            spotId: null,
          })
          return
        }
      }
      set({
        menuOpen: false,
        compendiumOpen: false,
        tooltip: null,
        viewMode: 'region',
        activeRegionId: target.regionId,
        activeBuildingInteriorId: null,
        selectedBuildingId: null,
        selectedSpotId: null,
        actionFeedback: {
          text: `少侠当前正身处【${regNode.name}】境内！`,
          tone: 'talk',
        },
      })
      return
    }

    set({
      menuOpen: false,
      compendiumOpen: false,
      tooltip: null,
      viewMode: 'world',
      activeBuildingInteriorId: null,
      selectedNodeId: target.regionId,
      worldPan: { x: 0, y: 0, scale: 1 },
      actionFeedback: {
        text: `已在天下舆图锁定目标州府【${target.customLabel ?? regNode.name}】，点击右侧【启程前往】即可策马奔赴！`,
        tone: 'success',
      },
    })
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
    let nextCombatExp = s.combatExp
    let nextHp = s.hp
    let nextMp = s.mp
    let nextBaseStats = s.baseStats
    let nextRes = s.res
    let nextSkills = s.skills
    let nextSectState = s.sectState
    let overdueSpyAmbush: NodeNpc | null = null
    let nextLogs = [...s.logs]
    let nextMasters = s.roamingMasters

    let crossedDayBoundary = false
    if (dayAccumulator >= 1.0) {
      dayAccumulator -= 1.0
      nextDayCount += 1
      crossedDayBoundary = true
      if (nextFood > 0) {
        nextFood -= 1
      } else if (nextSilver >= DAILY_INN_LODGING_COST) {
        nextSilver -= DAILY_INN_LODGING_COST
      } else {
        nextHp = Math.max(1, Math.round(nextHp * 0.9))
        nextMp = Math.max(0, Math.round(nextMp * 0.9))
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
            combatExp: nextCombatExp,
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
          nextCombatExp = draft.combatExp
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

      const dayHook = applyDayProgressionSectHooks({
        nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        logs: nextLogs,
      })
      nextSilver = dayHook.silver
      nextSectState = dayHook.sectState
      nextLogs = dayHook.logs
      overdueSpyAmbush = dayHook.overdueSpyAmbush
    }

    if (ratio >= 1) {
      const arrivedNodeId = seg.to
      const blacklisted =
        nextSectState.songCourtBlacklisted || Boolean(s.questState.flags.song_court_blacklisted)
      if (arrivedNodeId === 'bianliang' && blacklisted) {
        const ambushMsg =
          '少侠身负绿林劫官海捕文书踏入东京【开封府】界，城门前红衣剑影一闪——御前四品带刀护卫【展昭】按巨阙宝剑拦路喝道：「朝廷钦犯休走！随展某回开封府伏法！」'
        nextLogs.unshift(
          createLogEntry(nextDayCount, '开封缉捕', ambushMsg, true, nextShichenIdx),
        )
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          food: nextFood,
          silver: nextSilver,
          combatExp: nextCombatExp,
          sectState: nextSectState,
          baseStats: nextBaseStats,
          hp: nextHp,
          mp: nextMp,
          res: nextRes,
          skills: nextSkills,
          roamingMasters: nextMasters,
          traveling: null,
          campPos: null,
          currentNodeId: 'bianliang',
          selectedNodeId: 'bianliang',
          activeRegionId: 'bianliang',
          activeBuildingInteriorId: null,
          selectedBuildingId: null,
          selectedSpotId: null,
          viewMode: 'region',
          regionPan: { x: 0, y: 0, scale: 1 },
          logs: nextLogs.slice(0, 60),
        })
        if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
        get().fireLocationTriggersForCurrentSpot({
          regionId: 'bianliang',
          buildingId: null,
          spotId: null,
          isPassThrough: true,
        })
        if (!get().activeStoryScene && !get().activeCombat && !get().gameOver) {
          get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
        }
        return
      }

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
          combatExp: nextCombatExp,
          sectState: nextSectState,
          baseStats: nextBaseStats,
          hp: nextHp,
          mp: nextMp,
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
        if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
        if (overdueSpyAmbush) {
          get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        } else {
          get().fireLocationTriggersForCurrentSpot({
            regionId: arrivedNodeId,
            buildingId: null,
            spotId: null,
            isPassThrough: false,
          })
          if (!get().activeCombat && !get().gameOver) {
            void get().saveToSlot('autosave', `策马抵达${destName}`, true)
          }
        }
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
        combatExp: nextCombatExp,
        sectState: nextSectState,
        baseStats: nextBaseStats,
        hp: nextHp,
        mp: nextMp,
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
      if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
      if (overdueSpyAmbush) {
        get().campStop()
        get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        return
      }
      const passTriggered = get().fireLocationTriggersForCurrentSpot({
        regionId: arrivedNodeId,
        buildingId: null,
        spotId: null,
        isPassThrough: true,
      })
      if (passTriggered && (get().activeCombat || get().activeStoryScene || get().gameOver)) {
        set({
          traveling: null,
          campPos: null,
          activeRegionId: arrivedNodeId,
          selectedNodeId: arrivedNodeId,
          viewMode: 'region',
        })
      }
      return
    }

    set({
      dayCount: nextDayCount,
      shichenIdx: nextShichenIdx,
      food: nextFood,
      silver: nextSilver,
      combatExp: nextCombatExp,
      sectState: nextSectState,
      baseStats: nextBaseStats,
      hp: nextHp,
      mp: nextMp,
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
    if (crossedDayBoundary) get().checkExpiredQuestDeadlines()
    if (overdueSpyAmbush) {
      get().campStop()
      get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    }
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
      logs: [
        createLogEntry(
          s.dayCount,
          '原地露营',
          `少侠收缰驻马，于【${fromName}】至【${toName}】旷野中途原地安营扎寨（距${fromName} ${Math.round(camp.distU)} 里 · 距${toName} ${Math.round(camp.distV)} 里，可就地开启野外扎营闭关）。`,
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
        mp: st.mp,
        maxMp: st.maxMp,
        combatExp: st.combatExp,
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
      combatExp: Math.max(0, Math.floor(st.combatExp ?? 0)),
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, st.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, st.mp),
      res: derived.res,
      skills: derived.skills,
      consumedUniqueIds: st.consumedUniqueIds ?? [],
      npcFavor: st.npcFavor ? { ...st.npcFavor } : {},
      sectState: clonePlayerSectState(st.sectState),
      questState: cloneQuestRuntimeState(st.questState),
      gameOver: null,
      campPos: st.campPos ?? null,
      traveling: null,
      cultivationSession: null,
      activeCombat: null,
      activeStoryScene: null,
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
