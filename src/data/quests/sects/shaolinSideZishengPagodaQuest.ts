import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE07_QUEST_ID = 'QST-SECT-01-SIDE-07'

export const SHAOLIN_SIDE07_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE07_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '书', min: 35 },
    { type: 'npcAlive', npcId: 'NPC-0378', npcName: '慧禅' },
    { type: 'npcAlive', npcId: 'NPC-0902', npcName: '净清' },
  ],
}

export const SHAOLIN_SIDE07_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE07_QUEST_ID,
    title: '资圣宝塔 · 夜雨护经',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'bianliang',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品（江南飞贼 · 踏云燕）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门支线（全十二幕）。书法达三十五后，于开封府大相国寺资圣八角琉璃宝塔接驻僧慧禅、净清急报：江南飞贼“踏云燕”下帖预告夜盗御赐金字《华严经》。雨夜百尺飞檐设伏生擒飞贼，并自密函中牵出姑苏慕容外围商号线索。',
    startHint:
      '晋升少林内门书法不低于三十五后，前往【开封府 · 大相国寺（八角宝塔） · 资圣八角琉璃宝塔】寻慧禅或净清即可触发。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_pagoda',
      customLabel: '开封府 · 大相国寺（八角宝塔） · 资圣八角琉璃宝塔',
    },
    startCondition: SHAOLIN_SIDE07_START_CONDITION,
    summary:
      '{reignYear}汴京夏雨将至，大相国寺资圣八角琉璃宝塔顶层供奉的仁宗御赐金字《华严经》忽收一纸墨迹未干的预告盗帖，署名为江南轻功大盗【踏云燕】。驻塔执事武僧【慧禅】与洒扫沙弥【净清】急请精于书道鉴辨的你前来相助。你细辨盗帖笔锋与苏杭水纹宣纸，识破此贼不仅贪图金字佛经，背后更有江南豪门高价悬购。你献计于塔顶以仿写经卷诱敌，自己在百尺飞檐暴雨之中潜伏守候。三更雷鸣之际，踏云燕果如幽灵般掠檐而至，你在湿滑琉璃瓦上与其激战生擒此贼，更在其贴身暗袋中搜出盖有姑苏慕容氏外围绸缎商号暗印的雇佣密函。',
    initialStepId: 'pagoda_rain_ambush',
    steps: {
      pagoda_rain_ambush: {
        id: 'pagoda_rain_ambush',
        title: '摹经设饵 · 飞檐候贼',
        objective:
          '已识破预告盗帖笔意并拟定诱敌之计！请留在【大相国寺（八角宝塔） · 资圣八角琉璃宝塔（bl_xg_pagoda）】摹写赝卷布防，静候三更暴雨中【踏云燕】现身。',
        nextHint:
          '在【资圣八角琉璃宝塔（bl_xg_pagoda）】点击「夜雨登塔设伏，静候江南飞贼踏云燕」或与慧禅交谈。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺（八角宝塔） · 资圣八角琉璃宝塔',
        },
      },
      report_clue: {
        id: 'report_clue',
        title: '归经报喜 · 密函呈验',
        objective:
          '已于百尺飞檐生擒飞贼【踏云燕】并缴获姑苏外围商号密函！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】向慧禅与净清交割证物、安放真经。',
        nextHint:
          '在【资圣八角琉璃宝塔（bl_xg_pagoda）】点击「将御赐真经归位，向慧禅呈验姑苏商号密函」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺（八角宝塔） · 资圣八角琉璃宝塔',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls07_start',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        onceFlag: 'sl_side07_start_triggered',
        condition: SHAOLIN_SIDE07_START_CONDITION,
        effects: [openScene('scene_sls07_01', SHAOLIN_SIDE07_QUEST_ID)],
      },
      {
        id: 'trig_sls07_ambush',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        onceFlag: 'sl_side07_ambush_triggered',
        condition: atStep(SHAOLIN_SIDE07_QUEST_ID, 'pagoda_rain_ambush'),
        effects: [openScene('scene_sls07_04', SHAOLIN_SIDE07_QUEST_ID)],
      },
      {
        id: 'trig_sls07_report',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        onceFlag: 'sl_side07_report_triggered',
        condition: atStep(SHAOLIN_SIDE07_QUEST_ID, 'report_clue'),
        effects: [openScene('scene_sls07_11', SHAOLIN_SIDE07_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls07_start',
        label: '【少林支线】查验资圣宝塔飞贼预告帖',
        badge: '夜雨护经',
        subtitle: '资圣八角琉璃宝塔 · 慧禅与净清',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: SHAOLIN_SIDE07_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side07_start_triggered', value: true },
          openScene('scene_sls07_01', SHAOLIN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls07_ambush',
        label: '【少林支线】夜雨登塔设伏，静候江南飞贼踏云燕',
        badge: '飞檐擒贼',
        subtitle: '资圣八角琉璃宝塔 · 百尺塔檐',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(SHAOLIN_SIDE07_QUEST_ID, 'pagoda_rain_ambush'),
        effects: [
          { type: 'setFlag', flag: 'sl_side07_ambush_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side07_swallow_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls07_08', SHAOLIN_SIDE07_QUEST_ID)],
            elseEffects: [openScene('scene_sls07_04', SHAOLIN_SIDE07_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls07_report',
        label: '【少林支线】将御赐真经归位，向慧禅呈验姑苏商号密函',
        badge: '真经归位',
        subtitle: '资圣八角琉璃宝塔',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(SHAOLIN_SIDE07_QUEST_ID, 'report_clue'),
        effects: [
          { type: 'setFlag', flag: 'sl_side07_report_triggered', value: true },
          openScene('scene_sls07_11', SHAOLIN_SIDE07_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls07_start_npc',
        label: '查验飞贼“踏云燕”预告盗经之帖',
        badge: '夜雨护经',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0378', 'NPC-0902'] },
            SHAOLIN_SIDE07_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side07_start_triggered', value: true },
          openScene('scene_sls07_01', SHAOLIN_SIDE07_QUEST_ID),
        ],
      },
      {
        id: 'act_sls07_ambush_npc',
        label: '夜雨登塔设伏，拦截江南飞贼踏云燕',
        badge: '飞檐擒贼',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0378', 'NPC-0902'] },
            atStep(SHAOLIN_SIDE07_QUEST_ID, 'pagoda_rain_ambush'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side07_ambush_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side07_swallow_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls07_08', SHAOLIN_SIDE07_QUEST_ID)],
            elseEffects: [openScene('scene_sls07_04', SHAOLIN_SIDE07_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideZishengPagodaQuest.scenes').then((m) => m.SCENES),
  },
]
