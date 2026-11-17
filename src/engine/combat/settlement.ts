import type {
  ActiveEscortContract,
  CompiledNpcRecord,
  GameOverState,
  InventoryStack,
  NodeNpc,
  PlayerSectState,
} from '../../types/game'
import type { QuestRuntimeState } from '../../types/quest'
import { computeCelunBonusAmount } from '../economy'
import {
  buildNodeNpcFromTournamentOpponent,
  getSectLeaderNpcId,
  getSectRankTitle,
  SECT_TOURNAMENT_TOKEN_ITEM_ID,
} from '../sect'
import { addItemToInventory } from '../shared/inventory'
import type { CombatSessionState, DuelStakesKind } from './types'

// ============================================================================
// 战后结算注册表：
// 1) 生死决斗落败 → 按 duelStakes 查表生成「游戏结束」文案
// 2) 存活结算 → 按序执行 COMBAT_SETTLEMENT_RULES，每条规则只改写结算草稿 d
//    新增一类战斗（新 duelStakes）时，在此追加文案 / 规则即可，无需改动 store 切片。
// ============================================================================

type DeathText = { reasonTitle: string; reasonDetail: (killerLabel: string) => string }

const DEATH_TEXT_BY_STAKES: Partial<Record<DuelStakesKind, DeathText>> = {
  zhan_zhao_arrest: {
    reasonTitle: '开封府市曹处斩',
    reasonDetail: () =>
      '少侠因领绿林「纳投名状」劫掠大宋朝廷命官，名列朝廷黑名单。今踏入东京开封府被御前四品带刀护卫「南侠」展昭缉拿归案，押赴开封府市曹，狗头铡下明正典刑！',
  },
  liao_spy_duel: {
    reasonTitle: '喋血燕云 · 为国捐躯',
    reasonDetail: (killerLabel) =>
      `少侠奉常山枪派军令赴燕云诛除契丹密谍，在与【${killerLabel}】的生死决战中力竭重创，命陨塞北，马革裹尸！`,
  },
  kaifeng_warrant: {
    reasonTitle: '缉盗失手 · 血溅街巷',
    reasonDetail: (killerLabel) =>
      `少侠奉开封府海捕公文缉拿江洋要犯【${killerLabel}】，殊死搏杀中力竭失手，惨遭凶徒毒刃反噬，血洒当场！`,
  },
  rob_official: {
    reasonTitle: '劫官败亡 · 伏尸当场',
    reasonDetail: (killerLabel) =>
      `少侠欲劫掠大宋官员【${killerLabel}】以纳绿林投名状，岂料失手落败，当场毙命于刀兵之下！`,
  },
}

export function buildCombatDeathPayload(
  session: CombatSessionState,
  meta: { killerLabel: string; songDate: string; locationName: string },
): GameOverState {
  const { killerLabel, songDate, locationName } = meta
  const qHook = session.questCombatHook
  const base = { killerName: killerLabel, songDate, locationName }
  if (qHook?.deathTitle || qHook?.deathDetail) {
    return {
      ...base,
      reasonTitle: qHook.deathTitle ?? '命陨江湖 · 侠踪绝响',
      reasonDetail:
        qHook.deathDetail ??
        `生死相搏，刀剑无眼！少侠在与【${killerLabel}】的生死决战中气绝败北。`,
    }
  }
  const byStakes = DEATH_TEXT_BY_STAKES[session.duelStakes]
  if (byStakes) {
    return { ...base, reasonTitle: byStakes.reasonTitle, reasonDetail: byStakes.reasonDetail(killerLabel) }
  }
  if (session.surviveToWin) {
    return {
      ...base,
      reasonTitle: `${session.maxRounds}合未竟 · 命陨当场`,
      reasonDetail: `刀剑无眼，强敌难撄！少侠在与【${killerLabel}】的交锋中未能撑满 ${session.maxRounds} 回合，真气溃散重创倒地，当场毙命！`,
    }
  }
  return {
    ...base,
    reasonTitle: '命陨江湖 · 侠踪绝响',
    reasonDetail: `生死相搏，刀剑无眼！少侠在与【${killerLabel}】的生死对决中气绝败北，血染尘沙，一世风云就此落幕。`,
  }
}

// ---------------------------------------------------------------------------
// 存活结算
// ---------------------------------------------------------------------------

/** 存活结算草稿：规则按序就地改写，最终由 store 一次性提交 */
export interface CombatSettlementDraft {
  silver: number
  inventory: InventoryStack[]
  sectState: PlayerSectState
  questState: QuestRuntimeState
  combatExp: number
  chivalry: number
  escortContract: ActiveEscortContract | null
  hp: number
  mp: number
  logTag: string
  logText: string
  /** 劫官得手且身处开封 → 立刻触发展昭缉拿 */
  triggerKaifengZhanZhao: boolean
  /** 宗门大比晋级 → 立刻开打下一轮 */
  nextTournamentOpponent: NodeNpc | null
}

export interface CombatSettlementContext {
  session: CombatSessionState
  /** computeCombatSettlement 的基础结算结果（经验、成长、派生属性） */
  res: {
    combatExpGain: number
    derived: { skills: Record<string, number>; maxHp: number; maxMp: number }
  }
  qHook: CombatSessionState['questCombatHook']
  dbTarget: CompiledNpcRecord | null | undefined
  activeRegionId: string
  activeEscortContract: ActiveEscortContract | null
}

export interface CombatSettlementRule {
  id: string
  /** 仅对这些 duelStakes 生效；缺省表示对任意战斗都检查 */
  stakes?: DuelStakesKind[]
  apply: (d: CombatSettlementDraft, ctx: CombatSettlementContext) => void
}

/** 规则顺序即结算顺序（后执行者可覆盖 logTag / logText） */
export const COMBAT_SETTLEMENT_RULES: CombatSettlementRule[] = [
  {
    id: 'sameSectSparMerit',
    apply(d, ctx) {
      const { session, dbTarget } = ctx
      // 同门切磋获胜积攒微末功绩
      if (
        session.outcome === 'player_win' &&
        d.sectState.sectId &&
        dbTarget?.factionId === d.sectState.sectId
      ) {
        d.sectState.contribution += 12
        d.logText += `（同门印证获门派功绩 +12，现 ${d.sectState.contribution}）`
      }
    },
  },
  {
    id: 'xingxiuRankChallenge',
    apply(d, ctx) {
      const { session, dbTarget } = ctx
      // 星宿派（SECT-19）实力晋升判定：击败 Lv.2/Lv.3/Lv.4(或摘星子) 同门记录，杀死丁春秋即成掌门
      if (session.outcome === 'player_win' && d.sectState.sectId === 'SECT-19') {
        if (dbTarget?.factionId === 'SECT-19' && dbTarget.sectRank) {
          const defeated = new Set(d.sectState.xingxiuDefeatedRanks)
          defeated.add(dbTarget.sectRank)
          if (dbTarget.id === 'NPC-0181') {
            defeated.add(4)
          }
          d.sectState.xingxiuDefeatedRanks = Array.from(defeated)
        }
        if (
          session.mode === 'duel' &&
          dbTarget?.id === getSectLeaderNpcId('SECT-19')
        ) {
          d.sectState.killedDingChunqiu = true
          d.sectState.rank = 5
          d.sectState.rankLabel = getSectRankTitle('SECT-19', 5)
          d.logTag = '弑师夺位'
          d.logText = `少侠在生死决斗中击杀星宿老怪【丁春秋】！依星宿派弱肉强食之规，正式登临第 5 阶【${d.sectState.rankLabel}】尊位！`
        }
      }
    },
  },
  {
    id: 'minorSectCoaching',
    apply(d, ctx) {
      const { session } = ctx
      // 二三流门派「武艺教学」切磋任务完成判定
      if (
        session.mode === 'spar' &&
        session.outcome === 'player_win' &&
        d.sectState.activeSectTask?.kind === 'martial_coaching' &&
        !d.sectState.activeSectTask.completedStep
      ) {
        const task = d.sectState.activeSectTask
        const matchedTarget =
          (session.targetNpcNode.id && session.targetNpcNode.id === task.traineeNpcId) ||
          (!session.targetNpcNode.id && session.targetNpcNode.name === task.traineeNpcName)
        if (matchedTarget) {
          d.sectState.activeSectTask = { ...task, completedStep: true }
          d.logTag = '宗门教学'
          d.logText += `（已完成宗门任务【${task.title}】切磋指点！请回【${task.sectName}】向掌门【${task.leaderName}】复命）`
        }
      }
    },
  },
  {
    id: 'robOfficialToumingzhuang',
    stakes: ['rob_official'],
    apply(d, ctx) {
      const { session, res, qHook } = ctx
      // 绿林盟「纳投名状」劫官胜利（非声明式 hook 调用时的直通兜底）
      if (!qHook && session.duelStakes === 'rob_official' && session.outcome === 'player_win') {
        d.silver += 60
        d.sectState.toumingzhuangState = 'completed'
        d.sectState.songCourtBlacklisted = true
        d.questState.flags.toumingzhuang_state = 'completed'
        d.questState.flags.toumingzhuang_completed = true
        d.questState.flags.song_court_blacklisted = true
        if (d.questState.activeQuests['QST-SECT-18-TOUMINGZHUANG']) {
          d.questState.activeQuests['QST-SECT-18-TOUMINGZHUANG'] = {
            ...d.questState.activeQuests['QST-SECT-18-TOUMINGZHUANG']!,
            stepId: 'return_to_join',
          }
        }
        d.logTag = '投名状成'
        d.logText = `劫掠大宋官员【${session.npc.name}】得手，夺得官银 +60 两、战斗经验 +${res.combatExpGain}，已完成绿林【纳投名状】！⚠️ 少侠已被列入大宋朝廷黑名单：其他城池无碍，一旦进入【开封府】必遭南侠展昭挑战缉斩！`
        if (ctx.activeRegionId === 'bianliang') {
          d.triggerKaifengZhanZhao = true
        }
      }
    },
  },
  {
    id: 'changshanLiaoSpy',
    stakes: ['liao_spy_duel'],
    apply(d, ctx) {
      const { session, res } = ctx
      // 常山枪派「半年度燕云锄奸」诛杀辽谍胜利（赏银受【策论】干略加成）
      if (session.duelStakes === 'liao_spy_duel' && session.outcome === 'player_win') {
        const spyBounty = computeCelunBonusAmount(50, res.derived.skills['策论'] ?? 0)
        d.sectState.activeLiaoSpy = null
        d.sectState.changshanMissedCount = 0
        d.sectState.contribution += 100
        d.silver += spyBounty
        d.logTag = '燕云锄奸'
        d.logText = `浴血诛除辽国密谍【${session.npc.name}】！圆满完成常山枪派半年军令，获门派功绩 +100（现 ${d.sectState.contribution}）、战斗经验 +${res.combatExpGain}、犒赏纹银 +${spyBounty} 两${spyBounty > 50 ? `（含策论加成 +${spyBounty - 50} 两）` : ''}！`
      }
    },
  },
  {
    id: 'zhanZhaoEscape',
    stakes: ['zhan_zhao_arrest'],
    apply(d, ctx) {
      const { session, res } = ctx
      // 若从展昭剑下侥幸获胜
      if (session.duelStakes === 'zhan_zhao_arrest' && session.outcome === 'player_win') {
        d.logTag = '震动东京'
        d.logText = `少侠竟在东京街头力挫御前四品带刀护卫「南侠」展昭（战斗经验 +${res.combatExpGain}），杀出重围！然朝廷黑名单未消，再度踏入开封仍将遭展昭截杀！`
      }
    },
  },
  {
    id: 'kaifengWarrant',
    apply(d, ctx) {
      const { session, res } = ctx
      // 开封府 / 六扇门「海捕公文」缉拿要犯胜利（赏银受【策论】干略加成）
      if (
        session.outcome === 'player_win' &&
        d.sectState.sectId === 'SECT-17' &&
        d.sectState.activeKaifengWarrant &&
        session.targetNpcNode.id === `KAIFENG_WARRANT_${d.sectState.activeKaifengWarrant.id}`
      ) {
        const warrant = d.sectState.activeKaifengWarrant
        const warrantBounty = computeCelunBonusAmount(15, res.derived.skills['策论'] ?? 0)
        d.sectState.activeKaifengWarrant = null
        d.sectState.kaifengCasesSolved += 1
        if (warrant.deadlineDay) {
          d.sectState.kaifengMissedCount = 0
        }
        d.silver += warrantBounty
        d.logTag = '缉拿归案'
        d.logText = `少侠顺利擒获海捕要犯【${warrant.targetName}（${warrant.targetTitle}）】归案！当前阶位办案量 +1（累计 ${d.sectState.kaifengCasesSolved} 次），获开封府赏银 +${warrantBounty} 两${warrantBounty > 15 ? `（含策论加成 +${warrantBounty - 15} 两）` : ''}、战斗经验 +${res.combatExpGain}！`
      }
    },
  },
  {
    id: 'escortAmbush',
    stakes: ['escort_ambush'],
    apply(d, ctx) {
      const { session, res } = ctx
      // 镖师走镖「绿林劫镖」护送战结算
      if (session.duelStakes === 'escort_ambush') {
        const contract = ctx.activeEscortContract
        if (session.outcome === 'player_win') {
          d.combatExp += 25
          d.chivalry += 1
          d.logTag = '击退劫匪'
          d.logText = `刀光染血，少侠力挫【${session.npc.name}】，死死护住镖车【${contract?.cargoName ?? '红货'}】毫发无损（额外战斗经验 +25 · 侠义 +1）！请于天下舆图继续启程赶赴【${contract?.destName ?? '目的地'}】交割领酬。`
        } else if (session.outcome === 'escaped') {
          d.escortContract = null
          d.logTag = '弃镖脱身'
          d.logText = `劫匪势众凶悍，少侠只得弃下镖箱【${contract?.cargoName ?? '红货'}】抽身掠出重围，此趟走镖差事宣告失利。`
        } else {
          const lostSilver = Math.min(d.silver, 10)
          d.silver -= lostSilver
          d.escortContract = null
          d.hp = Math.max(1, Math.min(d.hp, Math.round(res.derived.maxHp * 0.35)))
          d.logTag = '失镖受挫'
          d.logText = `少侠双拳难敌四手，被【${session.npc.name}】夺走镖车【${contract?.cargoName ?? '红货'}】${lostSilver > 0 ? `并搜去盘缠 ${lostSilver} 两` : ''}，幸得留下一命！`
        }
      }
    },
  },
  {
    id: 'sectTournament',
    stakes: ['sect_tournament'],
    apply(d, ctx) {
      const { session, res } = ctx
      // 道门与名山剑派「宗门大比」1v1 淘汰赛结算
      if (session.duelStakes === 'sect_tournament' && d.sectState.activeSectTournament) {
        const tourney = d.sectState.activeSectTournament
        if (session.outcome === 'player_win') {
          if (tourney.round < 3) {
            const nextRound = (tourney.round + 1) as 2 | 3
            d.sectState.activeSectTournament = { ...tourney, round: nextRound }
            d.hp = res.derived.maxHp
            d.mp = res.derived.maxMp
            const nextOpp = tourney.opponents[nextRound - 1]!
            d.nextTournamentOpponent = buildNodeNpcFromTournamentOpponent(
              tourney.sectId,
              nextOpp,
              nextRound,
            )
            d.logTag = '宗门大比'
            d.logText = `宗门大比第 ${tourney.round} 轮力克【${session.npc.name}】，成功晋级${nextRound === 2 ? '四强' : '决赛'}！经演武场调息恢复后，迎战下一位同门【${nextOpp.name}】！`
          } else {
            // 连胜三轮夺魁
            d.sectState.activeSectTournament = null
            d.sectState.wonSectTournament = true
            d.inventory = addItemToInventory(d.inventory, SECT_TOURNAMENT_TOKEN_ITEM_ID, 1)
            d.inventory = addItemToInventory(d.inventory, 'ITM-MED-111', 1)
            d.inventory = addItemToInventory(d.inventory, 'ITM-MED-113', 1)
            d.silver += 50
            d.logTag = '大比夺魁'
            d.logText = `连克三阵，力压群雄！少侠夺得【${tourney.sectName}】第 ${tourney.yearIndex} 届宗门大比冠军！获赐《宗门大比冠军信物》×1、嵩山少林小还丹 ×1、太医局紫雪神丹 ×1、纹银 +50 两！`
          }
        } else {
          // 止步当前轮次，发放对应名次奖励
          d.sectState.activeSectTournament = null
          d.logTag = '宗门大比'
          if (tourney.round === 1) {
            d.inventory = addItemToInventory(d.inventory, 'ITM-MED-122', 1)
            d.silver += 10
            d.logText = `宗门大比首轮止步八强，宗门赐予慰勉：熟药所行军跌打丸 ×1、纹银 +10 两。`
          } else if (tourney.round === 2) {
            d.inventory = addItemToInventory(d.inventory, 'ITM-MED-122', 1)
            d.inventory = addItemToInventory(d.inventory, 'ITM-MED-123', 1)
            d.silver += 20
            d.logText = `宗门大比闯入四强，惜败于半决赛！宗门赐予嘉奖：熟药所行军跌打丸 ×1、太乙回气清心散 ×1、纹银 +20 两。`
          } else {
            d.inventory = addItemToInventory(d.inventory, 'ITM-MED-111', 1)
            d.silver += 35
            d.logText = `宗门大比杀入决赛，惜居亚军！宗门赐予厚赏：嵩山少林小还丹 ×1、纹银 +35 两。`
          }
        }
      }
    },
  },
]

export function applyCombatSettlementRules(
  draft: CombatSettlementDraft,
  ctx: CombatSettlementContext,
): CombatSettlementDraft {
  for (const rule of COMBAT_SETTLEMENT_RULES) {
    if (rule.stakes && !rule.stakes.includes(ctx.session.duelStakes)) continue
    rule.apply(draft, ctx)
  }
  return draft
}
