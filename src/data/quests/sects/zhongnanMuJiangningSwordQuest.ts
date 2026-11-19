import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q26_QUEST_ID = 'QST-SECT-11-26'

export const ZHONGNAN_Q26_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-25', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q26_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0155', npcName: '叶孤鸿' },
    { type: 'npcAlive', npcId: 'NPC-0019', npcName: '王安石' },
  ],
}

export const ZHONGNAN_Q26_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q26_QUEST_ID,
  title: '赤壁听涛 · 钟山问剑',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'jiangning',
  recommendedRealm: '一流中品（活死人墓远征卷二）',
  maxOpponentRealm: '一流上品（孤峰剑客叶孤鸿 · 慕容与辽国江南暗探）',
  recommendedNote:
    '二十四幕江南问剑长卷：东下六朝古都江宁府，登临【石头城遗址 · 虎踞赤壁临江试剑台】，向孤峰剑客叶孤鸿递帖问剑，以古墓灵动寒锋印证“至柔克至刚”之无上剑道！试剑惺惺相惜之际，忽闻姑苏慕容暗桩勾结辽国细作潜入十里秦淮，企图刺杀寓居江宁的年轻名士王安石。你与叶孤鸿夜赴【十里秦淮画舫 · 十里秦淮双层鎏金画舫】，于灯火桨声中联手铲除慕容与辽国暗探，护得王安石安然无恙，剑心亦于江南烟雨中臻于澄明！',
  startHint:
    '完成《剑阁猿啼 · 巴山折剑》后，前往【江宁府 · 石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台】向叶孤鸿问剑。',
  startLocation: {
    regionId: 'jiangning',
    buildingId: 'jn2_shitou',
    spotId: 'jn2_st_cliff',
    customLabel: '江宁府 · 石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台',
  },
  startCondition: ZHONGNAN_Q26_START_CONDITION,
  summary:
    '{reignYear}初冬，你自巴蜀顺江东下江宁府，登临【石头城遗址 · 虎踞赤壁临江试剑台】，向剑势孤高凌厉的「孤峰剑客」【叶孤鸿】请教剑道。大江涛声如雷，你以古墓轻灵绵密之剑化解叶孤鸿一往无前的孤峰霸剑，亲身证得“至柔克至刚”之妙理，令叶孤鸿抚剑大赞。随后二人获悉慕容家暗探与辽国细作合谋潜伏秦淮，意欲暗算江宁青年俊彦【王安石】。你与叶孤鸿夜登【十里秦淮双层鎏金画舫】，于画舫飞檐间连斩暗探头目，护得王安石周全，并接获师尊林朝瑶关于万里昆仑采玉的秘信。',
  initialStepId: 'spar_yeguhong',
  steps: {
    spar_yeguhong: {
      id: 'spar_yeguhong',
      title: '虎踞赤壁 · 临江问剑',
      objective:
        '请前往【江宁府 · 石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台】，与孤峰剑客叶孤鸿试剑印证“至柔克至刚”。',
      nextHint: '前往【江宁府 · 石头城遗址 · 虎踞赤壁临江试剑台（jn2_st_cliff）】点击「临江问剑 · 与叶孤鸿试剑论道」。',
      targetLocation: {
        regionId: 'jiangning',
        buildingId: 'jn2_shitou',
        spotId: 'jn2_st_cliff',
        customLabel: '江宁府 · 石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台',
      },
    },
    qinhuai_purge: {
      id: 'qinhuai_purge',
      title: '秦淮夜舫 · 护贤除谍',
      objective:
        '慕容与辽国暗探正潜伏于【江宁府 · 十里秦淮画舫 · 十里秦淮双层鎏金画舫】图谋暗算王安石！请速随叶孤鸿前往画舫铲除暗探！',
      nextHint: '前往【江宁府 · 十里秦淮画舫 · 十里秦淮双层鎏金画舫（jn2_qh_boat）】点击「夜登秦淮画舫 · 护王安石斩暗探」。',
      targetLocation: {
        regionId: 'jiangning',
        buildingId: 'jn2_qinhuai',
        spotId: 'jn2_qh_boat',
        customLabel: '江宁府 · 十里秦淮画舫 · 十里秦淮双层鎏金画舫',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq26_start',
      regionId: 'jiangning',
      buildingId: 'jn2_shitou',
      spotId: 'jn2_st_cliff',
      onceFlag: 'znq26_intro_triggered',
      condition: ZHONGNAN_Q26_START_CONDITION,
      effects: [openScene('scene_znq26_01', ZHONGNAN_Q26_QUEST_ID)],
    },
    {
      id: 'trig_znq26_qinhuai',
      regionId: 'jiangning',
      buildingId: 'jn2_qinhuai',
      spotId: 'jn2_qh_boat',
      onceFlag: 'znq26_qinhuai_triggered',
      condition: atStep(ZHONGNAN_Q26_QUEST_ID, 'qinhuai_purge'),
      effects: [openScene('scene_znq26_12', ZHONGNAN_Q26_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq26_start',
      label: '登虎踞赤壁试剑台 · 向孤峰剑客叶孤鸿问剑',
      badge: '钟山问剑',
      subtitle: '石头城遗址（江南剑庐） · 虎踞赤壁临江试剑台',
      tone: 'jade',
      regionId: 'jiangning',
      buildingId: 'jn2_shitou',
      spotId: 'jn2_st_cliff',
      visibleWhen: ZHONGNAN_Q26_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq26_intro_triggered', value: true },
        openScene('scene_znq26_01', ZHONGNAN_Q26_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq26_qinhuai',
      label: '夜赴秦淮鎏金画舫 · 助叶孤鸿与王安石铲除暗探',
      badge: '秦淮除谍',
      subtitle: '十里秦淮画舫 · 十里秦淮双层鎏金画舫',
      tone: 'danger',
      regionId: 'jiangning',
      buildingId: 'jn2_qinhuai',
      spotId: 'jn2_qh_boat',
      visibleWhen: atStep(ZHONGNAN_Q26_QUEST_ID, 'qinhuai_purge'),
      effects: [
        { type: 'setFlag', flag: 'znq26_qinhuai_triggered', value: true },
        openScene('scene_znq26_12', ZHONGNAN_Q26_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq26_npc_start',
      label: '递帖虎踞赤壁 · 与孤峰剑客叶孤鸿试剑论道',
      badge: '赤壁听涛',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0155', 'NPC-0019'] },
          ZHONGNAN_Q26_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq26_intro_triggered', value: true },
        openScene('scene_znq26_01', ZHONGNAN_Q26_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanMuJiangningSwordQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q26_QUESTS: QuestDefinition[] = [ZHONGNAN_Q26_QUEST]
