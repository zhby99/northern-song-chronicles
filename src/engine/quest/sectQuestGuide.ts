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
