import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q29_QUEST_ID = 'QST-SECT-01-29'

export const SHAOLIN_Q29_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-28', 'completed'),
    qStatus(SHAOLIN_Q29_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 540 },
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
      '嵩山少林寺 Lv.3 真传合流核心传承任务（全十幕）。须入寺满 540 日、完成《琉璃夜影 · 曝书惊变》，且经义 ≥ 80、书法 ≥ 65。星宿老怪丁春秋遣大弟子摘星毒师率毒徒伪装西域胡商毒袭达摩院剑痕崖，首座玄难护雏中了「三笑逍遥散」剧毒！你可借山风破毒囊巧突重围或正面车轮血战，护玄难退入寒玉榻暗格参悟《少林九阳禅功密钞》真谛、当场习得《少林九阳功》（留步闭关精修），继而重返剑痕崖护雏斩魔、以纯阳佛掌击溃摘星毒师！',
    startHint:
      '入寺满 540 日、完成《琉璃夜影 · 曝书惊变》且经义 ≥ 80、书 ≥ 65 后，前往【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖】（或寻玄难）触发星宿毒袭之变。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_Q29_START_CONDITION,
    summary:
      '{reignYear}晚秋，星宿老怪丁春秋遣派大弟子【摘星毒师】率碧磷毒徒与腐骨毒女伪装西域胡商潜上少室山，于【绝壁石刻 · 剑痕崖】骤发阴毒奇袭！达摩院首座【玄难】为护扫崖小沙弥猝中「三笑逍遥散」，危在旦夕。你临危应变，或借山风逆袭破其毒囊、或车轮血战杀出血路，背负玄难退入【幽谷石室 · 寒玉榻】。生死一线间，玄难启寒玉榻暗格取出《少林九阳禅功密钞》亲口指点至阳行气真诀，为你贯通《少林九阳功》纯阳真气！待你调息闭关稳固修为，重返剑痕崖护出中毒幼僧、以纯阳佛掌力挫摘星毒师并震散满崖腐毒！',
    initialStepId: 'cliff_ambush_breakout',
    steps: {
      cliff_ambush_breakout: {
        id: 'cliff_ambush_breakout',
        title: '剑痕毒袭 · 护师突围',
        objective:
          '星宿派三大毒徒在剑痕崖骤发毒袭，玄难首座身中「三笑逍遥散」危急！请留在【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，择策破毒围或正面车轮血战，护玄难退入达摩洞！',
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
          '你已突围并放下断龙石暂阻星宿追兵，请刻不容缓背负中毒的玄难前往【达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】，借千年寒玉压制剧毒并参悟《少林九阳禅功密钞》！',
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
          '你已领受玄难纯阳行气真诀（出家弟子已当场习得并运使《少林九阳功》，可先闭关精修数重）。摘星毒师正于崖外焚毒封山，请整备就绪后重返【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，击溃摘星毒师！',
        nextHint:
          '闭关稳固《少林九阳功》后前往【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，点击「运纯阳佛掌 · 决战星宿摘星毒师」。',
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
        effects: [openScene('scene_slq29_05', SHAOLIN_Q29_QUEST_ID)],
      },
      {
        id: 'trig_slq29_showdown_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q29_showdown_triggered',
        condition: atStep(SHAOLIN_Q29_QUEST_ID, 'pure_yang_showdown'),
        effects: [openScene('scene_slq29_07_showdown', SHAOLIN_Q29_QUEST_ID)],
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
        subtitle: '绝壁石刻 · 剑痕崖（破囊巧突 / 车轮血战）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q29_QUEST_ID, 'cliff_ambush_breakout'),
        effects: [openScene('scene_slq29_02', SHAOLIN_Q29_QUEST_ID)],
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
          openScene('scene_slq29_05', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq29_showdown_east',
        label: '【少林传承】运纯阳佛掌 · 决战星宿摘星毒师',
        badge: '纯阳伏魔',
        subtitle: '绝壁石刻 · 剑痕崖（决战一流上品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q29_QUEST_ID, 'pure_yang_showdown'),
        effects: [
          { type: 'setFlag', flag: 'sl_q29_showdown_triggered', value: true },
          openScene('scene_slq29_07_showdown', SHAOLIN_Q29_QUEST_ID),
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
        label: '于寒玉榻前护法 · 领受玄难九阳秘传',
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
          openScene('scene_slq29_05', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinJiuyangCrisisQuest.scenes').then((m) => m.SCENES),
  },
]
