import { MARTIAL_ART_DB_MAP, NPCS_DB } from '../../data/gameDb'
import { computeSingleArtBonus, getArtLevelStats } from '../../data/playerMartialArts'
import { computeEquipmentTotals, computeWeaponArtSynergy } from '../equipment/equipmentStats'
import type {
  CompiledNpcRecord,
  EquippedArtsMap,
  EquippedSlotsMap,
  LearnedArtEntry,
  MartialArtSlotKey,
} from '../../types/game'
import { deriveHeroEffectiveStats, deriveNpcEffectiveStats } from './heroStats'
import { estimateHeroRealm, parseRealmTier } from './realmUtils'
import type { HeroBaseStats } from '../../types/game'

/**
 * 《天下风云榜》排名规则：先比境界（大宗师上品 > 大宗师中品 > …），同一境界内再比战力。
 * 境界是人物修为的定论（如法空为全游戏唯一的大宗师上品），战力只在同境界之间分高下。
 *
 * 战力 = 气血 ×1.5 + 内力 ×1.8 + 身法 ×30 + 抗性 ×30 + 攻击 ×2 + 防御 ×1.5
 *      + 武学（四门出战外功中「品阶 × 重数 × 30」最高的一门；内功、轻功不计）
 *      + 天阶特效（每条生效特效 +500；内功、轻功特效全计，四门外功的特效合计最多计 2 条）
 * 攻击取「装备攻击 + 最强一招的招式伤害与该招的兵器契合加成」：每回合只出一招，不累加四招的契合。
 * 四维与攻守均为披挂、运使武学后的实时有效值。仅作排名之用，不参与任何战斗结算。
 */

const TIER_WEIGHT: Record<string, number> = {
  天阶上品: 12,
  天阶中品: 11,
  天阶下品: 10,
  地阶上品: 9,
  地阶中品: 8,
  地阶下品: 7,
  良品上品: 6,
  良品中品: 5,
  良品下品: 4,
  凡品上品: 3,
  凡品中品: 2,
  凡品下品: 1,
}

/** 每个「品阶权重 × 重数」点折算的战力 */
const ART_POINT = 30
/** 每条已生效的天阶特效折算的战力 */
const HEAVEN_EFFECT_POINT = 500
/** 四门出战外功的天阶特效合计最多计入的条数 */
const MOVE_EFFECT_CAP = 2

const MOVE_SLOTS: MartialArtSlotKey[] = ['move1', 'move2', 'move3', 'move4']

export interface PowerInput {
  maxHp: number
  maxMp: number
  agility: number
  res: number
  totalAttack: number
  totalDefense: number
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
}

export interface PowerBreakdown {
  total: number
  vitals: number
  offense: number
  arts: number
  heaven: number
  heavenEffectCount: number
  /** 计入战力的那一门外功武学（品阶 × 重数最高者，含重数），用于榜单展示 */
  signatureArt: string | null
}

export interface RankedPower extends PowerBreakdown {
  /** 境界序（0 不入流 … 15 大宗师上品），排名第一关键字 */
  realmRank: number
  realmLabel: string
}

/** 风云榜排序：境界高者在前，同境界战力高者在前 */
export function compareRankedPower(a: RankedPower, b: RankedPower): number {
  return b.realmRank - a.realmRank || b.total - a.total
}

export function computeMartialPower(input: PowerInput): PowerBreakdown {
  const vitals = input.maxHp * 1.5 + input.maxMp * 1.8 + input.agility * 30 + input.res * 30
  const offense = input.totalAttack * 2 + input.totalDefense * 1.5

  const levelMap = new Map(input.learnedArts.map((a) => [a.artId, a.level]))
  let best: { score: number; weight: number; label: string } | null = null
  // 只看四门出战外功（内功、轻功不计）
  for (const slot of MOVE_SLOTS) {
    const artId = input.equippedArts[slot]
    if (!artId) continue
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art) continue
    const level = levelMap.get(artId) ?? 1
    const weight = TIER_WEIGHT[art.fullTier] ?? TIER_WEIGHT[`${art.tier}${art.subTier}`] ?? 1
    const score = weight * level * ART_POINT
    if (!best || score > best.score || (score === best.score && weight > best.weight)) {
      best = { score, weight, label: `《${art.cleanName}》${level} 重` }
    }
  }
  // 只取最高的一门外功武学计入战力
  const arts = best?.score ?? 0

  let innerEffects = 0
  let moveEffects = 0
  for (const slot of Object.keys(input.equippedArts) as MartialArtSlotKey[]) {
    const artId = input.equippedArts[slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] : undefined
    if (!art) continue
    const n = getArtLevelStats(art, levelMap.get(art.id) ?? 1)?.specialEffects?.length ?? 0
    if (MOVE_SLOTS.includes(slot)) moveEffects += n
    else innerEffects += n
  }
  const heavenEffectCount = innerEffects + Math.min(MOVE_EFFECT_CAP, moveEffects)
  const heaven = heavenEffectCount * HEAVEN_EFFECT_POINT

  const total = Math.round(vitals + offense + arts + heaven)
  return {
    total,
    vitals: Math.round(vitals),
    offense: Math.round(offense),
    arts: Math.round(arts),
    heaven,
    heavenEffectCount,
    signatureArt: best?.label ?? null,
  }
}

/** 最强一招的实战攻击：招式伤害 + 该招自身的兵器契合加成（不累加其余招式的契合） */
function bestMoveAttack(
  equipped: EquippedSlotsMap,
  equippedArts: EquippedArtsMap,
  learnedArts: LearnedArtEntry[],
): number {
  const levelMap = new Map(learnedArts.map((a) => [a.artId, a.level]))
  const synBySlot = new Map(
    computeWeaponArtSynergy(equipped.weapon, equippedArts, learnedArts).matches.map((m) => [m.slot, m.bonusAttack]),
  )
  let best = 0
  for (const slot of MOVE_SLOTS) {
    const artId = equippedArts[slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] : undefined
    if (!art) continue
    const hit = computeSingleArtBonus(art, levelMap.get(art.id) ?? 1, slot).attack + (synBySlot.get(slot) ?? 0)
    best = Math.max(best, hit)
  }
  return best
}

export function computeNpcMartialPower(rec: CompiledNpcRecord): RankedPower {
  const eff = deriveNpcEffectiveStats(rec)
  const tier = parseRealmTier(rec.realm)
  return {
    realmRank: tier.rank,
    realmLabel: rec.realm || tier.label,
    ...computeMartialPower({
    maxHp: eff.maxHp,
    maxMp: eff.maxMp,
    agility: eff.agility,
    res: eff.res,
    totalAttack: eff.equipAttack + bestMoveAttack(rec.equipped, rec.equippedArts, rec.learnedArts),
    totalDefense: eff.totalDefense,
    equippedArts: rec.equippedArts,
    learnedArts: rec.learnedArts,
    }),
  }
}

export function computeHeroMartialPower(hero: {
  baseStats: HeroBaseStats
  equipped: EquippedSlotsMap
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
  heavyInjury?: boolean
}): RankedPower {
  const eff = deriveHeroEffectiveStats(hero.baseStats, hero.equipped, hero.equippedArts, hero.learnedArts, {
    heavyInjury: hero.heavyInjury,
  })
  const equipTotals = computeEquipmentTotals(hero.equipped)
  const artDefense = (Object.keys(hero.equippedArts) as MartialArtSlotKey[]).reduce((sum, slot) => {
    const artId = hero.equippedArts[slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] : undefined
    const lv = hero.learnedArts.find((a) => a.artId === artId)?.level ?? 1
    return sum + (art ? computeSingleArtBonus(art, lv, slot).defense : 0)
  }, 0)
  const tier = estimateHeroRealm(eff.maxHp, eff.maxMp)
  return {
    realmRank: tier.rank,
    realmLabel: tier.label,
    ...computeMartialPower({
    maxHp: eff.maxHp,
    maxMp: eff.maxMp,
    agility: eff.agility,
    res: eff.res,
    totalAttack: equipTotals.attack + bestMoveAttack(hero.equipped, hero.equippedArts, hero.learnedArts),
    totalDefense: equipTotals.defense + artDefense,
    equippedArts: hero.equippedArts,
    learnedArts: hero.learnedArts,
    }),
  }
}

export interface FengyunEntry {
  rank: number
  isHero: boolean
  npc: CompiledNpcRecord | null
  power: RankedPower
}

let npcPowerCache: { rec: CompiledNpcRecord; power: RankedPower }[] | null = null

/** 固定 NPC 的战力只取决于编译库数据，首次计算后缓存（按战力降序） */
function getNpcPowerTable() {
  if (!npcPowerCache) {
    npcPowerCache = NPCS_DB.map((rec) => ({ rec, power: computeNpcMartialPower(rec) })).sort(
      (a, b) => compareRankedPower(a.power, b.power) || a.rec.id.localeCompare(b.rec.id),
    )
  }
  return npcPowerCache
}

export const FENGYUN_BOARD_SIZE = 100

export interface FengyunBoard {
  /** 榜上前 100 位（含主角，若已上榜） */
  entries: FengyunEntry[]
  /** 主角在全天下（在世固定人物 + 主角）中的位次，1 起 */
  heroRank: number
  heroPower: RankedPower
  /** 参评总人数 */
  totalCount: number
  /** 第 N 名（N = 100 / 50 / 10 / 1）当前的门槛人物（不含主角）的境界与战力 */
  thresholds: Record<100 | 50 | 10 | 1, RankedPower | null>
}

/**
 * 排出当世前 100 位高手：已身故的人物不再入榜；主角与固定人物同台竞排，同分时主角居后。
 */
export function buildFengyunBoard(params: {
  heroPower: RankedPower
  deadNpcIds: readonly string[]
  isNpcDead?: (npcId: string) => boolean
}): FengyunBoard {
  const dead = new Set(params.deadNpcIds)
  const living = getNpcPowerTable().filter(
    ({ rec }) => !dead.has(rec.id) && !(params.isNpcDead?.(rec.id) ?? false),
  )
  const heroIdx = living.findIndex(({ power }) => compareRankedPower(params.heroPower, power) < 0)
  const heroPos = heroIdx === -1 ? living.length : heroIdx

  const merged: FengyunEntry[] = []
  for (let i = 0; i < living.length + 1 && merged.length < FENGYUN_BOARD_SIZE; i++) {
    if (i === heroPos) {
      merged.push({ rank: merged.length + 1, isHero: true, npc: null, power: params.heroPower })
    }
    const npc = living[i]
    if (npc && merged.length < FENGYUN_BOARD_SIZE) {
      merged.push({ rank: merged.length + 1, isHero: false, npc: npc.rec, power: npc.power })
    }
  }

  const thresholdAt = (n: number) => living[n - 1]?.power ?? null
  return {
    entries: merged,
    heroRank: heroPos + 1,
    heroPower: params.heroPower,
    totalCount: living.length + 1,
    thresholds: { 100: thresholdAt(100), 50: thresholdAt(50), 10: thresholdAt(10), 1: thresholdAt(1) },
  }
}

/** 成长里程碑：榜上无名 → 风云百强 → 前五十 → 前十 → 问鼎榜首 */
export const FENGYUN_MILESTONES = [
  { key: 'top100', label: '跻身风云百强', rank: 100 },
  { key: 'top50', label: '名列前五十', rank: 50 },
  { key: 'top10', label: '位列十大高手', rank: 10 },
  { key: 'top1', label: '问鼎天下第一', rank: 1 },
] as const

export function getFengyunTitle(rank: number): string {
  if (rank === 1) return '天下第一'
  if (rank <= 10) return '十大高手'
  if (rank <= 50) return '风云前五十'
  if (rank <= 100) return '风云百强'
  return '榜上无名'
}

/** 少侠要越过某位门槛人物还缺什么：境界不足时提示境界，境界相同时提示战力差 */
export function describeFengyunGap(hero: RankedPower, target: RankedPower | null): string | null {
  if (!target) return null
  if (hero.realmRank < target.realmRank) return `修为须至【${target.realmLabel}】`
  if (hero.realmRank > target.realmRank) return null
  if (hero.total > target.total) return null
  return `同为【${target.realmLabel}】，战力尚差 ${(target.total - hero.total + 1).toLocaleString('en-US')}`
}
