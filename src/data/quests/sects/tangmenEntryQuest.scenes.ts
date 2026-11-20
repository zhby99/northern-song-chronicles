import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, flag, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { TANGMEN_ENTRY_QUEST_ID } from './tangmenEntryQuest'

const SPEAKER_TANG_HE_XUAN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0125' }
const SPEAKER_TANG_WU_YING: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0149' }
const SPEAKER_TANG_TIAN_BIAO: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0175' }
const SPEAKER_TANG_QIAN_JI: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0218' }
const SPEAKER_TANG_HONG_XIU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0219' }
const SPEAKER_TANG_GEN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0670' }
const SPEAKER_SU_BAI_CAO: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0316' }

const SPEAKER_VENOM_PAWN: StorySpeakerSpec = {
  kind: 'custom',
  name: '麻蛇老七',
  title: '苗疆黑市掉包毒贩',
  factionName: '川南毒枭',
  portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
}

const SPEAKER_MIAO_BOSS: StorySpeakerSpec = {
  kind: 'custom',
  name: '蓝蝎子',
  title: '黑市劫药五毒蛊师',
  factionName: '川南毒枭',
  portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
}

const TM_VENOM_PAWN_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_TM_VENOM_PAWN',
  name: '麻蛇老七',
  title: '苗疆黑市掉包毒贩',
  factionId: 'SECT-00',
  factionName: '川南毒枭',
  sectRank: 0,
  sectRankLabel: '黑市毒贩',
  realm: '不入流',
  avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg',
  talk: '“百草堂里已经乱成一锅粥了！把这篓药放下，饶你不死！”',
  stats: { hp: 100, mp: 40, agi: 9, res: 2 },
  talents: { bone: 43, comprehension: 40, charm: 32 },
  tenArts: {
    骑术: 5,
    算术: 15,
    经义: 0,
    策论: 0,
    诗词: 0,
    琴: 0,
    棋: 5,
    书: 0,
    画: 0,
    辩才: 15,
  },
  equippedArts: { move1: 'MA-195' },
  learnedArts: [{ artId: 'MA-195', level: 1 }],
})

const TM_MIAO_BOSS_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_TM_MIAO_BOSS',
  name: '蓝蝎子',
  title: '黑市劫药五毒蛊师',
  factionId: 'SECT-00',
  factionName: '川南毒枭',
  sectRank: 0,
  sectRankLabel: '劫药蛊师',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg',
  talk: '“唐家堡的雪山紫乌头到了老子手里，还想拿回去？先尝尝我的迷瘴砂！”',
  stats: { hp: 150, mp: 65, agi: 12, res: 4 },
  talents: { bone: 50, comprehension: 52, charm: 35 },
  tenArts: {
    骑术: 10,
    算术: 20,
    经义: 5,
    策论: 5,
    诗词: 0,
    琴: 0,
    棋: 10,
    书: 5,
    画: 0,
    辩才: 18,
  },
  equippedArts: { move1: 'MA-196' },
  learnedArts: [{ artId: 'MA-196', level: 1 }],
})

const TM_TANG_GEN_SPAR_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_TM_TANG_GEN_SPAR',
  name: '唐艮',
  title: '神行客 · 梅花桩试镖执事',
  factionId: 'SECT-13',
  factionName: '蜀中唐门',
  sectRank: 1,
  sectRankLabel: '外院试镖执事',
  realm: '三流下品',
  avatarUrl: '/assets/characters/cutouts/fullbody/NPC-0670.webp',
  portraitUrl: '/assets/characters/cutouts/fullbody/NPC-0670.webp',
  talk: '“奉千机堂主之命，我只用三流下品机簧准头在桩上考你——看紧手腕簧音，出箭吧！”',
  stats: { hp: 170, mp: 80, agi: 13, res: 5 },
  talents: { bone: 55, comprehension: 60, charm: 50 },
  tenArts: {
    骑术: 15,
    算术: 35,
    经义: 10,
    策论: 15,
    诗词: 10,
    琴: 5,
    棋: 20,
    书: 15,
    画: 15,
    辩才: 20,
  },
  equippedArts: { neigong: 'MA-242', move1: 'MA-195' },
  learnedArts: [{ artId: 'MA-242', level: 1 }, { artId: 'MA-195', level: 1 }],
})

const SCENE_TM_01_BAICAO_SWAP: StorySceneDef = {
  id: 'SCENE_TM_01_BAICAO_SWAP',
  title: '第一幕 · 药廊紫烟掉包案',
  subtitle: '成都府 · 西川百草药武堂（千味川药晾晒廊）',
  illustrationUrl: '/assets/quests/tangmen_baicao_poison_smoke.jpg',
  illustrationCaption: '千味药廊突腾腥甜紫烟，毒观音唐红袖冷眼锁院揪内奸',
  beats: [
    N('{reignYear}暮春，灌县山路刚运抵【西川百草药武堂】的两篓「雪山紫乌头」才揭开油纸封泥，篓底骤然腾起一股腥甜紫烟！负责验秤的药堂伙计闷哼一声，手背乌黑栽倒在地！'),
    S(SPEAKER_SU_BAI_CAO, '（疾步抢上连施三枚金针封住伙计心脉，骇然变色）“不好！这不是川西雪山乌头，篓底被人掉包掺了南疆‘腐血尸蟾涎’！”'),
    N('话音未落，两道乌青身影如鬼魅般封死晾晒廊前后院门——唐门刑堂大长老「夺魄追魂」唐天镖指间扣着寒星铁镖，「毒观音」唐红袖执一方紫纱立于廊柱旁，目光冷冽扫过全场。'),
    S(SPEAKER_TANG_TIAN_BIAO, '“敢在锦官城截我唐家堡密订的药引，还用尸蟾毒折我唐门颜面！贼人必定守在后巷茶摊，等着药堂乱起来趁火截走剩下半车药箱。”'),
    S(SPEAKER_TANG_HONG_XIU, '（美目流转，落在近旁神色镇定的你身上）“我与天镖叔这张脸一露面，毒耗子便钻回地缝了。这位{gender:小兄弟|小姑娘}从未入过任何门派、身上亦无半点他派武学气机——你可敢替我唐门拎只空药篓走一趟后巷，把那掉包的耗子引出来？”'),
  ],
  choices: [
    {
      id: 'tm_baicao_keen_eye',
      label: '指认油纸封泥混有赤褐辰砂土，献计以湿麻布覆篓诱敌出洞',
      subLabel: '心思缜密识破苗疆封泥破绽，唐红袖青眼相加',
      tone: 'gold',
      condition: { type: 'talentAtLeast', key: '悟性', min: 78 },
      effects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0219' }, delta: 5 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_VENOM_PAWN_NPC },
          rule: 'spar',
          forbidEscapeReason: '唐天镖与唐红袖正在暗处盯着，一退便失了进身之机！',
          onWin: [openScene('SCENE_TM_02_VENOM_DEALER_CAUGHT', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_01B_PAWN_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
    {
      id: 'tm_baicao_brave_bait',
      label: '爽快接过竹药篓步入后巷，引掉包毒贩麻蛇老七现身',
      tone: 'jade',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_VENOM_PAWN_NPC },
          rule: 'spar',
          forbidEscapeReason: '唐天镖与唐红袖正在暗处盯着，一退便失了进身之机！',
          onWin: [openScene('SCENE_TM_02_VENOM_DEALER_CAUGHT', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_01B_PAWN_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_TM_01B_PAWN_RETRY: StorySceneDef = {
  id: 'SCENE_TM_01B_PAWN_RETRY',
  title: '药廊后巷 · 屏息再战',
  subtitle: '成都府 · 西川百草药武堂',
  beats: [
    N('麻蛇老七袖中撒出一把辛辣药灰，你急忙偏头避让退了半步。墙头瓦檐上唐红袖冷声传音：“毒贩下盘虚浮，护住面门抢他持刺的右手！”'),
  ],
  choices: [
    {
      id: 'tm_retry_venom_pawn',
      label: '屏住呼吸拎起药扁担，再上后巷制住麻蛇老七',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_VENOM_PAWN_NPC },
          rule: 'spar',
          forbidEscapeReason: '唐天镖与唐红袖正在暗处盯着，一退便失了进身之机！',
          onWin: [openScene('SCENE_TM_02_VENOM_DEALER_CAUGHT', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_01B_PAWN_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_TM_02_VENOM_DEALER_CAUGHT: StorySceneDef = {
  id: 'SCENE_TM_02_VENOM_DEALER_CAUGHT',
  title: '第二幕 · 夺魄钉骨审毒踪',
  subtitle: '成都府 · 西川百草药武堂',
  beats: [
    N('你借竹药篓架住麻蛇老七的短刺，顺势一记重脚踹中他膝弯！那毒贩刚想咬碎齿间毒囊自尽，巷头一道乌光破空而至——唐天镖指间铁镖精准震脱其下颌，将他死死钉在青砖墙根！'),
    S(SPEAKER_VENOM_PAWN, '（满口鲜血惨嚎）“饶命！那两箱真品‘雪山紫乌头’已被我家蛊师蓝蝎子走灌县水路偷运进青城后山瘴林，准备今夜从万毒涧外栈转手卖给西夏药商……”'),
    S(SPEAKER_TANG_TIAN_BIAO, '（冷哼一声，命暗桩铁链锁走毒贩，转头打量你）“半点内力没有，面对淬毒短刺倒不眨眼。红袖，这苗子归你万毒涧先筛一遍。”'),
  ],
  choices: [
    {
      id: 'tm_to_scene_03',
      label: '抱拳听候唐红袖示下',
      tone: 'jade',
      effects: [openScene('SCENE_TM_03_HONGXIU_TOKEN', TANGMEN_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_TM_03_HONGXIU_TOKEN: StorySceneDef = {
  id: 'SCENE_TM_03_HONGXIU_TOKEN',
  title: '第三幕 · 验脉清白授乌木牌',
  subtitle: '成都府 · 西川百草药武堂',
  beats: [
    S(SPEAKER_TANG_HONG_XIU, '（隔着紫纱指尖轻搭你腕脉，唇角微弯）“脉象干净如白纸，确是未入过任何门派、亦未染指半门良品杂学的清白身。我蜀中唐门机毒两脉皆系身家性命，最忌他派细作带艺混入。”'),
    S(SPEAKER_TANG_HONG_XIU, '“这枚【乌木毒砂牌】与二十两纹银你拿着。西出成都赴【青城山 / 唐家堡 > 唐门万毒试炼涧 > 五彩毒瘴幽泉灵潭】——既想做我唐门的外宅门客，先拿你这副血肉之躯试过我的五彩瘴泉再说！”'),
  ],
  choices: [
    {
      id: 'tm_go_wandu_pool',
      label: '接过乌木毒砂牌与盘缠，西赴唐家堡万毒试炼涧',
      tone: 'gold',
      effects: [
        { type: 'giveSilver', amount: 20, reason: '唐红袖赏药廊诱擒毒贩盘缠' },
        { type: 'setQuestStep', questId: TANGMEN_ENTRY_QUEST_ID, stepId: 'wandu_pool_trial' },
        toast('已获二十两纹银与乌木毒砂牌！请前往【青城山 / 唐家堡 > 唐门万毒试炼涧 > 五彩毒瘴幽泉灵潭】。', 'success'),
      ],
    },
  ],
}

const SCENE_TM_04_WANDU_MIASMA: StorySceneDef = {
  id: 'SCENE_TM_04_WANDU_MIASMA',
  title: '第四幕 · 五彩瘴泉吞丸试胆',
  subtitle: '唐门万毒试炼涧 · 五彩毒瘴幽泉灵潭',
  illustrationUrl: '/assets/quests/tangmen_wandu_miasma_pool.jpg',
  illustrationCaption: '幽涧五彩瘴雾翻涌，毒观音捻丸立潭畔试外姓死生胆魄',
  beats: [
    N('踏入唐家堡后山万毒试炼涧，两侧绝壁藤萝垂挂，幽泉灵潭上方浮动着赤紫斑斓的毒瘴薄雾，水底隐见银环赤练游弋。唐红袖早已换上一袭墨紫窄袖劲装立于潭畔青石之上。'),
    S(SPEAKER_TANG_HONG_XIU, '（指间捻着半粒乌黑油亮的药丸）“唐门之人整日与乌头、断肠草、孔雀胆打交道，未伤敌先得护己。这半粒‘百草试瘴丸’合着潭中寒泉可激出脏腑潜气，若心慌气乱便会毒火攻心——你敢不敢吞下去浸足三刻？”'),
  ],
  choices: [
    {
      id: 'tm_swallow_miasma_pill',
      label: '毫不迟疑仰首吞下试瘴丸，跃入五彩幽泉灵潭',
      tone: 'jade',
      effects: [openScene('SCENE_TM_05_BIDU_NEIGONG', TANGMEN_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_TM_05_BIDU_NEIGONG: StorySceneDef = {
  id: 'SCENE_TM_05_BIDU_NEIGONG',
  title: '第五幕 · 寒潭化毒筑真气',
  subtitle: '唐门万毒试炼涧 · 五彩毒瘴幽泉灵潭',
  beats: [
    N('刚入刺骨寒潭，腹中试瘴丸骤然化作一股燥烈毒火直冲咽喉，潭面五彩瘴气亦顺着毛孔丝丝渗入！你牙关紧咬，额角青筋暴起却死死盘坐水底青石不退。'),
    S(SPEAKER_TANG_HONG_XIU, '（隔水清冷传音）“舌抵上腭、意守神阙！以潭水阴寒裹住药丸燥火，呼浊留清，归入下丹田闭住气门！”'),
    N('你依着口诀一呼一吸，腹中寒热二气竟在经脉里缓缓拧成一缕微凉坚韧的碧幽内息，周身毛孔逼出一层乌黑腥沫——成功破零领悟 **`MA-227`《唐门闭毒养气功》（凡品上品·内功）**！'),
  ],
  choices: [
    {
      id: 'tm_learn_bidu_neigong',
      label: '运转闭毒真气跃出寒潭，接过清心散调匀呼吸',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-227', autoEquip: true },
        { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
        toast('已习得并装配《唐门闭毒养气功》（凡品上品·内功），获赠两包【太乙回气清心散】！', 'success'),
        openScene('SCENE_TM_06_AMBUSH_SMUGGLER', TANGMEN_ENTRY_QUEST_ID),
      ],
    },
  ],
}

const SCENE_TM_06_AMBUSH_SMUGGLER: StorySceneDef = {
  id: 'SCENE_TM_06_AMBUSH_SMUGGLER',
  title: '第六幕 · 铁索涧口截蛊师',
  subtitle: '唐门万毒试炼涧 · 飞瀑外涧',
  beats: [
    N('你刚披衣立定，万毒涧外侧的悬崖铁索忽然传来一阵急促机括铜铃声！一名背负两只黑漆药箱的苗疆汉子误触唐门暗哨，惊怒之下扬手撒出大片灰绿迷瘴砂，正欲夺路逃出竹海！'),
    S(SPEAKER_MIAO_BOSS, '“晦气！唐家堡外涧怎还藏着活人？谁敢挡我蓝蝎子的财路，叫他化作浓水！”'),
    S(SPEAKER_TANG_HONG_XIU, '（抱臂立在潭畔高石上，笑吟吟不动手）“那便是偷运雪山紫乌头的主谋蓝蝎子。正好拿他试试你刚练成的《唐门闭毒养气功》——把那两箱乌头给我原封不动留下来！”'),
  ],
  choices: [
    {
      id: 'tm_fight_miao_boss',
      label: '运起《唐门闭毒养气功》屏绝迷瘴，上前截击蓝蝎子',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_MIAO_BOSS_NPC },
          rule: 'spar',
          forbidEscapeReason: '两箱雪山紫乌头近在咫尺，岂容毒枭逃出万毒涧！',
          onWin: [openScene('SCENE_TM_06C_HERB_RECOVERED', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_06B_SMUGGLER_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_TM_06B_SMUGGLER_RETRY: StorySceneDef = {
  id: 'SCENE_TM_06B_SMUGGLER_RETRY',
  title: '外涧再战 · 闭毒反击',
  subtitle: '唐门万毒试炼涧 · 飞瀑外涧',
  beats: [
    N('蓝蝎子的迷瘴砂颇为阴毒，你一时眼眶酸涩退开数步。唐红袖屈指弹出一缕幽香药风吹散毒雾，冷声道：“紧闭气门莫贪快，等他撒砂旧力刚尽时欺身破他！”'),
  ],
  choices: [
    {
      id: 'tm_retry_miao_boss',
      label: '催动闭毒内息稳住心神，再战五毒蛊师蓝蝎子',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_MIAO_BOSS_NPC },
          rule: 'spar',
          forbidEscapeReason: '两箱雪山紫乌头近在咫尺，岂容毒枭逃出万毒涧！',
          onWin: [openScene('SCENE_TM_06C_HERB_RECOVERED', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_06B_SMUGGLER_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_TM_06C_HERB_RECOVERED: StorySceneDef = {
  id: 'SCENE_TM_06C_HERB_RECOVERED',
  title: '乌头归匣 · 转赴天机阁',
  subtitle: '唐门万毒试炼涧 · 五彩毒瘴幽泉灵潭',
  beats: [
    N('你仗着《唐门闭毒养气功》穿过毒烟欺近身前，一掌劈落蓝蝎子肩上两只黑漆药箱！外涧唐门巡山弟子闻铃合围，瞬间用倒刺铁网将蓝蝎子捆成粽子押往刑堂。'),
    S(SPEAKER_TANG_HONG_XIU, '（启箱验看雪山紫乌头分毫无损，满意颔首）“毒关你已过了。但我唐门立世，靠的是‘毒药为魂、机括为骨’——去前堡【唐家堡天机机关阁 > 梅花桩百靶试镖院】找我那位眼高于顶的族兄唐千机吧，过了他的暗器关，方有资格进千簧总阁！”'),
  ],
  choices: [
    {
      id: 'tm_go_meihuazhuang',
      label: '辞别唐红袖，前往天机机关阁梅花桩百靶试镖院',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'setQuestStep', questId: TANGMEN_ENTRY_QUEST_ID, stepId: 'tianji_meihuazhuang' },
        toast('万毒试药已过！请前往【唐家堡天机机关阁 > 梅花桩百靶试镖院】拜见唐千机。', 'success'),
      ],
    },
  ],
}

const SCENE_TM_07_QIANJI_SLEEVE_DART: StorySceneDef = {
  id: 'SCENE_TM_07_QIANJI_SLEEVE_DART',
  title: '第七幕 · 机括鬼手授袖箭',
  subtitle: '唐家堡天机机关阁 · 梅花桩百靶试镖院',
  beats: [
    N('踏入梅花桩百靶试镖院，高高低低七十二根楠木桩下尽是齿轮牵引的翻转铜人靶。外号「机括鬼手」的唐千机正手持青铜卡尺校准簧片，外院执事「神行客」唐艮抱臂立于桩前。'),
    S(SPEAKER_TANG_QIAN_JI, '（头也不抬，冷冷抛来一具熟铁袖箭筒与一册薄谱）“红袖挑的人？我丑话说在前头：毒药再霸道，打偏半寸便是给人挠痒！唐门真正的不传暗器在未立契前绝不外授，我先教你一门江湖凡品【甩手袖箭】，腕底绑上这具【机簧甩手袖箭】，听准三级簧音再上梅花桩！”'),
  ],
  choices: [
    {
      id: 'tm_learn_dart_math_insight',
      label: '依勾股弦度推算铜靶转轮间隙，调紧袖箭二档发条领受秘谱',
      subLabel: '精研算理看破转靶机括节奏，令唐千机刮目相看',
      tone: 'gold',
      condition: { type: 'skillAtLeast', key: '算术', min: 30 },
      effects: [
        { type: 'teachMartialArt', artId: 'MA-175', autoEquip: true },
        { type: 'giveItem', itemId: 'WPN-070', qty: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0218' }, delta: 5 },
        toast('已习得并装配《甩手袖箭》（凡品·暗器），获赐【机簧甩手袖箭】（凡阶上品）！', 'success'),
        openScene('SCENE_TM_08_MEIHUA_SPAR', TANGMEN_ENTRY_QUEST_ID),
      ],
    },
    {
      id: 'tm_learn_dart_standard',
      label: '绑紧【机簧甩手袖箭】，静心领悟凡品《甩手袖箭》发劲诀窍',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-175', autoEquip: true },
        { type: 'giveItem', itemId: 'WPN-070', qty: 1 },
        toast('已习得并装配《甩手袖箭》（凡品·暗器），获赐【机簧甩手袖箭】（凡阶上品）！', 'success'),
        openScene('SCENE_TM_08_MEIHUA_SPAR', TANGMEN_ENTRY_QUEST_ID),
      ],
    },
  ],
}

const SCENE_TM_08_MEIHUA_SPAR: StorySceneDef = {
  id: 'SCENE_TM_08_MEIHUA_SPAR',
  title: '第八幕 · 梅花桩上试寒星',
  subtitle: '唐家堡天机机关阁 · 梅花桩百靶试镖院',
  beats: [
    N('你扣好腕底机簧跃上楠木梅花桩，脚下铜人转靶机括铮然启动。对面桩顶，「神行客」唐艮身形一晃，含笑抬腕亮出试训铁袖箭！'),
    S(SPEAKER_TANG_GEN, '“{gender:小兄弟|小姑娘}留神了！梅花桩上落脚窄、破绽急，千机堂主命我以三流下品准头考你——能赢下我手里这匣钝头袖箭，才算摸到唐门暗器的门道！”'),
  ],
  choices: [
    {
      id: 'tm_fight_tang_gen',
      label: '踏稳梅花桩步，以《甩手袖箭》接下唐艮试镖考校',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_TANG_GEN_SPAR_NPC },
          rule: 'spar',
          forbidEscapeReason: '脚下便是七十二根梅花木桩，半途跳桩等同弃权！',
          onWin: [openScene('SCENE_TM_09_BLUEPRINT_TEMPTATION', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_08B_MEIHUA_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_TM_08B_MEIHUA_RETRY: StorySceneDef = {
  id: 'SCENE_TM_08B_MEIHUA_RETRY',
  title: '梅花桩再试 · 听簧辨位',
  subtitle: '唐家堡天机机关阁 · 梅花桩百靶试镖院',
  beats: [
    S(SPEAKER_TANG_QIAN_JI, '（敲了敲手中青铜卡尺，皱眉喝道）“眼睛别光盯他的脸，听他手腕机簧崩动的轻响预判守御与抢攻！上桩重来！”'),
  ],
  choices: [
    {
      id: 'tm_retry_tang_gen',
      label: '调匀内息扣紧袖箭机簧，重登梅花桩迎战唐艮',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: TM_TANG_GEN_SPAR_NPC },
          rule: 'spar',
          forbidEscapeReason: '脚下便是七十二根梅花木桩，半途跳桩等同弃权！',
          onWin: [openScene('SCENE_TM_09_BLUEPRINT_TEMPTATION', TANGMEN_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_TM_08B_MEIHUA_RETRY', TANGMEN_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_TM_09_BLUEPRINT_TEMPTATION: StorySceneDef = {
  id: 'SCENE_TM_09_BLUEPRINT_TEMPTATION',
  title: '第九幕 · 铜案残图与无声考校',
  subtitle: '唐家堡天机机关阁 · 梅花桩百靶试镖院',
  beats: [
    N('你在晃动的木桩间矮身避过一箭，反手一记《甩手袖箭》精准打落唐艮腰间铜牌！唐千机眼中掠过一丝赞许，挥手唤走唐艮：“随我去后坊取他的入阁铁签。你在此案旁候着，半步不许乱走。”'),
    N('两人转入内廊后，试镖院内静得只剩水轮滴答声。你低头却见身侧青铜匠案上摊着半张未收起的《子午透骨簧口拆解草图》，砚台旁还放着一小撮秘炼乌头母引——哪怕只抄走三分尺寸，拿到江湖黑市也价值百金。'),
  ],
  choices: [
    {
      id: 'tm_choice_guard_secret',
      label: '目不斜视，替唐千机轻移铜镇纸压住被风吹起的草图一角，退立廊下静候',
      tone: 'jade',
      effects: [openScene('SCENE_TM_10_TIANBIAO_APPROVAL', TANGMEN_ENTRY_QUEST_ID)],
    },
    {
      id: 'tm_choice_steal_blueprint',
      label: '趁院中无人，蘸墨在袖口内衬飞快私拓簧口尺寸并捻走乌头母引',
      tone: 'danger',
      effects: [openScene('SCENE_TM_09B_EXPELLED_THEFT', TANGMEN_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_TM_09B_EXPELLED_THEFT: StorySceneDef = {
  id: 'SCENE_TM_09B_EXPELLED_THEFT',
  title: '逐出唐门 · 窃窥天机永绝',
  subtitle: '唐家堡天机机关阁 · 梅花桩百靶试镖院',
  beats: [
    N('你指尖刚捻起乌头母引，头顶楠木横梁上骤然射下三枚寒光凛冽的追魂铁镖，“夺夺夺”钉穿你靴尖前寸许青砖！'),
    N('刑堂大长老「夺魄追魂」唐天镖自梁间翻身落下，唐千机亦冷笑着从廊后走出，一把扯下你沾着墨迹的袖衬与腕底袖箭筒！'),
    S(SPEAKER_TANG_TIAN_BIAO, '（眼神森寒如冰）“唐家堡传承数百年，靠的就是‘宁断十指、不泄一簧’！那张废稿本就是老夫放在案上钓硕鼠的饵——还未立契入堡便敢私拓天机图谱，留你何用？念你曾在成都替药堂出力，今日不废你双目，滚出唐家堡，此生若敢再踏进竹海半步，定叫你万箭穿心！”'),
  ],
  choices: [
    {
      id: 'tm_confirm_expelled_theft',
      label: '冷汗涔涔被逐出竹海（收回袖箭信物，永绝蜀中唐门）',
      tone: 'danger',
      effects: [
        { type: 'removeItem', itemId: 'WPN-070', qty: 1 },
        { type: 'setFlag', flag: 'tm_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: TANGMEN_ENTRY_QUEST_ID },
        toast('因私拓唐门机括草图触犯世家死忌，遭刑堂唐天镖逐出竹海，此生再无缘拜入【蜀中唐门】！', 'warn'),
      ],
    },
  ],
}

const SCENE_TM_10_TIANBIAO_APPROVAL: StorySceneDef = {
  id: 'SCENE_TM_10_TIANBIAO_APPROVAL',
  title: '第十幕 · 刑堂验心赐铁签',
  subtitle: '唐家堡天机机关阁 · 梅花桩百靶试镖院',
  beats: [
    N('山风吹拂廊檐，你双手拢袖稳立阶下，对铜案上的图谱未曾多看一眼。片刻后，梁顶传来一声轻响，刑堂大长老唐天镖翻身落地，与转回院中的唐千机对视颔首。'),
    S(SPEAKER_TANG_TIAN_BIAO, '（收起案上废稿，冷峻面容微露赞色）“见奇巧而不贪、处独室而不欺。这些年想混进唐家堡偷师的外姓人数不胜数，倒难得有你这么个守规矩的明白人。”'),
    S(SPEAKER_TANG_QIAN_JI, '（将一枚刻着千簧纹的玄铁签抛入你手中）“拿着铁签上【天机千簧八角总阁】吧，家主与天机老祖都在阁中等着定你的去处。”'),
  ],
  choices: [
    {
      id: 'tm_ascend_qianhuang_tower',
      label: '接过千簧玄铁签，登临天机千簧八角总阁',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'setQuestStep', questId: TANGMEN_ENTRY_QUEST_ID, stepId: 'qianhuang_tower_oath' },
        toast('铜案守密考校已过！请前往【唐家堡天机机关阁 > 天机千簧八角总阁】觐见家主与天机老祖。', 'success'),
      ],
    },
  ],
}

const SCENE_TM_11_TOWER_BRANCH_CHOICE: StorySceneDef = {
  id: 'SCENE_TM_11_TOWER_BRANCH_CHOICE',
  title: '第十一幕 · 千簧总阁立世家契',
  subtitle: '唐家堡天机机关阁 · 天机千簧八角总阁',
  illustrationUrl: '/assets/quests/tangmen_qianhuang_tower_oath.jpg',
  illustrationCaption: '八角千簧铜轮悬顶，千手毒王唐无影与天机老祖唐鹤轩俯瞰立契之人',
  beats: [
    N('登临【天机千簧八角总阁】顶层，巨型青铜机括齿轮伴着水钟徐徐咬合转动。当代堡主「千手毒王」唐无影端坐墨玉主位，天机老祖唐鹤轩在竹帘高榻上闭目摩挲着一只天机铜匣；唐天镖、唐千机、唐红袖分侍两侧。'),
    S(SPEAKER_TANG_HE_XUAN, '（眼帘微抬，苍老嗓音如金铁轻鸣）“百草诱奸、寒潭化瘴、梅桩中靶、铜案守心——四关干净利落，这张白纸可入我唐氏外宅花名册。”'),
    S(SPEAKER_TANG_WU_YING, '（指尖轻叩扶手，声音幽冷沉肃）“入我蜀中唐门，先认清我唐家堡的规矩：我们既不学佛门普渡众生，也不攀正道虚伪清名。唐家堡只认三条铁律——一、家族天机高于性命，叛堡泄密者天涯追魂；二、无利不起早，从不做赔本买卖；三、一旦收人纹银立下字据，纵是王侯宗师亦必见血封喉！”'),
    S(SPEAKER_TANG_WU_YING, '“本堡外宅门客分隶两房：入【天机机括房】随千机精研机簧劲弩与百变暗器；入【万毒百草房】随老夫与红袖专司奇毒淬炼与散手绝技。立下血指印，择定你的房口吧！”'),
  ],
  choices: [
    {
      id: 'tm_branch_tianji',
      label: '择【天机机括房】立契入籍蜀中唐门',
      subLabel: '随唐千机精研机簧暗器，另赐良阶《川蜀毒蒺藜皮囊》并进益机括算理',
      tone: 'gold',
      effects: [
        { type: 'setFlag', flag: 'tm_entry_branch', value: 'tianji' },
        { type: 'setFlag', flag: 'tm_branch_is_tianji', value: true },
        openScene('SCENE_TM_12_JOIN_TANGMEN', TANGMEN_ENTRY_QUEST_ID),
      ],
    },
    {
      id: 'tm_branch_wandu',
      label: '择【万毒百草房】立契入籍蜀中唐门',
      subLabel: '随唐无影与唐红袖精研奇毒秘术，另赐《赤练蛇涎淬毒露》《草乌断肠毒粉》并获毒脉青眼',
      tone: 'jade',
      effects: [
        { type: 'setFlag', flag: 'tm_entry_branch', value: 'wandu' },
        { type: 'setFlag', flag: 'tm_branch_is_tianji', value: false },
        openScene('SCENE_TM_12_JOIN_TANGMEN', TANGMEN_ENTRY_QUEST_ID),
      ],
    },
    {
      id: 'tm_branch_decline',
      label: '“唐门血契森严非在下所愿，愿携凡品养气袖箭之法辞别出堡。”',
      tone: 'default',
      effects: [openScene('SCENE_TM_12B_DECLINE_PEACEFULLY', TANGMEN_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_TM_12B_DECLINE_PEACEFULLY: StorySceneDef = {
  id: 'SCENE_TM_12B_DECLINE_PEACEFULLY',
  title: '辞别竹海 · 两不相欠',
  subtitle: '唐家堡天机机关阁 · 天机千簧八角总阁',
  beats: [
    S(SPEAKER_TANG_WU_YING, '（眼神一冷正欲开口，高榻上的唐鹤轩却摆了摆手）'),
    S(SPEAKER_TANG_HE_XUAN, '“既未按血契、亦未窥我唐门良品真传，强留无益。那门凡品《唐门闭毒养气功》与《甩手袖箭》，便抵你在百草堂和万毒涧夺回两箱雪山紫乌头的酬劳。出了竹海莫提今日之事，请吧。”'),
  ],
  choices: [
    {
      id: 'tm_confirm_decline',
      label: '拱手辞别唐鹤轩与唐无影，走出唐家堡另闯江湖',
      tone: 'default',
      effects: [
        { type: 'setFlag', flag: 'tm_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: TANGMEN_ENTRY_QUEST_ID },
        toast('你婉拒签立唐门血契辞别出堡，蜀中唐门入门之缘就此止步（仍保有白纸清白之身）。', 'talk'),
      ],
    },
  ],
}

const SCENE_TM_12_JOIN_TANGMEN: StorySceneDef = {
  id: 'SCENE_TM_12_JOIN_TANGMEN',
  title: '第十二幕 · 血契成章授毒蒺藜',
  subtitle: '唐家堡天机机关阁 · 天机千簧八角总阁',
  illustrationUrl: '/assets/quests/tangmen_qianhuang_tower_oath.jpg',
  illustrationCaption: '千簧钟响血契落定，唐家堡新添一位机毒兼备的外宅门客',
  beats: [
    N('你咬破指尖在乌金铁券上按下血印。唐无影颔首展卷，将本门秘传的 **`MA-137`《毒蒺藜散手》** 秘谱与外宅夜行披挂赐予你阶前！'),
    S(
      SPEAKER_TANG_WU_YING,
      '{ifFlag:tm_branch_is_tianji|“既入【天机机括房】，千机便将这囊淬火【川蜀毒蒺藜皮囊】与天机簧度算诀一并予你。记住——唐门的暗器，出手便无空回！”|“既入【万毒百草房】，红袖便将这两味秘炼【赤练蛇涎淬毒露】与【草乌断肠毒粉】予你傍身。记住——唐门的毒，从来见血封喉！”}',
    ),
    N('千簧八角总阁顶端的青铜报时钟沉沉撞响，竹海飞鸟惊起。自此你正式位列蜀中第一世家【蜀中唐门 · 外宅门客】！'),
  ],
  choices: [
    {
      id: 'tm_complete_entry',
      label: '拜领《毒蒺藜散手》与门客披挂，正式入籍蜀中唐门',
      tone: 'gold',
      effects: [
        { type: 'joinSect', sectId: 'SECT-13', rank: 1 },
        { type: 'teachMartialArt', artId: 'MA-137', autoEquip: true },
        { type: 'giveSilver', amount: 50, reason: '蜀中唐门外宅门客安家银' },
        { type: 'modifyRenown', delta: 15, reason: '入籍蜀中唐门' },
        {
          type: 'branch',
          condition: flag('tm_entry_branch', 'eq', 'tianji'),
          thenEffects: [
            { type: 'giveItem', itemId: 'WPN-058', qty: 1 },
            { type: 'modifySkill', key: '算术', delta: 2 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0218' }, delta: 15 },
          ],
          elseEffects: [
            { type: 'giveItem', itemId: 'ITM-MED-119', qty: 1 },
            { type: 'giveItem', itemId: 'ITM-MED-130', qty: 2 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0219' }, delta: 15 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0149' }, delta: 10 },
          ],
        },
        { type: 'completeQuest', questId: TANGMEN_ENTRY_QUEST_ID },
        toast('恭喜正式入籍【蜀中唐门（SECT-13）· 外宅门客】，习得《毒蒺藜散手》（良品中品）并获五十两安家银与分房厚赐！', 'success'),
      ],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_TM_01_BAICAO_SWAP.id]: SCENE_TM_01_BAICAO_SWAP,
  [SCENE_TM_01B_PAWN_RETRY.id]: SCENE_TM_01B_PAWN_RETRY,
  [SCENE_TM_02_VENOM_DEALER_CAUGHT.id]: SCENE_TM_02_VENOM_DEALER_CAUGHT,
  [SCENE_TM_03_HONGXIU_TOKEN.id]: SCENE_TM_03_HONGXIU_TOKEN,
  [SCENE_TM_04_WANDU_MIASMA.id]: SCENE_TM_04_WANDU_MIASMA,
  [SCENE_TM_05_BIDU_NEIGONG.id]: SCENE_TM_05_BIDU_NEIGONG,
  [SCENE_TM_06_AMBUSH_SMUGGLER.id]: SCENE_TM_06_AMBUSH_SMUGGLER,
  [SCENE_TM_06B_SMUGGLER_RETRY.id]: SCENE_TM_06B_SMUGGLER_RETRY,
  [SCENE_TM_06C_HERB_RECOVERED.id]: SCENE_TM_06C_HERB_RECOVERED,
  [SCENE_TM_07_QIANJI_SLEEVE_DART.id]: SCENE_TM_07_QIANJI_SLEEVE_DART,
  [SCENE_TM_08_MEIHUA_SPAR.id]: SCENE_TM_08_MEIHUA_SPAR,
  [SCENE_TM_08B_MEIHUA_RETRY.id]: SCENE_TM_08B_MEIHUA_RETRY,
  [SCENE_TM_09_BLUEPRINT_TEMPTATION.id]: SCENE_TM_09_BLUEPRINT_TEMPTATION,
  [SCENE_TM_09B_EXPELLED_THEFT.id]: SCENE_TM_09B_EXPELLED_THEFT,
  [SCENE_TM_10_TIANBIAO_APPROVAL.id]: SCENE_TM_10_TIANBIAO_APPROVAL,
  [SCENE_TM_11_TOWER_BRANCH_CHOICE.id]: SCENE_TM_11_TOWER_BRANCH_CHOICE,
  [SCENE_TM_12B_DECLINE_PEACEFULLY.id]: SCENE_TM_12B_DECLINE_PEACEFULLY,
  [SCENE_TM_12_JOIN_TANGMEN.id]: SCENE_TM_12_JOIN_TANGMEN,
}
