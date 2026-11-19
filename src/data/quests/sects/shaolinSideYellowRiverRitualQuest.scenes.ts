import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE15_QUEST_ID } from './shaolinSideYellowRiverRitualQuest'

const SPEAKER_GUIREN: StorySpeakerSpec = {
  kind: 'custom',
  name: '鬼刃',
  title: '西夏一品堂渡口刺客 · 鬼刃',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
}

const SPEAKER_SHALANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '沙狼',
  title: '西夏一品堂渡口刺客 · 沙狼',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_MENGZHOU_GENERAL: StorySpeakerSpec = {
  kind: 'custom',
  name: '杨崇勋部偏将',
  title: '孟州河防巡检使',
  factionName: '大宋边军',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
}

function buildGuiren(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS15_GUIREN',
    name: '鬼刃',
    title: '西夏一品堂渡口刺客 · 鬼刃',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂死士',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    talk: '“大宋败军之魂也配享黄河水陆大醮？今夜便拿你的和尚血，浇熄这一江长明灯！”',
    stats: { hp: 3360, mp: 3120, agi: 76, res: 60 },
    talents: { bone: 80, comprehension: 82, charm: 58 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-077',
      move1: 'MA-133',
      move2: 'MA-131',
      move3: 'MA-137',
    },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-077', level: 9 },
      { artId: 'MA-133', level: 9 },
      { artId: 'MA-131', level: 9 },
      { artId: 'MA-137', level: 8 },
    ],
  })
}

function buildShalang(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS15_SHALANG',
    name: '沙狼',
    title: '西夏一品堂渡口刺客 · 沙狼',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂狼首',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“哈哈哈哈！火油已泼满浮桥，待老子撕碎了你们两个秃驴，叫三川口与好水川的宋狗魂魄永世不得超生！”',
    stats: { hp: 3620, mp: 3380, agi: 74, res: 65 },
    talents: { bone: 88, comprehension: 78, charm: 45 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-139',
      move1: 'MA-073',
      move2: 'MA-092',
      move3: 'MA-125',
    },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-139', level: 8 },
      { artId: 'MA-073', level: 9 },
      { artId: 'MA-092', level: 9 },
      { artId: 'MA-125', level: 9 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls15_01: {
    id: 'scene_sls15_01',
    title: '飞瀑秋声 · 孤忠敕牒',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山霜叶纷飞。飞瀑深潭试炼涧畔，达摩院护法僧慧慈正对着一卷明黄绫面的朝廷公文静静合十，眉宇间既有悲悯，又隐含几分肃杀忧色。'),
      N('见你走近，慧慈连忙起身施礼，将手中公文递来。'),
      S('NPC-0450', '“阿弥陀佛！师兄来得正好。方才礼部与河阳三城节度使署联合颁牒入寺——朝廷定于三日后在孟州黄河古渡设『皇家水陆大法会』，超度历年来在三川口、好水川、定川寨及北疆抗辽拒夏而殉国的大宋将士英灵！”'),
      P('“超度护国忠魂，乃我佛门大慈悲、大功德！慧慈师弟此番奉派主坛，何故眉间带忧？”'),
    ],
    onFinishEffects: [openScene('scene_sls15_02', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_02: {
    id: 'scene_sls15_02',
    title: '暗流北渡 · 诚邀护法',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      S('NPC-0450', '“师兄有所不知！昨夜洛阳分舵与河防斥候同时传回密报：西夏一品堂已遣出一对顶尖死士潜入河南府与孟州交界，扬言要在水陆法会当夜火焚忠魂牌位、血洗渡口法坛，借此动摇我大宋西北军心！”'),
      S('NPC-0450', '“小僧虽通经忏仪轨，武功却仅在二流之境，实恐难以护住万千阵亡将士的灵位。环顾全寺，唯有师兄经义湛深、骑术娴熟，且武功已入一流化境！恳请师兄与小僧一道策马北赴孟州，护持这场黄河水陆法会！”'),
    ],
    choices: [
      {
        id: 'accept_yellow_river_ritual',
        label: '“国士忠魂岂容西夏魔爪亵渎！我随你领幢北赴孟州黄河渡口！”',
        subLabel: '承接支线【黄河水陆 · 孤忠超度】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE15_QUEST_ID, stepId: 'depart_yellow_river' },
          openScene('scene_sls15_03', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'defer_yellow_river_ritual',
        label: '“西夏一品堂顶尖刺客不可小觑，容我备足丹药披挂再行启程。”',
        subLabel: '暂缓接取（可随时再返试炼涧开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side15_start_triggered', value: false },
          toast('你暂且整备行囊丹药，待准备万全后可再返飞瀑深潭试炼涧寻慧慈启程。', 'talk', '黄河水陆'),
        ],
      },
    ],
  },

  scene_sls15_03: {
    id: 'scene_sls15_03',
    title: '整鞍备马 · 赴殿领幢',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      S('NPC-0450', '“阿弥陀佛！有师兄同行，便是西夏一品堂倾巢而出，小僧也无所畏惧！皇家水陆金幢与法会敕牒现供奉在【大雄宝殿方丈院正殿】，咱们速去领妥，便即刻策马北渡！”'),
      P('“好！事不宜迟，这就往大雄宝殿去！”'),
    ],
    onFinishEffects: [
      toast('任务已接取：前往【大雄宝殿方丈院正殿】领受水陆金幢并启程北赴孟州！', 'success', '黄河水陆'),
    ],
  },

  scene_sls15_04: {
    id: 'scene_sls15_04',
    title: '领幢出山 · 疾驰孟州',
    subtitle: '大雄宝殿方丈院正殿 -> 孟州黄河古渡',
    mandatory: true,
    beats: [
      N('你与慧慈于大雄宝殿方丈院正殿礼佛焚香，恭敬接过明黄织金的皇家水陆法幢与礼部敕牒，旋即出山门跨上两匹神骏健马，扬鞭北出邙山古道。'),
      N('一路霜风猎猎、蹄声如雷。你骑术纯熟，带慧慈绕过泥泞官道、穿行邙山捷径，日夜兼程不过两日便遥遥望见那条横贯中原的浊浪大河——黄河！'),
      N('孟州河阳古渡两岸早已肃穆戒严，数十艘铁索相连的艨艟浮桥横跨滔滔浊浪，南岸高筑三层青布素白法坛，坛上密密麻麻供奉着数千块手书大宋阵亡将士姓名的楠木灵牌。'),
    ],
    onFinishEffects: [openScene('scene_sls15_05', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_05: {
    id: 'scene_sls15_05',
    title: '黄河水陆 · 河灯万盏',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    illustrationUrl: '/assets/quests/sl_s15_yellow_river.jpg',
    illustrationCaption: '孟州黄河渡口万盏河灯顺流而下，少林高僧登坛诵经超度抗辽夏忠魂',
    mandatory: true,
    beats: [
      N('暮色四合，孟州河防巡检使率五百披甲边军肃立坛下，两岸赶来祭奠父兄子弟的军属与百姓达数千人，哭声低抑而悲壮。'),
      S(SPEAKER_MENGZHOU_GENERAL, '“二位少林大师辛苦！自庆历年间西北血战以来，多少弟兄尸骨埋于黄沙，连个衣冠冢都未曾落土。今夜有劳二位大师大开水陆法筵，引我大宋忠魂渡河归乡！”'),
      S('NPC-0450', '“将军放心！今夜不论风云如何变幻，法坛梵唱绝不断绝！”'),
      N('随着三声浑厚铜罄敲响，你与慧慈身披素净袈裟登坛主礼，率三十六名随坛僧众同诵《水陆仪轨》与《地藏本愿经》。两岸百姓齐齐点燃万盏莲花河灯放入黄河，刹那间滔滔浊浪化作一条绵延数里的金色星河！'),
    ],
    onFinishEffects: [openScene('scene_sls15_06', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_06: {
    id: 'scene_sls15_06',
    title: '子夜阴风 · 铁索暗响',
    subtitle: '孟州黄河古渡 · 浮桥南端',
    mandatory: true,
    beats: [
      N('子时三刻，法会正至最紧要的「召请孤忠」仪节。寒风陡然加剧，浓云遮月，黄河水面水汽翻腾。'),
      N('你耳廓微动，在洪亮庄严的诵经声与黄河咆哮声中，骤然捕捉到浮桥中段铁索传来一阵极细微的“咯吱”崩响，紧接着一股刺鼻的猛火油腥味顺着北风飘上南岸！'),
      P('“慧慈师弟，稳住法坛梵唱，绝不可停！浮桥上有西夏绝顶杀手潜渡而来，我去截住他们！”'),
      S('NPC-0450', '“师兄小心！若敌手众多，小僧随时持刀助你护坛！”'),
    ],
    onFinishEffects: [openScene('scene_sls15_07', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_07: {
    id: 'scene_sls15_07',
    title: '鬼刃现形 · 浮桥断水',
    subtitle: '孟州黄河古渡 · 铁索浮桥',
    illustrationUrl: '/assets/quests/sl_s15_floating_bridge.jpg',
    illustrationCaption: '黄河浮桥狂风怒浪，少林高徒迎战潜渡袭坛的西夏一品堂一流上品双刺客',
    mandatory: true,
    beats: [
      N('你纵身掠上剧烈摇晃的铁索浮桥，迎面便见两名哨兵已悄无声息倒在船板上。浓雾之中，一道纤细如鬼魅的黑影脚踩铁链倒掠而来，手中双柄西夏弯刀在河灯光影下泛着惨白寒芒！'),
      S(SPEAKER_GUIREN, '“哼，这法坛边竟真守着一条鼻子比猎犬还灵的少林大鱼！我乃西夏一品堂『鬼刃』，奉命今夜将这浮桥连同岸上那几千块死人木牌一并烧成焦炭！”'),
      P('“生前与我大宋将士沙场搏杀犹可言战，死后竟敢潜渡中原焚毁忠魂灵位，西夏一品堂当真卑劣无耻！留下命来！”'),
    ],
    onFinishEffects: [openScene('scene_sls15_08', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_08: {
    id: 'scene_sls15_08',
    title: '浮桥夜战 · 决杀鬼刃',
    subtitle: '孟州黄河古渡 · 铁索浮桥',
    mandatory: true,
    beats: [
      N('脚下浮桥随黄河秋汛巨浪剧烈起伏，鬼刃身法快若闪电，西夏双弯刀夹杂漫天淬毒蒺藜，直扑你咽喉要害！'),
    ],
    choices: [
      {
        id: 'duel_guiren',
        label: '稳踏浮桥铁索，生死决战西夏一品堂刺客「鬼刃」！',
        subLabel: '生死决战 · 一流上品女刺客（战败将身亡）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildGuiren() },
            rule: 'duel',
            lethalOnLose: true,
            duelStakesTag: 'duel',
            forbidEscapeReason: '身后便是三千英烈灵位与万千百姓，绝不可退让半步！',
            introText: '鬼刃脚踏铁索腾空劈下，双弯刀如两道冷月寒光封死浮桥退路！',
            deathTitle: '血染孟州黄河浮桥',
            deathDetail: '你在滔滔黄河浮桥之上力战鬼刃不敌，身中弯刀沉入滚滚浊浪之中。',
            onWin: [openScene('scene_sls15_09', SHAOLIN_SIDE15_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_sls15_09: {
    id: 'scene_sls15_09',
    title: '刀断浪沉 · 沙狼突袭',
    subtitle: '孟州黄河古渡 · 浮桥南端',
    mandatory: true,
    beats: [
      N('浮桥之上刀光掌影交错数十合！你借一记巨浪颠簸之势看破鬼刃双刀回环的刹那空门，硬撼一招震断其右腕弯刀，紧接着雷霆重手印于其胸口！鬼刃惨哼一声，口喷鲜血坠入漆黑翻滚的黄河激流，瞬息间便被浊浪吞没。'),
      N('然而还不等你喘息半口，南岸法坛侧翼忽地腾起一团刺眼火球！一名身披狼皮黑甲、手持巨型修罗战刀的魁梧巨汉竟趁你激战浮桥之际，自浅滩涉水绕后，一脚踢翻两盏引路油灯，狂笑着直扑供奉英烈牌位的主法坛！'),
      S(SPEAKER_SHALANG, '“鬼刃那蠢货果然拖住你了！哈哈哈哈！老子西夏一品堂『沙狼』在此，这三千宋军死鬼的牌位，今夜便由老子亲手劈成柴火！”'),
      S('NPC-0450', '“休得放肆！众僧继续诵经不可中断，待小僧挡住这魔头！”'),
    ],
    onFinishEffects: [openScene('scene_sls15_10', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_10: {
    id: 'scene_sls15_10',
    title: '坛前护忠 · 携慧慈战沙狼',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    mandatory: true,
    beats: [
      N('慧慈纵身跃下法坛，手中戒刀死死架住沙狼劈向英烈牌位的血色狂刀，虎口震裂却寸步不退！你足尖连点浮桥船舷，如大鹏展翅般凌空飞落法坛之前，与慧慈并肩立于三千忠魂牌位之前！'),
      P('“慧慈师弟，我来了！今日便让这西夏恶狼有来无回！”'),
      S(SPEAKER_SHALANG, '“两个秃驴一起上又如何？老子一刀劈碎你们的禅骨！”'),
    ],
    choices: [
      {
        id: 'duel_shalang_with_huici',
        label: '与慧慈并肩死守法坛，决杀一流上品西夏狼首「沙狼」！',
        subLabel: '生死决战 · 携慧慈助战一流上品沙狼（战败将身亡）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShalang() },
            allies: [{ kind: 'npc', npcId: 'NPC-0450' }],
            rule: 'duel',
            lethalOnLose: true,
            duelStakesTag: 'duel',
            forbidEscapeReason: '身畔即是三千抗辽夏英烈灵位，誓死护坛，绝不后退！',
            introText: '沙狼狂啸挥刀，西夏秘藏玄功与修罗狂刀卷起漫天沙火，直扑法坛！',
            deathTitle: '殉身黄河水陆法坛',
            deathDetail: '你与慧慈死战西夏一品堂狼首沙狼不敌，倒在三千大宋英烈灵位之前。',
            onWin: [openScene('scene_sls15_11', SHAOLIN_SIDE15_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_sls15_11: {
    id: 'scene_sls15_11',
    title: '诛魔坛前 · 梵唱不绝',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    mandatory: true,
    beats: [
      N('慧慈以慈悲刀法封死沙狼下盘闪避之路，你则将毕生少林绝学催发至巅峰，硬生生接下沙狼孤注一掷的修罗劈空斩，反手震碎其护体玄罡，一击贯胸！'),
      S(SPEAKER_SHALANG, '“呃……好刚猛的……少林神功……没想到……中原和尚……竟比边军还要硬气……”'),
      N('沙狼轰然跪倒在青石坛阶之下，手中修罗巨刀当啷落地，气绝身亡。而就在这血火交锋的整整半个时辰里，法坛之上三十六名僧众的诵经梵唱竟未曾停顿过哪怕一个字！'),
      N('孟州河防巡检使急率重甲边军赶来清扫余烬，见坛上三千英烈灵位纤尘不染、西夏一品堂两大凶魔俱已伏诛，这位身经百战的沙场悍将竟当场热泪盈眶，率五百甲士向你与慧慈单膝跪地致敬！'),
    ],
    onFinishEffects: [openScene('scene_sls15_12', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_12: {
    id: 'scene_sls15_12',
    title: '晓雾初开 · 三军感泣',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    mandatory: true,
    beats: [
      N('你与慧慈拭去衣袖血迹，重新整肃袈裟登坛主礼，继续引领众僧诵经回向，直至东方鱼肚白升起、黄河晨雾散尽，水陆法会最后一卷《回向偈》方才圆满落音。'),
      S(SPEAKER_MENGZHOU_GENERAL, '“大宋边军与两岸父老，永铭嵩山少林今夜护忠魂之大恩！待末将具表上奏朝廷，定叫天下人都知晓二位大师的忠义肝胆！”'),
      N('晨风拂过黄河水面，两岸数千百姓与军士齐声合十送行，哭声已化作沉静而坚毅的肃穆。三千忠魂，终得安息。'),
    ],
    onFinishEffects: [openScene('scene_sls15_13', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_13: {
    id: 'scene_sls15_13',
    title: '策马南归 · 遥望嵩岳',
    subtitle: '孟州古道 -> 嵩山少林寺',
    mandatory: true,
    beats: [
      N('收妥皇家水陆金幢后，你与慧慈婉拒了孟州官府的盛筵酬谢，依旧跨上战马，迎着深秋朝阳南归嵩山。'),
      S('NPC-0450', '“阿弥陀佛……昨夜若非师兄于浮桥独斩鬼刃、又于坛前力诛沙狼，小僧纵使粉身碎骨也护不住那些将士的灵位。此番回寺，请师兄随小僧回【飞瀑深潭 · 试炼涧】一同焚香回向，也算为这一程画个圆满句号！”'),
      P('“好，咱们这便回试炼涧。”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE15_QUEST_ID, 'return_damo_west'),
      toast('黄河水陆法会圆满护持！请返回【飞瀑深潭 · 试炼涧】与慧慈焚香回向。', 'success', '黄河水陆'),
    ],
  },

  scene_sls15_14: {
    id: 'scene_sls15_14',
    title: '飞瀑洗尘 · 焚香回向',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('重返少室山飞瀑深潭试炼涧，涧水轰鸣如昔，却似比行前更多了几分苍凉澄澈。你与慧慈在潭畔青石上燃起三炷清香，面向北方黄河的方向静静合十默祷。'),
      S('NPC-0450', '“愿以此功德，庄严佛净土；上报四重恩，下济三途苦。孟州渡口三千孤忠，从此山河无恙，英灵永安。”'),
      P('“山河无恙，英灵永安。”'),
    ],
    onFinishEffects: [openScene('scene_sls15_15', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_15: {
    id: 'scene_sls15_15',
    title: '经鞍俱进 · 佛门脊梁',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('此行千里驰驱、夜战浮桥、通宵诵经，不仅令你对佛门经义中“无缘大慈、同体大悲”的真谛有了切肤体悟，连日夜兼程的鞍马驰骋亦令你骑术更臻纯熟。'),
      S('NPC-0450', '“方丈与达摩院诸位师叔已得孟州八百里捷报，对师兄今夜浮桥诛邪、梵唱不绝的壮举赞不绝口，特记头等门派功绩！能与师兄同门共行此一遭，实乃小僧平生之幸！”'),
    ],
    onFinishEffects: [openScene('scene_sls15_16', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_16: {
    id: 'scene_sls15_16',
    title: '孤忠永慰 · 浩气长存',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('香烟袅袅升入少室山湛蓝的秋空，与漫天飞瀑水雾融为一体。江湖与军中皆在传颂嵩山少林护持黄河水陆法会、夜斩西夏一品堂双凶的壮举，你的侠名与佛门威望自此如日中天。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 800, reason: '孟州黄河浮桥夜斩西夏一品堂双刺客' },
      { type: 'addSectContribution', amount: 280 },
      { type: 'modifyRenown', delta: 100, reason: '黄河水陆法会护忠魂 · 三军感泣' },
      { type: 'modifyChivalry', delta: 60, reason: '超度抗辽夏英烈 · 浮桥诛邪' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifySkill', key: '骑术', delta: 1 },
      { type: 'completeQuest', questId: SHAOLIN_SIDE15_QUEST_ID, outcome: 'completed' },
      toast(
        '【黄河水陆 · 孤忠超度】圆满完成！实战经验 +800，门派贡献 +280，声望 +100，侠义 +60，经义 +1，骑术 +1！',
        'success',
        '黄河水陆',
      ),
    ],
  },
}
