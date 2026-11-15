import type { DynamicQuestNpc, StorySceneDef, StorySpeakerSpec, QuestCondition, QuestDefinition } from '../../../types/quest'
import type { NodeNpc } from '../../../types/game'

export const XINGXIU_ENTRY_QUEST_ID = 'QST-SECT-19-ENTRY'

export const ACTOR_SUBANXIA_ID = 'ACT-XX-SUBANXIA'
export const ACTOR_XIAOSHIZI_ID = 'ACT-XX-XIAOSHIZI'
export const ACTOR_CHUCHENZI_KUNLUN_ID = 'ACT-XX-CHUCHENZI-KL'

// ============================================================================
// 专属缘分人物与配角发言人定义
// ============================================================================

const SPEAKER_SUBANXIA_VEILED: StorySpeakerSpec = {
  kind: 'custom',
  name: '苏半夏',
  title: '皂纱竹笠采药女',
  factionName: '耀州药户遗孤',
  portraitUrl: '/assets/characters/templates/tpl_sanren_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_female_av.jpg',
}

const SPEAKER_SUBANXIA: StorySpeakerSpec = {
  kind: 'custom',
  name: '苏半夏',
  title: '百草炼毒庐司药师姐',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
}

const SPEAKER_XIAOSHIZI: StorySpeakerSpec = {
  kind: 'custom',
  name: '小石子',
  title: '延州逃荒短工少年',
  factionName: '同期杂役',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_XIAOSHIZI_SECT: StorySpeakerSpec = {
  kind: 'custom',
  name: '小石子',
  title: '星宿派司炉小童',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_SOGDIAN_PEDDLER: StorySpeakerSpec = {
  kind: 'custom',
  name: '康老胡',
  title: '番坊生药行贩',
  factionName: '塞上胡商',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_MARKET_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '焦疤脸',
  title: '星宿外围搜药泼皮',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_WU_CHENGSHAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '乌承山',
  title: '星宿派外门恶霸师兄',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_DRUM_BOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '敲钹童子',
  title: '星宿海吹鼓门徒',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

// ============================================================================
// 动态常驻同伴与新手试炼战斗对手构建
// ============================================================================

function buildWuChengshanTrialNpc(weakenedByIntel: boolean): NodeNpc {
  return {
    id: 'QUEST_XX_WU_CHENGSHAN',
    name: '乌承山',
    title: '星宿派 · 外门恶霸师兄',
    realm: '不入流',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    stats: {
      hp: weakenedByIntel ? 215 : 255,
      mp: 100,
      agi: weakenedByIntel ? 13 : 15,
      res: weakenedByIntel ? 7 : 9,
      isBenchmark: false,
    },
    talents: { bone: 42, comprehension: 35, charm: 28 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-218',
      move1: 'MA-196',
      move2: 'MA-201',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-231', level: 1, exp: 0 },
      { artId: 'MA-218', level: 1, exp: 0 },
      { artId: 'MA-196', level: 1, exp: 0 },
      { artId: 'MA-201', level: 1, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-083', // 生牛皮裹指拳带（凡阶中品）
      armor: 'ARM-048', // 西夏牧民羊毛袍（凡阶中品）
      shoes: 'BOT-022', // 塞北羊皮靴（凡阶中品）
      bow: 'BOW-023', // 河东木胎弓（凡阶中品）
      accessory1: 'ACC-045', // 辽东野猪獠牙（凡阶中品）
      accessory2: 'ACC-048', // 西夏牛角小号（凡阶中品）
      mount: 'MNT-021', // 太行绿林草上青（凡阶中品）
      curio1: null,
      curio2: null,
    },
    talk: weakenedByIntel
      ? '“嘶……你小子怎知我右肋旧伤畏寒？！少装神弄鬼，把冰蚕寒露交出来！”'
      : '“桀桀，刚熬过试药的黄口小儿也敢护美？今日便叫你尝尝师兄的厉害！”',
  }
}

function buildChuchenziKunlunActor(): DynamicQuestNpc {
  return {
    actorId: ACTOR_CHUCHENZI_KUNLUN_ID,
    questId: XINGXIU_ENTRY_QUEST_ID,
    regionId: 'kunlun',
    buildingId: 'kl_poison',
    spotId: 'kl_ps_pavilion',
    name: '出尘子',
    title: '星宿派 · 四师兄（随队督药）',
    realm: '二流上品',
    badgeLabel: '星宿四师兄',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 3,
    sectRankLabel: '真传弟子',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“咳咳，本真人奉老仙法旨押药回谷，谁敢怠慢炉火，仔细他的皮肉！”',
    stats: { hp: 1784, mp: 1414, agi: 58, res: 44, isBenchmark: false },
    talents: { bone: 58, comprehension: 57, charm: 52 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-157',
      move1: 'MA-127',
      move2: 'MA-137',
      move3: 'MA-055',
      move4: 'MA-065',
    },
    learnedArts: [
      { artId: 'MA-127', level: 7, exp: 0 },
      { artId: 'MA-137', level: 7, exp: 0 },
      { artId: 'MA-157', level: 7, exp: 0 },
      { artId: 'MA-055', level: 6, exp: 0 },
      { artId: 'MA-065', level: 6, exp: 0 },
      { artId: 'MA-231', level: 10, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-066',
      armor: 'ARM-041',
      shoes: 'BOT-022',
      bow: 'BOW-028',
      accessory1: 'ACC-036',
      accessory2: 'ACC-049',
      curio1: null,
      curio2: null,
      mount: 'MNT-022',
    },
  }
}

function buildSubanxiaPermanentActor(): DynamicQuestNpc {
  return {
    actorId: ACTOR_SUBANXIA_ID,
    questId: XINGXIU_ENTRY_QUEST_ID,
    regionId: 'kunlun',
    buildingId: 'kl_poison',
    spotId: 'kl_ps_cave',
    name: '苏半夏',
    title: '星宿派 · 外门司药师姐',
    realm: '三流中品',
    badgeLabel: '患难红颜',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
    talk: '“这寒石窟虽冷，却比外面那些锣鼓喧天的阿谀干净得多。你在外行走，记得常备辟毒散，莫再叫我替你提心吊胆了。”',
    stats: { hp: 620, mp: 420, agi: 34, res: 28, isBenchmark: false },
    talents: { bone: 54, comprehension: 78, charm: 88 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-197',
      move1: 'MA-137',
      move2: 'MA-127',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-231', level: 3, exp: 0 },
      { artId: 'MA-197', level: 2, exp: 0 },
      { artId: 'MA-137', level: 2, exp: 0 },
      { artId: 'MA-127', level: 2, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-085', // 鹅卵飞蝗石袋（凡阶中品）
      armor: 'ARM-042', // 江南竹布夏衫（凡阶中品）
      shoes: 'BOT-022', // 塞北羊皮靴（凡阶中品）
      bow: 'BOW-023', // 河东木胎弓（凡阶中品）
      accessory1: 'ACC-044', // 江南桂花香包（凡阶中品）
      accessory2: 'ACC-048', // 西夏牛角小号（凡阶中品）
      curio1: null,
      curio2: null,
      mount: 'MNT-021', // 太行绿林草上青（凡阶中品）
    },
  }
}

function buildXiaoshiziPermanentActor(): DynamicQuestNpc {
  return {
    actorId: ACTOR_XIAOSHIZI_ID,
    questId: XINGXIU_ENTRY_QUEST_ID,
    regionId: 'kunlun',
    buildingId: 'kl_poison',
    spotId: 'kl_ps_pavilion',
    name: '小石子',
    title: '星宿派 · 百草司炉少年',
    realm: '不入流',
    badgeLabel: '生死同门',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“哥！你回山啦！打从你在摘星子手底下救了我这条命，我小石子这辈子就只认你和苏师姐两个亲人！”',
    stats: { hp: 310, mp: 130, agi: 18, res: 14, isBenchmark: false },
    talents: { bone: 52, comprehension: 44, charm: 56 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-218',
      move1: 'MA-196',
      move2: null,
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-231', level: 1, exp: 0 },
      { artId: 'MA-218', level: 1, exp: 0 },
      { artId: 'MA-196', level: 1, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-085', // 鹅卵飞蝗石袋（凡阶中品）
      armor: 'ARM-048', // 西夏牧民羊毛袍（凡阶中品）
      shoes: 'BOT-022', // 塞北羊皮靴（凡阶中品）
      bow: 'BOW-023', // 河东木胎弓（凡阶中品）
      accessory1: 'ACC-045', // 辽东野猪獠牙（凡阶中品）
      accessory2: 'ACC-048', // 西夏牛角小号（凡阶中品）
      curio1: null,
      curio2: null,
      mount: 'MNT-021', // 太行绿林草上青（凡阶中品）
    },
  }
}

// ============================================================================
// 第四卷：老仙法驾 · 紫衣入籍（第 16～20 幕，倒序声明以便上层直接引用）
// ============================================================================

const SCENE_XX_20_PURPLE_ROBE_VOW: StorySceneDef = {
  id: 'scene_xx_20_purple_robe_vow',
  title: '第二十幕 · 紫衣系腰心存火',
  subtitle: '延安塞外嘉岭夜色 · 邪窟微光',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0122' },
      text: '（丁春秋抚着银白长髯仰天长笑，羽扇轻挥之间，堂下二十余名星宿门徒齐刷刷伏地叩首，锣鼓丝竹震得梁上积尘簌簌直落）“桀桀桀！好一张巧嘴，好一副机灵心肠！比你那几个成天只会吃干饭的蠢材师兄强得多了！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0122' },
      text: '“传老仙法旨——即日起，免去这小子与那姓苏女娃的药奴贱籍，正式录为我星宿派外门弟子，赐黑衣皮靴、铁砂护掌与《昆仑雪域秘图》一卷！往后在本派之中，谁的毒更烈、手更狠、嘴更甜，老夫的《五毒砂掌》《抽髓掌》乃至无上《化功大法》，尽可倾囊相授！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '散堂之时已是三更。塞北延安府的寒风自嘉岭山巅呼啸而下，吹散了番坊里浓腻作呕的异香。你换上门派赐下的劲装，走出奇货堂偏巷，却见月色城墙下早已静静立着一道熟悉的纤细身影。',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（苏半夏亦换上了一袭淡紫滚边的司药衣衫，见你出来，清冷眉眼间漾开一抹极浅却极暖的笑意，将两包亲手封好的雄黄艾草辟瘴散塞进你怀中）“方才在堂上，多谢你顺口替我周旋，否则摘星子定要把我留在延安药房折磨。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“在毒庐炸鼎与毒沼冷箭面前，你救过我两回，我不过还了半回。只是……委屈你一个医家清白女儿，终究还是要披上这身遭正道唾骂的星宿紫衣。”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（她仰起脸，任凭塞外夜风吹拂耳畔碎发，眸中映着漫天寒星，清亮如初）“药无善恶，衣无正邪。砒霜用对了能救垂死之人，人参用错了亦能杀人无形。世人皆骂星宿弟子狼心狗肺、阿谀无耻——可只要你我胸中那点微火不灭，这身紫衣，便只是乱世活命的甲胄。”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '“我明日便随押药车队先回昆仑山【雪山冰蚕寒石窟】当差。你既有老仙赐下的昆仑舆图，倦了、伤了或是想讨解毒药了，随时回谷里寻我……莫忘了咱们敲药臼三轻一重的暗号，也莫忘了那碗江南的桂花糖藕。”',
    },
  ],
  onFinishEffects: [
    { type: 'removeDynamicActor', actorId: ACTOR_CHUCHENZI_KUNLUN_ID },
    { type: 'joinSect', sectId: 'SECT-19', rank: 1 },
    { type: 'giveItem', itemId: 'ITM-MSC-022', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MED-127', qty: 2 },
    { type: 'modifySkill', key: '辩才', delta: 3 },
    { type: 'modifyRenown', delta: 15, reason: '历昆仑毒泉死劫拜入星宿派门墙' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0122' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0262' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0181' }, delta: -10 },
    { type: 'spawnDynamicActor', actor: buildSubanxiaPermanentActor() },
    {
      type: 'branch',
      condition: { type: 'flag', flag: 'xx_xiaoshizi_saved', op: 'truthy' },
      thenEffects: [{ type: 'spawnDynamicActor', actor: buildXiaoshiziPermanentActor() }],
    },
    {
      type: 'completeQuest',
      questId: XINGXIU_ENTRY_QUEST_ID,
      outcome: 'joined_xingxiu',
      combatExp: 90,
    },
    {
      type: 'toast',
      text: '正式拜入【星宿派】授职外门弟子！获赐门派披挂、《万山之祖昆仑雪域舆图》与苏半夏亲配辟瘴散，苏半夏已常驻昆仑冰蚕寒石窟！',
      tone: 'success',
      logTag: '紫衣入籍',
    },
  ],
}

const SCENE_XX_19B_PRAISE_CLIMAX: StorySceneDef = {
  id: 'scene_xx_19b_praise_climax',
  title: '第十九幕（续）· 巧舌捧仙挫摘星',
  subtitle: '番坊正市奇货堂 · 借势护花',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'player' },
      text: '“启禀老仙！中原那些少林秃驴、武当牛鼻子，成日把仁义道德挂在嘴边，背地里争名夺利，给老仙提鞋都不配！老仙神功盖世，弹指间化尽天下内力，实乃太白金星下凡、文曲武曲合体！至于这盒引虫香——”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你眼角余光似笑非笑地掠过冷汗涔涔的摘星子，恭声续道）“昨夜装盒之际，库房偶有劣质散功臭灰飘落盒沿，险些污了仙驾清听。幸得司药女童苏半夏彻夜以天山雪莲露重熏三遍，方保住这缕纯正奇香，小人不敢独贪其功！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '（摘星子脸色霎时由青转白，心知掉包毒计已被你们看穿，偏偏当着丁春秋的面半个字也不敢辩驳，只能咬碎银牙躬身陪笑）“是、是……师父洪福齐天，这新来的师弟与苏药童确实……确实办差精细！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0122' },
      text: '（丁春秋斜睨了摘星子一眼，鼻间发出一声意味深长的冷哼，随即转头看向你，满面红光愈盛）“唔，摘星子近来在陕北搜寻神木王鼎屡屡扑空，办事是越发毛糙了！倒是你这小子，既懂尊师重道，又不埋没同僚微劳，很合老夫脾胃！”',
    },
  ],
  choices: [
    {
      id: 'xx19b_kowtow_accept',
      label: '【顺势长揖谢恩】“愿为老仙鞍前马后，万死不辞！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_XX_20_PURPLE_ROBE_VOW }],
    },
  ],
}

const SCENE_XX_19_DING_CHUNQIU_AUDIENCE: StorySceneDef = {
  id: 'scene_xx_19_ding_chunqiu_audience',
  title: '第十九幕 · 丝竹漫天拜老仙',
  subtitle: '延安府番坊奇货堂秘厅 · 面圣献香',
  illustrationUrl: '/assets/quests/xingxiu_ding_chunqiu_audience.jpg',
  illustrationCaption: '延安番坊秘厅丝竹喧天 · 鹤发童颜星宿老仙高坐受献',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '穿过奇货堂三重挂毯暗门，眼前骤然灯火通明——西域大红羊毛绒毯铺满地面，四尊鎏金兽首炉吐出滚滚紫烟；两侧二十余名星宿弟子手持铜钹、横笛、鼍鼓卖力吹打，口中翻来覆去高唱着颂词，喧闹排场直欲掀翻屋瓦。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '正堂虎皮软榻之上，端坐着一位年近五旬的老者。他银髯垂胸，鹤发童颜，面皮红润如重枣，手中悠然轻摇一柄洁白鹅毛扇；若不看他眼底深处偶尔掠过的阴鸷绿芒，当真宛如画轴里走出来的蓬莱神仙——正是令西北与中原武林谈虎色变的星宿派掌门【丁春秋】！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '（早已候在榻侧的大师兄摘星子见你捧着紫檀描金锦盒入内，嘴角勾起一抹幸灾乐祸的狞笑，故意提高嗓门喝道）“大胆药奴，见了星宿老仙还不快快呈上昆仑新炼的引虫香，请老仙法眼品鉴？！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '满堂丝竹骤歇，数十道目光齐刷刷聚在你双手高举的锦盒之上。丁春秋羽扇微停，掀开盒盖——没有摘星子预想中的刺鼻恶臭，唯有一股凛冽清幽的冰蚕雪莲异香袅袅升腾，连梁间潜伏的两条碧绿毒蛇都探出头来吐信欢舞！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0122' },
      text: '（丁春秋双目一亮，深深吸了一口寒香，抚须微笑道）“嗯——！冰蚕寒髓配雪莲蕊心，火候恰到好处，若拿此香去引那神木王鼎中的西域毒虫，事半功倍！小子，听说你在延安时尚是一介不通内息的白丁，入我昆仑毒庐不过半月便练出毒气，你且说说，我星宿派比起中原那些名门正派如何？”',
    },
  ],
  choices: [
    {
      id: 'xx19_flatter_masterpiece',
      label: '【活学活用三段颂仙诀】痛贬中原伪君子，盛赞老仙神威并暗点锦盒炉灰！',
      subLabel: '顺水推舟替苏半夏脱籍，敲打摘星子',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_XX_19B_PRAISE_CLIMAX }],
    },
    {
      id: 'xx19_eloquence_masterpiece',
      label: '【运使十艺辩才舌灿莲花】引经据典颂老仙功盖尧舜，再借香饼保举苏半夏！',
      subLabel: '辩才 ≥ 25 专属风采（额外提升丁春秋好感）',
      tone: 'jade',
      condition: { type: 'skillAtLeast', key: '辩才', min: 25 },
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0122' }, delta: 10 },
        { type: 'openScene', scene: SCENE_XX_19B_PRAISE_CLIMAX },
      ],
    },
  ],
}

const SCENE_XX_18_RETURN_YANAN_MARKET: StorySceneDef = {
  id: 'scene_xx_18_return_yanan_market',
  title: '第十八幕 · 重返延安物非昨',
  subtitle: '延安府塞上番马黑市 · 故地重游',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '十余日昼夜兼程，驼铃再度摇响在陕北黄土高坡与延水河畔。当押香车队穿过延安府低矮厚重的瓮城，重新踏入【塞上番马黑市】时，正是黄昏掌灯时分。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '黑市里依旧飘荡着安息香与烤羊肉的气息，胡商康老胡仍在角落摆摊吆喝。然而站在半月前你曾狼狈掀摊、抓生石灰死里逃生的青石板前，你内视丹田里汩汩流转的《星宿腐毒行气诀》真气，摸了摸袖中棱角分明的毒蒺藜，只觉恍若隔世。',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（苏半夏与你并肩停在奇货堂高耸的门楼外，伸手替你抚平衣襟上旅途沾染的风沙，轻声道）“半月前在这条街上，你连半口真气都没有，却敢替我挡下星宿恶徒；今日里面坐着的是宗师之境的丁春秋，一步踏错便是粉身碎骨——怕不怕？”',
    },
    {
      speaker: { kind: 'player' },
      text: '“连腐心毒鼎都炸不死咱们，区区几句颂仙词又算得了什么。走吧，过了今晚这道鬼门关，咱们便算在江湖上真正立住脚了！”',
    },
  ],
  choices: [
    {
      id: 'xx18_enter_audience_now',
      label: '【手捧锦盒迈步入堂】直入奇货堂秘厅，拜见星宿老仙丁春秋！',
      tone: 'gold',
      effects: [
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'audience_ding_chunqiu',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_main',
        },
        { type: 'openScene', scene: SCENE_XX_19_DING_CHUNQIU_AUDIENCE },
      ],
    },
    {
      id: 'xx18_prepare_in_market',
      label: '【先在黑市喘口气】稍作整备，再入【番坊正市 · 奇货堂】面见丁春秋',
      tone: 'default',
      effects: [
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'audience_ding_chunqiu',
        },
        {
          type: 'teleportPlayer',
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_main',
        },
      ],
    },
  ],
}

const SCENE_XX_17B_FOIL_PLOT: StorySceneDef = {
  id: 'scene_xx_17b_foil_plot',
  title: '第十七幕（续）· 暗换寒香破杀局',
  subtitle: '昆仑山谷行帐 · 同心破谋',
  mandatory: true,
  beats: [
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（苏半夏用银簪极其小心地挑开锦盒铜扣，挑起夹层底下一点灰黄粉末凑近灯焰，火苗霎时窜出刺鼻腥臭）“果然是星宿派严禁在老仙面前动用的『逆风散功臭秽散』！丁春秋生平最爱排场洁净、最恨恶臭散功之物——明日你若当众献盒，盒盖一开，不等你开口辩白，丁春秋便会一掌把你震成齑粉！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“好个大师兄摘星子！见我在毒沼赢了他手下恶犬，便想借丁春秋的手除掉我，当真是笑里藏刀。”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（她转身从贴身药囊里取出一枚凝结如白玉的雪莲冰蚕香饼，细细刮去盒底秽粉，将真香饼严丝合缝嵌回紫檀盒中）“幸好前几日在寒石窟我多留了一份上等冰露蕊心。明日面圣，你非但无祸，这缕纯正寒香反能叫摘星子搬起石头砸自己的脚！”',
    },
  ],
  choices: [
    {
      id: 'xx17b_depart_yanan',
      label: '【珍重收妥锦盒】随押香驼队东出昆仑，重返延安府番马黑市！',
      tone: 'gold',
      effects: [
        { type: 'advanceShichen', count: 12 },
        { type: 'openScene', scene: SCENE_XX_18_RETURN_YANAN_MARKET },
      ],
    },
  ],
}

const SCENE_XX_17_SWITCHED_INCENSE_BOX: StorySceneDef = {
  id: 'scene_xx_17_switched_incense_box',
  title: '第十七幕 · 锦盒掉包识毒计',
  subtitle: '星宿海毒泉外脉 · 启程前夜',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '东赴延安前夜，昆仑山口风雪渐歇。你正收拾行囊，忽见大师兄【摘星子】背着手踱步而来，狭长双目破天荒地挤出一丝温和笑意，亲手将一只雕花紫檀描金锦盒递到你怀里。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '“好师弟，你在毒泉沼打得好威风啊。师兄向来爱才，这盒新封的『冰蚕百草引虫香』关系到师父搜寻神木王鼎的大事，明日到了延安奇货堂，便由你亲手捧到师父榻前开盒献宝——这泼天的富贵，师兄可全让给你了。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '待摘星子拂袖远去，你捧着沉甸甸的锦盒回到行帐，总觉得黄鼠狼给鸡拜年不安好心。恰逢苏半夏端着热药汤推门进来，鼻翼微动，面色陡然一变！',
    },
  ],
  choices: [
    {
      id: 'xx17_xiaoshizi_warning',
      label: '【帐外忽传急促脚步】听小石子冒死跑来通风报信！',
      subLabel: '因第十幕曾舍身救下小石子触发手足回报',
      tone: 'gold',
      condition: { type: 'flag', flag: 'xx_xiaoshizi_saved', op: 'truthy' },
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'openScene',
          scene: {
            id: 'scene_xx_17a_xiaoshizi_tip',
            title: '第十七幕（插曲）· 滴水之恩涌泉报',
            subtitle: '行帐风雪夜 · 小石子报信',
            mandatory: true,
            beats: [
              {
                speaker: SPEAKER_XIAOSHIZI_SECT,
                text: '（帐帘猛地掀开，小石子顶着一头雪沫子钻进来，喘得上气不接下气，死死抓住你的衣袖）“哥！苏师姐！大事不好！方才我躲在柴堆后头烧火，亲眼瞧见摘星子把真香饼扣下了，往这紫檀盒夹层里塞了一把灰黄色的『逆风散功臭秽散』！”',
              },
              {
                speaker: SPEAKER_XIAOSHIZI_SECT,
                text: '“他跟心腹狞笑说，只要你明天当着老仙的面掀开盖子，不用他动手，老仙一掌就能把你拍成肉泥！哥，你救过我的命，我哪怕被摘星子剁碎了也得跑来告诉你！”',
              },
              {
                speaker: { kind: 'player' },
                text: '（你心头一暖，重重拍了拍小石子单薄的肩膀）“好兄弟，当日那二十记毒藤鞭没白挨！快回炉房去，莫教人起疑，明日看我怎么替咱们出口恶气！”',
              },
            ],
            choices: [
              {
                id: 'xx17a_to_foil',
                label: '【请苏半夏启盒验毒】连夜拆解紫檀锦盒机关',
                tone: 'primary',
                effects: [{ type: 'openScene', scene: SCENE_XX_17B_FOIL_PLOT }],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'xx17_subanxia_inspect',
      label: '【与苏半夏细验盒缝】“摘星子无故献殷勤，这锦盒定有蹊跷！”',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_XX_17B_FOIL_PLOT }],
    },
  ],
}

const SCENE_XX_16_SUMMONS_TO_YANAN: StorySceneDef = {
  id: 'scene_xx_16_summons_to_yanan',
  title: '第十六幕 · 老仙传召授谀诀',
  subtitle: '星宿百草炼毒庐 · 保命真言',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '寒窟守夜三日后，苏半夏肩头箭伤渐愈，而你在毒沼一战挫败乌承山的消息也不胫而走。这日晌午，一骑快马自陕北飞驰入谷，带来掌门丁春秋的严令：着昆仑毒庐立功新锐护送新炼“冰蚕百草引虫香”东赴延安府面圣入籍！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0262' },
      text: '（四师兄出尘子把你拽到丹庐僻静墙角，左右张望无人，压低嗓门啧啧道）“小子，你这回可撞上大运，也撞上大劫了！师父他老人家脾气阴晴不定，上一个去献药的小师弟只因磕头慢了半拍、夸词重了两句，当场便被《化功大法》化去全身骨头！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0262' },
      text: '“念在你孝敬过本四师兄的份上，今日传你星宿派真正压箱底的保命绝学——《面圣三段颂仙诀》！第一段，夸老仙仙容神功赛过太上老君；第二段，骂少林丐帮武当全是鼠辈伪君子；第三段，拍着胸脯赌咒愿做老仙脚边一条忠犬！记牢了么？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你忍住腹中暗笑，面上却拱手肃然道）“多谢四师兄提点救命真言！师弟一定倒背如流，半个字也不差！”',
    },
  ],
  choices: [
    {
      id: 'xx16_pack_for_east',
      label: '【回帐收拾行装】准备明日随队护香东赴延安府',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_XX_17_SWITCHED_INCENSE_BOX }],
    },
  ],
}

// ============================================================================
// 第三卷：冰窟诉愿 · 毒沼亮锋（第 11～15 幕）
// ============================================================================

const SCENE_XX_15_ICE_CAVE_VIGIL: StorySceneDef = {
  id: 'scene_xx_15_ice_cave_vigil',
  title: '第十五幕 · 寒窟渡毒共微光',
  subtitle: '雪山冰蚕寒石窟 · 彻夜逼毒',
  illustrationUrl: '/assets/quests/xingxiu_ice_cave_bandage.jpg',
  illustrationCaption: '昆仑雪山冰蚕寒石窟 · 微火映冰下运功替苏半夏逼出蛇涎毒血',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '乌承山见偷袭闹出人命，怕担毁损冰露之责，连滚带爬逃下山谷；四周看热闹的星宿门徒却纷纷哄笑散去，更有一名管事弟子冷漠撇嘴：“中了腐骨蛇涎箭，半个时辰便要溃烂见骨，一个试药丫头废了便废了，趁早丢进毒泉省得费药！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你一言不发，冷冷扫了那管事一眼，弯腰将浑身打颤、双唇发乌的苏半夏横抱而起，顶着漫天寒风一步步退入幽静无人的【雪山冰蚕寒石窟】。洞内四座万年寒冰石槽泛着幽蓝微光，你在洞口拢起一簇枯松枝燃起微火，撕开她左肩染血的外衫，拔出毒箭。',
    },
    {
      speaker: { kind: 'player' },
      text: '“苏师姐，撑住！我刚练成《星宿腐毒行气诀》第一重，虽浅薄得很，但腐毒同源——你救过我的命，今夜就算抽干我丹田里这口真气，我也绝不教阎王爷把你收走！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '漫漫昆仑寒夜，洞外暴雪呼啸，洞内松火噼啪。你盘膝坐在冰冷青石上，双掌死死抵住苏半夏纤薄后心与肩头创口，一遍又一遍运转微弱的腐毒真气，将那股阴冷刺骨的蛇涎奇毒一丝丝引向指尖逼出。每逼出一滴乌黑毒血，你的脸色便苍白一分，眉梢发间尽结白霜。',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（直至天光微熹，最后一缕黑血滴落冰面。苏半夏长睫轻颤，悠悠转醒，一眼望见你嘴角干涸的血迹与冻僵通红的双手，眼眶霎时滚烫泛红，声音微哑发颤）“傻子……在星宿海这种地方，师兄杀师弟、徒弟害师父都是家常便饭……你为了我耗损刚练出来的本源内息，万一明天有人趁虚害你怎么办？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你勉强扯出一丝疲惫笑意，替她拢好外袍）“我若连替自己挡箭的人都扔进毒沼，那才真成了行尸走肉。别说话，先把这碗温雪水喝了。”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（她默默喝尽雪水，忽然解下颈间红绳系着的一枚温润古旧药玉，轻轻按进你掌心合拢）“这是我耀州苏家传了三代的平安药玉。从延安暗巷到昆仑寒窟，你救我两回，我也救你两回——往后这茫茫邪窟，你的命，便是我苏半夏的命。”',
    },
  ],
  choices: [
    {
      id: 'xx15_cherish_jade',
      label: '【贴身收好药玉】“好，你我同心，定能活着走出这片紫雾！”',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'xx_subanxia_lifebond', value: true },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'addArtExp', artId: 'MA-231', amount: 800 },
        { type: 'openScene', scene: SCENE_XX_16_SUMMONS_TO_YANAN },
      ],
    },
  ],
}

function buildScene14PostDuel(playerWonCleanly: boolean): StorySceneDef {
  return {
    id: `scene_xx_14b_marsh_ambush_${playerWonCleanly ? 'win' : 'rescue'}`,
    title: '第十四幕（续）· 败犬冷箭血染衣',
    subtitle: '紫雾五彩毒泉沼 · 舍身相护',
    mandatory: true,
    beats: [
      {
        speaker: { kind: 'narrator' },
        text: playerWonCleanly
          ? '几个回合交锋下来，你体内《星宿腐毒行气诀》稳稳护住心脉，瞅准空当一式《毒蒺藜散手》破风撒出，正中乌承山肩井与右肋！乌承山惨嚎一声跌倒在沸泉石滩上，半边身子酸麻剧痒，颜面扫地！'
          : '交手数合，乌承山仗着多入门两年步步紧逼，你略显吃力之际，场边苏半夏瞅准风向弹出一撮迷魂药粉，你顺势抖手甩出出尘子所授《毒蒺藜散手》，正扎中乌承山右肋破绽，将其狼狈逼退跌坐在地！',
      },
      {
        speaker: SPEAKER_WU_CHENGSHAN,
        text: '（乌承山趴在紫雾泥沼边，满脸羞愤怨毒，嘴里假意求饶）“好、好师弟，算师兄有眼不识泰山，这玉瓶冰露归你们了……接着——！”',
      },
      {
        speaker: { kind: 'narrator' },
        text: '话音未落，乌承山借着磕头掩护，右袖底机簧骤响，“嗖”的一道幽绿寒芒贴地暴射而出——竟是一支涂满腐骨赤练蛇涎的淬毒袖箭，直奔近在咫尺、收势未稳的你咽喉要害！',
      },
      {
        speaker: SPEAKER_SUBANXIA,
        text: '“小心——！！”',
      },
      {
        speaker: { kind: 'narrator' },
        text: '电光石火之间，你尚不及偏头闪避，身侧一道青影已决然扑至你胸前！“噗”的一声闷响，淬毒短箭深深没入苏半夏左肩锁骨之下，鲜血溅上你手背，她闷哼一声，手中紧护的白玉冰露瓶未碎分毫，整个人却软软倒进你怀里！',
      },
    ],
    choices: [
      {
        id: 'xx14b_carry_to_cave',
        label: '【怒喝震退群小，抱起苏半夏冲向冰蚕寒石窟！】',
        tone: 'danger',
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'kunlun',
            buildingId: 'kl_poison',
            spotId: 'kl_ps_cave',
          },
          { type: 'openScene', scene: SCENE_XX_15_ICE_CAVE_VIGIL },
        ],
      },
    ],
  }
}

const SCENE_XX_14_MARSH_DUEL: StorySceneDef = {
  id: 'scene_xx_14_marsh_duel',
  title: '第十四幕 · 毒沼亮锋挡暗箭',
  subtitle: '紫雾五彩毒泉沼 · 初试锋芒',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '未时三刻，【紫雾五彩毒泉沼】畔硫磺热气蒸腾，紫碧双色泥泡咕嘟翻滚。十余名星宿外门弟子敲着铜钹围在一圈青石坪外看热闹——在星宿海，同门争抢灵药毒物从无公道可言，赢家通吃，败者喂虫。',
    },
    {
      speaker: SPEAKER_WU_CHENGSHAN,
      text: '（乌承山双掌裹着黑砂铁布，狞笑着踏上石坪）“小子，本以为你早吓得钻进丹炉当缩头乌龟了！现在跪下来磕三个响头，把冰蚕寒露和那小药婢一并奉上，师兄留你全尸！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你缓步上前将苏半夏护在身后，丹田内《星宿腐毒行气诀》悄然运转，指间暗扣四师兄刚教的毒蒺藜）“星宿派的规矩我也学了一二——废话少说，手底下见真章吧！”',
    },
  ],
  choices: [
    {
      id: 'xx14_fight_with_intel',
      label: '【直攻右肋旧伤破绽】运使腐毒行气诀与毒蒺藜迎战乌承山！',
      subLabel: '小石子报信加成：乌承山畏寒破绽暴露，战力大幅削弱',
      tone: 'gold',
      condition: { type: 'flag', flag: 'xx_xiaoshizi_saved', op: 'truthy' },
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: XINGXIU_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWuChengshanTrialNpc(true) },
          rule: 'story_trial',
          introText: '紫雾毒泉沼同门争锋！乌承山右肋旧伤破绽已露，尽管施展《毒蒺藜散手》克敌！',
          onWin: [{ type: 'openScene', scene: buildScene14PostDuel(true) }],
          onLose: [{ type: 'openScene', scene: buildScene14PostDuel(false) }],
          onDraw: [{ type: 'openScene', scene: buildScene14PostDuel(false) }],
          onEscape: [{ type: 'openScene', scene: buildScene14PostDuel(false) }],
        },
      ],
    },
    {
      id: 'xx14_fight_normal',
      label: '【沉着亮招应战】以初成《腐毒行气诀》与《毒蒺藜散手》正面交锋！',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: XINGXIU_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildWuChengshanTrialNpc(false) },
          rule: 'story_trial',
          introText: '紫雾毒泉沼初试身手！施展四师兄所授《毒蒺藜散手》挫败恶师兄乌承山！',
          onWin: [{ type: 'openScene', scene: buildScene14PostDuel(true) }],
          onLose: [{ type: 'openScene', scene: buildScene14PostDuel(false) }],
          onDraw: [{ type: 'openScene', scene: buildScene14PostDuel(false) }],
          onEscape: [{ type: 'openScene', scene: buildScene14PostDuel(false) }],
        },
      ],
    },
  ],
}

const SCENE_XX_13B_LEARNED_DART: StorySceneDef = {
  id: 'scene_xx_13b_learned_dart',
  title: '第十三幕（续）· 随手授艺毒蒺藜',
  subtitle: '百草炼毒庐偏房 · 初得外功',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0262' },
      text: '（出尘子被你哄得浑身肥肉乱颤，两只绿豆小眼眯成了一条缝，顺手从案下摸出一只油布小袋与几枚泛着幽蓝冷光的三角铁蒺藜拍在桌上）“哈哈哈！算你小子有眼光！乌承山那厮是大师兄摘星子养的看门狗，平日里连本四师兄的酒钱都敢克扣，老子早看他不顺眼了！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0262' },
      text: '“瞧好了！咱们星宿弟子对敌，傻子才跟人硬拼拳脚！手腕微沉，拇指扣簧，食中二指夹住铁刺顺风斜甩——先扬一把石灰迷眼，再拿这手《毒蒺藜散手》专钉他下三路与麻筋！练熟了这几手把式，管教乌承山跪在地上叫爷爷！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '出尘子虽贪财好谀，手底下的西域奇门毒招倒确有独到之处。经他半个时辰拆解发力巧劲，你结合体内初成的腐毒真气，很快掌握了扬沙藏刺、阴狠刁钻的《毒蒺藜散手》诀窍！',
    },
  ],
  choices: [
    {
      id: 'xx13b_xiaoshizi_secret',
      label: '【出门偶遇小石子招手】听小石子悄悄告知乌承山罩门破绽！',
      subLabel: '第十幕救下小石子专属助力',
      tone: 'gold',
      condition: { type: 'flag', flag: 'xx_xiaoshizi_saved', op: 'truthy' },
      hideWhenUnavailable: true,
      effects: [
        { type: 'teachMartialArt', artId: 'MA-137', level: 1, exp: 300, autoEquip: true },
        { type: 'giveItem', itemId: 'ITM-MED-129', qty: 2 },
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'duel_at_poison_marsh',
          silent: true,
        },
        {
          type: 'openScene',
          scene: {
            id: 'scene_xx_13c_xiaoshizi_weakness',
            title: '第十三幕（插曲）· 柴房暗报破敌机',
            subtitle: '丹庐走廊 · 罩门所在',
            mandatory: true,
            beats: [
              {
                speaker: SPEAKER_XIAOSHIZI_SECT,
                text: '（刚出偏房，一瘸一拐抱柴火的小石子连忙把你拉到柱后，指了指自己右边肋骨）“哥！我替乌承山洗过药浴——那家伙去年被雪山毒蛇咬伤过右肋期门穴，一沾阴寒毒粉便半边身子发麻使不上劲！你待会只管往他右肋招呼！”',
              },
              {
                speaker: { kind: 'player' },
                text: '“好小子，真是及时雨！等我拾掇了那恶霸，回来请你吃烤羊腿！”',
              },
            ],
            choices: [
              {
                id: 'xx13c_go_marsh_now',
                label: '【即刻奔赴紫雾五彩毒泉沼】会战恶师兄乌承山！',
                tone: 'gold',
                effects: [
                  {
                    type: 'teleportPlayer',
                    regionId: 'kunlun',
                    buildingId: 'kl_poison',
                    spotId: 'kl_ps_marsh',
                  },
                  { type: 'openScene', scene: SCENE_XX_14_MARSH_DUEL },
                ],
              },
              {
                id: 'xx13c_prep_first',
                label: '【稍作整备】自行点击【紫雾五彩毒泉沼】再行应战',
                tone: 'default',
                effects: [],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'xx13b_go_marsh_direct',
      label: '【谢过四师兄，直赴毒泉沼】已得《毒蒺藜散手》，即刻前往应战！',
      tone: 'gold',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-137', level: 1, exp: 300, autoEquip: true },
        { type: 'giveItem', itemId: 'ITM-MED-129', qty: 2 },
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'duel_at_poison_marsh',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_marsh',
        },
        { type: 'openScene', scene: SCENE_XX_14_MARSH_DUEL },
      ],
    },
    {
      id: 'xx13b_prep_then_marsh',
      label: '【收妥毒蒺藜稍作调息】自行检视武学后前往【紫雾五彩毒泉沼】',
      tone: 'default',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-137', level: 1, exp: 300, autoEquip: true },
        { type: 'giveItem', itemId: 'ITM-MED-129', qty: 2 },
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'duel_at_poison_marsh',
        },
      ],
    },
  ],
}

const SCENE_XX_13_BRIBE_CHUCHENZI_DART: StorySceneDef = {
  id: 'scene_xx_13_bribe_chuchenzi_dart',
  title: '第十三幕 · 碎银彩虹换毒技',
  subtitle: '百草炼毒庐偏房 · 投其所好',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '距离毒泉沼约战尚有半个时辰。你心里雪亮：自己虽机缘巧合修出《星宿腐毒行气诀》第一缕内息，但手上只有市井粗浅把式，若就这么赤手空拳去斗浸淫毒功两年的乌承山，无疑以卵击石。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '念头一转，你想起随队驻在百草炼毒庐偏房歇脚的四师兄【出尘子】——这位矮胖道人向来与大师兄摘星子一系面和心不合，且生平最贪杯中之物、金银阿谀。你当即掀帘步入偏房，果见出尘子正翘着二郎腿偷抿高昌葡萄酒。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0262' },
      text: '（出尘子把酒葫芦往袖里一揣，斜着小眼哼道）“干甚么干甚么？不去好生看火刮冰，跑来惊扰本真人清修，莫不是皮痒了讨打？”',
    },
  ],
  choices: [
    {
      id: 'xx13_bribe_silver',
      label: '【双手奉上 15 两纹银 + 彩虹奇谀】“特来孝敬四师兄买美酒，求赐一招防身仙术！”',
      subLabel: '消耗 15 两纹银，额外提升出尘子好感度 +15',
      tone: 'gold',
      condition: { type: 'silverAtLeast', min: 15 },
      effects: [
        { type: 'giveSilver', amount: -15, reason: '孝敬星宿四师兄出尘子求授毒招' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0262' }, delta: 15 },
        { type: 'openScene', scene: SCENE_XX_13B_LEARNED_DART },
      ],
    },
    {
      id: 'xx13_flatter_and_chores',
      label: '【包揽三日刷炉苦差 + 连拍三记千古马屁】赞其“昆仑小真仙、风采压摘星”！',
      subLabel: '零银两消耗（耗时 2 个时辰帮工，辩才 +2，出尘子好感度 +10）',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 2 },
        { type: 'modifySkill', key: '辩才', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0262' }, delta: 10 },
        { type: 'openScene', scene: SCENE_XX_13B_LEARNED_DART },
      ],
    },
  ],
}

const SCENE_XX_12_BULLY_BULLIES_DEW: StorySceneDef = {
  id: 'scene_xx_12_bully_bullies_dew',
  title: '第十二幕 · 恶徒欺门索寒露',
  subtitle: '雪山冰蚕寒石窟外 · 仗势欺人',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '两人耗费一个时辰，好不容易用玉匕刮满一小瓶晶莹剔透的冰蚕寒露。刚迈出石窟洞口，迎面便撞见三名歪戴紫帕的外门弟子堵在雪径中央——为首之人满脸横肉、双掌乌黑，正是摘星子手下专管盘剥新人的恶霸师兄【乌承山】！',
    },
    {
      speaker: SPEAKER_WU_CHENGSHAN,
      text: '（乌承山贪婪地盯着苏半夏怀里的白玉药瓶，伸出粗黑五指便往她腕上抓去）“哟，苏小娘子手脚倒麻利！大师兄正缺一瓶上等冰蚕寒露炼丹，识相的乖乖交出来算本师兄的功劳；再陪师兄去暖阁喝两盅热酒，保你免受冻馁之苦！”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（苏半夏脸色一寒，疾退半步避开魔爪，声音冷若冰霜）“乌师兄请自重！这瓶寒露是炼毒庐记档的公差，若短了份量，你我都担待不起……”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你一步横跨挡在苏半夏身前，稳稳格开乌承山探来的手腕）“光天化日强抢同门差事，乌师兄这吃相未免太难看了些。”',
    },
    {
      speaker: SPEAKER_WU_CHENGSHAN,
      text: '（乌承山先是一怔，继而仰天怪笑）“哈哈哈！一个刚入谷半月的药奴也敢在本师兄面前充好汉？星宿海的规矩便是拳头大者说了算！半个时辰后，【紫雾五彩毒泉沼】石坪见——你若不敢来，老子今晚便砸了药庐拿这小娘子试虫！”',
    },
  ],
  choices: [
    {
      id: 'xx12_seek_chuchenzi_now',
      label: '【安抚苏半夏，速寻四师兄出尘子求招】智取外功把式再赴约战！',
      tone: 'gold',
      effects: [
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'learn_dart_from_chuchenzi',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
        { type: 'openScene', scene: SCENE_XX_13_BRIBE_CHUCHENZI_DART },
      ],
    },
    {
      id: 'xx12_walk_to_pavilion',
      label: '【应下约战】自行前往【星宿百草炼毒庐】拜访四师兄出尘子',
      tone: 'primary',
      effects: [
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'learn_dart_from_chuchenzi',
        },
      ],
    },
  ],
}

const SCENE_XX_11_ICE_SILKWORM_CAVE: StorySceneDef = {
  id: 'scene_xx_11_ice_silkworm_cave',
  title: '第十一幕 · 冰蚕寒窟诉江南',
  subtitle: '雪山冰蚕寒石窟 · 卸笠包扎',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '翌日清晨，你奉命随苏半夏步入昆仑雪线之下的【雪山冰蚕寒石窟】刮取冰槽寒露。一入岩洞，外界刺耳的铜钹鼓乐声尽数隔绝，唯有石壁万年玄冰折射出澄澈如梦的幽蓝微光，寒石槽中数条寸许长的雪山冰蚕正静静吐纳寒雾。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '趁着四下再无旁人监视，苏半夏轻轻摘下终日遮面的皂纱竹笠——幽蓝冰光映照下，露出一张清丽脱俗、眉目如画却略带苍白倦意的十七岁少女容颜。她从怀里取出一卷干净细棉布与金创药膏，低声唤你在石台边坐下。',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（她纤细微凉的指尖轻轻拂过你手腕与背上的血痕，细细上药包扎，动作轻柔得生怕弄疼了你）“疼么？我爹从前在耀州开济世药堂时常骂我性子太冷，说学医之人最忌心硬……可进了这星宿海一年，我见惯了卖友求荣的鬼蜮伎俩，还以为世上早就没有你这样的傻瓜了。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“苏师姐不也是嘴上叫我莫多管闲事，背地里却冒着被摘星子剥皮的风险，把雪莲须和行气诀塞进我袖子里么？”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（苏半夏系布结的指尖微顿，耳根浮起一抹极淡的绯红，转过头望着石壁冰棱轻叹）“这昆仑山的雪终年不化，冷得人骨头都发僵。我有时候夜里合上眼，总能闻见十岁那年随爹爹去苏州府采买南药时，河埠头小担子里热腾腾的桂花糖藕香……若有一日能毁掉摘星子手里的血海账册、逃出这片紫雾，我只想去江南看一场不带毒烟的春雨。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“一言为定。待咱们学全了安身立命的本事，无论天涯海角，我陪你去苏州府吃最甜的桂花糖藕，看最干净的江南春雨！”',
    },
  ],
  choices: [
    {
      id: 'xx11_finish_gathering_dew',
      label: '【相视一笑，收妥玉瓶寒露】携手步出雪山冰蚕寒石窟',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_XX_12_BULLY_BULLIES_DEW }],
    },
  ],
}

// ============================================================================
// 第二卷：毒泉洗髓 · 邪窟微光（第 6～10 幕）
// ============================================================================

function buildScene10AfterChoice(savedXiaoshizi: boolean): StorySceneDef {
  return {
    id: `scene_xx_10b_corpse_jar_${savedXiaoshizi ? 'saved' : 'cold'}`,
    title: savedXiaoshizi
      ? '第十幕（续）· 代受藤鞭结死生'
      : '第十幕（续）· 噤若寒蝉顺邪规',
    subtitle: '百草炼毒庐外 · 人心冷暖',
    mandatory: true,
    beats: savedXiaoshizi
      ? [
          {
            speaker: { kind: 'player' },
            text: '（你抢上前一步，单掌按住小石子脚背，运转初成的《星宿腐毒行气诀》将那缕腥绿毒液硬生生吸至指尖逼落泥中，随即躬身朗声道）“启禀大师兄！这小子皮糙肉厚耐寒气，正是明日替大师兄去冰蚕寒石窟刮寒露的好劳力！若拿去喂虫只听个响，反耽误了献给老仙的引虫香——小的愿替他分担二十记毒藤鞭，戴罪立功！”',
          },
          {
            speaker: { kind: 'npc', npcId: 'NPC-0181' },
            text: '（摘星子眯起细长双眼打量了你半晌，见你竟真能以初成毒气化去腐尸蛛液，冷哼一声）“哼，倒算你懂得心疼师兄的差事！来人，赏这多嘴小子二十记浸盐毒藤鞭，明日一早滚去寒石窟把冰露刮满，少一滴拿你们试蛊！”',
          },
          {
            speaker: SPEAKER_XIAOSHIZI_SECT,
            text: '（二十鞭落下，你后背火辣渗血却咬牙未哼半声。待摘星子走远，小石子扑通跪在你面前，眼泪鼻涕糊了一脸，重重磕头）“哥！亲哥！俺爹死得早，从没人拿俺的贱命当回事……从今往后，我小石子这条命就是你的！”',
          },
          {
            speaker: { kind: 'narrator' },
            text: '人群后方，一直紧攥着袖中解毒银针准备拼命的苏半夏悄然松开手指。她远远望着你染血却挺直的脊背，清冷眸底的最后一丝戒备彻底化作春水。',
          },
        ]
      : [
          {
            speaker: { kind: 'narrator' },
            text: '你指尖微颤，终究想起了星宿海“多管闲事者死无葬身之地”的血淋淋规矩。自己眼下不过刚刚打通一口微末毒气，若贸然顶撞一流中品修为的摘星子，只怕连自己与苏半夏都要一并搭进去。你咬紧牙关，默默垂眸退后了半步。',
          },
          {
            speaker: { kind: 'npc', npcId: 'NPC-0181' },
            text: '（小石子凄厉的求救声渐渐消失在后山试蛊坑方向。摘星子满意地扫过噤若寒蝉的众杂役，随手抛给你一只腐尸毒砂小囊，阴恻恻笑道）“很好。进了星宿派，就得明白废物不配活命的道理。明日你随苏药童去冰蚕寒石窟刮取寒露，莫学那蠢货毛手毛脚！”',
          },
          {
            speaker: { kind: 'narrator' },
            text: '你接过冰冷腥臭的毒砂囊，转头看去，只见苏半夏面色雪白如纸，默默垂下竹笠皂纱，一言不发地转身走向寒石窟山道，留下一声极轻的叹息消散在风雪里。',
          },
        ],
    choices: [
      {
        id: 'xx10b_go_ice_cave_now',
        label: '【随苏半夏前往雪山冰蚕寒石窟】采集冰槽寒露',
        tone: 'gold',
        effects: [
          {
            type: 'setQuestStep',
            questId: XINGXIU_ENTRY_QUEST_ID,
            stepId: 'gather_ice_dew',
            silent: true,
          },
          {
            type: 'teleportPlayer',
            regionId: 'kunlun',
            buildingId: 'kl_poison',
            spotId: 'kl_ps_cave',
          },
          { type: 'openScene', scene: SCENE_XX_11_ICE_SILKWORM_CAVE },
        ],
      },
      {
        id: 'xx10b_walk_ice_cave',
        label: '【稍作休整】自行点击【雪山冰蚕寒石窟】与苏半夏会合',
        tone: 'default',
        effects: [
          {
            type: 'setQuestStep',
            questId: XINGXIU_ENTRY_QUEST_ID,
            stepId: 'gather_ice_dew',
          },
        ],
      },
    ],
  }
}

const SCENE_XX_10_CORPSE_JAR_CHOICE: StorySceneDef = {
  id: 'scene_xx_10_corpse_jar_choice',
  title: '第十幕 · 腐瓮惊魂试寸心',
  subtitle: '星宿百草炼毒庐前坪 · 生死一念',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '天刚蒙蒙亮，昆仑山寒风刺骨。同期入谷的延州少年【小石子】双手生满冻疮，抱起一只黑陶药瓮往外搬运时脚下一滑，“咔嚓”一声脆响，陶瓮磕在石阶上裂开一道缝隙，几滴腥绿粘稠的腐尸蛛液溅在他破草鞋与脚背上！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '（刚迈出丹庐的摘星子面色骤然铁青，一脚将小石子踹翻在雪地里，厉声喝道）“混账东西！本大师兄费了七七四十九日养出的腐尸毒蛛液，你也敢摔？！左右，把这没用的狗东西拖去紫雾毒泉，活生生拿去喂五步血蛭！”',
    },
    {
      speaker: SPEAKER_XIAOSHIZI,
      text: '（两名护法上前反扭住小石子双臂，少年吓得魂飞魄散，脚背黑气蔓延，绝望地朝人群中的你投来求救目光）“大哥！救救我……俺娘还在延州窑洞里等俺寄小米回去啊！”',
    },
  ],
  choices: [
    {
      id: 'xx10_save_xiaoshizi',
      label: '【挺身而出 · 运毒功吸液代受鞭责】“住手！留他性命去刮冰露方不误大师兄大计！”',
      subLabel: '重情重义：挨二十毒藤鞭，救下小石子性命并获苏半夏倾心相看（侠义 +10）',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'xx_xiaoshizi_saved', value: true },
        { type: 'modifyChivalry', delta: 10, reason: '于星宿毒庐舍身救下同期少年小石子' },
        { type: 'openScene', scene: buildScene10AfterChoice(true) },
      ],
    },
    {
      id: 'xx10_stay_silent',
      label: '【攥拳退后 · 顺从星宿弱肉强食之规】明哲保身，莫做无谓陪葬',
      subLabel: '冷酷求存：获摘星子赏赐【星宿腐尸毒砂囊】×1（侠义 -8，小石子下落不明）',
      tone: 'danger',
      effects: [
        { type: 'setFlag', flag: 'xx_xiaoshizi_saved', value: false },
        { type: 'modifyChivalry', delta: -8, reason: '于星宿毒庐冷眼旁观同期少年被拖去试蛊' },
        { type: 'giveItem', itemId: 'ITM-MED-118', qty: 1 },
        { type: 'openScene', scene: buildScene10AfterChoice(false) },
      ],
    },
  ],
}

const SCENE_XX_09_SHENMU_WHISPERS: StorySceneDef = {
  id: 'scene_xx_09_shenmu_whispers',
  title: '第九幕 · 夜守残炉闻秘鼎',
  subtitle: '星宿百草炼毒庐外廊 · 隔帘窥秘',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '丹鼎炸炉风波平息后，管事药师见你非但未死、反而因祸得福修出第一口毒气，便将你拨去替贪杯偷懒的四师兄出尘子值守下半夜炉火。三更雪落，忽有两道黑影踏雪入内堂，隔着竹帘传来低沉阴冷的交谈声。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '（正是连夜自陕北赶回昆仑清点秘药的大师兄摘星子）“……师父这次率众潜入延安府番市，全是冲着西域遗失的那尊至宝『神木王鼎』去的！听说党项黑市有胡商见过宝鼎踪迹，谁若能先炼出极品冰蚕引虫香助师父得鼎，这星宿派少掌门之位便铁板钉钉了！”',
    },
    {
      speaker: { kind: 'custom', name: '康星涛', title: '星宿派吹鼓宣教头领', factionName: '星宿派' },
      text: '“恭喜大师兄！只是……四师弟出尘子这次从延安招来的那几个试药杂役里，有个小子今晚炸炉竟没死，还隐隐摸到了行气诀门槛，要不要……”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '“哼，出尘子收的人，留着也是祸害。先叫他们卖命把冰蚕寒露采出来，等引虫香一成，随便寻个由头拿去试腐尸毒便是！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你在外廊炉火暗影里屏息凝神，后背惊出一层冷汗：原来在摘星子眼中，你们这批新人从头到尾都是用完即弃的炉渣药引！唯有尽快壮大自身毒功、借力打力，方有一线生天。',
    },
  ],
  choices: [
    {
      id: 'xx09_keep_silent_dawn',
      label: '【屏息装作添柴熟睡】暗记神木王鼎密闻，静待天明',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_XX_10_CORPSE_JAR_CHOICE }],
    },
  ],
}

const SCENE_XX_08_FURNACE_BREAKTHROUGH: StorySceneDef = {
  id: 'scene_xx_08_furnace_breakthrough',
  title: '第八幕 · 丹炉紫雾冲脉生',
  subtitle: '星宿百草炼毒庐 · 死中求活筑初基',
  illustrationUrl: '/assets/quests/xingxiu_poison_furnace.jpg',
  illustrationCaption: '昆仑百草炼毒庐丹鼎炸裂 · 紫碧毒雾中苏半夏扶背助引毒气冲脉',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '入夜子时，【星宿百草炼毒庐】内双座青铜兽耳大鼎炉火正炽。邻炉一名关中潜伏药师困倦打盹，错将三钱断肠乌头当作甘草投进沸鼎——只听“轰隆”一声闷响，铜鼎顶盖掀飞，滚滚紫碧交织的腥甜毒雾瞬间吞没了整间丹房！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '几名杂役惨叫着捂喉倒地。你距炉口最近，吸入一口紫雾，潜伏左腕经脉中的“三日腐心散”竟被外毒骤然引燃！刹那间如万千毒蚁顺着手臂噬向心口，眼前阵阵发黑，七窍皆有腥热黑血欲涌！',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（浓稠紫烟之中，一道纤细身影竟不顾性命逆着奔逃人群扑到你身后！苏半夏以湿巾掩口，冰凉双掌稳稳抵住你后心灵台穴，急声喝道）“别闭气硬憋！快把雪莲须含在舌底，按我白日给你的桑皮纸口诀——顺手少阴心经，引毒入丹田炼化！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你咬破舌尖，借着剧痛与舌底天山雪莲须那一缕清冽寒意守住灵台清明，强忍经脉寸寸撕裂之苦，盘膝逆引体内两股奇毒直坠气海丹田！）“以毒攻毒，腐木生息……给我——破！！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '轰然一声耳鸣如春雷炸响！原本要人性命的“三日腐心散”与丹炉紫雾在雪莲寒气包裹下彼此吞噬交融，竟化作一缕微凉坚韧的幽紫真气，沿着任督二脉缓缓周天流转！你猛地张口吐出一口乌黑瘀血，胸中郁结尽散——平生第一次，你体内真正拥有了属于武林中人的内家真气！',
    },
  ],
  choices: [
    {
      id: 'xx08_comprehend_neigong',
      label: '【收功吐纳】死里逃生，领悟《星宿腐毒行气诀》第一重！',
      subLabel: '宿毒尽化为护体真气，正式跨入武道门槛',
      tone: 'gold',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-231', level: 1, exp: 500, autoEquip: true },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'openScene', scene: SCENE_XX_09_SHENMU_WHISPERS },
      ],
    },
  ],
}

const SCENE_XX_07_HERB_PAVILION_PACT: StorySceneDef = {
  id: 'scene_xx_07_herb_pavilion_pact',
  title: '第七幕 · 百草丹庐暗授方',
  subtitle: '星宿百草炼毒庐 · 三轻一重',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '踏入岩壁下的【星宿百草炼毒庐】，热浪夹杂着蛇蜕、蝎尾与西域断肠草的苦涩气味扑面而来。竹架上晾晒着五颜六色的剧毒菌草，十几名杂役面黄肌瘦、十指乌黑地围在药臼旁捣药，稍有怠慢便会招来管事药师的皮鞭。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '苏半夏在这里似是熟手司药，管事令她分派药筛。她面无表情地从你案前走过，“啪”地放下一只青竹药筛；趁管事转身呵斥小石子的刹那，你察觉筛底竟压着半截莹白如玉的“天山雪莲须”，以及一页用指甲密密麻麻刻出字痕的薄桑皮纸！',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（她低头假装拨弄草药，用仅有你二人能听见的极轻嗓音飞快说道）“出尘子给你的赤蝎丸只能压毒十日，十日后腐心散一发还是死路。这桑皮纸上是我偷记下的星宿外门《腐毒行气诀》残篇——唯有借毒气冲开气海，把腐心散炼成自身毒息，才能彻底拔根！”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '（说罢，她纤指在石药臼边缘轻轻叩了『三轻一重』四下，抬眸看了你一眼）“这丹庐耳目混杂，往后若我有急事寻你、或探到危险，便叩这四声药臼为号。活下去，别叫我在延安白救你一场。”',
    },
  ],
  choices: [
    {
      id: 'xx07_memorize_formula',
      label: '【不动声色收起雪莲须与残页】同样轻叩“三轻一重”回应，潜心默记口诀',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_XX_08_FURNACE_BREAKTHROUGH }],
    },
  ],
}

const SCENE_XX_06_FIVE_COLOR_MARSH: StorySceneDef = {
  id: 'scene_xx_06_five_color_marsh',
  title: '第六幕 · 紫雾笙歌拜毒泉',
  subtitle: '昆仑山星宿海毒泉外脉 · 荒诞山门',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '跋涉十余日，穿过风雪呼啸的昆仑南麓危崖木栈桥，眼前景象令你与小石子同时倒吸一口凉气——万仞雪峰环抱的幽谷底下，竟蒸腾着一片紫碧斑斓的地热沸泉沼泽，毒雾缭绕如妖魔巢穴；可偏偏在毒沼石坪两侧，整齐列着数十名身披紫衣、手持铜钹横笛的门徒，正吹吹打打，热闹得活像汴京瓦子里的迎神赛会！',
    },
    {
      speaker: SPEAKER_DRUM_BOY,
      text: '（众门徒一边用力敲钹摇鼓，一边扯着嗓子齐声高喊，神情狂热而又紧绷）“星宿老仙，德配天地！威震寰宇，古今无比！少林武当，望风披靡——！”',
    },
    {
      speaker: SPEAKER_XIAOSHIZI,
      text: '（小石子缩着脖子凑到你耳边，结结巴巴小声道）“哥……这、这是武林门派还是跳大神的戏班子？前头那个老头嗓子都喊劈叉了还不敢停……”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '话音未落，前排那名嗓音嘶哑的老门徒因喘息慢了半拍，紫雾中陡然掠出一道瘦高阴鸷的身影，随手一掌拍在那老门徒肩头！那老门徒连哼都未能哼出一声，便面色乌青地栽进五彩沸泉之中，转瞬化作白骨！全场铜钹声非但未停，反而敲得更加震天价响！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0181' },
      text: '（出手的瘦高青年缓缓收回戴着乌金毒爪的右手，阴鸷目光扫过你们这批发抖的新杂役——正是星宿派大师兄【摘星子】！）“哼，师父他老人家虽暂驻延安府办大事，本大师兄回山巡视，规矩半点不能废！新来的药奴都给我听好了：在星宿海，会叫唤、有用处的留着赏饭；没用处的，便是炉里的柴、泉里的泥！统统滚去【星宿百草炼毒庐】领差！”',
    },
  ],
  choices: [
    {
      id: 'xx06_go_pavilion_now',
      label: '【屏息低头随众入庐】前往【星宿百草炼毒庐】领差试药',
      tone: 'gold',
      effects: [
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'report_herb_pavilion',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
        { type: 'openScene', scene: SCENE_XX_07_HERB_PAVILION_PACT },
      ],
    },
    {
      id: 'xx06_look_around_valley',
      label: '【先看清毒谷地形】自行点击【星宿百草炼毒庐】报到当差',
      tone: 'default',
      effects: [
        {
          type: 'setQuestStep',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'report_herb_pavilion',
        },
      ],
    },
  ],
}

// ============================================================================
// 第一卷：紫烟迷市 · 染毒入彀（第 1～5 幕）
// ============================================================================

const SCENE_XX_05_SILK_ROAD_CAMPFIRE: StorySceneDef = {
  id: 'scene_xx_05_silk_road_campfire',
  title: '第五幕 · 西出阳关篝火缘',
  subtitle: '河西瀚海古道 · 驼铃夜话',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '暮色四合，出尘子押着满载西域毒草与十余名试药杂役的骆驼队，悄然驶出延安府西门，循着萧关古道一路向西域昆仑进发。大漠孤烟，残阳似血，数日后驼队宿营于祁连雪山脚下的一处断垣烽燧旁。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '押队的星宿门徒抱酒酣睡，唯有塞外寒风卷着沙砾打在骆驼刺篝火上噼啪作响。憨头憨脑跟着报名混口饱饭的少年【小石子】把一块烤热乎的胡麻干饼掰成三份，笑嘻嘻地递给你和一旁静坐的苏半夏。',
    },
    {
      speaker: SPEAKER_XIAOSHIZI,
      text: '“嘿嘿，恩公大哥，苏姐姐，快趁热垫垫肚子！那矮胖道长虽凶巴巴的，管饭倒不抠门。等到了昆仑山干满半年杂役，攒够十两银子，俺就回延州给俺娘箍两孔新土窑，再也不叫风沙吹着她老人家！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你看着小石子天真淳朴的笑脸，与苏半夏对视一眼，两人皆不忍心戳破“星宿试药杂役十不存一”的残酷真相，只温和叮嘱他到了山上万事跟紧自己、少说多看。待小石子蜷在草堆旁沉沉睡去，苏半夏方拨了拨将熄的红炭。',
    },
    {
      speaker: SPEAKER_SUBANXIA_VEILED,
      text: '（隔着竹笠轻纱，她的声音被大漠夜风吹得格外轻幽）“我本姓苏，单名半夏，关中耀州采药世家出身。半年前，星宿大师兄摘星子觊觎我家祖传《千金百草解毒谱》，一夜之间烧了苏家药庄，将我掳作辨药女婢……这次回延安，我本想偷配解药逃走，不想反连累你也踏进了这座无底深渊。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你端起盛着微苦沙枣茶的粗陶碗，向她轻轻一举）“苏姑娘莫再自责。我孤身闯荡北宋江湖，本就一无内功、二无门第，既然命运把咱们赶上了同一支西出阳关的驼队，那便以苦茶代酒——到了昆仑山，咱们三人互为脊背，定要一块儿活下去！”',
    },
    {
      speaker: SPEAKER_SUBANXIA_VEILED,
      text: '（竹笠轻纱微动，她默默端起粗陶碗与你轻轻一碰，一饮而尽）“好……一块儿活下去。”',
    },
  ],
  choices: [
    {
      id: 'xx05_arrive_kunlun',
      label: '【饮尽苦茶，随驼队西进万山之祖】抵达昆仑山 · 星宿海毒泉外脉！',
      tone: 'gold',
      effects: [
        { type: 'advanceShichen', count: 16 },
        { type: 'spawnDynamicActor', actor: buildChuchenziKunlunActor() },
        {
          type: 'teleportPlayer',
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_marsh',
        },
        { type: 'openScene', scene: SCENE_XX_06_FIVE_COLOR_MARSH },
      ],
    },
  ],
}

const SCENE_XX_04_FLATTER_CHUCHENZI: StorySceneDef = {
  id: 'scene_xx_04_flatter_chuchenzi',
  title: '第四幕 · 矮道贪谀换生机',
  subtitle: '车马行栈 · 镖局坪 · 初试捧场',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '你忍着左腕阵阵麻痒寒意，随苏半夏与跟来报信的小石子来到黑市西侧【车马行栈 · 镖局坪】。只见十几峰双峰骆驼驮满贴着黑封条的木箱，一名身高不满五尺、脑满肠肥、身穿油亮紫道袍的矮胖道人正背着手训斥脚夫——正是星宿派四师兄【出尘子】！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0262' },
      text: '（出尘子瞥见苏半夏带了个陌生人过来，又扫了一眼你手腕上的紫黑霜纹，顿时嗤笑出声）“哟呵，中了本派的『三日腐心散』居然还没烂掉半条胳膊？小子，本真人的解毒灵丹金贵得很，凭甚么白救你这无名白丁？”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你眼下身无半分内功，硬抢无异痴人说梦；但你敏锐察觉到旁侧两名捧场门徒每喊一句“四师兄神威盖世”，出尘子那双绿豆小眼便舒坦得直往上翻——原来这邪派上下，最吃阿谀奉承这一套！',
    },
  ],
  choices: [
    {
      id: 'xx04_clever_flattery',
      label: '【拱手朗声盛赞】“久仰星宿出尘真人仙风道骨、器宇轩昂，今日一见果胜传闻十倍！”',
      subLabel: '顺毛摸虎，投其所好求取压毒灵丹',
      tone: 'gold',
      effects: [
        {
          type: 'openScene',
          scene: {
            id: 'scene_xx_04b_pill_granted',
            title: '第四幕（续）· 半丸续命入驼队',
            subtitle: '车马行栈 · 饮鸩求生',
            mandatory: true,
            beats: [
              {
                speaker: { kind: 'npc', npcId: 'NPC-0262' },
                text: '（出尘子一听“器宇轩昂”四字，矮胖身躯顿时挺高了三分，摸着下巴三缕短须哈哈大笑）“哈哈哈！好小子，虽没练过武，这双招子倒比大师兄手底下那群瞎眼货毒辣得多！不错不错，本真人最看重懂规矩的聪明人！”',
              },
              {
                speaker: { kind: 'npc', npcId: 'NPC-0262' },
                text: '（他屈指一弹，半颗腥苦刺鼻的暗红药丸飞入你掌心）“这是半颗『赤蝎续命丸』，可压住你体内腐心散十日不发。本真人正好缺几个手脚利索的试药杂役押货回昆仑山星宿海——你，还有边上这个讨饭傻小子，一块儿上车跟苏药童走吧！到了昆仑山干得好，再赏你们全套解药！”',
              },
              {
                speaker: { kind: 'narrator' },
                text: '你毫不犹豫吞下那半颗苦涩药丸，左腕蔓延的紫黑霜纹果真缓缓停驻。虽明知前路是龙潭虎穴，但总算在鬼门关前抢回了十日光阴！',
              },
            ],
            choices: [
              {
                id: 'xx04b_board_caravan',
                label: '【登车启程】随苏半夏、小石子踏上西赴昆仑的押药驼队',
                tone: 'gold',
                effects: [{ type: 'openScene', scene: SCENE_XX_05_SILK_ROAD_CAMPFIRE }],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'xx04_eloquence_flattery',
      label: '【施展辩才妙语连珠】赞其“昆仑玉柱、星宿福星，风姿直追老仙本尊”！',
      subLabel: '辩才 ≥ 20 额外博得出尘子欢心（好感度 +10）',
      tone: 'jade',
      condition: { type: 'skillAtLeast', key: '辩才', min: 20 },
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0262' }, delta: 10 },
        {
          type: 'openScene',
          scene: {
            id: 'scene_xx_04c_pill_eloquent',
            title: '第四幕（续）· 妙语生花赐续命',
            subtitle: '车马行栈 · 矮道大悦',
            mandatory: true,
            beats: [
              {
                speaker: { kind: 'npc', npcId: 'NPC-0262' },
                text: '（出尘子听得骨头都轻了三斤，拍着大腿眉飞色舞）“哎呀呀！『昆仑玉柱、星宿福星』——这话说的，本真人爱听！比门口那群只会干嚎铜钹的木头桩子中听一百倍！”',
              },
              {
                speaker: { kind: 'npc', npcId: 'NPC-0262' },
                text: '（他大方地抛给你一整颗『赤蝎续命丸』）“拿去吞了！压住腐心散十日绰绰有余！正好本真人押一批关中奇草回昆仑山星宿海炼丹，便把你和这叫小石子的半大少年一并录进随行药役——跟紧苏药童，少不了你的造化！”',
              },
            ],
            choices: [
              {
                id: 'xx04c_board_caravan',
                label: '【吞服压毒丸登车】随苏半夏、小石子西出阳关赴昆仑！',
                tone: 'gold',
                effects: [{ type: 'openScene', scene: SCENE_XX_05_SILK_ROAD_CAMPFIRE }],
              },
            ],
          },
        },
      ],
    },
  ],
}

const SCENE_XX_03_ONLY_WAY_OUT: StorySceneDef = {
  id: 'scene_xx_03_only_way_out',
  title: '第三幕 · 腐心蚀脉唯入彀',
  subtitle: '番马黑市僻静暗巷 · 绝境求生',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '借着漫天白灰与受惊番马的遮掩，戴皂纱竹笠的采药少女一把拽住你的衣袖，同方才帮忙指路的短工少年【小石子】一道闪入黑市后方僻静马厩暗巷。刚停下脚步，你便觉左腕伤口一阵冰寒钻心，整条小臂竟以肉眼可见的速度浮起一层诡异紫黑霜纹！',
    },
    {
      speaker: SPEAKER_SUBANXIA_VEILED,
      text: '（少女隔着轻纱看清你腕上紫霜，呼吸猛地一滞，迅速从青竹药篓里取出三根银针疾刺你肘弯尺泽穴，又捣碎一株金银花敷在伤处，声音微颤）“糟了……这是西域星宿派独门淬炼的『三日腐心散』！金银花只能暂封经脉两个时辰，一旦紫纹过肩入心，纵是大罗金仙也难救！”',
    },
    {
      speaker: SPEAKER_XIAOSHIZI,
      text: '（蹲在一旁望风的憨直少年小石子急得直搓手）“啊？！延安城里的惠民熟药所和边军医官也治不了么？这位大哥是为了帮姐姐才挨了那冷箭的呀！”',
    },
    {
      speaker: SPEAKER_SUBANXIA_VEILED,
      text: '（少女摇了摇头，清眸透过皂纱紧紧凝视着你，满是愧疚与决断）“中原医馆从未见过西域冰蚕与腐草混合之毒，乱投汤药只会催命。眼下唯一的生路——星宿派四师兄【出尘子】正在西侧【车马行栈 · 镖局坪】招募赴昆仑山试药的杂役，只有他身上带得有压毒续命丸。”',
    },
    {
      speaker: SPEAKER_SUBANXIA_VEILED,
      text: '“只是我须把丑话说在前头：星宿派乃西域第一邪宗，门中弱肉强食、视人命如草芥，一旦入彀便似羊入虎口……少侠本是清白自由身，因我受此无妄之灾，你心里可悔？”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你按住发麻的左腕，洒脱一笑）“路见恶徒欺凌弱女，掀一袋石灰算不得甚么壮举，自然也无甚好悔。既然阎王爷逼我去那星宿海走一遭，便是龙潭虎穴，我也去闯上一闯！”',
    },
  ],
  choices: [
    {
      id: 'xx03_go_chuchenzi_now',
      label: '【事不宜迟，即刻前往车马行栈】随苏半夏去见星宿四师兄出尘子求药！',
      tone: 'gold',
      effects: [
        {
          type: 'startQuest',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'seek_chuchenzi_yanan',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_west',
        },
        { type: 'openScene', scene: SCENE_XX_04_FLATTER_CHUCHENZI },
      ],
    },
    {
      id: 'xx03_walk_chuchenzi',
      label: '【记下出尘子性情，自行前往】步入西侧【车马行栈 · 镖局坪】寻出尘子',
      tone: 'primary',
      effects: [
        {
          type: 'startQuest',
          questId: XINGXIU_ENTRY_QUEST_ID,
          stepId: 'seek_chuchenzi_yanan',
        },
      ],
    },
  ],
}

const SCENE_XX_02_POISON_SLEEVE_ARROW: StorySceneDef = {
  id: 'scene_xx_02_poison_sleeve_arrow',
  title: '第二幕 · 扬灰护药染奇毒',
  subtitle: '塞上番马黑市 · 智退恶徒中冷箭',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '胡商康老胡被当众揭穿假药，灰溜溜卷摊欲走；不料巷口阴影里却晃出两名腰缠花斑毒蛇、额系紫布帕的凶悍汉子，一眼盯上了竹笠少女背篓里露出半截根须的雪山解毒草！',
    },
    {
      speaker: SPEAKER_MARKET_THUG,
      text: '（疤脸恶徒一把拦住去路，狞笑道）“慢着！本大爷奉星宿派大师兄之命在延安搜罗百草，这小娘子篓里的天山雪莲须与秦归，统统归老仙征用了——连人带篓跟爷走一趟吧！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '竹笠少女纤手按向腰间药锄，奈何两名恶徒皆练过粗浅毒掌，步步紧逼。你此时初涉江湖，丹田内毫无半点内功根基，若硬冲上去挥拳相搏，三两招便要被打断肋骨；电光石火间，你瞥见脚边皮货摊上堆着一袋鞣制羊皮用的生石灰粉与一面大铜盘！',
    },
    {
      speaker: { kind: 'player' },
      text: '“看暗器——！！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你大喝一声，飞起一脚踹翻黄铜大盘砸向恶徒胫骨，趁两人低头闪避的刹那，双手抓起整袋生石灰迎风猛扬！漫天白雾骤然炸开，迷得两名恶徒涕泪横流、哇哇乱叫，连拴在木桩上的几匹党项番马也受惊长嘶乱撞，瞬间冲散了围堵！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '可就在你拉起竹笠少女撤出乱马群的一瞬，高处廊庑暗影里冷哼一声，“嗖”地射来一枚细如牛毛的乌黑袖箭！你本能抬臂格开药篓，短箭擦破你左腕粗布袖口钉入木柱——伤口竟未流半滴鲜血，反而透出一股奇异甜腥！',
    },
  ],
  choices: [
    {
      id: 'xx02_retreat_alley',
      label: '【随竹笠少女疾闪入暗巷】先脱离黑市追兵再察看腕上擦伤！',
      tone: 'danger',
      effects: [{ type: 'openScene', scene: SCENE_XX_03_ONLY_WAY_OUT }],
    },
  ],
}

const SCENE_XX_01_PURPLE_SMOKE_MARKET: StorySceneDef = {
  id: 'scene_xx_01_purple_smoke_market',
  title: '第一幕 · 塞市迷香识伪草',
  subtitle: '延安府 · 塞上番马黑市（皇祐二年）',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '大宋皇祐二年，陕北延安府地处宋夏交界要冲。自横山脚下步入这座半地下的【塞上番马黑市】，耳畔尽是党项牧民的嘶哑叫卖与西域驼铃声，空气中除了马汗皮革味，更隐隐浮动着一缕甜腻微腥的紫烟异香。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '生药地摊前，胡商康老胡正举着一束紫褐色草根向一名头戴皂纱竹笠、背负青竹药篓的苗条少女兜售，一口咬定此乃上等岷州秦归；墙根下还蹲着个穿补丁羊皮袄的延州短工少年【小石子】，一边啃着冷硬麦饼，一边好奇张望。',
    },
    {
      speaker: SPEAKER_SOGDIAN_PEDDLER,
      text: '“小娘子你瞧准喽！这可是刚从秦州运来的十年老秦归，补血解百毒，只要五两碎银！过了这村可没这店——近来延州山里采药人接二连三失踪，好药材一天比一天金贵呐！”',
    },
    {
      speaker: SPEAKER_SUBANXIA_VEILED,
      text: '（竹笠少女隔着皂纱轻嗅片刻，声音清泠如山涧碎玉）“秦归断面金黄而味甘辛；你这束草根断面乌紫、叶柄带钩刺，分明是掺了秦岭剧毒断肠草须的生草乌——拿去煎汤，喝一碗便要七窍流血。”',
    },
    {
      speaker: SPEAKER_XIAOSHIZI,
      text: '（墙根下的少年小石子吓得手里的半块麦饼差点掉在地上）“乖乖！断肠草当补药卖，康老胡你也不怕遭雷劈！”',
    },
  ],
  choices: [
    {
      id: 'xx01_step_in_warn',
      label: '【上前一步出言佐证】“这位姑娘所言非虚，草乌断面带黑星，莫再坑害路人！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_XX_02_POISON_SLEEVE_ARROW }],
    },
    {
      id: 'xx01_math_inspect',
      label: '【凭十艺算术/眼力点破斤两猫腻】“不但草是毒草，连秤砣底下都吸了磁石！”',
      subLabel: '算术 ≥ 20 令胡商哑口无言',
      tone: 'jade',
      condition: { type: 'skillAtLeast', key: '算术', min: 20 },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 1 },
        { type: 'openScene', scene: SCENE_XX_02_POISON_SLEEVE_ARROW },
      ],
    },
  ],
}

// ============================================================================
// 入门后重返昆仑星宿海：苏半夏与小石子常驻互动温情剧情
// ============================================================================

const SCENE_XX_REUNION_SUBANXIA: StorySceneDef = {
  id: 'scene_xx_reunion_subanxia',
  title: '寒窟重逢 · 冰露煎茶',
  subtitle: '雪山冰蚕寒石窟 · 故人无恙',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '刚走近冰蚕寒石窟洞口，你在石壁上轻轻叩出“三轻一重”四记脆响。不多时，一袭淡紫衣衫的苏半夏快步迎出洞外，看清是你平安归来，清冷眉宇间瞬间冰雪消融。',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '“听外门师兄说你在江湖上走动，我还道你早把我这寒窟司药师姐忘在脑后了。快进来烤烤火——这是我用雪莲蕊和冰泉水新煎的热茶，驱寒解毒最是管用。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“外头江湖再大，哪有寒石窟这碗雪莲茶喝着踏实。你在这谷里可有受摘星子一伙刁难？”',
    },
    {
      speaker: SPEAKER_SUBANXIA,
      text: '“有老仙亲口免籍的法旨，再加上你当日在毒泉沼立下的威风，如今没人敢轻动我分毫。安心去练你的本事吧，无论你要争这星宿高位，还是来日远走江南，我都替你守着后路。”',
    },
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    {
      type: 'toast',
      text: '饮下苏半夏亲手煎煮的雪莲冰泉茶，气血与内力尽数恢复圆满！',
      tone: 'success',
      logTag: '寒窟微光',
    },
  ],
}

// ============================================================================
// 触发条件与完整声明式任务链注册
// ============================================================================

const XINGXIU_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    { type: 'flag', flag: 'shaolin_novice_state', op: 'eq', value: 'none' },
    {
      type: 'questStatus',
      questId: XINGXIU_ENTRY_QUEST_ID,
      status: 'not_started',
    },
  ],
}

export const XINGXIU_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: XINGXIU_ENTRY_QUEST_ID,
    title: '紫烟迷市 · 毒泉求生',
    category: 'sect_entry',
    factionId: 'SECT-19',
    regionId: 'yanan',
    recommendedRealm: '不入流（专为零内功、零武学开局设计的二十幕体验长卷）',
    maxOpponentRealm: '不入流（剧情试炼点到为止，苏半夏暗助兜底零卡关）',
    recommendedNote:
      '无门无派时踏入【延安府 · 塞上番马黑市】自动开启。全程无需任何初始内功武学，由智退恶徒染奇毒入彀，历昆仑丹炉冲脉悟《星宿腐毒行气诀》、向四师兄出尘子求授《毒蒺藜散手》，与患难师姐苏半夏及同期少年小石子结下生死羁绊，终返延安面见丁春秋拜入星宿派。',
    startHint:
      '无门无派时前往【延安府】，点击进入特殊建筑【塞上番马黑市】（或寻出尘子）即可触发二十幕星宿入门长卷。',
    startLocation: {
      regionId: 'yanan',
      buildingId: 'ya_blackmkt',
      customLabel: '延安府 · 塞上番马黑市（步入即触发）',
    },
    startCondition: XINGXIU_START_CONDITION,
    summary:
      '皇祐二年塞上番马黑市紫烟弥漫，你偶遇采药孤女【苏半夏】与延州短工少年【小石子】，无内功之下急智掀摊扬石灰护她脱险，却被星宿袖箭擦伤染上奇毒【三日腐心散】。为求一线生机，你以妙语哄得星宿四师兄【出尘子】赐下压毒丸，随押药驼队西赴昆仑山【星宿海毒泉外脉】。在丝竹颂仙、人命如草的邪窟之中，你与苏半夏互为微光：丹炉炸裂生死一线间逆引毒气悟得《星宿腐毒行气诀》，腐瓮惊魂前考验寸心良知，向出尘子献礼讨得《毒蒺藜散手》挫败恶霸师兄，更在冰蚕寒石窟彻夜替替你挡箭的苏半夏逼毒守夜。最终识破大师兄【摘星子】锦盒掉包毒计，重返延安番坊面见宗师【丁春秋】，巧舌献香、护花脱籍，披上星宿紫衣踏入波澜壮阔的北宋江湖！',
    initialStepId: 'seek_chuchenzi_yanan',
    steps: {
      seek_chuchenzi_yanan: {
        id: 'seek_chuchenzi_yanan',
        title: '腐心蚀脉 · 求药矮道',
        objective:
          '左腕已染星宿奇毒【三日腐心散】，金银花仅能暂封两时辰。速往延安塞上番马黑市西侧【车马行栈 · 镖局坪】寻星宿派四师兄【出尘子】，投其所好求取压毒续命丸！',
        nextHint:
          '在延安府【塞上番马黑市】内点击西侧【车马行栈 · 镖局坪】，与【出尘子】对话。',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_west',
        },
      },
      report_herb_pavilion: {
        id: 'report_herb_pavilion',
        title: '初入毒海 · 丹庐试药',
        objective:
          '已随押药驼队抵达昆仑山【星宿海毒泉外脉】。请依大师兄摘星子严令，前往东侧岩壁下的【星宿百草炼毒庐】报到领差，寻机化解体内余毒。',
        nextHint: '在【星宿海毒泉外脉】内点击【星宿百草炼毒庐】触发试药剧情。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
      },
      gather_ice_dew: {
        id: 'gather_ice_dew',
        title: '冰蚕寒窟 · 同采寒露',
        objective:
          '已修成《星宿腐毒行气诀》第一缕真气并熬过腐瓮风波。请前往昆仑毒谷西侧【雪山冰蚕寒石窟】，与司药师姐【苏半夏】一同刮取冰蚕寒露。',
        nextHint: '在【星宿海毒泉外脉】内点击【雪山冰蚕寒石窟】。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_cave',
        },
      },
      learn_dart_from_chuchenzi: {
        id: 'learn_dart_from_chuchenzi',
        title: '战前筹谋 · 拜求毒技',
        objective:
          '外门恶霸【乌承山】强索寒露并约战毒泉沼！你初通内息尚缺克敌招式，请速赴【星宿百草炼毒庐】寻四师兄【出尘子】献上好处或美言，求授一招实用防身毒技！',
        nextHint:
          '在【星宿海毒泉外脉】点击【星宿百草炼毒庐】，与驻谷四师兄【出尘子】对话（或点击景点行动）。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
      },
      duel_at_poison_marsh: {
        id: 'duel_at_poison_marsh',
        title: '紫雾毒沼 · 亮锋护花',
        objective:
          '已习得四师兄出尘子亲授《毒蒺藜散手》！请前往【紫雾五彩毒泉沼】石坪，迎战恶师兄【乌承山】，护住苏半夏与冰蚕寒露！',
        nextHint: '在【星宿海毒泉外脉】点击正中【紫雾五彩毒泉沼】发起约战。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_marsh',
        },
      },
      audience_ding_chunqiu: {
        id: 'audience_ding_chunqiu',
        title: '重返延安 · 面圣献香',
        objective:
          '已与苏半夏暗换紫檀锦盒破去摘星子毒计，随队重返【延安府 · 塞上番马黑市】。请步入【番坊正市 · 奇货堂】，向掌门星宿老仙【丁春秋】呈献引虫香！',
        nextHint: '在延安府【塞上番马黑市 · 番坊正市奇货堂】与掌门【丁春秋】对话。',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_main',
        },
      },
    },

    locationTriggers: [
      // 1) 无门无派首次踏入延安府【塞上番马黑市】自动开启第 1 幕
      {
        id: 'trig_xx_enter_yanan_blackmkt',
        regionId: 'yanan',
        buildingId: 'ya_blackmkt',
        onceFlag: 'xingxiu_market_triggered',
        condition: XINGXIU_START_CONDITION,
        effects: [{ type: 'openScene', scene: SCENE_XX_01_PURPLE_SMOKE_MARKET }],
      },
      // 2) 若第 6 幕选“先看清毒谷地形”，点击进入【星宿百草炼毒庐】自动衔接第 7 幕
      {
        id: 'trig_xx_enter_herb_pavilion_step2',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        condition: {
          type: 'questStatus',
          questId: XINGXIU_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'report_herb_pavilion',
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_07_HERB_PAVILION_PACT }],
      },
      // 3) 若第 10 幕选“自行前往寒石窟”，点击进入【雪山冰蚕寒石窟】自动衔接第 11 幕
      {
        id: 'trig_xx_enter_ice_cave_step3',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_cave',
        condition: {
          type: 'questStatus',
          questId: XINGXIU_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'gather_ice_dew',
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_11_ICE_SILKWORM_CAVE }],
      },
    ],

    spotActions: [
      // 景点级交互保障：在【星宿百草炼毒庐】随时可推进试药或拜访出尘子学《毒蒺藜散手》
      {
        id: 'spot_xx_report_pavilion',
        label: '入百草炼毒庐领差试药（会合苏半夏）',
        badge: '星宿求生',
        subtitle: '第七幕 · 百草丹庐暗授方',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        visibleWhen: {
          type: 'questStatus',
          questId: XINGXIU_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'report_herb_pavilion',
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_07_HERB_PAVILION_PACT }],
      },
      {
        id: 'spot_xx_bribe_chuchenzi',
        label: '入丹庐偏房拜见四师兄出尘子 · 求授防身毒技',
        badge: '战前求招',
        subtitle: '第十三幕 · 碎银彩虹换《毒蒺藜散手》',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        visibleWhen: {
          type: 'questStatus',
          questId: XINGXIU_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'learn_dart_from_chuchenzi',
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_13_BRIBE_CHUCHENZI_DART }],
      },
      {
        id: 'spot_xx_gather_ice_dew',
        label: '入冰蚕寒石窟与苏半夏同采寒露',
        badge: '寒窟诉愿',
        subtitle: '第十一幕 · 冰蚕寒窟诉江南',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_cave',
        visibleWhen: {
          type: 'questStatus',
          questId: XINGXIU_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'gather_ice_dew',
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_11_ICE_SILKWORM_CAVE }],
      },
      {
        id: 'spot_xx_marsh_duel',
        label: '踏上毒泉石坪 · 迎战恶师兄乌承山！',
        badge: '毒沼亮锋',
        subtitle: '第十四幕 · 运使《毒蒺藜散手》护住苏半夏',
        tone: 'danger',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_marsh',
        visibleWhen: {
          type: 'questStatus',
          questId: XINGXIU_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'duel_at_poison_marsh',
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_14_MARSH_DUEL }],
      },
    ],

    npcActions: [
      // 1) 手动开启兜底：若玩家直接找到出尘子/摘星子/丁春秋亦可开启第 1 幕
      {
        id: 'act_xx_manual_start',
        label: '探访番市迷香 · 偶遇采药孤女（开启星宿入门二十幕）',
        badge: '星宿机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0262', 'NPC-0181', 'NPC-0122'] },
            XINGXIU_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'xingxiu_market_triggered', value: true },
          { type: 'openScene', scene: SCENE_XX_01_PURPLE_SMOKE_MARKET },
        ],
      },

      // 2) 第 4 幕：在延安车马行栈找四师兄出尘子求取压毒丸
      {
        id: 'act_xx_seek_chuchenzi_pill',
        label: '奉承四师兄出尘子 · 求取腐心散压毒灵丸',
        badge: '入彀求生',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0262'] },
            {
              type: 'questStatus',
              questId: XINGXIU_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'seek_chuchenzi_yanan',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_04_FLATTER_CHUCHENZI }],
      },

      // 3) 防卡死护航：若玩家在昆仑步骤期间意外离开昆仑返回了延安，可在出尘子处乘押药驼队回昆仑毒谷
      {
        id: 'act_xx_caravan_return_kunlun',
        label: '搭乘星宿押药驼队 · 重返昆仑星宿海毒泉外脉',
        badge: '驼队护送',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0262'] },
            {
              type: 'any',
              conditions: [
                {
                  type: 'questStatus',
                  questId: XINGXIU_ENTRY_QUEST_ID,
                  status: 'active',
                  stepId: 'report_herb_pavilion',
                },
                {
                  type: 'questStatus',
                  questId: XINGXIU_ENTRY_QUEST_ID,
                  status: 'active',
                  stepId: 'gather_ice_dew',
                },
                {
                  type: 'questStatus',
                  questId: XINGXIU_ENTRY_QUEST_ID,
                  status: 'active',
                  stepId: 'learn_dart_from_chuchenzi',
                },
                {
                  type: 'questStatus',
                  questId: XINGXIU_ENTRY_QUEST_ID,
                  status: 'active',
                  stepId: 'duel_at_poison_marsh',
                },
              ],
            },
          ],
        },
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'kunlun',
            buildingId: 'kl_poison',
            spotId: 'kl_ps_pavilion',
          },
          {
            type: 'toast',
            text: '已随星宿押药驼队重返【昆仑山 · 星宿海毒泉外脉】！',
            tone: 'talk',
          },
        ],
      },

      // 4) 第 13 幕：在昆仑丹庐找动态驻谷的四师兄出尘子求授《毒蒺藜散手》
      {
        id: 'act_xx_kunlun_chuchenzi_dart',
        label: '献礼美言哄四师兄 · 求授《毒蒺藜散手》',
        badge: '求授毒招',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [ACTOR_CHUCHENZI_KUNLUN_ID] },
            {
              type: 'questStatus',
              questId: XINGXIU_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'learn_dart_from_chuchenzi',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_13_BRIBE_CHUCHENZI_DART }],
      },

      // 5) 第 19 幕：重返延安奇货堂找掌门丁春秋献香拜师
      {
        id: 'act_xx_audience_ding_chunqiu',
        label: '呈献紫檀引虫香盒 · 颂仙拜入星宿门墙',
        badge: '老仙法驾',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0122', 'NPC-0181'] },
            {
              type: 'questStatus',
              questId: XINGXIU_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'audience_ding_chunqiu',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_19_DING_CHUNQIU_AUDIENCE }],
      },

      // 6) 入门后温情回访：在昆仑冰蚕寒石窟与苏半夏品雪莲茶叙旧恢复状态
      {
        id: 'act_xx_reunion_subanxia_tea',
        label: '轻叩暗号 · 与苏半夏共饮雪莲冰泉茶叙旧',
        badge: '患难红颜',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [ACTOR_SUBANXIA_ID] },
            {
              type: 'questStatus',
              questId: XINGXIU_ENTRY_QUEST_ID,
              status: 'completed',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_XX_REUNION_SUBANXIA }],
      },
    ],
  },
]
