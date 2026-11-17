import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { atStep, qStatus, flag, setStep, warn, toast, openScene } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-SECT-22-LONGLING'

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
    qStatus(QUEST_ID, 'not_started'),
    qStatus(QUEST_ID, 'not_completed'),
  ],
}

const OPENING_EFFECTS: QuestEffect[] = [
  openScene('scene_cs_longling_opening', 'QST-SECT-22-LONGLING'),
]

const MARSHAL_XIAO_COMBAT_EFFECTS: QuestEffect[] = [
  {
    type: 'startCombat',
    questId: QUEST_ID,
    opponent: {
      kind: 'npc',
      npcId: 'NPC-0184',
      talkOverride: '“好胆的南朝刺客！敢焚本帅《南牧山川策》，且看你接得住我几记铁枪！”',
    },
    rule: 'survive_rounds',
    maxRounds: 4,
    lethalOnLose: true,
    deathTitle: '血洒燕京元帅府',
    deathDetail:
      '少侠潜入辽南京兵马元帅府焚毁《南牧山川策》正本后，未能撑过武林统制萧远风四合铁枪猛攻，力战殉国于析津府。',
    forbidEscapeReason: '元帅府重围之下退无可退，须死守四回合待郭逵掷烟幕弹接应！',
    introText:
      '【生死突围 · 战败必死】火光冲天，辽南京武林统制【萧远风】持铁枪破门而入！切记善用防御与金疮药撑过 4 回合，待郭逵掷出霹雳烟幕弹接应撤退！',
    onWin: [
      { type: 'addArtExp', amount: 1200 },
      { type: 'giveCombatExp', amount: 60, reason: '元帅府硬撼萧远风四合' },
      openScene('scene_cs_marshal_escape', 'QST-SECT-22-LONGLING'),
    ],
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
    startCondition: PREREQ_CONDITION,
    summary:
      '真定府榷场惊现幽州悯忠寺血迹铜牌与「南牧图成，速毁于燕」血书。常山枪派内堂弟子奉掌门赵括苍与韩琦密命，随郭逵隐姓埋名潜入辽南京析津府，焚毁《南牧山川策》并护图杀出雁门关。',
    initialStepId: 'meet_hanqi',
    steps: {
      meet_hanqi: {
        id: 'meet_hanqi',
        title: '第一幕 · 密见韩琦（可选：榷场查账）',
        objective:
          '可先赴【宋辽边境榷场 > 榷场平准司衡算官署】与凌寒核查走私马商账册（算术 ≥ 45），随后前往【真定府都部署衙】密见韩琦。',
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
          '随郭逵乔装马商北上析津府，前往【燕京榷马大市 > 塞北千驷相马围栏】应对辽国暗桩完颜鹏豪盘查。',
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
          '可先赴【燕云遗民义勇拳馆】凭暗语拜会秦乾索取《幽州夜禁换防图》，随后前往【幽州悯忠寺 > 修竹后院议事禅堂】拜会燕云遗老取《南牧山川策》副本。',
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
            atStep(QUEST_ID, 'meet_hanqi'),
          ],
        },
        effects: [
          openScene('scene_cs_hanqi_briefing', 'QST-SECT-22-LONGLING'),
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
            atStep(QUEST_ID),
            flag('cs_longling_qinqian_done', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'cs_longling_qinqian_done', value: true },
          { type: 'giveItem', itemId: 'ITM-MSC-012', qty: 1 },
          { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0642' }, delta: 15 },
          { type: 'addFlagNumber', flag: 'sect_relation_SECT-23', delta: 10 },
          { type: 'modifyRenown', delta: 20, reason: '联络燕云义勇暗桩' },
          openScene('scene_cs_qinqian_secret', 'QST-SECT-22-LONGLING'),
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
            atStep(QUEST_ID, 'meet_hanqi'),
            flag('cs_longling_audit_tried', 'falsy'),
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
              openScene('scene_cs_market_audit_win', 'QST-SECT-22-LONGLING'),
            ],
            elseEffects: [
              openScene('scene_cs_market_audit_fail', 'QST-SECT-22-LONGLING'),
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
        visibleWhen: atStep(QUEST_ID, 'yanjing_horse_market'),
        effects: [
          openScene('scene_cs_horse_market', 'QST-SECT-22-LONGLING'),
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
        visibleWhen: atStep(QUEST_ID, 'minzhong_temple'),
        effects: [
          openScene('scene_cs_minzhong_elders', 'QST-SECT-22-LONGLING'),
        ],
      },

      // 节点 2-4：元帅府焚图与突围
      {
        id: 'spot_cs_marshal_burn',
        label: '潜入签押房焚毁《南牧山川策》正本',
        badge: '焚图突围',
        subtitle: '持换防图免检定，否则需 经义/书 ≥ 45，随后生死死守萧远风 4 回合（战败殉国）',
        tone: 'danger',
        regionId: 'xijin_liao',
        buildingId: 'xj_marshal',
        spotId: 'xj_ms_command',
        visibleWhen: atStep(QUEST_ID, 'marshal_burn_map'),
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
              toast('精准定位并焚毁《南牧山川策》正本！经义/书 +3，武学熟练度 +500。', 'success', '元帅府焚图'),
              ...MARSHAL_XIAO_COMBAT_EFFECTS,
            ],
            elseEffects: [
              { type: 'healPlayer', hpPct: -12 },
              warn('仓促翻检误触铁铃机关受轻伤（气血 -12%），仍强行抢烧正本！', '元帅府焚图'),
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
        subtitle: '触发灵光一现：武学熟练度 +400、战斗经验 +50',
        tone: 'jade',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_east',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'yanmen_cliff'),
            flag('cs_longling_cliff_insight', 'falsy'),
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
              { type: 'giveCombatExp', amount: 50, reason: '参悟绝壁前辈枪痕' },
              openScene('scene_cs_cliff_epiphany', 'QST-SECT-22-LONGLING'),
            ],
            elseEffects: [
              warn('石壁刻痕纵横如星，暂难尽悟其奥（需悟性 ≥ 65 或 书 ≥ 55）。'),
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
        visibleWhen: atStep(QUEST_ID, 'yanmen_cliff'),
        effects: [
          openScene('scene_cs_cliff_choice', 'QST-SECT-22-LONGLING'),
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
        visibleWhen: atStep(QUEST_ID, 'guanyin_burn_names'),
        effects: [
          {
            type: 'branch',
            condition: flag('cs_longling_route_b', 'truthy'),
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
          setStep(QUEST_ID, 'ancestral_hall_confer'),
          openScene('scene_cs_guanyin_burn', 'QST-SECT-22-LONGLING'),
        ],
      },

      // 节点 4-2：宗祠授枪授谱
      {
        id: 'spot_cs_ancestral_confer',
        label: '于顺平侯牌位前受领《常山龙胆枪》与亮银枪',
        badge: '传承圆满',
        subtitle: '习得 MA-074、获 WPN-014 亮银枪、熟练度 +3500、战斗经验 +180、得联合举荐信',
        tone: 'gold',
        regionId: 'zhending',
        buildingId: 'zd_spear',
        spotId: 'zd_sp_hall',
        visibleWhen: atStep(QUEST_ID, 'ancestral_hall_confer'),
        effects: [
          { type: 'teachMartialArt', artId: 'MA-074', level: 1, exp: 1500 },
          { type: 'giveItem', itemId: 'WPN-014', qty: 1 },
          { type: 'addArtExp', amount: 3500 },
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
          openScene('scene_cs_ancestral_confer', 'QST-SECT-22-LONGLING'),
        ],
      },
    ],
    loadScenes: () => import('./changshanLonglingQuest.scenes').then((m) => m.SCENES),
  },
]
