import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q41_QUEST_ID } from './shaolinThousandMonkWarQuest'

const SPEAKER_HELIAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '赫连铁树',
  title: '西夏一品堂大将军',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

const SPEAKER_NUERHAI: StorySpeakerSpec = {
  kind: 'custom',
  name: '努儿海',
  title: '西夏一品堂铁骑先锋',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_CORPSE_POISON: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐尸老鬼',
  title: '星宿海毒阵前锋长老',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_SCOUT_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '山门哨僧 · 慧捷',
  title: '少林外山急报武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

const SPEAKER_ARHAT_ARMY: StorySpeakerSpec = {
  kind: 'custom',
  name: '五百罗汉伏魔僧军',
  title: '嵩山少林寺护寺僧兵',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildPoisonVanguardBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ41_CORPSE_POISON',
    name: '腐尸老鬼',
    title: '星宿海毒阵前锋长老',
    realm: '宗师中品',
    factionName: '星宿海',
    sectRank: 0,
    sectRankLabel: '毒阵长老',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“桀桀桀！老仙亲赐的悲酥清风与三笑逍遥散早已漫山遍野！尔等秃驴的五百罗汉阵，今日全要化作脓水！”',
    stats: { hp: 5600, mp: 5300, agi: 84, res: 76 },
    talents: { bone: 85, comprehension: 80, charm: 20 },
    equippedArts: { neigong: 'MA-026', qinggong: 'MA-097', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-026', level: 9 },
      { artId: 'MA-097', level: 9 },
      { artId: 'MA-055', level: 9 },
      { artId: 'MA-065', level: 9 },
    ],
  })
}

function buildNuerhaiBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ41_NUERHAI',
    name: '努儿海',
    title: '西夏一品堂铁骑先锋',
    realm: '宗师下品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '铁骑先锋',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“赫连大将军有令，踏平罗汉堂者赏黄金千两！儿郎们，冲锋！”',
    stats: { hp: 5120, mp: 4650, agi: 81, res: 74 },
    talents: { bone: 84, comprehension: 72, charm: 36 },
    equippedArts: { neigong: 'MA-081', qinggong: 'MA-097', move1: 'MA-091', move2: 'MA-107' },
    learnedArts: [
      { artId: 'MA-081', level: 9 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-091', level: 9 },
      { artId: 'MA-107', level: 9 },
    ],
  })
}

function buildHelianTieshuBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ41_HELIAN_TIESHU',
    name: '赫连铁树',
    title: '西夏一品堂大将军',
    realm: '宗师上品',
    factionName: '西夏一品堂',
    sectRank: 5,
    sectRankLabel: '一品堂统领',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“本将亲率西夏两千铁骑与一品堂死士横扫中原，今日便要火烧嵩山少林，叫大宋武林从此俯首称臣！”',
    stats: { hp: 6980, mp: 6650, agi: 89, res: 83 },
    talents: { bone: 92, comprehension: 86, charm: 56 },
    equippedArts: { neigong: 'MA-018', qinggong: 'MA-077', move1: 'MA-045', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-018', level: 10 },
      { artId: 'MA-077', level: 10 },
      { artId: 'MA-045', level: 10 },
      { artId: 'MA-085', level: 10 },
    ],
  })
}

export const SHAOLIN_Q41_SCENES: Record<string, StorySceneDef> = {
  scene_slq41_01: {
    id: 'scene_slq41_01',
    title: '第一幕 · 急钟九十九',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_41_ninety_nine_bells.jpg',
    illustrationCaption: '嵩山晨钟急撞九十九响 · 北麓三路烽烟冲天，西夏铁骑与星宿毒人直逼少室山',
    mandatory: true,
    beats: [
      N('{reignYear}暮秋初冬之际，天尚未明，嵩山少林寺古铜晨钟骤然急撞——一声、两声、十声、五十声……直撞满九十九响！'),
      N('按少林五百年祖制，唯有灭寺大劫临头，方可急撞九十九响惊岳钟！刹那间，千余名少林武僧披衣执棍冲出寮房，四十八房长老齐齐聚向钟鼓禅院演武坪！'),
      S(SPEAKER_SCOUT_MONK, '（浑身插着两支西夏黑羽箭，跌撞扑倒在演武坪石阶前，声嘶力竭）“报——！掌门不好了！西夏一品堂大将军【赫连铁树】联合星宿海老怪【丁春秋】，亲率两千伪装铁骑与数百星宿毒人，趁夜偷渡黄河，兵分东、西、中三路扑杀少室山，扬言今日要火烧少林！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_02', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_02: {
    id: 'scene_slq41_02',
    title: '第二幕 · 三路烽烟',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('极目北望，少室山外山松林之间果然火光连天，滚滚黑烟夹杂着刺鼻的青绿色毒雾正顺着山风弥漫而来，隐隐听见战马嘶鸣与星宿派狂傲的丝竹怪啸！'),
      S('NPC-0127', '（玄难面色凝重如铁，扶起负伤的哨僧）“阿弥陀佛！赫连铁树乃西夏皇族悍将，一向视我中原武林为心腹大患；丁春秋更是心狠手辣的毒道老魔！二人合兵两千，既有冲锋陷阵的西夏铁骑，又有防不胜防的悲酥清风与化功毒雾，实乃少林建寺以来未有之大劫！”'),
      S('NPC-0156', '（玄痛紧握玄铁禅杖，双目怒火熊熊）“哼！河南府官军远在百里之外，一时半刻赶不及救援！今日便是我少林千名弟子以血肉护寺之时！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_03', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_03: {
    id: 'scene_slq41_03',
    title: '第三幕 · 掌门定策',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      P('（登上演武坪点将高台，寒风猎猎吹动衣袍，目光冷静如深潭）“诸位师伯与全寺同门莫慌！敌军虽众，却有三大破绽——其一，铁骑不利登险峰，到了少室山石阶便失了冲锋之利；其二，星宿毒雾怕逆风、怕清心解毒丹；其三，赫连铁树与丁春秋各怀鬼胎，只消击破其前军毒阵、直捣中军帅旗，两千乌合之众必不战自溃！”'),
      S('NPC-0134', '（玄寂眼中大亮，合十高声道）“掌门深通兵法策论，一语道破敌军命门！全寺一千二百名武僧皆听掌门号令！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_04', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_04: {
    id: 'scene_slq41_04',
    title: '第四幕 · 飞鸽求援',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      P('（迅速下达军令）“即刻放飞八百里加急信鸽，一报河南府与大相国寺，二发中原武林救急帖！同时命药王院尽数取出清心辟毒散，分发给每一名登阵武僧含于舌下，再以湿布蒙面！”'),
      P('“其余诸院听令——开武库！取齐眉熟铜棍与降魔铁戒刀！今日我们便在这少室山腰，摆开少林三百年未曾全数动用的【五百罗汉伏魔大阵】！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_05', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_05: {
    id: 'scene_slq41_05',
    title: '第五幕 · 誓护祖庭',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_ARHAT_ARMY, '（千余名少林武僧齐齐顿棍于地，震得山石齐鸣，佛号如雷）“阿弥陀佛！宁为玉碎，誓护少室！誓护少室！”'),
    ],
    choices: [
      {
        id: 'slq41_accept',
        label: '升帐点兵，亲布【五百罗汉伏魔大阵】迎战两千敌军！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q41_QUEST_ID, stepId: 'bell_alarm' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'bell_alarm'),
          toast('已开启终局大合战《千僧列阵 · 血护少室》！速于演武坪调度布阵！', 'warn', '千僧列阵'),
        ],
      },
    ],
  },

  scene_slq41_06: {
    id: 'scene_slq41_06',
    title: '第六幕 · 三路分兵',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你于演武坪石案上迅速展开嵩山舆图，以朱笔连点三处险隘，声如金铁般分派军令：'),
      P('“【玄痛】师伯率戒律院三百铁杖武僧死守东路绝壁栈道，凭险滚木礌石，绝不放一骑西夏铁骑绕后！\n【玄寂】师伯率达摩院与俗家护法精锐守住西路山门牌坊，弓弩劲箭压制敌军火油车！\n【玄难】师伯随我亲率【五百罗汉伏魔大阵】，直下罗汉堂前中路石阶，正面迎击星宿毒雾前军与西夏先锋！”'),
      S('NPC-0156', '（玄痛与玄寂齐齐抱拳领命）“领法旨！东、西两路有老衲等在，绝不失守半步！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_07', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_07: {
    id: 'scene_slq41_07',
    title: '第七幕 · 五百罗汉',
    subtitle: '少林山腰 · 罗汉堂外石阶',
    illustrationUrl: '/assets/quests/sl_41_five_hundred_arhats.jpg',
    illustrationCaption: '少室山腰 · 主角亲布五百罗汉伏魔大阵，千僧铜棍如林迎战滚滚毒雾与西夏铁骑',
    mandatory: true,
    beats: [
      N('五百名身披黄褐布甲、手持丈二熟铜齐眉棍的罗汉堂精锐武僧闻令而动，步履如风，转瞬在山腰宽阔的青石古道上排成内外七重圆环！'),
      N('内环主守、中环轮转、外环突击，棍影层层叠叠如金钟罩山，真气相连宛如一尊顶天立地的怒目金刚矗立在少室山前！'),
    ],
    onFinishEffects: [openScene('scene_slq41_08', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_08: {
    id: 'scene_slq41_08',
    title: '第八幕 · 铁骑压境',
    subtitle: '少室山麓 · 敌军前阵',
    mandatory: true,
    beats: [
      N('山脚尘土遮天蔽日！两千名披着黑铁重甲的西夏一品堂死士与轻骑如黑潮般涌至山门之外，中军一杆绣着狰狞黑狼头的帅旗在风中狂舞，旗下一名身材魁梧、满脸络腮胡须的西夏大将骑在汗血黑马上冷笑仰望嵩山——正是西夏一品堂大将军【赫连铁树】！'),
      S(SPEAKER_HELIAN, '（马鞭遥指大雄宝殿金顶，放声大笑）“哈哈哈哈！丁老仙请看，少林寺果然全员出动了！只要今日一把火烧了这千年老巢，中原武林群龙无首，大宋江山便再无江湖屏障！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_09', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_09: {
    id: 'scene_slq41_09',
    title: '第九幕 · 毒魔狂笑',
    subtitle: '少室山麓 · 星宿法辇',
    mandatory: true,
    beats: [
      N('赫连铁树身侧，八名星宿弟子抬着一乘紫檀雕龙大轿，轿中端坐着一名白发如银、鹤发童颜却双目阴毒闪烁的老者，手摇鹅毛扇，正是威震西域的星宿老怪【丁春秋】！'),
      S('NPC-0122', '（轻摇鹅毛扇，阴阳怪气地笑道）“赫连将军何须急着拼兵？少林秃驴最爱摆什么罗汉大阵，待老夫先命【腐尸老鬼】放三百坛『悲酥清风』与『碧磷毒雾』熏昏他们，再让努儿海将军率铁骑踩成肉泥便是！”'),
      S(SPEAKER_HELIAN, '（抚掌大笑）“妙极！努儿海听令，随腐尸老鬼直扑罗汉堂，限你半个时辰撕开少林中路！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_10', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_10: {
    id: 'scene_slq41_10',
    title: '第十幕 · 毒雾漫山',
    subtitle: '罗汉堂前 · 石阶阵地',
    mandatory: true,
    beats: [
      N('“轰！轰！轰！”数十辆抛石车将一坛坛泛着诡异青烟的毒罐砸向山腰石阶！刺鼻的碧绿毒雾轰然炸开，枯草瞬间焦黑化泥，几名冲在最前方的低阶武僧稍吸一口便眼前一黑险些栽倒！'),
      S('NPC-0127', '（玄难大喝一声，挥袖卷起狂猛罡风吹散近前毒烟）“结罗汉伏魔气墙！含紧清心辟毒散，切莫乱了阵脚！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_11', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_11: {
    id: 'scene_slq41_11',
    title: '第十一幕 · 逆风破毒',
    subtitle: '罗汉堂前 · 演武高阶',
    mandatory: true,
    beats: [
      P('（一眼看穿毒雾随风蔓延之势，朗声下令）“五百罗汉听我号令——变阵『金刚伏魔风轮阵』！百人齐催大金刚掌风，逆向将这群毒雾全数吹回西夏敌阵！”'),
      N('一声令下，五百武僧整齐划一地踏步旋身，数百道浑厚至阳的佛门掌风汇作一股狂暴飓风，竟硬生生将漫山碧绿毒雾倒卷而回，熏得山下数十名西夏弓手惨叫连连！'),
    ],
    onFinishEffects: [openScene('scene_slq41_12', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_12: {
    id: 'scene_slq41_12',
    title: '第十二幕 · 奔赴罗汉堂',
    subtitle: '十八铜人罗汉堂前',
    mandatory: true,
    beats: [
      N('毒雾既破，恼羞成怒的腐尸老鬼与西夏先锋努儿海亲率三百黑甲死士冒烟狂冲上来，直扑罗汉堂演武正殿！你与玄难齐齐跃下高台迎敌！'),
    ],
    choices: [
      {
        id: 'slq41_go_luohan',
        label: '急赴【罗汉堂演武正殿】，与玄难并肩冲破毒雾前军！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q41_QUEST_ID, 'break_poison_vanguard'),
          toast('腐尸老鬼与西夏先锋正强攻罗汉堂！速赴【罗汉堂演武正殿】迎战！', 'warn', '罗汉破毒'),
        ],
      },
    ],
  },

  scene_slq41_13: {
    id: 'scene_slq41_13',
    title: '第十三幕 · 前锋死斗',
    subtitle: '十八铜人罗汉堂 · 演武正殿前',
    mandatory: true,
    beats: [
      N('罗汉堂前血光冲天！五百罗汉棍阵与西夏黑甲死士狠狠撞在一起，熟铜棍扫断弯刀，鲜血染红了每一级石阶！'),
      S(SPEAKER_CORPSE_POISON, '（袖中甩出两道乌黑毒磷火，直扑罗汉阵心）“少林掌门受死！尝尝我星宿海的炼心尸毒！”'),
      S(SPEAKER_NUERHAI, '（挥舞重达八十斤的西夏狼牙铁锤狂吼劈来）“破开这秃驴的脑袋，少林寺便是咱们的了！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_14', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_14: {
    id: 'scene_slq41_14',
    title: '第十四幕 · 并肩斩锋',
    subtitle: '罗汉堂演武正殿（玄难助阵 2v2 实战）',
    mandatory: true,
    beats: [
      S('NPC-0127', '（玄难袖袍鼓荡，快步立于你身侧，沉喝道）“掌门，老衲为你掠阵挡住毒火！咱们一鼓作气斩了这两名敌将，杀灭敌军锐气！”'),
      P('（朗声大喝，佛门神功轰然爆发）“好！玄难师伯随我杀出阵去！”'),
    ],
    choices: [
      {
        id: 'slq41_fight_vanguard',
        label: '与【玄难】并肩出阵，迎战【腐尸老鬼】与【努儿海】！（2v2 实战）',
        subLabel: '击溃星宿毒雾前军与西夏铁骑先锋',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q41_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonVanguardBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildNuerhaiBoss() }],
            allies: [{ kind: 'npc', npcId: 'NPC-0127' }],
            rule: 'story_trial',
            forbidEscapeReason: '罗汉堂乃少林中路咽喉，退后一步便是满寺浩劫！',
            introText: '【2v2 罗汉破毒】与玄难并肩迎战星宿毒长老【腐尸老鬼】与西夏先锋【努儿海】！',
            onWin: [openScene('scene_slq41_15', SHAOLIN_Q41_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('毒雾与铁锤合击凶险异常，暂退罗汉阵眼调息再战！', 'warn', '罗汉破毒'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq41_15: {
    id: 'scene_slq41_15',
    title: '第十五幕 · 前军溃灭',
    subtitle: '罗汉堂演武正殿前',
    mandatory: true,
    beats: [
      N('你与玄难双双发威，佛门绝技相得益彰！玄难一记袖里乾坤卷飞腐尸老鬼的毒磷火罐，你顺势如怒龙突进，一掌震碎努儿海胸甲，紧接着凌空一指洞穿腐尸老鬼护体毒罡！'),
      N('两名敌方先锋一死一重伤被擒，三百西夏前锋死士顿时大乱，被五百罗汉伏魔大阵趁势横扫，哭爹喊娘地滚落石阶！'),
    ],
    onFinishEffects: [openScene('scene_slq41_16', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_16: {
    id: 'scene_slq41_16',
    title: '第十六幕 · 铁骑压顶',
    subtitle: '少室山腰 · 烽火漫天',
    mandatory: true,
    beats: [
      N('然而还不及喘息，山脚忽然响起苍凉凄厉的西夏号角！赫连铁树见前军受挫，终于按捺不住，亲率一千五百名一品堂主力铁骑与丁春秋本队全线压上！'),
      S(SPEAKER_HELIAN, '（抽出丈二精钢马槊，面目狰狞咆哮）“全军压上！火箭齐发，给本将把少林寺烧成白地！”'),
      N('刹那间，千余支绑着硫磺火油的火箭如蝗虫般遮蔽天空，东路玄痛、西路玄寂皆告急传讯，少林千僧苦战两个时辰，真气渐竭，局势霎时危如累卵！'),
    ],
    onFinishEffects: [openScene('scene_slq41_17', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_17: {
    id: 'scene_slq41_17',
    title: '第十七幕 · 龙吟破云',
    subtitle: '少室山西麓 · 天降奇兵',
    mandatory: true,
    beats: [
      N('正当西夏铁骑左翼即将冲破外山寨门、火油车逼近钟鼓禅院之际——'),
      N('忽听少室山西侧密林之中，炸响一声震天动地、宛如九霄龙吟般的豪迈长啸！'),
      S('NPC-0110', '（声如奔雷滚滚压过千军厮杀之声）“赫连铁树！丁春秋！尔等番邦恶贼与毒门宵小，安敢欺我中原少林无人？！萧峰在此，吃我一记【亢龙有悔】——！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_18', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_18: {
    id: 'scene_slq41_18',
    title: '第十八幕 · 万里驰援',
    subtitle: '钟鼓禅院外 · 降龙破阵',
    illustrationUrl: '/assets/quests/sl_41_qiaofeng_ally.jpg',
    illustrationCaption: '少室山血战 · 萧峰万里驰援，降龙十八掌撕裂毒阵与西夏左翼，与主角并肩冲锋',
    mandatory: true,
    beats: [
      N('轰隆隆——！一道刚猛绝伦、宛如实质金龙般的磅礴掌风凭空撕裂青绿毒雾，瞬间将西夏左翼十余匹铁骑连人带马震飞三丈，三辆火油车轰然炸碎！'),
      N('但见一条虎背熊腰、浓眉大眼、披着粗布大氅的盖世豪雄如天神下凡般踏破敌阵疾驰而来，身后更跟着数十名丐帮精锐长老与江湖豪侠——正是万里日夜兼程驰援嵩山的【萧峰】！'),
      S('NPC-0110', '（哈哈大笑，大步跃至你身前抱拳，豪气干云）“{gender:大师|女侠}！萧某在洛阳道上截获少林急鸽，星夜策马赶来，幸好未曾来迟！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_19', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_19: {
    id: 'scene_slq41_19',
    title: '第十九幕 · 双雄合壁',
    subtitle: '少室山腰 · 战火之中',
    mandatory: true,
    beats: [
      P('（心中热流激荡，畅快大笑，紧紧回礼）“萧大侠来得正是时候！有萧大侠降龙神掌助阵，区区赫连铁树与丁春秋何足道哉！”'),
      S('NPC-0110', '（目光如电锁定山坡下方那杆飘扬的西夏黑狼帅旗，冷哼一声）“擒贼先擒王！赫连铁树与丁春秋就在中军帅旗之下！{gender:掌门|大居士}，可敢随萧某杀入敌阵，斩了他的帅旗，废了那老毒物？！”'),
      P('（衣袍振风，傲然昂首）“有何不敢！玄难、玄痛、玄寂三位师伯率千僧稳住两翼，今日我与萧大侠便直取中军！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_20', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_20: {
    id: 'scene_slq41_20',
    title: '第二十幕 · 锐不可当',
    subtitle: '少室山道 · 中军突击',
    mandatory: true,
    beats: [
      N('全寺千僧见萧峰天降、掌门亲率冲锋，士气瞬间暴涨十倍！五百罗汉大阵化守为攻，玄痛的戒律铁杖、玄寂的达摩刀阵同时自东西两翼合拢掩杀！'),
      N('你与萧峰一左一右，宛如两柄无坚不摧的绝世神锋，降龙掌风与少林无上神功交相辉映，硬生生在两千西夏铁骑中撕开一条血路，直逼赫连铁树与丁春秋所在的中军高坡！'),
    ],
    onFinishEffects: [openScene('scene_slq41_21', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_21: {
    id: 'scene_slq41_21',
    title: '第二十一幕 · 兵临帅旗',
    subtitle: '钟鼓禅院外演武坪 · 西夏中军',
    mandatory: true,
    beats: [
      N('不过一炷香工夫，你与萧峰已双双杀至赫连铁树黑狼帅旗十丈之内！西夏亲卫死士被震得人仰马翻，赫连铁树与丁春秋终于不得不亲自下场迎战！'),
    ],
    choices: [
      {
        id: 'slq41_go_charge',
        label: '赴【钟鼓禅院 · 演武坪】，与萧峰并肩决战赫连铁树与丁春秋！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q41_QUEST_ID, 'qiaofeng_charge'),
          toast('已杀至西夏中军！速赴【钟鼓禅院 · 演武坪】与萧峰并肩斩旗破敌！', 'warn', '斩旗破敌'),
        ],
      },
    ],
  },

  scene_slq41_22: {
    id: 'scene_slq41_22',
    title: '第二十二幕 · 毒魔怒目',
    subtitle: '钟鼓禅院 · 演武坪外战场',
    mandatory: true,
    beats: [
      S('NPC-0122', '（见你与萧峰如入无人之境般杀到辇前，脸色铁青，怒极反笑）“好个乔峰！好个少林掌门！你们真以为凭蛮力便能破我星宿海化功大法与赫连将军的西夏神功？今日便让你们双双化作白骨！”'),
      S(SPEAKER_HELIAN, '（翻身下马，手中丈二精钢马槊寒光逼人，宗师上品浑厚杀气轰然炸开）“丁老仙莫要留手！先宰了乔峰与这少林之主，其余秃驴便如待宰羔羊！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_23', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_23: {
    id: 'scene_slq41_23',
    title: '第二十三幕 · 决战中军',
    subtitle: '演武坪外中军帅旗下（与萧峰并肩 2v2 宗师上品决战）',
    mandatory: true,
    beats: [
      S('NPC-0110', '（双掌缓缓推出，虎啸龙吟之声震耳欲聋）“{gender:掌门|大居士}！赫连铁树霸道刚猛，丁春秋阴毒诡诈——你我背靠背联手，今日便在此斩碎西夏帅旗！”'),
      P('（真气催至绝巅，目如寒星）“正合我意！杀——！”'),
    ],
    choices: [
      {
        id: 'slq41_fight_bosses',
        label: '与【萧峰】并肩冲阵，决战【赫连铁树】与【丁春秋】！（宗师上品 2v2 决战）',
        subLabel: '斩碎西夏一品堂帅旗，重创星宿老怪退兵',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q41_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHelianTieshuBoss() },
            extraOpponents: [{ kind: 'npc', npcId: 'NPC-0122' }],
            allies: [{ kind: 'npc', npcId: 'NPC-0110' }],
            rule: 'story_trial',
            forbidEscapeReason: '中军帅旗近在咫尺，退后一步便前功尽弃！',
            introText: '【2v2 血护少室】与萧峰并肩迎战西夏一品堂统领【赫连铁树】与星宿老怪【丁春秋】！',
            onWin: [openScene('scene_slq41_24', SHAOLIN_Q41_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('赫连铁树与丁春秋联手威力惊人，与萧峰重整内息再冲中军！', 'warn', '斩旗破敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq41_24: {
    id: 'scene_slq41_24',
    title: '第二十四幕 · 掌裂化功',
    subtitle: '演武坪外 · 中军战场',
    mandatory: true,
    beats: [
      N('这是一场足以载入中原武林史册的惊天决战！掌风与毒雾翻涌，马槊与佛光对撞，方圆十丈之内飞沙走石、草木俱碎！'),
      N('激战至第六十余合，丁春秋企图故技重施，以一蓬幽蓝毒粉偷袭你的双目、同时催动《化功大法》吸取萧峰内力。萧峰怒喝一声“雕虫小技”，一记刚猛绝伦的【飞龙在天】以排山倒海之势硬生生震散毒粉，反将丁春秋震得胸口凹陷、喷出一大口黑血！'),
    ],
    onFinishEffects: [openScene('scene_slq41_25', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_25: {
    id: 'scene_slq41_25',
    title: '第二十五幕 · 斩碎帅旗',
    subtitle: '少室山中军高坡',
    illustrationUrl: '/assets/quests/sl_41_shatter_banner.jpg',
    illustrationCaption: '少室山大捷 · 主角凌空斩碎赫连铁树西夏黑狼帅旗，萧峰掌创丁春秋，两千敌军望风溃退',
    mandatory: true,
    beats: [
      N('你抓住丁春秋重伤溃退的一瞬战机，足尖一点凌空拔起三丈，借下坠雷霆之势迎着赫连铁树的精钢马槊悍然劈落！'),
      N('“咔嚓——轰！”赫连铁树虎口崩裂、马槊脱手飞出，你的无上佛门劲气余势不绝，直直劈中其身后那根碗口粗的铁木大旗杆！'),
      N('象征西夏一品堂威严的黑狼帅旗应声断作两截，轰然倒塌在血泥之中，旗面被战火瞬间点燃！'),
    ],
    onFinishEffects: [openScene('scene_slq41_26', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_26: {
    id: 'scene_slq41_26',
    title: '第二十六幕 · 毒魔逃窜',
    subtitle: '少室山中军高坡',
    mandatory: true,
    beats: [
      S('NPC-0122', '（捂着鲜血淋漓的胸口，眼见大势已去，毫不犹豫一脚踢翻身旁护卫，纵身跃上宝马）“赫连将军，少林与乔峰势大，老夫先行一步！星宿弟子，撤！”'),
      S(SPEAKER_HELIAN, '（气得暴跳如雷，却见自己帅旗已断、中军大乱、远方更有河南府官军与大相国寺援兵旗帜隐隐出现，只得咬牙嘶吼）“丁春秋你个老匹夫！鸣金！全军撤退！撤回黄河以北！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_27', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_27: {
    id: 'scene_slq41_27',
    title: '第二十七幕 · 千军溃退',
    subtitle: '少室山麓 · 硝烟渐散',
    mandatory: true,
    beats: [
      N('帅旗既倒，两千西夏铁骑与星宿毒人顿时兵败如山倒，丢弃了满地刀枪火油车，狼狈不堪地向北奔逃！'),
      N('玄痛、玄寂、玄难率领浴血奋战的千名少林武僧追出十里，直将敌军彻底逐出登封地界方才鸣金收兵！'),
    ],
    onFinishEffects: [openScene('scene_slq41_28', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_28: {
    id: 'scene_slq41_28',
    title: '第二十八幕 · 劫后余晖',
    subtitle: '少室山道 · 夕阳如金',
    mandatory: true,
    beats: [
      N('暮色降临，血战整整一日的少室山终于重归宁静。夕阳穿过未散的硝烟，照亮了满身血污却依旧挺立如松的千名少林武僧，也照亮了毫发无损的大雄宝殿金顶。'),
      S('NPC-0110', '（擦去脸颊血渍，望着屹立不倒的千年古刹，由衷赞叹）“好一个五百罗汉伏魔大阵！好一位少林之主！今日若非你调度有方、临危不乱，纵使萧某赶来，也未必能守住这千年祖庭！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_29', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_29: {
    id: 'scene_slq41_29',
    title: '第二十九幕 · 抚恤忠魂',
    subtitle: '少室山腰 · 罗汉堂外',
    mandatory: true,
    beats: [
      N('你走过伤兵营帐，亲手替负伤的罗汉堂武僧包扎伤口，又向二十余名血洒山门的阵亡护寺武僧深深合十诵经。'),
      S('NPC-0127', '（玄难眼眶湿润，沉声道）“阿弥陀佛。此战虽伤亡数十名好儿郎，然大雄宝殿、藏经阁与千年法脉丝毫无损，更挫败了西夏一品堂吞并中原武林的野心！阵亡弟子英灵有知，亦当含笑九泉！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_30', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_30: {
    id: 'scene_slq41_30',
    title: '第三十幕 · 英雄相惜',
    subtitle: '少室山道 · 凯旋回寺',
    mandatory: true,
    beats: [
      P('（望向身旁豪气不减的萧峰，郑重拱手）“萧大侠千里驰援、生死相托，救我少林于倒悬！大雄正殿已备下素宴与清茶，还请萧大侠移步入殿，受少林全寺一拜！”'),
      S('NPC-0110', '（哈哈大笑，拍了拍你的肩膀）“萧某与少林渊源深厚，更有{gender:大师|大居士}这等知己在此，何必客套！不过大殿之上吃茶可以，待会儿出了山门，你可莫拦着萧某痛饮十坛烈酒！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_31', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_31: {
    id: 'scene_slq41_31',
    title: '第三十一幕 · 凯旋入殿',
    subtitle: '大雄宝殿 · 玉阶丹墀',
    mandatory: true,
    beats: [
      N('你与萧峰并肩踏上大雄宝殿丹墀，千名劫后余生的少林僧众夹道合十欢呼，声震嵩岳。'),
    ],
    choices: [
      {
        id: 'slq41_go_memorial',
        label: '步入【大雄正殿 · 佛前蒲团】，与萧峰论侠并铭碑志功',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q41_QUEST_ID, 'victory_memorial'),
          toast('少室山大捷！请步入【大雄正殿 · 佛前蒲团】铭碑志功！', 'success', '血护少室'),
        ],
      },
    ],
  },

  scene_slq41_32: {
    id: 'scene_slq41_32',
    title: '第三十二幕 · 佛前论侠',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内灯火通明。玄难、玄痛、玄寂三位高僧携四十八房长老齐齐向萧峰合十致谢，萧峰连连抱拳还礼。'),
      S('NPC-0110', '（举起清茶以茶代酒，神色忽而凝重几分）“{gender:掌门|大居士}，此战虽击退了赫连铁树与丁春秋，但我一路追查西夏与大辽暗桩时，却隐隐察觉到一股更深沉的暗流——有人似乎一直在暗中窥伺少林藏经阁，而且牵扯到三十年前雁门关的一桩血海旧案……”'),
    ],
    onFinishEffects: [openScene('scene_slq41_33', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_33: {
    id: 'scene_slq41_33',
    title: '第三十三幕 · 暗流伏笔',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（神色一凛，想起藏经阁中那位深不可测的扫地老僧法空）“雁门关旧案？藏经阁乃少林千年武学与佛藏重地，弟子必加派人手日夜戒备。萧大侠日后若有线索，少林山门随时为你敞开！”'),
      S('NPC-0110', '（重重点头，眼中满是生死相交的信任）“好！日后若真有大事，萧某必再来少林与你并肩一战！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_34', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_34: {
    id: 'scene_slq41_34',
    title: '第三十四幕 · 铭碑少室',
    subtitle: '大雄宝殿 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('战后三日，你命石匠于少林碑林新立一座丈高青石大碑，亲题《血护少室千僧纪功碑》，将此战五百罗汉破毒、萧峰降龙驰援、斩碎赫连帅旗的壮烈事迹与阵亡僧众法号一一镌刻其上，永传后世。'),
    ],
    onFinishEffects: [openScene('scene_slq41_35', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_35: {
    id: 'scene_slq41_35',
    title: '第三十五幕 · 威震大宋',
    subtitle: '嵩山少林寺 · 山门远眺',
    mandatory: true,
    beats: [
      N('「千僧列阵血护少室、大破西夏两千铁骑与星宿毒军」的捷报传至汴京，宋仁宗龙颜大悦，特赐少林「护国禅林」御笔金匾！中原正道群雄无不振奋，少林武林泰山北斗之尊，至此臻于极盛！'),
    ],
    onFinishEffects: [openScene('scene_slq41_36', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_36: {
    id: 'scene_slq41_36',
    title: '第三十六幕 · 萧峰辞行',
    subtitle: '嵩山少林寺 · 山门古道',
    mandatory: true,
    beats: [
      N('山门之外，秋风萧瑟。萧峰翻身上马，冲你朗声抱拳道：“{gender:掌门|大居士}留步！待萧某查明北方身世与旧案真相，咱们藏经阁下再会！”'),
      N('马蹄疾驰而去，唯余豪迈笑声回荡山谷。你心中隐隐预感，半年之后的藏经阁，必将迎来一场真正决定江湖格局的绝顶风暴。'),
    ],
    onFinishEffects: [openScene('scene_slq41_37', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_37: {
    id: 'scene_slq41_37',
    title: '第三十七幕 · 静候终章',
    subtitle: '嵩山少林寺 · 大雄正殿',
    mandatory: true,
    beats: [
      N('经此血战，你的兵法策论、临阵骑射与宗师武境俱已炉火纯青。只待半年之后机缘成熟、佛法书艺与侠义皆至化境，藏经阁那位古杏扫叶的无名老僧，或许便将为你揭开少林五百年来最深邃的终极奥秘……'),
    ],
    onFinishEffects: [openScene('scene_slq41_38', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_38: {
    id: 'scene_slq41_38',
    title: '第三十八幕 · 护国禅林',
    subtitle: '嵩山少林寺 · 大捷归功',
    mandatory: true,
    beats: [
      N('你手扶大雄宝殿青铜鼎炉，望向重建如新的少室山门，心中一片澄明笃定。'),
    ],
    choices: [
      {
        id: 'slq41_complete',
        label: '铭碑志功，受封【护国禅林】大捷之赏（完成终局合战）',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 2000, reason: '千僧列阵血护少室，与萧峰并肩斩碎赫连铁树帅旗、重创丁春秋' },
          { type: 'addSectContribution', amount: 600 },
          { type: 'modifyRenown', delta: 400, reason: '血战击退西夏一品堂与星宿海两千敌军，获赐护国禅林之誉' },
          { type: 'modifyChivalry', delta: 150, reason: '以身作则护国安民、血守中原武林正道脊梁' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '骑术', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q41_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《千僧列阵 · 血护少室》！实战经验 +2000，门派贡献 +600，威望 +400，侠义 +150，萧峰好感 +30！',
            'success',
            '血护少室',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_Q41_SCENES
