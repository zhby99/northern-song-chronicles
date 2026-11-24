import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q14_QUEST_ID } from './shaolinJielvOneSlapQuest'

const SPEAKER_YAN_HENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '严横',
  title: '铁罗汉 · 西夏黑道悍匪',
  factionName: '西夏黑道',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildYanHengBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ14_YANHENG',
    name: '严横',
    title: '铁罗汉 · 西夏黑道悍匪',
    realm: '二流中品',
    factionName: '西夏黑道',
    sectRank: 0,
    sectRankLabel: '西夏悍匪',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“哈哈哈哈！老子练就二十载横练铁布衫，寻常刀剑难伤分毫！少林小秃驴竟敢孤身登檐送死！”',
    stats: { hp: 1380, mp: 1040, agi: 46, res: 34 },
    talents: { bone: 80, comprehension: 56, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-144', move2: 'MA-124' },
    learnedArts: [
      { artId: 'MA-140', level: 6 },
      { artId: 'MA-144', level: 6 },
      { artId: 'MA-124', level: 6 },
    ],
  })
}

function buildYanHengAmbushedBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ14_YANHENG_AMBUSH',
    name: '严横',
    title: '铁罗汉 · 失据惊惶',
    realm: '二流中品',
    factionName: '西夏黑道',
    sectRank: 0,
    sectRankLabel: '西夏悍匪',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“小秃驴好毒的眼力！竟摸准了老子藏身暗瓦——不过就凭你，也休想轻易拿下我的铁布衫！”',
    stats: { hp: 1180, mp: 900, agi: 42, res: 29 },
    talents: { bone: 80, comprehension: 56, charm: 32 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-144', move2: 'MA-124' },
    learnedArts: [
      { artId: 'MA-140', level: 5 },
      { artId: 'MA-144', level: 6 },
      { artId: 'MA-124', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq14_01: {
    id: 'scene_slq14_01',
    title: '第一幕 · 汴京血信',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，寒霜铺满钟鼓禅院青石。你自汝州古庙归山以来潜心苦修经义、书法与辩才，气息愈发沉凝。这日清晨，玄寂长老神色铁青地召你入廊，掌中紧攥着一封火漆密函。'),
      S('NPC-0134', '（目光凝重，提及汝州旧案）“阿弥陀佛。{ifFlagEq:sl_jielv_style=strict|昔日汝州一案，你铁面无私逐出叛僧、令清规震慑四方；|昔日汝州一案，你悲智双运、既折叛僧又不绝孤老生路；}老衲信得过你临大事时的沉稳气度。如今东京开封府出了一桩惊天血案，须得你随老衲星夜东行！”'),
      S('NPC-0134', '“近十日内，汴京城接连有三位富绅在深宅大院中惨死，凶手每次作案后皆在粉墙血书『般若降魔』四字，更刻意遗落少林式样的念珠嫁祸祖庭！如今御史台已有言官上疏质问少林纵僧妄杀，驻守大相国寺的【慧禅】师侄已在【资圣八角琉璃宝塔】整理好三案验尸卷宗候咱们汇合！”'),
      P('（闻言神色凛然，合十欠身）“竟有奸徒敢在天子脚下连环行凶、嫁祸少林！弟子愿即刻动身赴开封大相国寺，绝不容祖庭蒙此不白之冤！”'),
    ],
    choices: [
      {
        id: 'slq14_accept_investigate',
        label: '【验尸勘证】星夜东赴大相国寺，誓凭铁证洗刷少林蒙冤！',
        subLabel: '前往开封府 · 大相国寺 · 资圣八角琉璃宝塔会合慧禅',
        tone: 'jade',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q14_QUEST_ID, stepId: 'bianliang_zisheng_hunt' },
          setStep(SHAOLIN_Q14_QUEST_ID, 'bianliang_zisheng_hunt'),
          toast(
            '已开启《一拍两散 · 汴京缉凶》！请前往【开封府 · 大相国寺 · 资圣八角琉璃宝塔】汇合！',
            'talk',
            '汴京缉凶',
          ),
        ],
      },
      {
        id: 'slq14_accept_pursue',
        label: '【雷霆缉凶】星夜疾驰汴京，生擒狂徒以正佛门威名！',
        subLabel: '前往开封府 · 大相国寺 · 资圣八角琉璃宝塔会合慧禅',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q14_QUEST_ID, stepId: 'bianliang_zisheng_hunt' },
          setStep(SHAOLIN_Q14_QUEST_ID, 'bianliang_zisheng_hunt'),
          toast(
            '已开启《一拍两散 · 汴京缉凶》！请前往【开封府 · 大相国寺 · 资圣八角琉璃宝塔】汇合！',
            'talk',
            '汴京缉凶',
          ),
        ],
      },
    ],
  },

  scene_slq14_02: {
    id: 'scene_slq14_02',
    title: '第二幕 · 宝塔验尸与勘察',
    subtitle: '开封府 · 大相国寺 · 资圣八角琉璃宝塔（现场推理）',
    mandatory: true,
    beats: [
      N('东京开封府冬雪初霁，大相国寺香火鼎盛却暗流汹涌。你登临资圣八角琉璃宝塔高阁，玄寂长老早已在座，身旁青灰禅衣的壮年武僧【慧禅】连忙合十相迎，将三起血案的仵作验尸格目、血字摹本与现场物证尽数摊在长案之上。'),
      S('NPC-0378', '“师弟请看！三名遇害富绅表面上是京城绸缎粮商，实则皆暗中替朝廷往陕西前线筹措军粮。墙上『般若降魔』四字虽仿中原颜体，勾挑却惯向右下方斜撇，隐隐透着西夏番文笔势！”'),
      N('你俯身逐一勘查木盘中封存的三处现场线索：其一，仵作格目记「死者胸口留有焦黑掌印却无肋骨碎裂，实乃内腑暗震致死，皮表焦痕疑为死后烟灰熏染掩人耳目」；其二，三户豪宅后院屋檐青瓦之上，俱发现了微弱的「西夏贺兰山红泥靴印与半截沉香绳」；其三，第三户案发巷口茶肆桌脚下，遗落着一枚再寻常不过的「开封皇宋通宝铜钱」。'),
      S('NPC-0134', '（负手而立，双目如炬考校于你）“凶手身怀硬功、又受雇于西夏军情，此刻仍潜伏在甜水巷一带伺机再行暗杀。案上这三处线索真伪杂陈——依你之见，哪一处才直指凶手真实的藏身规律与破绽？”'),
    ],
    choices: [
      {
        id: 'slq14_clue_palm',
        label: '以「死者胸口焦黑掌印却无骨裂」为主线，推演凶手善使阴柔毒掌、必藏身阴湿地窖暗渠',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q14_clue_solved', value: false },
          openScene('scene_slq14_03', SHAOLIN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'slq14_clue_roof',
        label: '以「屋檐瓦片残留西夏贺兰山红泥靴印与半截沉香绳」为破绽，直指凶手惯借沉香绳攀伏甜水巷高檐暗阁！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q14_clue_solved', value: true },
          openScene('scene_slq14_03', SHAOLIN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'slq14_clue_coin',
        label: '以「巷口茶肆遗落的开封铜钱」为线索，断定凶手白日扮作京城商贩混迹市井茶坊',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q14_clue_solved', value: false },
          openScene('scene_slq14_03', SHAOLIN_Q14_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq14_03: {
    id: 'scene_slq14_03',
    title: '第三幕 · 锁定铁罗汉',
    subtitle: '资圣八角琉璃宝塔高阁',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q14_clue_solved|玄寂闻言抚掌大赞，慧禅亦拍案称绝！贺兰山红泥绝非汴京所有，沉香绳更专用于夜登高檐悬梁潜伏——你一语便锁死了凶手盘踞甜水巷高檐暗阁的行踪规律！|玄寂微微摇头，拈起木盘中那截沉香绳与红泥瓦屑递到你眼前：“胸口焦痕乃掩盖横练刚劲的障眼法，开封铜钱更随处可见；唯独这贺兰山红泥靴印与沉香绳，方暴露其惯伏高檐暗阁的习气。”}'),
      S('NPC-0134', '（眼神陡寒，指尖轻叩卷宗）“十年前甘凉道与西夏黑道出了个横行无忌的悍匪，外号『铁罗汉』严横！此人将一门外家硬功铁布衫练至二流中品大成，寻常刀剑难伤分毫，又贪财嗜杀——定是西夏密探重金雇他潜入汴京行刺军粮豪绅，再嫁祸我少林离间朝野！”'),
      S('NPC-0378', '“玄寂师伯明鉴！那严横既练成铜皮铁骨，寻常拳棍击之如击败革，今夜在甜水巷周府该如何一举生擒而不致走脱？”'),
      S('NPC-0134', '（望向窗外朔雪纷飞的琉璃塔尖，朗声吩咐）“慧禅，你速去甜水巷暗中盯紧最后一位经手军粮的周家大宅！至于师侄你——随老衲登塔顶！严横倚仗横练铁功横行，老衲偏要传你少林破甲绝艺《一拍两散掌》制他！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_04', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_04: {
    id: 'scene_slq14_04',
    title: '第四幕 · 塔顶传掌',
    subtitle: '资圣八角琉璃宝塔顶层',
    illustrationUrl: '/assets/quests/sl_14_zisheng_teach.jpg',
    illustrationCaption: '一拍两散 · 资圣宝塔顶层朔风飞雪，玄寂亲演示惊世掌力',
    mandatory: true,
    beats: [
      N('慧禅领命疾步下塔。玄寂引你登临资圣宝塔最高露台，朔风卷雪扑面，八角琉璃风铃铮铮齐鸣。玄寂深吸一口冷气，右手缓缓抬起，掌心淡若无物，周遭三丈飞雪却骤然停滞半空！'),
      N('下一瞬，玄寂轻描淡写向前虚拍一掌！无声无息间，一股凝练如实质的劲风破空而出，十丈外一截积雪枯柏枝干竟应声化作漫天细屑，飘散在汴京暮风之中！'),
      S('NPC-0134', '“老衲外号『一拍神僧』，平生最得意者便是这门少林七十二绝技——《一拍两散掌》！此掌不求花巧连招，只求凝周身内息于劳宫一寸，由静入动、破妄归空，纵是精钢铁壁亦化齑粉！你且盘膝闭目，随我口诀引气三周天！”'),
      N('你依言默诵《金刚经》「应无所住而生其心」，引丹田内息汇于右掌；经玄寂指风轻点肩井穴引导，刹那间真气如百川归海，掌心隐隐发出低沉雷鸣，短短两柱香便已踏入《一拍两散掌》蓄劲门径！'),
    ],
    onFinishEffects: [
      teachArtNow('MA-083'),
      { type: 'setFlag', flag: 'sl_q14_taught_palm', value: true },
      openScene('scene_slq14_05', SHAOLIN_Q14_QUEST_ID),
    ],
  },

  scene_slq14_05: {
    id: 'scene_slq14_05',
    title: '第五幕 · 甜水巷警讯',
    subtitle: '资圣八角琉璃宝塔高阁',
    mandatory: true,
    beats: [
      N('亥时三刻，一只灰羽信鸽振翅落上宝塔窗台。玄寂解下竹筒密笺展开一看，浓眉骤紧。'),
      S('NPC-0134', '“慧禅传讯：甜水巷周府外已发现西夏暗哨踪迹，铁罗汉严横极可能于子时越墙行刺周老爷！开封府耳目众多，大相国寺高僧若倾巢而出既恐打草惊蛇，亦防西夏余党趁虚袭寺。”'),
      P('（起身合十，掌中微温内息流转不息）“玄寂师伯坐镇相国寺稳住大局便是！弟子愿趁雪夜潜赴甜水巷周府屋脊，会同慧禅师兄设伏，必生擒铁罗汉严横以雪祖庭奇冤！”'),
      S('NPC-0134', '“善！切忌与他久耗蛮力，须寻准他催动铁布衫、气机最盛亦最僵硬的一瞬，以《一拍两散掌》一击破其门户！去罢！”'),
    ],
    choices: [
      {
        id: 'slq14_go_tianshui',
        label: '踏雪离寺，子夜潜赴甜水巷周府屋脊围捕「铁罗汉」严横！',
        tone: 'danger',
        effects: [openScene('scene_slq14_06', SHAOLIN_Q14_QUEST_ID)],
      },
    ],
  },

  scene_slq14_06: {
    id: 'scene_slq14_06',
    title: '第六幕 · 子夜甜水巷围捕',
    subtitle: '开封府 · 甜水巷周府屋脊（围捕战术 · 实战）',
    illustrationUrl: '/assets/quests/sl_14_tianshui_roof.jpg',
    illustrationCaption: '子夜甜水巷 · 飞雪青瓦之上，铁罗汉严横现身周府屋脊',
    mandatory: true,
    beats: [
      N('三更梆子在寂静雪夜中远远传开。甜水巷青砖黛瓦覆着一层薄雪，周府高墙内灯火皆熄。忽闻瓦片一声极轻脆响，一条铁塔般的魁梧黑影借半截沉香绳荡过东北墙头，稳稳落在歇山屋脊之上！'),
      N('此人光头赤眉、双臂粗壮如铜柱，腰间故意挂着一串伪造的粗木佛珠——正是西夏黑道悍匪「铁罗汉」严横！他俯身探视檐下暗阁，嘴角扯起一丝残忍狞笑。'),
      S(SPEAKER_YAN_HENG, '（觉察屋檐风动，回眸狞笑晃了晃伪造佛珠）“嘿嘿，老子当是玄寂亲至，原来来了个毛还没长齐的少林小秃驴！把你脑袋拧下来扔在周老财床前，西夏主顾那千两黄金又稳入袋中！”'),
      N('雪夜屋脊狭仄湿滑，屋下便是周府满门老小！瞥见严横脚下松动的檐瓦与巷口暗影中徘徊的市井地保，你心念急转，瞬息定下围捕之策——'),
    ],
    choices: [
      {
        id: 'slq14_tactic_web',
        label: '【巧布罗网先断退路】抢占屋脊制高点，一掌震碎暗瓦逼严横失据！',
        subLabel: '需先前勘破高檐红泥靴印或实战身法 ≥ 48 · 先手制敌 1v1（胜后禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q14_clue_solved', op: 'truthy' },
            { type: 'combatStatAtLeast', key: 'agility', min: 48 },
          ],
          hint: '需先前勘破红泥靴印与沉香绳线索，或实战身法 ≥ 48',
        },
        effects: [
          toast('你早算准高檐暗阁退路，踏雪抢占飞檐制高点，一掌震碎严横藏身暗瓦令其惊慌失措！', 'success', '巧布罗网'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYanHengAmbushedBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '屋下便是周府满门老小，今夜绝不能放严横逃脱行凶！',
            introText: '【甜水巷屋脊 · 巧布罗网】震碎暗瓦断其退路，1v1 擒拿失据惊惶的【铁罗汉 · 严横】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              { type: 'setFlag', flag: 'sl_q14_tactic', value: 'web' },
              openScene('scene_slq14_07', SHAOLIN_Q14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('严横横练硬功刚猛难挡，暂借飞檐脱身调息后再赴资圣宝塔重整伏击！', 'warn', '汴京缉凶'),
            ],
          },
        ],
      },
      {
        id: 'slq14_tactic_bribe',
        label: '【出银买通市井眼线】付 25 两银向地保探得严横卸甲换防时辰，突袭落单悍匪！',
        subLabel: '需 25 两纹银打点地保（已打点重试免复费）· 趁其卸甲落单突袭 1v1',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q14_bribed', op: 'truthy' },
            { type: 'silverAtLeast', min: 25 },
          ],
          hint: '需 25 两纹银打点甜水巷地保眼线（已打点则免复费）',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q14_bribed', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -25, reason: '汴京甜水巷出银买通地保眼线探得严横换防破绽' },
              { type: 'setFlag', flag: 'sl_q14_bribed', value: true },
              toast('你付过二十五两纹银，地保悄声报出严横卸甲换防的空档！你趁其落单破绽骤起突袭！', 'success', '市井眼线'),
            ],
            elseEffects: [
              toast('地保眼线早已探明严横换防破绽，无需再费银两，趁其卸甲落单再度突袭！', 'talk', '再袭严横'),
            ],
          },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYanHengAmbushedBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '屋下便是周府满门老小，今夜绝不能放严横逃脱行凶！',
            introText: '【甜水巷屋脊 · 眼线奇袭】趁其卸甲落单突袭【铁罗汉 · 严横】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q14_tactic', value: 'bribe' },
              openScene('scene_slq14_07', SHAOLIN_Q14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('严横负隅顽抗劲力凶狠，暂借飞檐脱身调息后再袭（眼线线索仍在，无需再付银两）！', 'warn', '汴京缉凶'),
            ],
          },
        ],
      },
      {
        id: 'slq14_tactic_charge',
        label: '【正面登檐强攻】不借巧计，雪脊之上堂堂正正硬撼全盛「铁罗汉」严横！',
        subLabel: '无门槛正攻 · 直面全盛二流中品严横（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYanHengBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '屋下便是周府满门老小，今夜绝不能放严横逃脱行凶！',
            introText: '【甜水巷屋脊 · 正面硬撼】迎战全盛西夏黑道悍匪【铁罗汉 · 严横】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              { type: 'setFlag', flag: 'sl_q14_tactic', value: 'charge' },
              openScene('scene_slq14_07', SHAOLIN_Q14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('严横横练硬功刚猛难挡，暂借飞檐腾挪脱身调息后再赴资圣宝塔重整伏击！', 'warn', '汴京缉凶'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq14_07: {
    id: 'scene_slq14_07',
    title: '第七幕 · 一拍碎铁',
    subtitle: '甜水巷周府庭院',
    illustrationUrl: '/assets/quests/sl_14_yanheng_capture.jpg',
    illustrationCaption: '一拍两散 · 凝练掌劲破尽横练铁臂，生擒铁罗汉严横',
    mandatory: true,
    beats: [
      N('屋脊之上拳风呼啸，积雪纷飞！严横仗着横练铁布衫硬受数记重击仍凶性大发，狞笑着双臂交叉护胸撞来！刹那间你心境空明，脑中浮现资圣宝塔顶层飞雪停滞的一幕，右掌缓缓收回胸前，内息尽聚劳宫一寸！'),
      P('（一掌轻印于严横双臂之间，声如春雷破空）“铁壁虽坚，遇空则碎——接我少林《一拍两散掌》！”'),
      N('闷雷炸响！严横引以为傲的铁布衫护体罡气竟如琉璃般寸寸崩裂，穿透劲力直透骨髓，当场震断其右臂臂骨！严横发出一声凄厉惨嚎，口喷鲜血自屋脊倒飞砸落周府雪地之中！'),
      S(SPEAKER_YAN_HENG, '（骇然失色，动弹不得）“啊——！我的铁臂……你……你竟练成了玄寂老贼的一拍两散掌……”'),
      N('你飘落雪地封住其周身大穴、捆作粽子。院墙外火把通明，慧禅率相国寺武僧与开封府巡夜捕快疾步赶到，自严横怀中搜出西夏文密信与一袋未用完的假造少林佛珠，周府上下推门叩谢救命之恩！'),
    ],
    onFinishEffects: [openScene('scene_slq14_08', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_08: {
    id: 'scene_slq14_08',
    title: '第八幕 · 移交抉择',
    subtitle: '甜水巷周府庭院 · 审案权衡',
    mandatory: true,
    beats: [
      N('火把映照积雪，巡夜捕头大喜过望，当即拱手请将严横连同西夏密信与假佛珠押赴开封府大堂连夜升堂归案，好一举昭告京师、洗清少林冤屈。'),
      S('NPC-0378', '（却快步贴近你耳畔，压低声音神色凝重）“师弟且慢！贫僧粗通西夏番文，方才扫了一眼密信尾款——严横在汴京城内似乎还有暗中接应的西夏同党与茶马司眼线！若即刻押交开封府公堂公开审理，虽能速雪少林清誉，只怕走漏风声惊跑其背后余党！”'),
      N('雪地之中，严横咬牙冷笑不语。是将人犯堂堂正正移交开封府公堂受大宋国法明审，还是连夜押回少林戒律院密室依江湖规矩严审追查西夏同党？一切全凭你一言定夺——'),
    ],
    choices: [
      {
        id: 'slq14_handover_kaifeng',
        label: '【押交开封府公堂】遵大宋国法公开升堂审断，堂堂正正洗雪少林清誉！（禅心慈悲 +1）',
        subLabel: '严守国法不越界私刑，朝野共鉴少林坦荡清风',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q14_handover', value: 'kaifeng' },
          openScene('scene_slq14_09_kaifeng', SHAOLIN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'slq14_handover_shaolin',
        label: '【押回戒律院严审】暂扣密室依江湖规矩严审追查西夏同党，斩草除根！（怒目杀业 +1）',
        subLabel: '不惜沾染酷烈之名，誓挖出汴京潜伏的西夏暗桩',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q14_handover', value: 'shaolin' },
          openScene('scene_slq14_09_shaolin', SHAOLIN_Q14_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq14_09_kaifeng: {
    id: 'scene_slq14_09_kaifeng',
    title: '第九幕 · 昭雪公堂',
    subtitle: '开封府大堂前 · 晨光初照',
    mandatory: true,
    beats: [
      P('（合十肃容，将严横与西夏密信、假佛珠当众交付捕头）“阿弥陀佛！天子脚下自有大宋王法，佛门弟子岂可越俎代庖、行私刑密审之事？至于西夏余党，自可抄录密信呈请开封府与枢密院顺藤摸瓜！”'),
      N('天色微明，开封府升堂公开审结严横一案，假佛珠与西夏雇凶铁证尽数昭示天下。不到半日，东京茶楼酒肆便传遍了「少林戒律高徒一掌破铁臂、生擒西夏悍匪并守法交官」的佳话，先前御史台的质问流言一朝尽散！'),
      S('NPC-0378', '（随你踏雪返抵大相国寺山门，由衷叹服）“师弟胸襟磊落、不越国法分毫，此番连开封府尹都连赞我少林真乃名门正派！”'),
    ],
    onFinishEffects: [openScene('scene_slq14_10', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_09_shaolin: {
    id: 'scene_slq14_09_shaolin',
    title: '第九幕 · 密审追桩',
    subtitle: '大相国寺戒律偏院密室',
    mandatory: true,
    beats: [
      P('（目光冷峻，拦住捕头拱手致意）“捕头稍候！此獠涉及西北军粮机密，西夏同党尚匿京城，若今夜便敲锣打鼓升堂，必致大鱼漏网。贫僧先押他回大相国寺偏院问清同党下落，天明前必连同口供一并交割开封府！”'),
      N('大相国寺密室孤灯摇曳。你以少林分筋错骨点穴手法连夜严审，严横终究扛不住经脉剧痛，咬牙供出了西夏细作在汴京城西茶马货栈与樊楼后巷的两处暗桩接头暗号！'),
      N('天色微明前，你连同严横与两处暗桩密录一并移交开封府，官军顺势一网打尽，汴京流言亦随血案告破烟消云散；只是步出密室时，你袖间犹沾寒夜霜气，慧禅望向你的眼神亦多了几分敬畏与沉思。'),
    ],
    onFinishEffects: [openScene('scene_slq14_10', SHAOLIN_Q14_QUEST_ID)],
  },

  scene_slq14_10: {
    id: 'scene_slq14_10',
    title: '第十幕 · 塔顶授诀',
    subtitle: '大相国寺 · 资圣八角琉璃宝塔（结局）',
    mandatory: true,
    beats: [
      N('旭日升起，资圣八角琉璃宝塔铜铃在清风中悦耳长鸣。你随慧禅登塔复命，玄寂负手立于高窗之前，回身望向你时目露深沉赞赏。'),
      S('NPC-0134', '“善哉，善哉！{ifFlag:sl_q14_clue_solved|你先凭红泥靴印与沉香绳一眼勘破凶手高檐行踪，复在甜水巷屋脊以《一拍两散掌》碎铁擒魔，智勇双全！|你虽在宝塔验卷时略错一着，然临危不乱、于甜水巷屋脊悟透《一拍两散掌》真谛一掌碎铁生擒凶徒，为我少林挣足百年清誉！}”'),
      S('NPC-0134', '“{ifFlagEq:sl_q14_handover=kaifeng|战后你守法交官、坦荡昭雪，极合佛门正道气象；|战后你不惜沾染雷霆酷名、连夜密审拔除西夏暗桩，亦是护国护寺之狠手；}老衲平生衣钵绝学《一拍两散掌》，今日便将全卷秘诀正式传授于你！切记此掌威力过巨，非大奸大恶不可轻用！”'),
      P('（伏拜领受掌谱心诀，回望汴京万家烟火，掌中真气收放自如）“弟子谨遵玄寂师伯教诲，必常怀戒慎慈悲之心，不堕少林威名！”'),
    ],
    choices: [
      {
        id: 'slq14_finish',
        label: '合十谢过玄寂师伯与慧禅师兄，领受《一拍两散掌》（完成《一拍两散 · 汴京缉凶》）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q14_handover', op: 'eq', value: 'kaifeng' },
            thenEffects: [{ type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 }],
            elseEffects: [{ type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 }],
          },
          { type: 'teachMartialArt', artId: 'MA-083' },
          { type: 'giveCombatExp', amount: 340, reason: '汴京甜水巷屋脊一拍两散掌生擒铁罗汉严横' },
          { type: 'addSectContribution', amount: 140 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q14_clue_solved', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyRenown', delta: 40, reason: '汴京擒凶洗刷少林冤屈，名动京师' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 15 },
          { type: 'completeQuest', questId: SHAOLIN_Q14_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《一拍两散 · 汴京缉凶》！习得地阶绝学《一拍两散掌》，获 340 实战经验、140 门派贡献与 40 声望！',
            'success',
            '汴京缉凶',
          ),
        ],
      },
    ],
  },
}
