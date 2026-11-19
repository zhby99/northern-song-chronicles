import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q02_QUEST_ID = 'QST-SECT-11-02'

export const ZHONGNAN_Q02_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 1 },
    qStatus('QST-SECT-11-01', 'completed'),
    qStatus(ZHONGNAN_Q02_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0802', npcName: '冷帆川' },
    { type: 'npcAlive', npcId: 'NPC-0544', npcName: '褚浪森' },
    { type: 'npcAlive', npcId: 'NPC-0541', npcName: '葛平瑞' },
    { type: 'npcAlive', npcId: 'NPC-0576', npcName: '冷玄远' },
  ],
}

export const ZHONGNAN_Q02_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q02_QUEST_ID,
    title: '子午毒雾 · 长安暗哨',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'changan',
    recommendedRealm: '三流下品 ～ 三流中品',
    maxOpponentRealm: '三流上品（星宿派褚浪森、葛平瑞）',
    recommendedNote:
      '十六幕终南外门下山缉凶长卷：长安终南草堂临风观景轩，古墓外围师兄冷帆川传来急讯，称子午谷外频现星宿毒虫暗记；你赴明德门丝路迎宾栈秘会冷玄远，顺藤摸瓜夜探西市斗茶品香轩，联手破除星宿派褚浪森、葛平瑞潜伏长安的毒虫暗哨！',
    startHint:
      '完成《松风鹤影 · 大道筑基》后，前往【京兆府 · 终南草堂 · 临风观景轩】（或寻冷帆川）接听长安急讯。',
    startLocation: {
      regionId: 'changan',
      buildingId: 'ca_caotang',
      spotId: 'ca_caotang_west',
      customLabel: '京兆府 · 终南草堂 · 临风观景轩',
    },
    startCondition: ZHONGNAN_Q02_START_CONDITION,
    summary:
      '{reignYear}暮春，终南草堂【临风观景轩】忽传急讯。终南外围弟子【冷帆川】追踪腥香木牌线索，发现星宿派已在长安城西暗设毒虫密哨，意图染指子午谷山道与终南丹药商路。你奉命前往【明德门丝路迎宾栈】密会暗桩【冷玄远】，查明贼人以斗茶品香为掩护，在【西市胡商坊 · 斗茶品香轩】炼制腐尸毒粉。你与冷玄远趁夜突袭品香轩，先后力挫星宿好手【褚浪森】与【葛平瑞】，焚毁毒虫密瓮，斩断星宿派伸向终南山的第一条触手！',
    initialStepId: 'inn_meet_lengxuanyuan',
    steps: {
      inn_meet_lengxuanyuan: {
        id: 'inn_meet_lengxuanyuan',
        title: '迎宾密会 · 追踪毒香',
        objective:
          '冷帆川已将腥香线索交予你。请前往【京兆府 · 明德门丝路迎宾栈】，凭终南暗号密会师兄【冷玄远】，摸清星宿暗哨落脚之处。',
        nextHint: '前往【京兆府 · 明德门丝路迎宾栈（changan_base_inn）】。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'changan_base_inn',
          customLabel: '京兆府 · 明德门丝路迎宾栈',
        },
      },
      xishi_raid_outpost: {
        id: 'xishi_raid_outpost',
        title: '西市夜袭 · 破除毒哨',
        objective:
          '已查明星宿派暗哨就藏在【西市胡商坊 · 斗茶品香轩】后院！请前往该处，与冷玄远里应外合，击溃褚浪森与葛平瑞，销毁毒虫密瓮！',
        nextHint: '前往【京兆府 · 西市胡商坊 · 斗茶品香轩（ca_xishi_east）】。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_east',
          customLabel: '京兆府 · 西市胡商坊 · 斗茶品香轩',
        },
      },
      caotang_report_back: {
        id: 'caotang_report_back',
        title: '草堂覆命 · 禀报双脉',
        objective:
          '西市毒虫暗哨已破！请返回【京兆府 · 终南草堂 · 临风观景轩】向【冷帆川】复命。',
        nextHint: '返回【终南草堂 · 临风观景轩（ca_caotang_west）】复命。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_caotang',
          spotId: 'ca_caotang_west',
          customLabel: '京兆府 · 终南草堂 · 临风观景轩',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q02_start',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        onceFlag: 'zn_q02_start_triggered',
        condition: ZHONGNAN_Q02_START_CONDITION,
        effects: [openScene('scene_zn_q02_01', ZHONGNAN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_zn_q02_inn',
        regionId: 'changan',
        buildingId: 'changan_base_inn',
        onceFlag: 'zn_q02_inn_triggered',
        condition: atStep(ZHONGNAN_Q02_QUEST_ID, 'inn_meet_lengxuanyuan'),
        effects: [openScene('scene_zn_q02_05', ZHONGNAN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_zn_q02_xishi',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        onceFlag: 'zn_q02_xishi_triggered',
        condition: atStep(ZHONGNAN_Q02_QUEST_ID, 'xishi_raid_outpost'),
        effects: [openScene('scene_zn_q02_09', ZHONGNAN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_zn_q02_report',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        onceFlag: 'zn_q02_report_triggered',
        condition: atStep(ZHONGNAN_Q02_QUEST_ID, 'caotang_report_back'),
        effects: [openScene('scene_zn_q02_15', ZHONGNAN_Q02_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q02_start',
        label: '【子午急讯】会见冷帆川 · 查探长安星宿暗哨',
        badge: '子午毒雾',
        subtitle: '第一幕 · 终南草堂临风观景轩',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: ZHONGNAN_Q02_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q02_start_triggered', value: true },
          openScene('scene_zn_q02_01', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q02_inn',
        label: '【迎宾密会】对暗号会见冷玄远 · 锁定星宿窝点',
        badge: '迎宾暗桩',
        subtitle: '第五幕 · 明德门丝路迎宾栈',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'changan_base_inn',
        visibleWhen: atStep(ZHONGNAN_Q02_QUEST_ID, 'inn_meet_lengxuanyuan'),
        effects: [
          { type: 'setFlag', flag: 'zn_q02_inn_triggered', value: true },
          openScene('scene_zn_q02_05', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q02_xishi',
        label: '【夜袭品香轩】破除褚浪森、葛平瑞星宿毒虫暗哨',
        badge: '破除毒哨',
        subtitle: '第九幕 · 西市斗茶品香轩',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        visibleWhen: atStep(ZHONGNAN_Q02_QUEST_ID, 'xishi_raid_outpost'),
        effects: [
          { type: 'setFlag', flag: 'zn_q02_xishi_triggered', value: true },
          openScene('scene_zn_q02_09', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q02_report',
        label: '【草堂覆命】向冷帆川呈报西市除毒经过',
        badge: '长安靖安',
        subtitle: '第十五幕 · 终南草堂临风观景轩',
        tone: 'gold',
        regionId: 'changan',
        buildingId: 'ca_caotang',
        spotId: 'ca_caotang_west',
        visibleWhen: atStep(ZHONGNAN_Q02_QUEST_ID, 'caotang_report_back'),
        effects: [
          { type: 'setFlag', flag: 'zn_q02_report_triggered', value: true },
          openScene('scene_zn_q02_15', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q02_start',
        label: '询问子午谷毒香异动 · 接领长安暗哨缉查',
        badge: '子午毒雾',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0802'] },
            ZHONGNAN_Q02_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q02_start_triggered', value: true },
          openScene('scene_zn_q02_01', ZHONGNAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q02_inn',
        label: '以终南暗语相认 · 商议夜袭西市毒哨',
        badge: '迎宾密会',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0576'] },
            atStep(ZHONGNAN_Q02_QUEST_ID, 'inn_meet_lengxuanyuan'),
          ],
        },
        effects: [openScene('scene_zn_q02_05', ZHONGNAN_Q02_QUEST_ID)],
      },
      {
        id: 'act_zn_q02_report',
        label: '禀报西市斗茶品香轩清剿毒虫暗哨结果',
        badge: '草堂覆命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0802'] },
            atStep(ZHONGNAN_Q02_QUEST_ID, 'caotang_report_back'),
          ],
        },
        effects: [openScene('scene_zn_q02_15', ZHONGNAN_Q02_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanZiwuScoutQuest.scenes').then((m) => m.SCENES),
  },
]
