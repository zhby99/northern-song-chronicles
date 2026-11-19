import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q01_QUEST_ID = 'QST-SECT-11-01'

export const ZHONGNAN_Q01_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 1 },
    qStatus('QST-SECT-11-ENTRY', 'completed'),
    qStatus(ZHONGNAN_Q01_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-1056', npcName: '刘处静' },
    { type: 'npcAlive', npcId: 'NPC-0514', npcName: '丘慧霜' },
    { type: 'npcAlive', npcId: 'NPC-0649', npcName: '谭坤朗' },
  ],
}

export const ZHONGNAN_Q01_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q01_QUEST_ID,
    title: '松风鹤影 · 大道筑基',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '不入流 ～ 三流下品',
    maxOpponentRealm: '三流下品（陇右盗柏马贼一正一副）',
    recommendedNote:
      '十四幕终南外门筑基主线：清晨于重阳玄门清修主殿聆听丹阳子马钰玄、长生子刘处静讲授玄门内息，亲授良品内功《全真大道筑基歌》；忽闻丘慧霜急报陇右马贼潜入后山盗伐千年古柏，遂随谭坤朗驰援银练飞瀑，以新成道气一对二击退盗柏马贼！',
    startHint:
      '拜入终南隐宗后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】（或寻马钰玄、刘处静）参加玄门早课。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
    },
    startCondition: ZHONGNAN_Q01_START_CONDITION,
    summary:
      '{reignYear}仲春，重阳古观晨钟三响。大师兄【马钰玄】与二师兄【刘处静】在【重阳玄门清修主殿】开坛演道，为你拆解任督二脉行气之法，亲授终南正宗入门内功《全真大道筑基歌》。晨课甫毕，【丘慧霜】神色焦急奔入殿中，禀报一伙陇右马贼潜入【终南后山寒玉涧 · 银练飞瀑清泉石茗案】盗伐百年青柏。你随【谭坤朗】提剑驰援，于飞瀑水雾间以一对二击退两名陇右马贼，护住终南灵木，初显玄门弟子风范。',
    initialStepId: 'falls_bandit_intercept',
    steps: {
      falls_bandit_intercept: {
        id: 'falls_bandit_intercept',
        title: '飞瀑护柏 · 联手御贼',
        objective:
          '已习得《全真大道筑基歌》！丘慧霜来报陇右马贼正于后山盗伐古柏，请随谭坤朗速赴【终南后山寒玉涧 · 银练飞瀑清泉石茗案】截击贼人！',
        nextHint: '前往【终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_falls',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
        },
      },
      hall_report_back: {
        id: 'hall_report_back',
        title: '归殿复命 · 静参道歌',
        objective:
          '已击退盗柏马贼并护住后山古柏。请返回【重阳古观前脉道院 · 重阳玄门清修主殿】向马钰玄、刘处静复命。',
        nextHint: '返回【重阳玄门清修主殿（zn_to_hall）】向马钰玄或刘处静复命。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_hall',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q01_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'zn_q01_start_triggered',
        condition: ZHONGNAN_Q01_START_CONDITION,
        effects: [openScene('scene_zn_q01_01', ZHONGNAN_Q01_QUEST_ID)],
      },
      {
        id: 'trig_zn_q01_falls',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        onceFlag: 'zn_q01_falls_triggered',
        condition: atStep(ZHONGNAN_Q01_QUEST_ID, 'falls_bandit_intercept'),
        effects: [openScene('scene_zn_q01_07', ZHONGNAN_Q01_QUEST_ID)],
      },
      {
        id: 'trig_zn_q01_report',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'zn_q01_report_triggered',
        condition: atStep(ZHONGNAN_Q01_QUEST_ID, 'hall_report_back'),
        effects: [openScene('scene_zn_q01_12', ZHONGNAN_Q01_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q01_start',
        label: '【玄门晨课】随马钰玄、刘处静参悟《全真大道筑基歌》',
        badge: '大道筑基',
        subtitle: '第一幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: ZHONGNAN_Q01_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q01_start_triggered', value: true },
          openScene('scene_zn_q01_01', ZHONGNAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q01_falls',
        label: '【飞瀑护柏】截击盗伐古柏的陇右马贼',
        badge: '飞瀑驱贼',
        subtitle: '第七幕 · 银练飞瀑清泉石茗案',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        visibleWhen: atStep(ZHONGNAN_Q01_QUEST_ID, 'falls_bandit_intercept'),
        effects: [
          { type: 'setFlag', flag: 'zn_q01_falls_triggered', value: true },
          openScene('scene_zn_q01_07', ZHONGNAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q01_report',
        label: '【归殿复命】向马钰玄、刘处静禀报护柏经过',
        badge: '晨课圆满',
        subtitle: '第十二幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: atStep(ZHONGNAN_Q01_QUEST_ID, 'hall_report_back'),
        effects: [
          { type: 'setFlag', flag: 'zn_q01_report_triggered', value: true },
          openScene('scene_zn_q01_12', ZHONGNAN_Q01_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q01_start',
        label: '参加重阳晨课 · 领受《全真大道筑基歌》',
        badge: '大道筑基',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1054', 'NPC-1056'] },
            ZHONGNAN_Q01_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q01_start_triggered', value: true },
          openScene('scene_zn_q01_01', ZHONGNAN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q01_report',
        label: '禀报银练飞瀑击退盗柏马贼经过',
        badge: '归殿复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1054', 'NPC-1056'] },
            atStep(ZHONGNAN_Q01_QUEST_ID, 'hall_report_back'),
          ],
        },
        effects: [openScene('scene_zn_q01_12', ZHONGNAN_Q01_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanFoundationSongQuest.scenes').then((m) => m.SCENES),
  },
]
