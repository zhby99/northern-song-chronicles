import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q32_QUEST_ID } from './shaolinNineTurnPillQuest'

const SPEAKER_SHA_ONE: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁面煞 · 拓跋狼',
  title: '西夏一品堂 · 毁炉死士首领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_SHA_TWO: StorySpeakerSpec = {
  kind: 'custom',
  name: '幽影煞 · 贺兰鬼',
  title: '西夏一品堂 · 毁炉死士',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

const SPEAKER_SHA_THREE: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒蝎煞 · 嵬名娘',
  title: '西夏一品堂 · 毁炉女煞',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
}

function buildShaOneLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ32_SHA_ONE',
    name: '铁面煞 · 拓跋狼',
    title: '西夏一品堂 · 毁炉死士首领',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂死士首',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“砸碎药王丹炉！少林秃驴今夜便全数毒发身亡！”',
    stats: { hp: 3120, mp: 2780, agi: 74, res: 56 },
    talents: { bone: 86, comprehension: 78, charm: 34 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-098',
      move1: 'MA-133',
      move2: 'MA-046',
    },
    learnedArts: [
      { artId: 'MA-245', level: 8 },
      { artId: 'MA-098', level: 8 },
      { artId: 'MA-133', level: 8 },
      { artId: 'MA-046', level: 8 },
    ],
  })
}

function buildShaTwoGhost(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ32_SHA_TWO',
    name: '幽影煞 · 贺兰鬼',
    title: '西夏一品堂 · 毁炉死士',
    realm: '一流中品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂死士',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“我绕后掀翻丹炉，大哥拖住这小和尚！”',
    stats: { hp: 2560, mp: 2350, agi: 76, res: 50 },
    talents: { bone: 80, comprehension: 80, charm: 36 },
    equippedArts: {
      neigong: 'MA-245',
      qinggong: 'MA-097',
      move1: 'MA-084',
      move2: 'MA-085',
    },
    learnedArts: [
      { artId: 'MA-245', level: 7 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-084', level: 8 },
      { artId: 'MA-085', level: 7 },
    ],
  })
}

function buildShaThreeScorpion(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ32_SHA_THREE',
    name: '毒蝎煞 · 嵬名娘',
    title: '西夏一品堂 · 毁炉女煞',
    realm: '一流中品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂女煞',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    talk: '“把悲酥毒粉泼进药炉里，叫他们炼出一炉穿肠剧毒！”',
    stats: { hp: 2380, mp: 2480, agi: 75, res: 48 },
    talents: { bone: 78, comprehension: 82, charm: 62 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-097',
      move1: 'MA-065',
      move2: 'MA-095',
    },
    learnedArts: [
      { artId: 'MA-231', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-065', level: 7 },
      { artId: 'MA-095', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq32_01: {
    id: 'scene_slq32_01',
    title: '第一幕 · 泉水生变',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，鹅毛大雪连下三日。清晨未过卯时，少林寺大雄宝殿东厢已挤满抬送病僧的担架，呻吟咳嗽之声此起彼伏，气氛惨烈如临大敌！'),
      N('你闻讯赶至东厢临时药房，只见药王院主玄生白眉紧锁，手中银针扎过一碗浑浊山泉水，针尖竟瞬间乌黑发紫！'),
      S('NPC-0158', '（声音微颤，难掩震怒）“阿弥陀佛……好狠毒的手段！昨夜有人趁大雪封山，在嵩山后崖泉眼投下西夏秘制『悲酥瘟瘴』！如今斋堂饮水波及半寺，已有三百余名弟子寒热交攻、真气溃散！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_02', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_02: {
    id: 'scene_slq32_02',
    title: '第二幕 · 幕后黑手',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      P('（接过药童自泉眼拾回的半片青瓷毒瓶残片，细辨瓶底暗纹与毒方笔迹）“师叔请看！这毒粉是西夏一品堂的悲酥清风变种，可封口所用的防潮冰蜡与包药宣纸，却产自江南姑苏！”'),
      S('NPC-0158', '（倒吸一口凉气）“西夏一品堂竟与江南暗势力勾结，趁此寒冬意图一举瘫痪我嵩山少林！玄慈方丈与诸位玄字辈首座正竭力以深厚内力替重病幼僧续命，此刻能开炉炼药、力挽狂澜者，唯靠我药王院！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_03', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_03: {
    id: 'scene_slq32_03',
    title: '第三幕 · 缺一君药',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('玄生迅速铺开《少林药王秘典》，翻至压箱底的「九转清瘟回魂汤」古方，指着排在首位的君药长叹一声。'),
      S('NPC-0158', '（焦灼万分）“其余三十五味珍药我药王院皆有库存，唯独这味镇方君药——『千年血灵芝』早已用罄！唯有达摩院后山【飞瀑深潭 · 试炼涧】极寒冰壁裂缝之中，尚生着一株野生赤芝。可如今飞瀑结冰、绝壁滑如明镜，稍有差池便粉身碎骨！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_04', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_04: {
    id: 'scene_slq32_04',
    title: '第四幕 · 请缨采芝',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      P('（毫无犹豫，当即抱拳合十）“师叔且先引火温炉、备齐辅药！弟子身怀《少林九阳功》不惧奇寒，又精研轻功身法，愿即刻赴飞瀑深潭采摘千年血灵芝！”'),
      S('NPC-0158', '（眼眶微热，递过一只玄铁采药小锄与暖玉盒）“全寺数百同门性命系于此行！万望小心冰壁暗风，速去速回！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_05', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_05: {
    id: 'scene_slq32_05',
    title: '第五幕 · 踏雪奔涧',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('你收好暖玉药盒，顶着漫天朔雪跃出东厢，直奔达摩院西侧【飞瀑深潭 · 试炼涧】！'),
    ],
    choices: [
      {
        id: 'slq32_start_herb',
        label: '身负全寺同门性命，疾赴达摩院飞瀑深潭采摘千年血灵芝！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q32_QUEST_ID, stepId: 'fetch_blood_lingzhi' },
          setStep(SHAOLIN_Q32_QUEST_ID, 'fetch_blood_lingzhi'),
          toast('已开启《药王瘟劫 · 九转回魂》！请速赴【达摩院 · 飞瀑深潭 · 试炼涧】采芝！', 'talk', '药王瘟劫'),
          openScene('scene_slq32_06', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq32_06: {
    id: 'scene_slq32_06',
    title: '第六幕 · 冰瀑绝壁',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('飞瀑深潭此刻已化作一片晶莹剔透的冰谷。百丈悬瀑冻成无数狰狞冰柱，寒潭水面漂浮着厚薄不一的碎冰，刺骨罡风如刀子般刮过脸颊。'),
      N('你仰首望去，只见深潭对岸三丈高的滑冰石缝之间，一株通体赤红如珊瑚、隐隐散发温热红晕的「千年血灵芝」正傲雪绽放！'),
    ],
    onFinishEffects: [openScene('scene_slq32_07', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_07: {
    id: 'scene_slq32_07',
    title: '第七幕 · 一苇渡涧',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    illustrationUrl: '/assets/quests/sl_32_ice_cliff_herb.jpg',
    illustrationCaption: '冰崖采芝 · 施展一苇渡江绝顶轻功，踏冰跃涧采得千年血灵芝',
    mandatory: true,
    beats: [
      N('深潭宽逾七丈，浮冰承重不得，寻常轻功根本无从借力！你深吸一口少林九阳纯阳真气，折下一根岸边枯芦抛入潭面，足尖轻点枯芦与碎冰边缘，施展出少林无上轻功「一苇渡江」！'),
      N('身形如白鹤掠水、御风而行！你连点三块浮冰不溅半点水花，陡然拔身三丈，在罡风咆哮中稳稳扣住冰壁凸石，反手以玄铁药锄连根起出那株灵气四溢的千年血灵芝！'),
    ],
    onFinishEffects: [openScene('scene_slq32_08', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_08: {
    id: 'scene_slq32_08',
    title: '第八幕 · 满载飞归',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('千年血灵芝一入暖玉盒，霎时红光微敛、药香锁闭。你借冰壁反蹬之力凌空翻回岸边，不敢耽搁半息，施展轻功飞步折返大雄宝殿东厢丹房！'),
    ],
    onFinishEffects: [openScene('scene_slq32_09', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_09: {
    id: 'scene_slq32_09',
    title: '第九幕 · 君药入炉',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('东厢丹房内炭火通红，玄生接过千年血灵芝，喜极而泣：“好！真乃佛祖保佑！灵芝药性完好无损，老衲这便投药封炉！”'),
      N('随着千年血灵芝化入沸腾铜鼎，一股沁人心脾的清苦药香顿时弥漫东厢，连廊外几名咳血不止的小沙弥闻到药气，面色都舒缓了几分。'),
    ],
    onFinishEffects: [openScene('scene_slq32_10', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_10: {
    id: 'scene_slq32_10',
    title: '第十幕 · 火候将成',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      S('NPC-0158', '（盘坐铜炉前以纯和内力催动文武火，额头汗如雨下）“此炉『九转清瘟回魂汤』与伴生大丹正值融药紧要关头，万不可断火泄气！老衲需全神贯注控火半柱香，门户安危便全托付予你了！”'),
      P('（横身立于东厢朱门之前，双目如电扫视漫天飞雪）“师叔安心控火！有弟子在此，纵是千军万马也休想近丹炉一步！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_11', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_11: {
    id: 'scene_slq32_11',
    title: '第十一幕 · 暗夜杀机',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('话音未落，屋脊积雪轰然炸裂！三道身披西夏黑毡斗篷、面戴青铜恶鬼面具的森寒身影如夜枭般破雪扑下，直扑东厢丹房朱门！'),
      S(SPEAKER_SHA_ONE, '（亮出一口厚背西夏斩马弯刀，沙哑狂笑）“果然叫这老秃驴找到解药了！弟兄们，咱们一品堂『毁炉三煞』奉赫连大将军死令——今夜砸碎铜炉、格杀玄生，叫少林彻底灭门！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_12', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_12: {
    id: 'scene_slq32_12',
    title: '第十二幕 · 独挡三煞',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      S(SPEAKER_SHA_TWO, '（双爪泛起森寒幽绿，身形鬼魅般绕向左侧窗棂）“寺里高手大多中了瘟毒，就凭这一个真传弟子挡得住咱们三兄弟联手？”'),
      S(SPEAKER_SHA_THREE, '（娇笑一声，抖手取出两包惨白毒粉）“只要把这包悲酥毒粉泼进药炉，半寺秃驴全得归西！”'),
      P('（一步踏前震碎脚下积雪，周身九阳纯阳真气轰然爆发）“有我在此，尔等西夏魔犬休想越过门槛半步！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q32_QUEST_ID, 'guard_pill_furnace'),
      toast('西夏一品堂毁炉三煞夜袭丹房！请守在【东厢碑廊】死战三煞护炉成药！', 'talk', '护炉血战'),
      openScene('scene_slq32_13', SHAOLIN_Q32_QUEST_ID),
    ],
  },

  scene_slq32_13: {
    id: 'scene_slq32_13',
    title: '第十三幕 · 护炉死战',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊（1v3 死战）',
    illustrationUrl: '/assets/quests/sl_32_guard_furnace.jpg',
    illustrationCaption: '独守丹房 · 风雪夜独战西夏一品堂毁炉死士三煞，寸步不让',
    mandatory: true,
    beats: [
      N('毁炉三煞同时暴喝扑来——铁面煞弯刀力劈华山，幽影煞鬼爪直掏心窝，毒蝎煞毒针毒粉漫天齐发！身后便是玄生与救命丹炉，此战寸步不可退！'),
    ],
    choices: [
      {
        id: 'slq32_fight_three_sha',
        label: '寸步不退，以一敌三死战西夏一品堂毁炉三煞！（1v3 死战）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q32_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShaOneLeader() },
            extraOpponents: [
              { kind: 'custom', npc: buildShaTwoGhost() },
              { kind: 'custom', npc: buildShaThreeScorpion() },
            ],
            rule: 'duel',
            forbidEscapeReason: '身后丹炉系全寺数百同门性命，退一步即少林倾覆，唯有死战！',
            introText: '西夏一品堂毁炉死士三煞联手强攻东厢丹房，拼死守住丹炉直至丹成！',
            onWin: [openScene('scene_slq32_14', SHAOLIN_Q32_QUEST_ID)],
            onLose: [openScene('scene_slq32_15', SHAOLIN_Q32_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq32_14: {
    id: 'scene_slq32_14',
    title: '第十四幕 · 浴血斩煞',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('你背抵朱门，以纯阳九阳真气护住丹房门户，硬接铁面煞数记重刀不退半步！待毒蝎煞飞身欲向窗内抛洒毒粉之际，你凌空一记隔空掌劲将毒粉尽数震回其面门，反手回身连出绝学重创幽影煞！'),
      N('激战百余合，毁炉三煞终被你拼死斩杀殆尽！三具黑衣尸身倒卧雪地，而你身后的东厢药王丹房木门竟未损半分！'),
    ],
    onFinishEffects: [openScene('scene_slq32_16', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_15: {
    id: 'scene_slq32_15',
    title: '第十五幕 · 丹气续力',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('三煞合击凶猛异常，你一时气血翻涌连退两步。恰在此时，丹房内飘出一缕醇厚无比的灵芝丹香，玄生亦隔门弹出一枚保元丹助你提振真气！'),
      S('NPC-0158', '（高声呼喊）“炉火只差最后一刻！撑住，切莫让贼人破门！”'),
    ],
    onFinishEffects: [{ type: 'healPlayer', hpPct: 85, mpPct: 85 }],
  },

  scene_slq32_16: {
    id: 'scene_slq32_16',
    title: '第十六幕 · 药鼎鸣龙',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('就在最后一名死士倒下的刹那，东厢丹房内轰然传出一声清越龙吟般的鼎鸣！九道金色药雾冲开炉盖直贯梁顶，奇异清香瞬间压过漫天血腥与风雪！'),
      S('NPC-0158', '（推开丹房大门，见满地血雪与浑身浴血仍岿然不动的你，老泪纵横）“成了！九转清瘟回魂汤成了！快——速命各院无恙弟子分汤救人！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_17', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_17: {
    id: 'scene_slq32_17',
    title: '第十七幕 · 回魂救寺',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('一碗碗温热赤红的回魂灵汤被飞快送往各院禅房。不到一个时辰，三百余名中毒僧众相继呕出体内寒毒黑血，高热尽退、呼吸转稳，竟无一人因瘟劫丧命！'),
      N('大雄宝殿钟声长鸣九响，合寺僧众无不双手合十向天礼佛，口中齐诵你孤身采芝、浴血护炉之大德！'),
    ],
    onFinishEffects: [openScene('scene_slq32_18', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_18: {
    id: 'scene_slq32_18',
    title: '第十八幕 · 鼎底圣丹',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('待众僧安顿妥当，玄生将你请入丹房之内。只见那口古铜药鼎底部，竟在千年血灵芝与少林三十五味秘药精华凝聚之下，额外凝结出了一枚龙眼大小、通体流转九道金纹的稀世宝丹！'),
      S('NPC-0158', '（手捧玉匣，满面惊叹与虔诚）“阿弥陀佛！此乃少林创寺以来百年难得一遇的天阶至宝——『少林九转大还丹』！非有千年血灵芝与大功德护炉之气运，断不能成！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_19', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_19: {
    id: 'scene_slq32_19',
    title: '第十九幕 · 九转赐丹',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    illustrationUrl: '/assets/quests/sl_32_nine_turn_pill.jpg',
    illustrationCaption: '九转回魂 · 药王院主玄生亲赠少林天阶圣药《少林九转大还丹》',
    mandatory: true,
    beats: [
      S('NPC-0158', '（将盛放九转大还丹的白玉匣郑重推至你面前）“此丹无论多重的内伤濒死，服之皆可起死回生、功力倍增！今日你拼死救下全寺数百同门性命，此等无上圣药，全寺上下唯有你受之无愧！”'),
      P('（连忙推辞）“师叔言重了！弟子身为少林真传，护寺救同门乃分内之事，此丹贵重无比，理应归药王院珍藏……”'),
    ],
    onFinishEffects: [openScene('scene_slq32_20', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_20: {
    id: 'scene_slq32_20',
    title: '第二十幕 · 义不容辞',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      S('NPC-0158', '（微笑摇头，不容分说将玉匣放入你掌中）“宝药配英雄，方不负济世本心。日后天下武林风云动荡，你肩负少林重任，留着这枚『少林九转大还丹』傍身，关键时刻既能救己，亦能救天下苍生！”'),
      P('（双手接过玉匣，深深一揖）“既如此，弟子愧领师叔厚赐！必以此丹济危扶困，绝不负药王院百年仁心！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_21', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_21: {
    id: 'scene_slq32_21',
    title: '第二十一幕 · 暗流浮面',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      S('NPC-0158', '（收起笑容，神色凝重地望向窗外风雪）“只是西夏一品堂接连向我少林发难，背后又有江南暗影推波助澜。玄慈方丈已下密谕，待开春之后便要召开菩提院全寺玄字辈大议，商讨应付天下群雄与少室山大会之策……”'),
      N('你听罢心中一凛，知道少林真正的百年大考即将来临。'),
    ],
    onFinishEffects: [openScene('scene_slq32_22', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_22: {
    id: 'scene_slq32_22',
    title: '第二十二幕 · 仁名远播',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('经此一役，你不仅武功冠绝少林真传，更以孤身采芝、浴血护炉之仁义豪情赢得全寺上下与中原武林由衷敬仰，侠义之名传遍河洛。'),
    ],
    onFinishEffects: [openScene('scene_slq32_23', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_23: {
    id: 'scene_slq32_23',
    title: '第二十三幕 · 丹成劫平',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('你贴身收好白玉药匣，向玄生合十辞行。风雪渐停，东厢碑廊在晨曦映照下焕发出劫后余生的安宁光辉。'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
      { type: 'giveCombatExp', amount: 920, reason: '药王瘟劫 · 九转回魂' },
      { type: 'addSectContribution', amount: 320 },
      { type: 'modifyChivalry', delta: 50, reason: '孤身采芝护炉救全寺僧众' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0158' }, delta: 30 },
      { type: 'completeQuest', questId: SHAOLIN_Q32_QUEST_ID, outcome: 'completed' },
      toast(
        '《药王瘟劫 · 九转回魂》完结！获赐天阶圣药《少林九转大还丹》，实战经验 +920，师门贡献 +320，侠义 +50，经义 +1，玄生好感 +30！',
        'success',
        '九转回魂',
      ),
      openScene('scene_slq32_24', SHAOLIN_Q32_QUEST_ID),
    ],
  },

  scene_slq32_24: {
    id: 'scene_slq32_24',
    title: '第二十四幕 · 雪霁少室',
    subtitle: '嵩山少林寺 · 大雄宝殿方丈院',
    mandatory: true,
    beats: [
      N('大雪初霁，阳光洒满少室银峰。药香犹在衣袖间萦绕，而属于你的少林长老首座之路，已近在眼前。'),
    ],
  },
}
