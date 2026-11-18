import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_FANLOU_NIGHT_QUEST_ID } from './jinjunFanlouNightQuest'

function buildFakeGuardThug1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJFN_THUG_1',
    name: '侯三疤',
    title: '假冒殿前司恶霸',
    factionId: 'SECT-18',
    factionName: '汴京黑市恶徒',
    fullLocationLabel: '开封府 · 汴河虹桥',
    realm: '一流中品',
    stats: { hp: 2880, mp: 2560, agi: 68, res: 54 },
    talents: { bone: 72, comprehension: 60, charm: 42 },
    tenArts: { 骑术: 55, 算术: 30, 经义: 10, 策论: 20, 诗词: 10, 琴: 5, 棋: 15, 书: 15, 画: 5, 辩才: 40 },
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    sectRank: 3,
    sectRankLabel: '黑道头目',
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-132', move2: 'MA-151', move3: 'MA-124', move4: 'MA-131' },
    learnedArts: [
      { artId: 'MA-103', level: 7 },
      { artId: 'MA-157', level: 7 },
      { artId: 'MA-132', level: 7 },
      { artId: 'MA-151', level: 7 },
      { artId: 'MA-124', level: 7 },
      { artId: 'MA-131', level: 7 },
    ],
    equipped: { weapon: 'WPN-043', armor: 'ARM-026', shoes: 'BOT-012', bow: 'BOW-013', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-012' },
    talk: '“管你是真都指挥还是假都指挥！既然撞破了老子的财路，今夜便把你沉进汴河！”',
  })
}

function buildFakeGuardThug2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJFN_THUG_2',
    name: '独眼狼·沈七',
    title: '重金聘用江湖保镖',
    factionId: 'SECT-18',
    factionName: '汴京黑市恶徒',
    fullLocationLabel: '开封府 · 汴河虹桥',
    realm: '一流中品',
    stats: { hp: 2940, mp: 2620, agi: 70, res: 55 },
    talents: { bone: 74, comprehension: 62, charm: 38 },
    tenArts: { 骑术: 60, 算术: 20, 经义: 10, 策论: 25, 诗词: 8, 琴: 5, 棋: 12, 书: 10, 画: 5, 辩才: 30 },
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    sectRank: 3,
    sectRankLabel: '江湖死士',
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-144', move2: 'MA-131', move3: 'MA-151', move4: 'MA-189' },
    learnedArts: [
      { artId: 'MA-103', level: 7 },
      { artId: 'MA-157', level: 7 },
      { artId: 'MA-144', level: 7 },
      { artId: 'MA-131', level: 7 },
      { artId: 'MA-151', level: 7 },
      { artId: 'MA-189', level: 7 },
    ],
    equipped: { weapon: 'WPN-044', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-013', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    talk: '“拿人钱财，替人消灾！四厢大人接招吧！”',
  })
}

function buildColdBladeBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJFN_BOSS',
    name: '冷无忌',
    title: '血手刀 · 黑道供奉',
    factionId: 'SECT-18',
    factionName: '汴京黑市枭雄',
    fullLocationLabel: '开封府 · 大相国寺后巷破院',
    realm: '一流上品',
    stats: { hp: 3540, mp: 3310, agi: 75, res: 62 },
    talents: { bone: 80, comprehension: 75, charm: 50 },
    tenArts: { 骑术: 65, 算术: 55, 经义: 20, 策论: 45, 诗词: 18, 琴: 10, 棋: 35, 书: 25, 画: 12, 辩才: 52 },
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    sectRank: 4,
    sectRankLabel: '幕后枭首',
    equippedArts: { neigong: 'MA-037', qinggong: 'MA-092', move1: 'MA-123', move2: 'MA-130', move3: 'MA-132', move4: 'MA-151' },
    learnedArts: [
      { artId: 'MA-037', level: 8 },
      { artId: 'MA-092', level: 8 },
      { artId: 'MA-123', level: 9 },
      { artId: 'MA-130', level: 9 },
      { artId: 'MA-132', level: 8 },
      { artId: 'MA-151', level: 8 },
    ],
    equipped: { weapon: 'WPN-019', armor: 'ARM-012', shoes: 'BOT-007', bow: 'BOW-008', accessory1: 'ACC-009', accessory2: 'ACC-023', mount: 'MNT-012' },
    talk: '“侯三疤那废物果然漏了风声！不过一个禁军四厢都指挥，也敢孤身闯我血手刀的院子？”',
  })
}

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_fn_01_street_patrol',
  title: '第一幕 · 御街夜巡',
  subtitle: '开封府 · 樊楼灯火',
  mandatory: true,
  beats: [
    N('{reignYear}夜色深沉，东京汴梁夜市却依旧灯火如昼、丝竹不绝。你身披【大宋禁军 · 四厢都指挥】紫红巡夜战袍，携着副将徐铁山率一队宿卫甲士按制巡视马行街。'),
    S('NPC-0284', '（抬头望向五层飞桥灯火辉煌的樊楼，眉头微蹙）“大人，三更已过，按大宋宵禁之例，酒楼虽可通宵营业，却绝不容带兵甲喧哗斗殴。您听——樊楼三层雅阁怎有瓷器碎裂与女子哭喊之声？”'),
    P('（勒住马缰，翻身下马整了整腰间殿前司腰牌）“走，随我登楼瞧瞧！若是京中泼皮闹事便交予开封府；若是禁军将卒敢借酒撒泼，本官今日便按军法清理门户！”'),
  ],
  onFinishEffects: [openScene('scene_jj_fn_02_drunk_nobles', JINJUN_FANLOU_NIGHT_QUEST_ID)],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_fn_02_drunk_nobles',
  title: '第二幕 · 醉汉闹楼',
  subtitle: '开封府 · 樊楼三层雅阁',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_fanlou_patrol.jpg',
  illustrationCaption: '樊楼夜巡 · 四厢都指挥当众弹压勋贵散官',
  beats: [
    N('推开飞桥雅阁雕花木门，满地碎裂的越州青瓷酒盏与倾倒的屏风映入眼帘。三名身着禁军散官锦袍的纨绔子弟正满脸醉红，拉扯一名抱着琵琶瑟瑟发抖的歌姬，樊楼掌柜跪在门槛边苦苦哀求。'),
    S({ name: '醉酒散官', title: '殿前司荫补散官', factionName: '京师勋戚子弟' }, '（斜睨着门外甲士，酒气熏天地挥手）“哪来的不长眼巡卒！老子叔父乃三衙旧将，今日包下这间雅阁听曲，砸几只破碗怎么了？滚出去！”'),
    P('（大步踏入雅阁，将腰间鎏金四厢都指挥虎符重重拍在紫檀桌面，声如洪钟）“三衙旧将的子侄，便是这般在御街酒楼败坏天子禁军清誉的么？！”'),
  ],
  onFinishEffects: [openScene('scene_jj_fn_03_authority_rebuke', JINJUN_FANLOU_NIGHT_QUEST_ID)],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_fn_03_authority_rebuke',
  title: '第三幕 · 官威弹压',
  subtitle: '开封府 · 樊楼雅阁',
  mandatory: true,
  beats: [
    N('那几名散官见你亮出货真价实的四厢都指挥印信，酒意瞬间醒了大半，却仍强作镇定欲以家世说情。你条分缕析引大宋《军防令》与官家“禁旅不得扰民”御训，字字诛心，压得几人面红耳赤、无言以对。'),
    S('NPC-0284', '（大步上前将三人反剪押住，痛快拱手）“大人好生威严！且由末将把这几个败类押回八十万禁军大教场，明日按军棍发落并申饬其父兄！”'),
    N('满楼食客与掌柜纷纷起身拱手赞叹。樊楼掌柜感激涕零，双手捧出一只御酒坊流出的越州秘色青瓷温酒壶，却被你严词谢绝，只嘱其安分营生。'),
  ],
  onFinishEffects: [openScene('scene_jj_fn_04_veteran_plea', JINJUN_FANLOU_NIGHT_QUEST_ID)],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_fn_04_veteran_plea',
  title: '第四幕 · 残老诉冤',
  subtitle: '开封府 · 樊楼角门外',
  mandatory: true,
  beats: [
    N('方才步出樊楼角门，一名衣衫褴褛、右袖空荡的断臂老卒突然扑上前拉住你的马缰，老泪纵横地叩首。'),
    S({ name: '断臂老卒', title: '昔年西军退伍老兵', factionName: '汴河船夫' }, '“青天大将军！小人曾随种相公在延安守城折了右臂，如今在汴河虹桥替人撑船糊口……近半年来，总有几名佩着‘殿前司采买’铜牌的恶汉，动辄强征我等民船运私货，非但不给船钱，讨薪便打得皮开肉绽啊！”'),
    P('（连忙扶起老卒，眸中寒光微凛）“殿前司采买自有内府银钱支应，何曾强征过民船？！老丈莫哭，你且先回歇息，本官今夜便去汴河虹桥走一遭，定为你与众船夫讨回血汗钱！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_FANLOU_NIGHT_QUEST_ID, stepId: 'investigate_hongqiao' },
    toast('已锁定线索：前往【开封府 · 汴河虹桥 · 临水酒肆】暗察假冒采买！'),
  ],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_fn_05_hongqiao_probe',
  title: '第五幕 · 虹桥暗察',
  subtitle: '开封府 · 汴河虹桥 · 临水酒肆',
  mandatory: true,
  beats: [
    N('换上一身寻常青布直裰，你独行来到汴河虹桥畔的临水酒肆。借着灯笼微光，果见靠窗一桌坐着两名佩着黄铜腰牌的凶悍汉子，身旁还立着一名眼神阴鸷的独眼刀客，正拍着一本油渍麻花的账册哈哈大笑。'),
    P('（假作问路客凑近酒柜，趁小二添酒之机瞥见那本账册与腰牌——腰牌铜色暗哑，绝非内库鎏金官造；心下飞快盘算账面上的船只吨位与半年抽成……竟已强占了整整千余两民脂民膏！）'),
  ],
  onFinishEffects: [openScene('scene_jj_fn_06_fake_tally', JINJUN_FANLOU_NIGHT_QUEST_ID)],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_fn_06_fake_tally',
  title: '第六幕 · 真假腰牌',
  subtitle: '开封府 · 汴河虹桥',
  mandatory: true,
  beats: [
    S({ name: '侯三疤', title: '假冒殿前司恶霸', factionName: '汴京黑市恶徒' }, '（将空碗重重一顿，踢开脚边一名端茶慢了的老船夫）“老东西磨蹭什么！明早五更把十条大驳船全靠到西水门，否则老子砸了你的吃饭家伙！”'),
    P('（冷笑一声，缓步踏前，手腕一翻亮出货真价实的殿前司四厢都指挥鎏金虎符）“好大的官威！殿前司何曾有你这号满脸横肉的采买官？把假牌子摘下来，随本官回衙门走一趟罢！”'),
    S({ name: '独眼狼·沈七', title: '重金聘用江湖保镖', factionName: '汴京黑市恶徒' }, '（霍然拔刀拦在桌前，独眼射出凶光）“侯三，点子扎手，是个硬茬真官！别废话，一起上做掉他！”'),
  ],
  onFinishEffects: [openScene('scene_jj_fn_07_bridge_fight', JINJUN_FANLOU_NIGHT_QUEST_ID)],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_fn_07_bridge_fight',
  title: '第七幕 · 桥头拿贼',
  subtitle: '开封府 · 汴河虹桥（1v2 激战）',
  mandatory: true,
  beats: [
    N('酒肆桌椅瞬间掀翻，侯三疤与独眼狼沈七一左一右挥刀扑来！二人身手皆已臻一流中品，招招奔着要害而来，显然绝非寻常市井泼皮！'),
  ],
  choices: [
    {
      id: 'jjfn_bridge_fight_go',
      label: '横兵迎战，擒拿假冒采买恶徒（1v2 一流中品）',
      subLabel: '实战考验：击溃侯三疤与独眼狼沈七',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_FANLOU_NIGHT_QUEST_ID,
          opponent: { kind: 'custom', npc: buildFakeGuardThug1() },
          extraOpponents: [{ kind: 'custom', npc: buildFakeGuardThug2() }],
          rule: 'story_trial',
          forbidEscapeReason: '贼人当街行凶，身为四厢都指挥岂容退避！',
          introText: '【1v2 虹桥拿贼】迎战假冒殿前司恶霸【侯三疤（一流中品）】与江湖保镖【独眼狼·沈七（一流中品）】！',
          onWin: [
            { type: 'setQuestStep', questId: JINJUN_FANLOU_NIGHT_QUEST_ID, stepId: 'raid_xiangguosi_alley' },
            toast('虹桥拿贼大捷！侯三疤供出幕后主使冷无忌藏身【大相国寺后巷破院】！'),
          ],
          onLose: [toast('暂且退下调息整备，稍后再赴汴河虹桥拿贼！')],
        },
      ],
    },
  ],
}

const SCENE_08: StorySceneDef = {
  id: 'scene_jj_fn_08_xiangguosi_boss',
  title: '第八幕 · 相国寺巷斩枭',
  subtitle: '开封府 · 大相国寺万姓雅市后巷',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_xiangguosi_alley_duel.jpg',
  illustrationCaption: '相国寺暗巷月夜 · 决战血手刀冷无忌',
  beats: [
    N('依着侯三疤的供词，你单人快马直扑大相国寺万姓雅市后方的荒僻破院。月色如霜，院中堆满十余口沉甸甸的樟木箱笼，一名青衫冷面的刀客正欲携箱翻墙遁走，见你堵住院门，缓缓拔出手中厚背鬼头大刀。'),
    S({ name: '冷无忌', title: '血手刀 · 黑道供奉', factionName: '汴京黑市枭雄' }, '“能在十合之内放倒侯三与沈七，难怪敢管汴河上的闲事。既来了，便留下项上人头吧——尝尝老夫浸淫三十年的血手刀！”'),
    P('（内力运转周天，兵刃斜指地面）“盘剥退伍老卒、假冒朝廷禁军，罪无可赦！今日便拿你的人头与这十箱赃银，祭我汴梁清明！”'),
  ],
  choices: [
    {
      id: 'jjfn_boss_fight',
      label: '生死决战！斩杀「血手刀」冷无忌（一流上品）',
      subLabel: '硬仗预警：对手为一流上品刀客（败北将调息重整）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_FANLOU_NIGHT_QUEST_ID,
          opponent: { kind: 'custom', npc: buildColdBladeBoss() },
          rule: 'story_trial',
          forbidEscapeReason: '赃银与贼首近在咫尺，岂能放虎归山！',
          introText: '【1v1 暗巷决战】迎战一流上品黑道枭首【血手刀 · 冷无忌】！',
          onWin: [
            { type: 'setQuestStep', questId: JINJUN_FANLOU_NIGHT_QUEST_ID, stepId: 'return_silver_kaifengfu' },
            toast('斩杀冷无忌，起获全部赃银！请前往【开封府升堂正殿】公堂发还民资。'),
          ],
          onLose: [toast('冷无忌刀法狠辣，且退后重整内息再战！')],
        },
      ],
    },
  ],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_fn_09_return_silver',
  title: '第九幕 · 府前发还',
  subtitle: '开封府 · 开封府升堂正殿',
  mandatory: true,
  beats: [
    N('五更天刚蒙蒙亮，你已命禁军弟兄将十口樟木箱笼抬至开封府衙前，当着满街早起百姓与数十名汴河船夫的面，按账册逐一核验发还被克扣的血汗银两。那位断臂退伍老卒捧着失而复得的银钱，跪地哽咽不止。'),
    S('NPC-0140', '（展昭负手立于开封府檐下含笑观礼，待百姓散去后走来拱手）“好个四厢都指挥！一夜间端了假冒殿前司的黑窝，连潜伏京师多年的血手刀冷无忌也一并伏诛——你这番雷霆手段，倒把咱们六扇门的差事全抢了去！”'),
    P('（失笑拱手还礼）“展大哥谬赞了，禁军军纪容不得半粒沙子，卑职不过分内之事。”'),
  ],
  onFinishEffects: [openScene('scene_jj_fn_10_dawn_return', JINJUN_FANLOU_NIGHT_QUEST_ID)],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_fn_10_dawn_return',
  title: '第十幕 · 灯火归营',
  subtitle: '开封府 · 八十万禁军大教场',
  mandatory: true,
  beats: [
    N('辰时初刻，晨曦洒满八十万禁军大教场。你归营点卯交割案卷，枢密使王德用虽未多言，只微微颔首嘉许，特命内司拨银八十两赏赐巡夜有功之士，并赐下越州秘色青瓷温酒壶以为纪念。'),
    N('怀中还静静躺着那名退伍老兵临别前硬塞给你的铜哨，御街早市的炊烟与军营晨鼓交织在一起，守护这片人间烟火，正是大宋禁军立身之本。'),
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 80 },
    { type: 'giveCombatExp', amount: 1200 },
    { type: 'modifyRenown', delta: 25 },
    { type: 'modifyChivalry', delta: 25 },
    { type: 'giveItem', itemId: 'ITM-CUR-021', qty: 1 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0140' }, delta: 12 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0284' }, delta: 15 },
    { type: 'addSectContribution', amount: 80 },
    { type: 'completeQuest', questId: JINJUN_FANLOU_NIGHT_QUEST_ID, outcome: 'completed' },
    toast('《樊楼夜 · 禁军巡夜录》完成！获纹银 80 两、战斗经验 1200、越州秘色青瓷莲花温酒执壶！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_fn_01_street_patrol: SCENE_01,
  scene_jj_fn_02_drunk_nobles: SCENE_02,
  scene_jj_fn_03_authority_rebuke: SCENE_03,
  scene_jj_fn_04_veteran_plea: SCENE_04,
  scene_jj_fn_05_hongqiao_probe: SCENE_05,
  scene_jj_fn_06_fake_tally: SCENE_06,
  scene_jj_fn_07_bridge_fight: SCENE_07,
  scene_jj_fn_08_xiangguosi_boss: SCENE_08,
  scene_jj_fn_09_return_silver: SCENE_09,
  scene_jj_fn_10_dawn_return: SCENE_10,
}
