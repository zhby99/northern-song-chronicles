import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q17_QUEST_ID } from './huashanQiZixiaAwakenQuest'

const SPEAKER_DUAN_YANQING: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-1053' }

const SPEAKER_DEATHSWORN_COMMANDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂死士都统',
  title: '西夏征东铁鹞死士统领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_DEATHSWORN_VANGUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂死士锐卒',
  title: '西夏夜袭重刀死士',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildDeathswornCommanderNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ17_DEATHSWORN_CMD',
    name: '一品堂死士都统',
    title: '东峰夜袭 · 铁鹞死士首领',
    realm: '一流中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '死士都统',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“四大先生有令：缠住东峰华山主力，杀一个够本！”',
    stats: { hp: 2860, mp: 2300, agi: 64, res: 55 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-025',
      shoes: 'BOT-016',
      accessory1: 'ACC-028',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-113' },
    learnedArts: [{ artId: 'MA-245', level: 7 }, { artId: 'MA-133', level: 7 }, { artId: 'MA-113', level: 6 }],
  })
}

function buildDeathswornGuardNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ17_DEATHSWORN_GUARD',
    name: '一品堂死士锐卒',
    title: '东峰夜袭 · 搏命刀手',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '死士锐卒',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“踏平玉女峰，赏黄金百两！”',
    stats: { hp: 2240, mp: 1750, agi: 61, res: 48 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-026',
      shoes: 'BOT-016',
    },
    equippedArts: { neigong: 'MA-232', move1: 'MA-133', move2: 'MA-132' },
    learnedArts: [{ artId: 'MA-232', level: 6 }, { artId: 'MA-133', level: 6 }, { artId: 'MA-132', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq17_01: {
    id: 'scene_hsq17_01',
    title: '第一幕 · 子夜惊钟震五峰',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}腊月望日，三更寒星冷澈骨髓。“当——当——当——！！”镇岳古铜警钟骤然连撞九响，急促如裂帛的钟鸣瞬间撕裂了西岳五峰的寂静！'),
      N('你手按长剑冲入紫霞正气主殿，只见掌门岳沧溟、宁清羽、封不弃与大师兄高沧云已披挂齐整，一名带伤的前哨弟子正单膝跪地急喘禀报！'),
      S('NPC-0202', '“护法长老来得正好！西夏一品堂见反间血书未曾搞垮我派，今夜竟倾巢来袭了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_02', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_02: {
    id: 'scene_hsq17_02',
    title: '第二幕 · 恶客如龙焚山道',
    subtitle: '玉女峰紫霞道观 · 殿前观云栏',
    illustrationUrl: '/assets/quests/hs_q17_four_evils_raid.jpg',
    illustrationCaption: '恶客夜袭 · 四大恶人率五百西夏一品堂死士火把如龙奇袭西岳',
    mandatory: true,
    beats: [
      N('众人疾步抢至殿前观云石栏俯瞰山下——只见千尺幢至苍龙岭的险峻山道之上，五百名黑甲蒙面的西夏一品堂死士手举松油火把，宛若一条狰狞赤色火龙蜿蜒扑上峰顶！'),
      N('而在火龙最前方，四道诡异绝伦的身影甚至不借铁索，踏着近乎垂直的冰封峭壁如履平地疾掠而上！'),
      S('NPC-0167', '（脸色骤沉）“双拐点石的是『恶贯满盈』段延庆！后面抱婴提刀的是叶二娘、扛鳄嘴剪的是南海鳄神岳老三、踏树梢飞纵的是云中鹤……西夏人竟把『四大恶人』全请来了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_03', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_03: {
    id: 'scene_hsq17_03',
    title: '第三幕 · 剑神扼峡断敌腰',
    subtitle: '玉女峰紫霞道观 · 殿前观云栏',
    mandatory: true,
    beats: [
      N('便在此时，下方百尺峡咽喉隘口陡然亮起一道惊天青虹！驻守绝顶的「潼关剑神」秦烈山飞身落于峡口巨石之上，一剑横斩震落十余名死士，洪钟般的怒喝遥遥传上玉女峰！'),
      S('NPC-0147', '“岳师弟守住本山！这五百番邦死士后队，老夫在百尺峡一剑截断，绝不放过半百上山！”'),
      P('“秦师伯一夫当关截住了大半死士，但四大恶人轻功绝顶，已携百余名精锐死士翻过苍龙岭东翼了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_04', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_04: {
    id: 'scene_hsq17_04',
    title: '第四幕 · 掌门临阵布防务',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '（临危不乱，沉声发令）“四大恶人之首段延庆内力深不可测，绝非寻常一流高手可比！宁师妹、封师弟，你二人速领东院剑阵扼守【东峰紫气迎曦石坪】，截住他们正面锋芒！”'),
      S('NPC-0166', '“遵令！封师兄，今夜并肩杀敌，让他们瞧瞧我华山气剑合璧的厉害！”'),
      S('NPC-0167', '（拔剑冷笑）“正合老夫心意！管他什么四大恶人，敢踏玉女峰先吃我三仙快剑！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_05', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_05: {
    id: 'scene_hsq17_05',
    title: '第五幕 · 护法受命援东峰',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      S('NPC-0118', '“沧云组织年轻弟子与伤员撤往主殿后堂结守御剑阵；护法长老，你机动策应东峰石坪，务必粉碎一品堂前锋死士的冲阵之势，老夫居中镇守紫霞主殿！”'),
      P('“弟子领命！东峰交由弟子协防，掌门亦请万分留神！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_06', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_06: {
    id: 'scene_hsq17_06',
    title: '第六幕 · 杀声四起赴迎曦',
    subtitle: '玉女峰紫霞道观 · 东峰栈道',
    mandatory: true,
    beats: [
      N('东峰方向已然爆发出密集如雨的金铁交击声与凄厉呼啸。你提剑展开轻功，迎着凛冽山风直扑东峰紫气迎曦石坪！'),
    ],
    choices: [
      {
        id: 'hsq17_c06_to_terrace',
        label: '疾掠赶赴东峰紫气迎曦石坪，驰援宁清羽与封不弃',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q17_QUEST_ID, stepId: 'q17_east_terrace_defense' },
          toast('已开启《血染玉女 · 紫霞传薪》！请速赴【东峰紫气迎曦石坪】阻击强敌！', 'warn', '恶客夜袭'),
        ],
      },
    ],
  },

  scene_hsq17_07: {
    id: 'scene_hsq17_07',
    title: '第七幕 · 东峰恶斗影纵横',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪外',
    mandatory: true,
    beats: [
      N('踏上东峰石阶，只见火光映红半边雪崖——百余名西夏死士正悍不畏死地冲击华山弟子剑阵！'),
    ],
    onFinishEffects: [openScene('scene_hsq17_08', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_08: {
    id: 'scene_hsq17_08',
    title: '第八幕 · 玉女狂风战二凶',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('石坪中央战团更是凶险万分：「无恶不作」叶二娘手中柳叶薄刀诡谲莫测，与宁清羽的玉女清泉剑斗得难解难分；「穷凶极恶」云中鹤身形如鬼魅高踞松巅，一对镔铁钢爪与封不弃的狂风快剑硬拼数记，火星四射！'),
      S('NPC-0233', '（凄厉怪笑）“好俊的华山女剑仙！待二娘宰了你，把你门下俊俏小道童全抱去耍子！”'),
      S('NPC-0166', '“邪魔外道休吐秽言！护法长老，我与封师兄缠住这两个恶贼，快斩断侧面包抄的死士都统！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_09', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_09: {
    id: 'scene_hsq17_09',
    title: '第九幕 · 死士都统侧面突',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('侧面石崖下，一品堂死士都统正率领一队精锐重刀手企图偷袭宁清羽与封不弃背心！你横剑截断来路，剑气凛然如霜！'),
      S(SPEAKER_DEATHSWORN_COMMANDER, '“又跳出个紫绶长老！兄弟们并肩上，乱刀分尸！”'),
      S(SPEAKER_DEATHSWORN_VANGUARD, '“杀——！！”'),
    ],
    choices: [
      {
        id: 'hsq17_c09_fight_deathsworn',
        label: '催动太岳剑意，正面迎斩一品堂死士都统精锐！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildDeathswornCommanderNpc() },
            extraOpponents: [{ kind: 'custom', npc: buildDeathswornGuardNpc() }],
            rule: 'duel',
            forbidEscapeReason: '东峰防线若失，宁师叔与封师叔腹背受敌必遭大难！',
            introText: '【东峰阻击】斩杀包抄侧翼的一品堂死士都统（一流中品）与死士锐卒（一流下品）！',
            onWin: [openScene('scene_hsq17_10', HUASHAN_Q17_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq17_10: {
    id: 'scene_hsq17_10',
    title: '第十幕 · 连斩都统稳东坪',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('你剑光暴涨，三青峰连环劈碎死士都统胸前护心铁镜，余势横扫再斩副手！失了头领的西夏死士阵脚大乱，被东院剑阵杀得节节败退！'),
      P('（心头忽地一凛，环顾战场惊喝）“不对！四大恶人只见叶二娘与云中鹤——段延庆和岳老三去了何处？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_11', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_11: {
    id: 'scene_hsq17_11',
    title: '第十一幕 · 鹤影狞笑泄杀机',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      S('NPC-0182', '（借着封不弃一剑之势飘身倒掠上树梢，怪笑声刺耳欲聋）“嘿嘿嘿，现在才醒过味来？晚啦！老大跟岳老三早从西侧悬崖摸去你们紫霞主殿，这会儿岳沧溟的老脑袋只怕已经搬家喽！”'),
      S('NPC-0166', '（花容失色）“不好！主殿里尽是尚未成器的年轻弟子，掌门师兄为护他们定会束手束脚！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_12', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_12: {
    id: 'scene_hsq17_12',
    title: '第十二幕 · 主殿方向震天响',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('话音未落，西首紫霞正气主殿方向轰然传来一声石柱崩裂的巨响，紧接着是一股霸道绝伦的纯阳指力与紫霞掌风剧烈对撞的气浪！'),
      S('NPC-0167', '“东峰残敌交给我与宁师妹缠死！小子，快回紫霞主殿救岳师兄！！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_13', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_13: {
    id: 'scene_hsq17_13',
    title: '第十三幕 · 飞掠回援心似焚',
    subtitle: '玉女峰紫霞道观 · 飞虹长廊',
    mandatory: true,
    beats: [
      N('你不及多言，提聚十成轻功顺着飞虹长廊发足狂奔！脚下青石板被踏出道道裂纹，主殿丹墀前的喊杀声与金铁撞击声已近在咫尺！'),
    ],
    onFinishEffects: [openScene('scene_hsq17_14', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_14: {
    id: 'scene_hsq17_14',
    title: '第十四幕 · 丹墀血影映重檐',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿外院',
    mandatory: true,
    beats: [
      N('冲过外院月门，眼前的惨烈一幕令你目眦欲裂！'),
    ],
    choices: [
      {
        id: 'hsq17_c14_to_hall',
        label: '纵身跃上主殿丹墀，接应浴血苦战的掌门岳沧溟',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q17_QUEST_ID, 'q17_zixia_hall_crisis'),
          toast('段延庆与岳老三正在强攻紫霞主殿！速入【紫霞正气主殿】救护掌门！', 'warn', '掌门喋血'),
        ],
      },
    ],
  },

  scene_hsq17_15: {
    id: 'scene_hsq17_15',
    title: '第十五幕 · 掌门喋血护雏鹰',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿门前',
    illustrationUrl: '/assets/quests/hs_q17_yue_hold_gate.jpg',
    illustrationCaption: '掌门喋血 · 岳沧溟殿前独抗段延庆一阳指铁杖与岳老三夹击负创',
    mandatory: true,
    beats: [
      N('紫霞主殿大门半掩，高沧云正拼死将最后几名十几岁的入门小剑童推进殿内；而白玉丹墀正中，掌门岳沧溟紫袍染血，以一己之力死死挡住「恶贯满盈」段延庆与「凶神恶煞」岳老三的双重夹击！'),
      S('NPC-0183', '（挥舞碗口粗的鳄嘴剪咔嚓乱剪，暴跳如雷）“老牛鼻子还不让开！喀嚓一声剪断你的脖子，拜我南海鳄神做师父也来不及啦！”'),
      S(SPEAKER_DUAN_YANQING, '（双唇不动，腹中发出金属摩擦般的阴冷怪声）“岳沧溟，你还要分心护身后那群小崽子，接得下老夫这一杖么？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_16', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_16: {
    id: 'scene_hsq17_16',
    title: '第十六幕 · 紫霞拍鳄受杖伤',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿门前',
    mandatory: true,
    beats: [
      N('千钧一发之际，岳老三一剪剪向门槛边一名摔倒的小剑童！岳沧溟怒发冲冠，竟不顾身后空门，左掌紫气暴涨一掌拍在岳老三胸口，震得岳老三狂喷鲜血倒飞下十级石阶！'),
      N('然而就在同一瞬，段延庆右手精钢铁杖凝聚天阶一阳指纯阳劲力，如毒龙出洞般重重戳在岳沧溟后心至阳穴偏左半寸！岳沧溟闷哼一声，一口殷红鲜血洒在白玉阶上！'),
      P('“掌门师父——！！看剑！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_17', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_17: {
    id: 'scene_hsq17_17',
    title: '第十七幕 · 飞剑逼敌退入殿',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('你凌空飞掠而至，《太岳三青峰》拼尽全力连劈三道凌厉剑虹，硬生生逼得段延庆收杖回防半步！你趁机一把扶起岳沧溟掠入主殿之内，高沧云与众真传合力推上千斤包铜楠木殿门，落下三道玄铁横闩！'),
      S('NPC-0183', '（在殿外捂着胸口哇哇暴叫）“疼死老子了！老大，快用铁杖把这破木头门捅个窟窿！”'),
      S(SPEAKER_DUAN_YANQING, '“（腹语）不急，岳沧溟中了老夫一阳指阴劲，心脉已损。待云老四过来汇合破门，殿里便是瓮中之鳖！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_18', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_18: {
    id: 'scene_hsq17_18',
    title: '第十八幕 · 经脉受创危局迫',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    mandatory: true,
    beats: [
      N('殿门外撞击之声如闷雷阵阵，震得梁上香灰簌簌飘落。殿内长明灯火摇曳，岳沧溟盘膝坐于历代祖师灵位蒲团之上，面如金纸，嘴角血迹未干。'),
      P('（急忙抵掌欲助掌门疗伤）“师父！弟子为您护法推宫过血！”'),
      S('NPC-0118', '（抬手止住你，目光却清亮如炬）“莫费真气了！段延庆不愧是大理皇室叛出的绝顶人物，一阳指力借铁杖透入老夫手少阴心脉，非十日闭关不能逼出。”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_19', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_19: {
    id: 'scene_hsq17_19',
    title: '第十九幕 · 临危决意传薪火',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    mandatory: true,
    beats: [
      S('NPC-0118', '“但殿门最多再撑半个时辰！秦师兄困于百尺峡，宁师妹与封师弟在东峰分身乏术，眼下能正面硬撼段延庆一阳指铁杖、救全派上下百余口性命者，唯有你一人！”'),
      P('“弟子纵粉身碎骨亦要死战到底！只是段延庆修为已臻宗师中品，弟子混元内劲恐难敌其天阶指力……”'),
      S('NPC-0118', '（傲然一笑，指向供桌最高处的华山创派祖师灵位）“混元功自然不够——但若加上我华山镇派三百年的无上至宝《紫霞神功》呢？！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_20', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_20: {
    id: 'scene_hsq17_20',
    title: '第二十幕 · 华山九功紫霞尊',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    mandatory: true,
    beats: [
      N('殿内众弟子闻言无不屏息动容！武林素有传言：「华山九功，紫霞第一」——此乃非掌门及钦定传人绝不轻授的天阶下品先天内功！'),
      S('NPC-0118', '“沧云老成持重却失之锐气，而你根基浑厚、屡挽狂澜，早已将《混元功》与《太岳三青峰》修至水乳交融之境，正是承接紫霞薪火的天选之人！跪下，听传全卷口诀！”'),
      P('（向祖师牌位与岳沧溟重重三叩首）“弟子定澄心凝虑，恭聆师父传法！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_21', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_21: {
    id: 'scene_hsq17_21',
    title: '第二十一幕 · 灵前倾授先天卷',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    illustrationUrl: '/assets/quests/hs_q17_zixia_impart.jpg',
    illustrationCaption: '紫霞传薪 · 祖师灵位前岳沧溟倾囊传授天阶绝学紫霞神功先天太岳卷',
    mandatory: true,
    beats: [
      N('岳沧溟强提丹田本源真元，一掌按在你头顶百会穴，将《紫霞神功（先天太岳卷）》九九八十一句总纲心诀字字如洪钟般灌入你识海！'),
      S('NPC-0118', '“『天下武功，唯刚易折，唯柔易靡；独我紫霞，采东来先天朝气，初发若涓涓细流若有若无，蓄极如太岳崩云绵绵不绝，铺天盖地而无隙可寻』——凝神，引混元入紫府！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_22', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_22: {
    id: 'scene_hsq17_22',
    title: '第二十二幕 · 周天运行化紫气',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    mandatory: true,
    beats: [
      N('你依诀抱元守一，原本厚重沉凝的混元真气在先天太岳心法催动下骤然蜕变！一股温润如玉却又沛然莫御的暖流自膻中、气海轰然贯通奇经八脉！'),
      N('转瞬之间，你的面庞隐隐浮现出一层庄严瑰丽的淡淡紫气，连呼吸吐纳间都带着风雷隐隐之声，周身劲气生生不息、倍增于前！'),
      S('NPC-0202', '（惊喜低呼）“紫气盈面！{gender:师弟|师妹}一朝贯通先天周天，竟直接踏入了紫霞初成之境！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_23', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_23: {
    id: 'scene_hsq17_23',
    title: '第二十三幕 · 恭请镇派紫霞剑',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    mandatory: true,
    beats: [
      N('岳沧溟欣慰吐出一口浊气，示意高沧云自祖师神龛上方取下那柄唯有历代掌门临大敌时方才动用的古剑——剑鞘紫檀嵌玉，吞口铸太岳云雷纹！'),
      S('NPC-0118', '“段延庆手中精钢铁杖百炼不摧，寻常青钢剑触之即折。唯有我派镇山神兵『太岳紫霞长剑』，方能承载紫霞先天剑气，破他铁杖指力！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_24', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_24: {
    id: 'scene_hsq17_24',
    title: '第二十四幕 · 神剑托命护西岳',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    illustrationUrl: '/assets/quests/hs_q17_sword_bestow.jpg',
    illustrationCaption: '神剑托命 · 周天紫气大成，掌门亲授镇派神兵太岳紫霞长剑',
    mandatory: true,
    beats: [
      N('岳沧溟双手捧起「太岳紫霞长剑」，郑重托付于你掌心！长剑入手微沉，剑脊隐泛一抹澄澈紫芒，与你体内奔涌的紫霞真气一触即鸣，发出龙吟般的清越颤音！'),
      S('NPC-0118', '“今日起，这柄『太岳紫霞长剑』便归你执掌！去吧——替老夫、替华山列祖列宗，把殿外那群魑魅魍魉统统扫下玉女峰！”'),
      P('（拔剑寸许，紫芒映彻大殿）“师父安心调息！有弟子执此剑在，便是天王老子也休想踏进紫霞殿半步！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_25', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_25: {
    id: 'scene_hsq17_25',
    title: '第二十五幕 · 整备神兵待破门',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿内',
    mandatory: true,
    beats: [
      N('殿外云中鹤尖利的笑声已然传来——他趁东峰夜雾虚晃一招脱离封不弃缠斗，飞掠来与段延庆汇合，正举起镔铁钢爪猛刨包铜殿门！'),
      N('你握紧太岳紫霞长剑，体内紫霞神功运转如意，随时可推门而出迎战群魔！'),
    ],
    choices: [
      {
        id: 'hsq17_c25_receive_zixia',
        label: '领受《紫霞神功》与「太岳紫霞长剑」，准备推门决战！（可先披挂神剑）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-030', level: 1, autoEquip: true },
          { type: 'addArtExp', artId: 'MA-030', amount: 450 },
          { type: 'giveItem', itemId: 'WPN-017', qty: 1 },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          setStep(HUASHAN_Q17_QUEST_ID, 'q17_zixia_breakout'),
          toast(
            '已习得天阶绝学《紫霞神功（先天太岳卷）》并获赐【太岳紫霞长剑】！可先在菜单装备神剑，再点击推门迎战！',
            'success',
            '紫霞传薪',
          ),
        ],
      },
    ],
  },

  scene_hsq17_26: {
    id: 'scene_hsq17_26',
    title: '第二十六幕 · 抽闩推门紫气生',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿门内',
    mandatory: true,
    beats: [
      N('高沧云与两名执事弟子依你号令同时抽开三道玄铁横闩！殿外云中鹤正高举一对精钢鹤爪凌空扑向殿门，口中怪笑道：“老道士们缩在龟壳里等死吧！”'),
      P('“找死的是你！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_27', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_27: {
    id: 'scene_hsq17_27',
    title: '第二十七幕 · 紫虹破门慑群凶',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    illustrationUrl: '/assets/quests/hs_q17_purple_rainbow.jpg',
    illustrationCaption: '紫虹破门 · 面泛紫霞推殿而出，十丈剑气瞬间斩断云中鹤钢爪',
    mandatory: true,
    beats: [
      N('“轰——！！”两扇千斤包铜楠木巨门被你鼓荡紫霞真气一掌震开！黑沉沉的寒夜之中，只见你面泛瑰丽紫霞，手中太岳紫霞长剑吞吐出十丈璀璨紫虹，堂皇剑压瞬间笼罩整座白玉丹墀！'),
      S(SPEAKER_DUAN_YANQING, '（死鱼般的双目蓦地剧烈一缩，腹语惊喝）“先天紫霞气？！老四快退，岳沧溟把紫霞真卷传给他了！”'),
      S('NPC-0182', '（身在半空收势不及，硬着头皮挥舞双爪抓落）“什么紫霞青霞，先吃鹤爷一爪！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_28', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_28: {
    id: 'scene_hsq17_28',
    title: '第二十八幕 · 先试紫锋战恶鹤',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('云中鹤轻功虽快，在你充盈周身的紫霞气机锁定之下却无所遁形！你提剑踏步，迎着漫天爪影正面劈去！'),
    ],
    choices: [
      {
        id: 'hsq17_c28_fight_yun',
        label: '催动《紫霞神功》加持太岳剑气，迎斩「穷凶极恶」云中鹤！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q17_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0182',
              talkOverride: '“好烫手的紫色剑气！莫非真能削断鹤爷的玄铁钢爪不成？！”',
            },
            rule: 'duel',
            forbidEscapeReason: '紫霞主殿门前决战，岂容淫贼放肆！',
            introText: '【紫虹斩爪】以初成《紫霞神功》迎战四大恶人老四云中鹤（一流中品），斩碎其镔铁钢爪！',
            onWin: [openScene('scene_hsq17_29', HUASHAN_Q17_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq17_29: {
    id: 'scene_hsq17_29',
    title: '第二十九幕 · 削铁如泥断双爪',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('“锵啷——！！”太岳紫霞长剑挟先天紫气正面斩过，云中鹤赖以成名的一对镔铁钢爪竟如朽木般被齐腕削成四截！剑气余波扫中其胸肋，震得他惨嚎一声喷血滚落石阶，被重伤的岳老三一把拽住后领拖开！'),
      S('NPC-0182', '（捧着鲜血淋漓的双手魂飞魄散）“我的爪子！这小子的剑气邪门至极！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_30', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_30: {
    id: 'scene_hsq17_30',
    title: '第三十幕 · 恶首踏拐逼丹墀',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('全场一品堂死士噤若寒蝉！唯独站在丹墀正中的「恶贯满盈」段延庆缓缓上前两步，双腿残废的他全凭两根细长精钢铁杖撑地，青袍无风自动，一股宗师中品的恐怖威压如乌云盖顶般向你碾来！'),
      S(SPEAKER_DUAN_YANQING, '“（腹语低沉）短短半个时辰便能将紫霞神功催出十丈剑芒，华山气宗倒真出了个人物。可惜——初成紫霞，火候未老，在老夫一阳指下终究难逃一死！”'),
      P('（长剑斜指，紫气自眉心流转不息）“段延庆，你伤我恩师之仇，这一剑我连本带利讨回来！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_31', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_31: {
    id: 'scene_hsq17_31',
    title: '第三十一幕 · 紫霞对决一阳指',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('段延庆左拐一点白玉石阶，整个人如苍鹰搏兔凌空扑起，右手铁杖尖端凝起一点赤金纯阳指芒，以指代剑直取你眉心祖窍！你催动十成《紫霞神功》，太岳紫霞长剑化作漫天紫霞光幕迎头痛击！'),
    ],
    choices: [
      {
        id: 'hsq17_c31_boss_duan',
        label: '全力催动天阶《紫霞神功》，在恶首段延庆手下硬撑三合震飞其铁杖！',
        subLabel: '宗师三合破局 · 恶贯满盈段延庆（宗师中品 · 撑满 3 回合即胜）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q17_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-1053' },
            rule: 'survive_rounds',
            maxRounds: 3,
            forbidEscapeReason: '身后便是掌门与百名华山同门，唯有力撑三合震退恶首方能定鼎乾坤！',
            introText: '【硬撼恶首】在紫霞主殿丹墀迎战四大恶人之首段延庆（宗师中品），以先天紫霞气撑满三回合破其一阳指铁杖！',
            onWin: [openScene('scene_hsq17_32', HUASHAN_Q17_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq17_32: {
    id: 'scene_hsq17_32',
    title: '第三十二幕 · 紫霞激荡震铁杖',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    illustrationUrl: '/assets/quests/hs_q17_duan_staff_fly.jpg',
    illustrationCaption: '硬撼恶首 · 紫霞剑气激斗震飞段延庆铁杖，一品堂溃逃下山',
    mandatory: true,
    beats: [
      N('紫芒与金指在雪夜丹墀上疯狂碰撞！起初段延庆指力刚猛霸道占尽上风，岂料你体内《紫霞神功》越战越盛、绵绵无尽，硬撑三合借势反震，三道凝若实质的紫霞剑气轰然叠成《太岳三青峰》绝杀一击！'),
      N('“当——！！”震耳欲聋的巨响声中，段延庆虎口鲜血迸溅，右手那根无坚不摧的寒铁拐杖竟被你一剑硬生生震飞上天，打着旋儿斜插进三丈外的青石兽首之中！'),
      S(SPEAKER_DUAN_YANQING, '（仅凭单拐连退七步，喉头一甜溢出一丝血迹，腹语骇然）“好霸道的先天紫霞气……绵绵若存、后劲无穷！点子扎手！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_33', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_33: {
    id: 'scene_hsq17_33',
    title: '第三十三幕 · 四老合围恶客遁',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿外院',
    mandatory: true,
    beats: [
      N('恰在此时，东峰方向剑啸冲霄——宁清羽与封不弃已联手刺伤叶二娘左臂杀回主殿；山道下方秦烈山更提着滴血长剑杀散死士后队疾驰登峰！'),
      S('NPC-0233', '（捂着淌血的肩膀冲入外院急喊）“老大快走！华山那几个老剑客全合围过来了！”'),
      N('段延庆内力一吸拔回铁杖，深知大势已去，冷冷盯了你一眼，喉间不张却滚出森寒腹语：“小辈，今日老夫记下你的紫霞剑了！老二、老三、老四，撤！”四大恶人借着夜色翻下西侧悬崖，残余一品堂死士顿时兵败如山倒，哭爹喊娘滚下苍龙岭逃命而去！'),
    ],
    onFinishEffects: [openScene('scene_hsq17_34', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_34: {
    id: 'scene_hsq17_34',
    title: '第三十四幕 · 四宿齐聚赞麒麟',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿丹墀',
    mandatory: true,
    beats: [
      N('硝烟渐散，秦烈山、宁清羽、封不弃三人疾步赶至丹墀，见云中鹤断落一地的钢爪残片与石兽上深逾三寸的铁杖插痕，再望向手持太岳紫霞长剑、面泛紫霞傲立阶前的你，无不震惊动容！'),
      S('NPC-0147', '（倒吸一口凉气，随即抚须朗声大笑）“好小子！初得紫霞便能二十合震飞段延庆的铁杖——岳师弟这一手传薪托命，当真为我华山托出了一位少年宗师！”'),
      S('NPC-0166', '“先救治伤员！掌门师兄在殿内听见这一场大捷，心脉淤血也能松快三分了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_35', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_35: {
    id: 'scene_hsq17_35',
    title: '第三十五幕 · 东来紫气照苍山',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('东方天际终于破晓，万丈红日跃出关中云海，将漫天朝霞染作一片浩瀚庄严的紫金之色，映照在历经血火洗礼却巍然不倒的玉女峰紫霞道观之上。'),
      S('NPC-0118', '（在宁清羽搀扶下步出殿门，欣慰地望向你）“西岳经此血夜而不坠，紫霞神功终得真正传人！然没藏讹庞大军仍在陕北虎视眈眈，待老夫闭关疗伤数日，我华山与西夏一品堂的总账，终须彻底清算！”'),
    ],
    onFinishEffects: [openScene('scene_hsq17_36', HUASHAN_Q17_QUEST_ID)],
  },

  scene_hsq17_36: {
    id: 'scene_hsq17_36',
    title: '第三十六幕 · 紫霞传薪镇太岳',
    subtitle: '玉女峰紫霞道观 · 殿前观云栏',
    mandatory: true,
    beats: [
      P('“师父放心静养！有弟子手中太岳紫霞剑与诸位师叔伯同守山门，西岳剑威必将震烁天下！”'),
      N('满山华山弟子迎着朝阳紫气齐齐举剑欢呼，声震秦川万里！'),
    ],
    choices: [
      {
        id: 'hsq17_c36_complete',
        label: '收起太岳紫霞长剑，稳固天阶《紫霞神功》周天修为',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 300, reason: '击退四大恶人与五百一品堂死士护派首功厚赏' },
          { type: 'addSectContribution', amount: 200 },
          { type: 'giveCombatExp', amount: 420, reason: '紫虹斩云中鹤钢爪、二十合震飞段延庆铁杖' },
          { type: 'modifyChivalry', delta: 30, reason: '血夜力挽狂澜护住华山百余名同门性命' },
          { type: 'modifyRenown', delta: 65, reason: '紫霞初成正面击退四大恶人之首段延庆，威震天下' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0118' }, delta: 25 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0166' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 15 },
          { type: 'completeQuest', questId: HUASHAN_Q17_QUEST_ID, outcome: 'zixia_awakened' },
          toast(
            '《血染玉女 · 紫霞传薪》圆满完成！天阶《紫霞神功》与神兵【太岳紫霞长剑】已尽归执掌！',
            'success',
            '紫霞大成',
          ),
        ],
      },
    ],
  },
}
