import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q16_QUEST_ID = 'QST-SECT-05-16'

export const HUASHAN_Q16_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    {
      type: 'any',
      hint: '必修前置：完结《石室止戈 · 剑气同源》或《魔刻噬心 · 破尽同门》',
      conditions: [
        qStatus('QST-SECT-05-14', 'completed'),
        qStatus('QST-SECT-05-15', 'completed'),
      ],
    },
    qStatus(HUASHAN_Q16_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
  ],
}

export const HUASHAN_Q16_QUEST: QuestDefinition = {
  id: HUASHAN_Q16_QUEST_ID,
  title: '雁塔风雷 · 京兆除魔',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流中品 ～ 一流上品',
  maxOpponentRealm: '一流上品（一品堂关中副使拓跋烈 · 星宿毒阵长老双凶合击）',
  recommendedNote:
    '华山派晋升四阶长老核心大战长卷（二十八幕）。西夏权臣没藏讹庞欲寇泾原，密令一品堂关中主事拓跋烈勾结星宿妖人将封不弃、高沧云诱困于【京兆府 · 慈恩寺大雁塔】！你亲率二十名华山精锐星夜驰援长安，自大雁塔底层血战杀上七层飞檐，连破强弩刀阵与腐骨毒雾救出同门，凯旋晋封四阶长老（护法长老 / 执剑长老）！',
  startHint:
    '完结《石室止戈 · 剑气同源》或《魔刻噬心 · 破尽同门》后，前往【玉女峰紫霞道观 · 紫霞正气主殿】向岳沧溟接领十万火急军情。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_zixia',
    spotId: 'tg_zx_hall',
    customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
  },
  startCondition: HUASHAN_Q16_START_CONDITION,
  summary:
    '{reignYear}冬寒彻骨，西夏权臣没藏讹庞图谋大举进犯泾原路，为剪除大宋关中武林羽翼，密令一品堂关中副使拓跋烈勾结星宿海毒师设下绝户陷阱，将追查敌踪的封不弃与大师兄高沧云死死围困于【长安慈恩寺大雁塔】顶层！你于【紫霞正气主殿】临危受命，统领二十名华山剑客星夜疾驰长安，顶着强弩与毒烟自大雁塔一层血战杀至七层飞檐，力挫拓跋烈与星宿毒阵长老联手，救下封、高二人。败退西夏人故意遗落一封挑拨华山气剑相疑的伪造血书；返山之后，四老联署册封你为四阶长老，而山门之外更大的风暴已然逼近！',
  initialStepId: 'q16_yanta_base',
  steps: {
    q16_yanta_base: {
      id: 'q16_yanta_base',
      title: '星夜驰长安 · 破塔底层阵',
      objective:
        '封不弃与高沧云被困长安慈恩寺大雁塔危在旦夕！你已率二十名华山精锐星夜下山，请火速赶赴【京兆府 · 慈恩寺大雁塔 · 宝塔底层 · 舍利地宫】撕开西夏外围强弩封锁！',
      nextHint:
        '前往【京兆府 · 慈恩寺大雁塔 · 宝塔底层 · 舍利地宫（ca_dayanta_main）】触发破阵。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_dayanta',
        spotId: 'ca_dayanta_main',
      },
    },
    q16_yanta_mid: {
      id: 'q16_yanta_mid',
      title: '血战登中层 · 剑荡星宿毒',
      objective:
        '已击溃宝塔底层一品堂强弩刀手！请乘胜沿塔梯杀上【慈恩寺大雁塔 · 中层回廊 · 浮雕壁画】，捣毁星宿妖人布下的腐骨毒烟炉阵！',
      nextHint:
        '前往【慈恩寺大雁塔 · 中层回廊 · 浮雕壁画（ca_dayanta_east）】，点击「提剑杀入中层回廊 · 破除星宿毒烟阵」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_dayanta',
        spotId: 'ca_dayanta_east',
      },
    },
    q16_yanta_top: {
      id: 'q16_yanta_top',
      title: '七层飞檐战 · 力挫双凶首',
      objective:
        '中层毒阵已破，塔顶喊杀震天！请直登【慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺】，迎战一品堂副使拓跋烈与星宿毒阵长老，救出封不弃与高沧云！',
      nextHint:
        '前往【慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺（ca_dayanta_west）】，点击「跃上七层飞檐 · 死战拓跋烈与星宿长老」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_dayanta',
        spotId: 'ca_dayanta_west',
      },
    },
    q16_return_zixia: {
      id: 'q16_return_zixia',
      title: '凯旋归西岳 · 荣膺四阶尊',
      objective:
        '已救出封不弃与高沧云并缴获西夏遗落血书！请护送二人返回【潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿】，向掌门岳沧溟复命受封！',
      nextHint:
        '返回【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】面见四老受封长老之位。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_hsq16_yanta_base',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_main',
      onceFlag: 'hsq16_yanta_base_triggered',
      condition: atStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_base'),
      effects: [openScene('scene_hsq16_06', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'trig_hsq16_yanta_mid',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_east',
      onceFlag: 'hsq16_yanta_mid_triggered',
      condition: atStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_mid'),
      effects: [openScene('scene_hsq16_12', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'trig_hsq16_yanta_top',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_west',
      onceFlag: 'hsq16_yanta_top_triggered',
      condition: atStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_top'),
      effects: [openScene('scene_hsq16_18', HUASHAN_Q16_QUEST_ID)],
    },
  ],
  spotActions: [
    {
      id: 'spot_hsq16_start_hall',
      label: '接阅长安染血急报 · 率精锐驰援大雁塔（开启《雁塔风雷》）',
      badge: '十万火急',
      subtitle: '紫霞正气主殿 · 封高二人在塔遇险',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: HUASHAN_Q16_START_CONDITION,
      effects: [openScene('scene_hsq16_01', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'spot_hsq16_yanta_base',
      label: '率华山精锐突入宝塔底层 · 击破一品堂强弩阵',
      badge: '雁塔破门',
      subtitle: '宝塔底层舍利地宫 · 撕开外围防线',
      tone: 'danger',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_main',
      visibleWhen: atStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_base'),
      effects: [openScene('scene_hsq16_06', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'spot_hsq16_yanta_mid',
      label: '提剑杀入中层回廊 · 破除星宿毒烟阵',
      badge: '血战七层',
      subtitle: '中层回廊浮雕壁画 · 斩断毒炉封锁',
      tone: 'danger',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_east',
      visibleWhen: atStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_mid'),
      effects: [openScene('scene_hsq16_12', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'spot_hsq16_yanta_top',
      label: '跃上七层飞檐 · 死战拓跋烈与星宿长老',
      badge: '飞檐除魔',
      subtitle: '绝顶佛龛凭栏远眺 · 解救封高二人',
      tone: 'danger',
      regionId: 'changan',
      buildingId: 'ca_dayanta',
      spotId: 'ca_dayanta_west',
      visibleWhen: atStep(HUASHAN_Q16_QUEST_ID, 'q16_yanta_top'),
      effects: [openScene('scene_hsq16_18', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'spot_hsq16_return_zixia',
      label: '步入紫霞正气主殿 · 呈报雁塔大捷受封四阶长老',
      badge: '荣膺长老',
      subtitle: '紫霞正气主殿 · 四老联署册封',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q16_QUEST_ID, 'q16_return_zixia'),
      effects: [openScene('scene_hsq16_24', HUASHAN_Q16_QUEST_ID)],
    },
  ],
  npcActions: [
    {
      id: 'act_hsq16_yue_start',
      label: '请命统率精锐星夜驰援长安大雁塔（晋升长老试炼）',
      badge: '雁塔风雷',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
          HUASHAN_Q16_START_CONDITION,
        ],
      },
      effects: [openScene('scene_hsq16_01', HUASHAN_Q16_QUEST_ID)],
    },
    {
      id: 'act_hsq16_yue_investiture',
      label: '呈报慈恩寺大雁塔捷报 · 领受四阶长老册封',
      badge: '荣膺长老',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118'] },
          atStep(HUASHAN_Q16_QUEST_ID, 'q16_return_zixia'),
        ],
      },
      effects: [openScene('scene_hsq16_24', HUASHAN_Q16_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./huashanYantaCrisisQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q16_QUESTS: QuestDefinition[] = [HUASHAN_Q16_QUEST]
