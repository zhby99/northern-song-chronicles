import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { SHAOLIN_Q17_QUEST_ID } from './shaolinLaymanXiangguoQuest'

const SPEAKER_HERB_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '老药商 · 孙德顺',
  title: '相国寺西廊药铺掌柜',
  factionName: '汴京商贾',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_WAZI_HOST: StorySpeakerSpec = {
  kind: 'custom',
  name: '陆掌柜',
  title: '瓦子说书茶肆东家 · 市井包打听',
  factionName: '汴京商贾',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_TRAITOR_CLERK: StorySpeakerSpec = {
  kind: 'custom',
  name: '刁三',
  title: '被逐知客杂役 · 青蛇帮内应',
  factionName: '青蛇帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_SNAKE_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '青蛇堂香主 · 过街鼠老六',
  title: '青蛇帮悍匪头目',
  factionName: '青蛇帮',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_QIAN_WU: StorySpeakerSpec = {
  kind: 'custom',
  name: '毒蛇钱五',
  title: '青蛇帮主',
  factionName: '青蛇帮',
  portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
}

function buildSnakeThugA(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_THUG_A',
    name: '青蛇帮恶徒 · 铁棒张',
    title: '瓦子打手',
    realm: '三流上品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇帮众',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“少林俗家狗腿子也敢管汴京瓦子的规矩？先吃爷爷一记断门刀！”',
    stats: { hp: 920, mp: 580, agi: 39, res: 22 },
    talents: { bone: 56, comprehension: 38, charm: 24 },
    equippedArts: { neigong: 'MA-179', move1: 'MA-189', move2: 'MA-182' },
    learnedArts: [{ artId: 'MA-179', level: 4 }, { artId: 'MA-189', level: 4 }, { artId: 'MA-182', level: 4 }],
  })
}

function buildSnakeThugB(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_THUG_B',
    name: '青蛇堂香主 · 过街鼠老六',
    title: '青蛇帮头目',
    realm: '二流下品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇香主',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“相国寺这片肥肉五爷盯了半年，今日谁拦路便剁谁的手！”',
    stats: { hp: 1180, mp: 820, agi: 44, res: 27 },
    talents: { bone: 60, comprehension: 44, charm: 28 },
    equippedArts: { neigong: 'MA-123', move1: 'MA-131', move2: 'MA-125' },
    learnedArts: [{ artId: 'MA-123', level: 5 }, { artId: 'MA-131', level: 5 }, { artId: 'MA-125', level: 4 }],
  })
}

function buildQianWuBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_QIAN_WU',
    name: '毒蛇钱五',
    title: '青蛇帮主',
    realm: '二流中品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇帮主',
    avatarUrl: '/assets/characters/templates/tpl_unorthodox_master_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_unorthodox_master_fb.jpg',
    talk: '“嘿嘿，嵩山派来的带发护法？老子在汴京瓦子混迹二十年，倒要看看少林刀杖能不能破我这双毒砂鬼头刀！”',
    stats: { hp: 1580, mp: 1180, agi: 49, res: 34 },
    talents: { bone: 66, comprehension: 52, charm: 34 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-151', move2: 'MA-125' },
    learnedArts: [{ artId: 'MA-140', level: 6 }, { artId: 'MA-151', level: 6 }, { artId: 'MA-125', level: 5 }],
  })
}

function buildQianWuGuard(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ17_QIAN_GUARD',
    name: '青蛇护法 · 独眼豹',
    title: '瓦子死士',
    realm: '二流下品',
    factionName: '青蛇帮',
    sectRank: 0,
    sectRankLabel: '青蛇护法',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“五爷莫慌，小的从旁封死这小子的退路！”',
    stats: { hp: 1120, mp: 760, agi: 43, res: 26 },
    talents: { bone: 58, comprehension: 40, charm: 22 },
    equippedArts: { neigong: 'MA-140', move1: 'MA-150', move2: 'MA-146' },
    learnedArts: [{ artId: 'MA-140', level: 5 }, { artId: 'MA-150', level: 5 }, { artId: 'MA-146', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq17_01: {
    id: 'scene_slq17_01',
    title: '第一幕 · 东出汴京',
    subtitle: '开封府 · 大相国寺万姓交易雅市',
    illustrationUrl: '/assets/quests/sl_17_xiangguo_market.jpg',
    illustrationCaption: '大相国寺万姓雅市 · 慧照、卫弘龙与郑刚共议护持寺院商铺',
    mandatory: true,
    beats: [
      N('{reignYear}春深，汴京城柳絮如烟。你既在嵩山择定少林【俗家护法脉】，蓄发束巾、着青布劲装，怀揣方丈法谕东来驻守东京大相国寺。此间每月五开万姓交易雅市，飞禽药材、古玩素斋绵延东西两廊，繁华冠绝十里长街。'),
      N('西廊古槐下，面庞刚毅如铁的金刚僧【慧照】与佩刀束袖的俗家师兄【卫弘龙】、赤发如焰的【郑刚】正凝眉眺望熙攘摊棚。慧照接过法谕合十赞许，引你与二位同门相见。'),
      S('NPC-0273', '（神色转肃，压低嗓音）“相国寺与嵩山同出一脉，东西两廊三百余座商铺的租契香火，多半用来接济汴京孤寡。可近两月来，城南瓦子的地头蛇【青蛇帮】买通寺中逐出的败类杂役刁三，伪造朱印租契，强向药铺素斋摊加收三成『青蛇平安钱』！”'),
      S('NPC-0728', '（按住腰间银枪刀柄冷哼）“那帮主『毒蛇钱五』狡兔三窟，专挑出家师父不便当街厮缠的空当砸摊泼粪；若官府来查，又拿假铺契倒打一耙！这等红尘恶仗，正该由咱们俗家护法来破！”'),
      S('NPC-0570', '（指向西廊喧哗处）“听说刁三此刻又领人往西廊孙老掌柜药铺去了。你先随咱们巡察西廊、摸清钱五在瓦子的藏身赌坊与换班时辰，查实后速往大雄宝殿香云宝鼎拜见慧照师叔，师叔另有护法刀杖绝学相授！”'),
    ],
    choices: [
      {
        id: 'slq17_accept_quest',
        label: '抱拳领命，动身巡查西廊药铺与瓦子市井暗访青蛇帮',
        subLabel: '开启《相国暗影 · 红尘刀杖》，先往相国寺万姓交易雅市查访',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q17_QUEST_ID, stepId: 'market_patrol' },
          setStep(SHAOLIN_Q17_QUEST_ID, 'market_patrol'),
          toast('已开启《相国暗影 · 红尘刀杖》！请在【相国寺万姓交易雅市】查访西廊与瓦子茶棚！', 'talk', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_02: {
    id: 'scene_slq17_02',
    title: '第二幕 · 瓦子暗访',
    subtitle: '相国寺西廊与瓦子茶棚（红尘人脉三策）',
    mandatory: true,
    beats: [
      N('你随卫弘龙、郑刚赶至西廊孙记药铺，果见药草撒落满地！被逐杂役刁三踩着药柜晃着假朱印契，逼迫须发花白的老药商孙德顺交出三十两地皮钱。'),
      S(SPEAKER_HERB_MERCHANT, '（死死抱住药秤老泪纵横）“刁三爷，老汉铺租前日才交清给知客堂，白纸黑字有印信，怎能凭一张假契便拆我半生家业！”'),
      S(SPEAKER_TRAITOR_CLERK, '（见你大步踏前喝破其偷盗香油被逐旧案，顿时脸色惨白、连滚带爬钻入人潮，临逃还尖叫放狠话）“少林俗家狗腿子等着！五爷今夜在城南瓦子赌坊聚齐死士，叫你们西廊三十家铺子片瓦不存！”'),
      N('卫弘龙与郑刚连忙扶起孙老掌柜稳住受惊商户。你却转出西廊踏入紧邻相国寺的汴京瓦子——茶肆棋棚里三教九流混杂，既有手眼通天的市井牙人与爱下残局的茶肆陆掌柜，街口亦见青蛇堂香主「过街鼠老六」带着打手耀武扬威。欲摸清毒蛇钱五的赌坊后门暗道与外围换班时辰，你决定——'),
    ],
    choices: [
      {
        id: 'slq17_intel_silver',
        label: '【银钱买消息】掷出 20 两纹银打赏瓦子茶棚牙人与说书先生，买通赌坊暗道图！',
        subLabel: '花费 20 两银探得后门暗道与换班时辰，夜袭时可避开外围死士直擒钱五 1v1',
        tone: 'gold',
        condition: { type: 'silverAtLeast', min: 20 },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_intel_paid', op: 'falsy' },
            thenEffects: [
              { type: 'giveSilver', amount: -20, reason: '在汴京瓦子茶棚打赏牙人与说书先生购买青蛇帮暗道情报' },
              { type: 'setFlag', flag: 'sl_q17_intel_paid', value: true },
            ],
            elseEffects: [],
          },
          { type: 'setFlag', flag: 'sl_q17_wazi_intel', value: true },
          { type: 'setFlag', flag: 'sl_q17_intel_mode', value: 'silver' },
          openScene('scene_slq17_03', SHAOLIN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'slq17_intel_wit',
        label: '【辩才棋艺套话】与瓦子茶肆陆掌柜手谈一局，借棋局话锋套出青蛇帮暗线！',
        subLabel: '分文不花套出暗道与换班时辰，夜袭可直擒钱五 1v1（禅心慈悲 +1）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需十艺【辩才】≥ 40 或【棋】≥ 30',
          conditions: [
            { type: 'skillAtLeast', key: '辩才', min: 40 },
            { type: 'skillAtLeast', key: '棋', min: 30 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q17_wazi_intel', value: true },
          { type: 'setFlag', flag: 'sl_q17_intel_mode', value: 'wit' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_patrol_karma_counted', op: 'falsy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
              { type: 'setFlag', flag: 'sl_q17_patrol_karma_counted', value: true },
            ],
            elseEffects: [],
          },
          openScene('scene_slq17_03', SHAOLIN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'slq17_intel_brawl',
        label: '【仗义直闯瓦子街】懒与市井狐鼠周旋！径直截住巡街的过街鼠老六硬逼下落！',
        subLabel: '无门槛正攻：当街车轮连战青蛇帮巡街头目逼问巢穴（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_q17_intel_mode', value: 'brawl' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_patrol_karma_counted', op: 'falsy' },
            thenEffects: [
              { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
              { type: 'setFlag', flag: 'sl_q17_patrol_karma_counted', value: true },
            ],
            elseEffects: [],
          },
          openScene('scene_slq17_04', SHAOLIN_Q17_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq17_03: {
    id: 'scene_slq17_03',
    title: '第三幕 · 茶棚暗线',
    subtitle: '汴京瓦子茶肆（市井智探线）',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q17_intel_mode=silver|你将二十两雪花碎银不动声色推过茶案，一旁的说书先生与茶肆牙人眼珠一亮，笑眯眯地替你续上热茶，借着惊堂木掩护悄然递过一张炭笔草图。|你微笑落座，与陆掌柜手谈一局「双龙盘玉」残局，棋子落定间顺势谈及相国寺护法清剿恶帮、开封府严缉假契重罪。早苦于青蛇帮勒索茶税的陆掌柜眸光一闪，借提子之机用茶水在案上画出一条窄巷路线。}'),
      S(SPEAKER_WAZI_HOST, '（压低嗓音，神色老辣）“{gender:少侠|女侠}听真：毒蛇钱五的老巢就在城南瓦子最深处的『聚宝暗坊』，正门常年守着二流死士独眼豹与十余名打手。唯有后巷柴房藏着一扇运炭矮门，每日二更三刻正是独眼豹换班吃酒的空当——从柴房穿廊直抵内堂，保准能堵钱五一个单人独刀！”'),
      P('（心头豁然，记牢柴房暗道方位与换班时辰，拱手致谢）“多谢指点迷津！今夜之后，这相国寺西廊与瓦子茶棚必无青蛇横行之忧！”'),
      S('NPC-0728', '（归来听罢大喜过望，一拍你肩头）“好手段！果然红尘办差不能光靠蛮力！快把假契案情与暗道草图带去【大雄宝殿（香云宝鼎）】面见慧照师叔，领受护法刀杖绝学！”'),
    ],
    choices: [
      {
        id: 'slq17_intel_to_hall',
        label: '收妥瓦子暗道情报，前往【大雄宝殿（香云宝鼎）】拜见慧照禅师',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q17_QUEST_ID, 'hall_training'),
          toast('已探得聚宝暗坊后门暗道与换班时辰！请前往【大雄宝殿（香云宝鼎）】拜见慧照禅师！', 'success', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_04: {
    id: 'scene_slq17_04',
    title: '第三幕 · 街口逼供',
    subtitle: '汴京瓦子街口（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('你大步踏出茶棚，迎面截住正勾肩搭背在瓦子街口强收摊税的青蛇堂香主「过街鼠老六」与恶徒「铁棒张」！四周商贩惊呼四散，卫弘龙与郑刚横刀拦住外围喽啰。'),
      S(SPEAKER_SNAKE_THUG, '（狞笑抽出鬼头短刀，挥手示意铁棒张包抄）“原来是嵩山新派来的俗家小护法！五爷正嫌没个垫刀的，先卸你两条胳膊挂到相国寺山门上！”'),
      P('（稳扎少林四平马步，目光如炬）“少废话！打服你们两个，自然有人开口交代钱五的狗窝在哪儿！”'),
    ],
    choices: [
      {
        id: 'slq17_fight_thugs',
        label: '当街挺身迎战【过街鼠老六】与【铁棒张】！（车轮连战 实战）',
        subLabel: '击溃巡街恶徒，逼问毒蛇钱五藏身赌坊下落',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSnakeThugA() },
            extraOpponents: [{ kind: 'custom', npc: buildSnakeThugB() }],
            rule: 'story_trial',
            forbidEscapeReason: '满街商贾皆在身后，俗家护法岂能临阵退缩！',
            introText: '【车轮连战 · 瓦子擒恶】迎战青蛇帮恶徒【铁棒张】与香主【过街鼠老六】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq17_05', SHAOLIN_Q17_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('青蛇帮双匪招式阴毒，暂退茶棚调息后再来截住他们！', 'warn', '瓦子擒恶'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq17_05: {
    id: 'scene_slq17_05',
    title: '第四幕 · 蛇尾惊逃',
    subtitle: '汴京瓦子街口',
    mandatory: true,
    beats: [
      N('十余合激斗，你震飞铁棒张手中钢刀、反手擒拿卸脱过街鼠老六腕骨，将二人双双扫翻青石阶下！'),
      S(SPEAKER_SNAKE_THUG, '（痛得满头冷汗，哆嗦招认后趁乱钻进暗巷）“别打了！五爷今夜二更在城南瓦子深处的聚宝暗坊备了桐油火把，要烧西廊药铺！独眼豹带死士守着大门，有种你今夜便来送死！”'),
      S('NPC-0570', '（拾起恶徒落下的假朱印契，神色凝重）“好俊的身手！不过打草惊了蛇，钱五今晚定会把死士全撤回聚宝暗坊死守。速去【大雄宝殿（香云宝鼎）】禀报慧照师叔，领受护法刀杖绝学再破贼巢！”'),
    ],
    choices: [
      {
        id: 'slq17_brawl_to_hall',
        label: '携假印契前往【大雄宝殿（香云宝鼎）】禀报慧照禅师',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q17_QUEST_ID, 'hall_training'),
          toast('已逼问出青蛇帮聚宝暗坊下落！请前往【大雄宝殿（香云宝鼎）】拜见慧照禅师！', 'success', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_06: {
    id: 'scene_slq17_06',
    title: '第五幕 · 香云双授',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('大雄宝殿香云宝鼎檀烟袅袅，金色佛像慈目低垂。慧照禅师听罢禀报，神色赞许：“{ifFlag:sl_q17_wazi_intel|阿弥陀佛！你能善用红尘人脉摸清贼巢暗道，正合俗家护法智勇兼修之道。|阿弥陀佛！你当街挫败青蛇悍党、逼出贼人火烧西廊阴谋，颇显少林护法果决。}”'),
      N('慧照起身取过殿柱旁熟铜禅杖与一口戒刀，步走莲花，先将熟铜禅杖舞得气浪层叠，挑、拨、扫、压之间护得周身水泼不进，竟将飘落香灰齐齐震偏三尺之外！'),
      S('NPC-0273', '“毒蛇钱五曾是河朔绿林出身，双刀蘸有寒毒。今日老衲破例双授你少林俗家护法绝学——其一《普门杖法》，取《普门品》『慈眼视众生』之意，『普度慈航』横扫破围、『立地成佛』沉劲封喉，专克暗巷围攻与阴毒暗器！”'),
      N('禅杖方收，慧照戒刀出鞘如秋水明澈，劈砍之间无半分暴戾，收刀回转处暗藏三叠震劲，竟将两片枯叶齐齐震作两半而不伤叶脉！'),
      S('NPC-0273', '“其二《慈悲刀法》！讲究『刀背制敌、刀锋断恶』——遇胁从之徒以刀背震晕留其性命，遇穷凶极恶之首则一刀断刃、直取中宫！你且接过刀杖依诀演练，记准运劲法门！”'),
    ],
    onFinishEffects: [
      teachArtNow('MA-117'),
      teachArtNow('MA-114'),
      openScene('scene_slq17_07', SHAOLIN_Q17_QUEST_ID),
    ],
  },

  scene_slq17_07: {
    id: 'scene_slq17_07',
    title: '第六幕 · 暮鼓誓心',
    subtitle: '大雄宝殿檐下 · 战前立意',
    mandatory: true,
    beats: [
      N('你在香云宝鼎前反复演练三遍，臂腕沉实、气息浑圆，已将《普门杖法》与《慈悲刀法》起手要诀尽数融通。暮鼓骤沉之际，郑刚急步入殿报称钱五已集结桐油火把，欲于二更天放火烧毁西廊药铺！'),
      S('NPC-0273', '“卫弘龙、郑刚即刻率护院武僧暗守西廊水缸与商铺门户，防贼调虎离山；你且带发提刀夜赴瓦子聚宝暗坊擒王！只是刀杖既已入手，老衲想先问你一句：身在红尘执利刃，你心中所守的护法之道究为何物？”'),
      N('檐外华灯初上，汴京夜风吹动你的青布护法衣袂。你按住腰间戒刀与手中禅杖，朗声作答——'),
    ],
    choices: [
      {
        id: 'slq17_vow_mercy',
        label: '【杖护苍生 · 慈悲留线】刀背制敌不滥杀，唯求相国寺三百商户安稳营生！（禅心慈悲 +1）',
        subLabel: '怀慈悲心行护法事，动身前往相国寺后巷瓦子',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q17_vow', value: 'mercy' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 1 },
          setStep(SHAOLIN_Q17_QUEST_ID, 'wazi_showdown'),
          toast('已领悟《普门杖法》与《慈悲刀法》！请速返【相国寺万姓交易雅市】夜荡瓦子暗坊！', 'talk', '红尘刀杖'),
        ],
      },
      {
        id: 'slq17_vow_wrath',
        label: '【刀断尘恶 · 霹雳降魔】市井恶徒畏威不怀德，当以雷霆刀势立少林俗家威名！（怒目杀业 +1）',
        subLabel: '以霹雳手段镇红尘宵小，动身前往相国寺后巷瓦子',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q17_vow', value: 'wrath' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          setStep(SHAOLIN_Q17_QUEST_ID, 'wazi_showdown'),
          toast('已领悟《普门杖法》与《慈悲刀法》！请速返【相国寺万姓交易雅市】夜荡瓦子暗坊！', 'talk', '红尘刀杖'),
        ],
      },
    ],
  },

  scene_slq17_08: {
    id: 'scene_slq17_08',
    title: '第七幕 · 红尘刀杖',
    subtitle: '瓦子聚宝暗坊 · 二更三刻（奇正破局）',
    illustrationUrl: '/assets/quests/sl_17_wazi_brawl.jpg',
    illustrationCaption: '瓦子暗巷 · 带发提刀使出普门杖法与慈悲刀法，力战毒蛇钱五',
    mandatory: true,
    beats: [
      N('二更三刻，白日喧嚣的万姓雅市沉入夜幕，唯有后巷瓦子「聚宝暗坊」幽灯摇曳。内堂太师椅上，嘴角带疤的青蛇帮主【毒蛇钱五】正慢条斯理擦拭蘸毒鬼头刀，阴笑着催促帮众备好桐油火把。'),
      S(SPEAKER_QIAN_WU, '“今夜一把火烧光西廊药铺，看相国寺那帮老和尚还敢不敢跟老子摆谱！独眼豹，盯死正门巷口，谁敢露头直接剁了！”'),
      N('{ifFlag:sl_q17_wazi_intel|你借瓦子情报绕至后巷柴房，果见运炭矮门虚掩、独眼豹正于外堂饮酒换班，直通内堂之路竟空无一人！|正门巷口火把森严，死士独眼豹横刀立于门侧，与内堂毒蛇钱五互为犄角！}'),
      P('（左手普门禅杖、右手慈悲戒刀，体内少林内劲如潮涌动）“钱五，你不必去西廊找我了——少林俗家护法在此！”'),
    ],
    choices: [
      {
        id: 'slq17_boss_stealth',
        label: '【暗道奇袭 · 直擒钱五】由后门柴房暗道雷霆突入，跳过外围死士 1v1 独战毒蛇钱五！',
        subLabel: '依托瓦子暗线情报，避开独眼豹直取二流中品帮主【毒蛇钱五】',
        tone: 'jade',
        condition: {
          type: 'flag',
          flag: 'sl_q17_wazi_intel',
          op: 'truthy',
          label: '已探得瓦子赌坊后门暗道与换班时辰',
        },
        effects: [
          teachArtNow('MA-117'),
          teachArtNow('MA-114'),
          { type: 'setFlag', flag: 'sl_q17_boss_tactic', value: 'stealth' },
          {
            type: 'startCombat',
            questId: SHAOLIN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQianWuBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '毒蛇钱五近在咫尺，今夜若纵虎归山，西廊药铺必遭火劫！',
            introText: '【1v1 暗道奇袭】你自柴房暗道雷霆杀入内堂，避开独眼豹独战青蛇帮主【毒蛇钱五】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq17_09', SHAOLIN_Q17_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('毒蛇钱五双刀阴毒，暂退柴房暗巷调匀内息后再战！', 'warn', '夜荡青蛇'),
            ],
          },
        ],
      },
      {
        id: 'slq17_boss_frontal',
        label: '【破门硬闯 · 刀杖降魔】一杖轰碎赌坊木门，车轮连战独眼豹与毒蛇钱五！',
        subLabel: '无门槛正攻：先破护法【独眼豹】，再擒帮主【毒蛇钱五】（车轮连战）',
        tone: 'danger',
        effects: [
          teachArtNow('MA-117'),
          teachArtNow('MA-114'),
          { type: 'setFlag', flag: 'sl_q17_boss_tactic', value: 'frontal' },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q17_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQianWuGuard() },
            extraOpponents: [{ kind: 'custom', npc: buildQianWuBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '毒蛇钱五近在咫尺，今夜若纵虎归山，西廊药铺必遭火劫！',
            introText: '【车轮连战 · 瓦子决战】破门直入聚宝暗坊，迎战死士【独眼豹】与帮主【毒蛇钱五】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq17_09', SHAOLIN_Q17_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('青蛇帮双凶夹击凶狠，先退回巷口稳住气血再战！', 'warn', '夜荡青蛇'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq17_09: {
    id: 'scene_slq17_09',
    title: '第八幕 · 断刃伏诛',
    subtitle: '瓦子聚宝暗坊内堂',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_q17_boss_tactic=stealth|你自后门暗道奇袭暴起，独眼豹尚未回援，毒蛇钱五便已被你《普门杖法》锁死退路、慈悲刀背重拍手腕麻筋，双鬼头刀当啷坠地！|二十余合刀杖齐施，独眼豹被你一式「普度慈航」震断臂骨昏死在地；毒蛇钱五欲撒毒砂逃遁，反被你抢步踏中宫，以慈悲刀背拍麻腕筋、双刀脱手！}'),
      S(SPEAKER_QIAN_WU, '（面如死灰跪倒青砖，浑身抖如筛糠）“大侠饶命！小的有眼不识泰山，再也不敢打相国寺商铺的主意了……”'),
      N('巷口火把通明，卫弘龙、郑刚已率开封府巡街厢军赶到，将毒蛇钱五、刁三及一众青蛇首恶尽数上枷押走，满地桐油火把化险为夷。'),
      N('清点暗坊账房时，郑刚自太师椅后的暗格里拖出一只沉甸甸的樟木铁箱——箱中竟是青蛇帮近两月强征西廊三十余户商贩的一百二十余两「平安钱」赃银，连同逐户勒索账册一应俱全！'),
    ],
    onFinishEffects: [openScene('scene_slq17_10', SHAOLIN_Q17_QUEST_ID)],
  },

  scene_slq17_10: {
    id: 'scene_slq17_10',
    title: '第九幕 · 赃银归处',
    subtitle: '相国寺万姓交易雅市 · 次日清晨（红尘抉择）',
    mandatory: true,
    beats: [
      N('次日清晨，相国寺万姓雅市再开大集。青蛇帮一夜覆灭的消息传遍汴京城南，西廊三十余家药铺素斋摊张灯结彩，孙老掌柜与众商贾捧着清茶涌来拱手拜谢。'),
      S('NPC-0728', '（抚着那只樟木赃银箱，压低声音笑问）“{gender:师弟|师妹}，这役你是头功。开封府巡检念我少林护市有劳，已把这箱赃银与账册交由咱们自行发落商户。不过说句实在话，咱们俗家护法常年奔走红尘打探线报、置办刀杖，处处都离不得银钱……”'),
      S('NPC-0570', '（抱臂咧嘴一笑）“按官面规矩或江湖规矩，全看你一句话——是分文不留尽数退还西廊商贩，还是退还一半应急、留一半充作你行走江湖的俗家护法经费？”'),
      N('晨光洒在熙攘商棚与一张张劫后余生的淳朴面庞上。你看着箱中雪花碎银，心中已有了决断——'),
    ],
    choices: [
      {
        id: 'slq17_loot_refund',
        label: '【分文不取 · 悉数退商】按青蛇私账逐户核清，将搜刮的保护费全数退还相国寺市集商户！',
        subLabel: '商道清明、口碑传遍汴京（禅心慈悲 +2 · 侠义 +25 · 声望 +25）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_q17_market_saved', value: true },
          { type: 'setFlag', flag: 'sl_q17_loot_choice', value: 'refund' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 2 },
          { type: 'modifyChivalry', delta: 25, reason: '将青蛇帮搜刮的保护费分文不取尽数退还相国寺商户' },
          { type: 'modifyRenown', delta: 25, reason: '汴京相国寺雅市退赃护商，义名传遍城南' },
          openScene('scene_slq17_11', SHAOLIN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'slq17_loot_split',
        label: '【半退商户 · 半充经费】半数退还商贩解燃眉之急，余下半数留作俗家护法打点红尘外务之资！',
        subLabel: '江湖实用、盘缠充裕（怒目杀业 +1 · 结算额外获 60 两银）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_q17_loot_choice', value: 'split' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          openScene('scene_slq17_11', SHAOLIN_Q17_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq17_11: {
    id: 'scene_slq17_11',
    title: '第十幕 · 刀杖传薪',
    subtitle: '相国寺万姓交易雅市 · 古槐下',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_q17_market_saved|孙老掌柜与三十余户商贩领回分文未少的血汗银钱，纷纷焚香敬茶高呼「少林俗家活佛」，连开封府巡检都竖起大拇指赞叹古侠遗风！|商户们领回半数银钱并得雅市永宁亦连连拜谢；郑刚大笑称道「办红尘大事岂能饿着肚子」，将留存的六十两经费装入油布囊递到你手中。}'),
      S('NPC-0273', '（自古槐阴下缓步走来，微笑递上两卷亲笔校注的线装秘籍）“阿弥陀佛。身在红尘而不昧本心，手执利刃而能止干戈。这两卷《普门杖法》与《慈悲刀法》全本，连同常住拨给外务护法的八十两盘缠酬银，今尽数交你收执。”'),
      S('NPC-0728', '（重重拍了拍你肩头朗笑）“昨夜一战已叫汴京江湖晓得我少林俗家护法不是吃素的！日后嵩山若有远途护镖或交涉重任，定少不了你的名号！”'),
      P('（双手接过刀杖全本，肃然抱拳致礼）“多谢慧照师叔成全，也谢过卫师兄、郑师兄鼎力相助！弟子定当铭记红尘护法之责，不负少林所托！”'),
    ],
    choices: [
      {
        id: 'slq17_finish_reward',
        label: '拜谢慧照禅师，领受《普门杖法》《慈悲刀法》与护市赏银（完成）',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-117' },
          { type: 'teachMartialArt', artId: 'MA-114' },
          { type: 'giveCombatExp', amount: 280, reason: '汴京相国寺雅市夜荡青蛇帮、生擒毒蛇钱五' },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveSilver', amount: 80, reason: '大相国寺万姓雅市护市酬银' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_loot_choice', op: 'eq', value: 'split' },
            thenEffects: [{ type: 'giveSilver', amount: 60, reason: '青蛇帮赃银留作俗家护法外务经费' }],
            elseEffects: [],
          },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_intel_mode', op: 'eq', value: 'wit' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0273' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0728' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_Q17_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《相国暗影 · 红尘刀杖》！习得《普门杖法》与《慈悲刀法》，获护市酬银与 110 门派贡献！',
            'success',
            '红尘刀杖',
          ),
        ],
      },
    ],
  },
}
