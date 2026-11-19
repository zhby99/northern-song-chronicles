import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q27_QUEST_ID = 'QST-SECT-11-27'

export const ZHONGNAN_Q27_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-26', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q27_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0265', npcName: '钟离雪' },
    { type: 'npcAlive', npcId: 'NPC-0190', npcName: '乌老大' },
    { type: 'npcAlive', npcId: 'NPC-0102', npcName: '巫行云' },
  ],
}

export const ZHONGNAN_Q27_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q27_QUEST_ID,
  title: '瑶池万里 · 昆仑采玉',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'kunlun',
  recommendedRealm: '一流中品 ～ 一流上品（活死人墓远征卷三）',
  maxOpponentRealm: '大宗师中品（天山童姥巫行云威压试探 · 万仙盟魁乌老大）',
  recommendedNote:
    '三十幕万里雪域传奇长卷：为修补活死人墓镇脉至宝「昆仑寒玉床」，你先赴【京兆府 · 西市胡商坊 · 番坊正市 · 奇货堂】购获稀世古图《万山之祖昆仑雪域舆图》，随即万里西出玉门，远赴冰雪绝域【昆仑山 · 昆仑瑶池万年冰窟】！于西王母翡翠雪莲池结识雪山寒玉钟离雪、剑退觊觎雪莲的万仙盟魁乌老大；更于【万年寒玉冰床晶坛】直面当世绝顶大宗师「天山童姥」巫行云的惊天威压试探——寸步不跪、硬接二合不倒，赢得童姥另眼相看赐下万年寒玉髓与雪莲，万里归山献呈林朝瑶！',
  startHint:
    '完成《赤壁听涛 · 钟山问剑》后，先前往【京兆府 · 西市胡商坊（丝路起点） · 番坊正市 · 奇货堂】购取昆仑雪域舆图，即可启程万里西行。',
  startLocation: {
    regionId: 'changan',
    buildingId: 'ca_xishi',
    spotId: 'ca_xishi_main',
    customLabel: '京兆府 · 西市胡商坊（丝路起点） · 番坊正市 · 奇货堂',
  },
  startCondition: ZHONGNAN_Q27_START_CONDITION,
  summary:
    '{reignYear}隆冬，因活死人墓镇脉至宝「昆仑寒玉床」冰脉受损，你奉恩师【林朝瑶】密信，先赴【京兆府 · 西市胡商坊 · 番坊正市 · 奇货堂】购得《万山之祖昆仑雪域舆图》，旋即万里西行深入【昆仑瑶池万年冰窟】。在【西王母翡翠雪莲池】畔，你结识雪山隐士【钟离雪】，并联手击退企图强夺灵药的万仙盟魁【乌老大】。深入【万年寒玉冰床晶坛】采玉之际，竟遇逍遥派绝顶大宗师「天山童姥」【巫行云】现身试探！你直面大宗师浩瀚威压傲骨不跪、硬撑二合剑心不乱，反赢得巫行云赞许，得以携「万年寒玉髓」与「天山雪莲」安然返归【活死人墓 · 昆仑寒玉床冰魄石室】复命。',
  initialStepId: 'buy_kunlun_map',
  steps: {
    buy_kunlun_map: {
      id: 'buy_kunlun_map',
      title: '长安西市 · 购得雪图',
      objective:
        '请前往【京兆府 · 西市胡商坊（丝路起点） · 番坊正市 · 奇货堂】，向西域胡商购获《万山之祖昆仑雪域舆图》，打通前往昆仑雪域之路。',
      nextHint: '前往【京兆府 · 西市胡商坊 · 番坊正市 · 奇货堂（ca_xishi_main）】点击「探访西域奇货商 · 购取《万山之祖昆仑雪域舆图》」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        customLabel: '京兆府 · 西市胡商坊（丝路起点） · 番坊正市 · 奇货堂',
      },
    },
    yaochi_pool: {
      id: 'yaochi_pool',
      title: '万里瑶池 · 雪池退乌',
      objective:
        '舆图已得！请远赴【昆仑山 · 昆仑瑶池万年冰窟 · 西王母翡翠雪莲池】，会见雪山隐士钟离雪并击退觊觎雪莲的万仙盟魁乌老大！',
      nextHint: '前往【昆仑山 · 昆仑瑶池万年冰窟 · 西王母翡翠雪莲池（kl_yc_pool）】点击「踏雪寻瑶池 · 会钟离雪退乌老大」。',
      targetLocation: {
        regionId: 'kunlun',
        buildingId: 'kl_yaochi',
        spotId: 'kl_yc_pool',
        customLabel: '昆仑山（万山之祖） · 昆仑瑶池万年冰窟 · 西王母翡翠雪莲池',
      },
    },
    jade_bed_trial: {
      id: 'jade_bed_trial',
      title: '晶坛冰威 · 傲骨不跪',
      objective:
        '乌老大已退，请深入【昆仑瑶池万年冰窟 · 万年寒玉冰床晶坛】采集万年寒玉髓，直面天山童姥巫行云的绝世威压试探！',
      nextHint: '前往【昆仑瑶池万年冰窟 · 万年寒玉冰床晶坛（kl_yc_bed）】点击「踏入寒玉晶坛 · 承受天山童姥威压试探」。',
      targetLocation: {
        regionId: 'kunlun',
        buildingId: 'kl_yaochi',
        spotId: 'kl_yc_bed',
        customLabel: '昆仑山（万山之祖） · 昆仑瑶池万年冰窟 · 万年寒玉冰床晶坛',
      },
    },
    return_tomb_jadebed: {
      id: 'return_tomb_jadebed',
      title: '携髓归山 · 重续寒脉',
      objective:
        '万年寒玉髓与雪莲俱已到手！请速返【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】向恩师林朝瑶复命！',
      nextHint: '返回【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】点击「献上万年寒玉髓 · 修复昆仑寒玉床」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq27_start',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      onceFlag: 'znq27_intro_triggered',
      condition: ZHONGNAN_Q27_START_CONDITION,
      effects: [openScene('scene_znq27_01', ZHONGNAN_Q27_QUEST_ID)],
    },
    {
      id: 'trig_znq27_pool',
      regionId: 'kunlun',
      buildingId: 'kl_yaochi',
      spotId: 'kl_yc_pool',
      onceFlag: 'znq27_pool_triggered',
      condition: atStep(ZHONGNAN_Q27_QUEST_ID, 'yaochi_pool'),
      effects: [openScene('scene_znq27_07', ZHONGNAN_Q27_QUEST_ID)],
    },
    {
      id: 'trig_znq27_bed',
      regionId: 'kunlun',
      buildingId: 'kl_yaochi',
      spotId: 'kl_yc_bed',
      onceFlag: 'znq27_bed_triggered',
      condition: atStep(ZHONGNAN_Q27_QUEST_ID, 'jade_bed_trial'),
      effects: [openScene('scene_znq27_16', ZHONGNAN_Q27_QUEST_ID)],
    },
    {
      id: 'trig_znq27_return',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'znq27_return_triggered',
      condition: atStep(ZHONGNAN_Q27_QUEST_ID, 'return_tomb_jadebed'),
      effects: [openScene('scene_znq27_25', ZHONGNAN_Q27_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq27_start',
      label: '探访西市胡商奇货堂 · 购取《万山之祖昆仑雪域舆图》',
      badge: '昆仑采玉',
      subtitle: '西市胡商坊（丝路起点） · 番坊正市 · 奇货堂',
      tone: 'gold',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      visibleWhen: ZHONGNAN_Q27_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq27_intro_triggered', value: true },
        openScene('scene_znq27_01', ZHONGNAN_Q27_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq27_pool',
      label: '踏雪赴西王母翡翠雪莲池 · 会钟离雪退乌老大',
      badge: '雪池遇敌',
      subtitle: '昆仑瑶池万年冰窟 · 西王母翡翠雪莲池',
      tone: 'danger',
      regionId: 'kunlun',
      buildingId: 'kl_yaochi',
      spotId: 'kl_yc_pool',
      visibleWhen: atStep(ZHONGNAN_Q27_QUEST_ID, 'yaochi_pool'),
      effects: [
        { type: 'setFlag', flag: 'znq27_pool_triggered', value: true },
        openScene('scene_znq27_07', ZHONGNAN_Q27_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq27_bed',
      label: '踏入万年寒玉冰床晶坛 · 直面天山童姥巫行云威压',
      badge: '宗师威压',
      subtitle: '昆仑瑶池万年冰窟 · 万年寒玉冰床晶坛',
      tone: 'gold',
      regionId: 'kunlun',
      buildingId: 'kl_yaochi',
      spotId: 'kl_yc_bed',
      visibleWhen: atStep(ZHONGNAN_Q27_QUEST_ID, 'jade_bed_trial'),
      effects: [
        { type: 'setFlag', flag: 'znq27_bed_triggered', value: true },
        openScene('scene_znq27_16', ZHONGNAN_Q27_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq27_return',
      label: '献呈万年寒玉髓与雪莲 · 修复活死人墓寒玉床',
      badge: '携玉归山',
      subtitle: '活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: atStep(ZHONGNAN_Q27_QUEST_ID, 'return_tomb_jadebed'),
      effects: [
        { type: 'setFlag', flag: 'znq27_return_triggered', value: true },
        openScene('scene_znq27_25', ZHONGNAN_Q27_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq27_npc_start',
      label: '奉林朝瑶密信西行 · 前往长安西市购取昆仑舆图',
      badge: '瑶池万里',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0114'] },
          ZHONGNAN_Q27_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq27_intro_triggered', value: true },
        openScene('scene_znq27_01', ZHONGNAN_Q27_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanMuKunlunJadeQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q27_QUESTS: QuestDefinition[] = [ZHONGNAN_Q27_QUEST]
