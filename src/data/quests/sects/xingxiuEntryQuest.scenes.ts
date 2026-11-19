import type { NodeNpc } from '../../../types/game'
import type { DynamicQuestNpc, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { XINGXIU_ENTRY_QUEST_ID, ACTOR_CHUCHENZI_KUNLUN_ID } from './xingxiuEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_HU_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '西域药贩',
  title: '塞上落单胡商',
  factionName: '过路商旅',
  portraitUrl: '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg',
}

const SPEAKER_POISON_SLAVE: StorySpeakerSpec = {
  kind: 'custom',
  name: '试药奴隶',
  title: '星宿丹炉药奴',
  factionName: '苦役',
  portraitUrl: '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg',
}

const SPEAKER_WU_CHENGSHAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '乌承山',
  title: '星宿派外门恶师兄',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_ZHAO_QINGFENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵清风',
  title: '关中正道游侠',
  factionName: '关中侠义盟',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_DRUM_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '星宿吹鼓弟子',
  title: '丝竹仪仗门徒',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildWuChengshanNpc(poisoned: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_XX_WU_CHENGSHAN',
    name: '乌承山',
    title: '星宿派 · 外门恶师兄',
    realm: '不入流',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“好个阴险小贼，今日老子撕了你的皮！”',
    stats: {
      hp: poisoned ? 195 : 245,
      mp: 95,
      agi: poisoned ? 12 : 15,
      res: poisoned ? 7 : 9,
    },
    talents: { bone: 42, comprehension: 35, charm: 25 },
    equippedArts: { neigong: 'MA-231', qinggong: 'MA-218', move1: 'MA-196', move2: 'MA-201' },
    learnedArts: [
      { artId: 'MA-231', level: 1 },
      { artId: 'MA-218', level: 1 },
      { artId: 'MA-196', level: 1 },
      { artId: 'MA-201', level: 1 },
    ],
  })
}

function buildZhaoQingfengNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_XX_ZHAO_QINGFENG',
    name: '赵清风',
    title: '关中正道游侠（中了迷烟）',
    realm: '三流下品',
    factionId: 'SECT-00',
    factionName: '关中侠士',
    sectRank: 0,
    sectRankLabel: '正道游侠',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“无耻小人！年纪轻轻为何甘为丁春秋鹰犬、行此下作勾当！”',
    stats: { hp: 230, mp: 100, agi: 14, res: 9 },
    talents: { bone: 48, comprehension: 45, charm: 50 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-218', move1: 'MA-184', move2: 'MA-188' },
    learnedArts: [
      { artId: 'MA-229', level: 2 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-184', level: 2 },
      { artId: 'MA-188', level: 1 },
    ],
  })
}

export const DYNAMIC_NPCS: DynamicQuestNpc[] = [
  {
    actorId: ACTOR_CHUCHENZI_KUNLUN_ID,
    questId: XINGXIU_ENTRY_QUEST_ID,
    regionId: 'kunlun',
    buildingId: 'kl_poison',
    spotId: 'kl_ps_pavilion',
    name: '出尘子',
    title: '星宿派 · 四师兄（昆仑毒庐司事）',
    realm: '二流上品',
    factionId: 'SECT-19',
    factionName: '星宿派',
    sectRank: 4,
    sectRankLabel: '四师兄',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“星宿老仙法力无边！新来的，有孝敬尽管拿来！”',
    stats: { hp: 1680, mp: 980, agi: 42, res: 36, isBenchmark: false },
    talents: { bone: 64, comprehension: 68, charm: 42 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-197',
      move1: 'MA-137',
      move2: 'MA-127',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-231', level: 3, exp: 0 },
      { artId: 'MA-197', level: 2, exp: 0 },
      { artId: 'MA-137', level: 2, exp: 0 },
      { artId: 'MA-127', level: 2, exp: 0 },
    ],
  },
]

export const SCENES: Record<string, StorySceneDef> = {
  // 第 1 幕：延安黑市递刀（不落井下石即永久无缘星宿派）
  scene_xx_01_black_market_betrayal: {
    id: 'scene_xx_01_black_market_betrayal',
    title: '第一幕 · 黑市递刀',
    subtitle: '延安府 · 塞上番马黑市',
    mandatory: true,
    beats: [
      N('{reignYear}的延安府塞外番马黑市，暮色里飘着一股甜腻刺鼻的紫烟。'),
      N('西夏药摊前，一名矮胖道人正带着几个蓝袍汉子逼索西域毒草，那落单胡商抱着皮囊死命往人堆外冲，恰巧撞到你身前。'),
      S(SPEAKER_HU_MERCHANT, '“{gender:公子,姑娘}救命！这群星宿派妖人强抢药草，还要拿活人试毒——求你让开一条生路！”'),
      S('NPC-0262', '（冷笑眯眼）“小娃娃，看清些再站队。拦下这胡商把毒草献上来，我星宿老仙的毒功有你一份；若敢放人，滚出黑市便是！”'),
    ],
    choices: [
      {
        id: 'xx01_betray_merchant',
        label: '一脚绊倒胡商，抢过毒草皮囊双手奉给出尘子',
        subLabel: '【投靠邪宗】落井下石，换取拜入星宿派的门路',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: XINGXIU_ENTRY_QUEST_ID },
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'seek_chuchenzi_yanan' },
          toast('你一脚踩住胡商手腕夺下毒草献上，出尘子阴恻恻地笑了起来！', 'talk', '黑市递刀'),
          openScene('scene_xx_02_swallow_pill_chant', XINGXIU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'xx01_refuse_leave',
        label: '冷眼侧身放胡商逃走，转身离开黑市',
        subLabel: '【绝不助恶】道不同不相为谋（将永久无缘拜入星宿派）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'xx_permanently_rejected', value: true },
          toast('你侧身让开去路，不愿与星宿妖人为伍；出尘子冷哼一声，此生再无缘星宿派。', 'warn', '永绝星宿'),
        ],
      },
    ],
  },

  // 第 2 幕：吞丸入彀 · 学唱星宿颂
  scene_xx_02_swallow_pill_chant: {
    id: 'scene_xx_02_swallow_pill_chant',
    title: '第二幕 · 吞丸颂仙',
    subtitle: '延安府 · 车马行栈',
    mandatory: true,
    beats: [
      N('出尘子掂了掂装满乌头紫草的皮囊，从袖中倒出一粒暗红药丸弹进你掌心。'),
      S('NPC-0262', '“想学老仙神功？光会递刀还不够。这颗『三日腐心丸』吞下去，三日不服解药便五脏溃烂。另外，进我星宿门墙，先学句像样的颂词！”'),
      N('四周星宿吹鼓弟子立刻敲起铜锣、吹响唢呐，齐刷刷盯着你的嘴。'),
    ],
    choices: [
      {
        id: 'xx02_chant_loudly',
        label: '仰头吞下毒丸，高声谄笑：“星宿老仙，法驾中原，神通广大，法力无边！”',
        tone: 'gold',
        effects: [
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'report_herb_pavilion' },
          { type: 'teleportPlayer', regionId: 'kunlun', buildingId: 'kl_poison', spotId: 'kl_ps_marsh' },
          openScene('scene_xx_03_kunlun_poison_spring', XINGXIU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'xx02_swallow_silent',
        label: '吞下毒丸却冷脸闭口不唱',
        tone: 'default',
        effects: [
          { type: 'modifyRenown', delta: -10, reason: '不肯颂仙遭出尘子抽鞭' },
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'report_herb_pavilion' },
          { type: 'teleportPlayer', regionId: 'kunlun', buildingId: 'kl_poison', spotId: 'kl_ps_marsh' },
          toast('出尘子一拂尘抽在你肩头逼你唱完三遍，才准你随驼队西行！（气血 -15）', 'warn', '邪宗立威'),
          openScene('scene_xx_03_kunlun_poison_spring', XINGXIU_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 3 幕：初临毒泉 · 丝竹颂仙
  scene_xx_03_kunlun_poison_spring: {
    id: 'scene_xx_03_kunlun_poison_spring',
    title: '第三幕 · 毒泉死规',
    subtitle: '昆仑山 · 星宿海毒泉外脉',
    mandatory: true,
    beats: [
      N('押药驼队日夜兼程西入昆仑。谷口五彩毒瘴翻滚，十余名弟子披紫挂绿、丝竹唢呐吹得震天响。'),
      N('大师兄摘星子立在毒泉石坪上，抬脚便将一名偷懒歇脚的杂役踹进沸腾紫沼——眨眼间白骨浮沉，连惨叫都没传出两声。'),
      S('NPC-0181', '“听清楚了！星宿海只留有用之狼，不留废柴！滚去百草炼毒庐试药，活下来才配喘气！”'),
    ],
    choices: [
      {
        id: 'xx03_go_pavilion',
        label: '抱拳高喝“大师兄神威盖世”，快步赶往星宿百草炼毒庐',
        tone: 'jade',
        effects: [
          toast('请前往【星宿百草炼毒庐】在丹炉前强纳毒气试药！', 'talk', '昆仑试药'),
        ],
      },
    ],
  },

  // 第 4 幕：丹炉活人 · 毒气冲脉（配 CG: xingxiu_poison_furnace.jpg）
  scene_xx_04_poison_furnace: {
    id: 'scene_xx_04_poison_furnace',
    title: '第四幕 · 活人丹炉',
    subtitle: '星宿百草炼毒庐',
    illustrationUrl: '/assets/quests/xingxiu_poison_furnace.jpg',
    mandatory: true,
    beats: [
      N('炼毒庐内热浪滚滚，大鼎下正冒着紫黑毒烟。你身旁那名试药奴隶吸了两口炉烟，忽然七窍流血瘫倒在地，伸手死死抓住你的裤脚。'),
      S(SPEAKER_POISON_SLAVE, '“救……救我……我怀里还有半块压毒玉……”'),
      N('炉火骤然暴涨，紫烟迎面扑来！你非但没伸手拉他，反而一脚踩开他的手指，顺势将他怀里那半块玉佩扯入囊中，咬牙按星宿行气法门将毒烟逆引入脉！'),
      N('一阵撕裂经脉的剧痛过后，毒气竟在丹田化作一缕阴寒内息——你破零习得了星宿入门内功！'),
    ],
    choices: [
      {
        id: 'xx04_loot_and_leave',
        label: '冷眼跨过药奴尸身，收好玉佩与碎银前往寒石窟',
        tone: 'danger',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-231', level: 1, exp: 500, autoEquip: true },
          { type: 'giveSilver', amount: 15, reason: '丹炉药奴摸尸' },
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'gather_ice_dew' },
          toast('逆引丹炉毒气破零习得《星宿腐毒行气诀》，顺手摸得银两 15 两！', 'success', '毒气冲脉'),
        ],
      },
    ],
  },

  // 第 5 幕：寒窟夺虫 · 借刀杀人（配 CG: xingxiu_ice_cave_bandage.jpg）
  scene_xx_05_ice_cave_trap: {
    id: 'scene_xx_05_ice_cave_trap',
    title: '第五幕 · 寒窟借刀',
    subtitle: '雪山冰蚕寒石窟',
    illustrationUrl: '/assets/quests/xingxiu_ice_cave_bandage.jpg',
    mandatory: true,
    beats: [
      N('冰蚕寒石窟内寒气刺骨，岩壁上爬满雪白毒蚕。外门恶师兄乌承山早已带了两个眼线埋伏在暗处，冷笑着封住洞口。'),
      S(SPEAKER_WU_CHENGSHAN, '“新来的，把寒露交出来，留你一具全尸！”'),
      N('你瞥见洞顶冰蚕正对腥甜引虫粉极度敏感，假意惊惶后退，暗中将袖底引虫粉弹到身旁那名眼线衣领上，顺势将他猛推向乌承山！'),
      N('那眼线惨叫着撞入乌承山怀中，冰蚕受粉激怒蜂拥扑落！乌承山猝不及防连拍两掌把眼线震毙，自己也被冰蚕啃噬得毒疮溃烂、狼狈遁出石窟！'),
    ],
    choices: [
      {
        id: 'xx05_loot_pouch',
        label: '上前摸尸搜走毒囊与冰蚕寒露，回去贿赂四师兄出尘子',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'xx_poisoned_wu', value: true },
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'bribe_and_duel_marsh' },
          toast('借刀除掉眼线并令乌承山身中蚕毒！速回【星宿百草炼毒庐】贿赂出尘子换招！', 'success', '借刀杀人'),
        ],
      },
    ],
  },

  // 第 6 幕：毒囊贿师 · 换取暗器
  scene_xx_06_bribe_chuchenzi: {
    id: 'scene_xx_06_bribe_chuchenzi',
    title: '第六幕 · 贿师换招',
    subtitle: '星宿百草炼毒庐',
    mandatory: true,
    beats: [
      N('你捧着从死人身上摸来的毒囊与三瓶冰蚕寒露走进偏房，开口便是“四师兄神机妙算、师弟全赖师兄庇佑”，顺手把黑锅全扣到那名死去眼线头上。'),
      S('NPC-0262', '（把寒露揣进怀里，笑得眼缝都没了）“算你小子识趣！乌承山那蠢货在毒泉沼等你呢。拿去，这手《毒蒺藜散手》专打阴招——记住，我星宿派打架，能下毒暗算绝不硬拼！”'),
    ],
    choices: [
      {
        id: 'xx06_learn_dart',
        label: '磕头谢赏，接过毒蒺藜赶赴紫雾五彩毒泉沼',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-137', level: 1, exp: 350, autoEquip: true },
          { type: 'setFlag', flag: 'xx_learned_dart', value: true },
          toast('已习得《毒蒺藜散手》！速赴【紫雾五彩毒泉沼】踩死乌承山！', 'success', '毒招到手'),
        ],
      },
    ],
  },

  // 第 7 幕：毒沼搏杀 · 踩尸上位
  scene_xx_07_marsh_duel: {
    id: 'scene_xx_07_marsh_duel',
    title: '第七幕 · 毒沼踩尸',
    subtitle: '紫雾五彩毒泉沼',
    mandatory: true,
    beats: [
      N('紫雾翻涌的毒泉石坪上，手腕红肿流脓的乌承山正咬牙切齿等着你。'),
      S(SPEAKER_WU_CHENGSHAN, '“好个阴险小贼，今日老子撕了你的皮！”'),
      N('四周吹鼓手早已列阵敲起战鼓。在星宿海，踩着师兄的尸骨往上爬，才是天经地义的规矩！'),
    ],
    choices: [
      {
        id: 'xx07_fight_wu',
        label: '冷笑出手，先甩出一把毒蒺藜再扑上死斗！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildWuChengshanNpc(true) },
            rule: 'duel',
            forbidEscapeReason: '星宿毒沼死斗，不死不休！',
            onWin: [openScene('scene_xx_08_blood_edict', XINGXIU_ENTRY_QUEST_ID)],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_xx_07_marsh_duel_lose',
                  title: '险死毒沼 · 爬起再战',
                  beats: [
                    S('NPC-0262', '“没用的东西！吞了这半粒续命丹再去撕了他，敢退半步老子先把你喂蛇！”'),
                  ],
                  choices: [
                    {
                      id: 'xx07_retry',
                      label: '咽下丹药，抹净嘴角血迹重返毒沼',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                XINGXIU_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 8 幕：投名血契 · 寻猎正道
  scene_xx_08_blood_edict: {
    id: 'scene_xx_08_blood_edict',
    title: '第八幕 · 血令投名',
    subtitle: '紫雾五彩毒泉沼',
    mandatory: true,
    beats: [
      N('你一脚踩碎乌承山咽喉，将其尸身踢进紫雾毒沼，尸骨片刻化尽。四周丝竹声骤然拔高，众弟子齐声叫好！'),
      N('大师兄摘星子拍手走来，神色却倏地一冷，朝你丢出一块染血铁牌。'),
      S('NPC-0181', '“窝里斗赢了算什么本事？丁老仙东出延安，最恨那些满口仁义道德的关中正派走狗！听说有个叫赵清风的关中侠士正在延安黑市外围查探我派行踪——滚回去，提他的人头来见老仙！杀不掉正道，你就不配穿星宿紫衣！”'),
    ],
    choices: [
      {
        id: 'xx08_take_blood_edict',
        label: '接过血令乘驼队返抵延安，誓取赵清风性命',
        tone: 'danger',
        effects: [
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'hunt_orthodox_yanan' },
          { type: 'teleportPlayer', regionId: 'yanan', buildingId: 'ya_blackmkt', spotId: 'ya_blackmkt_west' },
          toast('已返抵延安府【车马行栈 · 镖局坪】，请寻踪下药诱杀正道侠士赵清风！', 'warn', '血令追杀'),
        ],
      },
    ],
  },

  // 第 9 幕：暗桩寻踪 · 设伏诱杀
  scene_xx_09_ambush_orthodox: {
    id: 'scene_xx_09_ambush_orthodox',
    title: '第九幕 · 设伏下药',
    subtitle: '延安府 · 塞上番马黑市外围',
    mandatory: true,
    beats: [
      N('你在黑市外围暗巷守了半个时辰，果然见一名背负长剑、神色正气的关中侠士正在向路人打听紫衣妖人的下落——正是关中游侠赵清风！'),
      N('你假作腹痛呕血倒在墙角求救。赵清风果真是个心软的正派君子，连忙上前扶你起来，接过你递去“谢恩”的水囊喝了一口。'),
      S(SPEAKER_ZHAO_QINGFENG, '（脸色骤变，单膝跪地拔剑撑住身躯）“这位{gender:小兄弟,姑娘}，这水怎么一股……苦杏味……你……你下毒？！”'),
    ],
    choices: [
      {
        id: 'xx09_drop_disguise',
        label: '撕下伪装冷笑拔刃：“怪只怪你多管闲事，借你人头一用！”',
        tone: 'danger',
        effects: [openScene('scene_xx_10_kill_orthodox', XINGXIU_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 10 幕：卑鄙偷袭 · 格杀正道
  scene_xx_10_kill_orthodox: {
    id: 'scene_xx_10_kill_orthodox',
    title: '第十幕 · 截杀正道',
    subtitle: '延安府 · 暗巷死斗',
    mandatory: true,
    beats: [
      S(SPEAKER_ZHAO_QINGFENG, '“无耻小人！年纪轻轻为何甘为丁春秋鹰犬、行此下作勾当！”'),
      N('赵清风强忍毒发，咬牙挥剑格挡。毒雾封喉，今日不是你死，便是他亡！'),
    ],
    choices: [
      {
        id: 'xx10_kill_zhao',
        label: '运使毒功毒蒺藜，彻底结果这名正道侠士！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            opponent: { kind: 'custom', npc: buildZhaoQingfengNpc() },
            rule: 'duel',
            forbidEscapeReason: '星宿投名血契，不杀正道绝无退路！',
            onWin: [openScene('scene_xx_11_sever_head', XINGXIU_ENTRY_QUEST_ID)],
            onLose: [
              openScene(
                regScene({
                  id: 'scene_xx_10_kill_orthodox_lose',
                  title: '暗巷脱身 · 重整再袭',
                  beats: [
                    N('赵清风临死反扑颇为凌厉，你被剑风逼退数步。趁夜色暂避调息片刻，他体内奇毒只会越发深入！'),
                  ],
                  choices: [
                    {
                      id: 'xx10_retry',
                      label: '调息回气，再度摸回暗巷下手',
                      tone: 'default',
                      effects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
                    },
                  ],
                }),
                XINGXIU_ENTRY_QUEST_ID,
              ),
            ],
          },
        ],
      },
    ],
  },

  // 第 11 幕：割首验明 · 彻底黑化
  scene_xx_11_sever_head: {
    id: 'scene_xx_11_sever_head',
    title: '第十一幕 · 割首封盒',
    subtitle: '延安府 · 暗巷',
    mandatory: true,
    beats: [
      N('最后一记毒掌正中赵清风心口，他不甘地圆睁双眼倒在血泊之中。'),
      N('你面无表情地蹲下身，抽出他的长剑斩下首级，连同他怀里的关中侠义腰牌与四十两盘缠一并搜出，用生石灰厚厚裹进木盒之中。'),
      N('袖口血迹未干，但你心知肚明——自这一刻起，正道江湖再无你的容身之处。步入【番坊正市 · 奇货堂】，面见星宿老仙吧！'),
    ],
    choices: [
      {
        id: 'xx11_carry_head_box',
        label: '拎起血盒抹净手掌，昂首走入番坊奇货堂',
        tone: 'danger',
        effects: [
          { type: 'giveSilver', amount: 40, reason: '截杀正道侠士搜刮盘缠' },
          { type: 'setQuestStep', questId: XINGXIU_ENTRY_QUEST_ID, stepId: 'audience_ding_chunqiu' },
          toast('已取正道侠士首级与腰牌，请前往【番坊正市 · 奇货堂】面见丁春秋！', 'warn', '投名状成'),
        ],
      },
    ],
  },

  // 第 12 幕：重返番坊 · 抢功反制
  scene_xx_12_return_snatch_credit: {
    id: 'scene_xx_12_return_snatch_credit',
    title: '第十二幕 · 献首抢功',
    subtitle: '延安府 · 番坊正市奇货堂',
    mandatory: true,
    beats: [
      N('奇货堂内早已摆开高台。你刚捧着石灰木盒步入堂中，大师兄摘星子便迎上来伸手欲接。'),
      S('NPC-0181', '“做得不错，这颗人头由师兄代你呈给老仙——”'),
      N('你早已摸透星宿门人争功踩人的德行，脚下一错避开他的手，高举木盒面向高台放声大喝：“弟子仰慕星宿老仙威德，亲手格杀关中正道走狗赵清风，特献首级于老仙驾前！星宿老仙，千秋万载，一统江湖！”'),
      N('摘星子脸色一青，却在老仙目光下不敢当众发作。'),
    ],
    choices: [
      {
        id: 'xx12_kneel_dais',
        label: '捧盒跪行至高台之前，恭迎星宿老仙法驾',
        tone: 'gold',
        effects: [openScene('scene_xx_13_ding_chunqiu_audience', XINGXIU_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 13 幕：老仙驾临 · 丝竹颂词（配 CG: xingxiu_ding_chunqiu_audience.jpg）
  scene_xx_13_ding_chunqiu_audience: {
    id: 'scene_xx_13_ding_chunqiu_audience',
    title: '第十三幕 · 老仙升座',
    subtitle: '番坊正市奇货堂',
    illustrationUrl: '/assets/quests/xingxiu_ding_chunqiu_audience.jpg',
    mandatory: true,
    beats: [
      N('堂中丝竹管弦齐鸣，八名紫衣弟子抬着软榻步上高台。榻上老者白须飘飘、面色红润如婴孩，手摇鹅毛羽扇，正是令天下正道闻风丧胆的星宿老怪——丁春秋！'),
      S(SPEAKER_DRUM_DISCIPLE, '“星宿老仙，法力无边！神通广大，法驾中原！”'),
      S('NPC-0122', '（羽扇轻挥，目光如毒蛇般锁住木盒里血淋淋的人头）“唔……石灰封得还算利落，果然断了正道根基。不过嘛，老夫还得问你一句。”'),
    ],
    choices: [
      {
        id: 'xx13_listen_question',
        label: '低头敛息，恭听星宿老仙问心',
        tone: 'default',
        effects: [openScene('scene_xx_14_ding_interrogation', XINGXIU_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 14 幕：老怪问心（四选一零提示，答错即死/永绝山门）
  scene_xx_14_ding_interrogation: {
    id: 'scene_xx_14_ding_interrogation',
    title: '第十四幕 · 老怪问心',
    subtitle: '番坊正市奇货堂',
    mandatory: true,
    beats: [
      N('丁春秋慢悠悠摇着羽扇，满堂丝竹骤停，针落可闻。'),
      S('NPC-0122', '“你既杀了个所谓正道侠士来投我星宿，说说看——若他日你大师兄摘星子叫你替他去死，或者有人出双倍价钱买你背叛本门，你待如何？”'),
    ],
    choices: [
      {
        id: 'xx14_wrong_righteous',
        label: '“一人做事一人当，弟子既入星宿，绝不连累同门师兄。”',
        tone: 'default',
        effects: [openScene('scene_xx_14_fail_expelled', XINGXIU_ENTRY_QUEST_ID)],
      },
      {
        id: 'xx14_wrong_zhaixingzi',
        label: '“大师兄德高望重，弟子甘为大师兄赴汤蹈火、万死不辞！”',
        tone: 'default',
        effects: [openScene('scene_xx_14_fail_expelled', XINGXIU_ENTRY_QUEST_ID)],
      },
      {
        id: 'xx14_wrong_greedy',
        label: '“江湖买卖讲究价高者得，谁给的解药与银两多，弟子便替谁办事。”',
        tone: 'default',
        effects: [openScene('scene_xx_14_fail_expelled', XINGXIU_ENTRY_QUEST_ID)],
      },
      {
        id: 'xx14_right_cult',
        label: '“弟子只认老仙一人！摘星子若敢叫我去死，我先送他见阎王；外人收买？拿了他的钱，再提他的头献给老仙！”',
        tone: 'default',
        effects: [openScene('scene_xx_15_bestow_poison_art', XINGXIU_ENTRY_QUEST_ID)],
      },
    ],
  },

  // 第 14 幕失败分支：问心答错，永绝星宿山门
  scene_xx_14_fail_expelled: {
    id: 'scene_xx_14_fail_expelled',
    title: '震碎心脉 · 逐出黑市',
    subtitle: '番坊正市奇货堂',
    mandatory: true,
    beats: [
      N('丁春秋嘴角笑容骤冷，羽扇轻轻一挥，一股阴寒毒掌隔空印在你胸口！'),
      S('NPC-0122', '“哼，好个愚蠢透顶的蠢材！这等心思也配穿我星宿紫衣？给老夫拖出去扔在荒郊喂狼，此生莫再踏入星宿半步！”'),
      N('你口吐黑血被众弟子乱棍轰出番坊——星宿派门墙已彻底对你封闭。'),
    ],
    choices: [
      {
        id: 'xx14_expelled_confirm',
        label: '捂胸吐血爬离延安黑市',
        tone: 'danger',
        effects: [
          { type: 'modifyRenown', delta: -30, reason: '问心答错遭丁春秋逐出' },
          { type: 'setFlag', flag: 'xx_permanently_rejected', value: true },
          { type: 'abandonQuest', questId: XINGXIU_ENTRY_QUEST_ID },
          toast('你答错了星宿老仙的问心，被轰出番坊且永不再录用！', 'warn', '永绝星宿'),
        ],
      },
    ],
  },

  // 第 15 幕：赐药授毒 · 紫衣加身
  scene_xx_15_bestow_poison_art: {
    id: 'scene_xx_15_bestow_poison_art',
    title: '第十五幕 · 赐药授毒',
    subtitle: '番坊正市奇货堂',
    mandatory: true,
    beats: [
      S('NPC-0122', '“哈哈哈哈！好！够毒、够滑、够忠！比摘星子那蠢货机灵多了！”'),
      N('丁春秋抚须大笑，弹指赐下一粒碧绿解药。'),
      S('NPC-0122', '“先把腐心散解了罢——不过老夫丑话说在前头，毒根早已化入你血脉，日后每月须回门领一粒『逍遥散』续命。这门《五毒砂掌》拿去练熟了，日后多替老夫杀几个名门正派的伪君子！”'),
    ],
    choices: [
      {
        id: 'xx15_accept_poison_manual',
        label: '叩首接过解药与《五毒砂掌》秘籍',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-127', level: 1, exp: 400, autoEquip: true },
          openScene('scene_xx_16_purple_robe_oath', XINGXIU_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  // 第 16 幕：恶名初扬 · 拜入星宿
  scene_xx_16_purple_robe_oath: {
    id: 'scene_xx_16_purple_robe_oath',
    title: '第十六幕 · 紫衣入邪',
    subtitle: '番坊正市奇货堂',
    mandatory: true,
    beats: [
      N('你起身披上那件绣着星宿暗纹的紫衣，堂下锣鼓丝竹再次震天响起，众弟子无论心中如何嫉恨，脸上都挤出谄媚笑容齐声高喊。'),
      S(SPEAKER_DRUM_DISCIPLE, '“恭贺新师{gender:兄|姐}荣登紫衣！星宿老仙，法驾中原，神通广大，法力无边！”'),
      N('那名敲锣的星宿门人快步凑上前，弓腰谄笑着从怀中摸出一卷绘满冰川罡风暗道与星宿海毒泉标记的羊皮舆图，双手奉上。'),
      S(SPEAKER_DRUM_DISCIPLE, '“师{gender:兄|姐}既已正式入我门墙，往后每月须回昆仑星宿海总舵领药听差。这卷《万山之祖昆仑雪域舆图》乃本门引路密图，您贴身收好，日后不必再候驼队，凭此图便可径直穿行雪线直抵总舵！”'),
      N('你收下雪域舆图，摸了摸袖口尚未洗净的血渍，望向窗外滚滚黄沙。从此正道唾弃、恶名初扬——你已正式踏入星宿邪宗，在这弱肉强食的江湖里只管凭毒功与狠辣向上爬去！'),
    ],
    choices: [
      {
        id: 'xx16_join_xingxiu',
        label: '收下昆仑雪域舆图，正式拜入星宿派（SECT-19）',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ITM-MSC-022', qty: 1 },
          { type: 'joinSect', sectId: 'SECT-19', rank: 1 },
          { type: 'removeDynamicActor', actorId: ACTOR_CHUCHENZI_KUNLUN_ID },
          { type: 'completeQuest', questId: XINGXIU_ENTRY_QUEST_ID },
          toast(
            '已拜入【星宿派】成为外门弟子！习得《五毒砂掌》《毒蒺藜散手》《星宿腐毒行气诀》，并获星宿门人赠予《万山之祖昆仑雪域舆图》（大地图已解锁【昆仑山】）！',
            'success',
            '拜入星宿',
          ),
        ],
      },
    ],
  },
}

Object.assign(SCENES, EXTRA_SCENES)
