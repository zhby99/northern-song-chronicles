import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { QUEST_ID } from './kaifengRenzongEscortQuest'

const CG_1_URL = '/assets/quests/renzong_weifu_market.jpg'

const CG_2_URL = '/assets/quests/renzong_pagoda_ambush.jpg'

const CG_3_URL = '/assets/quests/renzong_fanlou_assassins.jpg'

const CG_4_URL = '/assets/quests/renzong_hongqiao_blood.jpg'

const CG_5_URL = '/assets/quests/renzong_zichen_decree.jpg'

function buildPagodaBladeNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-RZ-TUOBA-XIAO',
    name: '拓跋枭',
    title: '西夏一品堂 · 飞檐先遣刀手',
    realm: '二流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    stats: { hp: 1550, mp: 1200, agi: 66, res: 42 },
    talents: { bone: 74, comprehension: 60, charm: 40 },
    fullLocationLabel: '开封府 > 大相国寺 > 资圣八角琉璃宝塔',
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-139', move1: 'MA-133' },
    learnedArts: [{ artId: 'MA-232', level: 4 }, { artId: 'MA-139', level: 4 }, { artId: 'MA-133', level: 4 }],
    equipped: { weapon: 'WPN-043', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    questBadgeLabel: '一品堂死士·壹',
    talk: '“赵家皇帝竟然只带一名带刀御前护卫便敢微服登塔？今日割下你们主仆首级，贺兰山下自封万户侯！”',
  })
}

function buildPagodaShadowNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-RZ-YELI-HANYA',
    name: '野利寒鸦',
    title: '西夏一品堂 · 断铃淬毒刺客',
    realm: '二流上品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    stats: { hp: 1380, mp: 1150, agi: 69, res: 38 },
    talents: { bone: 68, comprehension: 72, charm: 56 },
    fullLocationLabel: '开封府 > 大相国寺 > 资圣八角琉璃宝塔',
    equippedArts: { neigong: 'MA-232', qinggong: 'MA-139', move1: 'MA-133' },
    learnedArts: [{ artId: 'MA-232', level: 4 }, { artId: 'MA-139', level: 5 }, { artId: 'MA-133', level: 4 }],
    equipped: { weapon: 'WPN-043', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-022', accessory2: 'ACC-023', mount: 'MNT-013' },
    questBadgeLabel: '一品堂死士·贰',
    talk: '“风铃已断，塔下香客听不见半点金铁交鸣——宋廷护卫，你的轻功躲得开弯刀，躲得开我的飞星透骨针么！”',
  })
}

function buildFanlouCrimsonNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-RZ-WEIMING-CHIFENG',
    name: '嵬名赤锋',
    title: '西夏一品堂 · 红牌修罗斩使',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    stats: { hp: 1950, mp: 1550, agi: 71, res: 48 },
    talents: { bone: 80, comprehension: 68, charm: 48 },
    fullLocationLabel: '开封府 > 樊楼 > 三层五楼飞桥雅阁',
    equippedArts: { neigong: 'MA-245', move1: 'MA-073', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-245', level: 5 }, { artId: 'MA-073', level: 5 }, { artId: 'MA-133', level: 5 }],
    equipped: { weapon: 'WPN-034', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-010' },
    questBadgeLabel: '一品堂红牌·壹',
    talk: '“好一双识破羊脂刀油的利眼！只可惜火警已诱走东坊巡兵，今夜樊楼飞桥之上，便是你与赵祯君臣同归黄泉之地！”',
  })
}

function buildFanlouPalmNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-RZ-MOZANG-XUEYING',
    name: '没藏血影',
    title: '西夏一品堂 · 碎屏催心煞手',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    stats: { hp: 1760, mp: 1500, agi: 74, res: 45 },
    talents: { bone: 74, comprehension: 78, charm: 60 },
    fullLocationLabel: '开封府 > 樊楼 > 三层五楼飞桥雅阁',
    equippedArts: { neigong: 'MA-081', move1: 'MA-086', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-081', level: 5 }, { artId: 'MA-086', level: 5 }, { artId: 'MA-133', level: 5 }],
    equipped: { weapon: 'WPN-033', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-010' },
    questBadgeLabel: '一品堂红牌·贰',
    talk: '“你护得了天子一时，护得了整夜风刀霜剑？吃我一记毒砂催心掌，看你左臂旧创还敢不敢挥刀！”',
  })
}

function buildHongqiaoWolfLeaderNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-RZ-HELAN-DUANYUE',
    name: '贺兰断岳',
    title: '西夏一品堂 · 银狼左统领',
    realm: '一流中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    stats: { hp: 2380, mp: 1950, agi: 74, res: 54 },
    talents: { bone: 86, comprehension: 72, charm: 46 },
    fullLocationLabel: '开封府 > 汴河虹桥 · 临水酒肆',
    equippedArts: { neigong: 'MA-245', move1: 'MA-073', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-245', level: 6 }, { artId: 'MA-073', level: 6 }, { artId: 'MA-133', level: 6 }],
    equipped: { weapon: 'WPN-033', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-010' },
    questBadgeLabel: '银狼统领·左',
    talk: '“连斩我四名精锐，却还撑着断袖残血死守虹桥？算条汉子！只可惜禁军火把尚在三里之外，过得了我们兄弟双狼再谈生还！”',
  })
}

function buildHongqiaoWolfSecondNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'CUSTOM-RZ-LI-POJUN',
    name: '李破军',
    title: '西夏一品堂 · 银狼右统领',
    realm: '一流中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    stats: { hp: 2180, mp: 1850, agi: 76, res: 50 },
    talents: { bone: 82, comprehension: 76, charm: 50 },
    fullLocationLabel: '开封府 > 汴河虹桥 · 临水酒肆',
    equippedArts: { neigong: 'MA-245', move1: 'MA-086', move2: 'MA-073' },
    learnedArts: [{ artId: 'MA-245', level: 6 }, { artId: 'MA-086', level: 6 }, { artId: 'MA-073', level: 6 }],
    equipped: { weapon: 'WPN-034', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-010' },
    questBadgeLabel: '银狼统领·右',
    talk: '“别废话了！贺兰大哥封左翼，我斩右胁，三息之内必令他倒在这座雨夜虹桥之上，把赵宋江山彻底掀个底朝天！”',
  })
}

const SCENE_36B_STAY_KAIFENG_REWARD: StorySceneDef = {
  id: 'scene_rz_36b_stay_kaifeng_reward',
  title: '第三十六幕 · 孤本秘匣映丹心',
  subtitle: '大内皇宫 · 垂拱紫宸正殿（终幕·乙）',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '紫宸晓日 · 御赐大内葵花秘卷与白银千两',
  beats: [
    N('内侍捧上一只沉香紫檀嵌金玉匣，匣面明黄锦袱甫一掀开，一册朱砂描边、以皇室双龙纹锦囊裹护的残卷静静躺卧其中，纸页虽历经岁序微泛淡黄，字迹行气间却似有电光隐隐流转；另一侧四只内库银盘内，二十锭各重五十两的十足官铸元宝码得齐齐整整，晨光下银辉闪烁，足足一千两纹银。'),
    S('NPC-0001', '“这卷《葵花残卷（大内秘藏前本）》乃当年大内秘库收罗的前代奇人手札，身法剑意诡绝灵动，虽只是前部残卷，却并无后世旁门流弊。朕知你常年在开封府与六扇门办案、孤身涉险无数，故将此秘匣与白银一千两一并赐下——愿你此后行侠仗义、追凶缉盗之际，多一分自保神通，亦莫忘今日紫宸殿前这一念赤诚。”'),
    S('NPC-0013', '（黑面微舒，肃然向少侠长揖半礼）“有圣上此般知遇之恩，又赐白银千两与大内孤本，实乃开封府全衙上下之光荣。自今日起，开封府三口铜铡之下、六扇门八方江湖之上，有你这位留守御前行走撑腰，何愁宵小不灭、冤狱不清？”'),
    P('（恭谨接过御赐沉香秘匣与官银契照，深深叩首后昂然起身，抱剑向天子、皇后与包、展、王、韦诸公朗声辞礼）“臣谨遵圣谕！无论身处庙堂高阙抑或汴京长街，臣手中这一剑，永远为大宋清平世道而出！”'),
  ],
  onFinishEffects: [
    { type: 'giveItem', itemId: 'ITM-MSC-025', qty: 1 },
    { type: 'teachMartialArt', artId: 'MA-036', level: 1 },
    { type: 'giveSilver', amount: 1000, reason: '紫宸护驾特旨赏赐纹银一千两' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 25 },
    { type: 'modifyRenown', delta: 120, reason: '汴梁微服三战西夏刺客、血护龙颜获赐大内葵花秘卷' },
    { type: 'modifyChivalry', delta: 50, reason: '恪守六扇门与开封府侠义初心不慕兵权' },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'stayed_kaifeng_kuihua',
      combatExp: 800,
    },
    toast('《微服汴梁 · 血护龙颜》圆满完结！已选择留守开封府 / 六扇门，获赐【御赐《葵花残卷》秘匣】、领悟【葵花残卷（大内秘藏前本）】及赏银 1,000 两！', 'success', '御前封赏'),
  ],
}

const SCENE_35B_STAY_KAIFENG_DECREE: StorySceneDef = {
  id: 'scene_rz_35b_stay_kaifeng_decree',
  title: '第三十五幕 · 留守公门承密卷',
  subtitle: '大内皇宫 · 垂拱紫宸正殿（抉择·乙）',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '紫宸晓日 · 甘守开封清风与六扇门侠骨',
  beats: [
    P('（整衣伏拜，声音沉静如汴水清流，在空旷庄严的紫宸正殿内字字回响）“启禀官家：三衙兵权系社稷重寄，自有王帅、狄帅等宿将名臣秉公执掌。微臣出自开封府六扇门行伍，惯走三教九流、夜巷茶肆，若穿上禁军紫袍金带，反倒不便耳目替官家察听民间疾苦、肃清江湖潜谍！微臣恳请留守开封府与六扇门！”'),
    S('NPC-0001', '（闻言微怔，随即目光陡然化作深深欣慰，亲自步下两级玉阶将你虚扶而起）“好一个‘不便替朕察听民间疾苦’！朕当年初听人言，以为重爵骏马无人能拒，今日方知你心中装的不是高官厚禄，而是像昨晚相国寺里那般，能在寻常巷陌间真真切切护住一个百姓、护住一份公道！”'),
    S('NPC-0140', '（长吁一口气，眼中亮出久违的炽热敬佩，抱拳沉声致意）“你若当真去了禁军三衙，六扇门虽失一柱石，我展某也为你欢喜；如今你竟愿舍高迁而甘守我开封府清苦公门，日后汴京暗桩、太湖余案、乃至西北外谍清查，展昭必与你生死相托、不负肝胆！”'),
    S('NPC-0002', '（含笑望向官家，轻声补充）“官家既赏其忠贞又成其志向，大内秘阁所藏前代《葵花残卷》孤本原本非外臣所能轻窥，然此人昨夜三度独斗死士皆以身法、绝勇克敌，正宜配此奇卷助其护法安邦。”'),
  ],
  onFinishEffects: [openScene('scene_rz_36b_stay_kaifeng_reward', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_36A_JOIN_GUARD_REWARD: StorySceneDef = {
  id: 'scene_rz_36a_join_guard_reward',
  title: '第三十六幕 · 玉津龙骧授四厢',
  subtitle: '大内皇宫 · 垂拱紫宸正殿（终幕·甲）',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '紫宸晓日 · 拜领大宋禁军四厢都指挥与玉津园御赐龙骧骢',
  beats: [
    N('殿前司内侍捧来一枚刻有云龙纹样的鎏金虎符腰牌与新颁紫红织金公服，殿外丹墀石阶尽头更传来一声清越嘶鸣——两名天驷监马官牵出一匹通体雪缎照夜、颈缀蹙金朱缨雕鞍的西北神骏【玉津园御赐龙骧骢】！骏马蹄踏白玉发出铿锵清响，与内库呈上的二十锭官铸银元宝辉映成华。'),
    S('NPC-0001', '“传朕手诏：原开封府御前护卫忠勇无双、孤身连破西夏一品堂三轮双雄刺杀，护驾有奇功！即日起改隶【大宋禁军】，特晋【四厢都指挥】（禁军三阶要职），统筹皇城内外仪卫巡防；另赐玉津园御厩名驹【龙骧骢】一匹、内库白银一千两！望卿驭骏整军，上卫九重宫阙，下安四海黎庶！”'),
    S('NPC-0038', '（肃然迈步出列，双手托起鎏金四厢虎符挂入你腰际，重重拍了拍你包扎过断袖的右肩）“四厢都指挥掌皇城拱卫、随驾出巡要务，非亲信绝勇之辈不可授。自今日起，禁军四十二员悍将便是你的同袍袍泽；你无需拘泥单一拳脚门户，凡大宋天下武库兵略、沙场阵列，皆可融于一身！”'),
    P('（单膝叩首拜领虎符与御赐马缰，旋即昂首起身，望向紫宸殿外渐已大亮的三月汴京晴空）“微臣领旨谢恩！臣必谨记昨晚虹桥雨水与圣上断袖裹伤之义，从今以往，禁军铁骑所向、御前刀锋所指，定叫犯境宵小闻风丧胆！”'),
  ],
  onFinishEffects: [
    { type: 'joinSect', sectId: 'SECT-33', rank: 3, allowOfficialTransfer: true },
    { type: 'giveItem', itemId: 'MNT-004', qty: 1 },
    { type: 'giveSilver', amount: 1000, reason: '紫宸护驾特旨赏赐纹银一千两' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0001' }, delta: 25 },
    { type: 'modifyRenown', delta: 120, reason: '汴梁微服三战西夏刺客、血护龙颜晋位大宋禁军四厢都指挥' },
    { type: 'modifyChivalry', delta: 50, reason: '舍身护佑仁君与汴梁百姓' },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'joined_imperial_guard_lv3',
      combatExp: 800,
    },
    toast('已晋升为【大宋禁军 Lv.3 四厢都指挥】！获赐名驹【玉津园御赐龙骧骢】及内库白银 1,000 两！', 'success', '拜将授印'),
  ],
}

const SCENE_35A_JOIN_GUARD_DECREE: StorySceneDef = {
  id: 'scene_rz_35a_join_guard_decree',
  title: '第三十五幕 · 改授禁军拜将台',
  subtitle: '大内皇宫 · 垂拱紫宸正殿（抉择·甲）',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '紫宸晓日 · 请入大宋禁军担纲四厢都指挥',
  beats: [
    P('（深深吸气，双手抱拳伏首再拜，语气斩钉截铁）“微臣愿入大宋禁军！昨夜从相国寺、樊楼至汴河虹桥，微臣亲眼见贼人敢在京师腹心张网布伏，更念圣上日后巡幸玉津园、迎候西夏辽使之时，岂能全凭一己侠胆单护圣驾？微臣愿借四厢都指挥之职，替官家练铁卫、肃宫防、靖西北！”'),
    S('NPC-0001', '（闻声抚掌而笑，眉宇间连日压抑的忧色顿开三分）“好！既有大志卫我皇城，正合朕意！禁军不尚江湖虚名、亦不设门派狭隘，要的便是这等在血雨真阵里验过胆色的干城之士！”'),
    S('NPC-0013', '（虽略显不舍，却仍郑重拱手道贺，黑面庄严）“开封府今日固然少了一员无可替代的金牌干将，然大宋禁军却添了一名知民间疾苦的四厢统领。记着，无论日后身在宫禁抑或沙场，切莫忘了咱开封府公堂前那句‘公生明、廉生威’！”'),
    S('NPC-0132', '（淡淡颔首，难得露出一丝真切赞许）“皇城角楼宿卫与殿前司诸厢素来泾渭分明，今后倒有了个能沟通公门江湖、又不惧真刀真枪的好帮手。请接官印罢，四厢都指挥大人。”'),
  ],
  onFinishEffects: [openScene('scene_rz_36a_join_guard_reward', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_34_IMPERIAL_CHOICE: StorySceneDef = {
  id: 'scene_rz_34_imperial_choice',
  title: '第三十四幕 · 丹墀双恩问道途',
  subtitle: '大内皇宫 · 垂拱紫宸正殿',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '紫宸晓日 · 加入大宋禁军抑或留守六扇门',
  beats: [
    S('NPC-0001', '“爱卿，你自开封府小捕头一路破大案、入太湖、升任御前护卫，如今更于危难长夜连战三轮西夏一品堂死士、以寡敌众护朕全躯还朝，这份功勋早已超出寻常赏格。今日在皇后、包卿、王卿、韦卿与展护卫面前，朕特予你两条殊途清贵之选，全凭你本心自决。”'),
    S('NPC-0001', '“其一：朕知禁军自成一体、重在统御御林将卒，不设私门功法。你若愿脱离六扇门公门杂务、转入【大宋禁军】，朕即刻超擢你为禁军第三阶要职——【四厢都指挥】，御赐玉津园天驷监头等神骏【龙骧骢】，再赏白银一千两！”'),
    S('NPC-0001', '“其二：你若割舍不下包希仁、展护卫与江湖侠义，愿继续留在【六扇门 / 开封府】履职巡察，朕亦绝不勉强夺人所爱——同样赐你白银一千两，更特旨准予开封大内秘库，赏你珍藏孤本【葵花残卷（大内秘藏前本）】！”'),
    N('大殿一时鸦雀无声。晨曦越过朱红盘龙柱洒在玉阶之上，左边侍卫已牵备御马信符，右边紫檀锦匣内隐见秘卷微光——加入大宋禁军掌拱卫重权，抑或留在六扇门江湖逍遥？一念之择，即定往后前程！'),
  ],
  choices: [
    {
      id: 'choice_join_imperial_guard',
      label: '【转任禁军】拜领大宋禁军 Lv.3「四厢都指挥」之职',
      subLabel:
        '脱离六扇门改隶大宋禁军（无专属武学，领全朝禁军月俸与尊位） · 御赐【玉津园御赐龙骧骢】 + 白银 1,000 两',
      tone: 'gold',
      effects: [openScene('scene_rz_35a_join_guard_decree', 'QST-SECT-17-RENZONG-ESCORT')],
    },
    {
      id: 'choice_stay_kaifeng',
      label: '【留守公门】继续效力开封府 / 六扇门（保持 Lv.4 御前护卫）',
      subLabel:
        '不慕兵权甘守清正侠义 · 御赐秘宝【御赐《葵花残卷》秘匣】 + 领悟【葵花残卷（大内秘藏前本）】 + 白银 1,000 两',
      tone: 'jade',
      effects: [openScene('scene_rz_35b_stay_kaifeng_decree', 'QST-SECT-17-RENZONG-ESCORT')],
    },
  ],
}

const SCENE_33_ZICHEN_COURT_MORNING: StorySceneDef = {
  id: 'scene_rz_33_zichen_court_morning',
  title: '第三十三幕 · 紫宸晓日叙血夜',
  subtitle: '大内皇宫 · 垂拱紫宸正殿',
  mandatory: true,
  illustrationUrl: CG_5_URL,
  illustrationCaption: '紫宸晓日 · 君臣共叙{reignYear}惊魂夜',
  beats: [
    N('卯时初刻，{reignYear}的第一缕晴日金色天光斜斜穿透垂拱紫宸正殿的格扇雕窗，照亮丹墀龙柱与地上干涸的白玉石砖。经历了一整夜暴雨厮杀，少侠早已在大内太医署简略敷药换上一身干净玄袍，腰悬佩刀肃立玉阶之下；殿内此时并无百官冗仪，唯有天子、皇后与寥寥数位心腹重臣在座。'),
    S('NPC-0002', '（目光先在官家赵祯安然无恙的眉宇间停了一瞬，复又沉静转向少侠尚裹着麻布的左臂，神色柔和却透着母仪天下的威重）“昨晚东华门佯队归还时，我便知外头生了变故，坐立难安了一夜。幸赖御前护卫以一人一剑挡住三轮双人伏击，保得官家平安归阙，本宫先替大宋宗庙社稷谢过你。”'),
    S('NPC-0013', '（手持刚连夜录妥的没藏讹庞蜡封密令与几名落网死士供词，重重放在御案之上，双目如电）“启禀官家、娘娘！逆贼六名头目非死即擒，其在汴京联络驿馆贪蠹的内线今晨亦已由六扇门悉数锁拿！臣与王枢密、韦都知仔细核过供词，西夏原想借微服之夜酿成京师血案以毁庆历和议根基——此番若无这位金牌爱卿独撑三战，后果不堪设想！”'),
    S('NPC-0038', '（白须微拂，虎目炯炯地上下打量着少侠，洪声笑道）“好小子！宝塔一战破敏锐伏击，樊楼一战识暗刺，最后汴河虹桥泥水里竟然硬生生扛着剑伤独战贺兰断岳、李破军两位一流中品狼将！老夫在殿前司带兵半辈子，少见这等孤胆锐气！”'),
    S('NPC-0001', '（缓缓起身，望向阶下仍立得笔直如松的青年护卫，眼神里再无昨晚微服书生的谦冲掩饰，唯余九五至尊的深沉期许）“朕昨晚撕下的那一截内衣白绸，此刻还在你腕上缠着。患难之中方见真臣——如今三司呈请重赏，朕今日便先听你的意思。”'),
  ],
  onFinishEffects: [openScene('scene_rz_34_imperial_choice', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_32_PALACE_RETURN_GATES: StorySceneDef = {
  id: 'scene_rz_32_palace_return_gates',
  title: '第三十二幕 · 宣德重开迎圣驾',
  subtitle: '宣德门皇城甬道 · 寅末卯初',
  beats: [
    N('寅时末刻，倾盆了大半宿的春寒急雨终于渐渐歇止，东京城东天际透出一线淡淡的青鱼肚白。大队精锐禁军与开封府快班将那辆临时备下的四马高檐肩舆护在正中，火把连绵百丈，将积水反光的御街照得亮如白昼；少侠虽浑身湿透、肩袖留痕，却仍按刀稳稳护行在御辇右侧半步之外。'),
    S('NPC-0140', '（策马缓缓贴近御辇一侧，低声笑着递来一丸少林大还丹与干巾）“东华门那趟空车倒真叫我骗过了城中一半耳目，谁料一品堂最狠的六条狼却全数压在西路相国寺一线！还好有你寸步不离守在官家身旁——这丸伤药快吞了调息，待会儿宣德门一开，包大人与殿前司诸公定要连夜面圣封赏！”'),
    S('NPC-0001', '（自舆帘后探手挑开一角锦帷，望着檐外被雨水洗刷过的汴京晨色，声音虽略带倦意却分外沉稳清朗）“雨过天晴了。朕今晚看清了羊肉汤锅旁的退伍老兵、看清了泥活字书摊前的寒门学子，更看清了危城绝境里替朕挡刀之人。回垂拱紫宸殿吧——天亮之后，自有天下的章法与朕的报偿。”'),
    N('宣德门沉重的包铜大门伴随着长长的号角声缓缓向外开启。门内殿阶肃穆，门外万家早炊正起，大宋皇城的一夜惊涛终于安稳归港！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: QUEST_ID, stepId: 'palace_decree', silent: false },
    {
      type: 'teleportPlayer',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
    },
    toast('已护送官家平安返抵大内【垂拱紫宸正殿】！请登殿听旨并作出最终抉择。', 'success', '血护还朝'),
  ],
}

const SCENE_31_TORCHES_AT_HONGQIAO: StorySceneDef = {
  id: 'scene_rz_31_torches_at_hongqiao',
  title: '第三十一幕 · 火炬照水禁军临',
  subtitle: '汴河虹桥 · 临水酒肆前街',
  beats: [
    N('便在贺兰断岳与李破军先后瘫倒在雨水泥泞之际，汴河上游水门方向骤然响起一阵密如急鼓的马蹄与重甲铿锵声！数十柄浸油松明火把撕开漆黑雨幕，将整座拱形虹桥映作一条蜿蜒翻腾的火龙——走在最前头一袭红袍、佩剑急驰而来的正是“御猫”展昭，身后紧随皇城幽影韦青衣与殿前都指挥使老将王德用！'),
    S('NPC-0140', '（飞身翻下马背，看见少侠一身血水泥泞却寸步未退地横立御前，而桥旁赵祯披蓑立于檐下安然无恙，顿时眼眶微热）“幸亏樊楼升起了那盏碧玉信号灯！我在御街看见绿焰便知大事不妙，一面急调皇城角楼宿卫，一面同王元帅封锁汴河东西水门——这些便是没藏讹庞暗派入汴的银狼双统领么？”'),
    S('NPC-0038', '（亲率重甲禁军都头扑上桥顶，一脚踩住还想摸匕首的李破军背脊，回首望向微服一身的赵祯时“扑通”单膝砸地，虎目含愧）“臣王德用宿卫无方、叫西夏鼠辈惊扰圣驾，万死难辞！若非这位年轻护卫以命相搏……”'),
    S('NPC-0001', '（迈步走入火光之中，亲手扶起老将王德用，又抬指点向少侠方才孤守的桥头位置）“休要请罪。是朕微服暗出宫禁，原不怨三衙防务；倒亏了这位六扇门爱卿，今夜连破三伏六敌，一步未退！先把活口严密锁拿，切勿叫西夏使馆走脱半名勾结驿吏，然后随朕回宫！”'),
  ],
  onFinishEffects: [openScene('scene_rz_32_palace_return_gates', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_30_SILVER_WOLVES_FALL: StorySceneDef = {
  id: 'scene_rz_30_silver_wolves_fall',
  title: '第三十幕 · 孤锋断浪破双狼',
  subtitle: '汴河虹桥 · 桥心惊涛夜雨',
  illustrationUrl: CG_4_URL,
  illustrationCaption: '虹桥夜雨 · 双狼伏诛雨幕渐歇',
  beats: [
    N('暴雨如万千银箭斜扫木桥，混着汴水寒雾在三人刀光周围激起白蒙蒙一团水汽！李破军右路欺近、贺兰断岳左翼铁肩重撞，欲以二敌一之势将少侠活活挤落河心浊浪！然而历经宝塔、樊楼两场殊死磨砺的少侠早已全神贯注到了极致——脚踩奇门步法滑过湿木，一记巧劲借力打力震偏大食乌兹铁刀，紧跟着回身斜挑！'),
    P('（喉间一声长啸压过雷鸣，内息全数灌注兵刃之上）“替大宋好水川冤魂索命！替汴京万民太平讨债！——给我倒下！”'),
    S({ name: '贺兰断岳', title: '西夏一品堂 · 银狼左统领', factionName: '西夏一品堂', portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg' }, '（捂着被剑气震碎虎口而撒手坠地的血刀，不可置信地单膝跪在木桥栏杆旁，嘶声惨笑）“好狠的纯正武功……竟然先破刀势再截身法……咱们兄弟驰骋灵州十余载，今夜竟栽在一名宋廷年轻捕卫手里……一品堂……败了……”'),
    S('NPC-0001', '（一直紧紧攥在袖中的拳头缓缓松开，不顾冷雨浇面一步步踏上桥坡走至少侠身侧，伸手一把扶住你剧烈起伏的肩膀，声音竟有些微沙哑）“卿……可还能立稳？看那边——汴河东面火把连天，展昭与禁军大队来了！”'),
  ],
  onFinishEffects: [openScene('scene_rz_31_torches_at_hongqiao', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_29_RAIN_AFTER_CLASH: StorySceneDef = {
  id: 'scene_rz_29_rain_after_clash',
  title: '第二十九幕 · 血染青衫卫九重',
  subtitle: '汴河虹桥 · 临水酒肆檐前',
  illustrationUrl: CG_4_URL,
  illustrationCaption: '虹桥夜雨 · 三轮 1v2 决战大捷',
  beats: [
    N('双刀与掌影终在半柱香惊天恶斗后轰然崩散！两道狂傲的一品堂银狼身影倒飞七八步，重重摔撞在虹桥两侧朱漆木栏之上，发出令人牙酸的木裂声，浑身内力已溃散大半！少侠单手拄刀半跪于地，左臂绑着的御赐白绸早已被雨水与零星血水浸透，大口喘息间吐出的每一口气息都在夜寒里凝作白雾。'),
    P('（勉力抬起发颤的右手，用袖口拭去挡在眼眉前的雨珠，第一眼便回首望向临水酒肆木檐之下）“官家……贼人双统领皆已被制住……您……无恙否？”'),
    S('NPC-0001', '“朕好得很！从相国寺资圣宝塔到樊楼雅阁，再到这汴河虹桥——整整三轮六名死士，皆是你凭一己血肉之躯死死挡在朕身前！大宋太祖太宗立国以来，何曾有哪位近卫曾以这般孤勇，在市井泥水里替天子连战三宵、寸土不让？！”'),
  ],
  onFinishEffects: [openScene('scene_rz_30_silver_wolves_fall', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_28_HONGQIAO_FINAL_DUEL: StorySceneDef = {
  id: 'scene_rz_28_hongqiao_final_duel',
  title: '第二十八幕 · 桥心横刀挡双雄',
  subtitle: '汴河虹桥 · 桥心惊涛夜雨',
  mandatory: true,
  illustrationUrl: CG_4_URL,
  illustrationCaption: '虹桥夜雨 · 1v2 血战贺兰断岳与李破军',
  beats: [
    N('贺兰断岳与李破军互相递了个眼色，一左一右缓缓踏上拱桥湿滑木板，脚下木楔在重压下咯吱作响。雨点砸在铁甲、刀脊与檐前红灯笼上噼啪作响，桥下浑浊的汴河水翻卷白沫轰然奔泻。这一战，后方无半点退路，前方是西夏一品堂潜入京师的最强双璧！'),
    S({ name: '李破军', title: '西夏一品堂 · 银狼右统领', factionName: '西夏一品堂', portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg' }, '“前两拨都是替咱们试剑的探路石，真正想把宋皇留下的人是我兄弟二人！小护卫，放下长刀退向酒肆屋檐，倒还能挣个痛快全尸；若再冥顽不灵，十息之内把你斩成三截抛进汴河喂鱼！”'),
    P('（轻轻活动了一下被白绸勒紧的左腕，随即横刀当胸，将微服赵祯严严实实护在桥尾门柱后方，唇角反而浮出一丝冷冽笑意）“前四名同伴临死前也说过相似的大话。来吧——今晚这彩虹桥上，谁跌进汴河里还不一定呢！”'),
  ],
  choices: [
    {
      id: 'duel_round_3_hongqiao',
      label: '横刀踏雨 · 虹桥血战银狼双统领（第三战 1v2）',
      subLabel: '生死决战（一流中品双狼合击 · 不可逃跑）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildHongqiaoWolfLeaderNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildHongqiaoWolfSecondNpc() }],
          rule: 'duel',
          forceMandatory: true,
          forbidEscapeReason: '圣驾紧在身后桥头檐下，此乃最后一重死关，岂可退避偷生！',
          deathTitle: '血沉汴水 · 魂断虹桥',
          deathDetail:
            '夜雨滂沱之中，少侠已在虹桥连番恶战至真气濒竭，终不敌贺兰断岳与李破军两大一品堂银狼统领合击，兵刃脱手跌落汴水激流，微服夜巡折戟京华。',
          introText:
            '【第三战 1v2 终局死战】贺兰断岳挥动西域赤铜血刀正面压迫，李破军持乌兹镔铁刀自侧翼狂攻！只要战胜此二狼，官家便能安然迎候禁军大队！',
          onWin: [
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            {
              type: 'giveCombatExp',
              amount: 450,
              reason: '汴河虹桥夜雨 1v2 击溃一品堂银狼双统领',
            },
            openScene('scene_rz_29_rain_after_clash', 'QST-SECT-17-RENZONG-ESCORT'),
          ],
        },
      ],
    },
  ],
}

const SCENE_27_WOLVES_BLOCK_BRIDGE: StorySceneDef = {
  id: 'scene_rz_27_wolves_block_bridge',
  title: '第二十七幕 · 银狼合围锁虹桥',
  subtitle: '汴河虹桥 · 临水酒肆前桥坡',
  illustrationUrl: CG_4_URL,
  illustrationCaption: '虹桥夜雨 · 西夏银狼双统领现身截桥',
  beats: [
    N('话音刚落，酒肆二楼一扇本该早已栓死的木窗忽然被狂风吹开，两声低沉如荒原饿狼的口哨陡然穿过雨帘，在黑夜桥拱两端此起彼伏！下一瞬，桥东尽头与桥西石阶阴影里缓缓踱出两道身材魁梧、披着防雨油布毡斗篷的冷峻身影，斗篷一掀，各露出一口亮晃晃的厚背血刃与镶银狼头腰牌！'),
    S({ name: '贺兰断岳', title: '西夏一品堂 · 银狼左统领', factionName: '西夏一品堂', portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg' }, '（大步踏上湿漉漉的虹桥拱顶，任凭大雨顺着铁盔檐边淌下，狞笑着抬刀遥指屋檐下的二人）“果真让你们闯出了樊楼！能一口气连挑掉相国寺先遣与樊楼红牌四员好手，开封府的御前护卫果然名不虚传。不过到此为止了——前面水门外十丈已被我们兄弟凿沉了两艘盐船堵住，你们的禁军一时半会渡不过来！”'),
    S('NPC-0001', '（非但不退，反而缓缓站上门槛之前，静静看着桥上这最后两名高阶强敌，语气带着帝王难言的从容）“好手笔。先火烧东坊诱开巡兵，再在汴河凿船拦阻水门接应——若你们西夏没藏讹庞把这般心思用在兴庆府治水开渠上，何至于让两朝百姓常年食不果腹？”'),
    P('（抢前一步挡在赵祯身侧，剑尖低垂贴紧青石地面，任雨水流过雪亮锋刃）“官家且退后三步依柱避箭！这二人的内息远非方才四名死士可比，乃是一品堂压箱底的银狼双统领——但只要微臣还有一口气在，谁也别想从虹桥踏过这半尺门槛！”'),
  ],
  onFinishEffects: [openScene('scene_rz_28_hongqiao_final_duel', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_26_SILK_SLEEVE_BANDAGE: StorySceneDef = {
  id: 'scene_rz_26_silk_sleeve_bandage',
  title: '第二十六幕 · 断袖裹伤话甘苦',
  subtitle: '汴河虹桥 · 临水酒肆檐下',
  beats: [
    N('临水酒肆已然熄灶打烊，唯余檐角一只破旧防风红灯笼随狂风猛烈摇摆，酒旗湿漉漉贴在竹竿上滴水不止。少侠护着“赵六郎”抢进狭窄的檐下避雨，借着那点微弱红光，赵祯忽然瞥见少侠左小臂青布护腕早已裂开一道三寸血口，那是方才樊楼破屏时被没藏血影毒砂暗器擦破的。'),
    S('NPC-0001', '（一言不发，竟抬手抓住自己青色儒袍里那截质地极细的白绸中衣袖摆，“刺啦”一声生生撕下二尺来长，抓起少侠染雨的左腕便要亲自缠扎）“别动。御医总说朕性子太软、御下太宽，可今晚若非你次次用血肉挡在头里，朕这条性命早已丢在相国寺塔顶或樊楼珠帘后了。”'),
    P('（心中一热，惶恐缩手欲避却被天子手掌稳稳按住）“官家万金之躯，岂能替卑职撕衣裹伤！此乃微臣本分……”'),
    S('NPC-0001', '（仔细把白绸打了个端正平结，抬头望着桥下奔流怒号的黑夜汴河，声音压得比雨声还轻，却字字重逾千钧）“十二岁登基至今二十八载，朕夜夜批阅四京三路奏章，朝堂上党争吵个不休，后宫里亦步步规矩。唯有像今夜这般被追杀到江湖野渡，反而看得真切：什么叫社稷，什么叫可托生死的臣子。”'),
  ],
  onFinishEffects: [openScene('scene_rz_27_wolves_block_bridge', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_25_HONGQIAO_RAIN_ARRIVAL: StorySceneDef = {
  id: 'scene_rz_25_hongqiao_rain_arrival',
  title: '第二十五幕 · 疾风骤雨奔虹桥',
  subtitle: '汴河虹桥 · 临水酒肆',
  beats: [
    N('雷声炸响，压在汴京城头整晚的铅灰春云终于化作倾盆大雨狂泻而下！少侠护着换了一件粗麻雨蓑的赵祯，沿着城南一条青石深巷狂奔两里，避开正街巡逻盲区，总算在三更梆子敲响之际冲抵汴河岸边著名的木构拱桥——【汴河虹桥】旁那座孤零零挑着一角破酒旗的【临水酒肆】。'),
    P('（一边抹去脸上淌下的冰冷雨水，一边反手护住赵祯肩头，警觉地环顾漆黑河岸与上下桥坡）“此处距内城水门仅有一箭之遥，只要跨过虹桥东端那座石栏坊，皇城角楼暗哨便能望见咱们的动静！但不知西夏死士有没有抢先在这里……”'),
    S('NPC-0001', '（帽檐滴水，青色湿袍紧紧贴在身上，呼吸虽微促却半点不显慌乱）“水门夜间启闭有皇城司严格鱼符核验，韦青衣若在，见了樊楼升空的绿灯，大队禁军此刻应当已在奔来的路上了。咱们且入酒肆屋檐下略避风雨——顺便等等，看这夜雨里还藏着几只狐狸。”'),
    N('然而正当两人踏上酒肆门口被水漫过的石阶时，脚下积水里却忽然传出一阵异样平稳、绝非夜风吹动所能发出的重物踏板声！'),
  ],
  onFinishEffects: [openScene('scene_rz_26_silk_sleeve_bandage', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_24_ESCAPE_INTO_NIGHT_RAIN: StorySceneDef = {
  id: 'scene_rz_24_escape_into_night_rain',
  title: '第二十四幕 · 惊雷压城赴水门',
  subtitle: '樊楼 · 三层后梯廊道',
  beats: [
    N('樊楼前院大堂因才子词歌正闹得热火朝天，谁也未曾料到三楼雅阁内短短盏茶功夫竟已历经了一场生死血战。少侠顺手扯下帘布拭净刀锋血迹，护着神色冷峻的天子沿酒楼后厨专设的隐蔽木梯急行而下，推开后巷偏门时，恰逢头顶一声早春闷雷轰然炸响，豆大的夜雨劈头盖脸砸了下来！'),
    S('NPC-0001', '（仰面任几点初春冷雨打在额前，眼底反而闪出一抹绝不肯低头的刚毅光芒）“他们既算准了朕走哪条街巷，想在【汴河虹桥】临水酒肆旁拦截接应，那朕偏要堂堂正正踏上虹桥！若为一群西夏刺客便藏头缩尾躲进水沟地窖，朕这二十八年的大宋皇帝还怎么当？！”'),
    P('（从门房檐角顺手取过两领油纸雨蓑披在天子与自己肩上，低声沉定应诺）“既如此，官家便随微臣往东南急行！虹桥地势高耸开阔、临水无遮，若贼人最后一张底牌真亮在桥头，只要微臣守住桥心，咱们的禁军援兵从水门望见信号灯必定火速合围！”'),
    N('两人戴起斗笠穿入漆黑雨幕，顺着湿滑石板巷道直奔汴河虹桥旁的临水酒肆而去！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: QUEST_ID, stepId: 'hongqiao_tavern', silent: false },
    warn('已燃点信号灯并夺获密令！请火速护驾前往【开封府 · 汴河虹桥 · 临水酒肆】迎击最后一重伏兵。', '血护龙颜'),
  ],
}

const SCENE_23_MOZANG_WARRANT: StorySceneDef = {
  id: 'scene_rz_23_mozang_warrant',
  title: '第二十三幕 · 蜡封死令惊御案',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  beats: [
    N('信号灯碧焰刚冲入云霄，少侠俯身搜查倒毙在乱木间的嵬名赤锋，果然从他贴胸内袋摸出一卷以西夏党项密文写就、封口盖着朱红虎狼印的牛皮蜡封令箭。拆开一看，令纸夹缝竟还压着一张精细绘制的东京汴梁夜间换防简图，【大相国寺】【樊楼】与【汴河虹桥】三处皆被朱砂重重圈作死穴！'),
    S('NPC-0001', '（伸手接过蜡封令箭借着残烛仔细一照，眉头终于缓缓拧成一座冷峻高山）“印玺上是‘没藏讹庞’的私记……李元昊前岁既亡，兴庆府幼主新立，这厮独揽西夏大权却忌惮兴庆元老主张议和，竟敢偷偷派遣一品堂死士潜入汴京行刺！若朕微服被杀在汴京街市，宋夏便立刻重燃战火，他正好借兵乱彻底把持朝政！”'),
    P('（手指重重按在简图第三处朱圈之上，沉声急禀）“官家看！他们把最老辣的一支精锐‘银狼双统领’压在了【汴河虹桥】旁的临水酒肆外！只要咱们往东南方向去汇合内城水门禁军，就必定要从虹桥上跨过去！”'),
    S('NPC-0001', '（将蜡封死令收入怀中，神色镇定得令人心折）“不错。一计杀不成，便设三环连杀！既知最后一道鬼门关在虹桥，趁外面乱火未灭、雨势将起，我们立刻下楼！”'),
  ],
  onFinishEffects: [openScene('scene_rz_24_escape_into_night_rain', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_22_SIGNAL_LANTERN_LIT: StorySceneDef = {
  id: 'scene_rz_22_signal_lantern_lit',
  title: '第二十二幕 · 碧灯冲霄召禁卫',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  illustrationUrl: CG_3_URL,
  illustrationCaption: '樊楼飞桥 · 点亮皇城紧急号灯',
  beats: [
    N('雅阁窗棂大开，远近灯火倒映在三层飞桥下的青石街面。少侠顾不得左臂衣袖被毒砂掌风擦裂的隐隐灼痛，大步跨到雅阁正南挑檐下，从壁龛铁盒里取出六扇门特制铜哨磷烛，划燃后放入高悬半空的琉璃号灯之中！'),
    P('（看着一束冷幽凝实的翠绿色光柱穿透樊楼重重屋脊直刺乌云翻涌的夜空，心中暗松一口气）“官家请看！此乃六扇门与皇城角楼约定的最高急报‘青焰惊龙灯’——此刻只要展总捕或韦青衣前辈在京城制高点望见一星碧火，半刻之内开封府与殿前司诸军便会顺着汴河水门扑来护驾！”'),
    S('NPC-0001', '（端起桌角唯独没有倾洒的一只未开封铜灯凑到身前，凝视着窗外遥遥隐约响起的更锣号角）“只是东坊那些火警喧哗一时难以尽散，禁军汇合至少尚须半柱香。在此之前，还得看清楚这两名红牌杀手身上到底带了什么来头。”'),
  ],
  onFinishEffects: [openScene('scene_rz_23_mozang_warrant', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_21_FANLOU_AFTERMATH: StorySceneDef = {
  id: 'scene_rz_21_fanlou_aftermath',
  title: '第二十一幕 · 碎木残酒镇红牌',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  illustrationUrl: CG_3_URL,
  illustrationCaption: '樊楼飞桥 · 第二轮 1v2 血战告捷',
  beats: [
    N('修罗刀势与毒砂催心掌双双遇挫！雅阁之内断竹珠帘纷如雨落，半幅碎裂的山水屏风横倒在地，青瓷酒坛碎成满地流光。少侠顺着二人合击合拢前那半瞬空隙欺身而入，反手一刀震飞嵬名赤锋的大食镔铁刃，并指点封没藏血影腕脉，二人闷哼吐血，接连瘫倒在残酒水渍之中！'),
    S('NPC-0001', '（手中还稳稳握着一盏铜台防风蜡烛——方才激战全程他竟然半步未乱、始终将火光举在身旁照亮少侠视野！）“好敏捷的步法与胆识！以开封府御前行走之身力敌两位西夏红牌杀手，不单寸步护住了朕，竟连屋顶楼下的欢宴宾客都未惊动半分！”'),
    P('（微喘收刀，立刻警惕地将二人身上暗藏毒囊尽数踢落窗外深井）“卑职受官家知遇深恩，岂容贼子污了此楼清雅！楼下宾客尚沉醉词曲声中，恰好趁此喧闹掩护——官家，卑职这便去露台点燃紧急信号灯！”'),
  ],
  onFinishEffects: [openScene('scene_rz_22_signal_lantern_lit', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_20_RED_PLAQUE_AMBUSH: StorySceneDef = {
  id: 'scene_rz_20_red_plaque_ambush',
  title: '第二十幕 · 破屏裂帘伏双凶',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  mandatory: true,
  illustrationUrl: CG_3_URL,
  illustrationCaption: '樊楼飞桥 · 1v2 迎战一品堂红牌双煞',
  beats: [
    N('喝破伪装的刹那，那两张本应谦卑陪笑的“店伙计”面孔骤然冰冷如铁！左侧身形高瘦者反手一掀木案，青瓷酒坛轰然飞摔碎裂，右掌夹带腥风暗劲一掌劈碎身后两扇松鹤墨屏，一柄寒芒幽森的大食乌兹镔铁刀已如毒蛇吐信般从破屏缝隙劈面斩至！'),
    S({ name: '嵬名赤锋', title: '西夏一品堂 · 红牌修罗斩使', factionName: '西夏一品堂', portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg' }, '“不愧是能从相国寺资圣塔杀出来的御前贴身卫！可惜这间雅阁外飞桥已被我等剪断绳梯，外面几条街又被假火惊乱——今日就算你浑身是铁，还能同时挡住我修罗刀与没藏姑娘的催心掌不成？！”'),
    P('（护身一闪将天子推进朱红立柱内侧死角，双手握定钢刀锋鸣作响）“堂堂大宋东京汴梁樊楼，岂容你等西夏鬼祟撒野！官家稳立柱后莫动——此二人，便由卑职一人一并拿下！”'),
  ],
  choices: [
    {
      id: 'duel_round_2_fanlou',
      label: '拔刀护驾 · 樊楼雅阁独斗红牌双凶（第二战 1v2）',
      subLabel: '生死决战（一流下品合击 · 不可逃跑）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildFanlouCrimsonNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildFanlouPalmNpc() }],
          rule: 'duel',
          forceMandatory: true,
          forbidEscapeReason: '红牌刺客已断飞桥绳梯，官家就在身侧，绝无可退之路！',
          deathTitle: '血溅樊楼 · 忠魂折戟',
          deathDetail:
            '樊楼三层雅阁之内，少侠同时抵御修罗刀与毒砂催心掌左右夹击，惜被破屏暗招重创丹田，力竭倒在破碎酒坛与珠帘之中，汴京龙颜危殆。',
          introText:
            '【第二战 1v2 樊楼死斗】嵬名赤锋施展《修罗刀》连环重劈，没藏血影以《催心掌》与西域赤铜血刀专袭护体要害！务须击破二人合围！',
          onWin: [
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            {
              type: 'giveCombatExp',
              amount: 340,
              reason: '樊楼三层雅阁 1v2 击杀一品堂红牌双凶',
            },
            openScene('scene_rz_21_fanlou_aftermath', 'QST-SECT-17-RENZONG-ESCORT'),
          ],
        },
      ],
    },
  ],
}

const SCENE_19_THUMB_RINGS_EXPOSED: StorySceneDef = {
  id: 'scene_rz_19_thumb_rings_exposed',
  title: '第十九幕 · 羊脂刀油露马脚',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  illustrationUrl: CG_3_URL,
  illustrationCaption: '樊楼飞桥 · 识破伪装店伙与屏后杀机',
  beats: [
    N('词曲声尚在楼下回荡，雅阁之外的竹珠帘却忽然轻轻一掀。两名低眉顺眼、捧着青瓷温酒坛与铜盘银箸的“樊楼小二”悄无声息步入阁中，一人走向点灯窗口，另一人却借着布菜之势，脚步沉稳如铁桩般悄悄绕向赵祯侧后方半丈之处。'),
    P('（原本垂袖坐于下首的身躯瞬间如绷满的角弓般暗暗蓄力，目光牢牢锁住那两名“店伙计”的手掌与袖口，鼻翼轻轻一嗅，突然冷冷开口）“慢着！樊楼惯用眉州上等陈酒配松炭温壶，哪来的党项羊脂刀油味？！”'),
    P('（起身一指对方右手大拇指根部厚实磨平的老茧，话音如冰砸玉盘）“还有你等二位手指上的扳指旧痕与袖底沉铁——汴京城里端菜跑堂的小二，会日夜拉弓练刀、把掌缘练出铁砂茧子么？你们根本不是樊楼的人！”'),
    S('NPC-0001', '（闻声瞬间侧步退开半丈，将手边青花茶杯轻轻按在桌面，眉宇之间哪有半点惊慌，唯有冰寒透骨的帝王威仪）“好耳目。可惜你们混入酒肆之前，竟连楼下士子吟唱的词句都未曾听懂半分！”'),
  ],
  onFinishEffects: [openScene('scene_rz_20_red_plaque_ambush', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_18_FAN_ZHONGYAN_SONG: StorySceneDef = {
  id: 'scene_rz_18_fan_zhongyan_song',
  title: '第十八幕 · 渔家傲动君王襟',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  beats: [
    N('步入三楼那间名唤“东清阁”的雅室，四壁垂挂着湘妃竹与细穿玉珠连缀的长帘，临窗设有一架绘着青绿松鹤山水的四扇楠木大屏风。楼下大厅忽然丝竹一转，几名举杯对饮的关中游士举箸敲碗，竟高亢苍凉地唱起一阕《渔家傲》：“塞下秋来风景异，衡阳雁去无留意。四面边声连角起……”'),
    S('NPC-0001', '（听到“浊酒一杯家万里，燕然未勒归无计。羌管悠悠霜满地，人不寐，将军白发征夫泪”，正站在窗前俯瞰灯海的赵祯蓦然驻足，指尖久久按在雕花栏杆之上，眼圈竟悄悄泛红）“这是范希文前几年镇守延州时所作吧……范卿、狄青、种世衡他们替朕在陕右风霜里守着国门，如今回想，朕在宫中每一夜安眠，都是边关将士拿白发换来的。”'),
    P('（站在屏风斜侧警惕戒备之余，也不由轻叹一声）“范公胸怀天下忧乐，狄青将军亦出身行伍、面涅未消而威震敌胆。正因圣上知人善任、不忌寒微，前线将士才肯拼死力战。”'),
    S('NPC-0001', '（轻轻颔首，目光渐渐收回到静谧雅室之内）“是啊……庆历和议虽暂歇边兵，然西夏野心不死，大宋终究一日不可忘战。且先让人送壶热茶来，你替我盯着东窗角楼那盏信号灯。”'),
  ],
  onFinishEffects: [openScene('scene_rz_19_thumb_rings_exposed', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_17_FANLOU_FLYING_BRIDGE: StorySceneDef = {
  id: 'scene_rz_17_fanlou_flying_bridge',
  title: '第十七幕 · 五楼飞桥入樊楼',
  subtitle: '樊楼 · 三层五楼飞桥雅阁',
  beats: [
    N('躲过两股借“捉贼”“救火”名义乱窜误导视线的地痞哨探，少侠与伪装作书生的赵祯穿过两条乌黑窄巷，终于绕抵宣德门东侧最繁华煊赫的东京第一酒楼——【樊楼】。只见五座三层高楼彼此以雕栏飞桥凌空相连，数千盏明角羊皮灯火照彻半边夜空，酒香、丝竹与士子高谈声浪扑面而来。'),
    P('（压低斗笠帽檐护着赵祯登阶，同时低声快速交代）“樊楼三层西南角那座雅阁，恰好高出周围民居两丈，从窗台可直接望见皇城宿卫角楼与开封府鼓楼！待会儿进了雅阁，官家务必居屏风内侧，卑职借点酒为名，迅速燃放随身携带的碧玉联络号灯！”'),
    S('NPC-0001', '（一面随少侠沿朱漆旋转楼梯稳步上行，一面不忘细察周围动静）“今夜樊楼客满为患，这五楼飞桥平时最是鱼龙混杂。既进了高阁，凡端茶送酒、隔帘伺候之人，一举一动皆须多加几分留意。”'),
    N('楼外夜风渐渐湿重，远处天际隐隐滚过几声闷雷。两人推开三层飞桥尽头的朱漆木门时，雅阁珠帘微动，楼下恰传出一阵清亮吟哦。'),
  ],
  onFinishEffects: [openScene('scene_rz_18_fan_zhongyan_song', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_16_DECOY_FIRE_WARD: StorySceneDef = {
  id: 'scene_rz_16_decoy_fire_ward',
  title: '第十六幕 · 东坊伪火困金蝉',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔廊栏',
  beats: [
    N('二人自塔廊北侧远眺汴京棋盘般的坊巷灯火，只见东南方向不远处某处柴行突然腾起一小股呛人黑烟，紧接着传来刻意夸大的铜锣喊火声！街道上原本整齐巡夜的开封府厢兵巡铺，立刻被那股虚张声势的火警吸引，成队提着水桶挠钩往东侧坊巷狂奔而去！'),
    P('（面色陡寒，一把按住石栏急声道）“好毒的调虎离山！贼人知道大相国寺距皇城太近，不敢久留缠斗，故而用虚火诱走正街巡铺，再拿咱们逼往开阔高楼——官家，咱们正缺一处高可通视皇城角楼之地燃点六扇门密令号灯！”'),
    S('NPC-0001', '（凝神望向东南方灯火最为辉煌煊赫的那座五座连体高阁）“樊楼。樊楼三层五楼飞桥比民居高出数丈，东可望皇城角楼，南可通汴河。贼人必料到我会去樊楼求援或借喧哗脱身——咱们便将计就计，上樊楼雅阁一观虚实！”'),
    N('君臣二人不再迟疑，趁着塔下尚未聚集起救火惊慌的人流，迅速顺塔梯悄然西出庙巷，隐入灯影错落的樊楼方向！'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: QUEST_ID, stepId: 'fanlou_towers', silent: false },
    warn('已查明“三环绝杀”阴谋！请护送赵祯前往【开封府 · 樊楼 · 三层五楼飞桥雅阁】发出信号并戒备暗杀。', '血护龙颜'),
  ],
}

const SCENE_15_THREE_RING_PLOT: StorySceneDef = {
  id: 'scene_rz_15_three_ring_plot',
  title: '第十五幕 · 三环绝杀惊天谋',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔',
  beats: [
    N('拓跋枭咽喉一滞，本想咬破藏在臼齿里的毒蜡自尽，却早被少侠一记分筋错骨手卸脱了下颌。趁着尚有一丝清醒，又见自己带来的精锐伴当折翼于眼前这名大宋御前护卫手里，那名女刺客野利寒鸦脸色惨白如纸，在冷冽威压下终于抖抖索索道出几句惊人实情。'),
    S({ name: '野利寒鸦', title: '西夏一品堂 · 断铃淬毒刺客', factionName: '西夏一品堂', portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg' }, '“你们赢不了的……此番兴庆府主战派倾巢密遣六名精锐潜入开封……分作三环绝杀：相国寺塔影先遣只是第一环！无论你们逃向樊楼求救，还是直趋汴河水门回宫，后面还有红牌杀手与一品堂银狼双统领重重扼守……”'),
    S('NPC-0001', '（神情不仅未见怯懦，眸光反而在夜风中愈发清澈坚定，缓缓开口）“六名死士，连环三关。好啊……原来兴庆府里真有人怕我大宋休养生息、怕边境长久无战。把这二人以佛寺偏殿钟绳捆实，通知暗处茶棚探子速转交开封府严加关押！”'),
    P('（手脚麻利将两名死士筋脉封死、捆入偏阁暗处，复又迅速回到赵祯身前）“官家，贼人既设三环埋伏，定已提前派人堵死或惊扰了相国寺回皇城正街的几处巡兵坊门！”'),
  ],
  onFinishEffects: [openScene('scene_rz_16_decoy_fire_ward', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_14_UNMASK_YIPINTANG: StorySceneDef = {
  id: 'scene_rz_14_unmask_yipintang',
  title: '第十四幕 · 弯刀铁牌显真形',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔',
  illustrationUrl: CG_2_URL,
  illustrationCaption: '资圣宝塔 · 揭破西夏一品堂暗杀徽记',
  beats: [
    N('扯下拓跋枭头上那顶伪装用的青毡暖帽，只见他两鬓依稀剃作西北党项秃发旧痕、额角刻有一枚暗淡灰狼刺青；再挑起地上一柄弯如冷月、刃脊开有双道血槽的精钢短刀，刀镡末端清晰铸着“西夏一品堂”五个细小篆字！'),
    P('（单膝抵住拓跋枭肩胛骨，举起从其腰间搜出的一枚黑铁鹰牌向赵祯呈验）“启禀官家！此辈并非寻常中原响马，而是西夏一品堂训练多年、专行暗杀渗透的死士！眼下西夏和议使臣恰在都亭驿驻留，他们竟敢在天子脚下行刺御驾，用心险恶至极！”'),
    S('NPC-0001', '（俯首审视那枚泛着冷铁寒气的铁鹰符牌，眸色骤然深沉如井）“都亭驿使臣昨日还上表称愿永守庆历誓书、岁换茶马，背地里竟在开封城心布置杀局！且逼问清楚——这汴京城中，他们究竟埋了多少死士、究竟想做什么！”'),
  ],
  onFinishEffects: [openScene('scene_rz_15_three_ring_plot', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_13_PAGODA_FIRST_VICTORY: StorySceneDef = {
  id: 'scene_rz_13_pagoda_first_victory',
  title: '第十三幕 · 初挫弯刀塔檐静',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔',
  illustrationUrl: CG_2_URL,
  illustrationCaption: '资圣宝塔 · 第一轮 1v2 伏击告破',
  beats: [
    N('寒光交错十余合，八角宝塔外其余未断的数十枚青铜风铃在夜风中急遽齐鸣，竟将兵刃撞击声尽数掩盖！少侠捉住野利寒鸦回手摸镖的一线空隙，长剑斜撩格开拓跋枭拦腰弯刀，左掌顺势拍出一股沉雄内劲，将两名凌空偷袭的刺客双双震翻在朱红塔门门槛之前！'),
    P('（挽了个剑花将残雪般的刀气散去，足尖一点挑落二人手里淬毒短刃，反身先行抱拳问安）“官家可曾受惊？此二贼已被卑职封住经脉动弹不得！”'),
    S('NPC-0001', '（缓缓放下始终负在身后的双手，袖口微拂去一片震落的琉璃瓦尘，眼神沉静得全无常人遇刺后的慌乱）“朕无碍。方才毒针袭来那瞬，卿以剑脊连震三枚飞星而步履纹丝不动，包卿与展护卫果真未曾看错人——且掀开他们的毡巾面罩，看看是何方凶徒敢行此大逆！”'),
  ],
  onFinishEffects: [openScene('scene_rz_14_unmask_yipintang', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_12_PAGODA_AMBUSH_DUEL: StorySceneDef = {
  id: 'scene_rz_12_pagoda_ambush_duel',
  title: '第十二幕 · 飞檐毒针迎双刺',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔高廊',
  mandatory: true,
  illustrationUrl: CG_2_URL,
  illustrationCaption: '资圣宝塔 · 1v2 初战西夏一品堂先遣双刺',
  beats: [
    N('“铮——！”一声脆裂如银丝绷断的异响陡然刺破夜空！半空中三点寒芒借着月影破风疾射而来，几乎同时，塔檐阴影里两道如大鸟俯冲的黑影踏瓦翻落，左右分合直扑站于石栏旁的赵祯！千钧一发之际，少侠暴喝一声纵身横跨三步，雪亮佩刃铿锵出鞘，叮叮两声将三枚淬蓝毒针凌空磕飞！'),
    S({ name: '拓跋枭', title: '西夏一品堂 · 飞檐先遣刀手', factionName: '西夏一品堂', portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg' }, '（冷月弯刀横拖琉璃飞檐溅起一路火星，声音嘶哑阴狠）“反应倒快！可惜宋廷皇帝今晚只带了你这一个跟班微服出门，咱们一品堂双煞联手合击，看你能护住几息！”'),
    P('（背抵朱红塔柱，将微服赵祯严密护于身后内廊，单手持兵冷冷横眉）“大宋禁中之地近在咫尺，岂容西夏鼠辈猖狂！官家请退入塔门内侧一步——这双贼首级，便作今晚消夜下酒物！”'),
  ],
  choices: [
    {
      id: 'duel_round_1_pagoda',
      label: '拔刀护驾 · 资圣宝塔力敌双刺（第一战 1v2）',
      subLabel: '生死决战（二流上品合击 · 不可逃跑）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: QUEST_ID,
          opponent: { kind: 'custom', npc: buildPagodaBladeNpc() },
          extraOpponents: [{ kind: 'custom', npc: buildPagodaShadowNpc() }],
          rule: 'duel',
          forceMandatory: true,
          forbidEscapeReason: '官家赵祯就在身后塔廊之内，御前护卫岂可弃君独逃！',
          deathTitle: '血溅佛塔 · 御驾倾危',
          deathDetail:
            '资圣八角琉璃宝塔高廊之上，少侠孤身面对拓跋枭、野利寒鸦弯刀毒针合围而力竭陨落，未能守住赵祯退路，大宋{reignYear}遂生惊天国变。',
          introText:
            '【第一战 1v2 塔廊遭遇战】拓跋枭弯刀沉猛、野利寒鸦身法诡绝！集中内力击破其中一人，切勿让刺客突破至赵祯身侧！',
          onWin: [
            { type: 'healPlayer', hpPct: 100, mpPct: 100 },
            {
              type: 'giveCombatExp',
              amount: 260,
              reason: '资圣宝塔 1v2 击溃西夏一品堂先遣双刺',
            },
            openScene('scene_rz_13_pagoda_first_victory', 'QST-SECT-17-RENZONG-ESCORT'),
          ],
        },
      ],
    },
  ],
}

const SCENE_11_SEVERED_BELL_CORD: StorySceneDef = {
  id: 'scene_rz_11_severed_bell_cord',
  title: '第十一幕 · 暮风突止断风铃',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔高廊',
  illustrationUrl: CG_2_URL,
  illustrationCaption: '资圣宝塔 · 檐角风铃绳断杀气骤降',
  beats: [
    N('晚风本在宝塔八角琉璃飞檐间穿行不息，吹得檐角六十四只铜风铃叮当作响。然而便在君臣二人谈及好水川遗孤渐趋沉默时，少侠的耳廓却极其细微地一动——东北角最高那排风铃声响竟没来由地缺了两拍！紧接着，一截刚被利刃整齐削断的浸油麻绳悄无声息滑过栏杆边缘，坠落塔下幽暗松影。'),
    P('（左手骤然不动声色地横挡至赵祯胸前半寸，整个人脊背如松蓄势待发，声音压得极低极沉）“官家，万莫回头看檐角！东北屋脊瓦面有人踩断了铃绳，且塔梯入口方才也有轻微的落锁刮擦声！”'),
    S('NPC-0001', '（神情一凛却未发半点惊呼，反倒极其冷静地顺从少侠掩护悄退半步贴靠塔心石柱）“果然冲着市井中认出朕微服的踪迹来了么……好，先稳住呼吸，看这帮暗箭小人究竟从哪一方屋檐落下来！”'),
  ],
  onFinishEffects: [openScene('scene_rz_12_pagoda_ambush_duel', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_10_HAOSHUICHUAN_MEMORY: StorySceneDef = {
  id: 'scene_rz_10_haoshuichuan_memory',
  title: '第十幕 · 临塔长望念好水',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔高廊',
  beats: [
    N('登上八角琉璃宝塔上层回廊，凛冽而清朗的汴京暮风拂袖而来。向下望去，十万户朱雀大街与大相国寺万姓灯市犹如星河落入棋盘；向西北遥望，则唯有暮霭苍茫吞没了遥远黄河故道与关中方向。微服而来的大宋皇帝手扶雕石栏杆，良久未发一语。'),
    S('NPC-0001', '“爱卿，方才羊肉汤摊那张老卒提到好水川……你是武将公门出身，可知道好水川、定川寨那两仗折了多少关中男儿么？”赵祯声音轻飘飘落入夜风，仿佛每字都在替自己背负二十余载江山重担，“当年任福将军等万余官兵埋骨笼竿城下，报书送到福宁殿那夜，朕对着半碗残羹枯坐到五更天明。”'),
    S('NPC-0001', '“朝中有年轻言官屡屡上疏骂朕向辽夏示弱，说‘庆历和议’每年输给西夏银绢茶彩屈辱了祖宗威严……可朕算过账啊：省下一场十万大军的粮饷徭役，关中河北便能少死几万名刚才那样的张老卒，汴京书摊便还能印出几万卷唐诗……”'),
    P('（闻此肺腑之言，心头蓦然涌起一股难以言喻的肃然与酸涩，低声拱手）“官家以百姓温饱社稷休养为先，忍辱负重之苦心，岂是浮躁清议所能尽知！只可惜树欲静而风不止，西夏若存不臣之心……”'),
  ],
  onFinishEffects: [openScene('scene_rz_11_severed_bell_cord', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_09_ASCEND_GLAZED_PAGODA: StorySceneDef = {
  id: 'scene_rz_09_ascend_glazed_pagoda',
  title: '第九幕 · 登高避嚣临资圣',
  subtitle: '大相国寺 · 资圣八角琉璃宝塔',
  beats: [
    N('为了避开夜市愈发密集的市井杂流与暗中可能潜伏的耳目，少侠借口赏玩相国寺夜景，护着“赵六郎”拐出喧闹摊街，沿古柏森森的偏院甬道一路往寺内最高建筑——【资圣八角琉璃宝塔】行去。暮色渐浓，香客已多半下山赴晚市，唯余木阶盘旋通往清冷塔廊。'),
    P('（行前每过一处折角皆抬眼审视梁柱暗影，确认阶梯暂无人踪方才打个手势引路）“官家，塔上地势高敞、三面迎风，既可一览东京灯火夜景，又易于守住唯一一道下塔木梯。若真有宵小跟踪，此地比混杂闹市更不易伤及无辜香客。”'),
    S('NPC-0001', '（轻轻拢了拢身上微凉的青布袖口，举步踏上吱呀作响的楠木阶梯，回头冲少侠浅笑）“你这做御前护卫的，连陪朕出来散散步喘口气，脑子里绷着的弦都像比弓还紧。也罢，且陪我上到第五层廊外吹吹汴京晚风。”'),
    N('一君一臣踩着木阶拾级而上，塔心深处佛灯微明，而谁也未曾察觉塔外月影下几道黑衣鬼影正顺着琉璃瓦脊悄无声息贴近！'),
  ],
  onFinishEffects: [openScene('scene_rz_10_haoshuichuan_memory', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_08_HAWK_TALLY_SHADOW: StorySceneDef = {
  id: 'scene_rz_08_hawk_tally_shadow',
  title: '第八幕 · 钟楼铁鹰窥龙行',
  subtitle: '大相国寺 · 万姓交易雅市',
  illustrationUrl: CG_1_URL,
  illustrationCaption: '宣德微服 · 察觉相国寺钟楼外异域谍影',
  beats: [
    N('刚收妥诗卷准备移步，少侠眼角余光忽然瞥见东北侧钟楼灰瓦重檐的暗影处闪过一线极为短暂冷锐的铜光！凝神望去，一名戴着低垂兜帽、肩宽背厚的汉子正匆匆将一面巴掌大小的青铜铁鹰符牌缩回袖中，随即对着北街巷口发出一声酷似夜枭捕鼠的短促口哨！'),
    P('（不动声色把原本悬在左手边的佩刀往虎口顺滑寸许，同时借替“赵六郎”整袖的姿势低语提醒）“先生莫惊——右前方钟楼檐角有党项铁鹞探哨！方才东华门假仪仗虽已出城，只怕此人早已认出了官家您平时微带陕右官音的京腔或随身玉坠气息！”'),
    S('NPC-0001', '（听到这话却反而露出一抹从容自若的淡然微笑，指尖稳稳托住方才买下的活字诗钞）“既是冲朕来的狐狸尾巴，那更不能在熙攘万姓市井之中大打出手——否则乱兵伤了张老卒与这满街摆摊贩夫岂不可惜？咱们往寺内高处去。”'),
    N('话音刚落，两人便如寻常游寺晚归的文士护从一般，从容绕出人声鼎沸的集市，径直朝着高耸入云的【资圣八角琉璃宝塔】方向踱去。'),
  ],
  onFinishEffects: [
    { type: 'setQuestStep', questId: QUEST_ID, stepId: 'xiangguosi_pagoda', silent: false },
    warn('已察觉西夏探哨暗记！请护驾登上【开封府 · 大相国寺 · 资圣八角琉璃宝塔】，戒备来袭伏兵！', '血护龙颜'),
  ],
}

const SCENE_07_BI_SHENG_PRINT_STALL: StorySceneDef = {
  id: 'scene_rz_07_bi_sheng_print_stall',
  title: '第七幕 · 活字书摊墨香浓',
  subtitle: '大相国寺 · 万姓交易雅市',
  illustrationUrl: CG_1_URL,
  illustrationCaption: '宣德微服 · 驻足泥活字新印书肆摊前',
  beats: [
    N('辞别老兵往前又行出十余丈，鼻端羊汤脂香渐散，迎面扑来的却是浓浓一层松烟墨与楮皮新纸清芬。摊主是位戴着方巾的寒窗老童生，木板上竟整整齐齐码着几册以庆历年间新传“泥活字”印法翻印的《唐诗百篇》《武经总要》坊间节钞本，以及几卷范仲淹《岳阳楼记》与欧阳修新文抄本。'),
    S('NPC-0001', '（爱不释手地拿起一册泥活字印本，用指腹轻轻摩挲纸背隐隐凸起的均匀墨印，眼神亮如少年）“往昔雕版一书须费匠人数月之力，平民学子往往借书抄录不得；自庆历年毕昇创这泥活字，如今连相国寺夜市都能几十文钱买着字迹清隽的唐人诗钞，真是天地文运一大快事！”'),
    S({ name: '寒窗书摊主', title: '相国寺夜市鬻书儒生', factionName: '东京市井百姓', portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg' }, '（颇为得意地捻须笑道）“这位官人好眼力！不瞒您说，如今京城读书人都盼着多印些实学政论与边防图要，只盼官家朝堂上的好政令能一直这样兴文重教下去，让寒门子弟也能凭真才实学出头！”'),
    S('NPC-0001', '“定会如你所愿。”（温和一笑，照价丢下百枚铜钱买了一本《岳阳楼记》合抄本卷入袖中，可就在一转身时，身侧少侠却忽然神情一凝！）'),
  ],
  onFinishEffects: [openScene('scene_rz_08_hawk_tally_shadow', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_06_VETERAN_MUTTON_SOUP: StorySceneDef = {
  id: 'scene_rz_06_veteran_mutton_soup',
  title: '第六幕 · 羊汤暖胃慰老卒',
  subtitle: '大相国寺 · 万姓交易雅市',
  illustrationUrl: CG_1_URL,
  illustrationCaption: '宣德微服 · 施钱温汤问询陕右伤兵',
  beats: [
    N('行至茶汤摊前，只见一张长凳边缘蜷坐着一位头发花白、右腿微跛的灰衣老汉。那老汉守着面前半冷的粗瓷汤碗只顾啃着干硬炊饼，袖口挽起时竟露出一截被箭簇贯穿过留下的狰狞旧疤。摊主原想招呼新客，反倒被“赵六郎”抬手止住，自顾掏出一把分量沉实的铜钱放在灶沿。'),
    S('NPC-0001', '（温言吩咐摊主再添满满一大勺滚热羊汤与三张胡麻烧饼端给老汉，自己竟也拉条木凳在旁坐下）“看老丈腿脚风寒痛楚，像是早年在西北边军吃过苦头的功臣？眼下虽改入{reignYear}，莫非地方抚恤钱粮有折损拖欠？”'),
    S({ name: '张老卒', title: '好水川退伍老兵', factionName: '东京市井百姓', portraitUrl: '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg', avatarUrl: '/assets/characters/templates/tpl_zhenyuan_male_av.jpg' }, '（捧着滚烫羊汤狠吸一口白气，抬头见是位面容温润和气的中年文士，不由咧开缺牙直笑）“不敢欺瞒这位善心官人！老汉早年在好水川杀敌伤了腿骨，退伍回乡后按朝廷皇恩每月领三斗赈米、两百贯钱粮，原也还算贴补——只盼如今官家千秋圣寿、西夏那些狼崽子别再闹腾，让我孙儿安安稳稳读书种地就够啦！”'),
    P('（站在“赵六郎”身后半步悄然扫视四方行人动向，见老卒言辞质朴真挚、不求荣华唯求太平，不由心中微动，替主子看重民间实情的良苦用心暗暗钦佩。）'),
  ],
  onFinishEffects: [openScene('scene_rz_07_bi_sheng_print_stall', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_05_MARKET_TWILIGHT: StorySceneDef = {
  id: 'scene_rz_05_market_twilight',
  title: '第五幕 · 华灯初上万姓市',
  subtitle: '大相国寺 · 万姓交易雅市',
  illustrationUrl: CG_1_URL,
  illustrationCaption: '宣德微服 · 相国寺万姓交易雅市黄昏人潮',
  beats: [
    N('酉时三刻，东京开封府彻底卸下白昼百司公署的森严威仪，化作人间第一等富贵锦绣之乡。大相国寺外门广场千百盏纸笼灯火依次点亮，铜香炉青烟笔直飘上暮青天际；卖胡饼羊汤的铁锅滋滋作响，棋摊说书、药铺香囊、丝绸画卷的叫卖声与欢笑声交织成一片温暖沸腾的市井洪流。'),
    S('NPC-0001', '（轻轻摇开手中那把竹骨素扇，深吸一口混着芝麻饼香与松柏檀烟的晚风，紧锁在紫宸案牍前的两道眉峰终于舒展开来）“你瞧，这才是大宋的底气！比紫宸殿里那些只知道用奏疏互相弹劾攻讦的吵闹，眼前这锅沸腾羊汤、这排亮堂灯笼才真教朕心里踏实。”'),
    P('（装作寻常清客随从，略屈半身在侧方压低嗓音提醒）“‘赵六郎’先生虽看得兴起，仍请切勿远离卑职三步之内！相国寺夜市每日吞吐四方商旅不下万人，鱼龙混杂，尤须堤防西夏或契丹暗桩顺风窥探。”'),
    N('“六郎”闻言含笑颔首，随后目光却被不远处热气腾腾的羊肉汤锅与角落里一位衣衫打满补丁却仍挺直脊背的老卒深深吸引过去。'),
  ],
  onFinishEffects: [openScene('scene_rz_06_veteran_mutton_soup', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_04_DONGHUA_DECOY: StorySceneDef = {
  id: 'scene_rz_04_donghua_decree',
  title: '第四幕 · 金蝉脱壳出玄武',
  subtitle: '大内皇宫 · 偏门甬道',
  beats: [
    N('半刻之后，大内深处早已备妥一盘巧计。随着东华门方向传来一通装模作样的仪仗清道锣声，全副武装、身披朱红官服的“御猫”展昭跨上一匹高头白马，亲护一辆垂满明黄流苏的宫中轺车大张旗鼓驰向玉津园，瞬间便将城中无数暗处窥伺的眼线目光尽数吸走。'),
    S('NPC-0140', '（临分别前于西偏门暗角与少侠急促交掌一握，压低声线嘱咐）“假车阵至少能替官家牵住宫外大半暗桩三个时辰！可万一真有一品堂疯狗嗅出偏门气息，京中唯有你武功机变足堪独当一面。记住——万事不离护圣驾周全四字，若逢剧变，燃起六扇门号灯！”'),
    S('NPC-0001', '（换上了一身天青圆领文士常服、头戴素纱折角幞头，手里轻捏一柄竹骨折叠素扇，温文一笑颇有风流儒生神韵）“从此刻起，没有什么官家，我是汴京城里姓赵排行第六的寻常闲人‘赵六郎’，你是我的贴身护院小兄弟！咱们第一站，便去大相国寺逛逛这万姓灯市！”'),
    P('（紧束玄色窄袖劲装，将冷铁长刀稳稳押在灰布罩衫内侧，郑重抱拳随行）“请‘赵先生’先步！从相国寺至东京诸街，微臣寸步不离左右！”'),
  ],
  onFinishEffects: [
    {
      type: 'startQuest',
      questId: QUEST_ID,
      stepId: 'xiangguosi_market',
      silent: false,
    },
    toast('已护送微服出宫的“赵六郎”上路！请前往【开封府 · 大相国寺 · 万姓交易雅市】随驾微服巡察。', 'success', '血护龙颜'),
  ],
}

const SCENE_03_EMPRESS_CAO_COUNSEL: StorySceneDef = {
  id: 'scene_rz_03_empress_cao_counsel',
  title: '第三幕 · 坤宁赠佩托忠良',
  subtitle: '大内皇宫 · 垂拱紫宸正殿',
  beats: [
    N('既见天子主意已决，殿旁端坐良久的慈圣曹皇后并未如寻常后妃般哭啼劝阻，反而缓缓起身取来一柄连鞘仅七寸长的青铜玄铁匕首，又挑出一枚看似极其寻常的素色羊脂小玉坠，亲手替赵祯掖入微服常服内袋。'),
    S('NPC-0002', '（抬眸望向玉阶之下神色沉稳的少侠，眼中既有武门名将之孙的锐利决断，又藏着为妻为后的万般牵挂）“官家主意已定，九头牛也拉不回。太湖那一战你的本事我与包卿皆已听闻，今日我不要你带三百铁甲弄得满城惊疑，只把大宋江山这半壁重担托付给你手中那一口剑。”'),
    S({ name: '张茂则', title: '内侍省都知 · 贴身老内官', factionName: '大宋朝廷', portraitUrl: '/assets/characters/templates/tpl_eunuch_male_fb.jpg' }, '（捧着一套微服常服青袍上前替官家更换，声音尖细却沉定老练）“娘娘与奴婢都已照办了：皇城司韦青衣韦都知率暗卫守住外郭各处暗门与水闸；展护卫领空车伪作圣驾出东华门赏灯诱敌；真正的微服路线，唯有今天紫宸殿这几位知情！”'),
    P('（单膝拜倒白玉丹墀，右手按刀如山立誓）“请官家、娘娘安心！只要卑职尚有一口真气运转，便绝不叫京师一寸风尘、一分险刃惊扰龙颜半毫！”'),
  ],
  onFinishEffects: [openScene('scene_rz_04_donghua_decree', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_02_WEST_XIA_TENSION: StorySceneDef = {
  id: 'scene_rz_02_west_xia_tension',
  title: '第二幕 · 微服问世拒千卫',
  subtitle: '大内皇宫 · 垂拱紫宸正殿',
  beats: [
    S('NPC-0001', '（指着案头一摞刚送到不久的京畿米价折子与陕右军报，叹了口气走下御阶）“{reignYear}春暮，西夏使臣恰在都亭驿谈论马市和约；可转头朕却听闻京师外围米价连月虚抬，甚至有人暗中传言陕右归休伤卒领不到半升恩饷。若依殿前司旧例出宫——前呼后拥三百带刀禁卫开路、净水泼街百步清道，朕看到的永远是官吏粉饰出的歌舞升平！”'),
    S('NPC-0140', '（抱剑上前一步，眉心微蹙，语气谨慎忠直）“官家圣心爱民，天下共仰。只是目下东京城鱼龙混杂，既驻着辽国南院细作暗桩，前日开封府更缉获西夏一品堂死士暗中潜伏的风声！若只带区区一两名护卫微服入市井，未免太过冒险……”'),
    S('NPC-0001', '（微微摆手止住劝阻，随后将含笑却极其信任的视线投向少侠）“正因只带一人，方才挑了你！自你入开封府以来，先平参合庄阴谋、再在还施水阁独面慕容复而不坠大宋声威，朕看中你的不只是这身一流功夫，更是你在街头市井能辨人心的机敏与赤胆忠心。”'),
    P('（迎着天子目光，抱拳朗然应声）“官家信重至此，微臣虽肝脑涂地亦不敢辞！只是既要微服瞒过各方死谍眼线，宫外便须做一套严丝合缝的诱敌暗棋方妥。”'),
  ],
  onFinishEffects: [openScene('scene_rz_03_empress_cao_counsel', 'QST-SECT-17-RENZONG-ESCORT')],
}

const SCENE_01_SECRET_SUMMONS: StorySceneDef = {
  id: 'scene_rz_01_secret_summons',
  title: '第一幕 · 紫宸密召御前卫',
  subtitle: '大内皇宫 · 垂拱紫宸正殿',
  beats: [
    N('{reignYear}暮春黄昏，残阳把东京开封府紫宸正殿檐下的盘龙金瓦染作一片浑厚琥珀色。散朝钟鼓早已敲过两轮，三省六部阁臣皆已退去，唯有一道不经外朝门下、直接递进开封府密档室的御前手谕，将刚刚荣晋【御前护卫】不久的少侠悄然召入大内最深处。'),
    S('NPC-0001', '（未着通天冠与明黄衮服，只披一件半旧紫檀色团花常袍立于殿侧大宋十三路疆域舆图前，听见脚步声回首便含笑迎步）“爱卿免去大礼，快请进来。自太湖姑苏立约归来后，朕一直想召你进宫说几句贴心话，今日恰逢黄昏清静，才让小展替朕约你到此一晤。”'),
    P('（恭敬单膝见礼后起身，目光迅速扫过殿中：除了天子与身侧端庄温婉的曹皇后，便只余持剑护立一旁的“御猫”展昭与老内侍张茂则，立时心知今晚所召绝非寻常礼宴）“臣参见官家、皇后娘娘！不知官家暮色急召，可有秘命差遣？”'),
    S('NPC-0001', '（转身熄掉案上一盏过于明亮的高柱宫灯，笑意里渐渐生出一股久困九重宫阙后难得流露出的爽朗锐意）“秘命谈不上，只是一桩憋在朕心里整整三年的宿愿——今夜天清气朗，朕想请你陪着，就咱们两个，微服走一趟东京开封夜市！”'),
  ],
  onFinishEffects: [openScene('scene_rz_02_west_xia_tension', 'QST-SECT-17-RENZONG-ESCORT')],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_36B_STAY_KAIFENG_REWARD.id]: SCENE_36B_STAY_KAIFENG_REWARD,
  [SCENE_35B_STAY_KAIFENG_DECREE.id]: SCENE_35B_STAY_KAIFENG_DECREE,
  [SCENE_36A_JOIN_GUARD_REWARD.id]: SCENE_36A_JOIN_GUARD_REWARD,
  [SCENE_35A_JOIN_GUARD_DECREE.id]: SCENE_35A_JOIN_GUARD_DECREE,
  [SCENE_34_IMPERIAL_CHOICE.id]: SCENE_34_IMPERIAL_CHOICE,
  [SCENE_33_ZICHEN_COURT_MORNING.id]: SCENE_33_ZICHEN_COURT_MORNING,
  [SCENE_32_PALACE_RETURN_GATES.id]: SCENE_32_PALACE_RETURN_GATES,
  [SCENE_31_TORCHES_AT_HONGQIAO.id]: SCENE_31_TORCHES_AT_HONGQIAO,
  [SCENE_30_SILVER_WOLVES_FALL.id]: SCENE_30_SILVER_WOLVES_FALL,
  [SCENE_29_RAIN_AFTER_CLASH.id]: SCENE_29_RAIN_AFTER_CLASH,
  [SCENE_28_HONGQIAO_FINAL_DUEL.id]: SCENE_28_HONGQIAO_FINAL_DUEL,
  [SCENE_27_WOLVES_BLOCK_BRIDGE.id]: SCENE_27_WOLVES_BLOCK_BRIDGE,
  [SCENE_26_SILK_SLEEVE_BANDAGE.id]: SCENE_26_SILK_SLEEVE_BANDAGE,
  [SCENE_25_HONGQIAO_RAIN_ARRIVAL.id]: SCENE_25_HONGQIAO_RAIN_ARRIVAL,
  [SCENE_24_ESCAPE_INTO_NIGHT_RAIN.id]: SCENE_24_ESCAPE_INTO_NIGHT_RAIN,
  [SCENE_23_MOZANG_WARRANT.id]: SCENE_23_MOZANG_WARRANT,
  [SCENE_22_SIGNAL_LANTERN_LIT.id]: SCENE_22_SIGNAL_LANTERN_LIT,
  [SCENE_21_FANLOU_AFTERMATH.id]: SCENE_21_FANLOU_AFTERMATH,
  [SCENE_20_RED_PLAQUE_AMBUSH.id]: SCENE_20_RED_PLAQUE_AMBUSH,
  [SCENE_19_THUMB_RINGS_EXPOSED.id]: SCENE_19_THUMB_RINGS_EXPOSED,
  [SCENE_18_FAN_ZHONGYAN_SONG.id]: SCENE_18_FAN_ZHONGYAN_SONG,
  [SCENE_17_FANLOU_FLYING_BRIDGE.id]: SCENE_17_FANLOU_FLYING_BRIDGE,
  [SCENE_16_DECOY_FIRE_WARD.id]: SCENE_16_DECOY_FIRE_WARD,
  [SCENE_15_THREE_RING_PLOT.id]: SCENE_15_THREE_RING_PLOT,
  [SCENE_14_UNMASK_YIPINTANG.id]: SCENE_14_UNMASK_YIPINTANG,
  [SCENE_13_PAGODA_FIRST_VICTORY.id]: SCENE_13_PAGODA_FIRST_VICTORY,
  [SCENE_12_PAGODA_AMBUSH_DUEL.id]: SCENE_12_PAGODA_AMBUSH_DUEL,
  [SCENE_11_SEVERED_BELL_CORD.id]: SCENE_11_SEVERED_BELL_CORD,
  [SCENE_10_HAOSHUICHUAN_MEMORY.id]: SCENE_10_HAOSHUICHUAN_MEMORY,
  [SCENE_09_ASCEND_GLAZED_PAGODA.id]: SCENE_09_ASCEND_GLAZED_PAGODA,
  [SCENE_08_HAWK_TALLY_SHADOW.id]: SCENE_08_HAWK_TALLY_SHADOW,
  [SCENE_07_BI_SHENG_PRINT_STALL.id]: SCENE_07_BI_SHENG_PRINT_STALL,
  [SCENE_06_VETERAN_MUTTON_SOUP.id]: SCENE_06_VETERAN_MUTTON_SOUP,
  [SCENE_05_MARKET_TWILIGHT.id]: SCENE_05_MARKET_TWILIGHT,
  [SCENE_04_DONGHUA_DECOY.id]: SCENE_04_DONGHUA_DECOY,
  [SCENE_03_EMPRESS_CAO_COUNSEL.id]: SCENE_03_EMPRESS_CAO_COUNSEL,
  [SCENE_02_WEST_XIA_TENSION.id]: SCENE_02_WEST_XIA_TENSION,
  [SCENE_01_SECRET_SUMMONS.id]: SCENE_01_SECRET_SUMMONS,
}
