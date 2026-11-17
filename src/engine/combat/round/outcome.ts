import type { CombatOutcome, CombatSessionState } from '../types'
import type { CombatRoundContext } from './context'

export function finalizeCombatRoundOutcome(
  ctx: CombatRoundContext,
  meta: {
    firstMover: 'player' | 'npc'
    playerChoiceLabel: string
    npcChoiceLabel: string
  },
): CombatSessionState {
  const { allies, enemies, player, round, session } = ctx
  const allEnemiesDown = enemies.every((e) => e.hp <= 0)
  const finalPrimaryNpc = ctx.getPrimaryNpc()
  const enemyGroupLabel =
    enemies.length > 1 ? enemies.map((e) => e.name).join('、') : finalPrimaryNpc.name

  let outcome: CombatOutcome = 'ongoing'
  if (ctx.escapedSuccess) {
    outcome = 'escaped'
  } else if (player.hp <= 0 && allEnemiesDown) {
    outcome = 'draw'
    ctx.pushLog('system', '双方拼至力竭同时收掌后退，此番交锋不分伯仲！')
  } else if (allEnemiesDown) {
    outcome = 'player_win'
    ctx.pushLog(
      'system',
      session.mode === 'duel'
        ? `生死分晓！${enemyGroupLabel}全数溃败，少侠浴血激战 ${round} 合大获全胜！`
        : `承让！${enemyGroupLabel}拱手认输，少侠历经 ${round} 合拆招获胜！`,
    )
  } else if (player.hp <= 0) {
    outcome = 'npc_win'
    ctx.pushLog(
      'system',
      session.duelStakes === 'zhan_zhao_arrest'
        ? `少侠重伤倒地被南侠${finalPrimaryNpc.name}生擒锁拿，即将押赴开封府市曹问斩！`
        : session.mode === 'duel'
          ? '刀剑无眼！少侠在生死相搏中真气溃散重创倒地，命悬一线！'
          : `少侠气血不支抱拳退让，${finalPrimaryNpc.name}收势颔首点到为止。`,
    )
  } else if (round >= session.maxRounds) {
    if (session.surviveToWin) {
      outcome = 'player_win'
      ctx.pushLog(
        'system',
        `拆招已满 ${session.maxRounds} 合！少侠稳守门户屹立不倒，${finalPrimaryNpc.name}抚掌赞叹，考校顺利过关！`,
      )
    } else {
      const allyCurHp = allies.reduce((s, a) => s + Math.max(0, a.hp), 0)
      const allyMaxHp = allies.reduce((s, a) => s + Math.max(1, a.maxHp), 0)
      const enemyCurHp = enemies.reduce((s, e) => s + Math.max(0, e.hp), 0)
      const enemyMaxHp = enemies.reduce((s, e) => s + Math.max(1, e.maxHp), 0)
      const pRatio = allyCurHp / Math.max(1, allyMaxHp)
      const nRatio = enemyCurHp / Math.max(1, enemyMaxHp)
      outcome =
        session.questCombatHook && !session.questCombatHook.onDraw
          ? pRatio > nRatio
            ? 'player_win'
            : 'npc_win'
          : Math.abs(pRatio - nRatio) < 0.03
            ? 'draw'
            : pRatio > nRatio
              ? 'player_win'
              : 'npc_win'
      ctx.pushLog(
        'system',
        `拆招已满 ${session.maxRounds} 合！按双方余留气血气度裁定：${
          outcome === 'player_win'
            ? '少侠一方略胜半筹'
            : outcome === 'npc_win'
              ? `${enemyGroupLabel}技高一筹`
              : '秋色平分'
        }！`,
      )
    }
  }

  if (outcome !== 'ongoing' && ctx.hasUnflushedLogs()) {
    ctx.flushBeat({
      kind: 'end',
      actorSide: outcome === 'player_win' ? 'player' : outcome === 'npc_win' ? 'npc' : undefined,
      bannerTitle:
        outcome === 'player_win'
          ? '承让 · 武林凯旋'
          : outcome === 'draw'
            ? '秋色平分 · 不分伯仲'
            : outcome === 'escaped'
              ? '虚晃一招 · 飘然脱身'
              : session.mode === 'duel'
                ? '真气溃散 · 血染沙场'
                : '点到为止 · 抱拳退让',
      bannerSubtitle: `共历 ${round} 合拆招定音`,
      popups: [],
    })
  }

  return {
    ...session,
    round: outcome === 'ongoing' ? round + 1 : round,
    outcome,
    player,
    npc: finalPrimaryNpc,
    allies,
    enemies,
    logs: [...session.logs, ...ctx.roundEvents],
    lastRoundSummary: {
      round,
      playerChoiceLabel: meta.playerChoiceLabel,
      npcChoiceLabel: meta.npcChoiceLabel,
      firstMover: meta.firstMover,
      initialPlayerHp: ctx.initialPlayerHp,
      initialPlayerMp: ctx.initialPlayerMp,
      initialNpcHp: ctx.initialNpcHp,
      initialNpcMp: ctx.initialNpcMp,
      initialUnitSnapshots: ctx.initialUnitSnapshots,
      beats: ctx.beats,
      events: ctx.roundEvents,
    },
  }
}
