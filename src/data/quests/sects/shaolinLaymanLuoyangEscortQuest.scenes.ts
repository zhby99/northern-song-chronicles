import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q18_QUEST_ID } from './shaolinLaymanLuoyangEscortQuest'

const SPEAKER_WATER_BANDIT: StorySpeakerSpec = {
  kind: 'custom',
  name: '截江水魁 · 翻浪彪',
  title: '黄河水匪头目',
  factionName: '黄河水匪',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_TUOBA_LIE: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋烈',
  title: '西夏游骑百夫长',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_XIXIA_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '党项铁骑副将 · 野利虎',
  title: '西夏潜哨精锐',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

function buildWaterBanditLead(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_BANDIT_LEAD',
    name: '截江水魁 · 翻浪彪',
    title: '黄河水匪头目',
    realm: '二流下品',
    factionName: '黄河水匪',
    sectRank: 0,
    sectRankLabel: '水匪头目',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“金刀王家铸的千斤紫金佛，熔了够弟兄们吃喝三辈子！秃驴与护镖的都给老子滚下伊水喂鱼！”',
    stats: { hp: 1320, mp: 920, agi: 45, res: 29 },
    talents: { bone: 62, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-120', move1: 'MA-151', move2: 'MA-145' },
    learnedArts: [
      { artId: 'MA-104', level: 5 },
      { artId: 'MA-120', level: 5 },
      { artId: 'MA-151', level: 5 },
      { artId: 'MA-145', level: 5 },
    ],
  })
}

function buildWaterBanditMate(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_BANDIT_MATE',
    name: '水鬼二当家 · 铁篙陈',
    title: '黄河水匪副首',
    realm: '三流上品',
    factionName: '黄河水匪',
    sectRank: 0,
    sectRankLabel: '水匪副首',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“大哥截前车，俺来斩断马缰！休叫佛像过了龙门桥！”',
    stats: { hp: 960, mp: 620, agi: 41, res: 24 },
    talents: { bone: 56, comprehension: 38, charm: 22 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-120', move1: 'MA-134', move2: 'MA-144' },
    learnedArts: [
      { artId: 'MA-104', level: 4 },
      { artId: 'MA-120', level: 4 },
      { artId: 'MA-134', level: 4 },
      { artId: 'MA-144', level: 4 },
    ],
  })
}

function buildTuobaLieBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_TUOBA_LIE',
    name: '拓跋烈',
    title: '西夏游骑百夫长',
    realm: '二流上品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '西夏百夫长',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“大宋和尚也敢挡我党项铁骑的弯刀？这尊紫金佛像，本百夫长便替兴庆府一品堂笑纳了！”',
    stats: { hp: 1880, mp: 1480, agi: 53, res: 39 },
    talents: { bone: 70, comprehension: 56, charm: 40 },
    equippedArts: { neigong: 'MA-245', qinggong: 'MA-139', move1: 'MA-133', move2: 'MA-135' },
    learnedArts: [
      { artId: 'MA-245', level: 6 },
      { artId: 'MA-139', level: 6 },
      { artId: 'MA-133', level: 7 },
      { artId: 'MA-135', level: 6 },
    ],
  })
}

function buildXixiaScout(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_XIXIA_SCOUT',
    name: '党项铁骑副将 · 野利虎',
    title: '西夏潜哨精锐',
    realm: '二流中品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '西夏副将',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“百夫长莫与宋人废话，斩了这护法小将，立刻拖走佛车！”',
    stats: { hp: 1460, mp: 1080, agi: 48, res: 33 },
    talents: { bone: 64, comprehension: 48, charm: 32 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-119', move1: 'MA-133', move2: 'MA-115' },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-119', level: 5 },
      { artId: 'MA-133', level: 6 },
      { artId: 'MA-115', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq18_01: {
    id: 'scene_slq18_01',
    title: '第一幕 · 金刀正气',
    subtitle: '洛阳府 · 金刀王家正气大厅',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，洛阳城桂香弥漫。你奉嵩山少林寺外务总坛飞鸽调令，策马西行三百里抵达西京洛阳，直奔威震河洛的【金刀王家】。'),
      N('正气大厅之内檀香缭绕，须发如银却目光炯炯的金刀老爷子【王元霸】正与一位身披明黄袈裟、神态威严的少林高僧对坐烹茶——那高僧正是驻锡洛阳白马寺的「大韦陀僧」【玄悲】大师！'),
      S('NPC-0186', '（见你大步入厅，朗声大笑起身相迎）“哈哈！玄悲大师，你瞧嵩山派来的是何等人物！听说汴京相国寺一夜荡平青蛇帮的俗家少侠，便是这位年轻俊杰罢？”'),
      S('NPC-0157', '（双掌合十，慈目中透出审视与赞许）“阿弥陀佛。你在东京护持万姓雅市，慧照师侄已飞书禀报方丈。此番洛阳护佛重任，正须既有佛心又通骑战的俗家护法相助。”'),
    ],
    onFinishEffects: [openScene('scene_slq18_02', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_02: {
    id: 'scene_slq18_02',
    title: '第二幕 · 千斤紫金',
    subtitle: '金刀威震正气大厅',
    mandatory: true,
    beats: [
      S('NPC-0186', '（抚须正色）“实不相瞒，十年前老夫幼孙重病，幸得少林药王院高僧冒雪赠药救回一命。老夫早年许下宏愿，遍采河洛精铜紫金，耗资数万贯延请西京大匠铸成一尊千斤紫金释迦佛像，如今方始开光，欲请少林与我王家联手护送入嵩山大雄宝殿！”'),
      P('（抱拳肃然）“王老爷子重情守诺，诚乃河洛豪杰表率！只是千斤重器车行缓慢，由洛阳经伊阙龙门入嵩山，沿途水陆交错，不知近日风声可还太平？”'),
      S('NPC-0157', '（神色微凝，缓缓吐出一口浊气）“你问得极是。佛像鎏金耗费巨万，虽已极力保密，近几日却有白马寺门下探子回报——伊水下游的黄河水匪频频在龙门石窟一带集结，甚至隐约混有操党项口音的西夏游骑！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_03', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_03: {
    id: 'scene_slq18_03',
    title: '第三幕 · 暗流伊水',
    subtitle: '金刀威震正气大厅',
    mandatory: true,
    beats: [
      N('正议论间，两道灰袍身影快步入厅合十行礼，正是自白马寺随侍玄悲前来的少林武僧【虚净】与【虚慧】。'),
      S('NPC-0667', '“禀师叔祖、王老爷子！弟子方才在洛水渡口打探，确有两伙陌生客商高价买走了数十匹北地骏马与铁蒺藜，行踪直指伊阙龙门石桥！”'),
      S('NPC-0737', '“依弟子看，寻常水匪绝无这等财力与军阵章法，多半是西夏一品堂潜入河洛的游骑斥候，欲借劫夺紫金佛像既充军资，又挫我少林与河洛武林威望！”'),
      S('NPC-0186', '（拍案怒喝，震得茶盏嗡嗡作响）“岂有此理！西夏贼子竟敢把手伸到我洛阳城脚下！老夫这便点齐金刀门二十名精锐趟子手，与玄悲大师及少林诸位贤侄一同走这一趟镖！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_04', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_04: {
    id: 'scene_slq18_04',
    title: '第四幕 · 领镖立约',
    subtitle: '金刀威震正气大厅',
    mandatory: true,
    beats: [
      S('NPC-0157', '“王老施主莫急，金刀府尚须留人坐镇洛阳，以防贼人声东击西。此番护佛，便由王老施主遣精锐趟子手护住侧翼，老衲亲自押阵中车；至于前锋探路、策马破阵之责，便交由这位俗家护法{gender:师侄|女施主}与虚净、虚慧共担！”'),
      P('（按剑抱拳，意气风发）“请玄悲师叔祖、王老爷子放心！弟子既练得几分骑术与刀杖功夫，定当寸步不离紫金佛车，纵有千军万马亦教贼人有来无回！”'),
    ],
    choices: [
      {
        id: 'slq18_accept_quest',
        label: '领受护佛重任，移步【金刀石锁演武中庭】点验镖车车马',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q18_QUEST_ID, stepId: 'courtyard_muster' },
          setStep(SHAOLIN_Q18_QUEST_ID, 'courtyard_muster'),
          toast('已开启《洛阳护镖 · 金刀少林》！请前往【金刀石锁演武中庭】点验镖车与骑队！', 'talk', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_05: {
    id: 'scene_slq18_05',
    title: '第五幕 · 中庭点镖',
    subtitle: '金刀王家 · 金刀石锁演武中庭',
    mandatory: true,
    beats: [
      N('步入宽阔的金刀石锁演武中庭，只见一辆由四匹健硕青骡挽拉的铁木重车停于中央，车上覆着明黄织锦佛幔，隐约透出庄严厚重的紫金轮廓，两侧十余名佩金背大刀的王家好手牵马肃立。'),
      S('NPC-0186', '（走近拍了拍铁木车辕，沉声笑道）“这车轴乃是精钢裹铁梨木打造，寻常刀斧砍不断，车轮下还暗藏防陷铁齿。只是过伊阙龙门石桥时路面收窄，马队须由双列变作单骑护卫，正是贼人最易设伏之处！”'),
      P('（翻身上马试了试马镫与缰绳，顺手检验镖车绳索）“王老爷子考虑周详。过桥之前，弟子愿先领虚净、虚慧两位师兄策马探察石窟两侧崖壁，绝不教伏兵轻易封死桥头。”'),
    ],
    onFinishEffects: [openScene('scene_slq18_06', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_06: {
    id: 'scene_slq18_06',
    title: '第六幕 · 金刀少林',
    subtitle: '洛阳南郊 · 伊阙古道启程',
    illustrationUrl: '/assets/quests/sl_18_longmen_escort.jpg',
    illustrationCaption: '伊阙古道 · 金刀王家镖旗与少林护佛车队并辔南行',
    mandatory: true,
    beats: [
      N('辰时三刻，金刀镖旗猎猎迎风，白马寺诵经钟声遥遥相送。你策马居前，玄悲大师手持一柄暗沉古朴的精钢伏魔杵坐镇中车，虚净、虚慧分守左右，浩浩荡荡出洛阳南门直奔白马寺古驿与伊阙龙门！'),
      S('NPC-0667', '（策马与你并辔而行，低声赞叹）“师兄骑术沉稳，控缰如臂使指！俺们在寺里光练拳脚，这马背上的护镖本事可远不如你们俗家护法！”'),
      S('NPC-0737', '（遥指前方烟岚缭绕的伊阙两山夹峙之处）“前方便是白马寺南驿与龙门石窟峡口了。林鸟惊飞、水面无舟，师兄小心，杀气已近！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_07', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_07: {
    id: 'scene_slq18_07',
    title: '第七幕 · 刀禅相契',
    subtitle: '金刀石锁演武中庭 · 临行叮嘱',
    mandatory: true,
    beats: [
      S('NPC-0186', '（递来一枚金刀王家通行铜牌，眼中满是期许）“少侠，这一路上若是遇到硬点子，王家趟子手皆听你与玄悲大师号令！金刀门与少林寺百年交好，今日便让天下绿林看看『金刀少林』四字的分量！”'),
      S('NPC-0157', '（微微颔首）“车队先赴白马寺大佛宝殿前净水洒扫、与白马寺护院汇合，再一鼓作气闯过伊阙龙门。走罢！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_08', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_08: {
    id: 'scene_slq18_08',
    title: '第八幕 · 赴驿汇合',
    subtitle: '洛阳官道',
    mandatory: true,
    beats: [
      N('车轮滚滚碾过青石官道，远方白马寺飞檐已在秋雾中隐约可见。你催马在前开道，暗自调匀内息，准备于白马寺汇合护院后直闯伊阙龙门！'),
    ],
    choices: [
      {
        id: 'slq18_head_baimasi',
        label: '护送镖车前往【白马寺 · 白马大佛宝殿】汇合并南下伊阙',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q18_QUEST_ID, 'longmen_ambush'),
          toast('镖车已整肃完毕！请前往【白马寺 · 白马大佛宝殿】汇合启程，迎战伊阙伏兵！', 'talk', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_09: {
    id: 'scene_slq18_09',
    title: '第九幕 · 伊阙杀机',
    subtitle: '白马寺南出 · 伊阙龙门石窟峡口',
    mandatory: true,
    beats: [
      N('车队自白马大佛宝殿洒净启行，不消半日便驶入两壁悬崖千佛林立的伊阙龙门古道。伊水滔滔奔涌，石桥横跨碧波之上，四周忽然静得只剩风穿石窟的呜咽声。'),
      N('“嗖！嗖！嗖！”数支响箭骤然自伊水芦苇荡中破空而起！紧接着浪花翻涌，七八条快船靠岸，数十名手持鬼头刀与分水铁篙的黄河水匪嚎叫着杀上官道，将石桥前后团团截住！'),
      S(SPEAKER_WATER_BANDIT, '（挥舞厚背鬼头大刀立于桥头，狞笑咆哮）“此山是我开，此水是我栽！王元霸那老儿铸的千斤紫金佛，今日归俺黄河水寨了！识相的秃驴滚回白马寺念经，否则统统剁碎喂王八！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_10', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_10: {
    id: 'scene_slq18_10',
    title: '第十幕 · 破浪截寇',
    subtitle: '伊阙龙门石桥北口',
    mandatory: true,
    beats: [
      S('NPC-0157', '（立于佛车之前稳如泰山，低声喝道）“虚净、虚慧，随金刀门趟子手结圆阵护住佛车马匹，莫教流矢惊了青骡！{gender:师侄|女施主}，这伙水匪乃是前锋诱饵，背后必有西夏劲敌！速斩其首，打开桥路！”'),
      P('（勒马横刀，朗声清喝）“区区水寇也敢觊觎佛门重宝！翻浪彪，滚过来领死！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_11', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_11: {
    id: 'scene_slq18_11',
    title: '第十一幕 · 桥头扫匪',
    subtitle: '伊阙龙门石桥（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('翻浪彪与水鬼二当家铁篙陈见你单骑突阵，齐声怪叫，一左一右挥刀抡篙猛扑而来！你催动内力，正面迎击！'),
    ],
    choices: [
      {
        id: 'slq18_fight_bandits',
        label: '策马挺刃，迎战【翻浪彪】与【铁篙陈】！（车轮连战 实战）',
        subLabel: '击溃黄河水匪前锋，夺回龙门石桥通道',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWaterBanditLead() },
            extraOpponents: [{ kind: 'custom', npc: buildWaterBanditMate() }],
            rule: 'story_trial',
            forbidEscapeReason: '千斤紫金佛像正在身后石桥之上，半步不可退让！',
            introText: '【车轮连战 · 桥头扫匪】迎战黄河水匪头目【翻浪彪】与副首【铁篙陈】！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q18_pirates_cleared', value: true },
              openScene('scene_slq18_12', SHAOLIN_Q18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('水匪刀篙凶猛，暂退佛车阵前喘息片刻再战！', 'warn', '龙门血战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq18_12: {
    id: 'scene_slq18_12',
    title: '第十二幕 · 党项铁骑',
    subtitle: '伊阙龙门石桥南端',
    mandatory: true,
    beats: [
      N('你刀杖齐挥，将翻浪彪震落石桥跌入伊水，铁篙陈亦被震断铁篙抱头鼠窜！然而尚未喘息，石桥南端骤然马蹄如雷、尘沙蔽日——'),
      N('一队身披黑铁札甲、头戴党项尖笠的精锐游骑自崖畔林中狂飙杀出！为首一员彪悍大将手提丈二蛇矛、腰悬西夏弯刀，煞气腾腾直扑紫金佛车！'),
      S(SPEAKER_TUOBA_LIE, '（策马逼近桥心，冷笑如狼）“哈哈哈哈！一群没用的中原水耗子，还得劳烦本百夫长拓跋烈亲自出手！野利虎，把这帮少林秃驴连人带马一起剁了，紫金佛像拉回兴庆府献给国主！”'),
      S(SPEAKER_XIXIA_SCOUT, '（弯刀出鞘，凶光毕露）“遵命！杀！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_13', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_13: {
    id: 'scene_slq18_13',
    title: '第十三幕 · 韦陀抛杵',
    subtitle: '伊阙龙门石桥 · 危局授绝学',
    illustrationUrl: '/assets/quests/sl_18_weituo_bridge.jpg',
    illustrationCaption: '龙门石桥 · 玄悲抛赠少林韦陀伏魔杵，危局破格点拨《韦陀杵》力战拓跋烈',
    mandatory: true,
    beats: [
      N('西夏游骑阵势森严，十余骑弯弓齐射将王家趟子手与虚净、虚慧死死压制在佛车周围！玄悲大师双袖一振，以浑厚掌力震飞漫天狼牙箭，护住惊马与佛像，却一时分身乏术。'),
      S('NPC-0157', '（见拓跋烈与野利虎双骑已杀到桥心，当机立断将手中精钢重杵凌空掷向你，声如佛门狮子吼震彻峡谷）“{gender:师侄|女施主}接杵！西夏铁骑长矛弯刀俱重，寻常刀剑难挡其锋——接老衲【少林韦陀伏魔杵】，记准《韦陀杵》『金刚降魔、横扫千军、天龙镇岳』三诀，破他马步，打他中宫！”'),
      N('你腾身跃起一把接住那柄沉逾四十斤的乌金重杵，只觉杵身微温，隐隐与体内少林内劲共鸣！电光石火间，玄悲大师的法言与佛门护法韦陀降魔之象在脑中轰然贯通！'),
      P('（横杵立于石桥正中，目射神光，长啸迎敌）“西夏贼将休得猖狂！且尝我少林《韦陀杵》！”'),
    ],
    onFinishEffects: [teachArtNow('MA-094'), openScene('scene_slq18_14', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_14: {
    id: 'scene_slq18_14',
    title: '第十四幕 · 韦陀镇桥',
    subtitle: '伊阙龙门石桥（车轮连战 首领决战）',
    mandatory: true,
    beats: [
      N('拓跋烈催动西夏秘藏玄功，蛇矛如毒龙出海直刺咽喉，副将野利虎挥西夏弯刀斜劈马腹！你手执少林韦陀伏魔杵，步踏金刚，奋起神威死守龙门石桥！'),
    ],
    choices: [
      {
        id: 'slq18_fight_tuoba',
        label: '执伏魔杵迎战西夏百夫长【拓跋烈】与【野利虎】！（二流上品 车轮连战）',
        subLabel: '以《韦陀杵》刚猛重器大破党项铁骑',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuobaLieBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildXixiaScout() }],
            rule: 'story_trial',
            forbidEscapeReason: '紫金佛像与同门性命皆系于此桥，誓死不退！',
            introText: '【车轮连战 · 龙门血战】手执韦陀伏魔杵迎战西夏游骑百夫长【拓跋烈】与副将【野利虎】！',
            onWin: [openScene('scene_slq18_15', SHAOLIN_Q18_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('拓跋烈马战刚猛，暂退桥栏回气，稳住架势再以韦陀杵破敌！', 'warn', '龙门血战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq18_15: {
    id: 'scene_slq18_15',
    title: '第十五幕 · 伏魔破阵',
    subtitle: '伊阙龙门石桥',
    mandatory: true,
    beats: [
      N('“轰——！”你一式「天龙镇岳」自上而下雷霆压落，沉重的韦陀伏魔杵竟将野利虎手中西夏弯刀硬生生砸弯脱手，顺势横扫把这名副将连人带甲扫下桥阶！'),
      N('拓跋烈见副将折阵，大惊失色，挺蛇矛拼死反扑，却被你沉腰拧胯、一记「金刚降魔」震碎矛杆！拓跋烈虎口崩裂、鲜血直流，骇然勒马倒退。'),
      S(SPEAKER_TUOBA_LIE, '（目眦欲裂，咬牙切齿）“好生霸道的少林重杵！传令鸣金——撤！这笔账我西夏一品堂记下了！”'),
      N('此时洛阳府援兵与王元霸亲自率领的金刀马队亦踏尘赶到，漫山喊杀声起，西夏游骑不敢恋战，丢下十余具尸首狼狈遁入西山密林！'),
    ],
    onFinishEffects: [openScene('scene_slq18_16', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_16: {
    id: 'scene_slq18_16',
    title: '第十六幕 · 佛像无恙',
    subtitle: '伊阙龙门石桥',
    mandatory: true,
    beats: [
      N('硝烟散尽，伊水复归澄澈。王元霸翻身下马大步上前，掀开佛幔查验紫金佛像——但见宝相庄严，竟连一丝箭痕也未曾留下！'),
      S('NPC-0186', '（抚掌大笑，眼眶微红）“好！好一个少林俗家护法！单人独杵守住龙门石桥，杀得西夏百夫长丢盔弃甲！请玄悲大师与诸位暂回白马寺大佛宝殿歇息，待明晨老夫亲护车队直上嵩山！”'),
      S('NPC-0157', '（合十微笑，望向你手中仍嗡嗡微鸣的伏魔杵）“阿弥陀佛。回返白马大佛宝殿罢，老衲尚有一番机缘要付与你。”'),
    ],
    choices: [
      {
        id: 'slq18_return_baima',
        label: '护送紫金佛像安抵【白马寺 · 白马大佛宝殿】复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q18_QUEST_ID, 'baima_confer'),
          toast('已击退水匪与西夏游骑！请在【白马大佛宝殿】拜见玄悲大师与王元霸！', 'success', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_17: {
    id: 'scene_slq18_17',
    title: '第十七幕 · 祖庭烛明',
    subtitle: '洛阳府 · 白马寺 · 白马大佛宝殿',
    mandatory: true,
    beats: [
      N('白马寺乃中土释源祖庭，大佛宝殿内千灯齐明。千斤紫金佛像暂奉殿中莲台之上，烛火映照之下熠熠生辉，虚净、虚慧与白马寺众僧齐诵《楞严咒》回向平安。'),
      S('NPC-0667', '（合十赞叹）“师兄方才在龙门石桥那一记韦陀降魔，真如护法天神下凡，弟子看得热血沸腾！”'),
      S('NPC-0737', '“若非师兄以一己之力顶住西夏百夫长，单靠咱们几个恐怕真要折损不少弟兄！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_18', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_18: {
    id: 'scene_slq18_18',
    title: '第十八幕 · 紫金焕彩',
    subtitle: '白马大佛宝殿',
    illustrationUrl: '/assets/quests/sl_18_golden_buddha.jpg',
    illustrationCaption: '白马大佛宝殿 · 千斤紫金佛像安奉放光，玄悲破格传授《韦陀杵》并赠伏魔宝杵',
    mandatory: true,
    beats: [
      S('NPC-0186', '（向你郑重抱拳一礼）“少侠今日护佛有功，更保住了我金刀王家的百年声誉！自今日起，但凡少林门下行走河洛，我金刀王家必倾力相助！你这份交情，老夫王元霸记在心里了！”'),
      P('（连忙还礼，将手中沉甸甸的伏魔宝杵双手奉还玄悲）“王老爷子言重了！护持佛宝、抗击西夏胡骑乃弟子分内之事。玄悲师叔祖，这柄宝杵还请收回。”'),
    ],
    onFinishEffects: [openScene('scene_slq18_19', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_19: {
    id: 'scene_slq18_19',
    title: '第十九幕 · 破格传杵',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      S('NPC-0157', '（摆手含笑，并未接回宝杵，反而自袖中取出一卷密录置入你手）“阿弥陀佛。宝剑赠烈士，伏魔杵自当配护法之人。老衲平生最擅《韦陀杵》，本是少林寺不轻传外人的降魔重器绝学，今日见你临阵一点即通、侠肝义胆，老衲便破例将《韦陀杵》全诀与这柄随身三十年的【少林韦陀伏魔杵】一并赐予你！”'),
      P('（心头震动，肃然躬身大礼参拜）“玄悲师叔祖厚恩，弟子粉身碎骨难报万一！必当善用此杵降妖伏魔，绝不辱没『大韦陀』威名！”'),
    ],
    onFinishEffects: [openScene('scene_slq18_20', SHAOLIN_Q18_QUEST_ID)],
  },

  scene_slq18_20: {
    id: 'scene_slq18_20',
    title: '第二十幕 · 金刀盟约',
    subtitle: '白马大佛宝殿',
    mandatory: true,
    beats: [
      N('钟声悠扬，大佛宝殿外秋月如洗。翌日紫金佛像在王家与少林精锐护送下安抵嵩山，金刀王家与少林俗家护法一脉从此结下莫逆之交，你的威名亦随龙门一战传遍河洛江湖。'),
    ],
    choices: [
      {
        id: 'slq18_finish_reward',
        label: '拜谢玄悲大师与王元霸，领受《韦陀杵》与【少林韦陀伏魔杵】（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-094' },
          { type: 'giveItem', itemId: 'WPN-028', qty: 1 },
          { type: 'giveCombatExp', amount: 360, reason: '伊阙龙门石桥大破黄河水匪与西夏游骑拓跋烈' },
          { type: 'addSectContribution', amount: 150 },
          { type: 'modifySkill', key: '骑术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0186' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0157' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q18_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《洛阳护镖 · 金刀少林》！习得地阶绝学《韦陀杵》，获赠【少林韦陀伏魔杵】！',
            'success',
            '洛阳护镖',
          ),
        ],
      },
    ],
  },
}
