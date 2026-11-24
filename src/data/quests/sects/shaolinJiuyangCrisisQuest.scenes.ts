import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q29_QUEST_ID } from './shaolinJiuyangCrisisQuest'

const SPEAKER_ZHAIXING: StorySpeakerSpec = {
  kind: 'custom',
  name: '摘星毒师',
  title: '星宿派大弟子 · 丁春秋亲传',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_XINGXIU_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '碧磷毒徒 · 狮吼子',
  title: '星宿海悍徒',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_XINGXIU_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐骨毒女 · 阿紫姑',
  title: '星宿海毒姬',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
}

function buildXingxiuRaiderA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ29_RAIDER_A',
    name: '碧磷毒徒 · 狮吼子',
    title: '星宿海悍徒',
    realm: '一流下品',
    factionName: '星宿海',
    sectRank: 2,
    sectRankLabel: '星宿毒徒',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“少林秃驴休想逃！尝尝星宿派抽髓毒掌的滋味！”',
    stats: { hp: 2380, mp: 1850, agi: 66, res: 46 },
    talents: { bone: 76, comprehension: 72, charm: 34 },
    equippedArts: { neigong: 'MA-231', move1: 'MA-065', move2: 'MA-084' },
    learnedArts: [
      { artId: 'MA-231', level: 8 },
      { artId: 'MA-065', level: 7 },
      { artId: 'MA-084', level: 7 },
    ],
  })
}

function buildXingxiuRaiderB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ29_RAIDER_B',
    name: '腐骨毒女 · 阿紫姑',
    title: '星宿海毒姬',
    realm: '一流下品',
    factionName: '星宿海',
    sectRank: 2,
    sectRankLabel: '星宿毒徒',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_female_fb.jpg',
    talk: '“嘻嘻，三笑逍遥散都放倒玄难老秃驴了，你个小和尚还敢硬撑？”',
    stats: { hp: 2150, mp: 1920, agi: 70, res: 44 },
    talents: { bone: 72, comprehension: 78, charm: 60 },
    equippedArts: { neigong: 'MA-231', move1: 'MA-065', move2: 'MA-095' },
    learnedArts: [
      { artId: 'MA-231', level: 8 },
      { artId: 'MA-065', level: 7 },
      { artId: 'MA-095', level: 7 },
    ],
  })
}

function buildZhaixingBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ29_ZHAIXING',
    name: '摘星毒师',
    title: '星宿派大弟子 · 丁春秋亲传',
    realm: '一流上品',
    factionName: '星宿海',
    sectRank: 3,
    sectRankLabel: '星宿大师兄',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“星宿老仙，法驾中原！今日便拿少林达摩院首座的性命与九阳密钞，作我星宿海开山大礼！”',
    stats: { hp: 3560, mp: 3320, agi: 77, res: 58 },
    talents: { bone: 86, comprehension: 88, charm: 48 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-065', move2: 'MA-095' },
    learnedArts: [
      { artId: 'MA-026', level: 8 },
      { artId: 'MA-065', level: 9 },
      { artId: 'MA-095', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq29_01: {
    id: 'scene_slq29_01',
    title: '第一幕 · 胡商献香 · 剑痕毒袭',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_29_xingxiu_raid.jpg',
    illustrationCaption: '剑痕毒袭 · 星宿派三大毒徒骤发奇袭，玄难护佑小沙弥身中三笑逍遥散',
    mandatory: true,
    beats: [
      N('{reignYear}晚秋，少室山霜叶如血。你随达摩院首座玄难巡视剑痕崖石刻，行至石亭时，忽见三名身穿西域织锦长袍、手捧紫檀香盒的「于阗胡商」连连叩首，恳请高僧亲启西域龙涎奇香。'),
      P('（目光骤然锁定领头胡商青紫发黑的指缝，心头大骇急呼）“师叔小心！香盒有诈——他们不是胡商，是西域星宿海的用毒妖人！”'),
      N('话音未落，香盒机括轰然弹开！三道无色无味的诡风裹挟碧磷毒雾直扑亭前！千钧一发之际，玄难大袖如云卷飞两名扫崖小沙弥脱险，自己却因护雏换气慢了半拍，迎面吸入奇毒，眉心骤泛妖异嫣红，嘴角不受控制地浮出一丝惨笑！'),
      S('NPC-0127', '（咬牙强运内息镇毒，声音沙哑急促）“咳……是丁春秋的『三笑逍遥散』……老衲须借达摩洞千年寒玉锁毒！{playerName}，莫恋战！”'),
      S(SPEAKER_ZHAIXING, '（扯去伪装露出紫黑星宿道袍，连弹七枚碧磷毒弹封死下山石阶，退踞高石狂笑）“哈哈哈！达摩院首座今日也要三笑归西！师弟师妹，先宰了这挡路小和尚！”'),
    ],
    choices: [
      {
        id: 'slq29_accept_shield',
        label: '【横身护师】一步踏至玄难身前，真气震开腐毒雾气，决意护师突围！',
        subLabel: '开启《剑痕浴血 · 少林九阳》，择定山道突围战术',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q29_QUEST_ID, stepId: 'cliff_ambush_breakout' },
          setStep(SHAOLIN_Q29_QUEST_ID, 'cliff_ambush_breakout'),
          toast('已开启《剑痕浴血 · 少林九阳》！请速择突围之策护玄难入洞！', 'talk', '剑痕浴血'),
          openScene('scene_slq29_02', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'slq29_accept_wind',
        label: '【观风审势】按住心神急察崖风走向与毒徒破绽，谋定后动护师入洞！',
        subLabel: '开启《剑痕浴血 · 少林九阳》，择定山道突围战术',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q29_QUEST_ID, stepId: 'cliff_ambush_breakout' },
          setStep(SHAOLIN_Q29_QUEST_ID, 'cliff_ambush_breakout'),
          toast('已开启《剑痕浴血 · 少林九阳》！请速择突围之策护玄难入洞！', 'talk', '剑痕浴血'),
          openScene('scene_slq29_02', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq29_02: {
    id: 'scene_slq29_02',
    title: '第二幕 · 毒障封道 · 突围战术',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖（战术多解）',
    mandatory: true,
    beats: [
      S(SPEAKER_XINGXIU_A, '（双掌漆黑如墨，腥风扑面）“小秃驴，留下玄难老儿，狮吼子爷赏你个痛快！”'),
      S(SPEAKER_XINGXIU_B, '（指间夹着三枚蓝汪汪的子午透骨钉娇笑连连）“师兄别打烂他的脸，抓回去给老仙炼毒人正好！”'),
      N('剑痕崖山道窄仄，狮吼子与阿紫姑一左一右包抄封死通往达摩洞的石径！然深秋山风正自西南倒灌崖顶，你敏锐瞥见二人腰间皆挂着鼓囊囊的熟牛皮碧磷毒囊，迎风门户大开——'),
      P('（心中急转念头）“若硬接二毒徒夹击，恐耽误玄难师叔寒玉锁毒时机；若能借山风逆袭先破其毒囊，或可令毒烟反噬、直冲达摩洞口！”'),
    ],
    choices: [
      {
        id: 'slq29_tactic_wind_pierce',
        label: '【借山风逆袭毒烟先破毒囊】疾掠上风口弹指震裂毒囊，趁毒烟倒卷直冲达摩洞！',
        subLabel: '跳过前锋二毒徒血战，直接背负玄难杀入达摩洞',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需实战身法 ≥ 62 或经义 ≥ 75',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 62 },
            { type: 'skillAtLeast', key: '经义', min: 75 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q29_breakout_mode', value: 'wind_skip' },
          openScene('scene_slq29_03_skip', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'slq29_tactic_blood_break',
        label: '【浴血正面杀出重围】屏息护脉，车轮连战碧磷毒徒与腐骨毒女杀出血路！',
        subLabel: '零门槛正面强攻（车轮连战：一流下品 × 2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q29_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuRaiderA() },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuRaiderB() }],
            rule: 'story_trial',
            forbidEscapeReason: '玄难首座身中剧毒倒在身后，退一步便万劫不复！',
            introText: '【剑痕突围 · 车轮毒战】连战星宿海【碧磷毒徒 · 狮吼子】与【腐骨毒女 · 阿紫姑】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q29_breakout_mode', value: 'gauntlet' },
              openScene('scene_slq29_04_cave_entry', SHAOLIN_Q29_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '二贼毒掌毒针阴狠刁钻，幸得玄难强提指劲逼退星宿妖徒！调息后可于剑痕崖重择突围之策。',
                'warn',
                '剑痕浴血',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq29_03_skip: {
    id: 'scene_slq29_03_skip',
    title: '第三幕 · 逆风破囊 · 疾掠入洞',
    subtitle: '达摩院 · 绝壁栈道',
    mandatory: true,
    beats: [
      N('你深吸一口清气，足尖轻点崖边古松跃占上风石台，指间连弹两枚山石碎砾如流星破空，不偏不倚正击中狮吼子与阿紫姑腰间毒囊！'),
      N('“嗤嗤”两声脆响，滚滚碧绿毒烟借着凛冽秋风轰然倒卷，糊了二毒徒满头满脸！狮吼子与阿紫姑顿时咳呛跌撞、自乱阵脚，连高石上的摘星毒师亦怒骂一声急退三步避烟！'),
      N('机不可失！你如大鹏回旋稳稳背起玄难首座，踩着绝壁栈道疾掠如飞，在摘星毒师阴寒毒掌劈碎洞口山石的刹那，反手震落千斤断龙石机括，彻底封死洞门！'),
      N('石门外传来摘星毒师阴恻恻的叫嚣：“躲进乌龟壳又有何用？三笑逍遥散半个时辰必令老秃驴笑断心脉！”事不宜迟，快背玄难奔向【幽谷石室 · 寒玉榻】！'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q29_QUEST_ID, 'damo_cave_inheritance'),
      toast('已借山风破囊突围入洞！请前往【幽谷石室 · 寒玉榻（sl_damo_main）】安顿玄难。', 'talk', '背师入洞'),
    ],
  },

  scene_slq29_04_cave_entry: {
    id: 'scene_slq29_04_cave_entry',
    title: '第三幕 · 浴血破围 · 断石阻毒',
    subtitle: '达摩院 · 绝壁栈道',
    mandatory: true,
    beats: [
      N('你以刚猛佛门内劲护定膻中大穴，硬撼抽髓毒掌，掌风如雷震飞子午透骨钉，一记重手将狮吼子拍得口吐黑血倒飞三丈，复逼得阿紫姑惨叫抱头鼠窜！'),
      S(SPEAKER_ZHAIXING, '（在崖石上微微色变，纵身扑下）“废物！连个真传弟子都拿不下！待本大师兄亲收你们师徒性命！”'),
      S('NPC-0127', '（咬破舌尖强提清明，扣住你衣袖低喝）“莫与摘星硬拼，他身负丁春秋化功毒劲！快背老衲退入达摩洞寒玉榻！”'),
      N('你俯身背起玄难沿绝壁栈道疾奔，冒着身后纷飞碎石一掌震落洞口千斤断龙石，将摘星毒师的狂笑与毒雾暂阻门外！快奔向【幽谷石室 · 寒玉榻】救治师叔！'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q29_QUEST_ID, 'damo_cave_inheritance'),
      toast('已护玄难血战突围入洞！请前往【幽谷石室 · 寒玉榻（sl_damo_main）】安顿玄难。', 'talk', '背师入洞'),
    ],
  },

  scene_slq29_05: {
    id: 'scene_slq29_05',
    title: '第四幕 · 寒玉暗格 · 九阳悟道',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻（行气参悟）',
    illustrationUrl: '/assets/quests/sl_29_jiuyang_scroll.jpg',
    illustrationCaption: '密钞九阳 · 寒玉榻暗格现世，玄难亲授《少林九阳禅功密钞》',
    mandatory: true,
    beats: [
      N('你将玄难安放于千年寒玉榻上。至阴玉气透入背心，玄难眉心妖异嫣红顿缓三分，硬生生压下第二声致命狂笑。然而寒玉仅能锁毒一个时辰，寻常刚猛内功反易催动毒血攻心。'),
      N('玄难颤巍巍抬手在榻底青莲浮雕连按三下，「咔嗒」一声暗格弹开，内藏一卷金丝油布包裹的泛黄孤本——封皮朱砂八字端庄浩然：《少林九阳禅功密钞》！'),
      S('NPC-0127', '（目光炯炯凝视于你）“当年觉远一脉禅师自《楞伽经》夹缝悟出九阳真意，唯余此卷《少林九阳禅功密钞》藏于禁地。其中所载《少林九阳功》至阳至纯、百毒不侵，正是星宿腐毒与化功邪法之克星！”'),
      S('NPC-0127', '（将古钞展于你膝前，喘息微促）“你经义书法俱臻化境，此刻老衲内息受阻，须靠你自己从梵汉双解注疏中辨出真正的九阳行气心诀——一旦行岔经脉，毒火反噬非同小可！快细看经缝残篇，你当如何运使这第一口纯阳真气？”'),
    ],
    choices: [
      {
        id: 'slq29_mantra_fierce',
        label: '以刚猛烈火真气强冲百会与诸阳大穴，直焚经脉余毒、宁折不弯',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q29_mantra_pick', value: 'fierce' },
          openScene('scene_slq29_06_inherit', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'slq29_mantra_true',
        label: '他强由他强，清风拂山岗；真气自任督二脉生生不息，温煦化毒于无形',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q29_jiuyang_perfect', value: true },
          { type: 'setFlag', flag: 'sl_q29_mantra_pick', value: 'true' },
          openScene('scene_slq29_06_inherit', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'slq29_mantra_ice',
        label: '引寒玉榻至阴冷气倒灌膻中冰封四肢百骸，令毒血凝滞寸步不行',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q29_mantra_pick', value: 'ice' },
          openScene('scene_slq29_06_inherit', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq29_06_inherit: {
    id: 'scene_slq29_06_inherit',
    title: '第五幕 · 丹田起阳 · 临危授功',
    subtitle: '达摩院 · 幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q29_jiuyang_perfect|你双目微阖默诵《楞伽经》夹缝禅偈，丹田骤升一缕温煦浩荡的春阳暖流，自任督二脉生生不息循环一周，方才崖上吸入的丝丝毒瘴瞬间化散无形！玄难睁眼惊叹：“奇才！一念便悟透九阳圆融真意！”|你起初试运真气，经脉顿觉燥烈滞涩；玄难见状急以掌心轻贴你背脊灵台，沉声吟诵总纲：“他强由他强，清风拂山岗；他横由他横，明月照大江——莫逞刚戾，顺任督二脉生生不息化毒于无形！”经此点拨，暖流豁然贯通！}'),
      N('半个时辰转瞬即过，你体表泛起一层温润金辉，将石室寒气逼退三尺！你急坐于玄难身后双掌抵住其灵台大穴，绵绵纯阳真气涌入经脉——顷刻间玄难吐出一口腥臭黑血，眉心嫣红褪去大半，心脉终告保全！'),
      N('便在此时，断龙石外骤传硫磺焦糊与狂笑——摘星毒师竟命毒徒在洞口焚烧毒草熏洞，更将方才被玄难拂开却中了余烟的两名扫崖小沙弥逼在石亭畔以作要挟！'),
      S('NPC-0127', '（盘坐寒玉榻调息，郑重叮嘱）“{ifFlagEq:sl_branch=layman|依少林清规，俗家护法不授《少林九阳功》全本，然老衲已将纯阳化毒行气法门融汇入你原有内功根基之中！|老衲已为你贯通《少林九阳功》根基！}摘星毒师乃丁春秋大弟子、修为已臻一流上品，你且莫急着硬冲，先于寺中闭关稳固新得纯阳真气，再重返剑痕崖一举击溃妖徒！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        thenEffects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-038', minLevel: 1 },
            thenEffects: [],
            elseEffects: [
              {
                type: 'teachMartialArt',
                artId: 'MA-038',
                autoEquip: true,
                replaceArtIds: ['MA-100', 'MA-159'],
              },
            ],
          },
        ],
        elseEffects: [{ type: 'addArtExp', amount: 260 }],
      },
      setStep(SHAOLIN_Q29_QUEST_ID, 'pure_yang_showdown'),
      toast(
        '玄难已口授纯阳真诀！出家弟子已当场习得并运使《少林九阳功》，建议先闭关精修数重，再赴【绝壁石刻 · 剑痕崖（sl_damo_east）】决战摘星毒师！',
        'success',
        '少林九阳',
      ),
    ],
  },

  scene_slq29_07_showdown: {
    id: 'scene_slq29_07_showdown',
    title: '第六幕 · 破石震雾 · 剑痕对峙',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖（决战一流上品）',
    mandatory: true,
    beats: [
      N('你一掌震开千斤断龙石，大步踏出幽谷石道！滚滚黄绿碧磷毒烟迎面扑来，竟在触及你身前三尺时如冰雪遇骄阳般滋滋消融！高石上的摘星毒师瞳孔骤缩，失声惊呼！'),
      S(SPEAKER_ZHAIXING, '（面色铁青，双袖鼓荡起森寒紫黑毒气）“什么邪门神功竟能直接焚化我星宿碧磷烟？休要装神弄鬼，进了本座化功毒掌之下，管你什么九阳十阳都要化作脓水！”'),
      N('你目光扫过石亭一侧，只见方才被玄难救下的两名扫崖小沙弥正蜷缩在残烟边缘剧烈咳喘，眼看新一波毒雾就要漫过石阶；而摘星毒师正蓄足毒掌露出半息破绽——'),
    ],
    choices: [
      {
        id: 'slq29_fight_save_novices',
        label: '【纯阳护体先救幼僧】挥袖卷出纯阳气罩震散亭畔残毒、护出小沙弥，再迎战摘星毒师！',
        subLabel: '决战【摘星毒师】（一流上品），仁心救雏（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q29_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhaixingBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '玄难首座尚在洞中疗毒、幼僧危急，绝不可放摘星毒师踏进一步！',
            introText: '【纯阳护雏 · 决战摘星】震散亭畔毒雾护出小沙弥后，迎战星宿派大弟子【摘星毒师（一流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q29_final_stance', value: 'save_novices' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q29_final_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q29_final_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_slq29_08_win', SHAOLIN_Q29_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '摘星毒师化功毒劲凶险，你以纯阳真气逼出寒毒暂退半步！可闭关精进后再赴【剑痕崖】决战。',
                'warn',
                '剑痕浴血',
              ),
            ],
          },
        ],
      },
      {
        id: 'slq29_fight_slay_direct',
        label: '【雷霆抢攻直斩摘星】趁其惊骇分神抢攻中宫，先毙星宿首恶以永绝后患！',
        subLabel: '决战【摘星毒师】（一流上品），铁血除恶（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q29_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhaixingBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '玄难首座尚在洞中疗毒，绝不可放摘星毒师踏入石室一步！',
            introText: '【直取首恶 · 决战摘星】催动纯阳真气抢攻星宿派大弟子【摘星毒师（一流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q29_final_stance', value: 'direct_strike' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q29_final_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q29_final_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq29_08_win', SHAOLIN_Q29_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '摘星毒师暗器毒掌防不胜防，你运纯阳真气护脉暂退！可闭关精进后再赴【剑痕崖】决战。',
                'warn',
                '剑痕浴血',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq29_08_win: {
    id: 'scene_slq29_08_win',
    title: '第七幕 · 纯阳佛掌 · 妖徒溃逃',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_29_pure_yang_blast.jpg',
    illustrationCaption: '纯阳佛掌 · 少林九阳真气沛然勃发，一掌震散满崖星宿腐毒',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q29_final_stance=save_novices|你先以纯阳气浪将两名小沙弥平安送入上风石窟，再回头正面迎击摘星毒师！|你身如烈日流星直扑摘星毒师中宫，凌厉掌风压得他连连倒退、无暇再施阴毒暗算！}激战数十合，摘星毒师见化功毒劲竟吸不动你生生不息的纯阳内息，反被灼得双掌起泡发红，顿时心胆俱裂！'),
      N('你抓住破绽将毕生纯阳真气贯注双掌，一记堂堂正正的佛门伏魔掌轰然拍出！炽烈金光如朝阳炸裂，硬生生震碎其护体毒障，将其拍得口喷鲜血滚落山道十余丈，满崖弥漫的碧磷腐毒与三笑毒烟竟被一掌荡清，秋日晴空重现绝壁！'),
      S(SPEAKER_ZHAIXING, '（捂着焦黑剧痛的胸口，满脸惊恐怨毒）“少林……竟还藏着这等专克星宿毒功的纯阳绝学！小子你记住，星宿老仙绝不会善罢甘休！”'),
      N('恰在此时，钟鼓楼传来武僧合围的急促钟声！摘星毒师见大势已去，一把拽起昏迷同伙滚下乱石坡，狼狈遁入深山逃之夭夭。'),
    ],
    onFinishEffects: [openScene('scene_slq29_09_aftermath', SHAOLIN_Q29_QUEST_ID)],
  },

  scene_slq29_09_aftermath: {
    id: 'scene_slq29_09_aftermath',
    title: '第八幕 · 玄难出洞 · 暗影余波',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('少顷石门开启，玄难在闻讯赶来的达摩院武僧搀扶下步上剑痕崖。虽面色略显苍白，步履却已沉稳如昔，两名获救小沙弥亦涕泪交流连连叩谢。'),
      S('NPC-0127', '（望着崖壁焦痕与澄澈晴空，合十长叹）“阿弥陀佛……若非{playerName}拼死护持、危难间悟透纯阳行气真谛，老衲今日必已毙命星宿毒手之下！”'),
      S('NPC-0127', '（神色转沉，遥望西域天际）“只是丁春秋远在星宿海，摘星毒师怎会精准知晓老衲今日巡崖，甚至直奔寒玉榻而来？恐怕中原暗处，已有人与西域魔头暗通款曲……”'),
      N('你心头骤然一动，不禁联想起七夕暴雨夜藏经阁的双影批注（{ifFlagEq:sl_pavilion_choice=compassion|彼时你择定慈悲默察，正欲以佛法探明潜伏之影|彼时你择定铁血伏魔，已令戒律武僧暗中戒备}）。山雨欲来风满楼，你沉声向玄难回话——'),
    ],
    choices: [
      {
        id: 'slq29_vow_guard',
        label: '【禀明隐忧 · 固守祖庭】提醒师叔提防寺内暗影窥伺，誓以纯阳佛心守卫达摩院与藏经阁',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q29_closing_vow', value: 'guard' },
          openScene('scene_slq29_10_settle', SHAOLIN_Q29_QUEST_ID),
        ],
      },
      {
        id: 'slq29_vow_trace',
        label: '【追索奸细 · 查断暗线】请缨日后暗中彻查星宿海与中原暗流勾连脉络，绝不姑息养奸',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q29_closing_vow', value: 'trace' },
          openScene('scene_slq29_10_settle', SHAOLIN_Q29_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq29_10_settle: {
    id: 'scene_slq29_10_settle',
    title: '第九幕 · 赐钞正名 · 丹心映秋',
    subtitle: '达摩院 · 绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '（颔首深许，双手捧起金丝油布包裹的《少林九阳禅功密钞》）“{ifFlagEq:sl_q29_closing_vow=guard|固本培元、内外兼守，方是少林长久之道。|顺藤摸瓜、明察暗流，亦正合护寺大义。}此功本为救人伏魔而生，今日在你手中震散星宿腐毒，实乃天意亦是佛缘。”'),
      N('{ifFlagEq:sl_branch=layman|你双手合十婉辞秘钞，遵少林祖训亲手将《少林九阳禅功密钞》封回达摩洞暗格。虽未逾矩修习僧众专属纯阳内功，然此役力挫摘星毒师、力救玄难首座之义举，已传遍少室内外！|玄难将《少林九阳禅功密钞》郑重交托于你手中。夕阳西下，漫山红叶在清风中沙沙作响，你体内纯阳真气生生不息——自此一役，「纯阳真传」之名传遍少室内外！}'),
      P('（躬身拜谢）“弟子必谨记师叔教诲，以正气济世伏魔，绝不堕少林达摩院千年威名！”'),
    ],
    choices: [
      {
        id: 'slq29_complete_monk',
        label: '珍藏《少林九阳禅功密钞》，圆满完成【剑痕浴血 · 少林九阳】',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-038', minLevel: 1 },
            thenEffects: [],
            elseEffects: [
              {
                type: 'teachMartialArt',
                artId: 'MA-038',
                autoEquip: true,
                replaceArtIds: ['MA-100', 'MA-159'],
              },
            ],
          },
          { type: 'giveItem', itemId: 'ITM-SCR-011', qty: 1 },
          { type: 'giveCombatExp', amount: 880, reason: '剑痕浴血 · 少林九阳' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q29_jiuyang_perfect', op: 'truthy' },
            thenEffects: [
              { type: 'addArtExp', amount: 180 },
              { type: 'modifySkill', key: '书', delta: 1 },
            ],
            elseEffects: [],
          },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q29_QUEST_ID, outcome: 'completed' },
          toast(
            '《剑痕浴血 · 少林九阳》完结！获赐《少林九阳禅功密钞》，实战经验 +880，师门贡献 +300，经义 +2，玄难好感 +30！',
            'success',
            '少林九阳',
          ),
        ],
      },
      {
        id: 'slq29_complete_layman',
        label: '遵祖训将《少林九阳禅功密钞》封存寒玉榻暗格（完成）',
        subLabel: '俗家弟子依少林清规不授《少林九阳功》与密钞，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'giveCombatExp', amount: 1200, reason: '剑痕崖血战退星宿毒师、力救玄难首座' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q29_jiuyang_perfect', op: 'truthy' },
            thenEffects: [
              { type: 'addArtExp', amount: 180 },
              { type: 'modifySkill', key: '书', delta: 1 },
            ],
            elseEffects: [],
          },
          { type: 'addSectContribution', amount: 300 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q29_QUEST_ID, outcome: 'completed' },
          toast(
            '《剑痕浴血 · 少林九阳》完结！（俗家不授《少林九阳功》）实战经验 +1200，师门贡献 +300，经义 +2，玄难好感 +30！',
            'success',
            '剑痕救师',
          ),
        ],
      },
    ],
  },
}
