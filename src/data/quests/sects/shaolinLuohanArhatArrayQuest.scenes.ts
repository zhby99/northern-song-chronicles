import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q08_QUEST_ID } from './shaolinLuohanArhatArrayQuest'

const SPEAKER_ARHAT_BLADE: StorySpeakerSpec = {
  kind: 'custom',
  name: '金漆铜人 · 戒刀护法僧',
  title: '十八铜人大阵 · 第二阵刀盾首领',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

function buildHuiYinStaffLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_HUIYIN',
    name: '铜人棍首 · 慧印',
    title: '禅武僧 · 十八铜人伏魔棍阵首领',
    realm: '二流中品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
    talk: '“阿弥陀佛！师弟连闯五载试炼声名远播，第一阵「伏魔棍阵」，便由贫僧携师弟以齐眉棍与普门杖法领教！”',
    stats: { hp: 1540, mp: 980, agi: 52, res: 36 },
    talents: { bone: 74, comprehension: 66, charm: 48 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-197',
      move1: 'MA-153',
      move2: 'MA-117',
      move3: 'MA-105',
    },
    learnedArts: [
      { artId: 'MA-100', level: 6 },
      { artId: 'MA-197', level: 6 },
      { artId: 'MA-153', level: 7 },
      { artId: 'MA-117', level: 6 },
      { artId: 'MA-105', level: 6 },
    ],
  })
}

function buildStaffArhatMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_STAFF_MONK',
    name: '金漆铜人 · 齐眉棍僧',
    title: '十八铜人伏魔棍阵 · 护阵武僧',
    realm: '二流中品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: '“三才换位，棍影如墙！接阵！”',
    stats: { hp: 1460, mp: 920, agi: 50, res: 34 },
    talents: { bone: 72, comprehension: 62, charm: 45 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-197',
      move1: 'MA-153',
      move2: 'MA-143',
    },
    learnedArts: [
      { artId: 'MA-100', level: 6 },
      { artId: 'MA-197', level: 5 },
      { artId: 'MA-153', level: 6 },
      { artId: 'MA-143', level: 6 },
    ],
  })
}

function buildBladeArhatMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_BLADE_MONK',
    name: '金漆铜人 · 戒刀护法僧',
    title: '十八铜人刀盾阵 · 刚猛刀僧',
    realm: '二流上品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
    talk: '“第二阵刀盾相济，攻守一体！破不开金身防线，休想见慧轮师兄！”',
    stats: { hp: 1920, mp: 1220, agi: 58, res: 44 },
    talents: { bone: 80, comprehension: 68, charm: 46 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-057',
      move1: 'MA-114',
      move2: 'MA-052',
    },
    learnedArts: [
      { artId: 'MA-100', level: 7 },
      { artId: 'MA-057', level: 6 },
      { artId: 'MA-114', level: 7 },
      { artId: 'MA-052', level: 5 },
    ],
  })
}

function buildShieldArhatMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_SHIELD_MONK',
    name: '金漆铜人 · 铁盾金刚僧',
    title: '十八铜人刀盾阵 · 镇阵盾僧',
    realm: '二流上品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 2,
    sectRankLabel: '罗汉堂铜人',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: '“金刚不动，万法难侵！且看师弟能否震裂我这面熟铜护法盾！”',
    stats: { hp: 2150, mp: 1180, agi: 52, res: 50 },
    talents: { bone: 84, comprehension: 64, charm: 44 },
    equippedArts: {
      neigong: 'MA-100',
      qinggong: 'MA-197',
      move1: 'MA-143',
      move2: 'MA-094',
    },
    learnedArts: [
      { artId: 'MA-100', level: 7 },
      { artId: 'MA-197', level: 6 },
      { artId: 'MA-143', level: 7 },
      { artId: 'MA-094', level: 6 },
    ],
  })
}

function buildHuiLunCoreBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ08_HUILUN',
    name: '铜人阵眼 · 慧轮',
    title: '大金刚僧 · 十八铜人三才六合阵眼',
    realm: '一流下品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 3,
    sectRankLabel: '大金刚阵眼',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
    talk: '“阿弥陀佛！十年来你是第一位连破棍阵与刀盾阵直抵阵眼之人。贫僧今日便以罗汉堂压箱绝学，为你印证真传金身！”',
    stats: { hp: 2780, mp: 1850, agi: 68, res: 56 },
    talents: { bone: 88, comprehension: 80, charm: 56 },
    equippedArts: {
      neigong: 'MA-038',
      qinggong: 'MA-057',
      move1: 'MA-094',
      move2: 'MA-062',
      move3: 'MA-114',
    },
    learnedArts: [
      { artId: 'MA-038', level: 7 },
      { artId: 'MA-057', level: 7 },
      { artId: 'MA-094', level: 8 },
      { artId: 'MA-062', level: 7 },
      { artId: 'MA-114', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq08_01: {
    id: 'scene_slq08_01',
    title: '第一幕 · 五载叩关',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}清秋，嵩山丹枫如火。你拜入少林倏忽已满五载一千八百日，历颍阳度寇、白马降魔、东庑捉谍三大功绩，经义与书法皆臻上乘，终于获准叩关挑战少林寺镇寺百年大考——【十八铜人 · 罗汉金身】！'),
      N('罗汉堂演武正殿四门洞开，檀香如云。降魔尊者玄苦与戒律长老玄痛端坐监阵高台，殿内青石地面上，十八名身涂金漆、肌肉虬结如怒目金刚的罗汉堂顶尖武僧已然分列三才六合方位，气势如山岳倾压！'),
      S('NPC-0126', '（缓声宣谕，声震殿梁）“阿弥陀佛！少林寺自唐初至今，凡欲由内门晋升【真传弟子】者，必过十八铜人大阵！今日大阵由大金刚僧慧轮坐镇阵眼，禅武僧慧印领衔前阵，共分三关——”'),
      S('NPC-0156', '“第一关伏魔棍阵，考你步法与群战周旋；第二关金身刀盾阵，考你刚柔破防之功；第三关直面阵眼慧轮，考你绝技圆融与禅心定力！三关尽破，钟楼古钟为你连鸣九响！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_02', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_02: {
    id: 'scene_slq08_02',
    title: '第二幕 · 阵眼肃立',
    subtitle: '罗汉堂演武正殿 · 铜人列阵',
    mandatory: true,
    beats: [
      N('只见阵心莲台之上，大金刚僧慧轮缓缓睁开双目。他身涂淡淡金漆，宛若寺中泥塑金身罗汉降世，周身内息厚重沉凝，竟已隐然踏入一流下品之境！'),
      S('NPC-0254', '（双手合十，声若洪钟）“师弟，五年前你闯木桩廊时，贫僧便在檐下观礼；今日你提着玄悲师伯所赠韦陀宝杵、怀抱慈悲刀与龙爪手直叩大阵，贫僧亦觉热血沸腾。阵中无长幼，唯论禅武深浅，请！”'),
      P('（缓步踏入青石阵界，向监阵二位高僧与十八铜人深施一礼）“多谢诸位师兄成全！弟子五载苦修，今日正欲于十八铜人大阵中印证罗汉金身！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_03', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_03: {
    id: 'scene_slq08_03',
    title: '第三幕 · 击鼓启阵',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('“咚——咚——咚！”殿外牛皮大鼓连擂三通！十八名金漆铜人齐声高宣佛号，声浪震得廊檐铜铃齐鸣，三才六合大阵轰然运转！'),
    ],
    choices: [
      {
        id: 'slq08_accept',
        label: '沉气凝神，正式开启【十八铜人 · 罗汉金身】真传终极试炼',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q08_QUEST_ID, stepId: 'arhat_array_trial' },
          setStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
          openScene('scene_slq08_04', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq08_04: {
    id: 'scene_slq08_04',
    title: '第四幕 · 十八金身',
    subtitle: '罗汉堂演武正殿 · 第一阵启',
    illustrationUrl: '/assets/quests/sl_08_arhat_array_1.jpg',
    illustrationCaption: '十八铜人阵 · 金漆罗汉列成三才六合大阵，齐眉长棍交织如林，直压中宫',
    mandatory: true,
    beats: [
      N('金光闪耀间，外围六名金漆铜人齐步踏出，手中齐眉熟铜棍往青石一顿，震起一片沉闷雷音！领头之人正是禅武僧【慧印】，双目精芒四射，长棍遥指你中宫要害！'),
      S('NPC-0356', '“阿弥陀佛！第一阵「伏魔棍阵」，三才互济、棍影连环！师弟若寻不到换位破绽，便会被棍墙硬生生逼出殿门！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_05', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_05: {
    id: 'scene_slq08_05',
    title: '第五幕 · 棍影如林',
    subtitle: '罗汉堂演武正殿 · 伏魔棍阵',
    mandatory: true,
    beats: [
      N('慧印一声低喝，与身旁铜人棍僧一左一右踏步疾进，齐眉棍与普门杖法交错成网，封死你上下三路！其余四名外围铜人则封锁退路，逼你正面迎击！'),
      P('（深吸一口气，心中空明如镜）“棍阵讲究借势连环，我便以快打快、直破阵首慧印师兄！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_06', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_06: {
    id: 'scene_slq08_06',
    title: '第六幕 · 第一阵 · 破棍',
    subtitle: '罗汉堂演武正殿 · 伏魔棍阵决战',
    mandatory: true,
    beats: [
      N('棍风呼啸扑面而来，你足踏罗汉步迎锋而上，与铜人棍首慧印及齐眉棍僧展开硬碰硬的阵中交锋！'),
    ],
    choices: [
      {
        id: 'slq08_fight_wave1',
        label: '【第一阵】迎战伏魔棍阵 · 慧印与齐眉棍僧（二流中品 × 2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiYinStaffLeader() },
            extraOpponents: [{ kind: 'custom', npc: buildStaffArhatMonk() }],
            rule: 'spar',
            forbidEscapeReason: '身在十八铜人三才六合大阵之中，唯破阵而出方为胜！',
            introText:
              '【十八铜人大阵 · 第一阵】迎战【铜人棍首 · 慧印 & 金漆铜人 · 齐眉棍僧（二流中品 × 2）】！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q08_wave1_cleared', value: true },
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq08_07', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被伏魔棍阵连环棍影震退阵外！调息后可再赴【罗汉堂演武正殿】重闯第一阵。',
                'warn',
                '十八铜人',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_07: {
    id: 'scene_slq08_07',
    title: '第七幕 · 棍阵告破',
    subtitle: '罗汉堂演武正殿 · 一关已过',
    mandatory: true,
    beats: [
      N('一番龙争虎斗之后，你看准慧印换步蓄力的刹那空隙，一记劲风荡开齐眉棍僧横扫，顺势欺身贴近，以《龙爪手》扣住慧印杖尾轻轻一抖！慧印虎口剧震，长杖斜飞半尺，立时合十收招退开三步！'),
      S('NPC-0356', '（朗声赞叹，退归阵侧）“阿弥陀佛！师弟步法精妙、劲力通透，第一阵「伏魔棍阵」，你过了！”'),
      N('高台上，玄苦尊者微微颔首，旋即拂袖一挥，示意大阵进入第二重变化！'),
    ],
    onFinishEffects: [openScene('scene_slq08_08', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_08: {
    id: 'scene_slq08_08',
    title: '第八幕 · 刀盾合围',
    subtitle: '罗汉堂演武正殿 · 第二阵变',
    mandatory: true,
    beats: [
      N('“锵啷！”一声金属交鸣，中圈六名体格更为魁梧的金漆铜人跨步补位！只见他们三人手持厚重熟铜护法圆盾，三人手提雪亮少林戒刀，刀藏盾后、盾护刀锋，眨眼间结成一座水泼不进的钢铁壁垒！'),
      S(SPEAKER_ARHAT_BLADE, '（横刀盾侧，声如金铁交击）“阿弥陀佛！第二阵「金身刀盾阵」，外御重器、内藏燃木与慈悲刀势！师弟请接阵！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_09', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_09: {
    id: 'scene_slq08_09',
    title: '第九幕 · 刚柔破壁',
    subtitle: '罗汉堂演武正殿 · 刀盾阵前',
    mandatory: true,
    beats: [
      N('你略作调息，平复方才破棍阵耗去的真气，凝神打量眼前刀盾阵。铁盾金刚僧横练功底极深，单靠寻常招数极难破防；戒刀护法僧则隐于盾后伺机暴起，刀风炽烈逼人！'),
      P('（双目精光内敛，心中暗忖）“盾厚则笨，刀猛则急——须以《韦陀杵》重劲震裂铁盾，再以《慈悲刀法》卸其急锋！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_10', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_10: {
    id: 'scene_slq08_10',
    title: '第十幕 · 第二阵 · 破盾',
    subtitle: '罗汉堂演武正殿 · 金身刀盾阵决战',
    mandatory: true,
    beats: [
      N('铁盾如山压进，戒刀寒光自盾隙骤闪而出！你提气迎战，直撼二流上品的金漆铜人刀盾组合！'),
    ],
    choices: [
      {
        id: 'slq08_fight_wave2',
        label: '【第二阵】迎战金身刀盾阵 · 戒刀僧与铁盾僧（二流上品 × 2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBladeArhatMonk() },
            extraOpponents: [{ kind: 'custom', npc: buildShieldArhatMonk() }],
            rule: 'spar',
            forbidEscapeReason: '第二阵刀盾壁垒已合，唯有正面破阵方能直面阵眼慧轮！',
            introText:
              '【十八铜人大阵 · 第二阵】迎战【戒刀护法僧 & 铁盾金刚僧（二流上品 × 2）】！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q08_wave2_cleared', value: true },
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq08_11', SHAOLIN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '未能冲破金身刀盾阵壁垒！调息后可再赴【罗汉堂演武正殿】直接续战第二阵。',
                'warn',
                '十八铜人',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_11: {
    id: 'scene_slq08_11',
    title: '第十一幕 · 震盾收刀',
    subtitle: '罗汉堂演武正殿 · 二关皆破',
    mandatory: true,
    beats: [
      N('“当——！！”一声震耳欲聋的洪钟巨响，你以刚猛无匹的《韦陀杵》重劲硬生生震退铁盾金刚僧三步，紧接着顺势滑步切入盾隙，以《龙爪手》隔空锁住戒刀护法僧腕脉！'),
      N('刀盾二僧齐齐收势退开，向你合十致敬！殿内观礼的数十名内门弟子无不屏息震撼——连破棍阵与刀盾阵，这已是少林近十年来未曾见过的盛景！'),
      S(SPEAKER_ARHAT_BLADE, '“阿弥陀佛！师弟刚柔并济，竟以一己之力震开我六人刀盾防线！请入核心阵眼，面见慧轮师兄！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_12', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_12: {
    id: 'scene_slq08_12',
    title: '第十二幕 · 直面阵眼',
    subtitle: '罗汉堂演武正殿 · 三才阵心',
    mandatory: true,
    beats: [
      N('余下铜人纷纷退居殿柱之侧，将正中莲台青石坪彻底让出。大金刚僧【慧轮】缓步走下莲台，每踏一步，浑身金漆仿佛隐隐流动着一层灼热气浪——正是少林上乘内功《少林九阳功》与罗汉金身练至一流境界的征兆！'),
      S('NPC-0156', '（在高台上低声向玄苦赞道）“师兄你看，连战两阵之后，此子气息非但不乱，反而越战越纯，竟在高压之下隐隐摸到了圆融化境！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_13', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_13: {
    id: 'scene_slq08_13',
    title: '第十三幕 · 金刚问禅',
    subtitle: '罗汉堂演武正殿 · 阵眼对峙',
    mandatory: true,
    beats: [
      S('NPC-0254', '（凝视着你，神情肃穆而欣慰）“师弟，你已连破两阵，离真传之位仅一步之遥。在交手之前，贫僧唯有一问：你苦修五载、闯这十八铜人大阵，究竟是为扬名天下，还是为何？”'),
      P('（合十肃立，声音清越如少室晨钟）“不为扬名，不为争胜。昔日颍阳刀背度饥民、洛阳白马护经卷、东庑寒雾保山河——弟子求真传金身，唯愿乱世将起之时，能多护住一分苍生安宁！”'),
      S('NPC-0254', '（抚掌大笑，眼中金芒暴涨）“大善！大善！有此宏愿，方堪承我少林真传衣钵！来吧，让贫僧以全盛一流修为，为你淬炼最后一重罗汉金身！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_14', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_14: {
    id: 'scene_slq08_14',
    title: '第十四幕 · 龙象交击',
    subtitle: '罗汉堂演武正殿 · 终极对决前奏',
    mandatory: true,
    beats: [
      N('慧轮双手一分，周身《少林九阳功》罡气轰然展开，慈悲刀意、韦陀杵劲、龙爪擒拿在他举手投足间随心流转，不愧是罗汉堂公认的一流下品大金刚僧！'),
      N('你亦将五年来在少林习得的《罗汉伏虎功》《慈悲刀法》《韦陀杵》《龙爪手》尽数融汇心头，气息如江河归海，迎向这最终一战！'),
    ],
    onFinishEffects: [openScene('scene_slq08_15', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_15: {
    id: 'scene_slq08_15',
    title: '第十五幕 · 第三阵 · 阵眼慧轮',
    subtitle: '罗汉堂演武正殿 · 决战大金刚僧',
    mandatory: true,
    beats: [
      N('大殿之内鸦雀无声，唯余劲风激荡！你深吸一口气，正面迎战十八铜人核心阵眼——大金刚僧【慧轮（一流下品）】！'),
    ],
    choices: [
      {
        id: 'slq08_fight_huilun',
        label: '【第三阵 · 阵眼】一对一决战大金刚僧 · 慧轮（一流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuiLunCoreBoss() },
            rule: 'spar',
            forbidEscapeReason: '已抵十八铜人核心阵眼，唯正面力挫慧轮方能成就少林真传！',
            introText:
              '【十八铜人大阵 · 核心阵眼】一对一决战大金刚僧【慧轮（一流下品）】！',
            onWin: [openScene('scene_slq08_16', SHAOLIN_Q08_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '不敌一流下品阵眼慧轮的雄浑九阳罡气！调息后可再赴【罗汉堂演武正殿】直接续战慧轮。',
                'warn',
                '十八铜人',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq08_16: {
    id: 'scene_slq08_16',
    title: '第十六幕 · 破阵金身',
    subtitle: '罗汉堂演武正殿 · 铜人退让',
    illustrationUrl: '/assets/quests/sl_08_arhat_breakthrough.jpg',
    illustrationCaption: '罗汉金身 · 正殿金光震荡，你以融汇贯通的罗汉绝艺震退阵眼慧轮，十八铜人齐齐合十让道',
    mandatory: true,
    beats: [
      N('你与慧轮在演武正殿激斗五十余合，拳风杵影震得青砖龟裂、香灰漫天！至最后关头，慧轮一记蓄满《少林九阳功》的大韦陀重势压顶而来，劲力如排山倒海！'),
      N('电光石火间，你心中豁然贯通：先以《慈悲刀法》圆弧卸去三分刚劲，再借《龙爪手》寸劲粘随化开中门，最后将全身真气贯于一击，以堂堂正正的《韦陀杵》破邪之势反震而出！'),
      N('“轰——！”气浪如金色莲花轰然绽放！慧轮连退七步方稳住身形，周身金漆震落点点金粉，旋即畅然大笑，双掌合十躬身让开大殿中路！'),
    ],
    onFinishEffects: [openScene('scene_slq08_17', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_17: {
    id: 'scene_slq08_17',
    title: '第十七幕 · 铜人稽首',
    subtitle: '罗汉堂演武正殿 · 众僧同贺',
    mandatory: true,
    beats: [
      N('随着慧轮退让中路，殿内十八名金漆铜人齐刷刷收兵肃立，向你齐声高宣佛号合十致礼！'),
      S('NPC-0254', '（气喘微定，眼中满是敬佩与喜悦）“阿弥陀佛！师弟将刀、杵、爪三艺融于一炉，刚柔相济、禅武合一，贫僧输得心服口服！自今日起，罗汉堂真传之位，非师弟莫属！”'),
      S('NPC-0126', '（起身走下监阵高台，欣慰无比地宣谕）“传我法谕——撞响钟楼大钟九响！恭请方丈师兄于大雄正殿开坛，为我罗汉堂新晋真传弟子授衣册封！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_18', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_18: {
    id: 'scene_slq08_18',
    title: '第十八幕 · 赴大雄殿',
    subtitle: '十八铜人罗汉堂 · 钟声初起',
    mandatory: true,
    beats: [
      N('“铛——！铛——！铛——！”厚重悠远的青铜古钟声骤然响彻嵩山少室，惊起满山松涛飞鸟！全寺僧俗闻钟皆知：又有英才硬闯十八铜人大阵成功，即将受封少林真传！'),
      S('NPC-0156', '“去吧！净手更衣，速赴【大雄正殿 · 佛前蒲团】，方丈师兄已在佛前候你！”'),
    ],
    choices: [
      {
        id: 'slq08_go_daxiong',
        label: '沐浴钟声整肃僧衣，前往【大雄正殿 · 佛前蒲团】受封真传弟子',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q08_QUEST_ID, 'zhenchuan_ceremony'),
          toast(
            '已破十八铜人大阵！请速赴【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】受玄慈方丈册封真传！',
            'talk',
            '钟鸣九响',
          ),
        ],
      },
    ],
  },

  scene_slq08_19: {
    id: 'scene_slq08_19',
    title: '第十九幕 · 佛前蒲团',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿之内，三世金佛宝相庄严，百盏长明酥油灯交相辉映。伏虎方丈玄慈身披大红织金袈裟端坐佛前，玄苦、玄痛、慧轮等高僧分列两厢，数百名少林弟子肃立殿外石阶观礼。'),
      N('你缓步跨过门槛，至佛前蒲团双膝跪落，向三宝与方丈行三叩首大礼。'),
      S('NPC-0112', '（目光温和而深邃，缓缓起身步至你身前）“阿弥陀佛！五载前你在大雄正殿挥毫答经、择入罗汉堂，贫僧便知你非池中之物。今日你连破十八铜人三才六合大阵，钟鸣九响，足证禅心与武功皆已大成！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_20', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_20: {
    id: 'scene_slq08_20',
    title: '第二十幕 · 钟鸣九响',
    subtitle: '大雄正殿 · 亲赐紫金袈裟',
    illustrationUrl: '/assets/quests/sl_08_zhenchuan_bell.jpg',
    illustrationCaption: '钟鸣九响 · 大雄正殿香云缭绕，玄慈方丈亲为你披上少林真传紫金袈裟，群僧同颂佛号',
    mandatory: true,
    beats: [
      N('第九声青铜古钟余韵恰在此时悠悠落定！玄慈方丈双手捧起一袭绣有金莲梵纹的真传紫金袈裟与一枚紫檀「罗汉真传」法印，亲手为你披上肩头！'),
      S('NPC-0112', '“贫僧以嵩山少林寺方丈之名，正式册封你为少林派【真传弟子】！自今日起，你可自由出入罗汉堂内殿与藏经阁中层，亦肩负护持少林千年法脉、匡扶中原武林正道之重任！”'),
      N('殿内外数百名少林僧俗齐声高颂：“阿弥陀佛！恭贺师兄荣膺真传！”声震嵩岳，经久不息！'),
    ],
    onFinishEffects: [openScene('scene_slq08_21', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_21: {
    id: 'scene_slq08_21',
    title: '第二十一幕 · 禅武新章',
    subtitle: '大雄正殿 · 佛前誓愿',
    mandatory: true,
    beats: [
      P('（身披紫金袈裟，手捧真传法印，向方丈与诸位师伯深深叩首）“弟子谨遵方丈师伯法谕！此生必守少林清规，以罗汉金身护佑苍生、不负中原佛门百年重托！”'),
      S('NPC-0112', '（含笑扶你起身）“善哉！江湖风云渐起，辽夏蠢动，吐蕃、西域亦多奇人异士。你既已跻身真传之列，日后更须勤参《大乘经藏》、精研少林七十二绝技，方能在大变局中稳如泰山！”'),
    ],
    onFinishEffects: [openScene('scene_slq08_22', SHAOLIN_Q08_QUEST_ID)],
  },

  scene_slq08_22: {
    id: 'scene_slq08_22',
    title: '第二十二幕 · 罗汉真传',
    subtitle: '嵩山少林寺 · 大雄正殿',
    mandatory: true,
    beats: [
      N('清秋暖阳穿透大雄宝殿高窗，洒落在你肩头的真传紫金袈裟之上。五载寒暑苦修终成正果，属于少林真传弟子的全新江湖篇章，正徐徐展开！'),
    ],
    choices: [
      {
        id: 'slq08_complete',
        label: '恭谨受封少林【真传弟子】，圆满完成【十八铜人 · 罗汉金身】',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          {
            type: 'giveCombatExp',
            amount: 550,
            reason: '连破少林十八金漆铜人三才六合大阵并力挫阵眼慧轮，晋升真传弟子',
          },
          { type: 'addSectContribution', amount: 220 },
          {
            type: 'modifyRenown',
            delta: 80,
            reason: '硬闯少林十八铜人大阵，钟鸣九响册封嵩山少林真传弟子',
          },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_Q08_QUEST_ID, outcome: 'completed' },
          toast(
            '【十八铜人 · 罗汉金身】圆满完成！已晋升嵩山少林寺 Lv.3【真传弟子】，实战经验 +550、贡献 +220、声望 +80、经义 +2、书 +1！',
            'success',
            '真传册封',
          ),
        ],
      },
    ],
  },
}
