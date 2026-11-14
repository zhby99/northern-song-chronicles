export interface RealmTier {
  rank: number
  label: string
  minAvg: number
  majorGroup: '不入流' | '三流' | '二流' | '一流' | '宗师' | '大宗师'
}

/**
 * 北宋江湖十六阶武学境界体系（阈值严格校准自 src/data/npcs.json 1,000 名 NPC 的 (hp + mp) / 2 实测分布）
 */
export const REALM_TIERS: readonly RealmTier[] = [
  { rank: 0, label: '不入流', minAvg: 0, majorGroup: '不入流' },
  { rank: 1, label: '三流下品', minAvg: 210, majorGroup: '三流' },
  { rank: 2, label: '三流中品', minAvg: 365, majorGroup: '三流' },
  { rank: 3, label: '三流上品', minAvg: 555, majorGroup: '三流' },
  { rank: 4, label: '二流下品', minAvg: 800, majorGroup: '二流' },
  { rank: 5, label: '二流中品', minAvg: 1110, majorGroup: '二流' },
  { rank: 6, label: '二流上品', minAvg: 1435, majorGroup: '二流' },
  { rank: 7, label: '一流下品', minAvg: 1930, majorGroup: '一流' },
  { rank: 8, label: '一流中品', minAvg: 2500, majorGroup: '一流' },
  { rank: 9, label: '一流上品', minAvg: 3200, majorGroup: '一流' },
  { rank: 10, label: '宗师下品', minAvg: 4150, majorGroup: '宗师' },
  { rank: 11, label: '宗师中品', minAvg: 5020, majorGroup: '宗师' },
  { rank: 12, label: '宗师上品', minAvg: 6260, majorGroup: '宗师' },
  { rank: 13, label: '大宗师下品', minAvg: 7600, majorGroup: '大宗师' },
  { rank: 14, label: '大宗师中品', minAvg: 8550, majorGroup: '大宗师' },
  { rank: 15, label: '大宗师上品', minAvg: 9500, majorGroup: '大宗师' },
] as const

const ALIAS_TO_RANK: Record<string, number> = {
  初入江湖: 0,
  不入流: 0,
  三流下: 1,
  三流下品: 1,
  三流中: 2,
  三流中品: 2,
  三流武者: 2,
  三流上: 3,
  三流上品: 3,
  三流巅峰: 3,
  二流下: 4,
  二流下品: 4,
  二流中: 5,
  二流中品: 5,
  二流好手: 5,
  二流高手: 5,
  二流上: 6,
  二流上品: 6,
  二流巅峰: 6,
  一流下: 7,
  一流下品: 7,
  一流中: 8,
  一流中品: 8,
  一流高手: 8,
  一流上: 9,
  一流上品: 9,
  一流巅峰: 9,
  宗师下: 10,
  宗师下品: 10,
  宗师中: 11,
  宗师中品: 11,
  宗师之境: 11,
  一代宗师: 11,
  宗师上: 12,
  宗师上品: 12,
  宗师巅峰: 12,
  大宗师下: 13,
  大宗师下品: 13,
  大宗师中: 14,
  大宗师中品: 14,
  大宗师: 14,
  大宗师上: 15,
  大宗师上品: 15,
  绝世宗师: 15,
}

export function estimateHeroRealm(maxHp: number, maxMp: number): RealmTier {
  const avg = (maxHp + maxMp) / 2
  for (let i = REALM_TIERS.length - 1; i >= 0; i -= 1) {
    if (avg >= REALM_TIERS[i].minAvg) {
      return REALM_TIERS[i]
    }
  }
  return REALM_TIERS[0]
}

export function parseRealmTier(label?: string | null): RealmTier {
  if (!label) return REALM_TIERS[0]
  const trimmed = label.trim()
  if (trimmed in ALIAS_TO_RANK) {
    return REALM_TIERS[ALIAS_TO_RANK[trimmed]]
  }

  const subOffset = trimmed.includes('上') || trimmed.includes('巅峰')
    ? 2
    : trimmed.includes('下')
      ? 0
      : 1

  if (trimmed.includes('大宗师')) return REALM_TIERS[13 + subOffset]
  if (trimmed.includes('宗师')) return REALM_TIERS[10 + subOffset]
  if (trimmed.includes('一流')) return REALM_TIERS[7 + subOffset]
  if (trimmed.includes('二流')) return REALM_TIERS[4 + subOffset]
  if (trimmed.includes('三流')) return REALM_TIERS[1 + subOffset]
  return REALM_TIERS[0]
}

/**
 * 按玩家设定规则：若任务需迎战某境界强敌，则建议玩家至少高出 1 阶再行接战（如 二流下品 -> 二流中品）
 */
export function getNextHigherRealm(opponentRealm?: string | null): RealmTier {
  const base = parseRealmTier(opponentRealm)
  const nextRank = Math.min(REALM_TIERS.length - 1, base.rank + 1)
  return REALM_TIERS[nextRank]
}

export type RealmReadinessStatus = 'ready' | 'challenging' | 'dangerous'

export interface QuestRealmReadiness {
  playerRealm: RealmTier
  recommendedRealm: RealmTier
  status: RealmReadinessStatus
  statusLabel: string
  delta: number
}

export function assessQuestRealmReadiness(
  playerMaxHp: number,
  playerMaxMp: number,
  recommendedRealm?: string | null,
  maxOpponentRealm?: string | null,
): QuestRealmReadiness {
  const playerRealm = estimateHeroRealm(playerMaxHp, playerMaxMp)
  const recTier = recommendedRealm
    ? parseRealmTier(recommendedRealm)
    : maxOpponentRealm
      ? getNextHigherRealm(maxOpponentRealm)
      : REALM_TIERS[1]
  const delta = playerRealm.rank - recTier.rank

  if (delta >= 0) {
    return {
      playerRealm,
      recommendedRealm: recTier,
      status: 'ready',
      statusLabel: '修为足堪胜任',
      delta,
    }
  }
  if (delta === -1) {
    return {
      playerRealm,
      recommendedRealm: recTier,
      status: 'challenging',
      statusLabel: '略低于建议',
      delta,
    }
  }
  return {
    playerRealm,
    recommendedRealm: recTier,
    status: 'dangerous',
    statusLabel: '修为未足·凶险',
    delta,
  }
}
