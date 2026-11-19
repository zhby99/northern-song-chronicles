import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_SIDE05_QUEST_ID } from './zhongnanSidePersianMerchantQuest'

const SPEAKER_PERSIAN_MERCHANT: StorySpeakerSpec = {
  kind: 'custom',
  name: '波斯大商 · 阿里木',
  title: '丝路香料珠宝商队首领',
  factionName: '西域商帮',
  portraitUrl: '/assets/characters/templates/tpl_xixia_court_male_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
}

const SPEAKER_XINGXIU_ACCOMPLICE: StorySpeakerSpec = {
  kind: 'custom',
  name: '星宿毒手 · 丁老四',
  title: '星宿派外门散毒弟子',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildXingxiuAccomplice(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNS05_XINGXIU_ACCOMPLICE',
    name: '星宿毒手 · 丁老四',
    title: '星宿派外门散毒弟子',
    realm: '三流中品',
    factionName: '星宿派',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“乌师兄，这终南小道士自己送上门来，正好拿他试咱们的腐骨迷香！”',
    stats: { hp: 680, mp: 380, agi: 36, res: 30 },
    talents: { bone: 54, comprehension: 58, charm: 30 },
    equippedArts: {
      neigong: 'MA-099',
      qinggong: 'MA-157',
      move1: 'MA-127',
      move2: 'MA-137',
    },
    learnedArts: [
      { artId: 'MA-099', level: 4 },
      { artId: 'MA-157', level: 4 },
      { artId: 'MA-127', level: 4 },
      { artId: 'MA-137', level: 4 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zns05_01: {
    id: 'scene_zns05_01',
    title: '第一幕 · 丝路惊案',
    subtitle: '京兆府 · 西市胡商坊',
    illustrationUrl: '/assets/quests/zn_side05_xishi_case.jpg',
    illustrationCaption: '西市胡栈外围满商旅，波斯商队首领焦急指着残留诡异紫烟的窗棂',
    mandatory: true,
    beats: [
      N('{reignYear}夏末，长安西市胡商坊喧闹非凡，今日一家波斯大商队下榻的胡栈前却围得水泄不通。高鼻深目的波斯大商阿里木急得满头大汗，正连声向路人哭诉。'),
      S(
        SPEAKER_PERSIAN_MERCHANT,
        '“天可怜见！昨夜窗缝飘进一股甜腻紫烟，我们商队十二个护卫全数昏睡不醒！醒来时，准备进献大宋贵人的三匣南海明珠与一坛波斯苏合辟毒香全被盗光了！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns05_02', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_02: {
    id: 'scene_zns05_02',
    title: '第二幕 · 狂风识毒',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      N('你正欲上前查看窗棂残留的紫灰，身旁忽然响起一声冷哼。转头一看，竟是华山剑宗名宿「狂风快剑」封不弃，正用剑鞘挑起一撮香灰轻嗅。'),
      S(
        'NPC-0167',
        '（瞥见你的终南装束，微一抱拳）“终南道友也来凑这热闹？你且瞧这紫灰——甜中带腥，烧尽呈青黑色，分明是西域星宿派炼制的『幽兰迷魂香』！这帮邪魔歪道竟敢把手伸到长安西市来了！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns05_03', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_03: {
    id: 'scene_zns05_03',
    title: '第三幕 · 循香追踪',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      P('（细察胡栈后院墙根，拾起半枚沾着泥灰的波斯红珊瑚珠）“封前辈请看，贼人逃走时箱笼擦破了墙角，这枚红珊瑚珠与一股淡淡的苏合香气息，一路指向西市北角那片荒废的旧酒坊！”'),
      S(
        'NPC-0167',
        '（眼中露出赞许之色）“终南弟子果然心思缜密！我已查明，领头潜伏长安的星宿恶徒名叫乌承海，身边还带着一名善使毒砂的同伙。咱们等到入夜，给这帮毒虫来个瓮中捉鳖！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns05_04', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_04: {
    id: 'scene_zns05_04',
    title: '第四幕 · 巷口分兵',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      N('二更时分，西市夜市渐散，荒废旧酒坊深处的一座地下暗窖却透出幽幽绿火，隐约传来分赃嬉笑之声。'),
      S(
        'NPC-0167',
        '（按剑低声道）“这暗窖有前后两处通风口。我轻功快，去守住后巷出口以防他们狗急跳墙放毒逃窜；{gender:少侠|女侠}内息精纯正克星宿阴毒，便由你正面破门直捣暗窖，如何？”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns05_05', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_05: {
    id: 'scene_zns05_05',
    title: '第五幕 · 屏息破窖',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      P('（运起终南闭气护脉法门，沉声应诺）“前辈放心！区区两个星宿毒虫，我一人足以擒下！”'),
    ],
    choices: [
      {
        id: 'zns05_start_raid',
        label: '屏息凝神，正面破门夜捣西市暗窖',
        tone: 'danger',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_SIDE05_QUEST_ID, stepId: 'raid_xishi_cellar' },
          openScene('scene_zns05_06', ZHONGNAN_SIDE05_QUEST_ID),
        ],
      },
    ],
  },

  scene_zns05_06: {
    id: 'scene_zns05_06',
    title: '第六幕 · 暗窖绿火',
    subtitle: '京兆府 · 西市荒废酒窖',
    illustrationUrl: '/assets/quests/zn_side05_cellar_fight.jpg',
    illustrationCaption: '阴暗酒窖磷火幽幽，终南白衣剑客一脚踹开木门，独战星宿二贼',
    mandatory: true,
    beats: [
      N('你一脚踹开腐朽木门，清冽剑气瞬间卷散满窖腥臭迷烟！昏暗酒窖内，星宿派恶徒乌承海正与同伙丁老四清点三匣南海明珠，见有人破门而入，顿时凶相毕露！'),
      S('NPC-0705', '（抓起一把绿幽幽的毒砂厉声狂笑）“哪里来的终南小道士，敢坏你乌爷爷的好事！丁老四，咱们兄弟俩一起上，用毒砂喂饱他！”'),
      S(SPEAKER_XINGXIU_ACCOMPLICE, '“嘿嘿，叫他有来无回！”'),
    ],
    choices: [
      {
        id: 'zns05_fight_xingxiu',
        label: '屏息拔剑，1v2 激战星宿【乌承海】及其同伙！',
        subLabel: '对手：乌承海（三流中品）+ 星宿毒手丁老四（三流中品）',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_SIDE05_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0705' },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuAccomplice() }],
            rule: 'story_trial',
            introText: '【夜捣暗窖】于西市荒废酒窖以一敌二，激战星宿【乌承海】与【星宿毒手 · 丁老四】！',
            onWin: [openScene('scene_zns05_07', ZHONGNAN_SIDE05_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('星宿二贼联手散毒颇为难缠！调息解毒后再捣暗窖！', 'warn', '西市迷香'),
            ],
          },
        ],
      },
    ],
  },

  scene_zns05_07: {
    id: 'scene_zns05_07',
    title: '第七幕 · 剑破毒雾',
    subtitle: '京兆府 · 西市荒废酒窖',
    mandatory: true,
    beats: [
      N('暗窖狭窄，星宿二贼妄图借毒烟夹击，却不料你终南玄门内息至纯至正，长剑舞成一团清风剑幕，竟将漫天毒砂倒卷回去！'),
      N('二人自食毒烟阵脚大乱，被你连点重穴，惨叫着翻滚在地，彻底丧失反抗之力！'),
    ],
    onFinishEffects: [openScene('scene_zns05_08', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_08: {
    id: 'scene_zns05_08',
    title: '第八幕 · 封剑赞叹',
    subtitle: '京兆府 · 西市荒废酒窖',
    mandatory: true,
    beats: [
      N('封不弃闻声掠入暗窖，见地上捆得结结实实的乌承海二人，以及完好无损的三匣明珠与苏合香坛，不禁抚剑大笑。'),
      S('NPC-0167', '“痛快！一己之力在狭窖里连破两个星宿毒虫而不沾半点毒气，终南隐宗果然人才辈出！这两个妖人交给我押去见官，你快把失物还给那波斯胡商吧！”'),
    ],
    onFinishEffects: [openScene('scene_zns05_09', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_09: {
    id: 'scene_zns05_09',
    title: '第九幕 · 珠还胡商',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      N('次日清晨，你将三匣南海明珠与一坛苏合辟毒香原封不动交还波斯大商阿里木。胡商激动得连连抚胸行波斯大礼，商队护卫无不欢呼雀跃！'),
      S(
        SPEAKER_PERSIAN_MERCHANT,
        '“大宋终南山的侠客真是真主派来的义士！这批明珠若丢了，我全家在西域都要倾家荡产！请务必收下这五十两雪花纹银，还有我波斯商队最珍贵的几瓶辟毒神丹！”',
      ),
    ],
    onFinishEffects: [openScene('scene_zns05_10', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_10: {
    id: 'scene_zns05_10',
    title: '第十幕 · 秦晋侠情',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      N('封不弃也自府衙交人归来，与你在西市茶棚对饮一碗胡麻茶。'),
      S('NPC-0167', '“秦岭与西岳同属关中脊梁，今日与{gender:少侠|女侠}并肩破案，甚合老夫脾性！日后若到华山，定请你喝一壶关中老烧！”'),
    ],
    onFinishEffects: [openScene('scene_zns05_11', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_11: {
    id: 'scene_zns05_11',
    title: '第十一幕 · 丝路佳话',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      P('（抱拳笑道）“封前辈豪爽，晚辈记下了！胡商远来是大宋贵客，岂容星宿妖人败坏长安清誉！”'),
    ],
    onFinishEffects: [openScene('scene_zns05_12', ZHONGNAN_SIDE05_QUEST_ID)],
  },

  scene_zns05_12: {
    id: 'scene_zns05_12',
    title: '第十二幕 · 功成辞市',
    subtitle: '京兆府 · 西市胡商坊',
    mandatory: true,
    beats: [
      N('西市驼铃再起，波斯商队满载欢笑踏上东去东京开封的官道。你收好纹银与辟毒灵药，转身望向苍翠终南。'),
    ],
    choices: [
      {
        id: 'zns05_complete',
        label: '收下胡商厚谢纹银与辟毒良药，完成西市探案',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 50, reason: '波斯胡商酬谢破获迷香失窃案' },
          { type: 'giveItem', itemId: 'ITM-MED-113', qty: 2 },
          { type: 'giveItem', itemId: 'ITM-MED-116', qty: 2 },
          { type: 'giveCombatExp', amount: 300, reason: '西市迷香 · 波斯胡商案' },
          { type: 'modifyRenown', delta: 40, reason: '西市夜捣星宿毒窖、义助波斯胡商' },
          { type: 'modifyChivalry', delta: 30, reason: '除毒安商、扬名丝路' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0167' }, delta: 15 },
          { type: 'completeQuest', questId: ZHONGNAN_SIDE05_QUEST_ID, outcome: 'persian_case_solved' },
          toast(
            '【西市迷香 · 波斯胡商案】完成！获赠纹银 50 两、辟毒良药与战历！',
            'success',
            '西市迷香',
          ),
        ],
      },
    ],
  },
}
