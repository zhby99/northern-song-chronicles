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
    equippedArts: { neigong: 'MA-018', qinggong: 'MA-077', move1: 'MA-045', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-018', level: 9 },
      { artId: 'MA-077', level: 9 },
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
    equippedArts: { neigong: 'MA-026', qinggong: 'MA-097', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-026', level: 8 },
      { artId: 'MA-097', level: 9 },
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
      N('{reignYear}深秋，少室山云海翻腾。大雄正殿之内，檀烟凝滞，四十八房高僧与诸院执事正爆发一场五百年未有之大争论。'),
      N('玄慈旧案既破，少林群龙无首。你二十二载以来以俗家护法之身屡建奇功——汴京请勘、洛阳护佛、莆田联宗、执掌俗家兵马，声望早已冠绝全寺；然而经院不少守旧宿老却死守“非剃度不得掌寺”的陈规，大殿之内吵得不可开交。'),
      S(SPEAKER_CONSERVATIVE_MONK, '（须发皆白，拍案而起）“荒谬！少林乃禅宗祖庭，岂可由一名带发未剃、身着白衣的俗家弟子总摄全寺？纵然你功勋盖世，若不落发受戒、披上缁衣，老衲绝不答应！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_02', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_02: {
    id: 'scene_slq40_02',
    title: '第二幕 · 长发白衣',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0127', '（玄难望向立于殿门光影中的你，眼中既忧且敬）“阿弥陀佛。澄古师兄莫动无明火，{gender:居士|女居士}二十二载为少林出生入死，其佛学经义之深，寺中能及者屈指可数，不妨听听{gender:他|她}的肺腑之言。”'),
      N('众目睽睽之下，你缓步踏入大雄正殿。你未披缁衣，未执禅杖，只着一袭纤尘不染的素白广袖长衫，一头黑发以青玉簪束起，在万千青灰僧袍之间显得格外孤绝、清峻而耀眼。'),
      S('NPC-0112', '（退坐于殿角蒲团之上，面色灰败却凝视着你，轻声叹道）“阿弥陀佛……老衲落发五十年，披着世间最尊贵的袈裟，却终究难断红尘一念。今日且听听你的禅理吧。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_03', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_03: {
    id: 'scene_slq40_03',
    title: '第三幕 · 佛法何在',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（步至释迦牟尼金身之前，不卑不亢合十礼佛，随即转身面对满殿高僧，目光清澈如秋水）“敢问澄古长老与诸位师伯：佛祖当年于灵山拈花微笑，传给迦叶尊者的，究竟是一颗明心见性的佛心，还是头顶三千烦恼丝与身上二尺青布？”'),
      S(SPEAKER_CONSERVATIVE_MONK, '（一时语塞，仍强辩道）“自古剃发去饰，乃表断绝尘缘之志！你带发入红尘、交游朝堂将相、结盟南北诸寺，又岂能与出家高僧同日而语！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_04', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_04: {
    id: 'scene_slq40_04',
    title: '第四幕 · 维摩立言',
    subtitle: '大雄正殿 · 玉阶之上',
    mandatory: true,
    beats: [
      P('（微微一笑，白衣在穿堂秋风中猎猎轻扬，声音骤然如金钟大吕般响彻大殿）“长老既读尽藏经，莫非忘了《维摩诘所说经》？！”'),
    ],
    choices: [
      {
        id: 'slq40_accept',
        label: '白衣长发立于佛前，引《维摩诘经》震醒满寺高僧',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q40_QUEST_ID, stepId: 'vimalakirti_debate' },
          setStep(SHAOLIN_Q40_QUEST_ID, 'vimalakirti_debate'),
          toast('已开启终局《不着袈裟 · 维摩护法》！请于大雄正殿展开维摩禅辩！', 'talk', '维摩护法'),
        ],
      },
    ],
  },

  scene_slq40_05: {
    id: 'scene_slq40_05',
    title: '第五幕 · 心中有佛',
    subtitle: '大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_40_white_robe_zen.jpg',
    illustrationCaption: '大雄正殿 · 一袭白衣长发立于佛前，朗喝“心中有佛何必剃发”，引《维摩诘经》禅语震醒满寺高僧',
    mandatory: true,
    beats: [
      P('（朗喝如雷，声震梁尘）“心中有佛，何必剃发！昔日维摩诘大居士身着白衣，居毗耶离城，虽处居家而不著三界，示有妻子而常修梵行，辩才无碍，连舍利弗、目犍连诸大阿罗汉皆为之折服！”'),
      P('“若只知剃发披缁、枯守深山，却任由内蠹丛生、坐视辽夏铁骑践踏中原佛土——那便是有形无心之木偶！反观大宋今日，外患日炽，正需有人不拘僧俗、上通汴京大相国寺与朝堂公卿、下联洛阳白马寺与莆田南少林，以入世之身行护法之实！”'),
      N('满殿鸦雀无声！字字珠玑，句句直指禅宗根本！澄古长老呆立原地，唇齿微颤，竟找不出一句反驳之词！'),
    ],
    onFinishEffects: [openScene('scene_slq40_06', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_06: {
    id: 'scene_slq40_06',
    title: '第六幕 · 振聋发聩',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（浑身巨震，眼中陡然涌出两行清泪，合十长叹）“善哉……善哉！老衲半生拘泥于方丈袈裟之相，反落了执念下乘！‘心中有佛，何必剃发’——此八字真言，胜读三藏经卷三十年啊！”'),
      S('NPC-0127', '（玄难亦深深躬身赞叹）“居士引《维摩诘经》破执显真，直追六祖惠能当年‘本来无一物’之气象！老衲心服口服！”'),
      S(SPEAKER_CONSERVATIVE_MONK, '（终于长叹一声，合十低头）“老朽着相了……佛法不离世间觉，老朽愿听居士教诲。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_07', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_07: {
    id: 'scene_slq40_07',
    title: '第七幕 · 政教分途',
    subtitle: '大雄正殿 · 禅堂议事',
    mandatory: true,
    beats: [
      P('（缓和神色，向四十八房高僧郑重拱手）“诸位师伯误会了——弟子并非要以白衣之身强占方丈禅座！早课清修、传经讲法、执掌戒律，自当由德高望重的出家高僧主持，弟子推举【玄难】师伯统领寺内清修！”'),
      P('“而弟子愿以【白衣大居士】之名，承接少林护法总纲，对外总摄少林僧兵与汴京大相国寺、洛阳白马寺、莆田南少林天下同盟——清修归佛门，锋刃归白衣！如此僧俗相济，少林方可永立不败之地！”'),
      N('此策一出，满殿高僧拍案叫绝！既保全了出家清修的千年道统，又打通了俗家护法纵横天下的大局，堪称绝世妙策！'),
    ],
    onFinishEffects: [openScene('scene_slq40_08', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_08: {
    id: 'scene_slq40_08',
    title: '第八幕 · 山门警讯',
    subtitle: '大雄正殿 · 钟院告急',
    mandatory: true,
    beats: [
      N('正当满殿高僧齐声称善之际，西侧钟鼓禅院骤然升起两道漆黑的狼烟信号，伴随着凄厉的胡哨与金铁交鸣声！'),
      N('一名负伤的罗汉堂武僧跌撞闯入大殿急呼：“报——！两伙来历极诡异的异域绝顶高手趁我寺议事之际，击伤外山哨僧，已潜入钟鼓禅院演武坪，声称要会一会少林新推举的『白衣护法』！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_09', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_09: {
    id: 'scene_slq40_09',
    title: '第九幕 · 辽夏暗客',
    subtitle: '大雄正殿 · 殿前石阶',
    mandatory: true,
    beats: [
      P('（眸中冷光如霜，拂袖起身）“好敏锐的鼻子！我刚提出联络大相国寺、白马寺、莆田南少林结成天下同盟，辽夏潜伏中原的暗桩便按捺不住现身试探了！”'),
      S('NPC-0134', '（玄寂急声道）“辽夏暗使必是宗师级死士，居士切莫轻敌，老衲随你同往！”'),
      P('（大笑一声，白衣翻飞步出殿门）“不必！方才我既说『锋刃归白衣』，这第一战便由我独自以白衣之身会一会辽夏双雄，叫满寺高僧与天下同盟瞧瞧，不着袈裟亦可伏魔！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_10', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_10: {
    id: 'scene_slq40_10',
    title: '第十幕 · 白衣出殿',
    subtitle: '大雄宝殿西廊',
    mandatory: true,
    beats: [
      N('你一袭白衣迎风掠过西廊，玄难、玄痛、玄寂及四十八房高僧尽数登廊观战。演武坪上，两名气息阴冷而霸道的异域宗师早已负手静候多时。'),
    ],
    onFinishEffects: [openScene('scene_slq40_11', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_11: {
    id: 'scene_slq40_11',
    title: '第十一幕 · 步入演武坪',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('秋风卷尘，白衣对黑袍。一场决定中原佛门同盟能否立威天下的宗师硬仗，一触即发！'),
    ],
    choices: [
      {
        id: 'slq40_go_west',
        label: '踏入【钟鼓禅院 · 演武坪】，力退窥伺山门的辽夏邪客',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q40_QUEST_ID, 'repel_liao_xixia'),
          toast('辽夏绝顶邪客正在【钟鼓禅院 · 演武坪】挑衅！速去迎战逐虏！', 'warn', '钟院逐虏'),
        ],
      },
    ],
  },

  scene_slq40_12: {
    id: 'scene_slq40_12',
    title: '第十二幕 · 暗使现身',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_LIAO_ENVOY, '（身着暗金契丹窄袖袍，鹰目阴鸷如电，冷冷打量你的白衣长发）“你便是那位口出狂言要联结四寺、抗衡我大辽与西夏的少林俗家都统？本使乃大辽南院暗院使【耶律赤鹰】！”'),
      S(SPEAKER_XIXIA_AGENT, '（手持西夏黑莲弯刀，声音沙哑阴森）“在下西夏一品堂供奉【拓跋冥】。奉主上密令，绝不容中原佛门拧成一股绳！今日便在你满寺秃驴面前，拿你的白衣染血！”'),
      P('（负手微笑，声音清朗而凌厉）“大辽与西夏平日明争暗斗，今日为了拆我少林山门，倒难得狼狈为奸。也罢，省得我日后分头寻你们算账！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_13', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_13: {
    id: 'scene_slq40_13',
    title: '第十三幕 · 白衣伏魔',
    subtitle: '钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_40_vimalakirti_duel.jpg',
    illustrationCaption: '钟鼓禅院演武坪 · 一袭白衣迎风猎猎，主角孤身迎战大辽暗院使与西夏黑莲客',
    mandatory: true,
    beats: [
      N('耶律赤鹰契丹猛禽擒拿功霸道绝伦，掌风如铁羽裂空；拓跋冥西夏黑莲毒刀诡谲狠辣，刀光如墨雾弥漫！两大异域宗师左右合击，瞬间封死了你全部退路！'),
      P('（长啸一声，二十二载少林绝学与南北禅武融于一炉，白衣鼓荡如云龙出海）“且看我维摩护法，如何扫尽胡尘！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_14', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_14: {
    id: 'scene_slq40_14',
    title: '第十四幕 · 钟院死战',
    subtitle: '钟鼓禅院 · 演武坪（宗师 1v2 硬仗）',
    mandatory: true,
    beats: [
      N('演武坪飞沙走石，大辽与西夏两大绝顶暗使联手杀来，此战只许胜、不许败！'),
    ],
    choices: [
      {
        id: 'slq40_fight_spies',
        label: '白衣出阵，迎战【耶律赤鹰】与【拓跋冥】！（宗师级 1v2 决战）',
        subLabel: '击退窥伺山门的辽夏邪客，震慑异域暗桩',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q40_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiaoEnvoyBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildXixiaAgentBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '满寺高僧与中原佛门声威尽在身后，绝不可退让半步！',
            introText: '【1v2 钟院逐虏】白衣孤身迎战大辽暗院使【耶律赤鹰】与西夏黑莲客【拓跋冥】！',
            onWin: [openScene('scene_slq40_15', SHAOLIN_Q40_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('辽夏双雄联手攻势极为凌厉，暂借身法卸劲回气再战！', 'warn', '钟院逐虏'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq40_15: {
    id: 'scene_slq40_15',
    title: '第十五幕 · 破阵逐虏',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('激战四十余合，白衣竟不染一滴尘埃！你借一记少林无上拈花指劲隔空点偏拓跋冥的黑莲毒刀，顺势化指为掌，至刚至阳的般若神劲结结实实印在耶律赤鹰双掌之上！'),
      N('“轰！”气浪掀翻演武坪数丈青砖！耶律赤鹰双臂剧震骨折、喷血倒退七步；拓跋冥弯刀脱手飞出，肩胛被你的余劲震碎，两人齐齐骇然失色！'),
    ],
    onFinishEffects: [openScene('scene_slq40_16', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_16: {
    id: 'scene_slq40_16',
    title: '第十六幕 · 狼狈遁走',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_LIAO_ENVOY, '（捂着鲜血淋漓的胸口，满脸惊惧）“这……这等修为竟只是一个俗家白衣？！中原少林深不可测……撤！快撤！”'),
      S(SPEAKER_XIXIA_AGENT, '（掷出两枚黑烟弹掩护，仓皇掠墙而逃）“今日之耻，一品堂赫连大将军必将百倍讨还！”'),
      P('（冷笑一声，袍袖轻拂散尽黑烟）“随时恭候！只怕尔等再敢踏足嵩山之时，便是有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_17', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_17: {
    id: 'scene_slq40_17',
    title: '第十七幕 · 众僧折服',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('满廊观战的四十八房高僧与数百武僧亲眼见你以一袭白衣力挫辽夏两大宗师，顿时掌声与佛号齐鸣！连先前最固执的澄古长老也老泪纵横，连连合十：“维摩大居士再世！真乃维摩大居士再世啊！”'),
      N('就在此时，一名小沙弥匆匆自大雄正殿跑来，神色悲戚：“启禀居士与诸位师祖！玄慈老方丈自领戒杖之后油尽灯枯，方才听闻居士逐退辽夏强敌，含笑命弟子请居士速回大雄正殿见最后一面！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_18', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_18: {
    id: 'scene_slq40_18',
    title: '第十八幕 · 急返大殿',
    subtitle: '大雄宝殿 · 玉阶之前',
    mandatory: true,
    beats: [
      N('你心中一沉，收起战意，疾步随玄难、玄寂等人重返大雄正殿。'),
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

  scene_slq40_19: {
    id: 'scene_slq40_19',
    title: '第十九幕 · 破执临终',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内灯火微明。玄慈已自领完戒律重杖，此刻斜倚在蒲团之上，呼吸微弱，叶二娘泪流满面地守在他身旁。见你白衣步入，玄慈眸中绽出最后的清明光彩。'),
      S('NPC-0112', '（虚弱地抬手示意你近前，声音温和而释然）“好孩子……老衲方才听见演武坪的欢呼了。你既未削发，也未着缁衣，却比老衲更配护持这千年祖庭。”'),
      P('（单膝跪于榻前，轻声道）“方丈师伯言重了。没有师伯二十二年前破格允我以俗家身份入寺、五年前又破格封我为紫衣都统，便没有弟子的今日。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_20', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_20: {
    id: 'scene_slq40_20',
    title: '第二十幕 · 愧赠圣衣',
    subtitle: '大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_40_alliance_seal.jpg',
    illustrationCaption: '大雄正殿 · 玄慈方丈愧赠天阶圣衣《少林达摩袈裟》并托付少林同盟大印，含笑圆寂',
    mandatory: true,
    beats: [
      S('NPC-0112', '（命玄难捧来那袭金纹流转的【少林达摩袈裟】与少林护法总印，亲自推到你的手中）“你既立志不着袈裟，以白衣大居士行维摩护法之道，老衲绝不强求你披于身上。但此件天阶【少林达摩袈裟】乃祖师圣物，老衲愧居其位半生，今日便赠予你镇守同盟法坛——见此袈裟，如见少林祖师亲临！”'),
      P('（郑重双手捧接达摩袈裟，深深一拜）“弟子谨领圣衣！必以白衣护法、誓保少林千年不绝！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_21', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_21: {
    id: 'scene_slq40_21',
    title: '第二十一幕 · 含笑化去',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0112', '（望了叶二娘最后一眼，又望向释迦金身，唇边含笑低诵）“不著于相，如如不动……二娘，老衲此去无牵无挂了……南无阿弥陀佛……”'),
      N('话音渐息，玄慈合目坐化，面容竟如初生婴孩般安详。'),
      S('NPC-0233', '（凄然一笑，轻抚玄慈冰凉的眉眼）“大哥，你终于肯放下了……奴家这就陪你走。”'),
      N('话音未落，叶二娘已决然自尽于蒲团之侧，随玄慈同赴黄泉。满殿僧众齐声低诵往生咒，哀钟久久回荡于少室群峰之间。'),
    ],
    onFinishEffects: [
      { type: 'markNpcsDead', npcIds: ['NPC-0112', 'NPC-0233'] },
      openScene('scene_slq40_22', SHAOLIN_Q40_QUEST_ID),
    ],
  },

  scene_slq40_22: {
    id: 'scene_slq40_22',
    title: '第二十二幕 · 推举玄难',
    subtitle: '大雄正殿 · 禅堂议事',
    mandatory: true,
    beats: [
      N('丧仪既毕，七日之后，大雄正殿再开大议。你亲手将象征寺内早课、讲经与戒律清修的青玉禅杖奉至【玄难】大师面前。'),
      P('（朗声宣告）“诸位师伯，佛门清修不可一日无主！玄难师伯德高望重、禅定精深，弟子提议由玄难师伯总领少林寺内早课清修与经院传法！”'),
      S('NPC-0127', '（玄难合十受杖，郑重回礼）“阿弥陀佛。老衲便替居士守好这青灯古佛与早晚晨钟；至于少林千名僧兵与天下佛门同盟的兴亡大计，便全赖白衣大居士运筹帷幄了！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_23', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_23: {
    id: 'scene_slq40_23',
    title: '第二十三幕 · 四寺来朝',
    subtitle: '嵩山少林寺 · 山门迎宾',
    mandatory: true,
    beats: [
      N('你此前二十二载走遍大宋南北所结下的深厚香火与生死之交，终于在这一刻汇成惊天巨流！'),
      N('汴京【大相国寺】遣监院高僧携皇家护寺敕牒而至；洛阳【白马寺】派达摩支脉长老驰马赴会；千里之外的福建【莆田南少林】亦由元苦大师亲派门下首座航海北上——天下四大禅宗巨刹，齐聚嵩山少室峰！'),
    ],
    onFinishEffects: [openScene('scene_slq40_24', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_24: {
    id: 'scene_slq40_24',
    title: '第二十四幕 · 同盟誓书',
    subtitle: '大雄宝殿 · 殿前广场',
    mandatory: true,
    beats: [
      S(SPEAKER_ALLIANCE_ENVOYS, '（三寺高僧代表齐齐向你合十行大礼）“阿弥陀佛！昔年汴京雅市、洛阳龙门、莆田九莲山，皆蒙大居士力挽狂澜！今闻少林立『维摩护法』新制，我大相国寺、白马寺与莆田南少林愿尊白衣大居士为盟主，四寺同气连枝，共抗外侮！”'),
      N('四寺僧兵与俗家护法合兵一处，声势震动大宋朝野！'),
    ],
    onFinishEffects: [openScene('scene_slq40_25', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_25: {
    id: 'scene_slq40_25',
    title: '第二十五幕 · 登坛受印',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿前彩幡飘扬，晨钟暮鼓齐鸣！玄难、玄痛、玄寂与三寺使节分列两厢，恭请白衣大居士登坛受领天下佛门同盟大印！'),
    ],
    choices: [
      {
        id: 'slq40_go_alliance',
        label: '登【大雄正殿 · 佛前蒲团】受领大印，以白衣大居士总摄天下同盟',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q40_QUEST_ID, 'alliance_command'),
          toast('请于【大雄正殿 · 佛前蒲团】受领同盟大印，成就白衣大居士终局！', 'success', '天下同盟'),
        ],
      },
    ],
  },

  scene_slq40_26: {
    id: 'scene_slq40_26',
    title: '第二十六幕 · 白衣盟主',
    subtitle: '大雄正殿 · 天下佛门同盟大典',
    illustrationUrl: '/assets/quests/sl_40_layman_banner.jpg',
    illustrationCaption: '嵩山大雄宝殿 · 白衣大居士高擎同盟金印，总摄嵩山少林僧兵与大相国寺、白马寺、莆田南少林天下同盟',
    mandatory: true,
    beats: [
      N('你一袭白衣胜雪，长发飘扬，亲手将【少林达摩袈裟】供奉于同盟法坛正中，随即高高举起象征四寺同心的鎏金护法大印！'),
      P('（朗声传谕天下）“今日嵩山少林寺、东京大相国寺、洛阳白马寺、莆田南少林四寺结盟！清修者安心参禅，护法者仗剑卫道！自今以后，凡我中原佛门一草一木，皆由白衣护法一力担之！”'),
      N('山呼海啸般的佛号响彻少室山巅，直冲九霄！'),
    ],
    onFinishEffects: [openScene('scene_slq40_27', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_27: {
    id: 'scene_slq40_27',
    title: '第二十七幕 · 朝野震动',
    subtitle: '嵩山少林寺 · 山门远眺',
    mandatory: true,
    beats: [
      N('「不着袈裟，白衣维摩总摄四寺同盟」的传奇很快传遍汴京朝堂与大江南北。文人墨客争相作诗赞叹，将你比作当代维摩诘居士；大宋礼部与枢密院更颁下特敕，赞许四寺同盟护国安民。'),
    ],
    onFinishEffects: [openScene('scene_slq40_28', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_28: {
    id: 'scene_slq40_28',
    title: '第二十八幕 · 僧俗相济',
    subtitle: '大雄宝殿 · 殿前丹墀',
    mandatory: true,
    beats: [
      S('NPC-0127', '（玄难立于你身侧，含笑望向演武坪上整齐操演的少林僧兵与俗家护法）“大居士看，早课诵经之声不绝于耳，练武护法之气直冲云霄。这才是佛法在世间最该有的模样啊。”'),
      P('（拱手微笑）“全赖玄难师伯坐镇清修，弟子方能无后顾之忧。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_29', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_29: {
    id: 'scene_slq40_29',
    title: '第二十九幕 · 扫叶颔首',
    subtitle: '藏经阁外 · 古杏微风',
    mandatory: true,
    beats: [
      N('黄昏时分，你行经藏经阁古银杏树下，见扫地老僧法空正拄着竹帚静静望向满院金黄落叶。'),
      S('NPC-0101', '（微微含笑，目露赞许）“应无所住而生其心。不着袈裟，反得大自在。大居士好悟性。”'),
      P('（停步肃容拱手）“前辈慧眼，晚辈受教了。”'),
    ],
    onFinishEffects: [openScene('scene_slq40_30', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_30: {
    id: 'scene_slq40_30',
    title: '第三十幕 · 边尘暗涌',
    subtitle: '嵩山少林寺 · 演武高台',
    mandatory: true,
    beats: [
      N('你摊开大相国寺与莆田南少林刚刚飞鸽传来的密报——拓跋冥逃回西夏后，一品堂统领赫连铁树果然大怒，正暗中联合星宿老怪丁春秋调集重兵，欲血洗嵩山！'),
      P('（冷笑收起密信，望向北方天际）“来得正好！我四寺同盟与千名少林僧兵既已整装待发，便让西夏一品堂见识见识白衣护法的锋芒！”'),
    ],
    onFinishEffects: [openScene('scene_slq40_31', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_31: {
    id: 'scene_slq40_31',
    title: '第三十一幕 · 维摩本色',
    subtitle: '嵩山少林寺 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('二十二载俗家修行，一朝大成。你不曾落发，却比世间万千僧人更懂护法慈悲；你不曾着缁，却以一袭白衣撑起中原禅林半壁江山！'),
    ],
    onFinishEffects: [openScene('scene_slq40_32', SHAOLIN_Q40_QUEST_ID)],
  },

  scene_slq40_32: {
    id: 'scene_slq40_32',
    title: '第三十二幕 · 白衣大居士',
    subtitle: '嵩山少林寺 · 终局归位',
    mandatory: true,
    beats: [
      N('【少林终局 · 白衣大居士】已然铸成！你以无上禅辩与绝世武功总摄少林僧兵与大相国寺、白马寺、莆田南少林天下同盟，晋升少林 Lv.5 至尊掌门职级！'),
    ],
    choices: [
      {
        id: 'slq40_complete',
        label: '执同盟大印，正式登位少林【白衣大居士】（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 5, promoteOnly: true },
          { type: 'giveItem', itemId: 'ARM-004', qty: 1 },
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
