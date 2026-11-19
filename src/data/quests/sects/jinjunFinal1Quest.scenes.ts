import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep } from '../../../engine/quest/dsl'
import { JINJUN_FINAL_1_ID } from './jinjunFinal1Quest'

const RENZONG = { kind: 'npc' as const, npcId: 'NPC-0001' }
const QIAOFENG = { kind: 'npc' as const, npcId: 'NPC-0110' }
const MURONGFU = { kind: 'npc' as const, npcId: 'NPC-0120' }
const HELIAN = {
  kind: 'custom' as const,
  name: '赫连铁树',
  title: '西夏一品堂征东大将军',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
}
const DUAN_YANQING = { kind: 'npc' as const, npcId: 'NPC-1053' }
const YIPINTANG_CAPTIVE = {
  kind: 'custom' as const,
  name: '一品堂被俘都统',
  title: '西夏征东军俘虏',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
}
const GUARD = {
  kind: 'custom' as const,
  name: '皇城司密探',
  title: '江南暗桩急使',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_fn1_01: {
    id: 'scene_fn1_01',
    title: '第一幕 · 皇城司急报',
    subtitle: '开封府 · 八十万禁军大教场',
    beats: [
      N('执掌殿前司大印未久，一名浑身泥浆的皇城司密探竟连换八匹快马闯入大教场，单膝跪倒在你面前呈上蜡封密函。'),
      S(GUARD, '“禀都帅！西夏一品堂征东大将军赫连铁树率大批番邦高手潜入两浙路，企图在无锡杏子林一举瓦解丐帮！”'),
      P('“丐帮素为我大宋北方耳目，若在江南覆灭，河北、陕北民情谍网必致瘫痪！他们哪来这般熟悉江南水网的向导？”'),
    ],
    onFinishEffects: [openScene('scene_fn1_02', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_02: {
    id: 'scene_fn1_02',
    title: '第二幕 · 死灰竟复燃',
    subtitle: '开封府 · 八十万禁军大教场',
    beats: [
      S(GUARD, '“为西夏引路设局的军师，正是昔日从燕子坞死里逃生、化名投靠一品堂的姑苏慕容复！”'),
      P('“又是慕容复！好一个认贼作父的鲜卑余孽，竟敢勾结西夏毒害中原侠义！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_03', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_03: {
    id: 'scene_fn1_03',
    title: '第三幕 · 御前请出兵',
    subtitle: '开封府 · 垂拱紫宸正殿',
    beats: [
      N('事不宜迟，你立即入宫面圣奏明利害。官家深知丐帮安危牵动北疆耳目，当即准奏，命你亲率精骑驰援江南。'),
      S(RENZONG, '“卿既统殿前宿卫，便点两百名玄甲缇骑星夜南下！务必救下乔峰与丐帮忠义之士，斩断西夏伸向江南的黑手！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_04', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_04: {
    id: 'scene_fn1_04',
    title: '第四幕 · 缇骑出汴京',
    subtitle: '开封府 · 八十万禁军大教场',
    illustrationUrl: '/assets/quests/jinjun_fn1_cavalry_dispatch.jpg',
    illustrationCaption: '大教场点兵 · 殿前都指挥使亲率两百玄甲缇骑星夜南下',
    beats: [
      N('寒星照甲，两百名一人双马、背负重盾与透甲长枪的殿前司玄甲缇骑集结完毕。你手提天波透甲金枪翻身上马，一声令下，铁蹄轰鸣冲出南薰门！'),
      P('“一人双马，日夜兼程！目标无锡杏子林——出发！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_05', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_05: {
    id: 'scene_fn1_05',
    title: '第五幕 · 急行两浙路',
    subtitle: '江南 · 官道夜驰',
    beats: [
      N('一路换马不换人，昼夜飞驰千里。行近太湖无锡地界时，暮色四合，空气中隐隐飘来一股令人头晕目眩的甜腻异香。'),
      P('“全军立刻以湿巾掩住口鼻！前方恐已遭西夏奇毒弥漫！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_06', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_06: {
    id: 'scene_fn1_06',
    title: '第六幕 · 悲酥清风弥',
    subtitle: '无锡 · 杏子林外围',
    illustrationUrl: '/assets/quests/jinjun_fn1_beisu_mist.jpg',
    illustrationCaption: '杏子林毒雾弥漫 · 丐帮群豪瘫软，乔峰孤身血战双凶',
    beats: [
      N('透过疏密交错的杏树林隙望去，林中数百名丐帮弟子与四大长老已尽数瘫软倒地，唯有一名身材魁梧、披头散发的铁血汉子双目赤红，在微毒缠身之下仍孤身浴血迎战两大绝顶高手！'),
      S(QIAOFENG, '“卑鄙西夏番狗，只会用‘悲酥清风’这等下三滥毒烟！有种便与我乔峰真刀真枪一战！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_07', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_07: {
    id: 'scene_fn1_07',
    title: '第七幕 · 贼子狂笑声',
    subtitle: '无锡 · 杏子林中',
    beats: [
      S(MURONGFU, '“哈哈哈！乔峰，今日便是你丐帮除名之日！赫连将军，放箭射杀这契丹……不，这狂徒！”'),
      S(HELIAN, '“一品堂强弩手听令——放箭！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_08', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_08: {
    id: 'scene_fn1_08',
    title: '第八幕 · 破林见危机',
    subtitle: '无锡 · 杏子林外围',
    onFinishEffects: [setStep(JINJUN_FINAL_1_ID, 'fn1_xinzilin_rescue')],
    beats: [
      P('“殿前司玄甲缇骑——列盾冲锋，救下乔帮主！”'),
    ],
  },
  scene_fn1_09: {
    id: 'scene_fn1_09',
    title: '第九幕 · 玄甲破竹林',
    subtitle: '无锡 · 杏子林中',
    illustrationUrl: '/assets/quests/jinjun_fn1_shield_break.jpg',
    illustrationCaption: '玄甲破林 · 殿前司缇骑铁盾挡毒箭，主角飞身落马援乔峰',
    beats: [
      N('轰隆巨响声中，两百名殿前司玄甲缇骑撞碎外围竹林呼啸杀入，沉重玄铁盾牌瞬间结成一道密不透风的钢铁高墙，“叮叮当当”将漫天淬毒弩箭尽数挡下！'),
      P('“大宋殿前司在此！谁敢伤我大宋忠良！”'),
      S(QIAOFENG, '“好气派的禁军铁骑！这位将军好俊的枪法！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_10', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_10: {
    id: 'scene_fn1_10',
    title: '第十幕 · 仇人分外眼红',
    subtitle: '无锡 · 杏子林核心空地',
    beats: [
      N('你翻身落马，手中天波透甲金枪斜指地面，稳稳站到乔峰身侧。对面披着一品堂客卿黑袍的慕容复一见你的面容，顿时双目赤红、面容扭曲，状若疯虎！'),
      S(MURONGFU, '“是你！！少室山辱我、燕子坞毁我百年基业的宋廷鹰犬！今日连你与乔峰一并宰了！”'),
      S(DUAN_YANQING, '“（腹语）好一个殿前都指挥使，正好让老夫会一会大宋第一武官！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_11', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_11: {
    id: 'scene_fn1_11',
    title: '第十一幕 · 随军医解毒',
    subtitle: '无锡 · 杏子林',
    beats: [
      P('“随军医官立刻用清凉解毒散救治丐帮诸位长老！乔帮主，今日便由你我背靠背，杀尽这帮西夏走狗！”'),
      S(QIAOFENG, '“哈哈哈！有将军并肩，乔某体内毒气顿时散了七分！请！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_12', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_12: {
    id: 'scene_fn1_12',
    title: '第十二幕 · 双雄背靠背',
    subtitle: '无锡 · 杏子林核心空地',
    illustrationUrl: '/assets/quests/jinjun_fn1_qiaofeng_duo.jpg',
    illustrationCaption: '杏子林巅峰联手 · 降龙十八掌与天波透甲金枪背靠背死战',
    beats: [
      N('乔峰大步踏前，降龙十八掌刚猛掌风卷起满地枯叶，气吞万里；你则手握天波透甲金枪，枪出如惊雷奔电，二人一掌一枪背靠背互为犄角，杀得一品堂众高手人仰马翻！'),
      S(HELIAN, '“段先生、慕容先生，快联手先毙此二人！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_13', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_13: {
    id: 'scene_fn1_13',
    title: '第十三幕 · 腹语铁杖袭',
    subtitle: '无锡 · 杏子林核心空地',
    beats: [
      N('“恶贯满盈”段延庆双腿虽残，双拐却如鬼魅般点地飞掠，铁杖尖端凝聚着霸道纯阳的一阳指劲，刁钻狠辣地直刺你与乔峰合击的空隙！'),
      P('“乔帮主且稳住中路，这老怪物交给我来牵制！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_FINAL_1_ID,
        opponent: { kind: 'npc', npcId: 'NPC-1053' },
        rule: 'duel',
        introText: '【杏林联战】迎击西夏一品堂四大恶人之首段延庆（宗师中品），配合乔峰破其寒铁双拐！',
        onWin: [
          { type: 'giveCombatExp', amount: 140, reason: '杏子林联手乔峰击溃恶贯满盈段延庆' },
          openScene('scene_fn1_14', JINJUN_FINAL_1_ID),
        ],
      },
    ],
  },
  scene_fn1_14: {
    id: 'scene_fn1_14',
    title: '第十四幕 · 亢龙断铁杖',
    subtitle: '无锡 · 杏子林核心空地',
    illustrationUrl: '/assets/quests/jinjun_fn1_duan_yanqing.jpg',
    illustrationCaption: '亢龙有悔 · 乔峰降龙掌劲震断段延庆一阳指铁杖',
    beats: [
      N('你一记回马枪挑开段延庆左拐防线，身旁乔峰抓准时机一声怒吼，双掌推出震天动地的“亢龙有悔”！沛然莫御的掌力正面轰中铁杖，“咔嚓”一声将其震断两截，段延庆哇地喷出一口鲜血倒飞退去！'),
      S(DUAN_YANQING, '“（腹语）乔峰与这宋将联手实在棘手……撤！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_15', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_15: {
    id: 'scene_fn1_15',
    title: '第十五幕 · 疯魔剑路乱',
    subtitle: '无锡 · 杏子林核心空地',
    beats: [
      N('见段延庆受创败退，慕容复愈发癫狂，眼中血丝密布，口中喃喃嘶喊着“复我大燕”，长剑化作漫天狂乱剑影向你咽喉死命扑来！'),
      S(MURONGFU, '“燕子坞没了……四大家将也没了……我什么都没有了，我要你们通通陪葬！！”'),
      P('“心魔入骨，剑意已乱！慕容复，当年少室山与太湖未了的账，今日彻底做个了断！”'),
    ],
    onFinishEffects: [
      {
        type: 'startCombat',
        questId: JINJUN_FINAL_1_ID,
        opponent: {
          kind: 'npc',
          npcId: 'NPC-0120',
          talkOverride: '“大燕不灭！大燕不灭！！受死吧！！”',
        },
        rule: 'duel',
        introText: '【心魔剑路】迎战走火入魔的慕容复（宗师下品），以天波透甲金枪彻底废其战力！',
        onWin: [
          { type: 'giveCombatExp', amount: 150, reason: '杏子林重创慕容复废其大半武功' },
          openScene('scene_fn1_16', JINJUN_FINAL_1_ID),
        ],
      },
    ],
  },
  scene_fn1_16: {
    id: 'scene_fn1_16',
    title: '第十六幕 · 金枪废右肩',
    subtitle: '无锡 · 杏子林核心空地',
    illustrationUrl: '/assets/quests/jinjun_fn1_murongfu_cripple.jpg',
    illustrationCaption: '枪破心魔 · 天波透甲金枪横扫重创慕容复右肩经脉',
    beats: [
      N('你一眼看穿慕容复因心魔入骨而破绽百出的剑路，天波透甲金枪枪杆猛然横扫震开长剑，枪锋顺势贯入其右肩肩井穴！只听骨裂声响起，慕容复惨嚎一声跪倒在地，右臂经脉尽断、大半武功就此废去！'),
      S(MURONGFU, '“啊——！！我的手……我的剑！！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_17', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_17: {
    id: 'scene_fn1_17',
    title: '第十七幕 · 毒烟遁残寇',
    subtitle: '无锡 · 杏子林边缘',
    beats: [
      N('赫连铁树见段延庆吐血、慕容复被废，外围玄甲缇骑已合围杀至，吓得魂飞魄散，急令亲卫引爆数十枚墨绿毒烟弹遮蔽视线，拖着神智渐趋癫狂的慕容复狼狈夺路狂奔。'),
      S(HELIAN, '“快走！护住慕容先生向北突围！”'),
      P('“追！留活口审问西夏兵力部署！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_18', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_18: {
    id: 'scene_fn1_18',
    title: '第十八幕 · 活捉一品堂校',
    subtitle: '无锡 · 杏子林边缘',
    beats: [
      S(GUARD, '“禀都帅！林中一品堂精锐被我军斩杀大半，另活捉了一名知晓内情的一品堂都统！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_19', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_19: {
    id: 'scene_fn1_19',
    title: '第十九幕 · 丐帮群豪醒',
    subtitle: '无锡 · 杏子林',
    beats: [
      N('随军医官迅速配出解药，丐帮诸位长老与数百弟子陆续苏醒，得知大宋殿前都指挥使亲自千里奔袭相救，齐齐起身向你抱拳致谢。'),
      S(QIAOFENG, '“今日若非将军及时赶到，我丐帮上下数百条性命险些全折在此处！此恩此德，乔峰永世不敢相忘！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_20', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_20: {
    id: 'scene_fn1_20',
    title: '第二十幕 · 英雄相惜情',
    subtitle: '无锡 · 杏子林',
    beats: [
      P('“乔帮主侠义盖世，乃我大宋江湖脊梁，岂能坐视西夏鼠辈暗算？今晚无锡松鹤楼，我备好烈酒，定要与乔帮主不醉无归！”'),
      S(QIAOFENG, '“好！不醉无归！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_21', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_21: {
    id: 'scene_fn1_21',
    title: '第二十一幕 · 押俘赴无锡',
    subtitle: '苏州府 · 无锡官道',
    beats: [
      S(GUARD, '“已将那名一品堂都统锁入囚车，押往松鹤楼后院别院严加看管！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_22', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_22: {
    id: 'scene_fn1_22',
    title: '第二十二幕 · 杏林清扫毕',
    subtitle: '苏州府 · 无锡官道',
    beats: [
      P('“先回姑苏松鹤楼会合乔帮主，再连夜审讯这名西夏俘虏。”'),
    ],
    onFinishEffects: [openScene('scene_fn1_23', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_23: {
    id: 'scene_fn1_23',
    title: '第二十三幕 · 城门夜灯迎',
    subtitle: '苏州府 · 城门',
    beats: [
      S(GUARD, '“苏州知府已传令备妥粮草马匹，供殿前司缇骑随时北返。”'),
    ],
    onFinishEffects: [openScene('scene_fn1_24', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_24: {
    id: 'scene_fn1_24',
    title: '第二十四幕 · 松鹤楼在望',
    subtitle: '苏州府 · 临河长街',
    beats: [
      S(QIAOFENG, '“前面便是松鹤楼！今日定要尝尝江南的陈年花雕与太湖银鱼！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_25', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_25: {
    id: 'scene_fn1_25',
    title: '第二十五幕 · 步入松鹤楼',
    subtitle: '苏州府 · 姑苏临河酒楼外',
    onFinishEffects: [setStep(JINJUN_FINAL_1_ID, 'fn1_songhelou_drink')],
    beats: [
      P('“走，上楼！”'),
    ],
  },
  scene_fn1_26: {
    id: 'scene_fn1_26',
    title: '第二十六幕 · 松鹤楼痛饮',
    subtitle: '苏州府 · 姑苏临河酒楼（松鹤楼）',
    illustrationUrl: '/assets/quests/jinjun_fn1_songhelou_drink.jpg',
    illustrationCaption: '松鹤楼夜饮 · 主角与乔峰痛饮三坛烈酒结为生死知己',
    beats: [
      N('松鹤楼雅阁临窗俯瞰灯火点点的运河夜色，你与乔峰屏退闲杂，面对三大坛十斤装陈年烈酒推杯换盏、豪笑震屋。'),
      S(QIAOFENG, '“想不到大宋殿前司竟有将军这等豪迈直爽的真汉子！来，再干此碗！”'),
      P('“乔帮主顶天立地，实乃平生仅见！干！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_27', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_27: {
    id: 'scene_fn1_27',
    title: '第二十七幕 · 互诉平生志',
    subtitle: '苏州府 · 姑苏临河酒楼（松鹤楼）',
    beats: [
      S(QIAOFENG, '“乔某自幼受恩师汪剑通教诲，只盼天下百姓免受刀兵涂炭；将军执掌天子亲军，亦是为了四海升平，你我志向原是一般无二！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_28', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_28: {
    id: 'scene_fn1_28',
    title: '第二十八幕 · 密室审俘虏',
    subtitle: '苏州府 · 松鹤楼后院密室',
    beats: [
      N('三坛酒尽，二人精神反倒愈发矍铄，随即步入后院密室，亲自提审那名被锁在铁椅上的西夏一品堂都统。'),
      P('“赫连铁树堂堂一品堂征东大将军，为何不惜冒着全军覆没之险，也要亲赴江南袭杀丐帮？从实招来！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_29', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_29: {
    id: 'scene_fn1_29',
    title: '第二十九幕 · 调虎离山谋',
    subtitle: '苏州府 · 松鹤楼后院密室',
    illustrationUrl: '/assets/quests/jinjun_fn1_prisoner_confess.jpg',
    illustrationCaption: '密室审俘 · 惊悉西夏十万铁鹞子叩关泾原与慕容博北引大辽',
    beats: [
      N('那一品堂都统在乔峰凌厉目光与禁军刑具威慑下心理彻底崩溃，竹筒倒豆子般吐出惊天秘辛，令你与乔峰瞬间酒意全消、神色骤凛！'),
      S(YIPINTANG_CAPTIVE, '“我说！我说！杏子林根本只是调虎离山！没藏讹庞丞相早已集结十万大军与三千‘铁鹞子’重骑叩关泾原路，专等京营主力南调之际大举破关！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_30', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_30: {
    id: 'scene_fn1_30',
    title: '第三十幕 · 雁门隐狼烟',
    subtitle: '苏州府 · 松鹤楼后院密室',
    beats: [
      S(YIPINTANG_CAPTIVE, '“更……更可怕的是，潜逃北方大辽的慕容博老前辈，已在雁门关外勾结大辽主战派，备下十万契丹铁林大军，只待西北战事一开便南下夹击大宋！”'),
      P('“慕容博！！果然是这老贼！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_31', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_31: {
    id: 'scene_fn1_31',
    title: '第三十一幕 · 急传千里报',
    subtitle: '苏州府 · 松鹤楼',
    beats: [
      P('“八百里加急飞报官家与枢密院！西北泾原岌岌可危，我必须立刻率玄甲缇骑连夜北返京师请战！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_32', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_32: {
    id: 'scene_fn1_32',
    title: '第三十二幕 · 丐帮助耳目',
    subtitle: '苏州府 · 松鹤楼',
    beats: [
      S(QIAOFENG, '“将军放心北返！乔某即刻飞鸽传书河北与雁门关沿线丐帮分舵，严密监视大辽铁林军与慕容博一切动向，但有异动，必亲赴边关相助！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_33', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_33: {
    id: 'scene_fn1_33',
    title: '第三十三幕 · 知己暂别离',
    subtitle: '苏州府 · 城北官道',
    beats: [
      P('“一言为定！西北击退夏虏之后，你我雁门关下再聚首！”'),
    ],
    onFinishEffects: [openScene('scene_fn1_34', JINJUN_FINAL_1_ID)],
  },
  scene_fn1_34: {
    id: 'scene_fn1_34',
    title: '第三十四幕 · 星夜返汴梁',
    subtitle: '中原 · 官道疾驰',
    beats: [
      N('夜风刺骨，两百名玄甲缇骑再度化作一道黑色铁流，马不停蹄直奔东京汴梁。'),
      P('“（好水川旧恨未雪，没藏讹庞竟敢再犯泾原！这一次，有我大宋殿前司与西北老帅种世衡在，定叫夏虏有来无回！）”'),
    ],
    onFinishEffects: [setStep(JINJUN_FINAL_1_ID, 'fn1_return_kaifeng')],
  },
  scene_fn1_35: {
    id: 'scene_fn1_35',
    title: '第三十五幕 · 西北烽火起',
    subtitle: '开封府 · 皇城门外',
    beats: [
      N('杏子林救丐帮、松鹤楼结知己，虽挫败西夏南下阴谋，却也揭开了西北与北疆两线开战的惊天危局。一场决定大宋国运的铁血大战，已然迫在眉睫。'),
      P('“入宫面圣，请缨西征！”'),
    ],
    onFinishEffects: [
      { type: 'giveSilver', amount: 400 },
      { type: 'addArtExp', amount: 3200 },
      { type: 'addSectContribution', amount: 180 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 40 },
      { type: 'modifyRenown', delta: 30 },
      { type: 'modifyChivalry', delta: 20 },
      { type: 'completeQuest', questId: JINJUN_FINAL_1_ID },
    ],
  },
}
