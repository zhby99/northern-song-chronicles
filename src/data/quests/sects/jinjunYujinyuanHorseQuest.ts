import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const JINJUN_YUJINYUAN_HORSE_QUEST_ID = 'QST-SECT-33-YUJINYUAN-HORSE'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 3 },
    { type: 'sectDaysAtLeast', sectId: 'SECT-33', min: 60 },
    {
      type: 'shichenIn',
      indices: [3, 4, 5, 6],
      label: '白昼演武时辰（卯时、辰时、巳时、午时）',
    },
    { type: 'skillAtLeast', key: '骑术', min: 65 },
    {
      type: 'any',
      hint: '文武兼修（诗词 ≥ 50 或 策论 ≥ 50）',
      conditions: [
        { type: 'skillAtLeast', key: '诗词', min: 50 },
        { type: 'skillAtLeast', key: '策论', min: 50 },
      ],
    },
    { type: 'talentAtLeast', key: '颜值', min: 72 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0043', min: 20, npcName: '高怀亮' },
    { type: 'npcAlive', npcId: 'NPC-0043', npcName: '高怀亮' },
    { type: 'npcAlive', npcId: 'NPC-0154', npcName: '林铁衣' },
    { type: 'npcAlive', npcId: 'NPC-0007', npcName: '曹佾' },
    { type: 'npcAlive', npcId: 'NPC-0252', npcName: '杨排风' },
    qStatus(JINJUN_YUJINYUAN_HORSE_QUEST_ID, 'not_started'),
    qStatus(JINJUN_YUJINYUAN_HORSE_QUEST_ID, 'not_completed'),
  ],
}

export const JINJUN_YUJINYUAN_HORSE_QUEST: QuestDefinition = {
  id: JINJUN_YUJINYUAN_HORSE_QUEST_ID,
  title: '玉津园 · 春日校马记',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '一流中品 ~ 一流上品',
  maxOpponentRealm: '一流上品（贺兰铁戟）',
  recommendedNote:
    '大宋禁军 Lv.3【四厢都指挥】独立支线（全十幕）。须入禁军满60日、白昼（卯~午时）赴大教场，且骑术≥65、诗词或策论≥50、颜值≥72、高怀亮好感≥20方能受邀。',
  startHint:
    '任大宋禁军 Lv.3 满 60 日且达标骑术/文略/颜值后，于白昼卯~午时前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】触发。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_jinjun',
    spotId: 'bl_jj_platform',
    customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
  },
  startCondition: START_CONDITION,
  initialStepId: 'archery_field_contest',
  summary:
    '春日暖风吹拂京郊，禁军名将曹佾与高怀亮在大教场筹办春日校马雅集，邀新晋四厢都指挥压阵。你先于驰道驯服河曲烈马、复与女将杨排风点到为止切磋试手，再于百步靶场较箭、以诗词兵略化解勋戚文武之争。不料雅集正酣之际，一名受雇于西夏黑市的狂徒“贺兰铁戟”竟闯营踢馆挑衅！你在林铁衣注目下 1v1 击败这名一流上品强敌，大振军威，获林铁衣亲授破招心得与大宋边军克敌弓。',
  steps: {
    archery_field_contest: {
      id: 'archery_field_contest',
      title: '百步靶场 · 较箭论略',
      objective:
        '驯服河曲烈马并与杨排风切磋后，众人移步【开封府 · 八十万禁军大教场 · 神臂骑射驰道围栏】展开较箭比试与文武雅论！',
      nextHint: '前往【八十万禁军大教场 · 神臂骑射驰道围栏（bl_jj_archery）】，点击「赴驰道较箭 · 出席雅集」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_archery',
        customLabel: '开封府 · 八十万禁军大教场 · 神臂骑射驰道围栏',
      },
    },
    repel_challenger: {
      id: 'repel_challenger',
      title: '长枪方阵 · 力挫狂徒',
      objective:
        '塞外狂徒“贺兰铁戟”竟敢在【开封府 · 八十万禁军大教场 · 禁军长枪方阵演武坪】当众踢馆辱我禁军！请速赴演武坪迎战这名一流上品强敌！',
      nextHint: '前往【八十万禁军大教场 · 禁军长枪方阵演武坪（bl_jj_spear）】，点击「登坪迎战贺兰铁戟」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_spear',
        customLabel: '开封府 · 八十万禁军大教场 · 禁军长枪方阵演武坪',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_yj_start',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      onceFlag: 'jj_yj_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID, stepId: 'archery_field_contest' },
        openScene('scene_jj_yj_01_spring_muster', JINJUN_YUJINYUAN_HORSE_QUEST_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_yj_start_manual',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      label: '【禁军雅集】赴玉津园春日校马会',
      subtitle: '应高怀亮与曹佾之邀，主持禁军春日校马与军中大比。',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID, stepId: 'archery_field_contest' },
        openScene('scene_jj_yj_01_spring_muster', JINJUN_YUJINYUAN_HORSE_QUEST_ID),
      ],
    },
    {
      id: 'act_jj_yj_archery',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_archery',
      label: '【禁军雅集】赴驰道较箭 · 出席雅集',
      subtitle: '于神臂骑射驰道比试箭艺，并以文略化解勋戚之争。',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_YUJINYUAN_HORSE_QUEST_ID, 'archery_field_contest'),
      effects: [openScene('scene_jj_yj_04_archery_contest', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
    },
    {
      id: 'act_jj_yj_spear',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_spear',
      label: '【禁军雅集】登坪迎战贺兰铁戟',
      subtitle: '迎战闯营踢馆的一流上品狂徒“贺兰铁戟”，大振大宋军威！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_YUJINYUAN_HORSE_QUEST_ID, 'repel_challenger'),
      effects: [openScene('scene_jj_yj_08_repel_challenger', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./jinjunYujinyuanHorseQuest.scenes').then((m) => m.SCENES),
}

export const JINJUN_YUJINYUAN_HORSE_QUESTS: readonly QuestDefinition[] = [JINJUN_YUJINYUAN_HORSE_QUEST]
