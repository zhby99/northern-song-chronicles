import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q17_QUEST_ID } from './shaolinLaymanXiangguoQuest'

const SPEAKER_HERB_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '老药商 · 孙德顺',
  title: '相国寺西廊药铺掌柜',
  factionName: '汴京商贾',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_TRAITOR_CLERK: StorySpeakerSpec = {
  kind: 'custom',
  name: '刁三',
  title: '被逐知客杂役 · 青蛇帮内应',
  factionName: '青蛇帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_SNAKE_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '青蛇堂香主 · 过街鼠老六',
  title: '青蛇帮悍匪头目',
  factionName: '青蛇帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_QIAN_WU: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒蛇钱五',
  title: '青蛇帮主',
  factionName: '青蛇帮',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildSnakeThugA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_THUG_A',
    name: '青蛇帮恶徒 · 铁棒张',
    title: '瓦子打手',
    realm: '三流上品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇帮众',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“少林俗家狗腿子也敢管汴京瓦子的规矩？先吃爷爷一记断门刀！”',
    stats: { hp: 920, mp: 580, agi: 39, res: 22 },
    talents: { bone: 56, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-140', qinggong: 'MA-157', move1: 'MA-132', move2: 'MA-143' },
    learnedArts: [
      { artId: 'MA-140', level: 4 },
      { artId: 'MA-157', level: 4 },
      { artId: 'MA-132', level: 4 },
      { artId: 'MA-143', level: 4 },
    ],
  })
}

function buildSnakeThugB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_THUG_B',
    name: '青蛇堂香主 · 过街鼠老六',
    title: '青蛇帮头目',
    realm: '二流下品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇香主',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“相国寺这片肥肉五爷盯了半年，今日谁拦路便剁谁的手！”',
    stats: { hp: 1180, mp: 820, agi: 44, res: 27 },
    talents: { bone: 60, comprehension: 44, charm: 28 },
    equippedArts: { neigong: 'MA-123', qinggong: 'MA-138', move1: 'MA-131', move2: 'MA-125' },
    learnedArts: [
      { artId: 'MA-123', level: 5 },
      { artId: 'MA-138', level: 5 },
      { artId: 'MA-131', level: 5 },
      { artId: 'MA-125', level: 4 },
    ],
  })
}

function buildQianWuBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_QIAN_WU',
    name: '毒蛇钱五',
    title: '青蛇帮主',
    realm: '二流中品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇帮主',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“嘿嘿，嵩山派来的带发护法？老子在汴京瓦子混迹二十年，倒要看看少林刀杖能不能破我这双毒砂鬼头刀！”',
    stats: { hp: 1580, mp: 1180, agi: 49, res: 34 },
    talents: { bone: 66, comprehension: 52, charm: 34 },
    equippedArts: { neigong: 'MA-140', qinggong: 'MA-139', move1: 'MA-151', move2: 'MA-125' },
    learnedArts: [
      { artId: 'MA-140', level: 6 },
      { artId: 'MA-139', level: 6 },
      { artId: 'MA-151', level: 6 },
      { artId: 'MA-125', level: 5 },
    ],
  })
}

function buildQianWuGuard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_QIAN_GUARD',
    name: '青蛇护法 · 独眼豹',
    title: '瓦子死士',
    realm: '二流下品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇护法',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“五爷莫慌，小的从旁封死这小子的退路！”',
    stats: { hp: 1120, mp: 760, agi: 43, res: 26 },
    talents: { bone: 58, comprehension: 40, charm: 22 },
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-150', move2: 'MA-146' },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-157', level: 5 },
      { artId: 'MA-150', level: 5 },
      { artId: 'MA-146', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq17_01: {
    id: 'scene_slq17_01',
    title: '第一幕 · 东出汴京',
    subtitle: '开封府 · 大相国寺山门外',
    mandatory: true,
    beats: [
      N('{reignYear}春深，汴京城柳絮如烟。你既在大雄宝殿择定少林【俗家护法脉】，蓄发束巾、着青布护法劲装，怀揣方丈法谕，奉命东来驻守东京大相国寺。'),
      N('大相国寺乃大宋皇家敕建巨刹，每月五次开放万姓交易，殿前广场与东西两廊商棚鳞次栉比，飞禽走兽、药材丝绸、古玩字画无所不有，人声鼎沸胜过十里长街。'),
      P('（按住腰间戒刀，抬眼望向琉璃飞檐与熙攘人潮）“嵩山清静，汴京繁华。方丈常言俗家弟子身在红尘而不染尘垢，方知护法二字之重。先去雅市寻慧照师叔与卫弘龙师兄报到罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq17_02', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_02: {
    id: 'scene_slq17_02',
    title: '第二幕 · 万姓雅市',
    subtitle: '相国寺万姓交易雅市',
    illustrationUrl: '/assets/quests/sl_17_xiangguo_market.jpg',
    illustrationCaption: '大相国寺万姓雅市 · 慧照、卫弘龙与郑刚共议护持寺院商铺',
    mandatory: true,
    beats: [
      N('穿过熙攘摊棚，只见西廊一株古槐树下，一名面庞刚毅如铁的僧人正双掌合十眺望市集，身旁立着两位佩刀束袖的少林俗家好手——正是金刚僧【慧照】与【卫弘龙】、【郑刚】。'),
      S('NPC-0273', '（接过你递上的嵩山法谕，微微颔首，声若铜钟）“阿弥陀佛！方丈果真将新晋内门的俗家俊才派来东京了。{gender:师侄|女施主}既入我俗家护法一脉，便先见过卫弘龙与郑刚二位同门。”'),
      S('NPC-0728', '（抱拳朗笑，眉宇间透着一股爽朗英气）“哈哈！早就听闻嵩山木桩廊出了位了不得的带发俊杰！在下卫弘龙，江湖人送浑号『银枪刀』，在这相国寺外廊巡守已有三载。”'),
      S('NPC-0570', '（赤发如焰，抱臂微微点头）“郑刚。如今雅市表面太平，暗地里却藏着几条咬人的毒蛇。你来得正好，省得俺和老卫两双眼睛盯不过来。”'),
    ],
    onFinishEffects: [openScene('scene_slq17_03', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_03: {
    id: 'scene_slq17_03',
    title: '第三幕 · 暗影滋生',
    subtitle: '相国寺万姓交易雅市 · 西廊茶棚',
    mandatory: true,
    beats: [
      S('NPC-0273', '（神色转肃，压低声音）“相国寺与我嵩山少林本是禅宗一脉，寺中东西两廊三百余座商铺的租契香火，多半用来接济汴京孤寡与修缮佛殿。可近两月来，城南瓦子里的地头蛇【青蛇帮】不知从何处买通了寺中一名被逐杂役，竟伪造租契印信，强向药铺与素斋摊加收三成『青蛇平安钱』！”'),
      S('NPC-0728', '（冷哼一声，按剑柄而立）“那青蛇帮主『毒蛇钱五』奸猾得很，专挑咱们出家师父不便当街动粗的空当，派泼皮砸摊泼粪！若官府差役来查，他们又拿伪造的铺契糊弄过去，倒打一耙说寺院欺客。”'),
      P('“好卑劣的伎俩！出家师父顾忌佛门清誉与清规戒律，不便与市井无赖厮缠，这等以直报怨的红尘恶仗，正该由咱们俗家护法来打！”'),
      S('NPC-0570', '（咧嘴一笑）“说得好！俺就爱听这句痛快话！方才线报来说，青蛇帮的『过街鼠老六』正带着打手往西廊孙老掌柜的药铺去了！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_04', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_04: {
    id: 'scene_slq17_04',
    title: '第四幕 · 领命巡市',
    subtitle: '相国寺万姓交易雅市',
    mandatory: true,
    beats: [
      S('NPC-0273', '“阿弥陀佛。青蛇帮人多势众，切莫轻敌。你先随卫弘龙、郑刚巡查西廊药铺，稳住商贾人心、摸清那内应底细；待击退闹事泼皮后，速来大雄宝殿香云宝鼎前见老衲，老衲另有护法刀杖绝学相授。”'),
      P('（抱拳行礼）“弟子领命！这就随二位师兄去会一会那青蛇帮的泼皮！”'),
    ],
    choices: [
      {
        id: 'slq17_accept_quest',
        label: '领受慧照法谕，动身巡查相国寺万姓雅市西廊',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q17_QUEST_ID, stepId: 'market_patrol' },
          setStep(SHAOLIN_Q17_QUEST_ID, 'market_patrol'),
          toast('已开启《相国暗影 · 红尘刀杖》！请留在【相国寺万姓交易雅市】巡查西廊药摊！', 'talk', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_05: {
    id: 'scene_slq17_05',
    title: '第五幕 · 西廊砸摊',
    subtitle: '相国寺万姓交易雅市 · 西廊药铺',
    mandatory: true,
    beats: [
      N('你与卫弘龙、郑刚疾步穿行市集，尚未转过西廊拐角，便听前方一片瓷罐碎裂声与老者哀告声！'),
      N('只见孙记药铺前药草撒落满地，五六名衣襟绣着青蛇暗纹的泼皮正推搡着须发花白的老药商孙德顺；一名尖嘴猴腮的男子手持一张朱印文书，趾高气扬地踩在药柜木板上。'),
      S(SPEAKER_HERB_MERCHANT, '（紧紧护住怀里的药秤，急得老泪纵横）“刁三爷！老汉的铺租前日才交清给相国寺知客堂，白纸黑字有凭据！你们青蛇帮凭什么又要收三十两『地皮钱』？”'),
      S(SPEAKER_TRAITOR_CLERK, '（冷笑一声，晃着手中假印契）“老东西睁大你的狗眼！知客堂的旧印早作废了！如今这西廊三十家铺子，全都归五爷代寺里照看！不交钱？老六哥，替他把这破药铺拆了烧柴！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_06', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_06: {
    id: 'scene_slq17_06',
    title: '第六幕 · 揭穿内鬼',
    subtitle: '相国寺万姓交易雅市 · 西廊药铺',
    mandatory: true,
    beats: [
      P('（大步踏前，一把拨开推搡老药商的泼皮，目光如刃盯住刁三）“住手！你便是上月因偷盗香油钱被相国寺逐出山门的杂役刁三罢？私刻佛寺朱印、勾结青蛇帮讹诈良民，按大宋律例当刺配沙门岛！”'),
      S(SPEAKER_TRAITOR_CLERK, '（脸色骤变，连退两步，色厉内荏地尖叫）“你……你是哪里冒出来的野小子？老六哥，这是少林寺新派来的俗家狗腿子，别让他坏了五爷的大事！”'),
      S(SPEAKER_SNAKE_THUG, '（狞笑一声，抽出腰间鬼头短刀，挥手示意铁棒张包抄）“原来是嵩山下来的小护法！卫弘龙和郑刚在后头忙着护别的摊子，倒让你个毛头小子先撞上来送死！弟兄们，先废了这小子两条腿，给相国寺那帮秃驴立个下马威！”'),
      S('NPC-0728', '（在巷口长刀一横，替你拦住外围杂兵）“{gender:师弟|师妹}放心！这些外围虾兵蟹将交给俺与郑刚挡住，这两个领头的悍匪便交由你当街立威！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_07', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_07: {
    id: 'scene_slq17_07',
    title: '第七幕 · 雅市截恶',
    subtitle: '相国寺西廊（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('过街鼠老六与铁棒张一左一右扑杀而来，刀风狠辣刁钻，专攻下盘与咽喉！四周商贾纷纷惊呼退避，你沉气凝神，稳扎少林马步迎上！'),
    ],
    choices: [
      {
        id: 'slq17_fight_thugs',
        label: '当街亮剑挺身，迎战过街鼠老六与铁棒张！（车轮连战 实战）',
        subLabel: '护持西廊药铺，震慑青蛇帮恶党',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSnakeThugB() },
            extraOpponents: [{ kind: 'custom', npc: buildSnakeThugA() }],
            rule: 'story_trial',
            forbidEscapeReason: '满街商贾皆在身后，俗家护法岂能临阵退缩！',
            introText: '【车轮连战 · 雅市擒恶】迎战青蛇堂香主【过街鼠老六】与悍徒【铁棒张】！',
            onWin: [openScene('scene_slq17_08', SHAOLIN_Q17_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('青蛇帮双匪招式阴毒，暂退茶棚调息后再来截住他们！', 'warn', '雅市擒恶'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq17_08: {
    id: 'scene_slq17_08',
    title: '第八幕 · 蛇尾惊逃',
    subtitle: '相国寺西廊药铺前',
    mandatory: true,
    beats: [
      N('十余合激斗，你掌风刚猛沉雄，震飞铁棒张手中鬼头刀，反手一记擒拿卸去过街鼠老六腕力，将二人双双扫翻在青石阶下！'),
      S(SPEAKER_SNAKE_THUG, '（捂着脱臼的手腕连滚带爬，咬牙切齿）“点子扎手！刁三，快撤！回去禀报五爷，今夜子时瓦子暗巷聚齐人手，非把这少林护法剁成肉泥不可！”'),
      N('青蛇帮众丢下假印契狼狈逃窜。孙老掌柜与十余位商贾纷纷涌上前拱手拜谢，卫弘龙与郑刚也收刀走近。'),
      S('NPC-0570', '（拾起地上的假朱印契，神色凝重）“好俊的身手！不过毒蛇钱五睚眦必报，老六逃回去定会搬动瓦子里的全部死士。快去大雄宝殿见慧照师叔，商议今夜破敌之策！”'),
    ],
    choices: [
      {
        id: 'slq17_go_hall',
        label: '携假印契前往【大雄宝殿（香云宝鼎）】禀报慧照禅师',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q17_QUEST_ID, 'hall_training'),
          toast('已击退闹事泼皮！请前往【大雄宝殿（香云宝鼎）】拜见慧照禅师。', 'success', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_09: {
    id: 'scene_slq17_09',
    title: '第九幕 · 香云论禅',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('步入大雄宝殿，香云宝鼎中檀烟袅袅，金色佛像慈目低垂。慧照禅师接过你呈上的伪造朱印契，长叹一声。'),
      S('NPC-0273', '“阿弥陀佛。毒蛇钱五曾是河朔绿林出身，一双鬼头刀蘸有寒毒，招招夺命。他既扬言今夜在瓦子暗巷报复，若不将其连根拔起，这雅市百余商户永无宁日。”'),
      P('“师叔，弟子愿今夜单刀赴瓦子暗巷，会一会那毒蛇钱五！只是弟子初入内门，尚缺一门克制短兵暗器的顺手刀杖法门。”'),
      S('NPC-0273', '（闻言展颜一笑，起身取过殿柱旁一柄熟铜禅杖与一口戒刀）“善哉！老衲正为此事候你多时！你既已通晓罗汉伏虎功底子，今日便在这香云宝鼎前，受我少林俗家护法双绝——《普门杖法》与《慈悲刀法》！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_10', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_10: {
    id: 'scene_slq17_10',
    title: '第十幕 · 普门杖意',
    subtitle: '大雄宝殿前庭',
    mandatory: true,
    beats: [
      N('慧照禅师横杖当胸，步走莲花，熟铜禅杖在他手中浑如游龙，挑、拨、扫、压之间竟带出层层浑厚气浪，既护周身不漏半点破绽，又可将敌刃震偏三尺之外。'),
      S('NPC-0273', '“听真了！《普门杖法》取自《观世音菩萨普门品》『慈眼视众生』之义——杖势大开大阖，专破市井暗巷多人围攻与阴毒暗器！一招『普度慈航』横扫千军，一招『立地成佛』沉劲封喉，守中带攻，稳如磐石！”'),
      P('（接过禅杖依言演练三遍，顿觉臂腕沉实，周身气机与杖风浑然一体）“原来如此！以长杖护身破围，便不怕青蛇帮在暗巷中耍阴招偷袭！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_11', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_11: {
    id: 'scene_slq17_11',
    title: '第十一幕 · 慈悲刀心',
    subtitle: '大雄宝殿前庭',
    mandatory: true,
    beats: [
      N('禅杖方收，慧照又拔出戒刀，刀光清亮如秋水，劈砍之际竟无半分戾气，反而在收刀回转处暗藏三叠震劲，将飘落殿前的枯叶齐齐震作两半而不伤叶脉。'),
      S('NPC-0273', '“此乃《慈悲刀法》！世人皆以为刀乃百兵之霸、只知嗜血杀伐；殊不知我少林慈悲刀，讲究『刀背制敌、刀锋断恶』！遇胁从之徒以刀背震晕留其性命，遇穷凶极恶之首则一刀断其兵刃、直取中宫！”'),
      S('NPC-0728', '（在殿廊下拍案叫绝）“好一招『刀背留情、刀锋断恶』！师叔这手慈悲刀法，最合咱们俗家弟子在红尘里行侠护法的心境！”'),
      P('（凝神默记刀杖双谱心诀，心头豁然开朗）“弟子谨记师叔教诲！心存慈悲而不失金刚霹雳手段，今夜定叫毒蛇钱五俯首伏诛！”'),
    ],
    onFinishEffects: [teachArtNow('MA-117'), teachArtNow('MA-114'), openScene('scene_slq17_12', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_12: {
    id: 'scene_slq17_12',
    title: '第十二幕 · 夜色定计',
    subtitle: '大雄宝殿 · 檐下',
    mandatory: true,
    beats: [
      N('暮鼓声沉，汴京城华灯初上。郑刚快步入殿禀报，青蛇帮主毒蛇钱五已集结三十余名帮众潜伏在雅市后巷瓦子茶肆，正备下桐油火把，欲于二更天火烧西廊药铺！'),
      S('NPC-0273', '“卫弘龙、郑刚，你二人率寺中护院武僧暗守西廊水缸与商铺门户，以防青蛇帮调虎离山；至于瓦子暗巷中的毒蛇钱五，便由你带发提刀直捣黄龙，擒贼先擒王！”'),
      P('“正是时候！二位师兄守好寺院药铺，我这就直奔雅市后巷瓦子！”'),
    ],
    choices: [
      {
        id: 'slq17_head_wazi',
        label: '整肃刀杖，夜赴【相国寺万姓交易雅市】后巷瓦子决战青蛇帮',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q17_QUEST_ID, 'wazi_showdown'),
          toast('慧照已点拨刀杖要诀！请速返【相国寺万姓交易雅市】夜入瓦子荡平青蛇帮！', 'talk', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_13: {
    id: 'scene_slq17_13',
    title: '第十三幕 · 瓦子暗巷',
    subtitle: '相国寺雅市后巷瓦子 · 二更天',
    mandatory: true,
    beats: [
      N('二更梆子敲响，白日喧嚣的万姓雅市归于沉寂，唯有后巷瓦子茶肆深处透出几盏幽暗灯笼。十余名提着桐油桶与钢刀的青蛇帮众正摩拳擦掌，中央太师椅上端坐一名三角眼、嘴角带疤的阴鸷汉子。'),
      S(SPEAKER_QIAN_WU, '（慢条斯理地用帕子擦拭鬼头大刀，阴恻恻地笑道）“待会儿一把火烧了西廊药铺，看那帮老和尚还敢不敢跟老子摆架子！那少林俗家小崽子要是敢来——”'),
      N('“轰”的一声巨响！瓦子木门被你一记禅杖震得粉碎，木屑纷飞中，你青衫束发、一手戒刀一手禅杖大步踏入灯火之中！'),
      P('“钱五！你不必去西廊找我了——少林俗家护法在此，特来替相国寺与满街商贾讨还公道！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_14', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_14: {
    id: 'scene_slq17_14',
    title: '第十四幕 · 红尘刀杖',
    subtitle: '瓦子暗巷 · 决战前夕',
    illustrationUrl: '/assets/quests/sl_17_wazi_brawl.jpg',
    illustrationCaption: '瓦子暗巷 · 带发提刀使出普门杖法与慈悲刀法，力战毒蛇钱五',
    mandatory: true,
    beats: [
      S(SPEAKER_QIAN_WU, '（瞳孔骤缩，随即狞笑起身，双刀交击迸出火星）“好胆！竟真敢一个人闯进老子的地盘！独眼豹，随我一起上，把这少林小子的脑袋挂到相国寺山门上！”'),
      N('周围寻常帮众被你方才震碎木门的雄浑内劲吓破了胆，竟无一人敢先上前；唯独毒蛇钱五与其死士护法独眼豹纵身扑出，寒光直逼面门！'),
      P('（心中澄明如镜，丹田罗汉伏虎功流转周身，慈悲刀与普门杖齐出）“既不肯放下屠刀，便休怪我红尘降魔！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_15', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_15: {
    id: 'scene_slq17_15',
    title: '第十五幕 · 荡平青蛇',
    subtitle: '瓦子暗巷（车轮连战 首领实战）',
    mandatory: true,
    beats: [
      N('毒蛇钱五刀势狠毒诡谲，独眼豹从旁以八卦游身刀与鹰爪功夹击！你稳守门户，将慧照方才传授的刀杖真意融会贯通，正面迎战！'),
    ],
    choices: [
      {
        id: 'slq17_fight_boss',
        label: '刀杖齐施，正面迎战【毒蛇钱五】与【独眼豹】！（二流中品 车轮连战）',
        subLabel: '荡平青蛇帮，护持大相国寺雅市商道',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQianWuBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildQianWuGuard() }],
            rule: 'story_trial',
            forbidEscapeReason: '毒蛇钱五近在咫尺，今夜若纵虎归山，西廊药铺必遭火劫！',
            introText: '【车轮连战 · 瓦子决战】迎战青蛇帮主【毒蛇钱五】与死士护法【独眼豹】！',
            onWin: [openScene('scene_slq17_16', SHAOLIN_Q17_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('毒蛇钱五刀势凶狠，先退回巷口稳住气血，调配招式再战！', 'warn', '夜荡青蛇'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq17_16: {
    id: 'scene_slq17_16',
    title: '第十六幕 · 断刃伏诛',
    subtitle: '瓦子暗巷',
    mandatory: true,
    beats: [
      N('酣战二十余合，独眼豹被你一记「普度慈航」横扫震断臂骨、昏死在地；毒蛇钱五见势不妙，虚晃一刀欲撒出毒砂逃遁，却被你抢先一步踏中宫，慈悲刀背重重拍中其手腕麻筋！'),
      N('“当啷”一声，鬼头大刀脱手坠地，毒蛇钱五惨呼跪倒。你反手点住其周身三处大穴，其余青蛇帮众见帮主被擒，纷纷丢下火把跪地求饶！'),
      S(SPEAKER_QIAN_WU, '（面如死灰，颤声求饶）“大侠饶命……小的有眼不识泰山，再也不敢打相国寺商铺的主意了……”'),
      N('此时巷口火把通明，卫弘龙、郑刚已带开封府巡街厢军赶到，将毒蛇钱五、刁三及一干首恶尽数上枷押走！'),
    ],
    onFinishEffects: [openScene('scene_slq17_17', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_17: {
    id: 'scene_slq17_17',
    title: '第十七幕 · 晨钟清明',
    subtitle: '相国寺万姓交易雅市 · 次日清晨',
    mandatory: true,
    beats: [
      N('次日清晨，相国寺万姓雅市再开大集。青蛇帮覆灭的消息一夜传遍汴京城南，西廊三十余家药铺素斋摊张灯结彩，孙老掌柜捧着新沏的清茶与谢银，执意要酬谢少林护法之恩。'),
      S('NPC-0728', '（哈哈大笑，拍了拍你的肩膀）“好{gender:师弟|师妹}！昨夜你单枪匹马破门擒贼，连开封府巡检都竖大拇指夸我少林俗家弟子有古侠遗风！这八十两护市酬银是商户们联名凑给寺院外务的赏格，慧照师叔说按规矩当归你作盘缠！”'),
      S('NPC-0570', '（难得露出几分敬佩之色）“昨夜那几手刀杖功夫沉稳大气，留了贼人活口交官发落，既扬了少林威名，又没沾半点血腥官司。俺服你！”'),
    ],
    onFinishEffects: [openScene('scene_slq17_18', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_18: {
    id: 'scene_slq17_18',
    title: '第十八幕 · 刀杖传薪',
    subtitle: '相国寺万姓交易雅市 · 古槐下',
    mandatory: true,
    beats: [
      S('NPC-0273', '（微笑递上两卷亲笔校注的线装秘籍）“阿弥陀佛。身在红尘而心守正道，手执利刃而心怀慈悲，你已得我俗家护法三昧。这两卷《普门杖法》与《慈悲刀法》全本，老衲今日正式传你，望你勤加体悟，日后护持苍生与佛门基业。”'),
      P('（双手接过秘籍，肃然抱拳致礼）“多谢慧照师叔成全！也谢过卫师兄、郑师兄鼎力相助！弟子定当铭记红尘护法之责，不负少林所托！”'),
    ],
    choices: [
      {
        id: 'slq17_finish_reward',
        label: '拜谢慧照禅师，领受《普门杖法》《慈悲刀法》与护市赏银（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-117' },
          { type: 'teachMartialArt', artId: 'MA-114' },
          { type: 'giveCombatExp', amount: 280, reason: '汴京相国寺雅市夜荡青蛇帮、生擒毒蛇钱五' },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveSilver', amount: 80, reason: '大相国寺万姓雅市护市酬银' },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q17_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《相国暗影 · 红尘刀杖》！习得《普门杖法》与《慈悲刀法》，获 80 两银钱与 110 门派贡献！',
            'success',
            '红尘刀杖',
          ),
        ],
      },
    ],
  },
}
