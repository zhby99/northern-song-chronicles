import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE06_QUEST_ID = 'QST-SECT-05-SIDE-06'

export const HUASHAN_SIDE06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-07', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    flag('hs_branch', 'eq', 'jian'),
    qStatus('QST-SECT-05-19', 'not_completed'),
    qStatus('QST-SECT-05-20', 'not_completed'),
    qStatus('QST-SECT-05-21', 'not_completed'),
    { type: 'skillAtLeast', key: '骑术', min: 15 },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    qStatus(HUASHAN_SIDE06_QUEST_ID, 'not_started'),
  ],
}

export const HUASHAN_SIDE06_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE06_QUEST_ID,
    title: '潼关试铁 · 百步断刃行',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流中品 ～ 二流上品',
    maxOpponentRealm: '二流上品（党项一品堂百夫长「铁骨刀」嵬名悍）',
    recommendedNote:
      '十幕华山剑宗专属支线：封不弃严冬蹴你下山，命赴黄河惊涛烽火台随陕西边军老斥候风餐露宿，借冰河伏骑磨砺快剑。夜截踏冰南下的西夏一品堂马队，掠马交错间以《落雁剑法》百步断刃斩杀百夫长嵬名悍。',
    startHint:
      '华山剑宗第 2 阶弟子完成《风陵夜渡 · 平沙落雁》（QST-SECT-05-07）且骑术 ≥ 15 后（继任掌门前），前往【潼关天险瓮城 > 黄河大折惊涛烽火台】或寻【封不弃】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      customLabel: '潼关 / 潼关天险瓮城 · 黄河大折惊涛烽火台（或寻封不弃）',
    },
    startCondition: HUASHAN_SIDE06_START_CONDITION,
    summary:
      '{reignYear}隆冬，黄河潼关段坚冰封渡。宿老【封不弃】冷斥山上木剑对拆终属死艺，一脚将你踢下西岳，命赴【黄河大折惊涛烽火台】随陕西西军老斥候同卧冰崖。三日风雪之后，西夏一品堂百夫长「铁骨刀」嵬名悍率党项精骑踏冰偷渡，你先破游骑前哨，复于黄土断崖之下掠马交错，以《落雁剑法》疾锋斩断其冷锻弯刀并将其枭首，提断刃返峰复命。',
    initialStepId: 'loess_ambush',
    steps: {
      loess_ambush: {
        id: 'loess_ambush',
        title: '黄土伏骑 · 冰河候敌',
        objective:
          '已随陕西边军老斥候潜伏于【潼关天险瓮城 > 黄河大折惊涛烽火台】外断崖。严冬夜色将沉，速于烽火台伺机伏击踏冰南下的西夏马队！',
        nextHint: '在【潼关天险瓮城 > 黄河大折惊涛烽火台】探查冰河动静并迎击党项游骑。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
        },
      },
      sever_saber: {
        id: 'sever_saber',
        title: '百步断刃 · 斩铁骨刀',
        objective:
          '党项前哨游骑已被扫清！西夏一品堂百夫长「铁骨刀」嵬名悍纵马冲上黄土断崖，速于【黄河大折惊涛烽火台】迎战强敌，以快剑断其冷锻弯刀！',
        nextHint: '在【潼关天险瓮城 > 黄河大折惊涛烽火台】与「铁骨刀」嵬名悍生死对决。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
        },
      },
      return_feng: {
        id: 'return_feng',
        title: '提刃复命 · 孤松验锋',
        objective:
          '「铁骨刀」嵬名悍伏诛，冷锻弯刀已断作两截！请携断刃返回【华山绝顶论剑台 > 朝阳孤松观海亭】向【封不弃】复命。',
        nextHint: '前往【华山绝顶论剑台 > 朝阳孤松观海亭】（或寻封不弃）呈上断刃领赏。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_pine',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss06_beacon_start',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        onceFlag: 'hss06_intro_triggered',
        condition: HUASHAN_SIDE06_START_CONDITION,
        effects: [openScene('scene_hss06_01', HUASHAN_SIDE06_QUEST_ID)],
      },
      {
        id: 'trig_hss06_return_feng',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        onceFlag: 'hss06_return_triggered',
        condition: atStep(HUASHAN_SIDE06_QUEST_ID, 'return_feng'),
        effects: [openScene('scene_hss06_09', HUASHAN_SIDE06_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss06_start_beacon',
        label: '登临惊涛烽火台 · 领受封不弃严冬试铁之命（开启《潼关试铁 · 百步断刃行》）',
        badge: '剑宗试铁',
        subtitle: '第一幕 · 黄河大折惊涛烽火台',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: HUASHAN_SIDE06_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hss06_intro_triggered', value: true },
          openScene('scene_hss06_01', HUASHAN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss06_loess_ambush',
        label: '潜伏十里黄土断崖 · 截杀踏冰南下党项游骑',
        badge: '黄土伏骑',
        subtitle: '第三幕 · 黄河大折惊涛烽火台',
        tone: 'primary',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_SIDE06_QUEST_ID, 'loess_ambush'),
        effects: [openScene('scene_hss06_03', HUASHAN_SIDE06_QUEST_ID)],
      },
      {
        id: 'spot_hss06_sever_saber',
        label: '掠马拔剑 · 与「铁骨刀」嵬名悍百步断刃决战',
        badge: '百步断刃',
        subtitle: '第六幕 · 黄河大折惊涛烽火台',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_SIDE06_QUEST_ID, 'sever_saber'),
        effects: [openScene('scene_hss06_06', HUASHAN_SIDE06_QUEST_ID)],
      },
      {
        id: 'spot_hss06_return_pine',
        label: '呈上党项冷锻断刃 · 向封不弃复命验锋',
        badge: '孤松复命',
        subtitle: '第九幕 · 朝阳孤松观海亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        visibleWhen: atStep(HUASHAN_SIDE06_QUEST_ID, 'return_feng'),
        effects: [
          { type: 'setFlag', flag: 'hss06_return_triggered', value: true },
          openScene('scene_hss06_09', HUASHAN_SIDE06_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hss06_feng_start',
        label: '请教严冬实战试锋之法（开启《潼关试铁 · 百步断刃行》）',
        badge: '剑宗试铁',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            HUASHAN_SIDE06_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hss06_intro_triggered', value: true },
          openScene('scene_hss06_01', HUASHAN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'act_hss06_feng_return',
        label: '呈上嵬名悍冷锻断刃 · 禀明冰河斩骑始末',
        badge: '孤松复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            atStep(HUASHAN_SIDE06_QUEST_ID, 'return_feng'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hss06_return_triggered', value: true },
          openScene('scene_hss06_09', HUASHAN_SIDE06_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideJianTongguanQuest.scenes').then((m) => m.SCENES),
  },
]
