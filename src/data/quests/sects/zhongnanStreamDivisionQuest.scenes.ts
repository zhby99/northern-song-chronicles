import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q03_QUEST_ID } from './zhongnanStreamDivisionQuest'

const SPEAKER_SHEN_QINGYANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '沈清扬',
  title: '重阳外门剑童',
  factionName: '终南隐宗',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
}

const SPEAKER_SU_YINGXUE: StorySpeakerSpec = {
  kind: 'custom',
  name: '苏映雪',
  title: '幽谷外门女剑',
  factionName: '终南隐宗',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_female_av.jpg',
}

const SPEAKER_ZHAO_XUANMING: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵玄明',
  title: '终南外门魁首',
  factionName: '终南隐宗',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
}

function buildPeerRound1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q03_SHEN_QINGYANG',
    name: '沈清扬',
    title: '重阳外门新锐',
    realm: '三流下品',
    factionId: 'SECT-11',
    factionName: '终南隐宗',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
    talk: '“久闻同门在长安破了星宿暗哨，首轮便让沈某以入门十三剑讨教一二！”',
    stats: { hp: 460, mp: 220, agi: 24, res: 15 },
    talents: { bone: 50, comprehension: 48, charm: 46 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-188' },
    learnedArts: [{ artId: 'MA-181', level: 2 }, { artId: 'MA-188', level: 3 }],
  })
}

function buildPeerRound2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q03_SU_YINGXUE',
    name: '苏映雪',
    title: '寒玉涧外门巧剑',
    realm: '三流中品',
    factionId: 'SECT-11',
    factionName: '终南隐宗',
    sectRank: 1,
    sectRankLabel: '外门弟子',
    avatarUrl: '/assets/characters/templates/tpl_zhongnan_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_zhongnan_female_fb.jpg',
    talk: '“剑贵轻灵，气贵绵长。{gender:师兄|师姐}，小心我的连环斜挑！”',
    stats: { hp: 640, mp: 340, agi: 32, res: 18 },
    talents: { bone: 54, comprehension: 56, charm: 62 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-188' },
    learnedArts: [{ artId: 'MA-181', level: 3 }, { artId: 'MA-188', level: 4 }],
  })
}

function buildPeerRound3(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q03_ZHAO_XUANMING',
    name: '赵玄明',
    title: '终南外门第一剑',
    realm: '三流上品',
    factionId: 'SECT-11',
    factionName: '终南隐宗',
    sectRank: 1,
    sectRankLabel: '外门魁首',
    avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
    talk: '“苦修六载，今日内门魁首之位赵某志在必得！请亮剑！”',
    stats: { hp: 820, mp: 480, agi: 37, res: 21 },
    talents: { bone: 62, comprehension: 58, charm: 50 },
    equippedArts: { neigong: 'MA-181', move1: 'MA-188' },
    learnedArts: [{ artId: 'MA-181', level: 4 }, { artId: 'MA-188', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q03_01: {
    id: 'scene_zn_q03_01',
    title: '第一幕 · 繁花剑坪',
    subtitle: '终南后山寒玉涧 · 双剑合璧坪',
    illustrationUrl: '/assets/quests/zn_q03_sword_terrace.jpg',
    illustrationCaption: '寒涧试剑 · 繁花幽谷青石坪上玉磬清鸣，双脉长老齐聚',
    mandatory: true,
    beats: [
      N('{reignYear}夏初，终南后山寒玉涧畔野花如雪，清泉绕石。被称作「繁花幽谷双剑合璧坪」的宽阔青石台前，早已有数十名终南外门弟子肃立候场。'),
      N('高台之上，道袍飘然、双目含威者乃是全真七子之师——「紫阳真人」王重楼；其侧白衣胜雪、清丽绝尘者，则是活死人墓之主——「寒玉仙子」林朝瑶！'),
      S('NPC-0216', '（执拂尘立于台前，声震幽谷）“三年一度寒涧试剑，今日启幕！紫阳师尊与林前辈亲临观礼，凡连胜三轮夺魁者，晋升内门，赐终南三宝披挂，并择定观墓正传！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_02', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_02: {
    id: 'scene_zn_q03_02',
    title: '第二幕 · 双尊垂目',
    subtitle: '双剑合璧坪 · 宗师寄语',
    mandatory: true,
    beats: [
      S('NPC-0133', '（目光温润却深不可测，掠过台下众人停在你身上）“听钰玄说，你近日护柏飞瀑、夜破西市星宿毒哨，行事颇有正气。今日坪上不论功劳，只论剑心！”'),
      S('NPC-0114', '（声音清冷如玉落冰盘）“前山重气，后山重韵，然无论哪一脉，皆须先有立足之本。清秋，敲玉磬吧。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_03', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_03: {
    id: 'scene_zn_q03_03',
    title: '第三幕 · 玉磬三鸣',
    subtitle: '双剑合璧坪 · 抽签入场',
    mandatory: true,
    beats: [
      S('NPC-0173', '（轻敲白玉磬，清音回荡山谷）“玉磬三响，校剑开始！同门切磋，点到即止。请甲字签弟子登坪！”'),
    ],
    choices: [
      {
        id: 'zn_q03_enter_arena',
        label: '按剑登坪 · 出战寒涧试剑三轮校剑',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q03_QUEST_ID, stepId: 'stream_three_duels' },
          setStep(ZHONGNAN_Q03_QUEST_ID, 'stream_three_duels'),
          openScene('scene_zn_q03_04', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q03_04: {
    id: 'scene_zn_q03_04',
    title: '第四幕 · 首轮试锋',
    subtitle: '双剑合璧坪 · 对阵沈清扬',
    illustrationUrl: '/assets/quests/zn_q03_three_duels.jpg',
    illustrationCaption: '连战三杰 · 繁花落雨间长剑交鸣，玄门剑意纵横',
    mandatory: true,
    beats: [
      N('你纵身跃上青石剑坪，对面一名眉清目秀的青衣剑童抱剑行礼，正是外门新锐沈清扬。'),
      S(SPEAKER_SHEN_QINGYANG, '“{gender:师兄|师姐}请了！沈某自幼在重阳古观习剑，请接我一招‘云横秦岭’！”'),
    ],
    choices: [
      {
        id: 'zn_q03_fight_r1',
        label: '第一轮校剑 · 迎战重阳外门新锐沈清扬',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPeerRound1() },
            rule: 'story_trial',
            forbidEscapeReason: '大比坪上万众瞩目，岂可临阵弃权！',
            introText: '沈清扬剑锋斜引，一招云横秦岭直刺而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q03_05', ZHONGNAN_Q03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('首轮惜败于沈清扬，丘处玄准你调息片刻重新登坪挑战！', '寒涧试剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q03_05: {
    id: 'scene_zn_q03_05',
    title: '第五幕 · 稳胜初阵',
    subtitle: '双剑合璧坪 · 调息候战',
    mandatory: true,
    beats: [
      N('你以守代攻，待沈清扬剑势用老，手腕一沉轻巧格开长剑，剑尖稳稳停在其肩前寸许。'),
      S(SPEAKER_SHEN_QINGYANG, '（收剑拱手，心服口服）“好稳的守中剑意！沈某甘拜下风！”'),
      S('NPC-0216', '“第一轮胜出！赐清茶调息，准备第二轮！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_06', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_06: {
    id: 'scene_zn_q03_06',
    title: '第六幕 · 幽谷巧剑',
    subtitle: '双剑合璧坪 · 对阵苏映雪',
    mandatory: true,
    beats: [
      N('第二轮登坪者乃是一名身姿轻盈的白衫女子，步伐踏花无痕，手中细剑挽出三朵寒梅般的剑花——正是常在后山旁听冷清秋抚琴的苏映雪。'),
      S(SPEAKER_SU_YINGXUE, '“沈师弟剑走刚直，却不知{gender:师兄|师姐}接不接得住我这飘忽不定的流风细剑？”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_07', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_07: {
    id: 'scene_zn_q03_07',
    title: '第七幕 · 轻灵交锋',
    subtitle: '双剑合璧坪 · 次轮激战',
    mandatory: true,
    beats: [
      P('“苏师姐剑姿如飞燕掠水，在下便以静制动，请赐教！”'),
    ],
    choices: [
      {
        id: 'zn_q03_fight_r2',
        label: '第二轮校剑 · 迎战幽谷外门巧剑苏映雪',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPeerRound2() },
            rule: 'story_trial',
            forbidEscapeReason: '大比校剑岂可中途退场！',
            introText: '苏映雪足尖点石，剑花纷飞直取你周身要穴！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q03_08', ZHONGNAN_Q03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('不慎被苏映雪轻灵剑法抢了先机，请调息后再行登坪！', '寒涧试剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q03_08: {
    id: 'scene_zn_q03_08',
    title: '第八幕 · 破巧见真',
    subtitle: '双剑合璧坪 · 双尊颔首',
    mandatory: true,
    beats: [
      N('你凝神听风辨位，任她剑花万变，唯守中宫一线，终于在苏映雪回气变招的刹那以剑脊轻叩其腕，震落一瓣落花！'),
      S('NPC-0114', '（在台上微微颔首）“以静制躁，目光清亮，不错。”'),
      S(SPEAKER_SU_YINGXUE, '（抿唇浅笑，敛剑一礼）“{gender:师兄|师姐}眼力过人，小妹输得心服。下一场对赵师兄，千万小心他势大力沉的崩剑！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_09', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_09: {
    id: 'scene_zn_q03_09',
    title: '第九幕 · 外门魁首',
    subtitle: '双剑合璧坪 · 决战赵玄明',
    mandatory: true,
    beats: [
      N('玉磬再响，决胜局至！身形高大的外门魁首赵玄明提着一柄沉重铁剑阔步登坪，衣袂鼓荡，已有几分三流巅峰气象。'),
      S(SPEAKER_ZHAO_XUANMING, '“能连胜沈、苏二人，你确有真才实学。不过赵某苦修《全真大道筑基歌》六载，这一战绝不留手，请！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_10', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_10: {
    id: 'scene_zn_q03_10',
    title: '第十幕 · 决胜青锋',
    subtitle: '双剑合璧坪 · 终局对决',
    mandatory: true,
    beats: [
      P('（深吸一口山涧清气，全真内息充盈四肢）“赵师兄不必相让，请出全力！”'),
    ],
    choices: [
      {
        id: 'zn_q03_fight_r3',
        label: '决胜校剑 · 力战终南外门魁首赵玄明',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPeerRound3() },
            rule: 'story_trial',
            forbidEscapeReason: '魁首之争就在最后一战，绝不言退！',
            introText: '赵玄明长啸一声，重剑卷起劲风迎头劈落！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q03_11', ZHONGNAN_Q03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('惜败于外门魁首赵玄明剑下。整顿内息后再战，必能一雪前耻！', '寒涧试剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q03_11: {
    id: 'scene_zn_q03_11',
    title: '第十一幕 · 剑震幽谷',
    subtitle: '双剑合璧坪 · 三战全胜',
    mandatory: true,
    beats: [
      N('金铁交鸣声中，你顺势化开赵玄明势大力沉的劈剑，反手一记「太乙归元」巧劲透入剑脊！赵玄明虎口发麻，铁剑脱手飞出三丈，斜插在青石缝中嗡嗡震颤！'),
      N('台下顿时爆发出雷鸣般的喝彩声！赵玄明怔了半晌，旋即哈哈大笑，抱拳深揖：“好剑法！今年外门魁首，当归{gender:师弟|师妹}莫属！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_12', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_12: {
    id: 'scene_zn_q03_12',
    title: '第十二幕 · 晋升内门',
    subtitle: '双剑合璧坪 · 颁赐三宝',
    mandatory: true,
    beats: [
      S('NPC-0216', '（朗声宣告，神采飞扬）“三战全胜，实至名归！奉紫阳师尊与林前辈法旨：即日起晋升你为终南隐宗【Lv.2 内门弟子】！”'),
      S('NPC-0173', '（命弟子捧出三只朱漆木匣）“赐你终南内门三宝——【终南寒泉道剑】、【终南青布道袍】、【终南青玉道冠佩】！望你佩剑修身，不堕终南清誉！”'),
    ],
    choices: [
      {
        id: 'zn_q03_claim_rank2',
        label: '稽首谢恩 · 晋升内门并领受终南三宝披挂',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-11', rank: 2, promoteOnly: true },
          { type: 'giveItem', itemId: 'WPN-051', qty: 1 },
          { type: 'giveItem', itemId: 'ARM-022', qty: 1 },
          { type: 'giveItem', itemId: 'ACC-024', qty: 1 },
          setStep(ZHONGNAN_Q03_QUEST_ID, 'branch_division_oath'),
          openScene('scene_zn_q03_13', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q03_13: {
    id: 'scene_zn_q03_13',
    title: '第十三幕 · 暮色散场',
    subtitle: '寒玉涧 · 独留双尊',
    mandatory: true,
    beats: [
      N('暮色渐合，众外门弟子陆续散去。花影扶疏的剑坪之上，唯余王重楼、林朝瑶、丘处玄、冷清秋与你五人。'),
      N('寒涧水声在静夜中显得格外清越，一轮明月缓缓升上终南雪峰。'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_14', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_14: {
    id: 'scene_zn_q03_14',
    title: '第十四幕 · 百年双脉',
    subtitle: '双剑合璧坪 · 宗师开示',
    illustrationUrl: '/assets/quests/zn_q03_twin_patriarchs.jpg',
    illustrationCaption: '双尊并立 · 明月下王重楼与林朝瑶娓娓道来终南双脉渊源',
    mandatory: true,
    beats: [
      S('NPC-0133', '（负手望月，语声悠远）“外门筑基已毕，今日该对你明言终南百年格局了。前山重阳古观与后山活死人墓，本是同源异流、相敬相惜的两条大道。”'),
      S('NPC-0114', '（目光澄澈如水）“外门之时，两脉共育新枝；一旦升入内门，心法路数便分道扬镳，再难兼修。今晚，须由你自己择定归属。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_15', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_15: {
    id: 'scene_zn_q03_15',
    title: '第十五幕 · 前山重阳',
    subtitle: '双剑合璧坪 · 古观真意',
    mandatory: true,
    beats: [
      S('NPC-0216', '（昂首拱手，豪气干云）“入我【重阳古观前脉】，习天罡北斗阵法、三才归元剑、金雁轻功、希夷剑道乃至先天正气！出山护民抗夏、论剑华岳、扬大宋浩然正气于天下，岂不快哉！”'),
      S('NPC-0133', '“古观一脉，贵在堂堂正正、济世安民，以内功浑厚绵长、剑阵堂皇见胜。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_16', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_16: {
    id: 'scene_zn_q03_16',
    title: '第十六幕 · 后山幽谷',
    subtitle: '双剑合璧坪 · 古墓真意',
    mandatory: true,
    beats: [
      S('NPC-0173', '（微抚衣袖，清冷中透着傲骨）“入我【活死人墓后脉】，则卧寒玉床淬炼冰魄真气，习天罗地网、玉蜂金针、玉女素心剑法与黯然玄奥！不慕虚名，剑势轻灵绝伦、招招出奇制胜！”'),
      S('NPC-0114', '“古墓一脉，贵在清心绝尘、灵动无双。世人皆以为幽谷孤寂，却不知唯有静极，方能洞见武道至微。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_17', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_17: {
    id: 'scene_zn_q03_17',
    title: '第十七幕 · 临流自省',
    subtitle: '双剑合璧坪 · 吟诗明志',
    mandatory: true,
    beats: [
      N('你仰望终南明月，心中百感交集：一边是重阳古观松风鹤影、横剑卫国的浩然正道；一边是活死人墓寒玉幽香、白衣胜雪的绝代风华。'),
      P('（心中暗吟：太乙近天都，连山接海隅。白云回望合，青霭入看无……无论前山后山，皆是我安身立命之道！）'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '诗词', delta: 1 },
      openScene('scene_zn_q03_18', ZHONGNAN_Q03_QUEST_ID),
    ],
  },

  scene_zn_q03_18: {
    id: 'scene_zn_q03_18',
    title: '第十八幕 · 观墓分途',
    subtitle: '双剑合璧坪 · 不可逆之抉择',
    illustrationUrl: '/assets/quests/zn_q03_branch_oath.jpg',
    illustrationCaption: '观墓分途 · 剑指明月立下终生无悔之誓，前山古观与后山幽谷自此分流',
    mandatory: true,
    beats: [
      S('NPC-0133', '“切记，此择一经立誓，便定下你日后在终南隐宗的绝学传承与历练轨迹，再无反悔余地。”'),
      S('NPC-0114', '“{gender:孩子|姑娘}，随你本心择一脉罢。”'),
    ],
    choices: [
      {
        id: 'zn_q03_choose_guguan',
        label: '拜入【重阳古观前脉】——修玄门北斗剑阵，持剑济世护家国',
        subLabel: '锁定古观线（不可逆）：三才归元剑、金雁功、劈空掌、希夷剑法、先天玄功',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'zn_branch', value: 'guguan' },
          openScene('scene_zn_q03_19_guguan', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'zn_q03_choose_gumu',
        label: '拜入【活死人墓后脉】——修幽谷冰魄轻功，练玉女素心绝代剑',
        subLabel: '锁定古墓线（不可逆）：玉蜂金针、天罗地网势、玉女剑法、寒玉冰魄功',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'zn_branch', value: 'gumu' },
          openScene('scene_zn_q03_19_gumu', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q03_19_guguan: {
    id: 'scene_zn_q03_19_guguan',
    title: '第十九幕 · 稽首重阳',
    subtitle: '双剑合璧坪 · 归入古观前脉',
    mandatory: true,
    beats: [
      N('你整肃青布道袍，向紫阳真人王重楼郑重三稽首，又向林朝瑶深深一揖致敬。'),
      S('NPC-0133', '（抚须大慰）“善哉！既入重阳前脉，明日便去【天罡北斗七星演剑坛】随处真、弘毅演练北斗阵法与三才归元剑！”'),
      S('NPC-0114', '（淡然微笑）“各有志趣，甚好。日后若在江湖遇上古墓同门，还望守望相助。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_20', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_19_gumu: {
    id: 'scene_zn_q03_19_gumu',
    title: '第十九幕 · 幽谷传薪',
    subtitle: '双剑合璧坪 · 归入古墓后脉',
    mandatory: true,
    beats: [
      N('你轻提寒泉道剑，向寒玉仙子林朝瑶郑重拜下，又向王重楼稽首致意。'),
      S('NPC-0114', '（清眸泛起一丝暖意）“既择幽谷，此后便随清秋入【活死人墓幽谷石室】静修寒玉冰魄与天罗轻功，切莫为世俗浮名所扰。”'),
      S('NPC-0133', '（含笑点头）“能得林前辈亲睐，亦是大造化。重阳前山大门，永远为同宗子弟敞开。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_20', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_20: {
    id: 'scene_zn_q03_20',
    title: '第二十幕 · 寒泉映剑',
    subtitle: '双剑合璧坪 · 佩剑试锋',
    mandatory: true,
    beats: [
      N('你拔出新赐的【终南寒泉道剑】，但见剑身秋水生寒，倒映着漫天星斗；换上终南青布道袍与青玉道冠佩，浑身气象已与昔日初入山门时截然不同。'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_21', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_21: {
    id: 'scene_zn_q03_21',
    title: '第二十一幕 · 师长嘉勉',
    subtitle: '寒玉涧 · 门规寄语',
    mandatory: true,
    beats: [
      S('NPC-0216', '“内门弟子不仅俸禄倍增，更肩负护山卫道之责。西夏与星宿宵小近来在关中蠢蠢欲动，你务必抓紧时日修习本脉高阶绝学！”'),
      S('NPC-0173', '“记住了，终南双脉虽分途，却同根同源。切莫忘记寒玉涧今夜的明月。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q03_22', ZHONGNAN_Q03_QUEST_ID)],
  },

  scene_zn_q03_22: {
    id: 'scene_zn_q03_22',
    title: '第二十二幕 · 新程启幕',
    subtitle: '终南后山 · 内门大成',
    mandatory: true,
    beats: [
      N('清风拂过繁花幽谷，落英缤纷。你手按寒泉道剑，正式以终南隐宗内门弟子的身份，踏上属于自己的宗师问道长途！'),
    ],
    choices: [
      {
        id: 'zn_q03_complete',
        label: '铭记誓言 · 圆满完成《寒涧试剑 · 观墓分途》',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 100 },
          { type: 'giveSilver', amount: 80, reason: '寒涧试剑夺魁赏银' },
          { type: 'giveCombatExp', amount: 460, reason: '完成《寒涧试剑 · 观墓分途》' },
          { type: 'modifyRenown', delta: 22, reason: '终南寒涧试剑夺魁晋升内门' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 8 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 8 },
          { type: 'completeQuest', questId: ZHONGNAN_Q03_QUEST_ID, outcome: 'promoted_and_divided' },
          toast('恭喜晋升终南隐宗【Lv.2 内门弟子】，观墓分途已定！', 'success', '观墓分途'),
        ],
      },
    ],
  },
}
