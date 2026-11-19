import type { GameItemDef, HeroBaseStats, TenArtKey } from '../../types/game'
import { syncArtLevelsToExpsAndMilestones } from './artsProgression'
import { cloneHeroBaseStats, HERO_BASE_CAPS } from './heroStats'

export interface ApplyConsumableStatEffectsInput {
  itemDef: GameItemDef
  baseStats: HeroBaseStats
  artExps: Record<string, number>
  artMilestoneFlags: string[]
  food: number
}

export interface ApplyConsumableStatEffectsResult {
  baseStats: HeroBaseStats
  artExps: Record<string, number>
  artMilestoneFlags: string[]
  food: number
  notes: string[]
}

/**
 * 统一结算消耗品（丹药、典籍、干粮等）的永久属性上限、十艺百工与先天悟性收益，
 * 确保行囊服食与战斗探囊走完全一致的上限钳制与十艺经验/里程碑同步逻辑。
 */
export function applyConsumableStatEffects(
  input: ApplyConsumableStatEffectsInput,
): ApplyConsumableStatEffectsResult {
  const { itemDef, artExps, artMilestoneFlags } = input
  const eff = itemDef.useEffect
  const nextBaseStats = cloneHeroBaseStats(input.baseStats)
  let nextFood = input.food
  const notes: string[] = []

  if (!eff) {
    return {
      baseStats: nextBaseStats,
      artExps,
      artMilestoneFlags,
      food: nextFood,
      notes,
    }
  }

  const isPermanentElixir =
    itemDef.category === 'medicine' &&
    (itemDef.rarity === '天阶' || itemDef.rarity === '地阶')
  if (isPermanentElixir) {
    if (eff.maxHp) {
      nextBaseStats.maxHp = (nextBaseStats.maxHp ?? 0) + eff.maxHp
      notes.push(`气血上限永久 +${eff.maxHp}`)
    }
    if (eff.maxMp) {
      nextBaseStats.maxMp = (nextBaseStats.maxMp ?? 0) + eff.maxMp
      notes.push(`内力上限永久 +${eff.maxMp}`)
    }
    if (eff.agi) {
      nextBaseStats.agility = (nextBaseStats.agility ?? 0) + eff.agi
      notes.push(`身法永久 +${eff.agi}`)
    }
    if (eff.res) {
      nextBaseStats.res = (nextBaseStats.res ?? 0) + eff.res
      notes.push(`抗性永久 +${eff.res}`)
    }
  }

  const touchedArtKeys: TenArtKey[] = []
  if (eff.riding) {
    const prev = nextBaseStats.ridingSkill
    nextBaseStats.ridingSkill = Math.min(HERO_BASE_CAPS.ridingSkill, prev + eff.riding)
    touchedArtKeys.push('骑术')
    notes.push(
      nextBaseStats.ridingSkill > prev
        ? `【骑术】+${nextBaseStats.ridingSkill - prev}`
        : `【骑术】根基已满 (${HERO_BASE_CAPS.ridingSkill})`,
    )
  }
  if (eff.skillGain) {
    const [sk, gain] = eff.skillGain
    const prev = nextBaseStats.skills[sk] ?? 40
    nextBaseStats.skills[sk] = Math.min(HERO_BASE_CAPS.civilSkill, prev + gain)
    touchedArtKeys.push(sk as TenArtKey)
    notes.push(
      nextBaseStats.skills[sk] > prev
        ? `【${sk}】+${nextBaseStats.skills[sk] - prev}`
        : `【${sk}】根基已满 (${HERO_BASE_CAPS.civilSkill})`,
    )
  }
  if (eff.skillsGain) {
    for (const [sk, gain] of Object.entries(eff.skillsGain)) {
      const prev = nextBaseStats.skills[sk] ?? 40
      nextBaseStats.skills[sk] = Math.min(HERO_BASE_CAPS.civilSkill, prev + gain)
      touchedArtKeys.push(sk as TenArtKey)
      notes.push(
        nextBaseStats.skills[sk] > prev
          ? `【${sk}】+${nextBaseStats.skills[sk] - prev}`
          : `【${sk}】根基已满 (${HERO_BASE_CAPS.civilSkill})`,
      )
    }
  }
  if (eff.wuxing) {
    const prev = nextBaseStats.talents.悟性
    nextBaseStats.talents.悟性 = Math.min(HERO_BASE_CAPS.talent, prev + eff.wuxing)
    notes.push(
      nextBaseStats.talents.悟性 > prev
        ? `【悟性】永久 +${nextBaseStats.talents.悟性 - prev}`
        : `【悟性】天赋已满 (${HERO_BASE_CAPS.talent})`,
    )
  }

  const syncedArts =
    touchedArtKeys.length > 0
      ? syncArtLevelsToExpsAndMilestones({
          baseStats: nextBaseStats,
          artExps,
          artMilestoneFlags,
          keysToSync: touchedArtKeys,
        })
      : {
          artExps,
          artMilestoneFlags,
          milestoneNotes: [],
        }
  if (syncedArts.milestoneNotes.length > 0) {
    notes.push(...syncedArts.milestoneNotes)
  }

  if (eff.food) {
    nextFood += eff.food
    notes.push(`粮草 +${eff.food}日份`)
  }

  return {
    baseStats: nextBaseStats,
    artExps: syncedArts.artExps,
    artMilestoneFlags: syncedArts.artMilestoneFlags,
    food: nextFood,
    notes,
  }
}
