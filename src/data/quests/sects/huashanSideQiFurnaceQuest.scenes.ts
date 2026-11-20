import type { NodeNpc } from '../../../types/game'
import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, makeQuestNpc, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { HUASHAN_SIDE05_QUEST_ID } from './huashanSideQiFurnaceQuest'

const SPEAKER_XINGXIU_1: StorySpeakerSpec = {
  kind: 'custom',
  name: '碧磷童子',
  title: '星宿派盗药毒徒',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

const SPEAKER_XINGXIU_2: StorySpeakerSpec = {
  kind: 'custom',
  name: '阴九',
  title: '腐骨手 · 星宿派恶徒',
  factionName: '星宿派',
  portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
}

function buildXingxiuRaider1(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS05_XINGXIU_1',
    name: '碧磷童子',
    title: '星宿派盗药毒徒',
    realm: '二流中品',
    factionName: '星宿派',
    sectRank: 2,
    sectRankLabel: '星宿内门',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“嘿嘿！华山派炼了三天的纯阳宝丹，拿去给咱们星宿老仙炼腐尸毒正合适！”',
    stats: { hp: 1180, mp: 620, agi: 46, res: 28 },
    talents: { bone: 60, comprehension: 58, charm: 26 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-138',
      move1: 'MA-137',
      move2: 'MA-127',
    },
    learnedArts: [
      { artId: 'MA-231', level: 6 },
      { artId: 'MA-138', level: 5 },
      { artId: 'MA-137', level: 5 },
      { artId: 'MA-127', level: 5 },
    ],
  })
}

function buildXingxiuRaider2(): NodeNpc {
  return makeQuestNpc({
    id: 'QUEST_HSS05_XINGXIU_2',
    name: '阴九',
    title: '腐骨手 · 星宿派恶徒',
    realm: '二流上品',
    factionName: '星宿派',
    sectRank: 2,
    sectRankLabel: '星宿骨干',
    avatarUrl: '/assets/characters/templates/tpl_xingxiu_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_xingxiu_fb.jpg',
    talk: '“高沧云已被咱们调虎离山引去崖边了！就凭你一个华山小辈，也敢挡我腐骨毒掌？！”',
    stats: { hp: 1460, mp: 760, agi: 52, res: 33 },
    talents: { bone: 66, comprehension: 62, charm: 28 },
    equippedArts: {
      neigong: 'MA-231',
      qinggong: 'MA-138',
      move1: 'MA-127',
      move2: 'MA-137',
      move3: 'MA-105',
    },
    learnedArts: [
      { artId: 'MA-231', level: 7 },
      { artId: 'MA-138', level: 6 },
      { artId: 'MA-127', level: 6 },
      { artId: 'MA-137', level: 6 },
      { artId: 'MA-105', level: 5 },
    ],
  })
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_hss05_01: {
    id: 'scene_hss05_01',
    title: '第一幕 · 冬至开炉',
    subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪丹房',
    mandatory: true,
    beats: [
      N('{reignYear}寒气逼人，东峰紫气迎曦石坪丹房内却温暖如春。一座三足紫铜八卦丹炉置于石室正中，炉底炭火青紫交辉，氤氲出淡淡清冽药雾。'),
      N('大师兄「紫霞首徒」高沧云正盘膝调息，见你推门而入，睁开双目露出温厚笑意。'),
      S('NPC-0202', '“{gender:师弟|师妹}来得正好！冬至阴极阳生，正是本门气宗开炉炼制『太岳紫阳丹』的三日良辰。此丹须以纯正平和的华山内息昼夜温养火候，不可有半刻急躁中断。”'),
      P('“大师兄可是需要人轮值看火？弟子内息虽尚浅薄，却愿竭尽全力助师兄一臂之力！”'),
    ],
    onFinishEffects: [openScene('scene_hss05_02', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_02: {
    id: 'scene_hss05_02',
    title: '第二幕 · 气宗心传',
    subtitle: '东峰丹房石室',
    mandatory: true,
    beats: [
      S('NPC-0202', '（颔首微笑）“正是信得过你根基扎实、性情沉稳，方才邀你共守这三夜丹火。借丹炉纯阳药气反哺己身，对你修习《华山基础心法》与《养吾剑法》的内气圆融亦是难得机缘。”'),
      S('NPC-0202', '“头两夜我与你轮番吐纳控火；待到第三夜子时丹成凝珠之刻，我须去东峰外围巡视暗哨以防山野精怪或宵小惊扰，丹房重任便暂托予你了。”'),
      P('“师兄放心，弟子定当寸步不离丹炉，绝不负师门重托！”'),
    ],
    onFinishEffects: [openScene('scene_hss05_03', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_03: {
    id: 'scene_hss05_03',
    title: '第三幕 · 朝阳温炉',
    subtitle: '东峰丹房 · 两夜运功控火',
    illustrationUrl: '/assets/quests/hs_side05_furnace_qi.jpg',
    illustrationCaption: '朝阳温炉 · 东峰丹房雪夜运功控火，紫气与丹炉纯阳交融',
    mandatory: true,
    beats: [
      N('接连两夜，你与高沧云相对盘坐于紫铜八卦炉两侧。你双掌虚按炉腹三寸，运转《华山基础心法》，将一缕缕绵长温润的纯阳真气徐徐送入炉底文火之中。'),
      N('炉火随你吐纳呼吸明灭起伏，如春风化雪般恰到好处。丹炉内溢出的淡淡紫气顺着周身百骸回流丹田，竟令你连日苦修的几处经脉滞涩悄然贯通！'),
      S('NPC-0202', '（收功长叹，眼中满是赞赏）“好定力！两夜下来炉温不差毫厘，连为兄都自愧不如。今夜便是成丹最后关头，山外风雪忽紧，我先去东崖石径巡查一圈，你且稳守丹室！”'),
    ],
    onFinishEffects: [openScene('scene_hss05_04', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_04: {
    id: 'scene_hss05_04',
    title: '第四幕 · 风雪巡崖',
    subtitle: '东峰丹房门外',
    mandatory: true,
    beats: [
      N('高沧云披上青色蓑衣提剑步入漫天飞雪之中。丹房厚重木门缓缓合拢，石室内只余紫铜丹炉低沉的嗡鸣与窗外呼啸的北风。'),
    ],
    choices: [
      {
        id: 'hss05_start_guard',
        label: '合上丹房门闩，盘膝运功独守第三夜紫阳丹炉',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: HUASHAN_SIDE05_QUEST_ID, stepId: 'guard_third_night' },
          setStep(HUASHAN_SIDE05_QUEST_ID, 'guard_third_night'),
          toast('已进入第三夜守炉阶段！请于【东峰紫气迎曦石坪（tg_zx_terrace）】稳守丹炉直至黎明。', 'talk', '朝阳守火'),
        ],
      },
    ],
  },

  scene_hss05_05: {
    id: 'scene_hss05_05',
    title: '第五幕 · 异香腥风',
    subtitle: '雪夜三更 · 东峰丹房',
    mandatory: true,
    beats: [
      N('雪夜三更，丹炉内药香愈发醇厚，炉盖缝隙隐隐透出一抹温润紫霞——太岳紫阳丹已至凝珠紧要关头！'),
      N('忽然间，丹房北侧高窗外飘进一缕极其刺鼻的甜腻腥臭！你鼻翼微动，立刻屏住呼吸，反手拔剑护在丹炉之前！'),
      N('“啪嚓”一声轻响，高窗木格无声融化成黑水，两道身披灰紫斗篷的鬼魅黑影顺着风雪悄无声息滑入方寸丹室！'),
    ],
    onFinishEffects: [openScene('scene_hss05_06', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_06: {
    id: 'scene_hss05_06',
    title: '第六幕 · 星宿盗丹',
    subtitle: '东峰丹房内',
    mandatory: true,
    beats: [
      N('来人面色青白、指节泛着幽绿毒光，腰间挂着西域星宿海特有的青铜毒铃！为首枯瘦汉子「腐骨手」阴九狞笑一声，左手托着一只盛满黑绿色腐毒的瓷瓶，直朝紫铜丹炉扑来！'),
      S(SPEAKER_XINGXIU_2, '“嘿嘿！方才我们在东崖放了声响把高沧云引走了，这丹房里果真只剩你一个毛头小子！碧磷师弟，先毙了这华山娃子，抢走紫阳宝丹，再把这瓶化尸毒水倒进炉里毁了华山丹基！”'),
      S(SPEAKER_XINGXIU_1, '（尖声怪笑，抖手甩出数枚幽绿毒蒺藜）“遵命，阴九师兄！看小爷先毒瞎这牛鼻子的招子！”'),
      P('（青钢剑挽出凛冽剑花将毒蒺藜尽数磕落，左掌隐现浑厚纯阳掌力）“西域星宿妖人竟敢闯我西岳丹房！今日有我在，你们休想碰丹炉半寸！”'),
    ],
    onFinishEffects: [openScene('scene_hss05_07', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_07: {
    id: 'scene_hss05_07',
    title: '第七幕 · 护炉斩毒',
    subtitle: '方寸丹室（车轮连战 实战）',
    illustrationUrl: '/assets/quests/hs_side05_poison_raid.jpg',
    illustrationCaption: '护炉斩毒 · 方寸丹室以养吾剑与混元掌力毙星宿盗药二恶徒',
    mandatory: true,
    beats: [
      N('丹室狭小，身后三尺便是即将成丹的紫铜八卦炉，绝容不得半点毒烟侵染！你丹田紫气鼓荡，右手《养吾剑法》浩然凌厉，左手《华山混元掌》刚猛雄浑，迎向两名星宿派毒功恶徒！'),
    ],
    choices: [
      {
        id: 'hss05_fight_xingxiu',
        label: '死守紫阳丹炉，以养吾剑与混元掌力毙星宿二恶徒！（车轮连战 生死战）',
        subLabel: '对手：二流上品阴九与二流中品碧磷童子',
        tone: 'danger',
        effects: [
          {
            type: 'startCombat',
            format: 'gauntlet',
            questId: HUASHAN_SIDE05_QUEST_ID,
            opponent: { kind: 'custom', npc: buildXingxiuRaider2() },
            extraOpponents: [{ kind: 'custom', npc: buildXingxiuRaider1() }],
            rule: 'duel',
            lethalOnLose: true,
            forbidEscapeReason: '身后便是三日心血炼就的太岳紫阳丹炉，一步不可退！',
            deathTitle: '丹房殉道',
            deathDetail: '你在东峰丹房力战星宿派盗药二恶徒不敌，中腐骨剧毒而亡。',
            introText: '【车轮连战 · 护炉斩毒】于方寸丹室迎战星宿派恶徒【腐骨手 · 阴九】与【碧磷童子】！',
            onWin: [openScene('scene_hss05_08', HUASHAN_SIDE05_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_hss05_08: {
    id: 'scene_hss05_08',
    title: '第八幕 · 纯阳破邪',
    subtitle: '东峰丹房石室',
    mandatory: true,
    beats: [
      N('星宿派阴毒掌力虽狠辣刁钻，却最忌华山气宗堂堂正正的纯阳内劲！你在方寸之间步法如磐，先以一式《养吾剑法》洞穿碧磷童子咽喉，顺势反手一记饱含丹炉紫气的《华山混元掌》正中阴九胸口膻中穴！'),
      S(SPEAKER_XINGXIU_2, '（口吐黑血倒飞撞碎石案，腐毒瓷瓶脱手摔落却被你凌空以剑鞘扫出窗外雪地）“好……好霸道的华山纯阳内劲……星宿老仙不会放过你们……”'),
      N('两名星宿恶徒双双伏诛。你顾不得喘息，立刻回身盘膝稳住略微晃动的炉火，以纯阳真气将丹室残余毒瘴尽数逼散出窗。'),
    ],
    onFinishEffects: [openScene('scene_hss05_09', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_09: {
    id: 'scene_hss05_09',
    title: '第九幕 · 晓日丹成',
    subtitle: '东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('东方既白，一轮朝阳破雪而出，万丈紫气映照玉女东峰！丹房木门猛地推开，高沧云与闻讯赶来的掌门「太岳真君」岳沧溟疾步入室。'),
      N('见地上两名星宿毒徒尸身与安然无恙、紫霞满室的八卦丹炉，高沧云面露愧色又满怀欣慰，深深向你作了一揖。'),
      S('NPC-0202', '“{gender:师弟|师妹}受惊了！为兄中了星宿妖人的调虎离山之计，险些酿成大祸！{ifFlag:hs_gao_estranged|先前渭南旧事是为兄气量狭隘错怪了你，今夜你仍不计前嫌死守丹室、力毙二贼，这份大义沧云铭记于心|若非你内息纯正、孤身死守方寸丹室力毙二贼，这炉太岳紫阳丹便毁于一旦了}！”'),
      S('NPC-0118', '（揭开炉盖，只见九枚龙眼大小、晶莹温润的紫阳宝丹静卧炉心，满室生香，抚须大笑）“善哉！临危不乱、护炉斩毒，且炉火丝毫未散，足见我华山气宗后继有人！”'),
    ],
    onFinishEffects: [openScene('scene_hss05_10', HUASHAN_SIDE05_QUEST_ID)],
  },

  scene_hss05_10: {
    id: 'scene_hss05_10',
    title: '第十幕 · 紫雪嘉勉',
    subtitle: '东峰紫气迎曦石坪',
    mandatory: true,
    beats: [
      N('岳沧溟自袖中取出两只玉瓶——一瓶为御赐上品「太医局紫雪神丹」，另一瓶乃峨眉故交相赠的「峨眉金顶白云熊胆丸」，亲自交予你手。'),
      S('NPC-0118', '“此番守炉护丹之功，当记头等！这两瓶上品良药与赏银你且收好，经此三夜纯阳温炉与血战破邪，你的内功与养吾剑意定已更上一层楼！”'),
    ],
    choices: [
      {
        id: 'hss05_complete',
        label: '拜谢掌门与大师兄嘉勉，收下珍稀良药（完成气宗支线）',
        tone: 'gold',
        effects: [
          { type: 'giveSilver', amount: 50, reason: '东峰护炉斩毒保丹师门赏银' },
          { type: 'addSectContribution', amount: 65 },
          { type: 'giveCombatExp', amount: 720, reason: '雪夜方寸丹室力毙星宿二毒徒' },
          { type: 'modifyRenown', delta: 15, reason: '华山气宗雪夜护炉斩星宿恶徒' },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0202' }, delta: 15 },
          { type: 'addArtExp', artId: 'MA-160', amount: 320 },
          { type: 'addArtExp', artId: 'MA-147', amount: 260 },
          { type: 'giveItem', itemId: 'ITM-MED-113', qty: 1 },
          { type: 'giveItem', itemId: 'ITM-MED-115', qty: 1 },
          { type: 'completeQuest', questId: HUASHAN_SIDE05_QUEST_ID },
          toast('已完成气宗支线《紫气丹炉 · 朝阳守火记》！获得太医局紫雪神丹与白云熊胆丸！', 'success', '朝阳守火'),
        ],
      },
    ],
  },
}
