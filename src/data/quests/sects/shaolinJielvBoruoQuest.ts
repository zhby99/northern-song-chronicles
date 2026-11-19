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
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 2555 },
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
      '嵩山少林寺戒律药王脉 / 俗家护法脉真传单脉首章（全二十二幕）。须为戒律药王脉或俗家护法脉 Lv.3 真传弟子、完成《飞瀑深潭 · 一苇渡江》、入寺满 2555 日且经义 ≥ 74、书 ≥ 55。于大雄宝殿东厢碑廊唐代《心经》古碑前，得「一拍神僧」玄寂传授少林绝技《般若掌》；子夜时分辽探重金买通的盗拓飞贼首「鬼手陈」率众潜入碑廊欲盗拓古碑暗纹，你挺身守护古碑，一式「一空到底」将其震印院墙、护全唐碑！',
    startHint:
      '戒律药王脉或俗家护法脉真传弟子完成《飞瀑深潭 · 一苇渡江》、入寺满 2555 日且经义 ≥ 74、书 ≥ 55 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】（或寻玄寂）参悟唐代《心经》古碑。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    },
    startCondition: SHAOLIN_Q26_START_CONDITION,
    summary:
      '{reignYear}入寺七载，戒律院首座、一拍神僧【玄寂】召你独赴大雄宝殿【东厢碑廊 · 藏经橱】，立于一通唐代高僧手书《般若波罗蜜多心经》古碑之前。玄寂借唐碑铁画银钩之法度为你点破佛门掌道至理，传授少林七十二绝技之《般若掌》，更提醒你此碑背面暗刻前朝少林护寺秘记，近来已有辽国细作垂涎。果不其然，当夜子时，辽探重金收买的江湖盗拓飞贼首【鬼手陈】率手下潜入东厢碑廊，企图强拓古碑并毁碑灭迹！你于夜色碑廊中迎战鬼手陈，以新悟《般若掌》「一空到底」凌空一掌将其震印青砖院墙，擒贼护碑、大扬少林正气！',
    initialStepId: 'guard_tang_stele',
    steps: {
      guard_tang_stele: {
        id: 'guard_tang_stele',
        title: '子夜护碑 · 擒拿鬼手陈',
        objective:
          '玄寂师伯已于唐代《心经》古碑前传你《般若掌》精义。子夜阴风骤起，辽探买通之盗拓飞贼首【鬼手陈】即将潜入【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】盗拓古碑，请留守碑廊击退飞贼、护全唐碑！',
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
        effects: [openScene('scene_slq26_10', SHAOLIN_Q26_QUEST_ID)],
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
        subtitle: '东厢碑廊夜战 · 迎战一流中品盗拓贼首鬼手陈',
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
            thenEffects: [openScene('scene_slq26_14', SHAOLIN_Q26_QUEST_ID)],
            elseEffects: [openScene('scene_slq26_10', SHAOLIN_Q26_QUEST_ID)],
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
            thenEffects: [openScene('scene_slq26_14', SHAOLIN_Q26_QUEST_ID)],
            elseEffects: [openScene('scene_slq26_10', SHAOLIN_Q26_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvBoruoQuest.scenes').then((m) => m.SCENES),
  },
]
