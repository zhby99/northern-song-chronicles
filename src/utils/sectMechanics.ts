import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ARTS_DB,
  NPCS_DB,
  NPC_DB_MAP,
  REGION_DB_MAP,
} from '../data/gameDb'
import { DEFAULT_EQUIPPED_SLOTS } from '../data/itemsDb'
import type {
  ActiveLiaoSpyMission,
  CanonicalFactionEntry,
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  HeroBaseStats,
  InventoryStack,
  LearnedArtEntry,
  NodeNpc,
  PlayerSectState,
  SectRankLevel,
} from '../types/game'
import { INITIAL_NPC_FAVOR, MIN_NPC_FAVOR } from './npcFavor'

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
  activeLiaoSpy: null,
}

export function clonePlayerSectState(st?: Partial<PlayerSectState> | null): PlayerSectState {
  if (!st || typeof st !== 'object') {
    return {
      ...DEFAULT_PLAYER_SECT_STATE,
      bribedReferralSects: [],
    }
  }
  const rankRaw = typeof st.rank === 'number' ? Math.max(1, Math.min(5, Math.floor(st.rank))) : 1
  const sectId = typeof st.sectId === 'string' && FACTION_DB_MAP[st.sectId] ? st.sectId : null
  const rank = rankRaw as SectRankLevel
  return {
    sectId,
    rank,
    rankLabel: sectId
      ? getSectRankTitle(sectId, rank)
      : '无门无派',
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
    activeLiaoSpy: st.activeLiaoSpy ? { ...st.activeLiaoSpy } : null,
  }
}

export function isJoinableSectFaction(factionId?: string | null): boolean {
  if (!factionId) return false
  const f = FACTION_DB_MAP[factionId]
  if (!f) return false
  return factionId.startsWith('SECT-') || factionId === 'ORG-08'
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

/**
 * Referral bribe mapping:
 * - SECT-26 钱塘怒潮帮 (内门香主 Lv.2+ bribes 副帮主 Lv.4 20 silver) -> ITM-MSC-003 -> SECT-16 江淮漕帮
 * - SECT-25 齐鲁查拳馆 (内堂武师 Lv.2+ bribes 金牌总教头 Lv.4 20 silver) -> ITM-MSC-004 -> SECT-23 沧州八极门
 * - SECT-27 岭南洪门武馆 (内堂武师 Lv.2+ bribes 金牌总教头 Lv.4 20 silver) -> ITM-MSC-005 -> SECT-24 闽海镇远镖局
 */
export interface ReferralBribeConfig {
  sourceSectId: string
  targetSectId: string
  targetSectName: string
  itemId: string
  itemName: string
  costSilver: number
  elderTitleHint: string
}

export const REFERRAL_BRIBE_BY_SOURCE_SECT: Record<string, ReferralBribeConfig> = {
  'SECT-26': {
    sourceSectId: 'SECT-26',
    targetSectId: 'SECT-16',
    targetSectName: '江淮漕帮',
    itemId: 'ITM-MSC-003',
    itemName: '钱塘怒潮帮举荐帖',
    costSilver: 20,
    elderTitleHint: '副帮主',
  },
  'SECT-25': {
    sourceSectId: 'SECT-25',
    targetSectId: 'SECT-23',
    targetSectName: '沧州八极门',
    itemId: 'ITM-MSC-004',
    itemName: '齐鲁查拳馆举荐帖',
    costSilver: 20,
    elderTitleHint: '金牌总教头',
  },
  'SECT-27': {
    sourceSectId: 'SECT-27',
    targetSectId: 'SECT-24',
    targetSectName: '闽海镇远镖局',
    itemId: 'ITM-MSC-005',
    itemName: '岭南洪门武馆举荐帖',
    costSilver: 20,
    elderTitleHint: '金牌总教头',
  },
}

export const REFERRAL_REQ_BY_TARGET_SECT: Record<string, ReferralBribeConfig> = {
  'SECT-16': REFERRAL_BRIBE_BY_SOURCE_SECT['SECT-26']!,
  'SECT-23': REFERRAL_BRIBE_BY_SOURCE_SECT['SECT-25']!,
  'SECT-24': REFERRAL_BRIBE_BY_SOURCE_SECT['SECT-27']!,
}

export const KAIFENG_RECOMMENDATION_ITEM_ID = 'ITM-MSC-006'
export const DAMING_RECOMMENDATION_ITEM_ID = 'ITM-MSC-007'
export const BAJI_IRON_TOKEN_ITEM_ID = 'ITM-MSC-008'

/**
 * Compute monthly military stipend for SECT-22 常山枪派 based on current sect rank.
 */
export function getChangshanMonthlyStipend(rank: SectRankLevel): number {
  switch (rank) {
    case 1:
      return 25
    case 2:
      return 40
    case 3:
      return 60
    case 4:
      return 85
    case 5:
      return 120
  }
}

/**
 * Check whether an NPC is an official of the Northern Song Court eligible to be robbed
 * for the "纳投名状" quest of SECT-18 太行/京东绿林盟.
 * Excludes imperial monarchs/consorts (NPC-0001..0005).
 */
const IMPERIAL_ROYAL_IDS = new Set(['NPC-0001', 'NPC-0002', 'NPC-0003', 'NPC-0004', 'NPC-0005'])

export function isSongOfficialForRobbery(npc: {
  id?: string
  factionId?: string
}): boolean {
  if (npc.id && IMPERIAL_ROYAL_IDS.has(npc.id)) return false
  const dbNpc = npc.id ? NPC_DB_MAP[npc.id] : undefined
  const fid = npc.factionId ?? dbNpc?.factionId
  return fid === 'ORG-02' || fid === 'ORG-03' || fid === 'SECT-17'
}

/**
 * Check whether an NPC belongs to Great Song ("所有大宋的人") for the -30 favorability
 * penalty when voluntarily deserting SECT-22 常山枪派.
 */
const NON_SONG_FACTION_IDS = new Set([
  'ORG-06', // 大辽朝廷与北院
  'ORG-07', // 西夏朝廷
  'ORG-08', // 大理皇室
  'ORG-09', // 吐蕃诸部与密宗
  'ORG-10', // 高昌回鹘与西域诸国
  'ORG-11', // 海外番商与流求高丽
  'SECT-18', // 太行/京东绿林盟
  'SECT-19', // 星宿派
  'SECT-20', // 一品堂 / 辽国武林暗桩
])

export function isSongAlignedNpc(npc: CompiledNpcRecord): boolean {
  if (NON_SONG_FACTION_IDS.has(npc.factionId)) return false
  if (
    npc.factionId === 'ORG-01' ||
    npc.factionId === 'ORG-02' ||
    npc.factionId === 'ORG-03' ||
    npc.factionId === 'ORG-04' ||
    npc.factionId === 'ORG-05' ||
    npc.factionId === 'SECT-17'
  ) {
    return true
  }
  const reg = REGION_DB_MAP[npc.regionId]
  return reg?.regime === 'song'
}

export function applySongLiaoSuspicionFavorPenalty(
  currentFavorMap: Record<string, number>,
  penalty = 30,
): { nextFavor: Record<string, number>; affectedCount: number } {
  const nextFavor: Record<string, number> = { ...currentFavorMap }
  let affectedCount = 0
  for (const npc of NPCS_DB) {
    if (!isSongAlignedNpc(npc)) continue
    const cur = nextFavor[npc.id] ?? INITIAL_NPC_FAVOR
    nextFavor[npc.id] = Math.max(MIN_NPC_FAVOR, cur - penalty)
    affectedCount += 1
  }
  return { nextFavor, affectedCount }
}

/**
 * Candidate Yanyun region city leaf spots where the annual Liao Spy spawns.
 * Every candidate is a verified leaf building in a Yanyun city (析津府 / 大定府).
 */
const YANYUN_SPY_LOCATIONS: Array<{
  regionId: string
  buildingId: string
  spotId: string | null
}> = [
  {
    regionId: 'xijin_liao',
    buildingId: 'xijin_liao_base_tavern',
    spotId: null,
  },
  {
    regionId: 'xijin_liao',
    buildingId: 'xijin_liao_base_inn',
    spotId: null,
  },
  {
    regionId: 'xijin_liao',
    buildingId: 'xijin_liao_base_dojo',
    spotId: null,
  },
  {
    regionId: 'dading_liao',
    buildingId: 'dading_liao_base_tavern',
    spotId: null,
  },
  {
    regionId: 'dading_liao',
    buildingId: 'dading_liao_base_inn',
    spotId: null,
  },
]

const LIAO_SPY_ROSTER = [
  { name: '耶律寒枭', title: '辽国北院枢密密谍' },
  { name: '萧铁鹫', title: '燕云黑骑暗探统领' },
  { name: '耶律断刃', title: '析津府潜伏死士首领' },
  { name: '萧诡影', title: '契丹南院谍报细作' },
  { name: '拔里苍狼', title: '燕京虎符密使' },
]

export const CHANGSHAN_ADULT_AGE = 18
export const LIAO_SPY_HALF_YEAR_DAYS = 180

interface LiaoSpyStrengthTier {
  realm: '三流中品' | '三流上品' | '二流下品' | '二流中品'
  hpRange: [number, number]
  mpRange: [number, number]
  agiRange: [number, number]
  resRange: [number, number]
  artLevel: number
  isSecondTier: boolean
}

const LIAO_SPY_STRENGTH_TIERS: readonly LiaoSpyStrengthTier[] = [
  {
    realm: '三流中品',
    hpRange: [500, 680],
    mpRange: [240, 400],
    agiRange: [26, 34],
    resRange: [13, 21],
    artLevel: 3,
    isSecondTier: false,
  },
  {
    realm: '三流上品',
    hpRange: [701, 919],
    mpRange: [422, 649],
    agiRange: [32, 40],
    resRange: [18, 26],
    artLevel: 4,
    isSecondTier: false,
  },
  {
    realm: '二流下品',
    hpRange: [951, 1217],
    mpRange: [680, 927],
    agiRange: [38, 46],
    resRange: [24, 33],
    artLevel: 5,
    isSecondTier: true,
  },
  {
    realm: '二流中品',
    hpRange: [1255, 1579],
    mpRange: [966, 1275],
    agiRange: [44, 52],
    resRange: [30, 39],
    artLevel: 6,
    isSecondTier: true,
  },
]

function randomIntInclusive(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function spawnAnnualLiaoSpy(periodIndex: number, currentDay: number): ActiveLiaoSpyMission {
  const locPick =
    YANYUN_SPY_LOCATIONS[Math.floor(Math.random() * YANYUN_SPY_LOCATIONS.length)] ??
    YANYUN_SPY_LOCATIONS[0]!
  const spyIdentity =
    LIAO_SPY_ROSTER[(periodIndex - 1 + Math.floor(Math.random() * LIAO_SPY_ROSTER.length)) % LIAO_SPY_ROSTER.length] ??
    LIAO_SPY_ROSTER[0]!
  const strengthTier =
    LIAO_SPY_STRENGTH_TIERS[Math.floor(Math.random() * LIAO_SPY_STRENGTH_TIERS.length)] ??
    LIAO_SPY_STRENGTH_TIERS[0]!

  const reg = REGION_DB_MAP[locPick.regionId]
  const bldg = BUILDING_DB_MAP[locPick.buildingId]
  const spot =
    locPick.spotId && bldg?.interior
      ? (bldg.interior.spots.find((s) => s.id === locPick.spotId) ?? null)
      : null

  const artLevel = strengthTier.artLevel
  const qinggongId = strengthTier.isSecondTier ? 'MA-077' : 'MA-177'
  const move2Id = strengthTier.isSecondTier ? 'MA-073' : 'MA-207'
  const weaponId = strengthTier.isSecondTier ? 'WPN-047' : 'WPN-066'

  return {
    yearIndex: periodIndex,
    deadlineDay: currentDay + LIAO_SPY_HALF_YEAR_DAYS,
    npcId: `DYN-LIAO-SPY-P${periodIndex}`,
    name: spyIdentity.name,
    title: spyIdentity.title,
    regionId: locPick.regionId,
    regionName: reg?.name ?? '析津府',
    buildingId: locPick.buildingId,
    buildingName: bldg?.name ?? '幽州胡姬羊酒楼',
    spotId: locPick.spotId,
    spotName: spot?.name ?? null,
    realm: strengthTier.realm,
    stats: {
      hp: randomIntInclusive(strengthTier.hpRange[0], strengthTier.hpRange[1]),
      mp: randomIntInclusive(strengthTier.mpRange[0], strengthTier.mpRange[1]),
      agi: randomIntInclusive(strengthTier.agiRange[0], strengthTier.agiRange[1]),
      res: randomIntInclusive(strengthTier.resRange[0], strengthTier.resRange[1]),
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

export function buildZhanZhaoArrestNodeNpc(): NodeNpc {
  const zhan = NPC_DB_MAP['NPC-0140']
  if (zhan) {
    return {
      id: zhan.id,
      name: zhan.name,
      title: `${zhan.factionName} · ${zhan.role}`,
      realm: zhan.realm,
      factionId: zhan.factionId,
      factionName: zhan.factionName,
      sectRank: zhan.sectRank,
      sectRankLabel: zhan.sectRankLabel,
      avatarUrl: zhan.avatarUrl ?? zhan.templateAvatarUrl,
      portraitUrl: zhan.fullbodyUrl ?? zhan.templateUrl,
      stats: zhan.stats,
      talents: zhan.talents,
      tenArts: zhan.tenArts,
      fullLocationLabel: zhan.fullLocationLabel,
      equippedArts: zhan.equippedArts,
      learnedArts: zhan.learnedArts,
      equipped: zhan.equipped,
      talk: '“大胆绿林狂徒，劫掠朝廷命官，名列开封府海捕文书，竟还敢踏入东京汴梁城门！巨阙出鞘，束手就擒吧！”',
    }
  }
  return {
    id: 'NPC-0140',
    name: '展昭',
    title: '开封府 · 御前四品带刀护卫',
    realm: '一流高手',
    factionId: 'SECT-17',
    factionName: '开封府 / 六扇门',
    stats: { hp: 3973, mp: 3627, agi: 69, res: 59, isBenchmark: false },
    talk: '“大胆狂徒，劫掠朝廷命官后竟敢踏入开封府！拿命来！”',
  }
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
 * Promotion requirements within a sect (Lv.1 -> Lv.2 -> Lv.3 -> Lv.4 -> Lv.5).
 */
export interface PromotionRequirementInfo {
  targetRank: SectRankLevel
  targetRankLabel: string
  requiredContribution: number
  requiredSectArtLevel: number
  canPromote: boolean
  reason: string
}

export function evaluateSectPromotion(params: {
  sectId: string
  currentRank: SectRankLevel
  contribution: number
  learnedArts: LearnedArtEntry[]
}): PromotionRequirementInfo | null {
  const { sectId, currentRank, contribution, learnedArts } = params
  if (currentRank >= 5) return null

  const targetRank = (currentRank + 1) as SectRankLevel
  const targetRankLabel = getSectRankTitle(sectId, targetRank)

  const thresholds: Record<2 | 3 | 4 | 5, { contrib: number; artLv: number }> = {
    2: { contrib: 60, artLv: 2 },
    3: { contrib: 150, artLv: 4 },
    4: { contrib: 280, artLv: 6 },
    5: { contrib: 480, artLv: 8 },
  }
  const req = thresholds[targetRank as 2 | 3 | 4 | 5]

  const sectArtSet = new Set(getSectTeachableArts(sectId).map((x) => x.art.id))
  const maxSectArtLv = learnedArts
    .filter((e) => sectArtSet.has(e.artId))
    .reduce((acc, cur) => Math.max(acc, cur.level), 0)

  const missing: string[] = []
  if (contribution < req.contrib) {
    missing.push(`门派功绩 ${contribution}/${req.contrib}`)
  }
  if (maxSectArtLv < req.artLv) {
    missing.push(`至少一门本门武学修至第 ${req.artLv} 重（当前最高 ${maxSectArtLv} 重）`)
  }

  return {
    targetRank,
    targetRankLabel,
    requiredContribution: req.contrib,
    requiredSectArtLevel: req.artLv,
    canPromote: missing.length === 0,
    reason:
      missing.length === 0
        ? `功绩与武学火候皆已齐备，可晋升为【${targetRankLabel}】！`
        : `晋升【${targetRankLabel}】尚缺：${missing.join('、')}`,
  }
}

/**
 * Evaluate entry requirements for joining `targetSectId` (3rd-tier, 2nd-tier, or 1st-tier).
 */
export interface SectJoinEvaluation {
  canJoin: boolean
  startingRank: SectRankLevel
  startingRankLabel: string
  costSilver: number
  consumeItemId: string | null
  requirementSummary: string
  blockedReason: string | null
  allowOfficialTransferFromChangshan?: boolean
}

const DLC_LOCKED_SECTS = new Set([
  'ORG-08',
  'SECT-09',
  'SECT-10',
  'SECT-12',
  'SECT-20',
  'SECT-31',
  'SECT-32',
])

export function evaluateSectEntry(params: {
  targetSectId: string
  sectState: PlayerSectState
  silver: number
  baseStats: HeroBaseStats
  inventory: InventoryStack[]
}): SectJoinEvaluation {
  const { targetSectId, sectState, silver, baseStats, inventory } = params
  const faction: CanonicalFactionEntry | undefined = FACTION_DB_MAP[targetSectId]
  const startingRank: SectRankLevel = faction?.acceptsOuterDisciple === false ? 2 : 1
  const startingRankLabel = getSectRankTitle(targetSectId, startingRank)

  if (!faction) {
    return {
      canJoin: false,
      startingRank: 1,
      startingRankLabel: '外门弟子',
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: '未知势力',
      blockedReason: '该势力暂不收徒。',
    }
  }

  if (DLC_LOCKED_SECTS.has(targetSectId)) {
    return {
      canJoin: false,
      startingRank,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: '暂未开放加入（后续剧情 / DLC 敬请期待）',
      blockedReason: `【${faction.name}】暂不开放拜入，相关专属剧情与武学传承将于后续剧情/DLC推出，敬请期待！`,
    }
  }

  const hasItem = (itemId: string) =>
    inventory.some((st) => st.itemId === itemId && st.qty > 0)

  // Special case: SECT-17 开封府 / 六扇门 via 《北京留守幕府举荐信》(ITM-MSC-007, Rank 2) or 《开封府推荐信》(ITM-MSC-006, Rank 1)
  if (targetSectId === 'SECT-17') {
    const hasDamingLetter = hasItem(DAMING_RECOMMENDATION_ITEM_ID)
    const hasChangshanLetter = hasItem(KAIFENG_RECOMMENDATION_ITEM_ID)
    const rank2Label = getSectRankTitle('SECT-17', 2)
    const reqSummary =
      '持大名府《北京留守幕府举荐信》（直授第2阶捕头都头，八极门/常山枪派可奉调转入）或常山枪派《开封府推荐信》（授第1阶役卒巡捕），且清白无朝廷通缉或通辽嫌疑'
    if (sectState.songCourtBlacklisted) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: hasDamingLetter
          ? DAMING_RECOMMENDATION_ITEM_ID
          : KAIFENG_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason: '少侠已名列大宋朝廷黑名单，开封府岂容投效！',
      }
    }
    if (sectState.liaoSuspicionDebuff) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: hasDamingLetter
          ? DAMING_RECOMMENDATION_ITEM_ID
          : KAIFENG_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason: '少侠身负【通辽嫌疑】，朝堂上下猜忌，开封府不予录用！',
      }
    }
    if (
      sectState.sectId &&
      sectState.sectId !== 'SECT-22' &&
      sectState.sectId !== 'SECT-23'
    ) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: hasDamingLetter
          ? DAMING_RECOMMENDATION_ITEM_ID
          : KAIFENG_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason: `少侠已身在【${FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId}】，不可二门兼投。`,
      }
    }
    if (sectState.sectId === 'SECT-23' && !hasDamingLetter) {
      return {
        canJoin: false,
        startingRank: 2,
        startingRankLabel: rank2Label,
        costSilver: 0,
        consumeItemId: DAMING_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason:
          '沧州八极门弟子欲奉调开封府，需勘破大名府《铁锁镇河朔》奇案并获贾昌朝亲签《北京留守幕府举荐信》！',
      }
    }
    if (hasDamingLetter) {
      return {
        canJoin: true,
        startingRank: 2,
        startingRankLabel: rank2Label,
        costSilver: 0,
        consumeItemId: DAMING_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason: null,
        allowOfficialTransferFromChangshan:
          sectState.sectId === 'SECT-22' || sectState.sectId === 'SECT-23',
      }
    }
    if (!hasChangshanLetter) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: KAIFENG_RECOMMENDATION_ITEM_ID,
        requirementSummary: reqSummary,
        blockedReason:
          '需持有大名府《北京留守幕府举荐信》（《铁锁镇河朔》忠义入幕线）或常山枪派《开封府推荐信》。',
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: KAIFENG_RECOMMENDATION_ITEM_ID,
      requirementSummary: reqSummary,
      blockedReason: null,
      allowOfficialTransferFromChangshan: sectState.sectId === 'SECT-22',
    }
  }

  // Must not already be in another sect
  if (sectState.sectId) {
    const curName = FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId
    return {
      canJoin: false,
      startingRank,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: '需为无门无派之身',
      blockedReason: `少侠目前身属【${curName}】，需先脱离原门派方可另投他门。`,
    }
  }

  // 1. Third-Tier Sects (三流小派 SECT-25..30): unified 20 silver
  if (faction.sectTier === '三流小派') {
    const reqSummary = '拜师束脩纹银 20 两'
    if (silver < 20) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 20,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `纹银不足 20 两（当前 ${silver} 两）。`,
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 20,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  // 2. Second-Tier Sects (二流门派)
  if (targetSectId === 'SECT-16' || targetSectId === 'SECT-23' || targetSectId === 'SECT-24') {
    // 沧州八极门专属破格入门：持卢铁山亲授《八极铁锁令》直入第2阶【内堂武师】
    if (targetSectId === 'SECT-23' && hasItem(BAJI_IRON_TOKEN_ITEM_ID)) {
      const rank2Label = getSectRankTitle('SECT-23', 2)
      return {
        canJoin: true,
        startingRank: 2,
        startingRankLabel: rank2Label,
        costSilver: 0,
        consumeItemId: BAJI_IRON_TOKEN_ITEM_ID,
        requirementSummary:
          '持卢铁山亲授《八极铁锁令》（大名府《铁锁镇河朔》奇案获授，直入内堂武师）或《齐鲁查拳馆举荐帖》',
        blockedReason: null,
      }
    }

    const refCfg = REFERRAL_REQ_BY_TARGET_SECT[targetSectId]!
    const srcName = FACTION_DB_MAP[refCfg.sourceSectId]?.name ?? refCfg.sourceSectId
    const bajiExtra =
      targetSectId === 'SECT-23'
        ? '；或于大名府勘破《铁锁镇河朔》奇案获卢铁山亲授《八极铁锁令》破格直入内堂'
        : ''
    const reqSummary = `需持《${refCfg.itemName}》（由【${srcName}】内门及以上弟子贿赂${refCfg.elderTitleHint} 20 两银子取得${bajiExtra}）`
    if (!hasItem(refCfg.itemId)) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: refCfg.itemId,
        requirementSummary: reqSummary,
        blockedReason: `行囊中未持有《${refCfg.itemName}》。请先拜入【${srcName}】晋升内门后向其${refCfg.elderTitleHint}奉银 20 两求取举荐帖${targetSectId === 'SECT-23' ? '，或在大名府触发《铁锁镇河朔》奇案协助八极门洗刷冤屈' : ''}！`,
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: refCfg.itemId,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  if (targetSectId === 'SECT-18') {
    const reqSummary = '领取「纳投名状」任务并劫掠击败一名大宋朝廷官员（入盟后列入官府黑名单，踏入开封府将被展昭缉拿）'
    if (sectState.toumingzhuangState === 'none') {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '请先向绿林盟好汉领取【纳投名状】任务，再去外州府劫掠一名大宋官员！',
      }
    }
    if (sectState.toumingzhuangState === 'accepted') {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '尚未完成【纳投名状】！请寻一名大宋朝廷官员发起【劫道纳投名状（生死战）】并获胜后再来入盟。',
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  if (targetSectId === 'SECT-21') {
    const reqSummary = '先天根骨 ≥ 45 + 拜师束脩 50 两纹银'
    const bone = baseStats.talents.根骨
    if (bone < 45) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 50,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `洛阳金刀门刀法刚猛沉雄，需先天根骨 ≥ 45（少侠当前根骨 ${bone}）。`,
      }
    }
    if (silver < 50) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 50,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: `金刀王家拜师束脩需 50 两纹银（少侠当前 ${silver} 两）。`,
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 50,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  if (targetSectId === 'SECT-22') {
    const reqSummary =
      '免束脩直接参军入伍（未满18岁暂免诛谍且不领军饷；年满18岁起按月领军饷，且每半年强制赴燕云城池与三流中至二流中辽谍生死对决一次；升任演武教习可领开封府推荐信；主动退派获【通辽】恶名，大宋众人好感 -30）'
    if (sectState.songCourtBlacklisted) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '少侠身负朝廷海捕黑名单，河北边军常山枪派岂容匪类投军！',
      }
    }
    if (sectState.liaoSuspicionDebuff) {
      return {
        canJoin: false,
        startingRank: 1,
        startingRankLabel,
        costSilver: 0,
        consumeItemId: null,
        requirementSummary: reqSummary,
        blockedReason: '少侠曾背弃军伍、身负【通辽嫌疑】，常山枪派永不复录！',
      }
    }
    return {
      canJoin: true,
      startingRank: 1,
      startingRankLabel,
      costSilver: 0,
      consumeItemId: null,
      requirementSummary: reqSummary,
      blockedReason: null,
    }
  }

  // 3. First-Tier Sects & Dali Royal Clan: gated for upcoming bespoke quest chains
  const noOuterHint =
    faction.acceptsOuterDisciple === false ? '（本门不收外门弟子，入门直授内门）' : ''
  return {
    canJoin: false,
    startingRank,
    startingRankLabel,
    costSilver: 0,
    consumeItemId: null,
    requirementSummary: `一流名门专属入门试炼任务链${noOuterHint}`,
    blockedReason: `【${faction.name}】乃当世一流宗门${noOuterHint}，专属入门任务链将于下一卷开启，敬请先历练三流与二流门派！`,
  }
}

/**
 * Standard equipment & weapons automatically granted upon joining specific sects.
 */
export const SECT_ENTRY_GEAR_GIFTS: Record<string, string[]> = {
  'SECT-22': ['WPN-067'], // 常山枪派：厢军制式长枪
  'SECT-17': ['ACC-018', 'ARM-033', 'BOT-017'], // 开封府/六扇门：六扇门精铜捕快腰牌、汴京巡城皂衣、汴京千层底布鞋
  'SECT-23': ['ACC-031', 'ARM-031'], // 沧州八极门：沧州武馆铜护心、沧州武馆练功短打
}

