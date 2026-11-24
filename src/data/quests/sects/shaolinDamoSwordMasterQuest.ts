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
      '嵩山少林寺达摩院真传单脉首章（全二十四幕）。须为达摩院脉 Lv.3 真传弟子、完成《飞瀑深潭 · 一苇渡江》、入寺满一季（360 日）且经义 ≥ 74、书 ≥ 55。奉伏魔首座玄难之命，于达摩院绝壁石刻剑痕崖观摩初祖面壁石影三昼夜，终将书法笔意与禅宗顿悟融于一炉，悟得少林剑道绝艺《达摩剑法》；岂料姑苏慕容氏家将「非也先生」包不同与「一阵风」风波恶竟悄然闯上剑痕崖偷窥剑意，你车轮连战，剑化禅机当场挑落二人佩刀！',
    startHint:
      '达摩院脉真传弟子完成《飞瀑深潭 · 一苇渡江》、入寺满一季（360 日）且经义 ≥ 74、书 ≥ 55 后，前往【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】（或寻玄难）观摩初祖面壁石影。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_Q24_START_CONDITION,
    summary:
      '{reignYear}入寺七载，你在达摩院潜心参禅习剑，蒙伏魔首座【玄难】准许独登【绝壁石刻 · 剑痕崖】，面对初祖达摩面壁九年所留的淡墨石影静坐悟剑。三昼夜风雪不移，你由石影纹路与绝壁残剑痕中豁然悟透「无剑之剑、一念化千锋」的禅门剑意，贯通少林七十二绝技之《达摩剑法》。方欲收剑礼佛，姑苏慕容氏四大家将中的【包不同】与【风波恶】竟趁暮色闯上剑痕崖窥伺偷学，更出言挑衅欲试少林真传深浅！你寸步不让，以初悟之《达摩剑法》独斗慕容双将，剑光如禅影随形，当场挑落二人佩刀，令二人心服退山！',
    initialStepId: 'cliff_duel_murong',
    steps: {
      cliff_duel_murong: {
        id: 'cliff_duel_murong',
        title: '剑痕截客 · 独斗包风双将',
        objective:
          '你已于剑痕崖观初祖石影三昼夜悟得《达摩剑法》真意！姑苏慕容氏家将【包不同】与【风波恶】潜闯【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】窥剑挑衅，请车轮连战击退二人、挑落其佩刀！',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】点击「剑化禅机 · 独斗姑苏慕容包不同与风波恶」。',
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
        effects: [openScene('scene_slq24_12', SHAOLIN_Q24_QUEST_ID)],
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
        label: '【剑痕截客】剑化禅机 · 车轮连战 迎战慕容家将包不同与风波恶',
        badge: '一剑挑双刀',
        subtitle: '剑痕崖实战 · 独斗包不同、风波恶（一流中品战局）',
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
            thenEffects: [openScene('scene_slq24_16', SHAOLIN_Q24_QUEST_ID)],
            elseEffects: [openScene('scene_slq24_12', SHAOLIN_Q24_QUEST_ID)],
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
        badge: '一剑挑双刀',
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
            thenEffects: [openScene('scene_slq24_16', SHAOLIN_Q24_QUEST_ID)],
            elseEffects: [openScene('scene_slq24_12', SHAOLIN_Q24_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoSwordMasterQuest.scenes').then((m) => m.SCENES),
  },
]
