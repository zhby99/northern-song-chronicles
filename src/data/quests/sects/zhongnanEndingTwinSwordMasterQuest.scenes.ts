import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, flag, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q37_QUEST_ID } from './zhongnanEndingTwinSwordMasterQuest'

const SPEAKER_BOTH_BRANCHES: StorySpeakerSpec = {
  kind: 'custom',
  name: '终南道墓两脉众弟子',
  title: '重阳古观与活死人墓门人',
  factionName: '终南隐宗',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq37_01: {
    id: 'scene_znq37_01',
    title: '第一幕 · 暮春琴箫',
    subtitle: '终南后山寒玉涧 · 寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，寒玉涧水清澈见底，两岸山花如云。临水抚琴榭内传出一阵缠绵清越、又带着几分超然物外之意的琴箫合鸣，连涧边白鹭也驻足倾听。'),
      N('你踏上水榭石阶，只见紫阳真人王重楼手持青玉洞箫，寒玉仙子林朝瑶轻抚焦尾古琴，二人眉宇间再无昔年沧桑郁结，唯余岁月静好的温柔笑意。'),
    ],
    onFinishEffects: [openScene('scene_znq37_02', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_02: {
    id: 'scene_znq37_02',
    title: '第二幕 · 曲终人聚',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('一曲终了，余音绕梁。王重楼放下洞箫，林朝瑶敛袖起身，二人相视一笑，随即同时望向立于阶前的你。'),
      S('NPC-0133', '“你来了。方才这一曲，乃是当年我与朝瑶初识时合谱的《太乙仙侣》，一隔二十余载，直到今日方才真正弹完最后三节。”'),
      S('NPC-0114', '（双颊微泛红晕，轻声含笑）“若不是你居中斡旋、拼死护法，我与他怕是要带着半生遗憾各自老死山中了。”'),
    ],
    onFinishEffects: [openScene('scene_znq37_03', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_03: {
    id: 'scene_znq37_03',
    title: '第三幕 · 偕隐之志',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      S('NPC-0133', '（牵起林朝瑶的手，目光坦荡而温润）“如今外敌已挫，道墓合流，重阳古观与活死人墓皆后继有人。我与朝瑶商议已定——愿就此卸下宗师重担，携一琴一剑，同游江南烟雨、塞外明月，把错过的二十年光阴补回来。”'),
      P('（闻言既为二老由衷欢喜，又不禁生出万千不舍，深深一揖）“两位前辈情深义重，历经风霜终成眷属，实乃武林千古美谈！弟子由衷贺喜！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_04', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_04: {
    id: 'scene_znq37_04',
    title: '第四幕 · 两仪合宗',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      S('NPC-0114', '“只是我二人走后，终南山不可无主。重阳古观与活死人墓既已合流，便不该再分彼此门户。我与重楼一致决意——将古观与古墓合为一宗，共立你为【终南两仪总宗主】！”'),
      P('（微微一惊）“两仪总宗主？！同时执掌重阳古观与活死人墓两脉大权，弟子唯恐力有未逮！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_05', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_05: {
    id: 'scene_znq37_05',
    title: '第五幕 · 众心归一',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄自水榭东侧含笑步出，拱手道）“{gender:师弟|师妹}切莫推辞！古观七子早已公议，唯有你兼通两脉心法、又促成两脉冰释，方能服众！”'),
      S('NPC-0173', '（冷清秋亦自西侧莲步轻移而来，眼中满是清澈笑意）“活死人墓诸姐妹亦无半点异议。若由你执掌两仪总宗，我愿率古墓一脉与马师兄并肩辅佐，永护终南！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_06', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_06: {
    id: 'scene_znq37_06',
    title: '第六幕 · 寒涧托梦',
    subtitle: '寒玉涧临水抚琴榭 · 仙侣偕隐之愿',
    illustrationUrl: '/assets/quests/zn_q37_qin_farewell.jpg',
    illustrationCaption: '寒玉涧临水抚琴榭 · 王重楼与林朝瑶琴箫合鸣，相视含笑吐露携手偕隐天涯之志',
    mandatory: true,
    beats: [
      N('水榭之外落英缤纷，马钰玄与冷清秋并肩而立，象征着重阳与古墓从此彻底水乳交融。'),
    ],
    onFinishEffects: [openScene('scene_znq37_07', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_07: {
    id: 'scene_znq37_07',
    title: '第七幕 · 双剑之约',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      S('NPC-0133', '“既如此，临行之前，我与朝瑶便破例联手一次！你在【繁花幽谷双剑合璧坪】接下我二人合璧剑阵，让两脉门人亲眼见识一下，新任两仪总宗主究竟有几分通天修为！”'),
      S('NPC-0114', '（嫣然一笑）“放心，我二人不会欺负你，只点到为止。你若能接住我二人双剑合璧而不落下风，另一脉的镇派神兵便一并交予你手，令你真正成为【双剑共主】！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_08', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_08: {
    id: 'scene_znq37_08',
    title: '第八幕 · 盛会传书',
    subtitle: '寒玉涧畔',
    mandatory: true,
    beats: [
      N('马钰玄与冷清秋立刻分头传信前山古观与后山古墓。不消半个时辰，青袍道众与白衣女侠数百人已齐聚繁花幽谷双剑合璧坪四周。'),
    ],
    onFinishEffects: [openScene('scene_znq37_09', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_09: {
    id: 'scene_znq37_09',
    title: '第九幕 · 移步花坪',
    subtitle: '寒玉涧花径',
    mandatory: true,
    beats: [
      N('你深吸一口馥郁花香，整理衣冠，步向繁花似锦的双剑合璧坪。'),
    ],
    choices: [
      {
        id: 'znq37_accept',
        label: '赴【繁花幽谷双剑合璧坪】，接受王重楼与林朝瑶联手试剑！',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q37_QUEST_ID, stepId: 'twinsword_joint_trial' },
          setStep(ZHONGNAN_Q37_QUEST_ID, 'twinsword_joint_trial'),
          toast('已开启终局《太乙仙侣 · 双剑共主》！请赴【繁花幽谷双剑合璧坪】接二老试剑！', 'talk', '双剑共主'),
        ],
      },
    ],
  },

  scene_znq37_10: {
    id: 'scene_znq37_10',
    title: '第十幕 · 双绝联袂',
    subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('繁花幽谷双剑合璧坪上，数百名青白衣衫弟子鸦雀无声。坪心之中，王重楼与林朝瑶各自执剑而立，一青一白，一阳一阴，尚未出招便已有绝世风华扑面而来！'),
      S('NPC-0133', '“{gender:孩子|丫头}，看好了！重阳剑法堂皇正大，玉女剑法灵动奇诡，今日老道与朝瑶便为你演一回真正的双剑合璧！”'),
      S('NPC-0114', '“拔剑吧！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_11', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_11: {
    id: 'scene_znq37_11',
    title: '第十一幕 · 迎战双绝',
    subtitle: '双剑合璧坪 · 宗师试剑',
    mandatory: true,
    beats: [
      P('（长剑出鞘，清越剑鸣震落满树繁花，微笑稽首）“晚辈不才，恭请两位宗师赐教！”'),
    ],
    choices: [
      {
        id: 'znq37_spar_couple',
        label: '迎战【王重楼】与【林朝瑶】双剑联袂切磋！',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: ZHONGNAN_Q37_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0133' },
            extraOpponents: [{ kind: 'npc', npcId: 'NPC-0114' }],
            rule: 'spar',
            lethalOnLose: false,
            forbidEscapeReason: '两脉数百门人观礼，宗师印证岂可退场？',
            introText: '繁花幽谷双剑合璧坪上，你独面紫阳真人王重楼与寒玉仙子林朝瑶联手试剑！',
            onWin: [openScene('scene_znq37_12', ZHONGNAN_Q37_QUEST_ID)],
            onLose: [openScene('scene_znq37_12', ZHONGNAN_Q37_QUEST_ID)],
            onDraw: [openScene('scene_znq37_12', ZHONGNAN_Q37_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_znq37_12: {
    id: 'scene_znq37_12',
    title: '第十二幕 · 三剑生辉',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('霎时间，坪上剑气纵横如织！王重楼剑势如岳，林朝瑶剑影如烟，二人心意相通，一攻一守浑然一体。而你身处双绝夹击之中却丝毫不乱，两脉心法在丹田化作圆融太极，每一剑皆恰到好处地化刚为柔、以正破奇！'),
    ],
    onFinishEffects: [openScene('scene_znq37_13', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_13: {
    id: 'scene_znq37_13',
    title: '第十三幕 · 太极花雨',
    subtitle: '双剑合璧坪 · 二老试剑',
    illustrationUrl: '/assets/quests/zn_q37_dual_test.jpg',
    illustrationCaption: '繁花幽谷双剑合璧坪 · 王重楼与林朝瑶联手试剑，三道剑光卷起漫天花雨化作太极星图',
    mandatory: true,
    beats: [
      N('百余招过罢，三剑剑尖在半空轻轻一触，一声清越如凤鸣的共振响彻终南山谷！漫天花瓣在空中凝停一瞬，随后缓缓飘洒如雨。'),
    ],
    onFinishEffects: [openScene('scene_znq37_14', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_14: {
    id: 'scene_znq37_14',
    title: '第十四幕 · 双绝击节',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '（收剑而立，抚掌大笑）“好！好一个兼通阴阳两仪的绝世剑手！单凭一人之身，便能在我与朝瑶的双剑合璧下进退自如，终南隐宗百年气运尽系于你矣！”'),
      S('NPC-0114', '（美眸盈笑，轻声叹道）“青出于蓝，我们两个老家伙，这下可以彻彻底底放心地去游山玩水了。”'),
    ],
    onFinishEffects: [openScene('scene_znq37_15', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_15: {
    id: 'scene_znq37_15',
    title: '第十五幕 · 满坪喝彩',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('观礼的数百名古观道众与古墓女侠顿时爆发出震天喝彩，马钰玄与冷清秋相视微笑，皆知终南隐宗最辉煌的时代已然到来。'),
    ],
    onFinishEffects: [openScene('scene_znq37_16', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_16: {
    id: 'scene_znq37_16',
    title: '第十六幕 · 敬备双匣',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('马钰玄与冷清秋亲手捧来紫檀与寒玉两只长匣，安放于坪心青石祭案之上。'),
    ],
    onFinishEffects: [openScene('scene_znq37_17', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_17: {
    id: 'scene_znq37_17',
    title: '第十七幕 · 两脉仪典',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-0133', '“吉时已到！今日于双剑合璧坪，行终南两仪合宗授剑大典！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_18', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_18: {
    id: 'scene_znq37_18',
    title: '第十八幕 · 登坛受剑',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('你在两脉数百弟子敬仰的目光中，缓步走上坪心石案之前。'),
    ],
    choices: [
      {
        id: 'znq37_go_enthrone',
        label: '登坛承接另一脉镇派神兵，受封【终南两仪总宗主】',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q37_QUEST_ID, 'twinsword_enthronement'),
          toast('请于【繁花幽谷双剑合璧坪】举行双剑共主登位大典！', 'success', '双剑共主'),
        ],
      },
    ],
  },

  scene_znq37_19: {
    id: 'scene_znq37_19',
    title: '第十九幕 · 双剑合璧',
    subtitle: '繁花幽谷双剑合璧坪 · 补授神兵',
    illustrationUrl: '/assets/quests/zn_q37_sword_reunite.jpg',
    illustrationCaption: '繁花幽谷双剑合璧坪 · 重阳天罡七星剑与寒玉素心冰魄剑双剑齐鸣，星光霜华交融冲霄',
    mandatory: true,
    beats: [
      N('{ifFlag:zn_branch==guguan|林朝瑶亲手开启寒玉长匣，将活死人墓镇派双宝【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】郑重交入你手！与你腰间原有的【重阳天罡七星剑】一刚一柔，竟同时发出清越共鸣！|王重楼亲手开启紫檀星匣，将重阳古观镇山神兵【重阳天罡七星剑】郑重交入你手！与你原有的【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】一阳一阴，竟同时发出清越共鸣！}'),
      S('NPC-0133', '“七星配冰魄，纯阳合寒玉！自今日起，你便是终南隐宗古往今来第一位——双剑共主，终南两仪总宗主！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_20', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_20: {
    id: 'scene_znq37_20',
    title: '第二十幕 · 两脉同拜',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄率重阳古观全真七子及众道众稽首下拜）“重阳古观一脉，拜见终南两仪总宗主！”'),
      S('NPC-0173', '（冷清秋率活死人墓诸位女侠盈盈下拜）“活死人墓一脉，拜见终南两仪总宗主！”'),
      S(SPEAKER_BOTH_BRANCHES, '“愿总宗主福寿绵长！愿终南两仪合宗，千秋永盛！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_21', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_21: {
    id: 'scene_znq37_21',
    title: '第二十一幕 · 总宗宣言',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      P('（左手寒玉冰魄，右手天罡七星，朗声传遍山谷）“自今日起，前山古观与后山古墓永无门户之见！两脉弟子互学所长，以玄门济世之胸怀，兼幽谷冰心之高洁，同护大宋苍生与武林正道！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_22', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_22: {
    id: 'scene_znq37_22',
    title: '第二十二幕 · 琴剑辞行',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('大典既成，王重楼背起那张焦尾古琴，林朝瑶携着一柄素雅竹剑，二人并肩立于山径入口，回头向你与两脉弟子微笑挥手。'),
      S('NPC-0133', '“江南春色正好，西湖烟雨未散，老道便带着朝瑶先走一步了！”'),
      S('NPC-0114', '“清秋，还有你这新任总宗主，往后可得把终南山照看好，莫叫我们来日回来时见着杂草丛生呀！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_23', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_23: {
    id: 'scene_znq37_23',
    title: '第二十三幕 · 泪笑相送',
    subtitle: '繁花幽谷山径',
    mandatory: true,
    beats: [
      S('NPC-0173', '（眼眶微润，却笑着深深一福）“师父与王真人一路顺风！弟子必辅佐总宗主守好终南！”'),
      P('（拱手长揖）“恭送两位宗师！愿二老琴瑟和鸣，永享仙侣逍遥！”'),
    ],
    onFinishEffects: [openScene('scene_znq37_24', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_24: {
    id: 'scene_znq37_24',
    title: '第二十四幕 · 携手踏云',
    subtitle: '终南山道',
    mandatory: true,
    beats: [
      N('山风吹起青袍与白衣，王重楼与林朝瑶十指相扣，轻功掠过漫山春花与层层云雾，渐渐远去。二十余载的遗憾与执念，终于化作人间最圆满的归宿。'),
    ],
    onFinishEffects: [openScene('scene_znq37_25', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_25: {
    id: 'scene_znq37_25',
    title: '第二十五幕 · 太乙仙侣',
    subtitle: '终南云海 · 偕隐江湖',
    illustrationUrl: '/assets/quests/zn_q37_couple_depart.jpg',
    illustrationCaption: '终南云海之间 · 王重楼背琴、林朝瑶执剑，二人携手踏云偕隐，终成太乙仙侣佳话',
    mandatory: true,
    beats: [
      N('漫天流云缓缓合拢，隐约间仿佛还有琴箫余韵随春风飘回山谷。'),
    ],
    onFinishEffects: [openScene('scene_znq37_26', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_26: {
    id: 'scene_znq37_26',
    title: '第二十六幕 · 重修索桥',
    subtitle: '终南后山寒玉涧',
    mandatory: true,
    beats: [
      N('此后数日，你命两脉弟子在寒玉涧上修起一座宽阔坚固的青石玉虹桥，将前山重阳古观与后山活死人墓彻底连为一体。'),
    ],
    onFinishEffects: [openScene('scene_znq37_27', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_27: {
    id: 'scene_znq37_27',
    title: '第二十七幕 · 阴阳共修',
    subtitle: '终南隐宗',
    mandatory: true,
    beats: [
      N('前山道院晨钟响起时，后山幽谷亦有琴声相和；古观弟子常赴寒玉涧切磋轻功，古墓传人亦登七星演剑坛印证剑理，终南气象空前兴盛。'),
    ],
    onFinishEffects: [openScene('scene_znq37_28', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_28: {
    id: 'scene_znq37_28',
    title: '第二十八幕 · 名震天下',
    subtitle: '终南山巅',
    mandatory: true,
    beats: [
      N('“终南双剑共主”的威名迅速传遍大宋南北，辽夏细作闻终南之名而丧胆，江湖正道诸派纷纷遣使致贺，尊终南隐宗为关中武林泰斗！'),
    ],
    onFinishEffects: [openScene('scene_znq37_29', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_29: {
    id: 'scene_znq37_29',
    title: '第二十九幕 · 两脉同辉',
    subtitle: '终南隐宗 · 盛世新篇',
    illustrationUrl: '/assets/quests/zn_q37_two_branches.jpg',
    illustrationCaption: '终南玉虹桥 · 青袍道众与白衣女侠往来论剑，重阳古观与活死人墓永结同心',
    mandatory: true,
    beats: [
      N('马钰玄掌前山教务，冷清秋理后山幽谷，一切井井有条，而你手握双剑，坐镇终南两仪中枢。'),
    ],
    onFinishEffects: [openScene('scene_znq37_30', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_30: {
    id: 'scene_znq37_30',
    title: '第三十幕 · 江南来鸿',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      N('某日清晨，一只雪白玉蜂飞落抚琴榭案头，带来一封来自江南杭州的素笺。展开一看，上面唯有寥寥两行字：“西湖莲开，酒暖琴清，勿念。”'),
    ],
    onFinishEffects: [openScene('scene_znq37_31', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_31: {
    id: 'scene_znq37_31',
    title: '第三十一幕 · 剑心无憾',
    subtitle: '寒玉涧临水抚琴榭',
    mandatory: true,
    beats: [
      P('（收好江南来笺，望向碧水青山，会心一笑）“二老安好，两脉同心，山河无恙。此生至此，复何求哉？”'),
    ],
    onFinishEffects: [openScene('scene_znq37_32', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_32: {
    id: 'scene_znq37_32',
    title: '第三十二幕 · 乾坤在掌',
    subtitle: '繁花幽谷双剑合璧坪',
    mandatory: true,
    beats: [
      N('七星剑与冰魄剑同时在鞘中轻吟，仿佛呼应着终南万壑松涛与万里大宋江山。'),
    ],
    onFinishEffects: [openScene('scene_znq37_33', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_33: {
    id: 'scene_znq37_33',
    title: '第三十三幕 · 双剑共主',
    subtitle: '终南山巅 · 大团圆终局',
    illustrationUrl: '/assets/quests/zn_q37_twinsword_master.jpg',
    illustrationCaption: '终南绝顶 · 双剑共主身负七星与冰魄双剑俯瞰云海，终南两仪总宗威震天下',
    mandatory: true,
    beats: [
      N('太乙仙侣归隐江湖，双剑共主镇守终南！'),
    ],
    onFinishEffects: [openScene('scene_znq37_34', ZHONGNAN_Q37_QUEST_ID)],
  },

  scene_znq37_34: {
    id: 'scene_znq37_34',
    title: '第三十四幕 · 两仪永盛',
    subtitle: '繁花幽谷双剑合璧坪 · 终局结案',
    mandatory: true,
    beats: [
      N('【终南终局 · 双剑共主】已然铸成！你促成太乙仙侣偕隐佳话，补齐两脉镇派神兵，正式登临终南隐宗五阶【终南两仪总宗主】尊位！'),
    ],
    choices: [
      {
        id: 'znq37_complete',
        label: '执掌双剑合鸣，正式登位【终南两仪总宗主】（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-11', rank: 5, promoteOnly: true },
          {
            type: 'branch',
            condition: flag('zn_branch', 'eq', 'guguan'),
            thenEffects: [
              { type: 'giveItem', itemId: 'WPN-103', qty: 1 },
              { type: 'giveItem', itemId: 'ACC-057', qty: 1 },
              toast('林朝瑶补授古墓镇派双宝【寒玉素心冰魄剑】与【昆仑寒玉冰心玦】！', 'success', '双剑共主'),
            ],
            elseEffects: [
              { type: 'giveItem', itemId: 'WPN-102', qty: 1 },
              toast('王重楼补授古观镇山神兵【重阳天罡七星剑】！', 'success', '双剑共主'),
            ],
          },
          { type: 'giveCombatExp', amount: 2000, reason: '促成太乙仙侣偕隐、两脉合宗，登位终南两仪总宗主' },
          { type: 'modifyRenown', delta: 360, reason: '受封双剑共主、终南两仪总宗主，美名传颂天下武林' },
          { type: 'modifyChivalry', delta: 130, reason: '化解二十载门派恩怨，成全太乙仙侣并护持两脉同心' },
          { type: 'modifySkill', key: '琴', delta: 1 },
          { type: 'modifySkill', key: '诗词', delta: 1 },
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'setFlag', flag: 'zn_ending', value: 'twinsword' },
          { type: 'completeQuest', questId: ZHONGNAN_Q37_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《太乙仙侣 · 双剑共主》！晋升终南隐宗五阶【终南两仪总宗主】，威望 +360，侠义 +130！',
            'success',
            '双剑共主',
          ),
        ],
      },
    ],
  },
}
