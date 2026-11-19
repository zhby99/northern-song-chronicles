import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q11_QUEST_ID = 'QST-SECT-01-11'

export const SHAOLIN_Q11_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-10', 'completed'),
    qStatus(SHAOLIN_Q11_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1095 },
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
      '嵩山少林寺达摩院脉 Lv.2 高阶绝学传承任务链（全二十幕）。须完成《洛水飞花 · 散花破幻》、入寺满 1095 日且经义 ≥ 62、书 ≥ 45、辩才 ≥ 45。吐蕃大轮寺三护法番僧登嵩山探听七十二绝技虚实、当殿捏碎青玉瓶示威；你先以无声禅机辩经压阵，再领受玄难所授地阶绝学《拈花指》，于钟鼓禅院演武坪以柔劲透穴连破两名番僧铁掌硬功，令大轮寺众僧折服长揖。',
    startHint:
      '完成《洛水飞花 · 散花破幻》、入寺满 1095 日且经义 ≥ 62、书 ≥ 45、辩才 ≥ 45 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】（或寻玄慈、玄难）开启任务。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    },
    startCondition: SHAOLIN_Q11_START_CONDITION,
    summary:
      '{reignYear}吐蕃大轮寺三名护法番僧——【萨迦铁僧】、【赤铜罗汉】与【金刚译师】借礼佛之名登临嵩山，意在探听少林七十二绝技虚实，更于【大雄正殿 · 佛前蒲团】当众以密宗硬功捏碎青玉净瓶示威。面对番僧连环禅辩机锋，你在【玄慈】方丈示意下默然拈起残瓶青莲，以「灵山世尊拈花、迦叶破颜微笑」之无声禅机震慑全场。随后【玄难】首座亲授少林地阶绝学《拈花指》，你移步【钟鼓禅院 · 演武坪】，以拈花柔劲隔空透穴，连破赤铜罗汉与萨迦铁僧两重密宗铁掌硬功。大轮寺三僧骇然叹服、躬身长揖赔礼告辞，你终获《拈花指》真传。',
    initialStepId: 'tubo_courtyard_spar',
    steps: {
      tubo_courtyard_spar: {
        id: 'tubo_courtyard_spar',
        title: '拈花透穴 · 演武破番僧',
        objective:
          '你已于大雄正殿以无声禅机压阵，并得玄难首座传授《拈花指》要旨！请移步【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，以拈花柔劲连破赤铜罗汉与萨迦铁僧的密宗硬功！',
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
        effects: [openScene('scene_slq11_10', SHAOLIN_Q11_QUEST_ID)],
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
        subtitle: '钟鼓禅院演武坪 · 连破赤铜罗汉与萨迦铁僧',
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
            thenEffects: [openScene('scene_slq11_15', SHAOLIN_Q11_QUEST_ID)],
            elseEffects: [openScene('scene_slq11_10', SHAOLIN_Q11_QUEST_ID)],
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
            thenEffects: [openScene('scene_slq11_15', SHAOLIN_Q11_QUEST_ID)],
            elseEffects: [openScene('scene_slq11_10', SHAOLIN_Q11_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoNianhuaFingerQuest.scenes').then((m) => m.SCENES),
  },
]
