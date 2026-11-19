import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q37_QUEST_ID = 'QST-SECT-11-37'

export const ZHONGNAN_Q37_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    {
      type: 'any',
      conditions: [
        qStatus('QST-SECT-11-33', 'completed'),
        qStatus('QST-SECT-11-35', 'completed'),
      ],
    },
    flag('zn_cross', 'eq', 'harmony'),
    flag('zn_ending', 'falsy'),
    qStatus(ZHONGNAN_Q37_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
  ],
}

export const zhongnanEndingTwinSwordMasterQuest: QuestDefinition = {
  id: ZHONGNAN_Q37_QUEST_ID,
  title: '太乙仙侣 · 双剑共主',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师双绝（紫阳真人 · 王重楼 / 寒玉仙子 · 林朝瑶 · 双剑考校）',
  recommendedNote:
    '终南隐宗四大终局之一【双剑共主大团圆线】（全三十四幕，与其余三大终局严格互斥）。须完成《QST-SECT-11-33》或《QST-SECT-11-35》且处于道墓合流线。王重楼与林朝瑶于寒玉涧临水抚琴榭决意偕隐江湖，于双剑合璧坪联手考校后为你补齐另一脉镇派神兵（绝不重复发放），正式授你为宗门五阶【终南两仪总宗主】！',
  startHint:
    '完成《QST-SECT-11-33》或《QST-SECT-11-35》且处于道墓合流线后，前往【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】即可开启大团圆终局。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_qin',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
  },
  startCondition: ZHONGNAN_Q37_START_CONDITION,
  summary:
    '{reignYear}暮春，终南寒玉涧花飞如雪。道墓合流之后，昔年横亘二十余载的心墙早已化作绕指柔情。紫阳真人【王重楼】与寒玉仙子【林朝瑶】于【寒玉涧临水抚琴榭】琴箫合奏一曲《太乙仙侣》，向你吐露功成身退、携手偕隐天涯之愿。二人邀你移步【繁花幽谷双剑合璧坪】，以双剑联手之势作最后一次宗师印证，旋即在马钰玄、冷清秋与两脉数百弟子见证下，为你补齐重阳与古墓另一脉镇派神兵，共尊你为【终南两仪总宗主】！王林二人终得圆满，携手踏云而去，留一段太乙仙侣千古佳话！',
  initialStepId: 'twinsword_joint_trial',
  steps: {
    twinsword_joint_trial: {
      id: 'twinsword_joint_trial',
      title: '双剑坪前 · 二老印证',
      objective:
        '王重楼与林朝瑶已决意携手偕隐，将终南两脉合而为一托付予你。请移步【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，接受两位宗师联手试剑印证！',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，点击「赴双剑合璧坪 · 接王重楼与林朝瑶联手试剑」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    twinsword_enthronement: {
      id: 'twinsword_enthronement',
      title: '两仪归宗 · 双剑共主',
      objective:
        '两位宗师对你大为赞赏！请留在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，在道墓两脉弟子齐聚见证下承接两脉神兵，登位终南两仪总宗主，并恭送王林二老偕隐！',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「双剑合鸣 · 登位终南两仪总宗主」。',
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
      id: 'trig_znq37_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      onceFlag: 'zn_q37_start_triggered',
      condition: ZHONGNAN_Q37_START_CONDITION,
      effects: [openScene('scene_znq37_01', ZHONGNAN_Q37_QUEST_ID)],
    },
    {
      id: 'trig_znq37_trial',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q37_trial_triggered',
      condition: atStep(ZHONGNAN_Q37_QUEST_ID, 'twinsword_joint_trial'),
      effects: [openScene('scene_znq37_10', ZHONGNAN_Q37_QUEST_ID)],
    },
    {
      id: 'trig_znq37_enthrone',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q37_enthrone_triggered',
      condition: atStep(ZHONGNAN_Q37_QUEST_ID, 'twinsword_enthronement'),
      effects: [openScene('scene_znq37_19', ZHONGNAN_Q37_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq37_start',
      label: '【终南终局 · 双剑共主】赴寒玉涧抚琴榭 · 听王林琴箫吐露偕隐之志',
      badge: '双剑共主',
      subtitle: '第一幕 · 道墓合流大团圆终局，王重楼与林朝瑶携手托付两脉',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      visibleWhen: ZHONGNAN_Q37_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q37_start_triggered', value: true },
        openScene('scene_znq37_01', ZHONGNAN_Q37_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq37_trial',
      label: '【双剑共主】赴双剑合璧坪 · 接王重楼与林朝瑶联手试剑',
      badge: '二老试剑',
      subtitle: '第十幕 · 宗师双绝联手切磋，印证两仪合流无上剑意',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q37_QUEST_ID, 'twinsword_joint_trial'),
      effects: [
        { type: 'setFlag', flag: 'zn_q37_trial_triggered', value: true },
        openScene('scene_znq37_10', ZHONGNAN_Q37_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq37_enthrone',
      label: '【双剑共主】双剑合鸣 · 登位终南两仪总宗主',
      badge: '两仪总宗主',
      subtitle: '第十九幕 · 补齐另一脉神兵，恭送太乙仙侣偕隐，晋升五阶总宗主',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q37_QUEST_ID, 'twinsword_enthronement'),
      effects: [
        { type: 'setFlag', flag: 'zn_q37_enthrone_triggered', value: true },
        openScene('scene_znq37_19', ZHONGNAN_Q37_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq37_start_npc',
      label: '拜谒王林二老 · 赴寒玉涧抚琴榭共议双剑归宗',
      badge: '双剑共主',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-0114'] },
          ZHONGNAN_Q37_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q37_start_triggered', value: true },
        openScene('scene_znq37_01', ZHONGNAN_Q37_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanEndingTwinSwordMasterQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q37_QUESTS: QuestDefinition[] = [zhongnanEndingTwinSwordMasterQuest]
