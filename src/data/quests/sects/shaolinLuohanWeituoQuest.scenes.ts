import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, teachArtNow, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q06_QUEST_ID } from './shaolinLuohanWeituoQuest'

const SPEAKER_BAIMA_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '白马寺知客僧 · 明觉',
  title: '释源白马寺僧侣',
  factionName: '洛阳白马寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_FAKE_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '西夏一品堂假僧 · 赫连七',
  title: '西夏一品堂暗探',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_ESOTERIC_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '西夏密宗先锋 · 桑杰',
  title: '一品堂番僧护法',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_MOHEBA: StorySpeakerSpec = {
  kind: 'custom',
  name: '西夏密宗番僧 · 摩诃巴',
  title: '一品堂客卿 · 密宗降魔僧',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

function buildFakeMonkAlpha(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ06_FAKEMONK_A',
    name: '西夏一品堂假僧 · 赫连七',
    title: '伪装译经僧的一品堂死士',
    realm: '二流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“既然被少林秃驴识破了党项梵押，那便一把火烧光白马寺，一个活口也别留！”',
    stats: { hp: 1020, mp: 620, agi: 44, res: 24 },
    talents: { bone: 64, comprehension: 56, charm: 38 },
    equippedArts: { neigong: 'MA-232', move1: 'MA-133', move2: 'MA-152' },
    learnedArts: [{ artId: 'MA-232', level: 5 }, { artId: 'MA-133', level: 5 }, { artId: 'MA-152', level: 4 }],
  })
}

function buildFakeMonkBeta(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ06_FAKEMONK_B',
    name: '西夏一品堂假僧 · 嵬名铁',
    title: '潜伏白马寺的一品堂暗哨',
    realm: '二流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“塔基与宝殿的火油早已泼好，少林和尚自寻死路！”',
    stats: { hp: 980, mp: 600, agi: 46, res: 23 },
    talents: { bone: 62, comprehension: 55, charm: 36 },
    equippedArts: { neigong: 'MA-232', move1: 'MA-152', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-232', level: 5 }, { artId: 'MA-152', level: 5 }, { artId: 'MA-133', level: 4 }],
  })
}

function buildEsotericVanguard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ06_SANGJIE',
    name: '西夏密宗先锋 · 桑杰',
    title: '齐云塔守门密宗番僧',
    realm: '二流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“摩诃巴法王已在塔顶礼迎舍利，中原秃驴休想踏上齐云石阶半步！”',
    stats: { hp: 1080, mp: 640, agi: 46, res: 26 },
    talents: { bone: 66, comprehension: 56, charm: 38 },
    equippedArts: { neigong: 'MA-232', move1: 'MA-152', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-232', level: 5 }, { artId: 'MA-152', level: 5 }, { artId: 'MA-133', level: 5 }],
  })
}

function buildMohebaShakenBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ06_MOHEBA_SHAKEN',
    name: '西夏密宗番僧 · 摩诃巴（阵势已破）',
    title: '西夏一品堂客卿 · 铁杖番僧',
    realm: '二流中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“可恨的小和尚竟看出本法王三面合击死角、封死下层塔梯！也罢，凭我手中降魔铁杖照样砸碎你天灵盖！”',
    stats: { hp: 1380, mp: 960, agi: 48, res: 32 },
    talents: { bone: 74, comprehension: 62, charm: 40 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-152', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-243', level: 5 }, { artId: 'MA-152', level: 5 }, { artId: 'MA-133', level: 5 }],
  })
}

function buildMohebaBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ06_MOHEBA',
    name: '西夏密宗番僧 · 摩诃巴',
    title: '西夏一品堂客卿 · 铁杖番僧',
    realm: '二流中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“中原佛门早已腐朽！这齐云塔中的古佛舍利，合该归我大白高国兴庆府供奉！看杖！”',
    stats: { hp: 1620, mp: 1080, agi: 53, res: 36 },
    talents: { bone: 78, comprehension: 66, charm: 40 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-152', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-152', level: 6 }, { artId: 'MA-133', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq06_01: {
    id: 'scene_slq06_01',
    title: '第一幕 · 洛阳急羽',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，嵩山暮云低垂。一只灰羽信鸽振翅掠过山门，径直落入罗汉堂演武正殿！降魔尊者玄苦拆开鸽足竹筒，展开墨迹急促的素笺，沉稳如山的眉宇间霎时浮起一层凝重霜色。'),
      S('NPC-0126', '（将素笺递予你阅览）“阿弥陀佛！此乃正在洛阳白马寺校经的玄悲师弟所发密信。近半月来，一批自称自凉州东来译经的挂单僧入住古刹，暗藏弯刀与松脂火油，疑为西夏一品堂遣来焚毁清凉台梵文孤本、劫夺齐云塔舍利的魔僧！”'),
      S('NPC-0126', '“你在颍阳镇{ifFlagEq:sl_q05_mercy_verdict=rehabilitate|化寇赈荒、仁勇兼备|铁面擒匪、果决老练}，且经义深厚、熟通汉唐写本笔法。洛阳白马寺乃东汉永平年间「释源祖庭」，与我少林同气连枝，今夜便由你星夜驰援洛阳，助玄悲师弟破奸降魔！”'),
      P('（双手合十肃然受命）“师伯放心！释源古刹容不得西夏魔僧亵渎！弟子这便领令出山！”'),
    ],
    choices: [
      {
        id: 'slq06_accept_fast',
        label: '【轻装急驰】接过通关木牌，即刻催动轻功星夜奔袭百二十里赶赴洛阳！',
        subLabel: '承接任务，前往【洛阳白马寺 · 白马大佛宝殿】会合玄悲',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q06_march_style', value: 'swift' },
          { type: 'startQuest', questId: SHAOLIN_Q06_QUEST_ID, stepId: 'rush_to_baimasi' },
          setStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
          toast('已承接【释源白马 · 韦陀降魔】！请速赴【洛阳白马寺 · 白马大佛宝殿（ly_bm_main）】会合玄悲！', 'talk', '韦陀降魔'),
        ],
      },
      {
        id: 'slq06_accept_ready',
        label: '【整备军械】略备护寺戒具与湿布火药囊，稳妥兼程驰援白马寺！',
        subLabel: '承接任务，前往【洛阳白马寺 · 白马大佛宝殿】会合玄悲',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q06_march_style', value: 'prepared' },
          { type: 'startQuest', questId: SHAOLIN_Q06_QUEST_ID, stepId: 'rush_to_baimasi' },
          setStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
          toast('已承接【释源白马 · 韦陀降魔】！请速赴【洛阳白马寺 · 白马大佛宝殿（ly_bm_main）】会合玄悲！', 'talk', '韦陀降魔'),
        ],
      },
    ],
  },

  scene_slq06_02: {
    id: 'scene_slq06_02',
    title: '第二幕 · 白马火起 · 双线抉择',
    subtitle: '洛阳白马寺 · 白马大佛宝殿（火场战术）',
    illustrationUrl: '/assets/quests/sl_06_baima_fire.jpg',
    illustrationCaption: '白马寺夜变 · 西夏一品堂假僧双线纵火，玄悲与你联手护住释源古刹',
    mandatory: true,
    beats: [
      N('三更寒露湿袍，你潜入洛阳城东【白马大佛宝殿】后廊，见大韦陀僧玄悲正手按一根乌沉沉的八棱熟铜包钢重杵静立佛龛之侧，白马寺知客僧明觉满面焦灼。话音未落，前廊骤然擦起刺耳火折声，两桶松脂火油轰然倾燃！'),
      S(SPEAKER_FAKE_MONK, '（撕裂灰褐僧袖，亮出西夏皮护腕与弯刀狞笑）“玄悲老和尚还真从嵩山搬了救兵！可惜晚了——摩诃巴法王已带人登齐云塔取舍利，清凉台藏经阁与塔前长廊已两处起火，你们顾头不顾尾，且陪经卷化灰罢！”'),
      P('（冷喝指着供桌散落伪经）“休得狂吠！你等连《四十二章经》汉唐写本笔法都伪造不全，落款更带党项官署花押，早已露了马脚！”'),
      S('NPC-0157', '（重杵挥风震飞滚落油桶，却因牵动左肋旧伤微微蹙眉）“明觉速鸣钟唤众僧救火！贼人分作两路——清凉台经阁已燃起浓烟，千年梵文孤本顷刻将毁；而塔前长廊更有两路纵火死士直扑齐云塔基！贫僧先稳住大殿火势，师侄速择一路急救！”'),
    ],
    choices: [
      {
        id: 'slq06_save_sutras',
        label: '【火海抢救孤本佛经】催动轻功穿烟冲入清凉台救出唐代孤本，单截守阁死士！',
        subLabel: '保全千年孤本获玄悲深重赏识，且避开双匪合击（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需实战身法 ≥ 45 或《穿云纵》≥ 3 重',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 45 },
            { type: 'learnedArtAtLeast', artId: 'MA-139', minLevel: 3 },
          ],
        },
        effects: [openScene('scene_slq06_03_sutras', SHAOLIN_Q06_QUEST_ID)],
      },
      {
        id: 'slq06_intercept_vanguard',
        label: '【直扑塔道截杀纵火先锋】令寺僧救火护经，你直扑前院连斩两路死士、护住塔基！',
        subLabel: '零门槛铁血截杀；车轮连战赫连七与嵬名铁，免烧塔基（怒目杀业 +1）',
        tone: 'danger',
        effects: [openScene('scene_slq06_04_vanguard', SHAOLIN_Q06_QUEST_ID)],
      },
    ],
  },

  scene_slq06_03_sutras: {
    id: 'scene_slq06_03_sutras',
    title: '第三幕 · 火海抢经',
    subtitle: '洛阳白马寺 · 清凉台经阁（1v1 截敌）',
    mandatory: true,
    beats: [
      N('你身法骤展如苍鹰掠火，踩着青瓦飞檐一口气穿入烈焰翻腾的清凉台藏经阁！浓烟滚滚间，你一眼认出紫檀经橱内盛放汉唐梵文孤本的樟木漆匣，双臂一抄将整匣孤本护入怀中，破窗跃出将经匣稳稳抛予阁外接应的白马寺众僧！'),
      S(SPEAKER_FAKE_MONK, '（提着雪亮西夏弯刀从火廊斜刺杀出，目眦欲裂）“该死的小秃驴！竟敢坏我毁经大计，把命留下！”'),
      N('眼见嵬名铁被赶来的玄悲与武僧隔绝在前院，此刻挡在你身前的仅余恼羞成怒的赫连七一人！你护定身后经阁台阶，沉步迎战！'),
    ],
    choices: [
      {
        id: 'slq06_fight_helian',
        label: '力战纵火死士【赫连七】（二流下品，1v1）',
        subLabel: '孤本已安然抢出，速擒赫连七驰援齐云古塔',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildFakeMonkAlpha() },
            rule: 'story_trial',
            forbidEscapeReason: '清凉台火势未息，必须当场制伏赫连七以断贼焰！',
            introText: '【火海护经】于清凉台火场前一对一迎战西夏一品堂死士【赫连七（二流下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q06_sutras_saved', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              openScene('scene_slq06_05_teach', SHAOLIN_Q06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '浓烟呛目被赫连七弯刀逼退，幸得玄悲师伯挥杵救下！调息后可再赴【白马大佛宝殿】续战。',
                'warn',
                '韦陀降魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq06_04_vanguard: {
    id: 'scene_slq06_04_vanguard',
    title: '第三幕 · 截杀先锋',
    subtitle: '洛阳白马寺 · 塔前长廊（车轮连战）',
    mandatory: true,
    beats: [
      N('你大喝一声命明觉领寺僧急往清凉台泼水抢经，自身则如离弦之箭越过掀翻的供桌，直扑通往齐云塔基的青石长廊！两名西夏死士正扛着浸油火把疾奔塔门，见你拦路顿时凶相毕露！'),
      S(SPEAKER_FAKE_MONK, '（与嵬名铁一左一右亮出弯刀与狼牙铁棒）“少林小辈竟敢独拦前锋？弟兄并肩上，先砍翻他再火烧齐云塔基！”'),
      N('火光映照古刹朱柱，弯刀与铁棒呼啸合围！你稳扎马步封死长廊要隘，绝不放半点火星近得古塔！'),
    ],
    choices: [
      {
        id: 'slq06_fight_fakemonks',
        label: '死守塔道！车轮连战西夏假僧【赫连七】与【嵬名铁】（二流下品 × 2）',
        subLabel: '截杀纵火先锋，保全齐云塔基无恙',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildFakeMonkAlpha() },
            extraOpponents: [{ kind: 'custom', npc: buildFakeMonkBeta() }],
            rule: 'story_trial',
            forbidEscapeReason: '齐云塔基危在旦夕，绝不可放西夏纵火先锋越雷池一步！',
            introText: '【白马伏奸】于塔前长廊车轮连战西夏一品堂死士【赫连七】与【嵬名铁】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q06_pagoda_base_saved', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              openScene('scene_slq06_05_teach', SHAOLIN_Q06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被西夏假僧连环逼退，幸得玄悲师伯一杵荡开敌刃救下！调息后可再赴【白马大佛宝殿】续战。',
                'warn',
                '韦陀降魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq06_05_teach: {
    id: 'scene_slq06_05_teach',
    title: '第四幕 · 临阵授杵',
    subtitle: '白马大佛宝殿 · 韦陀真传',
    mandatory: true,
    beats: [
      N('激斗方歇，白马寺武僧闻钟蜂拥而至，将重伤的西夏假僧捆缚严实、渐次扑灭院中火势。明觉急步奔报：{ifFlag:sl_q06_sutras_saved|清凉台千年梵文孤本竟全数安然抢出，无一焚毁！|齐云塔基石柱丝毫未损，经阁火势亦在众僧抢救下受控！}唯西夏密宗番僧摩诃巴已携鎏金舍利函登上齐云古塔，并在塔阶布下番僧暗伏！'),
      S('NPC-0157', '（目露深重赞许，将四十九斤八棱熟铜包钢重杵横举胸前）“{ifFlag:sl_q06_sutras_saved|你冒烈焰抢出释源孤本、复单骑擒奸，护法悲心堪比古德！|你果断截杀纵火先锋、护住齐云塔基，铁血担当尽显罗汉威仪！}贫僧方才硬震火桶牵动左肋旧创，恐难于狭窄塔顶久战。今日时机虽急，便临阵传你少林七十二绝技之《韦陀杵》九式真诀！”'),
      N('玄悲足尖轻点青砖，四十九斤重杵在他掌中竟轻若灵蛇、重如岳峙！「韦陀献杵」稳守中宫，「伏魔震岳」「金光破邪」连环砸落，无形杵风竟将殿前青砖震起三寸尘浪！'),
      S('NPC-0157', '“《韦陀杵》贵在「以重制重、借地脉生雷霆」！摩诃巴的西夏秘藏玄功外坚内燥，你运此杵直击中宫便可震碎其罡气！且携贫僧这根宝杵登塔，齐云古塔十三层石阶窄仄、番僧必依地势三面夹击，务须善择阵位破之！”'),
    ],
    choices: [
      {
        id: 'slq06_go_pagoda',
        label: '铭记《韦陀杵》九式真诀，手提重杵直奔【齐云密檐舍利古塔】！',
        subLabel: '当场习得地阶绝技《韦陀杵》(MA-094)，前往齐云古塔破阵斩魔',
        tone: 'gold',
        effects: [
          teachArtNow('MA-094'),
          setStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
          toast(
            '已临阵习得《韦陀杵》！请速赴【洛阳白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】布阵斩魔！',
            'success',
            '韦陀降魔',
          ),
        ],
      },
    ],
  },

  scene_slq06_06_array: {
    id: 'scene_slq06_06_array',
    title: '第五幕 · 齐云塔阵 · 阵位部署',
    subtitle: '洛阳白马寺 · 齐云密檐舍利古塔（罗汉战阵）',
    mandatory: true,
    beats: [
      N('秋夜明月高悬，十三层青砖密檐的【齐云古塔】矗立于火光余烟之外。你提着四十九斤重杵疾掠至塔院前，只见塔门处已有密宗先锋番僧桑杰横持狼牙铁棒把守，塔身三层飞檐隐见暗哨，而十三层塔刹之下，一道披着绛红喇嘛袍、挂着白骨念珠的魁梧身影正俯视而下，正是【摩诃巴】！'),
      S(SPEAKER_MOHEBA, '（居高嗤笑，手中乌黑符文铁杖遥指你）“玄悲老儿不敢亲自登塔，竟派个小沙弥提着他的韦陀杵来送死？本法王已于塔门与檐角布下三面合击之势，看你如何上得塔顶！”'),
      P('（重杵往青石一顿，火星四溅）“阿弥陀佛！佛法无分胡汉，却分正邪！你披僧衣而行盗宝纵火之恶，今夜定叫你伏诛塔下！”'),
      N('你冷静扫视齐云古塔：正门燃灯石阶宽阔，却正中桑杰与上下伏兵的三面夹击；反观塔身西侧密檐砖雕凸错、直通顶层窄梯，若能洞悉阵位虚实，或许可抢占高阶窄口、一举反客为主——'),
    ],
    choices: [
      {
        id: 'slq06_array_highground',
        label: '【借塔阶居高破阵】观破番僧三面合击死角，抢占高阶窄口断其外援、1v1 破首！',
        subLabel: '跳过先锋番僧杂兵，直战阵脚动摇的摩诃巴（1v1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需棋艺 ≥ 30 或先天悟性 ≥ 70',
          conditions: [
            { type: 'skillAtLeast', key: '棋', min: 30 },
            { type: 'talentAtLeast', key: '悟性', min: 70 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q06_pagoda_tactic', value: 'highground' },
          openScene('scene_slq06_07_highground', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'slq06_array_stand',
        label: '【燃灯伏魔死守塔门】于塔门长明灯前立定韦陀不动桩，车轮连战先锋番僧与摩诃巴！',
        subLabel: '零门槛正面强攻；车轮连战密宗先锋【桑杰】与全盛【摩诃巴】',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q06_pagoda_tactic', value: 'stand' },
          openScene('scene_slq06_08_stand', SHAOLIN_Q06_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq06_07_highground: {
    id: 'scene_slq06_07_highground',
    title: '第六幕 · 居高断援',
    subtitle: '齐云密檐舍利古塔顶层 · 破阵擒王（1v1）',
    mandatory: true,
    beats: [
      N('你以弈棋观局之法一眼看穿齐云古塔的三面合击死角——密宗番僧倚仗上下呼应，唯独十二层转角窄梯仅容一人通过！你虚晃塔门引开桑杰视线，旋即借西侧密檐砖榫凌空折跃，几起几落便抢占顶层窄梯咽喉！'),
      N('“轰隆！”你运起《韦陀杵》重劲震塌梯口半截旧木栅，硬生生将嘶吼追来的桑杰与下层番僧死死隔绝在十层之下！塔顶石台之上，阵脚骤乱的摩诃巴脸色大变，只能独自提着符文铁杖扑上！'),
      S(SPEAKER_MOHEBA, '（怒极反笑，周身黑气翻涌）“好贼滑的少林小辈！坏我三面伏魔阵，本法王今日便亲手把你砸下十三层高塔！”'),
    ],
    choices: [
      {
        id: 'slq06_fight_moheba_shaken',
        label: '居高破阵！运使《韦陀杵》1v1 决战阵势已破的【摩诃巴】（二流中品）',
        subLabel: '外援已断、敌阵动摇，一举震毙魔僧夺回舍利',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMohebaShakenBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '齐云塔顶舍利危殆，唯有当场击毙摩诃巴方能护住释源祖庭！',
            introText: '【居高破阵 · 韦陀降魔】于齐云古塔顶层一对一决战阵势已破的【摩诃巴（二流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq06_09_win', SHAOLIN_Q06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '塔顶风急、摩诃巴铁杖刚猛，暂退半阶稳住气息！调息后可再赴【齐云密檐舍利古塔】决战。',
                'warn',
                '韦陀降魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq06_08_stand: {
    id: 'scene_slq06_08_stand',
    title: '第六幕 · 燃灯死守',
    subtitle: '齐云密檐舍利古塔 · 车轮连战',
    mandatory: true,
    beats: [
      N('你不避锋芒，大步踏入塔门长明灯火之中，将四十九斤熟铜重杵往石阶正中一顿，摆出堂堂正正的「韦陀献杵」不动金身！'),
      S(SPEAKER_ESOTERIC_VANGUARD, '（挥舞狼牙铁棒狂吼扑下）“狂妄小僧！先接我桑杰百斤铁棒，再谈上塔见法王！”'),
      N('高塔之上，摩诃巴亦冷哼着纵身跃下石檐，一前一后封死你的退路！今夜唯有于灯火之前连破先锋与魔僧，方显罗汉堂死守不退之威！'),
    ],
    choices: [
      {
        id: 'slq06_fight_moheba_gauntlet',
        label: '燃灯伏魔！车轮连战密宗先锋【桑杰】与首领【摩诃巴】（二流下品 → 二流中品）',
        subLabel: '正面硬破齐云塔三面夹击，以重杵降魔',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildEsotericVanguard() },
            extraOpponents: [{ kind: 'custom', npc: buildMohebaBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '身在齐云古塔燃灯阵前，退一步则古佛舍利沦入西夏魔掌！',
            introText: '【燃灯死守 · 车轮降魔】连战密宗先锋【桑杰（二流下品）】与【摩诃巴（二流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq06_09_win', SHAOLIN_Q06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被西夏密宗连环杖势逼退塔门！调息后可再赴【齐云密檐舍利古塔】重择破阵之策。',
                'warn',
                '韦陀降魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq06_09_win: {
    id: 'scene_slq06_09_win',
    title: '第七幕 · 一杵伏魔 · 塔院善后',
    subtitle: '齐云密檐舍利古塔 · 战利裁决',
    illustrationUrl: '/assets/quests/sl_06_qiyun_pagoda_win.jpg',
    illustrationCaption: '韦陀降魔 · 齐云古塔月色如霜，一记大韦陀杵势震毙西夏密宗番僧摩诃巴',
    mandatory: true,
    beats: [
      N('铁杖与重杵连番硬撼，火星如雨洒满秋夜！激斗至第三十余合，你双足如铁铸钉死青砖，全身内息顺八棱铜杵轰然爆发——正是《韦陀杵》终极杀招「大韦陀降魔」！'),
      N('“轰隆！”一声如铜钟裂空，重杵硬生生砸断乌黑铁杖，余势贯入摩诃巴胸口檀中！魔僧狂喷黑血仰面气绝。你确认鎏金舍利宝函丝毫无损，默诵《往生咒》后携函下塔，塔下玄悲与数十名白马寺僧侣齐声高宣佛号！'),
      S(SPEAKER_BAIMA_MONK, '（热泪盈眶，深施大礼）“多亏玄悲大师与少林高徒力挽狂澜，保我白马古刹舍利无恙！只是今夜火乱，东院廊檐与法堂多有损毁……”'),
      S('NPC-0157', '（指向武僧清点出的一箱西夏密宗鎏金法铃、精铁降魔杖与党项军资）“此番缴获的西夏法器价值不菲。或可尽数赠留白马寺变卖修缮受损塔院，广结释源善缘；亦可押回嵩山入我罗汉堂武库，充作战利军械以研破西夏密宗兵刃之法。师侄立此首功，此事由你裁定。”'),
    ],
    choices: [
      {
        id: 'slq06_loot_donate',
        label: '【归还法器修缮塔院】将缴获西夏法器资财尽留白马寺修缮古刹塔院！',
        subLabel: '同气连枝、广行佛门施舍；玄悲好感大增、侠义更高（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q06_relic_disposal', value: 'donate' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq06_10_gift', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'slq06_loot_arsenal',
        label: '【携回少林充作军械】将密宗法器与精铁重兵押返嵩山，充作罗汉堂战利军械！',
        subLabel: '以战养战、充实罗汉堂军备；额外门派贡献与银两（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q06_relic_disposal', value: 'arsenal' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq06_10_gift', SHAOLIN_Q06_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq06_10_gift: {
    id: 'scene_slq06_10_gift',
    title: '第八幕 · 银杏赠杵',
    subtitle: '洛阳白马寺 · 清凉台银杏树下',
    illustrationUrl: '/assets/quests/sl_06_xuanbei_gift.jpg',
    illustrationCaption: '玄悲赠杵 · 银杏金叶纷飞间，大韦陀僧玄悲将少林韦陀伏魔杵郑重托付于你',
    mandatory: true,
    beats: [
      N('次日清晨，秋阳洒满清凉台千年银杏，金叶纷飞。玄悲打点好远行包袱唤你独至树下，言及方丈师兄密谕：大理陆凉州身戒寺近来暗流汹涌，他须即刻启程南下查探虚实，未能随你同返嵩山。'),
      S('NPC-0157', '（神色温和欣慰）“师侄，昨夜你{ifFlagEq:sl_q06_pagoda_tactic=highground|观破塔阶地势、居高断援而一举破魔，兵法眼力远胜寻常武僧|于塔门燃灯死守、连破先锋与摩诃巴，这份寸步不让的金刚骨气令人动容}；战后又{ifFlagEq:sl_q06_relic_disposal=donate|将战利法器悉数留予白马寺修缮塔院，仁厚可风|懂得收缴西夏法器带回罗汉堂研判敌械，深谙护法兵略}，贫僧深感欣慰！”'),
      S('NPC-0157', '（郑重托举那根陪伴自己二十余载的【少林韦陀伏魔杵】）“贫僧此去大理多行秘访，携此四十九斤重杵反倒惹眼。昨夜见你运使此杵如臂使指，浑然天成——这根「少林韦陀伏魔杵」，今日便正式赠予于你！”'),
      P('（退后半步连忙推辞，终在玄悲温和却不容置疑的目光中双手接过）“师伯厚赐，弟子愧不敢当！必携此宝杵与《韦陀杵》全诀护我少林、卫我苍生，盼师伯大理之行平安归来！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_11_complete', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_11_complete: {
    id: 'scene_slq06_11_complete',
    title: '第九幕 · 铭志归山',
    subtitle: '洛阳白马寺山门 · 目送南行',
    mandatory: true,
    beats: [
      N('洛阳城南秋雾苍茫，你双手紧握犹带余温的【少林韦陀伏魔杵】，目送玄悲师伯一袭绛红僧衣渐行渐远，终没入官道尽头。'),
      N('{ifFlag:sl_q06_sutras_saved|清凉台晨课诵经声重新悠扬响起，昨夜冒火抢出的汉唐梵文孤本已安然归架，白马寺众僧无不感念少林大德。|齐云古塔在晨曦中巍然矗立，塔基石阶纤尘无损，洛阳城东又复千年清净。}'),
      P('（合十遥拜，心中豪情与重任交织）“弟子定不负玄悲师伯托付！持此韦陀宝杵，凡遇奸邪魔障，必以伏魔之心荡平之！”'),
    ],
    choices: [
      {
        id: 'slq06_complete',
        label: '恭谨受领《韦陀杵》与【少林韦陀伏魔杵】，圆满完成【释源白马 · 韦陀降魔】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-094' },
          { type: 'giveItem', itemId: 'WPN-028', qty: 1 },
          {
            type: 'giveCombatExp',
            amount: 340,
            reason: '星夜驰援洛阳白马寺，以《韦陀杵》破齐云塔阵并击毙西夏番僧摩诃巴',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q06_relic_disposal', op: 'eq', value: 'arsenal' },
            thenEffects: [
              { type: 'addSectContribution', amount: 180 },
              { type: 'giveSilver', amount: 60, reason: '缴获西夏密宗法器军械充入罗汉堂武库嘉赏' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0157' }, delta: 20 },
            ],
            elseEffects: [
              { type: 'addSectContribution', amount: 140 },
              { type: 'modifyChivalry', delta: 20, reason: '将缴获法器尽留洛阳白马寺修缮受损塔院' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0157' }, delta: 30 },
            ],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q06_sutras_saved', op: 'truthy' },
            thenEffects: [
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0157' }, delta: 10 },
              { type: 'modifyRenown', delta: 20, reason: '火海抢救白马寺千年梵文孤本并击毙摩诃巴' },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 12, reason: '驰援白马寺截杀纵火先锋并击毙西夏魔僧摩诃巴' },
            ],
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q06_pagoda_tactic', op: 'eq', value: 'highground' },
            thenEffects: [{ type: 'modifySkill', key: '棋', delta: 1 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q06_QUEST_ID, outcome: 'completed' },
          toast(
            '【释源白马 · 韦陀降魔】圆满完成！习得《韦陀杵》，获赠专属奇珍【少林韦陀伏魔杵】与丰厚师门嘉奖！',
            'success',
            '罗汉堂脉',
          ),
        ],
      },
    ],
  },
}
