import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE06_QUEST_ID } from './shaolinSideXiangguoFakeMedQuest'

const SPEAKER_PEDDLER: StorySpeakerSpec = {
  kind: 'custom',
  name: '游方药贩',
  title: '万姓雅市暗桩',
  factionName: '江淮毒贩',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_HU_SAN: StorySpeakerSpec = {
  kind: 'custom',
  name: '胡三',
  title: '江淮毒贩双煞 · 砒霜手',
  factionName: '江淮毒贩',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_QIAN_WU: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱五',
  title: '江淮毒贩双煞 · 断肠客',
  factionName: '江淮毒贩',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_VICTIM: StorySpeakerSpec = {
  kind: 'custom',
  name: '焦急老汉',
  title: '汴京苦主',
  factionName: '开封百姓',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

const SPEAKER_PORTER: StorySpeakerSpec = {
  kind: 'custom',
  name: '送炭脚夫',
  title: '汴河荒滩市井脚夫',
  factionName: '开封百姓',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_CONSTABLE: StorySpeakerSpec = {
  kind: 'custom',
  name: '开封厢兵校尉',
  title: '开封府巡城厢兵',
  factionName: '开封府',
  portraitUrl: '/assets/characters/templates/tpl_jinjun_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_jinjun_male_av.jpg',
}

function buildHuSan(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS06_HU_SAN',
    name: '胡三',
    title: '江淮毒贩双煞 · 砒霜手',
    realm: '二流中品',
    factionName: '江淮毒贩',
    sectRank: 0,
    sectRankLabel: '黑坊头目',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“秃驴好大的狗胆，敢追到爷爷的炼丹窑来！尝尝我这浸了三年红信石的五毒砂掌！”',
    stats: { hp: 1320, mp: 1050, agi: 49, res: 32 },
    talents: { bone: 60, comprehension: 52, charm: 24 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-127', move2: 'MA-137' },
    learnedArts: [
      { artId: 'MA-121', level: 5 },
      { artId: 'MA-127', level: 5 },
      { artId: 'MA-137', level: 4 },
    ],
  })
}

function buildQianWu(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS06_QIAN_WU',
    name: '钱五',
    title: '江淮毒贩双煞 · 断肠客',
    realm: '二流下品',
    factionName: '江淮毒贩',
    sectRank: 0,
    sectRankLabel: '黑坊打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“三哥别跟他废话，撒迷烟放倒他，丢进汴河喂鱼！”',
    stats: { hp: 1080, mp: 840, agi: 44, res: 27 },
    talents: { bone: 56, comprehension: 44, charm: 26 },
    equippedArts: { neigong: 'MA-121', move1: 'MA-176', move2: 'MA-131' },
    learnedArts: [
      { artId: 'MA-121', level: 4 },
      { artId: 'MA-176', level: 5 },
      { artId: 'MA-131', level: 4 },
    ],
  })
}

function addKarmaOnce(
  guardFlag: string,
  karmaFlag: 'sl_zen_merit' | 'sl_karma_wrath',
  delta: number,
): QuestEffect {
  return {
    type: 'branch',
    condition: { type: 'flag', flag: guardFlag, op: 'truthy' },
    thenEffects: [],
    elseEffects: [
      { type: 'setFlag', flag: guardFlag, value: true },
      { type: 'addFlagNumber', flag: karmaFlag, delta },
    ],
  }
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_sls06_01: {
    id: 'scene_sls06_01',
    title: '第一幕 · 雅市急报 · 三丸并陈',
    subtitle: '开封府 · 大相国寺 · 万姓交易雅市',
    mandatory: true,
    beats: [
      N('{reignYear}汴京大相国寺万姓交易雅市正值逢五开市，长廊之下绸缎古玩、药材茶肆鳞次栉比。你刚步入西廊，便见一名满面焦灼的老汉拉扯着持戒僧净安的袖角哭诉不止，罗汉堂执事武僧慧音则沉眉护住药案。'),
      S(SPEAKER_VICTIM, '“小师傅，你们少林寺怎么卖害人的毒药啊！俺家儿子前日在雅市西角花重金买了一匣冒充『嵩山少林小还丹』的药丸，才服了两粒，今晨便腹绞如刀、呕血不止，郎中说脉象大凶！”'),
      S('NPC-0984', '（额角冒汗，连声合十）“施主切莫慌乱！少林药王院小还丹从不在集市散摊兜售……啊，{gender:师兄|师姐}来得正好！方才咱们从雅市各摊查扣了三味疑似药丸，还请快替大伙儿验明真伪！”'),
      S('NPC-0418', '（将三只瓷碟并排摆上药案，虎目含怒）“围观百姓越聚越多，若不立时当众辨破哪一味才是致命假毒丹，少林药王院百年清誉今日便要毁于流言！”'),
    ],
    onFinishEffects: [openScene('scene_sls06_02', SHAOLIN_SIDE06_QUEST_ID)],
  },

  scene_sls06_02: {
    id: 'scene_sls06_02',
    title: '第二幕 · 滴醋验丹 · 无示辨毒',
    subtitle: '相国寺万姓交易雅市 · 西廊药案（辨假药）',
    illustrationUrl: '/assets/quests/sl_s06_fake_meds.jpg',
    illustrationCaption: '万姓雅市 · 剖丸滴醋，当众勘验三味药丸识破致命毒假丹',
    mandatory: true,
    beats: [
      N('你走近药案，依次掰开三只瓷碟中的药丸，细嗅气味并各滴上两滴温热米醋，众香客与药商纷纷伸长脖子围观——'),
      N('【甲丸】：蜡壳温润、丸体棕褐，掰开散发醇厚草木苦香，入口微苦回甘，滴入米醋后药汁色泽如常、澄澈无异。'),
      N('【乙丸】：色泽暗黄如泥，夹杂陈旧茯苓与微焦桂皮气味，滴入米醋后略显浑浊沉底，却并无刺鼻腥臭与变色。'),
      N('【丙丸】：外表艳红似厚涂朱砂，碾开后内里夹杂细碎灰白石灰与白砒晶末，嗅之辛辣刺鼻、全无半点草木苦香，刚滴上两滴米醋便滋滋起沫、药汁须臾泛出骇人乌青！'),
      P('（心中雪亮，指着眼前三碟药丸朗声向满廊百姓道破真凶）“诸位乡邻看真切了！害死苦主之子的冒牌少林毒假丹，正是——”'),
    ],
    choices: [
      {
        id: 'sls06_pick_pill_a',
        label: '「甲丸——色泽棕褐、味苦回甘而滴醋不变，定是毒贩借厚蜡掩盖剧毒的伪丹！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_pill_pick', value: 'a' },
          openScene('scene_sls06_03', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'sls06_pick_pill_b',
        label: '「乙丸——色暗如泥、味带焦桂且遇醋浑浊，正是掺杂腐药害人的劣质毒丸！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_pill_pick', value: 'b' },
          openScene('scene_sls06_03', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'sls06_pick_pill_c',
        label: '「丙丸——朱砂掺石灰与白砒、遇醋发青且全无草木苦香，必是冒充少林小还丹的致命假毒丸！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_fake_proved', value: true },
          { type: 'setFlag', flag: 'sl_s06_pill_pick', value: 'c' },
          openScene('scene_sls06_03', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls06_03: {
    id: 'scene_sls06_03',
    title: '第三幕 · 万姓声讨 · 顺藤摸瓜',
    subtitle: '相国寺万姓交易雅市 · 偏廊议策',
    mandatory: true,
    beats: [
      N('{ifFlag:sl_s06_fake_proved|你一语点破丙丸朱砂掺石灰、遇醋发青的致命铁证，围观的汴京万姓顿时哗然震怒！几名险些花钱买假丹的百姓当场举手声讨，更愿随慧音联名赴开封府作证请兵！|你话音刚落，慧音连忙以银针复验三碟，只见针尖刺入丙丸乌青药汁瞬间发黑——原来朱砂掺石灰、遇醋发青的丙丸才是致命假毒丹！虽总算查清真相，但这一番耽搁，西角兜售假药的摊贩已闻风收摊隐入人海。}'),
      S('NPC-0418', '（先命净安速取药王院甘草解毒汤随苦主回家救人，随即压低嗓音对你道）“这伙江淮毒贩狡猾非常，一见僧衣便遁。若不顺藤摸瓜端掉城外制假黑坊，过几日又会换个集市害人！”'),
      P('（略一沉吟，已有定计）“弟子愿换作寻常行商便装，假意大宗采买三百粒『小还丹』，诱那雅市暗桩带路去黑坊验货！”'),
      S('NPC-0418', '“妙计！城外南熏门外一带常有开封府厢兵巡哨，咱们各路齐进，定要将这窝毒贩连根拔起！”'),
    ],
    choices: [
      {
        id: 'sls06_accept_disguise',
        label: '【易装引蛇 · 暗访药贩】换上青布商衫与宽檐斗笠，赴雅市西角钓鱼追踪',
        subLabel: '承接任务，循迹追查江淮毒贩城外黑坊',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_start_mode', value: 'disguise' },
          { type: 'startQuest', questId: SHAOLIN_SIDE06_QUEST_ID, stepId: 'raid_black_workshop' },
          setStep(SHAOLIN_SIDE06_QUEST_ID, 'raid_black_workshop'),
          toast(
            '已定下乔装引蛇之计！请在【相国寺万姓交易雅市（bl_xg_market）】暗访药贩、直捣城外黑坊。',
            'talk',
            '假药风波',
          ),
        ],
      },
      {
        id: 'sls06_accept_official',
        label: '【知会厢兵 · 暗访并行】一面请慧音递帖通知巡城厢兵，一面易装入西角探路',
        subLabel: '承接任务，循迹追查江淮毒贩城外黑坊',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_start_mode', value: 'official' },
          { type: 'startQuest', questId: SHAOLIN_SIDE06_QUEST_ID, stepId: 'raid_black_workshop' },
          setStep(SHAOLIN_SIDE06_QUEST_ID, 'raid_black_workshop'),
          toast(
            '已定下暗访缉凶之计！请在【相国寺万姓交易雅市（bl_xg_market）】暗访药贩、直捣城外黑坊。',
            'talk',
            '假药风波',
          ),
        ],
      },
    ],
  },

  scene_sls06_04: {
    id: 'scene_sls06_04',
    title: '第四幕 · 暗巷废窑 · 毒坊现形',
    subtitle: '汴京城外 · 废窑黑坊',
    illustrationUrl: '/assets/quests/sl_s06_black_workshop.jpg',
    illustrationCaption: '城外废窑黑坊 · 掀笠亮明少林身份，正气凛然斥责江淮毒贩',
    mandatory: true,
    beats: [
      N('你换作青布商衫、压低宽檐斗笠，故意在雅市西角摇晃沉甸甸的钱袋。果不其然，一名贼眉鼠眼的游方药贩凑近兜售，一听你要现银吃下三百粒「少林小还丹」，立时贪心大起，七拐八绕领你出了南熏门，直抵汴河荒滩边一座偏僻废窑！'),
      N('窑院内毒气刺鼻，三口黑铁大锅正咕嘟熬着朱砂石灰毒泥，墙角堆满伪造「嵩山少林药王院」朱印的木匣，偏房更囤着大捆用于遮掩臭气的甘草、金银花等正经草药。'),
      S(SPEAKER_PEDDLER, '（朝窑门大喊）“胡三爷、钱五爷！来了位河北大财主，要现银吃下三百粒小还丹！”'),
      N('窑洞阴影中走出十指泛青的江淮毒首「砒霜手」胡三，与手持鬼头短刀守在外院大门的同党「断肠客」钱五！你退在窑墙外细察退路：北坡大道上隐约可见一队巡哨的开封府厢兵旗号，而墙角卸炭的市井脚夫正偷瞄着窑后一扇半掩的烟囱暗窗低声嘀咕。'),
    ],
    onFinishEffects: [
      { type: 'setFlag', flag: 'sl_side06_boss_ready', value: true },
      openScene('scene_sls06_05', SHAOLIN_SIDE06_QUEST_ID),
    ],
  },

  scene_sls06_05: {
    id: 'scene_sls06_05',
    title: '第五幕 · 端破黑坊 · 破窟三策',
    subtitle: '汴京城外废窑外（破局三解）',
    mandatory: true,
    beats: [
      S(SPEAKER_HU_SAN, '（阴鸷双目透过半掩窑门冷冷扫向外头）“哪家河北客商步履沉稳如松、太阳穴高鼓？钱五，守紧前院大门，莫放可疑人等混进来！”'),
      S(SPEAKER_PORTER, '（躲在窑墙柴垛后朝你挤眉弄眼，压低嗓门）“客官，我看你不像买药的——这帮杀才凶得很，俺天天给他们送炭，晓得窑后头有扇直通胡三内室的排烟暗窗……”'),
      N('前院有断肠客钱五持刀把守，内窑坐镇砒霜手胡三；北坡又有巡城开封厢兵。电光石火之间，须择一策端掉这害民黑坊——'),
    ],
    choices: [
      {
        id: 'sls06_raid_soldiers',
        label: '【联合开封府厢兵 · 封门直擒胡三】凭雅市人证与雄辩请动巡城厢兵封锁前院截住钱五，孤身入内窑擒胡三！',
        subLabel: '免战断肠客钱五，1v1 生擒砒霜手胡三（禅心慈悲 +2）',
        tone: 'jade',
        condition: {
          type: 'any',
          hint: '需已在雅市辨破假药铁证，或十艺【辩才】≥ 45',
          conditions: [
            { type: 'flag', flag: 'sl_s06_fake_proved', op: 'truthy' },
            { type: 'skillAtLeast', key: '辩才', min: 45 },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_s06_raid_plan', value: 'soldiers' },
          addKarmaOnce('sl_s06_tactic_karma_done', 'sl_zen_merit', 2),
          openScene('scene_sls06_06_solo', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'sls06_raid_backdoor',
        label: '【掷二十两买暗窗 · 身法突袭胡三】花 20 两纹银自脚夫处买通黑坊后窗暗门，绕过外院突入内窑擒胡三！',
        subLabel: '花费 20 两纹银（重试不重扣），绕开钱五 1v1 突袭胡三',
        tone: 'gold',
        condition: {
          type: 'any',
          hint: '需纹银 ≥ 20 两',
          conditions: [
            { type: 'flag', flag: 'sl_s06_porter_bribed', op: 'truthy' },
            { type: 'silverAtLeast', min: 20 },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s06_porter_bribed', op: 'truthy' },
            thenEffects: [],
            elseEffects: [
              { type: 'giveSilver', amount: -20, reason: '向市井脚夫买通城外假药黑坊后窗暗门' },
              { type: 'setFlag', flag: 'sl_s06_porter_bribed', value: true },
            ],
          },
          { type: 'setFlag', flag: 'sl_s06_raid_plan', value: 'backdoor' },
          openScene('scene_sls06_06_solo', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'sls06_raid_frontal',
        label: '【正门强冲破黑坊】掀笠亮明少林内门身份，正门硬闯车轮连战江淮毒贩双煞！',
        subLabel: '零门槛正面连战断肠客钱五与砒霜手胡三（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_raid_plan', value: 'frontal' },
          addKarmaOnce('sl_s06_tactic_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls06_06_gauntlet', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls06_06_solo: {
    id: 'scene_sls06_06_solo',
    title: '第六幕 · 直捣内窑 · 孤擒砒霜手',
    subtitle: '城外废窑内室 · 1v1 生擒胡三',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s06_raid_plan=soldiers|你疾步迎上北坡开封府巡城厢兵，亮出少林戒牒与雅市假药毒证，一番慷慨陈词说得领队校尉拍案震怒！二十余名厢兵持矛大喝合围废窑正门，立时将钱五与众伙计死死堵在外院！|你塞给送炭脚夫二十两碎银，脚夫眉开眼笑领你绕至窑后荒坡，撬开隐蔽在炭堆后的排烟暗窗！你施展轻功身法如青烟掠入内窑，反手落下铁闩将前院钱五隔绝在外！}'),
      S(SPEAKER_CONSTABLE, '{ifFlagEq:sl_s06_raid_plan=soldiers|“开封府奉法拿毒贩！外院杂鱼交给本官与弟兄们按住，内窑那毒手胡三便劳烦少林高僧亲手擒拿！”|（窑外隐约传来巡城马蹄声渐近，似是慧音搬来的开封公人已在合围途中！）}'),
      S(SPEAKER_HU_SAN, '（见退路尽断、钱五无法来援，阴鸷双目杀机暴涨，双掌一搓涌出腥臭灰青毒雾）“好阴狠的少林秃驴！既然单枪匹马撞进老子的炼毒内窑，便拿你试我浸了三年红信石的五毒砂掌！”'),
      P('（反手掀落斗笠露出戒疤，屏息以内力护住口鼻灵台）“胡三！尔等以砒霜假丹残害汴京百姓，今日便是伏法之时！”'),
    ],
    choices: [
      {
        id: 'sls06_fight_husan_solo',
        label: '屏息凝气，1v1 生擒江淮毒首【砒霜手胡三】（二流中品）',
        subLabel: '钱五已被阻隔在外，全力应对砒霜手胡三',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildHuSan() },
            rule: 'story_trial',
            forbidEscapeReason: '毒坊假药未毁，岂能任由胡三脱逃再祸害汴京百姓！',
            introText: '【直捣黑坊 · 1v1 擒首】在内窑孤身力战江淮毒首【砒霜手胡三（二流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls06_07', SHAOLIN_SIDE06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '毒烟迷眼一时失机，急退窑外运功逼出余毒！整顿后可于【相国寺万姓交易雅市】再度杀入黑坊。',
                'warn',
                '假药风波',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls06_06_gauntlet: {
    id: 'scene_sls06_06_gauntlet',
    title: '第六幕 · 毒烟四起 · 车轮破双煞',
    subtitle: '城外废窑院落 · 车轮连战',
    mandatory: true,
    beats: [
      P('（一脚踹开废窑破门，反手掀落宽檐斗笠露出戒疤，朗声喝道）“阿弥陀佛！尔等冒充嵩山少林小还丹、以砒霜假药谋财害命，今日便是黑坊覆灭之时！”'),
      S(SPEAKER_QIAN_WU, '（脸色骤变，反手抽出鬼头短刀扑出）“遭了，是少林硬茬子摸上门来了！烧账本，别留活口！”'),
      S(SPEAKER_HU_SAN, '（双掌一搓泛起腥臭灰青毒雾）“钱五，先用迷烟快刀耗他内力，再由老子以五毒砂掌废了他丹田！”'),
      N('窑院之中毒砂漫卷、药缸碎裂声不绝于耳！你屏息护住灵台，悍然迎战江淮毒贩双煞！'),
    ],
    choices: [
      {
        id: 'sls06_fight_duo_gauntlet',
        label: '屏息凝气，车轮连战【断肠客钱五】与【砒霜手胡三】（二流中品）',
        subLabel: '依次迎战断肠客钱五（二流下品）与砒霜手胡三（二流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQianWu() },
            extraOpponents: [{ kind: 'custom', npc: buildHuSan() }],
            rule: 'story_trial',
            forbidEscapeReason: '毒坊假药未毁，岂能任由毒贩脱逃再祸害汴京百姓！',
            introText:
              '【捣毁黑坊 · 车轮连战】在城外废窑迎战江淮毒贩双煞——【断肠客钱五（二流下品）】与【砒霜手胡三（二流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls06_07', SHAOLIN_SIDE06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '毒烟迷眼一时失机，急退窑外运功逼出余毒！整顿后可于【相国寺万姓交易雅市】再度杀入黑坊。',
                'warn',
                '假药风波',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls06_07: {
    id: 'scene_sls06_07',
    title: '第七幕 · 破毒擒凶 · 药材善后',
    subtitle: '城外废窑 · 窑院尘定（战后善后）',
    mandatory: true,
    beats: [
      N('一番激斗，你以刚猛阳刚的少林内劲震散毒砂灰雾，贴身欺入胡三中门，将其双腕齐齐扣住反剪在地！慧音随即率领罗汉堂护寺僧众与开封府公人涌入废窑，将胡三、钱五连同五名制假伙计尽数戴上沉重枷锁！'),
      S(SPEAKER_HU_SAN, '（面如土色，口角溢血）“饶命……高僧饶命！小人不过贪图少林小还丹在京城千金难求，才动了掺毒造假的歪心思……”'),
      N('你在众人见证下将三口铁锅里的朱砂砒霜毒泥、两百余匣伪造木盒与假印倾入深坑，泼上火油付之一炬。清点偏房时，却发现尚有十余麻袋原封未动、无毒纯正的甘草、绿豆与解毒良药——乃是毒贩买来遮掩毒气的幌子。'),
      S('NPC-0418', '（望向闻讯赶来窑外、忧心家中已误服少量假丹却无钱抓药的数十名穷苦百姓，轻声问你）“{gender:师弟|师妹}，这批缴获的无毒良药，是当场支锅熬汤免费救治误服假药的穷苦百姓，还是连同全坊账簿证物原封封存交予开封府严惩毒贩？”'),
    ],
    choices: [
      {
        id: 'sls06_after_charity_soup',
        label: '【支锅熬汤 · 免费救治中毒穷民】将缴获良药就地熬成解毒甘草汤，施舍误服假药的穷苦百姓',
        subLabel: '济世救民，侠义与江湖声望大增（禅心慈悲 +2 · 侠义 +20）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_aftermath', value: 'charity_soup' },
          addKarmaOnce('sl_s06_after_karma_done', 'sl_zen_merit', 2),
          { type: 'modifyChivalry', delta: 20, reason: '以缴获良药熬汤免费救治误服假药的汴京贫民' },
          openScene('scene_sls06_08', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'sls06_after_strict_evidence',
        label: '【封存证物 · 移交开封府严惩】将全坊药材账簿尽数封存交官作为铁证，务使毒贩重判伏法',
        subLabel: '严刑峻法，获开封府更高缉凶赏银与师门贡献（怒目杀业 +1）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_s06_aftermath', value: 'strict_evidence' },
          addKarmaOnce('sl_s06_after_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls06_08', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls06_08: {
    id: 'scene_sls06_08',
    title: '第八幕 · 烈火焚假 · 归寺复命',
    subtitle: '城外废窑 · 暮烟散尽',
    mandatory: true,
    beats: [
      N('冲天火光映照着焦黑毒泥化为灰烬，江淮毒贩一党被开封府公人押入囚车，沿途百姓无不拍手称快。'),
      N('{ifFlagEq:sl_s06_aftermath=charity_soup|窑外支起三口大铁锅，清苦甘草解毒汤的药香随风飘散汴河岸边。数十名穷苦百姓捧着热汤含泪合十，纷纷称颂少林慈悲活命之恩！|开封府公人当众贴上朱红封条，将黑坊药材、私刻假印与往来黑账尽数登记造册押返府衙，领队校尉连连拱手称赞少林护法办案严谨周密。}'),
      P('（掸去僧衣烟灰，向慧音合十）“毒窟已平，假药已焚，咱们回大雄宝殿向净安师弟与满殿香客报个平安吧。”'),
    ],
    choices: [
      {
        id: 'sls06_to_report',
        label: '押犯交官、焚尽假药，返回大相国寺大雄宝殿复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE06_QUEST_ID, 'return_report'),
          toast(
            '假药黑坊已彻底捣毁！请前往【大相国寺 · 大雄宝殿（香云宝鼎）（bl_xg_hall）】复命。',
            'success',
            '假药风波',
          ),
        ],
      },
    ],
  },

  scene_sls06_09: {
    id: 'scene_sls06_09',
    title: '第九幕 · 殿前辨明 · 丹药酬功',
    subtitle: '大相国寺 · 大雄宝殿（香云宝鼎）',
    mandatory: true,
    beats: [
      N('回到大雄宝殿前，香云宝鼎青烟袅袅。净安早已欢喜迎出报信：那苦主之子服下少林甘草解毒汤后已转危为安，方才还特意托人送来锦旗致谢！'),
      N('面对殿前聚拢的数十名京城药商与香客，你从容登阶，将真品小还丹与毒假丹的色泽、苦香、滴醋辨验之法娓娓道来，叮嘱百姓购药务必认准官办惠民药局与寺中正印，满场香客莫不颔首称善。'),
      S('NPC-0984', '（合十由衷赞叹）“{gender:师兄|师姐}{ifFlag:sl_s06_fake_proved|在西廊一眼识破朱砂石灰毒丸，又直捣城外废窑生擒毒首|孤身深入城外毒窟生擒江淮双煞}，实在令满殿香客心服口服！”'),
      S('NPC-0418', '（递上锦盒与银袋）“{ifFlagEq:sl_s06_aftermath=charity_soup|更难得你支锅施汤救活数十穷苦百姓，如今满汴京茶楼都在传颂少林义举！|更难得你封存全坊铁证助开封府铁案定罪，府尹大人特加拨缉凶公费以表嘉许！}此乃官府赏银，并药王院玄生大师留存于寺中的两枚真品【嵩山少林小还丹】，理当赠予你防身！”'),
      P('（双手合十接过丹匣与纹银）“除恶护民乃出家人本分，多谢慧音师兄与净安师弟记挂！”'),
    ],
    choices: [
      {
        id: 'sls06_complete',
        label: '收下两枚【嵩山少林小还丹】与酬银，圆满结案！',
        tone: 'gold',
        effects: [
          { type: 'giveCombatExp', amount: 280, reason: '城外废窑捣毁假药黑坊擒拿江淮毒贩' },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s06_aftermath', op: 'eq', value: 'strict_evidence' },
            thenEffects: [
              { type: 'addSectContribution', amount: 125 },
              { type: 'giveSilver', amount: 100, reason: '开封府缉拿假药毒贩并移交全坊铁证重赏' },
            ],
            elseEffects: [
              { type: 'addSectContribution', amount: 110 },
              { type: 'giveSilver', amount: 80, reason: '开封府缉拿假药毒贩赏银' },
            ],
          },
          { type: 'modifyChivalry', delta: 25, reason: '捣毁汴京假药黑坊护民昭雪' },
          { type: 'giveItem', itemId: 'ITM-MED-111', qty: 2 },
          { type: 'modifySkill', key: '辩才', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s06_fake_proved', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '经义', delta: 1 }],
            elseEffects: [],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s06_aftermath', op: 'eq', value: 'charity_soup' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 50,
                reason: '完成门派差事《万姓雅市 · 假药风波》并支锅熬汤免费救治汴京贫民',
              },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 30, reason: '完成门派差事《万姓雅市 · 假药风波》' },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0418' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0984' }, delta: 10 },
          { type: 'completeQuest', questId: SHAOLIN_SIDE06_QUEST_ID, outcome: 'completed' },
          toast(
            '【万姓雅市 · 假药风波】圆满完结！获赠【嵩山少林小还丹】×2、纹银与宗门贡献！',
            'success',
            '假药风波',
          ),
        ],
      },
    ],
  },
}
