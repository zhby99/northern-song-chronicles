import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE01_QUEST_ID = 'QST-SECT-05-SIDE-01'

export const HUASHAN_SIDE01_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-ENTRY', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 1 },
    qStatus(HUASHAN_SIDE01_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'shichenIn', indices: [3, 4, 5, 6, 7, 8, 9], label: '白昼（卯时至酉时）' },
  ],
}

export const HUASHAN_SIDE01_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE01_QUEST_ID,
    title: '苍龙挑夫 · 栈道修缮记',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '不入流 ～ 三流下品',
    maxOpponentRealm: '三流下品（断索残匪首领“独眼豺”赵三）',
    recommendedNote:
      '华山派 Lv.1 外门日常支线（全十幕）。白昼于玉女峰洗头盆清泉演剑院领受宁清羽所托，赴苍龙岭绝顶孤松坪助老挑夫陈伯与华阴石匠更换秋雨锈蚀的铁索栈道，并在浓雾石脊上击退伺机断索报复的关中残匪。',
    startHint:
      '完成华山入门大礼后，于白昼（卯时至酉时）前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院】寻宁清羽即可领命。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
    },
    startCondition: HUASHAN_SIDE01_START_CONDITION,
    summary:
      '{reignYear}秋雨连绵，西岳险隘苍龙岭石阶苔滑、护岭铁索多处锈断。【玉女剑仙】宁清羽心系往来挑夫与香客安危，于【玉女峰紫霞道观 · 洗头盆清泉演剑院】嘱你携麻绳与铁楔前往苍龙岭，协助华阴老挑夫陈伯及石匠更换铁索。你在百丈绝壁之上腰系麻绳、运功稳桩，同乡民齐力换上新索，岂料山间骤起浓雾，一伙因潼关清剿怀恨在心的关中残匪潜伏暗处，妄图锯断新索陷害华山众人。你于湿滑石脊横剑立桩，以《华山剑法（入门十二式）》先破两名探路恶徒，再力擒三流下品匪首“独眼豺”赵三，护得全岭挑夫石匠周全。',
    initialStepId: 'repair_canglong',
    steps: {
      repair_canglong: {
        id: 'repair_canglong',
        title: '绝壁换索 · 助修苍龙岭',
        objective:
          '已领宁清羽所托！请携麻绳铁楔前往【潼关 / 西岳华山 · 苍龙岭绝顶孤松坪（tg_sm_pine）】，与老挑夫陈伯及华阴石匠汇合修缮栈道铁索。',
        nextHint:
          '前往【西岳绝顶 · 苍龙岭绝顶孤松坪（tg_sm_pine）】，点击「助陈伯与石匠修缮苍龙岭铁索」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_pine',
          customLabel: '潼关 / 西岳华山 · 苍龙岭绝顶孤松坪',
        },
      },
      return_report: {
        id: 'return_report',
        title: '雾散擒匪 · 归院复命',
        objective:
          '苍龙岭新索已固，断索残匪亦已生擒押交华阴差役！请返回【玉女峰紫霞道观 · 洗头盆清泉演剑院】向宁清羽复命。',
        nextHint:
          '返回【玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，点击「禀报苍龙岭修栈擒匪始末」或与宁清羽交谈。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_spring',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss01_start_spring',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_side01_start_triggered',
        condition: HUASHAN_SIDE01_START_CONDITION,
        effects: [openScene('scene_hss01_01', HUASHAN_SIDE01_QUEST_ID)],
      },
      {
        id: 'trig_hss01_arrive_pine',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        onceFlag: 'hs_side01_pine_triggered',
        condition: atStep(HUASHAN_SIDE01_QUEST_ID, 'repair_canglong'),
        effects: [openScene('scene_hss01_03', HUASHAN_SIDE01_QUEST_ID)],
      },
      {
        id: 'trig_hss01_return_spring',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_side01_report_triggered',
        condition: atStep(HUASHAN_SIDE01_QUEST_ID, 'return_report'),
        effects: [openScene('scene_hss01_10', HUASHAN_SIDE01_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss01_start_spring',
        label: '【华山支线】问询苍龙岭栈道修缮事宜',
        badge: '栈道修缮',
        subtitle: '白昼 · 洗头盆清泉演剑院',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: HUASHAN_SIDE01_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_side01_start_triggered', value: true },
          openScene('scene_hss01_01', HUASHAN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss01_repair_pine',
        label: '【华山支线】助陈伯与石匠修缮苍龙岭铁索',
        badge: '悬索修栈',
        subtitle: '苍龙岭绝顶孤松坪',
        tone: 'jade',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        visibleWhen: atStep(HUASHAN_SIDE01_QUEST_ID, 'repair_canglong'),
        effects: [
          { type: 'setFlag', flag: 'hs_side01_pine_triggered', value: true },
          openScene('scene_hss01_03', HUASHAN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss01_return_report',
        label: '【华山支线】禀报苍龙岭修栈擒匪始末',
        badge: '栈道复命',
        subtitle: '洗头盆清泉演剑院',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: atStep(HUASHAN_SIDE01_QUEST_ID, 'return_report'),
        effects: [
          { type: 'setFlag', flag: 'hs_side01_report_triggered', value: true },
          openScene('scene_hss01_10', HUASHAN_SIDE01_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hss01_start_npc',
        label: '请命前往苍龙岭助修铁索栈道',
        badge: '栈道修缮',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
            HUASHAN_SIDE01_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_side01_start_triggered', value: true },
          openScene('scene_hss01_01', HUASHAN_SIDE01_QUEST_ID),
        ],
      },
      {
        id: 'act_hss01_report_npc',
        label: '向宁师叔禀报苍龙岭换索擒匪经过',
        badge: '栈道复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
            atStep(HUASHAN_SIDE01_QUEST_ID, 'return_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_side01_report_triggered', value: true },
          openScene('scene_hss01_10', HUASHAN_SIDE01_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanSideCanglongPathQuest.scenes').then((m) => m.SCENES),
  },
]
