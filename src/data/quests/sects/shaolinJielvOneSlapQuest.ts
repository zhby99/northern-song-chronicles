import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q14_QUEST_ID = 'QST-SECT-01-14'

export const SHAOLIN_Q14_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-13', 'completed'),
    qStatus(SHAOLIN_Q14_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 730 },
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '书', min: 35 },
    { type: 'skillAtLeast', key: '辩才', min: 30 },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
    { type: 'npcAlive', npcId: 'NPC-0378', npcName: '慧禅' },
  ],
}

export const SHAOLIN_Q14_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q14_QUEST_ID,
    title: '一拍两散 · 汴京缉凶',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品（西夏黑道悍匪 · 铁罗汉严横）',
    recommendedNote:
      '嵩山少林寺 Lv.2 戒律药王脉第二回核心任务链（全二十幕）。入寺满二载、完成《钟鼓执杖 · 清规如铁》且经义 ≥ 55、书 ≥ 35、辩才 ≥ 30 后，于钟鼓禅院接获汴京血案急报：城内连死三名富绅，凶手竟留佛珠嫁祸少林！随玄寂驰赴开封大相国寺资圣八角琉璃宝塔会见慧禅，于塔顶亲受地阶绝学《一拍两散掌》，子夜甜水巷屋脊硬撼西夏黑道悍匪「铁罗汉」严横，一掌震碎其横练铁臂擒拿洗冤。',
    startHint:
      '入寺满 730 日、完成《钟鼓执杖 · 清规如铁》且经义 ≥ 55、书 ≥ 35、辩才 ≥ 30 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】拜见玄寂即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    },
    startCondition: SHAOLIN_Q14_START_CONDITION,
    summary:
      '{reignYear}冬初，东京开封府连发三起灭门血案，三名巨绅皆亡于刚猛掌力，现场竟遗落伪造少林佛珠嫁祸祖庭！你奉戒律院主【玄寂】之命星夜随行东赴汴京，于【大相国寺 · 资圣八角琉璃宝塔】会合禅武僧【慧禅】，凭笔墨与验尸推演锁定凶手乃西夏黑道悍匪「铁罗汉」【严横】。宝塔顶层寒风凛冽，玄寂亲传地阶绝学《一拍两散掌》以破其横练铁功。子夜时分，你孤身截击严横于甜水巷屋脊之上，硬撼铁臂，终以一拍两散掌震碎其护体硬功生擒归案，洗刷少林蒙冤！',
    initialStepId: 'bianliang_zisheng_hunt',
    steps: {
      bianliang_zisheng_hunt: {
        id: 'bianliang_zisheng_hunt',
        title: '资圣宝塔 · 习掌缉凶',
        objective:
          '汴京连发富绅血案嫁祸少林！请前往【开封府 · 大相国寺 · 资圣八角琉璃宝塔（bl_xg_pagoda）】与玄寂长老、慧禅师兄汇合，查明真凶并习得《一拍两散掌》，子夜赴甜水巷屋脊生擒「铁罗汉」严横！',
        nextHint:
          '前往【开封府 · 大相国寺 · 资圣八角琉璃宝塔（bl_xg_pagoda）】点击「登资圣宝塔 · 会慧禅习《一拍两散掌》缉凶」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq14_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q14_start_triggered',
        condition: SHAOLIN_Q14_START_CONDITION,
        effects: [openScene('scene_slq14_01', SHAOLIN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_slq14_pagoda_arrive',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        onceFlag: 'sl_q14_pagoda_triggered',
        condition: atStep(SHAOLIN_Q14_QUEST_ID, 'bianliang_zisheng_hunt'),
        effects: [openScene('scene_slq14_03', SHAOLIN_Q14_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq14_start_west',
        label: '【戒律院】汴京血案急报 · 随玄寂东赴开封洗冤',
        badge: '汴京缉凶',
        subtitle: '第一幕 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_Q14_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q14_start_triggered', value: true },
          openScene('scene_slq14_01', SHAOLIN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq14_pagoda_hunt',
        label: '【汴京缉凶】登资圣八角琉璃宝塔 · 会慧禅习《一拍两散掌》',
        badge: '一拍两散',
        subtitle: '资圣宝塔顶层传功 · 甜水巷屋脊生擒严横',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(SHAOLIN_Q14_QUEST_ID, 'bianliang_zisheng_hunt'),
        effects: [
          { type: 'setFlag', flag: 'sl_q14_pagoda_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q14_taught_palm', op: 'truthy' },
            thenEffects: [openScene('scene_slq14_11', SHAOLIN_Q14_QUEST_ID)],
            elseEffects: [openScene('scene_slq14_03', SHAOLIN_Q14_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq14_start_npc',
        label: '听取玄寂师伯密谕 · 赴汴京查办富绅血案',
        badge: '汴京缉凶',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            SHAOLIN_Q14_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q14_start_triggered', value: true },
          openScene('scene_slq14_01', SHAOLIN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'act_slq14_pagoda_npc',
        label: '与慧禅师兄核对卷宗 · 续行汴京甜水巷缉凶',
        badge: '一拍两散',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0378', 'NPC-0134'] },
            atStep(SHAOLIN_Q14_QUEST_ID, 'bianliang_zisheng_hunt'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q14_pagoda_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q14_taught_palm', op: 'truthy' },
            thenEffects: [openScene('scene_slq14_11', SHAOLIN_Q14_QUEST_ID)],
            elseEffects: [openScene('scene_slq14_03', SHAOLIN_Q14_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvOneSlapQuest.scenes').then((m) => m.SCENES),
  },
]
