import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast, makeQuestNpc } from '../../../engine/quest/dsl'
import { JINJUN_YUJINYUAN_HORSE_QUEST_ID } from './jinjunYujinyuanHorseQuest'

function buildHelanTieji(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_JJYJ_CHALLENGER',
    name: '贺兰铁戟',
    title: '塞外狂徒 · 重戟挑战者',
    factionId: 'SECT-28',
    factionName: '西夏狂武客',
    fullLocationLabel: '开封府 · 八十万禁军大教场',
    realm: '一流上品',
    stats: { hp: 3580, mp: 3320, agi: 76, res: 63 },
    talents: { bone: 82, comprehension: 74, charm: 48 },
    tenArts: { 骑术: 85, 算术: 20, 经义: 15, 策论: 40, 诗词: 10, 琴: 5, 棋: 20, 书: 15, 画: 5, 辩才: 45 },
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    sectRank: 4,
    sectRankLabel: '塞外狂将',
    equippedArts: { neigong: 'MA-037', move1: 'MA-123', move2: 'MA-130' },
    learnedArts: [{ artId: 'MA-037', level: 8 }, { artId: 'MA-123', level: 9 }, { artId: 'MA-130', level: 9 }],
    equipped: { weapon: 'WPN-014', armor: 'ARM-007', shoes: 'BOT-007', bow: 'BOW-004', accessory1: 'ACC-014', accessory2: 'ACC-023', mount: 'MNT-012' },
    talk: '“听说东京八十万禁军整日只知喝花酒打马球？今日某家倒要领教领教四厢都指挥的斤两！”',
  })
}

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_yj_01_spring_muster',
  title: '第一幕 · 春风点卯',
  subtitle: '开封府 · 八十万禁军大教场帅台',
  mandatory: true,
  beats: [
    N('{reignYear}春日晴朗，柳絮轻扬。你登临八十万禁军大教场点兵帅台，见国舅爷曹佾与宿将高怀亮正指挥军汉搭设彩棚、修整马道，枪棒都教头林铁衣与女将杨排风亦在台侧含笑而立。'),
    S('NPC-0043', '（迎上前拱手大笑）“都虞……哦不，四厢大人来得正好！今日趁着春暖草青，曹公伯与末将特筹办‘玉津园春日校马雅集’，一来试一试天驷监新到的西域良驹，二来也请诸位同僚松泛松泛筋骨！”'),
    S('NPC-0007', '（曹佾摇着折扇微微笑道）“久闻四厢大人仪容清俊、骑射俱佳，今日可莫要藏拙，须得给咱们禁军将士做个表率！”'),
  ],
  onFinishEffects: [openScene('scene_jj_yj_02_tame_steed', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_yj_02_tame_steed',
  title: '第二幕 · 天驷挑驹',
  subtitle: '开封府 · 大教场马厩',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_yujinyuan_horsemanship.jpg',
  illustrationCaption: '玉津园校马 · 四厢都指挥飞身驯烈驹',
  beats: [
    N('军卒牵出一匹通体乌黑如墨、唯独四蹄雪白的河曲烈马。这马性子极烈，连掀翻了两名驯马校尉，鼻孔喷着白气原地嘶鸣不止。'),
    P('（解下披风扔给亲兵，足尖一点飞身跃上马背，双腿紧夹马腹，顺着烈马暴冲之势稳稳控缰）'),
    N('烈马前蹄人立而起，你却如生根般纹丝不动，借着多年浸淫的精纯骑术连催三圈疾驰、骤停、回旋！不过半炷香工夫，那烈马竟乖乖低头打了个响鼻，任由你轻抚鬃毛。台下顿时爆发出雷鸣般的喝彩！'),
  ],
  onFinishEffects: [openScene('scene_jj_yj_03_yang_sparring', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_yj_03_yang_sparring',
  title: '第三幕 · 杨门枪韵',
  subtitle: '开封府 · 大教场演武台',
  mandatory: true,
  beats: [
    S('NPC-0252', '（杨排风提着一根点漆白蜡杆木枪跃上台来，英姿飒爽地抱拳一笑）“好俊的骑术！不过咱们禁军讲究马步俱精，四厢大人既刚驯了烈马，可敢与排风切磋几招点到为止的把式？”'),
    P('（欣然取过一柄包布木兵）“杨将军盛情，敢不从命！请赐教！”'),
  ],
  choices: [
    {
      id: 'jjyj_yang_spar',
      label: '与杨排风点到为止切磋（不致命）',
      subLabel: '同僚切磋，胜负皆推进雅集剧情',
      tone: 'primary',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0252',
            talkOverride: '“四厢大人接招了！莫小瞧我这根烧火棍化出的杨家枪意！”',
          },
          rule: 'spar',
          introText: '【同僚切磋】与杨门女将【杨排风】点到为止过招！',
          onWin: [
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0252' }, delta: 15 },
            openScene('scene_jj_yj_04_pre_archery', JINJUN_YUJINYUAN_HORSE_QUEST_ID),
          ],
          onLose: [
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0252' }, delta: 8 },
            openScene('scene_jj_yj_04_pre_archery', JINJUN_YUJINYUAN_HORSE_QUEST_ID),
          ],
        },
      ],
    },
  ],
}

const SCENE_04_PRE: StorySceneDef = {
  id: 'scene_jj_yj_04_pre_archery',
  title: '第四幕 · 移步驰道',
  subtitle: '开封府 · 大教场',
  mandatory: true,
  beats: [
    S('NPC-0252', '（收枪还礼，笑意盈盈）“痛快！四厢大人身法凝实、招数老辣，排风佩服！走吧，高将军与曹公伯已在神臂骑射驰道设好靶场彩头了！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID, stepId: 'archery_field_contest' },
    toast('请移步【神臂骑射驰道围栏（bl_jj_archery）】赴较箭雅集。'),
  ],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_yj_04_archery_contest',
  title: '第五幕 · 百步破柳',
  subtitle: '开封府 · 神臂骑射驰道围栏',
  mandatory: true,
  beats: [
    N('驰道百步之外柳枝垂曳，高怀亮命军汉在柳枝梢头悬起三枚铜钱。你弯弓搭箭、凝神屏息，三箭连珠破空而出，“叮叮叮”三声清响，三枚铜钱应声而落，箭矢直贯后方草靶红心！'),
    S('NPC-0043', '（抚掌大赞）“好一个连珠穿钱！神射之名，果非虚传！”'),
  ],
  onFinishEffects: [openScene('scene_jj_yj_05_noble_dispute', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_yj_05_noble_dispute',
  title: '第六幕 · 雅集文武之辩',
  subtitle: '开封府 · 驰道彩棚酒席',
  mandatory: true,
  beats: [
    N('校射之后众人入棚小酌。席间一名随曹佾前来的年轻宗室子弟多饮了两杯，忽而高声议论“武夫唯恃弓马，何如文臣一纸策论安邦”，引得几名边军出身的校尉脸色铁青，气氛骤然僵硬。'),
    P('（端起酒盏起身，不疾不徐开口。你引先贤文武兼资之典，又即席吟出“黄沙百战穿金甲，宁为百夫长，胜作一书生”与大宋边防策要，既赞文治之功，更显禁军卫国之重！）'),
    S('NPC-0007', '（曹佾听罢拍案大笑，那宗室子弟亦愧然起身敬酒赔礼）“妙极！四厢大人既有百步穿杨之勇，复有锦绣诗策之才，实乃我大宋栋梁！”'),
  ],
  onFinishEffects: [openScene('scene_jj_yj_06_trouble_arrives', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_yj_06_trouble_arrives',
  title: '第七幕 · 狂徒闯营',
  subtitle: '开封府 · 长枪方阵演武坪传报',
  mandatory: true,
  beats: [
    N('正当席间其乐融融之时，一名守门哨兵忽地捂着肩头踉跄奔入彩棚，急声禀报：'),
    S({ name: '守门哨兵', title: '殿前司守门校尉', factionName: '大宋禁军' }, '“启禀诸位将军！方才有一名身背重铁戟的塞外巨汉闯入长枪方阵演武坪，自称‘贺兰铁戟’，连伤我三名迎敌教头，扬言大宋禁军无人，只配打马球喝花酒！”'),
    S('NPC-0154', '（枪棒都教头林铁衣双目微眯，冷哼一声正欲起身，却瞥向你微微颔首）“这等不知天高地厚的江湖狂徒，正好劳烦四厢都指挥去活动活动筋骨，叫他见识见识什么叫我大宋禁军之威！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID, stepId: 'repel_challenger' },
    toast('狂徒贺兰铁戟正在【禁军长枪方阵演武坪】嚣张挑衅！'),
  ],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_yj_08_repel_challenger',
  title: '第八幕 · 演武坪折戟',
  subtitle: '开封府 · 禁军长枪方阵演武坪',
  mandatory: true,
  illustrationUrl: '/assets/quests/jinjun_yujinyuan_spear_duel.jpg',
  illustrationCaption: '禁军大教场演武坪 · 力挫塞外狂徒贺兰铁戟',
  beats: [
    N('长枪演武坪四周已围满数百名怒火中烧的禁军将士。场中那名身高八尺、铁甲森寒的狂徒单手拄着一杆九十斤沉铁方天戟，睥睨四方。见你披甲步入场中，他嘴角咧开一抹狂笑。'),
    S({ name: '贺兰铁戟', title: '塞外狂徒 · 重戟挑战者', factionName: '西夏狂武客' }, '“来得正好！你是四厢都指挥？吃我一记大漠裂石戟，站得住再说话！”'),
    P('（沉肩蓄劲，体内真气流转无碍）“大宋京营岂容狂徒放肆？今日便叫你折戟于此！”'),
  ],
  choices: [
    {
      id: 'jjyj_challenger_fight',
      label: '全力迎战贺兰铁戟！（1v1 一流上品）',
      subLabel: '硬仗考验：击溃一流上品狂徒，大振禁军士气',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID,
          opponent: { kind: 'custom', npc: buildHelanTieji() },
          rule: 'story_trial',
          forbidEscapeReason: '数百禁军将士环立观战，四厢都指挥绝无退步之理！',
          introText: '【1v1 演武折戟】迎战一流上品塞外狂徒【贺兰铁戟】！',
          onWin: [openScene('scene_jj_yj_09_master_guidance', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
          onLose: [toast('贺兰铁戟戟势沉猛，且退下重整武备再战！')],
        },
      ],
    },
  ],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_yj_09_master_guidance',
  title: '第九幕 · 教头传艺',
  subtitle: '开封府 · 八十万禁军大教场',
  mandatory: true,
  beats: [
    N('一番惊心动魄的激烈交锋后，你寻得破绽一招震飞贺兰铁戟手中沉铁大戟！那狂徒虎口崩裂、面色惨白，再不敢口出狂言，被军汉架出教场押入大牢审讯。全场数百名禁军甲士齐声欢呼“都指挥威武”，声震云霄！'),
    S('NPC-0154', '（林铁衣大笑着走上坪来，亲手将一具雕纹古朴的宝弓递到你手中）“好！方才那几下破重兵的身法拿捏得恰到好处！这柄【大宋边军克敌弓】乃军器监精造劲弓，老夫早年珍藏，今日赠予大人；另外这几路破戟拆招的心得，你且细细体会一番！”'),
  ],
  onFinishEffects: [openScene('scene_jj_yj_10_moonlight_feast', JINJUN_YUJINYUAN_HORSE_QUEST_ID)],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_yj_10_moonlight_feast',
  title: '第十幕 · 月上散席',
  subtitle: '开封府 · 玉津园外',
  mandatory: true,
  beats: [
    N('暮色四合，明月升上汴梁城头。曹佾、高怀亮、杨排风与林铁衣举杯共贺，今日既赏了春风骏马、吟了诗策，又痛快折了狂徒锐气，实乃入职禁军以来最畅快的一日。'),
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 60 },
    { type: 'giveCombatExp', amount: 1500 },
    { type: 'modifyRenown', delta: 30 },
    { type: 'giveItem', itemId: 'BOW-009', qty: 1 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0007' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0043' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0154' }, delta: 15 },
    { type: 'addSectContribution', amount: 90 },
    { type: 'completeQuest', questId: JINJUN_YUJINYUAN_HORSE_QUEST_ID, outcome: 'completed' },
    toast('《玉津园 · 春日校马记》完成！获大宋边军克敌弓、纹银 60 两、战斗经验 1500！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_yj_01_spring_muster: SCENE_01,
  scene_jj_yj_02_tame_steed: SCENE_02,
  scene_jj_yj_03_yang_sparring: SCENE_03,
  scene_jj_yj_04_pre_archery: SCENE_04_PRE,
  scene_jj_yj_04_archery_contest: SCENE_04,
  scene_jj_yj_05_noble_dispute: SCENE_05,
  scene_jj_yj_06_trouble_arrives: SCENE_06,
  scene_jj_yj_08_repel_challenger: SCENE_07,
  scene_jj_yj_09_master_guidance: SCENE_09,
  scene_jj_yj_10_moonlight_feast: SCENE_10,
}
