import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE08_QUEST_ID } from './zhongnanSideColdStreamTeaQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns08_01: {
    id: 'scene_zns08_01',
    title: '第一幕 · 煮雪烹茗',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_side08_winter_tea.jpg',
    illustrationCaption: '腊月雪霁松梅映瀑，终南诸老围坐石案煮雪烹茗，抚琴清歌',
    mandatory: true,
    beats: [
      N('{reignYear}腊月雪霁，寒玉涧银练飞瀑两岸苍松挂雪、翠竹含霜、数株老梅傲寒绽放红蕊。青石茗案上红泥小炉火光融融，孙清静正以梅梢积雪烹煮终南松针茶，王处阳与冷清秋分坐两旁。'),
      S('NPC-1059', '（见你踏雪而来，笑意盈盈）“{gender:师弟|师妹}琴心诗骨日渐澄明，今日岁寒三友雅集，正缺一位能抚《梅花三弄》、又能联句咏雪的知音！”'),
    ],
    onFinishEffects: [openScene('scene_zns08_02', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_02: {
    id: 'scene_zns08_02',
    title: '第二幕 · 联句咏怀',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-1057', '（执盏微笑，率先吟道）“『太乙雪深松骨健，寒泉石冷道心清。』轮到清秋师妹与{gender:师弟|师妹}续句了！”'),
      S('NPC-0173', '（凝视崖畔寒梅，清声接道）“『孤梅不向红尘笑，独伴幽篁听玉声。』”'),
      P('（轻啜一口滚烫松茗，欣然续尾）“『何须远觅蓬莱境，一曲清商万里明。』”'),
    ],
    onFinishEffects: [openScene('scene_zns08_03', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_03: {
    id: 'scene_zns08_03',
    title: '第三幕 · 寒涧抚琴',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('三老闻句齐声抚掌赞妙。冷清秋亲手将一张焦尾古琴置于石案之上，邀你抚曲助兴。'),
      N('你净手焚香，十指轻拨冰弦。起初琴声如松间落雪窸窣轻灵，继而如银练飞瀑奔涌清越，竟将终南内息韵律融于宫商角徵羽五音之中，绕谷三匝不绝！'),
    ],
    onFinishEffects: [openScene('scene_zns08_04', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_04: {
    id: 'scene_zns08_04',
    title: '第四幕 · 东海来客',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('一曲将终之际，涧口竹林间忽有清亮掌声应节响起！一名青衫磊落、神采飞扬的江湖客踏雪而来，腰悬短箫与长剑，正是远游关中的东海桃花岛传人——曲松璋！'),
      S(
        'NPC-0542',
        '（拱手朗笑，不卑不亢）“在下东海桃花岛曲松璋，久游长安，今日偶经终南山麓，闻寒涧琴声清越绝俗，竟暗合音律武学至理，一时见猎心喜冒昧登谷，还望诸位终南高人勿怪！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns08_05', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_05: {
    id: 'scene_zns08_05',
    title: '第五幕 · 闻琴试剑',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-1057', '（抚须笑道）“原来是东海桃花岛的高徒！桃花岛素以琴箫剑艺冠绝东南，既闻琴而来，便是有缘之客！”'),
      S(
        'NPC-0542',
        '（目光炽热地望向你）“方才听这位终南{gender:少侠|女侠}琴韵中竟藏着上乘剑意！在下不才，愿以桃花岛武学向{gender:少侠|女侠}请教几招，以剑印琴、点到为止，不知可否赏脸？”',
      ),
    ],
    choices: [
      {
        id: 'zns08_accept_spar',
        label: '欣然离案拔剑，与东海桃花岛曲松璋以剑印琴',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE08_QUEST_ID, stepId: 'spar_qu_songzhang' },
          openScene('scene_zns08_06', ZHONGNAN_SIDE08_QUEST_ID),
        ],
      },
    ],
  },

  scene_zns08_06: {
    id: 'scene_zns08_06',
    title: '第六幕 · 音律交锋',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_side08_qin_sword_spar.jpg',
    illustrationCaption: '飞瀑白雪之间，终南弟子与桃花岛曲松璋以剑印琴，招式清雅飘逸',
    mandatory: true,
    beats: [
      P('（微笑起身拔剑，剑尖轻点积雪）“东海桃花岛音律武学名动天下，晚辈亦久仰久矣！曲兄请赐教！”'),
      N('孙清静顺手接过焦尾古琴，轻拨《广陵》清音为二人助兴。刹那间琴声铿锵，雪地双影翻飞！'),
    ],
    choices: [
      {
        id: 'zns08_fight_qu',
        label: '随琴声节拍，与桃花岛【曲松璋】切磋试剑！（点到为止）',
        subLabel: '对手：曲松璋（三流上品）',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE08_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0542' },
            rule: 'spar',
            introText: '【闻琴试剑】在银练飞瀑石茗案前，随琴声节拍与东海桃花岛【曲松璋】切磋！',
            onWin: [openScene('scene_zns08_07', ZHONGNAN_SIDE08_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('曲松璋身法灵动暗合音律！品一盏热茗后再来切磋助兴！', 'warn', '寒涧松茗'),
            ],
            onDraw: [openScene('scene_zns08_07', ZHONGNAN_SIDE08_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_zns08_07: {
    id: 'scene_zns08_07',
    title: '第七幕 · 琴终剑收',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('恰在孙清静最后一记泛音清越收尾的刹那，你顺着琴音余韵挽出一朵凌空雪花，长剑轻点曲松璋袖口三寸之外，飘然收剑而立！'),
      S(
        'NPC-0542',
        '（收招抱拳，爽朗大笑）“妙！妙极了！剑招严合五音节拍，收放自如而无半分戾气！终南隐宗的琴剑风雅，当真令曲某大开眼界！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns08_08', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_08: {
    id: 'scene_zns08_08',
    title: '第八幕 · 围炉共茗',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('冷清秋亲手替曲松璋斟上一盏热气腾腾的寒涧松茗，众人重归石案围炉而坐。曲松璋亦取出随身玉箫，与你合奏一曲《沧海龙吟》配《终南雪韵》，东海之浩渺与秦岭之高古水乳交融！'),
    ],
    onFinishEffects: [openScene('scene_zns08_09', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_09: {
    id: 'scene_zns08_09',
    title: '第九幕 · 东海音谱',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S(
        'NPC-0542',
        '（合奏毕，慨然取出一卷手抄《东海商羽指法残谱》相赠）“高山流水，难得一遇知音！这卷桃花岛音律指法心得与几首海岛题梅旧词，便赠与{gender:少侠|女侠}参详！”',
      ),
      P('（双手接过谱卷，欢喜致谢）“曲兄雅量高致，这份厚礼我便愧领了！”'),
    ],
    onFinishEffects: [openScene('scene_zns08_10', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_10: {
    id: 'scene_zns08_10',
    title: '第十幕 · 琴心大进',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你细览东海音谱，再与方才孙清静、冷清秋二位师长的琴理诗意相互印证，只觉胸中灵犀大开，琴艺与诗词造诣皆豁然精进！'),
    ],
    onFinishEffects: [openScene('scene_zns08_11', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_11: {
    id: 'scene_zns08_11',
    title: '第十一幕 · 宾主尽欢',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('日暮将近，曲松璋长揖辞别，相约他日东海桃花岛再续琴剑之缘。孙清静、王处阳与冷清秋目送远客踏雪下山，俱皆含笑颔首。'),
      S('NPC-0173', '“岁寒知松柏，雪夜遇知音。今日这一场寒涧松茗，足可入我终南山志。”'),
    ],
    onFinishEffects: [openScene('scene_zns08_12', ZHONGNAN_SIDE08_QUEST_ID)],
  },

  scene_zns08_12: {
    id: 'scene_zns08_12',
    title: '第十二幕 · 岁寒清韵',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('炉火余温犹暖，飞瀑清音常在。你抱琴立于苍松红梅之间，只觉这一日岁寒雅集，胜过尘世万千喧嚣。'),
    ],
    choices: [
      {
        id: 'zns08_complete',
        label: '珍藏东海音谱，圆满结束岁寒三友雅集',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '琴', delta: 2 },
          { type: 'modifySkill', key: '诗词', delta: 1 },
          { type: 'giveCombatExp', amount: 360, reason: '寒涧松茗 · 岁寒三友会' },
          { type: 'modifyRenown', delta: 45, reason: '寒玉涧琴剑会东海桃花岛传人' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1059' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1057' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0542' }, delta: 18 },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE08_QUEST_ID, outcome: 'cold_stream_tea_complete' },
          toast(
            '【寒涧松茗 · 岁寒三友会】完成！琴+2、诗词+1，获丰厚战历与诸位师长好感！',
            'success',
            '寒涧松茗',
          ),
        ],
      },
    ],
  },
}
