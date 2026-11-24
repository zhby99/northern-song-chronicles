import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q19_QUEST_ID } from './shaolinLaymanPutianSouthQuest'

const SPEAKER_NSL_MONK_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒铁武僧',
  title: '九莲山门护法首座',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_NSL_MONK_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒磐武僧',
  title: '九莲山门铁桥护法',
  factionName: '莆田南少林',
  portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
}

const SPEAKER_SALT_WATCH: StorySpeakerSpec = {
  kind: 'custom',
  name: '老灶户 · 林阿伯',
  title: '莆田官盐场报信人',
  factionName: '福建路百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_ONIMARU: StorySpeakerSpec = {
  kind: 'custom',
  name: '鬼丸浪人',
  title: '东瀛海寇头目',
  factionName: '东瀛海寇',
  portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
}

const SPEAKER_PIRATE_MATE: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑潮刀客 · 佐助',
  title: '东瀛海寇副首',
  factionName: '东瀛海寇',
  portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
}

function buildNslMonkA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_NSL_A',
    name: '戒铁武僧',
    title: '九莲山门护法首座',
    realm: '二流中品',
    factionName: '莆田南少林',
    sectRank: 2,
    sectRankLabel: '南宗护法',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“既携嵩山法帖而来，便请接贫僧一式南宗『铁桥硬马』！若连山门三关都过不去，休怪贫僧不放行！”',
    stats: { hp: 1560, mp: 1120, agi: 47, res: 35 },
    talents: { bone: 68, comprehension: 48, charm: 34 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-144', move2: 'MA-143' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-144', level: 6 }, { artId: 'MA-143', level: 5 }],
  })
}

function buildNslMonkB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_NSL_B',
    name: '戒磐武僧',
    title: '九莲山门铁桥护法',
    realm: '二流下品',
    factionName: '莆田南少林',
    sectRank: 2,
    sectRankLabel: '南宗护法',
    avatarUrl: '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg',
    talk: '“阿弥陀佛！北宗师兄留神了，南拳短打贴身最重桥手沉劲！”',
    stats: { hp: 1280, mp: 880, agi: 44, res: 30 },
    talents: { bone: 64, comprehension: 44, charm: 30 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-144', move2: 'MA-124' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-144', level: 5 }, { artId: 'MA-124', level: 5 }],
  })
}

function buildPirateVanguardA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_PIRATE_A',
    name: '浪人斩首手 · 平次',
    title: '东瀛海寇先锋',
    realm: '二流下品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇先锋',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“八嘎！宋朝和尚敢坏我海船劫盐大计，统统斩了！”',
    stats: { hp: 1260, mp: 860, agi: 46, res: 27 },
    talents: { bone: 60, comprehension: 44, charm: 24 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-131', move2: 'MA-150' },
    learnedArts: [{ artId: 'MA-121', level: 5 }, { artId: 'MA-131', level: 5 }, { artId: 'MA-150', level: 5 }],
  })
}

function buildPirateVanguardB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_PIRATE_B',
    name: '黑潮短刀手 · 彦三',
    title: '东瀛海寇先锋',
    realm: '二流下品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇先锋',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“盐堆点着了！把这几个冲过来的宋人乱刀分尸！”',
    stats: { hp: 1200, mp: 840, agi: 47, res: 26 },
    talents: { bone: 58, comprehension: 46, charm: 22 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-131', move2: 'MA-132' },
    learnedArts: [{ artId: 'MA-121', level: 5 }, { artId: 'MA-131', level: 5 }, { artId: 'MA-132', level: 5 }],
  })
}

function buildOnimaruBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_ONIMARU',
    name: '鬼丸浪人',
    title: '东瀛海寇头目',
    realm: '二流上品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇头目',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“哈哈哈哈！什么北少林南少林，在我『鬼丸流』快刀之下不过是一群秃头木桩！受死吧！”',
    stats: { hp: 1960, mp: 1520, agi: 55, res: 40 },
    talents: { bone: 70, comprehension: 58, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-131', move2: 'MA-132' },
    learnedArts: [{ artId: 'MA-140', level: 7 }, { artId: 'MA-131', level: 7 }, { artId: 'MA-132', level: 6 }],
  })
}

function buildPirateMate(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ19_PIRATE_MATE',
    name: '黑潮刀客 · 佐助',
    title: '东瀛海寇副首',
    realm: '二流中品',
    factionName: '东瀛海寇',
    sectRank: 0,
    sectRankLabel: '海寇副首',
    avatarUrl: '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_ronin_pirate_fb.jpg',
    talk: '“头目莫急，在下断他下盘，叫这宋人武夫插翅难逃！”',
    stats: { hp: 1480, mp: 1080, agi: 49, res: 33 },
    talents: { bone: 64, comprehension: 50, charm: 26 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-132', move2: 'MA-150' },
    learnedArts: [{ artId: 'MA-121', level: 6 }, { artId: 'MA-132', level: 6 }, { artId: 'MA-150', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq19_01: {
    id: 'scene_slq19_01',
    title: '第一幕 · 法帖授爪',
    subtitle: '嵩山少林寺 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，嵩山松涛阵阵。你历相国寺与洛阳龙门两番大历练——{ifFlag:sl_q18_mole_caught|洛阳验单擒内鬼、独杵退西夏百夫长的智勇之名已传遍少室山|龙门石桥独杵力拒西夏游骑的威名已传遍少室山}。这日戒律院「铁掌禅师」【玄痛】独召你至木桩廊前，案上置着一只加盖方丈宝印的紫檀法帖盒。'),
      S('NPC-0156', '（展开金粉楷书《南北禅武同源法帖》一角，神色郑重）“唐初少林禅武南传福建路莆田九莲山，开宗【莆田南少林】，然数百年来山川阻隔、武风渐异，两宗久未正式通使。今东南海寇猖獗，方丈特书此帖，遣你以俗家护法之身千里南渡，拜会南少林第一高僧——『铜身罗汉』【元苦】大师！”'),
      S('NPC-0156', '（忽探右掌如钢钩扣入身旁碗口粗铁木桩，轻轻一旋便留下五道半寸深痕）“元苦大师最重筋骨实功，南宗弟子个个横练铁桥硬马。行前老衲便破例传你北宗地阶擒拿绝学——《龙爪手》！三十六式专指筋脉关节破绽，刚柔并济、专克横练硬功！”'),
      N('你依着玄痛长老指点演练《龙爪手》起手七式，顿觉指梢内劲吞吐灵动。玄痛将紫檀法帖盒交入你手，沉声相问：“你携嵩山法帖赴九莲山，面对隔绝数百年的南少林同门，意欲如何破冰通好？”'),
    ],
    choices: [
      {
        id: 'slq19_envoy_zen',
        label: '【以禅通心 · 谦和释嫌】南北本同出达摩一脉，当以经义大度化解门户芥蒂！（禅心慈悲 +1）',
        subLabel: '习得《龙爪手》，怀揣嵩山法帖千里南渡莆田九莲山',
        tone: 'jade',
        effects: [
          teachArtNow('MA-062'),
          { type: 'startQuest', questId: SHAOLIN_Q19_QUEST_ID, stepId: 'jiulian_three_gates' },
          { type: 'setFlag', flag: 'sl_q19_envoy_mind', value: 'zen' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          setStep(SHAOLIN_Q19_QUEST_ID, 'jiulian_three_gates'),
          toast('已开启《莆田南渡 · 南北少林》并习得《龙爪手》！请前往【莆田南少林 · 九莲山门演武坪】拜山！', 'talk', '莆田南渡'),
        ],
      },
      {
        id: 'slq19_envoy_martial',
        label: '【以武证道 · 实功服众】南宗向来重实打实的筋骨功夫，便以北宗龙爪手赢取平等敬重！（怒目杀业 +1）',
        subLabel: '习得《龙爪手》，怀揣嵩山法帖千里南渡莆田九莲山',
        tone: 'gold',
        effects: [
          teachArtNow('MA-062'),
          { type: 'startQuest', questId: SHAOLIN_Q19_QUEST_ID, stepId: 'jiulian_three_gates' },
          { type: 'setFlag', flag: 'sl_q19_envoy_mind', value: 'martial' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          setStep(SHAOLIN_Q19_QUEST_ID, 'jiulian_three_gates'),
          toast('已开启《莆田南渡 · 南北少林》并习得《龙爪手》！请前往【莆田南少林 · 九莲山门演武坪】拜山！', 'talk', '莆田南渡'),
        ],
      },
    ],
  },

  scene_slq19_02: {
    id: 'scene_slq19_02',
    title: '第二幕 · 九莲论武',
    subtitle: '莆田南少林 · 九莲山门演武坪（论武礼数抉择）',
    illustrationUrl: '/assets/quests/sl_19_jiulian_spar.jpg',
    illustrationCaption: '九莲山门演武坪 · 北宗龙爪手对决南宗铁桥硬马，以武会友赢尽敬重',
    mandatory: true,
    beats: [
      N('渡长江、越武夷，月余后终见闽中碧海翠峦，九莲山古刹红墙隐于荔枝林间。山门演武坪上，数十名赤膊铜肤的南少林武僧齐扎四平大马、双臂互撞砰砰如鼓，气势丝毫不逊嵩山罗汉堂！'),
      S(SPEAKER_NSL_MONK_A, '（与戒磐踏步拦阶，打量你一身青布俗家劲装，语气不卑不亢）“阿弥陀佛！来者既未剃度，却捧嵩山紫檀法帖？莫非北少林无人了，竟派带发俗家弟子来见元苦师祖？”'),
      S(SPEAKER_NSL_MONK_B, '（双臂一振响起金铁筋骨爆响，大笑接话）“既说『佛法不择缁素、禅武岂分俗僧』，便须过我九莲山三百年老规矩——『铁桥硬马三关』！前两关验桩试桥你既已踏裂青砖纹丝不动，这第三关，便由俺与戒铁师兄以南宗《铁线拳》与铜身硬桥讨教北宗绝艺！”'),
      N('满坪南少林武僧停拳围观，空气陡然炽烈。你将紫檀法帖盒托予知客沙弥暂捧，五指微曲摆开北宗《龙爪手》起手架势——面对南宗同门以武相试，你定下论武礼数：'),
    ],
    choices: [
      {
        id: 'slq19_spar_humble',
        label: '【禅礼谦让 · 点到为止】先合十行同源禅礼，切磋时收劲留情、唯以擒拿拆招论高下！',
        subLabel: '车轮切磋戒磐与戒铁，点到为止赢得南宗敬服（禅心慈悲 +1 · 结算增元苦好感）',
        tone: 'jade',
        effects: [
          teachArtNow('MA-062'),
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_spar_stance_set', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q19_spar_style', value: 'humble' },
              { type: 'setFlag', flag: 'sl_q19_spar_stance_set', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
            elseEffects: [],
          },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNslMonkB() },
            extraOpponents: [{ kind: 'custom', npc: buildNslMonkA() }],
            rule: 'spar',
            forbidEscapeReason: '身负嵩山法帖拜山，岂可半途退场！',
            introText: '【车轮切磋 · 禅礼试锋】以北宗《龙爪手》点到为止切磋南少林护法【戒磐】与【戒铁】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq19_03', SHAOLIN_Q19_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('南宗铁桥硬马沉猛异常，调匀内息后再登演武坪切磋！', 'warn', '九莲三关'),
            ],
          },
        ],
      },
      {
        id: 'slq19_spar_fierce',
        label: '【刚猛立威 · 全力展艺】既要验嵩山正统气象，便全力施展龙爪手刚劲破桥、一战震服山门！',
        subLabel: '车轮切磋戒磐与戒铁，全力立威显北少林锋芒（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          teachArtNow('MA-062'),
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_spar_stance_set', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q19_spar_style', value: 'fierce' },
              { type: 'setFlag', flag: 'sl_q19_spar_stance_set', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
            elseEffects: [],
          },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNslMonkB() },
            extraOpponents: [{ kind: 'custom', npc: buildNslMonkA() }],
            rule: 'spar',
            forbidEscapeReason: '身负嵩山法帖拜山，岂可半途退场！',
            introText: '【车轮切磋 · 刚猛立威】全力施展《龙爪手》破南少林护法【戒磐】与【戒铁】铁桥硬马！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq19_03', SHAOLIN_Q19_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('南宗铁桥硬马沉猛异常，调匀内息后再登演武坪切磋！', 'warn', '九莲三关'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_03: {
    id: 'scene_slq19_03',
    title: '第三幕 · 盐场告急',
    subtitle: '九莲山门演武坪',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q19_spar_style=humble|二十余合交锋，你一式「捕风式」轻扣戒磐曲池卸去千斤桥力，复以「拿云式」三寸外收掌虚按戒铁肩井而不伤毫厘！戒铁怔愣片刻，心服口服合十长揖：“北宗禅武仁厚兼修，戒铁服了！”|二十余合硬撼，你龙爪手刚猛如苍龙破壁，硬生生扣裂二人铁桥劲势、震得戒铁戒磐连退七步！戒磐揉着发麻双臂哈哈大笑：“痛快！北少林俗家护法果然全是硬骨头！”}'),
      N('迎客钟声尚未敲响，山门石阶下忽踉跄奔上一名衣衫焦黑、浑身血污的老灶户，扑倒青石上凄声哭嚎！'),
      S(SPEAKER_SALT_WATCH, '（涕泪横流）“大师们救命！半个时辰前三艘东瀛海寇快船夜袭兴化海滨官盐场！那叫『鬼丸浪人』的东瀛恶魔刀快如鬼，已经杀伤十余名盐丁，还把百余户老小围在盐仓里要纵火抢盐啊！”'),
      N('话音未落，大雄殿方向一道铜钟佛号响彻山林——双臂古铜如铁、气势渊停岳峙的「铜身罗汉」【元苦】大师大步踏出山门，浓眉倒竖：“海寇屠我闽海百姓，罪不容诛！戒铁、戒磐，即刻在钟鼓禅院演武坪点齐三十名武僧驰援！”'),
      S('NPC-0124', '（听你慨然出列请缨先锋，目光如电深深打量你一眼，朗笑拍案）“好一句『南北同源、保境安民岂分你我』！好一个嵩山侠骨！走，速往钟鼓禅院演武坪会师发兵！”'),
    ],
    choices: [
      {
        id: 'slq19_go_saltfield',
        label: '前往【大雄宝殿 · 钟鼓禅院 · 演武坪】会师，夜援兴化官盐场',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q19_QUEST_ID, 'saltfield_night_raid'),
          toast('九莲三关已破！请前往【大雄宝殿 · 钟鼓禅院 · 演武坪】会师驰援海滨盐场！', 'talk', '莆田南渡'),
        ],
      },
    ],
  },

  scene_slq19_04: {
    id: 'scene_slq19_04',
    title: '第四幕 · 夜袭定策',
    subtitle: '莆田海滨官盐场外围（破寇三策）',
    mandatory: true,
    beats: [
      N('海风咸湿，火光映红半边夜空。你随元苦大师、戒铁、戒磐及三十名南少林武僧疾奔十余里抵兴化官盐场，远远便见雪白盐堆旁横七竖八躺着受伤盐丁，数十名黑衣东瀛浪人正狂笑逼近关押灶户的木盐仓！'),
      N('借高坡矮松掩护细察敌情：外围路口由海寇先锋「平次」「彦三」把守，头目「鬼丸浪人」与副首「佐助」坐镇中央盐场；而滩头恰逢落潮、西北夜风劲吹，三艘海寇快舟正泊于浅水苇荡，盐堆阴影之间亦伏着几名巡夜暗哨。'),
      S('NPC-0124', '（压低嗓音，目含金刚怒火）“戒铁、戒磐带二十名武僧绕后砸锁抢救灶户，老衲镇住官道防贼逃窜！{gender:少侠|女侠}既请缨先锋破阵，眼下潮风地利俱在目前，你欲如何破这海寇杀阵？”'),
    ],
    choices: [
      {
        id: 'slq19_raid_fire',
        label: '【火攻滩舟 · 断敌退路】算准落潮风向，命南宗火工僧先焚滩头海寇小舟惊溃前锋！',
        subLabel: '跳过海寇先锋波次，直面头目【鬼丸浪人】1v1 决战（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【策论】≥ 35 或【算术】≥ 40',
          conditions: [
            { type: 'skillAtLeast', key: '策论', min: 35 },
            { type: 'skillAtLeast', key: '算术', min: 40 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q19_raid_tactic', value: 'fire' },
          { type: 'setFlag', flag: 'sl_q19_vanguard_cleared', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_raid_karma_counted', op: 'falsy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              { type: 'setFlag', flag: 'sl_q19_raid_karma_counted', value: true },
            ],
            elseEffects: [],
          },
          openScene('scene_slq19_05', SHAOLIN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'slq19_raid_stealth',
        label: '【夜色潜行 · 截杀哨兵】凭凌厉轻功借盐堆阴影疾掠连点外围哨兵哑穴，直扑中军擒王！',
        subLabel: '跳过海寇先锋波次，直面头目【鬼丸浪人】1v1 决战',
        tone: 'gold',
        condition: { type: 'combatStatAtLeast', key: 'agility', min: 52 },
        effects: [
          { type: 'setFlag', flag: 'sl_q19_raid_tactic', value: 'stealth' },
          { type: 'setFlag', flag: 'sl_q19_vanguard_cleared', value: true },
          openScene('scene_slq19_06', SHAOLIN_Q19_QUEST_ID),
        ],
      },
      {
        id: 'slq19_raid_frontal',
        label: '【南北合璧 · 正面迎战】何须绕道！与南少林同门正面杀入盐场，连破先锋再斩鬼丸！',
        subLabel: '无门槛正攻：先后车轮连战海寇先锋与鬼丸双贼（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q19_raid_tactic', value: 'frontal' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_raid_karma_counted', op: 'falsy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              { type: 'setFlag', flag: 'sl_q19_raid_karma_counted', value: true },
            ],
            elseEffects: [],
          },
          openScene('scene_slq19_07', SHAOLIN_Q19_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq19_05: {
    id: 'scene_slq19_05',
    title: '第五幕 · 火断贼舟',
    subtitle: '兴化海滨滩头（火攻破敌线）',
    mandatory: true,
    beats: [
      P('（指向苇荡水线与猎猎西北劲风沉声布阵）“海寇敢深入官盐场，全仗滩头三艘快舟退路！如今正逢落潮、海船搁浅半尺且逆风难拔锚，若命火工僧先焚贼舟，前锋必自乱阵脚！”'),
      N('元苦大师双目精光暴闪，当即挥手号令十名南宗火工僧携桐油火箭齐发！呼啸火矢借西北风势骤落滩头，三艘东瀛快舟霎时烈焰腾空，火龙卷着黑烟照彻半片闽海！'),
      N('外围海寇先锋平次、彦三见海上退路化作火海，顿时阵脚大乱、哭喊着狂奔滩头救船，正撞入元苦大师与南宗武僧铁掌包围圈中！连副首佐助亦仓皇带人扑火，盐仓百余灶户趁乱被戒铁安全救出！'),
    ],
    onFinishEffects: [openScene('scene_slq19_08', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_06: {
    id: 'scene_slq19_06',
    title: '第五幕 · 盐影点穴',
    subtitle: '兴化官盐场暗影（潜行截哨线）',
    mandatory: true,
    beats: [
      N('你提气轻纵，青衫如夜枭贴地无声掠过雪白盐山阴影，呼吸之间已绕至外围海寇背后！'),
      N('寒芒未动，你五指连弹《龙爪手》分筋错骨劲，一息连点五名望风哨兵与先锋平次、彦三咽喉哑穴，数名东瀛浪人连半声警哨也未发出便软倒盐堆之后！'),
      N('戒铁、戒磐见信号灯闪动，悄无声息砸开盐仓木锁将百余灶户老小护送高坡，元苦大师则顺势合围截走副首佐助一众残寇——待盐场中央火光摇曳处鬼丸浪人猛然警觉回身，已成孤家寡人！'),
    ],
    onFinishEffects: [openScene('scene_slq19_08', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_07: {
    id: 'scene_slq19_07',
    title: '第五幕 · 血战盐滩',
    subtitle: '兴化官盐场外围（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('你一声清啸与戒铁、戒磐正面杀入火光冲天的盐场！元苦大师独自堵住海滩退路，南宗武僧直扑盐仓救人；两名凶悍的东瀛海寇先锋平次与彦三怪叫迎上，弧形长短双刀狠辣劈来！'),
      S(SPEAKER_NSL_MONK_A, '（挥禅棍砸翻两名纵火浪人，回首高喝）“北宗兄弟，这外围两个东瀛硬点子交给你挡住，俺带弟兄们这就劈开盐仓救出百余灶户！”'),
      P('（内劲贯注周身，步踏少林金刚桩冷声喝道）“戒铁师兄尽管救人！海寇犯我闽海、残杀宋民，今日便教他们葬身盐滩！”'),
    ],
    choices: [
      {
        id: 'slq19_fight_vanguard',
        label: '斩破海寇前锋，车轮连战【平次】与【彦三】！（车轮连战 实战）',
        subLabel: '打开盐仓血路，护送百姓撤离火场',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPirateVanguardA() },
            extraOpponents: [{ kind: 'custom', npc: buildPirateVanguardB() }],
            rule: 'story_trial',
            forbidEscapeReason: '盐仓百余百姓危在旦夕，绝不可退后半步！',
            introText: '【车轮连战 · 盐场破锋】迎战东瀛海寇先锋【平次】与【彦三】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q19_vanguard_cleared', value: true },
              openScene('scene_slq19_08', SHAOLIN_Q19_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('海寇双刀迅疾，暂退南宗武僧阵后回气再杀入盐场！', 'warn', '盐场夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_08: {
    id: 'scene_slq19_08',
    title: '第六幕 · 鬼丸现身',
    subtitle: '兴化官盐场中央 · 火光决战',
    illustrationUrl: '/assets/quests/sl_19_saltfield_pirates.jpg',
    illustrationCaption: '莆田海滨盐场 · 夜战火光冲天，与南少林同门并肩力敌东瀛海寇头目鬼丸浪人',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q19_raid_tactic=fire|滩头贼舟烈焰冲天，海寇前锋与佐助被元苦铁掌死死截断！盐场中央一道森冷刀芒骤劈火幕，瘦高斗笠浪人【鬼丸】踏着雪白盐堆凌空扑落，双目赤红如鬼！|}{ifFlagEq:sl_q19_raid_tactic=stealth|外围暗哨与前锋尽被你悄无声息制伏，盐仓灶户安然脱险！东瀛海寇头目【鬼丸浪人】骇怒回身，反手抽出三尺寒光野太刀直指独身立于火幕之前的你！|}{ifFlagEq:sl_q19_raid_tactic=frontal|平次、彦三双双伏诛盐滩，戒铁砸开盐仓救出百余老小！火幕骤裂，头戴破笠的【鬼丸浪人】携副首【佐助】踏盐堆狂笑扑落，三尺野太刀杀意森然！|火光冲天之中，东瀛海寇头目【鬼丸浪人】拔出三尺寒光野太刀踏盐堆扑落，直扑你而来！}'),
      S(SPEAKER_ONIMARU, '（缓缓舔去刀锋火星，发出令人毛骨悚然的冷笑）“哟，好俊的北宋武夫！坏本大爷劫盐大计，什么北少林南少林，在我『鬼丸流』快刀之下不过是一群木桩！纳命来吧！”'),
      P('（立于火海盐堆之间，衣袂猎猎）“南北少林同气连枝，岂容你这东瀛贼寇在我大宋海疆肆虐！今日便斩你以祭罹难盐丁！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q19_boss_intro_seen', value: true },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q19_raid_tactic', op: 'eq', value: 'frontal' },
        thenEffects: [openScene('scene_slq19_10', SHAOLIN_Q19_QUEST_ID)],
        elseEffects: [openScene('scene_slq19_09', SHAOLIN_Q19_QUEST_ID)],
      },
    ],
  },

  scene_slq19_09: {
    id: 'scene_slq19_09',
    title: '第七幕 · 斩将鬼丸',
    subtitle: '兴化官盐场（1v1 斩将决战）',
    mandatory: true,
    beats: [
      N('外围海寇先锋与副首佐助早被你的奇策截断溃散！海潮拍岸、烈焰翻腾之间，唯有东瀛海寇头目【鬼丸浪人】提野太刀疾扑而至，与你展开一对一生死决战！'),
      S(SPEAKER_ONIMARU, '（双手反握三尺野太刀沉腰蓄势，破笠下寒光暴射）“好诡诈的宋人！就算只剩本大爷一人，这一记『鬼丸拔刀斩』也足够将你连人带骨劈作两半！”'),
      P('（催动全身内劲，龙爪手与少林重招并起）“贼酋鬼丸，你的快刀吓不倒南北少林！受死罢！”'),
    ],
    choices: [
      {
        id: 'slq19_fight_onimaru_solo',
        label: '火光中 1v1 阵斩东瀛海寇头目【鬼丸浪人】！（二流上品 单挑）',
        subLabel: '奇策截断海寇援众，孤身斩杀闽海首恶',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildOnimaruBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '东瀛海寇头目近在眼前，今日必斩此獠以安闽海！',
            introText: '【1v1 盐场斩将】火光中单挑东瀛海寇头目【鬼丸浪人】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq19_11', SHAOLIN_Q19_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('鬼丸浪人快刀凌厉，暂借盐堆掩护调匀内息后再决生死！', 'warn', '盐场夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_10: {
    id: 'scene_slq19_10',
    title: '第七幕 · 双贼死斗',
    subtitle: '兴化官盐场（车轮连战 首领决战）',
    mandatory: true,
    beats: [
      N('鬼丸浪人野太刀快如鬼魅，副首佐助自侧翼盐堆疾掠补刀！两人一快一诡，杀机将你退路彻底封死！'),
      S(SPEAKER_PIRATE_MATE, '（狞笑抽刀抢攻）“鬼丸大人压阵，在下先断这宋人下盘！”'),
      P('（迎风长啸，步稳如岳）“两个东瀛贼酋一并来罢，今日叫你们有来无回！”'),
    ],
    choices: [
      {
        id: 'slq19_fight_onimaru_gauntlet',
        label: '火光中车轮连战【佐助】与【鬼丸浪人】！（二流上品 车轮连战）',
        subLabel: '先斩副首【佐助】，再诛海寇头目【鬼丸浪人】',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q19_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPirateMate() },
            extraOpponents: [{ kind: 'custom', npc: buildOnimaruBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '东瀛海寇头目近在眼前，今日必斩此獠以安闽海！',
            introText: '【车轮连战 · 盐场斩寇】决战东瀛海寇副首【佐助】与头目【鬼丸浪人】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq19_11', SHAOLIN_Q19_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('海寇双酋快刀凶悍，暂借盐堆掩护回气后再战！', 'warn', '盐场夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq19_11: {
    id: 'scene_slq19_11',
    title: '第八幕 · 刀断海平',
    subtitle: '莆田海滨盐场 · 黎明前夕（海防盐民抉择）',
    mandatory: true,
    beats: [
      N('生死数十合，鬼丸浪人倾尽全力劈出绝命快刀！千钧一发之际，你错步欺身，左手《龙爪手》闪电扣断鬼丸腕骨、右手雷霆重劲轰入其膻中大穴！鬼丸惨嚎飞出三丈气绝身亡，余众见首恶伏诛纷纷束手就擒！'),
      N('天色微明，兴化军水师赶到接管俘虏，百余脱险灶户跪地高呼「活菩萨」。戒铁、戒磐满身烟灰重重拍着你臂膀，大笑称你乃九莲山生死之交，再无半点南北芥蒂。'),
      S(SPEAKER_SALT_WATCH, '（望着被火光与炮石炸塌大半的海滨防潮盐堤，愁眉深锁）“多谢南北少林大侠救命！只是这片护盐海堤被贼人炸豁了口子，若赶在秋汛大潮前补不起来，咱们百余户盐民今冬怕要断了生计……”'),
      S('NPC-0124', '（立于晨光中颔首微笑，将善后之策交由你定夺）“阿弥陀佛。盐场既平，待安顿好灶户，便请随老衲回返【大雄正殿 · 佛前蒲团】展读嵩山法帖——只是眼前海堤与长久海防，{gender:少侠|女侠}意欲如何相助？”'),
    ],
    choices: [
      {
        id: 'slq19_aid_silver',
        label: '【解囊筑堤】慷慨捐出 30 两纹银资助莆田盐民抢修海堤、重建盐仓！',
        subLabel: '花费 30 两银解燃眉之急，盐民感恩立碑（禅心慈悲 +2 · 侠义 +25 · 声望 +25）',
        tone: 'jade',
        condition: { type: 'silverAtLeast', min: 30 },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_dike_paid', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -30, reason: '捐银资助莆田海滨盐民抢修防潮海堤与盐仓' },
              { type: 'setFlag', flag: 'sl_q19_dike_paid', value: true },
            ],
            elseEffects: [],
          },
          { type: 'setFlag', flag: 'sl_q19_coastal_choice', value: 'donate' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'modifyChivalry', delta: 25, reason: '捐银三十两资助莆田盐民修筑海堤' },
          { type: 'modifyRenown', delta: 25, reason: '闽海斩寇捐银济民，南北少林侠名震福建路' },
          setStep(SHAOLIN_Q19_QUEST_ID, 'yuanku_confer'),
          toast('已资助盐民修堤并凯旋！请前往【大雄正殿 · 佛前蒲团】拜见元苦大师！', 'success', '莆田南渡'),
        ],
      },
      {
        id: 'slq19_aid_patrol',
        label: '【结盟请巡】亲书南北少林海防互助盟约，免费托兴化军与泉州水师加派战船长驻巡海！',
        subLabel: '分文不费谋长久海防之安（禅心慈悲 +1 · 声望 +15）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q19_coastal_choice', value: 'patrol' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'modifyRenown', delta: 15, reason: '促成南北少林与福建水师海防联巡之约' },
          setStep(SHAOLIN_Q19_QUEST_ID, 'yuanku_confer'),
          toast('已定下南北少林海防联巡之约！请前往【大雄正殿 · 佛前蒲团】拜见元苦大师！', 'success', '莆田南渡'),
        ],
      },
    ],
  },

  scene_slq19_12: {
    id: 'scene_slq19_12',
    title: '第九幕 · 破除门户',
    subtitle: '莆田南少林 · 大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_19_yuanku_scroll.jpg',
    illustrationCaption: '大雄正殿 · 铜身罗汉元苦打破门户之见，亲授《盘山铁布衫（大成）》与《铁线拳》',
    mandatory: true,
    beats: [
      N('大雄正殿檀香馥郁，九莲山晨钟悠扬。你净手焚香，将紫檀盒中的《南北禅武同源法帖》双手呈递元苦大师。大师徐徐展卷，见字字苍劲浑厚，既述达摩一苇渡江之源，又言中原闽海共护苍生之大义，长眉微微一颤。'),
      S('NPC-0124', '“善哉！老衲往日总嫌北宗拘泥繁文、轻视南宗粗犷，直到见你以俗家之身{ifFlagEq:sl_q19_spar_style=humble|闯三关而谦和留情|闯三关而刚正不阿}、夜斩鬼丸浪人更{ifFlagEq:sl_q19_coastal_choice=donate|倾囊助盐民修堤|谋水师长巡安民}，方知嵩山少林正气数百年未衰半分！”'),
      S('NPC-0124', '（朗声宣告满殿僧众）“传老衲法谕：自今日起，莆田南少林与嵩山少林重订百年同源之盟，南北弟子往来论禅习武一视同仁！玄痛师兄既授你北宗地阶《龙爪手》，老衲亦不能小气——”'),
      S('NPC-0124', '（步下莲台，亲手将两卷泛黄古籍置入你掌中）“此二卷乃我莆田南少林镇派秘传：一曰《盘山铁布衫（大成）》，铜皮铁骨、刀枪难伤；二曰《铁线拳》，以气催桥、寸劲裂石！今日老衲打破门户之见，尽数传你！”'),
      N('元苦大师更当殿运起铜身内劲替你疏通双臂经脉，将南宗外壮内敛与北宗《龙爪手》刚柔并济之理一一印证，满殿南宗武僧无不动容赞叹！'),
    ],
    onFinishEffects: [openScene('scene_slq19_13', SHAOLIN_Q19_QUEST_ID)],
  },

  scene_slq19_13: {
    id: 'scene_slq19_13',
    title: '第十幕 · 同源佳话',
    subtitle: '九莲山麓 · 北归之路',
    mandatory: true,
    beats: [
      P('（只觉浑身气血如江河奔涌，双臂筋骨隐生金铁沉浑之感，躬身大礼拜谢）“元苦大师胸襟如海，晚辈铭感五内！必当融汇南北少林绝学，绝不负两宗高僧厚望！”'),
      S('NPC-0124', '（提笔写就南宗回书封入紫檀盒中，含笑相送）“好孩子，携老衲回书北返嵩山罢。日后你若再临闽海，九莲山门随时为你敞开！”'),
      N('你辞别元苦大师与戒铁、戒磐诸僧，怀揣南宗回书与三门南北绝学踏上北归官道。此役之后，「南北少林本一家」的佳话传遍大江南北，你在少林俗家护法一脉中的威望已然如日中天。'),
    ],
    choices: [
      {
        id: 'slq19_finish_reward',
        label: '拜谢元苦大师与玄痛长老，领受《龙爪手》《盘山铁布衫（大成）》《铁线拳》（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-062' },
          { type: 'teachMartialArt', artId: 'MA-080' },
          { type: 'teachMartialArt', artId: 'MA-106' },
          { type: 'giveCombatExp', amount: 460, reason: '九莲山闯三关、盐场斩杀鬼丸浪人并促成南北少林同源之盟' },
          { type: 'addSectContribution', amount: 180 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_raid_tactic', op: 'eq', value: 'fire' },
            thenEffects: [{ type: 'modifySkill', key: '策论', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0124' }, delta: 25 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q19_spar_style', op: 'eq', value: 'humble' },
            thenEffects: [{ type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0124' }, delta: 5 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q19_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《莆田南渡 · 南北少林》！习得《龙爪手》《盘山铁布衫（大成）》《铁线拳》，获元苦大师深厚敬重！',
            'success',
            '莆田南渡',
          ),
        ],
      },
    ],
  },
}
