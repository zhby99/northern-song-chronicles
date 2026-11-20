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
    stats: { hp: 280, mp: 100, agi: 16, res: 10 },
    talents: { bone: 44, comprehension: 28, charm: 20 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-201', move2: 'MA-204' },
    learnedArts: [{ artId: 'MA-199', level: 2 }, { artId: 'MA-201', level: 2 }, { artId: 'MA-204', level: 1 }],
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
    stats: { hp: 310, mp: 110, agi: 17, res: 11 },
    talents: { bone: 46, comprehension: 26, charm: 18 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-204', move2: 'MA-201' },
    learnedArts: [{ artId: 'MA-199', level: 2 }, { artId: 'MA-204', level: 2 }, { artId: 'MA-201', level: 2 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq01_01: {
    id: 'scene_slq01_01',
    title: '第一幕 · 五更冷水',
    subtitle: '少林外门寮房 · 寅时初刻',
    mandatory: true,
    beats: [
      N('{reignYear}寒意未退，嵩山少室峰顶尚覆着一层薄霜。你熬满山门杂役之期，昨夜方搬入外门通铺寮房，耳畔只听得松风呜咽、木鱼未响。'),
      N('忽听“哗啦”两声巨响！两桶刺骨山泉井水迎头泼入通铺之间，寒气直透骨髓，满屋十余名新晋外门弟子顿时惊呼跳起！'),
      S('NPC-0483', '（手提空木桶立于门框霜雾中，眉目沉静如古松）“阿弥陀佛！五更晨钟尚差半炷香便敲，诸位新入外门的{gender:师弟|师妹}，莫非还当自己在山下暖被窝里做少爷小姐？”'),
      S('NPC-0627', '（手执檀木戒尺轻敲门扉，声如洪钟）“一盏茶内束好绑腿，列队钟鼓禅院演武坪！迟一步者，今日早粥减半、加劈三担湿柴！”'),
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
      N('“咚——咚——咚——”大雄宝殿钟楼铜钟浑厚撞响，震落古柏枝头霜雪。你与同批新徒匆匆束紧灰布僧衣，冒着白雾奔至钟鼓禅院演武坪列队。'),
      S('NPC-0483', '（负手踱步于队列前，目光扫过众人冻得发红的手背）“天下武功出少林，但少林武功从来不是拿来逞凶斗狠的。欲习外门拳脚，必先定心调息——今日起，由我与虚音师弟传你们《少林小乘禅功》与《罗汉拳》！”'),
      S('NPC-0627', '（跨步沉腰，双掌抱圆吐气，脚下青砖竟隐隐发出一声闷响）“看好了！小乘禅功讲究『吸气沉丹田，呼气贯四梢』，莫要学江湖野路子憋红脸膛；罗汉拳则贵在『步稳如铁塔，拳出似木鱼』，一招一式皆须合着禅定节拍！”'),
      P('（你凝神默记虚松、虚音二位师兄的吐纳口诀与架势，脚下稳扎四平马步，顿觉先前挑水劈柴一年攒下的筋骨力道，竟隐隐与丹田气息贯通起来。）'),
    ],
    onFinishEffects: [openScene('scene_slq01_03', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_03: {
    id: 'scene_slq01_03',
    title: '第三幕 · 拳架初窥',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('虚音一式「降龙伏虎」接「黑虎掏心」，拳风虽未及身，激起的寒雾却卷得满院落叶打旋。众人依样画葫芦，唯独角落里一名锦缎夹袄藏在僧袍内的胖硕青年敷衍摆手，嘴角满是不屑。'),
      S('NPC-0673', '（低声嗤笑，用胳膊肘捅了捅身旁新徒）“切，什么罗汉拳小乘禅功，不过是给穷酸和尚练把式卖艺的粗浅桩功。我家在洛阳开着三间大钱庄，改日再给知客院添几百两香油，还怕学不到七十二绝技？”'),
      S('NPC-0483', '（耳力极佳，回头冷声喝止）“周海！马步虚浮，目视旁人，心魔未除何谈修禅？今日再加蹲半个时辰木桩，不得偷懒！”'),
      N('周海被当众训斥，脸色涨得通红，嘴上诺诺应下，转过头却阴恻恻地扫了站在前排、拳架最为沉稳的你与寒门新徒阿木一眼。'),
    ],
    onFinishEffects: [openScene('scene_slq01_04', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_04: {
    id: 'scene_slq01_04',
    title: '第四幕 · 晨课罢散',
    subtitle: '钟鼓禅院回廊',
    mandatory: true,
    beats: [
      N('辰时三刻，晨课方毕。虚松师兄走近拍了拍你发酸的肩头，眼中露出一丝难得的赞许。'),
      S('NPC-0483', '“你先前在山门踏实熬满一年杂役，下盘比旁人沉稳许多。《少林小乘禅功》吐纳法门与《罗汉拳》起手架子，今日已尽数传你，务必勤加演练。待你们过几日通过戒律院演武验看，便可正式领受法本。”'),
      P('“多谢虚松师兄、虚音师兄指点！弟子定当勤加琢磨，不敢懈怠。”'),
      N('二位师兄前脚刚赴藏经阁领诵早经，西侧外门寮房方向却忽传来一阵刺耳的瓷碗碎裂声与凄厉呼救！'),
    ],
    choices: [
      {
        id: 'slq01_accept_start',
        label: '循声赶往钟鼓禅院外门寮房一探究竟',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q01_QUEST_ID, stepId: 'morning_drill' },
          { type: 'teachMartialArt', artId: 'MA-159', autoEquip: true },
          { type: 'teachMartialArt', artId: 'MA-163', autoEquip: true },
          setStep(SHAOLIN_Q01_QUEST_ID, 'morning_drill'),
          toast('已开启《晨钟木鱼 · 罗汉开蒙》！请留在【钟鼓禅院】查明外门寮房骚动！', 'talk', '罗汉开蒙'),
        ],
      },
    ],
  },

  scene_slq01_05: {
    id: 'scene_slq01_05',
    title: '第五幕 · 寮房强夺',
    subtitle: '钟鼓禅院 · 外门新徒寮房',
    mandatory: true,
    beats: [
      N('你疾步推开外门寮房木门，只见通铺一片狼藉：寒门新徒阿木被人推倒在冰冷青砖上，嘴角渗血，怀里紧紧护着一件打满补丁的厚棉僧袍。'),
      N('富家外门周海正翘脚坐在最靠近火盆的暖炕上，身旁赫然站着两名膀大腰圆、满脸横肉的游方挂单恶僧——铁头净彪与黑面净莽！'),
      S(SPEAKER_POOR_NOVICE, '（颤声哭喊）“周师兄，这件棉袄是俺娘临行前连夜缝的！你屋里炭火盆烧着银霜炭，何苦连俺过冬的破棉衣也要抢去垫脚……”'),
      S('NPC-0673', '（冷笑一声，抬脚踩住棉衣一角）“穷酸种也配跟本公子睡同一间寮房？我屋里炭盆还缺几块挡风帘子！净彪、净莽，给我扒下来，再把这小子连同他那张破草席一块儿扔到山门外冻醒！”'),
    ],
    onFinishEffects: [openScene('scene_slq01_06', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_06: {
    id: 'scene_slq01_06',
    title: '第六幕 · 挺身断喝',
    subtitle: '外门寮房门前',
    mandatory: true,
    beats: [
      P('（你大步跨入寮房，一把扶起浑身发抖的阿木，冷眼直视周海与两名挂单恶僧）“住手！少林清净禅林，岂容你仗着几两臭钱勾结外僧欺凌同门？速把棉衣还给阿木！”'),
      S('NPC-0673', '（认出你便是晨课上被虚松夸赞的新徒，顿时恼羞成怒）“好你个不知天高地厚的穷杂役！方才在演武坪出风头不够，如今还敢管到本公子头上？你可知道，我爹捐的香油钱够养活你们这帮泥腿子吃三年糙米！”'),
      S(SPEAKER_ROGUE_MONK_A, '（捏得指节咯吱作响，狞笑着挡在门前）“周公子莫动气，这小子不知死活，待洒家兄弟俩拖到演武坪青石上，替你好好教教他什么叫少林规矩！”'),
      S(SPEAKER_ROGUE_MONK_B, '“嘿嘿，外门新徒私斗伤了筋骨，只说是切磋失手，谁能拿咱们怎样？小子，有种便滚出来接招！”'),
    ],
    choices: [
      {
        id: 'slq01_step_out_duel',
        label: '步出寮房踏上演武青石，以罗汉拳架迎战恶僧！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q01_QUEST_ID, 'confront_zhouhai'),
          openScene('scene_slq01_07', SHAOLIN_Q01_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq01_07: {
    id: 'scene_slq01_07',
    title: '第七幕 · 双恶扑击',
    subtitle: '钟鼓禅院演武坪（车轮连战）',
    mandatory: true,
    beats: [
      N('寒风卷过演武坪青石，众外门新徒闻讯围在廊下惊呼不已。铁头净彪与黑面净莽一左一右晃着粗壮臂膀逼近，招式狠辣肮脏，全无半分佛门气象！'),
      P('（深吸一口清晨冷气，默运虚松师兄方才所授小乘禅功吐纳法门，双拳一立摆开罗汉拳起手架势）“佛门清净地，容不得你们这等假僧撒野！放马过来！”'),
    ],
    choices: [
      {
        id: 'slq01_fight_rogues',
        label: '稳守马步，以罗汉拳迎战两名挂单恶僧！（车轮连战）',
        subLabel: '迎战铁头净彪与黑面净莽',
        tone: 'danger',
        effects: [
          // 旧档补发：在晨课传功前已推进到此处的存档，迎战前补授两门开蒙武学
          ...LUOHAN_INIT_ARTS.map((artId) => ({
            type: 'branch' as const,
            condition: { type: 'learnedArtAtLeast' as const, artId, minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt' as const, artId, autoEquip: true }],
          })),
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q01_QUEST_ID,
            opponent: { kind: 'custom', npc: buildRogueMonkA() },
            extraOpponents: [{ kind: 'custom', npc: buildRogueMonkB() }],
            rule: 'story_trial',
            forbidEscapeReason: '阿木尚在身后，岂能向挂单恶僧低头退缩！',
            introText: '【车轮连战 · 演武初锋】迎战周海雇来的游方挂单恶僧【铁头净彪】与【黑面净莽】！',
            onWin: [openScene('scene_slq01_08', SHAOLIN_Q01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('双恶夹击凶猛，暂退廊下调匀气息再战！', 'warn', '罗汉开蒙'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq01_08: {
    id: 'scene_slq01_08',
    title: '第八幕 · 周海亲战',
    subtitle: '钟鼓禅院演武坪青石',
    illustrationUrl: '/assets/quests/sl_01_luohan_duel.jpg',
    illustrationCaption: '演武青石 · 罗汉拳连挫挂单恶僧与周海，玄痛巡堂嘉许',
    mandatory: true,
    beats: [
      N('你沉腰坐马，借方才晨课领悟的罗汉拳沉稳步法，一记「罗汉撞钟」震退净彪，反手肘击将扑来的净莽扫翻在青石台阶下，两名恶僧滚作一团哀嚎不止！'),
      S('NPC-0673', '（见花钱请来的帮手顷刻溃败，面皮挂不住，一把扯掉外罩灰僧袍，露出双掌黑青的粗练铁砂掌色，怒吼跃上青石）“两个废物！真当本公子只会砸银子不成？老子在家早就请武师练过三年铁砂掌，今日便废了你这不知死活的穷酸！”'),
      P('“仗势欺人已是破戒，私携外道凶掌伤人更是罪加一等！周海，接招！”'),
    ],
    onFinishEffects: [openScene('scene_slq01_09', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_09: {
    id: 'scene_slq01_09',
    title: '第九幕 · 演武惩霸',
    subtitle: '钟鼓禅院演武坪（1v1 实战）',
    mandatory: true,
    beats: [
      N('周海虽仗家财偷懒怠课，但早年确在洛阳聘武师粗练过几手硬功，掌风呼啸颇有蛮劲！你心神澄明，谨记虚松、虚音「步稳如铁塔，拳出似木鱼」的要诀，正面迎了上去！'),
    ],
    choices: [
      {
        id: 'slq01_fight_zhouhai',
        label: '正面迎战富家外门【周海】！（三流下品 1v1 实战）',
        subLabel: '以少林堂堂正正之拳架破其蛮横铁砂掌',
        tone: 'danger',
        effects: [
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
            onWin: [openScene('scene_slq01_10', SHAOLIN_Q01_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('周海掌力蛮横，切莫硬接，稳住吐纳步法后再战！', 'warn', '演武惩霸'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq01_10: {
    id: 'scene_slq01_10',
    title: '第十幕 · 巡堂戒律',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('数合交锋，周海招式虚浮、气息凌乱的破绽尽显。你避过他一记猛扑，合身欺近，一式「双风贯耳」化作掌缘轻切其肩井穴，将周海整个人震得仰面跌坐青石之上，半晌爬不起身！'),
      S('NPC-0673', '（捂着发麻的肩头又惊又怒，嘴里仍不干不净）“你……你敢打伤本公子！我要去知客院告你私斗同门，把你逐出少林寺！”'),
      N('话音未落，一道如铁石敲击般的低沉佛号陡然响彻演武坪：“阿弥陀佛！好大的威风——少林戒律院何时轮到香油钱来做主了？”'),
      N('众人循声望去，但见身披绛红戒律袈裟的「铁掌禅师」玄痛长老不知何时已立于钟楼石阶之上，身旁正是闻讯赶回的虚松与虚音！'),
    ],
    onFinishEffects: [openScene('scene_slq01_11', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_11: {
    id: 'scene_slq01_11',
    title: '第十一幕 · 金刚怒目',
    subtitle: '钟鼓禅院石阶前',
    mandatory: true,
    beats: [
      S('NPC-0156', '（缓步走下石阶，目光如电扫过瘫坐在地的周海与两名挂单恶僧）“方才之事，老衲在钟楼廊下看得一清二楚。净彪、净莽二人借挂单之名行凶殴打本寺新徒，即刻缴其戒牒、逐出山门！周海仗势欺压同门、私雇恶僧，罚抄《金刚经》百遍、面壁思过三十日，再犯定逐出少林！”'),
      N('周海面如土色，连磕数个响头不敢再辩半句，被戒律僧架了下去。寒门新徒阿木捧回补丁棉衣，红着眼眶向你深深一揖。'),
      S('NPC-0156', '（转向你，素来严峻的面庞难得露出一丝赞许）“善哉！世人只道佛门慈悲低眉，却忘了菩萨低眉之外，尚有金刚怒目！你方才临阵拳架不乱，手下亦懂得留劲点穴、未伤同门性命，甚合我少林禅武合一之旨。”'),
      S('NPC-0483', '（合十微笑）“玄痛师伯明鉴！这位{gender:师弟|师妹}晨课悟性极佳，此番护持同门更显侠义本心，堪当领受《少林小乘禅功》与《罗汉拳》法本！”'),
    ],
    onFinishEffects: [openScene('scene_slq01_12', SHAOLIN_Q01_QUEST_ID)],
  },

  scene_slq01_12: {
    id: 'scene_slq01_12',
    title: '第十二幕 · 法本开蒙',
    subtitle: '钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('玄痛长老亲手自袖中取出两卷装帧古朴的线装法本，交予你掌中。微风吹过古刹檐角铜铃，清越之声涤荡心胸。'),
      S('NPC-0156', '“武学之道，如登嵩岳，不可一日懈怠。勤修《少林小乘禅功》以固本培元，熟习《罗汉拳》以强筋健骨。日后少林门下若有外务历练，老衲定会举荐于你。”'),
      P('（双手接过法本，肃然合十行礼）“弟子谨记玄痛师伯与虚松、虚音师兄教诲！定当严守戒律，潜心参悟禅武之道！”'),
      S('NPC-0483', '（自廊下抱来一只包袱）“师伯另有吩咐：外门行脚护寺，不能再穿杂役短打。这是常住拨下的护法杖、僧袍、马靴与念珠，你且收好。我再把少室山上下纵跃的《穿云纵》身法传你——打不过时，至少走得脱！”'),
    ],
    choices: [
      {
        id: 'slq01_finish_reward',
        label: '合十谢恩，正式领受《少林小乘禅功》与《罗汉拳》（完成开蒙）',
        tone: 'gold',
        effects: [
          ...LUOHAN_INIT_ARTS.map((artId) => ({
            type: 'branch' as const,
            condition: { type: 'learnedArtAtLeast' as const, artId, minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt' as const, artId }],
          })),
          { type: 'giveCombatExp', amount: 80, reason: '钟鼓禅院演武青石连挫恶僧与周海' },
          { type: 'addSectContribution', amount: 30 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 8 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0483' }, delta: 8 },
          ...SHAOLIN_STARTER_KIT_EFFECTS,
          { type: 'completeQuest', questId: SHAOLIN_Q01_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《晨钟木鱼 · 罗汉开蒙》！习得《少林小乘禅功》与《罗汉拳》，获玄痛长老与虚松师兄嘉许！',
            'success',
            '罗汉开蒙',
          ),
        ],
      },
    ],
  },
}
