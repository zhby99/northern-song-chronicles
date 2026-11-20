import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { getArtLevelStats } from '../../data/playerMartialArts'
import type {
  CompiledMartialArtRecord,
  EquippedArtsMap,
  LearnedArtEntry,
} from '../../types/game'
import { COMBAT_EFFECT_REGISTRY } from './effects/registry'
import {
  type CombatActionChoice,
  type CombatantState,
  type CombatSessionState,
  type CombatVfxCategory,
  type DuelStakesKind,
  type FxKey,
  isFxKey,
  type MartialCategoryInstinct,
  MOVE_SLOT_KEYS,
  type MoveActionAvailability,
  type SlotEffectsMap,
} from './types'

export function getLearnedLevel(learnedArts: LearnedArtEntry[], artId: string | null): number {
  if (!artId) return 1
  const found = learnedArts.find((e) => e.artId === artId)
  return found ? Math.max(1, Math.min(10, found.level)) : 1
}

export function getSlotEffectsMap(
  fighter: CombatantState,
  slot: keyof EquippedArtsMap,
): SlotEffectsMap {
  const artId = fighter.equippedArts[slot]
  if (!artId) return {}
  const art = MARTIAL_ART_DB_MAP[artId]
  if (!art) return {}
  const lv = getLearnedLevel(fighter.learnedArts, artId)
  const st = getArtLevelStats(art, lv)
  const map: SlotEffectsMap = {}
  for (const fx of st?.specialEffects ?? []) {
    if (isFxKey(fx.id)) {
      map[fx.id] = fx.value
    }
  }
  return map
}

/** 主动护体外功（如《金刚不坏体神功》）：施展时不出伤害、不耗内力，只在本回合护体减伤 */
export function isGuardMartialArt(art: CompiledMartialArtRecord, level: number): boolean {
  return Boolean(getArtLevelStats(art, level)?.specialEffects?.some((fx) => fx.id === 'jingang_guard'))
}

export function getArtRawDamageAndKind(
  art: CompiledMartialArtRecord,
  level: number,
): { damage: number; kind: '物理' | '奇门'; subTypeLabel: string } {
  if (isGuardMartialArt(art, level)) return { damage: 0, kind: '物理', subTypeLabel: '护体' }
  const st = getArtLevelStats(art, level)
  if (!st) return { damage: 40, kind: '物理', subTypeLabel: '外功' }
  if ((st.poisonDamage ?? 0) > 0) {
    return { damage: st.poisonDamage ?? 0, kind: '奇门', subTypeLabel: '奇毒' }
  }
  if ((st.soundDamage ?? 0) > 0) {
    return { damage: st.soundDamage ?? 0, kind: '奇门', subTypeLabel: '音律' }
  }
  if ((st.hiddenWeaponDamage ?? 0) > 0) {
    return { damage: st.hiddenWeaponDamage ?? 0, kind: '奇门', subTypeLabel: '暗器' }
  }
  return {
    damage: st.physicalDamage ?? 40,
    kind: '物理',
    subTypeLabel: art.category,
  }
}

export function computeEffectiveAgility(fighter: CombatantState): number {
  const qgFx = getSlotEffectsMap(fighter, 'qinggong')
  let haste = 0
  for (const [key, val] of Object.entries(qgFx) as Array<[FxKey, number]>) {
    const mod = COMBAT_EFFECT_REGISTRY[key]?.modifyAgilityPct
    if (mod) haste += mod(val)
  }
  const slow = fighter.slowTurns > 0 ? fighter.slowPct / 100 : 0
  return Math.max(1, Math.round(fighter.agility * (1 + haste - slow)))
}

export function computeMoveMpCost(fighter: CombatantState, moveDamage: number): number {
  // 不出伤害的护体外功不耗内力
  if (moveDamage <= 0) return 0
  const ngFx = getSlotEffectsMap(fighter, 'neigong')
  let savePct = 0
  for (const [key, val] of Object.entries(ngFx) as Array<[FxKey, number]>) {
    const mod = COMBAT_EFFECT_REGISTRY[key]?.modifyMpSavePct
    if (mod) savePct += mod(val)
  }
  return Math.max(1, Math.round(moveDamage * 0.35 * (1 - savePct)))
}

export function getMoveActionsAvailability(fighter: CombatantState): MoveActionAvailability[] {
  return MOVE_SLOT_KEYS.map((slot) => {
    const artId = fighter.equippedArts[slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] ?? null : null
    if (!art) {
      return {
        slot,
        art: null,
        level: 0,
        moveDamage: 0,
        damageKind: '物理',
        mpCost: 0,
        lowMpWarning: false,
        disabled: true,
        disabledReason: '未装配招式',
      }
    }
    const level = getLearnedLevel(fighter.learnedArts, art.id)
    const { damage, kind } = getArtRawDamageAndKind(art, level)
    const mpCost = computeMoveMpCost(fighter, damage)

    let disabled = false
    let disabledReason: string | null = null

    if (fighter.stunnedNextRound) {
      disabled = true
      disabledReason = '受震慑/封穴，本回合无法出招'
    } else if (fighter.lastUsedArtId === art.id) {
      disabled = true
      disabledReason = '禁连发同招（上回合刚施展）'
    } else if (
      fighter.disarmedNextRound &&
      (art.category === '暗器' || art.category === '指法')
    ) {
      disabled = true
      disabledReason = '手腕受震，暂无法施展指法/暗器'
    }

    return {
      slot,
      art,
      level,
      moveDamage: damage,
      damageKind: kind,
      mpCost,
      lowMpWarning: fighter.mp < mpCost,
      disabled,
      disabledReason,
    }
  })
}

export function canFighterEscape(
  escapee: CombatantState,
  pursuer: CombatantState,
  duelStakes: DuelStakesKind = 'spar',
  forbidEscapeReason?: string | null,
): {
  allowed: boolean
  reason: string | null
} {
  if (forbidEscapeReason) {
    return { allowed: false, reason: forbidEscapeReason }
  }
  if (duelStakes === 'zhan_zhao_arrest') {
    return { allowed: false, reason: '开封府天罗地网合围，展护卫剑气封门，无路可逃' }
  }
  if (duelStakes === 'liao_spy_duel') {
    return { allowed: false, reason: '燕云锄奸军令生死决战，不死不休不可临阵脱逃' }
  }
  if (duelStakes === 'kaifeng_warrant') {
    return { allowed: false, reason: '海捕要犯困兽犹斗，狭窄巷陌刀剑相向难以抽身' }
  }
  if (escapee.slowTurns > 0) {
    return { allowed: false, reason: '身陷【绊缠】步法受制，无法脱战' }
  }
  const myAgi = computeEffectiveAgility(escapee)
  const oppAgi = computeEffectiveAgility(pursuer)
  if (oppAgi - myAgi >= 20) {
    return {
      allowed: false,
      reason: `身法比对手低 ${oppAgi - myAgi} 点（低 20 以上无法脱战）`,
    }
  }
  return { allowed: true, reason: null }
}

export function getStrongestLivingEnemy(session: CombatSessionState): CombatantState {
  const living = session.enemies.filter((e) => e.hp > 0)
  if (living.length === 0) return session.npc
  return living.reduce((best, cur) =>
    computeEffectiveAgility(cur) > computeEffectiveAgility(best) ? cur : best,
  )
}

/** 每场战斗至多服用 / 施放丹药毒物的次数 */
export const COMBAT_ITEM_USE_LIMIT = 3

/** 本场是否还能探囊取物 */
export function canUseCombatItem(fighter: Pick<CombatantState, 'itemUses'>): boolean {
  return (fighter.itemUses ?? 0) < COMBAT_ITEM_USE_LIMIT
}

/** 拳掌大类本能「绵劲透甲」无视目标护体防御的比例 */
export const PALM_INSTINCT_PIERCE_PCT = 0.2

export function getMartialCategoryInstinct(category: string): MartialCategoryInstinct | null {
  switch (category) {
    case '拳掌':
      return {
        shortTag: '透甲20%',
        detail: '绵劲透甲：劲力透体直入，命中时无视目标 20% 护体防御（甲胄越厚越见其功）',
      }
    case '刀法':
    case '棍棒':
      return { shortTag: '破守+30%', detail: '刚猛破防：命中守御目标时伤害 +30%' }
    case '剑法':
    case '指法':
      return { shortTag: '先手+10', detail: '疾电抢攻：本合先手身法检定 +10' }
    case '暗器':
      return { shortTag: '无视30%闪', detail: '奇诡难防：无视目标 30% 闪避率' }
    case '毒功':
      return { shortTag: '持续蚀血', detail: '奇毒附骨：命中造成 2 回合持续毒伤' }
    case '音功':
      return { shortTag: '削减内力', detail: '音波乱息：命中直接震散削减敌方内力' }
    case '枪法':
      return { shortTag: '后手+20%', detail: '后发制人：后手反击出招时伤害 +20%' }
    default:
      return null
  }
}

export function computeDodgeChancePreview(
  defender: CombatantState,
  attacker: CombatantState,
  defenderDefending = false,
): number {
  const defAgi = computeEffectiveAgility(defender)
  const atkAgi = computeEffectiveAgility(attacker)
  // 常规身法闪避封顶 35%；天阶轻功（凌波微步/神行百变）在此基础上额外叠加，常态封顶 55%、守御封顶 65%
  let dodge = Math.max(0, Math.min(0.35, ((defAgi - atkAgi) * 0.35 + defAgi * 0.15) / 100))
  const qgDef = getSlotEffectsMap(defender, 'qinggong')
  let qgDodgeBonus = 0
  for (const [key, val] of Object.entries(qgDef) as Array<[FxKey, number]>) {
    const fn = COMBAT_EFFECT_REGISTRY[key]?.computeDodgeOverridePct
    if (fn) {
      qgDodgeBonus = Math.max(qgDodgeBonus, fn(val, defenderDefending, qgDef))
    }
  }
  if (qgDodgeBonus > 0) {
    const qgDodgeCap = defenderDefending ? 0.65 : 0.55
    dodge = Math.min(qgDodgeCap, dodge + qgDodgeBonus)
  }
  if (defender.exposed) {
    dodge *= 0.5
  }
  return Math.max(0, Math.min(1, dodge))
}

export function computeEscapeChancePreview(
  escapee: CombatantState,
  pursuer: CombatantState,
  duelStakes: DuelStakesKind = 'spar',
  forbidEscapeReason?: string | null,
): number {
  if (!canFighterEscape(escapee, pursuer, duelStakes, forbidEscapeReason).allowed) {
    return 0
  }
  const myAgi = computeEffectiveAgility(escapee)
  const oppAgi = computeEffectiveAgility(pursuer)
  const diff = myAgi - oppAgi
  const qgFx = getSlotEffectsMap(escapee, 'qinggong')
  let bonus = 0
  for (const [key, val] of Object.entries(qgFx) as Array<[FxKey, number]>) {
    const fn = COMBAT_EFFECT_REGISTRY[key]?.modifyEscapeBonusPct
    if (fn) bonus += fn(val)
  }
  return Math.max(0.05, Math.min(0.95, 0.5 + diff * 0.022 + bonus))
}

export function describeChoice(fighter: CombatantState, choice: CombatActionChoice): string {
  if (choice.type === 'defend') {
    const gid = choice.guardSlot ? fighter.equippedArts[choice.guardSlot] : null
    const gArt = gid ? MARTIAL_ART_DB_MAP[gid] : null
    return gArt ? `《${gArt.cleanName}》（护体守御）` : '【守御架势】'
  }
  if (choice.type === 'escape') return '【抽身脱战】'
  if (choice.type === 'item') {
    const def = ITEM_DB_MAP[choice.itemId]
    if (!def) return '【探囊取药】'
    return def.poisonEffect ? `【施毒·${def.name}】` : `【服丹·${def.name}】`
  }
  const aid = fighter.equippedArts[choice.slot]
  const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
  return art ? `《${art.cleanName}》` : '【徒手拆招】'
}

export function mapArtCategoryToVfx(cat: string): CombatVfxCategory {
  switch (cat) {
    case '剑法':
      return 'sword'
    case '刀法':
      return 'blade'
    case '拳掌':
      return 'palm'
    case '指法':
      return 'finger'
    case '枪法':
    case '棍棒':
      return 'polearm'
    case '暗器':
      return 'hidden'
    case '音功':
      return 'sonic'
    case '毒功':
      return 'poison'
    default:
      return 'palm'
  }
}
