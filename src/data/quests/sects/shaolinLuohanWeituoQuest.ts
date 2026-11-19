import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q06_QUEST_ID = 'QST-SECT-01-06'

export const SHAOLIN_Q06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-05', 'completed'),
    qStatus(SHAOLIN_Q06_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 730 },
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '书', min: 35 },
    { type: 'npcAlive', npcId: 'NPC-0157', npcName: '玄悲' },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
  ],
}

export const SHAOLIN_Q06_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q06_QUEST_ID,
    title: '释源白马 · 韦陀降魔',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品（西夏密宗番僧 · 摩诃巴）',
    recommendedNote:
      '嵩山少林寺罗汉堂脉 Lv.2 内门第二回任务链（全二十幕）。须入寺满 730 日、完成《慈悲刀法》试炼，且经义 ≥ 55、书法 ≥ 35。奉玄苦尊者急谕星夜驰援洛阳府白马寺，助大韦陀僧玄悲识破潜伏寺中的西夏一品堂假僧，临阵习得罗汉堂重器绝学《韦陀杵》，再登齐云密檐舍利古塔一对一击毙西夏密宗番僧摩诃巴；玄悲临赴大理陆凉州公干前，亲将镇魔重器【少林韦陀伏魔杵】赠予于你。',
    startHint:
      '入寺满 730 日、完成【东庑刀鸣 · 慈悲度寇】且经义 ≥ 55、书 ≥ 35 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿】（或寻玄苦师伯）领受驰援洛阳白马寺急令。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    },
    startCondition: SHAOLIN_Q06_START_CONDITION,
    summary:
      '{reignYear}秋夜，洛阳释源白马寺忽传八百里飞鸽密信：西夏一品堂密遣番僧伪装西域译经僧潜入白马寺，意图纵火焚毁清凉台梵文古经、盗取齐云塔舍利！降魔尊者【玄苦】于罗汉堂正殿命你星夜驰援洛阳。你赶赴【白马寺 · 白马大佛宝殿】，与坐镇洛阳的大韦陀僧【玄悲】会合，以经义与梵文笔法当堂揭穿西夏假僧伪装，连破殿前伏兵。临阵之际，玄悲亲传罗汉堂镇魔绝学《韦陀杵》要诀。你提杵直追至【齐云密檐舍利古塔】顶层，一对一与西夏密宗番僧【摩诃巴】血战数十合，终以「大韦陀降魔」震毙魔僧、保全古刹舍利。事毕，玄悲因奉方丈密谕将赴大理陆凉州公干，临行前郑重将贴身重器【少林韦陀伏魔杵】赠予于你。',
    initialStepId: 'rush_to_baimasi',
    steps: {
      rush_to_baimasi: {
        id: 'rush_to_baimasi',
        title: '星夜驰洛 · 白马伏奸',
        objective:
          '玄苦尊者命你火速星夜赶赴【洛阳府 · 洛阳白马寺 · 白马大佛宝殿（ly_bm_main）】，会合大韦陀僧【玄悲】，识破潜伏寺中的西夏一品堂假僧并扑灭大殿诡变！',
        nextHint:
          '前往【洛阳府 · 洛阳白马寺 · 白马大佛宝殿（ly_bm_main）】，点击「星夜驰援白马大佛宝殿 · 会合玄悲破假僧」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_main',
          customLabel: '洛阳府 · 洛阳白马寺 · 白马大佛宝殿',
        },
      },
      qiyun_pagoda_duel: {
        id: 'qiyun_pagoda_duel',
        title: '齐云塔顶 · 韦陀降魔',
        objective:
          '西夏一品堂假僧已败露，幕后主使西夏密宗番僧【摩诃巴】劫持舍利匣遁上齐云古塔！你已蒙玄悲临阵传授《韦陀杵》要诀，速赴【洛阳白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】登塔斩魔！',
        nextHint:
          '前往【洛阳府 · 洛阳白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】，点击「登齐云密檐古塔 · 韦陀杵力战摩诃巴」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_pagoda',
          customLabel: '洛阳府 · 洛阳白马寺 · 齐云密檐舍利古塔',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq06_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_q06_start_triggered',
        condition: SHAOLIN_Q06_START_CONDITION,
        effects: [openScene('scene_slq06_01', SHAOLIN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_slq06_baima_main',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        onceFlag: 'sl_q06_baima_triggered',
        condition: atStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
        effects: [openScene('scene_slq06_04', SHAOLIN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_slq06_pagoda',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        onceFlag: 'sl_q06_pagoda_triggered',
        condition: atStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
        effects: [openScene('scene_slq06_12', SHAOLIN_Q06_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq06_start_main',
        label: '【罗汉堂脉】白马急报 · 领玄苦密令星夜驰援洛阳',
        badge: '白马急报',
        subtitle: '西夏假僧窥伺释源古刹 · 罗汉堂演武正殿',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: SHAOLIN_Q06_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q06_start_triggered', value: true },
          openScene('scene_slq06_01', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq06_baima_main',
        label: '【罗汉堂脉】星夜驰援白马大佛宝殿 · 会合玄悲破假僧',
        badge: '白马伏奸',
        subtitle: '识破西夏一品堂假僧 · 临阵悟《韦陀杵》',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        visibleWhen: atStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
        effects: [
          { type: 'setFlag', flag: 'sl_q06_baima_triggered', value: true },
          openScene('scene_slq06_04', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq06_pagoda_duel',
        label: '【罗汉堂脉】登齐云密檐古塔 · 韦陀杵力战摩诃巴',
        badge: '韦陀降魔',
        subtitle: '塔顶决战西夏密宗番僧 · 获赠少林韦陀伏魔杵',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        visibleWhen: atStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
        effects: [
          { type: 'setFlag', flag: 'sl_q06_pagoda_triggered', value: true },
          openScene('scene_slq06_12', SHAOLIN_Q06_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq06_start_npc',
        label: '拜见玄苦师伯 · 领受星夜驰援洛阳白马寺急令',
        badge: '白马急报',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126'] },
            SHAOLIN_Q06_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q06_start_triggered', value: true },
          openScene('scene_slq06_01', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'act_slq06_baima_npc',
        label: '会合玄悲师伯 · 揭穿白马寺西夏假僧诡计',
        badge: '白马伏奸',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0157'] },
            atStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q06_baima_triggered', value: true },
          openScene('scene_slq06_04', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'act_slq06_pagoda_npc',
        label: '禀明玄悲师伯 · 提杵登齐云古塔斩杀摩诃巴',
        badge: '韦陀降魔',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0157'] },
            atStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q06_pagoda_triggered', value: true },
          openScene('scene_slq06_12', SHAOLIN_Q06_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanWeituoQuest.scenes').then((m) => m.SCENES),
  },
]
