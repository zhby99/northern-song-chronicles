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
          text: '深夜雨冷，常山演武堂山门紧闭。香火缭绕的龙胆枪脉宗祠正堂内，掌门赵括苍（NPC-0185）端坐太师椅，边军都监郭逵（NPC-0036）与演武首座凌寒（NPC-0345）分立左右。',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0345' },
          text: '“今日在宋辽边境榷场扣下一匹走私契丹骏马，从马鞍夹层中搜出这枚幽州悯忠寺铜牌，并半张血书——『南牧图成，速毁于燕。』”',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0036' },
          text: '“辽南京武林统制萧远风已秘密绘成《南牧山川策》，若秋后辽军南侵，河北塘泺要害尽在敌手。此事干系重大，须先随我赴真定府都部署衙密见韩琦韩安抚使。”',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '“你入我内堂以来枪法日进，今夜便授你这枚【悯忠寺血迹铜牌】。记住：此去燕云不得暴露大宋与常山旗号，一切唯『无名』二字。”',
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
              text: '枪影交错间，东侧马厩火势轰然炸响！郭逵连掷三枚霹雳烟幕弹，浓烟瞬间吞没了萧远风的铁枪寒芒。',
            },
            {
              speaker: { kind: 'npc', npcId: 'NPC-0036' },
              text: '“正本已化飞灰，速随我西折奔雁门关！萧远风必率铁林精锐死追！”',
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
        type: 'toast',
        text: '被萧远风铁枪震退，幸得郭逵策马救回，调息后再入元帅府焚图！',
        tone: 'warn',
      },
    ],
  },
]

const CLIFF_WIN_A_EFFECTS: QuestEffect[] = [
  { type: 'addArtExp', amount: 1800 },
  { type: 'modifyBaseStat', key: 'maxHp', delta: 35 },
  { type: 'modifyBaseStat', key: 'maxMp', delta: 40 },
  { type: 'modifyBaseStat', key: 'agility', delta: 4 },
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
          text: '激战正酣之际，关内忽然响起一阵龙吟般的马嘶！赵括苍（NPC-0185）与白烈山（NPC-0635）率常山精锐杀出关外，内外夹击将辽军铁林骑冲散！',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '“干得好！郭都监已携《南牧山川策》副本安全入关，我等速回真定府向韩安抚使复命！”',
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
  { type: 'addFlagNumber', flag: 'chivalry', delta: 100 },
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
          text: '你凭一杆长枪死死钉在绝壁窄口，硬生生接下萧远风四合猛攻！身后最后一名幽州白发老者终于踉跄跨入李牧祠门槛。',
        },
        {
          speaker: { kind: 'npc', npcId: 'NPC-0185' },
          text: '“好一个常山义士！今日你不仅保住了燕云密报，更保住了百余名不肯剃发易服的汉家遗老！萧远风，滚回幽州去吧！”',
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
          '可先赴【燕云遗民义勇拳馆】凭暗语拜会秦乾（NPC-0642）索取《幽州夜禁换防图》，随后前往【幽州悯忠寺】拜会燕云遗老取《南牧山川策》副本。',
        nextHint: '可选先赴义勇拳馆访秦乾取换防图，再赴【幽州悯忠寺】取密图副本',
        targetLocation: {
          regionId: 'xijin_liao',
          buildingId: 'xj_minzhong',
          customLabel: '析津府 · 幽州悯忠寺',
        },
      },
      marshal_burn_map: {
        id: 'marshal_burn_map',
        title: '第二幕 · 元帅府焚图与突围',
        objective:
          '郭逵已在东侧马厩纵火引敌，速潜入【辽南京兵马元帅府】签押房焚毁《南牧山川策》正本，并接住萧远风四合铁枪突围！',
        nextHint: '潜入【辽南京兵马元帅府】焚毁正本并撑过萧远风 4 回合突围',
        targetLocation: {
          regionId: 'xijin_liao',
          buildingId: 'xj_marshal',
          customLabel: '析津府 · 辽南京兵马元帅府',
        },
      },
      yanmen_cliff: {
        id: 'yanmen_cliff',
        title: '第三幕 · 乱石绝壁死战',
        objective:
          '西折逃至【雁门关外乱石绝壁】，可先参悟绝壁枪痕（悟性 ≥ 65 或书 ≥ 55），再择路线迎战萧远风与辽军铁林精锐！',
        nextHint: '前往【雁门关外乱石绝壁】，选择路线迎战追兵杀入关内',
        targetLocation: {
          regionId: 'yanmenguan',
          buildingId: 'ym_cliff',
          customLabel: '雁门关 · 雁门关外乱石绝壁',
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
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“澶渊之盟不可轻破。此去幽州若败，朝廷与真定府皆不会认账，只以『私越边关流寇』论处。你可还敢往？”',
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
                    { type: 'addFlagNumber', flag: 'chivalry', delta: 20 },
                    {
                      type: 'setQuestStep',
                      questId: QUEST_ID,
                      stepId: 'yanjing_horse_market',
                    },
                  ],
                },
                {
                  id: 'choice_hanqi_pragmatic',
                  label: '【沉稳务实】既为守土安民，功名何足挂齿。请安抚使示下。',
                  subLabel: '韩琦好感 +5、郭逵好感 +10、纹银 +50 两、策论 +3',
                  tone: 'jade',
                  effects: [
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0011' }, delta: 5 },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 10 },
                    { type: 'giveSilver', amount: 50, reason: '韩琦私库盘缠' },
                    { type: 'modifySkill', key: '策论', delta: 3 },
                    {
                      type: 'setQuestStep',
                      questId: QUEST_ID,
                      stepId: 'yanjing_horse_market',
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
          { type: 'addFlagNumber', flag: 'renown', delta: 20 },
          {
            type: 'toast',
            text: '秦乾（NPC-0642）暗授【幽州夜禁换防图】！秦乾好感 +15，沧州八极门关系 +10，声望 +20。',
            tone: 'success',
            logTag: '燕云暗桩',
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
              { type: 'addFlagNumber', flag: 'renown', delta: 15 },
              { type: 'addArtExp', amount: 200 },
              {
                type: 'toast',
                text: '算术查账得手！起获【幽燕马市通行暗记】，算术 +3、声望 +15、武学熟练度 +200。',
                tone: 'success',
                logTag: '榷场查账',
              },
            ],
            elseEffects: [
              {
                type: 'toast',
                text: '走私账目隐晦难辨（算术不足 45），未能起获暗记，须凭真本事闯燕京马市！',
                tone: 'warn',
                logTag: '榷场查账',
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
              subtitle: '析津府 · 燕京榷马大市',
              beats: [
                {
                  speaker: { kind: 'npc', npcId: 'NPC-0767' },
                  text: '“慢着！这批骒马的牙口与烙印不对劲，你们两个定州口音的马贩到底从哪条道摸进燕京的？”',
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
                          type: 'toast',
                          text: '无伤混过盘查！骑术/辩才 +3，武学熟练度 +350，郭逵好感 +5。',
                          tone: 'success',
                          logTag: '燕京马市',
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
                              type: 'toast',
                              text: '强闯灭口得手！武学熟练度 +600、气血上限 +15、缴获纹银 +35 两。',
                              tone: 'success',
                              logTag: '燕京马市',
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
                          type: 'toast',
                          text: '斩杀辽国马市暗桩！武学熟练度 +600、气血上限 +15、纹银 +35 两。',
                          tone: 'success',
                          logTag: '燕京马市',
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
                  text: '唐碑冷月下，数位百年不改宽袍博带的幽州遗老与一名盲眼老僧迎上前来。你抱枪行出「常山持枪礼」，老僧浑浊的眼眶顿时湿润。',
                },
                {
                  speaker: { kind: 'custom', name: '悯忠寺盲眼老僧', title: '燕云遗老' },
                  text: '“《南牧山川策》副本与南院暗桩名录在此。只是……老朽代幽州十万父老问少侠一句：官家兵马，何时再过桑干河？”',
                },
              ],
              choices: [
                {
                  id: 'choice_minzhong_vow',
                  label: '【立誓承志】只要常山枪不断，燕云终有归日！',
                  subLabel: '侠义 +30、武学熟练度 +300、获【燕云遗老护身玉佩】（抗性 +5）',
                  tone: 'gold',
                  effects: [
                    { type: 'addFlagNumber', flag: 'chivalry', delta: 30 },
                    { type: 'addArtExp', amount: 300 },
                    { type: 'giveItem', itemId: 'ITM-ACC-001', qty: 1 },
                    ...MINZHONG_AFTER_EFFECTS,
                  ],
                },
                {
                  id: 'choice_minzhong_escort',
                  label: '【实言相告 · 护送义士】朝廷暂守盟约，若事泄晚辈必护诸位老丈杀出幽州！',
                  subLabel: '侠义 +50、郭逵好感 +5（解锁第三幕【路线 B：全员死保】）',
                  tone: 'primary',
                  effects: [
                    { type: 'addFlagNumber', flag: 'chivalry', delta: 50 },
                    { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0036' }, delta: 5 },
                    { type: 'setFlag', flag: 'cs_longling_route_b', value: true },
                    ...MINZHONG_AFTER_EFFECTS,
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
                type: 'toast',
                text: '绝壁灵光一现！武学熟练度 +400、实战身法 +2，枪意大涨！',
                tone: 'success',
                logTag: '绝壁悟枪',
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
                  text: '雁门雄关遥遥在望，身后却马蹄如雷——萧远风亲率辽军铁林精锐截断退路！',
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
                          type: 'toast',
                          text: '未能撑满四合！整顿伤势后再试死守，或暂择路线 A 突围入关。',
                          tone: 'warn',
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
          { type: 'addFlagNumber', flag: 'renown', delta: 80 },
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
                  speaker: { kind: 'npc', npcId: 'NPC-0011' },
                  text: '“白沟寒星照无名。此纸行动名录今日付之一炬，然官家密案之中已记下你这一桩首功——来日无论五台佛门还是殿前禁军，本帅定为你作保！”',
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
                  speaker: { kind: 'npc', npcId: 'NPC-0185' },
                  text: '“自今日起，这杆【常山龙胆亮银枪】与《岳氏沥泉枪前谱（常山龙胆枪）》便托付予你！望你持此神兵与【常山·定州联合举荐信】，护我大宋北疆山河无恙！”',
                },
              ],
            },
          },
        ],
      },
    ],
  },
]
