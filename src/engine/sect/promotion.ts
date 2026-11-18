import { FACTION_DB_MAP, NPCS_DB, NPC_DB_MAP } from '../../data/gameDb'
import type { SectRankLevel } from '../../types/game'
import { INITIAL_NPC_FAVOR } from '../social/npcFavor'
import { getSectLeaderNpcId, getSectRankTitle } from './ranks'
import { getSectRule, type SectPromotionRuleKind } from './rules'

/**
 * Promotion requirements within a sect (Lv.1 -> Lv.2 -> Lv.3 -> Lv.4).
 * 不可通过常规晋升成为掌门 (Lv.5)（星宿派挑战丁春秋除外）。
 */
export interface PromotionRequirementInfo {
  targetRank: SectRankLevel
  targetRankLabel: string
  canPromote: boolean
  reason: string
  isFirstTierPendingDesign?: boolean
}

export interface EvaluateSectPromotionParams {
  sectId: string
  currentRank: SectRankLevel
  dayCount: number
  joinedDay: number
  heroRealmRank: number
  heroRealmLabel: string
  npcFavor: Record<string, number>
  wonSectTournament?: boolean
  hasTournamentToken?: boolean
  skills?: Record<string, number>
  xingxiuDefeatedRanks?: number[]
  killedDingChunqiu?: boolean
  kaifengCasesSolved?: number
  kaifengRank2Day?: number | null
  kaifengMurongQuest1Done?: boolean
  kaifengMurongQuest2Done?: boolean
}

function evalKaifengCases(params: EvaluateSectPromotionParams): PromotionRequirementInfo | null {
  const {
    sectId,
    currentRank,
    dayCount,
    joinedDay,
    heroRealmRank,
    heroRealmLabel,
    kaifengCasesSolved = 0,
    kaifengRank2Day = null,
    kaifengMurongQuest1Done = false,
    kaifengMurongQuest2Done = false,
  } = params
  if (currentRank >= 4) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  if (currentRank === 1) {
    const missing: string[] = []
    if (heroRealmRank < 3) {
      missing.push(`境界须达【三流上品】（当前【${heroRealmLabel}】）`)
    }
    if (kaifengCasesSolved < 2) {
      missing.push(`六扇门办案量 ${kaifengCasesSolved}/2 次`)
    }
    return {
      targetRank,
      targetRankLabel,
      canPromote: missing.length === 0,
      reason:
        missing.length === 0
          ? `武功（${heroRealmLabel}）与办案政绩（破案 ${kaifengCasesSolved} 次）皆已齐备，可升任【${targetRankLabel}】！`
          : `晋升【${targetRankLabel}】尚缺：${missing.join('、')}`,
    }
  }
  if (currentRank === 2) {
    const baseDay = kaifengRank2Day ?? joinedDay
    const daysAtRank2 = Math.max(0, dayCount - baseDay)
    const missing: string[] = []
    if (daysAtRank2 < 730) {
      missing.push(`须在【捕头都头】任上做满 730 天（当前 ${daysAtRank2}/730 天）`)
    }
    if (kaifengCasesSolved < 5) {
      missing.push(`六扇门办案量 ${kaifengCasesSolved}/5 次`)
    }
    if (!kaifengMurongQuest1Done) {
      missing.push('须前往【开封府衙 · 六扇门捕快演武院】完成晋升任务《燕子坞暗影 · 姑苏密查》')
    }
    return {
      targetRank,
      targetRankLabel,
      canPromote: missing.length === 0,
      reason:
        missing.length === 0
          ? `历练已满 ${daysAtRank2} 天、办案 ${kaifengCasesSolved} 次且已完成《燕子坞暗影 · 姑苏密查》，可升任【${targetRankLabel}】！`
          : `晋升【${targetRankLabel}】尚缺：${missing.join('；')}`,
    }
  }
  const missingLv4: string[] = []
  if (kaifengCasesSolved < 10) {
    missingLv4.push(`六扇门办案量 ${kaifengCasesSolved}/10 次`)
  }
  if (!kaifengMurongQuest2Done) {
    missingLv4.push('须前往【开封府衙 · 开封府升堂正殿】完成二阶晋升任务《参合剑气 · 姑苏对质》')
  }
  return {
    targetRank,
    targetRankLabel,
    canPromote: missingLv4.length === 0,
    reason:
      missingLv4.length === 0
        ? `已办案 ${kaifengCasesSolved} 次并完成《参合剑气 · 姑苏对质》，功勋卓著，可正式晋升【${targetRankLabel}】！`
        : `晋升【${targetRankLabel}】尚缺：${missingLv4.join('；')}（大内总供奉不可常规晋升）。`,
  }
}

function evalImperialGuardMerit(
  params: EvaluateSectPromotionParams,
): PromotionRequirementInfo | null {
  const { sectId, currentRank } = params
  if (currentRank >= 5) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  if (currentRank === 3) {
    return {
      targetRank,
      targetRankLabel,
      canPromote: false,
      reason:
        '晋升【三衙都虞候（Lv.4）】须凭军功奉旨推恩：入大宋禁军满一年（365日）且经义 ≤ 40 或策论 ≤ 60 后，前往【八十万禁军大教场 · 擂鼓聚将点兵帅台】面见枢密使王德用开启《太行剿匪》三部曲战役！',
    }
  }
  return {
    targetRank,
    targetRankLabel,
    canPromote: false,
    reason:
      '【殿前都指挥使（Lv.5）】掌天子亲军最高兵符，须待日后边关大捷或枢密院奉敕推恩方可升迁。',
  }
}

function evalXingxiuDuel(params: EvaluateSectPromotionParams): PromotionRequirementInfo | null {
  const {
    sectId,
    currentRank,
    xingxiuDefeatedRanks = [],
    killedDingChunqiu = false,
  } = params
  if (currentRank >= 5) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  if (currentRank === 4) {
    return {
      targetRank: 5,
      targetRankLabel,
      canPromote: killedDingChunqiu,
      reason: killedDingChunqiu
        ? `已手刃星宿老怪丁春秋，可正式登临【${targetRankLabel}】尊位！`
        : '星宿派弱肉强食，须在生死决斗中杀死掌门【丁春秋】方可取而代之成为掌门！',
    }
  }
  const beaten = xingxiuDefeatedRanks.includes(targetRank)
  const targetHint =
    targetRank === 4
      ? '1 名第 4 阶同门或大师兄【摘星子】'
      : `1 名第 ${targetRank} 阶【${targetRankLabel}】同门`
  return {
    targetRank,
    targetRankLabel,
    canPromote: beaten,
    reason: beaten
      ? `已在门派交锋中击败${targetHint}，可立即晋升【${targetRankLabel}】！`
      : `星宿派晋升只看实力，须先击败${targetHint}方可晋升【${targetRankLabel}】！`,
  }
}

function evalGaibangFavor(params: EvaluateSectPromotionParams): PromotionRequirementInfo | null {
  const { sectId, currentRank, npcFavor } = params
  if (currentRank >= 4) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  const reqByRank: Record<2 | 3 | 4, { count: number; favor: number }> = {
    2: { count: 3, favor: 30 },
    3: { count: 5, favor: 50 },
    4: { count: 10, favor: 80 },
  }
  const req = reqByRank[targetRank as 2 | 3 | 4]
  const qualifiedCount = NPCS_DB.filter(
    (n) => n.factionId === sectId && (npcFavor[n.id] ?? INITIAL_NPC_FAVOR) >= req.favor,
  ).length
  const ok = qualifiedCount >= req.count
  return {
    targetRank,
    targetRankLabel,
    canPromote: ok,
    reason: ok
      ? `已有 ${qualifiedCount} 位丐帮同门好感度 ≥ ${req.favor}，兄弟拥戴，可晋升【${targetRankLabel}】！`
      : `晋升【${targetRankLabel}】需至少 ${req.count} 位丐帮同门好感度 ≥ ${req.favor}（当前已达标 ${qualifiedCount}/${req.count} 人）。`,
  }
}

function evalShaolinZen(params: EvaluateSectPromotionParams): PromotionRequirementInfo | null {
  const { sectId, currentRank, dayCount, joinedDay, heroRealmRank, heroRealmLabel, npcFavor, skills } =
    params
  if (currentRank >= 4) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  const leaderId = getSectLeaderNpcId(sectId)
  const leaderName = (leaderId ? NPC_DB_MAP[leaderId]?.name : null) ?? '掌门'
  const leaderFavor = leaderId ? (npcFavor[leaderId] ?? INITIAL_NPC_FAVOR) : INITIAL_NPC_FAVOR
  const daysInSect = Math.max(0, dayCount - joinedDay)

  const shaolinReqs: Record<
    2 | 3 | 4,
    { minRealmRank: number; minRealmLabel: string; minDays: number; minFavor: number; minScripture: number }
  > = {
    2: { minRealmRank: 4, minRealmLabel: '二流下品', minDays: 365, minFavor: 20, minScripture: 50 },
    3: { minRealmRank: 7, minRealmLabel: '一流下品', minDays: 1800, minFavor: 50, minScripture: 70 },
    4: { minRealmRank: 10, minRealmLabel: '宗师下品', minDays: 7200, minFavor: 80, minScripture: 85 },
  }
  const req = shaolinReqs[targetRank as 2 | 3 | 4]
  const scriptureVal = skills?.['经义'] ?? 0
  const missing: string[] = []
  if (heroRealmRank < req.minRealmRank) {
    missing.push(`境界须达【${req.minRealmLabel}】（当前【${heroRealmLabel}】）`)
  }
  if (daysInSect < req.minDays) {
    missing.push(`在派天数 ${daysInSect}/${req.minDays} 天`)
  }
  if (leaderFavor < req.minFavor) {
    missing.push(`掌门【${leaderName}】好感度 ${leaderFavor}/${req.minFavor}`)
  }
  if (scriptureVal < req.minScripture) {
    missing.push(`经义 ${scriptureVal}/${req.minScripture}`)
  }
  return {
    targetRank,
    targetRankLabel,
    canPromote: missing.length === 0,
    reason:
      missing.length === 0
        ? `禅武兼修（境界${heroRealmLabel}、在派 ${daysInSect} 天、掌门好感 ${leaderFavor}、经义 ${scriptureVal}），可晋升【${targetRankLabel}】！`
        : `晋升【${targetRankLabel}】尚缺：${missing.join('、')}`,
  }
}

function evalDaoSwordTournament(
  params: EvaluateSectPromotionParams,
): PromotionRequirementInfo | null {
  const {
    sectId,
    currentRank,
    dayCount,
    joinedDay,
    heroRealmRank,
    heroRealmLabel,
    npcFavor,
    wonSectTournament,
    hasTournamentToken,
  } = params
  if (currentRank >= 4) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  const faction = FACTION_DB_MAP[sectId]
  if (currentRank >= 3) {
    return {
      targetRank,
      targetRankLabel,
      canPromote: false,
      isFirstTierPendingDesign: true,
      reason: `【${faction?.name ?? sectId}】第4阶【${targetRankLabel}】晋升任务线将于后续单独设计开放（且掌门之位不可通过常规晋升获得）。`,
    }
  }
  const leaderId = getSectLeaderNpcId(sectId)
  const leaderName = (leaderId ? NPC_DB_MAP[leaderId]?.name : null) ?? '掌门'
  const leaderFavor = leaderId ? (npcFavor[leaderId] ?? INITIAL_NPC_FAVOR) : INITIAL_NPC_FAVOR
  const daysInSect = Math.max(0, dayCount - joinedDay)

  const missing: string[] = []
  if (targetRank === 2) {
    if (heroRealmRank < 3) {
      missing.push(`境界须达【三流上品】（当前【${heroRealmLabel}】）`)
    }
    if (daysInSect < 120) {
      missing.push(`在派天数 ${daysInSect}/120 天`)
    }
    if (leaderFavor < 20) {
      missing.push(`掌门【${leaderName}】好感度 ${leaderFavor}/20`)
    }
  } else if (targetRank === 3) {
    if (heroRealmRank < 6) {
      missing.push(`境界须达【二流上品】（当前【${heroRealmLabel}】）`)
    }
    if (daysInSect < 730) {
      missing.push(`在派天数 ${daysInSect}/730 天`)
    }
    if (leaderFavor < 60) {
      missing.push(`掌门【${leaderName}】好感度 ${leaderFavor}/60`)
    }
    if (!wonSectTournament && !hasTournamentToken) {
      missing.push('须曾夺得【宗门大比】第一名并持有《宗门大比冠军信物》')
    }
  }
  return {
    targetRank,
    targetRankLabel,
    canPromote: missing.length === 0,
    reason:
      missing.length === 0
        ? `境界（${heroRealmLabel}）、资历（在派 ${daysInSect} 天）与掌门好感（${leaderFavor}）皆已齐备，可晋升为【${targetRankLabel}】！`
        : `晋升【${targetRankLabel}】尚缺：${missing.join('、')}`,
  }
}

function evalMinorOrSecondTier(
  params: EvaluateSectPromotionParams,
): PromotionRequirementInfo | null {
  const { sectId, currentRank, dayCount, joinedDay, heroRealmRank, heroRealmLabel, npcFavor } =
    params
  if (currentRank >= 4) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  const leaderId = getSectLeaderNpcId(sectId)
  const leaderName = (leaderId ? NPC_DB_MAP[leaderId]?.name : null) ?? '掌门'
  const leaderFavor = leaderId ? (npcFavor[leaderId] ?? INITIAL_NPC_FAVOR) : INITIAL_NPC_FAVOR
  const daysInSect = Math.max(0, dayCount - joinedDay)

  const thresholds: Record<
    2 | 3 | 4,
    { minRealmRank: number; minRealmLabel: string; minDays: number; minFavor: number }
  > = {
    2: { minRealmRank: 2, minRealmLabel: '三流中品', minDays: 60, minFavor: 20 },
    3: { minRealmRank: 4, minRealmLabel: '二流下品', minDays: 365, minFavor: 50 },
    4: { minRealmRank: 6, minRealmLabel: '二流上品', minDays: 730, minFavor: 80 },
  }

  const req = thresholds[targetRank as 2 | 3 | 4]
  const missing: string[] = []
  if (heroRealmRank < req.minRealmRank) {
    missing.push(`境界须达【${req.minRealmLabel}】（当前【${heroRealmLabel}】）`)
  }
  if (daysInSect < req.minDays) {
    missing.push(`在派天数 ${daysInSect}/${req.minDays} 天`)
  }
  if (leaderFavor < req.minFavor) {
    missing.push(`掌门【${leaderName}】好感度 ${leaderFavor}/${req.minFavor}`)
  }

  return {
    targetRank,
    targetRankLabel,
    canPromote: missing.length === 0,
    reason:
      missing.length === 0
        ? `境界（${heroRealmLabel}）、资历（在派 ${daysInSect} 天）与掌门好感（${leaderFavor}）皆已齐备，可晋升为【${targetRankLabel}】！`
        : `晋升【${targetRankLabel}】尚缺：${missing.join('、')}`,
  }
}

function evalFirstTierPending(
  params: EvaluateSectPromotionParams,
): PromotionRequirementInfo | null {
  const { sectId, currentRank } = params
  if (currentRank >= 4) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  const faction = FACTION_DB_MAP[sectId]
  return {
    targetRank,
    targetRankLabel,
    canPromote: false,
    isFirstTierPendingDesign: true,
    reason: `【${faction?.name ?? sectId}】乃一流宗门，专属晋升考核体系将于后续单独实装（且掌门之位不可通过常规晋升获得）。`,
  }
}

function evalHuashanQuest(
  params: EvaluateSectPromotionParams,
): PromotionRequirementInfo | null {
  const { sectId, currentRank } = params
  if (currentRank >= 5) return null
  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)
  if (currentRank === 1) {
    return {
      targetRank,
      targetRankLabel,
      canPromote: false,
      reason:
        '晋升【内门剑士（Lv.2）】须按西岳师承试剑：先完成外门《药王除恶 · 十二初试》，再赴【华山绝顶论剑台 · 博台孤峰弈棋亭】完成《博台大比 · 剑气分宗》夺魁并择定气宗或剑宗道途！',
    }
  }
  if (currentRank === 2) {
    return {
      targetRank,
      targetRankLabel,
      canPromote: false,
      reason:
        '晋升【真传弟子（Lv.3）】须历练本脉内门三卷：气宗完成《楼观护道 · 希夷剑韵》、剑宗完成《云台残局 · 希夷求变》悟透希夷剑理后，由岳掌门或秦剑神亲擢真传！',
    }
  }
  if (currentRank === 3) {
    return {
      targetRank,
      targetRankLabel,
      canPromote: false,
      reason:
        '晋升【护法/执剑长老（Lv.4）】须修成《太岳三青峰》、历思过崖秘洞抉择，并驰援长安完成《雁塔风雷 · 京兆除魔》救回同门宿老后，由四老联署册封！',
    }
  }
  return {
    targetRank,
    targetRankLabel,
    canPromote: false,
    reason:
      '【华山掌门（Lv.5）】统摄西岳剑气大权，须觉醒天阶绝学（气宗《紫霞神功》或剑宗《独孤九剑》）并完成终局战役（《紫霞浩荡》《剑压紫霞》或《两仪归元》）方可登位！',
  }
}

const PROMOTION_STRATEGY_BY_KIND: Record<
  SectPromotionRuleKind,
  (params: EvaluateSectPromotionParams) => PromotionRequirementInfo | null
> = {
  kaifeng_cases: evalKaifengCases,
  imperial_guard_merit: evalImperialGuardMerit,
  huashan_quest: evalHuashanQuest,
  xingxiu_duel: evalXingxiuDuel,
  gaibang_favor: evalGaibangFavor,
  shaolin_zen: evalShaolinZen,
  dao_sword_tournament: evalDaoSwordTournament,
  minor_or_second_tier: evalMinorOrSecondTier,
  first_tier_pending: evalFirstTierPending,
}

export function evaluateSectPromotion(
  params: EvaluateSectPromotionParams,
): PromotionRequirementInfo | null {
  const rule = getSectRule(params.sectId)
  const faction = FACTION_DB_MAP[params.sectId]
  const resolvedKind: SectPromotionRuleKind =
    rule?.promotionRuleKind ??
    (faction && (faction.sectTier === '二流门派' || faction.sectTier === '三流小派')
      ? 'minor_or_second_tier'
      : 'first_tier_pending')
  return PROMOTION_STRATEGY_BY_KIND[resolvedKind](params)
}
