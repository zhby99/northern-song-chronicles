import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_3_ID } from './jinjunMurongArc3Quest'
import { JINJUN_TONGWENGUAN_ID } from './jinjunTongwenguanQuest'

export const JINJUN_YONGZHOU_NANMAN_ID = 'QST-SECT-33-YONGZHOU-NANMAN'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 4 },
    qStatus(JINJUN_MURONG_ARC_3_ID, 'completed'),
    qStatus(JINJUN_TONGWENGUAN_ID, 'completed'),
    { type: 'skillAtLeast', key: '骑术', min: 65 },
    { type: 'skillAtLeast', key: '策论', min: 65 },
    { type: 'npcAlive', npcId: 'NPC-0001', npcName: '赵祯' },
    { type: 'npcAlive', npcId: 'NPC-0031', npcName: '狄青' },
    { type: 'npcAlive', npcId: 'NPC-0032', npcName: '杨文广' },
    { type: 'npcAlive', npcId: 'NPC-0094', npcName: '侬智高' },
    { type: 'npcAlive', npcId: 'NPC-0181', npcName: '摘星子' },
    qStatus(JINJUN_YONGZHOU_NANMAN_ID, 'not_started'),
    qStatus(JINJUN_YONGZHOU_NANMAN_ID, 'not_completed'),
  ],
}

export function buildXingxiuPoisonElderNpc(index: 1 | 2): NodeNpc {
  return makeQuestNpc({
    id: `yn_xingxiu_poison_${index}`,
    name: index === 1 ? '星宿炼毒巫祝' : '南蛮五毒蛊师',
    title: '苗疆蛊坛毒术护法',
    realm: '一流上品',
    factionId: 'SECT-19',
    factionName: '星宿派',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk:
      index === 1
        ? '星宿神功炼毒百载，岂容北朝甲士焚我蛊坛！'
        : '十万大山瘴疠无边，尔等宋兵皆要化作脓水！',
    stats: { hp: 2680, mp: 2100, agi: 66, res: 62 },
    equipped: {
      weapon: 'WPN-032',
      armor: 'ARM-016',
      shoes: 'BOT-008',
      bow: 'BOW-008',
      accessory1: 'ACC-017',
      accessory2: 'ACC-019',
      mount: 'MNT-014',
    },
    equippedArts: { neigong: 'MA-095', move1: 'MA-104', move2: 'MA-108' },
    learnedArts: [{ artId: 'MA-095', level: 8 }, { artId: 'MA-104', level: 8 }, { artId: 'MA-108', level: 7 }],
  })
}

export const JINJUN_YONGZHOU_NANMAN_QUEST: QuestDefinition = {
  id: JINJUN_YONGZHOU_NANMAN_ID,
  title: '邕州道 · 蛮烟瘴雨平',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '宗师中品 ~ 宗师上品',
  maxOpponentRealm: '宗师下品（摘星子化功毒雾 · 侬智高蛮阵合围）',
  recommendedNote:
    '大宋禁军 Lv.4 晋升 Lv.5 主线（全三十五幕）。须完成《破燕 · 叁》与《同文馆 · 四夷宾服录》，且骑术 ≥ 65、策论 ≥ 65 后，赴【开封府 · 大内皇宫 · 垂拱紫宸正殿】随狄青南征邕州！',
  startHint:
    '完成《破燕 · 叁》与《同文馆》后，且骑术 ≥ 65、策论 ≥ 65，前往【开封府 · 大内皇宫 · 垂拱紫宸正殿】请命随狄青南征。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_palace',
    spotId: 'bl_palace_hall',
    customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
  },
  startCondition: START_CONDITION,
  initialStepId: 'yn_lingnan_muster',
  summary:
    '南蛮枭雄侬智高勾结星宿派妖人，裹挟十万蛮兵攻破邕州、进围广州。枢密副使狄青于垂拱殿慨然请缨，点名调主角与天波杨府传人杨文广为正副先锋南下平叛。主角与杨文广深山夜焚星宿派炼毒蛊坛、斩骄兵肃军纪；复于元宵张灯麻痹敌哨，子夜暴雨奇袭度过天险昆仑关！归仁铺旷野大决战中，主角与杨文广双枪合璧、火药箭惊散南蛮象阵，于漫天毒雾中一枪刺穿星宿派大师兄摘星子咽喉，击溃侬智高平定岭南。桂林漓江庆功夜，杨文广郑重将杨家世代相传的天阶神兵《天波透甲金枪》托付于主角。班师回朝之日，宋仁宗亲御宣德门受俘，当殿册封主角为大宋禁军统帅——Lv.5 殿前都指挥使！',
  steps: {
    yn_lingnan_muster: {
      id: 'yn_lingnan_muster',
      title: '岭南瘴疠 · 夜焚炼毒蛊坛',
      objective:
        '已随狄青与杨文广率三千京营精锐与蕃落铁骑南下岭南！请前往【广州府 · 药洲九曜园（经制幕府） · 九曜石轩 · 经制帅堂】严查水井瘴毒，并亲率死士夜探密林焚毁星宿派蛊坛！',
      nextHint: '前往【广州府 · 药洲九曜园 · 九曜石轩（gz_yaozhou_main）】，点击「整肃军纪 · 夜焚星宿蛊坛」。',
      targetLocation: {
        regionId: 'guangzhou',
        buildingId: 'gz_yaozhou',
        spotId: 'gz_yaozhou_main',
        customLabel: '广州府 · 药洲九曜园 · 九曜石轩',
      },
    },
    yn_guirenpu_battle: {
      id: 'yn_guirenpu_battle',
      title: '昆仑奇袭 · 归仁铺破象阵',
      objective:
        '元宵张灯已麻痹敌军暗哨！请前往【广州府 · 南海神庙 · 祝融大殿（gz_nanhai_main）】誓师点将，子夜暴雨突袭昆仑关，并于归仁铺旷野迎战侬智高象阵与星宿大师兄摘星子！',
      nextHint: '前往【广州府 · 南海神庙 · 祝融大殿（gz_nanhai_main）】，点击「奇袭昆仑关 · 决战归仁铺」。',
      targetLocation: {
        regionId: 'guangzhou',
        buildingId: 'gz_nanhai',
        spotId: 'gz_nanhai_main',
        customLabel: '广州府 · 南海神庙 · 祝融大殿',
      },
    },
    yn_xuande_promotion: {
      id: 'yn_xuande_promotion',
      title: '宣德门受俘 · 册封殿前帅',
      objective:
        '岭南全境平定，杨文广已在桂林漓江托付《天波透甲金枪》！请随狄青班师凯旋【开封府 · 大内皇宫 · 垂拱紫宸正殿】，受官家册封 Lv.5 殿前都指挥使！',
      nextHint: '返回【开封府 · 大内皇宫 · 垂拱紫宸正殿（bl_palace_hall）】，点击「宣德门献俘 · 受封殿前都指挥使」。',
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
      id: 'act_jinjun_yn_start',
      label: '垂拱殿随狄青请缨 · 南征邕州（晋升 Lv.5 主线）',
      subtitle: '需《破燕 · 叁》与《同文馆》已毕 · 骑术≥65 · 策论≥65',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '南征平蛮',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [openScene('scene_yn_01', JINJUN_YONGZHOU_NANMAN_ID)],
    },
    {
      id: 'act_jinjun_yn_poison',
      label: '整肃军纪 · 夜焚星宿蛊坛',
      subtitle: '协同杨文广防瘴，直捣星宿派密林蛊坛',
      regionId: 'guangzhou',
      buildingId: 'gz_yaozhou',
      spotId: 'gz_yaozhou_main',
      badge: '焚坛破毒',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_YONGZHOU_NANMAN_ID, 'yn_lingnan_muster'),
      effects: [openScene('scene_yn_06', JINJUN_YONGZHOU_NANMAN_ID)],
    },
    {
      id: 'act_jinjun_yn_battle',
      label: '奇袭昆仑关 · 决战归仁铺',
      subtitle: '火药箭破象阵，斩星宿派摘星子',
      regionId: 'guangzhou',
      buildingId: 'gz_nanhai',
      spotId: 'gz_nanhai_main',
      badge: '昆仑奇袭',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_YONGZHOU_NANMAN_ID, 'yn_guirenpu_battle'),
      effects: [openScene('scene_yn_17', JINJUN_YONGZHOU_NANMAN_ID)],
    },
    {
      id: 'act_jinjun_yn_promote',
      label: '宣德门献俘 · 受封殿前都指挥使',
      subtitle: '晋升 SECT-33 Lv.5 殿前都指挥使',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '登坛拜帅',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_YONGZHOU_NANMAN_ID, 'yn_xuande_promotion'),
      effects: [openScene('scene_yn_27', JINJUN_YONGZHOU_NANMAN_ID)],
    },
  ],
  loadScenes: () => import('./jinjunYongzhouNanmanQuest.scenes').then((m) => m.SCENES),
}
