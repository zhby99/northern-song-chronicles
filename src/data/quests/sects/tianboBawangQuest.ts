import type { NodeNpc } from '../../../types/game'
import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { atStep, qStatus, flag, warn, toast, openScene, makeQuestNpc } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-TIANBO-BAWANG'

const PROLOGUE_ENTRY_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'chivalryAtLeast', min: 120 },
    {
      type: 'not',
      condition: { type: 'inSect', sectId: 'SECT-20' },
      reason: '西夏一品堂门人不可接取天波杨府传承',
    },
    {
      type: 'not',
      condition: flag('liao_suspicion_debuff', 'truthy'),
      reason: '背负通辽嫌疑者不可接取天波杨府传承',
    },
    {
      type: 'any',
      conditions: [
        { type: 'learnedArtAtLeast', artId: 'MA-116', minLevel: 6 },
        { type: 'learnedArtAtLeast', artId: 'MA-174', minLevel: 6 },
      ],
      hint: '须习得 MA-116《六合大枪》或 MA-174《杨氏梨花枪》任意一门达到第 6 重',
    },
    { type: 'combatStatAtLeast', key: 'maxHp', min: 2800 },
    { type: 'skillAtLeast', key: '骑术', min: 65 },
    // 合流终幕硬性要求根骨 ≥ 82，且开局后几乎无法再提升根骨：前置到开启条件，避免半途永久卡死
    { type: 'talentAtLeast', key: '根骨', min: 82 },
  ],
}

const FINALE_MERGE_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'flag', flag: 'tb_branch_a_done', op: 'truthy', label: '已完成【枝干甲·太原除奸与金鞭试枪】' },
    { type: 'flag', flag: 'tb_branch_b_done', op: 'truthy', label: '已完成【枝干乙·五台山破禅与五郎枪意】' },
    { type: 'flag', flag: 'tb_branch_c_done', op: 'truthy', label: '已完成【枝干丙·雁门降龙与穆柯箭试】' },
    { type: 'hasItem', itemId: 'ITM-MSC-016', qty: 1 },
    { type: 'hasItem', itemId: 'ITM-MSC-017', qty: 1 },
    { type: 'hasItem', itemId: 'ITM-MSC-018', qty: 1 },
    { type: 'talentAtLeast', key: '根骨', min: 82 },
    { type: 'combatStatAtLeast', key: 'maxHp', min: 3200 },
    { type: 'skillAtLeast', key: '骑术', min: 80 },
  ],
}

export function buildWutaiGuardianMonkNpc(isStoneTrial: boolean): NodeNpc {
  return makeQuestNpc({
    id: isStoneTrial ? 'tb_wutai_stone_elder' : 'tb_wutai_zen_monk',
    name: isStoneTrial ? '清凉护法高僧' : '清凉寺护法武僧',
    title: isStoneTrial ? '演棍石台守碑高僧' : '松风禅亭值殿武僧',
    realm: isStoneTrial ? '一流下品' : '三流上品',
    factionId: 'SECT-03',
    factionName: '五台山清凉寺',
    avatarUrl: '/assets/characters/templates/tpl_wutai_monk_male_av.jpg',
    portraitUrl: '/assets/characters/templates/tpl_wutai_monk_male_fb.jpg',
    talk: isStoneTrial
      ? '阿弥陀佛！五郎八卦棍重如山岳，施主且看棍！'
      : '得罪了，请施主赐教清凉寺齐眉棍！',
    stats: isStoneTrial ? { hp: 1620, mp: 1350, agi: 55, res: 50 } : { hp: 780, mp: 620, agi: 42, res: 32 },
    equipped: { weapon: isStoneTrial ? 'WPN-036' : 'WPN-080', armor: isStoneTrial ? 'ARM-020' : 'ARM-047', shoes: isStoneTrial ? 'BOT-009' : 'BOT-021', bow: isStoneTrial ? 'BOW-009' : 'BOW-023', accessory1: isStoneTrial ? 'ACC-019' : 'ACC-042', accessory2: isStoneTrial ? 'ACC-020' : 'ACC-043', mount: isStoneTrial ? 'MNT-009' : 'MNT-021' },
    equippedArts: { neigong: 'MA-140', qinggong: isStoneTrial ? 'MA-157' : 'MA-177', move1: 'MA-134', move2: 'MA-117' },
    learnedArts: [{ artId: 'MA-140', level: isStoneTrial ? 6 : 4 }, { artId: isStoneTrial ? 'MA-157' : 'MA-177', level: isStoneTrial ? 6 : 4 }, { artId: 'MA-134', level: isStoneTrial ? 7 : 4 }, { artId: 'MA-117', level: isStoneTrial ? 6 : 4 }],
  })
}

function buildYanmenLiaoVanguardNpc(advantaged: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'tb_yanmen_liao_commander',
    name: '萧铁古 · 辽军先锋统领',
    title: advantaged ? '大辽南院突袭统领（已失先机）' : '大辽南院重甲突袭统领',
    realm: '一流下品',
    factionId: 'SECT-31',
    factionName: '大辽南院',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    talk: '踏平雁门粮道，断绝河东宋军军资！',
    stats: { hp: 2150, mp: 1650, agi: advantaged ? 48 : 57, res: 56 },
    equipped: { weapon: 'WPN-034', armor: 'ARM-019', shoes: 'BOT-009', bow: 'BOW-010', accessory1: 'ACC-020', accessory2: 'ACC-018', mount: 'MNT-011' },
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-246', move1: 'MA-073', move2: 'MA-115' },
    learnedArts: [{ artId: 'MA-243', level: 6 }, { artId: 'MA-246', level: 6 }, { artId: 'MA-073', level: 5 }, { artId: 'MA-115', level: 6 }],
  })
}

function buildYanmenLiaoHeavyCavalryNpc(advantaged: boolean): NodeNpc {
  return makeQuestNpc({
    id: 'tb_yanmen_liao_cavalry',
    name: '契丹铁林重骑百夫长',
    title: advantaged ? '铁林冷锻重骑（仰攻受挫）' : '铁林冷锻重骑',
    realm: '二流上品',
    factionId: 'SECT-31',
    factionName: '大辽南院',
    avatarUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    portraitUrl: '/assets/characters/templates/tpl_khitan_warrior_fb.jpg',
    talk: '铁林重铠刀枪不入，碾碎宋军前哨！',
    stats: { hp: 1580, mp: 1200, agi: advantaged ? 44 : 52, res: 54 },
    equipped: { weapon: 'WPN-047', armor: 'ARM-025', shoes: 'BOT-012', bow: 'BOW-012', accessory1: 'ACC-023', accessory2: 'ACC-026', mount: 'MNT-013' },
    equippedArts: { neigong: 'MA-243', qinggong: 'MA-246', move1: 'MA-152', move2: 'MA-116' },
    learnedArts: [{ artId: 'MA-243', level: 5 }, { artId: 'MA-246', level: 5 }, { artId: 'MA-152', level: 6 }, { artId: 'MA-116', level: 5 }],
  })
}

const TAIYUAN_SPY_COMBAT_EFFECTS: QuestEffect[] = [
  {
    type: 'startCombat',
    questId: QUEST_ID,
    opponent: {
      kind: 'npc',
      npcId: 'NPC-0836',
      talkOverride: '既已撞破我二人身份，今夜便留在这天波旧祠做鬼吧！',
    },
    extraOpponents: [
      {
        kind: 'npc',
        npcId: 'NPC-0871',
        talkOverride: '烧毁《河东边防军阵残图》，杀出去！',
      },
    ],
    rule: 'duel',
    deathTitle: '血染天波旧祠',
    deathDetail:
      '少侠于太原天波旧祠内院孤身迎战西夏一品堂暗桩没藏泽渊与大辽死士乌古文海，不慎失手被淬毒弯刀与狼牙重棒合击毙命。',
    forbidEscapeReason: '天波旧祠岂容辽夏细作遁走！',
    introText:
      '【1v2 生死合击】内院书斋的檀木书架轰然倒塌，西夏细作没藏泽渊与大辽死士乌古文海同时撕破伪装，分持党项弯刀与契丹狼牙棒左右夹击而来！可点击敌手立绘或按 [Tab] 择一集火破敌！',
    onWin: [
      { type: 'markNpcsDead', npcIds: ['NPC-0836', 'NPC-0871'] },
      { type: 'setFlag', flag: 'tb_taiyuan_spies_cleared', value: true },
      { type: 'addArtExp', amount: 700 },
      { type: 'modifySkill', key: '策论', delta: 4 },
      { type: 'modifyChivalry', delta: 30, reason: '肃清天波旧祠辽夏双谍' },
      { type: 'giveSilver', amount: 80, reason: '缴获辽夏细作盘缠' },
      openScene('scene_tb_taiyuan_spy_win', 'QST-TIANBO-BAWANG'),
    ],
  },
]

const WUTAI_STONE_TRIAL_EFFECTS: QuestEffect[] = [
  {
    type: 'startCombat',
    questId: QUEST_ID,
    opponent: { kind: 'custom', npc: buildWutaiGuardianMonkNpc(true) },
    extraOpponents: [
      {
        kind: 'npc',
        npcId: 'NPC-0504',
        talkOverride:
          '五郎师祖昔年化枪为棍，悟得“置之死地而后生”之回马真意。施主一味固守可参不透这面石碑！',
      },
    ],
    rule: 'story_trial',
    forbidEscapeReason: '演棍石台参悟回马枪意，半途而废则前功尽弃！',
    introText:
      '【1v2 八卦双棍试炼】五台山风雪呼啸，杨五郎演棍石台四围松涛如怒！清凉护法高僧与明安大师各持熟铜八卦齐眉棍，一左一右联手施展《五郎八卦棍》！此乃佛门演武考校（点到为止），请择敌逐个击破，悟出“置之死地而后生”的回马枪意！',
    onWin: [
      { type: 'setFlag', flag: 'tb_branch_b_done', value: true },
      { type: 'giveItem', itemId: 'ITM-MSC-017', qty: 1 },
      { type: 'addArtExp', amount: 1600 },
      { type: 'giveCombatExp', amount: 90, reason: '五台山演棍石台悟回马枪意' },
      { type: 'modifySkill', key: '经义', delta: 4 },
      { type: 'addFlagNumber', flag: 'sect_relation_SECT-03', delta: 20 },
      { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0504' }, delta: 15 },
      openScene('scene_tb_wutai_success', 'QST-TIANBO-BAWANG'),
    ],
    onLose: [
      { type: 'healPlayer', hpPct: 25, mpPct: 25 },
      openScene('scene_tb_wutai_stone_lose', 'QST-TIANBO-BAWANG'),
    ],
  },
]

export const TIANBO_BAWANG_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '天波忠魂 · 霸王枪出',
    category: 'main_story',
    regionId: 'bianliang',
    summary:
      '中后期高难网状传承任务树：自开封府杨排风三十六路烧火棍起步，并行挑战太原除奸与呼延庆、五台山破禅、雁门关血战三大跨州试炼，终赴延安与狄青、杨文广血战铁鹞子，习得天阶下品《杨家霸王枪》。',
    recommendedRealm: '一流下品',
    maxOpponentRealm: '一流上品',
    recommendedNote:
      '刚性前置：江湖侠义 ≥ 120、非西夏一品堂/通辽门人、《六合大枪》或《杨氏梨花枪》≥ 6 重、气血上限 ≥ 2,800、骑术 ≥ 65、根骨 ≥ 82；终章传功另需气血 ≥ 3,200、骑术 ≥ 80。',
    startHint:
      '满足刚性前置门槛后，前往【开封府 · 西坊演武拳馆】拜会天波府护院女统制杨排风接下三十六路烧火棍试炼。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bianliang_base_dojo',
      customLabel: '开封府 · 西坊演武拳馆（杨排风）',
    },
    startCondition: PROLOGUE_ENTRY_CONDITION,
    initialStepId: 'visit_yang_wenguang',
    steps: {
      visit_yang_wenguang: {
        id: 'visit_yang_wenguang',
        title: '太原谒祠 · 呈递烧火铁箸',
        objective:
          '已接下杨排风三十六路少林烧火棍，获【天波烧火铁箸】。速赴【太原府 · 天波杨家旧祠】拜见当代传人杨文广，开启三大并行试炼枝干。',
        targetLocation: {
          regionId: 'taiyuan',
          buildingId: 'ty_yang',
          customLabel: '太原府 · 天波杨家旧祠（杨文广）',
        },
      },
      three_trials: {
        id: 'three_trials',
        title: '三道试炼 · 跨州并行求真意',
        objective:
          '可自由选择顺序完成三条试炼枝干：甲【太原府·天波杨家旧祠】先入「内院书斋·秘藏室」捉谍，再赴「后园演武石坪」胜呼延庆；乙【五台山·杨五郎演棍石台】先入「松风观云禅亭」拜会明安大师破禅，再赴「五郎八卦演棍主台」接招；丙【雁门关】先赴「雁门雄关城楼 > 瓮城屯兵校场」驰马截粮，再赴「雁门关外乱石绝壁 > 幽谷石室·寒玉榻」随穆桂云斩辽将。集齐三信物且根骨≥82、气血≥3,200、骑术≥80后回太原见杨文广。',
        targetLocation: {
          regionId: 'taiyuan',
          buildingId: 'ty_yang',
          customLabel: '太原旧祠 / 五台山石台 / 雁门关（三线并行）',
        },
      },
      finale_yanan: {
        id: 'finale_yanan',
        title: '终章① · 绝命回马破铁鹞',
        objective:
          '三信物已聚、筋骨已成！随杨文广赴【延安府 · 鄜延边军大营】，与名将狄青并肩死战西夏一品堂努儿海、漫咩与铁鹞子重骑，于沙场绝境中打出第一记【绝命回马枪】！',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_camp',
          customLabel: '延安府 · 鄜延边军大营（狄青）',
        },
      },
      finale_ancestral_hall: {
        id: 'finale_ancestral_hall',
        title: '终章② · 天波宗祠五合考校',
        objective:
          '鄜延大捷！返回【太原府 · 天波杨家旧祠】，于杨业令公牌位前迎战手持【天波透甲金枪】的杨文广，五合不倒或击退半步，即可承接天阶《杨家霸王枪》！',
        targetLocation: {
          regionId: 'taiyuan',
          buildingId: 'ty_yang',
          customLabel: '太原府 · 天波杨家旧祠（杨文广）',
        },
      },
    },

    npcActions: [
      // 【序章】汴京烧火棍：开封府 · 西坊演武拳馆 · 杨排风 (NPC-0252)
      {
        id: 'act_tb_prologue_paifeng',
        label: '拜会杨排风 · 接三十六路烧火棍',
        badge: '天波序章',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0252'] },
            qStatus(QUEST_ID, 'not_started'),
          ],
        },
        enabledWhen: PROLOGUE_ENTRY_CONDITION,
        effects: [
          openScene('scene_tb_prologue_paifeng', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 太原谒祠：见杨文广 (NPC-0032) 开启三线并行试炼
      {
        id: 'act_tb_wenguang_open_branches',
        label: '呈递【天波烧火铁箸】· 问剑霸王枪谱',
        badge: '天波主干',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0032'] },
            atStep(QUEST_ID, 'visit_yang_wenguang'),
            { type: 'hasItem', itemId: 'ITM-MSC-015', qty: 1 },
          ],
        },
        effects: [
          openScene('scene_tb_wenguang_branches', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【枝干乙·1】五台山：拜会明安 (NPC-0504) 禅台问心
      {
        id: 'act_tb_wutai_mingan_zen',
        label: '禅台问心 · 论杨家忠烈禅机（经义 ≥ 60）',
        badge: '枝干乙',
        tone: 'jade',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0504'] },
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_wutai_zen_passed', 'falsy'),
          ],
        },
        effects: [
          openScene('scene_tb_wutai_zen', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【枝干甲/汇合】返回太原见杨文广校验终章门槛
      {
        id: 'act_tb_wenguang_merge_check',
        label: '呈验三道信物 · 启程延安终章',
        badge: '汇合校验',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0032'] },
            atStep(QUEST_ID, 'three_trials'),
          ],
        },
        enabledWhen: FINALE_MERGE_CONDITION,
        effects: [
          openScene('scene_tb_merge_to_yanan', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【终章①】延安府 · 鄜延边军大营：见狄青 (NPC-0031) 开战
      {
        id: 'act_tb_yanan_diqing_battle',
        label: '随狄青、杨文广血战西夏铁鹞子',
        badge: '终章①',
        tone: 'danger',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0031'] },
            atStep(QUEST_ID, 'finale_yanan'),
          ],
        },
        effects: [
          openScene('scene_tb_yanan_pre', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【终章②】太原府 · 天波杨家旧祠：杨文广五合考校战
      {
        id: 'act_tb_final_duel_wenguang',
        label: '天波宗祠考校 · 接杨文广五合霸王枪',
        badge: '终章②',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0032'] },
            atStep(QUEST_ID, 'finale_ancestral_hall'),
          ],
        },
        effects: [
          openScene('scene_tb_final_pre', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【支线/旧闻】开封府：追问杨排风陈家谷旧事
      {
        id: 'act_tb_paifeng_old_story',
        label: '追问陈家谷旧事与霸王枪渊源',
        badge: '天波秘辛',
        tone: 'default',
        showInBottomBar: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0252'] },
            atStep(QUEST_ID),
            flag('tb_lore_paifeng_read', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_paifeng_read', value: true },
          openScene('scene_tb_paifeng_old_story', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【支线/战前】雁门关：战前与穆桂云对表降龙木军令
      {
        id: 'act_tb_muguiyun_briefing',
        label: '与穆桂云对表雁门军情',
        badge: '战前军议',
        tone: 'jade',
        showInBottomBar: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0253'] },
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_branch_c_done', 'falsy'),
            flag('tb_lore_muguiyun_read', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_muguiyun_read', value: true },
          openScene('scene_tb_muguiyun_briefing', 'QST-TIANBO-BAWANG'),
        ],
      },
    ],

    spotActions: [
      // 【枝干甲·1】太原旧祠 · 内院捉谍
      {
        id: 'spot_tb_taiyuan_spy',
        label: '内院书斋 · 核查名录捉拿细作',
        badge: '枝干甲①',
        subtitle: '【算术≥55】或【经义≥55】识破 1v2 辽夏双谍（生死恶战）；失败则遭偷袭（气血-15%）后迎战',
        tone: 'primary',
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_east',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_taiyuan_spies_cleared', 'falsy'),
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'skillAtLeast', key: '算术', min: 55 },
                { type: 'skillAtLeast', key: '经义', min: 55 },
              ],
            },
            thenEffects: [
              toast('算术/经义精微，一眼识破祭祀名录中的辽夏双谍破绽，先发制人！', 'success', '太原除奸'),
              ...TAIYUAN_SPY_COMBAT_EFFECTS,
            ],
            elseEffects: [
              { type: 'healPlayer', hpPct: -15 },
              warn('名录盘查疏漏，遭没藏泽渊与乌古文海暗器偷袭（气血 -15%），强行迎战！', '太原除奸'),
              ...TAIYUAN_SPY_COMBAT_EFFECTS,
            ],
          },
        ],
      },

      // 【枝干甲·2】太原旧祠 · 金鞭少帅之约（呼延庆）
      {
        id: 'spot_tb_huyan_duel',
        label: '后园演武石坪 · 应呼延庆金鞭之约',
        badge: '枝干甲②',
        subtitle: '击败辽夏细作后，堂堂正正单挑考校 呼延庆（一流下品，气血 2,128 · 点到为止）',
        tone: 'danger',
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_west',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_taiyuan_spies_cleared', 'truthy'),
            flag('tb_branch_a_done', 'falsy'),
          ],
        },
        effects: [
          {
            type: 'startCombat',
            questId: QUEST_ID,
            opponent: {
              kind: 'npc',
              npcId: 'NPC-0228',
              talkOverride: '少废话！接住我呼延家浑铁金鞭不退半步，这枚【太原呼延金鞭令】才算你名正言顺！',
            },
            rule: 'story_trial',
            forbidEscapeReason: '金鞭少帅呼延庆当面，岂可怯战逃跑！',
            introText:
              '天波旧祠后园演武石坪积雪未消，呼延庆倒提一对八棱浑铁金鞭踏步而出！少年将门虎气冲霄，双鞭一振竟带起呼啸风雷：“来吧！让我看看你有几斤几两，敢接天波杨家枪！”（同袍比武考校 · 点到为止）',
            onWin: [
              { type: 'setFlag', flag: 'tb_branch_a_done', value: true },
              { type: 'giveItem', itemId: 'ITM-MSC-016', qty: 1 },
              { type: 'addArtExp', amount: 1500 },
              { type: 'giveCombatExp', amount: 90, reason: '太原旧祠折服呼延庆' },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0228' }, delta: 25 },
              { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0032' }, delta: 15 },
              openScene('scene_tb_huyan_win', 'QST-TIANBO-BAWANG'),
            ],
            onLose: [
              { type: 'healPlayer', hpPct: 25, mpPct: 25 },
              openScene('scene_tb_huyan_lose', 'QST-TIANBO-BAWANG'),
            ],
          },
        ],
      },

      // 【枝干乙·2】五台山 · 演棍石台接招
      {
        id: 'spot_tb_wutai_stone_trial',
        label: '杨五郎演棍石台 · 接招参悟回马枪意',
        badge: '枝干乙②',
        subtitle: '1v2 佛门演武（点到为止）：迎战清凉护法高僧 + 明安大师，参透“置之死地而后生”的回马枪意',
        tone: 'gold',
        regionId: 'wutaishan',
        buildingId: 'wt_staff',
        spotId: 'wt_staff_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_wutai_zen_passed', 'truthy'),
            flag('tb_branch_b_done', 'falsy'),
          ],
        },
        effects: WUTAI_STONE_TRIAL_EFFECTS,
      },

      // 【枝干丙·1】雁门雄关城楼 · 马战截粮
      {
        id: 'spot_tb_yanmen_intercept',
        label: '瓮城屯兵校场 · 驰马抢占咽喉高地',
        badge: '枝干丙①',
        subtitle: '【骑术≥75】检定：成功则敌方铁骑身法 -15%；失败则体能损耗、气血 -10%',
        tone: 'primary',
        regionId: 'yanmenguan',
        buildingId: 'ym_tower',
        spotId: 'ym_tower_east',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_yanmen_intercept_tried', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_yanmen_intercept_tried', value: true },
          {
            type: 'branch',
            condition: { type: 'skillAtLeast', key: '骑术', min: 75 },
            thenEffects: [
              { type: 'setFlag', flag: 'tb_yanmen_advantage', value: true },
              openScene('scene_tb_yanmen_intercept_win', 'QST-TIANBO-BAWANG'),
            ],
            elseEffects: [
              { type: 'healPlayer', hpPct: -10 },
              { type: 'giveFood', amount: -2 },
              openScene('scene_tb_yanmen_intercept_fail', 'QST-TIANBO-BAWANG'),
            ],
          },
        ],
      },

      // 【枝干丙·2】雁门关外乱石绝壁 · 联手穆桂云血战
      {
        id: 'spot_tb_yanmen_bloodbattle',
        label: '乱石绝壁 · 随穆桂云血战辽军铁骑',
        badge: '枝干丙②',
        subtitle: '2v2 沙场生死战（战败殉国）：联手穆桂云迎战 萧铁古·辽军先锋统领 + 契丹铁林重骑百夫长',
        tone: 'danger',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_yanmen_intercept_tried', 'truthy'),
            flag('tb_branch_c_done', 'falsy'),
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: flag('tb_yanmen_advantage', 'truthy'),
            thenEffects: [
              {
                type: 'startCombat',
                questId: QUEST_ID,
                allies: [
                  {
                    kind: 'npc',
                    npcId: 'NPC-0253',
                    talkOverride: '少侠尽管突阵，侧翼铁骑交由桂云羽箭与梨花枪策应！',
                  },
                ],
                opponent: { kind: 'custom', npc: buildYanmenLiaoVanguardNpc(true) },
                extraOpponents: [{ kind: 'custom', npc: buildYanmenLiaoHeavyCavalryNpc(true) }],
                rule: 'duel',
                deathTitle: '血战雁门粮道',
                deathDetail:
                  '少侠随女将穆桂云于雁门关外乱石绝壁截击大辽南院重骑，力战不支，命陨塞外风雪之中。',
                forbidEscapeReason: '雁门粮道生死一线，穆桂云正在侧翼并肩死战，岂可撤退！',
                introText:
                  '【2v2 雁门生死合击】乱石绝壁高地上箭雨如蝗！你抢占咽喉高地居高临下（敌骑身法锐减），与女将穆桂云并肩杀入萧铁古·辽军先锋统领与契丹铁林重骑百夫长阵中！可点击敌将立绘择一集火斩首！',
                onWin: [
                  { type: 'setFlag', flag: 'tb_branch_c_done', value: true },
                  { type: 'giveItem', itemId: 'ITM-MSC-018', qty: 1 },
                  { type: 'addArtExp', amount: 1800 },
                  { type: 'giveCombatExp', amount: 100, reason: '雁门关联手穆桂云破敌' },
                  { type: 'modifySkill', key: '骑术', delta: 5 },
                  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0253' }, delta: 25 },
                  { type: 'modifyChivalry', delta: 50, reason: '雁门关护粮斩杀辽将' },
                  { type: 'giveSilver', amount: 150, reason: '雁门关护粮赏银' },
                  openScene('scene_tb_yanmen_bloodbattle_win_adv', 'QST-TIANBO-BAWANG'),
                ],
              },
            ],
            elseEffects: [
              {
                type: 'startCombat',
                questId: QUEST_ID,
                allies: [
                  {
                    kind: 'npc',
                    npcId: 'NPC-0253',
                    talkOverride: '少侠尽管突阵，侧翼铁骑交由桂云羽箭与梨花枪策应！',
                  },
                ],
                opponent: { kind: 'custom', npc: buildYanmenLiaoVanguardNpc(false) },
                extraOpponents: [{ kind: 'custom', npc: buildYanmenLiaoHeavyCavalryNpc(false) }],
                rule: 'duel',
                deathTitle: '血战雁门粮道',
                deathDetail:
                  '少侠随女将穆桂云于雁门关外乱石绝壁硬撼大辽南院重骑，力战不支，命陨塞外风雪之中。',
                forbidEscapeReason: '雁门粮道生死一线，穆桂云正在侧翼并肩死战，岂可撤退！',
                introText:
                  '【2v2 雁门生死硬撼】辽军重甲铁骑正面冲阵，马蹄踏雪如雷！你强忍肩伤，与女将穆桂云并肩死守乱石绝壁狭口，正面迎击萧铁古·辽军先锋统领与契丹铁林重骑百夫长！',
                onWin: [
                  { type: 'setFlag', flag: 'tb_branch_c_done', value: true },
                  { type: 'giveItem', itemId: 'ITM-MSC-018', qty: 1 },
                  { type: 'addArtExp', amount: 1800 },
                  { type: 'giveCombatExp', amount: 100, reason: '雁门关联手穆桂云破敌' },
                  { type: 'modifySkill', key: '骑术', delta: 5 },
                  { type: 'modifyNpcFavor', target: { kind: 'npc', npcId: 'NPC-0253' }, delta: 25 },
                  { type: 'modifyChivalry', delta: 50, reason: '雁门关护粮斩杀辽将' },
                  { type: 'giveSilver', amount: 150, reason: '雁门关护粮赏银' },
                  openScene('scene_tb_yanmen_bloodbattle_win_std', 'QST-TIANBO-BAWANG'),
                ],
              },
            ],
          },
        ],
      },

      // 【支线/瞻仰】太原旧祠 · 瞻仰杨令公牌位
      {
        id: 'spot_tb_linggong_shrine',
        label: '瞻仰杨业令公牌位与陈家谷遗碑拓本',
        badge: '天波忠魂',
        subtitle: '细读太原天波旧祠遗训，领悟“满门忠烈”四字分量',
        tone: 'default',
        regionId: 'taiyuan',
        buildingId: 'ty_yang',
        spotId: 'ty_yang_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID),
            flag('tb_lore_linggong_read', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_linggong_read', value: true },
          openScene('scene_tb_linggong_shrine', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【支线/观碑】五台山 · 细观五郎石台残碑刻痕
      {
        id: 'spot_tb_wutai_stele_read',
        label: '细观演棍石台“置之死地而后生”刻痕',
        badge: '枪意残碑',
        subtitle: '在迎战清凉护法高僧前，先揣摩杨五郎留下的枪棍转换痕迹',
        tone: 'default',
        regionId: 'wutaishan',
        buildingId: 'wt_staff',
        spotId: 'wt_staff_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'three_trials'),
            flag('tb_lore_wutai_stele_read', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_wutai_stele_read', value: true },
          openScene('scene_tb_wutai_stele_read', 'QST-TIANBO-BAWANG'),
        ],
      },

      // 【支线/军情】延安府 · 观摩鄜延军营沙盘
      {
        id: 'spot_tb_yanan_sandtable',
        label: '观摩狄青鄜延大营沙盘与铁鹞子布阵图',
        badge: '战前侦察',
        subtitle: '察看西夏右厢与一品堂合围地形，知己知彼',
        tone: 'default',
        regionId: 'yanan',
        buildingId: 'ya_camp',
        spotId: 'ya_camp_main',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(QUEST_ID, 'finale_yanan'),
            flag('tb_lore_yanan_sandtable', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'tb_lore_yanan_sandtable', value: true },
          openScene('scene_tb_yanan_sandtable', 'QST-TIANBO-BAWANG'),
        ],
      },
    ],
    loadScenes: () => import('./tianboBawangQuest.scenes').then((m) => m.SCENES),
  },
]
