import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q12_QUEST_ID } from './shaolinDamoXuanchengQuest'

const SPEAKER_MURONG_SCOUT_A: StorySpeakerSpec = {
  kind: 'custom',
  name: '姑苏暗探 · 柳青',
  title: '慕容氏夜行死士',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_MURONG_SCOUT_B: StorySpeakerSpec = {
  kind: 'custom',
  name: '姑苏暗探 · 燕回',
  title: '慕容氏夜行死士',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_YAN_YINGKE: StorySpeakerSpec = {
  kind: 'custom',
  name: '燕影客',
  title: '姑苏慕容暗探首',
  factionName: '姑苏慕容氏',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
}

const SPEAKER_INNER_DEMON: StorySpeakerSpec = {
  kind: 'custom',
  name: '七十二障 · 心魔幻身',
  title: '寒玉照心幻象',
  factionName: '心海魔障',
  portraitUrl: '/assets/characters/templates/tpl_shaolin_monk_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_shaolin_monk_av.jpg',
}

function buildMurongScoutA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ12_SCOUT_A',
    name: '姑苏暗探 · 柳青',
    title: '慕容氏夜行死士',
    realm: '二流中品',
    factionName: '姑苏慕容氏',
    sectRank: 2,
    sectRankLabel: '慕容暗探',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“少林小僧坏我大事，留你不得！看慕容剑法！”',
    stats: { hp: 1420, mp: 880, agi: 55, res: 33 },
    talents: { bone: 68, comprehension: 70, charm: 56 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-130', move2: 'MA-148' },
    learnedArts: [{ artId: 'MA-121', level: 6 }, { artId: 'MA-130', level: 5 }, { artId: 'MA-148', level: 5 }],
  })
}

function buildMurongScoutB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ12_SCOUT_B',
    name: '姑苏暗探 · 燕回',
    title: '慕容氏夜行死士',
    realm: '二流中品',
    factionName: '姑苏慕容氏',
    sectRank: 2,
    sectRankLabel: '慕容暗探',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“柳兄拖住他正面，我去寒玉榻上取玄澄那卷手札！”',
    stats: { hp: 1380, mp: 860, agi: 57, res: 32 },
    talents: { bone: 66, comprehension: 72, charm: 54 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-130', move2: 'MA-155' },
    learnedArts: [{ artId: 'MA-121', level: 6 }, { artId: 'MA-130', level: 5 }, { artId: 'MA-155', level: 5 }],
  })
}

function buildYanYingkeBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ12_YAN_YINGKE',
    name: '燕影客',
    title: '姑苏慕容暗探首',
    realm: '一流下品',
    factionName: '姑苏慕容氏',
    sectRank: 3,
    sectRankLabel: '慕容暗探首',
    avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
    talk: '“能在我姑苏慕容氏的『以彼之道、还施彼身』下撑过十招，这小和尚倒真有几分玄澄当年的影子——可惜今夜你必须死在这里！”',
    stats: { hp: 2420, mp: 1680, agi: 72, res: 49 },
    talents: { bone: 84, comprehension: 88, charm: 74 },
    equippedArts: { neigong: 'MA-221', move1: 'MA-071', move2: 'MA-025' },
    learnedArts: [{ artId: 'MA-221', level: 8 }, { artId: 'MA-071', level: 8 }, { artId: 'MA-025', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq12_01: {
    id: 'scene_slq12_01',
    title: '第一幕 · 幽谷寒玉',
    subtitle: '达摩院 · 幽谷石室寒玉榻',
    mandatory: true,
    beats: [
      N('{reignYear}冬雪初降，嵩山幽谷寒意彻骨。你在少林达摩院潜修日久，今日奉玄慈方丈与玄难首座密谕，首度踏入达摩院最深处的禁地——幽谷石室。狭长石道尽头长明青灯摇曳，石室正中陈设着一张白雾缭绕的千年寒玉榻。'),
      N('榻上盘坐着一名须发皆白、枯瘦如槁木的老僧，周身经脉寸断、四肢早已瘫痪，唯有一双深邃眸子如寒潭秋水，静静映出洞中灯火——正是少林两百年来第一武学奇才、神僧【玄澄】！'),
      S('NPC-0127', '（躬身引荐）“玄澄师兄，这便是修成《伏魔剑》《散花掌》《拈花指》的那名达摩院弟子。方丈特命他来此侍奉师兄、誊录经卷，并亲聆师兄教诲。”'),
      S('NPC-0109', '（声音极轻，却清越如玉磐敲击）“阿弥陀佛……玄难师弟先回殿理事吧。孩子，且近前坐上寒玉石蒲团，让老衲瞧瞧你修习多门绝艺之后，灵台深处可曾积下戾气。”'),
    ],
    onFinishEffects: [openScene('scene_slq12_02', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_02: {
    id: 'scene_slq12_02',
    title: '第二幕 · 七十二障',
    subtitle: '幽谷石室 · 寒玉榻',
    illustrationUrl: '/assets/quests/sl_12_cold_jade_bed.jpg',
    illustrationCaption: '寒玉问禅 · 幽谷石室长明灯下，瘫痪神僧玄澄剖白七十二障秘辛',
    mandatory: true,
    beats: [
      S('NPC-0109', '“世人皆惜老衲一夜筋脉尽废，却不知老衲卧此寒玉榻十余载，才真正参透少林七十二绝技最大的忌讳——『武学障』。每一门绝技杀伐皆重，每多练一门，心中便多添一分暴戾！”'),
      S('NPC-0109', '“昔年老衲恃才傲物，三十年间强练十三门绝技，却轻忽诵经修禅、未以大慈大悲佛法化去招中戾气。那一夜十三股绝技真气同时在膻中百会冲撞炸裂，若非寒玉护住心脉，早已化作枯骨。”'),
      N('玄澄以眼神示意榻畔一只黑漆木匣——内中静躺着一册蝇头小楷写就的《十三绝技武学障手札》，录尽十三门绝技破绽与化障心法。'),
      S('NPC-0109', '“今夜替老衲誊完《妙法莲华经》之前，先闭目凝神借寒玉冷气自照识海！你已连修三门达摩绝艺，能否勘破心中潜伏的『贪求绝技之障』，便在此一念之间！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_03', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_03: {
    id: 'scene_slq12_03',
    title: '第三幕 · 心魔初现 · 绝艺幻影',
    subtitle: '寒玉问禅 · 破障第一重',
    mandatory: true,
    beats: [
      N('你盘膝坐于寒玉石蒲团之上，刺骨寒流顺涌泉直贯灵台。刹那间长明青灯化作漫天金光，石壁浮现出无数气势滔天的绝技虚影——大金刚拳、无相劫指、般若掌、龙爪手……七十二门无上秘籍如狂潮涌入识海，低语诱惑着「尽纳于身，天下无敌」！'),
      N('往日历练的因果旧影亦在心海翻涌：{ifFlag:sl_q09_hanli_spared|剑痕崖折剑放生韩厉的那一念慈悲，化作一缕清泉试图平息剑意锋芒；|剑痕崖震腕废敌时的凌厉杀意，瞬间如烈火烹油般窜上心头；} {ifFlag:sl_q11_debate_master|大雄正殿连破两道公案时的澄明禅心，则如一盏古佛孤灯，在绝艺狂澜中稳稳摇曳。|大雄正殿与吐蕃护法争胜时的好强执念，则悄然化作炽热心火，催你再求更高绝艺。}'),
      N('十三股仿若实质的绝技戾气自四面八方压顶而来，直冲膻中大穴！眼看心神将被贪求神功的幻影吞没，你决意如何应对这第一重心魔？'),
    ],
    choices: [
      {
        id: 'slq12_trial1_empty',
        label: '【舍执入空】默诵《法华》慈悲经文，主动散去绝技贪念、借佛法化去戾气',
        subLabel: '宁舍满壁神功幻影而守本心清明（禅心慈悲 +2）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q12_trial1_clear', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_trial1_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q12_trial1_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
            ],
          },
          openScene('scene_slq12_04', SHAOLIN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'slq12_trial1_force',
        label: '【以强压魔】运转全身真气强行吞纳绝艺幻影，以傲骨雄心硬压心魔戾气！',
        subLabel: '威势骤增却心火微炽，种下武学执念（怒目杀业 +2）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q12_trial1_clear', value: false },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_trial1_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q12_trial1_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 2 },
            ],
          },
          openScene('scene_slq12_04', SHAOLIN_Q12_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq12_04: {
    id: 'scene_slq12_04',
    title: '第四幕 · 心魔再问 · 渡世之辩',
    subtitle: '寒玉问禅 · 破障第二重',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q12_trial1_clear|满壁金色秘籍幻影在柔和梵音中寸寸化作漫天雪尘，然而寒雾深处却骤然凝出一尊与你面容无二、双目却赤红如焰的心魔幻身！|你以强横真气硬生生将绝技幻影吞压入丹田，虽未当场走火，丹田却如吞炭火灼热难安！炽烈心火化作一尊与你面容无二、双目赤红的心魔幻身直逼眼前！}'),
      S(SPEAKER_INNER_DEMON, '（冷笑震彻识海，字字诛心）“别装什么大慈大悲了！少林七十二绝技本就是天下第一杀伐利器！遇上星宿妖毒、雪域铁掌、江南刺客，靠几卷发黄的经书能保住谁的性命？武道极致，究竟是『无我无执』，还是『唯我独尊』？”'),
      N('寒玉冷气与心海烈焰在眉心方寸激烈对撞，这一答，将彻底定你能否勘破「七十二障」——'),
    ],
    choices: [
      {
        id: 'slq12_trial2_zen',
        label: '“绝技为舟，慈悲为鞘——若无佛法化戾，神功越绝反噬越烈；唯破我执，方得大自在！”',
        tone: 'default',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_trial1_clear', op: 'truthy' },
            thenEffects: [{ type: 'setFlag', flag: 'sl_q12_mind_clear', value: true }],
            elseEffects: [{ type: 'setFlag', flag: 'sl_q12_mind_clear', value: false }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_trial2_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q12_trial2_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq12_05', SHAOLIN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'slq12_trial2_power',
        label: '“乱世浊恶，慈悲须以绝顶武力为骨——纵负心火，亦当穷尽七十二绝技登峰造极！”',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q12_mind_clear', value: false },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_trial2_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q12_trial2_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq12_05', SHAOLIN_Q12_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq12_05: {
    id: 'scene_slq12_05',
    title: '第五幕 · 三更风异',
    subtitle: '幽谷石室 · 寒玉榻',
    mandatory: true,
    beats: [
      N('你缓缓睁开双眼，寒玉石室重归寂静，洞外风雪呼啸拍打崖壁。寒玉榻上玄澄神僧静静凝视你眉宇气色，轻轻颔首。'),
      S('NPC-0109', '{ifFlag:sl_q12_mind_clear|（眼中绽出久违的欣慰清光）“善哉！两重心魔考校而灵台澄明如琉璃，不沾半分贪戾——你今日已摸到了破除『武学障』的门槛！”|（轻叹一声，语调苍凉而温和）“你虽压下心魔幻象，眉间却仍锁着一缕炽烈锐气……老衲当年亦是如此。日后勤诵佛经、切勿自恃武功高强而轻忽修心。”}'),
      N('你于石案前秉烛替玄澄誊录《妙法莲华经》，转眼已至三更，榻上玄澄呼吸绵长沉沉入睡。忽然你握笔之手微微一顿——洞口寒风吹入的节奏短促了半分，风中更夹杂着一丝绝非嵩山松雪的江南沉水冷香！'),
      P('（心头警兆骤生，悄然放下狼毫反手护住黑漆木匣，目光如电射向幽暗石道）“有人潜入达摩院禁地了！”'),
    ],
    choices: [
      {
        id: 'slq12_stand_guard',
        label: '悄然熄去外侧油灯，守住寒玉榻前暗查来敌！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q12_QUEST_ID, stepId: 'guard_cold_jade_cave' },
          setStep(SHAOLIN_Q12_QUEST_ID, 'guard_cold_jade_cave'),
          toast('已开启《寒玉问禅 · 七十二障》！三更慕容暗探将至，请死守寒玉榻！', 'talk', '寒玉问禅'),
        ],
      },
    ],
  },

  scene_slq12_06: {
    id: 'scene_slq12_06',
    title: '第六幕 · 暗影偷袭',
    subtitle: '幽谷石室狭道（古洞破袭）',
    mandatory: true,
    beats: [
      N('“嗤——嗤——”两缕细不可闻的迷烟自石道拐角悄然飘入，被你袖袍一卷《散花掌》柔风尽数逼回！紧接着石道尽头传来两道极轻的衣袂擦石声——姑苏慕容氏夜行死士柳青、燕回已持剑摸至洞口！'),
      S(SPEAKER_MURONG_SCOUT_A, '（低喝一声，蒙面下杀意毕露）“洞里竟有守夜小僧！燕回，拖住他正面，取了玄澄的十三绝技手札立刻撤离！”'),
      N('不仅如此，洞顶石梁幽暗处更隐隐传来一丝令人毛骨悚然的凌厉寒意——显然外围双探之后，还潜伏着更可怕的高手！寒玉榻就在身后半步，狭洞生死一瞬，你决意如何破局？'),
    ],
    choices: [
      {
        id: 'slq12_ambush_listen',
        label: '【禅定听风先机截杀】听辨暗哨吐纳破绽，抢先隔空拈花封穴制住外围双探！',
        subLabel: '跳过柳青、燕回偷袭，保存真气直面洞顶暗探首燕影客 1v1',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需寒玉问禅彻底破障明心，或先天【悟性】≥ 72',
          conditions: [
            { type: 'flag', flag: 'sl_q12_mind_clear', op: 'truthy' },
            { type: 'talentAtLeast', key: '悟性', min: 72 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q12_scouts_cleared', value: true },
          { type: 'setFlag', flag: 'sl_q12_ambush_tactic', value: 'listen' },
          openScene('scene_slq12_07', SHAOLIN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'slq12_ambush_direct',
        label: '【剑指齐发正面护洞】寸步不退守在寒玉榻前，车轮连破姑苏双探！',
        subLabel: '车轮连战姑苏暗探柳青与燕回（二流中品 × 2）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildMurongScoutA() },
            extraOpponents: [{ kind: 'custom', npc: buildMurongScoutB() }],
            rule: 'story_trial',
            forbidEscapeReason: '玄澄师伯瘫痪榻上，绝不可退后半步！',
            introText: '【车轮连战 · 狭洞护师】迎战潜入石室的姑苏慕容暗探【柳青】与【燕回】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              { type: 'setFlag', flag: 'sl_q12_scouts_cleared', value: true },
              { type: 'setFlag', flag: 'sl_q12_ambush_tactic', value: 'direct' },
              openScene('scene_slq12_07', SHAOLIN_Q12_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('狭洞之内双剑夹攻凶险，重整禅息再护寒玉榻！', 'warn', '寒玉问禅'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq12_07: {
    id: 'scene_slq12_07',
    title: '第七幕 · 燕影现身',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q12_ambush_tactic=listen|你闭目听风，瞬息听辨出石道暗影中两道极细微的换气破绽！身形未动而右指先弹，两缕《拈花指》柔劲穿雾破空，精准封死柳青与燕回肩井、曲池大穴，二探连剑都未及递出便齐齐软倒石道！|狭洞内剑影暗器交织如雨！你寸步不离寒玉榻前，以《散花掌》卸开柳青急剑、挥袖扫落燕回毒镖，反手一记《拈花指》点中燕回腕脉，借力将二探震撞石壁吐血昏死！}'),
      S(SPEAKER_MURONG_SCOUT_B, '（跌坐石道动弹不得，骇然失声）“怎么可能……连我们的呼吸破绽都被他看穿了……”'),
      N('话音未落，头顶幽暗石梁忽传来三声低沉冰冷的掌声！一道修长如鬼魅的青灰身影飘然落地竟无半分声响，面覆寒铁半面具，周身散发着令人窒息的一流高手威压！'),
      S('NPC-0109', '（寒玉榻上玄澄早已惊醒，目光如电盯着黑衣首领）“身法如燕掠寒潭、指间隐含参合剑气……阁下莫非是江南姑苏慕容氏座下暗探首领？”'),
      S(SPEAKER_YAN_YINGKE, '（微微欠身，语调优雅却杀机四溢）“神僧好眼力。在下燕影客，奉主上之命遍搜天下武学秘录。神僧既已身废，何不将《十三绝技武学障手札》赠予我姑苏还施水阁？小和尚若敢螳臂当车，今夜便让你尝尝『以彼之道，还施彼身』的滋味！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_08', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_08: {
    id: 'scene_slq12_08',
    title: '第八幕 · 狭洞死战',
    subtitle: '幽谷石室终战（1v1 一流下品燕影客）',
    illustrationUrl: '/assets/quests/sl_12_cave_assassin.jpg',
    illustrationCaption: '狭洞死战 · 幽暗石室中独挡一流下品慕容暗探首燕影客，寸步不退',
    mandatory: true,
    beats: [
      N('燕影客身形骤化三道虚影！右手慕容家传长剑如灵蛇吐信，左手食指悄然弹出凌厉无匹的「参合指」气，竟连你方才施展的少林《拈花指》柔劲都临场仿出七八分！一流下品的恐怖气浪充斥狭洞，吹得青油灯明灭不定！'),
      S('NPC-0109', '（榻上玄澄忽以清越禅音点拨）“孩子莫慌！他虽善借力打力、仿人招式，却只得其形而无佛门慈悲禅心！守住本心，以伏魔之正、散花之圆、拈花之透三势合一，破他借力之隙！”'),
      N('玄澄一语如当头棒喝！绝壁悟剑、洛水散花、灵山拈花、寒玉破障历历在目——你双目澄明如古佛拈花，心中再无半丝惧意！'),
      P('（横身死守寒玉榻前，声震石室）“招式可仿，禅心难偷！燕影客，想要玄澄师伯手札，先踏过小僧尸身！”'),
    ],
    choices: [
      {
        id: 'slq12_fight_yanyingke',
        label: '以达摩院所学禅武合一，死战姑苏慕容暗探首「燕影客」！（1v1 生死战）',
        subLabel: '一流下品强敌 · 护卫寒玉榻神僧玄澄与绝技手札',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q12_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYanYingkeBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '寒玉榻就在身后半步，死战护师，绝无退路！',
            introText: '【1v1 狭洞生死战】迎战姑苏慕容暗探首【燕影客】（一流下品）！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq12_09', SHAOLIN_Q12_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('燕影客一流修为诡谲霸道！稳住禅心再思玄澄师伯点拨，重新迎战！', 'warn', '寒玉问禅'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq12_09: {
    id: 'scene_slq12_09',
    title: '第九幕 · 破影还禅',
    subtitle: '幽谷石室 · 寒玉榻前',
    mandatory: true,
    beats: [
      N('狭洞内劲气激荡、碎石簌簌坠落！激战五十余合，你左臂僧袍已被参合指气划破渗血，双足却似生根般牢牢钉在寒玉榻前，寸步未移！'),
      N('燕影客久战不下，恐惊动寺中长老，猛然使出绝杀「参合剑雨」直取你心口，更暗运慕容家传借力劲气，等着借你反击之刚猛力道一举震碎你心脉！电光火石间你彻底洞彻「无障无执」之境——不发半分刚戾死力，纯以《散花掌》圆涡卸剑，指尖轻吐《拈花指》柔劲直入其借力中枢！'),
      N('“哇——！”燕影客借力落空反遭柔和禅劲直透膻中，喷出一口鲜血，脸上寒铁面具竟被指风震裂半边，踉跄撞在石壁之上！'),
      S(SPEAKER_YAN_YINGKE, '（骇然失色，死死盯着浴尘而眼神澄净的你）“怎么可能……我明明算准你的后劲，为何你招中竟无半点刚戾可借？！少林达摩院……竟又出了一个破障奇才！”'),
      N('此时洞外钟鼓齐鸣、数道凌厉破风声急速逼近！燕影客自知大势已去，咬牙掷出一枚烟雷，抓起昏迷的柳青与燕回化作一缕黑烟仓皇遁入风雪深谷！'),
    ],
    onFinishEffects: [openScene('scene_slq12_10', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_10: {
    id: 'scene_slq12_10',
    title: '第十幕 · 联袂举荐',
    subtitle: '幽谷石室 · 黎明破晓',
    mandatory: true,
    beats: [
      N('硝烟散尽，你强忍左臂隐痛第一时间回身护问玄澄安危与手札无恙。寒玉榻上，这位十余载心如枯井的少林神僧浑浊老眼中竟滚落两行热泪，声音微颤却无比欣慰。'),
      S('NPC-0109', '“好孩子……老衲无恙。你以二流之躯独抗一流绝世刺客，更在绝境中真正化去招中戾气，令慕容氏无力可借！老衲苦求三十年未破之『武学障』，今夜终于在你身上见到了破障曙光！”'),
      N('未过片刻，玄慈方丈与玄难首座亲率戒律武僧疾步赶至！见洞中满地碎石、半片寒铁面具与完好无损的木匣手札，两位宗师无不动容，玄难急忙上前为你点穴止血。'),
      S('NPC-0109', '（目光灼灼望向玄慈方丈，朗声开口）“方丈师兄，此子禅经通明、书棋辩才俱佳，既能文辩退番僧，更能于绝境破障击退一流暗探。老衲愿以残躯之名，与玄难师弟联袂举荐——晋升此子为我嵩山少林寺【真传弟子】！”'),
      S('NPC-0127', '（玄难首座郑重合十附议）“老衲附议！达摩院一脉，当以此子为真传翘楚！”'),
    ],
    onFinishEffects: [openScene('scene_slq12_11', SHAOLIN_Q12_QUEST_ID)],
  },

  scene_slq12_11: {
    id: 'scene_slq12_11',
    title: '第十一幕 · 达摩真传',
    subtitle: '幽谷石室 · 寒玉榻（真传立誓）',
    illustrationUrl: '/assets/quests/sl_12_damo_zhenchuan.jpg',
    illustrationCaption: '达摩真传 · 黎明幽谷石室中，玄慈宣谕晋升少林真传弟子，玄澄玄难欣慰颔首',
    mandatory: true,
    beats: [
      N('晨光透过幽谷崖隙斜照石室，正落在你带尘却笔挺的僧袍之上。玄慈方丈欣然宣谕，亲手捧出少林真传弟子紫金度牒，玄澄神僧亦将《十三绝技武学障手札》的化障总纲口授于你。'),
      S('NPC-0112', '（声震石室，慈和而威严）“玄澄、玄难二位师弟联袂举荐，老衲准奏！自今日起，晋升尔为嵩山少林寺【真传弟子】，准入藏经阁深院参悟少林无上禅武！”'),
      S('NPC-0112', '“既登达摩院真传之位，将来必当直面更深邃的七十二绝技与更险恶的天下风波。在三老之前，请立下你此生的达摩真传誓言——”'),
    ],
    choices: [
      {
        id: 'slq12_oath_compassion',
        label: '【以禅化武度众生】永记武学障之戒，以无边慈悲佛法化解兵戈戾气、济度十方！',
        subLabel: '达摩禅心大乘之道（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q12_oath', value: 'compassion' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          openScene('scene_slq12_12', SHAOLIN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'slq12_oath_guardian',
        label: '【穷研绝艺护法统】穷究古刹七十二绝艺之极境，以铁肩禅锋护持少林千年法统！',
        subLabel: '金刚护法大雄之道（怒目杀业 +1）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q12_oath', value: 'guardian' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq12_12', SHAOLIN_Q12_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq12_12: {
    id: 'scene_slq12_12',
    title: '第十二幕 · 破障新途',
    subtitle: '达摩院 · 嵩山晴雪',
    mandatory: true,
    beats: [
      S('NPC-0109', '{ifFlagEq:sl_q12_oath=compassion|（含笑合十，神色如释重负）“以禅化武度众生……好！有此一誓，七十二绝技在你手中必成大慈悲法器，绝不再成魔障！”|}{ifFlagEq:sl_q12_oath=guardian|（凝视良久，肃然颔首）“穷研绝艺护法统，壮志可嘉！只是切莫忘今夜寒玉榻前所见——武功愈高，佛法愈须深沉！”|}'),
      N('你面向玄慈、玄难、玄澄三位玄字辈宗师郑重叩首，双手接过沉甸甸的真传紫金度牒。'),
      N('步出幽谷石室时，嵩山一夜风雪已歇，万峰银装素裹，朝阳正自少室峰东麓喷薄而出。'),
      N('自初入山门杂役、木桩大考分脉、剑痕崖伏魔、洛水画舫破幻、大雄正殿拈花，再到今夜寒玉问禅破障——你已正式跻身嵩山少林寺【真传弟子】之列，藏经阁的无上禅武与更广阔的江湖风云，正于前方徐徐展开！'),
    ],
    choices: [
      {
        id: 'slq12_complete',
        label: '合十礼佛，正式晋升嵩山少林寺【Lv.3 真传弟子】！',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-01', rank: 3, promoteOnly: true },
          { type: 'giveCombatExp', amount: 550, reason: '寒玉石室问禅破障并死战击溃姑苏慕容暗探首' },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifyRenown', delta: 80, reason: '护卫神僧玄澄击溃慕容暗探并晋升少林真传弟子' },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifySkill', key: '书', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q12_mind_clear', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0109' }, delta: 20 },
          { type: 'completeQuest', questId: SHAOLIN_Q12_QUEST_ID, outcome: 'completed' },
          toast('已完成《寒玉问禅 · 七十二障》，正式晋升嵩山少林寺【Lv.3 真传弟子】！', 'success', '达摩真传'),
        ],
      },
    ],
  },
}
