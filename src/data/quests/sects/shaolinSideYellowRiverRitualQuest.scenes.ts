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
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-133', level: 9 },
      { artId: 'MA-131', level: 9 },
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
    equippedArts: { neigong: 'MA-245', move1: 'MA-073', move2: 'MA-092' },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-073', level: 9 },
      { artId: 'MA-092', level: 9 },
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
      S(
        'NPC-0450',
        '“阿弥陀佛！师兄来得正好。礼部与河阳三城节度使署联合颁牒入寺——朝廷定于三日后在孟州黄河古渡设『皇家水陆大法会』，超度历年来在三川口、好水川、定川寨及北疆抗辽拒夏殉国的大宋将士英灵！”',
      ),
      S(
        'NPC-0450',
        '“可昨夜河防斥候传回密报：西夏一品堂已遣出一对顶尖死士『鬼刃』与『沙狼』潜入孟州渡口，扬言要在法会当夜火焚忠魂牌位、血洗浮桥祭坛，以动摇我大宋西北军心！”',
      ),
      P('“生前血战沙场，死后岂容西夏魔爪亵渎忠魂灵位！慧慈师弟但请直言，我该如何助你？”'),
    ],
    onFinishEffects: [openScene('scene_sls15_02', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_02: {
    id: 'scene_sls15_02',
    title: '暗流北渡 · 应邀护法',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      S(
        'NPC-0450',
        '“小僧虽通水陆仪轨，武功却难挡一品堂一流上品双凶。环顾全寺，唯有师兄经义湛深、骑术纯熟、禅武兼备！恳请师兄随小僧先往【大雄宝殿方丈院正殿】领受皇家水陆金幢，再一同策马北赴孟州黄河渡口护持法会！”',
      ),
      N('飞瀑轰鸣如战鼓隐隐。三千阵亡边卒灵位正待安魂，你望向北方秋云，心意已决。'),
    ],
    choices: [
      {
        id: 'accept_yellow_river_ritual',
        label: '“国士忠魂岂容异邦亵渎！我这便随你赴大雄宝殿领幢北行！”',
        subLabel: '承接支线【黄河水陆 · 孤忠超度】，前往大雄宝殿领金幢',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE15_QUEST_ID, stepId: 'depart_yellow_river' },
          toast('任务已接取：前往【大雄宝殿方丈院正殿】领受水陆金幢并策马北赴孟州！', 'success', '黄河水陆'),
        ],
      },
      {
        id: 'defer_yellow_river_ritual',
        label: '“西夏一品堂双凶不可小觑，容我备足丹药披挂再行启程。”',
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
    title: '领幢北驰 · 河灯万盏',
    subtitle: '大雄宝殿正殿 -> 孟州黄河古渡',
    illustrationUrl: '/assets/quests/sl_s15_yellow_river.jpg',
    illustrationCaption: '孟州黄河渡口万盏河灯顺流而下，少林高僧登坛诵经超度抗辽夏忠魂',
    mandatory: true,
    beats: [
      N('你与慧慈在大雄宝殿方丈院正殿恭领明黄织金的皇家水陆法幢与礼部敕牒，随即跨上健马扬鞭北出邙山捷径。一路霜风猎猎、蹄声如雷，不过两日便抵横贯中原的孟州河阳古渡！'),
      N('数十艘铁索相连的艨艟浮桥横跨滔滔浊浪，南岸高筑三层素白法坛，密密麻麻供奉着数千块手书阵亡将士姓名的楠木灵牌。五百披甲边军肃立坛下，两岸祭奠父兄的军属百姓低泣成海。'),
      S(
        SPEAKER_MENGZHOU_GENERAL,
        '“二位少林大师辛苦！自庆历年间西北血战以来，多少弟兄尸骨埋于黄沙，连个衣冠冢都未落土。今夜全赖大师大开水陆法筵，引我大宋忠魂渡河归乡！”',
      ),
      S('NPC-0450', '“将军放心！今夜不论风云如何变幻，法坛梵唱绝不断绝！”'),
      N('三声铜罄敲响，你与慧慈率三十六名随坛僧众登坛齐诵《水陆仪轨》与《地藏本愿经》，两岸百姓点燃万盏莲花河灯顺流而下，滚滚黄河顷刻化作一条绵延数里的金色星河。'),
    ],
    onFinishEffects: [openScene('scene_sls15_04', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_04: {
    id: 'scene_sls15_04',
    title: '子夜浮桥 · 暗流袭坛',
    subtitle: '孟州黄河古渡 · 铁索浮桥',
    illustrationUrl: '/assets/quests/sl_s15_floating_bridge.jpg',
    illustrationCaption: '黄河浮桥狂风怒浪，少林高徒识破西夏一品堂一流上品双刺客潜渡袭坛',
    mandatory: true,
    beats: [
      N('子时三刻，法会正至「召请孤忠」仪节，浓云遮月、北风骤紧。一股刺鼻的猛火油腥味混在冷雾里扑向法坛，你耳廓微动，霎时听见浮桥铁索下传来水下潜泳的诡异暗响！'),
      N('浓雾深处，一道鬼魅女影正贴着水底浮木向桥墩暗索摸来，显然是轻功诡谲的一品堂女刺客「鬼刃」；另一侧浅滩黑影幢幢，手提巨型修罗战刀的狼皮巨汉「沙狼」已提着猛火油坛直扑法坛侧翼！'),
      S(
        SPEAKER_SHALANG,
        '“哈哈哈哈！火油已至，鬼刃断桥、老子焚坛！今夜便叫三川口与好水川的宋军冤魂灰飞烟灭！”',
      ),
      N('法坛上三千英烈牌位近在咫尺，三十六名诵经僧人不可中断梵唱！危急关头，你决意如何调度破敌？'),
    ],
    choices: [
      {
        id: 'tactic_cut_bridge_rope',
        label: '【听鼓辨泡 · 断索困鬼】借法会鼓钹震波锁定水下气泡，先斩断浮桥暗索困死鬼刃，再回坛斩沙狼！',
        subLabel: '跳过鬼刃之战，直奔法坛与慧慈联手 1v1 迎战沙狼（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【骑术】≥ 45 或身法 ≥ 65',
          conditions: [
            { type: 'skillAtLeast', key: '骑术', min: 45 },
            { type: 'combatStatAtLeast', key: 'agility', min: 65 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s15_tactic', value: 'rope' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s15_tactic_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s15_tactic_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls15_05', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'tactic_gauntlet_defend',
        label: '【镇魂护坛 · 车轮破双凶】命众僧齐诵镇魂经稳住祭坛，亲率慧慈于浮桥前正面车轮连战鬼刃与沙狼！',
        subLabel: '零门槛车轮连战一流上品双刺客「鬼刃」「沙狼」（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s15_tactic', value: 'gauntlet' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s15_tactic_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s15_tactic_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildGuiren() },
            extraOpponents: [{ kind: 'custom', npc: buildShalang() }],
            allies: [{ kind: 'npc', npcId: 'NPC-0450' }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是三千抗辽夏英烈灵位与万千百姓，绝不可退让半步！',
            introText: '【黄河浮桥车轮连战】携慧慈死守皇家水陆法坛，依次迎战西夏一品堂双刺客【鬼刃】与【沙狼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls15_06', SHAOLIN_SIDE15_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('西夏双刺客攻势凶毒，你暂且退回法坛稳住气血，调息后可由大雄宝殿重整战局！', 'warn', '黄河水陆'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('浮桥恶战未决雌雄，回气后再度迎战！', 'warn', '黄河水陆'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls15_05: {
    id: 'scene_sls15_05',
    title: '断索困鬼 · 坛前斩狼',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    mandatory: true,
    beats: [
      N('你凝神借法会低沉鼓钹声激起的水面细波，瞬间锁定铁索下那串逆流而上的潜泳气泡！身形如踏鞍驰骋般纵掠浮桥，一记凌厉掌风顺势斩断桥侧暗索！'),
      N('哗啦巨响中，两排沉重浮木连同铁链轰然倾覆水下，正潜泳摸近的「鬼刃」猝不及防被乱木铁索死死缠住，呛水惨呼着被滚滚黄河浊浪卷向深渊，彻底失去战力！'),
      S(SPEAKER_GUIREN, '“可恶……怎么被这秃驴看破水下潜踪的……呃啊——！”'),
      N('另一侧「沙狼」眼见同伙失手，暴怒狂啸着抡起修罗战刀扑向三千忠魂灵位，慧慈挺戒刀死死架住却震裂虎口！你足尖点舷飞落法坛之前，与慧慈并肩拦住这头西夏恶狼！'),
    ],
    choices: [
      {
        id: 'duel_shalang_solo',
        label: '与慧慈并肩死守英烈牌位，迎战西夏狼首「沙狼」！',
        subLabel: '携慧慈助战一流上品「沙狼」（鬼刃已被断索困于激流）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShalang() },
            allies: [{ kind: 'npc', npcId: 'NPC-0450' }],
            rule: 'story_trial',
            forbidEscapeReason: '身畔即是三千抗辽夏英烈灵位，誓死护坛，绝不后退！',
            introText: '沙狼眼见鬼刃落水狂性大发，挥修罗巨刀直扑法坛！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls15_06', SHAOLIN_SIDE15_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('沙狼修罗巨刀霸道沉重，暂且退保法坛调息后再战！', 'warn', '黄河水陆'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('坛前酣战未分胜负，稳住内息后再行斩狼！', 'warn', '黄河水陆'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls15_06: {
    id: 'scene_sls15_06',
    title: '诛魔坛前 · 梵唱不绝',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s15_tactic=rope|鬼刃既已沉没浮木暗流，你与慧慈一前一后彻底封死沙狼退路！你硬撼其孤注一掷的修罗劈空斩，反手震碎其护体玄罡，一记金刚伏魔劲贯胸将其击毙于青石坛阶之下！|浮桥之上血火交锋，你先破鬼刃诡谲淬毒双弯刀将其震落滔滔黄河，旋即回护法坛与慧慈联手正面击毙狂傲霸道的狼首沙狼！}'),
      S(SPEAKER_SHALANG, '“呃……好刚猛的……少林神功……中原和尚……竟比大宋边军还要硬气……”'),
      N('修罗巨刀当啷坠地，西夏魔头气绝身亡。而就在这生死搏杀的整整半个时辰里，法坛之上三十六名僧众的诵经梵唱竟自始至终未断绝过哪怕一个字！'),
      N('孟州河防巡检使急率重甲边军赶来清扫余烬，见三千英烈灵位纤尘不染、西夏双凶俱已挫败，这位沙场悍将热泪盈眶，率五百甲士向你与慧慈单膝跪地致敬。'),
    ],
    onFinishEffects: [openScene('scene_sls15_07', SHAOLIN_SIDE15_QUEST_ID)],
  },

  scene_sls15_07: {
    id: 'scene_sls15_07',
    title: '晓雾超度 · 祭扫抉择',
    subtitle: '孟州黄河古渡 · 皇家水陆法坛',
    mandatory: true,
    beats: [
      N('你与慧慈拭去衣袖尘血，重整袈裟登坛引领众僧诵念《回向偈》，直至东方泛白、晨雾渐散。万盏莲花河灯犹在远方浊浪中点点闪烁。'),
      S(
        SPEAKER_MENGZHOU_GENERAL,
        '“大宋边军与两岸父老，永铭嵩山少林今夜护忠魂之大恩！只是许多西北阵亡的无名军卒孤身无后，法会一散，往后清明寒食怕是连炷香火也难续……”',
      ),
      N('望着坛上密密麻麻的无名木牌与两岸红着眼眶的河岸义民，你心中涌起一阵沉甸甸的悲悯，决定如何安顿这批无后忠魂？'),
    ],
    choices: [
      {
        id: 'offering_donate_silver',
        label: '【捐银托祭】解囊捐出 30 两纹银购置冥纸香烛、立无名忠魂石碑，托河岸义民岁岁祭扫！',
        subLabel: '花费 30 两纹银，大增江湖声望与侠义（禅心慈悲 +2）',
        tone: 'gold',
        condition: { type: 'silverAtLeast', min: 30 },
        effects: [
          { type: 'setFlag', flag: 'sl_s15_offering', value: 'silver' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s15_donate_paid', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s15_donate_paid', value: true },
              { type: 'giveSilver', amount: -30, reason: '捐银购置香烛冥纸托黄河义民岁祭阵亡忠魂' },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls15_08', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'offering_chant_three_days',
        label: '【诵经三昼】不假外财，亲于渡口青石盘坐诵经三昼夜，以至诚佛号圆寂超度每一缕英灵',
        subLabel: '无需耗银，以佛门至诚法音圆满超度（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s15_offering', value: 'chant' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s15_offering_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s15_offering_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls15_08', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls15_08: {
    id: 'scene_sls15_08',
    title: '三军感泣 · 策马南归',
    subtitle: '孟州古道 -> 嵩山少林寺',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s15_offering=silver|三十两纹银交付河岸耆老手中，百姓与边军纷纷慷慨解囊响应，当场议定立起「大宋孤忠碑」，发誓岁岁清明寒食香火不绝！|你于黄河渡口迎风端坐三昼夜，梵音清越穿云裂石，数千两岸百姓自发陪跪合十，直至最后一卷经毕，黄河晨风仿佛也化作了沉静安详的叹息。}'),
      N('收妥皇家水陆金幢后，你与慧慈婉拒孟州官府盛筵酬谢，跨上健马迎着深秋朝阳南归嵩山。'),
      S(
        'NPC-0450',
        '“阿弥陀佛……此役若非师兄临危不乱护住法坛，小僧纵使粉身碎骨也难安三千英灵。回到少室山后，请师兄随小僧回【飞瀑深潭 · 试炼涧】焚香回向，为这一程画个圆满句号！”',
      ),
      P('“好，咱们这便回试炼涧复命。”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE15_QUEST_ID, 'return_damo_west'),
      toast('黄河水陆法会圆满护持！请返回【飞瀑深潭 · 试炼涧】与慧慈焚香回向。', 'success', '黄河水陆'),
    ],
  },

  scene_sls15_09: {
    id: 'scene_sls15_09',
    title: '飞瀑洗尘 · 焚香回向',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('重返少室山飞瀑深潭试炼涧，涧水轰鸣如昔，却似比行前更多了几分苍凉澄澈。你与慧慈在潭畔青石燃起三炷清香，面向北方黄河静静合十。'),
      S(
        'NPC-0450',
        '“方丈与达摩院诸位师叔已得孟州八百里捷报，对师兄浮桥诛邪、梵唱不绝的壮举赞不绝口！愿以此功德，庄严佛净土；上报四重恩，下济三途苦。”',
      ),
      N('清香袅袅升向嵩岳秋空，面对万里河山与三千忠魂，你心中默默立下哪般回向宏愿？'),
    ],
    choices: [
      {
        id: 'vow_peace_compassion',
        label: '“愿天下早息兵戈，塞外中原同沐清风，再无白骨露于野。”',
        subLabel: '慈悲回向（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s15_vow', value: 'peace' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s15_vow_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s15_vow_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls15_10', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'vow_vajra_guardian',
        label: '“愿我少林铁骨永卫山河，凡敢犯我边疆亵渎英灵者，必伏金刚之威！”',
        subLabel: '护法弘愿（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s15_vow', value: 'guardian' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s15_vow_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s15_vow_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls15_10', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls15_10: {
    id: 'scene_sls15_10',
    title: '孤忠永慰 · 浩气长存',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s15_vow=peace|慧慈闻言合十轻叹，眉眼间尽是澄澈悲悯：“师兄仁心如佛，天下苍生幸甚。”|慧慈肃然颔首，眼中燃起凛然正气：“金刚怒目以卫家国，方不负达摩祖庭千年风骨！”}'),
      N('此行千里驰驱、夜战浮桥、通宵护坛，不仅令你对经义中「无缘大慈、同体大悲」有了切肤体悟，日夜兼程的鞍马驰骋亦令你骑术更臻纯熟。'),
      N('香烟与漫天飞瀑水雾融为一体。江湖与边军皆在传颂嵩山少林黄河护坛、力克西夏双刺客的壮举，你的侠名与佛门威望自此如日中天。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 800, reason: '孟州黄河浮桥击破西夏一品堂双刺客' },
      { type: 'addSectContribution', amount: 280 },
      { type: 'modifyRenown', delta: 100, reason: '黄河水陆法会护忠魂 · 三军感泣' },
      { type: 'modifyChivalry', delta: 60, reason: '超度抗辽夏英烈 · 浮桥诛邪' },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_s15_offering', op: 'eq', value: 'silver' },
        thenEffects: [
          { type: 'modifyRenown', delta: 20, reason: '捐银立碑托河岸义民岁祭无名忠魂' },
          { type: 'modifyChivalry', delta: 30, reason: '解囊安顿无后英烈香火' },
        ],
      },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifySkill', key: '骑术', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0450' }, delta: 15 },
      { type: 'completeQuest', questId: SHAOLIN_SIDE15_QUEST_ID, outcome: 'completed' },
      toast(
        '【黄河水陆 · 孤忠超度】圆满完成！实战经验 +800，门派贡献 +280，声望 +100，侠义 +60（捐银岁祭另增声望 +20、侠义 +30），经义 +1，骑术 +1！',
        'success',
        '黄河水陆',
      ),
    ],
  },
}
