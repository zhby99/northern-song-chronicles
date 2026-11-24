import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q12_QUEST_ID = 'QST-SECT-01-12'

export const SHAOLIN_Q12_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-11', 'completed'),
    qStatus(SHAOLIN_Q12_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 300 },
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
      '嵩山少林寺达摩院脉 Lv.2 晋升 Lv.3 真传弟子终局大考（全十二幕）。须完成《迦叶微笑 · 灵山拈花》、入寺满 300 日、经义 ≥ 70、书 ≥ 50 且玄慈方丈好感 ≥ 50。入幽谷石室侍奉瘫痪寒玉榻的少林神僧玄澄，亲历寒玉床「七十二绝技心魔」两重禅心破障；三更姑苏慕容暗探偷袭古洞，可凭明心听风先机截杀暗哨或正面护洞，终与一流下品暗探首「燕影客」生死一战，立下达摩真传誓言，晋升少林派【Lv.3 真传弟子】！',
    startHint:
      '完成《迦叶微笑 · 灵山拈花》、入寺满 300 日、经义 ≥ 70、书 ≥ 50 且玄慈好感 ≥ 50 后，前往【嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻】（或寻玄澄、玄难、玄慈）开启晋升真传终章。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_main',
      customLabel: '嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻',
    },
    startCondition: SHAOLIN_Q12_START_CONDITION,
    summary:
      '{reignYear}你在嵩山达摩院潜修日久，蒙【玄慈】方丈与【玄难】首座信任，获准步入达摩院最深处的【幽谷石室 · 寒玉榻】，近身侍奉少林两百年来第一武学奇才、却因强练十三门绝技未以慈悲佛法化戾而致筋脉俱废的神僧【玄澄】。你在寒玉榻畔亲历「七十二障」两重心魔幻境的禅心拷问，复于三更风雪中截击潜入石室盗取《十三绝技武学障手札》的姑苏慕容暗探，先破外围暗哨，再于狭洞中死战击溃一流下品暗探首【燕影客】。黎明时分，玄澄与玄难联袂举荐，玄慈方丈当场晋升你为嵩山少林寺【真传弟子】！',
    initialStepId: 'guard_cold_jade_cave',
    steps: {
      guard_cold_jade_cave: {
        id: 'guard_cold_jade_cave',
        title: '守夜寒玉 · 血战慕容暗探',
        objective:
          '你已于寒玉榻畔历经「七十二障」心魔试炼并察觉洞外江南沉水冷香！请留守【达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】，截击潜入偷袭的姑苏慕容暗探，死战护卫玄澄师伯与绝技手札！',
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
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_scouts_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
            elseEffects: [openScene('scene_slq12_06', SHAOLIN_Q12_QUEST_ID)],
          },
        ],
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
            thenEffects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
            elseEffects: [openScene('scene_slq12_06', SHAOLIN_Q12_QUEST_ID)],
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
            thenEffects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
            elseEffects: [openScene('scene_slq12_06', SHAOLIN_Q12_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoXuanchengQuest.scenes').then((m) => m.SCENES),
  },
]
