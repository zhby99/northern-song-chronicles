import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, S, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { ZHENWU_ENTRY_QUEST_ID } from './zhenwuEntryQuest'

const SPEAKER_ZHANG_XUANSU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0119' }
const SPEAKER_SONG_YUANQIAO: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0148' }
const SPEAKER_YU_QINGXU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0170' }
const SPEAKER_ZHANG_QINGXI: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0208' }
const SPEAKER_MO_QINGGU: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0209' }
const SPEAKER_YIN_FENGFENG: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0326' }
const SPEAKER_QING_HE: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0364' }
const SPEAKER_LI_XIAOXIN: StorySpeakerSpec = { kind: 'npc', npcId: 'NPC-0502' }

const SPEAKER_DOCK_BRAWLER: StorySpeakerSpec = {
  kind: 'custom',
  name: '王横',
  title: '官盐船帮急躁打手',
  factionName: '汉水船行',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
}

const SPEAKER_RAFT_HEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '周老七',
  title: '汉水木筏客帮头',
  factionName: '荆襄水运',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_SHEN_CANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '沈沧',
  title: '三峡水寇旧部 · 独臂刀客',
  factionName: '江湖散客',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const ZW_DOCK_BRAWLER_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_ZW_DOCK_BRAWLER',
  name: '王横',
  title: '官盐船帮急躁打手',
  factionId: 'SECT-00',
  factionName: '汉水船行',
  sectRank: 0,
  sectRankLabel: '船帮打手',
  realm: '不入流',
  avatarUrl: '/assets/characters/templates/tpl_caobang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_caobang_fb.jpg',
  talk: '“哪来的白衣书生，也敢管我官盐大船的泊位？吃老子一拳！”',
  stats: { hp: 100, mp: 40, agi: 8, res: 2 },
  talents: { bone: 45, comprehension: 35, charm: 35 },
  tenArts: {
    骑术: 10,
    算术: 10,
    经义: 5,
    策论: 5,
    诗词: 5,
    琴: 0,
    棋: 5,
    书: 5,
    画: 0,
    辩才: 15,
  },
  equippedArts: { move1: 'MA-171' },
  learnedArts: [{ artId: 'MA-171', level: 1 }],
})

const ZW_YIN_SPAR_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_ZW_YIN_SPAR',
  name: '殷峰峰（一成力试手）',
  title: '南岩剑阵领阵 · 烈火剑',
  factionId: 'SECT-08',
  factionName: '真武道宗',
  sectRank: 2,
  sectRankLabel: '剑阵领阵',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_wudang_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_wudang_fb.jpg',
  talk: '“我自封九成内力，只用三流下品剑招。你若能用刚学的《武当长剑》接下这一战，我殷峰峰便服你！”',
  stats: { hp: 150, mp: 70, agi: 12, res: 5 },
  talents: { bone: 62, comprehension: 58, charm: 55 },
  tenArts: {
    骑术: 20,
    算术: 20,
    经义: 40,
    策论: 20,
    诗词: 20,
    琴: 10,
    棋: 25,
    书: 25,
    画: 10,
    辩才: 30,
  },
  equippedArts: { move1: 'MA-169' },
  learnedArts: [{ artId: 'MA-169', level: 1 }],
})

const ZW_SHEN_CANG_NPC: NodeNpc = makeQuestNpc({
  id: 'QUEST_ZW_SHEN_CANG',
  name: '沈沧',
  title: '三峡水寇旧部 · 独臂刀客',
  factionId: 'SECT-00',
  factionName: '江湖散客',
  sectRank: 0,
  sectRankLabel: '独臂刀客',
  realm: '三流下品',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  talk: '“莫清谷不敢拔剑，你这刚入门的小道童倒敢替他挡刀？看刀！”',
  stats: { hp: 175, mp: 80, agi: 13, res: 6 },
  talents: { bone: 58, comprehension: 48, charm: 38 },
  tenArts: {
    骑术: 15,
    算术: 10,
    经义: 10,
    策论: 10,
    诗词: 5,
    琴: 0,
    棋: 10,
    书: 5,
    画: 0,
    辩才: 15,
  },
  equippedArts: { move1: 'MA-171' },
  learnedArts: [{ artId: 'MA-171', level: 1 }],
})

const SCENE_ZW_01_HANSHUI_DISPUTE: StorySceneDef = {
  id: 'SCENE_ZW_01_HANSHUI_DISPUTE',
  title: '第一幕 · 汉水泊位风波',
  subtitle: '襄阳府 · 汉水大码头',
  beats: [
    N('暮春的汉水涨了春潮，襄阳大码头上两拨汉子却堵在栈桥两端，梢公挠钩与扁担齐齐举起，眼看就要见血。'),
    N('官盐船帮嫌木筏客占了深水避风口，木筏客却指着退潮露出的浅滩喊冤——若被逼出内湾，今晚一场江风就能把竹排全拍碎。'),
    S(SPEAKER_ZHANG_QINGXI, '这位小友请留步。贫道武当张清溪，身旁这位是莫清谷师弟。两家船行忌惮我等江湖人偏袒官盐帮，正僵在此处。'),
    S(SPEAKER_MO_QINGGU, '你既未入任何武林门派，身上也无强横功法架子，反倒最不教两边生疑。可愿替我等往中间递一句话？'),
    S(SPEAKER_DOCK_BRAWLER, '（猛地掀翻岸边茶桌，抡起粗臂扑来）“哪来的白纸雏儿也敢充老好人？滚开，这泊位今晚归官盐帮！”'),
    S(SPEAKER_ZHANG_QINGXI, '（低声点拨）“莫慌！他下盘虚浮，只管稳住呼吸、迎上去攻他左膝外侧，借他前冲的势头卸开便好！”'),
  ],
  choices: [
    {
      id: 'zw_fight_dock_brawler',
      label: '依张清溪点拨，迎前制住王横',
      tone: 'jade',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: ZW_DOCK_BRAWLER_NPC },
          rule: 'spar',
          forbidEscapeReason: '两帮汉子正盯着此处，若退一步便要乱作一团！',
          onWin: [openScene('SCENE_ZW_02_DISPUTE_WIN', ZHENWU_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_ZW_02B_DISPUTE_RETRY', ZHENWU_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_ZW_02B_DISPUTE_RETRY: StorySceneDef = {
  id: 'SCENE_ZW_02B_DISPUTE_RETRY',
  title: '汉水风波 · 稳息再试',
  subtitle: '襄阳府 · 汉水大码头',
  beats: [
    N('那王横力气蛮横，你一时脚步未稳被他撞退半步，幸好莫清谷抬手一拂将你托住。'),
    S(SPEAKER_ZHANG_QINGXI, '莫急着硬碰硬，记得先守御蓄气再出招，他气力喘不上几口！'),
  ],
  choices: [
    {
      id: 'zw_retry_dock_brawler',
      label: '定下心神，再上前制住王横',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: ZW_DOCK_BRAWLER_NPC },
          rule: 'spar',
          forbidEscapeReason: '两帮汉子正盯着此处，若退一步便要乱作一团！',
          onWin: [openScene('SCENE_ZW_02_DISPUTE_WIN', ZHENWU_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_ZW_02B_DISPUTE_RETRY', ZHENWU_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_ZW_02_DISPUTE_WIN: StorySceneDef = {
  id: 'SCENE_ZW_02_DISPUTE_WIN',
  title: '第二幕 · 潮汐止戈',
  subtitle: '襄阳府 · 汉水大码头',
  beats: [
    N('你照着张清溪的指点侧身一让，顺着王横前扑的力道往他左膝外侧一磕，王横顿时扑通跪进浅水里，却半分筋骨未伤。'),
    S(SPEAKER_DOCK_BRAWLER, '（甩了甩湿透的袖子，竟没被打出内伤，一时讪讪收手）“算……算你小子脚下利索！”'),
    S(SPEAKER_RAFT_HEAD, '这位小哥，不是我们木筏客死赖着不走，实是深水栈桥内侧那半截淤沙湾能避浪，可官盐大船吃水深，根本靠不进去啊！'),
    N('你听出其中关节，便高声与两边算明水势：官盐大船留外侧深水主栈桥方便起卸，木筏吃水浅，只需退进内湾淤沙泊位避风，天明潮平各自开船，谁也不耽误谁。'),
    N('两家船头一听合情合理，各自收起挠钩扁担，一场眼看要见血的汉水械斗就此化作两声抱拳。'),
  ],
  choices: [
    {
      id: 'zw_to_scene_03',
      label: '向张清溪与莫清谷复命',
      tone: 'jade',
      effects: [openScene('SCENE_ZW_03_WHITE_PAPER_PASS', ZHENWU_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_ZW_03_WHITE_PAPER_PASS: StorySceneDef = {
  id: 'SCENE_ZW_03_WHITE_PAPER_PASS',
  title: '第三幕 · 验明清白赠木牌',
  subtitle: '襄阳府 · 汉水大码头',
  beats: [
    S(SPEAKER_ZHANG_QINGXI, '（含笑抚掌）“好一个顺势止戈。刚才你若仗着蛮力把王横打得头破血流，官盐帮绝不会就此罢休；你留了一手余地，反倒叫两边都下得来台。”'),
    S(SPEAKER_MO_QINGGU, '（细细打量你周身行气，点头）“你确是未曾入过他派、也无良品及以上杂学缠身的清白之身。我真武道宗近年正欲寻这等心静无杂念的弟子。”'),
    S(SPEAKER_MO_QINGGU, '“这枚【武当解剑木牌】你且收好，先往襄阳城西【古隆中草庐 · 临风观景轩】拜会俞清虚师兄，取了紫苏药囊与荐书，再北上武当山。”'),
  ],
  choices: [
    {
      id: 'zw_accept_wooden_pass',
      label: '接过解剑木牌，动身前往古隆中草庐',
      tone: 'jade',
      effects: [
        { type: 'giveSilver', amount: 20, reason: '真武张清溪赠汉水盘缠' },
        { type: 'setQuestStep', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'longzhong_letter' },
        toast('已获二十两盘缠与【武当解剑木牌】，请前往【古隆中草庐 > 临风观景轩】拜会俞清虚！', 'success'),
      ],
    },
  ],
}

const SCENE_ZW_04_LONGZHONG_YU: StorySceneDef = {
  id: 'SCENE_ZW_04_LONGZHONG_YU',
  title: '第四幕 · 隆中草庐取药信',
  subtitle: '襄阳府 · 古隆中草庐',
  beats: [
    N('古隆中松竹苍翠，临风观景轩外石碑斑驳。玄武真人俞清虚正临轩煮水，见你呈上解剑木牌，温和抬手相请。'),
    S(SPEAKER_YU_QINGXU, '清溪师弟已在传书里把汉水码头的经过说了。世人都爱看一剑封喉的痛快，却不知不战而止戈，才是武当最难修的门面。'),
    S(SPEAKER_YU_QINGXU, '这包紫苏养气丹药与一封手书你且带上。北上武当山后，先往【太和绝顶真武金殿 > 天柱绝顶观云台】寻执事清鹤喝碗茶、过了“解剑”那一关，再去紫霄宫见宋远乔首座。'),
  ],
  choices: [
    {
      id: 'zw_head_to_wudang',
      label: '收好药囊与手书，北上武当山',
      tone: 'jade',
      effects: [
        { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
        { type: 'setQuestStep', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'zixiao_sword_circle' },
        toast('获赠回气丹药与俞清虚荐书！请北上【武当山真武道宗 > 天柱绝顶观云台】。', 'success'),
      ],
    },
  ],
}

const SCENE_ZW_05_CLOUD_TEA: StorySceneDef = {
  id: 'SCENE_ZW_05_CLOUD_TEA',
  title: '第五幕 · 观云台解剑饮茶',
  subtitle: '武当山 · 天柱绝顶观云台',
  illustrationUrl: '/assets/quests/zhenwu_cloud_tea.jpg',
  illustrationCaption: '云海翻涌天柱峰，粗陶一盏洗浮名',
  beats: [
    N('石阶七十二弯直入云海，天柱绝顶观云台上山风猎猎。执事道人清鹤正守在铜炉旁，炉上一只粗陶壶咕嘟作响。'),
    S(SPEAKER_QING_HE, '（接过俞师叔手书，斟出一碗略带苦涩的野山粗茶）“山脚有座解剑池，江湖客到此皆要解剑。你虽无名剑在腰，也得把心里的那股‘我要扬名、我要赢人’的躁气解下来。”'),
    S(SPEAKER_QING_HE, '“茶已入喉，便算过了山门第一关。顺着石阶下去【紫霄道宫丹房 · 禹迹池畔太极坪】，宋首座正在池边等新来的弟子。”'),
  ],
  choices: [
    {
      id: 'zw_go_zixiao_after_tea',
      label: '谢过清鹤师兄，下往紫霄宫禹迹池畔',
      tone: 'jade',
      effects: [openScene('SCENE_ZW_06_ROAD_TO_ZIXIAO', ZHENWU_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_ZW_06_ROAD_TO_ZIXIAO: StorySceneDef = {
  id: 'SCENE_ZW_06_ROAD_TO_ZIXIAO',
  title: '第六幕 · 石阶挑水听松风',
  subtitle: '武当山 · 紫霄道宫外阶',
  beats: [
    N('下山石阶上，一位青衣女冠正扁担挑着两桶山泉，步履轻稳如踏平地，桶中清水竟连一丝水花也未溅出。'),
    S(SPEAKER_LI_XIAOXIN, '（侧身让过行香的山民，朝你微微一笑）“新来的师弟？我是内丹弟子李潇心。在武当挑水也算练功——脚步若急，水便泼了一地；脚底慢而稳，百斤担子也如无物。”'),
    N('你默默记下这一幕，抬步踏入【紫霄道宫丹房 · 禹迹池畔太极坪】。'),
  ],
  choices: [
    {
      id: 'zw_enter_taiji_court',
      label: '步入禹迹池畔太极坪，拜见宋远乔首座',
      tone: 'jade',
      effects: [
        toast('清鹤与李潇心已引路，请前往【紫霄道宫丹房 > 禹迹池畔太极坪】！', 'talk'),
      ],
    },
  ],
}

const SCENE_ZW_07_TURTLE_SNAKE: StorySceneDef = {
  id: 'SCENE_ZW_07_TURTLE_SNAKE',
  title: '第七幕 · 禹迹池畔观龟蛇',
  subtitle: '紫霄道宫丹房 · 禹迹池畔太极坪',
  illustrationUrl: '/assets/quests/zhenwu_turtle_snake.jpg',
  illustrationCaption: '玄龟镇水不动，青蛇游走生圆，真武一脉刚柔之始',
  beats: [
    N('禹迹池畔雾气氤氲，一只墨壳老龟伏在青石上纹丝不动，池边一条青蛇却绕石游走、首尾相衔成圆。'),
    S(SPEAKER_SONG_YUANQIAO, '（负手立于太极坪中，目光温厚沉稳）“玄龟主静守，青蛇主灵转。今日我先授你本门筑基剑法【武当长剑】，不求快、不求狠，只求剑势画圆、绵绵不绝。”'),
    N('宋远乔亲自握枝示范三遍起手式与圆转卸力之法，你凝神跟练，顿觉气脉顺畅许多，正式习得 **`MA-169`《武当长剑》（凡品上品）**！'),
  ],
  choices: [
    {
      id: 'zw_learn_wudang_sword',
      label: '铭记剑理，演练《武当长剑》起手式',
      tone: 'jade',
      effects: [
        { type: 'teachMartialArt', artId: 'MA-169', autoEquip: true },
        toast('已习得并装配《武当长剑》（凡品上品·剑法，先手 +10）！', 'success'),
        openScene('SCENE_ZW_08_YIN_CHALLENGE', ZHENWU_ENTRY_QUEST_ID),
      ],
    },
  ],
}

const SCENE_ZW_08_YIN_CHALLENGE: StorySceneDef = {
  id: 'SCENE_ZW_08_YIN_CHALLENGE',
  title: '第八幕 · 烈火剑圈中试手',
  subtitle: '紫霄道宫丹房 · 禹迹池畔太极坪',
  beats: [
    N('话音未落，一道火红道袍的身影大步跨进太极坪来取丹药，正是南岩真武剑阵领阵「烈火剑」殷峰峰。'),
    S(SPEAKER_YIN_FENGFENG, '（挑眉打量你两眼，爽朗却带几分质疑）“宋师兄，你真收了个零根基的白纸雏儿？我武当虽不比外家狠辣，可剑圈总得撑得住人吧！”'),
    S(SPEAKER_SONG_YUANQIAO, '（笑而不阻）“殷师弟既手痒，便自封九成内力、用同阶剑招替他喂招罢。小友，用刚学的《武当长剑》接下这一阵！”'),
    S(SPEAKER_YIN_FENGFENG, '（亮出木剑画地为圈）“来得好！我压至三流下品，看你这慢剑缠不缠得住我的快招！”'),
  ],
  choices: [
    {
      id: 'zw_spar_yin_fengfeng',
      label: '持《武当长剑》步入太极圈，接下殷峰峰试手',
      tone: 'jade',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: ZW_YIN_SPAR_NPC },
          rule: 'spar',
          forbidEscapeReason: '宋首座亲在池畔画圈监阵，岂可半途退圈！',
          onWin: [openScene('SCENE_ZW_09_YIN_ACK', ZHENWU_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_ZW_08B_YIN_RETRY', ZHENWU_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_ZW_08B_YIN_RETRY: StorySceneDef = {
  id: 'SCENE_ZW_08B_YIN_RETRY',
  title: '太极圈试手 · 借力再战',
  subtitle: '紫霄道宫丹房 · 禹迹池畔太极坪',
  beats: [
    S(SPEAKER_YIN_FENGFENG, '（收剑一笑）“步子还是略急了些！莫跟我抢攻，先顺着我的剑势画圆，你再重来一局！”'),
  ],
  choices: [
    {
      id: 'zw_retry_yin_spar',
      label: '调匀气息，再入圈中以《武当长剑》试手',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: ZW_YIN_SPAR_NPC },
          rule: 'spar',
          forbidEscapeReason: '宋首座亲在池畔画圈监阵，岂可半途退圈！',
          onWin: [openScene('SCENE_ZW_09_YIN_ACK', ZHENWU_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_ZW_08B_YIN_RETRY', ZHENWU_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_ZW_09_YIN_ACK: StorySceneDef = {
  id: 'SCENE_ZW_09_YIN_ACK',
  title: '第九幕 · 慢剑缠快剑',
  subtitle: '紫霄道宫丹房 · 禹迹池畔太极坪',
  beats: [
    N('几个回合下来，你的《武当长剑》竟真的缠住了殷峰峰连绵抢攻的剑势，最后一式斜挑磕偏了他的木剑。'),
    S(SPEAKER_YIN_FENGFENG, '（哈哈大笑，收剑抱拳）“好！慢剑能缠得住快剑，倒是我小瞧了白纸的静气！南岩剑阵那边正缺丹药，你随莫师兄送一趟去罢！”'),
    S(SPEAKER_SONG_YUANQIAO, '（颔首）“去罢。南岩【绝壁石刻 · 剑痕崖】山风凛冽，莫师弟已在崖下候着了。”'),
  ],
  choices: [
    {
      id: 'zw_go_nanyan_cliff',
      label: '拜别宋首座与殷师叔，随莫清谷前往南岩剑痕崖',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 80, mpPct: 80 },
        { type: 'setQuestStep', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'nanyan_old_grudge' },
        toast('已开启【南岩绝壁 · 三峡旧怨】，请前往【南岩绝壁试剑崖 > 绝壁石刻 · 剑痕崖】！', 'success'),
      ],
    },
  ],
}

const SCENE_ZW_10_NANYAN_CLIFF: StorySceneDef = {
  id: 'SCENE_ZW_10_NANYAN_CLIFF',
  title: '第十幕 · 南岩绝壁三峡怨',
  subtitle: '南岩绝壁试剑崖 · 剑痕崖',
  beats: [
    N('南岩飞瀑震耳，绝壁石刻「剑痕崖」前却横着一把厚背钢刀——一名独臂黑衣汉子正死死盯着赶来的莫清谷，双目赤红。'),
    S(SPEAKER_SHEN_CANG, '“莫清谷！当年你在汉水三峡单剑屠寨，为何独独留我沈沧一条断臂残命？是存心看我像条野狗一样苟活么？今日我便毁了你武当先师的剑痕碑！”'),
    S(SPEAKER_MO_QINGGU, '（面露愧色，手按剑柄却迟迟未拔）“沈沧……当年水寨里唯有你年纪尚轻、未曾杀过无辜客商，我才……”'),
    S(SPEAKER_SHEN_CANG, '（根本听不进辩解，单臂抡刀猛劈向石碑与莫清谷）“少假惺惺！要么拔剑杀了我，要么偿命！”'),
    N('莫清谷因旧愧不愿出手伤他，眼看钢刀就要劈中石碑与师叔肩头，你纵身抢步，拔出长剑挡在两人之间！'),
  ],
  choices: [
    {
      id: 'zw_fight_shen_cang',
      label: '持《武当长剑》迎上沈沧，先拆解他的杀招',
      tone: 'gold',
      effects: [
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: ZW_SHEN_CANG_NPC },
          rule: 'spar',
          forbidEscapeReason: '身后便是莫清谷师叔与先师剑痕碑，退不得！',
          onWin: [openScene('SCENE_ZW_11_GRUDGE_CHOICE', ZHENWU_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_ZW_10B_SHEN_RETRY', ZHENWU_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_ZW_10B_SHEN_RETRY: StorySceneDef = {
  id: 'SCENE_ZW_10B_SHEN_RETRY',
  title: '剑痕崖拆招 · 再挡狂刀',
  subtitle: '南岩绝壁试剑崖 · 剑痕崖',
  beats: [
    N('沈沧旧伤虽重、招式却拼命狠辣，震得你虎口发麻。莫清谷侧身替你架住一刀，低声喝道：“他独臂重心全在右侧，用《武当长剑》缠住他刀背！”'),
  ],
  choices: [
    {
      id: 'zw_retry_shen_cang',
      label: '稳住呼吸，再上前拆解沈沧的刀势',
      tone: 'gold',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        {
          type: 'startCombat',
          opponent: { kind: 'custom', npc: ZW_SHEN_CANG_NPC },
          rule: 'spar',
          forbidEscapeReason: '身后便是莫清谷师叔与先师剑痕碑，退不得！',
          onWin: [openScene('SCENE_ZW_11_GRUDGE_CHOICE', ZHENWU_ENTRY_QUEST_ID)],
          onLose: [openScene('SCENE_ZW_10B_SHEN_RETRY', ZHENWU_ENTRY_QUEST_ID)],
        },
      ],
    },
  ],
}

const SCENE_ZW_11_GRUDGE_CHOICE: StorySceneDef = {
  id: 'SCENE_ZW_11_GRUDGE_CHOICE',
  title: '第十一幕 · 止戈抑或斩草',
  subtitle: '南岩绝壁试剑崖 · 剑痕崖',
  beats: [
    N('你顺着沈沧劈空的刀势一绕一绞，叮当一声震飞了他手中的厚背钢刀！沈沧踉跄跌坐在青石阶上，喘着粗气却闭上了眼。'),
    S(SPEAKER_SHEN_CANG, '（嘶声冷笑）“技不如人……你们武当清名满天下，动手罢，正好一剑了结！”'),
    N('莫清谷默默从怀里摸出一枚被摩挲得发亮的旧药瓶。宋远乔此时也正好赶到崖口，静静看着你手中的长剑。'),
  ],
  choices: [
    {
      id: 'zw_choice_forgive_shen',
      label: '收剑归鞘，道破莫清谷当年暗送药银、留他活口之隐情',
      tone: 'jade',
      effects: [openScene('SCENE_ZW_12_COLD_JADE_REST', ZHENWU_ENTRY_QUEST_ID)],
    },
    {
      id: 'zw_choice_kill_shen',
      label: '一剑刺出斩草除根，取其首级向师门邀功',
      tone: 'danger',
      effects: [openScene('SCENE_ZW_11B_REJECTED_KILL', ZHENWU_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_ZW_11B_REJECTED_KILL: StorySceneDef = {
  id: 'SCENE_ZW_11B_REJECTED_KILL',
  title: '逐出山门 · 永绝太和',
  subtitle: '南岩绝壁试剑崖 · 剑痕崖',
  beats: [
    N('你剑尖刚要递向沈沧咽喉，莫清谷身影一闪，一掌轻飘飘却势若千钧地震飞了你手中长剑！'),
    S(SPEAKER_MO_QINGGU, '（神色冷冽如铁）“我叫你挡刀止戈，何曾叫你杀一个已失兵刃、旧伤垂危的废人邀功？”'),
    S(SPEAKER_SONG_YUANQIAO, '（长叹摇头，伸手收回你腰间的【武当解剑木牌】）“真武道宗以止戈为武、以柔化戾。你心怀嗜杀之念，留在我武当迟早酿成大祸——下山去吧，太和山门此后不再为你而开。”'),
  ],
  choices: [
    {
      id: 'zw_confirm_rejected_kill',
      label: '黯然下山（永绝真武道宗）',
      tone: 'danger',
      effects: [
        { type: 'setFlag', flag: 'zw_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: ZHENWU_ENTRY_QUEST_ID },
        toast('因在南岩执意嗜杀邀功，你已被收回解剑木牌，终身不得再拜入真武道宗！', 'warn'),
      ],
    },
  ],
}

const SCENE_ZW_12_COLD_JADE_REST: StorySceneDef = {
  id: 'SCENE_ZW_12_COLD_JADE_REST',
  title: '第十二幕 · 寒玉榻上化宿怨',
  subtitle: '南岩绝壁试剑崖 · 幽谷石室',
  beats: [
    N('你收剑归鞘，替莫清谷道破了当年的隐情——那年沈沧醒来时枕边多出的三两碎银与金疮药，正是莫清谷托汉水渔夫暗中留下的，只盼他脱身做个良民，莫再冤冤相报。'),
    S(SPEAKER_SHEN_CANG, '（怔住良久，独臂拾起地上钢刀朝石碑重重磕了个头，沙哑道）“……原来不是戏弄。我沈沧这辈子，谢了。”'),
    N('送走释怀离去的沈沧，宋远乔与莫清谷引你入【幽谷石室 · 寒玉榻】调息养气。'),
    S(SPEAKER_SONG_YUANQIAO, '（欣慰点头）“武当的剑，胜在能收得住。你既经此一劫而不改止戈本心，便上【太和绝顶真武金殿 · 太和紫金正殿】觐见恩师张玄素天师吧。”'),
  ],
  choices: [
    {
      id: 'zw_ascend_golden_hall',
      label: '于寒玉榻调息片刻，登顶太和紫金正殿',
      tone: 'jade',
      effects: [
        { type: 'healPlayer', hpPct: 100, mpPct: 100 },
        { type: 'setQuestStep', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'golden_hall_oath' },
        toast('气血内力已恢复！请前往【太和绝顶真武金殿 > 太和紫金正殿】觐见张玄素。', 'success'),
      ],
    },
  ],
}

const SCENE_ZW_13_GOLDEN_HALL: StorySceneDef = {
  id: 'SCENE_ZW_13_GOLDEN_HALL',
  title: '第十三幕 · 太和紫金殿明心',
  subtitle: '太和绝顶真武金殿 · 太和紫金正殿',
  illustrationUrl: '/assets/quests/zhenwu_golden_sword.jpg',
  illustrationCaption: '金殿香篆袅袅，太和真人张玄素静候问道之人',
  beats: [
    N('铜铸金殿耸立天柱绝顶，云海翻涌于槛外。掌教天师张玄素鹤发童颜，负手立于真武大帝铜像前，目光平和如一泓秋水。'),
    S(SPEAKER_ZHANG_XUANSU, '（微笑摆手免去大礼）“汉水止戈、禹迹试手、南岩化怨，远乔与清谷都已报与我知。我武当今天不考你经义典故，只把实话摊在明处。”'),
    S(SPEAKER_ZHANG_XUANSU, '“武当的功夫最讲究一个‘慢’字——三年打桩、五年画圈，头几年远不如外家刀剑凌厉痛快，门规更不许弟子恃强斗狠。你可愿守这份寂寞，从一招一式慢功夫修起？”'),
  ],
  choices: [
    {
      id: 'zw_oath_accept',
      label: '“弟子愿解江湖浮名，甘守三年寂寞慢功，拜入真武道宗！”',
      tone: 'jade',
      effects: [openScene('SCENE_ZW_14_JOIN_ZHENWU', ZHENWU_ENTRY_QUEST_ID)],
    },
    {
      id: 'zw_oath_decline',
      label: '“实不相瞒，弟子尚向往快意恩仇，怕是耐不住仙山慢功夫。”',
      tone: 'default',
      effects: [openScene('SCENE_ZW_14B_DECLINE_PEACEFULLY', ZHENWU_ENTRY_QUEST_ID)],
    },
  ],
}

const SCENE_ZW_14B_DECLINE_PEACEFULLY: StorySceneDef = {
  id: 'SCENE_ZW_14B_DECLINE_PEACEFULLY',
  title: '辞别太和 · 各行其道',
  subtitle: '太和绝顶真武金殿 · 太和紫金正殿',
  beats: [
    S(SPEAKER_ZHANG_XUANSU, '（含笑抚须，并无半点愠色）“好一个坦荡少年。道不同不相强求，你既有心中所往的快意江湖，便带着那套《武当长剑》自去闯荡吧，山门缘分到此为止。”'),
  ],
  choices: [
    {
      id: 'zw_confirm_decline',
      label: '拜别张天师，下山另闯江湖',
      tone: 'default',
      effects: [
        { type: 'setFlag', flag: 'zw_permanently_rejected', value: true },
        { type: 'abandonQuest', questId: ZHENWU_ENTRY_QUEST_ID },
        toast('你坦陈志在快意江湖，拜别张玄素下山，真武道宗入门之缘已止。', 'talk'),
      ],
    },
  ],
}

const SCENE_ZW_14_JOIN_ZHENWU: StorySceneDef = {
  id: 'SCENE_ZW_14_JOIN_ZHENWU',
  title: '第十四幕 · 授剑入真武',
  subtitle: '太和绝顶真武金殿 · 太和紫金正殿',
  illustrationUrl: '/assets/quests/zhenwu_golden_sword.jpg',
  illustrationCaption: '松纹道剑出匣，太和门下新添守道人',
  beats: [
    S(SPEAKER_ZHANG_XUANSU, '（含笑点头，自紫檀匣中取出一柄细密松皮暗纹的长剑双手递来）“能耐得住寂寞，方守得住大道。今日我代祖师收你入真武道宗门墙，赐你【真武松纹道剑】。”'),
    N('你接过长剑，向真武大帝与掌教天师三叩首。钟磬声清越传遍七十二峰，自此位列武当山真武道宗弟子！'),
  ],
  choices: [
    {
      id: 'zw_complete_entry',
      label: '领受道剑拜入真武道宗',
      tone: 'jade',
      effects: [
        { type: 'joinSect', sectId: 'SECT-08', rank: 1 },
        { type: 'giveItem', itemId: 'WPN-063', qty: 1 },
        { type: 'giveSilver', amount: 50, reason: '真武道宗入门赐银' },
        { type: 'modifyRenown', delta: 15, reason: '拜入武当山真武道宗' },
        { type: 'completeQuest', questId: ZHENWU_ENTRY_QUEST_ID },
        toast('恭喜正式拜入【真武道宗（SECT-08）】，获赐【真武松纹道剑】与五十两银钱！', 'success'),
      ],
    },
  ],
}

export const SCENES: Record<string, StorySceneDef> = {
  [SCENE_ZW_01_HANSHUI_DISPUTE.id]: SCENE_ZW_01_HANSHUI_DISPUTE,
  [SCENE_ZW_02B_DISPUTE_RETRY.id]: SCENE_ZW_02B_DISPUTE_RETRY,
  [SCENE_ZW_02_DISPUTE_WIN.id]: SCENE_ZW_02_DISPUTE_WIN,
  [SCENE_ZW_03_WHITE_PAPER_PASS.id]: SCENE_ZW_03_WHITE_PAPER_PASS,
  [SCENE_ZW_04_LONGZHONG_YU.id]: SCENE_ZW_04_LONGZHONG_YU,
  [SCENE_ZW_05_CLOUD_TEA.id]: SCENE_ZW_05_CLOUD_TEA,
  [SCENE_ZW_06_ROAD_TO_ZIXIAO.id]: SCENE_ZW_06_ROAD_TO_ZIXIAO,
  [SCENE_ZW_07_TURTLE_SNAKE.id]: SCENE_ZW_07_TURTLE_SNAKE,
  [SCENE_ZW_08_YIN_CHALLENGE.id]: SCENE_ZW_08_YIN_CHALLENGE,
  [SCENE_ZW_08B_YIN_RETRY.id]: SCENE_ZW_08B_YIN_RETRY,
  [SCENE_ZW_09_YIN_ACK.id]: SCENE_ZW_09_YIN_ACK,
  [SCENE_ZW_10_NANYAN_CLIFF.id]: SCENE_ZW_10_NANYAN_CLIFF,
  [SCENE_ZW_10B_SHEN_RETRY.id]: SCENE_ZW_10B_SHEN_RETRY,
  [SCENE_ZW_11_GRUDGE_CHOICE.id]: SCENE_ZW_11_GRUDGE_CHOICE,
  [SCENE_ZW_11B_REJECTED_KILL.id]: SCENE_ZW_11B_REJECTED_KILL,
  [SCENE_ZW_12_COLD_JADE_REST.id]: SCENE_ZW_12_COLD_JADE_REST,
  [SCENE_ZW_13_GOLDEN_HALL.id]: SCENE_ZW_13_GOLDEN_HALL,
  [SCENE_ZW_14B_DECLINE_PEACEFULLY.id]: SCENE_ZW_14B_DECLINE_PEACEFULLY,
  [SCENE_ZW_14_JOIN_ZHENWU.id]: SCENE_ZW_14_JOIN_ZHENWU,
}
