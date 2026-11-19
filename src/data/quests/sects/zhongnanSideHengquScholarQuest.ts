import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE02_QUEST_ID = 'QST-SECT-11-SIDE-02'

export const ZHONGNAN_SIDE02_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 1 },
    qStatus(ZHONGNAN_SIDE02_QUEST_ID, 'not_started'),
    {
      type: 'any',
      hint: '须具备一定经义或诗词修养（经义≥25 或 诗词≥25）',
      conditions: [
        { type: 'skillAtLeast', key: '经义', min: 25 },
        { type: 'skillAtLeast', key: '诗词', min: 25 },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0048', npcName: '张载' },
    { type: 'npcAlive', npcId: 'NPC-0017', npcName: '晏殊' },
    { type: 'npcAlive', npcId: 'NPC-0637', npcName: '徐弘毅' },
  ],
}

export const zhongnanSideHengquScholarQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE02_QUEST_ID,
  title: '横渠问剑 · 立心立命录',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'changan',
  recommendedRealm: '不入流 ～ 三流中品',
  maxOpponentRealm: '三流中品（盗书毛贼）',
  recommendedNote:
    '终南隐宗一阶关中儒道风物支线（全十二幕）。下山赴长安横渠关学书院聆听关学宗师张载讲学切磋，论「为天地立心，为生民立命」与终南道家济世之理；再赴永兴军路京兆府衙拜会名相晏殊，并协助江湖义士徐弘毅擒获潜入书库窃取先贤孤本的毛贼，获经义、诗词、辩才精进与战历。',
  startHint:
    '加入终南隐宗且经义或诗词达 25 后，前往【京兆府 · 长安横渠关学书院（changan_base_academy）】听张载讲学即可触发。',
  startLocation: {
    regionId: 'changan',
    buildingId: 'changan_base_academy',
    customLabel: '京兆府 · 长安横渠关学书院',
  },
  startCondition: ZHONGNAN_SIDE02_START_CONDITION,
  summary:
    '{reignYear}仲秋，关中大儒张载于【京兆府 · 长安横渠关学书院（changan_base_academy）】开坛讲学。你以终南道门子弟身份下山听讲，与张子厚辩难儒道义理、以剑喻礼，颇得赏识；随后持张载手书赴【永兴军路京兆府衙（changan_base_yamen）】拜会暂知永兴军的名相晏殊，恰逢贼人潜入府衙藏书阁盗取关中孤本古籍。你与徐弘毅联手截住盗书毛贼、完璧归赵，获晏殊与张载双双嘉许，文武俱进。',
  initialStepId: 'visit_yanshu_yamen',
  steps: {
    visit_yanshu_yamen: {
      id: 'visit_yanshu_yamen',
      title: '持书拜相 · 府衙擒贼',
      objective:
        '张载先生已写好荐书，请携书前往【京兆府 · 永兴军路京兆府衙（changan_base_yamen）】拜会晏殊相公，并留意书阁异动。',
      nextHint:
        '前往【京兆府 · 永兴军路京兆府衙（changan_base_yamen）】，点击「持张载手书拜会晏殊相公」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'changan_base_yamen',
        customLabel: '京兆府 · 永兴军路京兆府衙',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side02_start',
      regionId: 'changan',
      buildingId: 'changan_base_academy',
      onceFlag: 'zn_side02_start_triggered',
      condition: ZHONGNAN_SIDE02_START_CONDITION,
      effects: [openScene('scene_zns02_01', ZHONGNAN_SIDE02_QUEST_ID)],
    },
    {
      id: 'trig_zn_side02_yamen',
      regionId: 'changan',
      buildingId: 'changan_base_yamen',
      onceFlag: 'zn_side02_yamen_triggered',
      condition: atStep(ZHONGNAN_SIDE02_QUEST_ID, 'visit_yanshu_yamen'),
      effects: [openScene('scene_zns02_06', ZHONGNAN_SIDE02_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side02_start',
      label: '【终南风物】入横渠书院听张载讲学，儒道论剑',
      badge: '横渠问剑',
      subtitle: '长安横渠关学书院',
      tone: 'jade',
      regionId: 'changan',
      buildingId: 'changan_base_academy',
      visibleWhen: ZHONGNAN_SIDE02_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side02_start_triggered', value: true },
        openScene('scene_zns02_01', ZHONGNAN_SIDE02_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side02_yamen',
      label: '【终南风物】持张载手书拜会晏殊相公，护阁擒贼',
      badge: '立心立命',
      subtitle: '永兴军路京兆府衙',
      tone: 'gold',
      regionId: 'changan',
      buildingId: 'changan_base_yamen',
      visibleWhen: atStep(ZHONGNAN_SIDE02_QUEST_ID, 'visit_yanshu_yamen'),
      effects: [
        { type: 'setFlag', flag: 'zn_side02_yamen_triggered', value: true },
        openScene('scene_zns02_06', ZHONGNAN_SIDE02_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side02_zhangzai',
      label: '向张载先生请教关学大义与儒道之辩',
      badge: '横渠问剑',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0048'] },
          ZHONGNAN_SIDE02_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side02_start_triggered', value: true },
        openScene('scene_zns02_01', ZHONGNAN_SIDE02_QUEST_ID),
      ],
    },
    {
      id: 'act_zn_side02_yanshu',
      label: '呈递张载手书拜会晏殊相公',
      badge: '立心立命',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0017'] },
          atStep(ZHONGNAN_SIDE02_QUEST_ID, 'visit_yanshu_yamen'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side02_yamen_triggered', value: true },
        openScene('scene_zns02_06', ZHONGNAN_SIDE02_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideHengquScholarQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE02_QUESTS: QuestDefinition[] = [zhongnanSideHengquScholarQuest]
