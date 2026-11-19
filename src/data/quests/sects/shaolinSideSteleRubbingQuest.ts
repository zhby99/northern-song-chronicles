import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE02_QUEST_ID = 'QST-SECT-01-SIDE-02'

export const SHAOLIN_SIDE02_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-02', 'completed'),
    qStatus(SHAOLIN_SIDE02_QUEST_ID, 'not_started'),
    {
      type: 'any',
      conditions: [
        { type: 'skillAtLeast', key: '书', min: 20 },
        { type: 'skillAtLeast', key: '画', min: 20 },
      ],
      hint: '书或画造诣达 20',
    },
    { type: 'npcAlive', npcId: 'NPC-0918', npcName: '净法' },
    { type: 'npcAlive', npcId: 'NPC-0254', npcName: '慧轮' },
  ],
}

export const SHAOLIN_SIDE02_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE02_QUEST_ID,
    title: '东庑拓碑 · 拳棍双修',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流中品',
    maxOpponentRealm: '三流中品（黑市书商护院 · 铁背熊）',
    recommendedNote:
      '嵩山少林寺 Lv.1 外门艺武双修支线（全十幕）。须完成少林外门第二回历练且「书」或「画」造诣 ≥ 20。于东庑碑帖武库院助云游僧净法墨拓修补唐代武僧演武砖雕，逐退偷拓古碑的洛阳黑市书商与恶奴护院「铁背熊」，蒙大金刚僧慧轮嘉许，补授当年入门未选的另一门少林良阶外门武学（《伏虎拳》或《少林齐眉棍》）！',
    startHint:
      '完成少林外门第二回历练且书或画造诣 ≥ 20 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院】寻云游僧净法即可接取。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
    },
    startCondition: SHAOLIN_SIDE02_START_CONDITION,
    summary:
      '{reignYear}嵩山秋意渐浓，【东庑碑帖武库院】中数方唐代少林武僧演武砖雕因风雨剥蚀日渐漫漶。云游僧【净法】见你书画造诣不俗，邀你共敷宣纸、施松烟墨拓印留存古碑真迹。岂料洛阳黑市奸商垂涎古拓重利，竟携三流中品恶奴护院【铁背熊】暗入碑院企图强抢并凿取残砖！你于碑廊之间临危迎敌，以刚柔并济之势击退铁背熊、护全古碑与拓本。大金刚僧【慧轮】闻讯赶来，赞你艺武双全、好学不倦，当即补授你当年外门择艺时未选的另一门良阶绝学，使你达成拳棍双修之境。',
    initialStepId: 'stele_rubbing_guard',
    steps: {
      stele_rubbing_guard: {
        id: 'stele_rubbing_guard',
        title: '墨拓唐雕 · 护碑逐恶',
        objective:
          '已应云游僧净法之邀修拓唐代武僧演武砖雕！请于【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】完成碑文墨拓，并提防觊觎古碑的黑市恶徒。',
        nextHint:
          '在【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「助净法墨拓唐代砖雕并护守碑院」或与净法交谈。',
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
        id: 'trig_sls02_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_side02_start_triggered',
        condition: SHAOLIN_SIDE02_START_CONDITION,
        effects: [openScene('scene_sls02_01', SHAOLIN_SIDE02_QUEST_ID)],
      },
      {
        id: 'trig_sls02_rubbing_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_side02_rubbing_triggered',
        condition: atStep(SHAOLIN_SIDE02_QUEST_ID, 'stele_rubbing_guard'),
        effects: [openScene('scene_sls02_03', SHAOLIN_SIDE02_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls02_start_west',
        label: '【少林支线】问询净法修拓唐代武僧砖雕之事',
        badge: '东庑拓碑',
        subtitle: '东庑碑帖武库院 · 需书或画 ≥ 20',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: SHAOLIN_SIDE02_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side02_start_triggered', value: true },
          openScene('scene_sls02_01', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls02_rubbing_west',
        label: '【少林支线】助净法墨拓唐代砖雕并护守碑院',
        badge: '护碑驱恶',
        subtitle: '东庑碑帖武库院 · 补授拳棍双全',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_SIDE02_QUEST_ID, 'stele_rubbing_guard'),
        effects: [
          { type: 'setFlag', flag: 'sl_side02_rubbing_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side02_bear_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls02_06', SHAOLIN_SIDE02_QUEST_ID)],
            elseEffects: [openScene('scene_sls02_03', SHAOLIN_SIDE02_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls02_start_npc',
        label: '请缨协助修拓唐代武僧演武砖雕',
        badge: '东庑拓碑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0918'] },
            SHAOLIN_SIDE02_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side02_start_triggered', value: true },
          openScene('scene_sls02_01', SHAOLIN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'act_sls02_rubbing_npc',
        label: '与净法继续墨拓砖雕并护守东庑碑院',
        badge: '护碑驱恶',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0918'] },
            atStep(SHAOLIN_SIDE02_QUEST_ID, 'stele_rubbing_guard'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side02_rubbing_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side02_bear_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls02_06', SHAOLIN_SIDE02_QUEST_ID)],
            elseEffects: [openScene('scene_sls02_03', SHAOLIN_SIDE02_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideSteleRubbingQuest.scenes').then((m) => m.SCENES),
  },
]
