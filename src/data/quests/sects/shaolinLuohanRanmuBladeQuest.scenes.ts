import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q22_QUEST_ID } from './shaolinLuohanRanmuBladeQuest'

const SPEAKER_NIGHT_SHADOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑衣蒙面高手',
  title: '夜探罗汉堂 · 神秘绝顶暗影',
  factionName: '江湖暗影',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildNightShadowBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ22_NIGHT_SHADOW',
    name: '夜探黑影高手',
    title: '潜袭罗汉堂 · 神秘黑衣人',
    realm: '一流下品',
    factionId: 'SECT-10',
    factionName: '神秘势力',
    sectRank: 3,
    sectRankLabel: '暗夜枭雄',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“哼！区区少林小辈也敢提燃木戒刀拦路？十合之内，先废你双臂！”',
    stats: { hp: 3180, mp: 2240, agi: 76, res: 62 },
    talents: { bone: 88, comprehension: 86, charm: 50 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-073' },
    learnedArts: [{ artId: 'MA-243', level: 8 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-073', level: 7 }],
  })
}

function buildNightShadowReadBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ22_NIGHT_SHADOW_READ',
    name: '夜探黑影高手（虚步被破）',
    title: '潜袭罗汉堂 · 神秘黑衣人',
    realm: '一流下品',
    factionId: 'SECT-10',
    factionName: '神秘势力',
    sectRank: 3,
    sectRankLabel: '暗夜枭雄',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“可恶！香灰映步，你竟一眼识穿老夫虚实换位？倒小瞧了玄苦这传人！”',
    stats: { hp: 2680, mp: 1920, agi: 68, res: 54 },
    talents: { bone: 88, comprehension: 86, charm: 50 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-073' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-244', level: 7 }, { artId: 'MA-073', level: 6 }],
  })
}

const GIVE_RANMU_BLADE_ONCE: QuestEffect = {
  type: 'branch',
  condition: { type: 'flag', flag: 'sl_q22_blade_given', op: 'falsy' },
  thenEffects: [
    { type: 'setFlag', flag: 'sl_q22_blade_given', value: true },
    { type: 'giveItem', itemId: 'WPN-013', qty: 1 },
  ],
  elseEffects: [],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq22_01: {
    id: 'scene_slq22_01',
    title: '第一幕 · 寒夜召见 · 山雨暗潮',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}冬月，大雪初霁，少室山寒风凛冽。深夜子时，你接罗汉堂首座玄苦师伯密谕独入【罗汉堂演武正殿】；殿内未点巨烛，唯有佛前两盏长明青灯摇曳，照着一截半人高的百年枯菩提木桩。'),
      P('（合十躬身，见玄苦眉间罕见凝着忧色）“弟子参见玄苦师伯！夜深天寒，不知师伯急召弟子前来，有何要事相谕？”'),
      S('NPC-0126', '（长叹一声，目光望向殿外黑沉沉的雪松）“阿弥陀佛……师侄，近日江湖风声紧得很。丐帮那边隐有流言暗指老衲早年授业的俗家弟子乔峰身世有异；更诡异的是，近半月每逢子夜，总有一道深不可测的黑影在少林后山与罗汉堂屋脊徘徊窥伺。”'),
      S('NPC-0126', '（转身自佛龛下请出一柄乌沉阔背、刻满梵文莲纹的厚重戒刀）“因果业力非人力可尽测，老衲已年近七旬、生死早已看淡；唯独罗汉堂镇堂绝学《燃木刀法》与这柄【少林燃木戒刀】，绝不可失传！你经义通透、书法凝练，今夜老衲便倾囊相授！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_02', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_02: {
    id: 'scene_slq22_02',
    title: '第二幕 · 八十一刀 · 烈风如潮',
    subtitle: '罗汉堂演武正殿 · 刚柔之辨',
    mandatory: true,
    beats: [
      N('玄苦话音方落，双目精芒暴涨，手中乌沉戒刀霍然扬起！第一刀斜斩而落，刀锋却停在距枯菩提木半寸之外，并无金铁交鸣，唯有一声闷雷般的炽热罡风扫过木桩！'),
      N('刹那间刀势骤提——十刀、三十刀、六十刀！大殿青灯火苗被无形刀气扯作数尺光带，漫殿寒意顷刻一扫而空，仿佛隆冬殿堂内忽燃起一座无形熔炉！'),
      N('你凝神紧盯玄苦踏位与悬腕运劲，只觉那八十一刀看似暴烈如火，实则起承转合皆暗合《法华经》火宅喻之禅理，腕劲如写狂草般绵密不断，半点不曾劈中木桩本体！'),
      N('“轰——！”第八十一刀收势归鞘的刹那，那截百年枯菩提木竟在静寂中冒出一缕青烟，旋即“腾”地窜起一尺高的金色烈焰，木香四溢，而木桩表面竟连一道刀痕也无！'),
    ],
    onFinishEffects: [openScene('scene_slq22_03', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_03: {
    id: 'scene_slq22_03',
    title: '第三幕 · 枯木生烟 · 燃木火候',
    subtitle: '罗汉堂演武正殿 · 刀意考校',
    illustrationUrl: '/assets/quests/sl_22_burning_wood.jpg',
    illustrationCaption: '枯木生烟 · 玄苦深夜连劈八十一刀，刀锋不触木身，百年枯菩提木却在炽热刀风下轰然生烟自燃',
    mandatory: true,
    beats: [
      N('玄苦大袖轻拂，一股柔和掌风将枯木火焰轻轻扑灭，殿内唯余淡淡菩提焦香。他将滚烫犹存的乌沉戒刀横于膝上，沉声考校你的领悟。'),
      S('NPC-0126', '“昔年不少师侄看老衲演完这八十一刀，回去一味猛劈硬砍，反震伤了腕脉、劈烂了数十根木桩却连半星烟火也未生出。你且说说，这『枯木生烟』的真正火候究竟在何处？”'),
      N('青灯光影明灭间，方才八十一刀的刀风节奏仍在耳畔回响，你凝思片刻，决意道出心中所悟——'),
    ],
    choices: [
      {
        id: 'slq22_insight_chop',
        label: '“全赖刀锋以千钧蛮力贴木疾劈，趁木屑崩飞之际借金铁火星引燃百年枯木！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q22_blade_insight', value: false },
          teachArtNow('MA-052'),
          openScene('scene_slq22_04', SHAOLIN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'slq22_insight_fire',
        label: '“劲力聚而不散、九分守定一分炽发，刀脊悬空高速激荡阳刚热浪，火自木生而非劈碎木身！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q22_blade_insight', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q22_insight_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q22_insight_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          teachArtNow('MA-052'),
          openScene('scene_slq22_04', SHAOLIN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'slq22_insight_cold',
        label: '“须先以阴寒内力锁死木心湿气，再反手倒转刀背震裂木纹方能生烟！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q22_blade_insight', value: false },
          teachArtNow('MA-052'),
          openScene('scene_slq22_04', SHAOLIN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq22_04: {
    id: 'scene_slq22_04',
    title: '第四幕 · 以经镇火 · 禅房密嘱',
    subtitle: '罗汉堂演武正殿 · 师恩叮嘱',
    mandatory: true,
    beats: [
      S('NPC-0126', '{ifFlag:sl_q22_blade_insight|（双目一亮，抚须大赞）“好悟性！九分守定、一分炽发，火自木生而非劈碎木身！以书入刀如悬肘写狂草，以经镇火方不堕玄澄师兄昔年之『武学障』——这门《燃木刀法》的门径你已稳稳踏入！”|（缓声摇头，亲自握腕为你纠正运劲）“切莫以蛮力硬劈或逆行阴劲！《燃木刀法》妙在劲力聚而不散、九分守定一分炽发，刀不触木而热浪自生！再以佛经压住戾气，方不伤己身。来，随我走一遍前二十七式！”}'),
      N('你接刀依诀试演，丹田纯阳真气顺臂贯入刀脊，数刀劈出果然隐隐泛起灼热锐风，玄苦颔首欣慰。演武方罢，殿外忽起一阵阴冷怪风，吹得窗棂咯吱作响，玄苦引你退至佛龛旁低语。'),
      S('NPC-0126', '“师侄，老衲还有一事相托。乔峰那孩子是我看着长大的，他光明磊落、义薄云天，绝非奸邪之辈。日后若江湖真有人借身世大做文章构陷于他，你切莫随波逐流，须以本心明辨是非！”'),
      P('（郑重稽首）“弟子谨记师伯嘱托！乔峰师兄抗辽护民、侠名满天下，弟子断不会轻信小人谗言！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_05', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_05: {
    id: 'scene_slq22_05',
    title: '第五幕 · 佛前托刀 · 薪火相传',
    subtitle: '罗汉堂演武正殿 · 燃木戒刀',
    illustrationUrl: '/assets/quests/sl_22_xuanku_entrust.jpg',
    illustrationCaption: '玄苦托刀 · 长明灯下，玄苦双手将传世宝刀【少林燃木戒刀】郑重托付于你，薪火相传',
    mandatory: true,
    beats: [
      N('长明灯火映照着玄苦慈祥而坚毅的面容。他双手捧起那柄随身降魔四十载、以天竺乌兹钢混嵩山精铁重锻而成的【少林燃木戒刀】，郑重按入你掌心！'),
      S('NPC-0126', '“宝刀配烈火，留在你手比锁在武库更能护佑少林——莫要推辞！况且……老衲听见殿外瓦片微响了！那道窥伺半月的黑影，今夜终于忍不住现身了！”'),
      N('三更梆子声恰在此时沉沉落下，殿外寒风卷雪拍打雕花门扉。你双手紧握沉凝温润的【少林燃木戒刀】，一股浩然正气自刀柄直透肺腑！'),
    ],
    choices: [
      {
        id: 'slq22_accept_listen',
        label: '【受刀敛息听风】郑重受领燃木戒刀，熄暗半盏青灯静辨檐上黑影方位！',
        subLabel: '获赠【少林燃木戒刀】，开启夜守罗汉堂护师之战',
        tone: 'jade',
        effects: [
          GIVE_RANMU_BLADE_ONCE,
          { type: 'setFlag', flag: 'sl_q22_guard_stance', value: 'listen' },
          { type: 'startQuest', questId: SHAOLIN_Q22_QUEST_ID, stepId: 'night_guard_luohan' },
          setStep(SHAOLIN_Q22_QUEST_ID, 'night_guard_luohan'),
          openScene('scene_slq22_06', SHAOLIN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'slq22_accept_stand',
        label: '【横刀立殿喝敌】手握燃木戒刀护于玄苦身前，朗声喝问殿外宵小现身！',
        subLabel: '获赠【少林燃木戒刀】，开启夜守罗汉堂护师之战',
        tone: 'gold',
        effects: [
          GIVE_RANMU_BLADE_ONCE,
          { type: 'setFlag', flag: 'sl_q22_guard_stance', value: 'stand' },
          { type: 'startQuest', questId: SHAOLIN_Q22_QUEST_ID, stepId: 'night_guard_luohan' },
          setStep(SHAOLIN_Q22_QUEST_ID, 'night_guard_luohan'),
          openScene('scene_slq22_06', SHAOLIN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq22_06: {
    id: 'scene_slq22_06',
    title: '第六幕 · 破窗黑影 · 初交锋芒',
    subtitle: '罗汉堂演武正殿 · 突袭而至',
    mandatory: true,
    beats: [
      N('“砰！”一声沉闷脆响，正殿高窗木格无声粉碎！一道全身裹在玄黑长袍中的魁梧身影宛若巨蝠倒掠而入，未等落地便向佛前玄苦拍出一记阴寒刺骨的幽黑掌力！'),
      P('（{ifFlagEq:sl_q22_guard_stance=listen|早已听明破窗方位，先半步抢占佛前中宫斜撩戒刀|暴喝如雷，手中燃木戒刀挟灼热劲风迎面劈出}）“何方鼠辈，安敢夜袭罗汉堂！接我一刀！”'),
      N('炽热刀风与阴寒掌力在半空轰然对撞！“轰隆”一声巨响，雪沫与供案香炉中的细白香灰漫天翻涌！那黑衣人闷哼半步，眼中杀意骤如寒冰！'),
      S(SPEAKER_NIGHT_SHADOW, '（压低沙哑嗓音，刻意掩饰口音与招式路数）“好炽热的刀风……玄苦老秃驴竟连《燃木刀法》与戒刀都提前传出去了！也罢，今夜连你这小辈一并灭口！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q22_shadow_appeared', value: true },
      openScene('scene_slq22_07', SHAOLIN_Q22_QUEST_ID),
    ],
  },

  scene_slq22_07: {
    id: 'scene_slq22_07',
    title: '第七幕 · 殿中夜战 · 反伏击策',
    subtitle: '罗汉堂演武正殿 · 决战夜探黑影（实战）',
    mandatory: true,
    beats: [
      N('黑衣蒙面高手身形忽左忽右，宛若鬼魅融于殿柱阴影之中，掌刀并施封死前后方位！每踏一步竟悄无声息，连衣袂带风也刻意敛去，令人极难捕捉其真身虚实。'),
      S('NPC-0126', '（沉声提点）“师侄小心！此人功力深厚且刻意隐匿本门步法，万勿被他阴柔虚招缠住！”'),
      N('瞥见供案倾倒后散落青石的漫地香灰，以及环殿排列的十八盏罗汉堂长明灯阵，你瞬息定下破影反击之策——'),
    ],
    choices: [
      {
        id: 'slq22_tactic_ash',
        label: '【暗藏香灰识轻功落脚】刀风卷起满地香灰铺成暗阵，借落脚深浅算破黑影虚招！',
        subLabel: '需算术 ≥ 45 或先前悟透燃木刀意 · 识破虚步占尽先机（胜后禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '算术', min: 45 },
            { type: 'flag', flag: 'sl_q22_blade_insight', op: 'truthy' },
          ],
          hint: '需算术 ≥ 45 或先前悟透《燃木刀法》火候真谛',
        },
        effects: [
          toast('你以刀风将细白香灰扫铺青石，黑影每步虚实深浅纤毫毕现，诡异步法顷刻被你算死！', 'success', '香灰识影'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q22_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNightShadowReadBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '玄苦师伯就在身后，绝不可退半步！',
            introText: '【演武正殿 · 香灰识影】虚招已被看穿，挥动燃木戒刀力压【夜探黑影高手】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q22_tactic', value: 'ash' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q22_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q22_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq22_08', SHAOLIN_Q22_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('不敌夜探黑影高手的阴寒掌力！幸得玄苦师伯出手化解险情，调息后可再于【罗汉堂演武正殿】迎战。', 'warn', '枯木生烟'),
            ],
          },
        ],
      },
      {
        id: 'slq22_tactic_lamps',
        label: '【点燃罗汉堂长明灯阵正面迎敌】刀气引燃十八盏长明青灯，火光照破暗夜硬撼强敌！',
        subLabel: '零门槛正攻 · 直面全盛夜探黑影高手（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q22_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNightShadowBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            forbidEscapeReason: '玄苦师伯就在身后，绝不可退半步！',
            introText: '【演武正殿 · 灯阵死战】长明灯阵大亮，挥动燃木戒刀正面迎战【夜探黑影高手】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q22_tactic', value: 'lamps' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q22_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q22_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq22_08', SHAOLIN_Q22_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('不敌夜探黑影高手的阴寒掌力！幸得玄苦师伯出手化解险情，调息后可再于【罗汉堂演武正殿】迎战。', 'warn', '枯木生烟'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq22_08: {
    id: 'scene_slq22_08',
    title: '第八幕 · 烈焰逼影 · 残袖疑云',
    subtitle: '罗汉堂演武正殿 · 破窗遁走',
    illustrationUrl: '/assets/quests/sl_22_night_repel.jpg',
    illustrationCaption: '烈焰逼影 · 你挥动燃木戒刀劈出漫天炽热刀风，十合硬撼逼得夜袭黑影高手仓皇破窗遁逃',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q22_tactic=ash|香灰印步令黑影无所遁形，你的刀势步步抢占先机；|十八盏长明灯照得殿内亮如白昼，你的烈焰刀风步步紧逼；}十合激斗间，你将新学之《燃木刀法》与昔日《慈悲刀法》融会贯通，刀光竟隐隐透出一层赤红热浪！'),
      N('第十合上，你大喝一声劈出一记势如破竹的「薪尽火传」，炽烈刀风如火龙卷地撕裂阴寒掌气！“嘶啦——！”半截焦黑袖袍应风飘落，同时殿外警钟骤响，护法武僧已闻声疾奔而来！'),
      S(SPEAKER_NIGHT_SHADOW, '（冷哼一声，借反震之力倒跃上梁）“好个少林真传！今日算你命大，来日少室山外再见分晓！”'),
      N('黑影如鬼魅窜出破窗消没于雪夜松涛之中。你收刀喘息，俯身拾起那半截被热浪灼焦的细布残袖——织法极精，竟隐隐夹杂着一丝奇异的塞外寒柏冷香，却抹去了所有门派印记。'),
    ],
    onFinishEffects: [openScene('scene_slq22_09', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_09: {
    id: 'scene_slq22_09',
    title: '第九幕 · 玄苦托付 · 问影问安',
    subtitle: '罗汉堂演武正殿 · 暗潮伏笔',
    mandatory: true,
    beats: [
      N('玄苦传令赶至的罗汉堂武僧即刻加强藏经阁与各院巡防，自己则缓步上前仔细端详你手中焦黑残袖，神色愈发凝重，额角更隐隐沁出一丝疲惫冷汗。'),
      S('NPC-0126', '“此人功力之高只怕不亚于本寺玄字辈长老，出手时却刻意遮掩本门路数……今夜若非你持燃木戒刀死战逼退，老衲纵能自保，恐怕也要落得暗伤缠身！”'),
      N('望着残袖上那一缕若有若无的塞外冷香，又见玄苦师伯眉间难掩的倦色，你心头涌起两个念头——'),
    ],
    choices: [
      {
        id: 'slq22_ask_shadow',
        label: '【追问黑影身法来历】细询此人方才换气步法究竟暗合塞外还是江南哪一脉绝学！',
        subLabel: '探得神秘黑影伏笔线索，记下藏经阁暗流隐情',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q22_shadow_clue', value: true },
          openScene('scene_slq22_10', SHAOLIN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'slq22_care_xuanku',
        label: '【先请玄苦保重禅体】收妥残袖、扶师伯安坐调息，切莫再为宵小劳神伤元！',
        subLabel: '尊师重道，玄苦好感额外大增（禅心慈悲 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q22_shadow_clue', value: false },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q22_after_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q22_after_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq22_10', SHAOLIN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq22_10: {
    id: 'scene_slq22_10',
    title: '第十幕 · 刀禅合一 · 薪火长明',
    subtitle: '嵩山少林寺 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      S('NPC-0126', '{ifFlag:sl_q22_shadow_clue|（压低声音，眸光深邃）“瞒你不得……方才那黑影既带塞外冷香、隐有契丹刚猛根底，闪避间却又暗藏几分中原名门借力之影！只怕暗中觊觎少林藏经阁的，还不止一人！此事你暂记于心，切勿外传。”|（闻言展颜一笑，眼眶微润）“阿弥陀佛，好孩子！有你这份孝心与定力，老衲这一身老骨头也踏实多了。那黑影既被你惊退，短时间内断不敢再轻易犯我罗汉堂。”}'),
      N('玄苦取来《燃木刀法》完整秘本交付于你，叮嘱道：“燃木之火可焚邪魔，亦可灼伤己身。日后每练一遍刀法，须诵一遍《金刚经》以水济火，方能臻至大圆满之境！”'),
      P('（轻抚温润沉重的【少林燃木戒刀】，郑重叩首）“弟子定当以禅养刀！此刀在手，凡敢犯我少林法脉与中原正道者，弟子必以烈焰刀风荡除之！”'),
      N('东方天际泛起鱼肚白，雪后晨光映亮青石大殿。枯菩提木余烬犹温，而你手握【少林燃木戒刀】、身负《燃木刀法》真传，已真正扛起了罗汉堂新一代护法大旗！'),
    ],
    choices: [
      {
        id: 'slq22_complete',
        label: '习得《燃木刀法》并受赠【少林燃木戒刀】，圆满完成【枯木生烟 · 玄苦授刀】',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-052', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-052', level: 1 }],
          },
          GIVE_RANMU_BLADE_ONCE,
          {
            type: 'giveCombatExp',
            amount: 650,
            reason: '深夜领悟玄苦所授《燃木刀法》，持少林燃木戒刀十合逼退夜袭黑影高手',
          },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q22_blade_insight', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 25 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q22_shadow_clue', op: 'falsy' },
            thenEffects: [{ type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 10 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q22_QUEST_ID, outcome: 'completed' },
          toast(
            '【枯木生烟 · 玄苦授刀】圆满完成！习得《燃木刀法》，获赠【少林燃木戒刀】，实战经验 +650、贡献 +220、经义 +2！',
            'success',
            '枯木生烟',
          ),
        ],
      },
    ],
  },
}
