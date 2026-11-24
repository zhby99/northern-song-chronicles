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
      '嵩山少林寺罗汉堂脉 Lv.2 内门第三回任务链（全十一幕）。须入寺满 210 日、完成洛阳白马寺韦陀降魔之役，且经义 ≥ 62、书法 ≥ 45。东庑《秦王碑》背阴暗刻的河朔古边防舆图忽现辽墨偷拓残痕，随铁掌禅师玄痛与碎碑僧玄石合习《龙爪手》后，勘察碑林、藏经院外与香积厨三处夜雾疑痕并独立推演辽谍真逃路与接头暗号；三更寒雾可凭推演请君入瓮、轻功追风硬截或正面搜林破伏生擒大辽谍首耶律青影，战后更须在禅理感化留口与严刑废功交官之间作出决断。',
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
      '{reignYear}寒冬，你于【东庑碑帖武库院】拂拭唐代《秦王碑》时，凭深厚书法眼力察觉碑阴沾有幽州松烟胡蜡——原来碑阴暗刻着太祖朝留存的河朔古驿道与关隘残图，已被大辽细作偷拓半幅！戒律长老【玄痛】与碎碑僧【玄石】合授少林擒拿绝技《龙爪手》后，令你勘察碑林松烟墨渍、藏经院外西风折竹与暗钉马蹄印、香积厨柴垛灰烬三处疑痕，识破诱饵真路。三更寒雾起时，你或龙爪截道请君入瓮、或凭轻功硬截、或正面搜林破伏，终撕裂幽州冰蚕软甲活捉大辽影谍【耶律青影】，并裁定其审讯与发落，以《心经》重封唐碑秘图。',
    initialStepId: 'stele_claw_study',
    steps: {
      stele_claw_study: {
        id: 'stele_claw_study',
        title: '碑阴残墨 · 演爪辨痕',
        objective:
          '你已于东庑《秦王碑》背阴察觉大辽细作偷拓边防舆图的痕迹！请留守【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，随玄痛与玄石合习《龙爪手》，并勘察塔林碑廊三处可疑痕迹以推演辽谍真实逃路！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「东庑碎石演爪 · 习《龙爪手》并勘察辽谍疑痕」。',
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
          '《龙爪手》三十六路爪劲已成，夜雾布防亦已推演定策！今夜三更寒雾漫卷，大辽枢密院轻功谍探【耶律青影】必再潜入偷拓余图。速赴【东庑碑帖武库院（sl_luohan_west）】收网捉谍！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】点击「三更寒雾布网 · 龙爪手活捉大辽谍探」。',
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
        effects: [openScene('scene_slq07_02', SHAOLIN_Q07_QUEST_ID)],
      },
      {
        id: 'trig_slq07_trap_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_q07_trap_triggered',
        condition: atStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
        effects: [openScene('scene_slq07_05_net', SHAOLIN_Q07_QUEST_ID)],
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
        label: '【罗汉堂脉】东庑碎石演爪 · 习《龙爪手》并勘察辽谍疑痕',
        badge: '演爪辨谍',
        subtitle: '习得龙爪手 · 少室三处疑痕推演',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_Q07_QUEST_ID, 'stele_claw_study'),
        effects: [
          { type: 'setFlag', flag: 'sl_q07_study_triggered', value: true },
          openScene('scene_slq07_02', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq07_trap_west',
        label: '【罗汉堂脉】三更寒雾布网 · 龙爪手活捉大辽谍探',
        badge: '碎碑擒龙',
        subtitle: '三策收网擒耶律青影 · 撕甲扣脉保舆图',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_Q07_QUEST_ID, 'midnight_spy_trap'),
        effects: [
          { type: 'setFlag', flag: 'sl_q07_trap_triggered', value: true },
          openScene('scene_slq07_05_net', SHAOLIN_Q07_QUEST_ID),
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
        label: '请益玄痛玄石师伯 · 研习《龙爪手》并勘察辽谍踪迹',
        badge: '演爪辨谍',
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
          openScene('scene_slq07_02', SHAOLIN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'act_slq07_trap_npc',
        label: '启禀师伯 · 三更入寒雾收网擒拿辽谍',
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
          openScene('scene_slq07_05_net', SHAOLIN_Q07_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanDragonClawQuest.scenes').then((m) => m.SCENES),
  },
]
