import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q40_QUEST_ID } from './shaolinEndingVimalakirtiLaymanQuest'

const SPEAKER_LIAO_ENVOY: StorySpeakerSpec = {
  kind: 'custom',
  name: '大辽暗院使 · 耶律赤鹰',
  title: '辽国南院暗桩宗师',
  factionName: '大辽暗院',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

const SPEAKER_XIXIA_AGENT: StorySpeakerSpec = {
  kind: 'custom',
  name: '西夏黑莲客 · 拓跋冥',
  title: '一品堂暗杀供奉',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_ALLIANCE_ENVOYS: StorySpeakerSpec = {
  kind: 'custom',
  name: '三寺同盟高僧使节',
  title: '大相国寺 · 白马寺 · 莆田南少林代表',
  factionName: '天下佛门同盟',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_CONSERVATIVE_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '旧制长老 · 澄古',
  title: '少林经院宿老',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildLiaoEnvoyBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ40_LIAO_ENVOY',
    name: '大辽暗院使 · 耶律赤鹰',
    title: '辽国南院暗桩宗师',
    realm: '宗师中品',
    factionName: '大辽暗院',
    sectRank: 0,
    sectRankLabel: '暗院宗师',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“区区一个未剃度的白衣居士，也敢妄称少林之主？今日趁尔等内讧，本使便取下你的首级与藏经阁密卷，献予大辽南院大王！”',
    stats: { hp: 5720, mp: 5340, agi: 86, res: 77 },
    talents: { bone: 87, comprehension: 80, charm: 45 },
    equippedArts: { neigong: 'MA-060', move1: 'MA-045', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-060', level: 9 },
      { artId: 'MA-045', level: 9 },
      { artId: 'MA-085', level: 9 },
    ],
  })
}

function buildXixiaAgentBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ40_XIXIA_AGENT',
    name: '西夏黑莲客 · 拓跋冥',
    title: '一品堂暗杀供奉',
    realm: '宗师下品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '一品堂供奉',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“哈哈！大宋少林竟要靠一个俗家白衣撑场，看来中原武林气数已尽！受死吧！”',
    stats: { hp: 4860, mp: 4520, agi: 82, res: 72 },
    talents: { bone: 82, comprehension: 76, charm: 38 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-026', level: 8 },
      { artId: 'MA-055', level: 9 },
      { artId: 'MA-065', level: 8 },
    ],
  })
}

export const SHAOLIN_Q40_SCENES: Record<string, StorySceneDef> = {
  scene_slq40_01: {
    id: 'scene_slq40_01',
    title: '第一幕 · 禅堂争锋',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山云海翻腾。玄慈旧案既破，大雄正殿内檀烟凝滞，四十八房高僧与经院宿老爆发了五百年未有之大争论——你数载以来以俗家护法之身汴京护市、洛阳保佛、莆田联宗、执掌紫衣兵马，功勋早已冠绝全寺，然守旧宿老却死守「非剃度不得掌寺权」之陈规！'),
      S(SPEAKER_CONSERVATIVE_MONK, '（须发皆白，拍案而起声震殿梁）“荒谬！少林乃禅宗祖庭，岂可由一名蓄发未剃、身着白衣的俗家之人总摄少林兵权？若不落发披缁，老衲宁死不从！”'),
      S('NPC-0127', '（玄难望向缓步踏入殿门的一袭素白长衫，既忧且敬）“阿弥陀佛。澄古师兄莫动无明火，{gender:居士|女居士}为少林出生入死，经义禅心之深远非寻常可比，不妨听听{gender:他|她}的肺腑之言。”'),
      S('NPC-0112', '（退坐于殿角蒲团之上，灰袍清瘦却凝眸注视着你，轻叹出声）“老衲落发五十年，披着世间最尊贵的袈裟，却终究难断红尘一念。今日便在释迦金身之前，听听你如何破这相表之执罢。”'),
      N('万千青灰僧袍之间，你一袭纤尘不染的白衣、青玉簪束起长发，步至玉阶之前，直面满殿质疑目光。'),
    ],
    choices: [
      {
        id: 'slq40_accept_scripture',
        label: '【合十礼佛 · 典辩破执】向佛祖金身从容合十，请与经院宿老当堂论佛法真义',
        subLabel: '正式开启终局《不着袈裟 · 维摩护法》',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q40_QUEST_ID, stepId: 'vimalakirti_debate' },
          setStep(SHAOLIN_Q40_QUEST_ID, 'vimalakirti_debate'),
          { type: 'setFlag', flag: 'sl_q40_debate_triggered', value: true },
          toast('已开启终局《不着袈裟 · 维摩护法》！大雄正殿禅辩启幕！', 'talk', '维摩护法'),
          openScene('scene_slq40_02', SHAOLIN_Q40_QUEST_ID),
        ],
      },
      {
        id: 'slq40_accept_deed',
        label: '【昂然直视 · 反诘旧规】迎着守旧诸老灼灼目光，请诸位细辨「剃发之相」与「护法之心」',
        subLabel: '正式开启终局《不着袈裟 · 维摩护法》',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q40_QUEST_ID, stepId: 'vimalakirti_debate' },
          setStep(SHAOLIN_Q40_QUEST_ID, 'vimalakirti_debate'),
          { type: 'setFlag', flag: 'sl_q40_debate_triggered', value: true },
          toast('已开启终局《不着袈裟 · 维摩护法》！大雄正殿禅辩启幕！', 'talk', '维摩护法'),
          openScene('scene_slq40_02', SHAOLIN_Q40_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq40_02: {
    id: 'scene_slq40_02',
    title: '第二幕 · 维摩禅辩',
    subtitle: '大雄正殿 · 佛前蒲团（白衣大居士大殿禅辩）',
    illustrationUrl: '/assets/quests/sl_40_white_robe_zen.jpg',
    illustrationCaption: '大雄正殿 · 一袭白衣长发立于佛前，朗喝“心中有佛何必剃发”，引《维摩诘经》禅语震醒满寺高僧',
    mandatory: true,
    beats: [
      S(SPEAKER_CONSERVATIVE_MONK, '（冷哼一声，率十余名守旧宿老步步紧逼）“自古沙门剃发去饰，乃表断绝尘缘、不染俗尘之志！你带发入红尘、交游汴京公卿、联络外寺商旅，身披白衣而欲总摄少林兵权，岂不令达摩祖师蒙羞、天下禅林耻笑？！”'),
      N('满殿四十八房高僧鸦雀无声，齐齐望向玉阶中央孤绝清峻的白衣身影。澄古的质问字字紧扣五百年旧制，若不能从禅宗根本义理将其驳得心服口服，纵有盖世武功亦难服众僧之心！'),
      N('秋风穿殿拂动你的素白广袖。面对群老质疑，你朗声开口，掷出镇压满殿的核心驳论——'),
    ],
    choices: [
      {
        id: 'slq40_debate_vimalakirti',
        label: '“心净则佛土净！昔日维摩诘身居俗世、示有妻财而为十方菩萨上首；若只着剃发袈裟之相，反堕外道执着！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_vimalakirti_perfect', value: true },
          openScene('scene_slq40_03a', SHAOLIN_Q40_QUEST_ID),
        ],
      },
      {
        id: 'slq40_debate_power',
        label: '“乱世兵权自当以武功高低为尊！如今辽夏环伺、强敌在侧，谁能打退群魔谁便执掌大权，何必拘泥旧经陈规！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_vimalakirti_perfect', value: false },
          openScene('scene_slq40_03b', SHAOLIN_Q40_QUEST_ID),
        ],
      },
      {
        id: 'slq40_debate_court',
        label: '“朝廷敕牒与大相国寺皆认我紫衣都统名号！少林既处大宋疆域之内，祖制亦当顺应朝廷礼法变通！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_vimalakirti_perfect', value: false },
          openScene('scene_slq40_03b', SHAOLIN_Q40_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq40_03a: {
    id: 'scene_slq40_03a',
    title: '第三幕 · 振聋发聩',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（朗喝如雷，声震梁尘）“心中有佛，何必剃发！《维摩诘所说经》明言『虽处居家，不著三界』——若只知枯守缁衣之相、坐视内蠹丛生与辽夏铁骑践踏中原佛土，那便是有形无心之木偶！今日正需不拘僧俗、上通大相国寺、下联白马寺与莆田南少林，以入世之身行护法之实！”'),
      S('NPC-0112', '（浑身巨震，清泪陡然滑落两颊，合十长叹）“善哉……善哉！老衲半生拘泥于方丈袈裟之相，反落执念下乘！『心净则佛土净』——今日一辩，胜读三藏经卷三十年啊！”'),
      S('NPC-0127', '（玄难深深躬身赞叹，澄古长老亦呆立良久、终长叹低头）“居士引《维摩诘经》破执显真，直追六祖当年气象！老衲心服口服！”'),
      P('（缓和神色向四十八房拱手定策）“弟子无意强占方丈禅座！早课清修、传经讲法，弟子推举【玄难】师伯统领；而弟子愿以【白衣大居士】之名总摄少林僧兵与四寺天下同盟——清修归佛门，锋刃归白衣！”'),
      N('满殿高僧拍案叫绝！守旧成见烟消云散，四十八房齐声称善！'),
    ],
    onFinishEffects: [openScene('scene_slq40_04', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_03b: {
    id: 'scene_slq40_03b',
    title: '第三幕 · 玄难圆融',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('此言虽锋芒逼人，殿中数名经院宿老却纷纷皱眉摇头；澄古长老冷哼道：“以强权官势压寺，纵然势大，终究失了禅门圆融本味！”'),
      S('NPC-0127', '（玄难见机合十越众而出，温和却字字千钧地为你圆场）“阿弥陀佛！澄古师兄莫只听其锋芒——居士虽直言时局之急，其本心正合《维摩诘经》『虽处居家，不著三界』的入世护法大愿！况且外患在即，岂可因僧俗之见自缚手脚？”'),
      S(SPEAKER_CONSERVATIVE_MONK, '（沉默半晌，见玄慈亦在蒲团上微微颔首，终究长叹一声合十让步）“玄难师弟言之有理……只要寺内清修道统不乱，老朽便不再阻挠。”'),
      P('（向玄难感激一礼，旋即向四十八房郑重提议）“清修传法自当推举德高望重的【玄难】师伯主掌；弟子愿以【白衣大居士】之身对外统领僧兵、联络大相国寺、白马寺与莆田南少林四寺同盟——清修归佛门，锋刃归白衣！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_04', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_04: {
    id: 'scene_slq40_04',
    title: '第四幕 · 山门狼烟',
    subtitle: '大雄正殿 → 钟鼓禅院西廊',
    mandatory: true,
    beats: [
      N('正当大殿议定「僧俗相济、四寺结盟」大策之际，西侧钟鼓禅院骤然升起两道漆黑狼烟，伴随着凄厉胡哨与金铁交鸣！'),
      N('一名负伤武僧跌撞闯入急呼：“报——！两伙异域绝顶高手击伤外山哨僧、潜入钟鼓禅院演武坪，扬言要会一会少林新推举的『白衣护法』！”'),
      S('NPC-0134', '（玄寂急声起身）“辽夏暗使必是宗师级死士，居士切莫轻敌，老衲随你同往！”'),
      P('（眸中冷光如霜，大笑拂袖步出殿门）“鼻子倒灵！方才我才言『锋刃归白衣』，这第一战便由我白衣出阵，叫满寺高僧瞧瞧不着袈裟亦可伏魔！”'),
    ],
    choices: [
      {
        id: 'slq40_go_west',
        label: '白衣掠入【钟鼓禅院 · 演武坪】，力退窥伺山门的辽夏邪客！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q40_QUEST_ID, 'repel_liao_xixia'),
          toast('辽夏绝顶邪客正在【钟鼓禅院 · 演武坪】挑衅！速去迎战逐虏！', 'warn', '钟院逐虏'),
        ],
      },
    ],
  },

  scene_slq40_05: {
    id: 'scene_slq40_05',
    title: '第五幕 · 白衣伏魔',
    subtitle: '钟鼓禅院 · 演武坪（宗师级逐虏实战）',
    illustrationUrl: '/assets/quests/sl_40_vimalakirti_duel.jpg',
    illustrationCaption: '钟鼓禅院演武坪 · 一袭白衣迎风猎猎，主角孤身迎战大辽暗院使与西夏黑莲客',
    mandatory: true,
    beats: [
      N('秋风卷尘，白衣对黑袍。玄难、玄痛、玄寂及四十八房高僧尽数登廊观战，演武坪中央两名气息阴冷霸道的异域宗师早已负手静候。'),
      S(SPEAKER_LIAO_ENVOY, '（暗金契丹窄袖袍，鹰目阴鸷冷笑）“本使乃大辽南院暗院使【耶律赤鹰】！区区一个未剃度的白衣居士，也敢妄图联结中原四寺抗衡我大辽与西夏？”'),
      S(SPEAKER_XIXIA_AGENT, '（西夏黑莲弯刀墨雾缭绕，沙哑阴森）“在下西夏一品堂供奉【拓跋冥】。奉命绝不容中原佛门拧成一股绳——今日便拿你的白衣染血！”'),
      P('（负手微笑，白衣鼓荡如云龙出海）“大辽与西夏平日明争暗斗，今日为了拆我少林山门倒难得狼狈为奸。也罢，省得日后分头寻你们算账！”'),
    ],
    choices: [
      {
        id: 'slq40_fight_ambush',
        label: '【三寺暗哨 · 合围断路】扬笛召出预伏钟楼的大相国寺、白马寺与南少林暗哨困住拓跋冥，单挑耶律赤鹰！',
        subLabel: '需禅辩完胜或策论 ≥ 65 · 借三寺联防奇兵困死拓跋冥，1v1 直斩耶律赤鹰',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q40_vimalakirti_perfect', op: 'truthy', label: '大殿维摩禅辩完胜折服四十八房' },
            { type: 'skillAtLeast', key: '策论', min: 65 },
          ],
          hint: '需维摩禅辩完胜或策论 ≥ 65',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q40_battle_tactic', value: 'ambush' },
          toast('清越笛音响彻钟楼！预伏西廊的三寺护法精锐骤然结阵封锁退路、死死困住拓跋冥，你白衣迎风直取耶律赤鹰！', 'success', '三寺合围'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q40_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiaoEnvoyBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '满寺高僧与中原佛门声威尽在身后，绝不可退让半步！',
            introText: '【三寺暗哨合围 · 单挑暗使】困住西夏拓跋冥后，白衣迎战大辽暗院使【耶律赤鹰】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq40_06', SHAOLIN_Q40_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('耶律赤鹰契丹擒拿霸道绝伦，暂借身法卸劲回满再战！', 'warn', '钟院逐虏'),
            ],
          },
        ],
      },
      {
        id: 'slq40_fight_gauntlet',
        label: '【白衣独战 · 辽夏双使】不假外力，一袭白衣车轮连战【耶律赤鹰】与【拓跋冥】！（宗师车轮连战）',
        subLabel: '无门槛正攻 · 车轮连战辽夏两大宗师，斩断异域窥伺之谋',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_battle_tactic', value: 'gauntlet' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q40_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiaoEnvoyBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildXixiaAgentBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '满寺高僧与中原佛门声威尽在身后，绝不可退让半步！',
            introText: '【车轮连战 · 钟院逐虏】白衣孤身连战大辽暗院使【耶律赤鹰】与西夏黑莲客【拓跋冥】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq40_06', SHAOLIN_Q40_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('辽夏双雄攻势极为凌厉，暂借身法卸劲调息回满再战！', 'warn', '钟院逐虏'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq40_06: {
    id: 'scene_slq40_06',
    title: '第六幕 · 破阵逐虏',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q40_battle_tactic=ambush|激战四十余合，白衣竟不染一尘！你一记至阳般若神掌正面震伤耶律赤鹰双臂，回身拈花指隔空点落被三寺暗哨困得焦头烂额的拓跋冥弯刀，两位异域宗师齐齐喷血大骇！|激战四十余合，白衣竟不染一尘！你先以拈花指劲隔空点偏拓跋冥黑莲毒刀、震裂其肩胛，旋即化指为掌，至阳般若劲结结实实印在耶律赤鹰双掌之上，气浪掀翻青砖数丈！}'),
      S(SPEAKER_LIAO_ENVOY, '（捂胸喷血，满脸惊惧）“这等修为竟只是一个俗家白衣？！中原少林深不可测……撤！快撤！”'),
      S(SPEAKER_XIXIA_AGENT, '（掷出两枚黑烟弹仓皇掠墙遁走，嘶声放话）“今日之耻，一品堂赫连大将军必百倍讨还！”'),
      N('满廊四十八房高僧掌声与佛号齐鸣，澄古长老亦老泪纵横合十赞叹：“维摩大居士再世！真乃维摩大居士再世啊！”正当欢声震天之际，小沙弥疾奔来报：“启禀居士！玄慈老方丈自领戒杖之后油尽灯枯，听闻居士逐退强敌，含笑命请速返大雄正殿见最后一面！”'),
    ],
    choices: [
      {
        id: 'slq40_go_farewell',
        label: '急返【大雄正殿 · 佛前蒲团】，面见临终的玄慈方丈',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q40_QUEST_ID, 'kasaya_farewell'),
          toast('辽夏邪客已退！请速返【大雄正殿 · 佛前蒲团】见玄慈方丈最后一面！', 'talk', '愧赠袈裟'),
        ],
      },
    ],
  },

  scene_slq40_07: {
    id: 'scene_slq40_07',
    title: '第七幕 · 破执临终',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内灯火微明。玄慈已自领完戒律重杖，此刻斜倚蒲团呼吸微弱，叶二娘泪流满面守于榻旁。见你白衣步入，玄慈眸中绽出最后一片清明光彩。'),
      S('NPC-0112', '（虚弱抬手示意你近前，声音温和而彻底释然）“好孩子……老衲方才听见演武坪的欢呼了。你既未削发，也未着缁衣，却比老衲更配护持这千年祖庭。”'),
      P('（单膝跪于榻前，轻声宽慰）“方丈师伯言重了。没有师伯当年破格允我以俗家护法入寺、又破格授予紫衣都统兵权，便没有弟子的今日。”'),
      S('NPC-0112', '（微微笑着摇头）“老衲半生执着于『方丈』二字与身外袈裟之相，今日临终能见你以维摩大居士之身破除五百年成见，少林便真正活了。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_08', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_08: {
    id: 'scene_slq40_08',
    title: '第八幕 · 愧赠圣衣',
    subtitle: '大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_40_alliance_seal.jpg',
    illustrationCaption: '大雄正殿 · 玄慈方丈愧赠天阶圣衣《少林达摩袈裟》并托付少林同盟大印，含笑圆寂',
    mandatory: true,
    beats: [
      S('NPC-0112', '（命玄难捧来金纹流转的【少林达摩袈裟】与护法总印推至你手）“你既立志不着袈裟，老衲绝不强求你披于身上。但此件天阶【少林达摩袈裟】乃祖师圣物，今日便愧赠于你镇守同盟法坛——见此袈裟，如见达摩祖师亲临！”'),
      P('（双手郑重捧接圣衣，深深叩拜）“弟子谨领祖师圣衣！必以白衣护法、誓保少林千年不绝！”'),
      S('NPC-0112', '（最后望了叶二娘一眼，又望向释迦金身，唇边含笑低诵）“不著于相，如如不动……二娘，老衲此去无牵无挂了……南无阿弥陀佛……”'),
      S('NPC-0233', '（凄然一笑，轻抚玄慈渐冷的眉眼）“大哥，你终于肯放下了……奴家这就陪你走。”'),
      N('玄慈合目坐化，叶二娘亦决然自绝于蒲团之侧，随他同赴黄泉。满殿僧众齐诵往生咒，嵩山哀钟久久回荡于云海群峰之间。'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0112', 'NPC-0233'] },
      openScene('scene_slq40_09', SHAOLIN_Q40_QUEST_ID),
    ],
  },

  scene_slq40_09: {
    id: 'scene_slq40_09',
    title: '第九幕 · 推举玄难',
    subtitle: '大雄正殿 · 禅堂议事',
    mandatory: true,
    beats: [
      N('七日丧仪既毕，大雄正殿再开大议。你亲手将象征寺内早课、讲经与戒律清修的青玉禅杖奉至【玄难】大师面前。'),
      P('（朗声宣告）“佛门清修不可一日无主！玄难师伯德高望重、禅定精深，弟子推举由玄难师伯总领少林寺内早课清修与经院传法！”'),
      S('NPC-0127', '（合十受杖，郑重回礼）“阿弥陀佛。老衲便替居士守好这青灯古佛与早晚晨钟；至于少林千名僧兵与天下佛门同盟的兴亡大计，便全赖白衣大居士运筹帷幄了！”'),
      N('话音犹在殿宇回响，山门钟鼓齐鸣——你数载行走大宋南北结下的生死之交，此刻已汇成惊天巨流！汴京【大相国寺】、洛阳【白马寺】、福建【莆田南少林】三寺高僧使节齐携法牒敕书，齐聚嵩山少室峰！'),
    ],
    onFinishEffects: [openScene('scene_slq40_10', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_10: {
    id: 'scene_slq40_10',
    title: '第十幕 · 四寺来朝',
    subtitle: '大雄宝殿 · 殿前广场',
    mandatory: true,
    beats: [
      S(SPEAKER_ALLIANCE_ENVOYS, '（大相国寺监院、白马寺达摩脉长老与莆田南少林首座齐齐向你合十行大礼）“阿弥陀佛！昔年汴京雅市、洛阳龙门、莆田九莲山，皆蒙大居士力挽狂澜！今闻少林立『维摩护法』新制，我三寺愿尊白衣大居士为盟主，四寺同气连枝、共抗外侮！”'),
      N('大雄正殿前彩幡飘扬，晨钟暮鼓齐鸣！玄难、玄痛、玄寂与三寺使节分列两厢，恭请白衣大居士登坛受领天下佛门同盟大印！'),
      N('登坛受印之前，面对天下四大禅宗巨刹齐聚之盛景，你朗声亮出立盟誓言——'),
    ],
    choices: [
      {
        id: 'slq40_go_alliance_harmony',
        label: '【僧俗相济 · 圣衣镇坛】以达摩袈裟镇同盟法坛，宣明「清修归佛门、护法归白衣」万世盟约',
        subLabel: '登大雄正殿受领天下佛门同盟大印',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_oath_style', value: 'harmony' },
          setStep(SHAOLIN_Q40_QUEST_ID, 'alliance_command'),
          toast('请于【大雄正殿 · 佛前蒲团】受领同盟大印，成就白衣大居士终局！', 'success', '天下同盟'),
        ],
      },
      {
        id: 'slq40_go_alliance_defense',
        label: '【四寺联防 · 誓抗胡尘】宣明南北禅宗同气连枝，凡犯中原佛门一草一木者四寺共击之',
        subLabel: '登大雄正殿受领天下佛门同盟大印',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_oath_style', value: 'defense' },
          setStep(SHAOLIN_Q40_QUEST_ID, 'alliance_command'),
          toast('请于【大雄正殿 · 佛前蒲团】受领同盟大印，成就白衣大居士终局！', 'success', '天下同盟'),
        ],
      },
    ],
  },

  scene_slq40_11: {
    id: 'scene_slq40_11',
    title: '第十一幕 · 白衣盟主',
    subtitle: '大雄正殿 · 天下佛门同盟大典',
    illustrationUrl: '/assets/quests/sl_40_layman_banner.jpg',
    illustrationCaption: '嵩山大雄宝殿 · 白衣大居士高擎同盟金印，总摄嵩山少林僧兵与大相国寺、白马寺、莆田南少林天下同盟',
    mandatory: true,
    beats: [
      N('你一袭白衣胜雪，长发飘扬，亲手将【少林达摩袈裟】供奉于同盟法坛正中，随即高高举起象征四寺同心的鎏金护法大印！'),
      P('（朗声传谕天下）“今日嵩山少林寺、东京大相国寺、洛阳白马寺、莆田南少林四寺结盟！清修者安心参禅，护法者仗剑卫道！自今以后，凡我中原佛门一草一木，皆由白衣护法一力担之！”'),
      N('山呼海啸般的佛号响彻少室山巅！很快「不着袈裟，白衣维摩总摄四寺同盟」的传奇便传遍汴京朝堂与大江南北，礼部与枢密院更颁特敕赞许四寺护国安民！'),
      S('NPC-0127', '（玄难含笑望向演武坪整齐操演的僧兵与俗家护法）“早课诵经之声不绝于耳，练武护法之气直冲云霄——这才是佛法在世间最该有的模样啊。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_12', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_12: {
    id: 'scene_slq40_12',
    title: '第十二幕 · 同盟纲领',
    subtitle: '大雄正殿 · 四寺立纲（天下佛门同盟纲领抉择）',
    mandatory: true,
    beats: [
      N('盟典既成，三寺代表与少林俗家护法统领齐集法坛之下，请白衣大居士亲手书定《天下佛门同盟总纲》之首要主旨。'),
      S(SPEAKER_ALLIANCE_ENVOYS, '（合十拱手请示）“大居士，四寺香火遍及京畿、河洛与东南闽海，既可广开义途联络正派侠士，亦可互通南北绝学合练强兵——不知盟主欲定何者为首要纲领？”'),
      N('你手握同盟金印，俯瞰南北舆图，沉思片刻，择定白衣同盟首条铁纲——'),
    ],
    choices: [
      {
        id: 'slq40_policy_chivalry',
        label: '【护商安民 · 侠义结正】以四寺驿站护佑南北商旅香客，以侠义广联天下正道群豪！',
        subLabel: '行维摩入世度生之道，大增侠义声望与禅心慈悲',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_alliance_policy', value: 'chivalry' },
          openScene('scene_slq40_13', SHAOLIN_Q40_QUEST_ID),
        ],
      },
      {
        id: 'slq40_policy_militia',
        label: '【合练僧兵 · 北御辽夏】互通南北少林武库兵械、合练精锐护法僧兵，北御大辽西抗西夏！',
        subLabel: '铸就天下第一佛门雄师，大增门派贡献、威望与怒目杀业',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q40_alliance_policy', value: 'militia' },
          openScene('scene_slq40_13', SHAOLIN_Q40_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq40_13: {
    id: 'scene_slq40_13',
    title: '第十三幕 · 白衣大居士',
    subtitle: '藏经阁古杏微风 → 终局归位',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q40_alliance_policy=chivalry|同盟总纲传遍四海，四寺义驿遍护商旅百姓，中原正道群侠纷纷致书愿与白衣大居士同气连枝！|同盟总纲传遍四海，南北少林精锐合练护法僧兵，铁棍寒光照彻嵩山九莲，辽夏暗探无不震恐！}'),
      N('黄昏时分，你行经藏经阁古银杏树下，见扫地老僧法空正拄着竹帚静静望向满院金黄落叶。'),
      S('NPC-0101', '（微微含笑，目露深长赞许）“应无所住而生其心。不着袈裟，反得大自在。大居士好悟性。”'),
      N('入夜，你展开大相国寺与莆田南少林刚刚飞鸽传来的急报——拓跋冥逃回西夏后，一品堂统领赫连铁树震怒异常，正暗中联合星宿老怪丁春秋调集重兵欲血洗嵩山！你冷笑收信望向北天：“来得正好，便叫西夏一品堂见识见识白衣护法的锋芒！”'),
      N('【少林终局 · 白衣大居士】已然铸成！你不曾落发着缁，却以一袭白衣总摄少林僧兵与大相国寺、白马寺、莆田南少林天下同盟，登临少林 Lv.5 至尊掌门职级！'),
    ],
    choices: [
      {
        id: 'slq40_complete',
        label: '执同盟大印，正式登位少林【白衣大居士】（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 5, promoteOnly: true },
          { type: 'giveItem', itemId: 'ARM-004', qty: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q40_vimalakirti_perfect', op: 'truthy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
              { type: 'modifyRenown', delta: 40, reason: '大雄正殿引《维摩诘经》舌战群老破除五百年相执，禅誉震动中原' },
            ],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q40_alliance_policy', op: 'eq', value: 'chivalry' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              { type: 'modifyChivalry', delta: 60, reason: '颁定四寺同盟护商安民侠义纲领，普济南北正道' },
            ],
            elseEffects: [
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
              { type: 'addSectContribution', amount: 300 },
              { type: 'modifyRenown', delta: 40, reason: '颁定四寺合练僧兵纲领，北御大辽西抗西夏' },
            ],
          },
          { type: 'giveCombatExp', amount: 1600, reason: '维摩禅辩破执、白衣力退辽夏并总摄天下佛门四寺同盟' },
          { type: 'modifyRenown', delta: 320, reason: '以白衣大居士总摄少林僧兵与大相国寺、白马寺、莆田南少林天下同盟' },
          { type: 'modifySkill', key: '辩才', delta: 2 },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'setFlag', flag: 'sl_ending', value: 'vimalakirti_layman' },
          { type: 'completeQuest', questId: SHAOLIN_Q40_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《不着袈裟 · 维摩护法》！晋升少林 Lv.5 白衣大居士，获天阶圣衣【少林达摩袈裟】，威望 +320！',
            'success',
            '白衣大居士',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_Q40_SCENES
