import type { NodeNpc } from '../../../types/game'
import type { QuestDefinition, StorySceneDef } from '../../../types/quest'

export const TAIHANG_BANDIT_QUEST_ID = 'QST-SECT-17-TAIHANG-BANDIT'

/**
 * 华北地区标准节点 ID 集合（河北、河东、京东、汴洛及周边名山关隘）
 */
export const NORTH_CHINA_REGION_IDS: ReadonlySet<string> = new Set([
  'yanmenguan',
  'wutaishan',
  'zhending',
  'taiyuan',
  'taihang',
  'daming',
  'jinan',
  'taishan',
  'bianliang',
  'luoyang',
  'shaolin',
])

/**
 * 构造太行山二流上品拦路劫匪（首次遭遇战对手，败后押赴开封府问斩）
 */
export function buildTaihangBanditRobberNpc(): NodeNpc {
  return {
    id: 'QUEST_TAIHANG_ROBBER_01',
    name: '雷震山',
    title: '太行铁臂盗',
    factionId: 'SECT-18',
    factionName: '太行/京东绿林盟',
    fullLocationLabel: '华北官道 · 拦路劫杀',
    realm: '二流上品',
    stats: {
      hp: 1768,
      mp: 1584,
      agi: 55,
      res: 41,
      isBenchmark: false,
    },
    talents: {
      bone: 68,
      comprehension: 54,
      charm: 42,
    },
    tenArts: {
      骑术: 72,
      算术: 12,
      经义: 10,
      策论: 40,
      诗词: 8,
      琴: 5,
      棋: 10,
      书: 8,
      画: 6,
      辩才: 22,
    },
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    sectRank: 3,
    sectRankLabel: '山寨悍匪头目',
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-157',
      move1: 'MA-151',
      move2: 'MA-124',
      move3: 'MA-131',
      move4: 'MA-189',
    },
    learnedArts: [
      { artId: 'MA-103', level: 5, exp: 0 },
      { artId: 'MA-157', level: 6, exp: 0 },
      { artId: 'MA-151', level: 7, exp: 0 },
      { artId: 'MA-124', level: 7, exp: 0 },
      { artId: 'MA-131', level: 6, exp: 0 },
      { artId: 'MA-189', level: 7, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-076',
      armor: 'ARM-039',
      shoes: 'BOT-025',
      bow: 'BOW-026',
      accessory1: 'ACC-054',
      accessory2: 'ACC-035',
      mount: 'MNT-021',
      curio1: null,
      curio2: null,
    },
    talk: '“此山是我开，此树是我栽！管你是不是开封府的鹰犬，留下买路财与身上腰牌！”',
  }
}

// ============================================================================
// 二十五幕完整剧本：《太行劫匪 · 华北风云》（开封府 / 六扇门 Lv.3 华北官道奇遇长卷）
// 声明顺序自终幕倒序排列，确保所有 openScene 引用皆已初始化
// ============================================================================

// ----------------------------------------------------------------------------
// 第四章：喋血归汴梁 · 公孙诊脉与一月闭关疗伤结案（第 21 ~ 25 幕）
// ----------------------------------------------------------------------------

const SCENE_25_RECOVERED_FINALE: StorySceneDef = {
  id: 'scene_thb_25_recovered_finale',
  title: '第二十五幕 · 沉疴尽去重佩符',
  subtitle: '开封府衙 · 升堂正殿',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '第三十日清晨，府衙后院紫竹林梢露珠初凝。你在榻上盘膝收功，丹田真气自任督二脉浩荡流转一周天，胸中淤积整月的最后一缕燥烈郁气终于化作一口浊息徐徐吐出。推门步出静室时，久违的晨光洒满肩头，沉重滞涩的四肢百骸已恢复如初，步伐轻健更胜往昔。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策早已候在阶前，搭脉细察片刻，捻须展颜笑道：“善哉，善哉！王重岳那股阴霸的《太行罡气》已被少侠悉数炼化驱除，受损肺络尽皆愈合，再无半分暗疾隐患。少侠经此生死大劫而后立，日后内息根基反而愈发凝练！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭手托一套浆洗如新的六扇门玄色劲装与擦拭得寒光湛然的金牌腰符走来，郑重递到你手中：“少侠大难不死，实乃我开封府之幸！这一个月里，韩大哥与赵兄弟已奉包大人手令知会河北、河东诸州驻军，在太行山各处出山口增设烽铺巡骑，王重岳与史万山一时绝不敢再轻出山隘。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '升堂正殿内，包拯亲手将一封朝廷批复的嘉奖公文与百五十两抚恤赏银置于案前，目光温厚而威严：“少侠先擒悍匪雷震山明正典刑，后于太行双雄合围之下孤身死战不退、保全朝廷体面全身而归。本府已将此案始末录档刑部，记少侠头等大功一次！只是太行绿林势大根深，日后行走河北诸路，仍须慎之又慎！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（重新佩好六扇门金牌腰符，向包拯、公孙策与展昭深深一揖）“多谢包大人厚赐，多谢公孙先生一月医药救命之恩与展大哥日夜护持！卑职伤势既愈，定当重归公门鞍马，护我大宋两京河朔朗朗乾坤！”',
    },
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 360 },
    { type: 'setFlag', flag: 'taihang_heavy_injury', value: false },
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    { type: 'giveSilver', amount: 150, reason: '开封府抚恤嘉奖赏银' },
    { type: 'modifyRenown', delta: 50, reason: '华北力敌太行双雄全身而退' },
    { type: 'modifyChivalry', delta: 30, reason: '忠勇履职，死战不屈' },
    {
      type: 'completeQuest',
      questId: TAIHANG_BANDIT_QUEST_ID,
      outcome: 'survived_and_recovered',
      combatExp: 450,
    },
    {
      type: 'toast',
      text: '在开封府强制养伤一月后，【太行重创】减益已彻底解除！《太行劫匪》任务线完结，获赏银 +150 两、声望 +50、侠义 +30、战斗经验 +450！',
      tone: 'success',
      logTag: '痊愈结案',
    },
  ],
}

const SCENE_24_MONTH_RECUPERATION: StorySceneDef = {
  id: 'scene_thb_24_month_recuperation',
  title: '第二十四幕 · 竹院药炉三十春',
  subtitle: '开封府衙 · 后院静养竹轩',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '自是日起，你便在开封府后院最僻静的翠竹小轩中闭门谢客，卸下刀剑甲胄，专心调养内腑重创。头十日最为煎熬，每逢子午二时体内残留的太行罡气便如烈火灼脉，痛得冷汗涔涔；公孙策不辞辛劳，每日寅时亲自守在泥炉旁以文火慢煎三七、血竭、川贝与长白老参，盯着你趁热服下。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '到了中旬，胸口撕裂般的剧痛终于渐渐化开。闲暇午后，展昭常在巡值归来时提一壶清茶步入竹轩，与你在石桌上摆开残局，或细细拆解当日王重岳与史万山联手夹击时的掌棍破绽：“王重岳的《太行罡气》胜在刚猛沉雄，却在换气转折处略嫌滞重；少侠当日能于第五合借力坠涧，这份临敌决断，便是许多浸淫江湖二十载的老捕头也未必及得上。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0178' },
      text: '下旬时分，神捕铁手韩破虏与追命赵烈风亦曾携州桥新出笼的灌汤包与热羊汤来院中探望。韩破虏拍着胸脯哈哈笑道：“少侠尽管把心放在肚子里养伤！这月余功夫，河南北路那些绿林毛贼听说少侠在太行双雄手底下走脱，反倒收敛了许多，连官道商队都太平了不少！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（在竹榻上缓缓吐纳导引，感受着药力化作涓涓暖流滋养干涸经脉，心中一片澄明）“生死一线方知武道浩瀚，也方知开封府诸位同僚守望相助的情义。待这一月期满伤势痊愈，我的内家修为定能更进一步！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_25_RECOVERED_FINALE }],
}

const SCENE_23_BAO_ZHENG_ORDER: StorySceneDef = {
  id: 'scene_thb_23_bao_zheng_order',
  title: '第二十三幕 · 龙图抚恤严停差',
  subtitle: '开封府衙 · 内堂书房',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '听闻你带伤归府，正在批阅奏疏的包拯当即搁下朱笔快步走入内堂。见你脸色惨白如金纸、玄衣前襟尽是干涸暗红的血迹，这位素来铁面冷峻的龙图阁直学士也不禁眼眶微热，沉声叹道：“好孩子……苦了你了！先莫起身行礼，快快靠榻坐好！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（倚在软枕上勉力抱拳，声音沙哑却字字清晰）“启禀大人……太行山王重岳与史万山因雷震山伏法一事怀恨在心，亲率精锐潜至华北官道设伏……卑职学艺未精，未能擒贼，只探明此二人确有啸聚山林、仇视朝廷法度之心，特赶回禀明大人早做防备……”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯肃然颔首：“以一敌二，面对太行正副两位总瓢把子犹能全身而退带回警讯，已是万死一生之奇功，何来请罪之说！若本府只知驱策麾下良将卖命，却不顾惜尔等性命根本，包某还有何面目坐这开封府正堂？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“大人仁厚！公孙先生方才诊脉断定，少侠肺腑受《太行罡气》震伤极深，非闭门静养整整三十日不可痊愈。卑职恳请大人准许少侠留在府衙后院竹轩养伤，一应公文差遣暂由展某与韩、赵诸位兄弟分担！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '“准奏！本府现下严令：自今日起停免少侠一切外派公干整整一月，开府库取出宫中御赐的紫金护心散与百年辽参交公孙先生入药。三十日未满之前，少侠半步也不许踏出府衙大门——这是本府钧令，不得违拗！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_24_MONTH_RECUPERATION }],
}

const SCENE_22_GONGSUN_DIAGNOSIS: StorySceneDef = {
  id: 'scene_thb_22_gongsun_diagnosis',
  title: '第二十二幕 · 银针护脉辨罡毒',
  subtitle: '开封府衙 · 内堂医庐',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '展昭与无情公子崔略商一左一右将你稳稳扶入府衙内堂软榻，展昭双掌抵住你背后灵台穴徐徐渡入一股醇和纯正的护体真气，替你压住翻涌欲呕的气血；公孙策提着紫檀药箱匆匆赶至，指尖刚搭上你寸关尺三脉，脸色便骤然大变。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '“嘶——好生霸道酷烈的内家劲力！少侠心脉外围竟盘踞着一股凝而不散、如铁石挤压般的燥烈真气，每一次呼吸都在磨损手太阴肺经与足厥阴肝经！展护卫，快取老夫药囊中的九转金针来！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '公孙策手法疾如流星，七枚细长银针接连刺入你膻中、期门、云门诸穴，针尾微微颤动，嗡鸣不止，竟隐隐渗出几丝乌黑淤血。良久，你胸口那块仿佛重逾千斤的巨石方才稍稍松动，长长喘出一口气来。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '公孙策拭去额角细汗，神色凝重至极：“此乃太行天王王重岳浸淫三十余年的独门绝学《太行罡气》！幸亏少侠在第五合卸去了三成掌力，又未曾在逃归途中强行运功冲关，否则此刻经脉早已寸断！但即便如此，这股异种罡气已渗入五脏膜原，必须立刻闭关停差、以汤药辅以温养导引整整调理一个月，方能彻底拔除病根！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_23_BAO_ZHENG_ORDER }],
}

const SCENE_21_STAGGER_INTO_KAIFENG: StorySceneDef = {
  id: 'scene_thb_21_stagger_into_kaifeng',
  title: '第二十一幕 · 染血归衙叩正堂',
  subtitle: '开封府衙 · 升堂正殿',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '一路晓行夜宿、强忍脏腑如割的剧痛策马南归，当你终于望见开封府衙门前那面熟悉的鸣冤大鼓与石狮时，紧绷数日的心弦骤然一松，眼前阵阵发黑。你咬破舌尖勉力提住最后一口气，扶着廊柱一步一顿踏入升堂正殿，刚过门槛便再也支撑不住，单膝重重跪倒在青砖地上！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '正在堂前擦拭巨阙剑的展昭霍然抬头，见状大惊失色，身形如红云掠电般抢步上前一把托住你的双臂：“少侠！怎地伤成这般模样？！来人，快请公孙先生携药箱来内堂！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0227' },
      text: '廊下轮椅轻响，无情公子崔略商亦凝眸赶至，目光落在你胸前掌印焦痕与肩头淤紫棍伤之上，清冷面容骤然一凛：“胸口掌印边缘如刀劈斧凿，肩侧棍痕隐现龙鳞铜纹……是太行山王重岳与史万山联手下的重手！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（借着展昭手臂之力勉强稳住身形，唇角溢出一丝血迹）“展大哥……崔师兄所言不差……那王重岳与史万山为替雷震山报仇，在华北峡道联手设伏……卑职拼死撑过五合侥幸脱身，特赶回府衙报警……”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_22_GONGSUN_DIAGNOSIS }],
}

// ----------------------------------------------------------------------------
// 第三章：三十日后华北截杀 · 双雄合围与生死分途（第 13 ~ 20 幕，含战败 2 幕）
// ----------------------------------------------------------------------------

const SCENE_20_RAVINES_CRAWL: StorySceneDef = {
  id: 'scene_thb_20_ravines_crawl',
  title: '第二十幕 · 深涧呕血强南归',
  subtitle: '华北官道外 · 幽谷寒潭',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '不知在冰冷刺骨的涧水中随波冲出多远，你方才凭着顽强意志抓住岸边一截盘曲老树根，极其艰难地攀上芦苇丛生的浅滩。刚一仰躺在地，胸膛内潜伏的那股《太行罡气》便猛然发作，“哇”地吐出一大口紫黑淤血，浑身骨节酸软如泥，连抬手握剑都倍感吃力。',
    },
    {
      speaker: { kind: 'player' },
      text: '（撕下内衫布条死死缠紧肩头裂伤，感受着丹田内滞涩紊乱的气息，眉峰紧锁）“好生霸道的太行罡气……那一掌虽被我卸去小半，余劲仍震伤了肺腑经脉，眼下气血与身法至少折损了三成！此地荒僻不可久留，趁太行群匪退去，必须尽快寻回坐骑，星夜兼程赶回【开封府】向展大哥禀报并请公孙先生医治！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '暮色苍茫中，你拄着折断的树枝一瘸一拐走出涧谷，在三里外的荒坡林间寻回受惊跑散的坐骑。翻身上马之际胸口又是一阵剧痛，你俯身伏在马背之上，任由冷风吹拂满面血污，沿着通往东京汴梁的古道疾驰而去。',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'taihang_heavy_injury', value: true },
    { type: 'healPlayer', hpPct: 20, mpPct: 25 },
    {
      type: 'setQuestStep',
      questId: TAIHANG_BANDIT_QUEST_ID,
      stepId: 'report_and_recuperate',
      deadlineDays: null,
      silent: false,
    },
    {
      type: 'toast',
      text: '虽撑过五合侥幸逃生，然身负【太行重创】减益（气血上限与身法 -25%）！请速返【开封府】向展昭汇报并养伤。',
      tone: 'warn',
      logTag: '重伤突围',
    },
  ],
}

const SCENE_19_BANDITS_RETREAT: StorySceneDef = {
  id: 'scene_thb_19_bandits_retreat',
  title: '第十九幕 · 悬崖收掌忌烽烟',
  subtitle: '华北官道 · 断涧崖顶',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '断崖之上山风呼啸，涧底水雾弥漫、乱流奔涌，转瞬之间已不见了你的踪影。史万山提着熟铜大棍抢到崖边往下张望，怒不可遏地一棍砸碎崖畔青石：“他娘的！这小捕头倒滑溜得紧，竟敢往这十丈深的鬼愁涧里跳！大哥，我这就带几个水性好的弟兄绕下山谷，活要见人、死要见尸！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0142' },
      text: '王重岳缓缓收回右掌，负手立于悬崖边，目光瞥见十里外官道驿铺方向骤然升起的一道巡防狼烟与隐隐传来的边军马蹄号角声，沉声喝止道：“不必追了！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0229' },
      text: '“大哥，难道就这么便宜了那开封府的小子？”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0142' },
      text: '王重岳冷哼一声，紫髯在山风中微颤：“方才最后一合，他胸口结结实实受了王某七成《太行罡气》，肩头又挨了你一棍。莫说坠下这乱石激流十有八九要粉身碎骨，便算他命大爬上岸去，五脏经脉也已被我的罡气震裂，没个把月名医调养，不过是个手无缚鸡之力的废人！官军巡骑将至，传令弟兄们撤路障，回太行总寨！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_20_RAVINES_CRAWL }],
}

const SCENE_18_ROUND5_BREAKOUT: StorySceneDef = {
  id: 'scene_thb_18_round5_breakout',
  title: '第十八幕 · 硬受罡风坠寒涧',
  subtitle: '华北官道 · 险峰峡谷',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '五合生死搏杀，每一息皆在鬼门关前徘徊！王重岳双掌翻飞，雄浑刚猛的《太行罡气》震得方圆三丈飞沙走石；史万山一条熟铜盘龙棍更是舞得泼水不进，棍风呼啸直取周身大穴。你凭借平日苦修的身法与守御招式左支右绌，衣衫已被劲风撕开数道血口，一步步借势退至东侧百尺断涧边缘！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0142' },
      text: '“第五合已至——给王某留下命来！”王重岳双目精光暴涨，右掌凝聚全身罡气如泰山压顶般迎胸拍落，与此同时史万山横棍拦腰扫至，竟是要将你退路彻底封死！',
    },
    {
      speaker: { kind: 'player' },
      text: '（眼中闪过一抹决绝厉色，非但不退，反而横兵斜架硬生生格偏铜棍三寸，同时拼尽全力回气护住心脉）“想留某家性命——还没那么容易！走！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '“砰！”一声闷雷巨响，你肩头擦中铜棍、胸口更硬受了王重岳七成掌力，喉头一甜，一口鲜血夺口喷出！然而你也恰恰借着这股排山倒海般的反震巨力，身形如断线纸鸢般向后倒射而出，撞断崖边枯藤，径直坠入云雾缭绕的百尺激流深涧之中！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_19_BANDITS_RETREAT }],
}

const SCENE_17_TAIHANG_BEHEADING: StorySceneDef = {
  id: 'scene_thb_17_taihang_beheading',
  title: '第十七幕 · 粗衣跪寨饮刀终',
  subtitle: '太行山绿林总寨 · 聚义厅外校场',
  illustrationUrl: '/assets/quests/taihang_beheading.jpg',
  illustrationCaption: '太行山寨校场 · 身着粗布囚衣押跪待斩',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '暮色如血，太行山绿林总寨聚义厅外的石坪校场上插满了熊熊燃烧的松脂火把，黑底赤字的“替天行道”大旗在朔风中猎猎狂舞。数百名太行悍匪手执明晃晃的朴刀环立四周，叫嚣喝骂之声震彻山谷。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你身上的六扇门锦袍、护甲与佩兵早已被剥得干干净净，只套着一件单薄破旧的灰褐粗布囚衣，双手被粗麻绳死死反绑于身后。两名满脸横肉的山匪铁塔般按住你的双肩，强行将遍体鳞伤的你押跪在冰冷刺骨的斩首石台之前；身侧一名赤膊蒙面的山寨刽子手正高高举起厚背鬼头大刀，刀锋映着火光森然欲滴。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0142' },
      text: '高台虎皮交椅之上，太行天王王重岳端起一碗烈酒狠狠摔碎在石阶前，声若洪钟：“众家兄弟听真！一月前雷震山兄弟在汴梁市曹挨了官府一刀，今日王某与史二弟便把这开封府的金牌鹰犬活捉上山，剥去他那身狗皮官衣，一刀还一刀，祭我太行山亡魂！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0229' },
      text: '史万山狞笑着大手一挥：“时辰已到，砍下这狗官脑袋悬挂山口三日，看开封府包黑子与展昭小儿敢奈我太行山何——动手！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '山风呜咽，火影摇曳。你昂首怒视群匪，终究无力挣脱铁索麻绳。伴随着一声震耳欲聋的狂喝，沉重的鬼头大刀挟着寒风悍然劈落，满腔热血洒入太行冻土，壮志未酬身先死……',
    },
  ],
  onFinishEffects: [
    {
      type: 'triggerGameOver',
      reasonTitle: '兵败被擒 · 斩首太行山寨',
      reasonDetail:
        '你在华北官道遭太行天王【王重岳】与九纹狂龙【史万山】联手围堵，未能撑过五合重伤被擒，最终身着粗布囚衣被押回太行山寨斩首祭旗。',
      killerName: '王重岳 · 史万山',
    },
  ],
}

const SCENE_16_DEFEAT_CAPTURED: StorySceneDef = {
  id: 'scene_thb_16_defeat_captured',
  title: '第十六幕 · 真气崩摧陷重围',
  subtitle: '华北官道 · 险峰峡谷',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '双拳难敌四手，况且眼前乃是威震河北绿林的两大一流高手！不过数合交锋，史万山一记狂暴无匹的【少林齐眉棍】震麻你虎口，紧接着王重岳欺身而进，一掌雄浑霸道的《太行罡气》结结实实印在你胸膛膻中穴上！',
    },
    {
      speaker: { kind: 'player' },
      text: '（护体真气轰然崩碎，仰天喷出一口鲜血，双膝一软重重栽倒在乱石尘埃之中，视线迅速模糊）“不好……内息已绝……竟没能撑过这五合……”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0229' },
      text: '史万山上前一脚踢飞你脱手的兵刃，狞笑着连封你周身六处大穴：“哈哈哈！大哥好掌力！什么狗屁开封府金牌总捕，在咱们兄弟联手之下还不是如死狗一般！小的们，剥了他的官衣甲胄，套上粗布麻衣绑进囚笼，连夜押回太行总寨砍头祭旗！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_17_TAIHANG_BEHEADING }],
}

const SCENE_15_PRE_COMBAT_RESOLVE: StorySceneDef = {
  id: 'scene_thb_15_pre_combat_resolve',
  title: '第十五幕 · 绝境审势守五合',
  subtitle: '华北官道 · 险峰峡谷',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '峡谷两侧峭壁上弓弦声齐响，数十名太行精锐刀斧手已将前后山口堵得水泄不通。正前方王重岳双足微沉，周身衣袍无风自动，隐隐透出一股如山岳倾颓般的浑厚罡气；左翼史万山横提熟铜棍步步逼近，九条青龙刺青在肌肉虬结的臂膀上狰狞欲活。',
    },
    {
      speaker: { kind: 'player' },
      text: '（深吸一口冷气，反手掣出兵刃横于胸前，余光飞速瞥向东侧数丈外云雾翻涌的断涧激流）“王重岳乃一流上品宗匠，史万山亦是一流下品凶徒，二人联手合击威力倍增，死战硬拼绝无生理！但东侧断崖下便是连通漳水支流的深涧，十里外又有官道烽铺——只要我紧守门户、在二人狂攻之下硬撑过五个回合，便能借势退至崖边跃涧脱身！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0142' },
      text: '“冥顽不灵！二弟，随我一齐出手，莫教这朝廷鹰犬走脱半步——杀！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'startCombat',
      questId: TAIHANG_BANDIT_QUEST_ID,
      opponent: {
        kind: 'npc',
        npcId: 'NPC-0142',
        talkOverride: '“拿命来祭我太行山被斩的弟兄！”',
      },
      extraOpponents: [{ kind: 'npc', npcId: 'NPC-0229' }],
      rule: 'survive_rounds',
      lethalOnLose: false,
      maxRounds: 5,
      forbidEscapeReason: '王重岳与史万山左右合围封死前后峡道，唯有硬撑五合方能寻隙跃涧突围！',
      introText: '面对太行天王【王重岳】与九纹狂龙【史万山】1v2 联手围攻，须死守撑过 5 个回合！',
      onWin: [{ type: 'openScene', scene: SCENE_18_ROUND5_BREAKOUT }],
      onLose: [{ type: 'openScene', scene: SCENE_16_DEFEAT_CAPTURED }],
    },
  ],
}

const SCENE_14_TWIN_LEADERS_APPEAR: StorySceneDef = {
  id: 'scene_thb_14_twin_leaders_appear',
  title: '第十四幕 · 太行双雄拦狭道',
  subtitle: '华北官道 · 险峰峡谷',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '烟尘尚未散尽，前方滚石堆后缓缓走出两道魁梧如山的身影。居中一人年约四旬，紫髯阔面，身披玄铁护心兽吞甲，不怒自威，正是统领太行三十六寨的总瓢把子——太行天王【王重岳】！其身侧一人敞着衣襟，浑身上下刺满九条张牙舞爪的青龙，手提一杆碗口粗的熟铜齐眉大棍，赫然是太行副总瓢把子——九纹狂龙【史万山】！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0142' },
      text: '王重岳目光如冷电般锁定在你腰间那块六扇门金牌之上，声音低沉似闷雷滚过山谷：“阁下便是月前在官道生擒雷震山、押赴汴梁市曹问斩的那位开封府金牌总捕？好胆魄，竟还敢单骑踏足我华北地界！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0229' },
      text: '史万山手中熟铜大棍往青石地面重重一顿，震出寸许裂纹，怒极反笑道：“雷震山乃某家一手提拔的把兄弟！你们开封府在东京摆大排场砍他脑袋的时候，可曾想过我太行山绿林盟几千号弟兄答不答应？今日撞在爷爷手里，定要把你剥皮抽筋，押回太行山寨当众砍头祭旗！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（勒定受惊战马，面对两大绿林巨擘毫无惧色，朗声喝道）“雷震山在河北官道滥杀无辜商旅十余命，铁证如山，依大宋王法当斩！尔等身为绿林首领，不思约束部众，反为凶徒寻仇截杀朝廷命官，莫非真以为国法刀兵奈何不得太行山么！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_15_PRE_COMBAT_RESOLVE }],
}

export const TAIHANG_LEADERS_AMBUSH_SCENE: StorySceneDef = {
  id: 'scene_thb_13_canyon_trap',
  title: '第十三幕 · 断崖风紧鸟惊飞',
  subtitle: '华北官道 · 险峰峡谷',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '自东京市曹行刑算起，转眼已过三十余日。这一日天色阴沉，铅云低垂，你策马穿行于华北官道一处两山夹峙的幽深峡谷之中。原本偶有货郎驼铃往来的山道此刻竟空无一人，连枝头山雀也似受了莫大惊吓般扑棱棱成群飞起。',
    },
    {
      speaker: { kind: 'player' },
      text: '（猛然一拽马缰停在峡谷中段，耳廓微动，眼神瞬间锐利如鹰）“不对！两侧崖顶松林有数十人的呼吸脚步声，且气息沉凝剽悍，绝非寻常毛贼——不好，中埋伏了！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '念头未落，只听崖顶一声凄厉号角长鸣，紧接着“轰隆隆”巨响震耳欲聋！数株合抱粗的伐倒巨木与千斤滚石自前后两处隘口同时砸落，激起漫天尘土，瞬间将整条峡谷官道前后退路彻底封死！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_14_TWIN_LEADERS_APPEAR }],
}

// ----------------------------------------------------------------------------
// 第二章：开封府衙会审 · 五日待斩与市曹正法（第 6 ~ 12 幕）
// ----------------------------------------------------------------------------

const SCENE_12_NORTH_SPY_SHADOW: StorySceneDef = {
  id: 'scene_thb_12_north_spy_shadow',
  title: '第十二幕 · 灰鸽北去伏杀机',
  subtitle: '东京开封府 · 市曹街角',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '行刑过后，禁军甲士收队清理刑场，围观百姓三三两两议论着散去。就在此时，西侧酒楼飞檐下忽然掠起一只羽毛呈铁灰色的快翎信鸽，振翅穿过阴沉云层，径直向北方太行山脉方向疾飞而去！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0226' },
      text: '人群暗处，冷血名捕冷凌弃手按长剑快步走出，抬头望向消失在北天尽头的灰影，冷峻眉宇微蹙：“展大哥、少侠，方才酒楼后巷有一名河北口音的货郎趁乱放飞了太行山独有的铁羽传讯鸽，等我追过两条街巷，那人已混入骡马市不见踪迹。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭负手凝望北方天际，长叹一声：“不出所料，太行绿林盟在汴梁城外果然布有耳目。不出数日，雷震山枭首市曹的消息便会传上太行总寨聚义厅。以王重岳和史万山睚眦必报的性子，多半会在月余之内纠集人手南下寻仇。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭转过身，将府衙签发的四十两赏银递入你手中，郑重叮嘱道：“少侠此番除暴安良功不可没。这月余之内风声尚缓，但三十日之后若再奉命或私事北上河北、河东、京东一带官道，切记打起十二分精神，切莫轻敌冒进！”',
    },
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 40, reason: '缉拿太行悍匪伏法赏银' },
    { type: 'modifyRenown', delta: 15, reason: '除暴安良，市曹正法' },
    { type: 'modifyChivalry', delta: 15, reason: '肃清官道悍匪' },
    {
      type: 'setQuestStep',
      questId: TAIHANG_BANDIT_QUEST_ID,
      stepId: 'cooldown_wait',
      deadlineDays: 29,
      silent: false,
    },
    {
      type: 'toast',
      text: '太行悍匪雷震山已于开封市曹处斩！获赏银 +40 两、声望 +15、侠义 +15。太行眼线已传讯北上（冷却 30 日）。',
      tone: 'talk',
      logTag: '市曹行刑',
    },
  ],
}

const SCENE_11_KAIFENG_EXECUTION: StorySceneDef = {
  id: 'scene_thb_11_kaifeng_execution',
  title: '第十一幕 · 市曹刀落明典刑',
  subtitle: '东京开封府 · 市曹刑场',
  illustrationUrl: '/assets/quests/kaifeng_execution.jpg',
  illustrationCaption: '东京市曹刑场 · 太行悍匪雷震山明正典刑',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '开封府市曹刑场设于城南繁华十字街口，高筑的木台四周旌旗肃立，铁甲禁军持戟环卫，将数千名闻讯赶来的汴京百姓与河北苦主隔在绳栏之外。雷震山被剥去上衣、插着亡命红签押跪在湿冷的刑台木墩前，昔日不可一世的凶焰在森森刀戟与万民唾骂声中终于化作一片死灰。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '日影渐移，铜壶滴漏恰指午时三刻！刑场鼓架上三通沉雷大鼓轰然擂响，监斩台前公孙策高声宣读罪状毕，包拯黑面如铁，抓起案上朱漆斩签往台下重重一掷，喝声震彻长街：“国法森严，杀人偿命！时辰已到——行刑！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '台下魁梧蒙面的刽子手口含烈酒，“噗”地喷在九环鬼头大刀雪亮的刀刃之上，双臂肌肉暴起，大喝一声挥刀劈落！但见寒光一闪、血溅三尺，恶贯满盈的太行铁臂盗雷震山当场身首异处！刑场四周顿如沸水炸开，苦主们跪地痛哭叩谢青天，满城百姓齐声喝彩！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_12_NORTH_SPY_SHADOW }],
}

const SCENE_10_DAWN_PRISON_ESCORT: StorySceneDef = {
  id: 'scene_thb_10_dawn_prison_escort',
  title: '第十幕 · 晨钟提牢赴市曹',
  subtitle: '东京开封府 · 御街押囚',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '光阴似箭，五日期限转瞬即至。第五日黎明，大相国寺浑厚肃穆的晨钟刚刚撞响三声，开封府死囚大牢沉重的铁栅门便轰然开启。追命神行赵烈风与数十名披甲衙役将戴着沉重铁枷木杻的雷震山提押出牢，推入早已备好的黑木囚车之中。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0179' },
      text: '赵烈风按刀走在你与展昭身侧，压低声音道：“这五日里牢城内外倒还安稳，未见太行贼党敢来劫狱——毕竟是在天子脚下、又有展大哥与少侠坐镇，借他们十个胆子也不敢闯开封府大牢。不过今日过御街赴市曹，各处街口皆已增派了冷血师弟的人手盯梢。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '囚车轱辘碾过清冷的青石御街，沿途早起的商贩百姓见木牌上书着“太行劫杀重犯雷震山斩立决”十二个朱红大字，无不拍手称快，更有曾遭太行山匪劫掠的行商含泪向开封府仪仗遥遥跪拜。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_11_KAIFENG_EXECUTION }],
}

const SCENE_09_ZHANZHAO_COURTYARD_TALK: StorySceneDef = {
  id: 'scene_thb_09_zhanzhao_talk',
  title: '第九幕 · 演武廊下论太行',
  subtitle: '开封府衙 · 六扇门捕快演武院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '退堂之后，天色已近黄昏。你随展昭穿过开封府偏廊来到六扇门演武院中，晚风吹拂着院角古槐树叶沙沙作响，几名年轻捕快正在石锁桩前勤练刀棒。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭停步廊下，神色凝重地向你道：“少侠今日立下大功，但雷震山临押入大牢前那几句狂言，却不可全然当作虚声恫吓。太行山绿林总寨依仗千里险峰，近年来由‘太行天王’王重岳统摄三十六寨，麾下又有‘九纹狂龙’史万山等悍将，声势早已不在寻常名门大派之下。”',
    },
    {
      speaker: { kind: 'player' },
      text: '（点头沉吟道）“卑职在河北办差时亦曾听闻，王重岳修为已臻一流上品，一手《太行罡气》刚猛绝伦；史万山曾习少林外门棍法与八极崩拳，亦是一流好手，且二人最为护短重义（匪义）。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '“正是如此。包大人判雷震山五日后于市曹明正典刑，正是要震慑河北、京东宵小，扬朝廷律法之威。这五日少侠可随处调理休整，待第五日刑期届满，本府便将其押赴市曹问斩！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: TAIHANG_BANDIT_QUEST_ID,
      stepId: 'await_execution',
      deadlineDays: 4,
      silent: false,
    },
    {
      type: 'toast',
      text: '已将雷震山移交展昭收押死囚监！包大人下令五日后于开封府市曹处斩。',
      tone: 'success',
      logTag: '收押待斩',
    },
  ],
}

const SCENE_08_BAO_ZHENG_TRIAL: StorySceneDef = {
  id: 'scene_thb_08_bao_zheng_trial',
  title: '第八幕 · 龙图拍木判秋决',
  subtitle: '开封府衙 · 升堂正殿（三口铜铡）',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '“威——武——！”随着两排皂隶水火棍齐齐顿地，开封府升堂正殿内烛火通明，龙头、虎头、狗头三口御赐铜铡在堂下泛着慑人心魄的森冷幽光。包拯端坐明镜高悬匾下，双目如电，俯视堂下跪着的雷震山。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '雷震山',
        title: '太行铁臂盗（阶下囚）',
        factionName: '太行/京东绿林盟',
        portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
      },
      text: '雷震山初时犹自梗着脖子狞笑：“包黑子！成王败寇，老子在太行山吃香喝辣，今日栽在你们六扇门手里无话可说！但你若敢动老子一根汗毛，我太行山王大天王与史二当家率几千弟兄杀下山来，定叫河北官道寸草不生！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '包拯猛地一拍惊堂木，声若春雷炸响：“大胆狂徒！死到临头犹敢在公堂之上妄言要挟朝廷命官！你在真定、大名、汴洛官道先后劫掠商队七起、残杀无辜商旅脚夫十有四人，桩桩血债皆有人证物证俱在！莫说那王重岳远在太行，便算他今日亲至本府堂前，触犯大宋刑律亦难逃三口铜铡！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0013' },
      text: '雷震山被包拯凛然正气震得冷汗直流，在如山铁证前只得垂首画押。包拯提朱笔判道：“依《宋刑统》强盗杀人律，判贼首雷震山死罪！即刻打入死囚重监，通报刑部备案，定于五日之后午时三刻押赴东京市曹刑场——斩立决，枭首示众！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_09_ZHANZHAO_COURTYARD_TALK }],
}

const SCENE_07_GONGSUN_VERIFY: StorySceneDef = {
  id: 'scene_thb_07_gongsun_verify',
  title: '第七幕 · 主簿核档铁证凿',
  subtitle: '开封府衙 · 升堂正殿偏厅',
  beats: [
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '主簿公孙策闻讯自架阁库抱出厚厚三册海捕旧档，戴上水晶叆叇，将你搜缴的那三份染血商旅路引、大名府火漆银封与那柄厚背鬼头大刀逐一置于长案上细细比勘。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0030' },
      text: '不过一盏茶功夫，公孙策便合上卷宗，振袖肃然道：“展护卫、少侠，全对上了！皇祐元年秋真定府绸缎商林氏父子遇害案、腊月大名府转运司解差被劫案，连同前日徽州茶商周氏七人命案，死者创口皆是三分厚背锯齿鬼头刀所留，与雷震山此刀缺口分毫不差！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0178' },
      text: '神捕铁手韩破虏重重一拍大腿，痛快道：“好！这厮往日仗着太行山地势险恶，每次做下血案便一头钻回深山老林，害得兄弟们扑空了好几回！如今人赃并获，公孙先生这就禀请包大人升堂定谳吧！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_08_BAO_ZHENG_TRIAL }],
}

const SCENE_06_ARRIVE_KAIFENG_YAMEN: StorySceneDef = {
  id: 'scene_thb_06_arrive_kaifeng',
  title: '第六幕 · 铁索入京交南侠',
  subtitle: '开封府衙 · 升堂正殿',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '一路晓行夜宿、严加看管，你押着五花大绑的雷震山顺利穿过东京宣德门外城，踏入庄严肃穆的开封府衙。正值当值的南侠展昭与神捕铁手韩破虏见你牵绳押犯步入大堂，当即快步迎上前来。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭目光一扫那人犯铁塔般的身形与臂上刺青，眼中顿时闪过一抹亮色：“咦？此人莫非是六扇门海捕文书上悬赏已久的太行山二流上品悍匪——‘太行铁臂盗’雷震山？少侠竟在官道将他生擒活捉了回来！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（抱拳行礼，将手中牛筋绳索交给韩破虏，又取出油布包好的染血路引、火漆银封与太行黑旗铜牌双手呈上）“回展大哥、韩大哥，正是此獠！数日前卑职行经华北官道，恰逢雷震山率众拦路劫杀，当场将其拿下，并救出幸存徽州老茶商一名，这是自贼首怀中搜出的历次劫案赃证！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0140' },
      text: '展昭接过证物郑重颔首：“少侠辛苦！韩大哥，先把这厮押在堂口看牢，即刻请公孙先生取河北历年悬案卷宗来核验物证！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_07_GONGSUN_VERIFY }],
}

// ----------------------------------------------------------------------------
// 第一章：华北官道遇劫 · 擒贼搜证（第 1 ~ 5 幕）
// ----------------------------------------------------------------------------

const SCENE_05_ESCORT_DEPART: StorySceneDef = {
  id: 'scene_thb_05_escort_depart',
  title: '第五幕 · 缚虎登程赴汴梁',
  subtitle: '华北官道 · 暮色驿途',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '送别幸存的老茶商往邻近州县报官收殓同伴后，你回到山道中央，用六扇门特制的浸油牛筋索将雷震山双臂连同琵琶骨死死缠了三匝，又封住他气海穴，使其一身二流上品的横练功夫半点也施展不出。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '雷震山',
        title: '太行铁臂盗（被擒）',
        factionName: '太行/京东绿林盟',
        portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
      },
      text: '雷震山被推搡着踉跄前行，满脸横肉因怨毒而扭曲，咬牙切齿地骂道：“姓甚名谁的小狗官，有种报上名号！我雷震山乃是太行副总瓢把子‘九纹狂龙’史二当家的结义兄弟！今日你敢拿我去开封府邀功，不出满月，太行天王与史二当家必叫你血溅五步、死无葬身之地！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（将他的鬼头大刀与赃物一并捆在马鞍后侧，冷然一抖马缰）“食朝廷俸禄，守一方平安！莫说一个史万山，便是太行三十六寨齐出，某家这枚金牌也绝不向恶匪低头半分——走，随我回【开封府】见展大人与包相爷！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: TAIHANG_BANDIT_QUEST_ID,
      stepId: 'escort_to_kaifeng',
      silent: false,
    },
    {
      type: 'toast',
      text: '已生擒太行二流上品悍匪【雷震山】！请将其押解至【开封府 · 开封府衙（六扇门） · 升堂正殿】交予展昭。',
      tone: 'success',
      logTag: '押解人犯',
    },
  ],
}

const SCENE_04_ROADSIDE_WITNESS: StorySceneDef = {
  id: 'scene_thb_04_roadside_witness',
  title: '第四幕 · 枯井余生泣血诉',
  subtitle: '华北官道 · 荒废茶寮后院',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '正当你在山道清点赃证之际，路旁坍塌茶寮后方的枯草枯井中忽然传来一阵微弱的咳嗽与拍击声。你循声掠去拨开荆棘，只见一名鬓发斑白、左臂染血的老商客正蜷缩在干涸井底，忙伸手将其稳稳提拉上来。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '周老丈',
        title: '徽州北行老茶商',
        factionName: '过往商旅',
        portraitUrl: '/assets/characters/templates/tpl_song_physician_fb.jpg',
      },
      text: '老茶商甫一落地，瞥见不远处被制住穴道瘫倒在地的雷震山，顿时老泪纵横，扑通一声向你跪倒：“青天大老爷救命之恩啊！老朽乃徽州北上贩茶的客商，昨夜在此歇脚，这杀千刀的太行恶贼带着十几名喽啰冲进来见人便砍……老朽七名伙计与脚夫全死在他那把鬼头刀下，唯独老朽失足跌入枯井才捡回半条残命！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（忙扶起老丈，取出随身金疮药替他敷住臂上刀伤，又分出些干粮清水递过去）“老丈快请起！我乃开封府六扇门总捕，既撞见此等惨案，断不会让枉死乡亲含冤九泉。前面二十里便是官道驿铺，老丈且持我手书前往歇息报备；这凶徒雷震山，我必亲自押赴东京开封府明正典刑！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_05_ESCORT_DEPART }],
}

const SCENE_03_SUBDUE_AND_SEARCH: StorySceneDef = {
  id: 'scene_thb_03_subdue_and_search',
  title: '第三幕 · 挫刃擒凶获铁证',
  subtitle: '华北官道 · 荒林狭道',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '数十合激战兔起鹘落！雷震山刀法虽凶狠刚猛，终究在你精妙沉稳的招式下露出空门。但听“铮”的一声金铁交鸣，你一招震麻他双臂虎口，沉重鬼头大刀脱手斜插进路旁土崖，紧接着骈指如电连封他肩井、曲池两处大穴，这铁塔般的悍匪轰然单膝砸地！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '四周掠阵的十余名太行喽啰见自家二流上品的头目竟在六扇门金牌总捕手底下走不过数十合便束手就擒，顿时吓得魂飞魄散，嚎叫一声丢下弓刀，连滚带爬地钻入太行山密林深处作鸟兽散。',
    },
    {
      speaker: { kind: 'player' },
      text: '（伸手自雷震山怀中搜出一只沉甸甸的鹿皮囊，倒出一看，眼神愈发冷峻）“三份染着暗红血迹的河北商旅路引、两枚大名府官银火漆封条，还有一面刻着‘太行雷字营’的黑旗铜牌……好一个积年巨寇，手底下竟背着这许多无辜人命！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_04_ROADSIDE_WITNESS }],
}

const SCENE_02_BANDIT_TAUNT: StorySceneDef = {
  id: 'scene_thb_02_bandit_taunt',
  title: '第二幕 · 铁臂横刀索买路',
  subtitle: '华北官道 · 荒林狭道',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '三声尖锐竹哨破空响起，山坳两侧枯木丛中倏地跃出十余名头裹赤巾、手持朴刀猎弓的精悍山匪，呈扇形封住前后官道！土坡最高处，一名身高八尺、双臂筋肉如生铁浇铸的凶悍大汉扛着九环鬼头大刀大步踏下，每一步都将冻土踩出深印——正是太行山二流上品悍匪头目【雷震山】！',
    },
    {
      speaker: {
        kind: 'custom',
        name: '雷震山',
        title: '太行铁臂盗（二流上品）',
        factionName: '太行/京东绿林盟',
        portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
      },
      text: '雷震山斜乜着你腰间悬着的六扇门金牌腰符，非但不惧，反而仰天狂笑：“哈哈哈！弟兄们快瞧，昨儿才宰了一队徽州肥羊，今日倒撞上一条东京开封府落单的大鱼！小子，识相的把身上银两、坐骑与那块金牌乖乖献上来，再给太行爷爷磕三个响头，免得尝老子鬼头刀的滋味！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（目光扫过他刀背上尚未擦净的暗红血渍，按兵冷喝道）“茶寮外的血迹未干，原来昨夜劫杀过往客商的便是你们这伙太行孽障！本官正愁无处寻尔等贼踪，今日你既自投罗网，便随某家回开封府大牢走一遭——看招！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'startCombat',
      questId: TAIHANG_BANDIT_QUEST_ID,
      opponent: { kind: 'custom', npc: buildTaihangBanditRobberNpc() },
      rule: 'duel',
      lethalOnLose: true,
      forbidEscapeReason: '悍匪已率众封住山道前后退路，唯有一战将其擒拿归案！',
      deathTitle: '官道折戟 · 喋血太行麓',
      deathDetail:
        '你在华北官道遭遇太行山二流上品悍匪【雷震山】截杀，激战不敌，力竭丧命于乱刀之下。',
      onWin: [{ type: 'openScene', scene: SCENE_03_SUBDUE_AND_SEARCH }],
    },
  ],
}

export const TAIHANG_BANDIT_ENCOUNTER_SCENE: StorySceneDef = {
  id: 'scene_thb_01_road_omen',
  title: '第一幕 · 暮色荒驿见血辙',
  subtitle: '华北官道 · 太行山麓古驿道',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐年间，河北与汴洛交界处的古驿官道向北蜿蜒直抵太行山麓。这一日暮色四合，朔风卷着枯黄落叶掠过荒原，你单骑疾行至一处两山夹峙的僻静山坳时，忽觉空气中隐隐飘来一缕若有若无的血腥气。',
    },
    {
      speaker: { kind: 'player' },
      text: '（轻拉马缰放缓蹄步，凝目望向路旁半塌的歇脚茶寮）“奇了……此处乃是往来客商歇马饮水的必经之地，今日怎地半个人影也无？地面车辙凌乱深陷，草丛里还有半截被利刃劈断的商队护镖旗杆！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '作为久历刑名的六扇门金牌总捕，你瞬间察觉四周林木深处暗藏杀机，右手悄然按上腰间兵刃。果不其然，前方山坡枯松梢头寒鸦惊起，三声凄厉短促的竹哨声骤然划破暮色！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_02_BANDIT_TAUNT }],
}

// ============================================================================
// 完整声明式任务定义导出
// ============================================================================

export const KAIFENG_TAIHANG_BANDIT_QUEST: QuestDefinition = {
  id: TAIHANG_BANDIT_QUEST_ID,
  title: '太行劫匪 · 华北风云',
  category: 'sect_mission',
  factionId: 'SECT-17',
  regionId: 'bianliang',
  recommendedRealm: '二流上品 ~ 一流下品',
  recommendedNote:
    '开封府 / 六扇门晋升 Lv.3 金牌总捕后，于华北地区赶路时有概率触发（平均每百日一次）。全长二十五幕。',
  startHint:
    '晋升开封府 Lv.3 后，在华北地区（汴洛、大名、真定、太原、济南、太行等）官道赶路时随机遭遇。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_kaifengfu',
    spotId: 'bl_kf_court',
    customLabel: '华北官道（随机遭遇） / 开封府衙',
  },
  startCondition: { type: 'inSect', sectId: 'SECT-17', minRank: 3 },
  summary:
    '晋升六扇门 Lv.3 后于华北官道赶路时，偶遇太行山二流上品悍匪雷震山拦路劫杀。将其生擒并救下幸存茶商后押送开封府交展昭与包拯会审，五日后于东京市曹处斩；冷却三十日再行华北官道，将遭太行天王王重岳与九纹狂龙史万山 1v2 联手围堵。须死守硬撑五合坠涧突围，身负【太行重创】返开封向展昭汇报并强制闭门养伤一月方得痊愈结案。',
  initialStepId: 'escort_to_kaifeng',
  steps: {
    escort_to_kaifeng: {
      id: 'escort_to_kaifeng',
      title: '押解悍匪赴开封',
      objective:
        '已在华北官道生擒太行山二流上品悍匪【雷震山】并搜获血案铁证，请速往【开封府 · 开封府衙（六扇门） · 升堂正殿】交予展昭会审。',
      nextHint: '在开封府升堂正殿与展昭对话，点击「押解太行劫匪交差」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
      },
    },
    await_execution: {
      id: 'await_execution',
      title: '静候五日市曹处斩',
      objective:
        '包拯已判处雷震山死罪并收押开封府死囚监，静待五日后午时三刻押赴东京市曹刑场处斩伏法。',
      nextHint: '五日后（时间推进跨过第5日时）将自动触发开封市曹处斩剧情。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
      },
    },
    cooldown_wait: {
      id: 'cooldown_wait',
      title: '太行余波 · 三十日暗涌',
      objective:
        '雷震山已于东京市曹枭首正法，太行绿林盟眼线已放飞信鸽传讯北上，暗流正在酝酿（需冷却 30 日）。',
      nextHint: '三十日冷却期满后，太行山高层将开始在华北官道搜寻少侠踪迹。',
    },
    ambush_ready: {
      id: 'ambush_ready',
      title: '华北危机 · 双雄伺伏',
      objective:
        '太行天王【王重岳】与九纹狂龙【史万山】已率精锐潜入华北官道伺机寻仇，少侠下次在华北地区赶路时将遭二人联手截杀！',
      nextHint:
        '做好万全备战后在华北地区官道赶路，将触发王重岳与史万山 1v2 围堵（须撑过 5 回合，战败将被押回太行山寨斩首）。',
    },
    report_and_recuperate: {
      id: 'report_and_recuperate',
      title: '带伤复命 · 竹院养伤一月',
      objective:
        '虽在王重岳与史万山联手下硬撑五合坠涧逃生，但肺腑已中《太行罡气》，身负【太行重创】减益。请速返【开封府】向展昭汇报并强制养伤一月。',
      nextHint:
        '前往开封府升堂正殿与展昭对话汇报遇伏经过，在府衙后院强制静养三十日方可拔除罡毒解除重伤减益。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
      },
    },
  },
  npcActions: [
    {
      id: 'act_thb_handover_bandit',
      label: '押解太行劫匪交差',
      badge: '太行劫匪',
      tone: 'primary',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140'] },
          {
            type: 'questStatus',
            questId: TAIHANG_BANDIT_QUEST_ID,
            status: 'active',
            stepId: 'escort_to_kaifeng',
          },
        ],
      },
      effects: [{ type: 'openScene', scene: SCENE_06_ARRIVE_KAIFENG_YAMEN }],
    },
    {
      id: 'act_thb_report_injury',
      label: '汇报太行遇伏重伤之事',
      badge: '养伤复命',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140'] },
          {
            type: 'questStatus',
            questId: TAIHANG_BANDIT_QUEST_ID,
            status: 'active',
            stepId: 'report_and_recuperate',
          },
        ],
      },
      effects: [{ type: 'openScene', scene: SCENE_21_STAGGER_INTO_KAIFENG }],
    },
  ],
  onDeadlineExpired: {
    effects: [
      {
        type: 'branch',
        condition: {
          type: 'questStatus',
          questId: TAIHANG_BANDIT_QUEST_ID,
          status: 'active',
          stepId: 'await_execution',
        },
        thenEffects: [{ type: 'openScene', scene: SCENE_10_DAWN_PRISON_ESCORT }],
        elseEffects: [
          {
            type: 'branch',
            condition: {
              type: 'questStatus',
              questId: TAIHANG_BANDIT_QUEST_ID,
              status: 'active',
              stepId: 'cooldown_wait',
            },
            thenEffects: [
              {
                type: 'setQuestStep',
                questId: TAIHANG_BANDIT_QUEST_ID,
                stepId: 'ambush_ready',
                deadlineDays: null,
                silent: false,
              },
              {
                type: 'toast',
                text: '风声紧迫：太行天王王重岳与九纹狂龙史万山已率众下山寻仇，华北官道恐有双雄截杀！',
                tone: 'warn',
                logTag: '太行寻仇',
              },
            ],
          },
        ],
      },
    ],
  },
}

export const KAIFENG_TAIHANG_BANDIT_QUESTS: QuestDefinition[] = [KAIFENG_TAIHANG_BANDIT_QUEST]
