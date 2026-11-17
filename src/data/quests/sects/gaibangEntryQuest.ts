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
    { type: 'silverAtMost', max: 3 },
    qStatus(GAIBANG_ENTRY_QUEST_ID, 'not_started'),
  ],
}

function buildCityPennilessTriggers(): QuestLocationTriggerDef[] {
  const triggers: QuestLocationTriggerDef[] = []

  // 1) 踏入中原 9 大州府全景长街（或从城内商铺/客栈花光银两后步出长街）自动触发第 1 幕
  for (const cityId of GAIBANG_TRIGGER_CITY_IDS) {
    triggers.push({
      id: `trig_gaibang_penniless_street_${cityId}`,
      regionId: cityId,
      onceFlag: 'gaibang_penniless_triggered',
      condition: PENNILESS_START_CONDITION,
      effects: [openScene('scene_gb_01_empty_purse', 'QST-SECT-02-ENTRY')],
    })

    // 2) 若玩家第 6 幕选择了“稍作整备再出发”，踏入中原州府基础酒楼或客栈即可会合周小碗继续第 7 幕
    for (const suffix of ['base_tavern', 'base_inn'] as const) {
      triggers.push({
        id: `trig_gaibang_resume_raid_${cityId}_${suffix}`,
        regionId: cityId,
        buildingId: `${cityId}_${suffix}`,
        condition: atStep(GAIBANG_ENTRY_QUEST_ID, 'raid_granary'),
        effects: [openScene('scene_gb_07_reed_watergate', 'QST-SECT-02-ENTRY')],
      })
    }
  }

  // 3) 持吴岳彻火漆荐书踏入洛阳府【丐帮中原总舵（杏子林坛）】自动触发第 12 幕迎宾剧情
  triggers.push({
    id: 'trig_gaibang_enter_apricot_hq',
    regionId: 'luoyang',
    buildingId: 'ly_gaibang',
    onceFlag: 'gaibang_apricot_entered',
    condition: atStep(GAIBANG_ENTRY_QUEST_ID, 'go_luoyang_apricot'),
    effects: [openScene('scene_gb_12_apricot_forest_gate', 'QST-SECT-02-ENTRY')],
  })

  return triggers
}

export const GAIBANG_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: GAIBANG_ENTRY_QUEST_ID,
    title: '青囊尽空 · 义聚杏林',
    category: 'sect_entry',
    factionId: 'SECT-02',
    regionId: 'luoyang',
    recommendedRealm: '不入流 ～ 三流上品（零门槛侠义剧情）',
    maxOpponentRealm: '三流下品（切磋点到为止，胜败皆可推进）',
    recommendedNote:
      '当少侠无门无派且随身纹银 ≤ 3 两时，于开封、洛阳、大名、真定、太原、京兆、济南、襄阳、扬州任一中原州府自动触发，全篇二十二幕侠义长卷，无卡关战斗。',
    startHint:
      '无门无派且随身纹银 ≤ 3 两时，步入任一中原核心州府（如开封府、洛阳府等）长街即可触发城隍破庙偶遇丐帮弟兄剧情。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_gaibang',
      customLabel: '中原九大州府长街（纹银 ≤ 3 两时自动触发）',
    },
    startCondition: PENNILESS_START_CONDITION,
    summary:
      '囊中羞涩不足三两碎银之时，于暮色长街挺身护住受恶少欺凌的盲眼老叟，结识丐帮老拐子李、周小碗与六袋巡边香主吴岳彻。寒夜分食半块焦麦饼后，夜探黑风脚行旧义仓解救逃荒妇孺，面对五百两白银分毫不取尽散灾黎。随后持火漆保举信奔赴洛阳杏子林总舵，经马大元演武试骨、汪剑通飞鸽问心，终登聚义高坛与青年帮主乔峰共饮烈酒、系袋授杖，堂堂正正拜入天下第一大帮！',
    initialStepId: 'raid_granary',
    steps: {
      raid_granary: {
        id: 'raid_granary',
        title: '夜探义仓 · 解救灾黎',
        objective:
          '已与丐帮六袋巡边香主【吴岳彻】定下调虎离山之计。请随二袋小乞儿【周小碗】自西侧芦苇水门潜入城外旧义仓，救出受困逃荒妇孺并夺回《赈济转运实录》铁证。',
        nextHint:
          '步入任一中原州府的【酒楼】或【客栈】（或前往开封樊楼酒窖寻【吴岳彻】），即可随周小碗动身夜探旧义仓。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_inn',
          customLabel: '任一中原州府客栈/酒肆（会合周小碗夜探旧义仓）',
        },
      },
      go_luoyang_apricot: {
        id: 'go_luoyang_apricot',
        title: '火漆保举 · 奔赴杏林',
        objective:
          '旧义仓恶霸已伏法，五百两脏银尽散流民。请持吴岳彻亲书火漆保举荐信，前往【洛阳府 · 丐帮中原总舵（杏子林坛）】拜山入帮。',
        nextHint: '前往【洛阳府】，点击进入特殊建筑【丐帮中原总舵（杏子林坛）】。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
        },
      },
      arena_trial: {
        id: 'arena_trial',
        title: '沙场拆招 · 宁折不弯',
        objective:
          '已踏入洛阳杏子林总舵。请前往【莲花竹棒演武沙场】，向副帮主【马大元】与传功长老【宋奚长】呈验荐信并接受三招胆魄考校。',
        nextHint: '在杏子林总舵内点击【莲花竹棒演武沙场】，与【马大元】或【宋奚长】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_arena',
        },
      },
      pigeon_heart_test: {
        id: 'pigeon_heart_test',
        title: '飞鸽高寮 · 老骥问心',
        objective:
          '演武考校已过！请移步杏子林东侧【八方飞鸽篝火信寮】，拜谒丐帮太上老帮主【汪剑通】与荣休长老【徐冲霄】。',
        nextHint: '在杏子林总舵内点击【八方飞鸽篝火信寮】，与【汪剑通】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_pigeon',
        },
      },
      altar_oath: {
        id: 'altar_oath',
        title: '聚义高坛 · 乔峰授袋',
        objective:
          '已获汪老帮主首肯！请登临杏子林正中【杏林百酒聚义高坛】，拜见丐帮帮主【乔峰】共饮忠义烈酒，行授袋入门大礼！',
        nextHint: '在杏子林总舵内点击【杏林百酒聚义高坛】，与帮主【乔峰】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_altar',
        },
      },
    },

    locationTriggers: buildCityPennilessTriggers(),

    npcActions: [
      // 兜底手动入口：若玩家纹银 <= 3 两时直接找到吴岳彻/马大元/乔峰，亦可直接开启第一幕长街奇遇
      {
        id: 'act_gb_penniless_manual_start',
        label: '囊空如洗 · 偶遇破庙风波（开启丐帮入门长卷）',
        badge: '丐帮机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0297', 'NPC-0136', 'NPC-0110'] },
            PENNILESS_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'gaibang_penniless_triggered', value: true },
          openScene('scene_gb_01_empty_purse', 'QST-SECT-02-ENTRY'),
        ],
      },

      // 第 6 幕若选稍后出发，找吴岳彻亦可继续夜探义仓
      {
        id: 'act_gb_resume_raid_wuyueche',
        label: '会合周小碗 · 夜探城外旧义仓',
        badge: '义仓救孤',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0297'] },
            atStep(GAIBANG_ENTRY_QUEST_ID, 'raid_granary'),
          ],
        },
        effects: [openScene('scene_gb_07_reed_watergate', 'QST-SECT-02-ENTRY')],
      },

      // 杏子林演武沙场：找马大元（NPC-0136）或宋奚长（NPC-0159）呈递荐信考校三招
      {
        id: 'act_gb_arena_present_letter',
        label: '呈递巡边火漆荐信 · 演武试胆魄',
        badge: '杏林初试',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0136', 'NPC-0159'] },
            atStep(GAIBANG_ENTRY_QUEST_ID),
            {
              type: 'any',
              conditions: [
                atStep(GAIBANG_ENTRY_QUEST_ID, 'go_luoyang_apricot'),
                atStep(GAIBANG_ENTRY_QUEST_ID, 'arena_trial'),
              ],
            },
          ],
        },
        effects: [openScene('scene_gb_13_arena_madayuan', 'QST-SECT-02-ENTRY')],
      },

      // 杏子林八方飞鸽篝火信寮：找汪剑通（NPC-0111）或徐冲霄（NPC-0195）问心
      {
        id: 'act_gb_pigeon_heart_test',
        label: '拜谒汪老帮主 · 飞鸽信寮问心',
        badge: '老骥问心',
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
        effects: [openScene('scene_gb_15_pigeon_tower', 'QST-SECT-02-ENTRY')],
      },

      // 杏子林百酒聚义高坛：找帮主乔峰（NPC-0110）或执法长老白世镜（NPC-0196）饮酒受袋入帮
      {
        id: 'act_gb_altar_qiaofeng_oath',
        label: '登坛拜见乔帮主 · 共饮烈酒受袋入帮',
        badge: '义聚杏林',
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
        effects: [openScene('scene_gb_17_altar_qiaofeng', 'QST-SECT-02-ENTRY')],
      },
    ],
    loadScenes: () => import('./gaibangEntryQuest.scenes').then((m) => m.SCENES),
  },
]
