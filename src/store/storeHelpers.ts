import type { GameStoreData, GameStoreState } from './storeTypes'
import { MARTIAL_ART_DB_MAP } from '../data/gameDb'
import {
  DEFAULT_EQUIPPED_SLOTS,
  getEffectiveTalents,
} from '../data/itemsDb'
import {
  DEFAULT_EQUIPPED_ARTS,
  DEFAULT_LEARNED_ARTS,
  getArtCombatExpRequired,
  getArtExpRequired,
} from '../data/playerMartialArts'
import {
  cloneQuestRuntimeState,
  DEFAULT_QUEST_RUNTIME_STATE,
  type QuestEvalContext,
} from '../engine/questEngine'
import type {
  HeroBaseStats,
  LabelToggleKey,
  LearnedArtEntry,
  NodeNpc,
  SerializableGameState,
} from '../types/game'
import {
  calcDailyCultivationExpGain,
  cloneHeroBaseStats,
  DEFAULT_HERO_BASE_STATS,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
} from '../utils/heroStats'
import { WORLD_GRAPH } from '../utils/mapMath'
import { MAX_NPC_FAVOR } from '../utils/npcFavor'
import { type CombatSessionState } from '../utils/combatEngine'
import {
  clonePlayerSectState,
  DEFAULT_PLAYER_SECT_STATE,
} from '../utils/sectMechanics'

export const LABEL_KEYS: LabelToggleKey[] = ['cityLabels', 'sectPassLabels', 'masters', 'distance']

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

export const ROAD_EVENTS: RoadEventDef[] = [
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

import {
  addItemToInventory,
  removeItemFromInventory,
} from '../engine/shared/inventory'
import {
  advanceShichenClock,
  applyDailyVitalityRecovery,
  applyDayProgressionSectHooks,
  commitTimeAdvance,
  computeTimeAdvanceState,
  createLogEntry,
  rotateMonthlyRoamingMasters,
} from '../engine/time'

export {
  addItemToInventory,
  advanceShichenClock,
  applyDailyVitalityRecovery,
  applyDayProgressionSectHooks,
  commitTimeAdvance,
  computeTimeAdvanceState,
  createLogEntry,
  removeItemFromInventory,
  rotateMonthlyRoamingMasters,
}

export const INITIAL_DERIVED_STATS = deriveHeroEffectiveStats(
  DEFAULT_HERO_BASE_STATS,
  DEFAULT_EQUIPPED_SLOTS,
  DEFAULT_EQUIPPED_ARTS,
  DEFAULT_LEARNED_ARTS,
)

export function grantArtProficiency(
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

export function computeCombatSettlement(
  s: Pick<
    GameStoreState,
    | 'baseStats'
    | 'combatExp'
    | 'equipped'
    | 'equippedArts'
    | 'learnedArts'
    | 'npcFavor'
    | 'questState'
  >,
  session: CombatSessionState,
) {
  const nextBaseStats = cloneHeroBaseStats(s.baseStats)
  const nextLearnedArts = s.learnedArts.map((x) => ({ ...x }))
  const nextNpcFavor = { ...s.npcFavor }
  const outcome = session.outcome

  const enemyList =
    session.enemies && session.enemies.length > 0 ? session.enemies : [session.npc]
  const maxEnemyMp = Math.max(...enemyList.map((e) => e.maxMp))
  const isStrongOpponent = maxEnemyMp >= session.player.maxMp * 0.85
  const oppMp = maxEnemyMp
  const tierCombatBase =
    oppMp < 450 ? 15 : oppMp < 950 ? 22 : oppMp < 1800 ? 30 : oppMp < 3200 ? 40 : 50
  const multiEnemyMult = enemyList.length > 1 ? 1.35 : 1.0

  let combatExpGain = 0
  if (session.mode === 'spar') {
    if (outcome === 'player_win') {
      combatExpGain = Math.max(
        15,
        Math.round(tierCombatBase * multiEnemyMult * (isStrongOpponent ? 1.0 : 0.85)),
      )
    } else if (outcome === 'draw') {
      combatExpGain = Math.max(10, Math.round(tierCombatBase * 0.6))
    } else if (outcome === 'npc_win') {
      combatExpGain = Math.max(6, Math.round(tierCombatBase * 0.4))
    }
  } else {
    if (outcome === 'player_win') {
      combatExpGain = Math.round(tierCombatBase * 2.0 * multiEnemyMult)
      if (session.duelStakes === 'liao_spy_duel') combatExpGain += 80
      else if (session.duelStakes === 'rob_official') combatExpGain += 60
      else if (session.duelStakes === 'zhan_zhao_arrest') combatExpGain += 100
      else if (session.duelStakes === 'kaifeng_warrant') combatExpGain += 45
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

  const effTalents = getEffectiveTalents(s.baseStats.talents, s.equipped)
  const effJingyi =
    (s as { skills?: Record<string, number> }).skills?.['经义'] ??
    s.baseStats.skills['经义'] ??
    0

  for (const artId of practicedArtIds) {
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art) continue
    const baseDaily = calcDailyCultivationExpGain(art, effTalents, 1.0, effJingyi)
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
  const curFavor =
    npcKey in nextNpcFavor
      ? (nextNpcFavor[npcKey] ?? 0)
      : Math.round((effTalents.颜值 - 50) / 5)
  let favorGain = 0

  if (session.mode === 'spar' && session.duelStakes !== 'escort_ambush') {
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
    { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
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

  const oppNamesLabel = enemyList.map((e) => e.name).join('、')
  const outcomeTitle =
    outcome === 'player_win'
      ? session.mode === 'duel'
        ? `生死决战诛胜【${oppNamesLabel}】（${session.round}合）`
        : `力挫【${oppNamesLabel}】（${session.round}合获胜）`
      : outcome === 'draw'
        ? `与【${oppNamesLabel}】拆招${session.round}合秋色平分`
        : outcome === 'escaped'
          ? `与【${oppNamesLabel}】交锋中途飘然脱战`
          : session.mode === 'duel'
            ? `与【${oppNamesLabel}】生死相搏${session.round}合败亡`
            : `向【${oppNamesLabel}】请益${session.round}合惜败`

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

export function extractSerializableState(s: GameStoreState): SerializableGameState {
  return {
    characterCreated: s.characterCreated,
    playerName: s.playerName,
    playerPortraitId: s.playerPortraitId,
    playerGender: s.playerGender,
    playerAge: s.playerAge,
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
    birthplaceId: s.birthplaceId,
    cityStayShichens: s.cityStayShichens,
    campPos: s.campPos ? { ...s.campPos } : null,
    baseStats: cloneHeroBaseStats(s.baseStats),
    mountKey: s.mountKey,
    qinggongBonus: s.qinggongBonus,
    ridingSkill: s.ridingSkill,
    agility: s.agility,
    combatExp: s.combatExp,
    renown: s.renown,
    chivalry: s.chivalry,
    silver: s.silver,
    food: s.food,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    res: s.res,
    skills: { ...s.skills },
    artExps: { ...s.artExps },
    artMilestoneFlags: [...s.artMilestoneFlags],
    equipped: { ...s.equipped },
    learnedArts: s.learnedArts.map((x) => ({ ...x })),
    equippedArts: { ...s.equippedArts },
    inventory: s.inventory.map((x) => ({ ...x })),
    consumedUniqueIds: [...s.consumedUniqueIds],
    consumedOnceItemIds: [...s.consumedOnceItemIds],
    npcFavor: { ...s.npcFavor },
    npcTalkedMonth: { ...s.npcTalkedMonth },
    npcSparredMonth: { ...s.npcSparredMonth },
    npcBanquetedMonth: { ...s.npcBanquetedMonth },
    inscribedPoemSpotIds: [...s.inscribedPoemSpotIds],
    auctionBoughtByMonth: Object.fromEntries(
      Object.entries(s.auctionBoughtByMonth).map(([k, arr]) => [k, [...arr]]),
    ),
    activeEscortContract: s.activeEscortContract ? { ...s.activeEscortContract } : null,
    sectState: clonePlayerSectState(s.sectState),
    questState: cloneQuestRuntimeState(s.questState),
    hiddenQuestIds: [...s.hiddenQuestIds],
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
    | 'renown'
    | 'chivalry'
    | 'food'
    | 'hp'
    | 'maxHp'
    | 'mp'
    | 'maxMp'
    | 'agility'
    | 'res'
    | 'ridingSkill'
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
    renown: s.renown,
    chivalry: s.chivalry,
    food: s.food,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    agility: s.agility,
    res: s.res,
    ridingSkill: s.ridingSkill,
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

export function createInitialStoreData(): GameStoreData {
  return {
    characterCreated: false,
    playerName: '无名少侠',
    playerPortraitId: 'hero_04_swordsman',
    playerGender: '男',
    playerAge: 12,
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
    birthplaceId: 'bianliang',
    cityStayShichens: 0,

    baseStats: cloneHeroBaseStats(DEFAULT_HERO_BASE_STATS),
    mountKey: INITIAL_DERIVED_STATS.mountKey,
    qinggongBonus: INITIAL_DERIVED_STATS.qinggongBonus,
    ridingSkill: INITIAL_DERIVED_STATS.ridingSkill,
    agility: INITIAL_DERIVED_STATS.agility,
    combatExp: 80,
    renown: 0,
    chivalry: 0,
    silver: 150,
    food: 25,
    hp: INITIAL_DERIVED_STATS.maxHp,
    maxHp: INITIAL_DERIVED_STATS.maxHp,
    mp: INITIAL_DERIVED_STATS.maxMp,
    maxMp: INITIAL_DERIVED_STATS.maxMp,
    res: INITIAL_DERIVED_STATS.res,
    skills: { ...INITIAL_DERIVED_STATS.skills },

    equipped: { ...DEFAULT_EQUIPPED_SLOTS },
    learnedArts: [],
    equippedArts: {
      neigong: null,
      qinggong: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    },
    inventory: [],
    consumedUniqueIds: [],
    consumedOnceItemIds: [],
    npcTalkedMonth: {},
    npcSparredMonth: {},
    npcBanquetedMonth: {},
    inscribedPoemSpotIds: [],
    auctionBoughtByMonth: {},
    activeEscortContract: null,
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
    hiddenQuestIds: [],
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
    npcFavor: {},
    artExps: {},
    artMilestoneFlags: [],
    cultivationSpeedStep: 1,
    inspectedLearnedArtId: 'MA-179',
  }
}
