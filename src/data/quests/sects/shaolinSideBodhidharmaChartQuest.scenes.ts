import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE18_QUEST_ID } from './shaolinSideBodhidharmaChartQuest'

const SPEAKER_KASYAPA_YOGI: StorySpeakerSpec = {
  kind: 'custom',
  name: '迦叶尊者',
  title: '天竺古瑜伽大宗师',
  factionName: '天竺那烂陀遗脉',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_BAHMAN_FIRE: StorySpeakerSpec = {
  kind: 'custom',
  name: '阿胡拉 · 巴赫曼',
  title: '波斯明火宗师',
  factionName: '波斯拜火圣坛',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

function buildKasyapaYogiBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS18_KASYAPA_YOGI',
    name: '迦叶尊者',
    title: '天竺古瑜伽大宗师',
    realm: '宗师中品',
    factionName: '天竺那烂陀遗脉',
    sectRank: 4,
    sectRankLabel: '瑜伽大宗师',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“达摩尊者本出自南天竺香至国！中土少林若真承初祖正脉，便以禅武破我天竺古瑜伽之柔印！”',
    stats: { hp: 5350, mp: 5180, agi: 84, res: 76 },
    talents: { bone: 93, comprehension: 95, charm: 78 },
    equippedArts: {
      neigong: 'MA-060',
      qinggong: 'MA-057',
      move1: 'MA-043',
      move2: 'MA-063',
      move3: 'MA-045',
    },
    learnedArts: [
      { artId: 'MA-060', level: 10 },
      { artId: 'MA-057', level: 9 },
      { artId: 'MA-043', level: 10 },
      { artId: 'MA-063', level: 9 },
      { artId: 'MA-045', level: 9 },
    ],
  })
}

function buildBahmanFireBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS18_BAHMAN_FIRE',
    name: '阿胡拉 · 巴赫曼',
    title: '波斯明火宗师',
    realm: '宗师中品',
    factionName: '波斯拜火圣坛',
    sectRank: 4,
    sectRankLabel: '明火宗师',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“圣火燃尽诸相！中土宗师，且看你少林禅功可挡得住我波斯明火连环烈焰！”',
    stats: { hp: 5480, mp: 5260, agi: 86, res: 75 },
    talents: { bone: 94, comprehension: 92, charm: 82 },
    equippedArts: {
      neigong: 'MA-038',
      qinggong: 'MA-022',
      move1: 'MA-019',
      move2: 'MA-052',
      move3: 'MA-046',
    },
    learnedArts: [
      { artId: 'MA-038', level: 10 },
      { artId: 'MA-022', level: 9 },
      { artId: 'MA-019', level: 9 },
      { artId: 'MA-052', level: 9 },
      { artId: 'MA-046', level: 9 },
    ],
  })
}

export const SHAOLIN_SIDE18_SCENES: Record<string, StorySceneDef> = {
  scene_sls18_01: {
    id: 'scene_sls18_01',
    title: '第一幕 · 秘档尘封',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，少室山云雾清凉。你应达摩院首座玄难与高僧玄渡之邀，踏入达摩面壁石洞东侧密禅室，共同清点自南北朝流传至今的初祖旧档。'),
      S('NPC-0127', '（玄难合十微笑，指向案上三只漆皮斑驳的樟木古匣）“阿弥陀佛。今年春雨绵长，密室微潮。你经义湛深、书法精绝，正可助我与玄渡师弟将这批五百年前的旧经轴逐一晾晒、重录目录。”'),
      S('NPC-0135', '（玄渡轻轻托起一卷沉香木轴芯，神色微动）“师兄且看，这支《楞伽经》旧轴沉重异常，敲之却似中空，轴端铜箍竟刻着南朝梁普通年间的古梵文暗记！”'),
      P('“梁普通年间——那岂非正是初祖菩提达摩泛海东渡、抵粤北上之岁？莫非轴芯之内另藏玄机！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_02', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_02: {
    id: 'scene_sls18_02',
    title: '第二幕 · 沉香藏卷',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('你凝神屏息，以寸劲轻旋沉香轴端铜箍。咔哒一声轻响，尘封五百余年的蜂蜡应手脱落，一卷柔韧泛黄、隐散异香的古老羊皮卷缓缓滑出轴芯！'),
      N('三人合力将羊皮古卷徐徐展平于青石长案之上。但见卷面以朱砂、青金石与墨汁绘就浩瀚沧海，星斗罗列、季风洋流纵横交错，一条细密朱线自南天竺香至国起航，经狮子国、三佛齐直抵南海广州，复折向北穿江过淮，最终停驻于中岳嵩山少室峰！'),
      S('NPC-0127', '（玄难倒吸一口凉气，声音微微发颤）“这……这是初祖菩提达摩当年泛海东渡三载亲手绘就的《沧海东渡遗图》！图角还题有初祖亲笔的梵汉双文海路禅偈！”'),
      S('NPC-0135', '“图中山川海潮笔势苍茫如龙蛇走壁，竟暗含行气呼吸之韵律！只是边角数行悉昙古梵文年深日久、字迹漫漶，须得移步藏经阁对照南北朝古译梵典方能彻底考释！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_03', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_03: {
    id: 'scene_sls18_03',
    title: '第三幕 · 禅偈初探',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('你凑近孤灯细察羊皮卷边缘的汉文题跋，以深厚书法造诣辨其运笔顿挫，缓缓吟出可辨之句：'),
      P('“『一苇浮沧海，万里渡迷津；风涛无定相，不动是吾心。』……玄难师兄、玄渡师兄，这不仅是航海海图，更是初祖在惊涛骇浪中观海悟禅的心印手迹！”'),
      S('NPC-0127', '“正是！此事干系本寺无上法脉，切不可走漏风声。你与玄渡师弟先携古卷往藏经阁正楼查阅古梵典考释全文，老衲留守达摩院加固密室禁制。”'),
    ],
    onFinishEffects: [openScene('scene_sls18_04', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_04: {
    id: 'scene_sls18_04',
    title: '第四幕 · 沧海遗图',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    illustrationUrl: '/assets/quests/sl_s18_sea_chart.jpg',
    illustrationCaption: '沧海遗图 · 达摩院孤灯展卷，初祖泛海东渡羊皮古图与海路禅偈重见天日',
    mandatory: true,
    beats: [
      N('石室青灯如豆，古老羊皮卷上青金石绘就的汪洋大海在烛光下泛起淡淡微芒，仿佛五百年前南海惊涛与初祖面壁清风正穿越时空扑面而来。'),
      S('NPC-0135', '“师弟，咱们即刻携此圣卷前往藏经阁正楼，务必赶在天明前将那段悉昙古梵文禅偈悉数破译！”'),
    ],
    choices: [
      {
        id: 'sls18_go_cangjing',
        label: '珍重卷起《沧海东渡遗图》，随玄渡前往藏经阁正楼考释梵偈',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE18_QUEST_ID, stepId: 'decipher_sutra_pavilion' },
          setStep(SHAOLIN_SIDE18_QUEST_ID, 'decipher_sutra_pavilion'),
          toast(
            '已发掘初祖《沧海东渡遗图》！请随玄渡前往【嵩山少林寺 · 少林藏经阁 · 经阁正楼（sl_cj_pavilion）】考释古梵禅偈。',
            'talk',
            '沧海遗图',
          ),
        ],
      },
    ],
  },

  scene_sls18_05: {
    id: 'scene_sls18_05',
    title: '第五幕 · 梵汉互参',
    subtitle: '嵩山少林寺 · 少林藏经阁正楼',
    mandatory: true,
    beats: [
      N('藏经阁正楼万卷环列，药香沉静。你与玄渡搬出梁代与唐初所译的古梵音义字典，伏案灯下逐字校勘。你以绝佳的经义底蕴与书法眼力，辨出初祖行草中隐去的古梵音韵，终将全篇禅偈补缀完备！'),
      P('“原来如此！这后半段古梵文译作汉言，乃是：『西天明月照东海，波斯圣火映雪峰；莫执孤舟争彼岸，万法同源一念空。』初祖当年泛海东渡时，途经南海番舶云集之地，曾与天竺瑜伽行者、波斯圣火祭司同舟论道！”'),
      S('NPC-0135', '（玄渡拍案惊叹）“妙极！原来初祖早在五百年前便写下『万法同源』之训！难怪这卷羊皮古图上除梵汉文字外，边角竟还留着一处波斯古火坛的星象徽记！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_06', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_06: {
    id: 'scene_sls18_06',
    title: '第六幕 · 金帖破空',
    subtitle: '嵩山少林寺 · 少林藏经阁正楼',
    mandatory: true,
    beats: [
      N('话音未落，窗外忽然掠过两道一柔一烈、惊世骇俗的异域罡风！“咄！”“咄！”两声轻响，一片鎏金贝叶与一枚赤铜圣火令竟穿透厚重窗棂，不偏不倚钉在藏经阁红漆梁柱之上，木屑未飞一星，劲力控制之精微已臻宗师化境！'),
      S('NPC-0135', '（玄渡脸色骤变，瞬息护在古卷之前）“好可怕的隔空劲力！何方高人夜探我少林藏经阁？！”'),
      N('窗外夜空早已不见人影，唯有一缕悠长低沉的梵唱与一声清越如火鸣的长啸自少室绝顶飘落，震得檐下铁马叮当作响。你拔下鎏金贝叶与赤铜圣火令，但见两物背面皆以工整汉楷刻着同一行字：'),
      N('「天竺那烂陀遗脉迦叶、波斯拜火圣坛巴赫曼，循五百年圣卷星象万里而来。明晨日出，恭候少林首座携《沧海遗图》登临少室绝顶万丈冰崖，以武印禅！」'),
    ],
    onFinishEffects: [openScene('scene_sls18_07', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_07: {
    id: 'scene_sls18_07',
    title: '第七幕 · 护卷之志',
    subtitle: '嵩山少林寺 · 少林藏经阁正楼',
    mandatory: true,
    beats: [
      N('玄难听闻异动迅速赶至藏经阁，看过两枚异域金帖，神色凝重万分。'),
      S('NPC-0127', '“阿弥陀佛。天竺那烂陀古瑜伽与波斯明火圣坛，皆是绝迹西域百年的化外奇门！观这两枚信物上残留的内劲，来者二人俱是宗师中品以上的绝顶人物！”'),
      S('NPC-0135', '“他们万里追寻初祖《沧海遗图》，显然各有所图——天竺僧人欲迎圣卷归西，波斯使者恐意在卷中星象火历！此乃我少林初祖镇山遗墨，岂能拱手让人？”'),
      P('（目光清朗，神色泰然如山）“玄难师兄、玄渡师兄不必忧心。初祖遗图既托于少林，便容不得外人强夺；然来者既递帖邀约『以武印禅』，而非宵小偷盗，便说明二人皆是重道求真的异域大宗师。”'),
    ],
    onFinishEffects: [openScene('scene_sls18_08', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_08: {
    id: 'scene_sls18_08',
    title: '第八幕 · 赴约冰崖',
    subtitle: '嵩山少林寺 · 少林藏经阁正楼',
    mandatory: true,
    beats: [
      P('“明日拂晓，弟子便独自登临少室绝顶万丈冰崖！先以少林禅武连战二位异域宗师，护住初祖原卷尊严；再以初祖『万法同源』之偈，令二人心服口服！”'),
      S('NPC-0127', '（玄难郑重拍了拍你肩头）“此去乃一对二之连战硬仗，切记不可逞匹夫之勇，须以禅定调息、借天地之势化彼奇功！我与玄渡在绝顶之下为师弟护法压阵！”'),
    ],
    choices: [
      {
        id: 'sls18_go_ice_cliff',
        label: '静坐养气至拂晓，经飞瀑深潭试炼涧登临少室绝顶万丈冰崖',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE18_QUEST_ID, 'cloud_sea_duel'),
          toast(
            '异域双尊已候于绝顶！请前往【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】攀崖赴约。',
            'talk',
            '沧海遗图',
          ),
        ],
      },
    ],
  },

  scene_sls18_09: {
    id: 'scene_sls18_09',
    title: '第九幕 · 绝顶云海',
    subtitle: '少室绝顶 · 万丈冰崖',
    mandatory: true,
    beats: [
      N('五更天色微明，你自飞瀑深潭试炼涧一掠而上，踏雪登临少室绝顶万丈冰崖。脚下茫茫云海翻涌如雪浪，东方天际正透出一线瑰丽金红。'),
      N('崖畔巨石之上，静静伫立着两位气度迥异却同样深不可测的异域宗师：左首是一位身披赭黄古僧袍、赤足踏冰却不染寒霜的天竺老僧；右首则是一位身着白底金纹长袍、眉宇如鹰、周身隐有炽热气浪蒸腾的波斯伟岸男子。'),
      S(SPEAKER_KASYAPA_YOGI, '（天竺老僧双手合十，汉话古雅沉缓）“那烂陀遗脉迦叶，见过少林首座。菩提达摩尊者本出南天竺王族，其《沧海遗图》载录天竺古禅正印。今日贫僧万里东来，愿试中土少林是否仍配执掌初祖圣卷！”'),
      S(SPEAKER_BAHMAN_FIRE, '（波斯宗师抚胸微躬，声若洪钟炽烈）“波斯圣坛使者阿胡拉·巴赫曼！当年达摩尊者东渡时，曾以我族星火海历定航。我二人今日轮番向阁下讨教——若阁下能连胜我二人，我等绝不再提带走原卷半字！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_10', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_10: {
    id: 'scene_sls18_10',
    title: '第十幕 · 天竺柔印',
    subtitle: '少室绝顶 · 万丈冰崖（第一战）',
    mandatory: true,
    beats: [
      P('（负手立于云海朝阳之前，袈裟猎猎作响，微笑合十）“阿弥陀佛。远来是客，二位大宗师既以武印禅，贫僧自当奉陪！请迦叶尊者先行赐教！”'),
      S(SPEAKER_KASYAPA_YOGI, '（赤足轻点冰面，身形骤然如无骨灵蛇般飘忽而起，双手结出奇异古佛印，一股绵密柔韧、似能吞纳万钧巨力的瑜伽禅劲弥漫绝顶）“善哉！请接贫僧天竺古瑜伽枯荣禅掌！”'),
    ],
    choices: [
      {
        id: 'sls18_fight_kasyapa',
        label: '稳守禅心，迎战天竺瑜伽大宗师「迦叶尊者」！（连战第一场 · 宗师中品）',
        subLabel: '对手：天竺瑜伽大宗师 · 迦叶尊者（宗师中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildKasyapaYogiBoss() },
            rule: 'spar',
            forbidEscapeReason: '云海绝顶以武印禅，关乎少林初祖正脉威仪，岂可退却！',
            introText: '【云海连战 · 第一场】于少室绝顶万丈冰崖，迎战天竺瑜伽大宗师【迦叶尊者】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls18_11', SHAOLIN_SIDE18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '迦叶尊者天竺古瑜伽柔劲奇诡难测，此战暂且惜败！请调息精进后再赴试炼涧冰崖重战！',
                'warn',
                '沧海遗图',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '与迦叶尊者旗鼓相当、难分伯仲！请调息后再赴试炼涧冰崖一决高下！',
                'warn',
                '沧海遗图',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls18_11: {
    id: 'scene_sls18_11',
    title: '第十一幕 · 禅破柔劲',
    subtitle: '少室绝顶 · 万丈冰崖',
    illustrationUrl: '/assets/quests/sl_s18_cloud_sea_duel.jpg',
    illustrationCaption: '云海日出 · 少室绝顶万丈冰崖，以少林绝学连战天竺与波斯异域双尊',
    mandatory: true,
    beats: [
      N('朝阳跃出云海，万道金光洒满万丈冰崖！迦叶尊者的古瑜伽身法柔若无骨，指掌化力玄妙异常，寻常刚猛招式打在他身上竟如泥牛入海。'),
      N('然你以少林禅武合一之境应对，刚中寓柔、动中含静，任他千变万化，你自以圆融无碍的佛门正劲步步封死其气机流转！百余合后，你一记轻描淡写的拈花虚点，恰点破他枯荣内息转换的刹那微瑕！'),
      S(SPEAKER_KASYAPA_YOGI, '（飘然退后三步，赤足落定冰崖，满眼震撼地合十低首）“妙哉！妙哉！以静制动、以禅化柔……五百年后，中土少林竟真将初祖心法参悟至此等化境！这一阵，贫僧输得心服口服！”'),
      N('你合十还礼，趁隙深深吐纳一口朝阳紫气，丹田真元顷刻充盈圆满。右侧那位波斯明火宗师眼中战意熊熊燃起，大步踏前！'),
    ],
    onFinishEffects: [openScene('scene_sls18_12', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_12: {
    id: 'scene_sls18_12',
    title: '第十二幕 · 波斯明火',
    subtitle: '少室绝顶 · 万丈冰崖（第二战）',
    mandatory: true,
    beats: [
      S(SPEAKER_BAHMAN_FIRE, '（双掌一合，白袍鼓荡如帆，脚下千年寒冰竟滋滋融作白雾）“痛快！迦叶尊者以柔见长，尚且折服于阁下禅武之下。现在，便请阁下接我波斯圣坛刚烈无俦的明火神功！”'),
      P('（气息归元，目光如电，笑声清朗回荡云海）“前番领教天竺古瑜伽之柔，今番再承波斯圣火之烈——能于一日之内与天下两大绝域宗师印证武道，实乃贫僧平生大幸！巴赫曼尊使，请！”'),
    ],
    choices: [
      {
        id: 'sls18_fight_bahman',
        label: '气贯长虹，再战波斯明火宗师「阿胡拉 · 巴赫曼」！（连战第二场 · 宗师中品）',
        subLabel: '对手：波斯明火宗师 · 阿胡拉 · 巴赫曼（宗师中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBahmanFireBoss() },
            rule: 'spar',
            forbidEscapeReason: '已胜迦叶尊者，正须再破波斯明火方能令异域双尊彻底心服！',
            introText: '【云海连战 · 第二场】朝阳云海之间，再战波斯明火宗师【阿胡拉 · 巴赫曼】！',
            onWin: [openScene('scene_sls18_13', SHAOLIN_SIDE18_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '巴赫曼波斯明火刀掌刚猛炽烈，第二战惜败！请调息后再赴试炼涧冰崖重战双尊！',
                'warn',
                '沧海遗图',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 50, mpPct: 50 },
              toast(
                '与巴赫曼大战百合难分胜负！请调息后再赴试炼涧冰崖决出高下！',
                'warn',
                '沧海遗图',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls18_13: {
    id: 'scene_sls18_13',
    title: '第十三幕 · 水火既济',
    subtitle: '少室绝顶 · 万丈冰崖',
    mandatory: true,
    beats: [
      N('巴赫曼身法诡谲如跃动火舌，双掌劈出的炽烈火焰刀气更似烈日焚空，将冰崖周围的晨雾瞬间蒸发殆尽！'),
      N('你身处漫天火浪之中，心中却如初祖禅偈所云「风涛无定相，不动是吾心」。你借先前与迦叶尊者交手体悟的借力化柔之妙，融入少林浑厚沉雄的护法正功，于烈焰最盛处反手画圆，竟将巴赫曼倾力劈出的三道火焰刀气凌空导引冲霄，在云海之上炸开一团绚烂金霞！'),
      N('巴赫曼收势不及，被你一掌虚按肩头三寸处，却只觉一股温润如春风的佛门真气拂去周身燥热，竟连半根毫毛也未曾损伤。'),
      S(SPEAKER_BAHMAN_FIRE, '（怔立半晌，忽而仰天大笑，朝你深深抚胸行波斯大礼）“以柔化刚，以静驭火，胜而不伤！中土少林武学博大精深，巴赫曼心悦诚服！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_14', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_14: {
    id: 'scene_sls18_14',
    title: '第十四幕 · 心海同源',
    subtitle: '少室绝顶 · 万丈冰崖',
    mandatory: true,
    beats: [
      N('云海翻腾，旭日高悬。迦叶尊者与巴赫曼尊使并肩向你致敬，二位远涉重洋的异域宗师再无半分争胜执念，唯有惜英雄重英雄的澄明欢喜。'),
      P('（从怀中取出两卷墨迹淋漓的宣纸手抄本，双手分呈二位宗师）“阿弥陀佛。初祖《沧海东渡遗图》原卷乃少林法脉见证，理当永镇少室；然初祖偈语有云：『西天明月照东海，波斯圣火映雪峰；莫执孤舟争彼岸，万法同源一念空。』”'),
      P('“昨夜贫僧已将卷中海路禅偈与星象原意亲笔临摹两份。法无东西，心海同源，这两卷抄本便赠予二位宗师带回天竺与波斯，以续五百年前同舟论道之缘！”'),
      S(SPEAKER_KASYAPA_YOGI, '（接过墨宝，见字迹苍劲雄浑、梵汉兼精，眼中热泪盈眶）“不执门户、弘法无私！达摩尊者东渡五百年，今日得见首座，方知正法果然大兴于震旦中土！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_15', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_15: {
    id: 'scene_sls18_15',
    title: '第十五幕 · 沧海送别',
    subtitle: '少室绝顶 · 万丈冰崖',
    mandatory: true,
    beats: [
      S(SPEAKER_BAHMAN_FIRE, '（珍重收好抄本，豪迈一笑）“今朝一战一偈，不虚万里东来！告辞了，少林大宗师，愿中原与西域星火长明！”'),
      N('天竺尊者与波斯尊使再度合十抚胸告别，随即展开绝世轻功，如双鹤掠云般沿绝壁飘然下山，很快消失在苍茫松海之中。'),
      N('你独立万丈冰崖，目送朝阳照彻河洛大地，怀中初祖遗图安然无恙，心中豪情与禅定水乳交融。'),
    ],
    choices: [
      {
        id: 'sls18_return_damo',
        label: '携初祖《沧海东渡遗图》下崖，返回达摩院东侧密禅室复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE18_QUEST_ID, 'seal_chart_damo'),
          toast(
            '已以禅武合一折服异域双尊！请返回【嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室（sl_damo_east）】封藏初祖遗图。',
            'success',
            '沧海遗图',
          ),
        ],
      },
    ],
  },

  scene_sls18_16: {
    id: 'scene_sls18_16',
    title: '第十六幕 · 宝卷归藏',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('回到达摩面壁石洞东侧密禅室时，玄难与玄渡早已迎候在石门之外。听闻你于云海日出之际连战天竺瑜伽大宗师与波斯明火宗师，更以「万法同源」的禅偈手抄本化干戈为玉帛，二位长老无不抚掌称绝！'),
      S('NPC-0127', '（玄难眼中满是欣慰与敬重）“连战两位宗师中品异域奇人而全胜无伤，又以佛门慈悲胸襟折服远客——师弟今日之武功气度，实已不让昔年历代祖师！”'),
      S('NPC-0135', '（玄渡小心翼翼地将羊皮古卷重新封入紫檀金函，微笑赞叹）“更难得师弟书法与经义皆臻化境，临摹赠客的梵汉禅偈令那两位大宗师如获至宝，从此西域与少林便多了一段千年美谈！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_17', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_17: {
    id: 'scene_sls18_17',
    title: '第十七幕 · 祖庭薪火',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('三人同立石室佛灯之前，将封存妥当的《沧海东渡遗图》安放于初祖面壁石龛最高处。灯影摇曳间，五百年禅武薪火仿佛正于你掌心绵延不绝。'),
      S('NPC-0127', '“经此云海双战，你于天竺柔劲、波斯烈火与我少林正法三者交融之处必有大悟。切记好好体味此番实战心得，他日登临武道绝顶，指日可待！”'),
      S('NPC-0135', '“师弟，日后藏经阁与达摩院凡有古籍疑难，老衲可还要时常向你请益呢！”'),
    ],
    onFinishEffects: [openScene('scene_sls18_18', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_18: {
    id: 'scene_sls18_18',
    title: '第十八幕 · 万法同源',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('走出达摩面壁石洞时，春风拂过少室山翠柏，云海晴空万里无垠。初祖东渡沧海的宏愿、云海绝顶连战双尊的激荡、以及「万法同源一念空」的澄澈禅境，尽数化作你胸中浩然不灭的宗师气象。'),
    ],
    choices: [
      {
        id: 'sls18_complete',
        label: '合十礼谢玄难、玄渡二位师兄，潜心铭记云海禅武大悟',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 1250, reason: '少室绝顶连战天竺瑜伽与波斯明火两位宗师' },
          { type: 'addSectContribution', amount: 400 },
          { type: 'addArtExp', amount: 320 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0135' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE18_QUEST_ID },
          toast(
            '【达摩东渡 · 沧海遗图】圆满完成！获实战经验+1250、师门贡献+400、武学修为+320、经义+2、书+1，玄渡与玄难好感各+20！',
            'success',
            '沧海遗图',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_SIDE18_SCENES
