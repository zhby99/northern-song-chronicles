import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q02_QUEST_ID } from './shaolinEstateDisputeQuest'

const SPEAKER_OLD_TENANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '张老伯',
  title: '少室南麓庄田老佃农',
  factionName: '嵩山乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_LIU_HENG: StorySpeakerSpec = {
  kind: 'custom',
  name: '刘横',
  title: '铁山靠 · 登封矿霸',
  factionName: '登封矿帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_MINER_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '矿帮打手',
  title: '登封黑矿恶徒',
  factionName: '登封矿帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_REFUGEE_MINER: StorySpeakerSpec = {
  kind: 'custom',
  name: '流民矿夫',
  title: '河东逃荒矿夫',
  factionName: '嵩山乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildMinerThugLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ02_THUG_LEADER',
    name: '铁镐把头 · 熊三',
    title: '登封黑矿打手头目',
    realm: '三流下品',
    factionName: '登封矿帮',
    sectRank: 0,
    sectRankLabel: '矿帮打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“想动水闸？先过了老子手里这把开山铁镐！”',
    stats: { hp: 420, mp: 180, agi: 22, res: 12 },
    talents: { bone: 52, comprehension: 32, charm: 22 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-186', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 3 }, { artId: 'MA-186', level: 3 }, { artId: 'MA-209', level: 3 }],
  })
}

function buildLiuHengShakenBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ02_LIU_HENG_SHAKEN',
    name: '刘横（阵脚已乱）',
    title: '铁山靠 · 登封矿霸',
    realm: '三流下品',
    factionName: '登封矿帮',
    sectRank: 0,
    sectRankLabel: '矿帮帮主',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“该死的小和尚坏老子好事！就算手下全跑光了，老子一双铁膀子也要把你撞成肉泥！”',
    stats: { hp: 510, mp: 240, agi: 24, res: 15 },
    talents: { bone: 56, comprehension: 36, charm: 26 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-186', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 3 }, { artId: 'MA-186', level: 3 }, { artId: 'MA-209', level: 3 }],
  })
}

function buildLiuHengBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ02_LIU_HENG',
    name: '刘横',
    title: '铁山靠 · 登封矿霸',
    realm: '三流中品',
    factionName: '登封矿帮',
    sectRank: 0,
    sectRankLabel: '矿帮帮主',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“老子靠一双铁膀子在登封矿坑里撞翻过十几条好汉！小和尚，接我一记铁山靠！”',
    stats: { hp: 640, mp: 300, agi: 29, res: 19 },
    talents: { bone: 60, comprehension: 38, charm: 28 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-186', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 4 }, { artId: 'MA-186', level: 4 }, { artId: 'MA-209', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq02_01: {
    id: 'scene_slq02_01',
    title: '第一幕 · 木桩急报',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('{reignYear}春暖花开，十八铜人木桩廊内击桩声此起彼伏。「大金刚僧」慧轮师叔正赤臂演练金刚重拳，忽见老佃农张老伯满身泥浆连滚带爬奔入廊下！'),
      S(SPEAKER_OLD_TENANT, '（跪倒青石阶前，老泪纵横）“慧轮大师救命啊！登封矿霸『铁山靠』刘横领着几十号黑矿恶徒用大石堵死了少室南麓庄田灌溉水渠！执事虚石小师父下山讲理，反被他们撞折两根肋骨抬回寺里！”'),
      S('NPC-0254', '（双眉倒竖，掌劲一收震落木桩簌簌木屑）“岂有此理！那条少室南渠乃太祖朝赐予少林常住庄田灌溉之脉，养活三百余户佃农！刘横截断民水、殴伤我少林执事，当真目无王法！”'),
      S('NPC-0254', '（目光转向廊边练功的你）“玄痛师叔夸你临阵沉稳、{ifFlag:sl_q01_zhouhai_spared|处置周海更显佛门宽仁大度|处置周海颇见少林铁面威仪}。今日老衲带你同下少室南麓！先往【大雄宝殿方丈院 · 东厢碑廊】探望养伤的虚石，取回地契抄本、水渠旧图并问清刘横底细，再回此处随我动身！”'),
    ],
    choices: [
      {
        id: 'slq02_accept_order',
        label: '合十领命，前往东厢碑廊探望执事虚石查明水案',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q02_QUEST_ID, stepId: 'visit_xushi' },
          setStep(SHAOLIN_Q02_QUEST_ID, 'visit_xushi'),
          toast('已领受《少室庄田 · 拳棍止争》！请前往【大雄宝殿方丈院 · 东厢碑廊】探望虚石。', 'talk', '拳棍止争'),
        ],
      },
    ],
  },

  scene_slq02_03: {
    id: 'scene_slq02_03',
    title: '第二幕 · 碑廊探伤',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊（线索勘察）',
    mandatory: true,
    beats: [
      N('东厢碑廊药香浮动。执事虚石胸前缠着渗血白布靠坐青石长凳上，见你前来强撑着合十还礼，自怀中取出盖有登封县朱红官印的庄田地契抄本与水利分渠旧图。'),
      S('NPC-0782', '（轻咳两声，面色苍白）“阿弥陀佛。刘横那厮阴毒得紧——他把二十来个手持铁镐的打手脱了矿衣，硬掺进抢水的佃农堆里！我昨夜投鼠忌器怕伤着乡亲，才挨了他一记『铁山靠』……”'),
      S('NPC-0782', '（又摸出一张沾满泥点、撕去半角的黑炭单据递来）“这是我被撞倒前，从水闸旁一车黑砂袋里顺手扯下的矿场运水签单。奇怪得很，他只领了登封县一处寻常采石洗砂的官照，怎会一口气截走整条南渠的春水？”'),
      N('你展开那张炭笔签单，见上面密密麻麻记着「炉炭八十担」「鼓风皮囊十二具」「洗滓水三百石」等杂项。若精于算术，或许能从这笔反常的用水与炭耗里窥出天大端倪——'),
    ],
    choices: [
      {
        id: 'slq02_investigate_tally',
        label: '【算术核单】细算渠水耗量与炉炭配比，查明刘横截水真正意图！',
        subLabel: '识破隐藏隐秘，水闸对峙时可开启「亮底牌攻心」奇策',
        tone: 'jade',
        condition: { type: 'skillAtLeast', key: '算术', min: 30 },
        effects: [
          { type: 'setFlag', flag: 'sl_q02_mine_secret', value: true },
          setStep(SHAOLIN_Q02_QUEST_ID, 'estate_showdown'),
          openScene('scene_slq02_04_secret', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_skip_tally',
        label: '【收妥契图】慰勉虚石师兄安心静养，速返木桩廊随慧轮师叔下山！',
        subLabel: '携官印地契与水渠旧图直赴少室南麓',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q02_QUEST_ID, 'estate_showdown'),
          toast('已取得地契抄本与水渠旧图！请返回【十八铜人木桩廊】会合慧轮师叔下山！', 'talk', '拳棍止争'),
        ],
      },
    ],
  },

  scene_slq02_04_secret: {
    id: 'scene_slq02_04_secret',
    title: '第三幕 · 私矿铁证',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('你指尖沿炭笔账目逐行心算，眉峰骤然一凛：“虚石师兄你看——洗砂岂用得着八十担焦炭与十二具大型鼓风皮囊？按三百石淬火急水折算，他西岭矿坑里日夜开工的根本不是什么洗砂池，而是私挖官山铁矿、暗设土炉炼铁！”'),
      S('NPC-0782', '（骇然失声）“私采官铁？！大宋律例，铁冶乃朝廷专营榷利，私矿炼铁乃是抄家流配的重罪！怪不得刘横宁可冒犯少林寺，也要死守着西岭山坳不让外人靠近半步！”'),
      P('（郑重将签单与官印地契一并收入怀中）“寻常矿夫多半只以为替人洗砂挣口饭吃，绝不知替他私炼官铁是要掉脑袋的勾当。有这张单据在手，待会儿在水闸前，未必非要硬碰硬！”'),
    ],
    choices: [
      {
        id: 'slq02_back_with_secret',
        label: '收妥私矿铁证与地契，返回十八铜人木桩廊会合慧轮师叔！',
        tone: 'gold',
        effects: [
          toast('已掌刘横私采官铁铁证！请返回【十八铜人木桩廊】会合慧轮师叔下山！', 'success', '私矿铁证'),
        ],
      },
    ],
  },

  scene_slq02_05: {
    id: 'scene_slq02_05',
    title: '第四幕 · 临阵择艺',
    subtitle: '少室南麓 · 少林常住庄田水闸（拳棍分流）',
    illustrationUrl: '/assets/quests/sl_02_estate_clash.jpg',
    illustrationCaption: '少室南麓 · 登封矿霸刘横强占庄田水渠，佃农与矿徒剑拔弩张',
    mandatory: true,
    beats: [
      N('你返回木桩廊呈明案情，随慧轮沿少室山南坡疾行下山。不到半个时辰，只见千亩春田已显龟裂，清澈渠水被乱石闸坝死死截往西侧山坳；闸口前上百名手握木锄的佃农与数十名混迹其间的矿帮打手推搡叫骂，眼看便要流血！'),
      S(SPEAKER_LIU_HENG, '（赤膊扛着生铁撬棍踩在闸口巨石上狂笑）“哟呵，少林寺换了个大和尚带嫩雏儿来？老子话撂这儿——这渠水我矿场要用三个月，谁敢拆坝，连和尚带泥腿子一块儿躺着回去！”'),
      S(SPEAKER_MINER_THUG, '（混在佃农堆里故意推倒老妇，阴笑煽风）“大伙儿瞧见没，少林和尚要拿棒子打老百姓喽！”'),
      S('NPC-0254', '（压低嗓音，目光冷电般扫过乱局）“老衲稳住外围防矿徒放火，擒王之责交予你！眼下临阵授你一艺——或赤手修《伏虎拳》沉肩贴靠、拨开乡亲近身擒王；或持我这杆白蜡长棍修《少林齐眉棍》横扫窄桥、隔绝矿徒与百姓。你择哪一门？”'),
    ],
    choices: [
      {
        id: 'slq02_choose_fist',
        label: '赤手入人群免伤无辜 —— 临阵领悟《伏虎拳》贴身擒王！',
        subLabel: '习得上品拳掌《伏虎拳》(MA-143)，走近身擒王线',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_choice', value: 'fist' },
          { type: 'teachMartialArt', artId: 'MA-143' },
          toast('慧轮师叔临阵点拨！已习得少林上品拳法《伏虎拳》！', 'success', '临阵授艺'),
          openScene('scene_slq02_06_tactics', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_choose_staff',
        label: '持白蜡棍封锁窄桥 —— 临阵领悟《少林齐眉棍》横扫止争！',
        subLabel: '习得上品棍法《少林齐眉棍》(MA-153)，走封桥破阵线',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_choice', value: 'staff' },
          { type: 'teachMartialArt', artId: 'MA-153' },
          toast('慧轮师叔临阵递棍授诀！已习得少林上品棍法《少林齐眉棍》！', 'success', '临阵授艺'),
          openScene('scene_slq02_06_tactics', SHAOLIN_Q02_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq02_06_tactics: {
    id: 'scene_slq02_06_tactics',
    title: '第五幕 · 三策破局',
    subtitle: '少室南麓水闸前（奇正战术抉择）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q02_choice=fist|你褪去外袖、沉腰扣步，将慧轮点拨的《伏虎拳》「猛虎出林、伏地按首」心诀默运胸中|你反手凌空接过白蜡齐眉棍，足尖点定青石，将「扫草寻蛇、拨云见日」棍诀运转纯熟}，冷眼打量乱石闸口。'),
      N('只见闸口前矿帮铁镐把头熊三正率打手护在刘横身前，而上游柳堤侧畔隐隐露出一道半掩的泄洪暗闸木栓；身后三百佃农与受雇矿夫皆屏息张望。此刻破局，正当因势而动——'),
    ],
    choices: [
      {
        id: 'slq02_tactic_expose',
        label: '【亮底牌攻心】当众宣读私采官铁签单，瓦解矿夫军心、迫刘横独战！',
        subLabel: '免战打手头目，并令刘横阵脚大乱实力大减（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'all',
          conditions: [
            { type: 'flag', flag: 'sl_q02_mine_secret', op: 'truthy', label: '已查明刘横私采官铁隐秘' },
            { type: 'skillAtLeast', key: '辩才', min: 35 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q02_approach', value: 'expose' },
          openScene('scene_slq02_07_expose', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_tactic_stealth',
        label: '【轻功撬闸】沿柳堤枯沟疾掠上游，先撬泄洪暗闸冲垮矿坝再擒刘横！',
        subLabel: '奇袭冲散矿帮打手，独战仓促应战的刘横（禅心慈悲 +1）',
        tone: 'primary',
        condition: {
          type: 'any',
          hint: '需身法 ≥ 28 或《穿云纵》≥ 2 重',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 28 },
            { type: 'learnedArtAtLeast', artId: 'MA-139', minLevel: 2 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q02_approach', value: 'stealth' },
          openScene('scene_slq02_08_stealth', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_tactic_assault',
        label: '【正面立威】以少林拳棍正面冲阵，车轮力挫矿帮打手头目与刘横！',
        subLabel: '堂堂正正硬撼铁镐把头熊三与全盛刘横（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_approach', value: 'assault' },
          openScene('scene_slq02_09_assault', SHAOLIN_Q02_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq02_07_expose: {
    id: 'scene_slq02_07_expose',
    title: '第六幕 · 攻心瓦解',
    subtitle: '少室南麓水闸（1v1 擒王）',
    mandatory: true,
    beats: [
      P('（你纵身跃上一块渠畔巨石，高举官印地契与炭笔签单，运足中气喝遍四野）“山坳里的矿夫弟兄们听真！刘横骗你们说是领了官照采石洗砂，实则在西岭私挖官山铁矿、暗设土炉炼铁！大宋律法，私冶官铁乃抄家流配之重罪——你们为了每日两碗糙米，莫非要替他顶着满门流放的死罪么？！”'),
      N('一言如惊雷炸响！几十名手持铁镐的矿夫顿时面色惨白，窃窃私语间“哐当”扔下一大片铁镐，竟连铁镐把头熊三也惊疑不定地往后缩了半步！'),
      S(SPEAKER_LIU_HENG, '（见军心顷刻崩散，双目赤红如疯牛般纵下巨石扑来）“满口胡言的贼秃！老子先撕烂你这张嘴！”'),
    ],
    choices: [
      {
        id: 'slq02_fight_liuheng_expose',
        label: '正面擒拿阵脚大乱的矿霸【刘横】！（三流下品 1v1）',
        subLabel: '攻心已成，刘横孤身乱闯破绽百出',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiuHengShakenBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '军心已散，正是擒贼擒王护住春耕之机！',
            introText: '【1v1 攻心擒王】迎战阵脚大乱的登封矿霸【铁山靠 · 刘横】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
              openScene('scene_slq02_10_win', SHAOLIN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('刘横困兽犹斗势大力沉，暂退调息后再擒首恶！', 'warn', '拳棍止争'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq02_08_stealth: {
    id: 'scene_slq02_08_stealth',
    title: '第六幕 · 奇袭撬闸',
    subtitle: '少室南麓上游暗闸（1v1 擒王）',
    mandatory: true,
    beats: [
      N('你向慧轮使了个眼色，身形骤然一矮，如轻燕掠水般钻入柳堤枯沟！趁慧轮在正面高喝牵制矿徒视线，你三起两落便已绕至上游泄洪暗闸旁！'),
      N('“咔嚓——！”你运起刚悟得的少林劲力，狠狠震断卡住木闸的生铁插销！积蓄数日的激流轰然奔涌而下，顷刻冲垮半截乱石矿坝，水花四溅，守在闸前的矿帮打手顿时人仰马翻、只顾抢救铁镐与砂车！'),
      S(SPEAKER_LIU_HENG, '（浑身浇得透湿，暴跳如雷地独自踏水冲向堤岸）“哪来的小毛贼敢毁老子水坝！纳命来！”'),
    ],
    choices: [
      {
        id: 'slq02_fight_liuheng_stealth',
        label: '迎战孤身扑来的矿霸【刘横】！（三流下品 1v1）',
        subLabel: '暗闸既破、打手溃散，正宜一举生擒刘横',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildLiuHengShakenBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '大水已泄，生擒刘横便可彻底平息水争！',
            introText: '【1v1 奇袭擒王】迎战惊怒失措的登封矿霸【铁山靠 · 刘横】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              openScene('scene_slq02_10_win', SHAOLIN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('堤岸湿滑、刘横拼命反扑，暂退半步调息后再战！', 'warn', '拳棍止争'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq02_09_assault: {
    id: 'scene_slq02_09_assault',
    title: '第六幕 · 铁山硬撼',
    subtitle: '少室南麓水闸（车轮连战）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q02_choice=fist|你双拳微沉，如游鱼滑入人群，轻巧拨开受惊佃农、直扑闸口|你舞起白蜡齐眉棍化作漫天棍影，跃上窄石桥横扫隔绝恶徒与百姓}！铁镐把头熊三见势不妙，挥着开山铁镐嘶吼拦路，身后刘横更赤膊跺得青石乱颤！'),
      S(SPEAKER_LIU_HENG, '“好个扎手的少林小辈！熊三先替老子试他斤两，待会儿老子亲自用『铁山靠』撞碎你全身骨头！”'),
    ],
    choices: [
      {
        id: 'slq02_fight_liuheng_assault',
        label: '正面冲阵，车轮连战【熊三】与矿霸【刘横】！（三流下品 → 三流中品）',
        subLabel: '以少林正宗拳棍正面破阵立威',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q02_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMinerThugLeader() },
            extraOpponents: [{ kind: 'custom', npc: buildLiuHengBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '山下三百户佃农皆在身后翘首以盼，绝不可退！',
            introText: '【车轮连战 · 拳棍止争】迎战铁镐把头【熊三】与登封矿霸【铁山靠 · 刘横】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              openScene('scene_slq02_10_win', SHAOLIN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('矿帮凶悍、刘横铁山靠势大力沉，暂退借慧轮师叔掩护调息后再战！', 'warn', '拳棍止争'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq02_10_win: {
    id: 'scene_slq02_10_win',
    title: '第七幕 · 拳棍生擒 · 流民之困',
    subtitle: '少室南麓水闸青石（安民抉择）',
    illustrationUrl: '/assets/quests/sl_02_fist_staff_win.jpg',
    illustrationCaption: '拳棍止争 · 伏虎拳近身擒王或齐眉棍横扫窄桥生擒刘横',
    mandatory: true,
    beats: [
      N('数合激斗，你抓准刘横气浮空门，一招刚柔并济震散他护体硬气，反剪双臂将这位不可一世的登封矿霸稳稳按倒在湿滑青石之上！拦水乱石随之被乡亲与矿夫合力撬开，清冽春水“轰隆隆”涌入千亩龟裂麦田！'),
      N('登封县捕快赶来给刘横套上铁链时，十余名衣衫褴褛的被俘矿夫却齐齐跪在泥水里磕头哭求，额头满是淤泥与血痕。'),
      S(SPEAKER_REFUGEE_MINER, '“大师开恩啊！俺们原是河东遭旱逃荒过来的庄稼人，妻儿饿得快断气了，才被刘横骗进黑矿，每日干十二个时辰只换两碗稀粥！官差若把俺们连同刘横一块儿抓进大牢，家里老小全得活活饿死啊！”'),
      S('NPC-0254', '（浓眉紧锁，叹息一声转向你）“恶首刘横自当押送登封县衙严办；可这十余户流民矿夫确是饥寒所迫。寺中常住今春账目也紧，老衲听你的主意——这桩善后，咱们该如何处置？”'),
    ],
    choices: [
      {
        id: 'slq02_mercy_donate',
        label: '【捐银安流民】自掏 20 两纹银购种粮，请师叔减免今秋寺租、安置流民垦荒！',
        subLabel: '花费 20 两银；侠义 +20、江湖声望 +15、禅心慈悲 +2',
        tone: 'jade',
        condition: { type: 'silverAtLeast', min: 20 },
        effects: [
          { type: 'giveSilver', amount: -20, reason: '捐资购粮安置少室南麓受胁流民矿夫' },
          { type: 'setFlag', flag: 'sl_q02_estate_mercy', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'modifyChivalry', delta: 20, reason: '少室南麓捐银安民、以慈悲化水争' },
          { type: 'modifyRenown', delta: 15, reason: '少室南麓捐银安置河东流民广受乡民传颂' },
          openScene('scene_slq02_11_end', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_mercy_free',
        label: '【宽宥减租】只押首恶刘横送官，禀请常住容留受胁流民在寺庄帮工糊口',
        subLabel: '零花销行仁政；侠义 +10、禅心慈悲 +1',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_estate_mercy', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          { type: 'modifyChivalry', delta: 10, reason: '少室南麓止争宽宥受胁流民矿夫' },
          openScene('scene_slq02_11_end', SHAOLIN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'slq02_strict_law',
        label: '【公事公办】将刘横及涉案矿徒一并押交县衙按宋律发落，追缴矿场赃银充公！',
        subLabel: '严法肃纪，额外获 40 两追赃酬银（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q02_estate_strict', value: true },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq02_11_end', SHAOLIN_Q02_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq02_11_end: {
    id: 'scene_slq02_11_end',
    title: '第八幕 · 清渠暮归',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    mandatory: true,
    beats: [
      N('夕阳西沉，嵩山群峰一片金红。张老伯捧着新流进麦田的活命水连连叩谢，你随慧轮重返木桩廊，顺道告知虚石捷报，虚石眉间郁结顿散。'),
      S('NPC-0254', '（负手立于木桩廊前，神色深邃欣慰）“今日一役，{ifFlag:sl_q02_mine_secret|你先凭算术洞穿刘横私采官铁之奸谋，|你临阵不乱、拳棍分明，}{ifFlag:sl_q02_estate_mercy|战后又肯体恤河东流民生计、广施佛门慈悲，实乃大德！|战后依宋律公事公办、铁面无私，足震登封群宵！}少林以武止戈，今日你已初窥堂奥。”'),
      S('NPC-0254', '“今日所授绝艺，日后好生勤修莫负其名。寺库已拨下护庄酬劳与师门贡献，权作嘉勉。”'),
    ],
    choices: [
      {
        id: 'slq02_finish_reward',
        label: '合十谢恩，收下护庄嘉奖（完成《少室庄田 · 拳棍止争》）',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 50 },
          { type: 'giveCombatExp', amount: 120, reason: '少室南麓庄田生擒登封矿霸刘横' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q02_estate_strict', op: 'truthy' },
            thenEffects: [{ type: 'giveSilver', amount: 80, reason: '少林寺库护庄酬劳及县衙追缴矿霸赃银分赏' }],
            elseEffects: [{ type: 'giveSilver', amount: 40, reason: '少林寺库护庄止争酬劳' }],
          },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q02_mine_secret', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0254' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0782' }, delta: 8 },
          { type: 'completeQuest', questId: SHAOLIN_Q02_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《少室庄田 · 拳棍止争》！获门派贡献、实战历练与寺库酬银，慧轮师叔对你大加赞赏！',
            'success',
            '拳棍止争',
          ),
        ],
      },
    ],
  },
}
