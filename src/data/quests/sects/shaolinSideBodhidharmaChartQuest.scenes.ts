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

function buildKasyapaYogiBoss(humbled = false): NodeNpc {
  return makeQuestNpc({
    id: humbled ? 'QUEST_SLS18_KASYAPA_HUMBLED' : 'QUEST_SLS18_KASYAPA_YOGI',
    name: '迦叶尊者',
    title: '天竺古瑜伽大宗师',
    realm: '宗师中品',
    factionName: '天竺那烂陀遗脉',
    sectRank: 4,
    sectRankLabel: '瑜伽大宗师',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: humbled
      ? '“『一花开五叶，结果自然成』……首座竟通晓古梵原义！贫僧傲气已消，愿以礼点到为止切磋三招！”'
      : '“达摩尊者本出自南天竺香至国！中土少林若真承初祖正脉，便以禅武破我天竺古瑜伽之柔印！”',
    stats: humbled
      ? { hp: 3850, mp: 3720, agi: 78, res: 68 }
      : { hp: 5350, mp: 5180, agi: 84, res: 76 },
    talents: { bone: 93, comprehension: 95, charm: 78 },
    equippedArts: { neigong: 'MA-060', move1: 'MA-043', move2: 'MA-063' },
    learnedArts: [
      { artId: 'MA-060', level: 10 },
      { artId: 'MA-043', level: 10 },
      { artId: 'MA-063', level: 9 },
    ],
  })
}

function buildBahmanFireBoss(respectful = false): NodeNpc {
  return makeQuestNpc({
    id: respectful ? 'QUEST_SLS18_BAHMAN_RESPECT' : 'QUEST_SLS18_BAHMAN_FIRE',
    name: '阿胡拉 · 巴赫曼',
    title: '波斯明火宗师',
    realm: '宗师中品',
    factionName: '波斯拜火圣坛',
    sectRank: 4,
    sectRankLabel: '明火宗师',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: respectful
      ? '“连迦叶尊者都为阁下古梵禅理折服！巴赫曼便以礼奉陪，请阁下印证我波斯明火神功！”'
      : '“圣火燃尽诸相！中土宗师，且看你少林禅功可挡得住我波斯明火连环烈焰！”',
    stats: respectful
      ? { hp: 4680, mp: 4460, agi: 82, res: 71 }
      : { hp: 5480, mp: 5260, agi: 86, res: 75 },
    talents: { bone: 94, comprehension: 92, charm: 82 },
    equippedArts: { neigong: 'MA-038', move1: 'MA-019', move2: 'MA-052' },
    learnedArts: [
      { artId: 'MA-038', level: 10 },
      { artId: 'MA-019', level: 9 },
      { artId: 'MA-052', level: 9 },
    ],
  })
}

export const SHAOLIN_SIDE18_SCENES: Record<string, StorySceneDef> = {
  scene_sls18_01: {
    id: 'scene_sls18_01',
    title: '第一幕 · 沉香藏卷',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    illustrationUrl: '/assets/quests/sl_s18_sea_chart.jpg',
    illustrationCaption: '沧海遗图 · 达摩院孤灯展卷，初祖泛海东渡羊皮古图与海路禅偈重见天日',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，少室山云雾清凉。你应达摩院首座玄难与高僧玄渡之邀，踏入达摩面壁石洞东侧密禅室，清点自南北朝流传至今的初祖旧档。'),
      N('玄渡托起一支《楞伽经》古沉香木轴芯，轻敲之下竟似中空，轴端铜箍镌着南朝梁普通年间的古梵文暗记！你以寸劲轻旋铜箍，五百年蜂蜡应手脱落，一卷柔韧泛黄、异香幽远的古老羊皮卷缓缓滑出！'),
      N('三人于青石长案上徐徐展卷：但见朱砂、青金石与松烟墨绘就浩瀚沧海，季风洋流与周天星斗纵横交错，卷角更题着初祖亲笔「一苇浮沧海，万里渡迷津；风涛无定相，不动是吾心」之偈！'),
      S(
        'NPC-0127',
        '（玄难倒吸一口凉气，声音微颤）“这竟是初祖菩提达摩当年泛海东渡三载亲手绘就的《沧海东渡遗图》！图上山川海潮笔势苍茫如龙蛇，更有数段漫漶的悉昙古梵文海路密码！”',
      ),
      S(
        'NPC-0135',
        '“此乃我少林无上法脉见证！惟有赴【少林藏经阁 · 经阁正楼】对照梁唐古译梵典，方能将其中海路与后半段禅偈彻底破译！”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls18_02', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_02: {
    id: 'scene_sls18_02',
    title: '第二幕 · 经阁之约',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('石室孤灯如豆，青金石绘就的汪洋大海在烛火下泛起淡淡微芒，仿佛五百年前的万里海涛与初祖清风穿越时空扑面而来。'),
      S('NPC-0127', '“此事干系重大，切不可走漏风声。你与玄渡师弟先携古卷往藏经阁正楼破译海路禅偈，老衲留守达摩院加固密室禁制。”'),
    ],
    choices: [
      {
        id: 'sls18_go_cangjing',
        label: '“阿弥陀佛！弟子珍重收卷，这便随玄渡师兄前往藏经阁正楼破译！”',
        subLabel: '承接支线【达摩东渡 · 沧海遗图】，前往少林藏经阁正楼',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE18_QUEST_ID, stepId: 'decipher_sutra_pavilion' },
          setStep(SHAOLIN_SIDE18_QUEST_ID, 'decipher_sutra_pavilion'),
          toast(
            '已发掘初祖《沧海东渡遗图》！请随玄渡前往【嵩山少林寺 · 少林藏经阁 · 经阁正楼（sl_cj_pavilion）】考释古梵密码。',
            'talk',
            '沧海遗图',
          ),
        ],
      },
      {
        id: 'sls18_defer_cangjing',
        label: '“古卷珍稀，容弟子先净手整备妥当后再行启程赴阁。”',
        subLabel: '暂缓接取（可随时再返东侧密禅室开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side18_start_triggered', value: false },
          toast('你暂且告辞整备，稍后可再返达摩面壁石洞东侧密禅室开启考释。', 'talk', '沧海遗图'),
        ],
      },
    ],
  },

  scene_sls18_03: {
    id: 'scene_sls18_03',
    title: '第三幕 · 沧海密码',
    subtitle: '嵩山少林寺 · 少林藏经阁正楼',
    mandatory: true,
    beats: [
      N('藏经阁正楼万卷环列，药香沉静。你与玄渡搬出梁代、唐初所译古梵音义字典，伏案灯下对照羊皮卷中的季风箭标、星象方位与漫漶悉昙古梵文逐字校勘。'),
      N('海图上隐约标出三条历代僧侣东来震旦的古道线索，其中仅有一条真正契合初祖菩提达摩泛海东渡、登岸建刹并传灯嵩岳的原始海路密码。'),
      S(
        'NPC-0135',
        '“师弟经义与书法造诣皆臻化境，对照这些星象洋流与古梵地名，你辨明初祖当年究竟循哪一条航路登岸、再入我嵩山少林的么？”',
      ),
    ],
    choices: [
      {
        id: 'decode_route_silkroad',
        label: '【西域葱岭陆道】自北天竺逾葱岭、过龟兹与敦煌玉门关，经凉州东入洛阳白马寺',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s18_decode_choice', value: 'silkroad' },
          openScene('scene_sls18_04', SHAOLIN_SIDE18_QUEST_ID),
        ],
      },
      {
        id: 'decode_route_guangzhou',
        label: '【南海季风航路】自天竺南岸乘西南季风经师子国、南海抵广州光孝寺，再北上渡江入嵩山少林',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s18_decode_choice', value: 'guangzhou' },
          { type: 'setFlag', flag: 'sl_s18_chart_decoded', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_decode_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s18_decode_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls18_04', SHAOLIN_SIDE18_QUEST_ID),
        ],
      },
      {
        id: 'decode_route_mingzhou',
        label: '【东海蓬莱航路】自天竺绕道扶桑、经明州四明港入太湖，再溯大运河北上中原',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s18_decode_choice', value: 'mingzhou' },
          openScene('scene_sls18_04', SHAOLIN_SIDE18_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls18_04: {
    id: 'scene_sls18_04',
    title: '第四幕 · 金帖破空',
    subtitle: '嵩山少林寺 · 少林藏经阁正楼',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s18_decode_choice=guangzhou|玄渡拍案惊绝：“妙极！正是天竺南岸香至国乘西南季风，经师子国、南海抵广州光孝寺，再渡江北上嵩山！师弟一语破译海路密码，更顺势解通了初祖末句古梵文——『一花开五叶，结果自然成；莫执孤舟争彼岸，万法同源一念空』！”|}{ifFlagEq:sl_s18_decode_choice=silkroad|玄渡轻抚古卷摇头微笑：“逾葱岭抵白马寺乃是东汉迦叶摩腾驮经旧道。师弟细看这季风星象——初祖乃乘西南季风经师子国抵广州光孝寺再北上嵩山！”二人随即合力校勘，终补全卷尾「万法同源」禅偈。|}{ifFlagEq:sl_s18_decode_choice=mingzhou|玄渡指着南海星宿温声指点：“梁普通年间尚无大运河通明州之海路，此图实指初祖乘西南季风经师子国抵广州光孝寺再渡江北上嵩山！”二人旋即复核古梵典，补全了卷尾「万法同源」禅偈。|}'),
      N('话音未落，窗外忽然掠过两道一柔一烈、惊世骇俗的异域罡风！“咄！”“咄！”两声轻响，一片鎏金贝叶与一枚赤铜圣火令穿透厚重窗棂，稳稳钉入红漆梁柱，木屑未飞一星！'),
      N('你拔下两物，但见背面皆刻工整汉楷：「天竺那烂陀遗脉迦叶、波斯拜火圣坛巴赫曼，循五百年圣卷星象万里而来。明晨日出，恭候少林首座携《沧海遗图》登临少室绝顶万丈冰崖，以武印禅！」'),
      S(
        'NPC-0127',
        '（闻声赶来的玄难观摩信物余劲，神色凝重）“天竺古瑜伽与波斯明火圣坛皆是绝迹西域百年的化外奇门，来者二人俱是宗师中品！师弟切记以禅定调息，我与玄渡在绝顶之下为你护法压阵！”',
      ),
      P('“既递帖邀约『以武印禅』，弟子明日拂晓便独自攀崖赴约，护住初祖遗图尊严！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE18_QUEST_ID, 'cloud_sea_duel'),
      toast(
        '异域双尊已候于绝顶！请前往【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】攀崖赴约。',
        'talk',
        '沧海遗图',
      ),
    ],
  },

  scene_sls18_05: {
    id: 'scene_sls18_05',
    title: '第五幕 · 绝顶云海',
    subtitle: '少室绝顶 · 万丈冰崖',
    illustrationUrl: '/assets/quests/sl_s18_cloud_sea_duel.jpg',
    illustrationCaption: '云海日出 · 少室绝顶万丈冰崖，以少林绝学迎战天竺与波斯异域双尊',
    mandatory: true,
    beats: [
      N('五更天色微明，你自飞瀑深潭试炼涧踏雪掠上少室绝顶万丈冰崖。脚下茫茫云海翻涌如银涛，东方天际正跃出一线瑰丽金红。'),
      N('崖畔巨石上静立着两位深不可测的异域大宗师：左首是身披赭黄古袍、赤足踏冰不染寒霜的天竺老僧；右首是白袍金纹、周身蒸腾灼热气浪的波斯伟岸男子。'),
      S(
        SPEAKER_KASYAPA_YOGI,
        '（双手合十，神态高古傲然）“那烂陀遗脉迦叶，见过少林首座。菩提达摩尊者本出自南天竺香至国，其《沧海遗图》载录天竺古禅正印。今日贫僧万里东来，愿试中土少林是否仍配执掌初祖圣卷！”',
      ),
      S(
        SPEAKER_BAHMAN_FIRE,
        '（抚胸微躬，声如烈火轰鸣）“波斯圣坛使者阿胡拉·巴赫曼！当年达摩尊者东渡曾借我族星火海历定航。我二人轮番向阁下讨教——若阁下能连胜我二人，我等绝不再提带走原卷半字！”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls18_06', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_06: {
    id: 'scene_sls18_06',
    title: '第六幕 · 双尊印禅',
    subtitle: '少室绝顶 · 万丈冰崖',
    mandatory: true,
    beats: [
      N('朝阳跃出云海，金光万丈洒满冰崖！迦叶尊者赤足轻点冰面，古瑜伽柔劲弥漫绝顶；巴赫曼尊使白袍鼓荡，脚下千年寒冰滋滋融作白雾。'),
      N('面对这两位气机一柔一烈、俱为宗师中品的绝域奇人，你立于云海朝阳之前，决意如何开启这场载入武林史册的云海印证？'),
    ],
    choices: [
      {
        id: 'sls18_duel_sanskrit_dharma',
        label: '【古梵阐妙义 · 以礼印双尊】以古梵文阐释达摩「一花开五叶」妙义先折迦叶傲气，再以礼车轮切磋双尊！',
        subLabel: '迦叶心服收锋点到为止，随后车轮印证巴赫曼（宗师中品 × 2，禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需藏经阁已亲破《沧海遗图》海路密码，或十艺【经义】≥ 85',
          conditions: [
            { type: 'flag', flag: 'sl_s18_chart_decoded', op: 'truthy' },
            { type: 'skillAtLeast', key: '经义', min: 85 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s18_duel_mode', value: 'dharma' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_duel_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s18_duel_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildKasyapaYogiBoss(true) },
            extraOpponents: [{ kind: 'custom', npc: buildBahmanFireBoss(true) }],
            rule: 'spar',
            duelStakesTag: 'spar',
            forbidEscapeReason: '云海绝顶以武印禅，关乎少林初祖正脉威仪，岂可退却！',
            introText: '你以古梵文朗阐达摩「一花开五叶」妙义折去迦叶傲气，旋即与天竺、波斯双尊展开以礼点到为止的云海车轮印证！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls18_07', SHAOLIN_SIDE18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('异域双尊奇功深不可测，此战暂且惜败！请调息后再赴试炼涧冰崖再战！', 'warn', '沧海遗图'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('云海绝顶旗鼓相当、难分伯仲！调息后再赴试炼涧冰崖一决高下！', 'warn', '沧海遗图'),
            ],
          },
        ],
      },
      {
        id: 'sls18_duel_gauntlet_direct',
        label: '【禅武破万法 · 正面车轮连战】不费唇舌，径以少林绝学正面车轮连战迦叶尊者与巴赫曼尊使！',
        subLabel: '零门槛车轮连战全盛天竺瑜伽尊者与波斯明火尊使（宗师中品 × 2，怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s18_duel_mode', value: 'gauntlet' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_duel_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s18_duel_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE18_QUEST_ID,
            opponent: { kind: 'custom', npc: buildKasyapaYogiBoss(false) },
            extraOpponents: [{ kind: 'custom', npc: buildBahmanFireBoss(false) }],
            rule: 'spar',
            duelStakesTag: 'spar',
            forbidEscapeReason: '云海绝顶以武印禅，关乎少林初祖正脉威仪，岂可退却！',
            introText: '【云海绝顶车轮连战】迎战全盛天竺瑜伽大宗师【迦叶尊者】与波斯明火宗师【阿胡拉 · 巴赫曼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls18_07', SHAOLIN_SIDE18_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('异域双尊柔烈交替、威势惊人！你暂且退下调息回元，稍后再攀冰崖重战！', 'warn', '沧海遗图'),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('与异域双尊鏖战难分雌雄，调息片刻后再行印证！', 'warn', '沧海遗图'),
            ],
          },
        ],
      },
    ],
  },

  scene_sls18_07: {
    id: 'scene_sls18_07',
    title: '第七幕 · 水火既济',
    subtitle: '少室绝顶 · 万丈冰崖',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s18_duel_mode=dharma|迦叶尊者先折服于你口诵古梵『一花开五叶』的深邃禅悟，十余合点到为止后便含笑收印退步赞叹；紧接着巴赫曼纵火劈空，你借刚才体悟的化柔之妙反手画圆，将三道烈焰刀气凌空导引冲霄，在云海之上炸开漫天金霞！|云海之上，你先以静制动、拈花点破迦叶尊者无骨枯荣柔印，再不待喘息正面硬撼巴赫曼炽烈焚空的明火刀浪，于烈焰最盛处反手画圆将三道火气导引冲霄，掌锋虚按其肩头三寸而胜而不伤！}'),
      S(
        SPEAKER_KASYAPA_YOGI,
        '（满眼震撼合十低首）“妙哉！以静制动、以禅化柔……达摩尊者东渡五百年，中土少林果然薪火大兴！贫僧心服口服！”',
      ),
      S(
        SPEAKER_BAHMAN_FIRE,
        '（仰天大笑，深深抚胸行波斯大礼）“以柔驭火、胜而不伤！中土少林博大精深，巴赫曼不虚万里东来！”',
      ),
      P(
        '（取出昨夜亲笔临摹的两卷梵汉禅偈宣纸手抄本，分赠二位宗师）“阿弥陀佛。初祖原卷当留少林，然法无东西、心海同源，这两份禅偈抄本便赠予二位带回天竺与波斯，以续五百年前同舟论道之缘！”',
      ),
      N('天竺尊者与波斯尊使如获至宝，再度合十抚胸告别，随即展开绝世轻功如双鹤掠云般飘然下崖。你怀揣原卷，踏雾返回达摩院密禅室。'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE18_QUEST_ID, 'seal_chart_damo'),
      toast(
        '已以禅武合一折服异域双尊！请返回【嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室（sl_damo_east）】共定《沧海遗图》归处。',
        'success',
        '沧海遗图',
      ),
    ],
  },

  scene_sls18_08: {
    id: 'scene_sls18_08',
    title: '第八幕 · 宝卷归室',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('重返达摩面壁石洞东侧密禅室时，玄难与玄渡早已迎候在石门之外。听闻你于万丈云海连胜天竺、波斯两位绝顶宗师，更以「万法同源」手抄禅偈化干戈为玉帛，二位长老无不抚掌称绝！'),
      S(
        'NPC-0127',
        '“连战两位宗师中品异域奇人而全胜无伤，又以佛门胸襟折服远客——师弟今日之武功气度，实已不让历代祖师！”',
      ),
      S(
        'NPC-0135',
        '（轻抚青石案上泛着海天微芒的羊皮古卷，沉吟道）“只是这卷《沧海遗图》不仅载有初祖禅偈，其上更详绘了南海至西域的季风洋流、暗礁星位。如今大宋泉州、广州海舶往来频仍，常有商船迷航覆没……不知师弟以为，此卷最终当如何处置？”',
      ),
    ],
    onFinishEffects: [openScene('scene_sls18_09', SHAOLIN_SIDE18_QUEST_ID)],
  },

  scene_sls18_09: {
    id: 'scene_sls18_09',
    title: '第九幕 · 遗图归处',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('石室青灯摇曳，五百年前初祖泛海渡劫的季风星轨近在眼前。一是公诸海商济世度厄，一是秘藏禅室永镇祖庭——你凝视着这卷《沧海东渡遗图》，作出了最终决断：'),
    ],
    choices: [
      {
        id: 'chart_fate_public_ports',
        label: '【拓本济海商】将《沧海遗图》海路星象拓印副本公开赠予泉州、广州市舶司，造福大宋海商兼传佛法！',
        subLabel: '大增江湖声望与侠义，海商传颂少林无私功德（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s18_chart_fate', value: 'public' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_fate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s18_fate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls18_10', SHAOLIN_SIDE18_QUEST_ID),
        ],
      },
      {
        id: 'chart_fate_seal_damo',
        label: '【秘封镇祖庭】将《沧海遗图》严密封存达摩院密室石龛，永守初祖遗宝秘脉不令外泄！',
        subLabel: '大幅提升门派贡献，永镇少林达摩院千年秘档（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s18_chart_fate', value: 'sealed' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_fate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s18_fate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls18_10', SHAOLIN_SIDE18_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls18_10: {
    id: 'scene_sls18_10',
    title: '第十幕 · 万法同源',
    subtitle: '嵩山少林寺 · 达摩面壁石洞东侧密禅室',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s18_chart_fate=public|玄难与玄渡相视大赞，当即协力精拓十份海路星图送往泉州、广州市舶司！不消半年，南海商舶凭初祖海图避开无数恶浪暗礁，四海舟人莫不焚香遥祝嵩山少林与你的大德！|玄难郑重取过紫檀金函，亲手贴上达摩院秘封火漆，将羊皮古卷安放于面壁石龛最高处。千年祖庭法脉岿然不动，玄难叹赞你守成持重、深谋远虑！}'),
      S(
        'NPC-0127',
        '“经此云海双战与古卷参悟，你于天竺柔劲、波斯烈火与我少林正法三者交融之处必有大悟。他日登临武道绝顶，指日可待！”',
      ),
      S('NPC-0135', '“师弟，日后藏经阁与达摩院凡有古籍疑难，老衲可还要时常向你请益呢！”'),
      N('走出达摩面壁石洞，春风拂过少室翠柏，云海晴空万里无垠。初祖东渡沧海的宏愿、云海绝顶连战双尊的激荡、以及「万法同源一念空」的澄澈禅境，尽数化作你胸中浩然不灭的宗师气象。'),
    ],
    choices: [
      {
        id: 'sls18_complete',
        label: '合十礼谢玄难、玄渡二位师兄，潜心铭记云海禅武大悟',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 1250, reason: '少室绝顶连战天竺瑜伽与波斯明火两位宗师' },
          { type: 'addSectContribution', amount: 400 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_chart_fate', op: 'eq', value: 'sealed' },
            thenEffects: [{ type: 'addSectContribution', amount: 180 }],
          },
          { type: 'addArtExp', amount: 320 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0135' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 20 },
          { type: 'modifyRenown', delta: 140, reason: '完成门派差事《达摩东渡 · 沧海遗图》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s18_chart_fate', op: 'eq', value: 'public' },
            thenEffects: [
              { type: 'modifyRenown', delta: 70, reason: '公开《沧海遗图》拓本造福泉州广州市舶海商' },
              { type: 'modifyChivalry', delta: 40, reason: '无私弘法济渡南海商舶避险' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE18_QUEST_ID, outcome: 'completed' },
          toast(
            '【达摩东渡 · 沧海遗图】圆满完成！实战经验 +1250，师门贡献 +400（密封另 +180），声望 +140（拓本济商另 +70、侠义 +40），武学修为 +320，经义 +2，书 +1！',
            'success',
            '沧海遗图',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_SIDE18_SCENES
