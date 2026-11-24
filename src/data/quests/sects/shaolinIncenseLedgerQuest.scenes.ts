import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { SHAOLIN_Q03_QUEST_ID } from './shaolinIncenseLedgerQuest'

const SPEAKER_JIA_TONGBAO: StorySpeakerSpec = {
  kind: 'custom',
  name: '贾通宝',
  title: '洛阳牙人 · 市井包打听',
  factionName: '江湖散人',
  portraitUrl: '/assets/characters/templates/tpl_sanren_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_sanren_male_av.jpg',
}

const SPEAKER_ZHAO_KUI: StorySpeakerSpec = {
  kind: 'custom',
  name: '赵魁',
  title: '断魂刀 · 黑市杀手',
  factionName: '洛阳黑市',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
}

const SPEAKER_SUN_QI: StorySpeakerSpec = {
  kind: 'custom',
  name: '孙七',
  title: '血爪刀客 · 赵魁副手',
  factionName: '洛阳黑市',
  portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
}

function buildZhaoKuiBoss(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ03_ZHAO_KUI',
    name: '赵魁',
    title: '断魂刀 · 黑市杀手',
    realm: '三流上品',
    factionName: '洛阳黑市',
    sectRank: 0,
    sectRankLabel: '黑市首恶',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_hero_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_hero_fb.jpg',
    talk: '“少林小和尚多管闲事！见过老子这口断魂刀出鞘的，还没一个活过三更！”',
    stats: { hp: 820, mp: 420, agi: 37, res: 23 },
    talents: { bone: 64, comprehension: 48, charm: 28 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189', move2: 'MA-190' },
    learnedArts: [{ artId: 'MA-238', level: 5 }, { artId: 'MA-189', level: 5 }, { artId: 'MA-190', level: 5 }],
  })
}

function buildSunQiDeputy(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_SLQ03_SUN_QI',
    name: '孙七',
    title: '血爪刀客 · 赵魁副手',
    realm: '三流中品',
    factionName: '洛阳黑市',
    sectRank: 0,
    sectRankLabel: '黑市刀手',
    avatarUrl: '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_greenwood_sect_fb.jpg',
    talk: '“魁哥，废话少说！把这小和尚和贾通宝一并剁了喂嵩山野狼！”',
    stats: { hp: 560, mp: 260, agi: 28, res: 16 },
    talents: { bone: 54, comprehension: 38, charm: 22 },
    equippedArts: { neigong: 'MA-238', move1: 'MA-189', move2: 'MA-209' },
    learnedArts: [{ artId: 'MA-238', level: 4 }, { artId: 'MA-189', level: 4 }, { artId: 'MA-209', level: 4 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq03_01: {
    id: 'scene_slq03_01',
    title: '第一幕 · 血染故人',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院外古柏林',
    mandatory: true,
    beats: [
      N('{reignYear}深秋薄暮，霜风卷着枯柏叶掠过钟鼓禅院石阶。{ifFlag:sl_q01_helped_novice|寒门新徒阿木方才还往你窗台搁了两只烤红薯念着当日护持之恩，|你刚协助核算完今秋香火布施簿籍，}忽听院门外古柏林间传来一声凄厉呼救！'),
      N('你提气奔出石门，只见一名左肩中刀、满脸血污的灰袍中年人扑倒古柏根下，怀中死死护着一个浸透血渍的油布包袱——借着灯笼微光一看，竟是当年收你二百五十两纹银牵线入少林的洛阳牙人【贾通宝】！'),
      S(SPEAKER_JIA_TONGBAO, '（如见救星般死死攥住你僧袖，声嘶力竭）“{gender:少侠|女侠}救命！小人撞破了天大黑幕，洛阳黑市『断魂刀』赵魁和血爪孙七一路追杀上来要抢这本账册灭口！念在当年牵线情分上，千万救小人一命！”'),
      N('话音未落，古柏林深处寒鸦惊飞，两道凌厉刀风破开暮霭疾掠而至！你将贾通宝护在古柏树干之后，提步迎向杀机四伏的寒林。'),
    ],
    choices: [
      {
        id: 'slq03_accept_rescue',
        label: '护住贾通宝，踏入古柏寒林拦截黑市追兵！',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: SHAOLIN_Q03_QUEST_ID, stepId: 'pine_forest_rescue' },
          setStep(SHAOLIN_Q03_QUEST_ID, 'pine_forest_rescue'),
          toast('已开启《香火黑账 · 知客暗流》！迎战古柏寒林中的黑市追兵！', 'talk', '知客暗流'),
          openScene('scene_slq03_03', SHAOLIN_Q03_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq03_03: {
    id: 'scene_slq03_03',
    title: '第二幕 · 断魂拦路',
    subtitle: '少室古柏寒林（战前奇策）',
    illustrationUrl: '/assets/quests/sl_03_pine_ambush.jpg',
    illustrationCaption: '古柏寒林 · 救下血污牙人贾通宝，力战黑市断魂刀赵魁',
    mandatory: true,
    beats: [
      N('暮雾翻涌，一高一矮两名黑衣刀客现身古柏林间。为首疤面大汉掌中鬼头厚背长刀滴着血珠，正是洛阳黑市收钱买命的「断魂刀」赵魁；左侧矮瘦刀客孙七则双眼滴溜乱转，瞥见你腰间沉甸甸的荷包竟下意识舔了舔干裂嘴唇。'),
      S(SPEAKER_ZHAO_KUI, '（冷眼一扫你身上少林僧衣）“少林小辈，不想死就把姓贾的和他怀里那本册子交出来！买他性命的主顾，可不是你一个外门弟子惹得起的！”'),
      S(SPEAKER_SUN_QI, '（提刀斜绕左侧封死退路，阴恻恻冷笑）“魁哥，跟小和尚废什么话？一并剁了，他身上盘缠归我！”'),
      N('二贼一正一奇，合围之势已成。瞥见孙七那副见财起意的贪婪嘴脸，你心念急转——'),
    ],
    choices: [
      {
        id: 'slq03_distract_sunqi',
        label: '【散银乱贼】反手向暗林掷出 20 两碎银，惊乱贪财的孙七、独战赵魁！',
        subLabel: '花费 20 两银诱开副手孙七，免除车轮连战、1v1 单挑断魂刀赵魁',
        tone: 'gold',
        condition: { type: 'silverAtLeast', min: 20 },
        effects: [
          { type: 'giveSilver', amount: -20, reason: '古柏寒林掷出碎银诱离黑市副手孙七' },
          { type: 'setFlag', flag: 'sl_q03_sunqi_distracted', value: true },
          toast('碎银滚落枯叶间哗啦作响，贪财的孙七本能扑向暗林抢银！你趁机独战断魂刀赵魁！', 'success', '散银乱贼'),
          {
            type: 'startCombat',
            questId: SHAOLIN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhaoKuiBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的贾通宝，此时退步二人必死无疑！',
            introText: '【1v1 孤林独斗】孙七贪银离阵，你正面独战黑市首恶【断魂刀 · 赵魁】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq03_05', SHAOLIN_Q03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('断魂刀赵魁刀法狠辣，借古柏掩护暂退喘息后再战（孙七已被引开）！', 'warn', '古柏寒林'),
            ],
          },
        ],
      },
      {
        id: 'slq03_fight_gauntlet',
        label: '【正面硬撼】少林弟子岂向匪类屈膝！车轮连战孙七与断魂刀赵魁！',
        subLabel: '先破副手孙七（三流中品），再撼首恶赵魁（三流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildSunQiDeputy() },
            extraOpponents: [{ kind: 'custom', npc: buildZhaoKuiBoss() }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的贾通宝，此时退步二人必死无疑！',
            introText: '【车轮连战 · 古柏寒林死斗】迎战洛阳黑市副手【血爪 · 孙七】与首恶【断魂刀 · 赵魁】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq03_05', SHAOLIN_Q03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('二贼刀势狠辣，借古柏掩护暂退喘息后再战！', 'warn', '古柏寒林'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq03_03_solo: {
    id: 'scene_slq03_03_solo',
    title: '第二幕 · 孤林再战',
    subtitle: '少室古柏寒林（1v1 续战赵魁）',
    mandatory: true,
    beats: [
      N('贪财的孙七方才已被你二十两碎银引去暗林抢财，林间只余「断魂刀」赵魁横刀冷笑，杀气更炽！你调匀内息，再度迈步迎上。'),
    ],
    choices: [
      {
        id: 'slq03_retry_zhaokui',
        label: '全力运功，一对一迎战黑市首恶【断魂刀 · 赵魁】！（三流上品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: SHAOLIN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhaoKuiBoss() },
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的贾通宝，此时退步二人必死无疑！',
            introText: '【1v1 孤林独斗】迎战黑市首恶【断魂刀 · 赵魁】！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_slq03_05', SHAOLIN_Q03_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('断魂刀赵魁刀法狠辣，借古柏掩护暂退喘息后再战！', 'warn', '古柏寒林'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq03_05: {
    id: 'scene_slq03_05',
    title: '第三幕 · 败敌托册',
    subtitle: '钟鼓禅院偏厢',
    mandatory: true,
    beats: [
      N('寒林劲风激荡！你硬撼赵魁七记夺命重刀，寻隙一掌印中其左肋！赵魁哇地吐出一口逆血，骇然掷出刺鼻灰烟丸，狼狈窜入深山密林。你将贾通宝扶回钟鼓禅院偏厢敷药止血。'),
      S(SPEAKER_JIA_TONGBAO, '（服下金疮药，望着紧闭窗棂仍浑身发颤）“{gender:少侠|女侠}救命之恩，小人没齿难忘！小人原以为替知客禅师【玄净】经手香火银，不过是赚些富商子弟上山学艺的门路钱……”'),
      S(SPEAKER_JIA_TONGBAO, '“可前日我去洛阳黑市暗庄结账，竟撞见他们把朝廷赐予少林寺的免税『空名度牒』高价倒卖给洛阳豪绅！大宋律法，持官方度牒可免丁口赋役，豪绅买牒避税动辄逃去官府数千贯！小人只多问了一句印信来历，他们便雇赵魁杀我灭口！”'),
      S(SPEAKER_JIA_TONGBAO, '（自怀中颤巍巍掏出一本染血密账《知客院香火私册》塞入你掌心）“小人拼死从暗庄偷出这本真账！此地绝不可久留，小人这便趁夜逃回乡下老家——账册交由{gender:少侠|女侠}定夺！”'),
      N('言罢，贾通宝裹紧破袍推开后窗，一瘸一拐消失在深沉夜色之中。'),
    ],
    onFinishEffects: [openScene('scene_slq03_08', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_08: {
    id: 'scene_slq03_08',
    title: '第四幕 · 孤灯验账',
    subtitle: '钟鼓禅院禅房 · 三更孤灯（实据推演）',
    illustrationUrl: '/assets/quests/sl_03_incense_ledger.jpg',
    illustrationCaption: '香火私册 · 钟鼓禅院孤灯验账，空名度牒黑幕水落石出',
    mandatory: true,
    beats: [
      N('三更梆响，禅房孤灯如豆。你反闩房门，摊开染血的《知客院香火私册》，取算盘炭笔逐页核验：朝廷近三年赐予少林常住的免税『空名度牒』定额为每年三十道，三年合计本该九十道；可册中『长明灯油』『殿瓦修缮』两项杂款下，竟核销了一百二十六道度牒印号！'),
      N('再查银两去向，知客院每月往洛阳城外三处商号走账：其一「城东永丰粮行」月结三十两买糙米；其二「城西济仁药铺」月结十八两备金疮药；唯有「洛阳南市 · 恒通盐栈」，借采买香油之名三年竟单笔累计汇兑四千三百二十两——折合每道多出度牒整整一百二十两，押款处更签着『净』字花押！'),
      N('正当你指尖发凉、翻过最末一页「外门香火特录」时，却赫然僵住——泛黄宣纸上墨迹犹新：『洛阳牙人贾通宝代递香火银二百两，名目长明灯油，余五十两牙行脚力，举荐新徒入外门，玄净亲押』——落款处，赫然正是你的名字！'),
      N('你深吸一口冷气，强迫自己冷静下来：天明前玄净定会寻上门来，欲彻底钉死这只古刹巨蠹，须先咬准这本账册里真正无可狡辩的铁证破绽——'),
    ],
    choices: [
      {
        id: 'slq03_deduce_grain',
        label: '以「城东永丰粮行」月结三十两为破绽，指其虚报寺僧口粮中饱私囊',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q03_proof_complete', value: false },
          openScene('scene_slq03_09', SHAOLIN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'slq03_deduce_salt',
        label: '以「多出三十六道空名度牒、四千三百二十两赃银汇往洛阳南市恒通盐栈」为铁证，直指倒牒通商重罪！',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q03_proof_complete', value: true },
          openScene('scene_slq03_09', SHAOLIN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'slq03_deduce_herb',
        label: '以「城西济仁药铺」月结十八两为破绽，指其克扣外门伤药采买银两',
        tone: 'default',
        effects: [
          { type: 'setFlag', flag: 'sl_q03_proof_complete', value: false },
          openScene('scene_slq03_09', SHAOLIN_Q03_QUEST_ID),
        ],
      },
    ],
  },

  scene_slq03_09: {
    id: 'scene_slq03_09',
    title: '第五幕 · 深夜来客',
    subtitle: '钟鼓禅院禅房 · 威逼利诱',
    mandatory: true,
    beats: [
      N('“吱呀——”木门闩竟被一股阴柔内劲无声震开，冷风灌入吹得烛火摇曳。身披绸缎僧袍、手捻紫檀念珠的知客禅师【玄净】缓步踏入，目光冷冷落在书案那本摊开的私册之上。'),
      S('NPC-0193', '（低宣一声佛号，笑意不及眼底）“阿弥陀佛。赵魁那帮江湖草莽终究办事不力。师侄深夜孤灯翻看知客院旧簿，莫非真以为凭几页涂鸦便能动摇老衲？”'),
      N('{ifFlag:sl_q03_proof_complete|你冷笑一声，脱口报出「三年多销三十六道空名度牒、折银四千三百二十两借香油之名汇往洛阳南市恒通盐栈」与『净』字花押铁证！玄净拨动念珠的手指骤然一僵，慈眉善目的假面瞬时裂出一道寒芒！|你厉声喝斥知客院采买账目虚浮，玄净却轻笑摇头，慢条斯理反诘你不懂寺务采买行情、只抓芝麻小事，言语间愈发有恃无恐。}'),
      S('NPC-0193', '（旋即敛去惊怒，枯指轻轻点向私册最末一页，又自袖中滑出一张洛阳钱庄三百两银票推至你面前）“少林清规森严，私贿知客入寺者轻则废功逐山、重则杖责除名！你若将册子呈给玄苦、玄难，你当年托贾通宝递二百两银子买门路入寺的丑事也将公之于众！反之，天明前到后院铜炉焚了这本账，三百两官银归你，旧案永埋黄土，往后在寺中老衲保你步步青云——师侄不妨三思！”'),
      N('玄净忌惮方丈院耳目，未敢当场强夺，丢下一句“天明前我在后炉候你”便悄然隐入夜雾。你紧握尚带血温的私册步出禅房，晓雾苍茫，前路赫然分出三条截然不同的因果——'),
    ],
    choices: [
      {
        id: 'slq03_go_decide',
        label: '携《知客院香火私册》步入晓雾，前往罗汉堂演武正殿或禅院做出决断',
        tone: 'gold',
        effects: [
          setStep(SHAOLIN_Q03_QUEST_ID, 'ledger_decision'),
          toast(
            '请前往【十八铜人罗汉堂 · 罗汉堂演武正殿】或留在【钟鼓禅院】，对《知客院香火私册》做出最终决断！',
            'talk',
            '道心抉择',
          ),
        ],
      },
    ],
  },

  scene_slq03_12: {
    id: 'scene_slq03_12',
    title: '第六幕 · 佛前拷心',
    subtitle: '罗汉堂演武正殿 / 钟鼓禅院（三岔道心抉择）',
    mandatory: true,
    beats: [
      N('东方天际泛起鱼肚白，嵩山晨钟将响。手中这本薄薄的《知客院香火私册》，此刻重若千钧——既握着玄净倒卖三十六道度牒的死罪铁证，末页又白纸黑字写着你当年递银入寺的名字。'),
      N('大义灭亲连己过一并呈上？悄悄撕去末页保全自身再扳倒玄净？抑或折返铜炉替其焚账、收下那三百两雪花官银？一念之差，便是截然不同的江湖路。'),
    ],
    choices: [
      {
        id: 'slq03_choice_clean',
        label: '【大义灭亲】连同末页自己的名字原封密呈玄苦长老，甘受戒棍肃清祖庭！',
        subLabel: '赤诚自陈旧过、凛然揭发黑幕（禅心慈悲 +3 · 侠义 +25 · 贡献 120 · 玄苦玄难极力嘉许）',
        tone: 'jade',
        effects: [openScene('scene_slq03_14_clean', SHAOLIN_Q03_QUEST_ID)],
      },
      {
        id: 'slq03_choice_edited',
        label: '【权谋自保】悄然撕毁写有己名的末页，再携度牒黑账密呈玄苦扳倒玄净！',
        subLabel: '既肃蛀虫亦保自身清白；然暗留一缕权谋心魔（怒目杀业 +1 · 贡献 90 · 酬银 60 两）',
        tone: 'primary',
        effects: [openScene('scene_slq03_14_edited', SHAOLIN_Q03_QUEST_ID)],
      },
      {
        id: 'slq03_choice_cover_up',
        label: '【焚账收银】折返铜炉替玄净焚毁私册，收下三百两封口官银永埋旧案！',
        subLabel: '得 300 两官银与玄净暗中庇护（怒目杀业 +3 · 侠义 -20 · 埋下日后公堂因果）',
        tone: 'danger',
        effects: [openScene('scene_slq03_13_burn', SHAOLIN_Q03_QUEST_ID)],
      },
    ],
  },

  scene_slq03_14_clean: {
    id: 'scene_slq03_14_clean',
    title: '第七幕 · 正殿坦陈',
    subtitle: '罗汉堂演武正殿（大义清查结局）',
    mandatory: true,
    beats: [
      N('你深吸一口清冽晨气，毅然踏入罗汉堂演武正殿，向正在议事的「降魔尊者」玄苦与「伏魔首座」玄难屈膝长跪，双手奉上完好无损的《知客院香火私册》。'),
      P('“启禀二位师祖！弟子昨夜救下遭黑市灭口的洛阳牙人，查获玄净师叔三年倒卖朝廷空名度牒铁证！账册末页亦记有弟子当年托人递银入寺之旧过，弟子不敢隐瞒半字，甘愿领受戒棍严惩！”'),
      S('NPC-0126', '（逐页翻阅，拍案震得铜香炉嗡嗡作响）“好个玄净！{ifFlag:sl_q03_proof_complete|你连洛阳南市恒通盐栈四千三百二十两汇兑脉络与花押都核得一清二楚，铁证如山，他百口莫辩！|这三十六道空名度牒账目触目惊心，玄难师弟速封知客院账房细查商号去向！}”'),
      S('NPC-0127', '（走下法座轻挥戒尺虚点你肩头三下，以示寺规无私，复亲手扶起你）“按律须受三记戒棍以明清规；然你临三百两重利不昧本心、敢自揭其短以护祖庭，此等赤诚铁骨足称真罗汉！老衲与玄苦师兄做主功过相抵，更赐你百二十点师门贡献以彰清风！”'),
      N('戒律僧随即封锁知客院，玄净被削去知客实权、严加看管。你迎着初升朝阳合十长揖——胸中浩然正气，无愧佛祖金身！'),
    ],
    choices: [
      {
        id: 'slq03_finish_clean',
        label: '合十谢过玄苦、玄难二位长老（完成《香火黑账 · 知客暗流》）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_righteous_monk', value: true },
          { type: 'setFlag', flag: 'sl_q03_ledger', value: 'reported_clean' },
          { type: 'addFlagNumber', flag: 'sl_zen_merit', delta: 3 },
          { type: 'addSectContribution', amount: 120 },
          { type: 'modifyRenown', delta: 20, reason: '大义自陈肃清少林知客院空名度牒黑幕' },
          { type: 'modifyChivalry', delta: 25, reason: '不隐己过、大义凛然肃清少林度牒黑幕' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 18 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0193' }, delta: -25 },
          { type: 'giveCombatExp', amount: 160, reason: '古柏寒林力战黑市断魂刀赵魁' },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q03_proof_complete', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q03_QUEST_ID, outcome: 'report_xuanku' },
          toast(
            '已完成《香火黑账 · 知客暗流》（大义清查线）！禅心大增，获玄苦与玄难长老极高赏识！',
            'success',
            '清风正气',
          ),
        ],
      },
    ],
  },

  scene_slq03_14_edited: {
    id: 'scene_slq03_14_edited',
    title: '第七幕 · 断尾密呈',
    subtitle: '罗汉堂演武正殿（权谋自保结局）',
    mandatory: true,
    beats: [
      N('你于暗廊烛火旁屏息凝神，将写有自己名字的末页齐根撕下化作灰烬，只携前面三十六道度牒黑账步入罗汉堂演武正殿，密呈玄苦与玄难二位长老。'),
      S('NPC-0126', '（翻至账尾，指腹摩挲过微显参差的纸脊，深邃目光忽在你脸上停顿了一瞬）“{ifFlag:sl_q03_proof_complete|三十六道空名度牒与洛阳南市恒通盐栈四千余两赃银，查得甚准！|这三十六道空名度牒暗账触目惊心，容不得他狡辩！}只是……这册尾似乎缺了一页？”'),
      P('（面不改色，躬身合十）“启禀师祖，昨夜贾通宝遭断魂刀追杀时怀中油布包曾被刀锋划裂，兴许是逃命途中散落损毁了。”'),
      N('玄苦淡淡“嗯”了一声并未深究，即刻命玄难封查知客院账房。午后玄净被削去知客实权、押过演武坪时，遥遥朝你勾起一抹怨毒而玩味的冷笑——“好手段，撕得干净，你我彼此彼此！”'),
    ],
    choices: [
      {
        id: 'slq03_finish_edited',
        label: '掩去心头微澜，领受密报嘉奖（完成《香火黑账 · 知客暗流》）',
        tone: 'primary',
        effects: [
          { type: 'setFlag', flag: 'sl_righteous_monk', value: true },
          { type: 'setFlag', flag: 'sl_q03_ledger', value: 'reported_edited' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 1 },
          { type: 'addSectContribution', amount: 90 },
          { type: 'giveSilver', amount: 60, reason: '揭发知客院贪墨所获寺库嘉奖' },
          { type: 'modifyChivalry', delta: 5, reason: '密呈度牒黑账扳倒玄净，然私撕末页自保' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 8 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 10 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0193' }, delta: -20 },
          { type: 'giveCombatExp', amount: 160, reason: '古柏寒林力战黑市断魂刀赵魁' },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q03_proof_complete', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q03_QUEST_ID, outcome: 'report_edited' },
          toast(
            '已完成《香火黑账 · 知客暗流》（权谋自保线）！既扳倒玄净又全身而退，然心中暗留一缕业火。',
            'talk',
            '权谋暗影',
          ),
        ],
      },
    ],
  },

  scene_slq03_13_burn: {
    id: 'scene_slq03_13_burn',
    title: '第七幕 · 炉火焚证',
    subtitle: '钟鼓禅院后院铜炉（焚账收银结局）',
    mandatory: true,
    beats: [
      N('你终究没有踏进罗汉堂正殿，而是转身折返钟鼓禅院后院。晨雾缭绕间，玄净早已独自立于焚纸铜炉旁，见你归来，紧绷的眉峰骤然舒展。'),
      P('（沉默片刻，将《知客院香火私册》投入熊熊跃动的火舌之中）“旧账已焚，从此世上再无这本册子。玄净师叔好自为之，莫再雇黑市杀手在少室山门下造杀孽。”'),
      S('NPC-0193', '（望着纸页连同你的名字一同蜷曲化作黑灰，长舒一口气，亲手将三百两洛阳兑票与沉甸甸银囊塞入你袖中）“善哉，善哉！师侄果然是识时务的通透人！老衲言出必行，这三百两银子权作谢礼，往后在少林寺内，你我便是一条船上的自家人！”'),
      N('“咚——”五更晨钟准时响彻少室群峰。晨风吹散炉口最后一缕焦烟，唯有你心中清楚，千年古刹香火之下，你已与知客禅师结下一道难以轻易斩断的隐秘业障。'),
    ],
    choices: [
      {
        id: 'slq03_finish_cover_up',
        label: '收妥三百两纹银，深藏今夜隐秘（完成《香火黑账 · 知客暗流》）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_xuanjing_debt', value: true },
          { type: 'setFlag', flag: 'sl_q03_ledger', value: 'burned_bribe' },
          { type: 'addFlagNumber', flag: 'sl_karma_wrath', delta: 3 },
          { type: 'giveSilver', amount: 300, reason: '替玄净焚毁香火私册所得封口厚银' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0193' }, delta: 25 },
          { type: 'modifyChivalry', delta: -20, reason: '替知客禅师玄净焚毁香火黑账并收受封口银' },
          { type: 'giveCombatExp', amount: 160, reason: '古柏寒林力战黑市断魂刀赵魁' },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q03_proof_complete', op: 'truthy' },
            thenEffects: [{ type: 'modifySkill', key: '算术', delta: 1 }],
            elseEffects: [],
          },
          { type: 'completeQuest', questId: SHAOLIN_Q03_QUEST_ID, outcome: 'cover_up' },
          toast(
            '已完成《香火黑账 · 知客暗流》（焚账线）！获 300 两纹银与玄净暗中庇护，侠义大降、业火深植。',
            'warn',
            '知客暗流',
          ),
        ],
      },
    ],
  },
}
