import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q26_QUEST_ID = 'QST-SECT-01-26'

export const SHAOLIN_Q26_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-21', 'completed'),
    qStatus(SHAOLIN_Q26_QUEST_ID, 'not_started'),
    {
      type: 'any',
      conditions: [flag('sl_branch', 'eq', 'jielv'), flag('sl_branch', 'eq', 'layman')],
      hint: '戒律药王脉或俗家护法脉',
    },
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 360 },
    { type: 'skillAtLeast', key: '经义', min: 74 },
    { type: 'skillAtLeast', key: '书', min: 55 },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const SHAOLIN_Q26_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q26_QUEST_ID,
    title: '东厢古碑 · 掌吐梵音',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（辽探盗拓飞贼首 · 鬼手陈）',
    recommendedNote:
      '嵩山少林寺戒律药王脉 / 俗家护法脉真传单脉首章（全十幕高交互）。须为戒律药王脉或俗家护法脉 Lv.3 真传弟子、完成《飞瀑深潭 · 一苇渡江》、入寺满 360 日且经义 ≥ 74、书 ≥ 55。于东厢碑廊唐代《心经》古碑前得玄寂传授《般若掌》；子夜辨破辽探盗拓飞贼首「鬼手陈」的松脂假拓片与藻井声东击西之计，以「一空到底」生擒贼首并顺藤摸瓜问出辽国暗桩！',
    startHint:
      '戒律药王脉或俗家护法脉真传弟子完成《飞瀑深潭 · 一苇渡江》、入寺满 360 日且经义 ≥ 74、书 ≥ 55 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】（或寻玄寂）参悟唐代《心经》古碑。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    },
    startCondition: SHAOLIN_Q26_START_CONDITION,
    summary:
      '{reignYear}入寺逾载，戒律院首座、一拍神僧【玄寂】召你独赴大雄宝殿【东厢碑廊 · 藏经橱】，借唐代高僧手书《心经》古碑铁画银钩之法度传授少林七十二绝技之《般若掌》，并密告碑阴暗刻前朝河洛山川暗记，辽国细作已重金收买江湖盗拓飞贼首【鬼手陈】图谋盗拓毁碑。子夜碑廊之中，你细辨三处蹊跷勘破松脂假拓与藻井潜伏之诡计，择策擒拿鬼手陈、以「一空到底」将其震印院墙，护全唐碑并审出辽国豫西暗桩！',
    initialStepId: 'guard_tang_stele',
    steps: {
      guard_tang_stele: {
        id: 'guard_tang_stele',
        title: '子夜护碑 · 鉴伪擒贼',
        objective:
          '玄寂师伯已于唐代《心经》古碑前指点《般若掌》精义。子夜阴风骤起，辽探买通之盗拓飞贼首【鬼手陈】即将潜入【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，请留守碑廊鉴破诡计、生擒贼首护全唐碑！',
        nextHint:
          '在【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】点击「子夜守卫唐代《心经》古碑 · 截击盗拓飞贼首鬼手陈」。',
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
        id: 'trig_slq26_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_q26_start_triggered',
        condition: SHAOLIN_Q26_START_CONDITION,
        effects: [openScene('scene_slq26_01', SHAOLIN_Q26_QUEST_ID)],
      },
      {
        id: 'trig_slq26_night_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_q26_night_triggered',
        condition: atStep(SHAOLIN_Q26_QUEST_ID, 'guard_tang_stele'),
        effects: [openScene('scene_slq26_04', SHAOLIN_Q26_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq26_start_east',
        label: '【古碑传掌】赴东厢碑廊拜见玄寂 · 参唐碑习《般若掌》',
        badge: '掌吐梵音',
        subtitle: '戒律/俗家真传首章 · 东厢碑廊 · 藏经橱',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: SHAOLIN_Q26_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q26_start_triggered', value: true },
          openScene('scene_slq26_01', SHAOLIN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq26_night_east',
        label: '【子夜护碑】守卫唐代《心经》古碑 · 截击盗拓飞贼首鬼手陈',
        badge: '一空到底',
        subtitle: '东厢碑廊夜战 · 鉴伪擒拿盗拓贼首鬼手陈',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_Q26_QUEST_ID, 'guard_tang_stele'),
        effects: [
          { type: 'setFlag', flag: 'sl_q26_night_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_thief_spotted', op: 'truthy' },
            thenEffects: [openScene('scene_slq26_05', SHAOLIN_Q26_QUEST_ID)],
            elseEffects: [openScene('scene_slq26_04', SHAOLIN_Q26_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq26_start_npc',
        label: '合十请益 · 恳请玄寂师伯于唐代《心经》古碑前指点《般若掌》',
        badge: '掌吐梵音',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            SHAOLIN_Q26_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q26_start_triggered', value: true },
          openScene('scene_slq26_01', SHAOLIN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'act_slq26_night_npc',
        label: '禀明玄寂师伯 · 子夜留守东厢碑廊截杀盗拓飞贼鬼手陈',
        badge: '一空到底',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            atStep(SHAOLIN_Q26_QUEST_ID, 'guard_tang_stele'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q26_night_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_thief_spotted', op: 'truthy' },
            thenEffects: [openScene('scene_slq26_05', SHAOLIN_Q26_QUEST_ID)],
            elseEffects: [openScene('scene_slq26_04', SHAOLIN_Q26_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvBoruoQuest.scenes').then((m) => m.SCENES),
  },
]
