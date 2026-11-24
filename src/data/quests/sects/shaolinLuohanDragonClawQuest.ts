import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q07_QUEST_ID = 'QST-SECT-01-07'

export const SHAOLIN_Q07_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-06', 'completed'),
    qStatus(SHAOLIN_Q07_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 210 },
    { type: 'skillAtLeast', key: '经义', min: 62 },
    { type: 'skillAtLeast', key: '书', min: 45 },
    { type: 'npcAlive', npcId: 'NPC-0191', npcName: '玄石' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q07_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q07_QUEST_ID,
    title: '碎碑擒龙 · 少室捉谍',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（大辽枢密院轻功谍探 · 耶律青影）',
    recommendedNote:
      '嵩山少林寺罗汉堂脉 Lv.2 内门第三回任务链（全二十幕）。须入寺满 210 日、完成洛阳白马寺韦陀降魔之役，且经义 ≥ 62、书法 ≥ 45。东庑《秦王碑》背阴暗刻的河朔古边防舆图忽现辽墨偷拓残痕，铁掌禅师玄痛与碎碑僧玄石合授少林七十二绝技《龙爪手》，三更寒雾设伏碑廊，以三十六式龙爪擒拿一挑二撕甲扣脉，活捉大辽枢密院轻功谍探耶律青影！',
    startHint:
      '入寺满 210 日、完成【释源白马 · 韦陀降魔】且经义 ≥ 62、书 ≥ 45 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院】（或寻玄石、玄痛师伯）查验《秦王碑》偷拓异变。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
    },
    startCondition: SHAOLIN_Q07_START_CONDITION,
    summary:
      '{reignYear}寒冬，你在少林修行已满三载。清晨洒扫【东庑碑帖武库院】时，你凭深厚书法眼力察觉唐代《秦王碑》背阴微凹处竟沾有幽州松烟拓墨与刮蜡残屑——原来碑阴夹层暗刻着太祖朝留存的河朔古驿道与关隘地形残图，已被大辽细作盯上！戒律长老【玄痛】与碎碑僧【玄石】闻报大惊，决定将计就计设伏诱敌，并趁日间合授你少林至刚至巧的擒拿绝学《龙爪手》。三更寒雾漫卷碑廊，大辽枢密院轻功谍探【耶律青影】率暗哨潜入偷拓，你以《龙爪手》后发先至，于雾中一对二硬撕软甲、扣锁脉门，当场活捉两名辽谍，保全大宋河朔关防秘图。',
    initialStepId: 'stele_claw_study',
    steps: {
      stele_claw_study: {
        id: 'stele_claw_study',
        title: '碑阴残墨 · 合授龙爪',
        objective:
          '你已于东庑《秦王碑》背阴察觉大辽细作偷拓边防舆图的痕迹！请留守【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，随玄痛与玄石二位高僧研习《龙爪手》三十六路擒拿要诀！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「东庑碎石演爪 · 随玄痛玄石合习《龙爪手》」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_west',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
        },
      },
      midnight_spy_trap: {
        id: 'midnight_spy_trap',
        title: '三更寒雾 · 龙爪捉谍',
        objective:
          '《龙爪手》三十六路爪劲已然成势！今夜三更寒雾起，大辽枢密院轻功谍探【耶律青影】必再潜入偷拓余图。速赴【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】隐身设伏，一挑二活捉辽谍！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「三更寒雾设伏 · 龙爪手活捉大辽谍探」。',
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
        id: 'trig_slq07_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_q07_start_triggered',
        condition: SHAOLIN_Q07_START_CONDITION,
        effects: [openScene('scene_slq07_01', SHAOLIN_Q07_QUEST_ID)],
      },
      {
        id: 'trig_slq07_study_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_q07_study_triggered',
        condition: atStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
        effects: [openScene('scene_slq07_04', SHAOLIN_Q07_QUEST_ID)],
      },
      {
        id: 'trig_slq07_trap_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_q07_trap_triggered',
        condition: atStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
        effects: [openScene('scene_slq07_09', SHAOLIN_Q07_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq07_start_west',
        label: '【罗汉堂脉】勘验东庑《秦王碑》 · 察觉辽墨偷拓残痕',
        badge: '碑阴异变',
        subtitle: '唐碑暗藏边防舆图 · 东庑碑帖武库院',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: SHAOLIN_Q07_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q07_start_triggered', value: true },
          openScene('scene_slq07_01', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq07_study_west',
        label: '【罗汉堂脉】东庑碎石演爪 · 随玄痛玄石合习《龙爪手》',
        badge: '合授龙爪',
        subtitle: '三十六路擒拿绝技 · 专破轻功软甲',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
        effects: [
          { type: 'setFlag', flag: 'sl_q07_study_triggered', value: true },
          openScene('scene_slq07_04', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq07_trap_west',
        label: '【罗汉堂脉】三更寒雾设伏 · 龙爪手活捉大辽谍探',
        badge: '碎碑擒龙',
        subtitle: '一挑二硬撼耶律青影 · 撕甲扣脉保舆图',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
        effects: [
          { type: 'setFlag', flag: 'sl_q07_trap_triggered', value: true },
          openScene('scene_slq07_09', SHAOLIN_Q07_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq07_start_npc',
        label: '禀报玄石玄痛师伯 · 东庑《秦王碑》现辽墨偷拓残痕',
        badge: '碑阴异变',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0191', 'NPC-0156'] },
            SHAOLIN_Q07_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q07_start_triggered', value: true },
          openScene('scene_slq07_01', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'act_slq07_study_npc',
        label: '请益玄痛玄石师伯 · 研习《龙爪手》破轻功要诀',
        badge: '合授龙爪',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0191', 'NPC-0156'] },
            atStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q07_study_triggered', value: true },
          openScene('scene_slq07_04', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'act_slq07_trap_npc',
        label: '启禀师伯 · 三更入东庑寒雾设伏擒拿辽谍',
        badge: '碎碑擒龙',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0191', 'NPC-0156'] },
            atStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q07_trap_triggered', value: true },
          openScene('scene_slq07_09', SHAOLIN_Q07_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanDragonClawQuest.scenes').then((m) => m.SCENES),
  },
]
