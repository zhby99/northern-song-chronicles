import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE09_QUEST_ID } from './huashanSideZhongnanTaoQuest'

const SPEAKER_QINGXU_DAOIST: StorySpeakerSpec = {
  kind: 'custom',
  name: '清虚道长',
  title: '终南古观观主 · 钟吕前脉高道',
  factionName: '终南前脉道院',
  portraitUrl: '/assets/characters/templates/tpl_taoist_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_taoist_master_av.jpg',
}

const SPEAKER_XUANWEI_DAOIST: StorySpeakerSpec = {
  kind: 'custom',
  name: '玄微道长',
  title: '终南前脉道院知客长老',
  factionName: '终南前脉道院',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
}

const SPEAKER_DUJIUZI: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒鸠子',
  title: '碧磷毒手 · 星宿派西域毒师',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildXingxiuVanguardNpc(index: 1 | 2): NodeNpc {
  const isFirst = index === 1
  return makeQuestNpc({
    id: isFirst ? 'QUEST_HSS09_XINGXIU_VAN_1' : 'QUEST_HSS09_XINGXIU_VAN_2',
    name: isFirst ? '绿烟毒徒焦三' : '腐骨毒徒阴五',
    title: '星宿派 · 碧磷前锋弟子',
    realm: '二流上品',
    factionName: '星宿派',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: isFirst
      ? '“终南牛鼻子炼的什么狗屁金莲丹？尝尝老仙赐下的碧磷腐尸散！”'
      : '“华山小道士敢管星宿派的闲事？教你浑身化作脓水！”',
    stats: isFirst
      ? { hp: 1740, mp: 1620, agi: 55, res: 42 }
      : { hp: 1700, mp: 1580, agi: 54, res: 41 },
    talents: { bone: 68, comprehension: 58, charm: 22 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-055', move2: 'MA-086' },
    learnedArts: [
      { artId: 'MA-103', level: 6 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-055', level: 5 },
      { artId: 'MA-086', level: 5 },
    ],
    equipped: { weapon: 'WPN-021' },
    questBadgeLabel: '星宿毒徒',
  })
}

function buildDujiuziNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS09_DUJIUZI',
    name: '毒鸠子',
    title: '碧磷毒手 · 星宿派西域毒师',
    realm: '一流中品',
    factionName: '星宿派',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“狮吼师兄震慑其心神，看我碧磷毒掌蚀穿你的华山护体真气！”',
    stats: { hp: 3060, mp: 2880, agi: 68, res: 56 },
    talents: { bone: 74, comprehension: 78, charm: 24 },
    equippedArts: { neigong: 'MA-085', qinggong: 'MA-056', move1: 'MA-055', move2: 'MA-086' },
    learnedArts: [
      { artId: 'MA-085', level: 7 },
      { artId: 'MA-056', level: 6 },
      { artId: 'MA-055', level: 8 },
      { artId: 'MA-086', level: 7 },
    ],
    equipped: { weapon: 'WPN-021' },
    questBadgeLabel: '碧磷毒手',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss09_01: {
    id: 'scene_hss09_01',
    title: '第一幕 · 终南赴会',
    subtitle: '终南古观 · 清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}秋高气爽，终南山松柏苍翠，云岚缭绕于古刹飞檐之间。承继唐末钟离权、吕洞宾内丹一脉的【终南古观】正迎来三年一度的关中玄门论道大会，八方高道云集清修主殿。'),
      N('你奉华山师门之命，携希夷陈抟祖师旧注经卷赴会。古观观主清虚道长与知客玄微道长早已候于殿阶前，见你气度清雅、剑意内敛，双双稽首微笑。'),
      S(SPEAKER_QINGXU_DAOIST, '“无量寿佛！华山陈抟希夷先生昔年常与终南前脉诸位先师煮茶论易，两山同源久矣。听闻贵派新秀经义渊博、辩才无碍，今日便请上座共论《阴符》《参同》与剑道动静之理！”'),
      P('（稽首还礼）“晚辈微末之学，蒙终南前脉道院厚爱相邀，敢不虚心向诸位高道请益！”'),
    ],
    choices: [
      {
        id: 'hss09_01_next',
        label: '随清虚道长步入清修主殿，观瞻论道席次',
        tone: 'gold',
        effects: [openScene('scene_hss09_02', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_02: {
    id: 'scene_hss09_02',
    title: '第二幕 · 钟吕希夷',
    subtitle: '终南古观清修主殿 · 论题初定',
    mandatory: true,
    beats: [
      N('主殿之中檀烟袅袅，三十余位关中道观掌教分坐蒲团之上。殿前供奉着一盏象征钟吕内丹心法的「金莲净火青铜灯」，尚未点燃，待三日论道圆满方启净火法仪。'),
      S(SPEAKER_XUANWEI_DAOIST, '“本届论道主旨，乃辨析‘静坐内丹’与‘以武入道’孰为正途。终南前脉道院多主静修炼己，听闻华山以三尺青锋证无极希夷之道，还请华山高徒先开金口。”'),
      P('“既蒙诸位前辈垂询，晚辈便抛砖引玉，以华山希夷祖师所传阴阳动静之理就教于大方！”'),
    ],
    choices: [
      {
        id: 'hss09_02_start',
        label: '整衣登坛入座，开启三日终南论道',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE09_QUEST_ID, stepId: 'dao_debate' },
          toast('已开启《终南论道 · 金莲净火劫》！请于【终南古观 > 清修主殿】坐而论经！', 'success', '终南论道'),
        ],
      },
    ],
  },

  scene_hss09_03: {
    id: 'scene_hss09_03',
    title: '第三幕 · 动静之辨',
    subtitle: '终南古观清修主殿 · 经义交锋',
    mandatory: true,
    beats: [
      N('论道次日，殿内辩风渐炽。一名专修枯禅导引的道人抚须发难：“剑乃凶器，一动则心火生、真气散，如何能与钟吕内丹清静无为相合？华山以剑入道，莫非流于俗世争勇斗狠之末流？”'),
      N('满殿高道目光齐齐落在你身上。清虚道长亦含笑颔首，静待你如何破此一问。'),
    ],
    choices: [
      {
        id: 'hss09_03_next',
        label: '沉吟片刻，引陈抟希夷心法与剑理登坛作答',
        tone: 'primary',
        effects: [openScene('scene_hss09_04', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_04: {
    id: 'scene_hss09_04',
    title: '第四幕 · 终南论道',
    subtitle: '终南古观清修主殿 · 折服玄门',
    illustrationUrl: '/assets/quests/hs_side09_dao_debate.jpg',
    illustrationCaption: '终南论道 · 古观大殿坐而论经，陈抟阴阳剑理折服关中玄门',
    mandatory: true,
    beats: [
      N('你徐徐起身，朗声环顾满殿高道，声音清越如古磬回响于梁柱之间——'),
    ],
    choices: [
      {
        id: 'hss09_04_scripture',
        label: '【经义破题】引陈抟《无极图》“动极而静、静极生动”，阐明剑势即阴阳流转！',
        subLabel: '以深厚道藏经义折服诸位高道',
        tone: 'gold',
        effects: [openScene('scene_hss09_05', HUASHAN_SIDE09_QUEST_ID)],
      },
      {
        id: 'hss09_04_eloquence',
        label: '【辩才论剑】喻钟吕内丹如炉中金莲净火，华山长剑恰为护道除魔之清风！',
        subLabel: '以妙语连珠之辩才令全场抚掌赞叹',
        tone: 'primary',
        effects: [openScene('scene_hss09_05', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_05: {
    id: 'scene_hss09_05',
    title: '第五幕 · 毒岚骤起',
    subtitle: '终南古观清修主殿 · 暮色惊变',
    mandatory: true,
    beats: [
      N('一番妙论娓娓道来，既通钟吕炼己内丹之微言，又合华山希夷剑道之大义！先前发难的道人听得频频颔首，起身深深稽首致敬；清虚道长更是抚掌大笑：“妙极！静能养金莲，动能斩妖邪，华山门下果有大才！”'),
      N('转眼便至第三日黄昏，众道正欲移步殿外丹墀北斗坪点亮「金莲净火」古灯，忽听山门外传来一阵震耳欲聋的狂笑与铜钹嘶鸣！紧接着，一股刺鼻腥臭的青绿色毒烟顺着石阶翻滚上山，两名守山年轻道童口吐白沫踉跄跌入殿门！'),
      S(SPEAKER_XUANWEI_DAOIST, '（大惊失色，急忙扶起中毒道童）“不好！这是西域星宿海的碧磷毒烟！山外丹墀上有人强闯道观！”'),
    ],
    choices: [
      {
        id: 'hss09_05_next',
        label: '按剑疾步抢出殿门，直望丹墀来犯恶客',
        tone: 'danger',
        effects: [openScene('scene_hss09_06', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_06: {
    id: 'scene_hss09_06',
    title: '第六幕 · 狂狮闹观',
    subtitle: '终南古观 · 星宿派强闯',
    mandatory: true,
    beats: [
      N('只见殿外丹墀北斗坪上浓烟滚滚，十余名身着紫黑怪袍的星宿派弟子手执毒幡乱舞。为首一名身高八尺、满头赤发如狮鬃的凶悍大汉正双手高举一对泛着墨绿毒光的沉重铜钹，赫然便是星宿派「狂狮护法」狮吼子！'),
      S('NPC-0231', '“哈哈哈哈！什么关中玄门论道、钟吕内丹？一群躲在终南山啃草根的臭老道，炼一百年丹也抵不过咱们星宿老仙半把化功毒粉！今儿老子便拿你们的金莲古灯来试一试我这对碧磷毒铜钹！”'),
      N('两名前去劝阻的终南长老刚递出拂尘，便被狮吼子一声震天狂吼配毒掌震得口喷鲜血、委顿于地！清虚道长气得须发皆张，正欲拼死上前，你已横剑一步拦在众道身前！'),
      P('（剑锋清吟出鞘，朗声喝道）“清虚道长请先替受伤道友运功逼毒！星宿妖人辱我道门清修之地，华山弟子岂能坐视！”'),
    ],
    choices: [
      {
        id: 'hss09_06_go',
        label: '提剑踏上丹墀北斗坪，迎击狂嚣来犯的星宿毒徒！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE09_QUEST_ID, 'dipper_vanguard'),
          openScene('scene_hss09_07', HUASHAN_SIDE09_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss09_07: {
    id: 'scene_hss09_07',
    title: '第七幕 · 毒徒拦阶',
    subtitle: '终南古观 · 丹墀北斗坪',
    mandatory: true,
    beats: [
      N('你大步踏上青石丹墀，周身清正内息激荡，竟将扑面而来的碧磷毒烟硬生生逼开三尺！'),
      S('NPC-0231', '（斜睨你一眼，讥笑拍钹）“哟，终南牛鼻子自己不敢出头，倒推个华山派的小娃娃来送死？焦三、阴五，先拿你们的碧磷腐尸掌把这小子的手脚化了！”'),
      N('两名星宿前锋恶徒怪笑一声，挥舞漆黑毒爪一左一右扑上石阶！'),
    ],
    choices: [
      {
        id: 'hss09_07_next',
        label: '屏息凝气避开毒雾，挥剑迎击两名星宿毒徒前锋',
        tone: 'danger',
        effects: [openScene('scene_hss09_08', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_08: {
    id: 'scene_hss09_08',
    title: '第八幕 · 剑扫碧磷',
    subtitle: '丹墀北斗坪 · 击溃毒阵前锋',
    mandatory: true,
    beats: [
      P('“星宿邪毒也敢在终南清净地肆虐？看剑！”'),
      N('青锋化作一片璀璨剑幕，以气御风卷散腥臭毒粉，直取两名星宿恶徒要害！'),
    ],
    choices: [
      {
        id: 'hss09_08_fight',
        label: '清风剑气散毒雾，击溃星宿派前锋毒徒！',
        subLabel: '生死决战 · 星宿派毒徒前锋（二流上品 ×2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuVanguardNpc(1) },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuVanguardNpc(2) }],
            rule: 'duel',
            forbidEscapeReason: '终南古观受伤高道皆在身后，半步不可退让！',
            deathTitle: '毒蚀终南丹墀',
            deathDetail: '你在终南古观丹墀迎战星宿派前锋毒徒时不慎吸入碧磷剧毒，力竭身亡。',
            onWin: [openScene('scene_hss09_09', HUASHAN_SIDE09_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss09_09: {
    id: 'scene_hss09_09',
    title: '第九幕 · 铜钹狮吼',
    subtitle: '丹墀北斗坪 · 狂狮暴怒',
    mandatory: true,
    beats: [
      N('剑光掠过，两名星宿前锋恶徒惨叫着倒飞下石阶，手中毒囊尽碎！狮吼子见门下丢了颜面，赤发根根倒竖，双手毒铜钹猛然一合——'),
      N('“哐——嗡——！”一声刺耳欲裂的魔音夹杂着腥绿毒风横扫丹墀，震得殿檐风铃纷纷碎裂！与此同时，狮吼子身侧一名阴鸷枯瘦的星宿西域毒师「碧磷毒手」毒鸠子悄然滑步而出，双掌泛起幽幽鬼火般的碧磷毒芒！'),
      S('NPC-0231', '“好个牙尖嘴利的华山小辈！毒鸠师弟，别跟{gender:他|她}讲什么单打独斗，咱们师兄弟一块儿上，把这华山小子的骨头震碎、喂给老仙的毒虫！”'),
      S(SPEAKER_DUJIUZI, '“嘿嘿，正合我意！且看你如何接下狮吼音功与碧磷毒掌的夹击！”'),
    ],
    choices: [
      {
        id: 'hss09_09_boss',
        label: '稳守灵台不受魔音所惑，举剑直指狮吼子与毒鸠子！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_SIDE09_QUEST_ID, 'dipper_shihouzi'),
          openScene('scene_hss09_10', HUASHAN_SIDE09_QUEST_ID),
        ],
      },
    ],
  },

  scene_hss09_10: {
    id: 'scene_hss09_10',
    title: '第十幕 · 净火破邪',
    subtitle: '终南古观丹墀 · 太岳三青峰',
    illustrationUrl: '/assets/quests/hs_side09_shihouzi_clash.jpg',
    illustrationCaption: '净火破邪 · 丹墀之上浩然太岳剑势斩断狮吼子毒铜钹将其逐山',
    mandatory: true,
    beats: [
      N('暮色如血，终南山风忽起！狮吼子狂啸扑来，一对重达数十斤的毒铜钹挟着震魂音浪当头合拍；毒鸠子则趁隙自侧翼疾掠，双掌碧磷毒焰直扑你的肋下空门！'),
      P('（想起方才殿中所论陈抟阴阳剑理，胸中浩然正气沛然勃发，三尺青锋骤然绽出三叠浩荡青芒）“静如金莲净火，动若太岳三峰——星宿邪祟，接我一剑！”'),
    ],
    choices: [
      {
        id: 'hss09_10_duel',
        label: '催动浩然《太岳三青峰》，丹墀力战狮吼子与毒鸠子！',
        subLabel: '生死决战 · 狮吼子（一流下品） + 碧磷毒手毒鸠子（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE09_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0231' },
            extraOpponents: [{ kind: 'custom', npc: buildDujiuziNpc() }],
            rule: 'duel',
            forbidEscapeReason: '狂狮魔音与碧磷毒掌已封死丹墀退路，唯以浩然剑势一举破邪！',
            deathTitle: '陨身终南丹墀',
            deathDetail: '你在终南古观丹墀独战星宿派狮吼子与碧磷毒手毒鸠子，终遭音毒合击重创不治。',
            onWin: [openScene('scene_hss09_11', HUASHAN_SIDE09_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss09_11: {
    id: 'scene_hss09_11',
    title: '第十一幕 · 剑断毒钹',
    subtitle: '丹墀北斗坪 · 浩然镇邪',
    mandatory: true,
    beats: [
      N('《太岳三青峰》三剑连环如西岳绝壁崩云压顶！第一剑震散毒鸠子漫天碧磷毒火，将其连人带掌劲劈飞三丈摔下石阶；第二剑破开狮吼子护身狂音；第三剑势若雷霆，正正劈在狮吼子举起格挡的沉重毒铜钹中央！'),
      N('“锵啷——！”金铁裂鸣响彻终南山谷！那对淬满剧毒的沉重青铜大钹竟被浩然剑气硬生生斩作两半，残片翻飞间反震得狮吼子双臂虎口崩裂、鲜血狂涌，连退七步撞碎了丹墀石栏！'),
    ],
    choices: [
      {
        id: 'hss09_11_next',
        label: '横剑冷视重伤吐血的狮吼子，喝令星宿妖人滚出终南山',
        tone: 'gold',
        effects: [openScene('scene_hss09_12', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_12: {
    id: 'scene_hss09_12',
    title: '第十二幕 · 狂狮败遁',
    subtitle: '终南古观山门 · 逐邪下山',
    mandatory: true,
    beats: [
      S('NPC-0231', '（捂着震伤的胸口咳出一口逆血，看着地上断成两截的毒铜钹，又惊又怒）“好……好霸道的华山太岳剑气！小子，今儿算你狠，终南山这笔账，老子与星宿派记下了！”'),
      N('见势不妙，狮吼子不敢再战，一把拽起爬起来的毒鸠子，反手掷出三枚浓烈紫黑烟弹遮住视线，领着残余星宿毒徒连滚带爬逃下终南山道，狼狈远遁而去！'),
      N('你并未冒进追入深林防其暗毒埋伏，只清啸一声挥袖荡开残余紫烟，护住山门安然无恙。'),
    ],
    choices: [
      {
        id: 'hss09_12_next',
        label: '收剑返身，关切察看清虚道长与受伤道友伤势',
        tone: 'primary',
        effects: [openScene('scene_hss09_13', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_13: {
    id: 'scene_hss09_13',
    title: '第十三幕 · 金莲重明',
    subtitle: '终南古观清修主殿 · 玄门致谢',
    mandatory: true,
    beats: [
      N('晚风吹散最后几缕腥气，终南山头繁星初现。清虚道长与玄微道长已用本观秘药稳住受伤长老毒势，率领满殿三十余位关中道观掌教齐齐步出丹墀，向你郑重稽首大礼！'),
      S(SPEAKER_QINGXU_DAOIST, '“无量寿佛！方才殿上论道，少侠以‘静能养金莲、动能斩妖邪’折服众道；转眼便在丹墀之上以浩然剑气斩断狮吼子毒铜钹、逐退星宿群魔！此等知行合一之境界，真乃陈抟希夷祖师再传气象！”'),
      N('在众道齐诵清净经声中，清虚道长亲手点亮了丹墀中央的「金莲净火」青铜古灯，澄澈温暖的灯焰照亮了夜色下的终南古观。'),
    ],
    choices: [
      {
        id: 'hss09_13_next',
        label: '稽首还礼，与终南前脉诸位高道辞别',
        tone: 'gold',
        effects: [openScene('scene_hss09_14', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],
  },

  scene_hss09_14: {
    id: 'scene_hss09_14',
    title: '第十四幕 · 青玉赠佩',
    subtitle: '终南古观 · 两山同契',
    mandatory: true,
    beats: [
      S(SPEAKER_QINGXU_DAOIST, '“华山与终南本是秦岭双璧，今日承少侠救观护道之恩，这枚古观珍藏的【终南青玉道冠佩】与两瓶【大理段氏犀角解毒丸】，以及关中诸观合赠的九十两程仪香资，还请少侠切莫推辞！”'),
      N('你接过温润澄澈的青玉道冠佩，回望终南古观丹墀上明灭不息的金莲净火，只觉经义剑心融为一炉，《太岳三青峰》的浩然正气更添三分圆融浑厚。'),
    ],
    choices: [
      {
        id: 'hss09_14_finish',
        label: '稽首谢过终南高道厚赐，收佩下山返归华山',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 90, reason: '关中玄门诸观合赠护道程仪' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'giveCombatExp', amount: 1550, reason: '终南丹墀剑断毒铜钹逐退星宿狮吼子' },
          { type: 'modifyRenown', delta: 35, reason: '终南论道折服玄门并击退星宿派闯山' },
          { type: 'modifyChivalry', delta: 25, reason: '挺身护住终南古观道友免遭星宿毒手' },
          { type: 'addArtExp', artId: 'MA-049', amount: 420 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'giveItem', itemId: 'ACC-024', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-116', qty: 2 },
          { type: 'completeQuest', questId: HUASHAN_SIDE09_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《终南论道 · 金莲净火劫》！获纹银 90 两、贡献 100、终南青玉道冠佩、犀角解毒丸与《太岳三青峰》精进！',
            'success',
            '净火破邪',
          ),
        ],
      },
    ],
  },
}
