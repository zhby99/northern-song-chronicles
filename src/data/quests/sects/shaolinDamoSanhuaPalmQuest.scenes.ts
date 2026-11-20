import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q10_QUEST_ID } from './shaolinDamoSanhuaPalmQuest'

const SPEAKER_BOATMAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '洛水老船夫',
  title: '洛阳渡口艄公',
  factionName: '洛阳百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_ELDER_HOSTAGE: StorySpeakerSpec = {
  kind: 'custom',
  name: '温老英雄',
  title: '洛阳牡丹会受邀名宿',
  factionName: '中原武林',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_POISON_DEMONESS: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒罗刹 · 柳碧烟',
  title: '星宿派妖女',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
}

const SPEAKER_XINGXIU_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐骨子',
  title: '星宿派护法',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildPoisonDemoness(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ10_POISON_DEMONESS',
    name: '毒罗刹 · 柳碧烟',
    title: '星宿派妖女',
    realm: '二流中品',
    factionName: '星宿派',
    sectRank: 2,
    sectRankLabel: '星宿妖女',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
    talk: '“小和尚竟能把本姑娘的百花迷魂散原样吹回来？哼，那就尝尝星宿五毒砂掌的厉害！”',
    stats: { hp: 1460, mp: 920, agi: 53, res: 34 },
    talents: { bone: 70, comprehension: 72, charm: 76 },
    equippedArts: {
      neigong: 'MA-081',
      qinggong: 'MA-158',
      move1: 'MA-127',
      move2: 'MA-137',
      move3: 'MA-065',
    },
    learnedArts: [
      { artId: 'MA-081', level: 5 },
      { artId: 'MA-158', level: 5 },
      { artId: 'MA-127', level: 6 },
      { artId: 'MA-137', level: 5 },
      { artId: 'MA-065', level: 4 },
    ],
  })
}

function buildXingxiuGuard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ10_XINGXIU_GUARD',
    name: '腐骨子',
    title: '星宿派护法',
    realm: '二流下品',
    factionName: '星宿派',
    sectRank: 2,
    sectRankLabel: '星宿护法',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“柳师姐莫慌，待我以腐毒掌封死这小秃驴的退路，将他推进洛水喂鱼！”',
    stats: { hp: 1120, mp: 680, agi: 45, res: 27 },
    talents: { bone: 64, comprehension: 58, charm: 32 },
    equippedArts: { neigong: 'MA-231', qinggong: 'MA-157', move1: 'MA-127', move2: 'MA-137' },
    learnedArts: [
      { artId: 'MA-231', level: 6 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-127', level: 5 },
      { artId: 'MA-137', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq10_01: {
    id: 'scene_slq10_01',
    title: '第一幕 · 崖畔落英',
    subtitle: '达摩院 · 绝壁石刻剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，嵩山涧畔山桃盛放。一阵暖风掠过剑痕崖，将无数粉白花瓣卷上青石，竟在石桌棋枰上铺了薄薄一层落英。'),
      N('玄难首座独坐石枰前，指间拈着一枚黑子迟迟未落，案头却摊着一封以火漆急封的洛阳飞鸽密笺。'),
      S('NPC-0127', '（抬眸望向走近的你，神色凝重）“你来得正好。方才洛阳白马寺老方丈遣信鸽传来急报——洛阳牡丹盛会才启三日，城中便有三名武林名宿离奇失踪，案发现场皆残留着一股异香刺鼻的五彩花粉。”'),
      P('（微惊合十）“五彩迷魂花粉？莫非是西域星宿海一脉的妖人潜入中原了？”'),
    ],
    onFinishEffects: [openScene('scene_slq10_02', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_02: {
    id: 'scene_slq10_02',
    title: '第二幕 · 洛水暗流',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '“正是！据洛阳义士暗中查访，动手之人乃星宿派近年声名狼藉的妖女『毒罗刹 · 柳碧烟』，身旁还跟着一名星宿护法『腐骨子』。二人包下洛水一艘豪华画舫，借赏牡丹、品茗论道之名诱骗名宿登舟，再以『百花迷魂散』迷翻囚禁，图谋勒索各派武学典籍！”'),
      P('“星宿妖人竟敢在天子脚下的西京洛阳如此猖獗！弟子愿即刻下山，救出诸位名宿！”'),
      S('NPC-0127', '（微微摇头，按住你肩头）“且慢！那毒罗刹的迷魂花粉随风弥散，寻常刚猛拳掌一拍即散，反倒容易将毒烟吸入肺腑。若无克制奇门毒雾的掌法与步法，贸然登舟只怕也要着了妖女的道。”'),
    ],
    onFinishEffects: [openScene('scene_slq10_03', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_03: {
    id: 'scene_slq10_03',
    title: '第三幕 · 禅棋借风',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('玄难忽地起身，宽大僧袖轻轻一拂。奇异的一幕顿生：原本散落满枰的山桃花瓣竟如受无形丝线牵引，齐齐腾空飞旋，在棋枰上方织成一道绚烂花环，却无一片沾到玄难衣角！'),
      S('NPC-0127', '“这便是少林达摩院独门掌法——《散花掌》！取『天女散花，着身不染』之佛经意境。你平日善弈围棋，当知棋盘之上『弃子争先、借势围空』之理；《散花掌》步法便暗合棋盘天元八方，掌风不走直线硬撞，而是化作柔旋气涡，借敌之风、反卷敌毒！”'),
      P('（目不转睛盯着半空回旋不落的桃花瓣，心中豁然贯通）“以柔旋掌风成涡，既隔绝毒粉近身，又能顺风卷回反噬施毒之人——好精妙的禅掌！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_04', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_04: {
    id: 'scene_slq10_04',
    title: '第四幕 · 落英演掌',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('玄难将《散花掌》三十六路步法与「飞花逐月」「回风拂柳」「满天花雨」三式核心吐纳倾囊相授，又令你以山风落英为靶，当场演练。'),
      N('你脚踏棋盘星位，双掌如蝴蝶穿花般连环翻飞。起初花瓣四下乱飞，待你沉心收束内息、以《罗汉伏虎功》柔劲贯注掌缘，漫天落英竟真的随你掌势聚散成环，反向山崖外飘飞数丈！'),
      S('NPC-0127', '（含笑点头）“善哉！短短半日便能卷英不沾衣，你在书棋禅定上下的苦功果然没有白费。”'),
    ],
    onFinishEffects: [openScene('scene_slq10_05', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_05: {
    id: 'scene_slq10_05',
    title: '第五幕 · 赐药叮嘱',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('玄难自怀中取出两粒清香扑鼻的少林「清心解毒丹」交予你防身，又叮嘱道：'),
      S('NPC-0127', '“洛水画舫多达数十艘，那毒罗刹行踪诡秘，必常换泊位。你下山后先往洛阳酒肆走一遭——南来北往的艄公与酒客消息最灵通，定能问出那艘挂着异色牡丹灯的星宿画舫停在何处。”'),
      P('“弟子明白！定当先暗查虚实，再择机登舟救人，绝不打草惊蛇！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_06', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_06: {
    id: 'scene_slq10_06',
    title: '第六幕 · 辞山赴洛',
    subtitle: '嵩山山道 · 望洛阳',
    mandatory: true,
    beats: [
      N('辞别玄难首座，你换上一袭素净行脚僧袍，只携两粒解毒丹与满怀禅定之意，踏着暮春晚风直奔西京洛阳。'),
      N('此时洛阳城内外花市如潮，灯火将半条洛水映成锦绣长河，而那暗藏剧毒的星宿妖舟，正悄然隐匿在万千画舫之中。'),
    ],
    choices: [
      {
        id: 'slq10_depart_luoyang',
        label: '下山直奔洛阳酒肆，暗访洛水画舫踪迹',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q10_QUEST_ID, stepId: 'luoyang_boat_probe' },
          setStep(SHAOLIN_Q10_QUEST_ID, 'luoyang_boat_probe'),
          toast('已开启《洛水飞花 · 散花破幻》！请前往【洛阳府 · 洛阳酒肆】打探星宿画舫踪迹。', 'talk', '洛水飞花'),
        ],
      },
    ],
  },

  scene_slq10_07: {
    id: 'scene_slq10_07',
    title: '第七幕 · 酒肆风声',
    subtitle: '洛阳府 · 洛阳酒肆',
    mandatory: true,
    beats: [
      N('洛阳酒肆毗邻洛水码头，暮色降临时座无虚席。你择了临窗一角静坐，点了一壶清茶，凝神倾听满堂酒客与渡口艄公的闲谈。'),
      N('不多时，邻桌一名浑身酒气的洛水老船夫压低嗓音，正与同伴窃窃私语，提及「紫牡丹灯」「甜得发腻的异香」「上了船就不见下来」等语。'),
      P('（起身合十，轻步走到老船夫桌前）“阿弥陀佛。老施主方才提及洛水上有艘挂紫牡丹灯的画舫，不知那船今夜泊在何处渡口？”'),
      S(SPEAKER_BOATMAN, '（打量你一番，见是少林僧人，忙压低声音）“小师父可别往那艘『瑶华舫』凑！那船主是个娇滴滴的西域女娘，每夜亥时便把船撑到城西芦苇荡深处，连咱们摇橹的靠近都要头晕眼花，前日温老英雄几位豪客登船赏花，至今连个影儿都没见着！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_08', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_08: {
    id: 'scene_slq10_08',
    title: '第八幕 · 瑶华夜舫',
    subtitle: '洛阳城西 · 洛水芦苇荡',
    illustrationUrl: '/assets/quests/sl_10_luoshui_boat.jpg',
    illustrationCaption: '洛水夜舫 · 紫灯雾笼瑶华舟，毒香暗浮藏妖踪',
    mandatory: true,
    beats: [
      N('你谢过老船夫，趁着亥时月黑风高，借了一叶无篷渔舟，以禅息控桨，悄无声息滑入城西雾气弥漫的芦苇荡深处。'),
      N('拨开层层苇叶，一艘雕梁画栋的两层画舫赫然浮现水面！船头高悬两盏诡异的暗紫色牡丹纱灯，丝竹声若有若无，空气中却飘荡着一股令人胸口发闷的甜腻花香。'),
      P('（先服下一粒玄难所赐清心解毒丹，足尖轻点船舷，如一瓣落樱无声跃上画舫二层飞檐）“果然在此！且听舱内动静！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_09', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_09: {
    id: 'scene_slq10_09',
    title: '第九幕 · 舱中毒局',
    subtitle: '洛水瑶华画舫 · 二层船舱',
    mandatory: true,
    beats: [
      N('你伏于雕花窗棂之上向内窥视：只见华丽船舱内横七竖八缚着四五名中原武林名宿，皆面色泛青、软绵绵动弹不得，其中一人正是洛阳德高望重的温老英雄！'),
      N('主座之上，一名身着紫翠轻纱、指染丹蔻的妖娆女子正把玩着一只描金香炉，笑声银铃般清脆却透着刺骨寒意；她身旁立着一名瘦骨嶙峋、十指乌黑的阴森道人。'),
      S(SPEAKER_POISON_DEMONESS, '（轻拂袖口，掩唇娇笑）“温老英雄，您何苦死撑着呢？我星宿派的『百花迷魂散』若无独门解药，十二个时辰便会化去毕生内力。只要各位乖乖写下本门心法，奴家立刻奉上解药，送诸位回城赏牡丹，岂不美哉？”'),
      S(SPEAKER_ELDER_HOSTAGE, '（咬牙怒骂，声音却已虚弱）“呸！星宿妖女……行此下作毒计，中原武林绝不会放过你们！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_10', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_10: {
    id: 'scene_slq10_10',
    title: '第十幕 · 破窗降魔',
    subtitle: '洛水瑶华画舫 · 船舱',
    mandatory: true,
    beats: [
      S(SPEAKER_XINGXIU_GUARD, '（阴恻恻冷笑，举起乌黑毒爪逼近温老英雄）“柳师姐，这老匹夫嘴硬得很，不如先让我废了他一条胳膊，看旁人肯不肯写！”'),
      N('眼看毒爪将落，你不再隐忍，双掌一合推开雕花木窗，身形如大鹏展翅般凌空翻落船舱中央，正正挡在温老英雄身前！'),
      P('（朗声念佛，双目澄明如电）“阿弥陀佛！星宿妖人好大的胆子，竟敢在洛阳牡丹会上暗施毒计残害武林前辈——少林达摩院弟子在此，还不速速交出解药束手就擒！”'),
      S(SPEAKER_POISON_DEMONESS, '（美目骤寒，旋即媚笑出声）“哟，我当是哪路大侠，原来是个细皮嫩肉的小和尚！竟敢孤身闯我瑶华舫，真是自寻死路！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_11', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_11: {
    id: 'scene_slq10_11',
    title: '第十一幕 · 毒粉漫天',
    subtitle: '洛水瑶华画舫 · 船舱',
    mandatory: true,
    beats: [
      N('毒罗刹娇笑声未落，左右广袖猛然一抖！两蓬五光十色的诡异花粉瞬间自袖口喷薄而出，化作一片绚烂毒雾，铺天盖地向你面门与周身罩来！'),
      S(SPEAKER_ELDER_HOSTAGE, '（骇然惊呼）“小师父快屏息退后！那就是她的『百花迷魂散』，沾皮即麻，吸一口便要功力尽散！”'),
      S(SPEAKER_POISON_DEMONESS, '（得意洋洋地掩鼻后退）“退？船舱就这么大，往哪儿退？小和尚，乖乖倒下给奴家当试毒药人吧！”'),
    ],
    choices: [
      {
        id: 'slq10_counter_poison_wind',
        label: '脚踏禅棋步法，施展《散花掌》卷回漫天毒粉！',
        subLabel: '以柔旋掌风成涡，反噬星宿妖人',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q10_QUEST_ID, 'luoshui_boat_battle'),
          openScene('scene_slq10_12', SHAOLIN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq10_12: {
    id: 'scene_slq10_12',
    title: '第十二幕 · 散花反噬',
    subtitle: '洛水瑶华画舫 · 船舱',
    mandatory: true,
    beats: [
      N('面对扑面毒雾，你非但不退，反而沉腰踏出玄难所授的禅棋八方步，双掌化作漫天虚影连环画圆——正是《散花掌》绝招「回风拂柳」接「满天花雨」！'),
      N('“呼——！”柔和却绵密无匹的旋转掌风瞬间在船舱中掀起一道清冽气涡！五彩毒粉尚未近你身前三尺，竟齐齐被气涡兜住、逆转方向，化作一条彩色毒龙呼啸着反卷向毒罗刹与腐骨子面门！'),
      S(SPEAKER_POISON_DEMONESS, '（花容失色，尖叫着挥袖疾遮）“什么？！这……这是什么妖掌，竟能把我的毒粉原封不动吹回来？！”'),
      S(SPEAKER_XINGXIU_GUARD, '（措手不及呛入一口自家迷烟，顿时咳嗽连连、眼冒金星）“咳咳咳！该死的秃驴，竟敢暗算爷爷！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_13', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_13: {
    id: 'scene_slq10_13',
    title: '第十三幕 · 妖人困兽',
    subtitle: '洛水瑶华画舫 · 甲板',
    mandatory: true,
    beats: [
      N('二凶被自家毒雾反噬得狼狈不堪，撞破雕花舱门翻滚到画舫甲板上。毒罗刹急吞一粒解毒丸，双目赤红如毒蛇，与恼羞成怒的腐骨子一左一右将你围在月下船头！'),
      S(SPEAKER_POISON_DEMONESS, '（咬牙切齿，十指泛起惨绿毒光）“好个难缠的少林小僧！腐骨师弟，别再藏私，联手用五毒砂掌和抽髓掌撕碎他！”'),
      P('（稳立船头，任凭洛水夜风鼓荡僧袍，双掌一立摆开散花掌架）“阿弥陀佛！邪不胜正，今日便破了你们星宿派的毒阵！”'),
    ],
    onFinishEffects: [openScene('scene_slq10_14', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_14: {
    id: 'scene_slq10_14',
    title: '第十四幕 · 画舫决锋',
    subtitle: '洛水画舫甲板（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('月映洛水，舟身随浪起伏。毒罗刹身法诡魅飘忽，腐骨子掌风腥臭逼人，二人一快一狠联手扑杀！你须以《散花掌》步法灵动周旋，震晕二凶！'),
    ],
    choices: [
      {
        id: 'slq10_fight_xingxiu',
        label: '施展《散花掌》迎战毒罗刹与腐骨子！（车轮连战 实战）',
        subLabel: '二流中品妖女与二流下品护法联手围攻',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonDemoness() },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuGuard() }],
            rule: 'story_trial',
            forbidEscapeReason: '船舱内尚有数位中毒名宿待救，绝不可弃舟而走！',
            introText: '【车轮连战 · 洛水破毒】迎战星宿妖女【毒罗刹 · 柳碧烟】（二流中品）与护法【腐骨子】！',
            onWin: [openScene('scene_slq10_15', SHAOLIN_Q10_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('星宿二凶毒掌联手狠辣，暂跃回船篷调息再战！', 'warn', '洛水飞花'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq10_15: {
    id: 'scene_slq10_15',
    title: '第十五幕 · 飞花震晕',
    subtitle: '洛水瑶华画舫 · 甲板',
    illustrationUrl: '/assets/quests/sl_10_xingxiu_defeat.jpg',
    illustrationCaption: '散花破幻 · 双掌翻飞震晕星宿妖女与护法，洛水波平',
    mandatory: true,
    beats: [
      N('十余合激斗，你足踏棋局玄机，在摇晃的甲板上步履如履平地！眼见腐骨子双掌猛扑露出胁下空门，你左掌轻拍其肘弯借力一送，竟将他撞向毒罗刹袭来的毒掌！'),
      N('二凶慌忙收劲错身，就在旧力已尽、新力未生的一瞬，你身形如落英穿花掠过二人之间，双掌齐出「天女散花」，柔劲透入二人肩井、风池二穴！'),
      N('“扑通！扑通！”毒罗刹与腐骨子连哼都没哼出一声，齐齐翻白眼软倒在甲板上，人事不省！'),
    ],
    onFinishEffects: [openScene('scene_slq10_16', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_16: {
    id: 'scene_slq10_16',
    title: '第十六幕 · 搜药救人',
    subtitle: '洛水瑶华画舫 · 船舱',
    mandatory: true,
    beats: [
      N('你不敢耽搁，先以绳索将昏迷的二凶反绑稳妥，又自毒罗刹怀中搜出贴着「百花清露」封签的碧玉药瓶，快步回舱为温老英雄等五位名宿逐一松绑喂药。'),
      N('片刻之后，众名宿脸上青气渐退，内息重新流转，纷纷挣扎着起身向你抱拳深深一揖！'),
      S(SPEAKER_ELDER_HOSTAGE, '（老泪纵横，感激涕零）“若非少林高徒神兵天降、以绝世掌法反卷毒雾，老朽与几位兄弟今晚非但要身败名裂，更要连累各派秘籍落入星宿魔爪！请受老朽一拜！”'),
      P('（忙上前搀扶）“温老英雄折煞小僧了。除恶护善本是佛门分内之事，诸位前辈平安无恙便好。”'),
    ],
    onFinishEffects: [openScene('scene_slq10_17', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_17: {
    id: 'scene_slq10_17',
    title: '第十七幕 · 洛阳佳话',
    subtitle: '洛阳渡口 · 晨光初现',
    mandatory: true,
    beats: [
      N('天色微明时，温老英雄遣人报知洛阳府衙与白马寺，将昏迷的毒罗刹与腐骨子押解入狱听候发落。一夜之间，「少林达摩院高徒洛水散花破星宿」的佳话便传遍了牡丹花市！'),
      N('你婉拒了洛阳众豪杰的盛情宴请，只在渡口遥望东边嵩山轮廓，便自启程还山。'),
    ],
    onFinishEffects: [openScene('scene_slq10_18', SHAOLIN_Q10_QUEST_ID)],
  },

  scene_slq10_18: {
    id: 'scene_slq10_18',
    title: '第十八幕 · 散花圆融',
    subtitle: '达摩院 · 剑痕崖复命',
    mandatory: true,
    beats: [
      N('回到嵩山达摩院，玄难首座早已得白马寺飞鸽贺信，见你风尘仆仆归来，抚掌赞叹不已。'),
      S('NPC-0127', '“以禅棋步法御敌，以散花柔劲反卷星宿毒粉，既全人命，又扬佛威——此番历练，你已将《散花掌》三十六路精髓融会贯通！这卷全本法诀，今日正式归你研习！”'),
      P('（合十接过法卷，只觉掌心禅意流转、棋心愈明）“多谢师伯栽培，弟子定当益加精进！”'),
    ],
    choices: [
      {
        id: 'slq10_complete',
        label: '拜谢玄难首座，正式领受《散花掌》全本传承',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-105' },
          { type: 'giveCombatExp', amount: 340, reason: '洛水画舫以散花掌反卷毒粉力挫星宿妖女' },
          { type: 'addSectContribution', amount: 140 },
          { type: 'modifySkill', key: '棋', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyChivalry', delta: 20, reason: '夜探洛水画舫破星宿迷毒救下武林名宿' },
          { type: 'completeQuest', questId: SHAOLIN_Q10_QUEST_ID, outcome: 'completed' },
          toast('已完成《洛水飞花 · 散花破幻》，习得《散花掌》！', 'success', '洛水飞花'),
        ],
      },
    ],
  },
}
