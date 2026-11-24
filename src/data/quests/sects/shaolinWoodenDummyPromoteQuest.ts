import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q04_QUEST_ID = 'QST-SECT-01-04'

export const SHAOLIN_Q04_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-03', 'completed'),
    qStatus(SHAOLIN_Q04_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 90 },
    { type: 'skillAtLeast', key: '经义', min: 50 },
    { type: 'skillAtLeast', key: '书', min: 25 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0112', min: 20, npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0315', npcName: '慧通' },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const SHAOLIN_Q04_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q04_QUEST_ID,
    title: '木桩百劫 · 铜人初试',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流中品 ～ 三流上品',
    maxOpponentRealm: '三流上品（外门劲敌 · 慧通）',
    recommendedNote:
      '嵩山少林寺 Lv.1 外门晋升 Lv.2 内门核心分流大考（全十二幕）。须入寺满一季（90 日）、完成前三回外门历练，且经义 ≥ 50、书法 ≥ 25、玄慈方丈好感 ≥ 20。闯十八铜人木桩廊时可凭算术或悟性破中枢铜榫智取、抑或刚猛车轮破双傀，再于正殿较技外门劲敌慧通，终赴大雄正殿应玄慈方丈无提示《金刚经》禅辩，习得《罗汉伏虎功》晋升内门并于四脉间择定师承！',
    startHint:
      '入寺满一季（90 日）、完成前置外门历练且经义 ≥ 50、书 ≥ 25、玄慈好感 ≥ 20 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊】（或寻玄苦、玄难、玄寂、慧通）开启外门晋升大考。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_east',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
    },
    startCondition: SHAOLIN_Q04_START_CONDITION,
    summary:
      '{reignYear}嵩山霜钟九响，你在少林入寺已满一季，迎来外门晋升内门的【木桩百劫 · 铜人初试】大考。在玄苦、玄难、玄寂三位高僧监考下，你步入【十八铜人木桩廊】——或观机识眼震断八卦中枢铜榫智破双傀，或凭刚猛禅功车轮硬闯——继而于演武正殿力挫外门劲敌【慧通】。终赴【大雄正殿 · 佛前蒲团】，于【玄慈】方丈前挥毫应答《金刚经》禅辩，蒙授内门正宗心法《罗汉伏虎功》并晋升【内门弟子】，在罗汉、达摩、戒律药王与俗家护法四脉之间择定此生禅武正途。',
    initialStepId: 'wooden_alley_trial',
    steps: {
      wooden_alley_trial: {
        id: 'wooden_alley_trial',
        title: '闯廊破傀 · 较技慧通',
        objective:
          '少林外门晋升大考已鸣钟启幕！请前往【十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】，先闯机关铜人木桩傀儡阵（可智破铜榫或正面硬闯），再于终场一对一击败外门劲敌【慧通】！',
        nextHint:
          '前往【十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】，点击「步入十八铜人木桩廊 · 应战外门大考」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_east',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
        },
      },
      daxiong_branch_hub: {
        id: 'daxiong_branch_hub',
        title: '佛前禅辩 · 四脉分流',
        objective:
          '你已破木桩阵并力挫外门劲敌慧通！请前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，应玄慈方丈《金刚经》禅辩考校、领受《罗汉伏虎功》晋升内门，并择定罗汉、达摩、戒律或俗家四脉师承（欲入三堂者须先向方丈剃度）。',
        nextHint:
          '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「登大雄正殿 · 应方丈禅辩考校并择定四脉」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_main',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq04_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q04_start_triggered',
        condition: SHAOLIN_Q04_START_CONDITION,
        effects: [openScene('scene_slq04_01', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'trig_slq04_alley_trial',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q04_alley_triggered',
        condition: atStep(SHAOLIN_Q04_QUEST_ID, 'wooden_alley_trial'),
        effects: [openScene('scene_slq04_03', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'trig_slq04_daxiong_hub',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q04_daxiong_triggered',
        condition: atStep(SHAOLIN_Q04_QUEST_ID, 'daxiong_branch_hub'),
        effects: [openScene('scene_slq04_12', SHAOLIN_Q04_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq04_start_east',
        label: '【少林大考】季满听钟 · 赴十八铜人木桩廊外门晋升大考',
        badge: '木桩大考',
        subtitle: '入寺满一季 · 十八铜人木桩廊',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: SHAOLIN_Q04_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q04_start_triggered', value: true },
          openScene('scene_slq04_01', SHAOLIN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq04_alley_trial',
        label: '【少林大考】步入十八铜人木桩廊 · 应战外门大考',
        badge: '闯廊试炼',
        subtitle: '破机关木桩傀儡 · 决战外门劲敌慧通',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: atStep(SHAOLIN_Q04_QUEST_ID, 'wooden_alley_trial'),
        effects: [
          { type: 'setFlag', flag: 'sl_q04_alley_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q04_alley_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq04_08', SHAOLIN_Q04_QUEST_ID)],
            elseEffects: [openScene('scene_slq04_03', SHAOLIN_Q04_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq04_daxiong_hub',
        label: '【少林分流】登大雄正殿 · 应方丈笔义考校并择定四脉',
        badge: '四脉分流',
        subtitle: '大雄正殿 · 佛前蒲团（授罗汉伏虎功晋内门）',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q04_QUEST_ID, 'daxiong_branch_hub'),
        effects: [
          { type: 'setFlag', flag: 'sl_q04_daxiong_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q04_exam_passed', op: 'truthy' },
            thenEffects: [openScene('scene_slq04_16', SHAOLIN_Q04_QUEST_ID)],
            elseEffects: [openScene('scene_slq04_12', SHAOLIN_Q04_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq04_start_npc',
        label: '合十禀请参加【木桩百劫 · 外门晋升大考】',
        badge: '木桩大考',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0112', 'NPC-0126', 'NPC-0127', 'NPC-0134', 'NPC-0315'],
            },
            SHAOLIN_Q04_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q04_start_triggered', value: true },
          openScene('scene_slq04_01', SHAOLIN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'act_slq04_trial_npc',
        label: '向监考高僧行礼 · 续战木桩廊与慧通较技',
        badge: '闯廊试炼',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126', 'NPC-0127', 'NPC-0134', 'NPC-0315'] },
            atStep(SHAOLIN_Q04_QUEST_ID, 'wooden_alley_trial'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q04_alley_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q04_alley_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq04_08', SHAOLIN_Q04_QUEST_ID)],
            elseEffects: [openScene('scene_slq04_03', SHAOLIN_Q04_QUEST_ID)],
          },
        ],
      },
      {
        id: 'act_slq04_daxiong_npc',
        label: '拜见玄慈方丈 · 应考经义并择定少林四脉',
        badge: '四脉分流',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0126', 'NPC-0127', 'NPC-0134'] },
            atStep(SHAOLIN_Q04_QUEST_ID, 'daxiong_branch_hub'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q04_daxiong_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q04_exam_passed', op: 'truthy' },
            thenEffects: [openScene('scene_slq04_16', SHAOLIN_Q04_QUEST_ID)],
            elseEffects: [openScene('scene_slq04_12', SHAOLIN_Q04_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinWoodenDummyPromoteQuest.scenes').then((m) => m.SCENES),
  },
]
