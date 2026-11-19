import {
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  resolveNpcByName,
} from '../data/gameDb'
import { ITEM_DB_MAP } from '../data/itemsDb'
import { getEffectiveTalents } from './equipment/equipmentStats'
import { getProtagonistPortrait } from '../data/protagonistPresets'
import { QUEST_MAP, QUEST_REGISTRY } from '../data/quests'
import type {
  EquippedArtsMap,
  EquippedSlotsMap,
  HeroBaseStats,
  HeroTalents,
  InventoryStack,
  LearnedArtEntry,
  NodeNpc,
  PlayerSectState,
} from '../types/game'
import type {
  DynamicQuestNpc,
  QuestCombatOpponentSpec,
  QuestCondition,
  QuestDefinition,
  QuestEffect,
  QuestLocationTriggerDef,
  QuestNpcActionDef,
  QuestPrimitiveValue,
  QuestRuntimeState,
  QuestSpotActionDef,
  StoryChoiceDef,
  StorySpeakerSpec,
} from '../types/quest'
import { INITIAL_NPC_FAVOR } from './social/npcFavor'
import { inferTemplatePortrait, resolveAvatarForFullbody } from '../utils/portraitFallback'
import { getSectRankTitle, isSongOfficialForRobbery } from './sect'
import {
  buildNodeNpcFromCompiledId,
  buildNodeNpcFromDynamicActor,
  makeQuestNpc,
} from './npcFactory'
import { SHICHEN_LABELS } from './shared/constants'
import { getSectEntryQuestBlockReason } from './sect/exclusivity'
import { interpolateReignYear } from './world/mapMath'

export { buildNodeNpcFromCompiledId, buildNodeNpcFromDynamicActor, makeQuestNpc }

export interface StoryTextInterpolationContext {
  dayCount: number
  playerGender?: '男' | '女'
  sectId?: string | null
  questState?: Pick<QuestRuntimeState, 'completedQuests' | 'flags'> | null
}

export function interpolateStoryText(
  text: string,
  ctx: StoryTextInterpolationContext,
): string {
  let out = interpolateReignYear(text, ctx.dayCount)
  if (out.includes('{ifQuestDone:')) {
    out = out.replace(
      /\{ifQuestDone:([^|}]+)\|([^|}]*)\|([^}]*)\}/g,
      (_m, questId: string, thenText: string, elseText: string) =>
        ctx.questState?.completedQuests?.[questId.trim()] ? thenText : elseText,
    )
  }
  if (out.includes('{ifFlag:')) {
    out = out.replace(
      /\{ifFlag:([^|}]+)\|([^|}]*)\|([^}]*)\}/g,
      (_m, flagKey: string, thenText: string, elseText: string) =>
        ctx.questState?.flags?.[flagKey.trim()] ? thenText : elseText,
    )
  }
  if (out.includes('{ifFlagEq:')) {
    out = out.replace(
      /\{ifFlagEq:([^=|}]+)=([^|}]*)\|([^|}]*)\|([^}]*)\}/g,
      (_m, flagKey: string, expectedVal: string, thenText: string, elseText: string) => {
        const actual = ctx.questState?.flags?.[flagKey.trim()]
        return actual !== undefined && String(actual) === expectedVal.trim() ? thenText : elseText
      },
    )
  }
  if (out.includes('{ifSect:')) {
    out = out.replace(
      /\{ifSect:([^|}]+)\|([^|}]*)\|([^}]*)\}/g,
      (_m, sectId: string, thenText: string, elseText: string) =>
        ctx.sectId === sectId.trim() ? thenText : elseText,
    )
  }
  if (out.includes('{gender:')) {
    out = out.replace(
      /\{gender:([^|}]*)\|([^}]*)\}/g,
      (_m, maleText: string, femaleText: string) =>
        ctx.playerGender === '女' ? femaleText : maleText,
    )
  }
  return out
}

const TALENT_LABELS: Record<keyof HeroTalents, string> = {
  根骨: '先天根骨',
  悟性: '先天悟性',
  颜值: '风姿颜值',
}

const COMBAT_STAT_LABELS: Record<'maxHp' | 'maxMp' | 'agility' | 'res', string> = {
  maxHp: '气血上限',
  maxMp: '内力上限',
  agility: '实战身法',
  res: '实战抗性',
}

export const DEFAULT_QUEST_RUNTIME_STATE: QuestRuntimeState = {
  activeQuests: {},
  completedQuests: {},
  flags: {},
  dynamicActors: [],
}

const LEGACY_QUEST_ID_ALIASES: Record<string, string> = {
  QST_SECT22_LONGLING: 'QST-SECT-22-LONGLING',
  QST_TIANBO_BAWANG: 'QST-TIANBO-BAWANG',
}

function normalizeQuestId(rawId: string): string {
  return LEGACY_QUEST_ID_ALIASES[rawId] ?? rawId
}

export function cloneQuestRuntimeState(raw?: unknown): QuestRuntimeState {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {
      activeQuests: {},
      completedQuests: {},
      flags: {},
      dynamicActors: [],
    }
  }
  const obj = raw as Partial<QuestRuntimeState>

  const activeQuests: QuestRuntimeState['activeQuests'] = {}
  if (obj.activeQuests && typeof obj.activeQuests === 'object' && !Array.isArray(obj.activeQuests)) {
    for (const [rawQid, prog] of Object.entries(obj.activeQuests)) {
      if (!prog || typeof prog !== 'object') continue
      const qid = normalizeQuestId(rawQid)
      const vars: Record<string, QuestPrimitiveValue> = {}
      if (prog.vars && typeof prog.vars === 'object') {
        for (const [vk, vv] of Object.entries(prog.vars)) {
          if (typeof vv === 'string' || typeof vv === 'number' || typeof vv === 'boolean') {
            vars[vk] = vv
          }
        }
      }
      activeQuests[qid] = {
        questId: normalizeQuestId(typeof prog.questId === 'string' ? prog.questId : qid),
        stepId: typeof prog.stepId === 'string' ? prog.stepId : 'init',
        startedDay: typeof prog.startedDay === 'number' ? Math.max(1, Math.floor(prog.startedDay)) : 1,
        deadlineDay:
          typeof prog.deadlineDay === 'number' ? Math.max(1, Math.floor(prog.deadlineDay)) : null,
        vars,
      }
    }
  }

  const completedQuests: QuestRuntimeState['completedQuests'] = {}
  if (
    obj.completedQuests &&
    typeof obj.completedQuests === 'object' &&
    !Array.isArray(obj.completedQuests)
  ) {
    for (const [rawQid, rec] of Object.entries(obj.completedQuests)) {
      if (!rec || typeof rec !== 'object') continue
      const qid = normalizeQuestId(rawQid)
      completedQuests[qid] = {
        questId: normalizeQuestId(typeof rec.questId === 'string' ? rec.questId : qid),
        outcome: typeof rec.outcome === 'string' ? rec.outcome : 'completed',
        completedDay:
          typeof rec.completedDay === 'number' ? Math.max(1, Math.floor(rec.completedDay)) : 1,
        count: typeof rec.count === 'number' ? Math.max(1, Math.floor(rec.count)) : 1,
      }
    }
  }

  const flags: Record<string, QuestPrimitiveValue> = {}
  if (obj.flags && typeof obj.flags === 'object' && !Array.isArray(obj.flags)) {
    for (const [fk, fv] of Object.entries(obj.flags)) {
      if (typeof fv === 'string' || typeof fv === 'number' || typeof fv === 'boolean') {
        flags[fk] = fv
      }
    }
  }

  const dynamicActors: DynamicQuestNpc[] = Array.isArray(obj.dynamicActors)
    ? obj.dynamicActors
        .filter((a): a is DynamicQuestNpc => Boolean(a && typeof a.actorId === 'string'))
        .map((a) => ({
          ...a,
          stats: { ...a.stats },
          talents: a.talents ? { ...a.talents } : undefined,
          tenArts: a.tenArts ? { ...a.tenArts } : undefined,
          equippedArts: a.equippedArts ? { ...a.equippedArts } : undefined,
          learnedArts: a.learnedArts ? a.learnedArts.map((la) => ({ ...la })) : undefined,
          equipped: a.equipped ? { ...a.equipped } : undefined,
        }))
    : []

  return {
    activeQuests,
    completedQuests,
    flags,
    dynamicActors,
  }
}

export interface QuestEvalContext {
  dayCount: number
  shichenIdx: number
  silver: number
  renown?: number
  chivalry?: number
  food: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  agility: number
  res: number
  ridingSkill?: number
  baseStats: HeroBaseStats
  equipped?: EquippedSlotsMap
  equippedArts?: EquippedArtsMap
  effectiveTalents?: HeroTalents
  skills?: Record<string, number>
  inventory: InventoryStack[]
  learnedArts: LearnedArtEntry[]
  npcFavor: Record<string, number>
  deadNpcIds?: readonly string[]
  playerGender?: '男' | '女'
  sectState: PlayerSectState
  questState: QuestRuntimeState
  targetNpc?: NodeNpc | null
}

function getEffectiveFlagValue(
  flag: string,
  ctx: QuestEvalContext,
): QuestPrimitiveValue | undefined {
  if (flag in ctx.questState.flags) {
    return ctx.questState.flags[flag]
  }
  // Seamless bidirectional fallback for existing sectState flags
  if (flag === 'toumingzhuang_state') return ctx.sectState.toumingzhuangState
  if (flag === 'toumingzhuang_completed') return ctx.sectState.toumingzhuangState === 'completed'
  if (flag === 'song_court_blacklisted') return ctx.sectState.songCourtBlacklisted
  if (flag === 'liao_suspicion_debuff') return ctx.sectState.liaoSuspicionDebuff
  if (flag === 'shaolin_novice_state') return ctx.sectState.shaolinNoviceState
  if (flag === 'shaolin_chore_days') return ctx.sectState.shaolinChoreDays
  if (flag === 'shaolin_disciple_type') return ctx.sectState.shaolinDiscipleType
  if (flag === 'player_gender') return ctx.playerGender ?? '男'
  return undefined
}

export interface EvaluatedStoryChoice {
  choice: StoryChoiceDef
  passed: boolean
  reason: string | null
}

/**
 * 求值剧情幕次末尾的抉择列表，剔除「条件不满足且配置 hideWhenUnavailable」的选项。
 * 弹窗渲染与 store 推进 / 关闭判定共用此函数：若全部选项都被隐藏，则视为无抉择、直接展卷续行，避免页面卡死。
 */
export function getVisibleStoryChoices(
  choices: readonly StoryChoiceDef[] | undefined,
  ctx: QuestEvalContext,
): EvaluatedStoryChoice[] {
  return (choices ?? [])
    .map((choice) => {
      const check = choice.condition
        ? evaluateQuestCondition(choice.condition, ctx)
        : { passed: true, reason: null }
      return { choice, passed: check.passed, reason: check.reason }
    })
    .filter((item) => !(item.choice.hideWhenUnavailable && !item.passed))
}

export function evaluateQuestCondition(
  cond: QuestCondition,
  ctx: QuestEvalContext,
  questMap: Record<string, QuestDefinition> = QUEST_MAP,
): { passed: boolean; reason: string | null } {
  switch (cond.type) {
    case 'all': {
      for (const sub of cond.conditions) {
        const res = evaluateQuestCondition(sub, ctx, questMap)
        if (!res.passed) return res
      }
      return { passed: true, reason: null }
    }

    case 'any': {
      if (cond.conditions.length === 0) return { passed: true, reason: null }
      const reasons: string[] = []
      for (const sub of cond.conditions) {
        const res = evaluateQuestCondition(sub, ctx, questMap)
        if (res.passed) return { passed: true, reason: null }
        if (res.reason) reasons.push(res.reason)
      }
      return {
        passed: false,
        reason: cond.hint ?? (reasons[0] || '尚未满足任一前置条件'),
      }
    }

    case 'not': {
      const res = evaluateQuestCondition(cond.condition, ctx, questMap)
      if (!res.passed) return { passed: true, reason: null }
      return {
        passed: false,
        reason: cond.reason ?? '当前状态不符合触发限制',
      }
    }

    case 'talentAtLeast': {
      const talents =
        ctx.effectiveTalents ??
        (ctx.equipped
          ? getEffectiveTalents(
              ctx.baseStats.talents,
              ctx.equipped,
              ctx.equippedArts,
              ctx.learnedArts,
            )
          : ctx.baseStats.talents)
      const cur = talents[cond.key] ?? 0
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需${TALENT_LABELS[cond.key]} ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'talentAtMost': {
      const talents =
        ctx.effectiveTalents ??
        (ctx.equipped
          ? getEffectiveTalents(
              ctx.baseStats.talents,
              ctx.equipped,
              ctx.equippedArts,
              ctx.learnedArts,
            )
          : ctx.baseStats.talents)
      const cur = talents[cond.key] ?? 0
      if (cur <= cond.max) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需${TALENT_LABELS[cond.key]} ≤ ${cond.max}（当前 ${cur}）`,
      }
    }

    case 'skillAtLeast': {
      const cur =
        cond.key === '骑术'
          ? (ctx.ridingSkill ?? ctx.baseStats.ridingSkill ?? 0)
          : (ctx.skills?.[cond.key] ?? ctx.baseStats.skills[cond.key] ?? 0)
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需十艺【${cond.key}】 ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'skillAtMost': {
      const cur =
        cond.key === '骑术'
          ? (ctx.ridingSkill ?? ctx.baseStats.ridingSkill ?? 0)
          : (ctx.skills?.[cond.key] ?? ctx.baseStats.skills[cond.key] ?? 0)
      if (cur <= cond.max) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需十艺【${cond.key}】 ≤ ${cond.max}（当前 ${cur}）`,
      }
    }

    case 'combatStatAtLeast': {
      const cur = ctx[cond.key]
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需${COMBAT_STAT_LABELS[cond.key]} ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'silverAtLeast': {
      if (ctx.silver >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需纹银 ≥ ${cond.min} 两（当前 ${ctx.silver} 两）`,
      }
    }

    case 'silverAtMost': {
      if (ctx.silver <= cond.max) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需囊中羞涩（纹银 ≤ ${cond.max} 两，当前 ${ctx.silver} 两）`,
      }
    }

    case 'foodAtLeast': {
      if (ctx.food >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需随身干粮 ≥ ${cond.min} 份（当前 ${ctx.food} 份）`,
      }
    }

    case 'renownAtLeast': {
      const cur = ctx.renown ?? 0
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需江湖声望 ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'chivalryAtLeast': {
      const cur = ctx.chivalry ?? 0
      if (cur >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `需江湖侠义 ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'kaifengRank2DaysAtLeast': {
      const baseDay = ctx.sectState.kaifengRank2Day ?? ctx.sectState.joinedDay
      const days = Math.max(0, ctx.dayCount - baseDay)
      if (days >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `须在【捕头都头】任上做满 ${cond.min} 天（当前 ${days}/${cond.min} 天）`,
      }
    }

    case 'sectDaysAtLeast': {
      const sName = FACTION_DB_MAP[cond.sectId]?.name ?? cond.sectId
      if (ctx.sectState.sectId !== cond.sectId) {
        return {
          passed: false,
          reason: `须加入【${sName}】满 ${cond.min} 天`,
        }
      }
      const days = Math.max(0, ctx.dayCount - ctx.sectState.joinedDay)
      if (days >= cond.min) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `须加入【${sName}】满 ${cond.min} 天（当前 ${days}/${cond.min} 天）`,
      }
    }

    case 'questCompletedDaysAgoAtLeast': {
      const rec = ctx.questState.completedQuests[cond.questId]
      const qTitle = questMap[cond.questId]?.title ?? cond.questId
      if (!rec) {
        return {
          passed: false,
          reason: `须先完成前置任务《${qTitle}》`,
        }
      }
      if (cond.outcome && rec.outcome !== cond.outcome) {
        return {
          passed: false,
          reason: `前置任务《${qTitle}》结局不符`,
        }
      }
      const elapsed = Math.max(0, ctx.dayCount - rec.completedDay)
      if (elapsed >= cond.minDays) return { passed: true, reason: null }
      return {
        passed: false,
        reason: `须待《${qTitle}》结案满 ${cond.minDays} 天（当前已历 ${elapsed}/${cond.minDays} 天）`,
      }
    }

    case 'hasItem': {
      const needQty = cond.qty ?? 1
      const haveQty = ctx.inventory.find((x) => x.itemId === cond.itemId)?.qty ?? 0
      if (haveQty >= needQty) return { passed: true, reason: null }
      const itemName = ITEM_DB_MAP[cond.itemId]?.name ?? cond.itemId
      return {
        passed: false,
        reason:
          needQty > 1
            ? `需持有【${itemName}】×${needQty}（当前 ${haveQty}）`
            : `需持有信物《${itemName}》`,
      }
    }

    case 'learnedArtAtLeast': {
      const entry = ctx.learnedArts.find((x) => x.artId === cond.artId)
      const curLv = entry?.level ?? 0
      if (curLv >= cond.minLevel) return { passed: true, reason: null }
      const artName = MARTIAL_ART_DB_MAP[cond.artId]?.cleanName ?? cond.artId
      return {
        passed: false,
        reason: `需习得《${artName}》≥ 第 ${cond.minLevel} 重（当前第 ${curLv} 重）`,
      }
    }

    case 'inSect': {
      if (cond.sectId === null) {
        if (!ctx.sectState.sectId) return { passed: true, reason: null }
        const curName = FACTION_DB_MAP[ctx.sectState.sectId]?.name ?? ctx.sectState.sectId
        return { passed: false, reason: `须为无门无派之身（当前隶属【${curName}】）` }
      }
      const targetName = FACTION_DB_MAP[cond.sectId]?.name ?? cond.sectId
      if (ctx.sectState.sectId !== cond.sectId) {
        return { passed: false, reason: `须隶属【${targetName}】门墙` }
      }
      if (cond.minRank && ctx.sectState.rank < cond.minRank) {
        const reqLabel = getSectRankTitle(cond.sectId, cond.minRank)
        return {
          passed: false,
          reason: `须晋升至【${targetName} · ${reqLabel}】及以上（当前为${ctx.sectState.rankLabel}）`,
        }
      }
      return { passed: true, reason: null }
    }

    case 'notInAnySect': {
      if (!ctx.sectState.sectId) return { passed: true, reason: null }
      if (cond.allowTransferFromSectId && ctx.sectState.sectId === cond.allowTransferFromSectId) {
        return { passed: true, reason: null }
      }
      const curName = FACTION_DB_MAP[ctx.sectState.sectId]?.name ?? ctx.sectState.sectId
      return {
        passed: false,
        reason: `少侠已有师门【${curName}】，须先脱离原门派`,
      }
    }

    case 'neverJoinedAnySect': {
      if (!ctx.sectState.sectId && !ctx.questState.flags.ever_joined_any_sect) {
        return { passed: true, reason: null }
      }
      return {
        passed: false,
        reason: '此派严禁曾投他门之弟子，少侠既曾入过江湖门墙，此生无缘拜入！',
      }
    }

    case 'noLearnedArtAtOrAboveTier': {
      const tierOrder: Record<string, number> = {
        凡品下品: 1,
        凡品中品: 2,
        凡品上品: 3,
        良品下品: 4,
        良品中品: 5,
        良品上品: 6,
        地阶下品: 7,
        地阶中品: 8,
        地阶上品: 9,
        天阶下品: 10,
        天阶中品: 11,
        天阶上品: 12,
      }
      const threshold = tierOrder[cond.tier] ?? 4
      const blockedArt = ctx.learnedArts.find((entry) => {
        const art = MARTIAL_ART_DB_MAP[entry.artId]
        if (!art) return false
        return (tierOrder[art.fullTier] ?? 0) >= threshold
      })
      if (!blockedArt) return { passed: true, reason: null }
      const artName = MARTIAL_ART_DB_MAP[blockedArt.artId]?.name ?? blockedArt.artId
      return {
        passed: false,
        reason: `此派只收未修高深武学之白纸弟子，少侠已修习《${artName}》（${MARTIAL_ART_DB_MAP[blockedArt.artId]?.fullTier ?? cond.tier}），恕难收留！`,
      }
    }

    case 'questStatus': {
      const active = ctx.questState.activeQuests[cond.questId]
      const completed = ctx.questState.completedQuests[cond.questId]
      const qTitle = questMap[cond.questId]?.title ?? cond.questId

      if (cond.status === 'not_started') {
        if (!active && !completed) return { passed: true, reason: null }
        return { passed: false, reason: `《${qTitle}》已开启或已完结` }
      }
      if (cond.status === 'active') {
        if (!active) return { passed: false, reason: `尚未开启任务《${qTitle}》` }
        if (cond.stepId && active.stepId !== cond.stepId) {
          return { passed: false, reason: `未处于《${qTitle}》指定阶段` }
        }
        return { passed: true, reason: null }
      }
      if (cond.status === 'completed') {
        if (!completed) return { passed: false, reason: `需先完成《${qTitle}》` }
        if (cond.outcome && completed.outcome !== cond.outcome) {
          return { passed: false, reason: `《${qTitle}》结局分支不符` }
        }
        return { passed: true, reason: null }
      }
      // not_completed
      if (!completed) return { passed: true, reason: null }
      return { passed: false, reason: `《${qTitle}》已了结` }
    }

    case 'flag': {
      const op = cond.op ?? 'truthy'
      const cur = getEffectiveFlagValue(cond.flag, ctx)
      const label = cond.label ?? cond.flag
      let ok = false
      if (op === 'truthy') ok = Boolean(cur)
      else if (op === 'falsy') ok = !cur
      else if (op === 'eq') ok = cur === cond.value
      else if (op === 'neq') ok = cur !== cond.value
      else if (op === 'gte') ok = Number(cur ?? 0) >= Number(cond.value ?? 0)
      else if (op === 'lte') ok = Number(cur ?? 0) <= Number(cond.value ?? 0)
      return ok
        ? { passed: true, reason: null }
        : { passed: false, reason: `尚未满足机缘条件【${label}】` }
    }

    case 'npcFavorAtLeast': {
      const cur = ctx.npcFavor[cond.npcId] ?? INITIAL_NPC_FAVOR
      if (cur >= cond.min) return { passed: true, reason: null }
      const dynActor = ctx.questState.dynamicActors.find((a) => a.actorId === cond.npcId)
      const npcName = cond.npcName ?? dynActor?.name ?? NPC_DB_MAP[cond.npcId]?.name ?? cond.npcId
      return {
        passed: false,
        reason: `需【${npcName}】好感度 ≥ ${cond.min}（当前 ${cur}）`,
      }
    }

    case 'npcAlive': {
      const isDead =
        Boolean(ctx.deadNpcIds?.includes(cond.npcId)) ||
        (cond.npcId === 'NPC-0122' && Boolean(ctx.sectState.killedDingChunqiu))
      if (!isDead) return { passed: true, reason: null }
      const npcName = cond.npcName ?? NPC_DB_MAP[cond.npcId]?.name ?? cond.npcId
      return {
        passed: false,
        reason: `【${npcName}】已然身故`,
      }
    }

    case 'shichenIn': {
      if (cond.indices.includes(ctx.shichenIdx)) {
        return { passed: true, reason: null }
      }
      const names = cond.indices.map((idx) => SHICHEN_LABELS[((idx % 12) + 12) % 12]).join(' / ')
      const curName = SHICHEN_LABELS[((ctx.shichenIdx % 12) + 12) % 12]
      return {
        passed: false,
        reason: cond.label ?? `须于【${names}】到访（当前为${curName}）`,
      }
    }

    case 'targetNpcMatch': {
      const t = ctx.targetNpc
      if (!t) return { passed: false, reason: '未指定交互人物' }

      const dbNpc = (t.id && NPC_DB_MAP[t.id]) || resolveNpcByName(t.name)
      const resolvedId = t.id ?? dbNpc?.id
      const resolvedFactionId = t.factionId ?? dbNpc?.factionId
      const resolvedSectRank = t.sectRank ?? dbNpc?.sectRank

      // 人物身份匹配：同时配置 npcIds 与 dynamicActorIds 时，命中任一即可（名录人物或剧情专属人物皆可推进）
      const hasDynList = Boolean(cond.dynamicActorIds && cond.dynamicActorIds.length > 0)
      const hasNpcList = Boolean(cond.npcIds && cond.npcIds.length > 0)
      if (hasDynList || hasNpcList) {
        const dynMatch =
          hasDynList &&
          Boolean(t.dynamicQuestActorId) &&
          cond.dynamicActorIds!.includes(t.dynamicQuestActorId!)
        const npcMatch = hasNpcList && Boolean(resolvedId) && cond.npcIds!.includes(resolvedId!)
        if (!dynMatch && !npcMatch) {
          return {
            passed: false,
            reason: hasNpcList ? '非指定目标人物' : '目标剧情人物不符',
          }
        }
      }
      if (cond.factionIds && cond.factionIds.length > 0) {
        if (!resolvedFactionId || !cond.factionIds.includes(resolvedFactionId)) {
          return { passed: false, reason: '非目标门派/组织人物' }
        }
      }
      if (typeof cond.exactSectRank === 'number') {
        if (resolvedSectRank !== cond.exactSectRank) {
          return { passed: false, reason: '目标人物门派职阶不符' }
        }
      }
      if (typeof cond.minSectRank === 'number') {
        if ((resolvedSectRank ?? 0) < cond.minSectRank) {
          return { passed: false, reason: '目标人物门派职阶不足' }
        }
      }
      if (cond.specialGroup === 'song_official_for_robbery') {
        if (!isSongOfficialForRobbery({ id: resolvedId, factionId: resolvedFactionId })) {
          return { passed: false, reason: '目标并非可劫道之大宋朝廷命官' }
        }
      }
      return { passed: true, reason: null }
    }
  }
}

/**
 * 收集某项任务条件中所有未满足的原因列表（用于 UI 悬停提示全部缺口）
 */
export function collectUnmetQuestReasons(
  cond: QuestCondition,
  ctx: QuestEvalContext,
  questMap: Record<string, QuestDefinition> = QUEST_MAP,
): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  const push = (r: string | null) => {
    if (r && !seen.has(r)) {
      seen.add(r)
      out.push(r)
    }
  }

  const walk = (c: QuestCondition): void => {
    if (c.type === 'all') {
      for (const sub of c.conditions) {
        walk(sub)
      }
      return
    }
    if (c.type === 'any') {
      const res = evaluateQuestCondition(c, ctx, questMap)
      if (!res.passed) {
        push(res.reason ?? '尚未满足任一前置条件')
      }
      return
    }
    const res = evaluateQuestCondition(c, ctx, questMap)
    if (!res.passed) {
      push(res.reason ?? '尚未满足前置条件')
    }
  }

  walk(cond)
  return out
}

export interface EvaluatedNpcQuestAction {
  quest: QuestDefinition
  action: QuestNpcActionDef
  enabled: boolean
  disabledReason: string | null
}

export function getAvailableNpcQuestActions(
  npc: NodeNpc,
  ctx: QuestEvalContext,
  quests: readonly QuestDefinition[] = QUEST_REGISTRY,
): EvaluatedNpcQuestAction[] {
  const ctxWithNpc: QuestEvalContext = { ...ctx, targetNpc: npc }
  const out: EvaluatedNpcQuestAction[] = []

  for (const quest of quests) {
    if (!quest.npcActions || quest.npcActions.length === 0) continue
    // 门派排他：已身属别派（或少林杂役期）时，他派入门线不再露出交互选项
    if (getSectEntryQuestBlockReason(quest.id, ctx.sectState, ctx.questState.flags)) continue
    for (const action of quest.npcActions) {
      const vis = evaluateQuestCondition(action.visibleWhen, ctxWithNpc)
      if (!vis.passed) continue

      const en = action.enabledWhen
        ? evaluateQuestCondition(action.enabledWhen, ctxWithNpc)
        : { passed: true, reason: null }
      out.push({
        quest,
        action,
        enabled: en.passed,
        disabledReason: en.reason,
      })
    }
  }
  return out
}

export interface EvaluatedSpotQuestAction {
  quest: QuestDefinition
  action: QuestSpotActionDef
  enabled: boolean
  disabledReason: string | null
}

export function getAvailableSpotQuestActions(
  loc: { regionId: string; buildingId: string; spotId: string | null },
  ctx: QuestEvalContext,
  quests: readonly QuestDefinition[] = QUEST_REGISTRY,
): EvaluatedSpotQuestAction[] {
  const out: EvaluatedSpotQuestAction[] = []

  for (const quest of quests) {
    if (!quest.spotActions || quest.spotActions.length === 0) continue
    for (const action of quest.spotActions) {
      if (action.regionId !== loc.regionId) continue
      if (action.buildingId !== loc.buildingId) continue
      const expectedSpot = action.spotId ?? null
      if (expectedSpot !== loc.spotId) continue

      if (action.visibleWhen) {
        const vis = evaluateQuestCondition(action.visibleWhen, ctx)
        if (!vis.passed) continue
      }
      if (getSectEntryQuestBlockReason(quest.id, ctx.sectState, ctx.questState.flags)) continue

      const en = action.enabledWhen
        ? evaluateQuestCondition(action.enabledWhen, ctx)
        : { passed: true, reason: null }
      out.push({
        quest,
        action,
        enabled: en.passed,
        disabledReason: en.reason,
      })
    }
  }
  return out
}

export interface MatchedLocationTrigger {
  quest: QuestDefinition
  trigger: QuestLocationTriggerDef
}

const MODAL_EFFECT_TYPES: ReadonlySet<QuestEffect['type']> = new Set([
  'openScene',
  'startCombat',
  'triggerGameOver',
])

/** 效果链（含 branch 两支）中是否会弹出剧情场景 / 战斗 / 结局等独占弹窗 */
export function effectsOpenModal(effects: readonly QuestEffect[] | undefined): boolean {
  if (!effects) return false
  return effects.some(
    (e) =>
      MODAL_EFFECT_TYPES.has(e.type) ||
      (e.type === 'branch' && (effectsOpenModal(e.thenEffects) || effectsOpenModal(e.elseEffects))),
  )
}

export function findMatchingLocationTriggers(
  loc: {
    regionId: string
    buildingId?: string | null
    spotId?: string | null
    isPassThrough?: boolean
  },
  ctx: QuestEvalContext,
  quests: readonly QuestDefinition[] = QUEST_REGISTRY,
): MatchedLocationTrigger[] {
  const out: MatchedLocationTrigger[] = []
  const curBldg = loc.buildingId ?? null
  const curSpot = loc.spotId ?? null

  for (const quest of quests) {
    if (!quest.locationTriggers || quest.locationTriggers.length === 0) continue
    for (const trigger of quest.locationTriggers) {
      if (loc.isPassThrough && !trigger.triggerOnPassThrough) continue
      if (trigger.regionId && trigger.regionId !== loc.regionId) continue

      if (trigger.buildingId !== undefined) {
        if (trigger.buildingId !== curBldg) continue
      } else {
        // Region-level trigger (buildingId omitted): only fire when entering region level (curBldg === null)
        if (curBldg !== null) continue
      }

      if (trigger.spotId !== undefined) {
        if (trigger.spotId !== curSpot) continue
      } else if (trigger.buildingId !== undefined && curSpot !== null) {
        // Building-level trigger without spotId: fire when entering building hall, not sub-spots
        continue
      }

      if (trigger.onceFlag && Boolean(getEffectiveFlagValue(trigger.onceFlag, ctx))) {
        continue
      }

      // 门派排他：已身属别派（或少林杂役期）时，他派入门线不再触发
      if (getSectEntryQuestBlockReason(quest.id, ctx.sectState, ctx.questState.flags)) continue

      if (trigger.condition) {
        const res = evaluateQuestCondition(trigger.condition, ctx)
        if (!res.passed) continue
      }

      out.push({ quest, trigger })
    }
  }
  return out
}

export function resolveQuestCombatOpponent(
  spec: QuestCombatOpponentSpec,
  contextNpc: NodeNpc | null,
  dynamicActors: DynamicQuestNpc[],
): NodeNpc | null {
  switch (spec.kind) {
    case 'interactedNpc':
      return contextNpc
    case 'npc':
      return buildNodeNpcFromCompiledId(spec.npcId, spec.talkOverride)
    case 'dynamicActor': {
      const found = dynamicActors.find((a) => a.actorId === spec.actorId)
      return found ? buildNodeNpcFromDynamicActor(found) : null
    }
    case 'custom':
      return spec.npc
  }
}

export interface ResolvedSpeakerPresentation {
  isNarrator: boolean
  isPlayer: boolean
  name: string
  title: string
  factionName?: string
  portraitUrl?: string | null
  avatarUrl?: string | null
}

export function resolveStorySpeaker(
  speaker: StorySpeakerSpec,
  contextNpc: NodeNpc | null,
  playerContext?: {
    playerPortraitId?: string | null
    playerName?: string | null
  },
): ResolvedSpeakerPresentation {
  switch (speaker.kind) {
    case 'narrator':
      return {
        isNarrator: true,
        isPlayer: false,
        name: speaker.label ?? '卷宗旁白',
        title: '皇祐江湖纪事',
      }
    case 'player': {
      const portrait = getProtagonistPortrait(playerContext?.playerPortraitId)
      const trimmedName = playerContext?.playerName?.trim()
      return {
        isNarrator: false,
        isPlayer: true,
        name: trimmedName ? `${trimmedName}（你）` : '少侠（你）',
        title: '江湖行者',
        portraitUrl: portrait.fullbodyUrl,
        avatarUrl: portrait.avatarUrl,
      }
    }
    case 'interactedNpc': {
      if (contextNpc) {
        const db = (contextNpc.id && NPC_DB_MAP[contextNpc.id]) || resolveNpcByName(contextNpc.name)
        const resolvedFaction = contextNpc.factionName ?? db?.factionName
        const resolvedPortrait =
          contextNpc.portraitUrl ??
          db?.fullbodyUrl ??
          db?.templateUrl ??
          inferTemplatePortrait({
            name: contextNpc.name,
            title: contextNpc.title,
            factionName: resolvedFaction,
          })
        return {
          isNarrator: false,
          isPlayer: false,
          name: contextNpc.name,
          title: contextNpc.title,
          factionName: resolvedFaction,
          portraitUrl: resolvedPortrait,
          avatarUrl:
            contextNpc.avatarUrl ??
            db?.avatarUrl ??
            db?.templateAvatarUrl ??
            resolveAvatarForFullbody(resolvedPortrait),
        }
      }
      return {
        isNarrator: false,
        isPlayer: false,
        name: '江湖人物',
        title: '席间客',
        portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
      }
    }
    case 'npc': {
      const db = NPC_DB_MAP[speaker.npcId]
      if (db) {
        const useInferredHeroine =
          !db.fullbodyUrl &&
          (db.name === '穆桂云' || /女将|女帅/.test(db.role ?? ''))
        const resolvedPortrait = useInferredHeroine
          ? inferTemplatePortrait({
              name: db.name,
              title: db.role,
              factionName: db.factionName,
            })
          : (db.fullbodyUrl ?? db.templateUrl)
        return {
          isNarrator: false,
          isPlayer: false,
          name: db.name,
          title: `${db.factionName} · ${db.role}`,
          factionName: db.factionName,
          portraitUrl: resolvedPortrait,
          avatarUrl: useInferredHeroine
            ? resolveAvatarForFullbody(resolvedPortrait)
            : (db.avatarUrl ?? db.templateAvatarUrl),
        }
      }
      return {
        isNarrator: false,
        isPlayer: false,
        name: speaker.npcId,
        title: '未知人物',
      }
    }
    case 'custom': {
      const dbByName = resolveNpcByName(speaker.name)
      const resolvedPortrait =
        speaker.portraitUrl ??
        dbByName?.fullbodyUrl ??
        dbByName?.templateUrl ??
        inferTemplatePortrait({
          name: speaker.name,
          title: speaker.title,
          factionName: speaker.factionName ?? dbByName?.factionName,
        })
      return {
        isNarrator: false,
        isPlayer: false,
        name: speaker.name,
        title: speaker.title ?? '剧情人物',
        factionName: speaker.factionName ?? dbByName?.factionName,
        portraitUrl: resolvedPortrait,
        avatarUrl: speaker.avatarUrl ?? resolveAvatarForFullbody(resolvedPortrait),
      }
    }
  }
}

