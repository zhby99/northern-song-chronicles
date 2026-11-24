import type { NodeNpc } from '../../../types/game'
import type { QuestEffect, StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_SIDE03_QUEST_ID } from './shaolinSideGrainScaleQuest'

const SPEAKER_MERCHANT_JIA: StorySpeakerSpec = {
  kind: 'custom',
  name: '贾算盘',
  title: '登封恒丰粮行掌柜',
  factionName: '登封粮商',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_QIAN_DABANG: StorySpeakerSpec = {
  kind: 'custom',
  name: '钱大棒',
  title: '恒丰粮行恶护院头目',
  factionName: '登封粮行打手',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_THUG_LISI: StorySpeakerSpec = {
  kind: 'custom',
  name: '麻脸李四',
  title: '恒丰粮行恶打手',
  factionName: '登封粮行打手',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

const SPEAKER_VILLAGE_HEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '周里正',
  title: '登封城关里正',
  factionName: '登封乡民',
  portraitUrl: '/assets/characters/templates/tpl_peasant_old_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
}

function buildQianDabang(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS03_QIAN_DABANG',
    name: '钱大棒',
    title: '粮行恶护院 · 钱大棒',
    realm: '三流中品',
    factionName: '登封粮行打手',
    sectRank: 0,
    sectRankLabel: '恶护院头目',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“少林寺的穷和尚也敢来恒丰粮行砸场子？尝尝老子这根熟铜裹头大棒的厉害！”',
    stats: { hp: 560, mp: 260, agi: 28, res: 16 },
    talents: { bone: 56, comprehension: 38, charm: 26 },
    equippedArts: { neigong: 'MA-179', move1: 'MA-193', move2: 'MA-186' },
    learnedArts: [
      { artId: 'MA-179', level: 4 },
      { artId: 'MA-193', level: 4 },
      { artId: 'MA-186', level: 3 },
    ],
  })
}

function buildThugLisi(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLS03_THUG_LISI',
    name: '麻脸李四',
    title: '恒丰粮行恶打手',
    realm: '三流下品',
    factionName: '登封粮行打手',
    sectRank: 0,
    sectRankLabel: '粮行打手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“关上院门！把这多管闲事的少林弟子打断腿扔出登封城！”',
    stats: { hp: 390, mp: 140, agi: 22, res: 12 },
    talents: { bone: 45, comprehension: 32, charm: 22 },
    equippedArts: { neigong: 'MA-199', move1: 'MA-204', move2: 'MA-191' },
    learnedArts: [
      { artId: 'MA-199', level: 3 },
      { artId: 'MA-204', level: 3 },
      { artId: 'MA-191', level: 2 },
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
  scene_sls03_01: {
    id: 'scene_sls03_01',
    title: '第一幕 · 斋粮告急 · 领命校斛',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('{reignYear}春寒料峭，少室山松风渐紧。你行至钟鼓禅院演武坪时，只见苦行僧虚清正对着一摞泛黄的斋堂粮簿愁眉深锁，脚边搁着两只空荡荡的粗麻米袋。'),
      S('NPC-0789', '“阿弥陀佛，{gender:师弟|师妹}来得正好。今春大寮米缸比往年见底早了足足半月有余！这三年千僧常住春粮皆从登封县城『恒丰粮行』采办，每回过斗过秤皆当面点数，账面时价丝毫不差，偏生运回大寮后怎么熬粥都觉得米粒短缺！”'),
      P('（接过旧粮簿细细翻看）“单价既依官市时价、毫无虚报，蹊跷之处十有八九藏在粮行的斗斛与杆秤之间！”'),
      S('NPC-0789', '“闻听{gender:师弟|师妹}深谙算学，此番采买三十石常住春粮，可愿随贫僧先赴东庑校量寺中官颁铁斛寸尺，再一道下山查个水落石出？”'),
    ],
    choices: [
      {
        id: 'sls03_accept_measure',
        label: '【暗校官斛 · 筹算破奸】先量准官颁铁斛容积斤两，不动声色下山核账',
        subLabel: '承接任务，赴东庑碑帖武库院校斛后下山',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_prep', value: 'measure' },
          { type: 'startQuest', questId: SHAOLIN_SIDE03_QUEST_ID, stepId: 'depart_dengfeng' },
          setStep(SHAOLIN_SIDE03_QUEST_ID, 'depart_dengfeng'),
          toast(
            '已接下登封买粮之托！请前往【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】校斛领棍下山。',
            'talk',
            '登封买粮',
          ),
        ],
      },
      {
        id: 'sls03_accept_staff',
        label: '【校斛备棍 · 有备无患】既防黑心粮商，便顺手领根齐眉短棍防身同行',
        subLabel: '承接任务，赴东庑碑帖武库院校斛领棍下山',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_prep', value: 'staff' },
          { type: 'startQuest', questId: SHAOLIN_SIDE03_QUEST_ID, stepId: 'depart_dengfeng' },
          setStep(SHAOLIN_SIDE03_QUEST_ID, 'depart_dengfeng'),
          toast(
            '已接下登封买粮之托！请前往【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】校斛领棍下山。',
            'talk',
            '登封买粮',
          ),
        ],
      },
    ],
  },

  scene_sls03_02: {
    id: 'scene_sls03_02',
    title: '第二幕 · 登封粮市 · 斗秤露痕',
    subtitle: '登封县城 · 恒丰粮行',
    mandatory: true,
    beats: [
      N('你在罗汉堂东庑量准了大宋官颁铁斛标准——每石官斛实容足秤一百二十斤，随后提棍随虚清下山。晌午时分，二人抵登封西街「恒丰粮行」，掌柜贾算盘晃着满手油光满面堆笑迎出柜台。'),
      S(SPEAKER_MERCHANT_JIA, '“哎哟，虚清大师大驾光临！今春官市糙米每石纹银二两四钱，贵寺定下的三十石常住春粮合银七十二两，小号早备妥上等新米！伙计们，快拿黑漆木斛过斗过秤！”'),
      N('你不动声色地绕到粮堆后侧细察：只见后院收乡农新谷时用的是口阔肚大的「大斗」，转到前堂卖与少林装袋时却悄然换成了内壁垫浅的「小斗」！'),
      N('待伙计高唱「足秤一石」扛过麻袋，你顺手搭肩一掂——沉手分明仅有整整一百斤，远不足官斛一百二十斤之数！可方才大杆秤明明秤尾高翘，你定睛瞥见那只沉甸甸的黑铁秤砣底面，赫然有一圈锡焊修补的暗缝，里头分明灌了重铅压秤！'),
    ],
    onFinishEffects: [openScene('scene_sls03_03', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_03: {
    id: 'scene_sls03_03',
    title: '第三幕 · 实数对账 · 斗秤破奸',
    subtitle: '恒丰粮行大堂（当堂核账）',
    illustrationUrl: '/assets/quests/sl_s03_grain_scale.jpg',
    illustrationCaption: '登封粮行 · 算术当场识破小斗暗斛与灌铅秤砣，拆穿奸商克扣',
    mandatory: true,
    beats: [
      N('趁伙计正要倾倒下一斛米，你大步跨上粮台以棍轻压斛口喝道：「且慢过斗！」堂外采买的周里正与数十名登封乡邻顿时围拢过来。'),
      S(SPEAKER_MERCHANT_JIA, '（脸色微僵，强自拔高嗓门）“小师傅这是何意？我恒丰粮行开了二十年老字号，每石官斛一百二十斤、时价二两四钱，三十石照单过秤、童叟无欺！你平白污蔑老字号，拿得出实数铁证么？”'),
      P('（心念电转，迅速核清实数账单）“官斛每石一百二十斤、时价二两四钱；你大斗进、小斗出，每石实称不过一百斤，却硬按一百二十斤记账收银。买这三十石常住春粮，你究竟短了多少斤米、多吞了多少两黑银，今日便当着满城乡邻算个明白——”'),
    ],
    choices: [
      {
        id: 'sls03_calc_wrong_low',
        label: '「每石短十斤，三十石共少三百斤、多吞黑银六两——定是伙计刮斗不平克扣所致！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_calc_pick', value: 'wrong_low' },
          { type: 'setFlag', flag: 'sl_side03_fight_ready', value: true },
          openScene('scene_sls03_04_fail', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'sls03_calc_exact',
        label: '「每石短二十斤，三十石共少六百斤、合多吞黑银十二两——全凭小斗出米与灌铅秤砣作伪！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_scam_exposed', value: true },
          { type: 'setFlag', flag: 'sl_s03_calc_pick', value: 'exact' },
          { type: 'setFlag', flag: 'sl_side03_fight_ready', value: true },
          addKarmaOnce('sl_s03_expose_karma_done', 'sl_zen_merit', 1),
          openScene('scene_sls03_04_expose', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'sls03_calc_wrong_high',
        label: '「三十石足足短少八百斤、多吞黑银十六两——休听狡辩，直接砸开暗秤揪他见官！」',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_calc_pick', value: 'wrong_high' },
          { type: 'setFlag', flag: 'sl_side03_fight_ready', value: true },
          addKarmaOnce('sl_s03_expose_karma_done', 'sl_karma_wrath', 1),
          openScene('scene_sls03_04_fail', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls03_04_expose: {
    id: 'scene_sls03_04_expose',
    title: '第四幕 · 铁证显铅 · 孤棒阻门',
    subtitle: '恒丰粮行院落 · 1v1 破钱大棒',
    mandatory: true,
    beats: [
      N('话音未落，你手腕沉劲，棍尾朝那只黑铁秤砣焊缝与黑漆小斗底板接连「啪啪」两震！咔嚓脆响之中，秤砣铅块滚落、小斗夹层水银铅砂淌满青砖，在春阳下泛起刺目寒光！'),
      S(SPEAKER_VILLAGE_HEAD, '（周里正与众乡邻轰然大哗，齐声怒骂作证）“天杀的黑心奸商！每石短二十斤、三十石整整吞了六百斤米十二两黑银！难怪咱们年年在这买米总不够吃！拿住他见官！”'),
      S(SPEAKER_THUG_LISI, '（见门外群情激愤、满堂铁证如山，吓得脸色惨白转身便往后巷溜走）“不妙！满街乡邻都围上来了，这浑水小的可不敢蹚！”'),
      S(SPEAKER_QIAN_DABANG, '（眼见帮手逃遁，咬牙拎着熟铜裹头大棒横拦后院门前）“跑了个软蛋算什么！小和尚，把旧粮账和灌铅秤砣留下，否则休想踏出这院门半步！”'),
    ],
    choices: [
      {
        id: 'sls03_fight_qian_solo',
        label: '护住账簿与铁证，1v1 迎战恶护院头目【钱大棒】（三流中品）',
        subLabel: '乡邻齐声作证吓退小护院麻脸李四，独战钱大棒',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_SIDE03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQianDabang() },
            rule: 'story_trial',
            forbidEscapeReason: '虚清师兄与灌铅暗秤证物皆在身后，绝不可退缩半步！',
            introText: '【1v1 护账破奸】乡邻作证吓退帮凶，正面力破恶护院头目【钱大棒（三流中品）】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls03_05', SHAOLIN_SIDE03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '被钱大棒熟铜大棒震退数步！暂退门外调息后再赴【东庑碑帖武库院】续战破奸！',
                'warn',
                '登封买粮',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls03_04_fail: {
    id: 'scene_sls03_04_fail',
    title: '第四幕 · 奸商反咬 · 恶奴封门',
    subtitle: '恒丰粮行后院 · 车轮连战',
    mandatory: true,
    beats: [
      S(SPEAKER_MERCHANT_JIA, '（见你报出的斤两银数竟有出入，顿时抓住把柄冷笑连连，冲门外乡邻拱手倒打一耙）“诸位乡亲听听！这小和尚连账都算不清，张口便乱泼脏水！分明是来我恒丰粮行找茬讹诈的！”'),
      N('围观乡邻一时面面相觑，将信将疑。贾算盘眼见有机可乘，陡然变脸尖叫：「钱大棒、李四！关上院门，把这两个秃驴打断腿扔出城去，连账本一块儿烧了！」'),
      N('两扇厚重柏木院门轰然闭拢！提着杀猪短刀的麻脸李四与挥舞熟铜大棒的钱大棒一前一后扑杀上来，你只得横棍护住虚清，正面硬撼两名恶护院！'),
    ],
    choices: [
      {
        id: 'sls03_fight_thugs_gauntlet',
        label: '稳住马步，车轮连战【麻脸李四】与【钱大棒】（三流中品）',
        subLabel: '先后迎战麻脸李四（三流下品）与钱大棒（三流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_SIDE03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildThugLisi() },
            extraOpponents: [{ kind: 'custom', npc: buildQianDabang() }],
            rule: 'story_trial',
            forbidEscapeReason: '虚清师兄与旧粮账皆在身后，绝不可退缩半步！',
            introText: '【车轮连战 · 护账破恶】迎战恒丰粮行恶打手【麻脸李四】与护院头目【钱大棒】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_sls03_05', SHAOLIN_SIDE03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast(
                '双恶合围凶猛，护着虚清退至街口调息！整顿后可经【东庑碑帖武库院】再破粮行恶奴！',
                'warn',
                '登封买粮',
              ),
            ],
          },
        ],
      },
    ],
  },

  scene_sls03_05: {
    id: 'scene_sls03_05',
    title: '第五幕 · 追银护斋 · 恶奴伏诛',
    subtitle: '恒丰粮行院落',
    illustrationUrl: '/assets/quests/sl_s03_thug_brawl.jpg',
    illustrationCaption: '追银护斋 · 力破粮行恶护院，铁证如山迫奸商退赔黑银',
    mandatory: true,
    beats: [
      N('钱大棒怒吼着举起熟铜大棒当头砸下，你沉腰坐马不退反进，贴棒滑入中门一记罗汉掌印在其胸口檀中，将这魁梧恶汉震得连退七步，噗通坐倒在米袋之间，虎口崩裂再也提不起兵器！'),
      N('{ifFlag:sl_s03_scam_exposed|院外乡邻轰然叫好，县衙巡检与周里正早已收妥散落一地的灌铅秤砣与暗底小斗。|你顺手一棍敲裂堂前黑漆小斗与焊缝秤砣，滚落一地的重铅水银登时令破门而入的周里正与众乡邻哗然变色，贾算盘再无半句抵赖之词！}'),
      S(SPEAKER_QIAN_DABANG, '（捂胸喘气，满脸骇然）“好沉的少林内劲！爷爷饶命，小人只是拿钱替贾掌柜看场子，再也不敢了！”'),
      S(SPEAKER_MERCHANT_JIA, '（瘫软在柜台后连连磕头）“大师饶命！小人一时鬼迷心窍，愿赔！三十石春粮克扣的六百斤新米全数用官斛足斤补齐，多吞的十二两黑银并往年亏欠亦即刻奉还！”'),
    ],
    onFinishEffects: [openScene('scene_sls03_06', SHAOLIN_SIDE03_QUEST_ID)],
  },

  scene_sls03_06: {
    id: 'scene_sls03_06',
    title: '第六幕 · 黑银追赔 · 济民抑归寺',
    subtitle: '登封县城恒丰粮行前（战后抉择）',
    mandatory: true,
    beats: [
      N('在周里正与县衙巡检见证下，贾算盘哭丧着脸借来县衙官颁铁斛，足斤足两重新过斗补齐三十石饱满新米，又颤巍巍捧出今春多吞的那十二两雪花黑银与往年退赔文书。'),
      S(SPEAKER_VILLAGE_HEAD, '（抚须叹息，望向街角几名衣衫单薄的孤寡老人）“少林高徒除害安民，老朽代登封百姓谢过！唉，贾算盘这黑心暗秤坑害的不止贵寺，城西那几户孤寡老弱今春买粮也被他克扣得揭不开锅了……”'),
      S('NPC-0789', '（双手合十，征询地看向你）“阿弥陀佛。往年旧账须依寺规入库，唯独今春现追回的这十二两黑银，是{gender:师弟|师妹}亲手识奸追索而得。依你之见，这十二两黑银是当场买米分发给登封孤寡乡邻，还是全数折抵少林常住粮款？”'),
    ],
    choices: [
      {
        id: 'sls03_silver_charity',
        label: '【买粮济孤寡】将十二两黑银当场买成足秤新米，分发登封受坑孤寡乡邻',
        subLabel: '慈悲济困，侠义与江湖声望大增（禅心慈悲 +2 · 侠义 +20）',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_silver_use', value: 'charity' },
          addKarmaOnce('sl_s03_silver_karma_done', 'sl_zen_merit', 2),
          { type: 'modifyChivalry', delta: 20, reason: '以追回的十二两黑银买粮分发登封孤寡乡邻' },
          openScene('scene_sls03_07', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'sls03_silver_temple',
        label: '【折抵常住粮款】依寺规将十二两黑银全数归入少林常住公账，充实千僧斋粮',
        subLabel: '公私分明，寺库将另赐更高纹银与师门贡献嘉奖',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_s03_silver_use', value: 'temple' },
          openScene('scene_sls03_07', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
    ],
  },

  scene_sls03_07: {
    id: 'scene_sls03_07',
    title: '第七幕 · 满载归山 · 骡车登岭',
    subtitle: '少室山道 · 夕阳西斜',
    mandatory: true,
    beats: [
      N('{ifFlagEq:sl_s03_silver_use=charity|你当场将十二两黑银换成足秤糙米，亲手分装与城西十余户孤寡老人；满街乡邻含泪合十相送，一路称颂「少林活佛」之声不绝于耳。|你将十二两黑银连同官府赔账文书封入铁匣，随足秤粮车一并押运上山，一路账目清白分毫不差。}'),
      N('暮色四合时，十余辆骡车满载足斤足两的饱满新米吱吱呀呀驶上少室山道。山门外轮值的外门沙弥见这批春粮袋袋鼓胀、比往年足足多出两大车，无不欢欣鼓舞。'),
      S('NPC-0789', '“{gender:师弟|师妹}，大寮执事已着人接管入仓。且随贫僧回钟鼓禅院演武坪，将此番登封买粮账目一并交割清楚。”'),
    ],
    choices: [
      {
        id: 'sls03_return_temple',
        label: '护送粮车入仓，返回钟鼓禅院演武坪向虚清复命',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_SIDE03_QUEST_ID, 'return_report'),
          toast(
            '暗秤已破、足秤春粮已运回少林！请返回【钟鼓禅院 · 演武坪（sl_daxiong_west）】向虚清复命。',
            'success',
            '登封买粮',
          ),
        ],
      },
    ],
  },

  scene_sls03_08: {
    id: 'scene_sls03_08',
    title: '第八幕 · 斋堂飘香 · 结账复命',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    mandatory: true,
    beats: [
      N('暮鼓敲响，大寮方向飘来阵阵新米熬粥的浓郁清香。虚清在钟鼓禅院演武坪核毕新账，将一只沉甸甸的赏银钱袋郑重交到你手中。'),
      S('NPC-0789', '“执事长老听闻你下山{ifFlag:sl_s03_scam_exposed|当堂以实数筹算识破灌铅暗秤、一言服众，又单棍制伏恶护院钱大棒|拆穿恒丰粮行灌铅暗秤、力挫恶护院护回千僧春粮}，深赞你智勇双全、不辱少林门风！”'),
      S('NPC-0789', '“{ifFlagEq:sl_s03_silver_use=charity|更难得你将追回的十二两黑银尽数买米济助登封孤寡，今晨山下已有乡绅送来感恩功德牌，江湖清誉大振！|更难得你严守常住账目分毫不苟，库房执事特批额外纹银与功勋重赏，以嘉你护寺廉明之功！}”'),
      P('（合十还礼，鼻端粥香沁脾）“护持千僧烟火、斥奸安民，皆乃佛门弟子本分！”'),
    ],
    choices: [
      {
        id: 'sls03_complete_zen',
        label: '【斗秤明心 · 收赏结案】合十谢过虚清师兄，收下酬银与师门功勋',
        tone: 'gold',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_silver_use', op: 'eq', value: 'temple' },
            thenEffects: [{ type: 'giveSilver', amount: 120, reason: '登封买粮破奸归账寺库重赏' }],
            elseEffects: [{ type: 'giveSilver', amount: 100, reason: '登封买粮破奸追银师门酬赏' }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_silver_use', op: 'eq', value: 'temple' },
            thenEffects: [{ type: 'addSectContribution', amount: 75 }],
            elseEffects: [{ type: 'addSectContribution', amount: 60 }],
          },
          { type: 'modifySkill', key: '算术', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_scam_exposed', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'giveCombatExp', amount: 110, reason: '恒丰粮行力挫钱大棒破奸护粮' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0789' }, delta: 15 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_silver_use', op: 'eq', value: 'charity' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 35,
                reason: '完成门派差事《登封买粮 · 斗秤破奸》并散银买粮济助登封孤寡',
              },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 20, reason: '完成门派差事《登封买粮 · 斗秤破奸》' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE03_QUEST_ID, outcome: 'completed' },
          toast('已完成《登封买粮 · 斗秤破奸》！获得纹银、师门贡献、算术进益与实战历练！', 'success', '登封买粮'),
        ],
      },
      {
        id: 'sls03_complete_sharp',
        label: '【算武并行 · 收赏结案】笑纳酬银，深感行走世间筹算与棍法缺一不可',
        tone: 'jade',
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_silver_use', op: 'eq', value: 'temple' },
            thenEffects: [{ type: 'giveSilver', amount: 120, reason: '登封买粮破奸归账寺库重赏' }],
            elseEffects: [{ type: 'giveSilver', amount: 100, reason: '登封买粮破奸追银师门酬赏' }],
          },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_silver_use', op: 'eq', value: 'temple' },
            thenEffects: [{ type: 'addSectContribution', amount: 75 }],
            elseEffects: [{ type: 'addSectContribution', amount: 60 }],
          },
          { type: 'modifySkill', key: '算术', delta: 2 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_scam_exposed', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '辩才', delta: 1 }],
            elseEffects: [],
          },
          { type: 'giveCombatExp', amount: 110, reason: '恒丰粮行力挫钱大棒破奸护粮' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0789' }, delta: 15 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_s03_silver_use', op: 'eq', value: 'charity' },
            thenEffects: [
              {
                type: 'modifyRenown',
                delta: 35,
                reason: '完成门派差事《登封买粮 · 斗秤破奸》并散银买粮济助登封孤寡',
              },
            ],
            elseEffects: [
              { type: 'modifyRenown', delta: 20, reason: '完成门派差事《登封买粮 · 斗秤破奸》' },
            ],
          },
          { type: 'completeQuest', questId: SHAOLIN_SIDE03_QUEST_ID, outcome: 'completed' },
          toast('已完成《登封买粮 · 斗秤破奸》！获得纹银、师门贡献、算术进益与实战历练！', 'success', '登封买粮'),
        ],
      },
    ],
  },
}
