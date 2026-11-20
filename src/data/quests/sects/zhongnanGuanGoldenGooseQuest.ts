import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q05_QUEST_ID = 'QST-SECT-11-05'

export const ZHONGNAN_Q05_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-04', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q05_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1057', npcName: '王处阳' },
  ],
}

export const ZHONGNAN_Q05_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q05_QUEST_ID,
    title: '太白金雁 · 绝壁凌虚',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '二流下品',
    maxOpponentRealm: '二流下品（西夏一品堂游骑刀客二人）',
    recommendedNote:
      '十八幕重阳古观轻功真传与绝壁救险：于终南后山寒玉涧【银练飞瀑清泉石茗案】拜见玉阳子王处阳，于悬崖飞瀑间悟得全真上乘轻功《金雁功》；忽见崖下山道两名西夏刀客正追杀负伤的大宋边军斥候，你施展金雁功凌空下崖，以一对二斩杀西夏刀客，夺回秦州急报！',
    startHint:
      '完成《北斗璇玑 · 三才归元》后，前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案】（或寻王处阳）请教绝壁轻功。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    },
    startCondition: ZHONGNAN_Q05_START_CONDITION,
    summary:
      '{reignYear}盛夏，银练飞瀑水声如雷。玉阳子【王处阳】于绝壁青松间负手而立，以秦岭飞雁御风而行之姿，向你亲授全真上乘轻功《金雁功》。方才演练至悬崖折返之际，忽见山涧峭壁下尘烟滚滚——一名身负重伤的大宋边军斥候正被两名西夏刀客紧追不舍！你当机立断，踏出金雁凌虚步法凌空直下绝壁，截住两名西夏刀客车轮连战尽数斩杀，救下宋军斥候并获知西夏密谋刺杀关中学者与袭扰秦州茶马司的惊天军情！',
    initialStepId: 'cliff_rescue_scout',
    steps: {
      cliff_rescue_scout: {
        id: 'cliff_rescue_scout',
        title: '绝壁凌虚 · 斩夏救斥候',
        objective:
          '已习得《金雁功》！崖下山道有西夏刀客追杀宋军斥候，请即刻自【银练飞瀑清泉石茗案】凌空下崖，一对二斩杀西夏刀客救下斥候！',
        nextHint: '在【银练飞瀑清泉石茗案（zn_st_falls）】凌空下崖迎战西夏刀客。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_falls',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q05_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        onceFlag: 'zn_q05_start_triggered',
        condition: ZHONGNAN_Q05_START_CONDITION,
        effects: [openScene('scene_zn_q05_01', ZHONGNAN_Q05_QUEST_ID)],
      },
      {
        id: 'trig_zn_q05_rescue',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        onceFlag: 'zn_q05_rescue_triggered',
        condition: atStep(ZHONGNAN_Q05_QUEST_ID, 'cliff_rescue_scout'),
        effects: [openScene('scene_zn_q05_09', ZHONGNAN_Q05_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q05_start',
        label: '【绝壁问道】拜见王处阳 · 参悟全真轻功《金雁功》',
        badge: '太白金雁',
        subtitle: '第一幕 · 银练飞瀑清泉石茗案',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        visibleWhen: ZHONGNAN_Q05_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q05_start_triggered', value: true },
          openScene('scene_zn_q05_01', ZHONGNAN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q05_rescue',
        label: '【凌空下崖】施展金雁功截杀西夏刀客 · 营救宋军斥候',
        badge: '绝壁救险',
        subtitle: '第九幕 · 银练飞瀑悬崖谷道',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        visibleWhen: atStep(ZHONGNAN_Q05_QUEST_ID, 'cliff_rescue_scout'),
        effects: [
          { type: 'setFlag', flag: 'zn_q05_rescue_triggered', value: true },
          openScene('scene_zn_q05_09', ZHONGNAN_Q05_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q05_start',
        label: '请玉阳子传授全真上乘轻功《金雁功》',
        badge: '太白金雁',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1057'] },
            ZHONGNAN_Q05_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q05_start_triggered', value: true },
          openScene('scene_zn_q05_01', ZHONGNAN_Q05_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanGuanGoldenGooseQuest.scenes').then((m) => m.SCENES),
  },
]
