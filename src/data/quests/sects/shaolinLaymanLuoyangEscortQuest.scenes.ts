import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q18_QUEST_ID } from './shaolinLaymanLuoyangEscortQuest'

const SPEAKER_MOLE_CARTER: StorySpeakerSpec = {
  kind: 'custom',
  name: '刘四',
  title: '镖队新雇车夫 · 西夏暗桩',
  factionName: '金刀王家',
  portraitUrl: '/assets/characters/templates/tpl_jindaomen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jindaomen_male_av.jpg',
}

const SPEAKER_WATER_BANDIT: StorySpeakerSpec = {
  kind: 'custom',
  name: '截江水魁 · 翻浪彪',
  title: '黄河水匪头目',
  factionName: '黄河水匪',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_TUOBA_LIE: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋烈',
  title: '西夏游骑百夫长',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_XIXIA_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '党项铁骑副将 · 野利虎',
  title: '西夏潜哨精锐',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

function buildWaterBanditLead(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_BANDIT_LEAD',
    name: '截江水魁 · 翻浪彪',
    title: '黄河水匪头目',
    realm: '二流下品',
    factionName: '黄河水匪',
    sectRank: 0,
    sectRankLabel: '水匪头目',
    avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
    talk: '“金刀王家铸的千斤紫金佛，熔了够弟兄们吃喝三辈子！秃驴与护镖的都给老子滚下伊水喂鱼！”',
    stats: { hp: 1320, mp: 920, agi: 45, res: 29 },
    talents: { bone: 62, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-151', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-121', level: 5 }, { artId: 'MA-151', level: 5 }, { artId: 'MA-145', level: 5 }],
  })
}

function buildWaterBanditMate(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_BANDIT_MATE',
    name: '水鬼二当家 · 铁篙陈',
    title: '黄河水匪副首',
    realm: '三流上品',
    factionName: '黄河水匪',
    sectRank: 0,
    sectRankLabel: '水匪副首',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“大哥截前车，俺来斩断马缰！休叫佛像过了龙门桥！”',
    stats: { hp: 960, mp: 620, agi: 41, res: 24 },
    talents: { bone: 56, comprehension: 38, charm: 22 },
    equippedArts: { neigong: 'MA-179', move1: 'MA-192', move2: 'MA-182' },
    learnedArts: [{ artId: 'MA-179', level: 4 }, { artId: 'MA-192', level: 4 }, { artId: 'MA-182', level: 4 }],
  })
}

function buildTuobaLieBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_TUOBA_LIE',
    name: '拓跋烈',
    title: '西夏游骑百夫长',
    realm: '二流上品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '西夏百夫长',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“大宋和尚也敢挡我党项铁骑的弯刀？这尊紫金佛像，本百夫长便替兴庆府一品堂笑纳了！”',
    stats: { hp: 1880, mp: 1480, agi: 53, res: 39 },
    talents: { bone: 70, comprehension: 56, charm: 40 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-133', move2: 'MA-135' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-133', level: 7 }, { artId: 'MA-135', level: 6 }],
  })
}

function buildXixiaScout(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ18_XIXIA_SCOUT',
    name: '党项铁骑副将 · 野利虎',
    title: '西夏潜哨精锐',
    realm: '二流中品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '西夏副将',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“百夫长莫与宋人废话，斩了这护法小将，立刻拖走佛车！”',
    stats: { hp: 1460, mp: 1080, agi: 48, res: 33 },
    talents: { bone: 64, comprehension: 48, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-133', move2: 'MA-131' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-133', level: 6 }, { artId: 'MA-131', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq18_01: {
    id: 'scene_slq18_01',
    title: '第一幕 · 金刀正气',
    subtitle: '洛阳府 · 金刀王家正气大厅',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，洛阳桂香弥漫。你奉嵩山飞鸽调令策马西行三百里，直奔威震河洛的【金刀王家】。正气大厅檀烟袅袅，须发如银的金刀家主【王元霸】正与白马寺「大韦陀僧」【玄悲】大师对坐烹茶。'),
      S('NPC-0186', '（起身朗笑相迎）“哈哈！玄悲大师瞧瞧，嵩山派来的是何等人物！{ifFlag:sl_q17_market_saved|汴京相国寺退赃护商、一夜荡平青蛇帮的义举连洛阳茶楼都在传扬！|汴京相国寺单人独刃荡平青蛇帮的威名，早已传到我河洛啦！}”'),
      S('NPC-0157', '（合十颔首）“阿弥陀佛。十年前少林药王院高僧曾冒雪救下王老施主幼孙，老施主遍采河洛紫金铸成千斤释迦佛像一尊，欲合两家之力护送入嵩山供奉。只是近日伊水风声骤紧——”'),
      N('话音未落，白马寺武僧【虚净】与【虚慧】疾步入厅禀报：洛水渡口有陌生胡商高价购走数十匹北地骏马与铁蒺藜，行踪直指伊阙龙门石窟，极可能是黄河水匪勾结潜入中原的西夏游骑斥候！'),
      S('NPC-0186', '（拍案怒喝，复炯炯望向你）“西夏贼子竟敢把手伸到洛阳城脚下！老夫坐镇洛阳防其调虎离山，玄悲大师押阵中车，前锋护镖总调度便交予你与虚净、虚慧！只是开镖之前，老夫倒想听听少林俗家护法的行镖之见——此去龙门，你以为成败最系于何处？”'),
    ],
    choices: [
      {
        id: 'slq18_creed_wit',
        label: '【谋定后动 · 避实击虚】走镖重在保全佛宝与弟兄性命，当善用耳目谋略拆解伏兵！（禅心慈悲 +1）',
        subLabel: '移步【金刀石锁演武中庭】点验镖车、细查暗患',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q18_QUEST_ID, stepId: 'courtyard_muster' },
          { type: 'setFlag', flag: 'sl_q18_creed', value: 'wit' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          setStep(SHAOLIN_Q18_QUEST_ID, 'courtyard_muster'),
          toast('已开启《洛阳护镖 · 金刀少林》！请移步【金刀石锁演武中庭】点验镖车定策！', 'talk', '洛阳护镖'),
        ],
      },
      {
        id: 'slq18_creed_bold',
        label: '【金刀开路 · 狭路亮剑】佛门重宝堂堂正正入嵩山，谁敢截桥便叫他折戟伊水！（怒目杀业 +1）',
        subLabel: '移步【金刀石锁演武中庭】整肃骑队、磨刀启程',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q18_QUEST_ID, stepId: 'courtyard_muster' },
          { type: 'setFlag', flag: 'sl_q18_creed', value: 'bold' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          setStep(SHAOLIN_Q18_QUEST_ID, 'courtyard_muster'),
          toast('已开启《洛阳护镖 · 金刀少林》！请移步【金刀石锁演武中庭】点验镖车定策！', 'talk', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_02: {
    id: 'scene_slq18_02',
    title: '第二幕 · 中庭定策',
    subtitle: '金刀王家 · 金刀石锁演武中庭（护镖三策）',
    illustrationUrl: '/assets/quests/sl_18_longmen_escort.jpg',
    illustrationCaption: '伊阙古道 · 金刀王家镖旗与少林护佛车队并辔南行',
    mandatory: true,
    beats: [
      N('金刀石锁演武中庭内，一辆由四匹青骡挽拉的铁木重车覆盖明黄织锦佛幔，二十名佩金背大刀的王家趟子手牵马肃立。玄悲大师手执一柄暗沉古朴的精钢重杵立于车侧，沉稳如山。'),
      S('NPC-0186', '（拍了拍铁梨木车辕，递过一卷路引舆图与车队草料支应单）“过伊阙龙门石桥时石道收窄，双列马队须变单骑护卫，最易遭伏！好在洛阳至伊阙水陆交错，如何排兵行镖，全凭少侠裁断。”'),
      N('你绕车检验绳索与支应单，敏锐察觉两处机微：其一，舆图西侧有一条干涸秋水露出的浅滩旧道，若遣空车打大旗走东岸官道，真佛车可趁暮雾轻骑换道；其二，支应单上草料银两竟凭空多出一笔「三斤火油松脂」，而末车旁那名新雇的车夫刘四正频频偷瞥佛幔、指节发白！'),
      S('NPC-0667', '（策马凑近低声请示）“{gender:师兄|师姐}，辰时三刻将至，咱们这趟金刀少林重镖究竟如何走法？”'),
    ],
    choices: [
      {
        id: 'slq18_plan_decoy',
        label: '【明修栈道 · 暗渡陈仓】遣空车高举金刀大旗走官道诱敌，轻骑护真佛像绕浅滩换道！',
        subLabel: '骑术 ≥ 35 免费亲率轻骑诱敌，否则花 30 两雇老练探马；跳过外围伏兵直战拓跋烈 1v1（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【骑术】≥ 35 或银钱 ≥ 30 两',
          conditions: [
            { type: 'skillAtLeast', key: '骑术', min: 35 },
            { type: 'silverAtLeast', min: 30 },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'skillAtLeast', key: '骑术', min: 35 },
            thenEffects: [
              toast('你凭精湛骑术亲调王家快马假车诱敌，不费分文便瞒过伊水耳目！', 'success', '暗渡陈仓'),
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q18_scout_paid', op: 'falsy' },
                thenEffects: [
                  { type: 'giveSilver', amount: -30, reason: '洛阳雇佣老练驿路探马假车诱敌、暗渡龙门' },
                  { type: 'setFlag', flag: 'sl_q18_scout_paid', value: true },
                ],
                elseEffects: [],
              },
            ],
          },
          { type: 'setFlag', flag: 'sl_q18_plan', value: 'decoy' },
          { type: 'setFlag', flag: 'sl_q18_pirates_cleared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq18_03', SHAOLIN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'slq18_plan_mole',
        label: '【算术验单 · 揪出内鬼】核破草料单里三斤火油松脂的账目破绽，当场拿下西夏收买的车夫！',
        subLabel: '绑走内鬼夺其西夏联络响箭，反误导外围伏兵直战拓跋烈 1v1（禅心慈悲 +1）',
        tone: 'gold',
        condition: { type: 'skillAtLeast', key: '算术', min: 40 },
        effects: [
          { type: 'setFlag', flag: 'sl_q18_plan', value: 'mole' },
          { type: 'setFlag', flag: 'sl_q18_mole_caught', value: true },
          { type: 'setFlag', flag: 'sl_q18_pirates_cleared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq18_04', SHAOLIN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'slq18_plan_frontal',
        label: '【金刀少林 · 正面硬闯】堂堂佛宝岂避宵小！金刀大旗开道，直闯伊阙龙门石桥！',
        subLabel: '无门槛正攻：先后车轮连战黄河水匪与西夏双将（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q18_plan', value: 'frontal' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq18_05', SHAOLIN_Q18_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq18_03: {
    id: 'scene_slq18_03',
    title: '第三幕 · 假车诱敌',
    subtitle: '洛阳南郊 · 浅滩暗道（暗渡陈仓线）',
    mandatory: true,
    beats: [
      S('NPC-0186', '（抚掌大笑，连赞三声好）“兵不厌诈！老夫这就调出两辆空铁木车蒙上明黄佛幔，让十名嗓门最亮的趟子手打着金刀大旗沿东岸官道招摇南下！”'),
      N('{ifFlag:sl_q18_scout_paid|你散银三十两重金雇来洛阳最老练的驿路探马前出引路，将沿途暗哨摸得一清二楚；|你翻身上马亲率轻骑前出探明西岸浅滩旧道，控缰疾驰如臂使指，连虚净、虚慧亦叹服不已；}真紫金佛车卸去铃铛、裹毡防响，由玄悲大师坐镇中车悄然南赴白马寺汇合！'),
      S('NPC-0157', '（合十颔首）“善哉！不战而分敌势，免却无数趟子手与水匪无谓伤亡，此乃护法大智。车队先往白马寺大佛宝殿净水洒扫，再借暮霭速过伊阙！”'),
      N('王元霸递来金刀通行铜牌，叮嘱河洛众趟子手尽听你与玄悲号令。镖车滚滚，径向白马寺古驿而去。'),
    ],
    choices: [
      {
        id: 'slq18_decoy_to_baima',
        label: '暗护真佛车前往【白马寺 · 白马大佛宝殿】汇合南下伊阙',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q18_QUEST_ID, 'longmen_ambush'),
          toast('假车诱敌已布妥！请前往【白马寺 · 白马大佛宝殿】汇合启程南下伊阙！', 'success', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_04: {
    id: 'scene_slq18_04',
    title: '第三幕 · 验单擒奸',
    subtitle: '金刀石锁演武中庭（算术查内鬼线）',
    mandatory: true,
    beats: [
      P('（抖开草料支应单，手指逐行冷笑点算）“四匹青骡、二十匹健马，一日草料折银四两二钱，怎会多出三斤绝非饲马所用的火油松脂？刘四，你袖袋里鼓鼓囊囊藏的，莫非就是烧佛车的火折与西夏联络响箭？”'),
      N('话音未落，你箭步欺近一把扣住末车车夫刘四脉门、掀开其马褂——火折、两支西夏狼头紫烟响箭与二十两党项碎银叮当滚落青砖！'),
      S(SPEAKER_MOLE_CARTER, '（双膝发软跪地讨饶）“老爷饶命！小人一时鬼迷心窍收了西夏百夫长拓跋烈的银子，约定车队入龙门峡口便放火惊马、射狼头紫烟箭招黄河水匪与党项游骑两面合围！”'),
      S('NPC-0186', '（惊怒交加，挥手命家丁将内鬼五花大绑锁入柴房，转而向你深深一揖）“好险！若非少侠心细如发、精于算术，车队在龙门桥头必遭背后放火全军覆没！这支狼头响箭便由少侠收执，待到伊阙反将贼人一军！”'),
    ],
    choices: [
      {
        id: 'slq18_mole_to_baima',
        label: '收起狼头响箭，护车前往【白马寺 · 白马大佛宝殿】汇合南下',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q18_QUEST_ID, 'longmen_ambush'),
          toast('已提前拔除西夏暗桩并缴获联络响箭！请前往【白马寺 · 白马大佛宝殿】汇合启程！', 'success', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_05: {
    id: 'scene_slq18_05',
    title: '第三幕 · 刀禅并辔',
    subtitle: '洛阳南郊官道（正面硬闯线）',
    mandatory: true,
    beats: [
      S('NPC-0186', '（递来金刀王家通行铜牌，豪气干云）“好胆识！金刀门与少林寺百年交好，今日便高举金刀大旗堂堂正正走这一趟，让天下绿林与西夏胡骑看看『金刀少林』四字的分量！”'),
      N('辰时三刻，金刀镖旗猎猎迎风，白马寺诵经钟声遥遥相送。你策马居前，玄悲大师怀抱古朴乌金重杵坐镇中车，虚净、虚慧分守两翼，浩浩荡荡出洛阳南门直奔白马寺古驿。'),
      S('NPC-0737', '（遥指前方两山夹峙、林鸟惊飞的伊阙峡口，沉声示警）“{gender:师兄|师姐}留神，水面无舟、芦苇微动，黄河水匪与西夏游骑多半已在伊阙龙门桥头布下杀阵！”'),
    ],
    choices: [
      {
        id: 'slq18_frontal_to_baima',
        label: '护车前往【白马寺 · 白马大佛宝殿】汇合并直闯伊阙龙门',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q18_QUEST_ID, 'longmen_ambush'),
          toast('镖车已整肃完毕！请前往【白马寺 · 白马大佛宝殿】汇合启程，硬闯伊阙龙门！', 'talk', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_06: {
    id: 'scene_slq18_06',
    title: '第四幕 · 桥头扫匪',
    subtitle: '伊阙龙门石桥北口（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('车队自白马大佛宝殿洒净启行，方驶入千佛林立的伊阙龙门古道，芦苇荡中骤然响箭破空！七八条快船冲岸，数十名黄河水匪挥鬼头刀与分水铁篙嚎叫杀上石桥北口！'),
      S(SPEAKER_WATER_BANDIT, '（横刀立于桥头狞笑咆哮）“王元霸老儿铸的千斤紫金佛，熔了够弟兄们吃喝三辈子！秃驴与护镖的统统滚下伊水喂王八！”'),
      S('NPC-0157', '（立于佛车前稳如泰山）“虚净、虚慧随趟子手结圆阵护住佛车与青骡！{gender:师侄|女施主}，这伙水匪乃是诱饵前锋，背后必有西夏劲敌——速斩其首，打开桥路！”'),
    ],
    choices: [
      {
        id: 'slq18_fight_bandits',
        label: '策马挺刃，车轮连战【翻浪彪】与【铁篙陈】！（车轮连战 实战）',
        subLabel: '击溃黄河水匪前锋，夺回龙门石桥通道',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWaterBanditMate() },
            extraOpponents: [{ kind: 'custom', npc: buildWaterBanditLead() }],
            rule: 'story_trial',
            forbidEscapeReason: '千斤紫金佛像正在身后石桥之上，半步不可退让！',
            introText: '【车轮连战 · 桥头扫匪】迎战黄河水匪副首【铁篙陈】与头目【翻浪彪】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q18_pirates_cleared', value: true },
              openScene('scene_slq18_07', SHAOLIN_Q18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('水匪刀篙凶猛，暂退佛车阵前调匀气息再战！', 'warn', '龙门血战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq18_07: {
    id: 'scene_slq18_07',
    title: '第五幕 · 韦陀抛杵',
    subtitle: '伊阙龙门石桥 · 危局授绝学',
    illustrationUrl: '/assets/quests/sl_18_weituo_bridge.jpg',
    illustrationCaption: '龙门石桥 · 玄悲抛赠少林韦陀伏魔杵，危局破格点拨《韦陀杵》力战拓跋烈',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q18_plan=decoy|东岸官道远方隐隐传来喊杀声——黄河水匪与西夏副将野利虎果然尽数扑向了空车诱饵！岂料西夏百夫长【拓跋烈】极为老辣，察觉官道车辙轻浅有异，竟率亲随斜刺杀至龙门石桥截住真佛车！|}{ifFlagEq:sl_q18_plan=mole|车队甫抵龙门峡口，你抢先朝西山荒崖射出缴获的西夏狼头紫烟箭——翻浪彪与野利虎伏兵尽数被引往西麓空扑一场！唯有百夫长【拓跋烈】听出重车实蹄，怒吼着单骑疾冲上龙门石桥！|}{ifFlagEq:sl_q18_plan=frontal|翻浪彪被你震落伊水、铁篙陈断篙抱头鼠窜，然桥南骤然马蹄如雷——西夏百夫长【拓跋烈】与副将【野利虎】率黑铁札甲党项铁骑狂飙杀出，漫天狼牙箭将趟子手压制在佛车旁！|伊阙龙门石桥骤起马蹄惊雷，西夏游骑百夫长【拓跋烈】提丈二蛇矛杀至桥心！}'),
      S(SPEAKER_TUOBA_LIE, '（提丈二蛇矛策马逼近桥心，冷笑如狼）“哈哈哈哈！好狡猾的宋朝和尚，可惜还是叫本百夫长堵在了龙门桥上！这尊千斤紫金佛像，今日便拉回兴庆府献给国主！”'),
      N('箭雨呼啸而至，玄悲大师双袖鼓荡，以浑厚大金刚掌力将漫天狼牙箭悉数震落伊水，死死护住惊马与紫金佛像，却一时分身乏术。眼见拓跋烈蛇矛直刺桥心，玄悲长啸一声，将手中四十斤乌金重杵凌空掷向你！'),
      S('NPC-0157', '（声如佛门狮子吼震彻龙门峡谷）“{gender:师侄|女施主}接老衲【少林韦陀伏魔杵】！西夏铁骑长矛沉猛，寻常轻刃难挡其锋——记准《韦陀杵》『金刚降魔、横扫千军、天龙镇岳』三诀，破他马步，打他中宫！”'),
      N('你腾身跃起一把稳接乌金重杵，杵身温热竟与体内少林内劲轰然共鸣！电光石火间，韦陀降魔重意贯通百脉，你横杵立于龙门石桥正中，气势如岳迎向党项铁骑！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q18_pestle_thrown', value: true },
      teachArtNow('MA-094'),
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q18_plan', op: 'eq', value: 'frontal' },
        thenEffects: [openScene('scene_slq18_09', SHAOLIN_Q18_QUEST_ID)],
        elseEffects: [openScene('scene_slq18_08', SHAOLIN_Q18_QUEST_ID)],
      },
    ],
  },

  scene_slq18_08: {
    id: 'scene_slq18_08',
    title: '第六幕 · 独杵擒王',
    subtitle: '伊阙龙门石桥（1v1 独战拓跋烈）',
    mandatory: true,
    beats: [
      N('外围水匪与党项前锋斥候早被你的护镖妙计尽数调离！龙门石桥之上，唯有西夏游骑百夫长【拓跋烈】孤军深入、催动秘藏玄功挺蛇矛直扑而来！'),
      S(SPEAKER_TUOBA_LIE, '（目眦欲裂，蛇矛卷起狂沙）“坏我全盘埋伏，便拿你的命与这尊金佛来偿！受死！”'),
      P('（横执【少林韦陀伏魔杵】，步踏金刚）“西夏贼将休得猖狂！且尝我少林《韦陀杵》！”'),
    ],
    choices: [
      {
        id: 'slq18_fight_tuoba_solo',
        label: '执伏魔杵 1v1 独战西夏百夫长【拓跋烈】！（二流上品 单挑）',
        subLabel: '外围伏兵已被奇策调离，以《韦陀杵》正面对决党项百夫长',
        tone: 'danger',
        effects: [
          teachArtNow('MA-094'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuobaLieBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '紫金佛像与同门性命皆系于此桥，誓死不退！',
            introText: '【1v1 龙门独战】手执少林韦陀伏魔杵独战西夏百夫长【拓跋烈】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq18_10', SHAOLIN_Q18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('拓跋烈马战刚猛，暂退桥栏回气，稳住架势再以韦陀杵破敌！', 'warn', '龙门血战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq18_09: {
    id: 'scene_slq18_09',
    title: '第六幕 · 韦陀镇桥',
    subtitle: '伊阙龙门石桥（车轮连战 党项双将）',
    mandatory: true,
    beats: [
      N('拓跋烈催动西夏玄功蛇矛如毒龙出海，副将野利虎则挥西夏弯刀自侧翼斜劈马腹！两人前后夹击，杀气铺天盖地！'),
      S(SPEAKER_XIXIA_SCOUT, '（弯刀寒光暴闪）“百夫长莫与宋人废话，斩了这护法小将，立刻拉走紫金佛车！”'),
      P('（横执【少林韦陀伏魔杵】死守桥心）“纵是党项铁骑倾巢而来，今日亦休想越过龙门石桥半步！”'),
    ],
    choices: [
      {
        id: 'slq18_fight_tuoba_gauntlet',
        label: '执伏魔杵车轮连战【野利虎】与【拓跋烈】！（二流上品 车轮连战）',
        subLabel: '先破副将【野利虎】，再撼百夫长【拓跋烈】',
        tone: 'danger',
        effects: [
          teachArtNow('MA-094'),
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaScout() },
            extraOpponents: [{ kind: 'custom', npc: buildTuobaLieBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '紫金佛像与同门性命皆系于此桥，誓死不退！',
            introText: '【车轮连战 · 龙门血战】迎战西夏副将【野利虎】与百夫长【拓跋烈】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq18_10', SHAOLIN_Q18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('西夏双将马战刚猛，暂退桥栏回气再以韦陀杵破敌！', 'warn', '龙门血战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq18_10: {
    id: 'scene_slq18_10',
    title: '第七幕 · 伏魔破阵',
    subtitle: '伊阙龙门石桥（战后处置抉择）',
    mandatory: true,
    beats: [
      N('“轰——！”你沉腰拧胯，一式「天龙镇岳」自上而下雷霆压落，四十斤乌金重杵硬生生震碎拓跋烈手中丈二蛇矛！拓跋烈虎口崩裂鲜血直流，恰逢北岸王元霸亲率洛阳府援军马队烟尘滚滚杀到，党项贼将骇然鸣金，丢下十余名坠马伤俘遁入西山密林！'),
      N('王元霸大步掀开佛幔查验——千斤紫金释迦佛像宝相庄严，连一丝箭痕亦未曾留下！虚净、虚慧则押来数名负伤坠马的党项年轻游骑，请示如何处置。'),
      S('NPC-0186', '（双目虎威犹炽，按刀冷笑）“西夏贼子深入腹地劫掠佛宝，按河洛镖局铁律，合该斩首示警伊阙官道，教党项胡骑十年不敢窥视中原！”'),
      S('NPC-0157', '（合十低眉，将目光投向你）“阿弥陀佛。此战是你单杵镇桥之功，这几名坠马伤俘是留活口交洛阳府军法司审出西夏潜哨暗线，还是依王老施主铁血示警，你来定夺罢。”'),
    ],
    choices: [
      {
        id: 'slq18_captives_mercy',
        label: '【止杀审奸】包扎伤俘移交洛阳府军法司审问西夏暗线，既显佛门慈悲又利边防！',
        subLabel: '玄悲合十赞许，护车回返白马大佛宝殿（禅心慈悲 +1 · 侠义 +15）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q18_captives', value: 'mercy' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'modifyChivalry', delta: 15, reason: '伊阙战后止杀留俘、移交官府彻查西夏暗线' },
          setStep(SHAOLIN_Q18_QUEST_ID, 'baima_confer'),
          toast('龙门血战大捷！请于【白马寺 · 白马大佛宝殿】拜见玄悲大师与王元霸！', 'success', '洛阳护镖'),
        ],
      },
      {
        id: 'slq18_captives_execute',
        label: '【铁血震胡】依江湖镖规斩贼示警龙门驿道，教西夏一品堂知晓中原武林不可轻犯！',
        subLabel: '金刀王家众趟子手大呼痛快，护车回返白马大佛宝殿（怒目杀业 +1 · 声望 +15）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q18_captives', value: 'execute' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'modifyRenown', delta: 15, reason: '龙门石桥铁血示警西夏游骑，威震河洛江湖' },
          setStep(SHAOLIN_Q18_QUEST_ID, 'baima_confer'),
          toast('龙门血战大捷！请于【白马寺 · 白马大佛宝殿】拜见玄悲大师与王元霸！', 'success', '洛阳护镖'),
        ],
      },
    ],
  },

  scene_slq18_11: {
    id: 'scene_slq18_11',
    title: '第八幕 · 紫金功德',
    subtitle: '白马寺 · 白马大佛宝殿（功德与镖酬抉择）',
    illustrationUrl: '/assets/quests/sl_18_golden_buddha.jpg',
    illustrationCaption: '白马大佛宝殿 · 千斤紫金佛像安奉放光，玄悲破格传授《韦陀杵》并赠伏魔宝杵',
    mandatory: true,
    beats: [
      N('白马寺乃中土释源祖庭，大佛宝殿千灯齐明。千斤紫金佛像暂奉莲台之上熠熠生辉，虚净、虚慧与百余僧众齐诵《楞严咒》回向平安。'),
      S('NPC-0186', '（郑重抱拳一礼，命家人捧上一盘明晃晃的八十两赤金红封）“少侠今日单杵退西夏、{ifFlag:sl_q18_mole_caught|更提前验单揪出西夏内鬼，|保得佛像纤毫未损，}既扬少林佛威，更全了我金刀王家百年信誉！自今日起，金刀王家与少林俗家护法结为莫逆之交！按江湖镖规，这八十两护镖重酬务请收下！”'),
      S('NPC-0157', '（含笑抚须而不语）“阿弥陀佛。世间法有世间法之义利，出世法有出世法之功德。{gender:师侄|女施主}既为俗家护法，这盘重酬当如何处之，且凭本心。”'),
      N('烛火映照紫金佛面，满殿白马寺僧众与金刀王家子弟皆含笑静候你的回话——'),
    ],
    choices: [
      {
        id: 'slq18_reward_donate',
        label: '【无偿护佛 · 功德祈福】谢绝王家八十两厚礼，悉数转敬白马寺修缮施粥、为河洛苍生祈福！',
        subLabel: '佛门大义、侠名远播河洛（禅心慈悲 +2 · 声望 +30 · 侠义 +25）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q18_reward_choice', value: 'donate' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'modifyRenown', delta: 30, reason: '洛阳护佛谢绝重酬转作白马寺善款，侠名远播河洛' },
          { type: 'modifyChivalry', delta: 25, reason: '无偿护送千斤紫金佛像并敬献功德济民' },
          openScene('scene_slq18_12', SHAOLIN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'slq18_reward_fee',
        label: '【依镖规受酬】江湖走镖、出生入死，依金刀王家镖规坦荡实收八十两护镖重酬！',
        subLabel: '义利分明、财力充盈（怒目杀业 +1 · 结算获 80 两银）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q18_reward_choice', value: 'fee' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq18_12', SHAOLIN_Q18_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq18_12: {
    id: 'scene_slq18_12',
    title: '第九幕 · 破格授杵',
    subtitle: '白马寺 · 白马大佛宝殿',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q18_reward_choice=donate|王元霸动容长叹少林俗家护法竟视重金如浮云，当即加捐百石白米入白马寺冬日施粥；|王元霸抚掌大笑，赞你坦荡爽利不作伪态、深合江湖豪杰本色，亲手奉上八十两护镖红封；}你随即双手捧起沉甸甸的乌金重杵，恭敬奉还玄悲大师。'),
      S('NPC-0157', '（含笑摆手不接，反而自袖中取出一卷密录置入你手）“阿弥陀佛。宝杵自当配护法之人。老衲平生最擅《韦陀杵》，本不轻传外人，今日见你临阵一点即通、智勇兼备，便破例将《韦陀杵》全诀与这柄随身三十年的地阶神兵【少林韦陀伏魔杵】一并赐予你！”'),
      P('（心头震动，肃然躬身大礼拜谢）“玄悲师叔祖厚恩，弟子没齿难忘！必当善用此杵降妖伏魔，绝不辱没『大韦陀』与『金刀少林』威名！”'),
      N('次日紫金佛像在两家精锐护送下安抵嵩山大雄宝殿，你的名号亦随龙门独杵破西夏一战传遍河洛江湖。'),
    ],
    choices: [
      {
        id: 'slq18_finish_reward',
        label: '拜谢玄悲大师与王元霸，领受《韦陀杵》与【少林韦陀伏魔杵】（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-094' },
          { type: 'giveItem', itemId: 'WPN-028', qty: 1 },
          { type: 'giveCombatExp', amount: 360, reason: '伊阙龙门石桥大破黄河水匪与西夏游骑拓跋烈' },
          { type: 'addSectContribution', amount: 150 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q18_reward_choice', op: 'eq', value: 'fee' },
            thenEffects: [{ type: 'giveSilver', amount: 80, reason: '洛阳金刀王家护送紫金佛像重酬' }],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '骑术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q18_mole_caught', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0186' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0157' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q18_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《洛阳护镖 · 金刀少林》！习得地阶绝学《韦陀杵》，获赠【少林韦陀伏魔杵】！',
            'success',
            '洛阳护镖',
          ),
        ],
      },
    ],
  },
}
