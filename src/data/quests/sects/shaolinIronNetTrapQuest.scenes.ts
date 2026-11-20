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
    learnedArts: [{ artId: 'MA-245', level: 9 }, { artId: 'MA-046', level: 9 }, { artId: 'MA-085', level: 8 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq31_01: {
    id: 'scene_slq31_01',
    title: '第一幕 · 密室议阵',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁一层',
    mandatory: true,
    beats: [
      N('{reignYear}深秋晦夜，朔风紧吹。重檐琉璃藏经主阁一层灯火全熄，唯有案下一盏暗罩铜灯映出三道肃杀身影——戒律院首座玄痛、一拍神僧玄寂，以及执图而立的你。'),
      S('NPC-0156', '（指节轻叩你所绘的藏经阁飞檐暗道图，眼中精光如电）“{playerName}，你七夕夜呈报的两份残纸与退路图，老衲与玄寂师兄已反复勘验。贼人不仅窥伺七十二绝技，近来更有边关密报称，西夏一品堂遣派了一名密宗魔僧潜入中原，专盗本寺历代珍藏的古兵书与阵图！”'),
      S('NPC-0134', '（沉声接话，掌中佛珠捻动生风）“佛门虽讲慈悲，却更有怒目金刚伏魔之戒！既有人敢视少林藏经阁如无人之境，便须以雷霆霹雳手段斩其爪牙，以儆效尤！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_02', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_02: {
    id: 'scene_slq31_02',
    title: '第二幕 · 兵略设伏',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁一层',
    mandatory: true,
    beats: [
      P('（展开阁楼布防草图，条分缕析道）“二位师叔明鉴！贼人既具宗师修为，轻功必极高明。若明哨林立，反会打草惊蛇；须外松内紧——今夜故意撤去外廊半数灯笼，留出东窗一处破绽诱敌入瓮！”'),
      P('“待其踏入二楼兵书橱前，再以三十六名戒律与罗汉堂精锐武僧分守三才八卦方位，拉起浸油精钢链网封死飞檐退路，逼其落回前院石坪，与我等正面决一死战！”'),
      S('NPC-0156', '（抚掌赞叹）“好一个请君入瓮、关门打狗！你策论兵机如此老辣，真乃我少林难得的帅才！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_03', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_03: {
    id: 'scene_slq31_03',
    title: '第三幕 · 伏魔铁网',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁内外',
    illustrationUrl: '/assets/quests/sl_31_iron_net.jpg',
    illustrationCaption: '暗布天罗 · 三十六名少林精锐武僧暗伏飞檐古柏，拉起伏魔铁网',
    mandatory: true,
    beats: [
      N('戌时刚过，三十六名身着深灰夜行僧衣、手持熟铜伏魔棍与精钢锁链的精锐武僧悄无声息地潜入藏经阁四周。有人隐于琉璃飞檐暗影，有人伏于古柏枝桠，呼吸绵长齐整，竟无半点声息外泄。'),
      S('NPC-0134', '（低声道）“老衲守住西侧松林，玄痛师弟封死后山断崖。{playerName}，你坐镇主阁正门中枢——一旦二楼警铃细丝震动，便由你发号收网！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_04', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_04: {
    id: 'scene_slq31_04',
    title: '第四幕 · 晦夜待敌',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('二更天过，乌云遮月，整座嵩山沉入伸手不见五指的死寂之中。你盘膝隐于主阁正梁阴影里，指尖轻搭着一根连向二楼兵书橱的极细蚕丝。'),
    ],
    choices: [
      {
        id: 'slq31_start_ambush',
        label: '屏息凝神，静待子夜恶客踏入伏魔天罗铁网！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q31_QUEST_ID, stepId: 'deploy_iron_net' },
          setStep(SHAOLIN_Q31_QUEST_ID, 'deploy_iron_net'),
          toast('已开启《铁血伏魔 · 暗布天罗》！三十六武僧已布阵就位，静待收网！', 'talk', '暗布天罗'),
          openScene('scene_slq31_05', SHAOLIN_Q31_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq31_05: {
    id: 'scene_slq31_05',
    title: '第五幕 · 魔影破窗',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('子夜三更，一阵夹杂着浓烈酥油与血腥气的阴风掠过东窗！一道身披黑红破旧番僧袈裟、颈挂人骨念珠的魁梧魔影如大鸟般无声滑入二楼！'),
      N('那魔僧轻车熟路地直奔「古兵书与边防舆图」暗橱，反手震断铜锁，一把抓出唐宋边防阵图与两卷少林棍阵秘录，正欲收入怀中——'),
    ],
    onFinishEffects: [openScene('scene_slq31_06', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_06: {
    id: 'scene_slq31_06',
    title: '第六幕 · 天罗骤收',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      N('你指尖蚕丝猛地一紧！不等黑水魔僧转身，你一声清啸震彻夜空：“收网——伏魔！”'),
      N('霎时间，藏经阁内外火把齐明，照如白昼！三十六名武僧齐喝一声佛号，十二张精钢锁链大网自琉璃飞檐轰然罩落，将东窗与屋脊退路封得水泄不通！'),
      S(SPEAKER_BLACKWATER_MONK, '（惊怒交加，双目赤红如鬼，反手一掌拍碎雕花木窗跃落前坪）“该死的少林秃驴，竟敢设伏算计本座！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_07', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_07: {
    id: 'scene_slq31_07',
    title: '第七幕 · 血战困兽',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      N('黑水魔僧见退路尽绝，凶性大发，周身黑紫魔气翻涌，挥动一柄藏于袈裟下的西夏弯月大刀硬生生劈断两条铁链，震伤三名合围武僧！'),
      S('NPC-0156', '（纵身拦住东侧缺口，厉声喝道）“此獠乃西夏一品堂密宗宗师「黑水魔僧」！武僧结阵锁死四方，{playerName}，你与我等合力缠住他，绝不能让他携兵书逃出山门！”'),
      S('NPC-0134', '（以一拍两散掌硬接魔僧一刀，震退魔僧半步）“魔僧已被铁网耗去三成真气！{playerName}，趁势正面斩魔！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_08', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_08: {
    id: 'scene_slq31_08',
    title: '第八幕 · 决杀黑水',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪（决战宗师下品）',
    mandatory: true,
    beats: [
      S(SPEAKER_BLACKWATER_MONK, '（狞笑舔血，杀气冲天）“好个毛头小僧，竟敢当本座主攻手！今日便拿你的人头祭我西夏铁骑！”'),
      N('火光映照刀锋，黑水魔僧挟宗师下品之威悍然扑来！此战唯死战而已！'),
    ],
    choices: [
      {
        id: 'slq31_fight_blackwater',
        label: '催动毕生绝学，于天罗铁网之中正面截杀西夏黑水魔僧！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q31_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBlackwaterMonkBoss() },
            rule: 'duel',
            forbidEscapeReason: '天罗铁网已合，身后便是少林千年藏经阁，绝无退步之理！',
            introText: '西夏一品堂客卿「黑水魔僧」困兽犹斗，杀招凌厉无匹，务须将其当场伏诛！',
            onWin: [openScene('scene_slq31_09', SHAOLIN_Q31_QUEST_ID)],
            onLose: [openScene('scene_slq31_10', SHAOLIN_Q31_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq31_09: {
    id: 'scene_slq31_09',
    title: '第九幕 · 伏魔斩妖',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    illustrationUrl: '/assets/quests/sl_31_slay_blackwater.jpg',
    illustrationCaption: '子夜斩魔 · 琉璃阁前火光冲天，一击击毙西夏一品堂黑水魔僧',
    mandatory: true,
    beats: [
      N('火海般的拳风刀影交错数十合！黑水魔僧本已受武僧铁网牵制，此刻在你绵密刚猛的少林绝学连环压迫下终于露出空门！'),
      N('你低喝一声佛号，聚十成纯厚内力一击破开其西夏玄功护体气墙，轰然印在其胸口檀中大穴！黑水魔僧发出一声凄厉惨嚎，弯刀脱手飞出，整个人倒撞在石阶上气绝伏诛！'),
    ],
    onFinishEffects: [openScene('scene_slq31_11', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_10: {
    id: 'scene_slq31_10',
    title: '第十幕 · 铁阵援护',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      N('黑水魔僧困兽犹斗，一记西夏玄功重刀将你震退数步。危急关头，玄痛、玄寂与三十六名武僧齐齐挺棍架住魔僧追击，为你争得喘息调息之机！'),
      S('NPC-0156', '（大喝）“魔僧已是强弩之末，速稳心神再战！”'),
    ],
    onFinishEffects: [{ type: 'healPlayer', hpPct: 80, mpPct: 80 }],
  },

  scene_slq31_11: {
    id: 'scene_slq31_11',
    title: '第十一幕 · 夺回兵书',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      N('你上前俯身从黑水魔僧怀中搜出那几卷尚带体温的宋夏边防古阵图与少林棍阵秘录，又在其贴身锦囊里摸出一枚刻着西夏文字的「一品堂玄铁令」。'),
      P('（高举玄铁令，冷声道）“果然是西夏一品堂的手笔！若叫这些边防阵图落入西夏铁骑之手，大宋西北边关不知要多添多少白骨！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_12', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_12: {
    id: 'scene_slq31_12',
    title: '第十二幕 · 肃清余踪',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      S('NPC-0156', '（接过玄铁令细细察看，神色冷峻而振奋）“痛快！真痛快！这黑水魔僧在西夏一品堂号称宗师客卿，横行西北多年，今夜却栽在{playerName}你亲手布下的伏魔天罗阵里！”'),
      S('NPC-0134', '（合十宣了一声佛号，吩咐武僧收殓尸首、救治伤员）“虽说佛门戒杀，然除一魔头可救边关万民，此乃大勇大义！这三十六名武僧无一折损，全赖师侄谋划周密。”'),
    ],
    onFinishEffects: [openScene('scene_slq31_13', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_13: {
    id: 'scene_slq31_13',
    title: '第十三幕 · 黎明传捷',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      N('天色微明，昨夜藏经阁伏魔斩敌之讯如春雷般传遍少林各院。罗汉堂、达摩院、戒律院乃至菩提院数百名僧众闻讯赶来，见前坪断链焦石与完好无损的兵书典籍，无不肃然动容！'),
    ],
    onFinishEffects: [openScene('scene_slq31_14', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_14: {
    id: 'scene_slq31_14',
    title: '第十四幕 · 铁血威望',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    illustrationUrl: '/assets/quests/sl_31_iron_prestige.jpg',
    illustrationCaption: '铁血威望 · 晨光下众武僧齐声合十致敬，铁血护寺之名震动全寺',
    mandatory: true,
    beats: [
      N('三十六名并肩血战的少林武僧齐刷刷单掌竖胸，向你深深行礼，齐声高诵：“阿弥陀佛！拜见伏魔真传！”'),
      N('晨光洒在琉璃阁飞檐之上，你身着染血僧衣傲然挺立，眉宇间自有一股镇慑群魔的铁血宗师气象。'),
    ],
    onFinishEffects: [openScene('scene_slq31_15', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_15: {
    id: 'scene_slq31_15',
    title: '第十五幕 · 暗影犹存',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前坪',
    mandatory: true,
    beats: [
      P('（微微颔首还礼，心中却未有半分松懈，低声对玄痛、玄寂道）“二位师叔，黑水魔僧虽已伏诛，然我观其武功路数，与七夕暴雨夜在二楼对掌的那两位绝世高人并非一路。藏经阁真正最深的暗流，恐怕尚未现身。”'),
      S('NPC-0156', '（沉重点头）“不错！然经此一战，天下宵小皆知我少林藏经阁暗布铁网、戒备森严，纵有野心勃勃之辈，也须先掂量掂量自己的项上人头！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_16', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_16: {
    id: 'scene_slq31_16',
    title: '第十六幕 · 功过昭彰',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      S('NPC-0134', '（拍了拍你的肩头，郑重道）“玄慈方丈闻报后已降法旨：记你护寺首功一件，赏师门贡献三百，并准你日后协同戒律院巡察全寺禁地防务！”'),
      P('（双手合十）“弟子领命！只要弟子在一日，便绝不容任何外敌染指少林一卷经书、一寸山门！”'),
    ],
    onFinishEffects: [openScene('scene_slq31_17', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_17: {
    id: 'scene_slq31_17',
    title: '第十七幕 · 兵书归橱',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('你亲手将夺回的宋夏边防古阵图与少林棍阵秘录重新封入樟木暗橱，又命匠人将铁网机关改良加固。'),
      N('经过此番实战运筹与生死搏杀，你对兵略策论与临阵机变之理解又上层楼。'),
    ],
    onFinishEffects: [openScene('scene_slq31_18', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_18: {
    id: 'scene_slq31_18',
    title: '第十八幕 · 威震中原',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('不出半月，少林真传弟子于藏经阁前阵斩西夏一品堂宗师客卿「黑水魔僧」之捷报便传遍中原武林，江湖豪杰无不拍手称快，西夏暗探闻风丧胆。'),
    ],
    onFinishEffects: [openScene('scene_slq31_19', SHAOLIN_Q31_QUEST_ID)],
  },

  scene_slq31_19: {
    id: 'scene_slq31_19',
    title: '第十九幕 · 铁血铸心',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁',
    mandatory: true,
    beats: [
      N('玄痛与玄寂并肩送你出阁，眼中满是托付少林未来之期许。铁血伏魔之路已定，你的威名与担当，正一步步迈向少林堂院首座之尊。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_pavilion', value: 'ironfist' },
      { type: 'giveCombatExp', amount: 820, reason: '铁血伏魔 · 暗布天罗' },
      { type: 'addSectContribution', amount: 300 },
      { type: 'modifyRenown', delta: 80, reason: '藏经阁斩毙西夏黑水魔僧' },
      { type: 'modifySkill', key: '策论', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 25 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 25 },
      { type: 'completeQuest', questId: SHAOLIN_Q31_QUEST_ID, outcome: 'completed' },
      toast(
        '《铁血伏魔 · 暗布天罗》完结！实战经验 +820，师门贡献 +300，江湖威望 +80，策论 +2，经义 +1，玄痛、玄寂好感 +25！',
        'success',
        '暗布天罗',
      ),
      openScene('scene_slq31_20', SHAOLIN_Q31_QUEST_ID),
    ],
  },

  scene_slq31_20: {
    id: 'scene_slq31_20',
    title: '第二十幕 · 钟鸣嵩岳',
    subtitle: '嵩山少林寺 · 藏经阁',
    mandatory: true,
    beats: [
      N('嵩岳风急，伏魔钟声震彻云霄。你遥望西北边陲，掌中真气隐隐雷鸣——无论西夏一品堂还是中原暗流再起波澜，少林铁血护法之剑已然出鞘！'),
    ],
  },
}
