import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q31_QUEST_ID = 'QST-SECT-01-31'

export const SHAOLIN_Q31_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-28', 'completed'),
    qStatus('QST-SECT-01-29', 'completed'),
    flag('sl_pavilion_choice', 'eq', 'ironfist'),
    qStatus(SHAOLIN_Q31_QUEST_ID, 'not_started'),
    qStatus('QST-SECT-01-30', 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 570 },
    { type: 'skillAtLeast', key: '经义', min: 78 },
    { type: 'skillAtLeast', key: '策论', min: 55 },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const SHAOLIN_Q31_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q31_QUEST_ID,
    title: '铁血伏魔 · 暗布天罗',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流上品',
    maxOpponentRealm: '宗师下品（西夏一品堂 · 黑水魔僧）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传合流分支任务（铁血伏魔线 · 全十幕）。须入寺满 570 日、完成《剑痕浴血 · 少林九阳》并于《琉璃夜影 · 曝书惊变》择定「铁血伏魔」方略、未开启《慈悲默察 · 扫叶听风》，且经义 ≥ 78、策论 ≥ 55。你密会戒律院首座玄痛与一拍神僧玄寂，亲自主持三十六精锐武僧双阶段伏魔布阵（诱饵选址 + 收网时机），可一网兜死外围一品堂死士 1v1 孤斩宗师下品黑水魔僧，或正面车轮血战诛魔，战后更决断悬首立威抑或留尸呈令，铁血威望震动少林！',
    startHint:
      '入寺满 570 日、完成《剑痕浴血 · 少林九阳》、于《曝书惊变》选择铁血伏魔且经义 ≥ 78、策论 ≥ 55 后，前往【嵩山少林寺 · 藏经阁 · 重檐琉璃藏经主阁】（或寻玄痛、玄寂）共商伏魔天罗之计。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      customLabel: '嵩山少林寺 · 藏经阁 · 重檐琉璃藏经主阁',
    },
    startCondition: SHAOLIN_Q31_START_CONDITION,
    summary:
      '{reignYear}寒秋，你依七夕曝书之夜立下的「铁血伏魔」方略，于【重檐琉璃藏经主阁】密会戒律院首座【玄痛】与一拍神僧【玄寂】，亲自主持三十六名戒律与罗汉堂精锐武僧布下「伏魔天罗铁网」！子夜三更，奉西夏一品堂之命潜入盗取宋夏边防阵图与绝技兵书的宗师下品客卿【黑水魔僧】携死士踏入死局。你精准调度诱饵与收网时机，于火光冲天的琉璃阁前亲手斩毙黑水魔僧、夺回兵书与一品堂玄铁令，战后铁腕立威震慑四夷！',
    initialStepId: 'deploy_iron_net',
    steps: {
      deploy_iron_net: {
        id: 'deploy_iron_net',
        title: '密会布网 · 天罗待敌',
        objective:
          '你已与玄痛、玄寂拟定「伏魔天罗铁网」之策，三十六名精锐武僧皆已暗伏藏经阁周遭！请留在【藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】，待子夜信号响起，亲控收网时机截杀西夏黑水魔僧！',
        nextHint:
          '在【藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】点击「收网伏魔 · 子夜截杀西夏黑水魔僧」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_pavilion',
          customLabel: '嵩山少林寺 · 藏经阁 · 重檐琉璃藏经主阁',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq31_start_pavilion',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        onceFlag: 'sl_q31_start_triggered',
        condition: SHAOLIN_Q31_START_CONDITION,
        effects: [openScene('scene_slq31_01', SHAOLIN_Q31_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq31_start_pavilion',
        label: '【少林伏魔】密会玄痛玄寂 · 议布藏经阁天罗铁网',
        badge: '暗布天罗',
        subtitle: '重檐琉璃藏经主阁 · 铁血伏魔线',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        visibleWhen: SHAOLIN_Q31_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q31_start_triggered', value: true },
          openScene('scene_slq31_01', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq31_ambush_pavilion',
        label: '【少林伏魔】收网伏魔 · 子夜截杀西夏黑水魔僧',
        badge: '决战魔僧',
        subtitle: '重檐琉璃藏经主阁（收网决断 · 宗师下品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        visibleWhen: atStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
        effects: [openScene('scene_slq31_03', SHAOLIN_Q31_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_slq31_start_npc',
        label: '密禀玄痛玄寂 · 开启【铁血伏魔 · 暗布天罗】',
        badge: '暗布天罗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156', 'NPC-0134'] },
            SHAOLIN_Q31_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q31_start_triggered', value: true },
          openScene('scene_slq31_01', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'act_slq31_ambush_npc',
        label: '号令三十六武僧收网 · 截杀西夏黑水魔僧',
        badge: '决战魔僧',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156', 'NPC-0134'] },
            atStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
          ],
        },
        effects: [openScene('scene_slq31_03', SHAOLIN_Q31_QUEST_ID)],
      },
    ],

    loadScenes: () => import('./shaolinIronNetTrapQuest.scenes').then((m) => m.SCENES),
  },
]
