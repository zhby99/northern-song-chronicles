import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE07_QUEST_ID = 'QST-SECT-05-SIDE-07'

export const HUASHAN_SIDE07_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    {
      type: 'any',
      hint: '需完成华山第 3 阶支脉核心任务（QST-SECT-05-05 或 QST-SECT-05-08）',
      conditions: [
        qStatus('QST-SECT-05-05', 'completed'),
        qStatus('QST-SECT-05-08', 'completed'),
      ],
    },
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    { type: 'skillAtLeast', key: '算术', min: 30 },
    { type: 'skillAtLeast', key: '策论', min: 25 },
    qStatus(HUASHAN_SIDE07_QUEST_ID, 'not_started'),
  ],
}

export const HUASHAN_SIDE07_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE07_QUEST_ID,
    title: '渭北麦浪 · 侠剑护夏收',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'changan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（塞外凶徒「双钩鬼哭」贺兰狰）',
    recommendedNote:
      '十二幕华山中阶侠义支线：长安西市忽闻渭北豪强「霸天虎」董万金以阴阳印子钱强吞百顷良田、暗通西夏粮贩。你亲赴麦坪当众算账拆契，力挫恶奴并斩杀重金聘来的边地凶徒「双钩鬼哭」贺兰狰，焚毁黑契护住万民夏收。',
    startHint:
      '华山第 3 阶弟子完成气/剑支脉前篇（QST-SECT-05-05 或 QST-SECT-05-08），且算术 ≥ 30、策论 ≥ 25 后，前往【长安西市 > 驼铃酒肆胡姬坊】或【草堂寺 > 烟柳麦陌渭北野坪】开启。',
    startLocation: {
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      customLabel: '长安 / 长安西市 · 驼铃酒肆胡姬坊（或草堂寺西侧渭北麦坪）',
    },
    startCondition: HUASHAN_SIDE07_START_CONDITION,
    summary:
      '{reignYear}夏麦将熟，渭北土豪「霸天虎」董万金设下利滚利阴阳黑契，妄图强吞百姓百顷麦田，将新粮偷运出塞倒卖给西夏商队。你闻讯奔赴渭北麦坪，凭精绝算术与律法策论当场拆穿毒计，复于滚滚金黄麦浪间剑破塞外凶徒「双钩鬼哭」贺兰狰，废去董万金武功并焚毁百顷黑契，令关中万户夏收得以保全。',
    initialStepId: 'weibei_audit',
    steps: {
      weibei_audit: {
        id: 'weibei_audit',
        title: '麦坪拆契 · 当众核账',
        objective:
          '渭北老里正泣血求援，豪强「霸天虎」董万金已带恶奴压境强收麦田！请速往【草堂寺 > 西侧麦陌野坪】当众核验阴阳黑契，揭穿其偷运军粮资敌之阴谋！',
        nextHint: '前往【长安 / 草堂寺 > ca_caotang_west】与董万金当众算账拆契。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_west',
        },
      },
      weibei_brawl: {
        id: 'weibei_brawl',
        title: '恶奴扑杀 · 剑护麦坪',
        objective:
          '阴阳黑契与通夏密账已被当众拆穿！董万金恼羞成怒，喝令府中恶奴拔刀灭口。请于【草堂寺 > 西侧麦陌野坪】拔剑击溃恶奴护住乡民！',
        nextHint: '在【草堂寺 > 西侧麦陌野坪】迎战董府恶奴头目。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_west',
        },
      },
      wheat_duel: {
        id: 'wheat_duel',
        title: '麦浪斩钩 · 决战贺兰狰',
        objective:
          '董万金吹响铜哨，召出重金延请的塞外一流杀手「双钩鬼哭」贺兰狰！请于【草堂寺 > 西侧麦陌野坪】金黄麦浪中拔剑死战，斩除此獠并焚毁黑契！',
        nextHint: '在【草堂寺 > 西侧麦陌野坪】迎战「双钩鬼哭」贺兰狰。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_west',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss07_xishi_start',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        onceFlag: 'hss07_intro_triggered',
        condition: HUASHAN_SIDE07_START_CONDITION,
        effects: [openScene('scene_hss07_01', HUASHAN_SIDE07_QUEST_ID)],
      },
      {
        id: 'trig_hss07_caotang_audit',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        onceFlag: 'hss07_audit_triggered',
        condition: atStep(HUASHAN_SIDE07_QUEST_ID, 'weibei_audit'),
        effects: [openScene('scene_hss07_03', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss07_start_xishi',
        label: '听取渭北老里正泣诉 · 查探豪强吞田案（开启《渭北麦浪 · 侠剑护夏收》）',
        badge: '侠剑护收',
        subtitle: '第一幕 · 长安西市主街',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        visibleWhen: HUASHAN_SIDE07_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hss07_intro_triggered', value: true },
          openScene('scene_hss07_01', HUASHAN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss07_start_caotang',
        label: '拦住渭北逃难老农 · 问明夏收黑契风波（开启《渭北麦浪 · 侠剑护夏收》）',
        badge: '侠剑护收',
        subtitle: '第一幕 · 草堂寺西侧渭北麦坪',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: HUASHAN_SIDE07_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hss07_intro_triggered', value: true },
          openScene('scene_hss07_01', HUASHAN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss07_weibei_audit',
        label: '步入渭北麦坪 · 当众核账拆穿董万金阴阳黑契',
        badge: '麦坪拆契',
        subtitle: '第三幕 · 草堂寺西侧渭北麦坪',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: atStep(HUASHAN_SIDE07_QUEST_ID, 'weibei_audit'),
        effects: [
          { type: 'setFlag', flag: 'hss07_audit_triggered', value: true },
          openScene('scene_hss07_03', HUASHAN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss07_weibei_brawl',
        label: '拔剑护民 · 击溃董府持刀恶奴',
        badge: '剑护麦坪',
        subtitle: '第六幕 · 草堂寺西侧渭北麦坪',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: atStep(HUASHAN_SIDE07_QUEST_ID, 'weibei_brawl'),
        effects: [openScene('scene_hss07_06', HUASHAN_SIDE07_QUEST_ID)],
      },
      {
        id: 'spot_hss07_wheat_duel',
        label: '踏入滚滚麦浪 · 决战「双钩鬼哭」贺兰狰',
        badge: '麦浪斩钩',
        subtitle: '第八幕 · 草堂寺西侧渭北麦坪',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: atStep(HUASHAN_SIDE07_QUEST_ID, 'wheat_duel'),
        effects: [openScene('scene_hss07_08', HUASHAN_SIDE07_QUEST_ID)],
      },
    ],

    loadScenes: () => import('./huashanSideWeibeiHarvestQuest.scenes').then((m) => m.SCENES),
  },
]
