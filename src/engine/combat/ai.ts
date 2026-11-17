import { getMoveActionsAvailability, getSlotEffectsMap } from './formulas'
import { type CombatRng, defaultCombatRng } from './rng'
import type { CombatActionChoice, CombatantState } from './types'

/**
 * 智能 NPC 回合盲选 AI：严格遵守 6 选 1 与「禁连续两回合使用同一武学」铁律，支持注入确定性 RNG。
 */
export function chooseNpcCombatAction(
  npc: CombatantState,
  primaryOpponent: CombatantState,
  rng: CombatRng = defaultCombatRng,
): CombatActionChoice {
  if (npc.stunnedNextRound) {
    return { type: 'defend' }
  }
  const availMoves = getMoveActionsAvailability(npc).filter((m) => !m.disabled && m.art)
  if (availMoves.length === 0) {
    return { type: 'defend' }
  }

  const ngFx = getSlotEffectsMap(npc, 'neigong')
  const qgFx = getSlotEffectsMap(npc, 'qinggong')
  const affordableMoves = availMoves.filter((m) => !m.lowMpWarning)

  const oppEquippedMoves = getMoveActionsAvailability(primaryOpponent).filter(
    (m) => m.art !== null,
  )
  const isOpponentMpDepleted =
    (oppEquippedMoves.length > 0 && oppEquippedMoves.every((m) => m.lowMpWarning)) ||
    primaryOpponent.mp < Math.max(10, primaryOpponent.maxMp * 0.12)

  let defendProb = 0.12
  if (isOpponentMpDepleted) {
    defendProb = 0
  } else if (primaryOpponent.exposed && affordableMoves.length > 0) {
    defendProb = 0.04
  } else if (primaryOpponent.consecutiveMoveRounds >= 2) {
    defendProb = ngFx.jingang_rebound || qgFx.lingbo_def_dodge ? 0.35 : 0.32
  } else if (affordableMoves.length === 0) {
    defendProb = 0.38
  } else if (ngFx.jingang_rebound || qgFx.lingbo_def_dodge) {
    defendProb = 0.2
  } else if (npc.hp < npc.maxHp * 0.3 && primaryOpponent.mp > primaryOpponent.maxMp * 0.5) {
    defendProb = 0.22
  }

  if (rng() < defendProb) {
    return { type: 'defend' }
  }

  const pool = affordableMoves.length > 0 ? affordableMoves : availMoves
  const weights = pool.map((m) => {
    const fxBonus =
      (m.art?.levels?.[Math.max(0, m.level - 1)]?.specialEffects?.length ?? 0) > 0
        ? 1.25
        : 1.0
    const synBonus = 1 + (npc.synergyBonusBySlot[m.slot] ?? 0) / 100
    return Math.max(10, m.moveDamage * fxBonus * synBonus)
  })
  const totalW = weights.reduce((a, b) => a + b, 0)
  let pick = rng() * totalW
  for (let i = 0; i < pool.length; i += 1) {
    pick -= weights[i]!
    if (pick <= 0) {
      return { type: 'move', slot: pool[i]!.slot }
    }
  }
  return { type: 'move', slot: pool[0]!.slot }
}

/**
 * 1v2 / 2v2 战阵 AI：为存活 NPC（友军或敌军）同步选择目标敌手与本回合招式
 */
export function chooseAiCombatDecision(
  actor: CombatantState,
  livingOpponents: CombatantState[],
  rng: CombatRng = defaultCombatRng,
): { choice: CombatActionChoice; targetUnitId: string } {
  const fallbackTarget = livingOpponents[0]!
  let chosenTarget = fallbackTarget

  if (livingOpponents.length > 1) {
    const weights = livingOpponents.map((opp) => {
      const hpRatio = opp.hp / Math.max(1, opp.maxHp)
      let w = 1.0
      if (hpRatio < 0.35) w += 0.5
      if (opp.exposed) w += 0.45
      if (actor.team === 'enemy') {
        w *= opp.isPlayer ? 1.1 : 1.0
      } else {
        w *= hpRatio < 0.6 ? 1.35 : 1.0
      }
      return Math.max(0.2, w)
    })
    const sum = weights.reduce((a, b) => a + b, 0)
    let r = rng() * sum
    for (let i = 0; i < livingOpponents.length; i += 1) {
      r -= weights[i]!
      if (r <= 0) {
        chosenTarget = livingOpponents[i]!
        break
      }
    }
  }

  const baseChoice = chooseNpcCombatAction(actor, chosenTarget, rng)
  if (baseChoice.type === 'move') {
    return {
      choice: { ...baseChoice, targetId: chosenTarget.unitId },
      targetUnitId: chosenTarget.unitId,
    }
  }
  return {
    choice: baseChoice,
    targetUnitId: chosenTarget.unitId,
  }
}
