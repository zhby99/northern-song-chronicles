import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q36_QUEST_ID = 'QST-SECT-01-36'

export const SHAOLIN_Q36_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus('QST-SECT-01-35', 'completed'),
    qStatus(SHAOLIN_Q36_QUEST_ID, 'not_started'),
    { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman', label: '已剃度出家为少林僧侣' },
    { type: 'flag', flag: 'sl_pavilion', op: 'eq', value: 'compassion', label: '慈悲禅院脉传人' },
    { type: 'skillAtLeast', key: '经义', min: 90 },
    { type: 'skillAtLeast', key: '书', min: 75 },
    { type: 'combatStatAtLeast', key: 'res', min: 65 },
    { type: 'npcAlive', npcId: 'NPC-0109', npcName: '玄澄' },
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
  ],
}

export const shaolinXisuiAwakenQuest: QuestDefinition = {
  id: SHAOLIN_Q36_QUEST_ID,
  title: '寒玉百日 · 洗髓换骨',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品',
  maxOpponentRealm: '宗师中品（吐蕃国师 · 鸠摩智）',
  recommendedNote:
    '嵩山少林寺 Lv.4 慈悲禅院脉天阶神功觉醒线（全三十幕）。须已剃度出家且为慈悲禅院脉传人、完成《少室群雄 · 方丈丑闻》、经义 ≥ 90、书 ≥ 75、抗性 ≥ 65。幽谷石室寒玉榻前，神僧玄澄老泪纵横，亲将天阶圣物「少林舍利伽蓝念珠」挂于你颈间并开启达摩石壁洗髓真传；你于达摩洞百日心斋禅定洗尽凡髓悟透《洗髓经》，重返大雄宝殿山坪一眼识破鸠摩智以小无相功催动七十二绝技之虚妄根底，二十合震得大轮明王吐血退败！',
  startHint:
    '完成《少室群雄 · 方丈丑闻》且为慈悲禅院出家传人、经义 ≥ 90、书 ≥ 75、抗性 ≥ 65 后，前往【嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻】面见玄澄师伯即可开启。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_damo',
    spotId: 'sl_damo_main',
    customLabel: '嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻',
  },
  startCondition: SHAOLIN_Q36_START_CONDITION,
  summary:
    '{reignYear}秋，少室山丑闻爆发后古刹清誉摇摇欲坠，吐蕃国师【鸠摩智】仍踞山坪虎视眈眈。幽谷石室寒玉榻前，神僧【玄澄】老泪纵横，追忆昔年误入武学障之痛，亲手将少林镇寺天阶圣物「少林舍利伽蓝念珠」挂于你颈间，并为你开启达摩面壁石壁后的洗髓真传！你于【绝壁石刻 · 剑痕崖】辨读古梵石刻，展开百日心斋禅定，以大慈大悲佛法化去周身浊气，洗尽凡髓、破境悟透天阶至宝《洗髓经》！出关重返【钟鼓禅院 · 演武坪】，你以无垢禅心一眼识破鸠摩智不过是以道家《小无相功》强催七十二绝技的虚妄根底，二十合佛门至纯真气震碎其护体罡气，逼得大轮明王口吐鲜血、狼狈退败！',
  initialStepId: 'hundred_day_zen',
  steps: {
    hundred_day_zen: {
      id: 'hundred_day_zen',
      title: '达摩石壁 · 百日心斋',
      objective:
        '玄澄师伯已将少林舍利伽蓝念珠相授，并为你指明达摩石壁后的洗髓真传所在！请前往【达摩面壁石洞 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，校勘古梵秘篆，展开百日心斋禅定悟透《洗髓经》！',
      nextHint:
        '前往【达摩面壁石洞 · 绝壁石刻 · 剑痕崖（sl_damo_east）】，点击「参悟达摩石壁古梵秘篆 · 百日心斋禅定洗髓换骨」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        customLabel: '嵩山少林寺 · 达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
      },
    },
    break_jiumozhi: {
      id: 'break_jiumozhi',
      title: '山坪破妄 · 震退大轮明王',
      objective:
        '百日心斋功成，《洗髓经》已彻悟于心！请重返【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，当着天下群雄拆穿鸠摩智小无相功虚妄根底，二十合将其击退！',
      nextHint:
        '前往【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「以《洗髓经》破妄识真 · 二十合决战大轮明王鸠摩智」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_slq36_start',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_main',
      onceFlag: 'sl_q36_start_triggered',
      condition: SHAOLIN_Q36_START_CONDITION,
      effects: [openScene('scene_slq36_01', SHAOLIN_Q36_QUEST_ID)],
    },
    {
      id: 'trig_slq36_zen',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      onceFlag: 'sl_q36_zen_triggered',
      condition: atStep(SHAOLIN_Q36_QUEST_ID, 'hundred_day_zen'),
      effects: [openScene('scene_slq36_09', SHAOLIN_Q36_QUEST_ID)],
    },
    {
      id: 'trig_slq36_jiumozhi',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q36_jiumozhi_triggered',
      condition: atStep(SHAOLIN_Q36_QUEST_ID, 'break_jiumozhi'),
      effects: [openScene('scene_slq36_20', SHAOLIN_Q36_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq36_start',
      label: '【慈悲禅院 · 洗髓觉醒】面见寒玉榻前玄澄师伯 · 受赐舍利念珠',
      badge: '寒玉百日',
      subtitle: '幽谷石室寒玉榻 · 开启少林天阶《洗髓经》真传',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_main',
      visibleWhen: SHAOLIN_Q36_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q36_start_triggered', value: true },
        openScene('scene_slq36_01', SHAOLIN_Q36_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq36_zen',
      label: '【洗髓换骨】参悟达摩石壁古梵秘篆 · 百日心斋禅定',
      badge: '百日心斋',
      subtitle: '第九幕 · 借舍利念珠定心，洗尽凡髓悟透《洗髓经》',
      tone: 'jade',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      visibleWhen: atStep(SHAOLIN_Q36_QUEST_ID, 'hundred_day_zen'),
      effects: [
        { type: 'setFlag', flag: 'sl_q36_zen_triggered', value: true },
        openScene('scene_slq36_09', SHAOLIN_Q36_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq36_jiumozhi',
      label: '【洗髓换骨】以《洗髓经》破妄识真 · 二十合决战大轮明王鸠摩智',
      badge: '破妄震敌',
      subtitle: '第二十幕 · 识破小无相功虚妄根底，震退吐蕃国师',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q36_QUEST_ID, 'break_jiumozhi'),
      effects: [
        { type: 'setFlag', flag: 'sl_q36_jiumozhi_triggered', value: true },
        openScene('scene_slq36_20', SHAOLIN_Q36_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq36_start_xuancheng',
      label: '拜见玄澄师伯 · 承接舍利伽蓝念珠与达摩洗髓真传',
      badge: '寒玉百日',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [{ type: 'targetNpcMatch', npcIds: ['NPC-0109'] }, SHAOLIN_Q36_START_CONDITION],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q36_start_triggered', value: true },
        openScene('scene_slq36_01', SHAOLIN_Q36_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinXisuiAwakenQuest.scenes').then((m) => m.SHAOLIN_Q36_SCENES),
}
