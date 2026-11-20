import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q24_QUEST_ID } from './shaolinDamoSwordMasterQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq24_01: {
    id: 'scene_slq24_01',
    title: '第一幕 · 绝壁剑痕',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}深冬，嵩山云海翻涌。你入寺已满七载，奉达摩院伏魔首座玄难之命，携一柄寻常青竹剑登上后山绝巅的【绝壁石刻 · 剑痕崖】。'),
      N('崖壁如削，北风猎猎。石洞深处，一块青灰巨岩上隐隐映着一道盘膝静坐的人形淡墨石影，传说正是初祖达摩当年面壁九年精气所凝；而石影四周，更纵横交错着历代少林高僧以指代剑刻下的三十六道深浅剑痕。'),
      S('NPC-0127', '（负手立于崖畔，僧袍猎猎）“阿弥陀佛！师侄昔年于寒玉榻前守卫玄澄师兄，已见禅定之功。今日老衲带你登剑痕崖，乃是为传你达摩院剑道绝学——《达摩剑法》！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_02', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_02: {
    id: 'scene_slq24_02',
    title: '第二幕 · 不立文字',
    subtitle: '绝壁石刻 · 玄难点拨',
    mandatory: true,
    beats: [
      S('NPC-0127', '“常人练剑，总记着刺、挑、抹、撩的死招式；可禅宗讲『不立文字，直指人心』。这《达摩剑法》原本没有固定谱录，全在这面壁石影与三十六道剑痕之中。”'),
      P('（凝望绝壁石影，若有所思）“弟子明白了！玄难师伯是要弟子于此洞中静观石影，以自身经义与书法笔意，自行印证《达摩剑法》？”'),
      S('NPC-0127', '（颔首微笑）“正是！老衲给你三昼夜时间，不许进食、不许起坐。三日后若能以手中青竹剑刺破云海而不惊飞鸟，便算初得达摩剑意！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_03', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_03: {
    id: 'scene_slq24_03',
    title: '第三幕 · 第一昼夜',
    subtitle: '达摩石洞 · 枯坐观影',
    mandatory: true,
    beats: [
      N('玄难转身下崖而去。你盘膝坐于石洞冰冷的青岩之上，将青竹剑横放双膝，摒弃杂念凝望初祖石影。'),
      N('第一昼夜，寒风透骨，石影只是一团斑驳淡墨，三十六道剑痕也杂乱无章，你心头几度浮躁，只得默诵《楞伽经》与《金刚经》镇定心神。'),
    ],
    onFinishEffects: [openScene('scene_slq24_04', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_04: {
    id: 'scene_slq24_04',
    title: '第四幕 · 第二昼夜',
    subtitle: '达摩石洞 · 笔意通剑',
    mandatory: true,
    beats: [
      N('第二昼夜月升东峰，清冷月光斜射入洞，恰好照亮绝壁上那三十六道剑痕。你忽觉眼前景象一变——那些剑痕起笔藏锋、收笔回环，竟与自己潜修多年的王右军行草笔势暗暗契合！'),
      P('（心中一震）“妙极！原来这三十六道剑痕并非各自孤立，而是连绵不绝的一篇《心经》狂草！每一转折皆含攻守生克之变！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_05', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_05: {
    id: 'scene_slq24_05',
    title: '第五幕 · 第三昼夜',
    subtitle: '达摩石洞 · 剑化禅机',
    illustrationUrl: '/assets/quests/sl_24_damo_shadow.jpg',
    illustrationCaption: '面壁悟剑 · 达摩石洞清辉如水，你观初祖石影三昼夜豁然顿悟，青竹剑光如禅影流转',
    mandatory: true,
    beats: [
      N('第三昼夜黎明将至，朝霞微露。刹那间，石洞中的达摩石影仿佛活了过来，与绝壁三十六道剑痕融为一体！你手中青竹剑不知不觉随心而动，在洞中缓缓划出一道圆融无瑕的弧光！'),
      N('剑尖所过之处，山洞尘埃竟纹丝不动，剑气却凝练如实质！『一花开五叶，结果自然成』——少林七十二绝技之《达摩剑法》，终在这一刻于你灵台豁然贯通！'),
    ],
    onFinishEffects: [teachArtNow('MA-048'), openScene('scene_slq24_06', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_06: {
    id: 'scene_slq24_06',
    title: '第六幕 · 竹剑试云',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你长身而起，步出石洞立于剑痕崖畔。面对脚下翻滚云海，手腕轻抖，一招「初祖西来」随手刺出——青竹剑尖青芒吞吐，竟将三尺外一团流云悄无声息切作两半，而停在崖边松枝上的两只寒雀竟毫无所觉！'),
    ],
    onFinishEffects: [openScene('scene_slq24_07', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_07: {
    id: 'scene_slq24_07',
    title: '第七幕 · 怪声破静',
    subtitle: '绝壁石刻 · 突来不速客',
    mandatory: true,
    beats: [
      N('就在你收剑合十之际，崖壁下方的险峻松林中忽然传来一声阴阳怪气的朗笑！'),
      S('NPC-0213', '“非也，非也！世人都说少林《达摩剑法》凌厉无双，今日一见，原来不过是拿根破竹竿儿切切云雾、哄哄麻雀罢了！”'),
      S('NPC-0214', '“哈哈哈！包三哥说得太损啦！不过这小和尚方才那一剑连鸟都没惊动，内劲藏得够深，风某手痒得很，正好上来跟他打上一架！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_08', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_08: {
    id: 'scene_slq24_08',
    title: '第八幕 · 姑苏双将',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('话音未落，两道矫健身影已如大鸟般自百丈绝壁攀援跃上剑痕崖！左边那人身穿青衫、面瘦唇薄、满脸倨傲，正是姑苏慕容氏「非也先生」【包不同】；右边那人满脸虬髯、腰佩厚背长刀、神色狂热好战，正是「一阵风」【风波恶】！'),
      P('（眉头一皱，横竹剑于胸前）“阿弥陀佛！此乃少林达摩院禁地剑痕崖，姑苏慕容氏两位施主不告而入、窥伺本寺绝学，未免有失江南名门体统！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_09', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_09: {
    id: 'scene_slq24_09',
    title: '第九幕 · 唇枪舌剑',
    subtitle: '绝壁石刻 · 非也之辩',
    mandatory: true,
    beats: [
      S('NPC-0213', '（摇头晃脑，强词夺理）“非也，非也！天下名山天下人登得，怎的嵩山少室便只许和尚看、不许江南客看？再说了，我姑苏慕容氏素有『以彼之道，还施彼身』之名，来瞧瞧少林《达摩剑法》有甚稀奇，算不得偷窥！”'),
      S('NPC-0214', '（早已按捺不住，“锵”地拔出腰间长刀）“包三哥别跟他嚼舌根了！小和尚，听说你是达摩院新晋真传，接风某几招《狂风快刀》试试！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_10', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_10: {
    id: 'scene_slq24_10',
    title: '第十幕 · 以竹代剑',
    subtitle: '绝壁石刻 · 禅心不动',
    mandatory: true,
    beats: [
      P('（微微一笑，举起手中青竹剑）“二位施主既执意在达摩初祖崖前切磋，贫僧便以这柄青竹剑领教姑苏慕容高招。只是刀剑无眼，若二位佩刀落地，还请即刻下山，莫再扰我达摩院清静！”'),
      S('NPC-0213', '（冷笑拔出随身短刀）“非也，非也！一根青竹竿也想挑落我兄弟二人佩刀？风四弟，莫要轻敌，咱俩联手教训教训这不知天高地厚的小和尚！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_11', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_11: {
    id: 'scene_slq24_11',
    title: '第十一幕 · 崖巅迎战',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('云海翻腾，剑痕崖风声大作！包不同与风波恶一左一右散开身形，刀光剑影顿时封死你周身退路！'),
    ],
    choices: [
      {
        id: 'slq24_accept_duel',
        label: '稳持青竹剑立于剑痕崖，开启【面壁九年 · 剑化禅机】1v2 截客之战',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q24_QUEST_ID, stepId: 'cliff_duel_murong' },
          setStep(SHAOLIN_Q24_QUEST_ID, 'cliff_duel_murong'),
          openScene('scene_slq24_12', SHAOLIN_Q24_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq24_12: {
    id: 'scene_slq24_12',
    title: '第十二幕 · 狂风袭崖',
    subtitle: '剑痕崖 · 风波恶抢攻',
    mandatory: true,
    beats: [
      N('风波恶大喝一声率先发难，长刀挟着狂风怒卷而来，一连七刀快如疾风骤雨，刀刀不离你咽喉与肩井！'),
      N('你足踏《一苇渡江》微步轻挪，青竹剑顺着风波恶刀背轻轻一引一贴，竟如春风拂柳般将七记刚猛快刀尽数化偏！'),
    ],
    onFinishEffects: [openScene('scene_slq24_13', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_13: {
    id: 'scene_slq24_13',
    title: '第十三幕 · 诡刀夹击',
    subtitle: '剑痕崖 · 包不同偷袭',
    mandatory: true,
    beats: [
      N('就在你化开风波恶刀势的一瞬，包不同鬼魅般欺近左侧，手中短刀刁钻狠辣地斜刺你肋下空门，嘴里还不停叫嚷：“非也，非也！你只顾防风四弟，却漏了包三爷！”'),
      N('危急之际，你心中空明澄澈，脑海闪过绝壁三十六道剑痕中『回峰转折』一笔，青竹剑反腕一抖，剑脊精准点在包不同手腕麻筋之上，逼得他怪叫一声急忙撤刀！'),
    ],
    onFinishEffects: [openScene('scene_slq24_14', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_14: {
    id: 'scene_slq24_14',
    title: '第十四幕 · 双将合璧',
    subtitle: '剑痕崖 · 慕容绝艺',
    mandatory: true,
    beats: [
      S('NPC-0214', '（眼中狂热更盛，哈哈大笑）“痛快！痛快！果然是个真高手！包三哥，咱们莫留手，用慕容家压箱底的刀剑合击之势！”'),
      S('NPC-0213', '（脸色微变，亦收起轻视之心）“非也，非也！这小和尚的《达摩剑法》已有大家气象，风四弟小心他剑中藏柔劲！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_15', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_15: {
    id: 'scene_slq24_15',
    title: '第十五幕 · 一剑当关',
    subtitle: '剑痕崖 · 禅机渐显',
    mandatory: true,
    beats: [
      N('包不同、风波恶二人不再留手，一诡一猛、一快一奇，联手之威竟隐隐媲美一流中品绝顶高手！你立于达摩石洞之前，青竹剑斜指苍穹，禅心古井无波，准备以一敌二力挫双将！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q24_murong_arrived', value: true },
      openScene('scene_slq24_16', SHAOLIN_Q24_QUEST_ID),
    ],
  },

  scene_slq24_16: {
    id: 'scene_slq24_16',
    title: '第十六幕 · 独斗双将',
    subtitle: '绝壁石刻 · 车轮连战 决战包风',
    mandatory: true,
    beats: [
      N('剑痕崖上罡风呼啸！姑苏慕容家将包不同与风波恶联手猛扑而上，立刻以新悟之《达摩剑法》迎战二人，挑落其佩刀！'),
    ],
    choices: [
      {
        id: 'slq24_fight_bao_feng',
        label: '剑化禅机，车轮连战 力战慕容家将【包不同】与【风波恶】',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q24_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0213',
              talkOverride:
                '“非也，非也！少林《达摩剑法》虽妙，却也未必胜过我姑苏慕容家刀剑合璧！风四弟，咱俩一齐上，瞧瞧这小和尚有几分火候！”',
            },
            extraOpponents: [
              {
                kind: 'npc',
                npcId: 'NPC-0214',
                talkOverride:
                  '“好哇好哇！风某平生最爱跟绝顶高手打架！这剑痕崖风大地方宽，正是放手一战的好去处！看刀！”',
              },
            ],
            rule: 'story_trial',
            duelStakesTag: 'spar',
            introText: '剑痕崖绝巅 车轮连战 激战！包不同招式刁钻、风波恶快刀如狂风，务必以《达摩剑法》圆融禅意逐个击破！',
            onWin: [openScene('scene_slq24_17', SHAOLIN_Q24_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '包不同与风波恶联手合击极为凌厉！调息后可再于【绝壁石刻 · 剑痕崖】续战二人。',
                'warn',
                '剑痕截客',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq24_17: {
    id: 'scene_slq24_17',
    title: '第十七幕 · 禅影叠锋',
    subtitle: '剑痕崖 · 破局一剑',
    mandatory: true,
    beats: [
      N('激斗三十余合，包不同与风波恶越攻越急，反而露出了配合间隙！你眼神一亮，青竹剑猛然划出一记圆弧，将《达摩剑法》「一苇渡江」「面壁九年」「只履西归」三式连环贯通！'),
      N('剑光看似缓慢，实则封死了二人所有变招方位！青竹剑尖先后在风波恶刀锷与包不同虎口轻轻一挑一震——'),
    ],
    onFinishEffects: [openScene('scene_slq24_18', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_18: {
    id: 'scene_slq24_18',
    title: '第十八幕 · 一剑挑双刀',
    subtitle: '剑痕崖 · 双刀落地',
    illustrationUrl: '/assets/quests/sl_24_bao_feng_duel.jpg',
    illustrationCaption: '剑化禅机 · 绝壁云海之上，你以一柄青竹剑独斗慕容双将，一剑圆融挑落包不同与风波恶手中佩刀',
    mandatory: true,
    beats: [
      N('“当啷！当啷！”两声清脆金铁撞击几乎同时响起！风波恶的长刀与包不同的短刀竟被一根寻常青竹剑齐齐震脱掌心，斜插在三步外的青石缝中嗡嗡作响！'),
      N('包不同与风波恶同时愣在原地，虎口微微发麻，看着你手中完好无损的青竹剑，一时竟说不出半句话来！'),
    ],
    onFinishEffects: [openScene('scene_slq24_19', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_19: {
    id: 'scene_slq24_19',
    title: '第十九幕 · 心服下山',
    subtitle: '剑痕崖 · 慕容双将退走',
    mandatory: true,
    beats: [
      S('NPC-0214', '（先是一愣，旋即拍腿大笑，满眼佩服）“好剑法！好禅机！以一根青竹剑挑落咱兄弟俩的钢刀，风某输得心服口服！小师父，改日到了江南燕子坞，风某请你喝最好的碧螺春！”'),
      S('NPC-0213', '（嘴硬地哼了一声，却也老老实实拔起佩刀抱拳一礼）“非也，非也……今日是包某轻敌，算你少林《达摩剑法》略胜半筹！风四弟，走吧，免得玄难老和尚上来了唠叨！”'),
      N('说罢，二人倒也光棍，双双施展轻功纵跃下崖，片刻间便消失在云海松涛之中。'),
    ],
    onFinishEffects: [openScene('scene_slq24_20', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_20: {
    id: 'scene_slq24_20',
    title: '第二十幕 · 玄难登崖',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('双将方去不久，一阵朗笑自崖畔响起，伏魔首座玄难缓步踏云而来，显然早已在下方松林将方才一战尽收眼底！'),
      S('NPC-0127', '（抚掌大赞）“阿弥陀佛！老衲原本还担心姑苏慕容家将联手难缠，欲出手相助，却见师侄仅凭一根青竹剑便以《达摩剑法》挑落包、风二人佩刀！不伤人命而扬少林威仪，善哉！善哉！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_21', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_21: {
    id: 'scene_slq24_21',
    title: '第二十一幕 · 崖畔印禅',
    subtitle: '绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_24_cliff_zen.jpg',
    illustrationCaption: '崖畔禅心 · 云海松涛映朝霞，玄难首座于剑痕崖畔为你印证《达摩剑法》真传圆满',
    mandatory: true,
    beats: [
      N('朝阳彻底跃出云海，万道金光洒满剑痕崖与初祖石洞。玄难取出一卷封存已久的达摩院剑道总纲，亲手交予你。'),
      S('NPC-0127', '“三昼夜观石影而顿悟，复以实战挑落慕容双将佩刀，你已真正承继了达摩院《达摩剑法》之衣钵！日后无论手中执竹枝还是宝剑，只要心中有禅，万物皆可为剑！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_22', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_22: {
    id: 'scene_slq24_22',
    title: '第二十二幕 · 笔剑双修',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      P('（接过剑道总纲，向初祖石洞与玄难首座深深一揖）“多谢师伯引路点化！弟子经此三日悟剑，非但习得《达摩剑法》，连书法笔意与经义禅理亦觉得豁然贯通了一大截！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_23', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_23: {
    id: 'scene_slq24_23',
    title: '第二十三幕 · 暗流警醒',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '（神色微肃）“不过姑苏慕容氏家将竟敢公然登我剑痕崖窥剑，足见江湖暗流已日益汹涌。你既成达摩院剑道真传，日后仍须精进不懈，以备大变！”'),
    ],
    onFinishEffects: [openScene('scene_slq24_24', SHAOLIN_Q24_QUEST_ID)],
  },

  scene_slq24_24: {
    id: 'scene_slq24_24',
    title: '第二十四幕 · 剑心通明',
    subtitle: '嵩山少林寺 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('山风清越，青竹剑微鸣。你立于剑痕崖畔俯瞰云海，心中剑意如初祖石影般沉静浩瀚，正式踏上达摩院真传绝顶之路！'),
    ],
    choices: [
      {
        id: 'slq24_complete',
        label: '习得《达摩剑法》，圆满完成【面壁九年 · 剑化禅机】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-048', level: 1 },
          {
            type: 'giveCombatExp',
            amount: 650,
            reason: '于剑痕崖观初祖石影三昼夜悟得《达摩剑法》，1v2 挑落慕容家将包不同与风波恶佩刀',
          },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_Q24_QUEST_ID, outcome: 'completed' },
          toast(
            '【面壁九年 · 剑化禅机】圆满完成！习得《达摩剑法》，实战经验 +650、贡献 +220、书 +2、经义 +1、玄难好感 +20！',
            'success',
            '剑化禅机',
          ),
        ],
      },
    ],
  },
}
