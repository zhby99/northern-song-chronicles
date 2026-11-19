import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q21_QUEST_ID = 'QST-SECT-01-21'

export const SHAOLIN_Q21_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    {
      type: 'any',
      conditions: [
        qStatus('QST-SECT-01-08', 'completed'),
        qStatus('QST-SECT-01-12', 'completed'),
        qStatus('QST-SECT-01-16', 'completed'),
        qStatus('QST-SECT-01-20', 'completed'),
      ],
      hint: '完成任一 Lv.2 晋升真传任务',
    },
    qStatus(SHAOLIN_Q21_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1800 },
    { type: 'skillAtLeast', key: '经义', min: 70 },
    { type: 'npcAlive', npcId: 'NPC-0135', npcName: '玄渡' },
  ],
}

export const SHAOLIN_Q21_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q21_QUEST_ID,
    title: '飞瀑深潭 · 一苇渡江',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流下品',
    maxOpponentRealm: '一流下品（西夏一品堂轻功谍探 · 云中燕）',
    recommendedNote:
      '嵩山少林寺真传弟子共通首章（全二十幕）。须晋升少林 Lv.3 真传弟子并完成任一脉晋升试炼，入寺满 1800 日且经义 ≥ 70。赴达摩院飞瀑深潭拜见「芦苇尊者」玄渡，借初祖达摩折苇渡江之禅机领悟少林至高轻功《一苇渡江》；旋即奉命急追窃走少林防务舆图的西夏一品堂轻功谍探「云中燕」，踏苇十里横渡洛水急流将其生擒！',
    startHint:
      '成为少林 Lv.3 真传弟子、入寺满 1800 日且经义 ≥ 70 后，前往【嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】（或寻玄渡）求学《一苇渡江》。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_west',
      customLabel: '嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧',
    },
    startCondition: SHAOLIN_Q21_START_CONDITION,
    summary:
      '{reignYear}你既已跻身少林【真传弟子】之列，乃循寺中旧例前往达摩院后山【飞瀑深潭 · 试炼涧】，拜见轻功独步少林的芦苇尊者【玄渡】。飞瀑轰鸣之下，玄渡以一枝枯芦点水横渡深潭，为你剖解「身轻心重则沉，身重心空则浮」的禅武真谛，亲授少林地阶上品轻功《一苇渡江》。未料三日之后，西夏一品堂轻功谍探【云中燕】夜潜少室窃走豫西防务手札，企图借洛水急流遁逃！你以初成之《一苇渡江》踏苇十里紧咬不放，于洛水险滩之上力擒云中燕，夺回密卷、名动少林。',
    initialStepId: 'luoshui_chase',
    steps: {
      luoshui_chase: {
        id: 'luoshui_chase',
        title: '踏苇追谍 · 截击云中燕',
        objective:
          '你已在飞瀑深潭得芦苇尊者玄渡亲授《一苇渡江》口诀。西夏一品堂轻功谍探【云中燕】窃取少林豫西防务手札往洛水急流遁逃，请即刻自【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】动身追击，于洛水急流生擒此贼！',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】点击「踏苇十里下少室 · 洛水急流追击云中燕」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_west',
          customLabel: '嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧',
        },
      },
      report_xuandu: {
        id: 'report_xuandu',
        title: '生擒复命 · 试炼涧印心',
        objective:
          '你已于洛水急流生擒西夏轻功谍探云中燕并夺回防务手札！请押解贼人返回【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】向芦苇尊者【玄渡】复命，圆满印证《一苇渡江》真传。',
        nextHint:
          '返回【嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】（或寻玄渡），点击「押解云中燕复命 · 印证《一苇渡江》圆满」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_west',
          customLabel: '嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq21_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_q21_start_triggered',
        condition: SHAOLIN_Q21_START_CONDITION,
        effects: [openScene('scene_slq21_01', SHAOLIN_Q21_QUEST_ID)],
      },
      {
        id: 'trig_slq21_chase_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_q21_chase_triggered',
        condition: atStep(SHAOLIN_Q21_QUEST_ID, 'luoshui_chase'),
        effects: [openScene('scene_slq21_09', SHAOLIN_Q21_QUEST_ID)],
      },
      {
        id: 'trig_slq21_report_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_q21_report_triggered',
        condition: atStep(SHAOLIN_Q21_QUEST_ID, 'report_xuandu'),
        effects: [openScene('scene_slq21_18', SHAOLIN_Q21_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq21_start_west',
        label: '【真传首课】拜见芦苇尊者玄渡 · 飞瀑深潭求学《一苇渡江》',
        badge: '一苇渡江',
        subtitle: '少林 Lv.3 真传弟子共通首章 · 飞瀑深潭 · 试炼涧',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: SHAOLIN_Q21_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q21_start_triggered', value: true },
          openScene('scene_slq21_01', SHAOLIN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq21_chase_west',
        label: '【真传追谍】踏苇十里下少室 · 洛水急流追击云中燕',
        badge: '踏苇追击',
        subtitle: '洛水险滩实战 · 生擒西夏一品堂谍探云中燕（一流下品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: atStep(SHAOLIN_Q21_QUEST_ID, 'luoshui_chase'),
        effects: [
          { type: 'setFlag', flag: 'sl_q21_chase_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_river_reached', op: 'truthy' },
            thenEffects: [openScene('scene_slq21_14', SHAOLIN_Q21_QUEST_ID)],
            elseEffects: [openScene('scene_slq21_09', SHAOLIN_Q21_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq21_report_west',
        label: '【真传复命】押解云中燕复命 · 印证《一苇渡江》圆满',
        badge: '飞瀑印心',
        subtitle: '向玄渡呈交防务手札 · 领受《一苇渡江》真传',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: atStep(SHAOLIN_Q21_QUEST_ID, 'report_xuandu'),
        effects: [
          { type: 'setFlag', flag: 'sl_q21_report_triggered', value: true },
          openScene('scene_slq21_18', SHAOLIN_Q21_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq21_start_npc',
        label: '合十请益 · 恳请玄渡师伯于飞瀑深潭指点《一苇渡江》',
        badge: '一苇渡江',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0135'] },
            SHAOLIN_Q21_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q21_start_triggered', value: true },
          openScene('scene_slq21_01', SHAOLIN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'act_slq21_chase_npc',
        label: '禀明玄渡师伯 · 动身踏苇追击西夏轻功谍探云中燕',
        badge: '踏苇追击',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0135'] },
            atStep(SHAOLIN_Q21_QUEST_ID, 'luoshui_chase'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q21_chase_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_river_reached', op: 'truthy' },
            thenEffects: [openScene('scene_slq21_14', SHAOLIN_Q21_QUEST_ID)],
            elseEffects: [openScene('scene_slq21_09', SHAOLIN_Q21_QUEST_ID)],
          },
        ],
      },
      {
        id: 'act_slq21_report_npc',
        label: '向玄渡师伯押解云中燕复命 · 呈交夺回之防务手札',
        badge: '飞瀑印心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0135'] },
            atStep(SHAOLIN_Q21_QUEST_ID, 'report_xuandu'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q21_report_triggered', value: true },
          openScene('scene_slq21_18', SHAOLIN_Q21_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinYiweiLightnessQuest.scenes').then((m) => m.SCENES),
  },
]
