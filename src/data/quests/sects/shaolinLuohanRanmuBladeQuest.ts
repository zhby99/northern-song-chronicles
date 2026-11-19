import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q22_QUEST_ID = 'QST-SECT-01-22'

export const SHAOLIN_Q22_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-21', 'completed'),
    qStatus(SHAOLIN_Q22_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'luohan'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 2555 },
    { type: 'skillAtLeast', key: '经义', min: 74 },
    { type: 'skillAtLeast', key: '书', min: 55 },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
  ],
}

export const SHAOLIN_Q22_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q22_QUEST_ID,
    title: '枯木生烟 · 玄苦授刀',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（夜探黑影高手）',
    recommendedNote:
      '嵩山少林寺罗汉堂真传单脉首章（全二十四幕）。须为罗汉堂脉 Lv.3 真传弟子、完成《飞瀑深潭 · 一苇渡江》、入寺满 2555 日且经义 ≥ 74、书 ≥ 55。时值乔峰蒙冤风波前夕，降魔尊者玄苦隐觉少林寺外黑影幢幢、杀机暗伏，遂于深夜演武殿中以八十一刀劈燃百年枯菩提木，倾囊传授少林七十二绝技《燃木刀法》并提前托付传世宝刀【WPN-013 少林燃木戒刀】；当夜神秘黑影高手夜袭禅房，你挥动烈焰刀风十合逼退强敌！',
    startHint:
      '罗汉堂脉真传弟子完成《飞瀑深潭 · 一苇渡江》、入寺满 2555 日且经义 ≥ 74、书 ≥ 55 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】（或寻玄苦）聆听深夜授刀。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    },
    startCondition: SHAOLIN_Q22_START_CONDITION,
    summary:
      '{reignYear}入寺七载寒暑，江湖风雨欲来。降魔尊者【玄苦】感念爱徒乔峰在外身陷猜忌暗潮，又察觉近日少室山中屡有深不可测的黑影窥伺罗汉堂，隐隐有山雨欲来之感。深夜子时，玄苦召你独入【罗汉堂演武正殿】，于佛前以八十一刀疾劈百年枯菩提木，刀刃擦风炽热生烟、枯木轰然自燃，当场倾囊传授少林绝技《燃木刀法》，并将镇堂宝刀【少林燃木戒刀】提前托付于你。是夜三更，果有一名身法诡绝、掌力阴寒的一流中品黑影高手潜入禅院暗袭！你手握燃木戒刀挺身护师，以刚猛炽热的烈焰刀风力战十合，硬生生逼退黑影，护得玄苦周全。',
    initialStepId: 'night_guard_luohan',
    steps: {
      night_guard_luohan: {
        id: 'night_guard_luohan',
        title: '戒刀护师 · 逼退夜袭黑影',
        objective:
          '玄苦已于深夜以八十一刀劈燃枯菩提木传你《燃木刀法》，并将【少林燃木戒刀】托付于你。三更风紧，禅院外杀机暗涌，请留守【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】，迎战潜入夜袭的神秘黑影高手！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】点击「三更手握燃木戒刀护师 · 迎战夜袭黑影高手」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_main',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq22_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_q22_start_triggered',
        condition: SHAOLIN_Q22_START_CONDITION,
        effects: [openScene('scene_slq22_01', SHAOLIN_Q22_QUEST_ID)],
      },
      {
        id: 'trig_slq22_night_main',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_q22_night_triggered',
        condition: atStep(SHAOLIN_Q22_QUEST_ID, 'night_guard_luohan'),
        effects: [openScene('scene_slq22_14', SHAOLIN_Q22_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq22_start_main',
        label: '【罗汉真传】深夜入罗汉堂正殿 · 拜谒玄苦领受《燃木刀法》',
        badge: '枯木生烟',
        subtitle: '罗汉堂真传单脉首章 · 罗汉堂演武正殿',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: SHAOLIN_Q22_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q22_start_triggered', value: true },
          openScene('scene_slq22_01', SHAOLIN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq22_night_main',
        label: '【罗汉真传】三更手握燃木戒刀护师 · 迎战夜袭黑影高手',
        badge: '烈焰逼影',
        subtitle: '演武正殿夜战 · 逼退一流中品夜探黑影高手',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: atStep(SHAOLIN_Q22_QUEST_ID, 'night_guard_luohan'),
        effects: [
          { type: 'setFlag', flag: 'sl_q22_night_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q22_shadow_appeared', op: 'truthy' },
            thenEffects: [openScene('scene_slq22_17', SHAOLIN_Q22_QUEST_ID)],
            elseEffects: [openScene('scene_slq22_14', SHAOLIN_Q22_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq22_start_npc',
        label: '深夜拜见玄苦师伯 · 聆听罗汉堂《燃木刀法》秘传',
        badge: '枯木生烟',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126'] },
            SHAOLIN_Q22_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q22_start_triggered', value: true },
          openScene('scene_slq22_01', SHAOLIN_Q22_QUEST_ID),
        ],
      },
      {
        id: 'act_slq22_night_npc',
        label: '执燃木戒刀守卫禅院 · 迎击夜袭黑影高手',
        badge: '烈焰逼影',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126'] },
            atStep(SHAOLIN_Q22_QUEST_ID, 'night_guard_luohan'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q22_night_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q22_shadow_appeared', op: 'truthy' },
            thenEffects: [openScene('scene_slq22_17', SHAOLIN_Q22_QUEST_ID)],
            elseEffects: [openScene('scene_slq22_14', SHAOLIN_Q22_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanRanmuBladeQuest.scenes').then((m) => m.SCENES),
  },
]
