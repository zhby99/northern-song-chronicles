import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q06_QUEST_ID = 'QST-SECT-01-06'

export const SHAOLIN_Q06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-05', 'completed'),
    qStatus(SHAOLIN_Q06_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 150 },
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
      '嵩山少林寺罗汉堂脉 Lv.2 内门第二回任务链（全十一幕）。须入寺满 150 日、完成《慈悲刀法》试炼，且经义 ≥ 55、书法 ≥ 35。星夜驰援洛阳白马寺，面对西夏密宗双线纵火须在轻功抢救清凉台梵文孤本与直扑前院截杀纵火先锋间作出决断；随后临阵受传《韦陀杵》，再登齐云古塔排兵布阵（借塔阶居高断援破阵或燃灯死守塔门车轮连战）力毙摩诃巴，战后裁定缴获密宗法器归属，蒙玄悲临行亲赠【少林韦陀伏魔杵】。',
    startHint:
      '入寺满 150 日、完成【东庑刀鸣 · 慈悲度寇】且经义 ≥ 55、书 ≥ 35 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿】（或寻玄苦师伯）领受驰援洛阳白马寺急令。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    },
    startCondition: SHAOLIN_Q06_START_CONDITION,
    summary:
      '{reignYear}秋夜，洛阳释源白马寺忽传八百里飞鸽密信：西夏一品堂密遣番僧伪装译经僧潜入白马寺，双线纵火意图焚毁清凉台梵文孤本、劫夺齐云塔舍利！降魔尊者【玄苦】命你星夜驰援洛阳，与大韦陀僧【玄悲】会合。火海危急之际，你或凭身法抢救千年孤本、或直扑塔道截杀纵火先锋，旋即蒙玄悲临阵传授地阶重器绝学《韦陀杵》。登临【齐云密檐舍利古塔】面对三面夹击，你可借塔阶居高破阵断援擒王，或燃灯死守塔门车轮连战，终以「大韦陀降魔」震毙魔僧【摩诃巴】、裁定密宗法器善后，临别更获玄悲亲赠护寺重器【少林韦陀伏魔杵】。',
    initialStepId: 'rush_to_baimasi',
    steps: {
      rush_to_baimasi: {
        id: 'rush_to_baimasi',
        title: '星夜驰洛 · 火海救经',
        objective:
          '玄苦尊者命你火速星夜赶赴【洛阳府 · 洛阳白马寺 · 白马大佛宝殿（ly_bm_main）】，会合大韦陀僧【玄悲】，破除西夏一品堂假僧纵火诡变！',
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
        title: '齐云塔阵 · 韦陀降魔',
        objective:
          '西夏密宗番僧【摩诃巴】已携舍利函与番僧死士在齐云古塔设下三面夹击之阵！你已蒙玄悲临阵传授《韦陀杵》，速赴【洛阳白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】择阵斩魔！',
        nextHint:
          '前往【洛阳府 · 洛阳白马寺 · 齐云密檐舍利古塔（ly_bm_pagoda）】，点击「登齐云密檐古塔 · 布阵力战摩诃巴」。',
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
        effects: [openScene('scene_slq06_02', SHAOLIN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_slq06_pagoda',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        onceFlag: 'sl_q06_pagoda_triggered',
        condition: atStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
        effects: [openScene('scene_slq06_06_array', SHAOLIN_Q06_QUEST_ID)],
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
        badge: '火海救经',
        subtitle: '双线纵火抉择 · 临阵领悟镇魔重杵',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        visibleWhen: atStep(SHAOLIN_Q06_QUEST_ID, 'rush_to_baimasi'),
        effects: [
          { type: 'setFlag', flag: 'sl_q06_baima_triggered', value: true },
          openScene('scene_slq06_02', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq06_pagoda_duel',
        label: '【罗汉堂脉】登齐云密檐古塔 · 布阵力战摩诃巴',
        badge: '韦陀降魔',
        subtitle: '塔阵战术抉择 · 获赠少林韦陀伏魔杵',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        visibleWhen: atStep(SHAOLIN_Q06_QUEST_ID, 'qiyun_pagoda_duel'),
        effects: [
          { type: 'setFlag', flag: 'sl_q06_pagoda_triggered', value: true },
          openScene('scene_slq06_06_array', SHAOLIN_Q06_QUEST_ID),
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
        label: '会合玄悲师伯 · 破白马寺西夏假僧火攻诡计',
        badge: '火海救经',
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
          openScene('scene_slq06_02', SHAOLIN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'act_slq06_pagoda_npc',
        label: '禀明玄悲师伯 · 提杵登齐云古塔布阵斩魔',
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
          openScene('scene_slq06_06_array', SHAOLIN_Q06_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanWeituoQuest.scenes').then((m) => m.SCENES),
  },
]
