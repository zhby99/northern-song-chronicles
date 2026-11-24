import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q30_QUEST_ID } from './shaolinSweepLeafZenQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq30_01: {
    id: 'scene_slq30_01',
    title: '第一幕 · 银杏霜深 · 借帚问道',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('{reignYear}深秋，少室山霜风渐起。藏经阁外那株千年古银杏褪尽青翠，满树金叶随风簌簌飘落，将青石小院铺成一片灿烂金毯。自七夕夜择定「慈悲默察」以来，你每日黎明独自立于庭外，静观那位终年佝偻着背、手持秃竹扫帚的无名老僧。'),
      S('NPC-0101', '（头也不抬，扫帚轻划石面发出沙沙轻响，声调平和如古井无波）“小施主在银杏树外看了整整七日。树叶落了要扫，心里的念头落了，光站在外头看，可扫不干净。”'),
      P('（心头微震，上前合十深揖一礼）“晚辈{playerName}见过老禅师。七夕夜在主阁撞见两位绝世高人暗窥七十二绝技，晚辈不愿以杀阵相逼，特来请教以佛法化戾之道。”'),
      S('NPC-0101', '（终于停下扫帚，浑浊却深邃如星海的双眸望了你一眼，指向墙角另一柄旧青竹扫帚）“老衲不过是个扫地杂役，哪懂什么化戾之道？你若真有闲心，便取那把扫帚，陪老衲扫完这庭秋叶罢。”'),
    ],
    choices: [
      {
        id: 'slq30_broom_martial',
        label: '【运劲试扫】取过竹帚略带少林棍劲挥扫，先净满院浮叶再请教禅机',
        subLabel: '开启《慈悲默察 · 扫叶听风》，进入扫地僧第一关',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_broom_start', value: 'martial' },
          { type: 'startQuest', questId: SHAOLIN_Q30_QUEST_ID, stepId: 'ginkgo_sweeping' },
          setStep(SHAOLIN_Q30_QUEST_ID, 'ginkgo_sweeping'),
          toast('已开启《慈悲默察 · 扫叶听风》！随法空老僧历三关禅悟。', 'talk', '扫叶听风'),
          openScene('scene_slq30_02', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_broom_humble',
        label: '【敛息虚握】尽数收束一身内力，虚握帚柄依老僧步频默然随扫',
        subLabel: '开启《慈悲默察 · 扫叶听风》，进入扫地僧第一关',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_broom_start', value: 'humble' },
          { type: 'startQuest', questId: SHAOLIN_Q30_QUEST_ID, stepId: 'ginkgo_sweeping' },
          setStep(SHAOLIN_Q30_QUEST_ID, 'ginkgo_sweeping'),
          toast('已开启《慈悲默察 · 扫叶听风》！随法空老僧历三关禅悟。', 'talk', '扫叶听风'),
          openScene('scene_slq30_02', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq30_02: {
    id: 'scene_slq30_02',
    title: '第二幕 · 第一关 · 扫叶察微',
    subtitle: '藏经阁 · 古银杏扫叶庭（观察推理）',
    illustrationUrl: '/assets/quests/sl_30_ginkgo_sweep.jpg',
    illustrationCaption: '古杏扫叶 · 朝露暮霜之间，陪法空老僧默扫满庭秋叶',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q30_broom_start=martial|初时你一帚带出三分罗汉劲，落叶飞扬却激起满院浮尘；法空淡然一笑点破“落叶飞东，明日风起又回西”。你深感汗颜，从此尽敛锋芒。|你虚握帚柄不带半分武学机心，随法空朝霜暮露默扫三十余日，法空微微颔首，偶以一两声轻咳引你合上秋风呼吸。}及至满月之期，你竹帚轻贴青石，落叶顺帚成堆而竟无一粒微尘惊起。'),
      N('这日薄暮北风穿阁，法空忽停帚而立，示意你留神银杏树下与藏经主阁四周的三处细微异状——'),
      N('一处是主阁西檐青砖上新添的半寸指力划痕，锐利如刀却仅显外家试招之刚；一处是二层东窗飘落的几片银杏叶竟无风自卷微焦，隐约伴随一缕逆冲膻中、郁结燥火的急促吐纳之音；一处是庭外石阶留有两滴半干泥水马靴印，似有江湖客日前路过阶前。'),
      S('NPC-0101', '（目视满地落叶，声音轻缓如风）“小施主扫了一月秋叶，耳目已清。这三处异状里，哪一处才是潜伏阁中那位怨戾高人露出的真正『心魔破绽』？”'),
    ],
    choices: [
      {
        id: 'slq30_clue_scratch',
        label: '主阁西檐青砖的半寸指力划痕——必是潜伏高人按捺不住傲气露出的破绽',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_clue_pick', value: 'scratch' },
          openScene('scene_slq30_03', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_clue_breath',
        label: '东窗下逆冲膻中的急促吐纳与无风焦卷落叶——乃强修绝技、戾气攻心无佛法化解之破绽',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_dust_seen', value: true },
          { type: 'setFlag', flag: 'sl_q30_clue_pick', value: 'breath' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q30_trial1_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q30_trial1_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq30_03', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_clue_boot',
        label: '庭外石阶残留的两滴泥水马靴印——说明潜伏者今夜已勾结外敌将动杀心',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_clue_pick', value: 'boot' },
          openScene('scene_slq30_03', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq30_03: {
    id: 'scene_slq30_03',
    title: '第三幕 · 武学之障 · 佛法能解',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      S('NPC-0101', '{ifFlag:sl_q30_dust_seen|（罕见地抬眼赞许颔首）“阿弥陀佛，小施主好清明的耳目与禅心！指痕靴印皆是皮毛，唯有那缕逆冲膻中、连枯叶都灼得微卷的郁结吐纳，才是强修杀伐绝技引动的心魔死结。”|（轻轻摇头，微笑着指向二层东窗下几片无风微颤的焦卷金叶）“指痕与靴印皆是身外浮尘。小施主细听东窗漏出的那缕吐纳——气息逆冲膻中、燥火淤积，连落叶都被暗劲蒸得微卷，这才是真正致命的心魔破绽。”}'),
      S('NPC-0101', '（声如古磬在清秋回荡）“本寺七十二绝技，每一项皆能伤人要害、大干天和，是以每一项绝技都须配有相应的慈悲佛法为之化解。偏偏偷学绝技的施主贪多务得、只修杀招不修佛法，每多练一门，心头戾气便重一分——这便是『武学障』。”'),
      N('轰然一声，如暮鼓晨钟敲击在你灵台深处！你苦修少林武学多年积存的一丝刚猛燥气，竟在法空一言之下化作清凉祥和！'),
      S('NPC-0101', '（合十含笑）“武学障深，唯有佛法能解。老衲手拙字丑，倒是小施主书法精严、经义通透。你既发慈悲愿，何不亲手抄一卷《法华经》与《楞伽经》要义置于阁中案头，再留一句佛偈点化其杀心？”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
      toast('第一关已过！请研墨抄经，于经卷夹页留偈点化潜伏高人。', 'talk', '抄经留偈'),
      openScene('scene_slq30_04', SHAOLIN_Q30_QUEST_ID),
    ],
  },

  scene_slq30_04: {
    id: 'scene_slq30_04',
    title: '第四幕 · 第二关 · 抄经留偈',
    subtitle: '藏经阁 · 西厢晒经校勘石台（佛偈机锋）',
    illustrationUrl: '/assets/quests/sl_30_copy_sutra.jpg',
    illustrationCaption: '案头抄经 · 焚香净手亲抄佛经，以慈悲佛偈化解武学戾气',
    mandatory: true,
    beats: [
      N('你在西厢石台旁置起古砚，汲少室清泉细研松烟墨，案头檀香袅袅。摊开雪白澄心堂纸，你将七十余重端庄楷法与八十余重佛学经义尽数融于狼毫笔尖，落笔如春蚕食叶，既不藏锋炫技，亦无半分凌厉杀意。'),
      N('写罢《楞伽经》与《法华经》化解戾气的核心篇章，墨香清雅。法空悄然立于案旁，目光温和地望向你手中蘸满朱砂的小楷毛笔。'),
      S('NPC-0101', '（轻声考校）“明知暗中有绝顶人物夜夜偷阅经书、身负血海深仇且杀心难抑。今番要在《法华经》夹页留下一句朱砂佛偈点化于他，小施主以为，当题何语？”'),
      P('（悬腕凝思，心念澄明如镜，于三句禅语间郑重落笔——）'),
    ],
    choices: [
      {
        id: 'slq30_gatha_stern',
        label: '“盗经坏戒终遭天谴，佛门重地不容宵小，速速自首伏法免受金刚雷霆！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_gatha_pick', value: 'stern' },
          openScene('scene_slq30_05', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_gatha_mercy',
        label: '“冤冤相报何时了，一念放下即菩提；强修绝技戾气生，须以佛法化痴嗔。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_sutra_insight', value: true },
          { type: 'setFlag', flag: 'sl_q30_gatha_pick', value: 'mercy' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q30_trial2_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q30_trial2_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq30_05', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_gatha_hollow',
        label: '“万法皆空、武学亦虚，尽废毕生修为归于枯寂方得大自在。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_gatha_pick', value: 'hollow' },
          openScene('scene_slq30_05', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq30_05: {
    id: 'scene_slq30_05',
    title: '第五幕 · 置卷经橱 · 无声垂泪',
    subtitle: '藏经阁 · 重檐琉璃藏经主阁二层',
    mandatory: true,
    beats: [
      S('NPC-0101', '{ifFlagEq:sl_q30_gatha_pick=mercy|（凝视那行温润朱砂楷字良久，终罕见地含笑颔首赞叹）“善哉！善哉！既不以怒言相激，亦不以顽空相欺，直指其怨恨与戾气之根源——小施主已有古大德悲悯气象！”|}{ifFlagEq:sl_q30_gatha_pick=stern|（轻轻一叹，提笔在纸尾添了一句温和朱批）“金刚怒喝反易激起困兽逆反。度人须先化其心结，容老衲替你缀上『一念放下即菩提，须以佛法化痴嗔』两语罢。”|}{ifFlagEq:sl_q30_gatha_pick=hollow|（微笑摇头，以朱笔轻圈两字改作圆融之语）“执着顽空亦是另一种执念，教背负血仇之人凭空自废武功反成空话；唯有『以佛法化痴嗔、一念放下即菩提』方能入其耳目。”|}'),
      N('待墨迹干透，你捧着夹有朱砂佛偈的《法华经》与《楞伽经》步上主阁二层，轻轻平放于「般若」「禅定」两座经橱正中案头，对着空寂经阁深深合十后悄然退下。'),
      N('次日黎明，你再度登阁检视：经卷依旧端端正正躺在原处，然而夹有佛偈的那一页边角却多了几道极浅的指腹摩挲折痕，宣纸之上更晕开两滴早已干涸的微湿水渍——仿佛某位盖世强者在深夜独读时，无声滴落的沧桑浊泪。'),
      N('满阁七十二绝技寂然安卧，昨夜竟再无半分暴戾杀气惊扰琉璃重檐。'),
    ],
    onFinishEffects: [openScene('scene_slq30_06', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_06: {
    id: 'scene_slq30_06',
    title: '第六幕 · 第三关 · 空帚印心',
    subtitle: '藏经阁 · 古银杏扫叶庭（禅心表态）',
    illustrationUrl: '/assets/quests/sl_30_empty_broom.jpg',
    illustrationCaption: '帚落无尘 · 扫叶听风终得心境圆明，无招无相自成宗师气象',
    mandatory: true,
    beats: [
      N('晨雾初散，你轻步走回古银杏扫叶庭。最后一次接过青竹扫帚轻扫霜叶时，你未动半分内力，周身气机却与天地秋风浑然一体，体内诸般武学在无声中圆融贯通、再无滞碍！'),
      S('NPC-0101', '（将那柄磨得秃圆的空竹扫帚横倚在古银杏树干上，神色罕见地庄重几分）“小施主方才下楼的步履，比一月之前轻了三分，却也沉了三分。老衲最后再问你一桩——”'),
      S('NPC-0101', '“世人皆言武功练到绝顶易生『武学障』。依小施主此刻心境，究竟何为武学障？异日若逢山河动荡、邪魔兵临少室山，你又当如何兼持这颗慈悲禅心与护世重担？”'),
      N('秋风掠过古杏枝头，满庭金叶静止了一瞬。你合十垂目，将胸中彻悟娓娓道出——'),
    ],
    choices: [
      {
        id: 'slq30_zen_bodhisattva',
        label: '【慈悲护世】武学障不在招式而在贪嗔执念：愿以佛法化怨，亦以不退大悲护佑苍生、渡己渡人',
        subLabel: '大乘菩萨护世心志（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_zen_vow', value: 'bodhisattva' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q30_trial3_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q30_trial3_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq30_07', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_zen_vajra',
        label: '【慈悲金刚】障生于杀念而不生于伏魔：能度化者以经感之，害民魔头以金刚手伏之而心不生嗔',
        subLabel: '外显金刚、内怀慈悲（禅心慈悲 +2）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_zen_vow', value: 'vajra' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q30_trial3_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q30_trial3_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq30_07', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_zen_quiet',
        label: '【扫尘亦扫帚】胜负名利皆为虚妄障眼，唯守自心清净无染，外魔自不能侵',
        subLabel: '清净自守、明心见性（禅心慈悲 +2）',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_zen_vow', value: 'quiet' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q30_trial3_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q30_trial3_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq30_07', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq30_07: {
    id: 'scene_slq30_07',
    title: '第七幕 · 法空深许 · 易筋伏笔',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      S('NPC-0101', '{ifFlagEq:sl_q30_zen_vow=bodhisattva|（浑浊双眸倏然透出一缕惊世清光，郑重还礼）“好一个『障在执念不在招式，以不退大悲渡己渡人』！小施主这份心量，已触及佛门大乘之巅。”|}{ifFlagEq:sl_q30_zen_vow=vajra|（微笑颔首，眼底满是深意）“伏魔而心不生嗔，执剑而意存慈悲——既不昧世间疾苦，亦不堕修罗杀业，难得，难得！”|}{ifFlagEq:sl_q30_zen_vow=quiet|（轻叹一声，语气温润如秋水）“守心清净自是上乘根基；只是他日天下苍生若陷水火，愿小施主勿忘众生亦在自心之中。”|}'),
      S('NPC-0101', '（遥望藏经主阁重檐，声音轻缓却仿佛穿透了数十年光阴）“少林千年古刹，从不缺刚猛无匹的罗汉金刚，唯独难得兼具盖世武才与如海慈悲的佛门砥柱。那两位潜伏阁中的施主，三十年怨结太深，终有一日会在藏经阁前彻底爆发。”'),
      S('NPC-0101', '“小施主，切莫忘了今日古杏扫叶的这份清明。倘若他日大劫临阁、冤仇对决之际，你仍守得住今日一颗慈悲心，这藏经阁最深处一卷洗筋易髓的达摩祖师真经，或许便会等来它真正的有缘人……”'),
      P('（心中剧震，知老僧绝非凡俗扫役，当即郑重稽首）“晚辈铭刻于心，无论前路何等风雨，永不敢忘古杏树下今日禅机！”'),
    ],
    onFinishEffects: [openScene('scene_slq30_08', SHAOLIN_Q30_QUEST_ID)],
  },

  scene_slq30_08: {
    id: 'scene_slq30_08',
    title: '第八幕 · 金叶入掌 · 境界圆明',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('微风拂过千年古银杏，一片金叶缓缓打旋飘落，恰恰稳稳停在你掌心之中。你微微一笑，翻掌送叶归尘，只觉体内气机圆润空明，距宗师之境仅隔一层薄纸！'),
      S('NPC-0101', '（微微颔首，眼神澄明如秋水）“风停叶落，本无去来。你这一月扫叶听风之功已然圆足，可以回院了。”'),
      N('斜阳映照古庭石桌与旧竹帚架。临别之际，法空老僧并不急着驱客，只安然立于树影间，仿佛静候你以自己的方式为这月余禅修画下句点。'),
    ],
    choices: [
      {
        id: 'slq30_seal_tea',
        label: '【寒茶论经】敬奉一盏少室山泉清茶，与法空老僧再印证片刻《楞伽》洗髓禅理',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_seal_mode', value: 'tea' },
          openScene('scene_slq30_09', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'slq30_seal_sweep',
        label: '【归帚留敬】替老僧将庭角最后半隅霜叶扫净归堆，合十无言留敬而去',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q30_seal_mode', value: 'sweep' },
          openScene('scene_slq30_09', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq30_09: {
    id: 'scene_slq30_09',
    title: '第九幕 · 禅意留香 · 默察功成',
    subtitle: '藏经阁 · 古银杏无名老僧扫叶庭',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q30_seal_mode=tea|你与法空对坐石阶共饮一盏少室寒茶，三言两语间俱是圆融无碍的洗髓禅理，听得你胸臆大畅、茅塞顿开。|你无言执帚将庭角最后一捧金叶归拢树根，将青竹扫帚端端正正靠回墙隅，向着老僧深深合十。}'),
      N('法空老僧含笑颔首，重新俯身拾起他那柄秃竹扫帚，不紧不慢地清扫起新落的银杏叶，仿佛方才那番震古烁今的三关禅对，只是秋风掠过琉璃檐角的一声轻叹。'),
      N('{ifFlag:sl_q30_sutra_insight|你亲题于《法华经》夹页的那句慈悲佛偈，已在不知不觉间于阁中暗影心底种下了一粒善因。|经法空点化的那卷抄经静静卧于阁中案头，如一盏微弱却不灭的慈悲心灯。}'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_pavilion', value: 'compassion' },
      { type: 'giveCombatExp', amount: 680, reason: '慈悲默察 · 扫叶听风' },
      { type: 'addArtExp', amount: 200 },
      {
        type: 'branch',
        condition: {
          type: 'all',
          conditions: [
            { type: 'flag', flag: 'sl_q30_dust_seen', op: 'truthy' },
            { type: 'flag', flag: 'sl_q30_sutra_insight', op: 'truthy' },
          ],
        },
        thenEffects: [
          { type: 'addArtExp', amount: 120 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 10 },
        ],
        elseEffects: [],
      },
      { type: 'modifySkill', key: '经义', delta: 2 },
      { type: 'modifySkill', key: '书', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0101' }, delta: 30 },
      { type: 'completeQuest', questId: SHAOLIN_Q30_QUEST_ID, outcome: 'completed' },
      toast(
        '《慈悲默察 · 扫叶听风》完结！实战经验 +680，武学修为 +200，经义 +2，书法 +1，法空好感 +30！',
        'success',
        '扫叶听风',
      ),
      openScene('scene_slq30_10', SHAOLIN_Q30_QUEST_ID),
    ],
  },

  scene_slq30_10: {
    id: 'scene_slq30_10',
    title: '第十幕 · 清风出庭 · 佛心如山',
    subtitle: '嵩山少林寺 · 藏经阁',
    mandatory: true,
    beats: [
      N('你合十辞别古银杏扫叶庭，迈步走出藏经阁朱漆大门。满山秋风迎面而来，吹动你的僧袍猎猎作响。'),
      N('回首望去，重檐琉璃在夕阳下静谧庄严，古银杏下扫帚沙沙之声隐约可闻。你步履从容、心境圆明，只觉过往一切武学刚躁皆已化归澄澈。'),
      P('（遥望少室山巅暮云，低宣一声佛号）“武学障深，唯有佛法能解。无论前路尚有多少江湖血雨腥风，这一颗历经扫叶听风淬炼的慈悲禅心，必如少室群峰屹立不动！”'),
    ],
  },
}
