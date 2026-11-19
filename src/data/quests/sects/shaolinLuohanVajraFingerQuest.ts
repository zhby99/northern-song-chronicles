import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q23_QUEST_ID = 'QST-SECT-01-23'

export const SHAOLIN_Q23_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-22', 'completed'),
    qStatus(SHAOLIN_Q23_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 3650 },
    { type: 'skillAtLeast', key: '经义', min: 76 },
    { type: 'skillAtLeast', key: '书', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q23_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q23_QUEST_ID,
    title: '金刚怒目 · 碎石成粉',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（塞外黑教炼体狂人 · 铁尸尊者）',
    recommendedNote:
      '嵩山少林寺罗汉堂真传单脉终章（全二十二幕）。须完成《枯木生烟 · 玄苦授刀》、入寺满 3650 日且经义 ≥ 76、书 ≥ 60。于十八铜人木桩廊得玄痛与玄苦合授少林至刚指法《大力金刚指》；适逢塞外黑教炼体狂人「铁尸尊者」血洗巩县石窟佛像并劫持满窟石匠，你奉命下山驰援，于千佛洞前硬撼其横练金身，一指点穿乌金护心铜镜，救下满窟无辜石匠！',
    startHint:
      '完成《枯木生烟 · 玄苦授刀》、入寺满 3650 日且经义 ≥ 76、书 ≥ 60 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】（或寻玄痛）求学《大力金刚指》。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_east',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
    },
    startCondition: SHAOLIN_Q23_START_CONDITION,
    summary:
      '{reignYear}入寺十载春秋，你在罗汉堂苦修禅武已臻一流中品之境。戒律铁掌禅师【玄痛】与【玄苦】于【十八铜人木桩廊】联手为你点破指劲凝于一线之奥义，合授少林七十二绝技中破甲摧坚第一的《大力金刚指》。适逢巩县石窟寺急报：塞外黑教炼体狂人【铁尸尊者】身披乌金护心铜镜、横练铁布衫大成，率众邪徒闯入北魏石窟毁佛伤民、挟持数十名修佛石匠！你奉命疾驰巩县石窟，直面铁尸尊者狂暴铁掌，以新悟《大力金刚指》凝劲破防，一指点穿乌金护心铜镜，重创狂人、救下满窟石匠，扬威中州！',
    initialStepId: 'gongxian_grotto_rescue',
    steps: {
      gongxian_grotto_rescue: {
        id: 'gongxian_grotto_rescue',
        title: '驰援巩县 · 破镜伏魔',
        objective:
          '你已于十八铜人木桩廊领悟《大力金刚指》凝劲破坚之法。塞外黑教炼体狂人【铁尸尊者】正在巩县石窟毁佛劫匠，请即刻自【十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】动身驰援，击败铁尸尊者救下满窟石匠！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】点击「驰援巩县石窟 · 以大力金刚指迎战铁尸尊者」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_east',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
        },
      },
      return_luohan_east: {
        id: 'return_luohan_east',
        title: '石窟功成 · 返堂复命',
        objective:
          '你已一指点穿乌金护心铜镜、击溃铁尸尊者并救下巩县石窟满窟石匠！请返回【十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】向玄痛师伯复命，圆满收束罗汉堂真传单脉！',
        nextHint:
          '返回【嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】（或寻玄痛），点击「向玄痛师伯复命 · 圆满印证《大力金刚指》」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_east',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 十八铜人木桩廊',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq23_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q23_start_triggered',
        condition: SHAOLIN_Q23_START_CONDITION,
        effects: [openScene('scene_slq23_01', SHAOLIN_Q23_QUEST_ID)],
      },
      {
        id: 'trig_slq23_rescue_east',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q23_rescue_triggered',
        condition: atStep(SHAOLIN_Q23_QUEST_ID, 'gongxian_grotto_rescue'),
        effects: [openScene('scene_slq23_09', SHAOLIN_Q23_QUEST_ID)],
      },
      {
        id: 'trig_slq23_report_east',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        onceFlag: 'sl_q23_report_triggered',
        condition: atStep(SHAOLIN_Q23_QUEST_ID, 'return_luohan_east'),
        effects: [openScene('scene_slq23_20', SHAOLIN_Q23_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq23_start_east',
        label: '【罗汉终章】赴十八铜人木桩廊 · 求学《大力金刚指》',
        badge: '金刚怒目',
        subtitle: '罗汉堂真传单脉终章 · 十八铜人木桩廊',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: SHAOLIN_Q23_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q23_start_triggered', value: true },
          openScene('scene_slq23_01', SHAOLIN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq23_rescue_east',
        label: '【驰援石窟】下山疾驰巩县石窟 · 迎战铁尸尊者救石匠',
        badge: '破镜伏魔',
        subtitle: '巩县石窟实战 · 力战黑教狂人铁尸尊者（一流中品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: atStep(SHAOLIN_Q23_QUEST_ID, 'gongxian_grotto_rescue'),
        effects: [
          { type: 'setFlag', flag: 'sl_q23_rescue_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_grotto_reached', op: 'truthy' },
            thenEffects: [openScene('scene_slq23_14', SHAOLIN_Q23_QUEST_ID)],
            elseEffects: [openScene('scene_slq23_09', SHAOLIN_Q23_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq23_report_east',
        label: '【罗汉复命】向玄痛师伯禀报石窟伏魔 · 圆满《大力金刚指》',
        badge: '碎石成粉',
        subtitle: '十八铜人木桩廊复命 · 习得《大力金刚指》',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_east',
        visibleWhen: atStep(SHAOLIN_Q23_QUEST_ID, 'return_luohan_east'),
        effects: [
          { type: 'setFlag', flag: 'sl_q23_report_triggered', value: true },
          openScene('scene_slq23_20', SHAOLIN_Q23_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq23_start_npc',
        label: '合十请益 · 恳请玄痛师伯授以罗汉堂《大力金刚指》',
        badge: '金刚怒目',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
            SHAOLIN_Q23_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q23_start_triggered', value: true },
          openScene('scene_slq23_01', SHAOLIN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'act_slq23_rescue_npc',
        label: '禀明玄痛师伯 · 即刻驰援巩县石窟力战铁尸尊者',
        badge: '破镜伏魔',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
            atStep(SHAOLIN_Q23_QUEST_ID, 'gongxian_grotto_rescue'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q23_rescue_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_grotto_reached', op: 'truthy' },
            thenEffects: [openScene('scene_slq23_14', SHAOLIN_Q23_QUEST_ID)],
            elseEffects: [openScene('scene_slq23_09', SHAOLIN_Q23_QUEST_ID)],
          },
        ],
      },
      {
        id: 'act_slq23_report_npc',
        label: '向玄痛师伯复命 · 禀报破镜伏魔救出满窟石匠',
        badge: '碎石成粉',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
            atStep(SHAOLIN_Q23_QUEST_ID, 'return_luohan_east'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q23_report_triggered', value: true },
          openScene('scene_slq23_20', SHAOLIN_Q23_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanVajraFingerQuest.scenes').then((m) => m.SCENES),
  },
]
