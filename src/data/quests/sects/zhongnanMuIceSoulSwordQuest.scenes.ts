import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q34_QUEST_ID } from './zhongnanMuIceSoulSwordQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq34_01: {
    id: 'scene_znq34_01',
    title: '第一幕 · 玉蜂急警',
    subtitle: '活死人墓 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('{reignYear}孟冬，终南幽谷霜雾沉沉。数十只雪白玉蜂忽然振翅冲入冰魄石室，在夜明珠微光下急促盘旋，发出凄厉的示警嗡鸣！'),
      S('NPC-0114', '（端坐昆仑寒玉床，轻抬玉指接住一只玉蜂，神色骤冷）“外谷哨蜂尽数被狂风毒刀震死。西夏一品堂的恶徒，终究还是摸进后山寒玉涧了。”'),
      P('（按剑肃立，神色凝重）“师父，可知来者何人？”'),
    ],
    onFinishEffects: [openScene('scene_znq34_02', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_02: {
    id: 'scene_znq34_02',
    title: '第二幕 · 恶人犯谷',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“哨蜂足间沾着西夏血腥脂粉与鳄铁锈气——来的正是西夏一品堂麾下臭名昭著的四大恶人之一，‘无恶不作’叶二娘，与‘凶神恶煞’岳老三！”'),
      P('（眸中寒光一闪）“这两个魔头横行西北，手段阴毒残忍。他们闯入银练飞瀑，定是为了逼我活死人墓交出秘籍！”'),
      S('NPC-0114', '（缓缓起身，素袖轻拂寒玉床侧暗格）“不错。段延庆老奸巨猾，必藏身暗处伺机而动，我须坐镇石室防他偷袭墓心。击退叶二娘与岳老三之任，便交由你去。”'),
    ],
    onFinishEffects: [openScene('scene_znq34_03', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_03: {
    id: 'scene_znq34_03',
    title: '第三幕 · 寒玉暗格',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('随着石壁发出一声低沉机括轻响，寒玉床后的冰石暗匣缓缓滑开。刹那间，一缕清冷绝尘的霜白剑气弥漫整个石室，连烛焰都为之凝滞三分！'),
      N('石匣之内并排安放着两件绝世珍宝：一柄剑身剔透如万载寒冰的长剑，以及一枚温润莹白、隐现冰莲纹路的昆仑寒玉环玦。'),
      S('NPC-0114', '“此剑名曰【寒玉素心冰魄剑】，乃采天山寒铁混昆仑玄冰精魄锻成，轻灵无匹、吹毛断发；此玦名曰【昆仑寒玉冰心玦】，佩之可令灵台冰清、百毒不侵，更能倍增玉女心经寒气！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_04', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_04: {
    id: 'scene_znq34_04',
    title: '第四幕 · 托付双宝',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('林朝瑶亲手捧起冰魄剑与寒玉冰心玦，步下石阶递至你手中。玉玦刚一触及掌心，一股清凉如雪水的真气便顺着劳宫穴直透丹田，令人神思瞬间空明如镜！'),
      P('（微微一震，肃然拜谢）“师父，此双宝乃古墓镇派圣物，弟子受之有愧！”'),
      S('NPC-0114', '（轻轻一笑，眉宇间似有千般嘱托）“剑若藏于石室，终不过一块冷铁；唯有落入真正的古墓传人手中，方能绽出惊世寒芒。今日叶二娘与岳老三联手犯境，正合以他们二人之血，为冰魄剑开锋！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_05', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_05: {
    id: 'scene_znq34_05',
    title: '第五幕 · 剑玦相融',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“不过冰魄剑寒性极烈，若未以心玦调和便贸然出鞘，反易寒气伤脉。你先携双宝去【天罗地网捕雀轻功厅】演练片刻，借捕雀身法令寒玉冰心玦与冰魄剑气彻底共鸣，再出谷斩魔！”'),
      P('（将冰心玦悬于腰间，反手轻握冰魄剑柄）“弟子谨遵师命！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_06', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_06: {
    id: 'scene_znq34_06',
    title: '第六幕 · 寒玉托剑',
    subtitle: '昆仑寒玉床冰魄石室 · 传宝授剑',
    illustrationUrl: '/assets/quests/zn_q34_jadebed_entrust.jpg',
    illustrationCaption: '冰魄石室 · 林朝瑶于寒玉床前亲授寒玉素心冰魄剑与昆仑寒玉冰心玦，霜华满室',
    mandatory: true,
    beats: [
      N('夜明珠光映照着素白衣袂与霜寒剑影，活死人墓传承数十载的冰心剑道，此刻已尽数凝于你掌中。'),
    ],
    onFinishEffects: [openScene('scene_znq34_07', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_07: {
    id: 'scene_znq34_07',
    title: '第七幕 · 移步雀厅',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      N('你辞别林朝瑶，踏着青石甬道轻身掠往天罗地网捕雀轻功厅。'),
    ],
    choices: [
      {
        id: 'znq34_accept',
        label: '携冰魄剑与冰心玦赴【天罗地网捕雀轻功厅】凝心试剑',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q34_QUEST_ID, stepId: 'sparrow_hall_attune' },
          setStep(ZHONGNAN_Q34_QUEST_ID, 'sparrow_hall_attune'),
          toast('已接取《冰魄凝心 · 寒玉托剑》！请前往【天罗地网捕雀轻功厅】调和剑气。', 'talk', '冰魄凝心'),
        ],
      },
    ],
  },

  scene_znq34_08: {
    id: 'scene_znq34_08',
    title: '第八幕 · 天罗轻影',
    subtitle: '活死人墓 · 天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('天罗地网捕雀轻功厅空阔幽寂，八十一只雪羽灵雀在石室穹顶盘旋飞舞。你轻按剑格，冰魄剑出鞘三寸，一声清越如冰凌脆响的剑鸣顿时荡开石厅！'),
      N('骤起寒气令灵雀受惊四散，你足尖一点，身形如飘雪流风般在漫天雀影间穿行，剑未伤雀羽分毫，却以无形寒气织成一张严密无漏的冰魄剑网！'),
    ],
    onFinishEffects: [openScene('scene_znq34_09', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_09: {
    id: 'scene_znq34_09',
    title: '第九幕 · 冰心归元',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      N('随着身法越转越快，腰间【昆仑寒玉冰心玦】散发出柔和温润的霜白玉晕，将原本凛冽刺骨的冰魄剑气悉数梳理得如臂使指、收发由心。'),
      N('刹那间，八十一只灵雀竟仿佛被无形冰幕温柔托住，齐齐停歇在四周石柱之上，羽翼纤毫未损！'),
    ],
    onFinishEffects: [openScene('scene_znq34_10', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_10: {
    id: 'scene_znq34_10',
    title: '第十幕 · 双宝同鸣',
    subtitle: '天罗地网捕雀轻功厅',
    mandatory: true,
    beats: [
      P('（收剑还鞘，感受着丹田内冰清玉洁、丝毫不滞的真气流转，唇角微扬）“冰心镇寒气，剑意随风生。叶二娘与岳老三纵然联手，今日也休想讨得半点便宜！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_11', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_11: {
    id: 'scene_znq34_11',
    title: '第十一幕 · 冰魄凝华',
    subtitle: '捕雀轻功厅 · 剑玦共鸣',
    illustrationUrl: '/assets/quests/zn_q34_ice_meditation.jpg',
    illustrationCaption: '天罗地网捕雀厅 · 霜白剑光与寒玉冰心玦交相辉映，满室灵雀安然栖止',
    mandatory: true,
    beats: [
      N('便在此时，石厅外忽然传来一阵尖锐刺耳的狂笑与巨剪开合的咔嚓声——双凶已顺着寒玉涧水流逼近银练飞瀑！'),
    ],
    onFinishEffects: [openScene('scene_znq34_12', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_12: {
    id: 'scene_znq34_12',
    title: '第十二幕 · 破雾出谷',
    subtitle: '活死人墓外道',
    mandatory: true,
    beats: [
      N('你轻拂白衣，身影如一缕寒烟穿出古藤幽径，直奔银练飞瀑清泉石茗案！'),
    ],
    onFinishEffects: [openScene('scene_znq34_13', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_13: {
    id: 'scene_znq34_13',
    title: '第十三幕 · 飞瀑迎魔',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('水声轰鸣间，一男一女两道煞气冲天的身影已出现在石茗案前。'),
    ],
    choices: [
      {
        id: 'znq34_go_falls',
        label: '驰赴【银练飞瀑清泉石茗案】，独力迎战叶二娘与岳老三！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q34_QUEST_ID, 'falls_dual_villains'),
          toast('请火速前往【银练飞瀑清泉石茗案（zn_st_falls）】击溃双凶！', 'warn', '飞瀑双凶'),
        ],
      },
    ],
  },

  scene_znq34_14: {
    id: 'scene_znq34_14',
    title: '第十四幕 · 双凶狂吠',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('银练飞瀑之下，石茗案已被一柄寒光森森的精钢鳄嘴剪咔嚓剪断。一名身材矮壮、脑袋硕大如斗的凶悍男子正扛着鳄嘴剪暴跳如雷。'),
      S('NPC-0183', '（岳老三瞪着铜铃大眼怒吼）“活死人墓的小娘们都死绝了吗？敢藏在石洞里不出来，看岳老二我一剪子拆了你们的石门！”'),
      S('NPC-0233', '（叶二娘面颊带着三条触目惊心的血色爪痕，手中一对柳叶薄刀寒光闪烁，咯咯冷笑）“老三别急，这不就有个标致的年轻小辈送上门来了么？瞧这身段眉眼，正好拿来给姐姐试试刀锋！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_15', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_15: {
    id: 'scene_znq34_15',
    title: '第十五幕 · 寒剑问罪',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你凌空踏水而来，白衣不染半点水花，稳稳立于飞瀑前一块青苔巨石之上。冰魄剑缓缓出鞘，方圆三丈的飞瀑水雾竟瞬间凝作晶莹冰晶飘落！'),
      P('（声音清冷如玉磬，透着森然剑意）“叶二娘、岳老三，你们在西夏作恶多端犹嫌不足，竟敢脏了我终南寒玉涧清泉！今日一并留下罢！”'),
      S('NPC-0183', '（气得哇哇大叫）“臭小辈竟敢直呼爷爷大名！二娘别抢，让我先剪断{gender:他|她}的脖子！”'),
      S('NPC-0233', '（眼神一毒，柳叶双刀左右分进）“老三莫大意，这把剑寒气古怪，咱们一起上！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_16', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_16: {
    id: 'scene_znq34_16',
    title: '第十六幕 · 刀剪合围',
    subtitle: '银练飞瀑 · 双凶袭杀',
    illustrationUrl: '/assets/quests/zn_q34_falls_ambush.jpg',
    illustrationCaption: '银练飞瀑 · 叶二娘柳叶双刀与岳老三鳄嘴剪左右夹击，寒玉冰魄剑气骤然凝霜',
    mandatory: true,
    beats: [
      N('叶二娘身法鬼魅、双刀专攻阴狠死穴；岳老三力大无穷、鳄嘴剪虎虎生风！双凶联手扑来，气势汹汹！'),
    ],
    onFinishEffects: [openScene('scene_znq34_17', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_17: {
    id: 'scene_znq34_17',
    title: '第十七幕 · 冰魄独战',
    subtitle: '银练飞瀑 · 1v2 激战双凶',
    mandatory: true,
    beats: [
      N('腰间昆仑寒玉冰心玦微光流转，令你心境澄澈无波。面对两大恶人联手合击，你足踏捕雀轻功，寒玉素心冰魄剑挽出漫天冰莲剑花迎上！'),
    ],
    choices: [
      {
        id: 'znq34_fight_villains',
        label: '仗冰魄剑与寒玉冰心玦，以一敌二击溃【叶二娘】与【岳老三】！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q34_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0233' },
            extraOpponents: [{ kind: 'npc', npcId: 'NPC-0183' }],
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '双凶若破飞瀑防线，便会直逼活死人墓石门，此战绝不可退！',
            introText: '银练飞瀑水雾凝冰，你手执寒玉素心冰魄剑独战叶二娘与岳老三！',
            onWin: [openScene('scene_znq34_18', ZHONGNAN_Q34_QUEST_ID)],
            onLose: [
              toast('双凶联手攻势毒辣，你借玉女轻功掠上瀑岩调息，再起寒剑破敌！', 'warn', '双凶受挫'),
            ],
            onDraw: [
              toast('寒剑与刀剪激战难分胜负，双凶已被寒气冻僵经脉，速再进击！', 'warn', '激战胶着'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq34_18: {
    id: 'scene_znq34_18',
    title: '第十八幕 · 霜封鳄剪',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('激战数十合，你借冰心玦清气稳守中宫，身形如穿花玉燕在刀剪缝隙间游刃有余！陡然间剑势一变，冰魄剑顺着岳老三鳄嘴剪锋刃疾削而入，凛冽寒气瞬间顺铁柄直透其双臂！'),
      S('NPC-0183', '（哇呀一声惨叫，双掌冻得青紫麻木，沉重的鳄嘴剪“哐当”脱手坠地）“哎哟喂！这破剑怎么这么冰，冻死爷爷的手了！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_19', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_19: {
    id: 'scene_znq34_19',
    title: '第十九幕 · 剑震双刀',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('叶二娘见岳老三失械，惊怒交加，双刀交叉直刺你背心！你头也不回，反手一记回风拂柳，冰魄剑身震出三道霜环，瞬间荡开柳叶双刀，剑脊重重拍在她肩井大穴上！'),
      S('NPC-0233', '（倒飞撞在青石壁上，脸色煞白如纸，惊骇失声）“好霸道的寒玉剑气！老三，点子扎手，快撤！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_20', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_20: {
    id: 'scene_znq34_20',
    title: '第二十幕 · 恶人抱头窜',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('岳老三顾不得吹牛，一把抄起地上的鳄嘴剪，护着叶二娘连滚带爬逃入下游乱林，临走还气急败坏地叫嚷着要去寻老大段延庆报仇。'),
      P('（轻弹剑锋，一滴水珠凝成冰粒弹落潭面）“段延庆若敢来，便叫他也一并尝尝这寒玉冰魄剑！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_21', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_21: {
    id: 'scene_znq34_21',
    title: '第二十一幕 · 冰剑退凶',
    subtitle: '银练飞瀑 · 一战慑双恶',
    illustrationUrl: '/assets/quests/zn_q34_dual_villains.jpg',
    illustrationCaption: '银练飞瀑之下 · 霜白剑光如冰莲绽放，一剑冻裂鳄剪震退叶二娘与岳老三',
    mandatory: true,
    beats: [
      N('飞瀑水雾重新恢复澄澈清冽，几只巡山玉蜂飞回你肩头欢快轻舞，仿佛在庆贺古墓新主首战告捷。'),
    ],
    onFinishEffects: [openScene('scene_znq34_22', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_22: {
    id: 'scene_znq34_22',
    title: '第二十二幕 · 提剑归幽',
    subtitle: '寒玉涧石径',
    mandatory: true,
    beats: [
      N('你收剑归鞘，踏着霜华满地的幽径返回活死人墓冰魄石室复命。'),
    ],
    choices: [
      {
        id: 'znq34_go_return',
        label: '返回【昆仑寒玉床冰魄石室】，向林朝瑶复命',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q34_QUEST_ID, 'return_jadebed_bestow'),
          toast('请返回【昆仑寒玉床冰魄石室（zn_tb_jadebed）】正式受宝结案！', 'success', '冰剑退凶'),
        ],
      },
    ],
  },

  scene_znq34_23: {
    id: 'scene_znq34_23',
    title: '第二十三幕 · 寒室复命',
    subtitle: '活死人墓 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('步入冰魄石室，林朝瑶早已立于寒玉床前静候。见你白衣纤尘不染，眉宇间寒光内敛而不露锋芒，她唇边露出一抹由衷的笑意。'),
      S('NPC-0114', '“玉蜂早已先你一步传回消息。以一敌二，不过数十合便冻伤岳老三、震退叶二娘，你果然没有辜负这两件古墓至宝。”'),
    ],
    onFinishEffects: [openScene('scene_znq34_24', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_24: {
    id: 'scene_znq34_24',
    title: '第二十四幕 · 双宝归主',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      P('（双手捧剑与玉玦欲奉还）“幸赖师父双宝神威，弟子侥幸击退双凶，今特奉还圣物。”'),
      S('NPC-0114', '（轻轻推回你的双手）“既是托剑于你，便无收回之理。【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】今日起便正式归你所有。切记，冰心澄澈方能驾驭绝世寒锋。”'),
    ],
    onFinishEffects: [openScene('scene_znq34_25', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_25: {
    id: 'scene_znq34_25',
    title: '第二十五幕 · 素心前瞻',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（神色微凝，目光穿透石室望向谷外）“叶二娘与岳老三败走，段延庆绝不会善罢甘休。他若亲至终南，寻常玉女剑法未必能稳压其一阳指铁杖。”'),
      S('NPC-0114', '“待你调息数日，随我往繁花幽谷双剑合璧坪去——也是时候让你窥见我活死人墓至高天阶剑学《玉女素心剑法》的真谛了。”'),
    ],
    onFinishEffects: [openScene('scene_znq34_26', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_26: {
    id: 'scene_znq34_26',
    title: '第二十六幕 · 幽谷静待',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      P('（凝视掌中晶莹如雪的冰魄剑，心潮微动）“《玉女素心剑法》……弟子定当竭尽全力，绝不教段延庆玷污终南一草一木！”'),
    ],
    onFinishEffects: [openScene('scene_znq34_27', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_27: {
    id: 'scene_znq34_27',
    title: '第二十七幕 · 冰心映谷',
    subtitle: '活死人墓 · 寒玉承传',
    illustrationUrl: '/assets/quests/zn_q34_tomb_glory.jpg',
    illustrationCaption: '活死人墓幽谷 · 佩冰心玦执冰魄剑立于石门之前，寒雾凝华，古墓新锋威震终南',
    mandatory: true,
    beats: [
      N('石门之外霜雾散尽，一缕清冷冬阳洒入幽谷，映照着冰魄剑锋与寒玉冰心玦，清光皎洁如月。'),
    ],
    onFinishEffects: [openScene('scene_znq34_28', ZHONGNAN_Q34_QUEST_ID)],
  },

  scene_znq34_28: {
    id: 'scene_znq34_28',
    title: '第二十八幕 · 寒玉定名',
    subtitle: '昆仑寒玉床冰魄石室 · 结案',
    mandatory: true,
    beats: [
      N('你正式获颁古墓镇派双宝【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】，独力击溃叶二娘与岳老三，威名响彻关中！'),
    ],
    choices: [
      {
        id: 'znq34_complete',
        label: '拜谢林朝瑶，正式承接【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】（完成任务）',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'WPN-103', qty: 1 },
          { type: 'giveItem', itemId: 'ACC-057', qty: 1 },
          { type: 'giveCombatExp', amount: 1200, reason: '佩寒玉双宝于银练飞瀑以一敌二击溃叶二娘与岳老三' },
          { type: 'modifyRenown', delta: 180, reason: '冰魄剑气独退四大恶人双凶，威震关中江湖' },
          { type: 'modifyChivalry', delta: 70, reason: '惩恶护谷、力挫西夏魔头' },
          { type: 'modifySkill', key: '琴', delta: 2 },
          { type: 'modifySkill', key: '画', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 30 },
          { type: 'completeQuest', questId: ZHONGNAN_Q34_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《冰魄凝心 · 寒玉托剑》！获地阶神兵【寒玉素心冰魄剑】与宝玉【昆仑寒玉冰心玦】！',
            'success',
            '寒玉托剑',
          ),
        ],
      },
    ],
  },
}
