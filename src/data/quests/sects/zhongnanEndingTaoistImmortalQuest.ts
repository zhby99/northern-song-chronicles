import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q39_QUEST_ID = 'QST-SECT-11-39'

export const ZHONGNAN_Q39_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-33', 'completed'),
    flag('zn_cross', 'eq', 'harmony'),
    flag('zn_ending', 'falsy'),
    qStatus(ZHONGNAN_Q39_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-0107', npcName: '黄裳' },
    { type: 'npcAlive', npcId: 'NPC-0119', npcName: '张玄素' },
  ],
}

export const zhongnanEndingTaoistImmortalQuest: QuestDefinition = {
  id: ZHONGNAN_Q39_QUEST_ID,
  title: '坐忘太虚 · 道藏真君',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师上品（道藏真君 · 黄裳 / 太和真人 · 张玄素 · 论道切磋）',
  recommendedNote:
    '终南隐宗四大终局之一【道藏真君超脱线】（全三十二幕，与其余三大终局严格互斥）。须完成《QST-SECT-11-33》且处于道墓合流线。你于重阳主殿婉辞俗务掌门位，举荐马钰玄执掌前山古观、冷清秋主理后山古墓，随即赴银练飞瀑清泉石茗案邀道藏真君黄裳与武当太和真人张玄素坐忘论道七昼夜，终证太虚道境，获尊号宗门五阶【终南太上隐尊】！',
  startHint:
    '完成《QST-SECT-11-33》且处于道墓合流线后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】即可开启超脱终局。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q39_START_CONDITION,
  summary:
    '{reignYear}清秋，终南山云海苍茫。塞北既平、道墓既合，紫阳真人【王重楼】本欲将掌门大位托付于你，你却早已看透门户俗务，决意超然物外、追寻天地大道至理。你于【重阳玄门清修主殿】婉辞掌门之位，举荐稳重厚德的【马钰玄】执掌重阳古观，请【冷清秋】主理活死人墓，自己则归隐后山【银练飞瀑清泉石茗案】。未几，编纂万寿道藏的奇人【黄裳】与武当宗师【张玄素】慕名登终南相访。三贤于飞瀑清泉畔坐忘论道七昼夜，以武印道、以道化武，终令你破开虚空樊篱，获天下道门共尊为【终南太上隐尊】！',
  initialStepId: 'falls_dao_summit',
  steps: {
    falls_dao_summit: {
      id: 'falls_dao_summit',
      title: '清泉迎贤 · 坐忘论道',
      objective:
        '你已婉辞俗务掌门位并妥善安顿古观与古墓传承。道藏真君黄裳与太和真人张玄素已应邀登临终南，请速赴【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】设茗迎贤、坐忘论道！',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，点击「清泉设茗 · 与黄裳、张玄素坐忘论道七昼夜」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
      },
    },
    immortal_ascension: {
      id: 'immortal_ascension',
      title: '坐忘太虚 · 太上隐尊',
      objective:
        '七昼夜坐忘论道已毕，你已破开后天执念、窥见太虚天人合一之境！请留在【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，受王重楼与道门诸贤共奉【终南太上隐尊】尊号！',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】点击「坐忘归真 · 受奉终南太上隐尊尊号」。',
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
      id: 'trig_znq39_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q39_start_triggered',
      condition: ZHONGNAN_Q39_START_CONDITION,
      effects: [openScene('scene_znq39_01', ZHONGNAN_Q39_QUEST_ID)],
    },
    {
      id: 'trig_znq39_summit',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q39_summit_triggered',
      condition: atStep(ZHONGNAN_Q39_QUEST_ID, 'falls_dao_summit'),
      effects: [openScene('scene_znq39_09', ZHONGNAN_Q39_QUEST_ID)],
    },
    {
      id: 'trig_znq39_ascend',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q39_ascend_triggered',
      condition: atStep(ZHONGNAN_Q39_QUEST_ID, 'immortal_ascension'),
      effects: [openScene('scene_znq39_26', ZHONGNAN_Q39_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq39_start',
      label: '【终南终局 · 道藏真君】重阳主殿辞位 · 举贤让能追寻无上大道',
      badge: '坐忘太虚',
      subtitle: '第一幕 · 超脱隐尊终局，辞去俗务掌门位，邀天下道宗坐忘论道',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q39_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q39_start_triggered', value: true },
        openScene('scene_znq39_01', ZHONGNAN_Q39_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq39_summit',
      label: '【坐忘太虚】清泉设茗 · 与黄裳、张玄素坐忘论道七昼夜',
      badge: '三贤论道',
      subtitle: '第九幕 · 迎候道藏真君黄裳与太和真人张玄素，以武印道七昼夜',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q39_QUEST_ID, 'falls_dao_summit'),
      effects: [
        { type: 'setFlag', flag: 'zn_q39_summit_triggered', value: true },
        openScene('scene_znq39_09', ZHONGNAN_Q39_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq39_ascend',
      label: '【坐忘太虚】坐忘归真 · 受奉终南太上隐尊尊号',
      badge: '太上隐尊',
      subtitle: '第二十六幕 · 证道太虚，晋升终南隐宗五阶太上隐尊',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q39_QUEST_ID, 'immortal_ascension'),
      effects: [
        { type: 'setFlag', flag: 'zn_q39_ascend_triggered', value: true },
        openScene('scene_znq39_26', ZHONGNAN_Q39_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq39_wang_start',
      label: '叩见紫阳真人 · 辞去俗务掌门位，请示坐忘太虚之志',
      badge: '坐忘太虚',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133'] },
          ZHONGNAN_Q39_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q39_start_triggered', value: true },
        openScene('scene_znq39_01', ZHONGNAN_Q39_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanEndingTaoistImmortalQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q39_QUESTS: QuestDefinition[] = [zhongnanEndingTaoistImmortalQuest]
