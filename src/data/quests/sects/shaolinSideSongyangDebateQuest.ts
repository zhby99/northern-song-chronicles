import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE05_QUEST_ID = 'QST-SECT-01-SIDE-05'

export const SHAOLIN_SIDE05_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-ENTRY', 'completed'),
    qStatus(SHAOLIN_SIDE05_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 35 },
    { type: 'skillAtLeast', key: '辩才', min: 25 },
    { type: 'npcAlive', npcId: 'NPC-0498', npcName: '虚广' },
  ],
}

export const SHAOLIN_SIDE05_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE05_QUEST_ID,
    title: '嵩阳借书 · 儒释之辩',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流上品',
    maxOpponentRealm: '三流上品（狂生雇佣武师 · 雷震子）',
    recommendedNote:
      '少林寺 Lv.1 外门文武支线（全九幕）。经义与辩才兼具后，于少林藏经阁西厢晒经校勘石台奉虚广之托赴太室山南麓嵩阳书院归还孤本古籍，于千年汉柏下亲历两轮无提示儒释公案辩论折服排佛狂生，再于杏坛石阶点到为止挫败雇佣武师雷震子，促成两院藏书互通。',
    startHint:
      '拜入嵩山少林寺并精修经义与辩才后，前往【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台】寻虚广即可领命。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      customLabel: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
    },
    startCondition: SHAOLIN_SIDE05_START_CONDITION,
    summary:
      '{reignYear}秋爽，少林藏经阁校勘旧籍告一段落。虚广见你经义湛深、口才便给，托你携借阅孤本赴太室山南麓「嵩阳书院」奉还，并洽谈两院古籍互借之约。你先往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱】领妥勘合文牒，随即捧匣下山。不料刚入嵩阳书院，便遭排佛狂生周迂夫连抛「忠孝众生」「致用明心」两道难关发难！你于汉柏杏坛从容论辩儒释圆融互补之理，再以点到为止的少林武艺折服狂生雇来的武师「雷震子」，终获程山长赞许，定下两院藏书互通佳约。',
    initialStepId: 'visit_songyang',
    steps: {
      visit_songyang: {
        id: 'visit_songyang',
        title: '领牒下山 · 嵩阳还书',
        objective:
          '已领虚广所托！请携三卷校勘孤本先往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】领妥藏经勘合文牒，随即启程赴太室山南麓嵩阳书院还书。',
        nextHint:
          '前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，点击「领妥藏经勘合文牒，携书赴嵩阳书院」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_east',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
        },
      },
      return_report: {
        id: 'return_report',
        title: '怀契归林 · 复命藏经阁',
        objective:
          '嵩阳杏坛儒释之辩已结硕果，山长已亲笔立下两院藏书互通之约！请返回【少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】向虚广复命。',
        nextHint:
          '返回【少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】，点击「向虚广呈上嵩阳书院藏书互通契书」或与虚广交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_terrace',
          customLabel: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls05_start_terrace',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_side05_start_triggered',
        condition: SHAOLIN_SIDE05_START_CONDITION,
        effects: [openScene('scene_sls05_01', SHAOLIN_SIDE05_QUEST_ID)],
      },
      {
        id: 'trig_sls05_visit_daxiong_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_side05_songyang_triggered',
        condition: atStep(SHAOLIN_SIDE05_QUEST_ID, 'visit_songyang'),
        effects: [openScene('scene_sls05_02', SHAOLIN_SIDE05_QUEST_ID)],
      },
      {
        id: 'trig_sls05_return_terrace',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_side05_report_triggered',
        condition: atStep(SHAOLIN_SIDE05_QUEST_ID, 'return_report'),
        effects: [openScene('scene_sls05_09', SHAOLIN_SIDE05_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls05_start',
        label: '【少林支线】问询嵩阳书院借阅孤本事宜',
        badge: '嵩阳借书',
        subtitle: '西厢晒经校勘石台',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: SHAOLIN_SIDE05_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side05_start_triggered', value: true },
          openScene('scene_sls05_01', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls05_visit',
        label: '【少林支线】领妥藏经勘合文牒，携书赴嵩阳书院',
        badge: '儒释之辩',
        subtitle: '东厢碑廊 · 藏经橱',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_SIDE05_QUEST_ID, 'visit_songyang'),
        effects: [
          { type: 'setFlag', flag: 'sl_side05_songyang_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side05_lei_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls05_05', SHAOLIN_SIDE05_QUEST_ID)],
            elseEffects: [openScene('scene_sls05_02', SHAOLIN_SIDE05_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls05_return',
        label: '【少林支线】向虚广呈上嵩阳书院藏书互通契书',
        badge: '藏经互通',
        subtitle: '西厢晒经校勘石台',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: atStep(SHAOLIN_SIDE05_QUEST_ID, 'return_report'),
        effects: [
          { type: 'setFlag', flag: 'sl_side05_report_triggered', value: true },
          openScene('scene_sls05_09', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls05_start_npc',
        label: '请命代赴嵩阳书院奉还校勘孤本',
        badge: '嵩阳借书',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0498'] },
            SHAOLIN_SIDE05_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side05_start_triggered', value: true },
          openScene('scene_sls05_01', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'act_sls05_report_npc',
        label: '向虚广师兄呈报嵩阳论辩与两院互通契书',
        badge: '藏经互通',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0498'] },
            atStep(SHAOLIN_SIDE05_QUEST_ID, 'return_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side05_report_triggered', value: true },
          openScene('scene_sls05_09', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideSongyangDebateQuest.scenes').then((m) => m.SCENES),
  },
]
