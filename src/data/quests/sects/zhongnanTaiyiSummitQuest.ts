import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q41_QUEST_ID = 'QST-SECT-11-41'

export const ZHONGNAN_Q41_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 5 },
    qStatus(ZHONGNAN_Q41_QUEST_ID, 'not_started'),
    qStatus('QST-SECT-11-40', 'completed'),
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-0115', npcName: '冯默岚' },
    { type: 'npcAlive', npcId: 'NPC-0107', npcName: '黄裳' },
  ],
}

export const zhongnanTaiyiSummitQuest: QuestDefinition = {
  id: ZHONGNAN_Q41_QUEST_ID,
  title: '云深不知 · 太乙论道',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师上品 ～ 大宗师下品',
  maxOpponentRealm: '宗师上品（燕山潜龙 · 慕容博）',
  recommendedNote:
    '终南隐宗五阶终极封神大典（全四十五幕）。贺兰破冰威震天下后，九月初九重阳佳节，四海绝顶高人齐聚终南后山寒玉涧：道藏奇人黄裳亲临银练飞瀑作证，东海奇侠冯默岚、吐蕃大轮明王鸠摩智、姑苏燕山潜龙慕容博依次登临繁花幽谷双剑合璧坪以武论道。三场绝顶宗师车轮大战，战前皆得清泉松茗调息回满，胜尽天下群豪后，终南隐宗超然物外、永载江湖史册。',
  startHint:
    '完成【贺兰破冰 · 寒窖问尊】后，前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】迎候道藏奇人黄裳与四海来宾，开启太乙论道大典。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_falls',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
  },
  startCondition: ZHONGNAN_Q41_START_CONDITION,
  summary:
    '{reignYear}九月初九重阳佳节，终南山云海翻涌、菊香满谷。自贺兰破冰一役威震西北以来，四海绝顶高人纷纷递帖登山。编纂《万寿道藏》的绝代奇人黄裳亲临【终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】煮茗作证，而东海桃花岛「东海奇侠」冯默岚、吐蕃密宗「大轮明王」鸠摩智、姑苏慕容氏「燕山潜龙」慕容博三位绝顶宗师齐登【繁花幽谷双剑合璧坪（zn_st_sword）】，与你展开千载难逢的「太乙论道」。你以终南至高武意先后破落英碧波、化火焰禅刀、折参合斗转，连胜三大宗师，令黄裳抚掌赞叹「云深不知处，太乙冠乾坤」。自此终南隐宗超然封神，名垂青史。',
  initialStepId: 'duel_feng_molan',
  steps: {
    duel_feng_molan: {
      id: 'duel_feng_molan',
      title: '太乙第一论 · 东海奇侠冯默岚',
      objective:
        '重阳太乙论道大典已启，黄裳先生坐镇见证！请赴【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】迎战首阵宾客——东海奇侠冯默岚。',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，点击「登坪论道，首战东海奇侠冯默岚」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    duel_jiumozhi: {
      id: 'duel_jiumozhi',
      title: '太乙第二论 · 大轮明王鸠摩智',
      objective:
        '已与东海奇侠冯默岚论剑尽欢！吐蕃国师大轮明王鸠摩智跃跃欲试，请于【繁花幽谷双剑合璧坪（zn_st_sword）】迎战其火焰刀与少林绝技。',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，点击「再登剑坪，次战吐蕃大轮明王鸠摩智」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    duel_murong_bo: {
      id: 'duel_murong_bo',
      title: '太乙第三论 · 燕山潜龙慕容博',
      objective:
        '火焰刀已敛锋芒，压轴登坪者乃是深藏不露的姑苏「燕山潜龙」慕容博！请于【繁花幽谷双剑合璧坪（zn_st_sword）】迎战斗转星移与参合指。',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，点击「压轴论道，决战燕山潜龙慕容博」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    taiyi_coronation: {
      id: 'taiyi_coronation',
      title: '云深不知 · 飞瀑石茗封神',
      objective:
        '连胜三大绝顶宗师，四海宾客无不折服！请赴【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】与黄裳及群雄共饮重阳松茗，成就终南超然封神之誉。',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，点击「飞瀑煮茗，与黄裳及四海宗师共结太乙盛会」。',
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
      id: 'trig_zn_q41_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q41_start_triggered',
      condition: ZHONGNAN_Q41_START_CONDITION,
      effects: [openScene('scene_zn41_01', ZHONGNAN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_zn_q41_feng',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q41_feng_triggered',
      condition: atStep(ZHONGNAN_Q41_QUEST_ID, 'duel_feng_molan'),
      effects: [openScene('scene_zn41_09', ZHONGNAN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_zn_q41_jiumozhi',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q41_jiumozhi_triggered',
      condition: atStep(ZHONGNAN_Q41_QUEST_ID, 'duel_jiumozhi'),
      effects: [openScene('scene_zn41_19', ZHONGNAN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_zn_q41_murong',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q41_murong_triggered',
      condition: atStep(ZHONGNAN_Q41_QUEST_ID, 'duel_murong_bo'),
      effects: [openScene('scene_zn41_29', ZHONGNAN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_zn_q41_coronation',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q41_coronation_triggered',
      condition: atStep(ZHONGNAN_Q41_QUEST_ID, 'taiyi_coronation'),
      effects: [openScene('scene_zn41_39', ZHONGNAN_Q41_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_q41_start',
      label: '【终南封神】重阳煮茗迎黄裳，开启太乙论道大典',
      badge: '太乙论道',
      subtitle: '银练飞瀑清泉石茗案',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: ZHONGNAN_Q41_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q41_start_triggered', value: true },
        openScene('scene_zn41_01', ZHONGNAN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q41_feng',
      label: '【太乙论道】登坪论剑，首战东海奇侠冯默岚',
      badge: '第一论',
      subtitle: '繁花幽谷双剑合璧坪',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q41_QUEST_ID, 'duel_feng_molan'),
      effects: [
        { type: 'setFlag', flag: 'zn_q41_feng_triggered', value: true },
        openScene('scene_zn41_09', ZHONGNAN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q41_jiumozhi',
      label: '【太乙论道】再登剑坪，次战吐蕃大轮明王鸠摩智',
      badge: '第二论',
      subtitle: '繁花幽谷双剑合璧坪',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q41_QUEST_ID, 'duel_jiumozhi'),
      effects: [
        { type: 'setFlag', flag: 'zn_q41_jiumozhi_triggered', value: true },
        openScene('scene_zn41_19', ZHONGNAN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q41_murong',
      label: '【太乙论道】压轴论道，决战燕山潜龙慕容博',
      badge: '第三论',
      subtitle: '繁花幽谷双剑合璧坪',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q41_QUEST_ID, 'duel_murong_bo'),
      effects: [
        { type: 'setFlag', flag: 'zn_q41_murong_triggered', value: true },
        openScene('scene_zn41_29', ZHONGNAN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q41_coronation',
      label: '【终南封神】飞瀑煮茗，与黄裳及四海宗师共结太乙盛会',
      badge: '云深封神',
      subtitle: '银练飞瀑清泉石茗案',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q41_QUEST_ID, 'taiyi_coronation'),
      effects: [
        { type: 'setFlag', flag: 'zn_q41_coronation_triggered', value: true },
        openScene('scene_zn41_39', ZHONGNAN_Q41_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanTaiyiSummitQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q41_QUESTS: QuestDefinition[] = [zhongnanTaiyiSummitQuest]
