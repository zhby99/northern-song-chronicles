import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q12_QUEST_ID } from './shaolinDamoXuanchengQuest'

const SPEAKER_MURONG_SCOUT_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '姑苏暗探 · 柳青',
  title: '慕容氏夜行死士',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_MURONG_SCOUT_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '姑苏暗探 · 燕回',
  title: '慕容氏夜行死士',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_YAN_YINGKE: StorySpeakerSpec = {
  kind: 'custom',
  name: '燕影客',
  title: '姑苏慕容暗探首',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildMurongScoutA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ12_SCOUT_A',
    name: '姑苏暗探 · 柳青',
    title: '慕容氏夜行死士',
    realm: '二流中品',
    factionName: '姑苏慕容氏',
    sectRank: 2,
    sectRankLabel: '慕容暗探',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“少林小僧坏我大事，留你不得！看慕容剑法！”',
    stats: { hp: 1420, mp: 880, agi: 55, res: 33 },
    talents: { bone: 68, comprehension: 70, charm: 56 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-130', move2: 'MA-148' },
    learnedArts: [{ artId: 'MA-121', level: 6 }, { artId: 'MA-130', level: 5 }, { artId: 'MA-148', level: 5 }],
  })
}

function buildMurongScoutB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ12_SCOUT_B',
    name: '姑苏暗探 · 燕回',
    title: '慕容氏夜行死士',
    realm: '二流中品',
    factionName: '姑苏慕容氏',
    sectRank: 2,
    sectRankLabel: '慕容暗探',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“柳兄拖住他正面，我去寒玉榻上取玄澄那卷手札！”',
    stats: { hp: 1380, mp: 860, agi: 57, res: 32 },
    talents: { bone: 66, comprehension: 72, charm: 54 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-130', move2: 'MA-155' },
    learnedArts: [{ artId: 'MA-121', level: 6 }, { artId: 'MA-130', level: 5 }, { artId: 'MA-155', level: 5 }],
  })
}

function buildYanYingkeBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ12_YAN_YINGKE',
    name: '燕影客',
    title: '姑苏慕容暗探首',
    realm: '一流下品',
    factionName: '姑苏慕容氏',
    sectRank: 3,
    sectRankLabel: '慕容暗探首',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“能在我姑苏慕容氏的『以彼之道、还施彼身』下撑过十招，这小和尚倒真有几分玄澄当年的影子——可惜今夜你必须死在这里！”',
    stats: { hp: 2420, mp: 1680, agi: 72, res: 49 },
    talents: { bone: 84, comprehension: 88, charm: 74 },
    equippedArts: { neigong: 'MA-221', move1: 'MA-071', move2: 'MA-025' },
    learnedArts: [{ artId: 'MA-221', level: 8 }, { artId: 'MA-071', level: 8 }, { artId: 'MA-025', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq12_01: {
    id: 'scene_slq12_01',
    title: '第一幕 · 幽谷石门',
    subtitle: '达摩院 · 幽谷石室入口',
    mandatory: true,
    beats: [
      N('{reignYear}冬雪初降，嵩山幽谷寒意彻骨。你在少林寺潜修已满五载，今日奉玄慈方丈与玄难首座密谕，首度获准踏入达摩院最隐秘的禁地——幽谷石室。'),
      N('穿过一条仅容两人并行的幽深石道，前方豁然开朗。洞顶垂落数盏长明青油灯，石室中央竟陈设着一张散发淡淡白雾的千年寒玉榻。'),
      S('NPC-0127', '（玄难首座停步轻叹，神色前所未有的肃穆）“阿弥陀佛。此处便是玄澄师兄静养之所。全寺之中，除方丈、老衲与少数玄字辈长老外，从不许外人踏入半步。今日带你前来，乃方丈与老衲共同决意。”'),
      P('（心中微微一震，合十低声道）“玄澄师伯……便是寺中传闻两百年来武学天资第一、一人连成十三门绝技的少林神僧？”'),
    ],
    onFinishEffects: [openScene('scene_slq12_02', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_02: {
    id: 'scene_slq12_02',
    title: '第二幕 · 榻上神僧',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('走近寒玉榻，只见榻上盘坐着一名须发皆白、枯瘦如槁木的老僧。他周身经脉寸断、双腿与右臂皆已瘫痪不能动弹，唯有一双深邃澄明的眸子，宛如寒潭秋水，静静映出洞中灯火。'),
      S('NPC-0127', '（躬身行礼）“玄澄师兄，这便是老衲常向你提起的那名达摩院弟子。他已修成《伏魔剑》《散花掌》《拈花指》，经义书法皆已纯熟，方丈特命他来此侍奉师兄、抄录禅卷。”'),
      S('NPC-0109', '（玄澄声音极轻，却字字清越如玉磐敲击）“阿弥陀佛……难为玄慈师兄与玄难师弟费心。孩子，且近前来，让老衲瞧瞧你眉宇间可有戾气。”'),
      P('（恭敬趋前，于寒玉榻三步外合十跪拜）“弟子拜见玄澄师伯！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_03', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_03: {
    id: 'scene_slq12_03',
    title: '第三幕 · 寒玉问禅',
    subtitle: '幽谷石室 · 寒玉榻',
    illustrationUrl: '/assets/quests/sl_12_cold_jade_bed.jpg',
    illustrationCaption: '寒玉问禅 · 幽谷石室长明灯下，瘫痪神僧玄澄剖白七十二障秘辛',
    mandatory: true,
    beats: [
      N('玄澄静静凝视你半晌，枯槁的嘴角终于露出一丝欣慰笑意，示意玄难先回大雄宝殿处理寺务，独留你在榻畔研磨铺纸。'),
      S('NPC-0109', '“世人皆惜老衲一夜筋脉俱废、沦为废人，却不知老衲躺在这寒玉榻上十余载，才真正参透了少林七十二绝技最大的忌讳——『武学障』。”'),
      P('（屏息凝神，提笔待录）“敢问师伯，何谓『武学障』？”'),
      S('NPC-0109', '“少林七十二绝技，每一门皆是历代祖师呕心沥血所创，杀伐威力极重。每多练一门，心中便多添一分刚猛暴戾之气。昔年老衲恃才傲物，三十年间一口气强练十三门绝技，却轻忽了诵经修禅、未以大慈大悲佛法去化解招中戾气……”'),
    ],
    onFinishEffects: [openScene('scene_slq12_04', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_04: {
    id: 'scene_slq12_04',
    title: '第四幕 · 十三绝技反噬',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '（闭目长叹，声音中透出彻骨的苍凉与警醒）“那一夜，十三股互不相容的绝技真气同时在膻中、百会冲撞炸裂！老衲空有一身惊世骇俗的武功，却连自身戾气都压不住，一夜之间筋脉寸断，若非寒玉榻护住心脉，早已化作枯骨。”'),
      P('（听得脊背发凉，心神震撼莫名）“原来说到底，武功越是高深，越需要慈悲佛法来化其锋芒……难怪玄慈方丈当日授我《拈花指》时，特意叮嘱切莫重蹈覆辙！”'),
      S('NPC-0109', '“正是！佛法渡人，亦渡己身。你若贪求绝技数量而弃禅心，练得越多，反噬越烈；唯有以《法华经》《金刚经》常涤心尘，方能将七十二绝技融于慈悲一念，永无武学之障。”'),
    ],
    onFinishEffects: [openScene('scene_slq12_05', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_05: {
    id: 'scene_slq12_05',
    title: '第五幕 · 手札托付',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('玄澄以微不可察的眼神示意榻畔一只黑漆木匣。你轻轻开启，只见里面静静躺着一册以蝇头小楷密密麻麻写就的《十三绝技武学障手札》，墨迹沉雄却透着一股大彻大悟的平和。'),
      S('NPC-0109', '“这是老衲口述、玄难师弟代笔录下的十三门绝技运劲破绽与化障心法。今夜你便在此替我补誊末卷《妙法莲华经》解义，顺道细细研读此卷。”'),
      P('（双手小心捧起手札，只觉重逾千钧）“弟子定当用心抄录体悟，并寸步不离守候师伯！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_06', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_06: {
    id: 'scene_slq12_06',
    title: '第六幕 · 秉烛抄经',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('暮色渐沉，洞外风雪渐急。你于石案前秉烛研墨，一笔一画替玄澄誊录禅经，同时将手札中关于「以禅化戾、刚柔互济」的心得与自己所修《伏魔剑》《散花掌》《拈花指》逐一印证。'),
      N('每落一笔，你便觉丹田内息愈发澄澈圆融，往日隐隐浮躁的一丝锐气竟悄然消融，化作绵长深厚的禅定真力！'),
    ],
    onFinishEffects: [openScene('scene_slq12_07', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_07: {
    id: 'scene_slq12_07',
    title: '第七幕 · 三更风异',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('转眼已是三更时分。寒玉榻上玄澄已沉沉入睡，呼吸微弱绵长。洞中唯余灯花偶爆的「噼啪」轻响。'),
      N('忽然，你握笔的右手微微一顿——洞口寒风吹入的节奏，竟比方才短促了半分！风中更夹杂着一丝极淡、却绝不属于嵩山松雪的江南沉水冷香！'),
      P('（心头警兆骤生，悄然放下狼毫，反手护住案头黑漆木匣，目光如电射向幽暗石道）“有人潜入达摩院禁地了！”'),
    ],
    choices: [
      {
        id: 'slq12_stand_guard',
        label: '悄然熄去外侧油灯，守住寒玉榻前暗查来敌！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q12_QUEST_ID, stepId: 'guard_cold_jade_cave' },
          setStep(SHAOLIN_Q12_QUEST_ID, 'guard_cold_jade_cave'),
          toast('已开启《寒玉问禅 · 七十二障》！三更异动将至，请死守寒玉榻护卫玄澄师伯！', 'talk', '寒玉问禅'),
        ],
      },
    ],
  },

  scene_slq12_08: {
    id: 'scene_slq12_08',
    title: '第八幕 · 烟袭狭洞',
    subtitle: '幽谷石室 · 三更时分',
    mandatory: true,
    beats: [
      N('“嗤——嗤——”两缕细不可闻的轻烟自石道拐角悄无声息飘入洞中，直奔案头与寒玉榻而来！'),
      N('你早有防备，袖袍一卷施展《散花掌》柔风，将两股迷香尽数逼回石道！紧接着两道身着夜行黑衣、蒙面持剑的矫健身影如狸猫般翻滚冲入石室！'),
      S(SPEAKER_MURONG_SCOUT_A, '（低喝一声，剑尖直指你咽喉）“不好，洞里竟还有护卫小僧！燕回，速战速决，拿到玄澄的十三绝技手札立刻撤离！”'),
      P('（横身死死挡在寒玉榻与黑漆木匣之前，沉声喝道）“何方鼠辈，竟敢深夜闯入少林达摩院禁地行窃！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_09', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_09: {
    id: 'scene_slq12_09',
    title: '第九幕 · 江南剑影',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('两名夜行黑衣人一左一右扑上，剑势轻灵飘逸、变幻莫测，赫然带着江南名门「姑苏慕容氏」的独门家传剑路！'),
      S(SPEAKER_MURONG_SCOUT_B, '（冷笑一声，左手扬出三枚寒星暗器直袭寒玉榻，意在逼你分神）“废话少说！不交出玄澄手札，连这瘫痪老秃驴一并送去见佛祖！”'),
      P('（怒目金刚，挥袖扫落暗器，凛然喝道）“卑鄙无耻！有小僧在此，休想越过寒玉榻前半步！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_10', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_10: {
    id: 'scene_slq12_10',
    title: '第十幕 · 双探截杀',
    subtitle: '幽谷石室实战（车轮连战 慕容暗探）',
    mandatory: true,
    beats: [
      N('幽谷石室空间狭小，柳青与燕回仗着身法诡谲、剑招凌厉，左右夹攻直逼寒玉榻！你须在寸步之地护住榻上玄澄，先行击溃这两名夜行死士！'),
    ],
    choices: [
      {
        id: 'slq12_fight_scouts',
        label: '寸步不退护卫寒玉榻，迎战姑苏双探！（车轮连战 实战）',
        subLabel: '两名二流中品姑苏慕容暗探联手突袭',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMurongScoutA() },
            extraOpponents: [{ kind: 'custom', npc: buildMurongScoutB() }],
            rule: 'story_trial',
            forbidEscapeReason: '玄澄师伯瘫痪榻上，绝不可退后半步！',
            introText: '【车轮连战 · 狭洞护师】迎战潜入石室的姑苏慕容暗探【柳青】与【燕回】！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q12_scouts_cleared', value: true },
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              openScene('scene_slq12_11', SHAOLIN_Q12_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('狭洞之内双剑夹攻凶险，重整禅息再护寒玉榻！', 'warn', '寒玉问禅'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq12_11: {
    id: 'scene_slq12_11',
    title: '第十一幕 · 破探惊变',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('狭洞之中拳剑交击声如爆豆！你以《散花掌》卸开柳青剑锋，反手一记《拈花指》凌空点中燕回腕脉，旋即借力将二人双双震飞撞在石壁上，吐血昏死过去！'),
      N('然而你刚要松一口气，头顶幽暗洞窟石梁之上，却忽传来一声低沉而冰冷的轻笑！'),
      S(SPEAKER_YAN_YINGKE, '“啪、啪、啪——好俊的少林《散花掌》与《拈花指》！难怪玄慈敢派你独守这幽谷石室。”'),
      N('一道修长如鬼魅的青灰身影自石梁飘然落下，足尖落地竟无半分声响！此人面覆寒铁半面具，周身散发着令人窒息的一流高手压迫感！'),
    ],
    onFinishEffects: [openScene('scene_slq12_12', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_12: {
    id: 'scene_slq12_12',
    title: '第十二幕 · 燕影现身',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      S('NPC-0109', '（寒玉榻上玄澄早已惊醒，双目如电盯着黑衣首领，声音沉缓）“阁下身法如燕掠寒潭、指间隐含参合剑气……莫非是江南姑苏慕容氏座下暗探首领？”'),
      S(SPEAKER_YAN_YINGKE, '（微微欠身，语调优雅却杀机四溢）“玄澄神僧果然好眼力。在下燕影客，奉主上之命遍搜天下武学秘录。少林七十二绝技举世无双，神僧既已身废不能再演武，何不将那卷《十三绝技武学障手札》赠予我姑苏还施水阁，也免得埋没尘埃？”'),
      P('（稳立榻前，体内真气鼓荡至巅峰，声音斩钉截铁）“少林绝学岂容宵小窃取！燕影客，想要手札，先踏过小僧尸身！”'),
      S(SPEAKER_YAN_YINGKE, '（面具下冷眸微眯，缓步逼近）“好骨气！可惜区区二流内门弟子，也敢螳臂当车？今日便让你尝尝『以彼之道，还施彼身』的滋味！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_13', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_13: {
    id: 'scene_slq12_13',
    title: '第十三幕 · 狭洞危局',
    subtitle: '幽谷石室 · 寒玉榻前',
    illustrationUrl: '/assets/quests/sl_12_cave_assassin.jpg',
    illustrationCaption: '狭洞死战 · 幽暗石室中独挡一流下品慕容暗探首燕影客，寸步不退',
    mandatory: true,
    beats: [
      N('话音未落，燕影客身形骤然化作三道虚影！他右手慕容家传长剑如灵蛇吐信，左手食指却悄然弹出凌厉无匹的「参合指」气，竟连少林《拈花指》的柔劲路数都能临场仿出七八分！'),
      N('一流下品高手的恐怖劲风瞬间充斥整座狭洞，吹得案头长明青灯明灭不定！'),
      S('NPC-0109', '（榻上玄澄忽以清越禅音点拨）“孩子莫慌！他虽善借力打力、仿人招式，却只得其形而无佛门慈悲禅心！守住本心，以伏魔之正、散花之圆、拈花之透三势合一，破他借力之隙！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_14', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_14: {
    id: 'scene_slq12_14',
    title: '第十四幕 · 三艺合一',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('玄澄一语如当头棒喝！你脑海中刹那闪过五年来在剑痕崖悟剑、洛水画舫散花、大雄正殿拈花、乃至方才秉烛问禅的全部历程！'),
      P('（心中再无半丝惧意与杂念，双目澄明如古佛拈花）“原来如此——招式可仿，禅心难偷！燕影客，接招吧！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_15', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_15: {
    id: 'scene_slq12_15',
    title: '第十五幕 · 死战燕影',
    subtitle: '幽谷石室终战（1v1 燕影客）',
    mandatory: true,
    beats: [
      N('一流下品强敌燕影客杀意毕露，慕容剑法与参合指气交织如网，在狭窄石室中步步绝杀！此乃晋升少林真传前的生死大考，唯有全力以赴方能护师破敌！'),
    ],
    choices: [
      {
        id: 'slq12_fight_yanyingke',
        label: '以达摩院所学禅武合一，死战姑苏慕容暗探首「燕影客」！（1v1 生死战）',
        subLabel: '一流下品强敌 · 护卫寒玉榻神僧玄澄与绝技手札',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYanYingkeBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '寒玉榻就在身后半步，死战护师，绝无退路！',
            introText: '【1v1 狭洞生死战】迎战姑苏慕容暗探首【燕影客】（一流下品）！',
            onWin: [openScene('scene_slq12_16', SHAOLIN_Q12_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('燕影客一流修为诡谲霸道！稳住禅心再思玄澄师伯点拨，重新迎战！', 'warn', '寒玉问禅'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq12_16: {
    id: 'scene_slq12_16',
    title: '第十六幕 · 破影还禅',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('狭洞之中劲气激荡、碎石簌簌坠落！激战五十余合，你左臂僧袍已被参合指气划破渗血，却始终牢牢钉在寒玉榻前，寸步未移！'),
      N('燕影客久战不下，恐惊动少林寺众长老，终于使出杀招「参合剑雨」，剑指齐发直取你心口，同时暗运慕容借力劲气，等着借你反击之力一举震碎你经脉！'),
      N('你却在生死刹那彻底明悟「无障无执」之境——不发刚猛死力，反以极柔极纯的禅定内息化作《散花掌》圆涡卸去剑锋，随即指尖轻吐《拈花指》透骨柔劲，直入其借力中枢！'),
    ],
    onFinishEffects: [openScene('scene_slq12_17', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_17: {
    id: 'scene_slq12_17',
    title: '第十七幕 · 暗探遁走',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('“哇——！”燕影客借力不成反遭柔和禅劲直透膻中，闷哼一声喷出一口鲜血，脸上寒铁面具竟被指风震裂半边，踉跄撞在石道洞壁之上！'),
      S(SPEAKER_YAN_YINGKE, '（骇然失色，死死盯着浑身浴尘却眼神澄净如初的你）“怎么可能……我明明算准了你的后劲，为何你招中竟无半点刚戾可借？！少林达摩院……竟又出了一个破障奇才！”'),
      N('此时洞外忽传来嵩山钟鼓齐鸣与数道凌厉破风声——显然少林巡夜武僧已被石室激战惊动！燕影客自知大势已去，咬牙掷出一枚烟雷，一把抓起昏迷的柳青与燕回，化作一缕黑烟仓皇遁入风雪深谷！'),
    ],
    onFinishEffects: [openScene('scene_slq12_18', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_18: {
    id: 'scene_slq12_18',
    title: '第十八幕 · 神僧含泪',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('硝烟散尽，你紧绷的心神方才一松，单膝微屈拄地调息，却第一时间回头望向寒玉榻，急声关切：'),
      P('“玄澄师伯，您安然无恙否？那《十三绝技武学障手札》也完好无损！”'),
      S('NPC-0109', '（寒玉榻上，这位十余年来心如枯井的少林神僧，此刻浑浊的老眼中竟缓缓滚落两行热泪，声音微颤却无比欣慰）“好孩子……老衲无恙。方才那一战，你以二流之躯独抗一流下品绝世刺客，更在绝境中真正化去了招中戾气，令慕容氏无力可借……”'),
      S('NPC-0109', '“老衲当年苦求三十年未破之『武学障』，今夜竟在你身上看到了破障明心的曙光！达摩院后继有人，少林有福啊！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_19', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_19: {
    id: 'scene_slq12_19',
    title: '第十九幕 · 黎明双至',
    subtitle: '幽谷石室 · 晨光破晓',
    mandatory: true,
    beats: [
      N('未过片刻，玄难首座与玄慈方丈亲率戒律院武僧疾步赶至幽谷石室！见洞中满地碎石剑痕、案头手札完好，而你左臂带伤却依旧肃立寒玉榻前，两位宗师无不动容。'),
      S('NPC-0127', '（上前为你点穴止血，查探过地上残留的剑痕与半片寒铁面具，沉声道）“竟是姑苏慕容氏一流下品暗探首亲自出手！幸得你死战不退，否则玄澄师兄与少林秘录不堪设想！”'),
      S('NPC-0112', '（玄慈方丈步至寒玉榻前，与玄澄交换了一个深沉的眼神）“玄澄师兄，你意下如何？”'),
    ],
    onFinishEffects: [openScene('scene_slq12_20', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_20: {
    id: 'scene_slq12_20',
    title: '第二十幕 · 联袂举荐',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '（玄澄神僧目光灼灼，朗声开口）“方丈师兄，此子入寺五载，禅经通明、书棋俱佳，既能文辩退番僧，更能于绝境死战一流强敌、护师守道而不染戾气。老衲愿以残躯之名，与玄难师弟联袂举荐——晋升此子为我嵩山少林寺【真传弟子】！”'),
      S('NPC-0127', '（玄难首座郑重合十）“老衲附议！达摩院一脉，当以此子为真传翘楚！”'),
      S('NPC-0112', '（玄慈方丈欣然颔首，声震石室）“善哉，善哉！玄澄、玄难二位师弟联袂举荐，老衲岂有不准之理？传法谕：自今日起，晋升尔为嵩山少林寺【Lv.3 真传弟子】，准入藏经阁深院参悟少林无上禅武！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_21', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_21: {
    id: 'scene_slq12_21',
    title: '第二十一幕 · 达摩真传',
    subtitle: '幽谷石室 · 寒玉榻',
    illustrationUrl: '/assets/quests/sl_12_damo_zhenchuan.jpg',
    illustrationCaption: '达摩真传 · 黎明幽谷石室中，玄慈宣谕晋升少林真传弟子，玄澄玄难欣慰颔首',
    mandatory: true,
    beats: [
      N('晨光透过幽谷崖隙斜照石室，正落在你带尘却笔挺的僧袍之上。玄慈方丈亲手为你颁授少林真传弟子紫金度牒，玄澄神僧亦命你将那卷《十三绝技武学障手札》的化障总纲铭记于心。'),
      P('（双手接过真传度牒，面向玄慈、玄难、玄澄三位高僧郑重叩首）“弟子定当永记『武学障』之戒，以慈悲佛法统御少林绝学，护持禅宗千年道统，绝不负三位师长厚望！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_22', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_22: {
    id: 'scene_slq12_22',
    title: '第二十二幕 · 破障新途',
    subtitle: '达摩院 · 嵩山晴雪',
    mandatory: true,
    beats: [
      N('步出幽谷石室时，嵩山一夜风雪已歇，万峰银装素裹，朝阳正自少室峰东麓喷薄而出。'),
      N('自初入山门杂役，至外门木桩大考、剑痕崖伏魔、洛水散花、大殿拈花，再到今夜寒玉问禅破障——你已正式跻身嵩山少林寺【真传弟子】之列，江湖更广阔的风云与无上禅武绝学，正于前方徐徐展开！'),
    ],
    choices: [
      {
        id: 'slq12_complete',
        label: '合十礼佛，正式晋升嵩山少林寺【Lv.3 真传弟子】！',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          { type: 'giveCombatExp', amount: 550, reason: '寒玉石室问禅破障并死战击溃姑苏慕容暗探首' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyRenown', delta: 80, reason: '护卫神僧玄澄击溃慕容暗探并晋升少林真传弟子' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0109' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_Q12_QUEST_ID, outcome: 'completed' },
          toast('已完成《寒玉问禅 · 七十二障》，正式晋升嵩山少林寺【Lv.3 真传弟子】！', 'success', '达摩真传'),
        ],
      },
    ],
  },
}
