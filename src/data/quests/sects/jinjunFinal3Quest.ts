import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_FINAL_2_ID } from './jinjunFinal2Quest'

export const JINJUN_FINAL_3_ID = 'QST-SECT-33-FINAL-3'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 5 },
    qStatus(JINJUN_FINAL_2_ID, 'completed'),
    { type: 'npcAlive', npcId: 'NPC-0001', npcName: '赵祯' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-0184', npcName: '萧远风' },
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    qStatus(JINJUN_FINAL_3_ID, 'not_started'),
    qStatus(JINJUN_FINAL_3_ID, 'not_completed'),
  ],
}

export function buildMurongBoFinalNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'fn3_murong_bo_peak',
    name: '慕容博 · 绝顶复燕魔尊',
    title: '姑苏慕容氏绝顶大宗师',
    realm: '绝顶大宗师',
    factionId: 'SECT-10',
    factionName: '姑苏慕容',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/cutouts/fullbody/NPC-0104.webp',
    talk: '“少室山三合未杀你，燕子坞五合未留你，今日在雁门关下，便拿你这大宋柱石的人头祭我大燕江山！”',
    stats: { hp: 7200, mp: 5800, agi: 92, res: 88 },
    equipped: {
      weapon: 'WPN-010',
      armor: 'ARM-004',
      shoes: 'BOT-003',
      bow: 'BOW-004',
      accessory1: 'ACC-005',
      accessory2: 'ACC-008',
      mount: 'MNT-002',
    },
    equippedArts: { neigong: 'MA-013', qinggong: 'MA-029', move1: 'MA-025', move2: 'MA-045' },
    learnedArts: [
      { artId: 'MA-013', level: 10 },
      { artId: 'MA-029', level: 10 },
      { artId: 'MA-025', level: 10 },
      { artId: 'MA-045', level: 10 },
    ],
  })
}

export const JINJUN_FINAL_3_QUEST: QuestDefinition = {
  id: JINJUN_FINAL_3_ID,
  title: '定鼎 · 叁 · 血月雁门',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'yanan',
  recommendedRealm: '宗师巅峰 ~ 绝顶大宗师',
  maxOpponentRealm: '绝顶大宗师（慕容博 · 参合神指斗转星移终极死战）',
  recommendedNote:
    '大宋禁军 Lv.5 终局大结局（全五十幕）。完成《裂夏 · 贰 · 横山铁鹞》后，于【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】接八百里黑羽檄文，千里东驰雁门关决战萧远风与慕容博！',
  startHint:
    '完成《裂夏 · 贰 · 横山铁鹞》后，在【延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台】接领河北八百里黑羽檄文，即刻千里驰援雁门关。',
  startLocation: {
    regionId: 'yanan',
    buildingId: 'ya_camp',
    spotId: 'ya_camp_main',
    customLabel: '延安府 · 鄜延边军大营 · 中军帅帐 · 沙盘台',
  },
  startCondition: START_CONDITION,
  initialStepId: 'fn3_yanmen_relief',
  summary:
    '横山大捷露布刚传回京师，八百里黑羽檄文却在雪夜撞开东京城门：慕容博联手辽南京武林统制萧远风裹挟十万契丹铁林大军陈兵雁门关外！远在陕北的主角不等朝廷调令，毅然率领一万浴血余生的殿前司精锐禁军千里东驰雁门关。血月寒夜下，萧峰正陷于家国忠义两难绝境苦劝辽军止戈，却遭慕容博与萧远风暗设十面埋伏欲加害。主角背负皇祐神臂御赐弩、手提天波透甲金枪率万军洞开雄关杀出！乱军中主角数合挑杀宿敌萧远风斩断多年心魔，随后在雁门绝壁之下顶着重甲尽碎之危，以天波透甲金枪正面贯穿绝顶大宗师慕容博胸膛，将其死死钉在雁门城墙巨石之上，彻底终结姑苏慕容两代复国迷梦！萧峰亦生擒辽军先锋迫辽廷立誓三十年不犯宋境，向城头主角举碗敬别后纵马隐入塞外风雪。次年开春凯旋东京，仁宗亲率百官十里郊迎，于大庆殿册封主角为检校太尉、枢密使，赐丹书铁券、绘像景灵宫，一代军神传奇万古流芳！',
  steps: {
    fn3_yanmen_relief: {
      id: 'fn3_yanmen_relief',
      title: '千里驰援 · 血月战雁门',
      objective:
        '已接河北八百里黑羽檄文！请不等朝廷调令，率领一万百战殿前司禁军千里东驰【雁门关 · 雁门雄关城楼 · 雄关箭楼 · 望胡台】，救护萧峰并迎战宿敌萧远风与绝顶大宗师慕容博！',
      nextHint: '前往【雁门关 · 雁门雄关城楼 · 雄关箭楼 · 望胡台（ym_tower_main）】，点击「万军出雄关 · 决战萧远风与慕容博」。',
      targetLocation: {
        regionId: 'yanmenguan',
        buildingId: 'ym_tower',
        spotId: 'ym_tower_main',
        customLabel: '雁门关 · 雁门雄关城楼 · 雄关箭楼 · 望胡台',
      },
    },
    fn3_kaifeng_triumph: {
      id: 'fn3_kaifeng_triumph',
      title: '十里郊迎 · 封检校太尉',
      objective:
        '慕容博与萧远风伏诛，大辽立誓三十年不犯宋境！请整军凯旋【开封府 · 大内皇宫 · 垂拱紫宸正殿】，接受官家十里郊迎与大庆殿太尉枢密使册封！',
      nextHint: '返回【开封府 · 大内皇宫 · 垂拱紫宸正殿（bl_palace_hall）】，点击「大庆殿受封 · 检校太尉枢密使」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_hall',
        customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿（大庆殿受封）',
      },
    },
  },
  spotActions: [
    {
      id: 'act_jinjun_fn3_start',
      label: '接黑羽檄文 · 千里驰援雁门关（Lv.5 终局 叁）',
      subtitle: '需完成《裂夏 · 贰 · 横山铁鹞》',
      regionId: 'yanan',
      buildingId: 'ya_camp',
      spotId: 'ya_camp_main',
      badge: '定鼎叁',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [openScene('scene_fn3_01', JINJUN_FINAL_3_ID)],
    },
    {
      id: 'act_jinjun_fn3_yanmen',
      label: '万军出雄关 · 决战萧远风与慕容博',
      subtitle: '血月雁门斩宿敌萧远风，天波金枪钉杀绝顶慕容博',
      regionId: 'yanmenguan',
      buildingId: 'ym_tower',
      spotId: 'ym_tower_main',
      badge: '血月决战',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_FINAL_3_ID, 'fn3_yanmen_relief'),
      effects: [openScene('scene_fn3_11', JINJUN_FINAL_3_ID)],
    },
    {
      id: 'act_jinjun_fn3_triumph',
      label: '大庆殿受封 · 检校太尉枢密使',
      subtitle: '赐丹书铁券、绘像景灵宫，定鼎大宋山河',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '定鼎山河',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_FINAL_3_ID, 'fn3_kaifeng_triumph'),
      effects: [openScene('scene_fn3_34', JINJUN_FINAL_3_ID)],
    },
  ],
  loadScenes: () => import('./jinjunFinal3Quest.scenes').then((m) => m.SCENES),
}
