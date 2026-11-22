import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_ENTRY_QUEST_ID } from './zhongnanEntryQuest'

const SPEAKER_XISHI_BULLY: StorySpeakerSpec = {
  kind: 'custom',
  name: '张横肉',
  title: '长安西市泼皮头目',
  factionName: '长安市井',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_BEE_BANDIT: StorySpeakerSpec = {
  kind: 'custom',
  name: '刁三儿',
  title: '终南山盗蜜惯匪',
  factionName: '关中山匪',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildXishiBully(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_ENTRY_BULLY',
    name: '张横肉',
    title: '长安西市恶霸头目',
    realm: '不入流',
    factionName: '长安市井',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“哪来的不知死活的毛头小子，也敢管爷们在草堂讨茶钱的闲事！”',
    stats: { hp: 120, mp: 50, agi: 10, res: 3 },
    talents: { bone: 35, comprehension: 30, charm: 25 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-184' },
    learnedArts: [{ artId: 'MA-180', level: 1 }, { artId: 'MA-184', level: 1 }],
  })
}

function buildBeeBandit(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_ENTRY_BANDIT',
    name: '刁三儿',
    title: '秦岭盗蜜山匪头目',
    realm: '不入流',
    factionName: '关中山匪',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“终南山玉蜂浆一罐能换二十贯钱，小道姑识相的快滚开！”',
    stats: { hp: 145, mp: 60, agi: 12, res: 4 },
    talents: { bone: 40, comprehension: 34, charm: 28 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-184' },
    learnedArts: [{ artId: 'MA-180', level: 1 }, { artId: 'MA-184', level: 1 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_entry_01: {
    id: 'scene_zn_entry_01',
    title: '第一幕 · 草堂梅雪',
    subtitle: '京兆府 · 终南草堂 · 主阁讲席',
    illustrationUrl: '/assets/quests/zn_entry_caotang_tea.jpg',
    illustrationCaption: '太乙烟霞 · 终南草堂内郝大玄与冷薇蓉对席煮茗，双脉气象初现',
    mandatory: true,
    beats: [
      N('{reignYear}早春，长安南郊的终南草堂外犹有残雪，檐下数株老梅却已暗香浮动。主阁讲席间，一缕沉水香袅袅升起。'),
      N('席间分坐一男一女两位高人：青袍道冠、目光清朗者，乃是终南重阳古观「广宁子」郝大玄；白衣素袂、眉目如霜者，则是活死人墓行走尘世的「降龙袖」冷薇蓉。'),
      S('NPC-1058', '（轻抚茶盏，抬眼打量步入草堂的你）“无量寿佛。这位{gender:少侠|女侠}步履清净，周身全无他派杂学烟火气，倒像是块未经雕琢的璞玉。”'),
      S('NPC-0323', '（微掀茶盖，语声冷冽却带着一分赞许）“确实难得。终南山门虽隐，却也常在草堂留心可造之材。只是……外头似乎来了些不识趣的苍蝇。”'),
    ],
    onFinishEffects: [openScene('scene_zn_entry_02', ZHONGNAN_ENTRY_QUEST_ID)],
  },

  scene_zn_entry_02: {
    id: 'scene_zn_entry_02',
    title: '第二幕 · 泼皮闹堂',
    subtitle: '终南草堂 · 门庭生事',
    mandatory: true,
    beats: [
      N('话音未落，院门外忽地传来一阵粗鲁的叫骂与木门被踹开的巨响！一名满脸横肉的西市泼皮带着几名地痞闯入前厅，身后竟还跟着个手持小铜钹、眼神阴鸷的怪异少年。'),
      S(SPEAKER_XISHI_BULLY, '“好你个牛鼻子道士！西市坊的‘清静地税’欠了三个月，今儿个若不交出二十贯钱，爷们就把你这破草堂的古琴劈了烧火！”'),
      S('NPC-1058', '（稳坐不动，反倒含笑望向你）“贫道出家人不愿轻动杀念，冷女侠亦懒得脏了白袖。{gender:少侠|女侠}既有心问道终南，可愿替草堂扫一扫这门前尘埃？”'),
      P('“光天化日欺压清修之地，实在欺人太甚！这等泼皮，交由在下打发便是！”'),
    ],
    choices: [
      {
        id: 'zn_entry_fight_bully',
        label: '大步迎前 · 教训西市恶霸张横肉',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_ENTRY_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXishiBully() },
            rule: 'story_trial',
            forbidEscapeReason: '草堂高人正自观战，岂可临阵退缩！',
            introText: '西市恶霸张横肉抡起沙包大的拳头恶狠狠扑了上来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_entry_03', ZHONGNAN_ENTRY_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('不慎被恶霸占了便宜，郝大玄拂尘一挥将其震退，嘱你调息后再来试手。', '草堂风波'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_entry_03: {
    id: 'scene_zn_entry_03',
    title: '第三幕 · 铜钹暗响',
    subtitle: '终南草堂 · 星宿现踪',
    mandatory: true,
    beats: [
      N('你几招将张横肉放倒在地，那恶霸捂着腮帮连滚带爬缩到墙角。正当你收势喘息之际，那一直缩在人群后的怪异少年却阴恻恻地笑了起来。'),
      N('“锵——锵——”两片乌黑小铜钹骤然一击，刺耳音波夹着一股腥甜焦苦的烟尘直扑面门！'),
      S('NPC-0890', '“嘿嘿，西市的蠢货果然靠不住！终南山的牛鼻子，听说你们草堂藏着秦岭秘制药谱，星宿老仙座下乌弘霄特来借去瞧瞧！”'),
      S('NPC-0323', '（柳眉一蹙，袖中暗扣银针却仍按兵不动）“竟是西域星宿海的敲钹童子。小心他钹中夹带的毒粉，切莫吸入口鼻！”'),
    ],
    onFinishEffects: [openScene('scene_zn_entry_04', ZHONGNAN_ENTRY_QUEST_ID)],
  },

  scene_zn_entry_04: {
    id: 'scene_zn_entry_04',
    title: '第四幕 · 破钹擒敌',
    subtitle: '终南草堂 · 独斗星宿童子',
    mandatory: true,
    beats: [
      N('郝大玄袖袍轻拂，一股柔和道气已先将毒烟吹散大半，同时朗声点拨你：“屏息凝神，走偏锋抢他中门！星宿下三滥功夫，最怕堂堂正正的贴身紧逼！”'),
      P('“多谢道长指点！星宿妖人，休得在长安撒野！”'),
    ],
    choices: [
      {
        id: 'zn_entry_fight_xingxiu',
        label: '屏息抢攻 · 击退星宿敲钹童子乌弘霄',
        tone: 'danger',
        effects: [
          {
            type: 'healPlayer',
            hpPct: 100,
            mpPct: 100,
          },
          {
            type: 'startCombat',
            questId: ZHONGNAN_ENTRY_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0890' },
            rule: 'story_trial',
            forbidEscapeReason: '星宿妖人就在眼前，此时退避必遭暗算！',
            introText: '乌弘霄冷笑一声，双钹连拍，带着腥风扑面而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_entry_05', ZHONGNAN_ENTRY_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('不慎中了乌弘霄的诡招，冷薇蓉袖风将其逼退，嘱你整顿后再试。', '星宿来犯'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_entry_05: {
    id: 'scene_zn_entry_05',
    title: '第五幕 · 青竹符令',
    subtitle: '终南草堂 · 获颁引路信物',
    mandatory: true,
    beats: [
      N('你依言屏息抢入中门，一记脆利落手的反擒震落乌弘霄手中铜钹。乌弘霄见冷薇蓉寒眸如冰、郝大玄道威隐现，知讨不得好，丢下一颗烟丸狼狈逃出院门。'),
      S('NPC-1058', '（颔首微笑，自袖中取出一枚刻有太乙云纹的青竹符令递予你）“临危不乱，且不贪功冒进，好心性！星宿派近来频频在关中窥探，终南山亦需正气少年相助。”'),
      S('NPC-0323', '（凝视你片刻，淡淡道）“终南隐宗虽分前山重阳古观与后山活死人墓，却皆重‘清白’与‘守心’二字。你持此符令径赴终南后山寒玉涧，寻丘芷霜姑娘便是第一道试炼。”'),
    ],
    onFinishEffects: [openScene('scene_zn_entry_06', ZHONGNAN_ENTRY_QUEST_ID)],
  },

  scene_zn_entry_06: {
    id: 'scene_zn_entry_06',
    title: '第六幕 · 南山问道',
    subtitle: '长安城南 · 望见终南雪峰',
    mandatory: true,
    beats: [
      N('你接过微凉的青竹符令，向郝大玄与冷薇蓉深深一揖。出得草堂，极目南望，但见秦岭终南山层峦叠翠、云雾缭绕，宛如一条青龙横卧关中。'),
      P('（握紧青竹符令，心中豪情与清静交织）“终南隐宗……这就启程上山，赴寒玉涧寻丘芷霜姑娘！”'),
    ],
    choices: [
      {
        id: 'zn_entry_depart',
        label: '收好青竹符令 · 启程前往终南后山寒玉涧',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_ENTRY_QUEST_ID, stepId: 'stream_protect_bees' },
          setStep(ZHONGNAN_ENTRY_QUEST_ID, 'stream_protect_bees'),
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1058' }, delta: 6 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0323' }, delta: 6 },
          toast('已接取终南入门试炼！请前往【终南山隐宗 · 终南后山寒玉涧 · 临水抚琴榭】。', 'talk', '太乙烟霞'),
        ],
      },
    ],
  },

  scene_zn_entry_07: {
    id: 'scene_zn_entry_07',
    title: '第七幕 · 玉蜂惊巢',
    subtitle: '终南后山寒玉涧 · 临水抚琴榭',
    illustrationUrl: '/assets/quests/zn_entry_stream_bees.jpg',
    illustrationCaption: '寒玉驱匪 · 涧畔花林玉蜂纷飞，丘芷霜护坛斥山贼',
    mandatory: true,
    beats: [
      N('沿终南古道一路穿松入雾，忽闻潺潺水声与嗡嗡蜂鸣。转过花径，只见寒玉涧畔繁花似锦，数十只通体雪白的玉蜂正盘旋在一座白瓷蜜坛周围。'),
      N('坛边一名青衣少女正手持木枝竭力阻拦三名手持柴刀的粗野山匪——正是重阳古观外门弟子丘芷霜！'),
      S('NPC-0931', '“你们这群贪财的山贼！这玉蜂浆乃后山前辈用以救治伤寒瘟疫的灵药，岂容你们糟蹋？再上前一步，休怪玉蜂蜇瞎你们的狗眼！”'),
      S(SPEAKER_BEE_BANDIT, '“嘿嘿，我们早涂了雄黄艾草膏，那群小虫子近不得身！小道姑，乖乖交出蜜坛，免得吃皮肉苦！”'),
    ],
    onFinishEffects: [openScene('scene_zn_entry_08', ZHONGNAN_ENTRY_QUEST_ID)],
  },

  scene_zn_entry_08: {
    id: 'scene_zn_entry_08',
    title: '第八幕 · 涧畔逐寇',
    subtitle: '终南后山寒玉涧 · 挺身护坛',
    mandatory: true,
    beats: [
      P('（亮出太乙青竹符令，飞步挡在丘芷霜身前）“终南清净之地，容不得鼠辈撒野！丘姑娘退后，这帮山匪由我来打发！”'),
      S('NPC-0931', '（见你手持草堂青竹符令，顿时眉开眼笑）“原来是郝师叔与冷前辈引荐的新同门！{gender:少侠|女侠}小心，为首那刁三儿手脚狠辣！”'),
    ],
    choices: [
      {
        id: 'zn_entry_fight_bandit',
        label: '拔步迎敌 · 击退盗蜜山匪头目刁三儿',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_ENTRY_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBeeBandit() },
            rule: 'story_trial',
            forbidEscapeReason: '蜜坛与丘姑娘就在身后，岂可退缩！',
            introText: '刁三儿怪叫一声，挥舞柴刀直劈而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_entry_09', ZHONGNAN_ENTRY_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('一时失手被山匪逼退，丘芷霜吹哨唤来玉蜂群将贼人吓走，请你休整后再试。', '寒玉涧'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_entry_09: {
    id: 'scene_zn_entry_09',
    title: '第九幕 · 玉浆试贪',
    subtitle: '寒玉涧 · 见利思义',
    mandatory: true,
    beats: [
      N('你拳脚生风，三下五除二便将刁三儿打得抱头鼠窜，众山匪丢下柴刀滚下山坡。丘芷霜感激地向你行了一礼，旋即听见上游林中传来玉蜂异动，急忙奔去安抚蜂王。'),
      N('涧畔一时寂静无人。那白瓷蜜坛的木盖方才被山匪撞偏了半寸，坛中澄澈如琥珀的「玉蜂浆」散发出沁人心脾的清甜异香——江湖传闻，饮一口便能益气强身，拿去长安西市更是价值百贯！'),
    ],
    choices: [
      {
        id: 'zn_entry_protect_honey',
        label: '肃手盖好白瓷蜜坛 · 原地静候丘芷霜归来',
        subLabel: '守心克己，不取非分之物',
        tone: 'jade',
        effects: [
          { type: 'modifyChivalry', delta: 8, reason: '终南寒玉涧护蜜守心' },
          openScene('scene_zn_entry_10', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'zn_entry_steal_honey',
        label: '趁四下无人，偷偷舀走一小瓶玉蜂浆藏入怀中',
        subLabel: '贪念一起，恐遭隐宗前辈洞悉（严重后果）',
        tone: 'danger',
        effects: [openScene('scene_zn_entry_09_reject', ZHONGNAN_ENTRY_QUEST_ID)],
      },
    ],
  },

  scene_zn_entry_09_reject: {
    id: 'scene_zn_entry_09_reject',
    title: '贪心折缘 · 永绝山门',
    subtitle: '寒玉涧 · 逐出终南',
    mandatory: true,
    beats: [
      N('你方才探手揭开坛盖，忽觉一阵寒风拂过手腕，三根细如牛毛的银针钉在身前青石之上，嗡嗡作响！'),
      S('NPC-0173', '（白衣飘然而落，冷眸如冰）“果然人心难测。尚未入门便敢窃取后山灵药，若真传你终南绝学，岂非助纣为虐？”'),
      S('NPC-1059', '（自竹林缓步而出，轻叹摇头）“道心不净，与我终南无缘。收回青竹符令，{gender:少侠|女侠}请下山罢——自此终南隐宗山门，永不再为你而开。”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'zn_permanently_rejected', value: true },
      { type: 'abandonQuest', questId: ZHONGNAN_ENTRY_QUEST_ID },
      warn('因私窃玉蜂浆失德，你被终南隐宗收回符令，永绝山门！', '道心蒙尘'),
    ],
  },

  scene_zn_entry_10: {
    id: 'scene_zn_entry_10',
    title: '第十幕 · 暗察明心',
    subtitle: '寒玉涧 · 丘芷霜归来',
    mandatory: true,
    beats: [
      N('你正色伸手将偏斜的木盖严严实实盖回坛口，退后三步负手静立，目不斜视。片刻后，丘芷霜欣喜奔回，见蜜坛安然无恙，眉眼弯成了月牙。'),
      S('NPC-0931', '“多谢{gender:少侠|女侠}仗义守坛！其实……孙师叔与后山的冷前辈方才都在竹林高处看着呢。他们已请你移步抚琴榭，考校双脉问心！”'),
    ],
    choices: [
      {
        id: 'zn_entry_to_inquiry',
        label: '整肃衣冠 · 步入临水抚琴榭接受双脉问心',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_ENTRY_QUEST_ID, 'twin_veins_inquiry'),
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0931' }, delta: 10 },
          openScene('scene_zn_entry_11', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_entry_11: {
    id: 'scene_zn_entry_11',
    title: '第十一幕 · 临水清音',
    subtitle: '寒玉涧 · 临水抚琴榭',
    mandatory: true,
    beats: [
      N('临水抚琴榭建于飞瀑下游的青石之上，水雾氤氲。亭中并坐两位气度非凡的女子：左边道装素雅、神态恬淡者，乃是「清静散人」孙清静；右边一袭雪白长裙、膝横七弦古琴者，乃是古墓派掌事「幽谷素女」冷清秋。'),
      S('NPC-1059', '（微微颔首）“方才你驱匪不炫武，见利不动心，已胜过世间九成俗客。然我终南隐宗前山重阳古观、后山活死人墓，虽同守终南，心法旨趣却各有千秋。”'),
      S('NPC-0173', '（纤指轻拨一记散音，琴声清越如寒涧冰泉）“入门之前，须先听你本心。且答我二人两问——第一问，若天下大乱、黎民倒悬，修道习武之人当如何自处？”'),
    ],
    choices: [
      {
        id: 'zn_entry_q1_both',
        label: '“进则持剑济世护苍生，退则守心明道不染尘。”',
        subLabel: '动静相宜，兼顾玄门大义与幽谷清心',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '经义', delta: 1 },
          openScene('scene_zn_entry_12', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'zn_entry_q1_tao',
        label: '“侠之大者当挽狂澜，纵身死道消亦不负家国。”',
        subLabel: '慷慨入世，合于重阳古观剑胆琴心',
        tone: 'primary',
        effects: [
          { type: 'modifySkill', key: '经义', delta: 1 },
          openScene('scene_zn_entry_12', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'zn_entry_q1_tomb',
        label: '“世事如浮云，唯守方寸清净、护所爱之人不移。”',
        subLabel: '孤清绝尘，合于活死人墓幽谷遗风',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '琴', delta: 1 },
          openScene('scene_zn_entry_12', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_entry_12: {
    id: 'scene_zn_entry_12',
    title: '第十二幕 · 琴诗双问',
    subtitle: '临水抚琴榭 · 辨音明志',
    mandatory: true,
    beats: [
      S('NPC-1059', '（含笑点头）“言由心生，并无虚饰。再听第二问：你听冷妹妹此刻所抚一曲，弦音起落间，是哀怨多，还是清正多？”'),
      N('冷清秋十指连弹，一曲《终南秋水》流淌而出。初听似觉幽谷寒寂、孤芳自赏，细品之下却见每一记按音皆沉静自持，绝无半点怨怼凄切。'),
    ],
    choices: [
      {
        id: 'zn_entry_q2_clear',
        label: '“曲虽清冷，骨子里却是不染俗尘的孤高与清正。”',
        tone: 'gold',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1059' }, delta: 8 },
          openScene('scene_zn_entry_13', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'zn_entry_q2_warm',
        label: '“寒泉之下自有暖流，冷前辈心中有牵挂，并非绝情之人。”',
        tone: 'jade',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1059' }, delta: 6 },
          openScene('scene_zn_entry_13', ZHONGNAN_ENTRY_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_entry_13: {
    id: 'scene_zn_entry_13',
    title: '第十三幕 · 双老首肯',
    subtitle: '寒玉涧 · 准登重阳大殿',
    mandatory: true,
    beats: [
      S('NPC-0173', '（指尖轻按琴弦止住余韵，唇角罕见地泛起一丝极淡的笑意）“倒是个难得的知音。孙姐姐，这孩子我活死人墓也认下了。”'),
      S('NPC-1059', '（合掌含笑）“善哉！按终南规矩，凡新进弟子皆先由前山重阳古观大师兄丹阳子收为外门，打牢玄门筑基，待日后寒涧试剑方分观墓两脉。你速去【重阳玄门清修主殿】拜见马师兄罢！”'),
    ],
    choices: [
      {
        id: 'zn_entry_to_hall',
        label: '辞谢二位前辈 · 登临重阳玄门清修主殿',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_ENTRY_QUEST_ID, 'chongyang_oath'),
          toast('双脉问心已过！请前往【重阳古观前脉道院 · 重阳玄门清修主殿】拜见马钰玄！', 'success', '双脉问心'),
        ],
      },
    ],
  },

  scene_zn_entry_14: {
    id: 'scene_zn_entry_14',
    title: '第十四幕 · 重阳玄殿',
    subtitle: '重阳古观前脉道院 · 清修主殿',
    illustrationUrl: '/assets/quests/zn_entry_chongyang_oath.jpg',
    illustrationCaption: '太乙传薪 · 重阳玄门主殿松香缭绕，马钰玄验身授剑',
    mandatory: true,
    beats: [
      N('重阳玄门清修主殿依崖而建，殿前古柏参天，檐角铜铃在山风中清越作响。殿内三清像前香火袅袅，重阳首徒「丹阳子」马钰玄正端坐蒲团之上。'),
      S('NPC-1054', '（见你奉上青竹符令，温润一笑）“郝师弟、孙师妹与后山冷仙子的飞鸽传书贫道皆已阅过。只是终南隐宗千年规矩——凡入我山门者，须是未染他派上乘杂学的清白之身。请伸手，容贫道最后探查一次经脉。”'),
    ],
    choices: [
      {
        id: 'zn_entry_verify_pulse',
        label: '恭敬伸腕 · 请丹阳子复验经脉清白',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
            thenEffects: [openScene('scene_zn_entry_15', ZHONGNAN_ENTRY_QUEST_ID)],
            elseEffects: [openScene('scene_zn_entry_14_fail', ZHONGNAN_ENTRY_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_zn_entry_14_fail: {
    id: 'scene_zn_entry_14_fail',
    title: '经脉杂学 · 缘悭一面',
    subtitle: '重阳玄门清修主殿 · 复验未过',
    mandatory: true,
    beats: [
      S('NPC-1054', '（双指轻搭你脉门，片刻后缓缓收回，神色微叹）“可惜，可惜。你体内已修有良品及以上武学真气，与我终南先天气脉相冲。若强行传功，反害了你自身经脉。”'),
      S('NPC-1054', '“既已别有所承，贫道便不能破此祖规。{gender:少侠|女侠}珍重，江湖路远，他日有缘再会罢。”'),
    ],
    onFinishEffects: [
      { type: 'abandonQuest', questId: ZHONGNAN_ENTRY_QUEST_ID },
      warn('因已修习良品及以上武学，未能通过丹阳子经脉复验，终南入门试炼终止。', '终南验身'),
    ],
  },

  scene_zn_entry_15: {
    id: 'scene_zn_entry_15',
    title: '第十五幕 · 稽首受剑',
    subtitle: '重阳玄门清修主殿 · 正式拜师',
    mandatory: true,
    beats: [
      S('NPC-1054', '（双指离腕，抚须大悦）“经脉澄澈如山涧雪水，全无半点驳杂！无量寿佛，今日紫阳师尊与后山林前辈俱在闭关，便由贫道代收你入我【终南隐宗】外门！”'),
      N('你在三清祖师像前焚香三叩，接过马钰玄亲手递来的青布道剑与《全真入门剑法》抄本。'),
      S('NPC-1054', '“此套《全真入门剑法》共分一十三式，一板一眼皆含道家阴阳虚实之理。你既入山门，切记戒骄戒躁、勤修早课！”'),
    ],
    onFinishEffects: [openScene('scene_zn_entry_16', ZHONGNAN_ENTRY_QUEST_ID)],
  },

  scene_zn_entry_16: {
    id: 'scene_zn_entry_16',
    title: '第十六幕 · 终南新枝',
    subtitle: '重阳古观 · 烟霞满袖',
    mandatory: true,
    beats: [
      N('走出主殿，山风拂动你新换的终南青衫。远望长安城郭隐约可见，近看古柏苍翠、寒涧流云——你的终南问道之路，自此正式启程！'),
      P('（负剑长啸，心中澄明）“多谢诸位师长垂青！弟子定当勤修剑道，不负终南双脉威名！”'),
    ],
    choices: [
      {
        id: 'zn_entry_complete',
        label: '拜入终南隐宗外门 · 领受《全真入门剑法》',
        tone: 'gold',
        effects: [
          { type: 'joinSect', sectId: 'SECT-11', rank: 1 },
          { type: 'teachMartialArt', artId: 'MA-235', level: 1, autoEquip: true },
          { type: 'addSectContribution', amount: 30 },
          { type: 'giveCombatExp', amount: 180, reason: '完成终南隐宗入门试炼' },
          { type: 'modifyRenown', delta: 10, reason: '拜入终南隐宗' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1054' }, delta: 12 },
          { type: 'completeQuest', questId: ZHONGNAN_ENTRY_QUEST_ID, outcome: 'joined_zhongnan' },
          toast('恭喜正式拜入【终南隐宗】外门，习得《全真入门剑法》！', 'success', '终南入道'),
        ],
      },
    ],
  },
}
