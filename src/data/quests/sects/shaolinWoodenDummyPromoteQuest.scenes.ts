import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q04_QUEST_ID } from './shaolinWoodenDummyPromoteQuest'

const SPEAKER_WOODEN_DUMMY: StorySpeakerSpec = {
  kind: 'custom',
  name: '机关铜人木桩傀儡',
  title: '十八铜人木桩廊 · 镇廊机关',
  factionName: '嵩山少林寺',
  portraitUrl: '/assets/characters/templates/tpl_wooden_dummy_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_wooden_dummy_av.jpg',
}

function buildWoodenDummyAlpha(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ04_DUMMY_ALPHA',
    name: '机关铜人木桩傀儡 · 铁臂甲',
    title: '十八铜人木桩廊 · 刚猛守关傀儡',
    realm: '三流中品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 1,
    sectRankLabel: '镇廊机关',
    avatarUrl: '/assets/characters/templates/tpl_wooden_dummy_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wooden_dummy_fb.jpg',
    talk: '（机簧咔咔作响，铜箍硬木双臂横扫中宫，隐隐挟带少林罗汉拳刚猛劲风！）',
    stats: { hp: 620, mp: 260, agi: 28, res: 20 },
    talents: { bone: 58, comprehension: 40, charm: 30 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-182', move2: 'MA-184' },
    learnedArts: [{ artId: 'MA-180', level: 4 }, { artId: 'MA-182', level: 4 }, { artId: 'MA-184', level: 3 }],
  })
}

function buildWoodenDummyBeta(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ04_DUMMY_BETA',
    name: '机关铜人木桩傀儡 · 扫堂乙',
    title: '十八铜人木桩廊 · 齐眉棍傀儡',
    realm: '三流中品',
    factionId: 'SECT-01',
    factionName: '嵩山少林寺',
    sectRank: 1,
    sectRankLabel: '镇廊机关',
    avatarUrl: '/assets/characters/templates/tpl_wooden_dummy_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wooden_dummy_fb.jpg',
    talk: '（脚底石砖下陷半寸，转轴疾旋，包铜木棍自斜刺里横扫下盘！）',
    stats: { hp: 580, mp: 240, agi: 31, res: 18 },
    talents: { bone: 55, comprehension: 42, charm: 30 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-192', move2: 'MA-182' },
    learnedArts: [{ artId: 'MA-180', level: 4 }, { artId: 'MA-192', level: 4 }, { artId: 'MA-182', level: 3 }],
  })
}

function buildCommonPromoteRewards(
  branchKey: 'luohan' | 'damo' | 'jielv' | 'layman',
  branchLabel: string,
): QuestEffect[] {
  return [
    { type: 'setFlag', flag: 'sl_branch', value: branchKey },
    { type: 'teachMartialArt', artId: 'MA-100' },
    { type: 'setSectRank', sectId: 'SECT-01', rank: 2, promoteOnly: true },
    { type: 'giveItem', itemId: branchKey === 'layman' ? 'ARM-018' : 'ARM-020', qty: 1 },
    { type: 'giveCombatExp', amount: 240, reason: '木桩百劫大考与慧通较技晋升内门' },
    { type: 'addSectContribution', amount: 120 },
    { type: 'modifySkill', key: '经义', delta: 2 },
    { type: 'modifySkill', key: '书', delta: 1 },
    { type: 'modifyRenown', delta: 40, reason: '闯过少林木桩百劫大考晋升内门弟子' },
    { type: 'completeQuest', questId: SHAOLIN_Q04_QUEST_ID, outcome: `branch_${branchKey}` },
    toast(
      `已晋升少林派【内门弟子】，习得《罗汉伏虎功》，归入【${branchLabel}】！`,
      'success',
      '四脉分流',
    ),
  ]
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq04_01: {
    id: 'scene_slq04_01',
    title: '第一幕 · 岁满考校',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊前',
    mandatory: true,
    beats: [
      N('{reignYear}霜晨薄雾漫过少室松林，罗汉堂外青铜大钟连叩九响。你拜入嵩山少林寺倏忽已满整整三百六十五日，终于迎来外门弟子晋升内门的【木桩百劫 · 铜人初试】大考！'),
      N('十八铜人木桩廊朱漆大门之前，降魔尊者玄苦、伏魔首座玄难、一拍神僧玄寂三位玄字辈高僧肃然并立，阶下数十名外门僧俗弟子屏息观礼。'),
      S('NPC-0126', '（合十宣谕，声震廊檐）“阿弥陀佛。少林武学非以争强斗狠为宗，须经一载晨钟暮鼓打熬筋骨、抄经悟禅澄净心神，方堪承接内门正法。今日你既已历完三关外门试炼，经义与笔墨皆有根底，准予应考！”'),
      S('NPC-0127', '“此次大考分作三关：先闯机关木桩廊破铜傀合击，再于演武正殿胜过压阵的慧通师侄，最后赴大雄正殿面见方丈师兄应答《金刚经》笔义。三关俱过，方可晋升内门！”'),
    ],
    onFinishEffects: [openScene('scene_slq04_02', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_02: {
    id: 'scene_slq04_02',
    title: '第二幕 · 领签入廊',
    subtitle: '十八铜人木桩廊石阶',
    mandatory: true,
    beats: [
      S('NPC-0134', '（将一枚刻有「甲壹」字样的檀木考签递至你手中）“廊中机关木桩皆以百年老铁力木包覆青铜锻造，虽已收去七分杀机，然机簧连环触发，若心浮气躁便会被震出廊外。切记以禅定统摄招法。”'),
      P('（双手合十接过檀木考签，神色沉稳）“多谢三位师伯训示！弟子一载苦修，今日正欲于木桩廊中印证所学！”'),
    ],
    choices: [
      {
        id: 'slq04_accept_exam',
        label: '持签整衣，正式开启【木桩百劫 · 铜人初试】外门大考',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q04_QUEST_ID, stepId: 'wooden_alley_trial' },
          setStep(SHAOLIN_Q04_QUEST_ID, 'wooden_alley_trial'),
          toast(
            '外门晋升大考已启！请于【十八铜人木桩廊（sl_luohan_east）】闯阵破傀并迎战慧通！',
            'talk',
            '木桩大考',
          ),
        ],
      },
    ],
  },

  scene_slq04_03: {
    id: 'scene_slq04_03',
    title: '第三幕 · 百劫木桩',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊',
    illustrationUrl: '/assets/quests/sl_04_wooden_alley.jpg',
    illustrationCaption: '木桩百劫 · 十八铜人木桩廊机关齐发，棍影拳风破阵而出',
    mandatory: true,
    beats: [
      N('厚重的铁皮木门在身后缓缓合拢。狭长廊道幽深昏黄，青石地面刻满八卦踏板，两侧矗立着两排铜臂铁肘的机关木桩，长明灯火在青铜面甲上折射出冷冽寒光。'),
      N('你刚迈出第三步，脚下青砖骤然沉陷半寸！刹那间廊内机簧咔咔连响，铁链绞盘齐鸣，两尊包铜铁木傀儡顺着滑槽轰然撞出，左拳劈面、右棍扫膝，将去路封得密不透风！'),
      S(SPEAKER_WOODEN_DUMMY, '（齿轮咬合轰鸣，一尊铁臂傀儡踏步直冲中宫，另一尊扫堂傀儡旋身抡出包铜长棍！）'),
    ],
    onFinishEffects: [openScene('scene_slq04_04', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_04: {
    id: 'scene_slq04_04',
    title: '第四幕 · 机关铜傀',
    subtitle: '十八铜人木桩廊 · 破阵之战',
    mandatory: true,
    beats: [
      N('廊内劲风呼啸，木桩机关借转轴之力生生不息，硬拼蛮力必落暗算，唯有看准机簧顿挫间隙，拳脚轻重并用方能一举破关！'),
      P('（气沉丹田，双足稳钉青砖）“好精妙的少林木桩古阵！看我破你铜臂机关！”'),
    ],
    choices: [
      {
        id: 'slq04_fight_dummies',
        label: '沉气破阵，迎战两尊机关铜人木桩傀儡（三流中品 × 2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWoodenDummyAlpha() },
            extraOpponents: [{ kind: 'custom', npc: buildWoodenDummyBeta() }],
            rule: 'spar',
            forbidEscapeReason: '身在十八铜人木桩廊考阵之中，破关之前退路已闭！',
            introText:
              '【外门大考 · 第一关】身陷十八铜人木桩廊，迎战【机关铜人木桩傀儡 · 铁臂甲 & 扫堂乙】合击！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q04_alley_cleared', value: true },
              openScene('scene_slq04_05', SHAOLIN_Q04_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被连环机关木桩震出廊外！调息片刻后可再赴【十八铜人木桩廊】重闯木桩阵。',
                'warn',
                '木桩大考',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq04_05: {
    id: 'scene_slq04_05',
    title: '第五幕 · 破阵而出',
    subtitle: '十八铜人木桩廊出口',
    mandatory: true,
    beats: [
      N('一声沉闷巨响，你借身法旋身避开扫堂铜棍，顺势一记重击点在铁臂傀儡胸口机簧枢纽之上！两尊木桩傀儡齐齐僵立，廊内铁链轰隆归位，尽头朱门应声洞开！'),
      N('灿烂晨光倾泻而入，你衣袂微尘不染，大步跨出木桩廊。阶前观礼众弟子顿时发出一片惊叹。'),
      S('NPC-0126', '（抚掌微哂）“一柱香未尽便勘破双傀互锁之机，足见平日扎马练拳未曾偷懒。然木桩毕竟死物，下一关方是真正考验。”'),
    ],
    onFinishEffects: [openScene('scene_slq04_06', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_06: {
    id: 'scene_slq04_06',
    title: '第六幕 · 劲敌现身',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('众人移步至罗汉堂演武正殿青石坪。只见一名身披灰布百衲僧衣、眉宇沉毅的壮硕武僧越众而出，步伐沉稳如山岳挪移，每踏一步青石皆隐有回响。'),
      S('NPC-0134', '“此乃本寺持戒僧【慧通】，外门诸弟子中筋骨最健、招法最纯，近年已隐然摸到二流门槛。大考终场较技，便由慧通压阵。”'),
      S('NPC-0315', '（合十深施一礼，眼中燃起熊熊战意）“阿弥陀佛。贫僧久闻师弟一年间精进神速，连闯木桩廊游刃有余。今日演武正殿，贫僧决不留手，请师弟赐教！”'),
    ],
    onFinishEffects: [openScene('scene_slq04_07', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_07: {
    id: 'scene_slq04_07',
    title: '第七幕 · 禅武交锋',
    subtitle: '罗汉堂演武正殿 · 终场前奏',
    mandatory: true,
    beats: [
      N('慧通缓缓沉肩坠肘，周身僧袍无风自动，一股沉浑刚猛的少林内劲自丹田透出——正是令外门弟子望而生畏的《罗汉伏虎功》底蕴，配以散花掌与普门杖法变化，攻守极难寻隙。'),
      S('NPC-0127', '“点到即止，以武证禅！开阵！”'),
      P('（深吸一口嵩山清气，抱拳合十）“慧通师兄名不虚传！师弟这便全力接招！”'),
    ],
    onFinishEffects: [openScene('scene_slq04_08', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_08: {
    id: 'scene_slq04_08',
    title: '第八幕 · 终场较技',
    subtitle: '罗汉堂演武正殿 · 决胜之战',
    illustrationUrl: '/assets/quests/sl_04_huitong_spar.jpg',
    illustrationCaption: '终场较技 · 演武正殿力挫外门劲敌慧通，禅武根基大成',
    mandatory: true,
    beats: [
      N('演武正殿四方肃静，慧通大喝一声踏步抢攻，掌风挟带雷霆之势直逼你面门而来！这一战，将定你能否踏入千年古刹内门殿堂！'),
    ],
    choices: [
      {
        id: 'slq04_fight_huitong',
        label: '稳扎马步，终场一对一较技外门劲敌慧通（二流下品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q04_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0315',
              realmCap: '二流下品',
              talkOverride:
                '“阿弥陀佛！师弟连闯木桩廊气势如虹，贫僧奉三位师伯法谕压阵，今日且以少林正宗拳杖领教高招！”',
            },
            rule: 'spar',
            forbidEscapeReason: '外门晋升终场较技，三位高僧临殿监考，岂可临阵退场！',
            introText:
              '【外门大考 · 终场较技】于演武正殿迎战外门第一劲敌【慧通（二流下品）】！',
            onWin: [openScene('scene_slq04_09', SHAOLIN_Q04_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '惜败于慧通刚猛禅武之下！调匀气息后可再赴【十八铜人木桩廊】或寻慧通重战终场。',
                'warn',
                '木桩大考',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq04_09: {
    id: 'scene_slq04_09',
    title: '第九幕 · 挫败慧通',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('十余合剧斗，青石坪上尘烟滚滚！待慧通一记刚猛直拳递老、气息微换的刹那，你身形微错，以巧破力卸开正面劲道，反手稳稳扣住他肩井半寸之处，收劲止步！'),
      N('慧通身躯微微一震，看着停在肩前纹丝不动的掌风，长长吐出一口浊气，旋即展颜合十深鞠一躬。'),
      S('NPC-0315', '“阿弥陀佛！师弟进退有度、刚柔相济，最后一招留有余地更见禅心。贫僧甘拜下风，恭贺师弟武试夺魁！”'),
    ],
    onFinishEffects: [openScene('scene_slq04_10', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_10: {
    id: 'scene_slq04_10',
    title: '第十幕 · 三老评断',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('阶上玄苦、玄难、玄寂三位高僧彼此相视一眼，皆从对方眼中见得由衷欣慰。'),
      S('NPC-0126', '“好一个『刚不失度，柔不失骨』！单论筋骨与实战机变，足堪我罗汉堂衣钵！”'),
      S('NPC-0127', '“玄苦师兄莫急抢人——方才那招借势化劲、动中求静，分明更合我达摩院禅武参玄气象！”'),
      S('NPC-0134', '（淡淡一笑）“二位师兄且慢争执。武试虽过，尚余大雄正殿方丈师兄那一关《金刚经》笔义考校。且让这孩子整肃衣冠，往大雄正殿觐见方丈吧。”'),
    ],
    onFinishEffects: [openScene('scene_slq04_11', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_11: {
    id: 'scene_slq04_11',
    title: '第十一幕 · 奉召登殿',
    subtitle: '罗汉堂至大雄宝殿石阶',
    mandatory: true,
    beats: [
      N('你向三位高僧与慧通合十致谢，整肃衣冠，沿着古柏掩映的青石御道缓步登向少林中枢——【大雄宝殿方丈院】。'),
      N('殿内檀香袅袅，玄慈方丈早已备好笔墨宣纸，端坐佛前蒲团静候你的到来。'),
    ],
    choices: [
      {
        id: 'slq04_go_daxiong',
        label: '整肃衣冠，前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】拜见玄慈方丈',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q04_QUEST_ID, 'daxiong_branch_hub'),
          toast(
            '武试两关俱过！请前往【大雄正殿 · 佛前蒲团（sl_daxiong_main）】应玄慈方丈笔义考校并择定四脉！',
            'talk',
            '佛前问经',
          ),
        ],
      },
    ],
  },

  scene_slq04_12: {
    id: 'scene_slq04_12',
    title: '第十二幕 · 佛前问经',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大雄正殿之内，三世如来金身法相庄严，长明灯火映照着青砖蒲团。伏虎方丈玄慈盘膝端坐于释迦佛前，玄苦、玄难、玄寂三位首座分列左右，身前紫檀几案上已铺好澄心堂宣纸、松烟徽墨与紫毫狼笔。'),
      S('NPC-0112', '（目光慈和深邃，合十微颔）“罗汉堂捷报老衲已悉。少林千年不衰，非独仗七十二绝技之威，更仗佛法慈悲化解戾气。若武功日高而佛理不修，终必坠入执念魔障。”'),
      S('NPC-0112', '“今日最后一道考题，不较拳脚——请以笔墨写下你对《金刚经》『应无所住，而生其心』一句之体悟，并述此句与武学运劲之关联。”'),
    ],
    onFinishEffects: [openScene('scene_slq04_13', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_13: {
    id: 'scene_slq04_13',
    title: '第十三幕 · 落笔明心',
    subtitle: '大雄正殿 · 紫檀经案',
    mandatory: true,
    beats: [
      N('你沉心静气，执起紫毫饱蘸浓墨，一载抄经修禅与木桩实战的感悟顿时涌上心头。只见笔走龙蛇、端劲沉稳，在素宣上写下十六字偈语：'),
      P('“『招无定形，心无所滞；动若雷霆，静如止水。』——弟子以为，武人临敌若执着于胜负招式，便落了『有所住』的下乘；唯有心境空明、随物赋形，慈悲为怀而降魔护法，方合『应无所住而生其心』的真谛！”'),
      N('玄慈方丈捧起墨迹未干的宣纸细细端详，良久抚掌赞叹，连素来严苛的玄寂亦微微点头。'),
      S('NPC-0112', '“善哉，善哉！字骨端方不躁，经义通透不泥。此等心性，足可授我少林内门正宗心法！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q04_exam_passed', value: true },
      openScene('scene_slq04_14', SHAOLIN_Q04_QUEST_ID),
    ],
  },

  scene_slq04_14: {
    id: 'scene_slq04_14',
    title: '第十四幕 · 授功晋阶',
    subtitle: '大雄丹墀 · 内门授法',
    illustrationUrl: '/assets/quests/sl_04_four_branches.jpg',
    illustrationCaption: '大雄丹墀 · 玄慈授罗汉伏虎功晋内门，罗汉达摩戒律俗家四脉分流',
    mandatory: true,
    beats: [
      N('大雄正殿香烟缭绕，玄慈方丈起身宣谕，将一卷手书《罗汉伏虎功》内功心诀与一套嵩山少林灰布僧袍亲手托于案前。'),
      S('NPC-0112', '“自今日起，你正式晋升嵩山少林寺【内门弟子】！这门《罗汉伏虎功》乃本寺内门筑基正宗，行气如伏虎藏威、稳如须弥，日后无论修习何堂绝艺，皆须以此功为根基。”'),
      P('（恭敬叩首接过心法与僧袍）“弟子谢方丈师伯慈悲授法！必当恪守少林清规，不敢有负师门厚望！”'),
    ],
    onFinishEffects: [openScene('scene_slq04_15', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_15: {
    id: 'scene_slq04_15',
    title: '第十五幕 · 四脉分流',
    subtitle: '大雄正殿 · 堂院择脉',
    mandatory: true,
    beats: [
      S('NPC-0112', '“既入内门，便须定下专修法脉。我少林内门依出家与俗家之别，分作四脉传承——”'),
      S('NPC-0126', '“【罗汉堂 · 刚猛护法脉】：专修刚猛拳掌棍棒，降魔护法、冲锋陷阵，最重筋骨气血之威！”'),
      S('NPC-0127', '“【达摩院 · 禅武参玄脉】：深研易筋洗髓与禅武合一之境，以佛理化剑指禅功，求至精至微之造化！”'),
      S('NPC-0134', '“【戒律药王 · 执杖济世脉】：掌寺内清规戒律与少林百草药理，执杖惩奸、悬壶济世，刚柔并重！”'),
      S('NPC-0112', '“至于尚未剃度的俗家弟子，则入【俗家护法 · 红尘金刚脉】，可带艺行走红尘、扬少林护世之风。须知罗汉、达摩、戒律三堂皆为剃度出家弟子专属；你若尚系俗家之身却向往三堂衣钵，亦可先暂缓择脉，在殿中寻老衲剃度后再来定夺。”'),
    ],
    onFinishEffects: [openScene('scene_slq04_16', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_16: {
    id: 'scene_slq04_16',
    title: '第十六幕 · 蒲团择脉',
    subtitle: '大雄正殿 · 佛前蒲团（终生抉择）',
    mandatory: true,
    beats: [
      N('三世佛像低眉垂目，玄慈、玄苦、玄难、玄寂四位高僧静候你于蒲团前叩首定脉。少林四脉各有千秋，择定之后将开启对应堂院的专属内门传承！'),
    ],
    choices: [
      {
        id: 'slq04_choose_luohan',
        label: '〖罗汉堂 · 刚猛护法脉〗拜入玄苦尊者门下，修刚猛拳棍护法之道',
        subLabel: '出家弟子专属 · 不可逆分流：开启罗汉堂刚猛护法内门传承线',
        tone: 'gold',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_17', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_choose_damo',
        label: '〖达摩院 · 禅武参玄脉〗拜入玄难首座门下，研禅武合一参玄之道',
        subLabel: '出家弟子专属 · 不可逆分流：开启达摩院禅武参玄内门传承线',
        tone: 'jade',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_18', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_choose_jielv',
        label: '〖戒律药王 · 执杖济世脉〗拜入玄寂神僧门下，掌戒律清规济世之道',
        subLabel: '出家弟子专属 · 不可逆分流：开启戒律药王院执杖济世内门传承线',
        tone: 'primary',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_19', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_choose_layman',
        label: '〖俗家护法 · 红尘金刚脉〗承方丈法谕，以俗家护法之身行红尘金刚之道',
        subLabel: '俗家弟子专属 · 不可逆分流：开启俗家护法红尘金刚内门传承线',
        tone: 'gold',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'neq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_20', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_layman_defer',
        label: '容弟子先思量片刻，或于大雄宝殿寻方丈剃度后再择堂院',
        subLabel: '暂不完结：可先向玄慈方丈剃度为出家弟子，再回佛前蒲团择入罗汉/达摩/戒律三堂',
        tone: 'default',
        condition: {
          type: 'all',
          conditions: [
            { type: 'flag', flag: 'shaolin_disciple_type', op: 'neq', value: 'monk' },
            { type: 'flag', flag: 'player_gender', op: 'eq', value: '男' },
          ],
        },
        hideWhenUnavailable: true,
        effects: [
          toast(
            '你向玄慈方丈合十告暂退。若欲入罗汉、达摩、戒律三堂，可于大雄宝殿寻方丈剃度后再行择脉！',
            'talk',
            '四脉分流',
          ),
        ],
      },
    ],
  },

  scene_slq04_17: {
    id: 'scene_slq04_17',
    title: '第十七幕 · 归入罗汉',
    subtitle: '大雄正殿 · 罗汉堂授牌',
    mandatory: true,
    beats: [
      P('（转身向降魔尊者玄苦恭敬叩首）“弟子愿入【罗汉堂 · 刚猛护法脉】，以一身铁骨铜拳护持少林千年法统，荡尽天下邪魔外道！”'),
      S('NPC-0126', '（大喜合十，亲手将一枚乌木罗汉堂腰牌挂于你腰间）“好！不愧是孤身破开木桩廊、力挫慧通的良才！明日起便随老衲在罗汉堂勤修《罗汉伏虎功》，莫坠降魔威名！”'),
    ],
    choices: [
      {
        id: 'slq04_finish_luohan',
        label: '接过罗汉堂内门腰牌，领受《罗汉伏虎功》正式晋升内门！',
        tone: 'gold',
        effects: buildCommonPromoteRewards('luohan', '罗汉堂 · 刚猛护法脉'),
      },
    ],
  },

  scene_slq04_18: {
    id: 'scene_slq04_18',
    title: '第十八幕 · 参玄达摩',
    subtitle: '大雄正殿 · 达摩院授牌',
    mandatory: true,
    beats: [
      P('（转身向伏魔首座玄难端正稽首）“弟子愿入【达摩院 · 禅武参玄脉】，潜心体悟祖师面壁遗风，求禅武合一、内外通玄之大道！”'),
      S('NPC-0127', '（含笑扶起你，授以一枚青玉达摩院禅符）“善哉！你经义通透、运劲灵动，正是我达摩院苦寻的传法种子。勤修《罗汉伏虎功》固本培元，他日自有登堂入室之机！”'),
    ],
    choices: [
      {
        id: 'slq04_finish_damo',
        label: '接过达摩院内门禅符，领受《罗汉伏虎功》正式晋升内门！',
        tone: 'jade',
        effects: buildCommonPromoteRewards('damo', '达摩院 · 禅武参玄脉'),
      },
    ],
  },

  scene_slq04_19: {
    id: 'scene_slq04_19',
    title: '第十九幕 · 执杖戒律',
    subtitle: '大雄正殿 · 戒律药王院授牌',
    mandatory: true,
    beats: [
      P('（转身向一拍神僧玄寂郑重叩首）“弟子愿入【戒律药王 · 执杖济世脉】，一手执杖正门风、一手悬壶救苍生，不负我佛慈悲与戒律威严！”'),
      S('NPC-0134', '（素来严肃的眉宇间难得露出一丝嘉许，递过一枚紫檀戒律药王令）“能于盛气之下守戒怀仁，实属难得。接下此令与《罗汉伏虎功》，日后随老衲行医惩恶，慎勿自满！”'),
    ],
    choices: [
      {
        id: 'slq04_finish_jielv',
        label: '接过戒律药王内门令牌，领受《罗汉伏虎功》正式晋升内门！',
        tone: 'primary',
        effects: buildCommonPromoteRewards('jielv', '戒律药王 · 执杖济世脉'),
      },
    ],
  },

  scene_slq04_20: {
    id: 'scene_slq04_20',
    title: '第二十幕 · 红尘金刚',
    subtitle: '大雄正殿 · 俗家护法授牌',
    mandatory: true,
    beats: [
      P('（向玄慈方丈叩首合十，目光澄澈坚定）“弟子尘缘未了，愿入【俗家护法 · 红尘金刚脉】！虽身在红尘市井，亦当常怀佛心、行侠仗义，扬我嵩山少林正大光明之风！”'),
      S('NPC-0112', '（慈和颔首，亲手将一枚黄铜红尘金刚护法牌授于你手）“佛法在世间，不离世间觉。纵为俗家弟子，只要心存正念、济困扶危，便是我少林最坚固的护法金刚！且携《罗汉伏虎功》与灰布僧袍，莫忘初心！”'),
    ],
    choices: [
      {
        id: 'slq04_finish_layman',
        label: '接过俗家护法内门铜牌，领受《罗汉伏虎功》正式晋升内门！',
        tone: 'gold',
        effects: buildCommonPromoteRewards('layman', '俗家护法 · 红尘金刚脉'),
      },
    ],
  },
}
