import type { QuestCondition, QuestDefinition } from '../../types/quest'
import {
  collectUnmetQuestReasons,
  evaluateQuestCondition,
  type QuestEvalContext,
} from '../questEngine'

/** 门派主线任务 ID：QST-SECT-<两位门派号>-<序号>（排除入门 ENTRY 与支线 SIDE） */
const MAIN_LINE_ID_RE = /^QST-SECT-(\d{2})-(\d+)$/

export function getSectMainLineOrder(questId: string): number | null {
  const m = MAIN_LINE_ID_RE.exec(questId)
  return m ? Number(m[2]) : null
}

/**
 * 「硬性不满足」：前置任务未完成、剧情分支旗标不符、关键 NPC 已死等，无法靠修炼/等待补齐。
 * 只要有一项硬性不满足，这条主线就还不是玩家眼下该去推进的「下一站」。
 */
function hasHardBlock(
  cond: QuestCondition,
  ctx: QuestEvalContext,
  questMap: Record<string, QuestDefinition>,
): boolean {
  switch (cond.type) {
    case 'all':
      return cond.conditions.some((c) => hasHardBlock(c, ctx, questMap))
    case 'any':
      return cond.conditions.length > 0 && cond.conditions.every((c) => hasHardBlock(c, ctx, questMap))
    case 'not':
    case 'questStatus':
    case 'flag':
    case 'npcAlive':
    case 'notInAnySect':
    case 'neverJoinedAnySect':
      return !evaluateQuestCondition(cond, ctx, questMap).passed
    case 'inSect':
      // 门派不符为硬性；仅职阶不足视为可通过晋升补齐
      return ctx.sectState.sectId !== cond.sectId
    case 'questCompletedDaysAgoAtLeast': {
      // 前置任务尚未了结（或结局不符）为硬性；已了结只差日数则可等待
      const rec = ctx.questState.completedQuests[cond.questId]
      return !rec || Boolean(cond.outcome && rec.outcome !== cond.outcome)
    }
    default:
      return false
  }
}

export interface SuggestedSectMainQuest {
  quest: QuestDefinition
  /** 开启条件已全部满足，可直接前往开启 */
  available: boolean
  /** 未满足的条件说明（available 时为空） */
  unmetReasons: string[]
}

/**
 * 为当前所属门派推荐「下一个门派主线任务」：
 * 1. 已满足开启条件、序号最小的未开启主线；
 * 2. 否则取前置剧情已齐、只差修为/十艺/日数/职阶等可补齐条件、序号最小的那一条，并附上缺口说明。
 * 当前已有进行中的本门主线时不再推荐（追踪面板已显示它）。
 */
export function getSuggestedSectMainQuest(
  ctx: QuestEvalContext,
  quests: readonly QuestDefinition[],
  questMap: Record<string, QuestDefinition>,
): SuggestedSectMainQuest | null {
  const sectId = ctx.sectState.sectId
  if (!sectId) return null

  const mainLine = quests
    .filter((q) => q.factionId === sectId && getSectMainLineOrder(q.id) !== null)
    .sort((a, b) => (getSectMainLineOrder(a.id) ?? 0) - (getSectMainLineOrder(b.id) ?? 0))

  const hasActiveMain = mainLine.some((q) => ctx.questState.activeQuests[q.id])
  if (hasActiveMain) return null

  const notStarted = mainLine.filter(
    (q) =>
      !ctx.questState.activeQuests[q.id] &&
      !ctx.questState.completedQuests[q.id],
  )

  let fallback: SuggestedSectMainQuest | null = null
  for (const quest of notStarted) {
    const cond = quest.startCondition
    if (!cond) return { quest, available: true, unmetReasons: [] }
    if (evaluateQuestCondition(cond, ctx, questMap).passed) {
      return { quest, available: true, unmetReasons: [] }
    }
    if (!fallback && !hasHardBlock(cond, ctx, questMap)) {
      fallback = { quest, available: false, unmetReasons: collectUnmetQuestReasons(cond, ctx, questMap) }
    }
  }
  return fallback
}

/**
 * 「永久关闭」：因路线抉择、结局分支或关键 NPC 身故，此生再也无法开启的任务。
 * 只认不可逆的条件；修为、十艺、日数、银钱等可慢慢补齐的缺口一律不算。
 */
function isConditionPermanentlyClosed(
  cond: QuestCondition,
  ctx: QuestEvalContext,
  questMap: Record<string, QuestDefinition>,
  visiting: Set<string>,
): boolean {
  switch (cond.type) {
    case 'all':
      return cond.conditions.some((c) => isConditionPermanentlyClosed(c, ctx, questMap, visiting))
    case 'any':
      return (
        cond.conditions.length > 0 &&
        cond.conditions.every((c) => isConditionPermanentlyClosed(c, ctx, questMap, visiting))
      )
    case 'not': {
      const inner = cond.condition
      // not(某任务已完成/已开启)：该任务一旦完结即永久关闭
      if (inner.type === 'questStatus' && (inner.status === 'completed' || inner.status === 'active')) {
        return Boolean(ctx.questState.completedQuests[inner.questId]) && !inner.outcome
      }
      return false
    }
    case 'questStatus': {
      const active = ctx.questState.activeQuests[cond.questId]
      const completed = ctx.questState.completedQuests[cond.questId]
      if (cond.status === 'not_started') return Boolean(completed)
      if (cond.status === 'not_completed') return Boolean(completed)
      if (cond.status === 'active') return Boolean(completed)
      // completed
      if (completed) return Boolean(cond.outcome && completed.outcome !== cond.outcome)
      if (active) return false
      return isQuestPermanentlyClosed(questMap[cond.questId], ctx, questMap, visiting)
    }
    case 'flag': {
      if (evaluateQuestCondition(cond, ctx, questMap).passed) return false
      const op = cond.op ?? 'truthy'
      const cur = ctx.questState.flags[cond.flag]
      const isSet = cur !== undefined && cur !== null && cur !== false
      // 路线旗标已落定为别的值，或要求「未发生」的事已经发生
      if (op === 'eq') return isSet
      if (op === 'neq' || op === 'falsy') return true
      return false
    }
    case 'npcAlive':
    case 'neverJoinedAnySect':
      return !evaluateQuestCondition(cond, ctx, questMap).passed
    default:
      return false
  }
}

export function isQuestPermanentlyClosed(
  quest: QuestDefinition | undefined,
  ctx: QuestEvalContext,
  questMap: Record<string, QuestDefinition>,
  visiting: Set<string> = new Set(),
): boolean {
  if (!quest?.startCondition) return false
  if (ctx.questState.completedQuests[quest.id] || ctx.questState.activeQuests[quest.id]) return false
  if (visiting.has(quest.id)) return false
  visiting.add(quest.id)
  const closed = isConditionPermanentlyClosed(quest.startCondition, ctx, questMap, visiting)
  visiting.delete(quest.id)
  return closed
}

export interface AvailableQuestEntry {
  quest: QuestDefinition
  /** 开启条件已全部满足 */
  startable: boolean
  /** 0 本门主线 · 1 本门支线/日常 · 2 其余 */
  group: 0 | 1 | 2
  /** 是追踪面板推荐的「门派主线 · 下一步」 */
  suggested: boolean
}

/**
 * 江湖纪事「可接」列表：
 * - 师门要务只保留当前所属门派的（未入门派时一概不列）；
 * - 因路线抉择/结局分支/NPC 身故而永久关闭的任务不再列出；
 * - 门派任务只列前置剧情已走到的（远期章节见门派任务树）；
 * - 排序：本门主线（可开启在前，再按章节序）→ 本门支线日常（可开启在前）→ 其余传闻（可开启在前，保持原序）。
 */
export function buildAvailableQuestEntries(
  ctx: QuestEvalContext,
  quests: readonly QuestDefinition[],
  questMap: Record<string, QuestDefinition>,
): AvailableQuestEntry[] {
  const sectId = ctx.sectState.sectId
  const suggestion = getSuggestedSectMainQuest(ctx, quests, questMap)
  const entries: (AvailableQuestEntry & { idx: number; order: number })[] = []
  quests.forEach((quest, idx) => {
    if (ctx.questState.activeQuests[quest.id] || ctx.questState.completedQuests[quest.id]) return
    if (quest.category === 'sect_mission' && (!sectId || quest.factionId !== sectId)) return
    if (isQuestPermanentlyClosed(quest, ctx, questMap)) return
    const startable = !quest.startCondition || evaluateQuestCondition(quest.startCondition, ctx, questMap).passed
    // 门派任务：前置剧情未走到（或门派不符）的远期章节不列，只留眼下可推进的；全貌见门派任务树
    if (
      !startable &&
      (quest.category === 'sect_mission' || quest.category === 'sect_entry') &&
      quest.startCondition &&
      hasHardBlock(quest.startCondition, ctx, questMap)
    ) {
      return
    }
    const mainOrder = getSectMainLineOrder(quest.id)
    const isOwnSect = Boolean(sectId) && quest.factionId === sectId && quest.category === 'sect_mission'
    const group: 0 | 1 | 2 = isOwnSect ? (mainOrder !== null ? 0 : 1) : 2
    entries.push({
      quest,
      startable,
      group,
      suggested: suggestion?.quest.id === quest.id,
      idx,
      order: mainOrder ?? 0,
    })
  })
  entries.sort(
    (a, b) =>
      a.group - b.group ||
      Number(b.suggested) - Number(a.suggested) ||
      Number(b.startable) - Number(a.startable) ||
      a.order - b.order ||
      a.idx - b.idx,
  )
  return entries.map(({ quest, startable, group, suggested }) => ({ quest, startable, group, suggested }))
}
