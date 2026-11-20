import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q19_QUEST_ID } from './shaolinLaymanPutianSouthQuest'

const SPEAKER_NSL_MONK_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒铁武僧',
  title: '九莲山门护法首座',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_NSL_MONK_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒磐武僧',
  title: '九莲山门铁桥护法',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_SALT_WATCH: StorySpeakerSpec = {
  kind: 'custom',
  name: '老灶户 · 林阿伯',
  title: '莆田官盐场报信人',
  factionName: '福建路百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_ONIMARU: StorySpeakerSpec = {
  kind: 'custom',
  name: '鬼丸浪人',
  title: '东瀛海寇头目',
  factionName: '东瀛海寇',
  portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
}

const SPEAKER_PIRATE_MATE: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑潮刀客 · 佐助',
  title: '东瀛海寇副首',
  factionName: '东瀛海寇',
  portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
}

function buildNslMonkA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_NSL_A',
    name: '戒铁武僧',
    title: '九莲山门护法首座',
    realm: '二流中品',
    factionName: '莆田南少林',
    sectRank: 2,
    sectRankLabel: '南宗护法',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“既携嵩山法帖而来，便请接贫僧一式南宗『铁桥硬马』！若连山门三关都过不去，休怪贫僧不放行！”',
    stats: { hp: 1560, mp: 1120, agi: 47, res: 35 },
    talents: { bone: 68, comprehension: 48, charm: 34 },
    equippedArts: { neigong: 'MA-080', qinggong: 'MA-157', move1: 'MA-106', move2: 'MA-143' },
    learnedArts: [
      { artId: 'MA-080', level: 5 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-106', level: 6 },
      { artId: 'MA-143', level: 5 },
    ],
  })
}

function buildNslMonkB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_NSL_B',
    name: '戒磐武僧',
    title: '九莲山门铁桥护法',
    realm: '二流下品',
    factionName: '莆田南少林',
    sectRank: 2,
    sectRankLabel: '南宗护法',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“阿弥陀佛！北宗师兄留神了，南拳短打贴身最重桥手沉劲！”',
    stats: { hp: 1280, mp: 880, agi: 44, res: 30 },
    talents: { bone: 64, comprehension: 44, charm: 30 },
    equippedArts: { neigong: 'MA-140', qinggong: 'MA-157', move1: 'MA-106', move2: 'MA-124' },
    learnedArts: [
      { artId: 'MA-140', level: 5 },
      { artId: 'MA-157', level: 4 },
      { artId: 'MA-106', level: 5 },
      { artId: 'MA-124', level: 5 },
    ],
  })
}

function buildPirateVanguardA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_PIRATE_A',
    name: '浪人斩首手 · 平次',
    title: '东瀛海寇先锋',
    realm: '二流下品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇先锋',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“八嘎！宋朝和尚敢坏我海船劫盐大计，统统斩了！”',
    stats: { hp: 1260, mp: 860, agi: 46, res: 27 },
    talents: { bone: 60, comprehension: 44, charm: 24 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-139', move1: 'MA-131', move2: 'MA-150' },
    learnedArts: [
      { artId: 'MA-104', level: 5 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-131', level: 5 },
      { artId: 'MA-150', level: 5 },
    ],
  })
}

function buildPirateVanguardB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_PIRATE_B',
    name: '黑潮短刀手 · 彦三',
    title: '东瀛海寇先锋',
    realm: '二流下品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇先锋',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“盐堆点着了！把这几个冲过来的宋人乱刀分尸！”',
    stats: { hp: 1200, mp: 840, agi: 47, res: 26 },
    talents: { bone: 58, comprehension: 46, charm: 22 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-158', move1: 'MA-131', move2: 'MA-115' },
    learnedArts: [
      { artId: 'MA-104', level: 5 },
      { artId: 'MA-158', level: 5 },
      { artId: 'MA-131', level: 5 },
      { artId: 'MA-115', level: 5 },
    ],
  })
}

function buildOnimaruBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_ONIMARU',
    name: '鬼丸浪人',
    title: '东瀛海寇头目',
    realm: '二流上品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇头目',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“哈哈哈哈！什么北少林南少林，在我『鬼丸流』快刀之下不过是一群秃头木桩！受死吧！”',
    stats: { hp: 1960, mp: 1520, agi: 55, res: 40 },
    talents: { bone: 70, comprehension: 58, charm: 32 },
    equippedArts: { neigong: 'MA-140', qinggong: 'MA-139', move1: 'MA-131', move2: 'MA-115' },
    learnedArts: [
      { artId: 'MA-140', level: 7 },
      { artId: 'MA-139', level: 7 },
      { artId: 'MA-131', level: 7 },
      { artId: 'MA-115', level: 6 },
    ],
  })
}

function buildPirateMate(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_PIRATE_MATE',
    name: '黑潮刀客 · 佐助',
    title: '东瀛海寇副首',
    realm: '二流中品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇副首',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“头目莫急，在下断他下盘，叫这宋人武夫插翅难逃！”',
    stats: { hp: 1480, mp: 1080, agi: 49, res: 33 },
    talents: { bone: 64, comprehension: 50, charm: 26 },
    equippedArts: { neigong: 'MA-104', qinggong: 'MA-158', move1: 'MA-132', move2: 'MA-150' },
    learnedArts: [
      { artId: 'MA-104', level: 6 },
      { artId: 'MA-158', level: 6 },
      { artId: 'MA-132', level: 6 },
      { artId: 'MA-150', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq19_01: {
    id: 'scene_slq19_01',
    title: '第一幕 · 嵩山法帖',
    subtitle: '嵩山少林寺 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，嵩山少室峰松涛阵阵。你入少林已满三载，历经汴京相国寺与洛阳伊阙龙门两场硬仗，早已被寺中上下公认为俗家护法一脉的栋梁之才。'),
      N('这日清晨，戒律院「铁掌禅师」【玄痛】长老独召你至十八铜人木桩廊前。长老案上放着一只紫檀漆盒，盒中盛着一卷以金粉题跋、加盖嵩山少林方丈宝印的楷书法帖。'),
      S('NPC-0156', '（目光如炬，缓缓展开法帖一角）“你可知福建路莆田九莲山，另有一座与我嵩山一脉相承的【莆田南少林】？”'),
      P('（肃然抱拳）“弟子曾闻古籍记载，唐初少林武僧平定海疆后南传禅武，于莆田九莲山开宗立派，号称南少林。只是数百年来山川阻隔、武风渐异，听说两宗已多年未曾正式通使往来。”'),
    ],
    onFinishEffects: [openScene('scene_slq19_02', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_02: {
    id: 'scene_slq19_02',
    title: '第二幕 · 南北芥蒂',
    subtitle: '十八铜人木桩廊',
    mandatory: true,
    beats: [
      S('NPC-0156', '（轻叹一声，将法帖小心卷好入盒）“不错。北宗重长拳大架、禅定内修；南宗擅短桥硬马、外功铁躯。近年来东南海疆频传东瀛海寇骚扰，方丈意欲重续南北少林守望之盟，特亲笔手书此卷《南北禅武同源法帖》，致意南少林当今第一高僧——『铜身罗汉』【元苦】大师。”'),
      S('NPC-0156', '“然元苦大师性情刚烈，最重实打实的筋骨功夫与经义底蕴，向来微嫌北宗门户繁文缛节。老衲观你既通经义、擅书法，又以俗家护法之身屡建实功，不拘迂腐，乃此行出使莆田的不二人选！”'),
      P('“承蒙玄痛师伯与方丈如此器重！弟子愿千里南渡，定将嵩山法帖完好呈交元苦大师，绝不坠北少林颜面！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_03', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_03: {
    id: 'scene_slq19_03',
    title: '第三幕 · 临行授爪',
    subtitle: '十八铜人木桩廊',
    mandatory: true,
    beats: [
      S('NPC-0156', '（微微颔首，忽地探出右掌，五指如钢钩扣住身旁一根碗口粗的铁木桩，轻轻一旋，木桩上顿时留下五道深逾半寸的指印）“南少林弟子个个练得一身横练硬功，铁桥硬马沉重如山。你若单凭寻常刀杖去试，反倒落了下乘。行前老衲便破例传你一门少林地阶擒拿绝技——《龙爪手》！”'),
      N('玄痛长老话音甫落，双掌连环翻飞，时而如苍龙探海、时而如神龙摆尾，三十六式《龙爪手》招招直指人体关节筋脉破绽，专克天下横练硬功！'),
      P('（全神贯注，依着玄痛长老指点演练起手七式，只觉指梢内劲吞吐灵动，刚中有柔）“好精妙的擒拿分筋之法！以《龙爪手》化劲拆桥，正可与南宗铁桥硬马一较高下！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_04', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_04: {
    id: 'scene_slq19_04',
    title: '第四幕 · 嘱托启程',
    subtitle: '十八铜人木桩廊',
    mandatory: true,
    beats: [
      S('NPC-0156', '（将紫檀法帖盒交予你手，神色郑重）“切记！你此去莆田是替南北少林通好，非为争强斗狠。若南宗门人以武相试，须以堂堂正正之艺赢其敬重，切不可伤人性命；若遇外敌犯境，则当显我少林金刚雷霆之威！”'),
      P('（将法帖盒贴身收妥，向玄痛长老深深一揖）“弟子谨遵师伯法谕！这就辞别嵩山，千里南渡莆田九莲山！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_05', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_05: {
    id: 'scene_slq19_05',
    title: '第五幕 · 剑指闽海',
    subtitle: '嵩山脚下 · 南渡官道',
    mandatory: true,
    beats: [
      N('你背负行囊与嵩山法帖，一路南下渡长江、越武夷，历时月余终见闽中碧海连天、九莲山峦翠叠。莆田南少林古刹红墙隐于荔枝密林之间，海风裹挟着雄浑的练武喝声迎面扑来！'),
    ],
    choices: [
      {
        id: 'slq19_accept_quest',
        label: '怀揣嵩山法帖启程，前往【莆田南少林 · 九莲山门演武坪】拜山',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q19_QUEST_ID, stepId: 'jiulian_three_gates' },
          setStep(SHAOLIN_Q19_QUEST_ID, 'jiulian_three_gates'),
          toast('已开启《莆田南渡 · 南北少林》！请前往【莆田南少林 · 九莲山门演武坪】呈递法帖！', 'talk', '莆田南渡'),
        ],
      },
    ],
  },

  scene_slq19_06: {
    id: 'scene_slq19_06',
    title: '第六幕 · 九莲山门',
    subtitle: '莆田南少林 · 九莲山门演武坪',
    mandatory: true,
    beats: [
      N('行至九莲山门演武坪，只见数十名赤膊练功、筋骨如铜铸般的南少林武僧正齐刷刷扎着四平大马，双臂互撞发出砰砰沉响，气势竟丝毫不逊嵩山罗汉堂！'),
      N('见你一身北地青布俗家劲装、蓄发束巾缓步登阶，两名膀阔腰圆的守山护法武僧——【戒铁】与【戒磐】立刻踏前一步，抱拳拦住去路。'),
      S(SPEAKER_NSL_MONK_A, '（打量你一番，语气不卑不亢却隐带审视）“阿弥陀佛！来者止步。看施主打扮，并非出家僧人，却手捧嵩山紫檀法帖？莫非嵩山少林无人了，竟派一名带发俗家弟子来见我南宗元苦师祖？”'),
      P('（神色从容，双手捧盒微礼）“二位师兄有礼。在下乃嵩山少林寺俗家护法弟子，奉玄慈方丈与玄痛长老之命，特携《南北禅武同源法帖》拜会元苦大师。佛法不择缁素，禅武岂分俗僧？”'),
    ],
    onFinishEffects: [openScene('scene_slq19_07', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_07: {
    id: 'scene_slq19_07',
    title: '第七幕 · 铁桥硬马',
    subtitle: '九莲山门演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_NSL_MONK_B, '（闻言哈哈大笑，双臂一振竟响起金铁交鸣般的筋骨爆响）“好一句『禅武岂分俗僧』！只是我九莲山有个三百年的老规矩——凡北宗使者携帖入山，须闯过我南少林『铁桥硬马三关』，方显嵩山正统气象！”'),
      S(SPEAKER_NSL_MONK_A, '（沉声接话）“第一关验马步根基，第二关试铁桥臂力，第三关便由贫僧与戒磐师弟合阵讨教北宗绝艺！若{gender:师兄|女施主}能正面闯过，我等即刻鸣钟迎客，请元苦师祖出殿相见！”'),
      P('（微微一笑，将紫檀法帖盒交由旁侧知客小沙弥暂捧，缓步踏入演武场中）“客随主便！北宗弟子久仰南少林铁桥硬马威名，今日便以武会友，请二位师兄赐教！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_08', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_08: {
    id: 'scene_slq19_08',
    title: '第八幕 · 南北初锋',
    subtitle: '九莲山门演武坪 · 闯三关',
    illustrationUrl: '/assets/quests/sl_19_jiulian_spar.jpg',
    illustrationCaption: '九莲山门演武坪 · 北宗龙爪手对决南宗铁桥硬马，以武会友赢尽敬重',
    mandatory: true,
    beats: [
      N('头两关验桩试桥，你沉腰扎下少林罗汉四平马，任由四名南宗武僧轮番撞肩推肘，脚下青砖踏裂半寸而身形纹丝不动，满坪南少林弟子齐声喝彩！'),
      N('紧接着第三关开锣——戒铁、戒磐二位护法齐步入场，双臂如铸铁横架，短打贴身，劲风扑面！你五指微曲，摆开玄痛长老临行前所授的《龙爪手》起手式！'),
    ],
    onFinishEffects: [openScene('scene_slq19_09', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_09: {
    id: 'scene_slq19_09',
    title: '第九幕 · 闯关会友',
    subtitle: '九莲山门演武坪（车轮连战 切磋）',
    mandatory: true,
    beats: [
      N('戒铁与戒磐施展南宗正统《铁线拳》与《盘山铁布衫》，桥手沉重如铁柱压顶！你运起《龙爪手》灵动擒拿，专破硬桥劲道，与二僧切磋较技！'),
    ],
    choices: [
      {
        id: 'slq19_spar_nsl',
        label: '以《龙爪手》会友，闯【戒铁】与【戒磐】铁桥硬马关！（车轮连战 切磋）',
        subLabel: '点到为止，以堂堂正正之艺赢得南少林敬重',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNslMonkA() },
            extraOpponents: [{ kind: 'custom', npc: buildNslMonkB() }],
            rule: 'spar',
            forbidEscapeReason: '身负嵩山法帖拜山，岂可半途退场！',
            introText: '【车轮连战 · 九莲闯关】切磋莆田南少林护法【戒铁武僧】与【戒磐武僧】！',
            onWin: [openScene('scene_slq19_10', SHAOLIN_Q19_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('南宗铁桥硬马沉猛异常，调匀内息后再登演武坪切磋！', 'warn', '九莲三关'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_10: {
    id: 'scene_slq19_10',
    title: '第十幕 · 化桥服众',
    subtitle: '九莲山门演武坪',
    mandatory: true,
    beats: [
      N('二十余合切磋，你避实击虚，一招「捕风式」轻扣戒磐肘弯曲池穴卸去其千斤桥力，随即反手一式「拿云式」虚按戒铁肩井，三寸之外收劲停掌，风姿飒爽！'),
      S(SPEAKER_NSL_MONK_A, '（怔了片刻，旋即心服口服，双掌合十深深一揖）“阿弥陀佛！北宗《龙爪手》果然名不虚传！{gender:师兄|女施主}既破我兄弟铁桥硬马，又处处留情不伤筋骨，戒铁心服口服！”'),
      S(SPEAKER_NSL_MONK_B, '（咧嘴大笑，竖起大拇指）“痛快！谁再说北少林俗家弟子只会耍花架子，俺戒磐头一个不答应！快鸣钟请元苦师祖——”'),
    ],
    onFinishEffects: [openScene('scene_slq19_11', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_11: {
    id: 'scene_slq19_11',
    title: '第十一幕 · 盐场告急',
    subtitle: '九莲山门石阶',
    mandatory: true,
    beats: [
      N('迎客钟声尚未敲响，山门石阶下却忽踉跄奔上一名浑身血污、衣衫焦黑的渔民老者，扑倒在演武坪青石上凄声呼救！'),
      S(SPEAKER_SALT_WATCH, '（涕泪横流，气喘吁吁）“大师们救命啊！半个时辰前，三艘东瀛海寇的快船借着暮色偷袭了兴化海滨官盐场！为首那个叫『鬼丸浪人』的东瀛恶魔刀快如鬼，已经杀伤十余名盐丁，还把百余户老小围在盐仓里要纵火抢盐啊！”'),
      N('话音未落，大雄宝殿方向一道铜钟般沉浑的佛号响彻山林——只见一位双臂古铜如铁、气势渊停岳峙的老僧缓步踏出山门，正是南少林「铜身罗汉」【元苦】大师！'),
    ],
    onFinishEffects: [openScene('scene_slq19_12', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_12: {
    id: 'scene_slq19_12',
    title: '第十二幕 · 同仇敌忾',
    subtitle: '九莲山门演武坪',
    mandatory: true,
    beats: [
      S('NPC-0124', '（浓眉倒竖，目含金刚怒火）“阿弥陀佛！这群东瀛海寇屡屡犯我闽海，屠戮无辜百姓，实在罪不容诛！戒铁、戒磐，即刻在钟鼓禅院演武坪点齐三十名武僧，随老衲火速驰援海滨盐场！”'),
      P('（大步出列，手按兵刃凛然抱拳）“元苦大师！南北少林同气连枝，保境安民岂分你我？晚辈虽是北宗俗家弟子，愿作先锋，与南宗诸位师兄并肩夜赴盐场，斩杀那东瀛海寇头目！”'),
      S('NPC-0124', '（目光如电深深看了你一眼，朗声大笑）“好！好一个嵩山侠骨！走，速赴钟鼓禅院演武坪集结出发！”'),
    ],
    choices: [
      {
        id: 'slq19_go_saltfield',
        label: '前往【大雄宝殿 · 钟鼓禅院 · 演武坪】会师，驰援莆田海滨盐场',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q19_QUEST_ID, 'saltfield_night_raid'),
          toast('九莲三关已破！请前往【大雄宝殿 · 钟鼓禅院 · 演武坪】会师驰援海滨盐场！', 'talk', '莆田南渡'),
        ],
      },
    ],
  },

  scene_slq19_13: {
    id: 'scene_slq19_13',
    title: '第十三幕 · 火照盐滩',
    subtitle: '钟鼓禅院集结 · 疾奔海滨盐场',
    mandatory: true,
    beats: [
      N('夜幕低垂，海风咸湿。你与戒铁、戒磐及三十名南少林武僧在钟鼓禅院演武坪取齐兵刃火把，借着夜色施展轻功疾奔十余里，直抵莆田海滨官盐场！'),
      N('远远便见冲天火光映红半边夜空，雪白的盐堆旁横七竖八躺着受伤盐丁，数十名身着黑衣浪人服、手持弧形长刀的东瀛海寇正狂笑着向盐仓步步紧逼！'),
      S(SPEAKER_NSL_MONK_A, '（双目赤红，举棍怒喝）“东瀛贼寇休伤百姓！南少林武僧在此，众师弟随我救出盐仓老小！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_14', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_14: {
    id: 'scene_slq19_14',
    title: '第十四幕 · 破阵救民',
    subtitle: '莆田海滨盐场 · 盐仓外围',
    mandatory: true,
    beats: [
      N('元苦大师独自堵住海滩退路以防海寇乘船逃窜，戒铁与戒磐率众武僧扑向火场抢救受困灶户；两名凶悍的东瀛先锋浪人见你冲在最前，怪叫着挥动长短双刀迎面劈来！'),
      P('（冷哼一声，内劲贯注双掌与兵刃）“海寇犯境，杀我宋民！今日便教你们葬身闽海！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_15', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_15: {
    id: 'scene_slq19_15',
    title: '第十五幕 · 血战盐滩',
    subtitle: '海滨盐场外围（1v2 实战）',
    mandatory: true,
    beats: [
      N('海风呼啸，火光摇曳！东瀛海寇先锋平次与彦三刀法诡谲迅疾，一左一右夹攻而来！你稳守中宫，奋起神威迎战！'),
    ],
    choices: [
      {
        id: 'slq19_fight_vanguard',
        label: '斩破海寇前锋，迎战【平次】与【彦三】！（1v2 实战）',
        subLabel: '打开盐仓血路，护送百姓撤离火场',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPirateVanguardA() },
            extraOpponents: [{ kind: 'custom', npc: buildPirateVanguardB() }],
            rule: 'story_trial',
            forbidEscapeReason: '盐仓百余百姓危在旦夕，绝不可退后半步！',
            introText: '【1v2 盐场破锋】迎战东瀛海寇先锋【平次】与【彦三】！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q19_vanguard_cleared', value: true },
              openScene('scene_slq19_16', SHAOLIN_Q19_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('海寇双刀迅疾，暂退南宗武僧阵后回气再杀入盐场！', 'warn', '盐场夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_16: {
    id: 'scene_slq19_16',
    title: '第十六幕 · 鬼丸现身',
    subtitle: '海滨盐场中央 · 火光决战',
    illustrationUrl: '/assets/quests/sl_19_saltfield_pirates.jpg',
    illustrationCaption: '莆田海滨盐场 · 夜战火光冲天，与南少林同门并肩力敌东瀛海寇头目鬼丸浪人',
    mandatory: true,
    beats: [
      N('两名海寇先锋被你连环震杀当场！戒铁、戒磐趁势砸开盐仓木锁，将百余名哭喊的灶户老小护送至安全高坡。'),
      N('就在此时，一道森冷凄厉的刀芒骤然劈裂火幕！一名头戴破旧斗笠、腰佩双刃野太刀的瘦高东瀛浪人踏着盐堆凌空扑落，身旁跟着杀气腾腾的副首佐助！'),
      S(SPEAKER_ONIMARU, '（缓缓拔出三尺寒光长刀，舔了舔刀锋冷笑）“哟，好俊的功夫！难怪敢坏本大爷的好事。佐助，旁边的和尚交给手下缠住，咱们俩先把这个北宋小子剁成两段！”'),
      S(SPEAKER_PIRATE_MATE, '（狞笑抽刀）“遵命！鬼丸大人！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_17', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_17: {
    id: 'scene_slq19_17',
    title: '第十七幕 · 夜斩海寇',
    subtitle: '海滨盐场（车轮连战 首领决战）',
    mandatory: true,
    beats: [
      N('鬼丸浪人刀法快如鬼魅，隐隐带着断魂杀意，佐助则从侧翼疾掠补刀！海潮拍岸、火光冲天，你沉气凝神，以少林正统绝学正面迎击东瀛海寇头目！'),
    ],
    choices: [
      {
        id: 'slq19_fight_onimaru',
        label: '火光中决战东瀛海寇头目【鬼丸浪人】与【佐助】！（二流上品 车轮连战）',
        subLabel: '斩杀海寇首恶，护全莆田海滨盐场百姓',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildOnimaruBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildPirateMate() }],
            rule: 'story_trial',
            forbidEscapeReason: '东瀛海寇头目近在眼前，今日必斩此獠以安闽海！',
            introText: '【车轮连战 · 盐场斩寇】决战东瀛海寇头目【鬼丸浪人】与副首【佐助】！',
            onWin: [openScene('scene_slq19_18', SHAOLIN_Q19_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('鬼丸浪人快刀凌厉，暂借盐堆掩护调匀内息后再决生死！', 'warn', '盐场夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_18: {
    id: 'scene_slq19_18',
    title: '第十八幕 · 刀断海平',
    subtitle: '莆田海滨盐场',
    mandatory: true,
    beats: [
      N('数十合生死搏杀，你先以沉雄内劲震碎佐助短刀、一掌将其击毙于盐堆之下；鬼丸浪人见势不妙，倾尽全力劈出一记鱼死网破的绝命快刀！'),
      N('千钧一发之际，你脚步微错，左手《龙爪手》闪电般扣住鬼丸持刀手腕脉门，咔嚓一声扭断其腕骨，右手重劲顺势轰入其胸口膻中大穴！鬼丸浪人惨嚎一声吐血飞出三丈，当场气绝身亡！'),
      N('余下海寇见头目伏诛，又见海滩退路早被铜身罗汉元苦大师以一双铁掌尽数封死，顿时溃不成军，大半束手就擒！'),
    ],
    onFinishEffects: [openScene('scene_slq19_19', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_19: {
    id: 'scene_slq19_19',
    title: '第十九幕 · 凯旋九莲',
    subtitle: '莆田海滨盐场 · 黎明前夕',
    mandatory: true,
    beats: [
      N('天色微明，兴化军水师赶到接管俘虏与盐场，百余名脱险灶户跪地高呼“活菩萨”。戒铁与戒磐满身烟灰，扶着受伤的肩膀走到你身旁，眼中再无半点南北之隔。'),
      S(SPEAKER_NSL_MONK_A, '（畅快大笑，重重拍了拍你的臂膀）“北宗兄弟！昨夜若非你阵斩鬼丸浪人，咱们弟兄至少要折损十来个！从今往后，你便是我九莲山生死之交！”'),
      S('NPC-0124', '（负手立于晨光之中，神色罕见地温和下来）“阿弥陀佛。盐场既安，请{gender:少侠|女侠}随老衲回返【大雄正殿 · 佛前蒲团】，老衲当焚香展读嵩山法帖，并有一份厚礼相赠。”'),
    ],
    choices: [
      {
        id: 'slq19_return_main',
        label: '随元苦大师凯旋【大雄宝殿 · 大雄正殿 · 佛前蒲团】',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q19_QUEST_ID, 'yuanku_confer'),
          toast('盐场海寇已尽数荡平！请前往【大雄正殿 · 佛前蒲团】拜见元苦大师！', 'success', '莆田南渡'),
        ],
      },
    ],
  },

  scene_slq19_20: {
    id: 'scene_slq19_20',
    title: '第二十幕 · 佛前展帖',
    subtitle: '莆田南少林 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内檀香馥郁，九莲山晨钟悠扬。你净手焚香，将紫檀盒中的《南北禅武同源法帖》双手呈递元苦大师。'),
      N('元苦大师徐徐展开法帖，只见字字苍劲浑厚，既述达摩祖师一苇渡江之本源，又言中原与闽海唇齿相依、南北少林当共护苍生之大义。大师凝视良久，长眉微颤。'),
      S('NPC-0124', '“善哉！善哉！玄慈方丈胸怀天下，玄痛师兄识人精准。老衲往日总觉北宗拘泥名位、轻视南宗粗犷，直到昨夜见你以俗家之身闯三关而不骄、斩海寇而不惧，方知嵩山少林之正气，数百年来未曾衰微半分！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_21', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_21: {
    id: 'scene_slq19_21',
    title: '第二十一幕 · 破除门户',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0124', '（朗声吩咐左右执事僧）“传老衲法谕：自今日起，莆田南少林与嵩山少林重订百年同源之盟，南北弟子往来挂单、论禅习武，一视同仁！”'),
      P('（肃然合十行礼）“能亲见南北少林尽释前嫌、重归同源，实乃晚辈毕生荣幸！玄慈方丈与玄痛师伯闻之，定当欣慰非常！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_22', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_22: {
    id: 'scene_slq19_22',
    title: '第二十二幕 · 南宗双绝',
    subtitle: '大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_19_yuanku_scroll.jpg',
    illustrationCaption: '大雄正殿 · 铜身罗汉元苦打破门户之见，亲授《盘山铁布衫（大成）》与《铁线拳》',
    mandatory: true,
    beats: [
      S('NPC-0124', '（起身步下莲台，取过两卷泛黄古籍，亲手置于你掌中）“玄痛师兄既授你北宗地阶《龙爪手》，老衲亦不能小气！这两卷乃我莆田南少林镇派秘传——一曰《盘山铁布衫（大成）》，练至高深处铜皮铁骨、刀枪难伤；二曰《铁线拳》，以气催桥、寸劲裂石！今日老衲打破南北门户之见，将此二艺尽数传你！”'),
      N('满殿南宗武僧闻言皆露出惊叹与欣慰之色。元苦大师更当殿以铜身内劲替你疏通双臂三阴三阳经脉，将南宗内壮运气与北宗《龙爪手》刚柔并济之法一一印证！'),
    ],
    onFinishEffects: [openScene('scene_slq19_23', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_23: {
    id: 'scene_slq19_23',
    title: '第二十三幕 · 禅武合璧',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（只觉浑身气血如江河奔涌，双臂筋骨隐隐生出金铁沉浑之感，忙躬身大礼拜谢）“元苦大师胸襟如海，晚辈铭感五内！定将南北少林绝学融会贯通，绝不负两宗高僧厚望！”'),
      S('NPC-0124', '（微笑颔首，提笔写就回书封入紫檀盒中）“好孩子，携老衲回书北返嵩山罢。日后你若再临闽海，九莲山门随时为你敞开！”'),
    ],
    onFinishEffects: [openScene('scene_slq19_24', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_24: {
    id: 'scene_slq19_24',
    title: '第二十四幕 · 同源佳话',
    subtitle: '九莲山麓 · 北归之路',
    mandatory: true,
    beats: [
      N('你辞别元苦大师与戒铁、戒磐诸僧，怀揣南宗回书与三门旷世绝学踏上北归嵩山之路。此役之后，「南北少林本一家」的佳话传遍大江南北，你在少林俗家护法一脉中的威望已然如日中天。'),
    ],
    choices: [
      {
        id: 'slq19_finish_reward',
        label: '拜谢元苦大师与玄痛长老，领受《龙爪手》《盘山铁布衫（大成）》《铁线拳》（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-062' },
          { type: 'teachMartialArt', artId: 'MA-080' },
          { type: 'teachMartialArt', artId: 'MA-106' },
          { type: 'giveCombatExp', amount: 460, reason: '九莲山闯三关、盐场斩杀鬼丸浪人并促成南北少林同源之盟' },
          { type: 'addSectContribution', amount: 180 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0124' }, delta: 25 },
          { type: 'completeQuest', questId: SHAOLIN_Q19_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《莆田南渡 · 南北少林》！习得《龙爪手》《盘山铁布衫（大成）》《铁线拳》，获元苦大师深厚敬重！',
            'success',
            '莆田南渡',
          ),
        ],
      },
    ],
  },
}
