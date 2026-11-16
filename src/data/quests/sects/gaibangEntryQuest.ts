import type { NodeNpc } from '../../../types/game'
import type {
  QuestCondition,
  QuestDefinition,
  QuestLocationTriggerDef,
  StorySceneDef,
  StorySpeakerSpec,
} from '../../../types/quest'

export const GAIBANG_ENTRY_QUEST_ID = 'QST-SECT-02-ENTRY'

/**
 * 大宋中原及江淮核心州府：当少侠无门无派且囊中羞涩（纹银 <= 3 两）时，
 * 步入以下任一州府长街（或由城内商铺/客栈消费后步出长街）即可触发丐帮入门侠义长卷。
 */
export const GAIBANG_TRIGGER_CITY_IDS = [
  'bianliang', // 开封府
  'luoyang', // 洛阳府
  'daming', // 大名府
  'zhending', // 真定府
  'taiyuan', // 太原府
  'changan', // 京兆府
  'jinan', // 济南府
  'xiangyang', // 襄阳府
  'yangzhou', // 扬州府
] as const

const SPEAKER_LAO_LI: StorySpeakerSpec = {
  kind: 'custom',
  name: '老拐子李',
  title: '丐帮四袋老乞儿',
  factionName: '丐帮',
  portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
}

const SPEAKER_XIAO_WAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '周小碗',
  title: '丐帮二袋小叫花',
  factionName: '丐帮',
  portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
}

const SPEAKER_BLIND_OLD_MAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '张老伯',
  title: '盲眼卖唱老汉',
  factionName: '市井百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
}

const SPEAKER_BULLY_HUSAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '泼皮胡三',
  title: '南街恶少 · 黑风脚行外围喽啰',
  factionName: '市井恶霸',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_REFUGEE_MOTHER: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈氏与小囡囡',
  title: '京东逃荒孤寡母女',
  factionName: '流民百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_female_av.jpg',
}

const SPEAKER_OVERSEER: StorySpeakerSpec = {
  kind: 'custom',
  name: '刁疤眼',
  title: '黑风脚行巡夜恶监',
  factionName: '黑风脚行',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_BOOKKEEPER: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱算盘',
  title: '黑风脚行账房先生',
  factionName: '黑风脚行',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
}

const SPEAKER_APRICOT_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈阿七',
  title: '丐帮三袋护林弟子',
  factionName: '丐帮',
  portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
}

function buildBullyHuSanNpc(): NodeNpc {
  return {
    id: 'QUEST_GB_BULLY_HUSAN',
    name: '泼皮胡三',
    title: '南街恶少 · 欺凌弱小',
    realm: '不入流',
    factionId: 'ORG-01',
    factionName: '市井恶霸',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: {
      hp: 170,
      mp: 60,
      agi: 14,
      res: 6,
      isBenchmark: false,
    },
    talents: { bone: 32, comprehension: 28, charm: 25 },
    equippedArts: {
      neigong: 'MA-199', // 粗浅呼吸法
      qinggong: 'MA-218', // 翻滚躲闪步
      move1: 'MA-201', // 市井王八拳
      move2: null,
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-199', level: 1, exp: 0 },
      { artId: 'MA-218', level: 1, exp: 0 },
      { artId: 'MA-201', level: 2, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-083', // 生牛皮裹指拳带（凡阶中品）
      armor: 'ARM-044', // 市井茶博士围裙衫（凡阶中品）
      shoes: 'BOT-023', // 江南油布雨屐（凡阶中品）
      bow: 'BOW-022', // 关洛镖局防盗短弓（凡阶中品）
      accessory1: 'ACC-041', // 市井红绳铜钱串（凡阶中品）
      accessory2: 'ACC-043', // 粗皮护腕（凡阶中品）
      mount: 'MNT-021', // 太行绿林草上青（凡阶中品）
      curio1: null,
      curio2: null,
    },
    talk: '“穷酸小子，连买炊饼的铜板都掏不出，也敢管爷们的闲事！”',
  }
}

function buildGranaryOverseerNpc(): NodeNpc {
  return {
    id: 'QUEST_GB_GRANARY_OVERSEER',
    name: '刁疤眼',
    title: '黑风脚行 · 巡夜恶监',
    realm: '不入流',
    factionId: 'ORG-01',
    factionName: '黑风脚行',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    stats: {
      hp: 210,
      mp: 80,
      agi: 16,
      res: 8,
      isBenchmark: false,
    },
    talents: { bone: 36, comprehension: 30, charm: 22 },
    equippedArts: {
      neigong: 'MA-199', // 粗浅呼吸法
      qinggong: 'MA-218', // 翻滚躲闪步
      move1: 'MA-207', // 柴刀乱披法
      move2: 'MA-204', // 护院拦门掌
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-199', level: 1, exp: 0 },
      { artId: 'MA-218', level: 1, exp: 0 },
      { artId: 'MA-207', level: 2, exp: 0 },
      { artId: 'MA-204', level: 1, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-076', // 绿林泼风砍刀（凡阶中品）
      armor: 'ARM-041', // 粗布猎装（凡阶中品）
      shoes: 'BOT-022', // 塞北羊皮靴（凡阶中品）
      bow: 'BOW-022', // 关洛镖局防盗短弓（凡阶中品）
      accessory1: 'ACC-043', // 粗皮护腕（凡阶中品）
      accessory2: 'ACC-041', // 市井红绳铜钱串（凡阶中品）
      mount: 'MNT-021', // 太行绿林草上青（凡阶中品）
      curio1: null,
      curio2: null,
    },
    talk: '“好大的狗胆，竟敢半夜摸进黑风脚行的私仓放人！”',
  }
}

function buildApricotDiscipleNpc(): NodeNpc {
  return {
    id: 'QUEST_GB_CHEN_AQI',
    name: '陈阿七',
    title: '丐帮 · 三袋护林弟子',
    realm: '三流下品',
    factionId: 'SECT-02',
    factionName: '丐帮',
    sectRank: 1,
    sectRankLabel: '三袋弟子',
    avatarUrl: '/assets/characters/templates/tpl_gaibang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_gaibang_fb.jpg',
    stats: {
      hp: 340,
      mp: 160,
      agi: 22,
      res: 12,
      isBenchmark: false,
    },
    talents: { bone: 48, comprehension: 45, charm: 46 },
    equippedArts: {
      neigong: 'MA-223', // 丐帮吐纳筑基诀
      qinggong: 'MA-177', // 飞檐走壁
      move1: 'MA-211', // 打狗竹棒（市井叫花）
      move2: 'MA-182', // 太祖长拳
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-223', level: 2, exp: 0 },
      { artId: 'MA-177', level: 2, exp: 0 },
      { artId: 'MA-211', level: 3, exp: 0 },
      { artId: 'MA-182', level: 2, exp: 0 },
    ],
    equipped: {
      weapon: 'WPN-080', // 丐帮青竹防身棒（凡阶中品）
      armor: 'ARM-041', // 粗布猎装（凡阶中品）
      shoes: 'BOT-024', // 蜀道麻筋草鞋（凡阶中品）
      bow: 'BOW-021', // 江南水乡弹弓（凡阶中品）
      accessory1: 'ACC-041', // 市井红绳铜钱串（凡阶中品）
      accessory2: 'ACC-043', // 粗皮护腕（凡阶中品）
      mount: 'MNT-022', // 淮南盐道负重挽马（凡阶中品）
      curio1: null,
      curio2: null,
    },
    talk: '“少侠请亮招！宋长老吩咐只试胆魄骨气，咱们点到为止！”',
  }
}

// ============================================================================
// 第四卷：聚义坛前 · 乔峰赐袋（第 17～22 幕，倒序声明以便上层场景直接引用）
// ============================================================================

const SCENE_GB_22_WIDE_JIANGHU: StorySceneDef = {
  id: 'scene_gb_22_wide_jianghu',
  title: '第二十二幕 · 青囊虽空万里阔',
  subtitle: '洛阳杏子林 · 踏歌入江湖',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '辞别乔帮主与诸位长老，顺着铺满落叶的青石山径走出杏子林时，西天晚霞正将漫山遍野的杏树梢染成一片壮丽的赤金。林间归巢的白鸽振翅掠过暮云，远处隐隐约约还传来丐帮弟兄们豪迈苍凉的《莲花落》歌声。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你低头看了看腰间那只针脚细密、簇新干净的灰布口袋，又摸了摸掌心里那颗自城外长亭一直没舍得吃掉的糖渍山楂。回想数日之前，自己尚在暮色长街的蒸饼摊前受尽冷眼、为囊中仅存的碎银发愁；而今虽披百衲粗衫、执三尺芦竹，胸中却似有一团滚烫浩然之气直冲云霄。',
    },
    {
      speaker: { kind: 'player' },
      text: '“青囊虽空志不穷，一碗残羹见弟兄。自今日起，四海破庙皆吾家，万里山河任纵横！”',
    },
  ],
  onFinishEffects: [
    { type: 'joinSect', sectId: 'SECT-02', rank: 1 },
    { type: 'giveFood', amount: 5 },
    { type: 'giveSilver', amount: 10, reason: '乔峰帮主所赠行侠应急盘缠' },
    { type: 'modifyChivalry', delta: 20, reason: '义散脏银、铁骨入丐帮' },
    { type: 'modifyRenown', delta: 20, reason: '杏子林受乔峰亲系布袋拜入丐帮' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0111' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0196' }, delta: 10 },
    {
      type: 'completeQuest',
      questId: GAIBANG_ENTRY_QUEST_ID,
      outcome: 'joined_gaibang',
      combatExp: 80,
    },
    {
      type: 'toast',
      text: '正式拜入天下第一大帮【丐帮】，授职【一袋弟子】！获赐百衲衣、蒲草鞋、芦竹竿，及乔帮主所赠 5 份干粮与 10 两应急纹银！',
      tone: 'success',
      logTag: '义聚杏林',
    },
  ],
}

const SCENE_GB_21_DRAGON_PALM_HINT: StorySceneDef = {
  id: 'scene_gb_21_dragon_palm_hint',
  title: '第二十一幕 · 折枝画掌赠行粮',
  subtitle: '杏林百酒聚义高坛 · 帮主私嘱',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '授袋大礼既毕，诸位长老各自散去料理四方帮务，唯有乔峰未走，笑吟吟地拍了拍青石坛沿，示意你在他身旁并肩坐下。山风拂过杏林，带着初春泥土与陈酒混合的清冽气息。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '（乔峰随手拾起地上半截枯杏枝，在沙土上潇洒一划，留下一道深逾寸许、笔直刚猛的刻痕）“好兄弟，咱们丐帮的武学，不讲究那些花里胡哨的虚招，唯重『稳、准、狠、义』四字。手中一根竹棒，是为护身除恶；胸中一口混天真气，是为顶天立地。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '“你今日初入一袋，切莫好高骛远。先向宋长老求授《丐帮吐纳筑基诀》《莲花掌》与《丐帮疯魔棍》入门篇，把下盘与掌力锤炼得如泰山磐石一般。待日后你在江湖上广结善缘、同门拥戴晋入高袋，愚兄亲自传你几手刚猛无俦的看家掌法！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '言罢，乔峰忽然想起一事，爽朗一笑，从怀里摸出一个鼓囊囊的油布干粮袋与一小锭十两重的碎纹银，不由分说塞进你怀中。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '“拿着！咱们丐帮虽叫花子帮，也不是叫兄弟真去饿肚皮！皇祐二年北疆契丹铁骑蠢蠢欲动，雁门关外风雪未歇，来日用到咱们兄弟出力拼命的地方多着呢——花子也要吃饱了饭，才有力气替天下百姓打恶人！”',
    },
  ],
  choices: [
    {
      id: 'gb21_thank_qiaofeng',
      label: '【双手接过行粮】谨记帮主今日教诲，必不负腰间布袋！',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_GB_22_WIDE_JIANGHU }],
    },
  ],
}

const SCENE_GB_20_FIRST_POUCH: StorySceneDef = {
  id: 'scene_gb_20_first_pouch',
  title: '第二十幕 · 一袋挂腰百衲衣',
  subtitle: '杏林百酒聚义高坛 · 授袋大礼',
  illustrationUrl: '/assets/quests/gaibang_bamboo_pouch.jpg',
  illustrationCaption: '洛阳杏子林聚义坛 · 乔峰亲系一袋布囊授青竹短杖',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '晨光穿过层层叠叠的杏花枝桠，洒在青石聚义高坛古朴肃穆的历代祖师灵位之上。你整肃衣冠，面向牌位恭恭敬敬地行了三拜九叩大礼。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '乔峰走上前来，亲手取过一只用粗麻布缝制、洗得干干净净的灰布口袋，系在你的腰带左侧；副帮主马大元与传功长老宋奚长亦含笑捧上一套浆洗妥帖的《破旧百衲乞丐衣》、一双耐走山路的《山民蒲草鞋》，以及一根青翠坚韧的《叫花驱犬芦竹竿》。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0159' },
      text: '（宋奚长抚着白须，笑呵呵地拍了拍你的肩头）“小兄弟，莫小瞧这身百衲衣与腰间这只布袋！大宋两京十三路、天下四十三座州府雄关，凡有破庙、渡口、茶寮、酒肆之处，只要亮出这只口袋，便有咱们丐帮弟兄分你一口热汤热饼，替你指路传讯！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0136' },
      text: '（马大元亦郑重颔首）“我丐帮升迁不看金银门第，只看同门弟兄心服与否。你日后行走四方，多与各地分舵长老、香主和基层弟兄饮酒论交、共赴患难，袋数自然水到渠成！”',
    },
  ],
  choices: [
    {
      id: 'gb20_receive_staff',
      label: '【双手接过百衲衣与芦竹竿】谢帮主、马副帮主与宋长老栽培！',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_21_DRAGON_PALM_HINT }],
    },
  ],
}

const SCENE_GB_19_WAIVE_BLADES: StorySceneDef = {
  id: 'scene_gb_19_waive_blades',
  title: '第十九幕 · 破例免刃重赤诚',
  subtitle: '杏林百酒聚义高坛 · 革故鼎新',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '大海碗烈酒入喉，犹如一条滚烫火龙直坠丹田，霎时间驱尽了连日风餐露宿的寒意。你将空碗倒扣亮底，坛下数十名观礼的丐帮弟子齐声轰然叫好！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0196' },
      text: '（执法长老白世镜面色肃然，依足帮中旧仪，从木盘上捧起一柄寒光森森的执法短刀与数根青竹签，沉声道）“启禀帮主，按本帮昔年旧例，凡带艺或半路投帮之新进弟子，须请执法弟子动法刀见血立誓，以明无他派奸细之嫌……”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '（乔峰朗眉一轩，抬起蒲扇般的大手稳稳按住木盘，声若洪钟）“白长老，规矩是前人定的，人心却是实打实试出来的！这位好兄弟在身无半文、饥肠辘辘之时，尚能为素不相识的盲眼老叟挺身而出，夜闯义仓面对五百两白银分毫不取——这等澄澈如铁的赤子侠心，胜过世间千刀万洞的毒誓！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '“我乔峰今日当着汪老帮主与诸位长老的面立言：义士入我丐帮，只敬肝胆，不流自家兄弟的无谓之血！收起法刀，即刻为新兄弟行授袋大礼！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '汪剑通在坛侧欣然抚须颔首，白世镜亦心悦诚服地躬身收刀，四下丐帮群豪竹棒顿地，喝彩之声震动整片杏林！',
    },
  ],
  choices: [
    {
      id: 'gb19_bow_ancestors',
      label: '【肃立坛前】登坛参拜丐帮历代祖师灵位',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_GB_20_FIRST_POUCH }],
    },
  ],
}

const SCENE_GB_18_BOWL_OF_WINE: StorySceneDef = {
  id: 'scene_gb_18_bowl_of_wine',
  title: '第十八幕 · 拍封舀酒立三规',
  subtitle: '杏林百酒聚义高坛 · 义酒盟心',
  illustrationUrl: '/assets/quests/gaibang_apricot_oath.jpg',
  illustrationCaption: '洛阳杏子林聚义高坛 · 青年帮主乔峰拍坛敬酒立帮规',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '乔峰转身走到高坛边一口半人高的宜阳粗陶大酒缸前，右掌看似随意地轻轻一拍，“砰”的一声闷响，封缸黄泥应掌震裂，一股浓烈醇厚的高粱烧刀子酒香顿时随着山风弥漫整座聚义坛！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '他抄起两只粗瓷大海碗，探手入缸满满舀起两碗澄澈烈酒，一手端一碗大步走回你面前，将其中一碗稳稳递入你手中。碗沿酒花轻颤，映着他朗若星辰的双眸。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '“入我丐帮，没有名门世家那些繁文缛节，唯有三条铁打的帮规须刻在骨子里——其一，忠肝义胆，护国济民，凡通敌卖国、助纣为虐者，天下丐帮共击之；其二，同门如手足，尊长护幼，绝不许恃强凌弱；其三，行乞不失志，冻馁不折腰，宁吃千家清白水，不沾半文昧心钱！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '（乔峰高举海碗，豪气干云）“这一碗烈酒，一敬头顶朗朗乾坤，二敬天下啼饥号寒的黎民百姓，三敬你我今日结下的八拜同门之义！好兄弟，可敢与乔某满饮此碗？！”',
    },
  ],
  choices: [
    {
      id: 'gb18_drink_boldly',
      label: '【举碗豪饮】“承蒙乔帮主看重！愿随帮主行侠仗义，死生无悔！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_GB_19_WAIVE_BLADES }],
    },
    {
      id: 'gb18_drink_sincerely',
      label: '【双手捧碗一饮而尽】“纵不胜酒力，这碗忠义酒亦必饮个涓滴不剩！”',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_19_WAIVE_BLADES }],
    },
  ],
}

const SCENE_GB_17_ALTAR_QIAOFENG: StorySceneDef = {
  id: 'scene_gb_17_altar_qiaofeng',
  title: '第十七幕 · 聚义高坛逢乔峰',
  subtitle: '洛阳杏子林 · 杏林百酒聚义高坛',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '穿过竹影婆娑的林间石阶，视野豁然开朗——一座由整块太室青石垒筑的聚义高坛巍然矗立于万株老杏树正中央。坛周排列着数十口泥封酒瓮，九面缀着布袋徽记的青色号令旗迎风猎猎作响。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '高坛正中立着一位二十出头的魁伟青年。他身穿一件洗得发白却整洁利落的青布粗衫，腰悬九只灰布口袋，浓眉大眼，鼻直口方，宽阔双肩宛若太行山岳；虽未执兵刃，仅仅渊渟岳峙地站在那里，便自有一股睥睨群雄、却又令人如沐春风的英雄气概——正是威震南北武林的丐帮现任帮主【乔峰】！',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0196' },
      text: '（铁面无私的执法长老白世镜捧着青布名册迎前一步，拱手禀道）“禀帮主，这位便是吴岳彻香主火漆荐来、又经马副帮主考校与汪老帮主问心首肯的少侠。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0110' },
      text: '（乔峰双目一亮，竟不待你在坛下跪拜，大步流星跨下七级青石台阶，一双虎掌稳稳托住你的双臂，朗声大笑）“好兄弟，快快请起！吴香主的飞鸽密报我昨夜便读过了——好一个囊中羞涩而志比金坚的少年豪杰！自己饿着肚子站在蒸饼摊前咽口水，转头闯进义仓面对五百两白银竟眼皮都不眨一下，全散给了逃荒妇孺！乔某平生最敬重、最欢喜结交的，便是你这等真汉子！”',
    },
  ],
  choices: [
    {
      id: 'gb17_salute_qiaofeng',
      label: '【抱拳慨然回礼】“久仰乔帮主侠名，晚辈不过做了分内微末之事！”',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_18_BOWL_OF_WINE }],
    },
  ],
}

// ============================================================================
// 第三卷：杏林初试 · 演武论心（第 12～16 幕）
// ============================================================================

function buildElderHeartReplyScene(ansKey: 'share' | 'peasant' | 'defy'): StorySceneDef {
  const replyMap = {
    share: {
      playerText:
        '“回汪老前辈的话——那半块冷窝头，晚辈会掰作两半，一半给快饿死的老农，一半给垂危的江湖同道。至于我自己，年轻力壮，多饿一两顿死不了人，断不能眼睁睁看着面前有人绝命！”',
      elderText:
        '（荣休长老徐冲霄抚掌大笑，连胡须都在颤动）“妙极，妙极！老帮主你听听，这句『自己多饿两顿死不了人，断不能看人绝命』，活脱脱便是乔峰那小子十七八岁刚挑大梁时的脾气！”',
    },
    peasant: {
      playerText:
        '“回汪老前辈的话——晚辈必先救那名手无寸铁的大宋老农！我辈既然习武入江湖，便早该有风餐露宿、随时为苍生赴死的觉悟；若连种田纳粮的苦命庄稼人都护不住，练这一身武艺又有何用？”',
      elderText:
        '（汪剑通苍老的双眸中精光暴涨，重重一拍竹栏）“好一句『若连庄稼人都护不住，练武何用』！多少名门正派的弟子练了一辈子剑，都没参透这句话！你这份悲悯之心，配得上打狗棒下的忠义二字！”',
    },
    defy: {
      playerText:
        '“回汪老前辈的话——窝头先紧着弱者救命！至于那欺压百姓的奸佞恶霸，管他是朝堂高官还是绿林巨寇，撞在我手里便是一棍子打过去！便是一时武功不及打不过，折断骨头也绝不向恶贼低半分头！”',
      elderText:
        '（汪剑通仰天朗声长笑，震得信寮檐下白鸽扑棱棱齐飞）“哈哈哈哈！好一股初生牛犊不怕虎的少年英气！我丐帮之所以能压服天下宵小，靠的不是人人武功天下第一，靠的便是这股打断骨头也不低头的血性！”',
    },
  }[ansKey]

  return {
    id: `scene_gb_16b_elder_approved_${ansKey}`,
    title: '第十六幕（续）· 松柏赞许赴高坛',
    subtitle: '八方飞鸽篝火信寮 · 汪老首肯',
    beats: [
      {
        speaker: { kind: 'player' },
        text: replyMap.playerText,
      },
      {
        speaker: { kind: ansKey === 'share' ? 'npc' : 'npc', npcId: ansKey === 'share' ? 'NPC-0195' : 'NPC-0111' },
        text: replyMap.elderText,
      },
      {
        speaker: { kind: 'npc', npcId: 'NPC-0111' },
        text: '“去吧，孩子！顺着前面那条铺满杏花瓣的青石道往上走，便是本帮核心圣地【杏林百酒聚义高坛】。帮主【乔峰】与执法白长老已在坛上备好了宜阳烈酒，等着亲自为你系袋入帮！”',
      },
    ],
    onFinishEffects: [
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0111' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0195' }, delta: 10 },
      {
        type: 'setQuestStep',
        questId: GAIBANG_ENTRY_QUEST_ID,
        stepId: 'altar_oath',
        deadlineDays: null,
      },
      {
        type: 'toast',
        text: '获太上老帮主汪剑通高度嘉许！请前往杏子林【杏林百酒聚义高坛】，拜见帮主【乔峰】完成授袋大礼！',
        tone: 'success',
        logTag: '杏林问心',
      },
    ],
  }
}

const SCENE_GB_16_ELDER_HEART_TEST: StorySceneDef = {
  id: 'scene_gb_16_elder_heart_test',
  title: '第十六幕 · 老骥问心何谓侠',
  subtitle: '八方飞鸽篝火信寮 · 苍生一问',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '篝火映照着汪剑通刀刻斧凿般的苍老面庞。他撒完手中最后一把粟米，拍净掌心，转过身静静凝视着你，目光温厚却重若千钧。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0111' },
      text: '“年轻人，武功高低可以靠岁月苦练，唯独胸中立志，差之毫厘便谬以千里。老夫退位让贤之前，为丐帮选定了乔峰做继承人；今日你欲入我丐帮门墙，老夫也考你一句实实在在的话——”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0111' },
      text: '“倘若有一日荒年兵乱，你自己的干粮袋里只剩最后半块硬邦邦的冷窝头，面前却同时倒着一名饿得奄奄一息的大宋庄稼老农，与一名重伤失血的江湖同道；而远处又有贪官恶霸纵兵抢粮——彼时彼刻，你当如何自处？”',
    },
  ],
  choices: [
    {
      id: 'gb16_ans_share',
      label: '【宁己挨饿】窝头分救老农与同道，自己纵饿死亦不独活！',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: buildElderHeartReplyScene('share') }],
    },
    {
      id: 'gb16_ans_peasant',
      label: '【苍生为先】先救手无寸铁的老农，习武之人本该先百姓而死！',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: buildElderHeartReplyScene('peasant') }],
    },
    {
      id: 'gb16_ans_defy',
      label: '【横棒除恶】窝头救弱者，提棒去砸贪官恶霸，折骨亦不低头！',
      tone: 'jade',
      effects: [{ type: 'openScene', scene: buildElderHeartReplyScene('defy') }],
    },
  ],
}

const SCENE_GB_15_PIGEON_TOWER: StorySceneDef = {
  id: 'scene_gb_15_pigeon_tower',
  title: '第十五幕 · 飞鸽高寮守北疆',
  subtitle: '洛阳杏子林 · 八方飞鸽篝火信寮',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '依着马副帮主指引，你步入林东两株合抱老杏树之间架起的竹木高寮。篝火终年不熄，架上栖满了神骏雪白的传讯信鸽，“咕咕”低鸣不绝于耳。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '一名鬓发如霜、脊背却挺得宛如标枪的老乞丐正站在木栏前喂食粟米，正是德高望重的丐帮太上老帮主【汪剑通】；身旁年逾八旬的荣休长老【徐冲霄】正戴着水晶叆叇，在火光下仔细核验一卷卷从雁门关、真定榷场飞传而至的细竹密报。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0195' },
      text: '（徐冲霄抬起头，笑眯眯地打量你一眼）“汪老哥，这娃娃便是吴岳彻信里夸上天去的那位少侠吧？瞧这眉宇间的正气，确是个不贪财、不怕事的好苗子。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0111' },
      text: '（汪剑通微微颔首，遥指北方苍茫云山，声音低沉而肃穆）“孩子，世上富贵王孙瞧见我们丐帮弟子，往往掩鼻而过，只当咱们是一群讨残羹冷炙的叫花子。可你今日走进这信寮，当知我丐帮真正的担子有多重。”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0111' },
      text: '“今岁乃是大宋皇祐二年。北边契丹辽主虎踞燕云十六州，四京铁骑甲兵百万；西边党项虽经庆历议和，狼子野心亦未尝一日稍歇。朝堂之上范希文、包希仁、狄汉臣诸公呕心沥血，而在江湖草野之间，正是我丐帮遍布天下的数十万污衣净衣弟兄，用一双双草鞋丈量边关，替大宋守着万里烽烟的第一道耳目，替穷苦百姓撑着最后一把破伞！”',
    },
  ],
  choices: [
    {
      id: 'gb15_listen_elder',
      label: '【肃然拱手】“老帮主家国大义，晚辈今日方知丐帮二字重逾泰山！”',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_16_ELDER_HEART_TEST }],
    },
  ],
}

function buildSceneGb14AfterSpar(didWin: boolean): StorySceneDef {
  return {
    id: didWin ? 'scene_gb_14_three_moves_win' : 'scene_gb_14_three_moves_grit',
    title: '第十四幕 · 三招拆解见傲骨',
    subtitle: '莲花竹棒演武沙场 · 胆魄过关',
    mandatory: true,
    beats: [
      {
        speaker: { kind: 'narrator' },
        text: didWin
          ? '场中竹影翻飞、拳风呼啸！你脚步沉稳，瞅准陈阿七横棒换手的微末空隙欺身而入，掌锋贴着他肩井穴寸许之处稳稳停住，劲风只吹动了他肩头补丁，未伤同门半分皮肉。'
          : '陈阿七浸淫丐帮棒法多年，一根芦竹竿使得泼水不进。你虽因连日奔波气力稍逊，被棒劲震得连退三步、虎口发麻，却硬是一口真气提在胸口，双足如钉死死钉在黄沙地上，脊梁挺得笔直，寸步不让！',
      },
      {
        speaker: SPEAKER_APRICOT_DISCIPLE,
        text: didWin
          ? '（陈阿七收棒抱拳，满脸钦佩）“好俊的身手！多谢少侠手下留情，阿七甘拜下风！”'
          : '（陈阿七收棒吐出一口浊气，由衷竖起大拇指）“少侠好硬的骨头！换作寻常江湖客挨我这一记横扫早就弃械退场了，你却半步不退，阿七佩服！”',
      },
      {
        speaker: { kind: 'npc', npcId: 'NPC-0159' },
        text: didWin
          ? '（传功长老宋奚长抚掌朗笑）“好！临敌果决而不逞凶斗狠，胜券在握犹知点到即止，深得我辈仁侠三昧！”'
          : '（传功长老宋奚长抚掌赞叹）“好！武艺高低入帮之后自有老夫倾囊传授，唯独这份明知力怯而寸步不退的硬骨头，千金难买！”',
      },
      {
        speaker: { kind: 'npc', npcId: 'NPC-0136' },
        text: '（副帮主马大元含笑走下石台，拍了拍你的臂膀）“演武考校已过！咱们太上老帮主【汪剑通】汪老前辈方才在东侧【八方飞鸽篝火信寮】听说了你的事迹，特意吩咐让你过去见他一面。去吧，莫叫老人家久等！”',
      },
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0136' }, delta: 15 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0159' }, delta: 15 },
      {
        type: 'setQuestStep',
        questId: GAIBANG_ENTRY_QUEST_ID,
        stepId: 'pigeon_heart_test',
        deadlineDays: null,
      },
      {
        type: 'toast',
        text: '演武考校通过！请移步杏子林【八方飞鸽篝火信寮】，拜谒太上老帮主【汪剑通】！',
        tone: 'success',
        logTag: '杏林演武',
      },
    ],
  }
}

const SCENE_GB_13_ARENA_MADAYUAN: StorySceneDef = {
  id: 'scene_gb_13_arena_madayuan',
  title: '第十三幕 · 演武场前副座问',
  subtitle: '洛阳杏子林 · 莲花竹棒演武沙场',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '莲花竹棒演武沙场占地数亩，四周三十二面青竹令旗迎风招展，百余名赤膊或短打的丐帮弟子正捉对演练《莲花掌》与《疯魔棍》，呼喝声震耳欲聋。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '夯土高台之上，两位气度沉凝的长者并肩而立——居中一人约莫四十上下，面目方正敦厚，双目精光内敛，正是以成名绝技《锁喉擒拿手》享誉江湖的丐帮副帮主【马大元】；身侧白须飘洒、精神矍铄的老者，则是掌管全帮武学传授的九袋传功长老【宋奚长】。',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0136' },
      text: '（马大元拆开吴岳彻亲笔火漆荐信细读一遍，素来严肃的脸上露出一丝温和笑意）“好！身处困顿而不坠青云之志，夜破恶霸义仓而分毫不取五百两雪花银——吴岳彻眼力不差，给我丐帮荐来了一块好铁！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0159' },
      text: '（宋奚长捋须呵呵笑道）“品性已是上上之选！不过咱们丐帮弟子行走南北，常要与辽夏鹰犬、恶霸剧盗打交道。老夫不以大欺小，只叫护林三袋弟子陈阿七下来与你拆解几招——不求你必胜，只瞧瞧少侠临阵之时，有没有我丐帮儿郎『宁折不弯』的胆气！”',
    },
    {
      speaker: SPEAKER_APRICOT_DISCIPLE,
      text: '（一名精壮矫健的三袋青年弟子手执芦竹竿跃入沙场中央，爽朗抱拳）“少侠请赐教！咱们同门切磋，点到即止！”',
    },
  ],
  choices: [
    {
      id: 'gb13_start_arena_spar',
      label: '【踏入沙场抱拳应战】“请陈兄指教！”（点到为止，胜败皆可过关）',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: GAIBANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildApricotDiscipleNpc() },
          rule: 'spar',
          lethalOnLose: false,
          forbidEscapeReason: '演武场众长老面前考校胆魄，岂能临阵脱逃！',
          introText:
            '【杏林演武考校】三袋护林弟子陈阿七手执芦竹竿攻来！此战仅试胆气骨魄，点到为止，无论胜负皆可顺利过关！',
          onWin: [{ type: 'openScene', scene: buildSceneGb14AfterSpar(true) }],
          onLose: [{ type: 'openScene', scene: buildSceneGb14AfterSpar(false) }],
          onDraw: [{ type: 'openScene', scene: buildSceneGb14AfterSpar(true) }],
        },
      ],
    },
  ],
}

const SCENE_GB_12_APRICOT_FOREST_GATE: StorySceneDef = {
  id: 'scene_gb_12_apricot_forest_gate',
  title: '第十二幕 · 杏林深处百衲雄',
  subtitle: '洛阳府郊 · 丐帮中原总舵外林',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '洛阳定鼎门外西南二十里，嵩洛群山环抱之间，万顷古杏林绵延如海。微风吹过，满林新叶与残存的粉白花瓣沙沙作响，这儿便是名动天下的第一大帮——丐帮中原总舵【杏子林】！',
    },
    {
      speaker: { kind: 'narrator' },
      text: '甫一踏入林口，便闻灵犬吠鸣、白鸽振翅、竹杖击石之声交织成片。林荫小道旁，数百名身穿百衲补丁衣衫的污衣派与净衣派乞丐井然有序地忙碌着：有的在擦拭打狗竹棒，有的在分装送往河北边关的伤药，人人双目炯炯、步履矫健，非但没有半分市井乞儿的颓唐萎靡，反倒透着一股堂堂正正的草莽英雄气！',
    },
    {
      speaker: SPEAKER_APRICOT_DISCIPLE,
      text: '（守林的三袋弟子陈阿七横竹竿拦住去路，待验看你递上的火漆巡边荐信与三节青竹短签后，神色立时肃然起敬）“原来是随吴香主夜破黑风脚行、义散五百两官银救活满棚灾民的少侠！吴香主的信鸽昨夜便先一步飞抵总舵了——马副帮主与传功宋长老正在【莲花竹棒演武沙场】候着你呢，快随我入林！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: GAIBANG_ENTRY_QUEST_ID,
      stepId: 'arena_trial',
      deadlineDays: null,
    },
    {
      type: 'toast',
      text: '已步入丐帮杏子林总舵！请点击进入【莲花竹棒演武沙场】，拜见副帮主【马大元】或传功长老【宋奚长】！',
      tone: 'talk',
      logTag: '杏林总舵',
    },
  ],
}

// ============================================================================
// 第二卷：夜探义仓 · 散尽脏银（第 7～11 幕）
// ============================================================================

const SCENE_GB_11_FAREWELL_PAVILION: StorySceneDef = {
  id: 'scene_gb_11_farewell_pavilion',
  title: '第十一幕 · 辞别长亭赴洛阳',
  subtitle: '城郊十里长亭 · 朝阳启程',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '红日跃出东山薄雾，金灿灿的晨光洒满官道两旁的垂柳。获救的流民乡亲们千恩万谢地踏上了返乡安居的路途，十里长亭前只余下老拐子李与周小碗相送。',
    },
    {
      speaker: SPEAKER_XIAO_WAN,
      text: '（周小碗挥着手里那只缺口粗瓷碗，眼圈微红却又努力咧嘴笑着）“少侠哥哥，我跟李爷爷还得留在城里照顾张瞎子老伯，就不陪你去洛阳啦！你到了【洛阳府 · 丐帮中原总舵（杏子林坛）】，一定要把腰杆挺得直直的——等我将来攒够功劳升上五袋六袋，咱们一块儿去雁门关外打契丹恶贼！”',
    },
    {
      speaker: SPEAKER_LAO_LI,
      text: '（老拐子李拄着枣木拐杖哈哈一笑）“好小子，一路顺风！记住，进杏子林先去演武场寻【马大元】副帮主呈验吴香主的荐信，咱们丐帮的大门，永远向你这等有情有义的硬汉敞开！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你珍重收好怀中火漆荐信与掌心那枚温热的糖渍山楂，向一老一少深深一揖，转身大步踏上通往西京洛阳的官道！）',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: GAIBANG_ENTRY_QUEST_ID,
      stepId: 'go_luoyang_apricot',
      deadlineDays: null,
    },
    {
      type: 'toast',
      text: '已获吴岳彻亲书火漆保举荐信！请前往【洛阳府 · 丐帮中原总舵（杏子林坛）】拜山入帮！',
      tone: 'success',
      logTag: '剑指杏林',
    },
  ],
}

const SCENE_GB_10_SUGAR_HAWTHORN: StorySceneDef = {
  id: 'scene_gb_10_sugar_hawthorn',
  title: '第十幕 · 义散千金赠山楂',
  subtitle: '城外十里长亭 · 破晓分银',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '五更天光微亮之时，旧义仓外的大火已被扑灭。六袋巡边香主吴岳彻率领十余名丐帮精悍弟子大获全胜，将黑风脚行大小头目捆成一串，连同你夺出的那本《皇祐二年春赈济转运实录》铁证一并押送清正官署法办；仓内囤积的三千石赈灾糙米与那箱五百两白银，则当场在城外十里长亭分派给了受难流民！',
    },
    {
      speaker: SPEAKER_REFUGEE_MOTHER,
      text: '（流民们捧着沉甸甸的米袋与返乡路费，喜极而泣。那名叫囡囡的小女娃迈着小短腿跑到你面前，仰起通红的小脸，摊开小手，把一颗用干净荷叶包着、在手心里捂得温热的糖渍红山楂塞进你掌心）“大侠哥哥，娘说你连自己的外衣都借给囡囡穿，身上却一文钱都没有……这颗甜果子是过年时爹留给囡囡的，给你吃！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0297' },
      text: '（吴岳彻走上前来，瞧见你依旧空空荡荡的钱袋与掌心那颗红山楂，虎目微热，重重一掌拍在你肩头，仰天大笑）“好！好一个一文不取的铁骨少侠！老吴我在江湖上跑了二十年，见过太多满口仁义道德、见了百两黄白便改换嘴脸的衣冠剑客；却头一回见到少侠这般囊中羞涩到不足三两碎银，面对五百两现银却眼皮都不动一下、全数散给苦命人的真豪杰！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0297' },
      text: '（吴岳彻当场咬破指尖，在一封盖有『大宋丐帮巡边印信』的火漆帛书上郑重签下保举大名，双手奉到你面前）“少侠这等人物若不入我丐帮聚义堂，那真是我丐帮天大的损失！请少侠持我这封火漆荐书，前往西京【洛阳府 · 丐帮中原总舵（杏子林坛）】，拜见马副帮主、汪老帮主与咱们乔峰乔帮主！”',
    },
  ],
  choices: [
    {
      id: 'gb10_accept_letter',
      label: '【郑重接过火漆保举信】“多谢吴香主厚爱，在下这便赴洛阳杏子林一会群豪！”',
      tone: 'gold',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0297' }, delta: 20 },
        { type: 'openScene', scene: SCENE_GB_11_FAREWELL_PAVILION },
      ],
    },
  ],
}

function buildSceneGb09Resolution(choiceMode: 'scatter_all' | 'return_granary' | 'hesitate_reject'): StorySceneDef {
  const detailText =
    choiceMode === 'scatter_all'
      ? '“住口！这箱银子每一分每一厘都是从灾民骨头缝里刮出来的民脂民膏，我纵是饿死街头，也绝不脏了自家双手！”你飞起一脚踢翻账房手里的算盘，一把抓起案上蓝皮《皇祐二年春赈济转运实录》揣入怀中，反手拎起整口樟木银箱大步走出账房，尽数交由外头接应的丐帮弟兄分给逃荒百姓！'
      : choiceMode === 'return_granary'
        ? '“谁稀罕你的买命脏银！这五百两官银连同黑账，一文不少全得还给受灾乡亲！”你冷哼一声，看也不看那满箱刺目的白银，径直收起《皇祐二年春赈济转运实录》铁证，用麻绳将账房捆在廊柱上，唤来周小碗与丐帮弟兄将整箱银两抬出义仓赈济灾黎！'
        : '你低头看着箱中白花花的银锭，摸了摸自己干瘪得贴着肚皮的行囊，指尖微微一动。可就在触及冰凉银锭的一刹那，破庙篝火旁周小碗毫不犹豫掰给你的那半块焦麦饼、还有方才棚屋里小女娃冻得发紫的嘴唇骤然浮现在眼前！你猛地收回右手，哑然一笑：“险些叫这几两阿堵物迷了本心！脏银一文不取，全分给外头的苦命乡亲！”言罢收起蓝皮黑账，将整箱银两原封不动搬出救人！'

  return {
    id: `scene_gb_09b_resolution_${choiceMode}`,
    title: '第九幕（续）· 拂袖不沾昧心银',
    subtitle: '旧义仓东厢账房 · 浩然本心',
    mandatory: true,
    beats: [
      {
        speaker: { kind: 'narrator' },
        text: detailText,
      },
      {
        speaker: SPEAKER_XIAO_WAN,
        text: '（门外接应的周小碗趴在窗缝里瞧得真真切切，激动得直拍大腿）“哇！少侠哥哥，五百两白花花的大银锭子，你连一两碎银都没往自己怀里揣！走走走，吴香主他们已经把前院恶霸全料理干净啦！”',
      },
    ],
    choices: [
      {
        id: `gb09b_to_dawn_${choiceMode}`,
        label: '【提账册携银箱步出义仓】与吴岳彻香主汇合赈济流民',
        tone: 'gold',
        effects: [
          {
            type: 'modifyChivalry',
            delta: choiceMode === 'hesitate_reject' ? 12 : 15,
            reason: '夜探义仓见五百两现银分毫不取，尽散流民',
          },
          { type: 'openScene', scene: SCENE_GB_10_SUGAR_HAWTHORN },
        ],
      },
    ],
  }
}

const SCENE_GB_09_ACCOUNT_ROOM_SILVER: StorySceneDef = {
  id: 'scene_gb_09_account_room_silver',
  title: '第九幕 · 烛影樟箱试本心',
  subtitle: '旧义仓东厢账房 · 五百两雪花银',
  illustrationUrl: '/assets/quests/gaibang_granary_silver.jpg',
  illustrationCaption: '义仓账房烛影摇红 · 囊空少侠面对五百两雪花脏银拂袖不取',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '送走被困妇孺后，你借着前院冲天火光掩护，悄然掠至东厢青砖账房门外，足尖轻轻一点踹开房门！屋内两盏铜油灯烛影摇晃，瘦猴似的账房先生钱算盘正满头大汗地往包袱里塞银锭，冷不防见你破门而入，吓得魂飞魄散，“扑通”一声瘫跪在地。',
    },
    {
      speaker: SPEAKER_BOOKKEEPER,
      text: '（钱算盘抖如筛糠，双手死死捧起一口敞开的樟木大银箱举过头顶）“好汉爷饶命！女侠大王饶命啊！小的只是个替黑风脚行记账的苦命书办！这口樟木箱里整整装着【五百两雪花官银】，全孝敬给好汉爷您独吞！只求您高抬贵手，别拿桌上那本蓝皮实录，放小的一条生路吧！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '昏黄烛光映照之下，樟木箱里一排排十两重的官铸雪花银锭闪烁着诱人寒光；而榆木书案一角，正压着一本墨迹未干的蓝皮《皇祐二年春赈济转运实录》，上面一笔笔触目惊心地记着黑风脚行勾结仓吏私吞三千石救命粮、逼死七名逃荒苦力的铁证。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '此时账房内外空无旁人。你低头看了一眼自己空空如也、连住客栈三两银子都凑不齐的衣袋——只要随手抓上几锭银子塞进怀里，神不知鬼不觉，明日便可换上鲜衣怒马、住进城里最豪华的酒楼。一念清浊，皆在方寸之间。',
    },
  ],
  choices: [
    {
      id: 'gb09_scatter_all',
      label: '【夺黑账散尽脏银】“民脂民膏，沾半文都嫌脏手！全数分给逃荒乡亲！”',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: buildSceneGb09Resolution('scatter_all') }],
    },
    {
      id: 'gb09_return_granary',
      label: '【铁面封箱送官还民】分文不取，将黑账与赃银一并起出还粮于民！',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: buildSceneGb09Resolution('return_granary') }],
    },
    {
      id: 'gb09_touch_then_reject',
      label: '【摸了摸干瘪钱袋……】想起破庙那半块麦饼，收回手一文不取！',
      tone: 'jade',
      effects: [{ type: 'openScene', scene: buildSceneGb09Resolution('hesitate_reject') }],
    },
  ],
}

const SCENE_GB_08B_CAPTIVES_FREED: StorySceneDef = {
  id: 'scene_gb_08b_captives_freed',
  title: '第八幕（续）· 解衣覆寒送孤弱',
  subtitle: '旧义仓西厢柴棚 · 雪夜温情',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '三两下将巡夜恶监刁疤眼打翻捆牢、塞上破布堵住嘴后，你一把拉开西厢柴棚沉重的木栓。一股潮湿霉冷之气扑面涌出，只见昏暗稻草堆里蜷缩着十几名面黄肌瘦的逃荒老妇与孩童。',
    },
    {
      speaker: SPEAKER_REFUGEE_MOTHER,
      text: '（年轻寡妇陈氏紧紧搂着怀里五六岁的小女娃囡囡，吓得瑟瑟发抖，小女娃冻得嘴唇发紫，低声抽泣）“娘……我好冷，他们是不是又要拿皮鞭打咱们了……”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你心头一酸，当即解下自己身上尚算厚实的外罩布衫，轻轻裹在小女娃冰凉的肩头上，温言安抚道）“大嫂莫怕，小妹妹莫哭！我们是城里丐帮的朋友，前院恶霸已被引开，快随这位周小哥从西边水门出去，外头有热汤和接应的好汉！”',
    },
    {
      speaker: SPEAKER_XIAO_WAN,
      text: '（周小碗利索地扶起两名腿脚不便的老大娘，压低嗓音冲你竖了竖大拇指）“少侠哥哥真仁义！我这就领大伙儿钻芦苇荡撤出去——黑风脚行私吞赈粮的黑账就在东厢那间亮着油灯的青砖账房里，拿到账本咱们便大功告成！”',
    },
  ],
  choices: [
    {
      id: 'gb08b_go_account_room',
      label: '【孤身掠往东厢账房】搜取黑风脚行私吞赈粮铁证',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_09_ACCOUNT_ROOM_SILVER }],
    },
  ],
}

const SCENE_GB_08_FREE_CAPTIVES: StorySceneDef = {
  id: 'scene_gb_08_free_captives',
  title: '第八幕 · 破锁救孤斥恶监',
  subtitle: '旧义仓西厢柴棚 · 狭路相逢',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '穿过堆满麻袋的后院夹道，西厢一排低矮潮湿的柴棚门前挂着一把碗口大的熟铁横锁，棚内隐隐传出妇孺压抑的咳嗽与低泣声。你正运劲以铁钎撬开锁簧，廊角忽地晃出一盏昏黄气死风灯！',
    },
    {
      speaker: SPEAKER_OVERSEER,
      text: '（满脸横肉的巡夜恶监刁疤眼左手提灯、右手拎着一根水火枣木棍，撞见你与周小碗撬锁，顿时狞笑一声）“好哇！前门着火原来是调虎离山，竟有两个小毛贼摸进后院放这些抵债的贱民！纳命来！”',
    },
  ],
  choices: [
    {
      id: 'gb08_subdue_overseer',
      label: '【出手制伏恶监】速战速决，莫让他惊动前院群寇！',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: GAIBANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildGranaryOverseerNpc() },
          rule: 'spar',
          lethalOnLose: false,
          forbidEscapeReason: '棚内十余名无辜妇孺待救，岂能弃之不顾！',
          introText: '巡夜恶监刁疤眼挥棍扑来！速将其制伏以救出棚内受困流民（若力有未逮，周小碗亦会飞石助阵）！',
          onWin: [{ type: 'openScene', scene: SCENE_GB_08B_CAPTIVES_FREED }],
          onLose: [{ type: 'openScene', scene: SCENE_GB_08B_CAPTIVES_FREED }],
          onDraw: [{ type: 'openScene', scene: SCENE_GB_08B_CAPTIVES_FREED }],
        },
      ],
    },
    {
      id: 'gb08_bluff_overseer',
      label: '【诈称前院大当家调兵】趁其回首惊疑之际一记手刀劈晕！',
      tone: 'jade',
      effects: [{ type: 'openScene', scene: SCENE_GB_08B_CAPTIVES_FREED }],
    },
  ],
}

const SCENE_GB_07_REED_WATERGATE: StorySceneDef = {
  id: 'scene_gb_07_reed_watergate',
  title: '第七幕 · 芦苇水门潜夜踪',
  subtitle: '城南旧义仓 · 寒水芦荡',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '残月隐入乌云，护城河支流的水面上浮动着一层乳白色夜雾。你与周小碗猫着腰穿行在半人高的枯黄芦苇丛中，鞋袜早已被河滩冷泥浸湿。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '忽听旧义仓正门方向“轰”地腾起一团赤红火光，紧接着铜锣乱响，数十名黑风脚行打手骂骂咧咧地提着水桶朴刀往正门涌去——正是吴岳彻香主与老拐子李依计发动了正面佯攻！',
    },
    {
      speaker: SPEAKER_XIAO_WAN,
      text: '（周小碗扒开芦苇，指着水闸旁一道半朽的铁栅暗门，兴奋得直眨眼）“少侠哥哥快看！守西水门的两个懒贼全被吴香主的火头引过去救火啦！咱们顺着这道水栅潜进去，神仙也察觉不了！”',
    },
  ],
  choices: [
    {
      id: 'gb07_slip_inside',
      label: '【屏息翻越水栅】潜入旧义仓西厢解救受困乡亲',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_08_FREE_CAPTIVES }],
    },
  ],
}

// ============================================================================
// 第一卷：长街囊涩 · 寒夜分羹（第 1～6 幕）
// ============================================================================

const SCENE_GB_06_BAMBOO_TALLY: StorySceneDef = {
  id: 'scene_gb_06_bamboo_tally',
  title: '第六幕 · 青竹短签巡边会',
  subtitle: '城隍古庙外 · 三更定计',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '恰在此时，庙外古槐树梢轻轻一晃，三更梆子声里悄无声息地飘落一道精悍矫健的青衣身影。来人三十出头年纪，浓眉精目，腰间整整齐齐系着六只灰布口袋，正是奉命巡查中原漕路与边关粮道的丐帮六袋巡边香主【吴岳彻】！',
    },
    {
      speaker: SPEAKER_LAO_LI,
      text: '（老拐子李拄杖起身迎上，低声将你囊空如洗却仗义救盲老汉、又愿助探义仓之事一五一十禀明。）',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0297' },
      text: '（吴岳彻目光如电，上下打量你一番，神色由审慎化作钦佩，郑重抱拳一揖）“少侠高义，吴某佩服！实不相瞒，当今皇祐二年，北疆契丹磨刀霍霍，朝廷每一粒赈灾粮、每一味军需药皆关乎百姓生死与边防安危。那黑风脚行背后隐有不法仓吏撑腰，今夜他们正欲将私扣的三千石赈粮连夜装船偷运南下销赃，迟则生变！”',
    },
    {
      speaker: { kind: 'npc', npcId: 'NPC-0297' },
      text: '（吴岳彻从袖中取出一枚刻有三道竹节纹的青竹短签递入你手中）“少侠面生，恰是潜入敌后的奇兵！今夜三更半，我率老李头与几名弟兄在旧义仓正门纵火擂鼓佯攻，将其护院主力悉数引至前院；敢烦少侠携小碗由西侧芦苇水门潜入，一则救出西厢被押的逃荒妇孺，二则自东厢账房取回那本《赈济转运实录》铁证！”',
    },
  ],
  choices: [
    {
      id: 'gb06_depart_now',
      label: '【接过青竹短签即刻出发】救人如救火，这便随周小弟潜往旧义仓！',
      tone: 'gold',
      effects: [
        {
          type: 'startQuest',
          questId: GAIBANG_ENTRY_QUEST_ID,
          stepId: 'raid_granary',
          silent: true,
        },
        { type: 'openScene', scene: SCENE_GB_07_REED_WATERGATE },
      ],
    },
    {
      id: 'gb06_prepare_briefly',
      label: '【接过短签稍作调息】容我整束衣鞋，随后在城内酒肆/客栈汇合出发',
      tone: 'default',
      effects: [
        {
          type: 'startQuest',
          questId: GAIBANG_ENTRY_QUEST_ID,
          stepId: 'raid_granary',
        },
        {
          type: 'toast',
          text: '已接下《青囊尽空 · 义聚杏林》夜探义仓之约！调息妥当后，步入任一中原城池【客栈】或【酒肆】即可随周小碗潜往旧义仓！',
          tone: 'talk',
          logTag: '青竹定计',
        },
      ],
    },
  ],
}

const SCENE_GB_05_REFUGEE_TEARS: StorySceneDef = {
  id: 'scene_gb_05_refugee_tears',
  title: '第五幕 · 流民泣血脚行恶',
  subtitle: '城隍古庙大殿 · 市井隐痛',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '一口滚烫的姜丝野菜汤下肚，混着粗粝却麦香扑鼻的焦黄麦饼，连日来的饥寒顿时消去了大半。提及“黑风脚行”四字，原本笑呵呵的老拐子李脸色倏地沉了下来，苍老的手掌攥紧了枣木拐杖。',
    },
    {
      speaker: SPEAKER_LAO_LI,
      text: '“唉……小兄弟有所不知。去岁入冬以来，京东、京西黄河沿岸几处州县连遭霜冻春荒，不少庄稼汉拖家带口逃荒到城外讨活路。仁宗官家宅心仁厚，开春便由户部与转运司调拨了一批平粜赈粮与驱疫草药，原是给城外流民救命用的。”',
    },
    {
      speaker: SPEAKER_XIAO_WAN,
      text: '（周小碗气鼓鼓地拿树枝拨弄着火堆，火星四溅）“谁知城南码头新蹿出一伙恶霸『黑风脚行』！方才欺负张瞎子老伯的胡三就是他们的外围狗腿子！这帮黑心烂肺的家伙买通了仓曹小吏，强占了城南河湾的旧义仓，不仅把朝廷发的救命糙米换成发霉秕谷，还借口流民欠了『渡河脚钱』，把十几户逃荒来的孤儿寡母全锁在义仓后棚里日夜搓麻绳抵债！”',
    },
    {
      speaker: SPEAKER_LAO_LI,
      text: '“咱们丐帮六袋巡边香主【吴岳彻】吴爷前几日赶来查访，正愁本帮弟兄俱是熟面孔乞儿，黑风脚行一见挂布袋的乞丐便紧闭铁闸，始终摸不进后棚救人、拿不到他们私吞赈粮的黑账……”',
    },
    {
      speaker: { kind: 'player' },
      text: '（你放下手中粗瓷碗，剑眉一轩，慨然道）“食君之禄而盗赈灾救命粮，锁孤寡妇孺而肥私囊，此等国蠹恶贼人人得而诛之！两位大哥分我半块麦饼已是雪中送炭，今夜若用得着在下这副生面孔，我愿随你们走一遭黑风脚行！”',
    },
  ],
  choices: [
    {
      id: 'gb05_hear_footsteps',
      label: '【话音刚落，忽闻庙外三更梆响与轻捷足音】凝神望向庙门',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_06_BAMBOO_TALLY }],
    },
  ],
}

const SCENE_GB_04_TEMPLE_HALF_CAKE: StorySceneDef = {
  id: 'scene_gb_04_temple_half_cake',
  title: '第四幕 · 古庙篝火分焦饼',
  subtitle: '城隍破庙大殿 · 寒夜一饭恩',
  illustrationUrl: '/assets/quests/gaibang_temple_fire.jpg',
  illustrationCaption: '城隍破庙寒夜篝火 · 老少乞儿掰分仅剩焦黄麦饼相赠',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '入夜之后春寒料峭，冷风顺着城隍破庙漏顶的瓦缝呼呼倒灌。斑驳剥落的泥塑神像脚下，老拐子李熟练地拢起一堆干枯松枝点着篝火，橘红色的火苗噼啪跳跃，将三人暖融融的影子投在断壁残垣之上。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '周小碗架起一只熏得乌黑的缺口瓦罐，用清水加了几片生姜与一把洗净的苦菜煮得咕嘟冒泡；随后他又献宝似地从怀里贴身油纸包中摸出唯一一张烤得焦黄酥脆的粗面锅盔，毫不犹豫地双手一掰，将最大的一半连同一碗热气腾腾的姜丝菜汤捧到你面前。',
    },
    {
      speaker: { kind: 'player' },
      text: '（你望着小乞儿瘦得皮包骨头的手腕，连忙推辞）“使不得！二位本就靠沿街乞食度日，这一张饼你们爷孙俩尚且吃不饱，在下四肢健全，岂能夺你们的口粮？”',
    },
    {
      speaker: SPEAKER_LAO_LI,
      text: '（老拐子李把枣木拐杖横在膝头，笑得眼角皱纹舒展）“哈哈，小兄弟快接下吧！英雄莫问出处，好汉也有落难时——哪怕是昔年开国太祖赵官家，微末之时不也曾困顿街头、吃过旁人施舍的热汤么？进了这扇破庙门，四海之内皆兄弟，你若嫌咱们花子的手脏便罢，若不嫌弃，只管大口吃！”',
    },
    {
      speaker: SPEAKER_XIAO_WAN,
      text: '（周小碗蹲在火堆旁托着腮帮子，一双乌溜溜的大眼睛亮晶晶地瞅着你）“就是就是！少侠哥哥方才自己饿着肚子，还肯替张瞎子老伯出头揍胡三那恶棍，比城南『黑风脚行』那帮吃人不吐骨头的狗贼强出一万倍！这半块饼，我周小碗请得心甘情愿！”',
    },
  ],
  choices: [
    {
      id: 'gb04_eat_grateful',
      label: '【双手郑重接过麦饼与热汤】“今日半饼之恩，在下铭记于心！何谓黑风脚行？”',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'openScene', scene: SCENE_GB_05_REFUGEE_TEARS },
      ],
    },
  ],
}

const SCENE_GB_03_PEBBLE_RESCUE: StorySceneDef = {
  id: 'scene_gb_03_pebble_rescue',
  title: '第三幕 · 飞石惊鸿老少丐',
  subtitle: '城隍古庙残垣 · 四袋与二袋',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '泼皮胡三吃了瘪，脸上青一阵白一阵，正欲招呼身后两名跟班一拥而上，忽听破庙飞檐阴影下传来“嗤、嗤”两声破空轻响！两粒圆润鹅卵石快似流星，分毫不差地打在胡三与跟班膝弯“委中”麻穴之上！',
    },
    {
      speaker: SPEAKER_BULLY_HUSAN,
      text: '（胡三“哎哟”一声惨叫，双腿一软扑通跪倒在泥水坑里，抬头瞥见庙门阴影里走出的两人，脸色瞬间白如死灰）“哎呀妈呀，是丐帮的四袋李爷！小的有眼不识泰山，走！快走！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '地痞们连滚带爬地鼠窜远去。你凝目望去，只见破庙门洞内一前一后踱出一老一少两名乞丐：老者年逾六旬，跛了一足，拄着一根磨得油光水滑的枣木拐杖，衣衫虽打了十几个补丁却浆洗得干干净净，腰间系着四只灰布口袋；后头跟着的十四五岁瘦小少年腰系两只布袋，手里端着一只缺口粗瓷碗，正笑嘻嘻地把玩着一把竹丫弹弓。',
    },
    {
      speaker: SPEAKER_BLIND_OLD_MAN,
      text: '（盲眼张老伯摸索着拾起破锣，朝着你和两名乞丐连连作揖）“多谢这位过路少侠仗义相救，多谢李老哥、小碗哥儿……”',
    },
    {
      speaker: SPEAKER_LAO_LI,
      text: '（老拐子李先从怀中取出一块软和蒸饼塞给张老伯嘱他早些归家，随即转过身笑吟吟地将你打量一番，浑浊的双眼中透出几分赞赏）“小兄弟好胆色！老花子方才在庙檐上瞧得真切——你在街口炊饼摊前摸遍了浑身口袋，只怕随身盘缠早已见底了吧？自己尚在饥寒困顿之中，见恶少欺凌盲叟却能毫不犹豫挺身而出，这份侠骨，难得，真难得！天色已黑，外头风寒，不如进咱们这破庙烤烤火？”',
    },
  ],
  choices: [
    {
      id: 'gb03_enter_temple',
      label: '【拱手道谢】“多谢老丈与小兄弟援手，恭敬不如从命！”',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_04_TEMPLE_HALF_CAKE }],
    },
  ],
}

const SCENE_GB_02_BULLY_BLIND: StorySceneDef = {
  id: 'scene_gb_02_bully_blind',
  title: '第二幕 · 破庙残锣欺盲叟',
  subtitle: '城南城隍古庙外 · 路见不平',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '循声转入城隍古庙外的僻静泥巷，只见石阶前一片狼藉。一名双目蒙着灰白布条、鬓发枯黄的卖唱老汉正伏在泥水里苦苦摸索；他赖以谋生的一面破铜锣已被踩扁，旁边一只碎裂的粗陶碗里，半碗刚讨来的热菜汤洒得满地都是。',
    },
    {
      speaker: SPEAKER_BULLY_HUSAN,
      text: '（身穿油腻绸衫的泼皮头目胡三一脚踩在盲老汉干枯的手背上，居高临下地吐了口唾沫）“老瞎子，耳朵聋了不成？南街码头如今归咱们『黑风脚行』管，蹲城隍庙台阶唱小曲儿，每月得交三十文地皮钱！拿不出铜板，爷今天就把你这破铜锣砸烂了卖废铜！”',
    },
    {
      speaker: SPEAKER_BLIND_OLD_MAN,
      text: '（张老伯疼得浑身抽搐，嘶声哀求）“胡三爷行行好……老朽眼瞎腿慢，两天只唱得八文钱，这碗热菜汤还是巷口李大娘刚施舍给老朽救命的……您把铜锣踩烂了，老朽明日可怎么活命啊……”',
    },
    {
      speaker: { kind: 'player' },
      text: '（胡三狞笑着抬靴便要往老人心窝踹落。你胸中一股热血轰然上涌，当即大步抢上石阶，厉声喝道）“住手！朗朗乾坤、天子脚下，连盲眼老人的救命汤与谋生铜锣都要抢，你们眼里还有半点人性王法么？！”',
    },
  ],
  choices: [
    {
      id: 'gb02_fight_bully',
      label: '【欺身上前空手惩戒】出手拨开恶少毒腿，教训这欺软怕硬之徒！',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: GAIBANG_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildBullyHuSanNpc() },
          rule: 'spar',
          lethalOnLose: false,
          forbidEscapeReason: '盲眼老人就在身后，岂可退让半步！',
          introText: '泼皮胡三恼羞成怒挥拳扑上！略施拳脚将其逼退（无论胜负，破庙暗处皆有高人飞石援手）！',
          onWin: [{ type: 'openScene', scene: SCENE_GB_03_PEBBLE_RESCUE }],
          onLose: [{ type: 'openScene', scene: SCENE_GB_03_PEBBLE_RESCUE }],
          onDraw: [{ type: 'openScene', scene: SCENE_GB_03_PEBBLE_RESCUE }],
        },
      ],
    },
    {
      id: 'gb02_branch_deter',
      label: '【抄起墙角半截硬木枯枝】疾点胡三咽喉寸许，喝令其滚开！',
      tone: 'jade',
      effects: [{ type: 'openScene', scene: SCENE_GB_03_PEBBLE_RESCUE }],
    },
  ],
}

export const SCENE_GB_01_EMPTY_PURSE: StorySceneDef = {
  id: 'scene_gb_01_empty_purse',
  title: '第一幕 · 囊空如洗斜阳孤',
  subtitle: '中原长街暮色 · 英雄气短时',
  mandatory: true,
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐二年的黄昏暮霭低垂在青石长街之上，街角胡麻蒸饼铺刚掀开最后一层竹笼屉，滚烫洁白的水汽裹挟着浓郁麦香与芝麻油香飘出半条街坊。归家的挑夫、嬉闹的孩童与鲜衣怒马的富家公子擦肩而过，唯有你独自伫立在街边柳树影里。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '你低头摸遍了随身钱袋与袖底夹层——连日闯荡江湖、购置行装医药，昔日盘缠早已如流水般散尽，如今指尖触到的只剩寥寥碎银铜板，莫说去城中悦来客栈投宿一宵，便是进酒楼点一碟酱牛肉、烫一壶村酒也已捉襟见肘。',
    },
    {
      speaker: {
        kind: 'custom',
        name: '蒸饼摊掌柜',
        title: '市井小贩',
        factionName: '市井百姓',
        portraitUrl: '/assets/characters/templates/tpl_baicao_male_fb.jpg',
        avatarUrl: '/assets/characters/templates/tpl_baicao_male_av.jpg',
      },
      text: '（摊掌柜见你按着剑柄站在摊前良久未掏铜钱，眉头一皱，挥着油蒲扇不耐烦地驱赶道）“去去去，这位客官，买不起热炊饼便劳驾往边上挪挪，莫挡着后头官人伙计做生意！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '一分钱难倒英雄汉。你自嘲地摇了摇头，压下腹中饥意，正欲往城南僻静处寻座避风古庙将就一宿，忽听前方城隍破庙巷口传来一阵铜锣碎裂的刺耳闷响，紧接着是几名市井泼皮的哄笑与苍老嘶哑的求饶声！',
    },
  ],
  choices: [
    {
      id: 'gb01_step_forward',
      label: '【快步赶往巷口】囊中虽空，路见不平岂能袖手旁观！',
      tone: 'gold',
      effects: [{ type: 'openScene', scene: SCENE_GB_02_BULLY_BLIND }],
    },
    {
      id: 'gb01_sigh_then_go',
      label: '【叹息一声迈步上前】“自己虽落魄，却还不至于见死不救！”',
      tone: 'primary',
      effects: [{ type: 'openScene', scene: SCENE_GB_02_BULLY_BLIND }],
    },
  ],
}

// ============================================================================
// 触发条件与多城自动挂载构建
// ============================================================================

const PENNILESS_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    { type: 'flag', flag: 'shaolin_novice_state', op: 'eq', value: 'none' },
    { type: 'silverAtMost', max: 3 },
    {
      type: 'questStatus',
      questId: GAIBANG_ENTRY_QUEST_ID,
      status: 'not_started',
    },
  ],
}

function buildCityPennilessTriggers(): QuestLocationTriggerDef[] {
  const triggers: QuestLocationTriggerDef[] = []

  // 1) 踏入中原 9 大州府全景长街（或从城内商铺/客栈花光银两后步出长街）自动触发第 1 幕
  for (const cityId of GAIBANG_TRIGGER_CITY_IDS) {
    triggers.push({
      id: `trig_gaibang_penniless_street_${cityId}`,
      regionId: cityId,
      onceFlag: 'gaibang_penniless_triggered',
      condition: PENNILESS_START_CONDITION,
      effects: [{ type: 'openScene', scene: SCENE_GB_01_EMPTY_PURSE }],
    })

    // 2) 若玩家第 6 幕选择了“稍作整备再出发”，踏入中原州府基础酒楼或客栈即可会合周小碗继续第 7 幕
    for (const suffix of ['base_tavern', 'base_inn'] as const) {
      triggers.push({
        id: `trig_gaibang_resume_raid_${cityId}_${suffix}`,
        regionId: cityId,
        buildingId: `${cityId}_${suffix}`,
        condition: {
          type: 'questStatus',
          questId: GAIBANG_ENTRY_QUEST_ID,
          status: 'active',
          stepId: 'raid_granary',
        },
        effects: [{ type: 'openScene', scene: SCENE_GB_07_REED_WATERGATE }],
      })
    }
  }

  // 3) 持吴岳彻火漆荐书踏入洛阳府【丐帮中原总舵（杏子林坛）】自动触发第 12 幕迎宾剧情
  triggers.push({
    id: 'trig_gaibang_enter_apricot_hq',
    regionId: 'luoyang',
    buildingId: 'ly_gaibang',
    onceFlag: 'gaibang_apricot_entered',
    condition: {
      type: 'questStatus',
      questId: GAIBANG_ENTRY_QUEST_ID,
      status: 'active',
      stepId: 'go_luoyang_apricot',
    },
    effects: [{ type: 'openScene', scene: SCENE_GB_12_APRICOT_FOREST_GATE }],
  })

  return triggers
}

export const GAIBANG_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: GAIBANG_ENTRY_QUEST_ID,
    title: '青囊尽空 · 义聚杏林',
    category: 'sect_entry',
    factionId: 'SECT-02',
    regionId: 'luoyang',
    recommendedRealm: '不入流 ～ 三流上品（零门槛侠义剧情）',
    maxOpponentRealm: '三流下品（切磋点到为止，胜败皆可推进）',
    recommendedNote:
      '当少侠无门无派且随身纹银 ≤ 3 两时，于开封、洛阳、大名、真定、太原、京兆、济南、襄阳、扬州任一中原州府自动触发，全篇二十二幕侠义长卷，无卡关战斗。',
    startHint:
      '无门无派且随身纹银 ≤ 3 两时，步入任一中原核心州府（如开封府、洛阳府等）长街即可触发城隍破庙偶遇丐帮弟兄剧情。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_gaibang',
      customLabel: '中原九大州府长街（纹银 ≤ 3 两时自动触发）',
    },
    startCondition: PENNILESS_START_CONDITION,
    summary:
      '囊中羞涩不足三两碎银之时，于暮色长街挺身护住受恶少欺凌的盲眼老叟，结识丐帮老拐子李、周小碗与六袋巡边香主吴岳彻。寒夜分食半块焦麦饼后，夜探黑风脚行旧义仓解救逃荒妇孺，面对五百两白银分毫不取尽散灾黎。随后持火漆保举信奔赴洛阳杏子林总舵，经马大元演武试骨、汪剑通飞鸽问心，终登聚义高坛与青年帮主乔峰共饮烈酒、系袋授杖，堂堂正正拜入天下第一大帮！',
    initialStepId: 'raid_granary',
    steps: {
      raid_granary: {
        id: 'raid_granary',
        title: '夜探义仓 · 解救灾黎',
        objective:
          '已与丐帮六袋巡边香主【吴岳彻】定下调虎离山之计。请随二袋小乞儿【周小碗】自西侧芦苇水门潜入城外旧义仓，救出受困逃荒妇孺并夺回《赈济转运实录》铁证。',
        nextHint:
          '步入任一中原州府的【酒楼】或【客栈】（或前往开封樊楼酒窖寻【吴岳彻】），即可随周小碗动身夜探旧义仓。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_inn',
          customLabel: '任一中原州府客栈/酒肆（会合周小碗夜探旧义仓）',
        },
      },
      go_luoyang_apricot: {
        id: 'go_luoyang_apricot',
        title: '火漆保举 · 奔赴杏林',
        objective:
          '旧义仓恶霸已伏法，五百两脏银尽散流民。请持吴岳彻亲书火漆保举荐信，前往【洛阳府 · 丐帮中原总舵（杏子林坛）】拜山入帮。',
        nextHint: '前往【洛阳府】，点击进入特殊建筑【丐帮中原总舵（杏子林坛）】。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
        },
      },
      arena_trial: {
        id: 'arena_trial',
        title: '沙场拆招 · 宁折不弯',
        objective:
          '已踏入洛阳杏子林总舵。请前往【莲花竹棒演武沙场】，向副帮主【马大元】与传功长老【宋奚长】呈验荐信并接受三招胆魄考校。',
        nextHint: '在杏子林总舵内点击【莲花竹棒演武沙场】，与【马大元】或【宋奚长】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_arena',
        },
      },
      pigeon_heart_test: {
        id: 'pigeon_heart_test',
        title: '飞鸽高寮 · 老骥问心',
        objective:
          '演武考校已过！请移步杏子林东侧【八方飞鸽篝火信寮】，拜谒丐帮太上老帮主【汪剑通】与荣休长老【徐冲霄】。',
        nextHint: '在杏子林总舵内点击【八方飞鸽篝火信寮】，与【汪剑通】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_pigeon',
        },
      },
      altar_oath: {
        id: 'altar_oath',
        title: '聚义高坛 · 乔峰授袋',
        objective:
          '已获汪老帮主首肯！请登临杏子林正中【杏林百酒聚义高坛】，拜见丐帮帮主【乔峰】共饮忠义烈酒，行授袋入门大礼！',
        nextHint: '在杏子林总舵内点击【杏林百酒聚义高坛】，与帮主【乔峰】对话。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_gaibang',
          spotId: 'ly_gb_altar',
        },
      },
    },

    locationTriggers: buildCityPennilessTriggers(),

    npcActions: [
      // 兜底手动入口：若玩家纹银 <= 3 两时直接找到吴岳彻/马大元/乔峰，亦可直接开启第一幕长街奇遇
      {
        id: 'act_gb_penniless_manual_start',
        label: '囊空如洗 · 偶遇破庙风波（开启丐帮入门长卷）',
        badge: '丐帮机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0297', 'NPC-0136', 'NPC-0110'] },
            PENNILESS_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'gaibang_penniless_triggered', value: true },
          { type: 'openScene', scene: SCENE_GB_01_EMPTY_PURSE },
        ],
      },

      // 第 6 幕若选稍后出发，找吴岳彻亦可继续夜探义仓
      {
        id: 'act_gb_resume_raid_wuyueche',
        label: '会合周小碗 · 夜探城外旧义仓',
        badge: '义仓救孤',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0297'] },
            {
              type: 'questStatus',
              questId: GAIBANG_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'raid_granary',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_GB_07_REED_WATERGATE }],
      },

      // 杏子林演武沙场：找马大元（NPC-0136）或宋奚长（NPC-0159）呈递荐信考校三招
      {
        id: 'act_gb_arena_present_letter',
        label: '呈递巡边火漆荐信 · 演武试胆魄',
        badge: '杏林初试',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0136', 'NPC-0159'] },
            {
              type: 'questStatus',
              questId: GAIBANG_ENTRY_QUEST_ID,
              status: 'active',
            },
            {
              type: 'any',
              conditions: [
                {
                  type: 'questStatus',
                  questId: GAIBANG_ENTRY_QUEST_ID,
                  status: 'active',
                  stepId: 'go_luoyang_apricot',
                },
                {
                  type: 'questStatus',
                  questId: GAIBANG_ENTRY_QUEST_ID,
                  status: 'active',
                  stepId: 'arena_trial',
                },
              ],
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_GB_13_ARENA_MADAYUAN }],
      },

      // 杏子林八方飞鸽篝火信寮：找汪剑通（NPC-0111）或徐冲霄（NPC-0195）问心
      {
        id: 'act_gb_pigeon_heart_test',
        label: '拜谒汪老帮主 · 飞鸽信寮问心',
        badge: '老骥问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0111', 'NPC-0195'] },
            {
              type: 'questStatus',
              questId: GAIBANG_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'pigeon_heart_test',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_GB_15_PIGEON_TOWER }],
      },

      // 杏子林百酒聚义高坛：找帮主乔峰（NPC-0110）或执法长老白世镜（NPC-0196）饮酒受袋入帮
      {
        id: 'act_gb_altar_qiaofeng_oath',
        label: '登坛拜见乔帮主 · 共饮烈酒受袋入帮',
        badge: '义聚杏林',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0110', 'NPC-0196'] },
            {
              type: 'questStatus',
              questId: GAIBANG_ENTRY_QUEST_ID,
              status: 'active',
              stepId: 'altar_oath',
            },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_GB_17_ALTAR_QIAOFENG }],
      },
    ],
  },
]
