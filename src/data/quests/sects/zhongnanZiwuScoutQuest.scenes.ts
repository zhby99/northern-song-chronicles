import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q02_QUEST_ID } from './zhongnanZiwuScoutQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q02_01: {
    id: 'scene_zn_q02_01',
    title: '第一幕 · 临风急讯',
    subtitle: '终南草堂 · 临风观景轩',
    mandatory: true,
    beats: [
      N('{reignYear}暮春，长安城南微雨初歇。你应师门飞鸽传书下山，刚踏入终南草堂的临风观景轩，便见一名负刀青衫青年正焦灼地凭栏远眺。'),
      S('NPC-0802', '（回头见是你，神色一振）“你可算来了，{gender:师弟|师妹}！我是负责子午谷外哨探的冷帆川。马大师兄飞书托我查那块腥香木牌，如今已有确切眉目！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_02', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_02: {
    id: 'scene_zn_q02_02',
    title: '第二幕 · 子午毒迹',
    subtitle: '临风观景轩 · 案情剖析',
    mandatory: true,
    beats: [
      S('NPC-0802', '（压低声音，摊开一幅子午谷草图）“这半月来，子午谷口接连有采药山民昏迷不醒，伤口俱呈紫黑。我顺着西域胡商车辙追进长安，发现竟是星宿派门人在城西暗设毒虫密哨！”'),
      P('“星宿派远在西域，缘何频频在终南山脚与长安城中生事？”'),
      S('NPC-0802', '“八成是觊觎我终南紫金丹院的炼丹古方，顺带想探听后山活死人墓的虚实。他们不敢强闯山门，便想借毒虫迷香渗透子午谷。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_03', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_03: {
    id: 'scene_zn_q02_03',
    title: '第三幕 · 暗桩接头',
    subtitle: '临风观景轩 · 授以暗号',
    mandatory: true,
    beats: [
      S('NPC-0802', '“我脸熟，不便在西市露面。你在【明德门丝路迎宾栈】去寻我的族兄【冷玄远】，他扮作贩茶客商盯了三天。对上暗号‘终南松雪，寒涧清泉’，他自会带你去掀了那处毒窝！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_04', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_04: {
    id: 'scene_zn_q02_04',
    title: '第四幕 · 领命入城',
    subtitle: '长安城南 · 赴明德门',
    mandatory: true,
    beats: [
      N('你收好冷帆川递来的两粒避瘴清心丸，辞别草堂，沿着青石官道直奔明德门丝路迎宾栈。'),
      P('“星宿毒雾既已渗入长安，断不可姑息养奸！”'),
    ],
    choices: [
      {
        id: 'zn_q02_go_inn',
        label: '收好避瘴丸 · 前往明德门丝路迎宾栈会见冷玄远',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q02_QUEST_ID, stepId: 'inn_meet_lengxuanyuan' },
          setStep(ZHONGNAN_Q02_QUEST_ID, 'inn_meet_lengxuanyuan'),
          toast('已接取《子午毒雾 · 长安暗哨》！请前往【明德门丝路迎宾栈】密会冷玄远。', 'talk', '子午毒雾'),
        ],
      },
    ],
  },

  scene_zn_q02_05: {
    id: 'scene_zn_q02_05',
    title: '第五幕 · 丝路客栈',
    subtitle: '京兆府 · 明德门丝路迎宾栈',
    illustrationUrl: '/assets/quests/zn_q02_changan_inn_secret.jpg',
    illustrationCaption: '迎宾密会 · 丝路客栈灯影摇曳，冷玄远低声指点西市毒哨',
    mandatory: true,
    beats: [
      N('明德门丝路迎宾栈内胡汉杂处，驼铃声与胡琴声此起彼伏。角落雅座里，一名身披灰布披风、腰悬短枪模样的客商正独酌清茶。'),
      P('（缓步落座，轻叩桌面三声）“敢问客官，可是从秦岭贩茶而来？听说今年‘终南松雪，寒涧清泉’一两难求。”'),
      S('NPC-0576', '（眸光骤亮，随即不动声色斟满一盏热茶）“原来是帆川引荐的同门{gender:师弟|师妹}！坐，装作谈茶价，听我细说。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_06', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_06: {
    id: 'scene_zn_q02_06',
    title: '第六幕 · 品香藏奸',
    subtitle: '丝路迎宾栈 · 锁定据点',
    mandatory: true,
    beats: [
      S('NPC-0576', '“我盯了三日，星宿派两个三流好手——外号‘玉面狼’的褚浪森与‘穿云刀’葛平瑞，买通了西市【斗茶品香轩】的后院茶窖，假借熏制西域奇香为名，暗中培育毒蜈蚣与腐心粉！”'),
      P('“斗茶品香轩日间游人如织，若毒粉泄露，半个西市百姓都要遭殃！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_07', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_07: {
    id: 'scene_zn_q02_07',
    title: '第七幕 · 巧计分进',
    subtitle: '丝路迎宾栈 · 商定袭策',
    mandatory: true,
    beats: [
      S('NPC-0576', '“说得正是！我已查清，戌时后品香轩谢客，院中只留他们二人看守毒瓮。咱们可先以论茶斗香稳住前厅耳目，再直捣后院茶窖，逐个击破！”'),
    ],
    choices: [
      {
        id: 'zn_q02_plan_talk',
        label: '“师兄所言极是，我愿佯作寻香茶客引开前院暗哨！”',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '辩才', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0576' }, delta: 8 },
          openScene('scene_zn_q02_08', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'zn_q02_plan_direct',
        label: '“事不宜迟，咱们直扑西市斗茶品香轩，绝不让毒虫扩散！”',
        tone: 'primary',
        effects: [
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0576' }, delta: 6 },
          openScene('scene_zn_q02_08', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q02_08: {
    id: 'scene_zn_q02_08',
    title: '第八幕 · 夜赴西市',
    subtitle: '长安西市 · 暮色潜行',
    mandatory: true,
    beats: [
      N('暮鼓声落，长安西市的灯笼次第亮起。你与冷玄远服下避瘴清心丸，一前一后潜向西市胡商坊的斗茶品香轩。'),
    ],
    choices: [
      {
        id: 'zn_q02_to_xishi',
        label: '趁夜潜入 · 赶赴西市胡商坊斗茶品香轩',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q02_QUEST_ID, 'xishi_raid_outpost'),
          toast('请前往【京兆府 · 西市胡商坊 · 斗茶品香轩】破除星宿毒虫暗哨！', 'talk', '破除毒哨'),
        ],
      },
    ],
  },

  scene_zn_q02_09: {
    id: 'scene_zn_q02_09',
    title: '第九幕 · 幽香藏毒',
    subtitle: '西市胡商坊 · 斗茶品香轩',
    illustrationUrl: '/assets/quests/zn_q02_xishi_poison_raid.jpg',
    illustrationCaption: '西市除毒 · 品香轩后院绿焰升腾，星宿双凶现身截杀',
    mandatory: true,
    beats: [
      N('翻入斗茶品香轩后院，浓重的沉香之下隐隐透出一股令人作呕的腥甜气味。茶窖门前，两盏鬼火般的碧绿铜灯摇曳不定，七八只黑陶密瓮正发出窸窣爬动之声！'),
      S('NPC-0544', '（冷笑一声，自廊柱阴影中踱出，手中折扇隐现幽蓝毒光）“嘿嘿，哪来的终南小道士，半夜三更跑来替星宿老仙试毒么？”'),
      S('NPC-0576', '（挺枪跃落屋檐，断住后门退路）“{gender:师弟|师妹}，这姓褚的先交给你！我守住窖口，绝不让姓葛的趁机放毒！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_10', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_10: {
    id: 'scene_zn_q02_10',
    title: '第十幕 · 剑破玉面狼',
    subtitle: '斗茶品香轩 · 首战褚浪森',
    mandatory: true,
    beats: [
      S('NPC-0544', '“凭你也想破我星宿暗哨？尝尝爷爷的化毒阴风掌！”'),
      P('“邪魔外道，休想在长安城中放毒害民！看剑！”'),
    ],
    choices: [
      {
        id: 'zn_q02_fight_chulangsen',
        label: '拔剑出击 · 击败星宿派「玉面狼」褚浪森',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q02_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0544' },
            rule: 'story_trial',
            forbidEscapeReason: '星宿毒窖就在眼前，此时退缩必令毒虫四散！',
            introText: '褚浪森双掌泛起青黑毒雾，阴狠扑来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q02_11', ZHONGNAN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('不慎被褚浪森逼退，冷玄远挺枪掩护你暂避院外。请调息后再行突袭！', '西市毒哨'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q02_11: {
    id: 'scene_zn_q02_11',
    title: '第十一幕 · 穿云刀现',
    subtitle: '斗茶品香轩 · 葛平瑞反扑',
    mandatory: true,
    beats: [
      N('你以《全真大道筑基歌》护住心脉，剑光如霜挑断褚浪森毒扇，将其一脚踹翻在香案旁！忽听茶窖铁门轰然撞开，一名手持窄背长刀的悍匪狂呼扑出，正是「穿云刀」葛平瑞！'),
      S('NPC-0541', '“废物！连个终南小辈都拦不住！看老子一刀劈了你，再去掀了毒瓮同归于尽！”'),
      S('NPC-0576', '（掷来一粒清心丹助你回气）“接丹调息！我替你掠阵压住毒瓮，快拿下这疯子！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_12', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_12: {
    id: 'scene_zn_q02_12',
    title: '第十二幕 · 决战茶窖',
    subtitle: '斗茶品香轩 · 再战葛平瑞',
    mandatory: true,
    beats: [
      N('清心丹入腹，你内息瞬间充盈如初，长剑一抖，剑尖直指扑面而来的葛平瑞！'),
    ],
    choices: [
      {
        id: 'zn_q02_fight_gepingrui',
        label: '稳住中宫 · 击溃星宿派「穿云刀」葛平瑞',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q02_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0541' },
            allies: [{ kind: 'npc', npcId: 'NPC-0576' }],
            rule: 'story_trial',
            forbidEscapeReason: '绝不可让葛平瑞掀翻毒瓮祸害长安百姓！',
            introText: '葛平瑞怒吼连连，长刀卷起腥风猛劈而来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q02_13', ZHONGNAN_Q02_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('葛平瑞刀势凶猛，你与冷玄远暂退屋顶重整阵脚，调息后再战！', '西市毒哨'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q02_13: {
    id: 'scene_zn_q02_13',
    title: '第十三幕 · 烈火焚瓮',
    subtitle: '斗茶品香轩 · 销毁毒虫',
    mandatory: true,
    beats: [
      N('你与冷玄远枪剑合击，三五回合便将葛平瑞长刀震飞，点住其肩井大穴。褚浪森见大势已去，趁乱翻墙遁入夜色。'),
      S('NPC-0576', '（取过火折子泼上烈酒，将茶窖内七八只毒虫黑陶瓮尽数引燃焚净，顺手从案头搜出一封西域密笺）“好险！再晚一步，这批腐心毒粉就要运往子午谷了！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_14', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_14: {
    id: 'scene_zn_q02_14',
    title: '第十四幕 · 密笺归堂',
    subtitle: '长安夜色 · 返草堂报捷',
    mandatory: true,
    beats: [
      S('NPC-0576', '“这封密笺上隐约提到‘紫金丹炉’与‘大雁塔’字样，非同小可！我留在西市善后移交京兆府巡夜衙役，你速速将密笺带回【终南草堂 · 临风观景轩】交予帆川转呈山上尊长！”'),
    ],
    choices: [
      {
        id: 'zn_q02_return_caotang',
        label: '收好西域密笺 · 返回终南草堂临风观景轩复命',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q02_QUEST_ID, 'caotang_report_back'),
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0576' }, delta: 10 },
          toast('毒哨已破！请返回【终南草堂 · 临风观景轩】向冷帆川复命。', 'success', '破除毒哨'),
        ],
      },
    ],
  },

  scene_zn_q02_15: {
    id: 'scene_zn_q02_15',
    title: '第十五幕 · 拂晓报捷',
    subtitle: '终南草堂 · 临风观景轩',
    mandatory: true,
    beats: [
      N('晨曦微露，你赶回终南草堂临风观景轩，将西市夜袭经过与那封西域密笺一并交予冷帆川。'),
      S('NPC-0802', '（展开密笺细看，眉头紧锁旋即又舒展开来）“干得漂亮！此番一举拔除星宿暗哨，不仅保住了长安百姓，更让我终南提前洞悉了贼人图谋丹院的阴谋！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q02_16', ZHONGNAN_Q02_QUEST_ID)],
  },

  scene_zn_q02_16: {
    id: 'scene_zn_q02_16',
    title: '第十六幕 · 寒涧召书',
    subtitle: '终南草堂 · 大比将启',
    mandatory: true,
    beats: [
      S('NPC-0802', '“对了，刚接到山上传来的玉牌召书——紫阳真人与后山林仙子即将出关，三年一度的【寒涧试剑 · 观墓分途】外门大比不日便要在终南后山寒玉涧举行！以你今日战绩，定能一鸣惊人，快回山好生备战罢！”'),
      P('（心潮澎湃，抱拳辞行）“多谢师兄提点！弟子这就赶回终南山准备寒涧试剑！”'),
    ],
    choices: [
      {
        id: 'zn_q02_complete',
        label: '领受嘉奖 · 准备赴终南寒玉涧观墓分途',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 65 },
          { type: 'giveSilver', amount: 50, reason: '破除长安星宿毒哨嘉奖' },
          { type: 'giveCombatExp', amount: 340, reason: '完成《子午毒雾 · 长安暗哨》' },
          { type: 'modifyRenown', delta: 14, reason: '夜破长安西市星宿毒哨' },
          { type: 'modifyChivalry', delta: 10, reason: '焚毁毒虫密瓮护长安百姓' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0802' }, delta: 10 },
          { type: 'completeQuest', questId: ZHONGNAN_Q02_QUEST_ID, outcome: 'cleared_xishi_outpost' },
          toast('完成《子午毒雾 · 长安暗哨》！终南寒涧试剑大比即将开启！', 'success', '长安靖安'),
        ],
      },
    ],
  },
}
