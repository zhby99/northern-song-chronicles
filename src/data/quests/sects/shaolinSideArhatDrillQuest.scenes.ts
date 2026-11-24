import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE11_QUEST_ID } from './shaolinSideArhatDrillQuest'

const SPEAKER_HAMMER_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁锤霸',
  title: '嵩山绿林狂徒首领',
  factionName: '嵩山绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_BRUTE_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '独眼狼',
  title: '绿林狂徒',
  factionName: '嵩山绿林',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildIronHammerTyrant(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_HAMMER_TYRANT',
    name: '铁锤霸',
    title: '嵩山绿林狂徒 · 铁锤霸',
    realm: '二流上品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林狂徒',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“哈哈哈哈！什么天下第一少林罗汉阵，不过一群拿齐眉棍的娃娃兵！吃老子百斤镔铁双锤，砸烂你们这块招牌！”',
    stats: { hp: 1780, mp: 1420, agi: 51, res: 44 },
    talents: { bone: 74, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-152', move2: 'MA-124' },
    learnedArts: [
      { artId: 'MA-140', level: 6 },
      { artId: 'MA-152', level: 6 },
      { artId: 'MA-124', level: 6 },
    ],
  })
}

function buildIronHammerTyrantLocked(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_HAMMER_TYRANT_LOCKED',
    name: '铁锤霸',
    title: '孤立无援的绿林狂徒 · 铁锤霸',
    realm: '二流上品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林狂徒',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“可恶！那群小秃驴竟然用棍阵把我两个兄弟死死缠住了！小子，老子单凭这双百斤铁锤也能砸扁你！”',
    stats: { hp: 1520, mp: 1220, agi: 47, res: 38 },
    talents: { bone: 74, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-152', move2: 'MA-124' },
    learnedArts: [
      { artId: 'MA-140', level: 5 },
      { artId: 'MA-152', level: 5 },
      { artId: 'MA-124', level: 5 },
    ],
  })
}

function buildBruteMinion1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_BRUTE_1',
    name: '独眼狼',
    title: '嵩山绿林狂徒',
    realm: '二流下品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“大哥砸正面，兄弟们拆了这破罗汉阵的两翼！”',
    stats: { hp: 1020, mp: 760, agi: 43, res: 28 },
    talents: { bone: 58, comprehension: 40, charm: 22 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-236' },
    learnedArts: [
      { artId: 'MA-140', level: 4 },
      { artId: 'MA-131', level: 4 },
      { artId: 'MA-236', level: 4 },
    ],
  })
}

function buildBruteMinion2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS11_BRUTE_2',
    name: '黑熊精',
    title: '嵩山绿林狂徒',
    realm: '二流下品',
    factionName: '嵩山绿林',
    sectRank: 0,
    sectRankLabel: '绿林悍匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“谁敢挡铁锤大哥的路，一棒子扫断他腿骨！”',
    stats: { hp: 1060, mp: 740, agi: 41, res: 30 },
    talents: { bone: 60, comprehension: 38, charm: 20 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-152', move2: 'MA-236' },
    learnedArts: [
      { artId: 'MA-140', level: 4 },
      { artId: 'MA-152', level: 4 },
      { artId: 'MA-236', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls11_01: {
    id: 'scene_sls11_01',
    title: '第一幕 · 顽徒难驯 · 阵理之托',
    subtitle: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}秋风掠过少室山，十八铜人罗汉堂演武正殿内喝声震天却乱作一团。几个外门顽徒正偷偷靠在红漆大柱后打盹，坪心的虚胜与虚觉则舞着齐眉棍互相抢位、险些绊倒自己，罗汉堂慧字辈首徒慧轮立于阶前看得直摇头。'),
      S('NPC-0769', '（收棍叉腰，满脸不服气）“虚觉，你步子慢了半拍挡着我出棍了！要我说，练这劳什子小罗汉阵还不如咱们各自凭真本事单打独斗来得痛快！”'),
      S('NPC-0861', '（同样梗着脖子回嘴）“分明是你自己贪功冒进抢出阵眼！还有廊下那两个，站桩都能睡着，这阵还怎么排？”'),
      S('NPC-0254', '（见你步入正殿，眸光一亮招手唤你近前）“师弟来得正好！这帮顽徒筋骨俱佳却血气方刚、偷懒散漫，排了半个月『小罗汉阵』还是散沙一盘。我知师弟通晓兵法策论，可愿替我出任半日教习，好好磨一磨他们的性子？”'),
    ],
    onFinishEffects: [openScene('scene_sls11_02', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_02: {
    id: 'scene_sls11_02',
    title: '第二幕 · 立约督阵 · 整肃坪心',
    subtitle: '罗汉堂演武正殿 · 演武坪',
    mandatory: true,
    beats: [
      P('（合十含笑，目光扫过坪上交头接耳的外门顽徒）“治军如布阵，顽铁须经淬炼方成利器。弟子愿助慧轮师兄督导这回小罗汉阵试炼！”'),
      N('你大步踏上演武坪心，廊下打盹的两名沙弥吓得慌忙爬起抓棍。虚胜抱臂斜睨着你，显是想瞧瞧你这位内门教习有何本事镇住全场。'),
      S('NPC-0769', '（将信将疑，抱拳道）“师兄既要当咱们的教习，总得先叫兄弟们心服口服——单打独斗痛快利落，这小罗汉阵真有那么神效么？”'),
    ],
    choices: [
      {
        id: 'sls11_wager_demo',
        label: '【徒手示阵 · 借力化棍】叫虚胜、虚觉齐攻三招，以阵眼错步轻松化开双棍先立威信',
        subLabel: '承接支线【罗汉涂金 · 顽徒试炼】，留驻罗汉堂演武正殿操演',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_wager', value: 'demo' },
          { type: 'startQuest', questId: SHAOLIN_SIDE11_QUEST_ID, stepId: 'drill_and_defend' },
          setStep(SHAOLIN_SIDE11_QUEST_ID, 'drill_and_defend'),
          toast(
            '已接下罗汉堂督阵之责！请在【罗汉堂演武正殿（sl_luohan_main）】调教顽徒合练。',
            'talk',
            '罗汉涂金',
          ),
        ],
      },
      {
        id: 'sls11_wager_talk',
        label: '【以策服众 · 阵前立约】直陈“三流合阵可困二流悍匪”之兵理，与众顽徒击掌为约',
        subLabel: '承接支线【罗汉涂金 · 顽徒试炼】，留驻罗汉堂演武正殿操演',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_wager', value: 'talk' },
          { type: 'startQuest', questId: SHAOLIN_SIDE11_QUEST_ID, stepId: 'drill_and_defend' },
          setStep(SHAOLIN_SIDE11_QUEST_ID, 'drill_and_defend'),
          toast(
            '已与众顽徒立下操练之约！请在【罗汉堂演武正殿（sl_luohan_main）】调教顽徒合练。',
            'talk',
            '罗汉涂金',
          ),
        ],
      },
    ],
  },

  scene_sls11_03: {
    id: 'scene_sls11_03',
    title: '第三幕 · 顽徒操演 · 教习抉择',
    subtitle: '罗汉堂演武正殿 · 演武坪',
    illustrationUrl: '/assets/quests/sl_s11_mini_arhat.jpg',
    illustrationCaption: '小罗汉阵 · 督导虚胜、虚觉等六僧踏位合棍，初成金汤阵势',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s11_wager=demo|方才你徒手错步化开虚胜与虚觉双棍，众人虽暂收起轻视之心，真排起阵来却依旧毛躁；|众人虽嘴上应了兵法之约，真演练起枯燥的六合步法，没过半柱香便又开始叫苦连天；}两名贪睡外门僧脚步拖沓，虚胜又嫌阵势拘束频频抢步出头，整座小罗汉阵眼看又要散架！'),
      S('NPC-0861', '（抹着汗喘气）“师兄，这『进二退一、左护右掣』的口诀实在绕口，咱们记着棍招便忘了步位，记着步位又忘了补空门……”'),
      N('日头渐高，演武坪上浮躁之气弥漫。身为今日罗汉堂教习，你该如何调教这群顽劣却不乏血性的年轻武僧？'),
    ],
    choices: [
      {
        id: 'sls11_teach_chess',
        label: '【因材施教 · 寓阵于弈】在青砖划出黑白棋坪，以棋子劫争拆解六合阵位，激起顽徒好胜心！',
        subLabel: '需棋 ≥ 30 或经义 ≥ 50 · 顽徒士气大振，临战牵制外围喽啰跳过杂兵战！（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '棋', min: 30 },
            { type: 'skillAtLeast', key: '经义', min: 50 },
          ],
          hint: '需十艺【棋】≥ 30 或【经义】≥ 50',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s11_novices_ready', value: true },
          { type: 'setFlag', flag: 'sl_s11_teach_style', value: 'chess' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s11_teach_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s11_teach_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_sls11_04', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
      {
        id: 'sls11_teach_strict',
        label: '【铁律严训 · 戒尺加桩】手持红木戒尺严明堂规，但有错步偷懒者全队加扎马步半炷香！',
        subLabel: '零门槛教习立威 · 临战须独挑大梁车轮连破闯山三狂徒（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_novices_ready', value: false },
          { type: 'setFlag', flag: 'sl_s11_teach_style', value: 'strict' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s11_teach_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s11_teach_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls11_04', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls11_04: {
    id: 'scene_sls11_04',
    title: '第四幕 · 奇正初成 · 狂徒闯山',
    subtitle: '罗汉堂演武正殿外 · 山门骚动',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s11_novices_ready|你取来白灰在青石地上画出纵横棋路，以“虚胜为先锋劫材、虚觉为后应眼位、四隅为连片铁壁”把小罗汉阵讲得活灵活现！众顽徒顿时眼中放光，争相演练抢步补位，不过一个时辰，六根白蜡棍挥舞如林，士气如虹！|你红木戒尺拍得啪啪作响，错一步罚扎马步、慢半拍重来十遍！顽徒们虽个个累得双腿打颤、大气不敢喘，却也硬生生记牢了基本步位，再不敢有半点懈怠。}'),
      N('恰在此时，山门方向骤然传来一阵轰然巨响，宛如铁塔砸碎石狮底座！紧接着三道嚣张狂笑震彻山谷，三名满脸横肉的嵩山绿林悍匪竟推倒知客沙弥、大摇大摆闯入罗汉堂外院！'),
      N('为首悍匪身高近九尺，黑毛虬结的双臂各提一柄重逾五十斤的八棱镔铁大锤，正是近来四处踢馆扬名的绿林狂徒【铁锤霸】；身后紧跟着持刀的【独眼狼】与扛铁棒的【黑熊精】。'),
      S(SPEAKER_HAMMER_BOSS, '（双锤轰然一碰火星四溅，声如破锣）“少林秃驴听着！江湖都吹你们十八铜人罗汉堂天下无双，老子铁锤霸今日特来讨教——接不住这双百斤铁锤，趁早把罗汉堂匾额摘了当柴烧！”'),
      S('NPC-0254', '（按兵不动，含笑对你颔首）“师弟，这三个狂徒正好拿来作一块试金石！我替你护住大殿佛像，如何迎敌，全凭你这位罗汉教习调遣！”'),
    ],
    onFinishEffects: [openScene('scene_sls11_05', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_05: {
    id: 'scene_sls11_05',
    title: '第五幕 · 阵锁狂澜 · 临阵号令',
    subtitle: '罗汉堂演武正殿 · 坪心对峙',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s11_novices_ready|虚胜与虚觉听得狂徒辱及少林门楣，不仅丝毫不乱，反而按你方才所授棋局阵位齐喝一声，六根齐眉棍如铁闸合拢，硬生生将跃跃欲试的独眼狼与黑熊精隔断在阵外两翼！|顽徒们方经严训两腿犹酸，虽咬牙挺棍护住受伤知客沙弥与大殿门阶，一时却难以合阵困死外围两匪。你沉步向前，独自拦下三名狞笑逼近的绿林悍匪！}'),
      S(SPEAKER_BRUTE_A, '{ifFlag:sl_s11_novices_ready|（被虚胜、虚觉六棍缠得脱身不得，气急败坏）“大哥！这群小和尚步法怪得很，兄弟们一时冲不过去！”|（挥刀指向你，嗤笑连连）“大哥瞧瞧，这小和尚还想一个人挑咱们哥仨呢！兄弟们，轮流上去砸烂他的筋骨！”}'),
      N('铁锤霸双目圆睁，百斤镔铁双锤挟着撕裂空气的恶风轰然压近！临战一瞬间，你向坪心发出总攻号令——'),
    ],
    choices: [
      {
        id: 'sls11_cmd_deflect',
        label: '【传令卸力化刚】喝令众僧护稳两翼莫贪功，自己脚踏罗汉桩先泄其百斤双锤头阵狂势！',
        subLabel: '沉稳布势，准备迎战闯山狂徒',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_cmd', value: 'deflect' },
          { type: 'setFlag', flag: 'sl_side11_hammer_ready', value: true },
          openScene('scene_sls11_06', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
      {
        id: 'sls11_cmd_charge',
        label: '【直抢中宫震胆】不待铁锤霸蓄足蛮力，亲出阵眼抢步进击先折其锐气！',
        subLabel: '凌厉抢攻，准备迎战闯山狂徒',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_cmd', value: 'charge' },
          { type: 'setFlag', flag: 'sl_side11_hammer_ready', value: true },
          openScene('scene_sls11_06', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls11_06: {
    id: 'scene_sls11_06',
    title: '第六幕 · 阵眼破锤 · 演武决战',
    subtitle: '罗汉堂演武正殿 · 激战铁锤霸',
    mandatory: true,
    beats: [
      S(SPEAKER_HAMMER_BOSS, '“好小子，原来你才是这罗汉堂的教习头领！来来来，看你这副身板接不接得住老子一记泰山压顶！”'),
      N('{ifFlag:sl_s11_novices_ready|六名顽徒士气如虹，已用小罗汉阵将独眼狼与黑熊精死死牵制在两翼！你亲出阵眼，1v1 直破孤立无援的二流上品悍匪铁锤霸！|你令累乏的顽徒守住受伤同门，自己独挑大梁立于坪心，迎战独眼狼、黑熊精与铁锤霸三狂徒车轮恶斗！}'),
    ],
    choices: [
      {
        id: 'sls11_fight_boss_only',
        label: '【乘阵单破铁锤霸】顽徒已牵制两翼喽啰，1v1 亲出阵眼力破【铁锤霸（二流上品）】',
        subLabel: '寓阵于弈士气如虹 · 跳过两名外围喽啰，单挑孤立无援的铁锤霸',
        tone: 'jade',
        condition: { type: 'flag', flag: 'sl_s11_novices_ready', op: 'truthy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildIronHammerTyrantLocked() },
            rule: 'story_trial',
            forbidEscapeReason: '少林罗汉堂正殿之前，岂容绿林狂徒嚣张践踏！',
            introText:
              '【罗汉涂金 · 众志成阵】顽徒已锁住外围喽啰，1v1 阵眼直破【铁锤霸（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls11_07', SHAOLIN_SIDE11_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '双铁锤势大力沉一时受挫！虚胜与虚觉急忙合棍补位掩护，重整阵势后可于【罗汉堂演武正殿】再战狂徒。',
                'warn',
                '罗汉涂金',
              ),
            ],
          },
        ],
      },
      {
        id: 'sls11_fight_gauntlet',
        label: '【独挑大梁车轮破匪】依次迎战【独眼狼】【黑熊精】与【铁锤霸（二流上品）】',
        subLabel: '铁律严训独当一面 · 车轮连战三名嵩山绿林狂徒',
        tone: 'danger',
        condition: { type: 'flag', flag: 'sl_s11_novices_ready', op: 'falsy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBruteMinion1() },
            extraOpponents: [
              { kind: 'custom', npc: buildBruteMinion2() },
              { kind: 'custom', npc: buildIronHammerTyrant() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '少林罗汉堂正殿之前，岂容绿林狂徒嚣张践踏！',
            introText:
              '【罗汉涂金 · 车轮破匪】独挑大梁，先破独眼狼、黑熊精，再迎【铁锤霸（二流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls11_07', SHAOLIN_SIDE11_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '双铁锤势大力沉一时受挫！慧轮出手震退狂徒掩护调息，重整气息后可于【罗汉堂演武正殿】再战狂徒。',
                'warn',
                '罗汉涂金',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls11_07: {
    id: 'scene_sls11_07',
    title: '第七幕 · 震锤折锋 · 顽徒折服',
    subtitle: '罗汉堂演武正殿 · 演武坪',
    illustrationUrl: '/assets/quests/sl_s11_hammer_defeat.jpg',
    illustrationCaption: '阵眼破狂徒 · 巧借小罗汉阵合围之势，一举震飞百斤铁锤重创狂徒',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s11_cmd=deflect|你脚踏罗汉桩稳如泰山，顺着百斤双锤下坠狂势侧身沾粘借力，一掌切入其双肘空门！|你步走中宫抢在铁锤霸二次蓄力之前突入怀中，澎湃的少林正宗阳刚劲透臂而出！}只听“当啷”两声巨响，百斤镔铁双锤脱手飞出两丈深深砸入青石板，铁锤霸惨哼一声跪倒在地！'),
      S(SPEAKER_HAMMER_BOSS, '（捂着发麻的双臂脸色惨白，再无半分狂气）“好深厚的少林内功……好厉害的罗汉堂……俺铁锤霸认栽了！”'),
      N('独眼狼与黑熊精亦早已抱头鼠窜、被罗汉堂武僧卸去兵刃押送登封官府。演武坪短暂寂静后，虚胜、虚觉与其余四名外门顽徒齐齐收棍单膝跪地，向你诚心合十！'),
      S('NPC-0769', '{ifFlag:sl_s11_novices_ready|（满面羞愧继而亢奋万分）“师兄那套棋局阵法真是神了！方才我和虚觉六人合棍，竟然真把两个绿林悍匪死死困住！往后再也不敢小看小罗汉阵了！”|（满面羞愧、低头认错）“师兄今日为护咱们独力车轮连破三名狂徒，弟子先前偷懒骄躁实在羞愧无地！从今往后定收起浮气，老老实实苦练罗汉阵法！”}'),
    ],
    onFinishEffects: [openScene('scene_sls11_08', SHAOLIN_SIDE11_QUEST_ID)],
  },

  scene_sls11_08: {
    id: 'scene_sls11_08',
    title: '第八幕 · 涂金成器 · 奖惩抉择',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0254', '（大步走下石阶，朗笑抚掌）“好一个『罗汉涂金』！顽铁经千锤百炼方成利器，顽徒经此一战方知法度。师弟临阵布势、以策统武的气度，令我罗汉堂上下刮目相看！”'),
      S('NPC-0861', '（揉着发酸的胳膊偷瞄你一眼，小声嘀咕）“那个……教习师兄，今日咱们好歹也守住了罗汉堂匾额，不知晚课可否……”'),
      N('六名顽徒眼巴巴望着你，慧轮则含笑退后半步，将战后奖惩之权全权交由你这位今日教习定夺——'),
    ],
    choices: [
      {
        id: 'sls11_after_feast',
        label: '【大加夸赞 · 破例加餐素斋】赞其临危不惧，特请香积厨破例添一席罗汉斋犒赏众顽徒！',
        subLabel: '宽厚爱徒、鼓舞士气（禅心慈悲 +1，额外增侠义与同门好感）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_after', value: 'feast' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s11_after_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s11_after_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_sls11_09', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
      {
        id: 'sls11_after_drill',
        label: '【戒骄戒躁 · 次日加练半柱香】嘉许其志却严诫莫生骄矜，命次日卯时仍加练半柱香步法！',
        subLabel: '严师出高徒、杜绝骄气（怒目杀业 +1，额外增宗门贡献与江湖声望）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s11_after', value: 'drill' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s11_after_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s11_after_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_sls11_09', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls11_09: {
    id: 'scene_sls11_09',
    title: '第九幕 · 功成罗汉 · 卷终嘉奖',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s11_after=feast|众顽徒闻言欢呼雀跃，虚胜与虚觉更是拍着胸脯保证明日绝不迟到偷懒！慧轮含笑点头，赞你深得“张弛有度、以德服人”之道。|众顽徒闻言虽苦了脸，却无一人敢再顶嘴，齐齐抱拳高声应诺“谨遵师兄教诲”！慧轮朗声大笑，赞你治堂严谨、深得达摩铁律遗风。}'),
      S('NPC-0254', '“此事我必禀明达摩院与方丈玄慈大师，替师弟记上罗汉堂头等督训与护山大功！待你日后修为再进一步，少林内门真传之位必有你一席！”'),
      P('（合十稽首）“独木难支大厦，众志方成金城。多谢慧轮师兄提携，弟子定当勤修不辍！”'),
    ],
    choices: [
      {
        id: 'sls11_complete',
        label: '收阵归礼，领受罗汉堂重赏与兵法阵理体悟！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 380, reason: '亲出小罗汉阵阵眼重创嵩山绿林狂徒铁锤霸' },
          { type: 'addSectContribution', amount: 150 },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'addArtExp', amount: 100 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 12 },
          { type: 'modifyRenown', delta: 40, reason: '完成门派差事《罗汉涂金 · 顽徒试炼》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s11_novices_ready', op: 'truthy' },
            thenEffects: [
              { type: 'modifySkill', key: '棋', delta: 1 },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0769' }, delta: 15 },
            ],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s11_after', op: 'eq', value: 'feast' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 15, reason: '宽厚犒赏演武护寺顽徒' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 6 },
            ],
            elseEffects: [
              { type: 'addSectContribution', amount: 30 },
              { type: 'modifyRenown', delta: 10, reason: '严明罗汉堂教习法度' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE11_QUEST_ID, outcome: 'completed' },
          toast(
            '【罗汉涂金 · 顽徒试炼】圆满完结！策论 +2、武学阅历 +100、宗门贡献 +150，慧轮对你大为赞赏！',
            'success',
            '罗汉涂金',
          ),
        ],
      },
    ],
  },
}
