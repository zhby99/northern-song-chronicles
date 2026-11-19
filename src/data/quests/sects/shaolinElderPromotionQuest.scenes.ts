import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q33_QUEST_ID } from './shaolinElderPromotionQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq33_01: {
    id: 'scene_slq33_01',
    title: '第一幕 · 廿载钟鸣',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('{reignYear}仲春，少室山青松吐翠，大雄宝殿一百零八响晨钟浑厚悠长。自你初入嵩山少林寺至今，弹指间已满整整二十载寒暑！'),
      N('今日大雄正殿檀香缭绕、金佛庄严，罗汉、达摩、戒律、药王、菩提诸院玄字辈高僧悉数齐聚，正召开十年难遇一次的「菩提院全寺大议」。'),
    ],
    onFinishEffects: [openScene('scene_slq33_02', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_02: {
    id: 'scene_slq33_02',
    title: '第二幕 · 菩提大议',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_33_bodhi_council.jpg',
    illustrationCaption: '菩提院议 · 大雄正殿玄字辈高僧齐聚，共议堂院首座与少室山大局',
    mandatory: true,
    beats: [
      S('NPC-0112', '（端坐佛前主位，目光慈悲而威严地环视全殿，最终落在你身上）“阿弥陀佛。列位师弟，如今中原武林暗流涌动，星宿毒邪、西夏一品堂乃至塞外豪强频频窥伺少林，少室山天下英雄大会亦已迫在眉睫。”'),
      S('NPC-0112', '“本寺承千年道统，亟需德才兼备、武学已臻宗师气象之后起栋梁入主长老堂院！{playerName}入寺二十载，历曝书夜影、剑痕九阳、药王瘟劫诸般大功，老衲欲推举其晋升本寺【长老 / 堂院首座】，列位师弟以为如何？”'),
    ],
    onFinishEffects: [openScene('scene_slq33_03', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_03: {
    id: 'scene_slq33_03',
    title: '第三幕 · 诸院议论',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      S('NPC-0127', '（率先合十出列，朗声赞道）“方丈师兄慧眼如炬！{playerName}曾在剑痕崖拼死护住老衲，半个时辰悟透《少林九阳功》破敌震毒，武功心性俱堪当首座大任，老衲举双手赞成！”'),
      S('NPC-0156', '（浓眉微挑，合十肃然道）“{playerName}功劳卓著，全寺皆知。然少林长老首座非同小可，一肩挑着武学传承，一肩担着少室山大会应变全局！老衲以为，按本寺祖制，仍须过「演武印证」与「殿前论策」两关，方能叫天下僧俗心服口服！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_04', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_04: {
    id: 'scene_slq33_04',
    title: '第四幕 · 祖制两关',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      S('NPC-0112', '（微笑颔首）“玄痛师弟所言极合祖制。第一关：请{playerName}移步钟鼓禅院演武坪，在玄痛、玄难二位首座中任择一位演武印证，只分高下、不伤和气；第二关：回返大雄正殿，就少室山天下英雄大会方略与众玄字辈长老辩难！”'),
      P('（步出队列，合十躬身，气度沉凝如山）“弟子谨遵方丈法旨与少林祖制！愿赴演武坪领教首座高招，再回正殿陈明肺腑之策！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_05', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_05: {
    id: 'scene_slq33_05',
    title: '第五幕 · 移步演武',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      N('众玄字辈高僧齐齐起身，鱼贯步出大雄正殿，前往西侧【钟鼓禅院 · 演武坪】观战印证。二十载苦修，今日一战定乾坤！'),
    ],
    choices: [
      {
        id: 'slq33_start_spar',
        label: '迈步前往钟鼓禅院演武坪，接受少林首座演武印证！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q33_QUEST_ID, stepId: 'elder_spar_verification' },
          setStep(SHAOLIN_Q33_QUEST_ID, 'elder_spar_verification'),
          toast('已开启《菩提院议 · 首座之争》！请赴【钟鼓禅院 · 演武坪】演武印证！', 'talk', '首座之争'),
          openScene('scene_slq33_06', SHAOLIN_Q33_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq33_06: {
    id: 'scene_slq33_06',
    title: '第六幕 · 双雄候场',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('钟鼓禅院演武坪青石平坦开阔，古柏森然。全寺数百名执事、真传与武僧闻讯围立坪外，鸦雀无声，目光尽数聚焦在坪中三道身影之上。'),
      S('NPC-0156', '（抱拳沉喝，铁掌隐隐生风）“老衲玄痛执掌戒律院多年，拳掌刚猛严厉；若你愿以铁血硬功印证，便请与老衲过招！”'),
      S('NPC-0127', '（含笑合十，周身九阳真气温润如海）“老衲玄难执掌达摩院，武功已入宗师下品；若你想以极峰内力印证九阳与少林绝学，老衲亦愿亲自试你火候！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_07', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_07: {
    id: 'scene_slq33_07',
    title: '第七幕 · 择师印证',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    illustrationUrl: '/assets/quests/sl_33_elder_spar.jpg',
    illustrationCaption: '首座印证 · 钟鼓禅院演武坪，与玄痛或玄难首座以武印道',
    mandatory: true,
    beats: [
      N('二位首座气机皆如渊渟岳峙，全寺高僧拭目以待。请择定你的演武印证对手！'),
    ],
    choices: [
      {
        id: 'slq33_spar_xuantong',
        label: '合十请战戒律院首座【玄痛】，以刚猛绝学印证铁血武道！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q33_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0156',
              talkOverride: '“好！接老衲几记戒律院真传铁掌，看你是否担得起少林首座威仪！”',
            },
            rule: 'spar',
            duelStakesTag: 'spar',
            forbidEscapeReason: '全寺高僧观礼演武印证，岂可临阵退缩！',
            introText: '戒律院首座玄痛掌风如铁压境，施展毕生所学堂堂正正胜出！',
            onWin: [openScene('scene_slq33_08', SHAOLIN_Q33_QUEST_ID)],
            onLose: [openScene('scene_slq33_10', SHAOLIN_Q33_QUEST_ID)],
          },
        ],
      },
      {
        id: 'slq33_spar_xuannan',
        label: '合十请战达摩院首座【玄难】，在宗师全力下撑住三回合印证禅武！',
        subLabel: '宗师下品演武试锋：在玄难全力攻势下撑住 3 回合即可印证过关',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q33_QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0127',
              talkOverride: '“善哉！老衲便以宗师下品全力试你禅武根基，若能撑过老衲三合，便算过关！”',
            },
            rule: 'survive_rounds',
            maxRounds: 3,
            duelStakesTag: 'spar',
            forbidEscapeReason: '全寺高僧观礼演武印证，岂可临阵退缩！',
            introText: '达摩院首座玄难内力深厚如海，稳住气血撑过三回合即可印证长老修为！',
            onWin: [openScene('scene_slq33_09', SHAOLIN_Q33_QUEST_ID)],
            onLose: [openScene('scene_slq33_10', SHAOLIN_Q33_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_slq33_08: {
    id: 'scene_slq33_08',
    title: '第八幕 · 铁掌折服',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你与玄痛首座拳掌相交数十合，刚柔并济间化去其势大力沉的铁掌连环，终以一记收发由心的佛门印掌轻点其肩前三寸，点到即止！'),
      S('NPC-0156', '（收掌大笑，眼中满是激赏）“哈哈哈哈！好一个收发自如、刚中带慈！老衲心服口服，单论这身武学火候，你早已稳稳踏入宗师之列！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_11', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_09: {
    id: 'scene_slq33_09',
    title: '第九幕 · 宗师印心',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你与玄难首座同运少林绝学与九阳纯阳真气，双掌激荡起满坪落叶旋舞，气浪绵绵不绝却不伤坪边一草一木！五十合后，你借力化劲抢占中宫先机，合十收势！'),
      S('NPC-0127', '（抚掌赞叹，满面欣慰）“青出于蓝而胜于蓝！当年剑痕崖一授，今日竟已臻如此化境，达摩祖师在天有灵亦当含笑！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_11', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_10: {
    id: 'scene_slq33_10',
    title: '第十幕 · 调息再试',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('首座毕竟执掌堂院数十载，老辣沉雄。你一时招式略急，被其浑厚内劲震退数步。'),
      S('NPC-0112', '（温和笑道）“演武印证本在磨砺心境，莫急莫躁。且调息片刻，再上坪印证！”'),
    ],
    onFinishEffects: [{ type: 'healPlayer', hpPct: 100, mpPct: 100 }],
  },

  scene_slq33_11: {
    id: 'scene_slq33_11',
    title: '第十一幕 · 满坪喝彩',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('坪外数百名少林弟子齐声高宣佛号，掌声雷动！连素来严苛的几名老辈玄字僧亦频频颔首，眼中再无半点质疑之色。'),
    ],
    onFinishEffects: [openScene('scene_slq33_12', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_12: {
    id: 'scene_slq33_12',
    title: '第十二幕 · 重返大殿',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院',
    mandatory: true,
    beats: [
      S('NPC-0112', '（拂袖微笑）“第一关演武印证已成！请随老衲重返大雄正殿，共议少室山天下武林大会方略。”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      setStep(SHAOLIN_Q33_QUEST_ID, 'bodhi_hall_debate'),
      toast('演武印证成功！请重返【大雄正殿 · 佛前蒲团】舌战群僧、领受首座袈裟！', 'talk', '舌战晋阶'),
      openScene('scene_slq33_13', SHAOLIN_Q33_QUEST_ID),
    ],
  },

  scene_slq33_13: {
    id: 'scene_slq33_13',
    title: '第十三幕 · 少室山局',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('重返大雄正殿，众玄字辈高僧各归蒲团。气氛顿时由演武时的热血激昂转为庄重深沉。'),
      S('NPC-0112', '（神色凝重）“{playerName}，如今天下群雄云集河洛，西夏一品堂、吐蕃密宗、星宿海乃至塞外大辽暗桩皆欲借少室山大会向我少林发难。殿上诸师弟对此意见不一：有人主张闭寺封山以静制动，有人主张广邀正道铁血迎战——你意下如何？”'),
    ],
    onFinishEffects: [openScene('scene_slq33_14', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_14: {
    id: 'scene_slq33_14',
    title: '第十四幕 · 群僧诘难',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      S('NPC-0156', '（率先发问，字字铿锵）“若大开山门，鱼龙混杂，万一西夏与星宿毒邪趁乱毁我基业，谁来担责？若闭门不出，又恐被天下英雄耻笑少林怯战！两难之间，你如何破局？”'),
      S('NPC-0127', '（亦微笑追问）“更兼如今朝堂与边关局势微妙，少林既为中原武林泰山北斗，又该如何平衡佛门慈悲与护国安民之大义？”'),
    ],
    onFinishEffects: [openScene('scene_slq33_15', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_15: {
    id: 'scene_slq33_15',
    title: '第十五幕 · 舌战定策',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('大殿鸦雀无声，全寺高僧目光齐聚你身！你深吸一口气，将二十载佛法经义与辩才策论尽数融于胸臆，朗声陈词——'),
    ],
    choices: [
      {
        id: 'slq33_debate_benevolence',
        label: '「以佛法度人心，以正道聚群雄」：广开山门坦荡迎客，暗伏戒备防毒防奸，以堂堂大义折服天下！',
        tone: 'gold',
        effects: [openScene('scene_slq33_16', SHAOLIN_Q33_QUEST_ID)],
      },
      {
        id: 'slq33_debate_iron_order',
        label: '「外示慈悲之仪，内严伏魔之律」：先定少室山盟约清查宵小，武僧结阵震慑四夷，令邪派不敢越雷池半步！',
        tone: 'gold',
        effects: [openScene('scene_slq33_17', SHAOLIN_Q33_QUEST_ID)],
      },
    ],
  },

  scene_slq33_16: {
    id: 'scene_slq33_16',
    title: '第十六幕 · 堂堂正道',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      P('（声音清越如洪钟，回荡大殿梁柱）“闭山避战，失了少林千年气度；盲目杀伐，背了佛祖慈悲本怀！少室山大会当坦荡广开山门，邀丐帮、武当及天下忠义豪杰共襄盛举，以堂堂正道压倒一切阴谋诡计！”'),
      P('“同时内紧外松，由药王院备齐九转解毒丹药防备星宿西夏下毒，戒律院与罗汉堂分守藏经阁及后山要隘——如此既显佛门如海胸襟，亦教宵小无隙可乘，天下群雄安敢不服！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_18', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_17: {
    id: 'scene_slq33_17',
    title: '第十七幕 · 金刚伏魔',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      P('（目光如炬，字字掷地有声）“乱世重典，佛门亦有怒目金刚！少室山大会不可闭门，更不可放任魔头横行！当由少林先立少室山盟约，明正视听，凡携毒入山、勾结外敌者格杀勿论！”'),
      P('“对中原侠义同道则以礼相待、联手抗辽拒夏；对星宿、西夏一品堂等虎狼之辈，则以十八罗汉与三十六武僧严阵以待，以雷霆手段护我山河与苍生——慈悲与铁律并行，方为少林长盛之道！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_18', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_18: {
    id: 'scene_slq33_18',
    title: '第十八幕 · 群僧折服',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      N('一席宏论既罢，大雄正殿先是寂静三息，随即众玄字辈高僧齐齐起身合十，连连赞叹：“善哉！善哉！字字切中肯綮，既合佛理又通世务，我等心悦诚服！”'),
      S('NPC-0156', '（由衷慨叹）“既有宗师武力，复有宰执般大局眼界！老衲今日彻底服了，由{playerName}执掌首座之位，实乃少林之大幸！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_19', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_19: {
    id: 'scene_slq33_19',
    title: '第十九幕 · 授衣晋阶',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_33_elder_robe.jpg',
    illustrationCaption: '授衣晋阶 · 玄慈方丈亲授红锦首座袈裟，正式晋升少林长老/堂院首座',
    mandatory: true,
    beats: [
      N('玄慈方丈缓步走下法座，自香案捧起一件金线绣莲的红锦首座袈裟与一方温润紫檀长老印信，在满殿高僧见证下亲手为你披挂授印！'),
      S('NPC-0112', '（朗声宣告，声震大雄宝殿）“佛祖见证，历代祖师见证！今敕封真传弟子{playerName}晋升嵩山少林寺【长老 / 堂院首座】！自今日起，参赞全寺机要，统领堂院英才，护法安邦，永续少林千年薪火！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_20', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_20: {
    id: 'scene_slq33_20',
    title: '第二十幕 · 稽首承命',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      P('（披挂红锦袈裟，双手捧过紫檀印信，向佛像与玄慈方丈郑重稽首三拜）“弟子{playerName}领受首座重任！必当恪守禅武初心，上不负历代祖师法统，下不负天下苍生期盼！”'),
      N('大殿内外，千名少林僧众齐齐合十躬身，山呼佛号：“阿弥陀佛！恭贺新任首座长老！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_21', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_21: {
    id: 'scene_slq33_21',
    title: '第二十一幕 · 位列中枢',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      N('二十载春去秋来，从当年初踏嵩山石阶的青涩弟子，到今日受封红锦袈裟、位列少林中枢的堂院首座——你的名号已与少林千年古刹紧紧相连，威震大宋江湖！'),
    ],
    onFinishEffects: [
      { type: 'setSectRank', sectId: 'SECT-01', rank: 4, promoteOnly: true },
      { type: 'giveCombatExp', amount: 1000, reason: '菩提院议 · 首座之争（晋升 Lv.4 长老/首座）' },
      { type: 'addSectContribution', amount: 400 },
      { type: 'modifyRenown', delta: 120, reason: '荣膺嵩山少林寺长老/堂院首座' },
      { type: 'modifySkill', key: '辩才', delta: 2 },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'completeQuest', questId: SHAOLIN_Q33_QUEST_ID, outcome: 'completed' },
      toast(
        '《菩提院议 · 首座之争》完结！正式晋升嵩山少林寺 Lv.4 长老/堂院首座！实战经验 +1000，师门贡献 +400，江湖威望 +120，辩才 +2，经义 +1！',
        'success',
        '晋升首座',
      ),
      openScene('scene_slq33_22', SHAOLIN_Q33_QUEST_ID),
    ],
  },

  scene_slq33_22: {
    id: 'scene_slq33_22',
    title: '第二十二幕 · 嵩岳长青',
    subtitle: '嵩山少林寺 · 大雄宝殿方丈院',
    mandatory: true,
    beats: [
      N('步出大雄宝殿，春风拂动红锦袈裟，少室群峰在云海金光中巍然矗立。而属于少林首座的崭新传奇——少室山风云、天下大会与中原大局，正等待你亲手书写！'),
    ],
  },
}
