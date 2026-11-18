import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_QINZHOU_HORSE_QUEST_ID } from './jinjunQinzhouHorseQuest'

function buildSandBandit1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJQZ_BANDIT_1',
    name: '黄沙狼·莫昆',
    title: '陇右马贼大头目',
    factionId: 'SECT-18',
    factionName: '陇右沙匪',
    fullLocationLabel: '秦州府 · 麦积山暗道',
    realm: '一流上品',
    stats: { hp: 3500, mp: 3250, agi: 75, res: 61 },
    talents: { bone: 80, comprehension: 72, charm: 40 },
    tenArts: { 骑术: 88, 算术: 20, 经义: 10, 策论: 35, 诗词: 5, 琴: 5, 棋: 15, 书: 10, 画: 5, 辩才: 30 },
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    sectRank: 4,
    sectRankLabel: '沙匪大头目',
    equippedArts: { neigong: 'MA-037', qinggong: 'MA-092', move1: 'MA-123', move2: 'MA-130', move3: 'MA-132', move4: 'MA-151' },
    learnedArts: [
      { artId: 'MA-037', level: 8 },
      { artId: 'MA-092', level: 8 },
      { artId: 'MA-123', level: 8 },
      { artId: 'MA-130', level: 8 },
      { artId: 'MA-132', level: 8 },
      { artId: 'MA-151', level: 8 },
    ],
    equipped: { weapon: 'WPN-018', armor: 'ARM-012', shoes: 'BOT-007', bow: 'BOW-007', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-012' },
    talk: '“麦积山这条暗道走了五年从未出过事，今日撞上咱们兄弟算你倒霉！”',
  })
}

function buildSandBandit2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJQZ_BANDIT_2',
    name: '赤蝎·古力',
    title: '陇右马贼二头目',
    factionId: 'SECT-18',
    factionName: '陇右沙匪',
    fullLocationLabel: '秦州府 · 麦积山暗道',
    realm: '一流上品',
    stats: { hp: 3440, mp: 3280, agi: 77, res: 60 },
    talents: { bone: 78, comprehension: 75, charm: 42 },
    tenArts: { 骑术: 84, 算术: 25, 经义: 10, 策论: 30, 诗词: 5, 琴: 5, 棋: 15, 书: 10, 画: 5, 辩才: 35 },
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    sectRank: 4,
    sectRankLabel: '沙匪二头目',
    equippedArts: { neigong: 'MA-037', qinggong: 'MA-092', move1: 'MA-125', move2: 'MA-138', move3: 'MA-144', move4: 'MA-189' },
    learnedArts: [
      { artId: 'MA-037', level: 7 },
      { artId: 'MA-092', level: 8 },
      { artId: 'MA-125', level: 8 },
      { artId: 'MA-138', level: 8 },
      { artId: 'MA-144', level: 8 },
      { artId: 'MA-189', level: 8 },
    ],
    equipped: { weapon: 'WPN-022', armor: 'ARM-009', shoes: 'BOT-005', bow: 'BOW-004', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    talk: '“废话少说，先把这宋官剁碎了喂鹰！”',
  })
}

function buildIronLotusGrandmaster(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJQZ_GRANDMASTER',
    name: '察罕',
    title: '铁莲尊者 · 西陲黑教供奉',
    factionId: 'SECT-28',
    factionName: '西陲黑教客卿',
    fullLocationLabel: '秦州府 · 陇右古战场烽燧',
    realm: '宗师下品',
    stats: { hp: 4720, mp: 4350, agi: 82, res: 69 },
    talents: { bone: 85, comprehension: 84, charm: 54 },
    tenArts: { 骑术: 86, 算术: 40, 经义: 50, 策论: 55, 诗词: 20, 琴: 10, 棋: 40, 书: 30, 画: 15, 辩才: 62 },
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    sectRank: 5,
    sectRankLabel: '黑教尊者',
    equippedArts: { neigong: 'MA-019', qinggong: 'MA-079', move1: 'MA-088', move2: 'MA-091', move3: 'MA-071', move4: 'MA-097' },
    learnedArts: [
      { artId: 'MA-019', level: 8 },
      { artId: 'MA-079', level: 8 },
      { artId: 'MA-088', level: 9 },
      { artId: 'MA-091', level: 9 },
      { artId: 'MA-071', level: 8 },
      { artId: 'MA-097', level: 8 },
    ],
    equipped: { weapon: 'WPN-028', armor: 'ARM-007', shoes: 'BOT-004', bow: 'BOW-007', accessory1: 'ACC-014', accessory2: 'ACC-015', mount: 'MNT-005' },
    talk: '“五十匹河曲神骏与百车官茶已近在西境，区区大宋三衙都虞候，也敢孤身追来送死？”',
  })
}

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_qz_01_border_letter',
  title: '第一幕 · 西陲急函',
  subtitle: '秦州府 · 秦凤经略安抚司',
  mandatory: true,
  beats: [
    N('{reignYear}秋风卷沙，你以大宋禁军 Lv.4【三衙都虞候】身份西巡秦凤路，刚踏入秦州府衙，知州兼经略安抚使刘沪便急步迎出，手中攥着一叠边报军书，神色焦灼。'),
    S('NPC-0045', '（刘沪重重叹息）“都虞候大人来得真是时候！今春秦州官营茶马榷场收上来的战马，十有四五竟患了暗蹄疫！可吐蕃与羌部头人却怒冲冲围在城外，反指咱们官府以发霉劣茶充数、压价克扣茶叶！再不查明真相，秦凤茶马市便要兵戎相见了！”'),
    P('（接过军书沉声道）“刘大人莫急，军马乃国之大器，羌汉边贸更不可生乱。容我即刻赴茶马榷场一探！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'inspect_chama' },
    toast('请前往【秦州官营茶马榷场 · 勘合正堂】查验战马与茶砖底单！'),
  ],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_qz_02_chama_inspect',
  title: '第二幕 · 榷场验马',
  subtitle: '秦州府 · 秦州官营茶马榷场',
  mandatory: true,
  beats: [
    S('NPC-0522', '（禁军驻场使臣徐衡林引你走入马阑与茶仓）“大人请看，这些病马牙口虽老，蹄铁却分明是新钉上去遮掩腐蹄的；而仓库里这几垛官茶，外层贴着蜀州贡茶封条，里头塞的竟是陈年粗梗茶！”'),
    N('你亲手掀开马唇、轻抚马脊（**骑术**），复又翻开榷场茶马兑换底单飞快心算（**算术**），登时冷笑：'),
    P('“有人在榷场里设了个‘黑牙行’！把羌部送来的五十匹上等河曲良马与蜀州上等官茶双双调包截走，再把病马劣茶塞进官仓两头吃差价！走，去城南胡姬酒肆摸摸底！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'probe_huji_tavern' },
    toast('查明茶马调包黑幕！请前往【陇上胡姬琵琶酒肆】打探黑牙行销赃路线。'),
  ],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_qz_03_huji_tavern',
  title: '第三幕 · 胡姬酒肆',
  subtitle: '秦州府 · 陇上胡姬琵琶酒肆',
  mandatory: true,
  beats: [
    N('入夜后，酒肆内胡琴呜咽、酥油灯影摇曳。你寻到一名消息灵通的西域驼商，先拍出一百两纹银作茶钱，复以犀利【辩才】恩威并施点破其走私暗桩，那驼商吓得连连叩首，终于吐露实情：'),
    S({ name: '西域驼商', title: '丝路行商', factionName: '西域商旅' }, '“大将军饶命！那黑牙行管事雇了陇右沙匪，今夜三更便把那五十匹好马和上等官茶赶进麦积山崖下的暗道，准备连夜送往西境烽燧交货！”'),
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: -100 },
    openScene('scene_jj_qz_04_qiang_parley', JINJUN_QINZHOU_HORSE_QUEST_ID),
  ],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_qz_04_qiang_parley',
  title: '第四幕 · 羌部对质',
  subtitle: '秦州府 · 城外羌部营地',
  mandatory: true,
  beats: [
    N('离开酒肆，你并未急着追匪，而是单骑直驰城外火把通明的羌部大营。数十名羌族骑手弯弓搭箭团团围住，你却面不改色下马亮出三衙都虞候金印，高声以理服人（**辩才**）：'),
    P('“我大宋官府向来以信义立边市！劣茶病马乃黑牙行奸商与沙匪内外勾结所致！给我三日之期，本官亲率铁骑追回全部官茶良马，当众审结退还，若违此誓，这颗头颅留与尔等！”'),
    S({ name: '羌部老首领', title: '青唐羌部族长', factionName: '吐蕃羌部' }, '（见你单骑赴营、言辞恳切坦荡，终于缓缓挥手令族人收弓）“好！冲着大宋都虞候这身胆气，老夫信你三日！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'ambush_maijishan' },
    toast('已稳住羌部！请速赴【麦积山千佛悬崖窟 · 散花楼】截击沙匪暗道车队！'),
  ],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_qz_05_maijishan_ambush',
  title: '第五幕 · 麦积山伏',
  subtitle: '秦州府 · 麦积山千佛悬崖窟',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_qinzhou_maijishan_ambush.jpg',
  illustrationCaption: '麦积山悬崖栈道 · 截击陇右沙匪盗马驼队',
  beats: [
    N('星月微明，麦积山千佛窟绝壁巍峨耸立。山脚林间一条隐蔽驼道上，数十匹神骏非凡的河曲战马正被黑布蒙头牵行，后方跟着二十余辆满载蜀州官茶的骆驼大车！'),
    P('（纵马从栈道旁跃出，长兵横指当先二匪）“留下官茶战马，束手就擒！”'),
  ],
  onFinishEffects: [openScene('scene_jj_qz_06_bandit_battle', JINJUN_QINZHOU_HORSE_QUEST_ID)],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_qz_06_bandit_battle',
  title: '第六幕 · 崖下截盗',
  subtitle: '秦州府 · 麦积山暗道（1v2 激战）',
  mandatory: true,
  beats: [
    N('黑牙行管事见状尖叫抱头鼠窜，两名一流上品的陇右沙匪大头目黄沙狼莫昆与赤蝎古力齐声怒吼，左右夹击扑杀而来！'),
  ],
  choices: [
    {
      id: 'jjqz_maijishan_fight',
      label: '截杀沙匪双煞，夺回官茶驼队！（1v2 一流上品）',
      subLabel: '实战考验：同时迎战一流上品沙匪大头目与二头目',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_QINZHOU_HORSE_QUEST_ID,
          opponent: { kind: 'custom', npc: buildSandBandit1() },
          extraOpponents: [{ kind: 'custom', npc: buildSandBandit2() }],
          rule: 'story_trial',
          forbidEscapeReason: '茶马一旦被赶入深山便再难追回，岂容退避！',
          introText: '【1v2 崖下截盗】迎战一流上品沙匪双煞【黄沙狼·莫昆】与【赤蝎·古力】！',
          onWin: [
            { type: 'setQuestStep', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'beacon_grandmaster_duel' },
            toast('斩杀沙匪双煞，夺回官茶！但五十匹河曲良马已被宗师级强敌劫往【陇右古战场烽燧 · 断碑烽火望夏台】！'),
          ],
          onLose: [toast('沙匪双煞凶悍，且退下整备后再行截杀！')],
        },
      ],
    },
  ],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_qz_07_beacon_duel',
  title: '第七幕 · 烽燧绝战',
  subtitle: '秦州府 · 陇右古战场烽燧（宗师下品决战）',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_qinzhou_beacon_duel.jpg',
  illustrationCaption: '陇右古烽燧残垣 · 单骑独战宗师下品铁莲尊者察罕',
  beats: [
    N('你夺下官茶交予赶来的徐衡林看守，自己则单骑紧追马蹄印一路狂奔至苍凉肃杀的陇右古战场烽燧！残阳如血，断碑烽火台下，五十匹河曲良马被铁链锁在桩上；一名身披暗红僧袍、手持降魔铁杵的高大老僧负手立于断垣之上，宗师下品的森然气机令四周黄沙凝滞！'),
    S({ name: '察罕', title: '铁莲尊者 · 西陲黑教供奉', factionName: '西陲黑教客卿' }, '“能追到这里，你倒是个难得的好骑手。可惜这五十匹战马乃西境大局所需，三衙都虞候，留下来吧！”'),
    P('（翻身下马，按紧兵刃，目射精芒）“大宋的战马，一匹也不许带出关！请出招吧！”'),
  ],
  choices: [
    {
      id: 'jjqz_grandmaster_fight',
      label: '生死决战！力斩西陲宗师「铁莲尊者」察罕（1v1 宗师下品）',
      subLabel: '宗师级高危生死战：击败宗师下品强敌夺回全部战马！',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_QINZHOU_HORSE_QUEST_ID,
          opponent: { kind: 'custom', npc: buildIronLotusGrandmaster() },
          rule: 'story_trial',
          forbidEscapeReason: '五十匹河曲神骏近在咫尺，岂能空手而归！',
          introText: '【1v1 烽燧绝战】迎战宗师下品【铁莲尊者 · 察罕】！',
          onWin: [
            { type: 'setQuestStep', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, stepId: 'return_qinzhou_yamen' },
            toast('力斩铁莲尊者察罕，全数夺回五十匹河曲良马！请押解主犯回【秦州府衙】公堂发落。'),
          ],
          onLose: [toast('铁莲尊者内力深不可测！且退下重整武备丹药再战！')],
        },
      ],
    },
  ],
}

const SCENE_08: StorySceneDef = {
  id: 'scene_jj_qz_08_court_verdict',
  title: '第八幕 · 公堂发落',
  subtitle: '秦州府 · 秦州府衙',
  mandatory: true,
  beats: [
    N('秦州府衙门前人山人海，羌汉商旅齐聚观礼。你与刘沪当众将黑牙行主犯枭首示众，将追回的蜀州上等官茶逐车点清发还羌部，并重新核定公平马价，积压数月的边市阴霾一扫而空！'),
    S('NPC-0045', '（刘沪大喜过望，长揖拜谢）“都虞候大人单骑定风波、斩宗师于古烽燧，真乃我大宋柱石！”'),
  ],
  onFinishEffects: [openScene('scene_jj_qz_09_qiang_gift', JINJUN_QINZHOU_HORSE_QUEST_ID)],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_qz_09_qiang_gift',
  title: '第九幕 · 塞外赠礼',
  subtitle: '秦州府 · 秦州府衙外',
  mandatory: true,
  beats: [
    N('散衙之际，那位羌部老首领亲手牵着一匹神骏异常、毛色如金缎般流光溢彩的良驹走上前来，双手将缰绳递到你手中。'),
    S({ name: '羌部老首领', title: '青唐羌部族长', factionName: '吐蕃羌部' }, '“大宋都虞候，这是我部最珍贵的【青唐唃厮啰金翼驹】，日行千里而不喘！唯有如您这般守信义、斩妖僧的真英雄，才配骑它！”'),
  ],
  onFinishEffects: [openScene('scene_jj_qz_10_frontier_victory', JINJUN_QINZHOU_HORSE_QUEST_ID)],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_qz_10_frontier_victory',
  title: '第十幕 · 陇上凯旋',
  subtitle: '秦州府 · 天水关大道',
  mandatory: true,
  beats: [
    N('辞别刘沪与徐衡林，你跨上新得的金翼驹缓缓踏上归程。秦凤一路驼铃清脆、茶马畅通，属于大宋禁军三衙都虞候的威名，已随西风传遍陇右群山。'),
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 600 },
    { type: 'giveCombatExp', amount: 2600 },
    { type: 'modifyChivalry', delta: 30 },
    { type: 'modifyRenown', delta: 40 },
    { type: 'giveItem', itemId: 'MNT-005', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MED-107', qty: 1 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0045' }, delta: 20 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0522' }, delta: 15 },
    { type: 'addSectContribution', amount: 160 },
    { type: 'completeQuest', questId: JINJUN_QINZHOU_HORSE_QUEST_ID, outcome: 'completed' },
    toast('《秦州道 · 茶马失纲录》完成！获地阶坐骑【青唐唃厮啰金翼驹】、天山雪莲碧灵丹、纹银 600 两、战斗经验 2600！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_qz_01_border_letter: SCENE_01,
  scene_jj_qz_02_chama_inspect: SCENE_02,
  scene_jj_qz_03_huji_tavern: SCENE_03,
  scene_jj_qz_04_qiang_parley: SCENE_04,
  scene_jj_qz_05_maijishan_ambush: SCENE_05,
  scene_jj_qz_06_bandit_battle: SCENE_06,
  scene_jj_qz_07_beacon_duel: SCENE_07,
  scene_jj_qz_08_court_verdict: SCENE_08,
  scene_jj_qz_09_qiang_gift: SCENE_09,
  scene_jj_qz_10_frontier_victory: SCENE_10,
}
