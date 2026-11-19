import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q31_QUEST_ID = 'QST-SECT-11-31'

export const ZHONGNAN_Q31_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-29', 'completed'),
    flag('zn_q29_choice', 'eq', 'split'),
    qStatus('QST-SECT-11-30', 'not_started'),
    qStatus(ZHONGNAN_Q31_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
  ],
}

export const zhongnanBitterSplitQuest: QuestDefinition = {
  id: ZHONGNAN_Q31_QUEST_ID,
  title: '孤峰执念 · 道墓决裂',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '一流上品 ～ 宗师下品',
  maxOpponentRealm: '一流上品（西夏铁骑先锋 · 拓跋黑煞）',
  recommendedNote:
    '终南隐宗二级分流枢纽【决裂线】（全二十四幕）。须完成《QST-SECT-11-29》并选择守本脉决裂且未开启合流线《QST-SECT-11-30》。于繁花幽谷双剑合璧坪见证观墓彻底割席——古观封涧立界、古墓断桥备落断龙石，并独力斩退趁乱进犯的西夏先锋，立誓各行其道、绝不相借！',
  startHint:
    '完成《QST-SECT-11-29》并选定独守本脉之志后，前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】即可启幕。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_sword',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
  },
  startCondition: ZHONGNAN_Q31_START_CONDITION,
  summary:
    '{reignYear}深秋，终南山风雪将至。道墓两脉二十余年的执念与误解终于在【繁花幽谷双剑合璧坪】彻底爆发。你坚守本脉法统，眼见【王重楼】与【林朝瑶】剑拔弩张、一拍两散——古观立碑封涧，古墓斩索断桥并悬备千斤断龙石，两脉自此划界绝交！岂料西夏一品堂先锋大将趁终南内讧率精锐突袭银练飞瀑，欲渔翁得利。你孤身横剑，不借外脉半点援手，于飞瀑前独力斩退强敌，立誓本脉之道绝不假手于人！',
  initialStepId: 'sever_valley_bound',
  steps: {
    sever_valley_bound: {
      id: 'sever_valley_bound',
      title: '刻石划界 · 断桥封涧',
      objective:
        '王重楼与林朝瑶已于双剑坪彻底反目！请于【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】主持封涧断桥之仪，划定两脉永不相犯之界。',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「主持封涧断桥 · 刻石划定道墓永绝之界」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    repel_vanguard_falls: {
      id: 'repel_vanguard_falls',
      title: '飞瀑孤战 · 独斩敌锋',
      objective:
        '西夏先锋精锐趁终南道墓决裂之际，已由水路潜入【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】！速去独力迎击，以血证本脉锋芒！',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，点击「独战西夏先锋统领 · 孤身护持本脉尊严」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
      },
    },
    lone_peak_oath: {
      id: 'lone_peak_oath',
      title: '孤峰立誓 · 各行其道',
      objective:
        '西夏先锋已溃败而逃。请返回【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，面对残花断碑立下孤峰之誓，自此道归道、墓归墓！',
      nextHint:
        '返回【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，点击「孤峰剑誓 · 自此道墓割席各行其道」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq31_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q31_start_triggered',
      condition: ZHONGNAN_Q31_START_CONDITION,
      effects: [openScene('scene_znq31_01', ZHONGNAN_Q31_QUEST_ID)],
    },
    {
      id: 'trig_znq31_sever',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q31_sever_triggered',
      condition: atStep(ZHONGNAN_Q31_QUEST_ID, 'sever_valley_bound'),
      effects: [openScene('scene_znq31_08', ZHONGNAN_Q31_QUEST_ID)],
    },
    {
      id: 'trig_znq31_falls',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q31_falls_triggered',
      condition: atStep(ZHONGNAN_Q31_QUEST_ID, 'repel_vanguard_falls'),
      effects: [openScene('scene_znq31_14', ZHONGNAN_Q31_QUEST_ID)],
    },
    {
      id: 'trig_znq31_oath',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q31_oath_triggered',
      condition: atStep(ZHONGNAN_Q31_QUEST_ID, 'lone_peak_oath'),
      effects: [openScene('scene_znq31_20', ZHONGNAN_Q31_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq31_start',
      label: '【孤峰执念】赴双剑合璧坪 · 见证道墓两脉彻底决裂',
      badge: '道墓决裂',
      subtitle: '第一幕 · 执念难消，终南两脉于寒涧前反目割席',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: ZHONGNAN_Q31_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q31_start_triggered', value: true },
        openScene('scene_znq31_01', ZHONGNAN_Q31_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq31_sever',
      label: '【孤峰执念】主持封涧断桥 · 刻石划定道墓永绝之界',
      badge: '封涧断桥',
      subtitle: '第八幕 · 古观封涧、古墓断桥备落断龙石',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q31_QUEST_ID, 'sever_valley_bound'),
      effects: [
        { type: 'setFlag', flag: 'zn_q31_sever_triggered', value: true },
        openScene('scene_znq31_08', ZHONGNAN_Q31_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq31_falls',
      label: '【孤峰执念】独战西夏先锋统领 · 孤身护持本脉尊严',
      badge: '飞瀑孤战',
      subtitle: '第十四幕 · 强敌趁乱袭山，独力斩退敌军先锋！',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q31_QUEST_ID, 'repel_vanguard_falls'),
      effects: [
        { type: 'setFlag', flag: 'zn_q31_falls_triggered', value: true },
        openScene('scene_znq31_14', ZHONGNAN_Q31_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq31_oath',
      label: '【孤峰执念】孤峰剑誓 · 自此道墓割席各行其道',
      badge: '孤峰立誓',
      subtitle: '第二十幕 · 既分高下，也决生死，各守孤峰至终',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q31_QUEST_ID, 'lone_peak_oath'),
      effects: [
        { type: 'setFlag', flag: 'zn_q31_oath_triggered', value: true },
        openScene('scene_znq31_20', ZHONGNAN_Q31_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq31_start_npc',
      label: '禀明孤峰决志 · 赴双剑合璧坪与外脉划界割席',
      badge: '道墓决裂',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-0114'] },
          ZHONGNAN_Q31_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q31_start_triggered', value: true },
        openScene('scene_znq31_01', ZHONGNAN_Q31_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanBitterSplitQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q31_QUESTS: QuestDefinition[] = [zhongnanBitterSplitQuest]
