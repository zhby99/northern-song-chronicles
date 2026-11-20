import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q14_QUEST_ID } from './zhongnanMuSichuanBeeQuest'

const SPEAKER_QINGCHENG_THUG: StorySpeakerSpec = {
  kind: 'custom',
  name: '余沧海门下恶徒 · 贾青峰',
  title: '青城别院 · 夺药剑客',
  factionName: '青城派',
  portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
}

function buildQingchengThugNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ14_QINGCHENG_THUG',
    name: '贾青峰',
    title: '青城恶徒 · 夺药快剑',
    realm: '二流上品',
    factionName: '青城派',
    sectRank: 2,
    sectRankLabel: '青城恶徒',
    avatarUrl: '/assets/characters/templates/tpl_qingcheng_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_qingcheng_fb.jpg',
    talk: '“青城山崖的紫雪断肠花，岂容你这外乡小辈私自采走！留下药匣，饶你不死！”',
    stats: { hp: 1820, mp: 1520, agi: 55, res: 38 },
    talents: { bone: 68, comprehension: 66, charm: 50 },
    equippedArts: { neigong: 'MA-228', move1: 'MA-187', move2: 'MA-188' },
    learnedArts: [{ artId: 'MA-228', level: 7 }, { artId: 'MA-187', level: 7 }, { artId: 'MA-188', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq14_01: {
    id: 'scene_znq14_01',
    title: '第一幕 · 幽轩蜂萎',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('{reignYear}盛夏，你自长安急返活死人墓，刚踏入玉蜂百花酿蜜幽轩，便心头一紧——往日金翅翻飞、花香四溢的石轩此刻一片死寂，十余个白玉蜂巢下散落着不少翅翼发紫、萎靡不振的玉蜂！'),
      S('NPC-0173', '（蹲身捧起一只气息微弱的玉蜂，眼圈微红）“果真如白师姐密档所言！昨夜一阵南风夹杂着淡紫瘴粉吹进后山花谷，玉蜂采蜜归巢后便陆续染了奇瘟……”'),
      P('“冷师姐莫慌！这『瘴毒蜂瘟散』源自西南巴蜀一带，寻常草药难解，唯有南下成都遍访药王名医方能对症下药！”'),
    ],
    onFinishEffects: [openScene('scene_znq14_02', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_02: {
    id: 'scene_znq14_02',
    title: '第二幕 · 领命入蜀',
    subtitle: '玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      S('NPC-0114', '（缓步入轩，以寒玉冰气暂且封住蜂巢防止毒瘟蔓延）“玉蜂乃我古墓百余年血脉所系，玉蜂浆更是治伤解毒至宝，断不可绝于我手。我以寒气可替它们续命半月，你速携毒粉样本入蜀寻药！”'),
      P('“弟子定不辱命，半月之内必携奇药归来救活玉蜂！”'),
    ],
    onFinishEffects: [openScene('scene_znq14_03', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_03: {
    id: 'scene_znq14_03',
    title: '第三幕 · 辞墓南行',
    subtitle: '秦岭古道',
    mandatory: true,
    beats: [
      N('你收好装有染毒花蜜样本的玉瓶，告别林朝瑶与冷清秋，一路翻越秦岭南下汉中，直奔天险剑门关！'),
    ],
    choices: [
      {
        id: 'znq14_depart_jianmen',
        label: '携蜂毒样本南下，经【剑门关 · 剑阁鸟道悬空栈】入蜀求药',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q14_QUEST_ID, stepId: 'cross_jianmen' },
          setStep(ZHONGNAN_Q14_QUEST_ID, 'cross_jianmen'),
          toast('请前往【剑门关 · 剑阁鸟道悬空栈】翻越蜀道入川！', 'talk', '蜀道求药'),
        ],
      },
    ],
  },

  scene_znq14_04: {
    id: 'scene_znq14_04',
    title: '第四幕 · 剑阁鸟道',
    subtitle: '剑门关 · 剑阁鸟道悬空栈',
    illustrationUrl: '/assets/quests/zn_q14_jianmen_plank.jpg',
    illustrationCaption: '蜀道求药 · 踏雪无痕飞渡剑门关绝壁悬空栈道',
    mandatory: true,
    beats: [
      N('蜀道之难，难于上青天。夏日骤雨方歇，剑阁鸟道悬空栈道湿滑如油，下方云雾万丈，连往来脚夫也只得停步观望。'),
      N('你救蜂心切，深吸一口气运起《踏雪无痕》，足尖轻点断木铁索，衣袂翻飞间竟如白鹤掠峡，引得栈口商旅无不惊呼赞叹！'),
    ],
    onFinishEffects: [openScene('scene_znq14_05', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_05: {
    id: 'scene_znq14_05',
    title: '第五幕 · 锦官城影',
    subtitle: '入蜀官道',
    mandatory: true,
    beats: [
      N('飞渡剑阁天险后，前方地势豁然开朗，沃野千里，竹影荷风扑面而来。不消两日，繁华富庶的成都府已遥遥在望。'),
    ],
    choices: [
      {
        id: 'znq14_go_baicao',
        label: '直入成都府，前往【西川百草药武堂】拜访苏百草',
        tone: 'primary',
        effects: [
          setStep(ZHONGNAN_Q14_QUEST_ID, 'visit_su_baicao'),
          toast('已入蜀地！请前往【成都府 · 西川百草药武堂】拜访锦江药王苏百草！', 'talk', '蜀道求药'),
        ],
      },
    ],
  },

  scene_znq14_06: {
    id: 'scene_znq14_06',
    title: '第六幕 · 百草辨毒',
    subtitle: '成都府 · 西川百草药武堂',
    mandatory: true,
    beats: [
      N('步入西川百草药武堂，满院晒满珍稀川药，药香沁人心脾。「锦江药王」苏百草正手持玉杵研药，接过你递上的玉瓶嗅了片刻，眉头顿时皱成川字。'),
      S('NPC-0316', '“啧啧，好狠毒的手段！这并非寻常蛇虫之毒，而是西夏人掺了南疆腐花瘴露炼出的『百花绝脉散』，专克灵蜂与药虫！”'),
      P('“敢问苏药王，此毒可还有救？”'),
    ],
    onFinishEffects: [openScene('scene_znq14_07', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_07: {
    id: 'scene_znq14_07',
    title: '第七幕 · 举荐审元',
    subtitle: '西川百草药武堂',
    mandatory: true,
    beats: [
      S('NPC-0316', '“老夫擅治人伤，却不精虫蜂奇方。好在成都府如今住着一位博古通今的大宋医家奇才——唐慎微唐审元先生！他毕生搜罗天下本草偏方，此刻正在青羊道宫校订医书。”'),
      S('NPC-0316', '“你持老夫名帖去青羊道宫寻他，定能问出对症奇方！”'),
    ],
    onFinishEffects: [openScene('scene_znq14_08', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_08: {
    id: 'scene_znq14_08',
    title: '第八幕 · 趋步青羊',
    subtitle: '西川百草药武堂外',
    mandatory: true,
    beats: [
      N('你拱手拜谢苏百草指点，怀揣名帖快步穿街过巷，直奔成都西郊古柏森森的青羊道宫。'),
    ],
    choices: [
      {
        id: 'znq14_go_qingyang',
        label: '持苏百草名帖前往【成都府 · 青羊道宫】拜见名医唐慎微',
        tone: 'primary',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0316' }, delta: 10 },
          setStep(ZHONGNAN_Q14_QUEST_ID, 'visit_tang_shenwei'),
          toast('请前往【成都府 · 青羊道宫】拜见大宋名医唐慎微！', 'talk', '蜀道求药'),
        ],
      },
    ],
  },

  scene_znq14_09: {
    id: 'scene_znq14_09',
    title: '第九幕 · 青羊医案',
    subtitle: '成都府 · 青羊道宫',
    mandatory: true,
    beats: [
      N('青羊道宫古柏参天，殿前铜羊温润生光。一袭素衣儒衫的唐慎微正伏案抄录《证类本草》草稿，听闻你为救活终南灵蜂万里奔波，顿时停笔细细查验毒样。'),
      S('NPC-0067', '“以毒攻毒，以寒化瘴……古方有载：欲解腐花绝脉之瘴，须采青城山绝壁所生『紫雪断肠花』取其蕊汁，再佐以蜀中唐门特制的『百毒清露』中和花毒，调入山泉喂蜂，三日即愈！”'),
    ],
    onFinishEffects: [openScene('scene_znq14_10', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_10: {
    id: 'scene_znq14_10',
    title: '第十幕 · 悬栈花讯',
    subtitle: '青羊道宫',
    mandatory: true,
    beats: [
      S('NPC-0067', '“只是那紫雪断肠花性喜阴湿毒雾，生于青城山万毒试炼涧的飞瀑铁索悬栈之畔，寻常人近不得身；而百毒清露更是唐门不传之秘，近日唐门『毒观音』唐红袖恰好在成都万里桥茶肆品茶，{gender:少侠|女侠}可先采花，再去茶肆与她商议！”'),
      P('“多谢唐先生指点迷津！大恩不言谢，晚辈这就赶赴青城山采花！”'),
    ],
    onFinishEffects: [openScene('scene_znq14_11', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_11: {
    id: 'scene_znq14_11',
    title: '第十一幕 · 疾驰青城',
    subtitle: '青羊道宫外',
    mandatory: true,
    beats: [
      N('唐慎微又赠你两粒避瘴清心丸。你谢过这位仁心医家，快马加鞭西出成都，直奔幽深险峻的青城山万毒试炼涧！'),
    ],
    choices: [
      {
        id: 'znq14_go_qingcheng',
        label: '前往【青城山 · 唐门万毒试炼涧 · 飞瀑铁索采药悬栈】采紫雪断肠花',
        tone: 'gold',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0067' }, delta: 15 },
          setStep(ZHONGNAN_Q14_QUEST_ID, 'pick_purple_flower'),
          toast('请前往【青城山 · 唐门万毒试炼涧 · 飞瀑铁索采药悬栈】采集紫雪断肠花！', 'talk', '蜀道求药'),
        ],
      },
    ],
  },

  scene_znq14_12: {
    id: 'scene_znq14_12',
    title: '第十二幕 · 铁索幽花',
    subtitle: '青城山 · 飞瀑铁索采药悬栈',
    illustrationUrl: '/assets/quests/zn_q14_poison_bridge.jpg',
    illustrationCaption: '万毒悬栈 · 铁索飞瀑间凌空采摘紫雪断肠花',
    mandatory: true,
    beats: [
      N('万毒试炼涧内五彩瘴气翻涌，两道生锈铁索横跨飞瀑深渊。你含住唐慎微所赠避瘴丸，运起《踏雪无痕》沿铁索凌空飞渡！'),
      N('只见绝壁湿苔之上，三朵通体紫莹如雪、花蕊隐泛寒光的奇花正随瀑风摇曳——正是紫雪断肠花！'),
    ],
    onFinishEffects: [openScene('scene_znq14_13', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_13: {
    id: 'scene_znq14_13',
    title: '第十三幕 · 暗影窥花',
    subtitle: '飞瀑铁索采药悬栈',
    mandatory: true,
    beats: [
      N('你以丝帕裹手，小心翼翼连根采下紫雪断肠花收入玉匣。回身跃上岸崖时，却敏锐地察觉林梢有两道青衫剑影一闪而逝，显然已盯上了你手中的奇花！'),
      P('“看来青城山中也有贪婪之辈盯上了紫雪断肠花……不可久留，速回成都锦江万里桥茶肆会晤唐红袖！”'),
    ],
    onFinishEffects: [openScene('scene_znq14_14', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_14: {
    id: 'scene_znq14_14',
    title: '第十四幕 · 返奔锦江',
    subtitle: '青城山道',
    mandatory: true,
    beats: [
      N('你怀揣玉匣甩开身后尾随耳目，一口气折返成都府锦江畔，直赴万里桥茶肆！'),
    ],
    choices: [
      {
        id: 'znq14_go_teahouse',
        label: '携紫雪断肠花前往【成都府 · 锦江万里桥茶肆】会晤唐红袖',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q14_QUEST_ID, 'teahouse_tang_hongxiu'),
          toast('已采得紫雪断肠花！请前往【成都府 · 锦江万里桥茶肆】会晤唐红袖！', 'success', '蜀道求药'),
        ],
      },
    ],
  },

  scene_znq14_15: {
    id: 'scene_znq14_15',
    title: '第十五幕 · 毒观音诺',
    subtitle: '成都府 · 锦江万里桥茶肆',
    illustrationUrl: '/assets/quests/zn_q14_chengdu_tea.jpg',
    illustrationCaption: '万里桥茶肆 · 与蜀中唐门毒观音切磋换药并退青城恶徒',
    mandatory: true,
    beats: [
      N('锦江万里桥茶肆临水而建，竹影婆娑。临窗雅座上，一袭绛红暗纹锦衣的唐红袖正把玩一只翠玉茶盏，见你携玉匣而来，眸光一亮。'),
      S('NPC-0219', '（轻笑一声，指尖轻叩桌面）“终南古墓的轻功果然名不虚传，连我唐门万毒悬栈的紫雪断肠花都能毫发无伤采回来。想要我的『百毒清露』？行啊——”'),
      S('NPC-0219', '“唐门不卖白食。久闻古墓暗器与身法冠绝关中，你若能在切磋中接下我几招，这瓶清露我便与你交换半朵花蕊，如何？”'),
    ],
    onFinishEffects: [openScene('scene_znq14_16', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_16: {
    id: 'scene_znq14_16',
    title: '第十六幕 · 茶肆切磋',
    subtitle: '锦江万里桥茶肆',
    mandatory: true,
    beats: [
      P('“既如此，晚辈便向唐前辈讨教几招，还请手下留情！”'),
      S('NPC-0219', '“好胆色！接招吧，小心我的袖里青蜂！”'),
    ],
    choices: [
      {
        id: 'znq14_spar_tang',
        label: '与「毒观音」唐红袖点到为止切磋（撑过三合或取胜）',
        tone: 'gold',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q14_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0219' },
            rule: 'survive_rounds',
            maxRounds: 3,
            lethalOnLose: false,
            introText: '茶肆临江空坪，唐红袖指尖暗器如雨，你以踏雪无痕与古墓手法拆招换药！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_znq14_17', ZHONGNAN_Q14_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_znq14_17', ZHONGNAN_Q14_QUEST_ID),
            ],
            onDraw: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_znq14_17', ZHONGNAN_Q14_QUEST_ID),
            ],
          },
        ],
      },
    ],
  },

  scene_znq14_17: {
    id: 'scene_znq14_17',
    title: '第十七幕 · 青城抢药',
    subtitle: '锦江万里桥茶肆',
    mandatory: true,
    beats: [
      N('三合甫罢，唐红袖拍手娇笑，刚将一只翡翠小瓶抛入你怀中，茶肆门口忽地冲入数名手按长剑的青衣恶徒！为首者正是先前在青城山涧尾随你的贾青峰！'),
      S(SPEAKER_QINGCHENG_THUG, '“站住！那紫雪断肠花长在青城山地界，理当归我兄弟所有！识相的把花匣和清露一并交出来！”'),
      S('NPC-0219', '（冷笑抿茶，袖手旁观）“青城派近来好没规矩，竟敢在老娘眼皮底下抢客人的东西。{gender:小家伙|小姑娘}，清露我已经给了你，能不能守住就看你自己本事喽。”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq14_18', ZHONGNAN_Q14_QUEST_ID),
    ],
  },

  scene_znq14_18: {
    id: 'scene_znq14_18',
    title: '第十八幕 · 护药退敌',
    subtitle: '锦江万里桥茶肆',
    mandatory: true,
    beats: [
      P('“这紫雪断肠花乃我冒死自万毒涧采得，岂容你们强抢豪夺！拔剑吧！”'),
    ],
    choices: [
      {
        id: 'znq14_fight_qingcheng',
        label: '出手击退抢药青城恶徒贾青峰',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q14_QUEST_ID,
            opponent: { kind: 'custom', npc: buildQingchengThugNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '紫雪断肠花与百毒清露关乎玉蜂性命，绝不能落入贼手！',
            introText: '锦江茶肆竹影翻飞，你挺剑迎战抢药的青城恶徒贾青峰！',
            onWin: [openScene('scene_znq14_19', ZHONGNAN_Q14_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('青城快剑颇为刁钻，唐红袖顺手弹出一枚铜钱替你解围，调息后再战！', 'warn', '蜀道求药'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq14_19: {
    id: 'scene_znq14_19',
    title: '第十九幕 · 辞蜀北归',
    subtitle: '锦江万里桥茶肆',
    mandatory: true,
    beats: [
      N('你以古墓轻灵剑招挑飞贾青峰长剑，再补两枚银针封住他肩穴，一干青城恶徒抱头鼠窜！'),
      S('NPC-0219', '（眼中满是欣赏）“身手干净利落，不拖泥带水。拿好百毒清露速回终南吧，莫误了救蜂时辰！”'),
      P('“多谢唐前辈成全！晚辈告辞！”'),
    ],
    choices: [
      {
        id: 'znq14_return_tomb',
        label: '携紫雪断肠花与百毒清露星夜返回【终南山 · 玉蜂百花酿蜜幽轩】',
        tone: 'jade',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0219' }, delta: 15 },
          setStep(ZHONGNAN_Q14_QUEST_ID, 'return_save_bees'),
          toast('奇药俱全！请速返【终南山 · 活死人墓 · 玉蜂百花酿蜜幽轩】救活玉蜂！', 'success', '蜀道求药'),
        ],
      },
    ],
  },

  scene_znq14_20: {
    id: 'scene_znq14_20',
    title: '第二十幕 · 琼浆回春',
    subtitle: '终南山隐宗 · 玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('你星夜兼程赶回活死人墓，依唐慎微古方将紫雪断肠花蕊汁与唐门百毒清露按比例调入寒玉涧清泉，化作一盏晶莹剔透的解毒琼浆，细细洒在白玉蜂巢之上。'),
      N('不过一炷香工夫，原本萎靡垂死的玉蜂双翅紫斑渐褪，竟陆续发出清越振翅之声，重新腾空盘旋，满轩复又花香氤氲！'),
    ],
    onFinishEffects: [openScene('scene_znq14_21', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_21: {
    id: 'scene_znq14_21',
    title: '第二十一幕 · 寒玉赞许',
    subtitle: '玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      S('NPC-0173', '（喜上眉梢，轻抚玉蜂巢）“活过来了！全都活过来了！{gender:师弟|师妹}，这千里蜀道辛苦你了！”'),
      S('NPC-0114', '（冰眸泛起难得暖意）“千里入蜀，不畏险栈毒瘴，既得名医之助，又能从容应对唐门与青城宵小，你已渐有独当一面之气象。”'),
    ],
    onFinishEffects: [openScene('scene_znq14_22', ZHONGNAN_Q14_QUEST_ID)],
  },

  scene_znq14_22: {
    id: 'scene_znq14_22',
    title: '第二十二幕 · 蜂鸣幽谷',
    subtitle: '玉蜂百花酿蜜幽轩',
    mandatory: true,
    beats: [
      N('群蜂绕轩欢舞，酿出新一批金光灿灿的玉蜂琼浆。林朝瑶赐你一瓶上等玉蜂浆调养经脉，并嘱咐你休整几日，不日将有更重要的江南试剑之行。'),
    ],
    choices: [
      {
        id: 'znq14_complete',
        label: '收下玉蜂琼浆与师门嘉赏，静候下一次历练',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'giveSilver', amount: 130, reason: '万里入蜀求药救蜂赏银' },
          { type: 'giveCombatExp', amount: 1650, reason: '蜀道求药、唐门切磋与退敌历练' },
          { type: 'addSectContribution', amount: 260 },
          { type: 'modifyRenown', delta: 40, reason: '蜀道求药扬名巴蜀江湖' },
          { type: 'modifyChivalry', delta: 20, reason: '不畏险阻救护古墓灵蜂' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0114' }, delta: 15 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0173' }, delta: 15 },
          { type: 'completeQuest', questId: ZHONGNAN_Q14_QUEST_ID, outcome: 'saved_jade_bees' },
          toast('《玉蜂琼浆 · 蜀道求药》圆满完成！', 'success', '蜀道求药'),
        ],
      },
    ],
  },
}
