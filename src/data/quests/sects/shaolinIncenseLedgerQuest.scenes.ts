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
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-218',
      move1: 'MA-151',
      move2: 'MA-189',
      move3: 'MA-209',
    },
    learnedArts: [
      { artId: 'MA-229', level: 5 },
      { artId: 'MA-218', level: 5 },
      { artId: 'MA-151', level: 5 },
      { artId: 'MA-189', level: 5 },
      { artId: 'MA-209', level: 5 },
    ],
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
    equippedArts: {
      neigong: 'MA-229',
      qinggong: 'MA-218',
      move1: 'MA-189',
      move2: 'MA-209',
    },
    learnedArts: [
      { artId: 'MA-229', level: 4 },
      { artId: 'MA-218', level: 3 },
      { artId: 'MA-189', level: 4 },
      { artId: 'MA-209', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_slq03_01: {
    id: 'scene_slq03_01',
    title: '第一幕 · 血染故人',
    subtitle: '大雄宝殿方丈院 · 钟鼓禅院外古柏林',
    mandatory: true,
    beats: [
      N('{reignYear}深秋薄暮，霜风卷着枯柏叶掠过钟鼓禅院石阶。你刚协助藏经院核算完今秋香火布施簿籍，正欲回寮房歇息，忽听院门外古柏林间传来一声凄厉呼救！'),
      N('你提气奔出禅院石门，只见一名左肩中刀、满脸血污的灰袍中年人正跌跌撞撞扑倒在古柏根下，怀中死死护着一个浸透血渍的油布包袱。'),
      P('（连忙上前扶起伤者，借着廊下灯笼微光定睛一看，心头不由一震）“你……你是洛阳天津酒楼的牙人贾通宝？怎么伤成这副模样逃到少室山上来了！”'),
      S(SPEAKER_JIA_TONGBAO, '（认出你正是当年托他递香火银入寺的旧识，如见救星般死死攥住你的僧袖）“{gender:少侠|女侠}！救命啊！小人撞破了天大的黑幕，洛阳黑市的杀手一路从山脚追杀上来，再晚一步小人就要死无葬身之地了！”'),
    ],
    onFinishEffects: [openScene('scene_slq03_02', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_02: {
    id: 'scene_slq03_02',
    title: '第二幕 · 寒林杀机',
    subtitle: '钟鼓禅院外古柏寒林',
    mandatory: true,
    beats: [
      N('话音未落，古柏林深处寒鸦惊飞！两道凌厉刀风破开暮霭，踏着厚厚松针疾掠而来，杀气瞬间笼罩整片寒林！'),
      S(SPEAKER_JIA_TONGBAO, '（吓得面无人色，连声颤抖）“来了！是黑市里鼎鼎大名的『断魂刀』赵魁和他的副手孙七！他们要抢我怀里这本账册，还要灭我的口！{gender:少侠|女侠}，念在当年小人替你牵线入少林的情分上，千万救小人一命！”'),
      P('（将贾通宝护至古柏树干之后，沉声喝道）“佛门圣地岂容黑市杀手行凶！你且藏好，我来拦住他们！”'),
    ],
    choices: [
      {
        id: 'slq03_accept_rescue',
        label: '护住贾通宝，踏入古柏寒林迎击黑市追兵！',
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
    title: '第三幕 · 断魂拦路',
    subtitle: '少室古柏寒林',
    illustrationUrl: '/assets/quests/sl_03_pine_ambush.jpg',
    illustrationCaption: '古柏寒林 · 救下血污牙人贾通宝，力战黑市断魂刀赵魁',
    mandatory: true,
    beats: [
      N('暮雾翻涌，一高一矮两名黑衣刀客现身古柏林间。为首那人面颊一道狰狞旧疤，掌中鬼头厚背长刀滴着未干血珠，正是洛阳黑市收钱买命的「断魂刀」赵魁！'),
      S(SPEAKER_ZHAO_KUI, '（冷眼一扫你身上少林外门僧衣，嘴角勾起残忍笑意）“少林小辈，不想死就把姓贾的牙人和他怀里那本油布册子交出来！买他性命的主顾，可不是你一个外门弟子惹得起的！”'),
      S(SPEAKER_SUN_QI, '（提刀绕向左侧封死退路，阴恻恻冷笑）“魁哥，跟这小和尚废什么话？既然他撞见了咱们的脸，一并做掉省得留祸根！”'),
      P('“少室山门之下竟敢妄言杀人灭口？今日便教你们领教少林禅武！”'),
    ],
    onFinishEffects: [openScene('scene_slq03_04', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_04: {
    id: 'scene_slq03_04',
    title: '第四幕 · 寒林死斗',
    subtitle: '少室古柏寒林（车轮连战 实战）',
    mandatory: true,
    beats: [
      N('赵魁暴喝一声，鬼头大刀化作森寒刀幕当头劈落，副手孙七则如毒蛇般斜刺下盘！二贼配合默契、招招夺命，绝非寻常山野草寇可比！'),
    ],
    choices: [
      {
        id: 'slq03_fight_zhaokui',
        label: '全力运功，车轮连战迎战「断魂刀」赵魁与孙七！（车轮连战 实战）',
        subLabel: '主敌三流上品赵魁 + 副手三流中品孙七',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: SHAOLIN_Q03_QUEST_ID,
            opponent: { kind: 'custom', npc: buildZhaoKuiBoss() },
            extraOpponents: [{ kind: 'custom', npc: buildSunQiDeputy() }],
            rule: 'story_trial',
            forbidEscapeReason: '身后便是重伤的贾通宝，此时退步二人必死无疑！',
            introText: '【车轮连战 · 古柏寒林死斗】迎战洛阳黑市杀手【断魂刀 · 赵魁】与副手【血爪 · 孙七】！',
            onWin: [openScene('scene_slq03_05', SHAOLIN_Q03_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('断魂刀赵魁刀法狠辣，借古柏掩护暂退喘息后再战！', 'warn', '古柏寒林'),
            ],
          },
        ],
      },
    ],
  },

  scene_slq03_05: {
    id: 'scene_slq03_05',
    title: '第五幕 · 败敌护人',
    subtitle: '少室古柏寒林',
    mandatory: true,
    beats: [
      N('古柏林间劲风激荡，落叶纷飞如雨！你凭数月来在少林精修的内息与拳棍绝艺，先以巧劲震飞孙七短刀并将其击晕于柏树下，继而正面硬撼赵魁七记夺命重刀，寻隙一掌印中其左肋！'),
      S(SPEAKER_ZHAO_KUI, '（哇地吐出一口逆血，眼中满是惊骇）“点子扎手！少林外门何时出了这等硬茬？风紧，扯呼！”'),
      N('赵魁反手掷出一枚刺鼻灰烟丸，借着浓烟滚滚狼狈窜入深山密林。你并未贸然深追，连忙扶起瘫软在地的贾通宝，将其带入钟鼓禅院偏厢金疮敷药止血。'),
    ],
    onFinishEffects: [openScene('scene_slq03_06', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_06: {
    id: 'scene_slq03_06',
    title: '第六幕 · 度牒黑幕',
    subtitle: '钟鼓禅院偏厢',
    mandatory: true,
    beats: [
      N('半柱香后，贾通宝服下止血金疮药，脸色稍缓，望着紧闭的窗棂仍心有余悸，压低声音道出惊天隐秘。'),
      S(SPEAKER_JIA_TONGBAO, '“{gender:少侠|女侠}救命之恩，小人永世不忘！不瞒你说，小人原以为替知客禅师玄净经手香火银，不过是赚些寻常富商子弟上山学艺的门路钱……”'),
      S(SPEAKER_JIA_TONGBAO, '“可前日我去洛阳黑市暗庄结账，竟无意间撞见他们把朝廷赐予少林寺的免税『空名度牒』高价倒卖给洛阳豪绅！大宋律法，凡持官方度牒者可免丁口税役，那些豪绅买下空名度牒挂名避税，动辄便逃去官府数千贯赋税！”'),
      P('（闻言心神剧震）“倒卖朝廷空名度牒？！此乃触犯大宋国法、败坏少林千年清誉之重罪！此事真是知客禅师玄净所为？”'),
    ],
    onFinishEffects: [openScene('scene_slq03_07', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_07: {
    id: 'scene_slq03_07',
    title: '第七幕 · 托付私册',
    subtitle: '钟鼓禅院偏厢',
    mandatory: true,
    beats: [
      N('贾通宝咬咬牙，颤巍巍解开怀中染血油布包，取出一本封皮泛黄的密账——《知客院香火私册》，塞入你掌心。'),
      S(SPEAKER_JIA_TONGBAO, '“正是那位面上慈眉善目、满口佛缘的玄净禅师！他与洛阳几家大豪绅勾结已逾三年，小人只因多嘴问了一句度牒印信来历，他们便雇了黑市断魂刀赵魁要杀我灭口！小人拼着挨了一刀才从暗庄偷出这本真账！”'),
      S(SPEAKER_JIA_TONGBAO, '（起身向你深深一拜，满眼仓皇）“此地绝不可久留，小人这便趁夜色深重溜下山去躲往乡下老家。这本私册交给{gender:少侠|女侠}处置——无论你是拿去揭发，还是留作自保，小人都再不敢掺和了！”'),
      N('言罢，贾通宝裹紧破袍推开后窗，一瘸一拐消失在深沉夜幕之中。'),
    ],
    onFinishEffects: [openScene('scene_slq03_08', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_08: {
    id: 'scene_slq03_08',
    title: '第八幕 · 孤灯核账',
    subtitle: '钟鼓禅院禅房 · 三更孤灯',
    illustrationUrl: '/assets/quests/sl_03_incense_ledger.jpg',
    illustrationCaption: '香火私册 · 钟鼓禅院孤灯验账，空名度牒黑幕水落石出',
    mandatory: true,
    beats: [
      N('三更梆响，禅房内孤灯如豆。你反闩房门，摊开染血的《知客院香火私册》，运起平素苦修的算术功底，取来算盘与炭笔逐笔核对账目。'),
      N('一笔笔看似寻常的「长明灯油」「殿瓦修缮」「放生功德」，经你逐行勾稽折算，竟赫然暗藏乾坤——三年间前后共有三十六道朝廷免税空名度牒借此名目流入洛阳豪绅之手，涉案私银高达四千余两！'),
      N('你心中怒火渐炽，正欲合册，指尖却在翻过最末一页「外门香火特录」时猛然一僵——'),
      N('泛黄宣纸上，墨迹犹新地写着一行小字：『洛阳牙人贾通宝代递香火银二百两，举荐新徒入外门，知客院玄净亲押』——后面落款处，赫然正是你的名字！'),
    ],
    onFinishEffects: [openScene('scene_slq03_09', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_09: {
    id: 'scene_slq03_09',
    title: '第九幕 · 深夜来客',
    subtitle: '钟鼓禅院禅房',
    mandatory: true,
    beats: [
      N('“吱呀——”禅房木门竟在无声无息间被人以内劲震开木闩，缓缓推开。冷风灌入，烛火剧烈摇曳，映出一张素来和煦、此刻却冷若冰霜的僧面。'),
      N('来人正是知客禅师【玄净】！他手捻紫檀念珠，缓步走至书案前，目光精准落在那本摊开的《知客院香火私册》上。'),
      S('NPC-0193', '（轻声一叹，佛号低沉）“阿弥陀佛。方才古柏林中兵刃相交之声惊动了老衲，听闻你救下了一个满身是血的洛阳牙人……看来，赵魁那帮江湖草莽终究还是办事不力啊。”'),
      P('（霍然起身按住私册，神色冷峻）“玄净师叔！倒卖朝廷空名度牒、勾结黑市杀人灭口，你身为少林知客禅师，难道就不怕佛祖降罪、寺规严惩吗！”'),
    ],
    onFinishEffects: [openScene('scene_slq03_10', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_10: {
    id: 'scene_slq03_10',
    title: '第十幕 · 威逼利诱',
    subtitle: '钟鼓禅院禅房',
    mandatory: true,
    beats: [
      S('NPC-0193', '（不怒反笑，抬指轻轻点向账册最末一页）“佛祖慈悲，可你我皆是肉体凡胎。师侄，你方才翻到最末一页时，想必也瞧见自己的名字了吧？”'),
      S('NPC-0193', '“少林寺清规森严，私贿知客、蒙混入寺者，轻则废功逐山，重则押交戒律院受杖刑！你若把这本私册呈给玄苦、玄难那两位铁面师兄，老衲固然难逃干系，可你当年托贾通宝递二百两银子买门路入寺的丑事，同样会公之于众，你苦修至今的前程也将毁于一旦！”'),
      S('NPC-0193', '（话锋一转，语气温软下来，自袖中滑出一张沉甸甸的洛阳钱庄银票轻推案前）“反之，你若此刻将私册投炉烧作灰烬，这三百两雪花官银便归你所有！你当年入寺旧案永埋黄土，日后在少林寺内，老衲与知客院上下更保你步步青云！何去何从，师侄不妨三思。”'),
    ],
    onFinishEffects: [openScene('scene_slq03_11', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_11: {
    id: 'scene_slq03_11',
    title: '第十一幕 · 晓雾抉择',
    subtitle: '钟鼓禅院门前',
    mandatory: true,
    beats: [
      N('玄净并未当场强夺——他深知禅院四周皆是少林高僧耳目，一旦动武势必惊动方丈院与罗汉堂。他只留下一句“天明之前，我在禅院后炉候你答复”，便合掌悄然退入夜色。'),
      N('你紧握那本尚带血温的《知客院香火私册》，推门步入微明晓雾之中。'),
      N('一边是三百两纹银、玄净的庇护与自己入寺旧案的彻底湮灭；另一边是【十八铜人罗汉堂 · 罗汉堂演武正殿】中刚正不阿的「降魔尊者」玄苦长老，以及可能招致自身受罚的坦诚清查……'),
    ],
    choices: [
      {
        id: 'slq03_go_decide',
        label: '携《知客院香火私册》步入晓雾，前往罗汉堂演武正殿或禅院做出最终决断',
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
    title: '第十二幕 · 佛前拷心',
    subtitle: '罗汉堂演武正殿 / 钟鼓禅院（终极抉择）',
    mandatory: true,
    beats: [
      N('东方天际泛起一抹鱼肚白，嵩山晨钟即将撞响。手中这本薄薄的《知客院香火私册》，此刻重若千钧。'),
      N('若折返钟鼓禅院替玄净焚毁私账，你既可得三百两厚银与知客院人脉，又可抹去当年行贿入寺的污点；若直入罗汉堂演武正殿密呈玄苦长老清查，纵使牵连自身旧过，亦能肃清少林蛀虫、守住佛门百年清誉！'),
    ],
    choices: [
      {
        id: 'slq03_choice_cover_up',
        label: '【隐秘焚账】折返钟鼓禅院替玄净销毁私账（得 300 两银 · 玄净好感大增 · 侠义降低）',
        subLabel: '抹除当年入寺旧录，与知客禅师结下私密暗约',
        tone: 'danger',
        effects: [openScene('scene_slq03_13', SHAOLIN_Q03_QUEST_ID)],
      },
      {
        id: 'slq03_choice_report_xuanku',
        label: '【大义清查】直入罗汉堂演武正殿密呈玄苦长老（得 100 贡献 · 玄苦玄难嘉许 · 侠义大增）',
        subLabel: '坦然自承当年旧过，凛然揭发空名度牒黑幕',
        tone: 'gold',
        effects: [openScene('scene_slq03_14', SHAOLIN_Q03_QUEST_ID)],
      },
    ],
  },

  scene_slq03_13: {
    id: 'scene_slq03_13',
    title: '第十三幕 · 炉火焚证',
    subtitle: '钟鼓禅院后院铜炉（焚账线）',
    mandatory: true,
    beats: [
      N('你终究没有踏进罗汉堂正殿，而是转身折返钟鼓禅院后院。晨雾缭绕间，玄净早已独自立于焚纸铜炉旁，见你归来，紧绷的眉峰骤然舒展。'),
      P('（沉默片刻，将《知客院香火私册》投入熊熊跃动的铜炉火舌之中）“旧账已焚，从此再无这本册子。只是玄净师叔好自为之，莫再雇黑市杀手在少室山门下造杀孽。”'),
      S('NPC-0193', '（望着纸页连同你的名字一同蜷曲化作黑灰，长舒一口气，亲手将三百两兑票与重沉沉的银囊塞入你袖中）“善哉，善哉！师侄果然是个识时务的通透人！老衲言出必行，这三百两银子权作谢礼，往后在少林寺内，你我便是一条船上的自家人！”'),
    ],
    onFinishEffects: [openScene('scene_slq03_15', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_14: {
    id: 'scene_slq03_14',
    title: '第十四幕 · 正殿密呈',
    subtitle: '十八铜人罗汉堂 · 罗汉堂演武正殿（清查线）',
    mandatory: true,
    beats: [
      N('你深吸一口清冽晨气，毅然踏入罗汉堂演武正殿。殿内「降魔尊者」玄苦与「伏魔首座」玄难正于晨课前议事，见你神色肃穆求见，连忙示意左右退下。'),
      P('（双手捧上《知客院香火私册》，屈膝跪地坦然禀明）“启禀玄苦师祖、玄难师祖！弟子昨夜于古柏寒林救下遭黑市灭口的洛阳牙人贾通宝，查获知客禅师玄净三年来暗中倒卖朝廷空名度牒之私册！且……账册末页记有弟子当年托人递银入寺之旧事，弟子绝不敢隐瞒，甘愿领受寺规严惩！”'),
      S('NPC-0126', '（逐页翻阅私册，铁青的面色愈发凝重，拍案震得铜香炉嗡嗡作响）“好个玄净！竟敢勾结豪绅倒卖朝廷免税度牒、雇凶灭口，败坏我少林千年清誉！玄难师弟，即刻封锁知客院账房，密禀方丈师兄严查！”'),
      S('NPC-0127', '（颔首沉声道）“师兄放心，老衲这便亲去拿账！至于这位外门弟子……虽当年求艺心切沾了些俗尘，然今日临大利而不昧本心、敢于自揭其短以护祖庭，实乃难得的铮铮铁骨！”'),
    ],
    onFinishEffects: [openScene('scene_slq03_16', SHAOLIN_Q03_QUEST_ID)],
  },

  scene_slq03_15: {
    id: 'scene_slq03_15',
    title: '第十五幕 · 暗流尘定',
    subtitle: '钟鼓禅院石阶（焚账线结局）',
    mandatory: true,
    beats: [
      N('“咚——”雄浑的五更晨钟准时响彻少室群峰。你揣着三百两银囊步出钟鼓禅院，晨风吹散了炉口最后一缕焦烟，仿佛昨夜古柏寒林的刀光血影与孤灯黑账皆未曾发生。'),
      N('唯有你心中清楚，千年古刹香火鼎盛之下暗流汹涌，而你已与知客禅师玄净结下了一道不足为外人道的隐秘牵绊。'),
    ],
    choices: [
      {
        id: 'slq03_finish_cover_up',
        label: '收妥三百两纹银，深藏今夜隐秘（完成《香火黑账 · 知客暗流》）',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'sl_xuanjing_debt', value: true },
          { type: 'giveSilver', amount: 300, reason: '替玄净焚毁香火私册所得封口厚银' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0193' }, delta: 25 },
          { type: 'modifyChivalry', delta: -15, reason: '替知客禅师玄净焚毁香火黑账' },
          { type: 'giveCombatExp', amount: 160, reason: '古柏寒林以一敌二力战黑市断魂刀赵魁' },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q03_QUEST_ID, outcome: 'cover_up' },
          toast(
            '已完成《香火黑账 · 知客暗流》（焚账线）！获 300 两纹银与玄净暗中庇护，侠义值下降。',
            'warn',
            '知客暗流',
          ),
        ],
      },
    ],
  },

  scene_slq03_16: {
    id: 'scene_slq03_16',
    title: '第十六幕 · 清风正气',
    subtitle: '罗汉堂演武正殿（清查线结局）',
    mandatory: true,
    beats: [
      S('NPC-0126', '（合上私册，走下法座亲手扶起你，目光深邃温和）“善哉！知错能改，善莫大焉；见恶敢言，方为真罗汉！你当年行贿之小过，念你已熬满一年杂役又立下此番肃清祖庭之大功，老衲与玄难师弟做主功过相抵、不再追究，更破格赐你百点师门贡献以彰正气！”'),
      N('不多时，知客院方向传来戒律僧清点账册的急促脚步声。玄净虽凭早年几分香火人情暂未立刻逐出山门，却被削去知客实权、严加看管，遥遥望见你走出罗汉堂时，眼底闪过一丝怨毒寒芒。'),
      N('你迎着初升朝阳合十长揖——纵使前路暗礁密布，这一刻胸中浩然正气，无愧天地与佛祖金身！'),
    ],
    choices: [
      {
        id: 'slq03_finish_report_xuanku',
        label: '合十谢过玄苦、玄难二位长老（完成《香火黑账 · 知客暗流》）',
        tone: 'gold',
        effects: [
          { type: 'setFlag', flag: 'sl_righteous_monk', value: true },
          { type: 'addSectContribution', amount: 100 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0126' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0127' }, delta: 15 },
          { type: 'modifyChivalry', delta: 20, reason: '大义凛然密呈香火私册、肃清少林度牒黑幕' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0193' }, delta: -20 },
          { type: 'giveCombatExp', amount: 160, reason: '古柏寒林以一敌二力战黑市断魂刀赵魁' },
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'completeQuest', questId: SHAOLIN_Q03_QUEST_ID, outcome: 'report_xuanku' },
          toast(
            '已完成《香火黑账 · 知客暗流》（清查线）！获 100 门派贡献、玄苦与玄难长老赏识，侠义大增！',
            'success',
            '清风正气',
          ),
        ],
      },
    ],
  },
}
