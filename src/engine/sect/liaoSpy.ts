import { BUILDING_DB_MAP, REGION_DB_MAP, SECT_SYSTEMS_DB } from '../../data/gameDb'
import { DEFAULT_EQUIPPED_SLOTS } from '../../data/itemsDb'
import type { ActiveLiaoSpyMission, NodeNpc, SectRankLevel } from '../../types/game'
import { defaultRng, type RngFn } from '../combat/rng'

export const CHANGSHAN_ADULT_AGE = 18
export const LIAO_SPY_HALF_YEAR_DAYS = 180
export const SEMI_ANNUAL_DEADLINE_DAYS = 60

/**
 * Compute the latest semi-annual dispatch period (Feb 1 = 31st day of year, Aug 1 = 211th day of year)
 * for any dayCount >= 1 (0 returns period 0).
 */
export function getHalfYearPeriodInfo(dayCount: number): {
  latestPeriod: number
  latestDispatchDay: number
} {
  if (dayCount <= 0) {
    return { latestPeriod: 0, latestDispatchDay: 0 }
  }
  const zeroIdx = dayCount - 1
  const yearOffset = Math.floor(zeroIdx / 360)
  const dayInYear = (zeroIdx % 360) + 1
  if (dayInYear < 31) {
    return {
      latestPeriod: yearOffset * 2,
      latestDispatchDay: yearOffset > 0 ? (yearOffset - 1) * 360 + 211 : 0,
    }
  }
  if (dayInYear < 211) {
    return {
      latestPeriod: yearOffset * 2 + 1,
      latestDispatchDay: yearOffset * 360 + 31,
    }
  }
  return {
    latestPeriod: yearOffset * 2 + 2,
    latestDispatchDay: yearOffset * 360 + 211,
  }
}

function randomIntInclusive(min: number, max: number, rng: RngFn): number {
  return min + Math.floor(rng() * (max - min + 1))
}

export function spawnAnnualLiaoSpy(
  periodIndex: number,
  currentDay: number,
  sectRank: SectRankLevel = 1,
  rng: RngFn = defaultRng,
): ActiveLiaoSpyMission {
  const { locations, roster, strengthTiers } = SECT_SYSTEMS_DB.liaoSpy
  const locPick = locations[Math.floor(rng() * locations.length)] ?? locations[0]!
  const spyIdentity =
    roster[(periodIndex - 1 + Math.floor(rng() * roster.length)) % roster.length] ?? roster[0]!
  const tierPool =
    sectRank <= 1
      ? strengthTiers.filter((t) => t.realm === '三流下品')
      : sectRank === 2
        ? strengthTiers.filter(
            (t) => t.realm === '三流中品' || t.realm === '三流上品' || t.realm === '二流下品',
          )
        : strengthTiers.filter((t) => t.realm !== '三流下品')
  const strengthTier = tierPool[Math.floor(rng() * tierPool.length)] ?? strengthTiers[0]!

  const reg = REGION_DB_MAP[locPick.regionId]
  const bldg = BUILDING_DB_MAP[locPick.buildingId]
  const spot =
    locPick.spotId && bldg?.interior
      ? (bldg.interior.spots.find((s) => s.id === locPick.spotId) ?? null)
      : null

  const artLevel = strengthTier.artLevel
  const qinggongId = strengthTier.isTier2 ? 'MA-077' : 'MA-177'
  const move2Id = strengthTier.isTier2 ? 'MA-073' : 'MA-207'
  const weaponId = strengthTier.isTier2 ? 'WPN-047' : 'WPN-066'

  return {
    yearIndex: periodIndex,
    deadlineDay: currentDay + SEMI_ANNUAL_DEADLINE_DAYS,
    npcId: `DYN-LIAO-SPY-P${periodIndex}`,
    name: spyIdentity.name,
    title: spyIdentity.title,
    regionId: locPick.regionId,
    regionName: reg?.name ?? '析津府',
    buildingId: locPick.buildingId,
    buildingName: bldg?.name ?? '幽州胡姬羊酒楼',
    spotId: locPick.spotId,
    spotName: spot?.name ?? null,
    realm: strengthTier.realm as ActiveLiaoSpyMission['realm'],
    stats: {
      hp: randomIntInclusive(strengthTier.hpRange[0], strengthTier.hpRange[1], rng),
      mp: randomIntInclusive(strengthTier.mpRange[0], strengthTier.mpRange[1], rng),
      agi: randomIntInclusive(strengthTier.agiRange[0], strengthTier.agiRange[1], rng),
      res: randomIntInclusive(strengthTier.resRange[0], strengthTier.resRange[1], rng),
      isBenchmark: false,
    },
    equippedArts: {
      neigong: 'MA-232', // 大漠狼息功
      qinggong: qinggongId,
      move1: 'MA-133', // 西夏弯刀术
      move2: move2Id,
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-232', level: artLevel, exp: 0 },
      { artId: qinggongId, level: artLevel, exp: 0 },
      { artId: 'MA-133', level: artLevel, exp: 0 },
      { artId: move2Id, level: artLevel, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: weaponId,
    },
  }
}

export function buildNodeNpcFromLiaoSpy(spy: ActiveLiaoSpyMission): NodeNpc {
  const fullLoc = spy.spotName
    ? `${spy.regionName} > ${spy.buildingName} > ${spy.spotName}`
    : `${spy.regionName} > ${spy.buildingName}`
  return {
    id: spy.npcId,
    name: spy.name,
    title: `辽国暗桩 · ${spy.title}`,
    realm: spy.realm,
    factionId: 'SECT-20',
    factionName: '辽国武林暗桩',
    sectRank: 2,
    sectRankLabel: '红牌武士',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: spy.stats,
    talents: { bone: 48, comprehension: 44, charm: 35 },
    fullLocationLabel: fullLoc,
    equippedArts: spy.equippedArts,
    learnedArts: spy.learnedArts,
    equipped: { ...spy.equipped },
    isDynamicLiaoSpy: true,
    talk: `“哼，常山枪派的宋狗竟敢摸到${spy.regionName}来寻死！今日既撞破本座行藏，唯有一人能活着走出此门！”`,
  }
}
