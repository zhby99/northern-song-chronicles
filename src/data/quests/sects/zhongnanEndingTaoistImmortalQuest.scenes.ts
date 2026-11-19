import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q39_QUEST_ID } from './zhongnanEndingTaoistImmortalQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq39_01: {
    id: 'scene_znq39_01',
    title: '第一幕 · 秋云无心',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}清秋，终南山云海舒卷，苍松翠柏间仙鹤翩跹。重阳玄门清修主殿内香烟静袅，紫阳真人王重楼正与丹阳子马钰玄议定观中传位大事。'),
      S('NPC-0133', '（见你缓步入殿，眉宇间清净如秋水明月，含笑颔首）“如今道墓合流、塞北靖平，老道正与钰玄商议择日将终南掌门大位传予你，你意下如何？”'),
    ],
    onFinishEffects: [openScene('scene_znq39_02', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_02: {
    id: 'scene_znq39_02',
    title: '第二幕 · 婉辞掌门',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P('（稽首深深一礼，神色澄澈淡然）“承蒙师父与诸位师兄信重，弟子铭感五内。然弟子近日参悟《先天功》与道藏真经，忽有所感——掌门之位虽尊，却终究为门户俗务、权柄应酬所累。”'),
      P('“弟子心中所求，并非号令江湖之权位，而是破除万法樊篱、追寻庄子所谓‘坐忘太虚’的天人大道。故敢冒昧，恳请师父准许弟子辞去掌门之位！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_03', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_03: {
    id: 'scene_znq39_03',
    title: '第三幕 · 举贤让能',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄一惊，连忙劝道）“{gender:师弟|师妹}！你功勋盖世、武功绝顶，若你不坐这掌门位，终南两脉谁能担此重任？”'),
      P('（微笑望向马钰玄）“马师兄仁厚沉稳、德望素著，最宜执掌前山重阳古观，弘扬玄门清修教化；而后山活死人墓有冷清秋师姐心思缜密、冰清玉洁，足可主理幽谷一脉。两脉既已合流，马师兄与冷师姐分理前后山务，互为犄角，必胜过我一人独揽俗务百倍！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_04', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_04: {
    id: 'scene_znq39_04',
    title: '第四幕 · 紫阳击节',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('殿内静默片刻，王重楼忽然抚须朗声大笑，笑声中竟透出几分欣慰与自叹弗如！'),
      S('NPC-0133', '“哈哈哈！老道当年苦苦放不下抗辽大业与门派名利，直到鬓发斑白才悟透‘无为而治’四字。没想到你年纪轻轻，竟比老道看得还通透！钰玄掌观，清秋理墓，而你超脱俗务之外——妙哉！大妙！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_05', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_05: {
    id: 'scene_znq39_05',
    title: '第五幕 · 鸿书邀贤',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '“既然你立志追寻无上大道，老道倒有一桩天大的机缘告诉你——近日泉州文官、奉旨编纂《万寿道藏》的奇人【黄裳】，与武当山【张玄素】真人联袂游历关中，闻你先天功与两脉剑道大成，特递帖求赴终南论道！”'),
      P('（双眸一亮，难掩喜色）“道藏真君黄裳先生与武当太和真人张玄素？！此二位乃当世道门学问与武道之绝巅！弟子愿于【银练飞瀑清泉石茗案】扫径烹茶，恭迎二位前辈大驾！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_06', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_06: {
    id: 'scene_znq39_06',
    title: '第六幕 · 辞位归真',
    subtitle: '重阳玄门主殿 · 举贤让能',
    illustrationUrl: '/assets/quests/zn_q39_decline_throne.jpg',
    illustrationCaption: '重阳玄门清修主殿 · 婉辞俗务掌门位，举荐马钰玄掌观、冷清秋理墓，超然求道',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄郑重稽首）“既蒙师父与{gender:师弟|师妹}重托，钰玄敢不竭尽全力守好重阳古观！后山清泉论道之盛会，我即刻命弟子备好上等松茗清泉，绝不令半点凡尘杂事打扰！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_07', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_07: {
    id: 'scene_znq39_07',
    title: '第七幕 · 扫径烹茶',
    subtitle: '终南后山幽径',
    mandatory: true,
    beats: [
      N('你辞别前山道院，卸下一切门户俗务，独自轻衣缓带步向后山银练飞瀑清泉石茗案。'),
    ],
    onFinishEffects: [openScene('scene_znq39_08', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_08: {
    id: 'scene_znq39_08',
    title: '第八幕 · 静候高贤',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('飞瀑如银，秋水澄澈。石茗案上松炉已沸，只待当世两大道宗奇人踏云而来。'),
    ],
    choices: [
      {
        id: 'znq39_accept',
        label: '赴【银练飞瀑清泉石茗案】，迎候黄裳与张玄素坐忘论道！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q39_QUEST_ID, stepId: 'falls_dao_summit' },
          setStep(ZHONGNAN_Q39_QUEST_ID, 'falls_dao_summit'),
          toast('已开启终局《坐忘太虚 · 道藏真君》！请赴【银练飞瀑清泉石茗案】迎贤论道！', 'talk', '坐忘太虚'),
        ],
      },
    ],
  },

  scene_znq39_09: {
    id: 'scene_znq39_09',
    title: '第九幕 · 二老登临',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('秋阳透过红叶洒在银练飞瀑清泉石茗案上。不多时，两道气度非凡的身影踏着落叶步入山涧——'),
      N('左侧一人身着朴素文士青衫，虽无半点兵刃，举手投足间却暗合河图洛书、天道运转之妙，正是《万寿道藏》编纂者、一代奇人【黄裳】；右侧一人白须飘逸、道骨仙风，正是武当派宗师太和真人【张玄素】！'),
    ],
    onFinishEffects: [openScene('scene_znq39_10', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_10: {
    id: 'scene_znq39_10',
    title: '第十幕 · 清泉叙礼',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P('（躬身迎上，执晚辈大礼）“终南后学，恭迎黄先生、张真人法驾光临寒玉涧！”'),
      S('NPC-0107', '（黄裳微笑还礼，目光温润却仿佛能洞穿人心）“闻道有先后，达者为师。{gender:小友|女道友}辞去终南掌门权柄而独守清泉悟道，这份胸襟，连黄某亦深感佩服。”'),
      S('NPC-0119', '（张玄素拂尘轻摆，朗声笑道）“无量寿佛！老道在武当山听闻终南出了位兼通纯阳先天与寒玉阴柔的奇才，今日特来讨一杯清泉松茗，顺道印证一番太极阴阳之道！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_11', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_11: {
    id: 'scene_znq39_11',
    title: '第十一幕 · 烹茶启论',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('三人在飞瀑前的青石案畔分宾主落座。清泉煮松茗，雾气袅袅升腾，一场足以载入大宋道门史册的七昼夜“终南坐忘论道”，就此启幕！'),
    ],
    onFinishEffects: [openScene('scene_znq39_12', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_12: {
    id: 'scene_znq39_12',
    title: '第十二幕 · 三贤聚瀑',
    subtitle: '银练飞瀑清泉石茗案 · 迎贤设茗',
    illustrationUrl: '/assets/quests/zn_q39_guests_arrive.jpg',
    illustrationCaption: '银练飞瀑清泉石茗案 · 黄裳与张玄素联袂登临终南，三贤烹茶论道气度超凡',
    mandatory: true,
    beats: [
      N('第一日论《道德经》“致虚极，守静笃”；第二日论《黄庭经》内丹周天；第三日论道家阴阳消长与天下武学同源之理！'),
    ],
    onFinishEffects: [openScene('scene_znq39_13', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_13: {
    id: 'scene_znq39_13',
    title: '第十三幕 · 太和问武',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('论至第四日黎明，张玄素眼中精光湛然，起身轻挥拂尘笑道：“纸上谈道终觉浅，须以拳脚印真机！我武当以柔克刚、圆转太极，正合与终南先天纯阳印证一二，请！”'),
      P('（微笑起身，长揖为礼）“能与张真人以武论道，实乃平生大幸！请真人赐教！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_14', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_14: {
    id: 'scene_znq39_14',
    title: '第十四幕 · 太极印先天',
    subtitle: '银练飞瀑 · 切磋张玄素',
    mandatory: true,
    beats: [
      N('清泉水雾之中，太和真人张玄素衣袂飘举，周身真气如绵绵云海缓缓推来，你则运起先天一炁坦然相迎！'),
    ],
    choices: [
      {
        id: 'znq39_spar_zhang',
        label: '与武当【太和真人 · 张玄素】以武论道，印证太极与先天！',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q39_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0119' },
            rule: 'spar',
            lethalOnLose: false,
            forbidEscapeReason: '清泉论道切磋，正宜尽兴印证！',
            introText: '银练飞瀑之前，你与武当太和真人张玄素以武印道！',
            onWin: [openScene('scene_znq39_15', ZHONGNAN_Q39_QUEST_ID)],
            onLose: [openScene('scene_znq39_15', ZHONGNAN_Q39_QUEST_ID)],
            onDraw: [openScene('scene_znq39_15', ZHONGNAN_Q39_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_znq39_15: {
    id: 'scene_znq39_15',
    title: '第十五幕 · 圆融相契',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('数十合交手，毫无半点金铁杀伐之声，唯有清风拂水、云卷云舒般的圆融气机流转。张玄素收手大笑，抚须叹道：“武当太极与终南先天，果真殊途同归！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_16', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_16: {
    id: 'scene_znq39_16',
    title: '第十六幕 · 道藏真机',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('第五日夜，繁星满天。黄裳仰观北斗，缓声道：“黄某奉皇命校勘五千四百八十一卷《万寿道藏》，日夜诵读，忽觉天地万物无非‘天之道，损有余而补不足’。”'),
      S('NPC-0107', '（以指沾茶水在青石案上画出阴晴圆缺之象）“世人练武，皆求刚猛霸道、胜过旁人；殊不知损己之余、顺天之势，方能无招胜有招，以虚空纳百川。”'),
    ],
    onFinishEffects: [openScene('scene_znq39_17', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_17: {
    id: 'scene_znq39_17',
    title: '第十七幕 · 虚空印证',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('听黄裳一席道藏妙论，你只觉识海之中豁然洞开一扇通往天地至理的无形大门！昔日所修先天功、玉女心经、七星剑法，竟在脑海中尽数化去繁复招式，归于寥寥数道大道真意！'),
    ],
    onFinishEffects: [openScene('scene_znq39_18', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_18: {
    id: 'scene_znq39_18',
    title: '第十八幕 · 七昼论道',
    subtitle: '银练飞瀑 · 三贤坐忘',
    illustrationUrl: '/assets/quests/zn_q39_dao_debate.jpg',
    illustrationCaption: '清泉石茗案 · 星河倒映飞瀑，你与黄裳、张玄素坐忘论道七昼夜，青石茶痕暗合天道',
    mandatory: true,
    beats: [
      S('NPC-0107', '（含笑起身，青衫无风自动）“见猎心喜！黄某虽是文官出身，然自道藏中悟出几分粗浅拳意，今日斗胆向{gender:道友|女道友}讨教几招，权作七日论道之收官！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_19', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_19: {
    id: 'scene_znq39_19',
    title: '第十九幕 · 切磋黄裳',
    subtitle: '银练飞瀑 · 道藏真君试手',
    mandatory: true,
    beats: [
      P('（心潮澎湃却灵台空明，拱手微笑）“请黄先生不吝指点！”'),
    ],
    choices: [
      {
        id: 'znq39_spar_huang',
        label: '与【道藏真君 · 黄裳】以道印武，共参九阴太虚之妙！',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q39_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0107' },
            rule: 'spar',
            lethalOnLose: false,
            forbidEscapeReason: '与道藏真君黄裳印证大道，千载难逢，岂可轻离？',
            introText: '星月飞瀑之下，你与道藏真君黄裳以道印武！',
            onWin: [openScene('scene_znq39_20', ZHONGNAN_Q39_QUEST_ID)],
            onLose: [openScene('scene_znq39_20', ZHONGNAN_Q39_QUEST_ID)],
            onDraw: [openScene('scene_znq39_20', ZHONGNAN_Q39_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_znq39_20: {
    id: 'scene_znq39_20',
    title: '第二十幕 · 万法归无',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('与黄裳交手之际，你只觉对手每一招皆似天马行空、无迹可寻，偏偏又处处暗合阴阳造化。激荡之间，你索性彻底放下“胜负”与“招式”之念，随心而动，顺势而发！'),
      N('刹那间，山风、飞瀑、落叶、星光仿佛全数成为你的耳目臂膀！黄裳眼眸骤亮，抚掌赞叹：“好一个坐忘太虚！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_21', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_21: {
    id: 'scene_znq39_21',
    title: '第二十一幕 · 坐忘七日',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('第七日破晓，三人各归蒲团静坐不语。不知过了几个时辰，一轮红日跃出终南云海，万道金辉倾泻在银练飞瀑之上。'),
    ],
    onFinishEffects: [openScene('scene_znq39_22', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_22: {
    id: 'scene_znq39_22',
    title: '第二十二幕 · 天人合一',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你缓缓吐出一口绵长清气，只觉尘世一切喜怒忧惧、名利执念皆如秋露遇阳般化作虚无。丹田内真气不再刻意运转，却时刻与终南天地灵气自然吐纳吞吐，生生不息！'),
    ],
    onFinishEffects: [openScene('scene_znq39_23', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_23: {
    id: 'scene_znq39_23',
    title: '第二十三幕 · 二贤辞别',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-0107', '（整理青衫，微笑作揖）“七日论道，胜读十年道藏。黄某尚须回朝复命刊印经卷，今日就此别过。他日若有缘，再与道友煮茶论天道！”'),
      S('NPC-0119', '（亦稽首含笑）“老道亦该回武当山去了。终南有道友坐忘太虚，实乃大宋玄门之大幸！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_24', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_24: {
    id: 'scene_znq39_24',
    title: '第二十四幕 · 云海相送',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('你拱手目送黄裳与张玄素步出山涧，旋即转身望见王重楼、马钰玄与道墓两脉诸长老正含笑缓步而来。'),
    ],
    onFinishEffects: [openScene('scene_znq39_25', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_25: {
    id: 'scene_znq39_25',
    title: '第二十五幕 · 太虚化境',
    subtitle: '银练飞瀑 · 坐忘悟道',
    illustrationUrl: '/assets/quests/zn_q39_void_epiphany.jpg',
    illustrationCaption: '银练飞瀑晨曦 · 坐忘太虚终悟天人合一，云霞绕身，松鹤自来相伴',
    mandatory: true,
    beats: [
      N('紫阳真人王重楼望见你返璞归真、浑然天成的太虚气象，不由深深一叹，神色满是敬重。'),
    ],
    choices: [
      {
        id: 'znq39_go_ascend',
        label: '聆听紫阳真人与道门诸贤共奉【终南太上隐尊】尊号',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q39_QUEST_ID, 'immortal_ascension'),
          toast('七昼夜坐忘论道已圆满！请于【银练飞瀑清泉石茗案】受奉太上隐尊尊号！', 'success', '坐忘太虚'),
        ],
      },
    ],
  },

  scene_znq39_26: {
    id: 'scene_znq39_26',
    title: '第二十六幕 · 共奉尊号',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-0133', '（缓步上前，郑重稽首）“你虽辞去掌门俗务，然今日与黄裳、张玄素坐忘论道七昼夜，已破开宗师樊篱、证得太虚大道！经我与马钰玄、两脉宿老公议——”'),
      S('NPC-0133', '“自今日起，尊你为【终南太上隐尊】！位在掌门之上而不理俗务，逍遥于终南山水与天下江湖之间，永为终南隐宗无上定海神针！”'),
    ],
    onFinishEffects: [openScene('scene_znq39_27', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_27: {
    id: 'scene_znq39_27',
    title: '第二十七幕 · 诸贤礼敬',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄率终南道墓门人齐齐躬身致礼）“恭贺太上隐尊证道太虚！往后前山古观与后山古墓琐务皆由我等担承，唯愿隐尊常驻清风明月，护佑终南道脉长存！”'),
      P('（淡然含笑，轻挥衣袖托起众人）“诸位不必多礼。山河无事时，我便在此煮茶观瀑、注疏道藏；若天下苍生有难，贫道亦必出山相助。”'),
    ],
    onFinishEffects: [openScene('scene_znq39_28', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_28: {
    id: 'scene_znq39_28',
    title: '第二十八幕 · 著书立说',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('此后岁月中，你在银练飞瀑畔结茅清修，将七日论道所得与终南两脉心法融会贯通，著成《终南太虚录》留赠后世。'),
    ],
    onFinishEffects: [openScene('scene_znq39_29', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_29: {
    id: 'scene_znq39_29',
    title: '第二十九幕 · 朝野钦慕',
    subtitle: '终南山巅',
    mandatory: true,
    beats: [
      N('江湖中鲜有人再见你出手，可天下武林提起“终南太上隐尊”六字，无不肃然起敬；连汴京士大夫与江南名宿亦常千里寄诗，慕你超然物外之仙风道骨。'),
    ],
    onFinishEffects: [openScene('scene_znq39_30', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_30: {
    id: 'scene_znq39_30',
    title: '第三十幕 · 鹤伴清风',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('秋去春来，白鹤栖于古松，清泉漱于青石。你坐忘太虚，心游万仞，已与终南万里云山同寿。'),
    ],
    onFinishEffects: [openScene('scene_znq39_31', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_31: {
    id: 'scene_znq39_31',
    title: '第三十一幕 · 太上隐尊',
    subtitle: '终南山巅 · 道藏真君终局',
    illustrationUrl: '/assets/quests/zn_q39_immortal_recluse.jpg',
    illustrationCaption: '终南绝顶云海 · 终南太上隐尊独坐松下烹茶，仙鹤绕云，坐忘太虚与天地同游',
    mandatory: true,
    beats: [
      N('不恋权柄，独证大道！一代道门超脱传奇就此圆满！'),
    ],
    onFinishEffects: [openScene('scene_znq39_32', ZHONGNAN_Q39_QUEST_ID)],
  },

  scene_znq39_32: {
    id: 'scene_znq39_32',
    title: '第三十二幕 · 坐忘归真',
    subtitle: '银练飞瀑清泉石茗案 · 终局结案',
    mandatory: true,
    beats: [
      N('【终南终局 · 道藏真君】已然铸成！你辞去俗务掌门位，与黄裳、张玄素坐忘论道七昼夜，终证太虚道境，获奉终南隐宗五阶【终南太上隐尊】尊号！'),
    ],
    choices: [
      {
        id: 'znq39_complete',
        label: '坐忘太虚归真，受奉【终南太上隐尊】尊号（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-11', rank: 5, promoteOnly: true },
          { type: 'giveCombatExp', amount: 1900, reason: '与黄裳、张玄素坐忘论道七昼夜，证得太虚大道受奉终南太上隐尊' },
          { type: 'modifyRenown', delta: 350, reason: '辞位求道、坐忘太虚，获天下道门共尊为终南太上隐尊' },
          { type: 'modifyChivalry', delta: 120, reason: '举贤让能不恋权柄，著书传道惠泽苍生' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '棋', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0107' }, delta: 30 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0119' }, delta: 30 },
          { type: 'setFlag', flag: 'zn_ending', value: 'immortal' },
          { type: 'completeQuest', questId: ZHONGNAN_Q39_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《坐忘太虚 · 道藏真君》！晋升终南隐宗五阶【终南太上隐尊】，威望 +350，侠义 +120！',
            'success',
            '太上隐尊',
          ),
        ],
      },
    ],
  },
}
