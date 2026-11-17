import { FACTION_DB_MAP, MARTIAL_ARTS_DB, NPCS_DB } from '../../data/gameDb'
import type {
  CompiledMartialArtRecord,
  PlayerSectState,
  SectRankLevel,
  SectTournamentOpponent,
} from '../../types/game'
import { getSectRule } from './rules'

export const SHAOLIN_CHORE_TARGET_DAYS = 365

export const DEFAULT_PLAYER_SECT_STATE: PlayerSectState = {
  sectId: null,
  rank: 1,
  rankLabel: '无门无派',
  contribution: 0,
  joinedDay: 0,
  lastStipendMonth: 0,
  toumingzhuangState: 'none',
  songCourtBlacklisted: false,
  liaoSuspicionDebuff: false,
  bribedReferralSects: [],
  claimedKaifengLetter: false,
  lastLiaoSpyMissionYear: 0,
  changshanMissedCount: 0,
  activeLiaoSpy: null,
  activeSectTask: null,
  lastTournamentYear: 0,
  wonSectTournament: false,
  activeSectTournament: null,
  xingxiuDefeatedRanks: [],
  killedDingChunqiu: false,
  kaifengCasesSolved: 0,
  kaifengMissedCount: 0,
  lastKaifengCasePeriod: 0,
  kaifengRank2Day: null,
  activeKaifengWarrant: null,
  shaolinNoviceState: 'none',
  shaolinChoreDays: 0,
  shaolinDiscipleType: 'lay',
}

export function getSectRankTitle(sectId: string | null, rank: SectRankLevel): string {
  if (!sectId) return '无门无派'
  const f = FACTION_DB_MAP[sectId]
  const titles = f?.rankTitles
  if (titles && titles.length >= 5) {
    return titles[rank - 1] ?? '弟子'
  }
  const fallback = ['外门弟子', '内门弟子', '真传弟子', '长老', '掌门']
  return fallback[rank - 1] ?? '弟子'
}

export function clonePlayerSectState(st?: Partial<PlayerSectState> | null): PlayerSectState {
  if (!st || typeof st !== 'object') {
    return {
      ...DEFAULT_PLAYER_SECT_STATE,
      bribedReferralSects: [],
      xingxiuDefeatedRanks: [],
    }
  }
  const rankRaw = typeof st.rank === 'number' ? Math.max(1, Math.min(5, Math.floor(st.rank))) : 1
  const sectId = typeof st.sectId === 'string' && FACTION_DB_MAP[st.sectId] ? st.sectId : null
  const rank = rankRaw as SectRankLevel
  return {
    sectId,
    rank,
    rankLabel: sectId ? getSectRankTitle(sectId, rank) : '无门无派',
    contribution: typeof st.contribution === 'number' ? Math.max(0, Math.floor(st.contribution)) : 0,
    joinedDay: typeof st.joinedDay === 'number' ? Math.max(0, Math.floor(st.joinedDay)) : 0,
    lastStipendMonth:
      typeof st.lastStipendMonth === 'number' ? Math.max(0, Math.floor(st.lastStipendMonth)) : 0,
    toumingzhuangState:
      st.toumingzhuangState === 'accepted' || st.toumingzhuangState === 'completed'
        ? st.toumingzhuangState
        : 'none',
    songCourtBlacklisted: Boolean(st.songCourtBlacklisted),
    liaoSuspicionDebuff: Boolean(st.liaoSuspicionDebuff),
    bribedReferralSects: Array.isArray(st.bribedReferralSects)
      ? st.bribedReferralSects.filter((x): x is string => typeof x === 'string')
      : [],
    claimedKaifengLetter: Boolean(st.claimedKaifengLetter),
    lastLiaoSpyMissionYear:
      typeof st.lastLiaoSpyMissionYear === 'number'
        ? Math.max(0, Math.floor(st.lastLiaoSpyMissionYear))
        : 0,
    changshanMissedCount:
      typeof st.changshanMissedCount === 'number'
        ? Math.max(0, Math.floor(st.changshanMissedCount))
        : 0,
    activeLiaoSpy: st.activeLiaoSpy ? { ...st.activeLiaoSpy } : null,
    activeSectTask: st.activeSectTask ? { ...st.activeSectTask } : null,
    lastTournamentYear:
      typeof st.lastTournamentYear === 'number'
        ? Math.max(0, Math.floor(st.lastTournamentYear))
        : 0,
    wonSectTournament: Boolean(st.wonSectTournament),
    activeSectTournament: st.activeSectTournament
      ? {
          ...st.activeSectTournament,
          opponents: [...st.activeSectTournament.opponents] as [
            SectTournamentOpponent,
            SectTournamentOpponent,
            SectTournamentOpponent,
          ],
        }
      : null,
    xingxiuDefeatedRanks: Array.isArray(st.xingxiuDefeatedRanks)
      ? st.xingxiuDefeatedRanks.filter((x): x is number => typeof x === 'number')
      : [],
    killedDingChunqiu: Boolean(st.killedDingChunqiu),
    kaifengCasesSolved:
      typeof st.kaifengCasesSolved === 'number'
        ? Math.max(0, Math.floor(st.kaifengCasesSolved))
        : 0,
    kaifengMissedCount:
      typeof st.kaifengMissedCount === 'number'
        ? Math.max(0, Math.floor(st.kaifengMissedCount))
        : 0,
    lastKaifengCasePeriod:
      typeof st.lastKaifengCasePeriod === 'number'
        ? Math.max(0, Math.floor(st.lastKaifengCasePeriod))
        : 0,
    kaifengRank2Day:
      typeof st.kaifengRank2Day === 'number' ? Math.max(0, Math.floor(st.kaifengRank2Day)) : null,
    activeKaifengWarrant: st.activeKaifengWarrant ? { ...st.activeKaifengWarrant } : null,
    shaolinNoviceState:
      st.shaolinNoviceState === 'active' || st.shaolinNoviceState === 'completed'
        ? st.shaolinNoviceState
        : 'none',
    shaolinChoreDays:
      typeof st.shaolinChoreDays === 'number'
        ? Math.max(0, Math.min(SHAOLIN_CHORE_TARGET_DAYS, Math.floor(st.shaolinChoreDays)))
        : 0,
    shaolinDiscipleType: st.shaolinDiscipleType === 'monk' ? 'monk' : 'lay',
  }
}

/**
 * 脱离 / 被开除门派时的唯一状态重置入口：清空门籍、阶位与一切进行中的门派差事，
 * 保留跨门派的江湖履历（投名状、朝廷黑名单、通辽嫌疑、举荐帖、少林杂役等）。
 */
export function resetSectMembership(st: PlayerSectState): PlayerSectState {
  const leavingRule = st.sectId ? getSectRule(st.sectId) : null
  return {
    ...clonePlayerSectState(st),
    sectId: null,
    rank: 1,
    rankLabel: '无门无派',
    contribution: 0,
    activeSectTask: null,
    activeLiaoSpy: null,
    changshanMissedCount: 0,
    wonSectTournament: false,
    activeSectTournament: null,
    xingxiuDefeatedRanks: [],
    // 弑杀丁春秋为既成史实（其人已身故），离派重入后仍可凭此登临掌门
    kaifengCasesSolved: 0,
    kaifengMissedCount: 0,
    kaifengRank2Day: null,
    activeKaifengWarrant: null,
    shaolinDiscipleType: leavingRule?.resetsMonasticIdentityOnLeave
      ? 'lay'
      : st.shaolinDiscipleType,
  }
}

export function isJoinableSectFaction(factionId?: string | null): boolean {
  if (!factionId) return false
  const f = FACTION_DB_MAP[factionId]
  if (!f) return false
  return factionId.startsWith('SECT-') || factionId === 'ORG-08'
}

export function getSectLeaderNpcId(sectId?: string | null): string | null {
  if (!sectId) return null
  const f = FACTION_DB_MAP[sectId]
  return f?.leaderNpcIds?.[0] ?? null
}

/**
 * 门派事务对接人：掌门在世即为掌门；掌门身故后由门内阶位最高（同阶取名录序最前）的在世门人代掌事务，
 * 确保弑师夺位等剧情后仍能办理拜师、晋升、传功与宗门差事。
 */
export function getSectContactNpcId(
  sectId: string | null | undefined,
  deadNpcIds: readonly string[] = [],
): string | null {
  const leaderId = getSectLeaderNpcId(sectId)
  if (!sectId) return null
  if (leaderId && !deadNpcIds.includes(leaderId)) return leaderId
  let best: { id: string; rank: number } | null = null
  for (const n of NPCS_DB) {
    if (n.factionId !== sectId || deadNpcIds.includes(n.id)) continue
    const rank = n.sectRank ?? 0
    if (!best || rank > best.rank) best = { id: n.id, rank }
  }
  return best?.id ?? null
}

/**
 * Get all martial arts teachable in `sectId`, including shared Lv.1..2 Shaolin arts for SECT-04 南少林.
 */
export interface SectTeachableArtInfo {
  art: CompiledMartialArtRecord
  requiredRank: SectRankLevel
  requiredRankLabel: string
  isSharedFromShaolin: boolean
}

export function getSectTeachableArts(sectId: string): SectTeachableArtInfo[] {
  const faction = FACTION_DB_MAP[sectId]
  if (!faction) return []

  const list: SectTeachableArtInfo[] = []
  const seen = new Set<string>()

  // Shared martial art rule (e.g. SECT-04 南少林 shares SECT-01 少林 Lv.1 & Lv.2 arts)
  if (faction.sharedMartialArtRule) {
    const { sourceSectId, maxRank } = faction.sharedMartialArtRule
    for (const art of MARTIAL_ARTS_DB) {
      if (art.sectId !== sourceSectId || art.minSectRank == null) continue
      const reqRank = Math.max(1, Math.min(5, art.minSectRank)) as SectRankLevel
      if (reqRank <= maxRank && !seen.has(art.id)) {
        seen.add(art.id)
        list.push({
          art,
          requiredRank: reqRank,
          requiredRankLabel: getSectRankTitle(sectId, reqRank),
          isSharedFromShaolin: true,
        })
      }
    }
  }

  for (const art of MARTIAL_ARTS_DB) {
    if (art.sectId !== sectId || art.minSectRank == null || seen.has(art.id)) continue
    seen.add(art.id)
    const reqRank = Math.max(1, Math.min(5, art.minSectRank)) as SectRankLevel
    list.push({
      art,
      requiredRank: reqRank,
      requiredRankLabel:
        reqRank === 3
          ? `${getSectRankTitle(sectId, 3)} / ${getSectRankTitle(sectId, 4)}`
          : getSectRankTitle(sectId, reqRank),
      isSharedFromShaolin: false,
    })
  }

  const tierOrder: Record<string, number> = {
    凡品下品: 1,
    凡品中品: 2,
    凡品上品: 3,
    良品下品: 4,
    良品中品: 5,
    良品上品: 6,
    地阶下品: 7,
    地阶中品: 8,
    地阶上品: 9,
    天阶下品: 10,
    天阶中品: 11,
    天阶上品: 12,
  }

  return list.sort((a, b) => {
    if (a.requiredRank !== b.requiredRank) return a.requiredRank - b.requiredRank
    const ta = tierOrder[a.art.fullTier] ?? 99
    const tb = tierOrder[b.art.fullTier] ?? 99
    if (ta !== tb) return ta - tb
    return a.art.id.localeCompare(b.art.id)
  })
}

export function canPlayerLearnSectArt(
  playerRank: SectRankLevel,
  requiredRank: SectRankLevel,
): boolean {
  // Rank 3 (真传弟子) and Rank 4 (长老) share strictly identical martial-art permissions!
  // Rank 5 (掌门) unlocks 天阶上品 (requiredRank === 5).
  const effectivePlayerRank = playerRank === 3 ? 4 : playerRank
  return effectivePlayerRank >= requiredRank
}

/**
 * 南北少林专属僧俗戒律：
 * - 嵩山少林寺（SECT-01）：所有地阶与天阶武学均不对俗家弟子开放，须找方丈玄慈剃度转为出家弟子（法号慧见）方可修习。
 * - 莆田南少林（SECT-04）：入门奉茶择定衣钵时若选【带发入世 · 护寺俗家】，不可事后补剃度，本门地阶功法对主角永远不开放。
 */
export function isShaolinArtBlockedForLayDisciple(
  sectId: string | null | undefined,
  art: CompiledMartialArtRecord,
  shaolinDiscipleType?: 'lay' | 'monk',
): boolean {
  const rule = getSectRule(sectId)
  if (!rule?.blocksHighTierForLayDisciple) return false
  if (shaolinDiscipleType === 'monk') return false
  return art.tier === '地阶' || art.tier === '天阶'
}

export function isMinorOrSecondTierSect(sectId?: string | null): boolean {
  if (!sectId) return false
  const f = FACTION_DB_MAP[sectId]
  return f?.sectTier === '二流门派' || f?.sectTier === '三流小派'
}

/**
 * 除显式关闭宗门差事的势力（如开封府/六扇门 SECT-17）外，所有三流、二流与一流门派均可向掌门领取宗门任务
 */
export function canReceiveSectLeaderTask(sectId?: string | null): boolean {
  if (!sectId) return false
  const rule = getSectRule(sectId)
  if (rule?.canReceiveLeaderTask === false) return false
  const f = FACTION_DB_MAP[sectId]
  if (!f) return false
  return f.sectTier === '一流大派' || f.sectTier === '二流门派' || f.sectTier === '三流小派'
}
