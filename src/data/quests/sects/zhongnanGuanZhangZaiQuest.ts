import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q06_QUEST_ID = 'QST-SECT-11-06'

export const ZHONGNAN_Q06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-05', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q06_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0216', npcName: '丘处玄' },
    { type: 'npcAlive', npcId: 'NPC-0048', npcName: '张载' },
    { type: 'npcAlive', npcId: 'NPC-0017', npcName: '晏殊' },
    { type: 'npcAlive', npcId: 'NPC-0041', npcName: '尹源' },
  ],
}

export const ZHONGNAN_Q06_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q06_QUEST_ID,
    title: '草堂护道 · 正气劈空',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'changan',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流中品（西夏一品堂死士统领）',
    recommendedNote:
      '二十幕重阳古观护道长安大戏：长春子丘处玄闻西夏死士欲刺杀关学大儒张载，遂携你急赴京兆府，先至【永兴军路京兆府衙】拜会知府晏殊呈报军情，再赴【长安横渠关学书院】护卫张载、尹源，临阵受丘处玄亲授良品拳掌《劈空掌》，击溃潜入书院的西夏死士！',
    startHint:
      '完成《太白金雁 · 绝壁凌虚》后，前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】（或寻丘处玄）领命赴长安护道。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_hall',
      customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
    },
    startCondition: ZHONGNAN_Q06_START_CONDITION,
    summary:
      '{reignYear}夏末，西夏一品堂死士潜入长安图谋刺杀关学名儒。长春子【丘处玄】闻讯大怒，亲携你下山驰赴京兆府。二人先至【永兴军路京兆府衙】拜会镇守长安的一代名相【晏殊】，呈上边军斥候截获之军情并商定布防；随即赶赴【长安横渠关学书院】，护卫正在讲学的【张载】与【尹源】。是夜西夏死士果然持毒刃突袭书院，丘处玄临阵传你全真绝学《劈空掌》，以刚猛浩然掌风隔空震碎贼人毒烟，联手击溃西夏刺客，护得关学薪火安然无恙！',
    initialStepId: 'yamen_visit_yanshu',
    steps: {
      yamen_visit_yanshu: {
        id: 'yamen_visit_yanshu',
        title: '府衙呈情 · 拜会晏公',
        objective:
          '已随丘处玄下山赴长安！请先前往【京兆府 · 永兴军路京兆府衙】，拜会知府【晏殊】呈报西夏死士潜伏军情。',
        nextHint: '前往【京兆府 · 永兴军路京兆府衙（changan_base_yamen）】。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'changan_base_yamen',
          customLabel: '京兆府 · 永兴军路京兆府衙',
        },
      },
      academy_guard_zhangzai: {
        id: 'academy_guard_zhangzai',
        title: '横渠书院 · 劈空护道',
        objective:
          '晏公已调派衙役暗布外围！请速赴【京兆府 · 长安横渠关学书院】，护卫【张载】与【尹源】，迎击夜袭书院的西夏死士！',
        nextHint: '前往【京兆府 · 长安横渠关学书院（changan_base_academy）】。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'changan_base_academy',
          customLabel: '京兆府 · 长安横渠关学书院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q06_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'zn_q06_start_triggered',
        condition: ZHONGNAN_Q06_START_CONDITION,
        effects: [openScene('scene_zn_q06_01', ZHONGNAN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_zn_q06_yamen',
        regionId: 'changan',
        buildingId: 'changan_base_yamen',
        onceFlag: 'zn_q06_yamen_triggered',
        condition: atStep(ZHONGNAN_Q06_QUEST_ID, 'yamen_visit_yanshu'),
        effects: [openScene('scene_zn_q06_05', ZHONGNAN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_zn_q06_academy',
        regionId: 'changan',
        buildingId: 'changan_base_academy',
        onceFlag: 'zn_q06_academy_triggered',
        condition: atStep(ZHONGNAN_Q06_QUEST_ID, 'academy_guard_zhangzai'),
        effects: [openScene('scene_zn_q06_09', ZHONGNAN_Q06_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q06_start',
        label: '【草堂护道】随丘处玄急赴长安 · 护卫横渠关学书院',
        badge: '正气劈空',
        subtitle: '第一幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: ZHONGNAN_Q06_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q06_start_triggered', value: true },
          openScene('scene_zn_q06_01', ZHONGNAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q06_yamen',
        label: '【京兆府衙】拜会知府晏殊 · 呈报西夏死士潜伏军情',
        badge: '府衙呈情',
        subtitle: '第五幕 · 永兴军路京兆府衙',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'changan_base_yamen',
        visibleWhen: atStep(ZHONGNAN_Q06_QUEST_ID, 'yamen_visit_yanshu'),
        effects: [
          { type: 'setFlag', flag: 'zn_q06_yamen_triggered', value: true },
          openScene('scene_zn_q06_05', ZHONGNAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q06_academy',
        label: '【横渠护道】入关学书院护卫张载、尹源 · 迎击西夏刺客',
        badge: '劈空护道',
        subtitle: '第九幕 · 长安横渠关学书院',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'changan_base_academy',
        visibleWhen: atStep(ZHONGNAN_Q06_QUEST_ID, 'academy_guard_zhangzai'),
        effects: [
          { type: 'setFlag', flag: 'zn_q06_academy_triggered', value: true },
          openScene('scene_zn_q06_09', ZHONGNAN_Q06_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q06_start',
        label: '禀报西夏刺客密谋 · 随丘师叔赴长安护道',
        badge: '正气劈空',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0216'] },
            ZHONGNAN_Q06_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q06_start_triggered', value: true },
          openScene('scene_zn_q06_01', ZHONGNAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q06_yanshu',
        label: '向晏相公呈报西夏死士潜入长安军情',
        badge: '府衙呈情',
        tone: 'primary',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0017'] },
            atStep(ZHONGNAN_Q06_QUEST_ID, 'yamen_visit_yanshu'),
          ],
        },
        effects: [openScene('scene_zn_q06_05', ZHONGNAN_Q06_QUEST_ID)],
      },
      {
        id: 'act_zn_q06_zhangzai',
        label: '拜见张载、尹源先生 · 布防横渠书院',
        badge: '劈空护道',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0048', 'NPC-0041'] },
            atStep(ZHONGNAN_Q06_QUEST_ID, 'academy_guard_zhangzai'),
          ],
        },
        effects: [openScene('scene_zn_q06_09', ZHONGNAN_Q06_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanGuanZhangZaiQuest.scenes').then((m) => m.SCENES),
  },
]
