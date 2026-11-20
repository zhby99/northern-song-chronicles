import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q11_QUEST_ID } from './shaolinDamoNianhuaFingerQuest'

const SPEAKER_SAJIA_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '萨迦铁僧 · 贡布',
  title: '吐蕃大轮寺首席护法',
  factionName: '吐蕃大轮寺',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_BASANG_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '赤铜罗汉 · 巴桑',
  title: '吐蕃大轮寺金刚护法',
  factionName: '吐蕃大轮寺',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_SANGJIE_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '金刚译师 · 桑杰',
  title: '吐蕃大轮寺辩经护法',
  factionName: '吐蕃大轮寺',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

function buildBasangMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ11_BASANG',
    name: '赤铜罗汉 · 巴桑',
    title: '吐蕃大轮寺金刚护法',
    realm: '二流中品',
    factionName: '吐蕃大轮寺',
    sectRank: 2,
    sectRankLabel: '密宗护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“哈哈！中原和尚的指头细得像绣花针，怎破得了我雪域密宗二十年练成的赤铜铁掌！”',
    stats: { hp: 1520, mp: 920, agi: 51, res: 36 },
    talents: { bone: 78, comprehension: 58, charm: 40 },
    equippedArts: { neigong: 'MA-140', qinggong: 'MA-139', move1: 'MA-046', move2: 'MA-087' },
    learnedArts: [
      { artId: 'MA-140', level: 6 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-046', level: 5 },
      { artId: 'MA-087', level: 5 },
    ],
  })
}

function buildSajiaIronMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ11_SAJIA_MONK',
    name: '萨迦铁僧 · 贡布',
    title: '吐蕃大轮寺首席护法',
    realm: '二流上品',
    factionName: '吐蕃大轮寺',
    sectRank: 3,
    sectRankLabel: '大轮寺护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“小僧好诡异的柔劲！且看老僧以雪域密宗铁掌与烈焰刀意，试你少林七十二绝技的真成色！”',
    stats: { hp: 1860, mp: 1220, agi: 61, res: 41 },
    talents: { bone: 82, comprehension: 72, charm: 48 },
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-098',
      move1: 'MA-046',
      move2: 'MA-083',
      move3: 'MA-072',
    },
    learnedArts: [
      { artId: 'MA-140', level: 7 },
      { artId: 'MA-098', level: 6 },
      { artId: 'MA-046', level: 6 },
      { artId: 'MA-083', level: 6 },
      { artId: 'MA-072', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq11_01: {
    id: 'scene_slq11_01',
    title: '第一幕 · 雪域来客',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      N('{reignYear}秋风送爽，嵩山少林寺大雄正殿檀香袅袅。今日殿中气氛却格外凝重——三名身披绛红氆氇袈裟、体格魁梧如铁塔的吐蕃大轮寺护法番僧，正大喇喇地立于佛前蒲团之侧！'),
      N('玄慈方丈端坐主位，玄难首座立于左手，殿下十余名少林高僧与达摩院弟子肃然垂手。你亦奉召侍立在玄难身侧。'),
      S(SPEAKER_SANGJIE_MONK, '（为首居中那名瘦高番僧合十冷笑，汉话虽生硬却字字锋利）“吐蕃大轮寺护法桑杰，偕贡布、巴桑二位师兄，奉明王座前法谕东来礼佛。听闻中原少林号称禅宗祖庭，藏有『七十二绝技』，不知是名副其实，还是徒有虚名？”'),
      S('NPC-0112', '（玄慈方丈双目微阖，声如古井无波）“阿弥陀佛。三位雪域高僧远道而来，少林理当以礼相待。只是佛门清净，论经讲法无不可，若言炫技争胜，便落了下乘。”'),
    ],
    onFinishEffects: [openScene('scene_slq11_02', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_02: {
    id: 'scene_slq11_02',
    title: '第二幕 · 捏瓶示威',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S(SPEAKER_SAJIA_MONK, '（身形最伟岸的萨迦铁僧贡布忽踏前一步，绛红袈裟无风自动，眼中满是桀骜）“方丈大师好一张利口！只怕不是不愿争胜，而是当今少林早已没人练得出像样的七十二绝技吧？”'),
      N('话音未落，贡布竟悍然伸出铁钳般的右手，一把抓向供桌上那只供奉百年的青玉净瓶！'),
      N('“咔嚓——！”一声刺耳脆响震彻大殿！坚硬温润的青玉净瓶竟被他徒手捏成一蓬细碎玉屑，连瓶中清水都未及泼出，便被其掌心炽热内劲蒸作一团白雾！唯有瓶中原本插着的一枝青莲，摇摇晃晃跌落青砖！'),
      S(SPEAKER_BASANG_MONK, '（抚掌大笑，声震殿梁）“哈哈哈哈！贡布师兄的雪域铁掌连青玉都能捏成齑粉，不知少林各位高僧，谁来接一接这『破玉之礼』？”'),
    ],
    onFinishEffects: [openScene('scene_slq11_03', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_03: {
    id: 'scene_slq11_03',
    title: '第三幕 · 殿前戒怒',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('殿内众少林武僧见佛前供器遭毁，无不怒目圆睁，几名性烈僧人更是按捺不住就要跨步上前！'),
      S('NPC-0112', '（玄慈方丈却轻抬一掌止住众僧，神色依旧祥和）“阿弥陀佛。青玉本是无常之物，碎与不碎，佛性何曾增减？三位护法既来问禅，不如先论佛理，再谈武艺。”'),
      S(SPEAKER_SANGJIE_MONK, '（见少林长老竟不动怒，眼珠一转，立刻借机发难）“好！方丈大师既要论禅，桑杰便有一问——贵寺自诩达摩东来、不立文字、直指人心。既不立文字，那藏经阁里堆着万卷经书岂非自相矛盾？既言色即是空，那七十二绝技又何必藏私秘不示人？”'),
      N('这番诘问刁钻狠辣，既扣住佛门义理话柄，又暗讽少林藏私畏战！殿中众僧一时议论低起。'),
    ],
    onFinishEffects: [openScene('scene_slq11_04', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_04: {
    id: 'scene_slq11_04',
    title: '第四幕 · 方丈点将',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('玄慈方丈并未亲自作答，而是缓缓睁开双眼，慈和的目光越过玄难，落在了肃立一旁的你身上。'),
      S('NPC-0112', '“三位护法既问我达摩禅宗本旨，何须老衲多言？达摩院三代弟子在此，平日精研经义辩才，便由你代老衲答复桑杰护法这一问吧。”'),
      S('NPC-0127', '（玄难低声传音入耳）“莫要落入番僧口舌圈套！记住——言多必失，禅机在心不在辩。”'),
      P('（深吸一口气，整肃僧衣缓步走出队列，向玄慈与三名番僧各施一礼）“阿弥陀佛。弟子领方丈法谕。”'),
    ],
    onFinishEffects: [openScene('scene_slq11_05', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_05: {
    id: 'scene_slq11_05',
    title: '第五幕 · 番僧逼辩',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S(SPEAKER_SANGJIE_MONK, '（见出列的竟是一名年轻内门僧人，眼中顿现轻蔑）“呵，少林高僧不敢接话，推个年轻沙弥出来顶缸么？也罢！小和尚，你且答我：经书既为指月之指，少林何以死抱残卷不放？绝技既为护法之器，何以不敢当众演练？”'),
      N('桑杰连珠炮般发问，语势凌厉逼人，萨迦铁僧与赤铜罗汉亦冷笑抱臂，等着看你词穷出丑。'),
      P('（目光平静扫过地上青玉碎屑与那枝完好无损的青莲，心中忽然如明镜澄澈）'),
    ],
    choices: [
      {
        id: 'slq11_silent_lotus',
        label: '一言不发，俯身轻拈地上青莲示众，含笑合十',
        subLabel: '以「灵山世尊拈花，迦叶破颜微笑」无声禅机破敌辩锋',
        tone: 'gold',
        effects: [openScene('scene_slq11_06', SHAOLIN_Q11_QUEST_ID)],
      },
      {
        id: 'slq11_quote_sutra_then_lotus',
        label: '先吟「净瓶虽碎，莲香不散」，再拈青莲微笑默立',
        subLabel: '一语点破破玉之妄，复以无声拈花立禅宗气象',
        tone: 'default',
        effects: [openScene('scene_slq11_06', SHAOLIN_Q11_QUEST_ID)],
      },
    ],
  },

  scene_slq11_06: {
    id: 'scene_slq11_06',
    title: '第六幕 · 青莲无言',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大殿之内刹那鸦雀无声！你并未与桑杰在字句上纠缠半分，只是神色安详地缓步走到碎玉前，屈膝俯身，以拇指与食指极轻柔地拈起那枝沾着水珠的青莲。'),
      N('你徐徐起身，面向三名吐蕃护法，将青莲举至眉际，嘴角微扬，露出一抹清净从容的微笑，旋即垂眸静立，一字不发。'),
      S('NPC-0112', '（玄慈方丈眼中精光一闪，低声赞叹）“善哉……昔年灵山会上，世尊拈花示众，百万天人皆默然，唯摩诃迦叶破颜微笑。净瓶虽碎，莲心未损；经卷虽多，一花可明！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_07', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_07: {
    id: 'scene_slq11_07',
    title: '第七幕 · 迦叶微笑',
    subtitle: '大雄正殿 · 无声辩经',
    illustrationUrl: '/assets/quests/sl_11_silent_debate.jpg',
    illustrationCaption: '无声禅辩 · 碎玉之前拈莲微笑，一言未发压服大轮寺三番僧',
    mandatory: true,
    beats: [
      N('金刚译师桑杰张口结舌，满腹准备好的密宗诡辩竟全无用武之地！他盯着你指间那朵纤尘不染的青莲，额角渐渐渗出一层细密冷汗。'),
      S(SPEAKER_SANGJIE_MONK, '（良久方干涩开口，气焰大减）“这……好一个『不立文字，拈花一笑』……中原禅宗竟仍有此等机锋……”'),
      S(SPEAKER_SAJIA_MONK, '（见桑杰吃瘪，萨迦铁僧贡布脸色铁青，哼了一声跨步出来）“哼！辩经讨巧算什么本事？武林之中终究要凭真功夫说话！小和尚，你既敢拈花，可敢到殿外演武坪，以少林七十二绝技接我与巴桑师弟的雪域铁掌？”'),
      P('（将青莲轻轻放回佛前净盘，神色不变）“客随主便。三位护法既欲以武会友，小僧愿在钟鼓禅院演武坪恭候赐教。”'),
    ],
    onFinishEffects: [openScene('scene_slq11_08', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_08: {
    id: 'scene_slq11_08',
    title: '第八幕 · 偏厢授指',
    subtitle: '大雄宝殿东厢偏室',
    mandatory: true,
    beats: [
      N('玄慈方丈命知客僧先引三名吐蕃护法往钟鼓禅院演武坪奉茶歇脚，玄难首座则将你唤入大雄宝殿偏厢之内。'),
      S('NPC-0127', '（神色肃穆，双目炯炯有神）“方才你以拈花微笑压服桑杰，大长我少林禅宗威风！不过那巴桑与贡布皆是吐蕃大轮寺赫赫有名的护法高手，一手雪域铁掌刚猛霸道、兼修外门硬功，寻常拳剑震不开他们的护体罡气。”'),
      P('“师伯明鉴，弟子正思量该如何以柔克刚、破其横练铁身。”'),
      S('NPC-0127', '（缓缓伸出右手，拇指与食指相扣成拈花之状，微微一弹）“你既与『拈花』有此禅缘，老衲便将少林七十二绝技中极为精妙的一门地阶指法——《拈花指》，于此传授于你！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_09', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_09: {
    id: 'scene_slq11_09',
    title: '第九幕 · 柔劲透穴',
    subtitle: '大雄宝殿东厢偏室',
    mandatory: true,
    beats: [
      N('只见玄难双指轻轻一弹，劲风过处，三步外香案上一朵白菊花瓣竟丝毫无损，花瓣后方半寸厚的青砖却悄无声息地裂开一道细纹！'),
      S('NPC-0127', '“看明白了么？《拈花指》与金刚指、大力金刚掌截然相反——它讲究『触之如拂花，劲发如针透』！外门硬功练得再铁板一块，周身膻中、曲池、气海诸穴终有气脉流转之隙。以拈花柔劲透穴而入，任他铜皮铁骨，立时真气涣散！”'),
      N('玄难将《拈花指》运劲法门、指尖蓄柔透刚之诀倾囊相授。你既有《伏魔剑》之沉稳与《散花掌》之柔旋根底，片刻间便领悟了十之六七！'),
    ],
    choices: [
      {
        id: 'slq11_go_courtyard',
        label: '拜谢玄难首座，移步钟鼓禅院演武坪迎战吐蕃护法！',
        tone: 'gold',
        effects: [
          teachArtNow('MA-063'),
          { type: 'startQuest', questId: SHAOLIN_Q11_QUEST_ID, stepId: 'tubo_courtyard_spar' },
          setStep(SHAOLIN_Q11_QUEST_ID, 'tubo_courtyard_spar'),
          toast('已开启《迦叶微笑 · 灵山拈花》！请前往【钟鼓禅院 · 演武坪】迎战吐蕃大轮寺护法！', 'talk', '灵山拈花'),
        ],
      },
    ],
  },

  scene_slq11_10: {
    id: 'scene_slq11_10',
    title: '第十幕 · 演武列阵',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('钟鼓禅院演武坪四周早已站满观战的少林僧众。玄慈方丈与玄难首座并肩立于廊下石阶，神色沉静。'),
      N('坪中央，赤铜罗汉巴桑已脱去半边绛红袈裟，露出古铜色宛如铸铁般的筋骨臂膀，双掌一拍，竟发出闷雷般的金铁震响！'),
      S(SPEAKER_BASANG_MONK, '（踏步震得青砖微颤，狞笑大喝）“小和尚，听说你要用什么指法来破老僧的赤铜铁身？来来来，老僧站着不动让你戳三下，看你戳不戳得动！”'),
      P('（微微一笑，单掌合十，右手指尖轻拢如拈春花）“阿弥陀佛。护法既已运功护体，小僧便失礼了！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_11', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_11: {
    id: 'scene_slq11_11',
    title: '第十一幕 · 破铜试锋',
    subtitle: '钟鼓禅院演武坪（1v1 赤铜罗汉巴桑）',
    mandatory: true,
    beats: [
      N('巴桑口中说得狂妄，见你身形一动，立刻挥起蒲扇般的赤铜铁掌横扫而来，掌风灼热刚猛，大有开碑裂石之威！你脚踏散花步法避实就虚，以《拈花指》柔劲直取其气脉破绽！'),
    ],
    choices: [
      {
        id: 'slq11_fight_basang',
        label: '以《拈花指》柔劲迎战赤铜罗汉巴桑！（1v1 较技）',
        subLabel: '二流中品密宗护法 · 刚猛铁掌与横练硬功',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBasangMonk() },
            rule: 'story_trial',
            forbidEscapeReason: '少林满院僧众与方丈皆在观战，岂能退缩示弱！',
            introText: '【1v1 演武破硬功】迎战吐蕃大轮寺金刚护法【赤铜罗汉 · 巴桑】（二流中品）！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q11_basang_cleared', value: true },
              { type: 'healPlayer', hpPct: 70, mpPct: 70 },
              openScene('scene_slq11_12', SHAOLIN_Q11_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('巴桑铁掌刚猛沉重，暂退三步调息，再寻其穴位破绽！', 'warn', '灵山拈花'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq11_12: {
    id: 'scene_slq11_12',
    title: '第十二幕 · 柔指卸铜',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('十余合间，巴桑越打越觉憋闷——他每一记足以碎石的铁掌拍来，都被你似慢实快地滑步避开；反倒是你轻轻拂过他臂弯的两指，起初毫无痛感，三息之后却如银针透骨，直钻曲池大穴！'),
      N('你抓住他收掌换气的一瞬，右指如拈莲瓣般凌空轻点他膻中穴外半寸！一缕无形柔劲透皮而入，巴桑浑身赤铜硬气顿时如泄气皮囊般轰然溃散，踉跄连退七步，一屁股坐倒在青石坪上！'),
      S(SPEAKER_BASANG_MONK, '（捂着胸口大口喘气，满脸不可置信）“你……你的指头根本没用力，为何我一身铁布衫硬功突然散得干干净净？！”'),
      P('（合十微微欠身）“承让了。小僧所用，乃少林七十二绝技之一《拈花指》，只封气脉，不伤筋骨，护法调息片刻便能如常。”'),
    ],
    onFinishEffects: [openScene('scene_slq11_13', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_13: {
    id: 'scene_slq11_13',
    title: '第十三幕 · 铁僧下场',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('萨迦铁僧贡布脸色彻底阴沉下来。他亲自上前扶起巴桑，再抬头看你时，眼中再无半点轻视，取而代之的是雪域高手的凝重杀意！'),
      S(SPEAKER_SAJIA_MONK, '（缓缓步入演武坪中央，双手合十再猛然拉开，掌缘竟隐隐泛起一圈灼热红晕）“好一个《拈花指》！难怪敢称少林绝技！不过巴桑师弟只修外门硬功，老僧却兼修雪域铁掌与大轮密宗烈焰劲气——你这柔指若透不进我的护体罡气，今日便休想全身而退！”'),
      S('NPC-0127', '（廊下玄难微微颔首提醒）“此僧内功浑厚已达二流上品，掌中隐含雪域灼热刀意，切忌硬接其正面锋芒！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_14', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_14: {
    id: 'scene_slq11_14',
    title: '第十四幕 · 拈花对烈掌',
    subtitle: '钟鼓禅院演武坪',
    illustrationUrl: '/assets/quests/sl_11_nianhua_finger.jpg',
    illustrationCaption: '灵山拈花 · 双指柔劲破铁掌罡风，禅意与烈焰交锋演武坪',
    mandatory: true,
    beats: [
      N('秋风骤止！萨迦铁僧大喝一声密宗真言，身形如巨象奔腾踏碎青砖，双掌挟带滚滚热浪排山倒海压来！坪边石灯里的油焰都被这股霸道掌风逼得剧烈摇曳！'),
      P('（心境却如幽谷寒潭，不见半分波澜，拇指食指轻拈如花，凌空迎上）“阿弥陀佛！护法掌力虽烈，却失之躁急——且看小僧拈花破之！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_15', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_15: {
    id: 'scene_slq11_15',
    title: '第十五幕 · 决战萨迦',
    subtitle: '钟鼓禅院演武坪（1v1 萨迦铁僧）',
    mandatory: true,
    beats: [
      N('二流上品强敌萨迦铁僧全力出手，密宗铁掌刚猛无俦，间杂雪域烈焰刀劲，稍有疏忽便会被震伤内腑！唯有沉心凝神，以《拈花指》柔劲步步点破其真气节点！'),
    ],
    choices: [
      {
        id: 'slq11_fight_sajia',
        label: '凝神施展《拈花指》，力战吐蕃首席护法萨迦铁僧！（1v1 决战）',
        subLabel: '二流上品强敌 · 以柔劲透穴破雪域密宗铁掌',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSajiaIronMonk() },
            rule: 'story_trial',
            forbidEscapeReason: '此战关乎少林七十二绝技声威，唯有全力破敌！',
            introText: '【1v1 演武终战】迎战吐蕃大轮寺首席护法【萨迦铁僧 · 贡布】（二流上品）！',
            onWin: [openScene('scene_slq11_16', SHAOLIN_Q11_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('萨迦铁僧掌劲酷烈，暂且退步调匀禅息，再以拈花指复战！', 'warn', '灵山拈花'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq11_16: {
    id: 'scene_slq11_16',
    title: '第十六幕 · 隔空点脉',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('激战三十余合，演武坪上落叶狂卷！萨迦铁僧久攻不下，心浮气躁，猛然双掌合推使出压箱底的密宗重掌，热浪扑面，欲一举将你震飞出坪！'),
      N('电光火石间，你不避不闪，左掌以《散花掌》圆融弧劲斜引其三分偏锋，右手则于咫尺之间骤然探出——《拈花指》「灵山一指」！'),
      N('一缕凝练至极、细如游丝的柔和禅劲竟穿过灼热掌风，隔空一寸精准点中贡布右腕神门穴与肩头缺盆穴！'),
    ],
    onFinishEffects: [openScene('scene_slq11_17', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_17: {
    id: 'scene_slq11_17',
    title: '第十七幕 · 罡气冰消',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('“噗！”一声轻响，萨迦铁僧双掌间炽烈红晕刹那湮灭，整个人如遭雷击般僵在原地，两条铁臂无力垂落，连退三步才勉强稳住身形！'),
      N('更令三名番僧骇然的是，贡布低头一看——他胸前绛红袈裟竟完好无损，连一丝褶皱都未曾被指风撕破，可体内沸腾的密宗罡气却已如春雪遇阳，消弭得无影无踪！'),
      N('满院观战的少林僧众齐声诵响佛号，声震嵩山云霄！'),
    ],
    onFinishEffects: [openScene('scene_slq11_18', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_18: {
    id: 'scene_slq11_18',
    title: '第十八幕 · 番僧折服',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('萨迦铁僧贡布呆立良久，满脸傲慢之气尽数褪去，化作深深的敬畏与叹服。他缓步走到你身前，与随后赶来的桑杰、巴桑齐齐整肃袈裟。'),
      S(SPEAKER_SAJIA_MONK, '（声音洪亮而诚恳，再无半分挑衅）“老僧输得心服口服！破玉容易，留衣点脉难！少林寺仅仅一名达摩院内门弟子，便有如此深厚的禅机与《拈花指》修为，足见七十二绝技绝非虚传！”'),
      S(SPEAKER_SANGJIE_MONK, '（满面愧色）“方才我等在大雄宝殿妄毁青玉净瓶、言语无状，实乃坐井观天。还望玄慈方丈、玄难首座与这位高僧海涵！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_19', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_19: {
    id: 'scene_slq11_19',
    title: '第十九幕 · 合十长揖',
    subtitle: '大雄宝殿方丈院',
    illustrationUrl: '/assets/quests/sl_11_tubo_bow.jpg',
    illustrationCaption: '番僧长揖 · 吐蕃大轮寺三护法折服赔礼，恭敬辞别嵩山',
    mandatory: true,
    beats: [
      N('三名吐蕃大轮寺护法面向大雄宝殿与你郑重双手合十，躬身行了一记雪域佛门最隆重的长揖大礼，又留下一对珍贵的雪域白玉供瓶赔礼，方才恭敬辞别下山。'),
      S('NPC-0112', '（玄慈方丈步下石阶，慈眉善目地望着你，连声赞叹）“阿弥陀佛！文能拈花一笑压服辩经译师，武能柔指透穴折服铁掌护法，既守少林千年威名，又不结雪域血仇——此乃我达摩院百年难得之佳徒！”'),
      S('NPC-0127', '（玄难首座亦抚须微笑）“此番交手，你已将《拈花指》的『柔而不弱、透骨不伤』体悟至大成。方丈在此见证，今日便将这门七十二绝技之一正式录于你名下！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_20', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_20: {
    id: 'scene_slq11_20',
    title: '第二十幕 · 绝技真传',
    subtitle: '大雄宝殿方丈院',
    mandatory: true,
    beats: [
      N('玄慈方丈亲手为你加披达摩院高阶袈裟绶带，玄难则将珍藏的《拈花指法全卷》交予你手。'),
      S('NPC-0112', '“切记：七十二绝技虽妙，终究只是渡河之舟。每多学一门绝技，便须以更深厚的慈悲佛法化解其中戾气，切不可重蹈昔年偏执强练之覆辙。”'),
      P('（心头微动，双手接过法卷郑重稽首）“弟子谨记方丈与首座慈训，必以佛法修心，不敢稍有骄躁！”'),
    ],
    choices: [
      {
        id: 'slq11_complete',
        label: '拜谢玄慈方丈与玄难首座，正式领受《拈花指》真传',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-063' },
          { type: 'giveCombatExp', amount: 420, reason: '无声禅辩压阵并以拈花指连破吐蕃大轮寺护法' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'modifySkill', key: '辩才', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q11_QUEST_ID, outcome: 'completed' },
          toast('已完成《迦叶微笑 · 灵山拈花》，习得少林地阶绝学《拈花指》！', 'success', '灵山拈花'),
        ],
      },
    ],
  },
}
