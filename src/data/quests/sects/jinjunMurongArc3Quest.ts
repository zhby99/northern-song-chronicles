import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_2_ID } from './jinjunMurongArc2Quest'

export const JINJUN_MURONG_ARC_3_ID = 'QST-SECT-33-MURONG-ARC-3'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    {
      type: 'questCompletedDaysAgoAtLeast',
      questId: JINJUN_MURONG_ARC_2_ID,
      minDays: 30,
    },
    { type: 'npcAlive', npcId: 'NPC-0038', npcName: '王德用' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-0013', npcName: '包拯' },
    { type: 'npcAlive', npcId: 'NPC-0145', npcName: '邓百川' },
    { type: 'npcAlive', npcId: 'NPC-0161', npcName: '公冶乾' },
    { type: 'npcAlive', npcId: 'NPC-0213', npcName: '包不同' },
    { type: 'npcAlive', npcId: 'NPC-0214', npcName: '风波恶' },
    qStatus(JINJUN_MURONG_ARC_3_ID, 'not_started'),
    qStatus(JINJUN_MURONG_ARC_3_ID, 'not_completed'),
  ],
}

export const JINJUN_MURONG_ARC_3_QUEST: QuestDefinition = {
  id: JINJUN_MURONG_ARC_3_ID,
  title: '破燕 · 叁 · 血染太湖',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '宗师下品 ~ 宗师中品',
  maxOpponentRealm: '宗师上品（慕容博 · 参合堂五合终战）',
  recommendedNote:
    '大宋禁军《破燕三部曲》终章（全四十幕）。完成《破燕 · 贰 · 少室惊变》满 30 日养伤破境后，赴【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】领三千精锐南征平江府、血洗燕子坞，终回开封府处斩四大家将！',
  startHint:
    '完成《破燕 · 贰》闭门休养满 30 日且身居禁军 Lv.4 后，前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】受领南征调令。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_jinjun',
    spotId: 'bl_jj_platform',
    customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
  },
  startCondition: START_CONDITION,
  initialStepId: 'suzhou_granary_raid',
  summary:
    '闭关三十日参悟《太玄经》伤愈破境后，主角受枢密院调令统领三千精锐禁军南下两浙路平江府，彻底铲除姑苏慕容氏！先于苏州城外合围秘密钱粮漕仓与私造兵坊，阵前生擒“赤霞庄”公冶乾；再率大船杀入太湖，于五湖浓雾“水鬼”凿船惨烈血战中 1v2 力擒跳帮的包不同与风波恶；继而强登燕子坞，于听香水榭桥头踏血击溃并生擒四大家将之首邓百川！终至参合堂，于火光中正面硬撼宗师上品慕容博五轮绝杀不露败象，逼得慕容父子于千军强弩合围下震壁跃入太湖暗流遁入西夏大辽阴影。主角悉数追回神臂弓图纸样弩，接管还施水阁并起获《姑苏慕容家传玉玺印》与《参合指》秘籍；凯旋归抵开封府，午时三刻于东京市曹刑场以谋反罪公开处斩慕容四大家将，百年“南慕容”基业自此灰飞烟灭！',
  steps: {
    suzhou_granary_raid: {
      id: 'suzhou_granary_raid',
      title: '平江合围 · 擒拿公冶乾',
      objective:
        '三千精锐禁军已抵两浙路平江府！请前往【苏州府 · 苏州平江府衙】调集地方厢军配合，合围慕容氏秘密钱粮漕仓与私造兵坊，生擒“赤霞庄”庄主公冶乾！',
      nextHint: '前往【苏州府 · 苏州平江府衙（suzhou_base_yamen）】，点击「合围私造兵坊 · 生擒公冶乾」。',
      targetLocation: {
        regionId: 'suzhou',
        buildingId: 'suzhou_base_yamen',
        customLabel: '苏州府 · 苏州平江府衙',
      },
    },
    taihu_naval_battle: {
      id: 'taihu_naval_battle',
      title: '五湖烟波 · 破水鬼擒包风',
      objective:
        '外围羽翼已拔，请即刻前往【苏州府 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船】征调大船杀入太湖，迎战太湖水鬼与跳帮截杀的包不同、风波恶！',
      nextHint: '前往【太湖烟波渡口 · 通燕子坞锦帆画舫渡船（sz_th_boat）】，点击「千帆入太湖 · 血战水鬼擒包风」。',
      targetLocation: {
        regionId: 'suzhou',
        buildingId: 'sz_taihu',
        spotId: 'sz_th_boat',
        customLabel: '苏州府 · 太湖烟波渡口 · 通燕子坞锦帆画舫渡船',
      },
    },
    storm_tingxiang_bridge: {
      id: 'storm_tingxiang_bridge',
      title: '强登水榭 · 擒青云邓百川',
      objective:
        '已强行登陆燕子坞！请率两千余百战禁军突破园林机关暗道，直扑【太湖燕子坞 · 听香水榭与曼陀花坞 · 听香水榭主阁】生擒四大家将之首邓百川！',
      nextHint: '前往【听香水榭与曼陀花坞 · 听香水榭主阁（yzw_tingxiang_main）】，点击「踏血破桥头 · 生擒邓百川」。',
      targetLocation: {
        regionId: 'yanziwu',
        buildingId: 'yzw_tingxiang',
        spotId: 'yzw_tingxiang_main',
        customLabel: '太湖燕子坞 · 听香水榭与曼陀花坞 · 听香水榭主阁',
      },
    },
    canhe_hall_showdown: {
      id: 'canhe_hall_showdown',
      title: '参合堂终战 · 百年基业成灰',
      objective:
        '慕容四大家将已尽数入囚！请率杀红了眼的千名百战禁军合围【太湖燕子坞 · 参合庄议事正厅 · 参合庄正堂议事厅】，直面宗师上品慕容博与慕容复父子，撑过五合终战并查抄还施水阁！',
      nextHint: '前往【参合庄议事正厅 · 参合庄正堂议事厅（yzw_canhe_main）】，点击「合围参合堂 · 终战慕容博」。',
      targetLocation: {
        regionId: 'yanziwu',
        buildingId: 'yzw_canhe',
        spotId: 'yzw_canhe_main',
        customLabel: '太湖燕子坞 · 参合庄议事正厅 · 参合庄正堂议事厅',
      },
    },
    kaifeng_treason_execution: {
      id: 'kaifeng_treason_execution',
      title: '押囚凯旋 · 开封府斩四将',
      objective:
        '燕子坞灰飞烟灭，神臂弓悉数追回！请押解邓百川、公冶乾、包不同、风波恶四辆囚车凯旋返回【开封府 · 开封府衙（六扇门） · 开封府升堂正殿】，以谋反罪公开处斩四大家将！',
      nextHint: '返回【开封府 · 开封府升堂正殿（bl_kf_court）】，点击「押囚凯旋 · 市曹处斩四大家将」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        customLabel: '开封府 · 开封府衙（六扇门） · 开封府升堂正殿',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_mr3_start',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      onceFlag: 'jj_mr3_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'suzhou_granary_raid' },
        openScene('scene_jj_mr3_01_healed_breakthrough', JINJUN_MURONG_ARC_3_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_mr3_start_manual',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      label: '【破燕 · 叁】领三千精锐南征燕子坞',
      subtitle: '伤愈出关，领枢密院调令统率三千禁军南下平江府铲除姑苏慕容氏！',
      tone: 'danger',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_MURONG_ARC_3_ID, stepId: 'suzhou_granary_raid' },
        openScene('scene_jj_mr3_01_healed_breakthrough', JINJUN_MURONG_ARC_3_ID),
      ],
    },
    {
      id: 'act_jj_mr3_suzhou',
      regionId: 'suzhou',
      buildingId: 'suzhou_base_yamen',
      label: '【破燕 · 叁】合围私造兵坊 · 生擒公冶乾',
      subtitle: '雷霆合围慕容氏苏州钱粮漕仓与兵坊，1v1 力挫并生擒公冶乾。',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_MURONG_ARC_3_ID, 'suzhou_granary_raid'),
      effects: [openScene('scene_jj_mr3_06_suzhou_surround', JINJUN_MURONG_ARC_3_ID)],
    },
    {
      id: 'act_jj_mr3_taihu',
      regionId: 'suzhou',
      buildingId: 'sz_taihu',
      spotId: 'sz_th_boat',
      label: '【破燕 · 叁】千帆入太湖 · 血战水鬼擒包风',
      subtitle: '征调大船杀入太湖五湖浓雾，1v2 锁拿包不同与风波恶并强登燕子坞！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_MURONG_ARC_3_ID, 'taihu_naval_battle'),
      effects: [openScene('scene_jj_mr3_13_board_ships', JINJUN_MURONG_ARC_3_ID)],
    },
    {
      id: 'act_jj_mr3_taihu_return_ferry',
      regionId: 'suzhou',
      buildingId: 'sz_taihu',
      spotId: 'sz_th_boat',
      label: '【破燕 · 叁】乘征调战船重返燕子坞前线',
      subtitle: '水师战船已控制太湖航道，即刻登船重返燕子坞大营再战！',
      tone: 'danger',
      visibleWhen: {
        type: 'any',
        conditions: [
          atStep(JINJUN_MURONG_ARC_3_ID, 'storm_tingxiang_bridge'),
          atStep(JINJUN_MURONG_ARC_3_ID, 'canhe_hall_showdown'),
        ],
      },
      effects: [
        {
          type: 'branch',
          condition: atStep(JINJUN_MURONG_ARC_3_ID, 'storm_tingxiang_bridge'),
          thenEffects: [
            { type: 'teleportPlayer', regionId: 'yanziwu', buildingId: 'yzw_tingxiang', spotId: 'yzw_tingxiang_main' },
          ],
          elseEffects: [
            { type: 'teleportPlayer', regionId: 'yanziwu', buildingId: 'yzw_canhe', spotId: 'yzw_canhe_main' },
          ],
        },
      ],
    },
    {
      id: 'act_jj_mr3_tingxiang',
      regionId: 'yanziwu',
      buildingId: 'yzw_tingxiang',
      spotId: 'yzw_tingxiang_main',
      label: '【破燕 · 叁】踏血破桥头 · 生擒邓百川',
      subtitle: '突破园林暗道机关，于听香水榭桥头 1v1 击溃并生擒邓百川！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_MURONG_ARC_3_ID, 'storm_tingxiang_bridge'),
      effects: [openScene('scene_jj_mr3_21_garden_traps', JINJUN_MURONG_ARC_3_ID)],
    },
    {
      id: 'act_jj_mr3_canhe',
      regionId: 'yanziwu',
      buildingId: 'yzw_canhe',
      spotId: 'yzw_canhe_main',
      label: '【破燕 · 叁】合围参合堂 · 终战慕容博',
      subtitle: '参合堂火光中硬撼宗师上品慕容博五合，接管还施水阁并起获玉玺印与参合指！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_MURONG_ARC_3_ID, 'canhe_hall_showdown'),
      effects: [openScene('scene_jj_mr3_27_canhe_surrounded', JINJUN_MURONG_ARC_3_ID)],
    },
    {
      id: 'act_jj_mr3_kaifeng',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      label: '【破燕 · 叁】押囚凯旋 · 市曹处斩四大家将',
      subtitle: '开封府会审定谳，午时三刻于东京市曹以谋反罪公开处斩慕容四大家将！',
      tone: 'gold',
      visibleWhen: atStep(JINJUN_MURONG_ARC_3_ID, 'kaifeng_treason_execution'),
      effects: [openScene('scene_jj_mr3_38_triumph_kaifeng', JINJUN_MURONG_ARC_3_ID)],
    },
  ],
  loadScenes: () => import('./jinjunMurongArc3Quest.scenes').then((m) => m.SCENES),
}

export const JINJUN_MURONG_ARC_3_QUESTS: readonly QuestDefinition[] = [JINJUN_MURONG_ARC_3_QUEST]
