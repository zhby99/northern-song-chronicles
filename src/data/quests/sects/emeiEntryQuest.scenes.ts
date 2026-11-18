import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { EMEI_ENTRY_QUEST_ID } from './emeiEntryQuest'

const SPEAKER_YUNHUI: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0128' }
const SPEAKER_JINGXUAN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0169' }
const SPEAKER_JINGXU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0206' }
const SPEAKER_SU_MENGQING: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0207' }

const SPEAKER_GRAIN_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '癞头彪',
  title: '成都粮牙地痞头目',
  factionName: '市井无赖',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_POACHER: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑烟子',
  title: '偷猎灵药采药贼',
  factionName: '江湖散客',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const EM_GRAIN_THUG_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_EM_GRAIN_THUG',
  name: '癞头彪',
  title: '成都粮牙地痞头目',
  factionId: 'SECT-00',
  factionName: '市井无赖',
  sectRank: 0,
  sectRankLabel: '地痞头目',
  realm: '不入流',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  talk: '“大慈寺的施粥米也是白米！大爷今儿就扛走两袋，谁敢拦？”',
  stats: { hp: 100, mp: 40, agi: 8, res: 2 },
  talents: { bone: 42, comprehension: 34, charm: 30 },
  tenArts: {
    骑术: 5,
    算术: 10,
    经义: 0,
    策论: 0,
    诗词: 0,
    琴: 0,
    棋: 5,
    书: 0,
    画: 0,
    辩才: 15,
  },
  equippedArts: { move1: 'MA-171' },
  learnedArts: [{ artId: 'MA-171', level: 1 }],
})

const EM_POACHER_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_EM_POACHER',
  name: '黑烟子',
  title: '偷猎灵药采药贼',
  factionId: 'SECT-00',
  factionName: '江湖散客',
  sectRank: 0,
  sectRankLabel: '偷猎贼',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  talk: '“山猴子酿的百年猴儿酒值千金！少坏老子好事，吃我一记！”',
  stats: { hp: 145, mp: 60, agi: 11, res: 4 },
  talents: { bone: 50, comprehension: 48, charm: 35 },
  tenArts: {
    骑术: 10,
    算术: 15,
    经义: 5,
    策论: 5,
    诗词: 0,
    琴: 0,
    棋: 10,
    书: 5,
    画: 0,
    辩才: 15,
  },
  equippedArts: { move1: 'MA-171' },
  learnedArts: [{ artId: 'MA-171', level: 1 }],
})

const EM_JINDING_GUARD_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_EM_JINDING_GUARD',
  name: '峨眉金顶护法弟子',
  title: '华藏铜殿试锋女剑侍',
  factionId: 'SECT-07',
  factionName: '峨眉派',
  sectRank: 1,
  sectRankLabel: '护法弟子',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_emei_female_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_emei_female_fb.jpg',
  talk: '“奉静玄师伯之命，只用三流下品定力考校你的《峨眉吐纳术》与胆气，请出招！”',
  stats: { hp: 165, mp: 75, agi: 13, res: 5 },
  talents: { bone: 56, comprehension: 58, charm: 65 },
  tenArts: {
    骑术: 15,
    算术: 15,
    经义: 45,
    策论: 15,
    诗词: 30,
    琴: 25,
    棋: 20,
    书: 25,
    画: 20,
    辩才: 25,
  },
  equippedArts: { neigong: 'MA-161', move1: 'MA-171' },
  learnedArts: [
    { artId: 'MA-161', level: 1 },
    { artId: 'MA-171', level: 1 },
  ],
})

const SCENE_EM_01_DACISI_PORRIDGE: StorySceneDef = {
  id: 'SCENE_EM_01_DACISI_PORRIDGE',
  title: '第一幕 · 大慈寺施粥护粮',
  subtitle: '成都府 · 大慈寺（唐宋壁画阁）',
  illustrationUrl: '/assets/quests/emei_wanli_rain_umbrella.jpg',
  illustrationCaption: '春雨大慈寺外，飞燕苏梦清与白纸少年联手护住施粥棚',
  beats: [
    N('春汛过后，灌县大批灾民涌入成都大慈寺外避雨领粥。寺门外却喧嚷起来——几个粮牙地痞趁着静虚师太在殿内施药，竟推倒粥棚竹篱，伸手去扛赈灾米袋！'),
    S(SPEAKER_GRAIN_THUG, '“滚开！这几袋新米老子替‘护寺司’收了，你们这些穷鬼喝米汤去吧！”'),
    N('你见老人孩童被推倒在雨泥里，毫不犹豫跨步挡在米袋前。恰在此时，一柄油纸伞掠雨而来，峨眉俗家首席女侠「蜀道飞燕」苏梦清稳稳护住跌倒的妇孺，清声道：'),
    S(SPEAKER_SU_MENGQING, '“大慈寺义米岂容市井无赖撒野！这位小友，我替你护住身后老幼，那领头的癞头彪便交给你来教训！”'),
  ],
  choices: [
    {
      id: 'em_fight_grain_thug',
      label: '挺身而出，制住粮牙地痞癞头彪',
      tone: 'jade',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: EM_GRAIN_THUG_NPC },
          rule: 'spar',
          forbidEscapeReason: '身后便是灾民老幼与赈灾米袋，一步也退不得！',
          onWin: [openScene('SCENE_EM_02_THUG_ROUTED', EMEI_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_EM_01B_THUG_RETRY', EMEI_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_EM_01B_THUG_RETRY: StorySceneDef = {
  id: 'SCENE_EM_01B_THUG_RETRY',
  title: '大慈寺护粮 · 稳住阵脚',
  subtitle: '成都府 · 大慈寺（唐宋壁画阁）',
  beats: [
    N('雨地湿滑，你一时没踩稳被癞头彪推了一把。苏梦清撑伞横袖替你挡开一脚，温声提点：“先守御稳住重心，他酒色掏空了身子，撑不住几合！”'),
  ],
  choices: [
    {
      id: 'em_retry_grain_thug',
      label: '擦去雨水，再上前制住癞头彪',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: EM_GRAIN_THUG_NPC },
          rule: 'spar',
          forbidEscapeReason: '身后便是灾民老幼与赈灾米袋，一步也退不得！',
          onWin: [openScene('SCENE_EM_02_THUG_ROUTED', EMEI_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_EM_01B_THUG_RETRY', EMEI_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_EM_02_THUG_ROUTED: StorySceneDef = {
  id: 'SCENE_EM_02_THUG_ROUTED',
  title: '第二幕 · 雨歇施粥稳',
  subtitle: '成都府 · 大慈寺（唐宋壁画阁）',
  beats: [
    N('你迎着癞头彪的拳风矮身一撞，顺手夺过扁担将他扫翻在雨水里。几名地痞见领头栽了跟头，又慑于苏梦清腰间长剑，连滚带爬逃出巷口。'),
    S(SPEAKER_SU_MENGQING, '（收伞微笑）“好一身胆气！半点武功架子都没有，却半步不曾退让。”'),
    S(SPEAKER_JINGXU, '（自大雄正殿走出，双手合十）“阿弥陀佛。多谢这位小友护住施粥义米，请随贫尼进殿喝碗姜汤吧。”'),
  ],
  choices: [
    {
      id: 'em_to_scene_03',
      label: '随静虚师太与苏梦清入殿',
      tone: 'jade',
      effects: [openScene('SCENE_EM_03_JINGXU_TOKEN', EMEI_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_EM_03_JINGXU_TOKEN: StorySceneDef = {
  id: 'SCENE_EM_03_JINGXU_TOKEN',
  title: '第三幕 · 验明清白赐青玉',
  subtitle: '成都府 · 大慈寺（唐宋壁画阁）',
  beats: [
    S(SPEAKER_JINGXU, '（搭腕诊脉，随即慈和点头）“你经脉纯净，确是未曾入过任何门派、亦无良品及以上杂学缠身的白纸之身。只是行走江湖光凭一腔热肠不够，总得有护身内息。”'),
    S(SPEAKER_JINGXU, '“这枚【峨眉青玉信物】与二十两盘缠你且收好。随梦清前往【蜀中峨眉山 · 万年古寺禅院 > 回风拂柳演剑方庭】，拜见执法首座静玄师姐——她性子严厉如铁，你切莫轻慢。”'),
  ],
  choices: [
    {
      id: 'em_go_wannian',
      label: '接过青玉信物，随苏梦清赴峨眉万年古寺',
      tone: 'jade',
      effects: [
        { type: 'giveSilver', amount: 20, reason: '静虚师太赠赴峨眉盘缠' },
        { type: 'setQuestStep', questId: EMEI_ENTRY_QUEST_ID, stepId: 'wannian_iron_nun' },
        toast('已获二十两盘缠与青玉信物！请前往【蜀中峨眉山 > 万年古寺禅院 > 回风拂柳演剑方庭】。', 'success'),
      ],
    },
  ],
}

const SCENE_EM_04_WANNIAN_JINGXUAN: StorySceneDef = {
  id: 'SCENE_EM_04_WANNIAN_JINGXUAN',
  title: '第四幕 · 峨眉铁尼立门规',
  subtitle: '万年古寺禅院 · 回风拂柳演剑方庭',
  beats: [
    N('万年古寺青瓦覆苔，回风拂柳演剑方庭内寒气森然。外号「峨眉铁尼」的执法首座静玄师太手持铁拂尘，目光如电扫过你与苏梦清。'),
    S(SPEAKER_JINGXUAN, '“静虚师妹的信我收到了。但先说在前头——我峨眉佛法渡得了诚心人，却渡不了手软脚软、见财起意的蠢人！”'),
    S(SPEAKER_JINGXUAN, '“既想入我峨眉，便先去【白水荷池贝叶琴榭】跟着静虚的法门修出第一缕《峨眉吐纳术》清气，再去洗象池过了今晚这关！”'),
  ],
  choices: [
    {
      id: 'em_go_lotus_breathing',
      label: '谨遵法旨，移步白水荷池修习筑基吐纳',
      tone: 'jade',
      effects: [openScene('SCENE_EM_05_LOTUS_BREATHING', EMEI_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_EM_05_LOTUS_BREATHING: StorySceneDef = {
  id: 'SCENE_EM_05_LOTUS_BREATHING',
  title: '第五幕 · 白水荷池生清气',
  subtitle: '万年古寺禅院 · 白水荷池贝叶琴榭',
  beats: [
    N('白水荷池月影清凉，苏梦清取出一卷素绢小楷，逐字为你拆解峨眉筑基内功的呼吸吐纳之法。'),
    S(SPEAKER_SU_MENGQING, '“静玄师伯虽面冷，实则最护短也最守规矩。这门《峨眉吐纳术》乃是凡品上品内功，导气归元、清心明目，你且照着行气三周天。”'),
    N('你盘膝吐纳良久，果觉丹田升起一缕温润清气，耳目清明数倍——正式习得 **`MA-161`《峨眉吐纳术》（凡品上品·内功）**！'),
  ],
  choices: [
    {
      id: 'em_learn_tunashu',
      label: '收功起身，领受丹药赴洗象池',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-161', autoEquip: true },
        { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
        toast('已习得并装配《峨眉吐纳术》（凡品上品·内功），获赠两枚疗伤丹药！', 'success'),
        openScene('SCENE_EM_06_TOWARD_XIXIANG', EMEI_ENTRY_QUEST_ID),
      ],
    },
  ],
}

const SCENE_EM_06_TOWARD_XIXIANG: StorySceneDef = {
  id: 'SCENE_EM_06_TOWARD_XIXIANG',
  title: '第六幕 · 月上洗象池',
  subtitle: '万年古寺禅院 · 山道',
  beats: [
    S(SPEAKER_SU_MENGQING, '“洗象池近来有山外偷猎客出没，专盯着守护灵池的老白猿酿下的百年猴儿酒。我们速去【洗象池灵猴剑坪 > 灵猿戏剑苍松崖坪】巡视一番！”'),
  ],
  choices: [
    {
      id: 'em_step_xixiang',
      label: '随苏梦清动身前往洗象池灵猴剑坪',
      tone: 'jade',
      effects: [
        { type: 'setQuestStep', questId: EMEI_ENTRY_QUEST_ID, stepId: 'xixiang_protect_monkeys' },
        toast('请前往【洗象池灵猴剑坪 > 灵猿戏剑苍松崖坪】护卫山灵！', 'success'),
      ],
    },
  ],
}

const SCENE_EM_07_XIXIANG_POACHER: StorySceneDef = {
  id: 'SCENE_EM_07_XIXIANG_POACHER',
  title: '第七幕 · 洗象池迷烟偷猎贼',
  subtitle: '洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪',
  illustrationUrl: '/assets/quests/emei_xixiang_moon_ape.jpg',
  illustrationCaption: '澄月照古松，迷烟笼石坪，白猿护药遇险',
  beats: [
    N('夜雾笼罩洗象池苍松崖坪，几只小猴倒在石阶旁昏迷不醒，一头毛发雪白的老猿正愤怒嘶鸣，却被滚滚刺鼻迷烟逼得连连后退！'),
    S(SPEAKER_POACHER, '（拎着竹筒往石缝里灌烟，嘿嘿直笑）“再撑半刻，这窝百年猴儿酒就全归老子了！”'),
    S(SPEAKER_SU_MENGQING, '（正被山道另一侧的滑坡阻住去路，高声喝道）“小友，运起《峨眉吐纳术》闭气定神，别让他逃进深林！”'),
  ],
  choices: [
    {
      id: 'em_fight_poacher',
      label: '运起吐纳清气屏息定神，迎战迷烟采药贼黑烟子',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: EM_POACHER_NPC },
          rule: 'spar',
          forbidEscapeReason: '老白猿与幼猴危在旦夕，岂能临阵退缩！',
          onWin: [openScene('SCENE_EM_08_MONKEY_WINE_CHOICE', EMEI_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_EM_07B_POACHER_RETRY', EMEI_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_EM_07B_POACHER_RETRY: StorySceneDef = {
  id: 'SCENE_EM_07B_POACHER_RETRY',
  title: '洗象池再战 · 清气定神',
  subtitle: '洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪',
  beats: [
    N('林间迷烟刺鼻，你一时气息紊乱退了一步。老白猿跃上前替你挡开贼人一脚，苏梦清也已绕过滑坡喝道：“调匀吐纳呼吸再上！”'),
  ],
  choices: [
    {
      id: 'em_retry_poacher',
      label: '定神聚气，再上前拿下黑烟子',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: EM_POACHER_NPC },
          rule: 'spar',
          forbidEscapeReason: '老白猿与幼猴危在旦夕，岂能临阵退缩！',
          onWin: [openScene('SCENE_EM_08_MONKEY_WINE_CHOICE', EMEI_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_EM_07B_POACHER_RETRY', EMEI_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_EM_08_MONKEY_WINE_CHOICE: StorySceneDef = {
  id: 'SCENE_EM_08_MONKEY_WINE_CHOICE',
  title: '第八幕 · 百年灵药与迷烟方',
  subtitle: '洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪',
  beats: [
    N('你逼退黑烟子，那贼人丢下竹篓狼狈逃窜。地上散落着两只封得严严实实的玉瓶——里面正是价值不菲的「百年猴儿酒」，旁侧还掉了一张市井抢手的秘制迷烟药方。'),
    N('苏梦清正忙着照看崖下昏迷的幼猴，尚未走近。老白猿眨着乌溜溜的眼睛，静静看着你伸向药篓的手。'),
  ],
  choices: [
    {
      id: 'em_choice_return_wine',
      label: '将百年猴儿酒归还守池灵猿，当场撕毁迷烟药方',
      tone: 'jade',
      effects: [openScene('SCENE_EM_09_PURE_HEART_PASS', EMEI_ENTRY_QUEST_ID)],
    },
    {
      id: 'em_choice_steal_wine',
      label: '趁苏梦清背身救猴，暗中将猴儿酒与迷烟方塞入行囊私吞',
      tone: 'danger',
      effects: [openScene('SCENE_EM_08B_REJECTED_GREED', EMEI_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_EM_08B_REJECTED_GREED: StorySceneDef = {
  id: 'SCENE_EM_08B_REJECTED_GREED',
  title: '逐出峨眉 · 贪墨永绝',
  subtitle: '洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪',
  beats: [
    N('你刚把玉瓶塞进包袱，鼻子极灵的老白猿突然怒啸一声扑了上来，一爪撕破你的行囊，两只玉瓶与迷烟方叮当滚落在地！'),
    N('恰在此刻，巡山而来的执法首座「峨眉铁尼」静玄师太正好踏上崖坪，将这一幕尽收眼底！'),
    S(SPEAKER_JINGXUAN, '（面色铁青，拂尘一甩震碎那张迷烟方）“好啊！还未跨进华藏金顶门槛，便敢在佛门清净地欺瞒同门、私吞山灵之物！我峨眉铁律岂容手脚不净之徒？把青玉信物留下，滚下山去，此生莫再踏入峨眉半步！”'),
  ],
  choices: [
    {
      id: 'em_confirm_rejected_greed',
      label: '颜面扫地，被静玄师太逐出峨眉（永绝峨眉派）',
      tone: 'danger',
      effects: [
        { type: 'setFlag', flag: 'em_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: EMEI_ENTRY_QUEST_ID },
        toast('因私吞洗象池百年猴儿酒与迷烟方遭静玄师太逐斥，此生再无缘拜入【峨眉派】！', 'warn'),
      ],
    },
  ],
}

const SCENE_EM_09_PURE_HEART_PASS: StorySceneDef = {
  id: 'SCENE_EM_09_PURE_HEART_PASS',
  title: '第九幕 · 灵猿折竹送行',
  subtitle: '洗象池灵猴剑坪 · 灵猿戏剑苍松崖坪',
  beats: [
    N('你将两只玉瓶轻放回老白猿身旁，又将迷烟药方撕成碎纸埋入湿泥。老白猿通灵，竟朝你作揖拜了两拜，苏梦清走近见状也不由展颜一笑。'),
    S(SPEAKER_JINGXUAN, '（不知何时已立在松影下，神色难得缓和半分）“不贪异宝、不藏私念，总算没叫静虚师妹看走眼。明晨上【峨眉金顶睹光台 > 华藏金顶普贤铜殿】，过了金顶护法那一剑，便去见云慧掌门吧。”'),
  ],
  choices: [
    {
      id: 'em_ascend_jinding',
      label: '谢过静玄师太与苏梦清，登临峨眉金顶',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'setQuestStep', questId: EMEI_ENTRY_QUEST_ID, stepId: 'jinding_trial_and_oath' },
        toast('气血内力已恢复！请前往【峨眉金顶睹光台 > 华藏金顶普贤铜殿】。', 'success'),
      ],
    },
  ],
}

const SCENE_EM_10_JINDING_SPAR: StorySceneDef = {
  id: 'SCENE_EM_10_JINDING_SPAR',
  title: '第十幕 · 金顶护法试锋',
  subtitle: '峨眉金顶睹光台 · 华藏金顶普贤铜殿',
  beats: [
    N('万仞金顶积雪未消，普贤铜殿前云海翻涌。一名金顶护法女弟子持剑迎出，合十行礼：'),
    S(SPEAKER_JINGXUAN, '（在一旁沉声监阵）“峨眉非只念经吃斋之地，金顶风雪亦需真功夫。护法弟子已压低修为至三流下品，唯有堂堂正正胜过这一场，方有资格入殿觐见掌门！”'),
  ],
  choices: [
    {
      id: 'em_fight_jinding_guard',
      label: '运起《峨眉吐纳术》，接下金顶护法弟子考校',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: EM_JINDING_GUARD_NPC },
          rule: 'spar',
          forbidEscapeReason: '金顶考校岂可半途而退！',
          onWin: [openScene('SCENE_EM_11_YUNHUI_BRANCH', EMEI_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_EM_10B_JINDING_RETRY', EMEI_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_EM_10B_JINDING_RETRY: StorySceneDef = {
  id: 'SCENE_EM_10B_JINDING_RETRY',
  title: '金顶试锋 · 调息再战',
  subtitle: '峨眉金顶睹光台 · 华藏金顶普贤铜殿',
  beats: [
    S(SPEAKER_JINGXUAN, '“金顶之上不容敷衍。调匀《峨眉吐纳术》内息，重来！”'),
  ],
  choices: [
    {
      id: 'em_retry_jinding_guard',
      label: '调息完毕，再向金顶护法弟子请教',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: EM_JINDING_GUARD_NPC },
          rule: 'spar',
          forbidEscapeReason: '金顶考校岂可半途而退！',
          onWin: [openScene('SCENE_EM_11_YUNHUI_BRANCH', EMEI_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_EM_10B_JINDING_RETRY', EMEI_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_EM_11_YUNHUI_BRANCH: StorySceneDef = {
  id: 'SCENE_EM_11_YUNHUI_BRANCH',
  title: '第十一幕 · 佛光映铜殿，择脉问本心',
  subtitle: '峨眉金顶睹光台 · 华藏金顶普贤铜殿',
  illustrationUrl: '/assets/quests/emei_jinding_buddha_light.jpg',
  illustrationCaption: '七彩佛光破云海，金顶神尼云慧师太静候入门之人',
  beats: [
    N('你稳扎稳打胜过金顶护法弟子，铜殿大门缓缓敞开，七彩佛光恰破云而出。掌门「金顶神尼」云慧师太端坐莲台之前，目光慈和却如照人心。'),
    S(SPEAKER_YUNHUI, '“大慈护粮、万年受法、洗象守戒、金顶胜锋，静玄与梦清都已禀明。我峨眉佛道兼修，门下分【俗家剑脉】与【华藏净脉】——一者入世护道不必落发，一者清修禅武护佑苍生。你心向何处？”'),
  ],
  choices: [
    {
      id: 'em_branch_secular',
      label: '择【俗家剑脉】拜入峨眉派（红尘护道，男女皆宜）',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'em_entry_branch', value: 'secular' },
        openScene('SCENE_EM_12_JOIN_EMEI', EMEI_ENTRY_QUEST_ID),
      ],
    },
    {
      id: 'em_branch_monastic',
      label: '择【华藏净脉】拜入峨眉派（潜心禅武，清净护法）',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'em_entry_branch', value: 'monastic' },
        openScene('SCENE_EM_12_JOIN_EMEI', EMEI_ENTRY_QUEST_ID),
      ],
    },
    {
      id: 'em_branch_decline',
      label: '“弟子尘缘未了，恐负金顶清规，愿携吐纳术辞别下山。”',
      tone: 'default',
      effects: [openScene('SCENE_EM_12B_DECLINE_PEACEFULLY', EMEI_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_EM_12B_DECLINE_PEACEFULLY: StorySceneDef = {
  id: 'SCENE_EM_12B_DECLINE_PEACEFULLY',
  title: '辞别金顶 · 缘止于此',
  subtitle: '峨眉金顶睹光台 · 华藏金顶普贤铜殿',
  beats: [
    S(SPEAKER_YUNHUI, '（合十微笑）“既知自心，不勉强便是善缘。那门凡品《峨眉吐纳术》权当谢你大慈寺护粮之功，下山去吧，金顶之缘就此为止。”'),
  ],
  choices: [
    {
      id: 'em_confirm_decline',
      label: '合十辞别云慧师太，下山另闯江湖',
      tone: 'default',
      effects: [
        { type: 'setFlag', flag: 'em_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: EMEI_ENTRY_QUEST_ID },
        toast('你婉拒入派拜别云慧师太，峨眉派入门之缘已止（仍保有白纸清白之身）。', 'talk'),
      ],
    },
  ],
}

const SCENE_EM_12_JOIN_EMEI: StorySceneDef = {
  id: 'SCENE_EM_12_JOIN_EMEI',
  title: '第十二幕 · 受刺入峨眉',
  subtitle: '峨眉金顶睹光台 · 华藏金顶普贤铜殿',
  illustrationUrl: '/assets/quests/emei_jinding_buddha_light.jpg',
  illustrationCaption: '金顶钟鸣云海散，峨眉派新添一位护道门人',
  beats: [
    S(SPEAKER_YUNHUI, '（含笑颔首，取出一对寒光湛然的精钢分水刺与秘谱交予你）“既定本心，今日起你便是我峨眉派弟子！这门本派【分水峨眉刺】由你修习，望你日后柔不失骨、慈不废义。”'),
    N('铜殿钟声悠扬传遍峨眉八十四盘，苏梦清与静玄师太齐声道贺，自此正式位列蜀中峨眉派门墙！'),
  ],
  choices: [
    {
      id: 'em_complete_entry',
      label: '受传《分水峨眉刺》，正式拜入峨眉派',
      tone: 'jade',
      effects: [
        { type: 'joinSect', sectId: 'SECT-07', rank: 1 },
        { type: 'teachMartialArt', artId: 'MA-136', autoEquip: true },
        { type: 'giveSilver', amount: 50, reason: '峨眉派入门赐银' },
        { type: 'modifyRenown', delta: 15, reason: '拜入蜀中峨眉派' },
        { type: 'completeQuest', questId: EMEI_ENTRY_QUEST_ID },
        toast('恭喜正式拜入【峨眉派（SECT-07）】，习得《分水峨眉刺》（良品中品）并获五十两银钱！', 'success'),
      ],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_EM_01_DACISI_PORRIDGE.id]: SCENE_EM_01_DACISI_PORRIDGE,
  [SCENE_EM_01B_THUG_RETRY.id]: SCENE_EM_01B_THUG_RETRY,
  [SCENE_EM_02_THUG_ROUTED.id]: SCENE_EM_02_THUG_ROUTED,
  [SCENE_EM_03_JINGXU_TOKEN.id]: SCENE_EM_03_JINGXU_TOKEN,
  [SCENE_EM_04_WANNIAN_JINGXUAN.id]: SCENE_EM_04_WANNIAN_JINGXUAN,
  [SCENE_EM_05_LOTUS_BREATHING.id]: SCENE_EM_05_LOTUS_BREATHING,
  [SCENE_EM_06_TOWARD_XIXIANG.id]: SCENE_EM_06_TOWARD_XIXIANG,
  [SCENE_EM_07_XIXIANG_POACHER.id]: SCENE_EM_07_XIXIANG_POACHER,
  [SCENE_EM_07B_POACHER_RETRY.id]: SCENE_EM_07B_POACHER_RETRY,
  [SCENE_EM_08_MONKEY_WINE_CHOICE.id]: SCENE_EM_08_MONKEY_WINE_CHOICE,
  [SCENE_EM_08B_REJECTED_GREED.id]: SCENE_EM_08B_REJECTED_GREED,
  [SCENE_EM_09_PURE_HEART_PASS.id]: SCENE_EM_09_PURE_HEART_PASS,
  [SCENE_EM_10_JINDING_SPAR.id]: SCENE_EM_10_JINDING_SPAR,
  [SCENE_EM_10B_JINDING_RETRY.id]: SCENE_EM_10B_JINDING_RETRY,
  [SCENE_EM_11_YUNHUI_BRANCH.id]: SCENE_EM_11_YUNHUI_BRANCH,
  [SCENE_EM_12B_DECLINE_PEACEFULLY.id]: SCENE_EM_12B_DECLINE_PEACEFULLY,
  [SCENE_EM_12_JOIN_EMEI.id]: SCENE_EM_12_JOIN_EMEI,
}
