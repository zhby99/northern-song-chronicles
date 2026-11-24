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
    talk: '“少林内乱方兴、旧方丈刚被革位，正是群雄分拆嵩山武库的大好时机！小和尚，把镇寺绝学抄本交出来！”',
    stats: { hp: 5150, mp: 4800, agi: 82, res: 73 },
    talents: { bone: 84, comprehension: 76, charm: 34 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-091', move2: 'MA-107' },
    learnedArts: [
      { artId: 'MA-026', level: 9 },
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
    talk: '“嘿嘿，我这玄冥乌金鞭专破少林护体硬功！看你这秃驴拿什么挡！”',
    stats: { hp: 4480, mp: 4200, agi: 80, res: 69 },
    talents: { bone: 79, comprehension: 74, charm: 28 },
    equippedArts: { neigong: 'MA-081', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
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
    equippedArts: { neigong: 'MA-081', move1: 'MA-115', move2: 'MA-125' },
    learnedArts: [
      { artId: 'MA-081', level: 8 },
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
      N('{reignYear}深秋，冷霜压檐，铁磬长鸣。玄慈破戒旧案撕开了少林三十余年的温情面纱，更暴露出寺内部分知客、执事借宽仁之机虚报香火、私通外豪的沉疴积弊。三百名戒律院铁杖武僧已在殿外列成黑压压的铜墙铁壁。'),
      S('NPC-0156', '（玄痛身披铁灰直裰，将乌沉玄铁法杖递至你手，目光如刀）“师侄，乱世须用重典，沉疴必下猛药！你既力排众议主张以铁律肃清山门，今日四十八房皆在殿外候命，便由你登台执杖宣律！”'),
      S('NPC-0134', '（玄寂合十沉声附议）“外有辽夏窥伺，内有邪魔觊觎。此刻若仍姑息宽纵，不出三载，千年祖庭必毁于内溃！”'),
      S('NPC-0112', '（早已卸去袈裟立于佛前，沧桑而平静）“老衲一生宽纵过甚，终铸大错。今日你以铁腕涤寺，老衲甘愿受罚，绝无怨言。”'),
      S('NPC-0127', '（玄难长叹退后半步，声音微哑）“只望师侄念在师兄三十年护寺苦劳，留他一条性命，令其入后山闭死关忏悔余生……”'),
    ],
    choices: [
      {
        id: 'slq39_accept_thunder',
        label: '【霹雳宣律 · 绝不姑息】执玄铁法杖登台监刑，当众革去玄慈方丈法位以震慑内外',
        subLabel: '正式开启终局《雷霆涤寺 · 铁腕法王》',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q39_QUEST_ID, stepId: 'iron_verdict' },
          setStep(SHAOLIN_Q39_QUEST_ID, 'iron_verdict'),
          { type: 'setFlag', flag: 'sl_q39_verdict_triggered', value: true },
          { type: 'setFlag', flag: 'sl_q39_verdict_tone', value: 'thunder' },
          toast('已开启终局《雷霆涤寺 · 铁腕法王》！执杖登台宣律！', 'talk', '雷霆涤寺'),
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
                { type: 'flag', flag: 'sl_karma_wrath', op: 'gte', value: 8 },
              ],
            },
            thenEffects: [openScene('scene_slq39_02a', SHAOLIN_Q39_QUEST_ID)],
            elseEffects: [openScene('scene_slq39_02b', SHAOLIN_Q39_QUEST_ID)],
          },
        ],
      },
      {
        id: 'slq39_accept_strict_mercy',
        label: '【法严情存 · 闭关赎罪】应允玄难留其残生，依法杖责革位、永禁后山达摩洞面壁思过',
        subLabel: '正式开启终局《雷霆涤寺 · 铁腕法王》',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q39_QUEST_ID, stepId: 'iron_verdict' },
          setStep(SHAOLIN_Q39_QUEST_ID, 'iron_verdict'),
          { type: 'setFlag', flag: 'sl_q39_verdict_triggered', value: true },
          { type: 'setFlag', flag: 'sl_q39_verdict_tone', value: 'strict_mercy' },
          toast('已开启终局《雷霆涤寺 · 铁腕法王》！执杖登台宣律！', 'talk', '雷霆涤寺'),
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
                { type: 'flag', flag: 'sl_karma_wrath', op: 'gte', value: 8 },
              ],
            },
            thenEffects: [openScene('scene_slq39_02a', SHAOLIN_Q39_QUEST_ID)],
            elseEffects: [openScene('scene_slq39_02b', SHAOLIN_Q39_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq39_02a: {
    id: 'scene_slq39_02a',
    title: '第二幕 · 怒目心劫',
    subtitle: '大雄正殿 · 监刑法台（旧账与业报回响）',
    mandatory: true,
    beats: [
      N('你手握冰冷沉重的玄铁法杖步出殿门，朔风卷起青灰直裰。{ifFlag:sl_xuanjing_debt|刹那间，昔年外门香火铜炉前焚毁知客私册的滚滚黑烟竟又掠过心头——当年被迫向腐朽低头埋下的心魔，今日终于到了由你亲手斩断根株、彻清知客千年积弊的时刻！|回望这一路自罗汉、戒律杀出重围的血火长途，你比寺中任何人都更明白：唯有以怒目金刚之雷霆杀伐护教，方能保古刹不堕！}'),
      S('NPC-0156', '（步于你身侧半步，低声沉赞）“师侄一路行事凌厉如霜、嫉恶如仇，这根监刑玄铁法杖握在你手中，远比握在老衲手里更具慑服天下之威！”'),
      P('（冷眸俯瞰丹墀下两千僧众与四方观礼豪客，字字如金铁交击）“佛门有菩萨低眉，亦有金刚怒目！不施霹雳手段，何以显菩萨心肠？今日便由我斩尽旧日优柔与积弊，重铸少林铁骨！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_03', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_02b: {
    id: 'scene_slq39_02b',
    title: '第二幕 · 重典起势',
    subtitle: '大雄正殿 · 监刑法台',
    mandatory: true,
    beats: [
      N('寒风猎猎，三百名戒律院铁杖武僧齐齐顿杖，肃杀之气令前来观礼的各路江湖豪客无不心头一凛。'),
      P('（接过玄痛手中玄铁法杖，缓步踏上丹墀高台，声音冷冽如霜）“佛门有菩萨低眉，亦有金刚怒目！今日若不以重典革旧弊、立铁律，明日少林便要在内溃与外侮之中灰飞烟灭！”'),
      S('NPC-0134', '（玄寂朗声传谕）“四十八房诸院弟子听令——戒律重典已开，敢有哗变徇私者，立按寺规严惩！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_03', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_03: {
    id: 'scene_slq39_03',
    title: '第三幕 · 高台宣律',
    subtitle: '大雄正殿 · 丹墀高台',
    illustrationUrl: '/assets/quests/sl_39_iron_verdict.jpg',
    illustrationCaption: '大雄宝殿高台 · 主角手执玄铁法杖宣读少林铁律，监刑杖责玄慈并革去其方丈法位',
    mandatory: true,
    beats: [
      N('你猛然将玄铁法杖重顿高台——“轰”的一声，厚重青石板应声震裂三尺！'),
      P('（声如洪钟震彻少室山谷）“少林清规第一条：上自方丈首座，下至烧火行童，犯淫戒而乱寺纲者，杖责一百、革去法职、永禁思过！今前任方丈玄慈自承旧罪，本座奉四十八房公议，依法监刑！”'),
      N('玄慈坦然伏于法毯，戒律院执刑僧齐声喝数，玄铁重杖一记记砸落，杖杖见血！满山屏息，四方江湖豪客骇然变色——谁也没想到少林寺竟真有如此霹雳手腕，当众革去一代方丈法位！'),
      S('NPC-0112', '（挨满百杖，浑身血汗交加却眼神清明，艰难抬首望向高台）“阿弥陀佛……好一个雷霆手段……少林有如此铁律，千年不倒矣……”'),
      P('（合十肃然宣判）“刑满！即日起革去玄慈方丈法位、收回方丈印信与达摩袈裟，敷药护送至后山达摩洞闭死关终生忏悔！既全佛门不杀之戒，亦彰千年清规之威！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_04', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_04: {
    id: 'scene_slq39_04',
    title: '第四幕 · 锁拿蠹虫',
    subtitle: '大雄宝殿 · 东厢告急',
    mandatory: true,
    beats: [
      N('戒律院高僧为玄慈敷上大还金创药，搀扶这位统领中原武林三十载的老方丈步入后山幽谷。玄慈转过山坳前，最后回望高台上青衫如铁的你，深深合十致意。'),
      S('NPC-0156', '（玄痛神色陡寒，快步近前急报）“师兄罪业已定，但寺内借其宽仁贪墨香火、私通外魔的蛀虫正狗急跳墙！知客执事【慧贪】与几名徇私执事此刻正在东厢碑廊藏经橱焚毁暗账！”'),
      S('NPC-0134', '（玄寂冷哼一声）“罗汉堂精锐已将东厢团团围死，一只苍蝇也飞不出去！”'),
      P('（寒芒迸射，玄铁法杖直指东厢）“好大的狗胆！方丈尚且受杖革位，区区知客贪僧竟敢毁证灭迹？随我直扑东厢藏经橱！”'),
    ],
    choices: [
      {
        id: 'slq39_go_purge',
        label: '直扑【东厢碑廊 · 藏经橱】，灰烬夺册雷霆整肃积弊！',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q39_QUEST_ID, 'purge_corrupt'),
          toast('请前往【东厢碑廊 · 藏经橱】雷霆整肃戒律与知客多年积弊！', 'talk', '涤清积弊'),
        ],
      },
    ],
  },

  scene_slq39_05: {
    id: 'scene_slq39_05',
    title: '第五幕 · 灰烬夺册',
    subtitle: '东厢碑廊 · 藏经橱（整肃古刹积弊三策）',
    mandatory: true,
    beats: [
      N('你一脚踹开朱漆木门，袖袍卷起刚猛罡风瞬间震灭炭盆烈火，将半焦的厚厚私账尽数夺入掌中！知客执事【慧贪】与三名戒律院徇私执事面如死灰，扑通跪地筛糠般叩头求饶。'),
      S(SPEAKER_CORRUPT_MONK, '（颤声涕泪横流）“师叔饶命！弟子只是一时猪油蒙心，私收了河东赤练堂、太行黑水帮、淮南断魂门几千两黑银，替他们打探过今日公审时辰与寺中布防……”'),
      N('你冷眸翻阅焦边暗账，赫然见其中牵连甚广——上至各省下院田租药庄的历年虚报，下至被裹挟记账的十余名寒门小僧！{ifFlag:sl_xuanjing_debt|看着纸页间那枚再熟悉不过的知客暗记，昔年焚账收银的心魔此刻轰然碎裂——今日由你亲定整肃力度，彻底了断这桩宿业！|玄痛怒发冲冠、铁杖砸地，静候你亲口裁定整肃古刹积弊的铁腕方略！}'),
    ],
    choices: [
      {
        id: 'slq39_purge_audit',
        label: '【雷霆彻查 · 追缴军资】逐页核查知客院与各省下院暗账，连根追缴贪墨赃银充作僧兵军资！',
        subLabel: '需算术 ≥ 55 或策论 ≥ 65 · 彻底拔清宿弊，额外收获寺库军资厚赏',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '算术', min: 55 },
            { type: 'skillAtLeast', key: '策论', min: 65 },
          ],
          hint: '需算术 ≥ 55 或策论 ≥ 65',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q39_purge_policy', value: 'audit' },
          openScene('scene_slq39_06', SHAOLIN_Q39_QUEST_ID),
        ],
      },
      {
        id: 'slq39_purge_lenient',
        label: '【首恶必办 · 胁从宽宥】废慧贪等首恶逐山送官，宽宥受胁旧吏令其戴罪立功重理田亩！',
        subLabel: '刚中带仁，稳住各房人心而不伤寺脉元气',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_purge_policy', value: 'lenient' },
          openScene('scene_slq39_06', SHAOLIN_Q39_QUEST_ID),
        ],
      },
      {
        id: 'slq39_purge_burn_law',
        label: '【焚尽旧账 · 重订铁律】一把火斩断陈年烂账瓜葛，亲立《少林铁律十二条》违者立诛！',
        subLabel: '快刀斩乱麻，以雷霆新法开启少林全新纪元',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_purge_policy', value: 'burn_new_law' },
          openScene('scene_slq39_06', SHAOLIN_Q39_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq39_06: {
    id: 'scene_slq39_06',
    title: '第六幕 · 法堂新颜',
    subtitle: '东厢碑廊 → 西院急报',
    illustrationUrl: '/assets/quests/sl_39_iron_hall.jpg',
    illustrationCaption: '东厢碑廊 · 主角雷霆查封暗账、手书《少林重修铁律十二条》，森严法堂气象一新',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q39_purge_policy=audit|你当场依账核对各省下院田庄虚报，一夜追缴贪墨黑银数千两悉数拨入罗汉堂充作僧兵军资，铁算雷霆令全寺贪蠹闻风丧胆！|}{ifFlagEq:sl_q39_purge_policy=lenient|你当众废去慧贪等四名首恶武功押交河南府治罪，同时宽宥十余名受胁小僧令其戴罪整理田亩账册，满寺弟子既畏铁律又感公心！|}{ifFlagEq:sl_q39_purge_policy=burn_new_law|你废除慧贪等首恶僧籍逐出山门，旋即将陈年烂账付之一炬，挥毫在东厢石碑前写下字字如刀的《少林重修铁律十二条》，凡再敢徇私通敌者绝不姑息！|}'),
      N('十二条铁律高悬碑廊，全寺风气为之一肃！正当众僧凛然整衣之际，西侧钟鼓禅院骤然炸响三声刺耳怪啸与兵刃碰撞巨响！'),
      N('一名罗汉堂武僧急奔来报：“启禀长老！河东赤练刀主【殷无咎】、太行玄冥鞭王【杜阴山】、淮南血手铁剑【莫断魂】三名邪派掌门果然收到慧贪密信，率百余邪徒打伤守僧，闯入钟鼓禅院演武坪叫阵！”'),
      S('NPC-0134', '（玄寂冷哼起身）“三名邪派掌门联手趁火打劫，老衲立刻点齐十八罗汉阵迎敌！”'),
      P('（抬手止住玄寂，衣袍在劲风中猎猎翻飞，眉宇傲然如怒目明王）“不必动用罗汉阵！少林刚立铁律，正缺三块试刀石来震慑天下宵小——这三魔，便由我一人去会！”'),
    ],
    choices: [
      {
        id: 'slq39_go_west',
        label: '孤身踏入【钟鼓禅院 · 演武坪】，以金刚金身独战三大邪派掌门！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q39_QUEST_ID, 'shatter_three_masters'),
          toast('三名邪派掌门正在【钟鼓禅院 · 演武坪】联手逼宫！速往震断其兵刃！', 'warn', '金刚断刃'),
        ],
      },
    ],
  },

  scene_slq39_07: {
    id: 'scene_slq39_07',
    title: '第七幕 · 邪主逼宫',
    subtitle: '钟鼓禅院 · 演武坪（宗师级独战三魔）',
    mandatory: true,
    beats: [
      N('你孤身负手步入钟鼓禅院演武坪，四周古柏在凛冽杀气中簌簌落叶。三名凶焰滔天的邪派掌门横持神兵、呈品字形封住去路。'),
      S(SPEAKER_RED_BLADE, '（将九环赤练大刀猛插青石，狂傲大笑）“哈哈！玄慈刚被你们自己废了，群龙无首的少林寺还敢关门整顿？把少林武库钥匙和七十二绝技抄本交出来，老子饶你们全寺不死！”'),
      S(SPEAKER_DARK_WHIP, '（抖动漆黑乌金长鞭，啪的一声抽裂石柱）“我这玄冥乌金鞭专破少林护体硬功！三大掌门联手，看你这狂妄小僧拿什么挡！”'),
      S(SPEAKER_BLOOD_SWORD, '（精钢铁剑斜指你咽喉，阴恻恻冷笑）“少林老秃驴都死绝了不成？派你一人送死，先尝尝老子的断魂快剑！”'),
      P('（体内少林至阳真气轰然鼓荡，周身隐现淡金护体罡气，飘落秋叶在三尺外尽化齑粉）“三个跳梁小丑，也敢在达摩祖庭大放厥词？今日不震断尔等兵刃，本座誓不回殿！”'),
    ],
    choices: [
      {
        id: 'slq39_fight_shatter_first',
        label: '【金刚不坏 · 震刃破气】开场一喝催发金刚罡气震碎莫断魂长剑，跳过莫断魂连战殷无咎、杜阴山！',
        subLabel: '需《金刚不坏体神功》≥ 3 重或先天根骨 ≥ 80 · 震胆先废一魔，车轮连战余下双魔',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'learnedArtAtLeast', artId: 'MA-018', minLevel: 3 },
            { type: 'talentAtLeast', key: '根骨', min: 80 },
          ],
          hint: '需《金刚不坏体神功》≥ 3 重或先天根骨 ≥ 80',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q39_battle_tactic', value: 'shatter_first' },
          toast('金刚不坏罡气轰然外放！莫断魂刺来铁剑当场崩作数截、心胆俱裂踉跄退阵，你直逼殷无咎与杜阴山车轮决战！', 'success', '震刃破气'),
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q39_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRedBladeMaster() },
            extraOpponents: [{ kind: 'custom', npc: buildDarkWhipMaster() }],
            rule: 'story_trial',
            forbidEscapeReason: '少林新立铁律之日，岂容邪派掌门嚣张而退！',
            introText: '【金刚破气 · 车轮连战】先震碎莫断魂铁剑后，独战赤练刀主【殷无咎】与玄冥鞭王【杜阴山】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq39_08', SHAOLIN_Q39_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('殷无咎刀势刚猛、杜阴山鞭影刁钻，稳住金刚真气调息回满再战！', 'warn', '金刚断刃'),
            ],
          },
        ],
      },
      {
        id: 'slq39_fight_all_three',
        label: '【三魔齐来 · 老衲一并接下】正面车轮连战【殷无咎】【杜阴山】【莫断魂】三魔！（宗师车轮连战）',
        subLabel: '无门槛正攻 · 车轮连战三大邪派掌门，当场震断三人神兵',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_battle_tactic', value: 'all_three' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q39_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRedBladeMaster() },
            extraOpponents: [
              { kind: 'custom', npc: buildDarkWhipMaster() },
              { kind: 'custom', npc: buildBloodSwordMaster() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '少林新立铁律之日，岂容邪派掌门嚣张而退！',
            introText: '【车轮连战 · 金刚断刃】独战河东赤练刀主、太行玄冥鞭王与淮南血手铁剑！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq39_08', SHAOLIN_Q39_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('三大邪派掌门攻势凌厉异常，稳住金刚真气调息回满再战！', 'warn', '金刚断刃'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq39_08: {
    id: 'scene_slq39_08',
    title: '第八幕 · 金刚断刃',
    subtitle: '钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_39_break_blades.jpg',
    illustrationCaption: '钟鼓禅院演武坪 · 金刚不坏金身光芒大作，主角徒手震断三名邪派掌门神兵',
    mandatory: true,
    beats: [
      N('五十余合惊天搏杀！面对邪主孤注一掷的绝命猛攻，你低喝一声佛号，金刚不坏金身催发至绝巅，浑身绽出宛如怒目明王般的炽盛金芒！'),
      N('{ifFlagEq:sl_q39_battle_tactic=shatter_first|莫断魂的血手铁剑早先已被你金刚罡气震作废铁；此刻你反手一扯令杜阴山乌金长鞭寸寸崩断，再以一记至阳伏魔神掌正面震断殷无咎九环赤练刀，半截刀身倒飞插进十丈外石壁！|“锵！咔嚓！崩！”三声裂金碎铁爆响几乎同时炸开！莫断魂铁剑刺在你左肩罡气上寸寸崩断，杜阴山乌金鞭被反手扯碎，殷无咎九环赤练刀更被伏魔神掌正面震断、倒飞插进十丈石壁！}'),
      S(SPEAKER_RED_BLADE, '（望着手中冒烟断柄，面无人色魂飞魄散）“金刚不坏神功……徒手震断我等百炼神兵……怪物！少林竟藏着这等怪物！”'),
      P('（负手立于满地断刃之间，声音冷冽如霜）“滚下山去！告诉中原黑道诸派——今日少林革故鼎新、铁律森严！谁敢再犯少室山一草一木，断的便不只是兵刃，而是尔等项上人头！”'),
      N('三名邪派掌门连滚带爬逃窜下山，百余邪徒丢盔弃甲哭爹喊娘，从此数十年不敢再望嵩山一眼！'),
    ],
    onFinishEffects: [openScene('scene_slq39_09', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_09: {
    id: 'scene_slq39_09',
    title: '第九幕 · 铁血归心',
    subtitle: '钟鼓禅院 → 大雄宝殿前广场',
    mandatory: true,
    beats: [
      N('四周观战的戒律院、罗汉堂与达摩院千余武僧先是一静，随即爆发出山呼海啸般的佛号与顿杖轰鸣！'),
      S('NPC-0156', '（玄痛大步上前，铁面之上难掩激荡）“阿弥陀佛！师侄以铁律涤清门户，复以金刚金身独挫三魔，真乃我少林五百年一遇之护教法王！”'),
      S('NPC-0134', '（玄寂捧着武库宝刀匣朗声道）“大雄宝殿方丈法座空悬，唯师侄有此铁腕、威望与神功！老衲与玄痛师兄已传谕四十八房，恭请移步大雄正殿，披达摩袈裟、佩燃木戒刀，登位护教法王！”'),
      S(SPEAKER_IRON_MONKS, '（千余名武僧齐齐立杖肃立，声震嵩岳）“恭请护教法王登位方丈！重振少林千年雄风！”'),
    ],
    choices: [
      {
        id: 'slq39_go_enthrone_blade',
        label: '【降魔宝刃 · 护教除邪】颔首受印，宣称「兵刃握于护法之手便是降魔杵」，步入大雄正殿！',
        subLabel: '前往大雄正殿披达摩袈裟登位铁腕法王',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_enthronement_vow', value: 'blade' },
          setStep(SHAOLIN_Q39_QUEST_ID, 'iron_enthronement'),
          toast('请前往【大雄正殿 · 佛前蒲团】披达摩袈裟登位少林护教铁腕法王！', 'success', '铁腕法王'),
        ],
      },
      {
        id: 'slq39_go_enthrone_army',
        label: '【整训铁僧 · 御敌北疆】励兵聚心，誓以千年少林护教僧兵迎接北辽西夏风暴，步入大雄正殿！',
        subLabel: '前往大雄正殿披达摩袈裟登位铁腕法王',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_enthronement_vow', value: 'army' },
          setStep(SHAOLIN_Q39_QUEST_ID, 'iron_enthronement'),
          toast('请前往【大雄正殿 · 佛前蒲团】披达摩袈裟登位少林护教铁腕法王！', 'success', '铁腕法王'),
        ],
      },
    ],
  },

  scene_slq39_10: {
    id: 'scene_slq39_10',
    title: '第十幕 · 铁腕法王',
    subtitle: '嵩山少林寺 · 大雄正殿 · 护教登座',
    illustrationUrl: '/assets/quests/sl_39_dharma_king.jpg',
    illustrationCaption: '大雄宝殿 · 玄痛、玄寂率四十八房拥戴主角披《少林达摩袈裟》登位少林护教铁腕法王',
    mandatory: true,
    beats: [
      N('夕阳如血，将大雄宝殿金瓦映照得威严无匹。殿内玄痛亲捧镇寺天阶圣衣【少林达摩袈裟】，玄寂奉上象征降魔护教的【少林燃木戒刀】仪仗，齐步至你身前。'),
      S('NPC-0156', '（沉声宣礼）“少林护教新方丈，上承达摩衣钵，下握戒律雷霆！请披天阶圣衣【少林达摩袈裟】！”'),
      N('你反手振披古朴厚重的绯红金纹袈裟，大步踏上方丈法座！铜钟齐鸣，威压如岳，玄痛、玄寂、玄难、玄渡、玄生及四十八房高僧齐齐合十行礼：“阿弥陀佛！恭迎护教法王登位！”'),
      S('NPC-0134', '（玄寂恭呈武库宝刀匣）“法王以金刚手段护持禅林，若尚未佩执本寺镇派神兵【少林燃木戒刀】，便请一并执掌，以备日后斩妖除魔之用！”'),
    ],
    onFinishEffects: [openScene('scene_slq39_11', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_11: {
    id: 'scene_slq39_11',
    title: '第十一幕 · 法王国策',
    subtitle: '大雄正殿 · 护教立制（法王登基国策抉择）',
    mandatory: true,
    beats: [
      N('不过数日，嵩山少林新立「铁腕法王」、徒手震断三大邪派掌门神兵的消息便如惊雷传遍大宋诸路与辽夏边疆！黑道群邪闻风敛迹，朝廷枢密院亦遣使致贺，盛赞少林严整肃穆、堪为国之屏障。'),
      S('NPC-0156', '（立于阶下拱手请示）“法王，如今寺内积弊既除、四方震动，唯北辽暗桩与西夏一品堂仍虎视中原。不知法王定下何等治寺长策，以统摄少林新气象？”'),
      N('满殿四十八房执事凝神静候。你手按方丈法印，目眺山门之外翻涌风云，亲定铁腕法王治寺国策——'),
    ],
    choices: [
      {
        id: 'slq39_policy_iron',
        label: '【铁腕护法 · 震慑辽夏】编练常备护教僧兵、广铸刀杖日夜操演伏魔大阵，以雷霆军威震慑外敌！',
        subLabel: '威震辽夏黑道，大增江湖威望与怒目杀业',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_king_policy', value: 'iron_deterrence' },
          openScene('scene_slq39_12', SHAOLIN_Q39_QUEST_ID),
        ],
      },
      {
        id: 'slq39_policy_balance',
        label: '【刚柔并济 · 重振清誉】铁律对外、仁心对内，严明考绩并重开药王院普济四方，令祖庭威德并彰！',
        subLabel: '威德兼备凝聚禅林人心，增进侠义与禅心慈悲',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q39_king_policy', value: 'balance_prestige' },
          openScene('scene_slq39_12', SHAOLIN_Q39_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq39_12: {
    id: 'scene_slq39_12',
    title: '第十二幕 · 后山扫叶',
    subtitle: '大雄宝殿后廊 → 藏经阁外月夜',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q39_king_policy=iron_deterrence|法谕颁行，罗汉堂与戒律院昼夜操演伏魔大阵，铁杖寒光映彻少室峰，辽夏细作无不骇然远遁！|法谕颁行，少林对外铁律森严不可侵犯，对内药王济世、赏罚清朗，禅林威德之盛竟远胜往昔！}'),
      N('大典毕，你独步殿后廊下，遥望后山烟雾缭绕的达摩面壁石洞。玄慈已在那里闭死关忏悔，昔日温厚守成的旧时代已彻底落幕。“前辈以慈悲守成，晚辈以铁腕辟新；功过是非，留待百年后人评说罢。”'),
      N('夜深人静，你巡视山门经过藏经阁外，昏黄月色下，一名灰衣老僧正拄着竹帚静静清扫阶前银杏黄叶。'),
      S('NPC-0101', '（头也未抬，声音温和如水却直透心底）“雷霆虽能涤污，莫忘铁骨之下，仍须留一寸佛心。方丈日后自会明白。”'),
      P('（停步肃容，合十微微一礼）“多谢前辈提点，弟子谨记。”'),
    ],
    onFinishEffects: [openScene('scene_slq39_13', SHAOLIN_Q39_QUEST_ID)],
  },

  scene_slq39_13: {
    id: 'scene_slq39_13',
    title: '第十三幕 · 厉兵秣马',
    subtitle: '嵩山少林寺 · 终局归位',
    mandatory: true,
    beats: [
      N('你深知真正的血战尚在前方。西北边关密报频传，西夏一品堂与星宿毒人正蠢蠢欲动；此刻整肃一新的千名少林铁血武僧，已如出鞘利刃静候来犯强敌！'),
      N('你披紧肩头流转金辉的【少林达摩袈裟】，手按法印俯瞰灯火连绵的千年古刹，心如铁石、意气冲霄。'),
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
            condition: {
              type: 'all',
              conditions: [
                { type: 'not', condition: { type: 'hasItem', itemId: 'WPN-013', qty: 1 } },
                { type: 'not', condition: { type: 'questStatus', questId: 'QST-SECT-01-22', status: 'completed' } },
              ],
            },
            thenEffects: [
              { type: 'giveItem', itemId: 'WPN-013', qty: 1 },
              toast('兼获少林武库镇派神兵【少林燃木戒刀】！', 'success', '铁腕法王'),
            ],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q39_purge_policy', op: 'eq', value: 'audit' },
            thenEffects: [
              { type: 'giveSilver', amount: 150, reason: '雷霆彻查知客院与各省下院暗账，追缴贪墨充作僧兵军资分赏' },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q39_purge_policy', op: 'eq', value: 'lenient' },
                thenEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 }],
                elseEffects: [{ type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 }],
              },
            ],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q39_king_policy', op: 'eq', value: 'iron_deterrence' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
              { type: 'modifyRenown', delta: 50, reason: '法王登基誓以铁腕护法震慑北辽西夏，军威震世' },
            ],
            elseEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              { type: 'modifyChivalry', delta: 50, reason: '法王登基刚柔并济、重开药王济世，威德并彰' },
            ],
          },
          { type: 'giveCombatExp', amount: 1600, reason: '高台宣律涤清寺弊、金刚金身独挫三魔并登位铁腕法王' },
          { type: 'modifyRenown', delta: 300, reason: '登位嵩山少林寺护教铁腕法王，震慑天下黑道群邪' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'setFlag', flag: 'sl_ending', value: 'iron_dharma_king' },
          { type: 'setFlag', flag: 'sl_xuanci_deposed', value: true },
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
