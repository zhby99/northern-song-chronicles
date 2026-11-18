import { runEffectRoundEnd } from '../effects/registry'
import { getSlotEffectsMap } from '../formulas'
import type { CombatFloatingPopup } from '../types'
import type { CombatRoundContext } from './context'

export function resolveEndOfRoundTicks(ctx: CombatRoundContext): void {
  const { allies, enemies, player } = ctx
  const anyEnemyAlive = enemies.some((e) => e.hp > 0)

  const statusPopups: CombatFloatingPopup[] = []
  let hasPoisonStatusTick = false
  const healFlags = { hasHealStatusTick: false }

  if (!ctx.escapedSuccess && player.hp > 0 && anyEnemyAlive) {
    for (const f of [...allies, ...enemies]) {
      if (f.hp <= 0) {
        f.exposed = false
        continue
      }
      const fSide: 'player' | 'npc' = f.team === 'ally' ? 'player' : 'npc'

      if (f.poisonDotTurns > 0 && f.poisonDotDmg > 0) {
        const dot = f.poisonDotDmg
        f.hp = Math.max(0, f.hp - dot)
        f.poisonDotTurns -= 1
        if (f.poisonDotTurns <= 0) f.poisonDotDmg = 0
        hasPoisonStatusTick = true
        ctx.pushLog(
          'special',
          `${f.name}体内奇毒发作蚀脉，折损 ${dot} 点气血${
            f.hp <= 0 ? '，毒发力竭倒地' : `（余 ${f.poisonDotTurns} 合）`
          }！`,
        )
        statusPopups.push({
          id: ctx.nextPopupId(),
          side: fSide,
          unitId: f.unitId,
          text: `-${dot}`,
          subText: '奇毒蚀脉',
          style: 'debuff',
        })
        if (f.hp <= 0) {
          f.exposed = false
          continue
        }
      }

      const ngFx = getSlotEffectsMap(f, 'neigong')
      runEffectRoundEnd({
        round: ctx.round,
        rng: ctx.rng,
        pushLog: ctx.pushLog,
        nextPopupId: ctx.nextPopupId,
        fighter: f,
        side: fSide,
        ngFx,
        popups: statusPopups,
        flags: healFlags,
      })

      if (f.slowTurns > 0) f.slowTurns -= 1
      if (f.weakTurns > 0) f.weakTurns -= 1
      // 迟缓 / 滞气到期后清空幅度，避免日后挂上低阶毒时被 Math.max 复活旧的高阶减益
      if (f.slowTurns <= 0) f.slowPct = 0
      if (f.weakTurns <= 0) f.weakPct = 0
      f.exposed = ctx.pendingExposedIds.has(f.unitId)
    }
  } else {
    for (const f of [...allies, ...enemies]) {
      f.exposed = false
    }
  }

  if (statusPopups.length > 0) {
    ctx.flushBeat({
      kind: 'status',
      bannerTitle:
        hasPoisonStatusTick && healFlags.hasHealStatusTick
          ? '奇毒攻心 · 周天吐纳'
          : hasPoisonStatusTick
            ? '奇毒发作 · 蚀脉攻心'
            : '周天吐纳 · 生生不息',
      bannerSubtitle:
        hasPoisonStatusTick && !healFlags.hasHealStatusTick
          ? '经脉余毒蔓延蚀损气血'
          : '回合末经脉气机流转结算',
      vfxCategory: hasPoisonStatusTick && !healFlags.hasHealStatusTick ? 'poison' : 'heal',
      popups: statusPopups,
    })
  }
}
