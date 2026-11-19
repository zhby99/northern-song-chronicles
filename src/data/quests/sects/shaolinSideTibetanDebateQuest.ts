import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE13_QUEST_ID = 'QST-SECT-01-SIDE-13'

export const SHAOLIN_SIDE13_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus(SHAOLIN_SIDE13_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 3000 },
    { type: 'skillAtLeast', key: '经义', min: 75 },
    { type: 'skillAtLeast', key: '辩才', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-0360', npcName: '慧光' },
    { type: 'npcAlive', npcId: 'NPC-0465', npcName: '慧空' },
  ],
}

export const SHAOLIN_SIDE13_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE13_QUEST_ID,
    title: '大雄狮吼 · 番僧问难',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'bianliang',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（西夏密宗音功高僧 · 朗达玛）',
    recommendedNote:
      '少林寺 Lv.3 汴京护法支线（全十四幕）。入寺满 3000 日且经义 ≥ 75、辩才 ≥ 50 后，赴开封府大相国寺大雄宝殿（香云宝鼎）见下院主持慧光、慧空正遭西夏密宗音功高僧朗达玛借因明辩难发难。须移步资圣八角琉璃宝塔法坛连破三道佛理死题，再以浑厚禅功硬抗梵音狮吼并击败朗达玛，赢得满城欢呼并获仁宗御赐赏赉。',
    startHint:
      '跻身少林寺三阶高徒、入寺满 3000 日且经义 ≥ 75、辩才 ≥ 50 后，前往【开封府 · 大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）】寻慧光、慧空即可触发。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_hall',
      customLabel: '开封府 · 大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）',
    },
    startCondition: SHAOLIN_SIDE13_START_CONDITION,
    summary:
      '{reignYear}仲夏，西夏使团随行密宗音功高僧【朗达玛】携鎏金法螺与因明辩帖闯入汴京【大相国寺】，口称「中原禅宗徒有虚名、不敢一辩」，于【大雄宝殿（香云宝鼎）】连震数声密宗梵音，将少林下院主持【慧光】、【慧空】逼得气血翻涌、难以招架。你恰逢巡礼汴京，挺身而出接下辩难之约，移步【资圣八角琉璃宝塔】前高筑法坛，当着汴梁千余僧俗与朝臣之面连破朗达玛三道因明死题；朗达玛理屈词穷，暗运密宗音功欲以「狮吼梵音」震慑全场，你以少林浑厚禅功正面迎战，苦斗数十合将其折服！满城欢呼雷动，消息传入大内，宋仁宗龙颜大悦，遣内侍赍诏赐赏银两与御赐灵药，少林声威震动京师。',
    initialStepId: 'pagoda_debate_duel',
    steps: {
      pagoda_debate_duel: {
        id: 'pagoda_debate_duel',
        title: '登坛破难 · 狮吼斗番僧',
        objective:
          '已在大雄宝殿替慧光、慧空接下西夏密宗高僧朗达玛的因明辩难之约！请前往【开封府 · 大相国寺（八角宝塔） · 资圣八角琉璃宝塔（bl_xg_pagoda）】登坛斗辩，以经义与禅功折服番僧。',
        nextHint:
          '前往【大相国寺（八角宝塔） · 资圣八角琉璃宝塔（bl_xg_pagoda）】，点击「登法坛迎战西夏密宗高僧朗达玛」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺（八角宝塔） · 资圣八角琉璃宝塔',
        },
      },
      hall_imperial_reward: {
        id: 'hall_imperial_reward',
        title: '京师传颂 · 宝殿接御赏',
        objective:
          '你已于八角宝塔下连破三题、以浑厚禅功力克西夏高僧朗达玛！大内宣旨内侍已抵大相国寺，请速返【大雄宝殿（香云宝鼎）（bl_xg_hall）】与慧光、慧空一同接诏受赏。',
        nextHint:
          '返回【大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）（bl_xg_hall）】，点击「赴大雄宝殿接领官家御赐赏赉」或与慧光交谈。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_hall',
          customLabel: '开封府 · 大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls13_start_xg_hall',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        onceFlag: 'sl_side13_start_triggered',
        condition: SHAOLIN_SIDE13_START_CONDITION,
        effects: [openScene('scene_sls13_01', SHAOLIN_SIDE13_QUEST_ID)],
      },
      {
        id: 'trig_sls13_debate_xg_pagoda',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        onceFlag: 'sl_side13_debate_triggered',
        condition: atStep(SHAOLIN_SIDE13_QUEST_ID, 'pagoda_debate_duel'),
        effects: [openScene('scene_sls13_04', SHAOLIN_SIDE13_QUEST_ID)],
      },
      {
        id: 'trig_sls13_reward_xg_hall',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        onceFlag: 'sl_side13_reward_triggered',
        condition: atStep(SHAOLIN_SIDE13_QUEST_ID, 'hall_imperial_reward'),
        effects: [openScene('scene_sls13_12', SHAOLIN_SIDE13_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls13_start',
        label: '【少林支线】解围西夏番僧大雄宝殿发难',
        badge: '大雄狮吼',
        subtitle: '大雄宝殿（香云宝鼎）',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        visibleWhen: SHAOLIN_SIDE13_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side13_start_triggered', value: true },
          openScene('scene_sls13_01', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls13_debate',
        label: '【少林支线】登法坛迎战西夏密宗高僧朗达玛',
        badge: '番僧问难',
        subtitle: '资圣八角琉璃宝塔',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(SHAOLIN_SIDE13_QUEST_ID, 'pagoda_debate_duel'),
        effects: [
          { type: 'setFlag', flag: 'sl_side13_debate_triggered', value: true },
          openScene('scene_sls13_04', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls13_reward',
        label: '【少林支线】赴大雄宝殿接领官家御赐赏赉',
        badge: '御赐金钵',
        subtitle: '大雄宝殿（香云宝鼎）',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        visibleWhen: atStep(SHAOLIN_SIDE13_QUEST_ID, 'hall_imperial_reward'),
        effects: [
          { type: 'setFlag', flag: 'sl_side13_reward_triggered', value: true },
          openScene('scene_sls13_12', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls13_start_npc',
        label: '挺身替慧光慧空接下西夏番僧辩难战帖',
        badge: '大雄狮吼',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0360', 'NPC-0465'] },
            SHAOLIN_SIDE13_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side13_start_triggered', value: true },
          openScene('scene_sls13_01', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'act_sls13_reward_npc',
        label: '与慧光慧空共赴香云宝鼎前接领御赏',
        badge: '御赐金钵',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0360', 'NPC-0465'] },
            atStep(SHAOLIN_SIDE13_QUEST_ID, 'hall_imperial_reward'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side13_reward_triggered', value: true },
          openScene('scene_sls13_12', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideTibetanDebateQuest.scenes').then((m) => m.SCENES),
  },
]
