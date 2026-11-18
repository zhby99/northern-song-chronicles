import type { QuestCondition, QuestDefinition, QuestLocationTriggerDef } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const GAIBANG_ENTRY_QUEST_ID = 'QST-SECT-02-ENTRY'

export const GAIBANG_TRIGGER_CITY_IDS = [
  'bianliang', // 开封府
  'luoyang', // 洛阳府
  'daming', // 大名府
  'zhending', // 真定府
  'taiyuan', // 太原府
  'changan', // 京兆府
  'jinan', // 济南府
  'xiangyang', // 襄阳府
  'yangzhou', // 扬州府
] as const

const PENNILESS_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    flag('shaolin_novice_state', 'eq', 'none'),
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    { type: 'silverAtMost', max: 3 },
    qStatus(GAIBANG_ENTRY_QUEST_ID, 'not_started'),
  ],
}

const DIRECT_INQUIRY_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    flag('shaolin_novice_state', 'eq', 'none'),
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    qStatus(GAIBANG_ENTRY_QUEST_ID, 'not_started'),
  ],
}

function buildCityPennilessTriggers(): QuestLocationTriggerDef[] {
  const triggers: QuestLocationTriggerDef[] = []

  // 1) 无门无派且随身纹银 ≤ 3 两时，踏入中原九大州府长街自动触发第 1 幕
  for (const cityId of GAIBANG_TRIGGER_CITY_IDS) {
    triggers.push({
      id: `trig_gaibang_penniless_street_${cityId}`,
      regionId: cityId,
      onceFlag: 'gaibang_penniless_triggered',
      condition: PENNILESS_START_CONDITION,
      effects: [openScene('scene_gb_01_street_beggar', 'QST-SECT-02-ENTRY')],
    })
  }

  // 2) 持青竹刻纹暗牌踏入洛阳府【丐帮中原总舵（杏子林坛）】自动触发第 4 幕净污暗流
  triggers.push({
    id: 'trig_gaibang_enter_apricot_hq',
    regionId: 'luoyang',
    buildingId: 'ly_gaibang',
    onceFlag: 'gaibang_apricot_entered',
    condition: atStep(GAIBANG_ENTRY_QUEST_ID, 'go_luoyang_apricot'),
    effects: [openScene('scene_gb_04_apricot_gate', 'QST-SECT-02-ENTRY')],
  })

  return triggers
}

export const GAIBANG_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: GAIBANG_ENTRY_QUEST_ID,
    title: '青囊乞骨 · 杏林受袋',
    category: 'sect_entry',
    factionId: 'SECT-02',
    regionId: 'luoyang',
    recommendedRealm: '不入流 ～ 三流上品（零门槛侠义剧情）',
    maxOpponentRealm: '三流下品（演武试骨，胜负皆可推进）',
    recommendedNote:
      '无门无派且随身纹银 ≤ 3 两时，于开封、洛阳、大名、真定、太原、京兆、济南、襄阳、扬州任一中原州府自动触发；亦可直接前往洛阳【杏子林总舵】寻丐帮长老或帮主求入帮，全篇八幕紧凑精炼，无卡关战斗。',
    startHint:
      '无门无派且随身纹银 ≤ 3 两时步入任一中原核心州府长街即可触发；或直接前往洛阳【丐帮中原总舵（杏子林坛）】向接引长老求入丐帮。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_gaibang',
      customLabel: '中原九大州府长街（纹银 ≤ 3 两触发）或 洛阳杏子林总舵',
    },
    startCondition: DIRECT_INQUIRY_START_CONDITION,
    summary:
      '穷途困顿却不堕偷抢之行，于中原长街结识丐帮四袋弟子老拐子李，领悟“伸手讨百家饭、耳目遍九州”的乞儿骨气。持青竹暗牌赴洛阳杏子林总舵，见净污两派暗流、于演武沙场硬接三招试骨、在飞鸽信寮受老帮主汪剑通问心。最终登临聚义高坛，在执法长老白世镜按规执刀立誓、年轻帮主乔峰严守祖宗家法之下，堂堂正正领受粗麻一袋，踏出丐帮弟子万里第一步。',
    initialStepId: 'go_luoyang_apricot',
    steps: {
      go_luoyang_apricot: {
        id: 'go_luoyang_apricot',
        title: '竹牌引路 · 奔赴杏林',
        objective:
          '已领悟市井讨饭与传信耳目的门道，并获老拐子李赠予【青竹刻纹暗牌】。请前往【洛阳府 · 丐帮中原总舵（杏子林坛）】拜山求入。',
        nextHint: '前往【洛阳府】，点击进入特殊建筑【丐帮中原总舵（杏子林坛）】。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
        },
      },
      arena_trial: {
        id: 'arena_trial',
        title: '沙场试骨 · 宁折不弯',
        objective:
          '已踏入洛阳杏子林总舵并见识净污两派之争。请前往【莲花竹棒演武沙场】，向副帮主【马大元】与传功长老【宋奚长】呈牌接受骨气考校。',
        nextHint: '在杏子林总舵内点击【莲花竹棒演武沙场】，与【马大元】或【宋奚长】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_arena',
        },
      },
      pigeon_heart_test: {
        id: 'pigeon_heart_test',
        title: '飞鸽信寮 · 剑通问心',
        objective:
          '沙场试骨已过！请移步杏子林东侧【八方飞鸽篝火信寮】，拜谒正在阅看雁门关急信的老帮主【汪剑通】与长老【徐冲霄】。',
        nextHint: '在杏子林总舵内点击【八方飞鸽篝火信寮】，与【汪剑通】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_pigeon',
        },
      },
      altar_oath: {
        id: 'altar_oath',
        title: '聚义高坛 · 依规受袋',
        objective:
          '已获汪老帮主首肯！请登临杏子林正中【杏林百酒聚义高坛】，在执法长老【白世镜】与帮主【乔峰】见证下依帮规立誓受袋。',
        nextHint: '在杏子林总舵内点击【杏林百酒聚义高坛】，与帮主【乔峰】或【白世镜】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_altar',
        },
      },
    },

    locationTriggers: buildCityPennilessTriggers(),

    npcActions: [
      // 主动入口：无门无派时找丐帮核心接引人（马大元 / 宋奚长 / 乔峰）求入丐帮
      {
        id: 'act_gb_penniless_manual_start',
        label: '求入丐帮 · 叩问杏林门路',
        badge: '丐帮入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0297', 'NPC-0136', 'NPC-0159', 'NPC-0110'] },
            DIRECT_INQUIRY_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'gaibang_penniless_triggered', value: true },
          openScene('scene_gb_01_street_beggar', 'QST-SECT-02-ENTRY'),
        ],
      },

      // 演武沙场：找马大元（NPC-0136）或宋奚长（NPC-0159）试骨
      {
        id: 'act_gb_arena_present_letter',
        label: '呈上青竹暗牌 · 演武沙场试骨',
        badge: '杏林试骨',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0136', 'NPC-0159'] },
            {
              type: 'any',
              conditions: [
                atStep(GAIBANG_ENTRY_QUEST_ID, 'go_luoyang_apricot'),
                atStep(GAIBANG_ENTRY_QUEST_ID, 'arena_trial'),
              ],
            },
          ],
        },
        effects: [openScene('scene_gb_05_arena_trial', 'QST-SECT-02-ENTRY')],
      },

      // 八方飞鸽篝火信寮：找汪剑通（NPC-0111）或徐冲霄（NPC-0195）问心
      {
        id: 'act_gb_pigeon_heart_test',
        label: '拜谒汪老帮主 · 飞鸽信寮问心',
        badge: '信寮问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0111', 'NPC-0195'] },
            atStep(GAIBANG_ENTRY_QUEST_ID, 'pigeon_heart_test'),
          ],
        },
        effects: [openScene('scene_gb_06_pigeon_heart', 'QST-SECT-02-ENTRY')],
      },

      // 杏林百酒聚义高坛：找帮主乔峰（NPC-0110）或执法长老白世镜（NPC-0196）依规受袋入帮
      {
        id: 'act_gb_altar_qiaofeng_oath',
        label: '登坛依规立誓 · 拜领一袋布囊',
        badge: '依规受袋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0110', 'NPC-0196'] },
            atStep(GAIBANG_ENTRY_QUEST_ID, 'altar_oath'),
          ],
        },
        effects: [openScene('scene_gb_07_altar_oath', 'QST-SECT-02-ENTRY')],
      },
    ],
    loadScenes: () => import('./gaibangEntryQuest.scenes').then((m) => m.SCENES),
  },
]
