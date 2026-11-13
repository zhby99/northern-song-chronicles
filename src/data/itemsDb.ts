import {
  GEAR_DB,
  MARTIAL_ART_DB_MAP,
  MOUNT_DB_MAP,
  MOUNTS_DB,
  UNIQUE_ARTIFACT_MAP,
  WEAPONS_DB,
} from './gameDb'
import { computeSingleArtBonus } from './playerMartialArts'
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
    subtitle: '疗伤回气金创灵丹、恢复体能药膳、奇门毒粉与解毒丸散',
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

const NON_EQUIPMENT_ITEMS: GameItemDef[] = [
  // ==================== 1. 典籍书画 (scrolls · 100 卷：10天阶 / 20地阶 / 30良阶 / 40凡阶) ====================
  ...SCROLLS_ITEMS_DB,

  // ==================== 2. 丹药毒物 (medicine · 30种：5天阶 + 5地阶 + 10良品 + 10凡品) ====================
  // ---------- 【天阶 · 5种（3灵丹奇珍 + 2旷世奇毒）】 ----------
  {
    id: 'ITM-MED-101',
    name: '少林九转大还丹',
    category: 'medicine',
    subType: '佛门圣药',
    rarity: '天阶',
    stackable: false,
    value: 920,
    desc: '嵩山少林寺药王院秘传百年的起死回生圣药，集千年雪莲、老山野参等三十六味灵药九转丹成，一颗便可贯通奇经、脱胎换骨。',
    lore: '少林寺每甲子仅成丹数枚，非护教大劫或武林存亡之际绝不轻赐。',
    useEffect: {
      maxHp: 180,
      maxMp: 220,
      hp: 1500,
      mp: 1200,
      stamina: 80,
      res: 8,
    },
  },
  {
    id: 'ITM-MED-102',
    name: '逍遥九花玉露丸',
    category: 'medicine',
    subType: '道家仙丹',
    rarity: '天阶',
    stackable: false,
    value: 860,
    desc: '逍遥派与东海桃花岛一脉秘炼仙丹，采清晨九种奇花花瓣上之朝露配以瑶池灵草酿就，服之满口异香，真气生生不息。',
    lore: '无崖子与苏星河常以此丹调理内息，轻身明目，寒暑不侵。',
    useEffect: {
      maxMp: 200,
      maxStamina: 20,
      hp: 900,
      mp: 1400,
      stamina: 100,
      agi: 4,
      res: 6,
    },
  },
  {
    id: 'ITM-MED-103',
    name: '大理莽牯朱蛤宝丹',
    category: 'medicine',
    subType: '万毒克星',
    rarity: '天阶',
    stackable: false,
    value: 960,
    desc: '以无量山剑湖秘境偶现之万毒之王“莽牯朱蛤”内丹辅以滇南灵草封炼而成，服后通体血脉澄澈，诸般瘴蛊奇毒莫能近身。',
    lore: '大理天龙寺枯荣大师曾言：得朱蛤真元者，纵入星宿毒海亦如履平地。',
    useEffect: {
      maxHp: 150,
      hp: 1000,
      mp: 600,
      res: 18,
    },
  },
  {
    id: 'ITM-MED-104',
    name: '天山六阳生死符（寒玉匣）',
    category: 'medicine',
    subType: '绝世奇毒',
    rarity: '天阶',
    stackable: false,
    value: 880,
    desc: '天山童姥巫行云独步西域的阴阳暗器奇毒，以昆仑寒玉匣封存薄如柳叶的酒水冰片，打入经脉后奇痒剧痛交作，求生不得、求死不能。',
    lore: '三十六洞七十二岛群豪闻“生死符”三字莫不魂飞魄散，唯有天山六阳掌真气可解。',
    poisonEffect: '战阵奇毒 · 种入敌身令其真气逆乱、攻防暴跌，每回合持续噬血封脉（无视常规护甲）',
  },
  {
    id: 'ITM-MED-105',
    name: '星宿三笑逍遥散（碧玉瓶）',
    category: 'medicine',
    subType: '绝世奇毒',
    rarity: '天阶',
    stackable: false,
    value: 850,
    desc: '星宿老仙丁春秋取昆仑毒泉五圣奇虫精炼的无色无味毒粉，微风拂动即悄然入体，中者连笑三声便气绝经断，诡谲莫测。',
    lore: '碧玉瓶塞刻有星宿海骷髅暗记，非抗性高绝或深谙毒理者不可轻启。',
    poisonEffect: '战阵奇毒 · 范围暗算奇毒，令目标心脉痉挛、三回合内接连触发剧烈毒伤与定身失神',
  },

  // ---------- 【地阶 · 5种（3门派/御苑灵药 + 2秘传重毒）】 ----------
  {
    id: 'ITM-MED-106',
    name: '长白千年续命参丸',
    category: 'medicine',
    subType: '塞外灵丹',
    rarity: '地阶',
    stackable: false,
    value: 420,
    desc: '采自白山黑水深处的人形老山参王，经大辽太医局与塞外奇人秘法蜜炼，重伤垂危之际含服一丸可吊命回元、固本培气。',
    lore: '临潢府斡耳朵皇帐贡珍，塞北苦寒之地视若第二性命。',
    useEffect: {
      maxHp: 90,
      hp: 950,
      mp: 400,
      stamina: 50,
    },
  },
  {
    id: 'ITM-MED-107',
    name: '天山雪莲碧灵丹',
    category: 'medicine',
    subType: '西域灵丹',
    rarity: '地阶',
    stackable: false,
    value: 390,
    desc: '撷昆仑万仞冰峰之巅的盛开雪莲，佐以寒潭灵泉炼就，丹丸晶莹如碧玉，可瞬间充盈枯竭丹田并涤除寒热内伤。',
    useEffect: {
      maxMp: 100,
      hp: 360,
      mp: 850,
      res: 6,
    },
  },
  {
    id: 'ITM-MED-108',
    name: '武当紫金三清丹',
    category: 'medicine',
    subType: '道门金丹',
    rarity: '地阶',
    stackable: false,
    value: 360,
    desc: '武当山真武道宗丹房依古法铅汞草木同炉炼制的紫金丹药，性温醇和，最宜突破内功瓶颈前宁神聚气、调和阴阳。',
    useEffect: {
      maxHp: 50,
      maxMp: 60,
      hp: 520,
      mp: 620,
      stamina: 40,
      res: 5,
    },
  },
  {
    id: 'ITM-MED-109',
    name: '一品堂悲酥清风露',
    category: 'medicine',
    subType: '西夏奇毒',
    rarity: '地阶',
    stackable: false,
    value: 340,
    desc: '西夏兴庆府一品堂秘藏的无色奇毒，盛于双层乌金瓷瓶中。临阵迎风挥洒，敌手双目酸泪不止，周身内力一时酸麻溃散。',
    lore: '一品堂高手潜入中原刺探少林丐帮军情时，常以此物以寡敌众。',
    poisonEffect: '战阵奇毒 · 化作无形毒雾笼罩敌阵，大幅削减敌方内力与身法集气，令其难以施展绝学',
  },
  {
    id: 'ITM-MED-110',
    name: '唐门七煞断魂膏',
    category: 'medicine',
    subType: '淬兵剧毒',
    rarity: '地阶',
    stackable: false,
    value: 330,
    desc: '蜀中唐家堡天机阁主唐无影督炼的乌黑毒膏，专供涂抹暗器刃口，见血封喉，纵是横练铁布衫高手擦破油皮亦难逃毒火攻心。',
    poisonEffect: '战阵淬毒 · 涂抹于兵刃弓矢之上，命中后附加深层七煞腐脉剧毒并削弱目标抗性',
  },

  // ---------- 【良品（良阶） · 10种（6丹药茶膳 + 4江湖毒物）】 ----------
  {
    id: 'ITM-MED-111',
    name: '嵩山少林小还丹',
    category: 'medicine',
    subType: '佛门灵丹',
    rarity: '良阶',
    stackable: true,
    value: 95,
    desc: '少林药局玄生大师监制的随身良药，药香清冽，兼具活血化瘀、回补真气与提振体能之效，正道侠客远行常备。',
    useEffect: {
      hp: 380,
      mp: 180,
      stamina: 30,
    },
  },
  {
    id: 'ITM-MED-112',
    name: '天香断续胶',
    category: 'medicine',
    subType: '接骨圣膏',
    rarity: '良阶',
    stackable: true,
    value: 88,
    desc: '江南“阎王敌”薛慕华传出的外敷内服两用伤药，色泽碧绿清香扑鼻，专治刀剑重创与筋断骨折，生肌奇快。',
    useEffect: {
      hp: 520,
      stamina: 15,
    },
  },
  {
    id: 'ITM-MED-113',
    name: '太医局紫雪神丹',
    category: 'medicine',
    subType: '御局成药',
    rarity: '良阶',
    stackable: true,
    value: 105,
    desc: '开封府翰林医官院依《太平圣惠方》精制的名贵凉药，以犀角、羚羊角、朱砂与寒水石入药，清心除烦、镇压走火入魔与热毒。',
    lore: '仁宗皇帝诏令太医局刊印医方惠民，此丹在京师熟药所亦偶有售卖。',
    useEffect: {
      hp: 240,
      mp: 320,
      res: 5,
    },
  },
  {
    id: 'ITM-MED-114',
    name: '北苑龙团胜雪茶饼',
    category: 'medicine',
    subType: '御贡茗膳',
    rarity: '良阶',
    stackable: true,
    value: 110,
    desc: '建安北苑御茶园督造的上等研膏团茶，茶面浮雕龙凤祥纹。煎点一瓯雪沫乳花，顿觉胸臆开阔、劳顿尽消，文思泉涌。',
    lore: '欧阳修、蔡襄诸公极爱此茗，北宋士大夫斗茶雅集无出其右。',
    useEffect: {
      mp: 140,
      stamina: 85,
      skillGain: ['诗词', 2],
    },
  },
  {
    id: 'ITM-MED-115',
    name: '峨眉金顶白云熊胆丸',
    category: 'medicine',
    subType: '名山奇药',
    rarity: '良阶',
    stackable: true,
    value: 92,
    desc: '蜀中峨眉派采金顶雪水、川贝与黑熊胆汁配制的护心良药，服之清肝明目、强健气血，尤善化解巴蜀与岭南湿瘴。',
    useEffect: {
      hp: 340,
      stamina: 25,
      res: 4,
    },
  },
  {
    id: 'ITM-MED-116',
    name: '大理段氏犀角解毒丸',
    category: 'medicine',
    subType: '镇国灵药',
    rarity: '良阶',
    stackable: true,
    value: 98,
    desc: '阳苴咩城大理皇室供奉以南诏犀角粉、三七与紫金莲炼制的辟毒丸药，行走无量山与南疆毒林必备之护身丹。',
    useEffect: {
      hp: 220,
      mp: 120,
      res: 7,
    },
  },
  {
    id: 'ITM-MED-117',
    name: '南疆金蚕碧蛊粉',
    category: 'medicine',
    subType: '苗疆蛊毒',
    rarity: '良阶',
    stackable: true,
    value: 115,
    desc: '广源州与南疆十万大山巫蛊师秘养金蚕蛊蜕研磨之碧绿细粉，着肤即蚀，令敌手气血蚕食、内息滞涩。',
    poisonEffect: '战阵蛊毒 · 扬洒后附着敌身，每回合吸蚀气血并迟滞其移动步数',
  },
  {
    id: 'ITM-MED-118',
    name: '星宿腐尸毒砂囊',
    category: 'medicine',
    subType: '西域毒物',
    rarity: '良阶',
    stackable: true,
    value: 108,
    desc: '星宿派门人摘星子等在陕北塞外暗炼的腥臭毒砂，以油皮小囊封装，掷出炸裂后毒烟弥漫，沾者皮肉溃烂。',
    poisonEffect: '战阵毒器 · 投掷覆盖十字格区域，造成外功毒伤并留下恶臭毒障区域',
  },
  {
    id: 'ITM-MED-119',
    name: '赤练蛇涎淬毒露',
    category: 'medicine',
    subType: '奇门毒液',
    rarity: '良阶',
    stackable: true,
    value: 85,
    desc: '捕江南太湖与岭南赤练毒蛇取腺毒熬制的猩红毒液，绿林好汉与邪派刺客常涂于飞刀袖箭之上，中者伤口火辣麻木。',
    poisonEffect: '战阵淬毒 · 提升兵刃或弓箭本场首次命中的破防毒伤，令对手身法骤降',
  },
  {
    id: 'ITM-MED-120',
    name: '曼陀罗醉仙迷魂散',
    category: 'medicine',
    subType: '迷药奇香',
    rarity: '良阶',
    stackable: true,
    value: 90,
    desc: '取洋金花（曼陀罗）、川乌与西域迷迭香精细配伍的绯色香粉，混入酒水或迎风弹指，可令寻常武夫头重脚轻、昏沉欲睡。',
    poisonEffect: '战阵迷香 · 干扰敌方神智，大幅降低目标闪避率与集气速度',
  },

  // ---------- 【凡品（凡阶） · 10种（7市井军旅丹膳 + 3草莽毒物）】 ----------
  {
    id: 'ITM-MED-121',
    name: '边军刀圭金创药',
    category: 'medicine',
    subType: '外敷伤药',
    rarity: '凡阶',
    stackable: true,
    value: 15,
    desc: '河北、陕西四路大宋禁军标配的止血生肌药粉，以龙骨、血竭、乳香研末，刀箭皮肉外伤敷之立止流血。',
    useEffect: {
      hp: 180,
    },
  },
  {
    id: 'ITM-MED-122',
    name: '熟药所行军跌打丸',
    category: 'medicine',
    subType: '官局常药',
    rarity: '凡阶',
    stackable: true,
    value: 22,
    desc: '各地州府官办惠民熟药所平价售卖的黑褐色蜜丸，专治拳脚切磋留下的青紫瘀伤与筋骨酸痛。',
    useEffect: {
      hp: 240,
      stamina: 10,
    },
  },
  {
    id: 'ITM-MED-123',
    name: '太乙回气清心散',
    category: 'medicine',
    subType: '回气散剂',
    rarity: '凡阶',
    stackable: true,
    value: 24,
    desc: '市井药铺与道观常备的补气散剂，以黄芪、党参、麦冬入药，温水送服可缓缓平复演武消耗的丹田真气。',
    useEffect: {
      mp: 160,
    },
  },
  {
    id: 'ITM-MED-124',
    name: '州桥茯苓酥酪饼',
    category: 'medicine',
    subType: '药膳茶食',
    rarity: '凡阶',
    stackable: true,
    value: 10,
    desc: '开封府州桥夜市热卖的养生药膳糕饼，糅合云茯苓粉、牛乳酪与蜜枣烘成，香甜软糯，最解江湖奔波饥乏。',
    useEffect: {
      stamina: 45,
      hp: 50,
    },
  },
  {
    id: 'ITM-MED-125',
    name: '东京紫苏香饮子',
    category: 'medicine',
    subType: '消暑熟水',
    rarity: '凡阶',
    stackable: true,
    value: 12,
    desc: '北宋街头茶坊竹筒盛卖的时令药饮，以紫苏叶、陈皮、甘草煎煮冰镇，生津止渴、提神醒脑。',
    lore: '汴京苦夏与秋燥之时，街巷挑担叫卖“香饮子”之声彻夜不绝。',
    useEffect: {
      stamina: 35,
      mp: 60,
    },
  },
  {
    id: 'ITM-MED-126',
    name: '塞北风干牛脯行军丸',
    category: 'medicine',
    subType: '军旅肉糜',
    rarity: '凡阶',
    stackable: true,
    value: 18,
    desc: '河东雁门关与塞外商队常备的椒盐牛脯杂粮压缩肉丸，耐储抗饿，吞服数枚既补体能又可充抵两日口粮。',
    useEffect: {
      stamina: 50,
      hp: 60,
      food: 2,
    },
  },
  {
    id: 'ITM-MED-127',
    name: '雄黄艾草辟瘴散',
    category: 'medicine',
    subType: '防毒常药',
    rarity: '凡阶',
    stackable: true,
    value: 20,
    desc: '取端午陈艾、明雄黄与苍术研配的药包，既可冲服祛除体内轻微蛇虫寒湿，亦可略微稳固周身抗毒根基。',
    useEffect: {
      hp: 90,
      stamina: 15,
      res: 2,
    },
  },
  {
    id: 'ITM-MED-128',
    name: '江湖蒙汗药包',
    category: 'medicine',
    subType: '绿林迷药',
    rarity: '凡阶',
    stackable: true,
    value: 26,
    desc: '太行山与京东绿林黑店惯用的粗制麻沸迷药，油纸包封，下在浊酒肉汤之中可令大意行客浑身酸软、人事不知。',
    poisonEffect: '战阵迷药 · 令缺乏防备的低抗性目标短暂眩晕迟缓',
  },
  {
    id: 'ITM-MED-129',
    name: '生石灰迷眼毒砂包',
    category: 'medicine',
    subType: '下九流暗器',
    rarity: '凡阶',
    stackable: true,
    value: 14,
    desc: '市井泼皮与草莽匪类贴身暗藏的生石灰混川椒细末，危急时迎面扬出迷人双目，虽非名门正派所齿，却往往能死里逃生。',
    poisonEffect: '战阵阴招 · 近身扬洒致盲敌手，大幅削减其下一次攻击命中率',
  },
  {
    id: 'ITM-MED-130',
    name: '草乌断肠毒粉',
    category: 'medicine',
    subType: '山野毒草',
    rarity: '凡阶',
    stackable: true,
    value: 28,
    desc: '采秦岭与巴山野生毒乌头、断肠草根晒干碾成的灰褐毒末，毒性猛烈燥急，常被山贼猎户用来涂抹陷阱竹签与猎矢。',
    poisonEffect: '战阵淬毒 · 附着轻度乌头麻痹毒素，令目标每回合流失少量气血',
  },

  // ==================== 3. 雅器百工 (tools · 共 50 件：5天 / 10地 / 15良 / 20凡) ====================
  // ---------- 【天阶 · 5 件】传世重器与绝代圣物 ----------
  {
    id: 'ITM-CUR-001',
    name: '九霄环佩 · 唐雷威斫传世古琴',
    category: 'tools',
    subType: '丝竹圣器',
    rarity: '天阶',
    equipSlot: 'accessory1',
    stackable: false,
    value: 1200,
    desc: '盛唐西蜀雷氏家族巅峰之作，伏羲式桐面杉底，蚌徽金岳，崩霆裂石而余韵绕梁三日。抚之可引天地清气入脉，修习琴道与音律武学一日千里。',
    lore: '琴腹龙池内镌贞元款识，皇祐年间秘藏于洛阳名园与汴京清客秘阁之间，万金不换。',
    equipBonus: {
      maxMp: 200,
      agility: 6,
      res: 12,
      skills: { 琴: 15, 诗词: 6 },
    },
    useEffect: {
      mp: 120,
      stamina: 15,
      skillGain: ['琴', 4],
    },
  },
  {
    id: 'ITM-CUR-002',
    name: '逍遥珍珑 · 烂柯玉枰白玉黑曜子',
    category: 'tools',
    subType: '纹枰圣器',
    rarity: '天阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 1150,
    desc: '整块昆仑羊脂暖玉琢就十九道纹枰，配以天山玄冰黑曜与南海白琲三百六十一子。落子声如清泉击磬，蕴藏无崖子一脉奇门弈理玄机。',
    lore: '传自逍遥派天山隐脉，星宿与大理国手毕生梦寐一观的纹枰至宝。',
    equipBonus: {
      maxMp: 180,
      agility: 8,
      res: 10,
      skills: { 棋: 15, 算术: 8 },
    },
    useEffect: {
      mp: 100,
      skillGain: ['棋', 4],
    },
  },
  {
    id: 'ITM-CUR-003',
    name: '南唐澄心堂 · 龙尾金星端溪宝匣',
    category: 'tools',
    subType: '文房圣器',
    rarity: '天阶',
    equipSlot: 'accessory1',
    stackable: false,
    value: 1080,
    desc: '紫檀描金百宝匣，内藏南唐后主李煜内府遗珍澄心堂纸、廷珪龙纹墨、宣州诸葛散卓笔与水岩大西洞金星端砚，四绝合璧，下笔如有神助。',
    lore: '欧阳修、梅尧臣曾作诗盛赞澄心堂纸“百金不许市一枚”，世间仅存寥寥数匣。',
    equipBonus: {
      maxMp: 160,
      res: 12,
      skills: { 书: 12, 画: 12, 诗词: 8 },
    },
    useEffect: {
      mp: 90,
      skillGain: ['书', 4],
    },
  },
  {
    id: 'ITM-CUR-004',
    name: '苏子容水运浑天星晷枢机匣',
    category: 'tools',
    subType: '天算圣器',
    rarity: '天阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 1120,
    desc: '北宋天算大家苏颂早年精研制成的缩微青铜擒纵水运星盘，昼夜自转不爽毫厘，可推演二十八宿分野、九宫八门与天下山川险易。',
    lore: '皇祐年间太史局与江南巧匠秘传之奇器，开后世水运仪象台之先声。',
    equipBonus: {
      maxHp: 140,
      maxMp: 150,
      agility: 8,
      skills: { 算术: 15, 策论: 10 },
    },
    useEffect: {
      mp: 85,
      skillGain: ['算术', 4],
    },
  },
  {
    id: 'ITM-CUR-005',
    name: '毕昇胶泥活字 · 紫檀璇玑印匣',
    category: 'tools',
    subType: '百工圣器',
    rarity: '天阶',
    equipSlot: 'accessory1',
    stackable: false,
    value: 1050,
    desc: '布衣巨匠毕昇于庆历年间创制的火烧胶泥活字母模全匣，配松脂蜡版与铁范界栏，“若印数十百千本，则极为神速”，承载大宋文明火种。',
    lore: '沈括诸辈叹为神技之百工冠冕，持之与天下鸿儒名臣论学无不肃然起敬。',
    equipBonus: {
      maxMp: 150,
      maxStamina: 25,
      res: 10,
      skills: { 经义: 12, 辩才: 12, 策论: 8 },
    },
    useEffect: {
      stamina: 20,
      skillGain: ['经义', 4],
    },
  },

  // ---------- 【地阶 · 10 件】名家重宝与镇派奇器 ----------
  {
    id: 'ITM-CUR-006',
    name: '汝州天青冰裂纹双耳三足琴炉',
    category: 'tools',
    subType: '香茗重器',
    rarity: '地阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 460,
    desc: '雨过天青云破处，釉色温润如凝脂，开片细密似蝉翼冰裂。焚龙涎沉水于琴侧，清心涤虑，外邪难侵。',
    lore: '北宋汝州窑口秘烧贡器雏制，士林清赏奉为瓷中魁首。',
    equipBonus: {
      maxMp: 110,
      res: 10,
      skills: { 琴: 8, 经义: 5 },
    },
    useEffect: {
      mp: 65,
      res: 1,
      skillGain: ['琴', 2],
    },
  },
  {
    id: 'ITM-CUR-007',
    name: '建安兔毫金扣斗茶盏具匣',
    category: 'tools',
    subType: '香茗重器',
    rarity: '地阶',
    stackable: false,
    value: 380,
    desc: '建州黑釉银丝兔毫盏镶鎏金口沿，配北苑银丝茶筅与鎏金汤提点茶瓶。点汤击拂，乳花咬盏久聚不散。',
    lore: '蔡襄《茶录》所推崇之北宋斗茶绝配，汴京樊楼与江南雅集尽显名士风流。',
    useEffect: {
      stamina: 28,
      mp: 45,
      skillGain: ['诗词', 3],
    },
  },
  {
    id: 'ITM-CUR-008',
    name: '宣州诸葛氏散卓紫毫御笔囊',
    category: 'tools',
    subType: '文房雅器',
    rarity: '地阶',
    equipSlot: 'accessory1',
    stackable: false,
    value: 410,
    desc: '宣州制笔世家诸葛高精制散卓长锋紫毫，尖、齐、圆、健四德俱备，兼通怀素狂草笔意与点穴判官指劲。',
    equipBonus: {
      agility: 5,
      maxMp: 85,
      skills: { 书: 10, 画: 6 },
    },
    useEffect: {
      mp: 50,
      skillGain: ['书', 3],
    },
  },
  {
    id: 'ITM-CUR-009',
    name: '歙州龙尾眉子纹金星大砚',
    category: 'tools',
    subType: '文房雅器',
    rarity: '地阶',
    stackable: false,
    value: 390,
    desc: '婺源龙尾山深坑所采眉子纹奇石，金星点点，发墨如油而呵气成云，严冬寒夜亦不冰涸。',
    useEffect: {
      mp: 55,
      skillGain: ['画', 3],
    },
  },
  {
    id: 'ITM-CUR-010',
    name: '东海碧玉九节洞箫',
    category: 'tools',
    subType: '丝竹雅器',
    rarity: '地阶',
    equipSlot: 'accessory1',
    stackable: false,
    value: 440,
    desc: '东海孤岛海底温玉雕琢而成的九节洞箫，翠色欲滴。灌注内息吹奏时声若龙吟海啸，乱敌心神而宁己真元。',
    lore: '隐含东海奇门音律一脉法度，非内力醇厚且谙熟宫商者不能尽展其威。',
    equipBonus: {
      maxMp: 120,
      agility: 6,
      skills: { 琴: 9, 诗词: 5 },
    },
    useEffect: {
      mp: 70,
      skillGain: ['琴', 3],
    },
  },
  {
    id: 'ITM-CUR-011',
    name: '贾宪增乘开方紫檀玉珠算盘',
    category: 'tools',
    subType: '筹算百工',
    rarity: '地阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 420,
    desc: '依北宋算学名家贾宪《黄帝九章算经细草》规制打造的紫檀梁框和田青玉珠算具，瞬息可演粮饷漕运与奇门遁甲生克。',
    equipBonus: {
      maxMp: 75,
      agility: 4,
      skills: { 算术: 10, 策论: 6 },
    },
    useEffect: {
      stamina: 15,
      skillGain: ['算术', 3],
    },
  },
  {
    id: 'ITM-CUR-012',
    name: '沈存中水浮指南缕金司南盘',
    category: 'tools',
    subType: '天算百工',
    rarity: '地阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 450,
    desc: '以天然慈石磨针横贯灯芯浮于青铜水盏，外圈精刻二十四山向与天干地支，大漠风沙或桃花迷阵中皆可辨明微茫生门。',
    equipBonus: {
      maxStamina: 25,
      agility: 6,
      riding: 6,
      skills: { 算术: 8, 画: 5 },
    },
    useEffect: {
      stamina: 20,
      skillGain: ['策论', 3],
    },
  },
  {
    id: 'ITM-CUR-013',
    name: '太医局针灸铜人缩微经络匣',
    category: 'tools',
    subType: '杏林奇器',
    rarity: '地阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 480,
    desc: '仿翰林医官王惟一所铸天圣针灸铜人精缩而成的鎏金经络铜偶，附乌金毫针三十六枚，十二正经与奇经八脉穴道纤毫毕现。',
    lore: '不仅可悬壶济世活人无数，更对行功冲穴、化解封穴奇毒大有裨益。',
    equipBonus: {
      maxHp: 160,
      maxMp: 90,
      res: 12,
      skills: { 经义: 6 },
    },
    useEffect: {
      hp: 150,
      mp: 60,
      stamina: 15,
    },
  },
  {
    id: 'ITM-CUR-014',
    name: '蜀中唐门子母百宝嵌机关巧匣',
    category: 'tools',
    subType: '奇门百工',
    rarity: '地阶',
    stackable: false,
    value: 430,
    desc: '川西唐家堡外门大匠耗时三年制成的七重鲁班簧锁暗匣，非依九宫步序推演不可启闭，内设淬毒簧片与精巧机括拆解图机。',
    useEffect: {
      mp: 40,
      skillGain: ['算术', 3],
    },
  },
  {
    id: 'ITM-CUR-015',
    name: '党项冷锻错金镂空马镫鞍具匣',
    category: 'tools',
    subType: '鞍辔百工',
    rarity: '地阶',
    equipSlot: 'accessory2',
    stackable: false,
    value: 410,
    desc: '贺兰山铁鹞子精锐将领秘用的冷锻减重错金马镫、嚼铁与鲨鱼皮鞍桥组件，配于良驹之上可令人马如臂使指，驰射稳若磐石。',
    equipBonus: {
      riding: 14,
      agility: 5,
      maxStamina: 20,
      skills: { 策论: 5 },
    },
    useEffect: {
      stamina: 20,
      skillGain: ['策论', 2],
    },
  },

  // ---------- 【良品 · 15 件】上乘雅具与精工利器 ----------
  {
    id: 'ITM-CUR-016',
    name: '陈年梧桐仲尼式七弦琴',
    category: 'tools',
    subType: '丝竹雅器',
    rarity: '良品',
    equipSlot: 'accessory1',
    stackable: false,
    value: 145,
    desc: '取兰考陈年阳面梧桐木斫制的标准仲尼式古琴，鹿角霜灰胎黑漆，音色清亮松透，士子游侠携琴访友之佳品。',
    equipBonus: {
      maxMp: 55,
      skills: { 琴: 6 },
    },
    useEffect: {
      mp: 35,
      skillGain: ['琴', 2],
    },
  },
  {
    id: 'ITM-CUR-017',
    name: '滇南永昌云子黄杨便携枰',
    category: 'tools',
    subType: '纹枰弈具',
    rarity: '良品',
    stackable: false,
    value: 135,
    desc: '折叠式乐清黄杨木棋盘，配大理永昌府秘窑烧制的黑白云子，对光迎视黑子碧绿透亮、白子温润如玉。',
    useEffect: {
      mp: 30,
      skillGain: ['棋', 2],
    },
  },
  {
    id: 'ITM-CUR-018',
    name: '徽州潘谷松烟龙纹墨匣',
    category: 'tools',
    subType: '文房雅器',
    rarity: '良品',
    stackable: false,
    value: 115,
    desc: '歙州制墨名家潘谷取黄山古松烟和麝香冰片杵捣万次而成，“摸索便知潘谷墨”，墨香清冽醒神，历百年不褪。',
    useEffect: {
      mp: 25,
      skillGain: ['书', 2],
    },
  },
  {
    id: 'ITM-CUR-019',
    name: '湖州双林镇极品狼毫湖笔筒',
    category: 'tools',
    subType: '文房雅器',
    rarity: '良品',
    stackable: false,
    value: 110,
    desc: '浙西湖州笔工精选冬月黄鼠狼尾毫配湘妃斑竹管精制，笔锋劲健挺拔，临摹颜柳碑帖与点染山石皴法皆宜。',
    useEffect: {
      mp: 25,
      skillGain: ['书', 2],
    },
  },
  {
    id: 'ITM-CUR-020',
    name: '吴门设色青绿矿物颜料螺碟匣',
    category: 'tools',
    subType: '丹青画具',
    rarity: '良品',
    stackable: false,
    value: 130,
    desc: '苏州府画苑专供的十二格蛤蜊白螺碟，盛满研磨细腻的石青、石绿、朱砂、雌黄与泥金，绘制千里山河长卷必不可少。',
    useEffect: {
      mp: 25,
      skillGain: ['画', 2],
    },
  },
  {
    id: 'ITM-CUR-021',
    name: '越州秘色青瓷莲花温酒执壶',
    category: 'tools',
    subType: '宴饮雅器',
    rarity: '良品',
    stackable: false,
    value: 140,
    desc: '越窑千峰翠色莲瓣注子配温碗，盛琥珀美酒置于热水碗中恒温馥郁，与豪杰名士把酒言欢最能畅抒胸臆。',
    useEffect: {
      stamina: 22,
      skillGain: ['辩才', 2],
    },
  },
  {
    id: 'ITM-CUR-022',
    name: '定窑白釉刻花孩儿枕香盒具',
    category: 'tools',
    subType: '文房清供',
    rarity: '良品',
    stackable: false,
    value: 150,
    desc: '河北真定府曲阳定窑烧制的甜白釉剔花香盒与书斋腕枕，釉白如雪，刀法流丽，案头清供倍添儒雅气度。',
    useEffect: {
      stamina: 20,
      skillGain: ['诗词', 2],
    },
  },
  {
    id: 'ITM-CUR-023',
    name: '耀州窑青釉刻牡丹三足博山炉',
    category: 'tools',
    subType: '香茗雅器',
    rarity: '良品',
    equipSlot: 'accessory2',
    stackable: false,
    value: 135,
    desc: '京兆府同官黄堡镇耀州窑精品，橄榄青釉晶莹，镂空山峦炉盖青烟袅袅如仙山云海，静坐吐纳有助凝炼真气。',
    equipBonus: {
      maxMp: 50,
      res: 5,
      skills: { 经义: 5 },
    },
    useEffect: {
      mp: 35,
      skillGain: ['经义', 2],
    },
  },
  {
    id: 'ITM-CUR-024',
    name: '洛阳紫竹嵌银丝尺八长笛',
    category: 'tools',
    subType: '丝竹雅器',
    rarity: '良品',
    stackable: false,
    value: 120,
    desc: '采邙山背阴七年老紫竹阴干制成，管身嵌细密银丝缠枝纹，音韵苍凉悠远，夜宿关塞吹奏尤动边声。',
    useEffect: {
      mp: 30,
      skillGain: ['琴', 2],
    },
  },
  {
    id: 'ITM-CUR-025',
    name: '姑苏檀香木雕双面苏绣团扇',
    category: 'tools',
    subType: '风雅佩具',
    rarity: '良品',
    equipSlot: 'accessory2',
    stackable: false,
    value: 145,
    desc: '老山檀香木扇柄配蝉翼熟绢，正反同针异色双面精绣寒雀梅竹，轻摇暗香浮动，出入秦淮西湖名园风采翩然。',
    equipBonus: {
      agility: 4,
      maxStamina: 15,
      skills: { 诗词: 5, 辩才: 4 },
    },
    useEffect: {
      stamina: 15,
      skillGain: ['诗词', 2],
    },
  },
  {
    id: 'ITM-CUR-026',
    name: '汴京文思院精铜鎏金压尺镇纸对',
    category: 'tools',
    subType: '文房雅器',
    rarity: '良品',
    stackable: false,
    value: 125,
    desc: '大宋少府监文思院巧匠铸造的瑞兽辟邪鎏金铜镇纸成对，分量沉凝，铺展巨幅行军舆图或挥毫长卷纹丝不动。',
    useEffect: {
      mp: 20,
      skillGain: ['策论', 2],
    },
  },
  {
    id: 'ITM-CUR-027',
    name: '象牙错金百廿赤黑算筹筒',
    category: 'tools',
    subType: '筹算百工',
    rarity: '良品',
    stackable: false,
    value: 118,
    desc: '花梨木圆筒内藏南海象牙精车算筹一百二十枚，以朱漆玄漆区分正负数理（正算赤，负算黑），市易司大掌柜与军需官不离身之物。',
    useEffect: {
      stamina: 12,
      skillGain: ['算术', 2],
    },
  },
  {
    id: 'ITM-CUR-028',
    name: '百草堂熟铜药碾与戥子秤匣',
    category: 'tools',
    subType: '杏林百工',
    rarity: '良品',
    stackable: false,
    value: 128,
    desc: '便携樟木药箱，内置精铸熟铜船形药碾、象牙杆毫厘戥子秤与细目罗筛，深山采得灵芝雪莲可就地炮制成散。',
    useEffect: {
      hp: 90,
      stamina: 15,
    },
  },
  {
    id: 'ITM-CUR-029',
    name: '河东百炼精钢雕镌印石篆刻刀匣',
    category: 'tools',
    subType: '金石百工',
    rarity: '良品',
    stackable: false,
    value: 122,
    desc: '太原名匠打制的平口、斜刃、圆杆篆刻钢刀八柄，附青田冻石方章与福建漳州八宝印泥，金石治印腕力暗通指剑劲道。',
    useEffect: {
      mp: 30,
      skillGain: ['书', 2],
    },
  },
  {
    id: 'ITM-CUR-030',
    name: '枢密院铜刻边防舆图分规测绘盒',
    category: 'tools',
    subType: '天算百工',
    rarity: '良品',
    stackable: false,
    value: 155,
    desc: '大宋边军将佐踏勘山川险隘专用的黄铜比例分规、铅坠水准仪与缩尺铜矩，绘山川道里分毫不差。',
    useEffect: {
      stamina: 15,
      skillGain: ['策论', 2],
    },
  },

  // ---------- 【凡品 · 20 件】民间常备雅具与百工杂器 ----------
  {
    id: 'ITM-CUR-031',
    name: '湘妃斑竹六孔横笛',
    category: 'tools',
    subType: '丝竹器具',
    rarity: '凡品',
    stackable: false,
    value: 32,
    desc: '潇湘水畔泪痕斑竹削制的轻巧牧笛，粘贴苇膜后音色清脆嘹亮，走江湖者常插于腰间自娱解闷。',
    useEffect: {
      stamina: 10,
      skillGain: ['琴', 1],
    },
  },
  {
    id: 'ITM-CUR-032',
    name: '楸木折合棋盘配蛤石棋子',
    category: 'tools',
    subType: '纹枰弈具',
    rarity: '凡品',
    stackable: false,
    value: 35,
    desc: '市井棋待诏与茶坊酒肆最常见的楸木折盘，配白蛤壳与乌石磨制的棋子，随时可席地摆下一局残棋。',
    useEffect: {
      stamina: 10,
      skillGain: ['棋', 1],
    },
  },
  {
    id: 'ITM-CUR-033',
    name: '宣州兔毫健笔对管',
    category: 'tools',
    subType: '文房器具',
    rarity: '凡品',
    stackable: false,
    value: 24,
    desc: '寻常书生案头必备的山兔脊毫毛笔两支，弹性适中，抄录书卷尺牍耐用顺手。',
    useEffect: {
      skillGain: ['书', 1],
    },
  },
  {
    id: 'ITM-CUR-034',
    name: '易水松烟油烟墨锭',
    category: 'tools',
    subType: '文房器具',
    rarity: '凡品',
    stackable: true,
    value: 18,
    desc: '河北易水流域流传手艺压制的实用乌墨，墨色匀净黝黑，州县书铺皆有售卖。',
    useEffect: {
      skillGain: ['书', 1],
    },
  },
  {
    id: 'ITM-CUR-035',
    name: '越州剡溪竹纸百张刀卷',
    category: 'tools',
    subType: '文房器具',
    rarity: '凡品',
    stackable: true,
    value: 20,
    desc: '浙东剡溪嫩竹沤制抄造的洁白竹纸，质地滑润受墨，最宜诗词唱和与书信往还。',
    useEffect: {
      skillGain: ['诗词', 1],
    },
  },
  {
    id: 'ITM-CUR-036',
    name: '绛州澄泥素面小砚',
    category: 'tools',
    subType: '文房器具',
    rarity: '凡品',
    stackable: false,
    value: 28,
    desc: '河东绛州汾水绢滤细泥入窑烧制的素面砚台，质坚如石而轻便易携，寒士游学行囊常备。',
    useEffect: {
      skillGain: ['画', 1],
    },
  },
  {
    id: 'ITM-CUR-037',
    name: '苦竹百廿算筹布囊',
    category: 'tools',
    subType: '筹算百工',
    rarity: '凡品',
    stackable: false,
    value: 22,
    desc: '粗麻布囊盛装削制齐整的老苦竹算筹百二十根，行商贩卒盘算银钱斤两的吃饭家伙。',
    useEffect: {
      skillGain: ['算术', 1],
    },
  },
  {
    id: 'ITM-CUR-038',
    name: '梨木十三档木珠算盘',
    category: 'tools',
    subType: '筹算百工',
    rarity: '凡品',
    stackable: false,
    value: 30,
    desc: '北方杜梨木车珠穿竹档制成的十三档算盘，拨动噼啪清脆，客栈账房与粮行人人皆用。',
    useEffect: {
      skillGain: ['算术', 1],
    },
  },
  {
    id: 'ITM-CUR-039',
    name: '黄杨木戒尺与朱砂点校笔架',
    category: 'tools',
    subType: '书院器具',
    rarity: '凡品',
    stackable: false,
    value: 25,
    desc: '蒙学塾师与书院斋长案头的黄杨镇纸戒尺配三峰木笔架，晨读经史时以朱砂句读批注。',
    useEffect: {
      skillGain: ['经义', 1],
    },
  },
  {
    id: 'ITM-CUR-040',
    name: '杭州洒金素面川扇',
    category: 'tools',
    subType: '风雅器具',
    rarity: '凡品',
    stackable: false,
    value: 26,
    desc: '杭州扇市热销的细竹骨洒金纸折扇，开合潇洒，高谈阔论间摇扇助势颇添三分辩士风采。',
    useEffect: {
      skillGain: ['辩才', 1],
    },
  },
  {
    id: 'ITM-CUR-041',
    name: '景德镇青白影青执壶茶盏组',
    category: 'tools',
    subType: '茶酒器具',
    rarity: '凡品',
    stackable: false,
    value: 36,
    desc: '饶州景德镇民窑烧制的影青瓷一壶四盏，青白淡雅，透光见影，野店歇脚烹茶待客极佳。',
    useEffect: {
      stamina: 16,
    },
  },
  {
    id: 'ITM-CUR-042',
    name: '磁州窑白地黑花诗文酒葫芦',
    category: 'tools',
    subType: '茶酒器具',
    rarity: '凡品',
    stackable: false,
    value: 28,
    desc: '河北磁州观台窑白釉黑彩扁葫芦瓶，腹书“醉眠芳草”四字，系红绒绳挂于鞍旁，豪气干云。',
    useEffect: {
      stamina: 15,
      hp: 30,
    },
  },
  {
    id: 'ITM-CUR-043',
    name: '黄铜随身袖珍香篆手炉',
    category: 'tools',
    subType: '日用百工',
    rarity: '凡品',
    stackable: false,
    value: 34,
    desc: '双层镂空万字纹小铜炉，冬日可置红萝炭暖手，平日可压梅花香篆安神驱蚊。',
    useEffect: {
      mp: 20,
      stamina: 10,
    },
  },
  {
    id: 'ITM-CUR-044',
    name: '鲁班墨斗曲尺木工百宝囊',
    category: 'tools',
    subType: '营造百工',
    rarity: '凡品',
    stackable: false,
    value: 30,
    desc: '大宋营造匠人随身帆布袋，内装木雕墨斗、黄铜矩尺与手锛凿子，修缮营寨舟车不可或缺。',
    useEffect: {
      skillGain: ['算术', 1],
    },
  },
  {
    id: 'ITM-CUR-045',
    name: '游方郎中鹤嘴药锄与竹编采药篓',
    category: 'tools',
    subType: '杏林百工',
    rarity: '凡品',
    stackable: false,
    value: 26,
    desc: '熟铁弯头鹤嘴小锄配青竹背篓，攀爬嵩山、峨眉、长白险峰采掘野生草药不伤根须。',
    useEffect: {
      hp: 45,
      stamina: 10,
    },
  },
  {
    id: 'ITM-CUR-046',
    name: '生铁捣药臼杵配粗麻滤袋',
    category: 'tools',
    subType: '杏林百工',
    rarity: '凡品',
    stackable: false,
    value: 22,
    desc: '厚重敦实的生铁小药臼，行伍与走方医人常用来捣碎金创草药外敷止血。',
    useEffect: {
      hp: 55,
    },
  },
  {
    id: 'ITM-CUR-047',
    name: '熟牛皮刷马铁篦与修蹄刀组',
    category: 'tools',
    subType: '鞍辔百工',
    rarity: '凡品',
    stackable: false,
    value: 32,
    desc: '边关马夫与老镖师必备的铁齿马刷、刮汗板与弯头修蹄刀，每日刷洗照料坐骑可免马失前蹄之虞。',
    useEffect: {
      stamina: 15,
    },
  },
  {
    id: 'ITM-CUR-048',
    name: '柳编鱼篓配湘竹蚕丝钓竿',
    category: 'tools',
    subType: '渔樵百工',
    rarity: '凡品',
    stackable: false,
    value: 24,
    desc: '太湖与汴河垂钓翁常用的三节插接细竹竿、桐油蚕丝线与柳条鱼篓，闲暇临渊垂钓亦是养气之道。',
    useEffect: {
      stamina: 14,
      food: 2,
    },
  },
  {
    id: 'ITM-CUR-049',
    name: '精钢火镰燧石与松脂火折筒',
    category: 'tools',
    subType: '行旅百工',
    rarity: '凡品',
    stackable: true,
    value: 15,
    desc: '牛角弯壳火镰配白火石、艾绒及密封竹管火折子，一吹即燃，荒野露宿与幽暗秘窟探查必备。',
    useEffect: {
      stamina: 12,
    },
  },
  {
    id: 'ITM-CUR-050',
    name: '油布防雨书笈配铜锁行囊架',
    category: 'tools',
    subType: '行旅百工',
    rarity: '凡品',
    stackable: false,
    value: 38,
    desc: '桐油熟布蒙面的竹骨双肩书箱，顶设遮阳避雨小棚，配黄铜横栓鱼形锁，赶考举子与游侠远行护书防潮利器。',
    useEffect: {
      stamina: 15,
      skillGain: ['经义', 1],
    },
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
  armor: null,
  shoes: null,
  bow: null,
  accessory1: null,
  accessory2: null,
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
  { itemId: 'ITM-CUR-049', qty: 2 },
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
    totals.maxStamina += b.maxStamina ?? 0
    totals.agility += b.agility ?? 0
    totals.res += b.res ?? 0
    totals.attack += b.attack ?? 0
    totals.defense += b.defense ?? 0
    totals.riding += b.riding ?? 0
    if (slot === 'mount') {
      if (def.mountMeta) {
        totals.mountKey = def.mountMeta.id as MountKey
      } else if (b.mountKey) {
        totals.mountKey = b.mountKey
      }
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
  inventory: InventoryStack[],
  equipped: EquippedSlotsMap,
  consumedUniqueIds: string[] = [],
): LiveUniqueArtifactOwnership | null {
  const meta = UNIQUE_ARTIFACT_MAP[itemId]
  if (!meta) return null

  const isEquipped = Object.values(equipped).includes(itemId)
  const inBag = inventory.some((st) => st.itemId === itemId && st.qty > 0)
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

