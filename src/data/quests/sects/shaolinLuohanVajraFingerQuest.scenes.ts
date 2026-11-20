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

function buildIronCorpseBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ23_IRON_CORPSE',
    name: '铁尸尊者',
    title: '塞外黑教 · 横练炼体狂人',
    realm: '一流中品',
    factionId: 'SECT-21',
    factionName: '塞外黑教',
    sectRank: 3,
    sectRankLabel: '炼体狂僧',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“哈哈哈！老夫横练铁尸金身三十年，胸前更有天外乌金护心镜！刀枪不入、水火不侵，你这少林秃驴拿什么破我金身！”',
    stats: { hp: 3560, mp: 2050, agi: 66, res: 72 },
    talents: { bone: 94, comprehension: 72, charm: 34 },
    equippedArts: {
      neigong: 'MA-080',
      qinggong: 'MA-158',
      move1: 'MA-046',
      move2: 'MA-106',
    },
    learnedArts: [
      { artId: 'MA-080', level: 8 },
      { artId: 'MA-158', level: 6 },
      { artId: 'MA-046', level: 8 },
      { artId: 'MA-106', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq23_01: {
    id: 'scene_slq23_01',
    title: '第一幕 · 十载木桩',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('{reignYear}孟春，嵩山冰消雪融。你拜入少林倏忽已满十载三千六百五十日，当年初入罗汉堂时连闯都觉吃力的【十八铜人木桩廊】，如今踏步其间已是举重若轻。'),
      N('廊尽头青石台畔，铁掌禅师玄痛正负手而立，身旁案上摆着三块寸许厚的嵩山青花岗石板；玄苦师伯亦在一旁静坐拨珠，显然早有安排。'),
      P('（合十肃立）“弟子拜见玄痛师伯、玄苦师伯！不知二位师伯召弟子来木桩廊，可是有罗汉堂至刚绝学相授？”'),
    ],
    onFinishEffects: [openScene('scene_slq23_02', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_02: {
    id: 'scene_slq23_02',
    title: '第二幕 · 二老合授',
    subtitle: '十八铜人木桩廊 · 论指破坚',
    mandatory: true,
    beats: [
      S('NPC-0156', '（目光锐利如锥，沉声开口）“阿弥陀佛！师侄已得玄苦师兄《燃木刀法》真传，外门兵刃可谓刚猛无双。然而行走江湖，总有兵刃脱手、或遇横练铁布衫金钟罩之辈之时——今日老衲便与玄苦师兄合授你罗汉堂另一门镇堂绝艺：《大力金刚指》！”'),
      S('NPC-0126', '（含笑补充）“《燃木刀法》是散阳刚于八尺刀风，《大力金刚指》则是聚千钧佛力于一指寸尖！一散一聚，方成罗汉堂无上刚猛大道！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_03', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_03: {
    id: 'scene_slq23_03',
    title: '第三幕 · 凌空碎石',
    subtitle: '十八铜人木桩廊 · 金刚指威',
    mandatory: true,
    beats: [
      N('玄痛不再多言，右手中指与食指并拢微微一屈，隔着三尺距离朝案上那三块重叠的嵩山青花岗石板轻轻一点！'),
      N('“啵——”一声极其沉闷的脆响，三块青石并未四分五裂，却在指风透入的刹那齐齐化作一滩细白石粉，顺着石案簌簌滑落！'),
      P('（震撼赞叹）“三尺之外隔空碎石成粉，且石案本身丝毫无损！这便是《大力金刚指》『力透一点、摧坚无痕』的境界么！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_04', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_04: {
    id: 'scene_slq23_04',
    title: '第四幕 · 笔锋入指',
    subtitle: '十八铜人木桩廊 · 经书证武',
    mandatory: true,
    beats: [
      S('NPC-0156', '“你书法已逾六十，可知颜真卿楷书『锥画沙、印印泥』之妙？《大力金刚指》运劲便如铁画银钩，全身内力循肩、肘、腕三节层层压缩，至指尖一寸方轰然透发！”'),
      S('NPC-0126', '“更须记住：金刚怒目，原为降伏四魔！若无七十六分经义定住心猿，指力越刚猛，越易反折己指。你试着以中宫真气贯指，点向这根熟铁木桩！”'),
    ],
    onFinishEffects: [teachArtNow('MA-044'), openScene('scene_slq23_05', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_05: {
    id: 'scene_slq23_05',
    title: '第五幕 · 铁桩留痕',
    subtitle: '十八铜人木桩廊 · 凝劲初成',
    mandatory: true,
    beats: [
      N('你依二老指点沉气收肘，将十年少林纯阳内力尽数压缩至右手中指，低喝一声疾点包铁木桩！'),
      N('“咔嚓！”熟铁包皮竟应指凹陷半寸，桩身剧烈震颤，细碎木屑自背面迸出！玄痛与玄苦对视一眼，齐齐颔首赞许。'),
    ],
    onFinishEffects: [openScene('scene_slq23_06', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_06: {
    id: 'scene_slq23_06',
    title: '第六幕 · 巩县急报',
    subtitle: '十八铜人木桩廊 · 邪僧毁窟',
    mandatory: true,
    beats: [
      N('正演练间，一名满身尘土的巩县石窟寺知客僧跌跌撞撞奔入廊内，噗通跪倒在玄痛脚下，声泪俱下！'),
      N('那僧人泣诉道：“玄痛大师救命！巩县北魏石窟寺昨日闯入一名塞外黑教炼体狂人，自号【铁尸尊者】！此獠身披一面厚达两寸的乌金护心铜镜，一身黑教横练功法刀剑难伤，砸毁十余尊百年石佛不说，还将满窟六十余名修佛石匠尽数锁在千佛洞中，扬言明日午时若少林不敢派高手接战，便要活活塌窟活埋所有石匠！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_07', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_07: {
    id: 'scene_slq23_07',
    title: '第七幕 · 金刚怒目',
    subtitle: '十八铜人木桩廊 · 破镜重任',
    mandatory: true,
    beats: [
      S('NPC-0156', '（怒眉倒竖，须发微张）“岂有此理！巩县石窟乃北魏以来五百年佛门圣迹，石匠更是无辜良民，黑教狂人竟敢行此灭绝人性之举！玄苦师兄近日旧伤未愈，寺中戒律堂亦须老衲坐镇……”'),
      P('（上前一步，双目灼灼）“二位师伯不必劳烦！弟子方承《大力金刚指》绝艺，正该以那铁尸尊者的横练金身与乌金护心铜镜试我金刚指力！请命弟子立刻驰援巩县石窟！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_08', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_08: {
    id: 'scene_slq23_08',
    title: '第八幕 · 领命驰援',
    subtitle: '十八铜人木桩廊',
    mandatory: true,
    beats: [
      S('NPC-0156', '（重重拍你肩头）“好！去吧！那铁尸尊者乃一流中品炼体狂人，气血浑厚、护甲极坚，唯有凝劲一点的《大力金刚指》能破其罩门！切记保重满窟石匠性命！”'),
    ],
    choices: [
      {
        id: 'slq23_accept_rescue',
        label: '领命接下【金刚怒目 · 碎石成粉】，火速驰援巩县石窟',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q23_QUEST_ID, stepId: 'gongxian_grotto_rescue' },
          setStep(SHAOLIN_Q23_QUEST_ID, 'gongxian_grotto_rescue'),
          openScene('scene_slq23_09', SHAOLIN_Q23_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq23_09: {
    id: 'scene_slq23_09',
    title: '第九幕 · 疾驰伊洛',
    subtitle: '巩县石窟道 · 浓烟蔽日',
    mandatory: true,
    beats: [
      N('你施展《一苇渡江》日夜兼程，赶在次日巳时末抵达伊洛河畔的巩县石窟寺！远远便见山崖石窟前浓烟滚滚，几尊石雕力士已被砸得碎石满地，数十名浑身捆绑的石匠正被几名黑教恶徒驱赶至千佛洞口！'),
    ],
    onFinishEffects: [openScene('scene_slq23_10', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_10: {
    id: 'scene_slq23_10',
    title: '第十幕 · 千佛洞前',
    subtitle: '巩县石窟 · 狂人肆虐',
    illustrationUrl: '/assets/quests/sl_23_gongxian_grotto.jpg',
    illustrationCaption: '巩县石窟 · 夕照残窟下，铁尸尊者胸悬乌金护心铜镜，狂笑欲毁北魏千佛石像与满窟石匠',
    mandatory: true,
    beats: [
      N('只见千佛洞前巨石之上，矗立着一名身高八尺、肤色青黑如生铁的魁梧邪僧！他赤裸上身，胸口以粗铁链悬着一面黑沉沉的厚重乌金护心铜镜，双掌泛着骇人的暗灰铁泽，正是塞外黑教狂人【铁尸尊者】！'),
      S(SPEAKER_OLD_MASON, '（满脸血污，泣声呼救）“阿弥陀佛！少林高僧来了！快救救这窟里几十号老少石匠和五百年的古佛啊！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_11', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_11: {
    id: 'scene_slq23_11',
    title: '第十一幕 · 狂人叫阵',
    subtitle: '巩县石窟 · 铁身傲世',
    mandatory: true,
    beats: [
      S(SPEAKER_IRON_CORPSE, '（见你单身赶来，放声狂笑）“哈哈哈！少林寺果然没人了，竟只派一个乳臭未干的小辈来送死！你瞧瞧这面乌金护心镜——寻常刀剑劈上去只剩一溜火星！你要是能伤老夫半根汗毛，这满窟泥腿子老夫立刻放人！”'),
      P('（目光森冷，步步踏前）“佛门慈悲，亦有金刚怒目！你毁古佛、虐良民，罪孽深重！今日贫僧便以少林《大力金刚指》，碎你乌金铜镜、破你铁尸邪功！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_12', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_12: {
    id: 'scene_slq23_12',
    title: '第十二幕 · 救匠先机',
    subtitle: '巩县石窟 · 震散恶徒',
    mandatory: true,
    beats: [
      N('你身形一晃如青烟掠过洞口，趁铁尸尊者狂笑大意之际，连弹数道劲风震断石匠身旁看守恶徒的兵刃，将那群黑教小卒齐齐掀翻出三丈开外！'),
      N('老石匠趁机护着几名年幼学徒缩入石窟深处避险，而铁尸尊者见状暴怒如雷，双足踏碎青石，如一头狂暴铁犀般朝你猛扑过来！'),
    ],
    onFinishEffects: [openScene('scene_slq23_13', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_13: {
    id: 'scene_slq23_13',
    title: '第十三幕 · 金身硬撼',
    subtitle: '巩县石窟 · 铁掌压顶',
    mandatory: true,
    beats: [
      N('铁尸尊者一记《铁掌功》挟着呼啸恶风当头砸下，石屑纷飞！你侧步避开锋芒，心知此人横练气血深厚无比，寻常拳脚难以破防，唯有寻机以《大力金刚指》直捣其胸前乌金护心铜镜！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q23_grotto_reached', value: true },
      openScene('scene_slq23_14', SHAOLIN_Q23_QUEST_ID),
    ],
  },

  scene_slq23_14: {
    id: 'scene_slq23_14',
    title: '第十四幕 · 窟前决战',
    subtitle: '巩县石窟 · 决战铁尸尊者',
    mandatory: true,
    beats: [
      N('千佛洞前尘烟滚滚！一流中品黑教炼体狂人铁尸尊者铁掌铁线拳交替猛攻，每一击皆重逾千钧！立刻迎战，以刚克刚破其铁尸金身！'),
    ],
    choices: [
      {
        id: 'slq23_fight_iron_corpse',
        label: '运起《大力金刚指》，力战黑教炼体狂人【铁尸尊者】（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q23_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronCorpseBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            introText: '巩县石窟佛前决战！铁尸尊者横练防御极高，务必稳守反击、寻找破绽一举击穿其乌金护心铜镜！',
            onWin: [openScene('scene_slq23_15', SHAOLIN_Q23_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '险些被铁尸尊者的狂暴铁掌震伤！调息后可再于【十八铜人木桩廊】动身续战铁尸尊者。',
                'warn',
                '巩县石窟',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq23_15: {
    id: 'scene_slq23_15',
    title: '第十五幕 · 气门微露',
    subtitle: '巩县石窟 · 凝指蓄势',
    mandatory: true,
    beats: [
      N('激斗四十余合，铁尸尊者仗着横练功法硬吃了你十余记重击，虽仍凶焰滔天，呼吸却已明显粗重！你骤然察觉，他每次收掌换气之时，胸口乌金护心铜镜正中那处微凸的莲花铆钉，正是其全身铁布衫气门的汇集之所！'),
      P('（心中雪亮，低喝一声）“找到你的罩门了！《大力金刚指》——碎石成粉！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_16', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_16: {
    id: 'scene_slq23_16',
    title: '第十六幕 · 一指穿镜',
    subtitle: '巩县石窟 · 乌金崩裂',
    illustrationUrl: '/assets/quests/sl_23_shatter_mirror.jpg',
    illustrationCaption: '一指穿镜 · 金光凝于指尖一线，你以《大力金刚指》正面洞穿铁尸尊者胸前两寸厚的乌金护心铜镜',
    mandatory: true,
    beats: [
      N('你身形借《一苇渡江》贴地疾滑，险之又险避开铁尸尊者当胸一抓，右手食中二指并如金刚铁锥，将十年纯阳真气尽数压缩于指尖一点，狠狠点中乌金护心铜镜正中！'),
      N('“锵——咔嚓！！”一声裂帛般的金铁爆鸣震彻山谷！那面号称刀枪不入的两寸厚乌金护心铜镜竟被你一指洞穿，蛛网裂纹瞬间炸开成十余块碎铁飞溅！狂暴指劲透镜而入，直接震散了铁尸尊者苦修三十年的横练气门！'),
    ],
    onFinishEffects: [openScene('scene_slq23_17', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_17: {
    id: 'scene_slq23_17',
    title: '第十七幕 · 狂人伏诛',
    subtitle: '巩县石窟 · 邪徒溃散',
    mandatory: true,
    beats: [
      S(SPEAKER_IRON_CORPSE, '（口喷鲜血，踉跄倒退数步，满脸骇然）“不……不可能！天外乌金镜……竟被你一根手指点穿了……少林《大力金刚指》……名不虚传……”'),
      N('铁尸尊者轰然跪倒在地，一身横练硬功尽数泄气，再无反抗之力！其余黑教恶徒见首领败北，顿时作鸟兽散，尽数被闻讯赶来的巩县衙役与石窟僧众擒拿！'),
    ],
    onFinishEffects: [openScene('scene_slq23_18', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_18: {
    id: 'scene_slq23_18',
    title: '第十八幕 · 满窟生春',
    subtitle: '巩县石窟 · 石匠叩谢',
    illustrationUrl: '/assets/quests/sl_23_save_masons.jpg',
    illustrationCaption: '救护石匠 · 夕阳余晖洒满北魏千佛石窟，获救的六十余名石匠与僧众齐齐向你合十跪谢',
    mandatory: true,
    beats: [
      N('你亲手解开老石匠与众匠人的绳索。六十余名劫后余生的石匠老少相拥而泣，随后齐齐面向你跪倒叩首！'),
      S(SPEAKER_OLD_MASON, '“多谢少林活菩萨救命之恩！这五百年的千佛石窟与我等几十户人家的性命，全赖大师金刚一指护全啊！”'),
      P('（连忙一一扶起众人，温言抚慰）“阿弥陀佛！护持佛迹、救助苍生乃少林弟子本分，诸位快快请起，安心修缮佛像便是！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_19', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_19: {
    id: 'scene_slq23_19',
    title: '第十九幕 · 凯旋返山',
    subtitle: '巩县石窟 · 启程回寺',
    mandatory: true,
    beats: [
      N('将废去邪功的铁尸尊者移交巩县官府严加看押后，你拾起半块被指劲洞穿的乌金碎镜作为凭证，辞别依依不舍的石匠乡亲，踏上返回嵩山少林寺的山道。'),
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

  scene_slq23_20: {
    id: 'scene_slq23_20',
    title: '第二十幕 · 碎镜呈验',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('回到十八铜人木桩廊，玄痛与玄苦早已闻讯相迎。你将那块中心留着一道浑圆指洞的两寸厚乌金碎镜双手呈上，细述巩县石窟破镜救匠经过。'),
      S('NPC-0156', '（接过乌金碎镜仔细摩挲指洞边缘，爽朗大笑）“好！好一个『金刚怒目、碎石成粉』！两寸乌金一指洞穿，既降了黑教狂魔，又救了六十余名无辜石匠，这才是少林罗汉堂真传应有的侠义担当！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_21', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_21: {
    id: 'scene_slq23_21',
    title: '第二十一幕 · 罗汉圆满',
    subtitle: '十八铜人木桩廊 · 真传大成',
    mandatory: true,
    beats: [
      S('NPC-0156', '“自今日起，你于罗汉堂《燃木刀法》与《大力金刚指》两大绝技皆已登堂入室，外刚内慈、刀指双绝！这卷《大力金刚指》完整心法与指诀，便正式归你执掌！”'),
      P('（躬身大礼拜谢）“多谢玄痛师伯、玄苦师伯十载栽培！弟子必以金刚指力守护天下苍生，不坠少林罗汉堂百年威名！”'),
    ],
    onFinishEffects: [openScene('scene_slq23_22', SHAOLIN_Q23_QUEST_ID)],
  },

  scene_slq23_22: {
    id: 'scene_slq23_22',
    title: '第二十二幕 · 金刚无畏',
    subtitle: '嵩山少林寺 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('春风拂过罗汉堂木桩廊，铜铃清响。历经十载苦修，你已走完罗汉堂真传单脉的全部试炼，手握燃木戒刀、指蕴金刚佛力，真正跻身中原武林一流中品绝顶高手之列！'),
    ],
    choices: [
      {
        id: 'slq23_complete',
        label: '习得《大力金刚指》，圆满完成【金刚怒目 · 碎石成粉】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-044', level: 1 },
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
          { type: 'modifySkill', key: '经义', delta: 1 },
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
