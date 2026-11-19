import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q04_QUEST_ID = 'QST-SECT-11-04'

export const ZHONGNAN_Q04_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-03', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q04_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1055', npcName: '谭处真' },
    { type: 'npcAlive', npcId: 'NPC-0276', npcName: '林弘毅' },
  ],
}

export const ZHONGNAN_Q04_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q04_QUEST_ID,
    title: '北斗璇玑 · 三才归元',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '三流上品 ～ 二流下品',
    maxOpponentRealm: '二流下品（闯山太行悍匪双煞）',
    recommendedNote:
      '十八幕重阳古观前脉首卷真传：归入古观前脉后，于【天罡北斗七星演剑坛】随长真子谭处真、金刀叟林弘毅演练天罡北斗阵法，亲授良品剑法《三才归元剑》；是夜一伙受人暗中指引的太行悍匪摸上山门，你以新成三才归元剑配合北斗星位夜破悍匪！',
    startHint:
      '观墓分途择定【重阳古观前脉】并晋升 Lv.2 内门后，前往【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛】（或寻谭处真、林弘毅）开启演阵授剑。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
    },
    startCondition: ZHONGNAN_Q04_START_CONDITION,
    summary:
      '{reignYear}仲夏，星垂秦岭。你既择定【重阳古观前脉】，便奉命登临【天罡北斗七星演剑坛】，拜见长真子【谭处真】与护法长老【林弘毅】。二位尊长以七星青石为盘，为你拆解天枢至摇光的虚实流转，亲授古观内门镇脉剑法《三才归元剑》。演阵甫成，三更时分忽有太行山悍匪挟火油弯刀夜闯重阳山门！你脚踏北斗步法、剑出天地人三才，于演剑坛星光下独破太行悍匪双煞，保住重阳古观清净道场。',
    initialStepId: 'dipper_night_defense',
    steps: {
      dipper_night_defense: {
        id: 'dipper_night_defense',
        title: '七星演阵 · 夜破太行匪',
        objective:
          '已习得《三才归元剑》！三更将至，请留守【天罡北斗七星演剑坛】，随谭处真、林弘毅布阵截杀夜闯山门的太行悍匪！',
        nextHint: '在【天罡北斗七星演剑坛（zn_to_dipper）】迎战夜闯山门的太行悍匪。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_dipper',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q04_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        onceFlag: 'zn_q04_start_triggered',
        condition: ZHONGNAN_Q04_START_CONDITION,
        effects: [openScene('scene_zn_q04_01', ZHONGNAN_Q04_QUEST_ID)],
      },
      {
        id: 'trig_zn_q04_defense',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        onceFlag: 'zn_q04_defense_triggered',
        condition: atStep(ZHONGNAN_Q04_QUEST_ID, 'dipper_night_defense'),
        effects: [openScene('scene_zn_q04_10', ZHONGNAN_Q04_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q04_start',
        label: '【北斗演阵】登七星演剑坛 · 拜见谭处真与林弘毅',
        badge: '三才归元',
        subtitle: '第一幕 · 天罡北斗七星演剑坛',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        visibleWhen: ZHONGNAN_Q04_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q04_start_triggered', value: true },
          openScene('scene_zn_q04_01', ZHONGNAN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q04_defense',
        label: '【星夜护观】列天罡北斗位 · 迎击闯山太行悍匪',
        badge: '夜破悍匪',
        subtitle: '第十幕 · 天罡北斗七星演剑坛',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        visibleWhen: atStep(ZHONGNAN_Q04_QUEST_ID, 'dipper_night_defense'),
        effects: [
          { type: 'setFlag', flag: 'zn_q04_defense_triggered', value: true },
          openScene('scene_zn_q04_10', ZHONGNAN_Q04_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q04_start',
        label: '请教北斗剑阵 · 习练《三才归元剑》',
        badge: '三才归元',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1055', 'NPC-0276'] },
            ZHONGNAN_Q04_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q04_start_triggered', value: true },
          openScene('scene_zn_q04_01', ZHONGNAN_Q04_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanGuanBigDipperQuest.scenes').then((m) => m.SCENES),
  },
]
