import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_1_ID } from './jinjunMurongArc1Quest'

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_mr1_01_rainy_summons',
  title: '第一幕 · 秋雨急召',
  subtitle: '开封府 · 枢密院密议',
  mandatory: true,
  beats: [
    N('{reignYear}深秋，东京汴梁秋雨连绵，檐水如注。三更刚过，一骑快马踏碎皇城长街积水，金牌急诏将你这位新晋【大宋禁军 · 三衙都虞候】召入枢密院签押房。'),
    S('NPC-0038', '（枢密使王德用黑面如铁，将一盏青瓷茶碗重重顿在案上，茶水四溅）“出大事了！军器监方才督造完成的破辽第一利器——‘神臂弓’全套总图、三具定型样弩，连同火药箭秘方，今夜竟在重兵把守的铁库之内不翼而飞！”'),
    P('（心头一凛，拱手沉声问）“铁库三重铜锁、又有禁军轮值，贼人如何能神不知鬼不觉盗走？”'),
    S('NPC-0038', '“现场未见半分撬锁痕迹，唯独两名值守武官暴毙在内！官家震怒，限你十日之内彻底破案追回图样——若办不成，你我皆提头来见！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_02_corpse_inspection', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_mr1_02_corpse_inspection',
  title: '第二幕 · 军器监验尸',
  subtitle: '开封府 · 军器监铁库',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc1_armory_crime.jpg',
  illustrationCaption: '秋雨军器监铁库 · 验尸寻获太湖苏绣帕子',
  beats: [
    N('冒着冷雨赶赴军器监铁库，火把照亮森严的青石库房。两名值守武官的尸身尚有余温，兵刃各归鞘中，身上竟无半点外伤，唯独嘴角溢出一缕黑血。'),
    P('（俯身拆开二人胸口甲胄，指尖轻按其心脉处，瞳孔骤然一缩）“不对……他们左腕虎口震裂、胸骨内陷的弧度，分明是自己使惯的《五虎断门刀》与《太祖长拳》反震之力！凶手施展了一种极为高明的‘借力打力’奇功，以二人自己的成名绝技震断心脉！”'),
    N('（目光扫过库房墙角潮湿的青砖缝隙，俯身拾起半块被踩入泥尘的素白绢帕，凑近鼻端轻嗅）“这绢帕针脚细腻，分明是江南苏州双面苏绣，上面还带着一丝太湖水汽与清冽的‘碧螺春’茶香！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_03_plan_investigation', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_mr1_03_plan_investigation',
  title: '第三幕 · 顺藤摸瓜',
  subtitle: '开封府 · 军器监廊下',
  mandatory: true,
  beats: [
    N('既有三重铁锁未遭撬动，便证明凶手或是有内鬼接应、或是早已拓印了铜匙。而那半块带着太湖水汽与碧螺春茶香的苏绣帕子，绝非汴京寻常军汉所能拥有。'),
    P('（将苏绣帕子收入怀中，对随行亲兵校尉沉声下令）“换上便服，随我去大相国寺瓦子与茶肆暗访！近日汴梁城内凡是从苏州平江府来的绸缎茶商、以及军器监里近日手头突然阔绰之人，统统给我查个水落石出！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_1_ID, stepId: 'probe_xiangguosi' },
    toast('线索指向江南商贾！请前往【大相国寺 · 相国寺万姓交易雅市】暗访瓦子茶肆。'),
  ],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_mr1_04_xiangguosi_market',
  title: '第四幕 · 瓦子暗访',
  subtitle: '开封府 · 大相国寺万姓雅市',
  mandatory: true,
  beats: [
    N('大相国寺万姓雅市虽值秋雨，避雨听书的闲汉与行商依旧摩肩接踵。你带亲兵散入茶坊酒肆，亮出几两碎银向相熟的牙人打听近半月来采买上等苏绣与碧螺春的江南大主顾。'),
    S({ name: '东京茶牙人', title: '相国寺茶肆牙保', factionName: '汴梁商贾' }, '（压低声音凑到耳边）“贵人问得巧！前几日确有两三位操苏州口音的绸缎商在此包了雅间，气度不凡得很。他们出手极阔，还曾打听过甜水巷那家专供官吏销金的酒肆……”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_05_clerk_lead', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_mr1_05_clerk_lead',
  title: '第五幕 · 销金窟踪影',
  subtitle: '开封府 · 相国寺外街',
  mandatory: true,
  beats: [
    N('亲兵很快从军器监同僚处摸回关键消息：掌管图库钥匙的文书胥吏周某，三日前突然告了长假，变卖了祖宅田产，此刻正带着几口大箱在汴河虹桥畔甜水巷的临水酒肆包船备酒，似要连夜举家南逃！'),
    P('（冷笑一声，翻身上马）“好个贼胥吏！走，直扑汴河虹桥临水酒肆，生擒此贼！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_1_ID, stepId: 'capture_clerk_tavern' },
    toast('锁定叛逃胥吏行踪！请前往【汴河虹桥 · 临水酒肆】将其拿获！'),
  ],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_mr1_06_capture_clerk',
  title: '第六幕 · 拿获胥吏',
  subtitle: '开封府 · 汴河虹桥临水酒肆',
  mandatory: true,
  beats: [
    N('推开临水酒肆二楼雅座木门，一名蓄着八字胡的青衫文吏正将一叠崭新交子塞入包袱，见门外突然涌入十余名带刀禁军亲卫，吓得手中酒壶哐当落地！'),
    P('（大步上前按住其肩头，反手锁住穴道）“周胥吏，军器监铁库的钥匙配得好生精巧啊！说——谁给你的胆子出卖大宋破辽国器？！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_07_interrogate_clerk', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_mr1_07_interrogate_clerk',
  title: '第七幕 · 严审吐实',
  subtitle: '开封府 · 临水酒肆密室',
  mandatory: true,
  beats: [
    N('一番严刑审讯之下，那周胥吏哪里经得住禁军拷问，不到半炷香便涕泪横流地招认了全部实情：'),
    S({ name: '军器监胥吏', title: '图库文书（阶下囚）', factionName: '军器监' }, '“大将军饶命！买通小人的并非寻常江洋大盗……是……是伪装成苏州绸缎商的姑苏慕容氏家将！一个叫邓百川，另一个满嘴‘非也非也’叫包不同！他们给了小人五千两黄金，拓印了钥匙印模，昨夜子时潜入铁库杀了值守武官……”'),
    P('（猛地攥紧双拳）“姑苏慕容氏！好一个‘以彼之道，还施彼身’的南慕容！他们此刻人呢？！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_08_wharf_urgent', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_08: StorySceneDef = {
  id: 'scene_jj_mr1_08_wharf_urgent',
  title: '第八幕 · 追扑漕运码头',
  subtitle: '开封府 · 汴河长街',
  mandatory: true,
  beats: [
    S({ name: '军器监胥吏', title: '图库文书（阶下囚）', factionName: '军器监' }, '“他们今夜五更前便要在汴河漕运码头登船南下！若再晚半个时辰，快船出了水门便再也追不上了！”'),
    P('（命亲卫押紧人犯，翻身上马拔刀怒喝）“全部骑队随我直扑汴河漕运巡检司码头！绝不能让神臂弓落入叛贼之手！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_1_ID, stepId: 'intercept_canal_wharf' },
    toast('火速驰援【汴河漕运巡检司】码头，截击运弓快船！'),
  ],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_mr1_09_wharf_raid',
  title: '第九幕 · 码头断后',
  subtitle: '开封府 · 汴河漕运码头',
  mandatory: true,
  beats: [
    N('秋雨如晦，汴河水浪翻涌。待你率亲卫冲至漕运码头木栈时，一艘挂着黑帆的快船已斩断缆绳滑入河心！栈桥尽头，一名面容凶恶、手持单刀的劲装汉子正抱臂大笑拦路。'),
    S('NPC-0214', '（“一阵风”风波恶横刀而立，哈哈大笑）“来得好快！可惜神臂弓总图与样弩已在船上！想过去追船？先问问风大爷手中的单刀答不答应！”'),
    P('（策马跃下栈桥，长兵遥指风波恶）“慕容氏盗窃朝廷军械、形同谋逆！风波恶，今日先拿你下狱！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_10_feng_boe_duel', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_mr1_10_feng_boe_duel',
  title: '第十幕 · 力战一阵风',
  subtitle: '开封府 · 汴河漕运码头栈桥',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc1_wharf_duel.jpg',
  illustrationCaption: '秋雨汴河漕运码头 · 栈桥力战“一阵风”风波恶',
  beats: [
    N('狂风骤雨之中，风波恶刀法泼辣狠厉、最喜缠斗，招招抢攻！你身居三衙都虞候，久经沙场杀伐淬炼，岂惧这等江湖狂徒？'),
  ],
  choices: [
    {
      id: 'jjmr1_feng_fight',
      label: '栈桥迎战“一阵风”风波恶！（1v1 剧情战）',
      subLabel: '实战考验：击败风波恶，夺取码头线索',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_1_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0214',
            talkOverride: '“哈哈！打架最痛快！管你是朝廷什么都虞候，吃我一刀！”',
          },
          rule: 'story_trial',
          forbidEscapeReason: '神臂弓快船正在远去，岂能退缩！',
          introText: '【1v1 栈桥截击】迎战姑苏慕容氏家将【“一阵风” · 风波恶】！',
          onWin: [openScene('scene_jj_mr1_11_smoke_escape', JINJUN_MURONG_ARC_1_ID)],
          onLose: [toast('风波恶刀势缠绵凶悍，且退后重整内息再战！')],
        },
      ],
    },
  ],
}

const SCENE_11: StorySceneDef = {
  id: 'scene_jj_mr1_11_smoke_escape',
  title: '第十一幕 · 烟遁江面',
  subtitle: '开封府 · 汴河码头',
  mandatory: true,
  beats: [
    N('十余合激斗后，你抓住风波恶刀路急躁的破绽，一招震麻其虎口将其逼退至栈桥边缘！眼看亲卫刀枪合围而上，远方江面快船上突然飞来数枚霹雳烟雾弹！'),
    S('NPC-0214', '（浓烟瞬间吞没栈桥，风波恶怪笑一声纵身跃入滚滚汴河，攀上接应小舟）“痛快！大宋官兵倒也有两下子！咱们江南再会！”'),
    N('亲卫箭雨急射浓烟，却终究被风波恶借水势逃脱。'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_12_secret_letter', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_12: StorySceneDef = {
  id: 'scene_jj_mr1_12_secret_letter',
  title: '第十二幕 · 码头密信',
  subtitle: '开封府 · 汴河码头货箱',
  mandatory: true,
  beats: [
    N('你命人搜查码头遗留的货箱与风波恶掉落的包袱，果然在夹层中搜出一封以火漆封口的江南密信！拆开火漆细读，字迹令你神色骤变——'),
    P('（握紧密信，声音冷冽）“原来如此！邓百川与包不同已携神臂弓总图与样弩先行赶回江南燕子坞加紧仿造；而那位‘南慕容’慕容复，此刻竟正赶往河南登封少室山，欲借天下武林大会收拢中原群雄，为日后复辟大燕铺路！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_1_ID, stepId: 'report_and_muster' },
    toast('截获慕容氏密信！请火速返回【八十万禁军大教场帅台】禀报枢密院并点兵发少室山！'),
  ],
}

const SCENE_13: StorySceneDef = {
  id: 'scene_jj_mr1_13_privy_report',
  title: '第十三幕 · 枢密院请旨',
  subtitle: '开封府 · 八十万禁军大教场',
  mandatory: true,
  beats: [
    N('五更未尽，你浑身湿透赶回大教场帅台，将周胥吏画押供词、太湖苏绣帕子与码头搜出的慕容氏密信一并呈交枢密使王德用。'),
    S('NPC-0038', '（王德用拍案而起，须发皆张）“好个姑苏慕容氏！朝廷历代以礼相待江南士族，他竟敢买通军器监胥吏、刺杀值守武官、盗窃破辽神臂弓、图谋不轨！本官即刻入宫面圣，为你请下枢密院海捕钧旨！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_14_imperial_warrant', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_14: StorySceneDef = {
  id: 'scene_jj_mr1_14_imperial_warrant',
  title: '第十四幕 · 海捕钧旨',
  subtitle: '开封府 · 禁军点兵帅台',
  mandatory: true,
  beats: [
    N('不消半个时辰，大内急旨与枢密院鎏金海捕文书已颁下大教场！王德用亲手将调兵虎符交入你掌心：'),
    S('NPC-0038', '“奉官家圣旨：钦命三衙都虞候即刻调拨一千披坚执锐的殿前司精锐禁军，星夜兼程直奔河南登封少室山！凡抗拒海捕者，格杀勿论！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr1_15_march_songshan', JINJUN_MURONG_ARC_1_ID)],
}

const SCENE_15: StorySceneDef = {
  id: 'scene_jj_mr1_15_march_songshan',
  title: '第十五幕 · 千军发嵩山',
  subtitle: '开封府西门 · 星夜驰援',
  mandatory: true,
  beats: [
    N('战鼓咚咚响彻秋夜，一千名身披冷锻步人甲、背负神臂强弩的殿前司禁军迅速集结成阵，长枪如林、大宋龙旗猎猎作响！你翻身上马按刀于阵前，一声令下，千骑踏破秋雨泥泞，如黑云般向河南登封少室山疾驰而去！'),
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 400 },
    { type: 'giveCombatExp', amount: 1500 },
    { type: 'modifyRenown', delta: 35 },
    { type: 'addSectContribution', amount: 120 },
    { type: 'completeQuest', questId: JINJUN_MURONG_ARC_1_ID, outcome: 'completed' },
    toast('《破燕 · 壹 · 汴梁暗影》完成！请即刻赶往【嵩山少林寺 · 钟鼓禅院演武坪】开启第二部《少室惊变》！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_mr1_01_rainy_summons: SCENE_01,
  scene_jj_mr1_02_corpse_inspection: SCENE_02,
  scene_jj_mr1_03_plan_investigation: SCENE_03,
  scene_jj_mr1_04_xiangguosi_market: SCENE_04,
  scene_jj_mr1_05_clerk_lead: SCENE_05,
  scene_jj_mr1_06_capture_clerk: SCENE_06,
  scene_jj_mr1_07_interrogate_clerk: SCENE_07,
  scene_jj_mr1_08_wharf_urgent: SCENE_08,
  scene_jj_mr1_09_wharf_raid: SCENE_09,
  scene_jj_mr1_10_feng_boe_duel: SCENE_10,
  scene_jj_mr1_11_smoke_escape: SCENE_11,
  scene_jj_mr1_12_secret_letter: SCENE_12,
  scene_jj_mr1_13_privy_report: SCENE_13,
  scene_jj_mr1_14_imperial_warrant: SCENE_14,
  scene_jj_mr1_15_march_songshan: SCENE_15,
}
