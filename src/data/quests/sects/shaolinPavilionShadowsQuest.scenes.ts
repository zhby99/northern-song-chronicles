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

function buildPavilionShadowOpponent(mode: 'zen' | 'fierce'): NodeNpc {
  const isZen = mode === 'zen'
  return makeQuestNpc({
    id: isZen ? 'QUEST_SLQ28_BLACK_SHADOW_ZEN' : 'QUEST_SLQ28_BLACK_SHADOW',
    name: '藏经阁黑衣夜影',
    title: isZen ? '琉璃雨夜截击 · 禅定卸锋五合' : '琉璃雨夜截击 · 凌厉试探五合',
    realm: '宗师下品',
    factionName: '未知高人',
    sectRank: 4,
    sectRankLabel: '蒙面宗师',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: isZen
      ? '“小和尚竟懂得借松涛禅定卸我刚猛掌锋？倒有点少林正宗的味道，接住这五合再说！”'
      : '“少林小辈好大胆子，竟敢抢攻老夫中宫？五合之内，看你挡不挡得住！”',
    stats: isZen
      ? { hp: 3920, mp: 3720, agi: 76, res: 64 }
      : { hp: 4180, mp: 3950, agi: 80, res: 68 },
    talents: { bone: 90, comprehension: 90, charm: 68 },
    equippedArts: { neigong: 'MA-060', move1: 'MA-044', move2: 'MA-083' },
    learnedArts: [
      { artId: 'MA-060', level: 8 },
      { artId: 'MA-044', level: 8 },
      { artId: 'MA-083', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq28_01: {
    id: 'scene_slq28_01',
    title: '第一幕 · 七夕曝书 · 湿印惊心',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('{reignYear}七月初七，正是嵩山少林寺一年一度「晒经曝书」大节。午后少室山顶乌云骤压，一道惨白电光撕裂暮色，豆大雨点如铁珠般砸落西厢晒经石台！你与虚广、虚光急忙抢收数百函唐宋贝叶孤本送入回廊，僧衣已尽数湿透。'),
      S('NPC-0498', '（抱着《华严经》匣长舒一口气，忽又压低嗓音）“{playerName}师弟，方才点验书目时我发现怪事——《般若掌图录》与《摩诃指注疏》的竹签次序被人挪了半寸，连『般若』『禅定』两格的樟木插销也松开了一指宽的缝隙！”'),
      S('NPC-0648', '（神色凝重地望向暴雨中的琉璃主阁）“并非今日才如此。近三五年来每逢晦夜大雨，二楼经橱总隐隐飘出极淡的陈年沉水与松烟墨香，偏偏去查时连半个贼影也寻不见！”'),
      N('你提过一盏防风琉璃罩灯俯身细勘石阶回廊，竟在廊柱阴影下瞥见半枚极浅的窄长草鞋湿印——落地不过两刻钟，足底受力轻如飘絮，绝非少林制式僧履！虚广变色欲去鸣钟唤武僧，你却抬手止住了他。'),
    ],
    choices: [
      {
        id: 'slq28_start_silent',
        label: '【止钟暗察】令虚广、虚光静守西厢与暗梯，莫打草惊蛇，孤身提灯入主阁！',
        subLabel: '承接任务，前往【重檐琉璃藏经主阁】勘察经橱异状',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_patrol_mode', value: 'stealth' },
          { type: 'startQuest', questId: SHAOLIN_Q28_QUEST_ID, stepId: 'night_pavilion_patrol' },
          setStep(SHAOLIN_Q28_QUEST_ID, 'night_pavilion_patrol'),
          toast(
            '已开启《琉璃夜影 · 曝书惊变》！请前往【重檐琉璃藏经主阁（sl_cj_pavilion）】夜巡查探。',
            'talk',
            '曝书惊变',
          ),
        ],
      },
      {
        id: 'slq28_start_cordon',
        label: '【暗抄底册】嘱虚广核对借阅书目、虚光暗卡东厢角门，你提灯直探琉璃主阁！',
        subLabel: '承接任务，前往【重檐琉璃藏经主阁】勘察经橱异状',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_patrol_mode', value: 'cordon' },
          { type: 'startQuest', questId: SHAOLIN_Q28_QUEST_ID, stepId: 'night_pavilion_patrol' },
          setStep(SHAOLIN_Q28_QUEST_ID, 'night_pavilion_patrol'),
          toast(
            '已开启《琉璃夜影 · 曝书惊变》！请前往【重檐琉璃藏经主阁（sl_cj_pavilion）】夜巡查探。',
            'talk',
            '曝书惊变',
          ),
        ],
      },
    ],
  },

  scene_slq28_02: {
    id: 'scene_slq28_02',
    title: '第二幕 · 阁中勘微 · 蛛丝马迹',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁一层（细节推演）',
    mandatory: true,
    beats: [
      N('你收束呼吸推开主阁侧扉，浓重的樟木与旧纸气息扑面而来。一层大藏经架寂然无声，唯窗外骤雨敲打琉璃瓦檐噼啪作响。你借着风灯微光与闪电幽芒，细细勘察阁中三处寻常人绝难留意的痕迹——'),
      N('其一，窗外重檐琉璃瓦上积水映电如镜，沿瓦槽顺流而下，竟无半分飞贼翻窗踩踏溅起的水渍泥痕；其二，阁门铁闩与黄铜暗锁严丝合缝，锁孔内积尘未动，绝无铁丝撬拨刮擦之迹。'),
      N('其三，你行至偏架细嗅《袈裟伏魔功》与《般若掌》两匣旧抄——经卷放回原位分毫不差，书脊却残留着一缕极淡的陈年旧檀香，其间竟夹杂着一丝若有若无的塞外胡马熟皮气息！'),
      P('（心中电光石火般将三处迹象串连一处，暗暗推演来人底细）“屋瓦积水未扰、铜锁完好无损、翻阅绝技后复归原位且檀香与塞外革气交织……莫非——”'),
    ],
    choices: [
      {
        id: 'slq28_deduce_thief',
        label: '必是江湖飞贼趁暴雨撬窗入阁盗经，因听见寺僧抢书动静才仓促逃遁',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_deduce_pick', value: 'thief' },
          openScene('scene_slq28_03', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'slq28_deduce_lurker',
        label: '绝非寻常飞贼，而是长年潜伏少林暗处的绝顶高人，熟稔阁中陈设、阅毕复归原位',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_shadow_deduced', value: true },
          { type: 'setFlag', flag: 'sl_q28_deduce_pick', value: 'lurker' },
          openScene('scene_slq28_03', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'slq28_deduce_monk',
        label: '多半是寺内某位贪功执事私藏钥匙偷阅绝技，畏惧戒律院责罚才悄悄放回',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_deduce_pick', value: 'monk' },
          openScene('scene_slq28_03', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq28_03: {
    id: 'scene_slq28_03',
    title: '第三幕 · 琉璃夜影 · 无声对掌',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    illustrationUrl: '/assets/quests/sl_28_rain_pavilion.jpg',
    illustrationCaption: '琉璃夜影 · 七夕暴雨夜藏经主阁，灰衣老僧与黑衣客无声对掌',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q28_shadow_deduced|念头方落，你背脊骤然生寒——能令铜锁无痕、瓦水不惊且从容归卷者，普天之下唯长年潜伏古刹的绝世高人方能为之！话音未落，二楼木板深处忽传来一丝极细微的「嗤嗤」气劲震颤！|念头方起，二楼木板深处忽传来一丝令人毛骨悚然的「嗤嗤」声——那绝非寻常飞贼或贪功执事所能发出的动静，而是两股沛然莫御的绝顶内力正隔空相激！}'),
      N('你屏息沿旋梯无声掠上二楼。恰在此时惊雷乍亮，惨白电光透过雕花木棂倾泻而入——只见「七十二绝技」经橱前的狭长过道里，两道人影正凌空无声对掌！'),
      N('左首一人身披宽大灰布旧僧袍，身形清瘦而隐带江南世家儒雅气度，双掌划弧似借力打力；右首一人黑衣蒙面、魁伟如山，掌势雄浑霸烈如北地苍狼！二人内力俱已登峰造极，双掌相交竟无半点爆响，只将周遭数十卷佛经齐齐震得浮空半寸，又随劲力收发悄然落回原位！'),
      S(SPEAKER_GRAY_MONK_SHADOW, '（觉察楼梯阴影中你的微弱脚步，沙哑压低嗓音，拂袖倒退三步）“哼，少林小辈倒会挑时辰。今日之账，来日再算！”'),
      S(SPEAKER_BLACK_SHADOW, '（黑巾下双目寒芒暴涨，反手拍开西窗欲纵入松林）“藏头露尾的老匹夫，跑得了和尚跑不了庙！——小和尚，滚开！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_04', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_04: {
    id: 'scene_slq28_04',
    title: '第四幕 · 古松雨幕 · 五合试锋',
    subtitle: '藏经阁外古松林 · 试探五合（宗师下品）',
    illustrationUrl: '/assets/quests/sl_28_pine_chase.jpg',
    illustrationCaption: '松林雨幕 · 截击藏经阁黑衣夜影，五合之间惊见宗师绝威',
    mandatory: true,
    beats: [
      N('灰衣老僧如一缕青烟掠出东窗没入暴雨，你暴喝一声足尖点栏，连踏三道琉璃飞檐，竟硬生生截在黑衣夜行客落脚的古松枝头之前！那黑衣客眼中闪过一丝讶色，反手一掌拍落松枝积雨，漫天雨箭迎面激射而来！'),
      S(SPEAKER_BLACK_SHADOW, '（嗓音沉浑如闷雷，雄浑内力如江海倒灌压得松涛怒吼）“好俊的少林真传！念你并非那姓慕容的奸贼一伙，老夫只试你五合——接得住便留你活口！”'),
      N('狂风卷雨，此人修为深不可测，每一掌皆带着惨烈苍茫的宗师绝威！你须在五合之内稳住阵脚，窥其武学路数！'),
    ],
    choices: [
      {
        id: 'slq28_stance_zen',
        label: '【运禅定以静守御】借松涛雨声稳守中宫、卸力化劲，细察其掌势底细！（撑过 5 合）',
        subLabel: '以佛学禅定消解黑影三分杀锋，稳守五合即可逼退黑影',
        tone: 'jade',
        condition: { type: 'skillAtLeast', key: '经义', min: 75 },
        effects: [
          { type: 'setFlag', flag: 'sl_q28_stance', value: 'zen' },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q28_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPavilionShadowOpponent('zen') },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '黑衣夜影气机已锁死松林方圆三丈，唯有硬接五合方能脱身！',
            introText: '【禅定守御 · 五合试锋】暴雨如注，稳守中宫撑满 5 合（或提前击退黑衣夜影）即可破局！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_05', SHAOLIN_Q28_QUEST_ID),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_05', SHAOLIN_Q28_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_06', SHAOLIN_Q28_QUEST_ID),
            ],
          },
        ],
      },
      {
        id: 'slq28_stance_fierce',
        label: '【凌厉抢攻试其底细】不避宗师锋芒，抢攻中宫逼黑衣夜影显露真路数！（撑过 5 合）',
        subLabel: '零门槛正面抢攻；撑过 5 合或力战不屈皆可推进剧情',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_stance', value: 'fierce' },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q28_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPavilionShadowOpponent('fierce') },
            rule: 'survive_rounds',
            maxRounds: 5,
            forbidEscapeReason: '黑衣夜影气机已锁死松林方圆三丈，唯有硬接五合方能脱身！',
            introText: '【抢攻试锋 · 五合交手】藏经阁黑衣夜影掌风如潮袭来！全力周旋 5 合试其底细！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_05', SHAOLIN_Q28_QUEST_ID),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_05', SHAOLIN_Q28_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q28_shadow_fought', value: true },
              openScene('scene_slq28_06', SHAOLIN_Q28_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_slq28_05: {
    id: 'scene_slq28_05',
    title: '第五幕 · 五合惊退 · 松针余威',
    subtitle: '藏经阁外古松林',
    mandatory: true,
    beats: [
      N('第五合掌风轰然相撞，碗口粗的古松树干竟被气劲削去半边树皮！{ifFlagEq:sl_q28_stance=zen|你以禅定心法借势卸力，连退五步便稳住足根，反将对方掌风中那股惨烈北地刚劲看得清清楚楚！|你虎口震裂、连退七步方稳住身形，却以凌厉反击逼得黑衣客微晃半寸，显露出一丝少林大力金刚指与伏魔杖的化用影子！}'),
      S(SPEAKER_BLACK_SHADOW, '（眼中闪过一抹难以掩饰的激赏，却未再下杀手，反手震起漫天松针遮蔽雨幕）“少林寺新一代里，倒还真养出个有骨气的真传弟子！只是凭你今日修为，还管不了藏经阁里三十年的血海旧债！”'),
      N('话音犹在雨夜回荡，黑衣夜行客已如大鹏展翅般掠过绝壁松梢，转瞬没入茫茫山雨，再无踪影。你强压翻涌气血，冒雨疾返琉璃主阁。'),
    ],
    onFinishEffects: [openScene('scene_slq28_07', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_06: {
    id: 'scene_slq28_06',
    title: '第五幕 · 气劲震退 · 手下留情',
    subtitle: '藏经阁外古松林',
    mandatory: true,
    beats: [
      N('那黑衣夜行客的掌力沉雄霸道至极，纵你拼力抵挡，仍被其隔空掌风扫中肩头，整个人倒滑数丈跌入湿滑松针堆中，胸口气血剧烈翻涌。'),
      S(SPEAKER_BLACK_SHADOW, '（居高临下冷瞥一眼，并未补掌，转身纵入雨雾）“这点火候也敢来拦老夫？回寺里再练十年罢！少林藏经阁三十年的血海旧债，不是你这小和尚管得了的！”'),
      P('（翻身跃起，拂去僧袍松针，心头暗凛）“此人武功深不可测，可方才掌力及身最后一瞬竟收了三成杀劲，显然无意取我性命……事不宜迟，快回主阁查明他们究竟在抢何物！”'),
    ],
    onFinishEffects: [openScene('scene_slq28_07', SHAOLIN_Q28_QUEST_ID)],
  },

  scene_slq28_07: {
    id: 'scene_slq28_07',
    title: '第六幕 · 经橱无失 · 案缝双笺',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    illustrationUrl: '/assets/quests/sl_28_two_notes.jpg',
    illustrationCaption: '案缝双笺 · 纸背指印各异，一份飘逸江南行楷，一份刚烈北地劲笔',
    mandatory: true,
    beats: [
      N('虚广、虚光闻得掌风雷响早已提灯急奔二楼，三人挑灯逐格点验半个时辰，结果却叫二人面面相觑——七十二绝技秘籍与《洗髓经》残抄竟一卷未少，连竹匣封签都纹丝未动！'),
      P('（俯身摸过经案底沿一道极细木缝，指尖夹出两片坚韧宣纸角）“书虽未偷，却早已被人日复一日读透、抄透了！你们看——这是他们仓促对掌时自经页震落的批注残笺！”'),
      N('你将双笺摊于琉璃灯下：左首一张以极细的姑苏狼毫小楷写就，笔锋飘逸灵动，专批《无相劫指》与《般若掌》的借力化劲之法，纸背留有一道极浅的剑指印痕，隐透江南世家「以彼之道、还施彼身」的机巧；右首一张却以枯枝蘸墨疾书，横折如刀，批注《伏魔杖法》与《大力金刚指》时字字惨烈悲愤，纸角更被雄浑大手捏出五道深陷指印！'),
      P('（凝视笺角朱砂日期印痕，声音发沉）“最早一处墨迹已是十余年前的旧墨……这两位宗师已在少林头顶潜伏十余载，暗中彼此窥伺，直到今夜才终于撞破对掌！”'),
      S('NPC-0648', '（倒吸凉气，急声道）“事关少林千年根基！这两张残笺万不可外泄，师弟速携笺回西厢石台静思对策，如何处置全凭你定夺！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q28_QUEST_ID, 'residual_notes_choice'),
      toast('已寻获两份绝技批注残笺！请于西厢石台或主阁择定治寺方略。', 'talk', '案缝残笺'),
      openScene('scene_slq28_08', SHAOLIN_Q28_QUEST_ID),
    ],
  },

  scene_slq28_08: {
    id: 'scene_slq28_08',
    title: '第七幕 · 晨霁古杏 · 默观深机',
    subtitle: '藏经阁 · 西厢晒经校勘石台',
    mandatory: true,
    beats: [
      N('黎明时分，暴雨渐歇。少室山云海翻涌，清晨第一缕金光斜照在西厢晒经石台上。你指间摩挲着那两张气息迥异的残笺，反复推敲其中批注字句——无论是灰衣老僧还是黑衣夜客，虽将少林绝技练至炉火纯青，字里行间却皆隐隐透出戾气淤积、心火逆冲之兆。'),
      N('极目远眺，阁外千年古银杏树下，那名终年默不作声的无名灰袍老扫地僧正握着一柄秃竹扫帚，不紧不慢地清扫着雨夜打落的湿叶，仿佛昨夜那场震动琉璃阁的宗师对掌，不过是秋风拂檐的寻常旧事。'),
      N('虚广、虚光远远候在回廊尽头不敢打扰。在立定治寺方略之前，你静下心神，先细察眼前的关键端倪——'),
    ],
    choices: [
      {
        id: 'slq28_inspect_sweeper',
        label: '【凝神默观古杏扫叶老僧】细看其执帚步频与气息虚实，探寻阁中另有一重玄机',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_watched_sweeper', value: true },
          openScene('scene_slq28_09', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'slq28_inspect_notes',
        label: '【覆勘双笺墨迹与飞檐路线】核算二人潜入规律与绝技破绽，为布防筹谋底牌',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q28_studied_notes', value: true },
          openScene('scene_slq28_09', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq28_09: {
    id: 'scene_slq28_09',
    title: '第八幕 · 慈悲与铁血 · 治寺定轨',
    subtitle: '藏经阁 · 西厢晒经校勘石台（重大路线抉择）',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q28_watched_sweeper|你凝目细观片刻，心头竟微生骇然——那无名老僧竹帚掠过积水青石，落叶成堆而水波不兴，步履间浑无半点内力外泄，却与天地山风融作一体！他日日守在藏经阁外，岂会不知阁中十年暗影？|你将双笺折痕与主阁飞檐暗道逐一对照，算定二人皆趁晦夜雷雨自东西偏窗与古柏暗影往来；更兼边关近来风声吃紧，藏经阁中除了武学绝技，尚存有唐宋兵书与边防阵图！}'),
      P('（心中天人交战，缓缓抬眼望向古银杏与琉璃飞檐）“七十二绝技本须佛法慈悲化戾。若效法扫地老僧暂不惊动武僧，以佛法默察度化潜伏恶念，或许能解这场三十年武学魔障……”'),
      P('“可若念及少林百年清誉与中原安危，强敌敢在佛门禁地来去自如，岂能坐视姑息？若密禀戒律院与武僧堂口暗布天罗铁网，必能以雷霆手段肃清古刹内患外敌！”'),
      N('此念一动，不仅决定藏经阁往后数年的命运，更将定下你在少林寺的禅武道心与后续专属主线分支（慈悲默察《扫叶听风》 / 铁血伏魔《暗布天罗》）！'),
    ],
    choices: [
      {
        id: 'slq28_choose_compassion',
        label: '【慈悲默察脉】效法扫地老僧，暂不惊动武僧，以佛法慈悲静察度化潜伏恶念！',
        subLabel: '开启 Q30《慈悲默察 · 扫叶听风》分支（禅心慈悲 +3）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_pavilion_choice', value: 'compassion' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q28_policy_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q28_policy_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
            ],
          },
          openScene('scene_slq28_10_compassion', SHAOLIN_Q28_QUEST_ID),
        ],
      },
      {
        id: 'slq28_choose_ironfist',
        label: '【铁血伏魔脉】火漆密呈戒律院与武僧堂口，誓以天罗地网肃清古刹内患外敌！',
        subLabel: '开启 Q31《铁血伏魔 · 暗布天罗》分支（怒目杀业 +3）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_pavilion_choice', value: 'ironfist' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q28_policy_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q28_policy_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 3 },
            ],
          },
          openScene('scene_slq28_11_ironfist', SHAOLIN_Q28_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq28_10_compassion: {
    id: 'scene_slq28_10_compassion',
    title: '第九幕 · 古杏定心 · 慈悲默察',
    subtitle: '藏经阁 · 古银杏扫叶庭外',
    mandatory: true,
    beats: [
      N('你将两张批注残笺妥善收入怀中，嘱咐虚广、虚光切莫声张，随即独自步下石阶，望向古银杏树下那道佝偻却沉静如山的灰袍背影，遥遥合十行了一礼。'),
      P('（心境渐趋澄明如水）“冤冤相报何时了，杀阵纵能捉贼，却未必能解人心之魔。既见那无名老僧数十年扫叶于此却安然无恙，藏经阁真正的破局之道，或许便藏在这无声落叶之间。”'),
      S('NPC-0498', '（合十低诵佛号，满目敬服）“师弟胸襟如海，不愧本寺真传！我与虚光定当守口如瓶，暗中照看经橱，静候师弟于扫叶庭参破玄机！”'),
      N('晨钟撞响，回荡在雨后初晴的少室群峰之间。你知道，昨夜琉璃阁中的无声对掌绝非终点——一场席卷大宋武林与少林百年的惊天风暴，才刚刚露出冰山一角。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 750, reason: '琉璃夜影 · 曝书惊变（慈悲默察）' },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q28_shadow_deduced', op: 'truthy' },
        thenEffects: [{ type: 'giveCombatExp', amount: 80, reason: '敏锐勘微推演出藏经阁潜伏绝顶高人' }],
        elseEffects: [],
      },
      { type: 'addSectContribution', amount: 200 },
      { type: 'modifySkill', key: '书', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'completeQuest', questId: SHAOLIN_Q28_QUEST_ID, outcome: 'compassion' },
      toast(
        '《琉璃夜影 · 曝书惊变》完结（慈悲默察线）！实战经验 +750，师门贡献 +200，书法 +2，经义 +1，禅心慈悲 +3！',
        'success',
        '曝书惊变',
      ),
    ],
  },

  scene_slq28_11_ironfist: {
    id: 'scene_slq28_11_ironfist',
    title: '第九幕 · 密缄呈堂 · 铁血伏魔',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁前',
    mandatory: true,
    beats: [
      N('你目光一凛，将两张批注残笺以红泥火漆严密封缄，连同亲手测绘的主阁飞檐暗道与古柏松林退路图一并交付虚光，命其即刻秘呈戒律院与武僧堂口诸位首座！'),
      P('（声音冷峻如铁）“少林乃天下武学正宗，岂容藏头露尾之辈视作无人之境？纵是宗师级数，只要敢再踏入藏经阁一步，便教他尝尝少林天罗地网的滋味！”'),
      S('NPC-0648', '（躬身受命，肃然起敬）“师弟铁血果决，护寺之心日月可鉴！戒律院玄痛首座与玄寂师伯得报后，必会与师弟共商伏魔大计！”'),
      N('晨钟撞响，震散雨后山岚。自此日起，藏经阁外松林暗哨渐密，一张针对盗经宵小的无形铁网已悄然拉开帷幕，而属于少林的百年风暴正加速逼近。'),
    ],
    onFinishEffects: [
      { type: 'giveCombatExp', amount: 750, reason: '琉璃夜影 · 曝书惊变（铁血伏魔）' },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q28_shadow_deduced', op: 'truthy' },
        thenEffects: [{ type: 'giveCombatExp', amount: 80, reason: '敏锐勘微推演出藏经阁潜伏绝顶高人' }],
        elseEffects: [],
      },
      { type: 'addSectContribution', amount: 200 },
      { type: 'modifySkill', key: '书', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'completeQuest', questId: SHAOLIN_Q28_QUEST_ID, outcome: 'ironfist' },
      toast(
        '《琉璃夜影 · 曝书惊变》完结（铁血伏魔线）！实战经验 +750，师门贡献 +200，书法 +2，经义 +1，怒目杀业 +3！',
        'success',
        '曝书惊变',
      ),
    ],
  },
}
