import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q15_QUEST_ID = 'QST-SECT-11-15'

export const ZHONGNAN_Q15_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-14', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q15_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0215', npcName: '白清霜' },
    { type: 'npcAlive', npcId: 'NPC-0024', npcName: '苏舜钦' },
    { type: 'npcAlive', npcId: 'NPC-0472', npcName: '公冶宇彻' },
    { type: 'npcAlive', npcId: 'NPC-0214', npcName: '风波恶' },
  ],
}

export const ZHONGNAN_Q15_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q15_QUEST_ID,
    title: '烟波试剑 · 越女惊鸿',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'suzhou',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（姑苏慕容氏 · 一阵风 风波恶）',
    recommendedNote:
      '终南古墓 Lv.2 晋升 Lv.3 真传弟子大戏（全二十四幕）。携师姐白清霜南下苏州沧浪亭书院拜访苏舜钦，探寻古越剑韵线索；于虎丘裂崖飞梁吴王剑池悟得《越女古剑术（江南传本）》（MA-130），连退姑苏慕容公冶宇彻与风波恶！返活死人墓昆仑寒玉床冰魄石室，正式晋升【Lv.3 古墓真传】！',
    startHint:
      '完成《玉蜂琼浆 · 蜀道求药》后，前往【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】面见师父【林朝瑶】，领受南下姑苏试剑晋升真传之试炼。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
    },
    startCondition: ZHONGNAN_Q15_START_CONDITION,
    summary:
      '{reignYear}秋初，寒玉仙子【林朝瑶】为磨砺你晋升古墓真传，命你携师姐【白清霜】南下江南姑苏，追寻古墓剑法与春秋越女剑一脉相承的轻灵遗韵。二人先赴【苏州府 · 沧浪亭书院】拜访大宋文豪【苏舜钦】，获赠古剑石刻拓本线索；继登【虎丘剑池 · 裂崖飞梁吴王剑池】，观剑壁飞瀑悟得《越女古剑术（江南传本）》！适逢姑苏慕容氏【公冶宇彻】与「一阵风」【风波恶】寻衅试剑，你以新悟越女轻灵剑意连败二将，凯旋返抵【昆仑寒玉床冰魄石室】，正式获封【古墓真传】！',
    initialStepId: 'suzhou_canglang',
    steps: {
      suzhou_canglang: {
        id: 'suzhou_canglang',
        title: '沧浪问古 · 拜访子美',
        objective:
          '已奉林朝瑶之命携白清霜南下姑苏！请前往【苏州府 · 沧浪亭书院】拜访大宋诗豪苏舜钦，探询吴越古剑石刻下落。',
        nextHint:
          '前往【苏州府（suzhou） · 沧浪亭书院（suzhou_base_academy）】，拜见苏舜钦。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'suzhou_base_academy',
          customLabel: '苏州府 · 沧浪亭书院',
        },
      },
      huqiu_sword_pool: {
        id: 'huqiu_sword_pool',
        title: '虎丘剑池 · 越女试锋',
        objective:
          '已从苏舜钦处获知古剑碑线索！请前往【苏州府 · 虎丘剑池 · 裂崖飞梁吴王剑池】参悟越女剑韵，并迎战前来试剑的姑苏慕容好手！',
        nextHint:
          '前往【苏州府（suzhou） · 虎丘剑池 · 裂崖飞梁吴王剑池（sz_hq_pool）】，悟剑退敌。',
        targetLocation: {
          regionId: 'suzhou',
          buildingId: 'sz_huqiu',
          spotId: 'sz_hq_pool',
          customLabel: '苏州府 · 虎丘剑池 · 裂崖飞梁吴王剑池',
        },
      },
      return_jadebed_promote: {
        id: 'return_jadebed_promote',
        title: '凯旋终南 · 真传授印',
        objective:
          '已悟得《越女古剑术（江南传本）》并连退公冶宇彻与风波恶！请速返【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】复命，晋升古墓真传！',
        nextHint:
          '返回【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，向林朝瑶复命晋升 Lv.3 古墓真传。',
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
        id: 'trig_znq15_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q15_start_triggered',
        condition: ZHONGNAN_Q15_START_CONDITION,
        effects: [openScene('scene_znq15_01', ZHONGNAN_Q15_QUEST_ID)],
      },
      {
        id: 'trig_znq15_canglang',
        regionId: 'suzhou',
        buildingId: 'suzhou_base_academy',
        onceFlag: 'zn_q15_canglang_triggered',
        condition: atStep(ZHONGNAN_Q15_QUEST_ID, 'suzhou_canglang'),
        effects: [openScene('scene_znq15_05', ZHONGNAN_Q15_QUEST_ID)],
      },
      {
        id: 'trig_znq15_huqiu',
        regionId: 'suzhou',
        buildingId: 'sz_huqiu',
        spotId: 'sz_hq_pool',
        onceFlag: 'zn_q15_huqiu_triggered',
        condition: atStep(ZHONGNAN_Q15_QUEST_ID, 'huqiu_sword_pool'),
        effects: [openScene('scene_znq15_10', ZHONGNAN_Q15_QUEST_ID)],
      },
      {
        id: 'trig_znq15_promote',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q15_promote_triggered',
        condition: atStep(ZHONGNAN_Q15_QUEST_ID, 'return_jadebed_promote'),
        effects: [openScene('scene_znq15_21', ZHONGNAN_Q15_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq15_start',
        label: '【古墓真传试】入冰魄石室 · 领受南下姑苏试剑之命',
        badge: '真传晋升',
        subtitle: '第一幕 · 昆仑寒玉床冰魄石室',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: ZHONGNAN_Q15_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q15_start_triggered', value: true },
          openScene('scene_znq15_01', ZHONGNAN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq15_canglang',
        label: '【烟波试剑】入沧浪亭书院 · 拜访苏舜钦寻古剑拓本',
        badge: '沧浪问古',
        subtitle: '第五幕 · 沧浪亭书院',
        tone: 'primary',
        regionId: 'suzhou',
        buildingId: 'suzhou_base_academy',
        visibleWhen: atStep(ZHONGNAN_Q15_QUEST_ID, 'suzhou_canglang'),
        effects: [
          { type: 'setFlag', flag: 'zn_q15_canglang_triggered', value: true },
          openScene('scene_znq15_05', ZHONGNAN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq15_huqiu',
        label: '【烟波试剑】登吴王剑池 · 参悟越女古剑术并迎战慕容好手',
        badge: '剑池试锋',
        subtitle: '第十幕 · 裂崖飞梁吴王剑池',
        tone: 'danger',
        regionId: 'suzhou',
        buildingId: 'sz_huqiu',
        spotId: 'sz_hq_pool',
        visibleWhen: atStep(ZHONGNAN_Q15_QUEST_ID, 'huqiu_sword_pool'),
        effects: [
          { type: 'setFlag', flag: 'zn_q15_huqiu_triggered', value: true },
          openScene('scene_znq15_10', ZHONGNAN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq15_promote',
        label: '【烟波试剑】返冰魄石室 · 复命晋升古墓真传弟子',
        badge: '真传授印',
        subtitle: '第二十一幕 · 昆仑寒玉床冰魄石室',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: atStep(ZHONGNAN_Q15_QUEST_ID, 'return_jadebed_promote'),
        effects: [
          { type: 'setFlag', flag: 'zn_q15_promote_triggered', value: true },
          openScene('scene_znq15_21', ZHONGNAN_Q15_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq15_start',
        label: '【古墓真传试】向师父领受南下姑苏烟波试剑之命',
        badge: '真传晋升',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q15_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0114'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q15_start_triggered', value: true },
          openScene('scene_znq15_01', ZHONGNAN_Q15_QUEST_ID),
        ],
      },
      {
        id: 'npc_znq15_su',
        label: '【烟波试剑】拜见苏舜钦先生，请教虎丘古剑石刻',
        badge: '沧浪问古',
        tone: 'primary',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHONGNAN_Q15_QUEST_ID, 'suzhou_canglang'),
            { type: 'targetNpcMatch', npcIds: ['NPC-0024'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q15_canglang_triggered', value: true },
          openScene('scene_znq15_05', ZHONGNAN_Q15_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuSuzhouSwordQuest.scenes').then((m) => m.SCENES),
  },
]
