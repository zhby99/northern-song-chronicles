import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q02_QUEST_ID = 'QST-SECT-01-02'

export const SHAOLIN_Q02_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-01', 'completed'),
    qStatus(SHAOLIN_Q02_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 60 },
    { type: 'skillAtLeast', key: '经义', min: 25 },
    { type: 'npcAlive', npcId: 'NPC-0254', npcName: '慧轮' },
    { type: 'npcAlive', npcId: 'NPC-0782', npcName: '虚石' },
  ],
}

export const SHAOLIN_Q02_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q02_QUEST_ID,
    title: '少室庄田 · 拳棍止争',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流下品 ～ 三流中品',
    maxOpponentRealm: '三流中品（登封矿霸 · 刘横）',
    recommendedNote:
      '嵩山少林寺 Lv.1 外门弟子护庄历练任务链（全十五幕）。入寺满六十日且经义达标后，于十八铜人木桩廊受慧轮师叔征召，探望遭矿霸打伤的收租执事虚石，并赴少室南麓平息登封矿霸“铁山靠”刘横强占水渠之乱。临阵可择《伏虎拳》赤手擒王或《少林齐眉棍》封桥止争。',
    startHint:
      '拜入少林满六十日、完成罗汉开蒙且经义精进后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊】（或寻慧轮师叔）即可领命。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_east',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
    },
    startCondition: SHAOLIN_Q02_START_CONDITION,
    summary:
      '{reignYear}春耕时节，登封矿霸「铁山靠」刘横率矿徒强占少林常住庄田水渠，更打伤下山催租调解的执事【虚石】。「大金刚僧」【慧轮】于【十八铜人罗汉堂 · 十八铜人木桩廊】召你先往【大雄宝殿方丈院 · 东厢碑廊】探望虚石、取回地契水图，再同下少室南麓庄田止争。面对矿徒混杂于佃农之间的危局，你于赤手施展《伏虎拳》贴身擒王与执《少林齐眉棍》横扫窄桥之间择一破局，终生擒三流中品矿霸刘横、重开水闸护住千亩春田。',
    initialStepId: 'visit_xushi',
    steps: {
      visit_xushi: {
        id: 'visit_xushi',
        title: '碑廊探伤 · 查明水案',
        objective:
          '已奉慧轮师叔之命查明少室南麓庄田风波。请前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊】探望养伤的收租执事【虚石】，取回庄田地契抄本与水渠旧图。',
        nextHint:
          '前往【大雄宝殿方丈院 · 东厢碑廊（sl_daxiong_east）】，点击「探望养伤执事虚石 · 详询庄田水渠案情」或与虚石交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_east',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊',
        },
      },
      estate_showdown: {
        id: 'estate_showdown',
        title: '南麓止争 · 拳棍擒霸',
        objective:
          '已自虚石处取得庄田地契抄本并摸清登封矿霸刘横底细。请返回【十八铜人罗汉堂 · 十八铜人木桩廊】会合慧轮师叔，一同下山赴少室南麓水渠止争！',
        nextHint:
          '返回【十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】，点击「会合慧轮师叔下山 · 赴少室南麓庄田止争」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_east',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq02_start_luohan',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q02_start_triggered',
        condition: SHAOLIN_Q02_START_CONDITION,
        effects: [openScene('scene_slq02_01', SHAOLIN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_slq02_visit_xushi',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_q02_xushi_triggered',
        condition: atStep(SHAOLIN_Q02_QUEST_ID, 'visit_xushi'),
        effects: [openScene('scene_slq02_03', SHAOLIN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_slq02_depart_estate',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q02_depart_triggered',
        condition: atStep(SHAOLIN_Q02_QUEST_ID, 'estate_showdown'),
        effects: [openScene('scene_slq02_05', SHAOLIN_Q02_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq02_start_luohan',
        label: '【少林师门】木桩廊领命 · 听取少室庄田急报',
        badge: '拳棍止争',
        subtitle: '慧轮征召 · 十八铜人木桩廊',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: SHAOLIN_Q02_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q02_start_triggered', value: true },
          openScene('scene_slq02_01', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq02_visit_xushi',
        label: '【少林师门】探望养伤执事虚石 · 详询庄田水渠案情',
        badge: '碑廊探伤',
        subtitle: '第三幕 · 东厢碑廊',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_Q02_QUEST_ID, 'visit_xushi'),
        effects: [
          { type: 'setFlag', flag: 'sl_q02_xushi_triggered', value: true },
          openScene('scene_slq02_03', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq02_depart_estate',
        label: '【少林师门】会合慧轮师叔下山 · 赴少室南麓庄田止争',
        badge: '南麓止争',
        subtitle: '第五幕 · 迎战登封矿霸刘横',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: atStep(SHAOLIN_Q02_QUEST_ID, 'estate_showdown'),
        effects: [
          { type: 'setFlag', flag: 'sl_q02_depart_triggered', value: true },
          openScene('scene_slq02_05', SHAOLIN_Q02_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq02_start_huilun',
        label: '拜见慧轮师叔 · 领受少室南麓庄田护渠差事',
        badge: '拳棍止争',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0254'] },
            SHAOLIN_Q02_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q02_start_triggered', value: true },
          openScene('scene_slq02_01', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'act_slq02_visit_xushi_npc',
        label: '探望伤势 · 询问登封矿霸刘横强占水渠始末',
        badge: '碑廊探伤',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0782'] },
            atStep(SHAOLIN_Q02_QUEST_ID, 'visit_xushi'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q02_xushi_triggered', value: true },
          openScene('scene_slq02_03', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'act_slq02_depart_huilun',
        label: '呈上地契旧图 · 随慧轮师叔下山止争',
        badge: '南麓止争',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0254'] },
            atStep(SHAOLIN_Q02_QUEST_ID, 'estate_showdown'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q02_depart_triggered', value: true },
          openScene('scene_slq02_05', SHAOLIN_Q02_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinEstateDisputeQuest.scenes').then((m) => m.SCENES),
  },
]
