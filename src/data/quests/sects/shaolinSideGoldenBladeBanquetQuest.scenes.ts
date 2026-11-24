import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE08_QUEST_ID } from './shaolinSideGoldenBladeBanquetQuest'

const SPEAKER_ASSASSIN_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒针影',
  title: '关西暗器杀手首领',
  factionName: '关西暗杀堂',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
}

const SPEAKER_ASSASSIN_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '冷袖鬼',
  title: '关西暗器死士',
  factionName: '关西暗杀堂',
  portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
}

function buildPoisonNeedleShadow(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_POISON_SHADOW',
    name: '毒针影',
    title: '关西暗器杀手 · 毒针影',
    realm: '二流上品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器首领',
    avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
    talk: '“坏我关西血仇大计的少林和尚，拿一张破木桌挡得住第一波袖箭，挡得住老子的追魂夺命镖么！”',
    stats: { hp: 1620, mp: 1360, agi: 57, res: 38 },
    talents: { bone: 64, comprehension: 58, charm: 30 },
    equippedArts: { neigong: 'MA-142', move1: 'MA-155', move2: 'MA-137' },
    learnedArts: [
      { artId: 'MA-142', level: 5 },
      { artId: 'MA-155', level: 6 },
      { artId: 'MA-137', level: 5 },
    ],
  })
}

function buildPoisonNeedleShadowExposed(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_POISON_SHADOW_EXPOSED',
    name: '毒针影',
    title: '仓促迎战的暗器首领 · 毒针影',
    realm: '二流上品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器首领',
    avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
    talk: '“好贼秃，竟一眼看穿老子易容！纵然两名死士被你震开，我这袖里毒针照样取你性命！”',
    stats: { hp: 1380, mp: 1160, agi: 51, res: 33 },
    talents: { bone: 64, comprehension: 58, charm: 30 },
    equippedArts: { neigong: 'MA-142', move1: 'MA-155', move2: 'MA-137' },
    learnedArts: [
      { artId: 'MA-142', level: 5 },
      { artId: 'MA-155', level: 5 },
      { artId: 'MA-137', level: 5 },
    ],
  })
}

function buildAssassinMinion1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_ASSASSIN_1',
    name: '冷袖鬼',
    title: '关西暗器死士',
    realm: '二流下品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器死士',
    avatarUrl: '/assets/characters/templates/tpl_tangmen_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tangmen_male_fb.jpg',
    talk: '“金刀老儿的项上人头值三千两黄金，挡路者和尚一并去死！”',
    stats: { hp: 960, mp: 780, agi: 46, res: 24 },
    talents: { bone: 54, comprehension: 48, charm: 25 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-175', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-121', level: 4 },
      { artId: 'MA-175', level: 5 },
      { artId: 'MA-131', level: 4 },
    ],
  })
}

function buildAssassinMinion2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS08_ASSASSIN_2',
    name: '青竹蛇',
    title: '关西暗器死士',
    realm: '二流下品',
    factionName: '关西暗杀堂',
    sectRank: 0,
    sectRankLabel: '暗器死士',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“别让少林武僧合围，先封死他退路！”',
    stats: { hp: 940, mp: 760, agi: 47, res: 24 },
    talents: { bone: 52, comprehension: 46, charm: 24 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-155', move2: 'MA-133' },
    learnedArts: [
      { artId: 'MA-121', level: 4 },
      { artId: 'MA-155', level: 5 },
      { artId: 'MA-133', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls08_01: {
    id: 'scene_sls08_01',
    title: '第一幕 · 洛阳贺寿 · 亭中拜谒',
    subtitle: '洛阳府 · 金刀王家大宅 · 翠竹曲水藏刀八角亭',
    mandatory: true,
    beats: [
      N('{reignYear}洛阳牡丹初绽，金刀王家大宅张灯结彩、宾客云集。你奉嵩山少林寺之命携檀香佛珠前来祝贺家主王元霸六秩寿诞，刚入翠竹曲水藏刀八角亭，便遇上在此护院的少林俗家弟子虚净。'),
      S('NPC-0667', '（迎上前合十行礼）“阿弥陀佛！本山师兄远道而来辛苦了！王老爷子素来敬重嵩山少林，每逢中原义举皆倾囊相助，今日听说少林内门高足亲至，高兴得合不拢嘴呢！”'),
      N('话音未落，一阵洪亮笑声自竹林曲桥传来。只见王元霸身着绛紫团花锦袍，须发微霜却虎步生风，双手托着一对鎏金铁胆大步步入八角亭中。'),
      S('NPC-0186', '（抱拳朗笑）“哈哈哈哈！贵客临门，有失远迎！少林寺派你这般英气勃勃的内门俊彦来给老夫拜寿，比送十箱黄金还令老夫开怀！快随老夫移步中庭观演武、吃寿茶！”'),
      P('（双手奉上嵩山檀香佛珠与方丈贺柬）“晚辈奉嵩山少林方丈之命，恭祝王老爷子福如东海、金刀常啸！”'),
    ],
    onFinishEffects: [openScene('scene_sls08_02', SHAOLIN_SIDE08_QUEST_ID)],
  },

  scene_sls08_02: {
    id: 'scene_sls08_02',
    title: '第二幕 · 暗流浮影 · 亭畔筹防',
    subtitle: '翠竹曲水藏刀八角亭 · 曲水畔',
    mandatory: true,
    beats: [
      N('王元霸爽朗先行赴中庭招呼洛阳群豪，虚净却暗中拉住你衣袖，神色凝重地指向曲桥外熙攘的宾客与往来仆役。'),
      S('NPC-0667', '（压低声音）“师兄，方才河洛镖局传来暗信——王老爷子早年剿灭关西马贼时结下的死仇，竟重金雇了关西暗器杀手【毒针影】与两名死士，扬言今日混入寿宴血洗主桌！”'),
      P('（目光微敛）“满堂皆是洛阳乡绅与武林同道，若无实据贸然搜查，非但扫了王老爷子寿兴，更恐惊动刺客狗急跳墙、伤及无辜妇孺。”'),
      S('NPC-0667', '“虚慧师弟已暗中守在中庭东廊盯防。眼下中庭演武即将开场，师兄打算如何暗中布防？”'),
    ],
    choices: [
      {
        id: 'sls08_prep_observe',
        label: '【佯装赏武 · 细察宾客与仆役手眼】嘱虚净伴随寿星，自己留心贴近主桌之人细微破绽',
        subLabel: '承接支线【金刀寿宴 · 洛阳暗箭】，移步金刀石锁演武中庭',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_prep', value: 'observe' },
          { type: 'startQuest', questId: SHAOLIN_SIDE08_QUEST_ID, stepId: 'courtyard_banquet' },
          setStep(SHAOLIN_SIDE08_QUEST_ID, 'courtyard_banquet'),
          toast(
            '已暗中戒备！请前往【金刀王家大宅 · 金刀石锁演武中庭（ly_jd_courtyard）】察看寿宴动静。',
            'talk',
            '金刀寿宴',
          ),
        ],
      },
      {
        id: 'sls08_prep_guard',
        label: '【密嘱封锁角门 · 贴身护持主桌】嘱虚净、虚慧盯紧东西角门，自己坐于主桌侧翼见机行事',
        subLabel: '承接支线【金刀寿宴 · 洛阳暗箭】，移步金刀石锁演武中庭',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_prep', value: 'guard' },
          { type: 'startQuest', questId: SHAOLIN_SIDE08_QUEST_ID, stepId: 'courtyard_banquet' },
          setStep(SHAOLIN_SIDE08_QUEST_ID, 'courtyard_banquet'),
          toast(
            '已布好中庭暗防！请前往【金刀王家大宅 · 金刀石锁演武中庭（ly_jd_courtyard）】护卫王元霸寿宴。',
            'talk',
            '金刀寿宴',
          ),
        ],
      },
    ],
  },

  scene_sls08_03: {
    id: 'scene_sls08_03',
    title: '第三幕 · 筵席辨奸 · 三疑现形',
    subtitle: '金刀石锁演武中庭 · 寿宴推理',
    mandatory: true,
    beats: [
      N('金刀石锁演武中庭摆开二十余桌流水寿席，王家子弟正演练祖传《洛阳金刀谱》，刀风霍霍、喝彩震天。{ifFlagEq:sl_s08_prep=observe|你借斟茶之机缓步巡视主桌三丈之内，目光如电扫过每一张面孔；|你贴身坐于王元霸左侧，与东廊柱后的虚慧交换眼色，凝神扫视正朝主桌靠拢的人群；}虚慧以手势暗指席间，竟有三名举止微异之人恰在此时聚近主桌！'),
      N('其一，席边一名满脸虬髯的醉酒镖头满口江湖粗话，一手拎着酒坛大声嚷嚷着当年押镖旧事，脚步摇晃间却一连三次贴近锣鼓架与戏箱，腰间宽带鼓鼓囊囊；'),
      N('其二，主桌后方一名低眉顺眼的青衣斟酒仆役手托雕花漆盘，盘中那盏替王元霸备好的凉茶自开席便未见热气、旁人亦未动过一口；你偶瞥其托盘左手，见他虎口竟长满一层细密发黑的铁针老茧，藏在帽檐下的双眼更是毫无喜色，冷冰冰死死盯住王元霸的后心大穴！'),
      N('其三，西廊入口一名满头大汗的洛阳绸缎商正急切地捧着一只长条红漆锦匣，频频垫脚朝王元霸招手挤过护院，口中直催着要趁演武收招前亲手献上“镇店奇珍”。'),
      N('恰在此时，演武场大锣猛然高举将敲——满座欢声即将达到顶峰！千钧一发之间，你断定真正的关西刺客首领究竟是哪一人？'),
    ],
    choices: [
      {
        id: 'sls08_pick_escort',
        label: '指向满口江湖粗话、脚步屡屡逼近鼓架戏箱的醉酒镖头',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_guess', value: 'escort' },
          { type: 'setFlag', flag: 'sl_s08_assassin_spotted', value: false },
          openScene('scene_sls08_04', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'sls08_pick_servant',
        label: '指向左手虎口满布铁针老茧、端着凉茶冷眼盯住寿星后心的青衣斟酒仆役',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_guess', value: 'servant' },
          { type: 'setFlag', flag: 'sl_s08_assassin_spotted', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s08_spot_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s08_spot_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls08_04', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'sls08_pick_merchant',
        label: '指向怀抱长条红漆锦匣、神色焦躁急着挤向主桌献礼的洛阳绸缎商',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_guess', value: 'merchant' },
          { type: 'setFlag', flag: 'sl_s08_assassin_spotted', value: false },
          openScene('scene_sls08_04', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls08_04: {
    id: 'scene_sls08_04',
    title: '第四幕 · 掀桌破箭 · 杀机暴发',
    subtitle: '金刀石锁演武中庭 · 千钧一发',
    illustrationUrl: '/assets/quests/sl_s08_jindao_arrows.jpg',
    illustrationCaption: '洛阳暗箭 · 疾步掀翻紫檀八仙桌，凌空挡下漫天淬毒袖箭',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s08_guess=servant|电光石火之间，你一声沉喝如平地惊雷，左手一拂掀翻那青衣仆役托盘中的幽碧毒茶，右手同时猛托紫檀八仙桌狠狠撞向戏台前沿！“轰隆”一声巨响，藏于桌下与戏箱后的两名死士冷袖鬼、青竹蛇还未来得及按动暗簧，已被沉重桌案与漫天碎瓷震退丈余，登时被早有防备的虚净、虚慧与王家护院合围死锁！|}{ifFlagEq:sl_s08_guess=escort|你箭步抢上先截住那醉酒镖头，对方大呼冤枉，腰间揣的不过是两锭贺礼元宝！恰在锣声轰鸣的刹那，主桌后方那名青衣斟酒仆役骤然暴起，扯碎青衣露出玄黑劲装，与戏台下跃出的两名死士齐发数十枚幽蓝淬毒袖箭直扑王元霸后心！|}{ifFlagEq:sl_s08_guess=merchant|你箭步抢上先截住那绸缎商，对方吓得跌坐于地，红漆锦匣滚出一轴寻常祝寿蜀锦！恰在锣声轰鸣的刹那，主桌后方那名青衣斟酒仆役骤然暴起，扯碎青衣露出玄黑劲装，与戏台下跃出的两名死士齐发数十枚幽蓝淬毒袖箭直扑王元霸后心！|}'),
      N('{ifFlag:sl_s08_assassin_spotted|那青衣仆役眼见偷袭败露、同伙受制，袖筒暗簧仓促扣动射出十余枚牛毛毒针，尽数叮叮当当钉入你横举的紫檀桌面！王元霸与满席老幼分毫无损，那仆役撕下易容假须，露出阴鸷冷笑——正是关西暗器首领【毒针影】！|千钧一发之际，你回身暴喝、气沉丹田，双掌猛掀沉重紫檀八仙桌凌空挡于王元霸身前！“咄咄咄咄——”数十支幽蓝毒箭尽数钉入厚实桌面，箭尾嗡嗡颤抖，竟无一支漏过！酒菜倾翻满地，王元霸安然无恙，反手自侍卫手中夺过百炼金刀！}'),
      S('NPC-0186', '（惊怒交加，怒目圆睁）“好贼子，竟敢易容混入老夫寿诞放毒暗算！小师父救命之恩，老夫铭记在心！”'),
      S(SPEAKER_ASSASSIN_BOSS, '{ifFlag:sl_s08_assassin_spotted|（十指扣满追魂毒镖，眼中杀意森寒）“好个贼秃，竟一眼看穿我左手虎口练针的老茧！纵然两名手下被你们拦住，老子单凭这双毒手也要先取你性命！”|（与冷袖鬼、青竹蛇成品字形跃入庭心，狞笑喝道）“坏我三千两黄金的大买卖，今日便拿你这少林多事和尚祭我暗杀堂毒镖！”}'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side08_assassins_ready', value: true },
      openScene('scene_sls08_05', SHAOLIN_SIDE08_QUEST_ID),
    ],
  },

  scene_sls08_05: {
    id: 'scene_sls08_05',
    title: '第五幕 · 庭心恶斗 · 截杀暗器堂',
    subtitle: '金刀演武中庭 · 决战关西暗器杀手',
    mandatory: true,
    beats: [
      S(SPEAKER_ASSASSIN_A, '{ifFlag:sl_s08_assassin_spotted|（在走廊外被虚净、虚慧双棍逼退，嘶声大喊）“老大快撤！少林和尚早把咱们看穿了！”|（甩出三枚金钱镖封住左翼，怪笑连连）“兄弟们齐上！暗器封眼，短刀断脉，绝不能让这和尚近身！”}'),
      P('（将插满毒箭的八仙桌震退半步，朗声喝道）“王老爷子速护宾客退入后廊！这关西暗杀堂的魔爪，便由弟子来斩断！”'),
      N('你沉肩坠肘、真气护体，大步踏入中庭石锁阵间迎战关西杀手！'),
    ],
    choices: [
      {
        id: 'sls08_fight_boss_only',
        label: '【乘势单擒首领】外围死士已被震退锁拿，1v1 直擒暗器首领【毒针影（二流上品）】',
        subLabel: '先手识破真刺客 · 跳过两名外围死士，单挑仓促迎战的毒针影',
        tone: 'jade',
        condition: { type: 'flag', flag: 'sl_s08_assassin_spotted', op: 'truthy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonNeedleShadowExposed() },
            rule: 'story_trial',
            forbidEscapeReason: '王家满堂宾客就在身后，岂容刺客首领脱逃！',
            introText:
              '【洛阳暗箭 · 先声夺人】两名死士已被同门牵制，1v1 直擒仓促迎战的【毒针影（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls08_06', SHAOLIN_SIDE08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '毒针影连环毒镖阴狠异常，一时受挫！幸得虚净掷出石锁援护，调息后可于【金刀石锁演武中庭】再战。',
                'warn',
                '金刀寿宴',
              ),
            ],
          },
        ],
      },
      {
        id: 'sls08_fight_gauntlet',
        label: '【车轮死战护宴】以一敌三车轮连战【冷袖鬼】【青竹蛇】与【毒针影（二流上品）】',
        subLabel: '失察遇袭 · 车轮连战两名关西死士与全盛毒针影',
        tone: 'danger',
        condition: { type: 'flag', flag: 'sl_s08_assassin_spotted', op: 'falsy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildAssassinMinion1() },
            extraOpponents: [
              { kind: 'custom', npc: buildAssassinMinion2() },
              { kind: 'custom', npc: buildPoisonNeedleShadow() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '王家满堂宾客就在身后，一步不可后退！',
            introText:
              '【洛阳暗箭 · 车轮护宴】先破两名关西死士，再迎暗器首领【毒针影（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls08_06', SHAOLIN_SIDE08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '毒镖密集一时受挫，幸得虚净、虚慧掷出石锁援护脱身！重整气息后可于【金刀石锁演武中庭】再战三刺客。',
                'warn',
                '金刀寿宴',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls08_06: {
    id: 'scene_sls08_06',
    title: '第六幕 · 破网擒凶 · 肃清余波',
    subtitle: '金刀石锁演武中庭 · 尘埃落定',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s08_assassin_spotted|少了外围死士牵制，毒针影的连环暗器难成合围之势；你借石锁掩护欺身直入其怀，一掌震碎其袖中铜筒机括，将其重重掼倒青石之上！|数十合车轮鏖战过后，你先后放翻冷袖鬼与青竹蛇，终迎着漫天寒芒欺身震碎毒针影袖中铜筒机括，将三名关西刺客尽数制伏于青石板上！}'),
      S(SPEAKER_ASSASSIN_BOSS, '（咬牙吐血，满脸不甘）“少林功夫……果然名不虚传……关西暗杀堂今日栽得彻底……”'),
      S('NPC-0737', '（擦去额汗大步奔来）“师兄放心！方才我与虚净搜遍后厨与戏班后台，真正的斟酒老仆与戏班班主都被捆在柴房里，现已安然解救，再无漏网之鱼！”'),
      S('NPC-0186', '（收刀入鞘，望着插满毒箭的紫檀桌面动容抱拳）“若非小师父明察秋毫、舍身挡箭，老夫今日寿宴险成丧宴！来人，将这三个恶贼锁拿看押！小师父，快随老夫移步【金刀威震正气大厅】，今日老夫定要当着洛阳群豪的面敬少林一杯大茶！”'),
    ],
    choices: [
      {
        id: 'sls08_to_hall',
        label: '随王元霸、虚净、虚慧移步【金刀威震正气大厅】',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE08_QUEST_ID, 'hall_alliance_toast'),
          toast(
            '刺客悉数伏法！请前往【金刀王家大宅 · 金刀威震正气大厅（ly_jd_hall）】赴答谢之宴。',
            'success',
            '金刀寿宴',
          ),
        ],
      },
    ],
  },

  scene_sls08_07: {
    id: 'scene_sls08_07',
    title: '第七幕 · 正气举盏 · 结盟辞令',
    subtitle: '金刀王家大宅 · 金刀威震正气大厅',
    illustrationUrl: '/assets/quests/sl_s08_alliance_toast.jpg',
    illustrationCaption: '铁血盟谊 · 正气大厅以茶代酒，少林与洛阳金刀王家缔结守望之盟',
    mandatory: true,
    beats: [
      N('金刀威震正气大厅内灯火辉煌，重整的寿宴气氛更胜先前。王元霸执意邀你坐于首席上座，以清茶代烈酒，高举白玉盏向满堂洛阳豪杰朗声宣告少林护寿大义。'),
      S('NPC-0186', '“诸位英雄见证！今日少林内门高足救老夫于暗箭之下、护满堂宾客于危难之中！自今日起，洛阳金刀王家与嵩山少林寺便是休戚与共的铁血盟友——凡少林有所需，王家倾尽家资人手，万死不辞！”'),
      N('满堂群豪轰然起身拱手，无数道敬佩目光齐聚在你身上。此时代表嵩山少林向洛阳武林致答谢盟辞，你意欲如何定调？'),
    ],
    choices: [
      {
        id: 'sls08_rhetoric_mercy',
        label: '【佛门济世 · 护商安民】愿与金刀王家结为护法盟友，共保河洛商道畅通、黎民安居乐业！',
        subLabel: '弘扬佛门慈悲护法之道（禅心慈悲 +1，额外大增王元霸好感与侠义）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_rhetoric', value: 'mercy' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s08_rhetoric_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s08_rhetoric_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls08_08', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'sls08_rhetoric_awe',
        label: '【立威河洛 · 震慑绿林】明告洛阳绿林宵小：凡敢暗算正道盟友者，嵩山铁棍必诛不贷！',
        subLabel: '借破刺之威震慑四方绿林（怒目杀业 +1，额外大增江湖声望）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_rhetoric', value: 'awe' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s08_rhetoric_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s08_rhetoric_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls08_08', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls08_08: {
    id: 'scene_sls08_08',
    title: '第八幕 · 群豪击节 · 暗堂余讯',
    subtitle: '金刀威震正气大厅 · 席间密议',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s08_rhetoric=mercy|你一番济世护商、安民息争的佛门正论出口，满堂镖师商贾无不动容喝彩，王元霸更是抚须大笑，直赞少林气象宏大、不愧中原正道魁首！|你一番金刚立威的凛然宣言落地，厅内几名素日心怀叵测的绿林客顿时面色发白、忙不迭举盏称颂，洛阳城中少林威名登时再添三分凛冽！}'),
      N('宴罢宾客渐散，王元霸留你与虚净、虚慧于屏风后细语，取出从毒针影怀中搜得的一枚关西黑铁杀手令。'),
      S('NPC-0186', '“小师父，这关西暗杀堂拿钱办事，背后买主恐仍在潼关以西蠢蠢欲动。老夫打算明日处置这三名贼人，不知少林意下如何？”'),
    ],
    choices: [
      {
        id: 'sls08_after_yamen',
        label: '【移交洛阳府衙明正典刑】请官府张榜昭告其罪，以国法震慑关西匪类，免生江湖私仇',
        subLabel: '循法而行，以正道声威止戈',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_followup', value: 'yamen' },
          openScene('scene_sls08_09', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
      {
        id: 'sls08_after_trace',
        label: '【借王家镖路暗查关西黑线】先由洛阳留守司收押，同时托金刀镖局暗中摸清关西暗杀堂巢穴',
        subLabel: '运筹深远，防患未然',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s08_followup', value: 'trace' },
          openScene('scene_sls08_09', SHAOLIN_SIDE08_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls08_09: {
    id: 'scene_sls08_09',
    title: '第九幕 · 厚礼铁盟 · 卷终嘉奖',
    subtitle: '金刀威震正气大厅',
    mandatory: true,
    beats: [
      S('NPC-0186', '{ifFlagEq:sl_s08_followup=yamen|“好！就按小师父说的办，明晨便连人带证送交洛阳府衙明正典刑，叫天下人看看暗算正道的下场！”|“小师父思虑深远！老夫明日便修书潼关与长安分号，替少林盯死关西暗杀堂一举一动！”}'),
      S('NPC-0186', '（亲手奉上一匣百二十两雪花纹银）“小师父切莫推辞！这百二十两纹银非是俗礼，乃老夫捐助嵩山少林与师父游历江湖、行侠济贫的香火盘缠，日后但凡来洛阳，金刀王家的大门永远为你敞开！”'),
      P('（合十郑重接过，微笑还礼）“多谢王老爷子厚爱！愿金刀王家与嵩山少林情谊长存，共护河洛平安！”'),
    ],
    choices: [
      {
        id: 'sls08_complete',
        label: '以茶代酒缔结铁血盟谊，收下王家厚礼与宗门嘉奖！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 360, reason: '洛阳金刀寿宴护寿破敌、力挫关西暗器杀手' },
          { type: 'addSectContribution', amount: 140 },
          { type: 'giveSilver', amount: 120, reason: '金刀王元霸重谢护寿纹银' },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0186' }, delta: 20 },
          { type: 'modifyRenown', delta: 35, reason: '完成门派差事《金刀寿宴 · 洛阳暗箭》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s08_assassin_spotted', op: 'truthy' },
            thenEffects: [
              { type: 'addArtExp', amount: 60 },
              { type: 'modifySkill', key: '辩才', delta: 1 },
            ],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s08_rhetoric', op: 'eq', value: 'mercy' },
            thenEffects: [
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0186' }, delta: 12 },
              { type: 'modifyChivalry', delta: 15, reason: '以佛门济世护商之名缔结河洛护法盟谊' },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 20, reason: '借寿宴擒凶立下洛阳绿林震慑之威' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE08_QUEST_ID, outcome: 'completed' },
          toast(
            '【金刀寿宴 · 洛阳暗箭】圆满完结！王元霸好感大增，获纹银 120 两、宗门贡献 140 与策论精进！',
            'success',
            '金刀寿宴',
          ),
        ],
      },
    ],
  },
}
