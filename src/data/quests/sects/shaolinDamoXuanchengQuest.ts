import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q12_QUEST_ID = 'QST-SECT-01-12'

export const SHAOLIN_Q12_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-11', 'completed'),
    qStatus(SHAOLIN_Q12_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1800 },
    { type: 'skillAtLeast', key: '经义', min: 70 },
    { type: 'skillAtLeast', key: '书', min: 50 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0112', min: 50, npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0109', npcName: '玄澄' },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
  ],
}

export const SHAOLIN_Q12_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q12_QUEST_ID,
    title: '寒玉问禅 · 七十二障',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（姑苏慕容暗探首 · 燕影客）',
    recommendedNote:
      '嵩山少林寺达摩院脉 Lv.2 晋升 Lv.3 真传弟子终局大考（全二十二幕）。须完成《迦叶微笑 · 灵山拈花》、入寺满 1800 日、经义 ≥ 70、书 ≥ 50 且玄慈方丈好感 ≥ 50。奉命入幽谷石室侍奉瘫痪寒玉榻的少林神僧玄澄，亲闻强练十三门绝技未以慈悲佛法化解戾气致「武学障」的秘辛；当夜姑苏慕容暗探潜入石室盗取手札，你于狭洞血战连破暗探并死战击溃一流下品暗探首「燕影客」，终获玄澄与玄难联袂举荐，晋升少林派【Lv.3 真传弟子】！',
    startHint:
      '完成《迦叶微笑 · 灵山拈花》、入寺满 1800 日、经义 ≥ 70、书 ≥ 50 且玄慈好感 ≥ 50 后，前往【嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻】（或寻玄澄、玄难、玄慈）开启晋升真传终章。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_main',
      customLabel: '嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻',
    },
    startCondition: SHAOLIN_Q12_START_CONDITION,
    summary:
      '{reignYear}你在嵩山潜修已满五载，蒙【玄慈】方丈与【玄难】首座信任，获准步入达摩院最深处的【幽谷石室 · 寒玉榻】，近身侍奉少林两百年来第一武学奇才、却因一夜经脉尽废而卧榻不起的神僧【玄澄】。寒玉微光之下，玄澄亲口向你剖白少林「武学障」秘辛：昔年贪求强练十三门绝技，却未以大慈大悲佛法化解招中戾气，终致真气反噬成障。三更时分，姑苏慕容氏暗探潜入幽谷欲盗玄澄所留绝技心得手札，你寸步不退守卫寒玉榻前，先破双探前锋，再于狭窄石室中死战击溃一流下品暗探首【燕影客】。黎明时分，玄澄与玄难联袂举荐，玄慈方丈当场晋升你为嵩山少林寺【真传弟子】！',
    initialStepId: 'guard_cold_jade_cave',
    steps: {
      guard_cold_jade_cave: {
        id: 'guard_cold_jade_cave',
        title: '守夜寒玉 · 血战慕容暗探',
        objective:
          '你已于寒玉榻畔聆听神僧玄澄剖析「七十二绝技武学障」秘辛。三更寒雾骤起，请留守【达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】，警觉石室异动，死战护卫玄澄师伯与绝技手札！',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】点击「三更守夜寒玉榻 · 截杀潜入石室的慕容暗探」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_main',
          customLabel: '嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq12_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_q12_start_triggered',
        condition: SHAOLIN_Q12_START_CONDITION,
        effects: [openScene('scene_slq12_01', SHAOLIN_Q12_QUEST_ID)],
      },
      {
        id: 'trig_slq12_night_ambush',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_q12_ambush_triggered',
        condition: atStep(SHAOLIN_Q12_QUEST_ID, 'guard_cold_jade_cave'),
        effects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq12_start_main',
        label: '【达摩真传】入幽谷石室侍奉神僧玄澄 · 问禅七十二障',
        badge: '寒玉问禅',
        subtitle: '达摩院脉晋升真传终章 · 幽谷石室 · 寒玉榻',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: SHAOLIN_Q12_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q12_start_triggered', value: true },
          openScene('scene_slq12_01', SHAOLIN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq12_guard_cave',
        label: '【达摩真传】三更守夜寒玉榻 · 截杀潜入石室的慕容暗探',
        badge: '狭洞死战',
        subtitle: '幽谷石室实战 · 护卫神僧玄澄力战一流下品燕影客',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: atStep(SHAOLIN_Q12_QUEST_ID, 'guard_cold_jade_cave'),
        effects: [
          { type: 'setFlag', flag: 'sl_q12_ambush_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_scouts_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq12_15', SHAOLIN_Q12_QUEST_ID)],
            elseEffects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq12_start_npc',
        label: '合十请安 · 入幽谷石室侍奉神僧玄澄并聆听武学障秘辛',
        badge: '寒玉问禅',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0109', 'NPC-0127', 'NPC-0112'] },
            SHAOLIN_Q12_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q12_start_triggered', value: true },
          openScene('scene_slq12_01', SHAOLIN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'act_slq12_guard_npc',
        label: '留守寒玉榻畔 · 迎击潜入石室的姑苏慕容暗探',
        badge: '狭洞死战',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0109', 'NPC-0127'] },
            atStep(SHAOLIN_Q12_QUEST_ID, 'guard_cold_jade_cave'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q12_ambush_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_scouts_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq12_15', SHAOLIN_Q12_QUEST_ID)],
            elseEffects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoXuanchengQuest.scenes').then((m) => m.SCENES),
  },
]
