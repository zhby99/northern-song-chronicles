import type { NodeNpc } from '../../../types/game'
import type { QuestDefinition, StorySceneDef } from '../../../types/quest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../itemsDb'

const QUEST_ID = 'QST-ADV-BABUGANCHAN'

/**
 * 截风门探子「灰鹞」陆七（开封樊楼初战）
 */
function buildJiefengScoutNpc(): NodeNpc {
  return {
    id: 'CUSTOM-BBGC-LUQI',
    name: '陆七',
    title: '截风门暗哨 · 灰鹞',
    realm: '三流上品',
    factionId: 'SECT-18',
    factionName: '截风门余孽',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    stats: {
      hp: 420,
      mp: 220,
      agi: 52,
      res: 18,
      isBenchmark: false,
    },
    talents: { bone: 58, comprehension: 48, charm: 34 },
    fullLocationLabel: '开封府 > 樊楼（飞桥灯火） > 三层五楼飞桥雅阁',
    equippedArts: {
      neigong: 'MA-162',
      qinggong: 'MA-157',
      move1: 'MA-151',
      move2: 'MA-142',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-162', level: 3, exp: 0 },
      { artId: 'MA-157', level: 3, exp: 0 },
      { artId: 'MA-151', level: 3, exp: 0 },
      { artId: 'MA-142', level: 2, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-072',
    },
    questBadgeLabel: '截风暗哨',
    talk: '“哪里来的野小子，也敢插手我截风门三十年的旧账？吃我一记断风刀！”',
  }
}

/**
 * 截风门二当家「断翅鹞」陆横（洛阳白马寺齐云塔之战）
 */
function buildJiefengDeputyNpc(): NodeNpc {
  return {
    id: 'CUSTOM-BBGC-LUHENG',
    name: '陆横',
    title: '截风门二当家 · 断翅鹞',
    realm: '二流下品',
    factionId: 'SECT-18',
    factionName: '截风门余孽',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    stats: {
      hp: 680,
      mp: 360,
      agi: 62,
      res: 26,
      isBenchmark: false,
    },
    talents: { bone: 68, comprehension: 56, charm: 38 },
    fullLocationLabel: '洛阳府 > 白马寺（释源祖庭） > 齐云密檐舍利古塔',
    equippedArts: {
      neigong: 'MA-162',
      qinggong: 'MA-138',
      move1: 'MA-116',
      move2: 'MA-151',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-162', level: 4, exp: 0 },
      { artId: 'MA-138', level: 4, exp: 0 },
      { artId: 'MA-116', level: 4, exp: 0 },
      { artId: 'MA-151', level: 4, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-059',
    },
    questBadgeLabel: '断翅鹞',
    talk: '“沈疏影那个老东西死了三十年，留下的半部破步法也值得你们这般护着？今日便拆了这齐云塔的飞檐！”',
  }
}

/**
 * 截风门门主「绝影鬼手」阴九幽（洛阳牡丹园碧溪水榭终战）
 */
function buildYinJiuyouBossNpc(weakened: boolean): NodeNpc {
  return {
    id: weakened ? 'CUSTOM-BBGC-YIN-WEAK' : 'CUSTOM-BBGC-YIN-FULL',
    name: weakened ? '阴九幽（步法受制）' : '阴九幽',
    title: '截风门门主 · 绝影鬼手',
    realm: weakened ? '二流中品' : '二流上品',
    factionId: 'SECT-18',
    factionName: '截风门总舵',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    stats: weakened
      ? {
          hp: 820,
          mp: 440,
          agi: 64,
          res: 28,
          isBenchmark: false,
        }
      : {
          hp: 1050,
          mp: 540,
          agi: 74,
          res: 34,
          isBenchmark: false,
        },
    talents: { bone: 74, comprehension: 70, charm: 32 },
    fullLocationLabel: '洛阳府 > 洛阳牡丹园（国色芳苑） > 碧溪虹桥琴画水榭',
    equippedArts: {
      neigong: 'MA-162',
      qinggong: 'MA-138',
      move1: 'MA-128',
      move2: 'MA-116',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-162', level: 5, exp: 0 },
      { artId: 'MA-138', level: 5, exp: 0 },
      { artId: 'MA-128', level: 5, exp: 0 },
      { artId: 'MA-116', level: 4, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-037',
    },
    questBadgeLabel: '绝影鬼手',
    talk: '“三十年了！当年沈疏影宁可跳崖碎骨也不肯交出《八步赶蝉》全本，今日三卷既已聚齐，便连你与这水榭一并沉入洛水！”',
  }
}

// ============================================================================
// 二十二幕完整剧本：《秋蝉八步 · 汴洛遗踪》
// ============================================================================

const SCENE_04_FANLOU_BATTLE_AFTER: StorySceneDef = {
  id: 'scene_bbgc_04_fanlou_after',
  title: '第四幕 · 飞桥折翅录供词',
  subtitle: '开封府 · 樊楼三层五楼飞桥雅阁',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '陆七被少侠一记凌厉招式逼得连退七步，背脊重重撞在樊楼飞桥朱漆栏杆上。栏外便是灯火如昼的御街长河，寒风一吹，他手中那柄淬过乌油的短刀“哐当”落地，整个人瘫软在描金地砖上，嘴角溢出一缕血丝。',
    },
    {
      speaker: { kind: 'custom', name: '陆七', title: '截风门暗哨 · 灰鹞', factionName: '截风门余孽' },
      text: '“好俊的身手……难怪程万里那个老不死的敢把‘秋蝉令’亮出来！别杀我……我说！截风门三十年前在汴洛古道截杀沈疏影，原本以为三卷轻功秘谱尽数毁于大火，谁知去年冬里，门主阴九幽竟在黑市买到半张旧图，指明上卷藏在开封大相国寺资圣八角宝塔的塔刹暗格！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“资圣宝塔？那其余两卷呢？你们门主阴九幽如今人在何处？”',
    },
    {
      speaker: { kind: 'custom', name: '陆七', title: '截风门暗哨 · 灰鹞', factionName: '截风门余孽' },
      text: '“小人只奉命盯梢樊楼与程万里！听说二当家陆横已带人先行西去洛阳白马寺，至于门主他老人家……行踪向来鬼魅，只留下一句‘月落碧溪，牡丹水榭收网’。少侠饶命，小人身上只有这枚拓印用的蜡丸与几两碎银，全数奉上！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '话音未落，陆七忽地袖口一抖，抛出一把呛人的烟灰，翻身跃出飞桥栏杆，借着屋檐斜坡滚入夜色深巷。少侠并未盲目追击，而是拾起地上那枚刻着“截风”二字的乌铜腰牌，目光越过重重飞檐，望向西南方灯火孤耸的大相国寺八角琉璃宝塔。',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'bbgc_fanlou_cleared', value: true },
    { type: 'giveSilver', amount: 18, reason: '缴获截风门暗哨随身盘缠' },
    { type: 'giveCombatExp', amount: 80, reason: '樊楼飞桥擒贼印证' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'kaifeng_pagoda',
      silent: false,
    },
    {
      type: 'toast',
      text: '樊楼夜战得胜！已探明上卷《蝉蜕息》藏于【开封府 · 大相国寺 · 资圣八角琉璃宝塔】。',
      tone: 'success',
      logTag: '秋蝉八步',
    },
  ],
}

const SCENE_03_FANLOU_OBSERVE: StorySceneDef = {
  id: 'scene_bbgc_03_fanlou_observe',
  title: '第三幕 · 飞桥夜影起杀机',
  subtitle: '开封府 · 樊楼三层五楼飞桥雅阁',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '亥时三刻，樊楼正值夜宴极盛之时。五座高楼之间以朱漆飞桥凌空相连，丝竹琵琶与劝酒猜枚声顺着晚风飘散十里。少侠依程万里所指，悄然登上东侧三楼回廊，只见飞桥尽头一处背灯雅阁的窗纸上，正映出一道瘦削如鹰的身影。',
    },
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '（低声传音）“少侠且看那人落脚的步态——左足虚点、右膝微曲，分明是江湖黑道‘截风门’的壁虎游墙路数！三十年前就是这帮宵小在邙山风陵渡设伏，用渔网与铁蒺藜暗算了沈大侠的轻功！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠凝神细观，果见那灰衣汉子从怀中摸出一卷泛黄的帛书抄本，借着廊下灯笼余光比对地形，嘴角露出一丝阴笑。似乎察觉到楼外目光有异，那汉子猛然推窗跃出，脚尖在飞桥斗拱上连点两下，手中短刀寒光直扑雅阁而来！',
    },
    {
      speaker: { kind: 'custom', name: '陆七', title: '截风门暗哨 · 灰鹞', factionName: '截风门余孽' },
      text: '“程老鬼，你果然还没死绝！还敢带个雏儿来樊楼送死？今日便拿你们二人的性命，祭我截风门三十年前折损的兄弟！”',
    },
  ],
  choices: [
    {
      id: 'bbgc_fanlou_fight',
      label: '迎击截风门暗哨「灰鹞」陆七',
      subLabel: '剧情试炼（即使失手亦可重整再战）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildJiefengScoutNpc() },
          rule: 'story_trial',
          questId: QUEST_ID,
          forbidEscapeReason: '飞桥狭路相逢，退无可退！',
          onWin: [{ type: 'openScene', scene: SCENE_04_FANLOU_BATTLE_AFTER }],
          onLose: [
            { type: 'healPlayer', hpPct: 50, mpPct: 50 },
            {
              type: 'toast',
              text: '陆七身法刁钻，少侠一时失手落于下风，可调息后再次挑战！',
              tone: 'warn',
            },
          ],
        },
      ],
    },
  ],
}

const SCENE_02_CHENG_EXPLAINS: StorySceneDef = {
  id: 'scene_bbgc_02_cheng_explains',
  title: '第二幕 · 秋蝉残令话旧事',
  subtitle: '开封府 · 汴河虹桥临水酒肆',
  beats: [
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '老人接过那半枚青铜残令，枯瘦的手指微微一颤，浑浊的双眼骤然亮起一丝久违的锐芒。他将酒碗推开半尺，顺手把桌上的油纸伞横在二人之间，示意少侠压低声息。',
    },
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '“少侠既是如今江湖上声名鹊起的人物，老朽也就不瞒你了。这枚‘秋蝉令’，乃三十年前庆历之前名动中原的轻功大宗师‘云外蝉’沈疏影沈大侠的随身信物！当年沈大侠自创一门地阶轻功《八步赶蝉》，足尖连点八步而气不喘，追风逐月，连大内高手也自叹弗如。”',
    },
    {
      speaker: { kind: 'player' },
      text: '“既是一代宗师绝学，为何会流落出一枚残令，还引得黑道贼人窥伺？”',
    },
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '“唉……三十年前北边战事吃紧，沈大侠受故友所托，孤身携带一道关乎河北防务的密折自洛阳赶往东京。谁知行至巩义古道，竟遭黑道第一暗杀帮派‘截风门’倾巢伏击！那一战沈大侠力竭坠崖，密折虽由老朽拼死接应送入枢密院，可《八步赶蝉》的秘谱却一分为三——上卷《蝉蜕息》、中卷《振羽步》、下卷《赶蝉诀》，各自藏匿。”',
    },
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '“三十年来，截风门余孽始终贼心不死，近几日竟潜入东京樊楼附近暗中串联！少侠侠名远播、根基扎实，若肯替沈大侠清理门户、寻回三卷遗谱，老朽愿将毕生所知尽数相告——这《八步赶蝉》的真传，合该归于有德有义的少年侠士！”',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'bbgc_cheng_explained', value: true },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'kaifeng_fanlou',
      silent: false,
    },
    {
      type: 'toast',
      text: '已立下追查《八步赶蝉》三卷遗谱之约！请前往【开封府 · 樊楼 · 三层五楼飞桥雅阁】截查截风门暗哨。',
      tone: 'talk',
      logTag: '秋蝉八步',
    },
  ],
}

const SCENE_01_HONGQIAO_RUMOR: StorySceneDef = {
  id: 'scene_bbgc_01_hongqiao_rumor',
  title: '第一幕 · 虹桥风急拾残令',
  subtitle: '开封府 · 汴河虹桥临水酒肆',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '皇祐二年秋风初起，汴河虹桥上车马如龙，漕船号子与两岸茶肆酒旗交织成一幅繁华画卷。少侠近来在江湖上颇具声望，刚在临水酒肆雅座落座，便听得隔座两名黑衣客压低嗓音，提起“秋蝉令”与“三卷秘谱”六字。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠不动声色，借着斟茶之机侧耳细听，那二人却似极为警觉，见邻桌有人气息沉稳、目含神光，对视一眼后立刻丢下几枚铜钱起身离去。临行匆忙间，其中一人袖底滑落半枚青铜薄片，恰好滚落到少侠靴旁。',
    },
    {
      speaker: { kind: 'player' },
      text: '“嗯？铜片上刻着半只振翅秋蝉，背面还有‘疏影’二字篆文……莫非与江湖传闻中失传多年的轻功绝学有关？”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '正端详间，酒肆角落里一位一直默然独酌的灰袍老人忽然抬起头来。老人左袖空荡，双目却如鹰隼般盯住少侠手中的半枚铜令，嗓音沙哑地开口道：“小友，这枚东西从何而来？莫非东京城里，又起截风门的妖风了么？”',
    },
  ],
  choices: [
    {
      id: 'bbgc_show_token_to_cheng',
      label: '拱手礼敬，请教老人铜令来历',
      subLabel: '开启支线《秋蝉八步 · 汴洛遗踪》',
      tone: 'primary',
      effects: [
        { type: 'startQuest', questId: QUEST_ID, stepId: 'start_rumor' },
        { type: 'openScene', scene: SCENE_02_CHENG_EXPLAINS },
      ],
    },
  ],
}

const SCENE_08_PAGODA_INSIGHT: StorySceneDef = {
  id: 'scene_bbgc_08_pagoda_insight',
  title: '第八幕 · 塔风初悟蝉蜕息',
  subtitle: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠盘膝坐于资圣宝塔第八层回廊檐角，按上卷《蝉蜕息》所载行气法门缓缓吐纳。耳畔铜铃叮咚作响，汴京秋风自八方穿廊而过，拂动衣袂却不紊呼吸。',
    },
    {
      speaker: { kind: 'player' },
      text: '“原来如此！寻常轻功讲究‘一口气提到底’，一旦气尽便露破绽；而《蝉蜕息》竟是借肺腑微震，在每一步足尖点地之际吐故纳新——步未停而气已换，难怪能连踏八步而不喘！”',
    },
    {
      speaker: { kind: 'custom', name: '智明禅师', title: '资圣宝塔守塔老僧', factionName: '大相国寺' },
      text: '“阿弥陀佛，施主一点便透。三十年前沈施主曾在此塔静坐三日，临别时笑称‘风来疏竹，风过而竹不留声’，今日见施主吐纳之象，颇有故人遗风。只是此卷仅有换气根基，若无洛阳白马寺的中卷《振羽步》与牡丹园的下卷《赶蝉诀》，终究难成全璧。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '辞别智明禅师，少侠将上卷《蝉蜕息》贴身收好，纵身下塔时已觉足底轻灵三分，衣角掠过木梯几乎不闻声响。接下来，便是西出汴京，直奔古都洛阳的白马寺齐云古塔！',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'bbgc_upper_scroll_found', value: true },
    { type: 'modifyBaseStat', key: 'agility', delta: 2 },
    { type: 'giveCombatExp', amount: 100, reason: '资圣宝塔初悟《蝉蜕息》' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'luoyang_pagoda',
      silent: false,
    },
    {
      type: 'toast',
      text: '已得上卷《蝉蜕息》（身法 +2）！请西行前往【洛阳府 · 白马寺 · 齐云密檐舍利古塔】寻访中卷。',
      tone: 'success',
      logTag: '秋蝉八步',
    },
  ],
}

const SCENE_07_PAGODA_UNLOCK: StorySceneDef = {
  id: 'scene_bbgc_07_pagoda_unlock',
  title: '第七幕 · 暗格启封得上卷',
  subtitle: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '少侠依智明禅师所言，走至塔刹西南角的“巽位”朱漆柱下。仔细抚摸柱础莲瓣，果觉其中第三片花瓣微有松动。少侠运起内劲轻轻一旋，只听机括“咔哒”轻响，柱腹竟无声滑开一道三寸见方的暗格。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '暗格之中静静躺着一只紫檀小匣，匣内以明蜡封着一卷尺余长的细绢帛书，墨迹虽历经三十年岁月却依旧清劲飘逸，开篇赫然题着三个小楷：《蝉蜕息》。',
    },
    {
      speaker: { kind: 'player' },
      text: '“‘欲疾其足，先静其息；蝉将蜕壳，必敛风雷于寸脉’……沈前辈果然不愧为一代轻功宗师，字里行间皆是至理！”',
    },
    {
      speaker: { kind: 'custom', name: '智明禅师', title: '资圣宝塔守塔老僧', factionName: '大相国寺' },
      text: '“既已取到上卷，施主不妨就在这八层高风处先试着运息半刻。这塔顶风大，正是体悟‘风中换气’的绝佳所在。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_08_PAGODA_INSIGHT }],
}

const SCENE_06_PAGODA_RIDDLE: StorySceneDef = {
  id: 'scene_bbgc_06_pagoda_riddle',
  title: '第六幕 · 禅机叩问验真心',
  subtitle: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
  beats: [
    {
      speaker: { kind: 'custom', name: '智明禅师', title: '资圣宝塔守塔老僧', factionName: '大相国寺' },
      text: '老僧并不急着带路，而是拎起铜壶替少侠斟了一盏清茶，茶烟在塔顶穿堂风里瞬间散尽。“施主，三十年前沈施主将紫檀匣寄放于此时曾言：若有一日‘秋蝉令’重现东京，持令之人必是心存侠义、名动江湖之士。只是老衲愚钝，尚有一问想请教施主。”',
    },
    {
      speaker: { kind: 'custom', name: '智明禅师', title: '资圣宝塔守塔老僧', factionName: '大相国寺' },
      text: '“世人学轻功，或为登高望远，或为避祸逃生，或为窃玉偷香。依施主之见，这‘八步赶蝉’之极境，究竟是‘追得上’，还是‘放得下’？”',
    },
  ],
  choices: [
    {
      id: 'bbgc_riddle_answer_save',
      label: '“追得上险厄中之苍生，放得下身外之名利。”',
      subLabel: '侠义正道之心境',
      tone: 'jade',
      effects: [
        { type: 'modifyChivalry', delta: 5, reason: '资圣塔对禅机明志' },
        { type: 'openScene', scene: SCENE_07_PAGODA_UNLOCK },
      ],
    },
    {
      id: 'bbgc_riddle_answer_wind',
      label: '“步随风起，心似蝉蜕；来去无碍，方为自在。”',
      subLabel: '禅武合一之悟性',
      tone: 'primary',
      effects: [
        { type: 'modifySkill', key: '经义', delta: 1 },
        { type: 'openScene', scene: SCENE_07_PAGODA_UNLOCK },
      ],
    },
  ],
}

const SCENE_05_PAGODA_ASCENT: StorySceneDef = {
  id: 'scene_bbgc_05_pagoda_ascent',
  title: '第五幕 · 资圣宝塔寻古偈',
  subtitle: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '清晨薄雾未散，大相国寺内钟磬悠扬。少侠拾级登上资圣八角琉璃宝塔，直抵第八层高阁。推开雕花木窗，半座东京城尽收眼底：汴河如带，宫阙连云，晨风吹得檐角三十二枚铜铃齐齐轻鸣。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '宝塔西南角蒲团上，一位须眉皆白的老僧正闭目拨动念珠。见少侠脚步轻稳、呼吸悠长地踏上木梯，老僧并未睁眼，却先微笑道：“昨夜樊楼方向似有刀兵之气，今晨塔下又有几个贼眉鼠眼之徒探头探脑——施主莫非便是持着半枚秋蝉令而来的故人？”',
    },
    {
      speaker: { kind: 'player' },
      text: '“晚辈见过老禅师！晚辈受程万里前辈之托，特来求取沈疏影前辈昔年寄藏于塔刹的《蝉蜕息》上卷，以免落入截风门宵小之手。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_06_PAGODA_RIDDLE }],
}

const SCENE_13_LUOYANG_AFTER_BATTLE: StorySceneDef = {
  id: 'scene_bbgc_13_luoyang_after',
  title: '第十三幕 · 断翅折锋指水榭',
  subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '齐云古塔青砖坪上尘土飞扬。陆横一双铁钩被少侠震得脱手飞出，插在三丈外的银杏树干上嗡嗡作响。他胸口剧烈起伏，看着青霜姥姥手中的齐云铜铃与少侠护在怀里的中卷帛书，眼中终于闪过一丝惊惧。',
    },
    {
      speaker: { kind: 'custom', name: '陆横', title: '截风门二当家 · 断翅鹞', factionName: '截风门余孽' },
      text: '“好……好一个名门后起之秀！怪不得连老七都在樊楼栽了跟头！不过你们别得意太早——门主阴九幽早已算准你们会来白马寺，此刻他老人家已经亲赴洛阳牡丹园碧溪水榭，守株待兔去了！”',
    },
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '“不好！碧溪水榭里住着沈大哥当年收养的遗孤后人阿蝉！那孩子不过十岁出头，手里正保管着最后一份下卷《赶蝉诀》！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '陆横趁二人神色微变之际，猛地咬破舌尖喷出一口血雾，借着古塔矮墙掩护狼狈遁走。青霜姥姥不及追赶，急忙将中卷《振羽步》与一枚洛阳牡丹园的通传玉牌交到少侠手中，叮嘱少侠即刻赶往碧溪水榭救人！',
    },
  ],
  onFinishEffects: [
    { type: 'setFlag', flag: 'bbgc_middle_scroll_found', value: true },
    { type: 'giveSilver', amount: 25, reason: '缴获陆横遗落钱袋' },
    { type: 'giveCombatExp', amount: 120, reason: '齐云古塔力挫断翅鹞' },
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'luoyang_waterside',
      silent: false,
    },
    {
      type: 'toast',
      text: '已得中卷《振羽步》！截风门主阴九幽已逼近【洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭】，请火速驰援！',
      tone: 'warn',
      logTag: '秋蝉八步',
    },
  ],
}

const SCENE_12_LUHENG_AMBUSH: StorySceneDef = {
  id: 'scene_bbgc_12_luheng_ambush',
  title: '第十二幕 · 齐云塔下断翅鹞',
  subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '正当青霜姥姥自古塔石龛中取出一只素银长筒、准备交给少侠之际，塔外银杏林梢忽然传来一声刺耳的鹰哨！七八支淬毒袖箭贴着塔檐飞射而来，将石阶青砖击出一串火星。',
    },
    {
      speaker: { kind: 'custom', name: '陆横', title: '截风门二当家 · 断翅鹞', factionName: '截风门余孽' },
      text: '（冷笑踏出树影）“青霜老太婆，躲在佛门清净地三十年，还以为真能洗干净当年那笔血账？把《振羽步》交出来，我截风门或许还能留这白马古塔几分香火面子！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“光天化日之下，竟敢在释源祖庭动武？陆横，你们截风门今日一个也别想走！”',
    },
  ],
  choices: [
    {
      id: 'bbgc_fight_luheng',
      label: '拔招迎战截风门二当家「断翅鹞」陆横',
      subLabel: '剧情切磋/试炼（胜后夺回安宁、取得中卷）',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildJiefengDeputyNpc() },
          rule: 'story_trial',
          questId: QUEST_ID,
          forbidEscapeReason: '陆横已封死塔门退路，唯有一战破围！',
          onWin: [{ type: 'openScene', scene: SCENE_13_LUOYANG_AFTER_BATTLE }],
          onLose: [
            { type: 'healPlayer', hpPct: 50, mpPct: 50 },
            {
              type: 'toast',
              text: '陆横双钩凶狠，少侠暂退半步重整气息后再战！',
              tone: 'warn',
            },
          ],
        },
      ],
    },
  ],
}

const SCENE_11_QINGSHUANG_TRIAL: StorySceneDef = {
  id: 'scene_bbgc_11_qingshuang_trial',
  title: '第十一幕 · 步步生莲试身法',
  subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
  beats: [
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '“话虽如此，可《振羽步》最讲足下虚实转换，若没有真功夫强行修习，反易震伤膝踝经脉。少侠请看这塔前青砖上落满的银杏黄叶——你若能以刚悟得的《蝉蜕息》行气，踩着黄叶连踏七步而不令叶片翻卷碎裂，我便将中卷双手奉上！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（深吸一口气，丹田微沉）“好，晚辈这便献丑！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠衣袍一拂，足尖轻点第一片银杏叶，身形如柳絮般顺风斜起；紧接着第二、第三、第四步连环踏出，每一步落足皆如蜻蜓点水，借肺腑间一呼一吸的轻震卸去全身分量。待第七步稳稳落回石阶，地上七片黄叶竟真的纹丝未碎！',
    },
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '“妙极！‘身重如铅，气轻如羽’，少侠果然已摸到沈大哥当年创法时的门槛了！”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_12_LUHENG_AMBUSH }],
}

const SCENE_10_QINGSHUANG_MEET: StorySceneDef = {
  id: 'scene_bbgc_10_qingshuang_meet',
  title: '第十幕 · 青霜旧影认令符',
  subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '银杏落叶纷飞间，一位身着靛蓝布衣、鬓角如霜却脊背笔直的老妇人正提着竹扫帚清扫塔基。听见少侠足音虽近却无半分尘土扑响，她微微一怔，停下扫帚转过身来。',
    },
    {
      speaker: { kind: 'player' },
      text: '“敢问前辈可是当年沈疏影大侠的故人‘青霜姥姥’？晚辈持半枚秋蝉令，并开封资圣塔《蝉蜕息》上卷而来！”',
    },
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '老人盯着那半枚青铜残令看了许久，忽然长叹一声，眼角隐约有泪光闪动：“三十年了……程万里那老家伙竟然还守在汴河边上。当年风陵渡一战后，他只道我也死在乱箭之下，却不知我带着沈大哥的半部遗稿与遗孤逃回了洛阳。”',
    },
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '“少侠能于大相国寺得见《蝉蜕息》，足见并非俗流。中卷《振羽步》确在齐云塔中，只是在交予少侠之前，老身想亲眼看看少侠的步法火候。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_11_QINGSHUANG_TRIAL }],
}

const SCENE_09_LUOYANG_BAIMASI: StorySceneDef = {
  id: 'scene_bbgc_09_luoyang_baimasi',
  title: '第九幕 · 西行洛阳叩齐云',
  subtitle: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '自开封西出虎牢、经巩义古道抵洛阳，沿途秋山红叶如烧。白马寺作为东汉以来的释源祖庭，山门外石马静立，寺后齐云密檐舍利古塔十三层砖檐高耸入云，在秋阳下投出一条长长的青影。',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠绕过香客如织的大佛宝殿，径直行至寺东清幽的齐云古塔下。塔身四周栽满百年银杏，风过处金叶簌簌如雨，塔门石阶上却隐约可见几道尚未干透的泥靴鞋印——显然不久前已有外人来此窥探。',
    },
    {
      speaker: { kind: 'player' },
      text: '“看这鞋印深浅，来人下盘极沉却故意踮起前掌……十有八九便是陆横一伙！得赶在他们前面寻到守塔的青霜姥姥。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_10_QINGSHUANG_MEET }],
}

const SCENE_21_FAREWELL_LUOYANG: StorySceneDef = {
  id: 'scene_bbgc_21_farewell_luoyang',
  title: '第二十一幕 · 清香一炷慰故人',
  subtitle: '洛阳府 · 洛阳牡丹园（启程回汴）',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '次日天明，秋雨初霁，洛阳城外群山如洗。青霜姥姥带着几名白马寺僧众赶来牡丹园接应，见水榭廊柱虽有刀剑劈砍之痕，但小阿蝉安然无恙地抱着黑漆木盒站在廊下，而截风门门主阴九幽已重伤遁走、短时间内绝无再犯之力，老人不由双手合十，眼眶湿润地向少侠深深一揖。',
    },
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '“沈大哥在天之灵，今日总算可以彻底安息了。老身这把老骨头守在齐云塔下三十年，所求者不过两件事：一者护住阿蝉平安长大，二者莫教沈大哥毕生心血沦为黑道贼子杀人越货的工具。如今这两桩心愿皆已托付得人，老身也算无愧于当年风陵渡的旧约。”',
    },
    {
      speaker: { kind: 'custom', name: '青霜姥姥', title: '白马寺守塔居士', factionName: '洛阳旧人' },
      text: '“这三卷原谱既然已由少侠参悟透彻，便由少侠一并带回东京汴梁，与程万里那老家伙在汴河边上同饮一碗烈酒、焚香告慰故人吧。日后江湖路远，风波险恶，望少侠以这门《八步赶蝉》多行救急扶危之侠举，莫负沈大哥当年以身殉道之心！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“晚辈谨记姥姥肺腑之言！阿蝉既已安顿妥当，洛阳亦无后顾之忧，晚辈这便拜别姥姥与白马寺诸位师父，动身东返开封，向程前辈复命！”',
    },
  ],
  onFinishEffects: [
    {
      type: 'setQuestStep',
      questId: QUEST_ID,
      stepId: 'return_kaifeng',
      silent: false,
    },
    {
      type: 'toast',
      text: '请东返【开封府 · 汴河虹桥 · 临水酒肆】向「听风老人」程万里复命，了结三十年旧案。',
      tone: 'talk',
      logTag: '秋蝉八步',
    },
  ],
}

const SCENE_20_ENLIGHTENMENT: StorySceneDef = {
  id: 'scene_bbgc_20_enlightenment',
  title: '第二十幕 · 夜雨碧溪悟八步',
  subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '窗外夜雨渐歇，云隙间漏下一缕清冷秋月，正照在碧溪平如镜面的水波上。少侠屏退杂念，依三卷合璧之图演练步法——起势如秋蝉离枝，第一至第三步换气轻灵无声，恰似资圣宝塔高风中的蝉蜕吐纳；第四至第六步借腰胯微旋积蓄暗劲，足尖虚点青石，仿佛白马寺银杏叶上不曾惊动一尘一埃；及至第七、第八步猛然发力，足尖点水而起，竟在月下碧溪之上接连踏出八道清浅水纹，衣角不沾半滴水珠，身形如流光掠过水榭飞檐，稳稳落回二层木栏！',
    },
    {
      speaker: { kind: 'player' },
      text: '（长舒一口清气，丹田温润而气息绵长不绝）“‘三步换气如蝉蜕，五步借风似振羽，八步绝尘赶秋蝉’……脚尖连点八步而气不喘，追逃之间迅捷如飞蝉掠枝——地阶下品轻功《八步赶蝉》，今日终于大成！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '水榭之下，小阿蝉看得目瞪口呆，拍手欢呼，连连赞叹比画本里的飞仙还要俊俏。少侠收势落回木廊，将三卷细绢秘谱妥善合入黑漆木匣，又替阿蝉包扎好手腕上的擦伤，静候天明后与青霜姥姥汇合。',
    },
  ],
  onFinishEffects: [
    { type: 'teachMartialArt', artId: 'MA-097', level: 1, exp: 0 },
    { type: 'setFlag', flag: 'bbgc_learned_full', value: true },
    { type: 'giveCombatExp', amount: 150, reason: '三卷合璧习得《八步赶蝉》' },
    {
      type: 'toast',
      text: '已领悟地阶下品轻功【八步赶蝉】！',
      tone: 'success',
      logTag: '绝学初成',
    },
    { type: 'openScene', scene: SCENE_21_FAREWELL_LUOYANG },
  ],
}

const SCENE_19_THREE_SCROLLS_UNITE: StorySceneDef = {
  id: 'scene_bbgc_19_three_scrolls_unite',
  title: '第十九幕 · 三卷合璧见真章',
  subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
  beats: [
    {
      speaker: { kind: 'custom', name: '阿蝉', title: '守谱少年', factionName: '洛阳旧人' },
      text: '（抹干眼泪，双手捧出黑漆木盒）“多谢大侠救命之恩！青霜婆婆交代过，若有人带着《蝉蜕息》与《振羽步》而来，又击败了黑衣恶人，阿蝉便把这盒里的下卷《赶蝉诀》亲手交给你！刚才那坏蛋逼问我盒子里的机关口诀，我死死咬着牙，一个字也没肯吐露！”',
    },
    {
      speaker: { kind: 'player' },
      text: '（轻轻拍了拍少年肩头，接过黑漆木盒）“好孩子，受惊了。你与青霜婆婆守住这卷秘谱三十年，沈前辈在天之灵定会为你骄傲。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠打开黑漆木盒，在碧溪水榭案前将《蝉蜕息》《振羽步》《赶蝉诀》三卷细绢并排摊开，借着油灯昏黄的光晕细细拼合。三张历经三十年风雨的秘谱首尾相接，原本各自零散的朱砂墨线与蝇头小楷竟严丝合缝地拼成一幅完整的人体经脉运劲图——足太阴脾经、足厥阴肝经与督脉交汇处标着八道递进的红点，图末一行小字力透绢背：',
    },
    {
      speaker: { kind: 'narrator' },
      text: '“三步换气如蝉蜕，五步借风似振羽，八步绝尘赶秋蝉——步步连环，气脉自生，是为《八步赶蝉》。”',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_20_ENLIGHTENMENT }],
}

const SCENE_18_YIN_DEFEATED: StorySceneDef = {
  id: 'scene_bbgc_18_yin_defeated',
  title: '第十八幕 · 碧溪水榭斩鬼影',
  subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '秋雨哗哗打在碧溪水榭的琉璃瓦上，水波被劲气激起半丈高的雪白水花。阴九幽一双鬼手爪影连环，但在少侠刚猛灵动兼备的招式逼迫下，终究被一记沉肩反震撞破木栏，半个身子跌入冰冷的碧溪之中！',
    },
    {
      speaker: { kind: 'custom', name: '阴九幽', title: '截风门门主 · 绝影鬼手', factionName: '截风门总舵' },
      text: '（披头散发伏在溪石上，咳血不止）“不可能……你明明还没练成完整的《八步赶蝉》，怎么可能破得了我的绝影鬼手？！三十年前沈疏影没死透，三十年后又冒出你这么个小怪物……”',
    },
    {
      speaker: { kind: 'player' },
      text: '“阴九幽，你们截风门三十年前贪图秘谱、伏杀忠良，今日又拿十岁稚童作饵——恶贯满盈，已无颜再留于中原武林！交出解药与随身残图，废去截风旗号，滚出大宋！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '阴九幽见大势已去，又惧洛阳府衙差役循声赶来，只得咬牙抛出一只青瓷解药瓶，拖着重伤之躯遁入雨幕芦苇荡中。角落里被点住穴道的守谱少年阿蝉得少侠伸手解穴，顿时抱住怀中油布包裹哇地哭出声来。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_19_THREE_SCROLLS_UNITE }],
}

const SCENE_17_RESCUE_ACHAN: StorySceneDef = {
  id: 'scene_bbgc_17_rescue_achan',
  title: '第十七幕 · 绝影鬼手现真身',
  subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '水榭正中，一名身披黑色油布蓑衣的老者负手而立，斗笠压得极低，只露出一截惨白如纸的下颌与一双指节畸长、隐隐泛青的怪手。他脚边蜷缩着一个十岁左右的少年，口不能言，怀里死死抱住一只黑漆木盒。',
    },
    {
      speaker: { kind: 'custom', name: '阴九幽', title: '截风门门主 · 绝影鬼手', factionName: '截风门总舵' },
      text: '“不愧是能闯过陆七与陆横两关的人，连这碧溪水榭的九曲暗桩都拦不住你。来得正好——你怀里装着上卷《蝉蜕息》与中卷《振羽步》，这孩子怀里抱着下卷《赶蝉诀》，今日齐聚一堂，倒是省了老夫奔波！”',
    },
    {
      speaker: { kind: 'player' },
      text: '“阴九幽！放开阿蝉，有什么本事冲我来！”',
    },
  ],
  choices: [
    {
      id: 'bbgc_tactic_water_step',
      label: '先以《蝉蜕息》《振羽步》踏波绕柱，封死水榭退路再战',
      subLabel: '智取破局：削弱阴九幽身法与气血上限',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'bbgc_yin_weakened', value: true },
        {
          type: 'toast',
          text: '少侠借水榭廊柱之势封住阴九幽身法腾挪空间，敌手步法受制！',
          tone: 'success',
        },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildYinJiuyouBossNpc(true) },
          rule: 'story_trial',
          questId: QUEST_ID,
          forbidEscapeReason: '阿蝉性命攸关，岂能临阵脱逃！',
          onWin: [{ type: 'openScene', scene: SCENE_18_YIN_DEFEATED }],
          onLose: [
            { type: 'healPlayer', hpPct: 55, mpPct: 55 },
            {
              type: 'toast',
              text: '阴九幽鬼手阴毒，少侠调息片刻后再入水榭破阵！',
              tone: 'warn',
            },
          ],
        },
      ],
    },
    {
      id: 'bbgc_tactic_direct_duel',
      label: '正面硬撼截风门门主阴九幽',
      subLabel: '迎战全盛「绝影鬼手」',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: buildYinJiuyouBossNpc(false) },
          rule: 'story_trial',
          questId: QUEST_ID,
          forbidEscapeReason: '阿蝉性命攸关，岂能临阵脱逃！',
          onWin: [{ type: 'openScene', scene: SCENE_18_YIN_DEFEATED }],
          onLose: [
            { type: 'healPlayer', hpPct: 55, mpPct: 55 },
            {
              type: 'toast',
              text: '阴九幽全盛之下身法诡谲，少侠可先借廊柱踏波封其退路！',
              tone: 'warn',
            },
          ],
        },
      ],
    },
  ],
}

const SCENE_16_WATERSIDE_NIGHT: StorySceneDef = {
  id: 'scene_bbgc_16_waterside_night',
  title: '第十六幕 · 踏波夜渡碧溪榭',
  subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '亥时细雨淅沥，洛阳牡丹园早已闭园。秋夜的花棚只余残枝冷香，唯有园西碧溪之上的琴画水榭还亮着一豆孤灯。虹桥木栏已被人砍断两根，溪面暗流之上隐约浮着数根绊马索与铁蒺藜。',
    },
    {
      speaker: { kind: 'player' },
      text: '“好阴险的布置！桥面必定布满暗器机关，若强行踏桥而过势必惊动屋中贼人。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠凝神望着脚下丈余宽的碧溪流水，脑海中蓦地浮现上卷《蝉蜕息》与中卷《振羽步》的交汇要诀——左足点向水面浮萍借力半寸，右足顺势掠过桥墩石棱，不走虹桥木板，竟踏着微澜水波无声无息地翻入水榭后窗！',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_17_RESCUE_ACHAN }],
}

const SCENE_15_WATERSIDE_ARRIVAL: StorySceneDef = {
  id: 'scene_bbgc_15_waterside_arrival',
  title: '第十五幕 · 雨幕深园闻异响',
  subtitle: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '暮色四合，洛阳城西牡丹园外飘起秋雨。白日里游人赏花题诗的碧溪水榭，此刻却静得令人心悸——本该在园门外值守的两名花匠倒在花丛边昏迷不醒，鼻息微弱，显然中了江湖迷烟。',
    },
    {
      speaker: { kind: 'player' },
      text: '“截风门已经先一步动手了！得立刻潜近水榭救出阿蝉，绝不能让阴九幽毁了最后一份秘谱。”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '少侠伏低身形，沿御品姚黄花棚阴影悄然摸近碧溪岸边，只听水榭内传来茶盏碎裂之声与一道阴恻恻的冷笑，隔着雨帘透出森森寒意。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_16_WATERSIDE_NIGHT }],
}

const SCENE_14_LUOYANG_ROAD: StorySceneDef = {
  id: 'scene_bbgc_14_luoyang_road',
  title: '第十四幕 · 洛水急行驰牡丹',
  subtitle: '洛阳府 · 白马寺往牡丹园途中',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '离开白马寺时，天色已近黄昏。洛阳城坊市错落、渠水纵横，若寻常赶路需绕行天津桥与铜驼陌，少说也要半个时辰。少侠心系阿蝉安危，当下将《蝉蜕息》与《振羽步》二卷心法同时催动！',
    },
    {
      speaker: { kind: 'player' },
      text: '“呼……吸……足尖连点青石坊墙，果真比先前快了不止一倍！只是踏出第五步时，丹田仍觉微微一滞——看来缺的正是下卷《赶蝉诀》那最后三步的爆发法门！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '不过一盏茶工夫，少侠已越过洛水长桥，遥遥望见国色芳苑高挑的牌楼与园外淅沥秋雨中摇曳的灯笼。',
    },
  ],
  onFinishEffects: [{ type: 'openScene', scene: SCENE_15_WATERSIDE_ARRIVAL }],
}

const SCENE_22_KAIFENG_EPILOGUE: StorySceneDef = {
  id: 'scene_bbgc_22_kaifeng_epilogue',
  title: '第二十二幕 · 虹桥醉酒传新名',
  subtitle: '开封府 · 汴河虹桥临水酒肆',
  beats: [
    {
      speaker: { kind: 'narrator' },
      text: '三日后，秋高气爽，汴河虹桥依旧帆影重重、人声鼎沸。临水酒肆角落里，程万里面前仍摆着那壶温热的黄酒与一碟茴香豆，只是这一次，老人脸上少了三十年积压的郁结，多了几分久违的释然。听罢少侠将樊楼擒哨、资圣悟息、齐云斗贼、碧溪救孤与青霜姥姥尚在人世的始末娓娓道来，老人仰首将碗中酒一饮而尽，苍老的眼眶不由微微泛红。',
    },
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '“青霜那丫头竟然还活着，还把沈大哥的遗孤拉扯这么大……哈哈哈，好！好啊！三十年的风陵渡血债，今日总算连本带利讨回来了！沈大侠若泉下有知，见他毕生心血《八步赶蝉》重现中原，又落在少侠这等重诺守义的磊落之人手中，必当浮一大白，再无半分遗憾！”',
    },
    {
      speaker: { kind: 'custom', name: '程万里', title: '前神行驿使 · 听风老人', factionName: '汴京旧驿' },
      text: '“老朽如今已是个退隐闲人，留着这些身外之物也无用处，这点微薄积蓄全数赠予少侠作日后闯荡江湖的盘缠。从今往后，这东京汴梁与洛阳古道之上，怕是要传遍少侠‘八步赶蝉’的侠名了！”',
    },
    {
      speaker: { kind: 'narrator' },
      text: '酒过三巡，秋阳斜照汴水。少侠长揖辞别听风老人，步出酒肆时恰逢一阵爽朗秋风拂过虹桥。少侠足尖轻点桥头石栏，身形如惊鸿掠水般腾空而起，数步之间已没入御街繁华烟火，只留一段《秋蝉八步 · 汴洛遗踪》的佳话，在皇祐二年的东京茶坊酒肆间口耳相传。',
    },
  ],
  onFinishEffects: [
    { type: 'giveSilver', amount: 80, reason: '程万里赠予江湖资费' },
    { type: 'modifyRenown', delta: 30, reason: '重现《八步赶蝉》、力挫截风门' },
    { type: 'modifyChivalry', delta: 15, reason: '碧溪救孤、告慰三十年忠魂' },
    {
      type: 'completeQuest',
      questId: QUEST_ID,
      outcome: 'mastered_babuganchan',
      combatExp: 200,
    },
    {
      type: 'toast',
      text: '支线【秋蝉八步 · 汴洛遗踪】圆满完结！习得地阶轻功《八步赶蝉》，获纹银 +80 两、江湖声望 +30、侠义 +15、战斗经验 +200！',
      tone: 'success',
      logTag: '任务完结',
    },
  ],
}

// ============================================================================
// 任务定义导出
// ============================================================================

export const BABUGANCHAN_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '秋蝉八步 · 汴洛遗踪',
    category: 'adventure',
    initialStepId: 'start_rumor',
    summary:
      '三十年前轻功宗师沈疏影护送边防密折遭“截风门”伏杀，地阶轻功《八步赶蝉》一分为三散落汴洛。江湖声望达 120 后，于开封汴河虹桥酒肆拾得半枚“秋蝉令”，循迹追查并集齐三卷秘谱，方可重现绝学。',
    steps: {
      start_rumor: {
        id: 'start_rumor',
        title: '虹桥残令问前尘',
        objective: '于开封汴河虹桥临水酒肆向听风老人程万里请教“秋蝉令”来历。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_tavern',
          customLabel: '开封府 · 汴河虹桥临水酒肆',
        },
      },
      kaifeng_fanlou: {
        id: 'kaifeng_fanlou',
        title: '夜探樊楼擒暗哨',
        objective: '前往开封樊楼【三层五楼飞桥雅阁】，截查潜伏东京的截风门暗哨。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_fanlou',
          spotId: 'bl_fl_towers',
          customLabel: '开封府 · 樊楼 · 三层五楼飞桥雅阁',
        },
      },
      kaifeng_pagoda: {
        id: 'kaifeng_pagoda',
        title: '资圣宝塔取上卷',
        objective: '前往开封大相国寺【资圣八角琉璃宝塔】，叩问守塔老僧并寻取上卷《蝉蜕息》。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
        },
      },
      luoyang_pagoda: {
        id: 'luoyang_pagoda',
        title: '西行白马求振羽',
        objective: '西行洛阳府白马寺【齐云密檐舍利古塔】，拜会青霜姥姥并抵御截风门二当家陆横。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_pagoda',
          customLabel: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
        },
      },
      luoyang_waterside: {
        id: 'luoyang_waterside',
        title: '碧溪水榭破鬼影',
        objective: '驰援洛阳牡丹园【碧溪虹桥琴画水榭】，救出守谱少年阿蝉并力挫截风门主阴九幽，三卷合璧悟得《八步赶蝉》。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_peony',
          spotId: 'ly_pn_waterside',
          customLabel: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
        },
      },
      return_kaifeng: {
        id: 'return_kaifeng',
        title: '东返虹桥告故人',
        objective: '返回开封府【汴河虹桥临水酒肆】，向听风老人程万里复命饮酒。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_tavern',
          customLabel: '开封府 · 汴河虹桥临水酒肆',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_bbgc_hongqiao_intro',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        onceFlag: 'bbgc_intro_triggered',
        condition: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_completed' },
            { type: 'renownAtLeast', min: 120 },
          ],
        },
        effects: [{ type: 'openScene', scene: SCENE_01_HONGQIAO_RUMOR }],
      },
    ],
    spotActions: [
      // 1) 开封汴河虹桥酒肆：手动触发 / 声望提示入口
      {
        id: 'spot_bbgc_hongqiao_rumor',
        label: '打探「秋蝉令」旧事',
        badge: '地阶轻功奇遇',
        subtitle: '要求江湖声望 ≥ 120 · 追寻失传轻功《八步赶蝉》三卷遗踪',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
            { type: 'questStatus', questId: QUEST_ID, status: 'not_completed' },
          ],
        },
        enabledWhen: { type: 'renownAtLeast', min: 120 },
        effects: [{ type: 'openScene', scene: SCENE_01_HONGQIAO_RUMOR }],
      },
      // 1b) 若第一幕对话未进到第二幕时的续接按钮
      {
        id: 'spot_bbgc_cheng_continue',
        label: '向听风老人程万里请教「秋蝉令」',
        badge: '支线推进',
        subtitle: '程万里正于临水酒肆角落独酌等候',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'start_rumor',
        },
        effects: [{ type: 'openScene', scene: SCENE_02_CHENG_EXPLAINS }],
      },
      // 2) 开封樊楼：飞桥雅阁擒暗哨
      {
        id: 'spot_bbgc_fanlou_ambush',
        label: '巡查飞桥雅阁 · 截杀截风门暗哨',
        badge: '支线第3-4幕',
        subtitle: '程万里指明截风门探子「灰鹞」陆七正潜伏于此',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_fanlou',
        spotId: 'bl_fl_towers',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'kaifeng_fanlou',
        },
        effects: [{ type: 'openScene', scene: SCENE_03_FANLOU_OBSERVE }],
      },
      // 3) 开封大相国寺资圣宝塔：寻取上卷
      {
        id: 'spot_bbgc_xiangguosi_pagoda',
        label: '登临资圣宝塔 · 寻访守塔老僧',
        badge: '支线第5-8幕',
        subtitle: '探查上卷《蝉蜕息》下落',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'kaifeng_pagoda',
        },
        effects: [{ type: 'openScene', scene: SCENE_05_PAGODA_ASCENT }],
      },
      // 4) 洛阳白马寺齐云古塔：会见青霜姥姥 + 战陆横
      {
        id: 'spot_bbgc_baimasi_pagoda',
        label: '叩问齐云古塔 · 寻访青霜姥姥',
        badge: '支线第9-13幕',
        subtitle: '求取中卷《振羽步》并提防截风门伏击',
        tone: 'primary',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'luoyang_pagoda',
        },
        effects: [{ type: 'openScene', scene: SCENE_09_LUOYANG_BAIMASI }],
      },
      // 5) 洛阳牡丹园碧溪水榭：终战阴九幽 + 悟得《八步赶蝉》
      {
        id: 'spot_bbgc_peony_waterside',
        label: '夜渡碧溪水榭 · 营救阿蝉并破阴九幽',
        badge: '终幕决战',
        subtitle: '支线第14-21幕 · 三卷合璧习得地阶轻功《八步赶蝉》',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_peony',
        spotId: 'ly_pn_waterside',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'luoyang_waterside',
        },
        effects: [{ type: 'openScene', scene: SCENE_14_LUOYANG_ROAD }],
      },
      // 6) 返回开封汴河虹桥酒肆复命
      {
        id: 'spot_bbgc_return_kaifeng',
        label: '与听风老人程万里饮酒复命',
        badge: '支线终幕',
        subtitle: '第22幕 · 告慰三十年忠魂并领取赏赐',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'return_kaifeng',
        },
        effects: [{ type: 'openScene', scene: SCENE_22_KAIFENG_EPILOGUE }],
      },
    ],
  },
]
