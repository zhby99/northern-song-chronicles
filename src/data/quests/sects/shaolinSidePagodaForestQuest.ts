import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE04_QUEST_ID = 'QST-SECT-01-SIDE-04'

export const SHAOLIN_SIDE04_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-ENTRY', 'completed'),
    qStatus(SHAOLIN_SIDE04_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 150 },
    { type: 'shichenIn', indices: [10, 11, 0, 1], label: '亥时至丑时夜间' },
    { type: 'npcAlive', npcId: 'NPC-0951', npcName: '韩河源' },
  ],
}

export const SHAOLIN_SIDE04_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE04_QUEST_ID,
    title: '塔林寒夜 · 孤魂盗墓',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流上品',
    maxOpponentRealm: '三流上品（洛阳摸金头目 · 穿山鬼）',
    recommendedNote:
      '少林寺 Lv.1 外门日常支线（全十二幕）。入寺满一百五十日后，于亥时至丑时夜间前往达摩面壁石洞绝壁石刻剑痕崖寻塔林洒扫沙弥韩河源，持棍夜巡少林西侧历代高僧塔林，揭穿洛阳摸金校尉涂磷粉装鬼盗掘唐代高僧舍利地宫之阴谋，连败三名盗墓贼护住先辈灵骨。',
    startHint:
      '拜入嵩山少林寺满一百五十日后，于亥时至丑时夜间前往【嵩山少林寺 · 达摩面壁石洞 · 绝壁石刻 · 剑痕崖】寻韩河源即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_SIDE04_START_CONDITION,
    summary:
      '{reignYear}寒冬深夜，少林寺西侧历代高僧塔林连夜鬼火闪烁、阴风呜咽，平日负责洒扫塔林的新晋沙弥韩河源惊惧难眠，于【达摩面壁石洞 · 绝壁石刻 · 剑痕崖】向你吐露异象。你断定千年古刹绝无厉鬼作祟，遂持齐眉棍自【飞瀑深潭 · 试炼涧】潜入西侧塔林夜巡。百座唐宋高僧砖塔间幽绿磷火飘荡，你借风向辨出磷粉与桐油气味，当场揭穿一伙洛阳摸金校尉装神弄鬼、妄图以洛阳铲盗掘唐代高僧舍利地宫的阴谋。你于砖塔迷阵间先破两名持铲喽啰，再以少林棍法力擒三流上品头目「穿山鬼」胡七，护住先辈灵骨无损。',
    initialStepId: 'patrol_pagoda_forest',
    steps: {
      patrol_pagoda_forest: {
        id: 'patrol_pagoda_forest',
        title: '持棍夜巡 · 潜探高僧塔林',
        objective:
          '韩河源称西侧历代高僧塔林连夜鬼火浮现、怪声不断。请持棍前往【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，沿西侧山径潜入塔林查明真相。',
        nextHint:
          '前往【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，点击「持棍沿西径潜入少林高僧塔林夜巡」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_west',
          customLabel: '嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
        },
      },
      return_report: {
        id: 'return_report',
        title: '晓钟破祟 · 归崖报平安',
        objective:
          '三名洛阳摸金盗墓贼已尽数生擒押交巡夜武僧，唐代高僧舍利地宫安然无恙！请返回【达摩面壁石洞 · 绝壁石刻 · 剑痕崖（sl_damo_east）】告知韩河源真相。',
        nextHint:
          '返回【达摩面壁石洞 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，点击「向韩河源道明塔林鬼火真相」或与韩河源交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_east',
          customLabel: '嵩山少林寺 · 达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls04_start_damo_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_side04_start_triggered',
        condition: SHAOLIN_SIDE04_START_CONDITION,
        effects: [openScene('scene_sls04_01', SHAOLIN_SIDE04_QUEST_ID)],
      },
      {
        id: 'trig_sls04_patrol_damo_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_side04_patrol_triggered',
        condition: atStep(SHAOLIN_SIDE04_QUEST_ID, 'patrol_pagoda_forest'),
        effects: [openScene('scene_sls04_03', SHAOLIN_SIDE04_QUEST_ID)],
      },
      {
        id: 'trig_sls04_return_damo_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_side04_report_triggered',
        condition: atStep(SHAOLIN_SIDE04_QUEST_ID, 'return_report'),
        effects: [openScene('scene_sls04_12', SHAOLIN_SIDE04_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls04_start',
        label: '【少林支线】问询塔林寒夜鬼火异象',
        badge: '塔林夜巡',
        subtitle: '夜间 · 绝壁石刻 · 剑痕崖',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: SHAOLIN_SIDE04_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side04_start_triggered', value: true },
          openScene('scene_sls04_01', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls04_patrol',
        label: '【少林支线】持棍沿西径潜入少林高僧塔林夜巡',
        badge: '孤魂盗墓',
        subtitle: '飞瀑深潭 · 试炼涧',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: atStep(SHAOLIN_SIDE04_QUEST_ID, 'patrol_pagoda_forest'),
        effects: [
          { type: 'setFlag', flag: 'sl_side04_patrol_triggered', value: true },
          openScene('scene_sls04_03', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls04_return',
        label: '【少林支线】向韩河源道明塔林鬼火真相',
        badge: '护塔复命',
        subtitle: '绝壁石刻 · 剑痕崖',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_SIDE04_QUEST_ID, 'return_report'),
        effects: [
          { type: 'setFlag', flag: 'sl_side04_report_triggered', value: true },
          openScene('scene_sls04_12', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls04_start_npc',
        label: '宽慰韩河源并请命夜巡高僧塔林',
        badge: '塔林夜巡',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0951'] },
            SHAOLIN_SIDE04_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side04_start_triggered', value: true },
          openScene('scene_sls04_01', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'act_sls04_report_npc',
        label: '向韩河源禀明塔林擒贼护骨始末',
        badge: '护塔复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0951'] },
            atStep(SHAOLIN_SIDE04_QUEST_ID, 'return_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side04_report_triggered', value: true },
          openScene('scene_sls04_12', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSidePagodaForestQuest.scenes').then((m) => m.SCENES),
  },
]
