import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q26_QUEST_ID } from './shaolinJielvBoruoQuest'

const SPEAKER_GHOST_HAND: StorySpeakerSpec = {
  kind: 'custom',
  name: '鬼手陈',
  title: '辽探重金买通 · 盗拓飞贼首',
  factionName: '大辽暗探雇凶',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
}

function buildCorridorLookout(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ26_LOOKOUT',
    name: '接应飞贼 · 铁凿刘',
    title: '鬼手陈手下 · 诱敌死士',
    realm: '二流上品',
    factionId: 'SECT-18',
    factionName: '大辽暗探',
    sectRank: 2,
    sectRankLabel: '盗拓随从',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“秃驴中了陈爷声东击西之计！老子先拖住你，等陈爷拓完碑阴就撤！”',
    stats: { hp: 1720, mp: 1080, agi: 60, res: 38 },
    talents: { bone: 74, comprehension: 66, charm: 42 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-155' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-244', level: 7 }, { artId: 'MA-155', level: 6 }],
  })
}

function buildGhostHandChenBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ26_GHOST_HAND',
    name: '鬼手陈',
    title: '辽探买通 · 盗拓飞贼首',
    realm: '一流下品',
    factionId: 'SECT-18',
    factionName: '大辽暗探',
    sectRank: 3,
    sectRankLabel: '盗拓贼首',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“嘿嘿嘿，辽国贵人出三千两雪花银买这通唐碑的秘拓！识相的快滚一边去，莫逼陈爷用毒针寒掌送你上西天！”',
    stats: { hp: 3120, mp: 2220, agi: 78, res: 58 },
    talents: { bone: 84, comprehension: 86, charm: 48 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-243', level: 8 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-076', level: 7 }],
  })
}

function buildGhostHandTrappedBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ26_GHOST_HAND_TRAPPED',
    name: '鬼手陈（瓮中捉鳖）',
    title: '辽探买通 · 盗拓飞贼首',
    realm: '一流下品',
    factionId: 'SECT-18',
    factionName: '大辽暗探',
    sectRank: 3,
    sectRankLabel: '盗拓贼首',
    avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
    talk: '“见鬼！你怎么识破我的松脂假拓与藻井悬身法？！外头接应都来不及救，陈爷跟你们拼了！”',
    stats: { hp: 2620, mp: 1920, agi: 70, res: 50 },
    talents: { bone: 84, comprehension: 86, charm: 48 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-244', level: 7 }, { artId: 'MA-076', level: 6 }],
  })
}

const TEACH_BORUO_IF_MONK: QuestEffect = {
  type: 'branch',
  condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
  thenEffects: [teachArtNow('MA-043')],
  elseEffects: [],
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq26_01: {
    id: 'scene_slq26_01',
    title: '第一幕 · 东厢碑影 · 唐碑传心',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('{reignYear}仲秋，桂香满院。你奉「一拍神僧」玄寂师伯之命来到大雄宝殿东侧的【东厢碑廊 · 藏经橱】；夕阳斜照入廊，将一通丈余高的唐代青石古碑染成淡金，碑面楷书《般若波罗蜜多心经》笔力遒劲沉厚、宛若金石雷音。'),
      P('（合十躬身）“弟子参见玄寂师伯！不知师伯召弟子来东厢唐碑前，有何法谕？”'),
      S('NPC-0134', '（缓缓抚过碑面『照见五蕴皆空』六字，声沉如钟）“阿弥陀佛！师侄潜修经义书法兼优，护寺屡建奇功。世人皆知老衲以《一拍两散掌》名震天下，却不知我少林掌法根基全在《般若掌》一门！”'),
      S('NPC-0134', '“你细看这唐碑字迹：起笔藏而不露，转折绵而不绝，收笔空而有力——这便是『掌吐梵音、一空到底』的无上法度！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_02', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_02: {
    id: 'scene_slq26_02',
    title: '第二幕 · 碑前示掌 · 掌吐梵音',
    subtitle: '东厢碑廊 · 以书证掌',
    illustrationUrl: '/assets/quests/sl_26_tang_stele.jpg',
    illustrationCaption: '东厢古碑 · 夕阳映照唐代《心经》古碑，玄寂于碑前示范《般若掌》，掌风过处竟如古钟梵音回荡',
    mandatory: true,
    beats: [
      N('玄寂缓步退后三步，面向唐碑平平推出一掌！掌势看似轻描淡写，然而掌风掠过碑面凹凸刻痕的刹那，竟激起一阵低沉浑厚的嗡鸣，宛若大殿青铜古钟低吟梵音，震得你灵台一片澄明！'),
      S('NPC-0134', '“听见了么？这便是《般若掌》的『梵音共振』！掌力不在蛮横，而在将浑厚佛门内息化作层层空明气浪，遇刚则化、遇邪则摧！”'),
      N('{ifFlagEq:sl_branch=layman|玄寂随即借唐碑笔势为你拆解中锋平推、以柔卸阴的护寺掌理，虽依清规禅门《般若掌》秘传不授俗家，却将破毒防暗的实战精要倾囊相告；|玄寂随即逐一拆解《般若掌》三十六式掌诀，尤将压箱绝招「一空到底」的蓄势、吐纳、化实为空三层妙境倾囊相授；}你依碑上楷书笔势反复试演，顿觉中锋行笔与中宫平推如出一辙！'),
      P('（掌风掠碑隐带清越微鸣，合十拜谢）“以书养气、掌吐梵音，弟子已明玄寂师伯点化之妙！”'),
    ],
    onFinishEffects: [TEACH_BORUO_IF_MONK, openScene('scene_slq26_03', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_03: {
    id: 'scene_slq26_03',
    title: '第三幕 · 碑阴秘辛 · 诱贼入瓮',
    subtitle: '东厢碑廊 · 护碑布防',
    mandatory: true,
    beats: [
      N('演武方罢，玄寂神色骤肃，引你绕至唐碑背面，指着碑阴几行被岁月风化得极淡的微雕梵文与山川刻线低声示警。'),
      S('NPC-0134', '“这通唐碑背面暗刻着前朝高僧勘定的河洛山川暗道与关隘地形暗记！戒律院昨夜截获密报：大辽细作重金买通了一名盗拓飞贼首——人称【鬼手陈】的一流惯贼，欲于今夜子时潜入东厢碑廊强拓此碑，甚至打算得手后毁碑灭迹！”'),
      S('NPC-0134', '“若派百名武僧明哨围守，反会打草惊蛇。老衲已撤去外廊明岗，今夜由你独自潜伏东厢碑廊守株待兔——既捉活口追查辽线，又护千年唐碑！”'),
      N('暮色渐沉，晚课钟声悠悠落定。玄寂离去前，你决定如何在东厢碑廊预先布下暗着？'),
    ],
    choices: [
      {
        id: 'slq26_prep_powder',
        label: '【碑阴轻拂冷香细灰】在碑阴石座与梁柱暗处撒少许淡桂灰，专验飞贼腾挪隐踪！',
        subLabel: '戒律刑侦布防，开启【东厢古碑 · 掌吐梵音】子夜护碑',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_prep_mode', value: 'powder' },
          { type: 'startQuest', questId: SHAOLIN_Q26_QUEST_ID, stepId: 'guard_tang_stele' },
          setStep(SHAOLIN_Q26_QUEST_ID, 'guard_tang_stele'),
          openScene('scene_slq26_04', SHAOLIN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'slq26_prep_shadow',
        label: '【敛息潜伏藏经橱暗影】不留任何人造痕迹以免老贼起疑，纯以耳目静候三更！',
        subLabel: '沉静伏兵布防，开启【东厢古碑 · 掌吐梵音】子夜护碑',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_prep_mode', value: 'shadow' },
          { type: 'startQuest', questId: SHAOLIN_Q26_QUEST_ID, stepId: 'guard_tang_stele' },
          setStep(SHAOLIN_Q26_QUEST_ID, 'guard_tang_stele'),
          openScene('scene_slq26_04', SHAOLIN_Q26_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq26_04: {
    id: 'scene_slq26_04',
    title: '第四幕 · 廊影三疑 · 鉴伪识诡',
    subtitle: '东厢碑廊 · 子夜刑侦',
    mandatory: true,
    beats: [
      N('寒月高悬，更鼓敲过三更！院墙外忽起两声极轻微的夜枭啼鸣。你敛息隐于藏经橱阴影之中，片刻间却察觉月色碑廊里接连浮现出三处极不寻常的蹊跷——'),
      N('其一，唐碑正面不知何时竟已被贴上一张惨白宣纸，夜风拂过却没有正宗拓碑的浓稠白芨墨浆味，反倒隐隐散发出一股呛鼻的松脂油腥气！'),
      N('其二，西侧木窗外此刻正传来两道黑影刻意弄出的“咯吱”撬窗声与压低嗓音的催促，手中铁凿在月光下晃得格外显眼；'),
      N('其三，唐碑正上方那方雕花木构碑亭藻井里，万籁俱寂中竟悄无声息飘落下一撮极细的梁尘，{ifFlagEq:sl_q26_prep_mode=powder|正巧落进你事先撒下的桂灰暗痕旁，绝非夜风吹动！|笔直垂落向碑阴暗纹正上方！}电光火石间，你瞬息作出判断——'),
    ],
    choices: [
      {
        id: 'slq26_deduce_window',
        label: '“西窗外撬窗持凿的两人正是鬼手陈主力，碑面宣纸只是白日僧众遗留废纸，当即冲出西窗捉拿！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_trap_seen', value: false },
          { type: 'setFlag', flag: 'sl_q26_thief_spotted', value: true },
          openScene('scene_slq26_05', SHAOLIN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'slq26_deduce_coffer',
        label: '“西窗响动是声东击西，碑面松脂假拓片专为遮人耳目——真贼鬼手陈此刻正藏身碑亭藻井，伺机悬身拓印唐碑背面暗记！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_trap_seen', value: true },
          { type: 'setFlag', flag: 'sl_q26_thief_spotted', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_deduce_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q26_deduce_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq26_05', SHAOLIN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'slq26_deduce_door',
        label: '“碑面既已涂满松脂说明贼首早已拓完遁走，西窗响动是断后，须立刻冲向南门追截！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_trap_seen', value: false },
          { type: 'setFlag', flag: 'sl_q26_thief_spotted', value: true },
          openScene('scene_slq26_05', SHAOLIN_Q26_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq26_05: {
    id: 'scene_slq26_05',
    title: '第五幕 · 子夜碑廊 · 捉贼战术',
    subtitle: '东厢碑廊 · 决战鬼手陈（实战）',
    illustrationUrl: '/assets/quests/sl_26_corridor_night.jpg',
    illustrationCaption: '子夜碑廊 · 月色冷冽，盗拓飞贼首鬼手陈手执油蜡拓纸潜近唐代古碑，却被你当场现身喝破',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q26_trap_seen|你一眼洞穿其中玄机——正宗传拓须用白芨水与蝉翼宣，绝无涂松脂之理！那张假拓片意在诱你靠近拆纸中伏，西窗撬响意在调虎离山，真正的大鱼鬼手陈就倒悬在头顶碑亭藻井暗格里！|就在你心念微动之际，西窗“咔嚓”一声被撬开，一名手持铁凿的飞贼闪身扑入，而唐碑上方雕花藻井中亦骤然掠下一道瘦削如猴、十指泛青的诡异黑影——正是盗拓贼首【鬼手陈】！}'),
      N('鬼手陈手中已展开一张真正的油蜡薄拓纸与特制墨包，十指泛着骇人乌青寒气，显然兼修契丹玄阴功夫与淬毒暗针！'),
      S(SPEAKER_GHOST_HAND, '（察觉廊内有人，桀桀阴笑）“嘿嘿！少林戒律院果然留了后手！幸好外廊没明哨——兄弟们盯住退路，陈爷先料理了这小辈再拓唐碑！”'),
    ],
    choices: [
      {
        id: 'slq26_tactic_ambush',
        label: '【将计就计 · 守株待兔锁藻井】佯作巡窗实则反手封死藻井退路，撇开外围飞贼 1v1 生擒鬼手陈！',
        subLabel: '需先前勘破藻井假拓诡计或书法 ≥ 55 · 跳过接应飞贼，1v1 擒获失据鬼手陈（胜后禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          conditions: [
            { type: 'flag', flag: 'sl_q26_trap_seen', op: 'truthy' },
            { type: 'skillAtLeast', key: '书', min: 55 },
          ],
          hint: '需先前勘破松脂假拓片与藻井诡计，或书法 ≥ 55',
        },
        effects: [
          toast('你反手以掌风震落廊门铁闩截断外围接应，纵身直锁藻井死角！鬼手陈大惊失色，沦为瓮中之鳖！', 'success', '守株待兔'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q26_QUEST_ID,
            opponent: { kind: 'custom', npc: buildGhostHandTrappedBoss() },
            rule: 'story_trial',
            duelStakesTag: 'liao_spy_duel',
            forbidEscapeReason: '千年唐碑就在身畔，绝不能让鬼手陈毁碑遁逃！',
            introText: '【东厢碑廊 · 守株待兔】外围飞贼已被反锁廊外，1v1 生擒盗拓贼首【鬼手陈】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q26_tactic', value: 'ambush' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q26_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q26_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
                ],
              },
              openScene('scene_slq26_06', SHAOLIN_Q26_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些中了鬼手陈的毒针寒掌！调息后可再于【东厢碑廊 · 藏经橱】续战。', 'warn', '子夜护碑'),
            ],
          },
        ],
      },
      {
        id: 'slq26_tactic_patrol',
        label: '【正面巡廊围堵群贼】朗声喝破飞贼潜入，车轮连战接应飞贼铁凿刘与贼首鬼手陈！',
        subLabel: '零门槛正攻 · 车轮连战铁凿刘与全盛鬼手陈（胜后怒目杀业 +1）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q26_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCorridorLookout() },
            extraOpponents: [{ kind: 'custom', npc: buildGhostHandChenBoss() }],
            rule: 'story_trial',
            duelStakesTag: 'liao_spy_duel',
            forbidEscapeReason: '千年唐碑就在身畔，绝不能让辽探走狗得逞！',
            introText: '【东厢碑廊 · 车轮缉凶】连战接应飞贼【铁凿刘】与盗拓贼首【鬼手陈】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q26_tactic', value: 'patrol' },
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q26_combat_scored', op: 'falsy' },
                thenEffects: [
                  { type: 'setFlag', flag: 'sl_q26_combat_scored', value: true },
                  { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
                ],
              },
              openScene('scene_slq26_06', SHAOLIN_Q26_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('险些中了鬼手陈的毒针寒掌！调息后可再于【东厢碑廊 · 藏经橱】续战。', 'warn', '子夜护碑'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq26_06: {
    id: 'scene_slq26_06',
    title: '第六幕 · 一空到底 · 震印院墙',
    subtitle: '东厢碑廊 · 梵音破阴',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q26_tactic=ambush|退路被封、孤立无援，鬼手陈越战越慌；|你先震昏举凿飞贼、再独斗贼首，寸步不离唐碑三尺；}碑廊狭窄本不利于大开大合，却成了你施展正大佛门掌法的绝佳舞台，绵密柔劲将千年唐碑护得滴水不漏！'),
      N('激斗二十余合，鬼手陈契丹玄阴掌力渐竭、暗针尽被你大袖扫落，眼见讨不到便宜，虚晃一招纵身便欲翻越东厢红墙遁逃！'),
      P('（眼神一凝，右掌缓缓画圆旋即中宫平推而出）“既然来了少林，岂容你这辽探走狗说走就走？接我一式——【一空到底】！”'),
      N('“嗡——轰！！”宛若古钟梵音般的雄浑掌风瞬间跨越两丈，狠狠印在半空中的鬼手陈胸口！只听“砰”的一声巨响，鬼手陈整个人被柔劲硬生生震飞丈余，结结实实印在东厢青砖院墙之上，震落漫天墙灰后软软滑落在地！'),
    ],
    onFinishEffects: [openScene('scene_slq26_07', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_07: {
    id: 'scene_slq26_07',
    title: '第七幕 · 古碑无恙 · 审贼抉择',
    subtitle: '东厢碑廊 · 人赃并获',
    illustrationUrl: '/assets/quests/sl_26_stele_safe.jpg',
    illustrationCaption: '古碑无恙 · 灯笼火光映亮东厢碑廊，玄寂率戒律武僧赶至押走贼首，唐代《心经》古碑完好如初',
    mandatory: true,
    beats: [
      N('此时廊外灯火骤亮！玄寂率领十余名戒律武僧大步步入，见鬼手陈瘫软墙角、地上散落着辽国银票与盗拓油纸，而唐代《心经》古碑竟连半点划痕也无，众僧无不惊叹喝彩！'),
      S('NPC-0134', '（走近端详青砖院墙上清晰可见的淡淡掌印，抚须大笑）“好一式『一空到底』！将一流贼首震印院墙而不致死，既留活口又护唐碑分毫无损！{ifFlag:sl_q26_trap_seen|更难得一眼勘破松脂假拓与藻井埋伏，智勇兼备！|临阵沉着护碑生擒贼首，足见戒律真传胆识！}”'),
      N('武僧自鬼手陈贴身暗袋搜出一枚刻有契丹狼纹的青铜联络令牌，鬼手陈见铁证如山，哆嗦着供出辽国暗桩就藏在洛阳西市一家皮货行内。玄寂目光转向你，问你对此贼当如何发落——'),
    ],
    choices: [
      {
        id: 'slq26_verdict_official',
        label: '【顺藤摸瓜押交官府】留其全功口供连同辽国铜牌密呈河洛与开封官府，一举拔除辽探暗桩！',
        subLabel: '明正国法并追查辽国大局暗线（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_liao_clue', value: true },
          { type: 'setFlag', flag: 'sl_q26_verdict', value: 'official' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q26_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq26_08', SHAOLIN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'slq26_verdict_cripple',
        label: '【戒律重责废功严审】先以戒律院家法震废其鬼手毒功、地牢深审辽线后再交官发落！',
        subLabel: '以严刑峻法永断此贼盗拓害人之能（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q26_liao_clue', value: true },
          { type: 'setFlag', flag: 'sl_q26_verdict', value: 'cripple' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_verdict_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q26_verdict_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq26_08', SHAOLIN_Q26_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq26_08: {
    id: 'scene_slq26_08',
    title: '第八幕 · 审出辽线 · 河洛暗桩',
    subtitle: '东厢碑廊 · 暗潮伏笔',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q26_verdict=official|戒律武僧将鬼手陈与铁凿刘五花大绑押送下山移交官府；玄寂将那枚契丹联络铜牌与洛阳西市皮货行口供郑重封入密函，准备天明即送方丈院转呈朝廷。|玄寂颔首准行，当场震废鬼手陈双手阴毒经脉后押入戒律地牢连夜深审；鬼手陈扛不住剧痛，将洛阳西市皮货行联络暗号与辽国南院细作头目的行踪和盘托出！}'),
      S('NPC-0134', '（凝视手中青铜狼纹令牌，眉宇深锁）“辽人竟肯花三千两雪花银买一通唐碑背面的河洛暗道图记，绝非寻常盗宝！只怕北方胡骑与西夏一品堂正暗中图谋我中原腹地与少林古刹……”'),
      P('（肃然合十）“弟子定牢记洛阳西市这处辽线线索，日后若遇北疆风波，必不敢掉以轻心！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_09', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_09: {
    id: 'scene_slq26_09',
    title: '第九幕 · 碑前授谱 · 稽首受经',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('待众僧押囚退去，东厢碑廊重归清寂。玄寂复又领你回到唐代《心经》古碑前，自藏经橱暗格取出那卷装帧古朴的秘抄札记。'),
      S('NPC-0134', '{ifFlagEq:sl_branch=layman|“今夜护碑擒贼、审出辽线，居功至伟！虽依祖训禅门《般若掌》秘传不授俗家，但你观碑悟出的中锋正大之意已深植于心——来日戒律与护法绝艺《大力金刚指》，老衲与玄痛师兄定倾囊相授！”|“今夜一战，你已将『掌吐梵音、一空到底』的精髓融于实战！这卷《般若掌》全谱今日正式归你研习——望你日后以书养气、以经正心，护持少林千年法脉！”}'),
      P('（向玄寂师伯与唐代古碑深深一礼）“多谢玄寂师伯栽培！弟子经此碑前悟掌与子夜护碑，只觉书法笔意与佛门经义皆更上一层楼！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_10', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_10: {
    id: 'scene_slq26_10',
    title: '第十幕 · 桂影清秋 · 掌吐梵音',
    subtitle: '嵩山少林寺 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('夜风吹拂桂枝，清香悠远。月光静静洒在完好无损的唐代《心经》古碑之上，青石碑廊中似乎犹有低沉梵音回响。'),
      N('{ifFlagEq:sl_branch=layman|子夜护碑大功告成！依少林清规，《般若掌》禅门密传不授俗家，然玄寂大师盛赞你护碑奇功，并许你日后共参护寺刚猛绝艺《大力金刚指》。|子夜护碑大功告成！你已得《般若掌》真传，而戒律与护法之路上的更深考校，正静待着你去迎接。}'),
      P('（抚碑轻叹，眸光坚定）“护寺清门、守土安民——无论暗处藏着多少辽探奸徒，弟子皆以正大佛心破之！”'),
    ],
    choices: [
      {
        id: 'slq26_complete',
        label: '习得《般若掌》，圆满完成【东厢古碑 · 掌吐梵音】',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'branch',
            condition: { type: 'learnedArtAtLeast', artId: 'MA-043', minLevel: 1 },
            thenEffects: [],
            elseEffects: [{ type: 'teachMartialArt', artId: 'MA-043', level: 1 }],
          },
          {
            type: 'giveCombatExp',
            amount: 650,
            reason: '于东厢唐碑前习得《般若掌》，子夜识破诡计以「一空到底」震擒辽探盗拓飞贼首鬼手陈',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_trap_seen', op: 'truthy' },
            thenEffects: [
              { type: 'giveCombatExp', amount: 80, reason: '东厢碑廊勘破松脂假拓片与藻井声东击西之计' },
              { type: 'modifyRenown', delta: 25, reason: '明察秋毫识破辽探盗拓诡计，护全千年唐碑' },
            ],
            elseEffects: [],
          },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_Q26_QUEST_ID, outcome: 'completed' },
          toast(
            '【东厢古碑 · 掌吐梵音】圆满完成！习得《般若掌》，实战经验 +650、贡献 +220、书 +2、经义 +1、玄寂好感 +20！',
            'success',
            '掌吐梵音',
          ),
        ],
      },
      {
        id: 'slq26_complete_layman',
        label: '遵祖训不越佛门清规，领受护碑嘉奖圆满完成【东厢古碑 · 掌吐梵音】',
        subLabel: '俗家弟子依少林清规不授《般若掌》，改获额外实战历练',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          {
            type: 'giveCombatExp',
            amount: 850,
            reason: '子夜护全东厢唐代《心经》古碑，识破诡计擒拿辽探盗拓飞贼首鬼手陈',
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q26_trap_seen', op: 'truthy' },
            thenEffects: [
              { type: 'giveCombatExp', amount: 80, reason: '东厢碑廊勘破松脂假拓片与藻井声东击西之计' },
              { type: 'modifyRenown', delta: 25, reason: '明察秋毫识破辽探盗拓诡计，护全千年唐碑' },
            ],
            elseEffects: [],
          },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifySkill', key: '书', delta: 2 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0134' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_Q26_QUEST_ID, outcome: 'completed' },
          toast(
            '【东厢古碑 · 掌吐梵音】圆满完成！（俗家不授《般若掌》）实战经验 +850、贡献 +220、书 +2、经义 +1、玄寂好感 +20！',
            'success',
            '子夜护碑',
          ),
        ],
      },
    ],
  },
}
