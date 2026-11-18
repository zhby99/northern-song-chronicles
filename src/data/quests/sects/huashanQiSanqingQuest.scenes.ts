import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_Q10_QUEST_ID } from './huashanQiSanqingQuest'

const SPEAKER_BORDER_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '潼关老戍卒',
  title: '镇河城楼守关军校',
  factionName: '潼关守军',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
}

const SPEAKER_BLOOD_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '血刀恶僧',
  title: '塞外流窜凶僧 · 赤铜血刃',
  factionName: '西域血刀恶徒',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

function buildQinLieshan70PctNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ10_QIN_70PCT',
    name: '秦烈山（七成功力）',
    title: '潼关剑神 · 白玉坛十剑考校',
    realm: '一流中品',
    factionId: 'SECT-05',
    factionName: '华山派',
    sectRank: 4,
    sectRankLabel: '镇岳宿老',
    avatarUrl: '/assets/characters/avatars/NPC-0147.jpg',
    portraitUrl: '/assets/characters/fullbody/NPC-0147.jpg',
    talk: '“老夫压住三成剑力，看你那一身《混元功》接不接得下这十剑！”',
    stats: { hp: 2624, mp: 2286, agi: 56, res: 48 },
    talents: { bone: 76, comprehension: 78, charm: 60 },
    equippedArts: { neigong: 'MA-058', qinggong: 'MA-138', move1: 'MA-049', move2: 'MA-147' },
    learnedArts: [
      { artId: 'MA-058', level: 6 },
      { artId: 'MA-138', level: 5 },
      { artId: 'MA-049', level: 6 },
      { artId: 'MA-147', level: 6 },
    ],
    equipped: { weapon: 'WPN-017' },
    questBadgeLabel: '十剑考校',
  })
}

function buildBloodBladeMonkNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ10_BLOOD_MONK',
    name: '血刀恶僧',
    title: '塞外凶徒 · 屠驿狂僧',
    realm: '一流中品',
    factionName: '西域血刀恶徒',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“白皮细肉的华山小道士也敢追出潼关？正好用你的心头热血祭佛爷这口宝刀！”',
    stats: { hp: 2880, mp: 2420, agi: 63, res: 51 },
    talents: { bone: 78, comprehension: 64, charm: 18 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-139', move1: 'MA-072', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-103', level: 6 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-072', level: 6 },
      { artId: 'MA-131', level: 6 },
    ],
    equipped: { weapon: 'WPN-018' },
    questBadgeLabel: '边塞凶徒',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq10_01: {
    id: 'scene_hsq10_01',
    title: '第一幕 · 紫霞召对',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，西岳群峰覆上一层皑皑白雪。紫霞正气主殿内铜炉炭火微温，掌门「紫霞神剑」岳沧溟考校过你的《混元功》进境后，缓步走下丹墀。'),
      S('NPC-0118', '“你的《混元功》已凝练成形，护体绵密不输各派宿老。但本座今日要问你一句实话——倘若明日遇上手执神兵、招招以命搏命的塞外一流狂徒，单靠《养吾剑法》与《希夷剑法》，你能有几分胜算？”'),
      P('（沉吟片刻，据实以告）“回禀掌门：《养吾》重守、《希夷》重变，皆可立于不败；可若论一锤定音、劈开千军重甲的雷霆杀力，弟子剑中确少了一股摧锋折岳的霸气！”'),
    ],
    choices: [
      {
        id: 'hsq10_01_next',
        label: '恭立阶前，听掌门岳沧溟道出破局良方',
        tone: 'gold',
        effects: [openScene('scene_hsq10_02', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_02: {
    id: 'scene_hsq10_02',
    title: '第二幕 · 掌门手书',
    subtitle: '紫霞正气主殿 · 修书借剑',
    mandatory: true,
    beats: [
      S('NPC-0118', '（抚掌微叹）“知短方能精进！我华山地阶上品镇岳绝学《太岳三青峰》，本是专为大成内劲量身铸就的雷霆重剑——一式三剑，一剑强似一剑。只是那卷真本剑谱，三十年前便由秦烈山师叔携往南峰落雁绝顶封存。”'),
      N('岳沧溟取过紫毫笔亲手写下一封书信，盖上掌门紫霞印信递入你手中。'),
      S('NPC-0118', '“秦师叔脾气刚烈如火，素来嫌我紫霞一脉弟子重气轻剑、缺少血性。你持本座亲笔信登【落雁峰白玉论剑坛】向他求剑——能不能让他心甘情愿打开那只白玉石匣，便看你自己的铁骨了！”'),
    ],
    choices: [
      {
        id: 'hsq10_02_start',
        label: '双手接过掌门手书，顶风冒雪攀登南峰落雁绝顶',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q10_QUEST_ID, stepId: 'summit_present_letter' },
          toast('已获岳沧溟亲笔信！请前往【华山绝顶论剑台 > 落雁峰白玉论剑坛】拜见秦烈山！', 'talk', '落雁借剑'),
        ],
      },
    ],
  },

  scene_hsq10_03: {
    id: 'scene_hsq10_03',
    title: '第三幕 · 朔雪登峰',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('南峰落雁乃太华最高极顶，朔风卷着冰碴如刀割面。白玉论剑坛四周积雪盈尺，唯独坛心三丈方圆被森然剑气激荡得片雪不留。'),
      N('「潼关剑神」秦烈山披一件苍狼旧裘独立坛心，正用一块鹿皮缓缓擦拭手中阔剑。你踏雪上前，恭敬呈上岳沧溟的亲笔书信。'),
    ],
    choices: [
      {
        id: 'hsq10_03_next',
        label: '屏息肃立雪风中，静候秦师伯阅信示下',
        tone: 'primary',
        effects: [openScene('scene_hsq10_04', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_04: {
    id: 'scene_hsq10_04',
    title: '第四幕 · 冷眼拆信',
    subtitle: '落雁峰白玉论剑坛 · 剑神冷斥',
    mandatory: true,
    beats: [
      N('秦烈山指尖一震震开火漆，扫了两眼信纸便冷笑一声，随手将信笺揣入怀中。'),
      S('NPC-0147', '“岳沧溟倒是打得好算盘！平日里关在紫霞观教徒弟打坐吐纳，等到发觉手里缺了斩将夺旗的杀招，倒想起老夫替华山看守的《太岳三青峰》了！”'),
      P('“回秦师伯，剑气本是一家。弟子虽修气宗《混元功》，却深知三尺青锋若不敢见血争锋，再浑厚的内力也不过是温室花木，恳请师伯赐教！”'),
    ],
    choices: [
      {
        id: 'hsq10_04_next',
        label: '迎着秦烈山逼人目光，挺直脊梁半步不避',
        tone: 'gold',
        effects: [openScene('scene_hsq10_05', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_05: {
    id: 'scene_hsq10_05',
    title: '第五幕 · 双重铁考',
    subtitle: '落雁峰白玉论剑坛 · 立下双关',
    mandatory: true,
    beats: [
      S('NPC-0147', '（冷目微眯，手中重剑“铮”地插入白玉砖缝半寸）“嘴皮子硬没用！想从老夫手里拿走《太岳三青峰》，先过我两道铁关！”'),
      S('NPC-0147', '“第一关：老夫将功力压在七成，就在这白玉坛上劈你十剑！十合之内，你若倒下或是脚底退出白玉坛心半步，趁早滚回玉女峰烧香！第二关，等你能站着接完这十剑，老夫再告诉你！”'),
    ],
    choices: [
      {
        id: 'hsq10_05_accept',
        label: '慨然应下双重铁考，踏入白玉论剑坛中心！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q10_QUEST_ID, 'altar_ten_rounds'),
          openScene('scene_hsq10_06', HUASHAN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq10_06: {
    id: 'scene_hsq10_06',
    title: '第六幕 · 坛顶凝气',
    subtitle: '落雁峰白玉论剑坛 · 混元生根',
    mandatory: true,
    beats: [
      N('你缓步踏入白玉坛心，双足不丁不八扣紧青白石板，《混元功》真气自双掌与涌泉穴同时流转，整个人恍如一株扎根绝壁千年的华山苍松。'),
      S('NPC-0147', '“好稳的混元椿步！且看你受不受得起老夫这十记重剑——看剑！”'),
    ],
    choices: [
      {
        id: 'hsq10_06_next',
        label: '拔剑横胸，正面迎向秦烈山排山倒海的剑压！',
        tone: 'danger',
        effects: [openScene('scene_hsq10_07', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_07: {
    id: 'scene_hsq10_07',
    title: '第七幕 · 十剑不退',
    subtitle: '落雁峰白玉论剑坛 · 十合硬撼',
    illustrationUrl: '/assets/quests/hs_q10_ten_strikes.jpg',
    illustrationCaption: '十剑不退 · 落雁峰白玉坛顶混元真气硬接秦烈山十剑考校',
    mandatory: true,
    beats: [
      N('轰！即便压制在七成功力，秦烈山的阔剑劈落时仍似泰山崩摧！狂暴剑气激起漫天雪柱，每一剑都逼着你硬碰硬正面相格，稍有怯退便会被震出坛心白线之外！'),
    ],
    choices: [
      {
        id: 'hsq10_07_fight',
        label: '催动混元真气死守坛心，硬接秦烈山七成功力十合不退！',
        subLabel: '铁骨考校 · 撑满 10 回合不败（秦烈山七成功力 · 一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQinLieshan70PctNpc() },
            rule: 'survive_rounds',
            maxRounds: 10,
            forbidEscapeReason: '已立誓半步不退，退下白玉坛便算考校落败！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_hsq10_08', HUASHAN_Q10_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('未撑满十合便被剑劲震退半步！请调息稳固混元气劲后再登白玉坛应考！', 'warn', '十剑考校'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq10_08: {
    id: 'scene_hsq10_08',
    title: '第八幕 · 裂石留印',
    subtitle: '落雁峰白玉论剑坛 · 铁骨初显',
    mandatory: true,
    beats: [
      N('铮——！！第十剑携着万钧雷霆当头压落！你双目圆睁，由外而内的《混元功》真气自双掌倾泻入剑，硬生生架住阔剑锋刃！'),
      N('虎口鲜血顺着剑柄滴落白玉石面，脚下坚硬的白玉砖竟被你双足生生踏裂出两道寸许深的靴印，而你的身躯依旧钉在原地，未曾后退哪怕半寸！'),
      P('（擦去唇角血丝，抱剑长揖）“十剑已满，谢秦师伯手下留情！”'),
    ],
    choices: [
      {
        id: 'hsq10_08_next',
        label: '调匀翻涌气血，请秦师伯宣示第二道铁考',
        tone: 'gold',
        effects: [openScene('scene_hsq10_09', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_09: {
    id: 'scene_hsq10_09',
    title: '第九幕 · 首关得许',
    subtitle: '落雁峰白玉论剑坛 · 潼关通缉令',
    mandatory: true,
    beats: [
      N('秦烈山收剑回鞘，低头看了一眼白玉砖上那对深深的靴印，冷硬的眉宇间掠过一抹难掩的震动，随手从怀中摸出一块染血的潼关边军铁牌抛给你。'),
      S('NPC-0147', '“筋骨倒真有几分硬气！听着——这第二关不在山上，在潼关外！三日前，一名练成西域邪派刀术的一流中品凶徒‘血刀恶僧’自河湟流窜入陕，连屠关外两座戍堡与一处商驿。”'),
      S('NPC-0147', '“《太岳三青峰》乃替天行道之重剑，不传未斩过真凶的温室剑客。单骑出【潼关天险瓮城】，提那血刀恶僧的人头回来见我！”'),
    ],
    choices: [
      {
        id: 'hsq10_09_depart',
        label: '接过边军铁牌，下山单骑奔赴潼关天险瓮城！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q10_QUEST_ID, 'tongguan_blood_monk'),
          toast('十剑考校通过！请前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】出关追斩血刀恶僧！', 'talk', '出关斩恶'),
        ],
      },
    ],
  },

  scene_hsq10_10: {
    id: 'scene_hsq10_10',
    title: '第十幕 · 潼关风雪',
    subtitle: '潼关天险瓮城 · 潼关镇河主城楼与瓮城',
    mandatory: true,
    beats: [
      N('北风怒号，鹅毛大雪将雄踞黄河岸畔的潼关镇河主城楼染成一片肃杀苍白。城门半掩，鹿角拒马层层布防，一队伤痕累累的边军斥候刚被抬进瓮城。'),
      N('你亮出秦烈山所授的潼关铁牌，守城老军校连忙迎上前来行礼。'),
    ],
    choices: [
      {
        id: 'hsq10_10_next',
        label: '向守关老军校询问血刀恶僧逃窜方位',
        tone: 'primary',
        effects: [openScene('scene_hsq10_11', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_11: {
    id: 'scene_hsq10_11',
    title: '第十一幕 · 戍卒血迹',
    subtitle: '潼关瓮城内 · 凶徒行踪',
    mandatory: true,
    beats: [
      S(SPEAKER_BORDER_GUARD, '“原来是华山剑神派来的高足！那血刀恶僧凶残至极，手使一口软硬兼施的西域赤铜弯刀，专挑风雪漫天、弓弩难瞄之时出没！”'),
      S(SPEAKER_BORDER_GUARD, '“半个时辰前斥候探得他刚洗劫了关外二十里的黄土断崖废驿，此刻正躲在驿亭里烤火饮酒。{gender:少侠|女侠}千万小心，那厮刀法古怪，能从极刁钻的死角贴地反撩！”'),
      P('“多谢军爷指路！烦请替我开一道瓮城侧门，今日定取此獠首级祭奠死难军民！”'),
    ],
    choices: [
      {
        id: 'hsq10_11_next',
        label: '翻身上马冲出潼关瓮城，迎着暴风雪疾追二十里！',
        tone: 'danger',
        effects: [openScene('scene_hsq10_12', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_12: {
    id: 'scene_hsq10_12',
    title: '第十二幕 · 踏雪追凶',
    subtitle: '潼关外二十里 · 黄土断崖枯驿',
    mandatory: true,
    beats: [
      N('马蹄踏碎尺厚积雪，寒风如狼嚎般灌入长谷。疾驰二十里至黄土断崖之下，一座破败荒驿孤零零立在雪野中央，黑烟裹着酒肉腥气自塌了一半的瓦顶冒出。'),
      N('你系马于枯柳之后，按剑推开吱呀作响的破木门。'),
    ],
    choices: [
      {
        id: 'hsq10_12_next',
        label: '拔剑踏入荒驿，封死血刀恶僧西逃之路',
        tone: 'danger',
        effects: [openScene('scene_hsq10_13', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_13: {
    id: 'scene_hsq10_13',
    title: '第十三幕 · 凶僧狂言',
    subtitle: '断崖荒驿 · 赤铜血刃',
    mandatory: true,
    beats: [
      N('火堆旁坐着一名披着暗红破僧衣的魁梧恶僧，脖挂一串枯骨念珠，膝上横着一口薄如柳叶、泛着妖异暗红血光的西域赤铜软弯刀。'),
      S(SPEAKER_BLOOD_MONK, '（伸舌舔过赤铜刀背，怪笑起身）“哟，穿这么一身崭新的华山紫霞剑客衫，莫不是玉女峰派来给佛爷送过冬盘缠的？前几日那几个潼关军汉脖子太硬，砍得佛爷手腕都酸了！”'),
    ],
    choices: [
      {
        id: 'hsq10_13_next',
        label: '目睹驿隅遇害百姓遗骸，胸中混元正气轰然暴涨',
        tone: 'danger',
        effects: [openScene('scene_hsq10_14', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_14: {
    id: 'scene_hsq10_14',
    title: '第十四幕 · 怒拔青锋',
    subtitle: '断崖荒驿 · 替天行道',
    mandatory: true,
    beats: [
      P('（剑尖遥指恶僧眉心，字字冰寒）“披着佛门袈裟却干尽猪狗不如的恶事！华山弟子今日奉潼关剑神之命，特来借你项上人头一用！”'),
      N('血刀恶僧暴喝一声撞碎驿站土墙，借漫天风雪遮蔽身形，手中赤铜血刀化作一道诡谲无比的赤色弧光自雪地反撩你足踝与咽喉！'),
    ],
    choices: [
      {
        id: 'hsq10_14_next',
        label: '纵身追入茫茫雪野，与血刀恶僧展开生死决战！',
        tone: 'danger',
        effects: [openScene('scene_hsq10_15', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_15: {
    id: 'scene_hsq10_15',
    title: '第十五幕 · 出关斩恶',
    subtitle: '潼关雪野 · 剑破血刀',
    illustrationUrl: '/assets/quests/hs_q10_blood_monk_duel.jpg',
    illustrationCaption: '出关斩恶 · 风雪潼关单骑截杀塞外凶徒血刀恶僧',
    mandatory: true,
    beats: [
      N('狂风卷雪，血刀恶僧刀路怪诞邪异，每从不可思议的腋下、胯侧反削而出！你在白玉坛受过秦烈山十记泰山压顶般的重剑锤炼，此刻临危不乱，以堂堂正正的混元剑劲层层碾碎其诡道刀幕！'),
    ],
    choices: [
      {
        id: 'hsq10_15_fight',
        label: '以正破邪，风雪断崖斩杀一流中品凶徒血刀恶僧！',
        subLabel: '生死决战 · 血刀恶僧（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q10_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBloodBladeMonkNpc() },
            rule: 'duel',
            forbidEscapeReason: '此獠不除，关外多少商旅边民还将惨遭毒手，岂容退避！',
            deathTitle: '血洒潼关雪原',
            deathDetail: '你在潼关外断崖荒驿追剿血刀恶僧时失手被其诡异血刀所伤，壮烈殉难。',
            onWin: [openScene('scene_hsq10_16', HUASHAN_Q10_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq10_16: {
    id: 'scene_hsq10_16',
    title: '第十六幕 · 枭首雪野',
    subtitle: '断崖荒驿外 · 大仇得雪',
    mandatory: true,
    beats: [
      N('锵——噗！血刀恶僧久攻不下心浮气躁，企图贴地滚进施展毒辣反撩，却被你预判先机一掌混元劲震碎腕骨，右手长剑紧随其后自上而下贯入其胸膛！'),
      N('漫天白雪掩去污血，你将这为祸边陲的凶僧首级盛入石灰木匣封好，并妥善掩埋了驿中罹难商民。'),
    ],
    choices: [
      {
        id: 'hsq10_16_next',
        label: '携木匣翻身上马，顶风雪驰返潼关城楼',
        tone: 'primary',
        effects: [openScene('scene_hsq10_17', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_17: {
    id: 'scene_hsq10_17',
    title: '第十七幕 · 守军敬酒',
    subtitle: '潼关镇河主城楼 · 边关壮声',
    mandatory: true,
    beats: [
      N('马回潼关瓮城，守关将士验明血刀恶僧首级与那柄凶名赫赫的赤铜血刀，全城欢声雷动！老军校热泪盈眶，端来一碗滚烫的关中烧刀子向你敬行，并奉上边军悬赏花红。'),
      S(SPEAKER_BORDER_GUARD, '“不愧是西岳华山走出来的真豪杰！秦老剑神若见了这颗首级，定要痛饮三大碗！”'),
    ],
    choices: [
      {
        id: 'hsq10_17_return',
        label: '一饮而尽辞别守军，连夜冒雪重登落雁峰白玉论剑坛！',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q10_QUEST_ID, 'altar_impart_sanqing'),
          toast('已斩杀血刀恶僧！请返回【华山绝顶论剑台 > 落雁峰白玉论剑坛】向秦烈山献首受剑！', 'success', '凯旋归山'),
        ],
      },
    ],
  },

  scene_hsq10_18: {
    id: 'scene_hsq10_18',
    title: '第十八幕 · 踏雪归山',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('风雪初霁，寒星如洗。你肩披积雪、手捧木匣一步步踏上落雁峰白玉论剑坛。秦烈山竟一直未归石室歇息，仍旧披着苍狼裘立于坛边松下相候。'),
      P('“幸不辱命！塞外凶徒血刀恶僧已于潼关外二十里伏诛，请秦师伯查验！”'),
    ],
    choices: [
      {
        id: 'hsq10_18_next',
        label: '揭开木匣封泥，双手呈于白玉石案之上',
        tone: 'gold',
        effects: [openScene('scene_hsq10_19', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_19: {
    id: 'scene_hsq10_19',
    title: '第十九幕 · 铁骨动容',
    subtitle: '落雁峰白玉论剑坛 · 宿老长叹',
    mandatory: true,
    beats: [
      N('秦烈山凝视匣中恶僧首级与你肩头尚未融化的风雪血霜，沉默良久，冷硬如铁的眼眸竟渐渐泛起一抹动容之色，仰天长叹一声。'),
      S('NPC-0147', '“十剑不退半步，单骑出关斩一流凶僧……好，好！老夫看走了眼，紫霞门下竟真出了铁骨剑客！”'),
      P('“师伯谬赞！弟子出关见边民惨状，方知掌门与师伯为何皆言华山之剑乃镇守关河之重器。”'),
    ],
    choices: [
      {
        id: 'hsq10_19_next',
        label: '随秦烈山走向白玉论剑坛后方的古石龛',
        tone: 'gold',
        effects: [openScene('scene_hsq10_20', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_20: {
    id: 'scene_hsq10_20',
    title: '第二十幕 · 剑气本源',
    subtitle: '白玉石龛前 · 释怀往昔',
    mandatory: true,
    beats: [
      S('NPC-0147', '“你方才说得不错——剑气本是一家！老夫守着这套《太岳三青峰》三十年不肯轻传，不是为了门户私见：剑宗弟子内力不足，强催三剑必伤经脉；气宗弟子缺少血性，学去了也不过是花架子。”'),
      S('NPC-0147', '“唯独你既有《混元功》生生不息的底子，又有一往无前敢与凶徒搏命的胆魄，这卷真本剑谱交到你手里，老夫对得起华山列祖列宗！”'),
    ],
    choices: [
      {
        id: 'hsq10_20_next',
        label: '屏息肃拜，看秦烈山亲手开启尘封三十载的白玉石匣',
        tone: 'gold',
        effects: [openScene('scene_hsq10_21', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_21: {
    id: 'scene_hsq10_21',
    title: '第二十一幕 · 白玉启匣',
    subtitle: '落雁峰白玉论剑坛 · 授真本剑谱',
    illustrationUrl: '/assets/quests/hs_q10_jade_casket.jpg',
    illustrationCaption: '白玉启匣 · 秦烈山动容开启石匣，亲授太岳三青峰剑谱真卷',
    mandatory: true,
    beats: [
      N('咔哒一声轻响，秦烈山以独门混元剑指震开石龛机括，捧出一只寒气森森的白玉石匣。匣盖推开，一卷以金丝绢帛装裱的古谱静卧其中——正是地阶上品秘典【《华山太岳三青峰剑谱》】！'),
      S('NPC-0147', '“拿去！这是历代掌门与镇岳宿老批注的真本原卷，好生收在身边参详，切莫堕了太岳威名！”'),
    ],
    choices: [
      {
        id: 'hsq10_21_take_scroll',
        label: '郑重接过【《华山太岳三青峰剑谱》】，请秦师伯亲演剑诀',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ITM-SCR-016', qty: 1 },
          toast('获得秘籍真卷【《华山太岳三青峰剑谱》】×1！', 'success', '白玉启匣'),
          openScene('scene_hsq10_22', HUASHAN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq10_22: {
    id: 'scene_hsq10_22',
    title: '第二十二幕 · 亲演三剑',
    subtitle: '落雁峰白玉论剑坛 · 一式三威',
    mandatory: true,
    beats: [
      N('秦烈山拔出古朴阔剑，遥指月色下耸入云霄的东峰朝阳、西峰莲花、南峰落雁三大主峰，周身气势骤然拔高如万仞太岳！'),
      S('NPC-0147', '“看清楚了！《太岳三青峰》精要全在‘后浪推前浪，一峰高一峰’！一口混元真气不可中断，第一剑劈敌兵刃，第二剑破敌护身真气，第三剑直取性命——三剑连环，神鬼难挡！”'),
      N('轰、轰、轰！三道凝若实质的青色剑罡接连劈碎坛外三丈冰岩，地阶上品《太岳三青峰》的无上奥义尽数烙印在你脑海之中！'),
    ],
    choices: [
      {
        id: 'hsq10_22_learn',
        label: '心神俱震，领受地阶上品绝学《太岳三青峰》！',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-049', level: 1, autoEquip: true },
          toast('已习得地阶上品剑法《太岳三青峰》！', 'success', '太岳三峰'),
          openScene('scene_hsq10_23', HUASHAN_Q10_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq10_23: {
    id: 'scene_hsq10_23',
    title: '第二十三幕 · 气贯剑脊',
    subtitle: '落雁峰白玉论剑坛 · 初试青峰',
    mandatory: true,
    beats: [
      N('你依着剑谱真诀深吸一口绝顶寒气，体内第 4 重之上的《混元功》如火山喷发般贯入右臂！第一剑递出沉雄厚重，未等剑势回落，掌心劳宫穴气旋猛然二次催发！'),
      P('“一气化三峰——起！”'),
    ],
    choices: [
      {
        id: 'hsq10_23_next',
        label: '连环递出第二剑、第三剑，剑气直冲霄汉！',
        tone: 'gold',
        effects: [openScene('scene_hsq10_24', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_24: {
    id: 'scene_hsq10_24',
    title: '第二十四幕 · 三峰插云',
    subtitle: '落雁峰绝顶 · 气贯苍穹',
    illustrationUrl: '/assets/quests/hs_q10_three_peaks_sword.jpg',
    illustrationCaption: '三峰插云 · 落雁绝顶一式三剑气贯苍穹，修成太岳三青峰',
    mandatory: true,
    beats: [
      N('铮！铮！铮！三声清冽龙吟响彻西岳雪夜，三道青苍剑芒一剑烈似一剑，将半空垂落的冰凌云雾生生劈开一道十余丈长的澄澈天光，恰似太华三峰并插云汉！'),
      S('NPC-0147', '（抚须朗声大笑，声震四谷）“好！初学乍练便能催动三叠混元剑芒而不滞，岳沧溟这次总算收了个能挑大梁的真传徒弟！”'),
    ],
    choices: [
      {
        id: 'hsq10_24_next',
        label: '收剑归鞘，向倾囊授艺的秦师伯深深拜谢',
        tone: 'gold',
        effects: [openScene('scene_hsq10_25', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_25: {
    id: 'scene_hsq10_25',
    title: '第二十五幕 · 回书紫霞',
    subtitle: '落雁峰白玉论剑坛 · 前辈期许',
    mandatory: true,
    beats: [
      N('秦烈山取出岳沧溟那封来信，在背面龙飞凤舞批下“铁骨已成，堪授三峰”八个大字交还与你。'),
      S('NPC-0147', '“回去告诉岳沧溟：气宗也好，剑宗也罢，华山派真正的脊梁永远在敢不敢拔剑向强虏凶徒！待你将这路《太岳三青峰》与内功修至更高境界，或许便能窥见本门紫霞神功先天太岳卷的真正门径！”'),
    ],
    choices: [
      {
        id: 'hsq10_25_next',
        label: '谨受批信，凭栏俯瞰雪霁初晴的万里河山',
        tone: 'gold',
        effects: [openScene('scene_hsq10_26', HUASHAN_Q10_QUEST_ID)],
      },
    ],
  },

  scene_hsq10_26: {
    id: 'scene_hsq10_26',
    title: '第二十六幕 · 岳顶壮怀',
    subtitle: '落雁峰绝顶 · 大道峥嵘',
    mandatory: true,
    beats: [
      N('雪后初晴，九曲黄河如一条金色巨龙环绕在西岳与潼关脚下。你怀揣《华山太岳三青峰剑谱》，既有混元内劲护持根本，复得太岳三剑雷霆杀威，一身武学已然跻身江湖一流剑客之林！'),
    ],
    choices: [
      {
        id: 'hsq10_26_finish',
        label: '收妥剑谱与边关厚赏，下峰潜修《太岳三青峰》',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-049', amount: 320 },
          { type: 'giveSilver', amount: 180, reason: '潼关边军斩杀血刀恶僧悬赏及宗门厚赐' },
          { type: 'addSectContribution', amount: 120 },
          { type: 'giveCombatExp', amount: 250, reason: '白玉坛十剑不退与风雪出关斩血刀恶僧' },
          { type: 'modifyChivalry', delta: 18, reason: '潼关外诛除屠戮边民的血刀恶僧' },
          { type: 'modifyRenown', delta: 35, reason: '单骑出潼关斩血刀恶僧修成太岳三青峰' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 25 },
          { type: 'completeQuest', questId: HUASHAN_Q10_QUEST_ID, outcome: 'completed' },
          toast('已完成《落雁借剑 · 太岳三峰》！习得《太岳三青峰》并获真本剑谱、纹银 180 两！', 'success', '太岳三峰'),
        ],
      },
    ],
  },
}
