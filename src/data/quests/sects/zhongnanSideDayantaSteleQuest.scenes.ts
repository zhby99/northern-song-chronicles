import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE04_QUEST_ID } from './zhongnanSideDayantaSteleQuest'

const SPEAKER_LIAO_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '大辽南院细作 · 耶律墨',
  title: '伪装拓碑匠的辽国暗探',
  factionName: '大辽南院',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

function buildLiaoSpy(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS04_LIAO_SPY',
    name: '大辽南院细作 · 耶律墨',
    title: '伪装拓碑匠的辽国暗探',
    realm: '二流中品',
    factionName: '大辽南院',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“哼，一个终南小道士也敢坏我大辽南院大事！既看穿了拓片夹层，今日便留你不得！”',
    stats: { hp: 1120, mp: 540, agi: 48, res: 40 },
    talents: { bone: 66, comprehension: 72, charm: 52 },
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-119',
      move1: 'MA-115',
      move2: 'MA-118',
    },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-119', level: 5 },
      { artId: 'MA-115', level: 5 },
      { artId: 'MA-118', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns04_01: {
    id: 'scene_zns04_01',
    title: '第一幕 · 雁塔摩碑',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    illustrationUrl: '/assets/quests/zn_side04_dayanta_stele.jpg',
    illustrationCaption: '大雁塔青砖碑廊之下，刘敞俯首辨识先秦石鼓拓本，古意盎然',
    mandatory: true,
    beats: [
      N('{reignYear}秋风送爽，慈恩寺大雁塔巍然耸立。东侧回廊碑林间，博古通今的北宋金石名家刘敞正手持放大水晶镜，神情专注地比对一幅先秦石鼓文拓本与周代钟鼎铭文。'),
      S(
        'NPC-0100',
        '（见你驻足碑前、目露精光，微笑颔首）“这位终南道友看这褚遂良《雁塔圣教序》与先秦石鼓拓本的眼神，绝非外行。不知对这『车攻马同』数个大篆古字，有何高见？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns04_02', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_02: {
    id: 'scene_zns04_02',
    title: '第二幕 · 石鼓篆韵',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      P(
        '（拱手细观拓片，娓娓道来）“晚辈观此石鼓笔势，浑厚古拙中藏着圆转刚劲，起笔藏锋如剑气内敛，收笔稳健似秦岭山根，确是周秦气象，与我道家吐纳之韵竟有几分暗合。”',
      ),
      S(
        'NPC-0100',
        '（大喜抚须）“妙极！以剑意通书道，以古篆参玄机！老夫正苦于人手不足，欲将这几通残缺古碑重新校对拓印，{gender:少侠|女侠}若不嫌烦琐，可愿搭把手？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns04_03', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_03: {
    id: 'scene_zns04_03',
    title: '第三幕 · 拓匠异状',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('你欣然应允，帮刘敞展纸研墨。校对至第三通古碑时，廊角一名低头拓碑的青衣拓匠忽然引起你的注意——他手指虎口生着厚茧，明明是常年握刀拉弓的练家子，装作书生拓纸却笨拙僵硬。'),
      N('更令你心头一凛的是，他趁人不备，竟用极细的狼毫在两层宣纸夹层间飞快点染着某种契丹密记符号，墨迹一干便隐于碑文拓黑之中！'),
    ],
    onFinishEffects: [openScene('scene_zns04_04', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_04: {
    id: 'scene_zns04_04',
    title: '第四幕 · 暗通师姐',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('你不动声色，借口去塔下取清水，恰在石阶旁遇见奉命驻守长安暗线的终南同门谭婉翠。你将碑廊所见低声相告。'),
      S(
        'NPC-0783',
        '（眸中寒芒一闪，压低声音）“好眼力！近半月大辽南院有批密探潜入长安，正愁他们怎么把永兴军路布防图带出潼关——原来是借拓印大雁塔碑帖作掩护！咱们立刻合围，绝不能让他逃了！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns04_05', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_05: {
    id: 'scene_zns04_05',
    title: '第五幕 · 封锁回廊',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      P('“师姐守住东廊出口，我先护住刘敞先生，当场拆穿那奸细！”'),
    ],
    choices: [
      {
        id: 'zns04_start_catch',
        label: '折返碑廊护住刘敞，联手谭婉翠擒拿大辽南院细作',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE04_QUEST_ID, stepId: 'catch_liao_spy_tower' },
          openScene('scene_zns04_06', ZHONGNAN_SIDE04_QUEST_ID),
        ],
      },
    ],
  },

  scene_zns04_06: {
    id: 'scene_zns04_06',
    title: '第六幕 · 当堂拆穿',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    illustrationUrl: '/assets/quests/zn_side04_spy_duel.jpg',
    illustrationCaption: '大雁塔回廊墨砚飞溅，终南弟子与谭婉翠联手截杀现形的大辽细作',
    mandatory: true,
    beats: [
      N('那名青衣拓匠刚将夹层拓纸卷入竹筒准备溜走，你已飘然挡在他身前，谭婉翠亦自廊口反手拔剑封死退路！'),
      P('（冷笑一声）“这位『拓碑匠』，大宋先秦石鼓文里，几时多出了契丹南院的关隘密记？”'),
      S(SPEAKER_LIAO_SPY, '（脸色骤变，猛地掀翻拓案，自竹筒中抽出一柄寒光森森的契丹弯刀）“哼！被终南鹰犬识破了！受死吧！”'),
    ],
    choices: [
      {
        id: 'zns04_fight_spy',
        label: '联手谭婉翠，于大雁塔回廊擒拿【大辽南院细作 · 耶律墨】！',
        subLabel: '对手：大辽南院细作（二流中品）· 助阵：谭婉翠',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiaoSpy() },
            allies: [{ kind: 'npc', npcId: 'NPC-0783' }],
            rule: 'story_trial',
            introText: '【塔影擒谍】与谭婉翠联手在大雁塔碑廊截击【大辽南院细作 · 耶律墨】！',
            onWin: [openScene('scene_zns04_07', ZHONGNAN_SIDE04_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('这辽国细作刀法狠辣暗藏毒镖！调息后再行联手擒拿！', 'warn', '雁塔题名'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns04_07: {
    id: 'scene_zns04_07',
    title: '第七幕 · 缴获密图',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('你与谭婉翠双剑一正一奇，护着千年古碑不沾半点刀痕，十余合便将耶律墨震落弯刀、反剪擒拿！'),
      S('NPC-0783', '（剖开竹筒夹层，取出一幅画满关中烽燧与粮道的绢图，冷笑道）“果然是永兴军路边防暗图！多亏{gender:师弟|师妹}火眼金睛，这细作我立刻押送京兆府衙！”'),
    ],
    onFinishEffects: [openScene('scene_zns04_08', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_08: {
    id: 'scene_zns04_08',
    title: '第八幕 · 金石无恙',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('待谭婉翠押走细作，刘敞方才抚胸长叹，眼中满是惊佩与感激。'),
      S(
        'NPC-0100',
        '“好险！老夫只顾埋首故纸堆，竟不知身边藏着辽国奸细！若非{gender:少侠|女侠}识破密记、护住古碑，不但关中边防泄密，这几通唐代名碑怕也要遭兵刃之灾！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns04_09', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_09: {
    id: 'scene_zns04_09',
    title: '第九幕 · 亲授篆法',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('为酬谢你护碑擒谍之功，刘敞取出自己珍藏多年的《先秦石鼓钟鼎释文手稿》，在塔下青石案前逐字为你讲解大篆悬针、垂露、金错刀笔法。'),
      S('NPC-0100', '“书道与剑道一样，贵在骨力苍劲、气脉贯通。这番石鼓篆籀心法，老夫倾囊相授，愿{gender:少侠|女侠}笔下生风、剑下生辉！”'),
    ],
    onFinishEffects: [openScene('scene_zns04_10', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_10: {
    id: 'scene_zns04_10',
    title: '第十幕 · 笔剑通神',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('你凝神临摹石鼓古字，只觉平日练剑时的腕底劲力与提按顿挫豁然融通，一撇一捺皆隐含金石雄浑气象，书法造诣大为精进！'),
    ],
    onFinishEffects: [openScene('scene_zns04_11', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_11: {
    id: 'scene_zns04_11',
    title: '第十一幕 · 雁塔题名',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      P('（向刘敞深深一揖）“蒙先生赐教先秦金石笔意，晚辈获益匪浅！今日雁塔擒谍护碑，亦算不负长安秋色。”'),
      S('NPC-0100', '（抚须大笑）“昔日进士雁塔题名，今日终南侠客雁塔擒谍，传出去定是一段风雅佳话！”'),
    ],
    onFinishEffects: [openScene('scene_zns04_12', ZHONGNAN_SIDE04_QUEST_ID)],
  },

  scene_zns04_12: {
    id: 'scene_zns04_12',
    title: '第十二幕 · 古碑长存',
    subtitle: '京兆府 · 慈恩寺大雁塔',
    mandatory: true,
    beats: [
      N('暮钟悠扬，夕阳洒满慈恩寺大雁塔飞檐。你携着满腹金石笔意与擒谍之功辞别刘敞，心境愈发沉厚清朗。'),
    ],
    choices: [
      {
        id: 'zns04_complete',
        label: '铭记先秦石鼓笔意，圆满完成雁塔考碑擒谍之行',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '书', delta: 3 },
          { type: 'giveCombatExp', amount: 340, reason: '雁塔题名 · 先秦石鼓考' },
          { type: 'modifyRenown', delta: 45, reason: '大雁塔识破并擒获大辽南院细作' },
          { type: 'modifyChivalry', delta: 25, reason: '护持关中边防与千年古碑' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0100' }, delta: 16 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0783' }, delta: 14 },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE04_QUEST_ID, outcome: 'stele_spy_caught' },
          toast(
            '【雁塔题名 · 先秦石鼓考】完成！书法+3，获丰厚战历与江湖名望！',
            'success',
            '雁塔题名',
          ),
        ],
      },
    ],
  },
}
