import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE07_QUEST_ID } from './shaolinSideZishengPagodaQuest'

const SPEAKER_SWALLOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '踏云燕',
  title: '江南轻功飞贼',
  factionName: '江南独行盗',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

function buildCloudSwallow(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS07_CLOUD_SWALLOW',
    name: '踏云燕',
    title: '江南飞贼 · 踏云燕',
    realm: '二流中品',
    factionName: '江南独行盗',
    sectRank: 0,
    sectRankLabel: '飞檐大盗',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“啧啧，百尺琉璃塔檐，暴雨如注，小和尚你站得稳脚跟么？且追得上燕某的燕子三抄水再说！”',
    stats: { hp: 1380, mp: 1120, agi: 58, res: 30 },
    talents: { bone: 58, comprehension: 60, charm: 48 },
    equippedArts: { neigong: 'MA-121', qinggong: 'MA-158', move1: 'MA-118', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-121', level: 5 },
      { artId: 'MA-158', level: 6 },
      { artId: 'MA-118', level: 5 },
      { artId: 'MA-131', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls07_01: {
    id: 'scene_sls07_01',
    title: '第一幕 · 塔门盗帖',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      N('{reignYear}午后乌云压城，大相国寺资圣八角琉璃宝塔风铃叮当急响。你刚行至塔座石阶，便见沙弥净清手捧一张青竹宣纸急匆匆奔下，驻塔执事武僧慧禅正凝神戒备。'),
      S('NPC-0902', '（神色紧张）“师兄来得正好！方才我洒扫塔顶经龛时，竟在供案香炉下压着这张预告帖——不知何人悄无声息登上了百尺宝塔！”'),
      S('NPC-0378', '（接过帖子递与你，沉声道）“上面写着『今夜三更雨落，借观御赐金字华严经一卷——踏云燕拜上』。资圣塔顶供奉的乃是当今官家御赐泥金真经，倘若失窃，非但少林蒙羞，更是欺君大罪！”'),
    ],
    onFinishEffects: [openScene('scene_sls07_02', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_02: {
    id: 'scene_sls07_02',
    title: '第二幕 · 笔锋辨纸',
    subtitle: '资圣八角琉璃宝塔 · 一层禅堂',
    mandatory: true,
    beats: [
      N('你展开盗帖细观，见字迹飘逸灵动、行草兼备，起笔藏锋而收尾轻挑，显是江南文人雅贼习气；再以指腹轻捻纸背，竟觉韧中带滑，隐有太湖水纹暗格。'),
      P('（目光微凝）“慧禅师兄请看：这并非寻常京城宣纸，而是姑苏一带特产的『太湖玉版笺』，寻常盗贼绝用不起此等贵重笺纸。况且『踏云燕』行窃素来只求奇珍不沾佛门重器，今夜执意冒死盗取御赐《华严经》，背后必有江南买主重金指使！”'),
      S('NPC-0378', '（击掌赞叹）“师弟深通书道纸墨，一眼便看破玄机！既是有人幕后买凶，咱们非但要保住真经，更须将这踏云燕生擒活捉，拷问出幕后主使！”'),
    ],
    onFinishEffects: [openScene('scene_sls07_03', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_03: {
    id: 'scene_sls07_03',
    title: '第三幕 · 调包设饵',
    subtitle: '资圣八角琉璃宝塔 · 议定防务',
    mandatory: true,
    beats: [
      P('“塔高百尺、八面凌空，踏云燕既以轻功驰名江南，若我等大张旗鼓把守塔门，他必从外檐直攀塔顶。不如请慧禅师兄先将御赐真经密藏于大殿暗室，弟子以相仿纸笔匆匆摹写一卷赝本置于塔顶金匣作饵。”'),
      S('NPC-0378', '“好计！净清在塔内守住盘旋木梯防止声东击西，我守在四层回廊策应，师弟便在顶层飞檐暗处守株待兔——待他开匣露破绽的一瞬，将其拿下！”'),
      S('NPC-0902', '“弟子这就去备好泥金仿纸与松烟墨，绝不误事！”'),
    ],
    choices: [
      {
        id: 'sls07_accept',
        label: '应下夜雨护经之责，摹写赝卷并赴塔顶设伏',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE07_QUEST_ID, stepId: 'pagoda_rain_ambush' },
          setStep(SHAOLIN_SIDE07_QUEST_ID, 'pagoda_rain_ambush'),
          toast(
            '已定下调包诱敌之策！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】夜雨登塔设伏。',
            'talk',
            '夜雨护经',
          ),
        ],
      },
    ],
  },

  scene_sls07_04: {
    id: 'scene_sls07_04',
    title: '第四幕 · 临摹赝卷',
    subtitle: '资圣八角琉璃宝塔 · 顶层经阁',
    mandatory: true,
    beats: [
      N('暮色四合，细雨渐密。你在塔顶经阁点起一盏豆大油灯，屏息运腕，依着《华严经》卷首笔意疾书数页，装入紫檀金匣，外表与真经几乎难辨真伪。'),
      N('旋即熄灭油灯，你纵身掠出塔顶木窗，足尖稳稳扣住冰凉湿滑的八角琉璃瓦脊，将灰布僧袍紧裹身形，隐入斗拱飞檐的浓重暗影之中。'),
      P('（心中默念静心诀）“风急雨骤，正是飞贼自以为神不知鬼不觉之时……且看你从哪一方飞檐现身。”'),
    ],
    onFinishEffects: [openScene('scene_sls07_05', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_05: {
    id: 'scene_sls07_05',
    title: '第五幕 · 暴雨惊雷',
    subtitle: '资圣八角琉璃宝塔 · 百尺飞檐',
    illustrationUrl: '/assets/quests/sl_s07_pagoda_rain.jpg',
    illustrationCaption: '资圣宝塔 · 百尺飞檐暴雨倾盆，夜色中一道黑影如雨燕掠至',
    mandatory: true,
    beats: [
      N('三更鼓响被雷声吞没，倾盆夏雨砸在琉璃瓦上溅起万千水花。就在一道惨白闪电划破汴京夜空的刹那，塔东南角百尺高空忽有一道纤瘦黑影借着铜铃铁链连点三下，如雨燕般轻飘飘落上顶层窗棂！'),
      N('来人一袭防水油布夜行衣，手持竹节细钩，三两下便挑开铜锁，闪身入阁揭开紫檀金匣——借着微弱电光一扫卷首墨迹，黑影身形猛地一僵！'),
      S(SPEAKER_SWALLOW, '（轻咦一声，随即冷笑）“墨汁未干、金粉浮面……好个李代桃僵的把戏！少林寺果然藏着识文断字的高手！”'),
    ],
    onFinishEffects: [openScene('scene_sls07_06', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_06: {
    id: 'scene_sls07_06',
    title: '第六幕 · 飞檐现身',
    subtitle: '资圣八角琉璃宝塔 · 顶层外廊',
    mandatory: true,
    beats: [
      N('踏云燕警觉至极，话音未落便欲反身掠窗遁走，却听头顶斗拱一声清越佛号响起，你自飞檐倒挂而下，双掌挟风封死东南去路！'),
      P('“阿弥陀佛！踏云燕既已赴约，何必急着走？且留下幕后买主的姓名再行离去不迟！”'),
      S(SPEAKER_SWALLOW, '（足尖轻点湿滑瓦脊，身形如柳絮般倒退三尺，傲然笑道）“小和尚眼力不差，胆气也足！可这百尺高塔暴雨如注，燕某踏云而行如履平地，你若能留得住我，便算少林寺赢！”'),
    ],
    onFinishEffects: [openScene('scene_sls07_07', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_07: {
    id: 'scene_sls07_07',
    title: '第七幕 · 瓦脊对峙',
    subtitle: '资圣八角琉璃宝塔 · 塔顶八角檐',
    mandatory: true,
    beats: [
      N('狂风卷着雨帘扑面而来，脚下青绿琉璃瓦滑不留足，一步踏错便是百尺粉身碎骨之险。踏云燕袖腕轻抖，三枚细如牛毛的追魂镖借雨声掩护悄无声息射向你面门，同时身法一展欲绕向西北角铁索！'),
      P('（双足如老树盘根死死吸住瓦脊，长袖一拂格落暗镖）“想走？没那么容易！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side07_swallow_ready', value: true },
      openScene('scene_sls07_08', SHAOLIN_SIDE07_QUEST_ID),
    ],
  },

  scene_sls07_08: {
    id: 'scene_sls07_08',
    title: '第八幕 · 雨夜擒燕',
    subtitle: '资圣宝塔飞檐 · 1v1 激战江南飞贼踏云燕',
    mandatory: true,
    beats: [
      S(SPEAKER_SWALLOW, '“接招吧小和尚！看你在百尺雨檐上怎么破我的燕子三抄水与追魂镖！”'),
      N('电光闪烁之间，你稳守塔檐中心，以静制动迎战轻功卓绝的江南飞贼踏云燕！'),
    ],
    choices: [
      {
        id: 'sls07_fight_swallow',
        label: '稳扎马步、以静制动，在百尺雨檐生擒【踏云燕（二流中品）】',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE07_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallow() },
            rule: 'story_trial',
            forbidEscapeReason: '飞贼近在咫尺，岂可令其趁雨遁走！',
            introText:
              '【夜雨护经】在百尺资圣宝塔飞檐迎战江南轻功飞贼【踏云燕（二流中品）】！',
            onWin: [openScene('scene_sls07_09', SHAOLIN_SIDE07_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '琉璃瓦湿滑一时失手，被踏云燕虚晃一招拉开距离！稳住气息后可于【资圣八角琉璃宝塔】再截此贼。',
                'warn',
                '夜雨护经',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls07_09: {
    id: 'scene_sls07_09',
    title: '第九幕 · 折翼就擒',
    subtitle: '资圣八角琉璃宝塔 · 顶层廊檐',
    illustrationUrl: '/assets/quests/sl_s07_capture_swallow.jpg',
    illustrationCaption: '雨夜生擒 · 少林擒拿手扣住飞贼肩井，踏云燕折翼就擒',
    mandatory: true,
    beats: [
      N('你摸透了踏云燕借风折返的身法规律，故意卖出一处破绽引其飞身跃过檐角，待他身在半空旧力已尽之际，猛然探臂使出一记刚柔并济的少林擒拿手，精准扣住其右肩琵琶骨！'),
      N('踏云燕闷哼一声，浑身真气登时被封，重重跌落塔顶木廊。楼下闻声赶到的慧禅与净清举起防风灯笼冲上顶层，迅速以铁链将其锁牢。'),
      S(SPEAKER_SWALLOW, '（苦笑叹气）“栽了栽了……想我踏云燕纵横太湖十余载，竟在汴京百尺塔檐上输给一个少林内门小师父，输得心服口服！”'),
    ],
    onFinishEffects: [openScene('scene_sls07_10', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_10: {
    id: 'scene_sls07_10',
    title: '第十幕 · 姑苏密函',
    subtitle: '资圣八角琉璃宝塔 · 搜身查证',
    mandatory: true,
    beats: [
      N('慧禅在踏云燕贴身油布暗袋中搜出一张浸蜡密函，拆开一看，里头并无具名，只写着“取御赐华严经，验卷后于汴河码头凭『燕子坞外号 · 锦云绸庄』对牌支取纹银千两”，落款处盖着一枚极小的朱红燕尾暗印。'),
      S('NPC-0378', '（脸色微沉，压低声音）“燕子坞……锦云绸庄？那是江南姑苏慕容氏设在中原的外围商号！慕容家向来精研天下武学，为何偏要重金盗取一卷并无武功秘籍的御赐《华严经》？”'),
      P('（思忖片刻）“或许意不在经文，而在借御赐佛经失窃激怒朝廷、嫁祸少林！此信干系重大，咱们先将真经归位，再把此贼交由官府、将密函抄送方丈玄慈大师定夺！”'),
    ],
    choices: [
      {
        id: 'sls07_to_report',
        label: '押解踏云燕下塔，归位御赐真经并呈验密函',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE07_QUEST_ID, 'report_clue'),
          toast(
            '已生擒踏云燕并缴获姑苏商号密函！请在【资圣八角琉璃宝塔（bl_xg_pagoda）】向慧禅交割证物。',
            'success',
            '夜雨护经',
          ),
        ],
      },
    ],
  },

  scene_sls07_11: {
    id: 'scene_sls07_11',
    title: '第十一幕 · 雨霁经安',
    subtitle: '资圣八角琉璃宝塔 · 晨光初照',
    mandatory: true,
    beats: [
      N('黎明时分雨收云散，资圣宝塔琉璃瓦在朝阳下熠熠生辉。慧禅与净清恭敬地将御赐金字《华严经》重新请回顶层金龛，燃起三柱清香礼拜。'),
      S('NPC-0902', '（欢喜合十）“多亏师兄妙计与一身好轻功！这桩夜雨擒贼的事迹方才已在寺里传开，连开封府来提审的捕头都直竖大拇指呢！”'),
      S('NPC-0378', '“师弟所摹的那卷赝本《华严经》笔力清健，净清舍不得焚毁，竟装裱起来留作警示了。至于那封牵涉姑苏慕容外围商号的密函，我已派快马星夜送回嵩山方丈室，必叫暗中图谋者无所遁形。”'),
    ],
    onFinishEffects: [openScene('scene_sls07_12', SHAOLIN_SIDE07_QUEST_ID)],
  },

  scene_sls07_12: {
    id: 'scene_sls07_12',
    title: '第十二幕 · 护经扬名',
    subtitle: '资圣八角琉璃宝塔',
    mandatory: true,
    beats: [
      S('NPC-0378', '“此役你护御赐佛经无损、生擒江南大盗踏云燕，不仅在少林记上一笔大功，更令汴京武林皆知嵩山内门后继有人。经书摹写与雨夜缠斗皆是难得历练，望师弟好生体悟！”'),
      P('（合十还礼）“护寺守经本是少林弟子分内之事，多谢慧禅师兄与净清师弟照拂！”'),
    ],
    choices: [
      {
        id: 'sls07_complete',
        label: '礼拜佛塔，记下姑苏慕容商号线索并收下宗门嘉奖！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 320, reason: '百尺飞檐雨夜生擒江南飞贼踏云燕' },
          { type: 'addSectContribution', amount: 130 },
          { type: 'addArtExp', amount: 100 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyRenown', delta: 35 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE07_QUEST_ID, outcome: 'completed' },
          toast(
            '【资圣宝塔 · 夜雨护经】圆满完结！书法精进、江湖声望大增，获宗门贡献 130 与武学阅历 100！',
            'success',
            '夜雨护经',
          ),
        ],
      },
    ],
  },
}
