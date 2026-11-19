import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q20_QUEST_ID = 'QST-SECT-11-20'

export const ZHONGNAN_Q20_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    {
      type: 'any',
      hint: '必修前置：完成古观支线（QST-SECT-11-11）或古墓支线（QST-SECT-11-19）',
      conditions: [
        qStatus('QST-SECT-11-11', 'completed'),
        qStatus('QST-SECT-11-19', 'completed'),
      ],
    },
    qStatus(ZHONGNAN_Q20_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-1036', npcName: '李延宗' },
  ],
}

export const ZHONGNAN_Q20_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q20_QUEST_ID,
  title: '寒涧残碑 · 三十载赌约',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '一流下品 ～ 一流中品（终南隐宗双脉汇流主线）',
  maxOpponentRealm: '二流上品（西夏一品堂银枪客卿 · 李延宗）',
  recommendedNote:
    '二十四幕终南隐宗双脉汇流长卷：秋夜雷雨大作，你奉命巡查【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】，恰与另一脉首席同门狭路相逢！未及寒暄，西夏一品堂银枪客卿李延宗率夜探死士突袭涧谷，妄图盗拓涧畔禁碑秘文。双脉子弟于雷雨中临时联手共破银枪强敌，惊雷劈开苔藓尘封的寒涧残碑——尘封三十载的王重楼与林朝瑶青梅赌约、以及“全真剑法与玉女剑法双剑合璧”之惊天隐秘，终在此夜揭开冰山一角！',
  startHint:
    '晋升终南隐宗 Lv.3 并完结本脉前序主线后，于雷雨之夜前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】（或寻丘处玄、冷清秋接令巡山）即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_sword',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
  },
  startCondition: ZHONGNAN_Q20_START_CONDITION,
  summary:
    '{reignYear}深秋雷雨夜，你奉命巡视【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】，与{ifFlagEq:zn_branch=guguan|古墓一脉的冷清秋师姐|古观一脉的丘处玄师兄}于雨幕中不期而遇。此时西夏一品堂银枪客卿【李延宗】竟率黑衣死士潜入涧谷，企图窃取涧畔禁碑所刻前尘剑诀！危急关头，古观清刚剑意与古墓灵动寒锋首度并肩，二人联手挫败李延宗并将西夏死士逐出终南。天雷震落残碑古苔，王重楼与林朝瑶三十年前的青梅之约、活死人墓与重阳古观分立之由，以及双剑合璧克敌制胜的惊世玄机，尽皆显露于电光石火之间。',
  initialStepId: 'patrol_valley',
  steps: {
    patrol_valley: {
      id: 'patrol_valley',
      title: '雷雨夜巡 · 寒涧逢敌',
      objective:
        '终南后山忽起异动，请前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪】，查探雷雨夜色中潜入禁地的西夏来客。',
      nextHint: '前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「雷雨巡涧 · 截击西夏夜探」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    duel_li_yanzong: {
      id: 'duel_li_yanzong',
      title: '双脉并肩 · 怒破银枪',
      objective:
        '西夏一品堂银枪客卿李延宗亲率死士强闯双剑合璧坪！请与同门并肩死战，将其逐出终南禁地！',
      nextHint: '在【终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「双脉合击 · 迎战银枪李延宗」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    inspect_stele: {
      id: 'inspect_stele',
      title: '雷劈残碑 · 三十载旧约',
      objective:
        '李延宗负伤遁走，方才一记惊雷震落涧畔古碑积苔。请仔细勘察【繁花幽谷双剑合璧坪】残碑铭文，揭开两脉三十载赌约之秘。',
      nextHint: '在【繁花幽谷双剑合璧坪（zn_st_sword）】点击「细辨残碑 · 揭晓双剑合璧之秘」。',
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
      id: 'trig_znq20_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'znq20_intro_triggered',
      condition: ZHONGNAN_Q20_START_CONDITION,
      effects: [openScene('scene_znq20_01', ZHONGNAN_Q20_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq20_start',
      label: '雷雨夜巡寒玉涧 · 查探双剑合璧坪异动',
      badge: '双脉汇流',
      subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: ZHONGNAN_Q20_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq20_intro_triggered', value: true },
        openScene('scene_znq20_01', ZHONGNAN_Q20_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq20_duel',
      label: '双脉合击 · 截战西夏银枪李延宗',
      badge: '雷雨破敌',
      subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q20_QUEST_ID, 'duel_li_yanzong'),
      effects: [openScene('scene_znq20_09', ZHONGNAN_Q20_QUEST_ID)],
    },
    {
      id: 'spot_znq20_stele',
      label: '细辨雷劈残碑 · 揭晓三十载青梅赌约',
      badge: '双剑秘辛',
      subtitle: '终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q20_QUEST_ID, 'inspect_stele'),
      effects: [openScene('scene_znq20_16', ZHONGNAN_Q20_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_znq20_npc_start',
      label: '接令雷雨夜巡寒玉涧（双脉汇流主线）',
      badge: '寒涧残碑',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133', 'NPC-0114', 'NPC-0216', 'NPC-0173'] },
          ZHONGNAN_Q20_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq20_intro_triggered', value: true },
        openScene('scene_znq20_01', ZHONGNAN_Q20_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanThirtyYearWagerQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q20_QUESTS: QuestDefinition[] = [ZHONGNAN_Q20_QUEST]
