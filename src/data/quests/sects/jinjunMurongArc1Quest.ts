import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const JINJUN_MURONG_ARC_1_ID = 'QST-SECT-33-MURONG-ARC-1'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    {
      type: 'shichenIn',
      indices: [10, 11, 0],
      label: '秋雨深夜急召时辰（亥时、子时、丑时）',
    },
    { type: 'npcAlive', npcId: 'NPC-0038', npcName: '王德用' },
    { type: 'npcAlive', npcId: 'NPC-0120', npcName: '慕容复' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-0214', npcName: '风波恶' },
    qStatus(JINJUN_MURONG_ARC_1_ID, 'not_started'),
    qStatus(JINJUN_MURONG_ARC_1_ID, 'not_completed'),
  ],
}

export const JINJUN_MURONG_ARC_1_QUEST: QuestDefinition = {
  id: JINJUN_MURONG_ARC_1_ID,
  title: '破燕 · 壹 · 汴梁暗影',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '一流中品 ~ 一流上品',
  maxOpponentRealm: '一流下品 ~ 一流中品（风波恶 · 汴河截击）',
  recommendedNote:
    '大宋禁军《破燕三部曲》第一部（全十五幕）。触发条件：身居大宋禁军 Lv.4【三衙都虞候】，于夜间（亥/子/丑时）前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】受领枢密院急召。',
  startHint:
    '任大宋禁军 Lv.4 三衙都虞候后，于亥、子、丑三更夜间前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】接枢密院急召开启。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_jinjun',
    spotId: 'bl_jj_platform',
    customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
  },
  startCondition: START_CONDITION,
  initialStepId: 'probe_xiangguosi',
  summary:
    '东京汴梁秋雨连绵，三衙都虞候深夜被急召入枢密院：军器监督造的破辽利器“神臂弓”总图、三具样弩与火药箭秘方不翼而飞，两名值守武官死于自家家传刀法！主角验尸识破“借力打力”之术，并寻得沾有太湖水汽的苏绣帕子与碧螺春茶香；顺藤摸瓜暗访大相国寺瓦子与甜水巷酒肆，缉拿欲南逃的军器监胥吏，审出买通者乃姑苏慕容氏家将邓百川与包不同。主角率亲卫直扑汴河漕运码头，力战击败断后的“一阵风”风波恶，搜出密信得知慕容复正赶往少室山图谋武林盟主，遂回禀枢密院请下海捕钧旨，点齐一千披坚执锐的殿前司禁军星夜驰援少室山！',
  steps: {
    probe_xiangguosi: {
      id: 'probe_xiangguosi',
      title: '暗访瓦子 · 寻查江南商踪',
      objective:
        '军器监遗落的苏绣帕子与碧螺春茶香直指江南商贾！请前往【开封府 · 大相国寺 · 相国寺万姓交易雅市】暗访瓦子茶肆，摸排近日出手阔绰的可疑之人。',
      nextHint: '前往【大相国寺 · 相国寺万姓交易雅市（bl_xg_market）】，点击「暗访瓦子茶肆 · 排查江南线索」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
      },
    },
    capture_clerk_tavern: {
      id: 'capture_clerk_tavern',
      title: '甜水销金 · 缉拿军器监胥吏',
      objective:
        '瓦子线报指向一名连夜变卖家产、正在甜水巷销金窟豪掷千金的军器监胥吏！请前往【开封府 · 汴河虹桥 · 临水酒肆】将其拿获审讯！',
      nextHint: '前往【汴河虹桥 · 临水酒肆（bianliang_base_tavern）】，点击「擒拿军器监胥吏 · 严刑审讯」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        customLabel: '开封府 · 汴河虹桥 · 临水酒肆',
      },
    },
    intercept_canal_wharf: {
      id: 'intercept_canal_wharf',
      title: '汴河截击 · 战一阵风风波恶',
      objective:
        '胥吏供出买通他的正是伪装成苏州绸缎商的慕容氏家将邓百川与包不同！请率亲卫火速扑向【开封府 · 汴河漕运巡检司】码头截击运弓快船！',
      nextHint: '前往【汴河漕运巡检司（bianliang_base_yamen）】，点击「封锁漕运码头 · 迎战风波恶」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bianliang_base_yamen',
        customLabel: '开封府 · 汴河漕运巡检司',
      },
    },
    report_and_muster: {
      id: 'report_and_muster',
      title: '请旨点兵 · 千军发少室山',
      objective:
        '已从码头搜出密信：神臂弓运往江南仿造，慕容复正赶往少室山图谋武林盟主！请火速返回【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】禀报枢密使王德用，请下海捕钧旨点兵一千直奔少室山！',
      nextHint: '返回【八十万禁军大教场 · 擂鼓聚将点兵帅台（bl_jj_platform）】，点击「呈报密信请旨 · 点兵一千发少室山」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_platform',
        customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_mr1_start',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      onceFlag: 'jj_mr1_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_MURONG_ARC_1_ID, stepId: 'probe_xiangguosi' },
        openScene('scene_jj_mr1_01_rainy_summons', JINJUN_MURONG_ARC_1_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_mr1_start_manual',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      label: '【破燕 · 壹】深夜急召 · 军器监神臂弓失窃案',
      subtitle: '秋雨夜奉枢密院急召，查办破辽利器神臂弓失窃惊天大案。',
      tone: 'danger',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_MURONG_ARC_1_ID, stepId: 'probe_xiangguosi' },
        openScene('scene_jj_mr1_01_rainy_summons', JINJUN_MURONG_ARC_1_ID),
      ],
    },
    {
      id: 'act_jj_mr1_xiangguosi',
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_market',
      label: '【破燕 · 壹】暗访瓦子茶肆 · 排查江南线索',
      subtitle: '顺着苏绣帕子与碧螺春茶香，在相国寺瓦子暗访买通胥吏的眼线。',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_MURONG_ARC_1_ID, 'probe_xiangguosi'),
      effects: [openScene('scene_jj_mr1_04_xiangguosi_market', JINJUN_MURONG_ARC_1_ID)],
    },
    {
      id: 'act_jj_mr1_tavern',
      regionId: 'bianliang',
      buildingId: 'bianliang_base_tavern',
      label: '【破燕 · 壹】擒拿军器监胥吏 · 严刑审讯',
      subtitle: '在甜水巷销金窟拿获欲举家南逃的军器监胥吏，撬出慕容家将名号。',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_MURONG_ARC_1_ID, 'capture_clerk_tavern'),
      effects: [openScene('scene_jj_mr1_06_capture_clerk', JINJUN_MURONG_ARC_1_ID)],
    },
    {
      id: 'act_jj_mr1_wharf',
      regionId: 'bianliang',
      buildingId: 'bianliang_base_yamen',
      label: '【破燕 · 壹】封锁漕运码头 · 迎战风波恶',
      subtitle: '直扑汴河漕运码头截击运弓快船，1v1 迎战“一阵风”风波恶！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_MURONG_ARC_1_ID, 'intercept_canal_wharf'),
      effects: [openScene('scene_jj_mr1_09_wharf_raid', JINJUN_MURONG_ARC_1_ID)],
    },
    {
      id: 'act_jj_mr1_muster',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      label: '【破燕 · 壹】呈报密信请旨 · 点兵一千发少室山',
      subtitle: '请下枢密院海捕钧旨，调拨一千殿前司精锐星夜驰援少室山！',
      tone: 'gold',
      visibleWhen: atStep(JINJUN_MURONG_ARC_1_ID, 'report_and_muster'),
      effects: [openScene('scene_jj_mr1_13_privy_report', JINJUN_MURONG_ARC_1_ID)],
    },
  ],
  loadScenes: () => import('./jinjunMurongArc1Quest.scenes').then((m) => m.SCENES),
}

export const JINJUN_MURONG_ARC_1_QUESTS: readonly QuestDefinition[] = [JINJUN_MURONG_ARC_1_QUEST]
