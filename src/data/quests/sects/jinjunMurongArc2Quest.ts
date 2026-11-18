import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_1_ID } from './jinjunMurongArc1Quest'

export const JINJUN_MURONG_ARC_2_ID = 'QST-SECT-33-MURONG-ARC-2'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    qStatus(JINJUN_MURONG_ARC_1_ID, 'completed'),
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0120', npcName: '慕容复' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-0001', npcName: '宋仁宗' },
    qStatus(JINJUN_MURONG_ARC_2_ID, 'not_started'),
    qStatus(JINJUN_MURONG_ARC_2_ID, 'not_completed'),
  ],
}

export const JINJUN_MURONG_ARC_2_QUEST: QuestDefinition = {
  id: JINJUN_MURONG_ARC_2_ID,
  title: '破燕 · 贰 · 少室惊变',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'shaolin',
  recommendedRealm: '宗师下品 ~ 宗师中品',
  maxOpponentRealm: '宗师上品（慕容博 · 撑满三合）',
  recommendedNote:
    '大宋禁军《破燕三部曲》第二部（全三十幕）。完成《破燕 · 壹 · 汴梁暗影》后，率千名禁军赴【嵩山少林寺 · 钟鼓禅院演武坪】触发。含 1v1 击败慕容复（宗师下品）及硬接慕容博（宗师上品）三轮绝杀之生死考验！',
  startHint:
    '完成《破燕 · 壹》且身居禁军 Lv.4 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院演武坪】开启。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_west',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院演武坪',
  },
  startCondition: START_CONDITION,
  initialStepId: 'shaolin_confront_murong',
  summary:
    '一千大宋禁军如黑云压城列阵封锁少室山，三衙都虞候按刀步入少林寺前，当着玄慈方丈与天下群雄宣读枢密院海捕文书、亮出军器监胥吏供词与苏绣物证，当众揭穿姑苏慕容氏盗窃神臂弓、图谋复辟大燕之罪！慕容复众叛亲离拔剑反扑，主角历经沙场淬炼将其长剑震断、重创擒拿。不料潜伏少林三十载的灰衣老僧慕容博鬼魅掠出，以绝世参合指力连攻三轮，主角死战不退硬接三合终被震碎护心镜呕血重伤！少林玄字辈高僧结阵阻拦、千军强弩攒射，慕容博挟起慕容复遁入嵩山密林。玄慈赠以少林九转大还丹护住心脉；班师回返开封后，朝廷定性慕容氏谋逆，官家赵祯亲赴府邸探望，御赐宫中秘藏天阶心法《太玄经》，助主角闭关疗伤破而后立！',
  steps: {
    shaolin_confront_murong: {
      id: 'shaolin_confront_murong',
      title: '少林寺前 · 宣旨擒逆',
      objective:
        '大军已封锁少室山，请前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿】当着玄慈方丈与天下群雄宣读海捕文书，迎战慕容复与幕后神秘宗师！',
      nextHint: '前往【少林寺 · 大雄正殿（sl_daxiong_main）】，点击「宣读海捕文书 · 力擒慕容复」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿',
      },
    },
    return_kaifeng_recover: {
      id: 'return_kaifeng_recover',
      title: '班师回京 · 御赐太玄疗伤',
      objective:
        '少室山硬接慕容博三记参合指身受重伤，玄慈方丈已赠少林九转大还丹暂稳心脉。请护军班师返回【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】复命养伤，静候圣躬亲临！',
      nextHint: '返回【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台（bl_jj_platform）】，点击「重伤复命 · 闭门受赏太玄经」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_platform',
        customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_mr2_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'jj_mr2_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_MURONG_ARC_2_ID, stepId: 'shaolin_confront_murong' },
        openScene('scene_jj_mr2_01_songshan_arrival', JINJUN_MURONG_ARC_2_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_mr2_start_manual',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      label: '【破燕 · 贰】铁甲围禅林 · 封锁少室山',
      subtitle: '统领一千殿前司禁军抵达少室山，列阵合围武林大会。',
      tone: 'danger',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_MURONG_ARC_2_ID, stepId: 'shaolin_confront_murong' },
        openScene('scene_jj_mr2_01_songshan_arrival', JINJUN_MURONG_ARC_2_ID),
      ],
    },
    {
      id: 'act_jj_mr2_daxiong',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      label: '【破燕 · 贰】宣读海捕文书 · 力擒慕容复',
      subtitle: '当众揭穿姑苏慕容氏谋逆铁证，寺前迎战慕容复与神秘宗师！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_MURONG_ARC_2_ID, 'shaolin_confront_murong'),
      effects: [openScene('scene_jj_mr2_07_enter_arena', JINJUN_MURONG_ARC_2_ID)],
    },
    {
      id: 'act_jj_mr2_kaifeng',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      label: '【破燕 · 贰】重伤复命 · 闭门受赏太玄经',
      subtitle: '班师回返东京复命，迎候官家亲临探望并赐宫中秘藏《太玄经》。',
      tone: 'gold',
      visibleWhen: atStep(JINJUN_MURONG_ARC_2_ID, 'return_kaifeng_recover'),
      effects: [openScene('scene_jj_mr2_26_return_kaifeng', JINJUN_MURONG_ARC_2_ID)],
    },
  ],
  loadScenes: () => import('./jinjunMurongArc2Quest.scenes').then((m) => m.SCENES),
}

export const JINJUN_MURONG_ARC_2_QUESTS: readonly QuestDefinition[] = [JINJUN_MURONG_ARC_2_QUEST]
