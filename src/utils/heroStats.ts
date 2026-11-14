import {
  computeEquipmentTotals,
  computeWeaponArtSynergy,
  DEFAULT_HERO_TALENTS,
} from '../data/itemsDb'
import { computeEquippedArtsTotals, isArtNeigong } from '../data/playerMartialArts'
import type {
  CompiledMartialArtRecord,
  EquippedArtsMap,
  EquippedSlotsMap,
  HeroBaseStats,
  LearnedArtEntry,
  MountKey,
} from '../types/game'

export const CIVIL_ART_KEYS = [
  '算术',
  '经义',
  '策论',
  '诗词',
  '琴',
  '棋',
  '书',
  '画',
  '辩才',
] as const

export const HERO_BASE_CAPS = {
  minMaxHp: 100,
  minMaxMp: 50,
  minMaxStamina: 40,
  agility: 120,
  res: 120,
  ridingSkill: 100,
  civilSkill: 100,
  talent: 100,
} as const

export const DEFAULT_HERO_BASE_STATS: HeroBaseStats = {
  talents: {
    根骨: DEFAULT_HERO_TALENTS.根骨,
    悟性: DEFAULT_HERO_TALENTS.悟性,
    颜值: DEFAULT_HERO_TALENTS.颜值,
  },
  maxHp: 0,
  maxMp: 0,
  maxStamina: 100,
  agility: 0,
  res: 0,
  ridingSkill: 45,
  skills: {
    算术: 52,
    经义: 60,
    策论: 48,
    诗词: 55,
    琴: 42,
    棋: 50,
    书: 46,
    画: 40,
    辩才: 64,
  },
}

export function cloneHeroBaseStats(base: HeroBaseStats = DEFAULT_HERO_BASE_STATS): HeroBaseStats {
  return {
    talents: { ...base.talents },
    maxHp: 0,
    maxMp: 0,
    maxStamina: base.maxStamina,
    agility: 0,
    res: 0,
    ridingSkill: base.ridingSkill,
    skills: { ...base.skills },
  }
}

function clampInt(val: unknown, min: number, max: number, fallback: number): number {
  if (typeof val !== 'number' || !Number.isFinite(val)) return fallback
  return Math.max(min, Math.min(max, Math.floor(val)))
}

export function sanitizeHeroBaseStats(raw: unknown): HeroBaseStats {
  const def = DEFAULT_HERO_BASE_STATS
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return cloneHeroBaseStats(def)
  }
  const rec = raw as Record<string, unknown>
  const rawTalents =
    typeof rec.talents === 'object' && rec.talents !== null && !Array.isArray(rec.talents)
      ? (rec.talents as Record<string, unknown>)
      : {}
  const rawSkills =
    typeof rec.skills === 'object' && rec.skills !== null && !Array.isArray(rec.skills)
      ? (rec.skills as Record<string, unknown>)
      : {}

  const skills: Record<string, number> = {}
  for (const k of CIVIL_ART_KEYS) {
    skills[k] = clampInt(rawSkills[k], 0, HERO_BASE_CAPS.civilSkill, def.skills[k])
  }
  for (const [k, v] of Object.entries(rawSkills)) {
    if (!(k in skills) && typeof v === 'number' && Number.isFinite(v)) {
      skills[k] = clampInt(v, 0, HERO_BASE_CAPS.civilSkill, 0)
    }
  }

  return {
    talents: {
      根骨: clampInt(rawTalents.根骨, 1, HERO_BASE_CAPS.talent, def.talents.根骨),
      悟性: clampInt(rawTalents.悟性, 1, HERO_BASE_CAPS.talent, def.talents.悟性),
      颜值: clampInt(rawTalents.颜值, 1, HERO_BASE_CAPS.talent, def.talents.颜值),
    },
    maxHp: 0,
    maxMp: 0,
    maxStamina: clampInt(rec.maxStamina, HERO_BASE_CAPS.minMaxStamina, 999, def.maxStamina),
    agility: 0,
    res: 0,
    ridingSkill: clampInt(rec.ridingSkill, 0, HERO_BASE_CAPS.ridingSkill, def.ridingSkill),
    skills,
  }
}

export interface DerivedHeroEffectiveStats {
  mountKey: MountKey
  qinggongBonus: number
  maxHp: number
  maxMp: number
  maxStamina: number
  agility: number
  res: number
  ridingSkill: number
  skills: Record<string, number>
}

/**
 * 纯函数派生：实战交锋属性（气血/内力/身法/抗性/攻防）无裸身根基，100% 由【6槽运使武学 + 7槽披挂】实时合成；
 * 非战斗养成维度（日常体能、骑术、十艺百工）由角色修为与披挂叠加。
 */
export function deriveHeroEffectiveStats(
  baseStats: HeroBaseStats,
  equipped: EquippedSlotsMap,
  equippedArts: EquippedArtsMap,
  learnedArts: LearnedArtEntry[],
): DerivedHeroEffectiveStats {
  const equipTotals = computeEquipmentTotals(equipped)
  const artTotals = computeEquippedArtsTotals(equippedArts, learnedArts)

  const skills: Record<string, number> = {}
  const allSkillKeys = new Set([
    ...CIVIL_ART_KEYS,
    ...Object.keys(baseStats.skills),
    ...Object.keys(equipTotals.skills),
  ])
  for (const k of allSkillKeys) {
    skills[k] = Math.max(0, (baseStats.skills[k] ?? 0) + (equipTotals.skills[k] ?? 0))
  }

  return {
    mountKey: equipTotals.mountKey,
    qinggongBonus: artTotals.qinggongBonus,
    maxHp: Math.max(HERO_BASE_CAPS.minMaxHp, equipTotals.maxHp + artTotals.maxHp),
    maxMp: Math.max(0, equipTotals.maxMp + artTotals.maxMp),
    maxStamina: Math.max(
      HERO_BASE_CAPS.minMaxStamina,
      baseStats.maxStamina + equipTotals.maxStamina,
    ),
    agility: Math.max(1, equipTotals.agility + artTotals.agility),
    res: Math.max(0, equipTotals.res + artTotals.res),
    ridingSkill: Math.max(0, baseStats.ridingSkill + equipTotals.riding),
    skills,
  }
}

/**
 * 演武精修单次（1时辰 / 10体能）熟练度获取公式：
 * 内功受【根骨】主引（70%根骨 + 30%悟性），轻功与外功受【悟性】主引（70%悟性 + 30%根骨）。
 */
export function calcPracticeArtExpGain(
  art: CompiledMartialArtRecord,
  talents: HeroBaseStats['talents'],
): number {
  const weightedTalent = isArtNeigong(art)
    ? talents.根骨 * 0.7 + talents.悟性 * 0.3
    : talents.悟性 * 0.7 + talents.根骨 * 0.3
  return Math.max(30, Math.round(50 * (0.55 + weightedTalent / 100)))
}

export interface DerivedNpcEffectiveStats {
  maxHp: number
  maxMp: number
  agility: number
  res: number
  totalAttack: number
  totalDefense: number
  equipAttack: number
  artAttack: number
  synergyAttack: number
  equipDefense: number
  artDefense: number
}

export function deriveNpcEffectiveStats(npc: {
  equipped: EquippedSlotsMap
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
}): DerivedNpcEffectiveStats {
  const equipTotals = computeEquipmentTotals(npc.equipped)
  const artTotals = computeEquippedArtsTotals(npc.equippedArts, npc.learnedArts)
  const synergy = computeWeaponArtSynergy(npc.equipped.weapon, npc.equippedArts, npc.learnedArts)

  return {
    maxHp: Math.max(HERO_BASE_CAPS.minMaxHp, equipTotals.maxHp + artTotals.maxHp),
    maxMp: Math.max(0, equipTotals.maxMp + artTotals.maxMp),
    agility: Math.max(1, equipTotals.agility + artTotals.agility),
    res: Math.max(0, equipTotals.res + artTotals.res),
    totalAttack: equipTotals.attack + artTotals.attack + synergy.totalSynergyAttack,
    totalDefense: equipTotals.defense + artTotals.defense,
    equipAttack: equipTotals.attack,
    artAttack: artTotals.attack,
    synergyAttack: synergy.totalSynergyAttack,
    equipDefense: equipTotals.defense,
    artDefense: artTotals.defense,
  }
}
