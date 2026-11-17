import { ITEM_DB_MAP } from '../../data/itemsDb'
import {
  canFighterEscape,
  getMoveActionsAvailability,
  getStrongestLivingEnemy,
} from './formulas'
import { type CombatRng, defaultCombatRng } from './rng'
import { createCombatRoundContext } from './round/context'
import { resolveEndOfRoundTicks } from './round/endOfRound'
import { resolveBlindDecisionsAndInitiative } from './round/initiative'
import { finalizeCombatRoundOutcome } from './round/outcome'
import { resolveOrderedActionSteps } from './round/resolveStep'
import type { CombatActionChoice, CombatSessionState } from './types'

export * from './ai'
export * from './combatants'
export * from './effects/registry'
export * from './formulas'
export * from './rng'
export * from './types'

/**
 * 结算单个完整回合（支持传入确定性 `rng` 用于快照测试与回放）：
 * 1) 回合初被动钩子与盲选收集
 * 2) 全员身法先手排序与守御回内
 * 3) 按序执行行动步骤（脱战 / 服丹施毒 / 出招交锋）
 * 4) 回合末毒伤与内功吐纳结算
 * 5) 胜负裁定与回合摘要封装
 */
export function resolveCombatRound(
  session: CombatSessionState,
  playerChoice: CombatActionChoice,
  rng: CombatRng = defaultCombatRng,
): CombatSessionState {
  if (session.outcome !== 'ongoing') return session

  const strongestPursuer = getStrongestLivingEnemy(session)
  if (playerChoice.type === 'move') {
    const slotAvail = getMoveActionsAvailability(session.player).find(
      (m) => m.slot === playerChoice.slot,
    )
    if (!slotAvail || slotAvail.disabled || !slotAvail.art) {
      return session
    }
  } else if (
    playerChoice.type === 'escape' &&
    !canFighterEscape(
      session.player,
      strongestPursuer,
      session.duelStakes,
      session.forbidEscapeReason,
    ).allowed
  ) {
    return session
  } else if (playerChoice.type === 'item' && !ITEM_DB_MAP[playerChoice.itemId]) {
    return session
  }

  const ctx = createCombatRoundContext(session, rng)
  const initResult = resolveBlindDecisionsAndInitiative(ctx, playerChoice)
  resolveOrderedActionSteps(
    ctx,
    initResult.scoredOrder,
    initResult.decisionMap,
    initResult.orderIndexByUnitId,
  )
  resolveEndOfRoundTicks(ctx)
  return finalizeCombatRoundOutcome(ctx, {
    firstMover: initResult.firstMover,
    playerChoiceLabel: initResult.playerChoiceLabel,
    npcChoiceLabel: initResult.npcChoiceLabel,
  })
}
