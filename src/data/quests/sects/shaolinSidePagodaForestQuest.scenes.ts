import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE04_QUEST_ID } from './shaolinSidePagodaForestQuest'

const SPEAKER_RAIDER_SUN: StorySpeakerSpec = {
  kind: 'custom',
  name: '孙二',
  title: '钻地鼠 · 洛阳摸金校尉',
  factionName: '洛阳摸金贼',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_RAIDER_ZHAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵六',
  title: '受骗挖土苦力',
  factionName: '洛阳摸金贼',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_CHUANSHANGUI: StorySpeakerSpec = {
  kind: 'custom',
  name: '穿山鬼',
  title: '洛阳摸金头目 · 穿山鬼',
  factionName: '洛阳摸金贼',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_PATROL_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '慧刚',
  title: '罗汉堂巡夜武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildRaiderSun(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS04_RAIDER_SUN',
    name: '孙二',
    title: '钻地鼠 · 洛阳摸金贼',
    realm: '三流中品',
    factionName: '洛阳摸金贼',
    sectRank: 0,
    sectRankLabel: '摸金手下',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“撞破爷们倒斗的好事，拿洛阳铲把你这小和尚一道埋进塔底！”',
    stats: { hp: 540, mp: 240, agi: 29, res: 16 },
    talents: { bone: 52, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-193', move2: 'MA-189' },
    learnedArts: [
      { artId: 'MA-238', level: 4 },
      { artId: 'MA-193', level: 4 },
      { artId: 'MA-189', level: 3 },
    ],
  })
}

function buildRaiderZhao(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS04_RAIDER_ZHAO',
    name: '赵六',
    title: '倒斗苦力 · 洛阳摸金随从',
    realm: '三流下品',
    factionName: '洛阳摸金贼',
    sectRank: 0,
    sectRankLabel: '摸金随从',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“头儿说了不干掉你就没工钱，小师傅别怪俺心狠！”',
    stats: { hp: 410, mp: 160, agi: 25, res: 13 },
    talents: { bone: 45, comprehension: 34, charm: 22 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-209', move2: 'MA-196' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-209', level: 3 },
      { artId: 'MA-196', level: 3 },
    ],
  })
}

function buildChuanshangui(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS04_CHUANSHANGUI',
    name: '穿山鬼',
    title: '洛阳摸金头目 · 穿山鬼',
    realm: '三流上品',
    factionName: '洛阳摸金贼',
    sectRank: 0,
    sectRankLabel: '摸金头目',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“老子在北邙山倒了一辈子斗，今日偏要开一开唐代少林高僧的舍利地宫，挡路者死！”',
    stats: { hp: 780, mp: 460, agi: 35, res: 21 },
    talents: { bone: 60, comprehension: 48, charm: 28 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189', move2: 'MA-196' },
    learnedArts: [
      { artId: 'MA-238', level: 5 },
      { artId: 'MA-189', level: 5 },
      { artId: 'MA-196', level: 4 },
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

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls04_01: {
    id: 'scene_sls04_01',
    title: '第一幕 · 寒夜惊魂 · 剑崖问鬼',
    subtitle: '达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}寒冬深夜，山风卷着枯叶掠过五乳峰峭壁。你行至剑痕崖时，只见负责塔林洒扫的新晋沙弥韩河源正缩在石碑背风处，双手紧攥一柄木杖，脸色煞白、瑟瑟发抖。'),
      S('NPC-0951', '（猛地回头见是你，声音犹带颤意）“{gender:师兄|师姐}……西侧历代高僧塔林接连三晚每逢亥子之交便浮起幽绿磷火，还传出历代高僧显灵似的凄厉哭嚎与铜铃乱响！”'),
      S('NPC-0951', '“方才绿火又在唐代法如禅师灵塔前飘来荡去，连塔砖底下都有闷响，弟子实在不敢回西厢禅房合眼……”'),
      N('你凝眸望向西侧松林深处：少林塔林乃历代得道高僧圆寂净土，佛光肃穆数百年从未作祟，今夜既有幽火又有撬砖异响，十有八九藏着蹊跷！'),
    ],
    choices: [
      {
        id: 'sls04_accept_zen',
        label: '【金刚破妄 · 温言宽慰】诵《金刚经》破其心魔，嘱其静坐避风后持棍夜巡塔林',
        subLabel: '以佛法安抚受惊同门（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_start_mood', value: 'zen' },
          addKarmaOnce('sl_s04_start_karma_done', 'sl_zen_merit', 1),
          { type: 'startQuest', questId: SHAOLIN_SIDE04_QUEST_ID, stepId: 'patrol_pagoda_forest' },
          setStep(SHAOLIN_SIDE04_QUEST_ID, 'patrol_pagoda_forest'),
          toast(
            '已接下塔林夜巡重任！请前往【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】潜入西侧塔林。',
            'talk',
            '塔林夜巡',
          ),
        ],
      },
      {
        id: 'sls04_accept_stern',
        label: '【横棍辟邪 · 径查异象】佛门净土岂容装神弄鬼，立赴试炼涧西径潜探塔林！',
        subLabel: '承接任务，前往飞瀑深潭试炼涧潜入塔林',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_start_mood', value: 'stern' },
          { type: 'startQuest', questId: SHAOLIN_SIDE04_QUEST_ID, stepId: 'patrol_pagoda_forest' },
          setStep(SHAOLIN_SIDE04_QUEST_ID, 'patrol_pagoda_forest'),
          toast(
            '已接下塔林夜巡重任！请前往【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】潜入西侧塔林。',
            'talk',
            '塔林夜巡',
          ),
        ],
      },
    ],
  },

  scene_sls04_02: {
    id: 'scene_sls04_02',
    title: '第二幕 · 塔林幽火 · 三痕破迷',
    subtitle: '少林高僧塔林深处（勘查三处痕迹）',
    illustrationUrl: '/assets/quests/sl_s04_pagoda_ghost.jpg',
    illustrationCaption: '塔林幽火 · 寒夜百座高僧砖塔磷火闪烁，细勘三处蛛丝马迹',
    mandatory: true,
    beats: [
      N('你自试炼涧西侧古柏小径潜入塔林。残月如钩，二百余座唐、五代、宋初砖石墓塔矗立在荒草松影间。前方唐代法如禅师灵塔周围果然鬼火荧荧、铜铃呜咽！你贴着塔影悄然绕行外围，暗中查验出三处寻常人绝难察觉的痕迹——'),
      N('其一，法如禅师灵塔西侧基座旁堆着一捧新翻出的湿润黄土，土层断面留着数道规整的半月形铁铲探孔——分明是洛阳铲试土留下的月牙痕！'),
      N('其二，幽绿磷火并非凭空飘浮，而是几截涂满磷粉的枯骨被一根极细的浸油黑线悬于古柏枝头，细线另一端顺着风口一直牵向塔檐铜铃，微风一过便拖得枯骨摇曳、铜铃凄鸣！'),
      N('其三，灵塔前冷清的石香炉里竟插着三支尚未燃尽的粗劣市井线香——少林寺历来只焚柏末清香，从不烧此等街头廉价货色！'),
      P('（心念电转，将三处痕迹串联一处，已有定论）“新翻月牙铲痕、涂磷枯骨牵铃细线、外加市井线香……这塔林闹鬼的真相乃是——”'),
    ],
    choices: [
      {
        id: 'sls04_deduce_ghost',
        label: '「高僧灵塔年久地气生磷、夜风牵丝鸣铃，实乃先贤显灵示警塔基松动」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_deduce_pick', value: 'ghost' },
          openScene('scene_sls04_03', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'sls04_deduce_raiders',
        label: '「装神弄鬼的盗墓摸金贼！借涂磷细线吓退沙弥，烧市井线香点烛祭土、下洛阳铲盗掘舍利地宫！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_ghost_debunked', value: true },
          { type: 'setFlag', flag: 'sl_s04_deduce_pick', value: 'raiders' },
          openScene('scene_sls04_03', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'sls04_deduce_monk',
        label: '「多半是寺内犯戒沙弥偷祭山下故人，不慎遗落线香与农具惹出虚惊」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_deduce_pick', value: 'monk' },
          openScene('scene_sls04_03', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls04_03: {
    id: 'scene_sls04_03',
    title: '第三幕 · 塔影现形 · 穿山盗陵',
    subtitle: '唐代高僧舍利塔基前',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s04_ghost_debunked|你早已洞悉三处破绽，屏息伏于五层砖塔阴影后静候贼人现身！果不其然，三道黑影自塔基撬砖处钻出，满身磷粉腥气扑鼻。|你尚自揣度间，一阵夜风迎面吹来浓烈磷粉腥气与桐油味，三道黑影赫然自唐代高僧砖塔基座后探头钻出！}'),
      S(SPEAKER_CHUANSHANGUI, '（举着铁钎撬动封门青石，沙哑低催）“孙二、赵六，手脚麻利些！那群胆小如鼠的小沙弥早被咱们挂的磷骨铜铃吓破了胆，再掘三尺便是唐代高僧舍利地宫，里头的鎏金舍利函够老子在洛阳逍遥半辈子！”'),
      S(SPEAKER_RAIDER_ZHAO, '（浑身发抖，手里的铁铲直打颤）“大……大爷，您雇俺来时说的是连夜修荒井啊！这分明是在刨少林活佛的坟，方才那铜铃响得俺心里发毛……”'),
      S(SPEAKER_RAIDER_SUN, '（恶狠狠推了赵六一把）“闭嘴！收了半两银子定钱还想临阵反悔？老实挖土，不然先拿洛阳铲埋了你！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side04_raiders_ready', value: true },
      openScene('scene_sls04_04', SHAOLIN_SIDE04_QUEST_ID),
    ],
  },

  scene_sls04_04: {
    id: 'scene_sls04_04',
    title: '第四幕 · 塔林拿贼 · 破鬼二策',
    subtitle: '历代高僧塔林（捉贼抉择）',
    mandatory: true,
    beats: [
      N('你藏身塔影之下，将三贼情状看得一清二楚：那穿山鬼与钻地鼠孙二乃是惯犯，赵六却是贪那半两工钱受骗上山的胆小苦力；而枝头悬着涂磷枯骨的那根细黑麻线，正巧斜斜垂过你头顶三尺！'),
      N('封门青石已被撬开寸许缝隙，刻不容缓，须即刻出手护陵拿贼——'),
      P('（微握齐眉棍，眼神沉凝）“哼，既然你们爱在塔林装神弄鬼……”'),
    ],
    choices: [
      {
        id: 'sls04_tactic_trick',
        label: '【剪断磷线 · 反借鬼影惊贼】悄然挑断涂磷枯骨细线、以佛号借鬼影反吓破喽啰胆子！',
        subLabel: '惊散孙二、赵六，1v1 生擒洛阳摸金头目穿山鬼（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需已识破塔林盗墓真相，或实战身法 ≥ 35',
          conditions: [
            { type: 'flag', flag: 'sl_s04_ghost_debunked', op: 'truthy' },
            { type: 'combatStatAtLeast', key: 'agility', min: 35 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s04_tactic', value: 'ghost_trick' },
          addKarmaOnce('sl_s04_tactic_karma_done', 'sl_zen_merit', 1),
          openScene('scene_sls04_05_trick', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'sls04_tactic_direct',
        label: '【佛号震林 · 正面拿贼】一声狮子吼震彻塔林，持齐眉棍车轮连战摸金三贼！',
        subLabel: '零门槛正面连战赵六、孙二与穿山鬼（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_tactic', value: 'direct' },
          addKarmaOnce('sl_s04_tactic_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls04_05_gauntlet', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls04_05_trick: {
    id: 'scene_sls04_05_trick',
    title: '第五幕 · 磷骨惊贼 · 独战穿山',
    subtitle: '唐代舍利塔前 · 1v1 生擒头目',
    mandatory: true,
    beats: [
      N('你身形如狸猫掠上相邻砖塔阴影，齐眉棍尖悄无声息往头顶黑线一挑——「嘣」地轻响，那串涂满绿磷的枯骨连同磷粉竹筒骤然自古柏枝头凌空坠落，正砸在孙二与赵六脑门之上，绿荧荧的磷灰洒了二人满头满脸！'),
      P('（顺势运起丹田之气，自高塔背后发出一声苍老空洞的幽长佛号）“阿——弥——陀——佛——何方蟊贼，胆敢惊扰贫僧寂灭清修！”'),
      S(SPEAKER_RAIDER_SUN, '（本就做贼心虚，被绿火枯骨兜头一罩顿时魂飞魄散，拉着哇哇大哭的赵六扔掉洛阳铲连滚带爬往塔林外逃窜）“妈呀！唐代老和尚真显灵了！饶命啊——”'),
      S(SPEAKER_CHUANSHANGUI, '（先是一惊，随即瞧见塔影跃出的你，咬牙切齿抽出精钢分金铲）“两个没胆的蠢货！原来是少林小秃驴耍老子！少废话，今夜便拿你祭铲！”'),
    ],
    choices: [
      {
        id: 'sls04_fight_leader_solo',
        label: '稳守舍利塔基，1v1 生擒洛阳摸金头目【穿山鬼】（三流上品）',
        subLabel: '喽啰孙二、赵六已被反惊逃窜，直面头目穿山鬼',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildChuanshangui() },
            rule: 'story_trial',
            forbidEscapeReason: '穿山鬼凶狠毒辣，若纵其逃脱必毁高僧地宫！',
            introText: '【1v1 塔林擒酋】以鬼治鬼惊退喽啰，独战三流上品洛阳摸金头目【穿山鬼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls04_06', SHAOLIN_SIDE04_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被穿山鬼诡谲铲法逼退塔影！调息稳气后，可经【飞瀑深潭 · 试炼涧】再擒盗墓贼！',
                'warn',
                '塔林夜巡',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls04_05_gauntlet: {
    id: 'scene_sls04_05_gauntlet',
    title: '第五幕 · 砖塔迷阵 · 车轮拿贼',
    subtitle: '百座砖塔之间 · 车轮连战',
    mandatory: true,
    beats: [
      N('你足尖点地凌空跃出塔影，一声佛号震彻林梢，齐眉棍凌厉挑飞枝头磷粉竹筒，直落唐代舍利塔基之前！'),
      P('“阿弥陀佛！好胆的洛阳摸金贼，竟敢在少林高僧塔林装鬼盗陵！今夜休想带走一寸砖石！”'),
      S(SPEAKER_CHUANSHANGUI, '（凶光毕露，挥手喝令）“慌什么？不过是个外门小僧！赵六、孙二，轮番上阵先把他拍扁，再由老子拿分金铲结果了他！”'),
    ],
    choices: [
      {
        id: 'sls04_fight_all_gauntlet',
        label: '借砖塔地势腾挪，车轮连战【赵六】【孙二】与【穿山鬼】（三流上品）',
        subLabel: '依次迎战赵六（三流下品）、孙二（三流中品）与穿山鬼（三流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRaiderZhao() },
            extraOpponents: [
              { kind: 'custom', npc: buildRaiderSun() },
              { kind: 'custom', npc: buildChuanshangui() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是唐代高僧舍利地宫，宁折不退！',
            introText: '【车轮连战 · 砖塔护陵】迎战洛阳摸金贼【赵六】【孙二】与头目【穿山鬼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls04_06', SHAOLIN_SIDE04_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '砖塔夜战失手暂退松林！凝神调息后可经【飞瀑深潭 · 试炼涧】再度夜巡拿贼！',
                'warn',
                '塔林夜巡',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls04_06: {
    id: 'scene_sls04_06',
    title: '第六幕 · 棍破穿山 · 灵骨无损',
    subtitle: '舍利地宫入口',
    illustrationUrl: '/assets/quests/sl_s04_tomb_raiders.jpg',
    illustrationCaption: '砖塔迷阵 · 齐眉棍影破洛阳铲，生擒穿山鬼护住唐代高僧舍利地宫',
    mandatory: true,
    beats: [
      N('激战数十合，穿山鬼久攻不下，佯装败退之际回袖抖出一把灰白毒石灰！你早已防他这手下三滥伎俩，足尖一拧侧身避过，齐眉棍如出海蛟龙直点其右腕神门穴，「当啷」一声震落精钢分金铲，反手扣住其肩井将他按跪在唐代砖塔之前！'),
      S(SPEAKER_CHUANSHANGUI, '（肩骨剧痛，冷汗直流）“饶命……高僧饶命！封门青石才撬开一条缝，地宫里一件宝贝也没碰着啊！”'),
      N('方才激战声早已惊动巡夜武僧。不多时，慧刚师兄率数名持灯武僧疾步赶至，{ifFlagEq:sl_s04_tactic=ghost_trick|手里正提着方才被磷骨吓傻、一头撞进巡夜网里的孙二与赵六！|随即将瘫倒塔间的三名盗贼尽数用麻绳缚了个结实！}'),
      S(SPEAKER_PATROL_MONK, '（细查唐代莲花纹封门青石完好无损，合十长叹）“阿弥陀佛！多亏{gender:师弟|师妹}寒夜孤身护陵，否则唐代先祖灵骨若遭宵小惊扰，少林千年清名何存！”'),
    ],
    onFinishEffects: [openScene('scene_sls04_07', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_07: {
    id: 'scene_sls04_07',
    title: '第七幕 · 塔前善后 · 往生抑大牢',
    subtitle: '历代高僧塔林（战后抉择）',
    mandatory: true,
    beats: [
      N('东方天际微露鱼肚白。押贼启程之际，那名被绑在最末的苦力赵六忽然朝法如禅师砖塔磕得额头流血，泣不成声地供称自己原是山外穷樵夫，被穿山鬼骗来挖「废井」糊口，见是高僧墓塔早吓得不敢动铲。'),
      S(SPEAKER_PATROL_MONK, '（审视赵六粗糙满茧的砍柴手掌，又望向微微松动的封门石缝，转头问你）“穿山鬼与孙二乃北邙惯盗，自当押送登封县衙重办。只是这赵六似确系受骗贫民，且先辈灵塔受惊——依{gender:师弟|师妹}之见，塔林善后该如何处置？”'),
      N('晨风轻拂二百余座唐宋高僧砖塔，檐角铜铃清越微鸣，等待你的决断——'),
    ],
    choices: [
      {
        id: 'sls04_after_mercy',
        label: '【诵《往生咒》安灵 · 宽宥受骗苦力】亲立塔前诵经安抚先辈灵塔，宽宥赵六令其助石匠修封塔基赎过',
        subLabel: '慈悲安灵，明辨主从（禅心慈悲 +1 · 侠义 +20）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_aftermath', value: 'mercy' },
          addKarmaOnce('sl_s04_after_karma_done', 'sl_zen_merit', 1),
          { type: 'modifyChivalry', delta: 20, reason: '塔前诵《往生咒》安灵并宽宥受骗苦力' },
          openScene('scene_sls04_08', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'sls04_after_strict',
        label: '【尽数押送登封大牢 · 严办盗陵】盗掘先贤舍利地宫大逆不道，主从一律押交登封县大牢严办',
        subLabel: '雷霆护陵，严惩不贷（怒目杀业 +1 · 师门贡献更高）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s04_aftermath', value: 'strict' },
          addKarmaOnce('sl_s04_after_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls04_08', SHAOLIN_SIDE04_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls04_08: {
    id: 'scene_sls04_08',
    title: '第八幕 · 晓钟破雾 · 辞塔归崖',
    subtitle: '历代高僧塔林 · 晨曦微明',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s04_aftermath=mercy|你掸去僧袍尘土，立于唐代法如禅师砖塔前合十默诵三遍《往生咒》，声韵清越；受骗苦力赵六在旁磕头痛哭，随后老实挑来三合土与寺中石匠一同严严实实封好塔基。|慧刚领众武僧将穿山鬼、孙二与赵六尽数锁缚押送登封县大牢，随即请来寺中石匠以三合土重封塔基，严申塔林夜禁。}'),
      N('少林晨钟浑厚悠扬地响彻五乳峰峦。寒雾散尽，二百余座历代高僧砖塔沐浴在金色晨光之中，庄严肃穆，再无半点阴霾。'),
      N('思及韩河源仍在剑痕崖担惊受怕，你收起齐眉棍，步履轻快地返身行回达摩石洞。'),
    ],
    choices: [
      {
        id: 'sls04_return_cliff',
        label: '辞别高僧塔林，返回剑痕崖告知韩河源真相',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE04_QUEST_ID, 'return_report'),
          toast(
            '摸金贼已悉数生擒、舍利地宫安然无恙！请返回【绝壁石刻 · 剑痕崖（sl_damo_east）】告知韩河源。',
            'success',
            '塔林夜巡',
          ),
        ],
      },
    ],
  },

  scene_sls04_09: {
    id: 'scene_sls04_09',
    title: '第九幕 · 心魔尽散 · 剑崖复命',
    subtitle: '达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('回到剑痕崖时，韩河源正裹紧僧袍翘首以盼，见你安然归来连忙合十迎上。待听闻所谓「鬼火哭嚎」原是洛阳摸金贼涂磷粉、扯细线装神弄鬼盗墓，且穿山鬼已被你亲手擒获，韩河源先是一怔，继而满面惭愧又长舒一口气。'),
      S('NPC-0951', '“原来如此！世上本无孤魂野鬼，皆是弟子心生妄念、自扰方寸！{ifFlagEq:sl_s04_tactic=ghost_trick|更佩服师兄反借磷骨细线把盗贼吓得屁滚尿流，真是智勇双绝！|多亏师兄孤身夜战击退盗陵凶徒，护住了先辈灵骨！}”'),
      N('恰逢执事武僧送来罗汉堂嘉奖谕帖，记下你寒夜孤身护塔擒贼之功。{ifFlagEq:sl_s04_aftermath=mercy|寺中长老听闻你塔前诵《往生咒》安灵并明辨主从宽宥受骗樵夫，尤赞你深得禅心。|寺中长老听闻你雷霆破案、将盗陵贼一网打尽押交大牢，特加重师门功勋嘉奖。}'),
      P('（望向晨光照耀下的西侧塔林，心境愈发澄明）“妄念既除，塔林清净，咱们回寺做早课去吧。”'),
    ],
    choices: [
      {
        id: 'sls04_complete',
        label: '合十回礼，收下罗汉堂嘉奖（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 150, reason: '塔林寒夜力擒洛阳摸金贼穿山鬼' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s04_aftermath', op: 'eq', value: 'strict' },
            thenEffects: [{ type: 'addSectContribution', amount: 95 }],
            elseEffects: [{ type: 'addSectContribution', amount: 80 }],
          },
          { type: 'addArtExp', amount: 60 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s04_ghost_debunked', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyChivalry', delta: 15, reason: '夜巡少林塔林护住唐代高僧舍利地宫' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0951' }, delta: 15 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s04_aftermath', op: 'eq', value: 'mercy' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 30,
                reason: '完成门派差事《塔林寒夜 · 孤魂盗墓》并诵经安灵宽宥苦力',
              },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 25, reason: '完成门派差事《塔林寒夜 · 孤魂盗墓》' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE04_QUEST_ID, outcome: 'completed' },
          toast('已完成《塔林寒夜 · 孤魂盗墓》！获得师门贡献、实战历练、武学修为与经义进益！', 'success', '塔林夜巡'),
        ],
      },
    ],
  },
}
