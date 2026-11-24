import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q15_QUEST_ID = 'QST-SECT-01-15'

export const SHAOLIN_Q15_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-14', 'completed'),
    qStatus(SHAOLIN_Q15_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 210 },
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
      '嵩山少林寺 Lv.2 戒律药王脉第三回核心任务链（全十一幕）。入寺满 210 日、完成《一拍两散 · 汴京缉凶》且经义 ≥ 62、书 ≥ 45 后触发。黄河泛滥郑州流民爆发「锁喉瘴」，药王院主玄生以医道亲授地阶绝学《拈花指》，携你驰赴郑州疫营：先须无提示辨证施治高热瘀毒急症，继而在太行溃匪首「独眼狼」劫掠药棚时于「药烟熏敌破先锋」「掷药囊分银安抚饿匪」「金刚截脉正面血战」三策中破局护民，终得药王真传。',
    startHint:
      '入寺满 210 日、完成《一拍两散 · 汴京缉凶》且经义 ≥ 62、书 ≥ 45 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱】拜见玄生即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    },
    startCondition: SHAOLIN_Q15_START_CONDITION,
    summary:
      '{reignYear}夏末，你在【东厢碑廊 · 藏经橱】协助药王院主【玄生】抄校古医典。突闻黄河郑州段决口，流民聚处爆发剧烈「锁喉瘴」。玄生破例以医道传你少林七十二绝技《拈花指》，携大黑续命膏与解瘴散星夜驰赴郑州官道疫棚。面对高热神昏、舌绛瘀毒的重症疫患，你亲断方药与穴道截脉之策；黄昏时分太行溃匪首「独眼狼」率众劫掠药营，你或巧施曼陀罗药烟、或分银遣散被裹挟饥民、或正面血战生擒匪首，活人无数，深悟药王院「一指截恶脉，一指渡苍生」之三昧。',
    initialStepId: 'zhengzhou_relief_camp',
    steps: {
      zhengzhou_relief_camp: {
        id: 'zhengzhou_relief_camp',
        title: '郑州施药 · 拈花退匪',
        objective:
          '黄河泛滥郑州流民爆发锁喉瘴，药王院主玄生正备药箱下山济世。请留在【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】随玄生习《拈花指》救人要诀，并驰赴郑州官道疫棚辨证治疫、破太行溃匪！',
        nextHint:
          '在【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】点击「随玄生驰赴郑州药棚 · 辨证施药破溃匪」。',
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
        label: '【药王院】随玄生驰赴郑州药棚 · 辨证施药破太行溃匪',
        badge: '拈花截脉',
        subtitle: '郑州疫营辨证施救 · 三策破溃匪独眼狼',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_Q15_QUEST_ID, 'zhengzhou_relief_camp'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q15_at_camp', op: 'truthy' },
            thenEffects: [openScene('scene_slq15_06', SHAOLIN_Q15_QUEST_ID)],
            elseEffects: [openScene('scene_slq15_02', SHAOLIN_Q15_QUEST_ID)],
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
            thenEffects: [openScene('scene_slq15_06', SHAOLIN_Q15_QUEST_ID)],
            elseEffects: [openScene('scene_slq15_02', SHAOLIN_Q15_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvYaowangFingerQuest.scenes').then((m) => m.SCENES),
  },
]
