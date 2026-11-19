import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE03_QUEST_ID } from './shaolinSideGrainScaleQuest'

const SPEAKER_MERCHANT_JIA: StorySpeakerSpec = {
  kind: 'custom',
  name: '贾算盘',
  title: '登封恒丰粮行掌柜',
  factionName: '登封粮商',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_QIAN_DABANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱大棒',
  title: '恒丰粮行恶护院头目',
  factionName: '登封粮行打手',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_THUG_LISI: StorySpeakerSpec = {
  kind: 'custom',
  name: '麻脸李四',
  title: '恒丰粮行恶打手',
  factionName: '登封粮行打手',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_VILLAGE_HEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '周里正',
  title: '登封城关里正',
  factionName: '登封乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildQianDabang(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS03_QIAN_DABANG',
    name: '钱大棒',
    title: '粮行恶护院 · 钱大棒',
    realm: '三流中品',
    factionName: '登封粮行打手',
    sectRank: 0,
    sectRankLabel: '恶护院头目',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“少林寺的穷和尚也敢来恒丰粮行砸场子？尝尝老子这根熟铜裹头大棒的厉害！”',
    stats: { hp: 560, mp: 260, agi: 28, res: 16 },
    talents: { bone: 56, comprehension: 38, charm: 26 },
    equippedArts: {
      neigong: 'MA-179',
      qinggong: 'MA-197',
      move1: 'MA-193',
      move2: 'MA-186',
      move3: 'MA-204',
    },
    learnedArts: [
      { artId: 'MA-179', level: 4 },
      { artId: 'MA-197', level: 3 },
      { artId: 'MA-193', level: 4 },
      { artId: 'MA-186', level: 3 },
      { artId: 'MA-204', level: 3 },
    ],
  })
}

function buildThugLisi(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS03_THUG_LISI',
    name: '麻脸李四',
    title: '恒丰粮行恶打手',
    realm: '三流下品',
    factionName: '登封粮行打手',
    sectRank: 0,
    sectRankLabel: '粮行打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“关上院门！把这多管闲事的少林弟子打断腿扔出登封城！”',
    stats: { hp: 390, mp: 140, agi: 22, res: 12 },
    talents: { bone: 45, comprehension: 32, charm: 22 },
    equippedArts: {
      neigong: 'MA-199',
      qinggong: 'MA-218',
      move1: 'MA-204',
      move2: 'MA-191',
    },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-218', level: 2 },
      { artId: 'MA-204', level: 3 },
      { artId: 'MA-191', level: 2 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls03_01: {
    id: 'scene_sls03_01',
    title: '第一幕 · 斋粮告急',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山松风渐凉。你行至钟鼓禅院演武坪时，只见苦行僧虚清正对着一摞泛黄的斋堂粮簿愁眉深锁，脚边搁着两只空荡荡的粗麻米袋。'),
      S('NPC-0789', '“阿弥陀佛，师弟来得正好。近日外门添了不少新晋弟子，晨昏习武耗粮甚巨，可大寮米缸却比往年见底早了足足半月有余。”'),
      P('“师兄，寺中每季拨付的采粮香火银不是一文未少吗？怎会凭空短了半月口粮？”'),
      S('NPC-0789', '“贫僧也百思不得其解。这三年千僧秋粮皆是从登封县城『恒丰粮行』采办，每回过斗过秤皆当面点数，偏生运回大寮后怎么熬粥都觉得米粒不经吃。听闻师弟深谙算学，此番可愿随贫僧下山走一遭，细细核对斗秤账目？”'),
    ],
    onFinishEffects: [openScene('scene_sls03_02', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_02: {
    id: 'scene_sls03_02',
    title: '第二幕 · 领命校斛',
    subtitle: '钟鼓禅院石阶',
    mandatory: true,
    beats: [
      N('你接过虚清递来的旧粮簿翻阅片刻，但见每笔单价皆依官市时价，并无虚报，蹊跷之处十有八九藏在粮行的斗斛与杆秤之间。'),
      P('“师兄放心，凡器物作伪，必难逃尺度容积之算。我先往罗汉堂东庑核验寺中旧存的官颁铁斛寸尺，再顺手领根齐眉短棍防身，随后便与师兄一道下山！”'),
      S('NPC-0789', '“善哉！师弟行事周密。贫僧这就去雇妥下山拉粮的骡车，在东庑院外候你同行。”'),
    ],
    choices: [
      {
        id: 'sls03_accept',
        label: '领下采粮核账之托，前往罗汉堂东庑校斛备棍',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_SIDE03_QUEST_ID, stepId: 'depart_dengfeng' },
          setStep(SHAOLIN_SIDE03_QUEST_ID, 'depart_dengfeng'),
          toast('已接下登封买粮之托！请前往【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】校斛领棍下山。', 'talk', '登封买粮'),
        ],
      },
    ],
  },

  scene_sls03_03: {
    id: 'scene_sls03_03',
    title: '第三幕 · 登封粮市',
    subtitle: '登封县城 · 恒丰粮行',
    mandatory: true,
    beats: [
      N('你在罗汉堂东庑细细量过官颁铁斛的口宽、底径与内深，记熟于心后提棍随虚清下山。晌午时分，二人已抵登封县城西街的「恒丰粮行」。'),
      N('粮行门前车马喧阗，掌柜贾算盘身着绸面团花袄，晃着满手油光迎出柜台，满面堆笑地向虚清合十作揖。'),
      S(SPEAKER_MERCHANT_JIA, '“哎哟，虚清大师大驾光临！今年嵩南新稻颗粒饱满，小号早早替贵寺留出五十石上等糙米！伙计们，快拿咱家的大木斛替大师过斗装车，休叫佛爷久等！”'),
      S('NPC-0789', '“阿弥陀佛，有劳贾掌柜费心。这位乃敝寺师弟，今日特来随同过目验收。”'),
      S(SPEAKER_MERCHANT_JIA, '（眼中闪过一丝异色，随即笑道）“好说，好说！咱恒丰粮行在登封做了二十年老字号，童叟无欺，小师傅尽管瞧着便是！”'),
    ],
    onFinishEffects: [openScene('scene_sls03_04', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_04: {
    id: 'scene_sls03_04',
    title: '第四幕 · 斗秤生疑',
    subtitle: '恒丰粮行粮仓',
    mandatory: true,
    beats: [
      N('三名赤膊伙计吆喝着将新稻舀入一只黑漆包铁的大木斛，刮平斛口后连斛带米往大杆秤上一挂，秤尾高高翘起，口中高唱「足秤一石！」。'),
      N('你不动声色地绕到粮堆旁，以目测步量比对木斛外形：这木斛外壁看去与官颁铁斛一般无二，可倒入麻袋后，谷堆却比官斛所盛明显矮了一截！'),
      N('你又俯身拈起一把新稻掂量干湿，暗中默算稻谷比重与方圆台容积——若按此等饱满干稻折算，一官石的体积绝不止眼前这点堆头，偏偏连斛过秤时却分毫不轻！'),
      P('（心下雪亮，低声对虚清道）“师兄，问题出在那只黑漆木斛与大杆秤上！那木斛内底垫高了近两寸，每石凭空短少足足两斗，可过秤时却偏偏不轻，定是斛底夹层里灌了极沉的暗物压秤！”'),
    ],
    onFinishEffects: [openScene('scene_sls03_05', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_05: {
    id: 'scene_sls03_05',
    title: '第五幕 · 破斛显汞',
    subtitle: '恒丰粮行大堂',
    illustrationUrl: '/assets/quests/sl_s03_grain_scale.jpg',
    illustrationCaption: '登封粮行 · 算术当场识破夹层灌水银暗秤，拆穿奸商克扣',
    mandatory: true,
    beats: [
      N('趁伙计正要倾倒第三斛新稻，你一步跨上粮台，以齐眉棍轻抵木斛边缘，朗声喝道：「且慢过斗！」满堂买粮的登封乡邻顿时静了下来。'),
      P('“贾掌柜，官颁一石铁斛口方底阔、内深几何，我方才已拿木尺量过。你这只黑漆木斛外高相符，内腔却浅了寸许，算来每石足足少装了两斗稻谷！既少了两斗米，过秤时秤星却纹丝不差，莫非你这木斛底板里藏了见不得人的沉铁水银？”'),
      S(SPEAKER_MERCHANT_JIA, '（脸色骤变，厉声强辩）“休得血口喷人！你一个小和尚凭空污蔑老字号商誉，信不信我报官拿你！”'),
      N('你冷哼一声，手腕沉劲，齐眉棍尾朝黑漆木斛底板「啪」地一震！只听咔嚓脆响，双层暗板应声裂开，滚滚银亮水银顺着木缝哗啦啦淌落青砖，在秋阳下泛起刺目寒光！'),
      S(SPEAKER_VILLAGE_HEAD, '（挤在门外瞧热闹的周里正与众乡民轰然大哗）“天杀的黑心奸商！竟在斛底夹层灌水银压秤！难怪咱们年年来这买米总不够吃！”'),
      S(SPEAKER_MERCHANT_JIA, '（见丑事彻底败露，索性撕破脸皮尖叫）“反了反了！钱大棒！李四！给我关上大门，把这两个多事的秃驴连人带账本统统拿下！”'),
    ],
    onFinishEffects: [openScene('scene_sls03_06', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_06: {
    id: 'scene_sls03_06',
    title: '第六幕 · 恶奴拦门',
    subtitle: '恒丰粮行后院（1v2 实战）',
    mandatory: true,
    beats: [
      N('两扇厚重柏木院门轰然闭拢！一名膀大腰圆的恶护院提着熟铜裹头大棒大步跨出，身旁跟着提着杀猪短刀的麻脸打手，一左一右将你与虚清围在粮袋堆前！'),
      S(SPEAKER_QIAN_DABANG, '“少林寺的外门小子，敢砸贾掌柜的饭碗，今日叫你竖着进来横着出去！”'),
      S(SPEAKER_THUG_LISI, '“大哥别跟他废话，先把那本旧粮账抢回来烧了！”'),
      P('（横棍护在虚清与旧粮账前，眼神如电）“师兄护好账簿与暗斛证物，这两个仗势欺人的恶奴交由我来料理！”'),
    ],
    choices: [
      {
        id: 'sls03_fight_thugs',
        label: '稳住马步，以少林武学迎战钱大棒与麻脸李四！（1v2 实战）',
        subLabel: '对手：钱大棒（三流中品）与麻脸李四（三流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQianDabang() },
            extraOpponents: [{ kind: 'custom', npc: buildThugLisi() }],
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '虚清师兄与暗斛证物皆在身后，绝不可退缩半步！',
            deathTitle: '饮恨恒丰院',
            deathDetail: '你在登封恒丰粮行院内力战恶护院钱大棒与打手不敌，重伤身亡。',
            introText: '【1v2 护账破恶】迎战恒丰粮行恶护院头目【钱大棒】与打手【麻脸李四】！',
            onWin: [openScene('scene_sls03_07', SHAOLIN_SIDE03_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_sls03_07: {
    id: 'scene_sls03_07',
    title: '第七幕 · 追银护斋',
    subtitle: '恒丰粮行院落',
    illustrationUrl: '/assets/quests/sl_s03_thug_brawl.jpg',
    illustrationCaption: '追银护斋 · 1v2 痛扁粮行恶护院，追回百两差额纹银',
    mandatory: true,
    beats: [
      N('你身法一转避开李四劈来的短刀，齐眉棍顺势下扫，一记「横扫千军」正中李四胫骨，打得他嗷呜惨叫滚进稻糠堆里！'),
      N('钱大棒怒吼着举起熟铜大棒当头砸下，你沉腰坐马不退反进，棍身贴棒滑入中门，顺势一记少林罗汉掌印在其胸口檀中，将这魁梧恶汉震得连退七步，噗通一声坐倒在米袋之间，虎口崩裂再也提不起兵器！'),
      S(SPEAKER_QIAN_DABANG, '（捂胸喘气，满脸骇然）“好……好沉的少林内劲！爷爷饶命，小人只是拿钱替贾掌柜看场子，再也不敢了！”'),
      S(SPEAKER_MERCHANT_JIA, '（早已吓得瘫软在柜台后，连连磕头）“大师饶命！小师傅饶命！小人一时鬼迷心窍，愿赔！小人全数退赔！”'),
    ],
    onFinishEffects: [openScene('scene_sls03_08', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_08: {
    id: 'scene_sls03_08',
    title: '第八幕 · 退赃赔银',
    subtitle: '登封县城恒丰粮行前',
    mandatory: true,
    beats: [
      N('院门重新大开，周里正带着几名登封乡绅与衙门巡检步入粮行。见青砖上赫然淌着水银，又见你摊开少林三年旧粮账逐笔核算，铁证如山，贾算盘再无半句抵赖之词。'),
      N('按三年来每石克扣两斗的细账一笔笔折算，贾算盘不仅当场从内库捧出一百两雪花纹银作为历年差额退赔，更老老实实借来县衙官颁铁斛，足斤足两重新过斗补足五十石新稻。'),
      S(SPEAKER_VILLAGE_HEAD, '（抚须叹服）“少林高徒果然文武双全！今日不仅护住了贵寺千僧口粮，更替咱们登封满城百姓除了这桩暗秤大害！”'),
      S('NPC-0789', '（双手合十，眉间郁气尽消）“阿弥陀佛，恶有恶报。周里正，这只灌汞暗斛便交予官府留作罪证，免得日后再有奸商效尤。”'),
    ],
    onFinishEffects: [openScene('scene_sls03_09', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_09: {
    id: 'scene_sls03_09',
    title: '第九幕 · 满载归山',
    subtitle: '少室山道',
    mandatory: true,
    beats: [
      N('夕阳西斜时，十余辆骡车满载饱满新稻，吱吱呀呀驶上少室山道。山门外轮值的外门沙弥见这批秋粮袋袋鼓胀、比往年足足多出两车，顿时喜出望外，纷纷奔走相告。'),
      S('NPC-0789', '“师弟，大寮执事已着人接管入仓。你且随贫僧回钟鼓禅院演武坪，将这笔追回的差银账目一并交割清楚。”'),
    ],
    choices: [
      {
        id: 'sls03_return_temple',
        label: '护送粮车入仓，返回钟鼓禅院演武坪向虚清复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE03_QUEST_ID, 'return_report'),
          toast('暗秤已破、百两差银与足秤秋粮已运回少林！请返回【钟鼓禅院 · 演武坪（sl_daxiong_west）】向虚清复命。', 'success', '登封买粮'),
        ],
      },
    ],
  },

  scene_sls03_10: {
    id: 'scene_sls03_10',
    title: '第十幕 · 斋堂飘香',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('暮鼓敲响，大寮方向飘来阵阵新米熬粥的清香。虚清在钟鼓禅院演武坪核毕新账，将一只沉甸甸的银袋郑重交到你手中。'),
      S('NPC-0789', '“方丈与执事长老听闻师弟下山以算学识破灌汞暗斛、又力挫粮行恶护院护回千僧口粮，赞你智勇双全、不辱佛门清名。”'),
      S('NPC-0789', '“追回的百两差银已由大寮另行记账贴补外门斋饭，执事特批这百两纹银与师门功勋赏予师弟，盼师弟日后勤修不辍、常怀护法之心！”'),
    ],
    choices: [
      {
        id: 'sls03_complete',
        label: '合十谢过虚清师兄，收下赏银与功勋（完成支线）',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 100, reason: '登封买粮破奸追银师门酬赏' },
          { type: 'addSectContribution', amount: 60 },
          { type: 'modifySkill', key: '算术', delta: 2 },
          { type: 'giveCombatExp', amount: 110, reason: '恒丰粮行力挫钱大棒与恶打手' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0789' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE03_QUEST_ID, outcome: 'completed' },
          toast('已完成《登封买粮 · 斗秤破奸》！获得纹银、师门贡献、算术进益与实战历练！', 'success', '登封买粮'),
        ],
      },
    ],
  },
}
