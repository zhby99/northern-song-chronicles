import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q28_QUEST_ID } from './shaolinPavilionShadowsQuest'

const SPEAKER_GRAY_MONK_SHADOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '灰衣老僧',
  title: '琉璃阁潜影 · 来历莫测',
  factionName: '未知高人',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_BLACK_SHADOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑衣夜行客',
  title: '藏经阁神秘黑影',
  factionName: '未知高人',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

function buildPavilionShadowOpponent(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ28_BLACK_SHADOW',
    name: '藏经阁黑衣夜影',
    title: '琉璃雨夜截击 · 试探五合',
    realm: '宗师下品',
    factionName: '未知高人',
    sectRank: 4,
    sectRankLabel: '蒙面宗师',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“少林小辈倒有几分眼力，可惜这五合之间，你连老夫衣角也摸不着！”',
    stats: { hp: 4180, mp: 3950, agi: 80, res: 68 },
    talents: { bone: 90, comprehension: 90, charm: 68 },
    equippedArts: {
      neigong: 'MA-060',
      qinggong: 'MA-097',
      move1: 'MA-044',
      move2: 'MA-083',
      move3: 'MA-085',
      move4: 'MA-018',
    },
    learnedArts: [
      { artId: 'MA-018', level: 8 },
      { artId: 'MA-060', level: 8 },
      { artId: 'MA-097', level: 8 },
      { artId: 'MA-044', level: 8 },
      { artId: 'MA-083', level: 8 },
      { artId: 'MA-085', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq28_01: {
    id: 'scene_slq28_01',
    title: '第一幕 · 七夕曝书',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('{reignYear}七月初七，正是少林寺一年一度「晒经曝书」大节。午后天色骤沉，少室山顶乌云压檐，西厢晒经校勘石台上铺陈的数百函唐宋贝叶孤本被狂风吹得哗啦翻卷。'),
      S('NPC-0498', '（抱着一摞《华严经》急步奔来，额头满是细汗）“{playerName}师弟来得正好！西南峰已起雷鸣，快帮我与虚光把这几匣最珍贵的唐抄孤本收进主阁二楼，切莫沾了半分雨水！”'),
      S('NPC-0648', '（合起竹匾，眉头紧锁望向主阁琉璃瓦顶）“奇怪……方才我搬运《般若心经》回东橱时，明明记得『般若』『禅定』两格的樟木插销是反锁着的，怎的松开了一指宽的缝隙？”'),
      P('（接过经匣，目光扫过石台青砖）“虚光师兄莫急，先把经卷抢收归橱。待雨势稍歇，我亲去主阁查验封条。”'),
    ],
    onFinishEffects: [openScene('scene_slq28_02', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_02: {
    id: 'scene_slq28_02',
    title: '第二幕 · 倾盆骤雨',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('话音刚落，一道惨白电光撕裂暮色，豆大雨点如铁珠般砸落青石台面。三人手脚麻利地将最后一匣贝叶经送入回廊避雨，衣衫已尽数湿透。'),
      S('NPC-0498', '（长舒一口气，抹去脸上雨水）“阿弥陀佛，总算没叫雨水浸坏半页经文。只是方才盘点书目时，我瞧见《般若掌图录》与《摩诃指注疏》的竹签次序竟被人挪动过半寸……”'),
      S('NPC-0648', '（压低声音，神色凝重）“并非今日才如此！近三五年来，每逢大雨晦夜，二楼经橱总有极淡的松烟墨香与陈年沉水气，可咱们去查时却连半个脚印都寻不见。”'),
    ],
    onFinishEffects: [openScene('scene_slq28_03', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_03: {
    id: 'scene_slq28_03',
    title: '第三幕 · 湿印疑踪',
    subtitle: '藏经阁 · 西厢石阶回廊',
    mandatory: true,
    beats: [
      N('你提过一盏防风琉璃罩灯，俯身细察西厢石台通往主阁的青石回廊。在廊柱阴影处，竟赫然留着半枚极浅的草鞋湿印——鞋尖窄而长，绝非少林制式僧履！'),
      P('（以指尖轻蘸湿印边缘泥沙，辨其干湿）“这枚足印落地不过两刻钟，且足底受力极轻，踏在青石上竟无半点水花溅痕——来人轻功已臻登峰造极之境！”'),
      S('NPC-0498', '（脸色微变）“莫非今夜暴雨掩声，那盗经高人又潜入藏经主阁了？咱们快去敲钟禀报戒律院！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_04', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_04: {
    id: 'scene_slq28_04',
    title: '第四幕 · 止钟暗察',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      P('（抬手按住虚广肩头，沉声道）“且慢！若此刻贸然鸣钟惊动全寺，来人轻功盖世，必在武僧合围前遁出少室山，反而打草惊蛇。你二人守住西厢门户与暗梯，切莫露声色，我独自提灯入主阁探个虚实！”'),
      S('NPC-0648', '（双手合十，神色肃然）“师弟如今已是本寺真传高手，可那盗经之人深不可测，千万不可硬拼，但求看清来路便好！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_05', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_05: {
    id: 'scene_slq28_05',
    title: '第五幕 · 提灯赴阁',
    subtitle: '藏经阁 · 雨幕长阶',
    mandatory: true,
    beats: [
      N('夜雨如瀑，重檐琉璃藏经主阁在电闪雷鸣中宛如一头沉默盘踞的青铜巨兽。你收束全身气息，将呼吸压至若有若无，踏着雨声节拍迈向主阁朱漆大门。'),
    ],
    choices: [
      {
        id: 'slq28_start_patrol',
        label: '敛息提灯，前往重檐琉璃藏经主阁夜探异动！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q28_QUEST_ID, stepId: 'night_pavilion_patrol' },
          setStep(SHAOLIN_Q28_QUEST_ID, 'night_pavilion_patrol'),
          toast('已开启《琉璃夜影 · 曝书惊变》！请前往重檐琉璃藏经主阁查探。', 'talk', '曝书惊变'),
          openScene('scene_slq28_06', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq28_06: {
    id: 'scene_slq28_06',
    title: '第六幕 · 阁中寂然',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁一层',
    mandatory: true,
    beats: [
      N('推开主阁侧扉，浓重的樟木与旧纸气息扑面而来。一层佛经大藏寂静无声，唯有窗外骤雨敲打琉璃檐角的噼啪乱响。'),
      N('你屏息倾听，忽然察觉二楼木地板深处传来一丝极其细微的「嗤嗤」声——并非虫蛀，而是两股沛然莫御的纯厚内力隔空相激、擦过经橱木棱的震颤！'),
      P('（心中剧震，暗暗提聚十成内功护住心脉）“二楼竟不止一人！是谁敢在少林藏经阁内动掌交手？”'),
    ],
    onFinishEffects: [openScene('scene_slq28_07', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_07: {
    id: 'scene_slq28_07',
    title: '第七幕 · 琉璃夜影',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    illustrationUrl: '/assets/quests/sl_28_rain_pavilion.jpg',
    illustrationCaption: '琉璃夜影 · 七夕暴雨夜藏经主阁，灰衣老僧与黑衣客无声对掌',
    mandatory: true,
    beats: [
      N('你沿旋梯无声掠上二楼。恰在此时，窗外惊雷乍亮，惨白电光透过雕花木棂倾泻而入——只见「七十二绝技」经橱前的狭长过道里，两道人影正凌空对掌！'),
      N('左首一人身披宽大灰布旧僧袍，身形瘦削却隐隐透出江南世家般的儒雅气度，双掌划弧似借力打力；右首一人黑衣蒙面、身躯魁伟如山，掌势雄浑刚猛，一举一动皆带北地苍狼般的惨烈霸气！'),
      N('更令你毛骨悚然的是：二人内力俱已登峰造极，双掌相交竟无半点爆响，只将周遭经橱里数十卷佛经震得齐齐浮起半寸，又随劲力收发悄然落回原位！'),
    ],
    onFinishEffects: [openScene('scene_slq28_08', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_08: {
    id: 'scene_slq28_08',
    title: '第八幕 · 双雄惊觉',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('你脚下木板微微一沉，虽轻如落羽，仍逃不过两位绝世高手的耳目！二人同时收掌倒退三步，目光如冷电般齐齐射向楼梯阴影处！'),
      S(SPEAKER_GRAY_MONK_SHADOW, '（沙哑嗓音刻意压低，听不出原声，只淡然一拂灰袖）“哼，少林小辈倒会挑时辰。今日之账，来日再算！”'),
      S(SPEAKER_BLACK_SHADOW, '（黑巾下双目寒芒暴涨，冷笑一声）“藏头露尾的老匹夫，跑得了和尚跑不了庙！——小和尚，滚开！”'),
      N('灰衣老僧身形如一缕青烟，撞开东窗破雨而去；黑衣高大客人则顺势一掌拍开西窗，欲借飞檐纵入后山松林！'),
    ],
    onFinishEffects: [openScene('scene_slq28_09', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_09: {
    id: 'scene_slq28_09',
    title: '第九幕 · 破窗截影',
    subtitle: '藏经阁 · 琉璃飞檐外',
    mandatory: true,
    beats: [
      P('（暴喝一声，足尖一点栏杆化作离弦之箭扑向西窗）“盗阅少林典籍，岂容尔等来去自如！留下名号来！”'),
      N('你借暴雨掩护连踏三道琉璃飞檐，竟硬生生截在黑衣夜行客落脚的古松枝头之前！那黑衣客见去路受阻，眼中闪过一丝讶色，随即反手一掌拍落松枝积雨，漫天雨箭迎面激射而来！'),
    ],
    onFinishEffects: [openScene('scene_slq28_10', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_10: {
    id: 'scene_slq28_10',
    title: '第十幕 · 松林雨战',
    subtitle: '藏经阁外松林 · 试探五合',
    illustrationUrl: '/assets/quests/sl_28_pine_chase.jpg',
    illustrationCaption: '松林雨幕 · 截击藏经阁黑衣夜影，五合之间惊见宗师绝威',
    mandatory: true,
    beats: [
      S(SPEAKER_BLACK_SHADOW, '（嗓音沉浑如闷雷，掌势虽未尽全力却已山崩海啸般压来）“好俊的少林真传！念你并非那姓慕容的奸贼一伙，老夫只试你五合——接得住便留你活口！”'),
      N('狂风卷雨，松涛怒吼！此人内力之雄厚宛如江海倒灌，五合之内须得全力周旋，窥其武学路数！'),
    ],
    choices: [
      {
        id: 'slq28_fight_shadow',
        label: '提聚毕生内力，与黑衣夜影在松林雨幕中交锋五合！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q28_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPavilionShadowOpponent() },
            rule: 'spar',
            maxRounds: 5,
            forbidEscapeReason: '黑衣夜影气机已锁死松林方圆三丈，唯有硬接五合方能脱身！',
            introText: '暴雨如注，藏经阁黑衣夜影掌风如潮袭来！切记稳守反击，熬过或击退这五合试探！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_11', SHAOLIN_Q28_QUEST_ID),
            ],
            onDraw: [
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_11', SHAOLIN_Q28_QUEST_ID),
            ],
            onLose: [
              openScene('scene_slq28_12', SHAOLIN_Q28_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_slq28_11: {
    id: 'scene_slq28_11',
    title: '第十一幕 · 掌风惊退',
    subtitle: '藏经阁外古松林',
    mandatory: true,
    beats: [
      N('第五合掌风轰然相撞，碗口粗的古松树干竟被气劲削去半边树皮！你虎口震裂，连退七步方稳住身形，而那黑衣夜行客却也微微一晃，眼中透出几分难以掩饰的赞叹。'),
      S(SPEAKER_BLACK_SHADOW, '（冷哼一声，却未再下杀手，反手将一蓬松针震向半空遮蔽视线）“少林寺新一代里，倒还真养出个有骨气的真传弟子！只是凭你今日修为，还管不了藏经阁里三十年的血海旧债！”'),
      N('话音犹在雨幕中回荡，黑衣夜行客已如大鹏展翅般掠过绝壁松梢，转瞬没入茫茫雨夜，再无踪影。'),
    ],
    onFinishEffects: [openScene('scene_slq28_13', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_12: {
    id: 'scene_slq28_12',
    title: '第十二幕 · 气劲震伤',
    subtitle: '藏经阁外古松林',
    mandatory: true,
    beats: [
      N('那黑衣夜行客的掌力沉雄霸道至极，你一时大意被其隔空掌风扫中肩头，整个人倒飞数丈跌入湿滑松针堆中，胸口气血翻涌不止。'),
      S(SPEAKER_BLACK_SHADOW, '（居高临下冷瞥一眼，并未补掌，转身隐入雨雾）“这点火候也敢来拦老夫？回寺里再练十年罢！”'),
      P('（强忍胸口剧痛翻身跃起，望向空荡松林，心头暗凛）“此人武功深不可测，虽只一触即分，却分明在最后一刻收了三成杀劲……待我调息片刻，定要回阁查明他们究竟在抢何物！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 50, mpPct: 50 },
      { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
      openScene('scene_slq28_13', SHAOLIN_Q28_QUEST_ID),
    ],
  },

  scene_slq28_13: {
    id: 'scene_slq28_13',
    title: '第十三幕 · 重返主阁',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('你冒雨折返重檐琉璃藏经主阁二层。虚广、虚光闻得雷雨声中夹杂的掌风震响，早已提灯急奔上楼，见你僧衣湿透、虎口渗血，皆大惊失色。'),
      S('NPC-0498', '（连忙递上干布与金创药）“{playerName}师弟！方才那两股如山岳崩塌般的气劲……当真有人潜入二楼交手了？经橱里的七十二绝技秘籍可有失窃？”'),
      P('（接过琉璃灯，快步走向「般若」「禅定」两座经橱）“快随我逐格清点！那二人仓促破窗而去，必有遗落之物！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_14', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_14: {
    id: 'scene_slq28_14',
    title: '第十四幕 · 经橱无失',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      N('三人挑灯细查半个时辰，结果却叫虚广、虚光面面相觑——橱内七十二绝技与历代高僧手注竟一卷未少，连镇阁的《洗髓经》残抄与《金刚禅狮子吼》竹匣都纹丝未动！'),
      S('NPC-0648', '（百思不得其解）“怪事！绝世高手冒着天下大不韪潜入少林藏经阁，连番斗掌，却一卷书都不偷，图的是什么？”'),
      P('（俯身抚过经案底沿一道极细的木缝，指尖忽触到两片冰凉坚韧的宣纸角）“书虽未偷，却早已被人日复一日地读透、抄透了！你们看——这是什么？”'),
    ],
    onFinishEffects: [openScene('scene_slq28_15', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_15: {
    id: 'scene_slq28_15',
    title: '第十五幕 · 案缝双笺',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    illustrationUrl: '/assets/quests/sl_28_two_notes.jpg',
    illustrationCaption: '案缝双笺 · 纸背指印各异，一份飘逸江南行楷，一份刚烈北地劲笔',
    mandatory: true,
    beats: [
      N('你将两张从案缝夹出的残纸摊在琉璃灯下细观。凭你多年书法功底与经义造诣，一眼便看出这两张批注出自截然不同的两人之手！'),
      N('左首一张以极细的姑苏狼毫小楷写就，笔锋飘逸灵动，专批《无相劫指》与《般若掌》的借力化劲之法，纸背留有一道极浅的剑指印痕，隐隐透着一股江南世家「以彼之道、还施彼身」的机巧气度。'),
      N('右首一张却是以枯枝蘸墨疾书，笔力透背、横折如刀，批注《伏魔杖法》与《大力金刚指》时字字皆透着惨烈悲愤，纸角更被一双雄浑大手捏出五道深陷指印！'),
    ],
    onFinishEffects: [openScene('scene_slq28_16', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_16: {
    id: 'scene_slq28_16',
    title: '第十六幕 · 暗流惊心',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      P('（凝视两张残纸上的朱砂日期印痕，背脊生出一股寒意）“你们看这墨色新旧……最早的一处批注，竟已是十余年前的旧墨！这两个人，恐怕已在少林藏经阁里潜伏了整整十几年，彼此暗中窥伺，直到今夜才终于撞破对掌！”'),
      S('NPC-0498', '（倒吸一口凉气，手中铜灯险些滑落）“十……十余年？！两位宗师级数的人物日夜藏身在咱们头顶偷阅七十二绝技，寺中上下竟浑然不觉！这还了得！”'),
      S('NPC-0648', '（急声道）“{playerName}师弟，事关少林千年根基！这两张残纸切不可外传，你速回西厢石台静思对策，究竟该如何处置，全凭你定夺！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q28_QUEST_ID, 'residual_notes_choice'),
      toast('已寻获两份绝技批注残纸！请择定藏经阁治寺方略。', 'talk', '案缝残纸'),
      openScene('scene_slq28_17', SHAOLIN_Q28_QUEST_ID),
    ],
  },

  scene_slq28_17: {
    id: 'scene_slq28_17',
    title: '第十七幕 · 晨光初霁',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('黎明时分，暴雨渐歇。少室山云海翻涌，清晨第一缕金光斜照在西厢晒经石台上。你独自立于石台边，指间摩挲着那两张气息迥异的残纸，思绪万千。'),
      N('放眼望去，阁外古银杏树下，那名终年默不作声的无名老扫地僧正握着一把秃竹扫帚，不紧不慢地清扫着雨夜打落的湿叶，仿佛昨夜那场惊天动地的宗师对掌从未发生过。'),
    ],
    onFinishEffects: [openScene('scene_slq28_18', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_18: {
    id: 'scene_slq28_18',
    title: '第十八幕 · 佛理与铁律',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('你回想起方才二楼经橱中那些批注字句——无论是灰衣老僧还是黑衣夜客，虽将少林七十二绝技练至炉火纯青，字里行间却无一不透出戾气淤积、心火攻心之兆。'),
      P('（心中暗自权衡）“七十二绝技本须以佛法慈悲化解戾气。若依佛门本怀，或许应于古银杏树下静察参悟佛理，以慈悲心化去这桩潜伏多年的武学魔障……”'),
      P('“可若念及少林百年清誉与大宋武林安危，贼人既敢在佛门圣地来去自如，岂能坐视不管？若密禀武僧堂口与戒律院，抽调精锐暗布天罗杀阵，定能将潜伏宵小一网打尽！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_19', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_19: {
    id: 'scene_slq28_19',
    title: '第十九幕 · 治寺之择',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('虚广、虚光远远候在回廊尽头，静待你的决断。此念一动，不仅关乎藏经阁往后数年的安危，更将决定你在少林寺的禅武道心与后续传承分支！'),
    ],
    choices: [
      {
        id: 'slq28_choose_compassion',
        label: '【慈悲默察】暂不惊动武僧，往古银杏树下静察参悟佛理，寻以佛法化解武学戾气之道',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_pavilion_choice', value: 'compassion' },
          openScene('scene_slq28_20', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'slq28_choose_ironfist',
        label: '【铁血伏魔】密呈戒律院与武僧堂口，抽调精锐于藏经阁暗布天罗杀阵，绝不容外敌猖狂！',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_pavilion_choice', value: 'ironfist' },
          openScene('scene_slq28_22', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq28_20: {
    id: 'scene_slq28_20',
    title: '第二十幕 · 古杏闻禅',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭外',
    mandatory: true,
    beats: [
      N('你将两张残纸妥善收入怀中，嘱咐虚广、虚光切莫声张，随即独自步下石阶，望向古银杏树下那道佝偻却沉静如山的背影。'),
      P('（遥遥合十，心中渐趋澄明）“冤冤相报何时了，杀阵纵能捉贼，却未必能解人心之魔。既见那老僧数十年扫叶于此却安然无恙，藏经阁的真正破局之法，或许便在这无声落叶之间。”'),
    ],
    onFinishEffects: [openScene('scene_slq28_21', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_21: {
    id: 'scene_slq28_21',
    title: '第二十一幕 · 默察定心',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('清晨山风拂过，银杏叶纷纷扬扬落下。你立定心志，日后必常赴扫叶庭静察参悟，以大慈悲、大智慧面对这桩潜藏少林多年的惊天暗流。'),
      S('NPC-0498', '（合十低诵佛号）“师弟胸襟如海，我二人定当守口如瓶，暗中照看经橱，静候师弟参破玄机！”'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 750, reason: '琉璃夜影 · 曝书惊变（慈悲默察）' },
      { type: 'addSectContribution', amount: 200 },
      { type: 'modifySkill', key: '书', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'completeQuest', questId: SHAOLIN_Q28_QUEST_ID, outcome: 'compassion' },
      toast(
        '《琉璃夜影 · 曝书惊变》完结（慈悲默察线）！实战经验 +750，师门贡献 +200，书法 +2，经义 +1！',
        'success',
        '曝书惊变',
      ),
      openScene('scene_slq28_24', SHAOLIN_Q28_QUEST_ID),
    ],
  },

  scene_slq28_22: {
    id: 'scene_slq28_22',
    title: '第二十二幕 · 密报堂口',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前',
    mandatory: true,
    beats: [
      N('你目光一凛，将两张批注残纸以火漆封缄，亲自交付虚光连夜转呈戒律院与武僧堂口各位首座，并详绘主阁飞檐暗道与松林退路图！'),
      P('（沉声断喝）“少林乃天下武学正宗，岂容藏头露尾之辈视作无人之境？纵是宗师级数，只要敢再踏入藏经阁一步，便教他有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_23', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_23: {
    id: 'scene_slq28_23',
    title: '第二十三幕 · 天罗初定',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('虚广、虚光见你雷厉风行、胆魄过人，俱肃然起敬。自此日起，藏经阁外松林暗哨渐密，一张针对盗经贼人的无形铁网已悄然拉开帷幕。'),
      S('NPC-0648', '（躬身行礼）“师弟铁血果决，护寺之心日月可鉴！戒律院与武僧堂口诸位长老得报后，必会与师弟共商伏魔大计！”'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 750, reason: '琉璃夜影 · 曝书惊变（铁血伏魔）' },
      { type: 'addSectContribution', amount: 200 },
      { type: 'modifySkill', key: '书', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'completeQuest', questId: SHAOLIN_Q28_QUEST_ID, outcome: 'ironfist' },
      toast(
        '《琉璃夜影 · 曝书惊变》完结（铁血伏魔线）！实战经验 +750，师门贡献 +200，书法 +2，经义 +1！',
        'success',
        '曝书惊变',
      ),
      openScene('scene_slq28_24', SHAOLIN_Q28_QUEST_ID),
    ],
  },

  scene_slq28_24: {
    id: 'scene_slq28_24',
    title: '第二十四幕 · 山雨欲来',
    subtitle: '嵩山少林寺 · 藏经阁',
    mandatory: true,
    beats: [
      N('晨钟撞响，回荡在雨后初晴的少室群峰之间。你知道，昨夜琉璃阁中的那场无声对掌绝非终点——一场席卷大宋武林与少林百年的惊天风暴，才刚刚露出冰山一角。'),
    ],
  },
}
