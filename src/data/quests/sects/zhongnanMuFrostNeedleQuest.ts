import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q17_QUEST_ID = 'QST-SECT-11-17'

export const ZHONGNAN_Q17_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-16', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q17_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
  ],
}

export const ZHONGNAN_Q17_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q17_QUEST_ID,
    title: '冰魄银针 · 含沙凝霜',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'zhongnanshan',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（西夏一品堂死士首领 / 星宿派毒煞死士）',
    recommendedNote:
      '终南古墓真传绝技卷（全二十四幕）。于昆仑寒玉床冰魄石室蒙林朝瑶亲授地阶掌法《寒冰绵掌》（MA-085）与地阶暗器《含沙射影》（MA-076），子夜时分直赴终南后山寒玉涧银练飞瀑，全歼潜入秦岭的一品堂与星宿死士！',
    startHint:
      '完成《寒潭孤影 · 誓词问情》后，前往【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】面见师父【林朝瑶】修习寒冰绵掌与含沙射影。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
    },
    startCondition: ZHONGNAN_Q17_START_CONDITION,
    summary:
      '{reignYear}初冬，本心已定的你再度步入【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】，蒙寒玉仙子【林朝瑶】倾囊相授古墓两大杀伐绝学——地阶拳掌《寒冰绵掌》与地阶暗器《含沙射影》！是夜子时，西夏一品堂竟勾结星宿派死士潜入秦岭，妄图偷袭后山活死人墓外围。你孤身掠赴【终南后山寒玉涧 · 银练飞瀑清泉石茗案】，以寒冰绵掌冻裂毒烟、以含沙射影连破死士阵势，子夜全歼两路潜敌，威震秦岭！',
    initialStepId: 'midnight_falls_ambush',
    steps: {
      midnight_falls_ambush: {
        id: 'midnight_falls_ambush',
        title: '子夜飞瀑 · 全歼死士',
        objective:
          '已习得地阶《寒冰绵掌》与《含沙射影》！玉蜂告警有大批外敌潜入后山，请速赴【终南后山寒玉涧 · 银练飞瀑清泉石茗案】全歼一品堂与星宿死士！',
        nextHint:
          '前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，迎战潜入秦岭的一品堂与星宿死士。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_falls',
          customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
        },
      },
      return_jadebed_report: {
        id: 'return_jadebed_report',
        title: '霜清秦岭 · 返室复命',
        objective:
          '已于子夜银练飞瀑全歼一品堂与星宿死士！请返回【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】向师父林朝瑶复命。',
        nextHint:
          '返回【活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，向林朝瑶禀报战果。',
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
        id: 'trig_znq17_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q17_start_triggered',
        condition: ZHONGNAN_Q17_START_CONDITION,
        effects: [openScene('scene_znq17_01', ZHONGNAN_Q17_QUEST_ID)],
      },
      {
        id: 'trig_znq17_falls',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        onceFlag: 'zn_q17_falls_triggered',
        condition: atStep(ZHONGNAN_Q17_QUEST_ID, 'midnight_falls_ambush'),
        effects: [openScene('scene_znq17_11', ZHONGNAN_Q17_QUEST_ID)],
      },
      {
        id: 'trig_znq17_report',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q17_report_triggered',
        condition: atStep(ZHONGNAN_Q17_QUEST_ID, 'return_jadebed_report'),
        effects: [openScene('scene_znq17_21', ZHONGNAN_Q17_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq17_start',
        label: '【冰魄银针】入冰魄石室 · 拜请林朝瑶传授寒冰绵掌与含沙射影',
        badge: '古墓真传',
        subtitle: '第一幕 · 昆仑寒玉床冰魄石室',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: ZHONGNAN_Q17_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q17_start_triggered', value: true },
          openScene('scene_znq17_01', ZHONGNAN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq17_falls',
        label: '【冰魄银针】子夜赴银练飞瀑 · 全歼一品堂与星宿死士',
        badge: '子夜歼敌',
        subtitle: '第十一幕 · 银练飞瀑清泉石茗案',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        visibleWhen: atStep(ZHONGNAN_Q17_QUEST_ID, 'midnight_falls_ambush'),
        effects: [
          { type: 'setFlag', flag: 'zn_q17_falls_triggered', value: true },
          openScene('scene_znq17_11', ZHONGNAN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq17_report',
        label: '【冰魄银针】返冰魄石室 · 向林朝瑶禀报歼敌战果',
        badge: '霜清秦岭',
        subtitle: '第二十一幕 · 昆仑寒玉床冰魄石室',
        tone: 'jade',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: atStep(ZHONGNAN_Q17_QUEST_ID, 'return_jadebed_report'),
        effects: [
          { type: 'setFlag', flag: 'zn_q17_report_triggered', value: true },
          openScene('scene_znq17_21', ZHONGNAN_Q17_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq17_start',
        label: '【冰魄银针】请师父传授《寒冰绵掌》与《含沙射影》',
        badge: '古墓真传',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q17_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0114'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q17_start_triggered', value: true },
          openScene('scene_znq17_01', ZHONGNAN_Q17_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuFrostNeedleQuest.scenes').then((m) => m.SCENES),
  },
]
