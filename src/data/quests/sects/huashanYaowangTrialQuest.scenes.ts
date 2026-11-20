import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q01_QUEST_ID } from './huashanYaowangTrialQuest'
import { HUASHAN_STARTER_KIT_EFFECTS } from './sectStarterKits'

const SPEAKER_ACOLYTE: StorySpeakerSpec = {
  kind: 'custom',
  name: '清茗小道童',
  title: '玉女峰采药道童',
  factionName: '华山派',
  portraitUrl: '/assets/characters/templates/tpl_child_boy_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_child_boy_av.jpg',
}

const SPEAKER_YAOWANG_KEEPER: StorySpeakerSpec = {
  kind: 'custom',
  name: '松鹤老庙祝',
  title: '华阴药王古庙庙祝',
  factionName: '华阴乡耆',
  portraitUrl: '/assets/characters/templates/tpl_taoist_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_taoist_master_av.jpg',
}

const SPEAKER_THUG_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '疤面刘六',
  title: '苍狼帮看门恶奴',
  factionName: '关中恶匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_ZHOU_HENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '周横',
  title: '铁背苍狼 · 悍匪头目',
  factionName: '关中恶匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

function buildYaowangThug1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ01_THUG_1',
    name: '疤面刘六',
    title: '药王庙霸门恶汉',
    realm: '不入流',
    factionName: '关中恶匪',
    sectRank: 0,
    sectRankLabel: '恶匪喽啰',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“华山派的小毛孩也敢下山管爷爷们收药税？剁了他！”',
    stats: { hp: 310, mp: 120, agi: 18, res: 11 },
    talents: { bone: 42, comprehension: 30, charm: 22 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189', move2: 'MA-186' },
    learnedArts: [{ artId: 'MA-238', level: 2 }, { artId: 'MA-189', level: 2 }, { artId: 'MA-186', level: 2 }],
  })
}

function buildYaowangThug2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ01_THUG_2',
    name: '恶虎刀丁四',
    title: '药王庙劫药刀徒',
    realm: '三流下品',
    factionName: '关中恶匪',
    sectRank: 0,
    sectRankLabel: '恶匪刀手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“刘六哥，并肩子上，把这华山剑童手里的青钢剑抢来换酒喝！”',
    stats: { hp: 380, mp: 145, agi: 20, res: 13 },
    talents: { bone: 46, comprehension: 32, charm: 24 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-209', move2: 'MA-189' },
    learnedArts: [{ artId: 'MA-238', level: 2 }, { artId: 'MA-209', level: 3 }, { artId: 'MA-189', level: 2 }],
  })
}

function buildZhouHengBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ01_ZHOU_HENG',
    name: '周横',
    title: '铁背苍狼 · 悍匪头目',
    realm: '三流中品',
    factionName: '关中恶匪',
    sectRank: 0,
    sectRankLabel: '恶匪首领',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“老子一柄厚背砍山刀劈翻过八家镖局趟子手！区区华山入门十二式，给爷挠痒都不够！”',
    stats: { hp: 650, mp: 320, agi: 31, res: 18 },
    talents: { bone: 58, comprehension: 42, charm: 30 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 4 }, { artId: 'MA-189', level: 3 }, { artId: 'MA-209', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq01_01: {
    id: 'scene_hsq01_01',
    title: '第一幕 · 清泉晨课',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('{reignYear}山岚初散，玉女峰洗头盆清泉演剑院内松影婆娑。自你拜入西岳华山门墙倏忽已满一月，每日五更闻钟而起，将《华山基础心法》与《华山剑法（入门十二式）》磨砺得愈发纯熟。'),
      N('你一式「白云出岫」收剑归鞘，吐出一口悠长白气。廊前负手观剑的大师兄「紫霞首徒」高沧云缓步走近，温言颔首。'),
      S('NPC-0202', '“好一个守正不阿的收势！{gender:师弟|师妹}入山虽才满月，但这十二式起承转合间已无初学者的浮躁虚火，桩功下盘尤为扎实。”'),
      P('“全赖大师兄与宁师叔日日督导指点。只是弟子每演至『白虹贯日』与『金雁横空』衔接处，总觉真气流转尚缺几分临敌真意。”'),
    ],
    onFinishEffects: [openScene('scene_hsq01_02', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_02: {
    id: 'scene_hsq01_02',
    title: '第二幕 · 药童泣报',
    subtitle: '洗头盆清泉演剑院外石阶',
    mandatory: true,
    beats: [
      N('高沧云正欲为你拆解剑诀关窍，院门外忽传来跌跌撞撞的脚步声。负责下山采买灵草的清茗小道童额角带血、道袍撕裂，扑入演剑院中跪倒在地！'),
      S(SPEAKER_ACOLYTE, '“高师兄！宁师叔！大事不好了！山下华阴县的药王古庙……昨夜被一伙自称『苍狼帮』的关中恶匪强占了！”'),
      N('「玉女剑仙」宁清羽闻声自偏殿疾步而出，扶起小道童渡去一缕温和内息护住其心脉，柳眉微蹙。'),
      S('NPC-0166', '“清茗莫急，慢慢说。药王古庙历来供奉孙思邈真人，周边药农与我华山派世代交好，何人敢在西岳山脚下撒野？”'),
      S(SPEAKER_ACOLYTE, '“匪首名叫『铁背苍狼』周横，带着十几个刀手砸了药炉，把本门订好的秦岭黄精、七叶灵芝尽数抢走，还把松鹤老庙祝和两名采药师兄关在丹房里毒打勒索赎银！”'),
    ],
    onFinishEffects: [openScene('scene_hsq01_03', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_03: {
    id: 'scene_hsq01_03',
    title: '第三幕 · 玉女授命',
    subtitle: '洗头盆清泉演剑院',
    illustrationUrl: '/assets/quests/hs_q01_yaowang_depart.jpg',
    illustrationCaption: '玉女授命 · 高沧云与宁清羽于偏院命外门弟子持剑下山除恶',
    mandatory: true,
    beats: [
      N('听闻恶匪欺凌乡邻、扣押同门道童，你握紧腰间青钢长剑，主动上前一步抱拳请命。'),
      P('“宁师叔、大师兄！弟子方才正叹演武院中难悟临敌真意，愿即刻持剑下山，赴华阴药王古庙铲除恶匪、救回老庙祝与两位道童！”'),
      S('NPC-0166', '（与高沧云对视一眼，颔首赞许）“那『铁背苍狼』周横不过是秦岭北麓流窜的三流悍匪，仗着一身横练筋骨与厚背砍山刀逞凶。派你前往历练，倒是一块极好的试剑石。”'),
      S('NPC-0202', '“{gender:师弟|师妹}切记，周横刀沉力猛，切莫与他硬拼蛮力。只需将我华山入门十二式的『奇正相生、守中伺隙』发挥出来，便足可制胜。速去速回，我与师叔在此候你佳音！”'),
    ],
    choices: [
      {
        id: 'hsq01_accept_order',
        label: '拱手领命，提剑疾下华山北麓驰援药王古庙',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q01_QUEST_ID, stepId: 'descend_yaowang' },
          setStep(HUASHAN_Q01_QUEST_ID, 'descend_yaowang'),
          toast('已领受师门初试！请前往【潼关天险瓮城 · 潼关镇河主城楼与瓮城】驰援华阴药王古庙！', 'talk', '玉女授命'),
        ],
      },
    ],
  },

  scene_hsq01_04: {
    id: 'scene_hsq01_04',
    title: '第四幕 · 北麓药香',
    subtitle: '华山北麓 · 华阴药王古庙外',
    mandatory: true,
    beats: [
      N('你施展提纵轻功顺华山北麓石道疾行而下，不多时便望见掩映在汉唐古柏林间的华阴药王古庙。'),
      N('往日香火鼎盛、药香四溢的庙前广场此刻一片狼藉，晒药竹匾被踩得粉碎，苦涩药汁混着泥水横流，几名华阴当地老药农躲在远方土坡后惊惶张望。'),
      P('（按剑敛息，借古柏浓荫掩护欺近山门，耳听得院内传来狂放哄笑与皮鞭抽击木柱之声。）'),
    ],
    onFinishEffects: [openScene('scene_hsq01_05', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_05: {
    id: 'scene_hsq01_05',
    title: '第五幕 · 恶奴拦门',
    subtitle: '华阴药王古庙 · 山门石阶',
    mandatory: true,
    beats: [
      N('庙门青石阶前，疤面刘六与恶虎刀丁四正翘脚坐在倾倒的铜药鼎上喝酒，脚边捆着一名嘴角渗血的华山外门小药童。'),
      S(SPEAKER_THUG_LEADER, '“呸！什么狗屁西岳华山派，周大当家把他们药篓子全端了半个时辰，山上那群牛鼻子剑客还不是缩在云里当乌龟！”'),
      P('（缓步踏上石阶，青钢长剑铮然出鞘半寸，寒光映冷双眸）“谁说华山无人？放开我派道童，束手受缚，免得血污了药王真人清净宝地！”'),
      S(SPEAKER_THUG_LEADER, '（霍然跳起拔出朴刀，狞笑招呼同伴）“哟呵，竟自己送上门来一个外门雏儿！丁四，并肩子上，剁了这小子向周大当家领赏！”'),
    ],
    onFinishEffects: [openScene('scene_hsq01_06', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_06: {
    id: 'scene_hsq01_06',
    title: '第六幕 · 初试青锋',
    subtitle: '药王古庙山门（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('两名恶匪一左一右挥刀猛扑而来，刀风腥恶，专往咽喉与肋下招呼！你凝神运气，摆开《华山剑法（入门十二式）》起手剑架！'),
    ],
    choices: [
      {
        id: 'hsq01_fight_thugs',
        label: '运剑迎敌，扫清霸门恶匪！（车轮连战 实战）',
        subLabel: '迎战疤面刘六与恶虎刀丁四',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_Q01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYaowangThug2() },
            extraOpponents: [{ kind: 'custom', npc: buildYaowangThug1() }],
            rule: 'story_trial',
            forbidEscapeReason: '小药童尚在贼手，华山剑客岂能临阵退缩！',
            introText: '【车轮连战 · 山门初锋】以华山入门十二式迎战药王庙霸门恶汉【恶虎刀丁四】与【疤面刘六】！',
            onWin: [openScene('scene_hsq01_07', HUASHAN_Q01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('山门石阶湿滑失利，暂退古柏下调匀内息后再战！', 'warn', '药王初试'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq01_07: {
    id: 'scene_hsq01_07',
    title: '第七幕 · 苍狼出殿',
    subtitle: '药王古庙前院古柏下',
    mandatory: true,
    beats: [
      N('你剑走轻灵，一式「苍松迎客」引偏丁四朴刀，顺势剑柄反撞刘六胸口，三两下便将两名恶奴打翻在石阶下哀嚎滚爬，挥剑割断小药童身上麻绳。'),
      N('“轰”的一声巨响！药王正殿两扇朱漆木门被人从内一脚踹飞，木屑纷飞间，一名身高八尺、身披苍狼皮坎肩的凶悍壮汉拖着一柄沉重厚背砍山刀大步踏出！'),
      S(SPEAKER_ZHOU_HENG, '（铜铃怪眼上下打量你身上华山外门服色，仰天狞笑）“我还当是高沧云或封不弃那老小子亲自下山，原来只派了个乳臭未干的外门弟子！怎么，想拿那套死板老套的入门十二式跟爷爷过招？”'),
      P('“对付你这欺压良善、强抢药农的山野狂徒，我华山入门十二式便已绰绰有余！”'),
    ],
    onFinishEffects: [openScene('scene_hsq01_08', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_08: {
    id: 'scene_hsq01_08',
    title: '第八幕 · 古柏争锋',
    subtitle: '药王古庙千年古柏石阶',
    illustrationUrl: '/assets/quests/hs_q01_cypress_duel.jpg',
    illustrationCaption: '药王初锋 · 古柏石阶下入门十二式力挫铁背苍狼周横',
    mandatory: true,
    beats: [
      N('「铁背苍狼」周横暴喝一声，脚踏青砖裂开数道细纹，厚背砍山刀挟着千钧恶风当头劈落！古柏落叶被刀风激得漫天狂卷！'),
      N('你谨记高沧云临行叮嘱——不与横练悍匪硬拼蛮力，丹田《华山基础心法》徐徐流转，剑尖斜指，严守门户伺机破敌！'),
    ],
    choices: [
      {
        id: 'hsq01_fight_zhouheng',
        label: '施展入门十二式，正面迎战「铁背苍狼」周横！（三流中品）',
        subLabel: '师门初试首领战：守中伺隙破其狂刀',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhouHengBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '丹房内老庙祝与道童性命攸关，绝不可退！',
            introText: '【1v1 药王初锋】于千年古柏石阶下迎战三流中品悍匪头目【铁背苍狼 · 周横】！',
            onWin: [openScene('scene_hsq01_09', HUASHAN_Q01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('周横厚背刀势沉猛，切勿硬拼，稳住呼吸再战！', 'warn', '药王除恶'),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq01_09: {
    id: 'scene_hsq01_09',
    title: '第九幕 · 剑破铁背',
    subtitle: '药王古庙丹房前',
    mandatory: true,
    beats: [
      N('十余合激斗下来，周横连劈十数记重刀皆被你以「有凤来仪」「金雁横空」卸入空处，额头青筋暴起、呼吸渐粗。'),
      N('待他一招「力劈华山」砍入青石阶寸许、旧力方尽新力未生之刹那，你眼中精光暴涨，一式千锤百炼的「白虹贯日」直刺其右腕「神门穴」！'),
      S(SPEAKER_ZHOU_HENG, '（右腕鲜血迸溅，厚背砍山刀“哐当”坠地，整个人被你一脚踹翻在香炉边惨叫求饶）“哎哟！女娲娘娘饶命、华山少侠饶命！周某有眼无珠，再也不敢踏进华阴地界半步了！”'),
      N('余匪见首领瞬息败北，魂飞魄散四散奔逃。你用麻绳将周横与两名头目结结实实绑在庙前栓马桩上，移交闻讯赶来的华阴县弓手押入大牢，随即劈开丹房铁锁救出松鹤老庙祝与受困道童。'),
    ],
    onFinishEffects: [openScene('scene_hsq01_10', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_10: {
    id: 'scene_hsq01_10',
    title: '第十幕 · 采药归山',
    subtitle: '华阴药王古庙外',
    mandatory: true,
    beats: [
      S(SPEAKER_YAOWANG_KEEPER, '（颤巍巍捧出三篓封存完好的秦岭上品黄精与七叶灵芝，热泪盈眶向你作揖）“多谢华山派{gender:少侠|女侠}仗义出手！若非{gender:少侠|女侠}剑法神妙，这百年药王古庙今日便毁在恶贼手里了！”'),
      P('“老庙祝折煞晚辈了。华山与华阴乡亲唇齿相依，除暴安良本是我辈分内之事。这几篓灵药我便带回玉女峰交予宁师叔。”'),
      N('安顿好受惊药农与获救道童后，你背起沉甸甸的竹编药篓，踏着夕阳余晖重返西岳玉女峰。'),
    ],
    choices: [
      {
        id: 'hsq01_return_mountain',
        label: '背负秦岭灵药篓，返回玉女峰洗头盆清泉演剑院复命',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q01_QUEST_ID, 'return_zixia_report'),
          toast('药王庙恶匪已除！请返回【玉女峰紫霞道观 · 洗头盆清泉演剑院】复命！', 'success', '药王除恶'),
        ],
      },
    ],
  },

  scene_hsq01_11: {
    id: 'scene_hsq01_11',
    title: '第十一幕 · 师兄嘉勉',
    subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
    mandatory: true,
    beats: [
      N('暮色漫上玉女峰巅，你将完好无损的三篓灵草呈于洗头盆清泉演剑院石案之上，将古柏石阶下先卸狂刀、后刺神门穴制伏周横的经过据实禀明。'),
      S('NPC-0166', '（检视你青钢剑刃毫无卷口崩缺，眼角浮起一抹温婉笑意）“剑刃不崩，足见未以蛮力硬磕厚背刀；衣袂不乱，足见临危步法未散。初下山门便有这般定力，着实难得。”'),
      S('NPC-0202', '（欣然抚掌）“不错！我华山武学讲究『根深方能叶茂，气定自然神闲』。{gender:师弟|师妹}能将最基础的入门十二式用出十成严谨法度，将来水到渠成，何愁不能窥见紫霞大道？”'),
    ],
    onFinishEffects: [openScene('scene_hsq01_12', HUASHAN_Q01_QUEST_ID)],
  },

  scene_hsq01_12: {
    id: 'scene_hsq01_12',
    title: '第十二幕 · 廊下冷语',
    subtitle: '洗头盆清泉演剑院回廊',
    mandatory: true,
    beats: [
      N('正说话间，院侧青石回廊忽传来一阵急促冷峻的脚步声。刚自长安返山议事的宿老「狂风快剑」封不弃抱剑斜倚廊柱，冷冷瞥了石案药篓与你手中长剑一眼。'),
      S('NPC-0167', '“哼，对付一个三流中品的山野粗汉，居然还要耐着性子拆上十几个回合等他力竭？若是老夫门下剑法，一照面抢入中宫，三剑之内早挑断他手筋脚筋了！把年轻弟子教得这般四平八稳、慢吞吞如老牛拉车，真遇上绝顶快刀，十条命也不够送！”'),
      S('NPC-0166', '（神色微凛，淡淡道）“封师兄此言差矣。外门筑基不求行险侥幸，若一味贪图快奇而荒废内息根基，终究难臻化境。”'),
      N('封不弃冷哼一声拂袖而去。高沧云轻叹口气，拍了拍你的肩头，嘱你安心勤修《华山基础心法》与《华山剑法》，备战日后博台外门大比。你隐隐觉出——这西岳云海之下，剑与气的百年分歧远未消散。'),
      S('NPC-0166', '（待封不弃走远，轻声道）“方才你步法滞重，是吃了没练轻身功夫的亏。华山千尺幢、苍龙岭处处绝险，我先把《穿云纵》的提纵口诀传你，往后上山下山、临敌闪避都用得上。”'),
    ],
    choices: [
      {
        id: 'hsq01_finish_reward',
        label: '谨记师长教诲，收剑入鞘精修筑基（完成初试）',
        tone: 'gold',
        effects: [
          { type: 'addArtExp', artId: 'MA-167', amount: 260 },
          { type: 'addArtExp', artId: 'MA-160', amount: 220 },
          { type: 'giveSilver', amount: 45, reason: '药王古庙除恶护药赏银' },
          { type: 'addSectContribution', amount: 40 },
          { type: 'giveCombatExp', amount: 60, reason: '药王古庙初试十二式力挫周横' },
          { type: 'modifyChivalry', delta: 8, reason: '解救华阴药王庙道童与药农' },
          { type: 'modifyRenown', delta: 10, reason: '华山新秀药王庙剑挫铁背苍狼' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0166' }, delta: 8 },
          ...HUASHAN_STARTER_KIT_EFFECTS,
          { type: 'completeQuest', questId: HUASHAN_Q01_QUEST_ID },
          toast('已完成《药王除恶 · 十二初试》！华山剑法与基础心法修为精进！', 'success', '师门初试'),
        ],
      },
    ],
  },
}
