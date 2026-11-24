import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
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
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-151' },
    learnedArts: [
      { artId: 'MA-140', level: 7 },
      { artId: 'MA-131', level: 7 },
      { artId: 'MA-151', level: 6 },
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
    equippedArts: { neigong: 'MA-140', move1: 'MA-151', move2: 'MA-189' },
    learnedArts: [
      { artId: 'MA-140', level: 5 },
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
      N('{reignYear}夏末，暑气蒸腾。大雄宝殿东厢碑廊内却弥漫着一缕清苦幽远的草药馨香。药王院主【玄生】立于檀木藏经橱前，将一卷卷虫蛀发黄的唐宋《少林药王脉诀》铺陈长案细细晾晒。'),
      S('NPC-0158', '（回头见是你，眉目舒展温和一笑）“阿弥陀佛。听玄寂师兄赞你在汴京一掌碎铁、名动京师，{ifFlagEq:sl_q14_handover=kaifeng|且守法交官极有正道气象；|且连夜拔除西夏暗桩手腕老辣；}如今经义与书法又精进不少。老衲手头这批古医典亟待重抄归档，师侄可愿搭把手？”'),
      N('你研墨铺纸，以清劲蝇头小楷一笔一划誊抄人体奇经八脉与药性配伍，连经络穴位图亦勾勒得毫厘不差。玄生在旁抚须赞叹：“世人多知少林七十二绝技刚猛无匹，却少有人悟透——能伤人者，亦能活人。戒律院执杖止恶，药王院悬壶救苦，皆是菩萨心肠。”'),
      P('（停笔合十，目光澄澈）“弟子既归戒律药王一脉，今日随师伯校勘医经，深感医武同源之妙！”'),
    ],
    choices: [
      {
        id: 'slq15_accept_heal',
        label: '【悬壶济世】潜心研读药王医经，求救苦活人之正道',
        subLabel: '开启《药王百草 · 拈花截脉》，随玄生校典参悟医武之道',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q15_QUEST_ID, stepId: 'zhengzhou_relief_camp' },
          setStep(SHAOLIN_Q15_QUEST_ID, 'zhengzhou_relief_camp'),
          toast('已开启《药王百草 · 拈花截脉》！随药王院主玄生参悟医武之道。', 'talk', '药王百草'),
          openScene('scene_slq15_02', SHAOLIN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'slq15_accept_dual',
        label: '【医武双修】兼修点穴截脉之法，刚柔并济护持苍生',
        subLabel: '开启《药王百草 · 拈花截脉》，随玄生校典参悟医武之道',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q15_QUEST_ID, stepId: 'zhengzhou_relief_camp' },
          setStep(SHAOLIN_Q15_QUEST_ID, 'zhengzhou_relief_camp'),
          toast('已开启《药王百草 · 拈花截脉》！随药王院主玄生参悟医武之道。', 'talk', '药王百草'),
          openScene('scene_slq15_02', SHAOLIN_Q15_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq15_02: {
    id: 'scene_slq15_02',
    title: '第二幕 · 郑州瘴急',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('话音未落，廊外奔入一名满头大汗的知客沙弥，双手呈上郑州官府求援急函：连旬暴雨冲垮黄河郑州堤坝，数千失所流民聚居官道高坡，湿热浊气交蒸之下竟爆发剧烈「锁喉瘴」！'),
      N('函中称染疫百姓高热神昏、咽喉肿闭，往往半日便气绝身亡，郑州城内外医馆药石早已告罄，官府只得十万火急向少林药王院求援！'),
      S('NPC-0158', '（合上医典霍然起身，慈容化作焦切）“阿弥陀佛，罪过罪过！锁喉瘴热毒攻心最凶，若只等汤药慢慢煎服，半数老弱恐熬不过今夜！师侄，速随老衲搬出库存的大黑续命膏、清瘟败毒散与银针匣，星夜驰赴郑州！”'),
      S('NPC-0158', '（装妥三担药箱后骤然止步，将你唤至老桂树下）“郑州染瘴流民动辄数百，单凭老衲一人施针疏脉断然救不过来！然寻常刚猛禅劲点在病弱百姓身上反会震伤心肺——今日事急从权，老衲便以医道传你少林七十二绝技之一《拈花指》！”'),
    ],
    onFinishEffects: [openScene('scene_slq15_03', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_03: {
    id: 'scene_slq15_03',
    title: '第三幕 · 迦叶拈花',
    subtitle: '东厢碑廊老桂树下',
    mandatory: true,
    beats: [
      N('玄生伸出右手食中二指轻轻一捻，宛若拈起一朵无形青莲，朝三尺外桂枝上一片挂着晨露的枯叶凌空虚点！奇景骤生——那片枯叶应指飘落，叶面上晶莹剔透的露珠却稳稳凝在原处，未曾碎裂半滴！'),
      S('NPC-0158', '“看清了么？《拈花指》妙处不在刚狠，而在『柔、细、准』三字！以春风细丝般的禅劲透衣入穴，对敌可悄无声息截断经脉，对民可隔衣截毒化瘀、立起沉疴！你方才抄校过《药王脉诀》，穴位早熟于胸，且随老衲试运三转！”'),
      N('你闭目凝神，将平日修习的刚猛内息一寸寸收束化柔引至指尖；经玄生以《金刚经》心法点拨，半柱香后你屈指轻弹，指尖劲风竟已如柳絮拂面、绵密入微！'),
      S('NPC-0158', '（欣慰颔首）“好悟性！虽初窥门径，已足够隔衣替重患截毒疏脉！事不宜迟，即刻随老衲下山直奔郑州官道疫棚！”'),
    ],
    onFinishEffects: [teachArtNow('MA-063'), openScene('scene_slq15_04', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_04: {
    id: 'scene_slq15_04',
    title: '第四幕 · 疫营辨证',
    subtitle: '郑州城外 · 救灾药棚（医道辨证）',
    illustrationUrl: '/assets/quests/sl_15_finger_heal.jpg',
    illustrationCaption: '拈花截脉 · 郑州药棚之内，辨证施药并以柔绵指劲截毒活人',
    mandatory: true,
    beats: [
      N('星夜疾行数十里抵郑州官道高坡，眼前惨状触目惊心：洪水未退，泥泞堤岸搭满破席草棚，数百流民扶老携幼呻吟不止。玄生甫一入营便被唤往东棚抢救危重产妇，将西棚三十名急症病患托付于你独断施治！'),
      S(SPEAKER_REFUGEE_ELDER, '（抱着怀中喘息微弱的小孙儿跪倒泥水之中泣血哀求）“少林活佛来了！求大师救救我孙儿和棚里乡亲吧，烧得快没气儿啦！”'),
      N('你连忙俯身切脉望舌，逐一查验西棚重患体征——只见病民俱是「高热神昏、舌绛无苔、脉沉而数」，扒开衣领更见其「肩井穴处隐现一道青黑瘀毒」，正顺着经络直逼心脉！'),
      N('药箱与火炉俱在手边，棚外更有官差焦躁催促如何控疫。性命攸关就在呼吸之间，你凝神审度脉象病机，即刻定下施救之策——'),
    ],
    choices: [
      {
        id: 'slq15_med_tonic',
        label: '急煎温补峻剂人参附子汤大补元气，以扶正固脱之法强行吊命',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q15_plague_cured', value: false },
          { type: 'setFlag', flag: 'sl_q15_med_choice', value: 'wrong_tonic' },
          openScene('scene_slq15_05_wrong', SHAOLIN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'slq15_med_cure',
        label: '银针放血泄毒配清瘟败毒散，并以《拈花指》轻点肩井、曲池二穴截住瘀毒攻心！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q15_plague_cured', value: true },
          { type: 'setFlag', flag: 'sl_q15_med_choice', value: 'cure' },
          openScene('scene_slq15_05_cured', SHAOLIN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'slq15_med_burn',
        label: '立令官差闭营焚屋隔绝西棚疫源，弃重患以保全外围轻症灾民',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q15_plague_cured', value: false },
          { type: 'setFlag', flag: 'sl_q15_med_choice', value: 'burn' },
          openScene('scene_slq15_05_burn', SHAOLIN_Q15_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq15_05_cured: {
    id: 'scene_slq15_05_cured',
    title: '第五幕 · 拈花活人',
    subtitle: '郑州城外 · 救灾药棚（辨证精准）',
    mandatory: true,
    beats: [
      P('（眉峰一展，果断下令煎药）“舌绛无苔、脉沉而数乃温热邪毒深入营血之象，万万不可妄投温补！快取银针刺络泄毒、急煎清瘟败毒散，贫僧亲自以指劲替重患截毒护心！”'),
      N('你跪坐泥地之上，先以银针微刺少商放去紫黑毒血，随即右手并指如拈花，隔着稚童单薄粗衣轻柔精准地点在「肩井」「曲池」与「天突」要穴！三缕春风禅劲透衣而入，稳稳截住青黑瘀毒上攻之势！'),
      N('不过十息，“哇”的一声，稚童吐出一口淤黑浓痰，骤然大口喘过气来，青紫小脸渐渐泛出血色！流民老丈老泪纵横，连连叩头高呼“少林活菩萨救命大恩”！'),
      N('此后两日两夜，你与玄生昼夜活人三百余众，每渡一缕柔劲，《拈花指》力道收放愈发圆熟自然；玄生查验完西棚脉案，眼中满是惊叹与欣慰！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q15_at_camp', value: true },
      openScene('scene_slq15_06', SHAOLIN_Q15_QUEST_ID),
    ],
  },

  scene_slq15_05_wrong: {
    id: 'scene_slq15_05_wrong',
    title: '第五幕 · 温补误治',
    subtitle: '郑州城外 · 救灾药棚（辨证失策）',
    mandatory: true,
    beats: [
      N('你见病患神昏气弱，急忙煎起人参附子峻剂灌服。谁料热毒已入营血，大热峻补刚一入喉便如火上浇油，几名重患反倒高热抽搐、肩井瘀毒骤然上涌，棚内顿时哭喊大乱！'),
      S('NPC-0158', '（闻声疾奔而至，一搭脉象脸色大变，连忙挥手打翻药碗）“阿弥陀佛！舌绛无苔、脉沉而数乃是热入营血之实热急症，怎可妄用人参附子助长邪火？！快取银针与清瘟败毒散来！”'),
      N('玄生顾不得责备，亲自飞针刺络泄毒，又以《拈花指》连点病患肩井、曲池二穴截住瘀毒，直忙到次日天明方将误治危局勉强挽回，鬓角白发尽被汗水浸透。'),
      N('你惭愧难当，跪领师伯指点，紧跟着协力熬药照料灾民；两日后灾营总算稳住，然此番误治教训令你刻骨铭心。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q15_at_camp', value: true },
      openScene('scene_slq15_06', SHAOLIN_Q15_QUEST_ID),
    ],
  },

  scene_slq15_05_burn: {
    id: 'scene_slq15_05_burn',
    title: '第五幕 · 酷烈隔疫',
    subtitle: '郑州城外 · 救灾药棚（弃患焚棚）',
    mandatory: true,
    beats: [
      P('（神色冷硬，挥手令官差架起拒马火把）“西棚疫毒已深入营血，若蔓延开来外围数千流民尽将染毙！立刻封死草棚、点火焚棚隔绝疫源，莫要犹豫！”'),
      N('刹那间棚内哭号震天！流民老丈死死抱住你僧袍哀恸痛哭，官差手持火把正欲抛上草顶之际，一道清朗柔劲破空而来，啪地将火把尽数震灭在泥水之中！'),
      S('NPC-0158', '（从东棚疾掠而至，素来温和的脸上罕见地现出凛然怒色）“住手！药王院悬壶救苦，岂有弃生焚患以求苟安之理？！热毒入营犹可用银针清瘟败毒散配拈花指截脉救活，师侄今日怎生出这般酷烈杀心？！”'),
      N('玄生亲率药王僧众抢入西棚施针煎药救下垂危稚童与一众重患。两日后疫势虽渐稳，营中流民望向你的眼神却多了一丝敬畏与疏离，你心底亦沉甸甸烙下一道业火。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q15_at_camp', value: true },
      openScene('scene_slq15_06', SHAOLIN_Q15_QUEST_ID),
    ],
  },

  scene_slq15_06: {
    id: 'scene_slq15_06',
    title: '第六幕 · 太行溃匪劫药营',
    subtitle: '郑州城外 · 官道药棚前（三策破局 · 实战）',
    mandatory: true,
    beats: [
      N('第三日黄昏，官道西北方向骤然蹄声如雷！三四十名凶恶悍匪挥舞鬼头刀疾驰扑来，吓得棚外灾民哭喊奔逃。为首独眼蒙黑布、肩扛厚背砍山刀的巨汉翻身下马，正是太行山溃匪首领「独眼狼」；其身旁提刀狞笑的正是心腹「黑风疤」！'),
      S(SPEAKER_ONE_EYE_WOLF, '（放声狂笑，独眼贪婪盯住少林药箱）“哈哈哈哈！少林药王院拉了几大箱千金难买的大黑续命膏和赈灾粮！弟兄们全都搬上马背，谁敢拦路一刀两断！”'),
      S(SPEAKER_BANDIT_DEPUTY, '（冷笑挥刀）“老大放心！草棚里就几个老和尚和病秧子，三两下全剁了！”'),
      N('草棚深处玄生正替危重产妇施针丝毫抽身不得。你毅然踏步挡在百余灾民之前，目光敏锐扫过全场：晚风正从营外西北上风口吹向匪阵，而独眼狼身后大半匪众面黄肌瘦、衣衫破烂，显是被洪水逼上梁山裹挟而来的普通饿民——'),
    ],
    choices: [
      {
        id: 'slq15_tactic_smoke',
        label: '【药烟熏敌破先锋】趁风势于上风口点燃曼陀罗迷烟放倒杂兵，1v1 生擒独眼狼！',
        subLabel: '需先前精准辨证治疫，或经义 ≥ 70 通晓百草药性 · 跳过黑风疤 1v1（胜后禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q15_plague_cured', op: 'truthy' },
            { type: 'skillAtLeast', key: '经义', min: 70 },
          ],
          hint: '需先前精准辨证治疫，或经义 ≥ 70 通晓药王百草药性',
        },
        effects: [
          toast('你于上风口点燃药王院配制的曼陀罗迷烟！白烟随风卷过，黑风疤与众喽啰顷刻软倒，只余独眼狼屏息怒扑！', 'success', '药烟熏敌'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildOneEyeWolfBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是药王院药箱与百余染疫流民，寸步不可后退！',
            introText: '【郑州药棚 · 药烟破先锋】曼陀罗迷烟放倒喽啰与黑风疤，1v1 独战匪首【独眼狼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              { type: 'setFlag', flag: 'sl_q15_battle_tactic', value: 'smoke' },
              openScene('scene_slq15_07', SHAOLIN_Q15_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('独眼狼刀势凶狠，暂借药棚木架周旋调息，整理好状态再战！', 'warn', '拈花截脉'),
            ],
          },
        ],
      },
      {
        id: 'slq15_tactic_pacify',
        label: '【掷药囊分银安抚饿匪】出 30 两银买干粮晓以大义遣散裹挟饥民，孤立独眼狼 1v1！',
        subLabel: '需 30 两纹银且辩才 ≥ 45（已遣散重试免复费）· 免伤无辜跳过杂兵（胜后禅心慈悲 +2）',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q15_bandits_pacified', op: 'truthy' },
            {
              type: 'all',
              conditions: [
                { type: 'silverAtLeast', min: 30 },
                { type: 'skillAtLeast', key: '辩才', min: 45 },
              ],
            },
          ],
          hint: '需 30 两纹银且辩才 ≥ 45 遣散被裹挟饿匪（已遣散则免复费）',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q15_bandits_pacified', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -30, reason: '郑州药棚分银置粮遣散被裹挟之饥民匪众' },
              { type: 'setFlag', flag: 'sl_q15_bandits_pacified', value: true },
              toast('你掷出三十两散银与药囊干粮，朗声晓以大义！被裹挟的饥民纷纷跪地弃刀散去，连黑风疤也被乱军冲走！', 'success', '分银安民'),
            ],
            elseEffects: [
              toast('被裹挟的饥民早已散去，无需再费银两，营前只余独眼狼孤身暴怒迎战！', 'talk', '独战匪首'),
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildOneEyeWolfBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是药王院药箱与百余染疫流民，寸步不可后退！',
            introText: '【郑州药棚 · 散银孤贼】众饿匪弃刀归善，1v1 正面生擒暴怒的【独眼狼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              { type: 'setFlag', flag: 'sl_q15_battle_tactic', value: 'pacify' },
              openScene('scene_slq15_07', SHAOLIN_Q15_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('独眼狼孤身困斗凶悍异常，暂退调息后再战（饿匪已散，无需再付银两）！', 'warn', '拈花截脉'),
            ],
          },
        ],
      },
      {
        id: 'slq15_tactic_blood',
        label: '【金刚截脉正面血战】邪匪劫药天理难容！车轮连战黑风疤与独眼狼！',
        subLabel: '无门槛正攻 · 车轮连战二流下品黑风疤与二流上品独眼狼（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q15_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBanditDeputy() },
            extraOpponents: [{ kind: 'custom', npc: buildOneEyeWolfBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是药王院药箱与百余染疫流民，寸步不可后退！',
            introText: '【车轮连战 · 郑州药棚血战】迎战太行悍匪【黑风疤】与溃匪首【独眼狼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              { type: 'setFlag', flag: 'sl_q15_battle_tactic', value: 'blood' },
              openScene('scene_slq15_07', SHAOLIN_Q15_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('太行溃匪刀势凶狠，暂借药棚木架周旋调息，整理好状态再战独眼狼！', 'warn', '拈花截脉'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq15_07: {
    id: 'scene_slq15_07',
    title: '第七幕 · 拈花封穴',
    subtitle: '郑州城外 · 官道药棚前',
    illustrationUrl: '/assets/quests/sl_15_bandit_repel.jpg',
    illustrationCaption: '指掌齐施 · 药棚之前刚掌震敌、拈花点穴，生擒太行匪首独眼狼',
    mandatory: true,
    beats: [
      N('刀光掌影交错间，独眼狼见势不妙暴吼着举起厚背砍山刀力劈华山！你却不退反进，左手一记《一拍两散掌》暗劲震偏刀锋，身形如柳絮贴着刀背滑入中宫！'),
      N('右手食中二指如迦叶拈花轻描淡写连点三下——「肩井」「曲池」「风池」！三缕细密柔劲瞬息截断独眼狼臂膀气脉！'),
      S(SPEAKER_ONE_EYE_WOLF, '（重刀哐当坠地，整个人如泥塑木雕般僵立原地，独眼满是骇然）“你……你点了老子什么邪门穴道？怎么浑身动弹不得！”'),
      N('残余匪众见凶名赫赫的独眼狼竟被年轻僧人举重若轻三指制伏，顿时魂飞魄散作鸟兽散。不多时郑州巡防官兵赶到，将独眼狼与昏迷的黑风疤枷锁押走，药棚内外爆发出震天欢呼！'),
    ],
    onFinishEffects: [openScene('scene_slq15_08', SHAOLIN_Q15_QUEST_ID)],
  },

  scene_slq15_08: {
    id: 'scene_slq15_08',
    title: '第八幕 · 瘴散民安',
    subtitle: '郑州城外 · 官道长堤（灾后善后）',
    mandatory: true,
    beats: [
      N('此后七日再无匪患侵扰。黄河退潮，锁喉瘴亦在少林汤药与拈花疏脉之下彻底平息，前后活人三百余众。启程归山那日，官道两旁跪满焚香相送的郑州百姓。'),
      S(SPEAKER_REFUGEE_ELDER, '（捧着一篮野枣涕泪相送）“多谢玄生大师与小活佛救命之恩！若非少林药王院不远百里施药退匪，咱们这几百口人早就化作荒郊枯骨了！”'),
      S('NPC-0158', '（合十还礼，转首望向车上尚余的一箱上等药材与密录脉案）“师侄，郑州水退而冬寒将至，灾民田亩尽毁。车上这批余药与咱们整理出的锁喉瘴脉案，你意下该如何善后？”'),
    ],
    choices: [
      {
        id: 'slq15_aftermath_charity',
        label: '【尽留余药托设冬棚】将余药尽赠郑州善堂义医，并留药方防冬疫复发',
        subLabel: '惠泽当地百姓长远安康，留少林药王慈悲美名',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q15_aftermath', value: 'charity' },
          openScene('scene_slq15_09', SHAOLIN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'slq15_aftermath_archive',
        label: '【带回脉案入藏经橱】留足当月药石，携完整疫症脉案归寺编入《药王脉诀》传世',
        subLabel: '总结今番锁喉瘴证治经验，以备他年天下大疫之用',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q15_aftermath', value: 'archive' },
          openScene('scene_slq15_09', SHAOLIN_Q15_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq15_09: {
    id: 'scene_slq15_09',
    title: '第九幕 · 药王嘉许',
    subtitle: '东厢碑廊 · 藏经橱（结局）',
    illustrationUrl: '/assets/quests/sl_15_yaowang_praise.jpg',
    illustrationCaption: '药王嘉许 · 东厢碑廊之下，玄生亲授《拈花指》全卷真传',
    mandatory: true,
    beats: [
      N('重返嵩山少林寺东厢碑廊，秋风送爽，药香依旧。玄生将你先前誊抄工整的《少林药王脉诀》郑重收入檀木藏经橱，转身向你深深合十。'),
      S('NPC-0158', '（目含赞叹，朗声评点）“善哉，善哉！{ifFlagEq:sl_q15_med_choice=cure|你在郑州疫营一眼识破热入营血病机，以银针清瘟散配拈花指截毒活人无数，真得药王医道三昧！|你在郑州疫营虽一度辨证偏颇险酿波折，然临危不屈、终在匪患当前挺身护下百余染疫流民，知错能改亦是良材！}”'),
      S('NPC-0158', '“老衲今日将少林七十二绝技《拈花指》全卷心法尽数授你！望你他日无论身处庙堂江湖，皆不忘『一指可截恶脉，一指可渡苍生』之初心！”'),
      N('桂香随风拂入碑廊。你恭谨伏拜领受，摊开右手微微一捻，指尖圆润禅劲收发随心，医心与武道俱臻化境！'),
    ],
    choices: [
      {
        id: 'slq15_finish',
        label: '合十谢过玄生师伯，领受《拈花指》全卷（完成《药王百草 · 拈花截脉》）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q15_med_choice', op: 'eq', value: 'cure' },
            thenEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 }],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q15_med_choice', op: 'eq', value: 'burn' },
                thenEffects: [{ type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 }],
                elseEffects: [],
              },
            ],
          },
          { type: 'teachMartialArt', artId: 'MA-063' },
          { type: 'giveCombatExp', amount: 420, reason: '郑州药棚以拈花指救民破太行溃匪独眼狼' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'modifyChivalry', delta: 30, reason: '黄河水灾设棚施药、护民退匪活人无数' },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '书', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q15_plague_cured', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
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
