import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, setStep, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'
import { HUASHAN_Q09_QUEST_ID } from './huashanQiHunyuanGongQuest'

const SPEAKER_FUGU_DAOREN: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐骨道人',
  title: '星宿海叛徒 · 炼尸毒师',
  factionName: '星宿派逆徒',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_XIXIA_CAPTAIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '没藏赤狼',
  title: '西夏黑市死士统领',
  factionName: '西夏死士营',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_XIXIA_PAYMASTER: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名金算',
  title: '西夏鬼市主使掌柜',
  factionName: '西夏一品堂暗桩',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildFuguDaorenNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ09_FUGU_DAOREN',
    name: '腐骨道人',
    title: '星宿毒孽 · 腐尸阴爪',
    realm: '一流下品',
    factionName: '星宿派逆徒',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“嘿嘿嘿！吸了贫道的腐尸磷烟还敢强运内力？等着五脏化成脓水吧！”',
    stats: { hp: 2280, mp: 2050, agi: 57, res: 44 },
    talents: { bone: 66, comprehension: 68, charm: 20 },
    equippedArts: { neigong: 'MA-231', qinggong: 'MA-138', move1: 'MA-065', move2: 'MA-127' },
    learnedArts: [
      { artId: 'MA-231', level: 5 },
      { artId: 'MA-138', level: 4 },
      { artId: 'MA-065', level: 5 },
      { artId: 'MA-127', level: 5 },
    ],
    equipped: { weapon: 'WPN-029' },
    questBadgeLabel: '星宿妖人',
  })
}

function buildXixiaCaptainNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ09_XIXIA_CAPTAIN',
    name: '没藏赤狼',
    title: '西夏死士营 · 弯刀统领',
    realm: '二流上品',
    factionName: '西夏死士营',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“高沧云已经中了腐骨毒砂，把你们师兄弟两个一并剁碎喂火！”',
    stats: { hp: 1780, mp: 1460, agi: 55, res: 40 },
    talents: { bone: 70, comprehension: 54, charm: 30 },
    equippedArts: { neigong: 'MA-245', qinggong: 'MA-246', move1: 'MA-133', move2: 'MA-189' },
    learnedArts: [
      { artId: 'MA-245', level: 4 },
      { artId: 'MA-246', level: 4 },
      { artId: 'MA-133', level: 5 },
      { artId: 'MA-189', level: 5 },
    ],
    equipped: { weapon: 'WPN-043' },
    questBadgeLabel: '死士统领',
  })
}

function buildXixiaPaymasterNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ09_XIXIA_PAYMASTER',
    name: '嵬名金算',
    title: '西夏鬼市主使 · 铁算毒谋',
    realm: '二流上品',
    factionName: '西夏一品堂暗桩',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“好狠心的华山真传，连自家大师兄的死活都不顾也要追来抢密匣？找死！”',
    stats: { hp: 1740, mp: 1520, agi: 56, res: 39 },
    talents: { bone: 64, comprehension: 66, charm: 38 },
    equippedArts: { neigong: 'MA-245', qinggong: 'MA-246', move1: 'MA-133', move2: 'MA-095' },
    learnedArts: [
      { artId: 'MA-245', level: 4 },
      { artId: 'MA-246', level: 5 },
      { artId: 'MA-133', level: 5 },
      { artId: 'MA-095', level: 4 },
    ],
    equipped: { weapon: 'WPN-086' },
    questBadgeLabel: '西夏主使',
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq09_01: {
    id: 'scene_hsq09_01',
    title: '第一幕 · 东峰晨曦',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('{reignYear}破晓时分，东峰紫气迎曦石坪云霞万道，一轮红日自潼关黄河尽头喷薄欲出。玉女剑仙宁清羽手持拂尘立于崖畔，大师兄高沧云早已盘膝候于青石蒲团之上。'),
      S('NPC-0202', '（温和含笑起身拱手）“{gender:师弟|师妹}来得正好！你自晋入气宗真传以来，《希夷剑法》与《华山混元掌》皆已修出气象，宁师叔今日特许传授本门承上启下的地阶内功枢机。”'),
      S('NPC-0166', '“我华山气宗讲究‘气为主、剑为辅’，然未登绝顶紫霞之境前，若一味枯坐静修丹田，临敌时真气运转未免失之迟缓。今日传你的这门功夫，正是先辈别辟蹊径的心血结晶。”'),
    ],
    choices: [
      {
        id: 'hsq09_01_start',
        label: '整衣肃拜，于迎曦石坪盘膝聆听心法真传',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q09_QUEST_ID, stepId: 'terrace_hunyuan' },
          openScene('scene_hsq09_02', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq09_02: {
    id: 'scene_hsq09_02',
    title: '第二幕 · 由外而内',
    subtitle: '东峰紫气迎曦石坪 · 合授混元',
    illustrationUrl: '/assets/quests/hs_q09_hunyuan_neigong.jpg',
    illustrationCaption: '由外而内 · 东峰迎曦石坪宁清羽与高沧云合授地阶混元功',
    mandatory: true,
    beats: [
      N('宁清羽伸出双掌，但见掌缘隐现一层温润如玉的淡紫微光，四周散碎晨露竟被掌心气旋引得悬而不落！'),
      S('NPC-0166', '“天下内功，十之八九皆是由丹田而发、由内而外；唯独我华山地阶中品《混元功》反其道而行，乃是‘由外而内’——先练双掌劳宫穴感应天地劲力，再引劲归入十二正经与奇经八脉！”'),
      S('NPC-0202', '“正因由外而内，修成之后掌即是剑、剑即是掌，非但出招时全无换气凝滞，便是遇上异派阴寒奇毒侵体，亦可凭掌脉混元气劲封窍反震！”'),
      N('宁清羽口述行气真诀，高沧云亲自以混元掌力轻叩你双臂曲池、合谷、劳宫诸穴助你引气入脉，暖流如春江潮水般瞬间贯通周身！'),
    ],
    choices: [
      {
        id: 'hsq09_02_learn',
        label: '凝神引紫气由掌归脉，修习地阶中品《混元功》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-058', level: 1, autoEquip: true },
          toast('已习得地阶中品内功《混元功》！', 'success', '由外而内'),
          openScene('scene_hsq09_03', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq09_03: {
    id: 'scene_hsq09_03',
    title: '第三幕 · 掌剑互通',
    subtitle: '东峰紫气迎曦石坪 · 真气初融',
    mandatory: true,
    beats: [
      N('一炷香后，你收功长身而起，随手按剑一引，但觉掌心真气无需刻意提聚便已透入剑脊，发出一声清越悠长的龙吟。'),
      P('“原来如此！昔日使《华山混元掌》只觉刚猛外放，如今配以《混元功》由外而内回环往复，每一剑递出都能生生不息！”'),
      S('NPC-0166', '“你根基扎实，进境比沧云当年还要快上三分。只是内家真力仍需在生死险境中千锤百炼……”'),
    ],
    choices: [
      {
        id: 'hsq09_03_next',
        label: '话音未落，望向石阶下疾步奔来的执事弟子',
        tone: 'default',
        effects: [openScene('scene_hsq09_04', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_04: {
    id: 'scene_hsq09_04',
    title: '第四幕 · 关中急讯',
    subtitle: '东峰紫气迎曦石坪 · 掌门飞谕',
    mandatory: true,
    beats: [
      N('一名紫霞正殿执事弟子手捧掌门岳沧溟朱笔急谕奔上石坪，神色严峻：三日前京兆府长安西市突现怪症，数名往来秦州边贸的皮货商客全身骨软腐烂暴毙，京兆府仵作验出乃是西域星宿海一脉失传多年的「腐尸磷毒」！'),
      S('NPC-0166', '（秀眉紧蹙）“星宿海远在青海大漠，怎会无端潜入长安西市毒杀边贸胡商？信上还说了什么？”'),
      S('NPC-0202', '（展阅密谕沉声道）“掌门师父查明，行凶者乃是星宿派弃徒‘腐骨道人’，此獠已被西夏一品堂黑市重金收买，企图在长安丝路起点散布瘟毒、断绝秦州军马皮甲货源！”'),
    ],
    choices: [
      {
        id: 'hsq09_04_next',
        label: '慨然按剑上前，与大师兄高沧云一齐请战',
        tone: 'primary',
        effects: [openScene('scene_hsq09_05', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_05: {
    id: 'scene_hsq09_05',
    title: '第五幕 · 双剑下山',
    subtitle: '东峰紫气迎曦石坪 · 奉命西征',
    mandatory: true,
    beats: [
      S('NPC-0166', '“掌门既指名命沧云携你同往，便是要借《混元功》不惧外毒侵肌之奇效，一举拔除西市毒源！切记星宿妖人诡计多端，师兄弟二人务须同进同退，万不可贪功冒进！”'),
      S('NPC-0202', '“宁师叔放心！有我在前遮护，绝不教{gender:师弟|师妹}折损半根毫毛。{gender:师弟|师妹}，备马，我们即刻西赴京兆府！”'),
    ],
    choices: [
      {
        id: 'hsq09_05_depart',
        label: '与高沧云并骑下西岳，直奔京兆府西市胡商坊',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q09_QUEST_ID, 'changan_ghost_bazaar'),
          toast('请前往【京兆府 > 西市胡商坊 > 番坊正市 · 奇货堂】与高沧云暗查鬼市毒源！', 'talk', '双剑入秦'),
        ],
      },
    ],
  },

  scene_hsq09_06: {
    id: 'scene_hsq09_06',
    title: '第六幕 · 长安暮色',
    subtitle: '京兆府 · 西市胡商坊 > 番坊正市 · 奇货堂',
    mandatory: true,
    beats: [
      N('暮色笼罩古都长安，昔日商旅摩肩接踵的西市番坊正市如今人心惶惶，不少波斯与回鹘商铺早早落了木板门闩，空气里隐约浮动着一股甜腻中透着腐臭的怪味。'),
      S('NPC-0202', '“{gender:师弟|师妹}以混元功闭住外呼吸。你看街角那几株枯萎的槐树——树皮发黑渗绿，定是夜半有人用骡车运送腐毒原料经过此处！”'),
      P('“大师兄好眼力！车辙印一路向西北暗巷延伸，正是传闻中三更方开的西市‘鬼市’地界。”'),
    ],
    choices: [
      {
        id: 'hsq09_06_next',
        label: '乔装夜行客，随高沧云潜入西市鬼市暗街',
        tone: 'primary',
        effects: [openScene('scene_hsq09_07', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_07: {
    id: 'scene_hsq09_07',
    title: '第七幕 · 鬼市暗哨',
    subtitle: '西市鬼市 · 绿灯迷巷',
    mandatory: true,
    beats: [
      N('入夜二更，番坊后巷挂起一盏盏惨绿纸灯，销赃匿迹的鬼市悄然开张。几名眼神鸷悍、腰胯党项冷月弯刀的汉子守在巷尾一座废弃官营染坊门外，严密盘查所有靠近之人。'),
      S('NPC-0202', '“染坊里有大型石槽与地窖，最适合熬炼大宗尸毒。待我引开正面两名暗哨，我们去侧巷截住那个挑水瓮的脚夫问个究竟！”'),
    ],
    choices: [
      {
        id: 'hsq09_07_next',
        label: '依计绕入侧巷，出手制住搬运黑瓮的西夏探子',
        tone: 'primary',
        effects: [openScene('scene_hsq09_08', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_08: {
    id: 'scene_hsq09_08',
    title: '第八幕 · 顺藤摸瓜',
    subtitle: '染坊侧巷 · 审讯探子',
    mandatory: true,
    beats: [
      N('你指风轻点那探子哑穴，揭开泥封瓦瓮一瞧，里面竟是密密麻麻浸泡在火油毒液中的西域腐尸毒虫！在高沧云剑锋逼视下，探子吓得面无人色，连连比划招供。'),
      S('NPC-0202', '（神色骤凛）“不好！腐骨道人与西夏鬼市主使嵬名金算今夜三更便要将十瓮剧毒倾入长安西市水井！事不宜迟，来不及调集京兆府兵马了，我们今夜必须直接动手！”'),
    ],
    choices: [
      {
        id: 'hsq09_08_raid',
        label: '打晕探子焚毁毒瓮，与高沧云夜袭废弃染坊！',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q09_QUEST_ID, 'courtyard_ambush'),
          openScene('scene_hsq09_09', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq09_09: {
    id: 'scene_hsq09_09',
    title: '第九幕 · 夜叩废宅',
    subtitle: '西市北隅 · 废弃染坊中庭',
    mandatory: true,
    beats: [
      N('三更阴风惨惨，你与高沧云翻越斑驳高墙落入染坊中庭。硕大的院落内竟空无一人，只有八口石染缸里翻滚着墨绿色的浓稠毒烟。'),
      P('“大师兄小心！地上青砖浸满了西域猛火油，是个死局诱饵！”'),
    ],
    choices: [
      {
        id: 'hsq09_09_trap',
        label: '急挥长剑格挡屋脊射来的火箭毒网！',
        tone: 'danger',
        effects: [openScene('scene_hsq09_10', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_10: {
    id: 'scene_hsq09_10',
    title: '第十幕 · 西市毒网',
    subtitle: '废弃染坊 · 火油重围',
    illustrationUrl: '/assets/quests/hs_q09_xishi_firetrap.jpg',
    illustrationCaption: '西市毒网 · 夜探长安鬼市废宅，双剑陷入星宿火油毒阵重围',
    mandatory: true,
    beats: [
      N('轰——！数十支硫磺火箭自四面屋脊齐射而下，满院猛火油瞬间化作三丈高的火墙！火光之中，三张涂满绿磷尸毒的倒刺铁丝网兜头罩落！'),
      N('千钧一发之际，暗处忽有一蓬细如牛毛的腐尸毒砂直射你后心死穴！高沧云脸色大变，奋不顾身飞扑过来一把将你推开，自己左肩却结结实实擦中毒砂，鲜血霎时由红转黑！'),
      S('NPC-0202', '（单膝跪地，强提紫霞混元气封住左肩心脉）“咳……别管我！这妖道早就料到有人截瓮！”'),
    ],
    choices: [
      {
        id: 'hsq09_10_next',
        label: '一把扶住高沧云，横剑怒视火光中走出的妖道',
        tone: 'danger',
        effects: [openScene('scene_hsq09_11', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_11: {
    id: 'scene_hsq09_11',
    title: '第十一幕 · 腐骨妖道',
    subtitle: '火海染坊 · 毒魔现身',
    mandatory: true,
    beats: [
      S(SPEAKER_FUGU_DAOREN, '“桀桀桀！华山派的大师兄倒是重情重义，可惜中了贫道加了冰蚕腐液的‘腐骨透脉砂’，半个时辰内不动武尚可苟活，一旦强提真气立时心脉腐穿而亡！”'),
      S(SPEAKER_XIXIA_PAYMASTER, '（在后堂廊下抱起紫铜毒方密匣冷笑）“道长只管宰了这两个华山多事鬼，某先带密匣与尾银撤回夏州，没藏统领留下来助你收尸！”'),
      N('烈火炙烤之下，腐尸绿烟愈发浓烈刺鼻。高沧云左肩乌黑蔓延已无法出剑，全院杀机尽数压在你一人肩上！'),
    ],
    choices: [
      {
        id: 'hsq09_11_next',
        label: '护在高沧云身前，全力逆催《混元功》由外而内行气！',
        tone: 'danger',
        effects: [openScene('scene_hsq09_12', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_12: {
    id: 'scene_hsq09_12',
    title: '第十二幕 · 混元返震',
    subtitle: '火海染坊 · 引毒破魔',
    illustrationUrl: '/assets/quests/hs_q09_rebound_poison.jpg',
    illustrationCaption: '混元返震 · 催动混元真气引毒反震，正面击毙星宿腐骨道人',
    mandatory: true,
    beats: [
      N('腐骨道人怪啸扑上，双爪戴着淬满尸毒的乌金鬼爪套直抓你天灵盖！他料定名门正派内功由丹田外发时毛孔必张，毒气一触即溃。'),
      N('殊不知你所修《混元功》恰是由外而内！双掌劳宫穴气旋骤转，非但不让毒煞侵入心脉半分，反而将扑面而来的腐尸磷烟尽数裹在掌剑气膜之外，挟着浑厚混元真劲反轰回去！'),
      S(SPEAKER_FUGU_DAOREN, '“什么？！这怎么可能——你不怕我的抽髓腐毒？！”'),
    ],
    choices: [
      {
        id: 'hsq09_12_fight',
        label: '掌剑混元引毒反震，正面诛杀星宿腐骨道人！（死战妖道）',
        subLabel: '生死决战 · 腐骨道人（一流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildFuguDaorenNpc() },
            rule: 'duel',
            forbidEscapeReason: '重伤的大师兄高沧云就在身后，绝不可弃之不顾临阵脱逃！',
            deathTitle: '葬身西市毒火',
            deathDetail: '你在长安西市废宅火油毒阵中不敌星宿腐骨道人，与同门共殒毒焰之中。',
            onWin: [openScene('scene_hsq09_13', HUASHAN_Q09_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq09_13: {
    id: 'scene_hsq09_13',
    title: '第十三幕 · 妖道毙命',
    subtitle: '火海染坊 · 恶贯满盈',
    mandatory: true,
    beats: [
      N('轰然一声巨震！你的左掌混元气劲震碎腐骨道人护体毒罡，反震回去的腐尸磷毒瞬间倒灌入他自己七窍，右手青锋同时一剑贯胸！'),
      N('这名为祸关中的星宿毒孽发出一声凄厉惨嚎，栽入滚烫的石染缸中毙命，院中失控的腐毒瓦瓮亦被剑气悉数劈碎焚净！'),
    ],
    choices: [
      {
        id: 'hsq09_13_next',
        label: '猛回头查看重伤的高沧云与后门动静',
        tone: 'primary',
        effects: [openScene('scene_hsq09_14', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_14: {
    id: 'scene_hsq09_14',
    title: '第十四幕 · 突围抉择',
    subtitle: '火海染坊 · 一念公私',
    mandatory: true,
    beats: [
      N('就在腐骨道人毙命的同一刹那，西夏鬼市主使嵬名金算大骇之下抱紧紫铜密匣冲出染坊后门落荒而逃；而死士统领没藏赤狼却率领十余名西夏死士挥舞弯刀，疯狂扑向半跪于火海边、已然无力再战的高沧云！'),
      S('NPC-0202', '（嘴角溢着黑血急喝）“{gender:师弟|师妹}，那密匣里有西夏一品堂在关中的暗桩账册，记头等大功……咳咳，我还能撑片刻……”'),
      N('烈焰梁柱摇摇欲坠！若留下来死战断后护高沧云突围，嵬名金算必携头功密匣远遁；若此刻抛下替你挡毒重伤的大师兄独追首恶抢功，高沧云势必在死士乱刀下九死一生！'),
    ],
    choices: [
      {
        id: 'hsq09_14_protect_gao',
        label: '【死战断后、护高沧云突围】同门性命重于泰山，岂能为争功弃兄不顾！',
        subLabel: '重义护兄线 · 迎战西夏死士统领断后救人',
        tone: 'gold',
        effects: [openScene('scene_hsq09_15', HUASHAN_Q09_QUEST_ID)],
      },
      {
        id: 'hsq09_14_chase_merit',
        label: '【弃置师兄、独追首恶抢功】大事不拘小节，先追斩西夏主使夺取头功密匣！',
        subLabel: '孤身抢功线 · 任高沧云独抗死士，追杀嵬名金算',
        tone: 'danger',
        effects: [openScene('scene_hsq09_20', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  // ── 分支 A（15..19）：死战断后、护高沧云突围 ──
  scene_hsq09_15: {
    id: 'scene_hsq09_15',
    title: '第十五幕 · 横剑护兄',
    subtitle: '火海染坊 · 浴血断后',
    mandatory: true,
    beats: [
      P('“什么头等大功，比得过替我挡毒的大师兄一条命？！高师兄抓紧我后背——要死一起死，要活一起回华山！”'),
      N('你连看都不看后门逃走的嵬名金算一眼，一把撕下布带将高沧云缚在背上，左手揽护师兄，右手单剑横挡十余名西夏死士的凛冽弯刀！'),
      S(SPEAKER_XIXIA_CAPTAIN, '“背着个废人还想突围？给老子乱刀分尸！”'),
    ],
    choices: [
      {
        id: 'hsq09_15_fight',
        label: '背负同门一步不退，单剑决战死士统领没藏赤狼！',
        subLabel: '生死决战 · 没藏赤狼（二流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaCaptainNpc() },
            rule: 'duel',
            forbidEscapeReason: '背上便是重伤中毒的高沧云，唯有杀穿重围方有一线生机！',
            deathTitle: '同门共殉西市',
            deathDetail: '你背负重伤的高沧云浴血断后，终因寡不敌众力战殉身于火海之中。',
            onWin: [openScene('scene_hsq09_16', HUASHAN_Q09_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq09_16: {
    id: 'scene_hsq09_16',
    title: '第十六幕 · 浴血杀出',
    subtitle: '西市暗巷 · 混元逼毒',
    mandatory: true,
    beats: [
      N('混元真气激发至极限，你一剑劈断没藏赤狼手中党项弯刀，剑锋顺势抹过其颈项！随后一肩撞碎燃烧的木窗，背着昏迷的高沧云冲出轰然坍塌的火海染坊！'),
      N('奔至安全客舍后，你不顾自身真气透支，双掌抵住高沧云后背至阳穴，整整运转三个周天的《混元功》，终于将他左肩淤积的乌黑毒血尽数逼出体外！'),
    ],
    choices: [
      {
        id: 'hsq09_16_next',
        label: '擦去额角汗水，守候大师兄苏醒',
        tone: 'primary',
        effects: [openScene('scene_hsq09_17', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_17: {
    id: 'scene_hsq09_17',
    title: '第十七幕 · 生死同门',
    subtitle: '长安驿舍 · 患难见心',
    mandatory: true,
    beats: [
      N('五更时分，高沧云悠悠转醒。见你双掌因吸拔腐毒而微微红肿、衣衫尽被火炭烧穿，这位素来沉稳持重的华山大师兄眼眶顿时通红，紧紧握住你的手腕。'),
      S('NPC-0202', '“{gender:师弟|师妹}……你为了救我，竟放跑了唾手可得的首功密匣，还险些耗损自身混元本源！高某此生，得你这般生死相托的同门，夫复何求！”'),
      P('“西市毒源已彻底焚毁，长安百姓无虞便够了。大师兄伤势初稳，我们这便回东峰向宁师叔复命！”'),
    ],
    choices: [
      {
        id: 'hsq09_17_return',
        label: '搀扶高沧云东返华山玉女峰东峰迎曦石坪',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q09_QUEST_ID, 'return_ally'),
          toast('已护送高沧云脱险逼毒！请返回【玉女峰紫霞道观 > 东峰紫气迎曦石坪】复命！', 'success', '生死同门'),
        ],
      },
    ],
  },

  scene_hsq09_18: {
    id: 'scene_hsq09_18',
    title: '第十八幕 · 紫霞复命',
    subtitle: '东峰紫气迎曦石坪 · 仁勇双全',
    mandatory: true,
    beats: [
      N('重返东峰紫气迎曦石坪，宁清羽听高沧云细述染坊火海你弃功救兄、混元反震诛杀腐骨道人之壮举，清冷眼眸中满是欣慰与暖意。'),
      S('NPC-0166', '“好！好一个‘同门性命重于泰山’！昔年华山剑气内讧，正是坏在同室操戈、争功夺位四字之上。你今日守住了《混元功》的正气，更守住了我华山一脉最珍贵的人心！”'),
    ],
    choices: [
      {
        id: 'hsq09_18_next',
        label: '看向郑重走上前来解开外袍系带的高沧云',
        tone: 'gold',
        effects: [openScene('scene_hsq09_19', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_19: {
    id: 'scene_hsq09_19',
    title: '第十九幕 · 解衣推诚',
    subtitle: '东峰紫气迎曦石坪 · 赠紫霞衫',
    mandatory: true,
    beats: [
      N('高沧云眼含热泪，当着宁清羽与众同门之面，亲手解下自己贴身珍藏、由天山冰蚕丝混紫霞真丝织就的地阶宝衣——【华山紫霞剑客衫】，双手捧至你面前！'),
      S('NPC-0202', '“这件【华山紫霞剑客衫】本是师父赐予首座弟子的护身宝衣，水火难侵、刀剑难伤。你的旧衫已在长安火海里为护我而毁，今日师兄亲手将它赠予你——往后风雨江湖，高沧云永远站在你身侧！”'),
    ],
    choices: [
      {
        id: 'hsq09_19_accept',
        label: '动容拜受大师兄所赠【华山紫霞剑客衫】，披衫迎向东峰朝霞',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ARM-015', qty: 1 },
          { type: 'setFlag', flag: 'hs_gao_ally', value: true },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 25 },
          { type: 'modifyChivalry', delta: 15, reason: '西市火海弃功断后死护同门高沧云' },
          toast('获高沧云解衣相赠地阶宝衣【华山紫霞剑客衫】！高沧云好感大幅提升！', 'success', '解衣推诚'),
          openScene('scene_hsq09_25', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  // ── 分支 B（20..24）：弃置师兄、独追首恶抢功 ──
  scene_hsq09_20: {
    id: 'scene_hsq09_20',
    title: '第二十幕 · 弃兄追魁',
    subtitle: '染坊后巷 · 孤剑追杀',
    mandatory: true,
    beats: [
      N('你眼神一冷，心念电转：高沧云既有紫霞内功护体未必便死，可西夏主使手里的暗桩密匣一旦逃脱，这份震动西岳的首功便飞了！'),
      N('你不顾身后火海中传来高沧云闷哼苦战弯刀的碰撞声，纵身跃过后院矮墙，几个起落便于鬼市尽头截住了抱匣狂奔的嵬名金算！'),
      S(SPEAKER_XIXIA_PAYMASTER, '“连替你挡毒的亲师兄都舍得丢在火坑里？好个冷血求功的华山高徒！”'),
    ],
    choices: [
      {
        id: 'hsq09_20_fight',
        label: '冷面不答，催动混元掌剑截杀嵬名金算夺匣！',
        subLabel: '生死决战 · 嵬名金算（二流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaPaymasterNpc() },
            rule: 'duel',
            forbidEscapeReason: '既已弃兄追功至此，绝不容首恶携匣走脱！',
            deathTitle: '贪功殒命暗巷',
            deathDetail: '你孤身追击西夏主使嵬名金算，中其铁算奇门暗器毒发身亡。',
            onWin: [openScene('scene_hsq09_21', HUASHAN_Q09_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq09_21: {
    id: 'scene_hsq09_21',
    title: '第二十一幕 · 夺匣枭首',
    subtitle: '西市荒巷 · 血染重伤',
    mandatory: true,
    beats: [
      N('你一剑刺穿嵬名金算咽喉，探手夺下那只沉甸甸的紫铜密匣与百余两黑市纹银。待你提匣折返染坊废墟时，京兆府巡城兵马刚刚赶到救火。'),
      N('断壁残垣旁，高沧云浑身浴血斜倚在石柱上，左肋与右腿又添了三道深可见骨的弯刀血口——他竟是凭着一股求生狠劲硬生生杀退死士爬出来的。见你手捧完好无损的功劳密匣归来，他眼神一点点冷了下去。'),
    ],
    choices: [
      {
        id: 'hsq09_21_next',
        label: '上前欲扶高沧云，却被他默然拂开手掌',
        tone: 'default',
        effects: [openScene('scene_hsq09_22', HUASHAN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_hsq09_22: {
    id: 'scene_hsq09_22',
    title: '第二十二幕 · 归途无言',
    subtitle: '渭南官道 · 冷月独行',
    mandatory: true,
    beats: [
      S('NPC-0202', '（声音沙哑如冰，自行敷上金疮药）“不必劳烦{gender:师弟|师妹}了。你既斩了腐骨道人与嵬名金算、夺得一品堂暗桩密匣，此行头功非你莫属。回山去紫霞正殿领赏便是。”'),
      N('东返华山的一百八十里官道上，高沧云纵马行在前头十丈之外，自始至终未再回头与你说过半句话。'),
    ],
    choices: [
      {
        id: 'hsq09_22_return',
        label: '携紫铜密匣返回华山玉女峰紫霞正气主殿复命',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q09_QUEST_ID, 'return_estranged'),
          toast('已夺取西夏暗桩密匣！请返回【玉女峰紫霞道观 > 紫霞正气主殿】面见掌门复命！', 'talk', '独携首功'),
        ],
      },
    ],
  },

  scene_hsq09_23: {
    id: 'scene_hsq09_23',
    title: '第二十三幕 · 正殿论功',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('紫霞正气主殿内香烟袅袅。掌门「紫霞神剑」岳沧溟端坐主位，翻阅你呈上的西夏一品堂关中暗桩密匣，面上露出几分嘉许之色。'),
      S('NPC-0118', '“除灭星宿腐骨道人，又截获西夏暗桩名录，确是大功一件。本座治派赏罚分明，既有头功，这件内库珍藏的地阶宝衣【华山紫霞剑客衫】，便按门规赐予你披挂！”'),
    ],
    choices: [
      {
        id: 'hsq09_23_award',
        label: '躬身领受掌门岳沧溟按功赐下的【华山紫霞剑客衫】',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ARM-015', qty: 1 },
          toast('获掌门岳沧溟按功赐予地阶宝衣【华山紫霞剑客衫】！', 'success', '正殿受赏'),
          openScene('scene_hsq09_24', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_hsq09_24: {
    id: 'scene_hsq09_24',
    title: '第二十四幕 · 同门生隙',
    subtitle: '紫霞正气主殿外 · 孤影负伤',
    mandatory: true,
    beats: [
      N('殿侧的宁清羽看着裹满渗血绷带、脸色苍白的高沧云，欲言又止地轻叹一声。高沧云只朝岳沧溟拱手一礼，连一眼都未看你手中簇新的紫霞宝衫，捂着左肩创口孤身退殿而去，背影萧索而寒凉。'),
      S('NPC-0118', '（深深看了你一眼，语声淡漠难测）“成大事者固然果决，只是水至清则无鱼、人至察则无徒。去东峰石坪试一试新衫吧。”'),
    ],
    choices: [
      {
        id: 'hsq09_24_estranged',
        label: '默然捧着宝衫步出正殿，走向东峰霞光之中',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'hs_gao_estranged', value: true },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: -15 },
          openScene('scene_hsq09_25', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  // ── 终幕（第 25 幕）：紫衫荣光（双线收束） ──
  scene_hsq09_25: {
    id: 'scene_hsq09_25',
    title: '第二十五幕 · 紫衫荣光',
    subtitle: '东峰紫气迎曦石坪 · 混元大成',
    illustrationUrl: '/assets/quests/hs_q09_zixia_robe.jpg',
    illustrationCaption: '紫衫荣光 · 东峰霞光中获授地阶宝衣华山紫霞剑客衫',
    mandatory: true,
    beats: [
      N('漫天朝霞再度铺满东峰紫气迎曦石坪。你换上地阶宝衣【华山紫霞剑客衫】，紫金云纹在晨光中流转生辉，与体内奔涌不息的《混元功》真气交相呼应。'),
      N('经长安西市火海毒阵一番生死淬炼，由外而内、掌剑混元之理已彻底融会贯通；而这一战结下的同门因果，亦将在日后华山更大的风波中回响不绝。'),
    ],
    choices: [
      {
        id: 'hsq09_25_finish',
        label: '振衣按剑迎向万里紫气，继续精修《混元功》以图上境',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-058', amount: 300 },
          { type: 'giveSilver', amount: 150, reason: '清剿长安西市腐毒及西夏黑市赃银' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'giveCombatExp', amount: 210, reason: '混元返震击毙星宿腐骨道人' },
          { type: 'modifyRenown', delta: 28, reason: '长安西市破毒阵诛杀星宿妖人名震关中' },
          {
            type: 'branch',
            condition: flag('hs_gao_ally', 'truthy'),
            thenEffects: [
              { type: 'completeQuest', questId: HUASHAN_Q09_QUEST_ID, outcome: 'ally' },
            ],
            elseEffects: [
              { type: 'completeQuest', questId: HUASHAN_Q09_QUEST_ID, outcome: 'estranged' },
            ],
          },
          toast('已完成《东峰迎曦 · 由外而内》！获【华山紫霞剑客衫】、纹银 150 两、门派贡献 100 点！', 'success', '紫衫荣光'),
        ],
      },
    ],
  },
}
