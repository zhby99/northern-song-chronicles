import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q30_QUEST_ID } from './shaolinSweepLeafZenQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq30_01: {
    id: 'scene_slq30_01',
    title: '第一幕 · 银杏霜深',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山霜风渐起。藏经阁外那株千年古银杏褪尽青翠，满树金叶随风簌簌飘落，将青石小院铺成一片灿烂金毯。'),
      N('自七夕曝书之夜择定「慈悲默察」以来，你始终未惊动戒律院与武僧堂口，而是每日黎明独自步入扫叶庭，静观庭中那位终年佝偻着背、手持秃竹扫帚的无名老僧。'),
      S('NPC-0101', '（头也不抬，扫帚轻划石面发出沙沙轻响，声调平和得宛如古井无波）“小施主站在银杏树外看了整整七日。树叶落了要扫，心里的念头落了，光站在外头看，可扫不干净。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_02', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_02: {
    id: 'scene_slq30_02',
    title: '第二幕 · 借帚同扫',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      P('（心头微震，上前合十深揖一礼）“晚辈{playerName}见过老禅师。日前晚辈在藏经主阁撞见两位绝世高人暗中窥伺七十二绝技，思之再三，不愿以杀阵相逼，特来庭中向老禅师请教化戾之道。”'),
      S('NPC-0101', '（终于停下扫帚，浑浊却深邃如星海的双眸静静望了你一眼，指了指墙角另一把旧竹扫帚）“老衲不过是个扫地杂役，哪懂什么化戾之道？你若真闲得慌，便拿那把扫帚，陪老衲扫完这庭秋叶罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_03', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_03: {
    id: 'scene_slq30_03',
    title: '第三幕 · 初执竹帚',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('你依言取过墙角青竹扫帚，凝神挥扫。起初你不自觉便将少林棍法与纯阳内劲带入帚柄，一扫之下落叶翻飞三尺，却反将石缝尘灰激得漫天飞扬。'),
      S('NPC-0101', '（轻轻摇头，淡然一笑）“你这一扫，使了三分罗汉伏魔劲、两分达摩清风意，看着好生威风，可落叶飞到东边，明日风一吹又回西边，岂非白忙？”'),
    ],
    onFinishEffects: [openScene('scene_slq30_04', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_04: {
    id: 'scene_slq30_04',
    title: '第四幕 · 默扫立志',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      P('（闻言汗颜，收束全身内力，双手虚握帚柄再拜）“老禅师点拨得是！晚辈执着于武学劲力，反失了平常心。愿留于庭中随老禅师默扫月余，听风悟禅！”'),
    ],
    choices: [
      {
        id: 'slq30_start_sweeping',
        label: '敛去一身武学锋芒，随法空老僧于古银杏庭默扫月余！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q30_QUEST_ID, stepId: 'ginkgo_sweeping' },
          setStep(SHAOLIN_Q30_QUEST_ID, 'ginkgo_sweeping'),
          toast('已开启《慈悲默察 · 扫叶听风》！随法空老僧默扫参禅。', 'talk', '扫叶听风'),
          openScene('scene_slq30_05', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq30_05: {
    id: 'scene_slq30_05',
    title: '第五幕 · 朝霜暮雪',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    illustrationUrl: '/assets/quests/sl_30_ginkgo_sweep.jpg',
    illustrationCaption: '古杏扫叶 · 朝露暮霜之间，陪法空老僧默扫满庭秋叶',
    mandatory: true,
    beats: [
      N('此后三十余日，你每日卯时随法空执帚扫叶，酉时归帚打坐，不练一招杀伐绝技，亦不问阁中半句风声。'),
      N('初时十日，你耳中仍时常警觉主阁瓦顶是否有人影掠过；至第二十日，风吹叶落之声渐与呼吸合拍；及至满月之期，你手中竹帚轻贴青石，落叶顺帚成堆，竟连一粒浮尘也未惊起。'),
    ],
    onFinishEffects: [openScene('scene_slq30_06', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_06: {
    id: 'scene_slq30_06',
    title: '第六幕 · 风声入耳',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('这日薄暮，北风穿阁而过。你正欲收帚，忽觉藏经主阁二层东窗微微一颤——极淡的一缕内息波动掠过檐角，比七夕那夜更显急躁郁结，隐隐透出经脉隐痛之象！'),
      P('（手中扫帚停在半空，低声自语）“那两位潜伏盗经的高人又来了……而且听其吐纳之音，气血竟似在逆冲膻中，已生内伤暗疾！”'),
    ],
    onFinishEffects: [openScene('scene_slq30_07', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_07: {
    id: 'scene_slq30_07',
    title: '第七幕 · 武学之障',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      S('NPC-0101', '（依旧缓缓扫着树根残叶，宛如自言自语般轻叹）“本寺七十二绝技，每一项功夫都能伤人要害、取人性命，凌厉狠辣，大干天和。是以每一项绝技，均须有相应的慈悲佛法为之化解。”'),
      S('NPC-0101', '（抬眼望向琉璃阁顶，声音清越如古磬）“这道理，本寺高僧人人皆知，偏偏那些偷学绝技的施主不知。他们贪多务得、只练杀招不修佛法，每多练一门绝技，心头戾气便重一分——这便是『武学障』。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_08', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_08: {
    id: 'scene_slq30_08',
    title: '第八幕 · 佛法能解',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('轰然一声，如暮鼓晨钟敲击在你灵台深处！你苦修十五载少林武学，此刻听闻法空一言，顿时如拨云见日，全身经脉中平日积存的丝丝刚猛燥气竟瞬间化作一片清凉祥和！'),
      S('NPC-0101', '（微微颔首）“武学障深，唯有佛法能解。若以刀兵相向，纵能困其身，却愈激其恨，戾气冲顶之下，非死即疯；唯有将对症佛经置于其案头，使其自省自渡，方是少林千年不绝的大慈悲。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_09', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_09: {
    id: 'scene_slq30_09',
    title: '第九幕 · 顿悟慈悲',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      P('（心中豁然开朗，向法空老僧郑重三拜）“晚辈大悟！难怪老禅师数十年来明知阁中有人盗经，却从不鸣钟捉拿，只在旁默默将《法华经》《杂阿含经》摆在绝技秘籍之侧——您一直都在等他们回头！”'),
      S('NPC-0101', '（眉眼含笑，谦逊合十）“阿弥陀佛。老衲手拙字丑，抄不得好经。倒是小施主你书法精严、经义通透，既发此慈悲大愿，何不亲手抄一卷《楞伽经》留于案头？”'),
    ],
    onFinishEffects: [openScene('scene_slq30_10', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_10: {
    id: 'scene_slq30_10',
    title: '第十幕 · 研墨发愿',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      P('（双目澄澈如秋水）“晚辈谨遵老禅师法旨！这便去取松烟墨与澄心堂纸，焚香净手，亲抄一卷《楞伽经》要义置于藏经阁绝技橱侧，愿以佛法慈悲度化迷途之人！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
      toast('闻法空禅语大悟！请研墨亲抄《楞伽经》以度盗经人。', 'talk', '抄经度人'),
      openScene('scene_slq30_11', SHAOLIN_Q30_QUEST_ID),
    ],
  },

  scene_slq30_11: {
    id: 'scene_slq30_11',
    title: '第十一幕 · 焚香净手',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('你在西厢石台旁置起古砚，汲来少室山清泉细细研磨松烟墨。微风吹过，案上檀香袅袅，丝毫不见半点浮躁之气。'),
      N('摊开雪白宣纸，你凝神静气，将七十余重书法功底与八十余重佛学经义融于狼毫笔尖，落笔无声，如春蚕食叶。'),
    ],
    onFinishEffects: [openScene('scene_slq30_12', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_12: {
    id: 'scene_slq30_12',
    title: '第十二幕 · 亲抄楞伽',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    illustrationUrl: '/assets/quests/sl_30_copy_sutra.jpg',
    illustrationCaption: '案头抄经 · 焚香净手亲抄《楞伽经》，以慈悲笔意化解武学戾气',
    mandatory: true,
    beats: [
      N('「一切无涅槃，无有涅槃佛，无有佛涅槃，远离觉所觉……」你一笔一画皆蕴含圆融和平的禅意，既不藏锋炫技，亦无半点凌厉剑意。'),
      N('写至化解「无相劫指」与「伏魔杖法」戾气之关键经文处，你特以朱砂在眉批轻注两行禅语：「执念成魔，杀伐损寿；放下屠刀，经脉自舒。」'),
    ],
    onFinishEffects: [openScene('scene_slq30_13', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_13: {
    id: 'scene_slq30_13',
    title: '第十三幕 · 置卷经橱',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('待墨迹干透，你捧着这卷尚带淡淡墨香的《楞伽经》步上主阁二层，轻轻将其平放在「般若」「禅定」两座经橱之间的案头正中。'),
      P('（对着空荡寂静的经橱轻轻合十）“不管阁中前辈身负何等家国血仇，若愿翻阅此经、化解胸中郁结戾气，少林弟子便算不负佛祖慈悲。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_14', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_14: {
    id: 'scene_slq30_14',
    title: '第十四幕 · 无声回应',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('次日黎明，你再度登阁检视。那卷《楞伽经》依旧端端正正躺在案头，然卷首却多了几处极浅的翻阅折痕，书页边角更有两滴早已干涸的微湿水渍，似是某位盖世强者深夜独读时无声滴落的浊泪。'),
      N('经橱内七十二绝技寂然安卧，昨夜再无半分杀气戾风惊扰藏经阁。'),
    ],
    onFinishEffects: [openScene('scene_slq30_15', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_15: {
    id: 'scene_slq30_15',
    title: '第十五幕 · 归帚庭中',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('你轻步走下藏经阁，回到古银杏扫叶庭。晨雾初散，法空老僧正立于树下，手中扫帚斜倚树干，微笑着望向你。'),
      S('NPC-0101', '（合十赞叹）“阿弥陀佛。小施主方才下楼时的步履，比一月之前轻了三分，却也沉了三分——你心中的『武学障』，已经化开大半了。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_16', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_16: {
    id: 'scene_slq30_16',
    title: '第十六幕 · 帚落无尘',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    illustrationUrl: '/assets/quests/sl_30_empty_broom.jpg',
    illustrationCaption: '帚落无尘 · 扫叶听风终得心境圆明，无招无相自成宗师气象',
    mandatory: true,
    beats: [
      N('你接过青竹扫帚，最后一次轻扫庭中霜叶。这一次，你未动半分内力，却觉周身气机与天地秋风浑然一体，一举一动皆合佛门至理，体内原有诸般武学竟在无声中融会贯通、再无滞碍！'),
      P('（将扫帚轻倚古银杏树干，双目含光）“多谢老禅师一月点化！原来武学练到极处，不在多杀一人，而在能渡己渡人。”'),
    ],
    onFinishEffects: [openScene('scene_slq30_17', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_17: {
    id: 'scene_slq30_17',
    title: '第十七幕 · 法空深许',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      S('NPC-0101', '（眼中闪过一缕极罕见的欣慰光彩）“少林千年古刹，从不缺刚猛无匹的罗汉金刚，唯独难得兼具盖世武才与慈悲胸襟的佛门砥柱。小施主，日后若遇少林百年大劫，切莫忘了今日扫叶听风的这份清明。”'),
      P('（躬身稽首）“晚辈铭记于心，永世不敢相忘！”'),
    ],
    onFinishEffects: [openScene('scene_slq30_18', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_18: {
    id: 'scene_slq30_18',
    title: '第十八幕 · 心境圆明',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('微风拂过千年古银杏，一片金叶缓缓飘落，恰恰停在你掌心之中。你微微一笑，翻掌送叶归尘，只觉心境空明澄澈，距离宗师之境已仅隔一层薄纸！'),
    ],
    onFinishEffects: [openScene('scene_slq30_19', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_19: {
    id: 'scene_slq30_19',
    title: '第十九幕 · 禅意留香',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('法空老僧微微颔首，重新俯身拾起秃竹扫帚，继续不紧不慢地清扫庭院，仿佛方才那番震古烁今的禅机对话只是秋风掠过树梢的一声轻叹。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_pavilion', value: 'compassion' },
      { type: 'giveCombatExp', amount: 680, reason: '慈悲默察 · 扫叶听风' },
      { type: 'addArtExp', amount: 200 },
      { type: 'modifySkill', key: '经义', delta: 2 },
      { type: 'modifySkill', key: '书', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 30 },
      { type: 'completeQuest', questId: SHAOLIN_Q30_QUEST_ID, outcome: 'completed' },
      toast(
        '《慈悲默察 · 扫叶听风》完结！实战经验 +680，武学修为 +200，经义 +2，书法 +1，法空好感 +30！',
        'success',
        '扫叶听风',
      ),
      openScene('scene_slq30_20', SHAOLIN_Q30_QUEST_ID),
    ],
  },

  scene_slq30_20: {
    id: 'scene_slq30_20',
    title: '第二十幕 · 清风出庭',
    subtitle: '嵩山少林寺 · 藏经阁',
    mandatory: true,
    beats: [
      N('你合十辞别古银杏扫叶庭，步出藏经阁朱门。满山秋风迎面而来，你脚步从容、心境圆明——无论前路尚有多少江湖风雨，这一颗慈悲禅心已稳如少室群峰。'),
    ],
  },
}
