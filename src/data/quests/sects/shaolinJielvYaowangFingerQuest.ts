import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q15_QUEST_ID = 'QST-SECT-01-15'

export const SHAOLIN_Q15_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-14', 'completed'),
    qStatus(SHAOLIN_Q15_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1095 },
    { type: 'skillAtLeast', key: '经义', min: 62 },
    { type: 'skillAtLeast', key: '书', min: 45 },
    { type: 'npcAlive', npcId: 'NPC-0158', npcName: '玄生' },
  ],
}

export const SHAOLIN_Q15_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q15_QUEST_ID,
    title: '药王百草 · 拈花截脉',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（太行溃匪首 · 独眼狼）',
    recommendedNote:
      '嵩山少林寺 Lv.2 戒律药王脉第三回核心任务链（全二十幕）。入寺满三载、完成《一拍两散 · 汴京缉凶》且经义 ≥ 62、书 ≥ 45 后，于大雄宝殿东厢碑廊助药王院主玄生整理医典。适逢黄河泛滥郑州流民爆发「锁喉瘴」，玄生以医道传授地阶绝学《拈花指》，令你下山隔衣点穴疏脉救民；太行溃匪首领「独眼狼」趁乱率众劫掠药棚，你指掌齐施封穴破敌，活人无数，获药王院主高度嘉许。',
    startHint:
      '入寺满 1095 日、完成《一拍两散 · 汴京缉凶》且经义 ≥ 62、书 ≥ 45 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱】拜见玄生即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    },
    startCondition: SHAOLIN_Q15_START_CONDITION,
    summary:
      '{reignYear}夏末，你在【东厢碑廊 · 藏经橱】协助药王院主【玄生】抄校千年古医典。突闻黄河郑州段决口泛滥，流民聚处爆发剧烈「锁喉瘴」。玄生感念苍生疾苦，破例以医道传你少林七十二绝技之一《拈花指》，命你随行驰赴郑州官道设棚救灾，以柔绵禅劲隔衣点穴疏通病民气脉。未料太行山溃匪首领「独眼狼」趁火打劫、率众直扑药棚！你挺身护民，指掌齐施封穴破敌生擒匪首，保住百余染疫百姓性命，深得药王院「医武同源、济世活人」三昧。',
    initialStepId: 'zhengzhou_relief_camp',
    steps: {
      zhengzhou_relief_camp: {
        id: 'zhengzhou_relief_camp',
        title: '郑州施药 · 拈花退匪',
        objective:
          '黄河泛滥郑州流民爆发锁喉瘴，药王院主玄生正备药箱下山济世。请留在【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】随玄生习《拈花指》救人要诀，并驰赴郑州官道药棚救民抗匪！',
        nextHint:
          '在【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】点击「随玄生驰赴郑州药棚 · 拈花救民破溃匪」。',
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
        id: 'trig_slq15_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_q15_start_triggered',
        condition: SHAOLIN_Q15_START_CONDITION,
        effects: [openScene('scene_slq15_01', SHAOLIN_Q15_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq15_start_east',
        label: '【药王院】东厢校典 · 助玄生整理少林医经',
        badge: '药王百草',
        subtitle: '第一幕 · 东厢碑廊藏经橱',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: SHAOLIN_Q15_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q15_start_triggered', value: true },
          openScene('scene_slq15_01', SHAOLIN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq15_relief_camp',
        label: '【药王院】随玄生驰赴郑州药棚 · 拈花救民破太行溃匪',
        badge: '拈花截脉',
        subtitle: '郑州救灾施药 · 实战破敌独眼狼',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_Q15_QUEST_ID, 'zhengzhou_relief_camp'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q15_at_camp', op: 'truthy' },
            thenEffects: [openScene('scene_slq15_13', SHAOLIN_Q15_QUEST_ID)],
            elseEffects: [openScene('scene_slq15_03', SHAOLIN_Q15_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq15_start_npc',
        label: '合十参礼 · 协助玄生师伯整理药王医典',
        badge: '药王百草',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0158'] },
            SHAOLIN_Q15_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q15_start_triggered', value: true },
          openScene('scene_slq15_01', SHAOLIN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'act_slq15_continue_npc',
        label: '随玄生师伯下山 · 续赴郑州官道药棚救民',
        badge: '拈花截脉',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0158'] },
            atStep(SHAOLIN_Q15_QUEST_ID, 'zhengzhou_relief_camp'),
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q15_at_camp', op: 'truthy' },
            thenEffects: [openScene('scene_slq15_13', SHAOLIN_Q15_QUEST_ID)],
            elseEffects: [openScene('scene_slq15_03', SHAOLIN_Q15_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvYaowangFingerQuest.scenes').then((m) => m.SCENES),
  },
]
