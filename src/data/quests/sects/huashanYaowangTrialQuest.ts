import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q01_QUEST_ID = 'QST-SECT-05-01'

export const HUASHAN_Q01_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 1 },
    { type: 'sectDaysAtLeast', sectId: 'SECT-05', min: 30 },
    qStatus('QST-SECT-05-ENTRY', 'completed'),
    qStatus(HUASHAN_Q01_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q01_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q01_QUEST_ID,
    title: '药王除恶 · 十二初试',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '三流下品 ～ 三流中品',
    maxOpponentRealm: '三流中品（“铁背苍狼”周横）',
    recommendedNote:
      '华山派 Lv.1 外门弟子初试任务链（全十二幕）。入山满三十日且完成入门大礼后，于玉女峰领命下山驰援华阴药王古庙，仅凭《华山剑法（入门十二式）》与《华山基础心法》击溃恶匪“铁背苍狼”周横、救回采药道童。回山复命时初窥气宗与剑宗理念暗流。',
    startHint:
      '拜入华山派满三十日后，前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院】（或寻高沧云、宁清羽）即可领命。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
    },
    startCondition: HUASHAN_Q01_START_CONDITION,
    summary:
      '{reignYear}入华山门墙满月之际，你于【玉女峰紫霞道观 · 洗头盆清泉演剑院】随大师兄【高沧云】晨课习剑，忽逢采药小道童泣血奔报：华山北麓华阴药王古庙遭关中悍匪“铁背苍狼”周横率众强占，灵药被夺、道童受困。【宁清羽】与高沧云命你持青锋下山除恶。你赶赴山麓古庙，先挫看门恶汉，再于古柏石阶下以堂堂正正的《华山剑法（入门十二式）》力破三流中品周横之厚背砍山刀，救出庙祝与道童。携药返山复命时，高沧云盛赞你根基沉稳，廊下途经的【封不弃】却冷言讥评十二式拘泥迟缓，剑气两脉之暗隙初现端倪。',
    initialStepId: 'descend_yaowang',
    steps: {
      descend_yaowang: {
        id: 'descend_yaowang',
        title: '北麓驰援 · 药王除恶',
        objective:
          '已奉宁清羽与大师兄高沧云之命持剑下山！请前往【潼关 / 西岳华山 · 潼关天险瓮城 · 潼关镇河主城楼与瓮城】（下华山北麓赴华阴药王古庙），击退恶匪“铁背苍狼”周横并救出被困采药道童！',
        nextHint:
          '前往【潼关天险瓮城 · 潼关镇河主城楼与瓮城（tg_ft_barbican）】，点击「驰援华阴药王古庙 · 剑除恶匪」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
          customLabel: '潼关 / 西岳华山 · 华阴药王古庙（经潼关北麓山道）',
        },
      },
      return_zixia_report: {
        id: 'return_zixia_report',
        title: '携药归山 · 清泉复命',
        objective:
          '已于药王古庙击败“铁背苍狼”周横，救出采药道童并取回秦岭灵药！请返回【玉女峰紫霞道观 · 洗头盆清泉演剑院】向宁清羽与高沧云复命。',
        nextHint:
          '返回【玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，点击「呈交秦岭灵药 · 禀报药王除恶经过」或与高沧云、宁清羽交谈。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_spring',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq01_start_spring',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_q01_start_triggered',
        condition: HUASHAN_Q01_START_CONDITION,
        effects: [openScene('scene_hsq01_01', HUASHAN_Q01_QUEST_ID)],
      },
      {
        id: 'trig_hsq01_yaowang_arrive',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        onceFlag: 'hs_q01_yaowang_triggered',
        condition: atStep(HUASHAN_Q01_QUEST_ID, 'descend_yaowang'),
        effects: [openScene('scene_hsq01_04', HUASHAN_Q01_QUEST_ID)],
      },
      {
        id: 'trig_hsq01_return_spring',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_q01_report_triggered',
        condition: atStep(HUASHAN_Q01_QUEST_ID, 'return_zixia_report'),
        effects: [openScene('scene_hsq01_11', HUASHAN_Q01_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq01_start_spring',
        label: '【华山师门】晨课演剑 · 听取山下药王庙急报',
        badge: '十二初试',
        subtitle: '入山满月 · 洗头盆清泉演剑院',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: HUASHAN_Q01_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q01_start_triggered', value: true },
          openScene('scene_hsq01_01', HUASHAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq01_start_terrace',
        label: '【华山师门】赴清泉院随高师兄晨课演剑',
        badge: '十二初试',
        subtitle: '入山满月 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: HUASHAN_Q01_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q01_start_triggered', value: true },
          openScene('scene_hsq01_01', HUASHAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq01_yaowang_raid',
        label: '【华山师门】驰援华阴药王古庙 · 剑除恶匪',
        badge: '药王除恶',
        subtitle: '第四幕 · 迎战“铁背苍狼”周横一伙',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_Q01_QUEST_ID, 'descend_yaowang'),
        effects: [
          { type: 'setFlag', flag: 'hs_q01_yaowang_triggered', value: true },
          openScene('scene_hsq01_04', HUASHAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq01_return_report',
        label: '【华山师门】呈交秦岭灵药 · 禀报药王除恶经过',
        badge: '凯旋复命',
        subtitle: '第十一幕 · 洗头盆清泉演剑院',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: atStep(HUASHAN_Q01_QUEST_ID, 'return_zixia_report'),
        effects: [
          { type: 'setFlag', flag: 'hs_q01_report_triggered', value: true },
          openScene('scene_hsq01_11', HUASHAN_Q01_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq01_start_npc',
        label: '请教入门十二式晨课 · 领受药王庙除恶历练',
        badge: '十二初试',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0202', 'NPC-0166'] },
            HUASHAN_Q01_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q01_start_triggered', value: true },
          openScene('scene_hsq01_01', HUASHAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq01_report_npc',
        label: '奉回秦岭灵药 · 禀报药王古庙除恶始末',
        badge: '药王复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0202', 'NPC-0166'] },
            atStep(HUASHAN_Q01_QUEST_ID, 'return_zixia_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q01_report_triggered', value: true },
          openScene('scene_hsq01_11', HUASHAN_Q01_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanYaowangTrialQuest.scenes').then((m) => m.SCENES),
  },
]
