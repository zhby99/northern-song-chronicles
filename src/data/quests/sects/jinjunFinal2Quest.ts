import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_FINAL_1_ID } from './jinjunFinal1Quest'

export const JINJUN_FINAL_2_ID = 'QST-SECT-33-FINAL-2'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 5 },
    qStatus(JINJUN_FINAL_1_ID, 'completed'),
    { type: 'skillAtLeast', key: '策论', min: 75 },
    { type: 'npcAlive', npcId: 'NPC-0001', npcName: '赵祯' },
    { type: 'npcAlive', npcId: 'NPC-0033', npcName: '种世衡' },
    { type: 'npcAlive', npcId: 'NPC-0084', npcName: '没藏讹庞' },
    { type: 'npcAlive', npcId: 'NPC-0103', npcName: '李秋水' },
    qStatus(JINJUN_FINAL_2_ID, 'not_started'),
    qStatus(JINJUN_FINAL_2_ID, 'not_completed'),
  ],
}

export function buildXixiaGuardGeneralNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'fn2_xixia_guard_general',
    name: '没藏氏铁鹞亲卫统领',
    title: '西夏王帐连环重骑大将',
    realm: '宗师下品',
    factionId: 'ORG-07',
    factionName: '西夏皇室',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“休想逼近丞相王帐！铁鹞子重骑踏碎宋军！”',
    stats: { hp: 3900, mp: 2800, agi: 75, res: 76 },
    equipped: {
      weapon: 'WPN-034',
      armor: 'ARM-011',
      shoes: 'BOT-006',
      bow: 'BOW-007',
      accessory1: 'ACC-012',
      accessory2: 'ACC-015',
      mount: 'MNT-003',
    },
    equippedArts: { neigong: 'MA-244', move1: 'MA-075', move2: 'MA-115' },
    learnedArts: [{ artId: 'MA-244', level: 8 }, { artId: 'MA-075', level: 8 }, { artId: 'MA-115', level: 8 }],
  })
}

export const JINJUN_FINAL_2_QUEST: QuestDefinition = {
  id: JINJUN_FINAL_2_ID,
  title: '裂夏 · 贰 · 横山铁鹞',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '宗师上品 ~ 宗师巅峰',
  maxOpponentRealm: '大宗师下品（西夏皇太妃李秋水 · 白虹掌力五合绝战）',
  recommendedNote:
    '大宋禁军 Lv.5 终局三部曲第二部（全四十五幕）。完成《裂夏 · 壹 · 杏林悲风》且策论 ≥ 75 后，赴【开封府 · 大内皇宫 · 垂拱紫宸正殿】早朝请战，西出潼关会合老帅种世衡决战横山！',
  startHint:
    '完成《裂夏 · 壹 · 杏林悲风》且策论 ≥ 75 后，前往【开封府 · 大内皇宫 · 垂拱紫宸正殿】早朝请缨西征。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_palace',
    spotId: 'bl_palace_hall',
    customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
  },
  startCondition: START_CONDITION,
  initialStepId: 'fn2_yanan_sandtable',
  summary:
    '西北烽烟蔽日，西夏权臣没藏讹庞率十万大军与三千“铁鹞子”连环重骑叩关泾原。主角于紫宸殿慷慨请战，受赐尚方宝剑拜泾原路行营都总管，统两万殿前司百战禁军西出潼关，会合筑青涧城威震夏虏的铁血老帅种世衡。横山决战当日，主角以千辆“偏厢鹿角战车”结成钢铁车城，种世衡亲镇中枢死锁铁鹞子冲锋；三千精锐神臂弓手三段轮射万矢齐发，洞穿夏军重甲！混战中种世衡为掩护变阵被西夏皇太妃李秋水隔空掌力震碎心脉，仍扶旗屹立不倒。主角以《太玄经》硬破李秋水“白虹掌力”刺伤其肩逼退强敌，复率重骑直捣夏军王帐，杀得十万夏军溃逃灵州！残阳如血下，种世衡临终将一生镇边神兵《皇祐神臂御赐弩》托付于主角。',
  steps: {
    fn2_yanan_sandtable: {
      id: 'fn2_yanan_sandtable',
      title: '西出潼关 · 会师种老帅',
      objective:
        '已受赐尚方宝剑拜泾原路行营都总管，大军已西出潼关！请赶赴【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】会同铁血老帅种世衡推演破铁鹞子之策！',
      nextHint: '前往【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台（ya_camp_main）】，点击「会师种世衡 · 沙盘推演破铁鹞」。',
      targetLocation: {
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_main',
        customLabel: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
      },
    },
    fn2_hengshan_showdown: {
      id: 'fn2_hengshan_showdown',
      title: '横山决战 · 血战李秋水',
      objective:
        '破敌之策已定！请统领大军开赴【秦州府 · 陇右古战场烽燧 · 断碑烽火望夏台（横山前线）】，列偏厢车城与神臂弓阵迎战没藏讹庞十万铁鹞子大军与西夏皇太妃李秋水！',
      nextHint: '前往【秦州府 · 陇右古战场烽燧 · 断碑烽火望夏台（qzf_longyou_east）】，点击「列阵横山 · 决战铁鹞与李秋水」。',
      targetLocation: {
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_east',
        customLabel: '秦州府 · 陇右古战场烽燧 · 断碑烽火望夏台（横山战线）',
      },
    },
    fn2_return_yanan: {
      id: 'fn2_return_yanan',
      title: '班师鄜延 · 祭奠老帅',
      objective:
        '横山大捷，种世衡老帅以身殉国，临终托付《皇祐神臂御赐弩》。请率得胜之师返回【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】整顿西北防务、告慰老帅英灵！',
      nextHint: '返回【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台（ya_camp_main）】，点击「班师鄜延 · 整顿西北防务」。',
      targetLocation: {
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_main',
        customLabel: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
      },
    },
  },
  spotActions: [
    {
      id: 'act_jinjun_fn2_start',
      label: '紫宸殿请战 · 受剑统军西征（Lv.5 主线 贰）',
      subtitle: '需完成《裂夏 · 壹》且策论 ≥ 75',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '裂夏贰',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [openScene('scene_fn2_01', JINJUN_FINAL_2_ID)],
    },
    {
      id: 'act_jinjun_fn2_sandtable',
      label: '会师种世衡 · 沙盘推演破铁鹞',
      subtitle: '制定偏厢鹿角车城与神臂弓三段轮射阵',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      badge: '帅帐推演',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_FINAL_2_ID, 'fn2_yanan_sandtable'),
      effects: [openScene('scene_fn2_07', JINJUN_FINAL_2_ID)],
    },
    {
      id: 'act_jinjun_fn2_battle',
      label: '列阵横山 · 决战铁鹞与李秋水',
      subtitle: '五回合硬撼大宗师李秋水，生劈夏军大将，受遗赠御赐弩',
      regionId: 'qinzhou',
      buildingId: 'qzf_longyou',
      spotId: 'qzf_longyou_east',
      badge: '横山决战',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_FINAL_2_ID, 'fn2_hengshan_showdown'),
      effects: [openScene('scene_fn2_15', JINJUN_FINAL_2_ID)],
    },
    {
      id: 'act_jinjun_fn2_return',
      label: '班师鄜延 · 整顿西北防务',
      subtitle: '告慰种世衡英灵，拨兵镇守青涧城',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      badge: '班师鄜延',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_FINAL_2_ID, 'fn2_return_yanan'),
      effects: [openScene('scene_fn2_34', JINJUN_FINAL_2_ID)],
    },
  ],
  loadScenes: () => import('./jinjunFinal2Quest.scenes').then((m) => m.SCENES),
}
