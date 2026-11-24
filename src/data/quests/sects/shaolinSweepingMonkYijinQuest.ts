import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q42_QUEST_ID = 'QST-SECT-01-42'

export const SHAOLIN_Q42_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 5 },
    { type: 'questCompletedDaysAgoAtLeast', questId: 'QST-SECT-01-41', minDays: 30 },
    qStatus(SHAOLIN_Q42_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1080 },
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
    '嵩山少林寺绝顶封神终章（精炼十七幕巅峰史诗）。须已登位少林 Lv.5 掌门、完成《千僧列阵 · 血护少室》满 30 日、入寺满三载（1080 日）、经义 ≥ 92、书 ≥ 80、侠义 ≥ 200、扫地僧法空好感 ≥ 40。琉璃藏经阁三十年恩怨总决算！萧远山、慕容博、萧峰、慕容复、鸠摩智五大绝顶高手齐聚！你当面斥破慕容博阴谋、十五合硬撼参合指与斗转星移；危急之际扫地僧法空缓步入阁，三尺无形气墙轻挡降龙参合、假死度化萧慕二老皈依佛门，一袖拂退鸠摩智；漫天古银杏黄叶中，法空总评你一生双轨业报、问出禅宗终极一问，亲传创派神功《易筋经》并赐天阶圣物《达摩一苇渡江履》与《达摩易筋真经》梵夹本！',
  startHint:
    '完成《千僧列阵 · 血护少室》满 30 日、入寺满三载（1080 日）且经义 ≥ 92、书 ≥ 80、侠义 ≥ 200、法空好感 ≥ 40 后，前往【嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁（sl_cj_pavilion）】即可触发终章。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_cangjing',
    spotId: 'sl_cj_pavilion',
    customLabel: '嵩山少林寺 · 少林藏经阁 · 重檐琉璃藏经主阁',
  },
  startCondition: SHAOLIN_Q42_START_CONDITION,
  summary:
    '{reignYear}深秋，少林藏经阁古银杏漫天金黄。尘封三十载的雁门关血海旧案，终于在【重檐琉璃藏经主阁】迎来惊天总决算！【萧远山】、【慕容博】、【萧峰】、【慕容复】与吐蕃国师【鸠摩智】五大绝顶高手齐聚一阁，杀气几乎掀翻琉璃重檐！面对假死潜伏三十年、阴谋搅动天下风云的慕容博，你挺身挡在佛藏与正道之前，当场斥破其罪行，以三载禅武修为十五合硬撼其《参合指》与《斗转星移》！千钧一发之际，默默扫叶数十载的无名老僧【法空】缓步入阁，三尺无形气墙轻描淡写挡下萧峰降龙掌与慕容博参合指，点破鸠摩智强练七十二绝技戾气缠身之隐疾，更以无上佛法与大宗师神通假死救活、慈悲度化萧远山与慕容博放下三十年血仇皈依佛门，一袖轻拂震退鸠摩智！风云散尽，漫天古银杏黄叶纷飞于【古银杏无名老僧扫叶庭】，法空总评你三载禅心与杀业、抛出禅宗最高一问，亲传少林创派无上神功并赐予天阶圣物，至此功德圆满、绝顶封神！',
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
        '三十年风云终归寂静，古银杏黄叶漫天飘落。请前往【嵩山少林寺 · 少林藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】，聆听法空生涯总评与禅宗终极一问，承接达摩真传与天阶圣物！',
      nextHint:
        '前往【嵩山少林寺 · 少林藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】，点击「步入古杏扫叶庭 · 受法空点化与达摩真传」。',
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
      effects: [openScene('scene_slq42_02', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_murongbo',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_q42_murongbo_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'murongbo_fifteen_rounds'),
      effects: [openScene('scene_slq42_05', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_qiwall',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_q42_qiwall_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'three_foot_qi_wall'),
      effects: [openScene('scene_slq42_07', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_convert',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      onceFlag: 'sl_q42_convert_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
      effects: [openScene('scene_slq42_09', SHAOLIN_Q42_QUEST_ID)],
    },
    {
      id: 'trig_slq42_yijin',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_sweeper',
      onceFlag: 'sl_q42_yijin_triggered',
      condition: atStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
      effects: [openScene('scene_slq42_11', SHAOLIN_Q42_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq42_start',
      label: '【少林绝顶封神终章】步入琉璃藏经主阁 · 三十年恩怨总决算',
      badge: '易筋真经',
      subtitle: '巅峰终极史诗 · 五大绝顶齐聚，扫地僧现身授祖师真传',
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
      subtitle: '萧远山、慕容博、萧峰、慕容复、鸠摩智同阁对峙',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'pavilion_intrusion'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_pavilion_triggered', value: true },
        openScene('scene_slq42_02', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_murongbo',
      label: '【易筋真经】十五合硬撼慕容博 · 迎战参合指与斗转星移',
      badge: '十五合战',
      subtitle: '宗师巅峰硬仗 · 撑满十五合或正面击溃慕容博',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'murongbo_fifteen_rounds'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_murongbo_triggered', value: true },
        openScene('scene_slq42_05', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_qiwall',
      label: '【易筋真经】见证扫地僧法空入阁 · 三尺无形气墙挡降龙参合',
      badge: '无形气墙',
      subtitle: '大宗师神威初现，震慑藏经阁五大绝顶',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'three_foot_qi_wall'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_qiwall_triggered', value: true },
        openScene('scene_slq42_07', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_convert',
      label: '【易筋真经】赴西厢晒经石台 · 见证法空度化萧慕二老、拂退鸠摩智',
      badge: '假死度化',
      subtitle: '慈悲化干戈，萧远山慕容博剃度皈依',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'convert_and_repel'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_convert_triggered', value: true },
        openScene('scene_slq42_09', SHAOLIN_Q42_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq42_yijin',
      label: '【易筋真经】步入古杏扫叶庭 · 聆听法空生涯总评与达摩真传',
      badge: '古杏扫叶',
      subtitle: '漫天黄叶点化，禅宗终极一问与绝顶封神',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_sweeper',
      visibleWhen: atStep(SHAOLIN_Q42_QUEST_ID, 'ginkgo_yijin_legacy'),
      effects: [
        { type: 'setFlag', flag: 'sl_q42_yijin_triggered', value: true },
        openScene('scene_slq42_11', SHAOLIN_Q42_QUEST_ID),
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
