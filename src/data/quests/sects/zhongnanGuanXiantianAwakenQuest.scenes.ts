import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast, teachArtNow } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q32_QUEST_ID } from './zhongnanGuanXiantianAwakenQuest'

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq32_01: {
    id: 'scene_znq32_01',
    title: '第一幕 · 朔风告警',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}孟冬，第一场朔雪覆盖了终南山苍翠的松枝。子夜未至，前山烽火亭忽然连升三道赤烟，钟鼓院急钟长鸣！'),
      N('重阳玄门清修主殿内灯火通明，紫阳真人王重楼端坐蒲团，面前摆着一只紫檀木长匣，神色渊渟岳峙，丝毫不见慌乱。'),
      S('NPC-0133', '（见你踏雪入殿，微微睁目，眸中隐有紫电一闪）“山外传报，西夏铁鹞大将军赫连霸先亲率三百精骑潜入关中，此刻已屯兵终南山口，扬言黎明时分便要踏平重阳古观。”'),
    ],
    onFinishEffects: [openScene('scene_znq32_02', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_02: {
    id: 'scene_znq32_02',
    title: '第二幕 · 铁鹞之威',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P('（抱剑肃立，眉宇间毫无惧色）“师父，赫连霸先乃西夏一品堂柱石，昔年在好水川与定川寨横行西北。他亲自上山，必是有备而来！弟子愿率师兄弟固守山门！”'),
      S('NPC-0133', '（缓缓摇头）“赫连霸先一身铁鹞横练神功与塞外霸拳已臻宗师之境，寻常剑阵困他不住。更何况，他敢单刀直入终南山，暗中必有段延庆等人牵制我与诸位宗师。”'),
      S('NPC-0133', '（凝视着你，声音深沉如钟）“今夜，正是考验你能否挑起玄门大梁的时刻。贫道闭关二十载所悟的至高心法——《先天功》，也该正式传予你了。”'),
    ],
    onFinishEffects: [openScene('scene_znq32_03', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_03: {
    id: 'scene_znq32_03',
    title: '第三幕 · 紫阳秘匣',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('王重楼伸手轻启案上紫檀木匣。匣开瞬间，一抹温润如朝霞的紫金光华流泻而出，竟将殿内寒意驱散三分！'),
      N('匣中静静叠放着一件以天蚕冰丝混织紫金线绣成的道袍鹤氅，背绣八卦太极星图，触手轻若无物，却隐隐透出护体罡气。'),
      S('NPC-0133', '“此乃贫道年轻时穿行大漠、论道华山所穿的【紫阳先天八卦鹤氅】。它不仅是护身宝衣，衣襟内衬更以先天真气暗绣着《先天功》三百六十处周天窍穴脉络！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_04', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_04: {
    id: 'scene_znq32_04',
    title: '第四幕 · 传衣寄望',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('王重楼起身走下玉阶，亲手提起紫阳先天八卦鹤氅，郑重披在你的双肩之上。宝衣上身，一股暖融融的纯阳道气立刻自肩井穴渗入奇经八脉！'),
      P('（大惊失色，连忙跪拜）“师父！此宝衣乃真人随身信物，弟子德薄功浅，岂敢僭越受此大礼！”'),
      S('NPC-0133', '（双手扶起你，目中满是欣慰与苍凉）“道门薪火，本就是一代传予一代。你自入终南以来，历经风雪而不改其志，这件鹤氅，如今穿在你身上比穿在老道身上更合宜。”'),
    ],
    onFinishEffects: [openScene('scene_znq32_05', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_05: {
    id: 'scene_znq32_05',
    title: '第五幕 · 先天总纲',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '（指尖轻点你眉心，朗声口授总纲）“听真了！世间武学，皆以后天呼吸鼓荡内息，用一分便少一分；唯我道门《先天功》，返本还原，引天地先天一炁入体，绵绵若存，用之不勤！”'),
      S('NPC-0133', '“待会儿你持此衣入【道藏经阁与紫金丹院】，趁黎明前三个时辰抱元守一。我会在丹院外为你护法，助你一举冲破后天藩篱！”'),
    ],
    onFinishEffects: [teachArtNow('MA-013'), openScene('scene_znq32_06', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_06: {
    id: 'scene_znq32_06',
    title: '第六幕 · 紫阳披肩',
    subtitle: '重阳玄门清修主殿 · 传衣授道',
    illustrationUrl: '/assets/quests/zn_q32_ziyang_robe.jpg',
    illustrationCaption: '重阳玄门主殿 · 王重楼亲手将紫阳先天八卦鹤氅披于弟子肩头，口授天阶先天功总纲',
    mandatory: true,
    beats: [
      N('殿外风雪呼啸，殿内烛火摇曳。身披紫阳鹤氅的你只觉胸中豪气干云，千钧重担在肩，却半点不觉沉重。'),
      P('（稽首受命）“弟子定在破晓前参悟先天一炁！绝不教赫连霸先踏过演剑坛半步！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_07', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_07: {
    id: 'scene_znq32_07',
    title: '第七幕 · 赴院闭关',
    subtitle: '重阳古观回廊',
    mandatory: true,
    beats: [
      N('你辞别主殿，踏着廊下积雪，疾步赶往静谧幽深的道藏经阁与紫金丹院。'),
    ],
    choices: [
      {
        id: 'znq32_accept',
        label: '身披紫阳鹤氅前往【道藏经阁与紫金丹院】，参悟先天一炁',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q32_QUEST_ID, stepId: 'enlighten_alchemy' },
          setStep(ZHONGNAN_Q32_QUEST_ID, 'enlighten_alchemy'),
          toast('已接取《先天一炁 · 紫阳传衣》！请前往【道藏经阁与紫金丹院】闭关悟道。', 'talk', '先天一炁'),
        ],
      },
    ],
  },

  scene_znq32_08: {
    id: 'scene_znq32_08',
    title: '第八幕 · 紫金静室',
    subtitle: '重阳古观 · 道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('紫金丹院内寂静无声，八卦铜炉中仅余一点微弱的炭火，四壁悬满历代道家先贤手书的《道德经》与《黄庭经》拓本。'),
      N('你于蒲团之上五心朝天盘膝坐定，缓缓闭目。衣袍内衬的八卦暗纹随着呼吸起伏，竟似与天地间的寒风雪气生出微妙共鸣。'),
    ],
    onFinishEffects: [openScene('scene_znq32_09', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_09: {
    id: 'scene_znq32_09',
    title: '第九幕 · 破除后天',
    subtitle: '道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('初时运功，体内旧有的纯阳内息奔涌如江河，撞击在任督二脉玄关之前，竟似触壁而回，胸口憋闷欲裂！'),
      S('NPC-0133', '（门外传来王重楼清越如鹤唳的传音）“莫急！莫强催！你仍在用后天之力硬闯关隘！忘掉招式，忘掉胜负，将全身内息散归虚无，方见先天本源！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_10', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_10: {
    id: 'scene_znq32_10',
    title: '第十幕 · 虚室生白',
    subtitle: '道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('闻言如遭醍醐灌顶！你毅然散去周身鼓荡的后天劲力，任凭丹田空明如镜，呼吸渐缓、渐细、渐至若有若无。'),
      N('不知过了多久，就在意识仿佛与终南漫天飞雪融为一体的刹那，丹田最深处忽然跳动起一粒温润炽热的紫金火种——宛如鸿蒙初开，生生不息！'),
    ],
    onFinishEffects: [openScene('scene_znq32_11', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_11: {
    id: 'scene_znq32_11',
    title: '第十一幕 · 紫气冲关',
    subtitle: '道藏经阁与紫金丹院',
    mandatory: true,
    beats: [
      N('轰然一声无声雷鸣在识海中炸开！那缕先天一炁顺着紫阳鹤氅的八卦脉络游走周身，所过之处，任督二脉如冰河解冻般豁然贯通，经脉瞬间拓宽数倍！'),
      N('你衣袍无风自动，周身腾起一层淡紫清光，将丹院窗棂上的积雪悄然融化为缕缕白雾！'),
    ],
    onFinishEffects: [openScene('scene_znq32_12', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_12: {
    id: 'scene_znq32_12',
    title: '第十二幕 · 先天初成',
    subtitle: '道藏经阁与紫金丹院 · 贯通周天',
    illustrationUrl: '/assets/quests/zn_q32_xiantian_qi.jpg',
    illustrationCaption: '紫金丹院 · 先天一炁破关而出，紫阳鹤氅星纹大亮，道藏经阁紫气盈室',
    mandatory: true,
    beats: [
      N('你缓缓睁开双眼，瞳孔深处紫芒一闪即逝，整个人反璞归真，既无凌厉杀气，亦无骄躁锋芒，却宛如一座不可撼动的终南奇峰！'),
      P('（长吐一口清气，轻声自语）“原来如此……天下万法归宗，唯此先天一炁，浩然不绝！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_13', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_13: {
    id: 'scene_znq32_13',
    title: '第十三幕 · 山门号角',
    subtitle: '道藏经阁与紫金丹院外',
    mandatory: true,
    beats: [
      N('便在此时，东方天际泛起鱼肚白，一声苍凉雄浑的西夏牛角号陡然撕裂终南山的寂静！前山方向紧接着传来喊杀声与巨石崩裂的闷响！'),
      S('NPC-0133', '（推门而入，望见你周身圆融无瑕的先天气象，不由抚须大笑）“好！赶在破晓前破关大成！赫连霸先已亲率铁鹞精锐踏上天罡北斗演剑坛，老道去后山盯住段延庆的暗手——演剑坛的赫连霸先，交给你了！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_14', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_14: {
    id: 'scene_znq32_14',
    title: '第十四幕 · 破晓出关',
    subtitle: '重阳古观雪径',
    mandatory: true,
    beats: [
      N('你整理紫阳先天八卦鹤氅，步履从容却快如流云，直奔杀声震天的天罡北斗七星演剑坛！'),
    ],
    choices: [
      {
        id: 'znq32_go_dipper',
        label: '驰赴【天罡北斗七星演剑坛】，正面迎战铁鹞大将军赫连霸先！',
        tone: 'danger',
        effects: [
          setStep(ZHONGNAN_Q32_QUEST_ID, 'dawn_helian_duel'),
          toast('请前往【天罡北斗七星演剑坛（zn_to_dipper）】击退赫连霸先！', 'warn', '破晓退敌'),
        ],
      },
    ],
  },

  scene_znq32_15: {
    id: 'scene_znq32_15',
    title: '第十五幕 · 铁甲踏雪',
    subtitle: '重阳古观 · 天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('天罡北斗七星演剑坛上积雪已被铁蹄与血污踏得狼藉不堪。数十名重阳弟子结阵苦撑，却被一道铁塔般的魁梧身影一拳震飞数丈！'),
      S('NPC-0130', '（身披玄黑铁鹞重甲，双拳戴着寒光森森的精钢虎指，狂笑声震落檐上冰凌）“哈哈哈哈！什么终南玄门正统！王重楼那老道躲在哪里做缩头乌龟？今日叫本将军拆了你们这北斗演剑坛，拿去给西夏皇帝当垫脚石！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_16', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_16: {
    id: 'scene_znq32_16',
    title: '第十六幕 · 鹤氅临坛',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('一道紫金流光自高阶飘然落于演剑坛正中，脚尖点雪无痕，正是身披紫阳先天八卦鹤氅的你！'),
      P('（声音平淡却字字清晰地压过漫山北风）“赫连将军好大的口气。要拆我重阳演剑坛，先问过贫道肩上这件紫阳鹤氅，再问过掌中这缕先天一炁！”'),
      S('NPC-0130', '（目光骤然一凝，盯着你肩头八卦鹤氅，脸色微变）“紫阳鹤氅？！王重楼竟把压箱底的宝贝和《先天功》传给了一个年轻小辈？哼，正好！先捏碎你这新晋真传，再斩王重楼！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_17', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_17: {
    id: 'scene_znq32_17',
    title: '第十七幕 · 破晓压境',
    subtitle: '天罡北斗七星演剑坛 · 铁鹞临城',
    illustrationUrl: '/assets/quests/zn_q32_dipper_dawn.jpg',
    illustrationCaption: '破晓演剑坛 · 赫连霸先率西夏铁鹞重甲压境，你身披紫阳鹤氅孤身立于北斗阵眼',
    mandatory: true,
    beats: [
      N('赫连霸先暴喝一声，周身玄甲发出雷鸣般的金属摩擦声，狂暴的西夏霸拳罡气卷起漫天雪浪，直压演剑坛而来！'),
      P('（深吸天地晨曦之气，先天功自然运转，周身紫气如太极云海缓缓舒展）“来得好！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_18', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_18: {
    id: 'scene_znq32_18',
    title: '第十八幕 · 正面硬撼',
    subtitle: '天罡北斗七星演剑坛 · 宗师对决',
    mandatory: true,
    beats: [
      N('此战乃终南古观存亡之战，更是你天阶先天功初成后的首次宗师试锋！'),
    ],
    choices: [
      {
        id: 'znq32_fight_helian',
        label: '催动先天一炁，正面迎战【铁鹞大将军 · 赫连霸先】！',
        tone: 'danger',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q32_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0130' },
            rule: 'duel',
            lethalOnLose: false,
            forbidEscapeReason: '身披紫阳鹤氅立于演剑坛，绝不可在赫连霸先面前退缩半步！',
            introText: '破晓晨光中，你以初成的天阶《先天功》正面硬撼西夏铁鹞大将军赫连霸先！',
            onWin: [openScene('scene_znq32_19', ZHONGNAN_Q32_QUEST_ID)],
            onLose: [
              toast('赫连霸先铁鹞霸拳刚猛绝伦，你暂借八卦鹤氅卸力稳住气血，调息后再战！', 'warn', '演剑坛受挫'),
            ],
            onDraw: [
              toast('双方拳掌交锋震裂青石，赫连霸先气势已衰，速乘胜再战！', 'warn', '胜负未分'),
            ],
          },
        ],
      },
    ],
  },

  scene_znq32_19: {
    id: 'scene_znq32_19',
    title: '第十九幕 · 刚柔破甲',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('激战百余合，赫连霸先越打越心惊！他每一记足以开碑裂石的铁鹞重拳轰在你身前，皆如泥牛入海般被那股圆融绵长的先天真气尽数化去，反倒震得自己虎口发麻！'),
      S('NPC-0130', '（怒吼连连，额头青筋暴起）“不可能！你的内力怎么越打越盛、丝毫不见枯竭？！”'),
      P('（眸中紫芒大盛，双掌合抱太极，一记蓄满天地清气的先天纯阳掌轰然印在赫连霸先胸口玄甲正中）“后天之力有穷，先天一炁无穷！赫连将军，接我这一掌！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_20', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_20: {
    id: 'scene_znq32_20',
    title: '第二十幕 · 铁鹞崩退',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('“咔嚓”一声脆响！赫连霸先胸前那副号称刀枪不入的西夏百炼玄铁护心镜竟被掌力震出蛛网裂痕！他整个人如断线风筝般倒飞三丈，重重撞塌了坛边石栏，喉头一甜喷出一口淤血！'),
      N('随行的西夏铁鹞亲卫见主将受创，顿时阵脚大乱，重阳道众齐声欢呼，长剑如林压上前去！'),
    ],
    onFinishEffects: [openScene('scene_znq32_21', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_21: {
    id: 'scene_znq32_21',
    title: '第二十一幕 · 狼狈退兵',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0130', '（在亲卫搀扶下踉跄起身，抹去嘴角血迹，眼中满是骇然与忌惮）“好个《先天功》！好个紫阳传人！今日之败，赫连霸先记下了！撤兵——！”'),
      N('西夏铁鹞营残部护着重伤的赫连霸先仓皇退下终南山道，漫天飞雪很快掩盖了他们狼狈逃窜的蹄印。'),
    ],
    onFinishEffects: [openScene('scene_znq32_22', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_22: {
    id: 'scene_znq32_22',
    title: '第二十二幕 · 先天退敌',
    subtitle: '天罡北斗七星演剑坛 · 破晓大捷',
    illustrationUrl: '/assets/quests/zn_q32_helian_clash.jpg',
    illustrationCaption: '天罡演剑坛 · 先天一炁紫光冲霄，一掌震裂铁鹞重甲正面击退赫连霸先',
    mandatory: true,
    beats: [
      N('旭日跃出东方云海，万道金光照彻终南雪岭。满坛重阳道众纷纷收剑稽首，齐声高呼：“恭喜{gender:师兄|师姐}先天神功大成，大破西夏铁鹞！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_23', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_23: {
    id: 'scene_znq32_23',
    title: '第二十三幕 · 归殿复命',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('你吩咐师弟们打扫战场、救治伤员，自己则整理衣冠，步回重阳玄门清修主殿向王重楼复命。'),
    ],
    choices: [
      {
        id: 'znq32_go_return',
        label: '返回【重阳玄门清修主殿】，向紫阳真人复命',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q32_QUEST_ID, 'return_hall_triumph'),
          toast('请返回【重阳玄门清修主殿（zn_to_hall）】复命结案！', 'success', '破晓大捷'),
        ],
      },
    ],
  },

  scene_znq32_24: {
    id: 'scene_znq32_24',
    title: '第二十四幕 · 师徒笑谈',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('回到主殿，王重楼早已烹好一壶雪水松针茶。见你衣衫未损、气息愈发深厚如海，老人脸上绽出多年未见的畅快笑容。'),
      S('NPC-0133', '“段延庆在后山窥探片刻，见演剑坛上紫气冲天、赫连霸先吐血败走，便也知难而退了。好孩子，你这一战，比贫道预想的还要漂亮三分！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_25', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_25: {
    id: 'scene_znq32_25',
    title: '第二十五幕 · 玄门气象',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P('（恭敬奉茶）“全赖师父赐予紫阳鹤氅与先天秘诀，否则弟子绝难正面接下赫连霸先那般刚猛的铁鹞神拳。”'),
      S('NPC-0133', '（轻啜香茗，目光深远）“外物终究是辅，道心才是根本。你能在一夜之间破除后天执念、纳天地一炁入体，足证你已踏入宗师大道之门。”'),
    ],
    onFinishEffects: [openScene('scene_znq32_26', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_26: {
    id: 'scene_znq32_26',
    title: '第二十六幕 · 塞北风云',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '（话锋微转，神色渐肃）“不过赫连霸先此番受挫，西夏与辽国必会联手反扑潼关与延安边镇。待你再将《先天功》温养数日，我还要把古观镇山神剑交到你手上。”'),
      P('（眼中精光湛然）“无论潼关还是延安，只要胡骑敢犯大宋疆土，弟子必率玄门剑阵御敌于国门之外！”'),
    ],
    onFinishEffects: [openScene('scene_znq32_27', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_27: {
    id: 'scene_znq32_27',
    title: '第二十七幕 · 朝日紫衣',
    subtitle: '重阳古观 · 紫阳传衣',
    illustrationUrl: '/assets/quests/zn_q32_sunrise_dao.jpg',
    illustrationCaption: '重阳古观雪霁 · 朝阳满坛，紫阳鹤氅迎风舒展，先天一炁薪火相传',
    mandatory: true,
    beats: [
      N('风雪初停，云开日出。终南山巅松柏苍翠欲滴，重阳玄门的无上薪火，已稳稳落入你的掌心。'),
    ],
    onFinishEffects: [openScene('scene_znq32_28', ZHONGNAN_Q32_QUEST_ID)],
  },

  scene_znq32_28: {
    id: 'scene_znq32_28',
    title: '第二十八幕 · 先天归宗',
    subtitle: '重阳玄门清修主殿 · 结案',
    mandatory: true,
    beats: [
      N('你正式承接紫阳真人亲赐宝衣【紫阳先天八卦鹤氅】与天阶镇派绝学【先天功】，一战击退赫连霸先，威震终南！'),
    ],
    choices: [
      {
        id: 'znq32_complete',
        label: '拜谢紫阳真人，正式承接【紫阳先天八卦鹤氅】与【先天功】（完成任务）',
        tone: 'gold',
        effects: [
          { type: 'giveItem', itemId: 'ARM-057', qty: 1 },
          { type: 'teachMartialArt', artId: 'MA-013', level: 1 },
          { type: 'giveCombatExp', amount: 1200, reason: '悟通天阶先天功并正面击退西夏铁鹞大将军赫连霸先' },
          { type: 'modifyRenown', delta: 180, reason: '身披紫阳鹤氅正面击退赫连霸先，名震关中与西北武林' },
          { type: 'modifyChivalry', delta: 70, reason: '临危悟道、以先天神功护持终南山门' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '书', delta: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0133' }, delta: 30 },
          { type: 'completeQuest', questId: ZHONGNAN_Q32_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成《先天一炁 · 紫阳传衣》！获地阶宝衣【紫阳先天八卦鹤氅】、天阶内功【先天功】！',
            'success',
            '紫阳传衣',
          ),
        ],
      },
    ],
  },
}
