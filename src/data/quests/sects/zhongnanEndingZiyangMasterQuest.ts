import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q36_QUEST_ID = 'QST-SECT-11-36'

export const ZHONGNAN_Q36_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-33', 'completed'),
    flag('zn_cross', 'eq', 'split'),
    flag('zn_ending', 'falsy'),
    qStatus(ZHONGNAN_Q36_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
  ],
}

export const zhongnanEndingZiyangMasterQuest: QuestDefinition = {
  id: ZHONGNAN_Q36_QUEST_ID,
  title: '玄门正统 · 紫阳掌教',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师上品（紫阳真人 · 王重楼 · 传印考校）',
  recommendedNote:
    '终南隐宗四大终局之一【紫阳掌教线】（全三十幕，与其余三大终局严格互斥）。须完成《QST-SECT-11-33》且处于道墓决裂线。于重阳玄门清修主殿承接紫阳真人王重楼云游传印之托，于七星演剑坛印证宗师剑道，在马钰玄、丘处玄等全真七子见证下正式继任宗门五阶【重阳掌教真人】！',
  startHint:
    '完成《QST-SECT-11-33》且处于道墓决裂线后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】即可开启终局。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q36_START_CONDITION,
  summary:
    '{reignYear}仲春，终南山万松叠翠。塞北之战既捷，重阳古观声望如日中天，而紫阳真人【王重楼】却已萌生退隐云游之志。他于【重阳玄门清修主殿】召见你与全真七子，直言玄门正统当以纯阳孤峰之骨立于天下，并邀你赴【天罡北斗七星演剑坛】作最后一次宗师演武印证。剑气纵横之间，你以大成之先天功与七星神剑令王重楼击节叹服。翌晨三清像前，马钰玄、丘处玄率满观道众稽首见证，王重楼亲授紫阳掌教玉印后芒鞋竹杖云游四海，你正式登位【重阳掌教真人】！',
  initialStepId: 'dipper_master_trial',
  steps: {
    dipper_master_trial: {
      id: 'dipper_master_trial',
      title: '演剑印证 · 宗师试锋',
      objective:
        '王重楼决意云游四海、将重阳掌教大位托付于你，但在授印之前，请赴【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛（zn_to_dipper）】与师父作最后一次演武印证！',
      nextHint:
        '前往【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛（zn_to_dipper）】，点击「登七星演剑坛 · 与紫阳真人王重楼演武印证」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
      },
    },
    ziyang_enthronement: {
      id: 'ziyang_enthronement',
      title: '紫阳传印 · 登位掌教',
      objective:
        '演剑印证已得师父高度赞许。请返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，在全真七子与满观道众见证下承接紫阳掌教玉印，正式继任重阳掌教真人！',
      nextHint:
        '返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，点击「三清像前受印 · 继任重阳掌教真人」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq36_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q36_start_triggered',
      condition: ZHONGNAN_Q36_START_CONDITION,
      effects: [openScene('scene_znq36_01', ZHONGNAN_Q36_QUEST_ID)],
    },
    {
      id: 'trig_znq36_trial',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      onceFlag: 'zn_q36_trial_triggered',
      condition: atStep(ZHONGNAN_Q36_QUEST_ID, 'dipper_master_trial'),
      effects: [openScene('scene_znq36_09', ZHONGNAN_Q36_QUEST_ID)],
    },
    {
      id: 'trig_znq36_enthrone',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q36_enthrone_triggered',
      condition: atStep(ZHONGNAN_Q36_QUEST_ID, 'ziyang_enthronement'),
      effects: [openScene('scene_znq36_18', ZHONGNAN_Q36_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq36_start',
      label: '【终南终局 · 紫阳掌教】谒见王重楼 · 聆听云游传印之议',
      badge: '紫阳掌教',
      subtitle: '第一幕 · 孤峰玄门终局，紫阳真人决意传印云游四海',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q36_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q36_start_triggered', value: true },
        openScene('scene_znq36_01', ZHONGNAN_Q36_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq36_trial',
      label: '【紫阳掌教】登七星演剑坛 · 与紫阳真人王重楼演武印证',
      badge: '演剑印证',
      subtitle: '第九幕 · 宗师切磋考校，印证先天一炁与七星剑道',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      visibleWhen: atStep(ZHONGNAN_Q36_QUEST_ID, 'dipper_master_trial'),
      effects: [
        { type: 'setFlag', flag: 'zn_q36_trial_triggered', value: true },
        openScene('scene_znq36_09', ZHONGNAN_Q36_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq36_enthrone',
      label: '【紫阳掌教】三清像前受印 · 继任重阳掌教真人',
      badge: '登位掌教',
      subtitle: '第十八幕 · 全真七子稽首见证，晋升终南隐宗五阶掌教',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: atStep(ZHONGNAN_Q36_QUEST_ID, 'ziyang_enthronement'),
      effects: [
        { type: 'setFlag', flag: 'zn_q36_enthrone_triggered', value: true },
        openScene('scene_znq36_18', ZHONGNAN_Q36_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq36_wang_start',
      label: '面谒紫阳真人 · 承接重阳古观掌教传印大典',
      badge: '紫阳掌教',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133'] },
          ZHONGNAN_Q36_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q36_start_triggered', value: true },
        openScene('scene_znq36_01', ZHONGNAN_Q36_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanEndingZiyangMasterQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q36_QUESTS: QuestDefinition[] = [zhongnanEndingZiyangMasterQuest]
