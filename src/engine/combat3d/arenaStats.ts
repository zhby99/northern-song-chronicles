import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import {
  computeEffectiveAgility,
  computeMoveMpCost,
  getArtRawDamageAndKind,
  getLearnedLevel,
  getSlotEffectsMap,
  isGuardMartialArt,
} from '../combat/formulas'
import type { CombatantState, CombatVfxCategory, MoveSlotKey } from '../combat/types'
import { MOVE_SLOT_KEYS } from '../combat/types'
import type {
  ArenaComputedStats,
  ArenaSkillSpec,
  ArenaThemeKind,
  AttackShapeKind,
  SectArchetype3D,
  WeaponArchetype3D,
} from './types'

export function inferWeaponArchetype(fighter: CombatantState): WeaponArchetype3D {
  const wId = fighter.equipped.weapon
  const item = wId ? ITEM_DB_MAP[wId] : null
  const label = `${item?.subType ?? ''}${item?.name ?? ''}`
  if (label.includes('剑')) return 'sword'
  if (label.includes('刀') || label.includes('斧')) return 'blade'
  if (label.includes('枪') || label.includes('戟') || label.includes('矛')) return 'spear'
  if (label.includes('棍') || label.includes('棒') || label.includes('杖') || label.includes('鞭')) return 'staff'
  if (label.includes('扇') || label.includes('笛') || label.includes('琴')) return 'fan'
  if (label.includes('暗器') || label.includes('镖') || label.includes('针') || label.includes('弹')) return 'hidden'
  // 依据首发武学推断
  const move1 = fighter.equippedArts.move1 ? MARTIAL_ART_DB_MAP[fighter.equippedArts.move1] : null
  const cat = move1?.category ?? ''
  if (cat === '剑法') return 'sword'
  if (cat === '刀法') return 'blade'
  if (cat === '枪法') return 'spear'
  if (cat === '棍棒') return 'staff'
  if (cat === '音功') return 'fan'
  if (cat === '暗器') return 'hidden'
  return 'gauntlet'
}

export function inferSectArchetype(fighter: CombatantState): SectArchetype3D {
  const f = `${fighter.factionName}${fighter.title}${fighter.name}`
  if (f.includes('少林') || f.includes('清凉') || f.includes('南少林') || f.includes('禅')) return 'shaolin_monk'
  if (f.includes('吐蕃') || f.includes('密宗') || f.includes('鸠摩智') || f.includes('番')) return 'western_monk'
  if (f.includes('真武') || f.includes('武当') || f.includes('终南') || f.includes('全真') || f.includes('道')) return 'taoist'
  if (f.includes('丐帮')) return 'beggar'
  if (f.includes('禁军') || f.includes('开封府') || f.includes('大宋') || f.includes('将军') || f.includes('校尉')) return 'imperial_guard'
  if (f.includes('峨眉') || f.includes('玉女') || f.includes('灵鹫') || f.includes('女')) return 'emei_heroine'
  if (f.includes('星宿') || f.includes('唐门') || f.includes('五毒') || f.includes('毒')) return 'poison_adept'
  return 'swordsman'
}

export function categoryToVfx(category: string): CombatVfxCategory {
  if (category.includes('剑')) return 'sword'
  if (category.includes('刀')) return 'blade'
  if (category.includes('枪') || category.includes('棍')) return 'polearm'
  if (category.includes('暗器')) return 'hidden'
  if (category.includes('音')) return 'sonic'
  if (category.includes('毒')) return 'poison'
  if (category.includes('指')) return 'finger'
  return 'palm'
}

export function categoryToShape(category: string, isGuard: boolean): AttackShapeKind {
  if (isGuard) return 'guard_buff'
  if (category.includes('暗器') || category.includes('指')) return 'projectile'
  if (category.includes('音') || category.includes('毒')) return 'nova'
  if (category.includes('枪')) return 'thrust'
  return 'arc'
}

/**
 * 严格使用四维实战属性（气血 / 身法 / 内力 / 抗性）与武学披挂推导 3D 演武参数；
 * 先天三维（根骨 / 悟性 / 颜值）严禁参与战中任何计算。
 */
export function computeArenaStats(fighter: CombatantState): ArenaComputedStats {
  const effAgi = computeEffectiveAgility(fighter)
  const ngFx = getSlotEffectsMap(fighter, 'neigong')
  const qgFx = getSlotEffectsMap(fighter, 'qinggong')

  const agiNorm = Math.max(0, Math.min(1.5, (effAgi - 20) / 110))
  const moveSpeed = 4.9 + agiNorm * 2.1
  const dodgeCooldownMax = Math.max(0.56, 0.96 - agiNorm * 0.28)
  const dodgeInvulnSec = 0.25 + agiNorm * 0.1
  const dodgeDurationSec = 0.34
  const parryWindowSec = Math.min(0.28, 0.22 + agiNorm * 0.04)

  const totalDefense = Math.max(0, fighter.res + fighter.equipDefense)
  const maxPosture = Math.round(90 + totalDefense * 1.45)
  const postureRegenPerSec = 14 + totalDefense * 0.18
  const physMitigation = Math.min(0.62, totalDefense / (totalDefense + 160))
  const qiMitigation = Math.min(0.58, fighter.res / (fighter.res + 135))
  const poiseThreshold = Math.round(18 + fighter.res * 0.35)

  const weaponArchetype = inferWeaponArchetype(fighter)
  const sectArchetype = inferSectArchetype(fighter)
  const move1 = fighter.equippedArts.move1 ? MARTIAL_ART_DB_MAP[fighter.equippedArts.move1] : null
  const primaryVfx = move1 ? categoryToVfx(move1.category) : categoryToVfx(weaponArchetype)

  const lifeStealPct = ((ngFx.beiming_drain ?? 0) + (ngFx.jiuyin_heal ?? 0)) / 100
  const mpDrainPct = (ngFx.beiming_drain ?? 0) / 100
  const guardReboundPct = (ngFx.jingang_rebound ?? 0) / 100
  const hasXiaowuxiangSave = Boolean(ngFx.xiaowuxiang_save)
  const damageAmpPct =
    ((ngFx.taixuan_amp ?? 0) + (ngFx.xiaowuxiang_amp ?? 0) + (ngFx.bahuang_dom ?? 0)) / 100

  const qiDrive = 1 + Math.sqrt(Math.max(0, fighter.mp)) * 0.008
  const baseAttackDamage = Math.max(
    18,
    Math.round((22 + fighter.equipAttack * 0.48 + effAgi * 0.12) * qiDrive),
  )
  const critChance = Math.min(0.35, 0.08 + agiNorm * 0.12 + (qgFx.kuihua_haste ? 0.08 : 0))

  return {
    moveSpeed,
    dodgeCooldownMax,
    dodgeInvulnSec,
    dodgeDurationSec,
    parryWindowSec,
    maxPosture,
    postureRegenPerSec,
    physMitigation,
    qiMitigation,
    poiseThreshold,
    critChance,
    baseAttackDamage,
    weaponArchetype,
    sectArchetype,
    primaryVfx,
    lifeStealPct,
    mpDrainPct,
    guardReboundPct,
    hasXiaowuxiangSave,
    damageAmpPct,
  }
}

export function buildArenaSkills(fighter: CombatantState): ArenaSkillSpec[] {
  const list: ArenaSkillSpec[] = []
  for (const slot of MOVE_SLOT_KEYS) {
    const artId = fighter.equippedArts[slot]
    if (!artId) continue
    const art = MARTIAL_ART_DB_MAP[artId]
    if (!art) continue
    const lv = getLearnedLevel(fighter.learnedArts, artId)
    const { damage } = getArtRawDamageAndKind(art, lv)
    const guardSkill = isGuardMartialArt(art, lv)
    const isHeavenTier = art.tier.startsWith('天阶')
    const mpCost = computeMoveMpCost(fighter, damage)
    const synPct = fighter.synergyBonusBySlot[slot] ?? 0
    const qiDrive = 1 + Math.sqrt(Math.max(0, fighter.mp)) * 0.012
    const rawDamage = guardSkill ? 0 : Math.round(damage * qiDrive * (1 + synPct / 100))
    const vfxCategory = guardSkill ? 'guard' : categoryToVfx(art.category)
    const shape = categoryToShape(art.category, guardSkill)
    const fxTags = Object.keys(getSlotEffectsMap(fighter, slot))

    const reach =
      shape === 'projectile'
        ? 8.5
        : shape === 'nova'
          ? 4.2
          : shape === 'thrust'
            ? 3.7
            : 3.1
    const arcHalfAngle = shape === 'nova' ? Math.PI : shape === 'thrust' ? 0.45 : 1.15
    const cooldownMax = guardSkill ? 6.0 : isHeavenTier ? 6.5 : 4.2

    list.push({
      slot: slot as MoveSlotKey,
      artId: art.id,
      name: art.cleanName,
      category: art.category,
      vfxCategory,
      shape,
      isHeavenTier,
      rawDamage,
      mpCost,
      cooldownMax,
      cooldown: 0,
      reach,
      arcHalfAngle,
      windupSec: guardSkill ? 0.1 : isHeavenTier ? 0.18 : 0.14,
      coilSec: 0.08,
      slashSec: 0.16,
      followSec: 0.2,
      postureDamage: guardSkill ? 0 : isHeavenTier ? 38 : 24,
      knockback: shape === 'nova' ? 2.4 : isHeavenTier ? 2.1 : 1.4,
      unblockable: isHeavenTier && (art.category === '掌法' || art.category === '拳掌' || art.category === '音功'),
      isGuardSkill: guardSkill,
      fxTags,
    })
  }
  return list
}

export function inferArenaTheme(sceneTitle: string): ArenaThemeKind {
  if (sceneTitle.includes('塞') || sceneTitle.includes('辽') || sceneTitle.includes('夏') || sceneTitle.includes('大漠') || sceneTitle.includes('关')) {
    return 'frontier'
  }
  if (sceneTitle.includes('山') || sceneTitle.includes('寺') || sceneTitle.includes('观') || sceneTitle.includes('峰') || sceneTitle.includes('崖')) {
    return 'mountain'
  }
  if (sceneTitle.includes('市') || sceneTitle.includes('街') || sceneTitle.includes('坊') || sceneTitle.includes('楼') || sceneTitle.includes('镇')) {
    return 'market'
  }
  return 'courtyard'
}
