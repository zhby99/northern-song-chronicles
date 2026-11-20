import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q19_QUEST_ID } from './zhongnanMuYunvSutraQuest'

const SPEAKER_XIXIA_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '野利铁骨',
  title: '西夏一品堂 · 破墓先锋',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_GUMU_TRAITOR: StorySpeakerSpec = {
  kind: 'custom',
  name: '莫寒烟',
  title: '古墓弃徒 · 引敌叛逆',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_female_av.jpg',
}

function buildXixiaVanguardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ19_VANGUARD',
    name: '野利铁骨',
    title: '西夏一品堂 · 破墓先锋',
    realm: '一流中品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '破墓先锋',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“莫姑娘已指明断龙石暗门所在！弟兄们，冲进活死人墓抢夺《玉女心经》！”',
    stats: { hp: 2520, mp: 2200, agi: 59, res: 47 },
    talents: { bone: 76, comprehension: 72, charm: 52 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-244', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-245', level: 8 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-145', level: 8 }],
  })
}

function buildGumuTraitorNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ19_TRAITOR',
    name: '莫寒烟',
    title: '古墓弃徒 · 引敌叛徒',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '叛门弃徒',
    avatarUrl: '/assets/characters/templates/tpl_zhongnan_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_zhongnan_female_fb.jpg',
    talk: '“林朝瑶当年不肯传我《玉女心经》，还把我逐出石门！今日我便带西夏高手踏平古墓，亲手取回本该属于我的素绢真经！”',
    stats: { hp: 2920, mp: 2680, agi: 64, res: 52 },
    talents: { bone: 80, comprehension: 82, charm: 74 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-085', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-245', level: 8 }, { artId: 'MA-085', level: 8 }, { artId: 'MA-076', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq19_01: {
    id: 'scene_znq19_01',
    title: '第一幕 · 岁末急报',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('{reignYear}腊月风雪漫天，你一路星夜兼程赶回活死人墓，径直步入昆仑寒玉床冰魄石室。林朝瑶与冷清秋早已立于案前。'),
      P('“师父！弟子在洛阳白马书院得聪辩先生苏星河示警：西夏一品堂重金买通了一名熟悉古墓机关的叛徒，近日便要引敌偷袭石门！”'),
      S('NPC-0114', '（长睫微垂，轻轻一叹）“莫寒烟……十年前她心术不正、私盗毒方被我逐出石门，没料到她竟堕落至此，甘为西夏犬马。”'),
    ],
    onFinishEffects: [openScene('scene_znq19_02', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_02: {
    id: 'scene_znq19_02',
    title: '第二幕 · 祖师暗匣',
    subtitle: '昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q19_silk_scroll.jpg',
    illustrationCaption: '素绢真经 · 林朝瑶启开祖师暗匣亲赐《终南玉女心经素绢谱》',
    mandatory: true,
    beats: [
      N('林朝瑶缓步走到昆仑寒玉床后方石壁，轻按三处梅花凹槽，一道幽暗石匣应声弹出。她双手捧出一卷洁白如雪、历经百年仍柔韧生辉的古素绢。'),
      S('NPC-0114', '“莫寒烟此番卷土重来，冲的正是我活死人墓镇派至宝——《终南玉女心经素绢谱》。你屡立奇功、心性澄明，这卷唯一真经，今日便正式赐予于你！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_03', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_03: {
    id: 'scene_znq19_03',
    title: '第三幕 · 赐经定脉',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      P('（双手郑重接过素绢古谱，躬身叩首）“弟子定当以性命护持素绢真经，绝不负古墓百年传承！”'),
      S('NPC-0114', '“单捧秘籍还不够。外敌随时将至，须即刻在昆仑寒玉床上行功冲关！《玉女心经》行功时热气蒸腾、极易内火攻心，唯有同修互助、借寒玉床压制燥气，方能一夜贯通！”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-SCR-012', qty: 1 },
      openScene('scene_znq19_04', ZHONGNAN_Q19_QUEST_ID),
    ],
  },

  scene_znq19_04: {
    id: 'scene_znq19_04',
    title: '第四幕 · 素女共修',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0173', '（缓步上前，清丽面容一片坚毅）“师父放心，清秋愿与{gender:师弟|师妹}同坐寒玉床，以内息相引、共助冲关！”'),
      S('NPC-0114', '“甚好！我亲自守住内室石门，为你们二人护法。切记谨守素绢心法总纲：『静若处子，动若脱兔；阴极蒸霞，气归灵台』！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_05', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_05: {
    id: 'scene_znq19_05',
    title: '第五幕 · 寒玉蒸霞',
    subtitle: '昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q19_jadebed_mist.jpg',
    illustrationCaption: '寒玉蒸霞 · 昆仑寒玉床上白雾漫室，真气奔腾如潮',
    mandatory: true,
    beats: [
      N('你与冷清秋并肩盘膝坐上昆仑寒玉床，展开素绢真经逐字诵读行功。初时只觉玉床寒意刺骨，待心经真气冲破膻中玄关，丹田陡然升起一股炽热暖流！'),
      N('极寒与极热在冰魄石室内剧烈交融，二人头顶竟同时蒸腾起大片淡红霞雾，满室如置蓬莱仙境！'),
    ],
    onFinishEffects: [openScene('scene_znq19_06', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_06: {
    id: 'scene_znq19_06',
    title: '第六幕 · 双掌引气',
    subtitle: '昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q19_dual_cultivation.jpg',
    illustrationCaption: '双心印脉 · 与冷清秋抵掌共运玉女心经冲破玄关',
    mandatory: true,
    beats: [
      N('冲至任督交汇险关时，你胸口热浪翻涌欲裂！冷清秋素手轻抬，双掌隔雾与你相抵，一股清冽柔润的寒玉内息顺掌心渡来，恰如甘霖洒向焦土！'),
      S('NPC-0173', '“莫乱气息！随我导引，将蒸腾燥气尽数化入轻灵经脉——便是此刻！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_07', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_07: {
    id: 'scene_znq19_07',
    title: '第七幕 · 心经大通',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('嗡然一声清鸣响彻识海！漫室白雾尽数倒卷入体，你只觉周身轻盈得宛若随时可御风而起，往日所学《踏雪无痕》《越女古剑术》《寒冰绵掌》《含沙射影》皆在这一瞬融为一炉——地阶上品《玉女心经》赫然冲关成功！'),
    ],
    onFinishEffects: [
      { type: 'teachMartialArt', artId: 'MA-039', level: 1, autoEquip: true },
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq19_08', ZHONGNAN_Q19_QUEST_ID),
    ],
  },

  scene_znq19_08: {
    id: 'scene_znq19_08',
    title: '第八幕 · 寒玉初成',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0173', '（收掌轻拭额角香汗，展颜一笑）“成了！{gender:师弟|师妹}，你的气机之轻灵圆融，竟已不逊于苦修十载的同门！”'),
      S('NPC-0114', '（推门而入，眼中满是欣慰）“好！《玉女心经》既成，古墓传承便有了最稳固的柱石。”'),
    ],
    onFinishEffects: [openScene('scene_znq19_09', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_09: {
    id: 'scene_znq19_09',
    title: '第九幕 · 墓外警钟',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('欢喜未落，活死人墓外层断龙石方向忽传三声沉闷巨响！暗道铜铃剧烈震颤，守山玉蜂漫天悲鸣！'),
      S('NPC-0114', '（神色一凛）“来了！莫寒烟竟知晓后山暗道换气孔的位置，正引着西夏破墓先锋在双剑合璧坪强攻石门！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_10', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_10: {
    id: 'scene_znq19_10',
    title: '第十幕 · 请战出墓',
    subtitle: '活死人墓幽谷石室',
    mandatory: true,
    beats: [
      P('“师父，清秋师姐方才助我冲关消耗了不少内元，请留她在墓中看守机关与玉蜂轩！莫寒烟与西夏贼人，便交由弟子以新悟的《玉女心经》前去清理门户！”'),
      S('NPC-0114', '“准！莫寒烟阴毒狡诈，但你已得《玉女心经》真传，正可克制她那套残缺寒功。去吧，让终南山看看古墓真传的风采！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_11', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_11: {
    id: 'scene_znq19_11',
    title: '第十一幕 · 掠出石门',
    subtitle: '活死人墓石门',
    illustrationUrl: '/assets/quests/zn_q19_stone_gate.jpg',
    illustrationCaption: '掠出石门 · 身法如玉龙惊鸿冲破漫天风雪',
    mandatory: true,
    beats: [
      N('你轻按石壁机括，千斤石门豁然开出一道窄缝！你体内《玉女心经》轰然流转，身形化作一道流光白影掠出石门，直扑繁花幽谷双剑合璧坪！'),
    ],
    onFinishEffects: [openScene('scene_znq19_12', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_12: {
    id: 'scene_znq19_12',
    title: '第十二幕 · 幽谷风雪',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('雪雾茫茫的繁花幽谷中，火把明灭，杀气冲天。一场清理门户的决战一触即发！'),
    ],
    choices: [
      {
        id: 'znq19_go_sword_clearing',
        label: '已获《终南玉女心经素绢谱》并习得《玉女心经》，掠赴【双剑合璧坪】破敌',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q19_QUEST_ID, stepId: 'seal_traitor_outside' },
          setStep(ZHONGNAN_Q19_QUEST_ID, 'seal_traitor_outside'),
          toast('已习得地阶上品《玉女心经》！请速赴【繁花幽谷双剑合璧坪】冰封叛徒！', 'success', '素绢真经'),
        ],
      },
    ],
  },

  scene_znq19_13: {
    id: 'scene_znq19_13',
    title: '第十三幕 · 叛徒引敌',
    subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('踏上双剑合璧坪，只见数十名西夏一品堂死士正架起攻城铁锤砸向石壁暗门。高崖之上，一名身披玄黑貂裘、面容冷艳却扭曲怨毒的女子正冷笑俯视——正是古墓弃徒莫寒烟！'),
      S(SPEAKER_GUMU_TRAITOR, '“哟，林朝瑶自己缩在墓里不敢出来，倒派了个毛头小辈送死？野利将军，先替我剁了这个古墓真传！”'),
      S(SPEAKER_XIXIA_VANGUARD, '（狞笑挥刀扑来）“遵命！小娃儿，纳命来！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_14', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_14: {
    id: 'scene_znq19_14',
    title: '第十四幕 · 先破先锋',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P('“西夏狂徒，休想亵渎古墓石门一步！”'),
    ],
    choices: [
      {
        id: 'znq19_fight_vanguard',
        label: '运使《玉女心经》迎战西夏一品堂破墓先锋野利铁骨',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaVanguardNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '石门就在身后，绝不容外敌踏入半步！',
            introText: '雪花漫卷，你以初成的玉女心经神功迎战西夏破墓先锋野利铁骨！',
            onWin: [openScene('scene_znq19_15', ZHONGNAN_Q19_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('西夏先锋刀势凶猛，你借玉女轻灵身法跃开调息后再战！', 'warn', '素绢真经'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq19_15: {
    id: 'scene_znq19_15',
    title: '第十五幕 · 瞬溃西夏',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('《玉女心经》加持之下，你的身法与招式快得令野利铁骨目不暇接！不出数合，你掌风震断其长刀，反手一掌将其击飞出丈外，西夏破墓先锋顿时土崩瓦解！'),
      S(SPEAKER_GUMU_TRAITOR, '（脸色剧变，飞身掠下高崖，嫉恨得双目赤红）“这股轻灵寒息……不可能！林朝瑶竟真的把《玉女心经》传给了你？！凭什么！凭什么！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq19_16', ZHONGNAN_Q19_QUEST_ID),
    ],
  },

  scene_znq19_16: {
    id: 'scene_znq19_16',
    title: '第十六幕 · 清理门户',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P('“莫寒烟！你背叛师门、勾结外敌，心术早已被嫉恨腐朽，又岂配修习素绢真经？今日我便代师清理门户，三招之内冰封你这叛徒！”'),
      S(SPEAKER_GUMU_TRAITOR, '“狂妄！拿命来，素绢真经归我莫寒烟！”'),
    ],
    choices: [
      {
        id: 'znq19_fight_traitor',
        label: '以《玉女心经》正面对决并冰封古墓引敌叛徒莫寒烟',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildGumuTraitorNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '叛门逆徒就在眼前，必将其彻底制服！',
            introText: '双剑合璧坪雪舞霜飞，你运起玉女心经正面迎战引敌叛徒莫寒烟！',
            onWin: [openScene('scene_znq19_17', ZHONGNAN_Q19_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('莫寒烟阴毒诡谲，你运起玉女心经稳住气血后再行决战！', 'warn', '素绢真经'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq19_17: {
    id: 'scene_znq19_17',
    title: '第十七幕 · 三招冰封',
    subtitle: '繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q19_frost_seal.jpg',
    illustrationCaption: '三招冰封 · 玉女心经配寒冰绵掌，三招之内将叛徒莫寒烟冻成冰雕',
    mandatory: true,
    beats: [
      N('第一招，你以《玉女心经》化开莫寒烟漫天毒针，轻盈折身逼至三尺之内；第二招，越女剑意震散她护体西夏邪罡；第三招，《寒冰绵掌》挟着十成寒玉真气轻飘飘印在她丹田气海！'),
      N('咔嚓一声脆响！一层晶莹玄冰瞬间自莫寒烟胸口蔓延至四肢百骸，将她周身大穴与邪功彻底冰封动弹不得！'),
    ],
    onFinishEffects: [openScene('scene_znq19_18', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_18: {
    id: 'scene_znq19_18',
    title: '第十八幕 · 逆徒伏诛',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S(SPEAKER_GUMU_TRAITOR, '（浑身结霜跪倒雪地，眼神满是不可置信与绝望）“三招……我苦修西夏玄功十年，竟接不住完整《玉女心经》三招……”'),
      N('残余西夏死士见领路叛徒与先锋皆败，早已吓得魂飞魄散，丢下兵刃连滚带爬逃下山去。'),
    ],
    onFinishEffects: [openScene('scene_znq19_19', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_19: {
    id: 'scene_znq19_19',
    title: '第十九幕 · 废功逐山',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你上前废去莫寒烟偷学来的古墓残功，收缴其怀中所有古墓机关图与西夏令牌。石门再次开启，冷清秋率守墓玉蜂掠出，将动弹不得的叛徒押交关中官府与终南外门发落。'),
    ],
    onFinishEffects: [openScene('scene_znq19_20', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_20: {
    id: 'scene_znq19_20',
    title: '第二十幕 · 幽谷澄明',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('大雪渐停，一缕冬阳穿透秦岭云层洒在双剑合璧坪上，照得玉树琼花熠熠生辉。'),
      S('NPC-0173', '（满眼赞叹与欣喜）“三招冰封一流上品的莫寒烟！{gender:师弟|师妹}，经此一战，再无人敢小觑我活死人墓一脉！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_21', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_21: {
    id: 'scene_znq19_21',
    title: '第二十一幕 · 并肩归室',
    subtitle: '活死人墓幽谷石门',
    mandatory: true,
    beats: [
      N('你与冷清秋并肩步回幽谷石室，向静候于冰魄石室中的师父林朝瑶复命。'),
    ],
    choices: [
      {
        id: 'znq19_return_jadebed',
        label: '返回【昆仑寒玉床冰魄石室】向师父林朝瑶复命',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q19_QUEST_ID, 'return_jadebed_finale'),
          toast('请返回【昆仑寒玉床冰魄石室】向林朝瑶复命！', 'success', '素绢真经'),
        ],
      },
    ],
  },

  scene_znq19_22: {
    id: 'scene_znq19_22',
    title: '第二十二幕 · 寒玉称赞',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('冰魄石室内，林朝瑶听罢战报，一贯清冷如霜的眉宇彻底舒展开来。'),
      S('NPC-0114', '“三招冰封莫寒烟、击溃西夏破墓先锋，既全了古墓清规，又护了终南百年净土。我将《终南玉女心经素绢谱》托付于你，果真没有看错人！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_23', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_23: {
    id: 'scene_znq19_23',
    title: '第二十三幕 · 素绢永传',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“《玉女心经》玄妙无穷，初成仅是登堂入室。你须与清秋、清霜相互砥砺，将此经修至圆满大成，日后纵使面对天下绝顶宗师亦有一战之力！”'),
      P('“弟子谨遵师父教诲！定勤修素绢真经，护佑终南，行侠天下！”'),
    ],
    onFinishEffects: [openScene('scene_znq19_24', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_24: {
    id: 'scene_znq19_24',
    title: '第二十四幕 · 两脉暗契',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“方才前山重阳古观亦遣玉蜂传信，称西夏一品堂正暗中筹谋更大风暴。南北两脉同居终南一山，日后若有大劫，你不妨放宽胸怀，与前山道友共抗外侮。”'),
    ],
    onFinishEffects: [openScene('scene_znq19_25', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_25: {
    id: 'scene_znq19_25',
    title: '第二十五幕 · 霜华如故',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('昆仑寒玉床泛着温润白光，素绢真经静卧怀中，冷清秋在旁浅笑相视。终南活死人墓的孤寂岁月，因你的到来而焕发出崭新生机。'),
    ],
    onFinishEffects: [openScene('scene_znq19_26', ZHONGNAN_Q19_QUEST_ID)],
  },

  scene_znq19_26: {
    id: 'scene_znq19_26',
    title: '第二十六幕 · 玉女凌霄',
    subtitle: '终南山隐宗 · 活死人墓幽谷石室',
    mandatory: true,
    beats: [
      N('你向林朝瑶深深一拜，收剑起身。终南古墓核心主干至此功德圆满，你的大宋江湖之路正迈向宗师绝巅！'),
    ],
    choices: [
      {
        id: 'znq19_complete',
        label: '珍藏《终南玉女心经素绢谱》，铭记古墓真传大成之功',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addArtExp', artId: 'MA-039', amount: 500 },
          { type: 'giveSilver', amount: 260, reason: '护墓除叛、修成玉女心经重赏' },
          { type: 'giveCombatExp', amount: 3000, reason: '破西夏先锋并三招冰封古墓叛徒' },
          { type: 'addSectContribution', amount: 500 },
          { type: 'modifyRenown', delta: 90, reason: '寒玉蒸霞修成玉女心经威震终南' },
          { type: 'modifyChivalry', delta: 45, reason: '清理门户破敌护山' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 25 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 25 },
          { type: 'completeQuest', questId: ZHONGNAN_Q19_QUEST_ID, outcome: 'mastered_yunv_sutra' },
          toast('《寒玉蒸霞 · 素绢真经》圆满完成！已获《终南玉女心经素绢谱》并习得《玉女心经》！', 'success', '素绢真经'),
        ],
      },
    ],
  },
}
