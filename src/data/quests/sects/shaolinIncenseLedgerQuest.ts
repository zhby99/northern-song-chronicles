import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q03_QUEST_ID = 'QST-SECT-01-03'

export const SHAOLIN_Q03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-02', 'completed'),
    qStatus(SHAOLIN_Q03_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 45 },
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
      '嵩山少林寺 Lv.1 外门进阶核心任务链（全十幕）。入寺满 45 日且经义、算术达标后，于钟鼓禅院偶遇遭黑市追杀的洛阳牙人贾通宝；古柏寒林可散银诱开副手孙七或正面车轮连战断魂刀赵魁，夺回《知客院香火私册》后孤灯推演账目破绽（无提示真核账），最终在「大义灭亲自陈旧过」「撕页自保权谋密告」「焚账收三百两黑银」三岔路口直面道心拷问。',
    startHint:
      '拜入少林满 45 日、完成《少室庄田 · 拳棍止争》且经义与算术精进后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院】即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
    },
    startCondition: SHAOLIN_Q03_START_CONDITION,
    summary:
      '{reignYear}深秋暮色，昔日收你二百五十两纹银牵线入少林的洛阳牙人【贾通宝】浑身血污逃上少室山麓。你在古柏寒林或散银诱离副手孙七、或车轮连战力挫黑市杀手「断魂刀」赵魁，救下贾通宝并取得《知客院香火私册》。孤灯之下你逐笔核验三年度牒定额与商号汇兑，揭穿知客禅师【玄净】倒卖朝廷免税空名度牒之重罪，却惊觉册末赫然记着你当年递银入寺之名！面对玄净的威逼利诱，你在大义自陈、撕页自保与焚账收银三路之间做出道心决断。',
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
          '已查明知客禅师玄净倒卖朝廷空名度牒黑幕，且私册末页记有你当年入寺旧事。请前往【十八铜人罗汉堂 · 罗汉堂演武正殿】（或于钟鼓禅院决断），在原封密呈、撕页自保与替玄净焚账收银之间做出抉择！',
        nextHint:
          '前往【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】点击「香火私册决断 · 道心三择」（亦可直接寻玄苦、玄净交谈）。',
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
        subtitle: '钟鼓禅院演武坪外古柏林',
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
        subtitle: '散银乱贼或车轮连战 · 护下贾通宝',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q03_QUEST_ID, 'pine_forest_rescue'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q03_sunqi_distracted', op: 'truthy' },
            thenEffects: [openScene('scene_slq03_03_solo', SHAOLIN_Q03_QUEST_ID)],
            elseEffects: [openScene('scene_slq03_03', SHAOLIN_Q03_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq03_decision_luohan',
        label: '【少林师门】香火私册决断 · 道心三择',
        badge: '道心抉择',
        subtitle: '罗汉堂演武正殿 · 密呈、撕页或焚账',
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
        subtitle: '钟鼓禅院 · 焚账收银或折返密告',
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
