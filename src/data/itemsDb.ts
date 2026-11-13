import { MARTIAL_ART_DB_MAP, WEAPONS_DB } from './gameDb'
import { computeSingleArtBonus } from './playerMartialArts'
import type {
  BagCategoryKey,
  CompiledWeaponRecord,
  EquipmentSlotKey,
  EquipmentStatBonus,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameItemDef,
  InventoryStack,
  ItemRarity,
  LearnedArtEntry,
  MartialArtSlotKey,
} from '../types/game'

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
    hint: '第四卷待定稿 · 猎弓角弓神臂远射',
    column: 'left',
  },
  {
    slot: 'accessory1',
    label: '配饰壹',
    shortLabel: '配饰壹',
    seal: '佩',
    hint: '第五卷待定稿 · 玉佩护心镜凝神护体',
    column: 'left',
  },
  {
    slot: 'armor',
    label: '服 饰',
    shortLabel: '服饰',
    seal: '衣',
    hint: '第二卷待定稿 · 劲装澜衫宝甲护佑气血',
    column: 'right',
  },
  {
    slot: 'shoes',
    label: '鞋 履',
    shortLabel: '鞋履',
    seal: '履',
    hint: '第三卷待定稿 · 麻鞋快靴云履提振身法',
    column: 'right',
  },
  {
    slot: 'accessory2',
    label: '配饰贰',
    shortLabel: '配饰贰',
    seal: '饰',
    hint: '第五卷待定稿 · 佛珠香囊信物抗性机缘',
    column: 'right',
  },
  {
    slot: 'mount',
    label: '坐 骑',
    shortLabel: '坐骑',
    seal: '骑',
    hint: '第六卷待定稿 · 空置时默认徒步 60 里/日',
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
    subtitle: '武学秘籍残卷、儒释道经史典籍、北宋名家字画碑帖',
  },
  {
    key: 'medicine',
    numeral: '贰',
    label: '丹药毒物',
    seal: '丹',
    subtitle: '疗伤回气金创灵丹、恢复体能药膳、奇门毒粉与解毒丸散',
  },
  {
    key: 'tools',
    numeral: '叁',
    label: '雅器百工',
    seal: '器',
    subtitle: '古琴、围棋盘、紫毫画笔、算盘筹策、药碾等十艺百工器具',
  },
  {
    key: 'misc',
    numeral: '肆',
    label: '行囊杂物',
    seal: '杂',
    subtitle: '随身备用百兵武器、后续各卷披挂、关防路引、门派信物与四海奇珍',
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

const NON_EQUIPMENT_ITEMS: GameItemDef[] = [
  // ==================== 1. 典籍书画 (scrolls) ====================
  {
    id: 'ITM-SCR-001',
    name: '《太祖长拳谱》手抄本',
    category: 'scrolls',
    subType: '武学秘籍',
    rarity: '凡品',
    stackable: false,
    value: 25,
    desc: '大宋军中与市井武馆广为流传的筑基拳谱，招式堂堂正正，最宜锤炼筋骨根基。',
    lore: '相传宋太祖赵匡胤微时以此三十二势长拳打遍京洛。',
    useEffect: {
      mp: 20,
      learnArtId: 'MA-180',
      learnArtHint: '参悟《太祖长拳》精要（已习得则提升该武学重数熟练度）',
    },
  },
  {
    id: 'ITM-SCR-002',
    name: '《呼延家传鞭枪残页》',
    category: 'scrolls',
    subType: '武学残卷',
    rarity: '良品',
    stackable: true,
    value: 60,
    desc: '记载河东名将呼延赞军阵枪鞭发力法门的残损绢页，字迹苍劲凛冽。',
    useEffect: {
      skillGain: ['策论', 2],
      learnArtId: 'MA-171',
      learnArtHint: '揣摩北宋军阵枪鞭法门，精进《呼延硬鞭法》（【策论】+2）',
    },
  },
  {
    id: 'ITM-SCR-006',
    name: '《洛阳金刀谱》拓本',
    category: 'scrolls',
    subType: '武学秘籍',
    rarity: '良品',
    stackable: false,
    value: 85,
    desc: '洛阳金刀王家外传的刀法总诀拓本，刀势大开大合，展卷研读可领悟金刀门刀意。',
    useEffect: {
      mp: 25,
      learnArtId: 'MA-109',
      learnArtHint: '领悟良品上品刀法《洛阳金刀谱》，佩备【洛阳九环金刀】可触发绝配共鸣！',
    },
  },
  {
    id: 'ITM-SCR-003',
    name: '《庆历正气策论集》',
    category: 'scrolls',
    subType: '经史典籍',
    rarity: '良品',
    stackable: false,
    value: 45,
    desc: '辑录范仲淹、欧阳修、富弼诸公在庆历年间的奏议文章，汴京太学士子人手一册。',
    useEffect: {
      skillGain: ['经义', 2],
    },
  },
  {
    id: 'ITM-SCR-004',
    name: '《汴河春晓图》摹卷',
    category: 'scrolls',
    subType: '名家书画',
    rarity: '地阶',
    stackable: false,
    value: 140,
    desc: '大相国寺书画市淘得的青绿山水手卷，舟楫虹桥纤毫毕现，极受江南与东京名士追捧。',
    useEffect: {
      skillGain: ['画', 3],
    },
  },
  {
    id: 'ITM-SCR-005',
    name: '《柳屯田新词钞》',
    category: 'scrolls',
    subType: '诗词唱本',
    rarity: '凡品',
    stackable: false,
    value: 18,
    desc: '樊楼歌妓传唱的柳三变词集，“凡有井水饮处，皆能歌柳词”。',
    useEffect: {
      skillGain: ['诗词', 2],
    },
  },

  // ==================== 2. 丹药毒物 (medicine) ====================
  {
    id: 'ITM-MED-001',
    name: '行军金创散',
    category: 'medicine',
    subType: '外敷伤药',
    rarity: '凡品',
    stackable: true,
    value: 12,
    desc: '大宋边军标配的止血生肌药散，可迅速愈合刀剑皮肉外伤。',
    useEffect: {
      hp: 180,
    },
  },
  {
    id: 'ITM-MED-002',
    name: '少林小还丹',
    category: 'medicine',
    subType: '佛门灵丹',
    rarity: '良品',
    stackable: true,
    value: 55,
    desc: '嵩山少林寺药局秘制丹丸，芳香清冽，兼具培元固本与恢复体能之效。',
    useEffect: {
      hp: 260,
      mp: 80,
      stamina: 25,
    },
  },
  {
    id: 'ITM-MED-003',
    name: '茯苓酥酪饼',
    category: 'medicine',
    subType: '药膳茶食',
    rarity: '凡品',
    stackable: true,
    value: 8,
    desc: '东京州桥夜市常见的养生药膳糕点，食之神清气爽，大补奔波劳顿之体能。',
    useEffect: {
      stamina: 45,
      hp: 40,
    },
  },
  {
    id: 'ITM-MED-004',
    name: '川西悲酥清风引（封蜡瓶）',
    category: 'medicine',
    subType: '奇门毒物',
    rarity: '地阶',
    stackable: true,
    value: 120,
    desc: '西夏一品堂与川西奇门暗流交易的无色毒露，蜡封严密，战阵淬毒令敌手筋酥骨软。',
  },
  {
    id: 'ITM-MED-005',
    name: '百草辟秽丸',
    category: 'medicine',
    subType: '解毒灵药',
    rarity: '良品',
    stackable: true,
    value: 38,
    desc: '采川蜀峨眉百草炼制，常服可涤荡瘴疠奇毒，略微稳固周身抗性。',
    useEffect: {
      stamina: 15,
      res: 2,
    },
  },

  // ==================== 3. 雅器百工 (tools) ====================
  {
    id: 'ITM-TOL-001',
    name: '桐木仲尼式古琴',
    category: 'tools',
    subType: '丝竹雅器',
    rarity: '良品',
    stackable: false,
    value: 85,
    desc: '取陈年桐木斫制的七弦古琴，音色清越松透。携之可在酒楼名园抚琴会友，修习琴艺事半功倍。',
  },
  {
    id: 'ITM-TOL-002',
    name: '云子榧木便携枰',
    category: 'tools',
    subType: '纹枰弈具',
    rarity: '良品',
    stackable: false,
    value: 75,
    desc: '折叠式黄杨榧木棋盘，配滇南黑白云子，游历山水时随时可与隐士高僧手谈一局。',
  },
  {
    id: 'ITM-TOL-003',
    name: '宣州诸葛紫毫笔匣',
    category: 'tools',
    subType: '文房四宝',
    rarity: '良品',
    stackable: false,
    value: 68,
    desc: '宣州名匠诸葛氏所制紫毫笔与徽墨澄心纸合一便携木匣，书画临帖与舆图摹绘利器。',
  },
  {
    id: 'ITM-TOL-004',
    name: '紫檀象牙算筹筒',
    category: 'tools',
    subType: '筹算百工',
    rarity: '凡品',
    stackable: false,
    value: 30,
    desc: '北宋市易行掌柜与阵法术士常用的随身算筹，推演钱粮账目与奇门方位不可或缺。',
  },

  // ==================== 4. 行囊杂物 · 路引信物 (misc) ====================
  {
    id: 'ITM-MSC-001',
    name: '开封府通关勘合路引',
    category: 'misc',
    subType: '官府文书',
    rarity: '凡品',
    stackable: false,
    value: 10,
    desc: '盖有京畿路官印的行旅文牒，出入大宋各州雄关城门免受盘诘。',
  },
  {
    id: 'ITM-MSC-002',
    name: '大宋交子铺银票（五十两）',
    category: 'misc',
    subType: '商贸奇珍',
    rarity: '良品',
    stackable: true,
    value: 50,
    desc: '益州成都府交子务印制的铁钱楮券，通行川陕京洛各大商号，携带轻便。',
  },
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

export const ITEMS_DB: GameItemDef[] = [...NON_EQUIPMENT_ITEMS, ...WEAPON_ITEMS_DB]

export const ITEM_DB_MAP: Record<string, GameItemDef> = Object.fromEntries(
  ITEMS_DB.map((it) => [it.id, it]),
)

// 七槽初始状态：仅装备百兵谱凡阶上品【青萍游侠剑】，其余六槽置空待后续各卷披挂定稿
export const DEFAULT_EQUIPPED_SLOTS: EquippedSlotsMap = {
  weapon: 'WPN-061',
  armor: null,
  shoes: null,
  bow: null,
  accessory1: null,
  accessory2: null,
  mount: null,
}

export const DEFAULT_INITIAL_INVENTORY: InventoryStack[] = [
  // 典籍书画
  { itemId: 'ITM-SCR-001', qty: 1 },
  { itemId: 'ITM-SCR-002', qty: 2 },
  { itemId: 'ITM-SCR-006', qty: 1 },
  { itemId: 'ITM-SCR-003', qty: 1 },
  { itemId: 'ITM-SCR-004', qty: 1 },
  // 丹药毒物
  { itemId: 'ITM-MED-001', qty: 3 },
  { itemId: 'ITM-MED-002', qty: 2 },
  { itemId: 'ITM-MED-003', qty: 4 },
  { itemId: 'ITM-MED-004', qty: 1 },
  // 雅器百工
  { itemId: 'ITM-TOL-001', qty: 1 },
  { itemId: 'ITM-TOL-002', qty: 1 },
  { itemId: 'ITM-TOL-003', qty: 1 },
  { itemId: 'ITM-TOL-004', qty: 1 },
  // 行囊杂物（含 3 把不同类别的百兵谱备用兵刃，便于测试换装与兵武共鸣）
  { itemId: 'WPN-068', qty: 1 }, // 少林白蜡齐眉棍（凡阶上品·棍棒）
  { itemId: 'WPN-072', qty: 1 }, // 汴京铁骨纸扇（凡阶上品·奇门音兵，绝配折扇点穴功）
  { itemId: 'WPN-033', qty: 1 }, // 洛阳九环金背刀（良阶上品·刀，绝配洛阳金刀谱）
  { itemId: 'ITM-MSC-001', qty: 1 },
  { itemId: 'ITM-MSC-002', qty: 1 },
]

export function isAccessorySlot(slot: EquipmentSlotKey): boolean {
  return slot === 'accessory1' || slot === 'accessory2'
}

export function canItemFitSlot(item: GameItemDef, targetSlot: EquipmentSlotKey): boolean {
  if (!item.equipSlot) return false
  if (isAccessorySlot(targetSlot) && isAccessorySlot(item.equipSlot)) {
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

export function checkWeaponEquipRequirements(
  weapon: CompiledWeaponRecord | undefined | null,
  ctx: PlayerEquipCheckContext,
): {
  ok: boolean
  details: EquipReqCheckDetail[]
} {
  if (!weapon || weapon.statRequirements.length === 0) {
    return { ok: true, details: [] }
  }
  const talents = ctx.talents ?? DEFAULT_HERO_TALENTS
  const details: EquipReqCheckDetail[] = weapon.statRequirements.map((req) => {
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
  mountKey: NonNullable<EquipmentStatBonus['mountKey']>
  skills: Record<string, number>
} {
  const totals = {
    maxHp: 0,
    maxMp: 0,
    maxStamina: 0,
    agility: 0,
    res: 0,
    attack: 0,
    defense: 0,
    riding: 0,
    mountKey: 'walk' as NonNullable<EquipmentStatBonus['mountKey']>,
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
    totals.maxStamina += b.maxStamina ?? 0
    totals.agility += b.agility ?? 0
    totals.res += b.res ?? 0
    totals.attack += b.attack ?? 0
    totals.defense += b.defense ?? 0
    totals.riding += b.riding ?? 0
    if (slot === 'mount' && b.mountKey) {
      totals.mountKey = b.mountKey
    }
    if (b.skills) {
      for (const [k, v] of Object.entries(b.skills)) {
        totals.skills[k] = (totals.skills[k] ?? 0) + v
      }
    }
  }

  return totals
}

export function formatBonusBadges(bonus?: EquipmentStatBonus): string[] {
  if (!bonus) return []
  const list: string[] = []
  if (bonus.attack) list.push(`外功杀伤 +${bonus.attack}`)
  if (bonus.defense) list.push(`周身护甲 +${bonus.defense}`)
  if (bonus.maxHp) list.push(`气血上限 +${bonus.maxHp}`)
  if (bonus.maxMp) list.push(`内力上限 +${bonus.maxMp}`)
  if (bonus.maxStamina) list.push(`体能上限 +${bonus.maxStamina}`)
  if (bonus.agility) list.push(`身法 +${bonus.agility}`)
  if (bonus.res) list.push(`抗性 +${bonus.res}`)
  if (bonus.riding) list.push(`骑术 +${bonus.riding}`)
  if (bonus.mountKey) {
    const speedMap = { walk: 60, horse: 120, xiXia: 220, ferghana: 300 }
    list.push(`日行基础 ${speedMap[bonus.mountKey]} 里`)
  }
  if (bonus.skills) {
    for (const [k, v] of Object.entries(bonus.skills)) {
      list.push(`${k} +${v}`)
    }
  }
  return list
}
