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
    equippedArts: {
      neigong: 'MA-081',
      qinggong: 'MA-138',
      move1: 'MA-055',
      move2: 'MA-127',
      move3: 'MA-137',
    },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
      { artId: 'MA-138', level: 7 },
      { artId: 'MA-055', level: 8 },
      { artId: 'MA-127', level: 8 },
      { artId: 'MA-137', level: 7 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls12_01: {
    id: 'scene_sls12_01',
    title: '寒玉石室 · 急报忽至',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}深冬，少室山后峰铅云低垂，达摩面壁石洞外松针挂满冰凌。幽谷石室之内，少林神僧玄澄正盘坐于寒玉榻上闭目吐纳，周身隐隐透出一缕温润白气，正是借寒玉之气调和十三门绝技刚猛内息的紧要关头。'),
      N('骤然间，洞外传来一阵急促而沉重的脚步声。持杵武僧慧真一手扶着左肩鲜血渗出的僧袍，与护经僧慧清匆匆奔入石室门廊，脚步刚定便压低嗓音疾呼。'),
      S('NPC-0322', '“师兄！不好了！后山飞瀑深潭那边窜出一股腥甜发苦的碧绿毒烟，巡山沙弥中了暗算晕倒两人，慧真师兄在涧口拦截时也被毒蒺藜擦伤了肩头！”'),
      S('NPC-0255', '“阿弥陀佛……来人自号『玉面毒龙』！十年前他在豫西连屠三家镖局，被玄澄师叔一掌废去邪功逐出中原，谁料这魔头竟潜逃西域重修毒功，今夜带了七八名毒徒摸上后山，扬言要趁师叔行功关口，把毒烟灌进寒玉石室！”'),
      P('“竟有这等大胆狂徒！玄澄师叔正处周天行功之要隘，万万不可被毒烟惊扰！”'),
    ],
    onFinishEffects: [openScene('scene_sls12_02', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_02: {
    id: 'scene_sls12_02',
    title: '禅定未起 · 请命截魔',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你回头望向石室深处，只见玄澄长老眉心微蹙，双掌仍合十置于丹田之前，虽已察觉洞外煞气，却正值行功收束之际，若贸然强行撤功出战，极易气血逆冲伤及心脉。'),
      S('NPC-0109', '“……阿弥陀佛。孽障当年留他一命，原望其痛改前非，不意执念成魔，反修冰蚕毒砂之术。老衲此刻真气归元尚需半炷香功夫，石室不可失守，后涧毒烟更不可任其漫入。”'),
      S('NPC-0322', '“玄澄师叔安心收功！弟子留守石室门户，以《罗汉伏虎功》封住洞口风眼，绝不教半丝毒雾近榻！”'),
      S('NPC-0255', '“师兄武功已臻化境，不如由师兄随小僧同赴飞瀑深潭试炼涧！小僧虽受轻伤，尚能以韦陀杵挡住外围毒徒，只要师兄正面截杀那玉面毒龙，魔焰自熄！”'),
    ],
    choices: [
      {
        id: 'accept_cold_jade_guard',
        label: '“慧清师弟护好洞口，我随慧真师兄即刻赴试炼涧斩魔！”',
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
    title: '服丹避瘴 · 急赴深涧',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('慧清连忙从怀中取出两枚少林药局秘制的避瘴清心丸，分别递予你与慧真。你含丹入喉，只觉一股清凉药气直透肺腑，顿时神思清明。'),
      S('NPC-0109', '“玉面毒龙所修毒功阴寒诡谲，掌风中夹带寒毒，切忌与他久耗缠斗，须以少林阳刚正气破其阴煞。善自珍重！”'),
      P('“弟子谨记师叔提点！慧真师兄，走！”'),
      N('你与慧真飞身掠出幽谷石室，踏着满地霜雪，循着西北风中飘来的淡淡腥甜毒气，疾奔【飞瀑深潭 · 试炼涧】而去。'),
    ],
    onFinishEffects: [
      toast('任务已接取：速赴【达摩面壁石洞 · 飞瀑深潭 · 试炼涧】截杀玉面毒龙！', 'success', '寒玉护脉'),
    ],
  },

  scene_sls12_04: {
    id: 'scene_sls12_04',
    title: '寒雾深涧 · 毒瘴漫崖',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    illustrationUrl: '/assets/quests/sl_s12_misty_gorge.jpg',
    illustrationCaption: '寒雾深涧飞瀑如练，碧绿毒烟自潭畔青石间袅袅升腾',
    mandatory: true,
    beats: [
      N('刚抵飞瀑深潭试炼涧口，只见百丈飞瀑半数已结作剔透冰帘，寒雾与一缕缕诡异的碧绿毒烟交织弥漫。七八名身着西域玄袍的毒徒正围着两口铁炉扇风催烟，企图借山谷上升气流将毒雾顺着石缝吹向达摩石室。'),
      S(SPEAKER_POISON_SCOUT, '“嘿嘿，风口正好！不出两刻钟，那寒玉石室里的老和尚便要经脉冻僵、毒发攻心，到时候帮主亲手摘了他的光头，也算报了十年断脉之仇！”'),
      N('涧畔一块覆雪巨石之上，一道瘦长苍白的身影负手而立。那人面如冠玉却泛着死人般的青灰，双瞳狭长阴鸷，十指指甲乌黑如墨，周身寒气逼得丈许内落雪未落地便凝成冰屑——正是昔年祸乱豫西的邪派巨枭「玉面毒龙」。'),
      S(SPEAKER_JADE_DRAGON, '“嗯？好沉稳的步法……少林寺里倒还藏着一条硬骨头。怎么，玄澄老秃驴缩在洞里不敢出来，只派两个小辈来送死么？”'),
    ],
    onFinishEffects: [openScene('scene_sls12_05', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_05: {
    id: 'scene_sls12_05',
    title: '分兵破炉 · 韦陀镇口',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('你一眼望穿谷中形势：若不先掀翻那两口催烟铁炉，毒烟一旦随山风倒灌石室，玄澄长老纵使武功通玄也难免受扰。'),
      S('NPC-0255', '“师兄！这两口毒炉与外围七八名毒徒交给小僧！小僧以韦陀杵扫平铁炉、锁死涧口，绝不让一人越雷池半步——这玉面毒龙的邪功非比寻常，唯有师兄能正面压制他！”'),
      P('“好！慧真师兄务必保重肩伤，莫贪功冒进，守住风口便是大功！”'),
      N('话音未落，慧真大喝一声“着！”，手中沉重韦陀杵化作一道金色长虹，凌空劈向毒徒阵中！两口铁炉当场被震得翻滚入潭，碧绿炭火遇寒水嗤嗤熄灭，蒸起大片白雾！'),
    ],
    onFinishEffects: [openScene('scene_sls12_06', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_06: {
    id: 'scene_sls12_06',
    title: '玉面露峥嵘 · 寒掌逼人',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    illustrationUrl: '/assets/quests/sl_s12_jade_dragon.jpg',
    illustrationCaption: '玉面毒龙凌空扑下，十指黑气森然，与少林护法高徒决战寒涧',
    mandatory: true,
    beats: [
      S(SPEAKER_JADE_DRAGON, '“哼！坏我毒炉，拿命来赔！”'),
      N('玉面毒龙身形如鬼魅般自巨石飘落，足尖点过冰面竟不留半点裂痕，双掌一错，十股阴寒刺骨的紫黑掌气破雾而来，所过之处连空气都发出细碎的冰裂声！'),
      S(SPEAKER_JADE_DRAGON, '“十年前我栽在玄澄手下，在西域雪窟里拿千条冰蚕喂血、以毒砂洗髓，方才重塑丹田炼成这身一流中品的绝顶毒功！今日先拿你这少林高徒祭掌，再去剖开玄澄的胸膛！”'),
      P('“执迷不悟、残害生灵，昔日玄澄师叔慈悲留你性命，你反变本加厉坠入魔道！今日便在试炼涧了结你这桩孽债！”'),
    ],
    onFinishEffects: [openScene('scene_sls12_07', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_07: {
    id: 'scene_sls12_07',
    title: '寒涧决死 · 独战毒龙',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('涧口处金铁交鸣，慧真已将众毒徒死死缠在潭东；潭西冰岩之上，唯余你与玉面毒龙四目相对。寒风卷雪，生死只在瞬息之间！'),
    ],
    choices: [
      {
        id: 'duel_jade_dragon',
        label: '运足少林阳刚真气，一对一迎战「玉面毒龙」！',
        subLabel: '生死决战 · 一流中品邪派毒盗（战败将身亡）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildJadeDragon() },
            rule: 'duel',
            lethalOnLose: true,
            duelStakesTag: 'duel',
            forbidEscapeReason: '玉面毒龙已封死涧口退路，身后便是闭关中的玄澄长老，断无可退！',
            introText: '寒雾翻涌，玉面毒龙双掌乌光暴涨，携刺骨冰蚕毒砂扑杀而来！',
            deathTitle: '陨落寒雾试炼涧',
            deathDetail: '你虽拼死力战玉面毒龙，终究不敌其阴寒毒砂绝技，心脉冻裂倒于试炼涧冰岩之上。',
            onWin: [openScene('scene_sls12_08', SHAOLIN_SIDE12_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_sls12_08: {
    id: 'scene_sls12_08',
    title: '正气破阴煞 · 毒龙伏诛',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('激战数十合，寒涧冰岩尽碎！玉面毒龙见毒砂屡次被你浑厚刚猛的禅门真气震散，心浮气躁之下孤注一掷，合身化作一道黑影，双掌齐推直取你胸口膻中大穴！'),
      N('你沉肩坠肘、脚踏金刚步，借飞瀑水势反震之力，将毕生功力凝于一击，后发先至硬生生震碎其护体毒煞，一记重手正印其心口！'),
      S(SPEAKER_JADE_DRAGON, '“呃啊——！不可能……我苦熬十年冰蚕噬骨之痛，怎么会败在一个后生晚辈手里……不甘……心……”'),
      N('玉面毒龙口喷乌血，仰天倒飞丈余，重重砸在冰岩上抽搐两下，眼中怨毒之色渐渐涣散，终究气绝伏诛。'),
    ],
    onFinishEffects: [openScene('scene_sls12_09', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_09: {
    id: 'scene_sls12_09',
    title: '余孽授首 · 搜验毒囊',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('主枭一死，潭东残存的几名毒龙帮余孽顿时魂飞魄散，丢下兵刃便欲往崖下逃窜，却被慧真连出数杵尽数点倒，随后赶到的罗汉堂巡山武僧也将众贼一一捆缚押走。'),
      S('NPC-0255', '“阿弥陀佛！师兄好俊的功夫！那魔头一身冰蚕毒功阴狠无比，竟被师兄正面破得干干净净，连半点余毒都未曾近身！”'),
      N('你俯身以真气震碎玉面毒龙腰间残存的两个毒烟皮囊，又命巡山武僧汲取潭水将残灰冲净，确认山谷风口再无半点毒瘴残留。'),
      P('“慧真师兄肩伤紧要，快随我回幽谷石室向玄澄师叔复命，顺道请药局师兄弟为你敷药祛毒。”'),
    ],
    onFinishEffects: [openScene('scene_sls12_10', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_10: {
    id: 'scene_sls12_10',
    title: '风清雾散 · 踏雪回洞',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('冬日稀薄的晨光穿透云层，洒在试炼涧冰瀑之上，折射出点点清辉。方才弥漫山谷的碧绿毒瘴已随寒风散尽，只余松涛与水声依旧。'),
      S('NPC-0255', '“小僧先押着这两名毒徒头目交予戒律院发落，再往药局换药。劳烦师兄先行一步，回寒玉榻禀报玄澄师叔与慧清师弟，免教他们挂念！”'),
      P('“好，我这便回石室复命。”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_SIDE12_QUEST_ID, 'return_cold_jade'),
      openScene('scene_sls12_11', SHAOLIN_SIDE12_QUEST_ID),
    ],
  },

  scene_sls12_11: {
    id: 'scene_sls12_11',
    title: '归程心悟 · 刚柔互济',
    subtitle: '达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('踏雪回行的山径上，你暗自回味方才与玉面毒龙交手时的每一招换气：邪派毒功虽阴寒迅疾，终究根基浮躁；唯有以禅定守心、真气绵长，方能临危不乱、一击定鼎。'),
      N('你轻吐一口浊气，脚下步履愈发沉稳，径直返回【达摩面壁石洞 · 幽谷石室 · 寒玉榻】。'),
    ],
    onFinishEffects: [
      toast('玉面毒龙已伏诛！请返回【幽谷石室 · 寒玉榻】向玄澄长老复命。', 'success', '寒玉护脉'),
    ],
  },

  scene_sls12_12: {
    id: 'scene_sls12_12',
    title: '石室迎归 · 玄澄出定',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你步入幽谷石室，只见守在门廊的慧清正焦急张望，见你衣袍虽沾霜雪却神完气足，顿时喜上眉梢，合十迎上前去。'),
      S('NPC-0322', '“师兄回来了！方才洞外毒烟骤歇，小僧便知师兄与慧真师兄必已得手！玄澄师叔方才正好收功出定，正等着听你回话呢！”'),
      N('石室深处，寒玉榻上的玄澄长老缓缓睁开双目，眸中精光内敛、慈悲安详。你上前恭敬合十，将飞瀑深潭破炉擒贼、一对一斩杀玉面毒龙的经过娓娓道来。'),
      S('NPC-0109', '“阿弥陀佛。那玉面毒龙执念太深，竟以血肉饲蚕、沦为毒傀，今日伏诛于试炼涧，既是因果报应，亦算免他再造杀孽。你临危请命、护持老衲周全，这份胆识与佛门担当，老衲铭记于心。”'),
    ],
    onFinishEffects: [openScene('scene_sls12_13', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_13: {
    id: 'scene_sls12_13',
    title: '寒玉指迷 · 内息护脉',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('玄澄长老示意你在寒玉榻前的蒲团坐下，轻声为你讲解自身兼修少林多门绝技时，如何以“寒玉静心、文火温脉”之法化解刚猛戾气、调和阴阳冲撞的独门心得。'),
      S('NPC-0109', '“武学练至一流之境，外招已非难事，难在经脉承压与气机流转。若只知一味猛进，久必反噬其身；唯有吐纳如寒潭止水、发劲如飞瀑悬空，收放自如，方能百毒不侵、诸邪莫近。”'),
      N('你依着玄澄长老所授口诀闭目运功一周天，只觉方才激战后经脉间残留的些许滞涩瞬间融化，丹田真气较之往日更显凝练圆融！'),
      P('“多谢玄澄师叔慈悲点拨！弟子受益匪浅！”'),
    ],
    onFinishEffects: [openScene('scene_sls12_14', SHAOLIN_SIDE12_QUEST_ID)],
  },

  scene_sls12_14: {
    id: 'scene_sls12_14',
    title: '伏虎除魔 · 禅心益坚',
    subtitle: '达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      S('NPC-0109', '“去吧。如今江湖暗流涌动，少林能有你这般栋梁护法，老衲纵使长坐寒玉榻，亦可安心矣。”'),
      S('NPC-0322', '“待慧真师兄敷完药，咱们师兄弟再一同向师兄敬茶致谢！”'),
      N('你向玄澄长老与慧清合十辞行，步出幽谷石室。少室山雪霁天晴，古寺钟声悠扬回荡在群峰之间。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 620, reason: '寒雾深涧斩杀玉面毒龙 · 护持玄澄长老' },
      { type: 'addSectContribution', amount: 200 },
      { type: 'addArtExp', amount: 180 },
      { type: 'modifyChivalry', delta: 35, reason: '斩除邪派毒盗玉面毒龙' },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0109' }, delta: 18 },
      { type: 'completeQuest', questId: SHAOLIN_SIDE12_QUEST_ID, outcome: 'completed' },
      toast(
        '【寒玉护脉 · 伏虎除魔】圆满完成！实战经验 +620，门派贡献 +200，武学修为 +180，侠义 +35，玄澄好感 +18！',
        'success',
        '寒玉护脉',
      ),
    ],
  },
}
