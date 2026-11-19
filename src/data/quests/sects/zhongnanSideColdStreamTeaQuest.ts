import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE08_QUEST_ID = 'QST-SECT-11-SIDE-08'

export const ZHONGNAN_SIDE08_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus(ZHONGNAN_SIDE08_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '琴', min: 60 },
    { type: 'skillAtLeast', key: '诗词', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-1059', npcName: '孙清静' },
    { type: 'npcAlive', npcId: 'NPC-1057', npcName: '王处阳' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-0542', npcName: '曲松璋' },
  ],
}

export const zhongnanSideColdStreamTeaQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE08_QUEST_ID,
  title: '寒涧松茗 · 岁寒三友会',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '二流中品 ～ 一流下品',
  maxOpponentRealm: '三流上品（东海桃花岛 · 曲松璋）',
  recommendedNote:
    '终南隐宗三阶琴诗雅集支线（全十二幕）。琴艺与诗词造诣湛深后，岁寒雪霁之时于寒玉涧银练飞瀑石茗案与孙清静、王处阳、冷清秋煮茗抚琴、联句赋诗；琴韵引来远游关中的东海桃花岛高徒曲松璋闻音登谷，以剑印琴、切磋助兴，宾主尽欢，获琴艺+2、诗词+1 与丰厚战历。',
  startHint:
    '晋升终南隐宗三阶且琴≥60、诗词≥50 后，前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】赴岁寒三友雅集即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_falls',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
  },
  startCondition: ZHONGNAN_SIDE08_START_CONDITION,
  summary:
    '{reignYear}腊月雪霁，终南后山松竹梅傲雪吐芳。你应邀赴【终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，与孙清静、王处阳、冷清秋三位师长共启「岁寒三友会」，煮雪烹松茗、抚琴和清商、联句吟新词。清越琴声顺瀑传出数里，竟引来远游关中的东海桃花岛传人曲松璋闻音登谷！曲松璋倾慕终南琴剑之雅，请以剑招印证琴律。你欣然拔剑切磋，剑意随琴韵流转、点到为止，宾主尽欢，琴艺与诗词造诣更上一层楼。',
  initialStepId: 'spar_qu_songzhang',
  steps: {
    spar_qu_songzhang: {
      id: 'spar_qu_songzhang',
      title: '闻琴试剑 · 桃花客助兴',
      objective:
        '东海桃花岛传人曲松璋闻琴登谷，请以剑印琴！请于【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】与其点到为止切磋助兴。',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】点击「以剑印琴，与桃花岛曲松璋切磋助兴」。',
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
      id: 'trig_zn_side08_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_side08_start_triggered',
      condition: ZHONGNAN_SIDE08_START_CONDITION,
      effects: [openScene('scene_zns08_01', ZHONGNAN_SIDE08_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side08_start',
      label: '【终南雅集】与孙清静、王处阳、冷清秋共启岁寒三友会',
      badge: '岁寒三友',
      subtitle: '银练飞瀑清泉石茗案',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: ZHONGNAN_SIDE08_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side08_start_triggered', value: true },
        openScene('scene_zns08_01', ZHONGNAN_SIDE08_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side08_spar',
      label: '【终南雅集】以剑印琴，与桃花岛曲松璋切磋助兴',
      badge: '闻琴试剑',
      subtitle: '银练飞瀑清泉石茗案',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_SIDE08_QUEST_ID, 'spar_qu_songzhang'),
      effects: [openScene('scene_zns08_06', ZHONGNAN_SIDE08_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side08_start',
      label: '赴寒玉涧岁寒三友会，煮茗抚琴论诗',
      badge: '岁寒三友',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-1059', 'NPC-1057', 'NPC-0173'] },
          ZHONGNAN_SIDE08_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side08_start_triggered', value: true },
        openScene('scene_zns08_01', ZHONGNAN_SIDE08_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideColdStreamTeaQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE08_QUESTS: QuestDefinition[] = [zhongnanSideColdStreamTeaQuest]
