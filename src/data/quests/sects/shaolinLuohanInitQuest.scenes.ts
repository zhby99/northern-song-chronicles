import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q01_QUEST_ID } from './shaolinLuohanInitQuest'
import { SHAOLIN_STARTER_KIT_EFFECTS } from './sectStarterKits'

/** 罗汉开蒙所授：《少林小乘禅功》（MA-159）与《罗汉拳》（MA-163） */
const LUOHAN_INIT_ARTS = ['MA-159', 'MA-163'] as const

const SPEAKER_POOR_NOVICE: StorySpeakerSpec = {
  kind: 'custom',
  name: '阿木',
  title: '寒门外门新徒',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_ROGUE_MONK_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁头恶僧 · 净彪',
  title: '游方挂单恶僧',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

const SPEAKER_ROGUE_MONK_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑面恶僧 · 净莽',
  title: '游方挂单恶僧',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildRogueMonkA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ01_ROGUE_A',
    name: '铁头恶僧 · 净彪',
    title: '游方挂单恶僧',
    realm: '不入流',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '挂单恶僧',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: '“刚脱杂役短打的毛头小子也敢管周公子的闲事？吃洒家一拳！”',
    stats: { hp: 145, mp: 55, agi: 11, res: 4 },
    talents: { bone: 44, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-201' },
    learnedArts: [{ artId: 'MA-199', level: 1 }, { artId: 'MA-201', level: 1 }],
  })
}

function buildRogueMonkB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ01_ROGUE_B',
    name: '黑面恶僧 · 净莽',
    title: '游方挂单恶僧',
    realm: '不入流',
    factionName: '江湖散人',
    sectRank: 0,
    sectRankLabel: '挂单恶僧',
    avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
    talk: '“净彪师兄，莫留手！打断他两根肋骨，周公子少不了咱们十两酒肉钱！”',
    stats: { hp: 155, mp: 60, agi: 12, res: 4 },
    talents: { bone: 46, comprehension: 26, charm: 18 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-204' },
    learnedArts: [{ artId: 'MA-199', level: 1 }, { artId: 'MA-204', level: 1 }],
  })
}

const BACKFILL_LUOHAN_ARTS_EFFECTS = LUOHAN_INIT_ARTS.map((artId) => ({
  type: 'branch' as const,
  condition: { type: 'learnedArtAtLeast' as const, artId, minLevel: 1 },
  thenEffects: [],
  elseEffects: [{ type: 'teachMartialArt' as const, artId, autoEquip: true }],
}))

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq01_01: {
    id: 'scene_slq01_01',
    title: '第一幕 · 五更冷水',
    subtitle: '少林外门寮房 · 寅时初刻',
    mandatory: true,
    beats: [
      N('{reignYear}寒意未退，嵩山少室峰顶尚覆着薄霜。你熬满山门杂役，昨夜方搬入外门通铺寮房，木鱼未响，忽听“哗啦”两声巨响——两桶刺骨山泉井水迎头泼入通铺，十余名新徒顿时惊呼跳起！'),
      S('NPC-0483', '（提着空木桶立于门框霜雾中，眉目沉静如古松）“阿弥陀佛！五更晨钟尚差半炷香便敲，诸位新入外门的{gender:师弟|师妹}，莫非还当自己在山下暖被窝里做少爷小姐？”'),
      S('NPC-0627', '（手执檀木戒尺敲响门扉，声如洪钟）“一盏茶内束好绑腿，列队钟鼓禅院演武坪！迟一步者，今日早粥减半、加劈三担湿柴！”'),
      N('通铺角落里，寒门新徒阿木冻得嘴唇发紫，仍小心护住那件打满补丁的旧棉袄；而靠窗暖炕上的胖硕青年周海却慢悠悠披着夹丝锦袄，冲你和阿木嗤笑了一声。'),
    ],
    onFinishEffects: [openScene('scene_slq01_02', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_02: {
    id: 'scene_slq01_02',
    title: '第二幕 · 晨钟开蒙',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    illustrationUrl: '/assets/quests/sl_01_morning_bell.jpg',
    illustrationCaption: '钟鼓禅院 · 五更晨钟响彻演武坪，虚松虚音开蒙授罗汉拳',
    mandatory: true,
    beats: [
      N('“咚——咚——咚——”大雄宝殿钟楼铜钟撞响，震落古柏枝头霜雪。众人冒着白雾奔至钟鼓禅院演武坪列队。'),
      S('NPC-0483', '（负手踱步于队列前）“天下武功出少林，但少林武功从不是逞凶斗狠之器。欲习外门拳脚，必先定心调息——今日起，由我与虚音师弟传你们《少林小乘禅功》与《罗汉拳》！”'),
      S('NPC-0627', '（沉腰抱圆吐气，一式「降龙伏虎」卷起满院霜叶）“听真！小乘禅功贵在『吸气沉丹田，呼气贯四梢』；罗汉拳贵在『步稳如铁塔，拳出似木鱼』，一招一式皆须合着禅定节拍！”'),
      S('NPC-0673', '（藏在队列后排敷衍比划，低声嗤笑）“切，什么小乘禅功罗汉拳，不过给穷酸卖艺的粗浅桩功。我家在洛阳开着三间钱庄，改日给知客院再添几百两香油，还怕学不到七十二绝技？”'),
      S('NPC-0483', '（耳力极佳，冷声喝止）“周海！马步虚浮，心魔未除何谈修禅？加蹲半个时辰木桩！”——周海满脸涨红，诺诺应下，转过头却阴恻恻扫了前排拳架沉稳的你与阿木一眼。'),
    ],
    onFinishEffects: [openScene('scene_slq01_04', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_04: {
    id: 'scene_slq01_04',
    title: '第三幕 · 拳心问志',
    subtitle: '钟鼓禅院回廊（禅心与怒目初念）',
    mandatory: true,
    beats: [
      N('辰时三刻，晨课方毕。你一年杂役打熬的筋骨隐隐与丹田气息相合，虚松师兄走近拍了拍你发酸的肩头，眼中露出难得的赞许。'),
      S('NPC-0483', '“《少林小乘禅功》吐纳法门与《罗汉拳》起手架子，今日已尽数传你。不过少林同门百千，练同一套拳架，日后走出山门却各有因果——你初窥拳意，觉得这副拳架的根本何在？”'),
      N('正待你作答之际，西侧外门寮房方向却忽传来一阵刺耳的瓷碗碎裂声与凄厉呼救！虚松眉头微蹙，吩咐你先定下心中一念，速去察看同门动静。'),
    ],
    choices: [
      {
        id: 'slq01_stance_zen',
        label: '「以禅御拳」步稳心定，宁守己身不轻伤人（禅心慈悲 +1）',
        subLabel: '习得《少林小乘禅功》与《罗汉拳》，循声赶往外门寮房',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q01_QUEST_ID, stepId: 'morning_drill' },
          { type: 'teachMartialArt', artId: 'MA-159', autoEquip: true },
          { type: 'teachMartialArt', artId: 'MA-163', autoEquip: true },
          { type: 'setFlag', flag: 'sl_q01_stance', value: 'zen' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          setStep(SHAOLIN_Q01_QUEST_ID, 'morning_drill'),
          toast('已开启《晨钟木鱼 · 罗汉开蒙》！请留在【钟鼓禅院】查明外门寮房骚动！', 'talk', '罗汉开蒙'),
        ],
      },
      {
        id: 'slq01_stance_wrath',
        label: '「以拳破妄」刚劲疾发，逢恶则摧绝不手软（怒目杀业 +1）',
        subLabel: '习得《少林小乘禅功》与《罗汉拳》，循声赶往外门寮房',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q01_QUEST_ID, stepId: 'morning_drill' },
          { type: 'teachMartialArt', artId: 'MA-159', autoEquip: true },
          { type: 'teachMartialArt', artId: 'MA-163', autoEquip: true },
          { type: 'setFlag', flag: 'sl_q01_stance', value: 'wrath' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          setStep(SHAOLIN_Q01_QUEST_ID, 'morning_drill'),
          toast('已开启《晨钟木鱼 · 罗汉开蒙》！请留在【钟鼓禅院】查明外门寮房骚动！', 'talk', '罗汉开蒙'),
        ],
      },
    ],
  },

  scene_slq01_05: {
    id: 'scene_slq01_05',
    title: '第四幕 · 寮房强夺',
    subtitle: '钟鼓禅院 · 外门新徒寮房（三策破局）',
    mandatory: true,
    beats: [
      N('你推开外门寮房木门，只见通铺一片狼藉：阿木被人踹倒在冰冷青砖上，嘴角渗血，怀里死死护着母亲连夜缝制的补丁厚棉袍；周海翘脚坐在银霜炭盆旁，左右赫然立着两名横肉满脸的游方挂单恶僧——铁头净彪与黑面净莽！'),
      S(SPEAKER_POOR_NOVICE, '（颤声哭喊）“周师兄，你屋里烧着银霜炭，何苦连俺过冬的破棉衣也要抢去垫脚……”'),
      S('NPC-0673', '（抬脚踩住棉衣，冷笑扫向大步进门的你）“哟，这不是晨课上出尽风头的穷杂役么？我爹捐的香油钱够养活你们吃三年糙米！净彪、净莽，连他一块儿拖出去教教规矩！”'),
      S(SPEAKER_ROGUE_MONK_A, '（捏得指节咯吱作响，狞笑挡门）“外门切磋失手，谁能拿咱们怎样？周公子许了十两酒肉钱，小子，滚出来接招！”'),
      N('廊外已有七八名新徒探头张望。你一把扶起颤抖的阿木，眼看双恶堵门、周海得意冷笑，心念电转之间已有数般应对——'),
    ],
    choices: [
      {
        id: 'slq01_approach_persuade',
        label: '【佛理折锋】当众引戒律喝破挂单僧借寺行凶之罪，震退双恶！',
        subLabel: '免战两名挂单恶僧，直面恼羞成怒的周海（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【辩才】或【经义】≥ 35',
          conditions: [
            { type: 'skillAtLeast', key: '辩才', min: 35 },
            { type: 'skillAtLeast', key: '经义', min: 35 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q01_approach', value: 'persuade' },
          { type: 'setFlag', flag: 'sl_q01_helped_novice', value: true },
          { type: 'setFlag', flag: 'sl_q01_rogues_cleared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          setStep(SHAOLIN_Q01_QUEST_ID, 'confront_zhouhai'),
          openScene('scene_slq01_06_persuade', SHAOLIN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'slq01_approach_silver',
        label: '【解囊护同门】掷出 15 两纹银打发贪财恶僧，替阿木买断干系！',
        subLabel: '花费 15 两银遣散恶僧、当众折周海颜面，直面周海 1v1（禅心慈悲 +1）',
        tone: 'gold',
        condition: { type: 'silverAtLeast', min: 15 },
        effects: [
          { type: 'giveSilver', amount: -15, reason: '代寒门新徒阿木解围打发挂单恶僧' },
          { type: 'setFlag', flag: 'sl_q01_approach', value: 'silver' },
          { type: 'setFlag', flag: 'sl_q01_helped_novice', value: true },
          { type: 'setFlag', flag: 'sl_q01_rogues_cleared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          setStep(SHAOLIN_Q01_QUEST_ID, 'confront_zhouhai'),
          openScene('scene_slq01_06_silver', SHAOLIN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'slq01_approach_fight',
        label: '【金刚怒目】佛门清规岂容匪僧撒野！踏青石以罗汉拳连战双恶！',
        subLabel: '正面迎战挂单恶僧车轮战与周海（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q01_approach', value: 'fight' },
          { type: 'setFlag', flag: 'sl_q01_helped_novice', value: true },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          setStep(SHAOLIN_Q01_QUEST_ID, 'confront_zhouhai'),
          openScene('scene_slq01_07', SHAOLIN_Q01_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq01_06_persuade: {
    id: 'scene_slq01_06_persuade',
    title: '第五幕 · 舌剑退僧',
    subtitle: '外门寮房门前（佛理折锋线）',
    mandatory: true,
    beats: [
      P('（你丝毫不退，朗声对着廊外越聚越多的外门弟子喝道）“大宋律令与少林寺规载明：凡游方挂单僧借宿古刹却私受银钱殴伤本寺弟子者，戒律院当场缴没官府度牒、押解登封县追补三载丁税！各位同门皆在门外作证——净彪、净莽，你们为了十两酒肉钱，连护身度牒也不要了么？”'),
      S(SPEAKER_ROGUE_MONK_B, '（闻言脸色骤变，一把拉住净彪袖口压低声音）“师兄……这小子说得门清，真惊动了戒律院缴了咱们的度牒，下山连官府赋役都免不了，这十两银子烫手啊！”'),
      S(SPEAKER_ROGUE_MONK_A, '（衡量片刻，冲周海抱拳干笑两声）“周公子，少林寺规矩大，洒家兄弟今日还有香客要见，告辞！”'),
      N('两名恶僧竟在众目睽睽之下夹尾溜走！周海颜面扫地，脸皮紫胀如猪肝，恨恨推开桌案冲上演武坪青石！'),
    ],
    onFinishEffects: [openScene('scene_slq01_08', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_06_silver: {
    id: 'scene_slq01_06_silver',
    title: '第五幕 · 散财息兵',
    subtitle: '外门寮房门前（解囊护同门线）',
    mandatory: true,
    beats: [
      P('（你神色平静，反手自怀中摸出一锭十五两碎银“叮当”掷在青砖上）“周海许你们十两酒肉钱，这里十五两。拿了银子即刻滚出外门寮房，莫教阿木的棉衣沾了脏血！”'),
      S(SPEAKER_ROGUE_MONK_A, '（眼珠顿时发直，弯腰一把抄起碎银掂了掂，咧嘴大笑）“哈哈！还是这位小师父敞亮！周公子，既然有人出更高价买平安，洒家兄弟就先去山下打壶好酒喽！”'),
      S(SPEAKER_POOR_NOVICE, '（捧着失而复得的旧棉袄，眼眶通红地死死拉住你衣角）“师……师兄，十五两银子够俺家种两年地了，你为俺一个穷小子破费这么多……”'),
      N('围观同门一阵低呼哗然。花钱买打手反被你用银子当众打脸，周海气得浑身发抖，怒喝着冲上演武坪青石要与你单挑！'),
    ],
    onFinishEffects: [openScene('scene_slq01_08', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_07: {
    id: 'scene_slq01_07',
    title: '第五幕 · 双恶扑击',
    subtitle: '钟鼓禅院演武坪（车轮连战）',
    mandatory: true,
    beats: [
      N('寒风卷过演武坪青石，众外门新徒围在廊下惊呼不已。铁头净彪与黑面净莽一左一右晃着粗壮臂膀逼近，招式狠辣肮脏，全无半分佛门气象！'),
      P('（深吸清晨冷气，默运虚松师兄方才所授小乘禅功吐纳法门，双拳一立摆开罗汉拳架势）“佛门清净地，容不得假僧撒野！放马过来！”'),
    ],
    choices: [
      {
        id: 'slq01_fight_rogues',
        label: '稳守马步，以罗汉拳迎战两名挂单恶僧！（车轮连战）',
        subLabel: '迎战铁头净彪与黑面净莽',
        tone: 'danger',
        effects: [
          // 旧档补发：在晨课传功前已推进到此处的存档，迎战前补授两门开蒙武学
          ...BACKFILL_LUOHAN_ARTS_EFFECTS,
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRogueMonkA() },
            extraOpponents: [{ kind: 'custom', npc: buildRogueMonkB() }],
            rule: 'story_trial',
            forbidEscapeReason: '阿木尚在身后，岂能向挂单恶僧低头退缩！',
            introText: '【车轮连战 · 演武初锋】迎战周海雇来的游方挂单恶僧【铁头净彪】与【黑面净莽】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q01_rogues_cleared', value: true },
              openScene('scene_slq01_08', SHAOLIN_Q01_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双恶夹击凶猛，暂退廊下调匀气息再战！', 'warn', '罗汉开蒙'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq01_08: {
    id: 'scene_slq01_08',
    title: '第六幕 · 演武惩霸',
    subtitle: '钟鼓禅院演武坪青石（三流下品 1v1 实战）',
    illustrationUrl: '/assets/quests/sl_01_luohan_duel.jpg',
    illustrationCaption: '演武青石 · 少林罗汉拳正面对决周海，护持外门清规',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q01_approach=persuade|净彪、净莽被你一番戒律喝得夹尾遁走，周海在众同门哂笑声中彻底失了颜面|}{ifFlagEq:sl_q01_approach=silver|眼睁睁看着雇来的恶僧揣着你的十五两银子扬长而去，周海当众颜面扫地|}{ifFlagEq:sl_q01_approach=fight|你一记「罗汉撞钟」震退净彪、反肘扫翻净莽，两名恶僧滚作一团哀嚎不止，周海眼见帮手溃败|}{ifFlag:sl_q01_approach||演武坪上帮手溃散，周海颜面尽失}，猛地一把扯掉外罩灰僧袍，露出双掌隐泛青黑的粗练铁砂掌色，怒吼跃上青石！'),
      S('NPC-0673', '“两个吃里扒外的废物！真当本公子只会砸银子不成？老子在洛阳早聘武师练过三年铁砂掌，今日不废了你这穷杂役，我周海还有何颜面在少林立足！”'),
      P('（默运《少林小乘禅功》，脚踏四平马步）“仗势欺人已是破戒，私携外道凶掌伤人更是罪加一等！周海，接招！”'),
    ],
    choices: [
      {
        id: 'slq01_fight_zhouhai',
        label: '正面迎战富家外门【周海】！（三流下品 1v1 实战）',
        subLabel: '以少林堂堂正正之拳架破其蛮横铁砂掌',
        tone: 'danger',
        effects: [
          ...BACKFILL_LUOHAN_ARTS_EFFECTS,
          {
            type: 'startCombat',
            questId: SHAOLIN_Q01_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0673',
              realmCap: '三流下品',
              talkOverride:
                '“哼！我家老太爷捐了半座偏殿的香油钱，岂是你这种寒酸杂役可比的？接我铁砂掌！”',
            },
            rule: 'story_trial',
            forbidEscapeReason: '众目睽睽之下，护持同门与少林清规绝不可退！',
            introText: '【1v1 演武惩霸】迎战富家外门【周海】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq01_09', SHAOLIN_Q01_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('周海掌力蛮横，切莫硬接，稳住吐纳步法后再战！', 'warn', '演武惩霸'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq01_09: {
    id: 'scene_slq01_09',
    title: '第七幕 · 巡堂定夺',
    subtitle: '钟鼓禅院石阶前（慈悲与戒律抉择）',
    mandatory: true,
    beats: [
      N('数合交锋，周海招式虚浮的破绽尽显。你避过猛扑，合身一式「双风贯耳」化作掌缘轻切其肩井穴，将周海整个人震得仰面跌坐青石之上！'),
      S('NPC-0673', '（捂着发麻的肩头又惊又怒）“你敢打伤本公子！我要去知客院告你私斗同门，叫玄净禅师把你逐出山门！”'),
      N('话音未落，一道铁石敲击般的低沉佛号陡然震彻演武坪：“阿弥陀佛！少林戒律院何时轮到香油钱来做主了？”——身披绛红戒律袈裟的「铁掌禅师」玄痛长老赫然立于钟楼石阶之上，虚松与虚音肃立其侧！'),
      S('NPC-0156', '（目光如电扫过面如土色的周海，复转向你，声如洪钟）“方才前因后果，老衲在钟楼廊下皆看在眼里。挂单恶僧勾结生事，自有戒律僧缉拿逐山。至于周海……此番是你挺身护下阿木、又亲手挫其凶焰，你且说，依你之见，该当如何发落这纨绔同门？”'),
    ],
    choices: [
      {
        id: 'slq01_spare_zhouhai',
        label: '【菩萨低眉】请师伯免其皮肉之苦，罚抄《金刚经》百遍、替寒门同门劈柴挑水三十日悔过',
        subLabel: '宽宥化怨，得虚松与寒门同门敬服（禅心慈悲 +1 · 侠义 +10）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q01_zhouhai_spared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'modifyChivalry', delta: 10, reason: '以德报怨请免周海杖责、令其劳作悔过' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0483' }, delta: 5 },
          openScene('scene_slq01_10', SHAOLIN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'slq01_punish_zhouhai',
        label: '【金刚怒目】仗势雇凶险酿大祸，请师伯依戒律重责二十戒棍、削去三月香火优待以儆效尤！',
        subLabel: '严明寺规，深合铁掌禅师玄痛刚直脾性（怒目杀业 +1 · 玄痛好感大增）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q01_zhouhai_beaten', value: true },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 8 },
          openScene('scene_slq01_10', SHAOLIN_Q01_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq01_10: {
    id: 'scene_slq01_10',
    title: '第八幕 · 法本开蒙',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      S('NPC-0156', '（点头朗声宣判）“善哉！{ifFlag:sl_q01_zhouhai_spared|既如此，便依你宽仁之言，罚周海面壁抄经百遍、每日挑水劈柴替寮房寒门同门代劳三十日，若再犯定逐出少林！|既如此，戒律堂重责周海二十戒棍、撤其暖炕炭盆三月，以正外门视听！}”'),
      N('周海听罢{ifFlag:sl_q01_zhouhai_spared|愣了一瞬，伏地重重磕了三个响头，眼底戾气竟散了大半|吓得魂飞魄散，连声哀嚎着被戒律僧架了下去}。阿木捧回补丁棉衣，红着眼眶向你深深长揖。'),
      S('NPC-0156', '（自袖中取出两卷线装法本交予你手，神色郑重）“{ifFlagEq:sl_q01_approach=persuade|你方才不战而屈人之兵，一言退双恶，更难得临阵收劲留德；|你方才临阵拳架不乱、进退有度，颇具少林气象；}这两卷《少林小乘禅功》与《罗汉拳》法本，今归你收执。日后寺中若有外务历练，老衲定会举荐于你。”'),
      S('NPC-0483', '（抱来一只布包袱微笑递上）“师伯另有吩咐：外门行脚护寺，不能再穿杂役短打。这是常住拨下的护法杖、僧袍、马靴与念珠，你且收好。我再把少室山上下纵跃的《穿云纵》身法传你——打不过时，至少走得脱！”'),
    ],
    choices: [
      {
        id: 'slq01_finish_reward',
        label: '合十谢恩，正式领受法本与外门行装（完成《晨钟木鱼 · 罗汉开蒙》）',
        tone: 'gold',
        effects: [
          ...BACKFILL_LUOHAN_ARTS_EFFECTS,
          { type: 'giveCombatExp', amount: 80, reason: '钟鼓禅院演武青石护持同门力挫周海' },
          { type: 'addSectContribution', amount: 30 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q01_approach', op: 'eq', value: 'persuade' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 8 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0483' }, delta: 8 },
          ...SHAOLIN_STARTER_KIT_EFFECTS,
          { type: 'completeQuest', questId: SHAOLIN_Q01_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《晨钟木鱼 · 罗汉开蒙》！习得《少林小乘禅功》《罗汉拳》与《穿云纵》，开启少林禅武之途！',
            'success',
            '罗汉开蒙',
          ),
        ],
      },
    ],
  },
}
