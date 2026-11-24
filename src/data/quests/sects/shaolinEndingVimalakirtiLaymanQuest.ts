import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q40_QUEST_ID = 'QST-SECT-01-40'

export const SHAOLIN_Q40_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus('QST-SECT-01-37', 'completed'),
    qStatus(SHAOLIN_Q40_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'layman'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 900 },
    { type: 'skillAtLeast', key: '经义', min: 85 },
    { type: 'skillAtLeast', key: '策论', min: 65 },
    { type: 'skillAtLeast', key: '书', min: 75 },
    { type: 'skillAtLeast', key: '辩才', min: 65 },
    { type: 'renownAtLeast', min: 600 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0233', npcName: '叶二娘' },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
  ],
}

export const shaolinEndingVimalakirtiLaymanQuest: QuestDefinition = {
  id: SHAOLIN_Q40_QUEST_ID,
  title: '不着袈裟 · 维摩护法',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师中品（大辽暗院使 · 耶律赤鹰 / 西夏黑莲客 · 拓跋冥）',
  recommendedNote:
    '嵩山少林寺终局抉择之三【白衣大居士线 · 俗家护法专属】（精炼十四幕史诗）。须为俗家护法弟子（sl_branch == layman）、入寺满 900 日、完成前序铁腕抉择《QST-SECT-01-37》、经义 ≥ 85、策论 ≥ 65、书 ≥ 75、辩才 ≥ 65、威望 ≥ 600。你一袭白衣长发立于佛前，于大雄正殿引《维摩诘经》禅辩破执震醒满寺高僧并力退窥伺山门的辽夏邪客；玄慈愧赠《少林达摩袈裟》含笑圆寂；你推玄难大师主掌早课清修，己以白衣大居士总摄少林僧兵与大相国寺、白马寺、莆田南少林天下同盟！',
  startHint:
    '俗家护法弟子完成《QST-SECT-01-37》、入寺满 900 日且经义 ≥ 85、策论 ≥ 65、书 ≥ 75、辩才 ≥ 65、威望 ≥ 600 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】即可触发终局。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_main',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
  },
  startCondition: SHAOLIN_Q40_START_CONDITION,
  summary:
    '{reignYear}深秋，少林旧案轰动天下，四十八房高僧因「剃度与俗家之别」争执不休。你一袭素白长衫、满头青丝立于【大雄正殿】佛前，引《维摩诘经》无上禅机当堂禅辩震醒满寺宿老！恰在此时，潜伏嵩山的大辽暗院使【耶律赤鹰】与西夏黑莲客【拓跋冥】趁乱夜窥山门，企图借少林内讧动摇中原佛门。你白衣出阵，于钟鼓禅院演武坪力挫辽夏双雄，保得山门毫发无伤！战后，【玄慈】方丈自感半生执着相表、终误禅心，亲手将天阶圣衣【少林达摩袈裟】愧赠于你后含笑圆寂，【叶二娘】亦随行殉情。你既不恋方丈虚名，亦不削发易服，而是推举德高望重的【玄难】大师主掌早课清修，自己则以【白衣大居士】之尊执掌同盟大印、颁定同盟纲领，总摄嵩山少林僧兵与汴京大相国寺、洛阳白马寺、莆田南少林天下佛门同盟！',
  initialStepId: 'vimalakirti_debate',
  steps: {
    vimalakirti_debate: {
      id: 'vimalakirti_debate',
      title: '白衣立殿 · 维摩禅辩',
      objective:
        '请以白衣长发之身步入【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，以禅辩驳倒守旧宿老、破除剃度相执！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「白衣立于佛前 · 引《维摩诘经》震醒满寺高僧」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    repel_liao_xixia: {
      id: 'repel_liao_xixia',
      title: '钟院逐虏 · 力退辽夏',
      objective:
        '大辽暗院使耶律赤鹰与西夏黑莲客拓跋冥趁少林议事之际潜入【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】窥伺山门！速以白衣护法之威迎战辽夏邪客！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「白衣出阵 · 力退大辽暗院使与西夏黑莲客」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
    kasaya_farewell: {
      id: 'kasaya_farewell',
      title: '愧赠袈裟 · 尘缘落定',
      objective:
        '辽夏邪客已被尽数逐出少室山！请速返【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，见玄慈方丈最后一面！',
      nextHint:
        '返回【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「回返大雄正殿 · 受玄慈方丈愧赠达摩袈裟」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    alliance_command: {
      id: 'alliance_command',
      title: '维摩护法 · 天下同盟',
      objective:
        '大相国寺、白马寺与莆田南少林使者已齐聚【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，请推玄难主掌清修，己以白衣大居士受印立纲、总摄天下佛门同盟！',
      nextHint:
        '在【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】点击「执掌同盟大印 · 以白衣大居士总摄少林与天下佛门」。',
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
      id: 'trig_slq40_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q40_start_triggered',
      condition: SHAOLIN_Q40_START_CONDITION,
      effects: [openScene('scene_slq40_01', SHAOLIN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_slq40_debate',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q40_debate_triggered',
      condition: atStep(SHAOLIN_Q40_QUEST_ID, 'vimalakirti_debate'),
      effects: [openScene('scene_slq40_02', SHAOLIN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_slq40_repel',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q40_repel_triggered',
      condition: atStep(SHAOLIN_Q40_QUEST_ID, 'repel_liao_xixia'),
      effects: [openScene('scene_slq40_05', SHAOLIN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_slq40_farewell',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q40_farewell_triggered',
      condition: atStep(SHAOLIN_Q40_QUEST_ID, 'kasaya_farewell'),
      effects: [openScene('scene_slq40_07', SHAOLIN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_slq40_alliance',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q40_alliance_triggered',
      condition: atStep(SHAOLIN_Q40_QUEST_ID, 'alliance_command'),
      effects: [openScene('scene_slq40_11', SHAOLIN_Q40_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq40_start',
      label: '【少林终局 · 白衣大居士】赴大雄正殿 · 以维摩禅心破局立盟',
      badge: '维摩护法',
      subtitle: '少林终局线三（俗家专属） · 不着袈裟，总摄天下佛门同盟',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: SHAOLIN_Q40_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q40_start_triggered', value: true },
        openScene('scene_slq40_01', SHAOLIN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq40_debate',
      label: '【维摩护法】白衣立于佛前 · 引《维摩诘经》震醒满寺高僧',
      badge: '维摩禅辩',
      subtitle: '无提示大殿禅辩，破除千年剃度相表之执',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q40_QUEST_ID, 'vimalakirti_debate'),
      effects: [
        { type: 'setFlag', flag: 'sl_q40_debate_triggered', value: true },
        openScene('scene_slq40_02', SHAOLIN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq40_repel',
      label: '【维摩护法】白衣出阵 · 力退大辽暗院使与西夏黑莲客',
      badge: '钟院逐虏',
      subtitle: '三寺暗哨合围断敌退路或白衣车轮独战双使',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q40_QUEST_ID, 'repel_liao_xixia'),
      effects: [
        { type: 'setFlag', flag: 'sl_q40_repel_triggered', value: true },
        openScene('scene_slq40_05', SHAOLIN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq40_farewell',
      label: '【维摩护法】回返大雄正殿 · 受玄慈方丈愧赠达摩袈裟',
      badge: '愧赠袈裟',
      subtitle: '玄慈含笑圆寂，叶二娘殉情随去',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q40_QUEST_ID, 'kasaya_farewell'),
      effects: [
        { type: 'setFlag', flag: 'sl_q40_farewell_triggered', value: true },
        openScene('scene_slq40_07', SHAOLIN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq40_alliance',
      label: '【维摩护法】执掌同盟大印 · 以白衣大居士总摄少林与天下佛门',
      badge: '天下同盟',
      subtitle: '推玄难主掌清修，定同盟纲领晋升少林 Lv.5',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q40_QUEST_ID, 'alliance_command'),
      effects: [
        { type: 'setFlag', flag: 'sl_q40_alliance_triggered', value: true },
        openScene('scene_slq40_11', SHAOLIN_Q40_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq40_xuannan_start',
      label: '与玄难大师论《维摩诘经》 · 启白衣护法终局',
      badge: '维摩护法',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
          SHAOLIN_Q40_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q40_start_triggered', value: true },
        openScene('scene_slq40_01', SHAOLIN_Q40_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinEndingVimalakirtiLaymanQuest.scenes').then((m) => m.SHAOLIN_Q40_SCENES),
}

export const SHAOLIN_Q40_QUESTS: QuestDefinition[] = [shaolinEndingVimalakirtiLaymanQuest]
