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
    subtitle: '名琴纹枰、澄心端砚、五大名窑茶香雅具、活字浑仪算具与杏林百工奇器（全库 50 种）',
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
  // 雅器百工（开局随身常备新雅器代表）
  { itemId: 'ITM-CUR-016', qty: 1 },
  { itemId: 'ITM-CUR-017', qty: 1 },
  { itemId: 'ITM-CUR-033', qty: 1 },
  { itemId: 'ITM-CUR-037', qty: 1 },
  { itemId: 'ITM-CUR-049', qty: 2 },
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
