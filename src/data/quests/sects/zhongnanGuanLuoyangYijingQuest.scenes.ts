import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q21_QUEST_ID } from './zhongnanGuanLuoyangYijingQuest'

const SPEAKER_LIAO_SPY_CHIEF: StorySpeakerSpec = {
  kind: 'custom',
  name: '耶律孤影',
  title: '辽国南院暗桩首领',
  factionName: '大辽南院',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
}

const SPEAKER_LIAO_ASSASSIN: StorySpeakerSpec = {
  kind: 'custom',
  name: '契丹暗阁死士',
  title: '辽国南院细作',
  factionName: '大辽南院',
  avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
}

const LIAO_SPY_CHIEF_NPC = makeQuestNpc({
  id: 'znq21_liao_spy_chief',
  name: '耶律孤影',
  title: '辽国南院暗桩首领',
  realm: '一流下品',
  factionName: '大辽南院',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  talk: '“终南天罡阵图若落入我大辽之手，中原道门便再无险可守！”',
  stats: { hp: 2800, mp: 1550, agi: 78, res: 64 },
  equippedArts: {
    neigong: 'MA-243',
    qinggong: 'MA-157',
    move1: 'MA-152',
    move2: 'MA-150',
  },
  learnedArts: [
    { artId: 'MA-243', level: 7 },
    { artId: 'MA-157', level: 7 },
    { artId: 'MA-152', level: 7 },
    { artId: 'MA-150', level: 6 },
  ],
})

const LIAO_ASSASSIN_NPC = makeQuestNpc({
  id: 'znq21_liao_assassin',
  name: '契丹暗阁死士',
  title: '辽国南院细作',
  realm: '二流上品',
  factionName: '大辽南院',
  avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
  talk: '“拦住这两个牛鼻子，莫叫他们逃出天津酒楼！”',
  stats: { hp: 2300, mp: 1200, agi: 70, res: 58 },
  equippedArts: {
    neigong: 'MA-243',
    qinggong: 'MA-157',
    move1: 'MA-132',
    move2: 'MA-152',
  },
  learnedArts: [
    { artId: 'MA-243', level: 6 },
    { artId: 'MA-157', level: 6 },
    { artId: 'MA-132', level: 6 },
    { artId: 'MA-152', level: 6 },
  ],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq21_01: {
    id: 'scene_znq21_01',
    title: '第一幕 · 东出函谷赴西京',
    subtitle: '洛阳府 · 白马书院 · 垂柳荷池手谈水亭',
    illustrationUrl: '/assets/quests/zn_q21_luoyang_shaoyong.jpg',
    illustrationCaption: '秋柳疏荷掩映水亭，邵雍素袍临池手谈，郝大玄携徒恭敬拜谒',
    mandatory: true,
    beats: [
      N('{reignYear}晚秋，洛阳西郊伊洛水清。你随重阳古观广宁子【郝大玄】东出潼关，一路风尘仆仆，终于抵达声闻天下的【白马书院 · 垂柳荷池手谈水亭】。'),
      N('亭中残荷听风，一位身着青布宽袍、面容清癯儒雅的中年名士正独坐石案前，指间拈着一枚白子，神态安详如闲云野鹤——正是精研先天易数、著书《皇极经世》的大儒【邵雍】邵尧夫。'),
      S('NPC-1058', '（整衣敛袖，深深一揖）“终南重阳古观郝大玄，携门下{gender:师弟|师妹}拜见邵先生！家师王重楼命贫道持清茶一囊、易简一卷，特来向先生请益先天象数之微！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q21_QUEST_ID, stepId: 'visit_shaoyong' },
      { type: 'teleportPlayer', regionId: 'luoyang', buildingId: 'ly_shuyuan', spotId: 'ly_sy_pavilion' },
      openScene('scene_znq21_02', ZHONGNAN_Q21_QUEST_ID),
    ],
  },

  scene_znq21_02: {
    id: 'scene_znq21_02',
    title: '第二幕 · 尧夫笑迎终南客',
    subtitle: '白马书院 · 垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      S('NPC-0046', '（含笑起身还礼，目光温润清澈）“紫阳真人手书早已先一步递到安乐窝。道长与这位小友远道而来，请坐。洛阳深秋茶水正好，且先饮一盏暖胃。”'),
      P('“晚辈久仰先生《皇极经世》之学，今日得见真容，实乃三生有幸。”'),
      S('NPC-0046', '（执壶斟茶，轻笑道）“天地之道，不过一阴一阳、一动一静。重楼兄信中言及，重阳古观‘天罡北斗阵’遇强敌合围时，天枢与摇光衔接之际偶有一息气机迟滞，可是为此而来？”'),
    ],
    onFinishEffects: [openScene('scene_znq21_03', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_03: {
    id: 'scene_znq21_03',
    title: '第三幕 · 棋坪列星演北斗',
    subtitle: '白马书院 · 垂柳荷池手谈水亭',
    illustrationUrl: '/assets/quests/zn_q21_dipper_astrolabe.jpg',
    illustrationCaption: '黑白棋子化作天罡北斗七星，邵雍以先天易数点破阵眼生克流转之妙',
    mandatory: true,
    beats: [
      S('NPC-1058', '（欣喜摊开随身星图）“先生一语中的！我等演练北斗阵多年，按后天八卦布位，守御虽固，然一旦遭遇西夏一品堂或番僧奇兵猛冲天权、玉衡二位，七人真气便易首尾难顾。”'),
      S('NPC-0046', '（随手捻起七枚黑子，错落点在棋坪天元四周）“后天八卦主用，先天八卦主体。诸位只知北斗七星随斗柄旋转，却忘了‘北辰居其所而众星拱之’——阵眼不在七人脚步，而在七人心意相通的虚实转承。”'),
    ],
    onFinishEffects: [openScene('scene_znq21_04', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_04: {
    id: 'scene_znq21_04',
    title: '第四幕 · 先天易数点迷津',
    subtitle: '白马书院 · 垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('邵雍手腕微转，又以白子在黑子空隙处落了三子，原本看似滞涩的七星阵势霎时化作活水游龙，生生不息！'),
      S('NPC-0046', '“小友且看：若以天枢为乾、摇光为坤，遇敌猛攻中宫时，天枢不必硬抗，反退半步引敌入坎，令天璇、天玑自两翼合抱——你觉得这一变，妙在何处？”'),
    ],
    choices: [
      {
        id: 'znq21_ch_yijing_yin_yang',
        label: '“妙在虚实相生！天枢退而化守为引，令强敌如堕太极漩涡！”',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '棋', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0046' }, delta: 8 },
          openScene('scene_znq21_05', ZHONGNAN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'znq21_ch_yijing_calc',
        label: '“妙在步数精严！七星方位以三合六合互应，纵少一人亦不散阵！”',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '算术', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0046' }, delta: 8 },
          openScene('scene_znq21_05', ZHONGNAN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq21_05: {
    id: 'scene_znq21_05',
    title: '第五幕 · 尧夫击节叹奇才',
    subtitle: '白马书院 · 垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      S('NPC-0046', '（抚掌大笑）“好悟性！重楼兄门下果然英才辈出！我这便将先天六十四卦配天罡七星的推演图谱写于素绢之上，供古观诸道长参详。”'),
      S('NPC-1058', '（郑重收好素绢密录，躬身致谢）“多谢先生大德！有此先天阵眼秘算，重阳古观护山大阵威力必增数倍！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_06', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_06: {
    id: 'scene_znq21_06',
    title: '第六幕 · 柳影暗惊窥伺眼',
    subtitle: '白马书院 · 垂柳荷池手谈水亭',
    mandatory: true,
    beats: [
      N('就在郝大玄将素绢密录收入道袍袖袋之际，荷池对岸垂柳梢头忽地微不可察地一颤，几片枯叶逆风飘落水面！'),
      S('NPC-0046', '（执茶杯的手微微一顿，神色依旧淡然，声音却压低三分）“二位归途切记当心。近日洛阳城中多了不少操燕云口音、扮作皮货商贾的江湖客，昨夜更有生面孔在书院外徘徊。”'),
      P('“燕云口音……莫非是辽国南院派出的密探？他们竟盯上了先生与重阳古观的往来！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_07', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_07: {
    id: 'scene_znq21_07',
    title: '第七幕 · 诱敌出院护儒林',
    subtitle: '白马书院门外',
    mandatory: true,
    beats: [
      S('NPC-1058', '（眸中寒光一闪）“白马书院乃儒林清净之地，绝不能叫契丹细作在此惊扰邵先生与诸位学子！{gender:师弟|师妹}，我们故意露出行踪，把尾巴引到洛水天津酒楼一带，一网打尽！”'),
      P('“正该如此！天津桥畔临水开阔，正好将这群暗鼠逼出洞来！”'),
      S('NPC-0046', '（立于亭阶相送，拱手嘱咐）“风霜满路，二位千万保重。若遇险阻，记得方才棋坪上那句‘引敌入坎，借势反制’。”'),
    ],
    onFinishEffects: [openScene('scene_znq21_08', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_08: {
    id: 'scene_znq21_08',
    title: '第八幕 · 暮色暗巷听靴声',
    subtitle: '洛阳城西街',
    mandatory: true,
    beats: [
      N('二人辞别邵雍，缓步穿过暮色渐沉的洛阳长街。果然，身后半条街外，三四名头戴毡帽、腰间鼓囊的汉子不紧不慢地缀了上来，彼此间还以契丹暗哨的手势传递讯号。'),
      S('NPC-1058', '（目不斜视，低声传音）“鱼儿上钩了。前头便是【洛水天津酒楼】，我们上二楼临江雅座，待他们动手便反客为主！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_09', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_09: {
    id: 'scene_znq21_09',
    title: '第九幕 · 赴约天津酒楼前',
    subtitle: '洛阳府 · 洛水天津酒楼外',
    mandatory: true,
    beats: [
      N('洛水之上渔火点点，天津酒楼高悬酒旗，楼内丝竹喧嚣，却在二楼雅座方向透出一股若有若无的肃杀寒气。'),
    ],
    choices: [
      {
        id: 'znq21_ch_go_tavern',
        label: '踏入【洛水天津酒楼】，将尾随的辽国密探一举揪出！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q21_QUEST_ID, 'luoshui_ambush'),
          { type: 'teleportPlayer', regionId: 'luoyang', buildingId: 'luoyang_base_tavern' },
          { type: 'setFlag', flag: 'znq21_tavern_triggered', value: true },
          openScene('scene_znq21_11', ZHONGNAN_Q21_QUEST_ID),
        ],
      },
      {
        id: 'znq21_ch_prep_first',
        label: '先整顿行囊伤药，稍后再赴【洛水天津酒楼】',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q21_QUEST_ID, 'luoshui_ambush'),
          openScene('scene_znq21_10', ZHONGNAN_Q21_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq21_10: {
    id: 'scene_znq21_10',
    title: '第十幕 · 暂歇街角备锋芒',
    subtitle: '洛阳长街',
    mandatory: true,
    beats: [
      S('NPC-1058', '“谨慎些总是好的。我在【洛水天津酒楼】附近盯紧这群契丹细作，{gender:师弟|师妹}备妥丹药后便速来汇合！”'),
    ],
  },

  scene_znq21_11: {
    id: 'scene_znq21_11',
    title: '第十一幕 · 毒酒寒光现杀机',
    subtitle: '洛阳府 · 洛水天津酒楼',
    illustrationUrl: '/assets/quests/zn_q21_luoshui_tavern_ambush.jpg',
    illustrationCaption: '洛水天津酒楼灯火摇曳，辽国南院密探拔刀掀桌，剑光瞬间照亮夜江',
    mandatory: true,
    beats: [
      N('你与郝大玄步入【洛水天津酒楼】二楼雅间，店小二刚端上一壶杜康老酒，你便嗅到酒气中混着一缕极淡的草原苦杏仁味——正是辽人常用的迷魂散！'),
      P('（冷笑一声，挥袖震碎酒壶）“好拙劣的把戏！各位燕云来的‘皮货客’，既然都围在门外了，何必躲躲藏藏？”'),
      N('“砰！”雕花木门被人一脚踹碎！一名面容阴鸷、腰佩弯刀的契丹头目率数名暗阁死士鱼贯而入，冷笑声震得窗棂嗡嗡作响。'),
    ],
    onFinishEffects: [openScene('scene_znq21_12', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_12: {
    id: 'scene_znq21_12',
    title: '第十二幕 · 南院暗桩露真身',
    subtitle: '洛阳府 · 洛水天津酒楼',
    mandatory: true,
    beats: [
      S(SPEAKER_LIAO_SPY_CHIEF, '“不愧是终南重阳古观的弟子，嗅觉倒灵！交出邵雍手书的《天罡北斗阵眼密录》，耶律某可以留你们全尸！”'),
      S('NPC-1058', '（长剑出鞘，青光流转）“辽国南院的手竟伸到了我大宋西京洛阳！光天化日强抢阵图，真当我中原武林无人么？”'),
      S(SPEAKER_LIAO_ASSASSIN, '“废话少说！给我杀，绝不能让阵图送回终南山！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_13', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_13: {
    id: 'scene_znq21_13',
    title: '第十三幕 · 酒楼血战破暗阁',
    subtitle: '洛阳府 · 洛水天津酒楼',
    mandatory: true,
    beats: [
      N('四名契丹暗阁死士挥舞弯刀扑上，桌椅碎裂木屑横飞！郝大玄护住窗侧防止密探放信号，你挺剑迎向当先扑来的契丹精锐！'),
    ],
    choices: [
      {
        id: 'znq21_ch_fight_assassins',
        label: '拔剑截杀契丹暗阁死士！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: LIAO_ASSASSIN_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '洛水天津酒楼内刀光霍霍，契丹暗阁死士悍然围攻！',
            onWin: [openScene('scene_znq21_14', ZHONGNAN_Q21_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('契丹死士刀法凶狠，幸得郝大玄挺剑援护，调息后再战！', 'warn', '洛水夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq21_14: {
    id: 'scene_znq21_14',
    title: '第十四幕 · 易数化剑斗孤影',
    subtitle: '洛阳府 · 洛水天津酒楼',
    mandatory: true,
    beats: [
      N('数名暗阁死士转瞬溃败，耶律孤影怒喝一声，挥舞沉重契丹狼牙铁棍亲自杀到，棍风呼啸直砸你天灵！'),
      N('你脑海中倏然浮现邵雍方才在白马书院水亭落下的先天八卦变招——“天枢退半步，引敌入坎”！你脚踏奇步，身形不退反斜，长剑如灵蛇贴棍而进！'),
    ],
    choices: [
      {
        id: 'znq21_ch_fight_chief',
        label: '以先天易数步法迎战辽国密探首领耶律孤影！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q21_QUEST_ID,
            opponent: { kind: 'custom', npc: LIAO_SPY_CHIEF_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '耶律孤影挥棍猛扑，势要夺取天罡阵眼密录！',
            onWin: [openScene('scene_znq21_15', ZHONGNAN_Q21_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('耶律孤影内力阴寒，稳住步法再以易理破之！', 'warn', '洛水夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq21_15: {
    id: 'scene_znq21_15',
    title: '第十五幕 · 剑贯玄阴伏辽谍',
    subtitle: '洛阳府 · 洛水天津酒楼',
    mandatory: true,
    beats: [
      N('借着先天易数转承之妙，你虚晃一剑诱得耶律孤影重棍走空，旋即反手剑脊重重击中其肩井大穴！耶律孤影闷哼吐血，跌撞在朱漆栏杆上动弹不得。'),
      S(SPEAKER_LIAO_SPY_CHIEF, '（咬牙狞笑）“咳咳……就算你们保住了阵图又如何？西夏铁鹞已逼近延安青涧，大宋西北边军顾此失彼，终南山早晚……”'),
      N('话音未毕，耶律孤影猛地咬碎口中藏毒，头一歪气绝身亡。'),
    ],
    onFinishEffects: [openScene('scene_znq21_16', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_16: {
    id: 'scene_znq21_16',
    title: '第十六幕 · 搜出辽夏密谋简',
    subtitle: '洛阳府 · 洛水天津酒楼',
    mandatory: true,
    beats: [
      N('郝大玄疾步上前搜检尸身，从耶律孤影夹袄内衬摸出一枚契丹铜符与半截密信，上面赫然写着“延安青涧”“西夏一品堂”与“冬月合谋”字样！'),
      S('NPC-1058', '（脸色骤沉）“好毒的算计！辽国南院暗中窥伺中原道门阵法，同时与西夏暗通款曲，企图在延安边关寻衅滋事！”'),
      P('“事不宜迟，这封密信必须立刻禀报师尊与丘师兄，绝不能叫边关将士蒙在鼓里！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_17', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_17: {
    id: 'scene_znq21_17',
    title: '第十七幕 · 善后西京禀府衙',
    subtitle: '洛阳府 · 洛水天津酒楼',
    mandatory: true,
    beats: [
      N('二人将契丹细作遗留的毒药与兵刃交由赶来的洛阳府衙捕头处置，又赔偿了酒楼掌柜损毁的桌椅银两，悄然隐入洛水夜色之中。'),
      S('NPC-1058', '“今日一战，{gender:师弟|师妹}竟已能将邵先生所授的先天易理融于实战剑步，真是青出于蓝！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_18', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_18: {
    id: 'scene_znq21_18',
    title: '第十八幕 · 遥拜白马谢师恩',
    subtitle: '洛水堤岸',
    mandatory: true,
    beats: [
      N('二人立于洛水堤畔，遥望城西白马书院方向隐约未熄的书灯。清风徐来，吹散了方才搏杀的血气。'),
      P('“邵先生身在书院，心怀天下。若非先生慷慨相授先天易数，今日天罡阵眼之秘岂能如此豁然贯通。”'),
      S('NPC-1058', '“道儒虽殊途，济世本同心。待将阵图送回终南后，你我下一站，便该随丘师兄北上延安边塞了！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_19', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_19: {
    id: 'scene_znq21_19',
    title: '第十九幕 · 阵图密录传飞鸽',
    subtitle: '洛阳城外驿道',
    mandatory: true,
    beats: [
      N('郝大玄将辽夏密信抄录一份，系于终南雪鸽足下放飞回山，又将邵雍手书的《天罡北斗阵眼密录》妥善贴身藏好。'),
      S('NPC-1058', '“丘师兄素来心系边关苍生，得此密报必已整装待发。{gender:师弟|师妹}，延安风雪酷烈，切记好生调理真气！”'),
    ],
    onFinishEffects: [openScene('scene_znq21_20', ZHONGNAN_Q21_QUEST_ID)],
  },

  scene_znq21_20: {
    id: 'scene_znq21_20',
    title: '第二十幕 · 皇极问道启北行',
    subtitle: '洛阳城外驿道',
    mandatory: true,
    beats: [
      N('洛阳秋月西沉，重阳古观远征第一役圆满功成。先天易数已入心中，天罡阵眼豁然洞开，而西北延安的铁血烽烟，正隔着千山万水呼啸而来。'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 220, reason: '洛阳剿灭辽国南院暗桩功赏' },
      { type: 'giveCombatExp', amount: 1100, reason: '洛阳问数与天津酒楼截杀辽谍' },
      { type: 'addSectContribution', amount: 300 },
      { type: 'modifyRenown', delta: 50, reason: '西京洛阳破获辽国南院暗桩' },
      { type: 'modifyChivalry', delta: 35, reason: '护书院安宁、截杀辽谍' },
      { type: 'modifySkill', key: '经义', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1058' }, delta: 10 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0046' }, delta: 10 },
      { type: 'setFlag', flag: 'zn_q21_dipper_solved', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q21_QUEST_ID,
        outcome: 'luoyang_cleared',
        combatExp: 500,
      },
      toast(
        '【皇极经世 · 洛阳问数】完结！天罡北斗阵眼密算已得，下步可随丘处玄北上延安！',
        'success',
        '古观远征',
      ),
    ],
  },
}
