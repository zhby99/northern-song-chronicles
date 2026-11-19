import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q29_QUEST_ID = 'QST-SECT-11-29'

export const ZHONGNAN_Q29_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 4 },
    {
      type: 'any',
      hint: '必修前置：荣膺古观长老（QST-SECT-11-24）或古墓护法尊使（QST-SECT-11-28）',
      conditions: [
        qStatus('QST-SECT-11-24', 'completed'),
        qStatus('QST-SECT-11-28', 'completed'),
      ],
    },
    qStatus(ZHONGNAN_Q29_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0084', npcName: '没藏讹庞' },
    { type: 'npcAlive', npcId: 'NPC-1053', npcName: '段延庆' },
    { type: 'npcAlive', npcId: 'NPC-0130', npcName: '赫连霸先' },
  ],
}

export const ZHONGNAN_Q29_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q29_QUEST_ID,
  title: '贺兰黑云 · 一品叩关',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '一流上品 ～ 宗师下品（终南隐宗西夏大劫主线 · 终极分流前夜）',
  maxOpponentRealm: '宗师中品（恶贯满盈段延庆 · 铁鹞大将军赫连霸先撑招破围）',
  recommendedNote:
    '三十幕终南隐宗生死大劫长卷：西夏国相没藏讹庞恼羞成怒，亲遣一品堂两大绝顶宗师——「恶贯满盈」段延庆与「铁鹞大将军」赫连霸先，携奇毒「悲酥清风露」与千名西夏死士夜袭终南山！毒雾弥漫【重阳古观前脉道院 · 重阳玄门清修主殿】，王重楼与林朝瑶双尊为掩护门下弟子中招负伤！千钧一发之际，你挺剑断后，先后在宗师赫连霸先与段延庆的惊天杀招下死战撑招破围，护送双尊与两脉残部退守【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】！绝境之下，你将做出决定终南隐宗命运的终极抉择——「双剑合璧 · 阴阳归元」抑或「独守本脉 · 孤峰血战」，正式开启终南终局二级分流！',
  startHint:
    '晋升终南隐宗 Lv.4（完成《北斗封山 · 古观长老》或《断龙血夜 · 毒海孤星》）后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】（或寻王重楼、林朝瑶）迎击西夏一品堂大劫！',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q29_START_CONDITION,
  summary:
    '{reignYear}腊月风雪夜，西夏国相【没藏讹庞】密令一品堂两大宗师「恶贯满盈」【段延庆】与「铁鹞大将军」【赫连霸先】携奇毒「悲酥清风露」夜袭终南山！清修主殿毒风骤起，紫阳真人【王重楼】与寒玉仙子【林朝瑶】虽并肩迎敌，却因分神护持中招弟子而被段、赫连二人联手震伤。危急关头，你孤剑断后，在赫连霸先的铁鹞霸刀与段延庆的一阳指铁杖杀阵下硬撑数合、撕开重围，护送负伤双尊与两脉残部退守【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】两侧。强敌压境、大劫未消，你在残碑之前立下抉择，正式开启终南隐宗终极命运分流！',
  initialStepId: 'hall_crisis',
  steps: {
    hall_crisis: {
      id: 'hall_crisis',
      title: '贺兰黑云 · 主殿惊变',
      objective:
        '西夏一品堂大举夜袭终南山！请速赴【重阳古观前脉道院 · 重阳玄门清修主殿】，查探悲酥清风毒雾之变，迎击赫连霸先与段延庆！',
      nextHint: '前往【重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】点击「迎战西夏一品堂叩关 · 撑招破围」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
      },
    },
    break_siege: {
      id: 'break_siege',
      title: '宗师压境 · 撑招破围',
      objective:
        '王重楼与林朝瑶为护弟子负伤！请在【重阳玄门清修主殿】死战撑过赫连霸先与段延庆的宗师绝杀，杀出一条血路护送众人撤往寒玉涧！',
      nextHint: '在【重阳玄门清修主殿（zn_to_hall）】点击「孤剑断后 · 撑招破去赫连霸先与段延庆合围」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
      },
    },
    stream_decision: {
      id: 'stream_decision',
      title: '寒玉残碑 · 命运分流',
      objective:
        '你已成功破围护送王林双尊退守【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】！请速往残碑之前，做出决定终南隐宗未来命运的终极抉择！',
      nextHint: '前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「绝境抉择 · 定终南双脉兴亡之路」。',
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
      id: 'trig_znq29_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'znq29_intro_triggered',
      condition: ZHONGNAN_Q29_START_CONDITION,
      effects: [openScene('scene_znq29_01', ZHONGNAN_Q29_QUEST_ID)],
    },
    {
      id: 'trig_znq29_stream',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'znq29_stream_triggered',
      condition: atStep(ZHONGNAN_Q29_QUEST_ID, 'stream_decision'),
      effects: [openScene('scene_znq29_22', ZHONGNAN_Q29_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq29_start',
      label: '贺兰黑云压终南 · 迎击西夏一品堂绝顶宗师叩关',
      badge: '一品叩关',
      subtitle: '重阳古观前脉道院 · 重阳玄门清修主殿',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q29_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq29_intro_triggered', value: true },
        openScene('scene_znq29_01', ZHONGNAN_Q29_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq29_siege',
      label: '孤剑断后 · 撑招破去赫连霸先与段延庆宗师合围',
      badge: '撑招破围',
      subtitle: '重阳古观前脉道院 · 重阳玄门清修主殿',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: atStep(ZHONGNAN_Q29_QUEST_ID, 'break_siege'),
      effects: [openScene('scene_znq29_11', ZHONGNAN_Q29_QUEST_ID)],
    },
    {
      id: 'spot_znq29_stream',
      label: '寒玉涧残碑定策 · 抉择终南双脉终极命运',
      badge: '命运分流',
      subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q29_QUEST_ID, 'stream_decision'),
      effects: [
        { type: 'setFlag', flag: 'znq29_stream_triggered', value: true },
        openScene('scene_znq29_22', ZHONGNAN_Q29_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq29_npc_start',
      label: '西夏一品堂大举叩关 · 速赴重阳主殿共抗大劫',
      badge: '贺兰黑云',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-0114'] },
          ZHONGNAN_Q29_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq29_intro_triggered', value: true },
        openScene('scene_znq29_01', ZHONGNAN_Q29_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanXixiaInvasionQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q29_QUESTS: QuestDefinition[] = [ZHONGNAN_Q29_QUEST]
