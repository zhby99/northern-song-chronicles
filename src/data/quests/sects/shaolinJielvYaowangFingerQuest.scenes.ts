import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q15_QUEST_ID } from './shaolinJielvYaowangFingerQuest'

const SPEAKER_ONE_EYE_WOLF: StorySpeakerSpec = {
  kind: 'custom',
  name: '独眼狼',
  title: '太行溃匪首 · 劫药凶徒',
  factionName: '太行溃匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_BANDIT_DEPUTY: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑风疤',
  title: '太行悍匪 · 独眼狼心腹',
  factionName: '太行溃匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_REFUGEE_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '郑州流民老丈',
  title: '受灾百姓',
  factionName: '大宋百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildOneEyeWolfBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ15_ONE_EYE_WOLF',
    name: '独眼狼',
    title: '太行溃匪首 · 悍恶刀客',
    realm: '二流上品',
    factionName: '太行溃匪',
    sectRank: 0,
    sectRankLabel: '太行匪首',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“少林药王院的大黑续命膏千金难买！小和尚识相的滚开，不然连你一块剁碎喂黄河王八！”',
    stats: { hp: 1760, mp: 1500, agi: 55, res: 42 },
    talents: { bone: 82, comprehension: 60, charm: 30 },
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-119',
      move1: 'MA-115',
      move2: 'MA-151',
      move3: 'MA-124',
    },
    learnedArts: [
      { artId: 'MA-103', level: 7 },
      { artId: 'MA-119', level: 6 },
      { artId: 'MA-115', level: 7 },
      { artId: 'MA-151', level: 6 },
      { artId: 'MA-124', level: 6 },
    ],
  })
}

function buildBanditDeputy(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ15_BANDIT_DEPUTY',
    name: '黑风疤',
    title: '太行悍匪 · 独眼狼心腹',
    realm: '二流下品',
    factionName: '太行溃匪',
    sectRank: 0,
    sectRankLabel: '太行匪众',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“老大，跟这秃驴废什么话！弟兄们一起上，抢完药箱立刻撤回太行山！”',
    stats: { hp: 1020, mp: 680, agi: 41, res: 26 },
    talents: { bone: 68, comprehension: 48, charm: 26 },
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-218',
      move1: 'MA-151',
      move2: 'MA-189',
    },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-218', level: 5 },
      { artId: 'MA-151', level: 5 },
      { artId: 'MA-189', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq15_01: {
    id: 'scene_slq15_01',
    title: '第一幕 · 东厢药香',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊藏经橱',
    mandatory: true,
    beats: [
      N('{reignYear}夏末，暑气蒸腾。大雄宝殿东厢碑廊内却弥漫着一缕清苦幽远的草药馨香。药王院主【玄生】正立于高大的檀木藏经橱前，将一卷卷虫蛀发黄的古医典铺陈长案之上细细晾晒。'),
      S('NPC-0158', '（听见脚步声，回头见是你，眉目舒展温和一笑）“阿弥陀佛。听玄寂师兄说你去年在汴京一掌擒魔、名动京师，如今经义与书法又精进不少。正好老衲手头这批唐宋历代《少林药王脉诀》亟待重抄归档，不知师侄可愿搭把手？”'),
      P('（合十行礼，神色恭谨）“玄生师伯言重了！戒律与药王本为一脉，弟子素仰药王院济世之德，能随师伯抄校医典求之不得！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_02', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_02: {
    id: 'scene_slq15_02',
    title: '第二幕 · 医武同源',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('你研墨铺纸，一笔一划替玄生誊抄人体奇经八脉与药性配伍。你书法功底深厚，蝇头小楷工整清劲，连经络穴位图皆勾勒得毫厘不差。'),
      S('NPC-0158', '（抚须赞叹）“好定力，好笔法！世人多知少林七十二绝技刚猛无匹，却少有人悟透——能伤人者，亦能活人。戒律院执杖止恶，药王院悬壶救苦，皆是菩萨心肠。”'),
    ],
    choices: [
      {
        id: 'slq15_accept_yaowang',
        label: '恭谨领受玄生师伯教诲，协助整理药王医典',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q15_QUEST_ID, stepId: 'zhengzhou_relief_camp' },
          setStep(SHAOLIN_Q15_QUEST_ID, 'zhengzhou_relief_camp'),
          toast('已开启《药王百草 · 拈花截脉》！随药王院主玄生参悟医武之道。', 'talk', '药王百草'),
          openScene('scene_slq15_03', SHAOLIN_Q15_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq15_03: {
    id: 'scene_slq15_03',
    title: '第三幕 · 郑州瘴灾',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('话音未落，廊外忽然奔入一名气喘吁吁的知客沙弥，双手捧着郑州官府求援急函叩首禀报：连旬暴雨冲垮黄河郑州堤坝，数千失所流民聚居官道高坡，湿热浊气交蒸之下，竟突发剧烈「锁喉瘴」！'),
      N('染病百姓咽喉肿闭、喘息艰难，不过半日便有窒息而亡之险，当地医馆药石早已告罄！'),
      S('NPC-0158', '（闻言脸色骤沉，立刻合上医典起身）“阿弥陀佛，罪过罪过！锁喉瘴来势最凶，若待汤药慢慢煎服，只怕半数老弱撑不过今夜！师侄，速随老衲搬出药王院库存的大黑续命膏与解瘴散，即刻驰赴郑州救人！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_04', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_04: {
    id: 'scene_slq15_04',
    title: '第四幕 · 医道传指',
    subtitle: '东厢碑廊前院',
    mandatory: true,
    beats: [
      N('你连忙帮玄生装妥三担救命药箱。临行之际，玄生忽然停步，将你唤至碑廊老桂树下。'),
      S('NPC-0158', '“郑州染瘴流民动辄数百，单凭老衲一人施针疏气断然救不过来！锁喉瘴急症须以至柔至细的纯正内劲，隔衣点通『天突』『膻中』『合谷』三穴，震散郁结痰火，方能立时救命！”'),
      S('NPC-0158', '“可寻常武僧内劲刚猛，若贸然点在病弱百姓身上，反会震伤心肺！今日事急从权，老衲便以医道传你少林七十二绝技之一——《拈花指》！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_05', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_05: {
    id: 'scene_slq15_05',
    title: '第五幕 · 迦叶拈花',
    subtitle: '东厢碑廊老桂树下',
    mandatory: true,
    beats: [
      N('玄生伸出右手食指与中指，轻轻一捻，仿佛拈起一朵无形莲花，朝三尺外桂树上一片挂着露珠的枯叶凌空虚点！'),
      N('奇景骤生——那片枯叶应指飘落，叶面上晶莹剔透的晨露却稳稳凝在原处未曾碎裂半滴！'),
      S('NPC-0158', '“《拈花指》妙处不在刚狠，而在『柔、细、准』三字！以一缕春风细丝般的禅劲透入穴道，对敌可悄无声息截断经脉，对民可隔衣化瘀、立起沉疴！你方才抄校过《药王脉诀》，穴位早熟于胸，且随老衲试运三转！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_06', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_06: {
    id: 'scene_slq15_06',
    title: '第六幕 · 柔劲初成',
    subtitle: '东厢碑廊前院',
    mandatory: true,
    beats: [
      N('你闭目凝神，将平日修习的刚猛禅劲一寸寸收束化柔，引至指尖。初时指风仍显燥烈，经玄生连声以《金刚经》心法点拨，半柱香后你屈指轻弹，指尖劲风竟已如柳絮拂面、绵密入微！'),
      S('NPC-0158', '（欣慰颔首）“好悟性！虽初窥门径，已足够隔衣替病民疏通气脉！事不宜迟，咱们即刻下山直奔郑州官道！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_07', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_07: {
    id: 'scene_slq15_07',
    title: '第七幕 · 官道药棚',
    subtitle: '郑州城外 · 救灾药棚',
    mandatory: true,
    beats: [
      N('星夜疾行数十里，及至郑州城外官道高坡，眼前惨状令你心头剧震：洪水尚未退尽，泥泞堤岸上搭满破席草棚，数百名面黄肌瘦的灾民扶老携幼呻吟不止，数十名锁喉瘴重症者更是面色紫绀、眼见气绝！'),
      S(SPEAKER_REFUGEE_ELDER, '（抱着怀中呼吸微弱的小孙儿，跪倒泥水之中泣血哀求）“少林活佛来了！求大师救救我孙儿吧，他喉咙堵得喘不上气，快没命了啊！”'),
      S('NPC-0158', '（立即放下药箱命随行僧众生火煎药，转首对你沉声道）“师侄，西侧三十名重症便交由你以《拈花指》隔衣疏脉！切记劲力宁轻勿重，气随指走！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_08', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_08: {
    id: 'scene_slq15_08',
    title: '第八幕 · 拈花渡气',
    subtitle: '郑州城外 · 救灾药棚',
    illustrationUrl: '/assets/quests/sl_15_finger_heal.jpg',
    illustrationCaption: '拈花截脉 · 郑州药棚之内，以柔绵指劲隔衣点穴救治染瘴流民',
    mandatory: true,
    beats: [
      N('你跪坐泥地之上，神色慈悲沉静，右手并指如拈花，隔着稚童单薄破旧的粗布衣衫，轻柔精准地点在「天突」「膻中」「合谷」三处要穴！'),
      N('三缕温润如春阳的少林禅劲透衣而入，如细雨润物般缓缓化开稚童喉间郁结浊气！不过十息工夫，“哇”的一声，稚童吐出一口淤黑浓痰，骤然大口喘过气来，青紫的小脸渐渐泛出血色！'),
      S(SPEAKER_REFUGEE_ELDER, '（老泪纵横，连连磕头）“活过来了！我孙儿活过来了！多谢少林活菩萨救命大恩！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_09', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_09: {
    id: 'scene_slq15_09',
    title: '第九幕 · 昼夜活人',
    subtitle: '郑州城外 · 救灾药棚',
    mandatory: true,
    beats: [
      N('整整两日两夜，你与玄生几乎未曾合眼。每点一穴、每渡一缕柔劲，你对人体经脉与《拈花指》力道收放的体悟便深进一分，原本生涩的指法在百余次救死扶伤间渐臻圆熟自然！'),
      N('到了第三日黄昏，药棚内外百余名染瘴百姓大多已脱离险境，正喝着热腾腾的解瘴药汤，官道上久违地响起了感激的祈福声。'),
    ],
    onFinishEffects: [openScene('scene_slq15_10', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_10: {
    id: 'scene_slq15_10',
    title: '第十幕 · 尘烟劫棚',
    subtitle: '郑州城外 · 官道药棚外',
    mandatory: true,
    beats: [
      N('正在此时，官道西北方向骤然蹄声如雷、杀声震天！一伙约莫三四十人的凶恶悍匪挥舞鬼头刀与铁枪疾驰而来，吓得草棚外灾民哭喊奔逃！'),
      S(SPEAKER_REFUGEE_ELDER, '（面色惨白，惊呼出声）“不好了！是趁着黄河发大水下山打劫的太行山溃匪！领头那个独眼恶贼就是心狠手辣的『独眼狼』！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_11', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_11: {
    id: 'scene_slq15_11',
    title: '第十一幕 · 独眼恶狼',
    subtitle: '郑州城外 · 救灾药棚前',
    mandatory: true,
    beats: [
      N('马蹄急停，尘土飞扬。为首那名独眼蒙黑布、肩扛厚背砍山刀的巨汉翻身下马，一双阴鸷独眼死死盯住药棚内堆积如山的少林药箱与赈灾粮袋！'),
      S(SPEAKER_ONE_EYE_WOLF, '（放声狂笑）“哈哈哈哈！弟兄们走运了！听说少林药王院拉了几大箱千金难买的大黑续命膏和上等药材来救穷鬼！全都给老子搬上马背，谁敢拦路，一刀两断！”'),
      S(SPEAKER_BANDIT_DEPUTY, '（提刀狞笑）“老大放心！这破草棚里就几个手无寸铁的老和尚和病秧子，三两下全剁了！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_12', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_12: {
    id: 'scene_slq15_12',
    title: '第十二幕 · 挺身护民',
    subtitle: '郑州城外 · 救灾药棚前',
    mandatory: true,
    beats: [
      N('草棚深处，玄生正为一名高热昏迷的孕妇施针抢救，丝毫抽身不得。你深吸一口气，缓步踏出草棚，僧袍迎风猎猎作响，独身挡在百余名手无寸铁的灾民之前！'),
      P('（双目炯炯，声震官道）“阿弥陀佛！此乃少林药王院赈灾救命药棚！尔等趁天灾劫掠救命汤药、屠戮灾民，天理难容！立刻放下兵刃滚回山去，贫僧饶尔等不死！”'),
      S(SPEAKER_ONE_EYE_WOLF, '（独眼凶光毕露，啐了一口）“哪儿冒出来的小秃驴，敢在老子面前装大尾巴狼！黑风疤，随我一块砍了这和尚！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q15_at_camp', value: true },
      openScene('scene_slq15_13', SHAOLIN_Q15_QUEST_ID),
    ],
  },

  scene_slq15_13: {
    id: 'scene_slq15_13',
    title: '第十三幕 · 群狼扑杀',
    subtitle: '郑州官道药棚前（战前）',
    mandatory: true,
    beats: [
      N('独眼狼挥舞厚背重刀力劈华山，其心腹黑风疤则斜刺里抄起鬼头刀封锁下盘！二贼久经太行山厮杀，刀势凶猛狠毒，身后药棚内尽是染病老弱，退无可退！'),
    ],
    onFinishEffects: [openScene('scene_slq15_14', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_14: {
    id: 'scene_slq15_14',
    title: '第十四幕 · 药棚死守',
    subtitle: '郑州官道药棚前（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('你沉气凝神，左手蓄《一拍两散掌》刚猛雷霆，右手拈《拈花指》柔绵截脉，迎着漫天刀影毅然踏步向前！'),
    ],
    choices: [
      {
        id: 'slq15_fight_wolf',
        label: '指掌齐施，迎战太行溃匪首【独眼狼】与心腹【黑风疤】！（车轮连战 实战）',
        subLabel: '主敌二流上品独眼狼 + 副手二流下品黑风疤',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildOneEyeWolfBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildBanditDeputy() }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是药王院药箱与百余染疫流民，寸步不可后退！',
            introText: '【车轮连战 · 郑州药棚护民战】迎战太行溃匪首【独眼狼】与悍匪【黑风疤】！',
            onWin: [openScene('scene_slq15_15', SHAOLIN_Q15_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('太行溃匪刀势凶狠，暂借药棚木架周旋调息，整理好状态再战独眼狼！', 'warn', '拈花截脉'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq15_15: {
    id: 'scene_slq15_15',
    title: '第十五幕 · 拈花封穴',
    subtitle: '郑州城外 · 官道药棚前',
    illustrationUrl: '/assets/quests/sl_15_bandit_repel.jpg',
    illustrationCaption: '指掌齐施 · 药棚之前刚掌震敌、拈花点穴，生擒太行匪首独眼狼',
    mandatory: true,
    beats: [
      N('刀光掌影交错间，你先以一记刚猛无俦的《一拍两散掌》震飞黑风疤手中鬼头刀并将其轰翻在地！独眼狼大惊失色，暴吼着举刀狂劈，你却不退反进，身形如柳絮般贴着刀背滑入中宫！'),
      N('右手食中二指如迦叶拈花轻描淡写连点三下——「肩井」「曲池」「风池」！三缕细密柔劲瞬息截断独眼狼臂膀气脉！'),
      S(SPEAKER_ONE_EYE_WOLF, '（重刀哐当坠地，整个人如泥塑木雕般僵立原地，独眼中满是惊恐）“你……你点了老子什么邪门穴道？怎么浑身动弹不得！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_16', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_16: {
    id: 'scene_slq15_16',
    title: '第十六幕 · 群匪溃散',
    subtitle: '郑州城外 · 官道药棚前',
    mandatory: true,
    beats: [
      N('众太行溃匪眼见凶名赫赫的独眼狼竟被年轻和尚举重若轻三指制伏，顿时魂飞魄散，不知谁喊了一声“少林罗汉降世啦”，数十名悍匪调转马头作鸟兽散，狼狈逃入荒野！'),
      N('不多时，郑州巡防官兵闻讯赶到，将动弹不得的独眼狼与黑风疤枷锁押走。药棚内外顿时爆发出震天欢呼！'),
    ],
    onFinishEffects: [openScene('scene_slq15_17', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_17: {
    id: 'scene_slq15_17',
    title: '第十七幕 · 瘴散民安',
    subtitle: '郑州城外 · 官道长堤',
    mandatory: true,
    beats: [
      N('此后七日，再无匪患侵扰。洪水渐退，锁喉瘴亦在少林汤药与你的拈花疏脉之下彻底平息，前后活人何止三百余众！'),
      N('启程归山那日，郑州官道两旁跪满焚香相送的百姓，人人称颂少林药王院慈悲救世之德。'),
    ],
    onFinishEffects: [openScene('scene_slq15_18', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_18: {
    id: 'scene_slq15_18',
    title: '第十八幕 · 归藏医典',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊藏经橱',
    mandatory: true,
    beats: [
      N('重返嵩山少林寺东厢碑廊，秋风送爽，药香依旧。玄生将你先前誊抄工整的《少林药王脉诀》郑重收入檀木藏经橱中，转身向你深深合十。'),
    ],
    onFinishEffects: [openScene('scene_slq15_19', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_19: {
    id: 'scene_slq15_19',
    title: '第十九幕 · 药王嘉许',
    subtitle: '东厢碑廊 · 藏经橱',
    illustrationUrl: '/assets/quests/sl_15_yaowang_praise.jpg',
    illustrationCaption: '药王嘉许 · 东厢碑廊之下，玄生亲授《拈花指》全卷真传',
    mandatory: true,
    beats: [
      S('NPC-0158', '（目含赞叹，朗声嘉许）“善哉，善哉！师侄此番郑州之行，以拈花指隔衣救治百余染瘴苦民，又于危难之际指掌齐施封穴退匪而不妄造杀孽！此等仁心与悟性，实乃我少林药王一脉百年难遇之良材！”'),
      S('NPC-0158', '“老衲今日将少林七十二绝技《拈花指》全卷心法尽数授你！望你他日无论身处庙堂江湖，皆不忘『一指可截恶脉，一指可渡苍生』之初心！”'),
      P('（恭谨伏拜领受，心潮微澜）“弟子谨记玄生师伯谆谆教诲，此生定以慈悲护道、济世安民！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_20', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_20: {
    id: 'scene_slq15_20',
    title: '第二十幕 · 妙手拈花',
    subtitle: '东厢碑廊 · 藏经橱（结局）',
    mandatory: true,
    beats: [
      N('桂香随风拂入东厢碑廊。你摊开右手微微一捻，只觉指尖圆润禅劲收发随心，刚柔并济间，武道与佛心俱更上一层楼。'),
    ],
    choices: [
      {
        id: 'slq15_finish',
        label: '合十谢过玄生师伯，领受《拈花指》全卷（完成《药王百草 · 拈花截脉》）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-063' },
          { type: 'giveCombatExp', amount: 420, reason: '郑州药棚以拈花指救民破太行溃匪独眼狼' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'modifyChivalry', delta: 30, reason: '黄河水灾设棚施药、护民退匪活人无数' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0158' }, delta: 18 },
          { type: 'completeQuest', questId: SHAOLIN_Q15_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《药王百草 · 拈花截脉》！习得地阶绝学《拈花指》，获 420 实战经验、160 门派贡献与 30 侠义！',
            'success',
            '药王百草',
          ),
        ],
      },
    ],
  },
}
