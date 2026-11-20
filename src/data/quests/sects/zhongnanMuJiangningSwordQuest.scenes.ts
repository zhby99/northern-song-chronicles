import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q26_QUEST_ID } from './zhongnanMuJiangningSwordQuest'

const SPEAKER_MURONG_AGENT: StorySpeakerSpec = {
  kind: 'custom',
  name: '姑苏燕影死士',
  title: '慕容暗探头目',
  factionName: '姑苏慕容暗桩',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
}

const SPEAKER_LIAO_BOAT_SPY: StorySpeakerSpec = {
  kind: 'custom',
  name: '大辽南院水鬼',
  title: '辽国潜伏刺客',
  factionName: '大辽南院',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
}

const MURONG_AGENT_NPC = makeQuestNpc({
  id: 'znq26_murong_agent',
  name: '姑苏燕影死士',
  title: '慕容暗探头目',
  realm: '一流中品',
  factionName: '姑苏慕容暗桩',
  avatarUrl: '/assets/characters/templates/tpl_murong_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_murong_male_fb.jpg',
  talk: '“王介甫留在大宋朝堂终是大患，挡我复燕大业者死！”',
  stats: { hp: 3350, mp: 1850, agi: 86, res: 72 },
  equippedArts: { neigong: 'MA-221', move1: 'MA-071', move2: 'MA-150' },
  learnedArts: [{ artId: 'MA-221', level: 8 }, { artId: 'MA-071', level: 8 }, { artId: 'MA-150', level: 7 }],
})

const LIAO_BOAT_SPY_NPC = makeQuestNpc({
  id: 'znq26_liao_boat_spy',
  name: '大辽南院水鬼',
  title: '辽国潜伏刺客',
  realm: '一流下品',
  factionName: '大辽南院',
  avatarUrl: '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
  portraitUrl: '/assets/characters/templates/tpl_liao_spy_male_fb.jpg',
  talk: '“秦淮河底冷得很，二位剑客还是下去喂鱼吧！”',
  stats: { hp: 2950, mp: 1550, agi: 80, res: 66 },
  equippedArts: { neigong: 'MA-243', move1: 'MA-132', move2: 'MA-152' },
  learnedArts: [{ artId: 'MA-243', level: 7 }, { artId: 'MA-132', level: 7 }, { artId: 'MA-152', level: 7 }],
})

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq26_01: {
    id: 'scene_znq26_01',
    title: '第一幕 · 虎踞赤壁闻涛声',
    subtitle: '江宁府 · 石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台',
    illustrationUrl: '/assets/quests/zn_q26_chibi_yeguhong_duel.jpg',
    illustrationCaption: '石头城赤壁悬崖临江而立，孤峰剑客叶孤鸿白衣抱剑观涛，剑气凌云',
    mandatory: true,
    beats: [
      N('{reignYear}初冬，大江滚滚东流，拍打着六朝旧都江宁府西侧的赭红绝壁。你循着青城一战后的问剑之志，孤身登临【石头城遗址 · 虎踞赤壁临江试剑台】。'),
      N('绝崖古松下，一位身着洗白麻袍、面容冷峻如削的孤傲剑客正负手临江听涛，腰间一柄无鞘寒铁重剑隐隐透出令人不敢逼视的孤峭剑意——正是名动江南的「孤峰剑客」【叶孤鸿】。'),
      P('（抱剑肃立三丈之外，朗声见礼）“终南活死人墓弟子，千里东来，特登石头城赤壁向叶前辈问剑！”'),
    ],
    onFinishEffects: [
      { type: 'startQuest', questId: ZHONGNAN_Q26_QUEST_ID, stepId: 'spar_yeguhong' },
      { type: 'teleportPlayer', regionId: 'jiangning', buildingId: 'jn2_shitou', spotId: 'jn2_st_cliff' },
      openScene('scene_znq26_02', ZHONGNAN_Q26_QUEST_ID),
    ],
  },

  scene_znq26_02: {
    id: 'scene_znq26_02',
    title: '第二幕 · 孤峰冷眼视来客',
    subtitle: '虎踞赤壁临江试剑台',
    mandatory: true,
    beats: [
      S('NPC-0155', '（缓缓转过身，目光如两柄冷电落于你剑柄）“终南活死人墓？前些日子在青城山上清宫，十合挑落余沧澜道冠的，便是你？”'),
      P('“正是晚辈。青城松风剑法轻灵有余、雄浑不足；听闻叶前辈剑意如孤峰拔地、大江破峡，晚辈特来求证‘至柔克至刚’之剑理！”'),
      S('NPC-0155', '（嘴角浮起一丝极淡的笑意，拔出寒铁重剑斜指江面）“好胆识。我的剑从不留情，不过既然是论剑切磋，便以三十合为限——你若能在我孤峰霸剑下守住剑心不乱，便算你过了这一关！”'),
    ],
    onFinishEffects: [openScene('scene_znq26_03', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_03: {
    id: 'scene_znq26_03',
    title: '第三幕 · 孤峰霸剑压江涛',
    subtitle: '虎踞赤壁临江试剑台',
    mandatory: true,
    beats: [
      N('叶孤鸿一步踏出，重剑卷起千堆江风，竟似整座钟山倾轧而下！剑未至，狂暴剑气已将你衣袂吹得猎猎作响！'),
    ],
    choices: [
      {
        id: 'znq26_ch_spar_yeguhong',
        label: '以古墓至柔剑意迎战孤峰剑客叶孤鸿！',
        tone: 'jade',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q26_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0155' },
            rule: 'spar',
            lethalOnLose: false,
            introText: '赤壁涛声如雷，孤峰剑客叶孤鸿挥出雷霆霸剑！',
            onWin: [openScene('scene_znq26_04', ZHONGNAN_Q26_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 80, mpPct: 80 },
              toast('叶孤鸿剑势沉雄孤峭，切莫硬挡，以柔卸力再试一局！', 'warn', '赤壁试剑'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq26_04: {
    id: 'scene_znq26_04',
    title: '第四幕 · 轻波化岳证至柔',
    subtitle: '虎踞赤壁临江试剑台',
    illustrationUrl: '/assets/quests/zn_q26_soft_overcomes_hard.jpg',
    illustrationCaption: '重剑如山倾下，素剑如寒泉绕石轻滑而过，四两拨千斤震散漫天江雾',
    mandatory: true,
    beats: [
      N('剑影交错二十余合，叶孤鸿一招“孤峰断浪”力贯剑身劈落！你不再硬接其锋，脚踩古墓天罗步法轻旋半周，长剑如春水绕堤贴着重剑剑脊一引一带，竟将排山倒海的刚猛剑劲顺势导入滚滚大江，激起十丈水柱！'),
      S('NPC-0155', '（收剑而立，眼中闪过由衷的赞叹）“妙！以无形之柔化有形之刚，借江涛之势泄孤峰之力！林朝瑶前辈教出你这等传人，活死人墓剑道后继有人了！”'),
    ],
    onFinishEffects: [openScene('scene_znq26_05', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_05: {
    id: 'scene_znq26_05',
    title: '第五幕 · 赤壁煮茶论剑心',
    subtitle: '石头城遗址 · 虎踞赤壁临江试剑台',
    mandatory: true,
    beats: [
      N('试剑既罢，叶孤鸿邀你坐于悬崖石案旁，以江水烹茶，二人论剑畅谈。'),
      S('NPC-0155', '“其实刚柔二字，说到底并无高下。世人只见我的剑霸道，却不知至刚之极亦需一缕灵动回旋；你的剑灵动至柔，若能在柔极之处藏一丝凝练不散的寒锋，便是大成之境。”'),
      P('（心领神会，拱手致谢）“听君一席话，胜过闭门苦修三载！晚辈受教了！”'),
    ],
    onFinishEffects: [openScene('scene_znq26_06', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_06: {
    id: 'scene_znq26_06',
    title: '第六幕 · 剑庐忽传秦淮警',
    subtitle: '石头城遗址',
    mandatory: true,
    beats: [
      N('正谈得投机，一名剑庐杂役童子气喘吁吁奔上赤壁，递上一枚用江宁折柳暗号系着的紧急字条。'),
      S('NPC-0155', '（展信阅罢，浓眉骤蹙，眼中寒芒一闪）“哼，好一群阴魂不散的鼠辈！竟敢把黑手伸到江宁秦淮河上来！”'),
      P('“叶前辈，可是江南出了什么变故？”'),
    ],
    onFinishEffects: [openScene('scene_znq26_07', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_07: {
    id: 'scene_znq26_07',
    title: '第七幕 · 介甫孤舟陷危机',
    subtitle: '石头城遗址',
    mandatory: true,
    beats: [
      S('NPC-0155', '“我有一位忘年文友，姓王名安石，字介甫，虽不习武艺，却胸怀济世大略、刚直不阿。近日他暂居江宁，今晚应江南诗社之邀在【十里秦淮双层鎏金画舫】清谈时政。”'),
      S('NPC-0155', '“可我安插在码头的眼线刚报：姑苏慕容氏的暗桩竟与辽国南院水鬼勾结，买通了画舫船夫，打算今夜在秦淮河心制造沉船惨案，暗害王安石！”'),
    ],
    onFinishEffects: [openScene('scene_znq26_08', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_08: {
    id: 'scene_znq26_08',
    title: '第八幕 · 双剑请缨赴秦淮',
    subtitle: '石头城遗址',
    mandatory: true,
    beats: [
      P('（霍然起身，按剑在手）“王介甫先生乃大宋栋梁之才，岂容慕容与辽国暗探肆意加害！叶前辈，晚辈愿与你同赴十里秦淮，斩尽这群暗中宵小！”'),
      S('NPC-0155', '（眼中露出一丝欣慰与豪气）“好！方才你我以剑论道，今夜便并肩以剑护贤！走，去十里秦淮双层鎏金画舫！”'),
    ],
    choices: [
      {
        id: 'znq26_ch_go_qinhuai',
        label: '即刻随叶孤鸿夜赴【十里秦淮画舫 · 十里秦淮双层鎏金画舫】护卫王安石！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q26_QUEST_ID, 'qinhuai_purge'),
          { type: 'teleportPlayer', regionId: 'jiangning', buildingId: 'jn2_qinhuai', spotId: 'jn2_qh_boat' },
          { type: 'setFlag', flag: 'znq26_qinhuai_triggered', value: true },
          openScene('scene_znq26_12', ZHONGNAN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'znq26_ch_prep_qinhuai',
        label: '先整顿丹药行装，稍后自行赶往十里秦淮双层鎏金画舫',
        tone: 'default',
        effects: [
          setStep(ZHONGNAN_Q26_QUEST_ID, 'qinhuai_purge'),
          openScene('scene_znq26_09', ZHONGNAN_Q26_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq26_09: {
    id: 'scene_znq26_09',
    title: '第九幕 · 暮色烟笼秦淮岸',
    subtitle: '江宁府长街',
    mandatory: true,
    beats: [
      S('NPC-0155', '“我先行一步暗中盯紧画舫，{gender:少侠|女侠}整备妥当后速来【十里秦淮双层鎏金画舫】汇合！”'),
    ],
  },

  scene_znq26_10: {
    id: 'scene_znq26_10',
    title: '第十幕 · 桨声灯影暗杀机',
    subtitle: '秦淮河畔',
    mandatory: true,
    beats: [
      N('夜幕降临，十里秦淮画舫灯火辉煌，丝竹悠扬。然在喧闹水声之下，几道黑影正贴着船底暗流悄然游向河心那艘双层鎏金大画舫！'),
    ],
    onFinishEffects: [openScene('scene_znq26_11', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_11: {
    id: 'scene_znq26_11',
    title: '第十一幕 · 轻功踏水登画舫',
    subtitle: '十里秦淮双层鎏金画舫',
    mandatory: true,
    beats: [
      N('你施展古墓轻功足尖轻点水波，宛若一缕青烟飘落画舫二层栏杆之外，与早已潜伏屋脊的叶孤鸿隔灯相望。'),
    ],
    onFinishEffects: [openScene('scene_znq26_12', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_12: {
    id: 'scene_znq26_12',
    title: '第十二幕 · 鎏金画舫见介甫',
    subtitle: '江宁府 · 十里秦淮画舫 · 十里秦淮双层鎏金画舫',
    illustrationUrl: '/assets/quests/zn_q26_qinhuai_boat_meeting.jpg',
    illustrationCaption: '秦淮河心画舫灯火通明，王安石临窗执卷论政，暗处慕容与辽国水鬼悄然逼近',
    mandatory: true,
    beats: [
      N('画舫雅间之内，一位年近而立、眉宇间满是刚毅清正之气的布衣文士正临窗挥毫，与几名江南学子畅论富国强兵之道——正是日后名垂青史的【王安石】王介甫！'),
      S('NPC-0019', '（掷笔长叹，声音铿锵）“今辽夏虎视西北，冗兵冗费日甚，若不早图变法革新，恐大宋百年基业难安！”'),
      N('话音未落，船舱底板骤然传来一阵刺耳的凿木闷响！紧接着五六道黑衣水鬼破窗跃上甲板，寒刀直劈雅间珠帘！'),
    ],
    onFinishEffects: [openScene('scene_znq26_13', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_13: {
    id: 'scene_znq26_13',
    title: '第十三幕 · 水鬼破窗起惊变',
    subtitle: '十里秦淮双层鎏金画舫',
    mandatory: true,
    beats: [
      S(SPEAKER_LIAO_BOAT_SPY, '（持分水刺狞笑扑入）“王安石！大辽南院与姑苏贵人赏你一副秦淮水棺，纳命来吧！”'),
      S('NPC-0019', '（虽惊不乱，竟顺手抄起案头青铜镇纸护在身前，厉声喝斥）“光天化日、大宋腹地，辽国细作安敢如此猖狂！”'),
      S('NPC-0155', '（自飞檐飘然落下，重剑横拦雅间门前）“介甫兄勿惊，叶某与终南剑友在此！{gender:少侠|女侠}，先剪除这群辽国水鬼！”'),
    ],
    choices: [
      {
        id: 'znq26_ch_fight_water_spies',
        label: '素剑出鞘，截杀破窗而入的大辽南院水鬼！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q26_QUEST_ID,
            opponent: { kind: 'custom', npc: LIAO_BOAT_SPY_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '画舫摇晃，大辽南院水鬼挥舞分水刺悍然扑来！',
            onWin: [openScene('scene_znq26_14', ZHONGNAN_Q26_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('水鬼身法滑溜阴毒，稳住下盘再以古墓剑法破之！', 'warn', '秦淮夜战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq26_14: {
    id: 'scene_znq26_14',
    title: '第十四幕 · 姑苏燕影现诡剑',
    subtitle: '十里秦淮双层鎏金画舫',
    illustrationUrl: '/assets/quests/zn_q26_murong_spy_purge.jpg',
    illustrationCaption: '秦淮河面灯火碎成万点金鳞，你与叶孤鸿一柔一刚联手合击姑苏慕容暗探头目',
    mandatory: true,
    beats: [
      N('几名辽国水鬼转瞬被你剑光挑落秦淮河中！就在此时，画舫顶蓬轰然炸裂，一道身披玄青锦袍的瘦高身影如幽燕俯冲而下，剑势诡异莫测，竟隐含姑苏慕容家传剑法与借力打力的奇诡路数！'),
      S(SPEAKER_MURONG_AGENT, '（冷笑挥剑）“叶孤鸿，还有终南古墓的小丫头片子……坏我姑苏大计，今夜这艘画舫便是你们与王安石的葬身之所！”'),
    ],
    choices: [
      {
        id: 'znq26_ch_fight_murong',
        label: '以柔极生刚新悟剑意，正面斩杀姑苏燕影死士！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q26_QUEST_ID,
            opponent: { kind: 'custom', npc: MURONG_AGENT_NPC },
            rule: 'duel',
            lethalOnLose: false,
            introText: '姑苏燕影死士施展诡谲家传剑法，直取你与王安石要害！',
            onWin: [openScene('scene_znq26_15', ZHONGNAN_Q26_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 65, mpPct: 65 },
              toast('慕容暗探剑法擅长借力反制，莫用死力，以虚实变招破之！', 'warn', '画舫激战'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq26_15: {
    id: 'scene_znq26_15',
    title: '第十五幕 · 柔极藏锋破燕影',
    subtitle: '十里秦淮双层鎏金画舫',
    mandatory: true,
    beats: [
      N('你回想叶孤鸿赤壁所言“柔极之处藏一丝凝练寒锋”，剑势忽然一轻一重、虚实莫测，令对方借力打力之术无所着力！一记玉女穿针透入空门，硬生生将姑苏燕影死士震飞撞断桅杆！'),
      N('叶孤鸿重剑顺势一压，彻底封住其退路，那暗探头目惨笑一声，竟咬破衣领毒囊自尽，坠入漆黑江水。'),
    ],
    onFinishEffects: [openScene('scene_znq26_16', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_16: {
    id: 'scene_znq26_16',
    title: '第十六幕 · 介甫整衣谢双剑',
    subtitle: '十里秦淮双层鎏金画舫',
    mandatory: true,
    beats: [
      N('危机尽解，画舫缓缓靠岸。王安石掸去青衫木屑，神色沉静如常，向你与叶孤鸿深深一揖。'),
      S('NPC-0019', '“多谢叶兄与这位终南{gender:少侠|女侠}救命之恩！若非二位及时现身，安石今夜险些葬身秦淮，平生抱负亦付东流！”'),
      P('“王先生忧国忧民，乃大宋难得之才。铲除辽国与奸佞暗探，乃我辈侠客分内之事。”'),
    ],
    onFinishEffects: [openScene('scene_znq26_17', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_17: {
    id: 'scene_znq26_17',
    title: '第十七幕 · 临风赠诗表知音',
    subtitle: '十里秦淮画舫',
    mandatory: true,
    beats: [
      S('NPC-0019', '（目光炯炯，提笔于素笺写下一首七言绝句相赠）“江湖虽远，庙堂虽高，然忠义之气本无二致。不知{gender:少侠|女侠}日后行止何方？”'),
    ],
    choices: [
      {
        id: 'znq26_ch_wang_poem',
        label: '“愿如钟山青松，任凭风雪激荡，守心中一点清气不改！”',
        tone: 'jade',
        effects: [
          { type: 'modifySkill', key: '诗词', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0019' }, delta: 10 },
          openScene('scene_znq26_18', ZHONGNAN_Q26_QUEST_ID),
        ],
      },
      {
        id: 'znq26_ch_wang_essay',
        label: '“愿先生他日入主中枢，扫除积弊，莫负天下苍生期盼！”',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0019' }, delta: 10 },
          openScene('scene_znq26_18', ZHONGNAN_Q26_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq26_18: {
    id: 'scene_znq26_18',
    title: '第十八幕 · 孤峰赠剑意相托',
    subtitle: '十里秦淮画舫',
    mandatory: true,
    beats: [
      S('NPC-0155', '（望向你，眼中满是知己之色）“今夜画舫一战，你的剑已臻柔极藏刚之境。他日终南山若有难，只需一纸书信寄到江宁石头城剑庐，叶某虽隔千里，必提剑相助！”'),
    ],
    onFinishEffects: [openScene('scene_znq26_19', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_19: {
    id: 'scene_znq26_19',
    title: '第十九幕 · 玉蜂万里传师谕',
    subtitle: '江宁府客舍',
    mandatory: true,
    beats: [
      N('次日清晨，一阵细微清越的振翅声掠过窗棂——竟是一只终南活死人墓秘养的传讯玉蜂！你小心取下蜂足绑着的细密银笺，上面赫然是恩师【林朝瑶】亲笔小楷！'),
    ],
    onFinishEffects: [openScene('scene_znq26_20', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_20: {
    id: 'scene_znq26_20',
    title: '第二十幕 · 寒玉床裂求昆仑',
    subtitle: '江宁府客舍',
    mandatory: true,
    beats: [
      N('信中言道：活死人墓镇脉至宝「昆仑寒玉床」历经数十载寒气耗损，近来核心冰脉隐现裂纹；而西夏与星宿派妖人频频窥伺终南，师尊欲闭死关修补寒玉床并参悟终极剑境，急需西域昆仑瑶池所产的「万年寒玉髓」与「雪莲」！'),
      P('“万年寒玉髓与昆仑雪莲……昆仑乃万山之祖、冰雪绝域，难怪师父命我先往京兆府西市胡商坊购取《万山之祖昆仑雪域舆图》，再万里西行！”'),
    ],
    onFinishEffects: [openScene('scene_znq26_21', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_21: {
    id: 'scene_znq26_21',
    title: '第二十一幕 · 辞别钟山二知己',
    subtitle: '江宁府北门',
    mandatory: true,
    beats: [
      N('你即刻收拾行囊，向叶孤鸿与王安石辞行。王安石赠你江南上好盘缠，叶孤鸿则将一瓶珍藏的解毒丹药交到你手中，叮嘱你西行雪域切记小心昆仑与星宿海一带的绝顶高人。'),
    ],
    onFinishEffects: [openScene('scene_znq26_22', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_22: {
    id: 'scene_znq26_22',
    title: '第二十二幕 · 回望石头剑气长',
    subtitle: '江宁城外官道',
    mandatory: true,
    beats: [
      N('回望烟雨朦胧的钟山与十里秦淮，此番江南问剑不仅证得“至柔克至刚”的无上剑理，更结交了叶孤鸿与王安石两位当世人杰。'),
    ],
    onFinishEffects: [openScene('scene_znq26_23', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_23: {
    id: 'scene_znq26_23',
    title: '第二十三幕 · 策马西指长安道',
    subtitle: '江南官道',
    mandatory: true,
    beats: [
      N('收起丝竹烟雨，前方是万里丝路与冰雪昆仑！你轻夹马腹，一路向西直奔京兆府西市胡商坊！'),
    ],
    onFinishEffects: [openScene('scene_znq26_24', ZHONGNAN_Q26_QUEST_ID)],
  },

  scene_znq26_24: {
    id: 'scene_znq26_24',
    title: '第二十四幕 · 钟山问剑启雪行',
    subtitle: '官道驿站',
    mandatory: true,
    beats: [
      N('古墓远征第二役功德圆满！请速赴【京兆府 · 西市胡商坊 · 番坊正市 · 奇货堂】购取昆仑舆图，踏上万里昆仑瑶池采玉之旅！'),
    ],
    onFinishEffects: [
      { type: 'giveItem', itemId: 'ITM-MED-116', qty: 1 },
      { type: 'giveItem', itemId: 'ITM-MED-123', qty: 2 },
      { type: 'giveSilver', amount: 280, reason: '江宁秦淮护贤除谍酬谢' },
      { type: 'giveCombatExp', amount: 1400, reason: '赤壁试剑叶孤鸿与秦淮画舫斩暗探' },
      { type: 'addSectContribution', amount: 340 },
      { type: 'modifyRenown', delta: 65, reason: '江宁赤壁问剑与秦淮护王安石扬名江南' },
      { type: 'modifyChivalry', delta: 45, reason: '夜赴秦淮画舫斩杀辽国与慕容暗探' },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0155' }, delta: 12 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0019' }, delta: 12 },
      { type: 'setFlag', flag: 'zn_q26_jiangning_cleared', value: true },
      {
        type: 'completeQuest',
        questId: ZHONGNAN_Q26_QUEST_ID,
        outcome: 'jiangning_cleared',
        combatExp: 600,
      },
      toast(
        '【赤壁听涛 · 钟山问剑】完结！请赴京兆府西市胡商坊购取昆仑舆图，远赴昆仑瑶池采玉！',
        'success',
        '古墓远征',
      ),
    ],
  },
}
