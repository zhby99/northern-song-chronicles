import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const JINJUN_QINZHOU_HORSE_QUEST_ID = 'QST-SECT-33-QINZHOU-HORSE'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    { type: 'skillAtLeast', key: '骑术', min: 75 },
    { type: 'skillAtLeast', key: '辩才', min: 70 },
    { type: 'skillAtLeast', key: '算术', min: 60 },
    { type: 'chivalryAtLeast', min: 200 },
    { type: 'silverAtLeast', min: 200 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0045', min: 15, npcName: '刘沪' },
    { type: 'npcAlive', npcId: 'NPC-0045', npcName: '刘沪' },
    qStatus(JINJUN_QINZHOU_HORSE_QUEST_ID, 'not_started'),
    qStatus(JINJUN_QINZHOU_HORSE_QUEST_ID, 'not_completed'),
  ],
}

export const JINJUN_QINZHOU_HORSE_QUEST: QuestDefinition = {
  id: JINJUN_QINZHOU_HORSE_QUEST_ID,
  title: '秦州道 · 茶马失纲录',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'qinzhou',
  recommendedRealm: '一流上品 ~ 宗师下品',
  maxOpponentRealm: '宗师下品（铁莲尊者 · 察罕）',
  recommendedNote:
    '大宋禁军 Lv.4【三衙都虞候】独立支线（全十幕）。须骑术≥75、辩才≥70、算术≥60、侠义≥200、现银≥200两及刘沪好感≥15，于秦州府衙触发。',
  startHint:
    '晋升大宋禁军 Lv.4 三衙都虞候且达标骑术/辩才/算术/侠义与盘缠后，前往【秦州府 · 秦州府衙 · 秦凤经略安抚司】拜见刘沪开启。',
  startLocation: {
    regionId: 'qinzhou',
    buildingId: 'qinzhou_base_yamen',
    customLabel: '秦州府 · 秦州府衙 · 秦凤经略安抚司',
  },
  startCondition: START_CONDITION,
  initialStepId: 'inspect_chama',
  summary:
    'Lv.4 三衙都虞候西巡秦州，见边军战马多患蹄疫、羌部怒指官府克扣茶叶。你先赴茶马榷场携徐衡林验明病马与茶砖假账，复于陇上胡姬琵琶酒肆散财暗探、稳住羌部牧场，再追至麦积山千佛悬崖窟 1v2 击杀一流上品沙匪双煞，最终于陇右古战场烽燧下 1v1 斩杀护货的宗师下品黑教供奉“铁莲尊者”察罕！夺回五十匹河曲神骏与官茶，获羌部赠以青唐唃厮啰金翼驹。',
  steps: {
    inspect_chama: {
      id: 'inspect_chama',
      title: '榷场验马 · 核查茶砖底单',
      objective:
        '秦州茶马危机迫在眉睫，请即刻前往【秦州府 · 秦州官营茶马榷场 · 茶马榷场 · 勘合正堂】会同徐衡林查验马厩与茶砖底单！',
      nextHint: '前往【秦州官营茶马榷场 · 勘合正堂（qzf_chama_main）】，点击「验马核单 · 彻查榷场黑幕」。',
      targetLocation: {
        regionId: 'qinzhou',
        buildingId: 'qzf_chama',
        spotId: 'qzf_chama_main',
        customLabel: '秦州府 · 秦州官营茶马榷场 · 勘合正堂',
      },
    },
    probe_huji_tavern: {
      id: 'probe_huji_tavern',
      title: '胡姬酒肆 · 散财买暗讯',
      objective:
        '已查明黑牙行以劣茶病马两头牟利！请携带盘缠前往【秦州府 · 陇上胡姬琵琶酒肆】打探黑牙行将上等官茶与良马偷运出境的路线。',
      nextHint: '前往【陇上胡姬琵琶酒肆（qinzhou_base_tavern）】，点击「打探胡商暗道 · 稳住羌部」。',
      targetLocation: {
        regionId: 'qinzhou',
        buildingId: 'qinzhou_base_tavern',
        customLabel: '秦州府 · 陇上胡姬琵琶酒肆',
      },
    },
    ambush_maijishan: {
      id: 'ambush_maijishan',
      title: '麦积山伏 · 崖下截沙匪',
      objective:
        '胡商暗探透露黑牙行正将官茶良马运往【秦州府 · 麦积山千佛悬崖窟 · 散花楼 · 凌空飞栈】山脚暗道！请速往截击护货沙匪双煞（一流上品）！',
      nextHint: '前往【麦积山千佛悬崖窟 · 散花楼 · 凌空飞栈（qzf_maijishan_main）】，点击「崖下截盗 · 击溃沙匪双煞」。',
      targetLocation: {
        regionId: 'qinzhou',
        buildingId: 'qzf_maijishan',
        spotId: 'qzf_maijishan_main',
        customLabel: '秦州府 · 麦积山千佛悬崖窟 · 散花楼',
      },
    },
    beacon_grandmaster_duel: {
      id: 'beacon_grandmaster_duel',
      title: '烽燧绝战 · 斩西陲宗师',
      objective:
        '沙匪双煞已毙，残匪竟由宗师下品黑教供奉“铁莲尊者”察罕亲自接应逃往【秦州府 · 陇右古战场烽燧 · 断碑烽火望夏台】！请单骑追击，斩杀宗师夺回五十匹河曲良马！',
      nextHint: '前往【陇右古战场烽燧 · 断碑烽火望夏台（qzf_longyou_east）】，点击「烽燧决战 · 斩杀铁莲尊者察罕」。',
      targetLocation: {
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_east',
        customLabel: '秦州府 · 陇右古战场烽燧 · 断碑烽火望夏台',
      },
    },
    return_qinzhou_yamen: {
      id: 'return_qinzhou_yamen',
      title: '公堂发落 · 羌汉同欢',
      objective:
        '宗师察罕伏诛，官茶良马全数追回！请押解黑牙行主犯返回【秦州府 · 秦州府衙 · 秦凤经略安抚司】公开退还茶砖、平息边贸风波！',
      nextHint: '返回【秦州府衙 · 秦凤经略安抚司（qinzhou_base_yamen）】，点击「公堂退茶定案 · 接受羌部赠马」。',
      targetLocation: {
        regionId: 'qinzhou',
        buildingId: 'qinzhou_base_yamen',
        customLabel: '秦州府 · 秦州府衙 · 秦凤经略安抚司',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_jj_qz_start',
      regionId: 'qinzhou',
      buildingId: 'qinzhou_base_yamen',
      onceFlag: 'jj_qz_started',
      condition: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'inspect_chama' },
        openScene('scene_jj_qz_01_border_letter', JINJUN_QINZHOU_HORSE_QUEST_ID),
      ],
    },
  ],
  spotActions: [
    {
      id: 'act_jj_qz_start_manual',
      regionId: 'qinzhou',
      buildingId: 'qinzhou_base_yamen',
      label: '【都虞候西巡】受领秦州茶马急案',
      subtitle: '与刘沪议定平息茶马榷场风波之策。',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [
        { type: 'startQuest', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'inspect_chama' },
        openScene('scene_jj_qz_01_border_letter', JINJUN_QINZHOU_HORSE_QUEST_ID),
      ],
    },
    {
      id: 'act_jj_qz_chama',
      regionId: 'qinzhou',
      buildingId: 'qzf_chama',
      spotId: 'qzf_chama_main',
      label: '【都虞候西巡】验马核单 · 彻查榷场黑幕',
      subtitle: '查验战马蹄疫与茶砖底单，揪出黑牙行内鬼。',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_QINZHOU_HORSE_QUEST_ID, 'inspect_chama'),
      effects: [openScene('scene_jj_qz_02_chama_inspect', JINJUN_QINZHOU_HORSE_QUEST_ID)],
    },
    {
      id: 'act_jj_qz_tavern',
      regionId: 'qinzhou',
      buildingId: 'qinzhou_base_tavern',
      label: '【都虞候西巡】打探胡商暗道 · 稳住羌部',
      subtitle: '以银两与辩才问出黑牙行交货路线，并单骑赴牧场稳住羌部首领。',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_QINZHOU_HORSE_QUEST_ID, 'probe_huji_tavern'),
      effects: [openScene('scene_jj_qz_03_huji_tavern', JINJUN_QINZHOU_HORSE_QUEST_ID)],
    },
    {
      id: 'act_jj_qz_maijishan',
      regionId: 'qinzhou',
      buildingId: 'qzf_maijishan',
      spotId: 'qzf_maijishan_main',
      label: '【都虞候西巡】崖下截盗 · 击溃沙匪双煞',
      subtitle: '在麦积山悬崖暗道截击一流上品沙匪双煞！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_QINZHOU_HORSE_QUEST_ID, 'ambush_maijishan'),
      effects: [openScene('scene_jj_qz_05_maijishan_ambush', JINJUN_QINZHOU_HORSE_QUEST_ID)],
    },
    {
      id: 'act_jj_qz_longyou',
      regionId: 'qinzhou',
      buildingId: 'qzf_longyou',
      spotId: 'qzf_longyou_east',
      label: '【都虞候西巡】烽燧决战 · 斩杀铁莲尊者察罕',
      subtitle: '于陇右古战场烽燧 1v1 迎战宗师下品黑教供奉！',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_QINZHOU_HORSE_QUEST_ID, 'beacon_grandmaster_duel'),
      effects: [openScene('scene_jj_qz_07_beacon_duel', JINJUN_QINZHOU_HORSE_QUEST_ID)],
    },
    {
      id: 'act_jj_qz_yamen_end',
      regionId: 'qinzhou',
      buildingId: 'qinzhou_base_yamen',
      label: '【都虞候西巡】公堂退茶定案 · 接受羌部赠马',
      subtitle: '公开审结黑牙行主犯，平息边贸风波并获赠西域神驹。',
      tone: 'gold',
      visibleWhen: atStep(JINJUN_QINZHOU_HORSE_QUEST_ID, 'return_qinzhou_yamen'),
      effects: [openScene('scene_jj_qz_08_court_verdict', JINJUN_QINZHOU_HORSE_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./jinjunQinzhouHorseQuest.scenes').then((m) => m.SCENES),
}

export const JINJUN_QINZHOU_HORSE_QUESTS: readonly QuestDefinition[] = [JINJUN_QINZHOU_HORSE_QUEST]
