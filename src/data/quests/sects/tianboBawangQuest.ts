import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { NPC_DB_MAP } from '../../gameDb'
import { DEFAULT_EQUIPPED_SLOTS } from '../../itemsDb'

const QUEST_ID = 'QST_TIANBO_BAWANG'

/**
 * 刚性序章门槛（防前期偷跑）：
 * - 江湖侠义 ≥ 120，且非 SECT-16 西夏一品堂 / 背负通辽嫌疑者
 * - 已习得 MA-116《六合大枪》或 MA-174《杨氏梨花枪》任意一门 ≥ 6 重
 * - 实战气血上限 ≥ 2,800、骑术 ≥ 65
 */
const PROLOGUE_ENTRY_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'chivalryAtLeast', min: 120 },
    {
      type: 'not',
      condition: { type: 'inSect', sectId: 'SECT-16' },
      reason: '西夏一品堂门人不可接取天波杨府传承',
    },
    {
      type: 'not',
      condition: { type: 'flag', flag: 'liao_suspicion_debuff', op: 'truthy' },
      reason: '背负通辽嫌疑者不可接取天波杨府传承',
    },
    {
      type: 'any',
      conditions: [
        { type: 'learnedArtAtLeast', artId: 'MA-116', minLevel: 6 },
        { type: 'learnedArtAtLeast', artId: 'MA-174', minLevel: 6 },
      ],
      hint: '须习得 MA-116《六合大枪》或 MA-174《杨氏梨花枪》任意一门达到第 6 重',
    },
    { type: 'combatStatAtLeast', key: 'maxHp', min: 2800 },
    { type: 'skillAtLeast', key: '骑术', min: 65 },
  ],
}

/**
 * 终章传功门槛（集齐三道信物后校验）：
 * - 根骨 ≥ 82、实战气血上限 ≥ 3,200、骑术 ≥ 80
 */
const FINALE_MERGE_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'flag', flag: 'tb_branch_a_done', op: 'truthy', label: '已完成【枝干甲·太原除奸与金鞭试枪】' },
    { type: 'flag', flag: 'tb_branch_b_done', op: 'truthy', label: '已完成【枝干乙·五台山破禅与五郎枪意】' },
    { type: 'flag', flag: 'tb_branch_c_done', op: 'truthy', label: '已完成【枝干丙·雁门降龙与穆柯箭试】' },
    { type: 'hasItem', itemId: 'ITM-MSC-016', qty: 1 },
    { type: 'hasItem', itemId: 'ITM-MSC-017', qty: 1 },
    { type: 'hasItem', itemId: 'ITM-MSC-018', qty: 1 },
    { type: 'talentAtLeast', key: '根骨', min: 82 },
    { type: 'combatStatAtLeast', key: 'maxHp', min: 3200 },
    { type: 'skillAtLeast', key: '骑术', min: 80 },
  ],
}

function buildYangPaifengNpc(): NodeNpc {
  const base = NPC_DB_MAP['NPC-0252']
  return {
    ...(base ?? {
      id: 'NPC-0252',
      name: '杨排风',
      title: '天波杨府护院女统制',
      realm: '二流上品',
      factionId: 'ORG-04',
      factionName: '天波杨府',
      talk: '三十六路少林烧火棍，接得住再谈杨家枪！',
      stats: { hp: 1888, mp: 1450, agi: 52, res: 40, isBenchmark: false },
    }),
    avatarUrl: '/assets/characters/templates/tpl_emei_heroine_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_emei_heroine_fb.jpg',
    stats: {
      ...(base?.stats ?? { hp: 1888, mp: 1450, agi: 52, res: 40, isBenchmark: false }),
      hp: 1888,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-095',
    },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-157',
      move1: 'MA-192',
      move2: 'MA-153',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 5, exp: 0 },
      { artId: 'MA-157', level: 5, exp: 0 },
      { artId: 'MA-192', level: 8, exp: 0 },
      { artId: 'MA-153', level: 6, exp: 0 },
    ],
    talk: '杨令公当年血战陈家谷，只将半卷《杨家霸王枪》带回河东。想让太原的文广少爷传枪，先接下我三十六路少林烧火棍！',
  }
}

function buildTaiyuanXixiaSpyNpc(): NodeNpc {
  return {
    id: 'NPC-0836',
    name: '没藏泽渊',
    title: '西夏一品堂河东暗桩首领',
    realm: '二流下品',
    factionId: 'SECT-16',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '既已撞破我二人身份，今夜便留在这天波旧祠做鬼吧！',
    stats: {
      hp: 860,
      mp: 620,
      agi: 48,
      res: 28,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-043',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-157',
      move1: 'MA-133',
      move2: 'MA-175',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-245', level: 4, exp: 0 },
      { artId: 'MA-157', level: 4, exp: 0 },
      { artId: 'MA-133', level: 5, exp: 0 },
      { artId: 'MA-175', level: 4, exp: 0 },
    ],
  }
}

function buildTaiyuanLiaoSpyNpc(): NodeNpc {
  return {
    id: 'NPC-0871',
    name: '乌古文海',
    title: '大辽南院潜伏死士',
    realm: '三流上品',
    factionId: 'SECT-31',
    factionName: '大辽南院暗桩',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    talk: '烧毁《河东边防军阵残图》，杀出去！',
    stats: {
      hp: 720,
      mp: 480,
      agi: 44,
      res: 26,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-047',
    },
    equippedArts: {
      neigong: 'MA-243',
      qinggong: null,
      move1: 'MA-152',
      move2: 'MA-151',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-243', level: 4, exp: 0 },
      { artId: 'MA-152', level: 4, exp: 0 },
      { artId: 'MA-151', level: 4, exp: 0 },
    ],
  }
}

function buildHuyanQingNpc(): NodeNpc {
  const base = NPC_DB_MAP['NPC-0228']
  return {
    ...(base ?? {
      id: 'NPC-0228',
      name: '呼延庆',
      title: '太原将门少帅',
      realm: '一流下品',
      factionId: 'ORG-04',
      factionName: '河东将门',
      talk: '呼延家三十六路硬鞭在此，岂容外人轻易沾手天波杨家枪！',
      stats: { hp: 2128, mp: 2048, agi: 58, res: 52, isBenchmark: false },
    }),
    avatarUrl: '/assets/characters/avatars/NPC-0228.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0228.jpg',
    stats: {
      ...(base?.stats ?? { hp: 2128, mp: 2048, agi: 58, res: 52, isBenchmark: false }),
      hp: 2128,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-046',
    },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-138',
      move1: 'MA-173',
      move2: 'MA-116',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 6, exp: 0 },
      { artId: 'MA-138', level: 5, exp: 0 },
      { artId: 'MA-173', level: 8, exp: 0 },
      { artId: 'MA-116', level: 6, exp: 0 },
    ],
    talk: '少废话！接住我呼延家浑铁金鞭不退半步，这枚【太原呼延金鞭令】才算你名正言顺！',
  }
}

function buildMinganZenNpc(isStoneTrial: boolean): NodeNpc {
  return {
    id: 'NPC-0504',
    name: '明安大师',
    title: isStoneTrial ? '五台山清凉寺首座 · 演棍护法' : '五台山清凉寺首座',
    realm: isStoneTrial ? '二流上品' : '二流下品',
    factionId: 'SECT-03',
    factionName: '五台山清凉寺',
    avatarUrl: '/assets/characters/templates/tpl_wutai_monk_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wutai_monk_male_fb.jpg',
    talk: isStoneTrial
      ? '五郎师祖昔年化枪为棍，悟得“置之死地而后生”之回马真意。施主一味固守可参不透这面石碑！'
      : '施主既未能以经义折服老衲，便先接下我清凉寺护法棍阵！',
    stats: isStoneTrial
      ? { hp: 1380, mp: 1200, agi: 52, res: 46, isBenchmark: false }
      : { hp: 960, mp: 780, agi: 44, res: 36, isBenchmark: false },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-036',
    },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-157',
      move1: 'MA-134',
      move2: 'MA-153',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: isStoneTrial ? 6 : 4, exp: 0 },
      { artId: 'MA-157', level: 4, exp: 0 },
      { artId: 'MA-134', level: isStoneTrial ? 7 : 5, exp: 0 },
      { artId: 'MA-153', level: isStoneTrial ? 7 : 5, exp: 0 },
    ],
  }
}

function buildWutaiGuardianMonkNpc(isStoneTrial: boolean): NodeNpc {
  return {
    id: isStoneTrial ? 'tb_wutai_stone_elder' : 'tb_wutai_zen_monk',
    name: isStoneTrial ? '清凉护法高僧' : '清凉寺护法武僧',
    title: isStoneTrial ? '演棍石台守碑高僧' : '松风禅亭值殿武僧',
    realm: isStoneTrial ? '一流下品' : '三流上品',
    factionId: 'SECT-03',
    factionName: '五台山清凉寺',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: isStoneTrial
      ? '阿弥陀佛！五郎八卦棍重如山岳，施主且看棍！'
      : '得罪了，请施主赐教清凉寺齐眉棍！',
    stats: isStoneTrial
      ? { hp: 1620, mp: 1350, agi: 55, res: 50, isBenchmark: false }
      : { hp: 780, mp: 620, agi: 42, res: 32, isBenchmark: false },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: isStoneTrial ? 'WPN-036' : 'WPN-068',
    },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: null,
      move1: 'MA-134',
      move2: 'MA-117',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: isStoneTrial ? 6 : 4, exp: 0 },
      { artId: 'MA-134', level: isStoneTrial ? 7 : 4, exp: 0 },
      { artId: 'MA-117', level: isStoneTrial ? 6 : 4, exp: 0 },
    ],
  }
}

function buildMuGuiyunAllyNpc(): NodeNpc {
  const base = NPC_DB_MAP['NPC-0253']
  return {
    ...(base ?? {
      id: 'NPC-0253',
      name: '穆桂云',
      title: '雁门关女将 · 穆柯传人',
      realm: '二流上品',
      factionId: 'ORG-04',
      factionName: '天波杨府',
      talk: '少侠尽管突阵，侧翼铁骑交由桂云羽箭与梨花枪策应！',
      stats: { hp: 1838, mp: 1360, agi: 58, res: 41, isBenchmark: false },
    }),
    avatarUrl: '/assets/characters/templates/tpl_woman_general_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_woman_general_fb.jpg',
    talk: '少侠尽管突阵，侧翼铁骑交由桂云羽箭与梨花枪策应！',
    stats: {
      hp: 2050,
      mp: 1550,
      agi: 60,
      res: 46,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-054',
    },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-138',
      move1: 'MA-174',
      move2: 'MA-116',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 6, exp: 0 },
      { artId: 'MA-138', level: 6, exp: 0 },
      { artId: 'MA-174', level: 8, exp: 0 },
      { artId: 'MA-116', level: 6, exp: 0 },
    ],
  }
}

function buildYanmenLiaoVanguardNpc(advantaged: boolean): NodeNpc {
  return {
    id: 'tb_yanmen_liao_commander',
    name: '萧铁古 · 辽军先锋统领',
    title: advantaged ? '大辽南院突袭统领（已失先机）' : '大辽南院重甲突袭统领',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '大辽南院',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    talk: '踏平雁门粮道，断绝河东宋军军资！',
    stats: {
      hp: 2150,
      mp: 1650,
      agi: advantaged ? 48 : 57,
      res: 56,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-019',
    },
    equippedArts: {
      neigong: 'MA-243',
      qinggong: null,
      move1: 'MA-073',
      move2: 'MA-115',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-243', level: 6, exp: 0 },
      { artId: 'MA-073', level: 5, exp: 0 },
      { artId: 'MA-115', level: 6, exp: 0 },
    ],
  }
}

function buildYanmenLiaoHeavyCavalryNpc(advantaged: boolean): NodeNpc {
  return {
    id: 'tb_yanmen_liao_cavalry',
    name: '契丹铁林重骑百夫长',
    title: advantaged ? '铁林冷锻重骑（仰攻受挫）' : '铁林冷锻重骑',
    realm: '二流上品',
    factionId: 'SECT-31',
    factionName: '大辽南院',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    talk: '铁林重铠刀枪不入，碾碎宋军前哨！',
    stats: {
      hp: 1580,
      mp: 1200,
      agi: advantaged ? 44 : 52,
      res: 54,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-047',
    },
    equippedArts: {
      neigong: 'MA-243',
      qinggong: null,
      move1: 'MA-152',
      move2: 'MA-116',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-243', level: 5, exp: 0 },
      { artId: 'MA-152', level: 6, exp: 0 },
      { artId: 'MA-116', level: 5, exp: 0 },
    ],
  }
}

function buildDiQingAllyNpc(): NodeNpc {
  const base = NPC_DB_MAP['NPC-0031']
  return {
    ...(base ?? {
      id: 'NPC-0031',
      name: '狄青',
      title: '枢密副使 · 面涅将军',
      realm: '一流上品',
      factionId: 'ORG-04',
      factionName: '大宋枢密院',
      talk: '少侠尽管施展回马绝枪，本帅率背嵬铁骑为你压住侧翼！',
      stats: { hp: 3537, mp: 3355, agi: 75, res: 64, isBenchmark: false },
    }),
    avatarUrl: '/assets/characters/avatars/NPC-0031.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0031.jpg',
    talk: '少侠尽管施展回马绝枪，本帅率背嵬铁骑为你压住侧翼！',
    stats: {
      hp: 3537,
      mp: 3355,
      agi: 74,
      res: 64,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-034',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-097',
      move1: 'MA-092',
      move2: 'MA-115',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-245', level: 7, exp: 0 },
      { artId: 'MA-097', level: 6, exp: 0 },
      { artId: 'MA-092', level: 7, exp: 0 },
      { artId: 'MA-115', level: 8, exp: 0 },
    ],
  }
}

function buildNuerhaiBossNpc(): NodeNpc {
  const base = NPC_DB_MAP['NPC-0152']
  return {
    ...(base ?? {
      id: 'NPC-0152',
      name: '努儿海',
      title: '西夏一品堂左护法',
      realm: '一流上品',
      factionId: 'SECT-16',
      factionName: '西夏一品堂',
      stats: { hp: 3414, mp: 3272, agi: 69, res: 67, isBenchmark: false },
    }),
    avatarUrl: '/assets/characters/avatars/NPC-0152.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0152.jpg',
    stats: {
      hp: 3280,
      mp: 2950,
      agi: 69,
      res: 62,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-043',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-138',
      move1: 'MA-072',
      move2: 'MA-133',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-245', level: 7, exp: 0 },
      { artId: 'MA-138', level: 6, exp: 0 },
      { artId: 'MA-072', level: 7, exp: 0 },
      { artId: 'MA-133', level: 8, exp: 0 },
    ],
    talk: '狄青老儿与天波余孽，今日叫你们见识西夏一品堂与铁鹞子合围之威！',
  }
}

function buildManmieTieyaoziNpc(): NodeNpc {
  return {
    id: 'tb_yanan_manmie',
    name: '漫咩 · 铁鹞子统帅',
    title: '西夏右厢监军司主将',
    realm: '一流中品',
    factionId: 'SECT-16',
    factionName: '西夏铁鹞子重骑',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '三千冷锻连环铁鹞子冲阵，踏碎宋军中营！',
    stats: {
      hp: 2650,
      mp: 2200,
      agi: 62,
      res: 64,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-047',
    },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: null,
      move1: 'MA-135',
      move2: 'MA-152',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-245', level: 6, exp: 0 },
      { artId: 'MA-135', level: 7, exp: 0 },
      { artId: 'MA-152', level: 7, exp: 0 },
    ],
  }
}

function buildYangWenguangTrialNpc(): NodeNpc {
  const base = NPC_DB_MAP['NPC-0032']
  return {
    ...(base ?? {
      id: 'NPC-0032',
      name: '杨文广',
      title: '天波杨府当代传人',
      realm: '一流中品',
      factionId: 'ORG-04',
      factionName: '天波杨府',
      talk: '接住我手中【天波透甲金枪】十合不倒，此卷《杨家霸王枪》便归你！',
      stats: { hp: 3155, mp: 2736, agi: 69, res: 57, isBenchmark: false },
    }),
    avatarUrl: '/assets/characters/avatars/NPC-0032.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0032.jpg',
    stats: {
      hp: 3155,
      mp: 2736,
      agi: 69,
      res: 57,
      isBenchmark: false,
    },
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-004',
    },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-097',
      move1: 'MA-037',
      move2: 'MA-174',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 7, exp: 0 },
      { artId: 'MA-097', level: 6, exp: 0 },
      { artId: 'MA-037', level: 6, exp: 0 },
      { artId: 'MA-174', level: 8, exp: 0 },
    ],
    talk: '你在沙场上已见过血、使出了回马枪的雏形。接住我十合全力考校，或将我击退半步，此枪谱便归你！',
  }
}

const TAIYUAN_SPY_COMBAT_EFFECTS: QuestEffect[] = [
  {
    type: 'startCombat',
    questId: QUEST_ID,
    opponent: { kind: 'custom', npc: buildTaiyuanXixiaSpyNpc() },
    extraOpponents: [{ kind: 'custom', npc: buildTaiyuanLiaoSpyNpc() }],
    rule: 'duel',
    deathTitle: '血染天波旧祠',
    deathDetail:
      '少侠于太原天波旧祠内院孤身迎战西夏一品堂暗桩没藏泽渊与大辽死士乌古文海，不慎失手被淬毒弯刀与狼牙重棒合击毙命。',
    forbidEscapeReason: '天波旧祠岂容辽夏细作遁走！',
    introText:
      '【1v2 生死合击】内院书斋的檀木书架轰然倒塌，西夏细作没藏泽渊与大辽死士乌古文海同时撕破伪装，分持党项弯刀与契丹狼牙棒左右夹击而来！可点击敌手立绘或按 [Tab] 择一集火破敌！',
    onWin: [
      { type: 'setFlag', flag: 'tb_taiyuan_spies_cleared', value: true },
      { type: 'addArtExp', amount: 700 },
      { type: 'modifySkill', key: '策论', delta: 4 },
      { type: 'modifyChivalry', delta: 30, reason: '肃清天波旧祠辽夏双谍' },
      { type: 'giveSilver', amount: 80, reason: '缴获辽夏细作盘缠' },
      {
        type: 'openScene',
        scene: {
          id: 'scene_tb_taiyuan_spy_win',
          title: '枝干甲① · 内院捉谍',
          subtitle: '太原府 · 天波杨家旧祠 > 内院书斋秘藏室',
          beats: [
            {
              speaker: { kind: 'narrator' },
              text: '青砖地上一片狼藉，翻倒的祭祀名录与铜烛台滚落阶下。你枪锋一抖挑飞没藏泽渊的淬毒弯刀，顺势一记横扫将乌古文海砸撞在书橱上，两人喷血毙命，再也爬不起身。',
            },
            {
              speaker: { kind: 'narrator' },
              text: '你从没藏泽渊贴身夹层中搜出一卷尚带着墨香的羊皮残图——正是天波杨府密藏多年的《河东边防军阵残图》，上面用朱砂细细标着代州、忻州、石岭关的伏兵暗道，旁边还夹着八十两辽夏细作的暗桩盘缠。',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0032' },
              text: '（杨文广闻声带人赶入书斋，见双谍伏诛、军阵残图完好无损，神色顿时凝重而赞许）“好手段！没藏泽渊乃是西夏一品堂潜伏河东十年的老狐狸，连乌古文海这等大辽死士也与他勾连一气。若非你一眼看破祭祀名录中的破绽，河东三关今秋便要吃大亏！”',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0032' },
              text: '“内患既平，且去后园演武石坪吧——呼延家的少帅呼延庆已在那里候你多时了。那小子傲气冲天，可不会轻易服气一个外姓人沾手天波杨家枪！”',
            },
          ],
        },
      },
    ],
  },
]

const WUTAI_STONE_TRIAL_EFFECTS: QuestEffect[] = [
  {
    type: 'startCombat',
    questId: QUEST_ID,
    opponent: { kind: 'custom', npc: buildWutaiGuardianMonkNpc(true) },
    extraOpponents: [{ kind: 'custom', npc: buildMinganZenNpc(true) }],
    rule: 'story_trial',
    forbidEscapeReason: '演棍石台参悟回马枪意，半途而废则前功尽弃！',
    introText:
      '【1v2 八卦双棍试炼】五台山风雪呼啸，杨五郎演棍石台四围松涛如怒！清凉护法高僧与明安大师各持熟铜八卦齐眉棍，一左一右联手施展《五郎八卦棍》！此乃佛门演武考校（点到为止），请择敌逐个击破，悟出“置之死地而后生”的回马枪意！',
    onWin: [
      { type: 'setFlag', flag: 'tb_branch_b_done', value: true },
      { type: 'giveItem', itemId: 'ITM-MSC-017', qty: 1 },
      { type: 'addArtExp', amount: 1600 },
      { type: 'giveCombatExp', amount: 90, reason: '五台山演棍石台悟回马枪意' },
      { type: 'modifySkill', key: '经义', delta: 4 },
      { type: 'addFlagNumber', flag: 'sect_relation_SECT-03', delta: 20 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0504' }, delta: 15 },
      {
        type: 'openScene',
        scene: {
          id: 'scene_tb_wutai_success',
          title: '石台现碑 · 舍身回马意',
          subtitle: '五台山清凉寺 · 杨五郎演棍石台',
          beats: [
            {
              speaker: { kind: 'narrator' },
              text: '石台上积雪被棍风与枪劲震得漫天飞舞！当清凉护法高僧双棍锁死你左右退路、明安大师一记“五郎劈山”当头砸下之际，你忽觉石台青苔下那行古篆在脑海中轰然炸响——“退无可退，便即回马！”',
            },
            {
              speaker: { kind: 'narrator' },
              text: '你竟不避不挡，任由左肩擦过棍风，顺势拧腰旋身、长枪倒拖一寸后骤然反刺！一点寒芒如孤星破晓，稳稳点在明安大师棍梢三寸之内，劲气透石而入，竟将石台边积雪震出一道深沟！',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0504' },
              text: '（明安大师收棍合十，眼中满是震撼与慈悲）“阿弥陀佛！施主宁折不弯、败中寻胜，果然在绝境一刹参透五郎师祖化枪为棍之本心！昔年师祖金沙滩突围，痛失兄弟而遁入空门，所求者非独自身解脱，乃是以此棍护佑天下苍生！”',
            },
            {
              speaker: { kind: 'player' },
              text: '“多谢大师与护法高僧成全！晚辈方才那一瞬，方知杨家枪法为何重‘回马’二字——非为逃生，乃是向死而生！”',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0504' },
              text: '“善哉！老衲便将石台暗龛中珍藏的【五郎八卦枪意残碑拓片】交付施主。枪道境界既已随此战精进一分，愿施主携五郎师祖遗意下山，勿负天波忠烈之名！”',
            },
          ],
        },
      },
    ],
    onLose: [
      { type: 'healPlayer', hpPct: 25, mpPct: 25 },
      {
        type: 'openScene',
        scene: {
          id: 'scene_tb_wutai_stone_lose',
          title: '棍阵如山 · 且悟禅机',
          subtitle: '五台山清凉寺 · 杨五郎演棍石台',
          beats: [
            {
              speaker: { kind: 'narrator' },
              text: '两根齐眉重棍如泰山压顶般封住八方，你一味招架退守，终究被八卦棍劲震飞长枪，跌坐于石台雪地之中。',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0504' },
              text: '“施主求稳有余、舍身不足。五郎师祖当年面对十万辽兵尚敢反戈一击，你若只知护身，如何参透《霸王枪》之回马真意？且入禅房调息，想通了再来演棍石台！”',
            },
          ],
        },
      },
    ],
  },
]

export const TIANBO_BAWANG_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '天波忠魂 · 霸王枪出',
    category: 'main_story',
    regionId: 'bianliang',
    summary:
      '中后期高难网状传承任务树：自开封府杨排风三十六路烧火棍起步，并行挑战太原除奸与呼延庆、五台山破禅、雁门关血战三大跨州试炼，终赴延安与狄青、杨文广血战铁鹞子，习得天阶下品《杨家霸王枪》。',
    recommendedRealm: '一流下品',
    maxOpponentRealm: '一流上品',
    recommendedNote:
      '刚性前置：江湖侠义 ≥ 120、非西夏一品堂/通辽门人、《六合大枪》或《杨氏梨花枪》≥ 6 重、气血上限 ≥ 2,800、骑术 ≥ 65；终章传功需根骨 ≥ 82、气血 ≥ 3,200、骑术 ≥ 80。',
    startHint:
      '满足刚性前置门槛后，前往【开封府 · 西坊演武拳馆】拜会天波府护院女统制杨排风接下三十六路烧火棍试炼。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bianliang_base_dojo',
      customLabel: '开封府 · 西坊演武拳馆（杨排风）',
    },
    startCondition: PROLOGUE_ENTRY_CONDITION,
    initialStepId: 'visit_yang_wenguang',
    steps: {
      visit_yang_wenguang: {
        id: 'visit_yang_wenguang',
        title: '太原谒祠 · 呈递烧火铁箸',
        objective:
          '已接下杨排风三十六路少林烧火棍，获【天波烧火铁箸】。速赴【太原府 · 天波杨家旧祠】拜见当代传人杨文广，开启三大并行试炼枝干。',
        targetLocation: {
          regionId: 'taiyuan',
          buildingId: 'ty_yang',
          customLabel: '太原府 · 天波杨家旧祠（杨文广）',
        },
      },
      three_trials: {
        id: 'three_trials',
        title: '三道试炼 · 跨州并行求真意',
        objective:
          '可自由选择顺序完成三条试炼枝干：甲【太原府·天波杨家旧祠】先入「内院书斋·秘藏室」捉谍，再赴「后园演武石坪」胜呼延庆；乙【五台山·杨五郎演棍石台】先入「松风观云禅亭」拜会明安大师破禅，再赴「五郎八卦演棍主台」接招；丙【雁门关】先赴「雁门雄关城楼 > 瓮城屯兵校场」驰马截粮，再赴「雁门关外乱石绝壁 > 幽谷石室·寒玉榻」随穆桂云斩辽将。集齐三信物且根骨≥82、气血≥3,200、骑术≥80后回太原见杨文广。',
        targetLocation: {
          regionId: 'taiyuan',
          buildingId: 'ty_yang',
          customLabel: '太原旧祠 / 五台山石台 / 雁门关（三线并行）',
        },
      },
      finale_yanan: {
        id: 'finale_yanan',
        title: '终章① · 绝命回马破铁鹞',
        objective:
          '三信物已聚、筋骨已成！随杨文广赴【延安府 · 鄜延边军大营】，与名将狄青并肩死战西夏一品堂努儿海、漫咩与铁鹞子重骑，于沙场绝境中打出第一记【绝命回马枪】！',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_camp',
          customLabel: '延安府 · 鄜延边军大营（狄青）',
        },
      },
      finale_ancestral_hall: {
        id: 'finale_ancestral_hall',
        title: '终章② · 天波宗祠十合考校',
        objective:
          '鄜延大捷！返回【太原府 · 天波杨家旧祠】，于杨业令公牌位前迎战手持【天波透甲金枪】的杨文广，十合不倒或击退半步，即可承接天阶《杨家霸王枪》！',
        targetLocation: {
          regionId: 'taiyuan',
          buildingId: 'ty_yang',
          customLabel: '太原府 · 天波杨家旧祠（杨文广）',
        },
      },
    },

    npcActions: [
      // 【序章】汴京烧火棍：开封府 · 西坊演武拳馆 · 杨排风 (NPC-0252)
      {
        id: 'act_tb_prologue_paifeng',
        label: '拜会杨排风 · 接三十六路烧火棍',
        badge: '天波序章',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0252'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
          ],
        },
        enabledWhen: PROLOGUE_ENTRY_CONDITION,
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_prologue_paifeng',
              title: '序章 · 汴京烧火棍',
              subtitle: '开封府 · 西坊演武拳馆',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '皇祐二年的汴梁西坊，演武拳馆外铁砂桩与青石锁排成两列。场中一名年近半百却腰背笔挺的女将正手持一根乌黑沉重的铁箸，随手一拨便将三百斤石锁震得离地半尺——正是当年随太君出征、如今镇守开封天波府旧宅的护院女统制杨排风。',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“晚辈久仰天波杨府满门忠烈，近闻河东、西北两线辽夏细作蠢蠢欲动，特来拜会排风前辈，愿习天波护国枪法，为北疆分忧！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0252' },
                  text: '（杨排风收起铁箸，一双经历过金沙滩与天门阵风霜的眼眸上下打量着你，忽然微微颔首）“好沉稳的马步，一身侠义正气也不像作伪。六合大枪与梨花枪的底子，倒是练到了六重火候。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0252' },
                  text: '“少侠既有此侠骨与枪底子，老身不妨直说——当年杨令公血战陈家谷，拼死托孤，只将半卷《杨家霸王枪》带回河东太原。如今官家励精图治，可西夏与大辽仍对河东、鄜延虎视眈眈，太原的文广少爷肩挑一脉重担，岂会轻易将镇族神枪传予外人？”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“前辈但请示下，晚辈绝非贪慕虚名之辈！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0252' },
                  text: '“光凭嘴说无凭。想拿老身这根【天波烧火铁箸】去太原见文广少爷，先接住我这三十六路少林烧火棍再说！看棍！”',
                },
              ],
              choices: [
                {
                  id: 'choice_tb_fight_paifeng',
                  label: '【接招试棍】还请排风前辈赐教三十六路烧火棍！',
                  subLabel: '单挑 杨排风（二流上品，气血 1,888）',
                  tone: 'primary',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildYangPaifengNpc() },
                      rule: 'story_trial',
                      forbidEscapeReason: '杨排风三十六路烧火棍考校，岂可退却！',
                      introText:
                        '杨排风双手握紧乌黑铁箸，三十六路少林烧火棍如狂风骤雨般卷至！虽是厨下铁箸，在她手中却重逾千钧！',
                      onWin: [
                        { type: 'startQuest', questId: QUEST_ID, stepId: 'visit_yang_wenguang' },
                        { type: 'giveItem', itemId: 'ITM-MSC-015', qty: 1 },
                        { type: 'addArtExp', amount: 800 },
                        { type: 'giveCombatExp', amount: 60, reason: '接下杨排风三十六路烧火棍' },
                        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0252' }, delta: 15 },
                        { type: 'modifyRenown', delta: 30, reason: '汴京接下杨排风烧火棍' },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_tb_prologue_win',
                            title: '铁箸为凭 · 北上太原',
                            subtitle: '开封府 · 西坊演武拳馆',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '三十六路棍影化作漫天铁幕，你沉肩坠肘、枪走偏锋，连架二十余招后终于寻得一隙，枪尖稳稳点在铁箸中段！两人气劲一触即收，拳馆青砖竟被震裂三块。',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0252' },
                                text: '（杨排风哈哈大笑，反手将那根陪伴她半生的【天波烧火铁箸】抛入你怀中）“好！好一个沉着稳健的后生！接得住老身三十六路烧火棍，气血与胆魄都够格见文广少爷了！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0252' },
                                text: '“拿着这根铁箸，速去太原府天波杨家旧祠！文广少爷近来正为河东暗桩与边关战事烦心，见此铁箸，他自然会与你细说。”',
                              },
                            ],
                          },
                        },
                      ],
                      onLose: [
                        { type: 'healPlayer', hpPct: 30, mpPct: 30 },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_tb_prologue_lose',
                            title: '棍风未破 · 暂且调息',
                            subtitle: '开封府 · 西坊演武拳馆',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '杨排风一记“横扫千军”力道沉雄无比，将你连人带枪震退七步。铁箸离你咽喉半寸停住，劲风刮得脸颊生疼。',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0252' },
                                text: '“火候还差着半筹！连老身的烧火棍都接不住，去了河东遇到呼延家少帅与西夏铁鹞子岂非白白送死？去调息打磨一番，随时再来！”',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 太原谒祠：见杨文广 (NPC-0032) 开启三线并行试炼
      {
        id: 'act_tb_wenguang_open_branches',
        label: '呈递【天波烧火铁箸】· 问剑霸王枪谱',
        badge: '天波主干',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0032'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'visit_yang_wenguang' },
            { type: 'hasItem', itemId: 'ITM-MSC-015', qty: 1 },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_wenguang_branches',
              title: '太原旧祠 · 三道试炼',
              subtitle: '太原府 · 天波杨家旧祠',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '太原府北城的天波杨家旧祠苍松掩映，朱漆大门虽经风雨剥蚀，门楣上“满门忠烈”四字却依旧铁画银钩。正堂内香烟袅袅，杨业令公与七郎八虎的牌位静静肃立。天波当代传人杨文广身着素色箭袖劲装，正于案前擦拭一杆通体流金的【天波透甲金枪】。',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“晚辈奉汴京排风前辈之命，呈上【天波烧火铁箸】，特来拜见杨将军！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '（杨文广接过铁箸，指腹摩挲着箸柄上那道陈旧的刀痕，眼中掠过一丝追忆与肃然）“原来是排风姑姑的铁箸！姑姑既肯放行，你的根脚与侠义心肠便无需多问。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“只是我天波《杨家霸王枪》乃沙场绝学，并非寻常江湖套路。当年先祖血战陈家谷，此枪谱便只传‘忠魂、禅意、血勇’三字！如今有三桩试炼摆在眼前，不分先后，全凭你自己去闯——”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“其一【太原除奸与金鞭试枪】：旧祠内院近来似有辽夏细作混入，欲盗我《河东边防军阵残图》；肃清内患后，后园那位狂傲的呼延家少帅呼延庆也不服外姓人沾手杨家枪，你须堂堂正正胜他手中浑铁金鞭！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“其二【五台山五郎枪意】：五台山清凉寺曾是五郎叔公剃度之处，演棍石台上留有他化枪为棍的残碑。去问明安大师讨教禅机，破开石台棍阵，方能悟出何谓‘置之死地而后生’！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“其三【雁门降龙】：辽国南院重骑近日频频窥伺雁门粮道，穆桂云妹妹正在关外乱石绝壁苦战！你须凭绝顶骑术抢占咽喉高地，与她联手斩将护粮！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“待你集齐【太原呼延金鞭令】、【五郎八卦枪意残碑拓片】与【穆柯降龙木令】三道信物，且根骨、气血、骑术皆至化境时，再回这天波旧祠见我！去吧！”',
                },
              ],
              onFinishEffects: [
                { type: 'setQuestStep', questId: QUEST_ID, stepId: 'three_trials' },
                {
                  type: 'toast',
                  text: '已开启三线并行试炼！可自由顺序完成太原旧祠、五台山演棍石台、雁门关三大枝干。',
                  tone: 'success',
                  logTag: '天波忠魂',
                },
              ],
            },
          },
        ],
      },

      // 【枝干乙·1】五台山：拜会明安 (NPC-0504) 禅台问心
      {
        id: 'act_tb_wutai_mingan_zen',
        label: '禅台问心 · 论杨家忠烈禅机（经义 ≥ 60）',
        badge: '枝干乙',
        tone: 'jade',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0504'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_wutai_zen_passed', op: 'falsy' },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_wutai_zen',
              title: '枝干乙 · 松风观云禅台问心',
              subtitle: '五台山清凉寺 · 杨五郎演棍石台',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '五台山清凉寺终年云雾缭绕，松风观云禅亭外雪松如盖。清凉寺高僧明安大师盘膝坐于蒲团之上，身旁斜倚着一柄岁月摩挲得油亮乌黑的降魔齐眉棍。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0504' },
                  text: '“阿弥陀佛。五郎师祖昔年披剃于此，将杨家三十六路《霸王枪》去锋化钝，揉入佛门《五郎八卦棍》，却在演棍石台下亲手刻了一句真言。施主远自太原而来求取枪意，老衲且问你一句——”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0504' },
                  text: '“佛门戒杀，枪乃沙场杀伐利器。一枪既出，血溅五步，此物何以入禅？若只为逞勇斗狠，演棍石台的残碑，施主不看也罢。”',
                },
              ],
              choices: [
                {
                  id: 'choice_tb_zen_debate',
                  label: '【论法明心】止戈为武、杀一人而救万人，正是杨家忠烈禅心！（经义 ≥ 60）',
                  subLabel: '成功直通石台接招；失败须先破 1v2 明安大师 + 清凉寺护法武僧棍阵（点到为止）',
                  tone: 'gold',
                  effects: [
                    {
                      type: 'branch',
                      condition: { type: 'skillAtLeast', key: '经义', min: 60 },
                      thenEffects: [
                        { type: 'setFlag', flag: 'tb_wutai_zen_passed', value: true },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_tb_wutai_zen_pass',
                            title: '一语破禅 · 移步石台',
                            subtitle: '五台山清凉寺 · 松风观云禅亭',
                            beats: [
                              {
                                speaker: { kind: 'player' },
                                text: '“大师明鉴！昔日菩萨尚有怒目金刚相，杨令公与五郎前辈镇守三关，岂是贪嗜杀戮？一枪刺向胡骑咽喉，护的是关内千万百姓炊烟不绝！‘以杀止杀、止戈为武’，这便是杨家忠烈的大慈悲、大禅心！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0504' },
                                text: '（明安大师闻言双掌合十，眉宇间慈光微动，缓缓起身让开石阶）“善哉！施主经义通达，竟能一语道破五郎师祖当年‘不出家无以明心，不持棍无以护国’之苦衷。”',
                              },
                              {
                                speaker: { kind: 'player' },
                                text: '“既如此，不知演棍石台上的五郎残碑，晚辈可否前去一观？”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0504' },
                                text: '“心关已过，石台自然为你敞开。不过残碑拓片乃清凉寺护法之物，老衲与护法高僧仍须在【杨五郎演棍石台】上以《五郎八卦棍》亲自考校你的筋骨与悟性——请！”',
                              },
                            ],
                          },
                        },
                      ],
                      elseEffects: [
                        {
                          type: 'startCombat',
                          questId: QUEST_ID,
                          opponent: { kind: 'custom', npc: buildMinganZenNpc(false) },
                          extraOpponents: [{ kind: 'custom', npc: buildWutaiGuardianMonkNpc(false) }],
                          rule: 'story_trial',
                          forbidEscapeReason: '既至松风禅亭问心，须过此双僧护法棍阵！',
                          introText:
                            '【1v2 禅亭双棍试炼】施主经义火候尚浅，言辞未能折服禅心！明安大师长眉一扬，与清凉寺护法武僧齐步踏出，两根齐眉棍交织成密不透风的佛门棍阵试炼施主筋骨（点到为止）！',
                          onWin: [
                            { type: 'setFlag', flag: 'tb_wutai_zen_passed', value: true },
                            {
                              type: 'openScene',
                              scene: {
                                id: 'scene_tb_wutai_zen_combat_win',
                                title: '力破双棍 · 枪证禅心',
                                subtitle: '五台山清凉寺 · 松风观云禅亭',
                                beats: [
                                  {
                                    speaker: { kind: 'narrator' },
                                    text: '佛门护法双棍进退有度、首尾相应，两根熟铜齐眉棍如狂涛般压向禅亭青石。然而你脚踩七星、枪势沉稳如磐，连挑双棍震开缺口，枪尾轻点在明安大师护腕半寸外便即收势，竟连亭角悬挂的铜铃都未曾惊动一响！',
                                  },
                                  {
                                    speaker: { kind: 'npc', npcId: 'NPC-0504' },
                                    text: '“阿弥陀佛！施主口舌虽拙，手中枪意却光明磊落、点到即止，全无半点嗜杀戾气！看来施主早已将‘止戈为武’四字融入骨血之中，无需多言。”',
                                  },
                                  {
                                    speaker: { kind: 'player' },
                                    text: '“大师与护法师兄手下留情！晚辈只是谨记杨门先烈遗训——枪锋所指，唯护山河。”',
                                  },
                                  {
                                    speaker: { kind: 'npc', npcId: 'NPC-0504' },
                                    text: '“好，这便足够了！请移步【杨五郎演棍石台】，老衲与清凉护法高僧在彼处候你最后一试，看你能否在绝境中悟出五郎师祖的回马真意！”',
                                  },
                                ],
                              },
                            },
                          ],
                          onLose: [
                            { type: 'healPlayer', hpPct: 25, mpPct: 25 },
                            {
                              type: 'openScene',
                              scene: {
                                id: 'scene_tb_wutai_zen_combat_lose',
                                title: '棍阵受挫 · 静心再悟',
                                subtitle: '五台山清凉寺 · 松风观云禅亭',
                                beats: [
                                  {
                                    speaker: { kind: 'narrator' },
                                    text: '两根齐眉棍如铜墙铁壁般压来，你气息微浮，被护法武僧借力震退石阶之外。',
                                  },
                                  {
                                    speaker: { kind: 'npc', npcId: 'NPC-0504' },
                                    text: '“心浮则枪乱，气躁则阵难破。施主且在禅亭外听一阵松涛，平复内息后再来论法破阵。”',
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 【枝干甲/汇合】返回太原见杨文广校验终章门槛
      {
        id: 'act_tb_wenguang_merge_check',
        label: '呈验三道信物 · 启程延安终章',
        badge: '汇合校验',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0032'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
          ],
        },
        enabledWhen: FINALE_MERGE_CONDITION,
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_merge_to_yanan',
              title: '三信归宗 · 剑指鄜延',
              subtitle: '太原府 · 天波杨家旧祠',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '太原旧祠正堂灯火通明。你将【太原呼延金鞭令】、【五郎八卦枪意残碑拓片】与【穆柯降龙木令】依次排在紫檀供案之上，三枚信物映着烛光，仿佛串联起河东三关与五台佛门的风雪历程。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '（杨文广逐一验过三道信物，又伸手搭在你腕脉与肩骨之上，感受着你浑厚绵长的内息与沉凝如铁的筋骨，终于露出欣慰笑意）“三物俱全！你的根骨、气血与马上工夫亦已臻化境——放眼皇祐二年的河东江湖，能闯过这三关的后起之秀，寥寥无几！”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“全赖杨将军与五台、雁门诸位前辈成全！不知眼下何时可开谱传枪？”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '（杨文广神色忽地一凛，从案角抽出一封火漆尚温的八百里急递军报）“先慢！《杨家霸王枪》乃沙场杀伐之枪，只在祠堂里比划，练不出‘回马破虏’的真正杀气！半个时辰前，鄜延路急报传来——”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“西夏右厢统帅漫咩竟联合一品堂一流高手努儿海，亲率三千铁鹞子重骑夜袭延安府鄜延边军大营！狄青狄帅正率部苦战死守！此战若失，陕西西北门户洞开！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“我已备好两匹河东大宛战马。随我即刻驰援延安府！你在五台山悟得的五郎回马枪意，正好拿西夏铁鹞子的铁甲来试锋！”',
                },
              ],
              onFinishEffects: [
                { type: 'setQuestStep', questId: QUEST_ID, stepId: 'finale_yanan' },
                {
                  type: 'toast',
                  text: '终章开启！速赴【延安府 · 鄜延边军大营】助狄青、杨文广破西夏铁鹞子！',
                  tone: 'success',
                  logTag: '天波终章',
                },
              ],
            },
          },
        ],
      },

      // 【终章①】延安府 · 鄜延边军大营：见狄青 (NPC-0031) 开战
      {
        id: 'act_tb_yanan_diqing_battle',
        label: '随狄青、杨文广血战西夏铁鹞子',
        badge: '终章①',
        tone: 'danger',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0031'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'finale_yanan' },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_yanan_pre',
              title: '终章① · 绝命回马破铁鹞',
              subtitle: '延安府 · 鄜延边军大营',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '黄土高原夜风如刀，延安府鄜延边军大营外火光冲天，喊杀震野！黑沉沉的西夏铁鹞子重骑连人带马披挂冷锻连环铁甲，如一道移动的黑色铁墙直扑宋军粮草中营。大营帅旗之下，面覆铜面具、手持长刀的枢密副使名将狄青正勒马督阵，甲胄上已溅满敌血。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0031' },
                  text: '“杨将军与这位少侠来得正是时候！西夏右厢统帅漫咩狡诈凶悍，更邀得西夏一品堂一流上品高手努儿海压阵，欲一举踏平我鄜延粮营！”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“狄帅稳住中军！晚辈与杨将军愿为前驱，撕开铁鹞子重骑阵脚！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '（杨文广枪指敌阵，声如洪钟）“我去左翼截断西夏铁鹞子连环马索！少侠随狄帅正面迎击努儿海与漫咩——记住五郎叔公演棍石台上的话，敌势愈凶，愈要于绝境中回马反杀！杀！”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '话音未落，营寨外已传来一阵刺耳的牛角号声！努儿海骑着一匹通体乌黑的西凉战马冲出火幕，漫咩挥舞重兵紧随其侧，百余骑连环重甲铁鹞子踏碎鹿角木栅，迎面扑来！寒光映照着狄青的青铜面具，这位名震西陲的宋军名将长刀一挥，与你并骑迎敌！',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0031' },
                  text: '“全军擂鼓！随本帅与少侠共斩胡虏主将！今日有进无退，斩首级者赏千缗！”',
                },
              ],
              choices: [
                {
                  id: 'choice_tb_yanan_charge',
                  label: '【2v2 沙场死战】与狄青并肩杀入重围，斩努儿海、破漫咩！',
                  subLabel: '2v2 生死决战（战败殉国）：我方［少侠 + 狄青］vs 敌方［努儿海 + 漫咩·铁鹞子统帅］',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      allies: [{ kind: 'custom', npc: buildDiQingAllyNpc() }],
                      opponent: { kind: 'custom', npc: buildNuerhaiBossNpc() },
                      extraOpponents: [{ kind: 'custom', npc: buildManmieTieyaoziNpc() }],
                      rule: 'duel',
                      deathTitle: '马革裹尸鄜延路',
                      deathDetail:
                        '少侠随枢密副使狄青于延安府鄜延大营死战西夏一品堂左护法努儿海与铁鹞子统帅漫咩，力战不支，血染塞北黄沙。',
                      forbidEscapeReason: '鄜延粮营决战关乎西北防线，岂可临阵脱逃！',
                      introText:
                        '【2v2 沙场生死战】战鼓如雷，大地剧震！枢密副使狄青覆上青铜鬼面与你并肩迎敌，正面对决西夏一品堂一流上品高手努儿海与铁鹞子统帅漫咩！可点击敌将立绘或按 [Tab] 择一集火，于沙场绝境中打出平生第一记【绝命回马枪】！',
                      onWin: [
                        { type: 'addArtExp', amount: 3500 },
                        { type: 'giveCombatExp', amount: 160, reason: '鄜延沙场破西夏铁鹞子' },
                        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0031' }, delta: 20 },
                        { type: 'modifyChivalry', delta: 100, reason: '鄜延大营力破西夏铁鹞子' },
                        { type: 'modifyRenown', delta: 150, reason: '绝命回马枪名震西北边塞' },
                        { type: 'setQuestStep', questId: QUEST_ID, stepId: 'finale_ancestral_hall' },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_tb_yanan_win',
                            title: '绝境顿悟 · 回马破虏',
                            subtitle: '延安府 · 鄜延边军大营',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '血战至十余合，狄青一刀劈退漫咩半步，努儿海却挟着一品堂血刀阴煞劲风直取你胸前，座下战马被铁鹞子重骑逼入沟壑绝境，气血震荡欲裂！',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0032' },
                                text: '“就是此刻！莫再前冲——勒马、拧腰、倒转枪锋！使出五郎叔公的回马枪意！”',
                              },
                              {
                                speaker: { kind: 'narrator' },
                                text: '电光火石间，五台山石台禅意与雁门绝壁血战尽数融于一念！你骤然松缰伏鞍、长枪倒拖贴地，待努儿海欺身追近三尺之际，腰脊如大弓猛弹，一点刺目银星挟着雷霆破空声倒刺而出——平生第一记【绝命回马枪】正中努儿海护心铁镜！',
                              },
                              {
                                speaker: { kind: 'narrator' },
                                text: '护心镜应声炸裂，努儿海惨嚎着仰跌马下！狄青趁势率宋军背嵬铁骑掩杀而出，斩将夺旗，西夏铁鹞子阵脚大乱，漫咩负创鸣金收兵，狼狈遁回贺兰山外！',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0031' },
                                text: '（狄青摘下铜面具，露出坚毅刚正的面容，抬手重重拍了拍你染血的肩甲）“好一记回马破虏！今日鄜延大捷，首功当属杨将军与少侠！有此等胆魄与枪势，天波杨府后继有人，大宋西北无忧矣！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0032' },
                                text: '“沙场血火已过，你已真正触摸到了《霸王枪》的魂魄！随我回太原旧祠——在杨令公牌位前，还有最后一关十合考校等着你！”',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 【终章②】太原府 · 天波杨家旧祠：杨文广十合考校战
      {
        id: 'act_tb_final_duel_wenguang',
        label: '天波宗祠考校 · 接杨文广十合霸王枪',
        badge: '终章②',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0032'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'finale_ancestral_hall' },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_final_pre',
              title: '终章② · 天波宗祠考校战',
              subtitle: '太原府 · 天波杨家旧祠 · 正堂议事厅',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '凯旋归来，太原府天波杨家旧祠正堂已净水洒扫、香烛高烧。杨业令公的牌位前，两排铜灯将半卷泛黄的古旧枪谱映得熠熠生辉。庭院外，杨排风、呼延庆与穆桂云亦各自抱臂观礼，整座旧祠肃穆如临大敌。杨文广卸去战袍，独持那杆重达三十六斤的【天波透甲金枪】立于石阶之下，周身气势沉凝如岳。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“你在延安鄜延沙场上已见过血、斩过西夏一流高手，连狄帅都对你那记【绝命回马枪】赞不绝口。按说，你已有资格瞻仰这半卷祖传枪谱。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“但天波杨府祖训有言：欲承《杨家霸王枪》者，非但要有沙场破敌之勇，更要能接住当代传人全力十合而不堕宗门威名！今日在令公与七郎八虎英灵注视下，我不再留手，这杆【天波透甲金枪】会使出真正的大宋天阶枪法！”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '话音刚落，杨文广手中金枪微微一震，枪尖竟吞吐出一尺余长的淡金色枪芒，将石阶上飘落的松针瞬间绞碎成粉！这便是天阶绝学独有的破甲劲气！',
                },
                {
                  speaker: { kind: 'player' },
                  text: '（你深吸一口气，将全身内息灌注长枪，目光如炬）“晚辈求之不得！请杨将军全力施为，晚辈在令公牌位前接招！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0032' },
                  text: '“好胆魄！撑满十合不倒，或将我击退半步，此卷《杨家霸王枪》便正式托付于你——接枪！”',
                },
              ],
              choices: [
                {
                  id: 'choice_tb_final_accept',
                  label: '【宗祠接枪】请杨将军全力施为，晚辈接招！',
                  subLabel: '1v1 宗祠考校 杨文广（一流中品，气血 3,155）：战胜或撑满 10 回合即获《杨家霸王枪》',
                  tone: 'gold',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildYangWenguangTrialNpc() },
                      rule: 'survive_rounds',
                      maxRounds: 10,
                      forbidEscapeReason: '杨令公牌位前宗祠考校，岂可退避！',
                      introText:
                        '金枪如龙，破风啸鸣！杨文广（一流中品，气血 3,155）全力施展天阶下品《杨家霸王枪》步步紧逼！此乃宗祠传功考校（点到为止），撑满 10 回合不倒或直接击败他！',
                      onWin: [
                        { type: 'teachMartialArt', artId: 'MA-037', level: 1, exp: 3000 },
                        { type: 'addArtExp', amount: 5000 },
                        { type: 'giveCombatExp', amount: 240, reason: '天波宗祠十合考校圆满' },
                        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0032' }, delta: 35 },
                        { type: 'modifyRenown', delta: 200, reason: '天波宗祠考校承接霸王枪谱' },
                        { type: 'modifyChivalry', delta: 100, reason: '承继天波忠魂' },
                        { type: 'modifySkill', key: '策论', delta: 5 },
                        { type: 'giveSilver', amount: 500, reason: '朝廷鄜延军功赏银' },
                        { type: 'giveItem', itemId: 'ITM-MSC-019', qty: 1 },
                        {
                          type: 'completeQuest',
                          questId: QUEST_ID,
                          outcome: 'tianbo_bawang_inherited',
                        },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_tb_epilogue',
                            title: '霸王枪出 · 天波忠魂永传',
                            subtitle: '太原府 · 天波杨家旧祠',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '十合激战，金铁交鸣之声震落梁上尘埃！透甲金枪如怒龙出海，枪影笼罩整座宗祠庭院，你以五台禅意定心、以雁门身法游走、以鄜延沙场悟出的回马枪意化险为夷，最后一招双枪交错，“叮”的一声火星四溅，两人各退半步，稳稳收势！',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0032' },
                                text: '（杨文广长吐一口浊气，收枪而立，神色由肃杀化为由衷敬重，转身向杨令公牌位深深三揖）“祖父在天之灵请看——天波一脉，今日又得一位文武兼修、忠义两全的传人！”',
                              },
                              {
                                speaker: { kind: 'narrator' },
                                text: '杨文广双手从供案上捧起那卷以金丝锦缎包裹的《杨家霸王枪》正本，又取出一面绣着“天波忠烈”四字的赤金令旗，一并郑重交入你手中。五百两朝廷鄜延军功赏银亦由亲兵抬入堂内。',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0032' },
                                text: '“好！好一招回马破虏！今日在杨令公牌位前，我正式将天波杨府镇脉绝学《杨家霸王枪》与这面【天波忠烈令旗】托付于你！此枪谱共计三十六势，尤以‘霸王卸甲’与‘绝命回马’为天下兵刃之冠。”',
                              },
                              {
                                speaker: { kind: 'player' },
                                text: '“晚辈叩谢杨将军授谱之恩！有此绝学在身，必当效法杨令公与天波先烈，保境安民、百死不悔！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0032' },
                                text: '“他日若边关再起烽烟，凭此【天波忠烈令旗】可调动河东故旧，亦可借用或重铸天阶神兵【天波透甲金枪】！江湖路远，北疆风寒，望君珍重，莫负我天波忠烈之名！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0252' },
                                text: '（庭院外杨排风抚掌大笑，呼延庆与穆桂云亦并肩步入宗祠抱拳贺喜）“好！没看走眼！三十六路烧火棍没白打，天波杨府终于又出了一位能扛大旗的霸王枪传人！”',
                              },
                              {
                                speaker: { kind: 'narrator' },
                                text: '宗祠外大雪初霁，一缕冬阳穿透太原城头的云层，照亮门楣上“满门忠烈”四字金匾。风雪散尽，太行群峰如银龙蜿蜒天际。你手握《杨家霸王枪》秘谱与【天波忠烈令旗】，只觉丹田气血奔涌如江河，大宋北疆万里河山，正待你仗枪而行！',
                              },
                            ],
                          },
                        },
                      ],
                      onLose: [
                        { type: 'healPlayer', hpPct: 30, mpPct: 30 },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_tb_final_lose',
                            title: '金枪威沉 · 尚欠一息',
                            subtitle: '太原府 · 天波杨家旧祠',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '天阶《杨家霸王枪》威力绝伦，杨文广第八合上一记“横扫千军”劲透枪杆，震得你虎口麻木、单膝触地，终究差了两合未能撑满。',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0032' },
                                text: '“差一点便接住了！能撑到这一步已属难得，且在旧祠客房好生调息，把鄜延一战所得的沙场枪意彻底融会贯通，再来向我讨教！”',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 【支线/旧闻】开封府：追问杨排风陈家谷旧事
      {
        id: 'act_tb_paifeng_old_story',
        label: '追问陈家谷旧事与霸王枪渊源',
        badge: '天波秘辛',
        tone: 'default',
        showInBottomBar: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0252'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active' },
            { type: 'flag', flag: 'tb_lore_paifeng_read', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_paifeng_read', value: true },
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_paifeng_old_story',
              title: '旧闻 · 陈家谷托孤遗恨',
              subtitle: '开封府 · 西坊演武拳馆',
              beats: [
                {
                  speaker: { kind: 'player' },
                  text: '“排风前辈，晚辈常听太原故老提起陈家谷一役，却不知天波杨府的《杨家霸王枪》为何会散落半卷、又与五台山五郎前辈有何渊源？”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0252' },
                  text: '（杨排风望向北方雁门方向，神色微黯，手中铁箸轻轻敲了敲青石案）“你既接住了老身的烧火棍，便有资格听听陈家谷的旧事。当年雍熙北伐，杨令公率部血战两狼山、退守陈家谷口，本以为潘美与王侁的大军会按约接应，谁知奸臣临阵撤兵，七郎八虎死战到天昏地暗，只剩寥寥数人……”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0252' },
                  text: '“令公身披数十创、坐骑折足，临撞李陵碑殉国前，咬破指尖将《杨家霸王枪》后半卷最凶险的几路杀招口诀托付给突围死士带回太原；而五郎少爷自乱军中杀出后，痛感只知硬拼终非长久之计，遂在五台山剃度，把杨家枪化入少林棍法，专研‘败中求胜’的生门。”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“原来如此！世人只知杨家将满门忠烈，却不知那‘回马枪’三个字背后，竟藏着这般沉痛的血泪教训。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0252' },
                  text: '“正是！这也是为何文广少爷非要你去五台山走一遭、再去雁门与延安见血——天波杨家，可以马革裹尸，却再不能平白送死！记住，枪锋向前是忠勇，回马一枪是智谋！”',
                },
              ],
            },
          },
        ],
      },

      // 【支线/战前】雁门关：战前与穆桂云对表降龙木军令
      {
        id: 'act_tb_muguiyun_briefing',
        label: '与穆桂云对表雁门军情',
        badge: '战前军议',
        tone: 'jade',
        showInBottomBar: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0253'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_branch_c_done', op: 'falsy' },
            { type: 'flag', flag: 'tb_lore_muguiyun_read', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_muguiyun_read', value: true },
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_muguiyun_briefing',
              title: '军议 · 雁门风雪待援军',
              subtitle: '雁门关 · 乱石绝壁前哨',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '雁门关外风雪卷地，穆桂云身披银红狐裘披风，背后箭囊插满雕翎羽箭，正立于乱石绝壁前的烽火哨楼下远眺塞北。她腰间悬着一枚刻有奇异木纹的古旧令牌，正是当年穆柯寨传下的降龙木信物。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0253' },
                  text: '“文广哥的信鸽昨夜便到了！辽国南院这次派出的不是寻常游骑，而是人马皆披冷锻重铠的铁林重骑，专挑风雪夜摸黑劫掠我军运往代州、太原的冬粮。”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“穆姑娘，依你看这乱石绝壁地形，我等该如何破敌？”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0253' },
                  text: '“重骑最怕仰攻，也最忌谷道受阻！你若骑术足够精熟，便先去【雁门雄关城楼 · 瓮城屯兵校场】驰马抢占乱石坡上方的咽喉高地，居高临下压住敌骑冲势；若是骑术火候差些，强行抢坡反易惊马受伤。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0253' },
                  text: '“无论高地成败，待辽骑入谷，我自会放响箭为号，与你前后夹击，定要将那辽军先锋统领留在这雁门绝壁之下！”',
                },
              ],
            },
          },
        ],
      },
    ],

    spotActions: [
      // 【枝干甲·1】太原旧祠 · 内院捉谍
      {
        id: 'spot_tb_taiyuan_spy',
        label: '内院书斋 · 核查名录捉拿细作',
        badge: '枝干甲①',
        subtitle: '【算术≥55】或【经义≥55】识破 1v2 辽夏双谍（生死恶战）；失败则遭偷袭（气血-15%）后迎战',
        tone: 'primary',
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_east',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_taiyuan_spies_cleared', op: 'falsy' },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'skillAtLeast', key: '算术', min: 55 },
                { type: 'skillAtLeast', key: '经义', min: 55 },
              ],
            },
            thenEffects: [
              {
                type: 'toast',
                text: '算术/经义精微，一眼识破祭祀名录中的辽夏双谍破绽，先发制人！',
                tone: 'success',
                logTag: '太原除奸',
              },
              ...TAIYUAN_SPY_COMBAT_EFFECTS,
            ],
            elseEffects: [
              { type: 'healPlayer', hpPct: -15 },
              {
                type: 'toast',
                text: '名录盘查疏漏，遭没藏泽渊与乌古文海暗器偷袭（气血 -15%），强行迎战！',
                tone: 'warn',
                logTag: '太原除奸',
              },
              ...TAIYUAN_SPY_COMBAT_EFFECTS,
            ],
          },
        ],
      },

      // 【枝干甲·2】太原旧祠 · 金鞭少帅之约（呼延庆）
      {
        id: 'spot_tb_huyan_duel',
        label: '后园演武石坪 · 应呼延庆金鞭之约',
        badge: '枝干甲②',
        subtitle: '击败辽夏细作后，堂堂正正单挑考校 呼延庆（一流下品，气血 2,128 · 点到为止）',
        tone: 'danger',
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_west',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_taiyuan_spies_cleared', op: 'truthy' },
            { type: 'flag', flag: 'tb_branch_a_done', op: 'falsy' },
          ],
        },
        effects: [
          {
            type: 'startCombat',
            questId: QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuyanQingNpc() },
            rule: 'story_trial',
            forbidEscapeReason: '金鞭少帅呼延庆当面，岂可怯战逃跑！',
            introText:
              '天波旧祠后园演武石坪积雪未消，呼延庆倒提一对八棱浑铁金鞭踏步而出！少年将门虎气冲霄，双鞭一振竟带起呼啸风雷：“来吧！让我看看你有几斤几两，敢接天波杨家枪！”（同袍比武考校 · 点到为止）',
            onWin: [
              { type: 'setFlag', flag: 'tb_branch_a_done', value: true },
              { type: 'giveItem', itemId: 'ITM-MSC-016', qty: 1 },
              { type: 'addArtExp', amount: 1500 },
              { type: 'giveCombatExp', amount: 90, reason: '太原旧祠折服呼延庆' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0228' }, delta: 25 },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0032' }, delta: 15 },
              {
                type: 'openScene',
                scene: {
                  id: 'scene_tb_huyan_win',
                  title: '金鞭折服 · 太原授令',
                  subtitle: '太原府 · 天波杨家旧祠 > 后园演武石坪',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '演武石坪上金鞭与长枪狂撞三十余合！呼延庆《呼延硬鞭法》刚猛霸道，每一鞭都似要砸碎青石，然而你以长枪柔劲卸力、步步抢占中宫，终在第三十六招上挑飞他左腕金鞭，枪尖距他咽喉三寸稳稳停住。',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0228' },
                      text: '（呼延庆怔了半息，随即爽朗大笑，收起右手金鞭抱拳一揖）“痛快！真他娘痛快！我呼延庆平生最服硬手，原以为外姓江湖客只懂些花拳绣腿，没想到你枪底子这么硬！”',
                    },
                    {
                      speaker: { kind: 'player' },
                      text: '“呼延少帅过奖了！呼延家三十六路硬鞭刚猛绝伦，若非少帅方才急于强攻露出半寸空门，胜负犹未可知。”',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0228' },
                      text: '“输了便是输了，我呼延家从不找借口！这枚【太原呼延金鞭令】归你了！日后在西北或河东沙场遇到辽夏狗贼，算我呼延庆欠你一顿酒，咱们并肩杀敌！”',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0032' },
                      text: '（立于石坪廊下的杨文广亦微笑点头）“能令呼延少帅心服口服，你已过了太原一关。去吧，其余两道信物，亦莫教我失望。”',
                    },
                  ],
                },
              },
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 25, mpPct: 25 },
              {
                type: 'openScene',
                scene: {
                  id: 'scene_tb_huyan_lose',
                  title: '硬鞭震退 · 虎气未折',
                  subtitle: '太原府 · 天波杨家旧祠 > 后园演武石坪',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '呼延庆一对浑铁金鞭势大力沉，连环砸下震得你臂膀酸麻，终究被一记“泰山压顶”逼退石坪边缘。',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0228' },
                      text: '“哼，力道还差着一口气！不过能接我十余鞭不倒也算条汉子。回去调息稳住抗性与气血再来，我的金鞭令就在后园等着你！”',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },

      // 【枝干乙·2】五台山 · 演棍石台接招
      {
        id: 'spot_tb_wutai_stone_trial',
        label: '杨五郎演棍石台 · 接招参悟回马枪意',
        badge: '枝干乙②',
        subtitle: '1v2 佛门演武（点到为止）：迎战清凉护法高僧 + 明安大师，参透“置之死地而后生”的回马枪意',
        tone: 'gold',
        regionId: 'wutaishan',
        buildingId: 'wt_staff',
        spotId: 'wt_staff_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_wutai_zen_passed', op: 'truthy' },
            { type: 'flag', flag: 'tb_branch_b_done', op: 'falsy' },
          ],
        },
        effects: WUTAI_STONE_TRIAL_EFFECTS,
      },

      // 【枝干丙·1】雁门雄关城楼 · 马战截粮
      {
        id: 'spot_tb_yanmen_intercept',
        label: '瓮城屯兵校场 · 驰马抢占咽喉高地',
        badge: '枝干丙①',
        subtitle: '【骑术≥75】检定：成功则敌方铁骑身法 -15%；失败则体能损耗、气血 -10%',
        tone: 'primary',
        regionId: 'yanmenguan',
        buildingId: 'ym_tower',
        spotId: 'ym_tower_east',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_yanmen_intercept_tried', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_yanmen_intercept_tried', value: true },
          {
            type: 'branch',
            condition: { type: 'skillAtLeast', key: '骑术', min: 75 },
            thenEffects: [
              { type: 'setFlag', flag: 'tb_yanmen_advantage', value: true },
              {
                type: 'openScene',
                scene: {
                  id: 'scene_tb_yanmen_intercept_win',
                  title: '飞骑夺坡 · 占尽先机',
                  subtitle: '雁门关 · 雁门雄关城楼 > 瓮城屯兵校场',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '塞外朔风卷雪，山道结满暗冰。你一夹马腹，俯身贴近马鬃，凭着炉火纯青的骑术贴着峭壁羊肠小道疾驰而上！战马四蹄铁掌在碎石冰面上擦出点点火星，竟在辽军哨骑反应过来之前便抢先夺下乱石绝壁上方的咽喉高地！',
                    },
                    {
                      speaker: { kind: 'player' },
                      text: '（勒马立于悬崖雪松之后，抽出火折子点燃一枝宋军信号响箭）“辽骑已入谷口，正是居高临下截杀的好时机！”',
                    },
                    {
                      speaker: { kind: 'narrator' },
                      text: '俯瞰下方谷道，辽军南院重骑正排成锥形阵缓缓推进，却不知两侧高地已被你与穆桂云的伏兵占尽地利！敌方重骑初始身法受地形所制，锐减一成半！',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0253' },
                      text: '（远处绝壁哨楼传出穆桂云清越的呼啸应和声）“干得漂亮！高地既得，敌骑冲势已破大半！速赴【雁门关外乱石绝壁】与我汇合，斩杀辽军先锋统领！”',
                    },
                  ],
                },
              },
            ],
            elseEffects: [
              { type: 'healPlayer', hpPct: -10 },
              { type: 'giveFood', amount: -2 },
              {
                type: 'openScene',
                scene: {
                  id: 'scene_tb_yanmen_intercept_fail',
                  title: '冰道失蹄 · 强行赴援',
                  subtitle: '雁门关 · 雁门雄关城楼 > 瓮城屯兵校场',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '风雪交加之中，山道暗冰甚滑！你催马抢坡时座骑前蹄忽然打滑，在陡峭石阶上连滑数步后猛然侧翻，连人带马滚落三丈碎石坡！你于半空强拧腰身护住长枪，虽及时跃起却也擦伤肩背（气血 -10%），随身干粮亦在翻滚中散落些许。',
                    },
                    {
                      speaker: { kind: 'player' },
                      text: '（拍去肩头雪水，咬牙牵起战马）“该死，还是差了半筹骑术！高地既失，待会儿便只能硬碰硬挡住敌骑冲阵了！”',
                    },
                    {
                      speaker: { kind: 'narrator' },
                      text: '眼见辽军重骑的火把已如长龙般逼近谷口，马蹄声震得碎石簌簌滚落，顾不得许多，只得强忍伤痛翻身上马，赶赴【雁门关外乱石绝壁】，与穆桂云正面硬撼辽军铁骑！',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },

      // 【枝干丙·2】雁门关外乱石绝壁 · 联手穆桂云血战
      {
        id: 'spot_tb_yanmen_bloodbattle',
        label: '乱石绝壁 · 随穆桂云血战辽军铁骑',
        badge: '枝干丙②',
        subtitle: '2v2 沙场生死战（战败殉国）：联手穆桂云迎战 萧铁古·辽军先锋统领 + 契丹铁林重骑百夫长',
        tone: 'danger',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_yanmen_intercept_tried', op: 'truthy' },
            { type: 'flag', flag: 'tb_branch_c_done', op: 'falsy' },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'tb_yanmen_advantage', op: 'truthy' },
            thenEffects: [
              {
                type: 'startCombat',
                questId: QUEST_ID,
                allies: [{ kind: 'custom', npc: buildMuGuiyunAllyNpc() }],
                opponent: { kind: 'custom', npc: buildYanmenLiaoVanguardNpc(true) },
                extraOpponents: [{ kind: 'custom', npc: buildYanmenLiaoHeavyCavalryNpc(true) }],
                rule: 'duel',
                deathTitle: '血战雁门粮道',
                deathDetail:
                  '少侠随女将穆桂云于雁门关外乱石绝壁截击大辽南院重骑，力战不支，命陨塞外风雪之中。',
                forbidEscapeReason: '雁门粮道生死一线，穆桂云正在侧翼并肩死战，岂可撤退！',
                introText:
                  '【2v2 雁门生死合击】乱石绝壁高地上箭雨如蝗！你抢占咽喉高地居高临下（敌骑身法锐减），与女将穆桂云并肩杀入萧铁古·辽军先锋统领与契丹铁林重骑百夫长阵中！可点击敌将立绘择一集火斩首！',
                onWin: [
                  { type: 'setFlag', flag: 'tb_branch_c_done', value: true },
                  { type: 'giveItem', itemId: 'ITM-MSC-018', qty: 1 },
                  { type: 'addArtExp', amount: 1800 },
                  { type: 'giveCombatExp', amount: 100, reason: '雁门关联手穆桂云破敌' },
                  { type: 'modifySkill', key: '骑术', delta: 5 },
                  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0253' }, delta: 25 },
                  { type: 'modifyChivalry', delta: 50, reason: '雁门关护粮斩杀辽将' },
                  { type: 'giveSilver', amount: 150, reason: '雁门关护粮赏银' },
                  {
                    type: 'openScene',
                    scene: {
                      id: 'scene_tb_yanmen_bloodbattle_win_adv',
                      title: '高地破骑 · 降龙木令',
                      subtitle: '雁门关 · 雁门关外乱石绝壁',
                      beats: [
                        {
                          speaker: { kind: 'narrator' },
                          text: '居高临下冲杀之势锐不可当！穆桂云梨花枪与雕翎箭连环策应，牵制住契丹铁林百夫长，你则单骑突入中军，长枪自上而下一枪将先锋统领萧铁古刺落马下！失了主将的契丹重骑顿时阵脚大乱，丢下满地兵甲狼狈北逃。',
                        },
                        {
                          speaker: { kind: 'npc', npcId: 'NPC-0253' },
                          text: '（穆桂云策马跃下石坡，挽弓收枪，英姿飒爽地向你拱手）“好身手！若非你抢先占住高地压住敌骑冲势，这一仗还不知要折损多少宋军儿郎！连代州守军方才都在城楼上敲鼓助威呢！”',
                        },
                        {
                          speaker: { kind: 'player' },
                          text: '“穆姑娘枪箭双绝，若非姑娘死死缠住侧翼重骑百夫长，晚辈也难一枪斩首！”',
                        },
                        {
                          speaker: { kind: 'npc', npcId: 'NPC-0253' },
                          text: '“咱们也不必互相吹捧了！这枚【穆柯降龙木令】与一百五十两护粮赏银，请务必收下！拿着木令回太原见文广哥吧，告诉他——雁门关的粮道有我穆桂云守着，叫他尽管放心！”',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            elseEffects: [
              {
                type: 'startCombat',
                questId: QUEST_ID,
                allies: [{ kind: 'custom', npc: buildMuGuiyunAllyNpc() }],
                opponent: { kind: 'custom', npc: buildYanmenLiaoVanguardNpc(false) },
                extraOpponents: [{ kind: 'custom', npc: buildYanmenLiaoHeavyCavalryNpc(false) }],
                rule: 'duel',
                deathTitle: '血战雁门粮道',
                deathDetail:
                  '少侠随女将穆桂云于雁门关外乱石绝壁硬撼大辽南院重骑，力战不支，命陨塞外风雪之中。',
                forbidEscapeReason: '雁门粮道生死一线，穆桂云正在侧翼并肩死战，岂可撤退！',
                introText:
                  '【2v2 雁门生死硬撼】辽军重甲铁骑正面冲阵，马蹄踏雪如雷！你强忍肩伤，与女将穆桂云并肩死守乱石绝壁狭口，正面迎击萧铁古·辽军先锋统领与契丹铁林重骑百夫长！',
                onWin: [
                  { type: 'setFlag', flag: 'tb_branch_c_done', value: true },
                  { type: 'giveItem', itemId: 'ITM-MSC-018', qty: 1 },
                  { type: 'addArtExp', amount: 1800 },
                  { type: 'giveCombatExp', amount: 100, reason: '雁门关联手穆桂云破敌' },
                  { type: 'modifySkill', key: '骑术', delta: 5 },
                  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0253' }, delta: 25 },
                  { type: 'modifyChivalry', delta: 50, reason: '雁门关护粮斩杀辽将' },
                  { type: 'giveSilver', amount: 150, reason: '雁门关护粮赏银' },
                  {
                    type: 'openScene',
                    scene: {
                      id: 'scene_tb_yanmen_bloodbattle_win_std',
                      title: '绝壁血战 · 降龙木令',
                      subtitle: '雁门关 · 雁门关外乱石绝壁',
                      beats: [
                        {
                          speaker: { kind: 'narrator' },
                          text: '虽未占得先机，你与穆桂云背靠乱石绝壁并肩死战不退！激战半个时辰，你终于寻得萧铁古甲叶缝隙，一枪贯胸将其挑落马下！穆桂云梨花枪横扫击溃重骑百夫长，辽军大败而逃。',
                        },
                        {
                          speaker: { kind: 'npc', npcId: 'NPC-0253' },
                          text: '（穆桂云擦去脸上雪水与血渍，策马靠拢过来，眼中满是敬意）“真是一场恶战！本以为抢坡失利便要苦撑到底，没想到你枪势越战越快，竟在重骑合围中生生刺穿了那辽将护心甲！”',
                        },
                        {
                          speaker: { kind: 'player' },
                          text: '“全靠穆姑娘在侧翼死战压阵，才没让辽军铁骑合围成势！”',
                        },
                        {
                          speaker: { kind: 'npc', npcId: 'NPC-0253' },
                          text: '“这枚【穆柯降龙木令】与一百五十两护粮赏银归你了！携它回太原见文广哥吧，粮道既保，雁门关今冬军民无忧矣！”',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },

      // 【支线/瞻仰】太原旧祠 · 瞻仰杨令公牌位
      {
        id: 'spot_tb_linggong_shrine',
        label: '瞻仰杨业令公牌位与陈家谷遗碑拓本',
        badge: '天波忠魂',
        subtitle: '细读太原天波旧祠遗训，领悟“满门忠烈”四字分量',
        tone: 'default',
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active' },
            { type: 'flag', flag: 'tb_lore_linggong_read', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_linggong_read', value: true },
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_linggong_shrine',
              title: '旧祠香火 · 令公忠魂',
              subtitle: '太原府 · 天波杨家旧祠 > 正堂',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '旧祠正堂香火微明，乌木神龛中供奉着“宋故赠太尉大同军节度使杨公业”的牌位，左右依次排开大郎延平、二郎延定、三郎延光、四郎延辉、五郎延德、六郎延昭、七郎延嗣的灵位。每一块檀木牌位上都系着一截早已褪色的素白麻绳。',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '神龛左侧青石壁上嵌着一块陈家谷李陵碑拓本，上面尚存当年杨令公以血指划出的半行残字：“忠义报国，死生不移。”下方一行小字则是杨六郎延昭镇守三关时亲手补刻的家训：“后世子孙，枪尖不可向内，不可欺弱，不可忘北疆之耻。”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '（你整理衣冠，向杨令公与天波七郎八虎牌位肃立三揖）“前辈满门忠烈，血沃北疆。晚辈虽非杨氏血脉，今日既欲承《霸王枪》一脉，必当铭记此训，绝不辱没天波威名。”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '静立碑前良久，穿堂风吹动神龛前长明灯焰，你忽然明白为何这门《杨家霸王枪》虽名为“霸王”，骨子里却全无草莽横暴之气——那股霸道，是对胡虏铁骑寸土不让的骨气，是对家国黎民向死而生的赤诚忠魂！',
                },
              ],
            },
          },
        ],
      },

      // 【支线/观碑】五台山 · 细观五郎石台残碑刻痕
      {
        id: 'spot_tb_wutai_stele_read',
        label: '细观演棍石台“置之死地而后生”刻痕',
        badge: '枪意残碑',
        subtitle: '在迎战清凉护法高僧前，先揣摩杨五郎留下的枪棍转换痕迹',
        tone: 'default',
        regionId: 'wutaishan',
        buildingId: 'wt_staff',
        spotId: 'wt_staff_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'three_trials' },
            { type: 'flag', flag: 'tb_lore_wutai_stele_read', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_wutai_stele_read', value: true },
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_wutai_stele_read',
              title: '石台刻痕 · 化枪为棍',
              subtitle: '五台山清凉寺 · 杨五郎演棍石台',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '演棍石台乃是一整块重逾万斤的太行青石，台面中央被岁月与齐眉重棍磨出一个深达两寸的圆窝。四周古松挂满冰凌，山风掠过石台发出如金铁轻鸣般的呼啸。',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '你蹲下身拂去石台边缘厚厚的积雪，只见青石侧面密密麻麻全是棍棒点刺留下的深痕，其中一道却在看似力竭坠落之际骤然折转一百八十度，劲气竟透石而出，在背面留下一道寸许深的裂纹！',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“好霸道的回马劲！明明已至绝境死角，却偏能在半寸之间拧腰转腕、化棍为枪——这便是五郎前辈当年悟出的‘置之死地而后生’！”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '记住这股由极静转极动、由绝境转生门的枪意，待会儿迎战清凉护法高僧与明安大师的八卦棍阵时，切忌一味死守招架，唯有攻中求活方能破阵！',
                },
              ],
            },
          },
        ],
      },

      // 【支线/军情】延安府 · 观摩鄜延军营沙盘
      {
        id: 'spot_tb_yanan_sandtable',
        label: '观摩狄青鄜延大营沙盘与铁鹞子布阵图',
        badge: '战前侦察',
        subtitle: '察看西夏右厢与一品堂合围地形，知己知彼',
        tone: 'default',
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'finale_yanan' },
            { type: 'flag', flag: 'tb_lore_yanan_sandtable', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_yanan_sandtable', value: true },
          {
            type: 'openScene',
            scene: {
              id: 'scene_tb_yanan_sandtable',
              title: '中军沙盘 · 铁鹞阵势',
              subtitle: '延安府 · 鄜延边军大营',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '鄜延中军大帐内烛火摇曳，一张丈余见方的巨大黄土沙盘上插满了代表宋夏两军的红黑小旗。狄青用朱笔在延安东北的沟壑纵横处重重画了一道圈，旁边标注着“铁鹞子必经狭口”六字。',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '帐旁军史录上详载着西夏铁鹞子的可怖之处：三千重骑皆挑悍卒，人披冷锻连环甲、马披厚牛皮铁鳞，以铁索钩连马鞍，冲锋时宛如铁山崩塌，正面硬撼极易被撞得筋断骨折。',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“连环铁甲虽固，却也有个致命破绽——铁索连马，冲锋时一往无前，可一旦冲入窄谷沟壑，回旋转向便极难收缰！”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '若能在漫咩与努儿海冲势最盛、追兵贴身之际骤然勒马回身，一记蓄满全身气血内力的【绝命回马枪】直刺其主将护心镜，铁鹞子连环阵眼必破！',
                },
              ],
            },
          },
        ],
      },
    ],
  },
]
