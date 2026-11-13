import { MARTIAL_ART_DB_MAP } from './gameDb'
import type {
  CompiledMartialArtRecord,
  EquippedArtsMap,
  LearnedArtEntry,
  MartialArtLevelStats,
  MartialArtSlotKey,
  MartialArtSpecialEffect,
} from '../types/game'

export const MARTIAL_ART_SLOT_METAS: Array<{
  slot: MartialArtSlotKey
  label: string
  shortLabel: string
  seal: string
  hint: string
  group: 'core' | 'moves'
}> = [
  {
    slot: 'neigong',
    label: '主运内功',
    shortLabel: '主运内功',
    seal: '内',
    hint: '决定内力上限、气血上限与护体抗性根基',
    group: 'core',
  },
  {
    slot: 'qinggong',
    label: '轻功身法',
    shortLabel: '轻功身法',
    seal: '轻',
    hint: '决定回合交锋先后手身法与大地图行军提速',
    group: 'core',
  },
  {
    slot: 'move1',
    label: '出战招式壹',
    shortLabel: '招式壹',
    seal: '壹',
    hint: '拳指刀剑枪棍毒暗音 · 随身主力杀招',
    group: 'moves',
  },
  {
    slot: 'move2',
    label: '出战招式贰',
    shortLabel: '招式贰',
    seal: '贰',
    hint: '拳指刀剑枪棍毒暗音 · 变招破防辅攻',
    group: 'moves',
  },
  {
    slot: 'move3',
    label: '出战招式叁',
    shortLabel: '招式叁',
    seal: '叁',
    hint: '拳指刀剑枪棍毒暗音 · 奇正克制应敌',
    group: 'moves',
  },
  {
    slot: 'move4',
    label: '出战招式肆',
    shortLabel: '招式肆',
    seal: '肆',
    hint: '拳指刀剑枪棍毒暗音 · 压箱底绝技',
    group: 'moves',
  },
]

export const DEFAULT_LEARNED_ARTS: LearnedArtEntry[] = [
  // 内功心法
  { artId: 'MA-177', level: 4, exp: 35 }, // 周天引气诀（凡品中品·内功）
  { artId: 'MA-138', level: 2, exp: 15 }, // 五禽养生功（良品下品·内功）
  // 轻功身法
  { artId: 'MA-175', level: 3, exp: 40 }, // 飞檐走壁（凡品上品·轻功）
  { artId: 'MA-156', level: 2, exp: 10 }, // 燕子三抄水（良品下品·轻功）
  // 外功与兵刃招式
  { artId: 'MA-180', level: 5, exp: 60 }, // 太祖长拳（凡品中品·拳掌）
  { artId: 'MA-185', level: 4, exp: 25 }, // 青萍剑法（凡品中品·剑法）
  { artId: 'MA-171', level: 2, exp: 20 }, // 呼延硬鞭法（军中简本）（凡品上品·棍棒）
  { artId: 'MA-154', level: 3, exp: 30 }, // 折扇点穴功（良品下品·指法）
]

export const DEFAULT_EQUIPPED_ARTS: EquippedArtsMap = {
  neigong: 'MA-177',
  qinggong: 'MA-175',
  move1: 'MA-180',
  move2: 'MA-185',
  move3: 'MA-154',
  move4: null,
}

export function isArtNeigong(art: CompiledMartialArtRecord): boolean {
  return art.category === '内功'
}

export function isArtQinggong(art: CompiledMartialArtRecord): boolean {
  return art.category === '轻功'
}

export function canArtFitSlot(art: CompiledMartialArtRecord, slot: MartialArtSlotKey): boolean {
  if (slot === 'neigong') {
    return isArtNeigong(art)
  }
  if (slot === 'qinggong') {
    return isArtQinggong(art)
  }
  return !isArtNeigong(art) && !isArtQinggong(art)
}

export function getArtLevelStats(
  art: CompiledMartialArtRecord,
  level: number,
): MartialArtLevelStats | undefined {
  const clamped = Math.max(1, Math.min(10, Math.round(level)))
  return art.levels?.[clamped - 1]
}

export function getArtExpRequired(art: CompiledMartialArtRecord, level: number): number {
  const lvStats = getArtLevelStats(art, level)
  if (lvStats?.expRequired && lvStats.expRequired > 0) {
    return lvStats.expRequired
  }
  return level >= 10 ? 0 : 100
}

export interface ArtSlotBonus {
  maxHp: number
  maxMp: number
  agility: number
  res: number
  constitution: number
  charm: number
  physicalDamage: number
  poisonDamage: number
  soundDamage: number
  hiddenWeaponDamage: number
  attack: number
  defense: number
  qinggongBonus: number
  specialEffects: MartialArtSpecialEffect[]
}

export function computeSingleArtBonus(
  art: CompiledMartialArtRecord,
  level: number,
  slot?: MartialArtSlotKey,
): ArtSlotBonus {
  const lvStats = getArtLevelStats(art, level)
  const maxHp = lvStats?.maxHp ?? 0
  const maxMp = lvStats?.maxMp ?? 0
  const agility = lvStats?.agility ?? 0
  const res = lvStats?.resistance ?? 0
  const constitution = lvStats?.constitution ?? 0
  const charm = lvStats?.charm ?? 0
  const physicalDamage = lvStats?.physicalDamage ?? 0
  const poisonDamage = lvStats?.poisonDamage ?? 0
  const soundDamage = lvStats?.soundDamage ?? 0
  const hiddenWeaponDamage = lvStats?.hiddenWeaponDamage ?? 0
  const specialEffects = lvStats?.specialEffects ?? []

  const totalDamage = physicalDamage + poisonDamage + soundDamage + hiddenWeaponDamage

  let qgPct = 0
  if (slot === 'qinggong' || (!slot && isArtQinggong(art))) {
    const qgBase =
      art.tier === '天阶'
        ? 0.45
        : art.tier === '地阶'
          ? 0.3
          : art.tier === '良品'
            ? 0.2
            : 0.12
    qgPct = Number(Math.min(0.6, qgBase + Math.max(0, level - 1) * 0.015).toFixed(2))
  }

  return {
    maxHp,
    maxMp,
    agility,
    res,
    constitution,
    charm,
    physicalDamage,
    poisonDamage,
    soundDamage,
    hiddenWeaponDamage,
    attack: totalDamage,
    defense: res,
    qinggongBonus: qgPct,
    specialEffects,
  }
}

export function computeEquippedArtsTotals(
  equippedArts: EquippedArtsMap,
  learnedArts: LearnedArtEntry[],
): ArtSlotBonus {
  const totals: ArtSlotBonus = {
    maxHp: 0,
    maxMp: 0,
    agility: 0,
    res: 0,
    constitution: 0,
    charm: 0,
    physicalDamage: 0,
    poisonDamage: 0,
    soundDamage: 0,
    hiddenWeaponDamage: 0,
    attack: 0,
    defense: 0,
    qinggongBonus: 0,
    specialEffects: [],
  }

  const levelMap = new Map<string, number>()
  for (const entry of learnedArts) {
    levelMap.set(entry.artId, entry.level)
  }

  let bestMoveDamage = 0
  for (const slot of Object.keys(equippedArts) as MartialArtSlotKey[]) {
    const artId = equippedArts[slot]
    if (!artId) continue
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art) continue
    const lv = levelMap.get(artId) ?? 1
    const b = computeSingleArtBonus(art, lv, slot)
    totals.maxHp += b.maxHp
    totals.maxMp += b.maxMp
    totals.agility += b.agility
    totals.res += b.res
    totals.constitution += b.constitution
    totals.charm += b.charm
    totals.physicalDamage += b.physicalDamage
    totals.poisonDamage += b.poisonDamage
    totals.soundDamage += b.soundDamage
    totals.hiddenWeaponDamage += b.hiddenWeaponDamage
    totals.defense += b.defense
    if (b.attack > bestMoveDamage) {
      bestMoveDamage = b.attack
    }
    if (b.specialEffects.length > 0) {
      totals.specialEffects.push(...b.specialEffects)
    }
    if (slot === 'qinggong') {
      totals.qinggongBonus = Math.max(totals.qinggongBonus, b.qinggongBonus)
    }
  }
  totals.attack = bestMoveDamage

  return totals
}

export function formatArtBonusBadges(bonus: ArtSlotBonus): string[] {
  const list: string[] = []
  if (bonus.physicalDamage > 0) list.push(`物理伤害 +${bonus.physicalDamage}`)
  if (bonus.poisonDamage > 0) list.push(`毒性伤害 +${bonus.poisonDamage}`)
  if (bonus.soundDamage > 0) list.push(`音律伤害 +${bonus.soundDamage}`)
  if (bonus.hiddenWeaponDamage > 0) list.push(`暗器伤害 +${bonus.hiddenWeaponDamage}`)
  if (bonus.maxMp > 0) list.push(`内力上限 +${bonus.maxMp}`)
  if (bonus.maxHp > 0) list.push(`气血上限 +${bonus.maxHp}`)
  if (bonus.agility > 0) list.push(`身法 +${bonus.agility}`)
  if (bonus.res > 0) list.push(`抗性 +${bonus.res}`)
  if (bonus.constitution > 0) list.push(`根骨 +${bonus.constitution}`)
  if (bonus.charm > 0) list.push(`颜值 +${bonus.charm}`)
  if (bonus.qinggongBonus > 0) {
    list.push(`轻功脚力 +${Math.round(bonus.qinggongBonus * 100)}%`)
  }
  for (const fx of bonus.specialEffects) {
    list.push(`${fx.name} +${fx.value}${fx.unit}`)
  }
  return list
}

export function getMasteryStageLabel(level: number): string {
  if (level >= 10) return '返璞归真'
  if (level >= 8) return '登峰造极'
  if (level >= 6) return '炉火纯青'
  if (level >= 4) return '融会贯通'
  if (level >= 2) return '略知一二'
  return '初窥门径'
}
