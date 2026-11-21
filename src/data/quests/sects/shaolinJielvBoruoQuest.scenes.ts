import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
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
    talk: '“嘿嘿嘿，辽国贵人出三千两雪花银买这通唐碑的秘拓！小和尚识相的快滚一边去，莫逼陈爷用毒针寒掌送你上西天！”',
    stats: { hp: 3120, mp: 2220, agi: 78, res: 58 },
    talents: { bone: 84, comprehension: 86, charm: 48 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-076' },
    learnedArts: [{ artId: 'MA-243', level: 8 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-076', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq26_01: {
    id: 'scene_slq26_01',
    title: '第一幕 · 东厢碑影',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('{reignYear}仲秋，桂香满院。你拜入少林已满七载，奉「一拍神僧」玄寂师伯之命，来到大雄宝殿东侧静谧古雅的【东厢碑廊 · 藏经橱】。'),
      N('夕阳斜照入廊，将一通高达丈余的唐代青石古碑染成淡金。碑面镌刻着两百六十余字楷书《般若波罗蜜多心经》，笔力遒劲沉厚、宛若金石雷音；玄寂正负手立于碑前静静端详。'),
      P('（合十躬身）“弟子参见玄寂师伯！不知师伯召弟子来东厢碑廊，有何法谕？”'),
    ],
    onFinishEffects: [openScene('scene_slq26_02', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_02: {
    id: 'scene_slq26_02',
    title: '第二幕 · 唐碑传心',
    subtitle: '东厢碑廊 · 玄寂论碑',
    mandatory: true,
    beats: [
      S('NPC-0134', '（缓缓抚过碑面『照见五蕴皆空』六字，声沉如钟）“阿弥陀佛！师侄七载潜修，经义已逾七十四、书法亦逾五十五，且护寺有功。今日老衲唤你来此，正是要借这通唐代《心经》古碑，传你少林七十二绝技之《般若掌》！”'),
      P('（眼中一亮，细观碑文）“《般若掌》竟与这通唐代《心经》古碑有关？”'),
      S('NPC-0134', '（颔首微笑）“世人皆知老衲以《一拍两散掌》名震天下，却不知我少林掌法根基，全在《般若掌》一门。你细看这碑上字迹：起笔藏而不露，转折绵而不绝，收笔空而有力——这便是『掌吐梵音、一空到底』的无上心法！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_03', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_03: {
    id: 'scene_slq26_03',
    title: '第三幕 · 碑前示掌',
    subtitle: '东厢碑廊 · 掌吐梵音',
    illustrationUrl: '/assets/quests/sl_26_tang_stele.jpg',
    illustrationCaption: '东厢古碑 · 夕阳映照唐代《心经》古碑，玄寂于碑前示范《般若掌》，掌风过处竟如古钟梵音回荡',
    mandatory: true,
    beats: [
      N('玄寂缓步退后三步，面向唐碑平平推出一掌！掌势看似轻描淡写，然而掌风掠过碑面凹凸刻痕的刹那，竟激起一阵低沉浑厚的嗡鸣，宛若大殿青铜古钟低吟梵音，震得你心神一清！'),
      S('NPC-0134', '“听见了么？这便是《般若掌》的『梵音共振』！掌力不在蛮横，而在将浑厚佛门内息化作层层空明气浪，遇刚则化、遇邪则摧！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_04', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_04: {
    id: 'scene_slq26_04',
    title: '第四幕 · 悬腕运掌',
    subtitle: '东厢碑廊 · 以书证掌',
    mandatory: true,
    beats: [
      N('玄寂随即逐一为你拆解《般若掌》三十六式掌诀，尤其将压箱绝招「一空到底」的蓄势、吐纳、化实为空三层妙境倾囊相授。'),
      N('你依碑上楷书笔势默演掌法，果然觉得书法中的「中锋行笔」与《般若掌》的「中宫平推」如出一辙，不多时便已领悟七八分神韵！'),
    ],
    onFinishEffects: [teachArtNow('MA-043'), openScene('scene_slq26_05', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_05: {
    id: 'scene_slq26_05',
    title: '第五幕 · 碑阴秘辛',
    subtitle: '东厢碑廊 · 辽探垂涎',
    mandatory: true,
    beats: [
      N('授艺方罢，玄寂神色忽转凝重，引你绕至唐碑背面，指着碑阴几行被岁月风化得极淡的微雕梵文低声道：'),
      S('NPC-0134', '“师侄可知，这通唐碑背面除了佛偈，还暗刻着前朝高僧勘定的河洛山川暗道图记？近来戒律院截获密报，大辽细作竟重金买通了一名江湖一流盗拓飞贼首——人称【鬼手陈】的惯贼，欲于近日子夜潜入东厢碑廊强拓此碑，甚至打算得手后毁碑灭迹！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_06', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_06: {
    id: 'scene_slq26_06',
    title: '第六幕 · 诱贼入瓮',
    subtitle: '东厢碑廊 · 护碑之策',
    mandatory: true,
    beats: [
      S('NPC-0134', '“若大张旗鼓派百名武僧围守，反会打草惊蛇，让那鬼手陈藏匿暗处另寻他机。老衲打算故意撤走外廊明哨，由你今夜独自隐伏东厢碑廊守株待兔——既可将其人赃并获，又能以实战印证你方才习得的《般若掌》！”'),
      P('（拱手凛然）“辽探竟敢觊觎少林唐碑、收买飞贼夜闯佛门禁地，实在可恶！请玄寂师伯放心，弟子今夜定守住东厢古碑，叫那鬼手陈有来无回！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_07', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_07: {
    id: 'scene_slq26_07',
    title: '第七幕 · 暮色伏兵',
    subtitle: '东厢碑廊 · 静候子夜',
    mandatory: true,
    beats: [
      N('暮色渐沉，晚课钟声悠悠落定。玄寂叮嘱你万事小心后便悄然离去，东厢碑廊重归寂静。你敛息隐身于藏经橱阴影深处，如一尊石佛般静候子夜到来。'),
    ],
    onFinishEffects: [openScene('scene_slq26_08', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_08: {
    id: 'scene_slq26_08',
    title: '第八幕 · 子夜将至',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('寒月高悬，更鼓敲过三更！院墙之外忽然传来几声极轻微的夜枭啼鸣，紧接着几道黑影悄无声息翻越红墙，直扑东厢碑廊而来！'),
    ],
    choices: [
      {
        id: 'slq26_accept_guard',
        label: '敛息伏于藏经橱畔，开启【东厢古碑 · 掌吐梵音】子夜护碑之战',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q26_QUEST_ID, stepId: 'guard_tang_stele' },
          setStep(SHAOLIN_Q26_QUEST_ID, 'guard_tang_stele'),
          openScene('scene_slq26_10', SHAOLIN_Q26_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq26_09: {
    id: 'scene_slq26_09',
    title: '第九幕 · 廊影微动',
    subtitle: '东厢碑廊 · 暗影潜入',
    mandatory: true,
    beats: [
      N('月影横斜，碑廊青砖上浮现出几道鬼祟细长的影子，正蹑手蹑脚摸向唐代《心经》古碑！'),
    ],
    onFinishEffects: [openScene('scene_slq26_10', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_10: {
    id: 'scene_slq26_10',
    title: '第十幕 · 盗拓现形',
    subtitle: '东厢碑廊 · 鬼手陈露面',
    illustrationUrl: '/assets/quests/sl_26_corridor_night.jpg',
    illustrationCaption: '子夜碑廊 · 月色冷冽，盗拓飞贼首鬼手陈手执拓纸墨包潜近唐代古碑，却被你当场现身喝破',
    mandatory: true,
    beats: [
      N('三道黑衣身影敏捷掠入碑廊！为首一人身材瘦削如猴，十指修长泛青，手中已展开一张特制的油蜡拓纸与特制墨包，正准备往唐碑背面按去——正是辽探重金买通的盗拓飞贼首【鬼手陈】！'),
      P('（骤然自藏经橱阴影步出，朗声喝道）“阿弥陀佛！子夜三更不念佛经，却在少林东厢碑廊鬼鬼祟祟盗拓唐碑，鬼手陈，你的手伸得太长了！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_11', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_11: {
    id: 'scene_slq26_11',
    title: '第十一幕 · 贼首发难',
    subtitle: '东厢碑廊 · 暗器偷袭',
    mandatory: true,
    beats: [
      S(SPEAKER_GHOST_HAND, '（骇然一惊，旋即狞笑）“好个早有埋伏的秃驴！幸好只有你一个人！兄弟们，先毁了碑阴暗纹，老子来料理这小和尚！”'),
      N('话音未落，鬼手陈十指连弹，数道淬毒细针化作寒星直扑你双目，同时两名随行飞贼抄起铁凿猛砸向唐碑背面！'),
    ],
    onFinishEffects: [openScene('scene_slq26_12', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_12: {
    id: 'scene_slq26_12',
    title: '第十二幕 · 掌风护碑',
    subtitle: '东厢碑廊 · 震翻群贼',
    mandatory: true,
    beats: [
      N('你大袖一卷以雄浑内劲尽数扫落毒针，足踏《一苇渡江》瞬间掠至唐碑前，左右双掌齐发《般若掌》绵厚气浪！'),
      N('“砰！砰！”两名举凿飞贼尚未触及碑身，便被掌风震得口喷鲜血倒飞出去，撞翻廊柱晕死过去！'),
    ],
    onFinishEffects: [openScene('scene_slq26_13', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_13: {
    id: 'scene_slq26_13',
    title: '第十三幕 · 鬼手寒掌',
    subtitle: '东厢碑廊 · 贼首怒扑',
    mandatory: true,
    beats: [
      S(SPEAKER_GHOST_HAND, '（见手下瞬息覆灭，眼中凶芒大盛）“好俊的少林《般若掌》！难怪玄寂老儿敢让你独自守碑！既然走不脱，今日便拼个鱼死网破！”'),
      N('鬼手陈催动契丹玄阴吐纳诀，十指泛起骇人乌青寒气，身形如鬼魅般贴墙疾扑而来！'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q26_thief_spotted', value: true },
      openScene('scene_slq26_14', SHAOLIN_Q26_QUEST_ID),
    ],
  },

  scene_slq26_14: {
    id: 'scene_slq26_14',
    title: '第十四幕 · 碑廊夜战',
    subtitle: '东厢碑廊 · 决战鬼手陈',
    mandatory: true,
    beats: [
      N('月冷风寒，东厢碑廊方寸之间杀机四伏！一流中品盗拓飞贼首鬼手陈寒掌毒针齐发，立刻施展《般若掌》护住唐碑、将其生擒！'),
    ],
    choices: [
      {
        id: 'slq26_fight_ghost_hand',
        label: '护住唐代《心经》古碑，迎战盗拓飞贼首【鬼手陈】（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q26_QUEST_ID,
            opponent: { kind: 'custom', npc: buildGhostHandChenBoss() },
            rule: 'story_trial',
            duelStakesTag: 'liao_spy_duel',
            introText: '东厢碑廊子夜决战！鬼手陈身法诡滑、暗器阴毒，快以《般若掌》正大佛门掌力将其彻底制服！',
            onWin: [openScene('scene_slq26_15', SHAOLIN_Q26_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '险些中了鬼手陈的毒针寒掌！调息后可再于【东厢碑廊 · 藏经橱】续战鬼手陈。',
                'warn',
                '子夜护碑',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq26_15: {
    id: 'scene_slq26_15',
    title: '第十五幕 · 梵音破阴',
    subtitle: '东厢碑廊 · 掌势压制',
    mandatory: true,
    beats: [
      N('碑廊狭窄，本不利于大开大合，却恰恰成了你施展《般若掌》的最佳舞台！无论鬼手陈如何借廊柱腾挪偷袭，你的绵密掌风总如无形佛光将唐碑护得滴水不漏！'),
      N('激斗二十余合后，鬼手陈阴寒掌力渐竭，企图借虚招跃上院墙遁逃！'),
    ],
    onFinishEffects: [openScene('scene_slq26_16', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_16: {
    id: 'scene_slq26_16',
    title: '第十六幕 · 一空到底',
    subtitle: '东厢碑廊 · 震印院墙',
    mandatory: true,
    beats: [
      P('（眼神一凝，右掌缓缓画圆旋即平推而出）“既然来了少林，岂容你这辽探走狗说走就走？接我《般若掌》——【一空到底】！”'),
      N('“嗡——轰！！”浑厚梵音般的掌风瞬间跨越两丈距离，如一堵无形巨墙狠狠印在半空中的鬼手陈胸口！'),
      N('只听“砰”的一声巨响，鬼手陈整个人竟被雄浑柔劲硬生生震飞丈余，结结实实印在东厢青砖院墙之上，震落漫天墙灰，随后软软滑落在地，再也爬不起来！'),
    ],
    onFinishEffects: [openScene('scene_slq26_17', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_17: {
    id: 'scene_slq26_17',
    title: '第十七幕 · 唐碑无恙',
    subtitle: '东厢碑廊 · 人赃并获',
    illustrationUrl: '/assets/quests/sl_26_stele_safe.jpg',
    illustrationCaption: '古碑无恙 · 灯笼火光映亮东厢碑廊，玄寂率戒律武僧赶至押走贼首，唐代《心经》古碑完好如初',
    mandatory: true,
    beats: [
      N('此时廊外灯火骤亮！玄寂率领十余名戒律院武僧大步步入，见鬼手陈瘫软墙角、地上散落着辽国银票与盗拓油纸，而唐代《心经》古碑竟连半点划痕也无，众僧无不惊叹喝彩！'),
      S('NPC-0134', '（走近青砖院墙，端详墙上清晰可见的淡淡掌印，抚须大笑）“好一式『一空到底』！将一流中品贼首震印院墙而不致死，既留了审讯辽探的活口，又护得千年唐碑分毫无损！师侄之悟性，着实令老衲刮目相看！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_18', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_18: {
    id: 'scene_slq26_18',
    title: '第十八幕 · 审出辽线',
    subtitle: '东厢碑廊 · 顺藤摸瓜',
    mandatory: true,
    beats: [
      N('戒律武僧迅速将鬼手陈与两名同伙五花大绑押入戒律堂地牢。玄寂从鬼手陈怀中搜出一枚辽国暗探联络铜牌，神色肃然收起。'),
      S('NPC-0134', '“有了鬼手陈这个活口与这枚联络铜牌，方丈师兄便可密报开封府与河洛官府，一举拔除潜伏豫西的辽探暗桩！师侄此番护碑之功，实乃大功一件！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_19', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_19: {
    id: 'scene_slq26_19',
    title: '第十九幕 · 碑前授谱',
    subtitle: '东厢碑廊 · 般若真传',
    mandatory: true,
    beats: [
      N('待众僧押囚退去，玄寂复又领你回到唐代《心经》古碑前，从藏经橱暗格中取出一卷装帧古朴的《般若掌》真传全本交到你手中。'),
      S('NPC-0134', '“今夜一战，你已将『掌吐梵音、一空到底』的精髓融于实战。这卷《般若掌》全谱今日正式归你研习——望你日后以书养气、以经正心，护持少林千年法脉！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_20', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_20: {
    id: 'scene_slq26_20',
    title: '第二十幕 · 稽首受经',
    subtitle: '东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      P('（双手接过掌谱，向玄寂与唐代古碑深深一礼）“多谢玄寂师伯栽培！弟子经此碑前悟掌与子夜护碑，只觉书法笔意与佛门经义皆更上一层楼！”'),
    ],
    onFinishEffects: [openScene('scene_slq26_21', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_21: {
    id: 'scene_slq26_21',
    title: '第二十一幕 · 桂影清秋',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('夜风吹拂桂枝，清香悠远。月光静静洒在完好无损的唐代《心经》古碑之上，廊中似乎犹有低沉梵音回响。'),
    ],
    onFinishEffects: [openScene('scene_slq26_22', SHAOLIN_Q26_QUEST_ID)],
  },

  scene_slq26_22: {
    id: 'scene_slq26_22',
    title: '第二十二幕 · 掌吐梵音',
    subtitle: '嵩山少林寺 · 东厢碑廊 · 藏经橱',
    mandatory: true,
    beats: [
      N('子夜护碑大功告成！{ifFlag:sl_branch==layman|依少林清规，《般若掌》禅门密传不授俗家，然玄寂大师盛赞你护碑奇功，并许你日后共参护寺刚猛绝艺《大力金刚指》。|你已得《般若掌》真传！而戒律与护法之路上的更深考校，正静待着你去迎接。}'),
    ],
    choices: [
      {
        id: 'slq26_complete',
        label: '习得《般若掌》，圆满完成【东厢古碑 · 掌吐梵音】',
        tone: 'gold',
        condition: { type: 'flag', flag: 'sl_branch', op: 'neq', value: 'layman' },
        hideWhenUnavailable: true,
        effects: [
          { type: 'teachMartialArt', artId: 'MA-043', level: 1 },
          {
            type: 'giveCombatExp',
            amount: 650,
            reason: '于东厢唐碑前习得《般若掌》，子夜以「一空到底」震擒辽探盗拓飞贼首鬼手陈',
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
            reason: '子夜护全东厢唐代《心经》古碑，擒拿辽探盗拓飞贼首鬼手陈',
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
