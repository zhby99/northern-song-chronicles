import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, toast } from '../../../engine/quest/dsl'
import { JINJUN_MURONG_ARC_2_ID } from './jinjunMurongArc2Quest'

const SCENE_01: StorySceneDef = {
  id: 'scene_jj_mr2_01_songshan_arrival',
  title: '第一幕 · 兵抵嵩岳',
  subtitle: '嵩山少室山麓 · 暮秋晓雾',
  mandatory: true,
  beats: [
    N('星夜兼程数百里，一千披坚执锐的殿前司禁军终于在破晓时分抵达嵩山少室山麓。连绵秋雨方歇，山间白雾缭绕，山道上却隐隐传来上方钟鼓齐鸣与群雄喧嚣之声。'),
    P('（勒马遥望云雾深处的少林山门，对副将沉声传令）“全军下马卸铃，步人甲与神臂弩手分作三路，沿东西两侧密林悄然合围少室山各处险隘！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_02_scout_report', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_02: StorySceneDef = {
  id: 'scene_jj_mr2_02_scout_report',
  title: '第二幕 · 山顶群雄聚',
  subtitle: '嵩山少林寺 · 山道密林',
  mandatory: true,
  beats: [
    N('前出打探的夜不收斥候飞奔回报，单膝跪于马前：'),
    S({ name: '夜不收斥候', title: '殿前司斥候校尉', factionName: '大宋禁军' }, '“禀都虞候！少室山顶此刻已聚齐少林、丐帮、五岳、荆襄等天下数十路豪杰！那姑苏慕容复正站在大雄宝殿前高台之上侃侃而谈，借武林风波极力笼络人心，似要借今日之势染指武林盟主之位！”'),
    P('（冷笑一声）“盗窃我大宋破辽神臂弓、杀害军器监武官，还敢在此妄图号令中原群雄？真当我大宋朝廷无人么！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_03_monk_gate', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_03: StorySceneDef = {
  id: 'scene_jj_mr2_03_monk_gate',
  title: '第三幕 · 山门验旨',
  subtitle: '嵩山少林寺 · 知客山门',
  mandatory: true,
  beats: [
    N('少林戒律院护寺武僧见山下黑压压一片甲士逼近，顿时大惊敲响警钟，数十名手持齐眉棍的武僧急步拦在山门石阶前。'),
    S({ name: '少林知客僧', title: '少林寺知客执事', factionName: '嵩山少林寺' }, '“阿弥陀佛！今日乃天下武林聚会之地，朝廷甲士何故擅闯清净禅林？”'),
    P('（翻身下马，高举枢密院鎏金海捕钧旨，肃然拱手）“本官大宋殿前司三衙都虞候！今奉官家与枢密院海捕钧旨，特来拿办盗窃军国重器、图谋大逆之钦犯慕容复！此乃朝廷公事，还请大师速速通禀玄慈方丈，莫教误会生乱！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_04_seal_mountain', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_04: StorySceneDef = {
  id: 'scene_jj_mr2_04_seal_mountain',
  title: '第四幕 · 步人甲封山',
  subtitle: '嵩山少林寺 · 钟鼓禅院外围',
  mandatory: true,
  beats: [
    N('你令前锋两百名铁甲禁军原地待命，余下八百精锐则依托少室山险要石壁呈半月形展开：前排五尺长枪如林密布，后排三百张大宋神臂强弩悉数上弦，森冷箭簇直指禅院广场！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_05_xuan_ci_consent', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_05: StorySceneDef = {
  id: 'scene_jj_mr2_05_xuan_ci_consent',
  title: '第五幕 · 禅院鼓噪',
  subtitle: '嵩山少林寺 · 钟鼓禅院演武坪',
  mandatory: true,
  beats: [
    N('大军沉重整齐的铁甲步履震得山石微颤，院内原本喧闹的群雄纷纷停下交谈惊疑张望。端坐主位的少林方丈玄慈面色微凝，合十起身望向山门方向。'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_06_iron_encirclement', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_06: StorySceneDef = {
  id: 'scene_jj_mr2_06_iron_encirclement',
  title: '第六幕 · 黑云压禅林',
  subtitle: '嵩山少林寺 · 铁甲合围',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc2_shaolin_encircle.jpg',
  illustrationCaption: '少室山巅 · 一千大宋禁军铁甲列阵围禅林',
  beats: [
    N('骤然间山道轰鸣、马蹄震地，一千大宋禁军如黑云压城般列阵封山！步人甲寒光凛冽，长枪如林，赤红金边的大宋龙旗在少室山秋风中猎猎作响，肃杀之气瞬间压过满场江湖豪客的喧嚣！'),
    P('（传令停鼓，独自整衣按刀，踏着沉稳的步履步入大雄宝殿广场）“大宋禁军奉旨办案，无关人等退避三舍！”'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_2_ID, stepId: 'shaolin_confront_murong' },
    toast('千军已合围少室山！请前往【大雄正殿（sl_daxiong_main）】当众宣读海捕文书，力擒慕容复！'),
  ],
}

const SCENE_07: StorySceneDef = {
  id: 'scene_jj_mr2_07_enter_arena',
  title: '第七幕 · 按刀入场',
  subtitle: '嵩山少林寺 · 大雄正殿前',
  mandatory: true,
  beats: [
    N('在数千道惊骇目光的注视下，你步履如山踏入广场中央。高台之上，身着淡黄锦袍、风度翩翩的姑苏慕容复正手持折扇，见你率官军杀气腾腾而来，眼中闪过一丝不易察觉的阴沉。'),
    S('NPC-0112', '（少林方丈玄慈合十施礼）“阿弥陀佛！原是殿前司三衙都虞候大驾光临，不知今日千军围山，究竟所为何事？”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_08_read_warrant', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_08: StorySceneDef = {
  id: 'scene_jj_mr2_08_read_warrant',
  title: '第八幕 · 宣读海捕文书',
  subtitle: '嵩山少林寺 · 大雄正殿前',
  mandatory: true,
  beats: [
    P('（展开明黄鎏金枢密院海捕文书，声若洪钟响彻少室山巅）“奉天子御旨、枢密院钧令：姑苏慕容氏，世受国恩而不思报效，反敢买通汴京军器监胥吏，刺杀值守武官，盗窃我大宋破辽神臂弓总图、样弩与火药箭秘方，运往江南私造甲兵，图谋复辟大燕！”'),
    N('语毕，你高举军器监周胥吏画押供词、太湖苏绣帕子与汴河码头搜出之慕容氏密信！铁证如山，字字诛心！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_09_heroes_uproar', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_09: StorySceneDef = {
  id: 'scene_jj_mr2_09_heroes_uproar',
  title: '第九幕 · 群雄哗然',
  subtitle: '嵩山少林寺 · 广场',
  mandatory: true,
  beats: [
    N('满场天下豪杰闻言顿时炸开了锅！原本还围在慕容复身旁附和吹捧的数十名江湖好汉，此刻如同避瘟神般齐齐向后退开数丈！'),
    S({ name: '中原群雄', title: '各路武林豪客', factionName: '中原武林' }, '“什么？！盗窃破辽神臂弓？！咱们大宋武林虽行江湖之事，岂能与通敌谋逆、毁我大宋抗辽利器之辈为伍！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_10_murong_fu_cornered', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_10: StorySceneDef = {
  id: 'scene_jj_mr2_10_murong_fu_cornered',
  title: '第十幕 · 慕容复困兽',
  subtitle: '嵩山少林寺 · 高台',
  mandatory: true,
  beats: [
    N('慕容复脸色铁青如纸，双拳在袖中捏得咯咯作响。他深知今日物证俱在、众叛亲离，若不斩杀眼前这名朝廷命官突围而去，姑苏慕容氏百年清誉与复国大业便将彻底付诸东流！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_11_draw_sword', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_11: StorySceneDef = {
  id: 'scene_jj_mr2_11_draw_sword',
  title: '第十一幕 · 拔剑斥鹰犬',
  subtitle: '嵩山少林寺 · 大雄正殿前',
  mandatory: true,
  beats: [
    S('NPC-0120', '（慕容复骤然甩开折扇，腰间长剑如龙吟般呛啷出鞘，剑尖直指你咽喉，声音森寒）“朝廷鹰犬，也敢妄断我大燕兴衰！今日少室山前，便叫你见识见识姑苏慕容氏的绝学！”'),
    P('（冷喝一声，横兵迎上）“乱臣贼子，死到临头还敢狂吠！纳命来！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_12_douzhuan_clash', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_12: StorySceneDef = {
  id: 'scene_jj_mr2_12_douzhuan_clash',
  title: '第十二幕 · 斗转星移现',
  subtitle: '嵩山少林寺 · 生死台',
  mandatory: true,
  beats: [
    N('剑光如雪，气浪翻飞！慕容复不愧“南慕容”之名，一出手便施展出百家武学与《斗转星移》卸力反震之法，将你数记重招巧妙牵引偏斜！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_13_battlefield_grit', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_13: StorySceneDef = {
  id: 'scene_jj_mr2_13_battlefield_grit',
  title: '第十三幕 · 沙场杀伐气',
  subtitle: '嵩山少林寺 · 激斗中',
  mandatory: true,
  beats: [
    N('然而你历经汴梁血战与太行/沙场生死淬炼，杀伐决断之气远非养尊处优的江南世家公子可比！任凭他招式花哨繁复，你只以千锤百炼的实战沉稳步步紧逼，逼得慕容复连连倒退！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_14_murong_fu_duel', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_14: StorySceneDef = {
  id: 'scene_jj_mr2_14_murong_fu_duel',
  title: '第十四幕 · 寺前败慕容',
  subtitle: '嵩山少林寺 · 生死决战（1v1 宗师下品）',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc2_murongfu_duel.jpg',
  illustrationCaption: '少室山大雄殿前 · 破斗转星移斩断慕容复佩剑',
  beats: [
    N('两人周身真气激荡，广场青石砖寸寸龟裂！慕容复怒吼一声催动十成《斗转星移》剑幕罩来，正是彻底破敌擒贼之机！'),
  ],
  choices: [
    {
      id: 'jjmr2_vs_murongfu',
      label: '生死决战！正面击溃「南慕容」慕容复（1v1 宗师下品）',
      subLabel: '硬仗预警：对手为宗师下品慕容复（败北可重整再战）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_2_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0120',
            talkOverride: '“我大燕复兴大业岂能折在你这朝廷鹰犬手里！接我斗转星移！”',
          },
          rule: 'story_trial',
          forbidEscapeReason: '千名禁军与天下英雄环立观战，岂可临阵退缩！',
          introText: '【1v1 少室生死战】迎战宗师下品【姑苏慕容 · 慕容复】！',
          onWin: [openScene('scene_jj_mr2_15_broken_sword', JINJUN_MURONG_ARC_2_ID)],
          onLose: [toast('慕容复斗转星移神妙莫测，且退后重整内息再战！')],
        },
      ],
    },
  ],
}

const SCENE_15: StorySceneDef = {
  id: 'scene_jj_mr2_15_broken_sword',
  title: '第十五幕 · 剑断人重伤',
  subtitle: '嵩山少林寺 · 广场',
  mandatory: true,
  beats: [
    N('一声清脆金铁爆鸣震彻禅林！你看准《斗转星移》气机转换的刹那空隙，浑厚内劲直透兵刃，一招震断慕容复手中三尺青锋！余劲透胸而入，慕容复闷哼一声呕血倒飞，重重砸落青石阶下，挣扎不得！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_16_order_arrest', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_16: StorySceneDef = {
  id: 'scene_jj_mr2_16_order_arrest',
  title: '第十六幕 · 刀斧锁钦犯',
  subtitle: '嵩山少林寺 · 广场',
  mandatory: true,
  beats: [
    P('（收兵而立，冷眼俯瞰阶下狼狈吐血的慕容复，抬手挥令）“刀斧手上前！以精铁锁链穿了慕容复琵琶骨，押入囚车！”'),
    N('十余名魁梧禁军刀斧手应声齐上，手中铁链哗啦作响，眼看便要将“南慕容”当场锁拿——'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_17_chilling_wind', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_17: StorySceneDef = {
  id: 'scene_jj_mr2_17_chilling_wind',
  title: '第十七幕 · 角落寒风起',
  subtitle: '嵩山少林寺 · 禅院阴影',
  mandatory: true,
  beats: [
    N('骤然间！一股宛若深渊寒冰、却又霸道无匹的宗师绝顶气机自人群边缘炸开！冲在最前的四名禁军刀斧手甚至未看清来人身影，便如遭无形巨锤轰击般齐齐倒飞出去，昏死在地！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_18_grey_monk_shadow', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_18: StorySceneDef = {
  id: 'scene_jj_mr2_18_grey_monk_shadow',
  title: '第十八幕 · 灰衣老僧',
  subtitle: '嵩山少林寺 · 广场中央',
  mandatory: true,
  beats: [
    N('尘烟微散，一名身披洗得发白的破旧灰布僧袍、面容枯槁毫无起眼的老僧，不知何时已鬼魅般立于慕容复身前！'),
    S('NPC-0112', '（玄慈方丈失声惊呼，脸色剧变）“这……这位老施主究竟是何方神圣？潜藏我少林藏经阁三十载……”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_19_murong_bo_emerge', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_19: StorySceneDef = {
  id: 'scene_jj_mr2_19_murong_bo_emerge',
  title: '第十九幕 · 参合指破空',
  subtitle: '嵩山少林寺 · 宗师上品现身',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc2_murongbo_emerge.jpg',
  illustrationCaption: '少林禅院惊变 · 潜伏三十载的灰衣老僧慕容博鬼魅掠出',
  beats: [
    N('那灰衣老僧——正是假死潜伏少林藏经阁三十载、图谋搅乱天下风云的慕容老祖【慕容博】！他根本不屑半句废话，枯瘦右袖微微一振，数缕无声无息却锐利洞金的“参合指力”已破空直取你心脉！'),
    P('（浑身汗毛倒竖，生死一线间暴喝迎上）“休想劫囚！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_20_unmatched_realm', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_20: StorySceneDef = {
  id: 'scene_jj_mr2_20_unmatched_realm',
  title: '第二十幕 · 宗师上品威压',
  subtitle: '嵩山少林寺 · 生死交锋',
  mandatory: true,
  beats: [
    N('甫一接招，你便觉五脏六腑如遭山岳碾压！浸淫武道数十载的宗师上品高手，其内力之雄浑、指劲之精微，远超方才的慕容复何止数倍！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_21_grit_teeth_stand', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_21: StorySceneDef = {
  id: 'scene_jj_mr2_21_grit_teeth_stand',
  title: '第二十一幕 · 死战不退',
  subtitle: '嵩山少林寺 · 血战宗师',
  mandatory: true,
  beats: [
    N('然而身后便是大宋龙旗与千名禁军将士，岂能在此折了朝廷锐气？！你咬碎钢牙，将全身功力催谷至十成十，哪怕虎口崩裂、鲜血顺着臂甲淌落，依旧死战不退！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_22_three_rounds_survive', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_22: StorySceneDef = {
  id: 'scene_jj_mr2_22_three_rounds_survive',
  title: '第二十二幕 · 硬接三轮绝杀',
  subtitle: '嵩山少林寺 · 撑满三回合（宗师上品）',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc2_three_rounds_blood.jpg',
  illustrationCaption: '死战宗师上品慕容博 · 硬接三轮参合指绝杀',
  beats: [
    N('慕容博眼中闪过一丝厉色，袍袖鼓荡连环点出绝世参合指！面对这等绝顶宗师，只要撑过其三轮凌厉攻势，外围禁军强弩与少林高僧便能合围救援！'),
  ],
  choices: [
    {
      id: 'jjmr2_survive_murongbo',
      label: '死战不退！硬接宗师上品慕容博三轮绝杀（撑满 3 回合）',
      subLabel: '极限考验：于宗师上品慕容博手下撑满 3 个回合（未撑满将触发重伤再试）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: JINJUN_MURONG_ARC_2_ID,
          opponent: {
            kind: 'npc',
            npcId: 'NPC-0104',
            talkOverride: '“能擒住复儿，你倒也算个人物！接老夫三记参合指不死，再谈阻拦！”',
          },
          rule: 'survive_rounds',
          maxRounds: 3,
          forbidEscapeReason: '身系千军主帅之责，必须拖住慕容博为大军争取合围之机！',
          introText: '【3回合极限死守】迎战宗师上品【慕容博】，死战不退撑满 3 个回合！',
          onWin: [openScene('scene_jj_mr2_23_mirror_shattered', JINJUN_MURONG_ARC_2_ID)],
          onDraw: [openScene('scene_jj_mr2_23_mirror_shattered', JINJUN_MURONG_ARC_2_ID)],
          onLose: [toast('参合指力太过霸道！且调息服药后再行死战撑过三合！')],
        },
      ],
    },
  ],
}

const SCENE_23: StorySceneDef = {
  id: 'scene_jj_mr2_23_mirror_shattered',
  title: '第二十三幕 · 震碎护心镜',
  subtitle: '嵩山少林寺 · 呕血倒飞',
  mandatory: true,
  beats: [
    N('“咔嚓”一声脆响！硬生生接下慕容博凌厉无匹的三轮绝杀后，终因境界悬殊，一记凝练到极致的参合指力透兵震入胸膛——精钢护心镜瞬间四分五裂，你喷出一口鲜血倒飞而出，重重摔在石阶之下，身受沉重内伤！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_24_monks_and_arrows', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_24: StorySceneDef = {
  id: 'scene_jj_mr2_24_monks_and_arrows',
  title: '第二十四幕 · 高僧结阵 · 万弩齐发',
  subtitle: '嵩山少林寺 · 突围混战',
  mandatory: true,
  beats: [
    N('慕容博目露杀机正欲痛下杀手，少林玄慈方丈与诸位玄字辈高僧齐齐抢出结成罗汉大阵硬挡在身前；与此同时，外围一千禁军眼见主帅受创，怒吼声中三百张神臂强弩齐发，黑压压的箭雨铺天盖地攒射而来！'),
    S('NPC-0104', '（慕容博见少林高僧拼死拦阻、千军箭雨势不可当，不敢恋战，一把抓起地上的慕容复）“好个硬骨头的宋廷军官！今日之账，老夫记下了！”'),
    N('话音未落，慕容博施展绝顶轻功踏树梢而起，瞬间带着慕容复翻入嵩山深处密林远遁无踪！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_25_xuanci_pill', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_25: StorySceneDef = {
  id: 'scene_jj_mr2_25_xuanci_pill',
  title: '第二十五幕 · 少林大还丹',
  subtitle: '嵩山少林寺 · 方丈禅房',
  mandatory: true,
  beats: [
    N('战局暂歇，亲卫急忙将你抬入少林方丈院。你体内参合指劲如附骨之疽般乱窜，面色苍白如雪。玄慈方丈神色悲悯，亲手开启一只紫檀锦盒，取出一枚龙眼大小、药香扑鼻的金色丹丸送至你唇边：'),
    S('NPC-0112', '“阿弥陀佛！少侠以微末之躯硬撼那老魔头三记参合指而寸步不退，实乃忠勇义烈！这枚【少林九转大还丹】乃本寺镇寺灵药，快快服下，先护住心脉再班师回京调养罢！”'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 20 },
    { type: 'setQuestStep', questId: JINJUN_MURONG_ARC_2_ID, stepId: 'return_kaifeng_recover' },
    toast('玄慈方丈赠予【少林九转大还丹】！请护军班师返回【开封府 · 八十万禁军大教场帅台】复命养伤。'),
  ],
}

const SCENE_26: StorySceneDef = {
  id: 'scene_jj_mr2_26_return_kaifeng',
  title: '第二十六幕 · 班师回京',
  subtitle: '开封府 · 东京汴梁',
  mandatory: true,
  beats: [
    N('千名禁军护送着卧于软舆中的你星夜班师回返开封。朝廷闻报姑苏慕容氏竟敢公然抗旨、重伤朝廷三衙都虞候，上下震怒，天子当朝降旨，彻底将姑苏慕容氏定性为谋逆叛党，传檄江南诸路严密布防！'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_27_closed_door_healing', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_27: StorySceneDef = {
  id: 'scene_jj_mr2_27_closed_door_healing',
  title: '第二十七幕 · 闭门调息',
  subtitle: '开封府 · 都虞候府邸',
  mandatory: true,
  beats: [
    N('回到京城后，你暂卸繁务闭门休养，借着少林大还丹药力一点点化去体内残留的霸道参合指劲。每一次吐纳虽如刀割般剧痛，却也在生死边缘将你昔日武学根基打磨得愈发精纯凝实。'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_28_imperial_visit', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_28: StorySceneDef = {
  id: 'scene_jj_mr2_28_imperial_visit',
  title: '第二十八幕 · 圣躬亲临探望',
  subtitle: '开封府 · 府邸内堂',
  mandatory: true,
  beats: [
    N('这日午后秋阳融融，院外忽地传来轻车简从的仪仗声。未等下人通传，身着常服的今上宋仁宗赵祯竟在枢密使王德用的陪同下，亲自踏入你的养伤内堂！'),
    S('NPC-0001', '（宋仁宗见你挣扎欲起身行礼，连忙快步上前亲手按住你的肩头，眼中满是关切与赞许）“爱卿重伤在身，免礼免礼！少室山一役，朕已听随军将士细细奏报——面对潜伏三十载的逆贼宗师，爱卿宁折不弯、死战护旗，实乃我大宋百世之干城！”'),
  ],
  onFinishEffects: [openScene('scene_jj_mr2_29_bestow_taixuan', JINJUN_MURONG_ARC_2_ID)],
}

const SCENE_29: StorySceneDef = {
  id: 'scene_jj_mr2_29_bestow_taixuan',
  title: '第二十九幕 · 御赐宫中《太玄经》',
  subtitle: '开封府 · 病榻赐秘典',
  mandatory: true,
  illustrationUrl: '/assets/quests/murong_arc2_renzong_taixuan.jpg',
  illustrationCaption: '官家微服亲探 · 御赐大内秘藏天阶心法《太玄经》',
  beats: [
    S('NPC-0001', '（宋仁宗示意内侍捧上一卷以明黄龙纹锦缎包裹的古朴石刻拓本秘籍，温声道）“朕闻爱卿为参合指劲所伤，寻常吐纳一时难以破而后立。此卷乃大内秘库深藏的太古无上天阶内功——【太玄经】，今日朕亲手赐予爱卿！望爱卿安心参悟疗伤，待伤愈破境之日，再统三千铁甲南下太湖，替朕踏平燕子坞！”'),
    P('（热泪盈眶，于榻上俯首叩谢皇恩）“臣叩谢官家天恩！臣定竭尽全力参悟此经，伤愈之日必亲手踏平燕子坞，拿回神臂弓以报圣恩！”'),
  ],
  onFinishEffects: [
    { type: 'teachMartialArt', artId: 'MA-003', level: 1 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 20 },
    openScene('scene_jj_mr2_30_vow_southward', JINJUN_MURONG_ARC_2_ID),
  ],
}

const SCENE_30: StorySceneDef = {
  id: 'scene_jj_mr2_30_vow_southward',
  title: '第三十幕 · 破而后立待南征',
  subtitle: '开封府 · 闭关静室',
  mandatory: true,
  beats: [
    N('送别圣驾后，你展卷研读天阶心法《太玄经》，只觉经文中玄奥莫测的天地至理竟与体内残余指劲隐隐相融，伤势一日千里般迅速愈合！三十日后闭关出关之日，便是统兵三千南下平江府、血洗燕子坞之时！'),
  ],
  onFinishEffects: [
    { type: 'healPlayer', hpPct: 100, mpPct: 100 },
    { type: 'giveCombatExp', amount: 2600 },
    { type: 'modifyRenown', delta: 50 },
    { type: 'addSectContribution', amount: 180 },
    { type: 'completeQuest', questId: JINJUN_MURONG_ARC_2_ID, outcome: 'completed' },
    toast('《破燕 · 贰 · 少室惊变》完成！已获【少林九转大还丹】与宫中秘藏天阶心法【太玄经】！休养 30 日后可赴大教场开启第三部《血染太湖》！'),
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_jj_mr2_01_songshan_arrival: SCENE_01,
  scene_jj_mr2_02_scout_report: SCENE_02,
  scene_jj_mr2_03_monk_gate: SCENE_03,
  scene_jj_mr2_04_seal_mountain: SCENE_04,
  scene_jj_mr2_05_xuan_ci_consent: SCENE_05,
  scene_jj_mr2_06_iron_encirclement: SCENE_06,
  scene_jj_mr2_07_enter_arena: SCENE_07,
  scene_jj_mr2_08_read_warrant: SCENE_08,
  scene_jj_mr2_09_heroes_uproar: SCENE_09,
  scene_jj_mr2_10_murong_fu_cornered: SCENE_10,
  scene_jj_mr2_11_draw_sword: SCENE_11,
  scene_jj_mr2_12_douzhuan_clash: SCENE_12,
  scene_jj_mr2_13_battlefield_grit: SCENE_13,
  scene_jj_mr2_14_murong_fu_duel: SCENE_14,
  scene_jj_mr2_15_broken_sword: SCENE_15,
  scene_jj_mr2_16_order_arrest: SCENE_16,
  scene_jj_mr2_17_chilling_wind: SCENE_17,
  scene_jj_mr2_18_grey_monk_shadow: SCENE_18,
  scene_jj_mr2_19_murong_bo_emerge: SCENE_19,
  scene_jj_mr2_20_unmatched_realm: SCENE_20,
  scene_jj_mr2_21_grit_teeth_stand: SCENE_21,
  scene_jj_mr2_22_three_rounds_survive: SCENE_22,
  scene_jj_mr2_23_mirror_shattered: SCENE_23,
  scene_jj_mr2_24_monks_and_arrows: SCENE_24,
  scene_jj_mr2_25_xuanci_pill: SCENE_25,
  scene_jj_mr2_26_return_kaifeng: SCENE_26,
  scene_jj_mr2_27_closed_door_healing: SCENE_27,
  scene_jj_mr2_28_imperial_visit: SCENE_28,
  scene_jj_mr2_29_bestow_taixuan: SCENE_29,
  scene_jj_mr2_30_vow_southward: SCENE_30,
}
