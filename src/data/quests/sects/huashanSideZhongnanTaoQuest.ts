import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE09_QUEST_ID = 'QST-SECT-05-SIDE-09'

export const HUASHAN_SIDE09_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    {
      type: 'any',
      hint: '需完成华山第 3 阶支脉核心任务（QST-SECT-05-05 或 QST-SECT-05-08）',
      conditions: [
        qStatus('QST-SECT-05-05', 'completed'),
        qStatus('QST-SECT-05-08', 'completed'),
      ],
    },
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    { type: 'skillAtLeast', key: '经义', min: 40 },
    { type: 'skillAtLeast', key: '辩才', min: 30 },
    { type: 'npcAlive', npcId: 'NPC-0231', npcName: '狮吼子' },
    qStatus(HUASHAN_SIDE09_QUEST_ID, 'not_started'),
  ],
}

export const HUASHAN_SIDE09_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE09_QUEST_ID,
    title: '终南论道 · 金莲净火劫',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'zhongnanshan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（星宿派狮吼子与碧磷毒手联手闯山）',
    recommendedNote:
      '十四幕华山文武兼修支线：代华山赴终南古观参加三年一度关中玄门论道大会，以陈抟希夷阴阳剑理与钟吕内丹义理折服众道。第三日暮色时分，星宿派「狂狮护法」狮吼子率毒徒闯山闹场，你踏上丹墀以浩然《太岳三青峰》斩断其毒铜钹，将其重创逐下终南山。',
    startHint:
      '华山第 3 阶弟子完成支脉前篇（QST-SECT-05-05 或 QST-SECT-05-08），经义 ≥ 40、辩才 ≥ 30 且星宿派【狮吼子】健在时，前往【终南古观 > 清修主殿】开启。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      customLabel: '终南山 / 终南古观 · 清修主殿',
    },
    startCondition: HUASHAN_SIDE09_START_CONDITION,
    summary:
      '{reignYear}秋，关中玄门三年一度的论道法会于【终南古观】启幕。你代表西岳华山赴会，在清修主殿畅论陈抟希夷祖师阴阳剑理与钟吕内丹心法，折服终南前脉道院诸位高道。不料第三日黄昏，星宿派护法【狮吼子】率众毒徒闯上丹墀，狂言羞辱道门丹鼎并伤及守观老道。你挺身而出，先破星宿毒阵前锋，复于丹墀之上以浩然《太岳三青峰》斩断狮吼子毒铜钹，将其重创逐下终南山，保全关中玄门清誉。',
    initialStepId: 'dao_debate',
    steps: {
      dao_debate: {
        id: 'dao_debate',
        title: '终南论道 · 坐而论经',
        objective:
          '已代表华山派入座关中玄门论道大会。请于【终南古观 > 清修主殿】（zn_to_hall）与终南前脉高道坐而论经，阐发陈抟阴阳剑理！',
        nextHint: '在【终南古观 > 清修主殿】参与玄门论道辩经。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_hall',
        },
      },
      dipper_vanguard: {
        id: 'dipper_vanguard',
        title: '毒烟犯观 · 丹墀迎敌',
        objective:
          '星宿派【狮吼子】率毒徒闯入终南古观伤人闹场！请速步出【终南古观 > 丹墀北斗坪】（zn_to_dipper），迎击星宿毒徒前锋！',
        nextHint: '前往【终南古观 > 丹墀北斗坪】拦截星宿派毒徒前锋。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_dipper',
        },
      },
      dipper_shihouzi: {
        id: 'dipper_shihouzi',
        title: '净火破邪 · 逐退狮吼子',
        objective:
          '星宿前锋已溃！【狮吼子】亲自操持毒铜钹，携星宿毒师联手反扑。请于【终南古观 > 丹墀北斗坪】（zn_to_dipper）以浩然剑势斩断其毒铜钹，将其逐下终南山！',
        nextHint: '在【终南古观 > 丹墀北斗坪】力战狮吼子与星宿毒师。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_dipper',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss09_hall_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'hss09_intro_triggered',
        condition: HUASHAN_SIDE09_START_CONDITION,
        effects: [openScene('scene_hss09_01', HUASHAN_SIDE09_QUEST_ID)],
      },
      {
        id: 'trig_hss09_dipper_vanguard',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        onceFlag: 'hss09_dipper_triggered',
        condition: atStep(HUASHAN_SIDE09_QUEST_ID, 'dipper_vanguard'),
        effects: [openScene('scene_hss09_07', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss09_start_hall',
        label: '代表华山入席 · 赴关中玄门论道大会（开启《终南论道 · 金莲净火劫》）',
        badge: '终南论道',
        subtitle: '第一幕 · 终南古观清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: HUASHAN_SIDE09_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hss09_intro_triggered', value: true },
          openScene('scene_hss09_01', HUASHAN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss09_dao_debate',
        label: '登坛坐而论经 · 以陈抟阴阳剑理辩道关中玄门',
        badge: '坐而论经',
        subtitle: '第三幕 · 终南古观清修主殿',
        tone: 'primary',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: atStep(HUASHAN_SIDE09_QUEST_ID, 'dao_debate'),
        effects: [openScene('scene_hss09_03', HUASHAN_SIDE09_QUEST_ID)],
      },
      {
        id: 'spot_hss09_dipper_vanguard',
        label: '踏上丹墀护道 · 迎战星宿派毒徒前锋',
        badge: '丹墀迎敌',
        subtitle: '第七幕 · 终南古观丹墀北斗坪',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        visibleWhen: atStep(HUASHAN_SIDE09_QUEST_ID, 'dipper_vanguard'),
        effects: [
          { type: 'setFlag', flag: 'hss09_dipper_triggered', value: true },
          openScene('scene_hss09_07', HUASHAN_SIDE09_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss09_dipper_shihouzi',
        label: '浩然太岳破邪 · 丹墀决战狮吼子与星宿毒师',
        badge: '净火破邪',
        subtitle: '第十幕 · 终南古观丹墀北斗坪',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        visibleWhen: atStep(HUASHAN_SIDE09_QUEST_ID, 'dipper_shihouzi'),
        effects: [openScene('scene_hss09_10', HUASHAN_SIDE09_QUEST_ID)],
      },
    ],

    loadScenes: () => import('./huashanSideZhongnanTaoQuest.scenes').then((m) => m.SCENES),
  },
]
