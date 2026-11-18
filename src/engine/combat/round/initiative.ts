import { MARTIAL_ART_DB_MAP } from '../../../data/gameDb'
import { ITEM_DB_MAP } from '../../../data/itemsDb'
import { chooseAiCombatDecision } from '../ai'
import { COMBAT_EFFECT_REGISTRY } from '../effects/registry'
import {
  computeEffectiveAgility,
  computeMoveMpCost,
  describeChoice,
  getArtRawDamageAndKind,
  getLearnedLevel,
  getSlotEffectsMap,
} from '../formulas'
import type { CombatActionChoice, CombatFloatingPopup, FxKey } from '../types'
import type { BlindDecisionEntry, CombatRoundContext, ScoredOrderEntry } from './context'

export interface InitiativeResolutionResult {
  decisionMap: Map<string, BlindDecisionEntry>
  scoredOrder: ScoredOrderEntry[]
  orderIndexByUnitId: Map<string, number>
  firstMover: 'player' | 'npc'
  playerChoiceLabel: string
  npcChoiceLabel: string
}

export function resolveBlindDecisionsAndInitiative(
  ctx: CombatRoundContext,
  playerChoice: CombatActionChoice,
): InitiativeResolutionResult {
  const { allies, enemies, player, rng, isMultiCombat, initialPrimaryNpc, unitById } = ctx
  const livingEnemiesStart = enemies.filter((e) => e.hp > 0)
  const livingAlliesStart = allies.filter((a) => a.hp > 0)

  const requestedTargetId =
    playerChoice.type === 'move' || playerChoice.type === 'item'
      ? playerChoice.targetId
      : undefined
  const playerTargetEnemy =
    livingEnemiesStart.find((e) => e.unitId === requestedTargetId) ??
    livingEnemiesStart[0] ??
    enemies[0]!

  const decisionMap = new Map<string, BlindDecisionEntry>()
  decisionMap.set(player.unitId, {
    fighter: player,
    choice: playerChoice,
    targetUnitId: playerTargetEnemy.unitId,
  })

  for (const ally of livingAlliesStart) {
    if (ally.isPlayer) continue
    const dec = chooseAiCombatDecision(ally, livingEnemiesStart, rng)
    decisionMap.set(ally.unitId, {
      fighter: ally,
      choice: dec.choice,
      targetUnitId: dec.targetUnitId,
    })
  }

  for (const enemy of livingEnemiesStart) {
    const dec = chooseAiCombatDecision(enemy, livingAlliesStart, rng)
    decisionMap.set(enemy.unitId, {
      fighter: enemy,
      choice: dec.choice,
      targetUnitId: dec.targetUnitId,
    })
  }

  for (const entry of decisionMap.values()) {
    entry.fighter.consecutiveMoveRounds =
      entry.choice.type === 'move' ? entry.fighter.consecutiveMoveRounds + 1 : 0
  }

  // 盲选已锁定：上回合施加的一次性受控标记（震慑/封穴/震腕）至此生效完毕，
  // 清除后本回合新命中的受控效果会保留到下回合。
  for (const f of [...allies, ...enemies]) {
    f.stunnedNextRound = false
    f.disarmedNextRound = false
  }

  const scoredOrder: ScoredOrderEntry[] = Array.from(decisionMap.values()).map((entry) => {
    const { fighter, choice } = entry
    const agi = computeEffectiveAgility(fighter)
    const moveFx = choice.type === 'move' ? getSlotEffectsMap(fighter, choice.slot) : {}
    const chosenArtId = choice.type === 'move' ? fighter.equippedArts[choice.slot] : null
    const chosenArt = chosenArtId ? MARTIAL_ART_DB_MAP[chosenArtId] : undefined
    const instinctInitBonus =
      chosenArt && (chosenArt.category === '剑法' || chosenArt.category === '指法') ? 10 : 0
    // 内力不足以催动所选招式时，《独孤九剑》料敌机先的必先手同样失效
    const canAffordChosenMove =
      !chosenArt ||
      fighter.mp >=
        computeMoveMpCost(
          fighter,
          getArtRawDamageAndKind(chosenArt, getLearnedLevel(fighter.learnedArts, chosenArt.id))
            .damage,
        )
    const hasDuguPriority =
      choice.type === 'move' &&
      canAffordChosenMove &&
      (Object.keys(moveFx) as FxKey[]).some(
        (k) => Boolean(moveFx[k]) && COMBAT_EFFECT_REGISTRY[k]?.hasInitiativePriority,
      )
    const initScore =
      (hasDuguPriority ? 10000 : 0) + agi + instinctInitBonus + (rng() * 6 - 3)
    return {
      ...entry,
      agi,
      instinctInitBonus,
      hasDuguPriority,
      initScore,
    }
  })

  scoredOrder.sort((a, b) => {
    if (Math.abs(b.initScore - a.initScore) > 1e-6) return b.initScore - a.initScore
    return a.fighter.team === 'ally' ? -1 : 1
  })

  const orderIndexByUnitId = new Map<string, number>(
    scoredOrder.map((s, idx) => [s.fighter.unitId, idx]),
  )
  const leader = scoredOrder[0]!
  const firstMover: 'player' | 'npc' = leader.fighter.team === 'ally' ? 'player' : 'npc'
  const playerChoiceLabel = describeChoice(player, playerChoice)
  const primaryNpcDecision = decisionMap.get(initialPrimaryNpc.unitId)
  const npcChoiceLabel = primaryNpcDecision
    ? describeChoice(initialPrimaryNpc, primaryNpcDecision.choice)
    : '【败退】'

  const formatFighterBlindPick = (entry: ScoredOrderEntry): string => {
    const actorLabel = entry.fighter.isPlayer ? '少侠' : entry.fighter.name
    const actLabel = describeChoice(entry.fighter, entry.choice)
    const isOffensive =
      entry.choice.type === 'move' ||
      (entry.choice.type === 'item' && Boolean(ITEM_DB_MAP[entry.choice.itemId]?.poisonEffect))
    if (isMultiCombat && isOffensive) {
      const tgt = unitById.get(entry.targetUnitId)
      const tgtName = tgt ? (tgt.isPlayer ? '少侠' : tgt.name) : ''
      if (tgtName) return `${actorLabel}出${actLabel}→${tgtName}`
    }
    return `${actorLabel}出${actLabel}`
  }

  let initReason = ''
  if (!isMultiCombat) {
    const pOrder = scoredOrder.find((s) => s.fighter.unitId === player.unitId)
    const nOrder = scoredOrder.find((s) => s.fighter.unitId === initialPrimaryNpc.unitId)
    const pInitStr = `${computeEffectiveAgility(player)}${pOrder?.instinctInitBonus ? '+10剑指' : ''}`
    const nInitStr = `${computeEffectiveAgility(initialPrimaryNpc)}${nOrder?.instinctInitBonus ? '+10剑指' : ''}`
    initReason = leader.hasDuguPriority
      ? '（《独孤九剑》料敌机先，无视身法抢占先机！）'
      : `（先手身法 ${pInitStr} : ${nInitStr}）`
    ctx.pushLog(
      'info',
      `第 ${ctx.round} 合亮牌：少侠出${playerChoiceLabel}，${initialPrimaryNpc.name}出${npcChoiceLabel} —— ${
        firstMover === 'player' ? '少侠' : initialPrimaryNpc.name
      }抢得先手${initReason}！`,
    )
  } else {
    const picksSummary = Array.from(decisionMap.values())
      .map((entry) => {
        const match = scoredOrder.find((s) => s.fighter.unitId === entry.fighter.unitId)!
        return formatFighterBlindPick(match)
      })
      .join('；')
    const orderSummary = scoredOrder
      .map(
        (s) =>
          `${s.fighter.isPlayer ? '少侠' : s.fighter.name}(${s.agi}${
            s.instinctInitBonus ? '+10' : ''
          })`,
      )
      .join(' → ')
    initReason = `（出招序：${orderSummary}）`
    ctx.pushLog('info', `第 ${ctx.round} 合战阵亮牌：${picksSummary} —— ${initReason}`)
  }

  const revealPopups: CombatFloatingPopup[] = []
  const isMutualDefend =
    livingAlliesStart.length > 0 &&
    livingEnemiesStart.length > 0 &&
    livingAlliesStart.every((a) => decisionMap.get(a.unitId)?.choice.type === 'defend') &&
    livingEnemiesStart.every((e) => decisionMap.get(e.unitId)?.choice.type === 'defend')

  for (const entry of decisionMap.values()) {
    if (entry.choice.type === 'defend') {
      entry.fighter.lastUsedArtId = null
      const mpRecoverRatio = isMutualDefend ? 0.15 : 0.1
      const rawMpGain = Math.max(1, Math.round(entry.fighter.maxMp * mpRecoverRatio))
      const mpBefore = entry.fighter.mp
      entry.fighter.mp = Math.min(entry.fighter.maxMp, entry.fighter.mp + rawMpGain)
      const actualMpGain = entry.fighter.mp - mpBefore
      const fSide: 'player' | 'npc' = entry.fighter.team === 'ally' ? 'player' : 'npc'
      const actorTitle = entry.fighter.isPlayer ? '少侠' : entry.fighter.name
      ctx.pushLog(
        fSide === 'player' ? 'player' : 'enemy',
        isMutualDefend
          ? `${actorTitle}与对手皆抱元守一，吐纳调息回复 ${actualMpGain} 点内力（双守15%上限，受创减半）。`
          : `${actorTitle}沉腰敛气摆出守御架势，凝神回气 +${actualMpGain} 点内力（受创减半，诱敌破绽）。`,
      )
      revealPopups.push({
        id: ctx.nextPopupId(),
        side: fSide,
        unitId: entry.fighter.unitId,
        text: entry.fighter.isPlayer ? '沉腰守御' : '凝神守御',
        subText:
          actualMpGain > 0 ? `受创减半 · +${actualMpGain}内力` : '受创减半 · 诱敌破绽',
        style: 'guard',
      })
    }
  }

  const anyDefend = Array.from(decisionMap.values()).some((d) => d.choice.type === 'defend')
  ctx.flushBeat({
    kind: 'reveal',
    actorSide: firstMover,
    actorUnitId: leader.fighter.unitId,
    bannerTitle: isMultiCombat
      ? `第 ${ctx.round} 合 · ${allies.length}v${enemies.length} 战阵交锋`
      : `第 ${ctx.round} 合 · 亮招交锋`,
    bannerSubtitle: isMultiCombat
      ? initReason.replace(/^（|）$/g, '')
      : `${leader.fighter.isPlayer ? '少侠' : leader.fighter.name}抢得先手 ${initReason}`,
    vfxCategory: anyDefend ? 'guard' : undefined,
    popups: revealPopups,
  })

  return {
    decisionMap,
    scoredOrder,
    orderIndexByUnitId,
    firstMover,
    playerChoiceLabel,
    npcChoiceLabel,
  }
}
