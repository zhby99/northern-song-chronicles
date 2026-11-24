import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q32_QUEST_ID } from './shaolinNineTurnPillQuest'

const SPEAKER_SHA_ONE: StorySpeakerSpec = {
  kind: 'custom',
  name: '铁面煞 · 拓跋狼',
  title: '西夏一品堂 · 毁炉死士首领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_SHA_TWO: StorySpeakerSpec = {
  kind: 'custom',
  name: '幽影煞 · 贺兰鬼',
  title: '西夏一品堂 · 毁炉死士',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

const SPEAKER_SHA_THREE: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒蝎煞 · 嵬名娘',
  title: '西夏一品堂 · 毁炉女煞',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
}

function buildShaOneLeader(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ32_SHA_ONE',
    name: '铁面煞 · 拓跋狼',
    title: '西夏一品堂 · 毁炉死士首领',
    realm: '一流上品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂死士首',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“砸碎药王丹炉！少林秃驴今夜便全数毒发身亡！”',
    stats: { hp: 3120, mp: 2780, agi: 74, res: 56 },
    talents: { bone: 86, comprehension: 78, charm: 34 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-046' },
    learnedArts: [
      { artId: 'MA-245', level: 8 },
      { artId: 'MA-133', level: 8 },
      { artId: 'MA-046', level: 8 },
    ],
  })
}

function buildShaTwoGhost(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ32_SHA_TWO',
    name: '幽影煞 · 贺兰鬼',
    title: '西夏一品堂 · 毁炉死士',
    realm: '一流中品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂死士',
    avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
    talk: '“我绕后掀翻丹炉，大哥拖住这小和尚！”',
    stats: { hp: 2560, mp: 2350, agi: 76, res: 50 },
    talents: { bone: 80, comprehension: 80, charm: 36 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-084', move2: 'MA-085' },
    learnedArts: [
      { artId: 'MA-245', level: 7 },
      { artId: 'MA-084', level: 8 },
      { artId: 'MA-085', level: 7 },
    ],
  })
}

function buildShaThreeScorpion(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ32_SHA_THREE',
    name: '毒蝎煞 · 嵬名娘',
    title: '西夏一品堂 · 毁炉女煞',
    realm: '一流中品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '一品堂女煞',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_female_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_female_fb.jpg',
    talk: '“把悲酥毒粉泼进药炉里，叫他们炼出一炉穿肠剧毒！”',
    stats: { hp: 2380, mp: 2480, agi: 75, res: 48 },
    talents: { bone: 78, comprehension: 82, charm: 62 },
    equippedArts: { neigong: 'MA-231', move1: 'MA-065', move2: 'MA-095' },
    learnedArts: [
      { artId: 'MA-231', level: 8 },
      { artId: 'MA-065', level: 7 },
      { artId: 'MA-095', level: 8 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq32_01: {
    id: 'scene_slq32_01',
    title: '第一幕 · 泉水生变 · 缺一君药',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊 · 临时丹房',
    mandatory: true,
    beats: [
      N('{reignYear}隆冬，鹅毛大雪连下三日。清晨未过卯时，大雄宝殿东厢已摆满抬送病僧的竹榻，呻吟咳血之声此起彼伏！药王院主玄生白眉紧锁，银针探入山泉水碗，针尖竟瞬间乌黑发紫！'),
      S('NPC-0158', '（声音微颤，难掩震怒）“阿弥陀佛……好狠毒的手段！昨夜有人趁大雪封山，在嵩山后崖泉眼投下西夏秘制『悲酥瘟瘴』！如今斋堂饮水波及半寺，已有三百余名弟子寒热交攻、真气溃散！”'),
      P('（接过药童自泉眼拾回的半片青瓷残片细辨暗纹）“师叔请看！这毒粉虽是西夏一品堂悲酥清风变种，可封口所用的防潮冰蜡与包药宣纸，却出自江南姑苏！两路黑手竟已联手袭我少林！”'),
      S('NPC-0158', '（展开《少林药王秘典》「九转清瘟回魂汤」古方，长叹一声）“玄慈方丈与诸位首座正竭力运功替重病幼僧续命，其余三十五味珍药俱全，唯独镇方君药『千年血灵芝』早已用罄！唯有达摩院【飞瀑深潭 · 试炼涧】极寒冰壁裂缝尚生一株，然冰瀑滑如明镜、罡风刺骨……”'),
      P('（毫无犹豫接过玄铁采药小锄与暖玉药盒）“师叔且先引火温炉、备齐辅药！弟子这就赴试炼涧冰崖采回千年血灵芝！”'),
    ],
    choices: [
      {
        id: 'slq32_accept_swift',
        label: '【刻不容缓】收好暖玉药盒，顶雪疾赴达摩院【飞瀑深潭 · 试炼涧】采芝！',
        subLabel: '开启《药王瘟劫 · 九转回魂》，前往飞瀑深潭冰壁采药',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_prep', value: 'swift' },
          { type: 'startQuest', questId: SHAOLIN_Q32_QUEST_ID, stepId: 'fetch_blood_lingzhi' },
          setStep(SHAOLIN_Q32_QUEST_ID, 'fetch_blood_lingzhi'),
          toast(
            '已开启《药王瘟劫 · 九转回魂》！请速赴【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】采摘千年血灵芝！',
            'talk',
            '药王瘟劫',
          ),
        ],
      },
      {
        id: 'slq32_accept_study',
        label: '【先察药理】临行默记《药王秘典》毒方配伍要害，再奔试炼涧抢采血灵芝！',
        subLabel: '开启《药王瘟劫 · 九转回魂》，前往飞瀑深潭冰壁采药',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_prep', value: 'studied' },
          { type: 'startQuest', questId: SHAOLIN_Q32_QUEST_ID, stepId: 'fetch_blood_lingzhi' },
          setStep(SHAOLIN_Q32_QUEST_ID, 'fetch_blood_lingzhi'),
          toast(
            '已开启《药王瘟劫 · 九转回魂》！请速赴【达摩院 · 飞瀑深潭 · 试炼涧（sl_damo_west）】采摘千年血灵芝！',
            'talk',
            '药王瘟劫',
          ),
        ],
      },
    ],
  },

  scene_slq32_02: {
    id: 'scene_slq32_02',
    title: '第二幕 · 冰瀑绝壁 · 绝险采芝',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧（轻功抉择）',
    illustrationUrl: '/assets/quests/sl_32_ice_cliff_herb.jpg',
    illustrationCaption: '冰崖采芝 · 绝寒冰瀑深潭之间，勇闯滑冰绝壁采摘千年血灵芝',
    mandatory: true,
    beats: [
      N('飞瀑深潭此刻已化作一片晶莹刺骨的冰谷！百丈悬瀑冻成狰狞冰柱，七丈宽的寒潭漂浮着厚薄不一的碎冰，凛冽罡风如钢刀割面。'),
      N('你仰首望去，只见深潭对岸三丈高的镜面冰壁石缝间，一株通体赤红如珊瑚、隐隐透出温润宝晕的「千年血灵芝」正傲雪绽放！'),
      N('深潭水寒透骨，浮冰承重不得；而绕崖栈道早被冰柱封死，唯余绝险两途——'),
    ],
    choices: [
      {
        id: 'slq32_herb_qinggong',
        label: '【一苇渡江 · 踏冰凌空采芝】折枯芦点碎冰借力腾跃三丈，无伤完整连根起出千年血灵芝！',
        subLabel: '保全灵芝药须丝毫无损，且身无寒伤',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需实战身法 ≥ 65 或《一苇渡江》(MA-057) ≥ 3 重',
          conditions: [
            { type: 'combatStatAtLeast', key: 'agility', min: 65 },
            { type: 'learnedArtAtLeast', artId: 'MA-057', minLevel: 3 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q32_herb_intact', value: true },
          { type: 'setFlag', flag: 'sl_q32_climb_mode', value: 'qinggong' },
          openScene('scene_slq32_03_herb_done', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'slq32_herb_climb',
        label: '【冒寒毒强攀冰壁】催动内力硬抗冰岩寒气，以指掌扣石凿冰步步强攀抢采血灵芝！',
        subLabel: '零门槛硬攀绝壁，纵十指冻裂亦必将君药带回东厢',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_climb_mode', value: 'climb' },
          openScene('scene_slq32_03_herb_done', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq32_03_herb_done: {
    id: 'scene_slq32_03_herb_done',
    title: '第三幕 · 暖玉封芝 · 踏雪飞归',
    subtitle: '达摩院 · 飞瀑深潭 · 试炼涧',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q32_herb_intact|你折下一根岸边枯芦抛落潭面，足尖轻点枯芦与三块浮冰边缘竟不溅半点水花！陡然拔身三丈如白鹤掠雪，稳稳扣住凸石，以玄铁小锄将整株千年血灵芝连须带根完整起出，分毫未损！|你咬牙运功抵御渗骨寒风，以指掌硬扣冰缝碎岩寸寸向上强攀！罡风割裂僧袖、十指冻得渗出血珠，终在冰柱崩落前一把护住石缝赤芝，抢在坠潭前翻滚回岸！}'),
      N('千年血灵芝甫入暖玉药盒，赤红宝光顿敛、浓郁药香锁于匣内。冰谷罡风仍在身后呼啸，悬崖冰柱轰然坠潭炸起漫天寒雾。'),
      P('（将暖玉盒紧护怀中，足下提气飞掠而出）“全寺三百余同门命悬一线，一刻也耽搁不得！快回大雄宝殿东厢交予玄生师叔开炉！”'),
    ],
    onFinishEffects: [openScene('scene_slq32_04_furnace_formula', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_04_furnace_formula: {
    id: 'scene_slq32_04_furnace_formula',
    title: '第四幕 · 君臣佐使 · 开炉定火',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊（火候配比）',
    mandatory: true,
    beats: [
      N('东厢丹房内炭火通红。玄生接过暖玉盒开匣一观，老泪纵横：“佛祖保佑！{ifFlag:sl_q32_herb_intact|这株血灵芝药须丝毫无损、灵气十成完足，真乃神迹！|你冒寒苦攀护住药心，老衲代全寺僧众谢过！}”'),
      N('然玄生连番以纯和内力替病僧续命，此刻双手微微发颤。眼看三十五味辅药已在古铜药鼎沸腾，到了投君药定火候的生死关头——「悲酥瘟瘴」乃寒热交攻之奇毒，血灵芝大热大补，若配伍火候稍有差池，非但解不得瘟毒，反会令病僧虚火焚脉！'),
      S('NPC-0158', '（额头大汗淋漓，沉声问你）“{playerName}，{ifFlagEq:sl_q32_prep=studied|你临行曾细阅《药王秘典》毒方配伍|你经义通透、心细如发}——此刻血灵芝入鼎炼制九转回魂丹，君臣佐使与炉火该当如何拿捏？”'),
    ],
    choices: [
      {
        id: 'slq32_formula_fierce',
        label: '血灵芝整株入鼎、佐以附子烈酒、武火猛煎一刻速逼药力镇压寒毒',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_formula_pick', value: 'fierce' },
          openScene('scene_slq32_05_ambush', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'slq32_formula_true',
        label: '血灵芝为君、佐以少室雪莲清热护脉、文火慢煨三刻引出九转温润药韵',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_pill_perfect', value: true },
          { type: 'setFlag', flag: 'sl_q32_formula_pick', value: 'true' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q32_formula_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q32_formula_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq32_05_ambush', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'slq32_formula_cold',
        label: '以冰水冷浸血灵芝尽去其热性、仅取生药汁水冲服而不必开炉煎炼',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_formula_pick', value: 'cold' },
          openScene('scene_slq32_05_ambush', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq32_05_ambush: {
    id: 'scene_slq32_05_ambush',
    title: '第五幕 · 丹香初起 · 三煞夜袭',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q32_pill_perfect|玄生大喜过望，依言投雪莲护脉、转文火慢煨！刹那间鼎盖轻鸣，九缕温润清苦药香弥漫东厢，炉侧紫铜风道更聚起一层浓厚辛辣的化毒余雾！|玄生忙摇头急调火候，一边添入少室雪莲清热护脉，一边以纯和内力稳住文火：“幸未误事，血灵芝大热须以雪莲调和、文火慢煨方能九转成药！”}'),
      S('NPC-0158', '（盘坐铜炉前全力控火）“此炉汤药与伴生大丹正值紧要关头，万不可断火泄气！老衲需全神贯注半柱香，门户安危全托付予你！”'),
      N('话音未落，屋脊积雪轰然炸裂！三道身披西夏黑毡斗篷、面戴青铜恶鬼面具的森寒身影破雪扑落东厢廊前——正是西夏一品堂【毁炉死士三煞】！'),
      S(SPEAKER_SHA_ONE, '（亮出厚背西夏斩马弯刀狂笑）“果然叫老秃驴采回血灵芝了！弟兄们，奉赫连大将军死令——今夜砸碎铜炉、格杀玄生，叫少林彻底灭门！”'),
    ],
    onFinishEffects: [
      setStep(SHAOLIN_Q32_QUEST_ID, 'guard_pill_furnace'),
      toast('西夏一品堂毁炉三煞夜袭丹房！请守在【东厢碑廊】择策破煞护炉！', 'talk', '护炉血战'),
      openScene('scene_slq32_06_defense_choice', SHAOLIN_Q32_QUEST_ID),
    ],
  },

  scene_slq32_06_defense_choice: {
    id: 'scene_slq32_06_defense_choice',
    title: '第六幕 · 独守丹房 · 破煞之策',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊（攻防多解）',
    illustrationUrl: '/assets/quests/sl_32_guard_furnace.jpg',
    illustrationCaption: '独守丹房 · 风雪夜独战西夏一品堂毁炉死士三煞，寸步不让',
    mandatory: true,
    beats: [
      S(SPEAKER_SHA_TWO, '（双爪幽绿鬼魅般绕向左侧窗棂）“寺里高手多半中了瘟毒，就凭这一个真传弟子挡得住咱们三煞夹攻？”'),
      S(SPEAKER_SHA_THREE, '（娇笑抖出两包惨白悲酥毒粉）“只要把这包毒粉泼进铜鼎，半寺秃驴全得归西！”'),
      N('铁面煞正面压门、幽影煞与毒蝎煞分袭左右侧窗！千钧一发间，你瞥见东厢丹房墙角那截紫铜排烟风管正嘶嘶喷吐浓烈的药炉化毒余雾——若能算准风向与火候气脉一掌震开挡板，或可反将外围二煞瞬间放倒！'),
    ],
    choices: [
      {
        id: 'slq32_defend_mist',
        label: '【巧借药炉余毒迷雾拆阵】震开紫铜风口借滚烫药雾迷倒幽影、毒蝎二煞，1v1 斩首领拓跋狼！',
        subLabel: '拆解三煞夹击，单挑毁炉首领【铁面煞 · 拓跋狼】（一流上品）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需文火九转炉气精控（配伍正确），或算术 ≥ 50',
          conditions: [
            { type: 'flag', flag: 'sl_q32_pill_perfect', op: 'truthy', label: '文火九转炉气精控' },
            { type: 'skillAtLeast', key: '算术', min: 50 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q32_defense_mode', value: 'mist_1v1' },
          openScene('scene_slq32_07_mist_1v1', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'slq32_defend_gauntlet',
        label: '【以身护炉死战三煞】横身立定朱门之前，寸步不让车轮连斩毁炉三煞！',
        subLabel: '零门槛正面死守（车轮连战：一流中品 × 2 → 一流上品）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_defense_mode', value: 'gauntlet' },
          openScene('scene_slq32_08_gauntlet', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq32_07_mist_1v1: {
    id: 'scene_slq32_07_mist_1v1',
    title: '第七幕 · 炉雾拆阵 · 独斩铁面',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊（1v1 决战一流上品）',
    mandatory: true,
    beats: [
      N('你算准风雪回流与铜管气压，斜掠半步隔空一掌拍碎紫铜风口挡板！滚烫浓白的药炉余毒迷雾轰然喷涌而出，迎面扑向正欲翻窗抛毒的毒蝎煞与幽影煞！'),
      N('毒蝎煞手中悲酥毒粉反被灼热药雾尽数卷回面门，惨叫一声撞在幽影煞怀中！二人瞬间双目剧痛、浑身酸麻瘫倒雪地，被你顺势两道指风点中昏睡大穴！'),
      S(SPEAKER_SHA_ONE, '（怒吼一声挥弯刀劈开迷雾，青铜鬼面下双目欲裂）“狡猾秃驴！毁我两个弟兄，老子亲自把你连同药炉劈成两半！”'),
      N('身后便是玄生与救命丹炉，眼前唯余暴怒的毁炉首领【铁面煞 · 拓跋狼】！'),
    ],
    choices: [
      {
        id: 'slq32_fight_leader_only',
        label: '寸步不退！1v1 斩毙西夏毁炉首领【铁面煞 · 拓跋狼】（一流上品）！',
        subLabel: '外围二煞已除，全力格杀拓跋狼护炉成药',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q32_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShaOneLeader() },
            rule: 'story_trial',
            forbidEscapeReason: '身后丹炉系全寺数百同门性命，退一步即少林倾覆，唯有死战！',
            introText: '【炉雾拆阵 · 独斩铁面】一对一迎战西夏一品堂毁炉首领【铁面煞 · 拓跋狼（一流上品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq32_09_cauldron_done', SHAOLIN_Q32_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '拓跋狼弯刀势大力沉将你逼退半步，幸得丹房飘出灵芝丹香助你重提真气！可于【东厢碑廊】再战。',
                'warn',
                '药王瘟劫',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq32_08_gauntlet: {
    id: 'scene_slq32_08_gauntlet',
    title: '第七幕 · 浴血死守 · 连战三煞',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊（车轮连战）',
    mandatory: true,
    beats: [
      P('（一步踏碎门前积雪，周身纯阳佛门真气轰然爆发）“有我在此，尔等西夏魔犬休想越过丹房门槛半步！”'),
      S(SPEAKER_SHA_ONE, '（冷笑挥刀，向左右二煞递出杀机眼色）“狂妄小僧！幽影、毒蝎先轮番耗干他真气，老子压阵一刀劈碎他天灵盖！”'),
      N('毁炉三煞结成车轮杀势扑来——幽影煞鬼爪掏心、毒蝎煞毒针漫天、铁面煞斩马弯刀力劈华山！身后便是全寺数百同门的救命丹炉，此战寸步不可退！'),
    ],
    choices: [
      {
        id: 'slq32_fight_three_sha',
        label: '寸步不退！车轮连战【幽影煞】【毒蝎煞】【铁面煞】（一流中品 × 2 → 一流上品）！',
        subLabel: '以血肉之躯独挡西夏一品堂毁炉三煞',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q32_QUEST_ID,
            opponent: { kind: 'custom', npc: buildShaTwoGhost() },
            extraOpponents: [
              { kind: 'custom', npc: buildShaThreeScorpion() },
              { kind: 'custom', npc: buildShaOneLeader() },
            ],
            rule: 'story_trial',
            forbidEscapeReason: '身后丹炉系全寺数百同门性命，退一步即少林倾覆，唯有死战！',
            introText: '【独守丹房 · 车轮死战】连战西夏一品堂毁炉死士三煞，拼死护住丹炉直至丹成！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq32_09_cauldron_done', SHAOLIN_Q32_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '三煞合击凶险非常，玄生隔门弹出一枚保元丹为你续力！调息后可于【东厢碑廊】再战。',
                'warn',
                '药王瘟劫',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq32_09_cauldron_done: {
    id: 'scene_slq32_09_cauldron_done',
    title: '第八幕 · 药鼎鸣龙 · 回魂救寺',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    mandatory: true,
    beats: [
      N('激战百余合，西夏毁炉首领终被你震碎护体罡气伏诛雪地，而你身后的药王丹房木门竟未损半分！就在贼首倒下的刹那，丹房内轰然传出一声清越龙吟般的鼎鸣，九道金色药雾冲开炉盖直贯梁顶，奇异药香瞬间压过漫天血腥与寒雪！'),
      S('NPC-0158', '（推开丹房大门，见满地血雪与岿然不动的你，老泪纵横）“成了！九转清瘟回魂汤成了！快——速命各院无恙弟子分汤救人！”'),
      N('一碗碗温热赤红的回魂灵汤飞快送往各院禅房。不到一个时辰，三百余名中毒僧众相继呕出体内寒毒黑血，高热尽退、呼吸转稳，竟无一人因瘟劫丧命！大雄宝殿钟声长鸣九响，合寺僧众齐诵你采芝护炉之大德。'),
    ],
    onFinishEffects: [openScene('scene_slq32_10_pill_gift', SHAOLIN_Q32_QUEST_ID)],
  },

  scene_slq32_10_pill_gift: {
    id: 'scene_slq32_10_pill_gift',
    title: '第九幕 · 鼎底圣丹 · 九转回魂',
    subtitle: '大雄宝殿方丈院 · 东厢碑廊',
    illustrationUrl: '/assets/quests/sl_32_nine_turn_pill.jpg',
    illustrationCaption: '九转回魂 · 药王院主玄生亲赠少林天阶圣药《少林九转大还丹》',
    mandatory: true,
    beats: [
      N('待众僧安顿妥当，玄生将你请入丹房之内。只见那口古铜药鼎底部，竟在千年血灵芝与三十五味秘药精华凝聚之下，额外凝结出一枚龙眼大小、通体流转九道金纹的稀世宝丹——少林每甲子难得一遇的天阶圣药「少林九转大还丹」！'),
      S('NPC-0158', '（不容你推辞，郑重将白玉药匣放入你掌中）“宝药配英雄，方不负济世本心！此丹服之可固本培元、脱胎换骨。今日你拼死救下全寺数百同门性命，此等无上圣药唯有你受之无愧！”'),
      S('NPC-0158', '（收起笑容，神色转沉望向窗外风雪）“只是西夏一品堂接连发难，背后又有江南暗影推波助澜。玄慈方丈已下密谕，待开春之后便要召开菩提院全寺玄字辈大议，商讨首座大任与少室山大会应变之策……”'),
      N('你捧着犹带余温的白玉药匣，心中深知少林真正的百年大考即将来临，郑重向玄生表态——'),
    ],
    choices: [
      {
        id: 'slq32_accept_heal',
        label: '【慈悲济世】愧领师叔厚赐！必以此丹济危扶困，不负药王院百年救苦仁心',
        subLabel: '仁心护世（禅心慈悲 +1）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_pill_vow', value: 'heal' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q32_vow_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q32_vow_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
            ],
          },
          openScene('scene_slq32_11_settle', SHAOLIN_Q32_QUEST_ID),
        ],
      },
      {
        id: 'slq32_accept_battle',
        label: '【护法伏魔】恭受圣丹傍身！待开春菩提院议定，必以此身共诛西夏毒邪与幕后奸徒',
        subLabel: '铁志伏魔（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q32_pill_vow', value: 'battle' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q32_vow_scored', op: 'falsy' },
            thenEffects: [
              { type: 'setFlag', flag: 'sl_q32_vow_scored', value: true },
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
            ],
          },
          openScene('scene_slq32_11_settle', SHAOLIN_Q32_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq32_11_settle: {
    id: 'scene_slq32_11_settle',
    title: '第十幕 · 雪霁少室 · 仁名远播',
    subtitle: '嵩山少林寺 · 大雄宝殿方丈院',
    mandatory: true,
    beats: [
      N('大雪初霁，冬阳洒满少室银峰。{ifFlagEq:sl_q32_pill_vow=heal|玄生欣慰合十，赞你仁心仁术俱全，堪作佛门慈航；|玄生颔首勉励，赞你临危不惧、锋芒护法，实乃少林砥柱；}你贴身收好白玉药匣，向药王院主深深一揖辞行。'),
      N('经此一役，你孤身踏冰采芝、{ifFlagEq:sl_q32_defense_mode=mist_1v1|巧借炉雾拆阵独斩拓跋狼|浴血车轮死战毁炉三煞}救全寺数百同门之壮举迅速传遍河洛，连大雄宝殿外病愈的沙弥亦远远向你合十致敬。'),
      P('（深吸雪后清冽空气，抬眼望向巍峨大雄宝殿）“瘟劫既平，开春便是菩提院大议……少林长老首座之路，已近在眼前！”'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-101', qty: 1 },
      { type: 'giveCombatExp', amount: 920, reason: '药王瘟劫 · 九转回魂' },
      { type: 'addSectContribution', amount: 320 },
      { type: 'modifyChivalry', delta: 50, reason: '孤身采芝护炉救全寺僧众' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q32_pill_perfect', op: 'truthy' },
        thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
        elseEffects: [],
      },
      {
        type: 'branch',
        condition: { type: 'flag', flag: 'sl_q32_herb_intact', op: 'truthy' },
        thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
        elseEffects: [],
      },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0158' }, delta: 30 },
      { type: 'completeQuest', questId: SHAOLIN_Q32_QUEST_ID, outcome: 'completed' },
      toast(
        '《药王瘟劫 · 九转回魂》完结！获赐天阶圣药《少林九转大还丹》，实战经验 +920，师门贡献 +320，侠义 +50，玄生好感 +30！',
        'success',
        '九转回魂',
      ),
    ],
  },
}
