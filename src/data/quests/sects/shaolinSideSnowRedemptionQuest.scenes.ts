import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE17_QUEST_ID } from './shaolinSideSnowRedemptionQuest'

const SPEAKER_HELAN_XIAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '「断魂铁爪」贺兰枭',
  title: '西夏一品堂叛逃悍匪',
  factionName: '西夏流亡凶徒',
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

function buildTuobaLieBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS17_TUOBA_LIE',
    name: '「玄霜鬼手」拓跋烈',
    title: '西夏一品堂宗师追魂使',
    realm: '宗师中品',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '一品堂追魂使',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“少林寺藏污纳垢、庇护我一品堂叛徒！老秃驴，今日便让你尝尝我西夏玄霜冰蚕掌的滋味！”',
    stats: { hp: 5120, mp: 4680, agi: 83, res: 72 },
    talents: { bone: 92, comprehension: 88, charm: 58 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-246',
      move1: 'MA-055',
      move2: 'MA-085',
      move3: 'MA-065',
    },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-246', level: 9 },
      { artId: 'MA-055', level: 9 },
      { artId: 'MA-085', level: 9 },
      { artId: 'MA-065', level: 8 },
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
      N('{reignYear}腊月，鹅毛大雪连下三日，少室山千峰尽白、古道断绝。将近戌时，钟鼓禅院外忽然传来一阵撕心裂肺的捶门声，伴着沉重的喘息与血腥气破风而入。'),
      N('你与戒律院首座玄寂闻声赶至禅院门廊，但见风雪中匍匐着一名披头散发、左肩插着半截幽蓝冰棱镖的铁塔巨汉。他十指枯黑如钩，雪地上拖出一道触目惊心的暗红血痕。'),
      S('NPC-0134', '（玄寂瞳孔微缩，沉声喝止欲上前的巡夜僧）“且慢！此人十指泛着西夏腐骨毒煞，莫非便是五年前在关洛一带连屠三家镖局的西夏一品堂恶贼——『断魂铁爪』贺兰枭？！”'),
      S(SPEAKER_HELAN_XIAO, '（猛地以额头重重撞击青石雪阶，额血直流，声嘶力竭）“正是罪人贺兰枭！大师救命……西夏一品堂嫌我知晓太多机密，派追魂使一路千里截杀！我一路逃来，只求佛门慈悲收留，让我苟延残喘！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_02', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_02: {
    id: 'scene_sls17_02',
    title: '第二幕 · 血债泣诉',
    subtitle: '嵩山少林寺 · 钟鼓禅院',
    mandatory: true,
    beats: [
      N('你俯身以精纯少林内力替他逼出肩头冰毒、暂封血脉，目光却如古井无波，冷冷直视着这名曾在中原江湖掀起腥风血雨的西夏悍匪。'),
      P('“阿弥陀佛。贺兰枭，你既自称求佛门垂怜，可曾记得五年前洛西官道上，死在你这双『断魂铁爪』下的三十七条无辜性命？”'),
      S(SPEAKER_HELAN_XIAO, '（浑身剧震，枯黑的十指死死抠进冰冷积雪中，嘶哑痛哭）“我记得……夜夜都梦见那些冤魂索命！当年我为一品堂卖命，以为荣华富贵唾手可得，直到上月我拒不屠杀延州一村降民，他们便翻脸下毒杀我妻儿、追杀我万里！大师，我如今才知半生造孽有多深重……”'),
      S('NPC-0134', '（玄寂皱眉叹息）“师弟，此獠罪孽滔天，绝非一句痛哭便可一笔勾销。然则方才哨僧来报，山门外火把连天，西夏一品堂的追魂使已经寻着血迹杀上少室山了！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_03', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_03: {
    id: 'scene_sls17_03',
    title: '第三幕 · 慈悲与因果',
    subtitle: '嵩山少林寺 · 钟鼓禅院',
    mandatory: true,
    beats: [
      N('话音刚落，山门方向便传来一阵尖厉刺耳的西夏铜角声，夹杂着数十名中原百姓凄厉的哭喊与叫骂——来敌竟不仅有一品堂高手，还裹挟了当年死于贺兰枭铁爪之下的关洛苦主亲眷！'),
      S('NPC-0134', '“好毒辣的攻心之计！一品堂明知强闯少林理亏，便一路煽动关洛仇家随行逼门。咱们若交出贺兰枭，便是任由西夏鹰犬在少林山门耀武扬威；若闭门庇护，天下人又要骂我少林包庇血债悍匪、罔顾百姓死活！”'),
      P('（合十静立风雪之中，心中《金刚经》与《地藏经》妙义豁然贯通，声色沉定如山）“玄寂师兄，佛门慈悲，从非是非不分的妇人之仁，亦绝非放纵恶人逃脱果报的避风港。”'),
      P('“西夏一品堂乃异邦虎狼，岂容其在中土佛门前耀武扬威、擅动私刑？我先去山门前击退追魂使，守住少林清净尊严；至于贺兰枭欠下关洛百姓的血债，须在佛祖与苦主面前，以佛门正法了断因果！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_04', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_04: {
    id: 'scene_sls17_04',
    title: '第四幕 · 踏雪出关',
    subtitle: '嵩山少林寺 · 钟鼓禅院',
    mandatory: true,
    beats: [
      S('NPC-0134', '（玄寂眼中绽出赞叹之色，郑重合十）“善哉！师弟经义湛深，于两难死局中照见慈悲与因果之界！老衲即刻命戒律院武僧严密看押贺兰枭，严防其暴起伤人或畏罪自尽，山门演武坪便全赖师弟独撑大局了！”'),
      P('“阿弥陀佛。弟子这便踏雪前往罗汉堂演武大坪，会一会那西夏一品堂的追魂使！”'),
    ],
    choices: [
      {
        id: 'sls17_go_snow_gate',
        label: '披雪整衣，前往罗汉堂演武大坪前山门迎敌',
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
    ],
  },

  scene_sls17_05: {
    id: 'scene_sls17_05',
    title: '第五幕 · 寒风逼门',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      N('大雪纷飞，演武大坪外的石阶上火把明灭。二十余名身着玄黑皮裘的西夏一品堂好手簇拥着一名面如寒霜、双掌隐泛青气的紫袍宗师傲立雪中；他们身后，十余名衣衫单薄的关洛乡民高举着灵牌，满脸泪痕与悲愤。'),
      S(SPEAKER_TUOBA_LIE, '（冷笑一声，负手踏前一步，脚下积雪竟被雄浑寒劲震成冰粉）“少林寺好大的架子！本使西夏一品堂『玄霜鬼手』拓跋烈！叛徒贺兰枭逃进了你们山门，识相的速速绑出来交予本使处决，否则今夜本使便踏平你这少室山门！”'),
      S(SPEAKER_OLD_HAN, '（一名白发老丈颤巍巍扑到雪地前，泪涕横流地泣喊）“少林大师！那贺兰枭五年前杀了老汉两个儿子啊！你们佛门不是最讲善恶有报么，怎能把这吃人不吐骨头的恶魔藏在寺里啊！”'),
      N('漫天风雪刮过众僧耳畔，不少年轻武僧听得老丈哭诉，不禁满面愧疚、握紧手中齐眉棍。'),
    ],
    onFinishEffects: [openScene('scene_sls17_06', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_06: {
    id: 'scene_sls17_06',
    title: '第六幕 · 明辨是非',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      N('你缓步踏入风雪中央，素色僧袍在凛冽寒风中纹丝不动。你先向白发韩老丈深深合十致礼，声若清泉暖人心脾。'),
      P('“韩老丈与诸位关洛乡亲请起。贫僧在此立誓：贺兰枭欠下诸位的血债，少林寺绝不包庇、绝不纵容，今日必在佛祖座前给诸位一个清清楚楚的公道！”'),
      N('话锋一转，你抬眸直视拓跋烈，浑身宗师气度骤然勃发，周身三尺飘雪竟被无形佛门罡气尽数弹开！'),
      P('“至于你西夏一品堂——贺兰枭当年滥杀我大宋关洛百姓，正是受尔等指使！如今你们杀人灭口不成，反倒假借苦主之痛来少林山门耀武扬威，真是天下至耻！欲入我少林山门拿人，先过贫僧这一关！”'),
      S(SPEAKER_TUOBA_LIE, '（脸色铁青，森然狞笑）“牙尖嘴利的秃驴！竟敢揭我一品堂的底！好，今日便让中原武林看看，少林首座接不接得住我西夏玄霜鬼手！”'),
    ],
    choices: [
      {
        id: 'sls17_fight_tuoba',
        label: '踏雪凝神，一对一迎战西夏一品堂追魂使「玄霜鬼手」拓跋烈！（1v1 宗师决战）',
        subLabel: '对手：西夏一品堂宗师追魂使 · 拓跋烈（宗师中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildTuobaLieBoss() },
            rule: 'duel',
            forbidEscapeReason: '山门之后便是少林千年古刹与关洛苦主，岂可退让半步！',
            introText: '【1v1 风雪退敌】于漫天大雪山门前，独力迎战西夏一品堂宗师追魂使【「玄霜鬼手」拓跋烈】！',
            onWin: [openScene('scene_sls17_07', SHAOLIN_SIDE17_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '拓跋烈玄霜冰蚕掌极为阴寒霸道，此战暂且受挫！请调息后再赴罗汉堂演武大坪重战退敌！',
                'warn',
                '少室大雪',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '与拓跋烈雪中鏖战平分秋色！请调息后再赴罗汉堂演武大坪彻底击退强敌！',
                'warn',
                '少室大雪',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls17_07: {
    id: 'scene_sls17_07',
    title: '第七幕 · 雪落降魔',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    illustrationUrl: '/assets/quests/sl_s17_snow_gate.jpg',
    illustrationCaption: '风雪山门 · 少室大雪漫天，少林首座独战西夏一品堂宗师追魂使',
    mandatory: true,
    beats: [
      N('大雪被两大宗师的雄浑掌风卷作数丈雪龙，演武大坪青砖寸寸龟裂！拓跋烈的冰蚕毒掌与寒冰绵掌阴狠刺骨，每一掌皆夹带蚀骨寒雾，欲将你周身经脉冻僵。'),
      N('然你以至阳至正的少林禅武护体，进退如松柏傲雪，绵绵佛门真气生生不息。苦战百余合后，你看破他寒掌换气瞬间左肋空门，一步踏碎冰霜，双掌如金刚伏虎般印在其护心镜上！'),
      N('“轰！”一声闷响，拓跋烈护体寒罡应声碎裂，整个人如断线风筝般倒飞三丈，连吐两口淤血，狼狈跪倒在雪堆之中！'),
      S(SPEAKER_TUOBA_LIE, '（捂着剧痛胸口，惊骇欲绝地盯着你）“这……这便是少林首座的纯粹佛门内力……竟连我的玄霜冰蚕毒雾都能焚化无形！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_08', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_08: {
    id: 'scene_sls17_08',
    title: '第八幕 · 叱退虎狼',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      N('二十余名西夏一品堂好手见主将惨败，纷纷拔刀欲扑，却被你一声蕴含狮子吼真气的佛号震得耳膜嗡鸣、兵刃险些脱手！'),
      P('“拓跋烈，今日贫僧留你一命，是因我佛不嗜杀生。滚回兴庆府告诉一品堂主事：中土少室山不是西夏法场，尔等若再敢踏入嵩山半步，贫僧必不轻饶！”'),
      S(SPEAKER_TUOBA_LIE, '（忌惮万分地咬牙爬起，恶狠狠瞪了你一眼，挥袖低吼）“少林果然卧虎藏龙……我们走！”'),
      N('残兵败将搀扶着拓跋烈仓皇逃下雪道，转眼没入苍茫雪幕之中。演武坪上顿复清净，只余十余名关洛苦主手足无措地立在风雪里。'),
    ],
    onFinishEffects: [openScene('scene_sls17_09', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_09: {
    id: 'scene_sls17_09',
    title: '第九幕 · 迎客入殿',
    subtitle: '嵩山少林寺 · 罗汉堂演武大坪',
    mandatory: true,
    beats: [
      N('你收功合十，命武僧取来厚棉袍与热姜汤分予冻得瑟瑟发抖的关洛乡亲。韩老丈捧着温热陶碗，既敬畏你惊天动地的武功，又忧心忡忡地望向寺内。'),
      S(SPEAKER_OLD_HAN, '“大师神威盖世，打跑了西夏番狗，老汉佩服！可……可那杀害我儿的贺兰枭，大师当真肯给咱们老百姓做主么？”'),
      P('“出家人不打诳语。诸位乡亲请随贫僧入大雄宝殿避雪暖身，贺兰枭一应血债与恶功，今日便在佛祖金身与诸位面前，了断得明明白白！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_10', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_10: {
    id: 'scene_sls17_10',
    title: '第十幕 · 雪径引路',
    subtitle: '嵩山少林寺 · 演武大坪通往大雄宝殿',
    mandatory: true,
    beats: [
      N('大雪渐细，钟鼓余韵在殿宇飞檐间低回。关洛苦主相互搀扶着随你步向大雄宝殿，沿途武僧皆肃立合十，庄严肃穆。'),
    ],
    choices: [
      {
        id: 'sls17_go_daxiong',
        label: '引关洛苦主步入大雄宝殿正殿，佛前公断贺兰枭血债',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE17_QUEST_ID, 'redeem_in_pagoda'),
          toast(
            '已击退西夏一品堂追魂使！请前往【嵩山少林寺 · 大雄宝殿正殿（sl_daxiong_main）】了断贺兰枭因果。',
            'success',
            '少室大雪',
          ),
        ],
      },
    ],
  },

  scene_sls17_11: {
    id: 'scene_sls17_11',
    title: '第十一幕 · 佛前对质',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('大雄宝殿内檀香缭绕，佛祖金身慈目低垂。玄慈方丈与玄寂首座端坐两侧，铁链加身的贺兰枭被押跪于殿心青砖之上。一见韩老丈等关洛苦主步入大殿，这名昔日凶神恶煞的悍匪竟不敢抬头，浑身筛糠般颤抖起来。'),
      S(SPEAKER_OLD_HAN, '（颤声举起木牌，泪如雨下）“贺兰枭！你抬头看看！这是我大儿韩武、二儿韩勇的灵位！他们当年不过是在洛西押运一车布匹，你为何连活口都不留啊！”'),
      S(SPEAKER_HELAN_XIAO, '（伏地痛哭，以头抢地）“我对不住你们……对不住洛西三十七条冤魂！我当年猪油蒙心，只图一品堂赏银，如今妻儿惨死、众叛亲离，报应全落在我自己头上了！诸位苦主，你们若要拿刀剐了我，贺兰枭绝不皱一下眉头！”'),
      S('NPC-0112', '（玄慈方丈微闭双目，轻念佛号）“善恶到头终有报。首座，此人既伏倒佛前求度，又背负三十七条人命血债，依你之见，当如何处置方合佛法与公道？”'),
    ],
    onFinishEffects: [openScene('scene_sls17_12', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_12: {
    id: 'scene_sls17_12',
    title: '第十二幕 · 断爪除恶',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('你缓步走到贺兰枭身前，声音清朗而凝重，字字叩击人心。'),
      P('“贺兰枭，你以一双毒爪害人无数，若留着这身邪功，便是留着人间祸根；若一剑杀了你，你一死了之反倒轻松，岂能偿还诸位苦主半生孤苦？”'),
      P('“今日贫僧便以少林正法，亲手震断你奇经毒脉、废尽你一生毒爪恶功，令你从此沦为手无缚鸡之力的废人！你可甘愿受此一指？”'),
      S(SPEAKER_HELAN_XIAO, '（抬起血泪纵横的脸，决绝地伸出双手与胸膛）“罪人甘愿！请大师废去我这身造孽的邪功！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_13', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_13: {
    id: 'scene_sls17_13',
    title: '第十三幕 · 慈航度恶',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    illustrationUrl: '/assets/quests/sl_s17_snow_redemption.jpg',
    illustrationCaption: '慈航度恶 · 佛前废去悍匪毒爪恶功，判其披麻扫雪塔林终生赎罪',
    mandatory: true,
    beats: [
      N('你指尖凝起一缕精纯浑厚的金刚指力，精准点向贺兰枭膻中、气海与双臂曲池大穴！只听“噗噗”数声闷响，贺兰枭周身盘踞二十年的腐骨毒劲被浩然佛力震得寸寸溃散，十指黑气化作青烟消弭，一声惨呼后瘫软在地，一生引以为傲的毒爪恶功自此烟消云散！'),
      N('片刻后，贺兰枭喘息着从怀中摸出一块沉甸甸的西夏金符与一纸暗藏地契，双手颤抖着捧给韩老丈。'),
      S(SPEAKER_HELAN_XIAO, '“这……这是我历年在延州与洛阳藏匿的全部金银凭据，足有两千余两……请少林大师代为变卖，全数分给关洛死难苦主的遗孤老小，聊表罪人万一之愧！”'),
      P('（取过一件粗麻僧衣与一柄竹帚，郑重置于贺兰枭面前）“毒功已废，脏银归民。然罪孽未尽，自今日起，你须披此粗麻、执此竹帚，终生居于少林塔林扫雪清阶、朝夕诵经超度亡魂，非死不得踏出塔林半步！韩老丈，诸位乡亲，不知如此处置，可还公允？”'),
    ],
    onFinishEffects: [openScene('scene_sls17_14', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_14: {
    id: 'scene_sls17_14',
    title: '第十四幕 · 苦主心服',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
      N('韩老丈凝视着瘫倒在地、彻底化作寻常病弱残躯的贺兰枭，又看了看那份足以养活三十余户孤儿寡母的赃银契据，眼中滔天恨意渐渐化作深沉的悲凉与释然。'),
      S(SPEAKER_OLD_HAN, '（长叹一声，擦去老泪，率众苦主向佛祖与你深深跪拜）“大师明断如佛！这魔头一身害人邪功既已废尽，又肯倾囊抚恤我等遗孤、终生披麻扫雪忏罪，留着这条残命日日受良心煎熬，比一刀宰了他更令九泉下的冤魂安息！我等关洛苦主，心服口服！”'),
      N('众苦主纷纷合十叩首。殿外风雪悄然停歇，一缕冬日微光穿透云层，恰好照在佛祖慈悲低垂的眉眼之上。'),
    ],
    onFinishEffects: [openScene('scene_sls17_15', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_15: {
    id: 'scene_sls17_15',
    title: '第十五幕 · 塔林扫雪',
    subtitle: '嵩山少林寺 · 塔林雪径',
    mandatory: true,
    beats: [
      N('送别关洛乡亲后，你与玄慈方丈、玄寂首座信步来到寺西塔林。二百余座历代高僧砖塔静立雪海之中，换上粗麻破衣的贺兰枭正佝偻着脊背，一帚一帚笨拙却无比虔诚地清扫着塔前积雪，每扫三步便俯身叩首一次。'),
      S('NPC-0134', '（玄寂望着雪地里那道佝偻身影，由衷赞叹）“不纵恶以欺弱，不嗜杀以徇私；外伏异邦强敌，内度顽凶归正。师弟今日这一场风雪公案，真乃活生生的《金刚经》注脚！”'),
      S('NPC-0112', '“阿弥陀佛。放下屠刀，并非免于因果，而是甘受因果、以余生赎过。你经义与武学皆已臻化境，今日慈航度恶之举，足令少林禅风流传百世！”'),
    ],
    onFinishEffects: [openScene('scene_sls17_16', SHAOLIN_SIDE17_QUEST_ID)],
  },

  scene_sls17_16: {
    id: 'scene_sls17_16',
    title: '第十六幕 · 雪霁禅明',
    subtitle: '嵩山少林寺 · 大雄宝殿正殿',
    mandatory: true,
    beats: [
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
          { type: 'modifyChivalry', delta: 90, reason: '外退虎狼、内断恶功抚恤苦主，彰显侠义慈悲' },
          { type: 'addArtExp', amount: 260 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyRenown', delta: 120, reason: '完成门派差事《少室大雪 · 慈航度恶》' },
          { type: 'completeQuest', questId: SHAOLIN_SIDE17_QUEST_ID },
          toast(
            '【少室大雪 · 慈航度恶】圆满完成！获实战经验+1100、师门贡献+350、侠义+90、武学修为+260、经义+2！',
            'success',
            '慈航度恶',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_SIDE17_SCENES
