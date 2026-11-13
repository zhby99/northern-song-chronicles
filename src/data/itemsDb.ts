import type {
  BagCategoryKey,
  EquipmentSlotKey,
  EquipmentStatBonus,
  EquippedSlotsMap,
  GameItemDef,
  InventoryStack,
  ItemRarity,
} from '../types/game'

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
    hint: '刀剑枪棍扇 · 增幅外功杀伤',
    column: 'left',
  },
  {
    slot: 'bow',
    label: '弓 箭',
    shortLabel: '弓箭',
    seal: '射',
    hint: '猎弓角弓劲弩 · 远程百步穿杨',
    column: 'left',
  },
  {
    slot: 'accessory1',
    label: '配饰壹',
    shortLabel: '配饰壹',
    seal: '佩',
    hint: '玉佩护心宝镜 · 凝神定气护体',
    column: 'left',
  },
  {
    slot: 'armor',
    label: '服 饰',
    shortLabel: '服饰',
    seal: '衣',
    hint: '劲装澜衫软甲 · 护佑周身气血',
    column: 'right',
  },
  {
    slot: 'shoes',
    label: '鞋 履',
    shortLabel: '鞋履',
    seal: '履',
    hint: '麻鞋快靴云履 · 提振轻功身法',
    column: 'right',
  },
  {
    slot: 'accessory2',
    label: '配饰贰',
    shortLabel: '配饰贰',
    seal: '饰',
    hint: '佛珠扳指腰牌 · 奇门抗性机缘',
    column: 'right',
  },
  {
    slot: 'mount',
    label: '坐 骑',
    shortLabel: '坐骑',
    seal: '骑',
    hint: '健马西夏战驹汗血 · 决定千里行军脚力',
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
    subtitle: '随身备用兵甲衣履坐骑契券、关防路引、门派信物与四海奇珍',
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

export const ITEMS_DB: GameItemDef[] = [
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
      learnArtHint: '研读拳谱心有所悟（内力 +20；完整武学装配将于 M1-3 开放）',
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
      learnArtHint: '揣摩北宋军阵枪法要旨，兵事眼界大开（【策论】+2）',
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

  // ==================== 4. 行囊杂物 & 7槽装备 (misc) ====================
  // 武器 (weapon)
  {
    id: 'ITM-EQP-WPN-001',
    name: '晋阳百炼青钢剑',
    category: 'misc',
    subType: '装备 · 武器',
    rarity: '良品',
    equipSlot: 'weapon',
    stackable: false,
    value: 95,
    desc: '河东太原铁冶监精铁百炼打造的长剑，剑脊挺拔，寒光如水，江湖少侠趁手兵刃。',
    equipBonus: {
      attack: 28,
      agility: 3,
    },
  },
  {
    id: 'ITM-EQP-WPN-002',
    name: '齐眉熟铜哨棒',
    category: 'misc',
    subType: '装备 · 武器',
    rarity: '凡品',
    equipSlot: 'weapon',
    stackable: false,
    value: 35,
    desc: '包裹熟铜箍的白蜡杆哨棒，走州过府防身打虎常用，势大力沉。',
    equipBonus: {
      attack: 18,
      maxHp: 60,
    },
  },

  // 服饰 (armor)
  {
    id: 'ITM-EQP-ARM-001',
    name: '玄青劲装箭袖袍',
    category: 'misc',
    subType: '装备 · 服饰',
    rarity: '凡品',
    equipSlot: 'armor',
    stackable: false,
    value: 42,
    desc: '利落耐脏的北宋江湖窄袖劲装，内衬细密棉麻，兼顾防风御寒与拳脚施展。',
    equipBonus: {
      maxHp: 120,
      defense: 15,
      maxStamina: 10,
    },
  },
  {
    id: 'ITM-EQP-ARM-002',
    name: '杭绸暗纹儒衫',
    category: 'misc',
    subType: '装备 · 服饰',
    rarity: '良品',
    equipSlot: 'armor',
    stackable: false,
    value: 88,
    desc: '余杭上等丝绸裁就的圆领澜衫，温润儒雅，出入书院樊楼颇添风仪。',
    equipBonus: {
      maxHp: 80,
      defense: 10,
      res: 4,
      skills: { 诗词: 3, 辩才: 3 },
    },
  },

  // 鞋履 (shoes)
  {
    id: 'ITM-EQP-SHO-001',
    name: '千层牛筋快靴',
    category: 'misc',
    subType: '装备 · 鞋履',
    rarity: '凡品',
    equipSlot: 'shoes',
    stackable: false,
    value: 36,
    desc: '熟牛皮配千层麻底缝制的轻便快靴，日行百里不伤脚力。',
    equipBonus: {
      agility: 6,
      maxStamina: 15,
    },
  },
  {
    id: 'ITM-EQP-SHO-002',
    name: '踏雪鹿皮轻云履',
    category: 'misc',
    subType: '装备 · 鞋履',
    rarity: '良品',
    equipSlot: 'shoes',
    stackable: false,
    value: 110,
    desc: '塞北软鹿皮内嵌轻蚕丝精制而成，落地悄无声息，施展轻功如虎添翼。',
    equipBonus: {
      agility: 12,
      maxStamina: 20,
    },
  },

  // 弓箭 (bow)
  {
    id: 'ITM-EQP-BOW-001',
    name: '神臂桦木猎弓',
    category: 'misc',
    subType: '装备 · 弓箭',
    rarity: '凡品',
    equipSlot: 'bow',
    stackable: false,
    value: 50,
    desc: '桑木胎贴桦皮制成的轻便猎弓，附狼牙羽箭一壶，山林射猎与守御流寇颇为实用。',
    equipBonus: {
      attack: 14,
      agility: 2,
    },
  },
  {
    id: 'ITM-EQP-BOW-002',
    name: '河西牛角良弓',
    category: 'misc',
    subType: '装备 · 弓箭',
    rarity: '良品',
    equipSlot: 'bow',
    stackable: false,
    value: 125,
    desc: '鄜延边军仿党项角弓规制督造的复合强弓，弓弦崩响如雷，破甲力极强。',
    equipBonus: {
      attack: 26,
      riding: 4,
    },
  },

  // 配饰 (accessory1 / accessory2)
  {
    id: 'ITM-EQP-ACC-001',
    name: '和田青白双鱼佩',
    category: 'misc',
    subType: '装备 · 配饰',
    rarity: '良品',
    equipSlot: 'accessory1',
    stackable: false,
    value: 90,
    desc: '温润剔透的西域和田青白玉佩，贴身佩戴有宁心静气、抵御外邪之效。',
    equipBonus: {
      maxMp: 80,
      res: 6,
    },
  },
  {
    id: 'ITM-EQP-ACC-002',
    name: '精铜护心宝镜',
    category: 'misc',
    subType: '装备 · 配饰',
    rarity: '凡品',
    equipSlot: 'accessory2',
    stackable: false,
    value: 45,
    desc: '武林行脚客常系于胸前的弧面熟铜镜，关键时刻可格挡暗器毒针。',
    equipBonus: {
      maxHp: 75,
      defense: 10,
      res: 3,
    },
  },
  {
    id: 'ITM-EQP-ACC-003',
    name: '五台山菩提念珠',
    category: 'misc',
    subType: '装备 · 配饰',
    rarity: '良品',
    equipSlot: 'accessory1',
    stackable: false,
    value: 80,
    desc: '清凉寺高僧加持过的一百零八颗星月菩提珠，檀香幽远，清心寡欲。',
    equipBonus: {
      maxMp: 110,
      res: 8,
      skills: { 经义: 4 },
    },
  },

  // 坐骑 (mount)
  {
    id: 'ITM-EQP-MNT-001',
    name: '中原健马 · 枣红骢',
    category: 'misc',
    subType: '装备 · 坐骑',
    rarity: '凡品',
    equipSlot: 'mount',
    stackable: false,
    value: 120,
    desc: '骨骼匀称的黄河流域良马，性情温驯耐力绵长，官道日行百二十里。',
    equipBonus: {
      mountKey: 'horse',
      riding: 5,
      maxStamina: 15,
    },
  },
  {
    id: 'ITM-EQP-MNT-002',
    name: '河曲西夏战马 · 乌云踏雪',
    category: 'misc',
    subType: '装备 · 坐骑',
    rarity: '地阶',
    equipSlot: 'mount',
    stackable: false,
    value: 360,
    desc: '产自塞上河曲草滩的党项铁骑良驹，四蹄雪白如踏霜雪，日行二百二十里。',
    equipBonus: {
      mountKey: 'xiXia',
      riding: 12,
      agility: 4,
      maxStamina: 25,
    },
  },
  {
    id: 'ITM-EQP-MNT-003',
    name: '大宛汗血神驹 · 赤电',
    category: 'misc',
    subType: '装备 · 坐骑',
    rarity: '天阶',
    equipSlot: 'mount',
    stackable: false,
    value: 980,
    desc: '西域万里丝路偶现的绝世天马，疾驰时肩颈汗出如血，瞬息千里，万金难求。',
    equipBonus: {
      mountKey: 'ferghana',
      riding: 20,
      agility: 8,
      maxStamina: 40,
    },
  },

  // 纯杂物 / 信物
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

export const ITEM_DB_MAP: Record<string, GameItemDef> = Object.fromEntries(
  ITEMS_DB.map((it) => [it.id, it]),
)

export const DEFAULT_EQUIPPED_SLOTS: EquippedSlotsMap = {
  weapon: 'ITM-EQP-WPN-001',
  armor: 'ITM-EQP-ARM-001',
  shoes: 'ITM-EQP-SHO-001',
  bow: 'ITM-EQP-BOW-001',
  accessory1: 'ITM-EQP-ACC-001',
  accessory2: null,
  mount: 'ITM-EQP-MNT-001',
}

export const DEFAULT_INITIAL_INVENTORY: InventoryStack[] = [
  // 典籍书画
  { itemId: 'ITM-SCR-001', qty: 1 },
  { itemId: 'ITM-SCR-002', qty: 2 },
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
  // 行囊杂物（含备用装备供测试穿卸替换）
  { itemId: 'ITM-EQP-ARM-002', qty: 1 },
  { itemId: 'ITM-EQP-SHO-002', qty: 1 },
  { itemId: 'ITM-EQP-ACC-002', qty: 1 },
  { itemId: 'ITM-EQP-MNT-002', qty: 1 },
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
