import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q11_QUEST_ID } from './zhongnanGuanChunyangQuest'

const SPEAKER_FROST_PALM_LEADER: StorySpeakerSpec = {
  kind: 'custom',
  name: '拓跋寒',
  title: '西夏一品堂 · 寒毒掌客首领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildFrostPalmSquadNpc(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZNQ11_FROST_PALM',
    name: '拓跋寒',
    title: '西夏一品堂 · 寒毒掌客首领',
    realm: '一流下品',
    factionName: '西夏一品堂',
    sectRank: 3,
    sectRankLabel: '寒毒掌客',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“终南牛鼻子，今夜这天罡北斗坛便是你们的葬身雪窖！吃我一记黑水寒风掌！”',
    stats: { hp: 2350, mp: 2050, agi: 57, res: 46 },
    talents: { bone: 76, comprehension: 72, charm: 54 },
    equippedArts: { neigong: 'MA-245', move1: 'MA-244', move2: 'MA-145' },
    learnedArts: [{ artId: 'MA-245', level: 7 }, { artId: 'MA-244', level: 8 }, { artId: 'MA-145', level: 7 }],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq11_01: {
    id: 'scene_znq11_01',
    title: '第一幕 · 朔风告警',
    subtitle: '终南山隐宗 · 天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q11_snow_dipper.jpg',
    illustrationCaption: '朔风雪夜 · 七星演剑坛剑气冲霄',
    mandatory: true,
    beats: [
      N('{reignYear}腊月大雪纷飞，终南山松涛呜咽。子夜未至，重阳古观山门外忽起三声凄厉铜磬，惊散满林寒鸦！'),
      N('你按剑疾驰至天罡北斗七星演剑坛，只见坛上七盏长明油灯在狂雪中摇曳不灭，丹阳子马钰玄、长春子丘处玄、玉阳子王处阳与诸位师叔伯已按天枢至摇光七位肃立。'),
      S('NPC-0216', '（按剑怒目，声震苍松）“好大的狗胆！西夏一品堂竟敢趁着掌教闭关调息之夜，派大队寒毒掌客摸上我终南山来！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_02', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_02: {
    id: 'scene_znq11_02',
    title: '第二幕 · 血鹰潜踪',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-1054', '（拂尘轻扫积雪，神色沉静如岳）“哨探刚刚冒死传回消息，此番领队潜上秦岭者，乃是西夏一品堂赫赫有名的『贺兰血鹰』努儿海。”'),
      S('NPC-1057', '“努儿海身兼西夏秘藏玄功与刚猛掌法，更带着一队专修黑水寒风掌的死士。他们分兵两路，先以寒毒封锁山道，意图直扑我演剑坛夺取道藏秘录！”'),
      P('“弟子愿请缨守阵！绝不叫西夏魔头踏进古观一步！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_03', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_03: {
    id: 'scene_znq11_03',
    title: '第三幕 · 七星聚首',
    subtitle: '天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q11_seven_masters.jpg',
    illustrationCaption: '七星聚首 · 终南七子齐传纯阳无极真诀',
    mandatory: true,
    beats: [
      S('NPC-1054', '（与丘处玄、王处阳对视一眼，微微颔首）“掌教闭关前曾有法旨：你南下武当求丹救师叔、又在太和金殿扬我道威，心性与根基皆已成熟。今夜强敌压境，正是传你古观镇脉至宝之时！”'),
      S('NPC-0216', '“不错！对付西夏阴煞寒毒，世间唯有本门至阳至纯的《纯阳无极功》可克！你且盘膝坐于天权阵眼，我师兄弟七人齐聚北斗，为你打通纯阳玄关！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_04', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_04: {
    id: 'scene_znq11_04',
    title: '第四幕 · 天枢启脉',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('你依言在青石阵眼盘膝坐定。马钰玄立于天枢位，一缕温厚绵长的丹阳真气自你百会穴缓缓垂落，宛若春日暖阳融化冻土。'),
      S('NPC-1054', '“谨守『抱元守一，纯阳无极』八字真言。勿急勿躁，先令真气归于下丹田，化作一轮赤日！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_05', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_05: {
    id: 'scene_znq11_05',
    title: '第五幕 · 玉衡灌顶',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('丘处玄与王处阳分立玉衡、开阳二位，一刚一柔两股真元同时汇入你肩井、命门。你顿觉周身骨骼咯咯轻响，先前在武当论道所得的刚柔相济之理此刻水到渠成！'),
      S('NPC-1057', '“阴极阳生，阳极无妄！外雪愈寒，内火愈明——好孩子，收摄心神，引气走完大周天！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_06', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_06: {
    id: 'scene_znq11_06',
    title: '第六幕 · 纯阳初成',
    subtitle: '天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q11_chunyang_aura.jpg',
    illustrationCaption: '纯阳无极 · 漫天鹅毛大雪未近身便化作轻烟',
    mandatory: true,
    beats: [
      N('轰然一声轻鸣在你丹田深处炸开！一股浩荡炽烈却又中正平和的纯阳真气沿奇经八脉奔涌而出，方圆三丈内飘落的鹅毛大雪尚未触及你道袍，便已化作袅袅白雾！'),
      S('NPC-0216', '（抚须大笑）“妙哉！一朝悟得《纯阳无极功》真意，寒毒已难近你身！快起身整剑，山下贼人已破了头道松林！”'),
    ],
    choices: [
      {
        id: 'znq11_learn_chunyang',
        label: '拜谢七子授法，运起《纯阳无极功》迎敌护坛',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q11_QUEST_ID, stepId: 'repel_nuerhai' },
          { type: 'teachMartialArt', artId: 'MA-078', level: 1, autoEquip: true },
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          setStep(ZHONGNAN_Q11_QUEST_ID, 'repel_nuerhai'),
          toast('七子齐授地阶内功《纯阳无极功》！请迎战潜上山门的西夏强敌！', 'success', '纯阳无极'),
          openScene('scene_znq11_07', ZHONGNAN_Q11_QUEST_ID),
        ],
      },
    ],
  },

  scene_znq11_07: {
    id: 'scene_znq11_07',
    title: '第七幕 · 阴风破雪',
    subtitle: '天罡北斗七星演剑坛阶前',
    mandatory: true,
    beats: [
      N('骤然间，石阶下方冲起数十道黑影！刺骨腥寒的掌风卷着碎冰扑面而来，石阶两侧的古松枝干竟被寒气冻得寸寸龟裂。'),
      S(SPEAKER_FROST_PALM_LEADER, '“桀桀桀！终南古观果然只剩几个老道守坛！弟兄们，先拿这七星灯阵祭掌，再请努儿海大人入阁取经！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_08', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_08: {
    id: 'scene_znq11_08',
    title: '第八幕 · 分兵锁阵',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-1054', '“对方来势汹汹，我与王师弟、诸位师弟分守两翼，防西夏死士偷袭丹院与经阁！演剑坛正中与拓跋寒这股寒毒掌客，便交由丘师弟与你挡下！”'),
      S('NPC-0216', '“哈哈，正好拿这群西夏鼠辈试一试你刚炼成的纯阳真气！{gender:师侄|师侄女}，上前破阵！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_09', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_09: {
    id: 'scene_znq11_09',
    title: '第九幕 · 寒毒先锋',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('拓跋寒纵身跃上坛心，双掌幽蓝如鬼火，寒风所过之处地面瞬间结起尺许厚冰！'),
      P('“西夏恶贼，休得放肆！今日便叫你们见识终南纯阳正气！”'),
    ],
    choices: [
      {
        id: 'znq11_fight_frost_squad',
        label: '以纯阳真气正面击破寒毒掌客首领拓跋寒',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q11_QUEST_ID,
            opponent: { kind: 'custom', npc: buildFrostPalmSquadNpc() },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '身后便是重阳古观七星坛，寸步不可退！',
            introText: '冰霜与纯阳剧烈碰撞，你迎战西夏一品堂寒毒掌客首领拓跋寒！',
            onWin: [openScene('scene_znq11_10', ZHONGNAN_Q11_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              toast('寒毒掌劲阴损刺骨，丘处玄挥剑为你挡开余势，待调息纯阳真气后再战！', 'warn', '纯阳无极'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq11_10: {
    id: 'scene_znq11_10',
    title: '第十幕 · 烈阳融冰',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('你体内《纯阳无极功》轰然运转，剑锋吞吐炽白气芒，竟将拓跋寒逼来的漫天寒雾一剑劈散！拓跋寒只觉掌心如按烙铁，惨叫一声倒飞出丈外，口喷黑血，余众顿时阵脚大乱。'),
      S('NPC-0216', '“痛快！好一招纯阳破阴煞！……小心，正主来了！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_11', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_11: {
    id: 'scene_znq11_11',
    title: '第十一幕 · 血鹰临坛',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('一阵狂飙平地卷起，漫天风雪竟被硬生生排开数丈！一道魁梧如铁塔的玄甲身影凌空踏松而至，双目赤红如鹰，正是西夏一品堂「贺兰血鹰」努儿海！'),
      S('NPC-0152', '（冷睨倒地不起的拓跋寒，不屑冷哼）“废物！连一个终南后辈的真气都接不住。……小子，你身上这股阳刚内力倒有几分王重楼当年的影子！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_12', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_12: {
    id: 'scene_znq11_12',
    title: '第十二幕 · 七星调息',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('丘处玄长剑横胸，与马钰玄、王处阳隐隐结成北斗犄角之势，同时渡来一股清越道气助你瞬间稳固丹田，令你气血内力尽复巅峰。'),
      S('NPC-1054', '“努儿海功力深厚，非寻常一流可比。我等以北斗阵势封住他左右退路，你居中以纯阳无极真气直撼其锋，切记借阵势周转！”'),
    ],
    onFinishEffects: [
      { type: 'healPlayer', hpPct: 100, mpPct: 100 },
      openScene('scene_znq11_13', ZHONGNAN_Q11_QUEST_ID),
    ],
  },

  scene_znq11_13: {
    id: 'scene_znq11_13',
    title: '第十三幕 · 血鹰试锋',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0152', '（大笑震落满树积雪）“哈哈哈哈！好个北斗七星阵！本座今夜便踏平你终南演剑坛，看看大宋道门还剩几分骨气！”'),
      P('“努儿海，终南山岂容西夏铁蹄亵渎！有我终南弟子在此，你休想越雷池半步！”'),
    ],
    choices: [
      {
        id: 'znq11_duel_nuerhai',
        label: '运足纯阳真气，携手七子正面迎战努儿海',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q11_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0152' },
            allies: [{ kind: 'npc', npcId: 'NPC-0216' }],
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '贺兰血鹰气机已锁死坛心，唯有一战方可逼退强敌！',
            introText: '风雪狂舞，你与丘处玄并肩运转北斗阵势，以纯阳无极真气力撼贺兰血鹰努儿海！',
            onWin: [openScene('scene_znq11_14', ZHONGNAN_Q11_QUEST_ID)],
            onLose: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              toast('努儿海掌力霸道绝伦！七子急运北斗剑阵为你化去余劲，请调息后再战！', 'warn', '纯阳无极'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq11_14: {
    id: 'scene_znq11_14',
    title: '第十四幕 · 气贯长虹',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('数十合惊天激斗，坛心青砖尽碎！你趁丘处玄剑光逼退努儿海左肋之机，丹田纯阳真气轰然爆发，一剑化作长虹贯日，硬生生震碎努儿海护体血罡！'),
      S('NPC-0152', '（连退七步，玄甲肩吞崩裂，眼中首现骇然）“好霸道的纯阳真气！这绝非寻常弟子所能修成！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_15', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_15: {
    id: 'scene_znq11_15',
    title: '第十五幕 · 钟鸣九霄',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('恰在此时，后山清修主殿忽传一声浑厚悠长的道钟之音！紫阳真人的磅礴气机如渊海苏醒，遥遥锁向演剑坛。'),
      S('NPC-1057', '“努儿海！我掌教已然出关，七星大阵亦已合围！你今夜若不速退，便留在此处作终南雪肥吧！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_16', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_16: {
    id: 'scene_znq11_16',
    title: '第十六幕 · 血鹰遁雪',
    subtitle: '天罡北斗七星演剑坛',
    illustrationUrl: '/assets/quests/zn_q11_nuerhai_retreat.jpg',
    illustrationCaption: '力退血鹰 · 努儿海慑于纯阳剑威与道钟之势遁入风雪',
    mandatory: true,
    beats: [
      S('NPC-0152', '（咬牙按住震痛的右臂，深深盯了你一眼）“王重楼醒了……今日讨不到便宜，咱们来日关中沙场再算总账！收拢残部，退！”'),
      N('努儿海反手抛出一蓬赤红烟障，带着重伤的拓跋寒与残余死士狼狈跃下断崖，转瞬没入漫天飞雪之中。'),
    ],
    onFinishEffects: [openScene('scene_znq11_17', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_17: {
    id: 'scene_znq11_17',
    title: '第十七幕 · 熄焰清坛',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('丘处玄长剑归鞘，与马钰玄、王处阳相视大笑。各院弟子提灯赶来清理战场、收殓寒毒暗器，七盏北斗长明灯依然在风雪中燃烧得格外明亮。'),
      S('NPC-0216', '“痛快！真他娘的痛快！努儿海号称西夏一流猛将，今夜竟被咱们新晋真传正面逼退，明日传遍关中，定叫一品堂颜面扫地！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_18', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_18: {
    id: 'scene_znq11_18',
    title: '第十八幕 · 马钰玄评剑',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-1054', '（含笑抚须，替你拂去肩头雪花）“你方才临阵运使纯阳真气，既无急躁冒进之弊，又能与丘师弟剑势呼应，足见你根基已深。”'),
      P('“全赖诸位师叔伯不吝传功与北斗阵势相护，弟子方能侥幸逼退努儿海。”'),
    ],
    onFinishEffects: [openScene('scene_znq11_19', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_19: {
    id: 'scene_znq11_19',
    title: '第十九幕 · 玉阳论势',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-1057', '“努儿海此番夜袭绝非偶然。西夏近年屡屡窥伺关中，连铁掌帮与江湖邪派亦被其暗中收买。我终南虽为隐宗，却身系大宋西北门户，断不能独善其身。”'),
      N('你望着北方苍茫雪夜，心头涌起一股沉甸甸的担当。'),
    ],
    onFinishEffects: [openScene('scene_znq11_20', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_20: {
    id: 'scene_znq11_20',
    title: '第二十幕 · 紫阳嘉勉',
    subtitle: '重阳玄门清修主殿外',
    mandatory: true,
    beats: [
      N('不多时，紫阳真人王重楼缓步登坛，负手望了一眼残雪中的掌印与剑痕，脸上露出欣慰笑意。'),
      S('NPC-0133', '“贫道虽在静室，坛上剑啸钟鸣却听得一清二楚。七星聚首，纯阳无极，你能以此功正面撼退努儿海，已无愧我重阳古观中流砥柱之名！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_21', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_21: {
    id: 'scene_znq11_21',
    title: '第二十一幕 · 暗流未歇',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0133', '“不过，努儿海此人睚眦必报，且西夏一品堂尚有更深图谋。后山活死人墓一脉近来亦频遭外敌窥探，南北两脉虽素有旧隙，在大义面前却唇齿相依。”'),
      P('“弟子明白。无论古观抑或终南全山，但有外敌来犯，弟子定当提剑在前！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_22', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_22: {
    id: 'scene_znq11_22',
    title: '第二十二幕 · 煮茶暖夜',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('道童提来热气腾腾的终南松针姜茶，七子与你围炉而坐，谈笑间驱散彻骨严寒。坛上积雪渐渐被炉火与纯阳余韵映成一片暖金。'),
    ],
    onFinishEffects: [openScene('scene_znq11_23', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_23: {
    id: 'scene_znq11_23',
    title: '第二十三幕 · 晓雪初霁',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('东方既白，大雪初歇。一轮红日跃出秦岭云海，万丈金光洒满七星演剑坛，照得玉树琼枝一片澄明。'),
      S('NPC-0216', '“天亮了！这《纯阳无极功》你须每日晨昏勤加温养，日后若修至大成，天下阴邪毒功皆如冰雪见阳！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_24', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_24: {
    id: 'scene_znq11_24',
    title: '第二十四幕 · 剑心澄明',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('你迎着朝阳缓缓吐纳，体内纯阳真气与天地清气交感，周身经脉畅通无碍，隐隐触摸到更高一层武学境界的门槛。'),
    ],
    onFinishEffects: [openScene('scene_znq11_25', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_25: {
    id: 'scene_znq11_25',
    title: '第二十五幕 · 群星铭志',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-1054', '“今夜七星聚首之谊，将载入古观道录。愿你不忘初心，以纯阳正气护苍生、守华夏。”'),
      P('“弟子谨受教诲，永矢弗谖！”'),
    ],
    onFinishEffects: [openScene('scene_znq11_26', ZHONGNAN_Q11_QUEST_ID)],
  },

  scene_znq11_26: {
    id: 'scene_znq11_26',
    title: '第二十六幕 · 纯阳永耀',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('你向七子与掌教行过道礼，背剑步下演剑坛。终南古观核心试炼至此大成，属于你的江湖传奇正翻开更为壮阔的篇章。'),
    ],
    choices: [
      {
        id: 'znq11_complete',
        label: '敛息收剑，铭记七星授法与雪夜退敌之功',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          { type: 'addArtExp', artId: 'MA-078', amount: 450 },
          { type: 'giveSilver', amount: 220, reason: '终南古观雪夜护坛重赏' },
          { type: 'giveCombatExp', amount: 2800, reason: '雪夜破寒毒掌客并逼退努儿海' },
          { type: 'addSectContribution', amount: 450 },
          { type: 'modifyRenown', delta: 80, reason: '雪夜力退贺兰血鹰努儿海威震关中' },
          { type: 'modifyChivalry', delta: 40, reason: '护山抗敌扬大宋道门正气' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1054' }, delta: 20 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1057' }, delta: 20 },
          { type: 'completeQuest', questId: ZHONGNAN_Q11_QUEST_ID, outcome: 'repelled_nuerhai' },
          toast('《纯阳无极 · 七星聚首》圆满完成！已习得《纯阳无极功》并击退努儿海！', 'success', '纯阳无极'),
        ],
      },
    ],
  },
}
