import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, flag, setStep, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QUEST_ID } from './jinjunHebeiSpyQuest'

const CG_1_URL = '/assets/quests/jinjun_spy_kaifeng_horseshoe.jpg'

const CG_2_URL = '/assets/quests/jinjun_spy_zhending_horsemarket.jpg'

const CG_3_URL = '/assets/quests/jinjun_spy_longxing_guanyin.jpg'

const CG_4_URL = '/assets/quests/jinjun_spy_daming_sandtable.jpg'

const CG_5_URL = '/assets/quests/jinjun_spy_yellow_river_chains.jpg'

const CG_6_URL = '/assets/quests/jinjun_spy_zichen_memorial.jpg'

function buildBianheSilencerOneNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-HEISHUI-1',
    name: '耶律乌骨',
    title: '辽国暗桩 · 汴河灭口左煞',
    realm: '二流上品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    stats: { hp: 1780, mp: 1420, agi: 68, res: 44 },
    talents: { bone: 76, comprehension: 64, charm: 42 },
    fullLocationLabel: '开封府 > 汴河漕运巡检司',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-077', move1: 'MA-244', move2: 'MA-152' },
    learnedArts: [{ artId: 'MA-243', level: 5 }, { artId: 'MA-077', level: 4 }, { artId: 'MA-244', level: 5 }, { artId: 'MA-152', level: 5 }],
    equipped: { weapon: 'WPN-047', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    questBadgeLabel: '黑水灭口·左',
    talk: '“周承业这软骨头收了我大辽北院三千两黄金，如今竟想乘漕船逃往江南？连这新来的禁军四厢官一并沉入汴河喂鱼！”',
  })
}

function buildBianheSilencerTwoNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-HEISHUI-2',
    name: '萧寒翎',
    title: '辽国暗桩 · 汴河灭口右煞',
    realm: '二流上品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_female_fb.jpg',
    stats: { hp: 1620, mp: 1380, agi: 72, res: 42 },
    talents: { bone: 70, comprehension: 74, charm: 58 },
    fullLocationLabel: '开封府 > 汴河漕运巡检司',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-077', move1: 'MA-073', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-243', level: 5 }, { artId: 'MA-077', level: 5 }, { artId: 'MA-073', level: 4 }, { artId: 'MA-244', level: 5 }],
    equipped: { weapon: 'WPN-043', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-022', accessory2: 'ACC-023', mount: 'MNT-013' },
    questBadgeLabel: '黑水灭口·右',
    talk: '“西夏一品堂在虹桥折了双狼，倒便宜了你这宋廷鹰犬封官赐马！可惜查到群牧司，便是你自寻死路！”',
  })
}

function buildZhendingCourierChiefNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-COURIER-1',
    name: '韩延寿',
    title: '辽国暗桩 · 北院急递掌符使',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_court_male_fb.jpg',
    stats: { hp: 2180, mp: 1750, agi: 73, res: 49 },
    talents: { bone: 80, comprehension: 72, charm: 50 },
    fullLocationLabel: '真定府 > 宋辽边境榷场 > 塞北契丹良驹互市马栏',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-077', move1: 'MA-073', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-077', level: 6 }, { artId: 'MA-073', level: 5 }, { artId: 'MA-244', level: 6 }],
    equipped: { weapon: 'WPN-034', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-011' },
    questBadgeLabel: '急递掌符使',
    talk: '“惊动马群冲散他们！真定榷场的暗账烧了便烧了，只要大名府那口乌铜匣子过了黄河，你们三衙照样要天翻地覆！”',
  })
}

function buildZhendingCourierDeputyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-COURIER-2',
    name: '述律铁爪',
    title: '辽国暗桩 · 乌桓驯马悍骑',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    stats: { hp: 2050, mp: 1620, agi: 70, res: 47 },
    talents: { bone: 84, comprehension: 62, charm: 38 },
    fullLocationLabel: '真定府 > 宋辽边境榷场 > 塞北契丹良驹互市马栏',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-246', move1: 'MA-152', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-246', level: 5 }, { artId: 'MA-152', level: 6 }, { artId: 'MA-244', level: 6 }],
    equipped: { weapon: 'WPN-036', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-011' },
    questBadgeLabel: '乌桓悍骑',
    talk: '“识破我契丹削鬃快马又如何？尝尝老子百斤契丹重装狼牙棒的滋味！”',
  })
}

function buildDamingTraitorCommanderNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-HAN-CHONGJU',
    name: '韩崇矩',
    title: '三衙叛校 · 押纲副指挥使',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '京营叛将',
    avatarUrl: '/assets/characters/templates/tpl_zhenyuan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg',
    stats: { hp: 2320, mp: 1860, agi: 69, res: 50 },
    talents: { bone: 82, comprehension: 66, charm: 45 },
    fullLocationLabel: '大名府 > 河北枪棒大校场 > 六合枪棒八角比武擂台',
    equippedArts: { neigong: 'MA-234', qinggong: 'MA-246', move1: 'MA-116', move2: 'MA-073' },
    learnedArts: [{ artId: 'MA-234', level: 7 }, { artId: 'MA-246', level: 5 }, { artId: 'MA-116', level: 6 }, { artId: 'MA-073', level: 5 }],
    equipped: { weapon: 'WPN-035', armor: 'ARM-017', shoes: 'BOT-009', bow: 'BOW-009', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-009' },
    questBadgeLabel: '三衙叛校',
    talk: '“你一个六扇门捕快出身的黄口小儿，凭一场夜雨救驾便爬到本将头上作四厢都指挥！既然被你翻出冬衣夹层的破甲箭，今日便叫你血溅大名校场！”',
  })
}

function buildDamingTraitorGuardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-TRAITOR-GUARD',
    name: '萧烈刀',
    title: '辽国暗桩 · 随纲潜伏死士',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    stats: { hp: 1980, mp: 1680, agi: 73, res: 46 },
    talents: { bone: 78, comprehension: 70, charm: 40 },
    fullLocationLabel: '大名府 > 河北枪棒大校场 > 六合枪棒八角比武擂台',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-077', move1: 'MA-073', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-077', level: 6 }, { artId: 'MA-073', level: 6 }, { artId: 'MA-244', level: 6 }],
    equipped: { weapon: 'WPN-034', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-011' },
    questBadgeLabel: '潜伏刀鬼',
    talk: '“韩将军莫慌！萧统制已在黄河铁索渡口备妥火船，宰了这钦差密使，咱们今夜过了大河便是大辽千户！”',
  })
}

function buildYellowRiverVanguardOneNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-TIELIN-1',
    name: '耶律重铠',
    title: '契丹铁林军 · 断索先锋骑长',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: { hp: 2460, mp: 1920, agi: 68, res: 53 },
    talents: { bone: 88, comprehension: 62, charm: 42 },
    fullLocationLabel: '大名府 > 黄河铁索渡口 > 镇河铁牛与横江铁索浮桥',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-246', move1: 'MA-152', move2: 'MA-116' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-246', level: 6 }, { artId: 'MA-152', level: 7 }, { artId: 'MA-116', level: 6 }],
    equipped: { weapon: 'WPN-036', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-011' },
    questBadgeLabel: '铁林先锋·左',
    talk: '“火油已泼上浮桥木板！谁敢阻我北院秘匣渡河，连人带甲砸进黄河漩涡！”',
  })
}

function buildYellowRiverVanguardTwoNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-JJ-SPY-TIELIN-2',
    name: '萧断索',
    title: '辽南京暗桩 · 修罗斩副统领',
    realm: '一流中品',
    factionId: 'SECT-31',
    factionName: '辽国暗桩',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    stats: { hp: 2580, mp: 2150, agi: 75, res: 54 },
    talents: { bone: 84, comprehension: 76, charm: 48 },
    fullLocationLabel: '大名府 > 黄河铁索渡口 > 镇河铁牛与横江铁索浮桥',
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-077', move1: 'MA-073', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-243', level: 8 }, { artId: 'MA-077', level: 7 }, { artId: 'MA-073', level: 7 }, { artId: 'MA-244', level: 7 }],
    equipped: { weapon: 'WPN-034', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-011' },
    questBadgeLabel: '修罗副统领',
    talk: '“萧统制一枪锁魂，我一刀斩胫！今夜叫你大宋殿前司的鎏金虎符沉入黄河底！”',
  })
}

const SCENE_44_EPILOGUE_NORTH_WIND: StorySceneDef = {
  id: 'scene_jj_spy_44_epilogue_north_wind',
  title: '第四十四幕 · 万里河朔望长缨',
  subtitle: '卷四 · 终章：大内宣德门外 · 御街金水河桥',
  mandatory: true,
  beats: [
    N('早朝散班的净鞭声三响回荡在宣德门阙楼飞檐之间，初冬清冽而明亮的阳光刺破汴京城头的薄霜，将御街两侧朱漆栏杆与金水河石桥映照得熠熠生辉。你手按腰畔佩刃缓步走下丹墀石阶，只见一袭御前四品红袍的“御猫”展昭与披挂乌锤甲的八十万禁军总教头林铁衣，正并肩立于金水河桥头含笑相候。'),
    S('NPC-0140', '（迎上前郑重拱手，清朗眉宇间尽是故人重逢的快慰）“自陈桥门一别，我与公孙先生每日都在开封府悬心北望。听说你在真定榷场雪夜夺符、又在大名府黄河铁索浮桥之上力挫辽南京武林统制萧远风，连包大人方才退朝时都连赞了三声‘国之虎臣’！”'),
    S('NPC-0154', '（抱拳爽朗大笑，铁甲叶页铿然作响）“先前殿前司几个老骄兵还嘀咕你出自六扇门，怕镇不住八十万禁军的骄悍之气；如今黄河铁索断舟夺匣一战传回大教场，上下四十二员将校无不心服口服！日后无论在京畿练兵，还是北上太原、西赴延安，我林铁衣的长枪方阵随时听四厢大人调遣！”'),
    P('（驻足金水桥头，抬眼远眺北方苍茫辽阔的河朔晴空，胸中豪气随猎猎北风激荡）“萧远风虽败退白沟河以北，辽国枢密北院与西夏一品堂的狼子野心却远未止息。今日我等守住的是一纸京营名录与一条黄河铁渡；来日大宋禁军旌旗所指，定要教幽燕十六州故土重见汉家日月！”'),
    N('金水河清波微漾，御街车马渐次喧阗，叫卖声、驼铃声与禁军换防的整齐甲叶声交织成皇祐二年东京汴梁最鲜活的人间烟火。而属于你这位大宋禁军四厢都指挥的万里戎机，才刚刚在风云激荡的北宋山河间拉开序幕。'),
  ],
  onFinishEffects: [
    { type: 'removeItem', itemId: 'ITM-MSC-033', qty: 1 },
    { type: 'removeItem', itemId: 'ITM-MSC-034', qty: 1 },
    { type: 'removeItem', itemId: 'ITM-MSC-031', qty: 1 },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'hebei_spy_crushed',
      combatExp: 950,
    },
    toast('大宋禁军四卷长篇《御前泄密 · 河北暗桩》圆满结案！战斗经验 +950！', 'success', '山河靖定'),
  ],
}

const SCENE_43B_SHADOW_SEAL_REWARD: StorySceneDef = {
  id: 'scene_jj_spy_43b_shadow_seal_reward',
  title: '第四十三幕 · 紫宸玄牌授密使',
  subtitle: '卷四 · 抉择乙：垂拱紫宸东暖阁',
  mandatory: true,
  illustrationUrl: CG_6_URL,
  illustrationCaption: '紫宸暖阁秘赏 · 获赐天阶【紫宸玄枢密使腰牌】与九转大还丹',
  beats: [
    N('东暖阁内熏炉瑞脑香烟袅袅，宋仁宗赵祯屏退随侍内官，只留同平章事王德用与皇城司大内总供奉韦青衣在侧。内侍呈上一只乌木错金扁匣，匣内静静躺着一枚乌金错银、正面隐镌北斗玄枢云龙纹的沉重腰牌，旁侧更有一只羊脂白玉瓷瓶，散发出沁入肺腑的九转药香。'),
    S('NPC-0001', '（亲手拈起那枚乌金错银腰牌递入你掌中，温言之中透出帝王深沉的器重）“雷霆震怒易，藏锋布局难。卿既能于黄河狂澜之上力挫强虏，又能在丹墀盛名之前捺住锋芒，替朝廷留一着反制北院的暗棋，足见文武兼资、深明庙堂大体！此枚【紫宸玄枢密使腰牌】与大内秘藏【少林九转大还丹】，朕便私授于卿，另由内帑拨银一千二百两充作行军密费。”'),
    S('NPC-0038', '（黑面微露赞许笑意，抚须颔首）“韩崇矩一脉死党今日午时便由殿前司以军法密决，至于那两条被架空的采买外线，今后每逢换季，老夫便与韦总供奉拟几份真假参半的河北布防草图喂给析津府。萧远风以为自己保住了残桩，殊不知已吞下了咱们的鱼钩！”'),
    S('NPC-0132', '（抱臂轻叹一声，目光中多了几分真正的同行敬意）“往日我只道你刀快胆大，没料到论起反间算计，连皇城司几十年的老密侦也未必及得上你这份沉稳。佩好这块紫宸玄枢腰牌，今后北疆但有暗涌，皇城司暗线皆与你互通声气。”'),
    P('（双手捧接乌金腰牌与玉瓶，深深一揖到底）“微臣领旨！兵者诡道，止戈为武。但叫这枚暗棋来日能在塞北战局替我大宋边军少流一滴冤血，微臣今日纵无朝堂扬名之誉，亦甘之如饴！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'jj_spy_ending_branch', value: 'counter_espionage' },
    { type: 'giveItem', itemId: 'ITM-MSC-032', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
    { type: 'giveSilver', amount: 1200, reason: '紫宸暖阁内帑秘赐反间军资一千二百两' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 30 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0038' }, delta: 25 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0132' }, delta: 20 },
    { type: 'modifySkill', key: '策论', delta: 4 },
    { type: 'modifyRenown', delta: 100, reason: '黄河铁索渡口力挫辽南京武林统制萧远风' },
    openScene('scene_jj_spy_44_epilogue_north_wind', 'QST-SECT-33-HEBEI-SPY'),
  ],
}

const SCENE_42B_COUNTER_ESPIONAGE_MEMORIAL: StorySceneDef = {
  id: 'scene_jj_spy_42b_counter_espionage_memorial',
  title: '第四十二幕 · 密火留线钓北狼',
  subtitle: '卷四 · 抉择乙：垂拱紫宸正殿转东暖阁',
  mandatory: true,
  illustrationUrl: CG_6_URL,
  illustrationCaption: '紫宸密奏 · 外诛首恶而内留虚桩，以反间奇计倒钓辽国北院',
  beats: [
    P('（上前一步，并未当殿高声唱名，而是双手将乌铜名录原封呈上御案，压低声音朗然密奏）“启禀官家：首恶韩崇矩及京营马政司直接通敌之七名校尉，罪证确凿，当以殿前司军法立斩不赦！然臣细察名录末尾两家勋贵门下管事，实乃贪图榷场马价回扣而被人暗中套取换防草签，本身尚不知自己已沦为北院传声筒——臣请密而不宣，将计就计！”'),
    S('NPC-0001', '（眸光骤然一凝，身体微微前倾）“哦？何谓密而不宣、将计就计？卿且细言之。”'),
    P('“若今日满朝大索，朝野勋贵人人自危固不足惜，然辽国枢密北院一旦知晓此网尽毁，定会另起炉灶重埋新钉，届时敌暗我明，防不胜防！不若密诛知情死党，而故意留这两名不知深浅的外围管事在原位，暗中由皇城司与殿前司截换其马政签单——平素喂以七分真小事，待到辽夏边境大战紧要关头，再投以三分致命假军情，定叫萧远风与北院聪明反被聪明误！”'),
    S('NPC-0013', '（包拯执笏沉吟片刻，黑面虽肃，却亦缓缓颔首）“法理昭昭，首恶必诛；至于兵家反间权宜，既已斩断其盗取紫宸真机之手足，留一空壳虚桩以惑强虏，老臣只要殿前司立下铁案底档，待战事落定后再按律追惩那两名贪鄙管事，开封府便不横加掣肘！”'),
    S('NPC-0038', '（眼中精光暴涨，拱手向御座沉声拜倒）“官家！老臣用兵四十年，最喜这等‘外示雷霆、内藏玄机’的宿将手笔！此议大善，请官家散朝后移步东暖阁密议章程！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_43b_shadow_seal_reward', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_43A_IRON_ARMOR_REWARD: StorySceneDef = {
  id: 'scene_jj_spy_43a_iron_armor_reward',
  title: '第四十三幕 · 玄铁步铠赐干城',
  subtitle: '卷四 · 抉择甲：垂拱紫宸正殿丹墀',
  mandatory: true,
  illustrationUrl: CG_6_URL,
  illustrationCaption: '丹墀肃贪 · 御赐天阶重宝【大宋步人玄铁重铠】与纹银千五百两',
  beats: [
    N('圣旨一下，殿前司金瓜武士与开封府虎头皂隶即日出动，不到半个时辰便将名录上涉案的三衙马政蛀虫及两名勋贵府中管事尽数锁拿归案！正午时分，大内文思院四名力士抬出一副寒光凛冽、由一千八百二十片冷锻玄铁甲叶以牛皮穿缀而成的镇国重甲——正是天阶重宝【大宋步人玄铁重铠】！'),
    S('NPC-0001', '（立于紫宸御阶之上，望着殿下甲光映日的英挺身影，朗声宣谕）“国有干城，何惧北风！四厢都指挥孤身北巡真定、大名，不畏强虏萧远风之凶焰，不避京营盘根勋旧之嫌怨，廓清宿卫沉疴，实乃朕之纯臣！特赐内库【大宋步人玄铁重铠】一袭、户部纹银一千五百两，以彰雷霆肃奸之功！”'),
    S('NPC-0013', '（破例向你郑重一揖，声若洪钟）“昔日你在开封府任御前护卫时，老夫便知你有一副不肯折弯的铁脊梁；如今身居禁军重职，面对勋贵涉案仍敢当殿直谏、一查到底，没有半点官官相护之习气，实乃我大宋朝堂之幸、天下苍生之福！”'),
    S('NPC-0012', '（捻须微笑，目露赞赏）“欧阳某今日执笔起草这道嘉奖制词，只觉笔底生风！黄河铁索断胡骑，紫宸丹墀正朝纲——这桩公案写进《起居注》，百年之后读来亦当令人击节！”'),
    P('（单膝拜领千钧玄铁重铠，甲叶相击发出沉浑金铁清鸣）“微臣叩谢圣恩！臣深知唯有朝堂清明、军纪如山，前线浴血将士方无背后冷箭之忧。此副玄铁重铠在身，微臣定当为大宋守稳每一寸城池关隘！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'jj_spy_ending_branch', value: 'righteous_impeach' },
    { type: 'giveItem', itemId: 'ARM-003', qty: 1 },
    { type: 'giveSilver', amount: 1500, reason: '紫宸丹墀肃清京营暗桩特赐纹银一千五百两' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0013' }, delta: 30 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0012' }, delta: 25 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0038' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'all_song_aligned' }, delta: 8 },
    { type: 'modifyRenown', delta: 140, reason: '黄河力挫萧远风并于紫宸殿直谏肃清京营暗桩' },
    { type: 'modifyChivalry', delta: 65, reason: '刚正不阿当殿弹劾勋贵蛀虫廓清军纪' },
    openScene('scene_jj_spy_44_epilogue_north_wind', 'QST-SECT-33-HEBEI-SPY'),
  ],
}

const SCENE_42A_RIGHTEOUS_IMPEACHMENT: StorySceneDef = {
  id: 'scene_jj_spy_42a_righteous_impeachment',
  title: '第四十二幕 · 铁面弹劾肃京营',
  subtitle: '卷四 · 抉择甲：垂拱紫宸正殿',
  mandatory: true,
  illustrationUrl: CG_6_URL,
  illustrationCaption: '当殿直谏 · 联合包拯与欧阳修彻查到底，斩断北辽渗透爪牙',
  beats: [
    P('（昂首踏前一步，声音铿锵如金铁交鸣，回荡在九重汉白玉梁柱之间）“启禀官家！千里之堤，溃于蚁穴！那夜汴河虹桥之上，若非圣上洪福与将士死战，这几名贪墨马价、私泄宿卫签单的蛀虫早已酿成倾天之祸！微臣奏请：名录所载上至三衙校尉、下至勋贵门下管事，不论门第亲疏，一律移交殿前司与开封府三司会审、明正典刑，以儆效尤！”'),
    N('此言一出，殿东班列中两名老勋贵顿时面色惨白、汗透重袍，刚欲出列分辩“治家不严”，却见文臣班首一道紫袍身影凛然迈步而出——正是权知开封府包拯！'),
    S('NPC-0013', '（双手高举象牙朝笏，黑面如铁，字字似惊雷滚过丹墀）“臣包拯附议！王子犯法，尚与庶民同罪；况天子脚下宿卫禁军、马政枢机乎？若因投鼠忌器而姑息养奸，何以对河北餐风饮雪之边卒？何以震慑幽燕虎视之契丹！臣请领开封府虎头铜铡，会同王帅彻办此案，绝不株连无辜，亦绝不纵容一蠹！”'),
    S('NPC-0012', '（紧随包拯之后出班执笏，清朗正气凛然）“臣欧阳修亦附议！庆历以来朝廷每言整军经武，若内蠹不除，良将何以安枕？四厢都指挥万里浴血取回铁证，正当借此雷霆一击，涤荡三衙积弊！”'),
    S('NPC-0001', '（霍然自龙椅起身，一掌重重按在御案金螭镇纸之上，帝王威仪凛不可犯）“准奏！传朕旨意：着殿前都指挥使王德用、权知开封府包拯照单拿人！凡通辽泄密者依军法立斩；凡勋贵纵仆贪墨失察者，罚俸三年、闭门思过！今日朕便要让天下人与北朝看看，我大宋禁军的脊梁是铁打的！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_43a_iron_armor_reward', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_41_ZICHEN_VERDICT_CHOICE: StorySceneDef = {
  id: 'scene_jj_spy_41_zichen_verdict_choice',
  title: '第四十一幕 · 玉阶一念定乾坤',
  subtitle: '卷四 · 大内皇宫：垂拱紫宸正殿（终幕双路线抉择）',
  mandatory: true,
  illustrationUrl: CG_6_URL,
  illustrationCaption: '紫宸晓日丹墀对奏 · 手捧《京营泄密名录》定夺朝堂肃贪或玄枢反间',
  beats: [
    N('御案之上，乌铜秘匣开启，那卷染着黄河水渍与硝烟焦痕的《京营泄密名录》在明黄龙纹案几上徐徐铺展。宋仁宗赵祯逐行阅过，素来温厚仁恕的眉宇间渐渐凝起一层寒霜；殿下百官屏息垂首，落针可闻，唯闻殿外铜鹤香炉青烟笔直上升。'),
    S('NPC-0001', '（缓缓合上名录，深邃目光越过玉阶，直直落在独立丹墀正中的你身上）“好一个辽国北院，好一个借刀杀人！西夏一品堂出死士，契丹暗桩出耳目，而替他们递刀子的，竟是食我大宋俸禄的群牧司校尉与勋旧豪奴！”'),
    S('NPC-0001', '“此案系卿自汴河、真定一路血战至大名府黄河铁索渡口亲手破获。王老令公早朝前曾密奏于朕，言此名录既可作雷霆锄奸之利斧，亦可作留线钓鱼之奇饵。卿乃持符钦差、亦是那夜替朕挡刀之人——朕今日便听卿一言，此册涉案之人，当如何发落？”'),
    N('左侧文班之中，包拯与欧阳修目光灼灼，期盼一举涤清京营积弊；右侧武班之首，黑王相公王德用与廊下暗影里的韦青衣神色渊渟岳峙，静待你落子定局。公道雷霆与兵家诡道，全在你一念之间——'),
  ],
  choices: [
    {
      id: 'choice_jj_spy_impeach_all',
      label: '【当殿直谏 · 尽数擒拿】朗声奏请协同包拯一查到底，不论勋贵亲疏尽数严惩，涤清三衙军纪！',
      subLabel: '刚正肃贪线 · 获赐天阶【大宋步人玄铁重铠】(ARM-003) + 赏银 1,500 两 + 包拯/欧阳修及正派好感与侠义暴涨',
      tone: 'gold',
      effects: [openScene('scene_jj_spy_42a_righteous_impeachment', 'QST-SECT-33-HEBEI-SPY')],
    },
    {
      id: 'choice_jj_spy_counter_spy',
      label: '【密而不宣 · 将计就计】密诛知情死党，故意留两条不知情外围暗线喂送假军情，反钓辽国北院！',
      subLabel: '玄枢反间线 · 获赐专属天阶配饰【紫宸玄枢密使腰牌】+ 天阶【少林九转大还丹】+ 赏银 1,200 两 + 仁宗/王德用重信',
      tone: 'jade',
      effects: [openScene('scene_jj_spy_42b_counter_espionage_memorial', 'QST-SECT-33-HEBEI-SPY')],
    },
  ],
}

const SCENE_40_ZICHEN_PRESENT_PROOF: StorySceneDef = {
  id: 'scene_jj_spy_40_zichen_present_proof',
  title: '第四十幕 · 紫宸早朝呈铁证',
  subtitle: '卷四 · 大内皇宫：垂拱紫宸正殿',
  mandatory: true,
  beats: [
    N('辰时初刻，钟鼓司晨钟九响，垂拱紫宸正殿重门洞开。文武百官分列东西丹墀，你身披大宋禁军四厢都指挥紫红织金战袍，按制卸下长兵，双手托举盛放【幽燕玄铁半鱼符】、【辽夏密约蜡丸】与【京营泄密名录】的乌铜秘匣，步履沉稳踏过御道白玉阶。'),
    P('（于御阶下躬身大拜，朗声奏报）“臣大宋禁军四厢都指挥奉密旨北巡河北马政、彻查暮春虹桥刺驾泄密一案，今已幸不辱命，斩获真定榷场急递使、肃清大名校场叛将韩崇矩，并于黄河铁索渡口击退辽南京武林统制萧远风，夺回北院暗桩全本铁证，谨呈御览！”'),
    N('殿内霎时响起一片倒抽冷气的低哗！原本不少朝臣以为暮春之夜只是西夏没藏讹庞孤注一掷的刺杀，谁也没料到背后竟牵出大辽枢密北院横跨汴梁、真定、大名三府的惊天谍网！'),
    S('NPC-0038', '（王德用越众出班，沉声佐证）“启禀官家！老臣已验看过那枚蜡丸火漆与半枚玄铁鱼符，确系契丹北院枢密使直属暗记无疑。辽人自庆历增币以来表面恭顺修好，暗地里却将西夏一品堂死士引入汴梁，意欲坐收渔翁之利，其心至毒！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_41_zichen_verdict_choice', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_39_DAILOUYUAN_BAO_ZHENG: StorySceneDef = {
  id: 'scene_jj_spy_39_dailouyuan_bao_zheng',
  title: '第三十九幕 · 待漏院前逢龙图',
  subtitle: '卷四 · 大内皇宫：宣德门待漏院廊下',
  mandatory: true,
  beats: [
    N('五更鼓响，宫门未启，皇城宣德门外待漏院廊下灯笼摇曳。你携乌铜秘匣自禁军大教场赶至宫门候朝，恰见两道熟悉的清瘦文臣身影立于石阶寒雾之中——正是权知开封府包拯与翰林学士欧阳修。'),
    S('NPC-0013', '（见你征袍未换、甲缝间犹带黄河泥沙与暗红血迹，黑面动容，缓步上前）“展护卫昨夜已接飞鸽传书，告知老夫你今日五更入宫复命。看你手中这只乌铜匣分量不轻，想来汴河栈桥那条断线，已被你从河北连根拔出了？”'),
    P('（执晚辈与旧部之礼恭敬一揖）“回包大人、欧阳学士：不仅查清了真定榷场官马夹带密报的原委，连三衙叛将与辽国北院联络的名录皆在此匣之中。只是名录末尾，还沾着京中两位老勋贵门下管事的泥印……”'),
    S('NPC-0012', '（轻轻摇头叹息）“承平日久，勋旧之家豢养豪奴，在河北榷场与群牧司里上下其手牟取私利，殊不知贪泉一饮，便成了外邦刺向君父心口的利刃！”'),
    S('NPC-0013', '（目光如炬，按住你的手背沉声嘱咐）“王老令公是沙场宿将，或有兵家奇正之考量；老夫执掌开封府，只信‘公生明、廉生威’六字。但无论你稍后在紫宸殿上作何奏对，老夫信你的赤子肝胆，必不负大宋与黎民！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_40_zichen_present_proof', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_38_KAIFENG_WANG_DEYONG_DEBRIEF: StorySceneDef = {
  id: 'scene_jj_spy_38_kaifeng_wang_deyong_debrief',
  title: '第三十八幕 · 星夜归京入教场',
  subtitle: '卷四 · 紫宸密奏：开封府 · 八十万禁军大教场',
  mandatory: true,
  beats: [
    N('八百里驿道霜蹄碎雪，自大名府渡河南下，不过两日一夜便已望见东京汴梁巍峨的外城敌楼。你未回私邸歇息片刻，径直策马驰入八十万禁军大教场点兵帅台大帐。炭火噼啪声中，殿前都指挥使“黑王相公”王德用披衣秉烛，一页页翻看你自黄河夺回的《京营泄密名录》。'),
    S('NPC-0038', '（重重一拳砸在帅案角上，震得铜烛台火星乱溅，须发皆张）“混账东西！韩崇矩这厮当年在河北军中还算骁勇，竟为了区区五千两北珠与契丹马利，把宫禁换防草签卖给萧远风！死有余辜，死有余辜！”'),
    S('NPC-0038', '（翻至最后一页，苍老锐利的眼眸微微眯起，长长吐出一口浊气）“至于这两家开国勋贵府上的管事……看账目往来，多半是被胡商银子迷了心窍，替人倒腾病汰官马签条，未必晓得背后连着西夏刺驾。只是——”'),
    P('“王帅可是顾虑，若当朝掀开此盖，朝堂清流与勋旧武将必起轩然大波？”'),
    S('NPC-0038', '（坦然直视于你，毫无遮掩）“老夫一生戎马，从不怕得罪勋贵！若一刀斩尽，三衙立时风清气正，痛快淋漓；但从兵家反间计而言，萧远风只知秘匣落水未毁、尚不知咱们看透了几分，若密诛死党而留一两个傀儡空壳喂假情报，来日河北开战便是奇兵一着。天快亮了，随老夫入宫早朝——这桩大功是你拼命挣来的，殿上如何决断，老夫全力为你托底！”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'kaifeng_palace_verdict'),
    openScene('scene_jj_spy_39_dailouyuan_bao_zheng', 'QST-SECT-33-HEBEI-SPY'),
  ],
}

const SCENE_37_FAREWELL_HEBEI_DAWN: StorySceneDef = {
  id: 'scene_jj_spy_37_farewell_hebei_dawn',
  title: '第三十七幕 · 黄河晓雾别河朔',
  subtitle: '卷三 · 大名府：黄河铁索渡口 · 镇河铁牛岸畔',
  mandatory: true,
  beats: [
    N('五更天光微熹，肆虐整夜的黄河火船残骸已被滔滔浊浪卷向东海，横江铁索在晨雾中凝结着一层白霜，稳稳锁住南北浮桥。北宋河北守军正打扫战场、救治伤卒，岸畔镇河大铁牛昂首怒目，宛如万年不倒的河朔脊梁。'),
    S('NPC-0039', '（全身铁甲尽染烟熏血污，抱拳向你朗声行军礼）“四厢大人神威！昨夜铁索浮桥一战，斩获北院精锐十七级、生擒水手八人，黄河渡口固若金汤！末将这便上表北京留守司严密封锁沿岸私渡，保大人南返东京一路无虞！”'),
    S('NPC-0248', '（紫髯侠欧阳春将巨阙厚背宝刀收回布囊，仰头灌下一口烈酒，哈哈一笑）“痛快！往常某家只道朝廷禁军里尽是些讲究排场的衙门官老爷，今日见了老弟在铁索浪头上搏命的刀枪本事，才知东京殿前司真有好汉！后会有期！”'),
    S('NPC-0137', '（丐帮九袋长老陈孤雁拄着青竹杖微微颔首）“萧远风折了这一阵，三年之内北院暗桩休想再在河北兴风作浪。少侠快携这只乌铜秘匣回汴梁面圣罢，莫教朝中忠良久候！”'),
    P('（撬开乌铜防水秘匣外锁验看无误，翻身上马向河北军民豪杰抱拳作别）“多谢王都监与诸位前辈仗义援手！待京营尘埃落定，来日必回大名府临津楼与诸位痛饮三百杯——驾！”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'return_kaifeng_jinjun'),
    toast('已夺回铁证【京营泄密名录与辽夏蜡丸】！请即刻南返【开封府 · 八十万禁军大教场】向王德用复命！', 'success', '北狩大捷'),
  ],
}

const SCENE_36_SEIZE_BLACK_COPPER_BOX: StorySceneDef = {
  id: 'scene_jj_spy_36_seize_black_copper_box',
  title: '第三十六幕 · 夺回名录碎狼谋',
  subtitle: '卷三 · 大名府：黄河铁索渡口 · 横江铁索浮桥',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '铁索凯歌 · 震裂萧远风虎口挑落乌铜秘匣，彻底粉碎辽夏合谋',
  beats: [
    N('“锵——！”金铁暴鸣震彻九曲黄河！在狂风浊浪颠簸起伏的铁索浮桥正中，你硬接萧远风倾尽毕生功力的一记绝杀，反震劲力顺着兵刃轰然炸开，震得这位不可一世的辽南京武林统制虎口鲜血迸裂、蹬蹬连退五步，脚下湿滑松木板咔嚓崩碎！'),
    S('NPC-0184', '（单膝跪倒在剧烈摇晃的铁索边缘，捂住染血右腕，死死盯着你，眼中既有惊骇亦有不甘）“好……好一个大宋禁军四厢都指挥！难怪贺兰断岳兄弟栽在你手里……这笔血债，某家在析津府与幽州城外记下了！”'),
    N('萧远风深知再留片刻必遭合围生擒，猛地反手将背上乌铜秘匣朝汹涌黄河漩涡奋力掷去，欲令铁证永沉河底，自己则借势翻身跃下滚滚浊流，借北岸接应水鬼绳索遁入茫茫夜雾！'),
    P('（早防他狗急毁证，足尖重踏碗口粗的横江铁索借力腾空，凌波探爪如苍鹰搏兔，于浪尖吞没前一寸稳稳抄住乌铜铜环）“想毁灭口铁证？把《京营泄密名录》与辽夏蜡丸给我留下！”'),
    N('你翻身稳稳落回浮桥甲板，掌中乌铜防水秘匣冰冷沉重，封口处契丹枢密北院与西夏一品堂的双重火漆完好无损。四周宋军与江湖群豪见状欢声雷动，声震两岸寒林！'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MSC-031', qty: 1 },
    { type: 'giveCombatExp', amount: 260, reason: '黄河铁索渡口正面击败辽南京武林统制萧远风' },
    openScene('scene_jj_spy_37_farewell_hebei_dawn', 'QST-SECT-33-HEBEI-SPY'),
  ],
}

const SCENE_35_YELLOW_RIVER_BOSS_SHOWDOWN: StorySceneDef = {
  id: 'scene_jj_spy_35_yellow_river_boss_showdown',
  title: '第三十五幕 · 铁索横江战远风',
  subtitle: '卷三 · 高潮决战：黄河铁索渡口 · 镇河铁牛与横江铁索浮桥',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '黄河铁索渡口狂澜夜战 · 浊浪火船间迎战辽南京武林统制萧远风',
  beats: [
    N('黄河怒涛拍击着连舟浮桥，两侧燃烧的契丹火船将半边夜空映成凄厉赤红，粗如儿臂的横江铁链在急流拉扯下发出令人牙酸的铮铮巨响！辽南京武林统制萧远风横握浑铁大枪立于桥心，身侧修罗副统领萧断索弯刀出鞘，冷冽寒气与漫天水雾凝成杀阵。'),
    S('NPC-0184', '（长枪一振，枪缨在火光河风中猎猎如血）“宋廷小将，你既查穿了我北院借西夏一品堂之手行刺赵祯的棋局，今日便更留你不得！待这只乌铜匣过了黄河，东京朝堂照样君臣猜忌、自毁长城——纳命来！”'),
    P('（横刃独立于起伏浮桥之上，衣袂猎猎，声盖黄河怒涛）“我大宋将士守土卫国，靠的是堂堂正正的铁血脊梁，岂是尔等藏头露尾的鼠辈所能动摇！萧远风，接招！”'),
  ],
  choices: [
    {
      id: 'choice_jj_boss_with_wang_xin',
      label: '【虎符正合 · 王信助战】号令河北猛将王信率宿卫强弩协同合击萧远风双煞！',
      subLabel: '官军方略专属 · 禁军都监王信（NPC-0039）并肩上阵分担火力（2v2 决战，战败可重整）',
      tone: 'gold',
      condition: flag('jj_spy_tactic', 'eq', 'imperial_army'),
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0184',
            talkOverride: '“就凭北京留守司这点兵马也想拦我北院铁骑？枪下见真章！”',
          },
          extraOpponents: [{ kind: 'custom', npc: buildYellowRiverVanguardTwoNpc() }],
          allies: [
            {
              kind: 'npc',
              npcId: 'NPC-0039',
              talkOverride: '“四厢大人主攻萧远风，这使修罗刀的辽狗交由末将挡住！”',
            },
          ],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '身后便是黄河铁牛与京营国本铁证，岂可退让半步！',
          introText:
            '黄河铁索浮桥狂澜怒卷！河北猛将王信披甲助阵，与你并肩迎战辽南京武林统制【萧远风】（一流中品）及修罗副统领【萧断索】！',
          onWin: [openScene('scene_jj_spy_36_seize_black_copper_box', 'QST-SECT-33-HEBEI-SPY')],
          onLose: [
            { type: 'healPlayer', hpPct: 0.6, mpPct: 0.6 },
            warn('浮桥风急浪高，萧远风枪势凶猛！王信率盾兵死死护住铁索桥头，请调息整备后再次迎战！', '浮桥拉锯'),
          ],
        },
      ],
    },
    {
      id: 'choice_jj_boss_with_ouyang_chun',
      label: '【江湖奇兵 · 紫髯伯助战】与北侠欧阳春并肩踏索，刀剑合流力劈北院双凶！',
      subLabel: '江湖方略专属 · 北侠欧阳春（NPC-0248）挥巨阙宝刀并肩助阵（2v2 决战，战败可重整）',
      tone: 'jade',
      condition: flag('jj_spy_tactic', 'eq', 'jianghu_heroes'),
      hideWhenUnavailable: true,
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0184',
            talkOverride: '“紫髯伯欧阳春竟也替宋廷官军卖命？连你们一并挑落黄河！”',
          },
          extraOpponents: [{ kind: 'custom', npc: buildYellowRiverVanguardTwoNpc() }],
          allies: [
            {
              kind: 'npc',
              npcId: 'NPC-0248',
              talkOverride: '“护我汉家河朔百姓，何分庙堂江湖！老弟尽管取萧远风，旁人休想插手！”',
            },
          ],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '黄河铁索之上义士并肩，岂能弃友后退！',
          introText:
            '北侠欧阳春豪笑跃上铁索浮桥，巨阙厚刀卷起狂风，与你联手迎击【萧远风】（一流中品）与【萧断索】！',
          onWin: [openScene('scene_jj_spy_36_seize_black_copper_box', 'QST-SECT-33-HEBEI-SPY')],
          onLose: [
            { type: 'healPlayer', hpPct: 0.6, mpPct: 0.6 },
            warn('铁索剧烈颠簸，一时气血翻涌！欧阳春与陈孤雁联手逼退追兵，请整备丹药武学后再度闯桥！', '浮桥拉锯'),
          ],
        },
      ],
    },
    {
      id: 'choice_jj_boss_solo_glory',
      label: '【孤身断索 · 独战双雄】令盟友守稳两岸退路，本将一人独上桥心正面击溃萧远风二人！',
      subLabel: '高难孤胆挑战（1v2 独斗一流中品双强敌，战败可重整；获胜额外奖声望 +50、战斗经验 +150）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0184',
            talkOverride: '“狂妄宋将，竟敢一人独挡本统制与萧断索合击！成全你！”',
          },
          extraOpponents: [{ kind: 'custom', npc: buildYellowRiverVanguardTwoNpc() }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '既立军令孤身锁桥，纵千军万马亦寸步不退！',
          introText:
            '孤胆镇河朔！你喝令众人守住南北桥头防敌水鬼偷渡，孤身一人踏上火光狂澜中的铁索浮桥，以一敌二迎战【萧远风】与【萧断索】！',
          onWin: [
            { type: 'modifyRenown', delta: 50, reason: '黄河铁索浮桥孤身以一敌二击溃萧远风双雄' },
            { type: 'giveCombatExp', amount: 150, reason: '铁索孤胆死斗磨砺武道极境' },
            openScene('scene_jj_spy_36_seize_black_copper_box', 'QST-SECT-33-HEBEI-SPY'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 0.6, mpPct: 0.6 },
            warn('以一敌二压力如山！岸头盟友及时放箭掩护你退回铁牛桩调息，可重整旗鼓或改选盟友助战！', '重整再战'),
          ],
        },
      ],
    },
  ],
}

const SCENE_34_CALM_BREATH_BEFORE_STORM: StorySceneDef = {
  id: 'scene_jj_spy_34_calm_breath_before_storm',
  title: '第三十四幕 · 临阵调息对狂澜',
  subtitle: '卷三 · 大名府：黄河铁索渡口 · 桥心风浪',
  mandatory: true,
  beats: [
    N('萧远风并未急于抢攻，而是借着火船映照审视你的步法架势，试图以契丹玄阴真气的森寒杀意先夺你心神。脚下黄河浊浪一浪高过一浪，冰冷河水溅湿战靴，寻常武人立于这摇摆不定的铁索浮桥上，一身功力便要先折去三成。'),
    P('（深吸一口带着黄河泥腥与硝烟的寒气，双足顺着铁索起伏频率微沉如生根，脑海中倏然掠过开封灯火、真定古刹钟声与沿途忠烈嘱托，丹田真气轰然流转周天）“任他风急浪高、北风如刀，我自心如镇河铁牛，岿然不动！”'),
    N('刹那间，连日奔袭与方才前哨战的疲乏尽数散去，你周身气血内息重归巅峰饱满之境！'),
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 1, mpPct: 1 },
    openScene('scene_jj_spy_35_yellow_river_boss_showdown', 'QST-SECT-33-HEBEI-SPY'),
  ],
}

const SCENE_33_XIAO_YUANFENG_ARRIVES: StorySceneDef = {
  id: 'scene_jj_spy_33_xiao_yuanfeng_arrives',
  title: '第三十三幕 · 北院统制踏索来',
  subtitle: '卷三 · 大名府：黄河铁索渡口 · 横江铁索浮桥',
  mandatory: true,
  beats: [
    N('两名铁林先锋刚被你震落浮桥，北岸浓雾火光深处忽地传来一声裂帛般的长啸！一道魁伟苍劲的玄甲身影脚踏快船桅杆，借力凌空三跃，手中一杆丈二浑铁重枪重重顿在横江主铁索之上——碗口粗的铁链竟被这一枪之威震得激起数尺水花！'),
    S('NPC-0184', '（背负一只乌铜秘匣，目光冷鸷如塞北苍狼，缓缓报出名号）“辽南京武林统制萧远风在此！我还道是谁连破我汴河、真定、大名三处暗桩，原来便是暮春之夜坏了西夏一品堂好事的那名新晋四厢都指挥！”'),
    P('（持刃遥指萧远风背上乌铜秘匣，冷声喝问）“萧远风！宋辽自澶渊立盟以来互通岁币榷场，你们枢密北院竟暗中将我皇城宿卫调拨密情卖予西夏一品堂，唆使党项死士入汴梁行刺我大宋天子——这就是你们契丹人的盟约信义么！”'),
    S('NPC-0184', '（仰天冷笑，声透枭雄桀骜）“成王败寇，何来妇人之仁！西夏没藏讹庞蠢如疯犬，甘愿派精锐去东京拼命；若刺成了，大宋主少国疑，我大辽十万铁骑便可顺势南牧收复瓦桥三关；纵使刺不成，宋夏亦必在延安、秦州结下死仇，两败俱伤！这步一石二鸟的绝棋，只差今夜带回底册圆满收官！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_34_calm_breath_before_storm', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_32_CHAIN_BRIDGE_VANGUARD_FIGHT: StorySceneDef = {
  id: 'scene_jj_spy_32_chain_bridge_vanguard_fight',
  title: '第三十二幕 · 浮桥先破铁林卫',
  subtitle: '卷三 · 大名府：黄河铁索渡口 · 镇河铁牛桥头',
  mandatory: true,
  beats: [
    N('两岸伏兵号角齐鸣！无论岸上强弩攒射还是群侠奇袭，瞬间将外围两艘火油快船截停于浅滩；然而正中旗舰之上，数名身披双层狼裘铁甲的契丹铁林军悍卒已挥舞重装狼牙棒跳上铁索浮桥，挥利斧猛劈系舟副索，企图掩护后方主船强渡！'),
    P('“休想斩断横江副索！儿郎们守住铁牛绞盘，桥上重甲先锋交给我来开路！”'),
  ],
  choices: [
    {
      id: 'choice_jj_fight_vanguard',
      label: '飞身掠上铁索浮桥，迎头痛击契丹铁林重甲先锋！',
      subLabel: '前哨战（一流下品契丹重甲先锋 + 随船死士，战败可重整）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildYellowRiverVanguardOneNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildDamingTraitorGuardNpc() }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '一旦让铁林先锋劈断副索，北院密匣便将顺流北逃！',
          introText:
            '黄河铁索浮桥火光冲天！契丹铁林先锋骑长【耶律重铠】挥舞重装狼牙棒劈向铁索，随船死士左右夹击，速战破敌！',
          onWin: [
            { type: 'giveCombatExp', amount: 120, reason: '黄河浮桥前哨战击溃契丹铁林重甲先锋' },
            openScene('scene_jj_spy_33_xiao_yuanfeng_arrives', 'QST-SECT-33-HEBEI-SPY'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 0.6, mpPct: 0.6 },
            warn('重装狼牙棒势大力沉，浮桥摇晃难立！退回铁牛桩稳住气息后再上浮桥截杀！', '前哨受挫'),
          ],
        },
      ],
    },
  ],
}

const SCENE_31_MIDNIGHT_FIRE_BOATS: StorySceneDef = {
  id: 'scene_jj_spy_31_midnight_fire_boats',
  title: '第三十一幕 · 浊浪惊雷火船出',
  subtitle: '卷三 · 大名府：黄河铁索渡口（子夜决战序幕）',
  mandatory: true,
  beats: [
    N('子时三刻，朔风怒号，乌云彻底遮蔽了残月。滚滚东流的黄河水面上寒雾弥漫，岸畔四尊唐宋镇河大铁牛在夜色中森然矗立，八根碗口粗的横江铁索深深嵌入石矶，锁住横跨大河的三十六艘连环浮桥木舟。'),
    N('骤然间，上游芦苇暗汊里亮起三点幽绿鬼火号灯——三艘船首包覆生铁尖角、甲板堆满猛火油桶的乌篷快船顺着秋汛激流如离弦黑箭般直撞铁索浮桥！船头刀斧手寒光闪烁，显然要借火船焚桥制造混乱，一举冲破黄河封锁线！'),
    P('（自镇河铁牛掩体后霍然起身，拔刃映亮漫天火光）“果真来了！传令收紧铁索绞盘，封死北渡水道，一个也不许放过黄河！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_32_chain_bridge_vanguard_fight', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_30B_JIANGHU_AMBUSH_READY: StorySceneDef = {
  id: 'scene_jj_spy_30b_jianghu_ambush_ready',
  title: '第三十幕 · 铁牛暗影伏奇兵',
  subtitle: '卷三 · 方略乙：黄河铁索渡口 · 南岸芦荡与铁牛矶',
  mandatory: true,
  beats: [
    N('入夜时分，王信依计率北京宿卫骑兵打着百支火把往上游白马津方向大张旗鼓驰去，马蹄声震动十里长堤；而真实的黄河铁索渡口却一片漆黑寂静，唯余秋风吹动枯黄芦苇的沙沙声响。'),
    S('NPC-0275', '（沧州八极门总馆主卢铁山身贴镇河铁牛冰冷底座，压低嗓音向你抱拳）“四厢大人放心！我八极门十二名精锐弟子已伏在铁索绞盘两侧暗坑，辽人水鬼若敢摸岸剪索，定叫他们有来无回！”'),
    S('NPC-0137', '（陈孤雁指了指苇荡深处两声极轻的夜枭暗哨）“丐帮大名分舵弟兄已摸清了那三艘乌篷油船的藏身汉子，并悄悄拔掉了他们埋在南岸的六名暗哨。子时一到，欧阳兄与老叫化替你封死两翼，你只管在浮桥正中截住北院正主！”'),
    P('（按剑颔首，心中涌起一股庙堂兵符与江湖热血交融的豪情）“有劳陈长老、欧阳大侠、卢馆主！请诸位随我潜伏于镇河铁牛之后，静候子时恶浪惊雷！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'jj_spy_tactic', value: 'jianghu_heroes' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0248' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0137' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0275' }, delta: 20 },
    { type: 'modifyChivalry', delta: 25, reason: '以禁军重将之尊折节礼遇河朔群侠共抗北辽' },
    setStep(QUEST_ID, 'daming_river_showdown'),
    toast('河朔群侠奇兵已就位！请前往【大名府 · 黄河铁索渡口 · 镇河铁牛与横江铁索浮桥】开启子夜决战！', 'success', '奇兵潜伏'),
  ],
}

const SCENE_29B_WHARF_WINE_HEROES: StorySceneDef = {
  id: 'scene_jj_spy_29b_wharf_wine_heroes',
  title: '第二十九幕 · 临河浊酒会群豪',
  subtitle: '卷三 · 方略乙：黄河铁索渡口 · 客渡木栈桥与临河酒肆',
  mandatory: true,
  beats: [
    N('暮色四合，你卸去显眼的紫红四厢官袍外罩，只披一袭寻常青布披风赶至黄河渡口临河酒肆。粗木方桌旁，紫髯飘洒的北侠欧阳春正擦拭着那柄宽厚古拙的巨阙宝刀，丐帮护法九袋长老陈孤雁与沧州八极门卢铁山分坐左右，桌上摆着四只粗瓷大碗与一坛刚拍开封泥的河朔烧刀子。'),
    P('（坦然落座，双手捧起酒坛为三位前辈满斟一碗，推心置腹将京营泄密与萧远风今夜强渡之谋和盘托出）“萧远风耳目遍布大名城头，若官军大队明火执仗封锁渡口，他定会弃船改走下游私渡。晚辈虽添居禁军四厢，今日却是以一个大宋江湖后辈的身份，恳请三位前辈助我暗锁铁牛渡！”'),
    S('NPC-0248', '（浓眉一扬，端起酒碗一饮而尽，抚着紫髯朗声豪笑）“好！不摆殿前司大官的臭架子，冲你这句‘大宋江湖后辈’和汴河虹桥孤身挡双狼的胆魄，某家这把老骨头今夜便陪你在黄河风浪里走一遭！”'),
    S('NPC-0137', '（端碗与你重重一碰，沉声凛然）“我丐帮与少林、常山世代同气连枝共御契丹，岂容萧远风把大宋军机带过黄河！王都监只管去上游虚张声势引开辽人暗哨，这铁索渡口的水陆暗桩，包在我们身上！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_30b_jianghu_ambush_ready', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_30A_IMPERIAL_CROSSBOW_READY: StorySceneDef = {
  id: 'scene_jj_spy_30a_imperial_crossbow_ready',
  title: '第三十幕 · 烽旗望楼列强弩',
  subtitle: '卷三 · 方略甲：黄河铁索渡口 · 巡河水寨烽旗望楼',
  mandatory: true,
  beats: [
    N('戌时刚过，三百名口衔枚、马裹蹄的北京宿卫精兵借着堤岸柳林掩护悄然进驻黄河水寨。烽旗望楼与南北栈桥暗垛后，一排排冷光森然的床子弩与神臂硬弓尽数上弦，浸过火醋的铁链闸门死死扣入石槽。'),
    S('NPC-0039', '（王信身披重甲立于望楼垛口，指点河心水道）“四厢大人请看：水寨三面强弩已将河面封成死地！只要子时契丹火船一露头，末将两轮火箭齐发便能焚毁其翼船；纵有萧远风这等绝顶高手弃舟踏上铁索浮桥，末将亦亲提陌刀随大人并肩迎战！”'),
    P('（手按鎏金虎符俯瞰幽暗翻涌的九曲黄河，胸中兵戈之气沛然充盈）“传令各队屏息伏定，未见浮桥号令不得妄发一矢。今夜，便让辽国北院见识我大宋禁军堂堂正正之雷霆！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'jj_spy_tactic', value: 'imperial_army' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0039' }, delta: 25 },
    { type: 'modifySkill', key: '骑术', delta: 3 },
    setStep(QUEST_ID, 'daming_river_showdown'),
    toast('北京宿卫铁甲强弩已合围渡口！请前往【大名府 · 黄河铁索渡口 · 镇河铁牛与横江铁索浮桥】迎战萧远风！', 'success', '铁壁合围'),
  ],
}

const SCENE_29A_GARRISON_TIGER_TALLY: StorySceneDef = {
  id: 'scene_jj_spy_29a_garrison_tiger_tally',
  title: '第二十九幕 · 虎符点兵战鼓急',
  subtitle: '卷三 · 方略甲：北京留守行宫 · 亲军宿卫角楼与战鼓苑',
  mandatory: true,
  beats: [
    N('留守行宫战鼓苑内寒风凛冽，三百名经历过庆历八年贝州平叛血火淬炼的河北禁军甲士肃立无声，长枪如林，冷锻铁甲在火把映照下泛着幽蓝寒芒。你高举【殿前司鎏金密查虎符】登台宣令，与王信所持北京留守驻防半符咔嚓合拢！'),
    S('NPC-0039', '（单膝叩甲，声震行宫飞檐）“虎符合验无误！末将贝州平叛都监王信，谨奉殿前司四厢都指挥将令！儿郎们听着——韩崇矩私通契丹，败坏我大宋禁军名节，今夜随四厢大人封锁黄河铁索，敢退后半步者立斩马下！”'),
    N('三百铁甲宿卫齐刷刷以枪纂顿地，低沉雄浑的“诺！”字闷雷般滚过校场。无需江湖取巧，这便是执掌朝廷虎符、节制一方劲旅的大宋统军威权！'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_30a_imperial_crossbow_ready', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_28_SANDTABLE_STRATEGY_CHOICE: StorySceneDef = {
  id: 'scene_jj_spy_28_sandtable_strategy_choice',
  title: '第二十八幕 · 行宫沙盘决方略',
  subtitle: '卷三 · 北京留守行宫：河北防辽舆图沙盘阁（官军/江湖双线调动）',
  mandatory: true,
  illustrationUrl: CG_4_URL,
  illustrationCaption: '北京留守行宫沙盘定计 · 持殿前司鎏金虎符抉择铁甲封渡或河朔群侠奇兵',
  beats: [
    N('北京留守行宫深处的【河北防辽舆图沙盘阁】内，一尊长逾两丈的黄杨木泥塑立体沙盘横亘堂中，自白沟河、真定滹沱河直至大名府九曲黄河渡口山川险要纤毫毕现。贝州平叛猛将王信披甲按剑立于沙盘北侧，听罢你在枪棒校场诛除叛校韩崇矩之讯，惊怒交集。'),
    S('NPC-0039', '（一掌按在沙盘上的黄河铁索浮桥木模旁，切齿沉喝）“难怪韩崇矩前两日死活不肯让留守司巡检他的冬衣大车！如今乌铜秘匣已在渡口北院密使手中，而辽南京武林统制萧远风今夜子时便会率铁林精锐乘火船接应强渡！”'),
    S('NPC-0039', '“四厢大人手持殿前司鎏金虎符，今夜这盘合围大棋全凭大人一言而决——若走【官军正合】之策，末将立调三百宿卫铁甲与床子强弩正面封死水寨；若虑萧远风耳目机警、欲走【江湖奇兵】之策，末将可率骑兵往上游虚张声势诱敌，听说北侠欧阳春、丐帮陈孤雁长老与沧州八极卢馆主近日恰在渡口酒肆聚首，大人可折节相邀暗伏铁牛矶！”'),
    N('烛火映照着沙盘上蜿蜒如苍龙的黄河水道与你掌中沉甸甸的鎏金虎符。身居大宋禁军要职，既可堂堂正正调动边镇铁骑，亦可融通公门侠脉借重江湖豪杰——你将定下何种合围方略？'),
  ],
  choices: [
    {
      id: 'choice_jj_sandtable_imperial_army',
      label: '【执掌虎符 · 禁军铁甲正合】合验鎏金虎符，调王信麾下三百北京宿卫与神臂强弩正面锁死黄河水寨！',
      subLabel: '庙堂统军路线 · 骑术 +3、王信好感大增，子夜决战可号令猛将王信披甲助阵',
      tone: 'gold',
      effects: [openScene('scene_jj_spy_29a_garrison_tiger_tally', 'QST-SECT-33-HEBEI-SPY')],
    },
    {
      id: 'choice_jj_sandtable_jianghu_heroes',
      label: '【折节下交 · 河朔群侠奇兵】请王信上游虚设疑兵，亲赴渡口酒肆邀北侠欧阳春、陈孤雁与卢铁山暗伏铁牛！',
      subLabel: '江湖义脉路线 · 侠义 +25、欧阳春/陈孤雁/卢铁山好感齐升，子夜决战可与紫髯侠并肩破敌',
      tone: 'jade',
      effects: [openScene('scene_jj_spy_29b_wharf_wine_heroes', 'QST-SECT-33-HEBEI-SPY')],
    },
  ],
}

const SCENE_27_TRAITOR_CONFESSION: StorySceneDef = {
  id: 'scene_jj_spy_27_traitor_confession',
  title: '第二十七幕 · 叛将伏诛知子夜',
  subtitle: '卷三 · 大名府：河北枪棒大校场 · 八角擂台下',
  mandatory: true,
  beats: [
    N('十数合硬碰硬的杀伐交锋过后，叛校韩崇矩手中六合浑铁枪被你凌厉无匹的招式震飞丈外，整个人重重摔落八角擂台石阶；那名随纲潜伏的契丹刀鬼见势不妙刚欲咬碎齿间毒囊，已被戍长郭铁飞身一记枪杆横扫卸去下颌！'),
    S({ name: '韩崇矩', title: '三衙叛校 · 阶下死囚', factionName: '京营叛将' }, '（满口鲜血，面如死灰地瘫在青石板上惨笑喘息）“晚了……你们纵然拿住我，也休想拦住那只乌铜匣！半个时辰前，北院掌匣密使已带着《京营泄密名录》与《辽夏密约蜡丸》混入黄河铁索渡口芦苇滩……”'),
    P('（一脚踏住韩崇矩护心镜，刃尖寒芒直抵其咽喉）“说！萧远风何时渡河？渡口有何接应！”'),
    S({ name: '韩崇矩', title: '三衙叛校 · 阶下死囚', factionName: '京营叛将' }, '“今夜子时三刻！萧远风已在北岸暗汊藏了三艘猛火油船，届时顺流撞焚连舟浮桥、劈断副索强渡……你一个人就算浑身是铁，在滔滔黄河上也拦不住北院铁林精锐！”'),
    S('NPC-0617', '（郭铁命兵卒以铁链将二犯死死锁入囚车，急忙抱拳道）“四厢大人！距离子时只剩不到三个时辰！留守行宫的贝州平叛都监王信将军手握宿卫精兵，请大人速持殿前司虎符前往【北京留守行宫 · 河北防辽舆图沙盘阁】调兵合围！”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'daming_palace_sandtable'),
    toast('已生擒叛将韩崇矩审出子夜渡河阴谋！速赴【北京留守行宫 · 河北防辽舆图沙盘阁】与王信定计合围！', 'success', '审破死期'),
  ],
}

const SCENE_26_LEITAI_PURGE_TRAITOR: StorySceneDef = {
  id: 'scene_jj_spy_26_leitai_purge_traitor',
  title: '第二十六幕 · 八角擂台肃叛校',
  subtitle: '卷三 · 大名府：河北枪棒大校场 · 六合枪棒八角比武擂台',
  mandatory: true,
  beats: [
    N('武库铜钟急响！正立于校场八角比武擂台旁督促车夫喂马的押纲副指挥使韩崇矩脸色骤变，猛地掀翻身前粮袋，抽出一杆寒光闪闪的浑铁大枪；车队阴影中更有一名扮作脚夫的契丹高手拔出燕云修罗斩马刀，一左一右悍然拒捕！'),
    S({ name: '韩崇矩', title: '三衙叛校 · 押纲副指挥使', factionName: '京营叛将' }, '“好个鼻子比猎犬还灵的六扇门鹰犬！从汴河一路追过真定还不肯罢休！弟兄们别信他那块半片铜符，宰了他烧掉武库，随本将投奔北朝享万户富贵！”'),
    P('（亮出殿前司鎏金虎符，声若寒霜震慑全场惑乱士卒）“殿前司密查虎符在此！只诛首恶韩崇矩与契丹奸细，其余受蒙蔽军卒弃械立于原地者一律免罪！韩崇矩，受死！”'),
  ],
  choices: [
    {
      id: 'choice_jj_fight_traitor_han',
      label: '跃上八角擂台，以雷霆军法镇压叛将韩崇矩与随纲辽谍！',
      subLabel: '1v2 肃叛战（一流下品叛将韩崇矩 + 潜伏刀鬼萧烈刀，战败可重整）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildDamingTraitorCommanderNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildDamingTraitorGuardNpc() }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '身为殿前司四厢都指挥当众肃叛，岂可临阵退缩！',
          introText:
            '河北枪棒大校场旌旗猎猎！三衙叛将【韩崇矩】挺六合浑铁枪、契丹死士【萧烈刀】挥修罗斩马刀负隅顽抗，当场拿下！',
          onWin: [
            { type: 'giveCombatExp', amount: 110, reason: '大名校场八角擂台正面拿下三衙叛将韩崇矩' },
            openScene('scene_jj_spy_27_traitor_confession', 'QST-SECT-33-HEBEI-SPY'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 0.6, mpPct: 0.6 },
            warn('韩崇矩久历军阵枪路刁钻！戍长郭铁率校场枪兵结阵拦住其去路，请调息整备后再次缉拿！', '校场苦战'),
          ],
        },
      ],
    },
  ],
}

const SCENE_25_ARMORY_WINTER_COATS: StorySceneDef = {
  id: 'scene_jj_spy_25_armory_winter_coats',
  title: '第二十五幕 · 校场武库察内鬼',
  subtitle: '卷三 · 大名府：河北枪棒大校场 · 清河枪宗百兵武库堂',
  mandatory: true,
  beats: [
    N('你避开校场正门岗哨，径入【清河枪宗百兵武库堂】后院。禁军边关烽燧戍长郭铁正在清点昨日刚入库的十二口“真定冬衣大木箱”，见你出示殿前司鎏金密查虎符，当即屏退杂役跪拜迎候。'),
    S('NPC-0617', '“四厢大人来得正是时候！卑职昨日验收这批押纲副指挥使韩崇矩运来的戍边棉衣，便觉蹊跷——明明账册写着每箱棉花絮袄四十件，可四个壮汉抬起来却沉得压弯扁担，韩崇矩还严令不许开封验看，说今夜便要转运过黄河！”'),
    P('（抽出随身短匕撬开最底下那口贴着封条的大樟木箱，拨开表层两件灰色军袄，箱底赫然露出一排排乌光森冷的契丹三棱破甲重箭与塞满硫磺硝石的猛火油竹筒）“好一个戍边冬衣！这是给北院暗桩偷渡黄河备下的破寨火器！敲响武库警钟，随我去八角擂台锁拿韩崇矩！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_26_leitai_purge_traitor', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_24_DAMING_TAVERN_ARRIVAL: StorySceneDef = {
  id: 'scene_jj_spy_24_daming_tavern_arrival',
  title: '第二十四幕 · 陪都阴云锁大名',
  subtitle: '卷三 · 北京合围：大名府 · 黄河北岸临津酒楼',
  mandatory: true,
  beats: [
    N('自真定府昼夜兼程南下东南，一座城垣宏伟、气吞河朔的雄城映入眼帘——正是庆历二年宋仁宗为震慑契丹亲征声势而升建的北宋陪都【北京大名府】！城外黄河秋汛浊浪滔天，你先在临津酒楼二层靠窗坐定，俯瞰官道车马动向。'),
    S({ name: '临津楼老酒保', title: '大名府渡口耳目', factionName: '市井百姓' }, '（提着铜嘴长壶添上热茶，顺着你的目光望向窗外低声感叹）“客官若是想过黄河可得赶早喽！这两日上游秋水暴涨，黄河铁索渡口每日未时便落闸封桥；偏偏昨日从真定来了一支押运冬衣的京营大车队，领头的韩副指挥使脾气大得很，放着留守司官仓不住，非把车马屯在东边【河北枪棒大校场】的武库旁！”'),
    P('（指尖轻叩桌面，眸光冷冽如电）“放着官仓不住，却紧挨着直通黄河渡口的枪棒大校场……韩崇矩果然就在那里！先去【河北枪棒大校场 · 清河枪宗百兵武库堂】验一验他的冬衣木箱！”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'daming_drill_armory'),
  ],
}

const SCENE_23_ZHENDING_CONVERGE: StorySceneDef = {
  id: 'scene_jj_spy_23_zhending_converge',
  title: '第二十三幕 · 三线合流驰北京',
  subtitle: '卷二 · 结章：真定府南关官道亭',
  mandatory: true,
  beats: [
    N('真定城头暮角苍凉，三路侦查拼图已严丝合缝地合为一卷惊心动魄的河北谍影图：榷场夺得的【幽燕玄铁半鱼符】指明“铁牛吞锁，朔夜渡河”，常山演武堂查实的重辙冬衣车队锁定内鬼押纲官韩崇矩，而隆兴大佛寺千手观音阁更揭破辽南京武林统制萧远风已亲自南下接应！'),
    S('NPC-0036', '（边军都监郭逵亲牵战马送至南关十里亭，郑重递上一囊河北行军干粮与通关火牌）“四厢大人，真定防务有我与赵掌门、雷校尉坐镇，已将榷场余孽尽数封控。只是大名府黄河铁索渡口一旦被萧远风冲破，北院暗桩便可一苇渡入黄河北岸坦途，万望大人星夜兼程！”'),
    S('NPC-0290', '（殿前司女教头仝云韵抱拳清喝，英姿飒爽）“我已先放八百里军鸽飞报大名府枪棒校场的烽燧戍长郭铁暗中留意韩崇矩车队！祝大人旗开得胜，扬我大宋禁军国威！”'),
    P('（翻身上鞍，一抖马缰直指南方陪都官道）“诸位保重！我去北京大名府会一会那位辽南京武林统制萧远风——驾！”'),
  ],
  onFinishEffects: [
    { type: 'giveFood', amount: 15 },
    setStep(QUEST_ID, 'daming_tavern'),
    toast('真定府三路暗桩线索全部查明！请即刻挥鞭南下前往陪都【大名府 · 黄河北岸临津酒楼】追缉韩崇矩与萧远风！', 'success', '驰援北京'),
  ],
}

const SCENE_22_LONGXING_STELE_SPY: StorySceneDef = {
  id: 'scene_jj_spy_22_longxing_stele_spy',
  title: '第二十二幕 · 古碑廊下截耳目',
  subtitle: '卷二 · 隆兴支线：摩尼抱厦偏殿与古碑廊',
  mandatory: true,
  beats: [
    N('自大悲阁拾级而下，穿过宋初名构摩尼殿抱厦与隋代龙藏寺碑古廊，忽闻碑林柏树影里一声极轻的枯枝脆响！你身形如鬼魅欺近，探手扣脉，将一名扮作挂单香客的北院盯梢细作死死按在古石碑座之上。'),
    S('NPC-0301', '（李正鹤合十立于廊柱旁，低宣佛号）“阿弥陀佛。此人身上带有白沟河渡船暗号，看来萧远风已知汴梁灭口失手，严令各路暗桩三日内向【北京大名府 · 黄河铁索渡口】集结焚桥强渡。此贼便交由贫僧与真定都部署衙门看押罢。”'),
    P('“多谢大师援手！萧远风亲自督阵大名府的底细既已摸清，真定这盘迷局便只差合围收网了！”'),
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'jj_spy_zd_longxing_done', value: true },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0301' }, delta: 15 },
    {
      type: 'branch',
      condition: {
        type: 'all',
        conditions: [
          flag('jj_spy_zd_market_done', 'truthy'),
          flag('jj_spy_zd_spear_done', 'truthy'),
        ],
      },
      thenEffects: [openScene('scene_jj_spy_23_zhending_converge', 'QST-SECT-33-HEBEI-SPY')],
      elseEffects: [
        toast('已查明【隆兴大佛寺】萧远风南下密情！请继续完成真定府其余未查地标（宋辽榷场 / 常山演武堂）。', 'success', '古刹得情'),
      ],
    },
  ],
}

const SCENE_21_GUANYIN_PAVILION_SECRET: StorySceneDef = {
  id: 'scene_jj_spy_21_guanyin_pavilion_secret',
  title: '第二十一幕 · 千手慈航照暗影',
  subtitle: '卷二 · 隆兴支线：大悲千手观音三层宝阁',
  mandatory: true,
  illustrationUrl: CG_3_URL,
  illustrationCaption: '真定隆兴寺大悲阁 · 七丈铜铸千手观音法相前密破萧远风南下接应天机',
  beats: [
    N('随李正鹤登上隆兴寺三层飞檐重楼【大悲宝阁】，迎面一尊宋太祖开宝年间敕铸、高达七丈三尺的四十二臂千手千眼铜观音庄严矗立！数百盏酥油长明灯在幽深殿宇中静静摇曳，鎏金铜臂在微光中层叠舒展，慈悲俯瞰着苍茫燕赵大地。闻讯赶来的边军都监郭逵亦已候在阁上栏边。'),
    S('NPC-0301', '（仰望大悲铜像，声音沉凝肃穆）“五日前贫僧自五台山押送护关经卷途经白沟河南岸，亲眼撞见一队伪装成皮货驼队的契丹高手夜宿荒祠。为首之人手提丈二浑铁枪，吐纳之间玄阴寒气凝霜三尺——正是辽南京武林统制【萧远风】！”'),
    S('NPC-0036', '（郭逵脸色微凛，低声接道）“萧远风乃大辽南院名将之后，武功已入一流中品化境，若非关乎宋辽国运的绝密交接，他绝不会冒着违背澶渊盟约的风险孤身潜入我河北腹地！”'),
    S('NPC-0301', '“不错。贫僧暗伏梁上听得真切：昔日汴梁刺驾的御马时辰，正是京营内鬼经真定榷场传予萧远风，再由萧远风转卖西夏一品堂！如今风声吃紧，他亲自南下【大名府】，只为亲手护送那册足以令大宋三衙自乱阵脚的《京营泄密名录》北渡黄河！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_22_longxing_stele_spy', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_20_SUTRA_PAVILION_ZEN: StorySceneDef = {
  id: 'scene_jj_spy_20_sutra_pavilion_zen',
  title: '第二十幕 · 转轮藏阁叩禅机',
  subtitle: '卷二 · 隆兴支线：隆兴大佛寺 · 木构八角转轮藏经阁',
  mandatory: true,
  beats: [
    N('踏入北宋名刹真定隆兴大佛寺西侧【木构八角转轮藏经阁】，巨大的八角木制转轮藏在机轴轻响中缓缓旋动。一名身材魁伟、眉目刚毅的五台山清凉寺护关武僧正合十立于转轮藏前——正是奉师命游方冀州刺探胡骑动向的武僧李正鹤。'),
    S('NPC-0301', '（听见你沉稳绵长的内家步履，头也不回地缓缓开口）“施主衣带京华紫陌之尘，腰悬杀伐宿卫之器，入我佛门清净转轮藏阁，所求者是止戈护生，还是贪功嗜杀？”'),
  ],
  choices: [
    {
      id: 'choice_jj_longxing_jingyi_check',
      label: '【经义对答 · 菩萨低眉亦金刚怒目】引《华严》护国仁王之义，阐明除内蠹即所以止边衅（经义 ≥ 60）',
      subLabel: '检定通过：【经义】+2，额外获李正鹤点拨契丹玄阴枪刀换气破绽',
      tone: 'jade',
      condition: { type: 'skillAtLeast', key: '经义', min: 60 },
      effects: [
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'giveCombatExp', amount: 60, reason: '与清凉寺护关武僧李正鹤印证护国禅武机锋' },
        { type: 'setFlag', flag: 'jj_spy_monk_insight', value: true },
        openScene('scene_jj_spy_21_guanyin_pavilion_secret', 'QST-SECT-33-HEBEI-SPY'),
      ],
    },
    {
      id: 'choice_jj_longxing_sincere_tally',
      label: '【赤诚亮符 · 为苍生问北虏踪】坦然出示殿前司密查虎符，言明追查汴梁刺驾幕后黑手以靖河北',
      subLabel: '零门槛正途推进 · 以忠义赤诚打动五台山护关武僧登大悲阁密谈',
      tone: 'primary',
      effects: [openScene('scene_jj_spy_21_guanyin_pavilion_secret', 'QST-SECT-33-HEBEI-SPY')],
    },
  ],
}

const SCENE_19_SPEAR_HALL_GIFT: StorySceneDef = {
  id: 'scene_jj_spy_19_spear_hall_gift',
  title: '第十九幕 · 忠武赠言授军阵',
  subtitle: '卷二 · 常山支线：常山演武堂 · 白蜡银枪演武青石庭',
  mandatory: true,
  beats: [
    S('NPC-0185', '（常山枪派掌门赵括苍抚着枪架上的白蜡长枪，神色凝重而慷慨）“我常山一脉世代扎根真定助军抗辽，最恨这等吃着大宋皇粮却替契丹人递刀子的败类！韩崇矩既已押车往东南大名府而去，定是要借黄河渡口私船出逃。”'),
    S('NPC-0036', '（郭逵取出一匣边军秘制行军金创良药交入你手中，殷殷叮嘱）“北京大名府留守行宫的驻防都监【王信】，曾随明镐相公平定贝州王则兵变，是个铁骨铮铮的河北猛将，绝非韩崇矩之流！大人到了大名府只管持鎏金虎符去沙盘阁找他；此外大名渡口亦有北侠欧阳春、丐帮陈长老等义士出没，皆可借力！”'),
    P('（郑重收好边军药匣拱手致谢）“多谢郭都监、赵掌门指点迷津！韩崇矩这条运粮暗线既已坐实，离揪出全部内鬼便不远了！”'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MED-111', qty: 2 },
    { type: 'setFlag', flag: 'jj_spy_zd_spear_done', value: true },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0185' }, delta: 15 },
    {
      type: 'branch',
      condition: {
        type: 'all',
        conditions: [
          flag('jj_spy_zd_market_done', 'truthy'),
          flag('jj_spy_zd_longxing_done', 'truthy'),
        ],
      },
      thenEffects: [openScene('scene_jj_spy_23_zhending_converge', 'QST-SECT-33-HEBEI-SPY')],
      elseEffects: [
        toast('已查明【常山演武堂】押纲内鬼韩崇矩南下大名府线索！请继续查访真定府其余未查地标（宋辽榷场 / 隆兴大佛寺）。', 'success', '常山核辙'),
      ],
    },
  ],
}

const SCENE_18_WHEEL_RUT_INSPECTION: StorySceneDef = {
  id: 'scene_jj_spy_18_wheel_rut_inspection',
  title: '第十八幕 · 边关粮道验车辙',
  subtitle: '卷二 · 常山支线：常山龙胆枪脉宗祠正堂',
  mandatory: true,
  beats: [
    S('NPC-0036', '（从军案抽出一卷盖有三衙群牧与度支副印的通关勘合底簿，指着三日前一条记录皱眉道）“四厢大人请细看！三日前，原殿前司调任河北的押纲副指挥使【韩崇矩】持京营公文路过真定，声称押送十二大车戍边冬衣棉袄南赴北京大名府换防。”'),
    S('NPC-0185', '（赵括苍冷哼一声，指尖轻点案角青砖拓片）“巧就巧在，那日我门下弟子在南门青石官道见过他的车队！十二辆大车看似装着蓬松棉衣，车轮铁箍却将坚硬太行青石压出半寸深的新鲜凹痕，随车脚夫个个太阳穴高鼓、步履沉凝——哪是什么押送冬衣，分明藏着重甲兵械与北院密匣！”'),
    P('（恍然击节，目光大亮）“妙极！辽人故意在真定宋辽榷场放出零散马匹信使吸引视线，而真正的《京营泄密总簿》却由三衙内鬼韩崇矩打着大宋官军冬衣车队的旗号，大摇大摆南下大名府渡口交接！好一招明修栈道、暗度陈仓！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_19_spear_hall_gift', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_17_CHANGSHAN_GUO_KUI: StorySceneDef = {
  id: 'scene_jj_spy_17_changshan_guo_kui',
  title: '第十七幕 · 常山祠堂拜宿将',
  subtitle: '卷二 · 常山支线：真定府 · 常山演武堂',
  mandatory: true,
  beats: [
    N('步入真定城西松柏苍翠的【常山演武堂 · 龙胆枪脉宗祠正堂】，堂上“燕赵忠魂”金字匾额凛然生威。曾追随范仲淹戍守西北、如今调防河北真定的大宋禁军边军都监郭逵，正与常山枪派掌门赵括苍对坐品茗议防。'),
    S('NPC-0036', '（验过你手中的殿前司鎏金密查虎符，郭逵肃然起立抱拳，眼中满是对护驾功臣的敬重）“原来是汴河虹桥孤身挡双狼的新任四厢大人当面！范老相公离京赴杭州前曾来信提过，说三衙新得了一位出自六扇门、不染官场暮气的奇才，今日一见果然名不虚传！”'),
    P('“郭都监谬赞！此次奉王帅与圣上密旨北查御前泄密源头，已知京营马政司有人借真定榷场向北院传信。不知近半月真定军镇往来车马之中，可有反常调动？”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_18_wheel_rut_inspection', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_16_IRON_FISH_TALLY: StorySceneDef = {
  id: 'scene_jj_spy_16_iron_fish_tally',
  title: '第十六幕 · 玄铁半符露峥嵘',
  subtitle: '卷二 · 榷场支线：塞北契丹良驹互市马栏',
  mandatory: true,
  illustrationUrl: CG_2_URL,
  illustrationCaption: '真定榷场雪夜凯旋 · 斩破北院急递双煞，搜获半枚【幽燕玄铁半鱼符】',
  beats: [
    N('风雪渐歇，受惊奔突的塞北马群被赶来的常山枪派首座凌寒与厢军虞候仝豪辰率众稳稳收拢。北院急递掌符使韩延寿与述律铁爪双双倒在染血积雪之中，你俯身自韩延寿贴身革囊内搜出一枚冰冷沉重、形如半尾苍鱼的乌黑铁符——【幽燕玄铁半鱼符】！'),
    S('NPC-0345', '（凌寒持火把凑近细看鱼符断口内侧的八字阴刻篆文，神色一震）“‘铁牛吞锁，朔夜渡河’！真定并无大河铁牛，整个河北两路唯有陪都【北京大名府 · 黄河铁索渡口】铸有唐宋镇河大铁牛与横江铁索！”'),
    S('NPC-0638', '（仝豪辰擦去额头冷汗，心有余悸地抱拳）“多亏四厢大人神威！若叫这两名契丹急递使带着半枚鱼符北逃，咱们在榷场查上十个月也摸不到大名府渡口这条真尾巴！”'),
    P('（将半枚玄铁鱼符妥善收入怀中）“这两人只是负责销毁真定支线底账的急递使，真正携有京营全本名录的主队定然另有伪装。把现场封锁干净，莫走漏半点风声！”'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MSC-034', qty: 1 },
    { type: 'setFlag', flag: 'jj_spy_zd_market_done', value: true },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0345' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0638' }, delta: 15 },
    {
      type: 'branch',
      condition: {
        type: 'all',
        conditions: [
          flag('jj_spy_zd_spear_done', 'truthy'),
          flag('jj_spy_zd_longxing_done', 'truthy'),
        ],
      },
      thenEffects: [openScene('scene_jj_spy_23_zhending_converge', 'QST-SECT-33-HEBEI-SPY')],
      elseEffects: [
        toast('已夺获【幽燕玄铁半鱼符】！请继续查访真定府其余未查地标（常山演武堂 / 隆兴大佛寺）。', 'success', '榷场夺符'),
      ],
    },
  ],
}

const SCENE_15_HORSE_MARKET_NIGHT_BATTLE: StorySceneDef = {
  id: 'scene_jj_spy_15_horse_market_night_battle',
  title: '第十五幕 · 榷场惊马破双谍',
  subtitle: '卷二 · 榷场支线：宋辽边境榷场 · 塞北契丹良驹互市马栏',
  mandatory: true,
  illustrationUrl: CG_2_URL,
  illustrationCaption: '真定宋辽榷场寒夜雪战 · 惊马碎灯间截杀北院急递双煞夺取玄铁鱼符',
  beats: [
    N('“砰！”胡商毡帐帘幕骤然被一柄燕云修罗斩马刀劈裂！北院急递掌符使韩延寿耳力极尖，察觉帐外雪地呼吸异样，一脚踢翻炭火铜盆引燃草料棚，同时吹响尖锐骨哨惊动栏中数十匹塞北烈马，企图趁群马狂奔踩踏之乱突围北逃！'),
    P('（飞身避开两匹受惊尥蹶的乌桓快马，凌空踏过木栏横刃拦在北门雪道正中）“凌首座、仝虞候速去弹压马群免伤边民——这两个北院信使，一个也走不了！”'),
  ],
  choices: [
    {
      id: 'choice_jj_fight_zhending_couriers',
      label: '迎着漫天风雪与惊马火光，独力截杀辽国北院急递双煞！',
      subLabel: '1v2 榷场夜战（一流下品急递掌符使韩延寿 + 乌桓悍骑述律铁爪，战败可重整）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildZhendingCourierChiefNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildZhendingCourierDeputyNpc() }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '一旦放跑北院掌符使，河北暗桩必彻底隐入地下！',
          introText:
            '宋辽榷场风雪怒号、火映马栏！北院急递掌符使【韩延寿】挥修罗刀、乌桓悍骑【述律铁爪】舞重装狼牙棒疯狂突围，速速擒杀！',
          onWin: [
            { type: 'giveCombatExp', amount: 100, reason: '真定榷场雪夜击败辽国北院急递双煞' },
            openScene('scene_jj_spy_16_iron_fish_tally', 'QST-SECT-33-HEBEI-SPY'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 0.6, mpPct: 0.6 },
            warn('风雪迷眼、惊马乱阵！凌寒一枪挑落木栅替你拦住去路，请调息片刻后再度上前截拿！', '雪夜重整'),
          ],
        },
      ],
    },
  ],
}

const SCENE_14_MIDNIGHT_FELT_TENT: StorySceneDef = {
  id: 'scene_jj_spy_14_midnight_felt_tent',
  title: '第十四幕 · 夜伏毡帐听密语',
  subtitle: '卷二 · 榷场支线：胡商皮货毡帐外围',
  mandatory: true,
  beats: [
    N('是夜亥时，塞外刮起鹅毛碎雪。你与凌寒、仝豪辰悄然潜伏至马栏最北端那座挂着狼头皮幌的胡商大毡帐后，只见帐内牛油烛火摇晃，两名身着契丹窄袖皮袍的精悍汉子正将一叠盖有宋军马印的麻纸投入火盆焚烧。'),
    S({ name: '韩延寿', title: '辽国暗桩 · 北院急递掌符使', factionName: '辽国暗桩' }, '（压低声音冷喝）“动作快些！汴河巡检司那边耶律乌骨失手，宋廷已派了一名新晋四厢都指挥持虎符北查！把真定榷场这三年的马齿底单全烧成灰，咱们带上半枚玄铁鱼符天亮前过白沟河！”'),
    S({ name: '述律铁爪', title: '辽国暗桩 · 乌桓驯马悍骑', factionName: '辽国暗桩' }, '“掌符大人放心！京营那份真正的全本名录与西夏蜡书，早已装进乌铜防水匣随冬衣粮车往东南去了，就算神仙来了也想不到咱们不往北走，反倒借他们宋军自己的官船南渡黄河！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_15_horse_market_night_battle', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_13_IDENTIFY_KHITAN_STEEDS: StorySceneDef = {
  id: 'scene_jj_spy_13_identify_khitan_steeds',
  title: '第十三幕 · 互市马栏识契丹',
  subtitle: '卷二 · 榷场支线：塞北契丹良驹互市马栏',
  mandatory: true,
  beats: [
    N('三人扮作寻常买马武人步入寒风呼啸的【塞北契丹良驹互市马栏】。西北角偏僻木栏内果然拴着十二匹毛色灰败、鬃毛参差不齐的“病汰瘦马”，几名眼露凶光的胡商伙计正借着整理草料暗暗戒备四周。'),
    S('NPC-0345', '（凌寒借着拍打栏木掩护，低声向你传音）“四厢大人请看那几匹瘦马的蹄腕与鼻翼，似乎大有古怪……”'),
  ],
  choices: [
    {
      id: 'choice_jj_market_riding_check',
      label: '【精研相马 · 一眼识破乌桓千里驹】观其碗口铁蹄、竹批双耳与皂汁染毛伪装（骑术 ≥ 70）',
      subLabel: '检定通过：【骑术】+2，当场锁定急递信使今夜换乘潜逃之主力快骑',
      tone: 'gold',
      condition: { type: 'skillAtLeast', key: '骑术', min: 70 },
      effects: [
        { type: 'modifySkill', key: '骑术', delta: 2 },
        { type: 'giveCombatExp', amount: 50, reason: '真定榷场相马识破契丹乌桓快骑伪装' },
        openScene('scene_jj_spy_14_midnight_felt_tent', 'QST-SECT-33-HEBEI-SPY'),
      ],
    },
    {
      id: 'choice_jj_market_linghan_assist',
      label: '【请凌寒协验 · 查验马掌冰槽】请熟稔塞北战马习性的常山枪派首座凌寒细辨蹄铁暗记',
      subLabel: '零门槛稳妥推进 · 确认双槽燕尾铁掌与汴京刺客坐骑同出一源',
      tone: 'primary',
      effects: [openScene('scene_jj_spy_14_midnight_felt_tent', 'QST-SECT-33-HEBEI-SPY')],
    },
  ],
}

const SCENE_12_MARKET_OFFICE_AUDIT: StorySceneDef = {
  id: 'scene_jj_spy_12_market_office_audit',
  title: '第十二幕 · 平准官署核马籍',
  subtitle: '卷二 · 榷场支线：宋辽边境榷场 · 榷场平准司衡算官署',
  mandatory: true,
  beats: [
    N('真定城北【宋辽边境榷场】商旅云集，契丹驼队、幽燕皮货与江南茶绢在此昼夜互市。你步入平准司衡算官署内堂，驻场厢军虞候仝豪辰与协防榷场的常山枪派演武首座凌寒验过殿前司虎符，立即搬出近三月的官马互市齿口底档。'),
    S('NPC-0638', '（仝豪辰指着账册上几处朱笔勾销的条目，满脸疑惑）“回四厢大人！卑职只管外围弹压，往日群牧司周副使派人来挑马，每次都在月初与十五报销十二匹‘水土不服、疥癣不堪入卫’的病汰马，低价转卖给北头一家姓韩的辽东皮货胡商。”'),
    P('（手指划过日期，冷笑一声）“每逢朔望恰好是京营宿卫半月轮值表签发之日！周承业把密信封入空心马嚼铁，借‘淘汰病马’名义光明正大交回胡商手里！今日恰逢十四，那家胡商马栏里定有猫腻，带我去互市马栏一探究竟！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_13_identify_khitan_steeds', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_11_ZHENDING_SNOW_TAVERN: StorySceneDef = {
  id: 'scene_jj_spy_11_zhending_snow_tavern',
  title: '第十一幕 · 燕赵悲歌风雪骤',
  subtitle: '卷二 · 恒阳迷雾：真定府 · 燕赵悲歌大酒楼',
  mandatory: true,
  beats: [
    N('渡黄河、越磁相，越往北行朔风越显凛冽。踏入河北西路军事重镇【真定府（常山）】，城头铁衣戍卒持戟巡行，街市酒旗在塞外寒风中猎猎作响。你依约先入城东【燕赵悲歌大酒楼】雅间，早有两名便装好手候在窗前——正是皇城司驻冀密侦校尉雷巽虎，与殿前司外派真定的禁军女教头仝云韵！'),
    S('NPC-0324', '（雷巽虎压低斗笠抱拳行礼，干练精悍）“韦总供奉的八百里飞鸽昨日已到真定！四厢大人，卑职与仝教头暗查两日，发现辽国北院在真定经营的暗桩极为狡猾，眼下共有三处要害地标急需大人持虎符亲往勘破——”'),
    S('NPC-0290', '（仝云韵蘸着茶水在桌面上利落画出三处方位）“其一，城北【宋辽边境榷场】，群牧司病汰官马皆在平准官署交割；其二，城西【常山演武堂】，边军都监郭逵将军与赵括苍掌门日前截下一份可疑的京营南下粮草车辙拓印；其三，城内【隆兴大佛寺】，五台山清凉寺护关武僧李正鹤大师似乎在白沟河畔撞见了辽国北院大人物的踪迹！”'),
    P('（目光扫过桌面三点水痕，胸有成竹）“好！三路并查，不分先后——待我将榷场、常山演武堂与隆兴大佛寺三处暗线逐一摸清，看这群北院狐鼠还往何处藏身！”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'zhending_investigate'),
    toast('已开启真定府三线自由侦查！请前往【宋辽边境榷场】、【常山演武堂】与【隆兴大佛寺】查明三处暗桩线索（顺序不限）。', 'success', '恒阳布局'),
  ],
}

const SCENE_10_DEPART_CHENQIAO_GATE: StorySceneDef = {
  id: 'scene_jj_spy_10_depart_chenqiao_gate',
  title: '第十幕 · 临行密奏出陈桥',
  subtitle: '卷一 · 结章：开封府北 · 陈桥驿门外',
  mandatory: true,
  beats: [
    N('汴河巡检司血案连夜密报殿前司与开封府。翌日五更，北门陈桥驿外晨雾苍茫，同平章事王德用与“御猫”展昭亲自送至官道十里长亭。你一身轻便劲装外罩玄色行军披风，怀揣【殿前司鎏金密查虎符】，御赐骏马在霜风中昂首刨蹄。'),
    S('NPC-0038', '（沉声嘱托，拍了拍你的铁护腕）“周承业虽死，却咬出了真定榷场这条老根！老夫已对外放风，称你奉殿前司差遣北上河北西路巡检冬季马政，以免打草惊蛇吓跑三衙里藏得更深的大鱼。真定那边，皇城司雷巽虎与禁军女教头仝云韵会在【燕赵悲歌大酒楼】接应你！”'),
    S('NPC-0140', '（展昭递过一封盖有六扇门密印的飞鸽竹筒，温言正色）“辽国枢密北院行事比西夏一品堂更为诡谲狠辣，你孤身入冀，明枪易躲、暗箭难防。京城这边我与公孙先生会暗中盯死群牧司一干官员，绝不叫人毁去底档——保重！”'),
    P('（抱拳一礼，翻身跃上马背，回望了一眼晨曦中金碧辉煌的东京城阙）“王帅、展兄放心！不把这群吃里扒外的北院暗桩连根拔起，我誓不回京复命——驾！”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'zhending_tavern_meet'),
    toast('卷一《汴梁余烬》完成！请策马北上河北重镇【真定府 · 燕赵悲歌大酒楼】与密侦校尉雷巽虎、禁军教头仝云韵会合！', 'success', '北巡启程'),
  ],
}

const SCENE_09_DYING_CONFESSION_HEBEI: StorySceneDef = {
  id: 'scene_jj_spy_09_dying_confession_hebei',
  title: '第九幕 · 垂死吐实指恒阳',
  subtitle: '卷一 · 开封府：汴河漕运巡检司 · 临水栈桥',
  mandatory: true,
  beats: [
    N('两名辽国黑水灭口杀手毙命栈桥之上，你疾步抢到船头，只见群牧司采买副使周承业胸口已中了一记阴毒无比的《黑水寒风掌》，寒毒攻心，面泛乌青，死死抓住你的战袍下摆大口喘息。'),
    S({ name: '周承业', title: '群牧司采买副使 · 垂死涉案官', factionName: '京营群牧司' }, '“救……救命！下官糊涂啊！下官以为只是替北边胡商倒腾几批病汰官马吃些差价……哪晓得上月十五，三衙里那位‘大人物’逼下官把宣德门西角门备用御马的调拨签条，封进空心马嚼铁送往【真定府 · 宋辽边境榷场】……”'),
    P('（渡入一缕真气护住他最后一息心脉，厉声追问）“三衙里逼你传信的大人物究竟是谁？全本账册如今在何处！”'),
    S({ name: '周承业', title: '群牧司采买副使 · 垂死涉案官', factionName: '京营群牧司' }, '“下官每次只见……只见黑纱遮面的信使，只知咱们京营所有收过北珠马利的官员真名底册，都存在真定北院掌符使手中……韩……小心押冬衣的韩……”'),
    N('话音未落，寒毒彻骨，周承业头颅一偏气绝身亡。栈桥下汴河夜水呜咽东流，那句未曾说完的“押冬衣的韩”与“真定宋辽榷场”，已将那张笼罩东京皇城的无形黑网撕开了一道血淋淋的裂口！'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_10_depart_chenqiao_gate', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_08_CANAL_PIER_SILENCERS: StorySceneDef = {
  id: 'scene_jj_spy_08_canal_pier_silencers',
  title: '第八幕 · 漕司栈桥截灭口',
  subtitle: '卷一 · 开封府：汴河漕运巡检司 · 夜雾码头',
  mandatory: true,
  beats: [
    N('刚冲入汴河漕运巡检司后方停泊官船的木栈桥，江面夜雾中骤然传出一声凄厉惨叫！只见一艘即将解缆南下的江淮漕船甲板上，两名身着皂衣、掌缠乌黑寒气的契丹男女杀手已连杀两名护卫家丁，一掌重重印在群牧司副使周承业胸膛之上，正欲系上铁砣将其沉入汴河！'),
    P('（足踏缆桩飞身跃上甲板，拔刃横截寒风毒掌）“天子脚下、汴河官渡，尔等辽国北院鼠辈安敢杀人灭口！留下活口！”'),
  ],
  choices: [
    {
      id: 'choice_jj_fight_bianhe_silencers',
      label: '刀剑出鞘，于漕船甲板力战辽国暗桩黑水灭口双煞！',
      subLabel: '首轮遭遇战（1v2 迎战二流上品耶律乌骨 + 萧寒翎，战败可重整）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildBianheSilencerOneNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildBianheSilencerTwoNpc() }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '船头证人周承业命悬一线，绝不可退后半步！',
          introText:
            '汴河夜雾杀机四伏！辽国暗桩灭口双煞【耶律乌骨】与【萧寒翎】施展《黑水寒风掌》与《修罗刀》合击而来，速速破敌救下证人！',
          onWin: [
            { type: 'giveCombatExp', amount: 85, reason: '汴河漕运巡检司击毙辽国暗桩灭口双煞' },
            openScene('scene_jj_spy_09_dying_confession_hebei', 'QST-SECT-33-HEBEI-SPY'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 0.65, mpPct: 0.65 },
            warn('甲板湿滑、黑水掌毒阴寒逼人！巡检司弓手鸣镝惊退二贼半步，请调息后立即再战救人！', '栈桥受阻'),
          ],
        },
      ],
    },
  ],
}

const SCENE_07_LOCK_HORSE_OFFICIAL: StorySceneDef = {
  id: 'scene_jj_spy_07_lock_horse_official',
  title: '第七幕 · 汴河巡检锁马官',
  subtitle: '卷一 · 开封府：汴河漕运巡检司门外',
  mandatory: true,
  beats: [
    N('暗码既破，矛头直指掌管京畿战马采买交割的群牧司副使周承业！你与展昭兵分两路：展昭率六扇门捕快去封锁周承业城西宅邸，你则孤身疾驰城南【汴河漕运巡检司】截断南下水路。'),
    S({ name: '漕司值夜巡卒', title: '汴河漕运巡检司军汉', factionName: '开封府厢军' }, '（见你亮出殿前司四厢腰牌，慌忙指着后方浓雾笼罩的官渡栈桥禀报）“回大人！半柱香前群牧司的周副使神色慌张带着两口皮箱上了三号纲船，说是奉差连夜去扬州公干；可紧接着又有两个浑身冒冷气的黑衣人翻过巡检司矮墙摸上船去了！”'),
    P('（心头猛地一凛）“不好，北院暗桩反应好快，是要杀人沉河灭口！随我封住河闸！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_08_canal_pier_silencers', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_06_CANDLELIGHT_CIPHER_CRACK: StorySceneDef = {
  id: 'scene_jj_spy_06_candlelight_cipher_crack',
  title: '第六幕 · 红烛算筹破密押',
  subtitle: '卷一 · 开封府衙：刑名架阁卷宗楼（十艺破译分支）',
  mandatory: true,
  illustrationUrl: CG_1_URL,
  illustrationCaption: '开封府架阁库红烛夜验 · 围案勘破双槽燕尾北马蹄铁与千字文勾股残账',
  beats: [
    N('刑名架阁卷宗楼内红烛高烧，百排楠木卷宗架投下幽深长影。紫檀长案正中，并排摆放着那枚边缘带双道燕尾防滑冰槽的精铁马掌，以及从虹桥刺客贴身铜管里取出的半截焦黑麻纸残账——上面密密麻麻写着“辰字柒伍、宿字壹贰、折银叁佰肆拾”等似是而非的算学记号。'),
    S('NPC-0030', '（公孙策手持放大水晶镜细看残纸边缘，捻须沉吟）“奇哉！西夏党项人通行番书，断不会用我中原官仓的《千字文》字号记账；且每一组字号后面都跟着一组盈不足勾股余数，分明是一套以官马采买银两掩人耳目的移位密押！”'),
    S('NPC-0140', '（展昭转头望向你，目露期许）“这半截密押若能今夜当场推算出真名与交割地，我们便能抢在暗桩毁证前锁住京城出口！”'),
  ],
  choices: [
    {
      id: 'choice_jj_cipher_math_calligraphy',
      label: '【执筹亲算 · 勾股还原千字文马籍】取象牙算筹推演余数移位，并辨认馆阁体笔锋出处（算术 ≥ 65 或 书 ≥ 65）',
      subLabel: '检定通过：【算术】+2、声望 +15，当场锁定群牧司副使周承业与真定榷场病马暗账',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需【算术 ≥ 65】或【书 ≥ 65】',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 65 },
          { type: 'skillAtLeast', key: '书', min: 65 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'modifyRenown', delta: 15, reason: '于开封府架阁库亲手破译契丹北院千字文勾股密押' },
        { type: 'setFlag', flag: 'jj_spy_deciphered_self', value: true },
        toast('算筹落定！“辰宿列张”对应群牧司第三槽北马字号，笔迹直指采买副使周承业，速赴【汴河漕运巡检司】截人！', 'success', '智破密押'),
        setStep(QUEST_ID, 'kaifeng_canal_ambush'),
      ],
    },
    {
      id: 'choice_jj_cipher_gongsun_assist',
      label: '【协查底档 · 请公孙策合校度支马簿】搬出近三年京营群牧司采买黄册与公孙先生逐行比对',
      subLabel: '零门槛稳妥推进 · 耗时半个时辰合校，同样查出群牧司副使周承业涉案潜逃',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 1 },
        toast('经公孙策合校黄册，确认密押出自群牧司采买副使周承业之手！刚获线报其正逃往【汴河漕运巡检司】，速往截拿！', 'success', '合校破案'),
        setStep(QUEST_ID, 'kaifeng_canal_ambush'),
      ],
    },
  ],
}

const SCENE_05_HORSESHOE_CLUE: StorySceneDef = {
  id: 'scene_jj_spy_05_horseshoe_clue',
  title: '第五幕 · 断刃残蹄辨北铁',
  subtitle: '卷一 · 开封府衙：刑名架阁卷宗楼',
  mandatory: true,
  beats: [
    S('NPC-0140', '（推开架阁库樟木证物匣，取出一只沾满干涸黑泥的马蹄铁与半截烧焦的麻纸卷）“这是那夜雨战过后，六扇门弟兄在汴河虹桥南岸柳林里搜出的西夏银狼双统领弃骑蹄铁。起初大家都以为西夏人骑的自然是西北河曲马或党项草地马，直到今日清晨老马夫洗净泥沙，才骇然发现不对！”'),
    P('（拈起那枚沉甸甸的熟铁马掌，指腹摩挲过掌面两道深窄如燕尾的防滑凹槽，瞳孔骤缩）“双槽燕尾冰掌！西北黄沙戈壁从不钉这种蹄铁——唯有幽燕辽东苦寒冰河之地，契丹北院驿骑冬季踏冰渡白沟河、拒马河时，才会专门锻打这种双槽防滑铁掌！”'),
    S('NPC-0013', '（包拯自内堂踱步而出，黑面沉肃如水）“不错！西夏一品堂死士远自兴庆府潜入东京，根本不可能随身携马过潼关；他们在汴京城外换乘的接应快马，乃至官家微服出宣德门西角门的精准时辰，全是潜伏在河北与京营的【辽国暗桩】替他们备好的！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_06_candlelight_cipher_crack', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_04_KAIFENGFU_REUNION: StorySceneDef = {
  id: 'scene_jj_spy_04_kaifengfu_reunion',
  title: '第四幕 · 重返开封会故人',
  subtitle: '卷一 · 开封府衙：六扇门与刑名架阁卷宗楼',
  mandatory: true,
  beats: [
    N('自皇城角楼辞别韦青衣，你策马转入南薰门大街，停在熟悉无比的【开封府衙】门前。守门衙役见昔日的御前护卫如今身披殿前司四厢都指挥紫红战袍归来，无不欢喜敬礼。步入刑名架阁卷宗楼下，展昭与主簿公孙策早已迎下木梯。'),
    S('NPC-0140', '（含笑上下打量你一番，拱手打趣）“几日不见，该改口称呼四厢都指挥大人了！不过在咱们开封府架阁库里，可没那么多三衙官套子——韦总供奉已让人传话过来，说你在查宣德门备用御马签单？”'),
    P('（笑着回礼，神情旋即转为凝重）“在包大人、公孙先生和展兄面前，我永远是开封府走出来的捕快。实不相瞒，官家微服那夜的路线极可能从京营群牧司采买线走漏，听说那夜虹桥西夏双狼留下的证物还在架阁库封存，特来合查！”'),
  ],
  onFinishEffects: [openScene('scene_jj_spy_05_horseshoe_clue', 'QST-SECT-33-HEBEI-SPY')],
}

const SCENE_03_PALACE_WATCH_WEIQINGYI: StorySceneDef = {
  id: 'scene_jj_spy_03_palace_watch_weiqingyi',
  title: '第三幕 · 宿卫角楼询夜更',
  subtitle: '卷一 · 大内皇宫：皇城宿卫角楼',
  mandatory: true,
  beats: [
    N('登临高耸冷峻的【皇城宿卫角楼】，八百里东京坊市鳞次栉比尽收眼底。皇城司大内总供奉韦青衣一袭青衣负手立于飞檐暗影之中，面前石案上摊着暮春微服当夜宫禁十二门的铜鱼符启闭底簿。'),
    S('NPC-0132', '（冷清目光扫过你腰间新佩的鎏金密查虎符，微微颔首）“王老相公果然把这桩烫手山芋交给了你。那夜之后，我把紫宸殿当值内侍、御药院医官连同东华门禁卫筛了三遍，无一人私出宫禁；唯独酉时初刻，殿前司下辖【群牧马政司】曾按惯例向宣德门西角门调拨过四匹不挂銮铃的青骢便装御马。”'),
    P('（眉峰微蹙，敏锐捕捉到关窍）“不挂銮铃的便装御马，唯有圣上微服私行时才会调用！也就是说，内鬼无须身在紫宸殿，只要盯死群牧司哪一日往宣德门西角门送便装草料签单，便能倒推出圣上当夜必出宫门！”'),
    S('NPC-0132', '（眼中闪过一抹赞许）“不愧是六扇门磨出来的眼睛，一点就透。更蹊跷的是，开封府展昭昨日在清理虹桥西夏刺客坐骑遗物时，发现了不该出现在党项人身上的东西。你且回老东家【开封府衙 · 刑名架阁卷宗楼】走一趟，两相对照，狐狸尾巴自会露出来。”'),
  ],
  onFinishEffects: [
    setStep(QUEST_ID, 'kaifeng_archive_cipher'),
    toast('已锁定泄密缺口在【群牧马政司】！请前往【开封府衙 · 刑名架阁卷宗楼】与展昭、公孙策查验虹桥刺客遗物！', 'talk', '角楼寻隙'),
  ],
}

const SCENE_02_SPEAR_FIELD_PRIDE: StorySceneDef = {
  id: 'scene_jj_spy_02_spear_field_pride',
  title: '第二幕 · 长枪演武试新帅',
  subtitle: '卷一 · 八十万禁军大教场：禁军长枪方阵演武坪',
  mandatory: true,
  beats: [
    N('携虎符走下点兵帅台，途经杀声震天的【禁军长枪方阵演武坪】，八十万禁军总教头林铁衣与步军都虞候高怀亮正督导三百名长枪手演练破骑方阵。见你新袍加身持符而过，几名资历深厚的老都头互相递了个眼色，隐有审视之意。'),
    S('NPC-0043', '（高怀亮上前一步拱手笑道，话里却带着三分考较）“恭贺新任四厢大人！只是咱们三衙行伍有个不成文的糙规矩——兵熊熊一个，将熊熊一窝。大人既领了王帅密令要查京营马政，不知在动身去皇城角楼之前，可愿在演武坪露一手压压阵脚？”'),
    S('NPC-0154', '（林铁衣手按丈二大枪朗声道）“高都虞候说得是！不拘是与林某点到为止走上几合枪棒，还是以军略骑射训诫几句，只要让弟兄们见识见识虹桥救驾的真风采，今后四厢大人一句话，刀山火海大伙儿绝不含糊！”'),
  ],
  choices: [
    {
      id: 'choice_jj_spar_lin_tieyi',
      label: '【演武立威 · 十合论武林总教头】欣然拔刃，与八十万禁军总教头林铁衣点到为止切磋十合！',
      subLabel: '同僚切磋（一流上品林铁衣，撑满 10 回合或取胜皆获满堂彩，败亦不伤和气继续推进）',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0154',
            talkOverride: '“四厢大人请看枪！林某这路八十万禁军六合大枪绝不藏私！”',
          },
          rule: 'survive_rounds',
          maxRounds: 10,
          lethalOnLose: false,
          introText:
            '八十万禁军演武坪万众瞩目！总教头【林铁衣】（一流上品）抖开枪花点到为止考较斤两，撑满 10 回合或正面胜出即可折服全军！',
          onWin: [
            { type: 'giveCombatExp', amount: 90, reason: '大教场演武十合折服八十万禁军总教头林铁衣' },
            { type: 'modifyRenown', delta: 20, reason: '禁军大教场立威震服三衙骄兵' },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0154' }, delta: 20 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0043' }, delta: 15 },
            toast('满场禁军彩声雷动！林铁衣与高怀亮心悦诚服！请前往【大内皇宫 · 皇城宿卫角楼】找韦青衣核查夜更！', 'success', '教场立威'),
            setStep(QUEST_ID, 'kaifeng_palace_watch'),
          ],
          onLose: [
            { type: 'healPlayer', hpPct: 1, mpPct: 1 },
            { type: 'giveCombatExp', amount: 40, reason: '与总教头林铁衣切磋印证军阵枪理' },
            toast('林铁衣收枪抱拳赞你胆魄过人、招路刚正！军心既定，请前往【大内皇宫 · 皇城宿卫角楼】会见韦青衣！', 'talk', '以武会友'),
            setStep(QUEST_ID, 'kaifeng_palace_watch'),
          ],
        },
      ],
    },
    {
      id: 'choice_jj_command_authority',
      label: '【军令如山 · 申明密旨先行公务】正色出示鎏金密查虎符，约定凯旋回京再与林总教头痛饮论枪',
      subLabel: '零战斗稳重推进 · 高怀亮与林铁衣肃然凛遵将令让开驰道',
      tone: 'primary',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0154' }, delta: 8 },
        setStep(QUEST_ID, 'kaifeng_palace_watch'),
        toast('军令森严，全营肃立送行！请即刻前往【大内皇宫 · 皇城宿卫角楼】向皇城司总供奉韦青衣核查当夜宿卫记录！', 'talk', '持符出营'),
      ],
    },
  ],
}

const SCENE_01_JINJUN_SECRET_EDICT: StorySceneDef = {
  id: 'scene_jj_spy_01_jinjun_secret_edict',
  title: '第一幕 · 聚将台前霜鼓沉',
  subtitle: '卷一 · 汴梁余烬：八十万禁军大教场 · 擂鼓聚将点兵帅台',
  mandatory: true,
  beats: [
    N('皇祐二年深秋，东京汴梁外城【八十万禁军大教场】旌旗蔽日，牛皮巨鼓低沉肃杀。自暮春之夜你在相国寺、樊楼与汴河虹桥连破西夏一品堂三轮截杀、奉宋仁宗特旨改授【大宋禁军 · 四厢都指挥】以来，京畿巡防表面风平浪静，然殿前司大帅帐内却始终笼罩着一层挥之不去的寒霜。'),
    S('NPC-0038', '（同中书门下平章事、殿前都指挥使“黑王相公”王德用屏退帐外亲兵，指着案头一封紫宸殿火漆密札，苍劲声音低沉如铁）“你入我禁军已有数月，可知老夫与官家这几月夜不能寐所忧何事？”'),
    P('（上前一步沉声抱拳）“王帅所忧者，莫非正是暮春微服那夜——圣上临时起意出宣德门西角门，连宰执百官皆不知情，远在兴庆府的西夏一品堂银狼双统领，凭何能提前在相国寺宝塔、樊楼与虹桥布下严丝合缝的三环死局？”'),
    S('NPC-0038', '（目光如电，重重颔首）“一语中的！家贼难防啊！三衙禁军统兵八十万，自开国勋旧至河北边将盘根错节，老夫若派旧部彻查，不是打草惊蛇便是官官相护。唯独你出身开封府六扇门，无门户私党之累，又有救驾铁血之功！”'),
    S('NPC-0038', '（双手捧出一枚内镌“殿前特简·便宜行事”的鎏金蟠螭半符，郑重拍入你掌中）“奉官家密诏，老夫今授你【殿前司鎏金密查虎符】！先去【皇城宿卫角楼】找韦青衣复核当夜宫门记录，无论这条黑线连着西夏还是北辽、牵涉哪路勋贵宿将，给老夫一查到底！”'),
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: QUEST_ID,
      stepId: 'kaifeng_palace_watch',
      silent: true,
    },
    { type: 'giveItem', itemId: 'ITM-MSC-033', qty: 1 },
    openScene('scene_jj_spy_02_spear_field_pride', 'QST-SECT-33-HEBEI-SPY'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_44_EPILOGUE_NORTH_WIND.id]: SCENE_44_EPILOGUE_NORTH_WIND,
  [SCENE_43B_SHADOW_SEAL_REWARD.id]: SCENE_43B_SHADOW_SEAL_REWARD,
  [SCENE_42B_COUNTER_ESPIONAGE_MEMORIAL.id]: SCENE_42B_COUNTER_ESPIONAGE_MEMORIAL,
  [SCENE_43A_IRON_ARMOR_REWARD.id]: SCENE_43A_IRON_ARMOR_REWARD,
  [SCENE_42A_RIGHTEOUS_IMPEACHMENT.id]: SCENE_42A_RIGHTEOUS_IMPEACHMENT,
  [SCENE_41_ZICHEN_VERDICT_CHOICE.id]: SCENE_41_ZICHEN_VERDICT_CHOICE,
  [SCENE_40_ZICHEN_PRESENT_PROOF.id]: SCENE_40_ZICHEN_PRESENT_PROOF,
  [SCENE_39_DAILOUYUAN_BAO_ZHENG.id]: SCENE_39_DAILOUYUAN_BAO_ZHENG,
  [SCENE_38_KAIFENG_WANG_DEYONG_DEBRIEF.id]: SCENE_38_KAIFENG_WANG_DEYONG_DEBRIEF,
  [SCENE_37_FAREWELL_HEBEI_DAWN.id]: SCENE_37_FAREWELL_HEBEI_DAWN,
  [SCENE_36_SEIZE_BLACK_COPPER_BOX.id]: SCENE_36_SEIZE_BLACK_COPPER_BOX,
  [SCENE_35_YELLOW_RIVER_BOSS_SHOWDOWN.id]: SCENE_35_YELLOW_RIVER_BOSS_SHOWDOWN,
  [SCENE_34_CALM_BREATH_BEFORE_STORM.id]: SCENE_34_CALM_BREATH_BEFORE_STORM,
  [SCENE_33_XIAO_YUANFENG_ARRIVES.id]: SCENE_33_XIAO_YUANFENG_ARRIVES,
  [SCENE_32_CHAIN_BRIDGE_VANGUARD_FIGHT.id]: SCENE_32_CHAIN_BRIDGE_VANGUARD_FIGHT,
  [SCENE_31_MIDNIGHT_FIRE_BOATS.id]: SCENE_31_MIDNIGHT_FIRE_BOATS,
  [SCENE_30B_JIANGHU_AMBUSH_READY.id]: SCENE_30B_JIANGHU_AMBUSH_READY,
  [SCENE_29B_WHARF_WINE_HEROES.id]: SCENE_29B_WHARF_WINE_HEROES,
  [SCENE_30A_IMPERIAL_CROSSBOW_READY.id]: SCENE_30A_IMPERIAL_CROSSBOW_READY,
  [SCENE_29A_GARRISON_TIGER_TALLY.id]: SCENE_29A_GARRISON_TIGER_TALLY,
  [SCENE_28_SANDTABLE_STRATEGY_CHOICE.id]: SCENE_28_SANDTABLE_STRATEGY_CHOICE,
  [SCENE_27_TRAITOR_CONFESSION.id]: SCENE_27_TRAITOR_CONFESSION,
  [SCENE_26_LEITAI_PURGE_TRAITOR.id]: SCENE_26_LEITAI_PURGE_TRAITOR,
  [SCENE_25_ARMORY_WINTER_COATS.id]: SCENE_25_ARMORY_WINTER_COATS,
  [SCENE_24_DAMING_TAVERN_ARRIVAL.id]: SCENE_24_DAMING_TAVERN_ARRIVAL,
  [SCENE_23_ZHENDING_CONVERGE.id]: SCENE_23_ZHENDING_CONVERGE,
  [SCENE_22_LONGXING_STELE_SPY.id]: SCENE_22_LONGXING_STELE_SPY,
  [SCENE_21_GUANYIN_PAVILION_SECRET.id]: SCENE_21_GUANYIN_PAVILION_SECRET,
  [SCENE_20_SUTRA_PAVILION_ZEN.id]: SCENE_20_SUTRA_PAVILION_ZEN,
  [SCENE_19_SPEAR_HALL_GIFT.id]: SCENE_19_SPEAR_HALL_GIFT,
  [SCENE_18_WHEEL_RUT_INSPECTION.id]: SCENE_18_WHEEL_RUT_INSPECTION,
  [SCENE_17_CHANGSHAN_GUO_KUI.id]: SCENE_17_CHANGSHAN_GUO_KUI,
  [SCENE_16_IRON_FISH_TALLY.id]: SCENE_16_IRON_FISH_TALLY,
  [SCENE_15_HORSE_MARKET_NIGHT_BATTLE.id]: SCENE_15_HORSE_MARKET_NIGHT_BATTLE,
  [SCENE_14_MIDNIGHT_FELT_TENT.id]: SCENE_14_MIDNIGHT_FELT_TENT,
  [SCENE_13_IDENTIFY_KHITAN_STEEDS.id]: SCENE_13_IDENTIFY_KHITAN_STEEDS,
  [SCENE_12_MARKET_OFFICE_AUDIT.id]: SCENE_12_MARKET_OFFICE_AUDIT,
  [SCENE_11_ZHENDING_SNOW_TAVERN.id]: SCENE_11_ZHENDING_SNOW_TAVERN,
  [SCENE_10_DEPART_CHENQIAO_GATE.id]: SCENE_10_DEPART_CHENQIAO_GATE,
  [SCENE_09_DYING_CONFESSION_HEBEI.id]: SCENE_09_DYING_CONFESSION_HEBEI,
  [SCENE_08_CANAL_PIER_SILENCERS.id]: SCENE_08_CANAL_PIER_SILENCERS,
  [SCENE_07_LOCK_HORSE_OFFICIAL.id]: SCENE_07_LOCK_HORSE_OFFICIAL,
  [SCENE_06_CANDLELIGHT_CIPHER_CRACK.id]: SCENE_06_CANDLELIGHT_CIPHER_CRACK,
  [SCENE_05_HORSESHOE_CLUE.id]: SCENE_05_HORSESHOE_CLUE,
  [SCENE_04_KAIFENGFU_REUNION.id]: SCENE_04_KAIFENGFU_REUNION,
  [SCENE_03_PALACE_WATCH_WEIQINGYI.id]: SCENE_03_PALACE_WATCH_WEIQINGYI,
  [SCENE_02_SPEAR_FIELD_PRIDE.id]: SCENE_02_SPEAR_FIELD_PRIDE,
  [SCENE_01_JINJUN_SECRET_EDICT.id]: SCENE_01_JINJUN_SECRET_EDICT,
}
