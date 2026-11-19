import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q19_QUEST_ID = 'QST-SECT-11-19'

export const ZHONGNAN_Q19_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-18', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q19_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
  ],
}

export const ZHONGNAN_Q19_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q19_QUEST_ID,
    title: '寒玉蒸霞 · 素绢真经',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '一流中品 ～ 一流上品',
    maxOpponentRealm: '一流上品（古墓引敌叛徒 · 莫寒烟）',
    recommendedNote:
      '终南古墓核心收官大戏（全二十六幕）。你携洛阳密讯返抵昆仑寒玉床冰魄石室，寒玉仙子林朝瑶亲赐古墓唯一至宝秘籍《终南玉女心经素绢谱》（ITM-SCR-012）！你与师姐冷清秋共运寒玉床冲关，习得镇脉绝学《玉女心经》（MA-039）；危机骤临，引敌叛徒率西夏高手逼近墓门，你掠出石门三招冰封叛徒，护住活死人墓百年传承！',
    startHint:
      '完成《洛水琴棋 · 聪辩雅集》后，速返【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】向师父【林朝瑶】禀报内奸密讯，领受古墓素绢真经！',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
    },
    startCondition: ZHONGNAN_Q19_START_CONDITION,
    summary:
      '{reignYear}岁末大雪，你携苏星河示警密讯急返【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】。寒玉仙子【林朝瑶】慨然开启祖师暗匣，将古墓镇派唯一秘籍《终南玉女心经素绢谱》赐予于你，并命你与师姐【冷清秋】于昆仑寒玉床上共运心法冲关。霞雾蒸腾间，你终悟得地阶上品《玉女心经》！恰在此时，勾结西夏的古墓弃徒引敌杀至墓外【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】，你掠出石门先破西夏先锋，再以玉女心经配寒冰绵掌三招冰封叛徒，扬威终南！',
    initialStepId: 'jadebed_cultivation',
    steps: {
      jadebed_cultivation: {
        id: 'jadebed_cultivation',
        title: '寒玉冲关 · 素绢悟经',
        objective:
          '已蒙林朝瑶赐下唯一秘籍《终南玉女心经素绢谱》！请留在【昆仑寒玉床冰魄石室】，与冷清秋共运寒玉床冲关参悟《玉女心经》。',
        nextHint:
          '在【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】完成寒玉床冲关。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tomb',
          spotId: 'zn_tb_jadebed',
          customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
        },
      },
      seal_traitor_outside: {
        id: 'seal_traitor_outside',
        title: '掠出石门 · 冰封叛徒',
        objective:
          '已习得镇派绝学《玉女心经》！引敌叛徒已率西夏死士杀至墓外，请速掠出石门前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】冰封叛徒！',
        nextHint:
          '前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，破敌先锋并三招冰封引敌叛徒！',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_sword',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
        },
      },
      return_jadebed_finale: {
        id: 'return_jadebed_finale',
        title: '素绢永传 · 归室复命',
        objective:
          '已三招冰封引敌叛徒并击溃外敌！请返回【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】向师父林朝瑶复命。',
        nextHint:
          '返回【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，圆满收官古墓真传主干。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tomb',
          spotId: 'zn_tb_jadebed',
          customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq19_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q19_start_triggered',
        condition: ZHONGNAN_Q19_START_CONDITION,
        effects: [openScene('scene_znq19_01', ZHONGNAN_Q19_QUEST_ID)],
      },
      {
        id: 'trig_znq19_battle',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        onceFlag: 'zn_q19_battle_triggered',
        condition: atStep(ZHONGNAN_Q19_QUEST_ID, 'seal_traitor_outside'),
        effects: [openScene('scene_znq19_13', ZHONGNAN_Q19_QUEST_ID)],
      },
      {
        id: 'trig_znq19_finale',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q19_finale_triggered',
        condition: atStep(ZHONGNAN_Q19_QUEST_ID, 'return_jadebed_finale'),
        effects: [openScene('scene_znq19_22', ZHONGNAN_Q19_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq19_start',
        label: '【素绢真经】入冰魄石室 · 呈报密讯并领受《玉女心经》',
        badge: '古墓核心',
        subtitle: '第一幕 · 昆仑寒玉床冰魄石室',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: ZHONGNAN_Q19_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q19_start_triggered', value: true },
          openScene('scene_znq19_01', ZHONGNAN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq19_battle',
        label: '【素绢真经】掠赴双剑合璧坪 · 破敌先锋并三招冰封叛徒',
        badge: '冰封叛徒',
        subtitle: '第十三幕 · 繁花幽谷双剑合璧坪',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        visibleWhen: atStep(ZHONGNAN_Q19_QUEST_ID, 'seal_traitor_outside'),
        effects: [
          { type: 'setFlag', flag: 'zn_q19_battle_triggered', value: true },
          openScene('scene_znq19_13', ZHONGNAN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq19_finale',
        label: '【素绢真经】返冰魄石室 · 拜见林朝瑶圆满收官',
        badge: '古墓大成',
        subtitle: '第二十二幕 · 昆仑寒玉床冰魄石室',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: atStep(ZHONGNAN_Q19_QUEST_ID, 'return_jadebed_finale'),
        effects: [
          { type: 'setFlag', flag: 'zn_q19_finale_triggered', value: true },
          openScene('scene_znq19_22', ZHONGNAN_Q19_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq19_start',
        label: '【素绢真经】向师父呈报洛阳密讯，共运寒玉床修习真经',
        badge: '古墓核心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q19_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0114', 'NPC-0173'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q19_start_triggered', value: true },
          openScene('scene_znq19_01', ZHONGNAN_Q19_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuYunvSutraQuest.scenes').then((m) => m.SCENES),
  },
]
