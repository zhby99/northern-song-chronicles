import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q21_QUEST_ID = 'QST-SECT-11-21'

export const ZHONGNAN_Q21_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-20', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q21_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1058', npcName: '郝大玄' },
    { type: 'npcAlive', npcId: 'NPC-0046', npcName: '邵雍' },
  ],
}

export const ZHONGNAN_Q21_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q21_QUEST_ID,
  title: '皇极经世 · 洛阳问数',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'luoyang',
  recommendedRealm: '一流下品 ～ 一流中品（重阳古观远征卷一）',
  maxOpponentRealm: '一流下品（辽国南院密探首领 · 契丹死士）',
  recommendedNote:
    '二十幕古观远征首卷：奉王重楼密令，随广宁子郝大玄东赴西京洛阳【白马书院 · 垂柳荷池手谈水亭】，拜访当世象数大儒邵雍先生，借《皇极经世》先天易数推演重阳古观「天罡北斗阵」七星阵眼之变！岂料辽国南院密探早已潜伏洛阳，企图在【洛水天津酒楼】半路截杀夺取阵图密算——你与郝大玄以易理破杀机，于洛水夜色中连挫契丹细作，携完整阵眼推演密录凯旋！',
  startHint:
    '完成《寒涧残碑 · 三十载赌约》（古观路线）后，前往洛阳府【白马书院 · 垂柳荷池手谈水亭】拜访邵雍，或寻郝大玄启程。',
  startLocation: {
    regionId: 'luoyang',
    buildingId: 'ly_shuyuan',
    spotId: 'ly_sy_pavilion',
    customLabel: '洛阳府 · 白马书院（洛学讲席） · 垂柳荷池手谈水亭',
  },
  startCondition: ZHONGNAN_Q21_START_CONDITION,
  summary:
    '{reignYear}深秋，你随重阳古观广宁子【郝大玄】东赴西京洛阳，于【白马书院 · 垂柳荷池手谈水亭】拜谒当世象数宗师【邵雍】。一局手谈间，邵雍以先天八卦与《皇极经世》元会运世之数，点破「天罡北斗阵」天枢转承的细微滞涩，令古观七星剑阵臻于化境。不料辽国南院细作闻风而至，在【洛水天津酒楼】设下毒酒暗伏企图劫夺易数阵图。你与郝大玄识破诡计、连斩密探首领，护得先天阵眼密录周全，并从细作怀中搜出辽夏密谋关中边防的蛛丝马迹。',
  initialStepId: 'visit_shaoyong',
  steps: {
    visit_shaoyong: {
      id: 'visit_shaoyong',
      title: '东赴洛阳 · 水亭问数',
      objective:
        '请前往【洛阳府 · 白马书院 · 垂柳荷池手谈水亭】，随郝大玄拜访大儒邵雍，请教先天易数与天罡北斗阵眼变化。',
      nextHint: '前往【洛阳府 · 白马书院 · 垂柳荷池手谈水亭（ly_sy_pavilion）】点击「拜谒邵雍 · 推演天罡阵眼」。',
      targetLocation: {
        regionId: 'luoyang',
        buildingId: 'ly_shuyuan',
        spotId: 'ly_sy_pavilion',
        customLabel: '洛阳府 · 白马书院（洛学讲席） · 垂柳荷池手谈水亭',
      },
    },
    luoshui_ambush: {
      id: 'luoshui_ambush',
      title: '天津夜雨 · 截杀辽探',
      objective:
        '天罡阵眼密录已成，辽国南院密探却尾随至【洛阳府 · 洛水天津酒楼】设伏拦截！请火速赴酒楼破敌灭谍！',
      nextHint: '前往【洛阳府 · 洛水天津酒楼（luoyang_base_tavern）】点击「夜赴天津酒楼 · 截杀辽国南院密探」。',
      targetLocation: {
        regionId: 'luoyang',
        buildingId: 'luoyang_base_tavern',
        customLabel: '洛阳府 · 洛水天津酒楼',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq21_start',
      regionId: 'luoyang',
      buildingId: 'ly_shuyuan',
      spotId: 'ly_sy_pavilion',
      onceFlag: 'znq21_intro_triggered',
      condition: ZHONGNAN_Q21_START_CONDITION,
      effects: [openScene('scene_znq21_01', ZHONGNAN_Q21_QUEST_ID)],
    },
    {
      id: 'trig_znq21_tavern',
      regionId: 'luoyang',
      buildingId: 'luoyang_base_tavern',
      onceFlag: 'znq21_tavern_triggered',
      condition: atStep(ZHONGNAN_Q21_QUEST_ID, 'luoshui_ambush'),
      effects: [openScene('scene_znq21_11', ZHONGNAN_Q21_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq21_start',
      label: '随郝大玄拜谒邵雍 · 推演天罡北斗阵眼',
      badge: '洛阳问数',
      subtitle: '白马书院 · 垂柳荷池手谈水亭',
      tone: 'jade',
      regionId: 'luoyang',
      buildingId: 'ly_shuyuan',
      spotId: 'ly_sy_pavilion',
      visibleWhen: ZHONGNAN_Q21_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq21_intro_triggered', value: true },
        openScene('scene_znq21_01', ZHONGNAN_Q21_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq21_tavern',
      label: '夜赴洛水天津酒楼 · 截杀辽国南院密探',
      badge: '洛水破谍',
      subtitle: '洛阳府 · 洛水天津酒楼',
      tone: 'danger',
      regionId: 'luoyang',
      buildingId: 'luoyang_base_tavern',
      visibleWhen: atStep(ZHONGNAN_Q21_QUEST_ID, 'luoshui_ambush'),
      effects: [
        { type: 'setFlag', flag: 'znq21_tavern_triggered', value: true },
        openScene('scene_znq21_11', ZHONGNAN_Q21_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq21_npc_start',
      label: '奉命东赴洛阳问数 · 拜谒邵雍先生',
      badge: '皇极经世',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-1058', 'NPC-0046'] },
          ZHONGNAN_Q21_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq21_intro_triggered', value: true },
        openScene('scene_znq21_01', ZHONGNAN_Q21_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanGuanLuoyangYijingQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q21_QUESTS: QuestDefinition[] = [ZHONGNAN_Q21_QUEST]
