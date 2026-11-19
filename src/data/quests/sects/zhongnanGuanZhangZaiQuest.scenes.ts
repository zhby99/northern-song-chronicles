import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q06_QUEST_ID } from './zhongnanGuanZhangZaiQuest'

const SPEAKER_ASSASSIN_LEAD: StorySpeakerSpec = {
  kind: 'custom',
  name: '嵬名黑煞',
  title: '西夏一品堂死士统领',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

const SPEAKER_ASSASSIN_VICE: StorySpeakerSpec = {
  kind: 'custom',
  name: '梁影',
  title: '西夏暗影刺客',
  factionName: '西夏一品堂',
  portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
}

function buildXixiaShadow(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q06_XIXIA_SHADOW',
    name: '梁影',
    title: '西夏一品堂暗影刺客',
    realm: '二流下品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“毒烟已起，张载的人头今日必归大夏！”',
    stats: { hp: 1020, mp: 460, agi: 46, res: 24 },
    talents: { bone: 60, comprehension: 58, charm: 40 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 5 },
      { artId: 'MA-184', level: 5 },
    ],
  })
}

function buildXixiaCaptain(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_ZN_Q06_XIXIA_CAPTAIN',
    name: '嵬名黑煞',
    title: '西夏一品堂死士统领',
    realm: '二流中品',
    factionName: '西夏一品堂',
    avatarUrl: '/assets/characters/templates/tpl_yipintang_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_yipintang_fb.jpg',
    talk: '“长春子不在眼前，就凭你个小道士也敢挡我死士营？”',
    stats: { hp: 1320, mp: 620, agi: 49, res: 27 },
    talents: { bone: 68, comprehension: 60, charm: 42 },
    equippedArts: { neigong: 'MA-234', move1: 'MA-184' },
    learnedArts: [
      { artId: 'MA-234', level: 6 },
      { artId: 'MA-184', level: 6 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q06_01: {
    id: 'scene_zn_q06_01',
    title: '第一幕 · 长春震怒',
    subtitle: '重阳古观 · 清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}夏末，重阳主殿内气氛肃穆。长春子丘处玄捏着王处阳飞鸽传来的急信，眉宇间剑气隐现。'),
      S('NPC-0216', '“好个无耻的西夏一品堂！正面打不过大宋边军，竟派死士潜入长安，妄图刺杀关学大儒张载先生与京兆府晏相公！”'),
      P('“张子厚先生素有安邦济世之志，晏相公更是朝廷柱石，绝不可令贼人得逞！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_02', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_02: {
    id: 'scene_zn_q06_02',
    title: '第二幕 · 护道启程',
    subtitle: '重阳主殿 · 师徒同行',
    mandatory: true,
    beats: [
      S('NPC-0216', '（佩上长剑，大步走出殿门）“马大师兄已先去筹备西赴秦州茶马司之事，长安这边便由你随我走一趟！先去【永兴军路京兆府衙】面见晏殊相公，再赴横渠关学书院护卫张载先生！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_03', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_03: {
    id: 'scene_zn_q06_03',
    title: '第三幕 · 疾驰入城',
    subtitle: '终南官道 · 望见长安城垣',
    mandatory: true,
    beats: [
      N('你与丘处玄施展《金雁功》踏风疾行，不过半日便已望见雄伟的京兆府城楼。城门内外商旅如织，殊不知暗流已悄然涌动。'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_04', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_04: {
    id: 'scene_zn_q06_04',
    title: '第四幕 · 直奔府衙',
    subtitle: '京兆府 · 启程拜会晏殊',
    mandatory: true,
    beats: [
      S('NPC-0216', '“晏相公虽是文臣词宗，然执掌永兴军路军政，城中耳目极广。咱们速去府衙禀明详情！”'),
    ],
    choices: [
      {
        id: 'zn_q06_go_yamen',
        label: '随丘处玄前往【永兴军路京兆府衙】拜会晏殊',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q06_QUEST_ID, stepId: 'yamen_visit_yanshu' },
          setStep(ZHONGNAN_Q06_QUEST_ID, 'yamen_visit_yanshu'),
          toast('请前往【京兆府 · 永兴军路京兆府衙】拜会晏殊相公。', 'talk', '府衙呈情'),
        ],
      },
    ],
  },

  scene_zn_q06_05: {
    id: 'scene_zn_q06_05',
    title: '第五幕 · 府衙见相公',
    subtitle: '京兆府 · 永兴军路京兆府衙',
    illustrationUrl: '/assets/quests/zn_q06_yamen_yanshu.jpg',
    illustrationCaption: '府衙呈情 · 晏殊从容披阅军报，丘处玄与主角共议长安布防',
    mandatory: true,
    beats: [
      N('永兴军路京兆府衙内清肃雅致，曾位居宰辅、如今镇守永兴军的词坛泰斗【晏殊】正于案前披阅公文。见丘处玄与你入内，晏殊含笑起座相迎。'),
      S('NPC-0017', '（细阅秦州斥候军报，神色依旧温雅镇定）“原来如此。西夏人见我大宋庆历以来士风日盛，便想以暗杀寒天下读书人之心。终南诸位道长赤诚护国，晏某代关中百姓谢过！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_06', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_06: {
    id: 'scene_zn_q06_06',
    title: '第六幕 · 文武同心',
    subtitle: '京兆府衙 · 商定布防',
    mandatory: true,
    beats: [
      S('NPC-0017', '“府衙自有精锐亲兵护卫，贼人料难得手；唯独张子厚先生此刻正在【长安横渠关学书院】与尹子渐先生夜讲《易经》，书院门禁素松，最易遭袭！”'),
      P('“相公洞察秋毫！若能外由官兵暗控街巷、内由我终南弟子贴身护院，必能将西夏死士一网打尽！”'),
      S('NPC-0017', '（抚须赞叹）“好个机敏通透的年轻道友！此策极善，我即刻密令厢军便衣封锁书院外坊！”'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '策论', delta: 1 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0017' }, delta: 12 },
      openScene('scene_zn_q06_07', ZHONGNAN_Q06_QUEST_ID),
    ],
  },

  scene_zn_q06_07: {
    id: 'scene_zn_q06_07',
    title: '第七幕 · 辞相赴院',
    subtitle: '京兆府衙 · 疾往书院',
    mandatory: true,
    beats: [
      S('NPC-0216', '“事不宜迟，日头已偏西，咱们即刻赶赴横渠关学书院！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_08', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_08: {
    id: 'scene_zn_q06_08',
    title: '第八幕 · 暮投横渠',
    subtitle: '长安城内 · 赴横渠书院',
    mandatory: true,
    beats: [
      N('告别晏相公，二人穿过暮色渐浓的朱雀大街，直奔书声琅琅的长安横渠关学书院。'),
    ],
    choices: [
      {
        id: 'zn_q06_go_academy',
        label: '疾步赶赴【长安横渠关学书院】护卫张载、尹源',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q06_QUEST_ID, 'academy_guard_zhangzai'),
          toast('请前往【京兆府 · 长安横渠关学书院】护卫张载与尹源！', 'talk', '劈空护道'),
        ],
      },
    ],
  },

  scene_zn_q06_09: {
    id: 'scene_zn_q06_09',
    title: '第九幕 · 横渠夜讲',
    subtitle: '京兆府 · 长安横渠关学书院',
    illustrationUrl: '/assets/quests/zn_q06_academy_lecture.jpg',
    illustrationCaption: '横渠薪火 · 书院灯火通明，张载与尹源侃侃讲学，浩然气贯青衿',
    mandatory: true,
    beats: [
      N('书院讲堂内烛火通明，青衫儒生济济一堂。讲席之上，三十出头的关学宗师【张载】气宇轩昂，身旁坐着刚正笃学的【尹源】先生。'),
      S('NPC-0048', '（声音铿锵如金石）“士人读书，岂为雕章琢句、博取荣华？当为天地立心，为生民立命，为往圣继绝学，为万世开太平！”'),
      S('NPC-0041', '（见你与丘处玄步入堂侧，含笑拱手）“原是终南丘道长驾临！子厚兄方才讲到浩然正气，正合道门清正之旨。”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_10', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_10: {
    id: 'scene_zn_q06_10',
    title: '第十幕 · 儒道论心',
    subtitle: '横渠书院 · 密告险情',
    mandatory: true,
    beats: [
      N('散讲之后，学生陆续归舍。丘处玄低声将西夏死士今夜行刺之情告知张载与尹源。'),
      S('NPC-0048', '（丝毫不见惧色，反而朗声一笑）“宵小鼠辈，何足挂齿！张某年轻时也曾好谈兵法、欲结客取洮西之地，今日正想见识见识西夏死士有何能耐！”'),
      S('NPC-0041', '“只是书院内多为手无寸铁的年轻学子，万不可惊扰了他们。有劳丘道长与这位年轻道友守住中庭！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_11', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_11: {
    id: 'scene_zn_q06_11',
    title: '第十一幕 · 毒烟袭院',
    subtitle: '横渠书院 · 三更夜变',
    mandatory: true,
    beats: [
      N('二更刚过，书院高墙之外忽然飞入数枚黑漆铁球，“砰砰”炸开，滚滚紫黑毒烟夹着寒光四射的飞镖直扑讲堂！'),
      S(SPEAKER_ASSASSIN_VICE, '（蒙面黑影如鬼魅般掠下屋瓦）“张载休走！拿命来！”'),
      S('NPC-0216', '（双掌猛然向前一推，一股排山倒海般的刚猛掌风竟在三丈之外将漫天毒烟与飞镖尽数震散！）“雕虫小技！{gender:师侄|师侄女}，看仔细了——这便是对付阴毒暗器最好的功夫：《劈空掌》！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_12', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_12: {
    id: 'scene_zn_q06_12',
    title: '第十二幕 · 临阵授掌',
    subtitle: '横渠书院 · 悟得劈空掌',
    illustrationUrl: '/assets/quests/zn_q06_pikong_palm.jpg',
    illustrationCaption: '正气劈空 · 丘处玄隔空震散毒烟，亲传全真刚猛绝学《劈空掌》',
    mandatory: true,
    beats: [
      S('NPC-0216', '“气沉气海，意贯劳宫，吐纳间将《全真大道筑基歌》的纯阳内息化为无形掌力隔空击出！屋顶上还有西夏死士弓手，我去扫清屋瓦，院中刺客交给你拿《劈空掌》破之！”'),
      N('生死一瞬，你福至心灵，依照丘处玄方才一掌的劲道轨迹吐气开声，双掌推出间竟然发出“呼”的一声凌厉空爆！'),
    ],
    choices: [
      {
        id: 'zn_q06_learn_pikong',
        label: '临阵悟道 · 习得良品拳掌《劈空掌》迎战刺客',
        tone: 'gold',
        effects: [
          { type: 'teachMartialArt', artId: 'MA-107', level: 1, autoEquip: true },
          openScene('scene_zn_q06_13', ZHONGNAN_Q06_QUEST_ID),
        ],
      },
    ],
  },

  scene_zn_q06_13: {
    id: 'scene_zn_q06_13',
    title: '第十三幕 · 掌破暗影',
    subtitle: '横渠书院 · 首战梁影',
    mandatory: true,
    beats: [
      S(SPEAKER_ASSASSIN_VICE, '“好刚猛的掌风！看我短刃近身挑断你手筋！”'),
      P('“有我在，休想踏入讲堂半步！”'),
    ],
    choices: [
      {
        id: 'zn_q06_fight_shadow',
        label: '催动劈空掌 · 击溃西夏暗影刺客梁影',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaShadow() },
            rule: 'story_trial',
            forbidEscapeReason: '张载与尹源先生就在堂内，岂可退避！',
            introText: '梁影身形飘忽，淬毒双匕直取要害！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q06_14', ZHONGNAN_Q06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('不慎被梁影毒匕划破衣袖，丘处玄凌空一掌将其震退。请调息再战！', '书院护道'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q06_14: {
    id: 'scene_zn_q06_14',
    title: '第十四幕 · 黑煞亲临',
    subtitle: '横渠书院 · 死士统领现身',
    mandatory: true,
    beats: [
      N('你一记《劈空掌》隔空震碎梁影手中毒匕，将其击飞撞在院墙上昏死过去。忽听书院大门轰然碎裂，一名身披玄铁软甲、手持双钩的高大西夏汉子大步踏入！'),
      S(SPEAKER_ASSASSIN_LEAD, '“竟敢坏我一品堂大事！本统领嵬名黑煞亲自送你与张载归西！”'),
      S('NPC-0048', '（手持木尺神色坦然立于阶上）“年轻人莫慌，邪不压正！此贼气息虽猛，脚步却浮，正可用方才那股清正掌风破之！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_15', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_15: {
    id: 'scene_zn_q06_15',
    title: '第十五幕 · 正气破邪',
    subtitle: '横渠书院 · 决战嵬名黑煞',
    mandatory: true,
    beats: [
      P('“张先生放心！弟子这就以终南浩然正气，擒下这西夏黑煞！”'),
    ],
    choices: [
      {
        id: 'zn_q06_fight_captain',
        label: '全真剑掌并用 · 决战西夏死士统领嵬名黑煞',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q06_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXixiaCaptain() },
            rule: 'story_trial',
            forbidEscapeReason: '死士统领就在讲堂阶下，唯有一战到底！',
            introText: '嵬名黑煞双钩交错如电，狂风般扑杀过来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q06_16', ZHONGNAN_Q06_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('嵬名黑煞双钩凌厉，丘处玄自屋瓦飞身逼退强敌。请整顿内息后再战！', '书院护道'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q06_16: {
    id: 'scene_zn_q06_16',
    title: '第十六幕 · 官兵合围',
    subtitle: '横渠书院 · 一网打尽',
    mandatory: true,
    beats: [
      N('你先以《金雁功》闪过双钩锁拿，复以《三才归元剑》挑偏其兵刃，顺势一记刚猛无俦的《劈空掌》正印在嵬名黑煞胸口！黑煞口喷鲜血倒飞三丈，重重摔落阶前！'),
      N('几乎同时，晏相公派出的京兆府精锐厢军破门而入，将残余西夏刺客悉数捆绑拿下。'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_17', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_17: {
    id: 'scene_zn_q06_17',
    title: '第十七幕 · 关学赠言',
    subtitle: '横渠书院 · 张载致谢',
    mandatory: true,
    beats: [
      S('NPC-0048', '（深深一揖，神色诚挚）“今夜若非丘道长与这位{gender:少侠|女侠}舍命护院，书院学子恐遭横祸。大宋有此等侠义之士，何愁外寇不灭！”'),
      S('NPC-0041', '（亦抚须颔首）“方才观你临危不乱、剑掌俱精，真乃道门英才！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_18', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_18: {
    id: 'scene_zn_q06_18',
    title: '第十八幕 · 秦州告急',
    subtitle: '横渠书院 · 审得密报',
    mandatory: true,
    beats: [
      N('丘处玄自嵬名黑煞怀中搜出一枚西夏狼头铜符，脸色微沉。'),
      S('NPC-0216', '“长安这拨刺客既已覆灭，另一拨西夏铁骑定然正在奔袭秦州茶马榷场！马大师兄此时恐怕已在秦州验马阑与吐蕃首领会合，咱们必须立刻西行驰援！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_19', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_19: {
    id: 'scene_zn_q06_19',
    title: '第十九幕 · 辞别长安',
    subtitle: '横渠书院 · 拂晓整装',
    mandatory: true,
    beats: [
      N('天色微明，书院内重归朗朗书声。张载与尹源亲送你们至院门之外，晏相公亦遣人送来百贯谢礼与通关文牒。'),
    ],
    onFinishEffects: [openScene('scene_zn_q06_20', ZHONGNAN_Q06_QUEST_ID)],
  },

  scene_zn_q06_20: {
    id: 'scene_zn_q06_20',
    title: '第二十幕 · 浩然西行',
    subtitle: '京兆府 · 护道圆满',
    mandatory: true,
    beats: [
      P('（望向西边秦州方向，掌心纯阳真气隐隐鼓荡）“书院已安，下一步便随丘师叔西赴秦州，护我大宋茶马边防！”'),
    ],
    choices: [
      {
        id: 'zn_q06_complete',
        label: '拱手辞行 · 完成《草堂护道 · 正气劈空》',
        tone: 'gold',
        effects: [
          { type: 'modifySkill', key: '经义', delta: 1 },
          { type: 'addSectContribution', amount: 110 },
          { type: 'giveSilver', amount: 100, reason: '京兆府护道谢礼' },
          { type: 'giveCombatExp', amount: 680, reason: '完成《草堂护道 · 正气劈空》' },
          { type: 'modifyRenown', delta: 26, reason: '长安横渠书院力挫西夏死士护张载' },
          { type: 'modifyChivalry', delta: 16, reason: '舍身护卫关学大儒与书院学子' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0216' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0048' }, delta: 14 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0041' }, delta: 10 },
          { type: 'completeQuest', questId: ZHONGNAN_Q06_QUEST_ID, outcome: 'protected_zhangzai' },
          toast('完成《草堂护道 · 正气劈空》，精进《劈空掌》！', 'success', '正气劈空'),
        ],
      },
    ],
  },
}
