import { computeEquipmentTotals, DEFAULT_HERO_TALENTS } from '../data/itemsDb'
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
  maxHp: 1200,
  maxMp: 950,
  maxStamina: 100,
  agility: 65,
  res: 40,
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
    maxHp: base.maxHp,
    maxMp: base.maxMp,
    maxStamina: base.maxStamina,
    agility: base.agility,
    res: base.res,
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
    maxHp: clampInt(rec.maxHp, HERO_BASE_CAPS.minMaxHp, 99999, def.maxHp),
    maxMp: clampInt(rec.maxMp, HERO_BASE_CAPS.minMaxMp, 99999, def.maxMp),
    maxStamina: clampInt(rec.maxStamina, HERO_BASE_CAPS.minMaxStamina, 999, def.maxStamina),
    agility: clampInt(rec.agility, 1, HERO_BASE_CAPS.agility, def.agility),
    res: clampInt(rec.res, 0, HERO_BASE_CAPS.res, def.res),
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
 * 纯函数派生：由角色裸装成长根基 (baseStats) + 7槽披挂 + 6槽运使武学 实时合成有效实战与十艺属性。
 * 彻底杜绝穿脱装备或散功切换时因上限截断导致的“永久倒扣基础属性”与“反复穿脱白嫖回血”漏洞。
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
    maxHp: Math.max(
      HERO_BASE_CAPS.minMaxHp,
      baseStats.maxHp + equipTotals.maxHp + artTotals.maxHp,
    ),
    maxMp: Math.max(
      HERO_BASE_CAPS.minMaxMp,
      baseStats.maxMp + equipTotals.maxMp + artTotals.maxMp,
    ),
    maxStamina: Math.max(
      HERO_BASE_CAPS.minMaxStamina,
      baseStats.maxStamina + equipTotals.maxStamina,
    ),
    agility: Math.max(1, baseStats.agility + equipTotals.agility + artTotals.agility),
    res: Math.max(0, baseStats.res + equipTotals.res + artTotals.res),
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
