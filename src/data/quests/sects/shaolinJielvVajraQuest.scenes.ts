import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q27_QUEST_ID } from './shaolinJielvVajraQuest'

const SPEAKER_DEMON_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '欢喜魔僧',
  title: '关洛邪道巨擘 · 伪袈裟妖僧',
  factionName: '关洛邪道',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildCryptAcolyte(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ27_ACOLYTE',
    name: '妖坛迷音恶徒',
    title: '欢喜魔僧门下 · 铜铃护坛邪徒',
    realm: '二流上品',
    factionId: 'SECT-21',
    factionName: '关洛邪道',
    sectRank: 2,
    sectRankLabel: '妖坛护法',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“入了本座欢喜迷香阵还想逞威风？先吃俺一记断门血刀！”',
    stats: { hp: 1760, mp: 1120, agi: 56, res: 40 },
    talents: { bone: 78, comprehension: 62, charm: 40 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-132' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-244', level: 7 }, { artId: 'MA-132', level: 6 }],
  })
}

function buildJoyousDemonMonkBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ27_DEMON_MONK',
    name: '欢喜魔僧',
    title: '关洛邪道巨擘 · 闭穴妖僧',
    realm: '一流下品',
    factionId: 'SECT-21',
    factionName: '关洛邪道',
    sectRank: 3,
    sectRankLabel: '邪道巨擘',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“哈哈哈！少林寺的戒律黑铁法牌？正好拿来给本座垫酒壶！本座一身闭穴邪功刀枪不入，点穴手法对我屁用没有！”',
    stats: { hp: 3480, mp: 2300, agi: 72, res: 68 },
    talents: { bone: 90, comprehension: 80, charm: 42 },
    equippedArts: { neigong: 'MA-080', move1: 'MA-072', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-080', level: 8 }, { artId: 'MA-072', level: 8 }, { artId: 'MA-244', level: 8 }],
  })
}

function buildJoyousDemonMonkBrokenBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ27_DEMON_MONK_BROKEN',
    name: '欢喜魔僧（幻阵反噬）',
    title: '关洛邪道巨擘 · 闭穴妖僧',
    realm: '一流下品',
    factionId: 'SECT-21',
    factionName: '关洛邪道',
    sectRank: 3,
    sectRankLabel: '邪道巨擘',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“可恶！竟一指震碎本座摄魂主铜铃，连外围妖徒都被铃音震昏！小辈拿命来偿！”',
    stats: { hp: 2880, mp: 1960, agi: 65, res: 58 },
    talents: { bone: 90, comprehension: 80, charm: 42 },
    equippedArts: { neigong: 'MA-080', move1: 'MA-072', move2: 'MA-244' },
    learnedArts: [{ artId: 'MA-080', level: 7 }, { artId: 'MA-072', level: 7 }, { artId: 'MA-244', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq27_01: {
    id: 'scene_slq27_01',
    title: '第一幕 · 钟鼓肃杀 · 汝许血状',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}仲夏，雷云低垂。你奉戒律院急召来到【钟鼓禅院 · 演武坪】，只见一拍神僧玄寂与铁掌禅师玄痛并肩肃立于大钟之下，石案上赫然摆着一块漆黑沉重、阴刻「戒律伏魔」朱砂篆字的【戒律黑铁法牌】与一封汝许官民血泪控诉状！'),
      S('NPC-0134', '（声如闷雷，将血状递与你）“阿弥陀佛！近三月来，关洛邪道巨擘【欢喜魔僧】竟冒穿我少林红黄袈裟，在汝州、许州交界的一座荒山废寺地宫私设妖坛，假托少林活佛名号欺压乡里、掳掠良家女子，更残害敢于反抗的义士！”'),
      S('NPC-0156', '（铁掌拍案，怒不可遏）“此獠不仅败坏我少林千年清誉，更练成一门邪毒无比的『闭穴气功』，将周身三十六大穴真气反锁成障！此前两名下山查访的少林师弟中了他的迷香暗算，点穴掌力击在妖僧身上竟如泥牛入海，险些丧命！”'),
      S('NPC-0134', '“寻常拳掌难以破其气障，唯有少林至阳至刚、无坚不摧之《大力金刚指》方能一指洞穿命门！今日老衲与玄痛师弟联手传你此指，代少林清理这假冒妖孽！”'),
    ],
    onFinishEffects: [openScene('scene_slq27_02', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_02: {
    id: 'scene_slq27_02',
    title: '第二幕 · 联手授指 · 铁指断欲',
    subtitle: '钟鼓禅院 · 演武坪传功',
    mandatory: true,
    beats: [
      N('演武坪青石之上，玄痛先为你演示《大力金刚指》刚猛凌厉的「穿金裂石」指劲——食中二指隔空三尺疾点，铜钟厚重裙边竟响起一声长鸣，赫然印出一道寸许清晰的指痕！'),
      N('玄寂则以禅理为你拆解如何以绵厚佛门内息温养指脉，做到「外现金刚怒目之威，内守般若澄明之心」，刚而不折、怒而不乱。'),
      N('二老口诀已倾囊相授，你凝气于食中二指试炼劲路，决意先以哪一重意境贯通指脉？'),
    ],
    choices: [
      {
        id: 'slq27_train_fierce',
        label: '【效玄痛穿金裂石之威】将全身纯阳劲力极限压缩于指尖，专攻一指洞穿气障！',
        subLabel: '当场习得《大力金刚指》破坚锋芒',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_finger_focus', value: 'fierce' },
          teachArtNow('MA-044'),
          openScene('scene_slq27_03', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'slq27_train_calm',
        label: '【效玄寂怒而不乱之禅】先以澄明佛心镇定心猿，指劲刚猛却丝毫不乱灵台！',
        subLabel: '当场习得《大力金刚指》定心断欲之诀',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_finger_focus', value: 'calm' },
          teachArtNow('MA-044'),
          openScene('scene_slq27_03', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq27_03: {
    id: 'scene_slq27_03',
    title: '第三幕 · 亲赐法牌 · 誓清佛门',
    subtitle: '钟鼓禅院 · 黑铁戒律牌',
    mandatory: true,
    beats: [
      N('你指风呼啸破空，二老见你瞬息悟透《大力金刚指》要旨，玄寂遂双手捧起那块沉甸甸的【戒律黑铁法牌】，郑重按入你掌心！'),
      S('NPC-0134', '“持此黑铁法牌，你便代表嵩山少林寺戒律院清理假冒妖僧！切记：欢喜魔僧除闭穴邪功外，最擅在地宫布设靡靡迷香与摄魂铜铃惑乱道心，切不可心生半分贪嗔痴念！”'),
      P('（紧握冰冷沉重的黑铁法牌，叩首领命）“弟子谨遵二位师伯法旨！妖僧冒穿袈裟祸乱汝许百姓，天理难容，弟子定破其邪功、将其擒回嵩山明正典刑！”'),
    ],
    choices: [
      {
        id: 'slq27_accept_inquire',
        label: '【接牌暗访逃脱乡民】受领戒律黑铁法牌，南下途经汝许先向幸存乡民打听地宫迷阵详情！',
        subLabel: '开启【铁指断欲 · 降伏其心】讨魔阶段，摸清妖坛布设',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_asked_locals', value: true },
          { type: 'startQuest', questId: SHAOLIN_Q27_QUEST_ID, stepId: 'purge_ruxu_crypt' },
          setStep(SHAOLIN_Q27_QUEST_ID, 'purge_ruxu_crypt'),
          openScene('scene_slq27_04', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'slq27_accept_storm',
        label: '【星夜疾驰直捣废寺】恐被掳良家女子受辱，接牌立刻施展轻功直扑汝许荒山废寺！',
        subLabel: '开启【铁指断欲 · 降伏其心】讨魔阶段，雷霆直扑地宫',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_asked_locals', value: false },
          { type: 'startQuest', questId: SHAOLIN_Q27_QUEST_ID, stepId: 'purge_ruxu_crypt' },
          setStep(SHAOLIN_Q27_QUEST_ID, 'purge_ruxu_crypt'),
          openScene('scene_slq27_04', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq27_04: {
    id: 'scene_slq27_04',
    title: '第四幕 · 废寺地宫 · 迷香幻音',
    subtitle: '汝许荒山 · 妖坛入口',
    illustrationUrl: '/assets/quests/sl_27_ruined_crypt.jpg',
    illustrationCaption: '废寺地宫 · 残佛断壁之下幽火摇曳，你手持戒律黑铁法牌踏入欢喜魔僧盘踞的阴森地宫',
    mandatory: true,
    beats: [
      N('你星夜南下汝许荒山，顺着樵夫与乡民所指寻至那座荒草丛生的残破古寺。{ifFlag:sl_q27_asked_locals|脱逃乡民曾哭诉地宫内钟铃乱耳、烟气迷魂，凡入窟者皆似见红粉幻影而神智昏沉；|刚踏入倾颓大殿正中通往地下的黑黝石阶，刺鼻酒肉腥气与甜腻熏香便扑面涌来！}'),
      N('数十盏幽绿人油灯照亮了一座金玉铺就的奢靡地宫妖坛，角落铁牢里赫然关着数名瑟瑟发抖的被掳良家女子！'),
      N('你方踏下最后一级石阶，地宫穹顶骤然响起一阵急促诡异的铜铃摇荡声！铃音与甜腻迷香交织成波，刹那间四周幽火化作漫天红粉纱幔与靡靡丝竹，软语媚笑与怒火杀意交替钻入你的耳膜识海！'),
    ],
    onFinishEffects: [openScene('scene_slq27_05', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_05: {
    id: 'scene_slq27_05',
    title: '第五幕 · 欢喜迷阵 · 定心之考',
    subtitle: '废寺地宫 · 破幻抉择',
    mandatory: true,
    beats: [
      N('红粉幻影在熏香中摇曳生姿，地宫穹顶那串大小不一的青铜铃铛却越摇越急，连呼吸都仿佛被铃音节拍牵引着变得燥热浮乱！妖坛暗处隐隐传来几名持刀邪徒的低笑声，正等着你迷失心神便一拥而上。'),
      N('穹顶正中那尊最大青铜主铃泛着暗红血光，每一次震颤皆带动其余辅铃共鸣，令迷香随声波四散；四周石壁油灯亦冒出滚滚青烟。'),
      N('电光火石间，道心面临「欢喜禅迷阵」严峻拷问——你决意如何破这魔窟迷阵？'),
    ],
    choices: [
      {
        id: 'slq27_mind_lamps',
        label: '“屏息闭目运内力强逼周身排毒，抢先冲向四周石壁将幽绿人油灯尽数拍灭以断迷烟！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_illusion_shattered', value: false },
          { type: 'setFlag', flag: 'sl_q27_crypt_entered', value: true },
          openScene('scene_slq27_06', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'slq27_mind_bell',
        label: '“紧守灵台一点清明，循声波震荡之源，以《大力金刚指》隔空震碎地窟穹顶主铜铃！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_illusion_shattered', value: true },
          { type: 'setFlag', flag: 'sl_q27_crypt_entered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_mind_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q27_mind_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq27_06', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'slq27_mind_sweep',
        label: '“顺着靡靡梵音以刚破幻，大喝一声挥掌横扫石柱，借剧烈震荡吹散满窟迷香！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_illusion_shattered', value: false },
          { type: 'setFlag', flag: 'sl_q27_crypt_entered', value: true },
          openScene('scene_slq27_06', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq27_06: {
    id: 'scene_slq27_06',
    title: '第六幕 · 妖坛对峙 · 地宫伏魔',
    subtitle: '废寺地宫 · 决战欢喜魔僧（实战）',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q27_illusion_shattered|“铛——咔嚓！！”一道炽烈纯阳指风直穿穹顶，主铜铃轰然炸作漫天碎铜！刺耳反震音浪反噬妖坛，伏在暗处摇铃的外围邪徒齐齐惨叫抱头晕厥，漫窟红粉幻影顷刻灰飞烟灭！|迷香仍在石窟弥漫，铃音虽略微一顿却未被断绝，几名持刀妖坛恶徒狞笑着自石柱后现身封住了地宫退路！}'),
      N('妖坛玉座之上，一名满脸横肉、目露淫邪凶光的胖大妖僧摔碎酒碗暴起，身上赫然披着一件盗制而来的少林红黄袈裟！他运功一震，浑身肥肉瞬间绷紧如紫铜浇铸，周身大穴气血倒锁！'),
      P('（高举【戒律黑铁法牌】，声震地宫石壁）“呔！冒穿少林袈裟、祸乱汝许生灵的妖孽！嵩山少林寺戒律院奉黑铁法牌前来拿你，速速脱下伪袈裟束手就擒！”'),
      S(SPEAKER_DEMON_MONK, '（抽出暗红血刀狞笑扑来）“哈哈哈哈！本座『欢喜闭穴邪功』穴道移位、气障护体，今夜便拿你这少林真传的脑袋来祭我的妖坛！”'),
    ],
    choices: [
      {
        id: 'slq27_fight_shattered',
        label: '【破幻直捣 · 1v1 伏魔】主铃已碎、邪徒尽溃，运《大力金刚指》直破【欢喜魔僧】！',
        subLabel: '幻阵反噬令妖僧气血大乱、跳过外围妖徒，专注 1v1 破其闭穴邪功',
        tone: 'jade',
        condition: { type: 'flag', flag: 'sl_q27_illusion_shattered', op: 'truthy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q27_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJoyousDemonMonkBrokenBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '地宫铁牢里关着无辜被掳女子，绝不可退缩半步！',
            introText: '【废寺地宫 · 破幻伏魔】主铜铃已碎、妖徒尽溃，1v1 以《大力金刚指》戳破【欢喜魔僧】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q27_tactic', value: 'bell' },
              openScene('scene_slq27_07', SHAOLIN_Q27_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('欢喜魔僧血刀与闭穴邪功极为凶悍！调息后可再于【钟鼓禅院 · 演武坪】动身续战。', 'warn', '地宫伏魔'),
            ],
          },
        ],
      },
      {
        id: 'slq27_fight_chant',
        label: '【强运佛号镇心 · 震慑妖徒独斗魔僧】凭深厚经义高宣金刚大喝，震散外围妖徒 1v1 破魔僧！',
        subLabel: '需经义 ≥ 75 · 以佛音清心震退妖徒，1v1 迎战全盛欢喜魔僧（胜后禅心慈悲 +1）',
        tone: 'gold',
        condition: {
          type: 'all',
          conditions: [
            { type: 'flag', flag: 'sl_q27_illusion_shattered', op: 'falsy' },
            { type: 'skillAtLeast', key: '经义', min: 75 },
          ],
        },
        hideWhenUnavailable: true,
        effects: [
          toast('你默诵《金刚经》高宣佛号如洪钟大吕，震散迷香幻音、吓得外围邪徒丢刀溃散！欢喜魔僧怒扑而来！', 'success', '佛号镇心'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q27_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJoyousDemonMonkBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '地宫铁牢里关着无辜被掳女子，绝不可退缩半步！',
            introText: '【废寺地宫 · 佛号镇心】妖徒已溃，1v1 力战全盛【欢喜魔僧】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q27_tactic', value: 'chant' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q27_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q27_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq27_07', SHAOLIN_Q27_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('欢喜魔僧血刀与闭穴邪功极为凶悍！调息后可再于【钟鼓禅院 · 演武坪】动身续战。', 'warn', '地宫伏魔'),
            ],
          },
        ],
      },
      {
        id: 'slq27_fight_storm',
        label: '【金刚怒目 · 车轮硬破魔窟】不避迷香铃音，挥指连破妖坛恶徒与欢喜魔僧！',
        subLabel: '零门槛正攻 · 车轮连战妖坛恶徒与全盛欢喜魔僧（胜后怒目杀业 +1）',
        tone: 'danger',
        condition: { type: 'flag', flag: 'sl_q27_illusion_shattered', op: 'falsy' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q27_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCryptAcolyte() },
            extraOpponents: [{ kind: 'custom', npc: buildJoyousDemonMonkBoss() }],
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '地宫铁牢里关着无辜被掳女子，唯有死战清魔！',
            introText: '【废寺地宫 · 车轮清魔】连战【妖坛迷音恶徒】与全盛【欢喜魔僧】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q27_tactic', value: 'storm' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q27_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q27_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq27_07', SHAOLIN_Q27_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('欢喜魔僧血刀与闭穴邪功极为凶悍！调息后可再于【钟鼓禅院 · 演武坪】动身续战。', 'warn', '地宫伏魔'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq27_07: {
    id: 'scene_slq27_07',
    title: '第七幕 · 铁指破功 · 闭穴崩解',
    subtitle: '废寺地宫 · 罩门洞穿',
    illustrationUrl: '/assets/quests/sl_27_iron_finger.jpg',
    illustrationCaption: '铁指断欲 · 你凌空突进避开血刀，以至阳至刚的《大力金刚指》一指戳破欢喜魔僧闭穴气功罩门',
    mandatory: true,
    beats: [
      N('地宫中刀光指影激撞三十余合！欢喜魔僧虽凭闭穴邪功硬抗数记重击，却已被雄浑佛门内劲震得气血翻腾、动作渐滞！你眼尖如电，骤然看穿他强锁三十六穴后，所有暴走邪气都汇集于檀中穴下三寸处隐隐鼓动——那里正是他唯一的死门！'),
      N('你身形贴地疾滑钻入血刀空门，左手一掌震开其刀腕，右手食中二指骤然爆发出刺目金芒般的纯阳真气，狠狠点中他檀中穴下三寸气门！'),
      N('“噗嗤——轰！！”宛若吹胀到极致的牛皮鼓被铁锥戳破！欢喜魔僧周身闭穴气障瞬间炸裂溃散，暴走邪气倒冲经脉，暗红血刀脱手坠地，一声惨嚎重重砸碎金玉妖坛！'),
      S(SPEAKER_DEMON_MONK, '（口吐黑血瘫软在地，满脸绝望）“我的……我的闭穴邪功全破了……少林《大力金刚指》竟如此霸道……”'),
    ],
    onFinishEffects: [openScene('scene_slq27_08', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_08: {
    id: 'scene_slq27_08',
    title: '第八幕 · 剥袍救民 · 安置归乡',
    subtitle: '废寺地宫 · 护送抉择',
    mandatory: true,
    beats: [
      N('你上前一把扯下欢喜魔僧身上那件污浊的伪冒红黄袈裟，以铁链死死锁住其琵琶骨，旋即震断铁牢大锁，将遭劫的十余名被掳良家女子尽数解救出来！'),
      N('劫后余生的女子们相拥痛哭，跪倒连连叩谢；可几名家住偏远乡野的少女却满眼惶恐：“大师救命之恩没齿难忘……只是荒山野岭多盗匪，咱们身无分文衣衫破损，若独行回家只怕再遭恶人欺凌、亦怕乡邻流言非议……”'),
      N('你须亲自押解重犯欢喜魔僧北返嵩山典刑，面对这十余名受惊无助的被掳女子，你决意如何安置她们归乡？'),
    ],
    choices: [
      {
        id: 'slq27_rescue_escort',
        label: '【自掏三十两银遣人护送归乡】自费备车置衣、雇可靠镖师女眷逐一密送还家以护清誉！',
        subLabel: '需 30 两纹银（已付重试免复费）· 禅心慈悲 +2，额外大增侠义与江湖声望',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q27_donated', op: 'truthy' },
            { type: 'silverAtLeast', min: 30 },
          ],
          hint: '需 30 两纹银雇可靠护卫与车马护送被掳女子归乡（已付则免复费）',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_donated', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -30, reason: '自费雇可靠护卫车马护送汝许被掳女子体面归乡' },
              { type: 'setFlag', flag: 'sl_q27_donated', value: true },
            ],
            elseEffects: [],
          },
          { type: 'setFlag', flag: 'sl_q27_rescue', value: 'escort' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_rescue_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q27_rescue_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'slq27_rescue_official',
        label: '【交由汝州官府逐一护送归家】执戒律法牌与书信亲交汝州府衙，请官差妥善护送归乡',
        subLabel: '零花销行义举 · 禅心慈悲 +1，保乡民平安返家',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q27_rescue', value: 'official' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_rescue_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q27_rescue_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq27_09: {
    id: 'scene_slq27_09',
    title: '第九幕 · 锁魔归嵩',
    subtitle: '汝许荒山 · 押解返寺',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q27_rescue=escort|你自掏三十两纹银请镇上老成可靠的镖头与妇人备好篷车新衣，叮嘱秘护各家女儿清誉、逐一安稳送交亲人手中，众女泣拜不止，沿途百姓闻之无不交口称颂少林仁厚！|你将众女妥善移交闻讯赶至的汝州府衙捕头，附书请官府明示众女皆系遭妖僧掳劫、沿途严护归乡，官差肃然领命。}'),
      N('汝许百姓奔走相告，纷纷焚香礼拜，称颂少林真传仗义除魔、清正佛门！'),
      N('你提着铁链押解垂头丧气的欢喜魔僧与那件撕下的伪冒袈裟，踏上北返嵩山少林寺的官道。'),
    ],
    choices: [
      {
        id: 'slq27_return_shaolin',
        label: '押解欢喜魔僧返回【钟鼓禅院 · 演武坪】，交由玄寂、玄痛典刑',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q27_QUEST_ID, 'return_daxiong_west'),
          toast(
            '已戳破欢喜魔僧闭穴气功、妥善安置被掳女子！请押解魔僧返回【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】复命典刑。',
            'talk',
            '铁指断欲',
          ),
        ],
      },
    ],
  },

  scene_slq27_10: {
    id: 'scene_slq27_10',
    title: '第十幕 · 演武典刑 · 二老赞叹',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_27_law_plaque.jpg',
    illustrationCaption: '法牌典刑 · 钟鼓禅院演武坪群僧肃立，你交还戒律黑铁法牌，玄寂与玄痛宣判将欢喜魔僧依律严惩',
    mandatory: true,
    beats: [
      N('回到钟鼓禅院演武坪，数百名戒律院与护法武僧早已肃立两厢。你将铁链锁拿的欢喜魔僧推至阶前，双手奉上撕下的伪冒袈裟与【戒律黑铁法牌】。'),
      S('NPC-0134', '（朗声宣法，声震全寺）“阿弥陀佛！邪道妖孽欢喜魔僧冒穿少林袈裟、残害汝许良民，今蒙我寺真传弟子破其邪阵、以《大力金刚指》废其闭穴邪功生擒归案！传令：即刻押送开封与汝州官府明正典刑，以正佛门清规、慰藉天下苍生！”'),
      S('NPC-0156', '（拍手大笑，满面欣慰）“痛快！{ifFlag:sl_q27_illusion_shattered|先以一指隔空震碎摄魂主铜铃破尽迷香幻阵，复戳破妖僧闭穴气门，|临阵稳守佛心不乱、一指戳破闭穴邪功，}{ifFlagEq:sl_q27_rescue=escort|更肯倾囊护送被掳女子体面归乡，|更妥善交官护送被掳乡民归家，}这卷《大力金刚指》完整秘录，你当之无愧！”'),
      N('满坪僧众齐声高颂佛号，敬佩目光尽皆聚焦于你一身！'),
    ],
    onFinishEffects: [openScene('scene_slq27_11', SHAOLIN_Q27_QUEST_ID)],
  },

  scene_slq27_11: {
    id: 'scene_slq27_11',
    title: '第十一幕 · 降伏其心 · 清风满院',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S('NPC-0134', '（将《大力金刚指》全本秘录交付于你，语重心长）“柔可化邪于无形，刚可摧魔于一点。至此，你于戒律护法一脉真传之绝艺，已然功德圆满！”'),
      P('（双手合十，向玄寂、玄痛二位师伯深深一拜）“弟子谨记『降伏其心』四字！武功愈深，愈当戒慎恐惧、护法安民，绝不负少林栽培之恩！”'),
      N('骤雨初歇，嵩山晴空万里，钟鼓禅院响起悠扬浑厚的晚钟。你以《大力金刚指》荡除妖僧、侠名远播关洛，真传单脉的修行已臻一流巅峰之境！'),
    ],
    choices: [
      {
        id: 'slq27_complete',
        label: '习得《大力金刚指》，圆满完成【铁指断欲 · 降伏其心】',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-044', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-044', level: 1 }],
          },
          {
            type: 'giveCombatExp',
            amount: 700,
            reason: '持戒律黑铁法牌杀入汝许废寺地宫，破欢喜禅迷阵并以《大力金刚指》戳破欢喜魔僧闭穴气功押回典刑',
          },
          { type: 'addSectContribution', amount: 240 },
          {
            type: 'modifyChivalry',
            delta: 40,
            reason: '清剿冒穿少林袈裟祸乱汝许的欢喜魔僧，解救无辜良民并押送典刑',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_rescue', op: 'eq', value: 'escort' },
            thenEffects: [
              { type: 'modifyChivalry', delta: 30, reason: '自费雇护卫妥善护送被掳良家女子体面归乡' },
              { type: 'modifyRenown', delta: 40, reason: '汝许除魔救民、倾囊护全清誉，侠名远播关洛' },
            ],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_illusion_shattered', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q27_QUEST_ID, outcome: 'completed' },
          toast(
            '【铁指断欲 · 降伏其心】圆满完成！习得《大力金刚指》，实战经验 +700、贡献 +240、侠义 +40、经义 +1！',
            'success',
            '铁指断欲',
          ),
        ],
      },
    ],
  },
}
