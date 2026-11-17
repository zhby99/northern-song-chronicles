import { FACTION_DB_MAP, NPCS_DB, SECT_SYSTEMS_DB } from '../../data/gameDb'
import type {
  ActiveSectTournament,
  NodeNpc,
  SectRankLevel,
  SectTournamentOpponent,
} from '../../types/game'
import { defaultRng, type RngFn } from '../combat/rng'
import { makeQuestNpc, npcFromDb } from '../npcFactory'
import { parseRealmTier } from '../stats/realmUtils'
import { getSectLeaderNpcId, getSectRankTitle } from './ranks'
import { DAO_SWORD_SECT_ID_LIST, getSectRule } from './rules'

/**
 * 宗门大比体系门派（9派）：道门与名山剑派（华山/泰山/峨眉/真武/终南/青城）+ 五台山清凉寺 + 蜀中唐门 + 铁掌帮
 * 每年二月一日宗门大比 + 专属晋升规则（暂开放至 Lv.3）
 */
export const DAO_SWORD_SECT_IDS = new Set<string>(DAO_SWORD_SECT_ID_LIST)

export const SECT_TOURNAMENT_TOKEN_ITEM_ID = 'ITM-MSC-014'

export function isDaoSwordSect(sectId?: string | null): boolean {
  return Boolean(getSectRule(sectId)?.isDaoSwordTournamentSect)
}

export function getSectTournamentDateInfo(dayCount: number): {
  yearIndex: number
  isTournamentDay: boolean
} {
  const zeroIdx = Math.max(0, Math.floor(dayCount) - 1)
  const yearIndex = Math.floor(zeroIdx / 360) + 1
  const dayOfYear = zeroIdx % 360
  // 每年 360 天，每月初一为 0, 30, 60... 二月初一即 dayOfYear === 30
  return {
    yearIndex,
    isTournamentDay: dayOfYear === 30,
  }
}

function randomIntInclusive(min: number, max: number, rng: RngFn): number {
  return min + Math.floor(rng() * (max - min + 1))
}

export function generateSectTournament(
  sectId: string,
  yearIndex: number,
  rng: RngFn = defaultRng,
  deadNpcIds: readonly string[] = [],
): ActiveSectTournament | null {
  const faction = FACTION_DB_MAP[sectId]
  if (!faction || !isDaoSwordSect(sectId)) return null
  const leaderId = getSectLeaderNpcId(sectId)
  const { rounds, lastNames, firstNames } = SECT_SYSTEMS_DB.tournament

  const pool = NPCS_DB.filter((n) => {
    if (n.factionId !== sectId || n.id === leaderId || deadNpcIds.includes(n.id)) return false
    const r = parseRealmTier(n.realm).rank
    return r >= 1 && r <= 6
  })
  const usedIds = new Set<string>()
  const opponents: SectTournamentOpponent[] = []

  for (let i = 0; i < 3; i += 1) {
    const spec = rounds[i]!
    const [minRank, maxRank] = spec.rankRange
    const matching = pool.filter((n) => {
      if (usedIds.has(n.id)) return false
      const r = parseRealmTier(n.realm).rank
      return r >= minRank && r <= maxRank
    })
    const picked = matching.length > 0 ? matching[Math.floor(rng() * matching.length)]! : null

    if (picked) {
      usedIds.add(picked.id)
      opponents.push({
        npcId: picked.id,
        name: picked.name,
        title: `${faction.name} · 大比弟子`,
        realm:
          (parseRealmTier(picked.realm).label as SectTournamentOpponent['realm']) ||
          (spec.realm as SectTournamentOpponent['realm']),
        stats: { ...picked.stats },
      })
    } else {
      const surname = lastNames[(yearIndex * 3 + i) % lastNames.length]!
      const given = firstNames[(Math.floor(rng() * firstNames.length) + i) % firstNames.length]!
      opponents.push({
        npcId: `SECT_TOURNEY_${sectId}_Y${yearIndex}_R${i + 1}`,
        name: `${surname}${given}`,
        title: `${faction.name} · 大比弟子`,
        realm: spec.realm as SectTournamentOpponent['realm'],
        stats: {
          hp: randomIntInclusive(spec.hpRange[0], spec.hpRange[1], rng),
          mp: randomIntInclusive(spec.mpRange[0], spec.mpRange[1], rng),
          agi: randomIntInclusive(spec.agiRange[0], spec.agiRange[1], rng),
          res: randomIntInclusive(spec.resRange[0], spec.resRange[1], rng),
          isBenchmark: false,
        },
      })
    }
  }

  return {
    sectId,
    sectName: faction.name,
    yearIndex,
    round: 1,
    opponents: opponents as [
      SectTournamentOpponent,
      SectTournamentOpponent,
      SectTournamentOpponent,
    ],
  }
}

export function buildNodeNpcFromTournamentOpponent(
  sectId: string,
  opp: SectTournamentOpponent,
  round: 1 | 2 | 3,
): NodeNpc {
  const faction = FACTION_DB_MAP[sectId]
  const roundName = round === 1 ? '八强战' : round === 2 ? '四强半决赛' : '决赛夺魁战'
  const fromDb = npcFromDb(opp.npcId, {
    title: `${faction?.name ?? ''} · 宗门大比（${roundName}）`,
    talk: `“宗门大比【${roundName}】，请师兄/师弟赐教！”`,
  })
  if (fromDb) {
    return fromDb
  }
  return makeQuestNpc({
    id: opp.npcId,
    name: opp.name,
    title: `${opp.title}（${roundName}）`,
    realm: opp.realm,
    factionId: sectId,
    factionName: faction?.name ?? '本门',
    sectRank: round,
    sectRankLabel: getSectRankTitle(sectId, round as SectRankLevel),
    stats: opp.stats,
    talents: { bone: 45, comprehension: 48, charm: 45 },
    talk: `“宗门大比【${roundName}】，请同门赐教！”`,
  })
}
