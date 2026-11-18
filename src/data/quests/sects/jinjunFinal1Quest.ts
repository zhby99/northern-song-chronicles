import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_YONGZHOU_NANMAN_ID } from './jinjunYongzhouNanmanQuest'

export const JINJUN_FINAL_1_ID = 'QST-SECT-33-FINAL-1'

const START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-33', minRank: 5 },
    qStatus(JINJUN_YONGZHOU_NANMAN_ID, 'completed'),
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    { type: 'npcAlive', npcId: 'NPC-0120', npcName: '慕容复' },
    qStatus(JINJUN_FINAL_1_ID, 'not_started'),
    qStatus(JINJUN_FINAL_1_ID, 'not_completed'),
  ],
}

export function buildDuanYanqingNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'fn1_duan_yanqing',
    name: '段延庆 · 恶贯满盈',
    title: '西夏一品堂四大恶人之首',
    realm: '宗师下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“（腹语）大宋禁军统帅与乔峰联手又如何？尝尝老夫的一阳指铁杖！”',
    stats: { hp: 3800, mp: 3000, agi: 76, res: 72 },
    equipped: {
      weapon: 'WPN-036',
      armor: 'ARM-012',
      shoes: 'BOT-006',
      bow: 'BOW-006',
      accessory1: 'ACC-012',
      accessory2: 'ACC-014',
      mount: 'MNT-008',
    },
    equippedArts: { neigong: 'MA-220', qinggong: 'MA-157', move1: 'MA-023', move2: 'MA-133' },
    learnedArts: [
      { artId: 'MA-220', level: 8 },
      { artId: 'MA-157', level: 8 },
      { artId: 'MA-023', level: 8 },
      { artId: 'MA-133', level: 8 },
    ],
  })
}

export const JINJUN_FINAL_1_QUEST: QuestDefinition = {
  id: JINJUN_FINAL_1_ID,
  title: '裂夏 · 壹 · 杏林悲风',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '宗师上品',
  maxOpponentRealm: '宗师下品（段延庆一阳指铁杖 · 慕容复疯魔剑路）',
  recommendedNote:
    '大宋禁军 Lv.5 终局三部曲第一部（全三十五幕）。完成《邕州道 · 蛮烟瘴雨平》晋升 Lv.5 殿前都指挥使后，赴【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】领密报南下无锡！',
  startHint:
    '晋升 Lv.5 殿前都指挥使并完成《邕州道》后，前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】接领皇城司十万火急军情。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_jinjun',
    spotId: 'bl_jj_platform',
    customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
  },
  startCondition: START_CONDITION,
  initialStepId: 'fn1_xinzilin_rescue',
  summary:
    '执掌殿前司大印未久，皇城司急报西夏一品堂赫连铁树与慕容复密谋在无锡杏子林以“悲酥清风”一举覆灭丐帮。主角亲率两百殿前司玄甲缇骑星夜南下，玄铁盾阵挡下漫天毒箭，翻身落马与丐帮帮主乔峰背靠背死战！乔峰降龙十八掌震断段延庆铁杖，主角则以天波透甲金枪看破慕容复心魔剑路，横扫重创其右肩废去大半武功，迫得赫连铁树拖着癫狂慕容复败逃。当夜主角与乔峰于无锡松鹤楼痛饮结为生死知己，审俘得知西夏权臣没藏讹庞已集结十万大军与铁鹞子重骑叩关泾原，潜逃大辽的慕容博亦在雁门关外掀起滔天巨浪！',
  steps: {
    fn1_xinzilin_rescue: {
      id: 'fn1_xinzilin_rescue',
      title: '杏林救丐帮 · 联手战双凶',
      objective:
        '已点齐两百殿前司玄甲缇骑星夜南下两浙路！请速赶往【苏州府 · 虎丘剑池 · 千人石试剑台（近无锡杏子林）】驰援中了“悲酥清风”之毒的丐帮帮主乔峰！',
      nextHint: '前往【苏州府 · 虎丘剑池 · 千人石试剑台（sz_hq_stone）】，点击「玄甲破杏林 · 联手乔峰战一品堂」。',
      targetLocation: {
        regionId: 'suzhou',
        buildingId: 'sz_huqiu',
        spotId: 'sz_hq_stone',
        customLabel: '苏州府 · 虎丘剑池 · 千人石试剑台（杏子林驰援）',
      },
    },
    fn1_songhelou_drink: {
      id: 'fn1_songhelou_drink',
      title: '松鹤楼痛饮 · 审俘惊噩耗',
      objective:
        '已击退段延庆与慕容复，救醒丐帮群豪！请与乔峰同赴【苏州府 · 姑苏临河酒楼（无锡松鹤楼）】痛饮结交，并连夜审讯一品堂俘虏！',
      nextHint: '前往【苏州府 · 姑苏临河酒楼（suzhou_base_tavern）】，点击「松鹤楼痛饮 · 审讯一品堂俘虏」。',
      targetLocation: {
        regionId: 'suzhou',
        buildingId: 'suzhou_base_tavern',
        customLabel: '苏州府 · 姑苏临河酒楼（松鹤楼）',
      },
    },
    fn1_return_kaifeng: {
      id: 'fn1_return_kaifeng',
      title: '星夜返汴梁 · 面奏西北危局',
      objective:
        '已从一品堂俘虏口中审出西夏大军叩关泾原、辽军窥伺雁门的惊天密谋！请率缇骑星夜赶回【开封府 · 大内皇宫 · 垂拱紫宸正殿】面奏官家！',
      nextHint: '返回【开封府 · 大内皇宫 · 垂拱紫宸正殿（bl_palace_hall）】，点击「星夜返京 · 面奏西北烽火」。',
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
      id: 'act_jinjun_fn1_start',
      label: '接皇城司急报 · 率缇骑驰援杏子林（Lv.5 主线 壹）',
      subtitle: '需禁军 Lv.5 殿前都指挥使且完成《邕州道》',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      badge: '裂夏壹',
      tone: 'primary',
      visibleWhen: START_CONDITION,
      effects: [openScene('scene_fn1_01', JINJUN_FINAL_1_ID)],
    },
    {
      id: 'act_jinjun_fn1_rescue',
      label: '玄甲破杏林 · 联手乔峰战一品堂',
      subtitle: '迎战段延庆一阳指铁杖，重创慕容复右肩经脉',
      regionId: 'suzhou',
      buildingId: 'sz_huqiu',
      spotId: 'sz_hq_stone',
      badge: '杏林血战',
      tone: 'danger',
      visibleWhen: atStep(JINJUN_FINAL_1_ID, 'fn1_xinzilin_rescue'),
      effects: [openScene('scene_fn1_09', JINJUN_FINAL_1_ID)],
    },
    {
      id: 'act_jinjun_fn1_drink',
      label: '松鹤楼痛饮 · 审讯一品堂俘虏',
      subtitle: '与乔峰结为生死知己，获知西夏大军叩关泾原',
      regionId: 'suzhou',
      buildingId: 'suzhou_base_tavern',
      badge: '知己夜话',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_FINAL_1_ID, 'fn1_songhelou_drink'),
      effects: [openScene('scene_fn1_26', JINJUN_FINAL_1_ID)],
    },
    {
      id: 'act_jinjun_fn1_return',
      label: '星夜返京 · 面奏西北烽火',
      subtitle: '将一品堂密谋禀明官家',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      badge: '面奏官家',
      tone: 'primary',
      visibleWhen: atStep(JINJUN_FINAL_1_ID, 'fn1_return_kaifeng'),
      effects: [openScene('scene_fn1_35', JINJUN_FINAL_1_ID)],
    },
  ],
  loadScenes: () => import('./jinjunFinal1Quest.scenes').then((m) => m.SCENES),
}
