import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q03_QUEST_ID = 'QST-SECT-01-03'

export const SHAOLIN_Q03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-02', 'completed'),
    qStatus(SHAOLIN_Q03_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 180 },
    { type: 'skillAtLeast', key: '经义', min: 35 },
    { type: 'skillAtLeast', key: '算术', min: 20 },
    { type: 'npcAlive', npcId: 'NPC-0193', npcName: '玄净' },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
  ],
}

export const SHAOLIN_Q03_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q03_QUEST_ID,
    title: '香火黑账 · 知客暗流',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流中品 ～ 三流上品',
    maxOpponentRealm: '三流上品（黑市刀客 · 断魂刀赵魁）',
    recommendedNote:
      '嵩山少林寺 Lv.1 外门进阶核心任务链（全十六幕）。入寺满一百八十日且经义、算术达标后，于钟鼓禅院偶遇遭黑市追杀逃上少室山的洛阳牙人贾通宝，古柏寒林力战断魂刀赵魁夺回《知客院香火私册》，揭开知客禅师玄净倒卖朝廷空名度牒之惊天黑幕。面临牵连当年入寺旧案的危局，需在销毁私账与密呈玄苦之间做出抉择。',
    startHint:
      '拜入少林满一百八十日、完成《少室庄田 · 拳棍止争》且经义与算术精进后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院】即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
    },
    startCondition: SHAOLIN_Q03_START_CONDITION,
    summary:
      '{reignYear}深秋暮色，昔日收你二百五十两纹银牵线入少林的洛阳牙人【贾通宝】浑身血污逃上少室山麓。你在古柏寒林以一敌二击退黑市刀客「断魂刀」赵魁及其副手，救下贾通宝并取得《知客院香火私册》。孤灯之下你凭算术逐笔核账，惊觉知客禅师【玄净】暗中倒卖朝廷免税空名度牒、牟利数千两，而账册末页竟赫然记着你当年行贿入寺之名！面对玄净的威逼利诱，你携私册步向【十八铜人罗汉堂 · 罗汉堂演武正殿】，在替其焚账换银与密呈【玄苦】清查之间迎来道心拷问。',
    initialStepId: 'pine_forest_rescue',
    steps: {
      pine_forest_rescue: {
        id: 'pine_forest_rescue',
        title: '古柏寒林 · 救牙夺册',
        objective:
          '昔日牵线入寺的洛阳牙人贾通宝浑身带血逃至钟鼓禅院外古柏寒林，黑市追兵已近在咫尺！请留在【大雄宝殿方丈院 · 钟鼓禅院】迎战黑市刀客「断魂刀」赵魁，救下贾通宝并查明内情！',
        nextHint:
          '在【大雄宝殿方丈院 · 钟鼓禅院（sl_daxiong_west）】点击「赴古柏寒林 · 迎战黑市断魂刀赵魁」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
        },
      },
      ledger_decision: {
        id: 'ledger_decision',
        title: '香火私册 · 道心抉择',
        objective:
          '已查明知客禅师玄净倒卖朝廷空名度牒黑幕，且私册末页记有你当年入寺旧事。请前往【十八铜人罗汉堂 · 罗汉堂演武正殿】（或于钟鼓禅院决断），在替玄净销毁私账与密呈玄苦长老清查之间做出抉择！',
        nextHint:
          '前往【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】点击「香火私册决断 · 焚账自保或密呈玄苦」（亦可直接寻玄苦、玄净交谈）。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_main',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq03_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q03_start_triggered',
        condition: SHAOLIN_Q03_START_CONDITION,
        effects: [openScene('scene_slq03_01', SHAOLIN_Q03_QUEST_ID)],
      },
      {
        id: 'trig_slq03_decision_luohan',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_q03_decision_triggered',
        condition: atStep(SHAOLIN_Q03_QUEST_ID, 'ledger_decision'),
        effects: [openScene('scene_slq03_12', SHAOLIN_Q03_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq03_start_west',
        label: '【少林师门】暮色古柏 · 救治血污逃山之人',
        badge: '知客暗流',
        subtitle: '第一幕 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_Q03_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q03_start_triggered', value: true },
          openScene('scene_slq03_01', SHAOLIN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq03_pine_ambush',
        label: '【少林师门】赴古柏寒林 · 迎战黑市断魂刀赵魁',
        badge: '古柏寒林',
        subtitle: '第三幕 · 1v2 实战护下贾通宝',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q03_QUEST_ID, 'pine_forest_rescue'),
        effects: [openScene('scene_slq03_03', SHAOLIN_Q03_QUEST_ID)],
      },
      {
        id: 'spot_slq03_decision_luohan',
        label: '【少林师门】香火私册决断 · 密呈玄苦或折返焚账',
        badge: '道心抉择',
        subtitle: '第十二幕 · 罗汉堂演武正殿',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: atStep(SHAOLIN_Q03_QUEST_ID, 'ledger_decision'),
        effects: [
          { type: 'setFlag', flag: 'sl_q03_decision_triggered', value: true },
          openScene('scene_slq03_12', SHAOLIN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq03_decision_west',
        label: '【少林师门】香火私册决断 · 与玄净做个了断',
        badge: '道心抉择',
        subtitle: '第十二幕 · 钟鼓禅院',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q03_QUEST_ID, 'ledger_decision'),
        effects: [
          { type: 'setFlag', flag: 'sl_q03_decision_triggered', value: true },
          openScene('scene_slq03_12', SHAOLIN_Q03_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq03_decision_npc',
        label: '呈示《知客院香火私册》 · 做出最终决断',
        badge: '香火黑账',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126', 'NPC-0193'] },
            atStep(SHAOLIN_Q03_QUEST_ID, 'ledger_decision'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q03_decision_triggered', value: true },
          openScene('scene_slq03_12', SHAOLIN_Q03_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinIncenseLedgerQuest.scenes').then((m) => m.SCENES),
  },
]
