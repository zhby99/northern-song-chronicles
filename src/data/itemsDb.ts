import {
  GEAR_DB,
  MARTIAL_ART_DB_MAP,
  MOUNT_DB_MAP,
  MOUNTS_DB,
  UNIQUE_ARTIFACT_MAP,
  WEAPONS_DB,
} from './gameDb'
import { computeEquippedArtsTotals, computeSingleArtBonus } from './playerMartialArts'
import type {
  BagCategoryKey,
  CompiledGearRecord,
  CompiledMountRecord,
  CompiledUniqueArtifactRecord,
  CompiledWeaponRecord,
  EquipmentSlotKey,
  EquipmentStatBonus,
  EquipmentTier,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameItemDef,
  InventoryStack,
  ItemRarity,
  LearnedArtEntry,
  MartialArtSlotKey,
  MountKey,
} from '../types/game'
import rawNonEquipmentItems from './nonEquipmentItems.json'
import { SCROLLS_ITEMS_DB } from './scrollsDb'

export { SCROLLS_ITEMS_DB }
export type TreasureVolumeKey = 'scrolls' | 'medicine' | 'tools'

export const DEFAULT_HERO_TALENTS = {
  根骨: 72,
  悟性: 84,
  颜值: 78,
} as const

export const EQUIPMENT_SLOT_METAS: Array<{
  slot: EquipmentSlotKey
  label: string
  shortLabel: string
  seal: string
  hint: string
  column: 'left' | 'right' | 'bottom'
}> = [
  {
    slot: 'weapon',
    label: '武 器',
    shortLabel: '武器',
    seal: '兵',
    hint: '百兵谱 100 种已定稿 · 增幅外功杀伤与武学共鸣',
    column: 'left',
  },
  {
    slot: 'bow',
    label: '弓 箭',
    shortLabel: '弓箭',
    seal: '射',
    hint: '强弓劲弩谱 28 种已定稿 · 猎弓角弓神臂远射',
    column: 'left',
  },
  {
    slot: 'accessory1',
    label: '配饰壹',
    shortLabel: '配饰壹',
    seal: '佩',
    hint: '玉佩奇珍谱 56 种已定稿 · 玉佩护心镜凝神护体',
    column: 'left',
  },
  {
    slot: 'armor',
    label: '服 饰',
    shortLabel: '服饰',
    seal: '衣',
    hint: '衣甲服饰谱 56 种已定稿 · 劲装澜衫宝甲护佑气血',
    column: 'right',
  },
  {
    slot: 'shoes',
    label: '鞋 履',
    shortLabel: '鞋履',
    seal: '履',
    hint: '履靴行缠谱 28 种已定稿 · 麻鞋快靴云履提振身法',
    column: 'right',
  },
  {
    slot: 'accessory2',
    label: '配饰贰',
    shortLabel: '配饰贰',
    seal: '饰',
    hint: '玉佩奇珍谱 56 种已定稿 · 佛珠香囊信物抗性机缘',
    column: 'right',
  },
  {
    slot: 'curio1',
    label: '雅器壹',
    shortLabel: '雅器壹',
    seal: '雅',
    hint: '雅器百工谱 50 种已定稿 · 名琴纹枰文房百工随身佩戴增益',
    column: 'left',
  },
  {
    slot: 'curio2',
    label: '雅器贰',
    shortLabel: '雅器贰',
    seal: '器',
    hint: '雅器百工谱 50 种已定稿 · 浑仪算具香茗奇器随身佩戴增益',
    column: 'right',
  },
  {
    slot: 'mount',
    label: '坐 骑',
    shortLabel: '坐骑',
    seal: '骑',
    hint: '名驹谱 28 种已定稿 · 空置时徒步急行 60 里/日',
    column: 'bottom',
  },
]

export const BAG_CATEGORY_METAS: Array<{
  key: BagCategoryKey
  numeral: string
  label: string
  seal: string
  subtitle: string
}> = [
  {
    key: 'scrolls',
    numeral: '壹',
    label: '典籍书画',
    seal: '卷',
    subtitle: '百卷秘藏：武学秘籍残卷、法帖碑刻、名家书画、经史兵书与百工琴棋谱（10天阶·20地阶·30良阶·40凡阶）',
  },
  {
    key: 'medicine',
    numeral: '贰',
    label: '丹药毒物',
    seal: '丹',
    subtitle: '疗伤回气金创灵丹、调息固本药膳、奇门毒粉与解毒丸散',
  },
  {
    key: 'tools',
    numeral: '叁',
    label: '雅器百工',
    seal: '器',
    subtitle: '名琴纹枰、澄心端砚、五大名窑茶香雅具、活字浑仪算具与杏林百工奇器（全库 50 种）',
  },
  {
    key: 'misc',
    numeral: '肆',
    label: '行囊杂物',
    seal: '杂',
    subtitle: '随身备用百兵武器、名驹鞍辔坐骑、后续各卷披挂、关防路引、门派信物与四海奇珍',
  },
]

export const RARITY_STYLE_MAP: Record<
  ItemRarity,
  {
    badgeBg: string
    badgeText: string
    borderCls: string
    cardBg: string
    glowText: string
  }
> = {
  天阶: {
    badgeBg: 'bg-[#8f1d14]',
    badgeText: 'text-[#ffe8a3]',
    borderCls: 'border-[#d49b27]',
    cardBg: 'bg-gradient-to-br from-[#fff7e2] to-[#f4e0b8]',
    glowText: 'text-[#8f1d14]',
  },
  地阶: {
    badgeBg: 'bg-[#5b3b73]',
    badgeText: 'text-[#f8effc]',
    borderCls: 'border-[#7c529c]',
    cardBg: 'bg-gradient-to-br from-[#faf3ff] to-[#ebe0f5]',
    glowText: 'text-[#5b3b73]',
  },
  良阶: {
    badgeBg: 'bg-[#215744]',
    badgeText: 'text-[#ecfdf5]',
    borderCls: 'border-[#3f856b]',
    cardBg: 'bg-gradient-to-br from-[#f2fbf7] to-[#dceee6]',
    glowText: 'text-[#1c4d3b]',
  },
  凡阶: {
    badgeBg: 'bg-[#6b5338]',
    badgeText: 'text-[#fbf4e6]',
    borderCls: 'border-[#9e8462]',
    cardBg: 'bg-[#faf3e3]',
    glowText: 'text-[#52391e]',
  },
  良品: {
    badgeBg: 'bg-[#215744]',
    badgeText: 'text-[#ecfdf5]',
    borderCls: 'border-[#3f856b]',
    cardBg: 'bg-gradient-to-br from-[#f2fbf7] to-[#dceee6]',
    glowText: 'text-[#1c4d3b]',
  },
  凡品: {
    badgeBg: 'bg-[#6b5338]',
    badgeText: 'text-[#fbf4e6]',
    borderCls: 'border-[#9e8462]',
    cardBg: 'bg-[#faf3e3]',
    glowText: 'text-[#52391e]',
  },
}

// 由 docs/EQUIPMENT_COMPENDIUM.md 第十一~十四卷自动编译（101 卷典籍 + 115 种丹药雅器行囊信物）
const NON_EQUIPMENT_ITEMS: GameItemDef[] = [
  ...SCROLLS_ITEMS_DB,
  ...(rawNonEquipmentItems as unknown as GameItemDef[]),
]

// 将《披挂总纲·百兵谱》编译生成的 100 种武器（10天/20地/30良/40凡）映射为统一物品定义（旧 14 件占位披挂已全部移除）
export const WEAPON_ITEMS_DB: GameItemDef[] = WEAPONS_DB.map((w) => ({
  id: w.id,
  name: w.name,
  category: 'misc',
  subType: `披挂 · 武器（${w.weaponType}）`,
  rarity: w.tier,
  equipSlot: 'weapon',
  stackable: false,
  value: w.value,
  desc: w.description,
  lore: `${w.originFull} · 劲力【${w.forceTrait}】 · 射程 ${w.attackRange} 格`,
  equipBonus: w.equipBonus,
  weaponMeta: w,
}))

export const MOUNT_ITEMS_DB: GameItemDef[] = MOUNTS_DB.map((m) => ({
  id: m.id,
  name: m.name,
  category: 'misc',
  subType: `披挂 · 坐骑（${m.breedCategory}）`,
  rarity: m.tier,
  equipSlot: 'mount',
  stackable: false,
  value: m.value,
  desc: m.description,
  lore: `${m.originFull} · 日行基础 ${m.baseSpeed} 里 · 地貌【${m.terrainTrait}+${m.terrainBonusPct}%】`,
  equipBonus: {
    ...m.equipBonus,
    mountKey: m.id as MountKey,
  },
  mountMeta: m,
}))

export const GEAR_ITEMS_DB: GameItemDef[] = GEAR_DB.map((g) => ({
  id: g.id,
  name: g.name,
  category: 'misc' as const,
  subType: g.subType,
  rarity: g.tier === '天阶' ? '天阶' : g.tier === '地阶' ? '地阶' : g.tier === '良阶' ? '良品' : '凡品',
  equipSlot: g.slot === 'accessory' ? 'accessory1' : g.slot,
  stackable: false,
  value: g.value,
  desc: g.specialTag ? `【${g.specialTag}】${g.description}` : g.description,
  lore: `${g.tier}${g.grade} · 产地：${g.origin}`,
  equipBonus: g.equipBonus,
  gearMeta: g,
}))

export const ITEMS_DB: GameItemDef[] = [
  ...NON_EQUIPMENT_ITEMS,
  ...WEAPON_ITEMS_DB,
  ...MOUNT_ITEMS_DB,
  ...GEAR_ITEMS_DB,
]

export const ITEM_DB_MAP: Record<string, GameItemDef> = Object.fromEntries(
  ITEMS_DB.map((it) => [it.id, it]),
)

export function normalizeItemTier(rarity: ItemRarity): EquipmentTier {
  if (rarity === '良品') return '良阶'
  if (rarity === '凡品') return '凡阶'
  return rarity
}

export const MEDICINE_ITEMS_DB: GameItemDef[] = NON_EQUIPMENT_ITEMS.filter(
  (it) => it.category === 'medicine',
)

export const TOOLS_ITEMS_DB: GameItemDef[] = NON_EQUIPMENT_ITEMS.filter(
  (it) => it.category === 'tools',
)

export const TREASURE_COMPENDIUM_ITEMS: GameItemDef[] = NON_EQUIPMENT_ITEMS.filter(
  (it): it is GameItemDef & { category: TreasureVolumeKey } =>
    it.category === 'scrolls' || it.category === 'medicine' || it.category === 'tools',
)

export const TREASURE_VOLUME_METAS: Array<{
  key: TreasureVolumeKey
  volNumeral: string
  label: string
  seal: string
  tierSummary: string
  subtitle: string
}> = [
  {
    key: 'scrolls',
    volNumeral: '卷壹',
    label: '典籍书画',
    seal: '卷',
    tierSummary: '10天阶 · 20地阶 · 30良阶 · 40凡阶',
    subtitle: '武学秘籍残卷、法帖碑刻、五代北宋名家书画真迹、庆历经史兵书与琴棋清谱（共 100 卷）',
  },
  {
    key: 'medicine',
    volNumeral: '卷贰',
    label: '丹药毒物',
    seal: '丹',
    tierSummary: '5天阶 · 5地阶 · 10良阶 · 10凡阶',
    subtitle: '佛道镇派圣药、太医局宫廷方剂、皇祐熟药所丸散药膳与西域南疆奇毒暗器涂剂（共 30 品）',
  },
  {
    key: 'tools',
    volNumeral: '卷叁',
    label: '雅器百工',
    seal: '器',
    tierSummary: '5天阶 · 10地阶 · 15良阶 · 20凡阶',
    subtitle: '传世古琴纹枰、澄心端砚、名窑茶香雅具、活字水运天算重器与杏林百工器具（共 50 件）',
  },
]

// 七槽初始状态：佩备凡阶上品【青萍游侠剑】并乘骑天阶上品名驹【大宛汗血追风骥】（MNT-001）便于测试千里行军与换骑
export const DEFAULT_EQUIPPED_SLOTS: EquippedSlotsMap = {
  weapon: 'WPN-061',
  armor: 'ARM-034',
  shoes: 'BOT-018',
  bow: 'BOW-018',
  accessory1: 'ACC-033',
  accessory2: 'ACC-035',
  curio1: null,
  curio2: null,
  mount: 'MNT-001',
}

export const DEFAULT_INITIAL_INVENTORY: InventoryStack[] = [
  // 典籍书画（开局随身筑基秘籍与大宋风雅诗文舆图）
  { itemId: 'ITM-SCR-061', qty: 1 }, // 《太祖长拳谱》手抄本（凡品）
  { itemId: 'ITM-SCR-065', qty: 2 }, // 《呼延硬鞭法》军中简本（凡品）
  { itemId: 'ITM-SCR-081', qty: 1 }, // 《柳屯田乐章集》樊楼新唱钞本（凡品）
  { itemId: 'ITM-SCR-089', qty: 1 }, // 《大宋皇祐九域驿程道里图》折叠册（凡品）
  { itemId: 'ITM-SCR-034', qty: 1 }, // 《洛阳金刀谱》拓本（良品）
  { itemId: 'ITM-SCR-046', qty: 1 }, // 范仲淹《答手诏条陈十事》庆历政书刻本（良品）
  // 丹药毒物（随身初始常备丹膳与防身毒物）
  { itemId: 'ITM-MED-121', qty: 3 },
  { itemId: 'ITM-MED-124', qty: 4 },
  { itemId: 'ITM-MED-111', qty: 2 },
  { itemId: 'ITM-MED-114', qty: 1 },
  { itemId: 'ITM-MED-119', qty: 1 },
  { itemId: 'ITM-MED-128', qty: 2 },
  // 雅器百工（开局随身常备新雅器代表）
  { itemId: 'ITM-CUR-016', qty: 1 },
  { itemId: 'ITM-CUR-017', qty: 1 },
  { itemId: 'ITM-CUR-033', qty: 1 },
  { itemId: 'ITM-CUR-037', qty: 1 },
  { itemId: 'ITM-CUR-049', qty: 1 },
  // 行囊杂物（含 3 把备用兵刃 + 1 匹秦州茶马良驹备用换乘）
  { itemId: 'WPN-068', qty: 1 }, // 少林白蜡齐眉棍（凡阶上品·棍棒）
  { itemId: 'WPN-072', qty: 1 }, // 汴京铁骨纸扇（凡阶上品·奇门音兵，绝配折扇点穴功）
  { itemId: 'WPN-033', qty: 1 }, // 洛阳九环金背刀（良阶上品·刀，绝配洛阳金刀谱）
  { itemId: 'MNT-009', qty: 1 }, // 秦州茶马上等河曲驹（良阶上品·青唐番马，便于测试换骑对比）
  { itemId: 'ITM-MSC-001', qty: 1 },
  { itemId: 'ITM-MSC-002', qty: 1 },
]

export function isAccessorySlot(slot: EquipmentSlotKey): boolean {
  return slot === 'accessory1' || slot === 'accessory2'
}

export function isCurioSlot(slot: EquipmentSlotKey): boolean {
  return slot === 'curio1' || slot === 'curio2'
}

export function canItemFitSlot(item: GameItemDef, targetSlot: EquipmentSlotKey): boolean {
  if (!item.equipSlot) return false
  if (isAccessorySlot(targetSlot) && isAccessorySlot(item.equipSlot)) {
    return true
  }
  if (isCurioSlot(targetSlot) && isCurioSlot(item.equipSlot)) {
    return true
  }
  return item.equipSlot === targetSlot
}

export interface PlayerEquipCheckContext {
  maxHp: number
  maxMp: number
  agility: number
  res: number
  ridingSkill: number
  skills: Record<string, number>
  talents?: {
    根骨: number
    悟性: number
    颜值: number
  }
}

export interface EquipReqCheckDetail {
  stat: string
  min: number
  current: number
  met: boolean
}

export function checkStatRequirementList(
  statRequirements: Array<{ stat: string; min: number }> | undefined | null,
  ctx: PlayerEquipCheckContext,
): {
  ok: boolean
  details: EquipReqCheckDetail[]
} {
  if (!statRequirements || statRequirements.length === 0) {
    return { ok: true, details: [] }
  }
  const talents = ctx.talents ?? DEFAULT_HERO_TALENTS
  const details: EquipReqCheckDetail[] = statRequirements.map((req) => {
    let current = 0
    if (req.stat === '根骨') current = talents.根骨
    else if (req.stat === '悟性') current = talents.悟性
    else if (req.stat === '颜值') current = talents.颜值
    else if (req.stat === '气血') current = ctx.maxHp
    else if (req.stat === '内力') current = ctx.maxMp
    else if (req.stat === '身法') current = ctx.agility
    else if (req.stat === '抗性') current = ctx.res
    else if (req.stat === '骑术') current = ctx.ridingSkill
    else current = ctx.skills[req.stat] ?? 0

    return {
      stat: req.stat,
      min: req.min,
      current,
      met: current >= req.min,
    }
  })

  return {
    ok: details.every((d) => d.met),
    details,
  }
}

export function checkWeaponEquipRequirements(
  weapon: CompiledWeaponRecord | undefined | null,
  ctx: PlayerEquipCheckContext,
): {
  ok: boolean
  details: EquipReqCheckDetail[]
} {
  return checkStatRequirementList(weapon?.statRequirements, ctx)
}

export function checkGearEquipRequirements(
  gear: CompiledGearRecord | undefined | null,
  ctx: PlayerEquipCheckContext,
): {
  ok: boolean
  details: EquipReqCheckDetail[]
} {
  if (!gear) return { ok: true, details: [] }
  return checkStatRequirementList(gear.statRequirements, ctx)
}

export function checkMountEquipRequirements(
  mount: CompiledMountRecord | undefined | null,
  ctx: PlayerEquipCheckContext,
): {
  ok: boolean
  details: EquipReqCheckDetail[]
} {
  return checkStatRequirementList(mount?.statRequirements, ctx)
}

export interface WeaponSynergyMatchItem {
  slot: MartialArtSlotKey
  artId: string
  artName: string
  category: string
  pct: number
  isSignature: boolean
  bonusAttack: number
}

export function computeWeaponArtSynergy(
  weaponId: string | null | undefined,
  equippedArts: EquippedArtsMap,
  learnedArts: LearnedArtEntry[],
): {
  totalSynergyAttack: number
  matches: WeaponSynergyMatchItem[]
} {
  if (!weaponId) return { totalSynergyAttack: 0, matches: [] }
  const def = ITEM_DB_MAP[weaponId]
  const wpn = def?.weaponMeta
  if (!wpn) return { totalSynergyAttack: 0, matches: [] }

  const lvMap = new Map<string, number>()
  for (const e of learnedArts) {
    lvMap.set(e.artId, e.level)
  }

  const moveSlots: MartialArtSlotKey[] = ['move1', 'move2', 'move3', 'move4']
  const matches: WeaponSynergyMatchItem[] = []
  let totalSynergyAttack = 0

  for (const slot of moveSlots) {
    const aid = equippedArts[slot]
    if (!aid) continue
    const art = MARTIAL_ART_DB_MAP[aid]
    if (!art) continue

    const catRule = wpn.synergies.find((s) => art.category.includes(s.category))
    const isSig = wpn.signatureArtIds.includes(aid)
    if (!catRule && !isSig) continue

    const pct = (catRule?.bonusPct ?? 0) + (isSig ? 12 : 0)
    const lv = lvMap.get(aid) ?? 1
    const baseArtBonus = computeSingleArtBonus(art, lv, slot)
    const bonusAttack = Math.max(2, Math.round((baseArtBonus.attack + (wpn.equipBonus.attack ?? 0) * 0.35) * (pct / 100)))

    totalSynergyAttack += bonusAttack
    matches.push({
      slot,
      artId: aid,
      artName: art.cleanName,
      category: art.category,
      pct,
      isSignature: isSig,
      bonusAttack,
    })
  }

  return { totalSynergyAttack, matches }
}

export function computeEquipmentTotals(equipped: EquippedSlotsMap): Required<
  Omit<EquipmentStatBonus, 'mountKey' | 'skills'>
> & {
  mountKey: MountKey
  skills: Record<string, number>
  /** 配饰雅器提供的【颜值】（先天禀赋，不计入十艺字典） */
  charm: number
} {
  const totals = {
    charm: 0,
    maxHp: 0,
    maxMp: 0,
    agility: 0,
    res: 0,
    attack: 0,
    defense: 0,
    riding: 0,
    wuxing: 0,
    mountKey: 'walk' as MountKey,
    skills: {} as Record<string, number>,
  }

  for (const slot of Object.keys(equipped) as EquipmentSlotKey[]) {
    const itemId = equipped[slot]
    if (!itemId) continue
    const def = ITEM_DB_MAP[itemId]
    const b = def?.equipBonus
    if (!b) continue

    totals.maxHp += b.maxHp ?? 0
    totals.maxMp += b.maxMp ?? 0
    totals.agility += b.agility ?? 0
    totals.res += b.res ?? 0
    totals.attack += b.attack ?? 0
    totals.defense += b.defense ?? 0
    totals.riding += b.riding ?? 0
    totals.wuxing += b.wuxing ?? 0
    if (slot === 'mount') {
      if (def.mountMeta) {
        totals.mountKey = def.mountMeta.id as MountKey
      } else if (b.mountKey) {
        totals.mountKey = b.mountKey
      }
    }
    if (b.skills) {
      for (const [k, v] of Object.entries(b.skills)) {
        // 数据源把配饰的 +颜值 记在 skills 里；颜值是先天禀赋，单独汇总，不污染十艺字典
        if (k === '颜值') {
          totals.charm += v
          continue
        }
        totals.skills[k] = (totals.skills[k] ?? 0) + v
      }
    }
  }

  return totals
}

/**
 * 有效先天禀赋 = 裸身禀赋 + 披挂加成（悟性 / 颜值）+ 运使武学加成（根骨 / 颜值，传入武学时计入）。
 */
export function getEffectiveTalents(
  talents: { 根骨: number; 悟性: number; 颜值: number },
  equipped: EquippedSlotsMap,
  equippedArts?: EquippedArtsMap | null,
  learnedArts?: LearnedArtEntry[] | null,
): { 根骨: number; 悟性: number; 颜值: number } {
  const equipTotals = computeEquipmentTotals(equipped)
  const artTotals =
    equippedArts && learnedArts ? computeEquippedArtsTotals(equippedArts, learnedArts) : null
  return {
    根骨: talents.根骨 + (artTotals?.constitution ?? 0),
    悟性: talents.悟性 + equipTotals.wuxing,
    颜值: talents.颜值 + equipTotals.charm + (artTotals?.charm ?? 0),
  }
}

export function formatBonusBadges(bonus?: EquipmentStatBonus): string[] {
  if (!bonus) return []
  const list: string[] = []
  if (bonus.attack) list.push(`外功杀伤 +${bonus.attack}`)
  if (bonus.defense) list.push(`周身护甲 +${bonus.defense}`)
  if (bonus.maxHp) list.push(`气血上限 +${bonus.maxHp}`)
  if (bonus.maxMp) list.push(`内力上限 +${bonus.maxMp}`)
  if (bonus.agility) list.push(`身法 +${bonus.agility}`)
  if (bonus.res) list.push(`抗性 +${bonus.res}`)
  if (bonus.riding) list.push(`骑术 +${bonus.riding}`)
  if (bonus.wuxing) list.push(`悟性 +${bonus.wuxing}`)
  if (bonus.mountKey && bonus.mountKey !== 'walk') {
    const mRec = MOUNT_DB_MAP[bonus.mountKey]
    if (mRec) {
      list.push(`日行基础 ${mRec.baseSpeed} 里`)
      list.push(`${mRec.terrainTrait} +${mRec.terrainBonusPct}%`)
    }
  }
  if (bonus.skills) {
    for (const [k, v] of Object.entries(bonus.skills)) {
      list.push(`${k} +${v}`)
    }
  }
  return list
}

export interface LiveUniqueArtifactOwnership {
  meta: CompiledUniqueArtifactRecord
  liveStatus: 'player_equipped' | 'player_bag' | 'consumed' | 'npc' | 'unowned'
  badgeLabel: string
  ownerTitle: string
  ownerSubtitle: string
  ownerNpcId: string | null
}

export function resolveUniqueArtifactLiveOwnership(
  itemId: string,
  inventoryOrInBag: ReadonlyArray<InventoryStack> | boolean,
  equipped: EquippedSlotsMap,
  consumedUniqueIds: string[] = [],
): LiveUniqueArtifactOwnership | null {
  const meta = UNIQUE_ARTIFACT_MAP[itemId]
  if (!meta) return null

  const isEquipped = Object.values(equipped).includes(itemId)
  const inBag =
    typeof inventoryOrInBag === 'boolean'
      ? inventoryOrInBag
      : inventoryOrInBag.some((st) => st.itemId === itemId && st.qty > 0)
  const isConsumed = consumedUniqueIds.includes(itemId)

  if (isEquipped) {
    const origSuffix =
      meta.ownerType === 'npc' && meta.ownerNpcName ? `（原属：${meta.ownerNpcName}）` : ''
    return {
      meta,
      liveStatus: 'player_equipped',
      badgeLabel: '归属：少侠（已披挂）',
      ownerTitle: `少侠（主角随身披挂）${origSuffix}`,
      ownerSubtitle: meta.note,
      ownerNpcId: meta.ownerNpcId,
    }
  }

  if (inBag) {
    const origSuffix =
      meta.ownerType === 'npc' && meta.ownerNpcName ? `（原属：${meta.ownerNpcName}）` : ''
    return {
      meta,
      liveStatus: 'player_bag',
      badgeLabel: '归属：少侠（囊藏）',
      ownerTitle: `少侠（主角行囊珍藏）${origSuffix}`,
      ownerSubtitle: meta.note,
      ownerNpcId: meta.ownerNpcId,
    }
  }

  if (isConsumed) {
    return {
      meta,
      liveStatus: 'consumed',
      badgeLabel: '已服食绝版',
      ownerTitle: '已炼化绝迹（已由少侠服食吸收，举世再无第二枚）',
      ownerSubtitle: meta.note,
      ownerNpcId: meta.ownerNpcId,
    }
  }

  if (meta.ownerType === 'npc' && meta.ownerNpcId && meta.ownerNpcName) {
    return {
      meta,
      liveStatus: 'npc',
      badgeLabel: `归属：${meta.ownerNpcName}`,
      ownerTitle: `${meta.ownerNpcName}（${meta.ownerNpcTitle ?? '名宿'} · ${meta.ownerFactionName ?? '江湖'}）`,
      ownerSubtitle: `驻地：${meta.ownerLocationLabel ?? '未知'} — ${meta.note}`,
      ownerNpcId: meta.ownerNpcId,
    }
  }

  if (meta.ownerType === 'player') {
    return {
      meta,
      liveStatus: 'unowned',
      badgeLabel: '无主孤品',
      ownerTitle: '无主（少侠暂未持有）',
      ownerSubtitle: meta.note,
      ownerNpcId: null,
    }
  }

  return {
    meta,
    liveStatus: 'unowned',
    badgeLabel: '无主孤品',
    ownerTitle: '无主 · 秘境遗珍待寻',
    ownerSubtitle: meta.note,
    ownerNpcId: null,
  }
}

export interface RegionUnlockRequirement {
  regionId: string
  regionName: string
  mapItemId: string
  mapItemName: string
  questTitleHint: string
  lockReason: string
}

export const REGION_UNLOCK_MAP_REQUIREMENTS: Record<string, RegionUnlockRequirement> = {
  yanziwu: {
    regionId: 'yanziwu',
    regionName: '太湖燕子坞',
    mapItemId: 'ITM-MSC-020',
    mapItemName: '《太湖燕子坞烟波水路舆图》',
    questTitleHint: '完成江南三府奇遇《烟波三叠 · 燕子坞水图》后获得',
    lockReason:
      '太湖三十六湾芦荡迷雾重重、水底暗桩密布，须持有《太湖燕子坞烟波水路舆图》方可辨识航道抵达（可赴苏州府【太湖烟波渡口】寻访线索）。',
  },
  taohuadao: {
    regionId: 'taohuadao',
    regionName: '东海桃花岛',
    mapItemId: 'ITM-MSC-021',
    mapItemName: '《东海桃花岛奇门海道舆图》',
    questTitleHint: '完成苏杭奇遇《碧海潮信 · 东海桃源图》后获得',
    lockReason:
      '东海舟山外洋暗流汹涌、奇门礁阵环伺，须持有《东海桃花岛奇门海道舆图》方可乘潮登岛（可赴苏州府【太湖烟波渡口 · 洞庭奇石望湖水榭】寻访线索）。',
  },
  kunlun: {
    regionId: 'kunlun',
    regionName: '昆仑山（万山之祖）',
    mapItemId: 'ITM-MSC-022',
    mapItemName: '《万山之祖昆仑雪域舆图》',
    questTitleHint: '完成延安府星宿派入门长卷《星宿紫烟 · 投名血契》后由星宿门人赠予',
    lockReason:
      '万山之祖昆仑终年暴雪封山、万年冰裂纵横，须持有《万山之祖昆仑雪域舆图》方可踏足瑶池与星宿海（可赴延安府【塞上番马黑市】触发《星宿紫烟 · 投名血契》入籍星宿派获赠）。',
  },
}

export const NON_GIFTABLE_KEY_ITEM_IDS = new Set<string>([
  'ITM-MSC-020',
  'ITM-MSC-021',
  'ITM-MSC-022',
  'ITM-MSC-023',
  'ITM-MSC-024',
  'ITM-MSC-025',
  'ITM-MSC-026',
  'ITM-MSC-027',
  'ITM-MSC-028',
  'ITM-MSC-029',
  'ITM-MSC-030',
  'ITM-MSC-031',
  'ITM-MSC-033',
  'ITM-MSC-034',
])

export function getRegionUnlockRequirement(regionId: string): RegionUnlockRequirement | null {
  return REGION_UNLOCK_MAP_REQUIREMENTS[regionId] ?? null
}

export function isRegionUnlockedByInventory(
  regionId: string,
  inventory: ReadonlyArray<InventoryStack>,
): boolean {
  const req = REGION_UNLOCK_MAP_REQUIREMENTS[regionId]
  if (!req) return true
  return inventory.some((st) => st.itemId === req.mapItemId && st.qty > 0)
}

export function getUnlockedLockedRegionKey(inventory: ReadonlyArray<InventoryStack>): string {
  const unlockedIds: string[] = []
  for (const regId of Object.keys(REGION_UNLOCK_MAP_REQUIREMENTS)) {
    if (isRegionUnlockedByInventory(regId, inventory)) {
      unlockedIds.push(regId)
    }
  }
  return unlockedIds.sort().join(',')
}

export function isRegionUnlockedByKey(regionId: string, unlockedRegionKey: string): boolean {
  if (!(regionId in REGION_UNLOCK_MAP_REQUIREMENTS)) return true
  if (!unlockedRegionKey || unlockedRegionKey === 'NONE') return false
  return unlockedRegionKey.split(',').includes(regionId)
}
