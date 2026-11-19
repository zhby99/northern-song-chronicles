import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q41_QUEST_ID } from './zhongnanTaiyiSummitQuest'

const TITLE_EXPR =
  '{ifQuestDone:QST-SECT-11-36|终南重阳掌教|}{ifQuestDone:QST-SECT-11-37|古墓寒玉传人|}{ifQuestDone:QST-SECT-11-38|终南太乙共主|}{ifQuestDone:QST-SECT-11-39|太乙隐逸剑尊|}'

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn41_01: {
    id: 'scene_zn41_01',
    title: '第一幕 · 重阳云海',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q41_chongyang_clouds.jpg',
    illustrationCaption: '重阳佳节云海漫卷太乙峰，银练飞瀑旁松风煮茗迎四海高人',
    mandatory: true,
    beats: [
      N('{reignYear}九月初九，重阳佳节。终南后山寒玉涧晨雾初散，万壑松涛如潮，银练飞瀑垂落碧潭，水雾在朝阳下折射出七彩长虹。'),
      N('飞瀑旁的青石茗案上，紫砂炉火正旺，松针山泉咕嘟作响。一位身着洗白儒袍、气度渊深如海的中年文士负手观瀑，正是编纂《万寿道藏》而悟出绝世武理的奇人——黄裳！'),
      S(
        'NPC-0107',
        `（转身微笑拱手，目光温润却似能洞彻人心）“久仰${TITLE_EXPR}贺兰破冰之威。黄某久居东南翻阅道藏，闻听重阳终南有太乙论道盛会，特不远万里而来，讨一杯终南清泉松茗，顺道作个见证。”`,
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_02', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_02: {
    id: 'scene_zn41_02',
    title: '第二幕 · 道藏真君',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P(
        '（连忙还以大礼，亲手斟上一盏刚沏好的寒涧松茗）“黄先生乃当世道藏宗师，肯屈尊驾临终南见证论道，实乃我山门百年荣幸！请用茶。”',
      ),
      S(
        'NPC-0107',
        '（轻啜一口，颔首赞叹）“茶清冽而回甘，恰如终南武道——外隐烟霞，内藏乾坤。老夫一路上山，已见三位气机极盛的高手先后入谷，今日这场太乙论道，怕是几十年来中原武林最精彩的一局了。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_03', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_03: {
    id: 'scene_zn41_03',
    title: '第三幕 · 碧箫穿云',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('话音未落，山谷东侧忽然飘来一阵悠扬清越的玉箫声！箫音忽如东海潮生，忽如桃花纷落，竟与寒玉涧飞瀑水声严丝合缝，丝毫不乱。'),
      N('一袭青衫的东海奇侠冯默岚踏着满地金桂飘然而至，手持碧玉长箫，洒脱不羁地向石案拱手一笑。'),
      S(
        'NPC-0115',
        '（朗声大笑）“哈哈哈哈！好一个银练飞瀑、寒涧松茗！东海冯默岚闻听终南{gender:少侠|女侠}在西夏寒玉冰窖一剑折服逍遥派李太妃，心痒难耐，特携玉箫剑意前来请教！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_04', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_04: {
    id: 'scene_zn41_04',
    title: '第四幕 · 梵唱炽风',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('箫声方歇，西侧松林间又响起浑厚高亢的密宗梵唱，一股炙热燥风扑面而来，竟将飘落的寒涧水雾瞬间蒸成白烟！'),
      N('身披明黄织金袈裟、宝相庄严的吐蕃国师大轮明王鸠摩智合十缓步而来，周身佛光与炙热罡气隐隐流转。'),
      S(
        'NPC-0113',
        '（合十微笑，眼底锋芒难掩）“阿弥陀佛。小僧鸠摩智久仰终南道脉与古墓绝学，今日重阳胜会，恰逢黄裳先生与冯施主在座，小僧愿以吐蕃火焰刀，向终南高人讨教三招两式！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_05', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_05: {
    id: 'scene_zn41_05',
    title: '第五幕 · 潜龙登谷',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('鸠摩智刚落座不久，山涧北岸古松影中无声无息多出了一位灰袍老者。他步履沉稳如山，目光深邃难测，明明立在众人眼前，气机却宛若潜龙藏渊，令人心生敬畏。'),
      N('来者正是纵横江湖数十载、隐于幕后的姑苏慕容氏家主——「燕山潜龙」慕容博！'),
      S(
        'NPC-0104',
        '（负手微哂，气度雍容）“姑苏慕容博不请自来，幸未错过重阳佳茗。终南隐宗向来深藏不露，如今既在兴庆府露了锋芒，老夫自然要来瞧一瞧，究竟是终南玄门更胜一筹，还是我慕容氏『以彼之道、还施彼身』独步天下。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_06', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_06: {
    id: 'scene_zn41_06',
    title: '第六幕 · 四海宗师齐聚',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q41_masters_gather.jpg',
    illustrationCaption: '黄裳执盏作证，冯默岚、鸠摩智、慕容博三大绝顶宗师齐聚寒玉涧',
    mandatory: true,
    beats: [
      N('一时间，终南后山寒玉涧内群星璀璨：道藏真君黄裳居中品茗，东海冯默岚、吐蕃鸠摩智、姑苏慕容博分列三方，而终南王处阳、孙清静、冷清秋亦立于青松之下观礼，气势之盛，堪称百年未有！'),
      S(
        'NPC-1057',
        '（低声感叹）“东海奇侠、大轮明王、燕山潜龙齐至，更有黄裳先生亲临作证……今日之后，天下武林格局必将因终南而定！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_07', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_07: {
    id: 'scene_zn41_07',
    title: '第七幕 · 论道之约',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      S(
        'NPC-0107',
        '（放下茶盏，朗声定约）“既然诸位高人皆为论道而来，黄某便斗胆拟个规矩：移步繁花幽谷双剑合璧坪，以武印心、点到为止。每战之后皆有清泉松茗奉上，容主人调息复元，不使车轮之战失了公允。诸位以为如何？”',
      ),
      S('NPC-0115', '“正合我意！冯某性子急，便由我先领教第一阵！”'),
      S('NPC-0113', '“善哉，小僧愿居其次。”'),
      S('NPC-0104', '“既如此，老夫便压轴领教终南绝学！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_08', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_08: {
    id: 'scene_zn41_08',
    title: '第八幕 · 移步剑坪',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P(
        '（从容起身，整肃素袍，向黄裳与三位绝顶宗师一拱手）“承蒙三位前辈厚爱、黄先生见证！请移步繁花幽谷双剑合璧坪，且让晚辈以终南三尺剑，敬候东海冯前辈高招！”',
      ),
    ],
    choices: [
      {
        id: 'zn41_go_feng',
        label: '移步【繁花幽谷双剑合璧坪】，首战东海奇侠冯默岚',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q41_QUEST_ID, stepId: 'duel_feng_molan' },
          setStep(ZHONGNAN_Q41_QUEST_ID, 'duel_feng_molan'),
          toast(
            '太乙论道盛会已启！请前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】迎战冯默岚。',
            'talk',
            '太乙论道',
          ),
        ],
      },
    ],
  },

  scene_zn41_09: {
    id: 'scene_zn41_09',
    title: '第九幕 · 繁花剑坪',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('繁花幽谷双剑合璧坪宽阔平坦，四周桂子飘香，山风拂过，落英缤纷如雨。黄裳与终南诸老立于坪边青石观战，鸠摩智与慕容博亦各负手静观。'),
      S(
        'NPC-0115',
        '（步入坪中，手中碧玉箫轻挽剑花，青衫飘举如仙）“东海桃花岛武学讲求奇门八卦、虚实相生，以音律融剑意。今日能与终南绝顶传人在这繁花幽谷论剑，真乃人生快事！接我一招『落英缤纷』！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_10', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_10: {
    id: 'scene_zn41_10',
    title: '第十幕 · 箫剑潮生',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('冯默岚足踏奇门方位，身形如柳絮穿花，玉箫点处竟带起漫天桂花瓣化作数十道虚实莫辨的碧影，直逼你周身要害！'),
      P('（心神澄明，长剑轻吟出鞘）“好俊的奇门剑意！冯前辈，晚辈得罪了！”'),
    ],
    choices: [
      {
        id: 'zn41_fight_feng',
        label: '拔剑登坪，与东海奇侠【冯默岚】论剑！（第一阵 · 战前全满）',
        subLabel: '对手：冯默岚（宗师中品）· 战前气血内力全满',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q41_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0115' },
            rule: 'story_trial',
            forbidEscapeReason: '太乙论道群雄环伺，岂可临阵退场！',
            introText: '【太乙论道 · 第一阵】于繁花幽谷双剑合璧坪，迎战东海奇侠【冯默岚】！',
            onWin: [openScene('scene_zn41_11', ZHONGNAN_Q41_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '冯默岚奇门箫剑变幻莫测，此阵暂且落败！饮茶调息后再登剑坪重论高下！',
                'warn',
                '太乙论道',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '与冯默岚战成平手！调息后再登剑坪分出胜负！',
                'warn',
                '太乙论道',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_zn41_11: {
    id: 'scene_zn41_11',
    title: '第十一幕 · 落英破阵',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q41_duel_feng.jpg',
    illustrationCaption: '碧玉箫影与终南青锋交错繁花之间，桂雨纷飞如画',
    mandatory: true,
    beats: [
      N('剑坪上青光碧影纵横交错！冯默岚的玉箫剑法夹杂碧海潮生真气，招招暗合五行生克，连绵不绝如浪拍礁石。'),
      N('你却稳守中宫，以天罡北斗步法反破奇门方位，长剑一抖化作万千清霜剑丝，将漫天飞舞的桂花落英尽数定于半空，随即剑尖轻点其碧玉箫尾三寸！'),
    ],
    onFinishEffects: [openScene('scene_zn41_12', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_12: {
    id: 'scene_zn41_12',
    title: '第十二幕 · 碧箫折服',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('叮的一声清鸣，碧玉箫微微一震，冯默岚飘然倒退三步，满天定格的桂花瓣簌簌坠落青石坪，铺成一片金毯。'),
      S(
        'NPC-0115',
        '（收箫抚掌，爽朗大笑）“妙极！妙极！以天罡北斗破我奇门八卦，以静制动、化繁为简，冯某输得心服口服！终南剑道，果然名不虚传！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_13', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_13: {
    id: 'scene_zn41_13',
    title: '第十三幕 · 东海赠言',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P('（收剑拱手）“冯前辈箫剑双绝、潇洒出尘，晚辈不过侥幸占了地利之便，承让了！”'),
      S(
        'NPC-0115',
        '（笑望一眼身旁合十待战的鸠摩智，低声提点）“{gender:少侠|女侠}莫谦。下面那位吐蕃明王掌力酷烈炽热，兼通中原多家绝学，千万不可轻敌！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_14', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_14: {
    id: 'scene_zn41_14',
    title: '第十四幕 · 松茗调息',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('黄裳微笑点头，命终南道童奉上两盏刚汲取的寒玉涧清泉松茗。你与冯默岚各饮一盏，清冽灵泉入喉，适才激战消耗的真气瞬息复元如初。'),
      S('NPC-0107', '“第一阵，奇正相生，堪称绝唱。诸位请看第二阵！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_15', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_15: {
    id: 'scene_zn41_15',
    title: '第十五幕 · 明王起身',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('鸠摩智缓缓起身，明黄袈裟无风自动。他行至坪中，双掌合十微微一礼，虽然笑容和煦，周身散发出的炽烈佛门罡气却令四周桂树枝叶瞬间微卷！'),
      S(
        'NPC-0113',
        '“阿弥陀佛。方才观赏{gender:少侠|女侠}与冯施主论剑，小僧大开眼界。只是吐蕃密宗武学刚猛无俦，最擅破除精巧剑阵，还望施主小心了！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_16', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_16: {
    id: 'scene_zn41_16',
    title: '第十六幕 · 小无相暗涌',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你凝神细察鸠摩智周身气机，心中忽地一动——他看似施展的是至阳至刚的吐蕃密宗内力，底子里却隐隐透出一丝似曾相识的圆融无相之韵，竟与西夏寒玉冰窖中李秋水的「小无相功」同源！'),
      P('（心中雪亮，淡然微笑）“大轮明王竟也兼修道家无相妙法，催动西域火焰刀，当真博采众长。晚辈愿领教明王高招！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_17', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_17: {
    id: 'scene_zn41_17',
    title: '第十七幕 · 慧眼惊明王',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S(
        'NPC-0113',
        '（脸色微不可察地一变，旋即恢复庄严宝相，心中暗惊）“好毒的眼力！竟一眼便看破小僧以小无相功催动火焰刀的底细！既然如此，小僧便更不敢藏拙了！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_18', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_18: {
    id: 'scene_zn41_18',
    title: '第十八幕 · 炽焰登坪',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你调匀呼吸，将气血与内息尽数恢复巅峰，准备迎接大轮明王鸠摩智的第二阵论道！'),
    ],
    choices: [
      {
        id: 'zn41_step_jiumozhi',
        label: '稳固真气，准备迎战吐蕃大轮明王鸠摩智',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          setStep(ZHONGNAN_Q41_QUEST_ID, 'duel_jiumozhi'),
          openScene('scene_zn41_19', ZHONGNAN_Q41_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn41_19: {
    id: 'scene_zn41_19',
    title: '第十九幕 · 火焰刀罡',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('鸠摩智双掌平推，两道炽热无比的赤金色无形刀罡凭空凝结，灼得空气噼啪作响，挟雷霆万钧之势向你劈落！'),
      S('NPC-0113', '“接小僧一式『大日火焰刀』！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_20', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_20: {
    id: 'scene_zn41_20',
    title: '第二十幕 · 寒锋破焰',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P('（长剑直指长空，终南至纯玄气化作清冷寒泉之势迎向烈焰）“明王请！”'),
    ],
    choices: [
      {
        id: 'zn41_fight_jiumozhi',
        label: '迎击吐蕃大轮明王【鸠摩智】！（第二阵 · 战前全满）',
        subLabel: '对手：鸠摩智（宗师中品）· 战前气血内力全满',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q41_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0113' },
            rule: 'story_trial',
            forbidEscapeReason: '太乙论道正值高潮，岂可退却！',
            introText: '【太乙论道 · 第二阵】于繁花幽谷双剑合璧坪，迎战吐蕃大轮明王【鸠摩智】！',
            onWin: [openScene('scene_zn41_21', ZHONGNAN_Q41_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '鸠摩智火焰刀刚猛炽烈，此阵暂且受挫！调息后再登剑坪再战明王！',
                'warn',
                '太乙论道',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '与鸠摩智激斗难分高下！调息后再登剑坪一决胜负！',
                'warn',
                '太乙论道',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_zn41_21: {
    id: 'scene_zn41_21',
    title: '第二十一幕 · 水火既济',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q41_duel_jiumozhi.jpg',
    illustrationCaption: '赤金火焰刀罡漫卷剑坪，青霜剑芒如银练断火，水火激荡轰鸣',
    mandatory: true,
    beats: [
      N('一时间剑坪上热浪与寒芒交击！鸠摩智连番变招，时而火焰刀劈山断岳，时而暗夹少林拈花指、多罗叶指虚招，令人防不胜防！'),
      N('你却曾于西夏寒玉冰窖亲身领教过最纯正的小无相功，早已洞悉其劲力流转之枢纽。长剑划出一道圆融太极剑环，顺势牵引其赤金刀罡冲天而散，随即剑脊轻敲其腕脉！'),
    ],
    onFinishEffects: [openScene('scene_zn41_22', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_22: {
    id: 'scene_zn41_22',
    title: '第二十二幕 · 烈焰归寂',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('轰然一声气爆，炽热刀气在半空化作万点金星消散无踪。鸠摩智连退五步方才稳住身形，明黄袈裟袖口被剑风划开一道细纹，面上尽是惊叹之色！'),
      S(
        'NPC-0113',
        '（收掌合十，深深低头赞叹）“阿弥陀佛！小僧行走中原以来，能正面化解火焰刀者屈指可数；能一眼洞穿小僧真气枢纽、以柔克刚令烈焰归寂者，{gender:少侠|女侠}实乃第一人！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_23', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_23: {
    id: 'scene_zn41_23',
    title: '第二十三幕 · 佛道相印',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P(
        '（还礼微笑）“明王佛法精深、武功博大，只是强以道家无相之力催逼佛门刚猛绝技，长久以往恐伤经脉本源，还望明王珍重法体。”',
      ),
      S(
        'NPC-0113',
        '（闻言身躯微微一震，双眸霎时清亮了几分，郑重稽首）“善哉！一语惊醒梦中人！小僧贪求天下绝学，险些着了相。今日终南一战，胜读十年禅卷，多谢施主点拨！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_24', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_24: {
    id: 'scene_zn41_24',
    title: '第二十四幕 · 黄裳评剑',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S(
        'NPC-0107',
        '（抚掌赞道）“以武证道，不以力服人而以理服人。方才这一战，连黄某也觉胸中滞碍顿开！来人，再奉寒涧清茗！”',
      ),
      N('你接过清茶一饮而尽，略作吐纳，周身真气再度盈满如潮。此时，坪边唯余最后一位、也是气息最深不可测的绝顶宗师尚未出手。'),
    ],
    onFinishEffects: [openScene('scene_zn41_25', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_25: {
    id: 'scene_zn41_25',
    title: '第二十五幕 · 潜龙出渊',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('灰袍微动，姑苏「燕山潜龙」慕容博缓步踏入双剑合璧坪中央。他一入场，整座幽谷的清风仿佛骤然凝滞，连飞瀑轰鸣都似远去了几分！'),
      S(
        'NPC-0104',
        '（目光如鹰隼般锁定着你，语声低沉而极具压迫感）“冯兄奇门潇洒，国师烈焰雄浑，却都未能逼出你的真正底牌。终南隐宗千年不世出的绝顶人物，老夫今日倒要亲自称一称你的斤两！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_26', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_26: {
    id: 'scene_zn41_26',
    title: '第二十六幕 · 斗转悬空',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('慕容博并不拔兵刃，只负左手、抬右手，十指微曲之间，周身三尺内竟隐隐形成一股无形气旋——正是姑苏慕容氏震古烁今的绝学「斗转星移」与「参合指」！'),
      S(
        'NPC-0107',
        '（神色凝重地轻声道）“慕容先生的『斗转星移』已臻化境，寻常招式越猛，反噬越重。这一阵，才是真正考验终南武道极境的巅峰之战！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_27', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_27: {
    id: 'scene_zn41_27',
    title: '第二十七幕 · 剑心无垢',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P(
        '（凝视慕容博，长剑斜垂，心中忽生万丈豪情）“慕容前辈『以彼之道、还施彼身』名震天下；然终南之道，本自虚无生万物，万物归虚无。若剑无定势、气无滞碍，不知前辈又该如何借力挪移？”',
      ),
      S('NPC-0104', '（双眸精光暴涨，罕见地动容大笑）“好大的口气！那便接老夫这三十年潜修的参合指与斗转星移！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_28', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_28: {
    id: 'scene_zn41_28',
    title: '第二十八幕 · 压轴决战',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你深吸终南山间清气，气血内力圆融无缺，迎向太乙论道压轴一战！'),
    ],
    choices: [
      {
        id: 'zn41_step_murong',
        label: '凝神聚意，准备压轴迎战燕山潜龙慕容博',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          setStep(ZHONGNAN_Q41_QUEST_ID, 'duel_murong_bo'),
          openScene('scene_zn41_29', ZHONGNAN_Q41_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn41_29: {
    id: 'scene_zn41_29',
    title: '第二十九幕 · 参合惊雷',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('慕容博凌空虚点，三道无形参合指劲破空尖啸，竟从三个刁钻角度封死你所有退路；与此同时他左掌暗蓄斗转气旋，只等你出剑反击便借力回敬！'),
      P('（长剑轻震，清音直冲云霄）“慕容前辈，请接终南极境一剑！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_30', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_30: {
    id: 'scene_zn41_30',
    title: '第三十幕 · 巅峰对决',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('终南太乙之巅，两代绝顶宗师正面交锋！'),
    ],
    choices: [
      {
        id: 'zn41_fight_murong',
        label: '全力以赴，决战燕山潜龙【慕容博】！（压轴阵 · 战前全满）',
        subLabel: '对手：慕容博（宗师上品）· 战前气血内力全满',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q41_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0104' },
            rule: 'story_trial',
            forbidEscapeReason: '太乙压轴巅峰一战，唯以剑心定乾坤！',
            introText: '【太乙论道 · 压轴决战】于繁花幽谷双剑合璧坪，迎战姑苏燕山潜龙【慕容博】！',
            onWin: [openScene('scene_zn41_31', ZHONGNAN_Q41_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '慕容博斗转星移与参合指深不可测！饮茶调息后再登剑坪，必能破其气旋！',
                'warn',
                '太乙论道',
              ),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '与慕容博鏖战平分秋色！调息后再登剑坪分出最后高下！',
                'warn',
                '太乙论道',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_zn41_31: {
    id: 'scene_zn41_31',
    title: '第三十一幕 · 星移剑转',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q41_duel_murong.jpg',
    illustrationCaption: '斗转星移气旋撕裂云雾，太乙剑意空灵无迹，直透潜龙中宫',
    mandatory: true,
    beats: [
      N('剑坪之上风云变色！慕容博的斗转星移果然神鬼莫测，你前十余剑无论刚猛还是轻灵，劲力刚触及其衣袖三寸，便被那股螺旋奇劲牵引偏转，反朝你自己回卷而来！'),
      N('激战至第三十合，你忽地灵台澄明如镜，彻底放下胜负执念——剑尖再不蓄一分拙力，反而顺着终南山风、寒涧水势浑然天成，似有若无、似实还虚，恰如太乙大道无形无象！'),
    ],
    onFinishEffects: [openScene('scene_zn41_32', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_32: {
    id: 'scene_zn41_32',
    title: '第三十二幕 · 无招破星移',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('慕容博双掌连转，竟惊骇发现你这一剑之中全无着力之处！斗转星移无力可借，反倒自身气旋露出了一丝微不可察的缝隙！'),
      N('电光石火间，你的剑尖已穿透漫天指影，轻飘飘停在慕容博眉心三寸之外，剑气微吐，将他额前一缕银发悄然拂起，却未伤其分毫皮肤！'),
    ],
    onFinishEffects: [openScene('scene_zn41_33', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_33: {
    id: 'scene_zn41_33',
    title: '第三十三幕 · 潜龙叹服',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('全场鸦雀无声，唯有银练飞瀑轰鸣如雷。慕容博凝视着眉心前纹丝不动的青锋剑尖，沉默良久，终是缓缓散去周身斗转气旋，长叹一声。'),
      S(
        'NPC-0104',
        '（拱手肃然，生平罕见地露出诚服之色）“以无劲破借力，以太乙自然破斗转星移……好！好一个终南绝境！老夫潜修数十载，自问天下英雄难入法眼，今日在终南双剑坪，确是输了半筹！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_34', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_34: {
    id: 'scene_zn41_34',
    title: '第三十四幕 · 三战皆胜',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q41_victory_ovation.jpg',
    illustrationCaption: '三战连胜四海宗师，终南群道欢呼震谷，漫山红叶随风起舞',
    mandatory: true,
    beats: [
      N('你收剑归鞘，向慕容博深深还礼。刹那间，观战的终南众弟子与诸位长老爆发出震彻山谷的欢呼声！'),
      S('NPC-0115', '（抚掌大笑）“连战东海、吐蕃、姑苏三大宗师而无一败绩！今日之后，天下谁人不知终南太乙之名！”'),
      S('NPC-0113', '（合十叹道）“阿弥陀佛，小僧此行虽败犹荣，得见真道，不虚此生！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_35', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_35: {
    id: 'scene_zn41_35',
    title: '第三十五幕 · 黄裳印道',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('一直静观的黄裳缓步走入剑坪，眼中闪烁着由衷的欣喜与敬重。'),
      S(
        'NPC-0107',
        '（朗声宣道）“黄某编纂《万寿道藏》数十载，常思道家『损之又损，以至于无为』落在武学之上究竟是何等气象。今日观{gender:少侠|女侠}三战三捷，破奇门、化烈焰、解斗转，方知大道至简，确在终南！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_36', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_36: {
    id: 'scene_zn41_36',
    title: '第三十六幕 · 邀归飞瀑',
    subtitle: '终南山隐宗 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-1059', '（微笑上前）“山中备下重阳菊酒与寒涧松茗，请黄先生、冯前辈、明王、慕容前辈移步银练飞瀑石茗案，共叙武道！”'),
      P('（朗声相邀）“诸位前辈请！今日不问恩怨，只论山水清风与大道长存！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_37', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_37: {
    id: 'scene_zn41_37',
    title: '第三十七幕 · 众星同归',
    subtitle: '终南山隐宗 · 寒玉涧石径',
    mandatory: true,
    beats: [
      N('一行绝世高人沿寒玉涧石径缓步而行，夕阳余晖洒在众人的衣袍之上，仿佛将这场千载难逢的重阳盛会镀上了一层金边。'),
    ],
    onFinishEffects: [openScene('scene_zn41_38', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_38: {
    id: 'scene_zn41_38',
    title: '第三十八幕 · 飞瀑设席',
    subtitle: '终南山隐宗 · 寒玉涧石径',
    mandatory: true,
    beats: [
      N('银练飞瀑前已摆好重阳清宴，松风与瀑声相和，正待你前去主持这终南封神的最后一幕。'),
    ],
    choices: [
      {
        id: 'zn41_go_coronation',
        label: '前往【银练飞瀑清泉石茗案】，共结重阳太乙盛会',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q41_QUEST_ID, 'taiyi_coronation'),
          toast(
            '三战皆捷，群雄折服！请前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】共结太乙盛会。',
            'success',
            '太乙论道',
          ),
        ],
      },
    ],
  },

  scene_zn41_39: {
    id: 'scene_zn41_39',
    title: '第三十九幕 · 飞瀑煮茗',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q41_waterfall_tea.jpg',
    illustrationCaption: '银练飞瀑之下，黄裳与四海宗师举盏共饮重阳松茗',
    mandatory: true,
    beats: [
      N('暮色初合，银练飞瀑前燃起数盏松油石灯，暖黄灯火映照着晶莹水雾。黄裳、冯默岚、鸠摩智、慕容博与终南诸老围坐石案，举杯共饮重阳菊酒与寒涧清茗。'),
      S('NPC-0115', '（举杯遥敬）“冯某行走江湖半生，从未见过今日这般痛快淋漓的论道盛会！待明年春暖桃花开时，望{gender:少侠|女侠}务必来东海一游！”'),
      S('NPC-0104', '（端盏微颔）“江南燕子坞亦随时恭候大驾。今日一别，老夫亦当重参武学本源，不再拘泥于旧日执念了。”'),
    ],
    onFinishEffects: [openScene('scene_zn41_40', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_40: {
    id: 'scene_zn41_40',
    title: '第四十幕 · 题壁太乙',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('酒过三巡，黄裳兴致大发，起身以指代笔，运起浑厚道家真气在飞瀑旁的千年青玉石壁之上凌空挥毫！石屑纷飞间，八个苍劲飞扬、道韵天成的大字赫然铭刻石上：'),
      S('NPC-0107', '“『云深不知 · 太乙冠世』！此八字，便赠予终南隐宗与今日论道魁首，留待后世江湖瞻仰！”'),
    ],
    onFinishEffects: [openScene('scene_zn41_41', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_41: {
    id: 'scene_zn41_41',
    title: '第四十一幕 · 宾客辞山',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('月上中天，清辉满谷。冯默岚长啸一声御箫而去，鸠摩智合十诵偈西返，慕容博挥袖隐入松影，黄裳亦微笑拱手相约他日再论道藏。'),
      N('四海绝顶高人尽兴而归，唯余终南山月色如水，清风徐来。'),
    ],
    onFinishEffects: [openScene('scene_zn41_42', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_42: {
    id: 'scene_zn41_42',
    title: '第四十二幕 · 宗门共尊',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('王处阳、孙清静、冷清秋率领终南两脉长老弟子齐齐整衣上前，向你深深一揖。'),
      S(
        'NPC-1057',
        `“自贺兰破冰至太乙论道，${TITLE_EXPR}以无上武道与澄明道心，为终南隐宗立下不世奇功！从此秦岭青松长青，重阳与古墓同辉！”`,
      ),
      S(
        'NPC-0173',
        '（罕见地展颜一笑，如寒谷幽兰绽放）“云深不知处，只在此山中。终南有你，百年无忧。”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_43', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_43: {
    id: 'scene_zn41_43',
    title: '第四十三幕 · 四脉归心',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q41_taiyi_apotheosis.jpg',
    illustrationCaption: '明月悬照终南太乙峰，白衣剑尊独立飞瀑绝顶，俯瞰千里秦川',
    mandatory: true,
    beats: [
      N(
        `你独立银练飞瀑之畔，回望一路走来的风雨岁月——从初入秦岭采药听风，到历经关中风云、贺兰破冰、重阳论道，无论世人唤你「${TITLE_EXPR}」抑或「太乙剑尊」，你心中所守，始终是那份不为尘嚣所染的澄明道心。`,
      ),
      P(
        '（举盏遥敬天上明月，淡然一笑）“功名浮云过眼，唯有青山常在、明月长明。愿我终南一脉，守此清风百代不绝！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zn41_44', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_44: {
    id: 'scene_zn41_44',
    title: '第四十四幕 · 名垂青史',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('这一年重阳，「太乙论道」之盛事迅速传遍大宋十三路与辽、夏、吐蕃、大理四方江湖。世人皆知：天下武林除少林、丐帮、逍遥、华山之外，秦岭云深之处，尚有一座超然物外、冠绝当世的终南隐宗！'),
    ],
    onFinishEffects: [openScene('scene_zn41_45', ZHONGNAN_Q41_QUEST_ID)],
  },

  scene_zn41_45: {
    id: 'scene_zn41_45',
    title: '第四十五幕 · 云深不知处',
    subtitle: '终南山隐宗 · 银练飞瀑清泉石茗案',
    illustrationUrl: '/assets/quests/zn_q41_eternal_pine.jpg',
    illustrationCaption: '太乙云深松风万里，终南隐宗超然封神，传奇永载史册',
    mandatory: true,
    beats: [
      N('山风吹过石壁上黄裳亲题的「云深不知 · 太乙冠世」八字，清泉长流，松涛不绝。终南隐宗传奇，至此功德圆满、超然封神！'),
    ],
    choices: [
      {
        id: 'zn41_complete',
        label: '铭刻太乙论道盛典，成就终南隐宗超然封神之誉',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_q41_taiyi_summit_cleared', value: true },
          { type: 'giveCombatExp', amount: 2400, reason: '云深不知 · 太乙论道封神' },
          { type: 'modifyRenown', delta: 360, reason: '重阳太乙论道连胜三大宗师' },
          { type: 'modifyChivalry', delta: 100, reason: '以武证道、超然物外' },
          { type: 'addSectContribution', amount: 1800 },
          { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-102', qty: 1 },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'completeQuest', questId: ZHONGNAN_Q41_QUEST_ID, outcome: 'taiyi_apotheosis' },
          toast(
            '【云深不知 · 太乙论道】圆满封神！终南隐宗声威冠绝天下，「太乙冠世」之名永载江湖史册！',
            'success',
            '终南封神',
          ),
        ],
      },
    ],
  },
}
