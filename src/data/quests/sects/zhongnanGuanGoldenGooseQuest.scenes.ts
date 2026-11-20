import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q05_QUEST_ID } from './zhongnanGuanGoldenGooseQuest'

const SPEAKER_SONG_SCOUT: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵铁柱',
  title: '秦凤路大宋边军斥候',
  factionName: '大宋边军',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
}

const SPEAKER_XIXIA_BLADE1: StorySpeakerSpec = {
  kind: 'custom',
  name: '野利赤',
  title: '西夏一品堂游骑刀客',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildXixiaBlade1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q05_XIXIA_BLADE1',
    name: '野利赤',
    title: '西夏一品堂游骑刀客',
    realm: '二流下品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“宋狗斥候的命我们要定了！终南牛鼻子敢多管闲事，一并剁了！”',
    stats: { hp: 960, mp: 420, agi: 42, res: 22 },
    talents: { bone: 62, comprehension: 54, charm: 38 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 5 },
      { artId: 'MA-184', level: 5 },
    ],
  })
}

function buildXixiaBlade2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q05_XIXIA_BLADE2',
    name: '没藏浑',
    title: '西夏一品堂暗杀刀手',
    realm: '三流上品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“速战速决，莫让军报传进长安城！”',
    stats: { hp: 820, mp: 340, agi: 40, res: 20 },
    talents: { bone: 58, comprehension: 50, charm: 36 },
    equippedArts: { neigong: 'MA-180', move1: 'MA-184' },
    learnedArts: [{ artId: 'MA-180', level: 4 }, { artId: 'MA-184', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q05_01: {
    id: 'scene_zn_q05_01',
    title: '第一幕 · 飞瀑听风',
    subtitle: '终南后山寒玉涧 · 银练飞瀑',
    illustrationUrl: '/assets/quests/zn_q05_cliff_goose.jpg',
    illustrationCaption: '太白金雁 · 玉阳子王处阳踏松凌虚，白雁掠过银练飞瀑',
    mandatory: true,
    beats: [
      N('{reignYear}盛夏，银练飞瀑奔腾如玉龙垂空，水汽在骄阳下化作一道七彩虹霓。绝壁半腰一株横生古松之上，玉阳子王处阳正负手独立，道袍在狂风中纹丝不乱。'),
      S('NPC-1057', '（见你走近石茗案，纵身一跃竟如金雁滑翔般轻飘飘落于石坪，足下水花不溅半滴）“弘毅说你三才归元剑已得神髓。今日便来瞧瞧，你可接得住我终南轻功第一绝——《金雁功》！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_02', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_02: {
    id: 'scene_zn_q05_02',
    title: '第二幕 · 雁行虚空',
    subtitle: '银练飞瀑 · 轻功要诀',
    mandatory: true,
    beats: [
      S('NPC-1057', '（指着天际掠过太白山巅的雁阵）“寻常轻功只知拼命提气纵跳，气竭则坠；我全真《金雁功》却法效鸿雁乘风——一提丹田气，二借山风力，足尖在绝壁苔石上借力折转，纵是百丈深渊亦如履平地！”'),
      P('“原来关键不在硬提蛮气，而在顺风借势、空中换气！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_03', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_03: {
    id: 'scene_zn_q05_03',
    title: '第三幕 · 踏石渡涧',
    subtitle: '银练飞瀑 · 初试身法',
    mandatory: true,
    beats: [
      N('你依王处阳指点，将《全真大道筑基歌》真气聚于涌泉穴，足尖轻点湿滑青石，身形骤然拔起两丈，衣袂猎猎作响！'),
      S('NPC-1057', '“好！空中左足虚点右足背，借势再拔三尺——莫怕跌落，师兄在此托着你！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_04', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_04: {
    id: 'scene_zn_q05_04',
    title: '第四幕 · 绝壁折返',
    subtitle: '银练飞瀑 · 习得金雁功',
    mandatory: true,
    beats: [
      N('你在瀑布飞沫中接连踏壁三次，身形如展翅金雁般优雅划过水帘，稳稳落回青石茗案之旁！'),
      S('NPC-1057', '（抚掌大笑）“妙极！《金雁功》精要你已尽数领悟！勤加演练，日后纵是千军万马之中亦能来去自如！”'),
    ],
    choices: [
      {
        id: 'zn_q05_learn_jinyan',
        label: '收势调息 · 习得良品轻功《金雁功》',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-119', level: 1, autoEquip: true },
          openScene('scene_zn_q05_05', ZHONGNAN_Q05_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q05_05: {
    id: 'scene_zn_q05_05',
    title: '第五幕 · 崖下惊变',
    subtitle: '银练飞瀑 · 忽闻惨呼',
    mandatory: true,
    beats: [
      N('二人正待品茗歇息，忽听下方数十丈外的子午谷悬崖小道上传来一阵急促马蹄声与凄厉呼救！'),
      N('你俯身崖畔下望，只见一匹浑身带箭的军马倒毙路旁，一名身着大宋边军皮甲的年轻斥候满脸是血，正死死抱着竹筒踉跄狂奔，身后两名披着党项毡袍、手持雪亮弯刀的西夏杀手紧追不舍！'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_06', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_06: {
    id: 'scene_zn_q05_06',
    title: '第六幕 · 西夏刀客',
    subtitle: '绝壁之上 · 急谋救援',
    mandatory: true,
    beats: [
      S('NPC-1057', '（双目寒芒一闪）“那是秦凤路大宋边军的斥候！西夏一品堂的暗杀刀手竟已摸进终南山脚！”'),
      P('“若绕山道下谷，那斥候早已丧命刀下！弟子刚习成《金雁功》，愿凌空下崖救人！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_07', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_07: {
    id: 'scene_zn_q05_07',
    title: '第七幕 · 凌虚直下',
    subtitle: '绝壁悬崖 · 师兄嘱托',
    mandatory: true,
    beats: [
      S('NPC-1057', '“好胆色！你先行凌空下崖截住那两名刀客，我绕上高崖警戒，防备谷口还有西夏弓手伏兵！切记以《金雁功》避其锐气，以《三才归元剑》破其弯刀！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_08', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_08: {
    id: 'scene_zn_q05_08',
    title: '第八幕 · 金雁俯冲',
    subtitle: '银练飞瀑 · 跃下绝壁',
    mandatory: true,
    beats: [
      N('你深吸一口山风，双臂微展如大雁舒翼，纵身跃下数十丈绝壁！耳畔风声呼啸，你足尖在凸起岩角连点三下，宛如天降神兵直落谷道中央！'),
    ],
    choices: [
      {
        id: 'zn_q05_dive_down',
        label: '踏壁凌空 · 飞身截住追杀斥候的西夏刀客',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q05_QUEST_ID, stepId: 'cliff_rescue_scout' },
          setStep(ZHONGNAN_Q05_QUEST_ID, 'cliff_rescue_scout'),
          openScene('scene_zn_q05_09', ZHONGNAN_Q05_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q05_09: {
    id: 'scene_zn_q05_09',
    title: '第九幕 · 剑挡弯刀',
    subtitle: '绝壁谷道 · 生死一线',
    illustrationUrl: '/assets/quests/zn_q05_xixia_ambush.jpg',
    illustrationCaption: '绝壁救险 · 寒泉道剑凌空斩落，替负伤大宋斥候格开西夏弯刀',
    mandatory: true,
    beats: [
      N('千钧一发之际，你凌空一剑斜劈而下，“当啷”一声震飞砍向斥候后背的西夏弯刀！'),
      S(SPEAKER_SONG_SCOUT, '（滚倒在石旁，死死护住怀中火漆竹筒）“多谢终南仙长救命！这……这是秦州送往京兆府的八百里加急军报，万万不能落入西夏狗贼手里！”'),
      S(SPEAKER_XIXIA_BLADE1, '（怒目圆睁，与同伴一左一右包抄上来）“哪里冒出来的终南道士！没藏浑，别留活口，连这道士一起剁成肉泥！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_10', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_10: {
    id: 'scene_zn_q05_10',
    title: '第十幕 · 谷道双杀',
    subtitle: '绝壁谷道 · 一对二力战西夏刀客',
    mandatory: true,
    beats: [
      P('（稳稳护在赵铁柱身前，寒泉道剑斜指二人）“大宋疆土，岂容西夏贼寇横行！今日便拿尔等试我金雁身法与三才剑！”'),
    ],
    choices: [
      {
        id: 'zn_q05_fight_xixia',
        label: '金雁游走 · 一对二斩杀西夏刀客野利赤、没藏浑',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: ZHONGNAN_Q05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaBlade1() },
            extraOpponents: [{ kind: 'custom', npc: buildXixiaBlade2() }],
            rule: 'story_trial',
            forbidEscapeReason: '大宋斥候与秦州军报就在身后，绝不可退！',
            introText: '野利赤与没藏浑双刀齐出，左右夹击直扑而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q05_11', ZHONGNAN_Q05_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('西夏刀客合击狠辣，王处阳自崖上投石击退贼人助你脱险。请调息后再战！', '绝壁救险'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q05_11: {
    id: 'scene_zn_q05_11',
    title: '第十一幕 · 雁影斩凶',
    subtitle: '绝壁谷道 · 毙敌于剑下',
    mandatory: true,
    beats: [
      N('你施展《金雁功》借崖壁反跃，轻巧避开双刀合围，身在半空便已挥出三才归元剑！寒芒连闪，没藏浑与野利赤先后喉间中剑，瞪大双眼栽倒在尘埃之中！'),
      N('王处阳飘然落于谷道，确认四周再无西夏暗哨，不由抚掌赞叹。'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_12', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_12: {
    id: 'scene_zn_q05_12',
    title: '第十二幕 · 包扎斥候',
    subtitle: '绝壁谷道 · 救治边军',
    illustrationUrl: '/assets/quests/zn_q05_scout_rescue.jpg',
    illustrationCaption: '山道救孤 · 王处阳以金创药救治宋军斥候，染血竹筒揭露西夏密谋',
    mandatory: true,
    beats: [
      N('王处阳迅速取出终南金创药替赵铁柱止血包扎，你则替他拾起掉在一旁的战马缰绳与军报竹筒。'),
      S(SPEAKER_SONG_SCOUT, '（喘息渐稳，满眼感激）“多谢二位道长！小的名叫赵铁柱，乃秦州经略司斥候。我在半路截获西夏细作密信，拼死逃回关中，没想到在子午谷口被一品堂追上……”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_13', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_13: {
    id: 'scene_zn_q05_13',
    title: '第十三幕 · 惊天军情',
    subtitle: '绝壁谷道 · 密信警示',
    mandatory: true,
    beats: [
      S(SPEAKER_SONG_SCOUT, '（压低声音急道）“西夏人派了两拨死士潜入关中：一拨盯上了长安关学名儒张载先生与京兆府晏相公，意图刺杀震动大宋士林；另一拨则潜往秦州茶马榷场，打算烧毁今夏吐蕃贡马！”'),
      S('NPC-1057', '（脸色骤然凝重）“好毒的连环计！先雇太行匪扰我重阳山门，再刺长安大儒、烧秦州战马！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_14', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_14: {
    id: 'scene_zn_q05_14',
    title: '第十四幕 · 护送驿站',
    subtitle: '终南山麓 · 安置斥候',
    mandatory: true,
    beats: [
      N('你顺手收拢西夏刀客遗留的两匹健马，扶赵铁柱上鞍，并在护送途中向这位边军老斥候请教了不少关中控马疾驰的窍门。'),
      S(SPEAKER_SONG_SCOUT, '“仙长轻功卓绝，控马亦一学便会！小的这就抄小路直奔京兆府衙交差，长安那边就拜托终南诸位高人了！”'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '骑术', delta: 1 },
      openScene('scene_zn_q05_15', ZHONGNAN_Q05_QUEST_ID),
    ],
  },

  scene_zn_q05_15: {
    id: 'scene_zn_q05_15',
    title: '第十五幕 · 飞鸽传书',
    subtitle: '银练飞瀑 · 急报丘处玄',
    mandatory: true,
    beats: [
      S('NPC-1057', '（当即写就一封密信绑在信鸽脚上放飞重阳古观）“我已飞鸽禀报大师兄与丘师兄！丘处玄师兄素来最敬重张载先生‘为天地立心，为生民立命’的气节，闻讯必亲赴长安护道！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_16', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_16: {
    id: 'scene_zn_q05_16',
    title: '第十六幕 · 玉阳嘉许',
    subtitle: '银练飞瀑 · 身法大进',
    mandatory: true,
    beats: [
      S('NPC-1057', '（望着你微笑颔首）“方才你那一记绝壁凌空下崖，已尽得《金雁功》三昧；更难得的是见大宋边军遇险便舍身相救，实乃我重阳古观真男儿、真豪杰！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_17', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_17: {
    id: 'scene_zn_q05_17',
    title: '第十七幕 · 整装待发',
    subtitle: '银练飞瀑 · 准备入长安',
    mandatory: true,
    beats: [
      S('NPC-1057', '“你且回观歇息一晚，明日便随丘处玄师兄同赴京兆府横渠关学书院护卫张载先生！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q05_18', ZHONGNAN_Q05_QUEST_ID)],
  },

  scene_zn_q05_18: {
    id: 'scene_zn_q05_18',
    title: '第十八幕 · 雁影苍茫',
    subtitle: '终南后山 · 豪情满怀',
    mandatory: true,
    beats: [
      N('暮色中，几只山雁贴着银练飞瀑掠向长安方向。你轻抚寒泉道剑，身轻如燕，静待下一场护道之行！'),
    ],
    choices: [
      {
        id: 'zn_q05_complete',
        label: '稽首辞谢 · 完成《太白金雁 · 绝壁凌虚》',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 95 },
          { type: 'giveSilver', amount: 80, reason: '绝壁斩夏救斥候嘉奖' },
          { type: 'giveCombatExp', amount: 580, reason: '完成《太白金雁 · 绝壁凌虚》' },
          { type: 'modifyRenown', delta: 20, reason: '终南绝壁斩杀西夏刀客救宋军斥候' },
          { type: 'modifyChivalry', delta: 14, reason: '舍身救护大宋边军斥候' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1057' }, delta: 14 },
          { type: 'completeQuest', questId: ZHONGNAN_Q05_QUEST_ID, outcome: 'rescued_scout' },
          toast('完成《太白金雁 · 绝壁凌虚》，精进《金雁功》！', 'success', '太白金雁'),
        ],
      },
    ],
  },
}
