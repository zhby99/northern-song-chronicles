import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q22_QUEST_ID } from './shaolinLuohanRanmuBladeQuest'

const SPEAKER_NIGHT_SHADOW: StorySpeakerSpec = {
  kind: 'custom',
  name: '黑衣蒙面高手',
  title: '夜探罗汉堂 · 神秘绝顶暗影',
  factionName: '江湖暗影',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildNightShadowBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ22_NIGHT_SHADOW',
    name: '夜探黑影高手',
    title: '潜袭罗汉堂 · 神秘黑衣人',
    realm: '一流中品',
    factionId: 'SECT-10',
    factionName: '神秘势力',
    sectRank: 3,
    sectRankLabel: '暗夜枭雄',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“哼！区区少林小辈也敢提燃木戒刀拦路？十合之内，先废你双臂！”',
    stats: { hp: 3180, mp: 2240, agi: 76, res: 62 },
    talents: { bone: 88, comprehension: 86, charm: 50 },
    equippedArts: { neigong: 'MA-243', move1: 'MA-244', move2: 'MA-073' },
    learnedArts: [{ artId: 'MA-243', level: 8 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-073', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq22_01: {
    id: 'scene_slq22_01',
    title: '第一幕 · 寒夜召见',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('{reignYear}冬月，大雪初霁，少室山寒风凛冽。你入寺已满七载，深夜忽接罗汉堂首座玄苦师伯密谕，命你独赴【罗汉堂演武正殿】听讲。'),
      N('步入正殿，只见殿内未点巨烛，唯有佛前两盏长明青灯摇曳。降魔尊者玄苦负手立于一截半人高的百年枯菩提木桩前，眉宇间罕见地凝着一层化不开的忧色。'),
      P('（合十躬身）“弟子参见玄苦师伯！夜深天寒，不知师伯急召弟子前来，有何要事相谕？”'),
    ],
    onFinishEffects: [openScene('scene_slq22_02', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_02: {
    id: 'scene_slq22_02',
    title: '第二幕 · 山雨暗潮',
    subtitle: '罗汉堂演武正殿 · 玄苦忧思',
    mandatory: true,
    beats: [
      S('NPC-0126', '（长叹一声，目光望向殿外黑沉沉的松林）“阿弥陀佛……师侄，近日江湖风声紧得很。丐帮那边隐隐有流言四起，暗指老衲早年授业的俗家弟子乔峰身世有异；更诡异的是，近半月来，每逢子夜，总有一道深不可测的黑影在少林后山与罗汉堂屋脊徘徊窥伺。”'),
      P('（心头一凛）“竟有高手胆敢夜窥罗汉堂？难道此人与针对乔峰师兄的阴谋有关？”'),
      S('NPC-0126', '（缓缓摇头，神色沉毅）“因果业力，非人力可尽测。老衲已年近七旬，生死早已看淡；唯独罗汉堂镇堂绝学《燃木刀法》与这柄祖师传下的宝刀，绝不可因老衲一人之变故而失传！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_03', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_03: {
    id: 'scene_slq22_03',
    title: '第三幕 · 百年枯木',
    subtitle: '罗汉堂演武正殿 · 刀意将起',
    mandatory: true,
    beats: [
      N('玄苦转身从佛龛之下取出一柄通体乌沉、无尖阔背的厚重戒刀，刀身刻满梵文莲纹，竟是少林镇寺重器【少林燃木戒刀】！'),
      S('NPC-0126', '“你经义通透、书法凝练，昔日破十八铜人阵时已将《慈悲刀法》练至圆融。今夜老衲便将少林七十二绝技中最刚猛霸道、亦最重禅火慈悲的《燃木刀法》倾囊传你！看好了——”'),
    ],
    onFinishEffects: [openScene('scene_slq22_04', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_04: {
    id: 'scene_slq22_04',
    title: '第四幕 · 刀风起处',
    subtitle: '罗汉堂演武正殿 · 刚柔之辨',
    mandatory: true,
    beats: [
      S('NPC-0126', '“《燃木刀法》共八十一式，并非寻常劈砍！刀锋须与枯木保持半寸距离，以浑厚佛门阳刚内力高速摩擦空气，使热浪积聚于刀脊之间——刀不触木，却令木自焚！”'),
      N('话音一落，玄苦双目精芒暴涨，手中乌沉戒刀霍然扬起！第一刀斩落，并无金铁交鸣，唯有“呼”的一声闷雷般热风扫过枯菩提木！'),
    ],
    onFinishEffects: [openScene('scene_slq22_05', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_05: {
    id: 'scene_slq22_05',
    title: '第五幕 · 八十一刀',
    subtitle: '罗汉堂演武正殿 · 烈风如潮',
    mandatory: true,
    beats: [
      N('刹那间，玄苦刀势骤然提速！一刀快过一刀，十刀、三十刀、六十刀……大殿之中竟仿佛刮起一股炽热旋风，青灯火苗被刀气扯成数尺长的光带！'),
      N('你凝神紧盯玄苦每一步的踏位与腕劲流转，只觉那八十一刀看似暴烈如火，实则起承转合皆暗合《法华经》火宅喻之禅理——以刚猛之火焚尽邪魔妄念，而非滥杀无辜！'),
    ],
    onFinishEffects: [openScene('scene_slq22_06', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_06: {
    id: 'scene_slq22_06',
    title: '第六幕 · 枯木生烟',
    subtitle: '罗汉堂演武正殿 · 禅火自燃',
    illustrationUrl: '/assets/quests/sl_22_burning_wood.jpg',
    illustrationCaption: '枯木生烟 · 玄苦深夜连劈八十一刀，刀锋不触木身，百年枯菩提木却在炽热刀风下轰然生烟自燃',
    mandatory: true,
    beats: [
      N('“轰——！”第八十一刀收势归鞘的刹那，那截百年枯菩提木竟在众人目瞪口呆中冒出一缕青烟，紧接着“腾”地窜起一尺高的金色烈焰，木香四溢、满殿生温！'),
      N('而木桩表面竟连一道刀痕也无！刀锋未曾触木，单凭炽热刀风便将百年古木隔空引燃，这正是少林绝技《燃木刀法》的登峰造极之境！'),
    ],
    onFinishEffects: [teachArtNow('MA-052'), openScene('scene_slq22_07', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_07: {
    id: 'scene_slq22_07',
    title: '第七幕 · 熄火问心',
    subtitle: '罗汉堂演武正殿 · 刀诀传心',
    mandatory: true,
    beats: [
      N('玄苦衣袖轻拂，一股柔和掌风将枯木火焰轻轻扑灭，殿内唯余淡淡菩提焦香。'),
      S('NPC-0126', '“看清了么？以书入刀，运腕如悬肘悬腕写狂草，力透刀背而不僵；以经镇火，杀气一起便以慈悲心念压之，方不致陷入玄澄师兄昔年的『武学障』！”'),
      P('（心潮澎湃，俯身拜倒）“弟子看清了！刀烈而心定，火炽而神明！此等无上刀意，弟子铭记五内！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_08', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_08: {
    id: 'scene_slq22_08',
    title: '第八幕 · 执刀试演',
    subtitle: '罗汉堂演武正殿 · 初领刀意',
    mandatory: true,
    beats: [
      N('玄苦将手中乌沉戒刀递给你，命你依方才口诀演练前二十七式。你双手接过，只觉刀身沉凝厚重，运起少林阳刚内力疾劈而出，刀风果然隐隐带着一股灼热锐气！'),
      S('NPC-0126', '（抚须点头）“不错！初上手便能劈出三分热风，足见你七载内功根基极为扎实。”'),
    ],
    onFinishEffects: [openScene('scene_slq22_09', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_09: {
    id: 'scene_slq22_09',
    title: '第九幕 · 禅房密谈',
    subtitle: '罗汉堂演武正殿 · 往事叮嘱',
    mandatory: true,
    beats: [
      N('演武方罢，殿外忽起一阵阴冷怪风，吹得窗棂咯吱作响。玄苦神色一肃，挥手示意你随他退至佛龛侧畔低语。'),
      S('NPC-0126', '“师侄，老衲还有一事相托。乔峰那孩子是我看着长大的，他为人光明磊落、义薄云天，绝非奸邪之辈。日后若江湖真有人借身世大做文章、构陷于他，你切莫随波逐流，须以本心明辨是非！”'),
      P('（郑重颔首）“弟子谨记师伯嘱托！乔峰师兄抗辽护民、侠名满天下，弟子断不会轻信小人谗言！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_10', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_10: {
    id: 'scene_slq22_10',
    title: '第十幕 · 托付宝刀',
    subtitle: '罗汉堂演武正殿 · 燃木戒刀',
    mandatory: true,
    beats: [
      S('NPC-0126', '“这柄【少林燃木戒刀】乃取天竺乌兹钢混嵩山精铁重锻而成，随老衲降魔四十载。今日老衲便提前将它托付于你——宝刀配烈火，留在你手，比锁在武库中更能护佑少林！”'),
      P('（连连推辞）“师伯春秋尚健，此乃罗汉堂镇堂之宝，弟子何德何能敢受如此重托……”'),
    ],
    onFinishEffects: [openScene('scene_slq22_11', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_11: {
    id: 'scene_slq22_11',
    title: '第十一幕 · 薪火相传',
    subtitle: '罗汉堂演武正殿 · 师恩重托',
    mandatory: true,
    beats: [
      S('NPC-0126', '（将戒刀郑重按入你掌心，语重心长）“阿弥陀佛！佛家讲薪火相传，莫要推辞。况且……老衲听见殿外瓦片微响了！那道窥伺半月的黑影，今夜终于忍不住现身了！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_12', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_12: {
    id: 'scene_slq22_12',
    title: '第十二幕 · 佛前受刀',
    subtitle: '罗汉堂演武正殿 · 托付大任',
    illustrationUrl: '/assets/quests/sl_22_xuanku_entrust.jpg',
    illustrationCaption: '玄苦托刀 · 长明灯下，玄苦双手将传世宝刀【少林燃木戒刀】郑重托付于你，薪火相传',
    mandatory: true,
    beats: [
      N('长明灯火映照着玄苦慈祥而坚毅的面容。你不再推辞，双手紧握【少林燃木戒刀】，顿觉一股浩然正气自刀柄直透肺腑！'),
      P('（横刀立于玄苦身前，双目如电）“师伯放心！今夜既有宵小胆敢夜闯罗汉堂，弟子便以新学之《燃木刀法》与这柄燃木戒刀，替师伯会一会这暗夜黑影！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_13', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_13: {
    id: 'scene_slq22_13',
    title: '第十三幕 · 三更警备',
    subtitle: '罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('三更梆子声刚刚落下，演武正殿之外万籁俱寂，唯有寒风卷雪拍打雕花门扉。你横刀戒备，屏息凝神等待暗敌现身！'),
    ],
    choices: [
      {
        id: 'slq22_accept_guard',
        label: '执燃木戒刀护卫玄苦师伯，开启【枯木生烟 · 玄苦授刀】夜战',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q22_QUEST_ID, stepId: 'night_guard_luohan' },
          setStep(SHAOLIN_Q22_QUEST_ID, 'night_guard_luohan'),
          openScene('scene_slq22_14', SHAOLIN_Q22_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq22_14: {
    id: 'scene_slq22_14',
    title: '第十四幕 · 破窗黑影',
    subtitle: '罗汉堂演武正殿 · 突袭而至',
    mandatory: true,
    beats: [
      N('“砰！”一声闷响，正殿高窗木格无声粉碎！一道全身裹在黑袍中的魁梧身影宛若大蝙蝠般倒掠而入，未等落地便向佛前玄苦拍出一记阴寒刺骨的幽黑掌力！'),
      N('此人出手狠辣迅捷，掌风所过之处连空气都仿佛凝结成霜，分明是一位隐姓埋名的一流中品绝顶高手！'),
    ],
    onFinishEffects: [openScene('scene_slq22_15', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_15: {
    id: 'scene_slq22_15',
    title: '第十五幕 · 燃木截掌',
    subtitle: '罗汉堂演武正殿 · 初交锋芒',
    mandatory: true,
    beats: [
      P('（暴喝一声，手中燃木戒刀迎面斜撩）“何方鼠辈，安敢在罗汉堂放肆！接我一刀！”'),
      N('炽热刀风与阴寒掌力在半空轰然对撞！“轰隆”一声巨响，雪沫与香灰漫天翻涌！那黑衣人闷哼半步，似未料到玄苦身旁竟有如此强悍的少林真传持宝刀护法！'),
    ],
    onFinishEffects: [openScene('scene_slq22_16', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_16: {
    id: 'scene_slq22_16',
    title: '第十六幕 · 暗影现锋',
    subtitle: '罗汉堂演武正殿 · 刀掌对峙',
    mandatory: true,
    beats: [
      S(SPEAKER_NIGHT_SHADOW, '（压低沙哑嗓音，眼中杀意如冰）“好炽热的刀风……玄苦老秃驴竟连《燃木刀法》与戒刀都提前传出去了！也罢，今晚连你这小辈一并灭口！”'),
      S('NPC-0126', '（沉声喝道）“师侄小心！此人功力深厚、身法诡秘，切记以《燃木刀法》烈火堂堂正正逼他硬拼，勿被他阴柔步法缠住！”'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_q22_shadow_appeared', value: true },
      openScene('scene_slq22_17', SHAOLIN_Q22_QUEST_ID),
    ],
  },

  scene_slq22_17: {
    id: 'scene_slq22_17',
    title: '第十七幕 · 殿中死战',
    subtitle: '罗汉堂演武正殿 · 决战夜探黑影',
    mandatory: true,
    beats: [
      N('黑衣蒙面高手身形一晃，掌刀并施直取你咽喉与心口！你紧握少林燃木戒刀，全力催动佛门阳刚真气，与这名一流中品神秘强敌展开惊心动魄的正殿夜战！'),
    ],
    choices: [
      {
        id: 'slq22_fight_shadow',
        label: '挥动燃木戒刀，力战夜袭罗汉堂的【夜探黑影高手】（一流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q22_QUEST_ID,
            opponent: { kind: 'custom', npc: buildNightShadowBoss() },
            rule: 'story_trial',
            duelStakesTag: 'duel',
            introText: '罗汉堂正殿夜黑风高！神秘一流中品黑影高手掌力阴寒诡绝，快以刚猛无匹的燃木刀意将其逼退！',
            onWin: [openScene('scene_slq22_18', SHAOLIN_Q22_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '不敌夜探黑影高手的阴寒掌力！幸得玄苦师伯出手化解险情，调息后可再于【罗汉堂演武正殿】迎战黑影。',
                'warn',
                '枯木生烟',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_slq22_18: {
    id: 'scene_slq22_18',
    title: '第十八幕 · 十合烈焰',
    subtitle: '罗汉堂演武正殿 · 刀势大成',
    mandatory: true,
    beats: [
      N('你与黑影高手在青石大殿中以快打快，转眼激斗十合！那黑衣人招式虽诡，却最忌刚猛炽热的佛门阳刚劲力；你越战越勇，将玄苦方才所授《燃木刀法》与多年《慈悲刀法》融会贯通，刀光竟隐隐透出一层赤红热浪！'),
      N('第十合上，你大喝一声，双手握柄劈出一记势如破竹的「薪尽火传」，炽烈刀风如火龙卷地般将黑衣人周身阴气尽数撕裂！'),
    ],
    onFinishEffects: [openScene('scene_slq22_19', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_19: {
    id: 'scene_slq22_19',
    title: '第十九幕 · 逼退黑影',
    subtitle: '罗汉堂演武正殿 · 破窗遁走',
    illustrationUrl: '/assets/quests/sl_22_night_repel.jpg',
    illustrationCaption: '烈焰逼影 · 你挥动燃木戒刀劈出漫天炽热刀风，十合硬撼逼得夜袭黑影高手仓皇破窗遁逃',
    mandatory: true,
    beats: [
      N('“嘶啦——！”炽热刀风削断黑衣人半截袖袍，焦糊味瞬间弥漫大殿！同时殿外钟声骤响，罗汉堂护法武僧闻声赶来！'),
      S(SPEAKER_NIGHT_SHADOW, '（冷哼一声，借反震之力倒跃上梁）“好个少林真传！今日算你命大，来日少室山外再见分晓！”'),
      N('话音未落，黑影如鬼魅般窜出破窗，几个起落便消没于茫茫雪夜松涛之中！'),
    ],
    onFinishEffects: [openScene('scene_slq22_20', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_20: {
    id: 'scene_slq22_20',
    title: '第二十幕 · 残袖疑云',
    subtitle: '罗汉堂演武正殿 · 审视线索',
    mandatory: true,
    beats: [
      N('你收刀喘息，俯身拾起被燃木刀风斩落的那半截焦黑布袖——布料极细，隐隐带着一丝塞外冷香，却无任何门派标记。'),
      S('NPC-0126', '（步上前仔细端详残袖，神色凝重）“此人功力之高，只怕不亚于本寺玄字辈长老，且刻意藏匿本门路数……今夜若非你在殿中持燃木戒刀死战逼退，老衲纵能自保，恐怕也要落得暗伤缠身！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_21', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_21: {
    id: 'scene_slq22_21',
    title: '第二十一幕 · 戒备全寺',
    subtitle: '罗汉堂演武正殿 · 玄苦赞许',
    mandatory: true,
    beats: [
      N('玄苦随即传令赶来的罗汉堂武僧加强藏经阁与各院巡防，又转身向你合十致意，满眼皆是欣慰与赞叹。'),
      S('NPC-0126', '“阿弥陀佛！师侄临危不乱，初得《燃木刀法》便能十合逼退一流中品暗夜强敌，实乃我罗汉堂百年难遇的刀道奇才！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_22', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_22: {
    id: 'scene_slq22_22',
    title: '第二十二幕 · 刀禅合一',
    subtitle: '罗汉堂演武正殿 · 秘卷全授',
    mandatory: true,
    beats: [
      N('玄苦取来《燃木刀法》完整秘本，将八十一式运劲法门与化解刀中火毒戾气的《法华》禅观逐一为你点明。'),
      S('NPC-0126', '“切记！燃木之火可焚邪魔，亦可灼伤己身。日后每练一遍刀法，须诵一遍《金刚经》以水济火，方能臻至大圆满之境！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_23', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_23: {
    id: 'scene_slq22_23',
    title: '第二十三幕 · 宝刀在握',
    subtitle: '罗汉堂演武正殿 · 誓护少林',
    mandatory: true,
    beats: [
      P('（抚摸着温润沉重的【少林燃木戒刀】，郑重叩首）“弟子定当勤修经义、以禅养刀！此刀在手，凡敢犯我少林法脉与中原正道者，弟子必以烈焰刀风荡除之！”'),
    ],
    onFinishEffects: [openScene('scene_slq22_24', SHAOLIN_Q22_QUEST_ID)],
  },

  scene_slq22_24: {
    id: 'scene_slq22_24',
    title: '第二十四幕 · 薪火长明',
    subtitle: '嵩山少林寺 · 罗汉堂演武正殿',
    mandatory: true,
    beats: [
      N('东方天际泛起鱼肚白，雪后晨光映亮了演武正殿的青石地面。枯菩提木余烬犹温，而你手握【少林燃木戒刀】、身负《燃木刀法》真传，已真正扛起了罗汉堂新一代护法大旗！'),
    ],
    choices: [
      {
        id: 'slq22_complete',
        label: '习得《燃木刀法》并受赠【少林燃木戒刀】，圆满完成【枯木生烟 · 玄苦授刀】',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-052', level: 1 },
          { type: 'giveItem', itemId: 'WPN-013', qty: 1 },
          {
            type: 'giveCombatExp',
            amount: 650,
            reason: '深夜领悟玄苦所授《燃木刀法》，持少林燃木戒刀十合逼退夜袭黑影高手',
          },
          { type: 'addSectContribution', amount: 220 },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 25 },
          { type: 'completeQuest', questId: SHAOLIN_Q22_QUEST_ID, outcome: 'completed' },
          toast(
            '【枯木生烟 · 玄苦授刀】圆满完成！习得《燃木刀法》，获赠地阶上品【少林燃木戒刀】，实战经验 +650、贡献 +220、经义 +2、玄苦好感 +25！',
            'success',
            '枯木生烟',
          ),
        ],
      },
    ],
  },
}
