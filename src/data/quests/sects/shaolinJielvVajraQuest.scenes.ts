import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q27_QUEST_ID } from './shaolinJielvVajraQuest'

const SPEAKER_DEMON_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '欢喜魔僧',
  title: '关洛邪道巨擘 · 伪袈裟妖僧',
  factionName: '关洛邪道',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildJoyousDemonMonkBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ27_DEMON_MONK',
    name: '欢喜魔僧',
    title: '关洛邪道巨擘 · 闭穴妖僧',
    realm: '一流中品',
    factionId: 'SECT-21',
    factionName: '关洛邪道',
    sectRank: 3,
    sectRankLabel: '邪道巨擘',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“哈哈哈！少林寺的戒律黑铁法牌？正好拿来给本座垫酒壶！本座一身闭穴邪功刀枪不入，点穴手法对我屁用没有，小和尚你来试试看啊！”',
    stats: { hp: 3480, mp: 2300, agi: 72, res: 68 },
    talents: { bone: 90, comprehension: 80, charm: 42 },
    equippedArts: { neigong: 'MA-080', move1: 'MA-072', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-080', level: 8 }, { artId: 'MA-072', level: 8 }, { artId: 'MA-244', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq27_01: {
    id: 'scene_slq27_01',
    title: '第一幕 · 钟鼓肃杀',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}仲夏，雷云低垂。你入寺倏忽已满十载，今日奉戒律院急召来到【钟鼓禅院 · 演武坪】，只见一拍神僧玄寂与铁掌禅师玄痛并肩肃立于大钟之下，神色前所未有地严峻。'),
      N('石案之上，摆着一块通体漆黑、阴刻「戒律伏魔」四个朱砂篆字的沉重黑铁法牌，以及一封来自汝州、许州官民联名递上的血泪控诉状。'),
      P('（合十躬身）“弟子拜见玄寂师伯、玄痛师伯！见二位师伯请出戒律黑铁法牌，莫非关洛江湖出了大逆不道之邪徒？”'),
    ],
    onFinishEffects: [openScene('scene_slq27_02', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_02: {
    id: 'scene_slq27_02',
    title: '第二幕 · 妖僧辱门',
    subtitle: '钟鼓禅院 · 汝许血状',
    mandatory: true,
    beats: [
      S('NPC-0134', '（将血泪控诉状递与你，声如闷雷）“阿弥陀佛！师侄你且看——近三月来，关洛邪道巨擘【欢喜魔僧】竟冒穿我少林红黄袈裟，在汝州、许州交界的一座荒山废寺地宫中私设妖坛，假托少林活佛名号欺压乡里、掳掠良家、残害敢于反抗的义士！”'),
      S('NPC-0156', '（铁掌拍案，怒不可遏）“此獠不仅败坏我少林千年清誉，更练成一门邪毒无比的『闭穴气功』！此前两名下山查访的少林师弟中了他的埋伏，点穴掌力打在他身上竟如泥牛入海，险些丧命！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_03', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_03: {
    id: 'scene_slq27_03',
    title: '第三幕 · 联手授指',
    subtitle: '钟鼓禅院 · 金刚破邪',
    mandatory: true,
    beats: [
      S('NPC-0134', '“邪道闭穴气功，乃是强行将周身三十六处大穴真气反锁、在皮膜之下结成一层气障。寻常拳掌与轻灵点穴难以破之，唯独我少林七十二绝技中至阳至刚、无坚不摧的《大力金刚指》，方能一指洞穿气障、直破其命门！”'),
      S('NPC-0156', '“你经义逾七十六、书法逾六十，又已得玄寂师兄《般若掌》真传，正是戒律院新一代最可靠的执法人选！今日老衲与玄寂师兄便联手授你《大力金刚指》！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_04', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_04: {
    id: 'scene_slq27_04',
    title: '第四幕 · 铁指断欲',
    subtitle: '钟鼓禅院 · 演武坪传功',
    mandatory: true,
    beats: [
      N('演武坪青石之上，玄痛为你演示《大力金刚指》刚猛凌厉的「穿金裂石」指劲，一指点出竟在三尺外的铜钟裙边留下清晰指印；玄寂则以禅理为你拆解如何以《般若掌》绵厚内息温养指脉，做到「刚而不折、怒而不乱」。'),
      P('（凝神领悟，指风呼啸破空）“外现金刚怒目之威，内守般若澄明之心！弟子已悟透《大力金刚指》破邪断欲之诀！”'),
    ],
    onFinishEffects: [teachArtNow('MA-044'), openScene('scene_slq27_05', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_05: {
    id: 'scene_slq27_05',
    title: '第五幕 · 亲赐法牌',
    subtitle: '钟鼓禅院 · 黑铁戒律牌',
    mandatory: true,
    beats: [
      N('玄寂双手捧起案上那块沉甸甸的【戒律黑铁法牌】，郑重交入你掌心！'),
      S('NPC-0134', '“持此戒律黑铁法牌，你便代表嵩山少林寺戒律院清理门户、荡除假冒妖僧！记住：欢喜魔僧乃一流中品邪道巨擘，阴狠狡诈，万不可留情，须破其闭穴邪功、剥其伪袈裟、押回嵩山明正典刑！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_06', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_06: {
    id: 'scene_slq27_06',
    title: '第六幕 · 誓清佛门',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      P('（紧握冰冷沉重的黑铁法牌，叩首领命）“弟子谨遵二位师伯法旨！妖僧冒穿袈裟祸乱汝许百姓，天理难容！弟子定将欢喜魔僧擒回嵩山典刑，还汝许百姓与少林寺一个朗朗乾坤！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_07', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_07: {
    id: 'scene_slq27_07',
    title: '第七幕 · 领牌出山',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('乌云散开一线天光，钟鼓禅院古钟轻鸣一声为你壮行。你佩好戒律黑铁法牌，准备直扑汝许荒山废寺地宫！'),
    ],
    choices: [
      {
        id: 'slq27_accept_purge',
        label: '手持戒律黑铁法牌，开启【铁指断欲 · 降伏其心】下山缉魔',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q27_QUEST_ID, stepId: 'purge_ruxu_crypt' },
          setStep(SHAOLIN_Q27_QUEST_ID, 'purge_ruxu_crypt'),
          openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq27_08: {
    id: 'scene_slq27_08',
    title: '第八幕 · 暗访汝许',
    subtitle: '汝许官道 · 寻踪觅迹',
    mandatory: true,
    beats: [
      N('你施展《一苇渡江》星夜南下汝许，沿途但闻乡民谈及「欢喜妖僧」无不咬牙切齿，顺着樵夫指引很快寻至荒山深处那座阴森破败的古寺遗址。'),
    ],
    onFinishEffects: [openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_09: {
    id: 'scene_slq27_09',
    title: '第九幕 · 废寺地宫',
    subtitle: '汝许荒山 · 妖坛入口',
    illustrationUrl: '/assets/quests/sl_27_ruined_crypt.jpg',
    illustrationCaption: '废寺地宫 · 残佛断壁之下幽火摇曳，你手持戒律黑铁法牌踏入欢喜魔僧盘踞的阴森地宫',
    mandatory: true,
    beats: [
      N('荒草丛生的残破大殿正中，一道黑黝黝的石阶直通地下！地宫深处飘来刺鼻的酒肉腥气与靡靡熏香，数十盏幽绿人油灯照亮了一座金玉铺就的奢靡妖坛！'),
      N('你毫不犹豫拾阶而下，一路以《般若掌》震昏外围几名把风的邪道恶徒，阔步踏入地宫主殿！'),
    ],
    onFinishEffects: [openScene('scene_slq27_10', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_10: {
    id: 'scene_slq27_10',
    title: '第十幕 · 伪袈裟魔',
    subtitle: '废寺地宫 · 妖坛对峙',
    mandatory: true,
    beats: [
      N('只见妖坛玉座之上，一名满脸横肉、目露淫邪凶光的胖大僧人正大口啖肉饮酒，身上赫然披着一件不知从何处盗制而来的少林红黄袈裟！地宫角落里还关着几名被强掳而来的无辜乡民！'),
      P('（高举【戒律黑铁法牌】，声震地宫石壁）“呔！冒穿少林袈裟、祸乱汝许生灵的妖孽！嵩山少林寺戒律院真传奉黑铁法牌前来拿你！速速脱下伪袈裟束手就擒！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_11', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_11: {
    id: 'scene_slq27_11',
    title: '第十一幕 · 魔僧狂言',
    subtitle: '废寺地宫 · 闭穴嚣张',
    mandatory: true,
    beats: [
      S(SPEAKER_DEMON_MONK, '（摔碎酒碗，狂笑起身）“哈哈哈！我还当是玄慈、玄寂老秃驴亲至呢，原来只派了个毛头真传来送死！你瞧瞧本座这身红黄袈裟，穿在身上多威风！至于你们少林的破点穴功夫——”'),
      N('欢喜魔僧猛然运功，浑身肥肉竟瞬间绷紧如紫铜浇铸，周身大穴气血倒锁，发出一阵令人牙酸的骨骼爆鸣！'),
      S(SPEAKER_DEMON_MONK, '“本座『欢喜闭穴邪功』已臻大成，穴道移位气障护体，今夜便拿你的脑袋来祭我的妖坛！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_12', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_12: {
    id: 'scene_slq27_12',
    title: '第十二幕 · 怒斥邪道',
    subtitle: '废寺地宫 · 正邪交锋',
    mandatory: true,
    beats: [
      P('（目蕴金刚怒火，食中二指缓缓并拢）“佛门净土岂容你这禽兽玷污！闭穴邪功再厚，在少林《大力金刚指》面前也不过一层薄纸！今日便替汝许百姓与少林列祖清理你这败类！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_13', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_13: {
    id: 'scene_slq27_13',
    title: '第十三幕 · 血刀寒掌',
    subtitle: '废寺地宫 · 妖坛险境',
    mandatory: true,
    beats: [
      N('欢喜魔僧怪笑一声，自座下抽出一柄暗红血刀，左手寒风邪掌、右手血刀疾劈，借着地宫狭窄地形朝你猛扑而来！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q27_crypt_entered', value: true },
      openScene('scene_slq27_14', SHAOLIN_Q27_QUEST_ID),
    ],
  },

  scene_slq27_14: {
    id: 'scene_slq27_14',
    title: '第十四幕 · 地宫伏魔',
    subtitle: '废寺地宫 · 决战欢喜魔僧',
    mandatory: true,
    beats: [
      N('幽灯明灭，血气冲天！一流中品关洛邪道巨擘欢喜魔僧闭穴护体、凶焰滔天，立刻全力迎战，以《大力金刚指》戳破其闭穴气功！'),
    ],
    choices: [
      {
        id: 'slq27_fight_demon_monk',
        label: '执黑铁法牌、运《大力金刚指》，力战【欢喜魔僧】（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q27_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJoyousDemonMonkBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            introText: '废寺地宫生死伏魔！欢喜魔僧闭穴气功极难攻破，务必稳守周旋、寻找其丹田气门破绽一指破功！',
            onWin: [openScene('scene_slq27_15', SHAOLIN_Q27_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '欢喜魔僧血刀与闭穴邪功极为凶悍！调息后可再于【钟鼓禅院 · 演武坪】动身续战地宫。',
                'warn',
                '地宫伏魔',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq27_15: {
    id: 'scene_slq27_15',
    title: '第十五幕 · 气门破绽',
    subtitle: '废寺地宫 · 察觉罩门',
    mandatory: true,
    beats: [
      N('地宫中掌风刀影激撞三十余合！欢喜魔僧虽凭闭穴气功硬抗了你数记《般若掌》，却也被震得气血翻腾、动作渐滞！'),
      N('你眼尖如电，骤然看穿他强行闭锁三十六穴后，所有暴走邪气都不得不汇集于檀中穴下方三寸处隐隐鼓动——那里正是他闭穴邪功唯一的死门！'),
    ],
    onFinishEffects: [openScene('scene_slq27_16', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_16: {
    id: 'scene_slq27_16',
    title: '第十六幕 · 铁指破功',
    subtitle: '废寺地宫 · 闭穴崩解',
    illustrationUrl: '/assets/quests/sl_27_iron_finger.jpg',
    illustrationCaption: '铁指断欲 · 你凌空突进避开血刀，以至阳至刚的《大力金刚指》一指戳破欢喜魔僧闭穴气功罩门',
    mandatory: true,
    beats: [
      N('你借《一苇渡江》贴地疾滑钻入血刀空门，左手一掌震开其刀腕，右手食中二指骤然爆发出刺目金芒般浑厚的纯阳真气，狠狠点中他檀中穴下三寸气门！'),
      N('“噗嗤——轰！！”仿佛吹胀到极致的牛皮鼓被铁锥戳破！欢喜魔僧周身闭穴气障瞬间炸裂溃散，浑身暴走邪气倒冲经脉，血刀脱手坠地，一声惨嚎重重砸碎妖坛！'),
    ],
    onFinishEffects: [openScene('scene_slq27_17', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_17: {
    id: 'scene_slq27_17',
    title: '第十七幕 · 剥袍救民',
    subtitle: '废寺地宫 · 邪坛倾覆',
    mandatory: true,
    beats: [
      S(SPEAKER_DEMON_MONK, '（口吐黑血，满脸绝望）“我的……我的闭穴邪功全破了……少林《大力金刚指》竟如此霸道……”'),
      N('你上前一把扯下他身上那件污浊的伪冒红黄袈裟，用铁链死死锁住其琵琶骨，旋即打开地宫铁牢，将遭劫的乡民尽数解救护送出山、移交当地官府妥善安置！'),
    ],
    onFinishEffects: [openScene('scene_slq27_18', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_18: {
    id: 'scene_slq27_18',
    title: '第十八幕 · 锁魔归嵩',
    subtitle: '汝许荒山 · 押解返寺',
    mandatory: true,
    beats: [
      N('汝许百姓闻讯奔走相告，纷纷焚香礼拜，称颂少林真传仗义除魔、清正佛门！你押解垂死挣扎的欢喜魔僧，一路北返嵩山少林寺！'),
    ],
    choices: [
      {
        id: 'slq27_return_shaolin',
        label: '押解欢喜魔僧返回【钟鼓禅院 · 演武坪】，交由玄寂、玄痛典刑',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q27_QUEST_ID, 'return_daxiong_west'),
          toast(
            '已戳破欢喜魔僧闭穴气功、救出无辜乡民！请押解魔僧返回【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】复命典刑。',
            'talk',
            '铁指断欲',
          ),
        ],
      },
    ],
  },

  scene_slq27_19: {
    id: 'scene_slq27_19',
    title: '第十九幕 · 演武典刑',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_27_law_plaque.jpg',
    illustrationCaption: '法牌典刑 · 钟鼓禅院演武坪群僧肃立，你交还戒律黑铁法牌，玄寂与玄痛宣判将欢喜魔僧依律严惩',
    mandatory: true,
    beats: [
      N('回到钟鼓禅院演武坪，数百名戒律院与护法武僧早已肃立两厢。你将铁链锁拿的欢喜魔僧推至阶前，双手奉上那件撕下的伪冒袈裟与【戒律黑铁法牌】。'),
      S('NPC-0134', '（朗声宣法，声震全寺）“阿弥陀佛！邪道妖孽欢喜魔僧冒穿少林袈裟、残害汝许良民，今蒙我寺真传弟子以《大力金刚指》破其邪功生擒归案！传令：即刻押送开封与汝州官府明正典刑，以正佛门清规、慰藉天下苍生！”'),
      N('满坪僧众齐声高颂佛号，敬佩目光尽皆聚焦于你一身！'),
    ],
    onFinishEffects: [openScene('scene_slq27_20', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_20: {
    id: 'scene_slq27_20',
    title: '第二十幕 · 二老赞叹',
    subtitle: '钟鼓禅院 · 真传圆满',
    mandatory: true,
    beats: [
      S('NPC-0156', '（拍手大笑，满面欣慰）“痛快！一指戳破闭穴邪功，剥伪袈裟、救众良民，既护住了少林千年声誉，又行了大侠义于关洛之间！这卷《大力金刚指》完整秘录，你当之无愧！”'),
      S('NPC-0134', '“般若掌化邪于无形，大力金刚指摧魔于一点。十载修行至此，你于戒律护法一脉之绝艺，已然功德圆满！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_21', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_21: {
    id: 'scene_slq27_21',
    title: '第二十一幕 · 降伏其心',
    subtitle: '钟鼓禅院 · 佛前自省',
    mandatory: true,
    beats: [
      P('（双手合十，向玄寂、玄痛二位师伯深深一拜）“弟子谨记『降伏其心』四字！武功愈深，愈当戒慎恐惧、护法安民，绝不负少林十载养育之恩！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_22', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_22: {
    id: 'scene_slq27_22',
    title: '第二十二幕 · 清风满院',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('骤雨初歇，嵩山晴空万里，钟鼓禅院响起悠扬浑厚的晚钟。你以《大力金刚指》荡除妖僧、侠名远播关洛，真传单脉的修行已臻一流中品绝顶之境！'),
    ],
    choices: [
      {
        id: 'slq27_complete',
        label: '习得《大力金刚指》，圆满完成【铁指断欲 · 降伏其心】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-044', level: 1 },
          {
            type: 'giveCombatExp',
            amount: 700,
            reason: '持戒律黑铁法牌杀入汝许废寺地宫，以《大力金刚指》戳破欢喜魔僧闭穴气功并押回嵩山典刑',
          },
          { type: 'addSectContribution', amount: 240 },
          {
            type: 'modifyChivalry',
            delta: 40,
            reason: '清剿冒穿少林袈裟祸乱汝许的欢喜魔僧，解救无辜乡民并押送典刑',
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q27_QUEST_ID, outcome: 'completed' },
          toast(
            '【铁指断欲 · 降伏其心】圆满完成！习得《大力金刚指》，实战经验 +700、贡献 +240、侠义 +40、经义 +1！',
            'success',
            '铁指断欲',
          ),
        ],
      },
    ],
  },
}
