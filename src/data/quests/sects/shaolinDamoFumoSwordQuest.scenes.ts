import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
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
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-139', move1: 'MA-148', move2: 'MA-128' },
    learnedArts: [
      { artId: 'MA-103', level: 4 },
      { artId: 'MA-139', level: 4 },
      { artId: 'MA-148', level: 4 },
      { artId: 'MA-128', level: 4 },
    ],
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
    equippedArts: { neigong: 'MA-103', qinggong: 'MA-157', move1: 'MA-149', move2: 'MA-148' },
    learnedArts: [
      { artId: 'MA-103', level: 4 },
      { artId: 'MA-157', level: 4 },
      { artId: 'MA-149', level: 4 },
      { artId: 'MA-148', level: 3 },
    ],
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
    talk: '“哼！两个废物竟被个少林小沙弥放倒！且接韩某浸淫二十载的阴风诡剑！”',
    stats: { hp: 1180, mp: 760, agi: 46, res: 28 },
    talents: { bone: 68, comprehension: 66, charm: 42 },
    equippedArts: {
      neigong: 'MA-103',
      qinggong: 'MA-139',
      move1: 'MA-148',
      move2: 'MA-128',
      move3: 'MA-112',
    },
    learnedArts: [
      { artId: 'MA-103', level: 5 },
      { artId: 'MA-139', level: 5 },
      { artId: 'MA-148', level: 6 },
      { artId: 'MA-128', level: 5 },
      { artId: 'MA-112', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq09_01: {
    id: 'scene_slq09_01',
    title: '第一幕 · 绝壁松风',
    subtitle: '达摩院 · 绝壁石刻剑痕崖',
    mandatory: true,
    beats: [
      N('{reignYear}嵩山清秋，少室峰后崖云海翻涌。你既剃度归入达摩院脉，今日卯时便奉首座玄难之召，循着苔痕斑驳的石阶攀上绝壁剑痕崖。'),
      N('崖壁高达十余丈，宛若刀劈斧削。山风自深谷呼啸而上，吹得崖畔古松发出铁马金戈般的低鸣。'),
      S('NPC-0127', '（玄难身披灰布百衲僧袍负手立于悬崖青石上，眉宇间自有一股不怒而威的宗师气象）“阿弥陀佛。你既舍罗汉堂刚猛拳棍，择入我达摩院脉，便须先明白一事——达摩院所修，从来不是逞勇斗狠的杀伐之术，而是借武参禅、以禅驭武。”'),
      P('（合十躬身，目光望向青壁之上纵横交错的深深剑痕）“弟子谨记首座教诲。敢问师伯，这峭壁之上的万千刻痕，莫非皆是前代高僧所留？”'),
    ],
    onFinishEffects: [openScene('scene_slq09_02', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_02: {
    id: 'scene_slq09_02',
    title: '第二幕 · 佛门执剑',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '（颔首轻叹，抬指指向壁上一道深逾三寸、收势却如春风拂柳的斜痕）“世人皆言少林长于棍棒拳掌，却不知自唐初十三棍僧以降，我寺便有《伏魔剑》《达摩剑》传世。只是佛门戒杀，剑乃百兵之君，亦是最易动杀念之器，故历代非心性沉静、经义通明之出家内门弟子，概不轻传。”'),
      P('“既言戒杀，又何以执剑？还请师伯为弟子解惑。”'),
      S('NPC-0127', '“问得好！《大般涅槃经》有云：护持正法者，当执刀剑而无害心。剑在凶人手中，是割裂骨肉之凶器；剑在禅者手中，则如文殊智慧剑，斩的是心中贪嗔痴慢，伏的是世间作恶妖魔——锋出而不伤性命，势尽而知所止，方名『伏魔』！”'),
      N('话音落定，玄难自袖中取出一柄未开血槽、刃口微钝却沉重古朴的玄铁戒剑，递至你掌中。'),
    ],
    onFinishEffects: [openScene('scene_slq09_03', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_03: {
    id: 'scene_slq09_03',
    title: '第三幕 · 石壁剑意',
    subtitle: '绝壁石刻 · 剑痕崖',
    illustrationUrl: '/assets/quests/sl_09_sword_cliff.jpg',
    illustrationCaption: '绝壁剑痕崖 · 玄难指点青壁剑刻，初传少林《伏魔剑》意',
    mandatory: true,
    beats: [
      N('玄难随手折下一截干枯松枝，迎着山风缓缓起手。松枝划过苍茫云雾，初看浑若书生提笔蘸墨，再看却觉每一道斜挑、横截、直点，皆与峭壁上历代高僧留下的剑痕丝丝入扣！'),
      S('NPC-0127', '“看清楚了！《伏魔剑》凡三十六路，贵在『中正平和，刚柔相济，进如雷霆，止若山岳』。起手『白鹤亮翅』守中宫，接『降魔指路』破虚招，再以『韦陀献杵』压敌锋芒，最要紧处在于最后三分回劲——能发能收，方为真剑！”'),
      N('松枝点至青石寸许处骤然停住，枝尖震落三片枯叶，竟齐齐飘落于剑痕凹槽之内，分毫不差！'),
      P('（心神大震，手握沉重玄铁戒剑，细细体味玄难方才笔走龙蛇般的剑路韵律）“原来剑势之中竟藏书法笔意——藏锋于内，露锋于瞬，收锋于寸！”'),
    ],
    onFinishEffects: [openScene('scene_slq09_04', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_04: {
    id: 'scene_slq09_04',
    title: '第四幕 · 独留参悟',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      S('NPC-0127', '（见你一点即透，眼中掠过一抹欣慰）“你悟性颇佳。大雄宝殿午后尚有僧众讲经，老衲先往幽谷石室照看玄澄师兄。你且留在这剑痕崖畔，对照石刻静练三个时辰，莫急着求快，先求每一剑落点如尺量墨画。”'),
      P('“弟子遵命！定当沉心体悟，不敢辜负师伯期许。”'),
      N('玄难负手踏云而去。山崖四下霎时沉寂，唯闻松涛阵阵、飞鸟掠谷，正是静心参剑的绝佳时分。'),
    ],
    choices: [
      {
        id: 'slq09_accept_quest',
        label: '合十送别玄难首座，留驻剑痕崖参悟石刻剑意',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q09_QUEST_ID, stepId: 'study_sword_cliff' },
          setStep(SHAOLIN_Q09_QUEST_ID, 'study_sword_cliff'),
          toast('已开启《剑痕绝壁 · 达摩初剑》！请留在剑痕崖静参石刻剑意。', 'talk', '达摩初剑'),
        ],
      },
    ],
  },

  scene_slq09_05: {
    id: 'scene_slq09_05',
    title: '第五幕 · 笔意入剑',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('你立于青壁三步之外，先不急着出剑，只将手中玄铁戒剑横抱胸前，目光沿着壁上一道道深浅不一的古旧刻痕徐徐游走。'),
      N('细看之下，那些刻痕绝非蛮力劈砍而成：起笔如颜体楷书之沉雄，行锋似怀素狂草之连绵，收剑处却又如枯藤挂壁、戛然而止，竟隐含少林《罗汉伏虎功》蓄劲吐纳之理。'),
      P('（默念《伏魔剑》口诀，手腕微转，戒剑随呼吸递出）“运剑如运笔，气沉丹田则锋不漂，心定如潭则势不乱……”'),
    ],
    choices: [
      {
        id: 'slq09_study_heavy',
        label: '先摹壁上深痕，锤炼「韦陀献杵」沉雄压剑之势',
        subLabel: '以重剑练定力，稳固中宫剑架',
        tone: 'gold',
        effects: [openScene('scene_slq09_06', SHAOLIN_Q09_QUEST_ID)],
      },
      {
        id: 'slq09_study_stop',
        label: '先摹壁上浅痕，锤炼「半寸回锋」骤止收劲之法',
        subLabel: '以巧劲练收势，明悟戒杀伏魔真意',
        tone: 'default',
        effects: [openScene('scene_slq09_06', SHAOLIN_Q09_QUEST_ID)],
      },
    ],
  },

  scene_slq09_06: {
    id: 'scene_slq09_06',
    title: '第六幕 · 山径恶客',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('不过一炷香工夫，你的剑路已渐渐褪去初学时的生涩，戒剑破风时不再发出刺耳锐啸，反而带着一股低沉浑厚的禅钟余韵。'),
      N('就在你收剑吐气之际，崖下石阶忽传来一阵刺耳的狂笑与铁鞘磕石之声！三道身着玄黑劲装、腰佩窄刃长剑的阴鸷身影，竟大摇大摆闯入达摩院禁地！'),
      S(SPEAKER_CAO_XIAO, '（仰天嗤笑，手中长剑斜指崖壁石刻）“哈哈哈哈！韩大哥快瞧，少林寺这群秃驴果然越活越回去了——堂堂禅林禁地，竟放着个小沙弥拿根烧火铁棍在这儿比划剑法！”'),
      S(SPEAKER_WEI_QI, '（舔了舔嘴唇，阴恻恻地扫过你的灰布僧衣）“听说达摩院藏着什么《伏魔剑》？笑掉大牙！和尚只配敲木鱼、念往生咒，也配碰我们江湖剑客的兵器？”'),
    ],
    onFinishEffects: [openScene('scene_slq09_07', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_07: {
    id: 'scene_slq09_07',
    title: '第七幕 · 关西三邪',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('为首那名面色青白、双目狭长的中年剑客慢步踏上崖顶，手中三尺青锋虽未出鞘，周身却透出一股阴冷毒辣的剑气。'),
      S(SPEAKER_HAN_LI, '（冷哼一声，抱臂傲立）“关西三邪剑首韩厉，今日特来领教少林剑法！十年前我在陇右败于一名少林游方老僧剑下，憋了整整十载恶气。如今听闻嵩山达摩院后继无人，特带两位义弟上山——若连这崖上几道破石刻都护不住，少林不如趁早封剑认输！”'),
      P('（双眉微蹙，将玄铁戒剑横于身前，沉声喝道）“阿弥陀佛！此乃少林达摩院禁地，三位施主既不递帖知客院，又口出狂言欲毁先贤石刻，未免太失江湖礼数！”'),
      S(SPEAKER_HAN_LI, '（嘴角扯出一抹残忍冷笑）“礼数？剑客之间，剑快便是礼数！小和尚，你这根没开刃的破铁条也叫剑？曹枭、魏七，先去把他手里那截废铁挑飞，再替我把这块『剑痕崖』削成光板！”'),
    ],
    onFinishEffects: [openScene('scene_slq09_08', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_08: {
    id: 'scene_slq09_08',
    title: '第八幕 · 护崖立剑',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('曹枭与魏七齐声怪笑，「呛啷」两声掣出寒光森森的窄刃剑，一左一右踩着刁钻步法欺身围拢！二人剑尖吞吐不定，专挑咽喉、肋下、膝弯等阴毒要害，显然是常年在关西黑道杀人越货的惯匪！'),
      P('（心中非但不惧，反觉方才观崖所得的禅意愈发澄明）“师伯方才言道：剑在凶人手中是凶器，在禅者手中则伏外魔。三位施主既执迷不悟，小僧便以手中戒剑，领教关西剑术！”'),
      S(SPEAKER_CAO_XIAO, '“好个不知死活的小秃驴！看剑！”'),
    ],
    choices: [
      {
        id: 'slq09_prepare_battle',
        label: '沉腰立剑，以《伏魔剑》起手式迎战关西邪剑！',
        tone: 'danger',
        effects: [
          setStep(SHAOLIN_Q09_QUEST_ID, 'repel_guanxi_swords'),
          openScene('scene_slq09_09', SHAOLIN_Q09_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq09_09: {
    id: 'scene_slq09_09',
    title: '第九幕 · 诡刺合击',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('山风骤紧！曹枭纵身半空，一式「断魂劈空」直削你天灵盖；同一刹那，魏七贴地滑步，手中冷蛇剑如毒蛇出洞，悄无声息斜刺你左膝弯！'),
      N('上下夹攻、一明一暗，若是寻常初学剑者，只怕一招之间便要顾此失彼！'),
      P('（脚踏达摩院四平禅步，不退反进，玄铁戒剑划出一道浑圆剑弧）“来得好！看我少林《伏魔剑》——白鹤亮翅！”'),
    ],
    onFinishEffects: [openScene('scene_slq09_10', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_10: {
    id: 'scene_slq09_10',
    title: '第十幕 · 双邪合围',
    subtitle: '剑痕崖实战（1v2 破诡刺）',
    mandatory: true,
    beats: [
      N('断魂剑曹枭与冷蛇剑魏七双剑交织成一张阴森剑网，寒光映着绝壁青石步步紧逼。你凝神守中，以戒剑沉雄剑脊架开诡刺！'),
    ],
    choices: [
      {
        id: 'slq09_fight_duo',
        label: '挥戒剑迎战曹枭与魏七！（1v2 实战）',
        subLabel: '连破关西二邪剑的诡刺合击',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q09_QUEST_ID,
            opponent: { kind: 'custom', npc: buildCaoXiao() },
            extraOpponents: [{ kind: 'custom', npc: buildWeiQi() }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是达摩院历代先贤剑刻，岂容邪徒亵渎！',
            introText: '【1v2 剑痕崖护刻】迎战关西邪剑【断魂剑 · 曹枭】与【冷蛇剑 · 魏七】！',
            onWin: [
              { type: 'setFlag', flag: 'sl_q09_minions_cleared', value: true },
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              openScene('scene_slq09_11', SHAOLIN_Q09_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('双邪诡刺刁钻，退回崖石畔调匀气息后再战！', 'warn', '达摩初剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq09_11: {
    id: 'scene_slq09_11',
    title: '第十一幕 · 震落双锋',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('“铛——铛——”两声金铁交鸣震彻山谷！你以玄铁戒剑沉稳剑脊斜磕曹枭剑腹，借反震之力顺势下压，一式「韦陀献杵」精准震在魏七腕脉寸关之上！'),
      N('曹枭虎口迸裂，长剑脱手插进三丈外松干；魏七整条右臂酸麻欲断，踉跄跌坐青石，满脸骇然！'),
      S(SPEAKER_CAO_XIAO, '（捂着手腕连连后退）“这……这秃驴的剑怎么重得像铁柱，偏偏转折又快得跟活物一样！”'),
      S(SPEAKER_HAN_LI, '（脸色骤沉，再无半分轻视，缓缓拔出腰间泛着幽蓝寒光的阴风剑）“好小子，竟真有几分达摩院的门道！两个废物退下，待韩某亲自称称你的斤两！”'),
    ],
    onFinishEffects: [openScene('scene_slq09_12', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_12: {
    id: 'scene_slq09_12',
    title: '第十二幕 · 阴风诡剑',
    subtitle: '剑痕崖决战（1v1 阴风剑韩厉）',
    illustrationUrl: '/assets/quests/sl_09_fumo_sword_duel.jpg',
    illustrationCaption: '剑痕崖决锋 · 玄铁戒剑直破阴风诡刺，禅心不动伏邪剑',
    mandatory: true,
    beats: [
      N('韩厉身形一晃，竟如鬼魅般贴着崖风扑至！阴风剑抖出七朵凄厉剑花，忽左忽右、真假难辨，每一道寒芒皆挟带着森冷阴劲，直取你周身大穴！'),
      P('（深吸一口山谷清气，脑海中陡然浮现玄难折松点壁之姿——任你千变万化，我自一剑守中！）“韩施主剑虽快，却失之偏邪！接小僧一式《伏魔剑》！”'),
    ],
    choices: [
      {
        id: 'slq09_fight_hanli',
        label: '执戒剑正面迎战关西邪剑首「阴风剑 · 韩厉」！（1v1 决战）',
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
            onWin: [openScene('scene_slq09_13', SHAOLIN_Q09_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 85, mpPct: 85 },
              toast('韩厉阴风剑路诡谲难测，暂且收剑凝神，再观石刻剑意复战！', 'warn', '达摩初剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq09_13: {
    id: 'scene_slq09_13',
    title: '第十三幕 · 眉心半寸',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('二十余合激战过后，韩厉越攻越急，阴风剑招渐现破绽，猛然使出一招同归于尽的「阴风穿心」，不顾空门直刺你胸膛！'),
      N('千钧一发之际，你脚踩偏步、戒剑由下而上划出一道圆融弧光，「当」的一声格偏阴风剑锋，随即手腕疾抖、剑走中宫——玄铁戒剑化作一道乌黑流光直点韩厉面门！'),
      N('韩厉瞳孔骤缩，浑身汗毛倒竖，眼睁睁看着那柄沉重戒剑挟风而来，却在距离自己眉心仅仅半寸之处——戛然而止！'),
      N('凛冽剑风掠过他眉梢，削断两根额发飘落青石，剑尖却稳如磐石，未伤分毫皮肉！'),
    ],
    onFinishEffects: [openScene('scene_slq09_14', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_14: {
    id: 'scene_slq09_14',
    title: '第十四幕 · 弃剑伏首',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('死一般的寂静笼罩剑痕崖。冷汗顺着韩厉青白的鬓角滚落，他僵立良久，终于「咣当」一声松手抛下阴风剑，双膝微软，颓然抱拳。'),
      S(SPEAKER_HAN_LI, '（声音干涩颤抖）“半寸收锋……连锋刃劲风都收得干干净净。若是方才你手腕再往前送半分，韩某早已是个死人了。少林伏魔剑……果然名不虚传，韩某心服口服！”'),
      P('（缓缓收回戒剑，单掌竖于胸前合十）“阿弥陀佛。佛门戒剑只伏魔心，不取人命。三位施主既知进退，便请下山去吧，切莫再于关西倚剑作恶。”'),
      N('韩厉深望你一眼，捡起地上长剑，拉起面如土色的曹枭与魏七，头也不回地狼狈退下山阶。'),
    ],
    onFinishEffects: [openScene('scene_slq09_15', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_15: {
    id: 'scene_slq09_15',
    title: '第十五幕 · 首座颔首',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('三邪剑身影刚没入山雾，崖畔苍松后忽传来一声清越佛号。原来玄难首座早已察觉山径异动，静立暗处观战多时。'),
      S('NPC-0127', '（步出松阴，脸上露出难得的温和笑意）“善哉，善哉！方才那一剑止于眉心半寸，既挫尽关西邪剑锐气，又不沾半分血腥戾气——你已真正懂得何谓『伏魔』二字。”'),
      P('（双手捧起玄铁戒剑，恭敬呈还）“全赖师伯先以石壁剑意开示，弟子方能在危急关头守住心神，不致落入对方诡剑圈套。”'),
      S('NPC-0127', '“不必谦逊。这柄玄铁戒剑你且留着日常习练。至于《伏魔剑》全本三十六路剑诀与内劲法门，今日便正式传授予你！”'),
    ],
    onFinishEffects: [openScene('scene_slq09_16', SHAOLIN_Q09_QUEST_ID)],
  },

  scene_slq09_16: {
    id: 'scene_slq09_16',
    title: '第十六幕 · 达摩初传',
    subtitle: '绝壁石刻 · 剑痕崖',
    mandatory: true,
    beats: [
      N('玄难取出一册泛黄线装的《伏魔剑诀》交到你手中，又指着峭壁上那道历代禅师留下的剑痕沉声叮嘱：'),
      S('NPC-0127', '“达摩院脉历来重禅悟、重书棋辩才，更重临敌不乱之定力。你既踏出第一步，往后须勤诵经义、涵养笔墨棋心，待根基再厚，老衲自会引你参悟更高深的达摩院绝学。”'),
      P('（双手接过《伏魔剑诀》，合十长揖）“弟子谨遵首座法谕，必不负达摩院传承！”'),
    ],
    choices: [
      {
        id: 'slq09_complete',
        label: '拜谢玄难首座，正式领受《伏魔剑》传承',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-110' },
          { type: 'giveCombatExp', amount: 260, reason: '剑痕崖悟剑连破关西三邪剑' },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 12 },
          { type: 'completeQuest', questId: SHAOLIN_Q09_QUEST_ID, outcome: 'completed' },
          toast('已完成《剑痕绝壁 · 达摩初剑》，习得《伏魔剑》！', 'success', '达摩初剑'),
        ],
      },
    ],
  },
}
