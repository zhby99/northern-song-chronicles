import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q31_QUEST_ID = 'QST-SECT-01-31'

export const SHAOLIN_Q31_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-28', 'completed'),
    flag('sl_pavilion_choice', 'eq', 'ironfist'),
    qStatus(SHAOLIN_Q31_QUEST_ID, 'not_started'),
    qStatus('QST-SECT-01-30', 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 5475 },
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
      '嵩山少林寺 Lv.3 真传合流分支任务（铁血伏魔线 · 全二十幕）。须入寺满十五载（5475 日）、于《琉璃夜影 · 曝书惊变》择定「铁血伏魔」方略、未开启《慈悲默察 · 扫叶听风》，且经义 ≥ 78、策论 ≥ 55。你密会戒律院首座玄痛与一拍神僧玄寂，运筹帷幄抽调三十六名精锐武僧于藏经主阁周遭暗布「伏魔天罗铁网」；子夜伏击潜入盗取宋夏边防秘卷与绝技兵书的西夏一品堂宗师下品「黑水魔僧」，亲手将其斩毙于琉璃阁前，铁血护寺威望震动全寺！',
    startHint:
      '入寺满 5475 日、于《曝书惊变》选择铁血伏魔且经义 ≥ 78、策论 ≥ 55 后，前往【嵩山少林寺 · 藏经阁 · 重檐琉璃藏经主阁】（或寻玄痛、玄寂）共商伏魔天罗之计。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      customLabel: '嵩山少林寺 · 藏经阁 · 重檐琉璃藏经主阁',
    },
    startCondition: SHAOLIN_Q31_START_CONDITION,
    summary:
      '{reignYear}寒秋，你依七夕曝书之夜立下的「铁血伏魔」方略，于【重檐琉璃藏经主阁】密会戒律院首座【玄痛】与一拍神僧【玄寂】。三人凭你测绘的飞檐暗道图与五十五重以上兵略策论，秘密抽调三十六名少林精锐武僧，以精钢链网、伏魔铜棍在藏经主阁内外布下密不透风的「伏魔天罗阵」！子夜三更，一名奉西夏一品堂之命潜入盗取兵书与少林绝技的宗师下品恶客「黑水魔僧」果真踏入死局。你率阵合围、亲身截杀，于琉璃阁前血战击毙黑水魔僧、夺回失窃典籍，铁血护寺之威自此震动少林上下！',
    initialStepId: 'deploy_iron_net',
    steps: {
      deploy_iron_net: {
        id: 'deploy_iron_net',
        title: '密会布网 · 天罗待敌',
        objective:
          '你已与玄痛、玄寂拟定「伏魔天罗铁网」之策，三十六名精锐武僧皆已暗伏藏经阁周遭！请留在【藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】，待子夜信号响起，亲率伏兵截杀潜入之西夏魔僧！',
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
        subtitle: '重檐琉璃藏经主阁（决战宗师下品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        visibleWhen: atStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
        effects: [openScene('scene_slq31_08', SHAOLIN_Q31_QUEST_ID)],
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
        effects: [openScene('scene_slq31_08', SHAOLIN_Q31_QUEST_ID)],
      },
    ],

    loadScenes: () => import('./shaolinIronNetTrapQuest.scenes').then((m) => m.SCENES),
  },
]
