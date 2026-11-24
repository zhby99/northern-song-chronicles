import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q23_QUEST_ID } from './shaolinLuohanVajraFingerQuest'

const SPEAKER_IRON_CORPSE: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁尸尊者',
  title: '塞外黑教 · 横练炼体狂人',
  factionName: '塞外黑教',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_OLD_MASON: StorySpeakerSpec = {
  kind: 'custom',
  name: '石窟老石匠',
  title: '巩县石窟寺 · 雕佛匠首',
  factionName: '巩县百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildBlackSectGuard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ23_BLACK_SECT_GUARD',
    name: '黑教铁链护法',
    title: '塞外黑教 · 石窟外围邪徒头目',
    realm: '二流上品',
    factionId: 'SECT-21',
    factionName: '塞外黑教',
    sectRank: 2,
    sectRankLabel: '黑教护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“少林小秃驴敢闯尊者炼体法坛？先过了老子手里的黑铁链与断门刀！”',
    stats: { hp: 1840, mp: 1120, agi: 54, res: 42 },
    talents: { bone: 80, comprehension: 60, charm: 38 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-132' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-244', level: 7 }, { artId: 'MA-132', level: 6 }],
  })
}

function buildIronCorpseBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ23_IRON_CORPSE',
    name: '铁尸尊者',
    title: '塞外黑教 · 横练炼体狂人',
    realm: '一流下品',
    factionId: 'SECT-21',
    factionName: '塞外黑教',
    sectRank: 3,
    sectRankLabel: '炼体狂僧',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“哈哈哈！老夫横练铁尸金身三十年，胸前更有天外乌金护心镜！刀枪不入、水火不侵，你这少林秃驴拿什么破我金身！”',
    stats: { hp: 3560, mp: 2050, agi: 66, res: 72 },
    talents: { bone: 94, comprehension: 72, charm: 34 },
    equippedArts: { neigong: 'MA-080', move1: 'MA-046', move2: 'MA-106' },
    learnedArts: [{ artId: 'MA-080', level: 8 }, { artId: 'MA-046', level: 8 }, { artId: 'MA-106', level: 8 }],
  })
}

function buildIronCorpseShakenBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ23_IRON_CORPSE_SHAKEN',
    name: '铁尸尊者（失势暴怒）',
    title: '塞外黑教 · 横练炼体狂人',
    realm: '一流下品',
    factionId: 'SECT-21',
    factionName: '塞外黑教',
    sectRank: 3,
    sectRankLabel: '炼体狂僧',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“可恶！竟敢坏老夫炼体人质法阵！老夫这便撕碎了你，拿你的少林金身补祭！”',
    stats: { hp: 2980, mp: 1780, agi: 60, res: 60 },
    talents: { bone: 94, comprehension: 72, charm: 34 },
    equippedArts: { neigong: 'MA-080', move1: 'MA-046', move2: 'MA-106' },
    learnedArts: [{ artId: 'MA-080', level: 7 }, { artId: 'MA-046', level: 7 }, { artId: 'MA-106', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq23_01: {
    id: 'scene_slq23_01',
    title: '第一幕 · 木桩论指 · 凌空碎石',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('{reignYear}孟春，嵩山冰消雪融。当年初入罗汉堂时步步吃力的【十八铜人木桩廊】，如今你踏步其间已是举重若轻。廊尽头青石台畔，铁掌禅师玄痛正负手而立，案上叠着三块寸许厚的嵩山青花岗石板；玄苦师伯亦在一旁静坐拨珠。'),
      S('NPC-0156', '（目光锐利如锥，沉声开口）“阿弥陀佛！师侄已得玄苦师兄《燃木刀法》真传，外门兵刃可谓刚猛无双。然而行走江湖，总有兵刃脱手、或遇横练铁布衫金钟罩之辈之时——今日老衲便与玄苦师兄合授你罗汉堂另一门破甲摧坚第一的绝艺：《大力金刚指》！”'),
      N('玄痛不再多言，右手中指与食指并拢微微一屈，隔着三尺距离朝案上三块青花岗石板轻轻一点！“啵——”一声极沉闷的脆响，三块厚石并未四分五裂，却在指风透入的刹那齐齐化作一滩细白石粉，顺着毫发无损的石案簌簌滑落！'),
      S('NPC-0126', '（含笑补充）“《燃木刀法》是散阳刚于八尺刀风，《大力金刚指》则是聚千钧佛力于一指寸尖！一散一聚，方成罗汉堂无上刚猛大道！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_02', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_02: {
    id: 'scene_slq23_02',
    title: '第二幕 · 笔锋入指 · 凝劲传艺',
    subtitle: '十八铜人木桩廊 · 经书证武',
    mandatory: true,
    beats: [
      S('NPC-0156', '“你书法已逾六十，可知颜真卿楷书『锥画沙、印印泥』之妙？《大力金刚指》运劲便如铁画银钩，全身内力循肩、肘、腕三节层层压缩，至指尖一寸方轰然透发！”'),
      S('NPC-0126', '“更须记住：金刚怒目，原为降伏四魔！若无深厚经义定住心猿，指力越刚猛，越易反折己指。今你面对眼前这根熟铁木桩，打算借哪一路旧功法门来领悟凝劲一点？”'),
      N('二老将《大力金刚指》经脉运劲口诀逐一拆解，命你即刻当场贯指试桩——'),
    ],
    choices: [
      {
        id: 'slq23_train_calligraphy',
        label: '【锥画沙笔意入指】效颜楷中锋藏力，逐节压缩内息于指尖疾点铁桩！',
        subLabel: '当场领悟《大力金刚指》精巧穿坚之劲',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q23_finger_style', value: 'calligraphy' },
          teachArtNow('MA-044'),
          openScene('scene_slq23_03', SHAOLIN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'slq23_train_yang',
        label: '【燃木纯阳聚散归指】收八尺烈焰刀风尽归食中二指，以至阳霸劲破铁桩！',
        subLabel: '当场领悟《大力金刚指》霸道摧坚之劲',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q23_finger_style', value: 'yang' },
          teachArtNow('MA-044'),
          openScene('scene_slq23_03', SHAOLIN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq23_03: {
    id: 'scene_slq23_03',
    title: '第三幕 · 巩县急报 · 金刚怒目',
    subtitle: '十八铜人木桩廊 · 邪僧毁窟',
    mandatory: true,
    beats: [
      N('“咔嚓！”熟铁包皮竟应你一指凹陷半寸，碎木屑自桩背迸出！玄痛与玄苦方才颔首赞许，一名满身尘土的巩县石窟寺知客僧却跌跌撞撞冲入木桩廊，噗通跪倒声泪俱下！'),
      N('那僧人泣诉道：“玄痛大师救命！巩县北魏石窟寺昨日闯入塞外黑教炼体狂人【铁尸尊者】！此獠胸悬两寸厚的乌金护心铜镜，一身黑教横练功刀剑难伤，砸毁十余尊百年古佛不说，还将满窟六十余名修佛石匠以铁链锁在千佛洞口，逼着以生民怨气替他淬炼铁尸邪功，扬言明日午时少林若不敢接战，便要塌窟活埋所有石匠！”'),
      S('NPC-0156', '（怒眉倒竖，须发微张）“岂有此理！北魏石窟乃五百年佛门圣迹，石匠更是无辜良民！玄苦师兄旧伤未愈，戒律堂亦须老衲坐镇——师侄方承《大力金刚指》，正该以那铁尸尊者的乌金护心铜镜试我金刚指力！”'),
      P('（上前一步，双目灼灼如电）“二位师伯不必劳烦！佛门慈悲亦有金刚怒目，弟子请命即刻驰援巩县石窟！”'),
    ],
    choices: [
      {
        id: 'slq23_accept_scout',
        label: '【详询石窟地势与铁链机关】先向知客僧问清千佛洞悬石锁链方位，再火速驰援！',
        subLabel: '开启【金刚怒目 · 碎石成粉】驰援巩县，探明人质关押地势',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q23_scouted', value: true },
          { type: 'startQuest', questId: SHAOLIN_Q23_QUEST_ID, stepId: 'gongxian_grotto_rescue' },
          setStep(SHAOLIN_Q23_QUEST_ID, 'gongxian_grotto_rescue'),
          openScene('scene_slq23_04', SHAOLIN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'slq23_accept_rush',
        label: '【刻不容缓星夜疾驰】生民性命悬于一线，辞别二老施展轻功立刻奔赴巩县！',
        subLabel: '开启【金刚怒目 · 碎石成粉】驰援巩县，全力奔袭救匠',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q23_scouted', value: false },
          { type: 'startQuest', questId: SHAOLIN_Q23_QUEST_ID, stepId: 'gongxian_grotto_rescue' },
          setStep(SHAOLIN_Q23_QUEST_ID, 'gongxian_grotto_rescue'),
          openScene('scene_slq23_04', SHAOLIN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq23_04: {
    id: 'scene_slq23_04',
    title: '第四幕 · 疾驰伊洛 · 烟蔽石窟',
    subtitle: '巩县石窟道 · 浓烟蔽日',
    mandatory: true,
    beats: [
      N('你施展轻功星夜兼程，赶在次日巳时末抵达伊洛河畔的巩县石窟寺！远远便见北魏石崖前浓烟滚滚，几尊石雕力士已被砸得碎石满地，空气中弥漫着刺鼻的硫磺与铁腥焦气。'),
      N('走近千佛洞前，只见六十余名满脸血污的修佛石匠被粗重铁索串连捆绑，正被十余名手持铁链刀斧的黑教邪徒驱赶至摇摇欲坠的悬石窟口——{ifFlag:sl_q23_scouted|正如知客僧所言，拴住人质与窟顶悬闸的主铁环正扣在洞口左上方两丈高的青石榫眼之中！|仔细打量，拴住人质的粗铁链正顺着石壁向上绕过洞顶铁环，显然备作胁迫之用！}'),
      N('外围不少邪徒实则是被黑教邪术威逼利诱来的河洛流民，望见满地碎佛残像时眼神闪烁不安；而在洞前巨石之上，一道身高八尺、肤色青黑如生铁的魁梧狂人正狂笑负手而立！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q23_grotto_reached', value: true },
      openScene('scene_slq23_05', SHAOLIN_Q23_QUEST_ID),
    ],
  },

  scene_slq23_05: {
    id: 'scene_slq23_05',
    title: '第五幕 · 千佛洞前 · 救匠三策',
    subtitle: '巩县石窟 · 决战铁尸尊者（实战）',
    illustrationUrl: '/assets/quests/sl_23_gongxian_grotto.jpg',
    illustrationCaption: '巩县石窟 · 夕照残窟下，铁尸尊者胸悬乌金护心铜镜，狂笑欲毁北魏千佛石像与满窟石匠',
    mandatory: true,
    beats: [
      N('铁尸尊者赤裸上身，胸口以粗铁链悬着一面厚达两寸、黑沉沉的乌金护心铜镜，双掌泛着骇人铁泽！见你单身赶至，他放声狂笑，随手一掌将脚边青石拍得粉碎！'),
      S(SPEAKER_OLD_MASON, '（满脸血污、泣声呼救）“阿弥陀佛！少林高僧来了！铁尸魔头要把俺们六十余口连同这五百年古佛活埋炼尸啊，大师快救命！”'),
      S(SPEAKER_IRON_CORPSE, '（睥睨冷笑，敲得胸前乌金镜当当作响）“少林寺果然没人了，只派一个小辈来送死！你若敢乱动，老夫一声令下，窟顶巨链松闸、外围众徒齐上，满窟泥腿子先替你陪葬！”'),
      N('人质悬于链下、外围邪徒环伺、铁尸尊者虎视眈眈——生死一瞬，你当机立断择策破局！'),
    ],
    choices: [
      {
        id: 'slq23_tactic_chains',
        label: '【金刚指隔空震松窟顶锁链救人质】先凝指劲震断人质铁锁护石匠撤入内窟，再直捣铁尸！',
        subLabel: '需先天悟性 ≥ 70 或实战身法 ≥ 58 · 破其人质胁迫，1v1 破失势铁尸尊者（胜后禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'talentAtLeast', key: '悟性', min: 70 },
            { type: 'combatStatAtLeast', key: 'agility', min: 58 },
          ],
          hint: '需先天悟性 ≥ 70 或实战身法 ≥ 58',
        },
        effects: [
          toast('你指风连发隔空震断人质铁链主环，众石匠在老匠首率领下瞬息退入内窟安全处！铁尸尊者失势暴怒，独自扑来！', 'success', '隔空救匠'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q23_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronCorpseShakenBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '满窟石匠刚刚撤入内窟，绝不可放铁尸尊者闯入洞内！',
            introText: '【巩县石窟 · 隔空救匠】人质已脱险、狂人失势暴怒，1v1 以《大力金刚指》力破【铁尸尊者】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q23_tactic', value: 'chains' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q23_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q23_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_slq23_06', SHAOLIN_Q23_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些被铁尸尊者狂暴铁掌震伤！调息后可再于【十八铜人木桩廊】动身续战。', 'warn', '巩县石窟'),
            ],
          },
        ],
      },
      {
        id: 'slq23_tactic_preach',
        label: '【佛理喝破黑教邪术稳住被胁徒众】运佛门狮子吼点破炼尸谎言，遣散外围邪徒独战狂人！',
        subLabel: '需经义 ≥ 75 或辩才 ≥ 55 · 瓦解外围黑教随从，1v1 直破铁尸尊者（胜后禅心慈悲 +1）',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 75 },
            { type: 'skillAtLeast', key: '辩才', min: 55 },
          ],
          hint: '需经义 ≥ 75 或辩才 ≥ 55',
        },
        effects: [
          toast('你声如洪钟喝破黑教以生人怨气炼尸之恶毒骗局，外围被胁河洛徒众纷纷丢刃跪散！铁尸尊者恼羞成怒独自扑上！', 'success', '佛音摄魔'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q23_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronCorpseShakenBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '外围邪徒已散，正宜一举击溃首恶铁尸尊者！',
            introText: '【巩县石窟 · 佛音摄魔】黑教随从溃散，1v1 正面迎战暴怒的【铁尸尊者】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q23_tactic', value: 'preach' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q23_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q23_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq23_06', SHAOLIN_Q23_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些被铁尸尊者狂暴铁掌震伤！调息后可再于【十八铜人木桩廊】动身续战。', 'warn', '巩县石窟'),
            ],
          },
        ],
      },
      {
        id: 'slq23_tactic_storm',
        label: '【金刚怒目正面强破石窟】不假辞色，连破黑教护法与全盛铁尸尊者杀出血路！',
        subLabel: '零门槛正攻 · 车轮连战黑教护法与全盛铁尸尊者（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q23_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBlackSectGuard() },
            extraOpponents: [{ kind: 'custom', npc: buildIronCorpseBoss() }],
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '身后满窟石匠性命攸关，唯有血战破窟方能救人！',
            introText: '【巩县石窟 · 车轮强破】连战【黑教铁链护法】与全盛【铁尸尊者】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q23_tactic', value: 'storm' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q23_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q23_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq23_06', SHAOLIN_Q23_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些被铁尸尊者的狂暴铁掌震伤！调息后可再于【十八铜人木桩廊】动身续战。', 'warn', '巩县石窟'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq23_06: {
    id: 'scene_slq23_06',
    title: '第六幕 · 气门洞穿 · 一指破镜',
    subtitle: '巩县石窟 · 乌金崩裂',
    illustrationUrl: '/assets/quests/sl_23_shatter_mirror.jpg',
    illustrationCaption: '一指穿镜 · 金光凝于指尖一线，你以《大力金刚指》正面洞穿铁尸尊者胸前两寸厚的乌金护心铜镜',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q23_tactic=chains|石匠尽入内窟无后顾之忧，你放手施为、步步紧逼；|}{ifFlagEq:sl_q23_tactic=preach|外围徒众溃散、狂人气焰先挫，你稳守反击消耗其横练真气；|}{ifFlagEq:sl_q23_tactic=storm|你连破护法杀入佛前，与全盛铁尸尊者硬碰硬激战四十余合；|}铁尸尊者仗着三十年横练金身硬吃十余记重击，呼吸却已明显粗重！'),
      N('电光火石间，你骤然看穿他每次收掌换气时，胸前那面乌金护心铜镜正中微凸的莲花铆钉，正是其全身铁布衫气门汇集之处！'),
      N('你身形贴地疾滑避开当胸铁爪，右手食中二指并如金刚铁锥，将全身纯阳真气压缩至指尖一点，喝道“《大力金刚指》——碎石成粉！”，狠狠点中乌金铜镜正中！'),
      N('“锵——咔嚓！！”裂帛般的金铁爆鸣震彻伊洛山谷！两寸厚的乌金护心铜镜应指洞穿、炸成十余块碎铁飞溅！狂暴指劲透镜透胸，瞬间震散铁尸尊者三十年横练气门！'),
      S(SPEAKER_IRON_CORPSE, '（口喷鲜血轰然跪倒，满脸骇然绝望）“天外乌金镜……竟被你一根手指点穿了……少林《大力金刚指》……名不虚传……”'),
    ],
    onFinishEffects: [openScene('scene_slq23_07', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_07: {
    id: 'scene_slq23_07',
    title: '第七幕 · 满窟生春 · 石窟善后',
    subtitle: '巩县石窟 · 安置石匠',
    illustrationUrl: '/assets/quests/sl_23_save_masons.jpg',
    illustrationCaption: '救护石匠 · 夕阳余晖洒满北魏千佛石窟，获救的六十余名石匠与僧众齐齐向你合十跪谢',
    mandatory: true,
    beats: [
      N('其余黑教残徒见首领伏诛，顿时作鸟兽散，尽数被闻讯赶来的巩县衙役与石窟僧众擒拿。你亲手解开六十余名石匠残余绳索，老少匠人相拥而泣，齐齐面向你跪倒叩首！'),
      S(SPEAKER_OLD_MASON, '“多谢少林活菩萨救命之恩！这五百年的北魏千佛石窟与我等几十户人家的性命，全赖大师金刚一指护全啊！只是……邪贼砸毁了好几尊佛龛与大伙儿吃饭的凿子工具，还有十几位伤重后生不知如何度日……”'),
      N('夕阳金辉洒在满地碎石与受伤匠人惶然的脸上。巩县差役已在旁恭敬听候发落，面对满目疮痍的佛窟与伤患石匠，你决意如何善后？'),
    ],
    choices: [
      {
        id: 'slq23_aftermath_donate',
        label: '【捐银三十两重修佛窟、安置伤匠】自掏纹银购药置具，助石匠重整佛龛生计！',
        subLabel: '需 30 两纹银（已捐重试免复费）· 禅心慈悲 +2，额外大增侠义与江湖声望',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q23_donated', op: 'truthy' },
            { type: 'silverAtLeast', min: 30 },
          ],
          hint: '需 30 两纹银捐助石窟修缮与伤匠抚恤（已捐则免复费）',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_donated', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -30, reason: '捐资三十两助巩县石窟重修佛像并安置受伤石匠' },
              { type: 'setFlag', flag: 'sl_q23_donated', value: true },
            ],
            elseEffects: [],
          },
          { type: 'setFlag', flag: 'sl_q23_aftermath', value: 'donate' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_after_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q23_after_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq23_08', SHAOLIN_Q23_QUEST_ID),
        ],
      },
      {
        id: 'slq23_aftermath_official',
        label: '【留书巩县官府护持石窟】以少林真传名义致函县衙，请官府拨粮医治并设哨护窟',
        subLabel: '零花销行仁义 · 禅心慈悲 +1，保石窟长久安宁',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q23_aftermath', value: 'official' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_after_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q23_after_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq23_08', SHAOLIN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq23_08: {
    id: 'scene_slq23_08',
    title: '第八幕 · 凯旋返山 · 拾镜为凭',
    subtitle: '巩县石窟 · 启程回寺',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q23_aftermath=donate|三十两雪花银交到老石匠颤抖的手中，满窟工匠齐声哽咽礼拜，矢言要将少林高僧的慈悲功德刻入千佛洞碑记之中！|你提笔以少林罗汉堂真传名义写就公函交予县衙差役，差头连忙满口应承必报县尊拨粮设巡、妥善安置伤匠。}'),
      N('将废去邪功的铁尸尊者移交巩县官府严加锁押后，你俯身拾起半块中心留着浑圆指洞的乌金碎镜作为凭证，辞别依依不舍的乡亲与石窟僧众。'),
      P('（回望夕阳下重归庄严安宁的北魏石窟，合十礼佛）“金刚怒目以伏妖魔，低眉慈悲以护苍生——该回少林向二位师伯复命了！”'),
    ],
    choices: [
      {
        id: 'slq23_return_shaolin',
        label: '携破碎乌金镜返回【十八铜人木桩廊】，向玄痛师伯复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q23_QUEST_ID, 'return_luohan_east'),
          toast(
            '已一指破镜击溃铁尸尊者、救下巩县石窟满窟石匠！请返回【十八铜人罗汉堂 · 十八铜人木桩廊（sl_luohan_east）】复命。',
            'talk',
            '金刚怒目',
          ),
        ],
      },
    ],
  },

  scene_slq23_09: {
    id: 'scene_slq23_09',
    title: '第九幕 · 碎镜呈验 · 罗汉圆满',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('回到十八铜人木桩廊，玄痛与玄苦早已闻讯相迎。你将那块中心留着一道浑圆指洞的两寸厚乌金碎镜双手呈上，细述巩县石窟救匠破镜经过。'),
      S('NPC-0156', '（接过乌金碎镜摩挲指洞边缘，爽朗大笑）“好！好一个『金刚怒目、碎石成粉』！两寸乌金一指洞穿，既降了黑教狂魔，又救了六十余名无辜石匠，{ifFlagEq:sl_q23_aftermath=donate|更肯倾囊捐银重修佛窟安置伤匠，|并致函官府妥善护持佛迹，}这才是少林罗汉堂真传应有的侠义担当！”'),
      S('NPC-0126', '（合十颔首，眼中满是欣慰）“自今日起，你于罗汉堂《燃木刀法》与《大力金刚指》两大绝技皆已登堂入室，外刚内慈、刀指双绝！这卷《大力金刚指》完整心法与指诀，便正式归你执掌！”'),
      P('（躬身大礼拜谢）“多谢玄痛师伯、玄苦师伯栽培！弟子必以金刚指力守护天下苍生，不坠少林罗汉堂百年威名！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_10', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_10: {
    id: 'scene_slq23_10',
    title: '第十幕 · 金刚无畏',
    subtitle: '嵩山少林寺 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('春风拂过十八铜人木桩廊，廊檐铜铃清响不绝。案上那滩玄痛指风化就的青石白粉已被清风吹散，唯余一缕金刚佛气回荡廊间。'),
      N('你走完了罗汉堂真传单脉的全部试炼：左手燃木戒刀可焚邪魔，右手大力金刚指可穿乌金，刀指双绝、威震河洛！'),
      P('（收指合十，遥望大雄宝殿与藏经阁飞檐）“罗汉真传既成，接下来，便是为少林、为天下应对更大风云之时！”'),
    ],
    choices: [
      {
        id: 'slq23_complete',
        label: '习得《大力金刚指》，圆满完成【金刚怒目 · 碎石成粉】',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-044', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-044', level: 1 }],
          },
          {
            type: 'giveCombatExp',
            amount: 700,
            reason: '习得《大力金刚指》，于巩县石窟一指点穿乌金护心铜镜击溃铁尸尊者并救下满窟石匠',
          },
          { type: 'addSectContribution', amount: 240 },
          {
            type: 'modifyChivalry',
            delta: 30,
            reason: '驰援巩县石窟击溃黑教毁佛狂人铁尸尊者，救下六十余名无辜石匠',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_aftermath', op: 'eq', value: 'donate' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 25, reason: '倾囊捐银重修巩县石窟并安置受伤石匠' },
              { type: 'modifyRenown', delta: 40, reason: '巩县石窟破镜伏魔、捐银修窟，侠名传遍河洛' },
            ],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q23_tactic', op: 'eq', value: 'preach' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 18 },
          { type: 'completeQuest', questId: SHAOLIN_Q23_QUEST_ID, outcome: 'completed' },
          toast(
            '【金刚怒目 · 碎石成粉】圆满完成！习得《大力金刚指》，实战经验 +700、贡献 +240、侠义 +30、经义 +1！',
            'success',
            '金刚怒目',
          ),
        ],
      },
    ],
  },
}
