import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { S, flag, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { ZHENWU_ENTRY_QUEST_ID } from './zhenwuEntryQuest'

const SPEAKER_NARRATOR: StorySpeakerSpec = { kind: 'narrator' }

const SPEAKER_PLAYER: StorySpeakerSpec = { kind: 'player' }

const SPEAKER_ZHANG_XUANSU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0119' }

const SPEAKER_SONG_YUANQIAO: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0148' }

const SPEAKER_YU_QINGXU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0170' }

const SPEAKER_ZHANG_QINGXI: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0208' }

const SPEAKER_MO_QINGGU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0209' }

const SPEAKER_YIN_FENGFENG: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0326' }

const SPEAKER_QING_HE: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0364' }

const SPEAKER_LI_XIAOXIN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0502' }

const SPEAKER_OLD_TAOIST_TEA: StorySpeakerSpec = {
  kind: 'custom',
  name: '煮茶老道',
  title: '天柱绝顶扫雪老道',
  factionName: '武当山真武道宗',
  portraitUrl: '/assets/characters/fullbody/NPC-0119.jpg',
  avatarUrl: '/assets/characters/avatars/NPC-0119.jpg',
}

const SPEAKER_HERB_FARMER: StorySpeakerSpec = {
  kind: 'custom',
  name: '周药农',
  title: '汉水采药老汉',
  factionName: '市井百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_BOAT_OWNER: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱船头',
  title: '汉水渡口牙行船主',
  factionName: '汉水船行',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_PILGRIM_GRANNY: StorySpeakerSpec = {
  kind: 'custom',
  name: '孙婆婆与小茴',
  title: '赴武当还愿祖孙',
  factionName: '荆襄香客',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_female_av.jpg',
}

const SPEAKER_OLD_FARMER: StorySpeakerSpec = {
  kind: 'custom',
  name: '陈老丈',
  title: '均州求签老农',
  factionName: '市井百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_ZHAO_BA: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵霸',
  title: '铁剑门狂傲游侠',
  factionName: '江湖散客',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const ZHAO_BA_COMBAT_NPC: NodeNpc = makeQuestNpc({
  id: 'ZW-TRIAL-ZHAOBA',
  name: '赵霸',
  title: '铁剑门狂傲游侠',
  factionId: 'FCT-SANREN',
  factionName: '江湖散客',
  realm: '二流下品',
  talk: '武当小道也敢拦我拓印剑痕？吃我三招铁剑再说话！',
  stats: { hp: 210, mp: 90, agi: 18, res: 12 },
  talents: { bone: 62, comprehension: 48, charm: 40 },
  tenArts: {
    骑术: 25,
    算术: 15,
    经义: 10,
    策论: 10,
    诗词: 10,
    琴: 5,
    棋: 10,
    书: 10,
    画: 5,
    辩才: 20,
  },
  equippedArts: { neigong: 'MA-179', qinggong: 'MA-157', move1: 'MA-206', move2: 'MA-184' },
  learnedArts: [{ artId: 'MA-179', level: 2 }, { artId: 'MA-157', level: 2 }, { artId: 'MA-206', level: 3 }, { artId: 'MA-184', level: 2 }],
  equipped: { weapon: 'WPN-041', armor: 'ARM-026', shoes: 'BOT-012', bow: 'BOW-013', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-012' },
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
})

const SCENE_ZW_20_OUTER_DISCIPLE: StorySceneDef = {
  id: 'SCENE_ZW_20_OUTER_DISCIPLE',
  title: '第二十幕 · 云海苍茫入道途',
  subtitle: '武当山 · 太和绝顶真武金殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '步出太和紫金正殿，殿外天柱绝顶云海翻涌如雪，七十二峰苍翠层叠，隐于晨光烟岚之中。腰间新佩的【真武松纹道剑】剑鞘温润，散发出淡淡松脂清香，仿佛将这一路汉水烟雨、紫霄晨钟都收拢在了三尺青锋之内。'),
    S(SPEAKER_SONG_YUANQIAO, '（含笑追出殿阶，整了整你肩头衣襟）小师弟，天师很少当殿夸人，你今日能得他老人家一句“静水深流”，已是极难得的缘法。'),
    S(SPEAKER_LI_XIAOXIN, '（快步跑来，手里捧着两包温热的茯苓糕）嘿嘿，以后咱们便是正经同门啦！师兄方才说得对，你如今才刚领了《武当筑基内功》与《武当长剑》，切记先在行囊枢机中运使内功与剑招，再到紫霄宫或客栈按日闭关打熬火候，莫要贪多嚼不烂。'),
    S(SPEAKER_NARRATOR, '你郑重向诸位师长与同门稽首还礼。公元一〇五〇年的春风吹过武当绝顶，你虽才刚刚踏出内家武道的第一步，心中却已明晰前路：往后无论是勤修太极丹道，还是下山襄助荆襄苍生、抗御北疆风尘，这七十二峰的松风与太和本心，都会随你同行。'),
  ],
  onFinishEffects: [
    { type: 'joinSect', sectId: 'SECT-08', rank: 1 },
    { type: 'teachMartialArt', artId: 'MA-226', level: 1, exp: 0 },
    { type: 'teachMartialArt', artId: 'MA-169', level: 1, exp: 0 },
    { type: 'giveItem', itemId: 'WPN-063', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MED-108', qty: 1 },
    { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
    { type: 'giveCombatExp', amount: 260, reason: '汉水问津至太和授篆，圆满拜入真武道宗外门' },
    { type: 'modifyRenown', delta: 12, reason: '拜入名门正宗武当山真武道宗' },
    {
      type: 'branch',
      condition: flag('zw_helped_pilgrims', 'eq', true),
      thenEffects: [
        { type: 'modifyChivalry', delta: 8, reason: '山道背负香客祖孙，践行护世本心' },
        { type: 'giveCombatExp', amount: 80, reason: '俞清虚赞你仁心道骨，额外赠予修持心得' },
      ],
    },
    {
      type: 'branch',
      condition: flag('zw_daoyuan_score', 'gte', 6),
      thenEffects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0117' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0148' }, delta: 10 },
        { type: 'addSectContribution', amount: 60 },
        { type: 'addArtExp', artId: 'MA-226', amount: 1800 },
      ],
    },
    {
      type: 'branch',
      condition: flag('zw_cliff_insight', 'gte', 2),
      thenEffects: [
        { type: 'addArtExp', artId: 'MA-169', amount: 1500 },
        { type: 'giveCombatExp', amount: 60, reason: '试剑崖石壁剑理参悟深厚，掌门嘉许' },
      ],
    },
    {
      type: 'completeQuest',
      questId: ZHENWU_ENTRY_QUEST_ID,
      outcome: 'outer_disciple',
      combatExp: 100,
    },
    toast('已拜入【武当山真武道宗】外门！习得《武当筑基内功》《武当长剑》，获赐【真武松纹道剑】与【武当紫金三清丹】。', 'success', '真武入门'),
  ],
}

const SCENE_ZW_19_BESTOW_SWORD: StorySceneDef = {
  id: 'SCENE_ZW_19_BESTOW_SWORD',
  title: '第十九幕 · 太和殿前授松纹',
  subtitle: '武当山 · 太和紫金正殿',
  illustrationUrl: '/assets/quests/zhenwu_golden_sword.jpg',
  illustrationCaption: '太和紫金正殿 · 张玄素天师亲授真武松纹道剑',
  mandatory: true,
  beats: [
    S(SPEAKER_ZHANG_XUANSU, '（自殿案前取下一柄连鞘松纹长剑与一只青瓷丹瓶，步下石阶）我真武道宗不以杀伐立威，而以“太和护世”为念。这柄【真武松纹道剑】虽非神兵利器，却是由武当百年雷击老松木胎包铁所铸，最宜初学养气。'),
    S(SPEAKER_ZHANG_XUANSU, '至于这瓶【武当紫金三清丹】与两包【太乙回气清心散】，乃紫霄丹房依古法炼制，留作你日后闭关冲关或行走江湖疗伤回气之用。今日起，我便收你为真武道宗外门弟子。'),
    S(SPEAKER_PLAYER, '（单膝跪拜，双手接过松纹道剑与丹药，神色庄肃）弟子谨遵天师法旨！必当守静笃、惜性命、不欺弱小、不负山河。'),
    S(SPEAKER_ZHANG_XUANSU, '（伸手虚扶起你，掌心一道温和绵长如春水般的真气轻轻渡入你百会与膻中，为你疏通初脉）且记住今日这股气息流转之序——这便是我派《武当筑基内功》的起手门径；再随远乔习全《武当长剑》三十六式，日后火候到了，紫霄宫的《两仪剑法》与《太极混元桩》，自然向你敞开。'),
    S(SPEAKER_YU_QINGXU, '（在旁抚须含笑）天师亲自为你疏导初脉，这可是许多内门弟子都求不来的福缘。莫负此恩，快去殿外透透气吧。'),
  ],
  onFinishEffects: [openScene('SCENE_ZW_20_OUTER_DISCIPLE', 'QST-SECT-08-ENTRY')],
}

const SCENE_ZW_18_REVEAL_MASTER: StorySceneDef = {
  id: 'SCENE_ZW_18_REVEAL_MASTER',
  title: '第十八幕 · 拂尘一挥见真容',
  subtitle: '武当山 · 太和紫金正殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '你循着众师长的目光抬头望向正殿高台，只见那位端坐于玄色云纹法座之上、白发银须的掌教天师缓缓睁开双目——那清癯温雅的眉眼、嘴角那一抹若有若无的淡笑，竟与观云台上松枝煮茶的白衣老道一模一样！'),
    S(SPEAKER_PLAYER, '（心中一震，忙深揖及地）原来观云台上煮雪相迎的前辈，便是掌教天师法驾！弟子愚钝，当日失礼之处，还望天师恕罪。'),
    S(SPEAKER_ZHANG_XUANSU, '（朗笑摆手，声如清磬）无妨无妨，真武殿外无尊卑，观云台上一盏粗茶，本就是老道偷闲迎客的私趣。况且这几日来，你在汉水渡口、签房长廊、紫霄丹房与南岩剑崖的一举一动，老道虽未出殿，却皆听诸位师侄细细说与我听了。'),
    S(SPEAKER_ZHANG_XUANSU, '（目光温润而深邃）身无半点内功，却敢在狂徒剑下守住方寸不乱；心怀拜师之念，却肯为路旁老弱停步折腰。小友，你当日在观云台上答我的那句话，老道今日替你记下了——武当求的，从来不是急功近利的霸道，正是你这份“静水深流”。'),
  ],
  onFinishEffects: [openScene('SCENE_ZW_19_BESTOW_SWORD', 'QST-SECT-08-ENTRY')],
}

const SCENE_ZW_17_GOLDEN_SUMMON: StorySceneDef = {
  id: 'SCENE_ZW_17_GOLDEN_SUMMON',
  title: '第十七幕 · 钟磬声中登太和',
  subtitle: '武当山 · 太和绝顶真武金殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '三日之期已满，暮钟声自太和绝顶悠悠荡开，穿透七十二峰松涛。宋远乔与殷峰峰引着你再度拾级而上，踏入铜铸重檐的太和紫金正殿。'),
    S(SPEAKER_NARRATOR, '殿内长明烛火摇曳，檀香清幽。只见汉水码头初遇的莫清谷护法、古隆中抚琴对弈的俞清虚长老、签房廊的清鹤执事、丹鼎阁的张清溪师兄竟全数侍立殿侧，个个含笑望向你。'),
    S(SPEAKER_MO_QINGGU, '（朝你微微颔首）小友一路从汉水走到太和金殿，倒真是一步一个脚印，半分未曾偷懒。'),
    S(SPEAKER_QING_HE, '（难得露出几分温和笑意）哼，签房廊里那笔账算得明白，山道上也未负本心。师尊在殿上等着呢，还不快上前参见？'),
  ],
  onFinishEffects: [
    setStep(ZHENWU_ENTRY_QUEST_ID, 'golden_hall_ceremony'),
    openScene('SCENE_ZW_18_REVEAL_MASTER', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_16_COLD_JADE_POOL: StorySceneDef = {
  id: 'SCENE_ZW_16_COLD_JADE_POOL',
  title: '第十六幕 · 试炼涧边化寒气',
  subtitle: '武当山 · 幽谷石室 · 寒玉榻',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '赵霸抱头鼠窜下山后，宋远乔与殷峰峰领着你穿过飞瀑深潭，来到幽谷石室的寒玉榻旁歇息。方才虽是借势周旋，可凡胎肉体硬接二流好手的余劲，胸口仍免不了微微发闷。'),
    S(SPEAKER_SONG_YUANQIAO, '（取出一枚清凉药丸递给你）你初涉江湖便敢直面锋芒，气度已胜常人许多。且依着昨夜禹迹池所感，舌抵上腭、意守丹田，在这寒玉榻旁静坐半个时辰，将胸中浊气散去。'),
    S(SPEAKER_YIN_FENGFENG, '（抱剑倚在石室门边，难得放缓了冷峻神色）方才你在剑痕崖前那几步避让，虽无招式章法，却暗合太极“引颈落空”之理。无剑胜有剑，倒真有几分我武当气象。'),
    S(SPEAKER_NARRATOR, '飞瀑水声轰鸣却不觉喧嚣，你依言调息静坐。渐渐地，胸口闷气化作一缕温热散入四肢百骸，山间钟磬自远方传来，三日观心之期已至，太和金殿的传召随之而下。'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 1 },
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0326' }, delta: 10 },
    {
      type: 'branch',
      condition: { type: 'talentAtLeast', key: '根骨', min: 75 },
      thenEffects: [
        { type: 'giveCombatExp', amount: 60, reason: '先天根骨浑厚，于寒玉榻旁吐纳自通，额外领悟养气法门' },
        toast('【根骨奇佳】寒玉冷气反助你拓宽气脉，额外获得 60 点战斗经验！', 'success'),
      ],
    },
    openScene('SCENE_ZW_17_GOLDEN_SUMMON', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_15_SURVIVE_TRIAL: StorySceneDef = {
  id: 'SCENE_ZW_15_SURVIVE_TRIAL',
  title: '第十五幕 · 借势卸力退狂徒',
  subtitle: '武当山 · 南岩绝壁试剑崖',
  mandatory: true,
  beats: [
    S(SPEAKER_ZHAO_BA, '（提着三才铁剑踏上青石坪，嗤笑一声）好啊！武当派没人了吗，竟推一个连内功都没有的毛头小子出来？老子今日便让你见识见识，什么叫真功夫！'),
    S(SPEAKER_SONG_YUANQIAO, '（负手退后三步，声音清朗稳重，传入你耳中）别慌，莫与他硬碰硬！切记“守御架势”护住周身要害，待他剑势老去再侧步卸力——只需周旋过三合，他自己便要露丑！'),
    S(SPEAKER_PLAYER, '（深吸一口山风，想起禹迹池畔玄龟缩首、青蛇落空的景象，双足微曲踏实青砖）在下虽无武学在身，却也愿领教阁下高招——请！'),
  ],
  onFinishEffects: [
    {
      type: 'startCombat',
      questId: ZHENWU_ENTRY_QUEST_ID,
      opponent: { kind: 'custom', npc: ZHAO_BA_COMBAT_NPC },
      allies: [{ kind: 'npc', npcId: 'NPC-0148' }],
      rule: 'survive_rounds',
      maxRounds: 3,
      forbidEscapeReason: '身后便是宋师兄与武当剑痕崖，岂能怯战退走！请用【守御架势】周旋三合。',
      introText: '南岩试剑崖外，以宋远乔为援护，运用守御与借势卸力撑过三回合即可胜出！',
      onWin: [
        openScene('SCENE_ZW_15B_TRIAL_VICTORY', 'QST-SECT-08-ENTRY'),
      ],
      onLose: [
        openScene('SCENE_ZW_15B_TRIAL_SAVED', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const SCENE_ZW_14_SWORD_CLIFF_INSIGHT: StorySceneDef = {
  id: 'SCENE_ZW_14_SWORD_CLIFF_INSIGHT',
  title: '第十四幕 · 绝壁剑痕悟圆融',
  subtitle: '武当山 · 绝壁石刻 · 剑痕崖',
  mandatory: true,
  beats: [
    S(SPEAKER_YIN_FENGFENG, '（按住腰间剑柄，正欲上前）大师兄，这狂徒连门规都敢蔑视，让我三招打发他下山便是！'),
    S(SPEAKER_SONG_YUANQIAO, '（抬手轻轻拦住殷峰峰，目光转向你）慢着。小友，你已在紫霄宫观心三日，正好借此机缘试试胆魄。不必怕，我与殷师弟就在三步之外——你且先看看崖壁上那道前人剑痕，再上前应他。'),
    S(SPEAKER_NARRATOR, '你定睛望向绝壁青石，只见数十道古朴剑痕深浅不一，却无一道是直来直往的死力硬劈，反倒如流水绕石、蜿蜒回环，生生不息。'),
  ],
  onFinishEffects: [
    {
      type: 'branch',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 75 },
          { type: 'skillAtLeast', key: '书', min: 25 },
          { type: 'skillAtLeast', key: '画', min: 25 },
        ],
      },
      thenEffects: [
        { type: 'setFlag', flag: 'zw_cliff_insight', value: true },
        { type: 'giveCombatExp', amount: 50, reason: '观绝壁剑痕笔意流转，顿悟避实击虚之道' },
        toast('【灵犀一点】你从剑痕走势中看出了圆转卸力的步法门径！', 'success'),
      ],
    },
    openScene('SCENE_ZW_15_SURVIVE_TRIAL', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_13_NANYAN_TROUBLE: StorySceneDef = {
  id: 'SCENE_ZW_13_NANYAN_TROUBLE',
  title: '第十三幕 · 南岩风急起波澜',
  subtitle: '武当山 · 绝壁石刻 · 剑痕崖',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '次日一早，你随宋远乔将丹房新炼好的跌打药膏送往南岩绝壁试剑崖。刚转过石阶，便听见绝壁石刻前传来一阵粗豪喧哗之声。'),
    S(SPEAKER_ZHAO_BA, '（手里拎着一柄铁剑，趾高气扬地推开两名守崖小道）闪开！听说武当南岩绝壁上有古人留下的真武剑痕，老子千里迢迢从北边过来拓印几张回去参详，你们还敢拦我不成？'),
    S(SPEAKER_YIN_FENGFENG, '（自石阶大步走出，神色冷峻）剑痕崖乃本门重地，岂容外人持兵刃擅闯硬拓？速速退至解剑池外，否则休怪贫道无礼！'),
    S(SPEAKER_NARRATOR, '那赵霸见道士人多却不愿退让，反倒冷笑一声，将铁剑往青石上一顿，震得碎石滚落崖边。'),
  ],
  onFinishEffects: [
    setStep(ZHENWU_ENTRY_QUEST_ID, 'nanyan_trial'),
    openScene('SCENE_ZW_14_SWORD_CLIFF_INSIGHT', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_12_NIGHT_TALK: StorySceneDef = {
  id: 'SCENE_ZW_12_NIGHT_TALK',
  title: '第十二幕 · 松窗夜话寄家国',
  subtitle: '武当山 · 紫霄重檐主大殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '夜雨渐歇，紫霄殿檐下挂着一盏素纱风灯。宋远乔邀你在廊阶边坐下，顺手添了两块松炭进小火盆里，山夜寒气顿时散去大半。'),
    S(SPEAKER_SONG_YUANQIAO, '（望着檐外幽深山影，轻声开口）如今乃{reignYear}，表面看四海承平，可北边辽国铁骑时时窥伺燕云，西边夏人亦不安分。我武当山虽远在荆襄南麓，却是南朝咽喉襄阳的屏藩。'),
    S(SPEAKER_SONG_YUANQIAO, '道门讲究清静，但真武祖师历来护国佑民。我们练内家拳剑，不是为了躲在山里做泥塑木雕，而是为了有朝一日山河有警、百姓有难时，能站出来撑住一方风雨。小友，可觉这条路太苦？'),
    S(SPEAKER_PLAYER, '（接过师兄递来的热姜茶，心头微暖）能保境安民、不负良心，纵然清苦些，又有何惧？'),
    S(SPEAKER_SONG_YUANQIAO, '（欣然一笑）好！明晨随我跑一趟南岩试剑崖送药去，也见见咱们武当的剑阵领阵殷师弟。'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 2 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0148' }, delta: 8 },
    setStep(ZHENWU_ENTRY_QUEST_ID, 'go_nanyan'),
    openScene('SCENE_ZW_13_NANYAN_TROUBLE', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_11_TURTLE_SNAKE: StorySceneDef = {
  id: 'SCENE_ZW_11_TURTLE_SNAKE',
  title: '第十一幕 · 禹迹池畔观龟蛇',
  subtitle: '武当山 · 禹迹池畔太极坪',
  illustrationUrl: '/assets/quests/zhenwu_turtle_snake.jpg',
  illustrationCaption: '禹迹池畔太极坪 · 暮色微雨观龟蛇相峙悟圆融',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '第三日黄昏，天边飘起细密如丝的春雨。你行至禹迹池畔太极坪，忽见青石池岸边一只墨色玄龟正与一条翠青小蛇相对而峙。'),
    S(SPEAKER_NARRATOR, '青蛇灵动迅疾，游走绕圈、数度探首扑击；玄龟却始终端稳不动，唯于蛇影迫近之际微微旋身缩首，青蛇次次落空，反而累得吐信盘喘。'),
    S(SPEAKER_SONG_YUANQIAO, '（不知何时撑伞立于你身侧，轻声指点）你看懂了么？蛇之灵动是“巧”，龟之沉稳是“守”。世人习武多喜以刚克刚，结果两败俱伤；唯独我真武一脉，观龟蛇相交之象，悟出“以静制动、圆转卸力”八字真诀。'),
    S(SPEAKER_PLAYER, '（凝神注视池水涟漪，心头豁然一亮）不与来势正面相撞，而是顺其劲道侧引化空……即便此刻尚未修得内功，这“顺势而为”的道理，弟子却仿佛听懂了几分！'),
  ],
  onFinishEffects: [
    { type: 'giveCombatExp', amount: 60, reason: '禹迹池畔观龟蛇相峙，初悟武当圆融卸力之道' },
    openScene('SCENE_ZW_12_NIGHT_TALK', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_10_ALCHEMY_FURNACE: StorySceneDef = {
  id: 'SCENE_ZW_10_ALCHEMY_FURNACE',
  title: '第十幕 · 丹鼎阁中守文武',
  subtitle: '武当山 · 东庑丹鼎藏经阁',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '第二日，你被派往紫霄宫东庑丹鼎藏经阁帮忙。阁内一侧铜鼎青烟微袅，草木药香沁人心脾；另一侧木架上整齐码放着宋刻道藏与手抄经卷。'),
    S(SPEAKER_ZHANG_QINGXI, '（手持羽扇坐在丹炉旁，朝你招手）炉里正炼着紫金三清丹的药引，火候最讲究“武火提纯、文火温养”。一旁还有几卷新抄的《道德真经》待校，小友最擅长照应哪一桩？'),
  ],
  choices: [
    {
      id: 'zw_10_insight_fire',
      label: '【悟性/算术】精准调控炉火文武之度',
      subLabel: '需 悟性 ≥ 75 或 算术 ≥ 25 · 丹香凝萃',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 75 },
          { type: 'skillAtLeast', key: '算术', min: 25 },
        ],
      },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0208' }, delta: 12 },
        { type: 'giveCombatExp', amount: 50, reason: '领悟丹炉火候刚柔之变，反哺内家呼吸法' },
        openScene('SCENE_ZW_10B_FIRE', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_10_classics_scroll',
      label: '【经义】潜心校对案头手抄道藏',
      subLabel: '需 经义 ≥ 25 · 校出古本错漏',
      tone: 'primary',
      condition: { type: 'skillAtLeast', key: '经义', min: 25 },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0208' }, delta: 12 },
        { type: 'modifySkill', key: '经义', delta: 4 },
        openScene('SCENE_ZW_10B_SCROLL', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_10_diligent_fan',
      label: '老实摇扇添炭，一丝不苟守候半日',
      subLabel: '勤能补拙 · 踏实稳健',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0208' }, delta: 8 },
        { type: 'modifySkill', key: '经义', delta: 2 },
        openScene('SCENE_ZW_10B_DILIGENT', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const SCENE_ZW_09_CARRYING_WATER: StorySceneDef = {
  id: 'SCENE_ZW_09_CARRYING_WATER',
  title: '第九幕 · 幽涧担水炼筋骨',
  subtitle: '武当山 · 紫霄道宫丹房',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '翌晨卯时三刻，山岚尚带冷意。紫霄宫内丹弟子李潇心领着你来到后山青石涧，指着两只沉甸甸的楠木水桶笑道：每日晨起将丹房三口大缸担满，便是紫霄观心的第一课。'),
    S(SPEAKER_LI_XIAOXIN, '（轻巧挑起一对满水木桶，脚下却如踏平地）别小看这担水功夫！山路一百零八级石阶，挑得太急容易气喘胸闷，走得太慢又怕水花晃洒。你试着把气息沉到肚脐眼儿下，步子踩稳喽！'),
    S(SPEAKER_NARRATOR, '你挽起粗布袖管，将扁担稳稳架上肩头，一步一个青石台阶往上行去。肩胛渐酸，呼吸却在一次次起落间渐渐归于平稳。'),
  ],
  onFinishEffects: [
    { type: 'advanceShichen', count: 2 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0502' }, delta: 10 },
    {
      type: 'branch',
      condition: { type: 'talentAtLeast', key: '根骨', min: 75 },
      thenEffects: [
        { type: 'giveCombatExp', amount: 50, reason: '先天根骨强健，百级山阶担水气息悠长，暗合桩功' },
        toast('【根骨卓异】百余级石阶挑水不洒半滴，李潇心啧啧称奇！', 'success'),
      ],
      elseEffects: [
        toast('汗透青衫担满三缸山泉，李潇心递来一碗甘冽山茶为你解乏。', 'talk'),
      ],
    },
    openScene('SCENE_ZW_10_ALCHEMY_FURNACE', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_08_SONG_GREETING: StorySceneDef = {
  id: 'SCENE_ZW_08_SONG_GREETING',
  title: '第八幕 · 紫霄重檐见首座',
  subtitle: '武当山 · 紫霄重檐主大殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '辞别观云台老道，你沿着松柏夹道的青石阶一路下行至紫霄道宫。重檐朱栏掩映在翠竹之间，首座大弟子宋远乔正于殿前廊下审阅各地道观文书，闻声抬首，温雅起身相迎。'),
    S(SPEAKER_SONG_YUANQIAO, '（看过俞长老手书与解剑木牌，含笑颔首）俞师叔信中对你赞誉有加。只是我真武道宗收徒，向来讲究“未学打人，先学站桩；未握长剑，先养道心”。'),
    S(SPEAKER_SONG_YUANQIAO, '你此刻全无内功根基，若急于传你招式，反倒伤了经脉。不若先在紫霄宫打杂观心三日——挑山泉、守丹炉、观太极坪，待你沉得住这份性子，咱们再谈拜师授艺。可愿一试？'),
    S(SPEAKER_PLAYER, '（敛袖拱手，神色坦然）晚辈正怕根基不稳。能于紫霄宫中静心扫尘三日，求之不得！'),
  ],
  onFinishEffects: [
    setStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_three_days'),
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0148' }, delta: 8 },
    openScene('SCENE_ZW_09_CARRYING_WATER', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_07_CLOUD_TERRACE: StorySceneDef = {
  id: 'SCENE_ZW_07_CLOUD_TERRACE',
  title: '第七幕 · 观云台上煮雪茶',
  subtitle: '武当山 · 天柱绝顶观云台',
  illustrationUrl: '/assets/quests/zhenwu_cloud_tea.jpg',
  illustrationCaption: '天柱绝顶观云台 · 布衣老道松枝煮茶论太和',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '清鹤执事为你安排了山中早斋，嘱你先往天柱绝顶观云台透气，待首座宋远乔下山议事归来。你踏着晨曦登临绝顶，只见茫茫云海在脚下舒卷，苍松斜倚峭壁，松针旁竟有一位布衣白发老道正在小泥炉上用干松枝煮茶。'),
    S(SPEAKER_OLD_TAOIST_TEA, '（头也不抬，顺手拿蒲扇轻扇炉火，嘴角微翘）小友来得正好，这山顶泉水刚开。过来暖暖手，陪老道饮一盏粗茶如何？'),
    S(SPEAKER_OLD_TAOIST_TEA, '（斟满两只青瓷茶盏，抬眼打量你两手空空）世人千辛万苦爬上七十二峰，求的是神功盖世、名震天下，皆是一个“有”字。小友身上全无半点内力真气，却也登这绝顶，你上山所求为何？'),
  ],
  choices: [
    {
      id: 'zw_07_ans_peace',
      label: '“不求天下第一，只求心安处便是道。”',
      subLabel: '顺应自然 · 契合道心',
      tone: 'jade',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0119' }, delta: 12 },
        openScene('SCENE_ZW_07B_PEACE', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_07_ans_protect',
      label: '“山外风尘多艰，晚辈想学护己护人之法。”',
      subLabel: '护世济民 · 侠义为先',
      tone: 'gold',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0119' }, delta: 10 },
        { type: 'modifyChivalry', delta: 4, reason: '观云台立志护己护人' },
        openScene('SCENE_ZW_07B_PROTECT', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_07_ans_honest',
      label: '“晚辈尚浅薄，先走一步看一步，不负当下。”',
      subLabel: '质朴无华 · 不饰浮辞',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0119' }, delta: 8 },
        openScene('SCENE_ZW_07B_HONEST', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const SCENE_ZW_06_LOT_CORRIDOR: StorySceneDef = {
  id: 'SCENE_ZW_06_LOT_CORRIDOR',
  title: '第六幕 · 签房长廊解迷津',
  subtitle: '武当山 · 铜铸配殿签房廊',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '随清鹤步入铜铸配殿签房廊，廊下檀香氤氲。忽见一名衣着补丁的均州老农捏着一根竹签蹲在石柱旁抹泪，口中喃喃道抽中了“坎坷下签”，怕是要贱卖家里唯一的老黄牛才还得上县里夏税。'),
    S(SPEAKER_QING_HE, '（停下脚步，侧目看向你，有意考较）出家人虽不妄言吉凶，可香客心里梗着疙瘩。你既持俞师叔的信物上山，便替我去宽慰宽慰这位老丈吧。'),
  ],
  choices: [
    {
      id: 'zw_06_classics',
      label: '【经义】引“祸兮福之所倚”开解其心结',
      subLabel: '需 经义 ≥ 25 · 典雅贴切',
      tone: 'jade',
      condition: { type: 'skillAtLeast', key: '经义', min: 25 },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0364' }, delta: 12 },
        { type: 'modifySkill', key: '经义', delta: 3 },
        openScene('SCENE_ZW_06B_CLASSICS', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_06_arithmetic',
      label: '【算术】帮老丈盘算夏税田亩与借贷账目',
      subLabel: '需 算术 ≥ 25 · 实打实解困',
      tone: 'primary',
      condition: { type: 'skillAtLeast', key: '算术', min: 25 },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0364' }, delta: 12 },
        { type: 'modifySkill', key: '算术', delta: 3 },
        openScene('SCENE_ZW_06B_ARITHMETIC', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_06_comfort',
      label: '温和劝慰老丈莫信凶签，并赠少许铜钱佐路费',
      subLabel: '温情济困 · 不拘才学',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0364' }, delta: 8 },
        { type: 'modifyChivalry', delta: 3, reason: '签房廊温言解困，宽慰老农' },
        openScene('SCENE_ZW_06B_COMFORT', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const SCENE_ZW_05_UNSHEATH_POOL: StorySceneDef = {
  id: 'SCENE_ZW_05_UNSHEATH_POOL',
  title: '第五幕 · 解剑池畔洗尘心',
  subtitle: '武当山 · 太和绝顶真武金殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '终抵武当山门解剑池畔，一泓清泉照见苍松云影，池旁古碑上书“至此解剑”四字。执事真人清鹤正立于山门石阶上清点香客名录，见你走近，上下打量一番。'),
    S(SPEAKER_QING_HE, '（接过你递上的解剑木牌与俞清虚手书，眉头微挑）嗯，莫师兄与俞师叔既肯托你带信送药，倒也难得。只是山门规矩严明，且先随我进铜铸配殿听候差遣吧。'),
    S(SPEAKER_PILGRIM_GRANNY, '（此时恰好由小茴搀着赶到山门，见状连忙朝清鹤深拜）道长莫怪这位小侠！方才若非他背着俺这小孙女慢慢爬坡，俺祖孙俩怕是要冻死在山腰林子里了！'),
    S(SPEAKER_QING_HE, '（闻言神色微动，原本略带严厉的眉眼顿时舒展几分）哦？原来如此。既护佑香客上山，这便是行善积德，何罪之有？快请进殿喝口热茶吧。'),
  ],
  onFinishEffects: [
    setStep(ZHENWU_ENTRY_QUEST_ID, 'wudang_corridor'),
    {
      type: 'branch',
      condition: flag('zw_helped_pilgrims', 'eq', true),
      thenEffects: [{ type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0364' }, delta: 6 }],
    },
    openScene('SCENE_ZW_06_LOT_CORRIDOR', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_05B_UNSHEATH_POOL_ENTRUSTED: StorySceneDef = {
  id: 'SCENE_ZW_05B_UNSHEATH_POOL_ENTRUSTED',
  title: '第五幕 · 解剑池畔洗尘心',
  subtitle: '武当山 · 太和绝顶真武金殿',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '终抵武当山门解剑池畔，一泓清泉照见苍松云影，池旁古碑上书“至此解剑”四字。执事真人清鹤正立于山门石阶上清点香客名录，见你按时赶至，上下打量一番。'),
    S(SPEAKER_QING_HE, '（接过你递上的解剑木牌与俞清虚手书，微微颔首）嗯，申时未过便准点登抵山门，莫师兄与俞师叔既肯托你带信送药，倒也守信稳重。'),
    S(SPEAKER_PILGRIM_GRANNY, '（不多时，两名山道脚夫搀扶着那对还愿祖孙也平安赶到池畔，孙婆婆朝你感激合十）多谢这位小侠在半山腰留下的干粮与跌打伤药，又托脚夫大哥一路搭手，俺祖孙俩这才赶在落锁前上了金顶！'),
    S(SPEAKER_QING_HE, '（闻言眉眼舒展几分）既不误师长急信，又妥善安置路途伤客，进退倒有章法。快请进铜铸配殿喝口热茶吧。'),
  ],
  onFinishEffects: [
    setStep(ZHENWU_ENTRY_QUEST_ID, 'wudang_corridor'),
    openScene('SCENE_ZW_06_LOT_CORRIDOR', 'QST-SECT-08-ENTRY'),
  ],
}

const SCENE_ZW_04_MOUNTAIN_PATH: StorySceneDef = {
  id: 'SCENE_ZW_04_MOUNTAIN_PATH',
  title: '第四幕 · 襄樊古道踏青阶',
  subtitle: '襄阳北行 · 武当山麓石阶',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '辞别古隆中草庐，你背着紫苏药囊沿着襄樊古道北行。春雨初霁，远望武当七十二峰如青螺浮云。石阶半腰处，同路的一对还愿祖孙忽然停步——七八岁的小茴踩滑青苔，扭伤了脚踝，眼眶泛红。'),
    S(SPEAKER_PILGRIM_GRANNY, '（拄着竹杖急得直叹气）哎哟，眼看申时山门便要落锁了，俺这老胳膊老腿背不动娃儿……小侠，你身负武当道长所托，快先自去吧，别耽搁了你的前程！'),
  ],
  choices: [
    {
      id: 'zw_04_help_granny',
      label: '“道途不怕晚一步！”俯身背起小茴缓步护送祖孙上山',
      subLabel: '重缘分与仁心 · 虽误时辰却不负本心',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'zw_helped_pilgrims', value: true },
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyChivalry', delta: 6, reason: '宁误山门时辰，背负受伤香客缓行上山' },
        { type: 'advanceShichen', count: 2 },
        { type: 'teleportPlayer', regionId: 'wudangshan', buildingId: 'wd_golden', spotId: 'wd_golden_east' },
        openScene('SCENE_ZW_05_UNSHEATH_POOL', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_04_entrust_others',
      label: '将乾粮与伤药留给祖孙，拜托同行脚夫照拂后先行登阶',
      subLabel: '守时履约 · 准时赴山门',
      effects: [
        { type: 'setFlag', flag: 'zw_helped_pilgrims', value: false },
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 1 },
        { type: 'advanceShichen', count: 1 },
        { type: 'teleportPlayer', regionId: 'wudangshan', buildingId: 'wd_golden', spotId: 'wd_golden_east' },
        openScene('SCENE_ZW_05B_UNSHEATH_POOL_ENTRUSTED', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const SCENE_ZW_03_LONGZHONG_QIN: StorySceneDef = {
  id: 'SCENE_ZW_03_LONGZHONG_QIN',
  title: '第三幕 · 古隆中畔听松琴',
  subtitle: '襄阳府 · 古隆中草庐 · 临风观景轩',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '依着莫清谷的指点，你来到襄阳城西古隆中草庐。临风观景轩外修竹掩映、琴音袅袅，紫霄护法长老俞清虚正对一局黑白残棋独坐品茗，身旁石案上放着一包捆扎整齐的紫苏草药。'),
    S(SPEAKER_YU_QINGXU, '（见你呈上莫清谷所赠解剑木牌，抬手请坐，目光温润却似能看透人心）莫师弟很少轻赠此牌。他既看中了你，老道便也顺便瞧瞧小友的气象——你看我这盘白子已陷入重围，若无利刃突围，又该如何落子？'),
  ],
  choices: [
    {
      id: 'zw_03_chess_insight',
      label: '【悟性/棋艺】“不争一角死地，借边腹虚势反围之。”',
      subLabel: '需 悟性 ≥ 75 或 棋 ≥ 25 · 暗合阴阳化劲',
      tone: 'jade',
      condition: {
        type: 'any',
        conditions: [
          { type: 'talentAtLeast', key: '悟性', min: 75 },
          { type: 'skillAtLeast', key: '棋', min: 25 },
        ],
      },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0170' }, delta: 12 },
        { type: 'modifySkill', key: '棋', delta: 3 },
        openScene('SCENE_ZW_03B_CHESS', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_03_charm_grace',
      label: '【颜值】执晚辈礼从容斟茶，谈吐温雅不急不躁',
      subLabel: '需 颜值 ≥ 75 · 清雅出尘之姿',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '颜值', min: 75 },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0170' }, delta: 12 },
        openScene('SCENE_ZW_03B_CHARM', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_03_plain_sincere',
      label: '坦承不懂棋理，只言“遇难莫慌，先护住根本”',
      subLabel: '素心直语 · 诚恳踏实',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0170' }, delta: 8 },
        openScene('SCENE_ZW_03B_PLAIN', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const SCENE_ZW_02_QINGGU_TEA: StorySceneDef = {
  id: 'SCENE_ZW_02_QINGGU_TEA',
  title: '第二幕 · 临江茶寮话太和',
  subtitle: '襄阳府 · 汉水大码头',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '纷扰平息后，那位始终袖手旁观的青衫道人走上前来，正是武当真武殿护法莫清谷。他邀你在码头檐下茶寮避雨，要了一壶粗茶两碟炒蚕豆。'),
    S(SPEAKER_MO_QINGGU, '（打量你空空如也的腰间与毫无内息波动的脉象，眼中反倒多出几分欣赏）刚才你在栈桥上未曾动用半点拳脚，只凭一片公道心便稳住了场面。须知《老子》有言“上善若水”，水虽无形无刃，却能利万物而不争。'),
    S(SPEAKER_MO_QINGGU, '（自怀中取出一枚温润的【武当解剑木牌】推到你面前）我观你颇有道缘。若有心问武求道，不妨持此木牌先去城西古隆中草庐拜会俞清虚师叔，顺道帮他带一包山上丹房急需的紫苏药材上武当山。'),
    S(SPEAKER_PLAYER, '（双手接过木牌，只觉木质温润沉实）晚辈正苦于无门投效，多谢莫护法指点迷津！'),
  ],
  onFinishEffects: [
    setStep(ZHENWU_ENTRY_QUEST_ID, 'go_longzhong'),
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0209' }, delta: 10 },
    toast('获赠【武当解剑木牌】，请前往襄阳城西【古隆中草庐 > 临风观景轩】拜会俞清虚长老。', 'success'),
  ],
}

const SCENE_ZW_01_HANSHUI_MIST: StorySceneDef = {
  id: 'SCENE_ZW_01_HANSHUI_MIST',
  title: '第一幕 · 汉水雾渡初相逢',
  subtitle: '襄阳府 · 汉水大码头',
  mandatory: true,
  beats: [
    S(SPEAKER_NARRATOR, '{reignYear}暮春，汉水烟雨蒙蒙，千帆栈桥上人声鼎沸。一名背着竹篓的采药老汉不慎与牙行船主撞在一处，竹篓倾翻，晒干的草药散落湿滑木板，反被嚣张船主扯住衣襟索赔“误船银”。'),
    S(SPEAKER_BOAT_OWNER, '（伸手一推，凶巴巴喝道）老东西长没长眼！耽误了本船行北上送货，拿不出二两银子休想走！'),
    S(SPEAKER_HERB_FARMER, '（跌坐在地护着药笼，急得老泪纵横）这、这是给山上道观送去的安神紫苏啊，老汉浑身上下哪有二两银子……'),
    S(SPEAKER_NARRATOR, '码头一隅，一位青衫道人静立船坞檐下，并未急着出手，只是微微侧目望向人群中身无武功、却正欲上前的你。'),
  ],
  choices: [
    {
      id: 'zw_01_eloquence',
      label: '【辩才】朗声点破牙行规矩，言辞切中船主理亏之处',
      subLabel: '需 辩才 ≥ 25 · 以理服人',
      tone: 'jade',
      condition: { type: 'skillAtLeast', key: '辩才', min: 25 },
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 2 },
        { type: 'modifySkill', key: '辩才', delta: 3 },
        { type: 'modifyChivalry', delta: 4, reason: '汉水码头仗义执言，巧言折服刁难船主' },
        openScene('SCENE_ZW_01B_ELOQUENCE', 'QST-SECT-08-ENTRY'),
      ],
    },
    {
      id: 'zw_01_help_gather',
      label: '俯身替老汉拾起散落草药，挺身挡在船主面前护住老弱',
      subLabel: '手无寸铁亦敢担道义 · 仁厚之心',
      tone: 'primary',
      effects: [
        { type: 'addFlagNumber', flag: 'zw_daoyuan_score', delta: 1 },
        { type: 'modifyChivalry', delta: 4, reason: '汉水码头俯身护弱，不畏强横' },
        openScene('SCENE_ZW_01B_GATHER', 'QST-SECT-08-ENTRY'),
      ],
    },
  ],
}

const INLINE_SCENE_01_SCENE_ZW_15B_TRIAL_VICTORY: StorySceneDef = {
            id: 'SCENE_ZW_15B_TRIAL_VICTORY',
            title: '第十五幕 · 狂徒力竭自失足',
            subtitle: '武当山 · 南岩绝壁试剑崖',
            mandatory: true,
            beats: [
              S(SPEAKER_NARRATOR, '赵霸连攻数剑，招招被宋远乔以袖袍轻拂化解半数余劲，又被你借着青苔地形侧步引空。他一剑劈空收势不住，脚下一滑，“扑通”一声半截身子跌进了崖边浅水石槽！'),
              S(SPEAKER_ZHAO_BA, '（狼狈爬起，浑身湿透，面红耳赤地指着你与宋远乔）好、好一个武当派以柔克刚……青山不改，今日算我栽了！'),
              S(SPEAKER_SONG_YUANQIAO, '（收袖微笑）阁下剑势过刚而不知收，今日跌入清泉降降火气，也是好事。请便吧。'),
            ],
            onFinishEffects: [
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0148' }, delta: 10 },
              { type: 'giveCombatExp', amount: 80, reason: '南岩试剑崖以弱周旋，初尝借势卸力之妙' },
              openScene('SCENE_ZW_16_COLD_JADE_POOL', 'QST-SECT-08-ENTRY'),
            ],
          }

const INLINE_SCENE_02_SCENE_ZW_15B_TRIAL_SAVED: StorySceneDef = {
            id: 'SCENE_ZW_15B_TRIAL_SAVED',
            title: '第十五幕 · 师兄出手护周全',
            subtitle: '武当山 · 南岩绝壁试剑崖',
            mandatory: true,
            beats: [
              S(SPEAKER_NARRATOR, '赵霸剑势凶猛，你毕竟未曾修习内功，肩头终究被剑风扫中退了半步。千钧一发之际，宋远乔衣袖如云卷出，轻描淡写将赵霸连人带剑震退丈许！'),
              S(SPEAKER_SONG_YUANQIAO, '（扶住你肩头，温言安慰）你赤手空拳敢顶上去周旋至此，这份胆色已十分难得。剩下的交给师兄便是，去吧，阁下还不退下？'),
            ],
            onFinishEffects: [
              { type: 'healPlayer', hpPct: 80, mpPct: 100 },
              openScene('SCENE_ZW_16_COLD_JADE_POOL', 'QST-SECT-08-ENTRY'),
            ],
          }

const INLINE_SCENE_03_SCENE_ZW_10B_FIRE: StorySceneDef = {
            id: 'SCENE_ZW_10B_FIRE',
            title: '丹香满室 · 师兄击节',
            mandatory: true,
            beats: [
              S(SPEAKER_ZHANG_QINGXI, '（嗅了嗅揭盖的药香，大喜赞叹）奇哉！火不焦、水不溢，你这分寸感竟比入门三年的师弟还要老道！来，这卷养气笔记借你一观。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_11_TURTLE_SNAKE', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_04_SCENE_ZW_10B_SCROLL: StorySceneDef = {
            id: 'SCENE_ZW_10B_SCROLL',
            title: '墨香校经 · 获益良多',
            mandatory: true,
            beats: [
              S(SPEAKER_ZHANG_QINGXI, '（接过你朱笔圈出的三处错讹，连连点头）好眼力！难得有江湖少年还能沉下心读懂这般古奥文义，经义修为又精进一分了。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_11_TURTLE_SNAKE', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_05_SCENE_ZW_10B_DILIGENT: StorySceneDef = {
            id: 'SCENE_ZW_10B_DILIGENT',
            title: '灰头土脸 · 诚意可嘉',
            mandatory: true,
            beats: [
              S(SPEAKER_ZHANG_QINGXI, '（递来一块干净布巾给你擦脸）虽不甚通晓药理火候，可你坐在这炉边半日未曾起身走神，这份定力便难能可贵。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_11_TURTLE_SNAKE', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_06_SCENE_ZW_07B_PEACE: StorySceneDef = {
            id: 'SCENE_ZW_07B_PEACE',
            title: '老道含笑 · 留偈相赠',
            mandatory: true,
            beats: [
              S(SPEAKER_OLD_TAOIST_TEA, '（眼中微光一闪，举杯轻啜）“心安之处便是道”……好一句透彻话！记住这八个字——太和无形，静水深流。去紫霄宫寻宋远乔吧，他该回来了。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_08_SONG_GREETING', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_07_SCENE_ZW_07B_PROTECT: StorySceneDef = {
            id: 'SCENE_ZW_07B_PROTECT',
            title: '老道颔首 · 留偈相赠',
            mandatory: true,
            beats: [
              S(SPEAKER_OLD_TAOIST_TEA, '（抚须微笑）有慈悲心者方能持利剑而不滥杀。小友记住：太和无形，静水深流。快去紫霄宫见宋远乔吧。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_08_SONG_GREETING', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_08_SCENE_ZW_07B_HONEST: StorySceneDef = {
            id: 'SCENE_ZW_07B_HONEST',
            title: '老道欣然 · 留偈相赠',
            mandatory: true,
            beats: [
              S(SPEAKER_OLD_TAOIST_TEA, '（哈哈一笑）不装腔作势，倒也真率！记住老道一句话：太和无形，静水深流。去紫霄宫找宋远乔吧。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_08_SONG_GREETING', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_09_SCENE_ZW_06B_CLASSICS: StorySceneDef = {
            id: 'SCENE_ZW_06B_CLASSICS',
            title: '道言解惑 · 老农破涕',
            mandatory: true,
            beats: [
              S(SPEAKER_OLD_FARMER, '（听完你细细浅解“祸福相依、静待春耕”之理，擦干眼泪拱手连拜）小先生说得在理！老汉这就回去好好照料春苗，不卖牛了！'),
              S(SPEAKER_QING_HE, '（微微颔首）能把艰深的道经化作村野老丈听得懂的暖心话，你倒是块读经的好料子。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_07_CLOUD_TERRACE', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_10_SCENE_ZW_06B_ARITHMETIC: StorySceneDef = {
            id: 'SCENE_ZW_06B_ARITHMETIC',
            title: '细算免灾 · 护住耕牛',
            mandatory: true,
            beats: [
              S(SPEAKER_OLD_FARMER, '（看着你用树枝在青砖上划出的三笔折算，眼睛一亮）哎哟！原来按官府折帛免减算下来，根本用不着卖牛啊！多谢小恩公救了俺家命根子！'),
              S(SPEAKER_QING_HE, '（赞许点头）神签不如人心，算法亦是济世。不错，不错。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_07_CLOUD_TERRACE', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_11_SCENE_ZW_06B_COMFORT: StorySceneDef = {
            id: 'SCENE_ZW_06B_COMFORT',
            title: '温言暖心 · 眉梢展笑',
            mandatory: true,
            beats: [
              S(SPEAKER_OLD_FARMER, '（紧紧攥着你递来的几枚碎钱与温言，千恩万谢）还是武当山的小道爷心善，老汉记在心里了！'),
              S(SPEAKER_QING_HE, '（神色柔和下来）心诚志善，倒也合我道宗本意。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_07_CLOUD_TERRACE', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_12_SCENE_ZW_03B_CHESS: StorySceneDef = {
            id: 'SCENE_ZW_03B_CHESS',
            title: '长老拊掌 · 托付手书',
            mandatory: true,
            beats: [
              S(SPEAKER_YU_QINGXU, '（拊掌大笑）妙极！舍局部小利而取全局太和，你虽未学过一天武功，这悟性却已摸到武当门边了！这包药材与我的手书你且带上，替我问候山上师兄弟。'),
            ],
            onFinishEffects: [
              setStep(ZHENWU_ENTRY_QUEST_ID, 'go_wudangshan'),
              openScene('SCENE_ZW_04_MOUNTAIN_PATH', 'QST-SECT-08-ENTRY'),
            ],
          }

const INLINE_SCENE_13_SCENE_ZW_03B_CHARM: StorySceneDef = {
            id: 'SCENE_ZW_03B_CHARM',
            title: '气度清雅 · 托付手书',
            mandatory: true,
            beats: [
              S(SPEAKER_YU_QINGXU, '（端详你眉宇清朗、进退有度，欣然颔首）气定神闲、如玉如竹，倒真有几分古仙风姿！带上这包紫苏草药与我的手书，上武当山去吧。'),
            ],
            onFinishEffects: [
              setStep(ZHENWU_ENTRY_QUEST_ID, 'go_wudangshan'),
              openScene('SCENE_ZW_04_MOUNTAIN_PATH', 'QST-SECT-08-ENTRY'),
            ],
          }

const INLINE_SCENE_14_SCENE_ZW_03B_PLAIN: StorySceneDef = {
            id: 'SCENE_ZW_03B_PLAIN',
            title: '素心可嘉 · 托付手书',
            mandatory: true,
            beats: [
              S(SPEAKER_YU_QINGXU, '（微笑颔首）知之为知之，不知为不知，不强作解人便是道心。拿好这包紫苏药材与我的荐书，去武当山吧。'),
            ],
            onFinishEffects: [
              setStep(ZHENWU_ENTRY_QUEST_ID, 'go_wudangshan'),
              openScene('SCENE_ZW_04_MOUNTAIN_PATH', 'QST-SECT-08-ENTRY'),
            ],
          }

const INLINE_SCENE_15_SCENE_ZW_01B_ELOQUENCE: StorySceneDef = {
            id: 'SCENE_ZW_01B_ELOQUENCE',
            title: '清言止纷 · 船主退让',
            mandatory: true,
            beats: [
              S(SPEAKER_BOAT_OWNER, '（被你几句律例与行规驳得面红耳赤，又见围观脚夫纷纷指责，只得悻悻松手）算、算这老头走运，下回看路！'),
              S(SPEAKER_HERB_FARMER, '（连声道谢，小心收好药笼）多谢小侠替老汉解围！'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_02_QINGGU_TEA', 'QST-SECT-08-ENTRY')],
          }

const INLINE_SCENE_16_SCENE_ZW_01B_GATHER: StorySceneDef = {
            id: 'SCENE_ZW_01B_GATHER',
            title: '俯身护弱 · 众人喝彩',
            mandatory: true,
            beats: [
              S(SPEAKER_NARRATOR, '你神色沉静地将草药一一拾回竹篓，抬眼直视船主，身旁几名码头脚夫受你感召也围了过来。钱船头见讨不到便宜，哼了一声甩袖离去。'),
            ],
            onFinishEffects: [openScene('SCENE_ZW_02_QINGGU_TEA', 'QST-SECT-08-ENTRY')],
          }

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_ZW_20_OUTER_DISCIPLE.id]: SCENE_ZW_20_OUTER_DISCIPLE,
  [SCENE_ZW_19_BESTOW_SWORD.id]: SCENE_ZW_19_BESTOW_SWORD,
  [SCENE_ZW_18_REVEAL_MASTER.id]: SCENE_ZW_18_REVEAL_MASTER,
  [SCENE_ZW_17_GOLDEN_SUMMON.id]: SCENE_ZW_17_GOLDEN_SUMMON,
  [SCENE_ZW_16_COLD_JADE_POOL.id]: SCENE_ZW_16_COLD_JADE_POOL,
  [SCENE_ZW_15_SURVIVE_TRIAL.id]: SCENE_ZW_15_SURVIVE_TRIAL,
  [SCENE_ZW_14_SWORD_CLIFF_INSIGHT.id]: SCENE_ZW_14_SWORD_CLIFF_INSIGHT,
  [SCENE_ZW_13_NANYAN_TROUBLE.id]: SCENE_ZW_13_NANYAN_TROUBLE,
  [SCENE_ZW_12_NIGHT_TALK.id]: SCENE_ZW_12_NIGHT_TALK,
  [SCENE_ZW_11_TURTLE_SNAKE.id]: SCENE_ZW_11_TURTLE_SNAKE,
  [SCENE_ZW_10_ALCHEMY_FURNACE.id]: SCENE_ZW_10_ALCHEMY_FURNACE,
  [SCENE_ZW_09_CARRYING_WATER.id]: SCENE_ZW_09_CARRYING_WATER,
  [SCENE_ZW_08_SONG_GREETING.id]: SCENE_ZW_08_SONG_GREETING,
  [SCENE_ZW_07_CLOUD_TERRACE.id]: SCENE_ZW_07_CLOUD_TERRACE,
  [SCENE_ZW_06_LOT_CORRIDOR.id]: SCENE_ZW_06_LOT_CORRIDOR,
  [SCENE_ZW_05_UNSHEATH_POOL.id]: SCENE_ZW_05_UNSHEATH_POOL,
  [SCENE_ZW_05B_UNSHEATH_POOL_ENTRUSTED.id]: SCENE_ZW_05B_UNSHEATH_POOL_ENTRUSTED,
  [SCENE_ZW_04_MOUNTAIN_PATH.id]: SCENE_ZW_04_MOUNTAIN_PATH,
  [SCENE_ZW_03_LONGZHONG_QIN.id]: SCENE_ZW_03_LONGZHONG_QIN,
  [SCENE_ZW_02_QINGGU_TEA.id]: SCENE_ZW_02_QINGGU_TEA,
  [SCENE_ZW_01_HANSHUI_MIST.id]: SCENE_ZW_01_HANSHUI_MIST,
  [INLINE_SCENE_01_SCENE_ZW_15B_TRIAL_VICTORY.id]: INLINE_SCENE_01_SCENE_ZW_15B_TRIAL_VICTORY,
  [INLINE_SCENE_02_SCENE_ZW_15B_TRIAL_SAVED.id]: INLINE_SCENE_02_SCENE_ZW_15B_TRIAL_SAVED,
  [INLINE_SCENE_03_SCENE_ZW_10B_FIRE.id]: INLINE_SCENE_03_SCENE_ZW_10B_FIRE,
  [INLINE_SCENE_04_SCENE_ZW_10B_SCROLL.id]: INLINE_SCENE_04_SCENE_ZW_10B_SCROLL,
  [INLINE_SCENE_05_SCENE_ZW_10B_DILIGENT.id]: INLINE_SCENE_05_SCENE_ZW_10B_DILIGENT,
  [INLINE_SCENE_06_SCENE_ZW_07B_PEACE.id]: INLINE_SCENE_06_SCENE_ZW_07B_PEACE,
  [INLINE_SCENE_07_SCENE_ZW_07B_PROTECT.id]: INLINE_SCENE_07_SCENE_ZW_07B_PROTECT,
  [INLINE_SCENE_08_SCENE_ZW_07B_HONEST.id]: INLINE_SCENE_08_SCENE_ZW_07B_HONEST,
  [INLINE_SCENE_09_SCENE_ZW_06B_CLASSICS.id]: INLINE_SCENE_09_SCENE_ZW_06B_CLASSICS,
  [INLINE_SCENE_10_SCENE_ZW_06B_ARITHMETIC.id]: INLINE_SCENE_10_SCENE_ZW_06B_ARITHMETIC,
  [INLINE_SCENE_11_SCENE_ZW_06B_COMFORT.id]: INLINE_SCENE_11_SCENE_ZW_06B_COMFORT,
  [INLINE_SCENE_12_SCENE_ZW_03B_CHESS.id]: INLINE_SCENE_12_SCENE_ZW_03B_CHESS,
  [INLINE_SCENE_13_SCENE_ZW_03B_CHARM.id]: INLINE_SCENE_13_SCENE_ZW_03B_CHARM,
  [INLINE_SCENE_14_SCENE_ZW_03B_PLAIN.id]: INLINE_SCENE_14_SCENE_ZW_03B_PLAIN,
  [INLINE_SCENE_15_SCENE_ZW_01B_ELOQUENCE.id]: INLINE_SCENE_15_SCENE_ZW_01B_ELOQUENCE,
  [INLINE_SCENE_16_SCENE_ZW_01B_GATHER.id]: INLINE_SCENE_16_SCENE_ZW_01B_GATHER,
}
