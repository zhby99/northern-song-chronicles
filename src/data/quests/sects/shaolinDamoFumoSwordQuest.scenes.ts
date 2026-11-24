import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q09_QUEST_ID } from './shaolinDamoFumoSwordQuest'

const SPEAKER_HAN_LI: StorySpeakerSpec = {
  kind: 'custom',
  name: '阴风剑 · 韩厉',
  title: '关西三邪剑首',
  factionName: '关西邪道',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_CAO_XIAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '断魂剑 · 曹枭',
  title: '关西三邪剑次席',
  factionName: '关西邪道',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

const SPEAKER_WEI_QI: StorySpeakerSpec = {
  kind: 'custom',
  name: '冷蛇剑 · 魏七',
  title: '关西三邪剑末席',
  factionName: '关西邪道',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildCaoXiao(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ09_CAO_XIAO',
    name: '断魂剑 · 曹枭',
    title: '关西三邪剑次席',
    realm: '三流上品',
    factionName: '关西邪道',
    sectRank: 0,
    sectRankLabel: '邪派剑客',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“秃驴还想拿块破铁片装剑客？看我断魂剑挑断你的手筋！”',
    stats: { hp: 820, mp: 460, agi: 36, res: 21 },
    talents: { bone: 58, comprehension: 50, charm: 34 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-187', move2: 'MA-188' },
    learnedArts: [{ artId: 'MA-238', level: 4 }, { artId: 'MA-187', level: 4 }, { artId: 'MA-188', level: 4 }],
  })
}

function buildWeiQi(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ09_WEI_QI',
    name: '冷蛇剑 · 魏七',
    title: '关西三邪剑末席',
    realm: '三流上品',
    factionName: '关西邪道',
    sectRank: 0,
    sectRankLabel: '邪派剑客',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“嘿嘿，曹二哥攻他上三路，我专刺这小和尚的膝弯下阴！”',
    stats: { hp: 780, mp: 440, agi: 39, res: 20 },
    talents: { bone: 54, comprehension: 52, charm: 30 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-187', move2: 'MA-188' },
    learnedArts: [{ artId: 'MA-238', level: 4 }, { artId: 'MA-187', level: 4 }, { artId: 'MA-188', level: 3 }],
  })
}

function buildHanLiBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ09_HAN_LI',
    name: '阴风剑 · 韩厉',
    title: '关西三邪剑首',
    realm: '二流下品',
    factionName: '关西邪道',
    sectRank: 0,
    sectRankLabel: '邪剑首领',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“哼！且接韩某浸淫二十载的阴风诡剑，叫你知道少林秃驴不配碰剑！”',
    stats: { hp: 1180, mp: 760, agi: 46, res: 28 },
    talents: { bone: 68, comprehension: 66, charm: 42 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-148', move2: 'MA-128' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-148', level: 6 }, { artId: 'MA-128', level: 5 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq09_01: {
    id: 'scene_slq09_01',
    title: '第一幕 · 绝壁松风',
    subtitle: '达摩院 · 绝壁石刻剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}嵩山清秋，少室峰后崖云海翻涌。十余丈高的青黑峭壁如刀劈斧削，山风自幽谷倒卷而上，吹得崖畔老松发出金戈低鸣。你既剃度归入达摩院脉，卯时便奉首座玄难法谕登临剑痕崖。'),
      S('NPC-0127', '（灰布百衲僧袍迎风而立，目光沉静如渊）“阿弥陀佛。{ifFlagEq:sl_q04_debate_choice=prajna|当日大雄宝殿素宣之上，你写下『动若雷霆而心无所滞』，老衲便知你合我达摩院禅武一如之气象。|}{ifFlagEq:sl_q04_debate_choice=vajra|当日大雄宝殿你提笔言『金刚怒目、除恶务尽』，锋芒太露；既入我达摩院，今日便借这峭壁古剑，磨一磨你三分杀伐躁气。|}{ifFlagEq:sl_q04_debate_choice=worldly|当日大雄宝殿你尚存扬名立万之尘念，既择入达摩院参玄，今日便从这绝壁古痕起，洗一洗心中浮相吧。|}”'),
      S('NPC-0127', '“世人皆知少林棍棒拳掌，却不知自唐初十三棍僧以降，我寺便有《伏魔剑》传世。《大般涅槃经》云『护持正法者，当执刀剑而无害心』——剑在凶人手中为屠戮凶器，在禅者手中则如文殊慧剑，斩心障、伏外魔，锋出而不伤性命，势尽而知所止！”'),
      N('话音落定，玄难自袖中取出一柄未开血槽、刃口微钝却古朴沉重的玄铁戒剑递至你手，指着绝壁之上纵横深浅的历代石刻道：“去崖前静心观摩三道古剑痕，悟透其间真谛，再随老衲演剑。”'),
    ],
    choices: [
      {
        id: 'slq09_accept_quest',
        label: '合十接过玄铁戒剑，留驻剑痕崖参悟古刻剑意',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q09_QUEST_ID, stepId: 'study_sword_cliff' },
          setStep(SHAOLIN_Q09_QUEST_ID, 'study_sword_cliff'),
          toast('已开启《剑痕绝壁 · 达摩初剑》！请留驻剑痕崖观摩三道古剑痕。', 'talk', '达摩初剑'),
        ],
      },
    ],
  },

  scene_slq09_02: {
    id: 'scene_slq09_02',
    title: '第二幕 · 绝壁三痕',
    subtitle: '绝壁石刻 · 剑痕崖（无提示真悟剑）',
    illustrationUrl: '/assets/quests/sl_09_sword_cliff.jpg',
    illustrationCaption: '绝壁剑痕崖 · 玄难折松演剑，青壁三道古痕暗藏伏魔禅机',
    mandatory: true,
    beats: [
      N('玄难随手折下一截干枯松枝，迎风缓缓演完《伏魔剑》三十六路起手剑架——白鹤亮翅守中宫、降魔指路破虚招、韦陀献杵压敌锋。松枝点至青壁寸许骤然凝滞，枝尖震落三片枯叶，竟齐齐飘入凹槽，分毫不差！'),
      S('NPC-0127', '“口诀剑架老衲已尽数传你，今日便先领受这门《伏魔剑》。只是剑形易摹，剑意难通——这峭壁之上有前代三位高僧留下的截然不同的古剑痕，各自蕴藏一条剑道。你凝神细观，哪一道最契合我少林伏魔剑破邪真谛？”'),
      N('你立于青壁三步之外，目光沿着满壁苔痕缓缓游移，最终锁定三道气象迥异的古剑痕：其一深陷青岩寸许，自上而下刚猛直劈，霸道绝伦；其二蜿蜒如行云流水，呈浑圆弧形化劲之态，绵绵不绝；其三却看似笔锋断续，细察方知每一剑皆在劲力最盛处戛然收锋、归于无痕。'),
      N('松涛过耳，玄难负手静待你择其一而摹之——'),
    ],
    choices: [
      {
        id: 'slq09_trace_deep',
        label: '临摹『深陷寸许的刚猛直劈痕』——以雷霆重剑直劈中宫，追求摧枯拉朽之威',
        tone: 'default',
        effects: [
          teachArtNow('MA-110'),
          { type: 'setFlag', flag: 'sl_q09_trace_choice', value: 'deep' },
          openScene('scene_slq09_03', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'slq09_trace_arc',
        label: '临摹『如行云流水的弧形化劲痕』——以圆转剑弧连绵借力，追求滴水不漏之守',
        tone: 'default',
        effects: [
          teachArtNow('MA-110'),
          { type: 'setFlag', flag: 'sl_q09_trace_choice', value: 'arc' },
          openScene('scene_slq09_03', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'slq09_trace_stop',
        label: '临摹『看似断续实则归于无痕的收锋痕』——藏锋于内、势尽归静，追求发收由心之定',
        tone: 'default',
        effects: [
          teachArtNow('MA-110'),
          { type: 'setFlag', flag: 'sl_q09_trace_choice', value: 'stop' },
          { type: 'setFlag', flag: 'sl_q09_sword_insight', value: true },
          openScene('scene_slq09_03', SHAOLIN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq09_03: {
    id: 'scene_slq09_03',
    title: '第三幕 · 悟剑印心',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你沉腰运起《罗汉伏虎功》，手握玄铁戒剑顺着选定那道古剑痕徐徐演练。初时戒剑破风尚带生涩锐啸，半炷香后，剑势竟渐渐褪去浮躁，隐隐透出一缕低沉浑厚的禅钟余韵。'),
      S('NPC-0127', '{ifFlagEq:sl_q09_trace_choice=stop|（眼中精光骤亮，罕见地抚掌大赞）“妙极！直劈痕失之太刚易起杀念，弧形痕流于取巧难伏强魔，唯独那道看似断续、实则劲尽归静的收锋痕，藏着《伏魔剑》『发如雷霆、止于半寸』的破邪真谛！你未历实战便先窥玄关，悟性超凡！”|}{ifFlagEq:sl_q09_trace_choice=deep|（微微颔首，旋即轻叹提点）“直劈痕固见正大雄浑，但佛门剑道若一味求深求狠，反易滋生杀伐躁气。切记《伏魔剑》最难处不在出锋，而在收锋——此中玄关，待你临敌时再细细体悟吧。”|}{ifFlagEq:sl_q09_trace_choice=arc|（捻须微哂，温声指点）“弧形痕圆转灵动，善守而不善伏魔。若只求以柔化劲而无『骤止归静』之定力，遇狠辣邪剑恐难夺先机。先将三十六路剑架练熟，莫忘沉心定气。”|}'),
      S('NPC-0127', '“午后老衲尚须往幽谷石室照看玄澄师兄，你且独留剑痕崖再静练三个时辰，莫求其快，先求每一剑落点如尺量墨画。”'),
      N('玄难负手踏云而去，山崖四下复归沉寂。你收心凝神，正欲将方才悟得的剑意再印证一遍，崖下石阶却骤然传来刺耳的狂笑与铁鞘磕石之声！'),
    ],
    onFinishEffects: [openScene('scene_slq09_04', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_04: {
    id: 'scene_slq09_04',
    title: '第四幕 · 关西三邪',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('三道身着玄黑劲装、腰佩窄刃长剑的阴鸷身影大摇大摆闯入达摩院禁地！为首中年剑客面色青白、双目狭长，三尺青锋虽未出鞘，周身已透出刺骨森冷的邪剑煞气。'),
      S(SPEAKER_CAO_XIAO, '（窄剑斜指青壁石刻，仰天嗤笑）“韩大哥快瞧！堂堂少林禅林禁地，竟放着个小沙弥拎根没开刃的烧火铁条在这儿装剑客，真是笑掉大牙！”'),
      S(SPEAKER_HAN_LI, '（冷哼抱臂，眼中怨毒毕露）“关西三邪剑首韩厉，十年前在陇右败于一名少林游方老僧剑下，憋了整整十载恶气！今日闻说达摩院后继无人，特带曹枭、魏七两位义弟来讨教——若连这几道破石刻都护不住，少林趁早封剑认输！”'),
      S(SPEAKER_WEI_QI, '（阴恻恻舔了舔嘴唇，与曹枭一左一右踩着刁钻步法欺身围拢）“小秃驴，识相的乖乖丢下铁条滚蛋，否则我们先挑断你的手筋，再替韩大哥把这块剑痕崖削成光板！”'),
      P('（双眉微凝，将玄铁戒剑横于身前，声音清朗如钟）“阿弥陀佛！此乃少林达摩院禁地，三位施主不递名帖、口出狂言更欲亵渎先贤石刻——小僧今日便以手中戒剑，领教关西邪术！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q09_QUEST_ID, 'repel_guanxi_swords'),
      openScene('scene_slq09_05', SHAOLIN_Q09_QUEST_ID),
    ],
  },

  scene_slq09_05: {
    id: 'scene_slq09_05',
    title: '第五幕 · 绝壁破局',
    subtitle: '剑痕崖窄径（三策破邪）',
    mandatory: true,
    beats: [
      N('山风骤紧！断魂剑曹枭纵身半空直削天灵，冷蛇剑魏七贴地滑步悄无声息斜刺膝弯——上下夹攻、一明一暗，二人剑网瞬间封死半面崖坪！'),
      N('韩厉则负手立于三丈外石阶之上，冷笑压阵，幽蓝阴风剑蓄势待发，只等二徒耗尽你的气力便下杀手。'),
      N('身后即是历代达摩院高僧留下的青壁剑刻，脚下窄崖不足三丈宽阔。电光火石之间，你决意如何破此关西三邪合围？'),
    ],
    choices: [
      {
        id: 'slq09_tactic_chant',
        label: '【以禅音慑邪剑】朗诵《心经》配玄铁剑鸣，震散二邪心神直取韩厉！',
        subLabel: '跳过曹枭、魏七合围，直接 1v1 迎战阴风剑韩厉（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【经义】≥ 60 或【琴】≥ 35',
          conditions: [
            { type: 'skillAtLeast', key: '经义', min: 60 },
            { type: 'skillAtLeast', key: '琴', min: 35 },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q09_approach_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q09_approach_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          { type: 'setFlag', flag: 'sl_q09_tactic', value: 'chant' },
          { type: 'setFlag', flag: 'sl_q09_minions_cleared', value: true },
          openScene('scene_slq09_06', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'slq09_tactic_cliff',
        label: '【绝壁借势断剑路】凭方才悟得的收锋剑意于窄崖卡位，令二邪无处合击！',
        subLabel: '跳过曹枭、魏七合围，直接 1v1 迎战阴风剑韩厉（禅心慈悲 +1）',
        tone: 'gold',
        condition: {
          type: 'flag',
          flag: 'sl_q09_sword_insight',
          op: 'truthy',
          label: '已于剑痕崖参透收锋剑意',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q09_approach_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q09_approach_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          { type: 'setFlag', flag: 'sl_q09_tactic', value: 'cliff' },
          { type: 'setFlag', flag: 'sl_q09_minions_cleared', value: true },
          openScene('scene_slq09_06', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'slq09_tactic_direct',
        label: '【剑出伏魔正面破邪】脚踏四平禅步，执戒剑正面车轮连破关西邪剑！',
        subLabel: '车轮连战曹枭、魏七（三流上品 × 2），胜后直面韩厉（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCaoXiao() },
            extraOpponents: [{ kind: 'custom', npc: buildWeiQi() }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是达摩院历代先贤剑刻，岂容邪徒亵渎！',
            introText: '【车轮连战 · 剑痕崖护刻】迎战关西邪剑【断魂剑 · 曹枭】与【冷蛇剑 · 魏七】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q09_minions_cleared', value: true },
              { type: 'setFlag', flag: 'sl_q09_tactic', value: 'direct' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q09_approach_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q09_approach_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq09_06', SHAOLIN_Q09_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('双邪诡刺刁钻，退回崖石畔调匀气息后再战！', 'warn', '达摩初剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq09_06: {
    id: 'scene_slq09_06',
    title: '第六幕 · 破阵惊邪',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q09_tactic=chant|你左手食指轻弹玄铁剑脊，“嗡——”一声深沉剑鸣霎时荡开云雾！紧接着你运足中气朗诵《般若波罗蜜多心经》，清越梵音与金铁剑韵在绝壁间回荡共振，直透曹枭、魏七识海！|}{ifFlagEq:sl_q09_tactic=cliff|你脑海闪过青壁那道收锋古痕，不退反进斜跨半步，恰好卡死窄崖石径唯一交汇之眼！玄铁戒剑点而不发，似断实连，瞬间截断曹枭劈空之势，更顺势挡住魏七贴地冷刺！|}{ifFlagEq:sl_q09_tactic=direct|“铛——铛——”两声金铁巨响震彻山谷！你以玄铁戒剑沉雄剑脊硬磕曹枭剑腹，借反震之力一式「韦陀献杵」精准震麻魏七腕脉寸关，二人长剑脱手翻飞，踉跄跌坐青石！|}'),
      S(SPEAKER_CAO_XIAO, '{ifFlagEq:sl_q09_tactic=chant|（捂住双耳连退五步，脸色发白、剑尖剧颤）“这……这是什么邪门佛音？！吵得我胸口发闷，连剑都握不稳了！”|}{ifFlagEq:sl_q09_tactic=cliff|（险些与魏七撞作一团，满脸惊骇）“怪事！这小和尚一步卡死窄径，咱俩的合击连门缝都插不进去！”|}{ifFlagEq:sl_q09_tactic=direct|（捂着手腕连连后退，骇然失色）“这秃驴的剑重得像铁柱，转折又快得像活物，虎口都崩裂了！”|}'),
      S(SPEAKER_HAN_LI, '（脸色彻底阴沉，再无半分轻视，缓缓掣出泛着幽蓝寒光的阴风剑）“两个没用的废物退到一旁！小沙弥，倒真有几分达摩院的门道——且让韩某亲自称称你这柄戒剑的斤两！”'),
      N('山风陡然化作刺骨寒流，韩厉单脚踏碎青石，整个人化作一道青灰厉影直扑而来！'),
    ],
    onFinishEffects: [openScene('scene_slq09_07', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_07: {
    id: 'scene_slq09_07',
    title: '第七幕 · 阴风诡剑',
    subtitle: '剑痕崖决战（1v1 阴风剑韩厉）',
    illustrationUrl: '/assets/quests/sl_09_fumo_sword_duel.jpg',
    illustrationCaption: '剑痕崖决锋 · 玄铁戒剑直破阴风诡刺，禅心不动伏邪剑',
    mandatory: true,
    beats: [
      N('韩厉身法鬼魅，阴风剑在半空抖出七朵凄厉寒花，忽左忽右、虚实难辨，每一道剑芒皆挟带森冷阴劲，专攻周身气脉死穴！'),
      N('寻常剑客遇此诡路难免心浮气躁，你却深吸一口山谷清气，脑中浮现玄难折松点壁之姿——任他阴风千变万化，我自一剑守中，以正破邪！'),
      P('（玄铁戒剑划出一道沉稳浑圆的剑弧，声如洪钟）“韩施主剑虽快，却失之偏邪戾重！且接小僧一式《伏魔剑》！”'),
    ],
    choices: [
      {
        id: 'slq09_fight_hanli',
        label: '执戒剑迎战关西邪剑首「阴风剑 · 韩厉」！（1v1 决战）',
        subLabel: '二流下品强敌 · 以正大伏魔剑意破其阴风诡剑',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHanLiBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '阴风剑已封死退路，唯以正大伏魔剑意正面破之！',
            introText: '【1v1 剑痕崖伏魔】迎战关西三邪剑首【阴风剑 · 韩厉】（二流下品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq09_08', SHAOLIN_Q09_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('韩厉阴风剑路诡谲难测，暂且收剑凝神，再观石刻剑意复战！', 'warn', '达摩初剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq09_08: {
    id: 'scene_slq09_08',
    title: '第八幕 · 眉心半寸',
    subtitle: '绝壁石刻 · 剑痕崖（战后抉择）',
    mandatory: true,
    beats: [
      N('二十余合恶斗，韩厉越攻越急，阴风剑招渐露空门，猛然咬牙使出搏命杀招「阴风穿心」，不顾自身中宫直刺你胸膛！'),
      N('千钧一发之际，你偏步格偏诡锋，玄铁戒剑剑走中宫化作一道乌黑流光直点其面门——在距离韩厉眉心仅仅半寸之处，戛然而止！凛冽剑风削断两根额发飘落青石，剑尖却稳如磐石，未伤分毫皮肉！'),
      N('死一般的寂静笼罩剑痕崖。冷汗顺着韩厉青白的鬓角滚落，他僵立良久，终于「咣当」一声抛下阴风剑，双膝微软、面如死灰。'),
      N('关西三邪在陇右作恶多年，此刻已尽成阶下之囚。剑悬半寸，你决意如何处置韩厉？'),
    ],
    choices: [
      {
        id: 'slq09_spare_hanli',
        label: '【折剑放生】踏断阴风邪剑，放其下山自省改过',
        subLabel: '佛门戒剑只伏魔心、不结死仇（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q09_hanli_spared', value: true },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq09_09', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'slq09_cripple_hanli',
        label: '【废腕送戒】震折韩厉持剑右腕，押送戒律院究办宿恶',
        subLabel: '以金刚手段永绝关西邪剑之患（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q09_hanli_spared', value: false },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq09_09', SHAOLIN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq09_09: {
    id: 'scene_slq09_09',
    title: '第九幕 · 邪客伏首',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q09_hanli_spared|你缓缓收剑，足尖轻挑将地上那柄阴风邪剑踏成两截，合十温声道：“佛门戒剑只伏魔心，不取人命。邪剑已断，望三位施主自此洗手归善，切莫再倚剑作恶。”|你眼神微凛，反手一记玄铁剑柄精准震折韩厉右腕经筋，令其此生再难握剑行凶，随即吹响竹哨召来巡山武僧，将垂头丧气的关西三邪缚送戒律院严办。}'),
      S(SPEAKER_HAN_LI, '{ifFlag:sl_q09_hanli_spared|（凝望断剑良久，声音干涩而颤抖）“半寸收锋、折剑留命……少林伏魔剑果然名不虚传！韩某今日输得心服口服，自此封剑归乡，绝不再踏中原是非！”|（强忍腕痛惨然冷笑，眼中满是不甘与惊惧）“好狠的少林和尚……半寸收锋却废我剑腕，韩某栽在达摩院手里，认了！”}'),
      N('{ifFlag:sl_q09_hanli_spared|韩厉深深望你一眼，拉起面如土色的曹枭与魏七郑重一揖，垂首狼狈退下山阶。|巡山武僧押着三名邪剑客远去，山崖上的肃杀剑气终于缓缓散尽。}'),
      N('就在此时，崖畔苍松后传来一声清越佛号——原来玄难首座早已察觉山径异动，静立松阴观战多时，此刻含笑步出！'),
    ],
    onFinishEffects: [openScene('scene_slq09_10', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_10: {
    id: 'scene_slq09_10',
    title: '第十幕 · 首座问剑',
    subtitle: '绝壁石刻 · 剑痕崖（禅武印证）',
    mandatory: true,
    beats: [
      S('NPC-0127', '“善哉！方才那一剑止于眉心半寸，既挫尽关西邪剑锐气，更见临危不乱的定力。{ifFlag:sl_q09_hanli_spared|你能折剑留命、导其向善，足见胸怀佛门慈悲，实属难得！|你虽断其剑腕、送交戒律院以绝后患，手段终究偏于凌厉；金刚怒目亦须常怀慈心，切莫让剑气反蚀禅定。}”'),
      P('（双手捧起玄铁戒剑恭敬呈还）“全赖师伯先以石壁剑意开示，弟子方能守住中宫，不致落入阴风诡剑圈套。”'),
      S('NPC-0127', '（并未接剑，反而含笑追问一语）“既历此战，你且直言——今日能伏关西邪剑，所凭者究竟是手中玄铁戒剑之沉雄，还是心中那半分收放之定力？”'),
    ],
    choices: [
      {
        id: 'slq09_heart_mind',
        label: '“戒剑只是外缘，临危不动、知止不妄之定力，方是伏魔之本”',
        subLabel: '以禅御剑，明心见性（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q09_sword_heart', value: 'mind' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq09_11', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'slq09_heart_both',
        label: '“空谈禅定难伏悍匪，沉剑与定力互为表里、缺一不可”',
        subLabel: '禅武并重，务实护法',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q09_sword_heart', value: 'both' },
          openScene('scene_slq09_11', SHAOLIN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq09_11: {
    id: 'scene_slq09_11',
    title: '第十一幕 · 达摩初传',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '{ifFlagEq:sl_q09_sword_heart=mind|（欣然抚须，目光温润）“心不随剑乱，剑方随心转！能悟此理，你已真正踏入我达摩院门墙。”|}{ifFlagEq:sl_q09_sword_heart=both|（颔首微哂）“不落空谈，亦不溺蛮勇，禅武互参方为中道。这柄玄铁戒剑你且留着日常演练。”|}'),
      N('玄难自怀中取出一册泛黄线装的《伏魔剑诀》全本郑重交予你手，又遥指云海翻涌的少室群峰沉声叮嘱：'),
      S('NPC-0127', '“达摩院脉历来重禅悟、重书棋辩才，更重临敌不乱之定力。你既已修成初剑，往后须勤诵经义、涵养笔墨棋心，待根基更厚，老衲自会引你参悟更高深的达摩院绝学。”'),
      P('（双手接过《伏魔剑诀》，向玄难首座合十长揖）“弟子谨遵首座法谕，必不负达摩院百年传承！”'),
    ],
    choices: [
      {
        id: 'slq09_complete',
        label: '拜谢玄难首座，正式领受《伏魔剑》全本传承',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-110' },
          { type: 'giveCombatExp', amount: 260, reason: '剑痕崖悟剑力破关西三邪剑' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q09_sword_insight', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q09_QUEST_ID, outcome: 'completed' },
          toast('已完成《剑痕绝壁 · 达摩初剑》，习得《伏魔剑》！', 'success', '达摩初剑'),
        ],
      },
    ],
  },
}
