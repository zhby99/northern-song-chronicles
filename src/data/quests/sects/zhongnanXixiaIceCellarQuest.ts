import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q40_QUEST_ID = 'QST-SECT-11-40'

export const ZHONGNAN_Q40_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 5 },
    qStatus(ZHONGNAN_Q40_QUEST_ID, 'not_started'),
    {
      type: 'any',
      hint: '须先完成终南隐宗四大宗师终局之一',
      conditions: [
        qStatus('QST-SECT-11-36', 'completed'),
        qStatus('QST-SECT-11-37', 'completed'),
        qStatus('QST-SECT-11-38', 'completed'),
        qStatus('QST-SECT-11-39', 'completed'),
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0130', npcName: '赫连霸先' },
    { type: 'npcAlive', npcId: 'NPC-0103', npcName: '李秋水' },
  ],
}

export const zhongnanXixiaIceCellarQuest: QuestDefinition = {
  id: ZHONGNAN_Q40_QUEST_ID,
  title: '贺兰破冰 · 寒窖问尊',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师中品 ～ 大宗师下品',
  maxOpponentRealm: '大宗师下品（西夏皇太妃 · 李秋水）',
  recommendedNote:
    '终南隐宗五阶封神前篇（全四十幕）。既承终南绝脉，岂容西夏一品堂频频窥伺秦岭？千里踏沙直捣兴庆府西夏一品堂总堂，正面击溃铁鹞大将军赫连霸先并劈碎总坛牌匾；继而孤身深入西夏皇宫寒玉冰窖，于万年玄冰之间硬撼逍遥派大宗师李秋水，劈碎寒玉镇窖冰柱，迫其当面立誓永不犯秦岭一步。',
  startHint:
    '跻身终南隐宗五阶并完成任意终南宗师终局后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】即可开启西征破冰之旅。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tao',
    spotId: 'zn_to_hall',
    customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
  },
  startCondition: ZHONGNAN_Q40_START_CONDITION,
  summary:
    '{reignYear}秋，西夏一品堂屡次遣密探潜入秦岭窥伺终南隐宗秘学，更以「铁鹞大将军」赫连霸先坐镇兴庆府遥控关中暗网。你既已成就终南绝顶宗师之位，遂决意斩草除根：携剑西出潼关、千里踏沙直赴贺兰山下兴庆府。先闯【西夏一品堂总堂 · 一品堂绿琉璃聚贤殿（xq_yp_hall）】，正面击败赫连霸先、一剑劈碎一品堂总坛牌匾，震慑党项群豪；再寻迹潜入戒备森严的【西夏皇宫寒玉冰窖 · 主冰窟（xq_icecellar_main）】，直面深藏幕后的逍遥派大宗师、西夏皇太妃李秋水。百丈玄冰之间，你以终南玄门至高武意硬撼白虹掌力与小无相神功，一剑劈裂冰窖镇宫寒玉柱，令这位纵横西域数十载的大宗师亦不得不动容收手，立下「终李秋水之世，西夏铁骑与一品堂永不犯终南秦岭」之誓。',
  initialStepId: 'march_to_yipin',
  steps: {
    march_to_yipin: {
      id: 'march_to_yipin',
      title: '千里踏沙 · 直捣一品堂',
      objective:
        '西夏一品堂总堂正位于贺兰山麓兴庆府。请千里西行赴【兴庆府 · 西夏一品堂总堂 · 一品堂绿琉璃聚贤殿（xq_yp_hall）】，问罪铁鹞大将军赫连霸先。',
      nextHint:
        '前往【兴庆府 · 西夏一品堂总堂 · 一品堂绿琉璃聚贤殿（xq_yp_hall）】，点击「孤剑登堂，问罪赫连霸先并劈毁一品堂牌匾」。',
      targetLocation: {
        regionId: 'xingqing_xixia',
        buildingId: 'xq_yipin',
        spotId: 'xq_yp_hall',
        customLabel: '兴庆府 · 西夏一品堂总堂 · 一品堂绿琉璃聚贤殿',
      },
    },
    enter_ice_cellar: {
      id: 'enter_ice_cellar',
      title: '寒窖问尊 · 硬撼李秋水',
      objective:
        '赫连霸先已败、一品堂牌匾已碎，然真正主使窥伺秦岭之人乃是深居皇宫寒玉冰窖的西夏皇太妃李秋水！请赴【兴庆府 · 西夏皇宫寒玉冰窖（xq_icecellar_main）】，直面这位逍遥派大宗师。',
      nextHint:
        '前往【兴庆府 · 西夏皇宫寒玉冰窖（xq_icecellar_main）】，点击「踏入寒玉冰窖，问尊西夏皇太妃李秋水」。',
      targetLocation: {
        regionId: 'xingqing_xixia',
        buildingId: 'xq_icecellar',
        spotId: 'xq_icecellar_main',
        customLabel: '兴庆府 · 西夏皇宫寒玉冰窖',
      },
    },
    return_zhongnan_report: {
      id: 'return_zhongnan_report',
      title: '破冰归山 · 秦岭定盟',
      objective:
        '李秋水已立誓永不犯秦岭！请携西夏休兵誓约凯旋东归，返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】告慰山门同道。',
      nextHint:
        '返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，点击「凯旋归山，宣读贺兰破冰之誓」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_q40_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q40_start_triggered',
      condition: ZHONGNAN_Q40_START_CONDITION,
      effects: [openScene('scene_zn40_01', ZHONGNAN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_zn_q40_yipin',
      regionId: 'xingqing_xixia',
      buildingId: 'xq_yipin',
      spotId: 'xq_yp_hall',
      onceFlag: 'zn_q40_yipin_triggered',
      condition: atStep(ZHONGNAN_Q40_QUEST_ID, 'march_to_yipin'),
      effects: [openScene('scene_zn40_09', ZHONGNAN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_zn_q40_icecellar',
      regionId: 'xingqing_xixia',
      buildingId: 'xq_icecellar',
      spotId: 'xq_icecellar_main',
      onceFlag: 'zn_q40_icecellar_triggered',
      condition: atStep(ZHONGNAN_Q40_QUEST_ID, 'enter_ice_cellar'),
      effects: [openScene('scene_zn40_21', ZHONGNAN_Q40_QUEST_ID)],
    },
    {
      id: 'trig_zn_q40_return',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      onceFlag: 'zn_q40_return_triggered',
      condition: atStep(ZHONGNAN_Q40_QUEST_ID, 'return_zhongnan_report'),
      effects: [openScene('scene_zn40_36', ZHONGNAN_Q40_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_q40_start',
      label: '【终南封神】阅览秦岭边报，决意西出贺兰破一品堂',
      badge: '贺兰破冰',
      subtitle: '重阳玄门清修主殿',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: ZHONGNAN_Q40_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q40_start_triggered', value: true },
        openScene('scene_zn40_01', ZHONGNAN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q40_yipin',
      label: '【终南封神】孤剑登堂，问罪赫连霸先并劈毁一品堂牌匾',
      badge: '踏破总坛',
      subtitle: '一品堂绿琉璃聚贤殿',
      tone: 'danger',
      regionId: 'xingqing_xixia',
      buildingId: 'xq_yipin',
      spotId: 'xq_yp_hall',
      visibleWhen: atStep(ZHONGNAN_Q40_QUEST_ID, 'march_to_yipin'),
      effects: [
        { type: 'setFlag', flag: 'zn_q40_yipin_triggered', value: true },
        openScene('scene_zn40_09', ZHONGNAN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q40_icecellar',
      label: '【终南封神】踏入寒玉冰窖，问尊西夏皇太妃李秋水',
      badge: '寒窖问尊',
      subtitle: '西夏皇宫寒玉冰窖',
      tone: 'danger',
      regionId: 'xingqing_xixia',
      buildingId: 'xq_icecellar',
      spotId: 'xq_icecellar_main',
      visibleWhen: atStep(ZHONGNAN_Q40_QUEST_ID, 'enter_ice_cellar'),
      effects: [
        { type: 'setFlag', flag: 'zn_q40_icecellar_triggered', value: true },
        openScene('scene_zn40_21', ZHONGNAN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_q40_return',
      label: '【终南封神】凯旋归山，宣读贺兰破冰之誓',
      badge: '秦岭定盟',
      subtitle: '重阳玄门清修主殿',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      visibleWhen: atStep(ZHONGNAN_Q40_QUEST_ID, 'return_zhongnan_report'),
      effects: [
        { type: 'setFlag', flag: 'zn_q40_return_triggered', value: true },
        openScene('scene_zn40_36', ZHONGNAN_Q40_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_q40_helian',
      label: '亮出秦岭密探腰牌，当面问罪赫连霸先',
      badge: '踏破总坛',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0130'] },
          atStep(ZHONGNAN_Q40_QUEST_ID, 'march_to_yipin'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q40_yipin_triggered', value: true },
        openScene('scene_zn40_09', ZHONGNAN_Q40_QUEST_ID),
      ],
    },
    {
      id: 'act_zn_q40_liqiushui',
      label: '拱手问尊西夏皇太妃，以武论秦岭百年之界',
      badge: '寒窖问尊',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0103'] },
          atStep(ZHONGNAN_Q40_QUEST_ID, 'enter_ice_cellar'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q40_icecellar_triggered', value: true },
        openScene('scene_zn40_21', ZHONGNAN_Q40_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanXixiaIceCellarQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q40_QUESTS: QuestDefinition[] = [zhongnanXixiaIceCellarQuest]
