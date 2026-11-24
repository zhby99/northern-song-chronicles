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
    { type: 'teachMartialArt', artId: 'MA-100', autoEquip: true, replaceArtIds: ['MA-159'] },
    { type: 'setSectRank', sectId: 'SECT-01', rank: 2, promoteOnly: true },
    { type: 'giveItem', itemId: branchKey === 'layman' ? 'ARM-018' : 'ARM-020', qty: 1 },
    { type: 'giveCombatExp', amount: 240, reason: '木桩百劫大考与慧通较技晋升内门' },
    { type: 'addSectContribution', amount: 120 },
    { type: 'modifySkill', key: '经义', delta: 1 },
    { type: 'modifySkill', key: '书', delta: 1 },
    {
      type: 'branch',
      condition: { type: 'flag', flag: 'sl_q04_debate_insight', op: 'truthy' },
      thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
      elseEffects: [],
    },
    { type: 'modifyRenown', delta: 40, reason: '闯过少林木桩百劫大考晋升内门弟子' },
    { type: 'completeQuest', questId: SHAOLIN_Q04_QUEST_ID, outcome: `branch_${branchKey}` },
    toast(
      `已晋升少林派【内门弟子】，习得并运转《罗汉伏虎功》，归入【${branchLabel}】！`,
      'success',
      '四脉分流',
    ),
  ]
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq04_01: {
    id: 'scene_slq04_01',
    title: '第一幕 · 季满考校',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊前',
    mandatory: true,
    beats: [
      N('{reignYear}霜晨薄雾漫过少室松林，罗汉堂外青铜大钟连叩九响。你入寺已满一季，终于迎来外门弟子晋升内门的【木桩百劫 · 铜人初试】大考！朱漆大门前，降魔尊者玄苦、伏魔首座玄难、一拍神僧玄寂三位玄字辈高僧肃然并立，阶下数十名外门僧俗弟子屏息观礼。'),
      S('NPC-0126', '（合十宣谕，声震廊檐）“阿弥陀佛！{ifFlag:sl_xuanjing_debt|闻听你近来与知客院走动颇频……外功易进，道心难守，今日木桩廊中且看你站不站得稳！|你历经外门三关、经义笔墨皆有根底，更在香火暗流中守住祖庭风骨，今日准予应考！}”'),
      S('NPC-0127', '“此次大考分作三关：先闯机关木桩廊破双铜傀，再于演武正殿胜过压阵的慧通师侄，终赴大雄正殿面见方丈师兄应答《金刚经》禅辩。三关俱过，方可晋升内门！”'),
      S('NPC-0134', '（将刻有「甲壹」字样的檀木考签递至你手）“廊中机关木桩皆以百年老铁力木包覆青铜锻造，机簧彼此咬合暗合八卦。若只凭蛮力硬撼必费周章，切记以禅定观势！”'),
    ],
    choices: [
      {
        id: 'slq04_accept_exam',
        label: '持签整衣，正式开启【木桩百劫 · 铜人初试】外门大考！',
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
    title: '第二幕 · 百劫木桩',
    subtitle: '十八铜人罗汉堂 · 十八铜人木桩廊（破阵之策）',
    illustrationUrl: '/assets/quests/sl_04_wooden_alley.jpg',
    illustrationCaption: '木桩百劫 · 十八铜人木桩廊机关齐发，棍影拳风破阵而出',
    mandatory: true,
    beats: [
      N('铁皮木门在身后缓缓合拢。狭长廊道幽深昏黄，青石地面刻满八卦踏板，两侧矗立着两排铜臂铁肘的机关木桩，长明灯火在青铜面甲上折射出冷冽寒光。'),
      N('你刚迈出第三步，脚下青砖骤然沉陷半寸！铁链绞盘齐鸣，两尊包铜铁木傀儡顺着滑槽轰然撞出——铁臂甲直冲中宫，扫堂乙旋身抡起包铜长棍封死下盘！'),
      S(SPEAKER_WOODEN_DUMMY, '（齿轮咔咔咬合，两尊铜傀借地底铁链联动呼应，劲风瞬间塞满整条木桩廊！）'),
      N('细看地砖缝隙，扫堂乙滑槽的发力铁链竟全系于廊柱旁一枚露出半寸的青铜卡榫——此刻电光火石，你决意如何破阵？'),
    ],
    choices: [
      {
        id: 'slq04_alley_smart',
        label: '【观机识眼】算出八卦传力节拍，抢先震断中枢铜榫锁死「扫堂乙」！',
        subLabel: '智破联锁机关，只需 1v1 击败守关铁臂甲即可破阵出廊',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【算术】≥ 35 或悟性 ≥ 65',
          conditions: [
            { type: 'skillAtLeast', key: '算术', min: 35 },
            { type: 'talentAtLeast', key: '悟性', min: 65 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q04_alley_smart', value: true },
          toast('你一指弹中青铜卡榫，铁链“崩”然绞死，「扫堂乙」僵立当场！只余「铁臂甲」迎面撞来！', 'success', '观机识眼'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q04_QUEST_ID,
            opponent: { kind: 'custom', npc: buildWoodenDummyAlpha() },
            rule: 'spar',
            forbidEscapeReason: '身在十八铜人木桩廊考阵之中，破关之前退路已闭！',
            introText: '【外门大考 · 智破木桩】已锁死扫堂乙，1v1 击败守关【机关铜人木桩傀儡 · 铁臂甲】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q04_alley_cleared', value: true },
              openScene('scene_slq04_05', SHAOLIN_Q04_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('被铁臂甲震出廊外！调息片刻后可再赴【十八铜人木桩廊】重闯木桩阵。', 'warn', '木桩大考'),
            ],
          },
        ],
      },
      {
        id: 'slq04_fight_dummies',
        label: '【刚猛硬闯】少林考阵何须取巧！运足禅功正面车轮破尽双铜傀！',
        subLabel: '正面车轮连战铁臂甲与扫堂乙（三流中品 × 2）',
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
              '【外门大考 · 第一关】身陷十八铜人木桩廊，车轮迎战【铁臂甲 & 扫堂乙】双铜傀！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
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
    title: '第三幕 · 破阵迎敌',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('一声沉闷巨响，尽头朱门洞开，灿烂晨光倾泻而入！你衣袂不染微尘跨出木桩廊，观礼众弟子顿时一片惊呼。'),
      S('NPC-0126', '（抚掌微哂）“{ifFlag:sl_q04_alley_smart|一柱香未尽便勘破八卦铜榫、令扫堂乙未出先僵，难怪玄难师弟频频点头！然木桩毕竟死物，下一关方见真功夫！|硬凭少林正宗拳棍正面破尽双铜傀连环，端的是铁骨铮铮！然木桩毕竟死物，下一关方见真功夫！}”'),
      N('众人移步罗汉堂演武正殿青石坪。只见身披灰布百衲僧衣、眉宇沉毅的持戒武僧【慧通】越众而出，步伐沉稳如山岳挪移，周身僧袍无风自动——隐隐透出内门筑基心法《罗汉伏虎功》的沉浑劲意！'),
      S('NPC-0315', '（合十深施一礼，眼中燃起熊熊战意）“阿弥陀佛！贫僧久闻{gender:师弟|师妹}外门精进神速。今日奉三位师伯法谕压阵，决不留手，请赐教！”'),
    ],
    onFinishEffects: [openScene('scene_slq04_08', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_08: {
    id: 'scene_slq04_08',
    title: '第四幕 · 终场较技',
    subtitle: '罗汉堂演武正殿 · 决胜之战',
    illustrationUrl: '/assets/quests/sl_04_huitong_spar.jpg',
    illustrationCaption: '终场较技 · 演武正殿力挫外门劲敌慧通，禅武根基大成',
    mandatory: true,
    beats: [
      S('NPC-0127', '“点到即止，以武证禅！开阵！”'),
      N('演武正殿四方肃静，慧通大喝一声踏步抢攻，掌风挟带雷霆之势直逼你面门而来！这一战，将定你能否踏入千年古刹内门殿堂！'),
    ],
    choices: [
      {
        id: 'slq04_fight_huitong',
        label: '稳扎马步，终场一对一较技外门劲敌慧通（三流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q04_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0315',
              realmCap: '三流上品',
              talkOverride:
                '“阿弥陀佛！连闯木桩廊气势如虹，贫僧奉三位师伯法谕压阵，今日且以少林正宗拳杖领教高招！”',
            },
            rule: 'spar',
            forbidEscapeReason: '外门晋升终场较技，三位高僧临殿监考，岂可临阵退场！',
            introText:
              '【外门大考 · 终场较技】于演武正殿迎战外门第一劲敌【慧通（三流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq04_09', SHAOLIN_Q04_QUEST_ID),
            ],
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
    title: '第五幕 · 三老论才',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('十余合剧斗，青石坪尘烟滚滚！待慧通一记刚猛直拳递老、气息微换刹那，你身形微错卸开正面劲道，反手稳稳扣住他肩井半寸之处，收劲止步！'),
      S('NPC-0315', '（看着停在肩前纹丝不动的掌风，长吐一口浊气，展颜深鞠一躬）“阿弥陀佛！进退有度、最后一招留有余地更见禅心。贫僧甘拜下风，恭贺武试夺魁！”'),
      S('NPC-0126', '（抚须大笑）“好一个『刚不失度，柔不失骨』！单论筋骨与实战机变，足堪我罗汉堂衣钵！”'),
      S('NPC-0127', '“玄苦师兄莫急抢人——方才借势化劲、动中求静，分明更合我达摩院禅武参玄气象！”'),
      S('NPC-0134', '（淡淡一笑）“二位师兄且慢争执。武试虽过，尚余大雄正殿方丈师兄那一关《金刚经》禅辩考校。且让这孩子整肃衣冠，往大雄正殿觐见方丈吧。”'),
    ],
    choices: [
      {
        id: 'slq04_go_daxiong',
        label: '整肃衣冠，前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】拜见玄慈方丈',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q04_QUEST_ID, 'daxiong_branch_hub'),
          toast(
            '武试两关俱过！请前往【大雄正殿 · 佛前蒲团（sl_daxiong_main）】应玄慈方丈禅辩并择定四脉！',
            'talk',
            '佛前禅辩',
          ),
        ],
      },
    ],
  },

  scene_slq04_12: {
    id: 'scene_slq04_12',
    title: '第六幕 · 佛前禅辩',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（真禅问答）',
    mandatory: true,
    beats: [
      N('大雄正殿三世如来金身庄严，檀香袅袅。伏虎方丈【玄慈】盘膝端坐于释迦佛前，玄苦、玄难、玄寂三位首座分列左右，紫檀几案上已铺开澄心堂素宣、松烟徽墨与紫毫狼笔。'),
      S('NPC-0112', '（目光慈和深邃，合十微颔）“罗汉堂捷报老衲已悉。少林千年不衰，非独仗七十二绝技之威，更仗佛法慈悲化解戾气。若武功日高而佛理不修，终必坠入执念魔障。”'),
      S('NPC-0112', '“今日最后一道考题，不较拳脚——《金刚经》云『应无所住，而生其心』，又云『凡所有相，皆是虚妄』。你今日武试夺魁，且执笔写下本心所悟：少林弟子日日苦修练武、降魔护法，究竟所求为何？”'),
      N('满殿寂然，四位玄字辈高僧静静凝视着你手中的狼毫。素宣铺陈眼前，落笔无悔——'),
    ],
    choices: [
      {
        id: 'slq04_debate_prajna',
        label: '提笔写就：『应无所住，若着功德胜负相即非真修；动若雷霆而心无所滞，方合禅武一如』',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q04_debate_choice', value: 'prajna' },
          { type: 'setFlag', flag: 'sl_q04_debate_insight', value: true },
          { type: 'setFlag', flag: 'sl_q04_exam_passed', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 15 },
          openScene('scene_slq04_14', SHAOLIN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'slq04_debate_vajra',
        label: '提笔写就：『世道浊恶，菩萨低眉度不了狼子野心；唯有金刚怒目、除恶务尽，方能护佑十方众生』',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q04_debate_choice', value: 'vajra' },
          { type: 'setFlag', flag: 'sl_q04_exam_passed', value: true },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 10 },
          openScene('scene_slq04_14', SHAOLIN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'slq04_debate_worldly',
        label: '提笔写就：『寒窗十年当登科第，古刹苦修亦求名扬天下、受十方檀越供养，不负此生筋骨』',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q04_debate_choice', value: 'worldly' },
          { type: 'setFlag', flag: 'sl_q04_exam_passed', value: true },
          openScene('scene_slq04_14', SHAOLIN_Q04_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq04_14: {
    id: 'scene_slq04_14',
    title: '第七幕 · 授功分脉',
    subtitle: '大雄丹墀 · 内门授法与四脉宏图',
    illustrationUrl: '/assets/quests/sl_04_four_branches.jpg',
    illustrationCaption: '大雄丹墀 · 玄慈授罗汉伏虎功晋内门，罗汉达摩戒律俗家四脉分流',
    mandatory: true,
    beats: [
      N('玄慈方丈捧起墨迹未干的宣纸细细端详。{ifFlagEq:sl_q04_debate_choice=prajna|方丈良久抚掌赞叹：“善哉，善哉！字骨端方不躁，般若经义通透不泥，实乃难得的禅武良才！”连素来严苛的玄寂亦微微颔首。|}{ifFlagEq:sl_q04_debate_choice=vajra|方丈凝视良久轻叹一声，身旁玄寂却眼中微亮颔首道：“锋芒虽锐，护世之心不伪。金刚怒目亦是佛门方便，日后切记以禅定化戾气。”|}{ifFlagEq:sl_q04_debate_choice=worldly|方丈轻摇佛首温和笑道：“你心中尚着名利供养之相，佛理仍须时日沉淀；念你武试夺魁根基扎实，今日仍准晋升内门，望你日后细细参悟。”|}'),
      S('NPC-0112', '（起身宣谕，将一卷手书《罗汉伏虎功》内功心诀与内门僧袍托于案前）“自今日起，你正式晋升嵩山少林寺【内门弟子】！《罗汉伏虎功》乃本寺内门筑基正宗，行气如伏虎藏威，可替下外门《少林小乘禅功》常驻运转。既入内门，便须于四脉间择定专修之道——”'),
      S('NPC-0126', '“【罗汉堂 · 刚猛护法脉】：专修刚猛拳掌棍棒，重沙场军阵、铜人硬功与正面破敌之威！”'),
      S('NPC-0127', '“【达摩院 · 禅武参玄脉】：深研易筋洗髓与禅武合一，重藏经禅辩、古碑参玄与破障绝学！”'),
      S('NPC-0134', '“【戒律药王 · 执杖济世脉】：掌寺内清规与百草药理，重查案辨奸、审讯断狱与悬壶济世！”'),
      S('NPC-0112', '“至于尚未剃度的俗家弟子，则入【俗家护法 · 红尘金刚脉】，可带艺行走红尘、护镖行侠。须知罗汉、达摩、戒律三堂皆为剃度出家弟子专属；你若尚系俗家之身却向往三堂衣钵，亦可先暂缓择脉，在殿中寻老衲剃度后再来定夺。”'),
    ],
    onFinishEffects: [openScene('scene_slq04_16', SHAOLIN_Q04_QUEST_ID)],
  },

  scene_slq04_16: {
    id: 'scene_slq04_16',
    title: '第八幕 · 蒲团择脉',
    subtitle: '大雄正殿 · 佛前蒲团（终生抉择）',
    mandatory: true,
    beats: [
      N('三世佛像低眉垂目，玄慈、玄苦、玄难、玄寂四位高僧静候你于蒲团前叩首定脉。少林四脉各有千秋，择定之后将开启对应堂院的专属内门传承！'),
    ],
    choices: [
      {
        id: 'slq04_choose_luohan',
        label: '〖罗汉堂 · 刚猛护法脉〗拜入玄苦尊者门下，修刚猛拳棍与阵战护法之道',
        subLabel: '出家弟子专属 · 不可逆分流：开启罗汉堂刚猛护法内门传承线',
        tone: 'gold',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_17', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_choose_damo',
        label: '〖达摩院 · 禅武参玄脉〗拜入玄难首座门下，研藏经禅辩与禅武参玄之道',
        subLabel: '出家弟子专属 · 不可逆分流：开启达摩院禅武参玄内门传承线',
        tone: 'jade',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_18', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_choose_jielv',
        label: '〖戒律药王 · 执杖济世脉〗拜入玄寂神僧门下，掌查案审讯与济世清规之道',
        subLabel: '出家弟子专属 · 不可逆分流：开启戒律药王院执杖济世内门传承线',
        tone: 'primary',
        condition: { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk' },
        hideWhenUnavailable: true,
        effects: [openScene('scene_slq04_19', SHAOLIN_Q04_QUEST_ID)],
      },
      {
        id: 'slq04_choose_layman',
        label: '〖俗家护法 · 红尘金刚脉〗承方丈法谕，以俗家之身行红尘护世侠义之道',
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
    title: '第九幕 · 归入罗汉',
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
    title: '第九幕 · 参玄达摩',
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
    title: '第九幕 · 执杖戒律',
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
    title: '第九幕 · 红尘金刚',
    subtitle: '大雄正殿 · 俗家护法授牌',
    mandatory: true,
    beats: [
      P('（向玄慈方丈叩首合十，目光澄澈坚定）“弟子尘缘未了，愿入【俗家护法 · 红尘金刚脉】！虽身在红尘市井，亦当常怀佛心、行侠仗义，扬我嵩山少林正大光明之风！”'),
      S('NPC-0112', '（慈和颔首，亲手将一枚黄铜红尘金刚护法牌授于你手）“佛法在世间，不离世间觉。纵为俗家弟子，只要心存正念、济困扶危，便是我少林最坚固的护法金刚！且携《罗汉伏虎功》与俗家护法袍，莫忘初心！”'),
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
