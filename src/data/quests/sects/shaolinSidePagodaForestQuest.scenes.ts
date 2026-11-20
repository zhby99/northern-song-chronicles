import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
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
  title: '倒斗驴 · 洛阳摸金校尉',
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
    equippedArts: {
      neigong: 'MA-238',
      qinggong: 'MA-177',
      move1: 'MA-193',
      move2: 'MA-189',
    },
    learnedArts: [
      { artId: 'MA-238', level: 4 },
      { artId: 'MA-177', level: 3 },
      { artId: 'MA-193', level: 4 },
      { artId: 'MA-189', level: 3 },
    ],
  })
}

function buildRaiderZhao(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS04_RAIDER_ZHAO',
    name: '赵六',
    title: '倒斗驴 · 洛阳摸金贼',
    realm: '三流下品',
    factionName: '洛阳摸金贼',
    sectRank: 0,
    sectRankLabel: '摸金手下',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“先撒他一把生石灰，再拿洛阳铲拍扁他的光头！”',
    stats: { hp: 410, mp: 160, agi: 25, res: 13 },
    talents: { bone: 45, comprehension: 34, charm: 22 },
    equippedArts: {
      neigong: 'MA-199',
      qinggong: 'MA-218',
      move1: 'MA-209',
      move2: 'MA-196',
    },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-218', level: 3 },
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
    equippedArts: {
      neigong: 'MA-238',
      qinggong: 'MA-157',
      move1: 'MA-151',
      move2: 'MA-196',
      move3: 'MA-193',
    },
    learnedArts: [
      { artId: 'MA-238', level: 5 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-151', level: 5 },
      { artId: 'MA-196', level: 4 },
      { artId: 'MA-193', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls04_01: {
    id: 'scene_sls04_01',
    title: '第一幕 · 寒夜惊魂',
    subtitle: '达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}寒冬深夜，山风卷着枯叶掠过五乳峰峭壁。你行至剑痕崖时，只见新入门不久、负责塔林洒扫的沙弥韩河源正缩在石碑背风处，双手紧攥一柄木杖，脸色煞白、瑟瑟发抖。'),
      P('“韩师弟，夜深露重，你怎的独自守在这峭壁冷风里，不去禅房歇息？”'),
      S('NPC-0951', '（猛地回头，见是你方才长舒一口气，声音仍带颤意）“师兄……你可曾往西侧历代高僧塔林瞧过？接连三晚每逢亥子之交，百座砖塔间便浮起好几团幽绿鬼火，还伴着凄厉哭号与敲砖声！”'),
      S('NPC-0951', '“我白日扫叶时总觉得砖塔背后阴风阵阵，方才又见绿火在唐代法如禅师灵塔前飘来荡去，吓得魂不附体，实在不敢回西厢禅房合眼……”'),
    ],
    onFinishEffects: [openScene('scene_sls04_02', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_02: {
    id: 'scene_sls04_02',
    title: '第二幕 · 持棍夜巡',
    subtitle: '达摩石洞山径',
    mandatory: true,
    beats: [
      N('你凝眸望向西侧松林深处，只觉事有蹊跷。少林塔林乃历代得道高僧圆寂安奉之圣地，数百年来佛光清净，怎会无端闹鬼？更何况既伴有敲砖声，多半是江湖宵小借鬼神之名行苟且之事！'),
      P('“韩师弟莫慌，《金刚经》云『凡所有相，皆是虚妄』。少室山佛门净土，哪来的孤魂野鬼？既听闻敲砖异响，十有八九是蟊贼在塔林装神弄鬼。”'),
      S('NPC-0951', '“可……可那绿幽幽的鬼火就在半空飘着，还能凭空呼啸呢！师兄若要独往，千万小心！”'),
      P('“你且留在剑痕崖避风静坐、默诵清心经。我这就提齐眉棍往西侧试炼涧小径潜入塔林，倒要瞧瞧是何方妖魔鬼怪！”'),
    ],
    choices: [
      {
        id: 'sls04_accept',
        label: '安慰韩河源，持齐眉棍往飞瀑深潭试炼涧潜入塔林夜巡',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE04_QUEST_ID, stepId: 'patrol_pagoda_forest' },
          setStep(SHAOLIN_SIDE04_QUEST_ID, 'patrol_pagoda_forest'),
          toast('已接下塔林夜巡重任！请前往【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】潜入西侧塔林。', 'talk', '塔林夜巡'),
        ],
      },
    ],
  },

  scene_sls04_03: {
    id: 'scene_sls04_03',
    title: '第三幕 · 潜入塔林',
    subtitle: '飞瀑深潭 · 试炼涧西侧塔林',
    mandatory: true,
    beats: [
      N('你自试炼涧西侧古柏小径悄然绕行，不多时便踏入少林寺西侧的历代高僧塔林。残月如钩，二百余座唐、五代、宋初砖石墓塔矗立在荒草松影之间，森然肃穆。'),
      N('寒风穿行于密密麻麻的塔檐风铎之间，发出低沉呜咽。忽然，前方数十丈外的古柏林中亮起三团幽绿鬼火，飘飘忽忽贴着砖塔游移，紧接着便传来几声刻意压低的「咔嚓、咔嚓」撬砖闷响！'),
      N('你屏息敛气，运起轻功贴着塔影悄然逼近，手中齐眉棍横握身侧，绝不惊动林间宿鸟。'),
    ],
    onFinishEffects: [openScene('scene_sls04_04', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_04: {
    id: 'scene_sls04_04',
    title: '第四幕 · 塔林幽火',
    subtitle: '少林高僧塔林深处',
    illustrationUrl: '/assets/quests/sl_s04_pagoda_ghost.jpg',
    illustrationCaption: '塔林幽火 · 寒夜百座高僧砖塔磷火闪烁，识破摸金校尉伪装',
    mandatory: true,
    beats: [
      N('借着一尊五层砖塔的阴影，你距那几团幽火已不足三丈。夜风迎面吹来，鼻端顿时涌入一股刺鼻的磷粉腥味与桐油焦气！'),
      N('定睛细看，哪有什么孤魂野鬼？分明是三名黑衣汉子在斗笠和白布披风上涂满磷粉，又在古柏枝头吊了几个装满萤火磷膏的竹筒随风摇晃，借以吓退夜巡沙弥！'),
      N('此刻那三名盗贼正围在一座唐代高僧舍利砖塔基座前，两人挥动弯月形铁柄洛阳铲探土掘洞，另一名瘦高头目正拿铁钎撬动地宫入口的封门青石！'),
      S(SPEAKER_CHUANSHANGUI, '（压低沙哑嗓音催促）“手脚麻利些！那群胆小如鼠的小沙弥早被磷火吓破了胆，再掘开三尺便是唐代高僧的舍利地宫，里头的鎏金舍利函与古佛玉珠够咱们在洛阳逍遥半辈子！”'),
    ],
    onFinishEffects: [openScene('scene_sls04_05', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_05: {
    id: 'scene_sls04_05',
    title: '第五幕 · 揭穿鬼伎',
    subtitle: '唐代高僧舍利塔基前',
    mandatory: true,
    beats: [
      N('你眼中寒光一闪，足尖点地凌空跃出塔影，齐眉棍带起凌厉劲风，「呼」地一挑，便将吊在古柏枝头的磷粉竹筒击得粉碎，同时挑飞了离得最近那名盗贼头上的浸油白布！'),
      P('“阿弥陀佛！好胆的洛阳摸金贼，竟敢在少林高僧塔林涂磷装鬼、盗掘先辈舍利地宫！今夜撞在佛门弟子手里，休想带走一寸砖石！”'),
      S(SPEAKER_RAIDER_SUN, '（大惊失色，抄起洛阳铲）“不好！被少林武僧撞破了！”'),
      S(SPEAKER_CHUANSHANGUI, '（冷笑一声，眼中凶光毕露）“慌什么？不过是个毛头外门弟子！孙二、赵六，塔林离大雄宝殿远着呢，先乱铲结果了他，莫教他喊来罗汉堂那群老秃驴！”'),
    ],
    onFinishEffects: [openScene('scene_sls04_06', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_06: {
    id: 'scene_sls04_06',
    title: '第六幕 · 铲影初交',
    subtitle: '砖塔石巷（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('「钻地鼠」孙二与「倒斗驴」赵六厉喝一声，挥舞沉重铁柄洛阳铲一左一右合围而来！铲刃在寒月下泛起森冷幽光，招招直取下三路与咽喉要害！'),
      S(SPEAKER_RAIDER_ZHAO, '“嘿嘿，小和尚别怪爷心狠！撞见咱们倒斗，今夜只好把你埋在这塔底陪唐代老和尚念经了！”'),
      P('（棍交右手，沉气立桩）“玷污先辈灵塔的鼠辈，看棍！”'),
    ],
    choices: [
      {
        id: 'sls04_fight_minions',
        label: '借砖塔地势腾挪，以齐眉棍迎战孙二与赵六！（车轮连战 实战）',
        subLabel: '对手：孙二（三流中品）与赵六（三流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRaiderSun() },
            extraOpponents: [{ kind: 'custom', npc: buildRaiderZhao() }],
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '身后便是唐代高僧舍利地宫，宁折不退！',
            deathTitle: '血洒高僧塔林',
            deathDetail: '你在少林塔林寒夜力战洛阳摸金盗贼不敌，倒在砖塔之下。',
            introText: '【车轮连战 · 砖塔护陵】迎战持洛阳铲围攻的摸金贼【孙二】与【赵六】！',
            onWin: [openScene('scene_sls04_07', SHAOLIN_SIDE04_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_sls04_07: {
    id: 'scene_sls04_07',
    title: '第七幕 · 砖塔迷阵',
    subtitle: '百座砖塔之间',
    illustrationUrl: '/assets/quests/sl_s04_tomb_raiders.jpg',
    illustrationCaption: '砖塔迷阵 · 齐眉棍影破洛阳铲围攻，护住唐代高僧舍利地宫',
    mandatory: true,
    beats: [
      N('你借着百座砖塔纵横交错的间隙游走穿插，让两名盗贼的洛阳铲屡屡磕在青砖塔角之上，火星四溅！'),
      N('趁赵六扬手欲撒石灰包之际，你齐眉棍陡然化刺为扫，棍风卷起枯叶反将石灰吹回他满脸，随即回身一记「力劈华山」震飞孙二铁铲，连点二人软麻穴，两贼惨叫着栽倒在地！'),
      S(SPEAKER_CHUANSHANGUI, '（见手下瞬息落败，面色阴沉如铁，反手从背后抽出一柄寒光凛冽的精钢分金铲）“好俊的少林棍法！难怪敢孤身夜探塔林！小子，爷乃洛阳北邙『穿山鬼』，今日便拿你试铲！”'),
      P('（微调内息，齐眉棍斜指寒月）“不管你是穿山鬼还是过地龙，今夜既犯佛门禁地，便留下吧！”'),
    ],
    onFinishEffects: [openScene('scene_sls04_08', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_08: {
    id: 'scene_sls04_08',
    title: '第八幕 · 棍破穿山',
    subtitle: '唐代舍利塔前（1v1 实战）',
    mandatory: true,
    beats: [
      N('「穿山鬼」身法诡谲如狸猫，踩着砖塔阴影忽左忽右扑杀过来，精钢分金铲兼具刀劈棍扫之威，袖中更暗藏石灰毒沙！你凝神静气，全力迎战这名三流上品摸金头目！'),
    ],
    choices: [
      {
        id: 'sls04_fight_leader',
        label: '稳守中宫，正面力战洛阳摸金头目「穿山鬼」！（1v1 实战）',
        subLabel: '对手：穿山鬼（三流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildChuanshangui() },
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '穿山鬼凶狠毒辣，若纵其逃脱必毁高僧地宫！',
            deathTitle: '陨落塔林寒夜',
            deathDetail: '你在少林塔林与「穿山鬼」死斗落败，葬身寒夜。',
            introText: '【1v1 塔林擒酋】迎战三流上品洛阳摸金头目【穿山鬼】！',
            onWin: [openScene('scene_sls04_09', SHAOLIN_SIDE04_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_sls04_09: {
    id: 'scene_sls04_09',
    title: '第九幕 · 擒贼护骨',
    subtitle: '舍利地宫入口',
    mandatory: true,
    beats: [
      N('数十合激战之后，穿山鬼久攻不下，佯装败退之际猛地回袖抖出一把灰白毒粉！你早已提防他这手下三滥伎俩，足尖一拧侧身避过毒粉，齐眉棍如出海蛟龙直点其右腕神门穴！'),
      N('「当啷」一声，精钢分金铲脱手坠地！你欺身而进，一式少林擒拿反扣其肩井，顺势将穿山鬼按跪在唐代高僧砖塔之前！'),
      S(SPEAKER_CHUANSHANGUI, '（肩骨剧痛，冷汗直流）“饶命……高僧饶命！咱哥仨还没撬开地宫石门，一件宝贝也没碰着啊！”'),
      N('你低头细查塔基，所幸那块刻满唐代莲花纹的封门青石仅被撬开寸许缝隙，内里历代高僧舍利灵骨丝毫无损。'),
    ],
    onFinishEffects: [openScene('scene_sls04_10', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_10: {
    id: 'scene_sls04_10',
    title: '第十幕 · 晓钟押贼',
    subtitle: '塔林山道',
    mandatory: true,
    beats: [
      N('方才激战的兵刃交击声惊动了值夜武僧。不多时，数名提着灯笼与戒棍的罗汉堂武僧在慧刚师兄率领下疾步赶来，见地上捆着三名洛阳摸金贼与满地洛阳铲、磷粉竹筒，无不凛然赞叹。'),
      S(SPEAKER_PATROL_MONK, '“阿弥陀佛！幸亏师弟胆大心细、孤身夜巡识破奸计，否则唐代先祖灵塔若遭宵小盗掘，少林千年颜面何存！”'),
      S(SPEAKER_PATROL_MONK, '“这三个摸金贼交由我等连夜押交登封县衙法办，并即刻请寺中石匠以三合土重封塔基。师弟连番苦战辛苦了，且回禅院歇息吧。”'),
    ],
    onFinishEffects: [openScene('scene_sls04_11', SHAOLIN_SIDE04_QUEST_ID)],
  },

  scene_sls04_11: {
    id: 'scene_sls04_11',
    title: '第十一幕 · 塔前合十',
    subtitle: '历代高僧塔林',
    mandatory: true,
    beats: [
      N('待武僧押贼离去，东方天际已泛起一抹鱼肚白，少林晨钟浑厚悠扬地响彻五乳峰峦。塔林间寒雾散尽，二百余座高僧砖塔沐浴在晨曦微光之中，庄严肃穆。'),
      N('你掸去僧袍上的尘土，面向唐代高僧砖塔合十深躬，默诵半卷《金刚经》，心境愈发澄明通透。思及韩河源仍在剑痕崖担惊受怕，遂返身步回达摩石洞。'),
    ],
    choices: [
      {
        id: 'sls04_return_cliff',
        label: '辞别高僧塔林，返回剑痕崖告知韩河源真相',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE04_QUEST_ID, 'return_report'),
          toast('摸金贼已悉数生擒、舍利地宫安然无恙！请返回【绝壁石刻 · 剑痕崖（sl_damo_east）】告知韩河源。', 'success', '塔林夜巡'),
        ],
      },
    ],
  },

  scene_sls04_12: {
    id: 'scene_sls04_12',
    title: '第十二幕 · 心魔尽散',
    subtitle: '达摩面壁石洞 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你回到剑痕崖时，韩河源正翘首以盼，见你安然归来，连忙迎上前合十施礼。待听闻所谓「鬼火」原是洛阳摸金贼涂磷粉装鬼盗墓，且三贼已全数被你棍下生擒，韩河源先是一怔，继而满面惭愧又长舒一口气。'),
      S('NPC-0951', '“原来如此！世上本无鬼怪，皆是弟子心生妄念、自扰方寸！多亏师兄智勇兼备，不仅护住了历代高僧灵骨，更破了弟子心中魔障！”'),
      N('恰逢执事武僧送来罗汉堂嘉奖谕帖，记下你寒夜孤身护塔擒贼之功，赐下师门功勋与行功心得。经过此夜连战与经义印证，你亦觉武学根基与禅心俱有精进。'),
    ],
    choices: [
      {
        id: 'sls04_complete',
        label: '合十回礼，收下师门嘉奖（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 150, reason: '塔林寒夜连败三名洛阳摸金贼' },
          { type: 'addSectContribution', amount: 80 },
          { type: 'addArtExp', amount: 60 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyChivalry', delta: 15, reason: '夜巡少林塔林护住唐代高僧舍利地宫' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0951' }, delta: 15 },
          { type: 'modifyRenown', delta: 25, reason: '完成门派差事《塔林寒夜 · 孤魂盗墓》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE04_QUEST_ID, outcome: 'completed' },
          toast('已完成《塔林寒夜 · 孤魂盗墓》！获得师门贡献、实战历练、武学修为与经义进益！', 'success', '塔林夜巡'),
        ],
      },
    ],
  },
}
