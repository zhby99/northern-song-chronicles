import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q34_QUEST_ID = 'QST-SECT-01-34'

export const SHAOLIN_Q34_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus('QST-SECT-01-33', 'completed'),
    qStatus(SHAOLIN_Q34_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 750 },
    { type: 'skillAtLeast', key: '经义', min: 85 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    { type: 'npcAlive', npcId: 'NPC-0157', npcName: '玄悲' },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
  ],
}

export const shaolinTwinMonkMurderQuest: QuestDefinition = {
  id: SHAOLIN_Q34_QUEST_ID,
  title: '大智大悲 · 身死之谜',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师下品',
  maxOpponentRealm: '宗师下品（玄影死士首领 · 燕漠残锋）',
  recommendedNote:
    '嵩山少林寺 Lv.4 核心悬疑主线（全十三幕）。须跻身少林四阶高僧/护法、完成前置主线（QST-SECT-01-33）、入寺满 750 日且经义 ≥ 85。玄悲大师赴洛阳白马寺议事竟惨死于本门绝技「大韦陀杵」下，继而玄苦大师亦于嵩山罗汉堂遭疑似「燃木刀法」兼刚猛异掌重创圆寂！你将赴白马寺刑侦验伤、于罗汉堂送别玄苦、破东庑暗伏死士，并于大雄正殿孤烛之下亲断两桩奇案真凶！',
  startHint:
    '完成前置主线、入寺满 750 日且经义 ≥ 85 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】（或拜见玄慈方丈）即可接获洛阳白马寺急变之讯。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_main',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
  },
  startCondition: SHAOLIN_Q34_START_CONDITION,
  summary:
    '{reignYear}深秋，少室山霜钟骤鸣。赴洛阳【白马寺】议事的少林高僧【玄悲】惨死于自家绝技「大韦陀杵」反噬之下！你奉【玄慈】方丈之命星夜赶赴白马寺勘验，恰逢蒙冤追凶的北【乔峰】同至，共察伤痕端倪。未及回山，嵩山急羽又至——乔峰恩师【玄苦】大师在【罗汉堂】遭疑似「燃木刀法」兼塞外霸掌重创，弥留托孤后溘然圆寂！东庑武库暗伏死士欲行灭口栽赃，你临阵破伏击溃玄影死士首领燕漠残锋。子夜大雄正殿孤烛摇曳，你将二僧伤状并置细推，于重重迷雾中抽丝剥茧，揭开姑苏慕容「以彼之道还施彼身」与蛰伏藏经阁三十载绝世暗影的冰山一角！',
  initialStepId: 'luoyang_xuanbei',
  steps: {
    luoyang_xuanbei: {
      id: 'luoyang_xuanbei',
      title: '释源惨变 · 验伤白马',
      objective:
        '玄悲师叔赴洛阳白马寺议事忽传噩耗！请速赴【洛阳府 · 白马寺（释源祖庭） · 白马大佛宝殿（ly_bm_main）】查验现场与遗体。',
      nextHint:
        '前往【洛阳府 · 白马寺 · 白马大佛宝殿（ly_bm_main）】，点击「查验玄悲大师遇害现场 · 会合乔峰勘验掌伤」。',
      targetLocation: {
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        customLabel: '洛阳府 · 白马寺（释源祖庭） · 白马大佛宝殿',
      },
    },
    shaolin_xuanku: {
      id: 'shaolin_xuanku',
      title: '嵩山急变 · 罗汉临终',
      objective:
        '白马寺疑云未散，嵩山急报又至：罗汉堂惊现神秘强敌，玄苦大师危在旦夕！请立刻与乔峰驰返【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】！',
      nextHint:
        '速返【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】，点击「驰援罗汉堂演武正殿 · 见玄苦大师最后一面」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
      },
    },
    shadow_ambush: {
      id: 'shadow_ambush',
      title: '东庑截杀 · 破伏玄影',
      objective:
        '玄苦大师圆寂未寒，暗处竟伏有神秘死士企图焚毁卷宗、灭口栽赃乔峰！请速赴【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，迎战暗影死士！',
      nextHint:
        '前往【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，点击「截杀东庑暗影死士 · 迎战燕漠残锋」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
      },
    },
    candle_forensics: {
      id: 'candle_forensics',
      title: '孤烛验案 · 双影初现',
      objective:
        '暗影死士已被击溃！请携证物前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，于孤烛之下同玄慈方丈与乔峰并置双案伤状，推演真凶！',
      nextHint:
        '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「大雄正殿孤烛验双案 · 推理玄悲玄苦身死真相」。',
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
      id: 'trig_slq34_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q34_start_triggered',
      condition: SHAOLIN_Q34_START_CONDITION,
      effects: [openScene('scene_slq34_01', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_baimasi',
      regionId: 'luoyang',
      buildingId: 'ly_baimasi',
      spotId: 'ly_bm_main',
      onceFlag: 'sl_q34_baimasi_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'luoyang_xuanbei'),
      effects: [openScene('scene_slq34_03', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_luohan',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      onceFlag: 'sl_q34_luohan_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'shaolin_xuanku'),
      effects: [openScene('scene_slq34_06', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_ambush',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      onceFlag: 'sl_q34_ambush_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'shadow_ambush'),
      effects: [openScene('scene_slq34_08', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_forensics',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q34_forensics_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
      effects: [openScene('scene_slq34_10', SHAOLIN_Q34_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq34_start',
      label: '【少林主线】接获洛阳白马寺急报 · 玄悲大师遇害之谜',
      badge: '大智大悲',
      subtitle: '大雄正殿 · 追查少林高僧接连遇害真相',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: SHAOLIN_Q34_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q34_start_triggered', value: true },
        openScene('scene_slq34_01', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_baimasi',
      label: '【大智大悲】查验玄悲大师遇害现场 · 会合乔峰勘验掌伤',
      badge: '释源惨变',
      subtitle: '第三幕 · 白马大佛宝殿刑侦验伤，追索「大韦陀杵」反噬之谜',
      tone: 'danger',
      regionId: 'luoyang',
      buildingId: 'ly_baimasi',
      spotId: 'ly_bm_main',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'luoyang_xuanbei'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_baimasi_triggered', value: true },
        openScene('scene_slq34_03', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_luohan',
      label: '【大智大悲】驰援罗汉堂演武正殿 · 见玄苦大师最后一面',
      badge: '罗汉临终',
      subtitle: '第六幕 · 玄苦大师弥留遗言，遗恨嵩山',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'shaolin_xuanku'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_luohan_triggered', value: true },
        openScene('scene_slq34_06', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_ambush',
      label: '【大智大悲】截杀东庑暗影死士 · 迎战燕漠残锋',
      badge: '东庑破影',
      subtitle: '第八幕 · 识破伏击先手克敌或正面连破宗师下品暗影死士',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'shadow_ambush'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_ambush_triggered', value: true },
        openScene('scene_slq34_08', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_forensics',
      label: '【大智大悲】大雄正殿孤烛验双案 · 推理玄悲玄苦身死真相',
      badge: '孤烛验案',
      subtitle: '第十幕 · 并置两桩奇案伤状，洞悉慕容与藏经阁暗影迷局',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_forensics_triggered', value: true },
        openScene('scene_slq34_10', SHAOLIN_Q34_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq34_start_xuanci',
      label: '拜见玄慈方丈 · 闻听洛阳白马寺玄悲师叔噩耗',
      badge: '大智大悲',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [{ type: 'targetNpcMatch', npcIds: ['NPC-0112'] }, SHAOLIN_Q34_START_CONDITION],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q34_start_triggered', value: true },
        openScene('scene_slq34_01', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'act_slq34_forensics_xuanci',
      label: '于大雄正殿孤烛下向玄慈方丈呈报双案推演结果',
      badge: '孤烛验案',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
          atStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q34_forensics_triggered', value: true },
        openScene('scene_slq34_10', SHAOLIN_Q34_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinTwinMonkMurderQuest.scenes').then((m) => m.SHAOLIN_Q34_SCENES),
}
