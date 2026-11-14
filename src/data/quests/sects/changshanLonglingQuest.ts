import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../itemsDb'

const QUEST_ID = 'QST_SECT22_LONGLING'

function buildHorseMarketGuardsNpc(): NodeNpc {
  return {
    id: 'CUSTOM-CS-WANYAN-SQUAD',
    name: '完颜鹏豪（携暗桩护卫）',
    title: '辽南京马市暗桩头目',
    realm: '三流下品',
    factionId: 'SECT-20',
    factionName: '大辽北院暗桩',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: {
      hp: 390,
      mp: 150,
      agi: 42,
      res: 15,
      isBenchmark: false,
    },
    talents: { bone: 50, comprehension: 40, charm: 32 },
    fullLocationLabel: '析津府 > 燕京榷马大市 > 塞北千驷相马围栏',
    equippedArts: {
      neigong: 'MA-232',
      qinggong: null,
      move1: 'MA-151',
      move2: null,
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-232', level: 2, exp: 0 },
      { artId: 'MA-151', level: 2, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-076',
    },
    questBadgeLabel: '马市暗桩',
    talk: '“这两个马贩口音透着定州味儿，身上倒还藏着铁器！拿下问个明白！”',
  }
}

function buildXiaoYuanfengMarshalNpc(): NodeNpc {
  return {
    id: 'CUSTOM-CS-XIAO-MARSHAL',
    name: '萧远风',
    title: '辽南京武林统制 · 燕云铁枪',
    realm: '一流中品',
    factionId: 'ORG-06',
    factionName: '辽南京兵马元帅府',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: {
      hp: 3229,
      mp: 2991,
      agi: 78,
      res: 64,
      isBenchmark: true,
    },
    talents: { bone: 85, comprehension: 78, charm: 65 },
    fullLocationLabel: '析津府 > 辽南京兵马元帅府',
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-157',
      move1: 'MA-133',
      move2: 'MA-152',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 6, exp: 0 },
      { artId: 'MA-157', level: 5, exp: 0 },
      { artId: 'MA-133', level: 6, exp: 0 },
      { artId: 'MA-152', level: 5, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-075',
    },
    questBadgeLabel: '燕云铁枪',
    talk: '“好胆的南朝刺客！敢焚本帅《南牧山川策》，且看你接得住我几记铁枪！”',
  }
}

function buildIronForestCenturionNpc(): NodeNpc {
  return {
    id: 'CUSTOM-CS-CENTURION',
    name: '辽军铁林百夫长',
    title: '大辽北院精锐铁骑',
    realm: '二流下品',
    factionId: 'ORG-06',
    factionName: '契丹铁林军',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: {
      hp: 1050,
      mp: 620,
      agi: 58,
      res: 32,
      isBenchmark: false,
    },
    talents: { bone: 68, comprehension: 48, charm: 35 },
    fullLocationLabel: '雁门关 > 雁门关外乱石绝壁',
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-157',
      move1: 'MA-152',
      move2: 'MA-151',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 4, exp: 0 },
      { artId: 'MA-157', level: 3, exp: 0 },
      { artId: 'MA-152', level: 4, exp: 0 },
      { artId: 'MA-151', level: 4, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-075',
    },
    questBadgeLabel: '铁林截杀',
    talk: '“绝壁在前，尔等南蛮插翅难飞！留下性命来！”',
  }
}

function buildXiaoYuanfengWoundedNpc(): NodeNpc {
  return {
    id: 'CUSTOM-CS-XIAO-WOUNDED',
    name: '萧远风（急追力疲）',
    title: '辽南京武林统制 · 燕云铁枪',
    realm: '一流中品',
    factionId: 'ORG-06',
    factionName: '辽南京兵马元帅府',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    stats: {
      hp: 1600,
      mp: 1800,
      agi: 74,
      res: 56,
      isBenchmark: true,
    },
    talents: { bone: 85, comprehension: 78, charm: 65 },
    fullLocationLabel: '雁门关 > 雁门关外乱石绝壁',
    equippedArts: {
      neigong: 'MA-140',
      qinggong: 'MA-157',
      move1: 'MA-133',
      move2: 'MA-152',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-140', level: 5, exp: 0 },
      { artId: 'MA-157', level: 4, exp: 0 },
      { artId: 'MA-133', level: 5, exp: 0 },
      { artId: 'MA-152', level: 4, exp: 0 },
    ],
    equipped: {
      ...DEFAULT_EQUIPPED_SLOTS,
      weapon: 'WPN-075',
    },
    questBadgeLabel: '死保遗老',
    talk: '“好个不肯舍弃幽州流民的常山小子！本帅今日倒要看看，你的枪能不能挡住铁林三百骑！”',
  }
}

const PREREQ_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-22', minRank: 2 },
    {
      type: 'any',
      hint: '需已习得《杨氏梨花枪》或《六合大枪》任意一门 ≥ 第 3 重',
      conditions: [
        { type: 'learnedArtAtLeast', artId: 'MA-174', minLevel: 3 },
        { type: 'learnedArtAtLeast', artId: 'MA-116', minLevel: 3 },
      ],
    },
    { type: 'questStatus', questId: QUEST_ID, status: 'not_started' },
    { type: 'questStatus', questId: QUEST_ID, status: 'not_completed' },
  ],
}

const OPENING_EFFECTS: QuestEffect[] = [
  {
    type: 'openScene',
    scene: {
      id: 'scene_cs_longling_opening',
      title: '第一幕 · 龙胆血书',
      subtitle: '真定府 · 常山演武堂 > 常山龙胆枪脉宗祠正堂',
      beats: [
        {
          speaker: { kind: 'narrator' },
          text: '皇祐二年的冬末，真定府夜雨寒冽，砸在常山演武堂的青瓦上发出密匝匝的冷响。山门早早落了双闩，唯有宗祠正堂内两盏牛油巨烛摇曳着昏黄的光影，将赵顺平侯牌位照得肃穆森严。',
        },
        {
          speaker: { kind: 'narrator' },
          text: '掌门赵括苍（NPC-0185）按剑端坐太师椅，面色沉凝如铁；左侧立着真定路边军都监郭逵（NPC-0036），玄甲未卸，肩头还沾着未干的雨珠；右侧则是演武首座凌寒（NPC-0345），手中托着一块紫檀木盘。',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0345' },
          text: '“师弟且看。今日午后，我在宋辽边境榷场扣下一匹走私契丹骏马。马贩子嘴硬，我却从他那副双层驼革马鞍的夹层里，拆出这枚幽州悯忠寺铜牌——还有这半张浸透干血的麻布。”',
        },
        {
          speaker: { kind: 'narrator' },
          text: '凌寒揭开油纸，铜牌背面刻着唐代悯忠寺的莲花暗纹，麻布上八个字铁画银钩，却因写字之人指力衰竭而末尾拖出一道长长的血痕：「南牧图成，速毁于燕。」',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0036' },
          text: '“不瞒你与赵掌门，定州与真定府的细作营早有耳目报称：辽南京武林统制萧远风（NPC-0184）近两年遍访燕云山川、暗中测绘我河北塘泺水网与真定府城防虚实，已绘成一卷《南牧山川策》。”',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0036' },
          text: '“秋高马肥之日，辽骑若按此图南下直扑白沟河，真定与河朔数州危矣！只是朝廷尚守澶渊旧盟，官军一卒不可北渡拒马河。此事须得由江湖人乔装潜入析津府，赶在秋前将正本焚毁！”',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '“你入我常山内堂以来，昼夜苦练龙胆枪意，筋骨已堪大任。今夜便由你接下这枚【悯忠寺血迹铜牌】，随郭都监先赴真定府都部署衙密见韩琦韩安抚使。”',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '“切记！出得真定北门，你我再无师徒名分。此行不得暴露大宋官身，亦不可亮常山枪派旗号——白沟寒星之下，万事唯『无名』二字！”',
        },
      ],
      onFinishEffects: [
        {
          type: 'startQuest',
          questId: QUEST_ID,
          stepId: 'meet_hanqi',
        },
        { type: 'giveItem', itemId: 'ITM-MSC-010', qty: 1 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0185' }, delta: 5 },
        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0345' }, delta: 5 },
        {
          type: 'toast',
          text: '已接取常山枪派内堂传承《白沟寒星·幽州无名卷》，获【悯忠寺血迹铜牌】×1！',
          tone: 'success',
          logTag: '常山传承',
        },
      ],
    },
  },
]

const MINZHONG_AFTER_EFFECTS: QuestEffect[] = [
  {
    type: 'setQuestStep',
    questId: QUEST_ID,
    stepId: 'marshal_burn_map',
  },
  {
    type: 'toast',
    text: '已取得《南牧山川策》副本！下一步潜入【辽南京兵马元帅府】焚毁正本。',
    tone: 'success',
    logTag: '白沟寒星',
  },
]

const MARSHAL_XIAO_COMBAT_EFFECTS: QuestEffect[] = [
  {
    type: 'startCombat',
    questId: QUEST_ID,
    opponent: { kind: 'custom', npc: buildXiaoYuanfengMarshalNpc() },
    rule: 'survive_rounds',
    maxRounds: 4,
    forbidEscapeReason: '元帅府重围之下退无可退，须撑过四回合待郭逵掷烟幕弹接应！',
    introText:
      '火光冲天，辽南京武林统制【萧远风】持铁枪破门而入！只需支撑 4 回合不败，郭逵便会掷出烟幕弹接应撤退！',
    onWin: [
      { type: 'addArtExp', amount: 1200 },
      { type: 'modifyBaseStat', key: 'agility', delta: 4 },
      { type: 'modifyBaseStat', key: 'res', delta: 3 },
      { type: 'modifyBaseStat', key: 'maxHp', delta: 25 },
      {
        type: 'openScene',
        scene: {
          id: 'scene_cs_marshal_escape',
          title: '烟幕脱身 · 奔赴雁门',
          subtitle: '辽南京兵马元帅府外',
          beats: [
            {
              speaker: { kind: 'narrator' },
              text: '四合硬撼，你的虎口已被震裂，鲜血顺着枪杆滴落青砖，而萧远风（NPC-0184）的镔铁长枪却愈发沉重如山。正值危殆之际，元帅府东侧马厩轰然炸起冲天火柱！',
            },
            {
              speaker: { kind: 'narrator' },
              text: '窗棂破响，三枚裹着硫磺硝石的霹雳烟幕弹凌空飞入签押房！浓黑刺鼻的烟雾瞬间吞没了烛火与萧远风凌厉的眼神。',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0184' },
              text: '“南蛮鼠辈，竟敢烧我《南牧山川策》正本！传令铁林骑封锁四门——就算追到桑干河、雁门关，本统制也要把你们碎尸万段！”',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0036' },
              text: '（郭逵一把扯住你的臂膀翻出矮墙，牵过两匹早已备好的乌骓快马）“正本已化飞灰，副本在我贴身夹袄里！幽州东门已被封死，随我西折直奔雁门关！”',
            },
            {
              speaker: { kind: 'player' },
              text: '“萧远风枪法如狂澜，绝非寻常辽将……郭都监先走，若他率铁骑追至雁门关外，我们便在乱石绝壁间再分生死！”',
            },
          ],
          onFinishEffects: [
            {
              type: 'setQuestStep',
              questId: QUEST_ID,
              stepId: 'yanmen_cliff',
            },
            {
              type: 'teleportPlayer',
              regionId: 'yanmenguan',
              buildingId: 'ym_cliff',
            },
          ],
        },
      },
    ],
    onLose: [
      { type: 'healPlayer', hpPct: 20, mpPct: 20 },
      {
        type: 'openScene',
        scene: {
          id: 'scene_cs_marshal_lose',
          title: '铁枪震退 · 暂避幽州巷陌',
          subtitle: '辽南京兵马元帅府外',
          beats: [
            {
              speaker: { kind: 'narrator' },
              text: '萧远风一记「铁骑踏冰」横扫千军，将你震飞撞破窗棂！幸好郭逵在院外连发袖箭逼退追兵，架着你滚入暗巷脱身。',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0036' },
              text: '“一流中品的高手果然非同小可！此人枪势极沉，切莫与其正面硬拼力气，只需守住门户撑过四合，待我烟幕一响便走。先调息养伤，我们再杀回去！”',
            },
          ],
        },
      },
    ],
  },
]

const CLIFF_WIN_A_EFFECTS: QuestEffect[] = [
  { type: 'addArtExp', amount: 1800 },
  { type: 'modifyBaseStat', key: 'maxHp', delta: 35 },
  { type: 'modifyBaseStat', key: 'maxMp', delta: 40 },
  { type: 'modifyBaseStat', key: 'agility', delta: 4 },
  { type: 'modifyRenown', delta: 20, reason: '雁门关外退敌保图' },
  { type: 'modifyChivalry', delta: 50, reason: '孤身断后护送密图' },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 15 },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0635' }, delta: 20 },
  {
    type: 'setQuestStep',
    questId: QUEST_ID,
    stepId: 'guanyin_burn_names',
  },
  {
    type: 'openScene',
    scene: {
      id: 'scene_cs_cliff_win_a',
      title: '绝壁破围 · 银枪映雪',
      subtitle: '雁门关外乱石绝壁',
      beats: [
        {
          speaker: { kind: 'narrator' },
          text: '你孤身立于两块丈余高的风化巨石之间，手中长枪舞成一团银雾，将辽军铁林百夫长与游骑精锐死死挡在狭口之外。寒风卷着雪沫割面如刀，甲衣早已结满冰霜。',
        },
        {
          speaker: { kind: 'narrator' },
          text: '激战正酣之际，雁门雄关内忽然响起一阵龙吟般的马嘶！关门洞开，一队玄甲银枪骑如怒涛般奔涌而出——正是掌门赵括苍（NPC-0185）亲率副掌门白烈山（NPC-0635）与常山精锐杀出关外接应！',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0635' },
          text: '“师侄莫慌，常山弟子在此！契丹狗贼，且尝尝我常山龙胆连环枪！”',
        },
        {
          speaker: { kind: 'narrator' },
          text: '内外夹击之下，辽军铁林骑阵脚大乱，丢下十余具尸首仓皇北遁。萧远风见大势已去，只得勒马驻足于十里外雪坡，遥遥朝你抱拳冷哼一声，调转马头消失在风雪之中。',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '“干得好！郭都监已携《南牧山川策》副本与南院暗桩名录安全入关。此地不宜久留，我等立刻拔营南返真定府，赴隆兴大佛寺向韩安抚使复命！”',
        },
      ],
    },
  },
]

const CLIFF_WIN_B_EFFECTS: QuestEffect[] = [
  { type: 'addArtExp', amount: 2600 },
  { type: 'modifyBaseStat', key: 'maxHp', delta: 50 },
  { type: 'modifyBaseStat', key: 'maxMp', delta: 60 },
  { type: 'modifyBaseStat', key: 'agility', delta: 6 },
  { type: 'modifyBaseStat', key: 'res', delta: 5 },
  { type: 'modifyRenown', delta: 20, reason: '绝壁力撼辽将萧远风' },
  { type: 'modifyChivalry', delta: 100, reason: '背水死战全员护送燕云遗老' },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0185' }, delta: 25 },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 20 },
  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0635' }, delta: 25 },
  {
    type: 'setQuestStep',
    questId: QUEST_ID,
    stepId: 'guanyin_burn_names',
  },
  {
    type: 'openScene',
    scene: {
      id: 'scene_cs_cliff_win_b',
      title: '义字当头 · 独撑四合',
      subtitle: '雁门关外乱石绝壁 > 镇边李牧武安君祠',
      beats: [
        {
          speaker: { kind: 'narrator' },
          text: '百余名须发皆白的幽州遗老相互搀扶着，深一脚浅一脚地在齐膝积雪中向李牧祠挪动。盲眼老僧将那卷《南牧山川策》副本死死抱在怀里，一步三回头。',
        },
        {
          speaker: { kind: 'narrator' },
          text: '而你独自一人横枪立在绝壁窄口，面对盛怒追至的萧远风（NPC-0184）与辽军铁林百夫长！每一次铁枪相交都似炸响惊雷，虎口鲜血顺着冻僵的腕骨凝成冰柱，你却如生根磐石般一步不退！',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0184' },
          text: '“好一个狂徒！为了这群百年遗老，竟敢以残躯硬撼我辽南京铁枪四合而不倒——你究竟是赵氏哪一脉的传人？”',
        },
        {
          speaker: { kind: 'player' },
          text: '“无名小卒，大宋常山一枪客罢了！背后是百年不改汉家衣冠的父老，今日便是死，也不教胡骑跨过这半步！”',
        },
        {
          speaker: { kind: 'narrator' },
          text: '就在第四合枪尖将将抵住你咽喉的刹那，最后一名白发老者终于踉跄跨入镇边李牧武安君祠门槛！关内杀声震天，赵括苍（NPC-0185）与白烈山（NPC-0635）率常山精锐怒马冲出，生生将萧远风逼退三丈！',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '（赵括苍勒马扶住摇摇欲坠的你，眼眶微红）“好一个常山义士！今日你不仅保住了燕云密报，更保住了百余名不肯剃发易服的汉家遗老！这等骨气，足令天下英雄汗颜！”',
        },
      ],
    },
  },
]

export const CHANGSHAN_LONGLING_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '白沟寒星 · 幽州无名卷',
    category: 'sect_mission',
    factionId: 'SECT-22',
    regionId: 'zhending',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流下品',
    recommendedNote:
      '第二幕需撑过一流中品【萧远风】4 回合，第三幕需决战二流下品辽军百夫长（路线 B 需死战半血萧远风 4 回合），建议至少【二流上品】再行启程。',
    startHint:
      '常山枪派第 2 阶「内堂枪士」且习得《杨氏梨花枪》或《六合大枪》≥ 3 重后，前往真定府【常山演武堂 > 常山龙胆枪脉宗祠正堂】触发。',
    startLocation: {
      regionId: 'zhending',
      buildingId: 'zd_spear',
      spotId: 'zd_sp_hall',
      customLabel: '真定府 · 常山龙胆枪脉宗祠正堂',
    },
    summary:
      '真定府榷场惊现幽州悯忠寺血迹铜牌与「南牧图成，速毁于燕」血书。常山枪派内堂弟子奉掌门赵括苍与韩琦密命，随郭逵隐姓埋名潜入辽南京析津府，焚毁《南牧山川策》并护图杀出雁门关。',
    initialStepId: 'meet_hanqi',
    steps: {
      meet_hanqi: {
        id: 'meet_hanqi',
        title: '第一幕 · 密见韩琦（可选：榷场查账）',
        objective:
          '可先赴【宋辽边境榷场 > 榷场平准司衡算官署】与凌寒核查走私马商账册（算术 ≥ 45），随后前往【真定府都部署衙】密见韩琦（NPC-0011）。',
        nextHint: '可选先赴榷场平准司查账，随后赴【真定府都部署衙】密见韩琦',
        targetLocation: {
          regionId: 'zhending',
          buildingId: 'zhending_base_yamen',
          customLabel: '真定府 · 真定府都部署衙',
        },
      },
      yanjing_horse_market: {
        id: 'yanjing_horse_market',
        title: '第二幕 · 燕京马市盘查',
        objective:
          '随郭逵乔装马商北上析津府，前往【燕京榷马大市 > 塞北千驷相马围栏】应对辽国暗桩完颜鹏豪（NPC-0767）盘查。',
        nextHint: '前往析津府【燕京榷马大市 > 塞北千驷相马围栏】应对盘查',
        targetLocation: {
          regionId: 'xijin_liao',
          buildingId: 'xj_horse',
          spotId: 'xj_hs_corrals',
          customLabel: '析津府 · 塞北千驷相马围栏',
        },
      },
      minzhong_temple: {
        id: 'minzhong_temple',
        title: '第二幕 · 幽州悯忠寺（可选：义勇拳馆）',
        objective:
          '可先赴【燕云遗民义勇拳馆】凭暗语拜会秦乾（NPC-0642）索取《幽州夜禁换防图》，随后前往【幽州悯忠寺 > 修竹后院议事禅堂】拜会燕云遗老取《南牧山川策》副本。',
        nextHint: '可选先赴义勇拳馆访秦乾取换防图，再赴【幽州悯忠寺 > 修竹后院议事禅堂】取密图副本',
        targetLocation: {
          regionId: 'xijin_liao',
          buildingId: 'xj_minzhong',
          spotId: 'xj_mz_zen',
          customLabel: '析津府 · 幽州悯忠寺 > 修竹后院议事禅堂',
        },
      },
      marshal_burn_map: {
        id: 'marshal_burn_map',
        title: '第二幕 · 元帅府焚图与突围',
        objective:
          '郭逵已在东侧马厩纵火引敌，速潜入【辽南京兵马元帅府 > 萧氏元帅正殿与金狼大帐】焚毁《南牧山川策》正本，并接住萧远风四合铁枪突围！',
        nextHint: '潜入【辽南京兵马元帅府 > 萧氏元帅正殿与金狼大帐】焚毁正本并撑过萧远风 4 回合突围',
        targetLocation: {
          regionId: 'xijin_liao',
          buildingId: 'xj_marshal',
          spotId: 'xj_ms_command',
          customLabel: '析津府 · 萧氏元帅正殿与金狼大帐',
        },
      },
      yanmen_cliff: {
        id: 'yanmen_cliff',
        title: '第三幕 · 乱石绝壁死战',
        objective:
          '西折逃至【雁门关外乱石绝壁】，可先于【绝壁石刻 · 剑痕崖】参悟绝壁枪痕（悟性 ≥ 65 或书 ≥ 55），再于【幽谷石室 · 寒玉榻】择路线迎战萧远风与辽军铁林精锐！',
        nextHint: '前往【雁门关外乱石绝壁 > 幽谷石室 · 寒玉榻】，迎战追兵杀入关内',
        targetLocation: {
          regionId: 'yanmenguan',
          buildingId: 'ym_cliff',
          spotId: 'ym_cliff_main',
          customLabel: '雁门关 · 乱石绝壁 > 幽谷石室 · 寒玉榻',
        },
      },
      guanyin_burn_names: {
        id: 'guanyin_burn_names',
        title: '第四幕 · 观音阁焚名',
        objective:
          '返回真定府【隆兴大佛寺 > 大悲千手观音三层宝阁】，面见韩琦焚毁行动名录、领取官家密赏。',
        nextHint: '返回真定府【隆兴大佛寺 > 大悲千手观音三层宝阁】复命',
        targetLocation: {
          regionId: 'zhending',
          buildingId: 'zd_longxing',
          spotId: 'zd_lx_guanyin',
          customLabel: '真定府 · 大悲千手观音三层宝阁',
        },
      },
      ancestral_hall_confer: {
        id: 'ancestral_hall_confer',
        title: '第四幕 · 宗祠授枪授谱',
        objective:
          '归返【常山演武堂 > 常山龙胆枪脉宗祠正堂】，于赵顺平侯牌位前受领《常山龙胆枪》、亮银枪与联合举荐信！',
        nextHint: '前往【常山龙胆枪脉宗祠正堂】受领镇派绝学与神兵',
        targetLocation: {
          regionId: 'zhending',
          buildingId: 'zd_spear',
          spotId: 'zd_sp_hall',
          customLabel: '真定府 · 常山龙胆枪脉宗祠正堂',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_cs_longling_opening',
        regionId: 'zhending',
        buildingId: 'zd_spear',
        spotId: 'zd_sp_hall',
        onceFlag: 'cs_longling_opening_seen',
        condition: PREREQ_CONDITION,
        effects: OPENING_EFFECTS,
      },
    ],

    npcActions: [
      {
        id: 'act_cs_longling_start_npc',
        label: '奉召密议「幽州血书」',
        badge: '常山传承',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0345', 'NPC-0185'] },
            PREREQ_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'cs_longling_opening_seen', value: true },
          ...OPENING_EFFECTS,
        ],
      },
      {
        id: 'act_cs_meet_hanqi',
        label: '密呈《悯忠寺血迹铜牌》',
        badge: '白沟寒星',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0011'] },
            {
              type: 'questStatus',
              questId: QUEST_ID,
              status: 'active',
              stepId: 'meet_hanqi',
            },
          ],
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_hanqi_briefing',
              title: '节点 1-3 · 密见韩琦',
              subtitle: '真定府都部署衙',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '真定府都部署衙后堂屏退了所有亲随与书吏，唯余案头一卷摊开的《河北塘泺舆图》与半盏冷茶。韩琦（NPC-0011）身着青衫常服，眉宇间却透着经略西北、镇抚河朔的铁血威仪。',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '他接过你呈上的【悯忠寺血迹铜牌】，指腹在「南牧图成，速毁于燕」八字上缓缓摩挲良久，方才抬眼望向你与郭逵。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“景德元年澶渊定盟，至今四十六载，朝野方得休养生息。此盟不可轻破——纵使明知萧远风在幽州磨刀霍霍，大宋官军亦绝不可先越白沟河半步。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“故而本帅有言在先：此去析津府焚毁《南牧山川策》，若能成功，功劳簿上不会有你的名字；若不幸事败被擒，朝廷与真定府皆不会认账，只会依律以『私越边关流寇』论处！你可还敢往？”',
                },
              ],
              choices: [
                {
                  id: 'choice_hanqi_bold',
                  label: '【忠胆表态】顺平侯当年一身是胆，常山弟子岂惜此身？晚辈愿往！',
                  subLabel: '韩琦好感 +10、郭逵好感 +5、纹银 +50 两、江湖侠义 +20',
                  tone: 'primary',
                  effects: [
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 10 },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                    { type: 'giveSilver', amount: 50, reason: '韩琦私库盘缠' },
                    { type: 'modifyChivalry', delta: 20, reason: '常山忠胆赴燕云' },
                    {
                      type: 'setQuestStep',
                      questId: QUEST_ID,
                      stepId: 'yanjing_horse_market',
                    },
                    {
                      type: 'openScene',
                      scene: {
                        id: 'scene_cs_hanqi_bold_reply',
                        title: '无名赴义 · 韩琦赠银',
                        subtitle: '真定府都部署衙',
                        beats: [
                          {
                            speaker: { kind: 'npc', npcId: 'NPC-0011' },
                            text: '“好一个『常山弟子岂惜此身』！昔年赵子龙单骑救主，今日你孤身入燕——取我私库五十两散碎纹银作盘缠，切记不可用官银锭！”',
                          },
                          {
                            speaker: { kind: 'npc', npcId: 'NPC-0036' },
                            text: '“安抚使放心，末将已备好定州马贩的文书与两匹塞外骒马。明日五更出北门，直奔析津府燕京榷马大市！”',
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  id: 'choice_hanqi_pragmatic',
                  label: '【沉稳务实】既为守土安民，功名何足挂齿。请安抚使示下。',
                  subLabel: '韩琦好感 +5、郭逵好感 +10、纹银 +50 两、策论 +3、江湖声望 +15',
                  tone: 'jade',
                  effects: [
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 5 },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 10 },
                    { type: 'giveSilver', amount: 50, reason: '韩琦私库盘缠' },
                    { type: 'modifySkill', key: '策论', delta: 3 },
                    { type: 'modifyRenown', delta: 15, reason: '沉稳受命定州幕府' },
                    {
                      type: 'setQuestStep',
                      questId: QUEST_ID,
                      stepId: 'yanjing_horse_market',
                    },
                    {
                      type: 'openScene',
                      scene: {
                        id: 'scene_cs_hanqi_pragmatic_reply',
                        title: '沉稳受命 · 密议北行',
                        subtitle: '真定府都部署衙',
                        beats: [
                          {
                            speaker: { kind: 'npc', npcId: 'NPC-0011' },
                            text: '“不骄不躁，深明朝堂权衡之道。有你在郭都监身侧谋划，本帅亦能少悬半颗心。这五十两私库散银你且收下。”',
                          },
                          {
                            speaker: { kind: 'npc', npcId: 'NPC-0036' },
                            text: '“好！临机应变最重冷静，我等乔装马商北上析津府，第一步便是闯过燕京榷马大市的辽人盘查！”',
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: 'act_cs_qinqian_secret',
        label: '对暗语索取《幽州夜禁换防图》',
        badge: '八极暗桩',
        tone: 'jade',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0642'] },
            { type: 'questStatus', questId: QUEST_ID, status: 'active' },
            { type: 'flag', flag: 'cs_longling_qinqian_done', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'cs_longling_qinqian_done', value: true },
          { type: 'giveItem', itemId: 'ITM-MSC-012', qty: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0642' }, delta: 15 },
          { type: 'addFlagNumber', flag: 'sect_relation_SECT-23', delta: 10 },
          { type: 'modifyRenown', delta: 20, reason: '联络燕云义勇暗桩' },
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_qinqian_secret',
              title: '节点 2-2 · 义勇拳馆暗桩',
              subtitle: '析津府 · 燕云遗民义勇拳馆',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '拳馆后院木桩林立，几个汉家少年正在寒风中默默扎马练拳。你扣响门环三长两短，低声吐出沧州八极门暗语：「铁锁横江，白沟饮马。」',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0642' },
                  text: '（秦乾手腕一抖，将手中齐眉短棍收于身后，眼神瞬间锐利如鹰，旋即化作久别重逢的激昂）“真是从真定来的同道！我在这幽州城潜伏八年，还以为关内早已忘了咱们！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0642' },
                  text: '“萧远风的兵马元帅府戒备森严，三步一暗哨。这是我这半年冒死摸清的【幽州夜禁换防图】，子时三刻东侧角门换防有一炷香的空档——拿着它，务必把那张害人的南牧图烧成灰！”',
                },
              ],
            },
          },
        ],
      },
    ],

    spotActions: [
      // 节点 1-2：榷场查账（可选）
      {
        id: 'spot_cs_market_audit',
        label: '核查走私马商账册（算术 ≥ 45）',
        badge: '可选查账',
        subtitle: '若识破私货暗账，可得【幽燕马市通行暗记】与算术 +3',
        tone: 'jade',
        regionId: 'zhending',
        buildingId: 'zd_market',
        spotId: 'zd_mk_office',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'meet_hanqi' },
            { type: 'flag', flag: 'cs_longling_audit_tried', op: 'falsy' },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'cs_longling_audit_tried', value: true },
          {
            type: 'branch',
            condition: { type: 'skillAtLeast', key: '算术', min: 45 },
            thenEffects: [
              { type: 'giveItem', itemId: 'ITM-MSC-011', qty: 1 },
              { type: 'modifySkill', key: '算术', delta: 3 },
              { type: 'modifyRenown', delta: 15, reason: '榷场查账识破私马暗账' },
              { type: 'addArtExp', amount: 200 },
              {
                type: 'openScene',
                scene: {
                  id: 'scene_cs_market_audit_win',
                  title: '节点 1-2 · 榷场查账',
                  subtitle: '真定府 · 宋辽边境榷场 > 榷场平准司衡算官署',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '衡算官署内堆满了厚如砖块的契丹马市流水账册。凌寒（NPC-0345）将扣下的那批私马票据摊在案上，与你逐行对核草料损耗与税银折算。',
                    },
                    {
                      speaker: { kind: 'player' },
                      text: '“凌师兄且看这七笔『北庭青骡』的税脚——骡价不过八贯，这账上的回扣却按战马二十贯折算！这行暗码正是幽燕马市暗桩的接洽印记！”',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0345' },
                      text: '“好眼力！果然从那马贩子暗格里搜出这枚【幽燕马市通行暗记】。带去析津府，过辽人马市盘查时能省去好大一番口舌！”',
                    },
                  ],
                },
              },
            ],
            elseEffects: [
              {
                type: 'openScene',
                scene: {
                  id: 'scene_cs_market_audit_fail',
                  title: '节点 1-2 · 账海难寻',
                  subtitle: '真定府 · 宋辽边境榷场 > 榷场平准司衡算官署',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '案上契丹文与汉文夹杂的流水账册密密麻麻，虚实难辨。你与凌寒翻检半个时辰，终因算术火候尚浅未能理出暗账头绪。',
                    },
                    {
                      speaker: { kind: 'npc', npcId: 'NPC-0345' },
                      text: '“罢了，既然查不出暗记，北上燕京马市时便只能靠你的口才、相马真本事或是手中长枪硬闯了！万事小心。”',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },

      // 节点 2-1：燕京马市盘查
      {
        id: 'spot_cs_horse_market_check',
        label: '应对辽国暗桩完颜鹏豪盘查',
        badge: '白沟寒星',
        subtitle: '智取伪装（骑术/辩才 ≥ 50，持暗记降至 35）或强闯灭口',
        tone: 'primary',
        regionId: 'xijin_liao',
        buildingId: 'xj_horse',
        spotId: 'xj_hs_corrals',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yanjing_horse_market',
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_horse_market',
              title: '节点 2-1 · 燕京马市盘查',
              subtitle: '析津府 · 燕京榷马大市 > 塞北千驷相马围栏',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '幽州城西的燕京榷马大市人声鼎沸，千余匹来自阴山、松漠的战马在木栅栏内嘶鸣刨蹄，驼铃声与契丹牧人的呼喝混杂在凛冽的北风里。大市四周箭楼高耸，辽南京留守司的游骑每隔半刻便纵马巡行一遭。郭逵（NPC-0036）压低毡帽、披着一件油渍斑斑的羊皮袄牵着两匹骒马在前，你扮作伙计挑着马料担紧随其后，长枪早已拆成三段暗藏在草料捆中。',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '刚入千驷相马围栏，一队佩刀辽卒忽然横矛拦住去路。为首的辽国暗桩完颜鹏豪（NPC-0767）身着半旧皮甲，鹰目如电地扫过马群，手中牛皮马鞭直指你牵着的枣红骒马，冷笑一声逼近半步。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0767' },
                  text: '“慢着！这批骒马的牙口与烙印不对劲——河北官马才会剪去左耳一寸！你们两个定州口音的马贩到底从哪条道摸进燕京的？把路引、牙行票据和马籍勘合统统拿出来！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0036' },
                  text: '（郭逵不动声色地将手按在腰间马刀柄上，压低嗓音向你递了个眼色）“看你了：若能凭行话与马市暗记骗过这厮最好；若露了马脚，便趁巡骑未至，就在草料垛后干脆利落做了他们！”',
                },
              ],
              choices: [
                {
                  id: 'choice_horse_bluff',
                  label: '【智取伪装】按北庭马市行话对答周旋',
                  subLabel: '需 骑术 ≥ 50 或 辩才 ≥ 50（持【幽燕马市通行暗记】降至 ≥ 35）',
                  tone: 'jade',
                  effects: [
                    {
                      type: 'branch',
                      condition: {
                        type: 'any',
                        conditions: [
                          {
                            type: 'all',
                            conditions: [
                              { type: 'hasItem', itemId: 'ITM-MSC-011' },
                              {
                                type: 'any',
                                conditions: [
                                  { type: 'skillAtLeast', key: '骑术', min: 35 },
                                  { type: 'skillAtLeast', key: '辩才', min: 35 },
                                ],
                              },
                            ],
                          },
                          { type: 'skillAtLeast', key: '骑术', min: 50 },
                          { type: 'skillAtLeast', key: '辩才', min: 50 },
                        ],
                      },
                      thenEffects: [
                        {
                          type: 'branch',
                          condition: { type: 'skillAtLeast', key: '骑术', min: 35 },
                          thenEffects: [{ type: 'modifySkill', key: '骑术', delta: 3 }],
                          elseEffects: [{ type: 'modifySkill', key: '辩才', delta: 3 }],
                        },
                        { type: 'addArtExp', amount: 350 },
                        { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                        { type: 'setQuestStep', questId: QUEST_ID, stepId: 'minzhong_temple' },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_cs_horse_bluff_win',
                            title: '机变周旋 · 混入幽州',
                            subtitle: '析津府 · 燕京榷马大市',
                            beats: [
                              {
                                speaker: { kind: 'player' },
                                text: '“官爷好眼力，却看岔了行当！这叫『白沟剪耳青』，专给南院贵人拉车用的。您瞧这马蹄铁的七星钉——不信您去问东角牙行的老胡！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0767' },
                                text: '（完颜鹏豪半信半疑地打量你一番，见你行话纯熟、神色丝毫不乱，终究摆了摆手）“滚进去吧！安分卖完马就走，别在燕京城里乱晃！”',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0036' },
                                text: '（待辽卒走远，郭逵低声赞道）“好险，若非你镇定周旋，咱们此刻已在围栏里动刀了。趁夜色前往幽州悯忠寺！”',
                              },
                            ],
                          },
                        },
                      ],
                      elseEffects: [
                        {
                          type: 'startCombat',
                          questId: QUEST_ID,
                          opponent: { kind: 'custom', npc: buildHorseMarketGuardsNpc() },
                          rule: 'duel',
                          deathTitle: '血染燕京马市',
                          deathDetail: '应对盘查失露破绽，与辽国马市暗桩死战力竭阵亡。',
                          onWin: [
                            { type: 'addArtExp', amount: 600 },
                            { type: 'modifyBaseStat', key: 'maxHp', delta: 15 },
                            { type: 'giveSilver', amount: 35, reason: '缴获辽暗桩银两' },
                            { type: 'setQuestStep', questId: QUEST_ID, stepId: 'minzhong_temple' },
                            {
                              type: 'openScene',
                              scene: {
                                id: 'scene_cs_horse_combat_win',
                                title: '雷霆灭口 · 隐入夜色',
                                subtitle: '析津府 · 燕京榷马大市',
                                beats: [
                                  {
                                    speaker: { kind: 'narrator' },
                                    text: '行话露了破绽，完颜鹏豪眼神骤寒，伸手便往怀里掏骨哨！千钧一发之际，你肩头一抖震散草料捆，长枪短柄如毒龙出洞，抢在他吹哨前点碎其腕骨，数合间将他与两名辽卒尽数劈翻在草料垛后，连半声惊呼都未曾漏出围栏！',
                                  },
                                  {
                                    speaker: { kind: 'npc', npcId: 'NPC-0036' },
                                    text: '“手脚利落！把尸首拖进马槽盖上干草，这三十五两契丹碎银权作盘缠。趁巡城游骑未至，速赴幽州悯忠寺！”',
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'choice_horse_force',
                  label: '【强闯灭口】趁夜色未合，先下手劈翻暗桩！',
                  subLabel: '战完颜鹏豪（三流下品）：胜得熟练度 +600、气血上限 +15、纹银 +35 两',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildHorseMarketGuardsNpc() },
                      rule: 'duel',
                      deathTitle: '血染燕京马市',
                      deathDetail: '强闯燕京马市暗桩失手，喋血塞北围栏。',
                      onWin: [
                        { type: 'addArtExp', amount: 600 },
                        { type: 'modifyBaseStat', key: 'maxHp', delta: 15 },
                        { type: 'giveSilver', amount: 35, reason: '缴获辽暗桩银两' },
                        { type: 'setQuestStep', questId: QUEST_ID, stepId: 'minzhong_temple' },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_cs_horse_force_win',
                            title: '围栏血战 · 夺路而去',
                            subtitle: '析津府 · 燕京榷马大市',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '不等完颜鹏豪拔刀，你已暴喝一声挑飞草料担，长枪连刺三朵寒星！郭逵亦同时掣出腰间短刀横截退路，两人左右合击，转瞬便将三名辽国暗桩格杀于千驷围栏的阴影之中，马群受惊嘶鸣恰好掩盖了兵刃交击之声！',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0036' },
                                text: '“将腰牌与碎银搜走！此地血腥气很快会引来辽军巡骑，不可久留，走西角小巷直赴悯忠寺！”',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 节点 2-3：幽州悯忠寺
      {
        id: 'spot_cs_minzhong_visit',
        label: '行「常山持枪礼」拜会幽州遗老',
        badge: '故国衣冠',
        subtitle: '取得《南牧山川策》副本与接下焚毁正本之托',
        tone: 'gold',
        regionId: 'xijin_liao',
        buildingId: 'xj_minzhong',
        spotId: 'xj_mz_zen',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'minzhong_temple',
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_minzhong_elders',
              title: '节点 2-3 · 幽州悯忠寺',
              subtitle: '析津府 · 幽州悯忠寺',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '千年古刹幽州悯忠寺静卧于寒月之下，唐碑残碣在风中肃立。偏殿掩门之内，十余位须发皆白、却依然身着宽袍大袖汉家旧服的燕云遗老正围炉低语。',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '见你怀中亮出【悯忠寺血迹铜牌】，稳稳行出一记「常山持枪礼」，殿中诸老齐齐起身回礼。为首一位双目失明的老僧颤巍巍走近，伸出布满老茧的手轻轻抚过你的枪杆。',
                },
                {
                  speaker: { kind: 'custom', name: '悯忠寺盲眼老僧', title: '燕云遗老' },
                  text: '“百余年了……自石晋割让燕云十六州，这幽州城里便再未见过真定常山的正统枪礼！那日送出铜牌的义士已遭萧远风毒手，临终前托我将这卷冒死誊抄的《南牧山川策》副本与南院暗桩名录交予你们。”',
                },
                {
                  speaker: { kind: 'custom', name: '悯忠寺盲眼老僧', title: '燕云遗老' },
                  text: '“只是正本仍锁在辽南京兵马元帅府签押房内！若不将正本焚毁，秋后辽军照样南下。但在你们动身之前……老朽代幽州十万不肯忘本的汉家父老问少侠一句：”',
                },
                {
                  speaker: { kind: 'custom', name: '悯忠寺盲眼老僧', title: '燕云遗老' },
                  text: '“大宋官家的王师铁骑……究竟何时，才能再过桑干河啊？”',
                },
              ],
              choices: [
                {
                  id: 'choice_minzhong_vow',
                  label: '【立誓承志】只要常山枪不断，燕云终有归日！',
                  subLabel: '侠义 +30、武学熟练度 +300、获【燕云遗老护身玉佩】（抗性 +5）',
                  tone: 'gold',
                  effects: [
                    { type: 'modifyChivalry', delta: 30, reason: '悯忠寺立誓承志' },
                    { type: 'addArtExp', amount: 300 },
                    { type: 'giveItem', itemId: 'ITM-ACC-001', qty: 1 },
                    ...MINZHONG_AFTER_EFFECTS,
                    {
                      type: 'openScene',
                      scene: {
                        id: 'scene_cs_minzhong_vow_reply',
                        title: '古刹授佩 · 龙胆不绝',
                        subtitle: '析津府 · 幽州悯忠寺',
                        beats: [
                          {
                            speaker: { kind: 'custom', name: '悯忠寺盲眼老僧', title: '燕云遗老' },
                            text: '“好一句『只要常山枪不断，燕云终有归日』！这枚【燕云遗老护身玉佩】随老朽半生，今夜赠予少侠挡灾避邪——去吧，把元帅府那张《南牧山川策》烧成飞灰！”',
                          },
                          {
                            speaker: { kind: 'npc', npcId: 'NPC-0036' },
                            text: '“诸位老丈暂且隐蔽佛龛之后。子时已近，我先赴元帅府东侧马厩备好火油与霹雳烟幕弹，你趁乱潜入签押房！”',
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  id: 'choice_minzhong_escort',
                  label: '【实言相告 · 护送义士】朝廷暂守盟约，若事泄晚辈必护诸位老丈杀出幽州！',
                  subLabel: '侠义 +50、郭逵好感 +5（解锁第三幕【路线 B：全员死保】）',
                  tone: 'primary',
                  effects: [
                    { type: 'modifyChivalry', delta: 50, reason: '悯忠寺许诺死保燕云遗老' },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                    { type: 'setFlag', flag: 'cs_longling_route_b', value: true },
                    ...MINZHONG_AFTER_EFFECTS,
                    {
                      type: 'openScene',
                      scene: {
                        id: 'scene_cs_minzhong_escort_reply',
                        title: '义诺千金 · 暗约西行',
                        subtitle: '析津府 · 幽州悯忠寺',
                        beats: [
                          {
                            speaker: { kind: 'custom', name: '悯忠寺盲眼老僧', title: '燕云遗老' },
                            text: '（盲眼老僧长叹一声，却挺直了脊梁）“少侠肯以实言相告，老朽便知你不是虚言欺世之辈！既如此，我等百余名遗老今晚便收拾行装，若幽州事泄，定于西门外白沟古道候你！”',
                          },
                          {
                            speaker: { kind: 'npc', npcId: 'NPC-0036' },
                            text: '“带百余老弱突围绝非易事，但既已应承，我郭逵也绝不皱眉！走，先去辽南京兵马元帅府烧了正本！”',
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 节点 2-4：元帅府焚图与突围
      {
        id: 'spot_cs_marshal_burn',
        label: '潜入签押房焚毁《南牧山川策》正本',
        badge: '焚图突围',
        subtitle: '持换防图免检定，否则需 经义/书 ≥ 45，随后必战萧远风（撑过 4 回合）',
        tone: 'danger',
        regionId: 'xijin_liao',
        buildingId: 'xj_marshal',
        spotId: 'xj_ms_command',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'marshal_burn_map',
        },
        effects: [
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'hasItem', itemId: 'ITM-MSC-012' },
                { type: 'skillAtLeast', key: '经义', min: 45 },
                { type: 'skillAtLeast', key: '书', min: 45 },
              ],
            },
            thenEffects: [
              {
                type: 'branch',
                condition: { type: 'skillAtLeast', key: '经义', min: 45 },
                thenEffects: [{ type: 'modifySkill', key: '经义', delta: 3 }],
                elseEffects: [{ type: 'modifySkill', key: '书', delta: 3 }],
              },
              { type: 'addArtExp', amount: 500 },
              {
                type: 'toast',
                text: '精准定位并焚毁《南牧山川策》正本！经义/书 +3，武学熟练度 +500。',
                tone: 'success',
                logTag: '元帅府焚图',
              },
              ...MARSHAL_XIAO_COMBAT_EFFECTS,
            ],
            elseEffects: [
              { type: 'healPlayer', hpPct: -12 },
              {
                type: 'toast',
                text: '仓促翻检误触铁铃机关受轻伤（气血 -12%），仍强行抢烧正本！',
                tone: 'warn',
                logTag: '元帅府焚图',
              },
              ...MARSHAL_XIAO_COMBAT_EFFECTS,
            ],
          },
        ],
      },

      // 节点 3-1：绝壁观摩（战前隐藏加成）
      {
        id: 'spot_cs_cliff_insight',
        label: '参悟绝壁前辈枪法刻痕（悟性 ≥ 65 或 书 ≥ 55）',
        badge: '绝壁悟枪',
        subtitle: '触发灵光一现：武学熟练度 +400，身法根基精进',
        tone: 'jade',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_east',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'questStatus', questId: QUEST_ID, status: 'active', stepId: 'yanmen_cliff' },
            { type: 'flag', flag: 'cs_longling_cliff_insight', op: 'falsy' },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'talentAtLeast', key: '悟性', min: 65 },
                { type: 'skillAtLeast', key: '书', min: 55 },
              ],
            },
            thenEffects: [
              { type: 'setFlag', flag: 'cs_longling_cliff_insight', value: true },
              { type: 'addArtExp', amount: 400 },
              { type: 'modifyBaseStat', key: 'agility', delta: 2 },
              {
                type: 'openScene',
                scene: {
                  id: 'scene_cs_cliff_epiphany',
                  title: '绝壁刻痕 · 枪意通玄',
                  subtitle: '雁门关外乱石绝壁',
                  beats: [
                    {
                      speaker: { kind: 'narrator' },
                      text: '逃至雁门关外乱石绝壁之下，你偶然抬头，只见十余丈高的青黑石壁上布满了前代边军枪客留下的深深枪痕——横扫如铁画、直刺如悬针，竟与常山龙胆枪脉暗合！',
                    },
                    {
                      speaker: { kind: 'player' },
                      text: '“原来『回马断后』并非死守一隅，而是借石壁回震之力步步换位……我悟了！”',
                    },
                  ],
                },
              },
            ],
            elseEffects: [
              {
                type: 'toast',
                text: '石壁刻痕纵横如星，暂难尽悟其奥（需悟性 ≥ 65 或 书 ≥ 55）。',
                tone: 'warn',
              },
            ],
          },
        ],
      },

      // 节点 3-1：乱石绝壁死战
      {
        id: 'spot_cs_cliff_battle',
        label: '于乱石绝壁迎战萧远风追兵',
        badge: '第三幕死战',
        subtitle: '择【路线 A 顾全大局】或【路线 B 义字当头死保遗老】',
        tone: 'danger',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_main',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'yanmen_cliff',
        },
        effects: [
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_cliff_choice',
              title: '第三幕 · 绝壁银枪',
              subtitle: '雁门关外乱石绝壁',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '雁门雄关的烽火台与灰青色关墙已遥遥在望，天际却忽然卷起一阵黄沙！身后山道传出地动山摇般的铁骑轰鸣——辽南京武林统制萧远风（NPC-0184）亲率辽军铁林精锐连夜狂追五百里，竟在乱石绝壁前的狭口彻底截断了退路！马蹄踏碎积雪，黑压压的铁甲如乌云压顶般涌来。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0184' },
                  text: '“宋狗休走！白沟夜袭之仇，悯忠寺焚书之恨，今日在这雁门乱石坡一并清算！把《南牧山川策》副本交出来，本统制尚可留你们全尸！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0036' },
                  text: '“前面便是雁门关狭口，关上宋军箭楼已亮起火把！若被铁林骑缠住，密图副本就送不进关内——你快做决断：是斩将夺路护我先行，还是背水死守保住所有幽州遗老！”',
                },
              ],
              choices: [
                {
                  id: 'choice_cliff_route_a',
                  label: '【路线 A · 速战退敌】护送郭逵带密图入关，我自断后！',
                  subLabel: '迎战辽军铁林百夫长（二流下品）：胜得熟练度 +1800、气血 +35、内力 +40、身法 +4',
                  tone: 'primary',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildIronForestCenturionNpc() },
                      rule: 'duel',
                      deathTitle: '血战雁门绝壁',
                      deathDetail: '于雁门关外断后力战辽军铁林百夫长，壮烈殉国。',
                      onWin: CLIFF_WIN_A_EFFECTS,
                    },
                  ],
                },
                {
                  id: 'choice_cliff_route_b',
                  label: '【路线 B · 全员死保】背水死战，护送所有幽州遗老撤入李牧祠！',
                  subLabel: '高难死守半血萧远风 4 回合：胜得熟练度 +2600、气血 +50、内力 +60、身法 +6、抗性 +5、侠义 +100',
                  tone: 'danger',
                  condition: { type: 'flag', flag: 'cs_longling_route_b', op: 'truthy' },
                  effects: [
                    {
                      type: 'startCombat',
                      questId: QUEST_ID,
                      opponent: { kind: 'custom', npc: buildXiaoYuanfengWoundedNpc() },
                      rule: 'survive_rounds',
                      maxRounds: 4,
                      forbidEscapeReason: '身后百余名幽州遗老尚未入祠，一步不可退！',
                      onWin: CLIFF_WIN_B_EFFECTS,
                      onLose: [
                        { type: 'healPlayer', hpPct: 20, mpPct: 20 },
                        {
                          type: 'openScene',
                          scene: {
                            id: 'scene_cs_cliff_lose_b',
                            title: '绝壁受创 · 暂退狭口',
                            subtitle: '雁门关外乱石绝壁',
                            beats: [
                              {
                                speaker: { kind: 'narrator' },
                                text: '萧远风纵使带伤，余威仍如猛虎！你被一枪扫中肩甲跌回乱石堆中，幸得白烈山隔涧放箭掩护方才保住性命。',
                              },
                              {
                                speaker: { kind: 'npc', npcId: 'NPC-0036' },
                                text: '“先服药调息！若实在撑不住他四合猛攻，亦可先择路线 A 斩杀百夫长突围入关！”',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },

      // 节点 4-1：观音阁焚名
      {
        id: 'spot_cs_guanyin_burn_names',
        label: '入宝阁面见韩琦「观音阁焚名」',
        badge: '第四幕收束',
        subtitle: '韩琦焚毁名录记下无名首功，赏定州军府银 +200 两、声望 +80',
        tone: 'gold',
        regionId: 'zhending',
        buildingId: 'zd_longxing',
        spotId: 'zd_lx_guanyin',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'guanyin_burn_names',
        },
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'cs_longling_route_b', op: 'truthy' },
            thenEffects: [
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 15 },
              { type: 'modifySkill', key: '策论', delta: 5 },
            ],
            elseEffects: [
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 25 },
            ],
          },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 15 },
          { type: 'giveSilver', amount: 200, reason: '定州军府私库密赏' },
          { type: 'modifyRenown', delta: 80, reason: '观音阁焚名记无名首功' },
          {
            type: 'setQuestStep',
            questId: QUEST_ID,
            stepId: 'ancestral_hall_confer',
          },
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_guanyin_burn',
              title: '节点 4-1 · 观音阁焚名',
              subtitle: '真定府 · 隆兴大佛寺 > 大悲千手观音三层宝阁',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '真定隆兴寺大悲阁高逾七丈，四十二臂千手铜像垂目俯瞰着暮色中的滹沱河。木梯幽暗，香烟缭绕在宋初营造的斗拱梁枋之间。韩琦（NPC-0011）独自立在三层回廊的雕花木窗前，手中捧着那份早已泛黄的秘密行动名录，郭逵（NPC-0036）则按刀守在梯口。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“自你与郭都监自白沟雪夜动身，至今月余。幽州南牧图已入真定枢密密档，萧远风折损了半数铁林精锐，连辽南京留守司也不得不连夜易防——可这上面的名字，却一个也不能留。”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“安抚使的意思是……”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“皇祐二年的今天，朝廷尚需与契丹维系檀渊旧约，北边万不可因一道密谍折子再起全面刀兵。若这份名录落入主和或政敌手中，便是‘私越边关、挑衅邻邦’的死罪。唯有今日在大悲菩萨面前付之一炬，才能保住你、保住常山枪派，也保住那些幽州遗老的后半生。”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '韩琦从香案取来铜炉炭火，将那张写满潜入者姓名、代号与接应暗桩的澄心堂纸一角凑近炉口。火舌倏忽舔舐纸缘，墨字在橙红火光中卷曲化灰，随高阁穿堂风散作漫天轻尘。郭逵沉声取出一个沉甸甸的牛皮银囊，推到你面前。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0036' },
                  text: '“二百两定州军府私库纹银，权作修缮兵甲之资。名录虽毁，可白沟寒星之下谁曾流血，我郭逵记在心里，韩公亦已在递呈官家的绝密御批折子上，为你记下头等无名首功！”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“白沟寒星照无名。去吧，回常山演武堂去——来日无论五台佛门还是殿前禁军，本帅定为你作保！真定城头的风雪，记着你的名字。”',
                },
              ],
            },
          },
        ],
      },

      // 节点 4-2：宗祠授枪授谱
      {
        id: 'spot_cs_ancestral_confer',
        label: '于顺平侯牌位前受领《常山龙胆枪》与亮银枪',
        badge: '传承圆满',
        subtitle: '习得 MA-074、获 WPN-014 亮银枪、熟练度 +3500、实战四维大涨、得联合举荐信',
        tone: 'gold',
        regionId: 'zhending',
        buildingId: 'zd_spear',
        spotId: 'zd_sp_hall',
        visibleWhen: {
          type: 'questStatus',
          questId: QUEST_ID,
          status: 'active',
          stepId: 'ancestral_hall_confer',
        },
        effects: [
          { type: 'teachMartialArt', artId: 'MA-074', level: 1, exp: 1500 },
          { type: 'giveItem', itemId: 'WPN-014', qty: 1 },
          { type: 'addArtExp', amount: 3500 },
          { type: 'modifyBaseStat', key: 'maxHp', delta: 80 },
          { type: 'modifyBaseStat', key: 'maxMp', delta: 100 },
          { type: 'modifyBaseStat', key: 'agility', delta: 8 },
          { type: 'modifyBaseStat', key: 'res', delta: 6 },
          { type: 'addSectContribution', amount: 500 },
          { type: 'addFlagNumber', flag: 'sect_relation_SECT-22', delta: 30 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0185' }, delta: 30 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0345' }, delta: 15 },
          { type: 'giveItem', itemId: 'ITM-MSC-013', qty: 1 },
          {
            type: 'completeQuest',
            questId: QUEST_ID,
            outcome: 'longling_inherited',
            combatExp: 180,
          },
          {
            type: 'openScene',
            scene: {
              id: 'scene_cs_ancestral_confer',
              title: '第四幕 · 龙胆传薪',
              subtitle: '真定府 · 常山演武堂 > 常山龙胆枪脉宗祠正堂',
              beats: [
                {
                  speaker: { kind: 'narrator' },
                  text: '再回常山演武堂时，宗祠正堂已燃起三牲九礼的高香。汉顺平侯赵云的檀木牌位前，两列火盆将青砖照得通明。掌门赵括苍（NPC-0185）、演武首座凌寒（NPC-0345）、边军都监郭逵（NPC-0036）以及先行赶回真定的雁门神箭白烈山分列左右，整座常山内堂弟子鸦雀无声。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0345' },
                  text: '“白沟风雪夜，幽州古寺钟；雁门绝壁前，孤枪断铁林！此番北上，我常山弟子未辱先祖‘一身是胆’四字，更未曾牵连宗门与大宋边防半毫！”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '赵括苍走上神龛前，双手捧下一具长逾八尺的黑漆紫檀枪匣，又从怀中取出一卷用油布与红绸重重包裹的古旧绢本。启匣瞬间，一杆通体寒光凛冽的亮银长枪跃入眼帘——枪锋三棱透骨，枪颈镌着两行蝇头篆文：“白沟寒星，龙胆常山。”',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0185' },
                  text: '“这杆【常山龙胆亮银枪】，乃是历代内堂首席持之护国的镇派神兵；这卷《岳氏沥泉枪前谱（常山龙胆枪）》，更是先祖自三国乱世传下、经五代兵火仅存的孤本绝学！你于雁门绝壁生死一线间所悟出的‘绝壁寒星枪意’，正与谱中第七势‘孤胆破围’暗合！”',
                },
                {
                  speaker: { kind: 'player' },
                  text: '“弟子拜受先祖遗泽！此枪在手，必不使幽燕胡马越雷池一步！”',
                },
                {
                  speaker: { kind: 'narrator' },
                  text: '你单膝跪地，双手接过亮银长枪与秘谱。枪身入手冰寒沉凝，内息顺着枪杆涌入经脉，丹田与百会间顿时如星河倾泻，气血、内力、身法与抗性齐齐攀上一层新境！郭逵亦上前一步，将一封盖有真定府安抚使大印与常山掌门印信的【常山·定州联合举荐信】系于你腰间。',
                },
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0185' },
                  text: '“自今日起，这杆【常山龙胆亮银枪】与《常山龙胆枪》便托付予你！望你持此神兵与【常山·定州联合举荐信】，护我大宋北疆山河无恙——天下虽大，常山永远是你的后盾！”',
                },
              ],
            },
          },
        ],
      },
    ],
  },
]
