import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_Q08_QUEST_ID } from './huashanJianXiyiQuest'

const SPEAKER_ASSASSIN_SABRE: StorySpeakerSpec = {
  kind: 'custom',
  name: '阿史那枭',
  title: '黑沙弯刀 · 西夏黑市雇佣奇门刺客',
  factionName: '西夏黑市死士',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_ASSASSIN_BRUSH: StorySpeakerSpec = {
  kind: 'custom',
  name: '康兀赤',
  title: '铁骨判官 · 西域奇门盗宝杀手',
  factionName: '西夏黑市死士',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildAssassinSabreNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ08_ASSASSIN_SABRE',
    name: '阿史那枭',
    title: '西域奇门刺客 · 黑沙弯刀',
    realm: '二流上品',
    factionName: '西夏黑市死士',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“这口陈抟老道留下的太华古铜钟，兴庆府贵人出了重金！挡路的小剑客死！”',
    stats: { hp: 1620, mp: 1380, agi: 54, res: 38 },
    talents: { bone: 68, comprehension: 58, charm: 32 },
    equippedArts: { neigong: 'MA-245', qinggong: 'MA-246', move1: 'MA-133', move2: 'MA-095' },
    learnedArts: [
      { artId: 'MA-245', level: 4 },
      { artId: 'MA-246', level: 4 },
      { artId: 'MA-133', level: 5 },
      { artId: 'MA-095', level: 4 },
    ],
    equipped: { weapon: 'WPN-044' },
    questBadgeLabel: '西域刺客',
  })
}

function buildAssassinBrushNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ08_ASSASSIN_BRUSH',
    name: '康兀赤',
    title: '西域奇门刺客 · 铁骨判官',
    realm: '二流上品',
    factionName: '西夏黑市死士',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“{gender:他|她}剑招突然变慢了，定是内力不济！左右齐上锁{gender:他|她}琵琶骨！”',
    stats: { hp: 1540, mp: 1420, agi: 55, res: 37 },
    talents: { bone: 64, comprehension: 62, charm: 34 },
    equippedArts: { neigong: 'MA-245', qinggong: 'MA-246', move1: 'MA-096', move2: 'MA-118' },
    learnedArts: [
      { artId: 'MA-245', level: 4 },
      { artId: 'MA-246', level: 4 },
      { artId: 'MA-096', level: 4 },
      { artId: 'MA-118', level: 5 },
    ],
    equipped: { weapon: 'WPN-023' },
    questBadgeLabel: '奇门杀手',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq08_01: {
    id: 'scene_hsq08_01',
    title: '第一幕 · 孤峰召见',
    subtitle: '华山绝顶论剑台 · 博台孤峰弈棋亭',
    mandatory: true,
    beats: [
      N('{reignYear}寒露过后，西岳绝顶云海翻腾。铁索相连的博台孤峰之上，一座石亭孤悬万丈深渊之侧，相传乃是宋初华山希夷先生陈抟与太祖皇帝对弈赢下华山免赋之地。'),
      N('「潼关剑神」秦烈山独坐石枰之前，白发如霜，一柄古朴重剑横置膝头。封不弃引你踏过铁索来到亭外，难得收敛了平日里的狂傲之气。'),
      S('NPC-0167', '“秦师兄，这便是近来在潼关与风陵渡连立两功的剑宗苗子。《养吾剑法》与《落雁剑法》皆已小成，我想保举{gender:他|她}入本门真传弟子之列，特请师兄过目。”'),
      S('NPC-0147', '（眼皮微抬，目光如电刺来）“风陵渡半柱香破三哨，听着倒是痛快。拔剑吧——把你最得意的那招回风扑雁使出来，能接过老夫三合，真传腰牌今日便给你。”'),
    ],
    choices: [
      {
        id: 'hsq08_01_start',
        label: '躬身行礼，拔剑准备接受潼关剑神三合考校',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q08_QUEST_ID, stepId: 'botai_test' },
          openScene('scene_hsq08_02', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq08_02: {
    id: 'scene_hsq08_02',
    title: '第二幕 · 拔剑逞快',
    subtitle: '博台孤峰弈棋亭 · 疾剑试锋',
    mandatory: true,
    beats: [
      N('你深吸一口山巅冷气，仗着连番胜绩养出的凌厉剑势，足踏斜步如寒雁掠空，青锋化作数点寒星直取秦烈山肩井要穴！'),
      P('“请秦师伯赐教！”'),
    ],
    choices: [
      {
        id: 'hsq08_02_spar',
        label: '全力催动《落雁剑法》，迎接秦烈山三合试剑！',
        subLabel: '宗门考校 · 撑过或经历秦烈山三合拆招',
        tone: 'primary',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q08_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0147',
              talkOverride: '“只图抢先、不留余地——看清楚你自己的右胁空门！”',
            },
            rule: 'survive_rounds',
            maxRounds: 3,
            forbidEscapeReason: '博台孤峰宗门考校，岂有临阵逃脱之理！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_hsq08_03', HUASHAN_Q08_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_hsq08_03', HUASHAN_Q08_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq08_03: {
    id: 'scene_hsq08_03',
    title: '第三幕 · 博台折锋',
    subtitle: '博台孤峰弈棋亭 · 三合破快',
    illustrationUrl: '/assets/quests/hs_q08_qin_three_moves.jpg',
    illustrationCaption: '博台折锋 · 潼关剑神秦烈山三合点破快剑空门，痛斥匹夫之勇',
    mandatory: true,
    beats: [
      N('第一合，你剑走偏锋疾刺其腕，秦烈山甚至未曾起身，只将古剑连鞘偏了半寸便令你剑势走空；第二合，你顺势变招“回风扑雁”连环三刺，他却后发先至，剑鞘轻描淡写敲在你的剑锷节点之上！'),
      N('第三合刚起，你旧力方竭、换气微滞的刹那，秦烈山的宽背剑脊已如闪电般穿过你双臂间隙，冷冰冰地贴在了你右胁死穴之上！整条右臂顿时酸麻欲裂，长剑险些脱手！'),
      S('NPC-0147', '（冷声震彻孤峰）“一味图快而无虚实奇正，不过匹夫之剑！对付些水匪路寇尚可逞威，一旦遇上眼力毒辣的一流高手，看穿你三剑之后必无变招，只需半招便能要你的命！”'),
    ],
    choices: [
      {
        id: 'hsq08_03_next',
        label: '满背冷汗收剑垂首，愧然请秦师伯指点迷津',
        tone: 'default',
        effects: [openScene('scene_hsq08_04', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_04: {
    id: 'scene_hsq08_04',
    title: '第四幕 · 快剑之弊',
    subtitle: '博台孤峰弈棋亭 · 良药苦口',
    mandatory: true,
    beats: [
      N('一旁的封不弃张了张嘴想要替你分辩，最终却只是暗叹一声，默然背过手去。'),
      S('NPC-0167', '“……秦师兄骂得对。我平日只催你求快求狠，却忘了你根基尚浅，十成剑意一泻千里，一旦被人架住第一波锋芒，后手便全是破绽。”'),
      P('“弟子知错！方才第三剑递出时，弟子心知右胁已露空门，奈何剑势太急根本收挽不住。敢问秦师伯，快剑当如何求变？”'),
    ],
    choices: [
      {
        id: 'hsq08_04_next',
        label: '移步石枰之前，细看秦烈山手下残局',
        tone: 'primary',
        effects: [openScene('scene_hsq08_05', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_05: {
    id: 'scene_hsq08_05',
    title: '第五幕 · 陈抟遗局',
    subtitle: '博台石枰 · 弃子争先',
    mandatory: true,
    beats: [
      N('秦烈山缓下神色，抬手指向石桌上的青白棋枰。只见黑子大龙看似凶猛扑杀，实则腹背受敌；反倒是角落里三枚看似闲散退让的白子，隐隐锁死了全局气眼。'),
      S('NPC-0147', '“此乃百年前希夷先生陈抟留下的《云台残局》。世人只知快刀斩乱麻，却不知至快之剑必借至静之虚。你看这步白子——故意卖个缓着诱黑棋猛扑，待其气紧形滞，一子点眼便可屠龙！”'),
      P('（凝视棋枰良久，豁然开朗）“以缓藏急，以虚引实！若先以若有若无的虚招诱敌抢攻，待敌露出破绽再发快剑，岂非无往不利？！”'),
    ],
    choices: [
      {
        id: 'hsq08_05_comprehend',
        label: '落下一枚白子印证棋理，向秦师伯深揖求剑',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '棋', delta: 2 },
          toast('参悟陈抟《云台残局》弃取之道，【棋】艺精进 +2！', 'success', '云台残局'),
          openScene('scene_hsq08_06', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq08_06: {
    id: 'scene_hsq08_06',
    title: '第六幕 · 移步寒潭',
    subtitle: '博台孤峰弈棋亭 · 命赴思过崖下',
    mandatory: true,
    beats: [
      S('NPC-0147', '（眼中露出一丝赞许）“总算不是块顽铁！昔年陈抟老祖观太华云雾聚散，创下一路道家地阶剑术，正可补你快剑刚猛易折之短。”'),
      S('NPC-0147', '“随老夫去【思过崖古山洞 · 绝壁银瀑涤心寒潭】！唯有在千尺飞瀑的轰鸣声中听见无声之剑，你才配碰这门剑法！”'),
    ],
    choices: [
      {
        id: 'hsq08_06_go_falls',
        label: '随秦烈山前往思过崖下绝壁银瀑涤心寒潭',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q08_QUEST_ID, 'falls_xiyi'),
          toast('请前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】随秦烈山参悟地阶剑法！', 'talk', '希夷求变'),
        ],
      },
    ],
  },

  scene_hsq08_07: {
    id: 'scene_hsq08_07',
    title: '第七幕 · 银瀑听涛',
    subtitle: '思过崖古山洞 · 绝壁银瀑涤心寒潭',
    mandatory: true,
    beats: [
      N('绝壁千仞，一条银河般的巨瀑自崖顶轰然砸入碧绿深潭，水花四溅如碎玉乱琼。秦烈山立于潭心一块青石之上，任凭飞瀑水气打湿须发。'),
      S('NPC-0147', '“《道德经》有云：‘视之不见名曰夷，听之不闻名曰希。’水至柔却能穿顽石，雾无形却能掩绝壁。你且看我手中松枝！”'),
    ],
    choices: [
      {
        id: 'hsq08_07_next',
        label: '目不转睛凝视秦烈山手中松枝轨迹',
        tone: 'gold',
        effects: [openScene('scene_hsq08_08', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_08: {
    id: 'scene_hsq08_08',
    title: '第八幕 · 云台悟变',
    subtitle: '绝壁银瀑涤心寒潭 · 授希夷剑',
    illustrationUrl: '/assets/quests/hs_q08_yuntai_chess.jpg',
    illustrationCaption: '云台悟变 · 陈抟对弈古亭参悟虚实奇正，获授地阶希夷剑法',
    mandatory: true,
    beats: [
      N('秦烈山折下一截苍翠松枝，缓缓在飞瀑水幕前划动。起初松枝慢若游云、处处皆是空门漏隙；可每当飞溅的水珠撞入圈内，松枝便在毫厘间诡异一旋，无声无息点碎水珠核心！'),
      S('NPC-0147', '“此乃本门地阶下品绝学——《希夷剑法》！全剑共一十八变，十虚八实、奇正互换。敌以为虚而欺入，则迎头撞上杀锋；敌以为实而格挡，则剑走空灵早已绕至其背！”'),
      N('秦烈山将《希夷剑法》一十八路虚实变化逐一拆解传授，你立于寒潭边潜心演练，心中滞碍层层冰释！'),
    ],
    choices: [
      {
        id: 'hsq08_08_learn',
        label: '拜受地阶下品《希夷剑法》，潜心融合虚实剑意',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-089', level: 1 },
          toast('已习得地阶下品武学《希夷剑法》！', 'success', '希夷真传'),
          openScene('scene_hsq08_09', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq08_09: {
    id: 'scene_hsq08_09',
    title: '第九幕 · 大音希声',
    subtitle: '绝壁银瀑涤心寒潭 · 以慢藏快',
    mandatory: true,
    beats: [
      N('自正午练至日影西斜，你渐能将全身凛冽杀气尽数敛入看似散漫的剑圈之中。长剑挥出时竟不再发出刺耳破空锐啸，隐没于瀑布轰鸣声里杳不可闻。'),
      P('“大音希声，大象无形……越是不露破空声息的剑，刺出那一瞬才越叫人无从闪避！”'),
    ],
    choices: [
      {
        id: 'hsq08_09_next',
        label: '尝试将《希夷剑法》与《落雁剑法》衔接互变',
        tone: 'primary',
        effects: [openScene('scene_hsq08_10', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_10: {
    id: 'scene_hsq08_10',
    title: '第十幕 · 奇正相生',
    subtitle: '绝壁银瀑涤心寒潭 · 双剑合流',
    mandatory: true,
    beats: [
      N('你左手捏剑诀，起手使出《希夷剑法》“白云出岫”，剑势飘渺迟缓；行至半途手腕陡然一翻，化作《落雁剑法》“回风扑雁”，“铮”地将潭畔一块鹅卵石挑成两半！'),
      S('NPC-0147', '（捻须微微点头）“略有小成了。老夫去前峰巡视山门晚课，你独自在寒潭边再把十八路虚实转换打磨百遍，入夜后到落雁峰复命。”'),
    ],
    choices: [
      {
        id: 'hsq08_10_next',
        label: '恭送秦师伯离去，留在寒潭边继续静心揣摩',
        tone: 'default',
        effects: [openScene('scene_hsq08_11', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_11: {
    id: 'scene_hsq08_11',
    title: '第十一幕 · 暮鸦惊钟',
    subtitle: '绝壁银瀑涤心寒潭 · 幽龛异响',
    mandatory: true,
    beats: [
      N('秦烈山刚走不久，暮色渐笼深谷，林间寒鸦惊飞。忽有一阵极轻微、被瀑布水声刻意掩盖的精钢凿石与锁链摩擦之声，自寒潭北侧供奉陈抟遗物的古道龛传来！'),
      P('（心头一凛，悄然敛息）“这个时辰外门弟子早已归观，思过崖下怎会有人动用精钢器械？！”'),
    ],
    choices: [
      {
        id: 'hsq08_11_investigate',
        label: '借飞瀑水雾掩护，悄无声息摸向寒潭古道龛',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q08_QUEST_ID, 'falls_assassins'),
          openScene('scene_hsq08_12', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq08_12: {
    id: 'scene_hsq08_12',
    title: '第十二幕 · 黑市盗钟',
    subtitle: '寒潭古道龛 · 贼踪败露',
    mandatory: true,
    beats: [
      N('拨开垂悬的古藤一看，只见两名身穿胡服皮甲、面罩黑巾的精悍汉子，正用大食火药膏与乌钢撬楔切割悬于石梁上的华山镇观之宝——太华希夷古铜钟！'),
      S(SPEAKER_ASSASSIN_BRUSH, '“动作麻利点！西夏黑市的大掌柜说了，只要盗走这口镌着陈抟道家阵图的古铜钟，赏金足足五百两西夏官银！”'),
      P('（横剑踏出石阶，冷声断喝）“好大胆的西域毛贼，竟敢潜入西岳华山腹地盗取本门镇观古钟！”'),
    ],
    choices: [
      {
        id: 'hsq08_12_next',
        label: '横剑封住古龛下山窄径，断绝二贼退路',
        tone: 'danger',
        effects: [openScene('scene_hsq08_13', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_13: {
    id: 'scene_hsq08_13',
    title: '第十三幕 · 异刃凶芒',
    subtitle: '绝壁银瀑涤心寒潭 · 双谍包抄',
    mandatory: true,
    beats: [
      N('两名盗钟杀手非但不逃，反而对视一眼露出凶残笑意！左边一人抽出弧度诡异的大食乌兹镔铁弯刀，右边一人亮出一对专锁刀剑锋刃的龙蛇判官双笔，一左一右将你夹在湿滑潭石中央！'),
      S(SPEAKER_ASSASSIN_SABRE, '“原来是个落单的华山小辈！正好宰了灭口，连人带钟一并丢下万丈深涧！”'),
      N('二人气息沉凝狠辣，赫然皆是浸淫暗杀多年的二流上品好手，奇门双笔锁剑、西域弯刀割喉，配合默契无比！'),
    ],
    choices: [
      {
        id: 'hsq08_13_next',
        label: '沉气敛锋，默运刚习得的《希夷剑法》虚实诀窍',
        tone: 'primary',
        effects: [openScene('scene_hsq08_14', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_14: {
    id: 'scene_hsq08_14',
    title: '第十四幕 · 示弱诱敌',
    subtitle: '绝壁银瀑涤心寒潭 · 卖破引狼',
    mandatory: true,
    beats: [
      N('若按往日习气贸然施展快剑抢攻，一旦长剑被康兀赤的判官双笔架锁半分，阿史那枭的乌兹弯刀便会将你拦腰斩断！'),
      N('电光石火间，你忆起博台之上陈抟残局的那步弃子，故意呼吸一滞、剑尖微垂，摆出一式看似左支右拙、中门大开的《希夷剑法》“云迷太华”虚招！'),
      S(SPEAKER_ASSASSIN_BRUSH, '“哈哈，吓软了手脚！阿史那，随我一齐抢入中宫结果{gender:他|她}！”'),
    ],
    choices: [
      {
        id: 'hsq08_14_next',
        label: '待双贼兵刃齐入虚圈一刹，骤发快剑封喉！',
        tone: 'danger',
        effects: [openScene('scene_hsq08_15', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_15: {
    id: 'scene_hsq08_15',
    title: '第十五幕 · 银瀑封喉',
    subtitle: '绝壁银瀑涤心寒潭 · 以一敌二',
    illustrationUrl: '/assets/quests/hs_q08_falls_assassins.jpg',
    illustrationCaption: '银瀑封喉 · 飞瀑寒潭下希夷诱敌合落雁快剑独斩西域双刺客',
    mandatory: true,
    beats: [
      N('飞瀑水花炸裂！两名西域刺客贪功冒进，弯刀与判官笔同时刺入你胸前空门——殊不知那正是希夷剑圈引力最强的漩涡中心！'),
      P('“入局了——看剑！”'),
    ],
    choices: [
      {
        id: 'hsq08_15_fight',
        label: '希夷引刃相撞，合落雁快剑独斩西域奇门双刺客！（1对2死战）',
        subLabel: '生死决战 · 阿史那枭 & 康兀赤（二流上品双敌）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q08_QUEST_ID,
            opponent: { kind: 'custom', npc: buildAssassinSabreNpc() },
            extraOpponents: [{ kind: 'custom', npc: buildAssassinBrushNpc() }],
            rule: 'duel',
            forbidEscapeReason: '身负护卫本门镇观古钟重任，绝不可退让半步！',
            deathTitle: '血染涤心寒潭',
            deathDetail: '你在思过崖下绝壁银瀑寒潭遭西域奇门双刺客夹击，力战不敌殉身护钟。',
            onWin: [openScene('scene_hsq08_16', HUASHAN_Q08_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq08_16: {
    id: 'scene_hsq08_16',
    title: '第十六幕 · 一虚一杀',
    subtitle: '绝壁银瀑涤心寒潭 · 双谍伏诛',
    mandatory: true,
    beats: [
      N('锵啷一声脆响！你以《希夷剑法》柔劲轻轻一粘一引，竟教康兀赤的铁骨判官笔精准磕偏了阿史那枭劈来的乌兹弯刀！'),
      N('双贼兵刃交叠卡死的刹那，你原本轻柔如雾的剑势陡然化作《落雁剑法》至快杀招！寒光在飞瀑水幕前一折两闪，两名二流上品西域杀手甚至来不及退后半寸，咽喉已同时飙起血箭，双双扑倒在潭边青石之上！'),
    ],
    choices: [
      {
        id: 'hsq08_16_next',
        label: '稳住古道龛上的希夷铜钟，搜查两名刺客尸身',
        tone: 'primary',
        effects: [openScene('scene_hsq08_17', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_17: {
    id: 'scene_hsq08_17',
    title: '第十七幕 · 搜验密牌',
    subtitle: '寒潭古道龛 · 黑市铁证',
    mandatory: true,
    beats: [
      N('你托住险些坠落的太华古铜钟重新挂牢，钟身发出一声悠远清越的嗡鸣。随后自阿史那枭怀中搜出一块镌着党项文字的黑铜腰牌，以及一袋西夏黑市预付的定金纹银。'),
      P('“西夏黑市竟派死士深入关中名门盗取道门古器……幸好今日初悟虚实奇正之变，否则单凭一味图快，必着了他们奇门兵刃的道！”'),
    ],
    choices: [
      {
        id: 'hsq08_17_next',
        label: '持黑铜腰牌转身，迎向闻钟声疾掠而至的两位师门宿老',
        tone: 'gold',
        effects: [openScene('scene_hsq08_18', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_18: {
    id: 'scene_hsq08_18',
    title: '第十八幕 · 剑神验伤',
    subtitle: '绝壁银瀑涤心寒潭 · 慧眼识痕',
    mandatory: true,
    beats: [
      N('破空声骤响，秦烈山与封不弃一前一后落于寒潭石阶。封不弃一眼瞧见地上两具握着西域奇门兵刃的尸首，不禁吃了一惊；秦烈山却蹲下身去，细看判官笔上的擦痕与双尸喉间剑创，双目陡然精光暴涨！'),
      S('NPC-0147', '“兵器上有希夷粘引相撞的铜印，咽喉上却是落雁一掠封喉的快剑创口！短短半日，你竟真在生死关头把一虚一实两套剑法揉在了一处？！”'),
      S('NPC-0167', '（既惊且喜，拍案叫绝）“以一敌二斩杀两名二流上品西域杀手！秦师兄，这下你总不能再骂{gender:他|她}是匹夫之剑了吧？”'),
    ],
    choices: [
      {
        id: 'hsq08_18_promote',
        label: '呈上西夏黑市腰牌，随二老登落雁峰白玉论剑坛',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q08_QUEST_ID, 'altar_promote'),
          toast('护钟诛谍立下大功！请前往【华山绝顶论剑台 > 落雁峰白玉论剑坛】晋升真传弟子！', 'success', '剑神嘉许'),
        ],
      },
    ],
  },

  scene_hsq08_19: {
    id: 'scene_hsq08_19',
    title: '第十九幕 · 白玉登坛',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('皓月初升，落雁峰白玉论剑坛清辉如水。数名留守绝顶的华山执事弟子分列两侧，秦烈山居中而立，封不弃按剑侍立于侧。'),
      N('你将寒潭护钟、诱敌诛杀西夏黑市双谍之经过如实禀明，殿坛上下一片动容。'),
    ],
    choices: [
      {
        id: 'hsq08_19_next',
        label: '肃立白玉坛心，静听两位师门前辈宣示',
        tone: 'gold',
        effects: [openScene('scene_hsq08_20', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_20: {
    id: 'scene_hsq08_20',
    title: '第二十幕 · 双宿联保',
    subtitle: '落雁峰白玉论剑坛 · 联名举荐',
    mandatory: true,
    beats: [
      S('NPC-0147', '“老夫镇守绝顶数十年，平生最恨空谈玄理之腐儒，亦不取有勇无谋之莽夫。今日此子受挫知返，于陈抟残局与寒潭银瀑间悟透奇正相生，孤身护住本门古钟，实乃良材美玉！”'),
      S('NPC-0167', '“我封不弃与秦烈山师兄今日联名具保，传牒东峰紫霞正殿：自即刻起，擢升你为西岳华山派真传弟子！”'),
    ],
    choices: [
      {
        id: 'hsq08_20_next',
        label: '双手接过华山真传玄玉剑牌，拜谢两位前辈',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-05', rank: 3, promoteOnly: true },
          toast('恭喜晋升华山派第 3 阶【真传弟子】！', 'success', '晋位真传'),
          openScene('scene_hsq08_21', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq08_21: {
    id: 'scene_hsq08_21',
    title: '第二十一幕 · 晋位真传',
    subtitle: '落雁峰白玉论剑坛 · 真传立身',
    mandatory: true,
    beats: [
      N('接过冰凉温润的真传玄玉剑牌系于腰间，你只觉肩头沉甸甸地多了一份传承千钧之责。'),
      S('NPC-0147', '“既入真传之列，眼界便莫再局限于一山一水。西夏与契丹黑市近年屡屡觊觎关中武林，你这套虚实快剑，日后还要替大宋西陲挡下更大的风浪！”'),
      P('“弟子定不负秦师伯与封师叔联名保举之恩，必以手中三尺剑护我西岳清名！”'),
    ],
    choices: [
      {
        id: 'hsq08_21_next',
        label: '凭栏远眺八百里秦川夜色，聆听封不弃密语',
        tone: 'primary',
        effects: [openScene('scene_hsq08_22', HUASHAN_Q08_QUEST_ID)],
      },
    ],
  },

  scene_hsq08_22: {
    id: 'scene_hsq08_22',
    title: '第二十二幕 · 太岳长风',
    subtitle: '落雁峰绝顶 · 剑道新程',
    mandatory: true,
    beats: [
      N('仪式散后，封不弃走至坛边与你并肩而立，压低声音道：“好小子，连秦师兄那双挑剔的眼睛都被你折服了！把《希夷剑法》好生练熟，待秋霜最重的那一夜，我再带你去一处尘封三十年的禁地，教你我剑宗真正压箱底的夺命杀剑！”'),
      N('太岳长风浩浩荡荡掠过落雁绝顶，你按剑而立，快慢虚实两道剑意在胸中交融流转，正式迈入华山真传剑客之列！'),
    ],
    choices: [
      {
        id: 'hsq08_22_finish',
        label: '收妥宗门重赏，潜心精修地阶《希夷剑法》',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-089', amount: 280 },
          { type: 'giveSilver', amount: 120, reason: '缴获西夏黑市赏银及晋升真传赐银' },
          { type: 'addSectContribution', amount: 90 },
          { type: 'giveCombatExp', amount: 170, reason: '博台悟棋与银瀑独斩西域双刺客' },
          { type: 'modifyRenown', delta: 25, reason: '华山寒潭独斩西域奇门双刺客晋位真传' },
          { type: 'completeQuest', questId: HUASHAN_Q08_QUEST_ID, outcome: 'completed' },
          toast('已完成《云台残局 · 希夷求变》！晋升真传弟子，获纹银 120 两、门派贡献 90 点！', 'success', '希夷求变'),
        ],
      },
    ],
  },
}
