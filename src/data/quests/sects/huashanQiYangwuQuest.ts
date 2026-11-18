import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q03_QUEST_ID = 'QST-SECT-05-03'

export const HUASHAN_Q03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus('QST-SECT-05-02', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'qi',
      label: '华山气宗正脉弟子（博台大比择定气宗）',
    },
    qStatus(HUASHAN_Q03_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
  ],
}

export const HUASHAN_Q03_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q03_QUEST_ID,
    title: '玉女晨钟 · 浩然养吾',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '三流上品 ～ 二流下品',
    maxOpponentRealm: '二流下品（江南挑山快刀首领 · 柳千刃）',
    recommendedNote:
      '华山气宗正脉 Lv.2 内门首篇（全十五幕）。博台分宗择定气宗后，于东峰紫气迎曦石坪得大师兄高沧云阐发孟子浩然之旨并亲授良品《养吾剑法》（MA-147）。数日后江南快刀客登玉女峰挑衅，以守中绵密的养吾剑势十合之内震飞刀首兵刃！',
    startHint:
      '博台大比择定【紫霞气宗正脉】晋升内门剑士后，前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪】（或寻高沧云、宁清羽）开启气宗内门授剑。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    },
    startCondition: HUASHAN_Q03_START_CONDITION,
    summary:
      '{reignYear}初入华山紫霞气宗内门首日，你于拂晓登临【东峰紫气迎曦石坪】，大师兄【高沧云】迎着漫天朝霞引《孟子》“吾善养吾浩然之气”之义，亲授气宗守正内门剑学《养吾剑法》。数日后，三名自恃诡奇快刀的江南刀客闯上【洗头盆清泉演剑院】，专攻下盘偏门羞辱外门弟子。你奉高沧云之命持剑出列，先挫急先锋，再以绵密如渊的养吾剑幕于十合之内震飞二流下品刀首柳千刃手中双刀，令挑山狂客羞惭拜服，深悟剑气相生之妙。',
    initialStepId: 'repel_sabremen_spring',
    steps: {
      repel_sabremen_spring: {
        id: 'repel_sabremen_spring',
        title: '清泉演剑 · 守中破刀',
        objective:
          '已得高沧云亲授《养吾剑法》！数日后三名江南挑山快刀客闯入【玉女峰紫霞道观 · 洗头盆清泉演剑院】寻衅，请即刻赶往演剑院，以堂皇养吾剑势十合之内挫敌锋芒！',
        nextHint:
          '前往【玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，点击「赴清泉演剑院 · 迎战江南挑山快刀客」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_spring',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
        },
      },
      return_terrace_insight: {
        id: 'return_terrace_insight',
        title: '东峰复盘 · 浩然日新',
        objective:
          '已于十合之内震飞江南刀首柳千刃双刀！请随高沧云与宁清羽返回【东峰紫气迎曦石坪】复盘剑理、印证浩然正气。',
        nextHint:
          '前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】，点击「登迎曦石坪 · 印证浩然养吾剑理」或与高沧云交谈。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq03_start_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hs_q03_start_triggered',
        condition: HUASHAN_Q03_START_CONDITION,
        effects: [openScene('scene_hsq03_01', HUASHAN_Q03_QUEST_ID)],
      },
      {
        id: 'trig_hsq03_spring_sabremen',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_q03_spring_triggered',
        condition: atStep(HUASHAN_Q03_QUEST_ID, 'repel_sabremen_spring'),
        effects: [openScene('scene_hsq03_06', HUASHAN_Q03_QUEST_ID)],
      },
      {
        id: 'trig_hsq03_return_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hs_q03_insight_triggered',
        condition: atStep(HUASHAN_Q03_QUEST_ID, 'return_terrace_insight'),
        effects: [openScene('scene_hsq03_14', HUASHAN_Q03_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq03_start_terrace',
        label: '【气宗内门】迎曦听钟 · 请高师兄传授气宗内门剑法',
        badge: '浩然养吾',
        subtitle: '气宗首课 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: HUASHAN_Q03_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q03_start_triggered', value: true },
          openScene('scene_hsq03_01', HUASHAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq03_spring_sabremen',
        label: '【气宗内门】赴清泉演剑院 · 迎战江南挑山快刀客',
        badge: '守中破妄',
        subtitle: '第六幕 · 以《养吾剑法》挫败诡奇快刀',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: atStep(HUASHAN_Q03_QUEST_ID, 'repel_sabremen_spring'),
        effects: [
          { type: 'setFlag', flag: 'hs_q03_spring_triggered', value: true },
          openScene('scene_hsq03_06', HUASHAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq03_return_terrace',
        label: '【气宗内门】登迎曦石坪 · 印证浩然养吾剑理',
        badge: '剑理印证',
        subtitle: '第十四幕 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_Q03_QUEST_ID, 'return_terrace_insight'),
        effects: [
          { type: 'setFlag', flag: 'hs_q03_insight_triggered', value: true },
          openScene('scene_hsq03_14', HUASHAN_Q03_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq03_start_npc',
        label: '初入气宗内门 · 恭请传授《养吾剑法》',
        badge: '浩然养吾',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0202', 'NPC-0166'] },
            HUASHAN_Q03_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q03_start_triggered', value: true },
          openScene('scene_hsq03_01', HUASHAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq03_spring_npc',
        label: '随宁师叔赴演剑院 · 以《养吾剑法》迎战挑山刀客',
        badge: '守中破妄',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166', 'NPC-0202'] },
            atStep(HUASHAN_Q03_QUEST_ID, 'repel_sabremen_spring'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q03_spring_triggered', value: true },
          openScene('scene_hsq03_06', HUASHAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq03_insight_npc',
        label: '向高师兄与宁师叔复盘《养吾剑法》破刀心得',
        badge: '浩然日新',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0202', 'NPC-0166'] },
            atStep(HUASHAN_Q03_QUEST_ID, 'return_terrace_insight'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q03_insight_triggered', value: true },
          openScene('scene_hsq03_14', HUASHAN_Q03_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanQiYangwuQuest.scenes').then((m) => m.SCENES),
  },
]
