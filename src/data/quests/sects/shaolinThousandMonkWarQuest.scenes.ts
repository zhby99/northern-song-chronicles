import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q41_QUEST_ID } from './shaolinThousandMonkWarQuest'

const SPEAKER_HELIAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '赫连铁树',
  title: '西夏一品堂大将军',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

const SPEAKER_CORPSE_POISON: StorySpeakerSpec = {
  kind: 'custom',
  name: '腐尸老鬼',
  title: '星宿海毒阵前锋长老',
  factionName: '星宿海',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_SCOUT_MONK: StorySpeakerSpec = {
  kind: 'custom',
  name: '山门哨僧 · 慧捷',
  title: '少林外山急报武僧',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
}

const SPEAKER_ARHAT_ARMY: StorySpeakerSpec = {
  kind: 'custom',
  name: '五百罗汉伏魔僧军',
  title: '嵩山少林寺护寺僧兵',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildPoisonVanguardBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ41_CORPSE_POISON',
    name: '腐尸老鬼',
    title: '星宿海毒阵前锋长老',
    realm: '宗师中品',
    factionName: '星宿海',
    sectRank: 0,
    sectRankLabel: '毒阵长老',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“桀桀桀！老仙亲赐的悲酥清风与三笑逍遥散早已漫山遍野！尔等秃驴的五百罗汉阵，今日全要化作脓水！”',
    stats: { hp: 5600, mp: 5300, agi: 84, res: 76 },
    talents: { bone: 85, comprehension: 80, charm: 20 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-026', level: 9 },
      { artId: 'MA-055', level: 9 },
      { artId: 'MA-065', level: 9 },
    ],
  })
}

function buildPoisonVanguardWeakenedBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ41_CORPSE_POISON_BURNED',
    name: '腐尸老鬼',
    title: '星宿海毒阵长老 · 毒阵被焚',
    realm: '宗师下品',
    factionName: '星宿海',
    sectRank: 0,
    sectRankLabel: '毒阵长老',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“可恶！你们竟借嵩山谷风把毒雾全吹回我军阵中，还截断了努儿海的铁骑！休想活命！”',
    stats: { hp: 4780, mp: 4460, agi: 80, res: 71 },
    talents: { bone: 82, comprehension: 78, charm: 20 },
    equippedArts: { neigong: 'MA-026', move1: 'MA-055', move2: 'MA-065' },
    learnedArts: [
      { artId: 'MA-026', level: 8 },
      { artId: 'MA-055', level: 8 },
      { artId: 'MA-065', level: 8 },
    ],
  })
}

function buildHelianTieshuBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ41_HELIAN_TIESHU',
    name: '赫连铁树',
    title: '西夏一品堂大将军',
    realm: '宗师上品',
    factionName: '西夏一品堂',
    sectRank: 5,
    sectRankLabel: '一品堂统领',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“本将亲率西夏两千铁骑与一品堂死士横扫中原，今日便要火烧嵩山少林，叫大宋武林从此俯首称臣！”',
    stats: { hp: 6980, mp: 6650, agi: 89, res: 83 },
    talents: { bone: 92, comprehension: 86, charm: 56 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-045', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-245', level: 10 },
      { artId: 'MA-045', level: 10 },
      { artId: 'MA-085', level: 10 },
    ],
  })
}

export const SHAOLIN_Q41_SCENES: Record<string, StorySceneDef> = {
  scene_slq41_01: {
    id: 'scene_slq41_01',
    title: '第一幕 · 急钟九十九',
    subtitle: '嵩山少林寺 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_41_ninety_nine_bells.jpg',
    illustrationCaption: '嵩山晨钟急撞九十九响 · 北麓三路烽烟冲天，西夏铁骑与星宿毒人直逼少室山',
    mandatory: true,
    beats: [
      N('{reignYear}暮秋初冬之际，天尚未明，嵩山古铜晨钟骤然急撞——一声、十声、五十声……直撞满九十九响！按少林五百年祖制，唯有灭寺大劫临头方可急撞九十九响惊岳钟！千余武僧披衣执棍冲出寮房，齐聚钟鼓禅院演武坪！'),
      S(SPEAKER_SCOUT_MONK, '（肩插两支西夏黑羽箭，跌扑青石阶前声嘶力竭）“报——！西夏一品堂大将军【赫连铁树】勾结星宿海老怪【丁春秋】，亲率两千伪装铁骑与数百星宿毒人偷渡黄河，兵分东、西、中三路扑杀少室山，扬言今日要火烧少林！”'),
      S('NPC-0127', '（玄难北望漫山火光与滚滚青绿毒雾，面色沉凝如铁）“阿弥陀佛！河南府官军远在百里之外，一时赶不及驰援；敌军铁骑毒雾并进，实乃少林建寺以来未有之大劫！”'),
      N('{ifFlagEq:sl_ending=merciful_abbot|你身披金丝达摩袈裟缓步登台，眉宇间慈悲沉静却如嵩岳般不可动摇，千余慌乱武僧望见你的身影霎时稳住心神！|}{ifFlagEq:sl_ending=iron_dharma_king|你手提玄铁法杖重顿高台，铁腕法王凛冽杀伐之气瞬间压过漫天烽烟，千余护教铁僧齐齐挺胸肃立！|}{ifFlagEq:sl_ending=vimalakirti_layman|你一袭素白长衫猎猎翻飞，手托天下佛门四寺同盟金印登台，气度从容如定海神针，全寺僧俗顿觉主心骨犹在！|}'),
      P('（目光如电扫过千僧，一语点破敌军三大命门）“莫慌！西夏铁骑难登险峰石阶，星宿毒雾畏逆风与解毒丹，赫连铁树与丁春秋更是各怀鬼胎！只消击溃前军毒阵、直斩中军帅旗，两千乌合之众必不战自溃！”'),
    ],
    choices: [
      {
        id: 'slq41_accept_pigeon_med',
        label: '【八百里急鸽 · 普发辟毒散】先飞鸽传警河南府与中原正道，同时尽开药王院普发清心辟毒散！',
        subLabel: '正式开启终局大合战《千僧列阵 · 血护少室》',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q41_QUEST_ID, stepId: 'bell_alarm' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'bell_alarm'),
          { type: 'setFlag', flag: 'sl_q41_bell_triggered', value: true },
          { type: 'setFlag', flag: 'sl_q41_prep_order', value: 'med' },
          toast('已开启终局大合战《千僧列阵 · 血护少室》！急鸽升空，五百罗汉出阵！', 'warn', '千僧列阵'),
          openScene('scene_slq41_02', SHAOLIN_Q41_QUEST_ID),
        ],
      },
      {
        id: 'slq41_accept_armory_fort',
        label: '【大开武库 · 抢占险隘】立发齐眉熟铜棍与降魔铁戒刀，急遣死士抢占三路险隘构筑工事！',
        subLabel: '正式开启终局大合战《千僧列阵 · 血护少室》',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q41_QUEST_ID, stepId: 'bell_alarm' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'bell_alarm'),
          { type: 'setFlag', flag: 'sl_q41_bell_triggered', value: true },
          { type: 'setFlag', flag: 'sl_q41_prep_order', value: 'armory' },
          toast('已开启终局大合战《千僧列阵 · 血护少室》！武库尽开，千僧登阵！', 'warn', '千僧列阵'),
          openScene('scene_slq41_02', SHAOLIN_Q41_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq41_02: {
    id: 'scene_slq41_02',
    title: '第二幕 · 五百罗汉',
    subtitle: '少室山腰 · 罗汉堂外石阶',
    illustrationUrl: '/assets/quests/sl_41_five_hundred_arhats.jpg',
    illustrationCaption: '少室山腰 · 主角亲布五百罗汉伏魔大阵，千僧铜棍如林迎战滚滚毒雾与西夏铁骑',
    mandatory: true,
    beats: [
      N('你于石案展开嵩山舆图，朱笔连点三处险隘分派军令：玄痛率戒律院三百铁杖僧守东路绝壁栈道，玄寂率达摩院与俗家精锐守西路山门牌坊，你亲随玄难统领【五百罗汉伏魔大阵】直下中路青石古道！'),
      N('五百名黄褐布甲武僧手持丈二熟铜齐眉棍，转瞬排成内外七重圆环！内环主守、中环轮转、外环突击，棍影层层如金钟罩山，佛号响彻少室群峰！'),
      S(SPEAKER_HELIAN, '（山脚黑狼帅旗狂舞，西夏大将骑汗血黑马遥指金顶狂笑）“哈哈！丁老仙请看，少林果然倾巢出动！今日一把火烧了这千年老巢，中原武林便再无脊梁！”'),
      S('NPC-0122', '（端坐八抬紫檀雕龙大轿轻摇鹅毛扇，阴毒冷笑）“赫连将军何须急着拼兵？待老夫先命【腐尸老鬼】抛三百坛『悲酥清风』与『碧磷毒雾』熏昏他们，再让努儿海率铁骑踏成肉泥！”'),
      S(SPEAKER_ARHAT_ARMY, '（五百武僧顿棍如雷，震裂寒霜）“阿弥陀佛！宁为玉碎，誓护少室！誓护少室！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_03', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_03: {
    id: 'scene_slq41_03',
    title: '第三幕 · 阵前调度',
    subtitle: '罗汉堂前高阶（沙场总指挥 · 第一调度）',
    mandatory: true,
    beats: [
      N('“轰！轰！轰！”数十辆抛石车将泛着诡异青烟的毒罐砸上山腰！碧绿毒雾轰然炸开，枯草瞬间焦黑化泥；山道下方，腐尸老鬼与西夏先锋努儿海亲率三百黑甲死士借毒雾掩护狂冲上来！'),
      S('NPC-0127', '（挥袖卷起罡风吹散近前毒烟，大喝请令）“掌门！星宿毒烟借山风势头甚猛，努儿海黑甲先锋紧随其后——五百罗汉大阵当如何变阵迎击？！”'),
      N('你立于高阶之上凝目观察嵩山峡谷风向与敌军队列，顷刻间定下中路罗汉伏魔大阵的破敌部署——'),
    ],
    choices: [
      {
        id: 'slq41_plan_wind_fire',
        label: '【火攻逆风 · 先焚星宿毒烟阵】识破嵩山谷风回旋之机，令百僧催大金刚掌风卷火矢倒吹毒雾、截断努儿海援路！',
        subLabel: '需经义 ≥ 88 或棋 ≥ 45 · 反烧星宿毒阵并隔绝西夏铁骑，前军之战可跳过努儿海直破腐尸老鬼',
        tone: 'gold',
        condition: {
          type: 'any',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 88 },
            { type: 'skillAtLeast', key: '棋', min: 45 },
          ],
          hint: '需经义 ≥ 88 或棋 ≥ 45',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q41_vanguard_plan', value: 'wind_fire' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'break_poison_vanguard'),
          toast('五百罗汉变阵逆风卷火倒吹毒雾！速赴【罗汉堂演武正殿】直取孤立的腐尸老鬼！', 'success', '火攻逆风'),
        ],
      },
      {
        id: 'slq41_plan_shield_wall',
        label: '【重盾罗汉 · 死守山门血战前锋】令五百罗汉含辟毒散结七重铁壁铜棍阵，正面死守石阶血战双先锋！',
        subLabel: '零门槛正攻 · 稳守山腰咽喉，车轮连战腐尸老鬼与西夏先锋努儿海',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_vanguard_plan', value: 'shield_wall' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'break_poison_vanguard'),
          toast('五百罗汉结七重重盾棍阵死守山门！速赴【罗汉堂演武正殿】血战前军！', 'warn', '重盾守门'),
        ],
      },
    ],
  },

  scene_slq41_04: {
    id: 'scene_slq41_04',
    title: '第四幕 · 罗汉破毒',
    subtitle: '十八铜人罗汉堂 · 演武正殿（前军决战）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q41_vanguard_plan=wind_fire|百名罗汉武僧齐催大金刚掌风卷起漫天松脂火矢！狂猛罡风竟硬生生将碧绿毒雾倒卷回山下，烧得西夏战马惊嘶践踏、把努儿海死死堵在半山焦林之外，唯余孤军突进的腐尸老鬼狼狈扑至殿前！|罗汉堂前血光冲天！五百罗汉重盾铜棍阵与三百西夏黑甲死士狠狠相撞，腐尸老鬼袖甩乌黑毒磷火、努儿海挥舞八十斤狼牙铁锤狂吼劈来，鲜血染红每一级青石阶！}'),
      S(SPEAKER_CORPSE_POISON, '（双目赤红如鬼，甩出两团幽绿尸毒磷火）“少林掌门受死！尝尝我星宿海的炼心尸毒！”'),
      S('NPC-0127', '（玄难袖袍鼓荡步至你身侧，浑厚佛门真气铺开）“掌门，老衲为你掠阵护法！一鼓作气斩了敌方先锋，先折赫连铁树锐气！”'),
      P('（佛门神功轰然爆发，声震罗汉正殿）“好！玄难师伯随我破阵斩魔！”'),
    ],
    choices: [
      {
        id: 'slq41_fight_vanguard_fire',
        label: '【乘火追击 · 直斩腐尸老鬼】趁毒阵反噬、努儿海受阻山下之机，与玄难联手速斩毒阵长老！',
        subLabel: '需先前选用火攻逆风部署或棋 ≥ 45 · 跳过努儿海波次，直破毒势受挫的腐尸老鬼',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q41_vanguard_plan', op: 'eq', value: 'wind_fire', label: '已施火攻逆风焚毁星宿毒烟阵' },
            { type: 'skillAtLeast', key: '棋', min: 45 },
          ],
          hint: '需采用火攻逆风部署或棋 ≥ 45',
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q41_vanguard_tactic', value: 'fire_bypass' },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q41_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonVanguardWeakenedBoss() },
            allies: [{ kind: 'npc', npcId: 'NPC-0127' }],
            rule: 'story_trial',
            forbidEscapeReason: '罗汉堂乃少林中路咽喉，退后一步便是满寺浩劫！',
            introText: '【火风破毒 · 斩首前锋】与玄难并肩直取孤立无援的星宿毒阵长老【腐尸老鬼】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq41_05', SHAOLIN_Q41_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('腐尸老鬼临死反扑毒势狠辣，暂退罗汉阵眼调息回满再战！', 'warn', '罗汉破毒'),
            ],
          },
        ],
      },
      {
        id: 'slq41_fight_vanguard_gauntlet',
        label: '【重盾血战 · 连破双锋】与【玄难】并肩车轮连战【腐尸老鬼】与【努儿海】！（车轮连战）',
        subLabel: '无门槛正攻 · 携玄难正面连斩星宿毒长老与西夏先锋大将',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_vanguard_tactic', value: 'full_gauntlet' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q41_QUEST_ID,
            opponent: { kind: 'custom', npc: buildPoisonVanguardBoss() },
            extraOpponents: [
              {
                kind: 'npc',
                npcId: 'NPC-0152',
                talkOverride: '“赫连大将军有令，踏平罗汉堂者赏黄金千两！儿郎们，冲锋！”',
              },
            ],
            allies: [{ kind: 'npc', npcId: 'NPC-0127' }],
            rule: 'story_trial',
            forbidEscapeReason: '罗汉堂乃少林中路咽喉，退后一步便是满寺浩劫！',
            introText: '【车轮连战 · 罗汉破毒】与玄难并肩连战星宿毒长老【腐尸老鬼】与西夏先锋【努儿海】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq41_05', SHAOLIN_Q41_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('毒雾与铁锤攻势凶险异常，暂退罗汉阵眼调息回满再战！', 'warn', '罗汉破毒'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq41_05: {
    id: 'scene_slq41_05',
    title: '第五幕 · 铁骑压顶',
    subtitle: '少室山腰 · 烽火漫天',
    mandatory: true,
    beats: [
      N('你与玄难双双发威！玄难一记袖里乾坤卷飞腐尸老鬼的毒磷火罐，你凌空一指洞穿其护体毒罡，将这星宿毒长老当场格毙阶前；三百西夏前锋溃不成军，被五百罗汉棍阵横扫滚落石阶！'),
      N('然而尚不及喘息，山脚骤然吹响苍凉凄厉的西夏牛角号！赫连铁树见前军受挫，终于按捺不住亲率一千五百名一品堂主力铁骑与丁春秋本队全线压上！'),
      S(SPEAKER_HELIAN, '（抽出丈二精钢马槊，面目狰狞咆哮）“全军压上！硫磺火箭齐发，给本将把少林寺烧成白地！”'),
      N('千余支火油箭如蝗虫遮天蔽日，东路玄痛、西路玄寂皆急讯告急！少林千僧苦战两个时辰真气渐竭，西夏左翼铁骑眼看便要冲破外山寨门、火油车直逼钟鼓禅院，危如累卵！'),
    ],
    onFinishEffects: [openScene('scene_slq41_06', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_06: {
    id: 'scene_slq41_06',
    title: '第六幕 · 万里驰援',
    subtitle: '少室山西麓 · 降龙破阵',
    illustrationUrl: '/assets/quests/sl_41_qiaofeng_ally.jpg',
    illustrationCaption: '少室山血战 · 萧峰万里驰援，降龙十八掌撕裂毒阵与西夏左翼，与主角并肩冲锋',
    mandatory: true,
    beats: [
      N('就在山门千钧一发之际，少室山西侧密林中骤然炸响一声震天动地、宛如九霄龙吟的豪迈长啸！'),
      S('NPC-0110', '（声如奔雷压过千军厮杀）“赫连铁树！丁春秋！尔等番邦恶贼与毒门宵小，安敢欺我中原少林无人？！萧峰在此，吃我一记【亢龙有悔】——！”'),
      N('轰隆隆——！一道宛如实质金龙般的磅礴掌风凭空撕裂漫天毒雾，将西夏左翼十余匹铁骑连人带马震飞三丈、三辆火油车轰然炸碎！粗布大氅、虎背熊腰的盖世豪雄【萧峰】率数十名丐帮精锐踏破敌阵如天神下凡疾驰而来！'),
      S('NPC-0110', '（哈哈大笑大步跃至你身前抱拳，豪气干云）“{ifFlagEq:sl_ending=merciful_abbot|方丈大师|}{ifFlagEq:sl_ending=iron_dharma_king|法王大师|}{ifFlagEq:sl_ending=vimalakirti_layman|白衣大居士|}！萧某在洛阳道上截获少林急鸽，星夜策马赶来，幸好未曾来迟！”'),
      P('（热流激荡畅快大笑，紧紧回礼）“萧大侠万里驰援如天降神兵！全寺士气已振，正可与大侠直捣中军、斩旗破敌！”'),
    ],
    onFinishEffects: [openScene('scene_slq41_07', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_07: {
    id: 'scene_slq41_07',
    title: '第七幕 · 双雄分锋',
    subtitle: '少室山道 · 中军突击（沙场总指挥 · 第二调度）',
    mandatory: true,
    beats: [
      N('全寺千僧见萧峰天降，士气暴涨十倍！五百罗汉大阵化守为攻，玄痛的戒律铁杖、玄寂的达摩刀阵同时自东西两翼合拢掩杀，你与萧峰一左一右在两千敌骑中杀开血路，直逼黑狼帅旗高坡！'),
      S('NPC-0110', '（双目如电锁定中军帅旗与紫檀法辇，朗声发问）“擒贼先擒王！赫连铁树马槊刚猛护着帅旗，丁春秋法辇剧毒阴狠！{ifFlagEq:sl_branch=layman|大居士|掌门}，你我二人此刻主攻分工如何布置？！”'),
      N('战鼓轰鸣，决胜就在今朝！你与萧峰目光交汇，瞬间定下直捣中军的主攻次序——'),
    ],
    choices: [
      {
        id: 'slq41_target_helian',
        label: '【直斩帅旗 · 先破赫连铁树】亲率僧兵正面斩碎西夏中军黑狼帅旗，托萧峰先以降龙掌风牵制星宿毒阵！',
        subLabel: '中军决战先破宗师上品赫连铁树，再合击丁春秋',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_target', value: 'helian' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'qiaofeng_charge'),
          toast('已定策直斩赫连帅旗！速赴【钟鼓禅院 · 演武坪】与萧峰并肩决战中军！', 'warn', '锋指黑狼'),
        ],
      },
      {
        id: 'slq41_target_ding',
        label: '【至阳破毒 · 先废丁春秋】以少林至阳真气正面压制星宿老怪剧毒，请萧峰降龙神掌直冲西夏铁骑！',
        subLabel: '中军决战先破星宿老怪丁春秋，再合斩赫连铁树帅旗',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_target', value: 'ding' },
          setStep(SHAOLIN_Q41_QUEST_ID, 'qiaofeng_charge'),
          toast('已定策以至阳真气压制丁春秋！速赴【钟鼓禅院 · 演武坪】与萧峰并肩决战中军！', 'warn', '阳罡破毒'),
        ],
      },
    ],
  },

  scene_slq41_08a: {
    id: 'scene_slq41_08a',
    title: '第八幕 · 锋指黑狼',
    subtitle: '钟鼓禅院外中军高坡（直斩帅旗线 · 宗师上品车轮连战）',
    mandatory: true,
    beats: [
      N('你亲率一队精锐武僧如利箭般直插黑狼帅旗十丈之内！萧峰长啸一声横跃右侧，两记刚猛绝伦的降龙掌风硬生生截住星宿法辇与漫天毒粉，为你清出直面西夏大将的绝佳战机！'),
      S(SPEAKER_HELIAN, '（翻身下马，丈二精钢马槊横扫裂石，宗师上品杀气轰然炸开）“好狂的少林之主！竟敢孤身直扑本将帅旗——先过本将手中马槊再说！”'),
      S('NPC-0122', '（在法辇上气急败坏尖笑）“乔峰小辈休缠老夫！待赫连将军刺穿这少林之主，老夫立刻叫你们全化白骨！”'),
      S('NPC-0110', '（纵声大笑，声震云霄）“{ifFlagEq:sl_branch=layman|大居士|掌门}只管放手斩旗！萧某替你护住侧翼，随你连破这二贼！”'),
    ],
    choices: [
      {
        id: 'slq41_fight_helian_first',
        label: '与【萧峰】并肩冲锋，先斩【赫连铁树】、再破【丁春秋】！（宗师上品车轮连战）',
        subLabel: '萧峰助战 · 斩碎西夏黑狼帅旗，重创星宿老怪',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q41_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHelianTieshuBoss() },
            extraOpponents: [{ kind: 'npc', npcId: 'NPC-0122' }],
            allies: [{ kind: 'npc', npcId: 'NPC-0110' }],
            rule: 'story_trial',
            forbidEscapeReason: '中军帅旗近在咫尺，退后一步便前功尽弃！',
            introText: '【车轮连战 · 锋指黑狼】与萧峰并肩先破西夏大将【赫连铁树】，再击星宿老怪【丁春秋】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq41_09', SHAOLIN_Q41_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('赫连铁树与丁春秋威势惊人，与萧峰重整内息回满再冲中军！', 'warn', '斩旗破敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq41_08b: {
    id: 'scene_slq41_08b',
    title: '第八幕 · 阳罡破毒',
    subtitle: '钟鼓禅院外中军高坡（至阳破毒线 · 宗师上品车轮连战）',
    mandatory: true,
    beats: [
      N('你身化流光径直扑向星宿派紫檀雕龙法辇，周身少林至阳佛门罡气如烈日当空，将漫天碧磷毒粉瞬间蒸散殆尽！另一侧萧峰如怒虎冲入西夏亲卫铁骑，降龙掌所过之处人仰马翻，逼得赫连铁树一时脱身不得！'),
      S('NPC-0122', '（见你至阳真气克死自己半数毒功，脸色铁青怒极反笑）“好个少林掌门，竟敢弃赫连铁树而先挑老夫！接我星宿海【化功大法】与三阴蜈蚣爪！”'),
      S(SPEAKER_HELIAN, '（见左翼亲卫被萧峰冲散，怒喝勒马跃下高坡）“丁老仙撑住！待本将斩开乔峰再来合围！”'),
      S('NPC-0110', '（虎吼如雷，踏步并肩而至）“{ifFlagEq:sl_branch=layman|大居士|掌门}先废这老毒物，随后你我同劈赫连帅旗！”'),
    ],
    choices: [
      {
        id: 'slq41_fight_ding_first',
        label: '与【萧峰】并肩冲锋，先废【丁春秋】、再斩【赫连铁树】！（宗师上品车轮连战）',
        subLabel: '萧峰助战 · 以至阳神功先破化功毒魔，再斩西夏黑狼帅旗',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q41_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0122' },
            extraOpponents: [{ kind: 'custom', npc: buildHelianTieshuBoss() }],
            allies: [{ kind: 'npc', npcId: 'NPC-0110' }],
            rule: 'story_trial',
            forbidEscapeReason: '中军帅旗近在咫尺，退后一步便前功尽弃！',
            introText: '【车轮连战 · 阳罡破毒】与萧峰并肩先挫星宿老怪【丁春秋】，再斩西夏大将【赫连铁树】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq41_09', SHAOLIN_Q41_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('丁春秋毒功诡谲、赫连铁树马槊刚猛，与萧峰重整内息回满再战！', 'warn', '斩旗破敌'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq41_09: {
    id: 'scene_slq41_09',
    title: '第九幕 · 斩碎帅旗',
    subtitle: '少室山中军高坡',
    illustrationUrl: '/assets/quests/sl_41_shatter_banner.jpg',
    illustrationCaption: '少室山大捷 · 主角凌空斩碎赫连铁树西夏黑狼帅旗，萧峰掌创丁春秋，两千敌军望风溃退',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q41_target=ding|激战六十余合，你以少林至阳佛光彻底压死丁春秋的化功阴毒，更与萧峰一记【飞龙在天】双劲合璧轰得星宿老怪胸口凹陷喷血倒飞！随即便见你凌空拔起三丈，借雷霆之势迎着赫连铁树精钢马槊悍然劈落！|激战六十余合，萧峰怒喝一声【飞龙在天】震散丁春秋偷袭的幽蓝毒粉、将其轰得吐血倒飞；你抓住这千载战机凌空拔起三丈，借下坠雷霆之势迎着赫连铁树精钢马槊悍然劈落！}'),
      N('“咔嚓——轰！”赫连铁树虎口崩裂、马槊脱手飞出，你的无上佛门劲气余势不绝，直直劈中其身后碗口粗的铁木大旗杆！象征西夏一品堂威严的黑狼帅旗应声断作两截，轰然倒塌燃起烈火！'),
      S('NPC-0122', '（捂着鲜血淋漓的胸口，眼见帅旗既倒毫不犹豫一脚踢翻护卫跃马便逃）“赫连将军，少林与乔峰势大，老夫先行一步！星宿弟子，撤！”'),
      S(SPEAKER_HELIAN, '（气得暴跳如雷，远望地平线上河南府官军与援兵旗帜隐现，只得咬牙嘶吼）“丁春秋老匹夫！鸣金！全军北撤，退回黄河以北！”'),
      N('两千西夏铁骑与星宿毒人兵败如山倒！玄痛、玄寂、玄难率千名浴血武僧追出十里，直将敌军彻底逐出登封地界方才鸣金收兵！'),
    ],
    onFinishEffects: [openScene('scene_slq41_10', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_10: {
    id: 'scene_slq41_10',
    title: '第十幕 · 抚恤忠魂',
    subtitle: '少室山腰 · 战后收局（沙场总指挥 · 第三调度）',
    mandatory: true,
    beats: [
      N('暮色降临，血战整日的少室山终于重归宁静。夕阳穿过硝烟，照亮满身血污仍挺立如松的千名武僧，也照亮毫发无损的大雄宝殿金顶。你逐一探视伤僧、向二十余名血洒山门的阵亡护寺武僧深深合十诵经。'),
      S('NPC-0127', '（玄难眼眶湿润，沉声叹道）“阿弥陀佛。此战虽伤亡数十名好儿郎，然千年祖庭与藏经阁丝毫无损，更彻底粉碎了西夏一品堂吞并中原武林的野心！”'),
      S('NPC-0156', '（玄痛押来数十名放下弯刀跪地乞降的西夏伤卒，铁面冷声请示）“掌门，这些西夏降卒皆被丢弃在山脚，其中大半不过是受征发的小卒。祭奠忠魂立碑之后，这批降卒当如何处置？”'),
    ],
    choices: [
      {
        id: 'slq41_captives_release',
        label: '【立碑超度 · 医伤放还】为阵亡武僧立忠魂碑，同时医治并缴械放还放下兵刃的西夏降卒以彰佛门慈悲！',
        subLabel: '以止戈慈悲感化西域兵心，大增侠义与禅心慈悲',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_captives', value: 'release' },
          openScene('scene_slq41_11', SHAOLIN_Q41_QUEST_ID),
        ],
      },
      {
        id: 'slq41_captives_fortify',
        label: '【立碑志功 · 留卒筑寨】为阵亡武僧立忠魂碑，留降卒修补被焚山道与少室山寨防御工事以赎战祸！',
        subLabel: '以战养防加固嵩山关隘，大增门派贡献与怒目杀业',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_captives', value: 'fortify' },
          openScene('scene_slq41_11', SHAOLIN_Q41_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq41_11: {
    id: 'scene_slq41_11',
    title: '第十一幕 · 英雄相惜',
    subtitle: '少室山道 → 大雄宝殿丹墀',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q41_captives=release|数十名西夏伤卒得药王院敷药包扎后，含泪叩首拜谢中原佛门不杀之恩，一路北归途中逢人便述少林掌门活佛慈悲！|数十名西夏降卒不敢再生异心，日夜随工匠重筑外山石阶与箭楼工事，少室山防务比战前更添三分险固！}'),
      S('NPC-0110', '（擦去脸颊血渍，望着屹立不倒的千年古刹由衷赞叹）“好一个五百罗汉伏魔大阵！好一位少林之主！今日若非你调度有方、临危不乱，纵使萧某赶来也未必守得住这千年祖庭！”'),
      P('（望向身旁豪气不减的萧峰，郑重拱手）“萧大侠千里驰援、生死相托，救少林于倒悬！大雄正殿已备下素宴清茶，请萧大侠入殿受少林全寺一拜！”'),
      S('NPC-0110', '（哈哈大笑拍了拍你肩头）“萧某与少林渊源深厚，更有你这等生死知己，何必客套！吃茶可以，待会儿出了山门你可莫拦着萧某痛饮十坛烈酒！”'),
    ],
    choices: [
      {
        id: 'slq41_go_memorial',
        label: '与萧峰并肩步入【大雄正殿 · 佛前蒲团】，论侠议局并铭碑志功',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q41_QUEST_ID, 'victory_memorial'),
          toast('少室山大捷！请步入【大雄正殿 · 佛前蒲团】与萧峰论侠铭碑！', 'success', '血护少室'),
        ],
      },
    ],
  },

  scene_slq41_12: {
    id: 'scene_slq41_12',
    title: '第十二幕 · 佛前论侠',
    subtitle: '嵩山少林寺 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿内灯火通明。玄难、玄痛、玄寂携四十八房长老齐向萧峰合十致谢，萧峰连连抱拳还礼。席间众人谈笑渐歇，萧峰举起清茶以茶代酒，豪迈眉宇忽而沉凝几分。'),
      S('NPC-0110', '（压低声音望向你，目光凝重）“{ifFlagEq:sl_ending=merciful_abbot|方丈大师|}{ifFlagEq:sl_ending=iron_dharma_king|法王大师|}{ifFlagEq:sl_ending=vimalakirti_layman|白衣大居士|}，此战虽击退了赫连铁树与丁春秋，但我一路追查辽夏暗桩时，却察觉到一股比一品堂更深沉诡秘的暗流——有人三十年来一直在暗中窥伺少林藏经阁，且直接牵扯到三十年前雁门关的一桩血海旧案……”'),
      N('大殿烛火微微一晃。你脑海中不由浮现出藏经阁古银杏树下那位深不可测的扫地老僧法空，以及昔年悬而未决的双僧疑影！'),
    ],
    choices: [
      {
        id: 'slq41_reply_guard_pavilion',
        label: '【严备藏经 · 共赴真相】许诺加严藏经阁日夜戒备，并邀萧大侠查明身世线索后同回少林了断旧案！',
        subLabel: '与萧峰定下藏经阁再会之约',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_qiaofeng_promise', value: 'ally' },
          openScene('scene_slq41_13', SHAOLIN_Q41_QUEST_ID),
        ],
      },
      {
        id: 'slq41_reply_warn_fakong',
        label: '【慎言神僧 · 互为照应】坦言藏经阁中隐有深不可测的前辈守护，叮嘱萧大侠追查雁门旧案切勿孤身涉险！',
        subLabel: '以肺腑之言相托，深化生死交情',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q41_qiaofeng_promise', value: 'caution' },
          openScene('scene_slq41_13', SHAOLIN_Q41_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq41_13: {
    id: 'scene_slq41_13',
    title: '第十三幕 · 护国禅林',
    subtitle: '大雄宝殿 · 东厢碑廊',
    mandatory: true,
    beats: [
      S('NPC-0110', '（重重点头，眼中满是生死相托的信任）“好！待萧某查明北方身世与三十年前雁门血案的幕后元凶，必再来少林藏经阁与你并肩一战！”'),
      N('战后三日，你命石匠于东厢碑林新立丈高青石大碑，亲题《血护少室千僧纪功碑》，将五百罗汉破毒、萧峰降龙驰援、斩碎赫连帅旗的壮烈事迹与阵亡武僧法号一一镌刻其上，永传后世。'),
      N('少室山大捷传至汴京，宋仁宗龙颜大悦，特颁御笔金匾【护国禅林】！{ifFlagEq:sl_ending=merciful_abbot|天下善信皆颂「慈悲方丈上能护国破虏、下能慈航活民」，少林仁德声望臻于极盛！|}{ifFlagEq:sl_ending=iron_dharma_king|四方豪杰与边关将帅无不敬服「铁腕法王用兵如神、铁僧威震贺兰」，少林武威臻于极盛！|}{ifFlagEq:sl_ending=vimalakirti_layman|大相国寺、白马寺与莆田南少林援军亦相继来贺，白衣大居士总摄四寺破虏的传奇响彻大宋朝野！|}'),
    ],
    onFinishEffects: [openScene('scene_slq41_14', SHAOLIN_Q41_QUEST_ID)],
  },

  scene_slq41_14: {
    id: 'scene_slq41_14',
    title: '第十四幕 · 静候终章',
    subtitle: '嵩山少林寺 · 山门古道（大捷归功）',
    mandatory: true,
    beats: [
      N('山门之外，秋风萧瑟。萧峰翻身上马，冲你朗声抱拳：“{ifFlagEq:sl_branch=layman|大居士|掌门}留步！待萧某查明旧案真相，咱们藏经阁下再会！”马蹄疾驰远去，唯余豪迈笑声回荡山谷。'),
      N('你手扶大雄宝殿青铜鼎炉，望向重建如新的少室山门与苍翠云海，心中一片澄明笃定。经此千僧血战，你的兵法策论、临阵骑术与宗师武境俱已炉火纯青。'),
      N('你隐隐预感，不日之后机缘成熟、佛法书艺与侠义皆至化境之时，藏经阁那位古杏扫叶的无名老僧，便将为你揭开少林五百年来最深邃的终极奥秘……'),
    ],
    choices: [
      {
        id: 'slq41_complete',
        label: '铭碑志功，受封【护国禅林】大捷之赏（完成终局合战）',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q41_captives', op: 'eq', value: 'release' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              { type: 'modifyChivalry', delta: 50, reason: '大捷后医治放还西夏降卒，以止戈慈悲扬佛门大德' },
            ],
            elseEffects: [
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              { type: 'addSectContribution', amount: 200 },
            ],
          },
          { type: 'giveCombatExp', amount: 2000, reason: '千僧列阵血护少室，与萧峰并肩斩碎赫连铁树帅旗、重创丁春秋' },
          { type: 'addSectContribution', amount: 600 },
          { type: 'modifyRenown', delta: 400, reason: '血战击退西夏一品堂与星宿海两千敌军，获赐护国禅林之誉' },
          { type: 'modifyChivalry', delta: 150, reason: '以身作则护国安民、血守中原武林正道脊梁' },
          { type: 'modifySkill', key: '策论', delta: 2 },
          { type: 'modifySkill', key: '骑术', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0110' }, delta: 30 },
          { type: 'completeQuest', questId: SHAOLIN_Q41_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《千僧列阵 · 血护少室》！实战经验 +2000，门派贡献 +600，威望 +400，侠义 +150，萧峰好感 +30！',
            'success',
            '血护少室',
          ),
        ],
      },
    ],
  },
}

export const SCENES = SHAOLIN_Q41_SCENES
