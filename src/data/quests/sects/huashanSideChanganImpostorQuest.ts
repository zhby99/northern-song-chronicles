import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE04_QUEST_ID = 'QST-SECT-05-SIDE-04'

export const HUASHAN_SIDE04_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-02', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus(HUASHAN_SIDE04_QUEST_ID, 'not_started'),
    {
      type: 'any',
      conditions: [
        { type: 'skillAtLeast', key: '辩才', min: 20 },
        { type: 'chivalryAtLeast', min: 20 },
      ],
      hint: '辩才达到 20 或 侠义达到 20',
    },
    { type: 'shichenIn', indices: [9, 10, 11, 0, 1], label: '夜间（戌时至丑时）' },
  ],
}

export const HUASHAN_SIDE04_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE04_QUEST_ID,
    title: '明德秋雨 · 长安捉刀客',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'changan',
    recommendedRealm: '二流下品 ～ 二流上品',
    maxOpponentRealm: '二流上品（假冒华山剑客“断魂剑”柳残阳）',
    recommendedNote:
      '华山派 Lv.2 内门长安暗访支线（全十二幕）。需完成博台大比（QST-SECT-05-02），辩才或侠义达 20，夜间重临长安明德门丝路迎宾栈触发。暗查假冒华山内门弟子行凶的“断魂剑”柳残阳，于西市废园雨夜擒凶，押送京兆府衙为西岳雪冤。',
    startHint:
      '成为华山内门弟子且辩才或侠义达到 20 后，于夜间（戌时至丑时）前往【长安 · 明德门丝路迎宾栈（changan_base_inn）】即可触发。',
    startLocation: {
      regionId: 'changan',
      buildingId: 'changan_base_inn',
      customLabel: '长安 · 明德门丝路迎宾栈',
    },
    startCondition: HUASHAN_SIDE04_START_CONDITION,
    summary:
      '{reignYear}秋夜细雨淅沥，你重临当年初遇华山机缘的【长安 · 明德门丝路迎宾栈】，却听茶棚脚夫与胡商议论纷纷：近日长安城中出现一名自称「华山内门剑客」的青袍杀手，收受黑银替人行凶灭口，连累西岳清誉蒙尘。你以辩才套出线索，循迹追至【长安大西市 · 西坊废园（ca_xishi_west）】，当场撞破冒牌杀手「断魂剑」柳残阳正与两名打手分赃。你先扫平两名二流下品恶徒，复冒雨跃上瓦脊与使着阴狠变种华山剑法的二流上品柳残阳死战，正面震碎其长剑将其生擒，押交【京兆府衙（changan_base_yamen）】公堂对质，终为华山派洗清不白之冤。',
    initialStepId: 'track_ruined_yard',
    steps: {
      track_ruined_yard: {
        id: 'track_ruined_yard',
        title: '循迹西市 · 废园捉凶',
        objective:
          '已自明德门秋雨茶棚探得假冒华山剑客「断魂剑」柳残阳的落脚处！请前往【长安 · 长安大西市 · 西坊（ca_xishi_west）】废园擒拿真凶！',
        nextHint:
          '前往【长安 · 长安大西市 · 西坊（ca_xishi_west）】，点击「潜入西市秋雨废园 · 缉拿假冒华山剑客」。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_west',
          customLabel: '长安 · 长安大西市 · 西坊废园',
        },
      },
      deliver_yamen: {
        id: 'deliver_yamen',
        title: '押解公堂 · 西岳雪冤',
        objective:
          '已在长安废园瓦脊生擒「断魂剑」柳残阳并缴获其伪造华山腰牌与买凶契书！请立即押赴【长安 · 京兆府衙（changan_base_yamen）】公堂报案，为华山派洗清污名。',
        nextHint:
          '前往【长安 · 京兆府衙（changan_base_yamen）】，点击「押交断魂剑柳残阳 · 当堂雪冤」。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'changan_base_yamen',
          customLabel: '长安 · 京兆府衙',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss04_start_inn',
        regionId: 'changan',
        buildingId: 'changan_base_inn',
        onceFlag: 'hs_side04_start_triggered',
        condition: HUASHAN_SIDE04_START_CONDITION,
        effects: [openScene('scene_hss04_01', HUASHAN_SIDE04_QUEST_ID)],
      },
      {
        id: 'trig_hss04_arrive_xishi',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
        onceFlag: 'hs_side04_xishi_triggered',
        condition: atStep(HUASHAN_SIDE04_QUEST_ID, 'track_ruined_yard'),
        effects: [openScene('scene_hss04_05', HUASHAN_SIDE04_QUEST_ID)],
      },
      {
        id: 'trig_hss04_arrive_yamen',
        regionId: 'changan',
        buildingId: 'changan_base_yamen',
        onceFlag: 'hs_side04_yamen_triggered',
        condition: atStep(HUASHAN_SIDE04_QUEST_ID, 'deliver_yamen'),
        effects: [openScene('scene_hss04_11', HUASHAN_SIDE04_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss04_start_inn',
        label: '【华山支线】秋雨茶棚听闻 · 暗查假冒华山捉刀客',
        badge: '明德暗访',
        subtitle: '夜间 · 明德门丝路迎宾栈',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'changan_base_inn',
        visibleWhen: HUASHAN_SIDE04_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_side04_start_triggered', value: true },
          openScene('scene_hss04_01', HUASHAN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss04_raid_xishi',
        label: '【华山支线】潜入西市秋雨废园 · 缉拿假冒华山剑客',
        badge: '雨脊擒凶',
        subtitle: '长安大西市 · 西坊废园',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
        visibleWhen: atStep(HUASHAN_SIDE04_QUEST_ID, 'track_ruined_yard'),
        effects: [
          { type: 'setFlag', flag: 'hs_side04_xishi_triggered', value: true },
          openScene('scene_hss04_05', HUASHAN_SIDE04_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss04_deliver_yamen',
        label: '【华山支线】押交「断魂剑」柳残阳 · 当堂为华山雪冤',
        badge: '京兆雪冤',
        subtitle: '长安 · 京兆府衙',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'changan_base_yamen',
        visibleWhen: atStep(HUASHAN_SIDE04_QUEST_ID, 'deliver_yamen'),
        effects: [
          { type: 'setFlag', flag: 'hs_side04_yamen_triggered', value: true },
          openScene('scene_hss04_11', HUASHAN_SIDE04_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideChanganImpostorQuest.scenes').then((m) => m.SCENES),
  },
]
