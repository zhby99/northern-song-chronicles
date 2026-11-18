import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep } from '../../../engine/quest/dsl'
import { buildXixiaGuardGeneralNpc, JINJUN_FINAL_2_ID } from './jinjunFinal2Quest'

const RENZONG = { kind: 'npc' as const, npcId: 'NPC-0001' }
const ZHONG_SHIHENG = { kind: 'npc' as const, npcId: 'NPC-0033' }
const MEIZANG = { kind: 'npc' as const, npcId: 'NPC-0084' }
const LI_QIUSHUI = { kind: 'npc' as const, npcId: 'NPC-0103' }
const WANG = { kind: 'npc' as const, npcId: 'NPC-0038' }
const GUARD = {
  kind: 'custom' as const,
  name: '泾原传令副将',
  title: '殿前司西征军校',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
}
const CIVIL_MINISTER = {
  kind: 'custom' as const,
  name: '朝堂主和文臣',
  title: '中书门下省官员',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_fn2_01: {
    id: 'scene_fn2_01',
    title: '第一幕 · 泾原烽烟起',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('杏子林捷报尚未传遍京师，西北边关已是烽烟蔽日：西夏权臣没藏讹庞亲率十万大军进逼泾原路，三千重甲“铁鹞子”连环铁骑在渭州城外冲垮宋军前哨！'),
      S(CIVIL_MINISTER, '“陛下！好水川覆军之痛犹在眼前，夏军十万来势汹汹，不如暂行厚币议和，以保关中无虞……”'),
    ],
    onFinishEffects: [openScene('scene_fn2_02', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_02: {
    id: 'scene_fn2_02',
    title: '第二幕 · 武将出班争',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('朝堂之上主和之声一片，你一身戎装怒目踏出武将班列，甲叶铿锵作响，震得大殿鸦雀无声。'),
      P('“胡说！我大宋立国百载，岂能因一哨之失便向夏虏屈膝求和？！臣愿统领殿前司精锐西出潼关，会同西北老帅种世衡，于横山之上血洗好水川之耻！”'),
      S(WANG, '“陛下！臣保举殿前都指挥使为帅，必能扬我国威！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_03', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_03: {
    id: 'scene_fn2_03',
    title: '第三幕 · 御赐尚方剑',
    subtitle: '开封府 · 垂拱紫宸正殿',
    illustrationUrl: '/assets/quests/jinjun_fn2_shangfang_sword.jpg',
    illustrationCaption: '紫宸殿早朝 · 宋仁宗亲赐尚方宝剑，拜泾原路行营都总管',
    beats: [
      N('仁宗龙颜动容，走下丹墀亲手捧起一柄金龙盘绕的尚方宝剑交到你的手中。'),
      S(RENZONG, '“好！朕便拜卿为【泾原路行营都总管】，统两万殿前司百战禁军、三千神臂强弩手西征！如违军令者，先斩后奏！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_04', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_04: {
    id: 'scene_fn2_04',
    title: '第四幕 · 军器监尽出',
    subtitle: '开封府 · 八十万禁军大教场',
    beats: [
      P('“传令军器监：将所有督造完成的破甲神臂弓与三棱重箭全部装车！偏厢鹿角战车一千辆随军西行！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_05', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_05: {
    id: 'scene_fn2_05',
    title: '第五幕 · 西出潼关道',
    subtitle: '关中 · 潼关古道',
    illustrationUrl: '/assets/quests/jinjun_fn2_tongguan_march.jpg',
    illustrationCaption: '两万殿前司百战禁军浩荡西出潼关，旌旗蔽空',
    beats: [
      N('秋风猎猎，两万名身披步人铁甲的殿前司百战禁军护卫着千辆偏厢战车浩荡西出潼关，直扑陕北泾原防线！'),
      P('“（昔日太行山，我因轻敌拒带战车而折损两千弟兄；今日西征横山，每一步皆要稳如泰山！）”'),
    ],
    onFinishEffects: [openScene('scene_fn2_06', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_06: {
    id: 'scene_fn2_06',
    title: '第六幕 · 初抵鄜延境',
    subtitle: '陕北 · 鄜延官道',
    beats: [
      N('越往西北行进，黄沙愈狂。沿途堡寨皆见宋军守卒枕戈待旦，青涧城巍然耸立于险峻山脊之上，正是老帅种世衡毕生心血所筑。'),
      S(GUARD, '“禀都总管！前方便是鄜延边军大营，种老帅已带伤在辕门外迎候多时！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_07', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_07: {
    id: 'scene_fn2_07',
    title: '第七幕 · 老骥伏枥志',
    subtitle: '延安府 · 鄜延边军大营外',
    beats: [
      N('辕门外，一位须发皆白、面容清癯却双目如鹰的老将军正披挂着沉重铁铠迎风而立，左臂缠着渗血的白布，正是威震夏虏数十载的铁血老帅种世衡！'),
      S(ZHONG_SHIHENG, '“老夫种世衡，参见都总管！京师精锐终于到了，西北将士盼天兵如盼甘霖啊！”'),
      P('“种老将军乃国之长城，晚辈岂敢受此大礼！快请入帅帐歇息！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_08', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_08: {
    id: 'scene_fn2_08',
    title: '第八幕 · 横山军情急',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      S(ZHONG_SHIHENG, '“老夫伤势无碍！倒是没藏讹庞那厮狡诈异常，此番不仅亲领十万夏军，更将西夏皇室暗藏的‘皇太妃’李秋水与一品堂供奉悉数请出掠阵！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_09', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_09: {
    id: 'scene_fn2_09',
    title: '第九幕 · 沙盘定良策',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      P('“既是李秋水亲自掠阵，便不可与之孤军野战。请老帅入中军帅帐沙盘台，晚辈有一套车弩合击之法，愿与老帅细细推演！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_10', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_10: {
    id: 'scene_fn2_10',
    title: '第十幕 · 帅帐灯火明',
    subtitle: '延安府 · 鄜延边军大营',
    onFinishEffects: [setStep(JINJUN_FINAL_2_ID, 'fn2_yanan_sandtable')],
    beats: [
      S(ZHONG_SHIHENG, '“好！老夫正想见识见识都总管的新法破敌之策！”'),
    ],
  },
  scene_fn2_11: {
    id: 'scene_fn2_11',
    title: '第十一幕 · 彻夜推沙盘',
    subtitle: '延安府 · 中军帅帐 · 沙盘台',
    illustrationUrl: '/assets/quests/jinjun_fn2_zhong_sandtable.jpg',
    illustrationCaption: '鄜延帅帐夜灯 · 主角与铁血老帅种世衡沙盘推演破铁鹞之策',
    beats: [
      N('油灯噼啪作响，你与种世衡俯身沙盘之上彻夜推演横山地形。你指着横山南麓一条宽阔戈壁道，提出了“车城锁敌、神臂破甲、两翼包抄”的三段奇谋。'),
      P('“西夏铁鹞子人马俱披冷锻重甲、以铁索钩连，正面冲锋如山岳崩塌；但重骑最忌滞涩！我军先以千辆偏厢鹿角战车结成钢铁车城硬锁其势，再令三千神臂弓三段轮射，三百步外即可洞穿重甲！”'),
      S(ZHONG_SHIHENG, '“妙极！！钩连铁索一旦有人马中箭倒地，反成彼此拖拽的催命符！只是车城初合之时最凶险，若无老将亲镇中枢，恐难顶住铁鹞子第一波撞击……”'),
    ],
    onFinishEffects: [openScene('scene_fn2_12', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_12: {
    id: 'scene_fn2_12',
    title: '第十二幕 · 老帅请镇中',
    subtitle: '延安府 · 中军帅帐 · 沙盘台',
    beats: [
      S(ZHONG_SHIHENG, '“这最前排车阵中枢，便交由老夫亲率青涧城子弟兵镇守！都总管只需亲统五千重骑伏于两翼沙丘，待神臂弓打乱夏阵，即刻杀出直捣没藏讹庞王帐！”'),
      P('“老帅旧伤未愈，前排车阵凶险万分，还是由晚辈……”'),
    ],
    onFinishEffects: [openScene('scene_fn2_13', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_13: {
    id: 'scene_fn2_13',
    title: '第十三幕 · 一诺重千钧',
    subtitle: '延安府 · 中军帅帐 · 沙盘台',
    beats: [
      S(ZHONG_SHIHENG, '“不必多言！全军论冲锋破敌、单挑绝顶高手，谁能胜过都总管？论死守一步不退，西北除了老夫还有谁人！一言为定！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_14', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_14: {
    id: 'scene_fn2_14',
    title: '第十四幕 · 兵发横山道',
    subtitle: '西北 · 横山戈壁行军',
    beats: [
      N('三日后大军开拔，冒着漫天黄沙挺进横山前沿阵地。战车轮轴滚滚碾过戈壁砾石，三千名神臂弓手在车阵之后悄然张弦上箭。'),
      S(GUARD, '“禀都总管！前方十里发现西夏先锋游骑，没藏讹庞主力已全面压上！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_15', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_15: {
    id: 'scene_fn2_15',
    title: '第十五幕 · 戈壁起杀气',
    subtitle: '秦州府 · 横山前沿高地',
    beats: [
      P('“传令前军：偏厢鹿角战车全数合拢！神臂弓营各就其位！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_16', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_16: {
    id: 'scene_fn2_16',
    title: '第十六幕 · 战前辞老帅',
    subtitle: '秦州府 · 横山车阵中枢',
    beats: [
      P('“老帅保重！待中军鼓响三通，晚辈必自侧翼杀出！”'),
      S(ZHONG_SHIHENG, '“哈哈哈！去吧！让夏虏看看我大宋军威！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_17', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_17: {
    id: 'scene_fn2_17',
    title: '第十七幕 · 两翼伏重骑',
    subtitle: '秦州府 · 横山侧翼沙丘',
    beats: [
      P('“五千重骑下马卸鞍歇息，听候中军战鼓号令！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_18', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_18: {
    id: 'scene_fn2_18',
    title: '第十八幕 · 地动山摇来',
    subtitle: '秦州府 · 横山戈壁',
    onFinishEffects: [setStep(JINJUN_FINAL_2_ID, 'fn2_hengshan_showdown')],
    beats: [
      S(GUARD, '“来了！！夏军三千铁鹞子开始冲锋了！”'),
    ],
  },
  scene_fn2_19: {
    id: 'scene_fn2_19',
    title: '第十九幕 · 铁鹞压城来',
    subtitle: '秦州府 · 横山戈壁战线',
    illustrationUrl: '/assets/quests/jinjun_fn2_tieyaozi_charge.jpg',
    illustrationCaption: '横山戈壁 · 西夏三千铁鹞子连环重骑如钢铁山岳正面碾压',
    beats: [
      N('黄沙遮天蔽日，三千名连人带马皆披冷锻重甲、以铁索钩连的西夏“铁鹞子”重骑排成一道无边无际的钢铁壁垒，如山岳崩塌般朝宋军正面轰然碾来！'),
      S(MEIZANG, '“踏平宋军前阵！活捉种世衡与殿前都指挥使！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_20', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_20: {
    id: 'scene_fn2_20',
    title: '第二十幕 · 钢铁车城锁',
    subtitle: '秦州府 · 横山车阵中枢',
    illustrationUrl: '/assets/quests/jinjun_fn2_chariot_wall.jpg',
    illustrationCaption: '偏厢鹿角车城 · 种世衡亲镇车阵中枢硬锁铁鹞子狂暴冲锋',
    beats: [
      N('轰隆巨响震耳欲聋！前军一千辆沉重无比的偏厢鹿角战车铁钩锁死，化作一道铜墙铁壁！老帅种世衡白发飞扬、手抡大刀屹立于最前排车头之上，斩断数匹撞上鹿角的战马前蹄，硬生生锁死了铁鹞子第一波狂暴冲锋！'),
      S(ZHONG_SHIHENG, '“死守不退——！为神臂弓营争取三息之机！！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_21', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_21: {
    id: 'scene_fn2_21',
    title: '第二十一幕 · 万箭穿重甲',
    subtitle: '秦州府 · 横山中军弩阵',
    illustrationUrl: '/assets/quests/jinjun_fn2_shenbi_volley.jpg',
    illustrationCaption: '神臂三段轮射 · 三千神臂弓万矢齐发洞穿铁鹞子重甲',
    beats: [
      N('中军战鼓震天擂响！车城之后三千名精锐神臂弓手瞬间起立，三段轮射如雷霆般炸响！特制三棱破甲重箭在三百步外呼啸破空，竟生生洞穿铁鹞子双层冷锻重甲！重骑成片栽倒，钩连铁索反成互相拖拽翻滚的催命符，夏军前锋瞬间崩溃！'),
      S(MEIZANG, '“怎么可能？！宋军怎会有这等三百步穿甲的怪物强弩？！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_22', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_22: {
    id: 'scene_fn2_22',
    title: '第二十二幕 · 白虹袭车阵',
    subtitle: '秦州府 · 横山车阵中枢',
    beats: [
      N('眼见铁鹞子惨败，侧翼沙丘陡然升起一道素白倩影，衣袂飘飘宛若仙子，出手却阴狠毒辣至极——西夏皇太妃李秋水亲自率一品堂绝顶供奉暴起直扑车阵中枢！'),
      S(LI_QIUSHUI, '“一群废物！待本宫先毙了这老匹夫，毁了神臂弓阵！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_23', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_23: {
    id: 'scene_fn2_23',
    title: '第二十三幕 · 老帅扶旗屹',
    subtitle: '秦州府 · 横山车阵中枢',
    illustrationUrl: '/assets/quests/jinjun_fn2_zhong_martyr.jpg',
    illustrationCaption: '忠烈千秋 · 种世衡护翼变阵遭冷箭与白虹掌力震碎心脉，扶旗屹立不倒',
    beats: [
      N('危急关头，种世衡为掩护侧翼弓弩营及时变阵，左肩连中两支重骑冷箭，紧接着又遭李秋水隔空一记曲折诡异的“白虹掌力”狠狠击中胸口！老帅呕血不止、心脉尽碎，却仍用双手死死抱住大宋帅旗杆屹立车头不倒！'),
      S(ZHONG_SHIHENG, '“旗……不能倒……阵……不可乱……”'),
      P('“种老帅——！！老妖妇，我杀了你！！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_24', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_24: {
    id: 'scene_fn2_24',
    title: '第二十四幕 · 金枪战太妃',
    subtitle: '秦州府 · 横山沙丘战阵',
    illustrationUrl: '/assets/quests/jinjun_fn2_liqiushui_clash.jpg',
    illustrationCaption: '横山绝战 · 天波透甲金枪与李秋水白虹掌力轰然对撞',
    beats: [
      N('你目眦欲裂，飞身纵马越过战车直扑李秋水！面对这位浸淫逍遥派神功数十载的大宗师，你毫无畏惧，将《太玄经》浩瀚真气灌注于天波透甲金枪之上！'),
      S(LI_QIUSHUI, '“好俊的年轻小将！可惜境界尚浅，接本宫的白虹掌力吧！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_FINAL_2_ID,
        opponent: {
          kind: 'npc',
          npcId: 'NPC-0103',
          talkOverride: '“白虹掌力曲折无形，看你如何抵挡五合！”',
        },
        rule: 'survive_rounds',
        maxRounds: 5,
        forbidEscapeReason: '老帅种世衡重伤危殆，须死战硬撼李秋水五合将其逼退！',
        introText:
          '【绝顶交锋】西夏皇太妃李秋水（大宗师下品）施展白虹掌力攻来！请运用《太玄经》真气硬撑 5 回合寻隙反击！',
        onWin: [
          { type: 'giveCombatExp', amount: 180, reason: '横山正面硬撼大宗师李秋水五合并刺伤迫退' },
          openScene('scene_fn2_25', JINJUN_FINAL_2_ID),
        ],
      },
    ],
  },
  scene_fn2_25: {
    id: 'scene_fn2_25',
    title: '第二十五幕 · 太玄破白虹',
    subtitle: '秦州府 · 横山沙丘战阵',
    illustrationUrl: '/assets/quests/jinjun_fn2_taixuan_break.jpg',
    illustrationCaption: '太玄破气 · 霸道真气震碎护体气墙，一枪刺伤李秋水肩头',
    beats: [
      N('激斗至第五合，李秋水掌风虽诡谲莫测，却难挡你《太玄经》浑厚绵密的纯阳真气！你硬吃一记余劲震碎她护体气墙，天波透甲金枪顺势一挑，锋利枪尖“嗤”地刺穿李秋水左肩血肉！'),
      S(LI_QIUSHUI, '“啊！好霸道的《太玄经》真气……撤！护驾撤退！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_26', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_26: {
    id: 'scene_fn2_26',
    title: '第二十六幕 · 两翼捣王帐',
    subtitle: '秦州府 · 夏军中军王帐',
    illustrationUrl: '/assets/quests/jinjun_fn2_cavalry_flank.jpg',
    illustrationCaption: '重骑扫荡 · 五千禁军重骑直捣夏军王帐生劈亲卫大将',
    beats: [
      N('李秋水负伤远遁，你翻身跃上战马，亲率五千精锐重骑自两翼狂风般席卷而出，直捣没藏讹庞中军王帐！夏军亲卫大将挥刀死命拦截，被你一枪连人带甲生劈马下！'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_FINAL_2_ID,
        opponent: { kind: 'custom', npc: buildXixiaGuardGeneralNpc() },
        rule: 'duel',
        introText: '【直捣王帐】生劈没藏讹庞铁鹞亲卫统领（宗师下品），彻底击溃十万夏军！',
        onWin: [
          { type: 'giveCombatExp', amount: 150, reason: '横山直捣夏军王帐斩杀亲卫大将' },
          openScene('scene_fn2_27', JINJUN_FINAL_2_ID),
        ],
      },
    ],
  },
  scene_fn2_27: {
    id: 'scene_fn2_27',
    title: '第二十七幕 · 十万夏军溃',
    subtitle: '秦州府 · 横山战场',
    beats: [
      N('亲卫统领伏诛，西夏十万大军彻底崩盘，没藏讹庞丢盔弃甲抱头鼠窜，一路溃逃回灵州。宋军全线追杀三十里，横山大捷！'),
      S(GUARD, '“都总管！夏军全面溃败，我军大胜了！！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_28', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_28: {
    id: 'scene_fn2_28',
    title: '第二十八幕 · 急奔返前阵',
    subtitle: '秦州府 · 横山车阵中枢',
    beats: [
      N('你顾不得擦去脸上血污，狂奔赶回前阵车垒。直到见你安然凯旋，始终死死扶住战旗的种世衡方才缓缓松开手，顺着旗杆滑坐于染血黄沙之上。'),
      P('“种老帅！！军医！快传军医！！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_29', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_29: {
    id: 'scene_fn2_29',
    title: '第二十九幕 · 残阳托御弩',
    subtitle: '秦州府 · 横山车阵中枢',
    illustrationUrl: '/assets/quests/jinjun_fn2_zhong_bequest.jpg',
    illustrationCaption: '老帅遗托 · 种世衡临终将皇祐神臂御赐弩交予主角',
    beats: [
      N('残阳如血，漫天黄沙映照着老帅苍白却无比欣慰的脸庞。种世衡望着漫山遍野伏尸的西夏铁鹞子，用尽最后力气解下身畔一具龙纹斑驳的镇边神兵，颤巍巍交到你的手中。'),
      S(ZHONG_SHIHENG, '“不必……费力了……老夫守了一辈子西北……今日见铁鹞子伏尸横山，死而无憾！这把官家早年亲赐的【皇祐神臂御赐弩】与西北的城墙……往后便交予都帅了……”'),
    ],
    onFinishEffects: [openScene('scene_fn2_30', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_30: {
    id: 'scene_fn2_30',
    title: '第三十幕 · 忠魂归天地',
    subtitle: '秦州府 · 横山车阵中枢',
    beats: [
      N('话音落下，老帅双手缓缓垂落，双目却依然圆睁望向西北灵州方向。一代名将种世衡溘然长逝，三军两万甲士齐刷刷跪倒于黄沙之上，恸哭之声震彻云霄！'),
      P('“老帅一路走好……晚辈誓必收复横山，叫夏虏百年不敢再窥关中！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_31', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_31: {
    id: 'scene_fn2_31',
    title: '第三十一幕 · 收敛忠烈骨',
    subtitle: '秦州府 · 横山军营',
    beats: [
      P('“厚殓种老帅忠骨，奏请朝廷追封谥号！余下各军整队，一举收复横山天险！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_32', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_32: {
    id: 'scene_fn2_32',
    title: '第三十二幕 · 横山插宋旗',
    subtitle: '西北 · 横山天险',
    illustrationUrl: '/assets/quests/jinjun_fn2_hengshan_victory.jpg',
    illustrationCaption: '收复横山天险 · 宋军大旗插遍横山绝壁，打断西夏南侵脊梁',
    beats: [
      N('大军乘胜连拔西夏十七座边寨，一举收复横山天险，大宋龙旗重新插遍横山绝壁！自此西夏失去南侵跳板，脊梁彻底被打断。'),
      S(GUARD, '“禀都总管！横山诸隘已全部筑垒固守，夏军十年内绝无力再犯泾原！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_33', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_33: {
    id: 'scene_fn2_33',
    title: '第三十三幕 · 祭奠西北魂',
    subtitle: '西北 · 青涧城外',
    beats: [
      P('“以三牲烈酒祭奠种老帅与横山阵亡将士！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_34', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_34: {
    id: 'scene_fn2_34',
    title: '第三十四幕 · 御赐神臂弩',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      N('回到鄜延大营，你轻轻抚拭着种世衡遗赠的《皇祐神臂御赐弩》，只见弩身玄铁乌亮，机括精巧无比，竟是军器监神臂弓的始祖原型，威力更胜寻常神弩数倍。'),
      P('“（有了此弩与天波透甲金枪相配，纵是绝顶宗师当前，我亦有一战之力！）”'),
    ],
    onFinishEffects: [openScene('scene_fn2_35', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_35: {
    id: 'scene_fn2_35',
    title: '第三十五幕 · 西北局势稳',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      S(GUARD, '“报——！青涧城、延州防务皆已由种家子弟接管稳固。”'),
    ],
    onFinishEffects: [openScene('scene_fn2_36', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_36: {
    id: 'scene_fn2_36',
    title: '第三十六幕 · 露布飞京师',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      P('“速将横山大捷露布飞报东京！只是……不知雁门关与河北此刻究竟如何了？”'),
    ],
    onFinishEffects: [openScene('scene_fn2_37', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_37: {
    id: 'scene_fn2_37',
    title: '第三十七幕 · 寒风吹雁门',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      N('入冬之际，北风日紧，陕北已是漫天飞雪。帅帐之中炭火熊熊，你却隐隐感到一股比横山铁鹞子更深沉的寒意正自东北方逼近。'),
      P('“（算算时日，江南杏子林俘虏供出的慕容博之谋，只怕也要在北疆发作了……）”'),
    ],
    onFinishEffects: [openScene('scene_fn2_38', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_38: {
    id: 'scene_fn2_38',
    title: '第三十八幕 · 整训万余骑',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      P('“传令殿前司一万浴血余生之精锐：人马不得卸甲，备足干粮箭矢，随时准备东驰！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_39', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_39: {
    id: 'scene_fn2_39',
    title: '第三十九幕 · 丐帮鸽传警',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      N('是夜，一只双爪绑着红布条的信鸽顶着暴雪撞入帅帐窗棂，正是乔峰自河北丐帮分舵发来的绝密警讯！'),
      P('“大辽铁林军已在云州集结……慕容博与萧远风果然要趁我军主力西调之际大举南下雁门！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_40', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_40: {
    id: 'scene_fn2_40',
    title: '第四十幕 · 老帅英灵佑',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      P('“（种老帅在天之灵看着吧，西北既定，下一战，便是雁门关下彻底终结慕容氏两代迷梦之时！）”'),
    ],
    onFinishEffects: [openScene('scene_fn2_41', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_41: {
    id: 'scene_fn2_41',
    title: '第四十一幕 · 拨兵守青涧',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      S(GUARD, '“泾原与鄜延两路各留足万余边军驻防，一万殿前司精锐随时可拔营东进！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_42', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_42: {
    id: 'scene_fn2_42',
    title: '第四十二幕 · 军心如铁石',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      P('“历经横山血战，这支殿前司铁军已成真正的百战雄师！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_43', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_43: {
    id: 'scene_fn2_43',
    title: '第四十三幕 · 黑羽檄文将至',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      S(GUARD, '“报——！北方八百里黑羽加急军报正星夜兼程送来！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_44', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_44: {
    id: 'scene_fn2_44',
    title: '第四十四幕 · 剑指雁门关',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      P('“来得正好！备马——！”'),
    ],
    onFinishEffects: [openScene('scene_fn2_45', JINJUN_FINAL_2_ID)],
  },
  scene_fn2_45: {
    id: 'scene_fn2_45',
    title: '第四十五幕 · 横山大捷终',
    subtitle: '延安府 · 鄜延边军大营',
    beats: [
      N('横山一战，西夏精锐铁鹞子折戟沉沙，种世衡以死报国换得西北十年安宁；而大宋军神真正的终局决战，已在冰雪皑皑的雁门关外拉开帷幕。'),
      P('“且待河北黑羽檄文一到，全军千里东驰雁门！”'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0033'] },
      { type: 'giveItem', itemId: 'BOW-001', qty: 1 },
      { type: 'giveSilver', amount: 600 },
      { type: 'addArtExp', amount: 4000 },
      { type: 'addSectContribution', amount: 260 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 25 },
      { type: 'modifyRenown', delta: 50 },
      { type: 'modifyChivalry', delta: 25 },
      { type: 'completeQuest', questId: JINJUN_FINAL_2_ID },
    ],
  },
}
