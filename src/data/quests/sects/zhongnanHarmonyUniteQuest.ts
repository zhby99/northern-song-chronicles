import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q30_QUEST_ID = 'QST-SECT-11-30'

export const ZHONGNAN_Q30_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-29', 'completed'),
    flag('zn_q29_choice', 'eq', 'harmony'),
    qStatus('QST-SECT-11-31', 'not_started'),
    qStatus(ZHONGNAN_Q30_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
  ],
}

export const zhongnanHarmonyUniteQuest: QuestDefinition = {
  id: ZHONGNAN_Q30_QUEST_ID,
  title: '寒涧同心 · 剑道合流',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '一流上品 ～ 宗师下品',
  maxOpponentRealm: '一流上品（一品堂暗影统领 · 完颜枯骨）',
  recommendedNote:
    '终南隐宗二级分流枢纽【合流线】（全二十四幕）。须完成《QST-SECT-11-29》并选择调停合流且未开启决裂线《QST-SECT-11-31》。往返重阳玄门清修主殿与昆仑寒玉床冰魄石室，终促王重楼与林朝瑶于寒玉涧临水抚琴榭冰释前嫌、共疗陈年内伤，道墓两脉自此剑道合流、互授镇派绝学！',
  startHint:
    '完成《QST-SECT-11-29》并选定合流之志后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】面谒王重楼即可启幕。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q30_START_CONDITION,
  summary:
    '{reignYear}暮秋，终南山松涛寒彻。道墓两脉积郁二十余载的旧怨与山外强敌步步紧逼的危局交织于一处。你不愿见玄门与寒玉就此分崩离析，先赴【重阳玄门清修主殿】叩谏紫阳真人【王重楼】，再入【昆仑寒玉床冰魄石室】倾听寒玉仙子【林朝瑶】尘封半生的心结。终在【寒玉涧临水抚琴榭】借一曲古琴引二人重逢，更于暗夜伏杀中独力斩退趁虚而入的西夏一品堂死士，护持王林二人阴阳调和、共疗陈年内伤。自此道墓冰释，两脉绝学合流相济！',
  initialStepId: 'visit_tomb_jadebed',
  steps: {
    visit_tomb_jadebed: {
      id: 'visit_tomb_jadebed',
      title: '叩石寒玉 · 解铃系铃',
      objective:
        '紫阳真人王重楼已默许放下前嫌，请速赴【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，向林朝瑶递上王重楼手书旧笺，请动她移步寒玉涧。',
      nextHint:
        '前往【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室（zn_tb_jadebed）】，点击「入寒玉石室 · 呈递紫阳旧笺请见林朝瑶」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
      },
    },
    guard_qin_healing: {
      id: 'guard_qin_healing',
      title: '寒涧抚琴 · 护法疗伤',
      objective:
        '王重楼与林朝瑶已允诺同赴【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】。速去布防护持，谨防潜伏山中的西夏一品堂暗桩趁二人运功疗伤之际偷袭！',
      nextHint:
        '前往【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】，点击「赴临水抚琴榭 · 护持王林冰释共疗内伤」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
      },
    },
    dual_arts_accord: {
      id: 'dual_arts_accord',
      title: '冰释合流 · 互授绝学',
      objective:
        '暗夜偷袭已挫，王重楼与林朝瑶陈年内伤俱愈。请留在【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】，见证道墓两脉缔结同心盟约并承接另一脉镇派绝学！',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭（zn_st_qin）】点击「观礼道墓合流 · 承接两脉互授绝学」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_qin',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 寒玉涧临水抚琴榭',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq30_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q30_start_triggered',
      condition: ZHONGNAN_Q30_START_CONDITION,
      effects: [openScene('scene_znq30_01', ZHONGNAN_Q30_QUEST_ID)],
    },
    {
      id: 'trig_znq30_tomb',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      onceFlag: 'zn_q30_tomb_triggered',
      condition: atStep(ZHONGNAN_Q30_QUEST_ID, 'visit_tomb_jadebed'),
      effects: [openScene('scene_znq30_07', ZHONGNAN_Q30_QUEST_ID)],
    },
    {
      id: 'trig_znq30_qin',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      onceFlag: 'zn_q30_qin_triggered',
      condition: atStep(ZHONGNAN_Q30_QUEST_ID, 'guard_qin_healing'),
      effects: [openScene('scene_znq30_13', ZHONGNAN_Q30_QUEST_ID)],
    },
    {
      id: 'trig_znq30_accord',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      onceFlag: 'zn_q30_accord_triggered',
      condition: atStep(ZHONGNAN_Q30_QUEST_ID, 'dual_arts_accord'),
      effects: [openScene('scene_znq30_20', ZHONGNAN_Q30_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq30_start',
      label: '【寒涧同心】叩谏紫阳真人 · 启道墓剑道合流之议',
      badge: '剑道合流',
      subtitle: '第一幕 · 往返古观与古墓，化二十载旧怨为同心之力',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q30_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q30_start_triggered', value: true },
        openScene('scene_znq30_01', ZHONGNAN_Q30_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq30_tomb',
      label: '【寒涧同心】入寒玉石室 · 呈递紫阳旧笺请见林朝瑶',
      badge: '叩石寒玉',
      subtitle: '第七幕 · 倾听林朝瑶尘封心结，促成寒玉涧重逢',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      visibleWhen: atStep(ZHONGNAN_Q30_QUEST_ID, 'visit_tomb_jadebed'),
      effects: [
        { type: 'setFlag', flag: 'zn_q30_tomb_triggered', value: true },
        openScene('scene_znq30_07', ZHONGNAN_Q30_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq30_qin',
      label: '【寒涧同心】赴临水抚琴榭 · 护持王林冰释共疗内伤',
      badge: '护法疗伤',
      subtitle: '第十三幕 · 一品堂死士夜袭寒玉涧，死守抚琴榭！',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      visibleWhen: atStep(ZHONGNAN_Q30_QUEST_ID, 'guard_qin_healing'),
      effects: [
        { type: 'setFlag', flag: 'zn_q30_qin_triggered', value: true },
        openScene('scene_znq30_13', ZHONGNAN_Q30_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq30_accord',
      label: '【寒涧同心】观礼道墓合流 · 承接两脉互授绝学',
      badge: '两仪合流',
      subtitle: '第二十幕 · 阴阳相济，终南隐宗两脉重归同心',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_qin',
      visibleWhen: atStep(ZHONGNAN_Q30_QUEST_ID, 'dual_arts_accord'),
      effects: [
        { type: 'setFlag', flag: 'zn_q30_accord_triggered', value: true },
        openScene('scene_znq30_20', ZHONGNAN_Q30_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq30_wang_start',
      label: '禀报紫阳真人 · 请促成重阳古观与活死人墓冰释合流',
      badge: '剑道合流',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0133'] },
          ZHONGNAN_Q30_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q30_start_triggered', value: true },
        openScene('scene_znq30_01', ZHONGNAN_Q30_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanHarmonyUniteQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q30_QUESTS: QuestDefinition[] = [zhongnanHarmonyUniteQuest]
