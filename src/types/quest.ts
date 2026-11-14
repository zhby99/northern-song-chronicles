import type {
  EquippedArtsMap,
  EquippedSlotsMap,
  HeroTalents,
  LearnedArtEntry,
  NodeNpc,
  NpcCombatStats,
  NpcTalents,
  NpcTenArts,
  SectRankLevel,
  TenArtKey,
} from './game'

export type QuestPrimitiveValue = string | number | boolean

export type QuestCategoryKey =
  | 'sect_entry'
  | 'sect_mission'
  | 'city_story'
  | 'main_story'
  | 'adventure'

/**
 * 动态剧情人物：绑定至最末层地点（州府 + 建筑 + 可选子建筑 spot），
 * 无需修改静态 1000 人 JSON 数据库即可在任意任务步骤中刷出/销毁。
 */
export interface DynamicQuestNpc {
  actorId: string
  questId: string
  regionId: string
  buildingId: string
  spotId: string | null
  name: string
  title: string
  realm: string
  badgeLabel?: string
  factionId?: string
  factionName?: string
  sectRank?: SectRankLevel
  sectRankLabel?: string
  avatarUrl?: string | null
  portraitUrl?: string | null
  talk: string
  stats: NpcCombatStats
  talents?: NpcTalents
  tenArts?: NpcTenArts
  equippedArts?: EquippedArtsMap
  learnedArts?: LearnedArtEntry[]
  equipped?: EquippedSlotsMap
}

export interface ActiveQuestProgress {
  questId: string
  stepId: string
  startedDay: number
  deadlineDay: number | null
  vars: Record<string, QuestPrimitiveValue>
}

export interface CompletedQuestRecord {
  questId: string
  outcome: string
  completedDay: number
  count: number
}

/**
 * 持久化于存档中的唯一通用剧情容器（新增任意门派/城市剧情均无需修改存档结构）
 */
export interface QuestRuntimeState {
  activeQuests: Record<string, ActiveQuestProgress>
  completedQuests: Record<string, CompletedQuestRecord>
  flags: Record<string, QuestPrimitiveValue>
  dynamicActors: DynamicQuestNpc[]
}

/**
 * 原子条件积木（支持 all / any / not 任意组合）
 */
export type QuestCondition =
  | { type: 'all'; conditions: QuestCondition[] }
  | { type: 'any'; conditions: QuestCondition[]; hint?: string }
  | { type: 'not'; condition: QuestCondition; reason?: string }
  | { type: 'talentAtLeast'; key: keyof HeroTalents; min: number }
  | { type: 'talentAtMost'; key: keyof HeroTalents; max: number }
  | { type: 'skillAtLeast'; key: TenArtKey; min: number }
  | {
      type: 'combatStatAtLeast'
      key: 'maxHp' | 'maxMp' | 'agility' | 'res'
      min: number
    }
  | { type: 'silverAtLeast'; min: number }
  | { type: 'hasItem'; itemId: string; qty?: number }
  | { type: 'learnedArtAtLeast'; artId: string; minLevel: number }
  | { type: 'inSect'; sectId: string | null; minRank?: SectRankLevel }
  | { type: 'notInAnySect'; allowTransferFromSectId?: string }
  | {
      type: 'questStatus'
      questId: string
      status: 'not_started' | 'active' | 'completed' | 'not_completed'
      stepId?: string
      outcome?: string
    }
  | {
      type: 'flag'
      flag: string
      op?: 'truthy' | 'falsy' | 'eq' | 'neq' | 'gte' | 'lte'
      value?: QuestPrimitiveValue
      label?: string
    }
  | { type: 'npcFavorAtLeast'; npcId: string; min: number }
  | { type: 'shichenIn'; indices: number[]; label?: string }
  | {
      type: 'targetNpcMatch'
      npcIds?: string[]
      factionIds?: string[]
      exactSectRank?: SectRankLevel
      minSectRank?: SectRankLevel
      dynamicActorIds?: string[]
      specialGroup?: 'song_official_for_robbery'
    }

/**
 * 多幕对话舞台中的发言人定义
 */
export type StorySpeakerSpec =
  | { kind: 'narrator'; label?: string }
  | { kind: 'player' }
  | { kind: 'npc'; npcId: string }
  | { kind: 'interactedNpc' }
  | {
      kind: 'custom'
      name: string
      title?: string
      factionName?: string
      portraitUrl?: string
    }

export interface StoryBeatDef {
  speaker: StorySpeakerSpec
  text: string
}

export interface StoryChoiceDef {
  id: string
  label: string
  subLabel?: string
  tone?: 'default' | 'primary' | 'danger' | 'jade' | 'gold'
  condition?: QuestCondition
  hideWhenUnavailable?: boolean
  effects: QuestEffect[]
}

export interface StorySceneDef {
  id: string
  title: string
  subtitle?: string
  mandatory?: boolean
  beats: StoryBeatDef[]
  choices?: StoryChoiceDef[]
  onFinishEffects?: QuestEffect[]
}

/**
 * 运行时正在播放的多幕对话演出状态
 */
export interface ActiveStorySceneState {
  scene: StorySceneDef
  beatIndex: number
  contextNpc: NodeNpc | null
}

/**
 * 剧情战斗规则枚举：
 * - spar: 普通切磋（战败保底 15% 气血，不死）
 * - duel: 生死决战（战败即 Game Over，支持自定义死因碑文）
 * - survive_rounds: 撑过 maxRounds 合不败即算获胜（名门拜师考校高频机制，提前气血归零仅判试炼未过、不死）
 * - story_trial: 剧情比试（无论胜负均不死，按结果分流执行 onWin / onLose）
 */
export type QuestCombatRule = 'spar' | 'duel' | 'survive_rounds' | 'story_trial'

export type QuestCombatOpponentSpec =
  | { kind: 'npc'; npcId: string; talkOverride?: string }
  | { kind: 'dynamicActor'; actorId: string }
  | { kind: 'interactedNpc' }
  | { kind: 'custom'; npc: NodeNpc }

export interface ActiveQuestCombatHook {
  questId?: string
  rule: QuestCombatRule
  deathTitle?: string
  deathDetail?: string
  onWin: QuestEffect[]
  onLose?: QuestEffect[]
  onEscape?: QuestEffect[]
  onDraw?: QuestEffect[]
}

/**
 * 原子剧情结果动作积木
 */
export type QuestEffect =
  | { type: 'openScene'; scene: StorySceneDef }
  | {
      type: 'startQuest'
      questId: string
      stepId?: string
      deadlineDays?: number
      vars?: Record<string, QuestPrimitiveValue>
      silent?: boolean
    }
  | {
      type: 'setQuestStep'
      questId: string
      stepId: string
      deadlineDays?: number | null
      varsPatch?: Record<string, QuestPrimitiveValue>
      silent?: boolean
    }
  | {
      type: 'completeQuest'
      questId: string
      outcome?: string
      combatExp?: number
      silent?: boolean
    }
  | { type: 'abandonQuest'; questId: string; silent?: boolean }
  | { type: 'setFlag'; flag: string; value: QuestPrimitiveValue }
  | { type: 'addFlagNumber'; flag: string; delta: number }
  | { type: 'giveSilver'; amount: number; reason?: string }
  | { type: 'giveFood'; amount: number }
  | { type: 'giveCombatExp'; amount: number; reason?: string }
  | { type: 'modifyRenown'; delta: number; reason?: string }
  | { type: 'modifyChivalry'; delta: number; reason?: string }
  | { type: 'giveItem'; itemId: string; qty?: number }
  | { type: 'removeItem'; itemId: string; qty?: number }
  | { type: 'modifyTalent'; key: keyof HeroTalents; delta: number }
  | { type: 'modifySkill'; key: TenArtKey; delta: number }
  | {
      type: 'modifyBaseStat'
      key: 'maxHp' | 'maxMp' | 'agility' | 'res'
      delta: number
    }
  | { type: 'healPlayer'; hpPct?: number; mpPct?: number }
  | { type: 'teachMartialArt'; artId: string; level?: number; exp?: number }
  | { type: 'addArtExp'; amount: number; artId?: string }
  | {
      type: 'joinSect'
      sectId: string
      rank?: SectRankLevel
      allowOfficialTransfer?: boolean
    }
  | { type: 'leaveSect'; skipPenalty?: boolean }
  | { type: 'addSectContribution'; amount: number }
  | {
      type: 'modifyNpcFavor'
      target: { kind: 'npc'; npcId: string } | { kind: 'all_song_aligned' }
      delta: number
    }
  | { type: 'spawnDynamicActor'; actor: DynamicQuestNpc }
  | { type: 'removeDynamicActor'; actorId?: string; questId?: string }
  | {
      type: 'teleportPlayer'
      regionId: string
      buildingId?: string | null
      spotId?: string | null
    }
  | { type: 'advanceShichen'; count: number }
  | {
      type: 'startCombat'
      questId?: string
      opponent: QuestCombatOpponentSpec
      rule: QuestCombatRule
      duelStakesTag?: 'spar' | 'duel' | 'rob_official' | 'zhan_zhao_arrest' | 'liao_spy_duel'
      maxRounds?: number
      forbidEscapeReason?: string | null
      introText?: string
      deathTitle?: string
      deathDetail?: string
      forceMandatory?: boolean
      onWin: QuestEffect[]
      onLose?: QuestEffect[]
      onEscape?: QuestEffect[]
      onDraw?: QuestEffect[]
    }
  | {
      type: 'triggerGameOver'
      reasonTitle: string
      reasonDetail: string
      killerName?: string
    }
  | {
      type: 'toast'
      text: string
      tone?: 'talk' | 'success' | 'warn'
      logTag?: string
    }
  | {
      type: 'branch'
      condition: QuestCondition
      thenEffects: QuestEffect[]
      elseEffects?: QuestEffect[]
    }

export interface QuestTargetLocationHint {
  regionId: string
  buildingId?: string
  spotId?: string
  customLabel?: string
}

export interface QuestStepDef {
  id: string
  title: string
  objective: string
  nextHint?: string
  targetLocation?: QuestTargetLocationHint
}

/**
 * 1) 踏入/途经地点自动触发器
 */
export interface QuestLocationTriggerDef {
  id: string
  regionId?: string
  buildingId?: string | null
  spotId?: string | null
  triggerOnPassThrough?: boolean
  onceFlag?: string
  condition?: QuestCondition
  effects: QuestEffect[]
}

/**
 * 2) 与 NPC 交互时注入的剧情按钮（可展示在底部栏和/或【门派事务】面板中）
 */
export interface QuestNpcActionDef {
  id: string
  label: string
  badge?: string
  tone?: 'default' | 'primary' | 'danger' | 'jade' | 'gold'
  showInBottomBar?: boolean
  showInSectPanel?: boolean
  visibleWhen: QuestCondition
  enabledWhen?: QuestCondition
  effects: QuestEffect[]
}

/**
 * 3) 在最末层建筑 / 子景点（ContextInspectorCard）注入的剧情探查/闯关按钮
 */
export interface QuestSpotActionDef {
  id: string
  label: string
  badge?: string
  subtitle?: string
  tone?: 'default' | 'primary' | 'danger' | 'jade' | 'gold'
  regionId: string
  buildingId: string
  spotId?: string | null
  visibleWhen?: QuestCondition
  enabledWhen?: QuestCondition
  effects: QuestEffect[]
}

/**
 * 4) 时间推进 / 任务期限届满触发器
 */
export interface QuestDeadlineHandlerDef {
  stepId?: string
  effects: QuestEffect[]
}

/**
 * 完整声明式门派/城市剧情任务链定义
 */
export interface QuestDefinition {
  id: string
  title: string
  category: QuestCategoryKey
  factionId?: string
  regionId?: string
  recommendedRealm?: string
  maxOpponentRealm?: string
  recommendedNote?: string
  startHint?: string
  startLocation?: QuestTargetLocationHint
  summary: string
  initialStepId: string
  steps: Record<string, QuestStepDef>
  locationTriggers?: QuestLocationTriggerDef[]
  npcActions?: QuestNpcActionDef[]
  spotActions?: QuestSpotActionDef[]
  onDeadlineExpired?: QuestDeadlineHandlerDef
}
