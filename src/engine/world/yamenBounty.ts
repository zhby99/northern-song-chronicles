import { BUILDINGS_DB } from '../../data/gameDb'
import type { ActiveYamenBounty, NodeNpc, NpcCombatStats } from '../../types/game'
import { makeQuestNpc } from '../npcFactory'
import { findBestRoute, NODE_MAP, WORLD_GRAPH } from './mapMath'

// ============================================================================
// 州府衙门【悬赏缉凶榜】：任何身份（无门无派散人亦可）在各州府衙门揭榜，
// 赴邻近州府酒肆客栈缉拿通缉犯，赚取 银两 + 战斗经验 + 侠义。
// 每座衙门每月张贴 丙 / 乙 / 甲 三等榜文各一张，同一张榜文缉拿归案后当月不再张贴。
// 缉凶为「擒拿」切磋战：失手只受重伤不致命，可养伤后再寻。
// ============================================================================

export type YamenBountyGrade = 1 | 2 | 3

export interface YamenBountyGradeDef {
  grade: YamenBountyGrade
  label: string
  realms: string[]
  rewardSilver: number
  rewardCombatExp: number
  rewardChivalry: number
  /** 通缉犯潜匿州府离揭榜地的最远路程（里） */
  maxRouteLi: number
  titles: string[]
}

export const YAMEN_BOUNTY_GRADES: Record<YamenBountyGrade, YamenBountyGradeDef> = {
  1: {
    grade: 1,
    label: '丙等 · 剪径毛贼',
    realms: ['三流中品', '三流上品'],
    rewardSilver: 5,
    rewardCombatExp: 120,
    rewardChivalry: 1,
    maxRouteLi: 700,
    titles: ['剪径山贼', '拐带人口的拍花子', '销赃窝主', '劫道毛贼'],
  },
  2: {
    grade: 2,
    label: '乙等 · 江洋大盗',
    realms: ['二流下品', '二流中品', '二流上品'],
    rewardSilver: 12,
    rewardCombatExp: 260,
    rewardChivalry: 2,
    maxRouteLi: 1100,
    titles: ['江洋大盗', '劫漕盐枭', '越狱死囚', '采花淫贼'],
  },
  3: {
    grade: 3,
    label: '甲等 · 绿林巨寇',
    realms: ['一流下品', '一流中品'],
    rewardSilver: 25,
    rewardCombatExp: 450,
    rewardChivalry: 3,
    maxRouteLi: 1600,
    titles: ['屠村巨寇', '劫杀命官的独脚大盗', '黑道杀手', '叛逃禁军教头'],
  },
}

/** 揭榜后须在此天数内缉拿归案，逾期榜文作废 */
export const YAMEN_BOUNTY_DEADLINE_DAYS = 45

const BOUNTY_SURNAMES = ['赵', '钱', '孙', '周', '吴', '郑', '冯', '褚', '蒋', '韩', '杨', '秦', '何', '吕', '雷', '屠', '鲁', '石', '盛', '侯']
const BOUNTY_GIVEN = ['老七', '三郎', '黑子', '大眼', '铁头', '二麻', '五斤', '六指', '狗剩', '癞子', '九斤', '独眼', '彪', '霸', '虎']
const BOUNTY_NICKNAMES = ['翻天鹞', '过山风', '赛时迁', '鬼见愁', '一阵风', '飞天蜈蚣', '黑煞神', '笑面虎', '活阎罗', '草上飞', '赤练蛇', '夜叉', '铁背狼', '钻地鼠', '催命判官', '摸天梯']

const REALM_STATS: Record<string, NpcCombatStats> = {
  三流中品: { hp: 600, mp: 320, agi: 30, res: 17, isBenchmark: false },
  三流上品: { hp: 830, mp: 540, agi: 36, res: 22, isBenchmark: false },
  二流下品: { hp: 1110, mp: 800, agi: 43, res: 29, isBenchmark: false },
  二流中品: { hp: 1440, mp: 1130, agi: 48, res: 35, isBenchmark: false },
  二流上品: { hp: 1810, mp: 1500, agi: 54, res: 41, isBenchmark: false },
  一流下品: { hp: 2400, mp: 2060, agi: 61, res: 49, isBenchmark: false },
  一流中品: { hp: 3030, mp: 2740, agi: 68, res: 54, isBenchmark: false },
}

/** 可张贴悬赏榜的衙门建筑：各州府基础府衙与辽东京留守衙署（开封府衙六扇门另有海捕公文） */
export function isYamenBountyBoardBuilding(buildingId: string | null | undefined): boolean {
  if (!buildingId) return false
  return buildingId.endsWith('_base_yamen') || buildingId === 'lyf_yamen'
}

function hashSeed(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function makePostingRng(seedText: string): () => number {
  let a = hashSeed(seedText) || 1
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]!
}

function routeLi(fromId: string, toId: string): number | null {
  if (fromId === toId) return 0
  const route = findBestRoute(
    fromId,
    toId,
    { mountKey: 'walk', agility: 30, ridingSkill: 0, qinggongBonus: 0 },
    null,
  )
  return route ? route.totalLi : null
}

const hideoutCache = new Map<string, Array<{ regionId: string; li: number }>>()

function getHideoutCities(issueRegionId: string): Array<{ regionId: string; li: number }> {
  const cached = hideoutCache.get(issueRegionId)
  if (cached) return cached
  const out: Array<{ regionId: string; li: number }> = []
  for (const n of WORLD_GRAPH.nodes) {
    if (n.type !== 'city') continue
    const li = routeLi(issueRegionId, n.id)
    if (li === null) continue
    const hasHideout = BUILDINGS_DB.some(
      (b) =>
        b.regionId === n.id &&
        !b.isSpecial &&
        (b.id.endsWith('_base_tavern') || b.id.endsWith('_base_inn')),
    )
    if (hasHideout) out.push({ regionId: n.id, li })
  }
  out.sort((a, b) => a.li - b.li)
  hideoutCache.set(issueRegionId, out)
  return out
}

export function getMonthIndex(dayCount: number): number {
  return Math.floor((Math.max(1, dayCount) - 1) / 30)
}

/**
 * 某州府衙门本月张贴的悬赏榜文（丙 / 乙 / 甲 各一，确定性生成）。
 * doneIds 中已缉拿归案的榜文本月不再出现。
 */
export function getYamenBountyPostings(params: {
  issueRegionId: string
  dayCount: number
  doneIds?: ReadonlyArray<string>
}): ActiveYamenBounty[] {
  const { issueRegionId, dayCount, doneIds = [] } = params
  const issueNode = NODE_MAP[issueRegionId]
  if (!issueNode) return []
  const monthIdx = getMonthIndex(dayCount)
  const cities = getHideoutCities(issueRegionId)
  if (cities.length === 0) return []

  const postings: ActiveYamenBounty[] = []
  for (const grade of [1, 2, 3] as const) {
    const id = `YB-${issueRegionId}-M${monthIdx}-G${grade}`
    if (doneIds.includes(id)) continue
    const def = YAMEN_BOUNTY_GRADES[grade]
    const rng = makePostingRng(id)
    const pool = cities.filter((c) => c.li <= def.maxRouteLi)
    const city = pick(pool.length > 0 ? pool : cities.slice(0, 3), rng)
    const cityNode = NODE_MAP[city.regionId]
    const hideouts = BUILDINGS_DB.filter(
      (b) =>
        b.regionId === city.regionId &&
        !b.isSpecial &&
        (b.id.endsWith('_base_tavern') || b.id.endsWith('_base_inn')),
    )
    const bldg = pick(hideouts, rng)
    const realm = pick(def.realms, rng)
    const name = `「${pick(BOUNTY_NICKNAMES, rng)}」${pick(BOUNTY_SURNAMES, rng)}${pick(BOUNTY_GIVEN, rng)}`
    postings.push({
      id,
      grade,
      gradeLabel: def.label,
      targetName: name,
      targetTitle: pick(def.titles, rng),
      realm,
      stats: { ...REALM_STATS[realm]! },
      issueRegionId,
      issueRegionName: issueNode.name,
      regionId: city.regionId,
      regionName: cityNode?.name ?? city.regionId,
      buildingId: bldg.id,
      buildingName: bldg.name,
      routeLi: city.li,
      acceptedDay: dayCount,
      deadlineDay: dayCount + YAMEN_BOUNTY_DEADLINE_DAYS,
      rewardSilver: def.rewardSilver,
      rewardCombatExp: def.rewardCombatExp,
      rewardChivalry: def.rewardChivalry,
    })
  }
  return postings
}

export function isYamenBountyExpired(bounty: ActiveYamenBounty, dayCount: number): boolean {
  return dayCount > bounty.deadlineDay
}

export function yamenBountyNpcId(bounty: Pick<ActiveYamenBounty, 'id'>): string {
  return `YAMEN_BOUNTY_${bounty.id}`
}

export function buildNodeNpcFromYamenBounty(bounty: ActiveYamenBounty): NodeNpc {
  return makeQuestNpc({
    id: yamenBountyNpcId(bounty),
    name: bounty.targetName,
    title: `${bounty.issueRegionName}悬赏要犯 · ${bounty.targetTitle}`,
    realm: bounty.realm,
    factionId: 'SECT-18',
    factionName: '州府通缉要犯',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: bounty.stats,
    talents: { bone: 45, comprehension: 40, charm: 30 },
    fullLocationLabel: `${bounty.regionName} > ${bounty.buildingName}`,
    isDynamicYamenBounty: true,
    questBadgeLabel: '悬赏要犯',
    talk: `“${bounty.issueRegionName}的海捕文书也贴到${bounty.regionName}来了？想拿爷爷去领赏，先过了这口刀！”`,
  })
}
