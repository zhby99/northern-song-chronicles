import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE12_QUEST_ID } from './shaolinSideColdJadeGuardQuest'

const SPEAKER_JADE_DRAGON: StorySpeakerSpec = {
  kind: 'custom',
  name: '玉面毒龙',
  title: '邪派毒盗 · 玉面毒龙',
  factionName: '西域毒龙帮',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_POISON_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '青蛇手',
  title: '毒龙帮先锋毒徒',
  factionName: '西域毒龙帮',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildJadeDragon(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS12_JADE_DRAGON',
    name: '玉面毒龙',
    title: '邪派毒盗 · 玉面毒龙',
    realm: '一流中品',
    factionName: '西域毒龙帮',
    sectRank: 0,
    sectRankLabel: '邪派巨枭',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“十年前玄澄老秃驴废我丹田，今日我炼成冰蚕毒砂邪功归来，少林上下一个也别想活！”',
    stats: { hp: 3120, mp: 2860, agi: 68, res: 57 },
    talents: { bone: 78, comprehension: 72, charm: 42 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-055', move2: 'MA-127' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
      { artId: 'MA-055', level: 8 },
      { artId: 'MA-127', level: 8 },
    ],
  })
}

function buildJadeDragonMiasmaBroken(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS12_JADE_DRAGON_BROKEN',
    name: '玉面毒龙',
    title: '毒囊尽废的邪派毒盗 · 玉面毒龙',
    realm: '一流中品',
    factionName: '西域毒龙帮',
    sectRank: 0,
    sectRankLabel: '邪派巨枭',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“可恶！竟引山泉逆风冲散我的毒瘴、毁了我半身毒囊！纵无毒烟相助，老子这双冰蚕毒掌也要撕碎你！”',
    stats: { hp: 2620, mp: 2320, agi: 60, res: 48 },
    talents: { bone: 78, comprehension: 72, charm: 42 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-055', move2: 'MA-127' },
    learnedArts: [
      { artId: 'MA-081', level: 7 },
      { artId: 'MA-055', level: 7 },
      { artId: 'MA-127', level: 7 },
    ],
  })
}

function buildJadeDragonAntidoteStolen(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS12_JADE_DRAGON_STOLEN',
    name: '玉面毒龙',
    title: '心神大乱的邪派毒盗 · 玉面毒龙',
    realm: '一流中品',
    factionName: '西域毒龙帮',
    sectRank: 0,
    sectRankLabel: '邪派巨枭',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“好快的轻功！把我的冰蚕解药还回来——不杀了你，老子誓不回西域！”',
    stats: { hp: 2740, mp: 2440, agi: 62, res: 50 },
    talents: { bone: 78, comprehension: 72, charm: 42 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-055', move2: 'MA-127' },
    learnedArts: [
      { artId: 'MA-081', level: 7 },
      { artId: 'MA-055', level: 7 },
      { artId: 'MA-127', level: 7 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls12_01: {
    id: 'scene_sls12_01',
    title: '第一幕 · 寒玉石室 · 急报忽至',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}深冬，少室山后峰铅云低垂，达摩面壁石洞外松针挂满冰凌。幽谷石室之内，少林神僧玄澄正盘坐寒玉榻闭目吐纳，周身隐透温润白气，正是借寒玉之气调和十三门绝技刚猛内息的紧要关头。'),
      N('骤然间，洞外传来一阵急促沉重的脚步声。持杵武僧慧真捂着左肩渗血的僧袍，与护经僧慧清匆匆奔入石室门廊，脚步刚定便压低嗓音疾呼。'),
      S('NPC-0322', '“师兄！不好了！后山飞瀑深潭寒峡窜出一股腥甜发苦的碧绿毒瘴，巡山武僧中了伏击晕倒两人，慧真师兄在涧口拦截时也被毒蒺藜擦伤了肩头！”'),
      S('NPC-0255', '“阿弥陀佛……来人自号『玉面毒龙』！十年前他在豫西连屠三家镖局，被玄澄师叔一掌废去邪功逐出中原，谁料这魔头潜逃西域重修冰蚕毒砂邪功，今夜带了七八名毒徒在寒峡设伏，扬言趁师叔闭关把毒烟灌进寒玉石室！”'),
      P('“竟有这等大胆狂徒！玄澄师叔正处周天行功之要隘，外头更有中毒同门待救，万万不可被毒烟惊扰石室！”'),
    ],
    onFinishEffects: [openScene('scene_sls12_02', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_02: {
    id: 'scene_sls12_02',
    title: '第二幕 · 禅定未起 · 请命截魔',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你回头望向石室深处，玄澄长老眉心微蹙，双掌仍合十置于丹田之前；虽已察觉洞外煞气，却正值行功收束之际，若贸然撤功出战极易气血逆冲伤及心脉。'),
      S('NPC-0109', '“……阿弥陀佛。孽障当年留他一命，原望其痛改前非，不意执念成魔。老衲真气归元尚需半炷香功夫，石室不可失守，后峡毒瘴更不可任其漫入。”'),
      S('NPC-0322', '“玄澄师叔安心收功！弟子留守石室门户，以《罗汉伏虎功》封住洞口风眼，绝不教半丝毒雾近榻！”'),
      S('NPC-0255', '“师兄武功已臻高境，不如随小僧同赴飞瀑深潭试炼涧！小僧以韦陀杵挡住外围毒徒，请师兄正面破瘴截杀那玉面毒龙！”'),
    ],
    choices: [
      {
        id: 'accept_cold_jade_guard',
        label: '“慧清师弟护好洞口，我随慧真师兄即刻赴试炼涧破瘴斩魔！”',
        subLabel: '承接支线【寒玉护脉 · 伏虎除魔】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE12_QUEST_ID, stepId: 'ambush_misty_gorge' },
          openScene('scene_sls12_03', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
      {
        id: 'defer_cold_jade_guard',
        label: '“待我先检查随身解毒丹药，片刻便回。”',
        subLabel: '暂缓接取（可随时再来寒玉榻开启）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_side12_start_triggered', value: false },
          toast('你暂且退至石室廊外整备丹药，待备妥后可再返寒玉榻请命。', 'talk', '寒玉护脉'),
        ],
      },
    ],
  },

  scene_sls12_03: {
    id: 'scene_sls12_03',
    title: '第三幕 · 服丹避瘴 · 急赴深涧',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('慧清连忙自怀中取出两枚少林药局秘制的避瘴清心丸递予你与慧真。你含丹入喉，只觉一股清凉药气直透肺腑，顿时神思清明。'),
      S('NPC-0109', '“玉面毒龙所修冰蚕毒功阴寒诡谲，掌风夹带寒毒，切忌久耗缠斗，须以少林阳刚正气破其阴煞。善自珍重！”'),
      P('“弟子谨记师叔提点！慧真师兄，咱们这就动身！”'),
      N('你与慧真飞身掠出幽谷石室，踏着满地霜雪，循着西北风中飘来的淡淡腥甜毒气，疾奔【飞瀑深潭 · 试炼涧】而去。'),
    ],
    onFinishEffects: [
      toast('任务已接取：速赴【达摩面壁石洞 · 飞瀑深潭 · 试炼涧】截杀玉面毒龙！', 'success', '寒玉护脉'),
    ],
  },

  scene_sls12_04: {
    id: 'scene_sls12_04',
    title: '第四幕 · 寒雾深涧 · 毒瘴漫崖',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    illustrationUrl: '/assets/quests/sl_s12_misty_gorge.jpg',
    illustrationCaption: '寒雾深涧飞瀑如练，碧绿毒烟自潭畔青石间袅袅升腾',
    mandatory: true,
    beats: [
      N('刚抵飞瀑深潭试炼涧口，只见百丈飞瀑半数已结作剔透冰帘，寒雾与诡异的碧绿毒瘴交织翻涌。七八名西域毒徒正围着两口铁炉扇风催烟，企图借峡谷气流将毒雾顺风灌向达摩石室。'),
      S(SPEAKER_POISON_SCOUT, '“嘿嘿，风口正好！不出两刻钟，寒玉石室里的老秃驴便要毒发攻心，谷口那两个中了毒砂的小和尚也快撑不住啦！”'),
      N('涧畔覆雪巨石之上，一道瘦长苍白的身影负手而立：面如冠玉却泛青灰，十指指甲乌黑如墨，腰间悬着三只鼓胀毒囊与一只白玉解药瓷瓶，正是邪派巨枭【玉面毒龙】！'),
      S('NPC-0255', '（韦陀杵一震化作金色长虹劈向毒徒阵中，将两口催烟铁炉震翻入潭）“师兄！外围毒徒交由小僧缠住，这魔头与漫峡余瘴便全托付给师兄了！”'),
      S(SPEAKER_JADE_DRAGON, '（冷笑飘落冰岩，十指紫黑煞气森然）“坏我毒炉？也罢，今日先拿你这少林高徒祭我的冰蚕毒砂，再去剖开玄澄的胸膛！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side12_dragon_ready', value: true },
      openScene('scene_sls12_05', SHAOLIN_SIDE12_QUEST_ID),
    ],
  },

  scene_sls12_05: {
    id: 'scene_sls12_05',
    title: '第五幕 · 寒峡破瘴 · 反伏击策',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧（实战多解）',
    illustrationUrl: '/assets/quests/sl_s12_jade_dragon.jpg',
    illustrationCaption: '玉面毒龙凌空扑下，十指黑气森然，与少林护法高徒决战寒涧',
    mandatory: true,
    beats: [
      N('涧口处金铁交鸣，慧真已将众毒徒死死缠在潭东；潭西冰岩之间毒瘴未散，玉面毒龙双掌乌光暴涨，借峡谷下风处浓雾隐现身形，随时准备连发冰蚕毒砂！'),
      N('你眼观六路：上方半冻山泉正悬于逆风崖口，两侧挂雪古松枝桠垂过毒龙顶门，腰间那只白玉解药瓷瓶更在寒雾中隐隐反光。面对这场迷雾寒峡毒瘴伏击，你瞬息择定破局之策——'),
    ],
    choices: [
      {
        id: 'sls12_tactic_spring',
        label: '【逆风引山泉冲散毒瘴再直擒毒龙】勘准谷风走势，劈开冰坝引山泉逆冲毒雾、先毁其贴身毒囊！',
        subLabel: '需算术 ≥ 40 或经义 ≥ 60 · 破瘴废毒囊大幅削弱玉面毒龙（胜后禅心慈悲 +2，战后全回满）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '算术', min: 40 },
            { type: 'skillAtLeast', key: '经义', min: 60 },
          ],
          hint: '需十艺【算术】≥ 40 或【经义】≥ 60',
        },
        effects: [
          toast(
            '你勘准逆风风口，一掌劈开悬崖冰坝，奔涌山泉挟寒风倒卷而下，瞬息冲散毒瘴并浇废玉面毒龙贴身毒囊！',
            'success',
            '引泉破瘴',
          ),
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJadeDragonMiasmaBroken() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '身后便是闭关中的玄澄长老与中毒同门，断无可退！',
            introText:
              '【寒峡破瘴 · 引泉克毒】毒瘴尽散、毒囊失效，趁势正面击败【玉面毒龙（一流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_s12_tactic', value: 'spring' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s12_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_s12_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_sls12_06', SHAOLIN_SIDE12_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '冰蚕寒掌阴毒异常，一时气血翻涌！幸得慧真挥杵逼开毒龙掩护撤回，调息后可于【飞瀑深潭 · 试炼涧】再战。',
                'warn',
                '寒玉护脉',
              ),
            ],
          },
        ],
      },
      {
        id: 'sls12_tactic_agility',
        label: '【借轻功掠树梢突袭抢其解药】踏雪凌松自高空奇袭，先夺腰间冰蚕解药瓷瓶、乱其心神再战！',
        subLabel: '需身法 ≥ 52 · 抢先夺得同门解药并削弱玉面毒龙（胜后禅心慈悲 +1，战后全回满）',
        tone: 'gold',
        condition: { type: 'combatStatAtLeast', key: 'agility', min: 52 },
        effects: [
          toast(
            '你脚尖连点悬松枝梢凌空扑下，指风精准勾走玉面毒龙腰间白玉解药瓶，魔头大骇失措！',
            'success',
            '掠梢夺药',
          ),
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJadeDragonAntidoteStolen() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '身后便是闭关中的玄澄长老与中毒同门，断无可退！',
            introText:
              '【寒峡破瘴 · 掠梢夺药】解药已入手、魔头心神大乱，乘胜力战【玉面毒龙（一流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_s12_antidote_taken', value: true },
              { type: 'setFlag', flag: 'sl_s12_tactic', value: 'agility' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s12_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_s12_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_sls12_06', SHAOLIN_SIDE12_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '冰蚕寒掌阴毒异常，一时气血翻涌！幸得慧真挥杵逼开毒龙掩护撤回，调息后可于【飞瀑深潭 · 试炼涧】再战。',
                'warn',
                '寒玉护脉',
              ),
            ],
          },
        ],
      },
      {
        id: 'sls12_tactic_force',
        label: '【运少林内劲硬闯毒峡正面决战】催动纯阳佛门真气震开碧绿毒雾，正面硬撼玉面毒龙！',
        subLabel: '零门槛正攻 · 直面全盛一流中品玉面毒龙（胜后怒目杀业 +1，战后全回满）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJadeDragon() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '身后便是闭关中的玄澄长老与中毒同门，断无可退！',
            introText:
              '【寒峡破瘴 · 正面伏魔】催动少林纯阳真气硬闯毒瘴，1v1 迎战全盛【玉面毒龙（一流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_s12_tactic', value: 'force' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s12_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_s12_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_sls12_06', SHAOLIN_SIDE12_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '冰蚕寒掌阴毒异常，一时气血翻涌！幸得慧真挥杵逼开毒龙掩护撤回，调息后可于【飞瀑深潭 · 试炼涧】再战。',
                'warn',
                '寒玉护脉',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls12_06: {
    id: 'scene_sls12_06',
    title: '第六幕 · 正气破阴煞 · 处魔抉择',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s12_tactic=spring|山泉冲散毒瘴令玉面毒龙引以为傲的毒囊尽废，招式处处受你阳刚内劲克制；|}{ifFlagEq:sl_s12_tactic=agility|你先手掠梢夺去解药瓷瓶，令玉面毒龙心神大乱、步步急躁露破绽；|}{ifFlagEq:sl_s12_tactic=force|你在漫峡毒雾中以至阳佛门内劲步步紧逼，硬生生将玉面毒龙的阴寒毒掌尽数震散；|}激战数十合，你脚踏金刚步借飞瀑水势反震，一记雷霆重手震碎其护体毒煞，将玉面毒龙轰然击倒在冰岩之上！'),
      S(SPEAKER_JADE_DRAGON, '（口喷乌血瘫倒雪地，双目充满怨毒却已动弹不得）“呃啊——！苦熬十年冰蚕噬骨之痛，竟还是败在少林小辈手里……要杀要剐随你便！”'),
      N('潭东残存的毒徒见帮主落败纷纷跪地求饶，慧真连出数杵尽数点倒，与赶到的罗汉堂巡山武僧匆匆奔至你身侧。'),
      S('NPC-0255', '（捂着伤肩喘息道）“阿弥陀佛！师兄好俊的功夫！山坳里还有两名中了冰蚕毒砂的巡山师弟等着救治——这玉面毒龙昔年便是放过一次才卷土重来，今番该如何处置这魔头？”'),
    ],
    choices: [
      {
        id: 'sls12_verdict_jielv',
        label: '【逼出解药救治同门 · 押送戒律院】封其大穴逼取冰蚕解药救活武僧，生擒交由戒律院依寺规处置！',
        subLabel: '以戒律明正刑罚、不擅动私刑（禅心慈悲 +1，额外增玄澄好感与侠义）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s12_verdict', value: 'jielv' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s12_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s12_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          setStep(SHAOLIN_SIDE12_QUEST_ID, 'return_cold_jade'),
          openScene('scene_sls12_07', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
      {
        id: 'sls12_verdict_cripple',
        label: '【夺取解药 · 废其冰蚕毒功】先取解药救治同门，旋即当场尽废其邪功丹田，永绝后患！',
        subLabel: '断其为祸江湖之根（怒目杀业 +2，额外增江湖声望）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s12_verdict', value: 'cripple' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s12_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_s12_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
          },
          setStep(SHAOLIN_SIDE12_QUEST_ID, 'return_cold_jade'),
          openScene('scene_sls12_07', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls12_07: {
    id: 'scene_sls12_07',
    title: '第七幕 · 风清雾散 · 踏雪回洞',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s12_antidote_taken|你取出方才掠梢先夺到手的白玉解药瓶，再迫玉面毒龙核对服法无误，巡山武僧连忙奔去替两名中毒同门喂服解毒。|你点住玉面毒龙周身要穴，自其怀中搜出冰蚕解药并迫其供明服法，巡山武僧急忙奔去替两名中毒同门喂服解毒。}'),
      N('{ifFlagEq:sl_s12_verdict=jielv|慧真以玄铁镣铐将玉面毒龙与余孽尽数锁牢，押往戒律院候审，又汲潭水将残余毒灰冲刷殆尽。|你面沉如水，一掌按于玉面毒龙丹田震散其苦修十年的冰蚕邪气！魔头惨嚎一声彻底沦为废人，慧真默诵佛号命武僧将其连同余孽一并押下山去。}'),
      S('NPC-0255', '“两处中毒师弟已无性命之忧，小僧先押贼赴戒律院再去药局换药。劳烦师兄先行一步，速回寒玉榻禀报玄澄师叔与慧清师弟，免教他们挂念！”'),
      N('冬日晨光穿透云层洒在冰瀑之上，毒瘴随山风尽散。你轻吐一口浊气，踏雪返回【达摩面壁石洞 · 幽谷石室 · 寒玉榻】。'),
    ],
    onFinishEffects: [
      toast('玉面毒龙已伏法！请返回【幽谷石室 · 寒玉榻】向玄澄长老复命。', 'success', '寒玉护脉'),
    ],
  },

  scene_sls12_08: {
    id: 'scene_sls12_08',
    title: '第八幕 · 石室迎归 · 寒玉指迷',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你步入幽谷石室，守在门廊的慧清见你衣袍虽沾霜雪却神完气足，顿时喜上眉梢，合十迎上前去。'),
      S('NPC-0322', '“师兄回来了！方才洞外毒烟骤歇，小僧便知师兄与慧真师兄必已得手！玄澄师叔方才正好安然收功出定，正等着听你回话呢！”'),
      N('寒玉榻上，玄澄长老缓缓睁开双目，眸中精光内敛、慈悲安详。你上前合十，将飞瀑深潭破瘴擒魔与处置玉面毒龙之始末娓娓道来。'),
      S('NPC-0109', '{ifFlagEq:sl_s12_verdict=jielv|（微微颔首，目光温厚）“阿弥陀佛。能临危救护中毒同门，又以戒律明断魔头而非滥杀逞威，这份仁心与克制难能可贵。老衲护脉周全，皆赖你担当。”|（轻叹一声，神色深沉）“阿弥陀佛。那魔头十年前侥幸逃生竟变本加厉，今日你亲手废其毒功断其恶根，虽出手决绝，亦算免去江湖无数无辜遭难。只是护法降魔之余，切莫令刚猛杀气滞留心脉。”}'),
      N('玄澄示意你在寒玉榻前蒲团坐下，含笑问道：“今番你经历寒峡一战，气息正处破旧立新之机，可愿听老衲先讲哪一门内息护脉心得？”'),
    ],
    choices: [
      {
        id: 'sls12_study_harmony',
        label: '【请教「寒玉静心 · 调和刚猛」之法】问如何以禅定温养经脉、化解兼修绝技之暗伤',
        subLabel: '体悟文火温脉、阴阳互济之玄理',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s12_study', value: 'harmony' },
          openScene('scene_sls12_09', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
      {
        id: 'sls12_study_break',
        label: '【请教「阳刚破煞 · 临敌镇毒」之法】问实战中如何借吐纳瞬震阴寒邪气、护持心脉',
        subLabel: '体悟雷霆发劲、百毒莫近之法门',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s12_study', value: 'break' },
          openScene('scene_sls12_09', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls12_09: {
    id: 'scene_sls12_09',
    title: '第九幕 · 伏虎除魔 · 禅心益坚',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '{ifFlagEq:sl_s12_study=harmony|“武学练至一流之境，外招已非难事，难在经脉承压与气机流转。若只知一味猛进，久必反噬其身；唯有吐纳如寒潭止水、文火温脉，收放自如，方能长久精进。”|“遇阴寒邪毒之辈，最忌心神浮躁致真气外泄。须以丹田一口纯阳底气如洪钟镇守中宫，发劲如飞瀑悬空一泄千里，邪煞自无可乘之隙。”}'),
      N('你依玄澄长老口诀闭目运功一周天，方才寒峡激战残留的一丝寒气滞涩瞬间融化，丹田真气较往日更显凝练圆融！'),
      S('NPC-0109', '“去吧。如今江湖暗流涌动，少林能有你这般栋梁护法，老衲纵使长坐寒玉榻，亦可安心矣。”'),
      P('（合十稽首辞行）“多谢玄澄师叔慈悲点拨！弟子定当常守佛门本心，护持少林法脉！”'),
    ],
    choices: [
      {
        id: 'sls12_complete',
        label: '拜别玄澄长老与慧清，收下护脉嘉奖与内息体悟！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 620, reason: '寒雾深涧破瘴力挫玉面毒龙 · 护持玄澄长老' },
          { type: 'addSectContribution', amount: 200 },
          { type: 'addArtExp', amount: 180 },
          { type: 'modifyChivalry', delta: 35, reason: '破除邪派毒盗玉面毒龙之祸' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0109' }, delta: 18 },
          { type: 'modifyRenown', delta: 60, reason: '完成门派差事《寒玉护脉 · 伏虎除魔》' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s12_tactic', op: 'eq', value: 'spring' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s12_verdict', op: 'eq', value: 'jielv' },
            thenEffects: [
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0109' }, delta: 8 },
              { type: 'modifyChivalry', delta: 10, reason: '救治中毒武僧并依少林戒律处置魔头' },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 15, reason: '亲废玉面毒龙冰蚕邪功震慑江湖邪派' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE12_QUEST_ID, outcome: 'completed' },
          toast(
            '【寒玉护脉 · 伏虎除魔】圆满完成！实战经验 +620，门派贡献 +200，武学修为 +180，侠义 +35，玄澄好感 +18！',
            'success',
            '寒玉护脉',
          ),
        ],
      },
    ],
  },
}
