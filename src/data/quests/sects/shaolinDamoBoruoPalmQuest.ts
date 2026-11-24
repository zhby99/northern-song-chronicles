import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q25_QUEST_ID = 'QST-SECT-01-25'

export const SHAOLIN_Q25_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-24', 'completed'),
    qStatus(SHAOLIN_Q25_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 420 },
    { type: 'skillAtLeast', key: '经义', min: 76 },
    { type: 'skillAtLeast', key: '书', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0109', npcName: '玄澄' },
  ],
}

export const SHAOLIN_Q25_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q25_QUEST_ID,
    title: '空色无相 · 般若波罗',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（四大恶人 · 凶神恶煞岳老三）',
    recommendedNote:
      '嵩山少林寺达摩院真传单脉终章（全十幕高交互）。须完成《面壁九年 · 剑化禅机》、入寺满 420 日且经义 ≥ 76、书 ≥ 60。于幽谷石室寒玉榻畔得玄难与玄澄合授《般若掌》；适逢四大恶人「凶神恶煞」岳老三闯山强收你为徒，你可借江湖信用立赌约、以「空色无相」禅理破其老大执念，或正面硬撼鳄嘴剪，十八掌叠浪震裂其虎口逼退南海鳄神！',
    startHint:
      '完成《面壁九年 · 剑化禅机》、入寺满 420 日且经义 ≥ 76、书 ≥ 60 后，前往【嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】（或寻玄难、玄澄）求学《般若掌》。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_main',
      customLabel: '嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻',
    },
    startCondition: SHAOLIN_Q25_START_CONDITION,
    summary:
      '{reignYear}入寺逾载，你在达摩院修禅悟剑已臻化境。伏魔首座【玄难】与神僧【玄澄】于【幽谷石室 · 寒玉榻】畔为你合授少林七十二绝技之《般若掌》，点破「空色无相、十八叠浪」的无上禅意。恰逢西夏四大恶人之一的凶神恶煞【岳老三】扛着鳄嘴剪闯上少室山，非要强逼根骨奇佳的你磕头拜师！你巧立赌约或以佛理破其「老大老二」执念，施展《般若掌》十八掌叠浪震裂岳老三虎口，当众逼退南海鳄神、名震中州！',
    initialStepId: 'repel_yuelao3',
    steps: {
      repel_yuelao3: {
        id: 'repel_yuelao3',
        title: '空色叠浪 · 智斗岳老三',
        objective:
          '你已在寒玉榻畔得玄难与玄澄合授《般若掌》真传！西夏四大恶人【凶神恶煞 · 岳老三】竟持鳄嘴剪闯上少室山强收少林弟子为徒，请于【达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】外谷口智斗并迎战岳老三，以《般若掌》十八掌叠浪将其逼退！',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 幽谷石室 · 寒玉榻（sl_damo_main）】点击「迎战闯山强收徒的四大恶人岳老三 · 印证《般若掌》」。',
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
        id: 'trig_slq25_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_q25_start_triggered',
        condition: SHAOLIN_Q25_START_CONDITION,
        effects: [openScene('scene_slq25_01', SHAOLIN_Q25_QUEST_ID)],
      },
      {
        id: 'trig_slq25_battle_main',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_q25_battle_triggered',
        condition: atStep(SHAOLIN_Q25_QUEST_ID, 'repel_yuelao3'),
        effects: [openScene('scene_slq25_04', SHAOLIN_Q25_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq25_start_main',
        label: '【达摩终章】入幽谷石室拜谒玄澄与玄难 · 求学《般若掌》',
        badge: '般若波罗',
        subtitle: '达摩院真传单脉终章 · 幽谷石室 · 寒玉榻',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: SHAOLIN_Q25_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q25_start_triggered', value: true },
          openScene('scene_slq25_01', SHAOLIN_Q25_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq25_battle_main',
        label: '【达摩截恶】迎战闯山强收徒的四大恶人岳老三 · 印证《般若掌》',
        badge: '十八叠浪',
        subtitle: '幽谷外坪实战 · 智斗并力挫凶神恶煞岳老三',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: atStep(SHAOLIN_Q25_QUEST_ID, 'repel_yuelao3'),
        effects: [
          { type: 'setFlag', flag: 'sl_q25_battle_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q25_yuelao3_met', op: 'truthy' },
            thenEffects: [openScene('scene_slq25_05', SHAOLIN_Q25_QUEST_ID)],
            elseEffects: [openScene('scene_slq25_04', SHAOLIN_Q25_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq25_start_npc',
        label: '合十请益 · 恳请玄难与玄澄师伯合授达摩院《般若掌》',
        badge: '般若波罗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127', 'NPC-0109'] },
            SHAOLIN_Q25_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q25_start_triggered', value: true },
          openScene('scene_slq25_01', SHAOLIN_Q25_QUEST_ID),
        ],
      },
      {
        id: 'act_slq25_battle_npc',
        label: '禀明二位师伯 · 迎战闯山大闹的四大恶人岳老三',
        badge: '十八叠浪',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127', 'NPC-0109'] },
            atStep(SHAOLIN_Q25_QUEST_ID, 'repel_yuelao3'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q25_battle_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q25_yuelao3_met', op: 'truthy' },
            thenEffects: [openScene('scene_slq25_05', SHAOLIN_Q25_QUEST_ID)],
            elseEffects: [openScene('scene_slq25_04', SHAOLIN_Q25_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoBoruoPalmQuest.scenes').then((m) => m.SCENES),
  },
]
