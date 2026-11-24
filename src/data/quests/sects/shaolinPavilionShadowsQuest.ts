import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q28_QUEST_ID = 'QST-SECT-01-28'

export const SHAOLIN_Q28_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    {
      type: 'any',
      conditions: [
        qStatus('QST-SECT-01-23', 'completed'),
        qStatus('QST-SECT-01-25', 'completed'),
        qStatus('QST-SECT-01-27', 'completed'),
      ],
      hint: '完成任一 Lv.3 真传高阶功法任务',
    },
    qStatus(SHAOLIN_Q28_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 480 },
    { type: 'skillAtLeast', key: '经义', min: 78 },
    { type: 'skillAtLeast', key: '书', min: 65 },
    { type: 'npcAlive', npcId: 'NPC-0498', npcName: '虚广' },
    { type: 'npcAlive', npcId: 'NPC-0648', npcName: '虚光' },
  ],
}

export const SHAOLIN_Q28_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q28_QUEST_ID,
    title: '琉璃夜影 · 曝书惊变',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流中品 ～ 一流上品',
    maxOpponentRealm: '宗师下品（藏经阁黑影交锋 · 试探五合）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传合流主线第一回（全十一幕）。须入寺满 480 日、完成任一 Lv.3 真传高阶功法任务，且经义 ≥ 78、书法 ≥ 65。七月初七晒经节暴雨夜，你与虚广、虚光抢收经卷后潜入重檐琉璃藏经主阁，从三处细微痕迹推演潜伏绝顶高人，撞见灰衣老僧与黑衣夜行客无声对掌；古松五合试锋后自案缝查获两份笔锋迥异的绝技批注残笺，终在「慈悲默察」与「铁血伏魔」双轨治寺方略间择定前路！',
    startHint:
      '入寺满 480 日、完成任一 Lv.3 真传高阶功法任务且经义 ≥ 78、书 ≥ 65 后，前往【嵩山少林寺 · 藏经阁 · 西厢晒经校勘石台】（或寻虚广、虚光）触发七夕晒经之变。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      customLabel: '嵩山少林寺 · 藏经阁 · 西厢晒经校勘石台',
    },
    startCondition: SHAOLIN_Q28_START_CONDITION,
    summary:
      '{reignYear}七月初七晒经节，嵩山忽降倾盆暴雨。你在【西厢晒经校勘石台】助虚广、虚光抢收贝叶古卷后，子夜携灯重巡【重檐琉璃藏经主阁】，于经橱蛛丝马迹间察觉潜伏多年的绝世异动，更亲眼撞见灰衣老僧与黑衣高大客人在琉璃檐下无声对掌！你纵身截击，与黑衣夜影在松林雨幕中试探交锋五合，复于阁中案缝查获两份笔迹与指印截然不同的绝技批注残笺。黎明古杏之下，面对潜伏藏经阁多年的惊天暗流，你在「慈悲默察」与「铁血伏魔」之间立定治寺方略，由此开启扫叶听风或暗布天罗的双轨前尘。',
    initialStepId: 'night_pavilion_patrol',
    steps: {
      night_pavilion_patrol: {
        id: 'night_pavilion_patrol',
        title: '暴雨夜巡 · 琉璃惊影',
        objective:
          '晒经节暴雨骤至，经卷方才抢收归阁，西厢石阶却遗落半枚窄长草鞋湿印直指主阁！请前往【藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】夜巡勘察，揭开阁中异动。',
        nextHint:
          '前往【藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】，点击「提灯入藏经主阁 · 夜探琉璃阁异动」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_pavilion',
          customLabel: '嵩山少林寺 · 藏经阁 · 重檐琉璃藏经主阁',
        },
      },
      residual_notes_choice: {
        id: 'residual_notes_choice',
        title: '案缝残笺 · 治寺方略',
        objective:
          '雨夜松林与黑衣夜影五合试锋后，你已于藏经主阁案缝查获两份笔锋与指印迥异的绝技批注残笺！请前往【藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】或留在【重檐琉璃藏经主阁（sl_cj_pavilion）】，静思潜伏暗流并择定治寺方略。',
        nextHint:
          '在【藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】或【重檐琉璃藏经主阁（sl_cj_pavilion）】点击「端详案缝残笺 · 择定藏经阁治寺方略」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_terrace',
          customLabel: '嵩山少林寺 · 藏经阁 · 西厢晒经校勘石台',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq28_start_terrace',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_q28_start_triggered',
        condition: SHAOLIN_Q28_START_CONDITION,
        effects: [openScene('scene_slq28_01', SHAOLIN_Q28_QUEST_ID)],
      },
      {
        id: 'trig_slq28_pavilion_patrol',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        onceFlag: 'sl_q28_patrol_triggered',
        condition: atStep(SHAOLIN_Q28_QUEST_ID, 'night_pavilion_patrol'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q28_shadow_fought', op: 'truthy' },
            thenEffects: [openScene('scene_slq28_07', SHAOLIN_Q28_QUEST_ID)],
            elseEffects: [openScene('scene_slq28_02', SHAOLIN_Q28_QUEST_ID)],
          },
        ],
      },
      {
        id: 'trig_slq28_choice_terrace',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_q28_choice_triggered',
        condition: atStep(SHAOLIN_Q28_QUEST_ID, 'residual_notes_choice'),
        effects: [openScene('scene_slq28_08', SHAOLIN_Q28_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq28_start_terrace',
        label: '【少林主线】七夕晒经 · 助虚广虚光校勘曝书',
        badge: '曝书惊变',
        subtitle: '西厢晒经校勘石台 · 暴雨将至',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: SHAOLIN_Q28_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q28_start_triggered', value: true },
          openScene('scene_slq28_01', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq28_pavilion_patrol',
        label: '【少林主线】提灯入藏经主阁 · 夜探琉璃阁异动',
        badge: '琉璃夜影',
        subtitle: '重檐琉璃藏经主阁 · 勘微与五合试锋',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        visibleWhen: atStep(SHAOLIN_Q28_QUEST_ID, 'night_pavilion_patrol'),
        effects: [
          { type: 'setFlag', flag: 'sl_q28_patrol_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q28_shadow_fought', op: 'truthy' },
            thenEffects: [openScene('scene_slq28_07', SHAOLIN_Q28_QUEST_ID)],
            elseEffects: [openScene('scene_slq28_02', SHAOLIN_Q28_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq28_choice_terrace',
        label: '【少林主线】端详案缝残笺 · 择定藏经阁治寺方略',
        badge: '方略抉择',
        subtitle: '西厢晒经校勘石台 · 慈悲默察或铁血伏魔',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: atStep(SHAOLIN_Q28_QUEST_ID, 'residual_notes_choice'),
        effects: [
          { type: 'setFlag', flag: 'sl_q28_choice_triggered', value: true },
          openScene('scene_slq28_08', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq28_choice_pavilion',
        label: '【少林主线】重审经橱残笺 · 决断藏经阁应对之策',
        badge: '方略抉择',
        subtitle: '重檐琉璃藏经主阁 · 慈悲默察或铁血伏魔',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        visibleWhen: atStep(SHAOLIN_Q28_QUEST_ID, 'residual_notes_choice'),
        effects: [
          { type: 'setFlag', flag: 'sl_q28_choice_triggered', value: true },
          openScene('scene_slq28_08', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq28_start_npc',
        label: '合十相助晒经校勘 · 开启【琉璃夜影 · 曝书惊变】',
        badge: '曝书惊变',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0498', 'NPC-0648'] },
            SHAOLIN_Q28_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q28_start_triggered', value: true },
          openScene('scene_slq28_01', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'act_slq28_choice_npc',
        label: '就藏经阁案缝残笺密议 · 择定治寺方略',
        badge: '方略抉择',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0498', 'NPC-0648'] },
            atStep(SHAOLIN_Q28_QUEST_ID, 'residual_notes_choice'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q28_choice_triggered', value: true },
          openScene('scene_slq28_08', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinPavilionShadowsQuest.scenes').then((m) => m.SCENES),
  },
]
