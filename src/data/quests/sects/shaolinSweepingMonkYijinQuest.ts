import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q42_QUEST_ID = 'QST-SECT-01-42'

export const SHAOLIN_Q42_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 5 },
    { type: 'questCompletedDaysAgoAtLeast', questId: 'QST-SECT-01-41', minDays: 180 },
    qStatus(SHAOLIN_Q42_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 8395 },
    { type: 'skillAtLeast', key: '经义', min: 92 },
    { type: 'skillAtLeast', key: '书', min: 80 },
    { type: 'chivalryAtLeast', min: 200 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0101', min: 40, npcName: '法空' },
    { type: 'npcAlive', npcId: 'NPC-0101', npcName: '法空' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-0105', npcName: '萧远山' },
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
    { type: 'npcAlive', npcId: 'NPC-0120', npcName: '慕容复' },
  ],
}

export const shaolinSweepingMonkYijinQuest: QuestDefinition = {
  id: SHAOLIN_Q42_QUEST_ID,
  title: '古杏扫叶 · 易筋真经',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师巅峰 ～ 大宗师',
  maxOpponentRealm: '宗师上品（慕容博 · 十五合硬撼参合指与斗转星移）',
  recommendedNote:
    '嵩山少林寺绝顶封神终章（全四十八幕）。须已登位少林 Lv.5 掌门、完成《千僧列阵 · 血护少室》满 180 日、入寺满 8395 日（二十三载）、经义 ≥ 92、书 ≥ 80、侠义 ≥ 200、扫地僧法空好感 ≥ 40。琉璃藏经阁三十年恩怨总决算！萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚！你十五合硬撼慕容博参合指与斗转星移；危急之际扫地僧法空缓步入阁，三尺无形气墙轻挡降龙参合、假死救活度化萧慕二老皈依佛门，一袖拂退鸠摩智；漫天古银杏黄叶中，法空亲传创派神功《易筋经》并赐天阶双圣物《达摩一苇渡江履》与《达摩易筋真经》梵夹本！',
  startHint:
    '完成《千僧列阵 · 血护少室》满 180 日、入寺满 8395 日且经义 ≥ 92、书 ≥ 80、侠义 ≥ 200、法空好感 ≥ 40 后，前往【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】即可触发终章。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_cangjing',
    spotId: 'sl_cj_pavilion',
    customLabel: '嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁',
  },
  startCondition: SHAOLIN_Q42_START_CONDITION,
  summary:
    '{reignYear}深秋，少林藏经阁古银杏漫天金黄。尘封三十载的雁门关血海旧案，终于在【重檐琉璃藏经主阁】迎来惊天总决算！【萧远山】、【慕容博】、【萧峰】、【慕容复】与吐蕃国师【鸠摩智】五大绝顶高手齐聚一阁，杀气几乎掀翻琉璃重檐！面对假死潜伏三十年、阴谋搅动天下风云的慕容博，你挺身挡在佛藏与正道之前，以二十三载禅武修为十五合硬撼其《参合指》与《斗转星移》！千钧一发之际，默默扫叶数十载的无名老僧【法空】缓步入阁，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指，点破鸠摩智强练七十二绝技戾气缠身之隐疾，更以无上佛法与大宗师神通假死救活、慈悲度化萧远山与慕容博放下三十年血仇皈依佛门，一袖轻拂震退鸠摩智！风云散尽，漫天古银杏黄叶纷飞于【古银杏无名老僧扫叶庭】，法空点化你二十三载慈悲禅武苦修，亲传少林创派无上神功【易筋经】，并赐予天阶双圣物【达摩一苇渡江履】与【《达摩易筋真经》梵夹本】，至此功德圆满、绝顶封神！',
  initialStepId: 'pavilion_intrusion',
  steps: {
    pavilion_intrusion: {
      id: 'pavilion_intrusion',
      title: '琉璃聚首 · 三十年怨',
      objective:
        '少林藏经阁暗流涌动！请步入【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】，直面萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚之局！',
      nextHint:
        '前往【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】，点击「步入琉璃藏经主阁 · 见证五大绝顶高手齐聚」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        customLabel: '嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁',
      },
    },
    murongbo_fifteen_rounds: {
      id: 'murongbo_fifteen_rounds',
      title: '十五合战 · 硬撼慕容',
      objective:
        '雁门关三十年阴谋彻底败露，慕容博杀心骤起欲先除你而后快！请在【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】十五合硬撼慕容博的参合指与斗转星移！',
      nextHint:
        '在【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】点击「十五合硬撼慕容博 · 迎战参合指与斗转星移」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        customLabel: '嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁',
      },
    },
    three_foot_qi_wall: {
      id: 'three_foot_qi_wall',
      title: '无形气墙 · 神僧现身',
      objective:
        '藏经阁内萧慕父子即将玉石俱焚！留在【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】，见证扫地僧法空三尺无形气墙震慑天下绝顶！',
      nextHint:
        '在【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】点击「见证扫地僧法空入阁 · 三尺无形气墙挡降龙参合」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        customLabel: '嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁',
      },
    },
    convert_and_repel: {
      id: 'convert_and_repel',
      title: '假死度化 · 拂退国师',
      objective:
        '扫地僧已震慑阁内群雄，请移步【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】，见证法空假死救活度化萧慕二老皈依佛门，一袖拂退鸠摩智！',
      nextHint:
        '前往【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】，点击「赴西厢晒经石台 · 见证法空度化萧慕二老、拂退鸠摩智」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        customLabel: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
      },
    },
    ginkgo_yijin_legacy: {
      id: 'ginkgo_yijin_legacy',
      title: '古杏扫叶 · 易筋封神',
      objective:
        '三十年风云终归寂静，古银杏黄叶漫天飘落。请前往【嵩山少林寺 · 少林藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】，聆听法空点化，承接《易筋经》与天阶双圣物！',
      nextHint:
        '前往【嵩山少林寺 · 少林藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】，点击「步入古杏扫叶庭 · 受法空亲传《易筋经》与双圣物」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        customLabel: '嵩山少林寺 · 少林藏经阁 · 古银杏无名老僧扫叶庭',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_slq42_start',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_q42_start_triggered',
      condition: SHAOLIN_Q42_START_CONDITION,
      effects: [openScene('scene_slq42_01', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_pavilion',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_q42_pavilion_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'pavilion_intrusion'),
      effects: [openScene('scene_slq42_06', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_murongbo',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_q42_murongbo_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'murongbo_fifteen_rounds'),
      effects: [openScene('scene_slq42_15', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_qiwall',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_q42_qiwall_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'three_foot_qi_wall'),
      effects: [openScene('scene_slq42_23', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_convert',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      onceFlag: 'sl_q42_convert_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
      effects: [openScene('scene_slq42_31', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_yijin',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_sweeper',
      onceFlag: 'sl_q42_yijin_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
      effects: [openScene('scene_slq42_39', SHAOLIN_Q42_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq42_start',
      label: '【少林绝顶封神终章】步入琉璃藏经主阁 · 三十年恩怨总决算',
      badge: '易筋真经',
      subtitle: '四十八幕终极史诗 · 五大绝顶齐聚，扫地僧现身传《易筋经》',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: SHAOLIN_Q42_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q42_start_triggered', value: true },
        openScene('scene_slq42_01', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_pavilion',
      label: '【易筋真经】步入琉璃藏经主阁 · 见证五大绝顶高手齐聚',
      badge: '琉璃聚首',
      subtitle: '第六幕 · 萧远山、慕容博、萧峰、慕容复、鸠摩智同阁对峙',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'pavilion_intrusion'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_pavilion_triggered', value: true },
        openScene('scene_slq42_06', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_murongbo',
      label: '【易筋真经】十五合硬撼慕容博 · 迎战参合指与斗转星移',
      badge: '十五合战',
      subtitle: '第十五幕 · 宗师巅峰硬仗，撑满十五合或击溃慕容博',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'murongbo_fifteen_rounds'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_murongbo_triggered', value: true },
        openScene('scene_slq42_15', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_qiwall',
      label: '【易筋真经】见证扫地僧法空入阁 · 三尺无形气墙挡降龙参合',
      badge: '无形气墙',
      subtitle: '第二十三幕 · 大宗师神威初现，震慑藏经阁群雄',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'three_foot_qi_wall'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_qiwall_triggered', value: true },
        openScene('scene_slq42_23', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_convert',
      label: '【易筋真经】赴西厢晒经石台 · 见证法空度化萧慕二老、拂退鸠摩智',
      badge: '假死度化',
      subtitle: '第三十一幕 · 慈悲化干戈，萧远山慕容博剃度皈依',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_convert_triggered', value: true },
        openScene('scene_slq42_31', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_yijin',
      label: '【易筋真经】步入古杏扫叶庭 · 受法空亲传《易筋经》与双圣物',
      badge: '古杏扫叶',
      subtitle: '第三十九幕 · 漫天黄叶点化，获《易筋经》、一苇渡江履与梵夹真经',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_sweeper',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_yijin_triggered', value: true },
        openScene('scene_slq42_39', SHAOLIN_Q42_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq42_fakong_start',
      label: '拜见扫地僧法空 · 询藏经阁三十年旧影与古杏禅机',
      badge: '易筋真经',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0101'] },
          SHAOLIN_Q42_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q42_start_triggered', value: true },
        openScene('scene_slq42_01', SHAOLIN_Q42_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinSweepingMonkYijinQuest.scenes').then((m) => m.SHAOLIN_Q42_SCENES),
}

export const SHAOLIN_Q42_QUESTS: QuestDefinition[] = [shaolinSweepingMonkYijinQuest]
