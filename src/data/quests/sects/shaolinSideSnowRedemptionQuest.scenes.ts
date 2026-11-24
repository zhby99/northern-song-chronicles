import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE17_QUEST_ID } from './shaolinSideSnowRedemptionQuest'

const SPEAKER_HELAN_XIAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '「断魂铁爪」贺兰枭',
  title: '西夏一品堂叛逃杀手',
  factionName: '西夏流亡者',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_TUOBA_LIE: StorySpeakerSpec = {
  kind: 'custom',
  name: '「玄霜鬼手」拓跋烈',
  title: '西夏一品堂宗师追魂使',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_OLD_HAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '韩老丈',
  title: '关洛苦主遗孤代表',
  factionName: '关洛乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildTuobaLieBoss(shakenByDharma = false): NodeNpc {
  return makeQuestNpc({
    id: shakenByDharma ? 'QUEST_SLS17_TUOBA_LIE_SHAKEN' : 'QUEST_SLS17_TUOBA_LIE',
    name: '「玄霜鬼手」拓跋烈',
    title: '西夏一品堂宗师追魂使',
    realm: '宗师中品',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '一品堂追魂使',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: shakenByDharma
      ? '“哼！巧舌如簧的秃驴，竟敢在雪地里教训本使！看你能不能挡住我这双玄霜冰蚕掌！”'
      : '“少林寺藏污纳垢、庇护我一品堂叛徒！老秃驴，今日便让你尝尝我西夏玄霜冰蚕掌的滋味！”',
    stats: shakenByDharma
      ? { hp: 4520, mp: 4160, agi: 80, res: 68 }
      : { hp: 5120, mp: 4680, agi: 83, res: 72 },
    talents: { bone: 92, comprehension: 88, charm: 58 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-055', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-055', level: 9 },
      { artId: 'MA-085', level: 9 },
    ],
  })
}

export const SHAOLIN_SIDE17_SCENES: Record<string, StorySceneDef> = {
  scene_sls17_01: {
    id: 'scene_sls17_01',
    title: '第一幕 · 朔雪叩门',
    subtitle: '嵩山少林寺 · 钟鼓禅院',
    mandatory: true,
    beats: [
      N('{reignYear}腊月，鹅毛大雪连下三日，少室山千峰尽白。戌时将近，钟鼓禅院外忽然传来撕心裂肺的捶门声，你与戒律院首座玄寂闻声而出，但见雪地里匍匐着一名肩插幽蓝冰棱镖、浑身浴血的铁塔巨汉！'),
      N('更令人心头一颤的是，这名枯黑十指染血的西夏悍汉竟用残破皮袄死死护着怀中一名不过五岁、瑟瑟发抖的幼女，雪地上拖出一道触目惊心的暗红血痕。'),
      S(
        'NPC-0134',
        '（玄寂瞳孔微缩，沉声喝止巡夜僧）“且慢！此人十指泛着西夏腐骨毒煞，莫非便是五年前在关洛一带连屠三家镖局、欠下三十七条汉民性命的西夏一品堂杀手——『断魂铁爪』贺兰枭？！”',
      ),
      S(
        SPEAKER_HELAN_XIAO,
        '（以额重撞青石雪阶，泪血横流，声嘶力竭）“正是罪人贺兰枭！上月我拒不屠杀延州降村，一品堂毒杀我妻子、派追魂使万里截杀！我半生造孽死不足惜，只求少林佛门慈悲，救救我怀里这无辜稚女啊！”',
      ),
      N('你俯身以纯正佛力暂封其肩头冰毒，怀中幼女攥着你湿透的僧袖怯怯啼哭。恰在此时，山门外骤然响起尖厉的西夏铜角声与数十名中原苦主凄厉的哭骂！'),
    ],
    onFinishEffects: [openScene('scene_sls17_02', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_02: {
    id: 'scene_sls17_02',
    title: '第二幕 · 血债与因果',
    subtitle: '嵩山少林寺 · 钟鼓禅院',
    mandatory: true,
    beats: [
      S(
        'NPC-0134',
        '“好毒辣的攻心之计！西夏一品堂宗师追魂使『玄霜鬼手』拓跋烈已寻着血迹杀上少室山，更沿途裹挟当年死于贺兰枭铁爪下的关洛苦主逼门讨人！交人则任异邦鹰犬在山门行凶，护人则天下骂我少林包庇血债悍匪！”',
      ),
      P(
        '（合十静立漫天飞雪中，神色沉定如山）“玄寂师兄，佛门慈悲绝非是非不分的妇人之仁，亦岂容西夏虎狼借苦主之痛踏我山门、更岂容无辜稚女丧命雪夜！我先去演武大坪击退追魂使，再于佛前公断贺兰枭血债！”',
      ),
      S(
        'NPC-0134',
        '“善哉！老衲即刻命戒律僧严密看押贺兰枭并妥善照看其幼女，山门演武坪便全赖师弟独撑大局了！”',
      ),
    ],
    choices: [
      {
        id: 'sls17_go_snow_gate',
        label: '“阿弥陀佛！弟子这便踏雪赴罗汉堂演武大坪，独退西夏一品堂追魂使！”',
        subLabel: '承接支线【少室大雪 · 慈航度恶】，前往罗汉堂演武大坪迎敌',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE17_QUEST_ID, stepId: 'confront_snow_gate' },
          setStep(SHAOLIN_SIDE17_QUEST_ID, 'confront_snow_gate'),
          toast(
            '一品堂追魂使已逼至山门！请前往【嵩山少林寺 · 罗汉堂 · 演武大坪（sl_luohan_main）】雪中迎敌。',
            'talk',
            '少室大雪',
          ),
        ],
      },
      {
        id: 'sls17_defer_snow_gate',
        label: '“追魂使乃宗师中品强敌，容我稍作调息整备再赴山门！”',
        subLabel: '暂缓接取（可随时再返钟鼓禅院开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side17_start_triggered', value: false },
          toast('你暂且退廊调息整备，待准备妥当后再返钟鼓禅院决断风雪公案。', 'talk', '少室大雪'),
        ],
      },
    ],
  },

  scene_sls17_03: {
    id: 'scene_sls17_03',
    title: '第三幕 · 寒风逼门',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      N('大雪纷飞，演武大坪外石阶火把明灭。二十余名玄黑皮裘的一品堂好手簇拥紫袍宗师「玄霜鬼手」拓跋烈傲立雪中，脚下积雪皆被阴寒罡气震作碎冰；身后十余名衣衫单薄的关洛苦主高举木牌泣不成声。'),
      S(
        SPEAKER_TUOBA_LIE,
        '（负手冷笑，声如寒铁）“少林寺好大的架子！本使西夏一品堂拓跋烈！叛徒贺兰枭逃进你们山门，识相的连同他怀里那小孽种一并绑出来交予本使处决，否则今夜本使便血洗少室山门！”',
      ),
      S(
        SPEAKER_OLD_HAN,
        '（白发老丈扑跪雪地，泪涕横流）“少林大师！那贺兰枭五年前杀了老汉两个儿子啊！佛门讲善恶有报，怎能把吃人不吐骨头的恶魔藏在寺里啊！”',
      ),
      P(
        '（先向韩老丈深深合十致礼，旋即抬眸直视拓跋烈，周身三尺飘雪被佛门罡气尽数弹开）“韩老丈与诸位乡亲请起！贺兰枭血债，少林今日必在佛祖座前给诸位清清楚楚的公道！至于你一品堂——当年指使贺兰枭屠戮关洛的元凶正是尔等，如今还想连五岁稚女一并斩尽杀绝？”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls17_04', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_04: {
    id: 'scene_sls17_04',
    title: '第四幕 · 雪阶交锋',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      S(
        SPEAKER_TUOBA_LIE,
        '（脸色铁青，双掌隐泛幽青冰雾）“牙尖嘴利的秃驴！竟敢揭我一品堂的底！好，今日便让中原武林看看，少林首座接不接得住我西夏玄霜冰蚕掌！”',
      ),
      N('凛冽寒风卷起漫天雪幕，拓跋烈宗师中品的蚀骨寒威铺天盖地压来！生死一念之际，你于雪阶之上作何应对？'),
    ],
    choices: [
      {
        id: 'sls17_tactic_dharma',
        label: '【众生平等 · 当雪折傲】以佛门众生平等、罪不及稚女大义当雪喝退拓跋烈傲气，再 1v1 护人！',
        subLabel: '以佛理狮吼震慑其心神后再 1v1 迎战宗师中品拓跋烈（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【经义】≥ 82 或【辩才】≥ 60',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 82 },
            { type: 'skillAtLeast', key: '辩才', min: 60 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s17_gate_tactic', value: 'dharma' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_gate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s17_gate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuobaLieBoss(true) },
            rule: 'story_trial',
            forbidEscapeReason: '山门之后便是少林千年古刹、无辜稚女与关洛苦主，岂可退让半步！',
            introText: '你当雪朗宣佛门众生平等大义，喝得拓跋烈心神剧震、寒雾微乱，旋即展开 1v1 风雪决战！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls17_05', SHAOLIN_SIDE17_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('拓跋烈玄霜冰蚕掌极为阴寒霸道，你暂退山门调息回元后再战！', 'warn', '少室大雪'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('与拓跋烈雪中鏖战平分秋色！调息后再赴罗汉堂演武大坪击退强敌！', 'warn', '少室大雪'),
            ],
          },
        ],
      },
      {
        id: 'sls17_tactic_force',
        label: '【少林威仪 · 寸步不让】亮出少林首座威仪寸步不让，踏雪正面死战拓跋烈！',
        subLabel: '零门槛正面 1v1 力战全盛宗师中品「玄霜鬼手」拓跋烈（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s17_gate_tactic', value: 'force' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_gate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s17_gate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuobaLieBoss(false) },
            rule: 'story_trial',
            forbidEscapeReason: '山门之后便是少林千年古刹、无辜稚女与关洛苦主，岂可退让半步！',
            introText: '【1v1 风雪退敌】漫天大雪山门前，正面硬撼西夏一品堂宗师追魂使【「玄霜鬼手」拓跋烈】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls17_05', SHAOLIN_SIDE17_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('拓跋烈冰蚕掌毒雾侵骨，你暂退回元，整备后再赴演武大坪重战退敌！', 'warn', '少室大雪'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('与拓跋烈雪中鏖战未决高下，调息后再行决战！', 'warn', '少室大雪'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls17_05: {
    id: 'scene_sls17_05',
    title: '第五幕 · 雪落降魔',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    illustrationUrl: '/assets/quests/sl_s17_snow_gate.jpg',
    illustrationCaption: '风雪山门 · 少室大雪漫天，少林首座独战西夏一品堂宗师追魂使',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s17_gate_tactic=dharma|先受你众生平等佛理当雪喝破傲气，拓跋烈掌风终究失了三分圆融！苦战百余合后，你以至阳佛力焚化蚀骨冰雾，双掌如金刚伏虎印于其护心镜上！|大雪被两大宗师掌风卷作数丈雪龙！你寸步不让硬撼百余合，看破其冰蚕掌换气微隙，一步踏碎冰霜，双掌如雷霆击碎其护体寒罡！}'),
      N('“轰！”一声闷响，拓跋烈连吐两口淤血倒飞三丈，狼狈跪倒在雪堆之中。二十余名一品堂好手拔刀欲扑，却被你一声蕴含狮吼真气的佛号震得兵刃险些脱手！'),
      S(SPEAKER_TUOBA_LIE, '（捂胸惊骇爬起，咬牙低吼）“少林首座的纯粹佛门内力竟能焚化玄霜毒雾……好，少林果然卧虎藏龙，我们走！”'),
      N('西夏残兵搀扶着拓跋烈仓皇没入苍茫雪幕。你收功合十，命武僧取来厚棉袍与热姜汤分予冻得瑟瑟发抖的关洛乡亲。'),
    ],
    onFinishEffects: [openScene('scene_sls17_06', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_06: {
    id: 'scene_sls17_06',
    title: '第六幕 · 迎客入殿',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      N('韩老丈捧着温热陶碗，望向仓皇逃窜的西夏人影，又满眼敬畏与忐忑地望向你。'),
      S(SPEAKER_OLD_HAN, '“大师神威盖世，打跑了西夏番狗，老汉佩服！可……可那杀害我儿的贺兰枭，大师当真肯给咱们老百姓做主么？”'),
      P('“出家人不打诳语。诸位乡亲请随贫僧步入大雄宝殿避雪暖身，贺兰枭一应血债与恶功，今日便在佛祖金身与诸位面前，了断得明明白白！”'),
      N('大雪渐细，关洛苦主相互搀扶着随你步向大雄宝殿，沿途武僧皆合十肃立，气氛庄严肃穆。'),
    ],
    onFinishEffects: [
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_zen_merit', op: 'gte', value: 6 },
        thenEffects: [{ type: 'setFlag', flag: 'sl_s17_karma_echo', value: 'zen' }],
        elseEffects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_karma_wrath', op: 'gte', value: 5 },
            thenEffects: [{ type: 'setFlag', flag: 'sl_s17_karma_echo', value: 'wrath' }],
            elseEffects: [{ type: 'setFlag', flag: 'sl_s17_karma_echo', value: 'balance' }],
          },
        ],
      },
      setStep(SHAOLIN_SIDE17_QUEST_ID, 'redeem_in_pagoda'),
      toast(
        '已击退西夏一品堂追魂使！请前往【嵩山少林寺 · 大雄宝殿正殿（sl_daxiong_main）】佛前公断贺兰枭因果。',
        'success',
        '少室大雪',
      ),
    ],
  },

  scene_sls17_07: {
    id: 'scene_sls17_07',
    title: '第七幕 · 佛前断爪',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    illustrationUrl: '/assets/quests/sl_s17_snow_redemption.jpg',
    illustrationCaption: '慈航度恶 · 佛前废去悍匪毒爪恶功，公断因果并安顿其无辜幼女',
    mandatory: true,
    beats: [
      N('大雄宝殿檀香缭绕，佛祖金身慈目低垂。玄慈方丈与玄寂首座端坐两侧，铁链加身的贺兰枭跪伏殿心，身旁小沙弥轻轻牵着他那名满眼惶恐的五岁幼女。'),
      S(
        SPEAKER_OLD_HAN,
        '（举起灵牌泪如雨下）“贺兰枭！抬头看看我大儿韩武、二儿韩勇的灵位！他们当年不过押运一车布匹，你为何连活口都不留啊！”',
      ),
      S(
        SPEAKER_HELAN_XIAO,
        '（痛哭叩首，决绝地伸出双手与胸膛）“我对不住洛西三十七条冤魂！请大师亲手废去我这身造孽的毒爪邪功！我身上这两千余两延州与洛阳藏银契据，愿全数交予苦主抚恤遗孤老小——只求莫连累这孩子！”',
      ),
      N('你指尖凝起精纯金刚指力，精准点向贺兰枭膻中、气海与双臂曲池大穴！“噗噗”数声闷响，盘踞二十年的腐骨毒煞溃散作缕缕青烟，贺兰枭一声惨呼瘫软在地，一生毒爪恶功彻底化作乌有！'),
    ],
    onFinishEffects: [openScene('scene_sls17_08', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_08: {
    id: 'scene_sls17_08',
    title: '第八幕 · 慈航度恶',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('毒功已废、两千余两赃银契据亦交由韩老丈与众苦主验看。大殿一时寂静无声，只听见幼女躲在柱后压抑的轻声抽泣。'),
      S(
        'NPC-0112',
        '{ifFlagEq:sl_s17_karma_echo=zen|（玄慈方丈凝视着你，目光温润而深邃）“阿弥陀佛。你自入寺以来处处以慈悲禅心济世度人，如今此獠毒功尽废、真心悔过，怀中尚有五岁稚女无依无靠，依你之见，当如何发落其人？”|}{ifFlagEq:sl_s17_karma_echo=wrath|（玄慈方丈轻念佛号，眉宇间带着几分洞悉与考校）“阿弥陀佛。你一路行来常以金刚怒目惩奸除恶、不假辞色，今日面对已成废人且甘愿赎罪的贺兰枭与其稚女，你决意如何了断这桩因果？”|}{ifFlagEq:sl_s17_karma_echo=balance|（玄慈方丈合十垂目，声若清钟）“阿弥陀佛。你素来禅心与戒律并重，如今恶功已除、脏银归民，这名背负血债的悔悟者与其无辜幼女，便由首座定夺归处。”|}',
      ),
      N('关洛苦主、玄寂与跪伏血泪中的贺兰枭齐齐望向你。慈悲与王法戒律之间，你郑重作出终极抉择：'),
    ],
    choices: [
      {
        id: 'verdict_pagoda_redemption',
        label: '【慈航度恶 · 塔林终生】剃度收留其于塔林披麻扫雪悔过终身，托山下善户收养抚育其幼女！',
        subLabel: '给悔过废人留一线向善赎罪之机，大增侠义（禅心慈悲 +3）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s17_verdict', value: 'pagoda' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s17_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
            ],
          },
          openScene('scene_sls17_09', SHAOLIN_SIDE17_QUEST_ID),
        ],
      },
      {
        id: 'verdict_border_law',
        label: '【救命不纵罪 · 押交自首】救其残命但不纵旧罪，伤愈后押交边关官府自首伏法，幼女由少林常住抚养！',
        subLabel: '慈悲与国法兼顾，彰显大宋律法与佛门正气（怒目杀业 +1，禅心慈悲 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s17_verdict', value: 'law' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s17_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls17_09', SHAOLIN_SIDE17_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls17_09: {
    id: 'scene_sls17_09',
    title: '第九幕 · 苦主心服',
    subtitle: '嵩山少林寺 · 塔林雪径',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s17_verdict=pagoda|韩老丈凝视着毒功尽废、披上粗麻接过竹帚的贺兰枭，又摩挲着足以养活三十余户孤儿寡母的契据，长叹落泪：“大师明断如佛！留这废人终生扫雪忏罪、善待无辜稚童，比一刀宰了他更令冤魂安息！我等关洛苦主，心服口服！”|韩老丈与众苦主听闻恶功已废、赃银抚恤且待伤愈押交边关官府明正典刑，而无辜稚女由少林善养不株连，齐齐向佛祖与你深深叩首：“大师铁面慈心、国法佛理两全，我等关洛苦主心服口服！”}'),
      N('殿外风雪悄然停歇，一缕冬日微光穿透云层照亮佛祖慈眉。{ifFlagEq:sl_s17_verdict=pagoda|寺西塔林雪径上，换上粗麻的贺兰枭佝偻着脊背，三步一叩清扫积雪；山下善户亦含泪领走那名幼女，许诺视若己出。|禅房之外，伤势渐稳的贺兰枭向少林常住收养的幼女深深望了最后一眼，甘愿戴上枷锁随护送僧启程赴边关自首。}'),
      N('临别之际，贺兰枭跪在雪地里向你重重磕了三个响头。望着这名半生造孽、终于醒悟的罪人，你赐予他最后一句临行偈语：'),
    ],
    choices: [
      {
        id: 'parting_verse_mercy',
        label: '“往昔所造诸恶业，皆由无始贪嗔痴。愿你余生念念向善，以诚忏过。”',
        subLabel: '慈悲点化（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s17_verse', value: 'mercy' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_verse_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s17_verse_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls17_10', SHAOLIN_SIDE17_QUEST_ID),
        ],
      },
      {
        id: 'parting_verse_karma',
        label: '“天理昭昭、报应不爽！莫忘今日废功断爪之痛与关洛三十七条亡魂。”',
        subLabel: '严正警策（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s17_verse', value: 'karma' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_verse_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s17_verse_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls17_10', SHAOLIN_SIDE17_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls17_10: {
    id: 'scene_sls17_10',
    title: '第十幕 · 雪霁禅明',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      S(
        'NPC-0134',
        '（玄寂望着漫山雪霁晴空，由衷赞叹）“不纵恶以欺弱，不嗜杀以徇私；外伏异邦强敌，内度顽凶归正、护持无辜稚童。师弟今日这一场风雪公案，真乃活生生的《金刚经》注脚！”',
      ),
      S(
        'NPC-0112',
        '“阿弥陀佛。放下屠刀，并非免于因果，而是甘受因果、以余生赎过。你经义与武学皆已臻化境，今日慈航度恶之举，足令少林禅风流传百世！”',
      ),
      N('腊月大雪初霁，少室山松柏挂满晶莹冰棱。历经此番山门退敌与佛前度恶，你对佛门慈悲与武道真意又添一层彻骨体悟，丹田内力圆融通透，心境澄明无尘。'),
    ],
    choices: [
      {
        id: 'sls17_complete',
        label: '合十回向众生，领受师门嘉许与禅武感悟',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 1100, reason: '风雪山门击退西夏一品堂宗师追魂使' },
          { type: 'addSectContribution', amount: 350 },
          { type: 'modifyChivalry', delta: 90, reason: '外退虎狼、内断恶功抚恤苦主并护持幼女' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_verdict', op: 'eq', value: 'pagoda' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 30, reason: '慈航度恶剃度塔林悔过、妥善托孤善户' },
            ],
          },
          { type: 'addArtExp', amount: 260 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyRenown', delta: 120, reason: '完成门派差事《少室大雪 · 慈航度恶》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s17_verdict', op: 'eq', value: 'law' },
            thenEffects: [
              { type: 'modifyRenown', delta: 20, reason: '救命不纵罪、护法明正典刑名播关洛' },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE17_QUEST_ID, outcome: 'completed' },
          toast(
            '【少室大雪 · 慈航度恶】圆满完成！实战经验 +1100，师门贡献 +350，声望 +120，侠义 +90，武学修为 +260，经义 +2！',
            'success',
            '慈航度恶',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_SIDE17_SCENES
