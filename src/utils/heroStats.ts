import { BUILDING_DB_MAP, FACTION_DB_MAP } from '../data/gameDb'
import {
  computeEquipmentTotals,
  computeWeaponArtSynergy,
  DEFAULT_HERO_TALENTS,
} from '../data/itemsDb'
import { computeEquippedArtsTotals, isArtNeigong } from '../data/playerMartialArts'
import type {
  CompiledBuildingRecord,
  CompiledMartialArtRecord,
  CultivationVenueStatus,
  EquippedArtsMap,
  EquippedSlotsMap,
  HeroBaseStats,
  LearnedArtEntry,
  MountKey,
  ViewMode,
  WildernessCamp,
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

export const DAILY_INN_LODGING_COST = 3

export const INITIAL_HERO_AGE = 12
export const DAYS_PER_YEAR = 360

export function getHeroAge(dayCount: number): number {
  const zeroIdx = Math.max(0, Math.floor(dayCount) - 1)
  return INITIAL_HERO_AGE + Math.floor(zeroIdx / DAYS_PER_YEAR)
}

export const HERO_BASE_CAPS = {
  minMaxHp: 100,
  minMaxMp: 50,
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
  agility: number
  res: number
  ridingSkill: number
  skills: Record<string, number>
}

/**
 * 纯函数派生：实战交锋属性（气血/内力/身法/抗性/攻防）无裸身根基，100% 由【6槽运使武学 + 7槽披挂】实时合成；
 * 非战斗养成维度（骑术、十艺百工）由角色修为与披挂叠加。
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
    agility: Math.max(1, equipTotals.agility + artTotals.agility),
    res: Math.max(0, equipTotals.res + artTotals.res),
    ridingSkill: Math.max(0, baseStats.ridingSkill + equipTotals.riding),
    skills,
  }
}

/**
 * 按日闭关修炼单日熟练度获取公式（强天赋四次方区分）：
 * - 内功加权禀赋 T = 0.7 * 根骨 + 0.3 * 悟性
 * - 轻功与外功加权禀赋 T = 0.7 * 悟性 + 0.3 * 根骨
 * - 禀赋系数 M_禀赋 = 0.2 + 4 * (T / 100)^4
 * - 单日获取 E_day = round(100 * M_禀赋 * M_场所)
 */
export function calcDailyExpByCategory(
  isNeigong: boolean,
  talents: HeroBaseStats['talents'],
  venueMultiplier = 1.0,
): number {
  const t = isNeigong
    ? talents.根骨 * 0.7 + talents.悟性 * 0.3
    : talents.悟性 * 0.7 + talents.根骨 * 0.3
  const talentMult = 0.2 + 4 * Math.pow(t / 100, 4)
  return Math.max(1, Math.round(100 * talentMult * venueMultiplier))
}

export function calcDailyCultivationExpGain(
  art: CompiledMartialArtRecord,
  talents: HeroBaseStats['talents'],
  venueMultiplier = 1.0,
): number {
  return calcDailyExpByCategory(isArtNeigong(art), talents, venueMultiplier)
}

export function isPlayerInOwnSectRegion(
  currentNodeId: string,
  campPos: WildernessCamp | null | undefined,
  sectId: string | null | undefined,
): boolean {
  if (campPos || !sectId) return false
  const faction = FACTION_DB_MAP[sectId]
  if (!faction?.hqRegionId) return false
  return currentNodeId === faction.hqRegionId
}

export function isInnBuildingRecord(bldg: CompiledBuildingRecord | null | undefined): boolean {
  if (!bldg) return false
  return (
    bldg.id.endsWith('_base_inn') ||
    bldg.name.includes('客栈') ||
    bldg.name.includes('馆驿') ||
    bldg.name.includes('驿馆') ||
    bldg.name.includes('客舍')
  )
}

export interface ResolveCultivationVenueInput {
  traveling: boolean
  campPos: WildernessCamp | null | undefined
  viewMode: ViewMode
  currentNodeId: string
  activeRegionId: string
  activeBuildingInteriorId: string | null
  selectedBuildingId: string | null
  sectId: string | null | undefined
}

export function resolveCultivationVenue(
  input: ResolveCultivationVenueInput,
): CultivationVenueStatus {
  const isOwnSectCity = isPlayerInOwnSectRegion(input.currentNodeId, input.campPos, input.sectId)

  if (input.traveling) {
    return {
      venue: null,
      venueLabel: '行军途中（不可闭关）',
      multiplier: 1.0,
      dailySilverCost: 0,
      dailyFoodCost: 0,
      isOwnSectCity,
      blockedReason: '正在官道行军赶路途中，请先【驻扎露营】或抵达城池后再行闭关！',
    }
  }

  if (input.campPos) {
    return {
      venue: 'wilderness_camp',
      venueLabel: '旷野扎营闭关',
      multiplier: 0.85,
      dailySilverCost: 0,
      dailyFoodCost: 1,
      isOwnSectCity: false,
      blockedReason: null,
    }
  }

  const faction = input.sectId ? FACTION_DB_MAP[input.sectId] : null
  const isViewingCurrentRegion =
    input.viewMode !== 'world' && input.activeRegionId === input.currentNodeId
  const effectiveBuildingId = isViewingCurrentRegion
    ? (input.activeBuildingInteriorId ?? input.selectedBuildingId)
    : null
  const bldg = effectiveBuildingId ? BUILDING_DB_MAP[effectiveBuildingId] : null

  if (
    bldg &&
    bldg.regionId === input.currentNodeId &&
    faction &&
    faction.coreBuildingIds.includes(bldg.id)
  ) {
    return {
      venue: 'sect_grounds',
      venueLabel: `${faction.shortName || faction.name} · 师门演武场`,
      multiplier: 1.25,
      dailySilverCost: 0,
      dailyFoodCost: 0,
      isOwnSectCity,
      blockedReason: null,
    }
  }

  if (bldg && bldg.regionId === input.currentNodeId && isInnBuildingRecord(bldg)) {
    return {
      venue: 'inn',
      venueLabel: isOwnSectCity ? `${bldg.name}（师门驻地免宿费）` : `${bldg.name}（客栈闭关）`,
      multiplier: 1.0,
      dailySilverCost: isOwnSectCity ? 0 : DAILY_INN_LODGING_COST,
      dailyFoodCost: 0,
      isOwnSectCity,
      blockedReason: null,
    }
  }

  return {
    venue: null,
    venueLabel: '未处于闭关场所',
    multiplier: 1.0,
    dailySilverCost: isOwnSectCity ? 0 : DAILY_INN_LODGING_COST,
    dailyFoodCost: 0,
    isOwnSectCity,
    blockedReason:
      '只能在城池【客栈/馆驿】、【本门派演武驻地】或大地图【野外扎营】三类场所发起闭关修炼！',
  }
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
