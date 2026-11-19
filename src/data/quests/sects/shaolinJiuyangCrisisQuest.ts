import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q29_QUEST_ID = 'QST-SECT-01-29'

export const SHAOLIN_Q29_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-28', 'completed'),
    qStatus(SHAOLIN_Q29_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 5110 },
    { type: 'skillAtLeast', key: '经义', min: 80 },
    { type: 'skillAtLeast', key: '书', min: 65 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
  ],
}

export const SHAOLIN_Q29_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q29_QUEST_ID,
    title: '剑痕浴血 · 少林九阳',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流上品',
    maxOpponentRealm: '一流上品（星宿派大弟子 · 摘星毒师）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传合流核心传承任务（全二十八幕）。须入寺满十四载（5110 日）、完成《琉璃夜影 · 曝书惊变》，且经义 ≥ 80、书法 ≥ 65。星宿老怪丁春秋遣三大毒徒伪装西域胡商毒袭达摩院剑痕崖，达摩院首座玄难猝不及防中了「三笑逍遥散」剧毒！你需先浴血杀出毒围，背负玄难退入达摩洞寒玉榻，获赐《少林九阳禅功密钞》并领受玄难临危口授《少林九阳功》，继而运纯阳佛掌重返剑痕崖击溃星宿派大弟子摘星毒师、震散满崖腐毒！',
    startHint:
      '入寺满 5110 日、完成《琉璃夜影 · 曝书惊变》且经义 ≥ 80、书 ≥ 65 后，前往【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖】（或寻玄难）触发星宿毒袭之变。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_Q29_START_CONDITION,
    summary:
      '{reignYear}晚秋，星宿老怪丁春秋遣派大弟子【摘星毒师】率两名星宿毒徒伪装西域敬香胡商潜上少室山，于【绝壁石刻 · 剑痕崖】骤发阴毒奇袭！达摩院首座【玄难】为护身旁幼僧，猝不及防吸入「三笑逍遥散」与腐尸毒烟，内息骤滞、危在旦夕。你临危挺身，先于剑痕崖血战杀退星宿毒徒，背负重伤的玄难杀入【幽谷石室 · 寒玉榻】。生死一线间，玄难自寒玉榻暗格取出镇院孤本《少林九阳禅功密钞》，亲口传授少林至阳内功《少林九阳功》为你贯通纯阳真气！你功成出洞，重返剑痕崖以纯阳佛掌力战摘星毒师、震散漫崖毒雾，救下玄难性命并扬少林正气！',
    initialStepId: 'cliff_ambush_breakout',
    steps: {
      cliff_ambush_breakout: {
        id: 'cliff_ambush_breakout',
        title: '剑痕毒袭 · 护师突围',
        objective:
          '星宿派三大毒徒伪装胡商在剑痕崖骤发毒袭，玄难首座身中「三笑逍遥散」剧毒危急！请留在【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，迎战星宿毒徒护住玄难并杀出血路！',
        nextHint:
          '在【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】点击「迎战星宿毒徒 · 护玄难杀出剑痕崖」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_east',
          customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
        },
      },
      damo_cave_inheritance: {
        id: 'damo_cave_inheritance',
        title: '背师入洞 · 密钞九阳',
        objective:
          '你已暂退星宿先锋，须刻不容缓背负中毒的玄难前往【达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】，借千年寒玉压制剧毒并聆听玄难口授《少林九阳功》！',
        nextHint:
          '前往【达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】，点击「安顿玄难于寒玉榻 · 领受少林九阳传承」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_main',
          customLabel: '嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻',
        },
      },
      pure_yang_showdown: {
        id: 'pure_yang_showdown',
        title: '纯阳出洞 · 决战摘星',
        objective:
          '你已得玄难口授《少林九阳功》并获赐《少林九阳禅功密钞》！星宿派大弟子摘星毒师正于崖外布毒封山，请重返【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，以纯阳佛掌击溃摘星毒师、震散毒雾！',
        nextHint:
          '前往【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，点击「运少林九阳纯阳佛掌 · 决战星宿摘星毒师」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_east',
          customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq29_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q29_start_triggered',
        condition: SHAOLIN_Q29_START_CONDITION,
        effects: [openScene('scene_slq29_01', SHAOLIN_Q29_QUEST_ID)],
      },
      {
        id: 'trig_slq29_cave_main',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_q29_cave_triggered',
        condition: atStep(SHAOLIN_Q29_QUEST_ID, 'damo_cave_inheritance'),
        effects: [openScene('scene_slq29_11', SHAOLIN_Q29_QUEST_ID)],
      },
      {
        id: 'trig_slq29_showdown_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q29_showdown_triggered',
        condition: atStep(SHAOLIN_Q29_QUEST_ID, 'pure_yang_showdown'),
        effects: [openScene('scene_slq29_20', SHAOLIN_Q29_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq29_start_east',
        label: '【少林传承】剑痕崖察异 · 西域胡商献香之变',
        badge: '剑痕浴血',
        subtitle: '绝壁石刻 · 剑痕崖 · 星宿毒影',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: SHAOLIN_Q29_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q29_start_triggered', value: true },
          openScene('scene_slq29_01', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq29_breakout_east',
        label: '【少林传承】迎战星宿毒徒 · 护玄难杀出剑痕崖',
        badge: '血战突围',
        subtitle: '绝壁石刻 · 剑痕崖（1v2 毒战）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q29_QUEST_ID, 'cliff_ambush_breakout'),
        effects: [openScene('scene_slq29_06', SHAOLIN_Q29_QUEST_ID)],
      },
      {
        id: 'spot_slq29_cave_main',
        label: '【少林传承】安顿玄难于寒玉榻 · 领受少林九阳传承',
        badge: '密钞九阳',
        subtitle: '幽谷石室 · 寒玉榻',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: atStep(SHAOLIN_Q29_QUEST_ID, 'damo_cave_inheritance'),
        effects: [
          { type: 'setFlag', flag: 'sl_q29_cave_triggered', value: true },
          openScene('scene_slq29_11', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq29_showdown_east',
        label: '【少林传承】运少林九阳纯阳佛掌 · 决战星宿摘星毒师',
        badge: '纯阳伏魔',
        subtitle: '绝壁石刻 · 剑痕崖（决战一流上品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q29_QUEST_ID, 'pure_yang_showdown'),
        effects: [
          { type: 'setFlag', flag: 'sl_q29_showdown_triggered', value: true },
          openScene('scene_slq29_20', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq29_start_npc',
        label: '随玄难巡视剑痕崖 · 开启【剑痕浴血 · 少林九阳】',
        badge: '剑痕浴血',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
            SHAOLIN_Q29_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q29_start_triggered', value: true },
          openScene('scene_slq29_01', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'act_slq29_cave_npc',
        label: '于寒玉榻前护法 · 领受玄难《少林九阳功》秘传',
        badge: '密钞九阳',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
            atStep(SHAOLIN_Q29_QUEST_ID, 'damo_cave_inheritance'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q29_cave_triggered', value: true },
          openScene('scene_slq29_11', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinJiuyangCrisisQuest.scenes').then((m) => m.SCENES),
  },
]
