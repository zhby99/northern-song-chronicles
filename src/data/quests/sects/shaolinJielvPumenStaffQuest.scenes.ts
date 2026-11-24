import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q13_QUEST_ID } from './shaolinJielvPumenStaffQuest'

const SPEAKER_HUILAI: StorySpeakerSpec = {
  kind: 'custom',
  name: '慧癞',
  title: '破戒叛僧 · 昔日少林杂役',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_RUZHOU_ABBOT: StorySpeakerSpec = {
  kind: 'custom',
  name: '慧明老住持',
  title: '汝州下院古庙住持',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_OLD_FATHER: StorySpeakerSpec = {
  kind: 'custom',
  name: '李老丈',
  title: '汝州苦主 · 慧癞俗家老父',
  factionName: '汝州百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildHuiLaiBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ13_HUILAI',
    name: '慧癞',
    title: '破戒叛僧 · 铁杖狂僧',
    realm: '二流下品',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '破戒叛僧',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“少林清规只管得着咱们下院苦命人！你今日不查青红皂白就敢拿我，先吃我这口浑铁禅杖！”',
    stats: { hp: 1120, mp: 760, agi: 42, res: 28 },
    talents: { bone: 70, comprehension: 52, charm: 34 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-153', move2: 'MA-143' },
    learnedArts: [
      { artId: 'MA-159', level: 5 },
      { artId: 'MA-153', level: 5 },
      { artId: 'MA-143', level: 5 },
    ],
  })
}

function buildHuiLaiShakenBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ13_HUILAI_SHAKEN',
    name: '慧癞',
    title: '破戒叛僧 · 心虚气短',
    realm: '二流下品',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '破戒叛僧',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“闭嘴！闭嘴！铁证又如何——横竖今日难逃戒律，老子拼死也要杀出山门！”',
    stats: { hp: 960, mp: 680, agi: 38, res: 24 },
    talents: { bone: 70, comprehension: 52, charm: 34 },
    equippedArts: { neigong: 'MA-159', move1: 'MA-153', move2: 'MA-143' },
    learnedArts: [
      { artId: 'MA-159', level: 4 },
      { artId: 'MA-153', level: 5 },
      { artId: 'MA-143', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq13_01: {
    id: 'scene_slq13_01',
    title: '第一幕 · 钟鼓执杖',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}清秋，嵩山松风裹着凛冽寒意掠过钟鼓禅院。晨钟余韵未绝，演武坪青石上早已整整齐齐列着两排戒律院铁杖，寒光映着初升曦色。'),
      N('戒律院主「一拍神僧」玄寂负手立于石阶之上，身旁站着眉目低垂、手捻紫檀念珠的知客禅师玄净。见你披着新颁的戒律院褐色僧袍步入坪中，玄寂微微颔首。'),
      S('NPC-0134', '（目光如电，声若洪钟）“阿弥陀佛。你既已剃度受戒、归入我戒律药王一脉，便当知晓少林三堂之中，罗汉堂主护寺杀伐，达摩院主参禅悟道，唯独戒律院——手执铁杖，专司纠察清规、断狱明冤！”'),
      S('NPC-0193', '（在旁微微合十，笑意淡薄）“玄寂师兄厚爱这位师侄，初入内门便欲亲授《普门杖法》。只是戒律院素来铁面无私，往后执杖办事，可莫要妇人之仁、落了外人话柄才好。”'),
      S('NPC-0134', '（不置可否，凝望于你）“执戒者若心软，则千年祖庭必生蛀虫；若只知酷刑苛罚、不察真情，则失了佛门本怀。领杖之前，你且说说自己欲守何等戒律之道？”'),
    ],
    choices: [
      {
        id: 'slq13_oath_mercy',
        label: '【明察秋毫】“先辨真伪曲直，再施戒杖法度，绝不枉纵一人！”',
        subLabel: '立志以查证与慈悲兼顾之道执掌戒律杖',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q13_QUEST_ID, stepId: 'pumen_staff_drill' },
          setStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
          toast('已开启《钟鼓执杖 · 清规如铁》！随玄寂长老演练《普门杖法》。', 'talk', '清规如铁'),
          openScene('scene_slq13_02', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'slq13_oath_strict',
        label: '【清规如铁】“佛门法度不容姑息，弟子愿以铁面禅杖清肃门风！”',
        subLabel: '立志以雷霆清规震慑宵小、守护千年祖庭',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q13_QUEST_ID, stepId: 'pumen_staff_drill' },
          setStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
          toast('已开启《钟鼓执杖 · 清规如铁》！随玄寂长老演练《普门杖法》。', 'talk', '清规如铁'),
          openScene('scene_slq13_02', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_02: {
    id: 'scene_slq13_02',
    title: '第二幕 · 普门杖意与汝州急报',
    subtitle: '钟鼓禅院 · 演武坪演法',
    illustrationUrl: '/assets/quests/sl_13_pumen_staff.jpg',
    illustrationCaption: '钟鼓执杖 · 玄寂长老亲演《普门杖法》，杖影如莲，刚柔并济',
    mandatory: true,
    beats: [
      N('玄寂抄起六尺乌木禅杖，步踏莲花，三十六路《普门杖法》一气呵成——忽如金刚怒目雷霆劈落，忽如观音垂柳圆转卸力！演武坪上枯叶卷作莲台之形，竟无一片被劲风震碎！'),
      S('NPC-0134', '（收杖传诀，声震钟楼）“普门杖法讲究『破邪不伤正，制敌不绝生』，横扫可退群魔，点穴可锁筋脉。你且依口诀反复拆招，将这门戒律院镇院执杖绝艺融会于心！”'),
      N('你演练至日影西斜、刚将起手锁腕诸式谙熟于胸，知客沙弥忽捧着一封加盖汝州朱印的急报疾步奔来！玄净拆阅后冷笑递与玄寂：“昔日派往汝州南郊下院古庙烧火的杂役僧【慧癞】，破戒伤人、闹翻下院，竟还当众反咬老住持克扣斋粮、挑拨乡民围堵庙门！不如立刻废功枷锁押回！”'),
      S('NPC-0134', '（眉头紧锁，自袖中取出一面镌刻「戒律执杖」的紫铜令牌交入你手）“汝州下院乃我少林百年香火所系，最忌风评蒙尘！你携令牌星夜驰赴汝州古庙，切记莫偏听一面之词——是住持失德还是叛僧造谣，务必查明实情再定裁断！”'),
    ],
    choices: [
      {
        id: 'slq13_depart_investigate',
        label: '领紫铜令牌与《普门杖法》，星夜驰赴汝州下院古庙查账质证！',
        subLabel: '习得《普门杖法》，即刻奔赴汝州南郊古庙现场查案',
        tone: 'jade',
        effects: [
          teachArtNow('MA-117'),
          setStep(SHAOLIN_Q13_QUEST_ID, 'ruzhou_temple_verdict'),
          toast('已习得《普门杖法》并领紫铜令牌！星夜驰赴汝州下院古庙查明实情！', 'success', '普门杖法'),
          openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'slq13_depart_swift',
        label: '执禅杖佩令牌疾驰汝州，先镇下院乱局再清是非！',
        subLabel: '习得《普门杖法》，即刻奔赴汝州南郊古庙缉拿叛僧',
        tone: 'gold',
        effects: [
          teachArtNow('MA-117'),
          setStep(SHAOLIN_Q13_QUEST_ID, 'ruzhou_temple_verdict'),
          toast('已习得《普门杖法》并领紫铜令牌！疾赴汝州下院古庙镇局拿人！', 'success', '普门杖法'),
          openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_03: {
    id: 'scene_slq13_03',
    title: '第三幕 · 古庙群疑 · 现场查案',
    subtitle: '汝州南郊 · 少林下院古庙（战前搜证）',
    illustrationUrl: '/assets/quests/sl_13_ruzhou_temple.jpg',
    illustrationCaption: '荒庙夜雨 · 破戒叛僧慧癞横杖守于残烛之前，身畔孤老泣血、乡民聚议',
    mandatory: true,
    beats: [
      N('细雨如丝，暮色沉沉。你疾行数十里赶至汝州南郊下院古庙，但见残破院门外已围了二三十名举着火把的乡民香客，议论声嘈杂难平；神龛角落的稻草堆旁，还蜷缩着一名腿脚肿伤、暗自抹泪的白发庄稼老汉。'),
      N('庙堂青砖正中，粗犷破戒僧【慧癞】横提一根沾染血渍的浑铁禅杖，指着被推搡在供桌旁的白眉老住持破口大骂；见你亮出少林戒律紫铜令牌，他非但不惧，反倒扯开破喉向围观乡民高喊起来！'),
      S(SPEAKER_HUILAI, '“乡亲们快看啊！少林本山派戒律僧来杀人灭口啦！老住持克扣施粥斋粮、私卖香火，我不过看不过眼替穷人说了句公道话、护着断腿老爹讨碗薄粥，他们就要拿戒律杖打死我！”'),
      S(SPEAKER_RUZHOU_ABBOT, '（气得浑身发颤，连连合十）“阿弥陀佛，一派胡言！老衲执掌下院三十载，米仓出纳笔笔清白！分明是他数月来私偷香火银去集镇赌钱吃酒，被察觉后竟打伤巡街弓手与知客沙弥，如今还敢血口喷人！”'),
      N('围观乡民将信将疑，有人已攥紧木棒高声叫嚷「先别动武，把话说清楚」！你在动手拿人之前，目光迅速扫过敞开的米仓账桌、窃窃私语的香客人群与横杖狞笑的慧癞——'),
    ],
    choices: [
      {
        id: 'slq13_check_arithmetic',
        label: '【算术查账验米仓】当众封验米仓斗斛与香火出纳簿，以铁账拆穿真伪！',
        subLabel: '检定：算术 ≥ 35 · 核清米仓出纳揭穿私吞铁证，令慧癞心虚气短',
        tone: 'jade',
        condition: { type: 'skillAtLeast', key: '算术', min: 35 },
        effects: [
          { type: 'setFlag', flag: 'sl_q13_evidence_found', value: true },
          openScene('scene_slq13_04_audit', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'slq13_check_debate',
        label: '【辩才当堂质询证人】稳住围观香客，连环追问蜡烛铺伙计与邻里证词！',
        subLabel: '检定：辩才 ≥ 40 · 稳住舆论问出慧癞暗藏酒肉铁证，瓦解其气焰',
        tone: 'gold',
        condition: { type: 'skillAtLeast', key: '辩才', min: 40 },
        effects: [
          { type: 'setFlag', flag: 'sl_q13_evidence_found', value: true },
          openScene('scene_slq13_04_debate', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'slq13_direct_arrest',
        label: '【执杖立威径直拿人】休要妖言惑众！亮戒律铁杖当场拿人归案！',
        subLabel: '无门槛正攻 · 不费口舌直撼全盛慧癞（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q13_evidence_found', value: false },
          openScene('scene_slq13_05_force', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_04_audit: {
    id: 'scene_slq13_04_audit',
    title: '第四幕 · 验仓拆伪',
    subtitle: '汝州下院古庙（算术搜证 · 实战）',
    mandatory: true,
    beats: [
      N('你沉步请出两名识字的乡老作见证，当众打开下院米仓与香火出纳簿，执算盘噼啪拨珠，不过一盏茶工夫便将近半年收支斗斛核得丝毫不差！'),
      P('（举起三张字迹拙劣的假采买单据，声如金石）“诸位乡亲请看！米仓实存糙米三十四石八斗，与施粥账目分毫不差，老住持何曾克扣过半升？反倒是这三张支取『修葺瓦片』的凭条，押印俱是柴房杂役私章，共挪走香火银四十两——恰与集镇宝丰赌坊昨夜追债单上的数目一文不差！”'),
      N('满院乡民顿时哗然，方才替慧癞抱不平的汉子羞怒交加，齐声痛骂其欺世盗名！慧癞额头冷汗涔涔而下，眼神骤然慌乱，眼见众怒难犯，竟咬牙猛抄浑铁禅杖朝你当头砸来！'),
      S(SPEAKER_HUILAI, '“住口！你们少林个个都是好算盘！今日既已被你拆穿，老子便拼个鱼死网破，接杖吧！”'),
    ],
    choices: [
      {
        id: 'slq13_fight_audit',
        label: '乘慧癞心虚气乱，以《普门杖法》生擒叛僧！（二流下品 · 实战）',
        subLabel: '慧癞伪装已破、气势大挫，正是制伏良机',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiLaiShakenBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '慧癞此刻狗急跳墙，若放其脱身必伤及庙中老幼与乡民！',
            introText: '【汝州下院古庙】铁账拆穿假面！以《普门杖法》迎战心虚气短的破戒叛僧【慧癞】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq13_06', SHAOLIN_Q13_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('慧癞困兽犹斗杖势凌厉，暂退石柱后调匀内息再入古庙擒敌！', 'warn', '古庙查案'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq13_04_debate: {
    id: 'scene_slq13_04_debate',
    title: '第四幕 · 质证破谎',
    subtitle: '汝州下院古庙（辩才质询 · 实战）',
    mandatory: true,
    beats: [
      N('你收杖垂目，声音清朗从容地安抚住躁动香客，旋即话锋一转，当堂请出庙外香烛铺小伙计与住在后墙根下的陈大娘对质。'),
      P('（步步紧逼，字字诛心）“慧癞，你说老住持克扣斋粮、逼得你连老父薄粥都讨不到——可陈大娘三日前亲见你半夜翻过柴房矮墙，怀里揣着两坛竹叶青与油纸包着的半扇酱狗肉；香烛铺伙计更记得你拿庙里铜烛台去典当还赌债！你若真为老父讨公道，何必半夜偷啃狗肉、独醉柴房？”'),
      N('人群里顿时炸开锅，陈大娘连声作证「柴房草垛底下此刻还埋着空酒坛呢」！乡民顺势扒开草垛，果然滚出三只沾满油污的酒壶与骨头！慧癞面皮涨作猪肝色，气势顿泄，羞愤之下暴吼着舞起铁杖猛扑而来！'),
      S(SPEAKER_HUILAI, '“够了！少拿那一套大道理压我！要拿我归山，先过我这口浑铁禅杖！”'),
    ],
    choices: [
      {
        id: 'slq13_fight_debate',
        label: '乘慧癞谎言败露心神大乱，施展《普门杖法》生擒之！（二流下品 · 实战）',
        subLabel: '乡民证词铁证如山，慧癞气焰大挫',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiLaiShakenBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '慧癞已彻底恼羞成怒，若放其冲出院门必伤及无辜乡民！',
            introText: '【汝州下院古庙】众证剥皮破谎！以《普门杖法》生擒心虚气短的【慧癞】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq13_06', SHAOLIN_Q13_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('慧癞拼命反扑杖风沉猛，暂借廊柱喘息调匀内息后再战！', 'warn', '古庙查案'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq13_05_force: {
    id: 'scene_slq13_05_force',
    title: '第四幕 · 执杖拿人',
    subtitle: '汝州下院古庙（强硬执法 · 实战）',
    mandatory: true,
    beats: [
      P('（冷喝一声，戒律铁杖重重顿落青石，震得院中尘灰四起）“佛门清规自有公断，岂容破戒叛僧在此煽动乡邻、颠倒黑白！慧癞，立刻弃杖受缚，否则休怪贫僧杖下无情！”'),
      N('围观乡民被你凌厉威势逼退数步，却仍有不少人交头接耳、露出疑惧之色。慧癞见你未查账证便欲动武，眼中反倒燃起狂悍凶光，借势大喝一声煽动人心，双臂青筋暴起，浑铁禅杖带着十二分亡命刚劲呼啸横扫而来！'),
      S(SPEAKER_HUILAI, '“乡亲们瞧见了么！少林戒律院仗势压人、连账都不敢查！好，小和尚，老子今夜便叫你尝尝少林杂役打熬十年的铁杖分量！”'),
    ],
    choices: [
      {
        id: 'slq13_fight_force',
        label: '稳住下盘，以《普门杖法》硬撼全盛叛僧【慧癞】！（二流下品 · 实战）',
        subLabel: '以雷霆铁杖强行制伏狂怒中的慧癞（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiLaiBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '慧癞此刻悍勇暴怒，此时退让不仅失却戒律威严，更会酿成流血大祸！',
            introText: '【汝州下院古庙】执杖立威！以《普门杖法》硬撼全盛破戒叛僧【慧癞】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              openScene('scene_slq13_06', SHAOLIN_Q13_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('慧癞全盛杖势疯狂，暂且抽身退避调息，整理好状态再入古庙擒敌！', 'warn', '古庙查案'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq13_06: {
    id: 'scene_slq13_06',
    title: '第五幕 · 杖下生擒与孤老泣血',
    subtitle: '汝州下院古庙 · 终审抉择',
    mandatory: true,
    beats: [
      N('数十合激战，庙内灯影摇曳！你牢记玄寂「破邪不伤正」心诀，先以一招「莲步拨云」挑偏铁杖沉猛锋芒，顺势旋杖一扣，杖尾精准点中慧癞右肘曲池穴！“哐当”一声，浑铁禅杖坠地，慧癞半身酸麻，轰然单膝跪倒残烛之前。'),
      S(SPEAKER_OLD_FATHER, '（挣扎着爬出草堆，泪流满面地抱住你僧袍下摆连连叩首）“大师饶命啊！我儿盗银赌酒罪该万死，可他从前并非恶人……半年前我那年方十六的闺女遭地痞恶吏逼死投井，我去告状又被打断右腿，我儿是悲愤绝望才借酒浇愁、一步步堕落至此啊！”'),
      S(SPEAKER_HUILAI, '（颓然垂首，眼中凶光尽散，只余死灰般的悔恨）“好精妙的普门杖法……我输得心服口服。偷银赌酒、污蔑住持、打伤公差，桩桩都是我慧癞鬼迷心窍。要逐我也好、废我也罢，只求师弟发发慈悲，莫让我这断腿老爹饿死街头……”'),
      S(SPEAKER_RUZHOU_ABBOT, '（轻宣一声佛号，望向你手中微凉的紫铜戒律令牌）“老衲虽蒙冤受辱，然见此孤老惨状亦心有不忍。师侄手执戒律令牌，究竟该如何定案发落，全凭你裁夺！”'),
    ],
    choices: [
      {
        id: 'slq13_verdict_strict',
        label: '【清规如铁 · 逐出山门】当众废功追牒、逐出少林交官法办（怒目杀业 +2）',
        subLabel: '戒律风格：铁面严惩 · 毫不姑息破戒盗银之罪，严护千年门风',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q13_strict_chosen', value: true },
          { type: 'setFlag', flag: 'sl_jielv_style', value: 'strict' },
          openScene('scene_slq13_07_strict', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'slq13_verdict_mercy',
        label: '【慈悲度化 · 废功留院劈柴赎罪】封脉废功安顿孤老，留其下院劈柴抄经赎罪（禅心慈悲 +2）',
        subLabel: '戒律风格：法外存慈 · 永绝其恃武作恶之患，亦留一线悔改奉亲之机',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q13_strict_chosen', value: false },
          { type: 'setFlag', flag: 'sl_jielv_style', value: 'mercy' },
          openScene('scene_slq13_07_mercy', SHAOLIN_Q13_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq13_07_strict: {
    id: 'scene_slq13_07_strict',
    title: '第六幕 · 铁面逐山',
    subtitle: '汝州下院古庙（清规如铁线）',
    mandatory: true,
    beats: [
      P('（神色冷肃如冰，合十宣佛号）“阿弥陀佛。家门不幸固然可叹，然盗窃常住香火、饮酒赌博、污蔑师长兼殴伤官差，桩桩皆犯佛门根本大戒！若因苦情便曲法宽纵，天下寺产清规必成一纸空文！”'),
      N('你不再迟疑，并指如风连点慧癞气海、膻中数处大穴，震散其十载杂役打熬出的内息，当众收回度牒、削去法名逐出少林山门，命下院武僧将伤人一案文书连同慧癞押交汝州官府按宋律发落。'),
      N('临行前，你自怀中掏出数两散银托付给厚道村正，嘱其请医替李老丈接骨照料，不使无辜老父因逆子失所；慧癞被押出庙门时回望老父一眼，涕泪交加却终究无颜再辩。'),
      N('次日午后，嵩山云开雾散。你携汝州公文与老住持手书返抵钟鼓禅院演武坪，向戒律院主玄寂与知客玄净详呈此案始末。'),
    ],
    onFinishEffects: [openScene('scene_slq13_08_strict', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_07_mercy: {
    id: 'scene_slq13_07_mercy',
    title: '第六幕 · 劈柴赎罪',
    subtitle: '汝州下院古庙（慈悲度化线）',
    mandatory: true,
    beats: [
      P('（收杖俯身扶起李老丈，声音沉静而有千钧之力）“老丈莫哭。你闺女被恶吏逼死之冤，贫僧必请汝州善信代写状纸递交提刑司彻查！但慧癞盗银破戒、打伤公差，绝不可轻纵——”'),
      P('（转望伏地颤抖的慧癞）“今日贫僧封散你周身武功，使你此生再不能恃力作恶；你须向下院老住持叩首认罪、当众还清赌债欠款，随后留在古庙后院柴房日日劈柴挑水、晚间抄经三年以赎前愆，同时就近奉养照料断腿老父。你可心服？”'),
      S(SPEAKER_HUILAI, '（怔怔良久，伏地叩头至额角渗血，失声痛哭）“弟子罪孽深重，蒙师弟与老住持不弃、还肯留条活路让我照看老爹！我愿废功留院劈柴赎罪，此生再沾半滴酒水天打雷劈！”'),
      N('你封散其武功、替下院垫补了公差汤药赔礼，又托汝州善绅接医替李老丈敷药接骨。乡民与老住持无不合十称颂少林悲智双运。次日午后，你携乡邻联名证词返抵钟鼓禅院复命。'),
    ],
    onFinishEffects: [openScene('scene_slq13_08_mercy', SHAOLIN_Q13_QUEST_ID)],
  },

  scene_slq13_08_strict: {
    id: 'scene_slq13_08_strict',
    title: '第七幕 · 清规如铁',
    subtitle: '钟鼓禅院演武坪（严惩结局）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（听罢你当众废功、逐出山门交官法办，难得颔首轻笑）“嗯，办得干净利落！破戒蠢贼就该如此狠辣除名，方免得牵连本山清誉。”'),
      S('NPC-0134', '（目光深邃地注视着你，轻声一叹）“{ifFlag:sl_q13_evidence_found|你临阵不躁，先以铁账众证拆穿叛僧谣言、稳住汝州民心，随后铁面无私废功逐山、又暗中安顿苦主孤老，进退颇具章法。|你此番虽未在庙前细究账证便执杖拿人，致乡邻一时惊疑，然最终按律逐出叛僧、守住了少林千年铁律，亦不失戒律院刚硬本色。}”'),
      S('NPC-0134', '“既已定下铁面执戒之心，切记『严而不虐、明而不苛』。这卷《普门杖法》全卷心诀今日正式归你研习，至于李老丈幼女蒙冤旧案，老衲自会修书托御史台故旧暗查到底。”'),
      N('你双手合十接过完整杖谱心诀，掌中乌木禅杖沉甸甸的，凛然霜气透指入心。'),
    ],
    choices: [
      {
        id: 'slq13_finish_strict',
        label: '合十谢过玄寂师伯，领受《普门杖法》全卷（完成《钟鼓执杖 · 清规如铁》）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_jielv_style', value: 'strict' },
          { type: 'setFlag', flag: 'sl_q13_strict_chosen', value: true },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
          { type: 'teachMartialArt', artId: 'MA-117' },
          { type: 'giveCombatExp', amount: 260, reason: '汝州古庙以普门杖法生擒破戒叛僧慧癞' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q13_evidence_found', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q13_QUEST_ID, outcome: 'strict' },
          toast(
            '已完成《钟鼓执杖 · 清规如铁》（清规如铁线）！习得《普门杖法》，获 260 实战经验与 100 门派贡献！',
            'success',
            '清规如铁',
          ),
        ],
      },
    ],
  },

  scene_slq13_08_mercy: {
    id: 'scene_slq13_08_mercy',
    title: '第七幕 · 悲智双运',
    subtitle: '钟鼓禅院演武坪（慈悲结局）',
    mandatory: true,
    beats: [
      S('NPC-0193', '（闻言微不可察地撇了撇嘴，拂袖淡声道）“废功留院劈柴赎罪？师侄倒真是菩萨心肠，只盼那泼皮日后莫再惹出祸事连累山门便好。”'),
      S('NPC-0134', '（却罕见地展露温煦笑意，抚掌赞叹）“善哉，善哉！{ifFlag:sl_q13_evidence_found|你先在古庙当众核清铁证、折服四邻，复能废其恶功而不绝其悔过生路，令慧癞痛哭伏罪、老父得安，此真佛门大智慧！|你虽起手径直执杖镇场略显刚急，然擒敌后终能体察孤老苦情、以废功劈柴代冷酷除名，化戾气为祥和，亦足称慈心可嘉！}”'),
      S('NPC-0134', '“老衲已令人往汝州下院送去药石与御史台转呈状纸，必为李家洗雪前冤。你已悟透《普门杖法》『降魔不伤慈』之真意，这卷全本秘诀便正式托付于你！”'),
      N('晨风拂过钟鼓禅院，你合十领受《普门杖法》全卷心法，只觉胸中禅意与杖意圆融无碍、清澄如镜。'),
    ],
    choices: [
      {
        id: 'slq13_finish_mercy',
        label: '合十谢过玄寂师伯，领受《普门杖法》全卷（完成《钟鼓执杖 · 清规如铁》）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_jielv_style', value: 'mercy' },
          { type: 'setFlag', flag: 'sl_q13_strict_chosen', value: false },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'teachMartialArt', artId: 'MA-117' },
          { type: 'giveCombatExp', amount: 260, reason: '汝州古庙以普门杖法生擒并感化慧癞' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q13_evidence_found', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q13_QUEST_ID, outcome: 'mercy' },
          toast(
            '已完成《钟鼓执杖 · 清规如铁》（慈悲度化线）！习得《普门杖法》，获 260 实战经验与 100 门派贡献！',
            'success',
            '悲智双运',
          ),
        ],
      },
    ],
  },
}
