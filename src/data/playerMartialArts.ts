import { MARTIAL_ART_DB_MAP } from './gameDb'
import type {
  CompiledMartialArtRecord,
  EquippedArtsMap,
  LearnedArtEntry,
  MartialArtSlotKey,
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
    hint: '决定护体真气厚度、内力上限与抗性根基',
    group: 'core',
  },
  {
    slot: 'qinggong',
    label: '轻功身法',
    shortLabel: '轻功身法',
    seal: '轻',
    hint: '决定战中集气走位身法与大地图行军提速',
    group: 'core',
  },
  {
    slot: 'move1',
    label: '出战招式壹',
    shortLabel: '招式壹',
    seal: '壹',
    hint: '拳掌刀剑长兵奇门 · 随身主力杀招',
    group: 'moves',
  },
  {
    slot: 'move2',
    label: '出战招式贰',
    shortLabel: '招式贰',
    seal: '贰',
    hint: '拳掌刀剑长兵奇门 · 变招破防辅攻',
    group: 'moves',
  },
  {
    slot: 'move3',
    label: '出战招式叁',
    shortLabel: '招式叁',
    seal: '叁',
    hint: '拳掌刀剑长兵奇门 · 远近奇正呼应',
    group: 'moves',
  },
  {
    slot: 'move4',
    label: '出战招式肆',
    shortLabel: '招式肆',
    seal: '肆',
    hint: '拳掌刀剑长兵奇门 · 压箱底绝技',
    group: 'moves',
  },
]

export const DEFAULT_LEARNED_ARTS: LearnedArtEntry[] = [
  // 内功心法
  { artId: 'MA-177', level: 4, exp: 35 }, // 《周天引气诀》（凡品中品·内功）
  { artId: 'MA-138', level: 2, exp: 15 }, // 《五禽养生功》（良品下品·内功）
  // 轻功身法
  { artId: 'MA-175', level: 3, exp: 40 }, // 飞檐走壁（凡品上品·轻功）
  { artId: 'MA-156', level: 2, exp: 10 }, // 燕子三抄水（良品下品·轻功）
  // 外功与兵刃招式
  { artId: 'MA-180', level: 5, exp: 60 }, // 太祖长拳（凡品中品·拳掌）
  { artId: 'MA-185', level: 4, exp: 25 }, // 青萍剑法（凡品中品·剑法）
  { artId: 'MA-171', level: 2, exp: 20 }, // 呼延硬鞭法（军中简本）（凡品上品·奇门/长兵）
  { artId: 'MA-154', level: 3, exp: 30 }, // 折扇点穴功（良品下品·奇门）
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
  return art.category.includes('内功')
}

export function isArtQinggong(art: CompiledMartialArtRecord): boolean {
  return art.category.includes('轻功')
}

export function canArtFitSlot(art: CompiledMartialArtRecord, slot: MartialArtSlotKey): boolean {
  if (art.category.includes('全系') || art.category.includes('综合')) {
    return true
  }
  if (slot === 'neigong') {
    return isArtNeigong(art)
  }
  if (slot === 'qinggong') {
    return isArtQinggong(art)
  }
  // move1..move4: any external/weapon/qimen move (or hybrid qinggong/palm)
  return !art.category.startsWith('内功') && art.category !== '轻功'
}

function getTierMultiplier(art: CompiledMartialArtRecord): number {
  const tierBase =
    art.tier === '天阶' ? 4.2 : art.tier === '地阶' ? 2.6 : art.tier === '良品' ? 1.65 : 1.0
  const subBonus = art.subTier === '上品' ? 1.22 : art.subTier === '中品' ? 1.08 : 0.95
  return tierBase * subBonus
}

export interface ArtSlotBonus {
  maxHp: number
  maxMp: number
  agility: number
  res: number
  attack: number
  defense: number
  qinggongBonus: number
}

export function computeSingleArtBonus(
  art: CompiledMartialArtRecord,
  level: number,
  slot?: MartialArtSlotKey,
): ArtSlotBonus {
  const mult = getTierMultiplier(art)
  const lvFactor = 0.55 + Math.max(1, Math.min(10, level)) * 0.15

  if (slot === 'neigong' || (!slot && isArtNeigong(art))) {
    return {
      maxHp: Math.round(95 * mult * lvFactor),
      maxMp: Math.round(140 * mult * lvFactor),
      agility: 0,
      res: Math.round(5 * mult * lvFactor),
      attack: 0,
      defense: Math.round(8 * mult * lvFactor),
      qinggongBonus: 0,
    }
  }

  if (slot === 'qinggong' || (!slot && isArtQinggong(art))) {
    const qgBase =
      art.tier === '天阶'
        ? 0.45
        : art.tier === '地阶'
          ? 0.3
          : art.tier === '良品'
            ? 0.2
            : 0.12
    const qgPct = Number(
      Math.min(0.6, qgBase + Math.max(0, level - 1) * 0.015).toFixed(2),
    )
    return {
      maxHp: 0,
      maxMp: Math.round(25 * mult * lvFactor),
      agility: Math.round(9 * mult * lvFactor),
      res: 0,
      attack: 0,
      defense: Math.round(3 * mult * lvFactor),
      qinggongBonus: qgPct,
    }
  }

  return {
    maxHp: Math.round(25 * mult * lvFactor),
    maxMp: 0,
    agility: art.category.includes('剑') || art.category.includes('奇门') ? Math.round(3 * mult * lvFactor) : 0,
    res: art.category.includes('毒') ? Math.round(4 * mult * lvFactor) : 0,
    attack: Math.round(16 * mult * lvFactor),
    defense: art.category.includes('长兵') || art.category.includes('拳掌') ? Math.round(5 * mult * lvFactor) : 2,
    qinggongBonus: 0,
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
    attack: 0,
    defense: 0,
    qinggongBonus: 0,
  }

  const levelMap = new Map<string, number>()
  for (const entry of learnedArts) {
    levelMap.set(entry.artId, entry.level)
  }

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
    totals.attack += b.attack
    totals.defense += b.defense
    if (slot === 'qinggong') {
      totals.qinggongBonus = Math.max(totals.qinggongBonus, b.qinggongBonus)
    }
  }

  return totals
}

export function formatArtBonusBadges(bonus: ArtSlotBonus): string[] {
  const list: string[] = []
  if (bonus.attack > 0) list.push(`招式外功 +${bonus.attack}`)
  if (bonus.defense > 0) list.push(`招架护体 +${bonus.defense}`)
  if (bonus.maxHp > 0) list.push(`气血上限 +${bonus.maxHp}`)
  if (bonus.maxMp > 0) list.push(`内力上限 +${bonus.maxMp}`)
  if (bonus.agility > 0) list.push(`身法 +${bonus.agility}`)
  if (bonus.res > 0) list.push(`抗性 +${bonus.res}`)
  if (bonus.qinggongBonus > 0) {
    list.push(`轻功脚力 +${Math.round(bonus.qinggongBonus * 100)}%`)
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
