import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_Q13_QUEST_ID } from './huashanSiguoyaSecretQuest'

const SPEAKER_YIPINTANG_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名暗枭 · 西夏密谍',
  title: '西夏一品堂玄枢司密谍头领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildYipintangCaveSpyNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSQ13_YIPINTANG_SPY',
    name: '嵬名暗枭 · 西夏密谍',
    title: '西夏一品堂 · 盗拓魔刻密谍',
    realm: '一流中品',
    factionId: 'SECT-20',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '玄枢密谍',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“撞破我一品堂大计，便同这满洞华山死鬼一并长眠于此吧！”',
    stats: { hp: 2780, mp: 2300, agi: 66, res: 54 },
    equipped: {
      weapon: 'WPN-043',
      armor: 'ARM-025',
      shoes: 'BOT-016',
      accessory1: 'ACC-028',
    },
    equippedArts: { neigong: 'MA-245', move1: 'MA-133', move2: 'MA-127' },
    learnedArts: [{ artId: 'MA-245', level: 6 }, { artId: 'MA-133', level: 7 }, { artId: 'MA-127', level: 6 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hsq13_01: {
    id: 'scene_hsq13_01',
    title: '第一幕 · 锋芒既成须藏器',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('{reignYear}深秋入冬之交，西岳群峰霜叶尽落。紫霞正气主殿内檀香袅袅，掌门岳沧溟审视着你举手投足间隐而不发的《太岳三青峰》剑韵，微微颔首。'),
      S('NPC-0118', '“不骄不躁，三青峰气象已成四重火候。我华山近三十年来，年青一辈能将此门镇山剑术练到这等地步者，屈指可数。”'),
      P('“全赖师门长辈悉心栽培，弟子不敢有丝毫懈怠。”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_02', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_02: {
    id: 'scene_hsq13_02',
    title: '第二幕 · 关中暗流起西夏',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      N('岳沧溟屏退殿外洒扫童子，眉宇间却笼上一层深沉忧色。'),
      S('NPC-0118', '“只是树欲静而风不止。近日潼关与京兆府接连发现西夏一品堂高手的踪迹，彼辈似乎正在暗中搜集关中各派的武学破绽，图谋不轨。”'),
      S('NPC-0118', '“更令老夫不安的是，前日巡山弟子在思过崖下悬崖栈道，拾到了一枚西夏精钢飞爪的断齿。”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_03', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_03: {
    id: 'scene_hsq13_03',
    title: '第三幕 · 禁洞重锁勿轻启',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“思过崖？弟子记得入门之时曾在外坪练剑，后崖那座古山洞以千斤巨石与玄铁重锁死死封死，莫非西夏细作竟在窥伺后洞？”'),
      S('NPC-0118', '（神情微震，长叹一声）“后洞之中，封存着我华山派一段最惨痛的往事，连老夫与秦师兄三十年来都不忍再踏足半步。”'),
      S('NPC-0118', '“你刚练成《太岳三青峰》，正需借绝壁寒风洗去剑中躁火。即日起你便驻守【思过崖 · 面壁思过寒风剑坪】十日，一面磨砺剑意，一面替师门盯紧后崖动静！”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_04', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_04: {
    id: 'scene_hsq13_04',
    title: '第四幕 · 领命登临思过崖',
    subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
    mandatory: true,
    beats: [
      P('“弟子领命！有弟子一剑在崖，绝不容宵小踏入思过崖半步！”'),
    ],
    choices: [
      {
        id: 'hsq13_c04_accept',
        label: '辞别岳掌门，提剑赶赴思过崖寒风剑坪',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_Q13_QUEST_ID, stepId: 'q13_ledge_meditate' },
          toast('已接领《寒风面壁 · 铁锁惊雷》！请前往【思过崖古山洞 · 面壁思过寒风剑坪】！', 'talk', '思过驻剑'),
        ],
      },
    ],
  },

  scene_hsq13_05: {
    id: 'scene_hsq13_05',
    title: '第五幕 · 孤崖朔风涤剑心',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('思过崖三面悬空，下临万丈幽谷，唯有寒风剑坪上一株虬曲古松迎风傲立。你一连数日盘膝坐于崖石之上，将《太岳三青峰》一招一式在心中默演百遍。'),
      N('身后不远处的山壁凹陷处，那扇尘封三十年的厚重石门依旧拴着碗口粗的玄铁锁链，锁上积满斑驳铜绿与冰霜，死寂得听不见半点虫鸣。'),
    ],
    onFinishEffects: [openScene('scene_hsq13_06', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_06: {
    id: 'scene_hsq13_06',
    title: '第六幕 · 黑云摧城雷雨至',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('到了第七日入夜，天色骤变。滚滚墨云自渭水河谷翻涌而上，转瞬之间紫电撕裂苍穹，瓢泼冰雨夹杂着狂暴山风砸在青石剑坪之上，十步之外尽成白茫茫一片雨幕！'),
      P('（按剑立于松下岩檐，凝目望向漆黑雨夜）“这等雷暴狂风遮蔽耳目，正是最易潜行偷袭的时辰……绝不可大意！”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_07', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_07: {
    id: 'scene_hsq13_07',
    title: '第七幕 · 雷霆掩映断铁声',
    subtitle: '思过崖古山洞 · 面壁思过寒风剑坪',
    mandatory: true,
    beats: [
      N('“轰隆——！！”一道惨白惊雷炸响天际！就在雷声滚过的同一刹那，你敏锐的耳力忽然捕捉到后崖禁洞方向传来一声极短促、极刺耳的金铁崩断脆响！'),
      P('“不好！有人在借惊雷之声劈斩后洞玄铁锁！”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_08', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_08: {
    id: 'scene_hsq13_08',
    title: '第八幕 · 惊雷断锁黑影遁',
    subtitle: '思过崖古山洞 · 后洞石门外',
    illustrationUrl: '/assets/quests/hs_q13_iron_lock_broken.jpg',
    illustrationCaption: '惊雷断锁 · 暴风雨夜思过崖后洞重石铁锁遭西夏密谍斩断',
    mandatory: true,
    beats: [
      N('你身形如电掠过雨幕冲至后洞口！借着又一道闪电的惨白亮光，只见那把封锁石室三十年的玄铁巨锁已被利刃齐根斩成两截跌落泥水，沉重石门被推开一道尺许宽的黑缝，一道披着黑油斗篷的矫健鬼影刚刚闪入洞内深处！'),
      N('断锁切口平滑如镜，边缘竟泛着一丝西夏百炼冷锻弯刀特有的幽蓝寒纹！'),
    ],
    onFinishEffects: [openScene('scene_hsq13_09', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_09: {
    id: 'scene_hsq13_09',
    title: '第九幕 · 阴风扑面透寒彻',
    subtitle: '思过崖古山洞 · 后洞石门外',
    mandatory: true,
    beats: [
      N('石门缝隙中涌出一股尘封数十载的阴冷腐朽气息，隐隐还夹杂着干涸陈血与锈铁的苦涩味道。'),
      P('“果然是西夏一品堂的顶尖密谍！此时下山报信已然不及，若任由他盗走后洞机密从暗崖脱逃，华山危矣！”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_10', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_10: {
    id: 'scene_hsq13_10',
    title: '第十幕 · 燃炬拔剑入幽窟',
    subtitle: '思过崖古山洞 · 后洞石门外',
    mandatory: true,
    beats: [
      N('你从岩壁避雨龛中取过一柄松脂火把引燃，左手执炬，右手长剑出鞘，毅然闪身闯入那道尘封三十载的石门之后！'),
    ],
    choices: [
      {
        id: 'hsq13_c10_enter_cave',
        label: '高举松脂火把，紧追密谍踏入秘洞古剑刻石室',
        tone: 'danger',
        effects: [
          setStep(HUASHAN_Q13_QUEST_ID, 'q13_cave_pursuit'),
          toast('后洞铁锁已断！请进入【秘洞古剑刻石室】诛杀西夏一品堂密谍！', 'warn', '铁锁惊雷'),
        ],
      },
    ],
  },

  scene_hsq13_11: {
    id: 'scene_hsq13_11',
    title: '第十一幕 · 幽洞深回步步惊',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室甬道',
    mandatory: true,
    beats: [
      N('甬道曲折向下，两侧岩壁布满纵横交错的陈年剑凿痕迹。火把橘红的光晕在黑暗中跳跃，脚下碎石间忽然踩到半截锈蚀断剑，发出令人毛骨悚然的轻响。'),
      N('转过一道天然石屏，前方豁然开朗——一座宽逾十丈的幽深古石室赫然呈现在火光之下！'),
    ],
    onFinishEffects: [openScene('scene_hsq13_12', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_12: {
    id: 'scene_hsq13_12',
    title: '第十二幕 · 枯骨枕藉泣同门',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    illustrationUrl: '/assets/quests/hs_q13_bones_and_carvings.jpg',
    illustrationCaption: '枯骨魔刻 · 火把映照满地先辈骸骨与石壁同室操戈破招剑痕',
    mandatory: true,
    beats: [
      N('纵使你历经生死搏杀，眼前的景象仍令你倒吸一口凉气——石室地面之上，竟横七竖八倒卧着十余具身披华山道袍残片的森森白骨！'),
      N('有的骸骨胸骨被重掌震碎，有的骸骨咽喉仍插着同门的青钢长剑，两具白骨甚至至死仍互相死死掐着对方手腕，显然正是三十年前华山气剑大内讧时，在此闭门死斗、同归于尽的前辈宿老！'),
      P('（心头剧震）“这……这便是掌门不忍提及的后洞惨案！同门师兄弟，何苦相残至此……”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_13', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_13: {
    id: 'scene_hsq13_13',
    title: '第十三幕 · 四壁尽镌弑亲招',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('火光再往上移，石室四面青苍岩壁上以利剑生生镌刻着百余幅人形剑图，旁注字迹狰狞如血：「破紫霞行气七穴」「断混元归元三截」「锁夺命三仙死门」「摧太岳三青峰逆刺」！'),
      N('原来当年气剑两脉极端长老困死洞中前，竟各自呕心沥血将专门克制、残杀同门师兄弟的阴狠破招刻满石壁！招招不攻外敌，字字只诛华山自家血脉！'),
    ],
    onFinishEffects: [openScene('scene_hsq13_14', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_14: {
    id: 'scene_hsq13_14',
    title: '第十四幕 · 炭纸盗拓现凶踪',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室深处',
    mandatory: true,
    beats: [
      N('石室最深处的岩壁下，那名黑油斗篷男子正手持油炭与羊皮卷，狂喜地飞速摹拓壁上破招图谱！听见你的脚步声，他猛然回身掀落兜帽，露出一张鹰钩深目、左颊刺着西夏番文的面孔！'),
      S(SPEAKER_YIPINTANG_SPY, '“哈哈哈！天助我大夏一品堂！原以为只能摸清几招华山剑路，不想这禁洞石壁上，竟刻着你们华山老祖宗自己留下的破尽紫霞、混元、三仙、三青峰的全套死穴图！”'),
      P('“西夏贼子！难怪你们屡屡试探思过崖，原来是打听到了三十年前的内讧秘闻！”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_15', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_15: {
    id: 'scene_hsq13_15',
    title: '第十五幕 · 狂言欲灭西岳门',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室深处',
    mandatory: true,
    beats: [
      S(SPEAKER_YIPINTANG_SPY, '“只要将这羊皮拓卷献予没藏国相与征东诸将，来日我一品堂大举踏上玉女峰，你们华山上下有一个算一个，尽如插标卖首！”'),
      S(SPEAKER_YIPINTANG_SPY, '“小辈，你单枪匹马追进来，倒是省了本使灭口的功夫——受死！”'),
      P('“休想带走片纸只字！出刀吧！”'),
    ],
    onFinishEffects: [openScene('scene_hsq13_16', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_16: {
    id: 'scene_hsq13_16',
    title: '第十六幕 · 幽窟火影死生决',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室深处',
    illustrationUrl: '/assets/quests/hs_q13_cave_spy_duel.jpg',
    illustrationCaption: '幽窟诛谍 · 秘洞古剑刻石室深处激战斩杀西夏一品堂密谍',
    mandatory: true,
    beats: [
      N('你将松脂火把斜插进岩缝，幽暗石室顿时刀光剑影交织！嵬名暗枭拔出冷锻弯刀，左手更暗蓄阴毒五毒砂掌，直取你周身要害！'),
    ],
    choices: [
      {
        id: 'hsq13_c16_duel_spy',
        label: '催动《太岳三青峰》，于石室深处诛杀西夏密谍！',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: HUASHAN_Q13_QUEST_ID,
            opponent: { kind: 'custom', npc: buildYipintangCaveSpyNpc() },
            rule: 'duel',
            forbidEscapeReason: '一旦放跑西夏密谍，华山全派武学破绽将尽泄敌国！',
            introText: '【幽窟诛谍】在秘洞古剑刻石室死战西夏一品堂顶尖密谍嵬名暗枭（一流中品），夺回盗拓羊皮卷！',
            onWin: [openScene('scene_hsq13_17', HUASHAN_Q13_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hsq13_17: {
    id: 'scene_hsq13_17',
    title: '第十七幕 · 焚毁拓卷绝外患',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室深处',
    mandatory: true,
    beats: [
      N('《太岳三青峰》三剑连环如怒涛拍岸！第一剑荡开冷锻弯刀，第二剑震散毒砂掌风，第三剑挟千钧之势洞穿嵬名暗枭心口！'),
      N('嵬名暗枭惨哼倒地，怀中那卷拓了一半的羊皮纸滑落尘埃。你挑起羊皮卷凑到松脂火把上，眼看它化为一团焦黑灰烬，方才长舒一口浊气。'),
    ],
    onFinishEffects: [openScene('scene_hsq13_18', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_18: {
    id: 'scene_hsq13_18',
    title: '第十八幕 · 孤灯重照魔刻壁',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('外敌虽除，石室之内再度陷入死一般的沉寂，唯有洞外闷雷隐隐，火把噼啪作响。'),
      N('你缓缓转过身，目光再次落回四面石壁那百余幅凌厉阴狠的破招刻痕之上——只需看上几眼，便觉每一式都直指华山气剑两宗的命门死穴，端的是精妙绝伦而又歹毒彻骨！'),
    ],
    onFinishEffects: [openScene('scene_hsq13_19', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_19: {
    id: 'scene_hsq13_19',
    title: '第十九幕 · 剑心深处两重声',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      N('脚下是三十年前执迷不悟、同室操戈的先辈白骨；眼前是一旦习成便可横扫同门、无论气宗剑宗皆无人能制你的无上诡招。'),
      N('洞中无人知晓今夜发生的一切。是一剑削平这祸乱根源、收敛先辈骸骨以化两宗干戈？还是趁四下无人暗中默记私拓、重锁石门将克制全派的杀手锏握于掌中？'),
    ],
    onFinishEffects: [openScene('scene_hsq13_20', HUASHAN_Q13_QUEST_ID)],
  },

  scene_hsq13_20: {
    id: 'scene_hsq13_20',
    title: '第二十幕 · 泣血石壁一念分途',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    illustrationUrl: '/assets/quests/hs_q13_wall_crossroad.jpg',
    illustrationCaption: '一念正邪 · 独立泣血石壁之前，削壁止戈与私拓秘刻一念分途',
    mandatory: true,
    beats: [
      N('松脂火把渐燃至半，光影在你脸上明灭不定。你握紧手中长剑，在满壁泣血剑痕之前作出了决断——'),
    ],
    choices: [
      {
        id: 'hsq13_c20_harmony',
        label: '【削壁止戈】毁去同室操戈魔刻、收敛先辈遗骨，誓化两宗三十年冤孽',
        subLabel: '侠义+20 · 开启正统同源线《石室止戈 · 剑气同源》',
        tone: 'jade',
        effects: [openScene('scene_hsq13_21', HUASHAN_Q13_QUEST_ID)],
      },
      {
        id: 'hsq13_c20_usurp',
        label: '【私拓秘刻】暗记克制本门杀招、重锁石门秘而不宣，执掌无上权柄',
        subLabel: '侠义-20 · 开启霸道夺位线《魔刻噬心 · 破尽同门》',
        tone: 'danger',
        effects: [openScene('scene_hsq13_22', HUASHAN_Q13_QUEST_ID)],
      },
    ],
  },

  scene_hsq13_21: {
    id: 'scene_hsq13_21',
    title: '第二十一幕 · 剑心澄澈决意止戈',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      P('“我入华山之日，曾于紫霞殿前立誓『剑气本出一源』！这等专杀同门手足的魔刻留在世上一日，华山便永无宁日，更会引来外敌觊觎！”'),
      N('你深吸一口气，将西夏密谍尸身拖出洞外悬崖处置妥当，重新回到石室之中，准备亲手削去满壁魔刻、安葬诸位前辈遗骨。'),
    ],
    choices: [
      {
        id: 'hsq13_c21_done_harmony',
        label: '坚守剑气同源本心，准备于石室削壁葬骨',
        tone: 'jade',
        effects: [
          { type: 'setFlag', flag: 'hs_cave', value: 'harmony' },
          { type: 'modifyChivalry', delta: 20, reason: '思过崖秘洞拒学弑亲魔刻，决意削壁止戈' },
          { type: 'giveSilver', amount: 160, reason: '诛灭西夏一品堂潜入密谍缴获资财' },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveCombatExp', amount: 230, reason: '思过崖雨夜诛杀西夏一品堂顶尖密谍' },
          { type: 'modifyRenown', delta: 25, reason: '思过崖孤剑护住师门禁地机密' },
          { type: 'completeQuest', questId: HUASHAN_Q13_QUEST_ID, outcome: 'harmony' },
          toast(
            '已作出【削壁止戈】抉择！可在【秘洞古剑刻石室】继续开启《石室止戈 · 剑气同源》！',
            'success',
            '一念止戈',
          ),
        ],
      },
    ],
  },

  scene_hsq13_22: {
    id: 'scene_hsq13_22',
    title: '第二十二幕 · 幽火映眸暗藏霸图',
    subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
    mandatory: true,
    beats: [
      P('（凝视壁上凌厉绝伦的破招剑路，嘴角浮起一抹冷峭弧度）“兵无常势，剑无正邪。先辈沥血创出的破尽华山之法，毁了岂不可惜？只要握在我一人手中，来日华山上下，谁人敢逆我锋芒！”'),
      N('你将西夏密谍尸身抛落万丈深涧灭迹，反身掩上沉重石门，拾起地上残留的炭笔与绢帛，在幽暗火光下独自走向那面刻满杀招的石壁。'),
    ],
    choices: [
      {
        id: 'hsq13_c22_done_usurp',
        label: '掩上石室重门，准备于暗夜私拓破招秘刻',
        tone: 'danger',
        effects: [
          { type: 'setFlag', flag: 'hs_cave', value: 'usurp' },
          { type: 'modifyChivalry', delta: -20, reason: '思过崖秘洞隐瞒实情，决意私拓克制同门魔刻' },
          { type: 'giveSilver', amount: 160, reason: '诛灭西夏一品堂潜入密谍搜获暗金' },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveCombatExp', amount: 230, reason: '思过崖雨夜诛杀西夏一品堂顶尖密谍' },
          { type: 'modifyRenown', delta: 25, reason: '思过崖暗夜独战斩灭外敌密谍' },
          { type: 'completeQuest', questId: HUASHAN_Q13_QUEST_ID, outcome: 'usurp' },
          toast(
            '已作出【私拓秘刻】抉择！可在【秘洞古剑刻石室】继续开启《魔刻噬心 · 破尽同门》！',
            'warn',
            '魔刻暗藏',
          ),
        ],
      },
    ],
  },
}
