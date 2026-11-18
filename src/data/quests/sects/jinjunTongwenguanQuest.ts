import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_2_ID } from './jinjunMurongArc2Quest'

export const JINJUN_TONGWENGUAN_ID = 'QST-SECT-33-TONGWENGUAN'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    qStatus(JINJUN_MURONG_ARC_2_ID, 'completed'),
    { type: 'learnedArtAtLeast', artId: 'MA-003', minLevel: 4 },
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '辩才', min: 55 },
    { type: 'npcAlive', npcId: 'NPC-0038', npcName: '王德用' },
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
    { type: 'npcAlive', npcId: 'NPC-0236', npcName: '段正淳' },
    qStatus(JINJUN_TONGWENGUAN_ID, 'not_started'),
    qStatus(JINJUN_TONGWENGUAN_ID, 'not_completed'),
  ],
}

export function buildTuboGuardianMonkNpc(index: 1 | 2): NodeNpc {
  return makeQuestNpc({
    id: `twg_tubo_monk_${index}`,
    name: index === 1 ? '吐蕃密宗护法上师' : '吐蕃金刚伏魔番僧',
    title: '大轮明王随行密宗护法',
    realm: '一流中品',
    factionId: 'SECT-32',
    factionName: '吐蕃密宗',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk:
      index === 1
        ? '国师法旨在此，南朝武夫休得阻挡大轮明王索要《六脉神剑》！'
        : '金刚降魔杵下，岂容宋廷甲士横加阻拦！',
    stats: { hp: 2350, mp: 1850, agi: 62, res: 58 },
    equipped: {
      weapon: 'WPN-036',
      armor: 'ARM-019',
      shoes: 'BOT-009',
      bow: 'BOW-010',
      accessory1: 'ACC-018',
      accessory2: 'ACC-020',
      mount: 'MNT-011',
    },
    equippedArts: { neigong: 'MA-142', qinggong: 'MA-157', move1: 'MA-133', move2: 'MA-136' },
    learnedArts: [
      { artId: 'MA-142', level: 7 },
      { artId: 'MA-157', level: 6 },
      { artId: 'MA-133', level: 7 },
      { artId: 'MA-136', level: 6 },
    ],
  })
}

export const JINJUN_TONGWENGUAN_QUEST: QuestDefinition = {
  id: JINJUN_TONGWENGUAN_ID,
  title: '同文馆 · 四夷宾服录',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '宗师中品',
  maxOpponentRealm: '宗师中品（吐蕃国师鸠摩智 · 火焰刀小无相功）',
  recommendedNote:
    '大宋禁军 Lv.4 专项（全二十五幕）。须完成《破燕 · 贰 · 少室惊变》、修习《太玄经》≥ 4 重且经义 ≥ 55、辩才 ≥ 55 后，赴【开封府 · 大内皇宫 · 垂拱紫宸正殿】领仪鸾司宿卫密令！',
  startHint:
    '身居禁军 Lv.4、完成《破燕 · 贰》、习得《太玄经》≥ 4 重且经义 ≥ 55、辩才 ≥ 55 后，前往【开封府 · 大内皇宫 · 垂拱紫宸正殿】领命。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_palace',
    spotId: 'bl_palace_hall',
    customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
  },
  startCondition: START_CONDITION,
  initialStepId: 'twg_banquet_debate',
  summary:
    '隆冬瑞雪初霁，大理镇南王段正淳携世子段誉、吐蕃国师鸠摩智双双抵京入驻同文馆。枢密院命身为殿前司都虞候的主角兼领仪鸾司宿卫，全权防务。开宴当日主角以礼乐典章与兵略谈吐折服辽夏随使、化解座次之争；三更西院火起，鸠摩智受西夏权臣没藏讹庞暗中重金唆使，趁夜强闯大理馆舍逼问《六脉神剑》并图盗毁宋理茶马盟书。主角率宿卫破门救护段氏父子，于同文馆红墙飞檐之下内运《太玄经》浑厚真气独战大轮明王鸠摩智，一枪挑碎其袈裟金环震散火焰刀影！风波平息后宋理盟约既定，段正淳感念雪夜护持之恩，临别赠以大理名驹《点苍蹑云雪山骢》与段氏指劲行气秘要《段氏纯阳吐纳诀》，大宋西南藩屏自此稳如泰山。',
  steps: {
    twg_banquet_debate: {
      id: 'twg_banquet_debate',
      title: '同文馆宴 · 礼乐折远使',
      objective:
        '已领枢密院密令兼领仪鸾司宿卫，请前往【开封府 · 东市悦来客栈（同文馆外宾馆驿）】巡察馆舍防务并主持各国使团冬宴，化解辽夏随使蓄意挑起的座次之争！',
      nextHint: '前往【开封府 · 东市悦来客栈（bianliang_base_inn）】，点击「主持同文馆冬宴 · 折服辽夏使臣」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bianliang_base_inn',
        customLabel: '开封府 · 东市悦来客栈（同文馆馆驿）',
      },
    },
    twg_snow_night_duel: {
      id: 'twg_snow_night_duel',
      title: '雪夜火起 · 枪破火焰刀',
      objective:
        '三更风雪骤急，同文馆西院突遭吐蕃番僧纵火夜袭！请速赶往【开封府 · 皇城宿卫角楼（bl_palace_watch）】调集殿前司甲士封锁西院，破门迎战大轮明王鸠摩智！',
      nextHint: '前往【开封府 · 大内皇宫 · 皇城宿卫角楼（bl_palace_watch）】，点击「率甲士破西院 · 战鸠摩智」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_watch',
        customLabel: '开封府 · 大内皇宫 · 皇城宿卫角楼',
      },
    },
    twg_treaty_farewell: {
      id: 'twg_treaty_farewell',
      title: '盟书既定 · 赠驹授秘要',
      objective:
        '鸠摩智托病离京，宋理茶马盟书安然签署！请前往【开封府 · 大内皇宫 · 垂拱紫宸正殿】向官家与王德用复命，并送别段正淳父子。',
      nextHint: '前往【开封府 · 大内皇宫 · 垂拱紫宸正殿（bl_palace_hall）】，点击「复命紫宸殿 · 送别大理使团」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_hall',
        customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
      },
    },
  },
  spotActions: [
    {
      id: 'act_jinjun_twg_start',
      label: '领仪鸾司密令 · 护同文馆（Lv.4 专项）',
      subtitle: '需《破燕 · 贰》已毕 · 太玄经≥4重 · 经义≥55 · 辩才≥55',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '四夷宾服',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [openScene('scene_twg_01', JINJUN_TONGWENGUAN_ID)],
    },
    {
      id: 'act_jinjun_twg_banquet',
      label: '主持同文馆冬宴 · 折服辽夏使臣',
      subtitle: '礼乐典章折远使，稳固宋理盟约',
      regionId: 'bianliang',
      buildingId: 'bianliang_base_inn',
      badge: '四夷宾服',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_TONGWENGUAN_ID, 'twg_banquet_debate'),
      effects: [openScene('scene_twg_07', JINJUN_TONGWENGUAN_ID)],
    },
    {
      id: 'act_jinjun_twg_duel',
      label: '率甲士破西院 · 枪战鸠摩智',
      subtitle: '连破吐蕃护法番僧与大轮明王鸠摩智',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_watch',
      badge: '雪夜护藩',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_TONGWENGUAN_ID, 'twg_snow_night_duel'),
      effects: [openScene('scene_twg_13', JINJUN_TONGWENGUAN_ID)],
    },
    {
      id: 'act_jinjun_twg_farewell',
      label: '复命紫宸殿 · 送别大理使团',
      subtitle: '获赠点苍蹑云雪山骢与段氏纯阳吐纳诀',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '西南稳固',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_TONGWENGUAN_ID, 'twg_treaty_farewell'),
      effects: [openScene('scene_twg_21', JINJUN_TONGWENGUAN_ID)],
    },
  ],
  loadScenes: () => import('./jinjunTongwenguanQuest.scenes').then((m) => m.SCENES),
}
