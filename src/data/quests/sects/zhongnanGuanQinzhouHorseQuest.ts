import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q07_QUEST_ID = 'QST-SECT-11-07'

export const ZHONGNAN_Q07_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-06', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q07_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0090', npcName: '瞎毡' },
    { type: 'npcAlive', npcId: 'NPC-0045', npcName: '刘沪' },
    { type: 'npcAlive', npcId: 'NPC-0313', npcName: '雷万里' },
  ],
}

export const ZHONGNAN_Q07_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q07_QUEST_ID,
    title: '秦州烽火 · 铁骑护马',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'qinzhou',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品 ～ 二流上品（西夏劫马铁骑骁将）',
    recommendedNote:
      '二十二幕重阳古观西赴秦州护马壮举：驰援【秦州官营茶马榷场 · 吐蕃青唐验马阑】会合马钰玄、丘处玄与河州吐蕃首领瞎毡；旋即奔赴【陇右古战场烽燧 · 金环聚义堂】联手名将刘沪、陇右金环雷万里破西夏劫马铁骑！战后迎来古观道风抉择——随丘处玄「横剑追歼」或随马钰玄「抚民济伤」，并获赠良阶坐骑【秦州茶马上等河曲驹（MNT-009）】！',
    startHint:
      '完成《草堂护道 · 正气劈空》后，前往【秦州府 · 秦州官营茶马榷场 · 吐蕃青唐验马阑】（或寻马钰玄、丘处玄、瞎毡）驰援秦州护马。',
    startLocation: {
      regionId: 'qinzhou',
      buildingId: 'qzf_chama',
      spotId: 'qzf_chama_east',
      customLabel: '秦州府 · 秦州官营茶马榷场 · 吐蕃青唐验马阑',
    },
    startCondition: ZHONGNAN_Q07_START_CONDITION,
    summary:
      '{reignYear}初秋，秦州边塞烽烟再起。西夏轻骑企图突袭【秦州官营茶马榷场】，焚毁河州吐蕃首领【瞎毡】送来的百匹战马。你随【丘处玄】西行至【吐蕃青唐验马阑】与大师兄【马钰玄】会合，旋即奔赴【陇右古战场烽燧 · 古塞石堡 · 金环聚义堂】，联手镇守水洛城的抗夏名将【刘沪】与陇右豪侠【雷万里】设伏破敌。激战过后，你在丘处玄的「刚猛追歼（尚武）」与马钰玄的「抚民救伤（清静）」间择定个人道风，获赠良阶神骏【秦州茶马上等河曲驹】！',
    initialStepId: 'longyou_ambush_xixia',
    steps: {
      longyou_ambush_xixia: {
        id: 'longyou_ambush_xixia',
        title: '陇右烽燧 · 设伏破夏骑',
        objective:
          '已在验马阑稳住吐蕃马队！请速赴【秦州府 · 陇右古战场烽燧 · 古塞石堡 · 金环聚义堂】，会合【刘沪】与【雷万里】迎击突袭而来的西夏劫马铁骑！',
        nextHint: '前往【秦州府 · 陇右古战场烽燧 · 古塞石堡 · 金环聚义堂（qzf_longyou_main）】。',
        targetLocation: {
          regionId: 'qinzhou',
          buildingId: 'qzf_longyou',
          spotId: 'qzf_longyou_main',
          customLabel: '秦州府 · 陇右古战场烽燧 · 古塞石堡 · 金环聚义堂',
        },
      },
      chama_receive_steed: {
        id: 'chama_receive_steed',
        title: '茶马归功 · 择定道风',
        objective:
          '西夏劫马铁骑已溃！请返回【秦州官营茶马榷场 · 吐蕃青唐验马阑】，与马钰玄、丘处玄及瞎毡善后并领受河曲良驹！',
        nextHint: '返回【秦州官营茶马榷场 · 吐蕃青唐验马阑（qzf_chama_east）】。',
        targetLocation: {
          regionId: 'qinzhou',
          buildingId: 'qzf_chama',
          spotId: 'qzf_chama_east',
          customLabel: '秦州府 · 秦州官营茶马榷场 · 吐蕃青唐验马阑',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q07_start',
        regionId: 'qinzhou',
        buildingId: 'qzf_chama',
        spotId: 'qzf_chama_east',
        onceFlag: 'zn_q07_start_triggered',
        condition: ZHONGNAN_Q07_START_CONDITION,
        effects: [openScene('scene_zn_q07_01', ZHONGNAN_Q07_QUEST_ID)],
      },
      {
        id: 'trig_zn_q07_longyou',
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_main',
        onceFlag: 'zn_q07_longyou_triggered',
        condition: atStep(ZHONGNAN_Q07_QUEST_ID, 'longyou_ambush_xixia'),
        effects: [openScene('scene_zn_q07_07', ZHONGNAN_Q07_QUEST_ID)],
      },
      {
        id: 'trig_zn_q07_aftermath',
        regionId: 'qinzhou',
        buildingId: 'qzf_chama',
        spotId: 'qzf_chama_east',
        onceFlag: 'zn_q07_aftermath_triggered',
        condition: atStep(ZHONGNAN_Q07_QUEST_ID, 'chama_receive_steed'),
        effects: [openScene('scene_zn_q07_16', ZHONGNAN_Q07_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q07_start',
        label: '【秦州护马】赴吐蕃青唐验马阑 · 会合马钰玄与瞎毡',
        badge: '秦州烽火',
        subtitle: '第一幕 · 秦州官营茶马榷场',
        tone: 'gold',
        regionId: 'qinzhou',
        buildingId: 'qzf_chama',
        spotId: 'qzf_chama_east',
        visibleWhen: ZHONGNAN_Q07_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q07_start_triggered', value: true },
          openScene('scene_zn_q07_01', ZHONGNAN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q07_longyou',
        label: '【陇右设伏】登金环聚义堂 · 联手刘沪、雷万里破夏骑',
        badge: '铁骑护马',
        subtitle: '第七幕 · 陇右古战场烽燧',
        tone: 'danger',
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_main',
        visibleWhen: atStep(ZHONGNAN_Q07_QUEST_ID, 'longyou_ambush_xixia'),
        effects: [
          { type: 'setFlag', flag: 'zn_q07_longyou_triggered', value: true },
          openScene('scene_zn_q07_07', ZHONGNAN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q07_aftermath',
        label: '【茶马归功】择定古观道风 · 领受河曲良驹',
        badge: '道风抉择',
        subtitle: '第十六幕 · 吐蕃青唐验马阑',
        tone: 'gold',
        regionId: 'qinzhou',
        buildingId: 'qzf_chama',
        spotId: 'qzf_chama_east',
        visibleWhen: atStep(ZHONGNAN_Q07_QUEST_ID, 'chama_receive_steed'),
        effects: [
          { type: 'setFlag', flag: 'zn_q07_aftermath_triggered', value: true },
          openScene('scene_zn_q07_16', ZHONGNAN_Q07_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q07_start',
        label: '禀报长安急情 · 共商秦州茶马护马大计',
        badge: '秦州烽火',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1054', 'NPC-0216', 'NPC-0090'] },
            ZHONGNAN_Q07_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q07_start_triggered', value: true },
          openScene('scene_zn_q07_01', ZHONGNAN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q07_longyou',
        label: '会合刘沪将军与雷万里大侠 · 设伏拦截西夏劫马铁骑',
        badge: '陇右破敌',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0045', 'NPC-0313'] },
            atStep(ZHONGNAN_Q07_QUEST_ID, 'longyou_ambush_xixia'),
          ],
        },
        effects: [openScene('scene_zn_q07_07', ZHONGNAN_Q07_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanGuanQinzhouHorseQuest.scenes').then((m) => m.SCENES),
  },
]
