import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q16_QUEST_ID = 'QST-SECT-11-16'

export const ZHONGNAN_Q16_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-15', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q16_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
  ],
}

export const ZHONGNAN_Q16_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q16_QUEST_ID,
    title: '寒潭孤影 · 誓词问情',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流下品（湘西五溪蛊师 / 痴狂世家剑客）',
    recommendedNote:
      '终南古墓真传心性试炼（全二十幕）。于终南后山寒玉涧临水抚琴榭陪伴冷清秋抚琴静心，忽遭痴狂世家剑客与湘西五溪蛊师强闯禁地！连退二敌后，寒玉仙子林朝瑶于寒潭石室以古墓祖训问心：抉择「冰心止水」或「情深不悔」（影响后续心境标记 zn_mu_heart）。',
    startHint:
      '晋升古墓真传并完成《烟波试剑 · 越女惊鸿》后，前往【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭】寻师姐【冷清秋】听琴论心。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
    },
    startCondition: ZHONGNAN_Q16_START_CONDITION,
    summary:
      '{reignYear}深秋，你晋升古墓真传后与师姐【冷清秋】共赴【终南后山寒玉涧 · 寒玉涧临水抚琴榭】听琴静心。不料竟有一名执念痴狂的世家剑客携湘西五溪蛊师强闯禁地，妄图以蛊惑心、强掳古墓传人！你与冷清秋并肩连破剑客与蛊师。风波平息后，寒玉仙子【林朝瑶】于寒玉石室召见于你，以古墓流传百年的断情誓词考问本心——究竟是绝情弃爱守「冰心止水」，抑或执情无悔行「情深不悔」，皆在你一念之间！',
    initialStepId: 'qin_pavilion_crisis',
    steps: {
      qin_pavilion_crisis: {
        id: 'qin_pavilion_crisis',
        title: '抚琴惊变 · 剑退痴客',
        objective:
          '痴狂世家剑客与湘西五溪蛊师强闯【寒玉涧临水抚琴榭】！请护在冷清秋身前，击退两名狂徒！',
        nextHint:
          '在【终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】击退痴狂世家剑客与湘西五溪蛊师。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_qin',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
        },
      },
      jadebed_heart_vow: {
        id: 'jadebed_heart_vow',
        title: '寒潭问心 · 誓词抉择',
        objective:
          '已击退强闯禁地的世家剑客与五溪蛊师！请返回【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】面见师父林朝瑶，回答古墓誓词问心！',
        nextHint:
          '前往【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，接受林朝瑶问心。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tomb',
          spotId: 'zn_tb_jadebed',
          customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq16_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        onceFlag: 'zn_q16_start_triggered',
        condition: ZHONGNAN_Q16_START_CONDITION,
        effects: [openScene('scene_znq16_01', ZHONGNAN_Q16_QUEST_ID)],
      },
      {
        id: 'trig_znq16_vow',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q16_vow_triggered',
        condition: atStep(ZHONGNAN_Q16_QUEST_ID, 'jadebed_heart_vow'),
        effects: [openScene('scene_znq16_12', ZHONGNAN_Q16_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq16_start',
        label: '【誓词问情】步入临水抚琴榭 · 听冷清秋抚琴护幽谷',
        badge: '古墓真传',
        subtitle: '第一幕 · 寒玉涧临水抚琴榭',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        visibleWhen: ZHONGNAN_Q16_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q16_start_triggered', value: true },
          openScene('scene_znq16_01', ZHONGNAN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq16_vow',
        label: '【誓词问情】入冰魄石室 · 聆听林朝瑶誓词问心',
        badge: '寒潭问心',
        subtitle: '第十二幕 · 昆仑寒玉床冰魄石室',
        tone: 'primary',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: atStep(ZHONGNAN_Q16_QUEST_ID, 'jadebed_heart_vow'),
        effects: [
          { type: 'setFlag', flag: 'zn_q16_vow_triggered', value: true },
          openScene('scene_znq16_12', ZHONGNAN_Q16_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq16_start',
        label: '【誓词问情】邀冷清秋师姐同赴寒玉涧抚琴榭',
        badge: '古墓真传',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q16_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0173'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q16_start_triggered', value: true },
          openScene('scene_znq16_01', ZHONGNAN_Q16_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuColdPoolVowQuest.scenes').then((m) => m.SCENES),
  },
]
