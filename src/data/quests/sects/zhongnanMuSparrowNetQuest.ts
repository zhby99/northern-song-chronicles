import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q12_QUEST_ID = 'QST-SECT-11-12'

export const ZHONGNAN_Q12_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-03', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q12_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
  ],
}

export const ZHONGNAN_Q12_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q12_QUEST_ID,
    title: '幽谷百雀 · 金针渡影',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流中品（湘西五溪偷蜂恶客）',
    recommendedNote:
      '终南古墓主干开篇（全十八幕）。于活死人墓天罗地网捕雀轻功厅随冷清秋苦练捕八十一雀，习得《金雁功》（MA-119）与《追魂夺命镖》（MA-118），再赴寒玉涧银练飞瀑点倒三名偷猎玉蜂的苗疆恶客！',
    startHint:
      '归入古墓一脉并完成前序入门试炼后，前往【终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅】拜见师姐【冷清秋】开启轻功暗器特训。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_sparrow',
      customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
    },
    startCondition: ZHONGNAN_Q12_START_CONDITION,
    summary:
      '{reignYear}春深，幽谷素女【冷清秋】奉寒玉仙子【林朝瑶】之命，在【活死人墓幽谷石室 · 天罗地网捕雀轻功厅】督导你苦练古墓独门轻功与暗器法门。你于石室中疾掠如燕，将八十一只麻雀尽数兜捕入网而不伤一羽，成功习得良品轻功《金雁功》与暗器《追魂夺命镖》。忽闻后山玉蜂受惊，你与冷清秋急赴【终南后山寒玉涧 · 银练飞瀑清泉石茗案】，以鬼魅身法与银针暗器点倒三名偷猎玉蜂的苗疆恶客，护住古墓灵蜂！',
    initialStepId: 'falls_poachers',
    steps: {
      falls_poachers: {
        id: 'falls_poachers',
        title: '飞瀑护蜂 · 金针点敌',
        objective:
          '已习得《金雁功》与《追魂夺命镖》！后山传来玉蜂躁动之声，请速赴【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案】查探并擒拿偷猎玉蜂的苗疆恶客！',
        nextHint:
          '前往【终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，拦截并点倒三名苗疆偷蜂恶客。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_falls',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
        },
      },
      report_sparrow_hall: {
        id: 'report_sparrow_hall',
        title: '归墓复命 · 素女嘉许',
        objective:
          '已成功点倒偷猎玉蜂的苗疆恶客并护回玉蜂！请返回【活死人墓幽谷石室 · 天罗地网捕雀轻功厅】向冷清秋与林朝瑶复命。',
        nextHint:
          '返回【活死人墓幽谷石室 · 天罗地网捕雀轻功厅（zn_tb_sparrow）】，向冷清秋复命。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tomb',
          spotId: 'zn_tb_sparrow',
          customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 天罗地网捕雀轻功厅',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq12_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_sparrow',
        onceFlag: 'zn_q12_start_triggered',
        condition: ZHONGNAN_Q12_START_CONDITION,
        effects: [openScene('scene_znq12_01', ZHONGNAN_Q12_QUEST_ID)],
      },
      {
        id: 'trig_znq12_falls',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        onceFlag: 'zn_q12_falls_triggered',
        condition: atStep(ZHONGNAN_Q12_QUEST_ID, 'falls_poachers'),
        effects: [openScene('scene_znq12_09', ZHONGNAN_Q12_QUEST_ID)],
      },
      {
        id: 'trig_znq12_return',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_sparrow',
        onceFlag: 'zn_q12_return_triggered',
        condition: atStep(ZHONGNAN_Q12_QUEST_ID, 'report_sparrow_hall'),
        effects: [openScene('scene_znq12_15', ZHONGNAN_Q12_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq12_start',
        label: '【幽谷百雀】入捕雀轻功厅 · 随冷清秋苦练天罗地网势',
        badge: '古墓主干',
        subtitle: '第一幕 · 天罗地网捕雀轻功厅',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_sparrow',
        visibleWhen: ZHONGNAN_Q12_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q12_start_triggered', value: true },
          openScene('scene_znq12_01', ZHONGNAN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq12_falls',
        label: '【幽谷百雀】掠至银练飞瀑 · 截击偷猎玉蜂的苗疆恶客',
        badge: '飞瀑护蜂',
        subtitle: '第九幕 · 银练飞瀑清泉石茗案',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        visibleWhen: atStep(ZHONGNAN_Q12_QUEST_ID, 'falls_poachers'),
        effects: [
          { type: 'setFlag', flag: 'zn_q12_falls_triggered', value: true },
          openScene('scene_znq12_09', ZHONGNAN_Q12_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq12_return',
        label: '【幽谷百雀】返捕雀轻功厅 · 向冷清秋复命',
        badge: '归墓复命',
        subtitle: '第十五幕 · 天罗地网捕雀轻功厅',
        tone: 'jade',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_sparrow',
        visibleWhen: atStep(ZHONGNAN_Q12_QUEST_ID, 'report_sparrow_hall'),
        effects: [
          { type: 'setFlag', flag: 'zn_q12_return_triggered', value: true },
          openScene('scene_znq12_15', ZHONGNAN_Q12_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq12_start',
        label: '【幽谷百雀】请冷师姐督练捕雀轻功与暗器法门',
        badge: '古墓主干',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q12_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0173'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q12_start_triggered', value: true },
          openScene('scene_znq12_01', ZHONGNAN_Q12_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuSparrowNetQuest.scenes').then((m) => m.SCENES),
  },
]
