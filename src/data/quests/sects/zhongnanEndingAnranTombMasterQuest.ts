import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q38_QUEST_ID = 'QST-SECT-11-38'

export const ZHONGNAN_Q38_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-35', 'completed'),
    flag('zn_cross', 'eq', 'split'),
    flag('zn_ending', 'falsy'),
    qStatus(ZHONGNAN_Q38_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
  ],
}

export const zhongnanEndingAnranTombMasterQuest: QuestDefinition = {
  id: ZHONGNAN_Q38_QUEST_ID,
  title: '断龙绝响 · 黯然孤鸿',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师中品（一品堂毒火都统 · 赫连焚天）',
  recommendedNote:
    '终南隐宗四大终局之一【黯然孤鸿线】（全三十六幕，与其余三大终局严格互斥）。须完成《QST-SECT-11-35》且处于道墓决裂线。西夏一品堂死士残部夜袭活死人墓并引爆雷火剧毒，林朝瑶远引疗伤、冷清秋冰封寒玉石棺，断龙石绝响而落；你于银练飞瀑前悲恸至极吟诵《别赋》悟出天阶神功【黯然销魂掌】，一掌荡灭追兵，孤身登位宗门五阶【活死人墓幽谷尊主】！',
  startHint:
    '完成《QST-SECT-11-35》且处于道墓决裂线后，前往【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】即可开启终局。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tomb',
    spotId: 'zn_tb_jadebed',
    customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
  },
  startCondition: ZHONGNAN_Q38_START_CONDITION,
  summary:
    '{reignYear}深秋，凄雨寒霜。西夏一品堂残部因段延庆惨败怀恨在心，竟趁道墓割席、外无援兵之际，携塞外雷火奇毒夜袭活死人墓！危急关头，【林朝瑶】为你挡下毒火余波后被迫远引昆仑疗伤；【冷清秋】更以自身寒功护持石室、毒气攻心不得不自我冰封于寒玉石棺静待苏醒，千斤断龙石轰然坠落绝响山谷。你自暗渠脱身立于【银练飞瀑清泉石茗案】，回望断壁残垣悲恸欲绝，仰天长吟江淹《别赋》，竟于肝肠寸断间彻悟天阶无上掌法【黯然销魂掌】！一掌崩崖尽灭一品堂毒火死士，从此孤鸿独影，登位【活死人墓幽谷尊主】！',
  initialStepId: 'dragon_stone_fall',
  steps: {
    dragon_stone_fall: {
      id: 'dragon_stone_fall',
      title: '雷火剧毒 · 断龙绝响',
      objective:
        '西夏一品堂死士已引爆雷火剧毒封死墓道！速留在【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，护持林朝瑶与冷清秋杀出毒焰绝境！',
      nextHint:
        '在【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】点击「绝境护师 · 面对断龙石绝响与寒玉冰封」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
      },
    },
    anran_falls_epiphany: {
      id: 'anran_falls_epiphany',
      title: '悲吟别赋 · 黯然销魂',
      objective:
        '断龙石已落，师尊远引、清秋冰封。请潜出暗渠赶赴【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，迎击追杀而至的一品堂毒火都统，于至悲至痛中悟出天阶神掌！',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，点击「飞瀑悲歌 · 吟《别赋》悟黯然销魂掌决战毒火都统」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
      },
    },
    tomb_master_ascend: {
      id: 'tomb_master_ascend',
      title: '黯然孤鸿 · 幽谷尊主',
      objective:
        '一品堂毒火死士已尽数伏诛！请立于【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】，重整活死人墓遗脉，登位活死人墓幽谷尊主，静候故人归来！',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案（zn_st_falls）】点击「孤鸿镇谷 · 登位活死人墓幽谷尊主」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_falls',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 银练飞瀑清泉石茗案',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq38_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'zn_q38_start_triggered',
      condition: ZHONGNAN_Q38_START_CONDITION,
      effects: [openScene('scene_znq38_01', ZHONGNAN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_znq38_dragon',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'zn_q38_dragon_triggered',
      condition: atStep(ZHONGNAN_Q38_QUEST_ID, 'dragon_stone_fall'),
      effects: [openScene('scene_znq38_11', ZHONGNAN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_znq38_falls',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q38_falls_triggered',
      condition: atStep(ZHONGNAN_Q38_QUEST_ID, 'anran_falls_epiphany'),
      effects: [openScene('scene_znq38_21', ZHONGNAN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_znq38_ascend',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      onceFlag: 'zn_q38_ascend_triggered',
      condition: atStep(ZHONGNAN_Q38_QUEST_ID, 'tomb_master_ascend'),
      effects: [openScene('scene_znq38_32', ZHONGNAN_Q38_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq38_start',
      label: '【终南终局 · 黯然孤鸿】寒玉石室惊变 · 一品堂夜袭活死人墓',
      badge: '断龙绝响',
      subtitle: '第一幕 · 孤墓悲歌终局，雷火剧毒骤袭幽谷',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: ZHONGNAN_Q38_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q38_start_triggered', value: true },
        openScene('scene_znq38_01', ZHONGNAN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq38_dragon',
      label: '【断龙绝响】绝境护师 · 面对断龙石绝响与寒玉冰封',
      badge: '寒玉冰封',
      subtitle: '第十一幕 · 断龙石轰然坠落，林朝瑶远引、冷清秋冰封石棺',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: atStep(ZHONGNAN_Q38_QUEST_ID, 'dragon_stone_fall'),
      effects: [
        { type: 'setFlag', flag: 'zn_q38_dragon_triggered', value: true },
        openScene('scene_znq38_11', ZHONGNAN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq38_falls',
      label: '【断龙绝响】飞瀑悲歌 · 吟《别赋》悟黯然销魂掌决战毒火都统',
      badge: '黯然销魂',
      subtitle: '第二十一幕 · 悲恸至极悟通天阶神掌，血战一品堂毒火都统！',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q38_QUEST_ID, 'anran_falls_epiphany'),
      effects: [
        { type: 'setFlag', flag: 'zn_q38_falls_triggered', value: true },
        openScene('scene_znq38_21', ZHONGNAN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq38_ascend',
      label: '【断龙绝响】孤鸿镇谷 · 登位活死人墓幽谷尊主',
      badge: '幽谷尊主',
      subtitle: '第三十二幕 · 悟成天阶黯然销魂掌，晋升终南隐宗五阶尊主',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_falls',
      visibleWhen: atStep(ZHONGNAN_Q38_QUEST_ID, 'tomb_master_ascend'),
      effects: [
        { type: 'setFlag', flag: 'zn_q38_ascend_triggered', value: true },
        openScene('scene_znq38_32', ZHONGNAN_Q38_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq38_lin_start',
      label: '入寒玉石室 · 察看外谷雷火异动',
      badge: '断龙绝响',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0114', 'NPC-0173'] },
          ZHONGNAN_Q38_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q38_start_triggered', value: true },
        openScene('scene_znq38_01', ZHONGNAN_Q38_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanEndingAnranTombMasterQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q38_QUESTS: QuestDefinition[] = [zhongnanEndingAnranTombMasterQuest]
