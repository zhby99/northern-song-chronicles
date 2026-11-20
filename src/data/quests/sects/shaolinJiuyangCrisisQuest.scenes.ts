import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q29_QUEST_ID } from './shaolinJiuyangCrisisQuest'

const SPEAKER_ZHAIXING: StorySpeakerSpec = {
  kind: 'custom',
  name: '摘星毒师',
  title: '星宿派大弟子 · 丁春秋亲传',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_XINGXIU_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '碧磷毒徒 · 狮吼子',
  title: '星宿海悍徒',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_XINGXIU_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐骨毒女 · 阿紫姑',
  title: '星宿海毒姬',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
}

function buildXingxiuRaiderA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ29_RAIDER_A',
    name: '碧磷毒徒 · 狮吼子',
    title: '星宿海悍徒',
    realm: '一流下品',
    factionName: '星宿海',
    sectRank: 2,
    sectRankLabel: '星宿毒徒',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“少林秃驴休想逃！尝尝星宿派抽髓毒掌的滋味！”',
    stats: { hp: 2380, mp: 1850, agi: 66, res: 46 },
    talents: { bone: 76, comprehension: 72, charm: 34 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-098',
      move1: 'MA-065',
      move2: 'MA-084',
    },
    learnedArts: [
      { artId: 'MA-231', level: 8 },
      { artId: 'MA-098', level: 7 },
      { artId: 'MA-065', level: 7 },
      { artId: 'MA-084', level: 7 },
    ],
  })
}

function buildXingxiuRaiderB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ29_RAIDER_B',
    name: '腐骨毒女 · 阿紫姑',
    title: '星宿海毒姬',
    realm: '一流下品',
    factionName: '星宿海',
    sectRank: 2,
    sectRankLabel: '星宿毒徒',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
    talk: '“嘻嘻，三笑逍遥散都放倒玄难老秃驴了，你个小和尚还敢硬撑？”',
    stats: { hp: 2150, mp: 1920, agi: 70, res: 44 },
    talents: { bone: 72, comprehension: 78, charm: 60 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-097',
      move1: 'MA-065',
      move2: 'MA-095',
    },
    learnedArts: [
      { artId: 'MA-231', level: 8 },
      { artId: 'MA-097', level: 7 },
      { artId: 'MA-065', level: 7 },
      { artId: 'MA-095', level: 7 },
    ],
  })
}

function buildZhaixingBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ29_ZHAIXING',
    name: '摘星毒师',
    title: '星宿派大弟子 · 丁春秋亲传',
    realm: '一流上品',
    factionName: '星宿海',
    sectRank: 3,
    sectRankLabel: '星宿大师兄',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“星宿老仙，法驾中原！今日便拿少林达摩院首座的性命与九阳密钞，作我星宿海开山大礼！”',
    stats: { hp: 3560, mp: 3320, agi: 77, res: 58 },
    talents: { bone: 86, comprehension: 88, charm: 48 },
    equippedArts: {
      neigong: 'MA-026',
      qinggong: 'MA-097',
      move1: 'MA-065',
      move2: 'MA-095',
      move3: 'MA-085',
    },
    learnedArts: [
      { artId: 'MA-026', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-065', level: 9 },
      { artId: 'MA-095', level: 8 },
      { artId: 'MA-085', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq29_01: {
    id: 'scene_slq29_01',
    title: '第一幕 · 胡商献香',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山霜叶如血。你奉命随达摩院首座玄难巡查剑痕崖石刻，行至崖畔石亭时，忽见三名身着西域织锦长袍、手捧紫檀香盒的「胡商」正跪在石阶下连连叩首。'),
      S(SPEAKER_ZHAIXING, '（躬身低头，操着一口流利中原官话，眼底却闪过一抹阴毒幽光）“拜见少林高僧！小人乃于阗香商，久仰达摩祖师剑痕圣迹，特献西域龙涎奇香三匣，恳请大师亲手启封拈香！”'),
      S('NPC-0127', '（合十还礼，神态慈和却隐含审视）“阿弥陀佛，远来施主有心了。只是达摩院乃本寺禁地，施主何以未经知客院通传便直登剑痕崖？”'),
    ],
    onFinishEffects: [openScene('scene_slq29_02', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_02: {
    id: 'scene_slq29_02',
    title: '第二幕 · 紫檀毒烟',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      P('（目光扫过那三人袖口，骤然瞥见领头胡商指缝泛着一层诡异青紫，心头猛地一凛）“师叔小心！那香盒有诈——他们不是胡商，是西域星宿海的用毒妖人！”'),
      N('话音未落，领头胡商狞笑一声，五指猛扣香盒机括！三道无色无味的诡异清风夹杂着腥臭碧磷绿雾轰然炸开，直扑玄难与身旁两名扫崖小沙弥！'),
    ],
    onFinishEffects: [openScene('scene_slq29_03', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_03: {
    id: 'scene_slq29_03',
    title: '第三幕 · 护雏中毒',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_29_xingxiu_raid.jpg',
    illustrationCaption: '剑痕毒袭 · 星宿派三大毒徒骤发奇袭，玄难护佑小沙弥身中三笑逍遥散',
    mandatory: true,
    beats: [
      N('千钧一发之际，玄难首座大袖如云翻卷，硬生生将两名小沙弥拂飞出三丈开外，自己却因护人换气慢了半拍，迎面吸入一缕无色奇毒！'),
      S('NPC-0127', '（身形剧震，眉心骤然泛起一抹妖异嫣红，嘴角竟不受控制地浮出一丝惨笑）“咳……好阴毒的手段！这是丁春秋的『三笑逍遥散』……快走，莫管老衲！”'),
      S(SPEAKER_ZHAIXING, '（一把扯下胡商伪装，露出星宿派紫黑道袍，放声狂笑）“哈哈哈！大名鼎鼎的少林达摩院首座，今日也要三笑归西了！师弟师妹，趁这老秃驴内力受阻，先宰了这多管闲事的小和尚！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_04', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_04: {
    id: 'scene_slq29_04',
    title: '第四幕 · 毒障封崖',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('摘星毒师袖中连弹七枚碧磷毒弹，化作一片腥臭毒幕封死下山石阶，自己则退至崖边高石上冷眼督战，任由两名星宿毒徒扑杀而来！'),
      S(SPEAKER_XINGXIU_A, '（双掌漆黑如墨，腥风扑面）“小秃驴，识相的把玄难老儿留下，老子赏你个痛快！”'),
      S(SPEAKER_XINGXIU_B, '（指间夹着三枚蓝汪汪的透骨毒针，娇笑连连）“师兄别打烂他的脸，抓回去给师父炼毒人正好！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_05', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_05: {
    id: 'scene_slq29_05',
    title: '第五幕 · 浴血死守',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      P('（一步跨至玄难身前，真气鼓荡震开逼近的腐臭毒雾）“星宿妖孽敢闯我嵩山少林圣地行凶下毒，先过我这一关！”'),
    ],
    choices: [
      {
        id: 'slq29_accept_breakout',
        label: '护住中毒的玄难首座，血战星宿二毒徒杀出血路！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q29_QUEST_ID, stepId: 'cliff_ambush_breakout' },
          setStep(SHAOLIN_Q29_QUEST_ID, 'cliff_ambush_breakout'),
          toast('已开启《剑痕浴血 · 少林九阳》！迎战星宿毒徒护玄难突围！', 'talk', '剑痕浴血'),
          openScene('scene_slq29_06', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq29_06: {
    id: 'scene_slq29_06',
    title: '第六幕 · 双毒合击',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖（1v2 实战）',
    mandatory: true,
    beats: [
      N('碧磷毒徒与腐骨毒女一左一右包抄杀来，抽髓掌阴风蚀骨，透骨毒针防不胜防！你必须先斩断这两条毒蛇，才能背负玄难退入达摩洞幽谷石室！'),
    ],
    choices: [
      {
        id: 'slq29_fight_raiders',
        label: '屏息凝神，以一敌二迎战星宿派碧磷毒徒与腐骨毒女！（1v2 实战）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q29_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuRaiderA() },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuRaiderB() }],
            rule: 'duel',
            forbidEscapeReason: '玄难首座身中剧毒倒在身后，退一步便万劫不复！',
            introText: '星宿二毒徒挟毒掌毒针扑杀而来，务须尽快击溃二人护玄难突围！',
            onWin: [openScene('scene_slq29_07', SHAOLIN_Q29_QUEST_ID)],
            onLose: [openScene('scene_slq29_08', SHAOLIN_Q29_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq29_07: {
    id: 'scene_slq29_07',
    title: '第七幕 · 破围救师',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你以刚猛佛门内劲护住周身经脉，硬撼抽髓毒掌，掌风如雷震飞腐骨毒女的毒针，顺势一记重掌将碧磷毒徒震得口吐黑血倒飞出三丈开外！'),
      S(SPEAKER_ZHAIXING, '（在崖石上微微色变，冷哼一声纵身扑下）“废物！连个真传弟子都拿不下！待本大师兄亲自来收你们师徒的命！”'),
      S('NPC-0127', '（咬破舌尖强提一丝清明，抓紧你衣袖低喝）“{playerName}……莫与摘星硬拼，他身负丁春秋化功毒劲！快背老衲退入达摩洞寒玉榻……洞内有压制奇毒之法！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_09', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_08: {
    id: 'scene_slq29_08',
    title: '第八幕 · 毒掌暂退',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('二贼毒招阴狠刁钻，你一时被毒雾迷眼，险些遭暗算。幸亏玄难首座强忍剧毒挥出一道隔空指劲逼退二贼，护你稳住阵脚。'),
      S('NPC-0127', '（气息微弱）“稳住心神，闭气运功护住膻中，再战二贼杀出血路！”'),
    ],
    onFinishEffects: [{ type: 'healPlayer', hpPct: 75, mpPct: 75 }],
  },

  scene_slq29_09: {
    id: 'scene_slq29_09',
    title: '第九幕 · 背师疾行',
    subtitle: '达摩院 · 绝壁栈道',
    mandatory: true,
    beats: [
      N('你二话不说俯身背起玄难首座，足尖发力施展轻功沿绝壁栈道狂奔！摘星毒师在后怒啸追击，一道道阴寒毒掌劈碎身后山石，碎屑纷飞如雨。'),
      P('（咬牙提速，一掌震落洞口千斤断龙石机括，暂阻毒雾涌入）“师叔撑住！咱们已进达摩洞石道！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_10', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_10: {
    id: 'scene_slq29_10',
    title: '第十幕 · 断石阻毒',
    subtitle: '达摩院 · 幽谷石道',
    mandatory: true,
    beats: [
      N('石门轰然落下，外间传来摘星毒师阴恻恻的叫嚣：“躲进乌龟壳里便以为能活命？三笑逍遥散发作只需半个时辰，待老秃驴笑断心脉，我看你拿什么挡我化功大法！”'),
      N('事不宜迟，你背着气息渐弱的玄难直奔幽谷石室深处的千年寒玉榻！'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q29_QUEST_ID, 'damo_cave_inheritance'),
      toast('已护玄难退入达摩洞！请前往【幽谷石室 · 寒玉榻】救治玄难。', 'talk', '背师入洞'),
      openScene('scene_slq29_11', SHAOLIN_Q29_QUEST_ID),
    ],
  },

  scene_slq29_11: {
    id: 'scene_slq29_11',
    title: '第十一幕 · 寒玉镇毒',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你将玄难小心安放在寒气缭绕的千年寒玉榻上。至阴至寒的玉气甫一透入背心，玄难眉心那抹妖异嫣红顿缓三分，第二声致命狂笑竟被硬生生压了下去。'),
      S('NPC-0127', '（盘膝闭目，额上豆大汗珠滚落，声音沙哑却无比沉稳）“好孩子……寒玉只能替老衲锁毒一个时辰。三笑逍遥散阴损无比，寻常少林内功偏刚偏猛，反易催动毒血攻心……”'),
      P('（焦急不已）“那该如何是好？弟子愿拼死冲出去请药王院玄生师叔来救！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_12', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_12: {
    id: 'scene_slq29_12',
    title: '第十二幕 · 暗格孤本',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0127', '（摇头叹道）“摘星毒师携腐毒守在崖外，你此刻独闯必中其计，纵使玄生赶到也来不及了。世间能以纯阳真气立克星宿阴毒、且不伤经脉者，唯有一门武功——”'),
      N('玄难颤巍巍抬起右手，在寒玉榻底侧青莲浮雕上连按三下。只听「咔嗒」一声轻响，一道暗格悄然弹开，内中静静躺着一卷以金丝油布严密包裹的泛黄古钞！'),
    ],
    onFinishEffects: [openScene('scene_slq29_13', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_13: {
    id: 'scene_slq29_13',
    title: '第十三幕 · 九阳密钞',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    illustrationUrl: '/assets/quests/sl_29_jiuyang_scroll.jpg',
    illustrationCaption: '密钞九阳 · 寒玉榻暗格现世，玄难亲授《少林九阳禅功密钞》',
    mandatory: true,
    beats: [
      N('你双手恭敬捧出古钞，只见封皮以端庄楷书题着八个朱砂大字——《少林九阳禅功密钞》！纸页虽历百余载岁月，翻开时仍隐隐透出一股温润如春阳的浩然气象。'),
      S('NPC-0127', '（目光炯炯望向你）“当年觉远一脉禅师曾自《楞伽经》夹缝悟出九阳真意，惜乎全本早已散佚，唯余这卷《少林九阳禅功密钞》藏于达摩院禁地。此功至阳至纯、百毒不侵、生生不息，最克星宿腐毒与化功邪法！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_14', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_14: {
    id: 'scene_slq29_14',
    title: '第十四幕 · 临危口授',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0127', '（神色肃穆）“你入寺十四载，佛法经义精深、临危不弃同门，心性根骨俱为当代真传之冠！今日老衲便破例将这卷密钞赐予你，并趁寒玉镇毒之际，亲自口授《少林九阳功》运功总纲！”'),
      P('（双膝跪地，重重叩首）“弟子定当竭尽全力参悟九阳禅功，先替师叔逼毒破敌，绝不负师门厚望！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_15', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_15: {
    id: 'scene_slq29_15',
    title: '第十五幕 · 楞伽总纲',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0127', '（逐字吟诵，声如古钟在石室回荡）“听好了——『他强由他强，清风拂山岗；他横由他横，明月照大江。他自狠来他自恶，我自一口真气足！』”'),
      N('你凝神细读《少林九阳禅功密钞》上密密麻麻的梵汉双解注疏，平日苦修的八十余重佛学经义与书法功底此刻豁然贯通，字字句句化作金色暖流映入识海！'),
    ],
    onFinishEffects: [openScene('scene_slq29_16', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_16: {
    id: 'scene_slq29_16',
    title: '第十六幕 · 丹田起阳',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你依玄难指点盘膝闭目，意守丹田气海，先将体内原有少林内功缓缓化柔，再引一缕微弱却炽烈如初升旭日的纯阳真气沿任督二脉缓缓游走。'),
      N('起初经脉如遭烈火灼烧，剧痛难当；但随着你默诵《楞伽经》禅偈，那股炽热骤然化作温煦磅礴的春阳暖流，所过之处，方才在剑痕崖吸入的丝丝毒瘴竟瞬间蒸发殆尽！'),
    ],
    onFinishEffects: [openScene('scene_slq29_17', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_17: {
    id: 'scene_slq29_17',
    title: '第十七幕 · 纯阳初成',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('半个时辰转瞬即逝，你周身骤然腾起一层淡淡金辉，双掌泛出温润赤光，石室中刺骨的寒玉冷气竟被你体表纯阳气罩逼退三尺！'),
      S('NPC-0127', '（睁开双眼，满面欣慰之色）“善哉！善哉！竟在半个时辰内便贯通了《少林九阳功》第一重纯阳根基！快，以此纯阳真气替老衲逼出心脉余毒！”'),
      N('你立刻坐于玄难身后，双掌抵住其灵台大穴，绵绵不绝的纯阳真气涌入经脉——顷刻间，玄难口中吐出一大口腥臭黑血，眉心那抹妖异嫣红随之消散过半！'),
    ],
    onFinishEffects: [teachArtNow('MA-038'), openScene('scene_slq29_18', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_18: {
    id: 'scene_slq29_18',
    title: '第十八幕 · 崖外叫阵',
    subtitle: '达摩院 · 幽谷石室',
    mandatory: true,
    beats: [
      N('就在此时，断龙石外传来一阵轰隆震响与刺鼻焦糊味！摘星毒师竟命残余毒徒在洞口焚烧毒草硫磺，企图将毒烟灌入石室！'),
      S(SPEAKER_ZHAIXING, '（阴冷笑声透过石缝传来）“里面没动静了？看来玄难老秃驴已经笑死啦！小和尚，乖乖爬出来跪降，本座饶你全尸！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_19', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_19: {
    id: 'scene_slq29_19',
    title: '第十九幕 · 提掌出洞',
    subtitle: '达摩院 · 幽谷石室',
    mandatory: true,
    beats: [
      S('NPC-0127', '（盘坐寒玉榻上缓缓调息，郑重叮嘱）“老衲心脉已保，余毒靠寒玉与运功便可自行拔除。外间毒烟若久聚不散，恐波及达摩院诸僧！{playerName}，你以新成之《少林九阳功》重返剑痕崖，务必要将摘星毒师彻底击溃！”'),
      P('（双掌合十，周身纯阳真气隐隐作响）“师叔安心调息！弟子这便去剑痕崖，教那星宿妖人见识见识少林纯阳佛掌！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      setStep(SHAOLIN_Q29_QUEST_ID, 'pure_yang_showdown'),
      toast('玄难已口授《少林九阳功》心诀！请重返【绝壁石刻 · 剑痕崖】决战摘星毒师！', 'talk', '纯阳出洞'),
      openScene('scene_slq29_20', SHAOLIN_Q29_QUEST_ID),
    ],
  },

  scene_slq29_20: {
    id: 'scene_slq29_20',
    title: '第二十幕 · 破石震雾',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你一掌推开千斤断龙石，大步踏出幽谷石道！滚滚黄绿毒烟迎面扑来，却在触及你身前三尺时如冰雪遇骄阳般滋滋消融！'),
      S(SPEAKER_ZHAIXING, '（瞳孔骤缩，失声惊呼）“什么？！你的护体真气竟能直接焚化我星宿碧磷烟？你方才在洞里练了什么邪门神功！”'),
      P('（朗声喝道，声音如洪钟震彻山谷）“非是邪门，乃是专克尔等阴毒妖法的佛门正宗——《少林九阳功》！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_21', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_21: {
    id: 'scene_slq29_21',
    title: '第二十一幕 · 摘星决战',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖（决战一流上品）',
    mandatory: true,
    beats: [
      S(SPEAKER_ZHAIXING, '（面色铁青，双袖鼓荡起森寒紫黑毒气，施展出丁春秋亲传的化功大法与抽髓掌）“狂妄小僧！管你什么九阳十阳，进了本座化功毒掌之下，都要化作一滩脓水！”'),
      N('毒风呼啸，剑痕崖石壁草木瞬间枯黑！此战关乎玄难首座与达摩院安危，唯有全力以赴！'),
    ],
    choices: [
      {
        id: 'slq29_fight_zhaixing',
        label: '催动少林九阳纯阳真气，正面决战星宿大弟子摘星毒师！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q29_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhaixingBoss() },
            rule: 'duel',
            forbidEscapeReason: '玄难首座尚在洞中疗毒，绝不可放摘星毒师踏入石室一步！',
            introText: '星宿派大弟子摘星毒师施展化功毒劲扑杀而来，以纯阳内力将其彻底击溃！',
            onWin: [openScene('scene_slq29_22', SHAOLIN_Q29_QUEST_ID)],
            onLose: [openScene('scene_slq29_23', SHAOLIN_Q29_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq29_22: {
    id: 'scene_slq29_22',
    title: '第二十二幕 · 纯阳佛掌',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_29_pure_yang_blast.jpg',
    illustrationCaption: '纯阳佛掌 · 少林九阳真气沛然勃发，一掌震散满崖星宿腐毒',
    mandatory: true,
    beats: [
      N('激战数十合，摘星毒师见化功毒劲竟吸不动你生生不息的九阳真气，反被灼得双掌发红起泡，顿时心胆俱裂！'),
      N('你抓住破绽，将全身纯阳真气尽数贯注双掌，一记堂堂正正的佛门伏魔掌轰然拍出！炽烈金光如烈日炸裂，硬生生震碎摘星毒师护体毒障，将其拍得口喷鲜血、滚落山道十余丈！'),
      N('狂暴纯阳掌风横扫剑痕崖，满崖弥漫的碧磷腐毒与三笑毒烟竟被一掌震散得干干净净，秋日晴空重现少室绝壁！'),
    ],
    onFinishEffects: [openScene('scene_slq29_24', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_23: {
    id: 'scene_slq29_23',
    title: '第二十三幕 · 凝气再战',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('摘星毒师阴毒暗器防不胜防，你一时不察被毒掌震退数步。但丹田内九阳真气生生不息，转瞬便将侵入经脉的寒毒逼出体外！'),
      P('（深吸一口长气，双掌重燃纯阳赤芒）“九阳真气专克百毒，再来！”'),
    ],
    onFinishEffects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
  },

  scene_slq29_24: {
    id: 'scene_slq29_24',
    title: '第二十四幕 · 妖徒溃逃',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S(SPEAKER_ZHAIXING, '（捂着焦黑剧痛的胸口，满脸惊恐怨毒地死死盯住你）“少林……少林竟还藏着这等专克我星宿毒功的纯阳绝学！小子，你给我记住，老仙绝不会善罢甘休！”'),
      N('话音未落，远方钟鼓楼已传来武僧合围的急促钟声！摘星毒师见大势已去，一把抓起昏迷的同伙，施展轻功狼狈滚下乱石坡，遁入苍茫山林逃之夭夭。'),
    ],
    onFinishEffects: [openScene('scene_slq29_25', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_25: {
    id: 'scene_slq29_25',
    title: '第二十五幕 · 玄难出洞',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('少顷，石门缓缓开启。玄难首座虽面色仍略显苍白，步履却已沉稳如昔，在闻讯赶来的达摩院武僧搀扶下步上剑痕崖。'),
      S('NPC-0127', '（望着崖壁焦痕与澄澈晴空，双手合十深深一叹）“阿弥陀佛……若非{playerName}拼死护持、又于危难之际悟透《少林九阳功》，老衲今日必已毙命于星宿毒手之下！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_26', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_26: {
    id: 'scene_slq29_26',
    title: '第二十六幕 · 赐钞正名',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '（将那卷金丝油布包裹的《少林九阳禅功密钞》郑重交还你手中）“此功本为救人伏魔而生，今日在你手中大放异彩，乃天意亦是佛缘。这卷密钞便归你珍藏研习，日后若再遇西域毒邪或内家阴毒暗算，有九阳护体，何惧之有！”'),
      P('（双手接过密钞，躬身拜谢）“弟子必谨记师叔教诲，以纯阳佛法济世伏魔，绝不堕达摩院威名！”'),
    ],
    onFinishEffects: [openScene('scene_slq29_27', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_27: {
    id: 'scene_slq29_27',
    title: '第二十七幕 · 暗影余波',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '（望向远方西域天际，神色转沉）“只是丁春秋远在星宿海，素来诡计多端，此次怎会精准知晓老衲今日巡视剑痕崖，甚至暗中窥伺寒玉榻？恐怕中原暗处，还有人与西域魔头暗通款曲……”'),
      N('你听罢心头微动，隐隐将此事与七夕夜藏经阁的双影暗流联系在了一起。山雨欲来风满楼，少林寺的真正考验还在后头。'),
    ],
    choices: [
      {
        id: 'slq29_complete_monk',
        label: '珍藏《少林九阳禅功密钞》，修习《少林九阳功》（完成）',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'teachMartialArt', artId: 'MA-038' },
          { type: 'giveItem', itemId: 'ITM-SCR-011', qty: 1 },
          { type: 'giveCombatExp', amount: 880, reason: '剑痕浴血 · 少林九阳' },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q29_QUEST_ID, outcome: 'completed' },
          toast(
            '《剑痕浴血 · 少林九阳》完结！习得《少林九阳功》，获赐《少林九阳禅功密钞》，实战经验 +880，师门贡献 +300，经义 +2，玄难好感 +30！',
            'success',
            '少林九阳',
          ),
          openScene('scene_slq29_28', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'slq29_complete_layman',
        label: '遵祖训将《少林九阳禅功密钞》交还达摩洞封存（完成）',
        subLabel: '俗家弟子依少林清规不授《少林九阳功》与密钞，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'giveCombatExp', amount: 1200, reason: '剑痕崖血战退星宿毒师、力救玄难首座' },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q29_QUEST_ID, outcome: 'completed' },
          toast(
            '《剑痕浴血 · 少林九阳》完结！（俗家不授《少林九阳功》）实战经验 +1200，师门贡献 +300，经义 +2，玄难好感 +30！',
            'success',
            '剑痕救师',
          ),
          openScene('scene_slq29_28', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq29_28: {
    id: 'scene_slq29_28',
    title: '第二十八幕 · 丹心映秋',
    subtitle: '嵩山少林寺 · 达摩院',
    mandatory: true,
    beats: [
      N('夕阳西下，漫山红叶在清风中沙沙作响。{ifFlag:sl_branch==layman|你将密钞安然封回达摩洞暗格，虽未逾矩修习本寺至阳内功，然此役力挫摘星毒师、力救玄难首座之义举，已传遍少室内外。|你怀揣《少林九阳禅功密钞》，体内真气如江河奔涌生生不息——自此一役，你「纯阳真传」之名已传遍少室内外。}'),
    ],
  },
}
