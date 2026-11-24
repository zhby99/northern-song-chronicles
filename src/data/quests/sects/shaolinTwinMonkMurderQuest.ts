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
    '嵩山少林寺 Lv.4 核心主线（全二十六幕）。须跻身少林四阶高僧/护法、完成前置主线（QST-SECT-01-33）、入寺满 750 日且经义 ≥ 85。玄悲大师赴洛阳白马寺议事竟惨死于少林绝技「大韦陀杵」下，继而玄苦大师亦于嵩山罗汉堂遭刚猛异掌重创圆寂！你与北乔峰同验遗体、于东庑武库联手击退灭口嫁祸的暗影死士，终在大雄宝殿烛影之下辨出两股截然不同的三十年暗影掌力。',
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
    '{reignYear}深秋，少室山连日阴霾不散。赴洛阳【白马寺】议事的少林高僧【玄悲】忽遭横祸，竟惨死于本门绝技「大韦陀杵」反噬之下！你奉【玄慈】方丈之命星夜赶赴白马寺查验，恰逢闻讯追查江湖血案的【乔峰】同至，二人细察伤痕皆觉杀机诡谲。未及回山，嵩山急羽又至——乔峰恩师【玄苦】大师在【罗汉堂】遭神秘强敌以刚猛无匹的掌力暗算，弥留之际仅吐露片言便溘然圆寂！东庑武库外黑影骤现，欲行灭口并嫁祸乔峰，你与乔峰并肩血战击溃暗影死士。是夜大雄正殿烛火摇曳，你与乔峰、玄慈同验二僧遗伤，终辨出两股截然不同的三十年暗影掌力：一为姑苏慕容「以彼之道、还施彼身」，一为契丹草原撼山巨掌，幕后黑手并非一人！',
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
      title: '东庑截杀 · 并肩破影',
      objective:
        '玄苦大师圆寂未寒，暗处竟伏有神秘死士企图灭口并嫁祸乔峰！请速赴【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，与乔峰并肩迎战暗影死士！',
      nextHint:
        '前往【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，点击「与乔峰并肩截杀灭口暗影死士」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
      },
    },
    candle_forensics: {
      id: 'candle_forensics',
      title: '烛下辨掌 · 双影初现',
      objective:
        '暗影死士已被击溃！请随乔峰前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，于烛火之下同玄慈方丈细辨玄悲、玄苦两位高僧的致命掌力。',
      nextHint:
        '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「大雄正殿烛下验伤 · 辨析两股三十年暗影掌力」。',
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
      effects: [openScene('scene_slq34_05', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_luohan',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      onceFlag: 'sl_q34_luohan_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'shaolin_xuanku'),
      effects: [openScene('scene_slq34_11', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_ambush',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      onceFlag: 'sl_q34_ambush_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'shadow_ambush'),
      effects: [openScene('scene_slq34_17', SHAOLIN_Q34_QUEST_ID)],
    },
    {
      id: 'trig_slq34_forensics',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q34_forensics_triggered',
      condition: atStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
      effects: [openScene('scene_slq34_21', SHAOLIN_Q34_QUEST_ID)],
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
      subtitle: '第五幕 · 白马大佛宝殿验伤，追索「大韦陀杵」反噬之谜',
      tone: 'danger',
      regionId: 'luoyang',
      buildingId: 'ly_baimasi',
      spotId: 'ly_bm_main',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'luoyang_xuanbei'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_baimasi_triggered', value: true },
        openScene('scene_slq34_05', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_luohan',
      label: '【大智大悲】驰援罗汉堂演武正殿 · 见玄苦大师最后一面',
      badge: '罗汉临终',
      subtitle: '第十一幕 · 玄苦大师弥留遗言，契丹巨掌遗恨嵩山',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'shaolin_xuanku'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_luohan_triggered', value: true },
        openScene('scene_slq34_11', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_ambush',
      label: '【大智大悲】与乔峰并肩截杀灭口暗影死士',
      badge: '东庑破影',
      subtitle: '第十七幕 · 击溃企图灭口嫁祸的宗师下品暗影死士',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_west',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'shadow_ambush'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_ambush_triggered', value: true },
        openScene('scene_slq34_17', SHAOLIN_Q34_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq34_forensics',
      label: '【大智大悲】大雄正殿烛下验伤 · 辨析两股三十年暗影掌力',
      badge: '烛下辨掌',
      subtitle: '第二十一幕 · 抽丝剥茧，洞悉慕容与契丹双影迷局',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
      effects: [
        { type: 'setFlag', flag: 'sl_q34_forensics_triggered', value: true },
        openScene('scene_slq34_21', SHAOLIN_Q34_QUEST_ID),
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
      label: '于大雄正殿烛下向玄慈方丈呈报二僧验伤结果',
      badge: '烛下辨掌',
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
        openScene('scene_slq34_21', SHAOLIN_Q34_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinTwinMonkMurderQuest.scenes').then((m) => m.SHAOLIN_Q34_SCENES),
}
