import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { TAISHAN_ENTRY_QUEST_ID } from './taishanEntryQuest'

const EXTRA_SCENES: Record<string, StorySceneDef> = {}
function regScene(sc: StorySceneDef): string {
  EXTRA_SCENES[sc.id] = sc
  return sc.id
}

const SPEAKER_BLIND_MASON: StorySpeakerSpec = {
  kind: 'custom',
  name: '孙老石匠',
  title: '泰安护碑老刻工',
  factionName: '齐鲁百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_DIAO_HENGHU: StorySpeakerSpec = {
  kind: 'custom',
  name: '刁横虎',
  title: '京东黑风寨踏山头目（伪扮豪横香客）',
  factionName: '京东黑风寨',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_QIAN_YEXIAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱夜鸮',
  title: '京东黑风寨轻功暗探（化名江南茶商钱先生）',
  factionName: '京东黑风寨',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
}

function buildTrialSeniorShengDing(): NodeNpc {
  return makeQuestNpc({
    id: 'ACT-TS-TRIAL-SHENGDING',
    name: '盛定（筑基喂招）',
    title: '泰山派 · 十八盘守山剑客',
    realm: '不入流',
    factionId: 'SECT-06',
    factionName: '泰山派',
    avatarUrl: '/assets/characters/templates/tpl_taishan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_taishan_fb.jpg',
    talk: '“师弟请亮剑！天柏师叔有令，愚兄只运一成松风内息与筑基剑路，看你下盘稳是不稳！”',
    stats: { hp: 235, mp: 115, agi: 14, res: 7 },
    talents: { bone: 47, comprehension: 48, charm: 65 },
    equippedArts: { neigong: 'MA-225', qinggong: 'MA-197', move1: 'MA-168', move2: 'MA-184' },
    learnedArts: [{ artId: 'MA-225', level: 1 }, { artId: 'MA-197', level: 1 }, { artId: 'MA-168', level: 1 }, { artId: 'MA-184', level: 1 }],
    equipped: { weapon: 'WPN-073', armor: 'ARM-037', shoes: 'BOT-021', bow: 'BOW-017', accessory1: 'ACC-042', accessory2: 'ACC-044', mount: 'MNT-017' },
  })
}

function buildHeifengSpyQianNpc(ambushed: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'ACT-TS-SPY-QIAN',
    name: '钱夜鸮',
    title: '京东黑风寨 · 盗筹轻功暗探',
    realm: '不入流',
    factionId: 'SECT-18',
    factionName: '太行/京东绿林盟',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: ambushed
      ? '“该死的小牛鼻子，怎会算准爷爷藏在鹰愁涧松林？！刁兄弟，并肩宰了他们灭口！”'
      : '“嘿嘿，两个刚摸剑柄的毛头小子也敢追进深林？今日便叫你们给这副青铜算筹陪葬！”',
    stats: { hp: ambushed ? 205 : 245, mp: 100, agi: ambushed ? 13 : 16, res: 6 },
    talents: { bone: 42, comprehension: 52, charm: 45 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-197', move1: 'MA-189', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-199', level: 1 }, { artId: 'MA-197', level: 1 }, { artId: 'MA-189', level: 1 }, { artId: 'MA-186', level: 1 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-041', shoes: 'BOT-022', bow: 'BOW-022', accessory1: 'ACC-043', accessory2: 'ACC-041', mount: 'MNT-021' },
  })
}

function buildHeifengThugDiaoNpc(ambushed: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'ACT-TS-THUG-DIAO',
    name: '刁横虎',
    title: '京东黑风寨 · 踏山悍匪',
    realm: '不入流',
    factionId: 'SECT-18',
    factionName: '太行/京东绿林盟',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“在岱庙坏老子好事的便是你们两个酸丁！吃爷爷一记柴刀！”',
    stats: { hp: ambushed ? 175 : 205, mp: 70, agi: 11, res: 6 },
    talents: { bone: 50, comprehension: 32, charm: 30 },
    equippedArts: { neigong: 'MA-199', qinggong: 'MA-218', move1: 'MA-207', move2: 'MA-201' },
    learnedArts: [{ artId: 'MA-199', level: 1 }, { artId: 'MA-218', level: 1 }, { artId: 'MA-207', level: 1 }, { artId: 'MA-201', level: 1 }],
    equipped: { weapon: 'WPN-076', armor: 'ARM-047', shoes: 'BOT-022', bow: 'BOW-022', accessory1: 'ACC-043', accessory2: 'ACC-041', mount: 'MNT-021' },
  })
}

const CHAQUAN_HERITAGE_CONDITION: QuestCondition = {
  type: 'any',
  hint: '曾入济南【齐鲁查拳馆】修习《查拳》或持《齐鲁查拳馆举荐帖》',
  conditions: [
    { type: 'inSect', sectId: 'SECT-25' },
    { type: 'hasItem', itemId: 'ITM-MSC-004' },
    { type: 'learnedArtAtLeast', artId: 'MA-184', minLevel: 1 },
  ],
}

const SCENE_TS_20_OVERLOOKING_QILU: StorySceneDef = {
  id: 'scene_ts_20_overlooking_qilu',
  title: '第二十幕 · 俯瞰齐鲁松风长',
  subtitle: '日观峰沧海迎旭金亭 · 同门新篇',
  mandatory: true,
  beats: [
    N('封禅坛香烟袅袅散入万顷云涛，褚玄机掌门与三位师叔各自回返殿阁清修，只留下一众新晋同门立于日观峰迎旭金亭之畔。极目远眺，北方黄河宛若一条熔金绶带横贯齐鲁平野，南望徂徕松色苍翠欲滴，浩荡山风吹得你新换上的青灰道袍猎猎生姿。'),
    S('NPC-0827', '（鲁苍岳亦换上了崭新的泰山门人青衫，腰悬长剑走到你身侧，一向木讷少言的青年此刻眼眶微热，郑重向你一揖到底）“自济南岱庙初逢，历下夜雨分粮、十八盘扶担喋血、东岳道院以牌作保，直至松林并肩夺筹……若无兄台一路肝胆相护，我鲁苍岳早已含冤被逐下百丈崖，焉有今日登临玉皇顶之荣？”'),
    S('NPC-0936', '（小师妹建蓉捧着一只竹编茶篮笑盈盈地走近，递过两枚温热的泰安松仁酥饼）“鲁师兄方才在坛下偷偷抹了两回眼泪呢！往后咱们便是一殿听讲、同坪练剑的自家师兄妹了——五大夫松观云亭的雪水茶炉常年不熄，师兄下山历练归来，随时来亭里歇脚喝茶！”'),
    P('（你接过松仁酥饼，按住腰间铁剑剑柄，迎着万里朝阳朗然一笑）“同门手足，何言谢字！今日你我虽只初窥《泰山松风养气诀》与筑基剑路，他日勤修苦练，定要在每年二月初一的宗门大比上堂堂正正印证所学，共参那式俯仰天地的《岱宗如何》！”'),
    N('言罢，二人相视击掌，清越剑鸣与少年意气的笑声回荡于五岳独尊的云海绝顶，久久不息。自{reignYear}此晨起，你褪去一介白丁的青涩迷惘，身怀东岳松风正气，正式踏入了波澜壮阔的大宋江湖！'),
  ],
  onFinishEffects: [
    { type: 'removeItem', itemId: 'ITM-MSC-026', qty: 1 },
    { type: 'removeItem', itemId: 'ITM-MSC-027', qty: 1 },
    { type: 'joinSect', sectId: 'SECT-06', rank: 1 },
    { type: 'giveSilver', amount: 25, reason: '泰山派新晋外门弟子下山游历盘缠' },
    { type: 'giveFood', amount: 6 },
    { type: 'modifyRenown', delta: 25, reason: '破获黑风寨盗筹案、玉皇顶观日拜入泰山派' },
    { type: 'modifyChivalry', delta: 20, reason: '守信护友、铁骨登泰岳' },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0129' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0168' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 15 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0205' }, delta: 12 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 25 },
    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0936' }, delta: 20 },
    {
      type: 'branch',
      condition: {
        type: 'flag',
        flag: 'taishan_aptitude_score',
        op: 'gte',
        value: 3,
        label: '试炼全程屡显卓绝资质',
      },
      thenEffects: [
        { type: 'giveItem', itemId: 'WPN-061', qty: 1 },
        toast('正式拜入五岳独尊【泰山派】，授职【外门弟子】！因试炼资质卓绝，单天门师叔额外加赐凡阶上品利器【青萍游侠剑】一柄！', 'success', '岱宗定鼎'),
      ],
      elseEffects: [
        toast('正式拜入五岳独尊【泰山派】，授职【外门弟子】！获赐青灰道袍、云头布履、桃木辟邪符及游历资粮！', 'success', '岱宗定鼎'),
      ],
    },
    {
      type: 'completeQuest',
      questId: TAISHAN_ENTRY_QUEST_ID,
      outcome: 'joined_taishan',
      combatExp: 90,
    },
  ],
}

const SCENE_TS_19_SUNRISE_INVESTITURE: StorySceneDef = {
  id: 'scene_ts_19_sunrise_investiture',
  title: '第十九幕 · 沧海金轮授青锋',
  subtitle: '玉皇极顶汉白玉封禅坛 · 拜师大典',
  illustrationUrl: '/assets/quests/taishan_yuhuang_sunrise.jpg',
  illustrationCaption: '玉皇顶汉白玉古封禅台 · 沧海初旭下东灵道长褚玄机率三长老授袍赐剑',
  mandatory: true,
  beats: [
    N('三问既毕，“铛——铛——铛——”九响浑厚悠远的景阳古钟自玉皇古庙轰然撞响！赤金朝阳彻底挣脱东海云涛的束缚，万道霞光将整座汉白玉封禅古坛映照得宛若紫府天宫。'),
    N('钟声回荡之中，背负黑铁重剑的传功师叔单天门、手持拂尘的玉皇阁长老天松道人、神色肃穆的执法天柏道人分列封禅坛左右；鲁苍岳与捧着漆木衣盘的建蓉亦肃立于丹墀之下，共同见证这庄严一刻。'),
    S('NPC-0129', '（褚玄机面向秦汉无字古碑与泰山历代祖师灵位拈香三拜，随即转过身，温厚手掌轻轻按在你的发顶，朗声宣谕）“东岳泰山，五岳独尊；承鲁地邹鲁遗风，秉道门清静正气。今有良材历岱庙护碑、十八盘砺骨、东岳院明冤、封禅台问数，心性端方，侠骨天成，准录我泰山派门墙！”'),
    S('NPC-0168', '（单天门难得把乱蓬蓬的胡须捋得整整齐齐，咧开大嘴哈哈一笑，声震云海）“好小子！进了咱泰山派的门，往后在齐鲁京东地面上只要行的端坐的正，哪怕天王老子欺负到头上，也有老子这口六十四斤黑铁剑替你撑腰！”'),
    S('NPC-0204', '（天松道人与天柏道人相视颔首，亲手将叠放整齐的《青灰道袍》、《道士云头布履》与一枚开光《道观桃木辟邪符》授入你怀中）“学剑先立品。你初入外门，当勤修松风养气之法与泰山筑基剑术；待日后根基深厚、功绩圆满，五大夫剑、泰山十八盘乃至镇派绝学《岱宗如何》，皆向你敞开大门！”'),
  ],
  choices: [
    {
      id: 'ts19_kneel_accept_robe',
      label: '【向东岳祖师与褚掌门恭行三拜九叩大礼】“弟子谨遵师门教诲，永不坠泰山清名！”',
      tone: 'gold',
      effects: [openScene('scene_ts_20_overlooking_qilu', 'QST-SECT-06-ENTRY')],
    },
  ],
}

const SCENE_TS_18_THREE_QUESTIONS_DAWN: StorySceneDef = {
  id: 'scene_ts_18_three_questions_dawn',
  title: '第十八幕 · 东海红轮问本心',
  subtitle: '玉皇极顶汉白玉封禅坛 · 宗师三问',
  mandatory: true,
  beats: [
    N('恰在此时，东方万里云海尽头倏然裂开一线夺目紫金！海天交接处霞光喷薄，一轮浩瀚红日正欲破浪跃出。狂烈山风吹动褚玄机雪白长须，这位威震齐鲁的宗师负手立于封禅坛崖畔，背影恍若与脚下万仞泰岳融为一体。'),
    S('NPC-0129', '“数理可演剑路，却算不尽人心险恶。昔年泰山先生孙明复隐居此山十年，著《春秋尊王发微》，言大义在胸不在空谈；我泰山剑派执齐鲁武林牛耳，亦不收无根浮萍之辈。”'),
    S('NPC-0129', '（褚玄机缓缓回首，双眸映着初升霞光，清朗之声直叩心扉）“入我门前，老夫尚有三问合为一叩——当今{reignYear}，看似四海升平，实则北有契丹铁骑虎视幽燕，西有党项夏国窥伺秦陇，内有绿林巨寇横行州县。你今日仗三尺铁剑立于五岳之巅，所求究竟是护国济民的大义、穷究天人的剑道，还是生死不负的同门肝胆？”'),
  ],
  choices: [
    {
      id: 'ts18_oath_country',
      label: '【浩然抚剑北望】“愿持东岳三尺青锋，护佑黎庶苍生，北御强虏，不教胡马度黄河！”',
      subLabel: '立志【儒侠护国】· 江湖侠义 +15，江湖声望 +15，十艺【策论】+2',
      tone: 'gold',
      effects: [
        { type: 'modifyChivalry', delta: 15, reason: '玉皇顶立志护国济民' },
        { type: 'modifyRenown', delta: 15, reason: '东岳封禅坛立誓卫道' },
        { type: 'modifySkill', key: '策论', delta: 2 },
        { type: 'setFlag', flag: 'taishan_heart_oath', value: 'country' },
        openScene('scene_ts_19_sunrise_investiture', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts18_oath_sword_dao',
      label: '【凝望石晷天光】“愿穷毕生心力以算入剑、参透天地至理，承继东岳绝学不坠宗风！”',
      subLabel: '立志【求道破境】· 《泰山松风养气诀》熟练度 +3000，十艺【算术】+2，声望 +12',
      tone: 'jade',
      effects: [
        { type: 'addArtExp', artId: 'MA-225', amount: 3000 },
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'modifyRenown', delta: 12, reason: '玉皇顶立誓专精剑道' },
        { type: 'setFlag', flag: 'taishan_heart_oath', value: 'dao' },
        openScene('scene_ts_19_sunrise_investiture', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts18_oath_brotherhood',
      label: '【坦然拱手回望山门】“大言不敢妄许，唯愿一诺如泰山之重，凡同门手足托付，九死不悔！”',
      subLabel: '立志【重情守义】· 鲁苍岳/建蓉/单天门好感 +15，江湖侠义 +12，声望 +12',
      tone: 'primary',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0936' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0168' }, delta: 15 },
        { type: 'modifyChivalry', delta: 12, reason: '玉皇顶立誓重情守诺' },
        { type: 'modifyRenown', delta: 12, reason: '重诺如山传佳话' },
        { type: 'setFlag', flag: 'taishan_heart_oath', value: 'brotherhood' },
        openScene('scene_ts_19_sunrise_investiture', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

function buildGnomonAnswerScene(mode: 'math_master' | 'intuition' | 'humble'): StorySceneDef {
  const map = {
    math_master: {
      playerBeat:
        '（你蹲身细察石晷铜针高度与日观峰东侧山口仰角，在心中以《周髀算经》勾股弦率疾速推演，随即拾起一枝松针点向石坛东北隅刻度）“回禀掌门！日观峰高出此坛四丈有奇，立春后十日晨星东移二度——待沧海红轮破云一刹，第一缕金光越过峰尖，铜针晷影当长三尺七寸二分，斜落九宫『艮寅之交』！若以剑锋应日影，敌目方眩而剑尖已锁咽喉！”',
      masterBeat:
        '（褚玄机手中七根竹算筹蓦然一顿，清癯面庞浮现难掩的惊艳之色，继而抚须仰天长笑，声惊云鹤）“妙哉！善哉！分毫不差，恰在艮寅生门三尺七寸二分！世人皆以为我泰山《岱宗如何》只是仰仗势大力沉，殊不知右手五指掐算高下远近、奇正疾徐，差一毫则失千里！老夫在玉皇顶枯算二十余载，今日终遇一位天授数理的知音良材！”',
      narratorBeat:
        '笑声渐敛，褚玄机郑重自道袍袖底取出一卷朱墨批注、纸页微黄的绢帛手稿，亲手交入你掌中——赫然是他早年参悟《岱宗如何》时亲笔所录的《岱宗日影剑理手札》！',
    },
    intuition: {
      playerBeat:
        '（你虽未逐寸演算勾股分毫，却屏息凝神，顺着山巅晨风流向与云隙微光感应天地气机，抬指径点石坛东北艮位）“晚辈算学未精，难报寸数；然观云海翻涌之势、日观峰豁口之形，天光破晓必自东北生门一线直贯此槽——数在天地，剑随心至！”',
      masterBeat:
        '（褚玄机双眉微扬，低头看了一眼自己方才用竹筹摆出的艮寅刻度，不禁莞尔颔首）“虽未算清三尺七寸之数，却凭灵犀悟性一眼点破生门落点！昔年祖师于五大夫松下创剑，亦是由象入数、数象合一。你这份澄明悟性，假以时日精研算经，必能窥我东岳剑道堂奥！”',
      narratorBeat:
        '言罢，褚玄机欣然自袖中取出一卷早年亲笔推演的《岱宗日影剑理手札》赐予你参详，勉励你日后将算理与剑意融会贯通。',
    },
    humble: {
      playerBeat:
        '（你凝视秦汉石晷上繁复精密的二十八宿刻度良久，并未强不知以为知，而是退后半步恭谨长揖）“回禀掌门，晚辈算学浅薄，若凭臆测胡乱指认，便是欺天欺师。晚辈今日答不出晷影尺寸，唯愿入山门后自一筹一算、一刺一劈从头学起，绝不取巧妄言！”',
      masterBeat:
        '（褚玄机静静凝视你片刻，严峻目光渐渐化作温和春风，轻叹一声将竹筹收入袖中）“知之为知之，不知为不知——好一个不欺天、不欺师！江湖上多少聪明人败在投机妄测四字，我泰山剑法恰恰最重『诚拙厚重』。算学未通可慢慢学，这颗端正赤诚之心，千金难换！”',
      narratorBeat:
        '褚玄机随手以竹杖在石坛霜痕上划出勾股大略，耐心地为你拆解日影落点之理，令你茅塞顿开，于算学与筑基剑路皆大有裨益。',
    },
  }[mode]

  return {
    id: `scene_ts_17b_gnomon_${mode}`,
    title: '第十七幕 · 晷影定分宗师叹',
    subtitle: '玉皇极顶汉白玉封禅坛 · 数剑合一',
    mandatory: true,
    beats: [
      P(map.playerBeat),
      S('NPC-0129', map.masterBeat),
      N(map.narratorBeat),
    ],
    choices: [
      {
        id: `ts17b_to_18_${mode}`,
        label: '【东方沧海云霞骤亮，肃立恭听掌门训示】',
        tone: 'gold',
        effects: [openScene('scene_ts_18_three_questions_dawn', 'QST-SECT-06-ENTRY')],
      },
    ],
  }
}

const SCENE_TS_17_GNOMON_SWORD_CALC: StorySceneDef = {
  id: 'scene_ts_17_gnomon_sword_calc',
  title: '第十七幕 · 汉坛圭表问剑数',
  subtitle: '玉皇顶古封禅台 · 掌门褚玄机',
  mandatory: true,
  beats: [
    N('寅时三刻，泰山极顶万籁俱寂。脚下是翻滚如怒海狂涛的万顷云层，头顶是尚未隐去的璀璨寒星，凛冽天风吹得古庙檐角铁马叮当清响。汉白玉古封禅坛正中，一位年近六旬、身穿素白鹤氅的清癯老道正俯身立于一座秦汉青石日晷旁，手中捻着七根莹润竹算筹。'),
    N('他并未佩剑，周身气息更是渊深宁静如脚下万古泰岳，正是统领齐鲁正道、名列宗师之境的泰山派掌门——“东灵道长”褚玄机！'),
    S('NPC-0129', '（褚玄机并未回头，温和醇厚的声音却清晰传入你耳中）“来得正好，离卯初日出尚有一刻。天松在趵突泉夸你心静，单师弟在十八盘赞你骨硬，天柏在东岳院服你明义……连夺回那副《东封七宿青铜算筹》，你也立了大功。”'),
    S('NPC-0129', '（他缓步让开半身，露出石坛上镌刻的周天星度与三尺铜圭表针，抬手指向东方日观峰两山夹峙的云海豁口）“然入我泰山门墙，不可不知东岳剑理之魂。杜工部诗云：『岱宗夫如何？齐鲁青未了。』我派至高剑诀便以此为名，以算学测天时、量地势、度敌我身步。你且观此铜针与日观峰仰角——待沧海第一缕晨光越峰射来，针影当长几许、落于石坛何方？”'),
  ],
  choices: [
    {
      id: 'ts17_calc_precise',
      label: '【以勾股弦率精算峰高与晨星倾角】“晷影当长三尺七寸二分，斜指艮寅之交！”',
      subLabel:
        '【算术大家】获赐宗师孤本《岱宗日影剑理手札》+《泰山剑法》熟练度 +4000 +【算术】+3 + 褚玄机好感 +30',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【算术】≥ 24，或（【算术】≥ 16 且 先天【悟性】≥ 90）',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 24 },
          {
            type: 'all',
            conditions: [
              { type: 'skillAtLeast', key: '算术', min: 16 },
              { type: 'talentAtLeast', key: '悟性', min: 90 },
            ],
          },
        ],
      },
      effects: [
        { type: 'giveItem', itemId: 'ITM-MSC-028', qty: 1 },
        { type: 'addArtExp', artId: 'MA-168', amount: 4000 },
        { type: 'modifySkill', key: '算术', delta: 3 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0129' }, delta: 30 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 2 },
        openScene(regScene(buildGnomonAnswerScene('math_master')), 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts17_calc_intuition',
      label: '【凭超凡剑道灵觉感应天光走势】“虽难报寸数，然破晓生机必贯东北艮寅槽位！”',
      subLabel:
        '【灵犀悟剑】获赐《岱宗日影剑理手札》+《泰山剑法》熟练度 +2500 + 褚玄机好感 +20',
      tone: 'jade',
      condition: { type: 'talentAtLeast', key: '悟性', min: 90 },
      effects: [
        { type: 'giveItem', itemId: 'ITM-MSC-028', qty: 1 },
        { type: 'addArtExp', artId: 'MA-168', amount: 2500 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0129' }, delta: 20 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        openScene(regScene(buildGnomonAnswerScene('intuition')), 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts17_calc_humble',
      label: '【至诚一揖不作妄测】“晚辈算学尚浅，不敢欺天欺师，愿自一筹一算踏实苦修！”',
      subLabel: '【诚拙正宗】十艺【算术】+2、【经义】+2 +《泰山剑法》熟练度 +1500 + 褚玄机好感 +15',
      tone: 'primary',
      effects: [
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'addArtExp', artId: 'MA-168', amount: 1500 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0129' }, delta: 15 },
        openScene(regScene(buildGnomonAnswerScene('humble')), 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

const SCENE_TS_16_SUMMIT_SUMMONS: StorySceneDef = {
  id: 'scene_ts_16_summit_summons',
  title: '第十六幕 · 绝顶传召寅夜行',
  subtitle: '泰山派东岳道院 · 破晓前夕',
  mandatory: true,
  beats: [
    N('《东封七宿青铜算筹》重归东岳三清正殿紫檀秘匣，一场险些令同门蒙冤、门派失宝的风波终告平息。暮色四合之际，一名玉皇顶侍剑道童踏云阶而下，向天柏道人、天松道人与单天门恭传掌门法谕。'),
    S('NPC-0204', '（天松道人展阅松笺，转头向你含笑颔首）“掌门师兄已在玉皇顶尽悉这几日始末。他老人家传谕：命你于明日寅时三刻破晓之前，独自登临【玉皇顶古封禅台 · 玉皇极顶汉白玉封禅坛】面见掌门！”'),
    S('NPC-0827', '（道院山门外，鲁苍岳与提着纸灯笼的建蓉特意候在石阶旁送你，鲁苍岳替你轻轻拍去肩头松霜，满脸振奋）“太好了！平日新弟子入山半年都未必能见着褚掌门真容，掌门师伯竟在封禅坛单独召见你！我与建蓉师妹明早随诸位师叔一道上山观礼，咱们玉皇顶见！”'),
    N('夜色深沉，山道两侧古柏苍苍，唯有漫天星斗低垂在通往泰山极顶的最后百级青石阶之上。你深吸一口清冽松风，丹田内初成的《泰山松风养气诀》真气缓缓流转，再无初登十八盘时的喘促狼狈，步履沉稳地向万山之巅迈去。'),
  ],
  choices: [
    {
      id: 'ts16_ascend_now',
      label: '【踏着漫天寒星，直登玉皇顶古封禅台拜谒褚掌门！】',
      tone: 'gold',
      effects: [
        { type: 'advanceShichen', count: 3 },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'setQuestStep',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'yuhuang_summit_oath',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'taishan',
          buildingId: 'ts_yuhuang',
          spotId: 'ts_yh_altar',
        },
        openScene('scene_ts_17_gnomon_sword_calc', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts16_ascend_manual',
      label: '【先在东岳道院休整片刻，随后自行前往玉皇顶古封禅台】',
      tone: 'default',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        setStep(TAISHAN_ENTRY_QUEST_ID, 'yuhuang_summit_oath'),
        toast('已获掌门传召！请前往东岳泰山【玉皇顶古封禅台】拜谒掌门东灵道长【褚玄机】。', 'talk', '绝顶传召'),
      ],
    },
  ],
}

const SCENE_TS_15_CLIFF_LAW_DEBATE: StorySceneDef = {
  id: 'scene_ts_15_cliff_law_debate',
  title: '第十五幕 · 百丈崖规论经权',
  subtitle: '泰山派东岳道院 · 铁面动容',
  mandatory: true,
  beats: [
    N('一行人簇拥着夺回的《东封七宿青铜算筹》返回东岳道院。苍松石坪之上，天柏道人验看铜筹毫发无损，又查验了自钱夜鸮身上搜出的黑风寨密令与嫁祸墨布，冷峻如霜的面容终于闪过一丝愧色。'),
    S('NPC-0205', '（天柏道人捧起铜匣，先向鲁苍岳沉声道）“鲁苍岳，是本座失察，险些受奸贼蒙蔽冤屈本门良善，你受委屈了。”（随即话锋一转，锐利目光落向你）“然功过不相掩！本座只许你在东厢查验，你竟敢未经禀报私出山门、深入鹰愁涧与黑风寨凶徒搏杀——若非单师兄及时赶到，你二人性命休矣！按《百丈崖戒律》，私出涉险者当罚面壁十日，你可知罪？！”'),
    S('NPC-0168', '（单天门一听便吹胡子瞪眼，把黑铁重剑往地上一顿）“天柏老弟你少拿戒尺唬人！贼子午时便要混进挑夫队出山，等层层禀报完，算筹早姓石了！依老子看，不赏反罚才寒了孩子们的心！”'),
  ],
  choices: [
    {
      id: 'ts15_debate_classics',
      label: '【引泰山先生《春秋》经权之义抗辩】“守经更须达权！律法为护道而设，岂可因死守条文坐视师门重宝沦落贼手？”',
      subLabel:
        '【辩才/经义折服】十艺【辩才】+2、【经义】+2 + 天柏道人当众长揖致歉（好感 +25）',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【辩才】≥ 20 或 十艺【经义】≥ 20',
        conditions: [
          { type: 'skillAtLeast', key: '辩才', min: 20 },
          { type: 'skillAtLeast', key: '经义', min: 20 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '辩才', delta: 2 },
        { type: 'modifySkill', key: '经义', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0205' }, delta: 25 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        openScene('scene_ts_16_summit_summons', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts15_accept_frankly',
      label: '【不卑不亢躬身领责】“晚辈确系未禀擅出，只求还鲁兄清白、保东岳重宝，甘领师叔责罚！”',
      subLabel: '【坦荡担当】江湖侠义 +8 + 天柏道人感念赤诚免罚（好感 +15）',
      tone: 'primary',
      effects: [
        { type: 'modifyChivalry', delta: 8, reason: '百丈崖规前坦荡担当' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0205' }, delta: 15 },
        openScene('scene_ts_16_summit_summons', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

const SCENE_TS_14_HEAVY_SWORD_THUNDER: StorySceneDef = {
  id: 'scene_ts_14_heavy_sword_thunder',
  title: '第十四幕 · 黑铁惊雷护短情',
  subtitle: '鹰愁涧古松密林 · 铁剑道人神威',
  mandatory: true,
  beats: [
    N('钱夜鸮被你刚猛端正的泰山筑基剑势逼得左支右绌，眼见装有《东封七宿青铜算筹》的竹篓脱手滚落，他眼中凶光暴涨，猛地捏碎袖中一枚赤焰号炮！林外山涧骤然响起急促呼哨，一道阴冷强横的刀风卷着漫天枯叶直劈你面门！'),
    S('NPC-0309', '（京东黑风寨大当家“冷月客”石寒乾提着一口寒光凛冽的五虎断门刀自崖后踏枝跃出，杀气森然）“废物东西，连两个初学乍练的小崽子都料理不干净！算筹留下，你们两个小牛鼻子的脑袋，石某今天一并收了！”'),
    N('二流中品悍匪的太行罡气如山崩海啸般压来，你初成的第一重内息瞬间滞涩，虎口剧痛欲裂，鲁苍岳更是拼死横剑挡在你身前半步不退！便在刀锋距你眉心不足三寸的生死刹那——半空陡然炸开一声似闷雷滚过千山的暴喝！'),
    S('NPC-0168', '“石寒乾你这藏头露尾的狗贼，敢动我泰山派的娃娃，问过老子手里这口铁剑没有？！”'),
    N('但见一道苍青身影携风雷之势自松巅直劈而下！单天门双手紧握六十四斤乌黑重剑，正是泰山派上乘绝艺《泰山十八盘》中最霸烈的一式“云开日出”！“锵啷”一声震耳欲聋的巨响，石寒乾手中厚背大刀竟被硬生生震出三道缺口，整个人狂喷一口鲜血倒飞数丈，拽起狼狈不堪的钱夜鸮与刁横虎便借毒烟滚下山涧鼠窜而逃！'),
    S('NPC-0168', '（单天门并未深追，反手将重剑插进山岩，弯腰拾起那只装满青铜算筹的油布包塞进你怀里，劈头盖脸便是一顿臭骂，眼底却全是后怕与欣慰）“两个不知天高地厚的小兔崽子！刚练了半天《松风养气诀》，拿把破三才铁剑就敢往黑风寨的刀口上撞？幸亏建蓉那丫头机灵跑去十八盘喊老子——走！拿上算筹，跟老子回东岳道院把天柏那老古板的嘴堵上！”'),
  ],
  choices: [
    {
      id: 'ts14_return_tallies',
      label: '【双手捧紧《东封七宿青铜算筹》，与鲁苍岳随单师叔返院复命】',
      tone: 'gold',
      effects: [
        { type: 'giveItem', itemId: 'ITM-MSC-027', qty: 1 },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'teleportPlayer',
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_west',
        },
        openScene('scene_ts_15_cliff_law_debate', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

function buildPineInterceptCombatEffects(ambushed: boolean): QuestEffect[] {
  return [
    {
      type: 'branch',
      condition: {
        type: 'flag',
        flag: 'taishan_cangyue_bond',
        op: 'gte',
        value: 35,
        label: '与鲁苍岳义结同心',
      },
      thenEffects: [
        {
          type: 'startCombat',
          questId: TAISHAN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildHeifengSpyQianNpc(ambushed) },
          extraOpponents: [{ kind: 'custom', npc: buildHeifengThugDiaoNpc(ambushed) }],
          allies: [{ kind: 'npc', npcId: 'NPC-0827' }],
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '师门镇山算筹与同门清白皆系于此，岂容退缩！',
          introText:
            '鲁苍岳拔剑怒喝与你并肩迎敌！运使初成的《泰山松风养气诀》与《泰山剑法（筑基篇）》，联手截下黑风寨暗探钱夜鸮与悍匪刁横虎！',
          onWin: [
            { type: 'giveCombatExp', amount: 45, reason: '鹰愁涧松林并肩破贼夺筹' },
            { type: 'addArtExp', artId: 'MA-168', amount: 2500 },
            openScene('scene_ts_14_heavy_sword_thunder', 'QST-SECT-06-ENTRY'),
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 20, reason: '鹰愁涧松林喋血死战不退' },
            { type: 'addArtExp', artId: 'MA-168', amount: 1200 },
            openScene('scene_ts_14_heavy_sword_thunder', 'QST-SECT-06-ENTRY'),
          ],
          onDraw: [
            { type: 'giveCombatExp', amount: 25, reason: '鹰愁涧松林缠斗阻敌' },
            openScene('scene_ts_14_heavy_sword_thunder', 'QST-SECT-06-ENTRY'),
          ],
        },
      ],
      elseEffects: [
        {
          type: 'startCombat',
          questId: TAISHAN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildHeifengSpyQianNpc(ambushed) },
          rule: 'story_trial',
          lethalOnLose: false,
          forbidEscapeReason: '师门镇山算筹近在咫尺，岂可退让！',
          introText:
            '鲁苍岳横剑缠住外围悍匪刁横虎，由你独战黑风寨轻功暗探钱夜鸮！以初成的《泰山剑法（筑基篇）》堂堂正正破其诡刃！',
          onWin: [
            { type: 'giveCombatExp', amount: 45, reason: '鹰愁涧松林独破盗筹暗探' },
            { type: 'addArtExp', artId: 'MA-168', amount: 2500 },
            openScene('scene_ts_14_heavy_sword_thunder', 'QST-SECT-06-ENTRY'),
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 20, reason: '鹰愁涧松林死战阻敌' },
            { type: 'addArtExp', artId: 'MA-168', amount: 1200 },
            openScene('scene_ts_14_heavy_sword_thunder', 'QST-SECT-06-ENTRY'),
          ],
          onDraw: [
            { type: 'giveCombatExp', amount: 25, reason: '鹰愁涧松林激战阻敌' },
            openScene('scene_ts_14_heavy_sword_thunder', 'QST-SECT-06-ENTRY'),
          ],
        },
      ],
    },
  ]
}

const SCENE_TS_13_PINE_WOODS_INTERCEPT: StorySceneDef = {
  id: 'scene_ts_13_pine_woods_intercept',
  title: '第十三幕 · 松林截赃双剑鸣',
  subtitle: '十八盘侧翼鹰愁涧松林 · 真凶现形',
  mandatory: true,
  beats: [
    N('穿过迷蒙山雾潜入鹰愁涧古松密林，果见两道鬼祟身影蹲在一块卧牛青石后，正手忙脚乱地将一束刻满星宿古篆的青铜算筹塞进挑夫香烛竹篓的夹层之中！仔细一看，一人正是济南岱庙闹事的疤面大汉刁横虎，另一人竟是在趵突泉观澜榭假充江南茶商的“钱先生”！'),
    S(SPEAKER_DIAO_HENGHU, '（刁横虎压低嗓门嘿嘿狞笑）“钱老弟好手段！不仅顺手摸出了《东封七宿青铜算筹》，还把你前日在岱庙扯下的那块破酸丁袖角丢在门槛下顶缸——这会儿泰山派那帮牛鼻子怕是正在自家窝里清理门户呢！”'),
    S(SPEAKER_QIAN_YEXIAO, '（钱夜鸮得意地拍了拍竹篓夹层，阴声道）“少废话！石寒乾大当家已在涧口接应。只要拿到这副算筹与里头暗藏的京东官道驿防度数，莫说破他泰山剑阵，今年京东路的朝廷纲银镖车全得姓咱黑风寨的姓！”'),
    S('NPC-0827', '（鲁苍岳听得双目赤红，浑身颤抖，“呛”地拔出腰间铁剑第一个冲出松林）“无耻匪类！还我东岳镇山宝物！”'),
    P('（你亦长剑出鞘，丹田内《泰山松风养气诀》真气应念而起，三尺铁剑嗡然清鸣，与鲁苍岳一左一右封死涧口去路）“京东黑风寨的鼠辈，今日便是你们伏法之时！”'),
  ],
  choices: [
    {
      id: 'ts13_ambush_strike',
      label: '【依方才推演的涧口地形抢占高位，双剑齐出先挫贼势！】',
      subLabel: '因提前锁定鹰愁涧埋伏方位，贼人仓促应战气血与身法受挫！',
      tone: 'gold',
      condition: {
        type: 'flag',
        flag: 'taishan_deduced_ravine',
        op: 'truthy',
        label: '已在碑廊精准推算出鹰愁涧藏身方位',
      },
      effects: buildPineInterceptCombatEffects(true),
    },
    {
      id: 'ts13_frontal_strike',
      label: '【挺动三才铁剑，堂堂正正施展《泰山剑法》截击二贼！】',
      subLabel: '若与鲁苍岳情义深厚，鲁苍岳将作为助战同伴与你并肩对敌！',
      tone: 'primary',
      effects: buildPineInterceptCombatEffects(false),
    },
  ],
}

const SCENE_TS_12_STELE_CORRIDOR_CLUES: StorySceneDef = {
  id: 'scene_ts_12_stele_corridor_clues',
  title: '第十二幕 · 碑廊推迹破迷雾',
  subtitle: '泰山派东岳道院 · 东厢丹房碑廊',
  mandatory: true,
  beats: [
    N('步入东厢偏殿碑廊，鲁苍岳由两名守山剑客看押在廊柱旁，你则蹲在失窃的紫檀铜匣前凝神细查。只见铜匣锁簧并非以蛮力撬断，而是被人用一片极薄的柳叶钢片顺着机括死角挑开；后窗石台上留着半枚极浅的布鞋泥印，泥色赤红泛碱。'),
    S('NPC-0936', '（小师妹建蓉气喘吁吁地自回廊跑来，手里捏着一小撮焦黑松脂屑低声急道）“师兄快看！我方才在后崖排水暗渠边扫阶，捡到这撮混着硫磺与赤碱泥的火折灰——咱们泰山道院向来只点清油松明，这股子腥辣火折味儿，分明与前天在岱庙和趵突泉晃荡的那伙外乡客一模一样！”'),
    P('（你心头电光石火般一闪，将岱庙恶汉撕扯鲁苍岳衣袖、趵突泉“钱先生”探问山门虚实、客栈夜雨五十两买通，以及昨夜观云亭黑影四桩异事一线贯通）“好一招连环嫁祸！贼人乃是京东黑风寨细作，早自济南岱庙便蓄谋已久！建蓉师妹，烦你速去十八盘升仙坊禀报单天门师叔前辈接应，我与鲁兄即刻追截脏物！”'),
  ],
  choices: [
    {
      id: 'ts12_deduce_ravine',
      label: '【结合巡山更次与步距算理推演去向】“辰时封山未解，贼人必藏鹰愁涧候午时香篓夹带出山！”',
      subLabel: '【算术/悟性破局】十艺【算术】+2，精准锁死贼人藏身暗哨，下幕交战占尽先机！',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【算术】≥ 20 或 先天【悟性】≥ 90',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 20 },
          { type: 'talentAtLeast', key: '悟性', min: 90 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'setFlag', flag: 'taishan_deduced_ravine', value: true },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        openScene('scene_ts_13_pine_woods_intercept', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts12_track_mud',
      label: '【顺着窗外苔藓上的京东赤泥足印与折枝痕迹，疾追入山腰密林！】',
      subLabel: '与鲁苍岳同往鹰愁涧古松林追截盗筹真凶',
      tone: 'primary',
      effects: [openScene('scene_ts_13_pine_woods_intercept', 'QST-SECT-06-ENTRY')],
    },
  ],
}

const SCENE_TS_11_STOLEN_STAR_TALLIES: StorySceneDef = {
  id: 'scene_ts_11_stolen_star_tallies',
  title: '第十一幕 · 偏殿失筹祸飞来',
  subtitle: '泰山派东岳道院 · 无妄奇冤',
  mandatory: true,
  beats: [
    N('演武场剑鸣方歇，尚未等你拭去额角热汗，东厢丹房碑廊方向陡然传来三声急促惊惶的铜磬警响！两名道装弟子脸色煞白地奔入石坪，扑通跪倒在天柏道人面前。'),
    S('NPC-0545', '（值守弟子鲍景森声音发颤，高举两件证物呈上）“启禀天柏师叔！大事不好！偏殿秘匣封存的镇山信物《东封七宿青铜算筹》，方才辰时换防开匣点验时竟不翼而飞！弟子在秘匣门槛下搜出半截染有岱庙松烟墨的青布袖角，还有……还有半张抄录《秦泰山刻石》的草纸！”'),
    N('满院目光齐刷刷聚向场边的鲁苍岳！谁都认得那手工整端方的小楷正是鲁苍岳在岱庙抄碑的字迹，而他左袖袖口恰恰缺了一角！天柏道人脸色瞬间铁青如霜，锵然按住腰间戒律长剑。'),
    S('NPC-0205', '（天柏道人厉声喝问，声震屋瓦）“鲁苍岳！《东封七宿青铜算筹》关系本门剑阵机密与齐鲁驿防，你入俗家三年未曾授上乘剑诀，莫非因此怀恨私盗重宝？！人证物证俱在，还不从实招来，否则立断佩剑、逐下百丈崖永不复录！”'),
    S('NPC-0827', '（鲁苍岳本就拙于言辞，骤逢奇冤，一张书生脸庞涨得通红发紫，扑通跪在青石板上指天急辩，却越急越结巴）“师、师叔明鉴！弟子万死不敢盗门中一草一木！这袖角是……是前日在济南岱庙被恶客扯破的，昨夜弟子一直在观云亭……弟子真不知怎会落在偏殿……”'),
  ],
  choices: [
    {
      id: 'ts11_pledge_token',
      label: '【毅然跨前一步，解下腰间试剑木牌拍在案上】“鲁兄绝非盗筹之人！晚辈愿以木牌作保，请限时三个时辰勘破真凶！”',
      subLabel: '【肝胆相护】江湖侠义 +12，鲁苍岳感激涕零（好感 +25，同门缘分大幅加深）',
      tone: 'gold',
      effects: [
        { type: 'modifyChivalry', delta: 12, reason: '东岳道院押牌力保同门鲁苍岳' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 25 },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 25 },
        {
          type: 'setQuestStep',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'investigate_daoyuan_theft',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_east',
        },
        openScene('scene_ts_12_stele_corridor_clues', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts11_calm_reason',
      label: '【拱手向天柏道人冷静陈情】“昨夜观云亭已有黑影潜入，贼人嫁祸痕迹太重，请准晚辈赴东厢验看锁痕！”',
      subLabel: '【沉着析疑】鲁苍岳好感 +15，移步东厢丹房碑廊勘验现场',
      tone: 'primary',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 15 },
        {
          type: 'setQuestStep',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'investigate_daoyuan_theft',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_east',
        },
        openScene('scene_ts_12_stele_corridor_clues', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

function buildSparAftermathScene(won: boolean): StorySceneDef {
  return {
    id: won ? 'scene_ts_10b_spar_win' : 'scene_ts_10b_spar_lose',
    title: won ? '第十幕 · 初试锋芒惊四座' : '第十幕 · 败而不馁见铁骨',
    subtitle: '苍松石坪演剑院 · 考校定评',
    mandatory: true,
    beats: won
      ? [
          N('石坪之上剑风激荡！你依足《泰山松风养气诀》吐纳节奏，脚踏苍松盘根步，趁盛定旧力方尽新力未生之际，一记堂堂正正的“岱岳横云”斜格直进，三才铁剑稳稳停在盛定咽喉半寸之外！'),
          S('NPC-0533', '（盛定怔了一瞬，随即爽快收剑入鞘，抱拳佩服道）“好稳的腕力！师弟方才领悟心法不过半个时辰，出剑却无半分浮滑侥幸，愚兄输得心服口服！”'),
          S('NPC-0205', '（一贯苛严挑剔的天柏道人眼中亦掠过一抹赞许，微微颔首）“剑走正道，气沉涌泉，毫无市井油滑之气。初试校考，上等过关！”'),
        ]
      : [
          N('十余合硬碰硬拆招下来，你毕竟初窥内息未满一日，丹田真气运转稍滞，剑尖偏了半寸，被盛定熟稔的剑脊顺势搭住手腕。然而你双脚犹如生根于泰山青岩，硬是咬牙挺立未退半步！'),
          S('NPC-0168', '（不知何时抱臂站在院墙松枝下的单天门猛地跳下石坪，蒲扇大手往盛定肩膀一拍，瞪眼笑道）“盛小子你还好意思得意？人家半个时辰前还是没摸过内功的白丁，头一回拿铁剑便逼得你使出看家步法！这股子宁折不弯的稳劲儿，过上十天半月非把你劈趴下不可！”'),
          S('NPC-0205', '（天柏道人虽面色依旧古井无波，亦公允点头）“单师兄所言非虚。新学乍练而剑架不散、心气不乱，已足证根基端正。初试校考，准予过关！”'),
        ],
    choices: [
      {
        id: won ? 'ts10b_win_next' : 'ts10b_lose_next',
        label: '【收剑入鞘向天柏师叔与盛师兄行礼，忽闻东厢警磬骤响！】',
        tone: 'primary',
        effects: [openScene('scene_ts_11_stolen_star_tallies', 'QST-SECT-06-ENTRY')],
      },
    ],
  }
}

const SCENE_TS_10_COURTYARD_FIRST_SPAR: StorySceneDef = {
  id: 'scene_ts_10_courtyard_first_spar',
  title: '第十幕 · 苍松石坪试青锋',
  subtitle: '东岳道院演剑院 · 生平首场真气实战',
  mandatory: true,
  beats: [
    N('苍松石坪四周古柏森森，山风卷起几片松针掠过青石板面。你右手握紧沉甸甸的《武馆三才铁剑》，感受着丹田内那一缕温润绵长的松风真气顺手三阳经直贯剑脊——这是你踏入江湖以来，第一次不再赤手凭血肉蛮力搏命，而是真正以武林剑客之姿立于场中！'),
    S('NPC-0205', '（天柏道人背手立于丹墀石阶之上，声冷如铁）“道家真气重在临阵印证，纸上谈兵终是虚妄。盛定，你出列！将内息压至初窥第一重火候，与这位试炼子弟拆上数招，考较他方才所悟的筑基剑路！”'),
    S('NPC-0533', '（二十四岁的守山剑客盛定大步跃入场中，“呛”地拔出制式铁剑挽了个剑花，朗声笑道）“小师弟莫慌！咱们泰山剑法讲究『稳如泰岳，动若松涛』，只管放开手脚攻过来便是！”'),
  ],
  choices: [
    {
      id: 'ts10_start_first_spar',
      label: '【拔剑抱拳，运起《泰山松风养气诀》迎战盛定师兄！】',
      subLabel: '宗门喂招考校（点到为止，无论胜负皆可过关，胜出另有嘉奖）',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          questId: TAISHAN_ENTRY_QUEST_ID,
          opponent: { kind: 'custom', npc: buildTrialSeniorShengDing() },
          rule: 'spar',
          lethalOnLose: false,
          forbidEscapeReason: '宗门演武试剑重在堂堂正正印证所学，不可临阵脱逃！',
          introText:
            '生平首场真气剑术交锋！请在出招面板施展刚领悟的《泰山剑法（筑基篇）》，体验东岳剑派中正厚重之势！',
          onWin: [
            { type: 'giveCombatExp', amount: 35, reason: '苍松石坪初试剑锋获胜' },
            { type: 'addArtExp', artId: 'MA-168', amount: 1800 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0205' }, delta: 12 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0168' }, delta: 10 },
            { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
            openScene(regScene(buildSparAftermathScene(true)), 'QST-SECT-06-ENTRY'),
          ],
          onLose: [
            { type: 'giveCombatExp', amount: 20, reason: '苍松石坪初试剑锋磨砺' },
            { type: 'addArtExp', artId: 'MA-168', amount: 1000 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0205' }, delta: 6 },
            openScene(regScene(buildSparAftermathScene(false)), 'QST-SECT-06-ENTRY'),
          ],
          onDraw: [
            { type: 'giveCombatExp', amount: 25, reason: '苍松石坪初试剑锋平分秋色' },
            { type: 'addArtExp', artId: 'MA-168', amount: 1200 },
            openScene(regScene(buildSparAftermathScene(true)), 'QST-SECT-06-ENTRY'),
          ],
        },
      ],
    },
  ],
}

const SCENE_TS_09_PINE_WIND_AWAKENING: StorySceneDef = {
  id: 'scene_ts_09_pine_wind_awakening',
  title: '第九幕 · 松风引气初破茧',
  subtitle: '泰山派东岳道院 · 褪凡入武',
  illustrationUrl: '/assets/quests/taishan_pine_neigong.jpg',
  illustrationCaption: '东岳道院苍松石坪 · 晨雾古松下初运《泰山松风养气诀》引气破茧',
  mandatory: true,
  beats: [
    N('翌日破晓，云雾初散，宏伟古朴的【泰山派东岳道院】掩映在千年桧柏与汉碑之间。执法道人“铁骨道长”天柏道人一身铁灰道袍肃立于苍松石坪正中，听罢建蓉与巡夜弟子禀报昨夜观云亭钟声惊退宵小一事，冷峻如刀削的眉宇微微舒展。'),
    S('NPC-0205', '（天柏道人目光如电，在你与鲁苍岳身上审视片刻，沉声开口）“遇暗夜潜踪而不贪功冒进，知以钟声炭迹警醒山门，足见心有静气、行事有度。按本派旧例，试炼子弟须入册三月方授吐纳真诀；今念你二人护山有功，且有天松师兄木牌保举，本座便依律破例，先传你东岳筑基根源！”'),
    N('天柏道人命执事弟子捧来一柄分量敦实的《武馆三才铁剑》置于你膝前，随后亲自口诵《泰山松风养气诀》总纲：“夫东岳之气，起于涌泉寒岩，升于夹脊云梯，聚于气海苍松……”你盘膝坐于冰凉青石坪上，屏弃杂念，依诀缓缓引第一缕泰山晨雾清气入体！'),
    N('刹那间，原本干涸沉寂如荒原的奇经八脉仿佛迎来了春雷甘霖！一股清冽醇厚、带着千年松脂幽香的暖流自百会贯入丹田，连日挑水登山留下的淤青酸痛尽数化作蓬勃生机；再睁开双眼握住身前三才铁剑演练《泰山剑法（筑基篇）》十二式时，步履沉凝、剑风飒然，已与昨日那个手无寸铁的凡俗白丁判若云泥！'),
    S('NPC-0827', '（廊下观礼的鲁苍岳见你周身隐现清正松风气旋，不禁抚掌低呼）“好纯正的松风内息！兄台初通任督便有这般气象，当真令人叹服！”'),
  ],
  choices: [
    {
      id: 'ts09_spar_immediately',
      label: '【丹田真气充盈鼓荡，当场提剑向天柏道人请考演武！】',
      subLabel:
        '习得《泰山松风养气诀》第1重 +《泰山剑法（筑基篇）》第1重（自动运使）+ 获赐《武馆三才铁剑》，直接进入演武首战！',
      tone: 'gold',
      effects: [
        { type: 'giveItem', itemId: 'WPN-073', qty: 1 },
        { type: 'teachMartialArt', artId: 'MA-225', level: 1, exp: 1500, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-168', level: 1, exp: 1200, autoEquip: true },
        {
          type: 'branch',
          condition: {
            type: 'flag',
            flag: 'taishan_pine_enlightened',
            op: 'truthy',
            label: '曾于五大夫松下顿悟松涛呼吸理',
          },
          thenEffects: [{ type: 'addArtExp', artId: 'MA-225', amount: 3500 }],
        },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'setQuestStep',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'daoyuan_spar',
          silent: true,
        },
        openScene('scene_ts_10_courtyard_first_spar', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts09_prepare_sword_first',
      label: '【先谢恩收下铁剑退至廊下披挂整备，稍后再向天柏道人请考】',
      subLabel:
        '习得《泰山松风养气诀》+《泰山剑法（筑基篇）》+ 获赐《武馆三才铁剑》（可先打开行囊装备铁剑或闭关精修后再开战）',
      tone: 'jade',
      effects: [
        { type: 'giveItem', itemId: 'WPN-073', qty: 1 },
        { type: 'teachMartialArt', artId: 'MA-225', level: 1, exp: 1500, autoEquip: true },
        { type: 'teachMartialArt', artId: 'MA-168', level: 1, exp: 1200, autoEquip: true },
        {
          type: 'branch',
          condition: {
            type: 'flag',
            flag: 'taishan_pine_enlightened',
            op: 'truthy',
            label: '曾于五大夫松下顿悟松涛呼吸理',
          },
          thenEffects: [{ type: 'addArtExp', artId: 'MA-225', amount: 3500 }],
        },
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        setStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_spar'),
        toast('已领悟《泰山松风养气诀》与《泰山剑法（筑基篇）》并获赐《武馆三才铁剑》！可打开【贰·披挂与武学】佩上铁剑，随后找【天柏道人】或【盛定】应考演武！', 'success', '松风破茧'),
      ],
    },
  ],
}

const SCENE_TS_08_NIGHT_SHADOW_ALERT: StorySceneDef = {
  id: 'scene_ts_08_night_shadow_alert',
  title: '第八幕 · 古亭寒星窥鬼影',
  subtitle: '五大夫松观云亭 · 夜半暗流',
  mandatory: true,
  beats: [
    N('入夜之后，天松道人先行回返玉皇阁，留你与鲁苍岳在观云亭偏轩歇息，由扫阶道童建蓉添炭守炉。山巅星河璀璨如碎钻铺海，三人围着红泥小炭炉烘烤干粮，听鲁苍岳说起想把泰山历代残碑全部校勘成册的心愿，寒亭之中暖意融融。'),
    N('行至三更梆子微响，亭外千年古松树冠忽然无风自动，簌簌落下数片带霜松针！你透过轩窗缝隙凝目望去，只见一道身着夜行短衣的瘦削黑影正施展诡捷轻功，如夜枭般贴着百丈崖壁兔起鹘落，径向高处的【泰山派东岳道院】偏殿方向潜去！'),
    S('NPC-0936', '（建蓉捂住嘴唇，压低声音惊道）“这般晚了绝非本门师兄巡山——那是绿林道的《草上飞》路数！可咱们三个眼下武艺低微，你更是尚未习得内功，贸然冲出去只怕白白送命！”'),
  ],
  choices: [
    {
      id: 'ts08_mark_and_bell',
      label: '【默算黑影借力步距，以松炭标明崖壁方位后再撞响观云亭警钟！】',
      subLabel: '【算术/悟性机警】既护住同伴安全惊走夜贼，更为次日东岳道院留下关键证迹！',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【算术】≥ 16 或 先天【悟性】≥ 90',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 16 },
          { type: 'talentAtLeast', key: '悟性', min: 90 },
        ],
      },
      effects: [
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0936' }, delta: 12 },
        {
          type: 'setQuestStep',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'daoyuan_neigong',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_west',
        },
        openScene('scene_ts_09_pine_wind_awakening', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts08_ring_bell_guard',
      label: '【当机立断护在建蓉与鲁苍岳身前，奋力撞响亭角铜钟示警山门！】',
      subLabel: '【智勇双全】量力而行不逞匹夫之勇，钟声震彻山谷逼退潜入黑影',
      tone: 'primary',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0936' }, delta: 10 },
        {
          type: 'setQuestStep',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'daoyuan_neigong',
          silent: true,
        },
        {
          type: 'teleportPlayer',
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_west',
        },
        openScene('scene_ts_09_pine_wind_awakening', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

const SCENE_TS_07_FIVE_PINES_BREATH: StorySceneDef = {
  id: 'scene_ts_07_five_pines_breath',
  title: '第七幕 · 五大夫松听涛息',
  subtitle: '五大夫松观云亭 · 未习内功先调心',
  mandatory: true,
  beats: [
    N('闯过十八盘天险，单天门总算松口放行。你与鲁苍岳互相搀扶着步入苍翠幽深的【五大夫松观云亭】，五株相传秦始皇东封避雨受封的古松虬枝盘曲如苍龙探海。守亭扫阶道童建蓉早已望见二人狼狈模样，慌忙提着铜壶迎出亭外。'),
    S('NPC-0936', '（建蓉麻利地斟上两碗滚烫碧绿的松针雪水茶，脆生生笑道）“鲁师兄与这位少侠快趁热喝！能空着丹田挑两桶泉水从单师叔铁剑底下闯过十八盘的，三年里你们可是头一份呢！”'),
    S('NPC-0204', '（一袭青袍的天松道人不知何时已由山间捷径登亭，负手立于临风观景轩前，含笑指点万壑松涛）“热茶暖胃，松涛洗心。你尚未修习内家吐纳，方才全凭血肉之躯硬抗千级石阶，此刻肺腑如火烧灼吧？且闭目静听这五株古松迎风之声——风急则枝俯，风歇则干立，试以鼻息应和松涛起伏！”'),
  ],
  choices: [
    {
      id: 'ts07_comprehend_pine_wave',
      label: '【澄心绝虑，随五松涛声一呼一吸】顿悟“风过疏林气自生”之妙！',
      subLabel: '【悟性超凡】气血尽复，且预先感通任督气感（明日传授《泰山松风养气诀》额外获 +3500 熟练度！）',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '悟性', min: 90 },
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'setFlag', flag: 'taishan_pine_enlightened', value: true },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 12 },
        openScene('scene_ts_08_night_shadow_alert', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts07_steady_breathing',
      label: '【饮尽松针雪水热茶，依天松长老指点徐徐吐出胸中浊气】',
      subLabel: '气血内息尽数恢复，褪去登山疲敝',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 8 },
        openScene('scene_ts_08_night_shadow_alert', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

function build18PanAftermathScene(highBone: boolean): StorySceneDef {
  return {
    id: highBone ? 'scene_ts_06b_dragon_bone' : 'scene_ts_06b_iron_will',
    title: highBone ? '第六幕 · 天生龙虎惊铁剑' : '第六幕 · 肩血染阶动铁心',
    subtitle: '升仙坊云梯主台 · 过关定品',
    mandatory: true,
    beats: highBone
      ? [
          N('紧十八盘石阶几近垂立，后人前胸贴着前人脚跟。鲁苍岳本就筋骨赢弱，行至半途脚底血泡破裂，扁担一斜险些滑落万丈深渊！你腰马一沉，天生强横的筋骨在重压下反而节节贯通，左手稳控自家扁担纹丝不动，右手一把托住鲁苍岳的桶绳，硬是并肩稳稳踏上升仙坊最后一级石阶！'),
          S('NPC-0168', '（单天门低头往两只柏木桶里一瞅，水面连红线都没漫过半毫！这位暴脾气的铁剑道人虎目圆睁，围着你转了两圈，忍不住一拍大腿）“奇哉怪哉！丹田明明半丝内力也无，挑着百斤山泉还能腾出手拉扯同道——这副天生铜浇铁铸的好根骨，不学我泰山重剑简直暴殄天物！”'),
        ]
      : [
          N('没有真气护持的凡胎肉身，在千级绝壁石阶前尝尽了苦楚。粗砺桑木扁担磨烂了你单薄的布衫，殷红鲜血顺着锁骨渗出，被寒风吹结成冰碴；每向上挪动一级，双膝便如灌了滚铅般剧烈痉挛，喉头尽是铁锈般的血腥甜味。当鲁苍岳力竭踉跄时，你更是用血肉模糊的半边肩膀替他顶住山坳横风，一步一血印，硬生生爬上了升仙坊石台！'),
          S('NPC-0168', '（“哐当”两声，木桶落地，桶沿红线分毫不湿，你肩头衣衫却已血迹斑斑。单天门死死盯着你渗血的肩窝，半晌冷哼一声骂道）“蠢驴！不要命的倔驴！”（嘴上骂得凶狠，他却背过身从怀里摸出一盒上好道家金疮膏，粗鲁地抛进你怀里）“擦上！我泰山派宁要百折不回的倔驴，不要见难就溜的滑头——算你们两个小子过关了！”'),
        ],
    choices: [
      {
        id: highBone ? 'ts06b_bone_to_07' : 'ts06b_will_to_07',
        label: '【向单天门师叔抱拳行礼，与鲁苍岳迈入南天门往五大夫松行去】',
        tone: 'gold',
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'taishan',
            buildingId: 'ts_pine',
            spotId: 'ts_pine_main',
          },
          openScene('scene_ts_07_five_pines_breath', 'QST-SECT-06-ENTRY'),
        ],
      },
    ],
  }
}

const SCENE_TS_06_BLOOD_ON_CLOUD_STEPS: StorySceneDef = {
  id: 'scene_ts_06_blood_on_cloud_steps',
  title: '第六幕 · 云梯百丈肩泉血',
  subtitle: '十八盘千级石阶 · 凡躯砺骨',
  illustrationUrl: '/assets/quests/taishan_18pan_buckets.jpg',
  illustrationCaption: '泰山十八盘风雪千级云梯 · 布衣少年无内功挑泉喋血登升仙坊',
  mandatory: true,
  beats: [
    N('单天门指向山涧冰潭边四只箍着铜圈的大柏木水桶——桶内壁距桶口一寸处各系着一根朱砂红线。盛满刺骨山泉后，一担足有百余斤沉！此时天色骤阴，泰山半腰狂风呼啸，细碎春雪夹着冰粒迎面扑打在石阶青苔之上。'),
    S('NPC-0168', '（单天门提着黑铁重剑先一步纵上升仙坊高台，居高临下喝道）“自慢十八盘起，经不紧不慢十八盘，直登紧十八盘升仙坊，共计一千六百三十级石阶！两个时辰内挑上来，水漫红线者滚蛋，半途歇担者滚蛋！老子倒要瞧瞧，天松师兄看中的人是真铁汉还是软脚虾！”'),
    S('NPC-0827', '（鲁苍岳咬紧嘴唇将扁担压上单薄书生肩头，双腿猛地一沉，却向你露出一个倔强笑容）“兄台，咱们一块儿上！便是爬，今日也要爬进南天门！”'),
  ],
  choices: [
    {
      id: 'ts06_climb_high_bone',
      label: '【气沉腰胯，凭天生龙虎根骨挑起百斤冰泉，更腾手稳住鲁苍岳扁担！】',
      subLabel: '【先天根骨 ≥ 90】步履如铁铸磐石，令单天门大为震惊（好感 +20，鲁苍岳缘分 +15）',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '根骨', min: 90 },
      effects: [
        { type: 'advanceShichen', count: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0168' }, delta: 20 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 2 },
        openScene(regScene(build18PanAftermathScene(true)), 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts06_climb_iron_will',
      label: '【纵无真气护体、扁担磨破肩头渗血，亦咬碎牙关替鲁苍岳挡风一步步挪上云梯！】',
      subLabel:
        '【凡躯铁志 · 零门槛】体验无内功白丁血汗登天的悲壮磨砺（侠义 +10，单天门好感 +18，鲁苍岳缘分 +20）',
      tone: 'primary',
      effects: [
        { type: 'advanceShichen', count: 2 },
        { type: 'modifyChivalry', delta: 10, reason: '十八盘风雪喋血扶助同道' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0168' }, delta: 18 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 20 },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 20 },
        openScene(regScene(build18PanAftermathScene(false)), 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

const SCENE_TS_05_IRON_SWORD_GATE: StorySceneDef = {
  id: 'scene_ts_05_iron_sword_gate',
  title: '第五幕 · 云梯拦路铁剑横',
  subtitle: '东岳泰山 · 十八盘云梯石阶',
  mandatory: true,
  beats: [
    N('出济南府南行入泰安境，巍巍东岳拔地通天。行至【十八盘云梯石阶】山门仰首望去，但见两山崖壁如削，一条白石天梯自云雾缝隙间直垂而下，仰视南天门恍若悬在九霄天际！'),
    N('云梯入口石坊前，“铛”的一声巨响震得脚底石板发麻——一名年逾五旬、浓眉虬髯的魁梧道人将一口无锋黑铁重剑狠狠杵在青石缝里，双臂抱胸横立当关，正是杀得京东响马不敢近泰安百里的泰山派传功师叔“铁剑道人”单天门！'),
    S('NPC-0168', '（单天门接过你呈上的《东岳松纹试剑木牌》扫了一眼，又伸出铁钳般的大手在你脉门上一搭，顿时浓眉倒竖，嗓音似破锣闷雷）“胡闹！天松师兄在济南喝茶喝糊涂了不成？！你小子奇经八脉空空如也，连半缕内家真气都没练出来，纯属一介白丁！”'),
    S('NPC-0168', '“我泰山十八盘陡逾七十度，莫说寻常百姓三步一喘、十步手脚并用，便是练过三年外家拳脚的武夫上来也得脱层皮！没内功护住心脉便想入我东岳道院学剑？趁早下山回家种地读书，免得摔断腿骨还要老子派人抬下去！”'),
    P('（你迎着单天门灼灼逼人的虎目，挺直脊梁朗声答道）“回单师叔！天下武人，谁不是自手无寸铁的白丁一步步练起？晚辈既蒙天松长老赐牌，哪怕十八盘是刀山火海，今日也断无半途折返之理！”'),
  ],
  choices: [
    {
      id: 'ts05_accept_bucket_test',
      label: '【请单天门师叔尽管出题考校！】',
      tone: 'gold',
      effects: [openScene('scene_ts_06_blood_on_cloud_steps', 'QST-SECT-06-ENTRY')],
    },
  ],
}

const SCENE_TS_04_RAINY_INN_BRIBE: StorySceneDef = {
  id: 'scene_ts_04_rainy_inn_bribe',
  title: '第四幕 · 历下夜雨拒重金',
  subtitle: '历下泉畔悦来客栈 · 同道交心',
  mandatory: true,
  beats: [
    N('当夜春雨淅沥，敲打着【历下泉畔悦来客栈】的青瓦木窗。通铺油灯昏黄，鲁苍岳小心翼翼地用针线缝补着一双磨穿了脚后跟的麻布草鞋，见你看他，有些局促地红了耳根，从包袱里捧出两块干硬的菜团子递来一块。'),
    S('NPC-0827', '“让兄台见笑了。小弟本是曲阜乡间寒门书生，五年前京东黄河决口、悍匪趁灾劫掠，爹娘皆死于乱刀之下……小弟嘴笨力薄，考不取功名，便立誓拜入泰山派学剑护佑乡邻。在岱庙扫了三年碑廊，好容易才盼到明日随兄台一道登山应试。”'),
    N('你正欲温言宽慰，“笃、笃”两声轻响，门缝下悄无声息滑入一只油纸扁匣！推窗望去，雨幕屋脊上唯有一道轻捷黑影一闪即逝。打开油纸匣一看，里头竟整整齐齐码着两锭二十五两的雪花纹银，附着一张无名短笺：“奉银五十两，买足下手中松纹木牌一用；若足下不愿让牌，上山后替某拓印一份东岳道院偏殿星筹图，事成再奉百金——白昼茶席故人留。”'),
    P('（你眼神骤冷，记起白日趵突泉畔那位皮笑肉不笑的“江南茶商钱先生”，当即将狂妄短笺凑到油灯火苗上烧成灰烬，连同原匣原银一把掷出窗外石阶，朗声喝向雨夜）“泰山信义岂是黄白脏物可买！藏头露尾之辈，趁早死了这条心！”'),
    N('屋檐暗影处传来一声阴鸷冷哼，随即踏瓦远遁。灯下鲁苍岳看得心潮澎湃，起身向你深深一揖。'),
  ],
  choices: [
    {
      id: 'ts04_share_supplies',
      label: '【拒五十两脏银如敝履，转头却掏出自家干粮与碎银塞给鲁苍岳买双新草鞋】',
      subLabel:
        '【重义轻财（需纹银 ≥ 5 两）】耗银 5 两助同道置办登山鞋粮，鲁苍岳结下生死情谊（缘分 +25，侠义 +10）',
      tone: 'gold',
      condition: { type: 'silverAtLeast', min: 5 },
      effects: [
        { type: 'giveSilver', amount: -5, reason: '历下客栈赠银助鲁苍岳购置登山鞋粮' },
        { type: 'giveFood', amount: 2 },
        { type: 'modifyChivalry', delta: 10, reason: '拒五十两贿银而解囊助同门' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 25 },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 25 },
        setStep(TAISHAN_ENTRY_QUEST_ID, 'climb_18pan'),
        toast('历下夜雨盟心！请持《东岳松纹试剑木牌》离开济南府，前往【东岳泰山 · 十八盘云梯石阶】应试！', 'success', '夜雨拒金'),
      ],
    },
    {
      id: 'ts04_encourage_brother',
      label: '【掷还脏银，与鲁苍岳分食菜团、共剪灯花砥砺明晨登山之志】',
      subLabel: '【清白共勉】获干粮 +2，江湖侠义 +8，鲁苍岳好感 +15，明晨共赴东岳泰山',
      tone: 'primary',
      effects: [
        { type: 'giveFood', amount: 2 },
        { type: 'modifyChivalry', delta: 8, reason: '历下夜雨严拒五十两贿银' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 15 },
        setStep(TAISHAN_ENTRY_QUEST_ID, 'climb_18pan'),
        toast('已严拒宵小贿赂！请由大地图前往【东岳泰山 · 十八盘云梯石阶】接受单天门师叔考校！', 'talk', '东岳试剑'),
      ],
    },
  ],
}

function buildBaotuGrantTokenScene(mode: 'comprehension' | 'grace' | 'chaquan' | 'steady'): StorySceneDef {
  const reply = {
    comprehension: {
      playerBeat:
        '（你凝视槛外三股翻涌如雪的泉柱，从容拱手）“先生只见水花喧腾，未见泉底齐州青石历经千载冲击而岿然不动。泉涌虽急，根基常静；正如泰山剑道，外现雷霆万钧之势，内守清静无为之心，何来浮躁二字？”',
      elderBeat:
        '（天松道人抚掌朗笑，茶盏轻顿）“好一个『泉涌虽急，根基常静』！未学一招剑法，已先悟透我道门动静相济之理，这份通透悟性，当浮一大白！”',
    },
    grace: {
      playerBeat:
        '（你临风轩立，衣袂虽朴却神采清朗，缓声吟道）“曾闻齐鲁山川气，尽在历下白雪泉；莫道清流无铁骨，出山便是济民川！”言辞清越，气度雍容，满榭齐鲁儒生尽皆击节称赏。',
      elderBeat:
        '（天松道人捻须微笑，目露嘉许）“吐属风雅而胸怀济世之志，全无草莽戾气！我东岳道门立身齐鲁礼仪之邦，正需你这般清正俊彦！”',
    },
    chaquan: {
      playerBeat:
        '（你抱拳行了个标准利落的山东武林抱刀礼，坦然道）“晚辈曾蒙济南【齐鲁查拳总馆】指点筋骨，深知查馆主常训『拳起于礼而止于义』。泰山派为齐鲁正道魁首，数十年弹压响马、护持商旅，公信自在百姓口碑，岂是口舌可轻慢？”',
      elderBeat:
        '（一旁的齐鲁巡察执事鲁星帆眼睛一亮，天松道人更是欣然颔首）“原来与查冠东总馆主一脉有渊源！查拳舒展刚正，与我泰山剑理本就同气连枝，难怪进退如此有度！”',
    },
    steady: {
      playerBeat:
        '（你并不与那江南茶商逞口舌之快，只是双手捧起案上滚烫满溢的趵突泉茶盏，稳稳敬至天松道人面前——盏中茶汤平如明镜，半滴未洒）“晚辈一介白丁，不懂高深玄理，只知做人与端茶一般：心正手稳，便不怕外头水急风狂。”',
      elderBeat:
        '（天松道人接过茶盏，温煦一笑）“大巧若拙，至诚胜辩！钱先生，你可瞧见了？这便是齐鲁子弟的脊梁！”',
    },
  }[mode]

  return {
    id: `scene_ts_03b_baotu_token_${mode}`,
    title: '第三幕 · 松纹木牌许登岳',
    subtitle: '趵突泉观澜榭 · 恩师赐牌',
    mandatory: true,
    beats: [
      P(reply.playerBeat),
      S('NPC-0204', reply.elderBeat),
      N('那自称“钱先生”的江南茶商讨了个没趣，眼底闪过一丝不易察觉的阴鸷，目光却似有意无意地扫过天松道人从袖中取出的那枚古朴木牌，随即借故离席而去。'),
      S('NPC-0204', '（天松道人将一枚阴刻五岳真形篆文的雷击松木牌郑重交入你手中）“此乃老道亲签的《东岳松纹试剑木牌》。明日你与苍岳一并动身南赴【东岳泰山】，先过你单天门师叔镇守的十八盘云梯，再入东岳道院习剑。记住：单师弟脾气虽烈如火炭，看的却是一颗赤诚硬心！”'),
    ],
    choices: [
      {
        id: `ts03b_go_inn_now_${mode}`,
        label: '【拜谢天松长老赐牌，随鲁苍岳回历下泉畔客栈整顿行装准备明早登山】',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ITM-MSC-026', qty: 1 },
          { type: 'advanceShichen', count: 2 },
          {
            type: 'setQuestStep',
            questId: TAISHAN_ENTRY_QUEST_ID,
            stepId: 'inn_night_oath',
            silent: true,
          },
          {
            type: 'teleportPlayer',
            regionId: 'jinan',
            buildingId: 'jinan_base_inn',
            spotId: null,
          },
          openScene('scene_ts_04_rainy_inn_bribe', 'QST-SECT-06-ENTRY'),
        ],
      },
    ],
  }
}

const SCENE_TS_03_BAOTU_TEA_TRIAL: StorySceneDef = {
  id: 'scene_ts_03_baotu_tea_trial',
  title: '第三幕 · 趵突烹泉试清音',
  subtitle: '济南府趵突泉 · 临风观景轩',
  mandatory: true,
  beats: [
    N('随鲁苍岳穿过垂柳依依的历下水巷，步入名震齐鲁的【趵突泉（观澜榭）】。但见槛外平地三窟突起，雪涛数尺，声若隐雷；临风观景轩内松烟竹炉正沸，一位四旬有余、青袍道冠、风神散朗的长老正与数位济南名士品茗论剑——正是泰山派玉皇阁长老“苍松剑客”天松道人，身侧侍立着齐鲁巡察执事鲁星帆。'),
    S('NPC-0827', '（鲁苍岳恭谨上前行礼，将方才岱庙恶汉闹事、你挺身相助及碑阴暗记之事一一禀明）“天松师叔，这位少侠虽未入武门，却侠肝义胆，更有一心向道求剑之志！”'),
    S(SPEAKER_QIAN_YEXIAO, '（席末一名身穿湖绸直裰、自称江南茶商“钱先生”的中年文士忽然摇扇轻笑，语带机锋）“呵呵，久闻东岳泰山派执五岳公信，今日一见倒叫在下纳罕——连毫无内功根底的白丁路人也往山上引荐？正如此间趵突泉水，翻腾虽猛却终究急躁外露，莫非齐鲁武林也徒剩虚张声势了么？”'),
    S('NPC-0278', '（鲁星帆眉峰一凛正欲发作，天松道人却抬手轻按茶壶，饶有兴致地将温和目光投向你）“小友，这位钱先生以泉水讥我东岳门风，你既欲登我泰山，且替老道答他一答。”'),
  ],
  choices: [
    {
      id: 'ts03_reply_comprehension',
      label: '【以动静剑理破题】“泉涌虽急，水底青岩千载不动；外现雷霆而内守清静，方是东岳气象！”',
      subLabel: '【先天悟性 ≥ 90】一言契合道门剑心，天松道人抚掌击节（好感 +15）',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '悟性', min: 90 },
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        openScene(regScene(buildBaotuGrantTokenScene('comprehension')), 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts03_reply_grace_poem',
      label: '【临轩赋诗从容雅辩】“莫道清流无铁骨，出山便是济民川！”',
      subLabel: '【颜值 ≥ 90 或 诗词 ≥ 18】气度清华折服满座名士，十艺【诗词】+2，天松好感 +15',
      tone: 'jade',
      condition: {
        type: 'any',
        hint: '需先天【颜值】≥ 90 或 十艺【诗词】≥ 18',
        conditions: [
          { type: 'talentAtLeast', key: '颜值', min: 90 },
          { type: 'skillAtLeast', key: '诗词', min: 18 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '诗词', delta: 2 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        openScene(regScene(buildBaotuGrantTokenScene('grace')), 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts03_reply_chaquan',
      label: '【亮出齐鲁查拳馆渊源行武林正礼】“泰山派护佑齐鲁商旅数十年，公信在黎民口碑！”',
      subLabel: '【查拳前缘专属】天松道人与鲁星帆倍感亲切（二者好感各 +15 / +10）',
      tone: 'gold',
      condition: CHAQUAN_HERITAGE_CONDITION,
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0278' }, delta: 10 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        openScene(regScene(buildBaotuGrantTokenScene('chaquan')), 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts03_reply_steady_tea',
      label: '【双手稳捧满盏滚沸泉茶敬上，半滴不晃】“心正手稳，便不怕外头水急风狂！”',
      subLabel: '【至诚拙朴 · 零门槛】天松道人欣然嘉许（好感 +10）',
      tone: 'primary',
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0204' }, delta: 10 },
        openScene(regScene(buildBaotuGrantTokenScene('steady')), 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

const SCENE_TS_02_STELE_CIPHER: StorySceneDef = {
  id: 'scene_ts_02_stele_cipher',
  title: '第二幕 · 东厢拾拓见算痕',
  subtitle: '泰山岱庙行祠 · 东厢碑廊结善缘',
  mandatory: true,
  beats: [
    N('恶汉刁横虎灰溜溜窜出岱庙山门，天门院道长盛峰涛嘱咐几句庙中戒备后回殿主持香火。东厢碑廊古柏荫下，盲眼孙老石匠千恩万谢地离去，那名左袖被撕裂一角的年轻泰山俗家弟子连忙蹲下身，心疼地拾拢散落一地的宣纸碑拓，向你郑重抱拳。'),
    S('NPC-0827', '“在下鲁苍岳，添为泰山派外围俗家记名弟子，奉命在此看护秦汉古碑。方才若非兄台仗义援手，莫说孙老伯要受重伤，我苦拓三个月的《秦泰山刻石》与《东封星度碑》拓片也全毁了……敢问兄台高姓大名？莫非也是仰慕东岳剑道而来？”'),
    N('你互通姓名、道明慕名求学之意，蹲身帮鲁苍岳整理散乱的拓纸。手指拂过底座那通《东封星度碑》背面时，你忽然触到几道崭新泛白的指甲刻痕——方才那伙恶客看似无理取闹，实则在趁乱偷拓碑阴记载的东岳道院方位与二十八宿晷影度数！'),
  ],
  choices: [
    {
      id: 'ts02_math_calligraphy',
      label: '【细辨碑阴新痕与残碑篆序】按《周髀》数理替鲁苍岳排定错乱拓片，并点破贼人盗拓算度企图！',
      subLabel:
        '【算术/书法初显】十艺【算术】+2、【书】+1，鲁苍岳惊佩不已（缘分 +15），引荐赴趵突泉拜见天松长老',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【算术】≥ 16 或 十艺【书】≥ 16',
        conditions: [
          { type: 'skillAtLeast', key: '算术', min: 16 },
          { type: 'skillAtLeast', key: '书', min: 16 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '算术', delta: 2 },
        { type: 'modifySkill', key: '书', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 15 },
        {
          type: 'startQuest',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'visit_baotu_tiansong',
        },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 15 },
        { type: 'addFlagNumber', flag: 'taishan_aptitude_score', delta: 1 },
        toast('已结识同门挚友【鲁苍岳】！请前往济南府【趵突泉（观澜榭）】拜谒玉皇阁长老【天松道人】求取登山木牌。', 'success', '岱宗问数'),
      ],
    },
    {
      id: 'ts02_sincere_help',
      label: '【耐心陪鲁苍岳将百余张碑拓逐页抚平收妥，提醒他提防方才那伙窥碑恶客】',
      subLabel: '【诚笃结缘】十艺【经义】+1，鲁苍岳引你为知己（缘分 +12），同赴趵突泉拜见天松长老',
      tone: 'primary',
      effects: [
        { type: 'modifySkill', key: '经义', delta: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0827' }, delta: 12 },
        {
          type: 'startQuest',
          questId: TAISHAN_ENTRY_QUEST_ID,
          stepId: 'visit_baotu_tiansong',
        },
        { type: 'addFlagNumber', flag: 'taishan_cangyue_bond', delta: 12 },
        toast('已开启泰山派入门长卷《岱宗问数 · 松风破茧》！请前往济南府【趵突泉（观澜榭）】拜谒【天松道人】。', 'talk', '岱宗问数'),
      ],
    },
  ],
}

const SCENE_TS_01_DAIMIAO_CONFLICT: StorySceneDef = {
  id: 'scene_ts_01_daimiao_conflict',
  title: '第一幕 · 岱庙古柏护残碑',
  subtitle: '济南府 · 泰山岱庙行祠（零内功入世篇）',
  mandatory: true,
  beats: [
    N('{reignYear}仲春，齐州济南府泉水淙淙、柳色新裁。城南【泰山岱庙行祠】内秦汉古柏参天，香客络绎不绝。你一介布衣行者，丹田尚无半点内家真气，只怀着对五岳独尊东岳剑派的无限向往踏入庙门，忽闻东厢碑廊传来瓷墨碎裂与粗野喝骂之声！'),
    S(SPEAKER_DIAO_HENGHU, '（一名虎背熊腰、虎口满是厚重刀茧的锦衣疤面恶汉一脚踢翻拓碑木凳，揪住一名二十出头的青衫俗家弟子衣领猛拽，“嗤啦”扯下一角染墨布袖）“瞎了眼的酸丁和老石匠！爷几个从京东道来烧高香，摸两下这破石头碑怎么了？撞脏了爷的鹿皮靴，今日不赔十两银子，把你们连人带碑一块儿砸个稀烂！”'),
    S(SPEAKER_BLIND_MASON, '（跌坐在地的盲眼孙老石匠死死护住怀里一方秦篆残石，颤声哀告）“使不得啊大爷！这是李斯丞相传世的刻石副本，朝廷与泰山派明令护持的古物，碰坏一角老朽万死莫赎啊……”'),
    S('NPC-0827', '（年轻俗家弟子鲁苍岳嘴唇笨拙，气得满脸通红却不知如何巧言周旋，只张开双臂死死拦在古碑与老石匠身前）“你、你们不可毁损古碑！这是东岳先贤遗泽……”'),
    N('那疤面大汉狞笑一声，砂锅大的铁拳挟着劲风便往鲁苍岳面门砸落！你深知自己眼下毫无内功根底，硬拼重拳必吃大亏，然见义勇为之心已如烈火腾起——'),
  ],
  choices: [
    {
      id: 'ts01_eloquence_deter',
      label: '【朗声喝止，引大宋《毁损先代碑碣律》与天门院护法名号智慑恶徒！】',
      subLabel:
        '【辩才/经义智破（零战损）】十艺【辩才】+2，盛峰涛道长闻声赶至喝退恶徒，鲁苍岳缘分 +15',
      tone: 'gold',
      condition: {
        type: 'any',
        hint: '需十艺【辩才】≥ 16 或 十艺【经义】≥ 16',
        conditions: [
          { type: 'skillAtLeast', key: '辩才', min: 16 },
          { type: 'skillAtLeast', key: '经义', min: 16 },
        ],
      },
      effects: [
        { type: 'modifySkill', key: '辩才', delta: 2 },
        { type: 'modifyChivalry', delta: 6, reason: '岱庙智护古碑与老石匠' },
        { type: 'setFlag', flag: 'taishan_cangyue_bond', value: 15 },
        { type: 'setFlag', flag: 'taishan_aptitude_score', value: 1 },
        openScene('scene_ts_02_stele_cipher', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts01_silver_resolve',
      label: '【掷出五两碎银引开恶汉贪目，顺势扶起老石匠并暗记贼人虎口绿林刀茧】',
      subLabel: '【急智解围（需纹银 ≥ 5 两）】耗银 5 两平息干戈，侠义 +6，鲁苍岳缘分 +15',
      tone: 'jade',
      condition: { type: 'silverAtLeast', min: 5 },
      effects: [
        { type: 'giveSilver', amount: -5, reason: '岱庙掷银替老石匠解围护碑' },
        { type: 'modifyChivalry', delta: 6, reason: '岱庙散财护弱' },
        { type: 'setFlag', flag: 'taishan_cangyue_bond', value: 15 },
        { type: 'setFlag', flag: 'taishan_aptitude_score', value: 0 },
        openScene('scene_ts_02_stele_cipher', 'QST-SECT-06-ENTRY'),
      ],
    },
    {
      id: 'ts01_body_shield',
      label: '【纵无半点内功亦毫不退缩，飞身扑上以肩背替鲁苍岳硬扛一掌！】',
      subLabel:
        '【赤手侠骨 · 零门槛】受轻伤（气血微损）获天门院道长盛峰涛飞鞘相救，侠义 +10，鲁苍岳铭感于心（缘分 +20）',
      tone: 'primary',
      effects: [
        { type: 'healPlayer', hpPct: -15 },
        { type: 'modifyChivalry', delta: 10, reason: '无内功之躯于岱庙舍身护同道' },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0267' }, delta: 10 },
        { type: 'setFlag', flag: 'taishan_cangyue_bond', value: 20 },
        { type: 'setFlag', flag: 'taishan_aptitude_score', value: 0 },
        openScene('scene_ts_02_stele_cipher', 'QST-SECT-06-ENTRY'),
      ],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  ...EXTRA_SCENES,
  [SCENE_TS_20_OVERLOOKING_QILU.id]: SCENE_TS_20_OVERLOOKING_QILU,
  [SCENE_TS_19_SUNRISE_INVESTITURE.id]: SCENE_TS_19_SUNRISE_INVESTITURE,
  [SCENE_TS_18_THREE_QUESTIONS_DAWN.id]: SCENE_TS_18_THREE_QUESTIONS_DAWN,
  [SCENE_TS_17_GNOMON_SWORD_CALC.id]: SCENE_TS_17_GNOMON_SWORD_CALC,
  [SCENE_TS_16_SUMMIT_SUMMONS.id]: SCENE_TS_16_SUMMIT_SUMMONS,
  [SCENE_TS_15_CLIFF_LAW_DEBATE.id]: SCENE_TS_15_CLIFF_LAW_DEBATE,
  [SCENE_TS_14_HEAVY_SWORD_THUNDER.id]: SCENE_TS_14_HEAVY_SWORD_THUNDER,
  [SCENE_TS_13_PINE_WOODS_INTERCEPT.id]: SCENE_TS_13_PINE_WOODS_INTERCEPT,
  [SCENE_TS_12_STELE_CORRIDOR_CLUES.id]: SCENE_TS_12_STELE_CORRIDOR_CLUES,
  [SCENE_TS_11_STOLEN_STAR_TALLIES.id]: SCENE_TS_11_STOLEN_STAR_TALLIES,
  [SCENE_TS_10_COURTYARD_FIRST_SPAR.id]: SCENE_TS_10_COURTYARD_FIRST_SPAR,
  [SCENE_TS_09_PINE_WIND_AWAKENING.id]: SCENE_TS_09_PINE_WIND_AWAKENING,
  [SCENE_TS_08_NIGHT_SHADOW_ALERT.id]: SCENE_TS_08_NIGHT_SHADOW_ALERT,
  [SCENE_TS_07_FIVE_PINES_BREATH.id]: SCENE_TS_07_FIVE_PINES_BREATH,
  [SCENE_TS_06_BLOOD_ON_CLOUD_STEPS.id]: SCENE_TS_06_BLOOD_ON_CLOUD_STEPS,
  [SCENE_TS_05_IRON_SWORD_GATE.id]: SCENE_TS_05_IRON_SWORD_GATE,
  [SCENE_TS_04_RAINY_INN_BRIBE.id]: SCENE_TS_04_RAINY_INN_BRIBE,
  [SCENE_TS_03_BAOTU_TEA_TRIAL.id]: SCENE_TS_03_BAOTU_TEA_TRIAL,
  [SCENE_TS_02_STELE_CIPHER.id]: SCENE_TS_02_STELE_CIPHER,
  [SCENE_TS_01_DAIMIAO_CONFLICT.id]: SCENE_TS_01_DAIMIAO_CONFLICT,
}
