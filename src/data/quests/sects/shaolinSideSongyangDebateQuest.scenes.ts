import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE05_QUEST_ID } from './shaolinSideSongyangDebateQuest'

const SPEAKER_PEDANT_ZHOU: StorySpeakerSpec = {
  kind: 'custom',
  name: '周迂夫',
  title: '排佛狂生 · 嵩阳学子',
  factionName: '嵩阳书院学子',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

const SPEAKER_ACADEMY_HEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '程山长',
  title: '嵩阳书院山长',
  factionName: '嵩阳书院',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_LEI_ZHENZI: StorySpeakerSpec = {
  kind: 'custom',
  name: '雷震子',
  title: '狂生雇佣武师 · 雷震子',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildLeiZhenzi(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS05_LEI_ZHENZI',
    name: '雷震子',
    title: '狂生雇佣武师 · 雷震子',
    realm: '三流上品',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '江湖武师',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“周公子出十两纹银请老夫教训狂妄沙弥！小和尚，接老夫一记劈山雷掌！”',
    stats: { hp: 800, mp: 480, agi: 34, res: 22 },
    talents: { bone: 62, comprehension: 44, charm: 30 },
    equippedArts: {
      neigong: 'MA-162',
      qinggong: 'MA-198',
      move1: 'MA-165',
      move2: 'MA-182',
      move3: 'MA-185',
    },
    learnedArts: [
      { artId: 'MA-162', level: 5 },
      { artId: 'MA-198', level: 5 },
      { artId: 'MA-165', level: 5 },
      { artId: 'MA-182', level: 4 },
      { artId: 'MA-185', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls05_01: {
    id: 'scene_sls05_01',
    title: '第一幕 · 晒经托卷',
    subtitle: '少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('{reignYear}秋高气爽，藏经阁西厢晒经石台上墨香氤氲。虚广正小心翼翼地将三卷蓝布函套的线装古籍收入檀木书匣，见你步上石台，微微颔首微笑。'),
      S('NPC-0498', '“师弟来得正好。上月藏经阁校勘禅史碑铭，曾向太室山南麓的嵩阳书院暂借了三卷唐写本《礼记正义》与《中庸疏》孤本，如今校勘已毕，须得如期奉还。”'),
      P('“嵩阳书院乃大宋四大书院之一，与咱们少林同处嵩山南北麓，两院素有文墨往来，弟子愿代师兄跑这一趟。”'),
      S('NPC-0498', '“贫僧正有此意。只是近来洛中士林排佛之风日炽，书院里颇有几位性情偏激的学子视佛门如仇雠。师弟经义湛深、口才便给，此行不仅要完壁归赵，更盼能以理服人，与嵩阳山长谈成两院藏书岁岁互通之约。”'),
    ],
    onFinishEffects: [openScene('scene_sls05_02', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_02: {
    id: 'scene_sls05_02',
    title: '第二幕 · 携牒下山',
    subtitle: '少林藏经阁前',
    mandatory: true,
    beats: [
      N('你双手接过沉甸甸的檀木书匣，妥善收入青布包袱之中。'),
      S('NPC-0498', '“少林与嵩阳同承中岳文脉，切记不卑不亢，既不可失了佛门气度，也莫与迂腐之辈徒作意气之争。你先往大雄宝殿东厢碑廊藏经橱领妥盖有方丈朱印的勘合文牒，再启程下山便是。”'),
      P('“弟子谨记师兄教诲！定不负所托，将孤本安然奉还嵩阳书院。”'),
    ],
    choices: [
      {
        id: 'sls05_accept',
        label: '背好檀木书匣，前往东厢碑廊藏经橱领妥勘合文牒下山',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE05_QUEST_ID, stepId: 'visit_songyang' },
          setStep(SHAOLIN_SIDE05_QUEST_ID, 'visit_songyang'),
          toast('已接下嵩阳还书之托！请前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】领牒下山。', 'talk', '嵩阳借书'),
        ],
      },
    ],
  },

  scene_sls05_03: {
    id: 'scene_sls05_03',
    title: '第三幕 · 汉柏拦路',
    subtitle: '太室山南麓 · 嵩阳书院山门',
    mandatory: true,
    beats: [
      N('你在东厢碑廊领妥朱印勘合文牒，沿嵩山古道行至太室山南麓的嵩阳书院。步入院中，但见三株汉武帝敕封的千年古柏苍翠遮天，檐下书声琅琅。'),
      N('岂料你尚未行至讲堂拜见山长，四五名身着青衿方巾的学子便横步拦在杏坛石阶之前。为首一名面色倨傲的瘦高狂生摇着折扇，斜眼打量你怀中书匣，冷笑出声。'),
      S(SPEAKER_PEDANT_ZHOU, '“哼！我道是谁大摇大摆闯进圣贤清净地，原来是少林寺的秃驴！拿了本院唐写孤本去染了一身香火气，如今还敢堂而皇之走进杏坛？”'),
      P('（从容合十，微躬还礼）“阿弥陀佛。贫僧奉藏经阁虚广师兄之命，特来如期奉还《礼记正义》与《中庸疏》三卷孤本，并呈方丈勘合文牒，敢问诸位同窗，程山长此刻可在堂中？”'),
      S(SPEAKER_PEDANT_ZHOU, '（一把按住书匣边角，傲然喝道）“山长岂是尔等外道想见便见的？韩文公《原道》早有明训：释氏弃君臣、去父子、禁其相生养之道！今日你若说不清佛门有何颜面借阅圣贤经传，这书匣便留下，还书回执休想拿走，少林日后也休想再踏入嵩阳半步！”'),
    ],
    onFinishEffects: [openScene('scene_sls05_04', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_04: {
    id: 'scene_sls05_04',
    title: '第四幕 · 嵩阳杏坛',
    subtitle: '嵩阳书院杏坛汉柏下',
    illustrationUrl: '/assets/quests/sl_s05_songyang_debate.jpg',
    illustrationCaption: '嵩阳杏坛 · 汉柏树下儒释会通，妙语折服排佛迂儒',
    mandatory: true,
    beats: [
      N('围观学子越聚越多，纷纷在千年汉柏树下窃窃私语。面对周迂夫援引《原道》步步紧逼，你神色恬淡，目光清澈如水，朗声回应。'),
      P('“周兄既引昌黎公之言，不知可曾读过当朝范公仲淹与契嵩禅师论道之语？儒以五常治世，佛以五戒治心：不杀即仁，不盗即义，不邪即礼，不妄即信，不昏即智——儒释名相虽异，安顿生民性命之心岂非同源？”'),
      S(SPEAKER_PEDANT_ZHOU, '（一时语塞，强自拔高嗓门）“巧言令色！既说同源，那你们出家人剃发入山，又岂肯念及家国社稷、苍生疾苦？”'),
      P('“周兄此言差矣。昔年隋末十三棍僧救唐王于危难，今朝少林僧众在嵩山施粥济灾、习武卫土，何曾忘却天下苍生？《中庸》云『万物并育而不相害，道并行而不相悖』，若连圣贤『并育并行』之量皆容不下，反倒落了狭隘门户之见！”'),
      N('话音清朗回荡在汉柏荫下。周围数十名嵩阳学子原本抱臂旁观，闻此儒释会通、引经据典之妙论，无不眼前一亮，交口称善！'),
    ],
    onFinishEffects: [openScene('scene_sls05_05', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_05: {
    id: 'scene_sls05_05',
    title: '第五幕 · 狂生雇凶',
    subtitle: '嵩阳书院石阶',
    mandatory: true,
    beats: [
      N('周迂夫被驳得哑口无言，见满庭同窗皆向你投来敬佩目光，顿觉颜面扫地，涨红了脸猛地合上折扇，竟露出几分市井无赖之态！'),
      S(SPEAKER_PEDANT_ZHOU, '“好一张利嘴！少林秃驴不但会咬文嚼字，江湖上不都吹嘘你们武功盖世么？今儿我早料到你们要来撒野，特从洛阳重金请来武师坐镇！雷师傅，请出来替圣贤门庭教训教训这狂妄沙弥！”'),
      N('话音未落，书院垂花门后大步迈出一名铜铃大眼、膀阔腰圆的虬髯武师，抱拳冷笑，指节捏得噼啪作响。'),
      S(SPEAKER_LEI_ZHENZI, '“在下『雷震子』！周公子出银子请我在此候着，小和尚，今日你若接不住老夫十招劈山掌，便乖乖交出书匣、磕头赔罪滚回少室山！”'),
      P('（将檀木书匣稳妥置于身旁石案之上，神色肃然）“书院乃圣贤讲学清净地，岂容动辄逞凶斗狠？然雷师傅既已登阶邀战，贫僧便立约『点到为止，以武证礼』，还请赐教！”'),
    ],
    onFinishEffects: [openScene('scene_sls05_06', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_06: {
    id: 'scene_sls05_06',
    title: '第六幕 · 杏坛切磋',
    subtitle: '嵩阳书院石阶（1v1 点到为止）',
    mandatory: true,
    beats: [
      N('雷震子狂笑一声，沉腰吐气，双掌带起呼呼风声扑上石阶！满庭学子纷纷后退让出空地，屏息凝神观这场儒门杏坛前的武道较量。'),
    ],
    choices: [
      {
        id: 'sls05_spar_lei',
        label: '合十起手，以少林正宗武学与雷震子点到为止切磋！（1v1 切磋）',
        subLabel: '对手：狂生雇佣武师 · 雷震子（三流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLeiZhenzi() },
            rule: 'spar',
            forbidEscapeReason: '满庭嵩阳学子瞩目之下，岂可临阵退缩折了少林威名！',
            introText: '【1v1 以武证礼】在嵩阳书院石阶点到为止切磋三流上品武师【雷震子】！',
            onWin: [openScene('scene_sls05_07', SHAOLIN_SIDE05_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast('切磋惜败于雷震子掌下！请调息精进后，再由东厢碑廊赴嵩阳书院重战！', 'warn', '嵩阳借书'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast('与雷震子势均力敌、难分胜负！请调息后再由东厢碑廊赴嵩阳书院分出高下！', 'warn', '嵩阳借书'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls05_07: {
    id: 'scene_sls05_07',
    title: '第七幕 · 以武证礼',
    subtitle: '嵩阳书院杏坛',
    illustrationUrl: '/assets/quests/sl_s05_apricot_spar.jpg',
    illustrationCaption: '以武证礼 · 书院石阶点到为止挫狂生武师，促成两院藏书互通',
    mandatory: true,
    beats: [
      N('雷震子一连七记刚猛劈山掌皆被你以少林沉桩步法化于无形。待他旧力已尽、新力未生之际，你左掌轻引其肘弯，右手顺势一记少林擒拿扣住其腕脉，却在寸劲将发未发之际陡然收力，反手托稳他险些失衡的身形！'),
      N('石阶上下鸦雀无声，片刻后爆发出雷鸣般的喝彩！雷震子呆立当场，看了看自己毫发无伤的手腕，满脸涨红地向你深深抱拳。'),
      S(SPEAKER_LEI_ZHENZI, '“高！实在是高！小师傅武艺胜我一筹，更难得手下留情顾全老夫颜面！周公子，这十两银子老夫退还给你，少林高徒讲理又守礼，这恶人老夫不做了！”'),
      N('雷震子说罢转身扬长而去。周迂夫孤零零站在石阶下，被满院学子指指点点，羞愧得无地自容，低头掩面仓皇退入人群深处。'),
    ],
    onFinishEffects: [openScene('scene_sls05_08', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_08: {
    id: 'scene_sls05_08',
    title: '第八幕 · 山长定约',
    subtitle: '嵩阳书院藏书楼',
    mandatory: true,
    beats: [
      N('一阵沉稳脚步声传来，须发皆白的嵩阳书院程山长步出讲堂，先厉声命学监严惩周迂夫失礼雇凶之过，随即面带温煦笑意邀你步入藏书楼奉茶。'),
      S(SPEAKER_ACADEMY_HEAD, '“方才汉柏树下小师傅一番『五常五戒相通、万物并育并行』的高论，老夫在窗内字字听得分明；方才石阶切磋，小师傅胜而不骄、收劲存礼，更见少林千年古刹之宗风！”'),
      N('程山长细细查验了三卷唐写本《礼记正义》与《中庸疏》，见书页纤尘不染、校勘签条工整端严，当即铺纸研墨，亲笔写就一纸「儒释互鉴、典籍互通」的勘合契书，并盖上嵩阳书院朱印。'),
      S(SPEAKER_ACADEMY_HEAD, '“请小师傅携此契书与回执转呈玄慈方丈及虚广师父：自今岁起，嵩阳书院与少林藏经阁岁岁互通孤本、共校经史，永结中岳文墨之好！”'),
    ],
    onFinishEffects: [openScene('scene_sls05_09', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_09: {
    id: 'scene_sls05_09',
    title: '第九幕 · 怀契归林',
    subtitle: '太室山道',
    mandatory: true,
    beats: [
      N('你双手接过墨迹犹新的互通契书与还书回执，珍重收入怀中。程山长亲送至汉柏山门，先前旁观的诸位嵩阳学子亦纷纷拱手致敬。'),
      N('暮色洒满太室与少室两峰山道，松涛阵阵。此行文辩武较两全其美，你心境愈发开阔，迈步返回少林藏经阁复命。'),
    ],
    choices: [
      {
        id: 'sls05_return_temple',
        label: '收好两院藏书互通契书，返回西厢晒经校勘石台复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE05_QUEST_ID, 'return_report'),
          toast('已获嵩阳山长亲笔藏书互通契书！请返回【少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】向虚广复命。', 'success', '嵩阳借书'),
        ],
      },
    ],
  },

  scene_sls05_10: {
    id: 'scene_sls05_10',
    title: '第十幕 · 藏经互通',
    subtitle: '少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('回到西厢晒经校勘石台时，虚广正临窗整理书签。接过你呈上的还书回执与嵩阳山长亲笔契书，细读两遍后，素来淡然的眉宇间顿时绽出由衷喜色。'),
      S('NPC-0498', '“善哉，善哉！听闻师弟在汉柏树下以儒释会通折服排佛迂儒，又在杏坛石阶点到为止化解狂生雇凶之难，令程山长亲定两院藏书互通之约——此功非但利在藏经阁，更令少林清誉播于河洛士林！”'),
      S('NPC-0498', '“这几卷校勘心得与师门功勋你且收下，盼师弟日后文武并进、禅儒互照，早证大道！”'),
    ],
    choices: [
      {
        id: 'sls05_complete',
        label: '合十谢过虚广师兄，收下嘉奖（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 80 },
          { type: 'giveCombatExp', amount: 140, reason: '嵩阳杏坛以武证礼挫败狂生武师雷震子' },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyRenown', delta: 25, reason: '嵩阳书院儒释之辩折服迂儒、促成两院藏书互通' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0498' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE05_QUEST_ID, outcome: 'completed' },
          toast('已完成《嵩阳借书 · 儒释之辩》！获得师门贡献、实战历练、江湖声望与经义/辩才/书进益！', 'success', '嵩阳借书'),
        ],
      },
    ],
  },
}
