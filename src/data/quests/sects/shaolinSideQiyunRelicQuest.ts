import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE09_QUEST_ID = 'QST-SECT-01-SIDE-09'

export const SHAOLIN_SIDE09_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE09_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0377', npcName: '慧博' },
    { type: 'npcAlive', npcId: 'NPC-0551', npcName: '虚空' },
  ],
}

export const SHAOLIN_SIDE09_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE09_QUEST_ID,
    title: '齐云古塔 · 舍利迷踪',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'luoyang',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（吐蕃黑教盗宝护法 · 巴桑）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门支线（全十四幕）。经义达六十后，于洛阳白马寺齐云密檐舍利古塔协助慧博、虚智、虚空、净云修缮地宫；吐蕃黑教盗宝护法巴桑率众夜袭强抢佛骨舍利宝函，自塔底一路血战追至十三层绝顶，1v1 击败巴桑夺回宝函。',
    startHint:
      '晋升少林内门经义不低于六十后，前往【洛阳府 · 白马寺（释源祖庭） · 齐云密檐舍利古塔】寻慧博、虚空或虚智即可触发。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_baimasi',
      spotId: 'ly_bm_pagoda',
      customLabel: '洛阳府 · 白马寺（释源祖庭） · 齐云密檐舍利古塔',
    },
    startCondition: SHAOLIN_SIDE09_START_CONDITION,
    summary:
      '{reignYear}洛阳白马寺齐云密檐舍利古塔因连日阴雨致使地宫渗水，少林达摩院护经僧【慧博】奉命携【虚智】、【虚空】、【净云】暂启地宫、移护汉唐历代佛骨舍利宝函。岂料修缮消息走漏，吐蕃黑教盗宝护法【巴桑】率密宗精锐趁夜潜入祖庭，击伤守塔僧众并强夺舍利宝函欲攀塔顶借绳索遁走。你挺身而出接住残局，自阴湿塔底一路冲破伏兵追至十三层古塔绝顶，在朔风呼啸的塔刹之下与二流上品强敌巴桑展开 1v1 生死对决，终以正大佛门武学将其击溃、完壁夺回舍利宝函，护住释源祖庭千年圣物。',
    initialStepId: 'defend_pagoda_night',
    steps: {
      defend_pagoda_night: {
        id: 'defend_pagoda_night',
        title: '夜护地宫 · 绝顶追凶',
        objective:
          '已协助慧博等人勘验齐云塔地宫渗水并移置舍利宝函！请守在【洛阳府 · 白马寺（释源祖庭） · 齐云密檐舍利古塔（ly_bm_pagoda）】，提防吐蕃黑教夜袭并夺回宝函。',
        nextHint:
          '在【白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】点击「夜守齐云古塔地宫，迎战吐蕃黑教盗宝护法」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_pagoda',
          customLabel: '洛阳府 · 白马寺（释源祖庭） · 齐云密檐舍利古塔',
        },
      },
      return_main_hall: {
        id: 'return_main_hall',
        title: '宝函完璧 · 祖庭告慰',
        objective:
          '已于齐云塔十三层绝顶击败吐蕃黑教护法【巴桑】并夺回佛骨舍利宝函！请护送宝函前往【白马寺（释源祖庭） · 白马大佛宝殿（ly_bm_main）】交予慧博与虚空安奉。',
        nextHint:
          '前往【白马寺 · 白马大佛宝殿（ly_bm_main）】，点击「将舍利宝函安奉于白马大佛宝殿」或与慧博交谈。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_main',
          customLabel: '洛阳府 · 白马寺（释源祖庭） · 白马大佛宝殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls09_start',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        onceFlag: 'sl_side09_start_triggered',
        condition: SHAOLIN_SIDE09_START_CONDITION,
        effects: [openScene('scene_sls09_01', SHAOLIN_SIDE09_QUEST_ID)],
      },
      {
        id: 'trig_sls09_defend',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        onceFlag: 'sl_side09_defend_triggered',
        condition: atStep(SHAOLIN_SIDE09_QUEST_ID, 'defend_pagoda_night'),
        effects: [openScene('scene_sls09_04', SHAOLIN_SIDE09_QUEST_ID)],
      },
      {
        id: 'trig_sls09_return',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        onceFlag: 'sl_side09_return_triggered',
        condition: atStep(SHAOLIN_SIDE09_QUEST_ID, 'return_main_hall'),
        effects: [openScene('scene_sls09_13', SHAOLIN_SIDE09_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls09_start',
        label: '【少林支线】协助慧博勘验齐云塔地宫渗水',
        badge: '舍利迷踪',
        subtitle: '齐云密檐舍利古塔',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        visibleWhen: SHAOLIN_SIDE09_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side09_start_triggered', value: true },
          openScene('scene_sls09_01', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls09_defend',
        label: '【少林支线】夜守齐云古塔地宫，迎战吐蕃黑教盗宝护法',
        badge: '绝顶夺函',
        subtitle: '齐云密檐舍利古塔 · 十三层绝顶',
        tone: 'jade',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        visibleWhen: atStep(SHAOLIN_SIDE09_QUEST_ID, 'defend_pagoda_night'),
        effects: [
          { type: 'setFlag', flag: 'sl_side09_defend_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side09_basang_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls09_10', SHAOLIN_SIDE09_QUEST_ID)],
            elseEffects: [openScene('scene_sls09_04', SHAOLIN_SIDE09_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls09_return',
        label: '【少林支线】将舍利宝函安奉于白马大佛宝殿',
        badge: '舍利完璧',
        subtitle: '白马大佛宝殿 · 慧博与虚空',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        visibleWhen: atStep(SHAOLIN_SIDE09_QUEST_ID, 'return_main_hall'),
        effects: [
          { type: 'setFlag', flag: 'sl_side09_return_triggered', value: true },
          openScene('scene_sls09_13', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls09_start_npc',
        label: '问询白马寺齐云塔地宫渗水与舍利移护之事',
        badge: '舍利迷踪',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0377', 'NPC-0551', 'NPC-0503'] },
            SHAOLIN_SIDE09_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side09_start_triggered', value: true },
          openScene('scene_sls09_01', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'act_sls09_return_npc',
        label: '奉还佛骨舍利宝函并向慧博复命',
        badge: '舍利完璧',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0377', 'NPC-0551'] },
            atStep(SHAOLIN_SIDE09_QUEST_ID, 'return_main_hall'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side09_return_triggered', value: true },
          openScene('scene_sls09_13', SHAOLIN_SIDE09_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideQiyunRelicQuest.scenes').then((m) => m.SCENES),
  },
]
