import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE02_QUEST_ID = 'QST-SECT-05-SIDE-02'

export const HUASHAN_SIDE02_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-ENTRY', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 1 },
    qStatus(HUASHAN_SIDE02_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 15 },
  ],
}

export const HUASHAN_SIDE02_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE02_QUEST_ID,
    title: '玉泉药香 · 秦岭采参行',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '三流下品 ～ 三流中品',
    maxOpponentRealm: '三流中品（秦岭吊睛猛虎）',
    recommendedNote:
      '华山派 Lv.1 外门采药支线（全十幕）。需经义达 15 以上，于玉女峰东峰紫气迎曦石坪丹房受师兄之托，赴长安终南秦岭古洞寻采太白紫阳老参。途中救下游方女医沈青黛，夜雨孤剑斩虎，携珍稀老参回山交割。',
    startHint:
      '完成华山入门大礼且经义达到 15 后，前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】与丹房弟子交谈即可接取。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    },
    startCondition: HUASHAN_SIDE02_START_CONDITION,
    summary:
      '{reignYear}深秋，玉女峰丹房炼制太乙回气清心散急缺一味「太白紫阳老参」。因你颇通经义本草，丹房执事师兄于【东峰紫气迎曦石坪】托你西赴长安秦岭北麓寻参。行至【终南草堂寺 · 西厢药圃外秦岭古洞】，你撞见两名受洛阳豪商雇佣的恶猎户正围逼关中孙真人药王庙一脉的游方女医【沈青黛】，妄图强抢其所采紫阳老参。你拔剑击退恶猎户救下沈青黛，当夜共宿山涧古洞避雨时，又逢一头凶性大发的秦岭吊睛猛虎扑营。你孤剑力毙猛虎，沈青黛感念救命之恩，慨赠半株紫阳老参与随身鹤嘴药锄竹篓。携参返归东峰交割后，丹房满室生香。',
    initialStepId: 'search_qinling',
    steps: {
      search_qinling: {
        id: 'search_qinling',
        title: '西赴秦岭 · 寻采紫阳参',
        objective:
          '已领丹房采药之托！请前往【长安 · 终南草堂寺 · 西厢（ca_caotang_west）】，沿寺外秦岭古洞溪涧寻访太白紫阳老参。',
        nextHint:
          '前往【长安 · 终南草堂寺 · 西厢（ca_caotang_west）】，点击「入秦岭古洞溪涧寻采太白紫阳参」。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_west',
          customLabel: '长安 · 终南草堂寺西厢（通往秦岭古洞溪涧）',
        },
      },
      return_ginseng: {
        id: 'return_ginseng',
        title: '携参归峰 · 丹房交割',
        objective:
          '已救下游方女医沈青黛并在山涧夜雨斩虎，获赠半株太白紫阳老参！请返回【潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】交割灵参。',
        nextHint:
          '返回【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】，点击「呈交太白紫阳老参 · 丹房交割」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss02_start_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hs_side02_start_triggered',
        condition: HUASHAN_SIDE02_START_CONDITION,
        effects: [openScene('scene_hss02_01', HUASHAN_SIDE02_QUEST_ID)],
      },
      {
        id: 'trig_hss02_arrive_qinling',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        onceFlag: 'hs_side02_qinling_triggered',
        condition: atStep(HUASHAN_SIDE02_QUEST_ID, 'search_qinling'),
        effects: [openScene('scene_hss02_03', HUASHAN_SIDE02_QUEST_ID)],
      },
      {
        id: 'trig_hss02_return_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hs_side02_return_triggered',
        condition: atStep(HUASHAN_SIDE02_QUEST_ID, 'return_ginseng'),
        effects: [openScene('scene_hss02_10', HUASHAN_SIDE02_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss02_start_terrace',
        label: '【华山支线】探问丹房采药事宜 · 秦岭寻参',
        badge: '秦岭采参',
        subtitle: '经义 ≥ 15 · 东峰紫气迎曦石坪',
        tone: 'jade',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: HUASHAN_SIDE02_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_side02_start_triggered', value: true },
          openScene('scene_hss02_01', HUASHAN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss02_qinling_cave',
        label: '【华山支线】入秦岭古洞溪涧寻采太白紫阳参',
        badge: '溪涧寻参',
        subtitle: '长安 · 终南草堂寺西厢外山道',
        tone: 'jade',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: atStep(HUASHAN_SIDE02_QUEST_ID, 'search_qinling'),
        effects: [
          { type: 'setFlag', flag: 'hs_side02_qinling_triggered', value: true },
          openScene('scene_hss02_03', HUASHAN_SIDE02_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss02_return_terrace',
        label: '【华山支线】呈交太白紫阳老参 · 丹房交割',
        badge: '携参复命',
        subtitle: '东峰紫气迎曦石坪丹房',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_SIDE02_QUEST_ID, 'return_ginseng'),
        effects: [
          { type: 'setFlag', flag: 'hs_side02_return_triggered', value: true },
          openScene('scene_hss02_10', HUASHAN_SIDE02_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideQinlingHerbQuest.scenes').then((m) => m.SCENES),
  },
]
