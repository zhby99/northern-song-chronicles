import { BUILDINGS_DB, SECT_SYSTEMS_DB } from '../../data/gameDb'
import type { ActiveKaifengWarrant, NodeNpc, SectRankLevel } from '../../types/game'
import { defaultRng, type RngFn } from '../combat/rng'
import { makeQuestNpc } from '../npcFactory'
import { parseRealmTier } from '../stats/realmUtils'
import { findBestRoute, WORLD_GRAPH } from '../world/mapMath'

export function getSectRouteDistanceLi(fromRegionId: string, toRegionId: string): number | null {
  if (fromRegionId === toRegionId) return 0
  const route = findBestRoute(
    fromRegionId,
    toRegionId,
    { mountKey: 'walk', agility: 30, ridingSkill: 0, qinggongBonus: 0 },
    null,
  )
  return route ? route.totalLi : null
}

export function generateKaifengWarrant(
  dayCount: number,
  rank: SectRankLevel = 1,
  options?: { deadlineDay?: number; rng?: RngFn },
): ActiveKaifengWarrant | null {
  if (rank >= 4) return null
  const rng = options?.rng ?? defaultRng
  const { investigationCases, warrantCriminals } = SECT_SYSTEMS_DB.kaifeng

  const nearbyCities = WORLD_GRAPH.nodes.filter((n) => {
    if (n.type !== 'city' || n.regime !== 'song' || n.id === 'bianliang') return false
    const dist = getSectRouteDistanceLi('bianliang', n.id)
    return dist !== null && dist > 0 && dist <= 2500
  })
  const pool =
    nearbyCities.length > 0
      ? nearbyCities
      : WORLD_GRAPH.nodes.filter(
          (n) => n.type === 'city' && n.regime === 'song' && n.id !== 'bianliang',
        )
  const city = pool[Math.floor(rng() * pool.length)]
  if (!city) return null

  const bldgs = BUILDINGS_DB.filter(
    (b) =>
      b.regionId === city.id &&
      !b.isSpecial &&
      (b.id.endsWith('_base_tavern') || b.id.endsWith('_base_inn')),
  )
  const bldg = bldgs[Math.floor(rng() * bldgs.length)]
  if (!bldg) return null

  // Lv1：调查情报和线索
  if (rank === 1) {
    const caseTpl = investigationCases[Math.floor(rng() * investigationCases.length)]!
    return {
      id: `KF_I_${dayCount}_${Math.floor(rng() * 10000)}`,
      kind: 'investigate',
      targetName: caseTpl.name,
      targetTitle: caseTpl.subType,
      realm: '不入流',
      stats: { hp: 220, mp: 80, agi: 16, res: 8, isBenchmark: false },
      regionId: city.id,
      regionName: city.name,
      buildingId: bldg.id,
      buildingName: bldg.name,
      acceptedDay: dayCount,
      deadlineDay: options?.deadlineDay,
      clueNpcName: caseTpl.informantName,
      clueNpcTitle: caseTpl.informantTitle,
      clueTalk: caseTpl.informantTalk,
      clueDetail: caseTpl.summary,
    }
  }

  // Lv2：三流中品到二流下品；Lv3：二流下品到二流上品
  const allowedRealms =
    rank === 2
      ? new Set(['三流中品', '三流上品', '二流下品'])
      : new Set(['二流下品', '二流中品', '二流上品'])
  const crimPool = warrantCriminals.filter((c) => allowedRealms.has(c.realm))
  const crim = crimPool[Math.floor(rng() * crimPool.length)] ?? warrantCriminals[0]!
  const r = parseRealmTier(crim.realm).rank
  const stats =
    r <= 2
      ? { hp: 520, mp: 260, agi: 26, res: 14, isBenchmark: false }
      : r === 3
        ? { hp: 720, mp: 440, agi: 32, res: 19, isBenchmark: false }
        : r === 4
          ? { hp: 1020, mp: 720, agi: 38, res: 25, isBenchmark: false }
          : r === 5
            ? { hp: 1320, mp: 1020, agi: 44, res: 31, isBenchmark: false }
            : { hp: 1680, mp: 1380, agi: 50, res: 38, isBenchmark: false }

  return {
    id: `KF_W_${dayCount}_${Math.floor(rng() * 10000)}`,
    kind: 'arrest',
    targetName: crim.name,
    targetTitle: crim.title,
    realm: crim.realm,
    stats,
    regionId: city.id,
    regionName: city.name,
    buildingId: bldg.id,
    buildingName: bldg.name,
    acceptedDay: dayCount,
    deadlineDay: options?.deadlineDay,
  }
}

export function buildNodeNpcFromKaifengWarrant(warrant: ActiveKaifengWarrant): NodeNpc {
  if (warrant.kind === 'investigate') {
    const name = warrant.clueNpcName ?? '案情证人'
    const title = `六扇门案情线索 · ${warrant.clueNpcTitle ?? '知情人士'}`
    return makeQuestNpc({
      id: `KAIFENG_WARRANT_${warrant.id}`,
      name,
      title,
      realm: '不入流',
      factionId: 'ORG-01',
      factionName: '民间证人',
      stats: warrant.stats,
      talents: { bone: 35, comprehension: 45, charm: 40 },
      fullLocationLabel: `${warrant.regionName} > ${warrant.buildingName}`,
      isDynamicKaifengWarrant: true,
      kaifengWarrantKind: 'investigate',
      questBadgeLabel: '案情线索',
      talk: warrant.clueTalk ?? `“官爷可是奉六扇门差遣前来查访【${warrant.targetName}】的？”`,
    })
  }

  return makeQuestNpc({
    id: `KAIFENG_WARRANT_${warrant.id}`,
    name: warrant.targetName,
    title: `海捕要犯 · ${warrant.targetTitle}`,
    realm: warrant.realm,
    factionId: 'SECT-18',
    factionName: '绿林通缉要犯',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: warrant.stats,
    talents: { bone: 45, comprehension: 40, charm: 30 },
    fullLocationLabel: `${warrant.regionName} > ${warrant.buildingName}`,
    isDynamicKaifengWarrant: true,
    kaifengWarrantKind: 'arrest',
    questBadgeLabel: '海捕要犯',
    talk: `“哼，开封府的鹰爪子居然追到${warrant.regionName}来了！想要捉拿爷爷，先问过手中兵刃！”`,
  })
}
