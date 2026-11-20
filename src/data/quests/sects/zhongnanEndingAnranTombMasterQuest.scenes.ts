import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q38_QUEST_ID } from './zhongnanEndingAnranTombMasterQuest'

const SPEAKER_POISON_COMMANDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂毒火都统 · 赫连焚天',
  title: '西夏一品堂死士残部统领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildPoisonCommanderBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ38_POISON_COMMANDER',
    name: '一品堂毒火都统 · 赫连焚天',
    title: '西夏一品堂死士残部统领',
    realm: '宗师中品',
    factionName: '西夏一品堂',
    sectRank: 0,
    sectRankLabel: '毒火都统',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“哈哈哈哈！重阳古观早已与你们断桥绝交，今日谁来救你们活死人墓？！吃了我西夏九幽雷火毒弹，连神仙也要化作脓血！”',
    stats: { hp: 5850, mp: 5400, agi: 85, res: 78 },
    talents: { bone: 86, comprehension: 80, charm: 28 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-091', move2: 'MA-065' },
    learnedArts: [{ artId: 'MA-026', level: 9 }, { artId: 'MA-091', level: 10 }, { artId: 'MA-065', level: 9 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq38_01: {
    id: 'scene_znq38_01',
    title: '第一幕 · 孤墓霜寒',
    subtitle: '活死人墓 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，凄雨冷风拍打着终南后山的青石绝壁。自道墓断桥割席以来，活死人墓与前山重阳古观再无半分往来，幽谷寂静得仿佛被世间遗忘。'),
      N('冰魄石室内，林朝瑶正在寒玉床上调息，冷清秋安静地在一旁修剪烛芯，微弱的夜明珠光映照着二人清瘦而静谧的身影。'),
    ],
    onFinishEffects: [openScene('scene_znq38_02', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_02: {
    id: 'scene_znq38_02',
    title: '第二幕 · 幽谷旧话',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0173', '（望向你，眸中透着几分唯有知己方懂的温柔）“{ifFlag:zn_mu_heart==qingqiu|这些年幽谷寒寂，幸好有你一直在身边。哪怕天下皆与古墓为敌，只要你我并肩，便也不觉孤单。|这些年幽谷寒寂，你为了护持古墓劳心劳力，清秋都看在眼里。}”'),
      S('NPC-0114', '（轻轻睁目，淡淡一笑）“外头雨势大了。清秋，去看看外门暗哨的玉蜂是否归巢。”'),
    ],
    onFinishEffects: [openScene('scene_znq38_03', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_03: {
    id: 'scene_znq38_03',
    title: '第三幕 · 雷火惊天',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('话音未落，一声地动山摇的惊天巨响陡然自外墓门炸开！整座活死人墓剧烈摇晃，穹顶碎石簌簌坠落，一股刺鼻灼热的紫黑毒烟顺着石廊疯狂倒灌而入！'),
      S('NPC-0114', '（脸色骤变，翻身跃下寒玉床）“不好！是西夏一品堂的‘九幽雷火毒弹’！外门守卫恐怕已遭毒手！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_04', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_04: {
    id: 'scene_znq38_04',
    title: '第四幕 · 毒火焚廊',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      N('你与林朝瑶、冷清秋急掠至前厅，只见外墓门已被连环雷火炸得崩塌半边，烈焰挟带剧毒青烟滚滚涌入，数十名身着防火毒袍的西夏死士正疯狂向墓内投掷火雷！'),
      S(SPEAKER_POISON_COMMANDER, '（在浓烟之外狞声狂笑）“哈哈哈哈！段延庆败走前留下的死令——得不到《玉女心经》，便一把九幽雷火把这活死人墓烧成死人坑！前山牛鼻子早已和你们断桥绝交，今日叫你们孤立无援、死无葬身之地！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_05', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_05: {
    id: 'scene_znq38_05',
    title: '第五幕 · 孤绝无援',
    subtitle: '活死人墓前厅',
    mandatory: true,
    beats: [
      N('前山重阳古观早已封涧，纵然雷火震天，山前依旧死寂无声，没有任何援兵赶至。活死人墓此刻真正陷入了孤立无援的死局！'),
      P('（双目赤红，剑光如雪劈散三颗迎面飞来的毒雷）“师父！清秋！退回冰魄石室，我来断后！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_06', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_06: {
    id: 'scene_znq38_06',
    title: '第六幕 · 雷火袭墓',
    subtitle: '活死人墓 · 毒焰漫廊',
    illustrationUrl: '/assets/quests/zn_q38_thunder_ambush.jpg',
    illustrationCaption: '活死人墓前厅 · 西夏一品堂死士引爆九幽雷火剧毒，紫黑毒焰吞噬青石甬道',
    mandatory: true,
    beats: [
      N('毒烟遇火愈烈，眨眼间便封死了前厅退路！连天罗地网厅的石梁也发出不堪重负的断裂脆响！'),
    ],
    onFinishEffects: [openScene('scene_znq38_07', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_07: {
    id: 'scene_znq38_07',
    title: '第七幕 · 师尊挡毒',
    subtitle: '活死人墓前厅',
    mandatory: true,
    beats: [
      N('便在你转身护持冷清秋的刹那，一颗淬满西夏碧磷毒针的暗雷悄无声息地从烟雾深处疾射你背心！'),
      S('NPC-0114', '（毫不犹豫地飞身扑至你身后，双袖鼓荡寒气硬生生将暗雷震偏，却终究被漫天碧磷毒火沾染肩臂，闷哼一声踉跄倒退）“小心——！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_08', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_08: {
    id: 'scene_znq38_08',
    title: '第八幕 · 碧磷入腑',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      P('（失声大骇，一把扶住林朝瑶）“师父！您中了碧磷剧毒！”'),
      S('NPC-0114', '（唇角已泛起骇人青紫，却强提一口寒玉真气压住毒势，厉声喝道）“莫管我！快退回冰魄石室，落断龙石阻住毒火，否则整个古墓都要化成焦土！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_09', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_09: {
    id: 'scene_znq38_09',
    title: '第九幕 · 死守石室',
    subtitle: '活死人墓石廊',
    mandatory: true,
    beats: [
      N('冷清秋强忍吸入毒烟的剧烈咳嗽，与你一左一右护着重伤的林朝瑶杀回昆仑寒玉床冰魄石室。'),
    ],
    onFinishEffects: [openScene('scene_znq38_10', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_10: {
    id: 'scene_znq38_10',
    title: '第十幕 · 绝境抉择',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('毒火已烧至冰魄石室外廊，石室门上的千斤断龙石绞盘就在眼前！'),
    ],
    choices: [
      {
        id: 'znq38_accept',
        label: '死守冰魄石室，面对断龙石绝响与生死离别',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q38_QUEST_ID, stepId: 'dragon_stone_fall' },
          setStep(ZHONGNAN_Q38_QUEST_ID, 'dragon_stone_fall'),
          toast('已开启终局《断龙绝响 · 黯然孤鸿》！毒火逼近，速回冰魄石室应对绝境！', 'warn', '断龙绝响'),
        ],
      },
    ],
  },

  scene_znq38_11: {
    id: 'scene_znq38_11',
    title: '第十一幕 · 断龙绞盘',
    subtitle: '活死人墓 · 昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('毒烟滚滚涌入石室，冷清秋脸色越来越白，她体内本就为了掩护你们而强行吸纳了大半火毒，此刻经脉已如烈火焚烧！'),
      S('NPC-0114', '（以玉指连点数处大穴封住毒脉，眼中满是悲凉与决绝）“这九幽碧磷毒乃西域奇毒，寻常丹药无解。唯有两个生路——”'),
    ],
    onFinishEffects: [openScene('scene_znq38_12', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_12: {
    id: 'scene_znq38_12',
    title: '第十二幕 · 断龙轰鸣',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '“其一，必须立刻斩断绞盘落下千斤断龙石，隔绝外廊雷火毒烟！”'),
      N('话音未落，林朝瑶屈指一弹，一道凛冽剑气精准斩断石门之上的精钢绞索！“轰隆隆——”一声震彻终南地脉的沉闷巨响，重达万斤的玄铁断龙石轰然砸落，将漫天毒焰与死士死死封死在外！'),
    ],
    onFinishEffects: [openScene('scene_znq38_13', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_13: {
    id: 'scene_znq38_13',
    title: '第十三幕 · 断龙绝响',
    subtitle: '活死人墓 · 千斤巨石封门',
    illustrationUrl: '/assets/quests/zn_q38_dragon_stone.jpg',
    illustrationCaption: '活死人墓石门 · 万斤断龙石轰然坠地，隔绝漫天九幽毒焰，震彻终南幽谷',
    mandatory: true,
    beats: [
      N('断龙石落，烟尘漫天。石室之内暂时隔绝了追兵，却也彻底断绝了正门出路，唯剩寒玉床底那条通往银练飞瀑暗潭的水下秘道。'),
    ],
    onFinishEffects: [openScene('scene_znq38_14', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_14: {
    id: 'scene_znq38_14',
    title: '第十四幕 · 寒玉冰棺',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0173', '（骤然吐出一口黑血，身形摇摇欲坠，却仍强撑着露出一丝惨淡而温柔的微笑）“师父……{gender:少侠|女侠}……火毒已经攻心了。若不以寒玉石棺自我冰封、断绝生机流转，清秋撑不过今夜……”'),
      P('（心如刀绞，紧紧握住冷清秋冰凉颤抖的双手）“清秋！不要！我这就带你出山找天下名医！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_15', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_15: {
    id: 'scene_znq38_15',
    title: '第十五幕 · 冰封之约',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0173', '（轻轻摇了摇头，抬手抚过你的眉眼，眼中泪光莹莹）“{ifFlag:zn_mu_heart==qingqiu|傻瓜……寒玉石棺不是死路，而是锁住我最后一线生机的唯一办法。你一定要好好活下去，等来日寻得天山雪莲与解毒奇方，再来亲手推开这口石棺……叫醒我，好不好？|寒玉石棺能锁住我最后一线生机，并非死别。你一定要替我守好活死人墓，等来日寻得解毒奇方，再来推开石棺唤醒清秋。}”'),
      N('说罢，冷清秋决然挣脱你的手，纵身掠入寒玉床侧那口终年冒着森白寒气的玄冰石棺！寒霜瞬间凝结，将她白衣胜雪、眉目如画的容颜定格在晶莹冰晶之中……'),
    ],
    onFinishEffects: [openScene('scene_znq38_16', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_16: {
    id: 'scene_znq38_16',
    title: '第十六幕 · 远引昆仑',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（强压下翻涌的剧毒，神色凄怆而刚毅）“我也须立刻经后山密道远赴昆仑绝顶冰泉闭关逼毒，三五年内恐难再回终南。更何况，一品堂死士正在外谷搜山，唯有我引走大部耳目，你才能保全古墓薪火！”'),
      P('（跪倒在冰棺与林朝瑶之间，拳头紧握得指节发白、鲜血淋漓）“师父！清秋！为何……为何最后只剩我一个人？！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_17', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_17: {
    id: 'scene_znq38_17',
    title: '第十七幕 · 幽谷托孤',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      S('NPC-0114', '（将一枚冰冷的活死人墓掌门寒玉印塞入你掌心，声音颤抖却无比坚定）“活下去！从水下暗渠出去，杀光银练飞瀑的西夏畜生！从此以后，你便是活死人墓的新主——守住清秋，守住古墓，等我回来！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_18', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_18: {
    id: 'scene_znq38_18',
    title: '第十八幕 · 生离死别',
    subtitle: '昆仑寒玉床冰魄石室',
    mandatory: true,
    beats: [
      N('林朝瑶深深看了寒玉石棺与你最后一眼，决然转身踏入后壁密道，石壁轰然闭合。诺大的冰魄石室内，瞬间只剩下你一人，以及石棺中沉睡不醒的白衣倩影。'),
    ],
    onFinishEffects: [openScene('scene_znq38_19', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_19: {
    id: 'scene_znq38_19',
    title: '第十九幕 · 冰棺永夜',
    subtitle: '冰魄石室 · 寒玉冰封',
    illustrationUrl: '/assets/quests/zn_q38_ice_coffin.jpg',
    illustrationCaption: '昆仑寒玉石室 · 冷清秋冰封玄冰石棺沉眠待醒，林朝瑶负伤远引，独留孤影守墓',
    mandatory: true,
    beats: [
      N('你手掌贴在刺骨冰冷的寒玉石棺上，一滴滚烫的泪水滑落冰面，瞬间冻作晶莹冰珠。片刻之后，你缓缓起身，掀开寒玉床底暗渠石板，纵身潜入刺骨冰水之中！'),
    ],
    onFinishEffects: [openScene('scene_znq38_20', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_20: {
    id: 'scene_znq38_20',
    title: '第二十幕 · 破潭而出',
    subtitle: '终南后山暗渠',
    mandatory: true,
    beats: [
      N('冰冷刺骨的地下暗河裹挟着你冲出绝壁水帘，直抵浓烟漫天的银练飞瀑！'),
    ],
    choices: [
      {
        id: 'znq38_go_falls',
        label: '冲出暗渠赶赴【银练飞瀑清泉石茗案】，手刃一品堂毒火死士！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q38_QUEST_ID, 'anran_falls_epiphany'),
          toast('请前往【银练飞瀑清泉石茗案（zn_st_falls）】迎击追兵，于至悲中悟通神掌！', 'warn', '黯然销魂'),
        ],
      },
    ],
  },

  scene_znq38_21: {
    id: 'scene_znq38_21',
    title: '第二十一幕 · 血雨飞瀑',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你破水跃上银练飞瀑青石，浑身湿透，白衣染血。漫天秋雨打在脸上，分不清是雨水还是泪水。'),
      S(SPEAKER_POISON_COMMANDER, '（率数十名一品堂死士围堵在飞瀑三面，举刀狂笑）“居然还有一只漏网之鱼从水底钻出来了！听说断龙石已经落下，林朝瑶和冷清秋都完蛋了吧？正好，今日送你下去陪她们！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_22', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_22: {
    id: 'scene_znq38_22',
    title: '第二十二幕 · 肝肠寸断',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('望着满山焚毁的古藤、昔日与冷清秋抚琴品茗的碎裂石案，想到断龙石后永夜沉眠的寒玉石棺与生死未卜的恩师，一股前所未有的悲恸与苍凉轰然冲破你的胸臆！'),
      N('此时此刻，你竟忘了手中长剑，忘了重阳与玉女的一切精妙招式，只觉天地苍茫、万念俱灰，唯有一腔无处安放的离愁别恨在奇经八脉间疯狂激荡！'),
    ],
    onFinishEffects: [openScene('scene_znq38_23', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_23: {
    id: 'scene_znq38_23',
    title: '第二十三幕 · 悲吟别赋',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P('（缓缓丢弃手中长剑，任由秋雨浇透青丝，仰天发出一声凄厉苍凉的长啸，吟诵南朝江淹《别赋》之绝唱）“黯然销魂者，唯别而已矣！况秦吴兮绝国，复燕宋兮千里……”'),
      N('你每吟一句，周身真气便违背世间一切武学常理般逆乱奔涌——非刚非柔、非阴非阳，却带着一股令山川草木同悲、令天地鬼神色变的无上掌意！'),
    ],
    onFinishEffects: [openScene('scene_znq38_24', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_24: {
    id: 'scene_znq38_24',
    title: '第二十四幕 · 黯然悲歌',
    subtitle: '银练飞瀑 · 吟《别赋》悟掌',
    illustrationUrl: '/assets/quests/zn_q38_biefu_grief.jpg',
    illustrationCaption: '银练飞瀑雨夜 · 弃剑仰天长吟江淹《别赋》，至悲至痛间周身掌气令飞瀑倒流',
    mandatory: true,
    beats: [
      N('“心惊肉跳”、“杞人忧天”、“无中生有”、“拖泥带水”、“徘徊空谷”、“力不从心”、“行尸走肉”、“魂不守舍”、“倒行逆施”、“废寝忘食”、“孤形只影”、“饮恨吞声”、“六神不安”、“穷途末路”、“面无人色”、“想入非非”、“呆若木鸡”……'),
      N('一十七式惊世骇俗的天阶掌法，竟在这一瞬间自你血泪交迸的肺腑之中自然破茧而出——【黯然销魂掌】！'),
    ],
    onFinishEffects: [teachArtNow('MA-020'), openScene('scene_znq38_25', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_25: {
    id: 'scene_znq38_25',
    title: '第二十五幕 · 掌破毒火',
    subtitle: '银练飞瀑 · 决战毒火都统',
    mandatory: true,
    beats: [
      S(SPEAKER_POISON_COMMANDER, '（感受到那股令飞瀑水势都为之一滞的恐怖掌意，笑声戛然而止，骇然大喝）“装神弄鬼！给我放毒火，杀了{gender:他|她}！”'),
      P('（双眸空寂而深邃，缓缓抬起右掌）“今日，便以尔等血肉，祭我活死人墓断龙之恨！”'),
    ],
    choices: [
      {
        id: 'znq38_fight_commander',
        label: '以初悟之天阶《黯然销魂掌》，血战【一品堂毒火都统 · 赫连焚天】！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q38_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonCommanderBoss() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '血海深仇就在眼前，此战唯以死相拼！',
            introText: '银练飞瀑暴雨之中，你以至悲至痛悟出的天阶《黯然销魂掌》迎战一品堂毒火都统！',
            onWin: [openScene('scene_znq38_26', ZHONGNAN_Q38_QUEST_ID)],
            onLose: [
              toast('毒火攻势猛烈，你强提一口黯然真气稳住心神，再起神掌破敌！', 'warn', '血战受挫'),
            ],
            onDraw: [
              toast('掌风与毒火激荡不休，赫连焚天已被掌意震慑心魄，速再进击！', 'warn', '死斗胶着'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq38_26: {
    id: 'scene_znq38_26',
    title: '第二十六幕 · 倒行逆施',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('激战之中，你的掌法全无章法可循——时而头下脚上“倒行逆施”，时而垂头丧气“行尸走肉”，却每一掌皆蕴含足以开山裂石的无匹内劲！'),
      S(SPEAKER_POISON_COMMANDER, '（连挡七掌，双臂竟被震得骨折变形，惊恐万状地尖叫）“疯了！这到底是什么魔功？！为什么根本看不出招式来路？！”'),
    ],
    onFinishEffects: [openScene('scene_znq38_27', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_27: {
    id: 'scene_znq38_27',
    title: '第二十七幕 · 黯然一击',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你最后使出一式“黯然销魂”，右掌看似轻飘飘无力地向前一推，却引动漫天暴雨与飞瀑水汽轰然倒卷！'),
      N('“轰——！”一声惊天动地的掌雷炸响，银练飞瀑旁的十丈青石崖壁竟被掌风余波硬生生震塌半角！赫连焚天连惨叫都未及发出，便被掌劲震碎心脉、仰天栽倒，余下数十名一品堂死士无不骇破胆魄，四散奔逃却尽数被飞石与掌风震毙于山涧！'),
    ],
    onFinishEffects: [openScene('scene_znq38_28', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_28: {
    id: 'scene_znq38_28',
    title: '第二十八幕 · 毒火尽灭',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('漫山毒焰在倾盆秋雨与翻涌潭水的冲刷下渐渐熄灭，只余焦黑的断木与满地西夏死士遗骸。'),
    ],
    onFinishEffects: [openScene('scene_znq38_29', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_29: {
    id: 'scene_znq38_29',
    title: '第二十九幕 · 孤鸿遗恨',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('强敌尽灭，大仇得报，可四周却安静得令人窒息。你独自立于碎石与暴雨之中，掌心那枚冰冷的活死人墓掌门寒玉印已被鲜血染红。'),
    ],
    onFinishEffects: [openScene('scene_znq38_30', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_30: {
    id: 'scene_znq38_30',
    title: '第三十幕 · 掌崩飞瀑',
    subtitle: '银练飞瀑 · 黯然销魂掌威',
    illustrationUrl: '/assets/quests/zn_q38_anran_palm.jpg',
    illustrationCaption: '银练飞瀑 · 天阶《黯然销魂掌》一掌崩崖震退暴雨，一品堂毒火死士尽数伏诛',
    mandatory: true,
    beats: [
      N('数名幸存逃出外谷的活死人墓弟子闻讯赶回，见飞瀑崖壁掌印深达数尺、敌酋伏尸满地，纷纷含泪跪倒在你脚下。'),
    ],
    onFinishEffects: [openScene('scene_znq38_31', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_31: {
    id: 'scene_znq38_31',
    title: '第三十一幕 · 孤影承宗',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('你深吸一口冰冷雨气，将无尽悲痛深深压入心底，转身面向残存的古墓门人——幽谷未亡，故人未死，你必须撑起这座孤寂的活死人墓！'),
    ],
    choices: [
      {
        id: 'znq38_go_ascend',
        label: '执掌寒玉掌门印，登位【活死人墓幽谷尊主】',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q38_QUEST_ID, 'tomb_master_ascend'),
          toast('一品堂余孽已尽灭！请于【银练飞瀑清泉石茗案】登位活死人墓幽谷尊主！', 'success', '黯然孤鸿'),
        ],
      },
    ],
  },

  scene_znq38_32: {
    id: 'scene_znq38_32',
    title: '第三十二幕 · 重筑幽谷',
    subtitle: '终南后山寒玉涧 · 银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      N('秋雨终歇，冬雪又至。你以掌门寒玉印号令幸存的古墓门人清理断壁、重布玉蜂暗哨，并以暗渠秘道重新连通了断龙石后的冰魄石室。'),
    ],
    onFinishEffects: [openScene('scene_znq38_33', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_33: {
    id: 'scene_znq38_33',
    title: '第三十三幕 · 孤鸿名震',
    subtitle: '终南后山幽谷',
    mandatory: true,
    beats: [
      N('那一夜一掌震塌飞瀑崖壁、全歼西夏一品堂毒火死士的传奇很快震动整个天下武林。江湖中人皆知，终南后山出了一位深居简出、掌法鬼神莫测的“黯然孤鸿”——活死人墓新任幽谷尊主！'),
    ],
    onFinishEffects: [openScene('scene_znq38_34', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_34: {
    id: 'scene_znq38_34',
    title: '第三十四幕 · 静候春归',
    subtitle: '银练飞瀑清泉石茗案',
    mandatory: true,
    beats: [
      P('（遥望昆仑雪山方向，又轻抚怀中冰冷的玉玦，低声自语）“师父，清秋……无论三年、五年还是十年，我都会守在终南幽谷，寻遍天下奇药。总有一日，我会亲手推开寒玉石棺，迎你们归来。”'),
    ],
    onFinishEffects: [openScene('scene_znq38_35', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_35: {
    id: 'scene_znq38_35',
    title: '第三十五幕 · 幽谷尊主',
    subtitle: '终南后山 · 黯然孤鸿终局',
    illustrationUrl: '/assets/quests/zn_q38_tomb_master.jpg',
    illustrationCaption: '终南银练飞瀑 · 黯然孤鸿白衣临渊而立，天阶黯然销魂掌威慑江湖，独守幽谷待故人归',
    mandatory: true,
    beats: [
      N('断龙石犹在，孤鸿影未寒。一代传奇幽谷尊主，就此屹立于终南绝壁之上！'),
    ],
    onFinishEffects: [openScene('scene_znq38_36', ZHONGNAN_Q38_QUEST_ID)],
  },

  scene_znq38_36: {
    id: 'scene_znq38_36',
    title: '第三十六幕 · 孤鸿归位',
    subtitle: '银练飞瀑清泉石茗案 · 终局结案',
    mandatory: true,
    beats: [
      N('【终南终局 · 黯然孤鸿】已然铸成！你于至悲至痛中悟出天阶无上神掌【黯然销魂掌】，全歼一品堂毒火死士，正式登临终南隐宗五阶【活死人墓幽谷尊主】尊位！'),
    ],
    choices: [
      {
        id: 'znq38_complete',
        label: '执掌寒玉印与【黯然销魂掌】，登位【活死人墓幽谷尊主】（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-11', rank: 5, promoteOnly: true },
          { type: 'teachMartialArt', artId: 'MA-020', level: 1 },
          { type: 'giveCombatExp', amount: 2000, reason: '于断龙绝境中悟通天阶黯然销魂掌并全歼一品堂毒火死士，登位幽谷尊主' },
          { type: 'modifyRenown', delta: 340, reason: '一掌崩崖震灭一品堂毒火精锐，黯然孤鸿之名威震天下武林' },
          { type: 'modifyChivalry', delta: 100, reason: '孤身护持活死人墓遗脉，情深义重誓守故人' },
          { type: 'modifySkill', key: '诗词', delta: 2 },
          { type: 'modifySkill', key: '琴', delta: 1 },
          { type: 'setFlag', flag: 'zn_ending', value: 'anran' },
          { type: 'completeQuest', questId: ZHONGNAN_Q38_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《断龙绝响 · 黯然孤鸿》！晋升终南隐宗五阶【活死人墓幽谷尊主】，领悟天阶神掌【黯然销魂掌】！',
            'success',
            '黯然孤鸿',
          ),
        ],
      },
    ],
  },
}
