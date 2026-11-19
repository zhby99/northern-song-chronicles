import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE01_QUEST_ID = 'QST-SECT-01-SIDE-01'

export const SHAOLIN_SIDE01_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-ENTRY', 'completed'),
    qStatus(SHAOLIN_SIDE01_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0842', npcName: '虚真' },
  ],
}

export const SHAOLIN_SIDE01_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE01_QUEST_ID,
    title: '灶房残薪 · 烧火奇棍',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '不入流 ～ 三流下品',
    maxOpponentRealm: '三流下品（偷粮贼首 · 瘦猴孙七）',
    recommendedNote:
      '嵩山少林寺 Lv.1 外门日常支线（全十幕）。于罗汉堂演武正殿偶遇虚真与自汴梁大相国寺回山述职的烧火僧觉尘，助大斋堂担水添薪并在夜半以焦黑烧火棍击退潜入粮仓的偷粮三贼，悟得《少林烧火棍》并获赠老枣木【少室灶房烧火棍】。',
    startHint:
      '正式拜入少林外门后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿】寻虚真即可触发大斋堂帮厨奇遇。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    },
    startCondition: SHAOLIN_SIDE01_START_CONDITION,
    summary:
      '{reignYear}汴梁大相国寺烧火僧【觉尘】奉差回嵩山述职，与【虚真】在罗汉堂大斋堂劈柴生火、筹备千僧斋粮。你热心上前担水添薪，无意间得觉尘点拨灶膛拨火捅灰的刁钻巧劲。是夜三更，三名偷粮毛贼潜入大斋堂粮仓，你仓促间顺手抄起灶旁焦黑老枣木烧火棍，在觉尘口诀指点下连戳三贼下盘，将贼首【瘦猴孙七】与两名同伙打得满脸锅底乌灰、连连求饶，不仅惹得满院僧众哄堂大笑，更一举悟透质朴奇诡的《少林烧火棍》。',
    initialStepId: 'kitchen_night_watch',
    steps: {
      kitchen_night_watch: {
        id: 'kitchen_night_watch',
        title: '灶堂添薪 · 夜护斋粮',
        objective:
          '已应虚真与觉尘之请帮大斋堂担水劈柴！请留在【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】旁大斋堂灶房添薪习棍，并提防夜半潜入偷粮的毛贼。',
        nextHint:
          '在【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】点击「赴大斋堂灶房 · 助觉尘添薪并夜守粮仓」或与虚真交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_main',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls01_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_side01_start_triggered',
        condition: SHAOLIN_SIDE01_START_CONDITION,
        effects: [openScene('scene_sls01_01', SHAOLIN_SIDE01_QUEST_ID)],
      },
      {
        id: 'trig_sls01_kitchen_watch',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_side01_watch_triggered',
        condition: atStep(SHAOLIN_SIDE01_QUEST_ID, 'kitchen_night_watch'),
        effects: [openScene('scene_sls01_03', SHAOLIN_SIDE01_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls01_start_main',
        label: '【少林支线】问询大斋堂劈柴生火之事',
        badge: '烧火奇棍',
        subtitle: '罗汉堂演武正殿 · 虚真与觉尘',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: SHAOLIN_SIDE01_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side01_start_triggered', value: true },
          openScene('scene_sls01_01', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls01_kitchen_watch',
        label: '【少林支线】赴大斋堂灶房 · 助觉尘添薪并夜守粮仓',
        badge: '灶房护粮',
        subtitle: '罗汉堂演武正殿 · 习拨火棍诀退毛贼',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: atStep(SHAOLIN_SIDE01_QUEST_ID, 'kitchen_night_watch'),
        effects: [
          { type: 'setFlag', flag: 'sl_side01_watch_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side01_thieves_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls01_07', SHAOLIN_SIDE01_QUEST_ID)],
            elseEffects: [openScene('scene_sls01_03', SHAOLIN_SIDE01_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls01_start_npc',
        label: '问询觉尘师叔回山帮厨与大斋堂担水添薪之事',
        badge: '烧火奇棍',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0842'] },
            SHAOLIN_SIDE01_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side01_start_triggered', value: true },
          openScene('scene_sls01_01', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'act_sls01_watch_npc',
        label: '随虚真赴大斋堂灶房添薪并夜守粮仓',
        badge: '灶房护粮',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0842'] },
            atStep(SHAOLIN_SIDE01_QUEST_ID, 'kitchen_night_watch'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side01_watch_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side01_thieves_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls01_07', SHAOLIN_SIDE01_QUEST_ID)],
            elseEffects: [openScene('scene_sls01_03', SHAOLIN_SIDE01_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideFireStickQuest.scenes').then((m) => m.SCENES),
  },
]
