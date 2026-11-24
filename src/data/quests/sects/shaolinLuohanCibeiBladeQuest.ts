import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q05_QUEST_ID = 'QST-SECT-01-05'

export const SHAOLIN_Q05_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-04', 'completed'),
    qStatus(SHAOLIN_Q05_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'luohan'),
    flag('shaolin_disciple_type', 'eq', 'monk'),
    { type: 'skillAtLeast', key: '经义', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-0192', npcName: '玄灭' },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
  ],
}

export const SHAOLIN_Q05_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q05_QUEST_ID,
    title: '东庑刀鸣 · 慈悲度寇',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流下品',
    maxOpponentRealm: '二流下品（河洛刀匪首 · 豁口屠夫屠三）',
    recommendedNote:
      '嵩山少林寺罗汉堂脉 Lv.2 内门首回任务链（全十幕）。须已剃度归入罗汉堂且经义 ≥ 50。于东庑碑帖武库院随伏魔刀僧玄灭、降魔尊者玄苦受传《慈悲刀法》，旋即驰赴山脚颍阳镇化解饥民劫粮乱局：可择施银开仓辩理安民、刀背卸兵慈悲阵或金刚震慑硬破匪阵三策破局，擒获河洛刀匪首「豁口屠夫」屠三后，更须裁定其剃发劳役赎罪或押官严惩。',
    startHint:
      '晋升内门并归入罗汉堂（剃度出家）、且经义 ≥ 50 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院】（或寻玄灭、玄苦师伯）即可开启《慈悲刀法》传功与颍阳度寇之行。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
    },
    startCondition: SHAOLIN_Q05_START_CONDITION,
    summary:
      '{reignYear}春寒料峭，你初入少林罗汉堂内门，于【东庑碑帖武库院】拜见伏魔刀僧【玄灭】与降魔尊者【玄苦】，领受少林七十二绝技《慈悲刀法》「劈而不杀、截而不折」之止戈禅意。适逢河洛悍匪「豁口屠夫」【屠三】裹挟灾年饥民逼劫山脚颍阳镇义仓，你随玄灭星夜驰援，于火光乱阵前或施银购粟辩理安民免伤百姓、或以刀背卸兵保全流民再擒屠三、或以金刚威势震散外围连战匪首。生擒屠三后，你还须在设粥棚令其剃发服役赎罪与押交县衙追赃严办之间作出抉择。',
    initialStepId: 'cibei_blade_study',
    steps: {
      cibei_blade_study: {
        id: 'cibei_blade_study',
        title: '东庑传刀 · 演刃试锋',
        objective:
          '你已在东庑碑帖武库院领命驰援颍阳镇。请留守【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，随玄灭师伯演练并正式习得《慈悲刀法》，随后整装下山！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「东庑领戒刀 · 随玄灭演习《慈悲刀法》」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_west',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
        },
      },
      yingyang_mercy: {
        id: 'yingyang_mercy',
        title: '颍阳度寇 · 生擒屠三',
        objective:
          '你已习得《慈悲刀法》！河洛悍匪「豁口屠夫」屠三正驱使饥民逼劫颍阳镇义仓。请由【东庑碑帖武库院（sl_luohan_west）】启程驰赴颍阳镇，择策化解饥民匪众混战之局并生擒屠三！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「驰赴颍阳镇义仓 · 慈悲刀度寇擒匪」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_west',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq05_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_q05_start_triggered',
        condition: SHAOLIN_Q05_START_CONDITION,
        effects: [openScene('scene_slq05_01', SHAOLIN_Q05_QUEST_ID)],
      },
      {
        id: 'trig_slq05_study_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_q05_study_triggered',
        condition: atStep(SHAOLIN_Q05_QUEST_ID, 'cibei_blade_study'),
        effects: [openScene('scene_slq05_02', SHAOLIN_Q05_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq05_start_west',
        label: '【罗汉堂脉】东庑刀鸣 · 拜请玄灭玄苦传授《慈悲刀法》',
        badge: '慈悲刀法',
        subtitle: '罗汉堂首课 · 东庑碑帖武库院',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: SHAOLIN_Q05_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q05_start_triggered', value: true },
          openScene('scene_slq05_01', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq05_study_west',
        label: '【罗汉堂脉】东庑领戒刀 · 随玄灭演习《慈悲刀法》',
        badge: '东庑试刀',
        subtitle: '习得慈悲刀法 · 整装驰援颍阳镇',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_Q05_QUEST_ID, 'cibei_blade_study'),
        effects: [
          { type: 'setFlag', flag: 'sl_q05_study_triggered', value: true },
          openScene('scene_slq05_02', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq05_yingyang_mercy',
        label: '【罗汉堂脉】驰赴颍阳镇义仓 · 慈悲刀度寇擒匪',
        badge: '慈悲度寇',
        subtitle: '三策化解饥民乱局 · 生擒豁口屠夫屠三',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_Q05_QUEST_ID, 'yingyang_mercy'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q05_peasant_disarmed', op: 'truthy' },
            thenEffects: [openScene('scene_slq05_07_tusan', SHAOLIN_Q05_QUEST_ID)],
            elseEffects: [openScene('scene_slq05_03', SHAOLIN_Q05_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq05_start_npc',
        label: '合十请益 · 聆听玄灭玄苦传授《慈悲刀法》',
        badge: '慈悲刀法',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0192', 'NPC-0126'] },
            SHAOLIN_Q05_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q05_start_triggered', value: true },
          openScene('scene_slq05_01', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'act_slq05_study_npc',
        label: '禀请玄灭师伯 · 演练《慈悲刀法》并整装下山',
        badge: '东庑试刀',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0192', 'NPC-0126'] },
            atStep(SHAOLIN_Q05_QUEST_ID, 'cibei_blade_study'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q05_study_triggered', value: true },
          openScene('scene_slq05_02', SHAOLIN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'act_slq05_yingyang_npc',
        label: '随玄灭师伯驰赴颍阳镇 · 破阵度饥民擒屠三',
        badge: '慈悲度寇',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0192', 'NPC-0126'] },
            atStep(SHAOLIN_Q05_QUEST_ID, 'yingyang_mercy'),
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q05_peasant_disarmed', op: 'truthy' },
            thenEffects: [openScene('scene_slq05_07_tusan', SHAOLIN_Q05_QUEST_ID)],
            elseEffects: [openScene('scene_slq05_03', SHAOLIN_Q05_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanCibeiBladeQuest.scenes').then((m) => m.SCENES),
  },
]
