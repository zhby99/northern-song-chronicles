import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q11_QUEST_ID } from './shaolinDamoNianhuaFingerQuest'

const SPEAKER_SAJIA_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '萨迦铁僧 · 贡布',
  title: '吐蕃大轮寺首席护法',
  factionName: '吐蕃大轮寺',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_BASANG_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '赤铜罗汉 · 巴桑',
  title: '吐蕃大轮寺金刚护法',
  factionName: '吐蕃大轮寺',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

const SPEAKER_SANGJIE_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '金刚译师 · 桑杰',
  title: '吐蕃大轮寺辩经护法',
  factionName: '吐蕃大轮寺',
  portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
}

function buildBasangMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ11_BASANG',
    name: '赤铜罗汉 · 巴桑',
    title: '吐蕃大轮寺金刚护法',
    realm: '二流中品',
    factionName: '吐蕃大轮寺',
    sectRank: 2,
    sectRankLabel: '密宗护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“哈哈！中原和尚的指头细得像绣花针，怎破得了我雪域密宗二十年练成的赤铜铁掌！”',
    stats: { hp: 1520, mp: 920, agi: 51, res: 36 },
    talents: { bone: 78, comprehension: 58, charm: 40 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-124', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-140', level: 6 }, { artId: 'MA-124', level: 5 }, { artId: 'MA-145', level: 5 }],
  })
}

function buildSajiaIronMonk(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ11_SAJIA_MONK',
    name: '萨迦铁僧 · 贡布',
    title: '吐蕃大轮寺首席护法',
    realm: '二流上品',
    factionName: '吐蕃大轮寺',
    sectRank: 3,
    sectRankLabel: '大轮寺护法',
    avatarUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg',
    talk: '“小僧好深邃的禅机！且看老僧以雪域密宗铁掌与烈焰刀意，试你少林七十二绝技的真成色！”',
    stats: { hp: 1860, mp: 1220, agi: 61, res: 41 },
    talents: { bone: 82, comprehension: 72, charm: 48 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-124', move2: 'MA-143' },
    learnedArts: [{ artId: 'MA-140', level: 7 }, { artId: 'MA-124', level: 6 }, { artId: 'MA-143', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq11_01: {
    id: 'scene_slq11_01',
    title: '第一幕 · 破玉挑衅',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      N('{reignYear}秋风清肃，嵩山少林寺大雄正殿却剑拔弩张——三名身披绛红氆氇袈裟、魁梧如铁塔的吐蕃大轮寺护法番僧昂然立于佛前蒲团之侧！玄慈方丈端坐主位，玄难首座与你肃立阶下。'),
      S(SPEAKER_SAJIA_MONK, '（首席护法贡布踏前一步，眼中桀骜毕露）“吐蕃大轮寺护法贡布、巴桑、桑杰，奉明王法谕东来礼佛！久闻中原少林藏有『七十二绝技』，只怕如今早已名存实亡了吧！”'),
      N('话音未落，贡布悍然伸出铁钳般的右手抓向供桌百年青玉净瓶！「咔嚓」一声脆响，坚硬青玉竟被其徒手捏成一蓬玉屑，瓶中清水亦被炽热掌劲蒸作白雾，唯余一枝完好青莲摇摇晃晃跌落青砖！'),
      S('NPC-0112', '（抬掌止住怒目而起的众武僧，声如古井无波）“阿弥陀佛。青玉无常，碎与不碎，佛性何曾增减？三位雪域高僧既来问禅，何妨先论佛理，再较武艺。达摩院弟子听谕——便由你代老衲应答大轮寺译师之问。”'),
      S('NPC-0127', '（低声传音入耳）“番僧来意不善，字字暗设机锋圈套。守住达摩院直指本心之旨，切莫落入琐碎口舌之争！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_02', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_02: {
    id: 'scene_slq11_02',
    title: '第二幕 · 禅辩首问 · 风幡之辨',
    subtitle: '大雄正殿 · 无提示禅宗公案（一）',
    mandatory: true,
    beats: [
      N('你整肃僧衣缓步出列，向玄慈与三名番僧各施一礼。金刚译师桑杰见出列的是一名年轻内门僧人，冷笑一声，抬手指向殿外秋风中猎猎翻卷的长条佛幡！'),
      S(SPEAKER_SANGJIE_MONK, '（声音尖利如刀，步步紧逼）“少林高僧不敢接话，推个小沙弥出来顶缸么？也罢！且问你第一桩公案——殿外秋风起，佛幡随风翻卷，我雪域众僧有人说风动，有人说幡动，争辩不休。你自诩中原禅宗祖庭，且答我：此刻究竟是风动，还是幡动？”'),
      N('满殿寂静，唯闻廊外佛幡呼啦作响。玄慈方丈含笑垂目，萨迦铁僧与赤铜罗汉冷笑抱臂，静待你一言破局——'),
    ],
    choices: [
      {
        id: 'slq11_q1_wind',
        label: '合十沉声：“无风则幡静，风起则幡摇；因果相循，动在风源，不在布幡。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_q1_right', value: false },
          openScene('scene_slq11_03', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'slq11_q1_mind',
        label: '合十微笑：“不是风动，不是幡动，仁者心动。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_q1_right', value: true },
          openScene('scene_slq11_03', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'slq11_q1_both',
        label: '合十肃然：“风与幡皆属尘世色相，聚散无常；执言风动幡动，俱是肉眼虚妄。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_q1_right', value: false },
          openScene('scene_slq11_03', SHAOLIN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq11_03: {
    id: 'scene_slq11_03',
    title: '第三幕 · 禅辩再问 · 西来之意',
    subtitle: '大雄正殿 · 无提示禅宗公案（二）',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q11_q1_right|「不是风动，不是幡动，仁者心动」——寥寥十一字落定，桑杰浑身剧震，竟不由自主倒退半步！玄慈方丈眼中精光一闪，颔首不语，殿中众少林僧暗暗喝彩。|桑杰闻言仰面抚掌冷笑：“哈！执着因果外相与口头谈空，皆是寻常经师的陈词套话，算不得直指人心！”虽极尽讥讽，却也见你从容不迫，收起半分轻视。}'),
      S(SPEAKER_SANGJIE_MONK, '（稳住心神，眸光更显刁钻，连珠炮般追出第二问）“再问你一桩——贵寺口口声声达摩东来、『不立文字，直指人心』。既不立文字，那藏经阁堆满万卷经书岂非自相矛盾？你且当殿答我：究竟如何是『佛祖西来意』？”'),
      N('此问直指达摩禅宗根本，更暗藏「言多必失、越辩越泥文字」的陷阱！你目光平静扫过地上那摊青玉碎屑与纤尘不染的青莲，瞬息之间心如明镜——'),
    ],
    choices: [
      {
        id: 'slq11_q2_sutra',
        label: '朗声引经：“经卷如指月之指，悟道乃见月之明；西来意全在《金刚经》『无住生心』四字。”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_q2_right', value: false },
          { type: 'setFlag', flag: 'sl_q11_debate_master', value: false },
          openScene('scene_slq11_04', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'slq11_q2_lotus',
        label: '一言不发，俯身于碎玉之中轻拈青莲举至眉际，面向众僧破颜微笑、默然静立',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_q2_right', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q11_q1_right', op: 'truthy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q11_debate_master', value: true },
              { type: 'setFlag', flag: 'sl_q11_basang_cleared', value: true },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q11_debate_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q11_debate_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
                ],
              },
            ],
            elseEffects: [{ type: 'setFlag', flag: 'sl_q11_debate_master', value: false }],
          },
          openScene('scene_slq11_04', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'slq11_q2_shout',
        label: '朗喝震殿：“青玉虽碎，佛性不灭！西来意便在护法降魔、不惧强梁之无畏禅锋之中！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_q2_right', value: false },
          { type: 'setFlag', flag: 'sl_q11_debate_master', value: false },
          openScene('scene_slq11_04', SHAOLIN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq11_04: {
    id: 'scene_slq11_04',
    title: '第四幕 · 迦叶微笑',
    subtitle: '大雄正殿 · 无言禅辩',
    illustrationUrl: '/assets/quests/sl_11_silent_debate.jpg',
    illustrationCaption: '无声禅辩 · 碎玉之前拈莲微笑，禅宗机锋震慑大轮寺三番僧',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q11_debate_master|大殿刹那鸦雀无声！你于碎玉间轻拈青莲破颜微笑，一字未言却已将「灵山世尊拈花，迦叶破颜微笑」之无上禅机化于眼前！金刚译师桑杰冷汗涔涔，喃喃低语“风幡心动、拈花一笑……中原禅宗竟仍有此等机锋，桑杰服了！”|你答罢俯身拾起青莲轻放回佛前净盘。桑杰虽未再于佛理上纠缠，眉梢仍留半分桀骜；玄慈方丈则合十轻叹，赞你临阵不慌、护住了少林清静气象。}'),
      S(SPEAKER_BASANG_MONK, '{ifFlag:sl_q11_debate_master|（原本摩拳擦掌的赤铜罗汉巴桑盯着那枝青莲呆立良久，竟缓缓收敛凶焰，低首合十退后两步）“小师父两道禅机如晨钟暮鼓……老僧修的不过是粗浅铁身，论禅心远不及你，这一阵老僧甘拜下风，不出手了！”|（赤铜罗汉巴桑嘿嘿冷笑，拍得古铜双臂闷雷般作响）“文斗说破天也不过动动嘴皮！小和尚，待会儿到了演武坪，且先接老僧二十年修成的赤铜铁掌再说大话！”}'),
      S(SPEAKER_SAJIA_MONK, '（萨迦铁僧贡布脸色铁青，跨前一步沉声发难）“哼！{ifFlag:sl_q11_debate_master|巴桑师弟既被你禅机折服，老僧便亲自下场！|论经不过前戏，武林之中终究要凭真功夫说话！}小和尚，可敢移步殿外演武坪，以少林七十二绝技领教我雪域密宗铁掌？”'),
      P('（将青莲端正安放净盘，神色从容如水）“客随主便。小僧愿在钟鼓禅院演武坪恭候护法赐教。”'),
    ],
    onFinishEffects: [openScene('scene_slq11_05', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_05: {
    id: 'scene_slq11_05',
    title: '第五幕 · 偏厢授指',
    subtitle: '大雄宝殿东厢偏室',
    mandatory: true,
    beats: [
      N('玄慈方丈命知客僧引三名吐蕃护法先赴钟鼓禅院演武坪奉茶歇脚，玄难首座则将你唤入东厢偏室，神色凝重而欣慰。'),
      S('NPC-0127', '“{ifFlag:sl_q11_debate_master|两重公案一击中的、不战而折服巴桑，你今日大长了我达摩院禅宗威风！|你方才在大雄正殿镇定自若，守住了少林体面。}然那贡布乃是吐蕃大轮寺赫赫有名的首席护法，一手雪域铁掌兼修外门硬功与烈焰刀意，寻常刚猛拳剑震不开他的护体罡气。”'),
      N('玄难缓缓伸出右手，拇指与食指轻扣如拈春花，隔空微微一弹——三步外香案上一朵白菊花瓣丝毫无损，花瓣后方半寸厚的青砖却悄无声息裂开一道细纹！'),
      S('NPC-0127', '“你既与『拈花』有此禅缘，老衲便将少林七十二绝技之一、地阶绝学《拈花指》于此传授于你！切记：此指讲究『触之如拂花，劲发如针透』，专破横练铁身之气脉空隙！”'),
      N('玄难将《拈花指》蓄柔透刚之心诀倾囊相授。你既有《伏魔剑》之沉稳与《散花掌》之柔旋根底，片刻之间便已领悟精要！'),
    ],
    choices: [
      {
        id: 'slq11_go_courtyard',
        label: '拜谢玄难首座，习得《拈花指》移步钟鼓禅院演武坪！',
        tone: 'gold',
        effects: [
          teachArtNow('MA-063'),
          { type: 'startQuest', questId: SHAOLIN_Q11_QUEST_ID, stepId: 'tubo_courtyard_spar' },
          setStep(SHAOLIN_Q11_QUEST_ID, 'tubo_courtyard_spar'),
          toast('已开启《迦叶微笑 · 灵山拈花》并领悟地阶绝学《拈花指》！请赴【钟鼓禅院 · 演武坪】应战！', 'talk', '灵山拈花'),
        ],
      },
    ],
  },

  scene_slq11_06: {
    id: 'scene_slq11_06',
    title: '第六幕 · 赤铜拦路',
    subtitle: '钟鼓禅院演武坪（应对赤铜罗汉巴桑）',
    mandatory: true,
    beats: [
      N('钟鼓禅院演武坪四周早已站满观战的少林僧众。玄慈方丈与玄难首座并肩立于廊下石阶，神色沉静。'),
      N('坪中央，赤铜罗汉巴桑脱去半边绛红袈裟，露出古铜色宛如铸铁般的筋骨臂膀，双掌合击发出闷雷般的金铁震响！'),
      S(SPEAKER_BASANG_MONK, '（踏步震得青砖微颤，狞笑大喝）“小和尚，听说你要用绣花般的指法来破老僧二十年的赤铜铁身？先过老僧这一关，才配见贡布师兄！”'),
      N('巴桑虽勇悍暴烈，实则外强中干、最重颜面与护法虚名。此刻面对拦路副僧，你决意如何破关？'),
    ],
    choices: [
      {
        id: 'slq11_persuade_basang',
        label: '【禅辩补救 · 点破执相】以雄辩佛理戳破雪域横练执着身相之弊，不战折服巴桑！',
        subLabel: '跳过巴桑之战，直面首席护法萨迦铁僧（禅心慈悲 +1）',
        tone: 'jade',
        condition: { type: 'skillAtLeast', key: '辩才', min: 55 },
        effects: [
          { type: 'setFlag', flag: 'sl_q11_basang_cleared', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q11_basang_persuaded', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q11_basang_persuaded', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq11_07', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'slq11_fight_basang',
        label: '【拈花破铜】右指轻拢如拈春花，正面 1v1 较技赤铜罗汉巴桑！',
        subLabel: '二流中品密宗护法 · 以《拈花指》柔劲透穴破其赤铜铁身',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildBasangMonk() },
            rule: 'story_trial',
            forbidEscapeReason: '少林满院僧众与方丈皆在观战，岂能退缩示弱！',
            introText: '【1v1 演武破硬功】迎战吐蕃大轮寺金刚护法【赤铜罗汉 · 巴桑】（二流中品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q11_basang_cleared', value: true },
              openScene('scene_slq11_07', SHAOLIN_Q11_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('巴桑铁掌刚猛沉重，暂退三步调息，再寻其穴位破绽！', 'warn', '灵山拈花'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq11_07: {
    id: 'scene_slq11_07',
    title: '第七幕 · 柔指卸铜',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q11_basang_persuaded|你未出半指，只合十朗声问道：“护法苦练赤铜铁身二十载，究竟为度雪域众生，还是甘为他人试刃之盾？佛门修心不修壳，若连『不著身相』都参不透，纵炼成铜人亦是顽铁死物！”巴桑如遭棒喝，脸色由赤转白，呆立良久终究低首合十退下坪去！|十余合间，你以散花步避实就虚，两指看似轻拂其臂弯，三息之后柔劲却如银针钻入曲池大穴！趁巴桑收掌换气刹那，你右指凌空点中其膻中半寸，他二十年赤铜硬气顿时如泄气皮囊轰然溃散，踉跄跌坐青石坪上！}'),
      S(SPEAKER_BASANG_MONK, '{ifFlag:sl_q11_basang_persuaded|（神色惭愧，向你深深一礼）“小师父一言点醒梦中人……老僧确是着了硬功蛮相，甘拜下风！”|（捂着胸口大口喘气，满脸骇然）“你的指头根本没用力，为何我一身铁布衫硬功突然散得干干净净？！”}'),
      S(SPEAKER_SAJIA_MONK, '（萨迦铁僧贡布脸色彻底沉如寒铁，大步踏入坪中）“巴桑师弟退下！小和尚确有几分达摩院真传，老僧兼修雪域铁掌与大轮密宗烈焰劲气，今日亲自称称你的《拈花指》！”'),
      S('NPC-0127', '（廊下玄难微微颔首提点）“此僧修为已达二流上品，掌中隐含灼热刀意，切忌硬接锋芒，须以柔劲透穴破之！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_08', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_08: {
    id: 'scene_slq11_08',
    title: '第八幕 · 拈花对烈掌',
    subtitle: '钟鼓禅院演武坪（1v1 萨迦铁僧）',
    illustrationUrl: '/assets/quests/sl_11_nianhua_finger.jpg',
    illustrationCaption: '灵山拈花 · 双指柔劲破铁掌罡风，禅意与烈焰交锋演武坪',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q11_debate_master|钟鼓禅院演武坪四周僧众肃立。大殿之上你连破两道公案、令巴桑不战自退的禅威犹在，萨迦铁僧贡布亲自步入坪心，再不敢有丝毫轻慢，双掌缓缓推出一圈灼热红晕！|秋风骤止！萨迦铁僧贡布大喝一声密宗真言，双掌挟带滚滚热浪排山倒海压来，连坪边石灯里的油焰都被这股霸道掌风逼得剧烈摇曳！}'),
      S(SPEAKER_SAJIA_MONK, '“{ifFlag:sl_q11_debate_master|巴桑师弟心神已为你的无言禅机所慑，老僧便亲自领教少林《拈花指》究竟有几分火候！|接老僧雪域大轮密宗铁掌！}”'),
      P('（心境如幽谷寒潭，不见半分波澜，拇指食指轻拢如拈春花）“阿弥陀佛！护法掌力虽烈，却失之躁急——且看小僧以《拈花指》破之！”'),
    ],
    choices: [
      {
        id: 'slq11_fight_sajia',
        label: '凝神施展《拈花指》，力战吐蕃首席护法萨迦铁僧！（1v1 决战）',
        subLabel: '二流上品强敌 · 以柔劲透穴破雪域密宗铁掌',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSajiaIronMonk() },
            rule: 'story_trial',
            forbidEscapeReason: '此战关乎少林七十二绝技声威，唯有全力破敌！',
            introText: '【1v1 演武终战】迎战吐蕃大轮寺首席护法【萨迦铁僧 · 贡布】（二流上品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq11_09', SHAOLIN_Q11_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('萨迦铁僧掌劲酷烈，暂且退步调匀禅息，再以拈花指复战！', 'warn', '灵山拈花'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq11_09: {
    id: 'scene_slq11_09',
    title: '第九幕 · 隔空点脉',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('激战三十余合，演武坪落叶狂卷！萨迦铁僧久攻不下心浮气躁，猛然双掌合推使出压箱底的密宗重掌，滚滚热浪迎面扑来，欲一举将你震飞出坪！'),
      N('电光火石间，你不避不闪，左掌以《散花掌》圆弧斜引其三分偏锋，右手于咫尺之间骤然探出——《拈花指》「灵山一指」！一缕细如游丝却凝练无匹的柔和禅劲穿透灼热掌风，隔空一寸精准点中贡布神门、缺盆二穴！'),
      N('“噗！”一声轻响，萨迦铁僧双掌间炽烈红晕刹那湮灭，两条铁臂无力垂落，连退三步方稳住身形。他低头望向胸前——绛红袈裟完好无损，连一丝褶皱都未曾被指风撕破，体内沸腾的密宗罡气却已如春雪遇阳，消弭无踪！'),
      N('满院观战的少林僧众齐声诵响佛号，声震嵩山云霄！'),
    ],
    onFinishEffects: [openScene('scene_slq11_10', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_10: {
    id: 'scene_slq11_10',
    title: '第十幕 · 礼遣番僧',
    subtitle: '钟鼓禅院演武坪（终战抉择）',
    mandatory: true,
    beats: [
      N('萨迦铁僧贡布呆立良久，满脸傲慢尽数化作敬畏叹服，携桑杰、巴桑齐齐整肃袈裟走到你身前。'),
      S(SPEAKER_SAJIA_MONK, '（声音洪亮而诚恳，再无半分挑衅）“老僧输得心服口服！破玉容易，留衣点脉难！少林寺仅仅一名达摩院内门弟子便有如此禅机与《拈花指》修为，七十二绝技果真名不虚传！”'),
      S(SPEAKER_SANGJIE_MONK, '（满面愧色，双手奉上一对珍贵雪域白玉供瓶）“方才我等妄毁佛前青玉净瓶、言语无状，实乃坐井观天，谨献白玉净瓶赔罪，恳请方丈与高僧海涵！”'),
      N('玄慈方丈含笑步下石阶，将礼遣吐蕃三僧下山之仪交由你定夺——面对彻底折服的雪域大轮寺护法，你决意如何相送？'),
    ],
    choices: [
      {
        id: 'slq11_send_respect',
        label: '【赠经礼送】以佛门平等之礼回赠手抄《金刚经》卷轴，恭送吐蕃僧众出山',
        subLabel: '以慈悲弘法化雪域芥蒂，结两地佛门善缘（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_tubo_respected', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq11_11', SHAOLIN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'slq11_send_warn',
        label: '【沉声立威】凛然告诫大轮寺护法：十年之内勿再窥伺中原禅林！',
        subLabel: '以雷霆佛威震慑雪域野心（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q11_tubo_respected', value: false },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq11_11', SHAOLIN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq11_11: {
    id: 'scene_slq11_11',
    title: '第十一幕 · 合十长揖',
    subtitle: '大雄宝殿方丈院',
    illustrationUrl: '/assets/quests/sl_11_tubo_bow.jpg',
    illustrationCaption: '番僧长揖 · 吐蕃大轮寺三护法折服赔礼，恭敬辞别嵩山',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q11_tubo_respected|你双手奉上一卷墨香犹存的手抄《金刚经》，温言道：“雪域中原同奉世尊，愿以此经共结法缘。”贡布眼眶微热，郑重接过经卷珍藏怀中，携桑杰、巴桑面向大雄宝殿与你行了一记雪域佛门最隆重的长揖大礼，恭敬辞别下山。|你目光沉毅、声如洪钟：“少林慈悲不争，然千年祖庭亦不容外道轻侮，望大轮寺诸位铭记今日之教，十年之内勿再窥伺中原禅林！”三名番僧神色凛然，面向大雄宝殿深深长揖赔罪，垂首缓步退下山门。}'),
      S('NPC-0112', '（玄慈方丈慈眉善目地望着你，连声赞叹）“阿弥陀佛！文能以公案拈花压服辩经译师，武能以柔指透穴折服铁掌护法——{ifFlag:sl_q11_tubo_respected|更难得你赠经化怨、展我佛门大度，实乃达摩院百年难得之佳徒！|守住了少林威严，只是切记威猛之后尤须持慈悲之心，方不坠戾障。}”'),
      S('NPC-0127', '（玄难首座亦抚须微笑）“此番交手，你已将《拈花指》『柔而不弱、透骨不伤』之境体悟至大成。方丈在此见证，今日便将这门七十二绝技之一正式录于你名下！”'),
    ],
    onFinishEffects: [openScene('scene_slq11_12', SHAOLIN_Q11_QUEST_ID)],
  },

  scene_slq11_12: {
    id: 'scene_slq11_12',
    title: '第十二幕 · 绝技真传',
    subtitle: '大雄宝殿方丈院',
    mandatory: true,
    beats: [
      N('玄慈方丈亲手为你加披达摩院高阶袈裟绶带，玄难首座则将珍藏的《拈花指法全卷》交予你手。'),
      S('NPC-0112', '（神色微敛，语重心长地叮嘱）“孩子，切记一事：少林七十二绝技虽妙，终究只是渡河之舟。每多学一门绝技，招中戾气便重一分，须以更深厚的慈悲佛法去化解，万万不可重蹈昔年偏执强练之覆辙。”'),
      P('（心头微动，隐约想起幽谷石室中卧病不起的玄澄师伯，双手接过法卷郑重稽首）“弟子谨记方丈与首座慈训，必以佛法涤心，不敢稍有骄躁！”'),
    ],
    choices: [
      {
        id: 'slq11_complete',
        label: '拜谢玄慈方丈与玄难首座，正式领受《拈花指》真传',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-063' },
          { type: 'giveCombatExp', amount: 420, reason: '禅辩压阵并以拈花指折服吐蕃大轮寺护法' },
          { type: 'addSectContribution', amount: 160 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q11_debate_master', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q11_QUEST_ID, outcome: 'completed' },
          toast('已完成《迦叶微笑 · 灵山拈花》，习得少林地阶绝学《拈花指》！', 'success', '灵山拈花'),
        ],
      },
    ],
  },
}
