import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE03_QUEST_ID = 'QST-SECT-05-SIDE-03'

export const HUASHAN_SIDE03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-02', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus(HUASHAN_SIDE03_QUEST_ID, 'not_started'),
    flag('hs_ending', 'neq', 'sword_usurp'),
    { type: 'skillAtLeast', key: '棋', min: 25 },
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
  ],
}

export const HUASHAN_SIDE03_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE03_QUEST_ID,
    title: '博台纹枰 · 希夷残局录',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流中品（江南慕容棋待诏 · 慕容清砚）',
    recommendedNote:
      '华山派 Lv.2 内门弈道支线（全十二幕）。需完成博台大比（QST-SECT-05-02）且棋艺达 25 以上，前往绝顶博台孤峰弈棋亭助岳沧溟、宁清羽破解陈抟希夷古谱残局，三日后复于亭中迎战江南慕容棋待诏，以棋驭剑识破袖箭暗算。',
    startHint:
      '成为华山内门弟子且棋艺达到 25 后，前往【潼关 / 西岳华山 · 西岳绝顶 · 博台孤峰弈棋亭（tg_sm_chess）】即可触发。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_chess',
      customLabel: '潼关 / 西岳华山 · 西岳绝顶 · 博台孤峰弈棋亭',
    },
    startCondition: HUASHAN_SIDE03_START_CONDITION,
    summary:
      '{reignYear}云海晴明，你登临【西岳绝顶 · 博台孤峰弈棋亭】，正逢掌门【岳沧溟】与【宁清羽】在铁亭石枰前推演五代希夷先生陈抟当年与宋太祖对弈「赢华山」留下的古谱残局。你观局良久，执黑三子奇正相生、弃角取势，竟将百年死局盘活。三日后，一名自称江南姑苏棋待诏的慕容氏门客【慕容清砚】携重礼登临博台，明为切磋棋艺、实欲借残局折辱华山清誉，更在衣袖中暗藏毒针袖箭。你于纹枰上大破其伪势，复以剑意先机震落其袖箭，十合剑势将其逼落亭阶，大长西岳声威。',
    initialStepId: 'meet_murong_envoy',
    steps: {
      meet_murong_envoy: {
        id: 'meet_murong_envoy',
        title: '三日之约 · 博台迎客',
        objective:
          '希夷古谱残局既破，山门忽报有江南姑苏棋待诏携帖求弈博台！请前往【西岳绝顶 · 博台孤峰弈棋亭（tg_sm_chess）】会晤慕容来使。',
        nextHint:
          '在【西岳绝顶 · 博台孤峰弈棋亭（tg_sm_chess）】点击「赴博台石亭 · 会晤江南慕容棋待诏」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_chess',
          customLabel: '潼关 / 西岳华山 · 西岳绝顶 · 博台孤峰弈棋亭',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss03_start_chess',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        onceFlag: 'hs_side03_start_triggered',
        condition: HUASHAN_SIDE03_START_CONDITION,
        effects: [openScene('scene_hss03_01', HUASHAN_SIDE03_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss03_start_chess',
        label: '【华山支线】博台观弈 · 参详陈抟希夷古谱残局',
        badge: '希夷残局',
        subtitle: '棋艺 ≥ 25 · 博台孤峰弈棋亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: HUASHAN_SIDE03_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_side03_start_triggered', value: true },
          openScene('scene_hss03_01', HUASHAN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss03_meet_envoy',
        label: '【华山支线】赴博台石亭 · 会晤江南慕容棋待诏',
        badge: '纹枰斗剑',
        subtitle: '博台孤峰弈棋亭',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: atStep(HUASHAN_SIDE03_QUEST_ID, 'meet_murong_envoy'),
        effects: [openScene('scene_hss03_06', HUASHAN_SIDE03_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_hss03_start_npc',
        label: '请教博台陈抟希夷古谱残局',
        badge: '希夷残局',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
            HUASHAN_SIDE03_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_side03_start_triggered', value: true },
          openScene('scene_hss03_01', HUASHAN_SIDE03_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideBotaiChessQuest.scenes').then((m) => m.SCENES),
  },
]
