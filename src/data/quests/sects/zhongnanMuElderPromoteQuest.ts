import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q28_QUEST_ID = 'QST-SECT-11-28'

export const ZHONGNAN_Q28_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-27', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q28_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-0215', npcName: '白清霜' },
    { type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' },
    { type: 'npcAlive', npcId: 'NPC-0181', npcName: '摘星子' },
  ],
}

export const ZHONGNAN_Q28_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q28_QUEST_ID,
  title: '断龙血夜 · 毒海孤星',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '一流上品（活死人墓 Lv.4 护法尊使晋升大典）',
  maxOpponentRealm: '一流中品（星宿派大弟子西域毒仙摘星子 · 星宿毒师合击）',
  recommendedNote:
    '二十六幕活死人墓血战晋升长卷：林朝瑶于寒玉石室闭死关之际，星宿老怪丁春秋竟遣首徒「西域毒仙」摘星子率星宿毒师夜袭【活死人墓幽谷石室 · 天罗地网捕雀轻功厅】，妄图趁虚夺取万年寒玉髓与《玉女心经》！冷清秋与白清霜猝不及防身中腐尸毒雾，千钧一发之际你孤剑驰援，于天罗地网厅以一敌二力挫摘星子与星宿毒师，更逼退暗中窥伺的丁春秋魔影！危难解除，林朝瑶功成破关，亲授寒玉护法印，册封你为终南隐宗 **Lv.4 古墓护法尊使**！',
  startHint:
    '完成《瑶池万里 · 昆仑采玉》后，速往【终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅】（或寻冷清秋、白清霜）迎击星宿派夜袭！',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tomb',
    spotId: 'zn_tb_sparrow',
    customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
  },
  startCondition: ZHONGNAN_Q28_START_CONDITION,
  summary:
    '{reignYear}岁末寒夜，趁寒玉仙子【林朝瑶】于石室闭关融合万年寒玉髓之际，星宿老怪【丁春秋】亲遣大弟子「西域毒仙」【摘星子】携星宿毒众夜袭活死人墓！毒烟弥漫【天罗地网捕雀轻功厅】，幽谷素女【冷清秋】与寒谷飞霜【白清霜】护门受创。危急关头，你孤身驰援断龙石门，以一敌二血战摘星子与星宿毒师，凭借昆仑淬炼的寒玉心境与至柔绝剑重创摘星子，迫使星宿毒众狼狈溃逃！林朝瑶破关而出，挥袖驱散残毒，当众册封你为活死人墓 **Lv.4 古墓护法尊使**！',
  initialStepId: 'defend_sparrow_hall',
  steps: {
    defend_sparrow_hall: {
      id: 'defend_sparrow_hall',
      title: '断龙血夜 · 孤剑破毒',
      objective:
        '摘星子已率星宿毒众杀入【活死人墓幽谷石室 · 天罗地网捕雀轻功厅】！请火速驰援冷清秋与白清霜，以一敌二击溃摘星子！',
      nextHint: '前往【活死人墓幽谷石室 · 天罗地网捕雀轻功厅（zn_tb_sparrow）】点击「孤剑驰援 · 1v2 重创西域毒仙摘星子」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_sparrow',
        customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
      },
    },
    tomb_investiture: {
      id: 'tomb_investiture',
      title: '寒玉破关 · 册封尊使',
      objective:
        '摘星子已被重创逐出终南，恩师林朝瑶亦已功成破关！请前往【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】受封 Lv.4 古墓护法尊使！',
      nextHint: '前往【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】点击「拜谒破关恩师 · 受封 Lv.4 古墓护法尊使」。',
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
      id: 'trig_znq28_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_sparrow',
      onceFlag: 'znq28_intro_triggered',
      condition: ZHONGNAN_Q28_START_CONDITION,
      effects: [openScene('scene_znq28_01', ZHONGNAN_Q28_QUEST_ID)],
    },
    {
      id: 'trig_znq28_jadebed',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'znq28_jadebed_triggered',
      condition: atStep(ZHONGNAN_Q28_QUEST_ID, 'tomb_investiture'),
      effects: [openScene('scene_znq28_19', ZHONGNAN_Q28_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq28_start',
      label: '孤剑驰援捕雀厅 · 迎击星宿摘星子夜袭',
      badge: '断龙血夜',
      subtitle: '活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_sparrow',
      visibleWhen: ZHONGNAN_Q28_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq28_intro_triggered', value: true },
        openScene('scene_znq28_01', ZHONGNAN_Q28_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq28_jadebed',
      label: '步入冰魄石室 · 受林朝瑶册封 Lv.4 古墓护法尊使',
      badge: '尊使册封',
      subtitle: '活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: atStep(ZHONGNAN_Q28_QUEST_ID, 'tomb_investiture'),
      effects: [
        { type: 'setFlag', flag: 'znq28_jadebed_triggered', value: true },
        openScene('scene_znq28_19', ZHONGNAN_Q28_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq28_npc_start',
      label: '驰援天罗地网捕雀厅 · 击退星宿摘星子夜袭',
      badge: '断龙血夜',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0173', 'NPC-0215', 'NPC-0114'] },
          ZHONGNAN_Q28_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq28_intro_triggered', value: true },
        openScene('scene_znq28_01', ZHONGNAN_Q28_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanMuElderPromoteQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q28_QUESTS: QuestDefinition[] = [ZHONGNAN_Q28_QUEST]
