import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q12_QUEST_ID } from './huashanJianSanqingQuest'

const SPEAKER_SAIWAI_ELDER: StorySpeakerSpec = {
  kind: 'custom',
  name: '贺兰枭 · 塞外大煞',
  title: '塞外双煞之首 · 断魂血刀',
  factionName: '塞外双煞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_SAIWAI_YOUNGER: StorySpeakerSpec = {
  kind: 'custom',
  name: '贺兰桀 · 塞外二煞',
  title: '塞外双煞之次 · 裂风快刀',
  factionName: '塞外双煞',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_CAPTIVE_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '关中老客商',
  title: '风陵渡遇险行商',
  factionName: '秦晋商帮',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildSaiwaiElderNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ12_SAIWAI_ELDER',
    name: '贺兰枭 · 塞外大煞',
    title: '风陵黑店 · 塞外双煞之首',
    realm: '一流中品',
    factionId: 'SECT-00',
    factionName: '塞外双煞',
    sectRank: 0,
    sectRankLabel: '凶煞首领',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“华山派的小剑客也敢孤身闯爷爷的风陵血店？老二，并肩剁了他！”',
    stats: { hp: 2580, mp: 2050, agi: 61, res: 51 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-022',
      shoes: 'BOT-011',
      accessory1: 'ACC-025',
    },
    equippedArts: { neigong: 'MA-232', move1: 'MA-132', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-232', level: 6 }, { artId: 'MA-132', level: 6 }, { artId: 'MA-133', level: 6 }],
  })
}

function buildSaiwaiYoungerNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ12_SAIWAI_YOUNGER',
    name: '贺兰桀 · 塞外二煞',
    title: '风陵黑店 · 塞外双煞之次',
    realm: '一流下品',
    factionId: 'SECT-00',
    factionName: '塞外双煞',
    sectRank: 0,
    sectRankLabel: '凶煞副手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“大哥锁他上盘，我削他双足！叫他有来无回！”',
    stats: { hp: 2050, mp: 1680, agi: 63, res: 45 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-015',
      shoes: 'BOT-011',
    },
    equippedArts: { neigong: 'MA-232', move1: 'MA-150', move2: 'MA-133' },
    learnedArts: [{ artId: 'MA-232', level: 5 }, { artId: 'MA-150', level: 5 }, { artId: 'MA-133', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq12_01: {
    id: 'scene_hsq12_01',
    title: '第一幕 · 朔风试快剑',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈',
    mandatory: true,
    beats: [
      N('{reignYear}冬月初临，长安西市车马行栈后院落叶萧萧。你手腕疾抖，一连三剑刺穿飘落的枯叶，剑尖余劲将青砖地面划出三道寸许白痕。'),
      S('NPC-0167', '（负手立于廊下，目光如电扫过砖上剑痕）“《夺命连环三仙剑》能练到这一步，出剑之快、收势之狠，已得了老夫七八分火候。”'),
      P('“弟子近日演剑，总觉三仙连环虽快绝凌厉，却在第三剑力尽回撤时留有一丝气浮之隙。若遇宗师级高手硬撼不退，只怕反受其咎。”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_02', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_02: {
    id: 'scene_hsq12_02',
    title: '第二幕 · 奇险与堂皇',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈',
    mandatory: true,
    beats: [
      S('NPC-0167', '“哼，算你眼光毒辣！当年我剑宗先辈创这《夺命连环三仙剑》，本就是绝境搏命的奇险杀招——一剑快似一剑，却偏在奇诡，少了堂皇镇岳的浩瀚气象。”'),
      N('封不弃转身望向东方苍茫秦岭，眼中闪过一抹罕见的敬畏与炽热。'),
      S('NPC-0167', '“欲成我剑宗百年一遇的擎天大器，单靠奇快还不够，非修成我华山镇山绝学《太岳三青峰》不可！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_03', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_03: {
    id: 'scene_hsq12_03',
    title: '第三幕 · 镇山剑谱归何处',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈',
    mandatory: true,
    beats: [
      P('“封师叔，《太岳三青峰》乃是地阶上品的镇岳剑道，不知此谱如今由哪位长辈执掌？”'),
      S('NPC-0167', '“三十年前两宗分途，岳沧溟执掌紫霞主殿，而那部《华山太岳三青峰剑谱》真本，一直由常年驻守落雁峰绝顶的『潼关剑神』秦烈山师兄亲自保管。”'),
      S('NPC-0167', '“秦师兄虽不偏袒气宗，却平生最恨剑心轻浮、恃快逞凶之辈。门中多少弟子登顶求剑，皆被他三剑之内震落山坛！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_04', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_04: {
    id: 'scene_hsq12_04',
    title: '第四幕 · 熔铸三剑意',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈',
    mandatory: true,
    beats: [
      S('NPC-0167', '“你既修成了落雁之轻灵、希夷之虚实、三仙之疾烈，便该将这三路剑意熔于一炉。记住——见了秦师兄，莫耍半分滑头，唯有以死不旋踵的剑骨正面对决！”'),
      P('“弟子谨记封师叔教诲！这便东返西岳，孤身登落雁峰叩请秦师伯指点！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_05', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_05: {
    id: 'scene_hsq12_05',
    title: '第五幕 · 束装东赴西岳',
    subtitle: '京兆府 · 西市胡商坊 · 车马行栈',
    mandatory: true,
    beats: [
      N('封不弃取过一壶关中烈酒抛入你怀中，拍了拍你的肩头。'),
      S('NPC-0167', '“落雁峰顶风雪彻骨，喝口烈酒暖暖剑胆。去吧，让我看看你这柄剑，能不能让秦师兄破例开匣！”'),
    ],
    choices: [
      {
        id: 'hsq12_c05_depart',
        label: '饮尽烈酒，孤身赶赴华山绝顶白玉论剑坛',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q12_QUEST_ID, stepId: 'q12_summit_ask_sword' },
          toast('已开启《白玉问剑 · 潼关剑神》！请登临【华山绝顶论剑台 · 落雁峰白玉论剑坛】！', 'talk', '剑宗问剑'),
        ],
      },
    ],
  },

  scene_hsq12_06: {
    id: 'scene_hsq12_06',
    title: '第六幕 · 踏雪登落雁',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q12_snow_ascent.jpg',
    illustrationCaption: '踏雪问剑 · 孤身登临落雁峰白玉论剑坛，秦烈山横剑云海相候',
    mandatory: true,
    beats: [
      N('千仞绝壁覆满新雪，罡风卷动万顷云海。你一步一印踏上落雁峰顶的白玉论剑坛，只见「潼关剑神」秦烈山一袭苍青劲装，横剑独立于风雪之巅，须发皆染霜华。'),
      S('NPC-0147', '（双目微阖，声若洪钟穿透风雪）“足音沉凝，剑鸣清越。封师弟把他的《夺命连环三仙剑》传给你了？”'),
      P('“弟子参见秦师伯！封师叔言道，三仙剑虽快却偏于奇险，命弟子登坛叩问师伯，求习我华山镇山正道——《太岳三青峰》！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_07', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_07: {
    id: 'scene_hsq12_07',
    title: '第七幕 · 剑神三问',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0147', '“哼，封不弃总算说了句明白话！当年我剑宗多少惊才绝艳之辈，就是贪图一剑封喉之快，失了太岳巍峨之本，最终折在思过崖与江湖仇杀之中！”'),
      N('秦烈山缓缓睁开双眸，沧桑眼底陡然迸射出两道凌厉无匹的剑芒，压得坛上积雪四散飞溅！'),
      S('NPC-0147', '“《太岳三青峰》一剑强似一剑，非有宁折不弯之剑骨者不可轻传。拔剑吧——不必留手，在老夫剑下撑满十五合而不退半步，老夫再听你下文！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_08', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_08: {
    id: 'scene_hsq12_08',
    title: '第八幕 · 三剑熔炉起寒芒',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('长剑铮然出鞘！你深吸一口绝顶寒气，先以《落雁剑法》游走卸压，再化《希夷剑法》虚实相生，更将《夺命连环三仙剑》的疾电锋芒藏于守势之后！'),
      P('“弟子献丑——请秦师伯赐教！”'),
      S('NPC-0147', '“来得好！看剑！”'),
    ],
    choices: [
      {
        id: 'hsq12_c08_duel_qin',
        label: '熔合落雁、希夷、三仙剑意，迎战秦烈山十五合！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q12_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0147',
              talkOverride: '“剑势如岳，狂风难撼！接老夫这记苍松迎客！”',
            },
            rule: 'survive_rounds',
            maxRounds: 15,
            forbidEscapeReason: '白玉论剑坛问剑证心，退后半步便无缘镇山绝学！',
            introText: '【白玉问剑】熔铸生平所学剑招，在「潼关剑神」秦烈山（一流上品）凌厉剑压下激战十五合（或将其击败）！',
            onWin: [openScene('scene_hsq12_09', HUASHAN_Q12_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('秦烈山剑势如山崩海啸，你被震退数步！调匀气息后再行问剑！', 'warn', '白玉问剑'),
              openScene('scene_hsq12_08', HUASHAN_Q12_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_hsq12_09: {
    id: 'scene_hsq12_09',
    title: '第九幕 · 狂飙剑压第十二合',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('金铁交鸣之声震彻落雁孤峰！转眼已过十二合，秦烈山手中长剑越舞越沉，每一剑劈落都似西岳巨岩倾塌，震得你虎口迸裂、鲜血顺着剑柄蜿蜒滴落白雪！'),
      S('NPC-0147', '“第十二合了！你剑招已尽，还不收剑退下，更待何时？！”'),
      P('“剑招纵有穷尽，剑心绝无退路！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_10', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_10: {
    id: 'scene_hsq12_10',
    title: '第十幕 · 断刃指喉寸步不让',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q12_broken_blade.jpg',
    illustrationCaption: '断刃指喉 · 狂飙剑压激斗十五合，佩剑崩裂仍寸步不让',
    mandatory: true,
    beats: [
      N('第十五合骤然而至！秦烈山一剑化作三道匹练青光当空压落，“咔嚓”一声脆响，你手中百炼精钢剑承受不住两股绝强剑劲碰撞，竟从中折断，半截残刃激射入云！'),
      N('电光石火间，秦烈山剑锋已抵你左肩半寸；而你非但未退，反而顶着裂肤剑风欺身突进，手中仅剩尺许的铮亮断剑笔直抵在秦烈山咽喉三寸之前，稳如生根古松！'),
      S('NPC-0147', '（瞳孔骤缩，凝视咽喉前纹丝不动的断刃，半晌后蓦然收剑仰天长笑）“好！好一个断刃不折腰！十五合内把落雁、希夷、三仙化为一股死中求活的锐气，老夫三十年未见这般剑骨了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_11', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_11: {
    id: 'scene_hsq12_11',
    title: '第十一幕 · 赐剑再试正道心',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('秦烈山反手从剑架上取下一柄寒光凛冽的华山备用青锋抛给你，神色转为肃穆。'),
      S('NPC-0147', '“你的剑骨与悟性，已够资格翻阅《太岳三青峰》。但华山镇山神剑，只传替天行道之侠者，绝不传恃武凌弱之徒！”'),
      P('“请秦师伯明示，弟子愿凭手中三尺剑证道！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_12', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_12: {
    id: 'scene_hsq12_12',
    title: '第十二幕 · 风陵黑店双煞凶威',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0147', '“数日前潼关守军密报：辽夏边境流窜而来的凶徒『塞外双煞』贺兰枭、贺兰桀兄弟，鸠占了黄河风陵渡口南岸荒店，假借歇脚客栈截杀往来秦晋行商，手段残忍至极。”'),
      S('NPC-0147', '“此二人合击刀法凶悍狡诈，寻常捕快近身即死。今夜风雪正紧，你可敢孤身下山闯他黑店，提双煞印信回来见我？”'),
      P('“塞外凶徒残害关中百姓，华山门人岂容其猖獗！弟子今夜便去踏平黑店！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_13', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_13: {
    id: 'scene_hsq12_13',
    title: '第十三幕 · 星夜下西岳',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('你包扎好虎口血痕，将秦烈山所赐青锋佩于腰间，迎着暮色风雪施展轻功掠下苍龙岭，直奔黄河大折处的风陵渡口而去。'),
    ],
    choices: [
      {
        id: 'hsq12_c13_go_fort',
        label: '星夜兼程，赶赴黄河大折烽火台下风陵黑店',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q12_QUEST_ID, 'q12_black_inn_raid'),
          toast('请前往【潼关天险瓮城 · 黄河大折惊涛烽火台】夜闯黑店诛灭塞外双煞！', 'talk', '风陵除煞'),
        ],
      },
    ],
  },

  scene_hsq12_14: {
    id: 'scene_hsq12_14',
    title: '第十四幕 · 大河怒涛映孤灯',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台下',
    mandatory: true,
    beats: [
      N('夜黑风高，黄河在潼关外折向东流，冰凌撞击河岸发出闷雷般的轰响。烽火台下的荒僻渡口旁，一座破败车马老店挂着一盏惨白纸灯笼，门缝里隐隐渗出混杂着蒙汗药与血腥气的酒味。'),
      P('（屏息凝神，剑指轻叩剑镡）“门外马槽拴着四匹秦晋商队的健骡，屋里却半点客商谈笑声也无……果然是杀人越货的黑店！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_15', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_15: {
    id: 'scene_hsq12_15',
    title: '第十五幕 · 孤客叩门探虚实',
    subtitle: '风陵渡南岸 · 荒僻老店大堂',
    mandatory: true,
    beats: [
      N('你压低斗笠推门而入，大堂正中坐着两名满脸横肉、披着狼皮大氅的塞外壮汉，脚边横放着两柄厚背鬼头血刀，正就着一坛烈酒清点抢来的商队银鞘。'),
      S(SPEAKER_SAIWAI_YOUNGER, '（斜眼上下打量你腰间长剑，狞笑舔唇）“哟，大雪封渡的半夜，竟还有个背剑的雏儿自己送上门来？”'),
      S(SPEAKER_SAIWAI_ELDER, '“看这衣饰剑穗，莫不是西岳华山派的牛鼻子？正好拿他的脑袋祭咱兄弟的断魂刀！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_16', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_16: {
    id: 'scene_hsq12_16',
    title: '第十六幕 · 掀桌破局救商旅',
    subtitle: '风陵渡南岸 · 荒僻老店大堂',
    illustrationUrl: '/assets/quests/hs_q12_black_inn.jpg',
    illustrationCaption: '夜闯黑店 · 黄河风陵渡荒店孤剑破局，连斩塞外双煞证道',
    mandatory: true,
    beats: [
      N('后厨柴房内忽传来被缚客商绝望的呜咽声。贺兰桀手腕一翻，三枚喂毒透骨钉借着油灯阴影直射你咽喉；贺兰枭同时暴起掀翻八仙桌，鬼头重刀带着腥风拦腰横斩！'),
      P('“塞外双煞，恶贯关中——今夜华山剑下，取尔等首级祭河！”'),
      N('你足尖一点横梁，剑光如惊电划破昏暗灯影，叮叮三响挑飞毒钉，凌空直扑双煞合击阵眼！'),
    ],
    onFinishEffects: [openScene('scene_hsq12_17', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_17: {
    id: 'scene_hsq12_17',
    title: '第十七幕 · 孤剑死战双凶煞',
    subtitle: '风陵渡南岸 · 荒僻老店大堂',
    mandatory: true,
    beats: [
      S(SPEAKER_SAIWAI_ELDER, '“狂妄小辈！老二，使『双狼裂原刀阵』，别让他腾出身法！”'),
      S(SPEAKER_SAIWAI_YOUNGER, '“得令！上下齐削，看他一柄窄剑挡得住几刀！”'),
    ],
    choices: [
      {
        id: 'hsq12_c17_fight_twins',
        label: '施展剑宗绝技，孤剑死战塞外双煞！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_Q12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSaiwaiElderNpc() },
            extraOpponents: [{ kind: 'custom', npc: buildSaiwaiYoungerNpc() }],
            rule: 'duel',
            forbidEscapeReason: '柴房尚有无辜客商待救，岂可弃剑退缩！',
            introText: '【夜闯黑店】车轮连战迎战「塞外双煞」贺兰枭（一流中品）与贺兰桀（一流下品）！',
            onWin: [openScene('scene_hsq12_18', HUASHAN_Q12_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq12_18: {
    id: 'scene_hsq12_18',
    title: '第十八幕 · 三仙贯喉破双刀',
    subtitle: '风陵渡南岸 · 荒僻老店大堂',
    mandatory: true,
    beats: [
      N('狭窄店堂之内刀风呼啸，你却在双刀夹击缝隙中忆起白玉坛上秦烈山那沉凝如岳的一剑——守则渊渟岳峙，攻则电射雷奔！'),
      N('只见你一式希夷虚剑引偏贺兰枭重刀，旋即连环三仙剑暴起寒芒，“噗噗”两声轻响，先废贺兰桀持刀右腕，剑锋毫不停滞回掠，一剑封穿贺兰枭咽喉，双煞齐齐轰然毙命！'),
      P('（振落剑上血珠，收剑入鞘）“奇快为锋，沉岳为骨……原来秦师伯在白玉坛喂招十五合，早已在剑压中点化了我！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_19', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_19: {
    id: 'scene_hsq12_19',
    title: '第十九幕 · 解缚救商焚黑店',
    subtitle: '风陵渡南岸 · 荒僻老店后院',
    mandatory: true,
    beats: [
      N('你提剑劈开后厨柴房铁锁，将七八名被麻绳捆缚的秦晋行商一一解救，并把双煞劫掠的银鞘原封归还商队，仅取下双煞腰间玄铁狼头牌作为伏诛印信。'),
      S(SPEAKER_CAPTIVE_MERCHANT, '（老泪纵横，叩首不止）“多谢华山{gender:少侠|女侠}救命大恩！若非{gender:少侠|女侠}神剑天降，老朽一行今夜皆要成了黄河水鬼了！”'),
      P('“老丈快请起，趁天色将明速回潼关城内歇息，我已通知守关军卒前来善后。”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_20', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_20: {
    id: 'scene_hsq12_20',
    title: '第二十幕 · 晓雾凯旋返西岳',
    subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台',
    mandatory: true,
    beats: [
      N('东方天际泛起鱼肚微白，黄河冰雾渐散。你怀揣塞外双煞的玄铁狼头牌，提剑重踏华山云梯，直向落雁峰白玉论剑坛飞掠而上。'),
    ],
    choices: [
      {
        id: 'hsq12_c20_return',
        label: '重返落雁峰白玉论剑坛，向秦烈山复命',
        tone: 'gold',
        effects: [
          setStep(HUASHAN_Q12_QUEST_ID, 'q12_return_summit'),
          toast('已连斩塞外双煞！请返回【华山绝顶论剑台 · 落雁峰白玉论剑坛】复命！', 'success', '风陵凯旋'),
        ],
      },
    ],
  },

  scene_hsq12_21: {
    id: 'scene_hsq12_21',
    title: '第二十一幕 · 呈牌复命验侠心',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('朝阳初升，万道金光刺破西岳云海。秦烈山依旧伫立于白玉坛畔，接过你双手呈上的两枚玄铁狼头牌，又瞥见你衣袖间救人时沾染的麻绳擦痕，苍老面容顿时舒展开来。'),
      S('NPC-0147', '“潼关守将天未亮便已飞鸽传书上山——双煞伏诛，被劫商银分文未取尽归苦主。好孩子，你不仅剑够利，心肠更是堂堂正正！”'),
      P('“除暴安良本是我辈本分，更得秦师伯昨日十五合喂招点化，弟子方能在双刀夹击下守住方寸。”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_22', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_22: {
    id: 'scene_hsq12_22',
    title: '第二十二幕 · 剑神托付镇山谱',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q12_manual_bestow.jpg',
    illustrationCaption: '剑神托谱 · 秦烈山欣慰长笑，亲手托付华山太岳三青峰剑谱',
    mandatory: true,
    beats: [
      N('秦烈山欣慰长笑，转身自白玉石龛暗格中捧出一卷古朴厚重、封皮镌刻西岳三峰云纹的绢本秘谱，郑重交入你双掌之中！'),
      S('NPC-0147', '“这卷《华山太岳三青峰剑谱》，老夫守了整整三十年，今日终于等到了配得上它的剑宗传人！拿好了！”'),
      P('（双手捧谱，深深一揖到底）“弟子定不负秦师伯与历代祖师重托！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_23', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_23: {
    id: 'scene_hsq12_23',
    title: '第二十三幕 · 口传心授三青峰',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('秦烈山并指为剑，指向远方云海中巍然耸峙的莲花、玉女、落雁三座奇峰，逐字逐句为你拆解《太岳三青峰》的至高奥义。'),
      S('NPC-0147', '“看好了！世人以为《太岳三青峰》只是攻敌必救的快剑三连击，殊不知第一剑如西峰莲花破云，第二剑如中峰玉女擎天，第三剑如南峰落雁镇岳——一剑比一剑快，更是一剑比一剑重！”'),
      S('NPC-0147', '“以剑宗之神速驭太岳之沉雄，三剑齐发之时，纵是千钧铁壁亦要应声崩摧！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_24', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_24: {
    id: 'scene_hsq12_24',
    title: '第二十四幕 · 剑意贯通演太岳',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    illustrationUrl: '/assets/quests/hs_q12_taiyue_mastery.jpg',
    illustrationCaption: '西岳重光 · 白玉坛顶三剑齐发惊散流云，剑宗修成太岳三青峰',
    mandatory: true,
    beats: [
      N('你福至心灵，拔剑向着浩瀚云海连出三剑！刹那间清越剑吟响彻群峰，三道青苍剑芒首尾相衔、层层叠浪，竟将坛前翻涌的百丈寒云生生劈开一道澄澈天光！'),
      S('NPC-0147', '（抚掌赞叹）“善哉！三仙之奇快与太岳之堂皇，今日终于在你剑下合二为一了！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_25', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_25: {
    id: 'scene_hsq12_25',
    title: '第二十五幕 · 勉励面壁磨剑锋',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      S('NPC-0147', '“《太岳三青峰》初成，切忌锋芒太露。待你将此剑修至四重炉火纯青之境，便去思过崖寒风剑坪好生沉淀一番。”'),
      S('NPC-0147', '“如今天下暗流汹涌，西夏一品堂在关中蠢蠢欲动，我华山未来的脊梁，终究要靠你们年青一代撑起！”'),
      P('“弟子铭记于心，必勤修《太岳三青峰》，护佑西岳威名！”'),
    ],
    onFinishEffects: [openScene('scene_hsq12_26', HUASHAN_Q12_QUEST_ID)],
  },

  scene_hsq12_26: {
    id: 'scene_hsq12_26',
    title: '第二十六幕 · 白玉问剑终成器',
    subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
    mandatory: true,
    beats: [
      N('白玉坛上朔风依旧，你握剑远眺万里河山，只觉胸中剑气澄明如洗，已然跨入华山剑宗真正的核心殿堂。'),
    ],
    choices: [
      {
        id: 'hsq12_c26_finish',
        label: '收剑谢过秦师伯，潜心参悟《太岳三青峰》',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ITM-SCR-016', qty: 1 },
          { type: 'teachMartialArt', artId: 'MA-049', level: 1, autoEquip: true },
          { type: 'addArtExp', artId: 'MA-049', amount: 320 },
          { type: 'giveSilver', amount: 180, reason: '风陵除煞与白玉问剑门派嘉奖' },
          { type: 'addSectContribution', amount: 120 },
          { type: 'giveCombatExp', amount: 250, reason: '十五合断刃问剑与连斩塞外双煞' },
          { type: 'modifyRenown', delta: 35, reason: '孤剑夜平风陵黑店连斩塞外双煞' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0147' }, delta: 25 },
          { type: 'completeQuest', questId: HUASHAN_Q12_QUEST_ID, outcome: 'mastered_taiyue' },
          toast(
            '已获授《华山太岳三青峰剑谱》与地阶上品《太岳三青峰》！修至四重后可赴思过崖开启后续机缘！',
            'success',
            '西岳重光',
          ),
        ],
      },
    ],
  },
}
