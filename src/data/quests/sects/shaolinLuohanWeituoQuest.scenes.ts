import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
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
    talk: '“既然被少林秃驴识破了西夏梵押，那便一把火烧了白马寺，一个活口也别留！”',
    stats: { hp: 1020, mp: 620, agi: 44, res: 24 },
    talents: { bone: 64, comprehension: 56, charm: 38 },
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-246', move1: 'MA-133', move2: 'MA-247' },
    learnedArts: [
      { artId: 'MA-232', level: 5 },
      { artId: 'MA-246', level: 4 },
      { artId: 'MA-133', level: 5 },
      { artId: 'MA-247', level: 4 },
    ],
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
    talk: '“大佛宝殿的火油早已泼好，少林和尚自寻死路！”',
    stats: { hp: 980, mp: 600, agi: 46, res: 23 },
    talents: { bone: 62, comprehension: 55, charm: 36 },
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-246', move1: 'MA-247', move2: 'MA-133' },
    learnedArts: [
      { artId: 'MA-232', level: 5 },
      { artId: 'MA-246', level: 4 },
      { artId: 'MA-247', level: 5 },
      { artId: 'MA-133', level: 4 },
    ],
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
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-246',
      move1: 'MA-247',
      move2: 'MA-133',
      move3: 'MA-046',
    },
    learnedArts: [
      { artId: 'MA-245', level: 6 },
      { artId: 'MA-246', level: 5 },
      { artId: 'MA-247', level: 6 },
      { artId: 'MA-133', level: 6 },
      { artId: 'MA-046', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq06_01: {
    id: 'scene_slq06_01',
    title: '第一幕 · 洛阳急羽',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，你在少林入寺已满两载，修为与经义书艺日渐精纯。这日傍晚，一只灰羽信鸽振翅掠过嵩山暮云，径直落入罗汉堂演武正殿！'),
      N('降魔尊者玄苦拆开鸽足竹筒，展开那张墨迹急促的素笺，沉稳如山的眉宇间霎时浮现一层凝重霜色。'),
      S('NPC-0126', '（将素笺递予你阅览）“阿弥陀佛！此乃正在洛阳白马寺挂单校经的玄悲师弟所发密信。近半月来，一批自称自河西凉州东来译经的挂单僧入住白马寺，言行诡秘、暗藏兵刃与火油！”'),
      S('NPC-0126', '“玄悲师弟疑其乃西夏一品堂遣来焚毁清凉台梵文古经、盗取齐云古塔佛骨舍利的奸细！他孤身坐镇白马寺恐顾此失彼，特向罗汉堂请援。”'),
    ],
    onFinishEffects: [openScene('scene_slq06_02', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_02: {
    id: 'scene_slq06_02',
    title: '第二幕 · 释源重托',
    subtitle: '罗汉堂演武正殿 · 烛影摇红',
    mandatory: true,
    beats: [
      S('NPC-0126', '“洛阳白马寺乃东汉永平年间「释源祖庭」，与我嵩山少林同气连枝。你既已练成《慈悲刀法》，且经义深厚、熟通翰墨书体，最宜前去助玄悲师弟核验那批假僧的译经真伪，必要时以雷霆手段降魔！”'),
      P('（双手合十，肃然受命）“师伯放心！白马古刹容不得西夏魔僧亵渎！弟子即刻动身，星夜疾驰赶赴洛阳！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_03', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_03: {
    id: 'scene_slq06_03',
    title: '第三幕 · 领命出山',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0126', '“此去洛阳一百二十里，快步兼程三更便可抵白马寺山门。见了玄悲师弟，一切听他调度。若遇西夏密宗硬点子，莫要轻敌！”'),
    ],
    choices: [
      {
        id: 'slq06_accept',
        label: '接过玄苦尊者通关木牌，即刻星夜驰援洛阳白马寺',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q06_QUEST_ID, stepId: 'rush_to_baimasi' },
          setStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
          toast(
            '已承接【释源白马 · 韦陀降魔】！请速赴【洛阳府 · 洛阳白马寺 · 白马大佛宝殿（ly_bm_main）】会合玄悲师伯！',
            'talk',
            '韦陀降魔',
          ),
        ],
      },
    ],
  },

  scene_slq06_04: {
    id: 'scene_slq06_04',
    title: '第四幕 · 释源夜会',
    subtitle: '洛阳府 · 洛阳白马寺 · 白马大佛宝殿',
    mandatory: true,
    beats: [
      N('星斗满天，寒露打湿僧袍。你一路疾驰抵达洛阳城东【白马寺】，由侧门悄然潜入【白马大佛宝殿】后廊。'),
      N('只见大韦陀僧玄悲身披绛红袈裟，正手按一根乌沉沉的八棱熟铜包钢重杵静立佛龛之侧，眉宇慈悲而威严。白马寺知客僧明觉正压低声音禀报着什么。'),
      S('NPC-0157', '（见你风尘仆仆而至，颔首赞许）“阿弥陀佛！玄苦师兄果然派了你来。师侄来得正好——那几名西夏假僧方才借口夜校《四十二章经》，将两桶松脂火油藏进了大佛宝殿帷幔之后！”'),
      S(SPEAKER_BAIMA_MONK, '（满面焦灼）“玄悲大师，那领头的西域番僧自称摩诃巴，武功极高，方才已借口瞻仰舍利独自往齐云古塔方向去了，大殿内还留着两名手下看守！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_05', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_05: {
    id: 'scene_slq06_05',
    title: '第五幕 · 假僧纵火',
    subtitle: '白马大佛宝殿 · 烛火骤起',
    illustrationUrl: '/assets/quests/sl_06_baima_fire.jpg',
    illustrationCaption: '白马寺夜变 · 西夏一品堂假僧现出弯刀与火折，玄悲与你联手护住大佛宝殿',
    mandatory: true,
    beats: [
      N('话音未落，大佛宝殿前廊忽地传来一声刺耳的铁折擦响！两名身披灰褐僧袍、却在袖口露出西夏皮护腕的壮汉猛然掀翻供桌，手中弯刀与铁杖寒光暴涨！'),
      S(SPEAKER_FAKE_MONK, '（撕去宽大僧袖，冷笑喝道）“好个耳目灵通的玄悲老和尚！居然还从嵩山搬了救兵来！不过你们晚了——摩诃巴法王此刻已在齐云塔取舍利，你们就留在这大佛殿里陪经卷一起化灰吧！”'),
      P('（冷哼一声，指着供桌上散落的伪造经帖喝道）“休得妄言！你等连《四十二章经》「断欲去爱」的汉唐写本笔法都抄得狗屁不通，落款竟还带着党项官署花押，早已露了马脚！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_06', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_06: {
    id: 'scene_slq06_06',
    title: '第六幕 · 佛殿伏奸',
    subtitle: '白马大佛宝殿 · 扑火破敌',
    mandatory: true,
    beats: [
      S('NPC-0157', '（手提重杵大步踏前，一记杵风先将滚落的油桶震飞殿外，朗声喝道）“明觉师侄速去鸣钟护住清凉台经阁！这两个西夏一品堂爪牙，贫僧替你挡住退路，师侄正好拿他们试试罗汉堂的手段！”'),
      S(SPEAKER_FAKE_MONK, '“一起上！宰了这小和尚再冲出去接应法王！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_07', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_07: {
    id: 'scene_slq06_07',
    title: '第七幕 · 宝殿血战',
    subtitle: '白马大佛宝殿 · 一对二力战假僧',
    mandatory: true,
    beats: [
      N('赫连七与嵬名铁一左一右扑杀而来，西夏弯刀刁钻狠辣，追魂铁杖呼啸扫风！你深吸一口气，护住背后佛龛，迎面截杀！'),
    ],
    choices: [
      {
        id: 'slq06_fight_fakemonks',
        label: '迎战两名西夏一品堂假僧（二流下品 × 2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildFakeMonkAlpha() },
            extraOpponents: [{ kind: 'custom', npc: buildFakeMonkBeta() }],
            rule: 'story_trial',
            forbidEscapeReason: '大佛宝殿经卷危在旦夕，绝不可放西夏假僧纵火逃脱！',
            introText:
              '【白马伏奸】于白马大佛宝殿迎战西夏一品堂假僧【赫连七 & 嵬名铁（二流下品 × 2）】！',
            onWin: [openScene('scene_slq06_08', SHAOLIN_Q06_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被西夏假僧合击震退，幸得玄悲师伯一杵荡开敌刃救下！调息后可再赴【白马大佛宝殿】续战。',
                'warn',
                '韦陀降魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq06_08: {
    id: 'scene_slq06_08',
    title: '第八幕 · 擒奸审讯',
    subtitle: '白马大佛宝殿 · 殿前青石',
    mandatory: true,
    beats: [
      N('十余合激斗过后，你借罗汉步侧身避开弯刀斜斩，一记重手震飞赫连七兵刃，反手将嵬名铁掀翻于石柱之下！白马寺武僧闻钟赶来，立时将两名重伤假僧捆缚严实。'),
      S(SPEAKER_BAIMA_MONK, '（急匆匆奔回大殿禀报）“不好了！齐云塔方向火光一闪，那西夏番僧摩诃巴已打伤守塔僧人，提着鎏金舍利函登上塔顶了！”'),
      S('NPC-0157', '（神色一凛，目光骤然锐利如电）“摩诃巴练的是西夏秘藏硬功，铁杖沉重无匹，寻常刀剑难破其护体罡气！且方才我强行以气劲封住殿外两桶烈火油，左肋旧伤微动，恐难在狭窄塔顶与他久缠。”'),
    ],
    onFinishEffects: [openScene('scene_slq06_09', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_09: {
    id: 'scene_slq06_09',
    title: '第九幕 · 临阵授杵',
    subtitle: '白马大佛宝殿 · 韦陀真传',
    mandatory: true,
    beats: [
      N('玄悲凝视你片刻，倏然将手中那根沉重无比的【少林韦陀伏魔杵】横举胸前，低宣一声佛号，眸中精芒大盛！'),
      S('NPC-0157', '“师侄，你筋骨沉稳、禅心通透，今日时机虽急，贫僧便临阵将我少林七十二绝技之《韦陀杵》九式精要倾囊相授！你且看清了——”'),
      N('玄悲话音未落，足尖一点青砖，重达四十九斤的八棱铜杵在他掌中竟轻若灵蛇，又重如泰山压顶！一记「韦陀献杵」稳守中宫，紧接着「伏魔震岳」「金光破邪」连环轰出，大殿青砖竟被无形杵风震起三寸尘浪！'),
    ],
    onFinishEffects: [openScene('scene_slq06_10', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_10: {
    id: 'scene_slq06_10',
    title: '第十幕 · 重杵破刚',
    subtitle: '白马大佛宝殿 · 传法明心',
    mandatory: true,
    beats: [
      S('NPC-0157', '“《韦陀杵》讲究「以重制重、以刚克刚、借地脉而生雷霆」！摩诃巴的西夏秘藏玄功外坚内燥，你只需以《罗汉伏虎功》托住丹田，运使《韦陀杵》直砸其中宫门户，便能一举震散其护体罡气！”'),
      P('（双手接过玄悲暂借的重杵，只觉沉甸甸的铜身微微震鸣，胸中九式杵路豁然贯通）“弟子悟透了！以正大刚猛之杵，破西夏阴狠之魔！师伯且在此稳守经阁，弟子这就登齐云古塔夺回舍利！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_11', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_11: {
    id: 'scene_slq06_11',
    title: '第十一幕 · 奔赴齐云',
    subtitle: '白马寺东院 · 古塔夜风',
    mandatory: true,
    beats: [
      N('夜风猎猎，白马寺东侧那座十三层青砖密檐【齐云古塔】高耸入云，塔顶隐约可见一道绛红僧影正负手冷立！'),
      S('NPC-0157', '“去吧！齐云塔顶风急栏窄，切记脚踏实地、守中破敌！”'),
    ],
    choices: [
      {
        id: 'slq06_go_pagoda',
        label: '手提伏魔重杵，直奔【齐云密檐舍利古塔】追击摩诃巴',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
          toast(
            '已领悟《韦陀杵》要诀！请速赴【洛阳白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】登塔斩魔！',
            'talk',
            '韦陀降魔',
          ),
        ],
      },
    ],
  },

  scene_slq06_12: {
    id: 'scene_slq06_12',
    title: '第十二幕 · 塔顶对峙',
    subtitle: '洛阳白马寺 · 齐云密檐舍利古塔顶层',
    mandatory: true,
    beats: [
      N('你提纵轻功连跃十三层木梯，破窗而出，稳稳落于齐云古塔顶层石台！秋夜明月高悬，脚下洛阳古城万家灯火微如星点。'),
      N('塔刹之下，一名身材高大、身披绛红密宗喇嘛袍、脖挂白骨念珠的魁梧番僧正一手按着鎏金舍利宝函，另一手倒提一根刻满西夏符文的乌黑铁杖，正是西夏一品堂密宗客卿【摩诃巴】！'),
      S(SPEAKER_MOHEBA, '（冷眼打量你手中铜杵，嗤笑一声）“玄悲那老和尚不敢亲自登塔，竟派个乳臭未干的小沙弥提着他的韦陀杵来送死？也好，本法王正好拿你的血祭这根降魔铁杖！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_13', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_13: {
    id: 'scene_slq06_13',
    title: '第十三幕 · 佛魔辩义',
    subtitle: '齐云密檐舍利古塔顶层 · 月下锋芒',
    mandatory: true,
    beats: [
      P('（将八棱重杵往塔顶青砖猛然一顿，火星四溅，朗声喝道）“阿弥陀佛！佛法无分胡汉，却分正邪！你既披僧衣，却行纵火盗宝、残害同道之恶举，分明是披着袈裟的西夏魔头！速速放下舍利宝函！”'),
      S(SPEAKER_MOHEBA, '（眼中凶光暴涨，周身西夏秘藏玄功鼓荡得绛红僧袍猎猎作响）“少林小辈休要狂吠！中原武林徒有虚名，今日便叫你见识西夏密宗铁杖的无上神威！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_14', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_14: {
    id: 'scene_slq06_14',
    title: '第十四幕 · 齐云死斗',
    subtitle: '齐云密檐舍利古塔顶层 · 韦陀伏魔之战',
    mandatory: true,
    beats: [
      N('摩诃巴一声梵喝，乌黑铁杖挟带狂沙烈风当头砸落，劲力沉雄骇人！你深吸一口气，心中默念玄悲所授《韦陀杵》口诀，重杵横架，迎着明月清辉正面撼上！'),
    ],
    choices: [
      {
        id: 'slq06_fight_moheba',
        label: '运使《韦陀杵》一对一决战西夏密宗番僧 · 摩诃巴（二流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMohebaBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '齐云塔顶舍利危殆，唯有当场击毙魔僧摩诃巴方能护住释源祖庭！',
            introText:
              '【韦陀降魔】于齐云古塔顶层一对一血战西夏密宗番僧【摩诃巴（二流中品）】！',
            onWin: [openScene('scene_slq06_15', SHAOLIN_Q06_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被摩诃巴刚猛铁杖逼退塔梯，幸得及时稳住气息！调息后可再赴【齐云密檐舍利古塔】决战摩诃巴。',
                'warn',
                '韦陀降魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq06_15: {
    id: 'scene_slq06_15',
    title: '第十五幕 · 一杵伏魔',
    subtitle: '齐云密檐舍利古塔顶层 · 月明魔灭',
    illustrationUrl: '/assets/quests/sl_06_qiyun_pagoda_win.jpg',
    illustrationCaption: '韦陀降魔 · 齐云古塔顶层月色如霜，一记大韦陀杵势震毙西夏密宗番僧摩诃巴',
    mandatory: true,
    beats: [
      N('铁杖与重杵在塔顶连番硬撼，火星如暴雨般四溅夜空！激斗至第三十余合，摩诃巴久攻不下，狂吼着将全身《西夏秘藏玄功》催至极巅，铁杖化作一道漆黑魔影横扫而来！'),
      N('你沉腰坐马，双足如铁铸般钉死塔砖，全身内息顺八棱铜杵轰然爆发——正是《韦陀杵》终极杀招「大韦陀降魔」！'),
      N('“轰隆！”一声如佛寺铜钟裂空的巨响，八棱重杵硬生生将乌黑铁杖砸作两截，余势不减直贯摩诃巴胸口檀中大穴！摩诃巴狂喷一口黑血，眼中满是不可置信之色，仰面栽倒在塔砖之上，当场气绝！'),
    ],
    onFinishEffects: [openScene('scene_slq06_16', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_16: {
    id: 'scene_slq06_16',
    title: '第十六幕 · 舍利无恙',
    subtitle: '齐云密檐舍利古塔顶层',
    mandatory: true,
    beats: [
      N('塔顶狂风渐息，明月清辉洒满青砖。你缓步上前，仔细检视那只鎏金舍利宝函——封印完好无损，古佛舍利丝毫未伤。'),
      N('你合十向魔僧尸身默诵一遍《往生咒》，随即捧起舍利宝函，提着温热的伏魔重杵缓步下塔。'),
    ],
    onFinishEffects: [openScene('scene_slq06_17', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_17: {
    id: 'scene_slq06_17',
    title: '第十七幕 · 古刹重明',
    subtitle: '洛阳白马寺 · 齐云塔前广场',
    mandatory: true,
    beats: [
      N('塔下早有玄悲师伯与白马寺众僧持灯迎候。见你怀抱舍利宝函安然步出塔门，明觉及数十名僧侣齐齐合十高宣佛号，声震释源古刹！'),
      S(SPEAKER_BAIMA_MONK, '（热泪盈眶，深施大礼）“阿弥陀佛！多亏玄悲大师与少林高徒力挽狂澜，保我白马古刹千年经卷与舍利无恙！此恩白马寺永世不忘！”'),
      S('NPC-0157', '（上前轻拍你肩头，眼中尽是欣慰与赞叹）“临阵受法，竟能在一夜之间以《韦陀杵》正面击毙二流中品的西夏密宗魔僧！玄苦师兄果然没有看错人！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_18', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_18: {
    id: 'scene_slq06_18',
    title: '第十八幕 · 南行嘱托',
    subtitle: '洛阳白马寺 · 清凉台银杏树下',
    mandatory: true,
    beats: [
      N('次日清晨，秋阳洒满清凉台千年银杏，金叶纷飞。玄悲唤你独至银杏树下，神色较昨夜更为沉静深远，行囊已然打点妥当。'),
      S('NPC-0157', '“师侄，白马寺之危虽已解除，贫僧却不能随你同返嵩山了。方丈师兄前日已有密谕：大理陆凉州身戒寺近来亦生变故，江湖暗流汹涌，贫僧须即刻启程南下大理查探虚实。”'),
      P('（心中一动，关切问道）“大理陆凉州山高路远，师伯孤身南行，切望一路珍重！”'),
    ],
    onFinishEffects: [openScene('scene_slq06_19', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_19: {
    id: 'scene_slq06_19',
    title: '第十九幕 · 赠杵留念',
    subtitle: '洛阳白马寺 · 齐云塔影',
    illustrationUrl: '/assets/quests/sl_06_xuanbei_gift.jpg',
    illustrationCaption: '玄悲赠杵 · 银杏金叶纷飞间，大韦陀僧玄悲将少林韦陀伏魔杵郑重托付于你',
    mandatory: true,
    beats: [
      S('NPC-0157', '（含笑将那根陪伴自己二十余载的【少林韦陀伏魔杵】郑重托举于你面前）“贫僧此去大理，多行秘访，携带四十九斤重杵反倒惹眼。昨夜见你在齐云塔顶运使此杵如臂使指，浑然天成——这根「少林韦陀伏魔杵」，今日便正式赠予于你！”'),
      P('（大惊失色，连忙退后半步推辞）“师伯！此乃罗汉堂护寺重器、师伯成名兵刃，弟子怎敢受此厚赐？”'),
      S('NPC-0157', '（温和却不容置疑地将重杵放入你掌中）“阿弥陀佛。宝器配英才，佛法贵传承。愿你携此宝杵与《韦陀杵》全诀，日后护我少林、护我中原苍生！若他日贫僧归来，咱们再于罗汉堂切磋杵法。”'),
    ],
    onFinishEffects: [openScene('scene_slq06_20', SHAOLIN_Q06_QUEST_ID)],
  },

  scene_slq06_20: {
    id: 'scene_slq06_20',
    title: '第二十幕 · 铭志归山',
    subtitle: '洛阳白马寺山门 · 目送南行',
    mandatory: true,
    beats: [
      N('你双手紧握犹带余温的【少林韦陀伏魔杵】，望着玄悲师伯一袭绛红僧衣渐行渐远，终没入洛阳城南苍茫秋雾之中，心中既沉重又燃起无尽豪情。'),
      P('（合十遥拜，沉声立誓）“弟子定不负玄悲师伯重托！持此韦陀宝杵，凡遇奸邪魔障，必以伏魔之心荡平之！”'),
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
            reason: '星夜驰援洛阳白马寺，以《韦陀杵》于齐云塔顶击毙西夏番僧摩诃巴',
          },
          { type: 'addSectContribution', amount: 140 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0157' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_Q06_QUEST_ID, outcome: 'completed' },
          toast(
            '【释源白马 · 韦陀降魔】圆满完成！习得《韦陀杵》，获赠专属奇珍【少林韦陀伏魔杵】，实战经验 +340、贡献 +140、经义 +2！',
            'success',
            '罗汉堂脉',
          ),
        ],
      },
    ],
  },
}
