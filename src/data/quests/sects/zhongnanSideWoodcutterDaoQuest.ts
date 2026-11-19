import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE06_QUEST_ID = 'QST-SECT-11-SIDE-06'

export const ZHONGNAN_SIDE06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus(ZHONGNAN_SIDE06_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0922', npcName: '林星雪' },
  ],
}

export const zhongnanSideWoodcutterDaoQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE06_QUEST_ID,
  title: '太白积雪 · 樵夫劈柴意',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '三流中品 ～ 二流下品',
  maxOpponentRealm: '二流下品（太白雪夜恶狼群）',
  recommendedNote:
    '终南隐宗二阶雪山悟道支线（全十幕）。陪终南同门林星雪赴寒玉涧银练飞瀑寻觅太白雪灵芝，偶遇终年隐居雪崖砍柴的神秘老樵夫。你虚心替老樵夫背柴三日，于一劈一砍之间悟出「大巧不工、举重若轻」的返璞武意，更于风雪夜挺身击退扑向茅庐的饥饿恶狼群，获老樵夫赠予「樵夫劈山柴刀（WPN-090）」与大量战历。',
  startHint:
    '晋升终南隐宗二阶后，前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】寻林星雪即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_falls',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
  },
  startCondition: ZHONGNAN_SIDE06_START_CONDITION,
  summary:
    '{reignYear}寒冬，太白余脉积雪皑皑。你陪终南同门林星雪于【终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】上游峭壁寻采雪灵芝，偶遇一位隐居雪崖、举止暗合大道的老樵夫。老樵夫劈柴如行云流水，一斧落下松木应声齐裂，竟藏着至简至纯的发劲真意。你虚心留居茅庐替老人背柴三日，寒夜里更挺身击退下山觅食的秦岭恶狼群。临别时老樵夫哈哈大笑，将随身多年的「樵夫劈山柴刀（WPN-090）」相赠，助你武学感悟大进。',
  initialStepId: 'defend_woodcutter_wolves',
  steps: {
    defend_woodcutter_wolves: {
      id: 'defend_woodcutter_wolves',
      title: '雪夜护庐 · 击退恶狼群',
      objective:
        '背柴三日之际，寒夜饥饿的秦岭恶狼群围上雪崖茅庐！请于【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】出手击退恶狼群，护住老樵夫与林星雪。',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】点击「踏雪迎击围攻茅庐的秦岭恶狼群」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side06_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_side06_start_triggered',
      condition: ZHONGNAN_SIDE06_START_CONDITION,
      effects: [openScene('scene_zns06_01', ZHONGNAN_SIDE06_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side06_start',
      label: '【终南风物】陪林星雪雪崖寻灵芝，偶遇隐世老樵夫',
      badge: '太白积雪',
      subtitle: '银练飞瀑清泉石茗案',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: ZHONGNAN_SIDE06_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side06_start_triggered', value: true },
        openScene('scene_zns06_01', ZHONGNAN_SIDE06_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side06_wolves',
      label: '【终南风物】踏雪迎击围攻茅庐的秦岭恶狼群',
      badge: '雪夜驱狼',
      subtitle: '银练飞瀑清泉石茗案',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_SIDE06_QUEST_ID, 'defend_woodcutter_wolves'),
      effects: [openScene('scene_zns06_06', ZHONGNAN_SIDE06_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side06_start',
      label: '与林星雪结伴往太白雪崖寻觅雪灵芝',
      badge: '太白积雪',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0922'] },
          ZHONGNAN_SIDE06_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side06_start_triggered', value: true },
        openScene('scene_zns06_01', ZHONGNAN_SIDE06_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideWoodcutterDaoQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE06_QUESTS: QuestDefinition[] = [zhongnanSideWoodcutterDaoQuest]
