import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q24_QUEST_ID = 'QST-SECT-01-24'

export const SHAOLIN_Q24_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-21', 'completed'),
    qStatus(SHAOLIN_Q24_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'damo'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 360 },
    { type: 'skillAtLeast', key: '经义', min: 74 },
    { type: 'skillAtLeast', key: '书', min: 55 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
  ],
}

export const SHAOLIN_Q24_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q24_QUEST_ID,
    title: '面壁九年 · 剑化禅机',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（姑苏慕容家将 · 包不同 / 风波恶）',
    recommendedNote:
      '嵩山少林寺达摩院真传单脉首章（全十一幕高交互）。须为达摩院脉 Lv.3 真传弟子、完成《飞瀑深潭 · 一苇渡江》、入寺满 360 日且经义 ≥ 74、书 ≥ 55。于绝壁石刻剑痕崖观摩初祖面壁石影三昼夜悟得《达摩剑法》；姑苏慕容家将包不同、风波恶闯崖窥剑，你以禅锋机辩舌战「非也非也」包不同，复以青竹剑挑落佩刀！',
    startHint:
      '达摩院脉真传弟子完成《飞瀑深潭 · 一苇渡江》、入寺满 360 日且经义 ≥ 74、书 ≥ 55 后，前往【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】（或寻玄难）观摩初祖面壁石影。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_Q24_START_CONDITION,
    summary:
      '{reignYear}入寺逾载，你在达摩院潜心参禅习剑，蒙伏魔首座【玄难】准许独登【绝壁石刻 · 剑痕崖】，面对初祖达摩面壁九年所留淡墨石影静坐三昼夜，豁然贯通少林七十二绝技之《达摩剑法》。方欲收剑礼佛，姑苏慕容氏家将【包不同】与【风波恶】竟闯崖窥剑、连抛「非也非也」诡辩挑衅！你以禅锋舌辩折服包不同（或车轮连战慕容双将），复以青竹剑化禅机挑落佩刀，令二人心服下山！',
    initialStepId: 'cliff_duel_murong',
    steps: {
      cliff_duel_murong: {
        id: 'cliff_duel_murong',
        title: '剑痕截客 · 舌辩斗双将',
        objective:
          '你已于剑痕崖观初祖石影三昼夜悟得《达摩剑法》真意！姑苏慕容氏家将【包不同】与【风波恶】潜闯【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】窥剑挑衅，请舌战机锋并击退来敌、挑落其佩刀！',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】点击「剑化禅机 · 迎战姑苏慕容包不同与风波恶」。',
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
        id: 'trig_slq24_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q24_start_triggered',
        condition: SHAOLIN_Q24_START_CONDITION,
        effects: [openScene('scene_slq24_01', SHAOLIN_Q24_QUEST_ID)],
      },
      {
        id: 'trig_slq24_duel_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q24_duel_triggered',
        condition: atStep(SHAOLIN_Q24_QUEST_ID, 'cliff_duel_murong'),
        effects: [openScene('scene_slq24_05', SHAOLIN_Q24_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq24_start_east',
        label: '【达摩剑禅】登绝壁石刻剑痕崖 · 观初祖石影悟《达摩剑法》',
        badge: '面壁悟剑',
        subtitle: '达摩院真传单脉首章 · 绝壁石刻 · 剑痕崖',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: SHAOLIN_Q24_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q24_start_triggered', value: true },
          openScene('scene_slq24_01', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq24_duel_east',
        label: '【剑痕截客】剑化禅机 · 迎战慕容家将包不同与风波恶',
        badge: '一剑挑锋',
        subtitle: '剑痕崖实战 · 舌辩机锋并挫败慕容双将',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q24_QUEST_ID, 'cliff_duel_murong'),
        effects: [
          { type: 'setFlag', flag: 'sl_q24_duel_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_murong_arrived', op: 'truthy' },
            thenEffects: [openScene('scene_slq24_07', SHAOLIN_Q24_QUEST_ID)],
            elseEffects: [openScene('scene_slq24_05', SHAOLIN_Q24_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq24_start_npc',
        label: '合十请益 · 恳请玄难首座准赴剑痕崖观石影悟《达摩剑法》',
        badge: '面壁悟剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
            SHAOLIN_Q24_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q24_start_triggered', value: true },
          openScene('scene_slq24_01', SHAOLIN_Q24_QUEST_ID),
        ],
      },
      {
        id: 'act_slq24_duel_npc',
        label: '禀明玄难首座 · 速赴剑痕崖击退窥剑之包不同与风波恶',
        badge: '一剑挑锋',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
            atStep(SHAOLIN_Q24_QUEST_ID, 'cliff_duel_murong'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q24_duel_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q24_murong_arrived', op: 'truthy' },
            thenEffects: [openScene('scene_slq24_07', SHAOLIN_Q24_QUEST_ID)],
            elseEffects: [openScene('scene_slq24_05', SHAOLIN_Q24_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoSwordMasterQuest.scenes').then((m) => m.SCENES),
  },
]
