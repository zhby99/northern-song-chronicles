import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE04_QUEST_ID = 'QST-SECT-11-SIDE-04'

export const ZHONGNAN_SIDE04_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus(ZHONGNAN_SIDE04_QUEST_ID, 'not_started'),
    {
      type: 'any',
      hint: '须具备一定书画造诣（书≥30 或 画≥30）',
      conditions: [
        { type: 'skillAtLeast', key: '书', min: 30 },
        { type: 'skillAtLeast', key: '画', min: 30 },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0100', npcName: '刘敞' },
    { type: 'npcAlive', npcId: 'NPC-0783', npcName: '谭婉翠' },
  ],
}

export const zhongnanSideDayantaSteleQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE04_QUEST_ID,
  title: '雁塔题名 · 先秦石鼓考',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'changan',
  recommendedRealm: '三流中品 ～ 二流中品',
  maxOpponentRealm: '二流中品（大辽南院细作）',
  recommendedNote:
    '终南隐宗二阶金石谍影支线（全十二幕）。赴京兆府慈恩寺大雁塔东侧碑廊，随北宋金石名家刘敞考释先秦石鼓文与钟鼎古碑，却从拓片夹层中识破假扮拓碑匠的大辽南院细作企图夹带关中布防暗图出境！与终南同门谭婉翠联手擒贼护碑，获书法大进与丰厚战历。',
  startHint:
    '晋升终南隐宗二阶且书或画达 30 后，前往【京兆府 · 慈恩寺大雁塔（ca_dayanta_east）】拜会刘敞先生即可触发。',
  startLocation: {
    regionId: 'changan',
    buildingId: 'ca_dayanta',
    spotId: 'ca_dayanta_east',
    customLabel: '京兆府 · 慈恩寺大雁塔',
  },
  startCondition: ZHONGNAN_SIDE04_START_CONDITION,
  summary:
    '{reignYear}秋，北宋金石大家刘敞于【京兆府 · 慈恩寺大雁塔（ca_dayanta_east）】考释先秦石鼓与周秦钟鼎古碑。你以书画同好之身随侍考校，却凭敏锐目力发现一名自称拓碑匠的生面孔在拓片夹层暗藏永兴军路边防密图，乃大辽南院细作！你暗中通知潜伏照应的终南师姐谭婉翠，二人于大雁塔回廊联手擒拿辽国细作、追回密图，更得刘敞亲授先秦篆籀笔意，书法修为精进。',
  initialStepId: 'catch_liao_spy_tower',
  steps: {
    catch_liao_spy_tower: {
      id: 'catch_liao_spy_tower',
      title: '碑廊识奸 · 塔影擒细作',
      objective:
        '已识破假拓碑匠乃是大辽南院细作！请留在【京兆府 · 慈恩寺大雁塔（ca_dayanta_east）】联手谭婉翠将其当场擒拿，夺回关中边防暗图。',
      nextHint:
        '在【京兆府 · 慈恩寺大雁塔（ca_dayanta_east）】点击「联手谭婉翠，擒拿伪装拓碑匠的大辽南院细作」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_dayanta',
        spotId: 'ca_dayanta_east',
        customLabel: '京兆府 · 慈恩寺大雁塔',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side04_start',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_east',
      onceFlag: 'zn_side04_start_triggered',
      condition: ZHONGNAN_SIDE04_START_CONDITION,
      effects: [openScene('scene_zns04_01', ZHONGNAN_SIDE04_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side04_start',
      label: '【终南风物】随刘敞考释先秦石鼓与大雁塔古碑',
      badge: '石鼓考碑',
      subtitle: '慈恩寺大雁塔',
      tone: 'jade',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_east',
      visibleWhen: ZHONGNAN_SIDE04_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side04_start_triggered', value: true },
        openScene('scene_zns04_01', ZHONGNAN_SIDE04_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side04_catch',
      label: '【终南风物】联手谭婉翠，擒拿伪装拓碑匠的大辽南院细作',
      badge: '塔影擒谍',
      subtitle: '慈恩寺大雁塔',
      tone: 'danger',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_east',
      visibleWhen: atStep(ZHONGNAN_SIDE04_QUEST_ID, 'catch_liao_spy_tower'),
      effects: [openScene('scene_zns04_06', ZHONGNAN_SIDE04_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side04_liuchang',
      label: '随刘敞先生考释先秦石鼓文与钟鼎古碑',
      badge: '石鼓考碑',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0100'] },
          ZHONGNAN_SIDE04_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side04_start_triggered', value: true },
        openScene('scene_zns04_01', ZHONGNAN_SIDE04_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideDayantaSteleQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE04_QUESTS: QuestDefinition[] = [zhongnanSideDayantaSteleQuest]
