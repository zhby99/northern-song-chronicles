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
      '嵩山少林寺 Lv.1 外门艺武双修支线（全九幕）。须完成少林外门第二回历练且「书」或「画」造诣 ≥ 20。于东庑碑帖武库院助云游僧净法墨拓修补唐代武僧演武砖雕，以书画鉴伪识破黑市奸商暗夹硫酸腐液毁碑图谋或正面护碑击退护院「铁背熊」，自择拓本归属，蒙慧轮嘉许补授另一门少林良阶拳棍绝学！',
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
      '{reignYear}嵩山秋意渐浓，【东庑碑帖武库院】中数方唐代少林武僧演武砖雕因风雨剥蚀日渐漫漶。云游僧【净法】慕你南麓止争威名与书画功底，邀你共施松烟墨拓印留存古碑真迹。岂料洛阳黑市书商贾文赝携恶奴护院【铁背熊】潜入碑院，竟妄图强拓后泼洒硫酸腐液毁碑以抬高孤本价码！你或以书画鉴伪当众点破其伪印腐液惊退帮凶、或横身硬撼逐退群恶，终护全古碑与拓本。大金刚僧【慧轮】闻讯盛赞，依你当年南麓择艺补授另一门外门上品武学，成拳棍双修之基。',
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
        effects: [openScene('scene_sls02_02', SHAOLIN_SIDE02_QUEST_ID)],
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
            thenEffects: [openScene('scene_sls02_04', SHAOLIN_SIDE02_QUEST_ID)],
            elseEffects: [openScene('scene_sls02_02', SHAOLIN_SIDE02_QUEST_ID)],
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
            thenEffects: [openScene('scene_sls02_04', SHAOLIN_SIDE02_QUEST_ID)],
            elseEffects: [openScene('scene_sls02_02', SHAOLIN_SIDE02_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideSteleRubbingQuest.scenes').then((m) => m.SCENES),
  },
]
