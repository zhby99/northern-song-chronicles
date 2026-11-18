import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  REGION_DB_MAP,
  resolveNpcByName,
} from '../data/gameDb'
import { getEffectiveTalents, ITEM_DB_MAP } from '../data/itemsDb'
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
  StorySceneDef,
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
import { getLoadedQuestScenes } from './quest/sceneRegistry'
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
    if (getSectEntryQuestBlockReason(quest.id, ctx.sectState)) continue
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
      if (getSectEntryQuestBlockReason(quest.id, ctx.sectState)) continue

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
      if (getSectEntryQuestBlockReason(quest.id, ctx.sectState)) continue

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

/**
 * 静态任务链全量引用校验器：
 * 确保所有声明式任务链中的地区、建筑、子景点、NPC、门派、物品、武学与步骤跳转 ID 100% 合法无悬空。
 */
export function validateAllRegisteredQuests(
  quests: readonly QuestDefinition[] = QUEST_REGISTRY,
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const byId = new Map<string, QuestDefinition>()

  for (const q of quests) {
    if (byId.has(q.id)) {
      errors.push(`[${q.id}] 任务 ID 重复定义`)
    }
    byId.set(q.id, q)
  }

  const checkLocation = (
    ctxPath: string,
    regionId?: string,
    buildingId?: string | null,
    spotId?: string | null,
  ) => {
    if (regionId && !REGION_DB_MAP[regionId]) {
      errors.push(`${ctxPath}: 未知的 regionId "${regionId}"`)
    }
    if (buildingId) {
      const bldg = BUILDING_DB_MAP[buildingId]
      if (!bldg) {
        errors.push(`${ctxPath}: 未知的 buildingId "${buildingId}"`)
      } else {
        if (regionId && bldg.regionId !== regionId) {
          errors.push(
            `${ctxPath}: buildingId "${buildingId}" 隶属 "${bldg.regionId}"，与声明的 regionId "${regionId}" 不一致`,
          )
        }
        if (spotId) {
          const hasSpot = bldg.interior?.spots.some((s) => s.id === spotId)
          if (!hasSpot) {
            errors.push(`${ctxPath}: 建筑 "${buildingId}" 内不存在子景点 spotId "${spotId}"`)
          }
        }
      }
    } else if (spotId) {
      errors.push(`${ctxPath}: 声明了 spotId "${spotId}" 但未提供所属 buildingId`)
    }
  }

  const checkCondition = (ctxPath: string, cond: QuestCondition) => {
    switch (cond.type) {
      case 'all':
      case 'any':
        cond.conditions.forEach((c, i) => checkCondition(`${ctxPath}.conditions[${i}]`, c))
        break
      case 'not':
        checkCondition(`${ctxPath}.not`, cond.condition)
        break
      case 'hasItem':
        if (!ITEM_DB_MAP[cond.itemId]) {
          errors.push(`${ctxPath}: 未知的 itemId "${cond.itemId}"`)
        }
        break
      case 'inSect':
        if (cond.sectId !== null && !FACTION_DB_MAP[cond.sectId]) {
          errors.push(`${ctxPath}: 未知的 sectId "${cond.sectId}"`)
        }
        break
      case 'sectDaysAtLeast':
        if (!FACTION_DB_MAP[cond.sectId]) {
          errors.push(`${ctxPath}: 未知的 sectId "${cond.sectId}"`)
        }
        break
      case 'notInAnySect':
        if (cond.allowTransferFromSectId && !FACTION_DB_MAP[cond.allowTransferFromSectId]) {
          errors.push(
            `${ctxPath}: 未知的 allowTransferFromSectId "${cond.allowTransferFromSectId}"`,
          )
        }
        break
      case 'neverJoinedAnySect':
      case 'noLearnedArtAtOrAboveTier':
        break
      case 'questCompletedDaysAgoAtLeast': {
        if (!byId.has(cond.questId)) {
          errors.push(`${ctxPath}: 引用了未注册的 questId "${cond.questId}"`)
        }
        break
      }
      case 'questStatus': {
        const refQ = byId.get(cond.questId)
        if (!refQ) {
          errors.push(`${ctxPath}: 引用了未注册的 questId "${cond.questId}"`)
        } else if (cond.stepId && !refQ.steps[cond.stepId]) {
          errors.push(`${ctxPath}: 任务 "${cond.questId}" 中不存在 stepId "${cond.stepId}"`)
        }
        break
      }
      case 'npcFavorAtLeast':
      case 'npcAlive':
        if (!NPC_DB_MAP[cond.npcId] && !cond.npcId.startsWith('ACT-')) {
          errors.push(`${ctxPath}: 未知的 npcId "${cond.npcId}"`)
        }
        break
      case 'targetNpcMatch':
        cond.npcIds?.forEach((nid) => {
          if (!NPC_DB_MAP[nid]) errors.push(`${ctxPath}: 未知的 target npcId "${nid}"`)
        })
        cond.factionIds?.forEach((fid) => {
          if (!FACTION_DB_MAP[fid]) errors.push(`${ctxPath}: 未知的 target factionId "${fid}"`)
        })
        break
      default:
        break
    }
  }

  const validatedSceneSet = new Set<string>()

  const checkScene = (sceneCtxPath: string, scene: import('../types/quest').StorySceneDef, ownerQuestId: string) => {
    const dedupeKey = `${ownerQuestId}::${scene.id}`
    if (validatedSceneSet.has(dedupeKey)) return
    validatedSceneSet.add(dedupeKey)

    if (scene.beats.length === 0) {
      errors.push(`${sceneCtxPath}.scene(${scene.id}): beats 不能为空`)
    }
    scene.beats.forEach((b, bi) => {
      if (b.speaker.kind === 'npc' && !NPC_DB_MAP[b.speaker.npcId]) {
        errors.push(
          `${sceneCtxPath}.scene(${scene.id}).beats[${bi}]: 未知的发言人 npcId "${b.speaker.npcId}"`,
        )
      }
    })
    scene.choices?.forEach((ch, ci) => {
      if (ch.condition) {
        checkCondition(`${sceneCtxPath}.scene(${scene.id}).choices[${ci}].condition`, ch.condition)
      }
      ch.effects.forEach((ce, cei) =>
        checkEffect(`${sceneCtxPath}.scene(${scene.id}).choices[${ci}].effects[${cei}]`, ce, ownerQuestId),
      )
    })
    scene.onFinishEffects?.forEach((fe, fei) =>
      checkEffect(`${sceneCtxPath}.scene(${scene.id}).onFinish[${fei}]`, fe, ownerQuestId),
    )
  }

  const resolveQuestScenesForValidation = (qid: string) => {
    const q = byId.get(qid)
    return getLoadedQuestScenes(qid) ?? q?.scenes
  }

  const checkEffect = (ctxPath: string, eff: QuestEffect, ownerQuestId: string) => {
    switch (eff.type) {
      case 'openScene': {
        if ('scene' in eff) {
          checkScene(ctxPath, eff.scene, ownerQuestId)
        } else {
          const targetQid = eff.questId ?? ownerQuestId
          const refQ = byId.get(targetQid)
          if (!refQ) {
            errors.push(`${ctxPath}: openScene 引用了未知的 questId "${targetQid}"`)
          } else {
            const scenes = resolveQuestScenesForValidation(targetQid)
            if (scenes) {
              const targetScene = scenes[eff.sceneId]
              if (!targetScene) {
                errors.push(
                  `${ctxPath}: 任务 "${targetQid}" 的 scenes 中不存在 sceneId "${eff.sceneId}"`,
                )
              } else {
                checkScene(ctxPath, targetScene, targetQid)
              }
            }
          }
        }
        break
      }
      case 'startQuest': {
        const refQ = byId.get(eff.questId)
        if (!refQ) {
          errors.push(`${ctxPath}: startQuest 引用了未知的 questId "${eff.questId}"`)
        } else if (eff.stepId && !refQ.steps[eff.stepId]) {
          errors.push(`${ctxPath}: 任务 "${eff.questId}" 中不存在起始 stepId "${eff.stepId}"`)
        }
        break
      }
      case 'setQuestStep': {
        const refQ = byId.get(eff.questId)
        if (!refQ) {
          errors.push(`${ctxPath}: setQuestStep 引用了未知的 questId "${eff.questId}"`)
        } else if (!refQ.steps[eff.stepId]) {
          errors.push(`${ctxPath}: 任务 "${eff.questId}" 中不存在目标 stepId "${eff.stepId}"`)
        }
        break
      }
      case 'completeQuest':
      case 'abandonQuest':
        if (!byId.has(eff.questId)) {
          errors.push(`${ctxPath}: 引用了未知的 questId "${eff.questId}"`)
        }
        break
      case 'giveItem':
      case 'removeItem':
        if (!ITEM_DB_MAP[eff.itemId]) {
          errors.push(`${ctxPath}: 未知的 itemId "${eff.itemId}"`)
        }
        break
      case 'teachMartialArt':
        if (!MARTIAL_ART_DB_MAP[eff.artId]) {
          errors.push(`${ctxPath}: 未知的武学 artId "${eff.artId}"`)
        }
        break
      case 'joinSect':
      case 'confirmJoinSect':
      case 'setSectRank':
        if (!FACTION_DB_MAP[eff.sectId]) {
          errors.push(`${ctxPath}: 未知的 sectId "${eff.sectId}"`)
        }
        break
      case 'modifyNpcFavor':
        if (
          eff.target.kind === 'npc' &&
          !NPC_DB_MAP[eff.target.npcId] &&
          !eff.target.npcId.startsWith('ACT-')
        ) {
          errors.push(`${ctxPath}: 未知的 npcId "${eff.target.npcId}"`)
        }
        break
      case 'markNpcsDead':
        eff.npcIds.forEach((nid) => {
          if (!NPC_DB_MAP[nid] && !nid.startsWith('ACT-')) {
            errors.push(`${ctxPath}.markNpcsDead: 未知的 npcId "${nid}"`)
          }
        })
        break
      case 'spawnDynamicActor':
        checkLocation(
          `${ctxPath}.spawnDynamicActor(${eff.actor.actorId})`,
          eff.actor.regionId,
          eff.actor.buildingId,
          eff.actor.spotId,
        )
        if (eff.actor.factionId && !FACTION_DB_MAP[eff.actor.factionId]) {
          errors.push(
            `${ctxPath}.spawnDynamicActor(${eff.actor.actorId}): 未知的 factionId "${eff.actor.factionId}"`,
          )
        }
        eff.actor.learnedArts?.forEach((la) => {
          if (!MARTIAL_ART_DB_MAP[la.artId]) {
            errors.push(
              `${ctxPath}.spawnDynamicActor(${eff.actor.actorId}): 未知的武学 artId "${la.artId}"`,
            )
          }
        })
        break
      case 'teleportPlayer':
        checkLocation(
          `${ctxPath}.teleportPlayer`,
          eff.regionId,
          eff.buildingId ?? undefined,
          eff.spotId ?? undefined,
        )
        break
      case 'startCombat':
        if (eff.questId && !byId.has(eff.questId)) {
          errors.push(`${ctxPath}.startCombat: 未知的 questId "${eff.questId}"`)
        }
        if (eff.opponent.kind === 'npc' && !NPC_DB_MAP[eff.opponent.npcId]) {
          errors.push(`${ctxPath}.startCombat: 未知的对手 npcId "${eff.opponent.npcId}"`)
        }
        eff.extraOpponents?.forEach((eo, eoi) => {
          if (eo.kind === 'npc' && !NPC_DB_MAP[eo.npcId]) {
            errors.push(`${ctxPath}.startCombat.extraOpponents[${eoi}]: 未知的对手 npcId "${eo.npcId}"`)
          }
        })
        eff.allies?.forEach((al, ali) => {
          if (al.kind === 'npc' && !NPC_DB_MAP[al.npcId]) {
            errors.push(`${ctxPath}.startCombat.allies[${ali}]: 未知的助战同伴 npcId "${al.npcId}"`)
          }
        })
        eff.onWin.forEach((we, wi) => checkEffect(`${ctxPath}.startCombat.onWin[${wi}]`, we, ownerQuestId))
        eff.onLose?.forEach((le, li) => checkEffect(`${ctxPath}.startCombat.onLose[${li}]`, le, ownerQuestId))
        eff.onEscape?.forEach((ee, ei) =>
          checkEffect(`${ctxPath}.startCombat.onEscape[${ei}]`, ee, ownerQuestId),
        )
        eff.onDraw?.forEach((de, di) => checkEffect(`${ctxPath}.startCombat.onDraw[${di}]`, de, ownerQuestId))
        break
      case 'branch':
        checkCondition(`${ctxPath}.branch.condition`, eff.condition)
        eff.thenEffects.forEach((te, ti) =>
          checkEffect(`${ctxPath}.branch.then[${ti}]`, te, ownerQuestId),
        )
        eff.elseEffects?.forEach((ee, ei) =>
          checkEffect(`${ctxPath}.branch.else[${ei}]`, ee, ownerQuestId),
        )
        break
      default: {
        const rawType = (eff as { type?: string }).type
        if (rawType === 'modifyTalent' || rawType === 'modifyBaseStat') {
          errors.push(
            `${ctxPath}: 严禁在任务中使用 "${rawType}" 增加先天禀赋或实战交锋属性`,
          )
        }
        break
      }
    }
  }

  for (const q of quests) {
    const qPrefix = `[${q.id}]`
    if (q.factionId && !FACTION_DB_MAP[q.factionId]) {
      errors.push(`${qPrefix}: 未知的 factionId "${q.factionId}"`)
    }
    if (q.regionId && !REGION_DB_MAP[q.regionId]) {
      errors.push(`${qPrefix}: 未知的 regionId "${q.regionId}"`)
    }
    if (!q.steps[q.initialStepId]) {
      errors.push(`${qPrefix}: initialStepId "${q.initialStepId}" 未在 steps 中定义`)
    }
    for (const [stepKey, step] of Object.entries(q.steps)) {
      if (step.id !== stepKey) {
        errors.push(`${qPrefix}.steps.${stepKey}: step.id "${step.id}" 与键名不一致`)
      }
      if (step.targetLocation) {
        checkLocation(
          `${qPrefix}.steps.${stepKey}.targetLocation`,
          step.targetLocation.regionId,
          step.targetLocation.buildingId,
          step.targetLocation.spotId,
        )
      }
    }

    const loadedScenes = resolveQuestScenesForValidation(q.id)
    if (loadedScenes) {
      for (const [sceneKey, scene] of Object.entries(loadedScenes)) {
        if (scene.id !== sceneKey) {
          errors.push(`${qPrefix}.scenes.${sceneKey}: scene.id "${scene.id}" 与键名不一致`)
        }
        checkScene(`${qPrefix}.scenes.${sceneKey}`, scene, q.id)
      }
    }

    q.locationTriggers?.forEach((lt) => {
      const ltPath = `${qPrefix}.locationTriggers(${lt.id})`
      checkLocation(ltPath, lt.regionId, lt.buildingId ?? undefined, lt.spotId ?? undefined)
      if (lt.condition) checkCondition(`${ltPath}.condition`, lt.condition)
      lt.effects.forEach((e, i) => checkEffect(`${ltPath}.effects[${i}]`, e, q.id))
    })

    q.npcActions?.forEach((na) => {
      const naPath = `${qPrefix}.npcActions(${na.id})`
      checkCondition(`${naPath}.visibleWhen`, na.visibleWhen)
      if (na.enabledWhen) checkCondition(`${naPath}.enabledWhen`, na.enabledWhen)
      na.effects.forEach((e, i) => checkEffect(`${naPath}.effects[${i}]`, e, q.id))
    })

    q.spotActions?.forEach((sa) => {
      const saPath = `${qPrefix}.spotActions(${sa.id})`
      checkLocation(saPath, sa.regionId, sa.buildingId, sa.spotId ?? undefined)
      const bldg = BUILDING_DB_MAP[sa.buildingId]
      if (bldg?.interior && bldg.interior.spots.length > 0 && !sa.spotId) {
        errors.push(
          `${saPath}: 建筑 "${sa.buildingId}" (${bldg.name}) 包含 ${bldg.interior.spots.length} 个子景点，必须明确指定 spotId（否则玩家在游戏内无法触发该行动）`,
        )
      }
      if (sa.visibleWhen) checkCondition(`${saPath}.visibleWhen`, sa.visibleWhen)
      if (sa.enabledWhen) checkCondition(`${saPath}.enabledWhen`, sa.enabledWhen)
      sa.effects.forEach((e, i) => checkEffect(`${saPath}.effects[${i}]`, e, q.id))
    })

    if (q.onDeadlineExpired) {
      if (q.onDeadlineExpired.stepId && !q.steps[q.onDeadlineExpired.stepId]) {
        errors.push(
          `${qPrefix}.onDeadlineExpired: 不存在的 stepId "${q.onDeadlineExpired.stepId}"`,
        )
      }
      q.onDeadlineExpired.effects.forEach((e, i) =>
        checkEffect(`${qPrefix}.onDeadlineExpired.effects[${i}]`, e, q.id),
      )
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export const MAX_QUEST_TEN_ARTS_GAIN = 3

type ProgState = '__not_started__' | `step:${string}` | '__completed__'

function getPermanentItemTenArtsGain(itemId: string, qty: number): number {
  if (qty <= 0) return 0
  const item = ITEM_DB_MAP[itemId]
  const u = item?.useEffect
  if (!u) return 0
  let perItem = 0
  if (typeof u.riding === 'number' && u.riding > 0) perItem += u.riding
  if (u.skillGain && u.skillGain[1] > 0) perItem += u.skillGain[1]
  if (u.skillsGain) {
    for (const val of Object.values(u.skillsGain)) {
      if (typeof val === 'number' && val > 0) perItem += val
    }
  }
  if (perItem <= 0) return 0
  return perItem * (u.onceOnly ? 1 : qty)
}

function extractOnceKey(
  onceFlag: string | undefined,
  ...conditions: Array<QuestCondition | undefined>
): string | null {
  if (onceFlag) return `once:${onceFlag}`
  const conjuncts: QuestCondition[] = []
  const collectConjuncts = (cond?: QuestCondition) => {
    if (!cond) return
    if (cond.type === 'all') {
      for (const sub of cond.conditions) collectConjuncts(sub)
    } else {
      conjuncts.push(cond)
    }
  }
  for (const cond of conditions) collectConjuncts(cond)

  for (const atom of conjuncts) {
    if (
      atom.type === 'flag' &&
      (atom.op === 'falsy' || ((atom.op === 'eq' || atom.op === 'lte') && !atom.value))
    ) {
      return `once:${atom.flag}`
    }
    if (
      atom.type === 'not' &&
      atom.condition.type === 'flag' &&
      (atom.condition.op === 'truthy' ||
        atom.condition.op === undefined ||
        (atom.condition.op === 'eq' && Boolean(atom.condition.value)))
    ) {
      return `once:${atom.condition.flag}`
    }
  }
  return null
}

/**
 * 基于任务进度状态机与一次性标记（onceFlag）图搜索，计算单条任务任意单一通关路径可获得的累计永久十艺点数上限。
 */
export function computeQuestMaxTenArtsGain(
  quest: QuestDefinition,
  loadedScenes?: Record<string, StorySceneDef>,
): number {
  const scenes = loadedScenes ?? getLoadedQuestScenes(quest.id) ?? quest.scenes ?? {}
  const allStepStates = Object.keys(quest.steps).map((s): ProgState => `step:${s}`)
  const allStates: ProgState[] = ['__not_started__', ...allStepStates, '__completed__']

  const extractAllowedProgStates = (cond?: QuestCondition): Set<ProgState> => {
    if (!cond) return new Set<ProgState>(allStates)
    switch (cond.type) {
      case 'all': {
        let acc = new Set<ProgState>(allStates)
        for (const sub of cond.conditions) {
          const next = extractAllowedProgStates(sub)
          acc = new Set([...acc].filter((s) => next.has(s)))
        }
        return acc
      }
      case 'any': {
        const acc = new Set<ProgState>()
        for (const sub of cond.conditions) {
          for (const s of extractAllowedProgStates(sub)) acc.add(s)
        }
        return acc
      }
      case 'not': {
        if (cond.condition.type === 'questStatus' && cond.condition.questId === quest.id) {
          if (cond.condition.status === 'completed') {
            return new Set<ProgState>(allStates.filter((s) => s !== '__completed__'))
          }
          if (cond.condition.status === 'not_started') {
            return new Set<ProgState>(allStates.filter((s) => s !== '__not_started__'))
          }
          if (cond.condition.status === 'active') {
            if (cond.condition.stepId) {
              const excluded: ProgState = `step:${cond.condition.stepId}`
              return new Set<ProgState>(allStates.filter((s) => s !== excluded))
            }
            return new Set<ProgState>(['__not_started__', '__completed__'])
          }
        }
        return new Set<ProgState>(allStates)
      }
      case 'questStatus': {
        if (cond.questId !== quest.id) return new Set<ProgState>(allStates)
        if (cond.status === 'not_started') return new Set<ProgState>(['__not_started__'])
        if (cond.status === 'completed') return new Set<ProgState>(['__completed__'])
        if (cond.status === 'not_completed') {
          return new Set<ProgState>(allStates.filter((s) => s !== '__completed__'))
        }
        if (cond.status === 'active') {
          return cond.stepId
            ? new Set<ProgState>([`step:${cond.stepId}`])
            : new Set<ProgState>(allStepStates)
        }
        return new Set<ProgState>(allStates)
      }
      default:
        return new Set<ProgState>(allStates)
    }
  }

  const intersectAllowed = (...conditions: Array<QuestCondition | undefined>): Set<ProgState> => {
    let acc = new Set<ProgState>(allStates)
    for (const cond of conditions) {
      if (!cond) continue
      const allowed = extractAllowedProgStates(cond)
      acc = new Set([...acc].filter((s) => allowed.has(s)))
    }
    return acc
  }

  const mergeOutcomes = (
    dst: Map<ProgState, number>,
    src: Map<ProgState, number>,
    offset = 0,
  ) => {
    for (const [st, g] of src) {
      const candidate = offset + g
      const prev = dst.get(st)
      if (prev === undefined || candidate > prev) {
        dst.set(st, candidate)
      }
    }
  }

  const sceneMemo = new Map<string, Map<ProgState, number>>()

  const evalEffects = (
    effects: readonly QuestEffect[],
    initialState: ProgState,
    visiting: Set<string>,
  ): { outcomes: Map<ProgState, number>; hitCycle: boolean } => {
    let cur = new Map<ProgState, number>([[initialState, 0]])
    let hitCycle = false

    for (const eff of effects) {
      switch (eff.type) {
        case 'modifySkill': {
          if (eff.delta > 0) {
            for (const [st, g] of cur) cur.set(st, g + eff.delta)
          }
          break
        }
        case 'giveItem': {
          const itemGain = getPermanentItemTenArtsGain(eff.itemId, eff.qty ?? 1)
          if (itemGain > 0) {
            for (const [st, g] of cur) cur.set(st, g + itemGain)
          }
          break
        }
        case 'startQuest': {
          if (eff.questId === quest.id) {
            const targetState: ProgState = `step:${eff.stepId ?? quest.initialStepId}`
            cur = new Map([[targetState, Math.max(...cur.values())]])
          }
          break
        }
        case 'setQuestStep': {
          if (eff.questId === quest.id) {
            const targetState: ProgState = `step:${eff.stepId}`
            cur = new Map([[targetState, Math.max(...cur.values())]])
          }
          break
        }
        case 'completeQuest':
        case 'abandonQuest': {
          if (eff.questId === quest.id) {
            cur = new Map([['__completed__', Math.max(...cur.values())]])
          }
          break
        }
        case 'branch': {
          const nextCur = new Map<ProgState, number>()
          for (const [st, baseG] of cur) {
            const thenRes = evalEffects(eff.thenEffects, st, visiting)
            mergeOutcomes(nextCur, thenRes.outcomes, baseG)
            const elseRes = evalEffects(eff.elseEffects ?? [], st, visiting)
            mergeOutcomes(nextCur, elseRes.outcomes, baseG)
            hitCycle ||= thenRes.hitCycle || elseRes.hitCycle
          }
          cur = nextCur
          break
        }
        case 'startCombat': {
          const nextCur = new Map<ProgState, number>()
          const branches: Array<readonly QuestEffect[]> = [eff.onWin]
          if (eff.onLose || (!eff.lethalOnLose && eff.rule !== 'duel')) {
            branches.push(eff.onLose ?? [])
          }
          if (eff.onEscape || !eff.forbidEscapeReason) {
            branches.push(eff.onEscape ?? [])
          }
          if (eff.onDraw) {
            branches.push(eff.onDraw)
          }
          for (const [st, baseG] of cur) {
            for (const branchEffects of branches) {
              const res = evalEffects(branchEffects, st, visiting)
              mergeOutcomes(nextCur, res.outcomes, baseG)
              hitCycle ||= res.hitCycle
            }
          }
          cur = nextCur
          break
        }
        case 'openScene': {
          const nextCur = new Map<ProgState, number>()
          for (const [st, baseG] of cur) {
            if ('scene' in eff) {
              const res = evalScene(eff.scene, st, visiting, false)
              mergeOutcomes(nextCur, res.outcomes, baseG)
              hitCycle ||= res.hitCycle
            } else if (!eff.questId || eff.questId === quest.id) {
              const target = scenes[eff.sceneId]
              if (target) {
                const res = evalScene(target, st, visiting, true)
                mergeOutcomes(nextCur, res.outcomes, baseG)
                hitCycle ||= res.hitCycle
              } else {
                mergeOutcomes(nextCur, new Map([[st, 0]]), baseG)
              }
            } else {
              mergeOutcomes(nextCur, new Map([[st, 0]]), baseG)
            }
          }
          cur = nextCur
          break
        }
        default:
          break
      }
    }

    return { outcomes: cur, hitCycle }
  }

  const evalScene = (
    scene: StorySceneDef,
    inState: ProgState,
    visiting: Set<string>,
    cacheable: boolean,
  ): { outcomes: Map<ProgState, number>; hitCycle: boolean } => {
    const memoKey = `${scene.id}@@${inState}`
    if (cacheable && sceneMemo.has(memoKey)) {
      return { outcomes: sceneMemo.get(memoKey)!, hitCycle: false }
    }
    if (visiting.has(scene.id)) {
      return { outcomes: new Map([[inState, 0]]), hitCycle: true }
    }
    visiting.add(scene.id)

    const outcomes = new Map<ProgState, number>()
    let hitCycle = false
    const choices = scene.choices ?? []
    for (const choice of choices) {
      const res = evalEffects(choice.effects, inState, visiting)
      mergeOutcomes(outcomes, res.outcomes)
      hitCycle ||= res.hitCycle
    }

    if (choices.length === 0 || choices.some((c) => c.hideWhenUnavailable)) {
      const finishRes = evalEffects(scene.onFinishEffects ?? [], inState, visiting)
      mergeOutcomes(outcomes, finishRes.outcomes)
      hitCycle ||= finishRes.hitCycle
    }

    visiting.delete(scene.id)
    if (cacheable && !hitCycle) {
      sceneMemo.set(memoKey, outcomes)
    }
    return { outcomes, hitCycle }
  }

  interface EntryTransition {
    allowedStates: Set<ProgState>
    onceKey: string | null
    outcomesByState: Map<ProgState, Map<ProgState, number>>
  }

  const entries: EntryTransition[] = []
  const rawEntries: Array<{
    allowedStates: Set<ProgState>
    onceKey: string | null
    effects: readonly QuestEffect[]
  }> = []

  for (const lt of quest.locationTriggers ?? []) {
    rawEntries.push({
      allowedStates: intersectAllowed(lt.condition),
      onceKey: extractOnceKey(lt.onceFlag, lt.condition),
      effects: lt.effects,
    })
  }
  for (const na of quest.npcActions ?? []) {
    rawEntries.push({
      allowedStates: intersectAllowed(na.visibleWhen, na.enabledWhen),
      onceKey: extractOnceKey(undefined, na.visibleWhen, na.enabledWhen),
      effects: na.effects,
    })
  }
  for (const sa of quest.spotActions ?? []) {
    rawEntries.push({
      allowedStates: intersectAllowed(sa.visibleWhen, sa.enabledWhen),
      onceKey: extractOnceKey(undefined, sa.visibleWhen, sa.enabledWhen),
      effects: sa.effects,
    })
  }
  if (quest.onDeadlineExpired) {
    rawEntries.push({
      allowedStates: quest.onDeadlineExpired.stepId
        ? new Set<ProgState>([`step:${quest.onDeadlineExpired.stepId}`])
        : new Set<ProgState>(allStepStates),
      onceKey: 'once:__deadline__',
      effects: quest.onDeadlineExpired.effects,
    })
  }

  const gainOnceKeys = new Set<string>()
  for (const raw of rawEntries) {
    const outcomesByState = new Map<ProgState, Map<ProgState, number>>()
    let entryMaxGain = 0
    for (const st of raw.allowedStates) {
      const { outcomes } = evalEffects(raw.effects, st, new Set())
      if (raw.onceKey === null && (outcomes.get(st) ?? 0) > 0) {
        return Number.POSITIVE_INFINITY
      }
      for (const g of outcomes.values()) {
        if (g > entryMaxGain) entryMaxGain = g
      }
      outcomesByState.set(st, outcomes)
    }
    if (raw.onceKey && entryMaxGain > 0) {
      gainOnceKeys.add(raw.onceKey)
    }
    entries.push({
      allowedStates: raw.allowedStates,
      onceKey: raw.onceKey,
      outcomesByState,
    })
  }

  const startState: ProgState = entries.some((e) => e.allowedStates.has('__not_started__'))
    ? '__not_started__'
    : `step:${quest.initialStepId}`

  const dpMemo = new Map<string, number>()

  const search = (
    st: ProgState,
    usedOnce: Set<string>,
    cumGain: number,
    pathGains: Map<string, number>,
  ): { bestRemaining: number; hitCycle: boolean } => {
    const canonKey = `${st}|${[...usedOnce].sort().join(',')}`
    const cached = dpMemo.get(canonKey)
    if (cached !== undefined) {
      return { bestRemaining: cached, hitCycle: false }
    }
    const prevPathGain = pathGains.get(canonKey)
    if (prevPathGain !== undefined) {
      if (cumGain > prevPathGain) {
        return { bestRemaining: Number.POSITIVE_INFINITY, hitCycle: true }
      }
      return { bestRemaining: 0, hitCycle: true }
    }

    pathGains.set(canonKey, cumGain)
    let best = 0
    let hitCycle = false

    for (const entry of entries) {
      if (!entry.allowedStates.has(st)) continue
      if (entry.onceKey && usedOnce.has(entry.onceKey)) continue
      const outcomes = entry.outcomesByState.get(st)
      if (!outcomes) continue

      const nextUsed =
        entry.onceKey && gainOnceKeys.has(entry.onceKey)
          ? new Set([...usedOnce, entry.onceKey])
          : usedOnce

      for (const [nextSt, edgeGain] of outcomes) {
        if (nextSt === st && edgeGain <= 0) continue
        const sub = search(nextSt, nextUsed, cumGain + edgeGain, pathGains)
        hitCycle ||= sub.hitCycle
        const candidate = edgeGain + sub.bestRemaining
        if (candidate > best) best = candidate
      }
    }

    pathGains.delete(canonKey)
    if (!hitCycle) {
      dpMemo.set(canonKey, best)
    }
    return { bestRemaining: best, hitCycle }
  }

  return search(startState, new Set(), 0, new Map()).bestRemaining
}
