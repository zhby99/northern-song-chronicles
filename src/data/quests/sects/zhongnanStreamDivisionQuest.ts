import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q03_QUEST_ID = 'QST-SECT-11-03'

export const ZHONGNAN_Q03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 1 },
    qStatus('QST-SECT-11-02', 'completed'),
    qStatus(ZHONGNAN_Q03_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
  ],
}

export const ZHONGNAN_Q03_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q03_QUEST_ID,
    title: '寒涧试剑 · 观墓分途',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '三流中品 ～ 三流上品',
    maxOpponentRealm: '三流上品（终南外门三杰连战）',
    recommendedNote:
      '二十二幕终南隐宗 Lv.1 晋升 Lv.2 内门分宗核心大戏！于终南后山寒玉涧【繁花幽谷双剑合璧坪】在紫阳真人王重楼、寒玉仙子林朝瑶及丘处玄、冷清秋见证下，连挫三名外门同侪夺魁，晋升【内门弟子】，获赐终南寒泉道剑（WPN-051）、终南青布道袍（ARM-022）、终南青玉道冠佩（ACC-024），并作出不可逆的【重阳古观前脉】或【活死人墓后脉】分途抉择！',
    startHint:
      '完成《子午毒雾 · 长安暗哨》后，前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪】（或寻王重楼、林朝瑶、丘处玄、冷清秋）参加寒涧试剑大比。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
    },
    startCondition: ZHONGNAN_Q03_START_CONDITION,
    summary:
      '{reignYear}夏初，终南后山寒玉涧繁花如雪。紫阳真人【王重楼】与寒玉仙子【林朝瑶】联袂出关，偕长春子【丘处玄】、幽谷素女【冷清秋】坐镇【繁花幽谷双剑合璧坪】，亲主外门升堂试剑大比。你提剑登坪，先后力挫道脉新秀沈清扬、幽谷巧剑苏映雪与外门第一人赵玄明，三战全胜拔得头筹，晋升终南隐宗【Lv.2 内门弟子】，获赐终南寒泉道剑、青布道袍与青玉道冠佩！大比既罢，双宗师当众昭示「重阳古观 · 济世玄门」与「活死人墓 · 幽谷冰魄」百年双脉法统，你于寒涧明月下立誓择定终身传承！',
    initialStepId: 'stream_three_duels',
    steps: {
      stream_three_duels: {
        id: 'stream_three_duels',
        title: '双剑合璧坪 · 连战三杰',
        objective:
          '寒涧试剑大比已鸣磬启幕！请在【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】连胜三名外门同侪，夺取内门魁首之位！',
        nextHint: '在【繁花幽谷双剑合璧坪（zn_st_sword）】迎战三轮外门切磋。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_sword',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
        },
      },
      branch_division_oath: {
        id: 'branch_division_oath',
        title: '双尊临坪 · 观墓分途',
        objective:
          '已三战全胜晋升内门并获赐全套终南披挂！请在【繁花幽谷双剑合璧坪】面见王重楼与林朝瑶，择定【重阳古观前脉】或【活死人墓后脉】（此抉择不可逆）！',
        nextHint: '在【繁花幽谷双剑合璧坪（zn_st_sword）】完成观墓分途立誓。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_sword',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q03_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        onceFlag: 'zn_q03_start_triggered',
        condition: ZHONGNAN_Q03_START_CONDITION,
        effects: [openScene('scene_zn_q03_01', ZHONGNAN_Q03_QUEST_ID)],
      },
      {
        id: 'trig_zn_q03_duels',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        onceFlag: 'zn_q03_duels_triggered',
        condition: atStep(ZHONGNAN_Q03_QUEST_ID, 'stream_three_duels'),
        effects: [openScene('scene_zn_q03_04', ZHONGNAN_Q03_QUEST_ID)],
      },
      {
        id: 'trig_zn_q03_oath',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        onceFlag: 'zn_q03_oath_triggered',
        condition: atStep(ZHONGNAN_Q03_QUEST_ID, 'branch_division_oath'),
        effects: [openScene('scene_zn_q03_15', ZHONGNAN_Q03_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q03_start',
        label: '【寒涧试剑】登双剑合璧坪 · 参加终南外门升堂大比',
        badge: '寒涧大比',
        subtitle: '第一幕 · 繁花幽谷双剑合璧坪',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        visibleWhen: ZHONGNAN_Q03_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q03_start_triggered', value: true },
          openScene('scene_zn_q03_01', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q03_duels',
        label: '【三轮校剑】拔剑入坪 · 连战外门三杰',
        badge: '连战三杰',
        subtitle: '第四幕 · 繁花幽谷双剑合璧坪',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        visibleWhen: atStep(ZHONGNAN_Q03_QUEST_ID, 'stream_three_duels'),
        effects: [
          { type: 'setFlag', flag: 'zn_q03_duels_triggered', value: true },
          openScene('scene_zn_q03_04', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q03_oath',
        label: '【观墓分途】拜见双宗师 · 择定重阳古观或活死人墓',
        badge: '观墓分途',
        subtitle: '第十五幕 · 不可逆师承抉择',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        visibleWhen: atStep(ZHONGNAN_Q03_QUEST_ID, 'branch_division_oath'),
        effects: [
          { type: 'setFlag', flag: 'zn_q03_oath_triggered', value: true },
          openScene('scene_zn_q03_15', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q03_start',
        label: '禀请参加【寒涧试剑 · 观墓分途】外门升堂大比',
        badge: '寒涧大比',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-0114', 'NPC-0216', 'NPC-0173'] },
            ZHONGNAN_Q03_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q03_start_triggered', value: true },
          openScene('scene_zn_q03_01', ZHONGNAN_Q03_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q03_oath',
        label: '肃容稽首 · 聆听观墓分途并择定脉络',
        badge: '观墓分途',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-0114', 'NPC-0216', 'NPC-0173'] },
            atStep(ZHONGNAN_Q03_QUEST_ID, 'branch_division_oath'),
          ],
        },
        effects: [openScene('scene_zn_q03_15', ZHONGNAN_Q03_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanStreamDivisionQuest.scenes').then((m) => m.SCENES),
  },
]
