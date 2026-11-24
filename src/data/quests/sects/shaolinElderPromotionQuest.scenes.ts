import type { QuestEffect, StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q33_QUEST_ID } from './shaolinElderPromotionQuest'

function buildPromotionEffects(): QuestEffect[] {
  return [
    { type: 'setSectRank', sectId: 'SECT-01', rank: 4, promoteOnly: true },
    { type: 'giveCombatExp', amount: 1000, reason: '菩提院议 · 首座之争（晋升 Lv.4 长老/首座）' },
    { type: 'addSectContribution', amount: 400 },
    { type: 'modifyRenown', delta: 120, reason: '荣膺嵩山少林寺长老/堂院首座' },
    { type: 'modifySkill', key: '辩才', delta: 2 },
    { type: 'modifySkill', key: '经义', delta: 1 },
    {
      type: 'branch',
      condition: { type: 'flag', flag: 'sl_q33_policy', op: 'eq', value: 'compassion_world' },
      thenEffects: [
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 15 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 15 },
      ],
      elseEffects: [
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'sl_q33_policy', op: 'eq', value: 'iron_vajra' },
          thenEffects: [
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0156' }, delta: 20 },
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 10 },
          ],
          elseEffects: [
            { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0112' }, delta: 10 },
          ],
        },
      ],
    },
    { type: 'completeQuest', questId: SHAOLIN_Q33_QUEST_ID, outcome: 'completed' },
    toast(
      '《菩提院议 · 首座之争》完结！正式晋升嵩山少林寺 Lv.4 长老/堂院首座！实战经验 +1000，师门贡献 +400，江湖威望 +120，辩才 +2，经义 +1！',
      'success',
      '晋升首座',
    ),
    openScene('scene_slq33_11_epilogue', SHAOLIN_Q33_QUEST_ID),
  ]
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq33_01: {
    id: 'scene_slq33_01',
    title: '第一幕 · 二载钟鸣 · 菩提大议',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_33_bodhi_council.jpg',
    illustrationCaption: '菩提院议 · 大雄正殿玄字辈高僧齐聚，共议堂院首座与少室山大局',
    mandatory: true,
    beats: [
      N('{reignYear}仲春，少室山青松吐翠，大雄宝殿一百零八响晨钟浑厚悠长。自你初踏少林山门至今已满整整二载寒暑！今日大雄正殿檀香缭绕，罗汉、达摩、戒律、药王、菩提诸院玄字辈高僧悉数齐聚，召开数年难遇的「菩提院全寺大议」。'),
      S('NPC-0112', '（端坐佛前主位，目光慈悲而威严地环视全殿，最终落在你身上）“阿弥陀佛。如今中原武林暗流涌动，大辽、西夏一品堂、吐蕃密宗与星宿毒邪频频窥伺嵩山，少室山大会迫在眉睫。{playerName}入寺以来，历剑痕救师、{ifFlagEq:sl_pavilion=compassion|古杏扫叶化戾|藏经阁天罗斩魔}、药王瘟劫诸般大功，老衲欲推举其晋升【长老 / 堂院首座】，列位师弟以为如何？”'),
      S('NPC-0127', '（率先合十出列，朗声赞道）“方丈师兄慧眼如炬！{playerName}曾在剑痕崖拼死护住老衲并悟透纯阳行气真谛，武功心性俱堪首座大任，老衲举双手赞成！”'),
      S('NPC-0156', '（浓眉微挑，合十肃然道）“{playerName}功劳卓著，全寺皆服。然首座之位关乎少林千年薪火与天下局势！按本寺祖制，仍须先赴钟鼓禅院演武坪过『演武印证』一关，再回大雄正殿就乱世治寺方略『舌战群僧』，方教天下僧俗心服口服！”'),
      S('NPC-0112', '（微笑颔首）“玄痛师弟所言极合祖制。第一关演武印证，准你在戒律院玄痛、达摩院玄难二位首座中任择一位切磋印心；第二关回殿陈词！{playerName}，你意下如何？”'),
    ],
    choices: [
      {
        id: 'slq33_accept_humble',
        label: '【谦恭受命】谨遵方丈法旨与少林祖制，愿赴演武坪印证禅武，再回大殿剖陈肺腑！',
        subLabel: '开启《菩提院议 · 首座之争》，前往【钟鼓禅院 · 演武坪】',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_entry_tone', value: 'humble' },
          { type: 'startQuest', questId: SHAOLIN_Q33_QUEST_ID, stepId: 'elder_spar_verification' },
          setStep(SHAOLIN_Q33_QUEST_ID, 'elder_spar_verification'),
          toast(
            '已开启《菩提院议 · 首座之争》！请前往【钟鼓禅院 · 演武坪（sl_daxiong_west）】演武印证！',
            'talk',
            '首座之争',
          ),
        ],
      },
      {
        id: 'slq33_accept_bold',
        label: '【昂然应考】少林祖制弟子不敢辞！请诸位玄字辈师伯移步演武坪，检验弟子二载斤两！',
        subLabel: '开启《菩提院议 · 首座之争》，前往【钟鼓禅院 · 演武坪】',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_entry_tone', value: 'bold' },
          { type: 'startQuest', questId: SHAOLIN_Q33_QUEST_ID, stepId: 'elder_spar_verification' },
          setStep(SHAOLIN_Q33_QUEST_ID, 'elder_spar_verification'),
          toast(
            '已开启《菩提院议 · 首座之争》！请前往【钟鼓禅院 · 演武坪（sl_daxiong_west）】演武印证！',
            'talk',
            '首座之争',
          ),
        ],
      },
    ],
  },

  scene_slq33_02: {
    id: 'scene_slq33_02',
    title: '第二幕 · 演武印证 · 双雄择锋',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（自选对手）',
    illustrationUrl: '/assets/quests/sl_33_elder_spar.jpg',
    illustrationCaption: '首座印证 · 钟鼓禅院演武坪，与玄痛或玄难首座以武印道',
    mandatory: true,
    beats: [
      N('钟鼓禅院演武坪青石平坦开阔，古柏森然。全寺数百名执事、真传与武僧闻讯围立坪外，鸦雀无声，目光尽数聚焦在坪中三道身影之上。'),
      S('NPC-0156', '（抱拳沉喝，双掌铁骨铮鸣隐隐生风）“老衲玄痛执掌戒律院多年，拳掌刚猛严厉！你若愿以铁血硬功印证护法武道，便请与老衲正面放对！”'),
      S('NPC-0127', '（含笑合十，周身宗师内息温润如海）“老衲玄难执掌达摩院，武学已入宗师下品！你若愿以深湛禅武印证心境火候，能在老衲全力下撑住三合或夺得先机，便算印证圆满！”'),
      N('二位首座气机皆渊渟岳峙，全寺高僧拭目以待。请择定你的演武印证对手！'),
    ],
    choices: [
      {
        id: 'slq33_spar_xuantong',
        label: '【印证刚猛武道】合十请战戒律院首座【玄痛】，正面硬撼铁掌绝学！（1v1 切磋）',
        subLabel: '正面击退戒律院首座玄痛（怒目杀业 +1）',
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
            introText: '【首座考校 · 铁掌印武】戒律院首座玄痛掌风如铁压境，施展毕生所学堂堂正正胜出！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q33_spar_opponent', value: 'xuantong' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q33_spar_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q33_spar_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq33_03_xuantong_win', SHAOLIN_Q33_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '玄痛铁掌刚猛老辣，玄慈笑道演武印证重在磨砺心境！调息后可于【演武坪】再度请战。',
                'warn',
                '首座之争',
              ),
            ],
          },
        ],
      },
      {
        id: 'slq33_spar_xuannan',
        label: '【印证深湛禅机】合十请战达摩院首座【玄难】，宗师下品全力下撑过三合印心！（1v1）',
        subLabel: '宗师下品试锋：撑过 3 回合或提前取胜皆可过关（禅心慈悲 +1）',
        tone: 'jade',
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
            introText: '【首座考校 · 宗师印禅】达摩院首座玄难内力深厚如海，稳住气血撑过三回合（或提前取胜）即可印证过关！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q33_spar_opponent', value: 'xuannan' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q33_spar_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q33_spar_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
                ],
              },
              openScene('scene_slq33_04_xuannan_win', SHAOLIN_Q33_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '玄难宗师劲力如涛，玄慈劝你勿急勿躁！调息整备后可于【演武坪】再度印证。',
                'warn',
                '首座之争',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq33_03_xuantong_win: {
    id: 'scene_slq33_03_xuantong_win',
    title: '第三幕 · 铁掌折服 · 刚中带慈',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('演武坪上拳风如钟鼓齐鸣！你与玄痛首座硬碰数十合，刚柔并济间化去其势大力沉的铁掌连环，终以一记收发由心的佛门印掌轻点其肩前三寸，劲力含而不吐、点到即止！'),
      S('NPC-0156', '（收掌仰天大笑，眼中满是激赏）“哈哈哈哈！好一个刚中带慈、收发自如！老衲今日心服口服，单论这身实战火候，你早已稳稳踏入宗师之列！”'),
      N('坪外数百名少林弟子齐声高宣佛号、掌声雷动！玄慈方丈微笑拂袖：“第一关演武印证已成！请随老衲重返大雄正殿，共辩乱世治寺纲领！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q33_QUEST_ID, 'bodhi_hall_debate'),
      toast('演武印证圆满通过！重返【大雄正殿】舌战群僧、领受首座袈裟！', 'talk', '舌战晋阶'),
      openScene('scene_slq33_05_hall_return', SHAOLIN_Q33_QUEST_ID),
    ],
  },

  scene_slq33_04_xuannan_win: {
    id: 'scene_slq33_04_xuannan_win',
    title: '第三幕 · 宗师印心 · 青出于蓝',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('你与玄难首座同运深湛佛门内力与少林绝学，掌风激荡起满坪落叶旋舞如金莲，气浪绵绵不绝却不伤坪边一草一木！数合之间你稳守中宫、借势化劲抢占先机，旋即合十收势！'),
      S('NPC-0127', '（抚掌赞叹，满面欣慰）“青出于蓝而胜于蓝！当年剑痕崖一别，今日竟已臻如此禅武圆融化境，达摩祖师在天有灵亦当含笑！”'),
      N('坪外众僧齐声喝彩，连素来严苛的老辈玄字僧亦频频颔首！玄慈方丈含笑宣谕：“演武印证已过！随老衲返大雄正殿，进行第二关菩提院大辩！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q33_QUEST_ID, 'bodhi_hall_debate'),
      toast('演武印证圆满通过！重返【大雄正殿】舌战群僧、领受首座袈裟！', 'talk', '舌战晋阶'),
      openScene('scene_slq33_05_hall_return', SHAOLIN_Q33_QUEST_ID),
    ],
  },

  scene_slq33_05_hall_return: {
    id: 'scene_slq33_05_hall_return',
    title: '第四幕 · 殿前大辩 · 治寺纲领',
    subtitle: '大雄宝殿方丈院 · 大雄正殿（舌战群僧）',
    mandatory: true,
    beats: [
      N('重返大雄正殿，众玄字辈高僧各归蒲团，气氛顿时由演武坪的热血激昂转为庄重深沉。佛前长明灯火微微摇曳，映照着殿上诸老凝重的面容。'),
      S('NPC-0112', '（沉声抛出核心辩题）“{playerName}，如今天下山河动荡，大辽暗桩、西夏一品堂、吐蕃密宗与星宿海虎视眈眈，少室山天下英雄大会亦近在眼前。殿上诸老意见难一——面临此等乱局，少林究竟当闭寺清修，抑或入世护国？”'),
      S('NPC-0156', '（率先诘难，字字铿锵）“若大开山门，鱼龙混杂，万一西夏与星宿毒邪趁乱毁我千年基业，谁来担责？若闭门不出，又恐天下苍生寒心、武林耻笑少林怯战！”'),
      S('NPC-0127', '（亦缓声追问）“更兼朝堂风云变幻、边关兵燹将起，少林既为禅宗祖庭、中原北斗，究竟当立何等治寺纲领，方能既不负佛祖慈悲，又不堕中原大义？”'),
      N('全殿鸦雀无声，数十双目光齐聚你身！你深吸一口气，将二载佛学经义与辩才策论尽数融于胸臆，朗声陈词——'),
    ],
    choices: [
      {
        id: 'slq33_policy_world_dharma',
        label: '「佛法在世间，乱世当护苍生而不贪权柄」——广开山门联正道济苍生，功成身退绝不涉朝堂争权',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_policy', value: 'compassion_world' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q33_debate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q33_debate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq33_06_policy_a', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'slq33_policy_vajra_might',
        label: '「以金刚威仪整军护法，强敌不敢越雷池半步」——立少室盟约、严武备戒律，以雷霆震慑辽夏毒邪',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_policy', value: 'iron_vajra' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q33_debate_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q33_debate_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
          },
          openScene('scene_slq33_07_policy_b', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'slq33_policy_seclusion',
        label: '「恪守古刹清静不问红尘」——封山潜修、远离江湖与边关是非，唯保少林千年佛灯不灭',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_policy', value: 'seclusion' },
          openScene('scene_slq33_08_policy_c', SHAOLIN_Q33_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq33_06_policy_a: {
    id: 'scene_slq33_06_policy_a',
    title: '第五幕 · 佛在世间 · 慈悲护世',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      P('（声音清越如洪钟回荡梁柱）“六祖有言：佛法在世间，不离世间觉！闭山避世则苍生无依，贪恋权柄则佛门蒙尘！少林当广开山门坦荡迎客，邀丐帮及天下忠义豪杰共御外侮，同时令药王院备丹防毒、罗汉戒律暗守要隘——护得山河安宁便功成身退，绝不恋栈半分朝堂权位！”'),
      S('NPC-0127', '（目露激赏，连赞三声）“善哉！既显佛门如海悲心，又守清净不贪权柄之戒，句句切中肯綮！”'),
      S('NPC-0112', '（抚掌微叹，眼中透出极深慰藉）“{ifFlagEq:sl_pavilion=compassion|你昔日在藏经阁古杏下扫叶听风、以慈悲化戾，今日登殿又立『护苍生而不贪权柄』之大纲，禅心大智一脉相承，实乃少林之福！|难得你昔年在藏经阁虽行铁血天罗斩魔之烈策，此刻临首座大位反见如海慈悲与大局气度，刚柔已然并济，老衲甚慰！}”'),
      N('满殿玄字辈高僧齐齐起身合十，频频颔首：“此论既合佛理又通世务，我等心悦诚服！”'),
    ],
    onFinishEffects: [openScene('scene_slq33_09_council_verdict', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_07_policy_b: {
    id: 'scene_slq33_07_policy_b',
    title: '第五幕 · 金刚怒目 · 整军伏魔',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      P('（目光如炬，字字掷地有声）“乱世重典，佛门亦有怒目金刚！西夏一品堂与星宿海屡次下毒袭山，岂是空谈清修便能退却？当先立少室山盟约、整饬武僧堂口与十八罗汉铁阵，凡携毒勾敌者雷霆诛之！唯令虎狼强敌不敢越雷池半步，古刹清静与苍生太平始有保障！”'),
      S('NPC-0156', '（猛地抚膝大赞，声震大殿）“痛快！好一个以金刚威仪护法安邦！没有霹雳手段，何谈菩萨心肠？老衲举双手赞成！”'),
      S('NPC-0112', '（沉吟片刻，郑重颔首）“{ifFlagEq:sl_pavilion=ironfist|从藏经阁暗布天罗斩毙黑水魔僧，到今日主张整军护法震慑四夷，你一路铁血担当始终如一；然切记威仪在外、悲心在里，莫失佛门本怀！|你昔日于古杏树下扫叶化戾，原以为你专主柔静，不料今日临大劫反展金刚担当——能柔能刚、慈悲与威仪兼备，足镇少室群豪！}”'),
      N('殿上诸院高僧彼此相视，俱觉言之成理、魄力非凡，齐齐合十赞许！'),
    ],
    onFinishEffects: [openScene('scene_slq33_09_council_verdict', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_08_policy_c: {
    id: 'scene_slq33_08_policy_c',
    title: '第五幕 · 守静明心 · 古刹佛灯',
    subtitle: '大雄宝殿方丈院 · 大雄正殿',
    mandatory: true,
    beats: [
      P('（神色平和淡然，娓娓道来）“朝代更迭、武林争霸皆如梦幻泡影。少林既为千年禅宗祖庭，若终日卷入江湖厮杀与边关权谋，久之恐失本真。弟子以为不妨收敛锋芒、封山清修，潜心守护经藏与祖师法统，令佛灯万世不灭。”'),
      S('NPC-0156', '（皱眉摇头，直言不讳）“此论过于守成！树欲静而风不止，西夏与星宿都把毒投进嵩山泉眼了，岂容咱们闭门独善其身？”'),
      S('NPC-0112', '（抬手止住殿上议论，目光深沉地望向你）“{ifFlagEq:sl_pavilion=compassion|你昔日古杏扫叶得清净禅心，今日不趋炎附势、直言守静之志，这份赤诚殊为可贵；只是少林既为武林泰斗，大劫当前终究避无可避，望你登位后仍怀护法之备。|你昔日亲布天罗斩魔，今日反倡清静避世，想必已深味杀伐之苦；只是强敌环伺，少林佛灯亦须有人执杖护持方能长明。}”'),
      N('玄难亦出言缓颊，念你演武印证折服众僧、又屡建护寺奇功且直言不阿，诸位玄字辈长老商议再三，终一致允准晋升之议！'),
    ],
    onFinishEffects: [openScene('scene_slq33_09_council_verdict', SHAOLIN_Q33_QUEST_ID)],
  },

  scene_slq33_09_council_verdict: {
    id: 'scene_slq33_09_council_verdict',
    title: '第六幕 · 群僧折服 · 赐披红锦',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    illustrationUrl: '/assets/quests/sl_33_elder_robe.jpg',
    illustrationCaption: '授衣晋阶 · 玄慈方丈亲授红锦首座袈裟，正式晋升少林长老/堂院首座',
    mandatory: true,
    beats: [
      N('大议终定！玄慈方丈缓步走下莲台法座，自香案亲手捧起一件金线绣莲的红锦首座袈裟与一方温润紫檀长老印信，在全寺玄字辈高僧见证下为你披挂肩头！'),
      S('NPC-0112', '（声震大雄宝殿，庄严宣告）“佛祖见证，历代祖师见证！今敕封真传弟子{playerName}晋升嵩山少林寺【长老 / 堂院首座】！自今日起，参赞全寺机要，统领堂院英才，永续少林千年薪火！”'),
      S('NPC-0112', '（将紫檀首座印信递至你眼前，低声托付）“位列少林中枢，千钧重担即在双肩。履新伊始，你意欲先从哪一桩寺中要务着手？”'),
    ],
    choices: [
      {
        id: 'slq33_duty_inner_peace',
        label: '【清源固本】先整顿藏经阁与诸院禅修，防微杜渐化解寺内潜伏多年的暗影隐患',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_first_duty', value: 'inner_peace' },
          openScene('scene_slq33_10_settle', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'slq33_duty_alliance',
        label: '【外联正道】先筹备少室山大会防务，联络丐帮与中原忠义豪杰共御辽夏风波',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q33_first_duty', value: 'alliance' },
          openScene('scene_slq33_10_settle', SHAOLIN_Q33_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq33_10_settle: {
    id: 'scene_slq33_10_settle',
    title: '第七幕 · 稽首承命 · 位列中枢',
    subtitle: '大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    mandatory: true,
    beats: [
      N('红锦首座袈裟垂落双肩，紫檀长老印信入手温润。回首演武坪上{ifFlagEq:sl_q33_spar_opponent=xuantong|与玄痛首座铁掌硬撼的铿锵交锋|与玄难首座宗师印心的满坪金叶}，再念殿前辩难之肺腑宏愿，二载少林修行的点点滴滴涌上心头。'),
      N('玄慈赞你{ifFlagEq:sl_q33_first_duty=inner_peace|深谋远虑、先固寺内藏经根基|胸怀天下、先谋正道同盟防务}，大殿内外千名少林僧众齐齐合十躬身，山呼佛号震彻嵩岳：“阿弥陀佛！恭贺新任首座长老！”'),
      N('此刻，你面向金身大佛与玄慈方丈郑重稽首三拜，立下属于少林新任首座的铮铮誓言——'),
    ],
    choices: [
      {
        id: 'slq33_oath_zen',
        label: '稽首立誓：谨守禅武慈悲初心，上不负历代祖师法统，下不负天下苍生期盼！（晋升 Lv.4）',
        tone: 'gold',
        effects: buildPromotionEffects(),
      },
      {
        id: 'slq33_oath_vanguard',
        label: '稽首立誓：承此红锦袈裟与首座印信，纵前路强敌如林，誓卫少林千年正统不堕！（晋升 Lv.4）',
        tone: 'danger',
        effects: buildPromotionEffects(),
      },
    ],
  },

  scene_slq33_11_epilogue: {
    id: 'scene_slq33_11_epilogue',
    title: '第八幕 · 嵩岳长青 · 风云新篇',
    subtitle: '嵩山少林寺 · 大雄宝殿方丈院',
    mandatory: true,
    beats: [
      N('步出大雄宝殿，仲春和风拂动金莲红锦袈裟，少室群峰在云海金光中巍然矗立，殿前千年古柏苍翠欲滴。'),
      N('从当年初登嵩山石阶的青涩弟子，到今日受封红锦袈裟、位列少林中枢的堂院首座——二载血火与禅思，已将你的名号与少林千年古刹紧紧相系。'),
      P('（手抚紫檀首座印信，目光投向少室山下辽阔中原）“风起河洛，大局将至——双僧悬案、少室风云与藏经阁三十年暗流，便由我亲手接下！”'),
    ],
  },
}
