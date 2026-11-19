import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE13_QUEST_ID } from './shaolinSideTibetanDebateQuest'

const SPEAKER_LANGDAMA: StorySpeakerSpec = {
  kind: 'custom',
  name: '朗达玛',
  title: '西夏密宗音功高僧 · 朗达玛',
  factionName: '西夏密宗',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_EUNUCH_ENVOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '张茂则',
  title: '入内内侍省宣旨使',
  factionName: '大宋朝廷',
  portraitUrl: '/assets/characters/templates/tpl_eunuch_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_eunuch_male_av.jpg',
}

const SPEAKER_BIANKING_SCHOLAR: StorySpeakerSpec = {
  kind: 'custom',
  name: '汴京观礼太学生',
  title: '国子监士子',
  factionName: '汴京士林',
  portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_song_scholar_av.jpg',
}

function buildLangdama(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS13_LANGDAMA',
    name: '朗达玛',
    title: '西夏密宗音功高僧 · 朗达玛',
    realm: '一流中品',
    factionName: '西夏密宗',
    sectRank: 0,
    sectRankLabel: '密宗大阿阇梨',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“中原禅徒口舌虽利，且看你能不能接住贫僧这声西域大自在梵音狮吼！”',
    stats: { hp: 3180, mp: 2960, agi: 66, res: 59 },
    talents: { bone: 76, comprehension: 82, charm: 55 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-139',
      move1: 'MA-063',
      move2: 'MA-107',
      move3: 'MA-073',
    },
    learnedArts: [
      { artId: 'MA-245', level: 8 },
      { artId: 'MA-139', level: 7 },
      { artId: 'MA-063', level: 8 },
      { artId: 'MA-107', level: 8 },
      { artId: 'MA-073', level: 7 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls13_01: {
    id: 'scene_sls13_01',
    title: '香云宝鼎 · 番僧闯殿',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('{reignYear}仲夏，汴京大相国寺香火鼎盛，香云宝鼎青烟袅袅。你方踏入大雄宝殿门阶，忽听殿内一声如闷雷滚地般的梵唱炸响，震得檐角铜铃嗡嗡乱颤，十余名香客掩耳骇退！'),
      N('只见宝殿正中站着一名身披绛红金边袈裟、身材魁梧的西夏密宗高僧，手托鎏金法螺，神态倨傲；其对面少林下院主持慧光、慧空面色发白，正强运内息稳住心神。'),
      S(SPEAKER_LANGDAMA, '“哈哈哈哈！大宋天子脚下的皇家禅院，难道便只有这两位连一句真言声浪都站立不稳的庸僧么？贫僧朗达玛随西夏使团入汴，特携兴庆府承天寺因明辩帖前来问难，若大相国寺无人敢应，便请摘了『天下禅宗祖庭下院』的匾额吧！”'),
      S('NPC-0360', '“阿弥陀佛……朗达玛大师以密宗音功暗催内劲震伤同门，岂是礼佛问难之道？……呃！”'),
      S('NPC-0465', '“慧光师兄小心！他的梵音暗合内功共振，直冲耳膜百会！”'),
    ],
    onFinishEffects: [openScene('scene_sls13_02', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_02: {
    id: 'scene_sls13_02',
    title: '挺身接帖 · 气定神闲',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('你踏前一步，暗运少林纯正内息护住双耳与胸腹，衣袖轻拂之间，殿中激荡的余音竟如泥牛入海般消弭无形。你向慧光、慧空合十施礼，旋即转身直视朗达玛。'),
      P('“阿弥陀佛。嵩山少林弟子在此！朗达玛大师既持因明辩帖远道而来，中原佛门岂有闭门不纳之理？不过大雄宝殿乃礼佛清净地，不如移步资圣八角琉璃宝塔前高筑法坛，请汴京僧俗共证！”'),
      S(SPEAKER_LANGDAMA, '“哦？终于来了个气息浑厚、能接住贫僧声浪的硬角儿！好！贫僧便在八角宝塔下恭候——既辩因明，亦验禅功，看看嵩山少林究竟是真金还是虚名！”'),
      S('NPC-0360', '“师兄来得太及时了！这朗达玛不仅精研藏传因明逻辑，更兼修一流中品音功内劲，务请师兄万分谨慎！”'),
    ],
    choices: [
      {
        id: 'accept_tibetan_debate',
        label: '“二位师弟且安心调息，我这便登八角宝塔法坛会他一会！”',
        subLabel: '承接支线【大雄狮吼 · 番僧问难】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE13_QUEST_ID, stepId: 'pagoda_debate_duel' },
          openScene('scene_sls13_03', SHAOLIN_SIDE13_QUEST_ID),
        ],
      },
      {
        id: 'defer_tibetan_debate',
        label: '“且容我稍作调息整备，随后便应此辩。”',
        subLabel: '暂缓接取（可随时再来大雄宝殿开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side13_start_triggered', value: false },
          toast('你暂且退至廊下调息养神，待准备妥当后可再入大雄宝殿迎战番僧。', 'talk', '大雄狮吼'),
        ],
      },
    ],
  },

  scene_sls13_03: {
    id: 'scene_sls13_03',
    title: '钟鼓齐鸣 · 满城聚观',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('不过盏茶功夫，西夏番僧在大相国寺登坛问难的消息已传遍相国寺瓦舍与朱雀门街，汴京士子、商贾、太学生乃至闻讯赶来的朝廷礼官蜂拥而至，将资圣八角琉璃宝塔前围得水泄不通。'),
      S('NPC-0465', '“师兄，辩经之时那番僧定会借三道因明死题设套，更会暗运音功乱你心神。你经义湛深、辩才无碍，定要沉住气！”'),
      P('“放心，我这就前往资圣八角琉璃宝塔。”'),
    ],
    onFinishEffects: [
      toast('任务已接取：前往【大相国寺 · 资圣八角琉璃宝塔】登坛迎战朗达玛！', 'success', '大雄狮吼'),
    ],
  },

  scene_sls13_04: {
    id: 'scene_sls13_04',
    title: '八角宝塔 · 登坛对坐',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('资圣八角琉璃宝塔前，两张红木禅座分列东西。朗达玛盘膝坐于西座，身旁四名西夏随行僧侣齐摇铜铃，声声入耳；你神色安详，步上东座合十端坐。'),
      S(SPEAKER_BIANKING_SCHOLAR, '“快看！那位少林高徒神态何等从容，面对西夏大阿阇梨竟毫无惧色！”'),
      S(SPEAKER_LANGDAMA, '“中原僧人听好了！今日辩难共分三问。若你三问皆能破我因明立宗，贫僧便服你口舌之能；若有一问词穷，便请少林寺向西夏承天寺低头！”'),
      P('“请大师出第一问。”'),
    ],
    onFinishEffects: [openScene('scene_sls13_05', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_05: {
    id: 'scene_sls13_05',
    title: '第一死题 · 空有相悖',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      S(SPEAKER_LANGDAMA, '“第一问：尔等禅宗常言『本来无一物』，既言万法皆空，那尔等每日诵经持戒、习武护寺，岂非执着于『有』？若佛法是有，便违空性；若佛法是空，修行何用？此乃自语相违之死题，汝何以解之？”'),
      N('台下众人听得暗暗捏汗，此问步步紧逼，无论答“空”答“有”皆似落入圈套。你微微一笑，朗声答道：'),
    ],
    choices: [
      {
        id: 'debate_q1_middle_way',
        label: '“真空不碍妙有！舟楫度河，登岸舍舟，然未渡之时岂可废舟？”',
        subLabel: '以中观不二法门直破诡辩',
        tone: 'jade',
        effects: [openScene('scene_sls13_06', SHAOLIN_SIDE13_QUEST_ID)],
      },
      {
        id: 'debate_q1_heart',
        label: '“空者空其执念，有者有其慈悲；执空为顽空，非佛陀本意！”',
        subLabel: '以禅门直指人心破其逻辑陷阱',
        tone: 'gold',
        effects: [openScene('scene_sls13_06', SHAOLIN_SIDE13_QUEST_ID)],
      },
    ],
  },

  scene_sls13_06: {
    id: 'scene_sls13_06',
    title: '第二死题 · 杀戒与护法',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('你一番中观妙语落地，台下太学生与诸山长老齐声叫好！朗达玛眉头一皱，随即冷笑一声，抛出第二道更为刁钻的死题。'),
      S(SPEAKER_LANGDAMA, '“好一张利口！且接第二问：佛门首重不杀生戒，然尔嵩山少林僧兵历代习武练棍，甚至助世俗王朝征战护城。以戈止戈仍是动武，持戒之人怀杀器，岂非欺世盗名之伪善？”'),
      N('此言暗讽少林武僧传统，满场瞬间鸦雀无声。你合十正色，声音如洪钟大吕：'),
    ],
    choices: [
      {
        id: 'debate_q2_compassion',
        label: '“菩萨低眉是慈悲，金刚怒目亦是慈悲！止恶扬善，护众生而不害众生，方为大戒！”',
        subLabel: '以金刚护法大义折服全场',
        tone: 'gold',
        effects: [openScene('scene_sls13_07', SHAOLIN_SIDE13_QUEST_ID)],
      },
      {
        id: 'debate_q2_mirror',
        label: '“器本无善恶，善恶在人心。若见虎狼噬民而袖手旁观，岂非纵恶成杀？”',
        subLabel: '以因果本心反诘番僧',
        tone: 'jade',
        effects: [openScene('scene_sls13_07', SHAOLIN_SIDE13_QUEST_ID)],
      },
    ],
  },

  scene_sls13_07: {
    id: 'scene_sls13_07',
    title: '第三死题 · 顿悟与渐修',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('台下喝彩声如潮水般涌起，数位老僧激动得频频颔首！朗达玛脸色已沉如寒铁，双掌暗自按在膝上，声音陡然拔高三度，已悄悄夹入密宗震魂内劲！'),
      S(SPEAKER_LANGDAMA, '“哼！且接第三问：尔禅宗南宗标榜『一念顿悟即成佛』，既是一念成佛，那达摩祖师何必面壁九年？尔等何必苦坐蒲团？若顿悟为真，渐修皆伪；若渐修为真，顿悟乃妄言！答来——！”'),
      N('一股无形声浪随那“答来”二字扑面袭至，座前香案上的烛火齐齐一矮！你稳坐如山，真气自丹田贯入喉舌，不疾不徐朗声回应：'),
    ],
    choices: [
      {
        id: 'debate_q3_sun_cloud',
        label: '“顿悟如日出破暗，渐修如拭镜除尘；无九年积功，何来一朝豁然？理虽顿悟，事须渐除！”',
        subLabel: '圆融顿渐二门 · 破尽三道死题',
        tone: 'gold',
        effects: [openScene('scene_sls13_08', SHAOLIN_SIDE13_QUEST_ID)],
      },
      {
        id: 'debate_q3_lotus',
        label: '“莲花出水在一瞬，扎根淤泥历三冬。大师执着名相分立，反落二边之见矣！”',
        subLabel: '以莲喻禅 · 反破番僧执念',
        tone: 'jade',
        effects: [openScene('scene_sls13_08', SHAOLIN_SIDE13_QUEST_ID)],
      },
    ],
  },

  scene_sls13_08: {
    id: 'scene_sls13_08',
    title: '大雄狮吼 · 梵音撼塔',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    illustrationUrl: '/assets/quests/sl_s13_lion_roar.jpg',
    illustrationCaption: '资圣八角宝塔前金光激荡，少林禅功硬撼西夏密宗狮吼梵音',
    mandatory: true,
    beats: [
      N('三道因明死题尽被你丝丝入扣一一化解，满场千余观礼者掌声雷动！朗达玛辩无可辩，面皮涨得紫红，猛地掀翻身前法螺案，长身而起！'),
      S(SPEAKER_LANGDAMA, '“好！口舌之利贫僧认了！然佛法非仅纸上空谈，须以定力与修为印证！贫僧这门西域『大自在梵音狮吼』专试禅心，若你能正面接下贫僧全力一战，贫僧便甘拜下风！”'),
      N('朗达玛双掌合十于胸前，周身绛红袈裟无风自动，一股沉浑狂暴的西夏密宗内劲轰然爆发，如狂狮怒啸般席卷整座宝塔广场！'),
      P('“大师既要以武证禅，嵩山少林奉陪到底！请赐教！”'),
    ],
    onFinishEffects: [openScene('scene_sls13_09', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_09: {
    id: 'scene_sls13_09',
    title: '法坛斗法 · 禅功破梵音',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('八角宝塔檐角铁马叮当作响，众人齐齐后退十丈让出空场。朗达玛眼中精芒暴涨，携一流中品密宗内劲与凌厉掌锋踏步逼来！'),
    ],
    choices: [
      {
        id: 'spar_langdama',
        label: '稳守禅心，以少林绝学正面迎战朗达玛！',
        subLabel: '法坛斗法切磋 · 一流中品西夏密宗高僧',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLangdama() },
            rule: 'spar',
            duelStakesTag: 'spar',
            introText: '朗达玛口吐梵音真言，声浪与掌风交织如雷霆压顶，法坛禅武之战一触即发！',
            onWin: [openScene('scene_sls13_10', SHAOLIN_SIDE13_QUEST_ID)],
            onLose: [
              toast(
                '你暂被朗达玛的密宗音功震退数步，幸未伤及根基。可调息片刻后于八角宝塔再战！',
                'warn',
                '大雄狮吼',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls13_10: {
    id: 'scene_sls13_10',
    title: '梵音顿寂 · 番僧折服',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('数十合龙争虎斗之后，朗达玛催动毕生功力吐出一记震耳欲聋的密宗狮吼，同时双掌拍向你肩井。你却不闪不避，胸口如铜钟回鸣，一股纯正浩然的少林禅门真气透体而出，硬生生将那漫天梵音声浪震得烟消云散，反掌轻按其腕脉三寸，点到即止！'),
      N('朗达玛连退七步方稳住身形，只觉胸口气血翻涌却未受半点内伤，对方收发由心的绝顶火候令他彻底骇然。片刻沉默后，他缓缓整理凌乱袈裟，郑重向你合十低头。'),
      S(SPEAKER_LANGDAMA, '“阿弥陀佛……贫僧坐井观天，妄自尊大。中原少林不仅经义圆融，禅功修为更是深不可测！今日败在大师手下，贫僧心服口服，这便收起辩帖，不敢再轻侮中原佛门！”'),
      S(SPEAKER_BIANKING_SCHOLAR, '“赢了！少林高僧大获全胜！大宋禅宗威武！！”'),
    ],
    onFinishEffects: [openScene('scene_sls13_11', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_11: {
    id: 'scene_sls13_11',
    title: '欢声震汴 · 诏使忽临',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('资圣八角琉璃宝塔前欢呼声直冲云霄，慧光与慧空快步上前，眼含热泪向你连声致谢。朗达玛率西夏随行僧众再次合十致敬后，黯然却不失礼数地退出了山门。'),
      S('NPC-0360', '“师兄今日大展神威，不仅保住了大相国寺千年清誉，更叫满汴京见识了嵩山少林的真气象！”'),
      N('正说话间，一名知客僧满脸喜色奔来禀报：宫中入内内侍省宣旨使已奉官家口谕抵达【大雄宝殿（香云宝鼎）】，传召方才登坛退番僧的少林高徒上前接赏！'),
      P('“既蒙官家垂问，咱们速回大雄宝殿迎候圣谕。”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE13_QUEST_ID, 'hall_imperial_reward'),
      toast('朗达玛已心服口服退去！请速返【大雄宝殿（香云宝鼎）】接领官家御赏。', 'success', '大雄狮吼'),
    ],
  },

  scene_sls13_12: {
    id: 'scene_sls13_12',
    title: '御赐金钵 · 仁宗嘉奖',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    illustrationUrl: '/assets/quests/sl_s13_imperial_bowl.jpg',
    illustrationCaption: '大雄宝殿香云缭绕，宣旨内侍奉仁宗圣谕颁赐赏银与御前嘉奖',
    mandatory: true,
    beats: [
      N('大雄宝殿内钟磬齐鸣，香云宝鼎前已设好接旨香案。入内内侍省宣旨使张茂则手捧明黄敕谕，笑意盈盈地望着你与慧光、慧空。'),
      S(SPEAKER_EUNUCH_ENVOY, '“圣人闻听西夏密宗高僧闯入大相国寺问难，幸得嵩山少林高徒登坛连破三问、以禅功慑服番僧，扬我大宋文教佛门之威，龙颜甚悦！特命咱家赍赐护法赏银二百两，并赐御前赞语『大雄狮吼，禅武双清』！”'),
      P('“阿弥陀佛，弟子不敢居功，此乃少林历代祖师法脉与大宋圣明教化之福佑。谢官家隆恩！”'),
      S(SPEAKER_EUNUCH_ENVOY, '“大师果然谦冲有度，怪不得圣人常赞嵩山少林乃忠义佛门。咱家这便回宫复命去了！”'),
    ],
    onFinishEffects: [openScene('scene_sls13_13', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_13: {
    id: 'scene_sls13_13',
    title: '下院赠丹 · 经辩精进',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('送走宣旨内侍后，慧光与慧空又自大相国寺药库取来两枚珍藏的【嵩山少林小还丹】奉上，连同官家赏赐的二百两纹银一并交由你收执。'),
      S('NPC-0360', '“方才听师兄于八角宝塔前阐发中观不二与顿渐圆融之旨，小僧二人亦觉茅塞顿开。这两枚小还丹聊表下院谢意，还望师兄切勿推辞！”'),
      S('NPC-0465', '“今日之事不消三日便会传回嵩山，方丈师伯与戒律院诸位师叔听闻，定会大为欣慰！”'),
      N('经此一番舌战番僧、以禅破音的盛会，你对佛门经义与临机辩才的体悟亦更上一层楼。'),
    ],
    onFinishEffects: [openScene('scene_sls13_14', SHAOLIN_SIDE13_QUEST_ID)],
  },

  scene_sls13_14: {
    id: 'scene_sls13_14',
    title: '声震京华 · 狮吼传名',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('夕阳西下，汴京城头晚霞如锦，相国寺外街巷间处处传颂着「少林高徒大雄狮吼退番僧」的佳话。你向慧光、慧空合十作别，迈步走出香烟缭绕的大雄宝殿。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 650, reason: '大相国寺登坛破西夏因明辩难' },
      { type: 'giveSilver', amount: 200, reason: '官家赐赏护法银两' },
      { type: 'addSectContribution', amount: 240 },
      { type: 'modifyRenown', delta: 90, reason: '大雄狮吼折服西夏密宗高僧' },
      { type: 'modifySkill', key: '辩才', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-111', qty: 2 },
      { type: 'completeQuest', questId: SHAOLIN_SIDE13_QUEST_ID, outcome: 'completed' },
      toast(
        '【大雄狮吼 · 番僧问难】圆满完成！实战经验 +650，银两 +200，门派贡献 +240，声望 +90，辩才 +2，经义 +1，获赠嵩山少林小还丹 ×2！',
        'success',
        '大雄狮吼',
      ),
    ],
  },
}
