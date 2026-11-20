import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q05_QUEST_ID } from './huashanQiXiyiQuest'

const SPEAKER_LOUGUAN_ABBOT: StorySpeakerSpec = {
  kind: 'custom',
  name: '玄静观主',
  title: '终南古观护经宿老',
  factionName: '终南道脉',
  portraitUrl: '/assets/characters/templates/tpl_taoist_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_taoist_master_av.jpg',
}

const SPEAKER_MURONG_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '苏星帆',
  title: '还施水阁前哨搜书客',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_MURONG_YAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '慕容彦',
  title: '还施水阁 · 参合搜书使',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildMurongScoutNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ05_MURONG_SCOUT',
    name: '苏星帆',
    title: '还施水阁 · 江南搜书快剑',
    realm: '二流中品',
    factionName: '姑苏慕容氏',
    sectRank: 2,
    sectRankLabel: '水阁搜书客',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“我水阁看中的关中道藏秘卷，岂容你们华山派带回玉女峰！识相的把木匣留下！”',
    stats: { hp: 1450, mp: 1220, agi: 51, res: 35 },
    talents: { bone: 64, comprehension: 72, charm: 60 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-130', move2: 'MA-170' },
    learnedArts: [{ artId: 'MA-121', level: 6 }, { artId: 'MA-130', level: 5 }, { artId: 'MA-170', level: 6 }],
  })
}

function buildMurongYanBossNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ05_MURONG_YAN',
    name: '慕容彦',
    title: '还施水阁 · 参合搜书执事',
    realm: '一流下品',
    factionName: '姑苏慕容氏',
    sectRank: 3,
    sectRankLabel: '水阁执事',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“华山气宗的剑路我已在燕子坞图谱上看熟七分！想凭临时学来的希夷剑意挡我？痴人说梦！”',
    stats: { hp: 2380, mp: 2120, agi: 58, res: 45 },
    talents: { bone: 74, comprehension: 82, charm: 68 },
    equippedArts: { neigong: 'MA-221', move1: 'MA-071', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-221', level: 8 }, { artId: 'MA-071', level: 8 }, { artId: 'MA-131', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq05_01: {
    id: 'scene_hsq05_01',
    title: '第一幕 · 正气召见',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，西岳群峰银装素裹，紫霞正气主殿内铜炉檀香袅袅。你自渭水破寨立功后将《华山混元掌》修至小成，今日奉召踏入主殿，见掌门「太岳真君」岳沧溟与师叔宁清羽正立于一卷先贤画像之前。'),
      N('画中老道鹤发童颜、斜卧松石酣眠，白云绕榻而不湿衣袂，气韵超然尘表。'),
      S('NPC-0118', '（回身温言道）“你且上前来。可知画中这位酣眠于西岳白云之间的先贤，乃是何人？”'),
      P('“回禀掌门！画上题有『扶摇子』印记，莫非正是五代至国初隐居我华山云台观与张超谷、蒙太宗皇帝御赐『希夷先生』名号的陈抟老祖？”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_02', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_02: {
    id: 'scene_hsq05_02',
    title: '第二幕 · 希夷道源',
    subtitle: '紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '（抚须赞许）“不错！当年希夷老祖在博台孤峰一局弈赢太祖皇帝，为我华山赢得千秋免赋清净之地；我气宗一脉吐纳导引、内丹养气之无上渊源，亦大半出自老祖手创道统。”'),
      S('NPC-0118', '“三十年前，终南古观道友修缮道藏，曾向本门借阅希夷老祖亲笔批注的《无极希夷图注》孤本参校。如今三十年期满，玄静观主致书请我华山遣一名德才兼备的内门弟子前往迎奉归山。”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_03', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_03: {
    id: 'scene_hsq05_03',
    title: '第三幕 · 捧礼南行',
    subtitle: '紫霞正气主殿外丹墀',
    mandatory: true,
    beats: [
      N('岳沧溟亲手将一封紫泥法帖与盛放华山莲花灵茗的锦盒交予你手；宁清羽送你至丹墀石阶，低声叮嘱。'),
      S('NPC-0166', '“近来关中道上颇不太平，听闻江南姑苏一带有擅长摹仿百家武学的神秘剑客北上搜罗古派秘谱。你携礼南赴终南古观迎卷，师叔随后处理完观中俗务便南下接应，途中万万不可大意！”'),
      P('“弟子谨遵掌门法旨与师叔教诲，人在卷在，定将希夷老祖遗卷平安奉归西岳！”'),
    ],
    choices: [
      {
        id: 'hsq05_depart_zhongnan',
        label: '捧持紫泥法帖与清供锦盒，南赴终南山重阳古观前脉道院',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q05_QUEST_ID, stepId: 'louguan_homage' },
          setStep(HUASHAN_Q05_QUEST_ID, 'louguan_homage'),
          toast('已奉命南行！请前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】！', 'talk', '楼观护道'),
        ],
      },
    ],
  },

  scene_hsq05_04: {
    id: 'scene_hsq05_04',
    title: '第四幕 · 终南古观',
    subtitle: '终南山隐宗 · 重阳古观前脉道院 · 清修主殿',
    mandatory: true,
    beats: [
      N('晓行夜宿，你踏雪入秦岭北麓终南山脉。古观隐于万竿修竹与千年银杏之间，晨钟暮磬清越出尘。'),
      N('护经宿老玄静观主率知客道人迎出主殿，验过岳沧溟亲笔紫泥法帖，笑容可掬地引你入殿。'),
      S(SPEAKER_LOUGUAN_ABBOT, '“无量天尊！早闻岳真君门下新出了一位掌剑双修、荡平渭水赤沙水匪的青年俊彦，今日一见，果然神完气足、不染躁火！”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_05', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_05: {
    id: 'scene_hsq05_05',
    title: '第五幕 · 楼观礼祖',
    subtitle: '重阳玄门清修主殿',
    illustrationUrl: '/assets/quests/hs_q05_louguan_homage.jpg',
    illustrationCaption: '楼观礼祖 · 终南古观迎奉睡仙陈抟希夷先生道门遗卷',
    mandatory: true,
    beats: [
      N('清修主殿东壁供奉着五代宋初道门高真牌位，陈抟老祖「希夷先生」灵位居于显座。你净手焚香，献上西岳莲花灵茗，依玄门三礼九叩古仪恭谨参拜，吐纳俯仰间渊渟岳峙。'),
      S(SPEAKER_LOUGUAN_ABBOT, '（抚须颔首，目露钦佩）“礼敬而不谄，气沉而不滞，西岳气宗正脉果真深得希夷先生静定真传！小友请随老道移步后院道藏经阁，奉取老祖手泽遗卷。”'),
    ],
    choices: [
      {
        id: 'hsq05_enter_alchemy_vault',
        label: '随玄静观主步入后院【道藏经阁与紫金丹院】',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q05_QUEST_ID, 'louguan_scroll_vault'),
          toast('请前往同院后侧【道藏经阁与紫金丹院】恭迎希夷手泽道卷！', 'talk', '楼观礼祖'),
        ],
      },
    ],
  },

  scene_hsq05_06: {
    id: 'scene_hsq05_06',
    title: '第六幕 · 经阁残局',
    subtitle: '重阳古观前脉道院 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('步入幽静古雅的道藏经阁，松烟墨香扑鼻。阁心青石案上并未直接摆放经匣，反而设着一盘黑白交错、杀机四伏的古谱围棋残局。'),
      S(SPEAKER_LOUGUAN_ABBOT, '（指着棋枰微笑道）“此乃当年陈抟老祖与太祖皇帝对弈于华山博台时的中盘变局。白棋大龙外围被黑子铁锁合围，若强行冲杀突围必致两败俱伤。按当年与岳掌门之约，迎卷弟子须下一手合乎『希夷』本意的妙着。”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_07', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_07: {
    id: 'scene_hsq05_07',
    title: '第七幕 · 虚静落子',
    subtitle: '道藏经阁石枰前',
    mandatory: true,
    beats: [
      N('你凝视棋枰片刻，想起《老子》“大白若辱，大方无隅”之训，拈起一枚温润白子，并不去救右下角被围的五颗残子，反而轻飘飘点在天元左上方一片虚空腹地！'),
      P('“弃小角之有形得失，入中腹之无相生机——彼若贪吃角子，我大势已成如云行太虚，何围之有？”'),
      S(SPEAKER_LOUGUAN_ABBOT, '（霍然动容，击节赞叹）“好一个『弃有形而取无相』！老道守卷三十载，今日总算把这卷圣物交到真正的传人手里了！”'),
      N('玄静观主郑重开启内室樟木暗格，捧出一只紫绫密封、外嵌乌铜锁扣的长匣——匣内正是陈抟老祖亲笔批注的《希夷手泽道卷》！'),
    ],
    onFinishEffects: [openScene('scene_hsq05_08', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_08: {
    id: 'scene_hsq05_08',
    title: '第八幕 · 异客端倪',
    subtitle: '道藏经阁门廊',
    mandatory: true,
    beats: [
      N('你将乌铜长匣以鹿皮背带斜缚背心，正欲辞行，玄静观主忽想起一事，压低声音提醒。'),
      S(SPEAKER_LOUGUAN_ABBOT, '“小友且慢！前日观中曾来过两名挂单的『游方道人』，虽穿着道袍，言谈间却隐带江南姑苏口音，接连两日绕着经阁探问华山希夷古卷何时归还，今晨天未亮便匆匆顺子午谷古道北去了……你北返过松碑林时千万留心！”'),
      P('（想起临行前宁师叔提及的江南搜书剑客，眼神微凛）“多谢观主提点！晚辈定加倍警醒，告辞！”'),
    ],
    choices: [
      {
        id: 'hsq05_go_ziwu_valley',
        label: '背负《希夷手泽道卷》，警惕穿行子午谷松碑古林北返',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q05_QUEST_ID, 'ziwu_pine_ambush'),
          toast('已迎奉希夷道卷！请前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】穿行子午谷！', 'talk', '护卷北返'),
        ],
      },
    ],
  },

  scene_hsq05_09: {
    id: 'scene_hsq05_09',
    title: '第九幕 · 子午松雾',
    subtitle: '终南后山子午谷 · 汉唐松碑古林',
    mandatory: true,
    beats: [
      N('刚入子午谷幽谷古道，山间寒雾骤浓，遮蔽了两侧峭壁苍松与历代摩崖石碑。四周静得连飞鸟啼鸣也无半分。'),
      N('行至双剑合璧坪古碑林口，雾中石碑上赫然并肩坐着两名灰布道袍男子，见你背负乌铜长匣走近，缓缓站起身拦断山道。'),
      P('（停步十丈之外，手按剑柄冷声喝道）“玄门同道见面皆稽首行子午诀，二位虽穿道装，腰悬江南云纹吞口剑、足踏燕子抄水轻功步位——不知是姑苏哪一家的朋友，在此装神弄鬼？”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_10', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_10: {
    id: 'scene_hsq05_10',
    title: '第十幕 · 水阁图穷',
    subtitle: '子午谷松碑古林',
    mandatory: true,
    beats: [
      N('为首那名面如冠玉、神态倨傲的锦衣青年仰天一笑，一把扯下外罩灰布道袍，露出内里江南世家华贵银纹箭袖！'),
      S(SPEAKER_MURONG_YAN, '“好毒的眼力！既然认出我姑苏慕容氏的燕子三抄水步法，本执事也不瞒你——在下【还施水阁】搜书使慕容彦！我家公子立志汇通天下百家武学典籍，唯独缺了西岳陈抟一脉的原版《无极希夷图注》。”'),
      S(SPEAKER_MURONG_YAN, '“识时务的，乖乖解下背后乌铜匣借我燕子坞抄录三年，饶你不死；若敢拔剑，让你尝尝本门以彼之道、破尽诸派剑路的厉害！”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_11', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_11: {
    id: 'scene_hsq05_11',
    title: '第十一幕 · 诡招受挫',
    subtitle: '松碑古林激斗',
    mandatory: true,
    beats: [
      P('“我华山祖师遗卷，岂容宵小觊觎！看剑！”'),
      N('你拔剑抢占古碑高处，施展《养吾剑法》护住背上铜匣；岂料慕容彦与前哨剑客苏星帆左右夹击，剑招忽而大开大阖似嵩山路数，忽而斜刺诡辣类青城偏锋，更专门针对你《养吾剑法》固定换气节点连环抢攻！'),
      N('“铮铮铮！”连拆十余招，你护匣左支右绌，左袖已被剑气划开一道裂口，形势岌岌可危！'),
    ],
    onFinishEffects: [openScene('scene_hsq05_12', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_12: {
    id: 'scene_hsq05_12',
    title: '第十二幕 · 清羽驰援',
    subtitle: '松碑古林 · 青影天降',
    mandatory: true,
    beats: [
      N('正在慕容彦袖中暗藏两枚柳叶镖欲趁隙射你双目之刹那——一声清越剑吟自松巅云雾间破空而落！'),
      N('一道青霞剑光如惊鸿掠影，“叮叮”两声脆响精准磕飞毒镖，震得慕容彦与苏星帆齐齐倒退三步！「玉女剑仙」宁清羽飘然落于古碑之侧，横剑护在你身前。'),
      S('NPC-0166', '“堂堂江南姑苏慕容氏，竟干起乔装改扮、以多欺少截夺他派道藏的勾当，传扬出去也不怕天下英雄齿冷么？”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_13', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_13: {
    id: 'scene_hsq05_13',
    title: '第十三幕 · 松碑授剑',
    subtitle: '子午谷松碑林 · 临阵传道',
    illustrationUrl: '/assets/quests/hs_q05_pine_ambush.jpg',
    illustrationCaption: '松碑授剑 · 子午谷遭还施水阁伏击，宁清羽临阵传授希夷剑法',
    mandatory: true,
    beats: [
      N('宁清羽剑气一展逼住慕容彦，头也不回向你清喝传音，字字如晨钟贯入耳际！'),
      S('NPC-0166', '“听仔细了！还施水阁搜书客熟背各派死板剑谱，你越是拘泥招式定法，越易被他料敌机先！老子云：『视之不见名曰夷，听之不闻名曰希，搏之不得名曰微！』”'),
      S('NPC-0166', '“陈抟老祖所创地阶剑学《希夷剑法》，精髓便在『大音希声，大象无形』——不设固定起手，不留招式棱角，随风随雾圆融流转，待敌招落空自露破绽之时，后发而先至！”'),
      N('宁清羽手腕轻抖，在松雾间为你演尽《希夷剑法》虚实无相之总纲！你本已在经阁残棋中悟透“弃有形而取无相”之理，此刻灵台轰然贯通，手中青锋随着山风松涛化作一团不可捉摸的清蒙剑雾！'),
    ],
    onFinishEffects: [
      { type: 'teachMartialArt', artId: 'MA-089', level: 1, autoEquip: true },
      toast('临阵顿悟！获宁清羽传授华山派地阶剑学《希夷剑法》！', 'success', '松碑授剑'),
      openScene('scene_hsq05_14', HUASHAN_Q05_QUEST_ID),
    ],
  },

  scene_hsq05_14: {
    id: 'scene_hsq05_14',
    title: '第十四幕 · 希夷初悟',
    subtitle: '松碑古林 · 先挫前哨',
    mandatory: true,
    beats: [
      S(SPEAKER_MURONG_SCOUT, '（狞笑一声挺剑扑上）“阵前临时学剑也想翻盘？看我破你华山剑路！”'),
      N('宁清羽横剑压住蠢蠢欲动的慕容彦，颔首命你独力应战苏星帆以印证新悟《希夷剑法》！'),
    ],
    choices: [
      {
        id: 'hsq05_fight_scout',
        label: '运使《希夷剑法》，以无相剑意迎战前哨搜书客苏星帆（二流中品）',
        tone: 'primary',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMurongScoutNpc() },
            rule: 'story_trial',
            forbidEscapeReason: '背负希夷祖师手泽道卷，寸步不让！',
            introText: '【希夷初试】以虚实无相的《希夷剑法》迎战还施水阁前哨搜书客【苏星帆（二流中品）】！',
            onWin: [openScene('scene_hsq05_15', HUASHAN_Q05_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 90, mpPct: 90 },
              toast('切莫执着固定招式，顺应希夷虚静剑意重新迎敌！', 'warn', '希夷悟剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq05_15: {
    id: 'scene_hsq05_15',
    title: '第十五幕 · 破彼摹剑',
    subtitle: '子午谷松碑古林',
    mandatory: true,
    beats: [
      N('苏星帆连刺三剑企图封堵你变招方位，却惊骇发现你的剑光似慢实快、全无定式可循，一剑刺入空处，反被你剑柄如羚羊挂角般撞中胸口，闷哼吐血倒飞撞在石碑之上！'),
      S(SPEAKER_MURONG_YAN, '（瞳孔骤缩，霍然掣出秋水般的长剑推开苏星帆）“废物！原来这就是华山秘不外传的地阶《希夷剑法》！好极了——宁清羽，你既自持前辈身份不以二敌一，本执事便单打独斗宰了你这得意高足，连道卷带剑谱一并收归还施水阁！”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_16', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_16: {
    id: 'scene_hsq05_16',
    title: '第十六幕 · 无相争锋',
    subtitle: '子午谷松碑林 · 一流强敌决死战',
    mandatory: true,
    beats: [
      S('NPC-0166', '（负剑退立汉碑之畔，目光沉静而信任地望向你）“慕容彦虽入一流下品之境，然其剑意驳杂求巧；你既有养吾之正、混元之厚，再运希夷之虚静，放手一战，师叔为你掠阵！”'),
      P('（深吸一口秦岭寒雾，剑尖微垂，整个人气息仿佛与漫谷松涛融为一体）“慕容执事，请赐招！”'),
    ],
    choices: [
      {
        id: 'hsq05_duel_murongyan',
        label: '生死决战！施展《希夷剑法》独战一流下品慕容彦！',
        subLabel: '生死决战（duel）：迎战一流下品参合搜书使慕容彦，战败将卷毁人亡！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMurongYanBossNpc() },
            rule: 'duel',
            deathTitle: '魂断子午松碑',
            deathDetail:
              '护送《希夷手泽道卷》途经终南子午谷时，少侠与姑苏慕容氏还施水阁执事慕容彦生死决战，不慎失手命陨古碑林下。',
            forbidEscapeReason: '《希夷手泽道卷》系华山道统命脉，人在卷在，誓死不退！',
            introText: '【1v1 生死决战】以地阶《希夷剑法》迎战一流下品强敌【还施水阁执事 · 慕容彦】！',
            onWin: [openScene('scene_hsq05_17', HUASHAN_Q05_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq05_17: {
    id: 'scene_hsq05_17',
    title: '第十七幕 · 大象无形',
    subtitle: '子午谷松碑林 · 一剑破巧',
    illustrationUrl: '/assets/quests/hs_q05_xiyi_triumph.jpg',
    illustrationCaption: '大象无形 · 圆融剑幕后发先至重创慕容搜书客，返山晋位真传',
    mandatory: true,
    beats: [
      N('慕容彦将参合吐纳功催至十成，一柄长剑在十余合内连变江南、巴蜀、塞北七家名门剑招，剑影纷繁如乱花迷眼，诱你出剑相格！'),
      N('你双耳不闻剑风呼啸，双目不眩奇招幻影，只守一团圆融无隙的希夷剑幕。待慕容彦第七式变招换劲、自以为寻见你左胁空门挺剑疾刺之际——你手中青锋如云破月出，自不可能之无形角度后发先至！'),
      N('“噗嗤——咔嚓！”青钢剑刃先震断慕容彦手中精钢长剑，余势不衰，一剑穿透其右肩琵琶骨，带出一蓬殷红血花！'),
    ],
    onFinishEffects: [openScene('scene_hsq05_18', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_18: {
    id: 'scene_hsq05_18',
    title: '第十八幕 · 狼狈遁逃',
    subtitle: '子午谷北口',
    mandatory: true,
    beats: [
      S(SPEAKER_MURONG_YAN, '（脸色惨白如纸，死死捂住血流如注的右肩，惊骇欲绝）“无招可摹……无迹可寻！这便是陈抟希夷剑意么？！走！”'),
      N('慕容彦再不敢恋战，抓起地上的苏星帆，强提燕子三抄水轻功钻入终南密林深雾狼狈逃窜。'),
      S('NPC-0166', '（走上前细看你背上毫发无损的乌铜长匣，眼底满是骄傲笑意）“好孩子！临大敌而不惊，初习《希夷剑法》便能跨阶重创一流下品的还施水阁执事——走罢，随师叔回紫霞正气主殿向掌门师兄报喜！”'),
    ],
    choices: [
      {
        id: 'hsq05_escort_back_huashan',
        label: '护持《希夷手泽道卷》，随宁清羽返回华山紫霞正气主殿',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q05_QUEST_ID, 'escort_return_zixia'),
          toast('重创慕容搜书使！请返回【玉女峰紫霞道观 · 紫霞正气主殿】呈卷复命！', 'success', '大象无形'),
        ],
      },
    ],
  },

  scene_hsq05_19: {
    id: 'scene_hsq05_19',
    title: '第十九幕 · 奉卷归山',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('瑞雪初晴，西岳玉女峰霞光万道。你步入庄严肃穆的紫霞正气主殿，解下背上紫绫乌铜长匣，双手高举过顶呈交掌门岳沧溟。'),
      P('“弟子幸不辱命，已自终南古观迎回陈抟老祖《希夷手泽道卷》，完璧归山，请掌门查验！”'),
      N('岳沧溟郑重接过铜匣，验看紫泥封缄完好如初，再看你内息绵长澄澈、双目神光内敛，不由抚须动容。'),
    ],
    onFinishEffects: [openScene('scene_hsq05_20', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_20: {
    id: 'scene_hsq05_20',
    title: '第二十幕 · 掌门考语',
    subtitle: '紫霞正气主殿',
    mandatory: true,
    beats: [
      N('宁清羽将你在终南经阁以虚静一子破陈抟博台残局、以及子午谷松碑林临阵顿悟《希夷剑法》独挫一流下品慕容彦的经过娓娓道来。'),
      S('NPC-0118', '（展卷仰望祖师画像，朗声长笑）“好！好一个『弃有形而取无相，后发而先至』！昔年博台分宗之夜，封师弟曾断言气宗弟子遇强敌快剑必死无疑；今日你在子午谷以希夷无相剑正面击溃擅破百家剑招的姑苏慕容执事，足证我紫霞正脉大道煌煌！”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_21', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_21: {
    id: 'scene_hsq05_21',
    title: '第二十一幕 · 紫绶真传',
    subtitle: '紫霞正气主殿 · 晋位大典',
    mandatory: true,
    beats: [
      N('钟鼓齐鸣，高沧云与山上诸位执事同门齐聚殿前。岳沧溟亲手将《希夷手泽道卷》供奉于祖师龛上，随即取出一枚镌刻太岳紫云纹的白玉剑佩与紫绶剑穗，系于你的青锋剑柄之上！'),
      S('NPC-0118', '“自今日起，擢升你为我西岳华山派【真传弟子】，位列气宗核心法嗣！望你戒骄戒躁，将养吾之浩然、混元之刚柔、希夷之虚静融为一炉，他日共擎西岳门楣！”'),
    ],
    onFinishEffects: [openScene('scene_hsq05_22', HUASHAN_Q05_QUEST_ID)],
  },

  scene_hsq05_22: {
    id: 'scene_hsq05_22',
    title: '第二十二幕 · 西岳中流',
    subtitle: '玉女峰紫霞道观',
    mandatory: true,
    beats: [
      S('NPC-0202', '（含笑上前拱手道贺）“恭喜{gender:师弟|师妹}晋位真传！如今我气宗一脉双剑并立，纵使前路江湖风波再急，亦何惧哉！”'),
      N('你手抚紫绶剑穗，遥望殿外浩瀚云海与巍峨落雁、朝阳诸峰，胸中道心澄明如镜，正式跻身华山派真传弟子之列！'),
    ],
    choices: [
      {
        id: 'hsq05_complete_promotion',
        label: '叩谢掌门与宁师叔授剑之恩，正式晋位【华山真传弟子】！',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-05', rank: 3, promoteOnly: true },
          { type: 'addArtExp', artId: 'MA-089', amount: 280 },
          { type: 'giveSilver', amount: 120, reason: '护送希夷道卷归山并挫败还施水阁赏银' },
          { type: 'addSectContribution', amount: 90 },
          { type: 'giveCombatExp', amount: 170, reason: '子午谷松碑悟希夷剑法重创慕容彦' },
          { type: 'modifyRenown', delta: 25, reason: '子午谷希夷无相剑击败还施水阁搜书使' },
          { type: 'modifySkill', key: '棋', delta: 2 },
          { type: 'completeQuest', questId: HUASHAN_Q05_QUEST_ID },
          toast('已晋升华山派 Lv.3【真传弟子】！精进地阶《希夷剑法》与弈棋修为！', 'success', '紫绶真传'),
        ],
      },
    ],
  },
}
