import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q17_QUEST_ID } from './zhongnanMuFrostNeedleQuest'

const SPEAKER_YIPINTANG_ASSASSIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑山煞',
  title: '西夏一品堂 · 秦岭潜行死士首领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_XINGXIU_ASSASSIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐骨子',
  title: '星宿派 · 炼毒死士头目',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildYipintangAssassinNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ17_YIPINTANG_DEAD',
    name: '黑山煞',
    title: '西夏一品堂 · 潜行死士首领',
    realm: '一流下品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '死士首领',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“既被你撞破行藏，今夜这飞瀑之下便留不得活口！受死！”',
    stats: { hp: 2350, mp: 2020, agi: 58, res: 45 },
    talents: { bone: 74, comprehension: 70, charm: 50 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-244', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-245', level: 7 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-145', level: 7 }],
  })
}

function buildXingxiuAssassinNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ17_XINGXIU_DEAD',
    name: '腐骨子',
    title: '星宿派 · 炼毒死士头目',
    realm: '一流中品',
    factionName: '星宿派',
    sectRank: 3,
    sectRankLabel: '星宿毒煞',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“桀桀桀！西夏重金请我星宿门人来焚毁活死人墓，正好拿你的血肉喂我的化功毒粉！”',
    stats: { hp: 2560, mp: 2280, agi: 60, res: 48 },
    talents: { bone: 76, comprehension: 78, charm: 48 },
    equippedArts: { neigong: 'MA-231', move1: 'MA-105', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-231', level: 8 }, { artId: 'MA-105', level: 8 }, { artId: 'MA-244', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq17_01: {
    id: 'scene_znq17_01',
    title: '第一幕 · 寒玉启传',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，冰魄石室霜气更胜往昔。林朝瑶端坐昆仑寒玉床之上，袖间隐有细碎冰晶悬浮，见你踏步而入，缓缓抬手示意你坐上寒玉床沿。'),
      S('NPC-0114', '“你已通过问心，神完气足。今日我便将古墓一脉两大成名杀伐绝学——《寒冰绵掌》与《含沙射影》一并传你。”'),
      P('“多谢师父厚爱！弟子定当凝神受法！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_02', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_02: {
    id: 'scene_znq17_02',
    title: '第二幕 · 寒玉借气',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('你盘膝坐上昆仑寒玉床，一股彻骨冰寒瞬间自涌泉穴直冲丹田！你急运古墓内息抗衡，不多时，寒热交激之下，经脉竟隐隐泛起玉质微光。'),
      S('NPC-0114', '“《寒冰绵掌》看似掌风轻柔如绵絮，实则暗藏极阴寒劲。常人只知刚掌裂石，却不知绵掌透骨冻脉，中掌者三息之内气血凝滞，百骸俱僵！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_03', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_03: {
    id: 'scene_znq17_03',
    title: '第三幕 · 绵掌凝霜',
    subtitle: '昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q17_frost_palm.jpg',
    illustrationCaption: '寒冰绵掌 · 轻柔掌影过处，石室水钵瞬结莲花冰霜',
    mandatory: true,
    beats: [
      N('林朝瑶素掌轻飘飘按向三尺外一只盛满清水的铜钵，掌风未至，水面竟无声无息凝成一朵晶莹剔透的冰莲，铜钵本身却纹丝未动！'),
      N('你依着林朝瑶口授的经脉走气法门，将寒玉床渡入的阴寒真气聚于劳宫穴，反复吐纳催发。半日之后，你一掌轻推，石壁青苔上赫然印下一道霜白掌印！'),
    ],
    onFinishEffects: [openScene('scene_znq17_04', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_04: {
    id: 'scene_znq17_04',
    title: '第四幕 · 含沙玄机',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（见你初步领悟绵掌寒劲，微微颔首，自袖中取出三把寒光森森的冰魄银针）“掌法既入堂奥，再看我古墓令江湖邪派闻风丧胆的暗器绝学——《含沙射影》！”'),
      S('NPC-0114', '“昔年你学的《追魂夺命镖》乃明发直击；而《含沙射影》贵在藏针于袖、借掌风吐劲，于无声无息间暴雨梨花般覆盖敌手周身大穴，令强敌防不胜防！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_05', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_05: {
    id: 'scene_znq17_05',
    title: '第五幕 · 银针凝霜',
    subtitle: '昆仑寒玉床冰魄石室',
    illustrationUrl: '/assets/quests/zn_q17_shadow_needles.jpg',
    illustrationCaption: '含沙射影 · 冰魄银针裹挟霜雾破空，洞穿十丈石灯',
    mandatory: true,
    beats: [
      N('你依言将绵掌寒劲暗暗渡入指缝银针，双袖轻拂间，十二枚冰魄银针化作漫天细碎寒星射出，叮叮当当尽数钉入十丈外石壁刻痕之内，针尾犹自凝着一层细霜！'),
      P('“以绵掌寒劲催发含沙射影，掌影即针影，虚实难辨！弟子受教了！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_06', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_06: {
    id: 'scene_znq17_06',
    title: '第六幕 · 掌针双成',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“不错。这两门绝学相辅相成，近可寒冰绵掌冻脉制敌，远可含沙射影群慑宵小，你须日夜勤修不辍。”'),
    ],
    onFinishEffects: [
      { type: 'teachMartialArt', artId: 'MA-085', level: 1, autoEquip: true },
      { type: 'teachMartialArt', artId: 'MA-076', level: 1 },
      openScene('scene_znq17_07', ZHONGNAN_Q17_QUEST_ID),
    ],
  },

  scene_znq17_07: {
    id: 'scene_znq17_07',
    title: '第七幕 · 寒夜急蜂',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('话音方落，夜幕早已降临。忽听墓道深处传来一阵刺耳急促的玉蜂长鸣！数十只守山玉蜂撞开通风石孔，竟有数只翅翼焦黑堕地！'),
      S('NPC-0114', '（冰眸骤然一凛）“焦黑腥臭……是西域星宿派的炼毒焰粉！外头竟有大队邪道死士趁子夜摸上了寒玉涧！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_08', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_08: {
    id: 'scene_znq17_08',
    title: '第八幕 · 请缨歼敌',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      P('“师父！清秋师姐正守着玉蜂轩与内室机关，外头这批潜入银练飞瀑的贼子，就请交由弟子去全数清理干净，正好拿他们试我新学的《寒冰绵掌》与《含沙射影》！”'),
      S('NPC-0114', '“好！一品堂屡屡勾结外道窥伺秦岭，今夜既敢闯来，便一个也不要放走！切记提防星宿毒火，速去速回！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_09', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_09: {
    id: 'scene_znq17_09',
    title: '第九幕 · 备针出墓',
    subtitle: '活死人墓幽谷石门',
    mandatory: true,
    beats: [
      N('你束紧护腕，将满囊冰魄银针纳入袖中，运起《踏雪无痕》如一道幽蓝寒影掠出石门，直扑子夜冰雾弥漫的银练飞瀑！'),
    ],
    onFinishEffects: [openScene('scene_znq17_10', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_10: {
    id: 'scene_znq17_10',
    title: '第十幕 · 踏霜赴瀑',
    subtitle: '终南后山寒玉涧小径',
    mandatory: true,
    beats: [
      N('远方银练飞瀑方向火光隐隐，幽绿毒烟正顺着山风弥散开来，隐约可见两拨黑衣死士正在石茗案畔集结！'),
    ],
    choices: [
      {
        id: 'znq17_go_falls',
        label: '已习得《寒冰绵掌》与《含沙射影》，子夜直赴【银练飞瀑】歼敌',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q17_QUEST_ID, stepId: 'midnight_falls_ambush' },
          setStep(ZHONGNAN_Q17_QUEST_ID, 'midnight_falls_ambush'),
          toast('已习得地阶《寒冰绵掌》与《含沙射影》！请速赴【银练飞瀑清泉石茗案】全歼死士！', 'success', '冰魄银针'),
        ],
      },
    ],
  },

  scene_znq17_11: {
    id: 'scene_znq17_11',
    title: '第十一幕 · 飞瀑鬼火',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q17_midnight_falls.jpg',
    illustrationCaption: '子夜歼敌 · 银练飞瀑寒霜与星宿鬼火激烈交锋',
    mandatory: true,
    beats: [
      N('子夜时分，银练飞瀑如玉龙悬空。石茗案四周潜伏着二十余名黑衣死士：左翼身披西夏黑甲、腰悬弯刀的是一品堂潜行死士首领黑山煞；右翼燃着幽绿鬼火的则是星宿派毒煞头目腐骨子！'),
      S(SPEAKER_YIPINTANG_ASSASSIN, '“腐骨子，待会儿你以碧磷毒火熏开活死人墓暗道，我率一品堂弟兄直捣石室抢夺《玉女心经》！赏金咱们两家对半分！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_12', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_12: {
    id: 'scene_znq17_12',
    title: '第十二幕 · 含沙破阵',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P('“好大的胃口！只可惜今夜这银练飞瀑，便是你们两派死士的葬身之地！”'),
      N('话音未落，你凌空双袖齐振！《含沙射影》挟着刺骨霜风骤然洒下，数十枚冰魄银针如银河倾泻，瞬间钉翻外围七八名一品堂与星宿暗哨！'),
      S(SPEAKER_YIPINTANG_ASSASSIN, '（暴怒拔刀跃起）“哪里来的古墓小畜生！先撕碎你再探墓！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_13', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_13: {
    id: 'scene_znq17_13',
    title: '第十三幕 · 先诛一品堂',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('黑山煞挥刀挟黑水寒风掌劲扑面而来，你脚步一滑迎面欺近，双掌寒雾缭绕，以《寒冰绵掌》硬撼西夏死士首领！'),
    ],
    choices: [
      {
        id: 'znq17_fight_yipintang',
        label: '以寒冰绵掌与含沙射影迎战一品堂死士首领黑山煞',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYipintangAssassinNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '两路死士已潜入山腹，绝不能放他们逼近古墓！',
            introText: '飞瀑溅雪，你迎战潜入秦岭的一品堂死士首领黑山煞！',
            onWin: [openScene('scene_znq17_14', ZHONGNAN_Q17_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('一品堂死士悍不畏死，你借瀑雾隐去身形调息后再行袭杀！', 'warn', '冰魄银针'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq17_14: {
    id: 'scene_znq17_14',
    title: '第十四幕 · 冰封黑煞',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你掌风看似轻柔，印在黑山煞胸口却如万载玄冰炸裂！黑山煞浑身经脉瞬间僵死，连惨叫都未及出口便轰然倒毙在霜石之上，余下西夏死士亦被你补针清扫殆尽！'),
    ],
    onFinishEffects: [openScene('scene_znq17_15', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_15: {
    id: 'scene_znq17_15',
    title: '第十五幕 · 星宿鬼焰',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S(SPEAKER_XINGXIU_ASSASSIN, '（见黑山煞伏诛，阴测测怪笑一声，挥袖洒出大蓬碧磷毒焰）“西夏蛮子终究没用！小娃娃，尝尝老夫星宿派的碧磷化骨毒火，看你那点寒气挡不挡得住！”'),
      N('你深吸一口清冽瀑气，体内寒玉内息迅速流转一周天，气血内力尽复清明，目光冷冷锁住腐骨子！'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq17_16', ZHONGNAN_Q17_QUEST_ID),
    ],
  },

  scene_znq17_16: {
    id: 'scene_znq17_16',
    title: '第十六幕 · 霜灭星宿',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P('“星宿妖人也敢玷污秦岭山水？今日便叫你连人带毒火一并冰封！”'),
    ],
    choices: [
      {
        id: 'znq17_fight_xingxiu',
        label: '全速出击，彻底歼灭星宿派炼毒死士头目腐骨子',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuAssassinNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '星宿妖人手握碧磷毒焰，放走必成后山大患！',
            introText: '碧磷鬼火映照寒瀑，你以寒冰绵掌与含沙射影死战星宿毒煞腐骨子！',
            onWin: [openScene('scene_znq17_17', ZHONGNAN_Q17_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('星宿毒粉阴毒难防，你跃上瀑崖避开毒烟，调息后再战！', 'warn', '冰魄银针'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq17_17: {
    id: 'scene_znq17_17',
    title: '第十七幕 · 凝霜熄焰',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你身化流霜穿出毒烟，先以《含沙射影》三枚冰魄银针封死腐骨子双腕，随即一记十成劲力的《寒冰绵掌》正中其丹田！幽绿鬼火遇极寒之气嗤然熄灭，腐骨子僵直倒地，潜入秦岭的一品堂与星宿死士至此全军覆没！'),
    ],
    onFinishEffects: [openScene('scene_znq17_18', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_18: {
    id: 'scene_znq17_18',
    title: '第十八幕 · 查获星宿密笺',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你以瀑水彻底浇灭残余毒粉，在腐骨子怀中搜出一封烧焦半角的密信，隐约可见“洛阳……聪辩……云中鹤……”等字样。'),
      P('“洛阳？聪辩先生苏星河与云中鹤？难道西夏一品堂与星宿邪派在洛阳还有阴谋？”'),
    ],
    onFinishEffects: [openScene('scene_znq17_19', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_19: {
    id: 'scene_znq17_19',
    title: '第十九幕 · 瀑清月朗',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('山风吹散最后一缕硝烟，银练飞瀑复归澄净。你收妥密信，清点袖中余针，踏雪返回活死人墓。'),
    ],
    onFinishEffects: [openScene('scene_znq17_20', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_20: {
    id: 'scene_znq17_20',
    title: '第二十幕 · 凯旋回室',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      N('回到石室前，守卫暗道的玉蜂欢快地绕你飞舞，显然已察觉后山危机解除。'),
    ],
    choices: [
      {
        id: 'znq17_return_jadebed',
        label: '返回【活死人墓 · 昆仑寒玉床冰魄石室】向林朝瑶复命',
        tone: 'jade',
        effects: [
          setStep(ZHONGNAN_Q17_QUEST_ID, 'return_jadebed_report'),
          toast('请返回【昆仑寒玉床冰魄石室】向林朝瑶禀报歼敌战果！', 'talk', '冰魄银针'),
        ],
      },
    ],
  },

  scene_znq17_21: {
    id: 'scene_znq17_21',
    title: '第二十一幕 · 呈献密笺',
    subtitle: '终南山隐宗 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('你步入冰魄石室，将子夜全歼一品堂与星宿死士的经过细细禀报，并呈上自腐骨子身上搜出的半角密笺。'),
      S('NPC-0114', '（接过残笺细看，微微颔首）“初学《寒冰绵掌》与《含沙射影》便能孤身全歼两路死士，且毫发无伤，足见你已真正将古墓武学融会贯通。”'),
    ],
    onFinishEffects: [openScene('scene_znq17_22', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_22: {
    id: 'scene_znq17_22',
    title: '第二十二幕 · 洛阳风闻',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“残笺上提及洛阳『聪辩先生』苏星河与西夏恶人云中鹤……逍遥派苏星河昔年与我终南颇有琴棋旧谊，大宋易学宗师邵雍先生亦在洛阳白马书院。看来西夏爪牙已盯上洛阳雅集。”'),
    ],
    onFinishEffects: [openScene('scene_znq17_23', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_23: {
    id: 'scene_znq17_23',
    title: '第二十三幕 · 休整待行',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“你今夜连番血战消耗不小，先去好生调息。待整顿妥当，便可东赴西京洛阳白马书院一探虚实。”'),
      P('“弟子遵命！”'),
    ],
    onFinishEffects: [openScene('scene_znq17_24', ZHONGNAN_Q17_QUEST_ID)],
  },

  scene_znq17_24: {
    id: 'scene_znq17_24',
    title: '第二十四幕 · 霜刃藏锋',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('掌凝玄霜，袖藏银针。经此子夜血战，你在终南古墓中的威望与实力皆已步入一流之列。'),
    ],
    choices: [
      {
        id: 'znq17_complete',
        label: '拜谢师父嘉赏，收整兵刃暗器以备东赴洛阳',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addArtExp', artId: 'MA-085', amount: 300 },
          { type: 'addArtExp', artId: 'MA-076', amount: 300 },
          { type: 'giveSilver', amount: 180, reason: '子夜全歼潜敌护墓重赏' },
          { type: 'giveCombatExp', amount: 2300, reason: '子夜飞瀑全歼一品堂与星宿死士' },
          { type: 'addSectContribution', amount: 380 },
          { type: 'modifyRenown', delta: 60, reason: '冰魄银针含沙凝霜威震秦岭' },
          { type: 'modifyChivalry', delta: 30, reason: '诛灭星宿毒煞与西夏死士' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 20 },
          { type: 'completeQuest', questId: ZHONGNAN_Q17_QUEST_ID, outcome: 'annihilated_intruders' },
          toast('《冰魄银针 · 含沙凝霜》圆满完成！', 'success', '冰魄银针'),
        ],
      },
    ],
  },
}
