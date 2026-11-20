import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q20_QUEST_ID } from './huashanEndingSwordUsurpQuest'

const SPEAKER_TUOBA_XIONG: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋雄',
  title: '西夏关中主帅 · 一品堂征东大都督',
  factionName: '西夏一品堂',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
}

const SPEAKER_JIAN_DISCIPLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '华山剑宗锐士',
  title: '拥立剑宗精锐门人',
  factionName: '华山派',
  avatarUrl: '/assets/characters/templates/tpl_huashan_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_huashan_fb.jpg',
}

function buildQ20TuobaXiongNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ20_TUOBA_XIONG',
    name: '拓跋雄',
    title: '西夏关中主帅 · 一品堂征东大都督',
    realm: '宗师中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 5,
    sectRankLabel: '关中主帅',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“单凭一柄长剑便敢独闯本帅连营？大夏勇士，剁碎这狂徒！”',
    stats: { hp: 5650, mp: 4950, agi: 81, res: 77 },
    talents: { bone: 86, comprehension: 80, charm: 60 },
    equipped: {
      weapon: 'WPN-012',
      armor: 'ARM-012',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-049' },
    learnedArts: [{ artId: 'MA-245', level: 9 }, { artId: 'MA-133', level: 9 }, { artId: 'MA-049', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq20_01: {
    id: 'scene_hsq20_01',
    title: '第一幕 · 寒崖飞雪砺霸锋',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('{reignYear}冬月，鹅毛大雪纷纷扬扬笼罩西岳五峰。思过崖寒风剑坪之上，你独立风雪中心闭目挥剑，将诡谲狠辣的《破岳诡剑》与通玄无招的《独孤九剑》彻底熔于一炉！'),
      N('剑锋掠过之处，漫天飘雪未及近身三尺便被森然剑意绞成碎琼乱玉。一缕令人心悸的霸烈杀伐之气冲霄而起，连崖畔栖息的苍鹰亦惊飞远遁！'),
      P('“九剑大成，诡剑归流——普天之下，再无任何内家真气能挡我手中三尺青锋！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_02', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_02: {
    id: 'scene_hsq20_02',
    title: '第二幕 · 三十载恨剑宗聚',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('杂沓坚定的脚步声踏碎积雪，封不弃一身玄灰劲装，率领数十名腰悬快剑、双目赤红的剑宗精锐弟子鱼贯登上寒风剑坪，齐刷刷在你身前单膝抱剑跪倒！'),
      S('NPC-0167', '“时辰到了！！三十年前玉女峰大变，气宗那帮伪君子仗着《紫霞神功》将我剑宗前辈杀的杀、逐的逐，霸占紫霞主殿整整三十年，连我剑宗子弟领一柄好剑都要看他们脸色！”'),
      S(SPEAKER_JIAN_DISCIPLE, '“请执剑长老执掌大局，夺回玉女峰正统，重振我华山剑宗千秋声威！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_03', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_03: {
    id: 'scene_hsq20_03',
    title: '第三幕 · 立约不杀同门血',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('你俯视雪地上一张张狂热激昂的面孔，指尖轻弹冰冷剑脊，清越剑鸣压下了漫山风吼。'),
      P('“气宗守旧迂腐，奉内力而轻剑锋，致使西岳威名日衰、连西夏番邦都敢欺上门来——华山掌门大位，今日确该易主！”'),
      P('“但有一条铁令：今日踏雪逼宫，只夺紫霞衣钵、只折气宗剑威，不取同门性命！留着华山元气，待我登位之后还要拉去风陵荒原杀尽西夏番狗！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_04', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_04: {
    id: 'scene_hsq20_04',
    title: '第四幕 · 执剑逼宫上玉女',
    subtitle: '西岳山道 · 玉女峰雪阶',
    illustrationUrl: '/assets/quests/hs_q20_snow_march_yunv.jpg',
    illustrationCaption: '执剑逼宫 · 封不弃率剑宗拥戴，踏雪直上玉女峰终结气宗统治',
    mandatory: true,
    beats: [
      S('NPC-0167', '（仰天狂笑，拔剑出鞘一指玉女峰顶）“好气魄！只折其剑，不取其命，叫岳沧溟亲眼瞧瞧谁才是西岳真主！剑宗儿郎——随宗主上玉女峰！！”'),
      N('风雪怒卷，数十柄寒光凛冽的长剑在你身后汇成一道不可阻挡的钢铁剑潮，踏碎层冰直扑玉女峰紫霞道观！'),
    ],
    onFinishEffects: [openScene('scene_hsq20_05', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_05: {
    id: 'scene_hsq20_05',
    title: '第五幕 · 警钟急响四关立',
    subtitle: '玉女峰山门石阶外',
    mandatory: true,
    beats: [
      N('玉女峰顶急促钟声骤响！气宗上下早已察觉思过崖异动，自东峰迎曦石坪、清泉演剑院、苍龙孤松要冲直至紫霞正气主殿，接连布下四重剑关严阵以待！'),
      P('“四重剑关？正好一关一剑，教气宗上下心服口服！”'),
    ],
    choices: [
      {
        id: 'hsq20_ch_start_gates',
        label: '提剑踏入首关【玉女峰紫霞道观 · 东峰紫气迎曦石坪】！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q20_QUEST_ID, stepId: 'gate1_gao' },
          toast('踏雪逼宫开启！请赴【东峰紫气迎曦石坪】闯过首关高沧云！', 'warn', '执剑逼宫'),
        ],
      },
    ],
  },

  scene_hsq20_06: {
    id: 'scene_hsq20_06',
    title: '第六幕 · 东峰首关高沧云',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('东峰紫气迎曦石坪白雪皑皑，气宗大师兄「紫霞首徒」高沧云身披镇派宝衣《华山紫霞剑客衫》，独自横剑立于石坪正中，身后三十名气宗内门弟子剑拔弩张。'),
      S('NPC-0202', '（痛心怒喝）“封师叔！还有你——日前四大恶人犯山，你才立下护山奇功，为何今日竟受邪念蛊惑，带剑宗同门犯上逼宫？！”'),
      P('“高师兄，气宗独占华山三十载，把堂堂天下剑派练成了缩头道观。你身上那件《华山紫霞剑客衫》，唯有胜者配穿——请赐教！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_07', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_07: {
    id: 'scene_hsq20_07',
    title: '第七幕 · 养吾混元布剑幕',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      S('NPC-0202', '“执迷不悟！沧云身为紫霞首徒，纵拼却性命，也绝不容你踏过东峰石坪半步！”'),
      N('高沧云一声清啸，混元功真气灌注长剑，《养吾剑法》与《夺命连环三仙剑》交织成一道密不透风的绵密剑幕，守中带攻向你罩来！'),
      P('“守势愈严，破绽愈显——独孤九剑，破剑式！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_08', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_08: {
    id: 'scene_hsq20_08',
    title: '第八幕 · 首关交锋破剑式',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('你身形如电切入漫天飞雪，直取高沧云养吾剑幕转换之枢纽！'),
    ],
    choices: [
      {
        id: 'hsq20_ch_fight_gao',
        label: '施展《独孤九剑·破剑式》，挑碎高沧云剑幕！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q20_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0202',
              talkOverride: '“我为师父守此首关，绝不退让半步！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【首关夺衫】以《独孤九剑》破剑式击败紫霞首徒高沧云（一流下品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 80, reason: '东峰首关破剑式击败紫霞首徒高沧云' },
              openScene('scene_hsq20_09', HUASHAN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('剑意微滞，凝神重演破剑式再闯首关！', 'warn', '重整剑势'),
              openScene('scene_hsq20_08', HUASHAN_Q20_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq20_09: {
    id: 'scene_hsq20_09',
    title: '第九幕 · 首关夺衫挫首徒',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    illustrationUrl: '/assets/quests/hs_q20_defeat_gao.jpg',
    illustrationCaption: '首关夺衫 · 东峰石坪破剑式挑碎高沧云剑幕，强夺华山紫霞剑客衫',
    mandatory: true,
    beats: [
      N('“铮——！！”不过数合，你的剑尖已如鬼魅般穿过三重剑影，精准挑在高沧云右手腕神门穴侧！高沧云虎口剧震，长剑冲天飞起插进雪堆，冰凉剑脊已稳稳压在他咽喉之上！'),
      P('“高师兄，你败了。依我方才之言，留下身上这件《华山紫霞剑客衫》，退往一旁！”'),
      N('高沧云面色惨白，嘴唇颤抖良久，终在剑宗众人的逼视下屈辱解下紫霞宝衣。你反手接过披于肩头，紫衫衬着冷冽寒锋，霸气更添三分！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ARM-015', qty: 1 },
      toast('首关告破！夺得地阶镇派宝衣《华山紫霞剑客衫》！', 'success', '首关夺衫'),
      openScene('scene_hsq20_10', HUASHAN_Q20_QUEST_ID),
    ],
  },

  scene_hsq20_10: {
    id: 'scene_hsq20_10',
    title: '第十幕 · 剑宗欢腾进内院',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      S('NPC-0167', '（放声大笑）“哈哈哈！紫霞首徒不堪一击，这件紫霞剑客衫披在咱们新宗主身上才叫相得益彰！”'),
      N('三十名气宗守关弟子见大师兄数招落败，气势顿泄，纷纷执剑后退让开回廊通道。'),
    ],
    onFinishEffects: [openScene('scene_hsq20_11', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_11: {
    id: 'scene_hsq20_11',
    title: '第十一幕 · 踏廊直向洗头盆',
    subtitle: '紫霞道观回廊',
    mandatory: true,
    beats: [
      P('“不得伤及退让同门分毫——随我进清泉演剑院，闯第二关！”'),
    ],
    choices: [
      {
        id: 'hsq20_ch_to_gate2',
        label: '身披紫霞剑客衫，闯入【玉女峰紫霞道观 · 洗头盆清泉演剑院】！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q20_QUEST_ID, 'gate2_ning'),
          toast('首关已破！请前往【洗头盆清泉演剑院】闯第二关宁清羽！', 'warn', '二关演剑院'),
        ],
      },
    ],
  },

  scene_hsq20_12: {
    id: 'scene_hsq20_12',
    title: '第十二幕 · 清泉寒梅叹戈矛',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('洗头盆清泉演剑院内寒梅傲雪，清泉未冰。「玉女剑仙」宁清羽一袭素白道袍立于石桥之前，望着你肩头披着的《华山紫霞剑客衫》，秀眉紧蹙，长叹一声。'),
      S('NPC-0166', '“当年你持封师弟铁令上山，是我亲手在东峰教你第一套《华山基础心法》与入门十二式。那时你眼神清亮，何曾有今日这般咄咄逼人的戾气？”'),
      P('“宁师叔传艺之恩，弟子永铭五内，今日绝不伤师叔一根毫发。但气宗墨守成规三十载，华山若不以利剑重洗沉疴，终将沦为二流庸派——请师叔让路！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_13', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_13: {
    id: 'scene_hsq20_13',
    title: '第十三幕 · 剑掌双绝护山堂',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      S('NPC-0166', '（缓缓拔出秋水长剑，左手暗蓄华山混元掌力）“道不同，唯以剑论！你想进主殿逼迫掌门师兄，先破我这路剑掌双绝再说！”'),
      N('宁清羽剑走轻灵、左掌绵密，右手《太岳三青峰》与左手《华山混元掌》互为表里，远近兼备！'),
      P('“剑中藏掌？在《独孤九剑》‘破掌式’眼中，出掌之时便是门户大开之刻！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_14', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_14: {
    id: 'scene_hsq20_14',
    title: '第十四幕 · 二关交锋破掌式',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('梅瓣随雪飘落，你手腕微抖，长剑化无招奇弧直取宁清羽左掌混元气劲吐发之关窍！'),
    ],
    choices: [
      {
        id: 'hsq20_ch_fight_ning',
        label: '施展《独孤九剑·破掌式》，挫败玉女剑仙宁清羽！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q20_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0166',
              talkOverride: '“好凌厉的破掌剑意……接我这记混元云手！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【二关封掌】以《独孤九剑》破掌式挫败玉女剑仙宁清羽（一流中品），点到即止！',
            onWin: [
              { type: 'giveCombatExp', amount: 95, reason: '清泉演剑院破掌式挫败玉女剑仙宁清羽' },
              openScene('scene_hsq20_15', HUASHAN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('玉女剑掌绵密精妙，稳住心神重演破掌式！', 'warn', '重整剑势'),
              openScene('scene_hsq20_14', HUASHAN_Q20_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq20_15: {
    id: 'scene_hsq20_15',
    title: '第十五幕 · 剑背点穴礼授师',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('拆至第九合，宁清羽左掌拍出一记混元劈空劲，你早已料敌机先，长剑斜引避实击虚，翻转剑柄以剑首精准点在她左臂曲池穴外半寸！'),
      N('宁清羽半边手臂微麻，混元掌力顿时涣散，不由自主退上石桥栏杆。你立刻收剑后撤一步，躬身抱拳行了一记弟子礼。'),
      P('“谢宁师叔手下留情，亦谢当年东峰传剑之恩！得罪了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_16', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_16: {
    id: 'scene_hsq20_16',
    title: '第十六幕 · 苍龙孤松剑意横',
    subtitle: '洗头盆北侧 · 通往苍龙孤松石径',
    mandatory: true,
    beats: [
      S('NPC-0166', '（默然收剑入鞘，神色复杂地望着你的背影）“九剑无双，果非人力可强阻……但苍龙岭孤松亭上，秦师兄已动了真怒，好自为之吧。”'),
      S('NPC-0167', '（振奋握拳）“连闯两关！前面朝阳孤松亭便是‘潼关剑神’秦烈山，只要破了他的《太岳三青峰》，紫霞主殿便唾手可得！”'),
    ],
    choices: [
      {
        id: 'hsq20_ch_to_gate3',
        label: '踏上风雪险径，赴【华山绝顶论剑台 · 朝阳孤松观海亭】会战秦烈山！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q20_QUEST_ID, 'gate3_qin'),
          toast('二关已破！请赴【朝阳孤松观海亭】十五合迎战潼关剑神秦烈山！', 'warn', '三关孤松'),
        ],
      },
    ],
  },

  scene_hsq20_17: {
    id: 'scene_hsq20_17',
    title: '第十七幕 · 孤松横剑立剑神',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('狂风卷着暴雪掠过悬崖孤松，「潼关剑神」秦烈山魁梧如铁塔的身躯独立苍龙岭咽喉要道，手中阔剑未出鞘，凛冽剑气已将脚下坚冰割出数道深痕！'),
      S('NPC-0147', '“封不弃！你教出来的好徒侄！老夫生平最恨同室操戈，可你们今日偏要拿剑逼宫——想见岳掌门，先问过老夫这柄饮尽塞北马贼鲜血的《太岳三青峰》答不答应！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_18', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_18: {
    id: 'scene_hsq20_18',
    title: '第十八幕 · 十五合约决雌雄',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      P('“秦师伯威震潼关，剑法刚猛雄奇，本是气宗之中最重剑道之人！今日晚辈以《独孤九剑》领教《太岳三青峰》——若十五合之内不能破师伯之剑，晚辈立时回转思过崖！”'),
      S('NPC-0147', '（怒极反笑，阔剑锵然出鞘如惊雷炸响）“狂妄！！老夫纵横关中四十年，还没人敢夸口十五合破我三青峰！看剑！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_19', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_19: {
    id: 'scene_hsq20_19',
    title: '第十九幕 · 三关硬撼三青峰',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      N('秦烈山一剑化三峰，一峰高过一峰、一剑重似一剑，挟着万钧雷霆之势正面碾压而来！'),
    ],
    choices: [
      {
        id: 'hsq20_ch_fight_qin',
        label: '奇正并施，十五合硬破潼关剑神秦烈山《太岳三青峰》！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q20_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0147',
              talkOverride: '“接老夫绝学——太岳三青峰，一剑断潼关！！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【三关破峰】十五合内以《独孤九剑》结合《破岳诡剑》击败潼关剑神秦烈山（一流上品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 115, reason: '苍龙岭孤松亭十五合硬破潼关剑神秦烈山' },
              openScene('scene_hsq20_20', HUASHAN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('太岳三青峰势大力沉，寻其三剑换气之隙再度出手！', 'warn', '重整剑势'),
              openScene('scene_hsq20_19', HUASHAN_Q20_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq20_20: {
    id: 'scene_hsq20_20',
    title: '第二十幕 · 连闯双关挫剑神',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    illustrationUrl: '/assets/quests/hs_q20_break_ning_qin.jpg',
    illustrationCaption: '连闯双关 · 破掌式挫败宁清羽，苍龙岭十五合硬破潼关剑神秦烈山',
    mandatory: true,
    beats: [
      N('金铁交击之声如疾风暴雨响彻万丈云崖！前十二合你以《独孤九剑》总决式连消秦烈山四轮三青峰攻势；第十三、十四合忽参入《破岳诡剑》奇险斜刺诱其回剑护肋；第十五合电光骤闪——“破剑式”直贯三峰叠浪之断层！'),
      N('“当啷！！”火星四溅中，秦烈山双臂剧震退至古松树干之前，你冰冷的剑尖已堪堪停在他胸前护心铜镜外一分之处，劲风吹断了他颌下三茎白须！'),
    ],
    onFinishEffects: [openScene('scene_hsq20_21', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_21: {
    id: 'scene_hsq20_21',
    title: '第二十一幕 · 剑神长叹侧身让',
    subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
    mandatory: true,
    beats: [
      S('NPC-0147', '（怔怔低头看了一眼胸前剑尖，沉默半晌，猛地归剑入鞘，仰天长叹一声）“好一个十五合……老夫一生浸淫剑道，今日方知天外有天！也罢，天意既教我华山剑宗出你这等不世妖孽，老夫愿赌服输，绝不再拦！”'),
      N('秦烈山虎步横移，竟当真侧身让开了通往紫霞正气主殿的最后一道石阶！'),
    ],
    onFinishEffects: [openScene('scene_hsq20_22', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_22: {
    id: 'scene_hsq20_22',
    title: '第二十二幕 · 风雪直指紫霞殿',
    subtitle: '紫霞正气主殿石阶前',
    mandatory: true,
    beats: [
      S('NPC-0167', '（激动得声音发颤）“高沧云、宁清羽、秦烈山三关尽破！如今紫霞正气主殿之内，只剩岳沧溟一人了！”'),
      P('“封师叔与诸位同门守在殿外，谁也不许插手——岳沧溟的十成《紫霞神功》，由我一人一剑去破！”'),
    ],
    choices: [
      {
        id: 'hsq20_ch_to_gate4',
        label: '独步推开重门，踏入终关【玉女峰紫霞道观 · 紫霞正气主殿】！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q20_QUEST_ID, 'gate4_yue'),
          { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_hall' },
          toast('三关尽破！请在【紫霞正气主殿】以破气式决战掌门岳沧溟！', 'warn', '终关主殿'),
          openScene('scene_hsq20_23', HUASHAN_Q20_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq20_23: {
    id: 'scene_hsq20_23',
    title: '第二十三幕 · 重门推开紫雾深',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('“吱呀——轰！”沉重的朱漆殿门被你一掌推开，鹅毛风雪狂涌入殿，却在踏入殿门三丈处骤然融化化作白雾！'),
      N('只见华山派掌门「太岳真君」岳沧溟端坐于历代祖师牌位之下，双手横按镇派神兵《太岳紫霞长剑》，整张苍老面庞笼罩在一层庄严瑰丽的深紫霞光之中！'),
      S('NPC-0118', '“昔年你在大殿答我太岳问剑，言剑气本出一源；不想思过崖一朝贪拓魔刻，终究还是走上了以剑弑气、执剑夺位的霸道。”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_24', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_24: {
    id: 'scene_hsq20_24',
    title: '第二十四幕 · 道统之争无退路',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“岳掌门，所谓正邪奇正，从来皆由胜者书写！三十年前气宗以紫霞压服剑宗是正统，今日我以《独孤九剑》压服紫霞，剑宗便是新的太岳正统！”'),
      S('NPC-0118', '（缓缓长身而起，《太岳紫霞长剑》出鞘三尺，满殿青砖寸寸震鸣）“好一句胜者书写！段延庆一阳指虽强，终非先天玄门正宗。今日老夫便拼尽毕生十成《紫霞神功》，看看你的‘破气式’，能不能破开我西岳三百年太岳紫气！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_25', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_25: {
    id: 'scene_hsq20_25',
    title: '第二十五幕 · 十成紫霞化狂澜',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('岳沧溟须发尽数无风飘起，宗师中品巅峰的《紫霞神功（先天太岳卷）》毫无保留催至十成极致，整座正气主殿仿佛化作一座紫电翻腾的滔天漩涡，连呼吸都重若千钧！'),
      P('“来得好！紫气愈盛，回旋枢机愈明——独孤九剑，破气式！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_26', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_26: {
    id: 'scene_hsq20_26',
    title: '第二十六幕 · 剑撼紫霞决巅峰',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q20_clash_yue_zixia.jpg',
    illustrationCaption: '剑撼紫霞 · 紫霞正气主殿独孤九剑破气式直刺岳沧溟漫天紫气漩涡',
    mandatory: true,
    beats: [
      N('漫天紫气漩涡如五岳倾塌当头压落，你人剑合一化作一道逆流刺天的孤冷寒芒，直贯紫霞气旋最核心的转换命门！'),
    ],
    choices: [
      {
        id: 'hsq20_ch_fight_yue',
        label: '催动《独孤九剑·破气式》，正面击破岳沧溟十成紫霞神功！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q20_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0118',
              talkOverride: '“太岳浩气，紫霞千重——接老夫毕生极境一剑！！”',
            },
            rule: 'story_trial',
            lethalOnLose: false,
            introText: '【终关夺岳】以《独孤九剑·破气式》正面硬撼十成紫霞神功的华山掌门岳沧溟（宗师中品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 180, reason: '紫霞主殿以破气式正面击破岳沧溟十成紫霞神功' },
              openScene('scene_hsq20_27', HUASHAN_Q20_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('先天紫霞绵密如海，静心洞察其周天流转之隙再刺！', 'warn', '重凝破气'),
              openScene('scene_hsq20_26', HUASHAN_Q20_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq20_27: {
    id: 'scene_hsq20_27',
    title: '第二十七幕 · 一剑刺穿紫气旋',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('二十余合惊心动魄的剑气激撞！岳沧溟《紫霞神功》虽醇厚渊深、几近无懈可击，你在最凶险处骤然以《破岳诡剑》斜走偏锋逼其变招催劲，刹那间抓住了紫气由阳转柔的一缕微瑕！'),
      N('“破气式——贯虹！！”你长剑如流星穿云，竟不损半毫地穿过重重紫霞气浪，剑尖精准点在《太岳紫霞长剑》剑镡与岳沧溟劳宫穴气脉交汇点上！'),
      N('“嗡——锵啷！！”漫天紫气漩涡轰然溃散，岳沧溟闷哼连退五步，手中执掌三十余年的镇派神剑《太岳紫霞长剑》脱手飞旋，斜斜钉入丹墀白玉砖缝之中！'),
    ],
    onFinishEffects: [openScene('scene_hsq20_28', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_28: {
    id: 'scene_hsq20_28',
    title: '第二十八幕 · 三十载主黯退山',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('殿门外赶来的秦烈山、宁清羽、高沧云与封不弃等人亲眼目睹太岳神剑脱手钉地，全场鸦雀无声！'),
      S('NPC-0118', '（苍颜之上一抹紫霞彻底敛去，望着钉在砖上的佩剑，凄然一笑）“十成先天紫霞，终究还是败在了独孤前辈的‘破气式’下……三十年前气宗以力胜剑宗，三十年后剑宗以剑破气宗，天道好还，老夫无话可说。”'),
      S('NPC-0118', '“掌门玉印便在案上，老夫今日起退隐后山幽谷，不再过问前山一草一木。只望你……莫教西岳三百年清誉折在番邦异族手里！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_29', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_29: {
    id: 'scene_hsq20_29',
    title: '第二十九幕 · 逆夺神锋掌太岳',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q20_seize_taiyue_sword.jpg',
    illustrationCaption: '逆夺神锋 · 震飞岳沧溟佩剑拾起太岳紫霞长剑，下山屠灭风陵夏营',
    mandatory: true,
    beats: [
      N('你在万众屏息注视下缓步上前，单手握住剑柄，“铮”地一声将《太岳紫霞长剑》自白玉砖中拔出！森寒霸剑之气灌入古剑，竟压过了剑身原本温润的紫光，发出刺耳慑人的铮鸣！'),
      P('“岳太上掌门尽管放宽心——气宗守不住的关中威名，我用这柄《太岳紫霞长剑》去杀出来！”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'WPN-017', qty: 1 },
      toast('终关告捷！逆夺华山镇派神兵《太岳紫霞长剑》！', 'success', '逆夺神锋'),
      openScene('scene_hsq20_30', HUASHAN_Q20_QUEST_ID),
    ],
  },

  scene_hsq20_30: {
    id: 'scene_hsq20_30',
    title: '第三十幕 · 借寇人头立霸威',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('恰在此时，山下探哨冒雪飞奔入殿：西夏关中主帅拓跋雄闻听华山内变，已在风陵荒原大营擂鼓聚兵，企图趁乱渡河偷袭潼关！'),
      S('NPC-0167', '“宗主，是否先在殿内行完登基大礼，再议守关之事？”'),
      P('“不必！若无外战赫赫血功，气宗人心口服而心不服！传我第一道宗主铁令：剑气两脉精锐即刻随我下潼关、渡黄河——今夜拿拓跋雄的项上人头与风陵全营敌血，做我的登基贺礼！”'),
    ],
    choices: [
      {
        id: 'hsq20_ch_to_fengling',
        label: '提《太岳紫霞长剑》率军疾赴【潼关天险瓮城 · 黄河大折惊涛烽火台】！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q20_QUEST_ID, 'slaughter_fengling'),
          toast('携神锋下山！请赴【黄河大折惊涛烽火台】血洗风陵夏营斩杀拓跋雄！', 'warn', '屠营祭剑'),
        ],
      },
    ],
  },

  scene_hsq20_31: {
    id: 'scene_hsq20_31',
    title: '第三十一幕 · 雪夜疾渡扑夏营',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台（风陵敌营）',
    mandatory: true,
    beats: [
      N('风雪怒号，黄河浮冰撞击作响。你身披《华山紫霞剑客衫》、手提《太岳紫霞长剑》，率封不弃与两脉精锐快船疾渡北岸，自惊涛烽火高坡如天降杀神直扑风陵西夏连营！'),
      N('没有半分迂回试探——你一马当先掠入辕门，《独孤九剑》化作一道撕裂风雪的死亡白虹，十步一杀，阻路的一品堂刀盾番兵连惨叫都未发出便成片倒在血泊之中！'),
    ],
    onFinishEffects: [openScene('scene_hsq20_32', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_32: {
    id: 'scene_hsq20_32',
    title: '第三十二幕 · 辕门血路震番酋',
    subtitle: '风陵荒原 · 西夏中军大帐前',
    mandatory: true,
    beats: [
      S(SPEAKER_TUOBA_XIONG, '（披甲提剑冲出帅帐，见前营转眼尸横遍野，又惊又怒）“什么人敢孤军强闯本帅大营？！探子不是说华山派正在同室操戈吗？！”'),
      P('“华山之内争，一炷香前便已由我用剑终结了。拓跋雄，你倒算走运，成了这柄易主之后《太岳紫霞长剑》的第一个祭品！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_33', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_33: {
    id: 'scene_hsq20_33',
    title: '第三十三幕 · 霸剑死战拓跋雄',
    subtitle: '风陵荒原 · 西夏中军大帐前',
    mandatory: true,
    beats: [
      S(SPEAKER_TUOBA_XIONG, '“找死！！纵使岳沧溟亲至也不敢在万军之中如此托大，看本帅剁下你的脑袋！！”'),
      N('拓跋雄狂吼催动宗师中品的西夏秘藏玄功，冷锻重剑裹挟漫天风雪血煞当头斩落！'),
    ],
    choices: [
      {
        id: 'hsq20_ch_duel_tuoba',
        label: '施展《独孤九剑》霸道杀招，阵斩西夏主帅拓跋雄！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q20_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQ20TuobaXiongNpc() },
            rule: 'duel',
            forbidEscapeReason: '霸主立威首战，岂容西夏番酋生还！',
            introText: '【屠营立威】执《太岳紫霞长剑》施展《独孤九剑》，正面斩杀西夏关中主帅拓跋雄（宗师中品）！',
            onWin: [
              { type: 'giveCombatExp', amount: 220, reason: '风陵大营以独孤九剑斩杀西夏主帅拓跋雄' },
              openScene('scene_hsq20_34', HUASHAN_Q20_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq20_34: {
    id: 'scene_hsq20_34',
    title: '第三十四幕 · 唯快不破枭敌首',
    subtitle: '风陵荒原 · 血雪校场',
    mandatory: true,
    beats: [
      N('面对拓跋雄势若疯虎的秘藏重剑，你眼皮都未曾多抬一下——“破刀式”削碎其护身刀盾亲卫，“破剑式”挑飞其夏国冷锻重剑，紧接着一记融合《破岳诡剑》阴狠角度的“破气式”一闪即逝！'),
      N('“噗嗤！！”《太岳紫霞长剑》自拓跋雄咽喉透颈而过，鲜血溅上漫天飞雪！这位威震贺兰与河西的一品堂大都督双目圆睁，轰然跪倒毙命！'),
    ],
    onFinishEffects: [openScene('scene_hsq20_35', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_35: {
    id: 'scene_hsq20_35',
    title: '第三十五幕 · 火洗风陵慑两脉',
    subtitle: '风陵荒原 · 烈焰残营',
    mandatory: true,
    beats: [
      N('封不弃率领华山群雄趁势掩杀，将负隅顽抗的一品堂死士尽数屠灭，一把大火烧光风陵连营粮械！随军出征的气宗弟子目睹你鬼神莫测、挡者披靡的无敌杀剑，最后一丝不甘亦化作了彻骨敬畏！'),
      S('NPC-0167', '“一日之内连破气宗四关，入夜便过河屠灭西夏大营斩杀拓跋雄！自今日起，关中江湖谁敢不奉我华山霸剑号令！！”'),
    ],
    onFinishEffects: [
      { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_zixia', spotId: 'tg_zx_hall' },
      openScene('scene_hsq20_36', HUASHAN_Q20_QUEST_ID),
    ],
  },

  scene_hsq20_36: {
    id: 'scene_hsq20_36',
    title: '第三十六幕 · 西岳霸主登绝位',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    illustrationUrl: '/assets/quests/hs_q20_hegemon_throne.jpg',
    illustrationCaption: '西岳霸主 · 唯快不破登基西岳霸剑宗主，满山剑客俯首号令江湖',
    mandatory: true,
    beats: [
      N('次日破晓，折断的西夏狼头大纛被踩在紫霞正气主殿丹墀之下。你身披《华山紫霞剑客衫》，将《太岳紫霞长剑》横置膝前，傲然端坐于历代华山掌门宝座之上！'),
      N('封不弃立于阶首，秦烈山、宁清羽、高沧云及满山剑气两脉数百名剑客尽皆俯首拜服，无人敢仰视你迫人的剑道锋芒！'),
      S('NPC-0167', '“恭迎我华山派新主——西岳霸剑宗主登基！！唯快不破，万剑臣服！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_37', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_37: {
    id: 'scene_hsq20_37',
    title: '第三十七幕 · 以剑统气定新规',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“传本宗主法旨：自今日起，华山废除气主剑辅旧训，改立‘唯快不破、以剑统气’铁律！紫霞秘阁向剑宗优秀子弟全面敞开，凡有敢言门户分裂者，皆以此剑论处！”'),
      P('“另发英雄帖昭告天下——待腊月大雪封山之日，本宗主将于落雁峰重开甲子华山论剑，无论是南慕容、北乔峰，还是吐蕃番僧，尽可上西岳一试我手中《独孤九剑》！”'),
    ],
    onFinishEffects: [openScene('scene_hsq20_38', HUASHAN_Q20_QUEST_ID)],
  },

  scene_hsq20_38: {
    id: 'scene_hsq20_38',
    title: '第三十八幕 · 剑压五岳傲苍穹',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('山风凛冽，满山长剑齐齐出鞘向天致敬，铮铮寒光映彻{reignYear}的皑皑雪峰。气宗三十载统治终成历史，属于「西岳霸剑宗主」的铁血时代，自此拉开帷幕！'),
    ],
    choices: [
      {
        id: 'hsq20_ch_complete',
        label: '执掌太岳霸权，正式晋升 Lv.5 西岳霸剑宗主！',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-05', rank: 5, promoteOnly: true },
          { type: 'setFlag', flag: 'hs_ending', value: 'sword_usurp' },
          { type: 'giveSilver', amount: 450, reason: '屠灭风陵夏营登基西岳霸剑宗主' },
          { type: 'addSectContribution', amount: 300 },
          { type: 'giveCombatExp', amount: 520, reason: '连破气宗四关并斩杀拓跋雄' },
          { type: 'modifyRenown', delta: 90, reason: '独孤九剑连破华山四关、雪夜屠灭西夏风陵大营' },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 35 },
          { type: 'completeQuest', questId: HUASHAN_Q20_QUEST_ID, outcome: 'sword_usurp' },
          toast('恭喜登基 Lv.5【西岳霸剑宗主】！终章《西岳绝顶 · 华山论剑》现已开启！', 'success', '西岳霸主'),
        ],
      },
    ],
  },
}
