import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q34_QUEST_ID } from './shaolinTwinMonkMurderQuest'

const SPEAKER_BAIMA_ABBOT: StorySpeakerSpec = {
  kind: 'custom',
  name: '知客僧 · 慧明',
  title: '洛阳白马寺知客',
  factionName: '洛阳白马寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_COURIER_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '罗汉堂值守僧 · 慧觉',
  title: '少林急信武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

const SPEAKER_SHADOW_LEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '燕漠残锋',
  title: '神秘暗影死士首领',
  factionName: '暗影死士',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildShadowLeadBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ34_SHADOW_LEAD',
    name: '燕漠残锋',
    title: '神秘暗影死士首领',
    realm: '宗师下品',
    factionName: '暗影死士',
    sectRank: 0,
    sectRankLabel: '玄影死士',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“乔峰杀师叛义，少林人证皆死！尔等休想留得活口走出东庑武库！”',
    stats: { hp: 4550, mp: 4280, agi: 77, res: 70 },
    talents: { bone: 84, comprehension: 80, charm: 48 },
    equippedArts: { neigong: 'MA-025', qinggong: 'MA-097', move1: 'MA-043', move2: 'MA-071' },
    learnedArts: [
      { artId: 'MA-025', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-043', level: 8 },
      { artId: 'MA-071', level: 8 },
    ],
  })
}

function buildShadowBladeAide(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ34_SHADOW_AIDE',
    name: '玄影断魂客',
    title: '暗影死士副手',
    realm: '一流上品',
    factionName: '暗影死士',
    sectRank: 0,
    sectRankLabel: '暗影死士',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“主上吩咐，不留半点掌印证物！杀！”',
    stats: { hp: 3320, mp: 2980, agi: 73, res: 58 },
    talents: { bone: 78, comprehension: 68, charm: 38 },
    equippedArts: { neigong: 'MA-081', qinggong: 'MA-097', move1: 'MA-062', move2: 'MA-091' },
    learnedArts: [
      { artId: 'MA-081', level: 7 },
      { artId: 'MA-097', level: 7 },
      { artId: 'MA-062', level: 7 },
      { artId: 'MA-091', level: 7 },
    ],
  })
}

export const SHAOLIN_Q34_SCENES: Record<string, StorySceneDef> = {
  scene_slq34_01: {
    id: 'scene_slq34_01',
    title: '第一幕 · 霜钟骤鸣',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山连日寒雾弥漫，山松挂霜。清晨寅时未过，大雄宝殿外忽传三声急促凄厉的铜钟哀鸣——那是少林寺唯有「玄」字辈高僧圆寂或遇难才会撞响的丧钟！'),
      N('你心头剧震，疾步赶入大雄正殿。只见殿内香烟凝滞，【玄慈】方丈手持一封沾血的洛阳急笺，指节发白；【玄难】、【玄寂】、【玄痛】等诸院首座皆面色铁青，肃立两旁。'),
      S('NPC-0112', '（双目微闭，声音沉痛沙哑，几乎是从喉间挤出）“阿弥陀佛……玄悲师弟……昨夜在洛阳【白马寺】遇害身亡了。”'),
    ],
    onFinishEffects: [openScene('scene_slq34_02', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_02: {
    id: 'scene_slq34_02',
    title: '第二幕 · 释源噩耗',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（骇然失色，上前一步）“什么？！玄悲师叔武功已臻一流中品，一手『大韦陀杵』在江湖上鲜有敌手，此番奉命赴洛阳白马寺商议西京佛会，怎会在释源祖庭之内遭人杀害？！”'),
      S('NPC-0127', '（须发皆张，拳头捏得咯咯作响）“最骇人听闻的还不是遇害本身！白马寺知客僧急信所言，玄悲师弟临终并无外伤刀剑之痕，乃是被一记威猛无匹的掌杵劲力击碎心脉而死——那劲路，竟酷似我少林七十二绝技中的『大韦陀杵』！”'),
      S('NPC-0156', '（冷哼一声，面沉如水）“用玄悲师弟最拿手的『大韦陀杵』杀了他自己！天底下除了少林寺内鬼，便只有江湖上传得沸沸扬扬的『以彼之道、还施彼身』——姑苏慕容氏！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_03', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_03: {
    id: 'scene_slq34_03',
    title: '第三幕 · 奉命西行',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（缓缓睁眼，目光如古井幽深，落在你身上）“玄痛师弟不可妄断。近来江湖暗流汹涌，三十年前的旧事仿佛一夜之间全数翻涌而出。老衲须坐镇嵩山，以防宵小调虎离山。”'),
      S('NPC-0112', '“你在少林潜修二十载，经义通透、武功已入宗师之境，且心思缜密不盲从流言。老衲命你即刻星夜赶赴【洛阳府 · 白马寺】，亲手查验玄悲师弟遗体与现场，务必查明那『大韦陀杵』究竟是何人所发！”'),
      P('（合十躬身，神色凝重）“弟子遵命！定不负方丈重托，即刻启程赶赴洛阳白马寺！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_04', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_04: {
    id: 'scene_slq34_04',
    title: '第四幕 · 疾驰西京',
    subtitle: '嵩洛官道 · 寒风猎猎',
    mandatory: true,
    beats: [
      N('你告别玄慈方丈，自少室山门纵马疾驰，沿着嵩洛古道一路向西。沿途秋风卷叶，似有无数无形眼线隐于茶肆古道之间。你隐隐感到，玄悲师叔之死绝非孤案，而是一场席卷整个北宋武林风暴的开端。'),
    ],
    choices: [
      {
        id: 'slq34_accept_quest',
        label: '星夜兼程，驰赴【洛阳府 · 白马寺 · 白马大佛宝殿】查验遗体',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q34_QUEST_ID, stepId: 'luoyang_xuanbei' },
          setStep(SHAOLIN_Q34_QUEST_ID, 'luoyang_xuanbei'),
          toast('已开启《大智大悲 · 身死之谜》！请速赴【洛阳府 · 白马寺 · 白马大佛宝殿】！', 'talk', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_05: {
    id: 'scene_slq34_05',
    title: '第五幕 · 白马惨象',
    subtitle: '洛阳府 · 白马寺 · 白马大佛宝殿',
    illustrationUrl: '/assets/quests/sl_34_xuanbei_death.jpg',
    illustrationCaption: '洛阳白马寺大佛宝殿 · 玄悲大师惨死于本门「大韦陀杵」反噬之下，殿柱裂纹犹存',
    mandatory: true,
    beats: [
      N('洛阳白马寺香火素来鼎盛，此刻却门户紧闭、一片肃杀。你步入白马大佛宝殿，只见正中白布之下停放着【玄悲】大师遗体，殿柱朱漆剥落三尺，一道深逾寸许的杵掌裂痕赫然贯入楠木柱心！'),
      S(SPEAKER_BAIMA_ABBOT, '（面色惨白，颤声合十）“阿弥陀佛……嵩山来的大师终于到了！昨夜三更，大殿内忽传一声佛门狮吼与惊天闷响，小僧等人提灯冲进来时，玄悲大师已倒在血泊中气绝身亡，凶手连半个脚印也未留下！”'),
      N('你缓步上前掀开白布，只见玄悲大师双目圆睁、面含惊骇与不可置信之色，胸口僧袍焦裂，赫然印着一道凝而不散的金刚掌杵重痕。'),
    ],
    onFinishEffects: [openScene('scene_slq34_06', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_06: {
    id: 'scene_slq34_06',
    title: '第六幕 · 北乔峰至',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      N('正当你俯身以佛门内息探查玄悲大师经脉残留劲气之际，殿外忽闻一阵沉稳雄迈的脚步声。一道身材魁伟、浓眉大眼、肩披粗布灰袍的豪杰大步跨入殿门——竟是威震天下的【乔峰】！'),
      S('NPC-0110', '（拱手一礼，虎目凝重地望向白布下的玄悲遗体）“这位少林大师请了！在下乔峰，近来江湖流言纷起，竟有人诬指乔某在江南与中原接连残害武林名宿。乔某一路循迹追查真凶，听闻少林玄悲大师在白马寺遭害，特赶来一探究竟！”'),
      P('（凝视乔峰双目，见其坦荡磊落、气度如山，遂合十还礼）“原来是乔帮主。贫僧{ifFlag:sl_branch==layman|虽是少林俗家护法，亦深知|奉玄慈方丈之命前来查验，深知}乔帮主光明磊落，绝非暗箭伤人之辈。既同为追查真凶而来，不如共验玄悲师叔伤痕！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_07', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_07: {
    id: 'scene_slq34_07',
    title: '第七幕 · 借力反噬',
    subtitle: '白马大佛宝殿 · 遗体勘验',
    mandatory: true,
    beats: [
      N('你与乔峰一左一右俯身细验。你以深厚经义与少林内功顺着玄悲大师膻中穴一寸寸回溯残留真气，越察越觉心惊。'),
      P('（眉头紧锁，沉声道）“乔帮主请看！玄悲师叔胸骨虽碎于『大韦陀杵』，但经脉之中却有两股劲力相撞——一股是玄悲师叔自身倾力击出的纯阳佛门杵劲，另一股却阴柔圆转如漩涡斗转，竟将师叔十成力道尽数折返，倒灌回他自己心脉！”'),
      S('NPC-0110', '（虎目精光暴射，沉声喝道）“好精准的眼力！不错！那凶手并非真的练成了少林『大韦陀杵』，而是以一门极高明的借力打力神功，在电光石火间把玄悲大师的绝技原封不动还给了他自己！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_08', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_08: {
    id: 'scene_slq34_08',
    title: '第八幕 · 疑云指向',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      S('NPC-0110', '（缓缓起身，望向殿外秋雨将至的铅灰天幕）“以彼之道，还施彼身……天下间能将借力打力之术练到此等化境的，除了姑苏燕子坞慕容氏，还有何人？可奇怪的是，慕容复年纪轻轻，内力未必能接下玄悲大师十成『大韦陀杵』而不损分毫……”'),
      P('（心中忽闪过一道寒光）“难道……慕容氏背后还有一位隐世三十年的绝顶老辈？或者，凶手不止一人？”'),
      N('二人正欲深究，殿外忽然传来一阵急促的马蹄撕裂青石之声！一名浑身尘土、肩头染血的少林武僧连滚带爬撞入殿中！'),
    ],
    onFinishEffects: [openScene('scene_slq34_09', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_09: {
    id: 'scene_slq34_09',
    title: '第九幕 · 嵩山急羽',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      S(SPEAKER_COURIER_MONK, '（扑倒在地，泣血嘶喊）“师兄！不好了！嵩山出大事了！昨夜三更，一名黑衣蒙面绝顶强敌夜闯【十八铜人罗汉堂】，与玄苦师伯对了一掌——玄苦师伯心脉尽碎，此刻已是气若游丝、危在旦夕！”'),
      S('NPC-0110', '（闻言如遭雷击，脸色骤然大变，双拳猛然攥紧）“什么？！玄苦大师……是我乔峰的授业恩师！谁敢夜闯少林罗汉堂暗算恩师？！”'),
      P('（心头巨震，瞬间悟透歹徒毒计）“不好！洛阳白马寺杀玄悲是调虎离山，真正杀机已直指嵩山少林！乔帮主，立刻随我星夜驰返少林罗汉堂，或许还能见玄苦师叔最后一面！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_10', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_10: {
    id: 'scene_slq34_10',
    title: '第十幕 · 双骑回岳',
    subtitle: '洛嵩古道 · 星夜兼程',
    mandatory: true,
    beats: [
      N('你嘱咐白马寺妥善护送玄悲大师法体归山，当即与乔峰各乘一匹快马，鞭影翻飞，不眠不休直奔嵩山少室峰！一路风声如哭，乔峰眉宇间杀气与悲痛交织，马蹄踏碎漫道秋霜。'),
    ],
    choices: [
      {
        id: 'slq34_rush_luohan',
        label: '与乔峰星夜驰返【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿】',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q34_QUEST_ID, 'shaolin_xuanku'),
          toast('玄苦大师在罗汉堂危在旦夕！速返【十八铜人罗汉堂 · 罗汉堂演武正殿】！', 'warn', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_11: {
    id: 'scene_slq34_11',
    title: '第十一幕 · 血染罗汉',
    subtitle: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('甫一踏入罗汉堂演武正殿，浓重的药气与血腥味扑面而来。殿内青砖龟裂丈余，【玄生】药王院主正拼尽内力为榻上的【玄苦】大师续命，而【玄难】与【玄寂】则满面悲怆地守在一旁。'),
      S('NPC-0110', '（大步冲至榻前，轰然双膝跪地，虎目含泪）“恩师！弟子乔峰来迟了！究竟是哪路奸贼胆敢在少林寺内伤您？！”'),
      S('NPC-0158', '（摇头长叹，收回按在玄苦背心的双掌，声带哽咽）“阿弥陀佛……来人掌力刚猛霸道至极，震碎了玄苦师兄五脏六腑，纵有大还丹亦回天乏术……他硬撑着最后一口真气，便是为了等乔施主一面。”'),
    ],
    onFinishEffects: [openScene('scene_slq34_12', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_12: {
    id: 'scene_slq34_12',
    title: '第十二幕 · 恩师遗言',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0126', '（缓缓睁开浑浊的双目，枯瘦的手指艰难地抓住乔峰宽厚的手腕，嘴角溢出一缕黑血）“峰……峰儿……你终于来了……师父……等到了……”'),
      S('NPC-0110', '（紧握恩师渐冷的手掌，铁汉泪落如雨）“恩师！您千万别说话，留着气力！是谁伤了您？便是追到天涯海角，乔峰也要将那贼人碎尸万段！”'),
      S('NPC-0126', '（微弱摇头，眼中闪过一丝深沉的忧虑与悲悯）“不是……不是中原武林的掌法……那黑衣人一掌劈来，如草原狂风、如铁骑踏雪，老衲竟……竟连半招也接不住……峰儿，你的身世……三十年前雁门关外……”'),
    ],
    onFinishEffects: [openScene('scene_slq34_13', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_13: {
    id: 'scene_slq34_13',
    title: '第十三幕 · 大悲示寂',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0126', '（望向你，眸中透出最后一点清光）“{gender:师侄|女施主}……玄悲与老衲先后遭难……绝非巧合……护好少林……莫让……莫让乔峰背负弑师之冤……”'),
      N('话音未落，玄苦大师嘴角泛起一丝解脱般的淡笑，抓着乔峰手腕的五指缓缓松开，垂落榻侧。一代少林降魔尊者，就此溘然圆寂！'),
      S('NPC-0110', '（仰天长啸一声，悲恸欲绝，震得罗汉堂梁尘簌簌而落）“恩师——！！！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_14', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_14: {
    id: 'scene_slq34_14',
    title: '第十四幕 · 双僧归寂',
    subtitle: '罗汉堂演武正殿',
    illustrationUrl: '/assets/quests/sl_34_xuanku_farewell.jpg',
    illustrationCaption: '嵩山罗汉堂 · 玄苦大师弥留嘱托后溘然圆寂，乔峰跪榻悲恸，堂外寒鸦惊飞',
    mandatory: true,
    beats: [
      N('一日之间，洛阳白马寺折损「大韦陀僧」玄悲，嵩山罗汉堂再失「降魔尊者」玄苦！全寺僧众齐声诵念往生咒，悲声震彻少室云海。'),
      N('你强忍眼中酸涩，合十向玄苦大师法体三拜，心中已牢牢记住他临终前的每一句嘱托。'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0157', 'NPC-0126'] },
      openScene('scene_slq34_15', SHAOLIN_Q34_QUEST_ID),
    ],
  },

  scene_slq34_15: {
    id: 'scene_slq34_15',
    title: '第十五幕 · 暗影嫁祸',
    subtitle: '罗汉堂外 · 东庑碑帖武库院方向',
    mandatory: true,
    beats: [
      N('就在罗汉堂内众人沉浸于悲恸之际，东庑碑帖武库院方向忽传一声凄厉的巡山武僧惨呼，紧接着数道幽寒破空声直袭而来，几枚沾血的丐帮竹节暗器竟「叮叮当当」钉在了罗汉堂门柱之上！'),
      S('NPC-0127', '（脸色骤变，厉声喝道）“有人趁乱潜入东庑武库偷袭守僧，还故意留下丐帮暗器嫁祸乔施主！”'),
      P('（霍然起身，目光如电）“好歹毒的连环计！先杀玄悲、玄苦，再趁乔帮主跪别恩师之际于东庑杀僧栽赃，坐实『乔峰弑师叛义』的恶名！乔帮主，跟我去东庑碑帖武库院截住这帮暗影死士！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_16', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_16: {
    id: 'scene_slq34_16',
    title: '第十六幕 · 疾赴东庑',
    subtitle: '罗汉堂廊道',
    mandatory: true,
    beats: [
      S('NPC-0110', '（拭去眼角泪痕，周身骤然爆发排山倒海般的降龙豪气）“敢借我恩师之死往乔某身上泼脏水，真当乔某双掌无锋么！走，去东庑武库揪出这群藏头露尾的鼠辈！”'),
    ],
    choices: [
      {
        id: 'slq34_go_ambush',
        label: '与乔峰疾赴【罗汉堂 · 东庑碑帖武库院】截杀暗影死士',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q34_QUEST_ID, 'shadow_ambush'),
          toast('暗影死士潜入东庑企图灭口嫁祸！速赴【东庑碑帖武库院】与乔峰联手迎敌！', 'warn', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_17: {
    id: 'scene_slq34_17',
    title: '第十七幕 · 武库伏兵',
    subtitle: '十八铜人罗汉堂 · 东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('踏入东庑碑帖武库院，只见两座青石碑林之间黑雾弥漫，数名蒙面黑衣死士正欲放火焚烧罗汉堂历年武学勘验记录！为首一人身形瘦长、双袖如燕翼翻飞，周身竟散发着宗师下品级别的阴森气场！'),
      S(SPEAKER_SHADOW_LEAD, '（见你与乔峰杀到，冷笑一声）“来得正好！既已撞破我等行藏，今日便叫少林高徒与北乔峰一同葬身东庑火海——明日江湖上便只会流传『乔峰大闹少林、弑师灭口』的佳话！”'),
      P('（横步拦在碑林之前，内息滚滚如雷）“痴心妄想！乔帮主，左翼交给我，右翼劳你相助，今日便拿这群死士祭奠玄悲、玄苦两位师叔！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_18', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_18: {
    id: 'scene_slq34_18',
    title: '第十八幕 · 双雄破影',
    subtitle: '东庑碑帖武库院（与乔峰并肩 2v2 实战）',
    mandatory: true,
    beats: [
      N('燕漠残锋袖中寒芒暴涨，竟隐隐带着姑苏慕容氏的斗转星移借力身法；其副手玄影断魂客则挥刀猛劈，招招狠辣直取要害！你与乔峰背靠背迎敌，展开一场惊天动地的宗师级血战！'),
    ],
    choices: [
      {
        id: 'slq34_fight_shadows',
        label: '与乔峰并肩迎战【燕漠残锋】与【玄影断魂客】！（宗师下品 2v2）',
        subLabel: '击溃灭口嫁祸的神秘暗影死士，保住武库证物',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q34_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShadowLeadBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildShadowBladeAide() }],
            allies: [{ kind: 'npc', npcId: 'NPC-0110' }],
            rule: 'story_trial',
            forbidEscapeReason: '玄苦师叔尸骨未寒，绝不可放任灭口死士逃遁！',
            introText: '【东庑破影】与北乔峰并肩迎战神秘暗影死士首领【燕漠残锋】与【玄影断魂客】！',
            onWin: [openScene('scene_slq34_19', SHAOLIN_Q34_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('暗影死士招式诡谲阴狠，暂借碑林掩护与乔峰重整阵脚再战！', 'warn', '东庑破影'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq34_19: {
    id: 'scene_slq34_19',
    title: '第十九幕 · 死士服毒',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      N('苦战二十余合，乔峰一记「亢龙有悔」掌风如海啸狂飙，正面轰碎玄影断魂客钢刀；你则看准燕漠残锋借力换气的刹那破绽，以浑厚少林绝学震断其护体真气，将他死死制于青石碑前！'),
      S(SPEAKER_SHADOW_LEAD, '（嘴角溢血，却发出凄厉狂笑）“哈哈哈哈……晚了！少林的千年遮羞布很快就要被天下群雄亲手扯下来了……主上大计，岂是你们挡得住的！”'),
      N('话音未落，燕漠残锋猛然咬碎齿间毒囊，七窍渗黑气绝而亡！你伸手探入其怀中，只摸出一枚刻着半朵残燕纹路的玄铁腰牌，以及几张绘有少林藏经阁暗道的旧图。'),
    ],
    onFinishEffects: [openScene('scene_slq34_20', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_20: {
    id: 'scene_slq34_20',
    title: '第二十幕 · 移灵正殿',
    subtitle: '东庑碑帖武库院',
    mandatory: true,
    beats: [
      S('NPC-0110', '（盯着那枚半燕玄铁腰牌，眉峰紧锁）“半燕纹牌……果然与姑苏慕容脱不了干系！可玄苦恩师胸口那一掌，却又分明不是慕容家的武功……这究竟是怎么回事？”'),
      P('（收起腰牌，沉声道）“白马寺的玄悲师叔法体今夜亦已护送回山，与玄苦师叔一同停灵于大雄正殿。走，我们去【大雄正殿 · 佛前蒲团】，请玄慈方丈点亮长明烛火，将两位师叔的致命伤痕并置细验，真相必现！”'),
    ],
    choices: [
      {
        id: 'slq34_go_forensics',
        label: '携证物前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】烛下验伤',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q34_QUEST_ID, 'candle_forensics'),
          toast('暗影死士已溃！请前往【大雄正殿 · 佛前蒲团】与乔峰、玄慈同验二僧遗伤！', 'success', '大智大悲'),
        ],
      },
    ],
  },

  scene_slq34_21: {
    id: 'scene_slq34_21',
    title: '第二十一幕 · 孤烛双灵',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('子夜时分，大雄正殿大门紧闭，唯余两排红烛摇曳，将佛像巨影拉得长长地投在青砖之上。玄悲与玄苦两位高僧法体并停于白莲幡下，【玄慈】方丈、【玄难】首座与【乔峰】静立烛畔。'),
      S('NPC-0112', '（接过你呈上的半燕玄铁腰牌，目光微颤）“竟有死士公然潜入东庑欲栽赃乔施主……若非你们二人及时截杀，明日江湖流言必将令少林与乔施主水火不容。”'),
      P('（俯身举起一盏高烛，缓缓移过玄悲与玄苦两位师叔胸前伤痕）“方丈、乔帮主，请细看这两道致命掌印——我方才细察之下，竟发现这两桩血案背后，藏着两股截然不同的绝顶掌力！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_22', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_22: {
    id: 'scene_slq34_22',
    title: '第二十二幕 · 以彼之道',
    subtitle: '大雄正殿 · 烛下勘验',
    mandatory: true,
    beats: [
      P('（指着玄悲大师胸前焦裂处，声音沉静如铁）“其一，玄悲师叔死于白马寺，创口呈旋涡内收之象，筋骨断裂处尽是少林『大韦陀杵』的纯阳反弹劲。凶手精研借力打力之术，且深谙少林七十二绝技破绽——此乃姑苏慕容氏『以彼之道、还施彼身』无疑！”'),
      S('NPC-0127', '（倒吸一口凉气）“不错！再加上东庑死士怀中的半燕玄铁腰牌，杀害玄悲师弟的必是慕容氏那位隐伏数十年的绝世高手！”'),
      P('（话锋陡然一转，将烛火移向玄苦大师胸口）“然而玄苦师叔之伤，却与玄悲师叔截然相反！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_23', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_23: {
    id: 'scene_slq34_23',
    title: '第二十三幕 · 双掌辨影',
    subtitle: '大雄正殿 · 烛影辨掌',
    illustrationUrl: '/assets/quests/sl_34_two_palms.jpg',
    illustrationCaption: '大雄正殿孤烛之下 · 与乔峰同辨两股截然不同的三十年暗影掌力：慕容斗转与契丹巨掌',
    mandatory: true,
    beats: [
      P('（以笔录拓下两道掌印纹理，娓娓道来）“玄苦师叔胸前掌印宽大逾常人寸许，劲力一往无前、刚猛霸烈如塞外狂风铁骑，毫无半分借力转圜之巧，反倒与乔帮主所修的刚猛掌路隐隐相近，却更添一股浸透骨髓的三十载仇恨死气！”'),
      S('NPC-0110', '（盯着拓纸上那枚宽大刚猛的巨掌印，浑身如遭电流窜过，喃喃自语）“宽大逾常人……塞外契丹铁骑般的刚猛掌力……玄苦恩师临终前说『三十年前雁门关外』……难道暗算恩师的，竟是一位潜伏在少林暗处三十年的契丹绝世高手？！”'),
      S('NPC-0112', '（听见「三十年前雁门关外」七字，手中佛珠陡然一顿，险些崩断，苍老的面容瞬间苍白如纸）“三十年前……雁门关……阿弥陀佛，该来的劫数，终究还是来了……”'),
    ],
    onFinishEffects: [openScene('scene_slq34_24', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_24: {
    id: 'scene_slq34_24',
    title: '第二十四幕 · 山雨欲来',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('你敏锐地察觉到玄慈方丈神色间的剧烈波动，却知此刻并非逼问方丈陈年隐秘之时。殿外忽起一阵狂风，吹得殿门吱呀作响，仿佛天下群雄的脚步声已近在少室山脚。'),
      S('NPC-0110', '（深深向你抱拳一揖，眼中满是敬重与托付）“{gender:师兄|女侠}今日与乔某并肩破敌、又于烛下辨明双掌真相，还了乔某清白，更替玄苦恩师点明了真凶线索。此恩乔峰铭记五内！只是这两股暗影既潜伏少林三十年，必将在不久后掀起惊天巨浪——届时少室山若有大难，乔峰定当赴约而来！”'),
      P('（郑重还礼）“乔帮主保重！这两股暗影一日不除，少林与中原武林便一日难安。我亦会守在嵩山，静候风浪到来！”'),
    ],
    onFinishEffects: [openScene('scene_slq34_25', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_25: {
    id: 'scene_slq34_25',
    title: '第二十五幕 · 墨录遗案',
    subtitle: '大雄正殿 · 烛影将残',
    mandatory: true,
    beats: [
      N('送别乔峰后，你重返佛前，提笔将白马寺与罗汉堂两道致命掌力的劲路、拓痕与经脉验伤细目工整录成一卷《双僧验伤秘录》，封存入大雄宝殿密档。'),
      S('NPC-0112', '（望着你笔走龙蛇的蝇头小楷，长叹一声）“难为你了。玄悲、玄苦两位师弟一生护持佛法，却死于三十年前那桩无明业火之手。近日江湖各派已有不少英雄帖飞向少室山，看来一场前所未有的武林大劫，已在眼前……”'),
    ],
    onFinishEffects: [openScene('scene_slq34_26', SHAOLIN_Q34_QUEST_ID)],
  },

  scene_slq34_26: {
    id: 'scene_slq34_26',
    title: '第二十六幕 · 暗影既明',
    subtitle: '大雄正殿 · 黎明微光',
    mandatory: true,
    beats: [
      P('（合上《双僧验伤秘录》，抬眼望向殿外渐白的天色，目光沉毅如山）“无论是姑苏慕容的以彼之道，还是蛰伏三十年的契丹巨掌，既已露出破绽，便休想在少室山翻天覆地。两位师叔在天之灵，请看弟子护住这千年祖庭！”'),
    ],
    choices: [
      {
        id: 'slq34_finish_reward',
        label: '封存《双僧验伤秘录》，静候少室山风云际会（完成）',
        tone: 'gold',
        effects: [
          {
            type: 'giveCombatExp',
            amount: 1050,
            reason: '勘破玄悲、玄苦二僧身死之谜并击退灭口暗影死士',
          },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'modifyNpcFavor',
            target: { kind: 'npc', npcId: 'NPC-0110' },
            delta: 25,
          },
          { type: 'completeQuest', questId: SHAOLIN_Q34_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《大智大悲 · 身死之谜》！武学经验 +1050、门派贡献 +300、书 +1、经义 +1、乔峰好感 +25！',
            'success',
            '大智大悲',
          ),
        ],
      },
    ],
  },
}
