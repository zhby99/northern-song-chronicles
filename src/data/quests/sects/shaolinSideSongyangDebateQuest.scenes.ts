import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
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

function buildLeiZhenzi(mode: 'humbled' | 'full'): NodeNpc {
  const isHumbled = mode === 'humbled'
  return makeQuestNpc({
    id: isHumbled ? 'QUEST_SLS05_LEI_ZHENZI_HUMBLED' : 'QUEST_SLS05_LEI_ZHENZI',
    name: '雷震子',
    title: isHumbled ? '狂生雇佣武师 · 气馁试手' : '狂生雇佣武师 · 雷震子',
    realm: '三流上品',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '江湖武师',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: isHumbled
      ? '“既受了周公子银钱，老夫总得走个过场——小师傅莫见怪，咱们点到为止切磋几招！”'
      : '“周公子出十两纹银请老夫教训狂妄沙弥！小和尚，接老夫一记劈山雷掌！”',
    stats: isHumbled
      ? { hp: 680, mp: 420, agi: 31, res: 20 }
      : { hp: 800, mp: 480, agi: 34, res: 22 },
    talents: { bone: 62, comprehension: 44, charm: 30 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-186', move2: 'MA-182' },
    learnedArts: [
      { artId: 'MA-180', level: isHumbled ? 4 : 5 },
      { artId: 'MA-186', level: isHumbled ? 4 : 5 },
      { artId: 'MA-182', level: 4 },
    ],
  })
}

function buildAcademyBrawler(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS05_BRAWLER',
    name: '铁拐陈六',
    title: '狂生帮闲打手',
    realm: '三流下品',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '市井帮闲',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“周公子发话了，先教这嘴笨的小和尚吃几记闷棍！”',
    stats: { hp: 410, mp: 160, agi: 23, res: 13 },
    talents: { bone: 45, comprehension: 32, charm: 24 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-189', move2: 'MA-204' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-189', level: 3 },
      { artId: 'MA-204', level: 2 },
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
  scene_sls05_01: {
    id: 'scene_sls05_01',
    title: '第一幕 · 晒经托卷 · 领牒下山',
    subtitle: '少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('{reignYear}秋高气爽，藏经阁西厢晒经石台上墨香氤氲。虚广正小心翼翼地将三卷蓝布函套的线装古籍收入檀木书匣，见你步上石台，微微颔首含笑。'),
      S('NPC-0498', '“{gender:师弟|师妹}来得正好。上月藏经阁校勘禅史碑铭，曾向太室山南麓的嵩阳书院暂借了三卷唐写本《礼记正义》与《中庸疏》孤本，如今校勘已毕，须得如期奉还，更盼能顺势谈成两院古籍岁岁互通之约。”'),
      S('NPC-0498', '“只是近来河洛士林排佛之声甚嚣尘上，书院里颇有几位性情偏激的学子动辄援引韩文公《原道》与新儒理学排斥佛门。{gender:师弟|师妹}经义湛深、口才便给，此行须不卑不亢、以理服人。”'),
      N('你双手接过沉甸甸的檀木书匣，眼角瞥见石案一侧还摊着一卷少林藏经阁珍藏的《论语》古注旧抄，墨迹端严古雅。'),
    ],
    choices: [
      {
        id: 'sls05_accept_copy',
        label: '【兼携《论语》古注抄本】请随匣带上一卷古注抄本以备结好，前往东厢领牒下山',
        subLabel: '备礼周全，开启嵩阳还书与儒释论辩之行',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_brought_copy', value: true },
          { type: 'startQuest', questId: SHAOLIN_SIDE05_QUEST_ID, stepId: 'visit_songyang' },
          setStep(SHAOLIN_SIDE05_QUEST_ID, 'visit_songyang'),
          toast(
            '已接下嵩阳还书之托！请前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】领牒下山。',
            'talk',
            '嵩阳借书',
          ),
        ],
      },
      {
        id: 'sls05_accept_plain',
        label: '【轻装简从 · 坦然还书】谨记不卑不亢之训，先往东厢碑廊领妥方丈勘合文牒',
        subLabel: '开启嵩阳还书与儒释论辩之行',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE05_QUEST_ID, stepId: 'visit_songyang' },
          setStep(SHAOLIN_SIDE05_QUEST_ID, 'visit_songyang'),
          toast(
            '已接下嵩阳还书之托！请前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】领牒下山。',
            'talk',
            '嵩阳借书',
          ),
        ],
      },
    ],
  },

  scene_sls05_02: {
    id: 'scene_sls05_02',
    title: '第二幕 · 汉柏拦路 · 狂生发难',
    subtitle: '太室山南麓 · 嵩阳书院山门',
    mandatory: true,
    beats: [
      N('你在东厢碑廊领妥盖有方丈朱印的勘合文牒，沿嵩山古道行至太室山南麓的嵩阳书院。步入院中，三株汉武帝敕封的千年古柏苍翠遮天，檐下书声琅琅。'),
      N('岂料尚未步上杏坛拜见程山长，四五名青衿方巾的学子便横步拦在石阶之前！为首一名面色倨傲的瘦高狂生摇着折扇，一把按住你怀中檀木书匣冷笑出声。'),
      S(SPEAKER_PEDANT_ZHOU, '“哼！我道是谁大摇大摆闯入圣贤清净地，原来是少林寺的秃驴！拿了本院唐写孤本去染了一身香火气，如今还敢登门求见山长？”'),
      P('（从容合十，微躬还礼）“阿弥陀佛。贫僧奉藏经阁虚广师兄之命，特来如期奉还三卷孤本并呈方丈勘合文牒，敢问这位兄台何故阻路？”'),
    ],
    onFinishEffects: [openScene('scene_sls05_03', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_03: {
    id: 'scene_sls05_03',
    title: '第三幕 · 杏坛初辩 · 忠孝与众生',
    subtitle: '嵩阳书院杏坛（儒释公案第一辩）',
    mandatory: true,
    beats: [
      N('围观的嵩阳学子越聚越多，纷纷立于千年汉柏树下静观其变。周迂夫见人多势众，愈发意气风发，收扇一指你朗声发难！'),
      S(SPEAKER_PEDANT_ZHOU, '“诸位同窗听真！昔年昌黎公《原道》并当今河洛理学诸贤早有明论：圣人重君臣父子、耕织生养；反观尔等佛门，剃发抛家弃亲、不拜君父、不耕不织，坐食天下膏血，非蠹国之徒而何？今日你若辩不清『大孝忠君』与『出家学佛』之理，休想领回执见山长！”'),
      N('数十道审视目光齐刷刷落在你身上。面对这第一道儒释大辩，你当如何作答——'),
    ],
    choices: [
      {
        id: 'sls05_r1_withdraw',
        label: '「红尘君父本是虚幻泡影，出家之人既已四大皆空，何必理会世俗纲常伦理？」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_r1_pick', value: 'withdraw' },
          openScene('scene_sls05_04', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'sls05_r1_harmony',
        label: '「儒以五常安社稷，佛以五戒净人心；不杀即仁、不盗即义，舍小家而护苍生卫家国，正是大忠大孝！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_r1_ok', value: true },
          { type: 'setFlag', flag: 'sl_s05_r1_pick', value: 'harmony' },
          openScene('scene_sls05_04', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'sls05_r1_retort',
        label: '「昔年少林十三棍僧尚曾救唐王于危难，尔等百无一用之书生，有何资格讥讽佛门？」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_r1_pick', value: 'retort' },
          openScene('scene_sls05_04', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls05_04: {
    id: 'scene_sls05_04',
    title: '第四幕 · 汉柏再辩 · 致用与明心',
    subtitle: '嵩阳书院杏坛汉柏下（儒释公案第二辩）',
    illustrationUrl: '/assets/quests/sl_s05_songyang_debate.jpg',
    illustrationCaption: '嵩阳杏坛 · 汉柏树下儒释会通，两轮公案舌战排佛迂儒',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s05_r1_ok|此言清朗平和、暗合范公仲淹与契嵩禅师会通之旨，汉柏树下数十名嵩阳学子无不眼前一亮、低声赞善！周迂夫一时语塞，面色涨红，却仍强撑傲气抛出第二道难题！|几名青衿学子闻言纷纷皱眉窃语，显然不以为然。周迂夫见占了上风，愈发得意洋洋，顺势步步紧逼抛出第二道难题！}'),
      S(SPEAKER_PEDANT_ZHOU, '“休逞口舌之利！再问你第二桩：我儒门讲究格物致知、修齐治平、入世致用，经天纬地以安生民；尔等禅宗终日枯坐面壁、谈空说玄，专求一己明心见性，于天下苍生实务究竟有何裨益？”'),
      N('满庭书生屏息静听，连讲堂雕花木窗后亦隐约传来一声清咳——这第二辩「入世致用」与「明心见性」，正是定下满座人心向背的关键！'),
    ],
    choices: [
      {
        id: 'sls05_r2_empty',
        label: '「世间万事终归成住坏空，唯有抛却尘世实务闭门枯坐，方能独证涅槃彼岸。」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_r2_pick', value: 'empty' },
          { type: 'setFlag', flag: 'sl_side05_lei_ready', value: true },
          openScene('scene_sls05_05', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'sls05_r2_force',
        label: '「空谈义理有何用处？江湖朝堂皆以强弱论是非，手底见真章才算本事！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_r2_pick', value: 'force' },
          { type: 'setFlag', flag: 'sl_side05_lei_ready', value: true },
          addKarmaOnce('sl_s05_debate_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls05_05', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'sls05_r2_complement',
        label: '「明心见性乃正己之本，入世致用乃济物之用；心不妄则事不偏，《中庸》云万物并育而不相害，儒释本如车之双轮！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_r2_ok', value: true },
          { type: 'setFlag', flag: 'sl_s05_r2_pick', value: 'complement' },
          { type: 'setFlag', flag: 'sl_side05_lei_ready', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s05_r1_ok', op: 'truthy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s05_debate_won', value: true },
              addKarmaOnce('sl_s05_debate_karma_done', 'sl_zen_merit', 2),
            ],
            elseEffects: [],
          },
          openScene('scene_sls05_05', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls05_05: {
    id: 'scene_sls05_05',
    title: '第五幕 · 恼羞雇凶 · 杏坛试礼',
    subtitle: '嵩阳书院石阶（以武证礼）',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s05_debate_won|话音清越回荡于汉柏荫下！满座数十名嵩阳学子再也按捺不住，齐齐抚掌喝彩称善！周迂夫两轮皆败、颜面扫地，竟恼羞成怒露出市井无赖嘴脸，猛地朝垂花门外大喊！|周迂夫见你未能两辩折服满庭，冷笑连连，索性借题发挥合上折扇，朝垂花门外高声唤出早已埋伏好的江湖打手！}'),
      S(SPEAKER_PEDANT_ZHOU, '“少林秃驴休得撒野！我早从洛阳重金聘来武师坐镇——雷师傅，请出来替圣贤门庭教训教训这狂妄沙弥！”'),
      N('{ifFlag:sl_s05_debate_won|话音刚落，虬髯武师雷震子正携帮闲陈六大步迈出，讲堂内却骤然响起一声威严清喝：「住口！圣贤门庭岂容雇凶围殴远客！」——须发皆白的程山长缓步出廊，当场命学监将帮闲陈六斥退逐出书院！雷震子见众学子皆向着你，顿时气馁三分，只硬着头皮抱拳请教一招半式点到为止！|话音刚落，虬髯武师雷震子携帮闲铁拐陈六大步跨上石阶，铜铃大眼一瞪冷笑逼近：「周公子出了十两银子请咱们教训少林秃驴！小和尚，先过陈六与老夫这关再说！」}'),
      P('（将檀木书匣稳妥置于石案之上，神色肃然）“书院乃讲学清净地，贫僧唯立约『点到为止，以武证礼』——请赐教！”'),
    ],
    choices: [
      {
        id: 'sls05_spar_lei',
        label: '合十起手，以少林正宗武学于杏坛石阶点到为止切磋！（三流上品）',
        subLabel: '论辩获胜则程山长斥退帮闲、1v1 切磋气馁的雷震子；否则须连战帮闲与雷震子',
        tone: 'danger',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s05_debate_won', op: 'truthy' },
            thenEffects: [
              {
                type: 'startCombat',
                questId: SHAOLIN_SIDE05_QUEST_ID,
                opponent: { kind: 'custom', npc: buildLeiZhenzi('humbled') },
                rule: 'spar',
                forbidEscapeReason: '满庭嵩阳学子瞩目之下，岂可临阵退缩折了少林威名！',
                introText: '【1v1 以武证礼】程山长斥退帮闲，与气馁的武师【雷震子（三流上品）】点到为止切磋！',
                onWin: [
                  { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                  openScene('scene_sls05_06', SHAOLIN_SIDE05_QUEST_ID),
                ],
                onLose: [
                  { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                  toast('切磋惜败于雷震子掌下！请调息精进后，再由东厢碑廊赴嵩阳书院重战！', 'warn', '嵩阳借书'),
                ],
                onDraw: [
                  { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                  toast('与雷震子势均力敌！请调息后再由东厢碑廊赴嵩阳书院分出高下！', 'warn', '嵩阳借书'),
                ],
              },
            ],
            elseEffects: [
              {
                type: 'startCombat',
                format: 'gauntlet',
                questId: SHAOLIN_SIDE05_QUEST_ID,
                opponent: { kind: 'custom', npc: buildAcademyBrawler() },
                extraOpponents: [{ kind: 'custom', npc: buildLeiZhenzi('full') }],
                rule: 'spar',
                forbidEscapeReason: '满庭嵩阳学子瞩目之下，岂可临阵退缩折了少林威名！',
                introText: '【车轮切磋 · 以武证礼】依次迎战狂生帮闲【铁拐陈六】与武师【雷震子（三流上品）】！',
                onWin: [
                  { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                  openScene('scene_sls05_06', SHAOLIN_SIDE05_QUEST_ID),
                ],
                onLose: [
                  { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                  toast('切磋惜败于石阶之上！请调息精进后，再由东厢碑廊赴嵩阳书院重战！', 'warn', '嵩阳借书'),
                ],
                onDraw: [
                  { type: 'healPlayer', hpPct: 100, mpPct: 100 },
                  toast('石阶切磋难分高下！请调息后再由东厢碑廊赴嵩阳书院续战！', 'warn', '嵩阳借书'),
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  scene_sls05_06: {
    id: 'scene_sls05_06',
    title: '第六幕 · 以武证礼 · 雷师折服',
    subtitle: '嵩阳书院杏坛',
    illustrationUrl: '/assets/quests/sl_s05_apricot_spar.jpg',
    illustrationCaption: '以武证礼 · 书院石阶点到为止挫狂生武师，促成两院藏书互通',
    mandatory: true,
    beats: [
      N('雷震子一连七记刚猛劈山掌皆被你以少林沉桩步法化于无形。待他旧力已尽、新力未生之际，你左掌轻引其肘弯，右手顺势一记少林擒拿扣住腕脉，却在寸劲将发未发之际陡然收力，反手托稳他险些失衡的身形！'),
      N('石阶上下先是一静，旋即爆发出雷鸣般的喝彩！雷震子呆立当场，瞧了瞧自己毫发无伤的手腕，满脸涨红地向你深深抱拳。'),
      S(SPEAKER_LEI_ZHENZI, '“高！实在是高！小师傅武艺胜我一筹，更难得手下留情顾全老夫颜面！周公子，这十两银子老夫退还给你——少林高徒讲理又守礼，这恶人老夫不做了！”'),
      N('雷震子说罢转身扬长而去。周迂夫孤零零站在石阶下，被满院学子指指点点，羞愧得无地自容，掩面仓皇退入人群深处。'),
    ],
    onFinishEffects: [openScene('scene_sls05_07', SHAOLIN_SIDE05_QUEST_ID)],
  },

  scene_sls05_07: {
    id: 'scene_sls05_07',
    title: '第七幕 · 山长定约 · 借书礼数',
    subtitle: '嵩阳书院藏书楼（战后礼数抉择）',
    mandatory: true,
    beats: [
      N('嵩阳书院程山长命学监严惩周迂夫失礼雇凶之过，随即面带温煦笑意邀你步入藏书楼奉茶。细细查验过三卷纤尘不染的唐写孤本后，山长当即铺纸研墨，亲笔写就一纸「儒释互鉴、典籍互通」的勘合契书并盖上书院朱印。'),
      S(SPEAKER_ACADEMY_HEAD, '“{ifFlag:sl_s05_debate_won|方才汉柏树下小师傅两轮儒释圆融高论，老夫在窗内字字听得分明；石阶之上又胜而不骄、收劲存礼，真见少林千年宗风！|方才石阶切磋，小师傅胜而不骄、收劲存礼，令老夫深佩少林宗风！}自今岁起，嵩阳书院与少林藏经阁岁岁互通孤本、共校经史！”'),
      N('临别之际，你忽听书院司书老儒低声叹息：本院历年校勘《论语》，独缺北魏至唐代河洛古注一脉的参校底本——而少林藏经阁恰巧珍藏着一卷完整古注抄本！{ifFlag:sl_s05_brought_copy|更巧的是，你行前已随匣带了那卷《论语》古注抄本！|若你愿亲笔立约请虚广师兄将那卷《论语》古注抄本回赠嵩阳，必能更深两院儒释之好。}'),
    ],
    choices: [
      {
        id: 'sls05_courtesy_gift',
        label: '【回赠《论语》古注抄本 · 结儒释之好】将少林所藏《论语》古注抄本回赠嵩阳书院共研经史',
        subLabel: '礼尚往来，传为中岳文坛佳话（禅心慈悲 +1 · 江湖声望大增）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_book_courtesy', value: 'gift' },
          addKarmaOnce('sl_s05_courtesy_karma_done', 'sl_zen_merit', 1),
          { type: 'modifyChivalry', delta: 15, reason: '以少林所藏《论语》古注抄本回赠嵩阳书院结儒释之好' },
          openScene('scene_sls05_08', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'sls05_courtesy_direct',
        label: '【执礼辞行 · 携契径返】谨收还书回执与互通契书，依礼辞别程山长径返少室山',
        subLabel: '守礼归山，正常结算差事',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s05_book_courtesy', value: 'direct' },
          openScene('scene_sls05_08', SHAOLIN_SIDE05_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls05_08: {
    id: 'scene_sls05_08',
    title: '第八幕 · 怀契归林 · 太室暮色',
    subtitle: '太室山道',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s05_book_courtesy=gift|程山长闻听少林愿将珍藏《论语》古注抄本回赠嵩阳，抚须动容、如获至宝，亲率满院学子在千年汉柏下向你长揖相送！|你双手接过墨迹犹新的互通契书与还书回执珍重入怀，程山长亲送至汉柏山门，诸位嵩阳学子纷纷拱手致敬。}'),
      N('秋阳西斜，暮色洒满太室与少室两峰山道，松涛阵阵。此行文辩武较两全其美，你心境愈发开阔，迈步返回少林藏经阁复命。'),
      P('（轻按怀中朱印契书，望向少室山隐约禅檐）“中岳双峰，儒释相望而不相害，今日方知古人胸襟。”'),
    ],
    choices: [
      {
        id: 'sls05_return_temple',
        label: '收好两院藏书互通契书，返回西厢晒经校勘石台复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE05_QUEST_ID, 'return_report'),
          toast(
            '已获嵩阳山长亲笔藏书互通契书！请返回【少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】向虚广复命。',
            'success',
            '嵩阳借书',
          ),
        ],
      },
    ],
  },

  scene_sls05_09: {
    id: 'scene_sls05_09',
    title: '第九幕 · 藏经互通 · 禅儒互照',
    subtitle: '少林藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('回到西厢晒经校勘石台时，虚广正临窗整理书签。接过你呈上的还书回执与嵩阳山长亲笔契书细读两遍，素来淡然的眉宇间顿时绽出由衷喜色。'),
      S('NPC-0498', '“善哉，善哉！{ifFlag:sl_s05_debate_won|听闻你在汉柏树下两轮儒释公案折服排佛迂儒，满院学子击节称善，又在石阶点到为止收服武师雷震子|听闻你在杏坛石阶点到为止化解狂生雇凶之难，终令程山长亲定两院藏书互通之约}——此功非但利在藏经阁，更令少林清誉播于河洛士林！”'),
      S('NPC-0498', '“{ifFlagEq:sl_s05_book_courtesy=gift|更难得你慷慨回赠《论语》古注抄本以结儒释之好，方丈闻讯亦连称大善，河洛士林如今皆颂我少林气度恢弘！|这几卷校勘心得与师门功勋你且收下，盼你日后文武并进、禅儒互照，早证大道！}”'),
      P('（合十含笑还礼）“多谢虚广师兄提携，此行嵩阳之辩，弟子亦获益匪浅！”'),
    ],
    choices: [
      {
        id: 'sls05_complete_harmony',
        label: '【禅儒互照 · 领赏结案】合十谢过虚广师兄，收下嘉奖与校勘心得',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 80 },
          { type: 'giveCombatExp', amount: 140, reason: '嵩阳杏坛以武证礼挫败狂生武师雷震子' },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifySkill', key: '书', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s05_book_courtesy', op: 'eq', value: 'gift' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 40,
                reason: '嵩阳书院儒释之辩大胜并回赠《论语》古注抄本、促成两院藏书互通',
              },
            ],
            elseEffects: [
              {
                type: 'modifyRenown',
                delta: 25,
                reason: '嵩阳书院儒释之辩折服迂儒、促成两院藏书互通',
              },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0498' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE05_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《嵩阳借书 · 儒释之辩》！获得师门贡献、实战历练、江湖声望与经义/辩才/书进益！',
            'success',
            '嵩阳借书',
          ),
        ],
      },
      {
        id: 'sls05_complete_martial',
        label: '【以武证礼 · 领赏结案】铭记今日杏坛文辩武较体悟，收下师门嘉奖',
        tone: 'jade',
        effects: [
          { type: 'addSectContribution', amount: 80 },
          { type: 'giveCombatExp', amount: 140, reason: '嵩阳杏坛以武证礼挫败狂生武师雷震子' },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifySkill', key: '书', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s05_book_courtesy', op: 'eq', value: 'gift' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 40,
                reason: '嵩阳书院儒释之辩大胜并回赠《论语》古注抄本、促成两院藏书互通',
              },
            ],
            elseEffects: [
              {
                type: 'modifyRenown',
                delta: 25,
                reason: '嵩阳书院儒释之辩折服迂儒、促成两院藏书互通',
              },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0498' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE05_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《嵩阳借书 · 儒释之辩》！获得师门贡献、实战历练、江湖声望与经义/辩才/书进益！',
            'success',
            '嵩阳借书',
          ),
        ],
      },
    ],
  },
}
