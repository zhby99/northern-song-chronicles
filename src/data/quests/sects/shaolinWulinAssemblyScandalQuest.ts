import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q35_QUEST_ID = 'QST-SECT-01-35'

export const SHAOLIN_Q35_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus('QST-SECT-01-34', 'completed'),
    qStatus(SHAOLIN_Q35_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 780 },
    { type: 'skillAtLeast', key: '经义', min: 86 },
    { type: 'skillAtLeast', key: '辩才', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' },
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
    { type: 'npcAlive', npcId: 'NPC-0105', npcName: '萧远山' },
    { type: 'npcAlive', npcId: 'NPC-0233', npcName: '叶二娘' },
  ],
}

export const shaolinWulinAssemblyScandalQuest: QuestDefinition = {
  id: SHAOLIN_Q35_QUEST_ID,
  title: '少室群雄 · 方丈丑闻',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品',
  maxOpponentRealm: '宗师中品（星宿老怪 · 丁春秋［化功毒掌十合］）',
  recommendedNote:
    '嵩山少林寺 Lv.4 核心大戏（全十四幕）。须完成《大智大悲 · 身死之谜》、入寺满 780 日、经义 ≥ 86 且辩才 ≥ 60。数千群雄齐聚少室山坪，你先阵前辩折星宿老怪丁春秋、择策硬接十合化功毒掌；复登丹墀慧眼鉴伪拆穿大轮明王鸠摩智「小无相功催动七十二绝技」骗局；危急关头，黑衣萧远山掠下飞檐当众揭破玄慈与叶二娘二十四年前旧案，你须于天下群雄前作出立场抉择，力挽千年古刹狂澜！',
  startHint:
    '完成《大智大悲 · 身死之谜》、入寺满 780 日、经义 ≥ 86 且辩才 ≥ 60 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】（或拜见玄慈方丈）即可迎来少室山数千群雄大会。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_west',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
  },
  startCondition: SHAOLIN_Q35_START_CONDITION,
  summary:
    '{reignYear}孟秋，英雄帖传遍四海，数千中原豪杰、塞外魔头与西域高僧齐聚【嵩山少林寺】山坪，共赴百年未有之「少室群雄大会」！星宿老怪【丁春秋】率徒众吹打叫阵，你阵前折其嚣焰，复于万众瞩目下正面硬接十合「化功毒掌」不退半步！未及喘息，吐蕃国师大轮明王【鸠摩智】宝相庄严步上丹墀，连演拈花指、般若掌、燃木刀炫耀少林武功不过如此，你须当众慧眼鉴伪破其虚妄！正当群豪喧沸之际，黑衣孤影【萧远山】自大雄宝殿飞檐轰然掠下，掷出旧日襁褓，当众召四大恶人【叶二娘】对质揭破【玄慈】方丈二十四年前破戒生子惊天丑闻！满山哗然，你作为少林新晋长老挺身表态，力挽千年祖庭危局！',
  initialStepId: 'ding_poison_duel',
  steps: {
    ding_poison_duel: {
      id: 'ding_poison_duel',
      title: '阵前折魔 · 硬接十合毒掌',
      objective:
        '星宿老怪丁春秋率星宿派妖人公然在少室山坪叫阵羞辱少林！请立于【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，择定阵前策略硬接丁春秋十合化功毒掌！',
      nextHint:
        '在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】点击「阵前迎战星宿老怪丁春秋 · 硬接十合化功毒掌」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
    jiumozhi_provocation: {
      id: 'jiumozhi_provocation',
      title: '明王炫技 · 丹墀鉴伪',
      objective:
        '丁春秋毒掌受挫退去，吐蕃国师鸠摩智却步上丹墀，连演少林七十二绝技挑衅全寺！请速赴【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】拆穿大轮明王虚妄！',
      nextHint:
        '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「登丹墀直面大轮明王鸠摩智 · 应对七十二绝技挑衅」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    scandal_storm: {
      id: 'scandal_storm',
      title: '飞檐孤影 · 方丈丑闻惊天下',
      objective:
        '黑衣萧远山已自飞檐掠下丹墀！请守在【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，直面即将席卷千年古刹的惊天秘辛并稳住天下群雄！',
      nextHint:
        '在【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】点击「直面殿顶黑衣萧远山 · 见证少室山惊天丑闻」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_slq35_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q35_start_triggered',
      condition: SHAOLIN_Q35_START_CONDITION,
      effects: [openScene('scene_slq35_01', SHAOLIN_Q35_QUEST_ID)],
    },
    {
      id: 'trig_slq35_ding',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q35_ding_triggered',
      condition: atStep(SHAOLIN_Q35_QUEST_ID, 'ding_poison_duel'),
      effects: [openScene('scene_slq35_04', SHAOLIN_Q35_QUEST_ID)],
    },
    {
      id: 'trig_slq35_jiumozhi',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q35_jiumozhi_triggered',
      condition: atStep(SHAOLIN_Q35_QUEST_ID, 'jiumozhi_provocation'),
      effects: [openScene('scene_slq35_06', SHAOLIN_Q35_QUEST_ID)],
    },
    {
      id: 'trig_slq35_scandal',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q35_scandal_triggered',
      condition: atStep(SHAOLIN_Q35_QUEST_ID, 'scandal_storm'),
      effects: [openScene('scene_slq35_09', SHAOLIN_Q35_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq35_start',
      label: '【少林主线】少室群雄大会开幕 · 群豪齐聚山坪',
      badge: '少室群雄',
      subtitle: '钟鼓禅院演武坪 · 百年未有之天下武林风云',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: SHAOLIN_Q35_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q35_start_triggered', value: true },
        openScene('scene_slq35_01', SHAOLIN_Q35_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq35_ding',
      label: '【少室群雄】阵前迎战星宿老怪丁春秋 · 硬接十合化功毒掌',
      badge: '毒掌十合',
      subtitle: '第四幕 · 择定护僧或断毒之策，硬撼宗师中品化功毒掌',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q35_QUEST_ID, 'ding_poison_duel'),
      effects: [
        { type: 'setFlag', flag: 'sl_q35_ding_triggered', value: true },
        openScene('scene_slq35_04', SHAOLIN_Q35_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq35_jiumozhi',
      label: '【少室群雄】登丹墀直面大轮明王鸠摩智 · 应对七十二绝技挑衅',
      badge: '明王炫技',
      subtitle: '第六幕 · 吐蕃国师连演少林绝技，慧眼鉴伪破其虚妄',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q35_QUEST_ID, 'jiumozhi_provocation'),
      effects: [
        { type: 'setFlag', flag: 'sl_q35_jiumozhi_triggered', value: true },
        openScene('scene_slq35_06', SHAOLIN_Q35_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq35_scandal',
      label: '【少室群雄】直面殿顶黑衣萧远山 · 见证少室山惊天丑闻',
      badge: '方丈丑闻',
      subtitle: '第九幕 · 二十四年前秘辛当众揭破，于天下群雄前作出抉择',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q35_QUEST_ID, 'scandal_storm'),
      effects: [
        { type: 'setFlag', flag: 'sl_q35_scandal_triggered', value: true },
        openScene('scene_slq35_09', SHAOLIN_Q35_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq35_start_xuanci',
      label: '拜见玄慈方丈 · 筹备少室山数千群雄大会',
      badge: '少室群雄',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [{ type: 'targetNpcMatch', npcIds: ['NPC-0112'] }, SHAOLIN_Q35_START_CONDITION],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q35_start_triggered', value: true },
        openScene('scene_slq35_01', SHAOLIN_Q35_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinWulinAssemblyScandalQuest.scenes').then((m) => m.SHAOLIN_Q35_SCENES),
}
