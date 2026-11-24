import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q11_QUEST_ID = 'QST-SECT-01-11'

export const SHAOLIN_Q11_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-10', 'completed'),
    qStatus(SHAOLIN_Q11_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 210 },
    { type: 'skillAtLeast', key: '经义', min: 62 },
    { type: 'skillAtLeast', key: '书', min: 45 },
    { type: 'skillAtLeast', key: '辩才', min: 45 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
  ],
}

export const SHAOLIN_Q11_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q11_QUEST_ID,
    title: '迦叶微笑 · 灵山拈花',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（吐蕃大轮寺护法 · 萨迦铁僧）',
    recommendedNote:
      '嵩山少林寺达摩院脉 Lv.2 高阶绝学传承任务链（全十二幕）。须完成《洛水飞花 · 散花破幻》、入寺满 210 日且经义 ≥ 62、书 ≥ 45、辩才 ≥ 45。吐蕃大轮寺三护法登嵩山捏碎青玉净瓶示威，先以两道无提示禅宗公案机锋考较佛理——两问俱中即可当殿折服赤铜罗汉巴桑直挑首席护法；随后领受玄难所授地阶绝学《拈花指》，于演武坪以柔劲透穴破雪域铁掌，并决断礼遣番僧之道。',
    startHint:
      '完成《洛水飞花 · 散花破幻》、入寺满 210 日且经义 ≥ 62、书 ≥ 45、辩才 ≥ 45 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】（或寻玄慈、玄难）开启任务。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    },
    startCondition: SHAOLIN_Q11_START_CONDITION,
    summary:
      '{reignYear}吐蕃大轮寺三名护法番僧——【萨迦铁僧 · 贡布】、【赤铜罗汉 · 巴桑】与【金刚译师 · 桑杰】借礼佛之名登临嵩山，于【大雄正殿 · 佛前蒲团】徒手捏碎青玉净瓶示威，并抛出「风动幡动」与「佛祖西来意」两重禅宗公案步步紧逼。你在【玄慈】方丈点将下迎锋对辩、拈起碎玉青莲破颜微笑，随后得【玄难】首座亲授少林地阶绝学《拈花指》，移步【钟鼓禅院 · 演武坪】以柔劲透穴折服吐蕃铁掌护法，令大轮寺众僧合十长揖赔礼告辞，终获《拈花指》真传。',
    initialStepId: 'tubo_courtyard_spar',
    steps: {
      tubo_courtyard_spar: {
        id: 'tubo_courtyard_spar',
        title: '拈花透穴 · 演武破番僧',
        objective:
          '你已于大雄正殿应答吐蕃辩经，并得玄难首座传授地阶绝学《拈花指》！请移步【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，以禅辩或拈花柔劲破雪域大轮寺护法！',
        nextHint:
          '前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「登演武坪 · 以拈花指迎战吐蕃大轮寺护法」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq11_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q11_start_triggered',
        condition: SHAOLIN_Q11_START_CONDITION,
        effects: [openScene('scene_slq11_01', SHAOLIN_Q11_QUEST_ID)],
      },
      {
        id: 'trig_slq11_courtyard_spar',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q11_spar_triggered',
        condition: atStep(SHAOLIN_Q11_QUEST_ID, 'tubo_courtyard_spar'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q11_basang_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq11_08', SHAOLIN_Q11_QUEST_ID)],
            elseEffects: [openScene('scene_slq11_06', SHAOLIN_Q11_QUEST_ID)],
          },
        ],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq11_start_main',
        label: '【达摩院脉】大雄正殿迎吐蕃大轮寺番僧 · 灵山拈花辩禅',
        badge: '灵山拈花',
        subtitle: '达摩院脉第三回 · 大雄正殿 · 佛前蒲团',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: SHAOLIN_Q11_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q11_start_triggered', value: true },
          openScene('scene_slq11_01', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq11_courtyard_spar',
        label: '【达摩院脉】登演武坪 · 以拈花指迎战吐蕃大轮寺护法',
        badge: '拈花透穴',
        subtitle: '钟鼓禅院演武坪 · 破吐蕃密宗铁掌护法',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q11_QUEST_ID, 'tubo_courtyard_spar'),
        effects: [
          { type: 'setFlag', flag: 'sl_q11_spar_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q11_basang_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq11_08', SHAOLIN_Q11_QUEST_ID)],
            elseEffects: [openScene('scene_slq11_06', SHAOLIN_Q11_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq11_start_npc',
        label: '禀见方丈与首座 · 赴大雄正殿应对吐蕃大轮寺三护法',
        badge: '灵山拈花',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0127'] },
            SHAOLIN_Q11_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q11_start_triggered', value: true },
          openScene('scene_slq11_01', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'act_slq11_spar_npc',
        label: '随玄难首座赴演武坪 · 以《拈花指》领教吐蕃铁掌',
        badge: '拈花透穴',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0127'] },
            atStep(SHAOLIN_Q11_QUEST_ID, 'tubo_courtyard_spar'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q11_spar_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q11_basang_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq11_08', SHAOLIN_Q11_QUEST_ID)],
            elseEffects: [openScene('scene_slq11_06', SHAOLIN_Q11_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoNianhuaFingerQuest.scenes').then((m) => m.SCENES),
  },
]
