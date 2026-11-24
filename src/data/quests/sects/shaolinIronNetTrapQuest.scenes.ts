import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q31_QUEST_ID } from './shaolinIronNetTrapQuest'

const SPEAKER_BLACKWATER_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑水魔僧',
  title: '西夏一品堂 · 密宗宗师客卿',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_YIPINTANG_GUARD: StorySpeakerSpec = {
  kind: 'custom',
  name: '一品堂黑甲死士',
  title: '黑水魔僧贴身护法',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

function buildYipintangGuard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ31_YIPINTANG_GUARD',
    name: '一品堂黑甲死士',
    title: '西夏一品堂 · 夜袭先锋死士',
    realm: '一流中品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂死士',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“护住魔僧法王夺图突围！敢拦我一品堂者格杀勿论！”',
    stats: { hp: 2680, mp: 2350, agi: 72, res: 52 },
    talents: { bone: 82, comprehension: 76, charm: 34 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-245', level: 7 },
      { artId: 'MA-133', level: 8 },
      { artId: 'MA-085', level: 7 },
    ],
  })
}

function buildBlackwaterMonkBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ31_BLACKWATER_MONK',
    name: '黑水魔僧',
    title: '西夏一品堂 · 密宗宗师客卿',
    realm: '宗师下品',
    factionName: '西夏一品堂',
    sectRank: 4,
    sectRankLabel: '一品堂大供奉',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“区区三十六名少林武僧也想困住本座？待老夫血洗藏经阁，将中原兵书尽献兴庆府！”',
    stats: { hp: 4320, mp: 4050, agi: 78, res: 70 },
    talents: { bone: 90, comprehension: 86, charm: 38 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-046', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-245', level: 9 },
      { artId: 'MA-046', level: 9 },
      { artId: 'MA-085', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq31_01: {
    id: 'scene_slq31_01',
    title: '第一幕 · 密室议阵 · 诱饵定策',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁一层（阶段一：诱饵选址）',
    mandatory: true,
    beats: [
      N('{reignYear}寒秋晦夜，朔风紧吹。重檐琉璃藏经主阁一层灯火全熄，唯有案下一盏暗罩铜灯映出三道肃杀身影——戒律院首座玄痛、一拍神僧玄寂，以及执图而立的你。'),
      S('NPC-0156', '（指节轻叩你七夕夜所绘的飞檐暗道图，眼中精光如电）“{playerName}，边关刚传来火漆密报：西夏一品堂遣派密宗宗师客卿「黑水魔僧」率死士潜入嵩山，今夜便要夜袭藏经阁，专盗本寺珍藏的宋夏边防阵图与少林棍阵兵书！”'),
      S('NPC-0134', '（掌中佛珠捻动生风，声沉如铁）“佛门虽讲慈悲，却更有怒目金刚伏魔之戒！三十六名戒律与罗汉堂精锐武僧已听候调遣。你策论兵机老辣，今夜天罗铁网的『诱饵选址』全权交由你定夺！”'),
      N('你俯身审视琉璃主阁地形图：正门空阔易生变数、山门道远难成合围，西侧古柏暗道狭长幽深且直连琉璃飞檐退路。如何在不惊动强敌的前提下请君入瓮？'),
    ],
    choices: [
      {
        id: 'slq31_bait_front',
        label: '在藏经阁正门空置真经匣为饵，明哨后撤诱魔僧直闯大殿正中合围',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_bait_pick', value: 'front' },
          { type: 'startQuest', questId: SHAOLIN_Q31_QUEST_ID, stepId: 'deploy_iron_net' },
          setStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
          toast('已开启《铁血伏魔 · 暗布天罗》！三十六名武僧按计潜伏就位！', 'talk', '暗布天罗'),
          openScene('scene_slq31_02', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'slq31_bait_cypress',
        label: '于西侧古柏暗道设假藏经密室为饵，浸油精钢链网锁死飞檐与古柏退路',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_trap_perfect', value: true },
          { type: 'setFlag', flag: 'sl_q31_bait_pick', value: 'cypress' },
          { type: 'startQuest', questId: SHAOLIN_Q31_QUEST_ID, stepId: 'deploy_iron_net' },
          setStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
          toast('已开启《铁血伏魔 · 暗布天罗》！三十六名武僧按计潜伏就位！', 'talk', '暗布天罗'),
          openScene('scene_slq31_02', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'slq31_bait_gate',
        label: '于山门石阶与主阁长廊重兵列阵把守，正面拒西夏魔僧于藏经阁外',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_bait_pick', value: 'gate' },
          { type: 'startQuest', questId: SHAOLIN_Q31_QUEST_ID, stepId: 'deploy_iron_net' },
          setStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
          toast('已开启《铁血伏魔 · 暗布天罗》！三十六名武僧按计潜伏就位！', 'talk', '暗布天罗'),
          openScene('scene_slq31_02', SHAOLIN_Q31_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq31_02: {
    id: 'scene_slq31_02',
    title: '第二幕 · 伏魔铁网 · 晦夜待敌',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁内外',
    illustrationUrl: '/assets/quests/sl_31_iron_net.jpg',
    illustrationCaption: '暗布天罗 · 三十六名少林精锐武僧暗伏飞檐古柏，拉起伏魔铁网',
    mandatory: true,
    beats: [
      N('戌时刚过，三十六名身着深灰夜行僧衣、手持熟铜伏魔棍与浸油精钢锁链的精锐武僧悄无声息散入夜色。{ifFlag:sl_q31_trap_perfect|玄痛、玄寂赞你西侧古柏暗道假密室之策天衣无缝——既投合魔僧多疑性子，更令十二张精钢链网恰好罩死其唯一借力飞檐！|众武僧依你号令迅速占位潜伏，静候外敌踏入杀局。}'),
      S('NPC-0134', '（低声传音）“老衲守住西侧松林，玄痛师弟封死后山断崖。{playerName}，你坐镇中枢执掌警铃蚕丝——何时发号收网，全看你临阵决断！”'),
      N('二更天过，乌云遮月，整座嵩山沉入伸手不见五指的死寂。你盘膝隐于正梁暗影之中，指尖轻搭那根紧绷的极细蚕丝，耳畔唯有朔风掠过琉璃檐角的低鸣。'),
    ],
    onFinishEffects: [openScene('scene_slq31_03', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_03: {
    id: 'scene_slq31_03',
    title: '第三幕 · 魔影破窗 · 收网决断',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁（阶段二：收网时机）',
    mandatory: true,
    beats: [
      N('子夜三更，一阵夹杂浓烈酥油与血腥气的阴风骤然掠过窗棂！一道身披黑红番僧袈裟、颈挂人骨念珠的魁梧魔影如夜枭滑入阁中，正是西夏一品堂大供奉【黑水魔僧】！'),
      N('与此同时，阁外阴影里悄然闪出两名手执弯刀的【一品堂黑甲死士】，一左一右替魔僧扼守退路暗哨！'),
      N('黑水魔僧反手震断铜锁抓出兵书暗匣的刹那，你指尖蚕丝猛地一颤！——此刻外围死士正与魔僧拉开了三丈空档，正是决定全盘战局的收网一瞬！'),
    ],
    choices: [
      {
        id: 'slq31_net_precision',
        label: '【精准卡拍收网】借死角瞬落精钢链网先绞翻外围一品堂死士，孤立黑水魔僧 1v1 决杀！',
        subLabel: '跳过外围死士波次，单挑阵脚孤立的黑水魔僧（怒目杀业 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需西侧古柏暗道绝妙布阵，或棋艺 ≥ 45，或策论 ≥ 45',
          conditions: [
            { type: 'flag', flag: 'sl_q31_trap_perfect', op: 'truthy', label: '西侧古柏暗道绝妙布阵' },
            { type: 'skillAtLeast', key: '棋', min: 45 },
            { type: 'skillAtLeast', key: '策论', min: 45 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q31_net_mode', value: 'snared' },
          openScene('scene_slq31_04_snared', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'slq31_net_gauntlet',
        label: '【鸣号强攻合围】即刻发号亮起满坪火把，正面车轮连战一品堂死士与黑水魔僧！',
        subLabel: '零门槛正面死战（车轮连战：一流中品死士 → 宗师下品黑水魔僧）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_net_mode', value: 'gauntlet' },
          openScene('scene_slq31_05_gauntlet', SHAOLIN_Q31_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq31_04_snared: {
    id: 'scene_slq31_04_snared',
    title: '第四幕 · 天罗锁敌 · 孤斩魔僧',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪（1v1 决战宗师下品）',
    mandatory: true,
    beats: [
      N('你抓住三丈空档一声清啸：“收网——伏魔！”霎时间藏经阁内外火把齐明、照如白昼！十二张浸油精钢链网自琉璃飞檐与古柏枝桠轰然罩落，不偏不倚将外围两名一品堂黑甲死士当场绞翻捆死，被玄痛、玄寂率武僧瞬间擒拿！'),
      S(SPEAKER_BLACKWATER_MONK, '（惊怒交加，拍碎雕花木窗跃落前坪，掣出厚背西夏弯月大刀劈断两条铁链）“好歹毒的少林小辈！竟用假密室与天罗网断我羽翼？也罢，拿你人头祭我西夏铁骑！”'),
      S('NPC-0134', '（一拍两散掌硬震魔僧半步，沉喝道）“外围死士已尽数就擒，魔僧又被铁网耗去三成真气！{playerName}，孤身斩此魔头！”'),
      N('火光映照弯刀寒芒，退路尽绝的黑水魔僧挟宗师下品之威悍然扑来！'),
    ],
    choices: [
      {
        id: 'slq31_fight_1v1',
        label: '催动毕生绝学，1v1 正面决杀西夏一品堂【黑水魔僧】（宗师下品）！',
        subLabel: '羽翼已剪，于伏魔天罗阵中亲手伏诛黑水魔僧',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q31_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBlackwaterMonkBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '天罗铁网已合，身后便是少林千年藏经阁，绝无退步之理！',
            introText: '【天罗锁敌 · 孤斩魔僧】1v1 正面迎战西夏一品堂宗师客卿【黑水魔僧（宗师下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q31_battle_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q31_battle_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq31_06_slay', SHAOLIN_Q31_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '黑水魔僧困兽犹斗凶猛异常，幸得玄痛、玄寂挺棍架住追击！调息后可于【重檐琉璃藏经主阁】再战。',
                'warn',
                '暗布天罗',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq31_05_gauntlet: {
    id: 'scene_slq31_05_gauntlet',
    title: '第四幕 · 破网血战 · 车轮截魔',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪（车轮连战）',
    mandatory: true,
    beats: [
      N('你一声清啸引燃满坪火把，三十六名武僧齐拉精钢链网合围而下！然黑水魔僧警觉极高，反手震碎东窗跃落石坪，身旁一品堂黑甲死士亦挥刀砍裂网角抢身护主！'),
      S(SPEAKER_YIPINTANG_GUARD, '（狞笑提刀封住前坪台阶）“想动魔僧法王？先踏过我一品堂黑甲死士的尸体！”'),
      S('NPC-0156', '（纵身拦死东侧缺口，厉声大喝）“武僧结阵锁住四方退路，莫放一人下山！{playerName}，你先斩开死士先锋，再正面结果黑水魔僧！”'),
      N('刀光与棍影在冲天火光中交错，你沉步踏前，准备连破死士与宗师魔僧！'),
    ],
    choices: [
      {
        id: 'slq31_fight_gauntlet',
        label: '死战不退！车轮连战【一品堂黑甲死士】与【黑水魔僧】（一流中品 → 宗师下品）！',
        subLabel: '连破死士先锋与西夏魔僧，誓保兵书不失',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q31_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYipintangGuard() },
            extraOpponents: [{ kind: 'custom', npc: buildBlackwaterMonkBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '天罗铁网已合，身后便是少林千年藏经阁，绝无退步之理！',
            introText: '【天罗血战 · 车轮截魔】连战【一品堂黑甲死士（一流中品）】与【黑水魔僧（宗师下品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q31_battle_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q31_battle_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq31_06_slay', SHAOLIN_Q31_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '敌方困兽反扑凶烈，玄痛与武僧合力替你挡下重刀！调息后可于【重檐琉璃藏经主阁】重整收网。',
                'warn',
                '暗布天罗',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq31_06_slay: {
    id: 'scene_slq31_06_slay',
    title: '第五幕 · 子夜斩魔 · 铁腕抉择',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    illustrationUrl: '/assets/quests/sl_31_slay_blackwater.jpg',
    illustrationCaption: '子夜斩魔 · 琉璃阁前火光冲天，一击击毙西夏一品堂黑水魔僧',
    mandatory: true,
    beats: [
      N('火海般的拳风刀影激战数十合！黑水魔僧受天罗铁网掣肘，终在你绵密刚猛的少林绝学压迫下露出空门！你低喝一声佛号，十成纯厚内力破开其西夏玄功气墙，轰然印在其胸口檀中大穴——魔僧惨嚎一声，弯刀脱手，倒撞石阶当场气绝伏诛！'),
      N('你俯身从黑水魔僧怀中搜出完好无损的宋夏边防古阵图与少林棍阵秘录，又在其贴身锦囊摸出一枚刻满西夏党项铭文的「一品堂玄铁令」！'),
      S('NPC-0156', '（抚掌大笑，神色冷峻振奋）“痛快！这黑水魔僧横行西北多年，今夜竟栽在{playerName}亲手布下的天罗铁网里！三十六名武僧无一折损，全赖师侄运筹周密！”'),
      S('NPC-0134', '（望向石阶上黑水魔僧尸身，沉声问你）“西夏一品堂屡次犯我山门，今番既已格毙其大供奉，尸首与玄铁令究竟该如何处置，以昭少林铁律？”'),
    ],
    choices: [
      {
        id: 'slq31_decree_display',
        label: '【悬首示警 · 震慑西夏群宵】将黑水魔僧首级与玄铁令悬于少室山口三日，教群宵胆寒！',
        subLabel: '雷霆立威、江湖威望更高（怒目杀业 +2）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_corpse_decree', value: 'display' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q31_decree_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q31_decree_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
          },
          openScene('scene_slq31_07_prestige', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'slq31_decree_bury',
        label: '【留其全尸 · 只携密令回禀方丈】除魔只为护边关万民，既已伏诛便埋骨荒山，不辱尸首',
        subLabel: '铁血而存佛门底线、额外侠义（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_corpse_decree', value: 'bury' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q31_decree_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q31_decree_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq31_07_prestige', SHAOLIN_Q31_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq31_07_prestige: {
    id: 'scene_slq31_07_prestige',
    title: '第六幕 · 黎明传捷 · 铁血威望',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    illustrationUrl: '/assets/quests/sl_31_iron_prestige.jpg',
    illustrationCaption: '铁血威望 · 晨光下众武僧齐声合十致敬，铁血护寺之名震动全寺',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q31_corpse_decree=display|黎明未至，黑水魔僧首级与一品堂玄铁令已高悬少室山门外石柱之上，消息传开，潜伏登封与洛阳的西夏细作闻风丧胆、连夜遁逃！|天色微明，众武僧遵你之命将黑水魔僧全尸掩埋荒山并默诵往生咒，唯将那枚沾血的一品堂玄铁令与边防阵图封呈方丈院！}'),
      N('昨夜藏经阁伏魔斩敌之捷报如春雷传遍各院！罗汉、达摩、戒律、菩提诸院数百名僧众闻讯赶来，见前坪断链焦石与完好兵书，无不肃然动容！'),
      N('三十六名并肩血战的少林武僧齐刷刷单掌竖胸，向你深深行礼高诵：“阿弥陀佛！拜见伏魔真传！”晨光映照染血僧衣，你眉宇间已具镇慑群魔的铁血宗师气象。'),
    ],
    onFinishEffects: [openScene('scene_slq31_08_shadows', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_08_shadows: {
    id: 'scene_slq31_08_shadows',
    title: '第七幕 · 暗影犹存 · 固防筹策',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      P('（微颔首还礼，心中却未松懈半分，低声对玄痛、玄寂道）“二位师叔，黑水魔僧虽已伏诛，然其西夏密宗路数与七夕夜在二楼无声对掌的那两位绝顶人物截然不同——藏经阁最深的暗流，恐怕尚未浮出水面。”'),
      S('NPC-0156', '（沉重点头）“不错！然经此一役，天下宵小皆知我藏经阁铁网森严，纵有狼子野心之辈，也须先掂量掂量自己的项上人头！”'),
      S('NPC-0134', '（拍着你肩头郑重宣谕）“玄慈方丈已降法旨：记你护寺首功一件，赏贡献三百，并准你协同戒律院总揽藏经阁与全寺禁地防务！接下来你欲如何加固暗防？”'),
    ],
    choices: [
      {
        id: 'slq31_fortify_mechanisms',
        label: '【加固天罗铁网】命工匠改良飞檐精钢机关与无声警铃丝，将藏经阁筑成铜墙铁壁',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_defense_plan', value: 'mechanisms' },
          openScene('scene_slq31_09_settle', SHAOLIN_Q31_QUEST_ID),
        ],
      },
      {
        id: 'slq31_fortify_intel',
        label: '【顺藤摸瓜暗查】派干练武僧循一品堂玄铁令暗查洛阳与边关内应，主动出击断其耳目',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q31_defense_plan', value: 'intel' },
          openScene('scene_slq31_09_settle', SHAOLIN_Q31_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq31_09_settle: {
    id: 'scene_slq31_09_settle',
    title: '第八幕 · 兵书归橱 · 铁血铸心',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('你亲手将夺回的宋夏边防古阵图与少林棍阵秘录重新封入樟木暗橱。{ifFlagEq:sl_q31_defense_plan=mechanisms|工匠按你图纸在重檐暗梁加装了双层精钢机括，整座藏经阁固若金汤。|戒律院精干耳目亦携玄铁令拓片悄然下山，直追西夏一品堂在中原的暗桩脉络。}'),
      N('不出半月，少林真传弟子于藏经阁前布阵斩毙西夏一品堂宗师客卿「黑水魔僧」之讯便传遍中原武林，江湖正道无不拍手称快！'),
      N('玄痛与玄寂并肩送你出阁，眼中满是托付少林未来之期许。铁血伏魔之路已定，你的威名与担当，正一步步迈向少林堂院首座之尊。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_pavilion', value: 'ironfist' },
      { type: 'giveCombatExp', amount: 820, reason: '铁血伏魔 · 暗布天罗' },
      { type: 'addSectContribution', amount: 300 },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q31_trap_perfect', op: 'truthy' },
        thenEffects: [{ type: 'addSectContribution', amount: 60 }],
        elseEffects: [],
      },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q31_corpse_decree', op: 'eq', value: 'display' },
        thenEffects: [
          { type: 'modifyRenown', delta: 110, reason: '藏经阁斩毙西夏黑水魔僧并悬首示警震慑群宵' },
        ],
        elseEffects: [
          { type: 'modifyRenown', delta: 80, reason: '藏经阁斩毙西夏黑水魔僧' },
          { type: 'modifyChivalry', delta: 30, reason: '铁血伏魔而不辱尸，留全尸埋骨荒山' },
        ],
      },
      { type: 'modifySkill', key: '策论', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 25 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 25 },
      { type: 'completeQuest', questId: SHAOLIN_Q31_QUEST_ID, outcome: 'completed' },
      toast(
        '《铁血伏魔 · 暗布天罗》完结！实战经验 +820，师门贡献 +300，策论 +2，经义 +1，玄痛、玄寂好感 +25！',
        'success',
        '暗布天罗',
      ),
      openScene('scene_slq31_10_epilogue', SHAOLIN_Q31_QUEST_ID),
    ],
  },

  scene_slq31_10_epilogue: {
    id: 'scene_slq31_10_epilogue',
    title: '第九幕 · 钟鸣嵩岳 · 伏魔剑出',
    subtitle: '嵩山少林寺 · 藏经阁',
    mandatory: true,
    beats: [
      N('嵩岳秋风猎猎，伏魔铜钟震彻云霄。藏经阁重檐之下精钢暗网寒光微敛，三十六名轮值武僧步履沉稳如铁墙。'),
      N('你立于石阶前遥望西北边陲，掌中纯厚真气隐隐如雷霆欲动，耳畔犹回响着昨夜斩魔时众僧齐诵的佛号。'),
      P('（眸光如电，按掌沉声自誓）“无论西夏一品堂还是潜藏中原的幕后暗影再起何等波澜，少林铁血护法之剑，今日已然出鞘！”'),
    ],
  },
}
