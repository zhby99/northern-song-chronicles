import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q32_QUEST_ID = 'QST-SECT-01-32'

export const SHAOLIN_Q32_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-29', 'completed'),
    {
      type: 'any',
      conditions: [qStatus('QST-SECT-01-30', 'completed'), qStatus('QST-SECT-01-31', 'completed')],
      hint: '完成《扫叶听风》或《暗布天罗》',
    },
    qStatus(SHAOLIN_Q32_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 630 },
    { type: 'skillAtLeast', key: '经义', min: 82 },
    { type: 'skillAtLeast', key: '书', min: 70 },
    { type: 'npcAlive', npcId: 'NPC-0158', npcName: '玄生' },
  ],
}

export const SHAOLIN_Q32_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q32_QUEST_ID,
    title: '药王瘟劫 · 九转回魂',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流上品 ～ 宗师下品',
    maxOpponentRealm: '一流上品（西夏一品堂毁炉死士三煞）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传合流危机大考（全十一幕）。须入寺满 630 日、完成《剑痕浴血 · 少林九阳》及《扫叶听风》/《暗布天罗》任一线，且经义 ≥ 82、书法 ≥ 70。西夏一品堂与姑苏暗流勾结于嵩山山泉投下「悲酥瘟瘴」，数百僧众危在旦夕！你可凭轻功无伤凌空或冒寒强攀于冰崖采得千年血灵芝，复于药王丹炉定君臣佐使火候；面对夜袭丹房的西夏毁炉三煞，更可巧借炉气迷雾先放倒二煞 1v1 斩首领，或以身护炉车轮死战三煞！劫后获药王院主玄生亲赠天阶圣药《少林九转大还丹》！',
    startHint:
      '入寺满 630 日、完成《少林九阳》及《扫叶听风》或《暗布天罗》，且经义 ≥ 82、书 ≥ 70 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱】（或寻玄生）应对嵩山投毒瘟劫。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    },
    startCondition: SHAOLIN_Q32_START_CONDITION,
    summary:
      '{reignYear}寒冬，少室山突发骇人瘟劫！西夏一品堂暗桩与江南秘使联手在嵩山上游泉眼投下「悲酥瘟瘴」，少林三百余僧众相继发热咳血。药王院主【玄生】急需生于冰壁的「千年血灵芝」为君药开炉炼制解毒大丹。你挺身赴【达摩院 · 飞瀑深潭 · 试炼涧】采得血灵芝归寺，助玄生定下君臣佐使火候开炉熬药！岂料药成将至之际，西夏一品堂毁炉死士三煞夜闯【东厢碑廊 · 藏经橱】丹房。你或巧借炉气迷雾先破二煞再孤斩首领，或寸步不让车轮血战三煞，终保药鼎鸣龙、全寺僧众转危为安，获赐天阶圣药「少林九转大还丹」！',
    initialStepId: 'fetch_blood_lingzhi',
    steps: {
      fetch_blood_lingzhi: {
        id: 'fetch_blood_lingzhi',
        title: '冰崖采芝 · 一苇渡涧',
        objective:
          '嵩山山泉遭投毒「悲酥瘟瘴」，数百僧众危在旦夕！请速赴【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，渡冰潭攀绝壁采摘「千年血灵芝」！',
        nextHint:
          '前往【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，点击「踏冰崖绝壁 · 采摘千年血灵芝」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_west',
          customLabel: '嵩山少林寺 · 达摩院 · 飞瀑深潭 · 试炼涧',
        },
      },
      guard_pill_furnace: {
        id: 'guard_pill_furnace',
        title: '独守丹房 · 破煞护炉',
        objective:
          '千年血灵芝已入炉化药，丹成尚需半柱香！西夏一品堂毁炉死士三煞已杀至【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，请火速守住丹房、击溃三煞护炉成药！',
        nextHint:
          '前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，点击「独守药王丹房 · 迎战西夏毁炉死士三煞」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_east',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq32_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_q32_start_triggered',
        condition: SHAOLIN_Q32_START_CONDITION,
        effects: [openScene('scene_slq32_01', SHAOLIN_Q32_QUEST_ID)],
      },
      {
        id: 'trig_slq32_herb_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_q32_herb_triggered',
        condition: atStep(SHAOLIN_Q32_QUEST_ID, 'fetch_blood_lingzhi'),
        effects: [openScene('scene_slq32_02', SHAOLIN_Q32_QUEST_ID)],
      },
      {
        id: 'trig_slq32_furnace_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_q32_furnace_triggered',
        condition: atStep(SHAOLIN_Q32_QUEST_ID, 'guard_pill_furnace'),
        effects: [openScene('scene_slq32_06_defense_choice', SHAOLIN_Q32_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq32_start_east',
        label: '【少林瘟劫】东厢急诊 · 查探嵩山山泉中毒大变',
        badge: '药王瘟劫',
        subtitle: '东厢碑廊 · 药王院临时丹房',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: SHAOLIN_Q32_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q32_start_triggered', value: true },
          openScene('scene_slq32_01', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq32_herb_west',
        label: '【少林瘟劫】踏冰崖绝壁 · 采摘千年血灵芝',
        badge: '冰崖采芝',
        subtitle: '飞瀑深潭 · 试炼涧',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: atStep(SHAOLIN_Q32_QUEST_ID, 'fetch_blood_lingzhi'),
        effects: [
          { type: 'setFlag', flag: 'sl_q32_herb_triggered', value: true },
          openScene('scene_slq32_02', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq32_furnace_east',
        label: '【少林瘟劫】独守药王丹房 · 迎战西夏毁炉死士三煞',
        badge: '护炉血战',
        subtitle: '东厢碑廊（迷雾拆阵 1v1 / 车轮死战三煞）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_Q32_QUEST_ID, 'guard_pill_furnace'),
        effects: [
          { type: 'setFlag', flag: 'sl_q32_furnace_triggered', value: true },
          openScene('scene_slq32_06_defense_choice', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq32_start_npc',
        label: '急询药王院主玄生 · 开启【药王瘟劫 · 九转回魂】',
        badge: '药王瘟劫',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0158'] },
            SHAOLIN_Q32_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q32_start_triggered', value: true },
          openScene('scene_slq32_01', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'act_slq32_furnace_npc',
        label: '守于玄生丹炉之前 · 迎战西夏毁炉死士三煞',
        badge: '护炉血战',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0158'] },
            atStep(SHAOLIN_Q32_QUEST_ID, 'guard_pill_furnace'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q32_furnace_triggered', value: true },
          openScene('scene_slq32_06_defense_choice', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinNineTurnPillQuest.scenes').then((m) => m.SCENES),
  },
]
