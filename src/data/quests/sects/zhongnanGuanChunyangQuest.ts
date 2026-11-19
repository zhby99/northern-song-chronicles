import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q11_QUEST_ID = 'QST-SECT-11-11'

export const ZHONGNAN_Q11_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-10', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q11_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-1057', npcName: '王处阳' },
    { type: 'npcAlive', npcId: 'NPC-0152', npcName: '努儿海' },
  ],
}

export const ZHONGNAN_Q11_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q11_QUEST_ID,
    title: '纯阳无极 · 七星聚首',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '一流中品 ～ 一流上品',
    maxOpponentRealm: '一流上品（西夏一品堂 · 贺兰血鹰 努儿海）',
    recommendedNote:
      '终南古观核心收官大戏（全二十六幕）。隆冬雪夜，西夏一品堂猛将努儿海率寒毒掌客潜上终南山天罡北斗七星演剑坛。七子齐聚传授地阶《纯阳无极功》（MA-078），你以纯阳真气破寒毒掌客并正面对决逼退努儿海！',
    startHint:
      '完成《太和云海 · 武当问真》后，前往【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛】，应七子之召演阵守山。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_dipper',
      customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
    },
    startCondition: ZHONGNAN_Q11_START_CONDITION,
    summary:
      '{reignYear}隆冬雪夜，西夏一品堂猛将「贺兰血鹰」【努儿海】率一批精修阴煞寒毒掌的死士趁风雪潜上终南，企图袭夺【重阳古观前脉道院 · 天罡北斗七星演剑坛】！丹阳子【马钰玄】、长春子【丘处玄】、玉阳子【王处阳】等七子齐聚坛心，于风雪危局中将古观镇脉内功地阶《纯阳无极功》倾囊相授。你运使纯阳真气融雪化霜，先破寒毒掌客精锐，再正面力抗并逼退一流上品强敌努儿海，护住终南道统万年香火！',
    initialStepId: 'dipper_transmission',
    steps: {
      dipper_transmission: {
        id: 'dipper_transmission',
        title: '七星聚首 · 纯阳授法',
        objective:
          '冬雪夜寒煞逼近重阳古观！请留在【天罡北斗七星演剑坛】，恭听马钰玄、丘处玄、王处阳等七子齐授《纯阳无极功》。',
        nextHint:
          '在【终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛（zn_to_dipper）】潜心领悟纯阳无极真意。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_dipper',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 天罡北斗七星演剑坛',
        },
      },
      repel_nuerhai: {
        id: 'repel_nuerhai',
        title: '雪夜破敌 · 力退血鹰',
        objective:
          '已习得地阶《纯阳无极功》！努儿海已率寒毒掌客杀上【天罡北斗七星演剑坛】，速速运使纯阳真气破敌护坛！',
        nextHint:
          '在【天罡北斗七星演剑坛（zn_to_dipper）】先破寒毒掌客，再与努儿海决战逼退强敌。',
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
        id: 'trig_znq11_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        onceFlag: 'zn_q11_start_triggered',
        condition: ZHONGNAN_Q11_START_CONDITION,
        effects: [openScene('scene_znq11_01', ZHONGNAN_Q11_QUEST_ID)],
      },
      {
        id: 'trig_znq11_battle',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        onceFlag: 'zn_q11_battle_triggered',
        condition: atStep(ZHONGNAN_Q11_QUEST_ID, 'repel_nuerhai'),
        effects: [openScene('scene_znq11_13', ZHONGNAN_Q11_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq11_start',
        label: '【纯阳无极】雪夜登七星演剑坛 · 会七子共商御敌',
        badge: '古观核心',
        subtitle: '第一幕 · 天罡北斗七星演剑坛',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        visibleWhen: ZHONGNAN_Q11_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q11_start_triggered', value: true },
          openScene('scene_znq11_01', ZHONGNAN_Q11_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq11_battle',
        label: '【纯阳无极】运使纯阳真气 · 迎战寒毒掌客与努儿海',
        badge: '雪夜死战',
        subtitle: '第十三幕 · 天罡北斗七星演剑坛',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_dipper',
        visibleWhen: atStep(ZHONGNAN_Q11_QUEST_ID, 'repel_nuerhai'),
        effects: [
          { type: 'setFlag', flag: 'zn_q11_battle_triggered', value: true },
          openScene('scene_znq11_13', ZHONGNAN_Q11_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq11_start',
        label: '【纯阳无极】雪夜赴演剑坛，拜见七子领受镇脉神功',
        badge: '古观核心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q11_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0216', 'NPC-1054', 'NPC-1057'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q11_start_triggered', value: true },
          openScene('scene_znq11_01', ZHONGNAN_Q11_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanGuanChunyangQuest.scenes').then((m) => m.SCENES),
  },
]
