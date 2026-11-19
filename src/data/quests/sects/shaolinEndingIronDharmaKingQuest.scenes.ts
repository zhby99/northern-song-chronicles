import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q39_QUEST_ID } from './shaolinEndingIronDharmaKingQuest'

const SPEAKER_CORRUPT_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '知客执事 · 慧贪',
  title: '少林知客房贪墨执事',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_RED_BLADE: StorySpeakerSpec = {
  kind: 'custom',
  name: '赤练刀主 · 殷无咎',
  title: '河东赤练堂掌门',
  factionName: '河东邪派',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_DARK_WHIP: StorySpeakerSpec = {
  kind: 'custom',
  name: '玄冥鞭王 · 杜阴山',
  title: '太行黑水帮掌门',
  factionName: '太行邪派',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_BLOOD_SWORD: StorySpeakerSpec = {
  kind: 'custom',
  name: '血手铁剑 · 莫断魂',
  title: '淮南断魂门掌门',
  factionName: '淮南邪派',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_IRON_MONKS: StorySpeakerSpec = {
  kind: 'custom',
  name: '戒律院与罗汉堂诸僧',
  title: '少林护教铁血僧众',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

function buildRedBladeMaster(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ39_RED_BLADE',
    name: '赤练刀主 · 殷无咎',
    title: '河东赤练堂掌门',
    realm: '宗师中品',
    factionName: '河东邪派',
    sectRank: 0,
    sectRankLabel: '邪派掌门',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“少林内乱方兴、旧方丈刚被革位，正是群雄分拆嵩山武库的大好时机！小和尚，把《易筋经》与七十二绝技交出来！”',
    stats: { hp: 5150, mp: 4800, agi: 82, res: 73 },
    talents: { bone: 84, comprehension: 76, charm: 34 },
    equippedArts: { neigong: 'MA-026', qinggong: 'MA-097', move1: 'MA-091', move2: 'MA-107' },
    learnedArts: [
      { artId: 'MA-026', level: 9 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-091', level: 9 },
      { artId: 'MA-107', level: 9 },
    ],
  })
}

function buildDarkWhipMaster(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ39_DARK_WHIP',
    name: '玄冥鞭王 · 杜阴山',
    title: '太行黑水帮掌门',
    realm: '宗师下品',
    factionName: '太行邪派',
    sectRank: 0,
    sectRankLabel: '邪派掌门',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“嘿嘿，我这玄冥乌金鞭专破少林护体硬功！三位掌门联手，看你这秃驴拿什么挡！”',
    stats: { hp: 4480, mp: 4200, agi: 80, res: 69 },
    talents: { bone: 79, comprehension: 74, charm: 28 },
    equippedArts: { neigong: 'MA-081', qinggong: 'MA-097', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-055', level: 8 },
      { artId: 'MA-065', level: 8 },
    ],
  })
}

function buildBloodSwordMaster(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ39_BLOOD_SWORD',
    name: '血手铁剑 · 莫断魂',
    title: '淮南断魂门掌门',
    realm: '一流上品',
    factionName: '淮南邪派',
    sectRank: 0,
    sectRankLabel: '邪派掌门',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“废什么话！今日踏平少林大雄宝殿，我等三派便能称霸中原！”',
    stats: { hp: 3820, mp: 3600, agi: 77, res: 63 },
    talents: { bone: 76, comprehension: 72, charm: 30 },
    equippedArts: { neigong: 'MA-081', qinggong: 'MA-097', move1: 'MA-115', move2: 'MA-125' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-115', level: 8 },
      { artId: 'MA-125', level: 8 },
    ],
  })
}

export const SHAOLIN_Q39_SCENES: Record<string, StorySceneDef> = {
  scene_slq39_01: {
    id: 'scene_slq39_01',
    title: '第一幕 · 霜压嵩岳',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，冷霜压檐，铁磬长鸣。大雄宝殿前的演武香炉尚未熄灭，空气中却弥漫着肃杀如铁的寒意。'),
      N('前番旧案撕开了少林维持三十余年的温情面纱——方丈【玄慈】破戒生子，更有寺内部分知客、执事借方丈宽仁之机暗结外豪、虚报香火、松弛清规。整座千年古刹，已在不知不觉间积弊深重。'),
      S('NPC-0156', '（戒律院首座玄痛身披铁灰直裰，手按玄铁戒杖步至你身侧，目光如刀）“师侄，乱世须用重典，沉疴必下猛药！你既于前番大议中力排众议、主张以铁律肃清山门，今日四十八房皆在殿外候命，便由你登台执杖宣律罢！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_02', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_02: {
    id: 'scene_slq39_02',
    title: '第二幕 · 慈悲与霹雳',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0134', '（罗汉堂长老玄寂合十沉声道）“阿弥陀佛。外有辽夏兵锋虎视中原，内有邪魔外道窥伺七十二绝技。若少林此刻仍只讲姑息宽纵，不出三载，千年祖庭必毁于内溃！”'),
      P('（接过玄痛递来的玄铁监刑法杖，指节微紧，声音冷峻如金铁交击）“佛门有菩萨低眉，亦有金刚怒目！不施霹雳手段，何以显菩萨心肠？今日若不立铁律、革旧弊，少林便无明日！”'),
      S('NPC-0112', '（早已卸去袈裟立于佛前，神色平静而沧桑）“阿弥陀佛。老衲一生姑息过甚，终铸大错。今日你以铁腕涤寺，正是达摩祖师所愿。老衲甘愿受罚，绝无怨言。”'),
    ],
    onFinishEffects: [openScene('scene_slq39_03', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_03: {
    id: 'scene_slq39_03',
    title: '第三幕 · 戒律森严',
    subtitle: '大雄正殿 · 玉阶高台',
    mandatory: true,
    beats: [
      S('NPC-0127', '（玄难虽心疼师兄，却亦知大局不可违，长叹一声退后半步）“只望师侄念在方丈师兄三十年护寺苦劳，留他一条性命，令其入后山闭死关忏悔余生……”'),
      P('（微微颔首，目光凛然）“玄难师伯放心。依《少林铁律》，方丈破戒自当监刑杖责、革去方丈法位、永禁后山达摩洞面壁思过，以儆效尤——既全佛门不杀之戒，亦彰千年清规之威！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_04', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_04: {
    id: 'scene_slq39_04',
    title: '第四幕 · 执杖登台',
    subtitle: '大雄正殿 · 监刑法台',
    mandatory: true,
    beats: [
      N('三百名戒律院铁杖武僧列成两道黑压压的铜墙铁壁，自大雄正殿一直排至山门石阶！满寺鸦雀无声，唯余寒风猎猎。'),
    ],
    choices: [
      {
        id: 'slq39_accept',
        label: '执玄铁法杖登台宣律，监刑革去玄慈方丈之位',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q39_QUEST_ID, stepId: 'iron_verdict' },
          setStep(SHAOLIN_Q39_QUEST_ID, 'iron_verdict'),
          toast('已开启终局《雷霆涤寺 · 铁腕法王》！请登大雄正殿高台执杖宣律！', 'talk', '雷霆涤寺'),
        ],
      },
    ],
  },

  scene_slq39_05: {
    id: 'scene_slq39_05',
    title: '第五幕 · 高台宣律',
    subtitle: '大雄正殿 · 丹墀高台',
    illustrationUrl: '/assets/quests/sl_39_iron_verdict.jpg',
    illustrationCaption: '大雄宝殿高台 · 主角手执玄铁法杖宣读少林铁律，监刑杖责玄慈并革去其方丈法位',
    mandatory: true,
    beats: [
      N('你手持乌黑玄铁法杖缓步登上丹墀高台，俯瞰殿前两千名少林僧众与四方观礼豪客，猛然将铁杖顿地——“轰”的一声，青石板震裂三尺！'),
      P('（声如洪钟震彻少室山谷）“少林清规第一条：上自方丈首座，下至烧火行童，犯淫戒而乱寺纲者，杖责一百、革去法职、永禁思过！今前任方丈玄慈自承旧罪，本座奉四十八房公议，依法监刑！”'),
      N('话音未落，满山屏息！所有观礼的江湖豪客无不骇然变色——谁也没想到少林寺竟真有如此雷霆铁腕，当众革去一代方丈之位！'),
    ],
    onFinishEffects: [openScene('scene_slq39_06', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_06: {
    id: 'scene_slq39_06',
    title: '第六幕 · 铁杖明法',
    subtitle: '大雄正殿 · 丹墀高台',
    mandatory: true,
    beats: [
      N('玄慈坦然伏于青石法毯之上，戒律院执刑僧齐声喝数，沉重的玄铁戒杖一记记砸落，杖杖见血，声声惊心！'),
      S('NPC-0112', '（咬牙挨满百杖，浑身血汗交加却眼神清明，艰难抬首望向高台上的你）“阿弥陀佛……好……好一个雷霆手段……少林有如此铁律，千年不倒矣……”'),
      P('（居高临下，合十肃然宣判）“刑满！即日起革去玄慈少林方丈法位，收回方丈印信与达摩袈裟，由戒律院护送至后山幽谷石室闭死关忏悔，终身不得踏出半步！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_07', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_07: {
    id: 'scene_slq39_07',
    title: '第七幕 · 闭关忏悔',
    subtitle: '大雄正殿 · 后山小径',
    mandatory: true,
    beats: [
      N('两名戒律院高僧上前为玄慈敷上少林大还金创药，搀扶着这位曾经统领中原武林三十年的老方丈一步步走向后山深谷。玄慈临转过山坳前，最后回头望了一眼高台之上青衫如铁的你，深深合十致意。'),
      S('NPC-0156', '（玄痛望见这一幕，神色肃穆如钢）“师兄罪业已定，但寺内借师兄宽仁之名贪墨香火、私通外客的蛀虫尚未拔除！知客执事慧贪等人此刻正在东厢藏经橱妄图焚毁账册！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_08', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_08: {
    id: 'scene_slq39_08',
    title: '第八幕 · 锁拿蠹虫',
    subtitle: '大雄宝殿 · 殿前广场',
    mandatory: true,
    beats: [
      P('（眼中寒芒一闪，铁杖直指东厢）“好大的狗胆！方丈尚且受杖革位，区区知客贪僧竟敢销毁暗账？玄痛师伯，封锁全寺山门，随我直扑东厢碑廊藏经橱！”'),
      S('NPC-0134', '（玄寂大步跟上）“罗汉堂弟子已将东厢团团围住，一只苍蝇也飞不出去！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_09', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_09: {
    id: 'scene_slq39_09',
    title: '第九幕 · 群豪震慑',
    subtitle: '大雄宝殿 · 东厢回廊',
    mandatory: true,
    beats: [
      N('你率领数十名铁面武僧大步穿廊而过，沿途僧众无不屏息垂首。连几名原本打算看笑话的江湖门派长老，也忍不住暗自嘀咕：“少林出了这位铁腕高僧，往后只怕比从前还要难惹十倍……”'),
    ],
    onFinishEffects: [openScene('scene_slq39_10', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_10: {
    id: 'scene_slq39_10',
    title: '第十幕 · 直扑东厢',
    subtitle: '东厢碑廊 · 藏经橱外',
    mandatory: true,
    beats: [
      N('行至东厢碑廊，果然见藏经橱内火光隐隐、焦烟弥漫！你一脚踹开朱漆木门，大喝一声踏入其中！'),
    ],
    choices: [
      {
        id: 'slq39_go_purge',
        label: '踏入【东厢碑廊 · 藏经橱】，查封暗账雷霆整肃积弊',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q39_QUEST_ID, 'purge_corrupt'),
          toast('请前往【东厢碑廊 · 藏经橱】雷霆整肃戒律与知客多年积弊！', 'talk', '涤清积弊'),
        ],
      },
    ],
  },

  scene_slq39_11: {
    id: 'scene_slq39_11',
    title: '第十一幕 · 灰烬夺册',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('藏经橱内，知客执事【慧贪】与三名戒律院徇私执事正将一摞摞私账往炭盆里塞！你袖袍一挥，刚猛无匹的佛门掌风瞬间震灭炭火，将半焦的账册尽数卷入掌中！'),
      S(SPEAKER_CORRUPT_MONK, '（面如死灰，扑通跪地颤抖求饶）“师……师叔饶命！弟子只是一时糊涂，私收了河东赤练堂与太行黑水帮的几千两香火银，替他们打探过几回寺中虚实……”'),
      P('（冷笑一声，翻开焦边账册，目光如炬）“好啊！原来你们不仅虚报药庄田租、私卖武库残谱，竟还勾结河东、太行、淮南三路邪派掌门，把今日公审的时辰透了出去！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_12', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_12: {
    id: 'scene_slq39_12',
    title: '第十二幕 · 肃清门户',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      S('NPC-0156', '（玄痛气得须发皆张，铁杖重重砸地）“畜生！吃着少林的斋饭，竟敢勾结外魔谋害祖庭！立刻废去他们半身武功、逐出山门，押送河南府按律治罪！”'),
      P('（提笔在东厢石碑前以苍劲楷书写下《少林重修铁律十二条》，字字如刀刻斧凿）“自今日起，知客房账目月月公示于碑廊，戒律院与罗汉堂互为监察，凡徇私通敌者，绝不姑息！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_13', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_13: {
    id: 'scene_slq39_13',
    title: '第十三幕 · 法堂新颜',
    subtitle: '东厢碑廊 · 藏经橱',
    illustrationUrl: '/assets/quests/sl_39_iron_hall.jpg',
    illustrationCaption: '东厢碑廊 · 主角雷霆查封暗账、手书《少林重修铁律十二条》，森严法堂气象一新',
    mandatory: true,
    beats: [
      N('十二条铁律高悬东厢碑廊，十余名尸位素餐的贪墨执事被当场革除僧籍，全寺风气为之一肃！不少原本心存懈怠的弟子无不凛然整衣，齐声称颂法度严明。'),
      N('就在此时，西侧钟鼓禅院忽然传来三声刺耳的怪啸与兵刃碰撞巨响！'),
    ],
    onFinishEffects: [openScene('scene_slq39_14', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_14: {
    id: 'scene_slq39_14',
    title: '第十四幕 · 三魔压境',
    subtitle: '东厢碑廊 · 西院急报',
    mandatory: true,
    beats: [
      N('一名罗汉堂武僧急步奔来禀报：“启禀长老！河东赤练刀主【殷无咎】、太行玄冥鞭王【杜阴山】、淮南血手铁剑【莫断魂】三名邪派掌门趁我寺革位整肃之际，竟率百余邪徒打伤山门守僧，闯入钟鼓禅院演武坪叫阵！”'),
      S('NPC-0134', '（玄寂冷哼一声）“果然是慧贪这孽障暗中通风报信！三名邪派掌门联手而来，来者不善，老衲即刻点齐十八罗汉阵相助！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_15', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_15: {
    id: 'scene_slq39_15',
    title: '第十五幕 · 独步迎魔',
    subtitle: '大雄宝殿西廊',
    mandatory: true,
    beats: [
      P('（抬手止住玄寂，衣袍在劲风中猎猎翻飞，眉宇间傲然生威）“玄寂师伯不必动用罗汉阵！今日我少林刚立铁律，正缺一块试刀石来震慑天下宵小——这三个邪派掌门，便由我一人去会！”'),
      S('NPC-0156', '（玄痛眼中精光大盛）“好！若能以一人之力当众镇压三派邪主，莫说中原黑道，便是天下群雄亦再不敢轻视我少林半寸！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_16', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_16: {
    id: 'scene_slq39_16',
    title: '第十六幕 · 步入演武坪',
    subtitle: '钟鼓禅院 · 演武坪前',
    mandatory: true,
    beats: [
      N('你孤身一人负手步入钟鼓禅院演武坪，只见三名凶焰滔天的邪派掌门各自横持神兵，正肆无忌惮地狂笑叫嚣。'),
    ],
    choices: [
      {
        id: 'slq39_go_west',
        label: '踏入【钟鼓禅院 · 演武坪】，以金刚金身独战三名邪派掌门',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q39_QUEST_ID, 'shatter_three_masters'),
          toast('三名邪派掌门正在【钟鼓禅院 · 演武坪】联手逼宫！速往震断其兵刃！', 'warn', '金刚断刃'),
        ],
      },
    ],
  },

  scene_slq39_17: {
    id: 'scene_slq39_17',
    title: '第十七幕 · 邪主逼宫',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_RED_BLADE, '（将九环赤练大刀往青石上一插，狂傲大笑）“哈哈哈哈！玄慈老秃驴刚被你们自己废了，群龙无首的少林寺还敢关门整顿？识相的，把少林武库钥匙和七十二绝技抄本交出来，老子饶你们全寺不死！”'),
      S(SPEAKER_DARK_WHIP, '（抖动漆黑乌金长鞭，啪的一声抽裂石柱）“小和尚，听说你在大殿上威风八面？可惜今日站在你面前的，是河东、太行、淮南三大宗门之主！”'),
      S(SPEAKER_BLOOD_SWORD, '（铁剑斜指你的咽喉，阴恻恻一笑）“少林历代高僧都死了不成？竟派你一个人出来送死！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_18', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_18: {
    id: 'scene_slq39_18',
    title: '第十八幕 · 金刚护体',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      P('（缓步走至演武坪中央，体内二十二载少林至阳内功轰然鼓荡，周身隐隐浮现一层淡金色金刚护体罡气，连飘落的秋叶皆在三尺之外化作齑粉）“阿弥陀佛。三个跳梁小丑，也敢在达摩祖庭大放厥词？并肩上吧——今日不震断尔等手中兵刃，本座誓不回殿！”'),
      S(SPEAKER_RED_BLADE, '（脸色微变，怒吼出声）“好狂的秃驴！两位帮主，莫跟他讲江湖规矩，三路齐发，先剁碎他的乌龟壳！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_19', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_19: {
    id: 'scene_slq39_19',
    title: '第十九幕 · 独战三魔',
    subtitle: '钟鼓禅院 · 演武坪（宗师 1v3 硬仗）',
    mandatory: true,
    beats: [
      N('赤练刀风如火海倾泻，玄冥鞭影似毒蛇缠绕，血手铁剑直取咽喉死穴！三大邪派掌门联手合击，威势震得演武坪四周古柏枝叶尽折！'),
    ],
    choices: [
      {
        id: 'slq39_fight_three',
        label: '运起金刚金身，1v3 独战【殷无咎】【杜阴山】【莫断魂】！（宗师级硬仗）',
        subLabel: '当场震断三名邪派掌门兵刃，扬少林铁腕神威',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q39_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRedBladeMaster() },
            extraOpponents: [
              { kind: 'custom', npc: buildDarkWhipMaster() },
              { kind: 'custom', npc: buildBloodSwordMaster() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '少林新立铁律之日，岂容邪派掌门嚣张而退！',
            introText: '【1v3 金刚断刃】独战河东赤练刀主、太行玄冥鞭王与淮南血手铁剑！',
            onWin: [openScene('scene_slq39_20', SHAOLIN_Q39_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('三大邪派掌门合击凌厉异常，稳住金刚真气重整架势再战！', 'warn', '金刚断刃'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq39_20: {
    id: 'scene_slq39_20',
    title: '第二十幕 · 金刚断刃',
    subtitle: '钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_39_break_blades.jpg',
    illustrationCaption: '钟鼓禅院演武坪 · 金刚不坏金身光芒大作，主角徒手震断三名邪派掌门神兵',
    mandatory: true,
    beats: [
      N('五十余合惊天搏杀！面对三派掌门孤注一掷的绝命合围，你非但不退，反而低喝一声佛号，金刚不坏金身催发至绝巅，浑身绽出宛如怒目明王般的炽盛罡气！'),
      N('“锵！咔嚓！崩！”三声裂金碎铁的爆响几乎在同一瞬炸开！莫断魂的血手铁剑刺在你左肩罡气上寸寸崩断；杜阴山的玄冥乌金鞭被你反手一扯化作数截废铁；殷无咎的九环赤练刀更被你一记至刚至阳的伏魔神掌正面震断，刀身倒飞插进十丈外的石壁之中！'),
      N('三大邪派掌门齐齐口吐鲜血、如断线风筝般翻滚倒地，手中仅余三截冒烟的断柄！'),
    ],
    onFinishEffects: [openScene('scene_slq39_21', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_21: {
    id: 'scene_slq39_21',
    title: '第二十一幕 · 慑服群邪',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      S(SPEAKER_RED_BLADE, '（看着手中半截断刀，面无人色，魂飞魄散）“金刚……金刚不坏神功……一掌震断我等三人百炼神兵……怪物！少林竟藏着这等怪物！”'),
      P('（负手立于断刃之间，声音冷冽如霜）“滚下山去！告诉中原黑道诸派——今日少林革故鼎新，铁律森严！谁敢再犯少室山一草一木，断的便不只是兵刃，而是尔等项上人头！”'),
      N('三名不可一世的邪派掌门连滚带爬、狼狈逃窜下山，随行百余邪徒更是丢盔弃甲，沿途哭爹喊娘，从此数十年不敢再望嵩山一眼！'),
    ],
    onFinishEffects: [openScene('scene_slq39_22', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_22: {
    id: 'scene_slq39_22',
    title: '第二十二幕 · 满寺雷动',
    subtitle: '钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪四周，数百名戒律院、罗汉堂与达摩院僧众亲眼目睹你一人震断三魔神兵，先是一静，随即爆发出山呼海啸般的佛号与欢呼！'),
      S('NPC-0156', '（玄痛大步上前，神色激动得微微发颤）“阿弥陀佛！师侄今日以铁律涤清门户，又以金刚金身独挫三魔，真乃我少林五百年一遇之护教法王！”'),
      S('NPC-0134', '（玄寂朗声道）“大雄宝殿方丈法座空悬，唯师侄有此威望、武功与铁腕！老衲与玄痛师兄已传谕四十八房，恭请师侄移步大雄正殿，披达摩袈裟，登位少林护教方丈！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_23', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_23: {
    id: 'scene_slq39_23',
    title: '第二十三幕 · 铁血归心',
    subtitle: '大雄宝殿前广场',
    mandatory: true,
    beats: [
      S(SPEAKER_IRON_MONKS, '（千余名少林武僧齐齐立杖肃立，声震嵩岳）“恭请护教法王登位方丈！重振少林千年雄风！”'),
      P('（望向满山肃杀而昂扬的少林铁血僧众，心中豪情激荡）“好！既然诸位师伯与全寺同门信我铁腕，我便担起这副重担，叫天下人再见我少林金刚伏魔之威！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_24', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_24: {
    id: 'scene_slq39_24',
    title: '第二十四幕 · 重返大殿',
    subtitle: '大雄宝殿 · 玉阶之前',
    mandatory: true,
    beats: [
      N('夕阳如血，将大雄宝殿的金瓦映照得威严无匹。玄痛与玄寂分立左右，恭迎你步入大雄正殿登坛受衣。'),
    ],
    choices: [
      {
        id: 'slq39_go_enthrone',
        label: '步入【大雄正殿 · 佛前蒲团】，受玄痛玄寂拥戴登位铁腕法王',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q39_QUEST_ID, 'iron_enthronement'),
          toast('请前往【大雄正殿 · 佛前蒲团】披达摩袈裟登位少林护教铁腕法王！', 'success', '铁腕法王'),
        ],
      },
    ],
  },

  scene_slq39_25: {
    id: 'scene_slq39_25',
    title: '第二十五幕 · 达摩披衣',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内，玄痛亲手捧出镇寺天阶圣衣【少林达摩袈裟】，玄寂则捧出象征降魔护教的【少林燃木戒刀】仪仗，步至你的身前！'),
      S('NPC-0156', '（沉声宣礼）“少林护教新方丈，上承达摩衣钵，下握戒律雷霆！请披天阶圣衣【少林达摩袈裟】！”'),
      N('你接过古朴厚重的绯红金纹袈裟，反手一振披于肩头！刹那间，大殿铜钟齐鸣，威压如岳！'),
    ],
    onFinishEffects: [openScene('scene_slq39_26', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_26: {
    id: 'scene_slq39_26',
    title: '第二十六幕 · 铁腕法王',
    subtitle: '大雄正殿 · 护教登座',
    illustrationUrl: '/assets/quests/sl_39_dharma_king.jpg',
    illustrationCaption: '大雄宝殿 · 玄痛、玄寂率四十八房拥戴主角披《少林达摩袈裟》登位少林护教铁腕法王',
    mandatory: true,
    beats: [
      N('你大步踏上方丈法座，眉宇冷峻如金刚明王。殿内玄痛、玄寂、玄难、玄渡、玄生及四十八房高僧齐声合十行礼：“阿弥陀佛！恭迎护教法王登位！”'),
      P('（声音如铁，震彻大殿）“今日起，少林寺废除一切虚文积弊！戒律院昼夜巡山，罗汉堂日夜操演伏魔大阵，达摩院广授绝艺不拘一格——外敌敢来，便以铁杖迎之；内蠹敢生，便以重典诛之！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_27', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_27: {
    id: 'scene_slq39_27',
    title: '第二十七幕 · 燃木护教',
    subtitle: '大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      S('NPC-0134', '（玄寂恭敬呈上武库宝刀匣）“法王以金刚手段护持禅林，若尚未佩执本寺镇派戒刀【少林燃木戒刀】，便请一并执掌，以备日后斩妖除魔之用！”'),
      P('（微微颔首）“善。兵刃虽为杀伐之器，握于护法之手，便是降魔杵！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_28', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_28: {
    id: 'scene_slq39_28',
    title: '第二十八幕 · 后山回响',
    subtitle: '大雄宝殿 · 远望达摩洞',
    mandatory: true,
    beats: [
      N('大典毕，你立于殿后廊下，遥望后山烟雾缭绕的达摩面壁石洞。玄慈已在那里闭死关忏悔，昔日温厚慈和的旧时代已彻底落幕。'),
      P('（轻叹一声，复又目光如铁）“前辈以慈悲守成，晚辈以铁腕辟新。功过是非，留待百年之后由后人评说罢。”'),
    ],
    onFinishEffects: [openScene('scene_slq39_29', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_29: {
    id: 'scene_slq39_29',
    title: '第二十九幕 · 声震四方',
    subtitle: '嵩山少林寺 · 山门',
    mandatory: true,
    beats: [
      N('不过半月，嵩山少林寺新立「铁腕法王」、独手震断三大邪派掌门神兵的消息便如惊雷般传遍大宋诸路与西夏大辽！'),
      N('中原黑道群邪闻风丧胆，纷纷约束门徒不得靠近河南府半步；朝廷枢密院亦遣使致贺，盛赞少林严整肃穆、堪为国之屏障。'),
    ],
    onFinishEffects: [openScene('scene_slq39_30', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_30: {
    id: 'scene_slq39_30',
    title: '第三十幕 · 扫叶微言',
    subtitle: '大雄宝殿 · 秋风过廊',
    mandatory: true,
    beats: [
      N('夜深人静，你巡视山门经过藏经阁外，只见昏黄月色下，一名灰衣老僧正静静清扫着阶前银杏叶。'),
      S('NPC-0101', '（头也未抬，淡淡一笑）“雷霆虽能涤污，莫忘铁骨之下，仍须留一寸佛心。方丈日后自会明白。”'),
      P('（驻足合十，微微一礼）“多谢前辈提点，弟子谨记。”'),
    ],
    onFinishEffects: [openScene('scene_slq39_31', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_31: {
    id: 'scene_slq39_31',
    title: '第三十一幕 · 厉兵秣马',
    subtitle: '嵩山少林寺 · 演武高台',
    mandatory: true,
    beats: [
      N('你深知真正的血战尚在前方。西北边关密报频传，西夏一品堂与星宿毒人正蠢蠢欲动。此刻整肃一新的千名铁血少林武僧，已如出鞘利刃，静候来犯强敌！'),
    ],
    onFinishEffects: [openScene('scene_slq39_32', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_32: {
    id: 'scene_slq39_32',
    title: '第三十二幕 · 铁腕法王',
    subtitle: '嵩山少林寺 · 终局归位',
    mandatory: true,
    beats: [
      N('【少林终局 · 铁腕法王】已然铸成！你以雷霆铁律涤清千年古刹、以金刚金身震断三魔神兵，登临少林掌门（Lv.5）尊位，威震中原与西域！'),
    ],
    choices: [
      {
        id: 'slq39_complete',
        label: '披【少林达摩袈裟】，正式登位少林护教铁腕法王（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 5, promoteOnly: true },
          { type: 'giveItem', itemId: 'ARM-004', qty: 1 },
          {
            type: 'branch',
            condition: { type: 'not', condition: { type: 'hasItem', itemId: 'WPN-013', qty: 1 } },
            thenEffects: [
              { type: 'giveItem', itemId: 'WPN-013', qty: 1 },
              toast('兼获少林武库镇派神兵【少林燃木戒刀】！', 'success', '铁腕法王'),
            ],
          },
          { type: 'giveCombatExp', amount: 1600, reason: '高台宣律涤清寺弊、金刚金身独挫三魔并登位铁腕法王' },
          { type: 'modifyRenown', delta: 300, reason: '登位嵩山少林寺护教铁腕法王，震慑天下黑道群邪' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'setFlag', flag: 'sl_ending', value: 'iron_dharma_king' },
          { type: 'completeQuest', questId: SHAOLIN_Q39_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《雷霆涤寺 · 铁腕法王》！晋升少林 Lv.5 铁腕法王，获天阶圣衣【少林达摩袈裟】，威望 +300！',
            'success',
            '铁腕法王',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_Q39_SCENES
