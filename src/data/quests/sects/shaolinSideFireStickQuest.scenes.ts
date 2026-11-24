import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, teachArtNow, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE01_QUEST_ID } from './shaolinSideFireStickQuest'

const SPEAKER_THIEF_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '瘦猴孙七',
  title: '少室山脚偷粮贼首',
  factionName: '登封地痞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_THIEF_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '泥鳅赵二',
  title: '偷粮毛贼',
  factionName: '登封地痞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_THIEF_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '鼠眼钱四',
  title: '偷粮毛贼',
  factionName: '登封地痞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildThiefLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS01_SUN_QI',
    name: '瘦猴孙七',
    title: '偷粮贼首 · 滑手鼠辈',
    realm: '三流下品',
    factionName: '登封地痞',
    sectRank: 0,
    sectRankLabel: '毛贼头目',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“嘿嘿，一个烧火的小和尚拿根黑炭木棍也敢拦爷爷财路？识相的滚开，别怪短刀无眼！”',
    stats: { hp: 440, mp: 180, agi: 26, res: 14 },
    talents: { bone: 45, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-189', move2: 'MA-201' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-189', level: 3 },
      { artId: 'MA-201', level: 3 },
    ],
  })
}

function buildThiefMinion1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS01_ZHAO_ER',
    name: '泥鳅赵二',
    title: '偷粮毛贼 · 翻墙手',
    realm: '不入流',
    factionName: '登封地痞',
    sectRank: 0,
    sectRankLabel: '偷粮毛贼',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“哎哟这黑棍子专捅脚脖子！大哥快帮我一把！”',
    stats: { hp: 140, mp: 55, agi: 11, res: 4 },
    talents: { bone: 36, comprehension: 30, charm: 22 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-201' },
    learnedArts: [
      { artId: 'MA-199', level: 1 },
      { artId: 'MA-201', level: 1 },
    ],
  })
}

function buildThiefMinion2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS01_QIAN_SI',
    name: '鼠眼钱四',
    title: '偷粮毛贼 · 望风手',
    realm: '不入流',
    factionName: '登封地痞',
    sectRank: 0,
    sectRankLabel: '偷粮毛贼',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“少林寺的腊八新米最值钱，抢两袋就溜！”',
    stats: { hp: 140, mp: 55, agi: 12, res: 4 },
    talents: { bone: 35, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-204' },
    learnedArts: [
      { artId: 'MA-199', level: 1 },
      { artId: 'MA-204', level: 1 },
    ],
  })
}

function addKarmaOnce(
  guardFlag: string,
  karmaFlag: 'sl_zen_merit' | 'sl_karma_wrath',
  delta: number,
): QuestEffect {
  return {
    type: 'branch',
    condition: { type: 'flag', flag: guardFlag, op: 'truthy' },
    thenEffects: [],
    elseEffects: [
      { type: 'setFlag', flag: guardFlag, value: true },
      { type: 'addFlagNumber', flag: karmaFlag, delta },
    ],
  }
}

/** 战前授《少林烧火棍》并赠老枣木【少室灶房烧火棍】（防重发，兼作旧档结算补授） */
const GRANT_FIRE_STICK_KIT: QuestEffect[] = [
  teachArtNow('MA-192'),
  {
    type: 'branch',
    condition: { type: 'flag', flag: 'sl_s01_stick_granted', op: 'truthy' },
    thenEffects: [],
    elseEffects: [
      { type: 'giveItem', itemId: 'WPN-095', qty: 1 },
      { type: 'setFlag', flag: 'sl_s01_stick_granted', value: true },
    ],
  },
]

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls01_01: {
    id: 'scene_sls01_01',
    title: '第一幕 · 灶僧回山',
    subtitle: '罗汉堂演武正殿外庑',
    mandatory: true,
    beats: [
      N('{reignYear}冬晴日暖，罗汉堂演武正殿西侧的柴堆前木屑纷飞。禅武僧虚真挽着灰布袖口，正与一名身材矮壮、衣襟沾满松灰的笑面老僧合力码放干柴，脚边两大桶山泉水尚泛着微凉水汽。'),
      S('NPC-0842', '（抹去额角细汗，向你朗声招手）“{gender:师弟|师妹}来得正好！这位是自东京汴梁大相国寺回山述职的【觉尘】师叔——寺里今冬新收的数百石斋粮刚入大斋堂仓房，人手实在周转不开。”'),
      S('NPC-0901', '（咧嘴一笑，指间轻转着一根熏得乌黑油亮的老枣木烧火棍）“阿弥陀佛！洒家在汴梁大相国寺烧了二十年大灶，回少室山照旧闲不住手。{gender:小师侄|小师侄女}若无紧要功课，可愿搭把手担两挑山泉、劈几捆硬柴？”'),
      N('你定睛一看，那根老枣木棍不过寻常灶膛拨火之物，握在觉尘粗壮掌中却沉凝隐有风雷之势；虚真亦在一旁含笑点头，似在暗喻这位烧火老僧绝非泛泛之辈。'),
    ],
    choices: [
      {
        id: 'sls01_accept_zen',
        label: '【扫地担水皆是禅】欣然应诺，愿随觉尘师叔入大斋堂灶房挑水添薪',
        subLabel: '谦逊帮厨，于日用劳作中修心（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s01_start_mood', value: 'zen' },
          addKarmaOnce('sl_s01_start_karma_done', 'sl_zen_merit', 1),
          { type: 'startQuest', questId: SHAOLIN_SIDE01_QUEST_ID, stepId: 'kitchen_night_watch' },
          setStep(SHAOLIN_SIDE01_QUEST_ID, 'kitchen_night_watch'),
          toast(
            '已应下大斋堂帮厨之托！请于【罗汉堂演武正殿（sl_luohan_main）】助觉尘添薪并夜守粮仓。',
            'talk',
            '烧火奇棍',
          ),
        ],
      },
      {
        id: 'sls01_accept_martial',
        label: '【请教拨火奇劲】见师叔指间焦棍沉稳不凡，愿帮厨添薪并讨教腕力门道',
        subLabel: '务实求艺，开启大斋堂帮厨护粮支线',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s01_start_mood', value: 'martial' },
          { type: 'startQuest', questId: SHAOLIN_SIDE01_QUEST_ID, stepId: 'kitchen_night_watch' },
          setStep(SHAOLIN_SIDE01_QUEST_ID, 'kitchen_night_watch'),
          toast(
            '已应下大斋堂帮厨之托！请于【罗汉堂演武正殿（sl_luohan_main）】助觉尘添薪并夜守粮仓。',
            'talk',
            '烧火奇棍',
          ),
        ],
      },
    ],
  },

  scene_sls01_02: {
    id: 'scene_sls01_02',
    title: '第二幕 · 灶膛抽薪 · 战前授棍',
    subtitle: '少室大斋堂 · 灶房',
    illustrationUrl: '/assets/quests/sl_s01_kitchen_stick.jpg',
    illustrationCaption: '少室大斋堂 · 灶膛抽薪，觉尘传授质朴刁钻拨火棍诀',
    mandatory: true,
    beats: [
      N('大斋堂八口千斤铁锅热气腾腾，松枝在砖砌灶膛里噼啪作响。你挑满三大缸山泉，又蹲在灶口帮觉尘翻拨炭火，却总觉硬柴压得太实，火舌闷在膛底透不过风去。'),
      S('NPC-0901', '（哈哈一笑，顺手把焦黑老枣木棍递入你掌心，双指轻点你腕骨）“{ifFlagEq:sl_s01_start_mood=zen|难得你心平气和，把添薪当禅课做！|好眼力，一眼便瞧出洒家这烧火棍里头藏着门道！}听真了——拨火讲究『斜插底、轻挑心、横扫灰、急抽薪』，切莫傻使蛮力硬捅，要借腕底寸劲从下往上钻空子！”'),
      N('只见觉尘握着你的手腕轻轻一沉一抖，那根乌黑烧火棍如灵蛇贴地翻滚，既不碰灶壁，也不扬火星，三两下便把闷火挑得通红炽烈！你心中霍然开朗——这几式拨火动作暗合少林棍法下盘虚实变化，竟是一套专攻脚踝膝弯的质朴奇棍！'),
      S('NPC-0901', '（挤眉弄眼，压低嗓音笑道）“大相国寺菜园子外常有泼皮偷菜，洒家又不能动少林重兵器伤人筋骨，便琢磨出这套《少林烧火棍》！今日先将全套棍诀与这根老枣木【少室灶房烧火棍】一并交你使唤，趁手得很！”'),
      S('NPC-0842', '（推门进来低声警醒）“师叔、{gender:师弟|师妹}，晚课方毕，香积厨老僧却说后墙松林外有人踩点留了脚印，怕是山下毛贼盯上了新入仓的冬米。今晚咱们留在灶房外头打个盹儿守着？”'),
    ],
    onFinishEffects: [
      ...GRANT_FIRE_STICK_KIT,
      toast(
        '觉尘临灶传授《少林烧火棍》，并将老枣木【少室灶房烧火棍】交你防身！',
        'success',
        '烧火奇棍',
      ),
      openScene('scene_sls01_03', SHAOLIN_SIDE01_QUEST_ID),
    ],
  },

  scene_sls01_03: {
    id: 'scene_sls01_03',
    title: '第三幕 · 鼠辈潜仓',
    subtitle: '大斋堂粮仓 · 三更夜色',
    mandatory: true,
    beats: [
      N('夜半三更，少室山万籁俱寂，唯余寒风吹过屋檐枯松。果不其然，大斋堂后窗纸忽被湿指轻轻捅开一洞，紧接着三条鬼祟黑影猫腰翻入粮仓，一人拎着短刀，另两人各提空麻袋与短铁尺！'),
      S(SPEAKER_THIEF_A, '（缩着脖子咽了口唾沫，声音发抖）“孙七哥，真……真只扛两袋粗米度荒么？俺家里老娘饿了三日，实在不想招惹少林寺的活佛爷……”'),
      S(SPEAKER_THIEF_LEADER, '（狠狠敲了赵二脑壳一记，压低嗓音狞笑）“少废话！满屋子都是白花花的新粳米，和尚们早睡熟了！麻利装满四袋扛去登封黑市，卖了银子分你半吊钱买糠，余下的归爷爷喝半年花酒！”'),
      N('你在暗处将主从对话听得一清二楚——瘦猴孙七贪婪凶猾乃惯偷首恶，泥鳅赵二与鼠眼钱四却似受冻挨饿被其裹挟的山下贫汉。觉尘在灶膛阴影里朝你眨了眨眼，低吟口诀：「火旺抽底薪，灰厚扫地尘；莫贪高头势，专点脚底筋！」'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side01_thieves_ready', value: true },
      openScene('scene_sls01_04', SHAOLIN_SIDE01_QUEST_ID),
    ],
  },

  scene_sls01_04: {
    id: 'scene_sls01_04',
    title: '第四幕 · 灶房三策 · 子夜拿贼',
    subtitle: '大斋堂灶房外（破局三解）',
    mandatory: true,
    beats: [
      N('三贼正摸黑往麻袋里装米，仓房通往灶堂唯有眼前一条窄廊。灶口旁堆着两大筐细密白松灰，案板上还蒸着两笼留给夜巡武僧充饥、尚带余温的粗面馒头。'),
      S(SPEAKER_THIEF_B, '（耳朵一动，握紧短铁尺低呼）“七哥，外头灶房好像有人影！”'),
      N('你手握微温的焦黑烧火棍，电光石火间须定下拿贼之策——'),
    ],
    choices: [
      {
        id: 'sls01_tactic_ash',
        label: '【灶灰布阵巧捉贼】暗撒松灰铺地识清摸黑步路，先挑翻二鼠再拿孙七！',
        subLabel: '跳过两名小贼，1v1 生擒瘦猴孙七（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【算术】≥ 25 或实战身法 ≥ 20',
          conditions: [
            { type: 'skillAtLeast', key: '算术', min: 25 },
            { type: 'combatStatAtLeast', key: 'agility', min: 20 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s01_tactic', value: 'ash' },
          addKarmaOnce('sl_s01_tactic_karma_done', 'sl_zen_merit', 1),
          openScene('scene_sls01_05_ash', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'sls01_tactic_buns',
        label: '【冷馒施饥化从贼】推出两笼斋堂冷馒头施舍感化饥民，独擒首恶孙七！',
        subLabel: '感化受胁小贼自行退场，1v1 拿获瘦猴孙七（禅心慈悲 +2）',
        tone: 'gold',
        condition: { type: 'skillAtLeast', key: '经义', min: 30 },
        effects: [
          { type: 'setFlag', flag: 'sl_s01_tactic', value: 'buns' },
          addKarmaOnce('sl_s01_tactic_karma_done', 'sl_zen_merit', 2),
          openScene('scene_sls01_05_buns', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'sls01_tactic_direct',
        label: '【烧火棍正面痛打偷粮贼】佛门斋粮不容宵小染指，挥棍车轮连战三贼！',
        subLabel: '零门槛正面迎战偷粮三贼（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s01_tactic', value: 'direct' },
          addKarmaOnce('sl_s01_tactic_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls01_06_gauntlet', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls01_05_ash: {
    id: 'scene_sls01_05_ash',
    title: '第五幕 · 松灰显迹 · 独擒孙七',
    subtitle: '大斋堂窄廊 · 1v1 擒贼首',
    mandatory: true,
    beats: [
      N('你屏息将两筐细密松灰顺着门槛青砖无声铺成薄薄一层，暗算窄廊步距与回声方位，随即以焦棍轻叩灶门铁环「当」地一响，引得三贼摸黑扑出！'),
      N('泥鳅赵二与鼠眼钱四刚踏入窄廊，脚底踩在松灰上立时发出「沙沙」脆响并滑了半寸！你听声辨位、腕底暗运「横扫灰、急抽薪」二诀，黑棍贴地两记刁钻低扫，眨眼便将二人绊了个嘴啃泥，直滚进炭灰堆里哎哟直叫！'),
      S(SPEAKER_THIEF_LEADER, '（见两名手下一照面便摔得七荤八素，又惊又怒，晃动短刀恶狠狠扑来）“好阴损的小和尚！竟拿灶灰暗算老子！看爷爷剁了你这破烧火棍！”'),
      P('（横棍沉肩，目光沉静）“二鼠已伏，瘦猴孙七，还不丢刀束手就擒！”'),
    ],
    choices: [
      {
        id: 'sls01_fight_leader_ash',
        label: '挥动焦黑烧火棍，1v1 生擒偷粮贼首【瘦猴孙七】（三流下品）',
        subLabel: '二名小贼已被灶灰绊倒，专心应对首恶瘦猴孙七',
        tone: 'danger',
        effects: [
          ...GRANT_FIRE_STICK_KIT,
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildThiefLeader() },
            rule: 'story_trial',
            forbidEscapeReason: '粮仓重地近在咫尺，岂可放任偷粮贼首逃脱！',
            introText: '【灶灰破敌 · 1v1 擒首】手持焦黑烧火棍，独战偷粮贼首【瘦猴孙七（三流下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls01_07', SHAOLIN_SIDE01_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '一时失手被孙七短刀逼退！拍去灶灰重整架势，可在【罗汉堂演武正殿】再擒偷粮贼！',
                'warn',
                '烧火奇棍',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls01_05_buns: {
    id: 'scene_sls01_05_buns',
    title: '第五幕 · 施斋化迷 · 独拿恶首',
    subtitle: '大斋堂庭院 · 1v1 擒贼首',
    mandatory: true,
    beats: [
      N('你并未急着动手，反而大步跨出廊柱，稳稳将案上两笼尚有余温的大馒头推到仓门月光之下，高宣佛号，声震庭院！'),
      P('“阿弥陀佛！少林大斋堂本为济世安僧之地，若真因隆冬断炊、老母挨饿，这十余个斋堂冷馒头尽可拿去充饥，何必随惯盗作贼造下盗业？放下铁尺退至一旁者，贫僧不为难！”'),
      S(SPEAKER_THIEF_A, '（闻着扑鼻麦香，眼眶霎时通红，当啷一声扔掉铁尺跪倒在地）“活佛爷开恩！俺与钱四哥真是一时糊涂被孙七撺掇来的，这米俺们一粒也不敢动，这就退开！”'),
      S(SPEAKER_THIEF_LEADER, '（气急败坏，一脚踹开滚落的馒头，举刀直劈而来）“两个没卵子的蠢货！几块破面团就把你们收买了？小秃驴少在这儿装菩萨，爷爷偏要扛米走！”'),
    ],
    choices: [
      {
        id: 'sls01_fight_leader_buns',
        label: '护住斋粮，以烧火奇棍 1v1 拿获冥顽不灵的【瘦猴孙七】（三流下品）',
        subLabel: '受胁二贼已弃械退场，专心拿获首恶瘦猴孙七',
        tone: 'danger',
        effects: [
          ...GRANT_FIRE_STICK_KIT,
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildThiefLeader() },
            rule: 'story_trial',
            forbidEscapeReason: '粮仓重地近在咫尺，岂可放任偷粮贼首逃脱！',
            introText: '【施斋化迷 · 1v1 擒首】感化饥盗退场，持烧火棍独战首恶【瘦猴孙七（三流下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls01_07', SHAOLIN_SIDE01_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '一时失手被孙七反扑逼退！重整呼吸后，可在【罗汉堂演武正殿】再战偷粮贼首！',
                'warn',
                '烧火奇棍',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls01_06_gauntlet: {
    id: 'scene_sls01_06_gauntlet',
    title: '第五幕 · 灶棍破贼 · 车轮连战',
    subtitle: '大斋堂庭院 · 夜战偷粮三贼',
    mandatory: true,
    beats: [
      P('（一把横起微温的焦黑烧火棍，大步跨出院心喝道）“大胆毛贼！佛门清净斋粮，岂容尔等鼠辈宵小染指！”'),
      S(SPEAKER_THIEF_LEADER, '（恼羞成怒，晃动短刀恶狠狠扑来）“原来只是个守灶房的毛头小僧！弟兄们别怕，一根破烧火棍能奈咱们何？轮番上，先敲晕他再扛米！”'),
      N('三名偷粮贼呈品字形前后扑来！你依着觉尘口诀沉肩压棍，焦黑枣木棍头带起一溜松灰，专往三人下盘膝弯刁钻捅去！'),
    ],
    choices: [
      {
        id: 'sls01_fight_thieves',
        label: '挥动焦黑烧火棍，车轮连战偷粮三贼（不入流二贼 + 三流下品孙七）',
        subLabel: '车轮连战泥鳅赵二、鼠眼钱四与瘦猴孙七',
        tone: 'danger',
        effects: [
          ...GRANT_FIRE_STICK_KIT,
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildThiefMinion1() },
            extraOpponents: [
              { kind: 'custom', npc: buildThiefMinion2() },
              { kind: 'custom', npc: buildThiefLeader() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '粮仓重地近在咫尺，岂可放任偷粮贼逃脱！',
            introText:
              '【灶房护粮 · 车轮连战】手持焦黑烧火棍，在大斋堂庭院连战泥鳅赵二、鼠眼钱四与贼首【瘦猴孙七】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls01_07', SHAOLIN_SIDE01_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '一时失手被毛贼绊倒！拍去尘土重整架势，可在【罗汉堂演武正殿】再战偷粮三贼！',
                'warn',
                '烧火奇棍',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls01_07: {
    id: 'scene_sls01_07',
    title: '第六幕 · 锅底乌灰 · 战后发落',
    subtitle: '大斋堂庭院 · 灯火通明',
    illustrationUrl: '/assets/quests/sl_s01_ash_thieves.jpg',
    illustrationCaption: '锅底乌灰 · 烧火奇棍连戳三贼下盘，满院僧众哄堂大笑',
    mandatory: true,
    beats: [
      N('你越使越顺手，借灶棍沉实巧劲先震飞孙七短刀，反手一记「乌炭点眉」不偏不倚点在他鼻尖，震得这猾贼一屁股坐进灶灰堆里！{ifFlagEq:sl_s01_tactic=ash|连同先前摔在松灰里的赵二、钱四，三人活像三只刚从灶膛钻出来的黑花猫！|}{ifFlagEq:sl_s01_tactic=buns|跪在一旁的赵二、钱四见贼首伏诛，满脸惭愧地连连叩首，不敢妄动半分！|}{ifFlagEq:sl_s01_tactic=direct|三名偷粮贼浑身上下尽是黑漆漆的锅底乌灰，滚作一团哀嚎求饶！|}'),
      N('闻声披衣赶来的满院少林僧众举起灯笼一照，瞧见瘦猴孙七黑炭般的尊容，顿时哄堂大笑！'),
      S(SPEAKER_THIEF_LEADER, '（连咳带喘，磕头如捣蒜）“大师饶命！小人再也不敢偷少林寺的米了！这……这烧火棍怎么比铁禅杖还邪门啊！”'),
      S('NPC-0842', '（上前将惯偷孙七捆了个结实，转头望向瑟瑟发抖的赵二、钱四，轻声问你）“{gender:师弟|师妹}，瘦猴孙七乃登封惯盗，自当押交官差。至于赵二、钱四这俩初犯饥汉，方才瞧着确有苦衷——此番既是你亲手护下斋粮，依你之见，该如何发落？”'),
    ],
    choices: [
      {
        id: 'sls01_dispose_mercy',
        label: '【劈柴抵粮 · 放过初犯饥盗】押孙七见官，留赵二、钱四在斋堂劈柴挑水十日抵罪并赐粗粮度冬',
        subLabel: '慈悲化盗，以劳代罚（禅心慈悲 +1 · 侠义 +12）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s01_dispose', value: 'mercy' },
          addKarmaOnce('sl_s01_dispose_karma_done', 'sl_zen_merit', 1),
          { type: 'modifyChivalry', delta: 12, reason: '宽宥初犯饥盗令其劈柴抵粮并济度寒冬' },
          openScene('scene_sls01_08', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'sls01_dispose_strict',
        label: '【捆送戒律 · 严惩盗粮之徒】佛门常住斋粮岂容姑息，一并捆送戒律院转交官府严惩以儆效尤',
        subLabel: '严明法纪，不纵宵小（怒目杀业 +1 · 师门贡献更多）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s01_dispose', value: 'strict' },
          addKarmaOnce('sl_s01_dispose_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls01_08', SHAOLIN_SIDE01_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls01_08: {
    id: 'scene_sls01_08',
    title: '第七幕 · 斋堂赠棍 · 奇技归心',
    subtitle: '少室大斋堂 · 晨光微露',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s01_dispose=mercy|赵二、钱四闻言伏地痛哭，发誓十日劈柴挑水必尽全力，日后再不敢起邪念；虚真亦点头微笑，暗赞你深得佛门慈悲本怀。|虚真命几名罗汉堂武僧将三贼捆成一串押赴山门交由戒律院转送官差，庭院众人皆肃然赞你疾恶如仇、护粮有方。}'),
      S('NPC-0901', '（拍着肚皮笑得前仰后合，走上前将你手里那根老枣木棍轻轻一托）“妙啊妙啊！没伤着人命筋骨，却把泼皮收拾得服服帖帖！方才临阵那几下抽、拨、捅、点，已将洒家压箱底的《少林烧火棍》悟透了精髓！”'),
      S('NPC-0901', '“洒家过两日便要回汴梁大相国寺了。这根跟了洒家十年的【少室灶房烧火棍】熏得比铁木还沉实，今日便正式赠予你留作护身奇兵——日后行走江湖，莫叫天下人小瞧了少林灶房里的火工手艺！”'),
      P('（双手郑重捧住焦黑老枣木棍，向觉尘与虚真深施一礼）“多谢觉尘师叔赐棍传艺，多谢虚真师兄照拂！”'),
    ],
    choices: [
      {
        id: 'sls01_complete_zen',
        label: '【灶火见禅 · 收棍结案】铭记「担水劈柴皆修行」之理，圆满完成灶房护粮！',
        tone: 'gold',
        effects: [
          ...GRANT_FIRE_STICK_KIT,
          { type: 'addArtExp', amount: 30, artId: 'MA-192' },
          { type: 'giveCombatExp', amount: 60, reason: '大斋堂夜战偷粮贼悟透烧火奇棍' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s01_dispose', op: 'eq', value: 'strict' },
            thenEffects: [{ type: 'addSectContribution', amount: 45 }],
            elseEffects: [{ type: 'addSectContribution', amount: 30 }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s01_tactic', op: 'eq', value: 'ash' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s01_tactic', op: 'eq', value: 'buns' },
                thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
                elseEffects: [],
              },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0901' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0842' }, delta: 10 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s01_dispose', op: 'eq', value: 'mercy' },
            thenEffects: [{ type: 'modifyRenown', delta: 20, reason: '完成门派差事《灶房残薪 · 烧火奇棍》并慈悲感化饥盗' }],
            elseEffects: [{ type: 'modifyRenown', delta: 15, reason: '完成门派差事《灶房残薪 · 烧火奇棍》' }],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE01_QUEST_ID, outcome: 'completed' },
          toast(
            '圆满完成《灶房残薪 · 烧火奇棍》！精进《少林烧火棍》并永得【少室灶房烧火棍】！',
            'success',
            '烧火奇棍',
          ),
        ],
      },
      {
        id: 'sls01_complete_martial',
        label: '【奇棍护法 · 收棍结案】试演一式「釜底抽薪」，谢过师叔赐棍传艺！',
        tone: 'jade',
        effects: [
          ...GRANT_FIRE_STICK_KIT,
          { type: 'addArtExp', amount: 30, artId: 'MA-192' },
          { type: 'giveCombatExp', amount: 60, reason: '大斋堂夜战偷粮贼悟透烧火奇棍' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s01_dispose', op: 'eq', value: 'strict' },
            thenEffects: [{ type: 'addSectContribution', amount: 45 }],
            elseEffects: [{ type: 'addSectContribution', amount: 30 }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s01_tactic', op: 'eq', value: 'ash' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s01_tactic', op: 'eq', value: 'buns' },
                thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
                elseEffects: [],
              },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0901' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0842' }, delta: 10 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s01_dispose', op: 'eq', value: 'mercy' },
            thenEffects: [{ type: 'modifyRenown', delta: 20, reason: '完成门派差事《灶房残薪 · 烧火奇棍》并慈悲感化饥盗' }],
            elseEffects: [{ type: 'modifyRenown', delta: 15, reason: '完成门派差事《灶房残薪 · 烧火奇棍》' }],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE01_QUEST_ID, outcome: 'completed' },
          toast(
            '圆满完成《灶房残薪 · 烧火奇棍》！精进《少林烧火棍》并永得【少室灶房烧火棍】！',
            'success',
            '烧火奇棍',
          ),
        ],
      },
    ],
  },
}
