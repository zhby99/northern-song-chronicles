import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE02_QUEST_ID } from './huashanSideQinlingHerbQuest'

const SPEAKER_PILL_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '苏明远',
  title: '玉女峰丹房执事弟子',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
}

const SPEAKER_SHEN_QINGDAI: StorySpeakerSpec = {
  kind: 'custom',
  name: '沈青黛',
  title: '关中药王庙一脉 · 游方女医',
  factionName: '关中杏林',
  portraitUrl: '/assets/characters/templates/tpl_baicao_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_baicao_female_av.jpg',
}

const SPEAKER_POACHER_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '麻脸熊二',
  title: '洛阳雇佣恶猎户',
  factionName: '秦岭盗药客',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildPoacher1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS02_POACHER_1',
    name: '麻脸熊二',
    title: '洛阳雇佣恶猎户',
    realm: '三流下品',
    factionName: '秦岭盗药客',
    sectRank: 0,
    sectRankLabel: '盗药恶猎',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“洛阳大东家出价百两买这株紫阳老参，识相的滚一边去！”',
    stats: { hp: 370, mp: 140, agi: 21, res: 13 },
    talents: { bone: 45, comprehension: 32, charm: 22 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-217', move1: 'MA-210', move2: 'MA-189' },
    learnedArts: [
      { artId: 'MA-229', level: 2 },
      { artId: 'MA-217', level: 2 },
      { artId: 'MA-210', level: 3 },
      { artId: 'MA-189', level: 2 },
    ],
  })
}

function buildPoacher2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS02_POACHER_2',
    name: '刀疤柴四',
    title: '洛阳雇佣恶猎户',
    realm: '三流下品',
    factionName: '秦岭盗药客',
    sectRank: 0,
    sectRankLabel: '盗药恶猎',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“华山派管得倒宽！这深山老林里杀了你，谁知道是我们哥俩干的？”',
    stats: { hp: 390, mp: 150, agi: 22, res: 14 },
    talents: { bone: 47, comprehension: 34, charm: 23 },
    equippedArts: { neigong: 'MA-229', qinggong: 'MA-218', move1: 'MA-209', move2: 'MA-210' },
    learnedArts: [
      { artId: 'MA-229', level: 3 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-209', level: 3 },
      { artId: 'MA-210', level: 3 },
    ],
  })
}

function buildQinlingTiger(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS02_TIGER',
    name: '秦岭吊睛猛虎',
    title: '终南山涧 · 凶戾大虫',
    realm: '三流中品',
    factionName: '秦岭猛兽',
    sectRank: 0,
    sectRankLabel: '山林恶兽',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“嗷呜——！”（腥风骤起，铜铃虎目在夜雨火光中泛出幽冷杀机！）',
    stats: { hp: 620, mp: 260, agi: 32, res: 18 },
    talents: { bone: 60, comprehension: 30, charm: 20 },
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-198',
      move1: 'MA-125',
      move2: 'MA-143',
    },
    learnedArts: [
      { artId: 'MA-229', level: 4 },
      { artId: 'MA-198', level: 4 },
      { artId: 'MA-125', level: 3 },
      { artId: 'MA-143', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss02_01: {
    id: 'scene_hss02_01',
    title: '第一幕 · 丹房缺药',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('{reignYear}秋意渐深，东峰紫气迎曦石坪丹房内药炉青烟袅袅。执事师兄苏明远正对着几本泛黄药典愁眉不展，见你路过，赶忙招手相邀。'),
      S(SPEAKER_PILL_DISCIPLE, '“{gender:师弟|师妹}留步！听说你素日熟读典籍、颇通经义本草，眼下丹房正好有一桩急务非你莫属！”'),
      P('“苏师兄但说无妨，可是炼制清心丹药缺了什么紧要药引？”'),
      S(SPEAKER_PILL_DISCIPLE, '“正是！冬月将近，掌门与诸位师叔需炼制一批『太乙回气清心散』备供门下弟子御寒调息，偏偏缺了一味生于秦岭阴涧石壁的『太白紫阳老参』。此参极易与毒草『乌头假参』混淆，非通晓经义药理者不敢轻采。”'),
    ],
    onFinishEffects: [openScene('scene_hss02_02', HUASHAN_SIDE02_QUEST_ID)],
  },

  scene_hss02_02: {
    id: 'scene_hss02_02',
    title: '第二幕 · 领命西行',
    subtitle: '东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      S(SPEAKER_PILL_DISCIPLE, '“据终南山采药人回报，长安南郊终南草堂寺西侧的秦岭古洞溪涧一带，近日曾见紫阳参叶吐露赤晕。{gender:师弟|师妹}若愿跑这一趟，师兄自当禀明丹房长老记你一笔头等功劳！”'),
      P('“既关乎同门冬月调息之需，弟子义不容辞。这就整备行囊，西赴长安终南草堂寺外寻参。”'),
    ],
    choices: [
      {
        id: 'hss02_accept',
        label: '接过药图，启程前往长安终南草堂寺西厢外寻采紫阳参',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE02_QUEST_ID, stepId: 'search_qinling' },
          setStep(HUASHAN_SIDE02_QUEST_ID, 'search_qinling'),
          toast('已领丹房采药之托！请前往【长安 · 终南草堂寺 · 西厢（ca_caotang_west）】寻访紫阳老参。', 'talk', '秦岭采参'),
        ],
      },
    ],
  },

  scene_hss02_03: {
    id: 'scene_hss02_03',
    title: '第三幕 · 溪涧惊呼',
    subtitle: '长安 · 终南草堂寺西厢外秦岭古洞',
    mandatory: true,
    beats: [
      N('你一路西行抵长安，绕过终南草堂寺西厢，沿着苔痕斑驳的山径深入秦岭古洞溪涧。涧水清冽，松风阵阵，空气中隐隐飘来一缕醇厚参香。'),
      N('正欲循香攀岩寻觅，前方古洞外的溪石旁忽传来一声清脆怒斥与粗野哄笑！'),
      S(SPEAKER_SHEN_QINGDAI, '“住手！这株太白紫阳参是我沿悬崖采了整整三日才得来救治疫村老幼的，你们凭什么持械硬抢！”'),
      S(SPEAKER_POACHER_A, '“嘿嘿，小娘子少拿药王庙那套仁义大道理唬人！洛阳城里的富商老爷出价百两银子悬赏秦岭老参，今日要么留下药篓，要么连你一并绑走！”'),
      N('只见一名背负药篓、身着素青医衫的年轻女子手握鹤嘴药锄退至溪石边缘，身前两名手持叉虎铁枪与厚背砍刀的恶猎户步步紧逼！'),
    ],
    onFinishEffects: [openScene('scene_hss02_04', HUASHAN_SIDE02_QUEST_ID)],
  },

  scene_hss02_04: {
    id: 'scene_hss02_04',
    title: '第四幕 · 溪涧护医',
    subtitle: '秦岭古洞外溪涧（车轮连战 实战）',
    illustrationUrl: '/assets/quests/hs_side02_qinling_rescue.jpg',
    illustrationCaption: '溪涧护医 · 秦岭古洞外拔剑击退恶猎户，救下游方女医沈青黛',
    mandatory: true,
    beats: [
      N('你踏水跃上青石，青钢长剑“呛啷”出鞘，寒芒直指两名恶猎户面门！'),
      P('“光天化日之下欺凌弱女、强夺救命灵药，好大的狗胆！速速滚开，免受皮肉之苦！”'),
      S(SPEAKER_POACHER_A, '（见你一身华山弟子装束，眼露凶光）“哪来的华山小道士多管闲事！柴四，先捅翻这雏儿再抢老参！”'),
    ],
    choices: [
      {
        id: 'hss02_fight_poachers',
        label: '拔剑护住女医，迎战两名盗药恶猎户！（车轮连战 生死战）',
        subLabel: '对手：麻脸熊二与刀疤柴四（三流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoacher1() },
            extraOpponents: [{ kind: 'custom', npc: buildPoacher2() }],
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '身后女医手无缚鸡之力，岂能弃之而逃！',
            deathTitle: '血溅秦岭涧',
            deathDetail: '你在秦岭古洞外为护游方女医与恶猎户死斗不敌，饮恨溪涧。',
            introText: '【车轮连战 · 溪涧护医】拔剑迎战受洛阳豪商雇佣的恶猎户【麻脸熊二】与【刀疤柴四】！',
            onWin: [openScene('scene_hss02_05', HUASHAN_SIDE02_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss02_05: {
    id: 'scene_hss02_05',
    title: '第五幕 · 杏林结缘',
    subtitle: '秦岭古洞溪畔',
    mandatory: true,
    beats: [
      N('你剑法灵动，数合间挑飞熊二手中叉虎枪、震伤柴四虎口。两名恶猎户见势不妙，丢下兵刃连滚带爬逃入密林。'),
      S(SPEAKER_SHEN_QINGDAI, '（敛衽行礼，神色感激）“多谢华山派{gender:少侠|女侠}拔剑相助！小女子沈青黛，出自关中孙真人药王庙一脉，此番入秦岭采药本为配制解毒扶正汤剂，若非恩公及时现身，真不知如何是好。”'),
      P('“沈姑娘不必多礼。实不相瞒，在下亦是奉华山丹房之命，前来秦岭寻采太白紫阳老参。”'),
      S(SPEAKER_SHEN_QINGDAI, '（眸光一亮）“原来恩公也是寻紫阳参！天色将暮，山间骤起急雨，前路湿滑难行。不如先随我在古洞避雨生火，待明晨我便指点恩公分辨老参崖穴，顺道探讨几句本草经义。”'),
    ],
    onFinishEffects: [openScene('scene_hss02_06', HUASHAN_SIDE02_QUEST_ID)],
  },

  scene_hss02_06: {
    id: 'scene_hss02_06',
    title: '第六幕 · 夜雨虎啸',
    subtitle: '秦岭古洞篝火旁',
    mandatory: true,
    beats: [
      N('入夜后山雨倾盆，古洞内燃起一簇松枝篝火。沈青黛一边烘烤湿衣，一边向你细细讲解太白紫阳参与乌头假参的脉络异同，引经据典，令你于《神农本草》与医道经义豁然开朗。'),
      N('忽在三更将近之际，洞外雨幕中骤然炸响一声震彻山谷的凄厉虎啸！火光晃动间，一股浓烈血腥恶风扑入洞口！'),
      S(SPEAKER_SHEN_QINGDAI, '（骤然失色）“不好！是秦岭深处伤人无数的吊睛斑斓猛虎！它嗅到我药篓里的新鲜参气与林间血腥，竟寻到洞口来了！”'),
      N('一头额生王字、目如铜铃的斑斓巨虎伏低前爪，喉间滚出低沉咆哮，下一瞬便化作一道恶风直扑篝火！'),
    ],
    onFinishEffects: [openScene('scene_hss02_07', HUASHAN_SIDE02_QUEST_ID)],
  },

  scene_hss02_07: {
    id: 'scene_hss02_07',
    title: '第七幕 · 山涧斩虎',
    subtitle: '夜雨古洞外溪石（1v1 实战）',
    illustrationUrl: '/assets/quests/hs_side02_night_tiger.jpg',
    illustrationCaption: '山涧斩虎 · 夜雨篝火旁孤剑力毙秦岭吊睛猛虎，得赠紫阳老参',
    mandatory: true,
    beats: [
      N('你大喝一声，将沈青黛护在古洞石壁后，足尖一点冲出洞口迎入夜雨之中！青钢长剑在电闪雷鸣下寒光如雪！'),
      P('“畜生休得伤人！看剑！”'),
    ],
    choices: [
      {
        id: 'hss02_fight_tiger',
        label: '孤剑踏雨，迎战秦岭吊睛猛虎！（1v1 生死战）',
        subLabel: '对手：三流中品秦岭吊睛猛虎',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_SIDE02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQinlingTiger() },
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '恶虎封住洞口，退一步便是死路！',
            deathTitle: '葬身虎口',
            deathDetail: '你在秦岭夜雨山涧力战吊睛猛虎不敌，命丧恶兽利爪之下。',
            introText: '【1v1 夜雨斩虎】在山涧雨幕中孤剑迎战三流中品【秦岭吊睛猛虎】！',
            onWin: [openScene('scene_hss02_08', HUASHAN_SIDE02_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss02_08: {
    id: 'scene_hss02_08',
    title: '第八幕 · 剑毙凶兽',
    subtitle: '秦岭古洞外雨霁初晓',
    mandatory: true,
    beats: [
      N('暴雨倾盆，猛虎扑击势若雷霆，钢尾横扫带起漫天泥水。你凝神运转《华山基础心法》，借滑湿岩面闪转腾挪，诱使恶虎扑空撞上巨岩！'),
      N('趁其回身蓄力之瞬，你一式「白虹贯日」倾尽全力刺入虎咽要害！斑斓巨虎哀嚎一声轰然倒毙于溪涧浅滩，山林顿时重归寂静。'),
      S(SPEAKER_SHEN_QINGDAI, '（提着药箱疾步奔出，为你擦拭臂上擦伤并敷上清凉金创散）“恩公竟能孤剑毙虎！方才真是惊心动魄……幸好只是些微皮外伤，未伤及筋骨。”'),
    ],
    onFinishEffects: [openScene('scene_hss02_09', HUASHAN_SIDE02_QUEST_ID)],
  },

  scene_hss02_09: {
    id: 'scene_hss02_09',
    title: '第九幕 · 赠参别涧',
    subtitle: '秦岭古洞溪畔',
    mandatory: true,
    beats: [
      N('次日雨过天晴，山涧云雾缭绕。沈青黛从药篓中小心取出那株须根完整、泛着淡紫莹光的太白紫阳老参，以玉刀均分为二，将较肥厚的一半用青油纸细细包好递到你手中，又取出一套精致的鹤嘴药锄与竹编采药篓。'),
      S(SPEAKER_SHEN_QINGDAI, '“这株紫阳老参足有五十年火候，半株便足敷贵派丹房炼药与我救治乡邻两用。这套鹤嘴药锄与采药篓乃我平日随身备用之物，今日一并赠予恩公，聊表救命深恩。”'),
      P('“沈姑娘高义，在下便厚颜收下，代华山同门谢过姑娘！山路尚险，姑娘且保重，后会有期！”'),
    ],
    choices: [
      {
        id: 'hss02_return_mountain',
        label: '收妥太白紫阳老参，返回玉女峰东峰丹房交割',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_SIDE02_QUEST_ID, 'return_ginseng'),
          toast('已得太白紫阳老参！请返回【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】交割。', 'success', '秦岭采参'),
        ],
      },
    ],
  },

  scene_hss02_10: {
    id: 'scene_hss02_10',
    title: '第十幕 · 玉泉药香',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('你回到东峰紫气迎曦石坪丹房，将青油纸包着的半株太白紫阳老参呈于药案之上。纸包甫启，醇厚温润的药香瞬间弥漫整个石坪！'),
      S(SPEAKER_PILL_DISCIPLE, '（惊喜抚掌）“哎呀！竟是五十年火候的上品太白紫阳老参！药性纯正无丝毫杂气，这下冬月『太乙回气清心散』定能成丹上乘！”'),
      S(SPEAKER_PILL_DISCIPLE, '“{gender:师弟|师妹}此行不仅采得灵参，还在秦岭护医斩虎、扬我华山侠名！这两瓶现成的清心散与丹房赏银你务必收好！”'),
    ],
    choices: [
      {
        id: 'hss02_complete',
        label: '拱手致谢，收下赏银与丹药（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 30, reason: '秦岭采回太白紫阳老参丹房赏银' },
          { type: 'addSectContribution', amount: 35 },
          { type: 'giveCombatExp', amount: 300, reason: '秦岭护医击退恶猎户与夜雨斩虎' },
          { type: 'modifyChivalry', delta: 15, reason: '秦岭溪涧拔剑救护游方女医沈青黛' },
          { type: 'addArtExp', artId: 'MA-160', amount: 200 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'giveItem', itemId: 'ITM-CUR-045', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
          { type: 'completeQuest', questId: HUASHAN_SIDE02_QUEST_ID },
          toast('已完成《玉泉药香 · 秦岭采参行》！经义精进，获得采药药锄与太乙回气清心散！', 'success', '秦岭采参'),
        ],
      },
    ],
  },
}
