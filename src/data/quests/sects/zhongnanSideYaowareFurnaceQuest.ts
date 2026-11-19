import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE03_QUEST_ID = 'QST-SECT-11-SIDE-03'

export const ZHONGNAN_SIDE03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus(ZHONGNAN_SIDE03_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0530', npcName: '林勇虎' },
    { type: 'npcAlive', npcId: 'NPC-0766', npcName: '谭涛' },
  ],
}

export const zhongnanSideYaowareFurnaceQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE03_QUEST_ID,
  title: '紫金丹火 · 耀州博山炉',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '三流中品 ～ 二流下品',
  maxOpponentRealm: '二流下品（渭北刀客头目）',
  recommendedNote:
    '终南隐宗二阶丹院器物支线（全十幕）。道藏经阁与紫金丹院旧炉开裂，林勇虎与谭涛托你持师门定银前往长安西市购取名瓷「耀州窑青釉刻牡丹三足博山炉」（ITM-CUR-023），护送返山途中识破并击退觊觎官窑珍品的渭北刀客，平安交炉后获赠紫金丹院秘炼灵丹与战历。',
  startHint:
    '晋升终南隐宗二阶后，前往【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院（zn_to_alchemy）】寻林勇虎或谭涛即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_alchemy',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
  },
  startCondition: ZHONGNAN_SIDE03_START_CONDITION,
  summary:
    '{reignYear}夏，终南【道藏经阁与紫金丹院（zn_to_alchemy）】常年用来温养紫金丹火的古炉因年久出现暗纹。管事弟子林勇虎与谭涛托你下山赴【京兆府 · 西市胡商坊（ca_xishi_main）】购取耀州名窑烧制的「耀州窑青釉刻牡丹三足博山炉」。你在西市顺利验货请得珍炉，押运返山至终南山口时却遭一伙觊觎奇珍的渭北刀客拦路劫夺。你拔剑击溃刀客护住宝炉无损，平安送回紫金丹院，获赠秘炼灵丹与丰厚战历。',
  initialStepId: 'buy_furnace_xishi',
  steps: {
    buy_furnace_xishi: {
      id: 'buy_furnace_xishi',
      title: '西市请炉 · 耀州青釉',
      objective:
        '请携师门定银前往【京兆府 · 西市胡商坊（ca_xishi_main）】，向耀州瓷商购取「耀州窑青釉刻牡丹三足博山炉（ITM-CUR-023）」。',
      nextHint:
        '前往【京兆府 · 西市胡商坊（ca_xishi_main）】，点击「验看并请取耀州窑青釉刻牡丹三足博山炉」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        customLabel: '京兆府 · 西市胡商坊',
      },
    },
    escort_back_alchemy: {
      id: 'escort_back_alchemy',
      title: '护炉返山 · 击退渭北刀客',
      objective:
        '已请得「耀州窑青釉刻牡丹三足博山炉」！请护送宝炉返回【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院（zn_to_alchemy）】，途中提防渭北刀客截劫。',
      nextHint:
        '返回【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院（zn_to_alchemy）】，击退半路拦劫的渭北刀客并交付宝炉。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side03_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      onceFlag: 'zn_side03_start_triggered',
      condition: ZHONGNAN_SIDE03_START_CONDITION,
      effects: [openScene('scene_zns03_01', ZHONGNAN_SIDE03_QUEST_ID)],
    },
    {
      id: 'trig_zn_side03_xishi',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      onceFlag: 'zn_side03_xishi_triggered',
      condition: atStep(ZHONGNAN_SIDE03_QUEST_ID, 'buy_furnace_xishi'),
      effects: [openScene('scene_zns03_04', ZHONGNAN_SIDE03_QUEST_ID)],
    },
    {
      id: 'trig_zn_side03_return',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      onceFlag: 'zn_side03_return_triggered',
      condition: atStep(ZHONGNAN_SIDE03_QUEST_ID, 'escort_back_alchemy'),
      effects: [openScene('scene_zns03_06', ZHONGNAN_SIDE03_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side03_start',
      label: '【终南风物】查验丹院古炉裂纹，承接西市请炉之托',
      badge: '紫金丹火',
      subtitle: '道藏经阁与紫金丹院',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      visibleWhen: ZHONGNAN_SIDE03_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side03_start_triggered', value: true },
        openScene('scene_zns03_01', ZHONGNAN_SIDE03_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side03_xishi',
      label: '【终南风物】验看并请取耀州窑青釉刻牡丹三足博山炉',
      badge: '西市请炉',
      subtitle: '西市胡商坊',
      tone: 'gold',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      visibleWhen: atStep(ZHONGNAN_SIDE03_QUEST_ID, 'buy_furnace_xishi'),
      effects: [
        { type: 'setFlag', flag: 'zn_side03_xishi_triggered', value: true },
        openScene('scene_zns03_04', ZHONGNAN_SIDE03_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side03_return',
      label: '【终南风物】击退拦截的渭北刀客，护送博山炉入丹院',
      badge: '护炉交差',
      subtitle: '道藏经阁与紫金丹院',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      visibleWhen: atStep(ZHONGNAN_SIDE03_QUEST_ID, 'escort_back_alchemy'),
      effects: [
        { type: 'setFlag', flag: 'zn_side03_return_triggered', value: true },
        openScene('scene_zns03_06', ZHONGNAN_SIDE03_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side03_start',
      label: '询问紫金丹院换置耀州博山炉之事',
      badge: '紫金丹火',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0530', 'NPC-0766'] },
          ZHONGNAN_SIDE03_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side03_start_triggered', value: true },
        openScene('scene_zns03_01', ZHONGNAN_SIDE03_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideYaowareFurnaceQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE03_QUESTS: QuestDefinition[] = [zhongnanSideYaowareFurnaceQuest]
