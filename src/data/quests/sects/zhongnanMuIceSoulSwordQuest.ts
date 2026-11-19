import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q34_QUEST_ID = 'QST-SECT-11-34'

export const ZHONGNAN_Q34_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 4 },
    flag('zn_branch', 'eq', 'gumu'),
    {
      type: 'any',
      conditions: [
        qStatus('QST-SECT-11-30', 'completed'),
        qStatus('QST-SECT-11-31', 'completed'),
      ],
    },
    qStatus(ZHONGNAN_Q34_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0233', npcName: '叶二娘' },
    { type: 'npcAlive', npcId: 'NPC-0183', npcName: '岳老三' },
  ],
}

export const zhongnanMuIceSoulSwordQuest: QuestDefinition = {
  id: ZHONGNAN_Q34_QUEST_ID,
  title: '冰魄凝心 · 寒玉托剑',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师下品 ～ 宗师中品',
  maxOpponentRealm: '一流中品双凶（无恶不作 · 叶二娘 / 凶神恶煞 · 岳老三）',
  recommendedNote:
    '终南隐宗活死人墓神兵承接线（全二十八幕）。须达宗门四阶、身属古墓一脉并完成道墓合流或决裂枢纽任务。于昆仑寒玉床冰魄石室承接林朝瑶亲授的【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】，并于银练飞瀑清泉石茗案独力以一敌二击溃西夏一品堂恶人叶二娘与岳老三！',
  startHint:
    '位列终南隐宗四阶且完成道墓合流/决裂枢纽后，前往【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】面谒林朝瑶即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tomb',
    spotId: 'zn_tb_jadebed',
    customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
  },
  startCondition: ZHONGNAN_Q34_START_CONDITION,
  summary:
    '{reignYear}初冬，终南幽谷寒雾弥漫。西夏一品堂派遣四大恶人中的【叶二娘】与【岳老三】潜入后山寒玉涧，企图以酷烈杀戮逼出活死人墓秘藏。危急时刻，寒玉仙子【林朝瑶】于【昆仑寒玉床冰魄石室】取出古墓镇派双宝——【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】郑重托付于你。你在【天罗地网捕雀轻功厅】凝心试剑、令寒玉心玦与冰魄剑意融会贯通，旋即孤身赴【银练飞瀑清泉石茗案】，以一敌二力挫叶二娘柳叶双刀与岳老三鳄嘴剪，护持幽谷百年清净！',
  initialStepId: 'sparrow_hall_attune',
  steps: {
    sparrow_hall_attune: {
      id: 'sparrow_hall_attune',
      title: '捕雀凝心 · 冰魄初鸣',
      objective:
        '林朝瑶已将寒玉素心冰魄剑与昆仑寒玉冰心玦暂托予你。请速赴【终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅（zn_tb_sparrow）】，静心演练令剑气与玉玦寒息融为一体！',
      nextHint:
        '前往【终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅（zn_tb_sparrow）】，点击「入捕雀轻功厅 · 凝心试剑令冰魄寒玉合一」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_sparrow',
        customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
      },
    },
    falls_dual_villains: {
      id: 'falls_dual_villains',
      title: '飞瀑双凶 · 一剑破恶',
      objective:
        '西夏一品堂两大恶人叶二娘与岳老三已闯入【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】肆虐！速去仗冰魄寒剑以一敌二将其击溃！',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，点击「飞瀑迎战双凶 · 独斗叶二娘与岳老三」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
      },
    },
    return_jadebed_bestow: {
      id: 'return_jadebed_bestow',
      title: '素心归墓 · 寒玉永托',
      objective:
        '叶二娘与岳老三已被冰魄剑气重创败逃！请返回【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，向林朝瑶复命并正式承接古墓镇派双宝！',
      nextHint:
        '返回【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，点击「拜谒林朝瑶 · 正式承接冰魄剑与寒玉冰心玦」。',
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
      id: 'trig_znq34_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'zn_q34_start_triggered',
      condition: ZHONGNAN_Q34_START_CONDITION,
      effects: [openScene('scene_znq34_01', ZHONGNAN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_znq34_sparrow',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_sparrow',
      onceFlag: 'zn_q34_sparrow_triggered',
      condition: atStep(ZHONGNAN_Q34_QUEST_ID, 'sparrow_hall_attune'),
      effects: [openScene('scene_znq34_08', ZHONGNAN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_znq34_falls',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q34_falls_triggered',
      condition: atStep(ZHONGNAN_Q34_QUEST_ID, 'falls_dual_villains'),
      effects: [openScene('scene_znq34_14', ZHONGNAN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_znq34_return',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'zn_q34_return_triggered',
      condition: atStep(ZHONGNAN_Q34_QUEST_ID, 'return_jadebed_bestow'),
      effects: [openScene('scene_znq34_23', ZHONGNAN_Q34_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq34_start',
      label: '【冰魄凝心】谒见林朝瑶 · 承接寒玉素心冰魄剑与冰心玦',
      badge: '寒玉托剑',
      subtitle: '第一幕 · 恶人犯谷，寒玉仙子亲授古墓镇派双宝',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: ZHONGNAN_Q34_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q34_start_triggered', value: true },
        openScene('scene_znq34_01', ZHONGNAN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq34_sparrow',
      label: '【冰魄凝心】入捕雀轻功厅 · 凝心试剑令冰魄寒玉合一',
      badge: '冰魄初鸣',
      subtitle: '第八幕 · 天罗地网势中演练冰魄剑气，令双宝寒息共鸣',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_sparrow',
      visibleWhen: atStep(ZHONGNAN_Q34_QUEST_ID, 'sparrow_hall_attune'),
      effects: [
        { type: 'setFlag', flag: 'zn_q34_sparrow_triggered', value: true },
        openScene('scene_znq34_08', ZHONGNAN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq34_falls',
      label: '【冰魄凝心】飞瀑迎战双凶 · 独斗叶二娘与岳老三',
      badge: '以一敌二',
      subtitle: '第十四幕 · 1v2 硬仗！冰魄寒剑力挫四大恶人双凶！',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q34_QUEST_ID, 'falls_dual_villains'),
      effects: [
        { type: 'setFlag', flag: 'zn_q34_falls_triggered', value: true },
        openScene('scene_znq34_14', ZHONGNAN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq34_return',
      label: '【冰魄凝心】拜谒林朝瑶 · 正式承接冰魄剑与寒玉冰心玦',
      badge: '寒玉永托',
      subtitle: '第二十三幕 · 幽谷复命，古墓镇派神兵宝玉正式归主',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: atStep(ZHONGNAN_Q34_QUEST_ID, 'return_jadebed_bestow'),
      effects: [
        { type: 'setFlag', flag: 'zn_q34_return_triggered', value: true },
        openScene('scene_znq34_23', ZHONGNAN_Q34_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq34_lin_start',
      label: '叩请林朝瑶 · 承接寒玉冰魄剑以退犯谷双凶',
      badge: '冰魄凝心',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0114'] },
          ZHONGNAN_Q34_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q34_start_triggered', value: true },
        openScene('scene_znq34_01', ZHONGNAN_Q34_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanMuIceSoulSwordQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q34_QUESTS: QuestDefinition[] = [zhongnanMuIceSoulSwordQuest]
