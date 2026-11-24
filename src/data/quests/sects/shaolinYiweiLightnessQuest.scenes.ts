import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q21_QUEST_ID } from './shaolinYiweiLightnessQuest'

const SPEAKER_CLOUD_SWALLOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '云中燕',
  title: '西夏一品堂 · 轻功谍探',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
}

const SPEAKER_SCOUT_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '山门巡夜僧',
  title: '嵩山少林寺 · 戒律巡哨',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildCloudSwallowBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ21_CLOUD_SWALLOW',
    name: '云中燕',
    title: '西夏一品堂 · 轻功谍探',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '一品堂密探',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    talk: '“少林真传竟能踏苇追我十里至此！这洛水急流湍急无比，今日便让你葬身鱼腹！”',
    stats: { hp: 2680, mp: 1880, agi: 78, res: 52 },
    talents: { bone: 80, comprehension: 82, charm: 68 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-245', level: 7 }, { artId: 'MA-133', level: 7 }, { artId: 'MA-076', level: 7 }],
  })
}

function buildCloudSwallowCorneredBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ21_CLOUD_SWALLOW_CORNERED',
    name: '云中燕（截流失据）',
    title: '西夏一品堂 · 轻功谍探',
    realm: '一流下品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 2,
    sectRankLabel: '一品堂密探',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    talk: '“可恶！渡路被截、进退失据……拼着折损十年功力，本姑娘也要与你鱼死网破！”',
    stats: { hp: 2260, mp: 1620, agi: 70, res: 46 },
    talents: { bone: 80, comprehension: 82, charm: 68 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-245', level: 6 }, { artId: 'MA-133', level: 6 }, { artId: 'MA-076', level: 6 }],
  })
}

const TEACH_YIWEI_IF_MONK: QuestEffect = {
  type: 'branch',
  condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
  thenEffects: [teachArtNow('MA-057')],
  elseEffects: [],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq21_01: {
    id: 'scene_slq21_01',
    title: '第一幕 · 飞瀑听涛',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山后谷霜叶如丹。十丈白练自悬崖倾泻而下，砸入碧绿深潭，水雾弥漫如烟；青石岸畔，清癯干瘦、披着素灰旧僧袍的「芦苇尊者」玄渡正负手望水，衣袂在狂暴瀑风中纹丝不动。'),
      S('NPC-0135', '（缓缓回首，双目澄澈如涧底寒泉）“阿弥陀佛！新晋真传果然气象一新。{ifFlagEq:sl_branch=luohan|你在罗汉堂连破十八铜人三才六合大阵，刚猛筋骨已成气候；|}{ifFlagEq:sl_branch=damo|你在寒玉榻前问禅破障、独退姑苏慕容暗探，禅智根基极深；|}{ifFlagEq:sl_branch=jielv|你在戒律药王一脉辨奸止毒、明法济世，进退最合佛门法度；|}{ifFlagEq:sl_branch=layman|你以白衣俗家之身领护法都统重任，忠勇护寺，寺中长老无不赞许；|}只是真传之路山高水长，身法若滞，纵有绝世拳剑亦难追魔救危。”'),
      P('（合十躬身，于瀑声中朗声行礼）“弟子拜见玄渡师伯！蒙方丈与诸位首座垂训，特来试炼涧向师伯请益少林至高轻功《一苇渡江》！”'),
      S('NPC-0135', '（颔首微笑，顺手自潭畔折下一枝干枯芦苇）“经义逾七十，想必读透了《金刚经》『应无所住而生其心』。只是口头禅易诵，水上步难行——老衲先演一遍，你且看清这枝枯芦为何不沉！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_02', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_02: {
    id: 'scene_slq21_02',
    title: '第二幕 · 一苇凌波 · 观潭悟诀',
    subtitle: '飞瀑深潭 · 借力参禅',
    illustrationUrl: '/assets/quests/sl_21_waterfall_reed.jpg',
    illustrationCaption: '飞瀑深潭 · 芦苇尊者玄渡足尖轻点一枝枯芦，于十丈飞瀑水雾中凌波横渡深潭',
    mandatory: true,
    beats: [
      N('玄渡手腕轻抖，那根拇指粗细的枯芦竟如利箭平射三丈，稳稳浮在飞瀑冲击最烈、浊浪翻涌的潭心！话音未落，玄渡身形已如一缕青烟掠出青石，足尖在漂浮枯芦上轻轻一触即离！'),
      N('令人屏息的是，那枝枯芦既未折断，亦未没入水底，只微微下沉半寸便借浪花弹回水面；玄渡则趁这丝毫厘反震，迎着漫天瀑雾横掠十丈，稳稳落于对岸青岩，灰色僧袍下摆竟未沾湿半滴潭水！'),
      N('旋即玄渡折身踏波而返，双目如电锁定你的眉心。水雾扑面而来，你脑海中反复回放方才足尖点苇的一瞬，心中骤然泛起三种截然不同的体悟——'),
      S('NPC-0135', '“看真切了么？世人常误以为达摩初祖折苇渡江是神通幻术，实则全在一字心诀。师侄你且直言，方才老衲足点枯芦而不陷深潭，凭的究竟是什么劲路？”'),
    ],
    choices: [
      {
        id: 'slq21_insight_force',
        label: '“全凭丹田真气一口吐尽，以强横轻功硬抗水压、凌空拔高十丈方能不沉！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_reed_insight', value: false },
          openScene('scene_slq21_03', SHAOLIN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'slq21_insight_borrow',
        label: '“非以死力硬抗水压，而是留三分余力于涌泉，足尖轻点随波借势、因水浮力生力！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_reed_insight', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_insight_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q21_insight_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          TEACH_YIWEI_IF_MONK,
          openScene('scene_slq21_03', SHAOLIN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'slq21_insight_glide',
        label: '“须将身形压至极低贴水滑行，以双袖兜风借瀑流气流托身，足下芦苇只是虚晃！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_reed_insight', value: false },
          openScene('scene_slq21_03', SHAOLIN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq21_03: {
    id: 'scene_slq21_03',
    title: '第三幕 · 涌泉印心 · 三日初成',
    subtitle: '飞瀑深潭 · 口诀秘授',
    mandatory: true,
    beats: [
      S('NPC-0135', '{ifFlag:sl_q21_reed_insight|（抚掌大笑，眼中精芒大盛）“善哉！一语中的！常人练轻功只知拼命提气拔高，气尽则坠；唯我少林《一苇渡江》讲究借水而不陷水、踏虚而不滞虚！丹田真气切莫一口吐尽，三分向下借势、七分向前牵引，你竟一眼看穿了！”|（微微摇头，温言点破）“差之毫厘，谬以千里！若一口气吐尽硬抗水压，力竭便坠入深潭；若只靠袖风兜气，逆风急浪之下寸步难行。真正窍门在于留三分余力于足底涌泉——借水势而不抗水压，足尖轻点随波生力，方能十里不竭！”}'),
      N('{ifFlagEq:sl_branch=layman|玄渡随即在青石畔为你细剖踏水借力与外家步法腾挪的共通关窍，虽依祖训禅门秘传身法不授俗家，却将涌泉吞吐的实战精义倾囊点化；|玄渡随即盘膝坐于青石之上，将《一苇渡江》三十六字真气运行心法、足底涌泉穴瞬息吞吐的窍门逐字逐句倾囊相授；}一连三日，你在飞瀑深潭畔废寝忘食反复苦试。'),
      N('头一日落水十余次，浑身湿透仍不气馁；第二日已能踏浮木连渡五丈；待第三日暮色苍茫时，你足尖连点三枝枯芦，终于一口气迎着瀑风横掠深潭、衣角滴水不沾！'),
      S('NPC-0135', '（含笑颔首）“三日便摸到门径，老衲当年可足足泡了半月冷水！不过轻功一道，终须在生死疾追之中方能真正融会贯通……”'),
    ],
    onFinishEffects: [TEACH_YIWEI_IF_MONK, openScene('scene_slq21_04', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_04: {
    id: 'scene_slq21_04',
    title: '第四幕 · 山门急报 · 授命急追',
    subtitle: '飞瀑深潭 · 窃卷警讯',
    mandatory: true,
    beats: [
      N('玄渡话音方落，忽见一名山门巡夜僧踉跄奔入山涧，左肩僧袍被划开寸许血口，手中紧紧攥着半截泛着幽蓝寒光的燕尾青铜镖！'),
      S(SPEAKER_SCOUT_MONK, '“报——玄渡师叔不好了！方才有一名身法诡绝如鬼魅的蒙面女贼潜入客堂东厢，打伤两位执勤师兄，窃走了洛阳府暂存本寺的《豫西关隘防务手札》！她正借暮色往西北洛水方向遁逃，诸位师兄追之不及！”'),
      S('NPC-0135', '（接过羽镖凝眸一瞥，脸色骤沉）“燕尾青铜镖，西夏一品堂轻功名探——【云中燕】！此女一手《燕子三抄水》独步西北，若任她渡过洛水急流将防务手札送出关外，豫西百姓危矣！老衲旧腿伤未愈，师侄可敢即刻下山追击？”'),
      P('（抱拳肃然，涌泉真气已隐隐鼓荡）“防务手札关乎大宋疆土安危，弟子义不容辞！这就下山将云中燕生擒归寺！”'),
    ],
    choices: [
      {
        id: 'slq21_accept_probe',
        label: '【详询敌踪破绽】先向玄渡问清《燕子三抄水》三起换气规律，再领命下山追击！',
        subLabel: '开启【飞瀑深潭 · 一苇渡江】追谍阶段，并记下西夏轻功换气破绽',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_studied_swallow', value: true },
          { type: 'startQuest', questId: SHAOLIN_Q21_QUEST_ID, stepId: 'luoshui_chase' },
          setStep(SHAOLIN_Q21_QUEST_ID, 'luoshui_chase'),
          openScene('scene_slq21_05', SHAOLIN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'slq21_accept_rush',
        label: '【刻不容缓直追】军情如火，辞别师伯即刻折苇踏风直扑洛水拦截！',
        subLabel: '开启【飞瀑深潭 · 一苇渡江】追谍阶段，全速疾追云中燕',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_studied_swallow', value: false },
          { type: 'startQuest', questId: SHAOLIN_Q21_QUEST_ID, stepId: 'luoshui_chase' },
          setStep(SHAOLIN_Q21_QUEST_ID, 'luoshui_chase'),
          openScene('scene_slq21_05', SHAOLIN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq21_05: {
    id: 'scene_slq21_05',
    title: '第五幕 · 少室疾奔 · 洛水断渡',
    subtitle: '少室山道 → 洛水岸畔',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q21_studied_swallow|玄渡急嘱《燕子三抄水》连点三步后必有半息提气停顿，须紧咬其第三步落势截击；你牢记于心，|你辞别玄渡，毫不迟疑，}足下涌泉真气一吐，身形化作一道青灰残影掠出少室山门！山道松影倒飞如箭，十里外官道岔口赫然瞥见前方半里处一道背负牛皮密筒的墨蓝倩影正凌空疾掠！'),
      N('转眼间前方水声轰鸣，秋汛未退的滔滔洛水横亘眼前！月色寒江波涛翻滚，岸边三艘官渡渔船竟已被云中燕提前凿穿船底，只剩半截桅杆在漩涡中沉浮！'),
      S(SPEAKER_CLOUD_SWALLOW, '（立于岸边芦苇荡中冷笑回眸，足尖轻点枯木）“少林真传果然好脚力，竟能咬着本姑娘不放！可惜渡船尽沉、秋水寒骨，且看你如何渡过这百丈洛水急流——”'),
      N('话音未落，云中燕施展《燕子三抄水》贴浪飞掠江心，反手还扬出数枚燕尾冷镖封锁近岸漂木！你目光一扫：江面枯芦随波起伏，南岸浅滩尚有几户老船夫泊着未遭破坏的乌篷快舢，此刻正是决定截杀成败的一瞬！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q21_river_reached', value: true },
      openScene('scene_slq21_06', SHAOLIN_Q21_QUEST_ID),
    ],
  },

  scene_slq21_06: {
    id: 'scene_slq21_06',
    title: '第六幕 · 踏苇十里 · 洛水三策',
    subtitle: '洛水急流 · 截击云中燕（实战）',
    illustrationUrl: '/assets/quests/sl_21_luoshui_chase.jpg',
    illustrationCaption: '洛水急流 · 月色寒江波涛汹涌，你折芦掷水施展《一苇渡江》，踏苇十里直追云中燕',
    mandatory: true,
    beats: [
      N('月光洒满滚滚浊浪，云中燕已窜出十余丈外，正欲借江心礁石换气、再渡北岸接应暗船！秋风呼啸间，数道涂满西夏麻药的燕尾寒芒封死了直追去路。'),
      N('上游激流冲下大束枯芦，浅滩几名夜渔老船夫亦被动静惊动探出头来；若任云中燕抢先登上北岸接应小舟，豫西防务手札便再难追回！'),
      P('（立于寒风岸畔，心念电转，瞬息定下洛水截敌之策）“云中燕，今夜这洛水急流，便是你的折翼之处！”'),
    ],
    choices: [
      {
        id: 'slq21_tactic_reed',
        label: '【踏苇截流先断渡船】折芦掷浪斜切上游急流，抢先一步震沉北岸接应小舟断其退路！',
        subLabel: '需先前悟透借水真谛或实战身法 ≥ 60 · 令其心慌失据 1v1 轻取（胜后禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q21_reed_insight', op: 'truthy' },
            { type: 'combatStatAtLeast', key: 'agility', min: 60 },
          ],
          hint: '需先前于飞瀑深潭悟透借水真谛，或实战身法 ≥ 60',
        },
        effects: [
          toast('你借水势斜掠上游，抢先震沉北岸接应小舟、反身封死江心礁石！云中燕惊骇失措，阵脚大乱！', 'success', '踏苇截流'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallowCorneredBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '防务手札就在云中燕背上，绝不可纵敌逃往北岸！',
            introText: '【洛水江心 · 踏苇截流】北岸退路已断，迎战心慌失据的西夏谍探【云中燕】（一流下品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q21_tactic', value: 'reed' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q21_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q21_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq21_07', SHAOLIN_Q21_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('云中燕困兽犹斗、双弯刀极为凌厉！调息后可再赴【飞瀑深潭 · 试炼涧】续追截击。', 'warn', '洛水追谍'),
            ],
          },
        ],
      },
      {
        id: 'slq21_tactic_boats',
        label: '【掷银雇船夫拦江围堵】掷 30 两纹银请老船夫急划乌篷舢板扯起渔网拦江逼停！',
        subLabel: '需 30 两纹银（已雇船重试免复费）· 逼其困守江心礁石 1v1 破敌（胜后禅心慈悲 +1）',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q21_boats_hired', op: 'truthy' },
            { type: 'silverAtLeast', min: 30 },
          ],
          hint: '需 30 两纹银雇佣洛水船夫拦江围堵（已付则免复费）',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_boats_hired', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -30, reason: '洛水急流重金雇佣夜渔船夫扯网拦江围堵西夏谍探' },
              { type: 'setFlag', flag: 'sl_q21_boats_hired', value: true },
              toast('三十两纹银落入船舱，数艘乌篷快舢齐声吆喝扯起粗麻大网横截江面，硬生生将云中燕逼落江心孤礁！', 'success', '拦江围堵'),
            ],
            elseEffects: [
              toast('洛水船夫早已扯网封住北岸水路，无需再费银两，纵身踏苇直扑江心孤礁！', 'talk', '再截云中燕'),
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallowCorneredBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '船夫已合力拦江，必须当场生擒云中燕夺回防务手札！',
            introText: '【洛水江心 · 拦江围堵】麻网封路、孤礁无援，迎战失据的【云中燕】（一流下品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q21_tactic', value: 'boats' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q21_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q21_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq21_07', SHAOLIN_Q21_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些被云中燕弯刀逼落江心！调息后可再续追截（船夫已雇定，无需再付银两）。', 'warn', '洛水追谍'),
            ],
          },
        ],
      },
      {
        id: 'slq21_tactic_charge',
        label: '【轻功硬追正面死战】不假外力，踏苇破开七道毒镖直追江心硬撼全盛云中燕！',
        subLabel: '零门槛正攻 · 直面全盛一流下品云中燕（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCloudSwallowBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '洛水激流汹涌，唯有正面生擒此贼方能保住防务手札！',
            introText: '【洛水江心 · 硬追死战】破开漫天燕尾毒镖，正面力战全盛【云中燕】（一流下品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q21_tactic', value: 'charge' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q21_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q21_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq21_07', SHAOLIN_Q21_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些被云中燕的西夏弯刀与暗镖逼落江心！调息后可再赴【飞瀑深潭 · 试炼涧】续追云中燕。', 'warn', '洛水追谍'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq21_07: {
    id: 'scene_slq21_07',
    title: '第七幕 · 险礁破刀 · 夺卷生擒',
    subtitle: '洛水江心礁石 · 身法压制',
    illustrationUrl: '/assets/quests/sl_21_cloud_swallow.jpg',
    illustrationCaption: '洛水生擒 · 浪花飞溅间，你以少林擒拿手法扣住云中燕脉门，完好夺回《豫西关隘防务手札》',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q21_tactic=reed|北岸接应小舟沉没，云中燕锐气先泄三分；|}{ifFlagEq:sl_q21_tactic=boats|渔网横江封死水路，云中燕退无退处；|}{ifFlagEq:sl_q21_tactic=charge|你硬生生踏苇冲破七道毒镖抢占孤礁，气势如虹；|}礁石方寸之地，云中燕本想凭鬼魅步法绕背偷袭，却骇然发现你的步法比她更快半分，微步借势间竟将她的月牙弯刀路数尽数封死！'),
      N('三十余合激斗后，你精准捕捉到她收刀换气的刹那，左掌疾推震飞其左手弯刀，右手如铁钳般扣住她右腕脉门！“当啷”一声，右手短弯刀坠入洛水浊浪！'),
      N('你顺势点住她肩井、曲池两处大穴，一把扯下她背负的牛皮密筒——蜡封完好无损，《豫西关隘防务手札》分毫未泄，怀中更滑出一封用西夏密字写就的豫西暗桩联络笺！'),
      S(SPEAKER_CLOUD_SWALLOW, '（面色惨白，咬唇冷笑）“输在少林《一苇渡江》手下……我云中燕无话可说！只是中原武林别得意太早，一品堂高手如云，这不过是开始罢了！”'),
    ],
    onFinishEffects: [openScene('scene_slq21_08', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_08: {
    id: 'scene_slq21_08',
    title: '第八幕 · 岸畔发落 · 谍探处置',
    subtitle: '洛水南岸 · 审讯权衡',
    mandatory: true,
    beats: [
      N('你提着被点住穴道的云中燕纵身踏苇返回洛水南岸，火把映照芦苇荡，数名奉命策应的少林巡山武僧已持棍赶至将贼人团团围住。'),
      S(SPEAKER_SCOUT_MONK, '（见密筒完好、西夏女谍生擒在手，又惊又喜）“师兄神威！只是这西夏一品堂名探轻功极诡，押解途中有极大逃脱之险，更藏着西夏在洛阳与开封的暗桩密信——不知师兄意下如何处置此贼？”'),
      N('寒江夜风猎猎，云中燕昂首闭目、一副死猪不怕开水烫的模样。是留她全功活口押交开封府深查西夏暗线，还是当场搜清密信、震废其足底轻功经脉逐出中原以绝后患？'),
    ],
    choices: [
      {
        id: 'slq21_verdict_kaifeng',
        label: '【押解开封府深查暗线】留其活口连同密信移交官府审断，顺藤摸瓜拔除西夏暗桩！',
        subLabel: '遵大宋国法深挖幕后谍网（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_verdict', value: 'kaifeng' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q21_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq21_09', SHAOLIN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'slq21_verdict_cripple',
        label: '【搜信废功逐出中原】当场搜清西夏密信，震断其轻功足脉后逐出关外以绝后患！',
        subLabel: '雷霆手段永断此女再潜少林之能（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q21_verdict', value: 'cripple' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q21_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq21_09', SHAOLIN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq21_09: {
    id: 'scene_slq21_09',
    title: '第九幕 · 携卷返山',
    subtitle: '洛水南岸 · 启程复命',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q21_verdict=kaifeng|你以麻绳重重缚住云中燕，嘱巡山武僧连夜交由洛阳府转解开封府严加审讯，并妥善封存那封西夏密信；云中燕冷哼一声，却也不得不佩服少林弟子行事堂正守法。|你搜清她怀中全部西夏暗桩密信后，二指疾点震断其双足涌泉轻功筋脉；云中燕痛呼倒地、满眼怨毒，自此虽保得性命，却永难再施《燕子三抄水》潜入中原半步。}'),
      N('东方天际已微露鱼肚白，洛水涛声在身后渐远。你怀揣完好无损的《豫西关隘防务手札》与西夏密笺，足尖轻点官道青霜，疾驰返回少室山达摩院。'),
      P('（望向晨雾中苍翠峻拔的少室群峰，心境澄澈）“经此洛水十里实战，足底涌泉吞吐愈发随心所欲——该回飞瀑深潭向玄渡师伯复命了！”'),
    ],
    choices: [
      {
        id: 'slq21_return_xuandu',
        label: '怀揣防务手札返回【飞瀑深潭 · 试炼涧】，向玄渡师伯复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q21_QUEST_ID, 'report_xuandu'),
          toast(
            '已生擒云中燕并夺回防务手札！请返回【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】向玄渡复命。',
            'talk',
            '一苇渡江',
          ),
        ],
      },
    ],
  },

  scene_slq21_10: {
    id: 'scene_slq21_10',
    title: '第十幕 · 涧畔复命 · 渡江印心',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('晨光微熹，你重返飞瀑深潭。芦苇尊者玄渡仍在青石岸边静候，见你怀抱完好密筒与西夏密笺归来，衣袍洁净如初，不禁抚掌大慰！'),
      P('（双手呈上牛皮密筒与西夏暗桩密信，躬身复命）“幸不辱命！弟子借师伯所授借水心法追及洛水急流，已力擒西夏轻功谍探云中燕，防务手札分毫未失！”'),
      S('NPC-0135', '（验明封蜡，朗声大笑）“阿弥陀佛！{ifFlag:sl_q21_reed_insight|潭畔一眼悟透借势真谛，洛水之上更能活学活用，|虽在潭畔初悟略费周折，却于洛水急流生死关头真正将身法用活，}{ifFlagEq:sl_q21_verdict=kaifeng|且押解官府顺藤摸瓜查清西夏暗线，甚合大局！|虽以雷霆手段废其轻功逐出关外、略带几分杀伐峻厉，却也护得少林与豫西安宁！}”'),
      N('{ifFlagEq:sl_branch=layman|玄渡欣慰颔首，又将数十年研习外家轻身腾挪的独门札记相赠，虽遵祖训未传禅门秘籍，却令你步法修为大进。|玄渡从袖中取出一卷泛黄的达摩院轻功秘抄，连同自己数十年研习的注疏郑重交付于你：“身轻莫忘心定，步快莫忘禅静——这卷《一苇渡江》全谱今日正式传你！”}'),
    ],
    onFinishEffects: [openScene('scene_slq21_11', SHAOLIN_Q21_QUEST_ID)],
  },

  scene_slq21_11: {
    id: 'scene_slq21_11',
    title: '第十一幕 · 飞瀑长虹',
    subtitle: '嵩山少林寺 · 飞瀑深潭',
    mandatory: true,
    beats: [
      N('朝阳跃出嵩岳东峰，十丈飞瀑在金光中化作一道七彩长虹，轰鸣水声宛若古刹梵音。'),
      P('（向玄渡深深稽首，远眺云海漫峰）“弟子谨记师伯『身轻莫忘心定』之训，他日行走关洛江湖、踏雪赴边，定不负少林真传之名！”'),
      N('{ifFlagEq:sl_branch=layman|虽依祖训《一苇渡江》内家禅门身法不传俗家，但你此役洛水追谍身法已臻化境，真传护法的更深试炼，已然在你脚下徐徐铺开。|你身怀《一苇渡江》绝世轻功，真传单脉的更深试炼，已然在你脚下徐徐铺开。}'),
    ],
    choices: [
      {
        id: 'slq21_complete',
        label: '习得少林绝学《一苇渡江》，圆满完成【飞瀑深潭 · 一苇渡江】',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-057', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-057', level: 1 }],
          },
          {
            type: 'giveCombatExp',
            amount: 580,
            reason: '于飞瀑深潭习得《一苇渡江》，踏苇十里生擒西夏轻功谍探云中燕',
          },
          { type: 'addSectContribution', amount: 200 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_reed_insight', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0135' }, delta: 18 },
          { type: 'completeQuest', questId: SHAOLIN_Q21_QUEST_ID, outcome: 'completed' },
          toast(
            '【飞瀑深潭 · 一苇渡江】圆满完成！习得《一苇渡江》，实战经验 +580、门派贡献 +200、玄渡好感 +18！',
            'success',
            '一苇渡江',
          ),
        ],
      },
      {
        id: 'slq21_complete_layman',
        label: '遵祖训辞谢秘传身法，领受玄渡指点圆满完成【飞瀑深潭 · 一苇渡江】',
        subLabel: '俗家弟子依少林清规不授《一苇渡江》，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'giveCombatExp',
            amount: 780,
            reason: '洛水急流生擒西夏轻功谍探云中燕，获玄渡尊者指点外家步法',
          },
          { type: 'addSectContribution', amount: 200 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q21_reed_insight', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0135' }, delta: 18 },
          { type: 'completeQuest', questId: SHAOLIN_Q21_QUEST_ID, outcome: 'completed' },
          toast(
            '【飞瀑深潭 · 一苇渡江】圆满完成！（俗家不授《一苇渡江》）实战经验 +780、门派贡献 +200、玄渡好感 +18！',
            'success',
            '洛水擒谍',
          ),
        ],
      },
    ],
  },
}
