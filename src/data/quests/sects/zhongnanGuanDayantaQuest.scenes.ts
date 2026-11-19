import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, warn } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q09_QUEST_ID } from './zhongnanGuanDayantaQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_zn_q09_01: {
    id: 'scene_zn_q09_01',
    title: '第一幕 · 丹炉惊雷',
    subtitle: '重阳古观 · 道藏经阁与紫金丹院',
    illustrationUrl: '/assets/quests/zn_q09_alchemy_explosion.jpg',
    illustrationCaption: '紫金丹劫 · 紫金丹院炉火轰然炸裂，黑烟毒火冲天而起',
    mandatory: true,
    beats: [
      N('{reignYear}深秋子夜，终南山忽起一声震耳欲聋的轰鸣！紫金丹院方向火光冲天，刺鼻的硫磺与腥甜腐毒气味顺着夜风弥漫开来！'),
      N('你提剑疾掠至丹院，只见千年青铜丹炉已炸裂成数截，砖瓦倾颓，掌管丹火的师姐【郝杏珠】满面烟尘，正死死扶着口吐黑血的长生子【刘处静】！'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_02', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_02: {
    id: 'scene_zn_q09_02',
    title: '第二幕 · 长生负创',
    subtitle: '紫金丹院 · 问明变故',
    mandatory: true,
    beats: [
      P('（急忙上前替刘处静输注纯阳内息护住心脉）“二师兄！郝师姐！究竟是谁如此歹毒，敢炸毁我终南紫金丹炉？”'),
      S('NPC-0695', '（眼眶泛红，焦急万分）“是星宿派的魔头【狮吼子】！那恶贼趁我添药之际往炉中投入腐心磷粉引爆丹炉，刘师叔为了替我挡下毒火，硬挨了他一记化毒狮吼掌！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_03', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_03: {
    id: 'scene_zn_q09_03',
    title: '第三幕 · 丹经被劫',
    subtitle: '紫金丹院 · 遗落线索',
    mandatory: true,
    beats: [
      S('NPC-1056', '（捂胸喘息，声音沙哑却目光如炬）“贫道内息护体，尚无性命之忧……只是那狮吼子趁乱破开经阁铁锁，抢走了重阳祖师手录的《紫金丹经》！若让星宿老怪拿去反炼剧毒，关中必遭大劫！”'),
      P('“二师兄放心！我此前在长安西市破星宿暗哨时，密笺上便写着‘紫金丹炉’与‘大雁塔’！那魔头此刻八成正逃往京兆府慈恩寺大雁塔，与星宿余孽会合！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_04', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_04: {
    id: 'scene_zn_q09_04',
    title: '第四幕 · 检视残方',
    subtitle: '紫金丹院 · 辨识毒火',
    mandatory: true,
    beats: [
      N('你蹲身捡起炉灰旁半片未烧尽的西域药笺，与郝杏珠迅速核对炉中药材配比，算清磷粉投药分量，竟从中反推出克制狮吼子毒烟的避毒之法！'),
      S('NPC-0695', '“{gender:师弟|师妹}好精妙的算学药理！快带上这瓶冰心玉露丸，可保你在大雁塔顶百毒不侵！”'),
    ],
    onFinishEffects: [
      { type: 'modifySkill', key: '算术', delta: 1 },
      openScene('scene_zn_q09_05', ZHONGNAN_Q09_QUEST_ID),
    ],
  },

  scene_zn_q09_05: {
    id: 'scene_zn_q09_05',
    title: '第五幕 · 独挑重任',
    subtitle: '紫金丹院 · 临危受命',
    mandatory: true,
    beats: [
      S('NPC-1056', '“马大师兄与丘师弟正奉紫阳师尊之命在后山推演北斗大阵，山门此刻空虚，唯你这位新晋古观真传可担追凶重任！狮吼子已臻一流下品之境，且擅音波毒掌，你务必慎之又慎！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_06', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_06: {
    id: 'scene_zn_q09_06',
    title: '第六幕 · 飞鸽约援',
    subtitle: '紫金丹院 · 联络长安同道',
    mandatory: true,
    beats: [
      S('NPC-0695', '“我已飞鸽传书长安城内的正义侠友——‘玉面虎’白星焱与‘踏雪枪’宋河麟二位豪杰！他们素来痛恨星宿妖人，定会先去慈恩寺大雁塔下替你盯住外围！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_07', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_07: {
    id: 'scene_zn_q09_07',
    title: '第七幕 · 跨骏星驰',
    subtitle: '终南山门 · 踏夜追凶',
    mandatory: true,
    beats: [
      N('你翻身跨上秦州河曲良驹，迎着深秋寒风直扑京兆府慈恩寺大雁塔！'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_08', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_08: {
    id: 'scene_zn_q09_08',
    title: '第八幕 · 直指慈恩',
    subtitle: '长安南郊 · 遥望雁塔孤影',
    mandatory: true,
    beats: [
      N('黎明前最暗的时刻，七层巍峨的慈恩寺大雁塔刺破夜雾。塔顶佛龛处隐约闪过一抹诡异的碧绿磷火！'),
    ],
    choices: [
      {
        id: 'zn_q09_go_dayanta',
        label: '星夜疾驰 · 赶赴【慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺】',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q09_QUEST_ID, stepId: 'dayanta_pursue_lion' },
          setStep(ZHONGNAN_Q09_QUEST_ID, 'dayanta_pursue_lion'),
          toast('请速赴【京兆府 · 慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺】会合白星焱、宋河麟追击狮吼子！', 'talk', '大雁除妖'),
        ],
      },
    ],
  },

  scene_zn_q09_09: {
    id: 'scene_zn_q09_09',
    title: '第九幕 · 塔顶会侠',
    subtitle: '慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
    illustrationUrl: '/assets/quests/zn_q09_dayanta_summit.jpg',
    illustrationCaption: '大雁塔顶 · 拂晓云雾缭绕七层高塔，白星焱与宋河麟已封锁塔阶',
    mandatory: true,
    beats: [
      N('你施展《金雁功》沿着陡峭塔梯直上七层绝顶。拂晓微光中，但见「玉面虎」白星焱与「踏雪枪」宋河麟已联手放倒数名星宿吹鼓手，牢牢堵住下塔通道！'),
      S('NPC-0328', '（抱拳朗声道）“终南真传果然神速！外围杂鱼已被我与宋兄清扫干净，那魔头狮吼子就在绝顶佛龛外栏凭风而立！”'),
      S('NPC-0327', '（长枪斜指，神色肃然）“此獠乃星宿一流护法，狮吼功专破人心神，我二人替你守住楼梯防其遁走，正面对决就看你的《希夷剑法》了！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_10', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_10: {
    id: 'scene_zn_q09_10',
    title: '第十幕 · 狂狮现形',
    subtitle: '绝顶佛龛 · 狮吼子狂笑',
    mandatory: true,
    beats: [
      N('绝顶朱栏之外，一名身材魁梧、满头乱发如狮鬃般的紫袍魔头正翻阅着一卷紫金封皮古籍——正是《紫金丹经》！'),
      S('NPC-0231', '（缓缓合上丹经揣入怀中，发出雷鸣般的狂笑）“哈哈哈哈！重阳古观没人了吗？竟派个刚升真传的小娃娃来送死！也好，老夫便把你从这七层大雁塔顶轰下去喂野狗！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_11', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_11: {
    id: 'scene_zn_q09_11',
    title: '第十一幕 · 希夷对狂狮',
    subtitle: '绝顶佛龛 · 屏息凝神',
    illustrationUrl: '/assets/quests/zn_q09_lion_roar_duel.jpg',
    illustrationCaption: '塔顶决战 · 寒泉道剑划破晓雾，迎战星宿狂狮护法狮吼子',
    mandatory: true,
    beats: [
      N('你服下冰心玉露丸，将《全真大道筑基歌》真气守住灵台清明，寒泉道剑斜垂身侧，竟隐隐现出陈抟老祖「视之不见、听之不闻」的希夷剑意！'),
      P('“狮吼子！你炸毁丹炉、重创刘师兄、盗窃镇院丹经，今日便在这大雁塔顶一并清算！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_12', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_12: {
    id: 'scene_zn_q09_12',
    title: '第十二幕 · 绝顶独战',
    subtitle: '绝顶佛龛 · 一对一决战狮吼子',
    mandatory: true,
    beats: [
      S('NPC-0231', '“狂妄小辈！接老夫一记星宿狂狮吼！”'),
    ],
    choices: [
      {
        id: 'zn_q09_fight_lion',
        label: '独剑迎魔 · 一对一正面击退星宿护法狮吼子',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q09_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0231' },
            rule: 'story_trial',
            forbidEscapeReason: '镇院《紫金丹经》就在魔头怀中，唯有一战夺回！',
            introText: '狮吼子张口爆出一声震耳欲聋的狂狮吼，毒掌挟腥风拍来！',
            onWin: [
              { type: 'healPlayer', hpPct: 100, mpPct: 100 },
              openScene('scene_zn_q09_13', ZHONGNAN_Q09_QUEST_ID),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 60, mpPct: 60 },
              warn('狮吼子一流功力果然凶悍，白星焱与宋河麟及时出手替你格开杀招。请调息后再战！', '大雁除妖'),
            ],
          },
        ],
      },
    ],
  },

  scene_zn_q09_13: {
    id: 'scene_zn_q09_13',
    title: '第十三幕 · 剑破狮吼',
    subtitle: '绝顶佛龛 · 夺回紫金丹经',
    mandatory: true,
    beats: [
      N('狂风卷过塔檐铜铃，你以《金雁功》贴栏滑行避开音波正面，顺势使出地阶《希夷剑法》杀招——剑影虚无缥缈，一剑挑破狮吼子衣襟，紧接着一记《劈空掌》正中其肩胛！'),
      N('“啪！”《紫金丹经》自狮吼子怀中飞落，被你凌空稳稳抄入掌心！'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_14', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_14: {
    id: 'scene_zn_q09_14',
    title: '第十四幕 · 魔头遁逃',
    subtitle: '大雁塔顶 · 狼狈败退',
    mandatory: true,
    beats: [
      S('NPC-0231', '（捂肩连退数步，又惊又怒）“好诡异的《希夷剑法》！终南山竟藏着你这等后起之秀！今日之仇，星宿老仙必十倍讨还！”'),
      N('说罢，狮吼子猛地捏碎三颗黑烟毒弹遮蔽视线，借着塔檐飞檐纵身跃下茫茫晨雾，狼狈逃出长安城！'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_15', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_15: {
    id: 'scene_zn_q09_15',
    title: '第十五幕 · 群侠拜服',
    subtitle: '绝顶佛龛 · 晓日照长安',
    mandatory: true,
    beats: [
      N('朝阳跃出东郊云层，万道金光洒满雄伟的长安城廓。白星焱与宋河麟大步走上前来，由衷抱拳赞叹。'),
      S('NPC-0328', '“一对一正面击退星宿一流护法狮吼子，夺回终南镇院丹经！自今日起，{gender:少侠|女侠}威名必震动整个关中武林！”'),
      S('NPC-0327', '“痛快！待日后闲暇，宋某定要携美酒上终南山与你痛饮三百杯！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_16', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_16: {
    id: 'scene_zn_q09_16',
    title: '第十六幕 · 辞侠归山',
    subtitle: '慈恩寺门前 · 护经返程',
    mandatory: true,
    beats: [
      P('（将完好无损的《紫金丹经》贴身藏好，向二位豪杰深深一揖）“多谢白兄、宋兄仗义封楼！刘师兄尚在丹院负伤待治，在下须即刻护经回山！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_17', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_17: {
    id: 'scene_zn_q09_17',
    title: '第十七幕 · 驰回丹院',
    subtitle: '终南古道 · 丹经完璧',
    mandatory: true,
    beats: [
      N('你纵马飞驰回终南山，一路秋枫如画，心中唯愿刘师兄伤势早日痊愈。'),
    ],
    choices: [
      {
        id: 'zn_q09_return_alchemy',
        label: '护经返山 · 返回【道藏经阁与紫金丹院】呈还《紫金丹经》',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q09_QUEST_ID, 'alchemy_return_scripture'),
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0328' }, delta: 12 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0327' }, delta: 12 },
          toast('已击退狮吼子夺回《紫金丹经》！请返回【道藏经阁与紫金丹院】复命。', 'success', '大雁除妖'),
        ],
      },
    ],
  },

  scene_zn_q09_18: {
    id: 'scene_zn_q09_18',
    title: '第十八幕 · 完璧归阁',
    subtitle: '重阳古观 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('回到紫金丹院，焦黑废墟已被同门清理一新。刘处静正盘膝调息，见你双手捧回完好无损的《紫金丹经》，苍白面容顿现大喜之色！'),
      S('NPC-1056', '（接过丹经，长舒一口气）“竟真让你在大雁塔顶一对一击退了狮吼子！{gender:师弟|师妹}此番不仅保住了祖师丹经，更替我终南重阳古观扬眉吐气！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_19', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_19: {
    id: 'scene_zn_q09_19',
    title: '第十九幕 · 杏珠拜谢',
    subtitle: '紫金丹院 · 同门情深',
    mandatory: true,
    beats: [
      S('NPC-0695', '（拭去眼角泪光，盈盈拜下）“多谢{gender:师弟|师妹}替刘师叔报仇雪恨、夺回丹经！按丹经古方新配的解毒灵膏已敷上，不出十日刘师叔便能彻底痊愈！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_20', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_20: {
    id: 'scene_zn_q09_20',
    title: '第二十幕 · 暗流未歇',
    subtitle: '紫金丹院 · 远望西域',
    mandatory: true,
    beats: [
      S('NPC-1056', '（神色微凝）“只是狮吼子临逃前扬言星宿老仙必十倍讨还，加之西夏、吐蕃密宗亦在关中蠢蠢欲动，一场席卷终南的大风暴，怕是已在酝酿之中……”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_21', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_21: {
    id: 'scene_zn_q09_21',
    title: '第二十一幕 · 真传担当',
    subtitle: '紫金丹院 · 剑胆琴心',
    mandatory: true,
    beats: [
      P('（按剑肃立，目光沉静而坚定）“兵来将挡，水来土掩。纵有强敌叩山，弟子亦愿与诸位师兄共守终南！”'),
    ],
    onFinishEffects: [openScene('scene_zn_q09_22', ZHONGNAN_Q09_QUEST_ID)],
  },

  scene_zn_q09_22: {
    id: 'scene_zn_q09_22',
    title: '第二十二幕 · 丹香重续',
    subtitle: '重阳古观 · 大雁除妖圆满',
    mandatory: true,
    beats: [
      N('新炉再起，一缕清正醇厚的紫金丹香重新飘荡在终南松林之间。你已真正成长为令邪魔胆寒的终南古观真传！'),
    ],
    choices: [
      {
        id: 'zn_q09_complete',
        label: '稽首辞别 · 完成《紫金丹劫 · 大雁除妖》',
        tone: 'gold',
        effects: [
          { type: 'addSectContribution', amount: 220 },
          { type: 'giveSilver', amount: 180, reason: '大雁塔除妖夺回《紫金丹经》重赏' },
          { type: 'giveCombatExp', amount: 1120, reason: '完成《紫金丹劫 · 大雁除妖》' },
          { type: 'modifyRenown', delta: 42, reason: '大雁塔顶独退星宿一流护法狮吼子' },
          { type: 'modifyChivalry', delta: 20, reason: '夺回镇院丹经护关中免遭毒祸' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-1056' }, delta: 16 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0695' }, delta: 14 },
          { type: 'completeQuest', questId: ZHONGNAN_Q09_QUEST_ID, outcome: 'recovered_alchemy_scripture' },
          toast('完成《紫金丹劫 · 大雁除妖》，威名震动关中！', 'success', '大雁除妖'),
        ],
      },
    ],
  },
}
