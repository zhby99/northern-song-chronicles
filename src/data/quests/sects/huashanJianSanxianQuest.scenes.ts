import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_Q11_QUEST_ID } from './huashanJianSanxianQuest'

const SPEAKER_LIAO_KILLER_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '耶律黑鹫',
  title: '辽夏黑市死士首领',
  factionName: '辽夏黑市死士营',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

const SPEAKER_XIXIA_KILLER_SUB: StorySpeakerSpec = {
  kind: 'custom',
  name: '野利毒刃',
  title: '黑市夜袭死士副手',
  factionName: '辽夏黑市死士营',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_HUAYIN_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '华阴里正老汉',
  title: '西岳山麓华阴村长者',
  factionName: '华阴乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildDeathSwornLeaderNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ11_KILLER_LEADER',
    name: '耶律黑鹫',
    title: '辽夏黑市 · 死士首领',
    realm: '一流下品',
    factionName: '辽夏黑市死士营',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“三才死阵合击！管他是华山哪一脉，连村里活口一并屠光！”',
    stats: { hp: 1680, mp: 1520, agi: 58, res: 42 },
    talents: { bone: 72, comprehension: 60, charm: 28 },
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-077', move1: 'MA-073', move2: 'MA-244' },
    learnedArts: [
      { artId: 'MA-243', level: 5 },
      { artId: 'MA-077', level: 4 },
      { artId: 'MA-073', level: 5 },
      { artId: 'MA-244', level: 5 },
    ],
    equipped: { weapon: 'WPN-019' },
    questBadgeLabel: '死士首领',
  })
}

function buildDeathSwornLeftNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ11_KILLER_LEFT',
    name: '野利毒刃',
    title: '辽夏黑市 · 左翼死士',
    realm: '一流下品',
    factionName: '辽夏黑市死士营',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“缠住{gender:他|她}的剑，我先拿村口那对母子祭刀！”',
    stats: { hp: 1180, mp: 1080, agi: 56, res: 38 },
    talents: { bone: 66, comprehension: 54, charm: 24 },
    equippedArts: { neigong: 'MA-245', qinggong: 'MA-246', move1: 'MA-133', move2: 'MA-095' },
    learnedArts: [
      { artId: 'MA-245', level: 4 },
      { artId: 'MA-246', level: 4 },
      { artId: 'MA-133', level: 5 },
      { artId: 'MA-095', level: 4 },
    ],
    equipped: { weapon: 'WPN-043' },
    questBadgeLabel: '左翼死士',
  })
}

function buildDeathSwornRightNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ11_KILLER_RIGHT',
    name: '萧铁鹰',
    title: '辽夏黑市 · 右翼死士',
    realm: '一流下品',
    factionName: '辽夏黑市死士营',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“休想救人，吃我一刀！”',
    stats: { hp: 1180, mp: 1080, agi: 55, res: 38 },
    talents: { bone: 68, comprehension: 52, charm: 25 },
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-139', move1: 'MA-073', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-243', level: 4 },
      { artId: 'MA-139', level: 4 },
      { artId: 'MA-073', level: 4 },
      { artId: 'MA-131', level: 5 },
    ],
    equipped: { weapon: 'WPN-034' },
    questBadgeLabel: '右翼死士',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq11_01: {
    id: 'scene_hsq11_01',
    title: '第一幕 · 霜夜密召',
    subtitle: '西岳华山 · 霜降寒夜',
    mandatory: true,
    beats: [
      N('{reignYear}深秋霜降，夜寒露重，枯黄枫叶铺满华山石阶。自你晋入剑宗真传并把《希夷剑法》练至虚实由心之境后，封不弃已有半月未曾在白日露面。'),
      N('直至这夜二更，一道黑影悄无声息落在你窗外松枝之上——封不弃一袭夜行灰衣，袖中揣着一束线香与火折，神色凝重得前所未见。'),
      S('NPC-0167', '（压低声音）“莫惊动东峰紫霞观的巡夜弟子！收敛气息，今夜随我去【思过崖古山洞 · 绝壁银瀑涤心寒潭】西侧绝壁后的荒谷——有些藏了三十年的旧账与真剑，该让你见见了！”'),
    ],
    choices: [
      {
        id: 'hsq11_01_start',
        label: '敛息佩剑，随封不弃潜往寒潭西侧幽谷荒庐',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q11_QUEST_ID, stepId: 'ruined_jianlu' },
          toast('请前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】随封不弃潜入荒废三十载的旧剑庐！', 'talk', '霜夜密召'),
        ],
      },
    ],
  },

  scene_hsq11_02: {
    id: 'scene_hsq11_02',
    title: '第二幕 · 西峰荒径',
    subtitle: '思过崖古山洞 · 寒潭西侧幽谷',
    mandatory: true,
    beats: [
      N('绕过轰鸣不息的绝壁银瀑，封不弃拨开数重带刺枯藤，一条早已在宗门舆图上抹去的断崖栈道赫然浮现。'),
      N('栈道尽头立着三间半塌的青石木庐，门楣上“太华剑庐”四字已被风雨剥蚀得模糊不清，屋瓦间荒草凄迷，显然已整整荒废了三十载春秋。'),
      P('“封师叔，此处便是三十年前剑宗诸位前辈清修之地？”'),
    ],
    choices: [
      {
        id: 'hsq11_02_next',
        label: '随封不弃推开吱呀作响的残破木门步入内堂',
        tone: 'primary',
        effects: [openScene('scene_hsq11_03', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_03: {
    id: 'scene_hsq11_03',
    title: '第三幕 · 残庐泣血',
    subtitle: '西峰荒废剑庐 · 灵牌旧恨',
    illustrationUrl: '/assets/quests/hs_q11_ruined_jianlu.jpg',
    illustrationCaption: '残庐泣血 · 秋夜西峰荒庐祭拜先辈牌位，封不弃吐露三十载旧怨',
    mandatory: true,
    beats: [
      N('火折擦亮半截蒙尘残烛，昏黄烛光映出石案上整整齐齐排列的七尊乌木灵牌。每一尊灵牌前，都横放着半截崩缺折断的青钢剑尖！'),
      N('素来桀骜冷酷的封不弃撩起衣袍，重重跪倒在冰冷石砖之上，点燃三炷清香插进缺角铜炉，眼眶竟浮起一层骇人的血丝。'),
      S('NPC-0167', '“过来磕头！这上面供着的，有我的授业恩师，也有当年名震关西的三位剑宗长老！三十年前玉女峰那场血争，气宗仗着紫霞内力绵长设下车轮重围，师父他们宁死不肯交出剑宗掌门铁剑，血染苍龙岭，客死他乡者不知凡几！”'),
    ],
    choices: [
      {
        id: 'hsq11_03_next',
        label: '肃然跪拜剑宗先辈灵位，静听封师叔吐露往事',
        tone: 'default',
        effects: [openScene('scene_hsq11_04', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_04: {
    id: 'scene_hsq11_04',
    title: '第四幕 · 遗恨难平',
    subtitle: '西峰荒废剑庐 · 断剑余哀',
    mandatory: true,
    beats: [
      S('NPC-0167', '（手指抚过冰凉断剑，声音低沉沙哑）“自那以后，岳沧溟执掌紫霞宫，对外宣称华山止息干戈、剑气并收；实则将我剑宗最凌厉的杀招列为禁术，逼得我长年栖身长安西市车马行，连回山祭拜恩师都要选在霜夜偷偷摸摸！”'),
      P('“先辈遗泽蒙尘至此……难怪师叔平日总在长安与潼关行走，极少踏足玉女峰正殿。”'),
    ],
    choices: [
      {
        id: 'hsq11_04_next',
        label: '看封不弃起身探向先师主牌位后的青石暗格',
        tone: 'gold',
        effects: [openScene('scene_hsq11_05', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_05: {
    id: 'scene_hsq11_05',
    title: '第五幕 · 杀剑解封',
    subtitle: '西峰荒废剑庐 · 油布孤本',
    mandatory: true,
    beats: [
      N('封不弃移开居中灵牌，自石壁暗龛中取出一卷用黑牛皮严密包裹的手抄剑诀，烛火被他指尖透出的森然剑意激得剧烈摇晃。'),
      S('NPC-0167', '“当年恩师咽气前将这卷剑诀塞入我怀中，嘱咐我若遇不着天资与心性俱佳的传人，宁可带进棺材也绝不轻传。你既已修成《希夷剑法》虚实奇正之变，足可驾驭这门剑宗真正的压箱底杀剑！”'),
    ],
    choices: [
      {
        id: 'hsq11_05_next',
        label: '屏住呼吸，凝望残烛下拔剑起势的封不弃',
        tone: 'gold',
        effects: [openScene('scene_hsq11_06', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_06: {
    id: 'scene_hsq11_06',
    title: '第六幕 · 夺命三仙',
    subtitle: '西峰荒废剑庐 · 倾囊传剑',
    illustrationUrl: '/assets/quests/hs_q11_sanxian_impart.jpg',
    illustrationCaption: '夺命三仙 · 残烛孤影下倾囊传授地阶杀剑夺命连环三仙剑',
    mandatory: true,
    beats: [
      N('嗤——！封不弃身影在狭小的荒庐内骤然拉出三道残影！但见剑光初起尚似《希夷剑法》般飘渺无迹，下一瞬陡然暴起连环三剑，破空凄厉如鬼哭神嚎，瞬间在石柱上刺出眉心、咽喉、膻中三点深逾两寸的品字剑孔，而桌上半截残烛的火苗竟未被剑风吹灭！'),
      S('NPC-0167', '“看清楚了！这便是令东峰气宗谈之色变的地阶中品杀剑——《夺命连环三仙剑》！起手藏于无形，一旦发难便是首尾相连的夺命三剑，一剑比一剑毒、一剑比一剑快，任你紫霞护体神功再厚，来不及换气便已尸横三尺！”'),
      N('残烛孤影之下，封不弃将《夺命连环三仙剑》的运劲爆发与收发死窍字字句句倾囊传授！'),
    ],
    choices: [
      {
        id: 'hsq11_06_learn',
        label: '于先辈灵前铭记夺命剑诀，修习地阶中品《夺命连环三仙剑》！',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-068', level: 1, autoEquip: true },
          toast('已习得地阶中品杀剑《夺命连环三仙剑》！', 'success', '夺命三仙'),
          openScene('scene_hsq11_07', HUASHAN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq11_07: {
    id: 'scene_hsq11_07',
    title: '第七幕 · 一气三连',
    subtitle: '西峰荒废剑庐 · 杀意入髓',
    mandatory: true,
    beats: [
      N('你在荒庐庭院枯霜中反复试演。每逢三剑连发，手腕与肩胛经脉皆如弓弦崩紧到极致，三道寒芒连成一线，凌厉无匹的杀伐剑意令四周落叶尽成齑粉。'),
      P('“一剑锁退路、二剑破护身、三剑断生机……此剑一旦出鞘，果真是与敌偕亡、有死无生的搏命杀招！”'),
    ],
    choices: [
      {
        id: 'hsq11_07_next',
        label: '收剑敛去凛冽杀气，听封师叔临别叮嘱',
        tone: 'primary',
        effects: [openScene('scene_hsq11_08', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_08: {
    id: 'scene_hsq11_08',
    title: '第八幕 · 临别密嘱',
    subtitle: '寒潭西侧幽谷 · 秘而不宣',
    mandatory: true,
    beats: [
      N('五更霜风渐紧，封不弃吹灭残烛重锁木门，神情严肃地按住你的肩头。'),
      S('NPC-0167', '“切记！三十年前死在这路《夺命连环三仙剑》下的同门太多，岳沧溟与秦烈山师兄至今对此剑忌讳极深。羽毛未丰之前，万万不可在山上显露半点三仙剑痕，更莫提是我在此处传你的！”'),
      S('NPC-0167', '“近几日潼关与华阴一带似有北辽与西夏黑市探子鬼祟出没，你下山去【潼关天险瓮城】外巡察一番，权当散去身上戾气。”'),
    ],
    choices: [
      {
        id: 'hsq11_08_go',
        label: '谨记封师叔密嘱，下山前往潼关西麓巡视',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q11_QUEST_ID, 'huayin_night_raid'),
          toast('请前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】巡察华阴山麓异动！', 'talk', '下山巡察'),
        ],
      },
    ],
  },

  scene_hsq11_09: {
    id: 'scene_hsq11_09',
    title: '第九幕 · 华阴火起',
    subtitle: '潼关西麓 · 华阴山村夜火',
    mandatory: true,
    beats: [
      N('数日后的无月之夜，你刚巡至潼关天险瓮城西麓官道，忽见十里外华山脚下的华阴村落腾起滚滚浓烟，隐约传来妇孺凄厉的哭喊声与兵刃劈砍声！'),
      P('（脸色大变，拔剑展开轻功）“不好，有凶徒夜袭山麓百姓！”'),
    ],
    choices: [
      {
        id: 'hsq11_09_next',
        label: '全力施展身法，星夜驰援火光冲天的华阴村落！',
        tone: 'danger',
        effects: [openScene('scene_hsq11_10', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_10: {
    id: 'scene_hsq11_10',
    title: '第十幕 · 疾驰救民',
    subtitle: '华阴村口晒谷场 · 屠村黑手',
    mandatory: true,
    beats: [
      N('数息之间你已掠入华阴村口晒谷场。只见草垛烈火熊熊，一名退伍隐居于此的原秦州边军老书吏已倒在血泊中，三名身穿玄黑劲装、蒙着铁面护鼻的死士正逼住村中老里正与一对母子，逼问藏匿的关西水陆驿道图！'),
      S(SPEAKER_HUAYIN_ELDER, '“天杀的胡狗强盗！图册早烧成灰了，要杀便杀老汉一人，放过村里的娃娃！”'),
      S(SPEAKER_LIAO_KILLER_LEADER, '“嘴硬的老东西！野利、萧铁鹰，先把那妇人和小崽子的脑袋剁下来！”'),
    ],
    choices: [
      {
        id: 'hsq11_10_next',
        label: '飞石击偏弯刀，纵身落于妇孺与死士之间！',
        tone: 'danger',
        effects: [openScene('scene_hsq11_11', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_11: {
    id: 'scene_hsq11_11',
    title: '第十一幕 · 死士凶威',
    subtitle: '华阴村晒谷场 · 三才杀阵',
    mandatory: true,
    beats: [
      N('三名死士见半路杀出华山剑客，毫不慌乱，脚下瞬间错步结成北辽与西夏黑市合练的三才合击杀阵！首领耶律黑鹫手执燕云修罗斩马刀封住正面，左右两翼死士各持毒刃弯刀反扑身后百姓！'),
      S(SPEAKER_XIXIA_KILLER_SUB, '“这小子只有一个，缠住{gender:他|她}三息，照样屠光全村灭口！”'),
    ],
    choices: [
      {
        id: 'hsq11_11_next',
        label: '眼见两翼死士刀锋已逼近孩童脖颈，心念电转决断',
        tone: 'danger',
        effects: [openScene('scene_hsq11_12', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_12: {
    id: 'scene_hsq11_12',
    title: '第十二幕 · 杀机决断',
    subtitle: '华阴村晒谷场 · 禁忌解封',
    mandatory: true,
    beats: [
      N('三名死士俱是一流下品好手，若使《养吾剑法》或《希夷剑法》周旋拆招，纵能全身而退，身后手无寸铁的村民必在三息内惨遭毒手！'),
      P('（眸中寒芒暴涨，再不顾忌禁令）“人命关天，管他什么门规忌讳——《夺命连环三仙剑》，给我破！”'),
    ],
    choices: [
      {
        id: 'hsq11_12_next',
        label: '真气轰然贯入剑锋，人化残影直扑三名死士死穴！',
        tone: 'danger',
        effects: [openScene('scene_hsq11_13', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_13: {
    id: 'scene_hsq11_13',
    title: '第十三幕 · 三剑无生',
    subtitle: '华阴村晒谷场 · 夺命连环',
    illustrationUrl: '/assets/quests/hs_q11_huayin_slay.jpg',
    illustrationCaption: '三剑无生 · 华阴夜袭连环三剑瞬枭三名辽夏黑市死士',
    mandatory: true,
    beats: [
      N('火光映照之下，你的青锋骤然化作三道快逾鬼魅的凄冷电光！没有半点试探虚招，第一剑直取左翼毒刃咽喉，第二剑旋削右翼铁鹰眉心，第三剑挟着前两剑叠加的狂飙杀意直贯首领耶律黑鹫心窝！'),
    ],
    choices: [
      {
        id: 'hsq11_13_fight',
        label: '催动《夺命连环三仙剑》，以一敌三瞬斩辽夏黑市死士！',
        subLabel: '生死决战 · 耶律黑鹫等三名辽夏死士（一流下品合围）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildDeathSwornLeaderNpc() },
            extraOpponents: [
              { kind: 'custom', npc: buildDeathSwornLeftNpc() },
              { kind: 'custom', npc: buildDeathSwornRightNpc() },
            ],
            rule: 'duel',
            forbidEscapeReason: '身后便是华阴村无辜妇孺，退一步满村皆亡！',
            deathTitle: '血洒华阴寒夜',
            deathDetail: '你在华阴村为护卫百姓孤身独战三名辽夏黑市一流死士，力战殉义。',
            onWin: [openScene('scene_hsq11_14', HUASHAN_Q11_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq11_14: {
    id: 'scene_hsq11_14',
    title: '第十四幕 · 瞬枭三首',
    subtitle: '华阴村晒谷场 · 剑止人安',
    mandatory: true,
    beats: [
      N('嗤、嗤、嗤！三声轻响几乎在同一瞬间叠成一声！野利毒刃与萧铁鹰高举的弯刀尚停在半空，耶律黑鹫沉重的修罗斩马刀刚劈出一寸，三人眉心咽喉已齐齐迸出一线血珠，轰然僵直倒地！'),
      S(SPEAKER_HUAYIN_ELDER, '（劫后余生，携众乡民跪地泣拜）“神仙剑法！多谢华山{gender:少侠|女侠}救了全村老小的性命！”'),
      N('你急忙扶起老里正，帮着乡民扑灭草垛余火。正欲抹去三具尸首上过于显眼的剑创，头顶村口古柏梢头忽传来一声冷冽低喝！'),
    ],
    choices: [
      {
        id: 'hsq11_14_next',
        label: '心头猛地一震，抬头望向踏月落下的苍老身影',
        tone: 'default',
        effects: [openScene('scene_hsq11_15', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_15: {
    id: 'scene_hsq11_15',
    title: '第十五幕 · 寒月来客',
    subtitle: '华阴村口 · 巡山撞破',
    mandatory: true,
    beats: [
      N('乌云散开，一轮寒月洒下惨白清辉。「潼关剑神」秦烈山手按古剑自古柏之巅飘然落下——他今夜恰在西岳山麓巡查边关异动，将方才晒谷场上那石破天惊的三剑收尾瞧了个正着！'),
      N('秦烈山缓步走到耶律黑鹫三具尸首旁，目光落在那三处分毫不差、一剑穿喉透脑的品字连环剑孔上，整张脸霎时沉得如同万载寒冰。'),
    ],
    choices: [
      {
        id: 'hsq11_15_next',
        label: '垂剑立于原地，听秦烈山冷声发落',
        tone: 'primary',
        effects: [openScene('scene_hsq11_16', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_16: {
    id: 'scene_hsq11_16',
    title: '第十六幕 · 铁证难掩',
    subtitle: '华阴村口 · 命赴孤松',
    mandatory: true,
    beats: [
      S('NPC-0147', '（声音极轻，却带着令人窒息的威压）“一气三连，死穴同穿……《夺命连环三仙剑》。整整三十年了，老夫没想到还能在华山年轻一辈手里看见这道剑痕。”'),
      S('NPC-0147', '“莫惊扰受惊的乡亲。把死士身上的黑市密件收起来，随老夫上【华山绝顶论剑台 · 朝阳孤松观海亭】——今夜你不把话说清楚，谁也保不住你！”'),
    ],
    choices: [
      {
        id: 'hsq11_16_go_pine',
        label: '安顿好华阴乡民，随秦烈山登临朝阳孤松观海亭',
        tone: 'primary',
        effects: [
          setStep(HUASHAN_Q11_QUEST_ID, 'moon_interrogate'),
          toast('夺命剑痕已被识破！请前往【华山绝顶论剑台 > 朝阳孤松观海亭】回应秦烈山盘问！', 'warn', '寒月盘剑'),
        ],
      },
    ],
  },

  scene_hsq11_17: {
    id: 'scene_hsq11_17',
    title: '第十七幕 · 寒月盘剑',
    subtitle: '朝阳孤松观海亭 · 逼问剑心',
    illustrationUrl: '/assets/quests/hs_q11_qin_interrogate.jpg',
    illustrationCaption: '寒月盘剑 · 秦烈山巡山撞破夺命剑痕，冷目逼问剑心向背',
    mandatory: true,
    beats: [
      N('朝阳孤松观海亭下寒月如霜，万丈深渊云雾翻涌。秦烈山转过身来，如电冷目直刺你心底，一字一句沉声喝问：'),
      S('NPC-0147', '“三十年前玉女峰雪夜，老夫亲眼看着七位同门师兄弟倒在这路《夺命连环三仙剑》下，死不瞑目！封不弃是不是带你去过西峰旧剑庐了？！他传你这门杀剑，究竟是要你替我大宋杀贼，还是要你日后掉转剑尖、在华山上重掀三十年前的同门血海？！”'),
      N('松影深处似乎隐约有一缕极熟悉的气息正在暗中注视。一边是封不弃霜夜荒庐“切莫泄我师承”的泣血重托，一边是秦烈山痛彻肺腑的宗门公义之问——你心中剑意将指向何方？'),
    ],
    choices: [
      {
        id: 'hsq11_17_radical',
        label: '【依封不弃暗示隐瞒师承、暗中蓄势】咬定偶得西峰残谱自悟，守住剑宗秘密！',
        subLabel: '剑宗孤愤线 · 替封不弃担下干系，暗蓄重振剑宗之势',
        tone: 'danger',
        effects: [openScene('scene_hsq11_18', HUASHAN_Q11_QUEST_ID)],
      },
      {
        id: 'hsq11_17_upright',
        label: '【坦承所学并立誓绝不将夺命快剑指向同门】指寒月立誓，杀剑只斩外寇恶徒！',
        subLabel: '光明剑心线 · 坦荡止怨，获秦烈山钦重回护',
        tone: 'gold',
        effects: [openScene('scene_hsq11_21', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  // ── 分支 A（18..20）：隐瞒师承、暗中蓄势 ──
  scene_hsq11_18: {
    id: 'scene_hsq11_18',
    title: '第十八幕 · 托辞秘窟',
    subtitle: '朝阳孤松观海亭 · 守口如瓶',
    mandatory: true,
    beats: [
      N('你忆起西峰荒庐那七尊蒙尘断剑牌位，垂下眼帘将所有锋芒敛入心底，拱手沉声道：'),
      P('“此事与封师叔无涉！是弟子前月在西峰绝壁搜寻盗钟刺客余党时，偶于岩缝石匣中拾得半卷残缺古谱自行揣摩习练。今夜若非为救华阴百姓性命，弟子绝不敢妄动此剑，甘愿独领秦师伯责罚！”'),
    ],
    choices: [
      {
        id: 'hsq11_18_next',
        label: '单膝跪于寒霜石坪，默然承受秦烈山审视目光',
        tone: 'default',
        effects: [openScene('scene_hsq11_19', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_19: {
    id: 'scene_hsq11_19',
    title: '第十九幕 · 冷哼诫警',
    subtitle: '朝阳孤松观海亭 · 网开一面',
    mandatory: true,
    beats: [
      N('以秦烈山的阅历岂会不知《夺命连环三仙剑》无名师口授断难练成？他定定盯着你半晌，终究念在你既为护师兄或守古钟立功、今夜又实打实救下华阴满村妇孺，长长冷哼了一声。'),
      S('NPC-0147', '“岩缝拾谱？哼，你倒是个嘴严的主儿！今夜救民有功，老夫不向紫霞正殿纠举你；但你给我听真了——哪一日这路夺命三剑敢沾半滴华山同门的血，老夫亲自清理门户！”'),
      N('言罢，秦烈山拂袖踏月而去。'),
    ],
    choices: [
      {
        id: 'hsq11_19_next',
        label: '起身拍去膝头寒霜，看向松影后缓步走出的封不弃',
        tone: 'primary',
        effects: [openScene('scene_hsq11_20', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_20: {
    id: 'scene_hsq11_20',
    title: '第二十幕 · 暗流蓄势',
    subtitle: '朝阳孤松观海亭 · 孤峰寄望',
    mandatory: true,
    beats: [
      N('待秦烈山身影彻底消失在南峰云径，封不弃自古松阴影中闪身而出，重重拍了拍你的肩膀，冷峻眼底满是激赏。'),
      S('NPC-0167', '“泰山压顶而面不改色，宁可自己担罪也没把荒庐剑谱卖出来——好！我封不弃这辈子没收错人！把锋芒继续藏在剑鞘里，总有一日，我们要堂堂正正让天下人知道，华山之巅究竟是谁家的剑最快！”'),
    ],
    choices: [
      {
        id: 'hsq11_20_radical_done',
        label: '与封不弃对视颔首，将夺命杀机深深敛入青鞘',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'hs_jian_radical', value: true },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 20 },
          toast('已守住荒庐传剑之秘！封不弃对你极为器重（好感 +20）！', 'talk', '暗流蓄势'),
          openScene('scene_hsq11_24', HUASHAN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  // ── 分支 B（21..23）：坦承所学、立誓不伤同门 ──
  scene_hsq11_21: {
    id: 'scene_hsq11_21',
    title: '第二十一幕 · 坦荡指剑',
    subtitle: '朝阳孤松观海亭 · 指月立誓',
    mandatory: true,
    beats: [
      N('你深吸一口清冽山风，不闪不避迎向秦烈山的目光，双手横剑过顶，朝着天心寒月朗声说道：'),
      P('“弟子不敢欺瞒师伯！此剑确是剑宗长辈怜惜先人绝学失传所授；但剑本无罪，善恶全在持剑之人！三十年前的血泪教训，弟子在荒庐断剑前看得清清楚楚！”'),
      P('“弟子今日指太华寒月立誓：此生所修《夺命连环三仙剑》，只斩犯境胡虏、只诛虐民恶徒，若有半剑指向华山同门，教我人剑俱毁、天人共弃！”'),
    ],
    choices: [
      {
        id: 'hsq11_21_next',
        label: '铮然立剑石上，以澄澈坦荡之心静待剑神裁决',
        tone: 'gold',
        effects: [openScene('scene_hsq11_22', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_22: {
    id: 'scene_hsq11_22',
    title: '第二十二幕 · 剑神颔首',
    subtitle: '朝阳孤松观海亭 · 宿怨冰消',
    mandatory: true,
    beats: [
      N('山风吹过孤松松针，发出阵阵如涛清响。秦烈山凝视你坦荡无畏的双眸良久，按在剑柄上的五指缓缓松开，紧锁三十年的眉宇间终于化作一声欣慰长叹。'),
      S('NPC-0147', '“‘剑本无罪，善恶在人’……当年我们那一代师兄弟，若是早有你这八个字的胸襟，苍龙岭上又何至于流那么多冤血！”'),
      S('NPC-0147', '“好！老夫信你这一誓！今夜华阴村那三具辽夏死士尸首，老夫会亲自着人处理，绝不让东峰借题发挥难为你与封师弟！”'),
    ],
    choices: [
      {
        id: 'hsq11_22_next',
        label: '深深长揖谢过秦师伯成全回护之恩',
        tone: 'gold',
        effects: [openScene('scene_hsq11_23', HUASHAN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_hsq11_23: {
    id: 'scene_hsq11_23',
    title: '第二十三幕 · 正气存锋',
    subtitle: '朝阳孤松观海亭 · 殊途同心',
    mandatory: true,
    beats: [
      N('秦烈山走后片刻，松后传来封不弃一声听不出喜怒的轻哼。他抱剑走出暗影，斜睨了你一眼，嘴角却终究没有压住一丝释然。'),
      S('NPC-0167', '“哼，叫你保密，你倒跟秦师兄竹筒倒豆子立起誓来了！也罢……能让秦烈山亲口替你遮掩《夺命连环三仙剑》，满华山上下你是头一份。只要别把老祖宗的剑练钝了，随你的便！”'),
    ],
    choices: [
      {
        id: 'hsq11_23_upright_done',
        label: '向封师叔拱手一笑，心头阴霾尽散、剑意愈发纯粹',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'hs_jian_upright', value: true },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 20 },
          { type: 'modifyChivalry', delta: 15, reason: '华阴救民并指月立誓夺命快剑永不伤同门' },
          toast('光明剑心折服潼关剑神！秦烈山好感 +20，侠义 +15！', 'success', '正气存锋'),
          openScene('scene_hsq11_24', HUASHAN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  // ── 终幕（第 24 幕）：霜剑归鞘（双线收束） ──
  scene_hsq11_24: {
    id: 'scene_hsq11_24',
    title: '第二十四幕 · 霜剑归鞘',
    subtitle: '朝阳孤松观海亭 · 三仙大成',
    mandatory: true,
    beats: [
      N('天际泛起鱼肚晨光，秋霜在你的剑鞘上凝成一层晶莹银白。从西峰荒庐先辈断剑之痛，到华阴火海一气三连救民诛敌，再到孤松寒月下直面本心——'),
      N('地阶杀剑《夺命连环三仙剑》的凛冽锋芒，至此已彻底与你的华山快剑融为一体，只待日后更惊心动魄的风云际会！'),
    ],
    choices: [
      {
        id: 'hsq11_24_finish',
        label: '收妥缴获的辽夏黑市赏银与宗门功绩，潜心精修三仙剑诀',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-068', amount: 300 },
          { type: 'giveSilver', amount: 150, reason: '缴获辽夏黑市死士暗桩赏银及护村嘉奖' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'giveCombatExp', amount: 210, reason: '华阴夜袭连环三剑瞬枭三名一流死士' },
          { type: 'modifyRenown', delta: 28, reason: '潼关华阴一剑瞬斩辽夏黑市三名一流死士' },
          {
            type: 'branch',
            condition: flag('hs_jian_radical', 'truthy'),
            thenEffects: [
              { type: 'completeQuest', questId: HUASHAN_Q11_QUEST_ID, outcome: 'radical' },
            ],
            elseEffects: [
              { type: 'completeQuest', questId: HUASHAN_Q11_QUEST_ID, outcome: 'upright' },
            ],
          },
          toast('已完成《剑庐残烛 · 夺命三仙》！《夺命连环三仙剑》精进，获纹银 150 两、门派贡献 100 点！', 'success', '夺命三仙'),
        ],
      },
    ],
  },
}
