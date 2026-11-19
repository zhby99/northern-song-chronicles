import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE05_QUEST_ID = 'QST-SECT-05-SIDE-05'

export const HUASHAN_SIDE05_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-03', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus(HUASHAN_SIDE05_QUEST_ID, 'not_started'),
    flag('hs_branch', 'eq', 'qi'),
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'shichenIn', indices: [9, 10, 11, 0, 1], label: '夜间（戌时至丑时）' },
  ],
}

export const HUASHAN_SIDE05_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE05_QUEST_ID,
    title: '紫气丹炉 · 朝阳守火记',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流中品 ～ 二流上品',
    maxOpponentRealm: '二流上品（星宿派盗药恶徒 · 腐骨手阴九）',
    recommendedNote:
      '华山气宗专属 Lv.2 内门支线（全十幕）。需拜入气宗并完成分脉筑基后，于夜间前往东峰紫气迎曦石坪丹房受大师兄高沧云之邀共守冬至「太岳紫阳丹炉」三夜。第三夜风雪交加，高沧云巡山之际，两名星宿派毒徒潜入丹房盗丹投毒，你须于方寸丹室力毙二贼、护得宝丹功成。',
    startHint:
      '拜入华山气宗并完成前置师门历练后，于夜间（戌时至丑时）前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】寻高沧云即可触发。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
    },
    startCondition: HUASHAN_SIDE05_START_CONDITION,
    summary:
      '{reignYear}寒冬将至，华山气宗于【玉女峰紫霞道观 · 东峰紫气迎曦石坪丹房】开炉炼制一甲子方得几枚的「太岳紫阳丹」。大师兄【高沧云】见你内息醇厚、气脉绵长，邀你共守丹炉三昼夜，以纯阳真气温养火候。第三夜大雪纷飞，高沧云外出巡查东峰外围暗哨之际，两名久伏关中的西域星宿派毒功恶徒竟悄然撬开丹房侧窗，企图盗取宝丹并以腐毒污毁丹炉。你在方寸丹室之中寸步不退，运使《养吾剑法》与《华山混元掌》力毙二恶徒，保住丹火不熄。黎明丹成出炉，掌门【岳沧溟】与高沧云大喜过望，赐下御府珍藏上品良药嘉勉。',
    initialStepId: 'guard_third_night',
    steps: {
      guard_third_night: {
        id: 'guard_third_night',
        title: '雪夜守炉 · 静候丹成',
        objective:
          '已与大师兄高沧云同守紫阳丹炉两夜！今夜乃成丹最紧要的第三夜，大雪封山、大师兄外出巡崖，请坐镇【东峰紫气迎曦石坪（tg_zx_terrace）】丹房运功控火、严防宵小！',
        nextHint:
          '在【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】点击「雪夜独守太岳紫阳丹炉 · 运功温火」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪丹房',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss05_start_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hs_side05_start_triggered',
        condition: HUASHAN_SIDE05_START_CONDITION,
        effects: [openScene('scene_hss05_01', HUASHAN_SIDE05_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss05_start_terrace',
        label: '【华山气宗】应高沧云之邀 · 共守东峰紫阳丹炉',
        badge: '朝阳守火',
        subtitle: '气宗专属 · 夜间 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: HUASHAN_SIDE05_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_side05_start_triggered', value: true },
          openScene('scene_hss05_01', HUASHAN_SIDE05_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss05_guard_furnace',
        label: '【华山气宗】雪夜独守太岳紫阳丹炉 · 运功温火',
        badge: '护炉斩毒',
        subtitle: '第三夜 · 东峰丹房',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_SIDE05_QUEST_ID, 'guard_third_night'),
        effects: [openScene('scene_hss05_05', HUASHAN_SIDE05_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_hss05_start_npc',
        label: '协助大师兄高沧云看守冬至太岳紫阳丹炉',
        badge: '朝阳守火',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0202'] },
            HUASHAN_SIDE05_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_side05_start_triggered', value: true },
          openScene('scene_hss05_01', HUASHAN_SIDE05_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideQiFurnaceQuest.scenes').then((m) => m.SCENES),
  },
]
