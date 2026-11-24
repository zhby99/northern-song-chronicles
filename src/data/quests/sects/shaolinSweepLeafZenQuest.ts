import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q30_QUEST_ID = 'QST-SECT-01-30'

export const SHAOLIN_Q30_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-28', 'completed'),
    flag('sl_pavilion_choice', 'eq', 'compassion'),
    qStatus(SHAOLIN_Q30_QUEST_ID, 'not_started'),
    qStatus('QST-SECT-01-31', 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 570 },
    { type: 'skillAtLeast', key: '经义', min: 82 },
    { type: 'skillAtLeast', key: '书', min: 70 },
    { type: 'npcAlive', npcId: 'NPC-0101', npcName: '法空' },
  ],
}

export const SHAOLIN_Q30_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q30_QUEST_ID,
    title: '慈悲默察 · 扫叶听风',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流上品',
    maxOpponentRealm: '无战斗（扫地僧三关禅悟）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传合流分支任务（慈悲默察线 · 全十幕）。须入寺满 570 日、于《琉璃夜影 · 曝书惊变》择定「慈悲默察」方略、未开启《铁血伏魔 · 暗布天罗》，且经义 ≥ 82、书法 ≥ 70。你于古银杏扫叶庭随无名扫地老僧法空历「扫叶察微」「抄经留偈」「空帚印心」三关禅悟，勘破潜伏绝顶高人的心魔破绽、留偈《法华经》点化杀心，更在法空点拨下彻悟「武学障」真谛，为日后易筋封神埋下深远伏笔！',
    startHint:
      '入寺满 570 日、于《曝书惊变》选择慈悲默察且经义 ≥ 82、书 ≥ 70 后，前往【嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭】（或寻法空）开启扫叶三关禅悟。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_sweeper',
      customLabel: '嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭',
    },
    startCondition: SHAOLIN_Q30_START_CONDITION,
    summary:
      '{reignYear}深秋，古银杏落叶满庭。你谨守七夕曝书之夜立下的「慈悲默察」心志，持青竹扫帚来到【古银杏无名老僧扫叶庭】，随扫地老僧【法空】历经「扫叶察微」「抄经留偈」「空帚印心」三关禅悟。你于落叶尘埃间辨出潜伏阁中怨戾高人的心魔破绽，闻法空点破「武学障深，唯有佛法能解」之无上禅机；更焚香净手亲抄经卷、于《法华经》夹页留偈点化宿敌杀心，终以空帚印心彻悟慈悲护世之道，得法空罕见深许。',
    initialStepId: 'ginkgo_sweeping',
    steps: {
      ginkgo_sweeping: {
        id: 'ginkgo_sweeping',
        title: '古杏扫叶 · 察微悟禅',
        objective:
          '你已拿起青竹扫帚，随法空老僧于古银杏树下默扫落叶。请留在【藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】，过第一关「扫叶察微」参悟潜影破绽与武学障真意。',
        nextHint:
          '在【藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】点击「执帚随法空扫叶 · 参悟武学障与潜影破绽」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_sweeper',
          customLabel: '嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭',
        },
      },
      copy_sutra_mercy: {
        id: 'copy_sutra_mercy',
        title: '抄经留偈 · 空帚印心',
        objective:
          '得法空点破「武学障深唯有佛法能解」后，请前往【藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】或【古银杏无名老僧扫叶庭（sl_cj_sweeper）】，亲抄经卷留偈点化盗经之人，并以空帚印心完结禅悟！',
        nextHint:
          '在【藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】或【古银杏无名老僧扫叶庭（sl_cj_sweeper）】点击「研墨抄经留偈 · 空帚印心」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_sweeper',
          customLabel: '嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq30_start_sweeper',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        onceFlag: 'sl_q30_start_triggered',
        condition: SHAOLIN_Q30_START_CONDITION,
        effects: [openScene('scene_slq30_01', SHAOLIN_Q30_QUEST_ID)],
      },
      {
        id: 'trig_slq30_copy_terrace',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_q30_copy_triggered',
        condition: atStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
        effects: [openScene('scene_slq30_04', SHAOLIN_Q30_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq30_start_sweeper',
        label: '【少林禅悟】古杏落叶 · 拜谒扫地老僧法空',
        badge: '扫叶听风',
        subtitle: '古银杏无名老僧扫叶庭 · 慈悲默察线',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        visibleWhen: SHAOLIN_Q30_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q30_start_triggered', value: true },
          openScene('scene_slq30_01', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq30_sweep_continue',
        label: '【少林禅悟】执帚随法空扫叶 · 参悟武学障与潜影破绽',
        badge: '扫叶察微',
        subtitle: '古银杏无名老僧扫叶庭 · 第一关',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        visibleWhen: atStep(SHAOLIN_Q30_QUEST_ID, 'ginkgo_sweeping'),
        effects: [openScene('scene_slq30_02', SHAOLIN_Q30_QUEST_ID)],
      },
      {
        id: 'spot_slq30_copy_sweeper',
        label: '【少林禅悟】研墨抄经留偈 · 空帚印心',
        badge: '抄经留偈',
        subtitle: '古银杏无名老僧扫叶庭 · 二三关',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        visibleWhen: atStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
        effects: [
          { type: 'setFlag', flag: 'sl_q30_copy_triggered', value: true },
          openScene('scene_slq30_04', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq30_copy_terrace',
        label: '【少林禅悟】于西厢石台抄经留偈 · 慈悲度人',
        badge: '抄经留偈',
        subtitle: '西厢晒经校勘石台 · 二三关',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: atStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
        effects: [
          { type: 'setFlag', flag: 'sl_q30_copy_triggered', value: true },
          openScene('scene_slq30_04', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq30_start_npc',
        label: '合十请益法空老僧 · 开启【慈悲默察 · 扫叶听风】',
        badge: '扫叶听风',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0101'] },
            SHAOLIN_Q30_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q30_start_triggered', value: true },
          openScene('scene_slq30_01', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'act_slq30_copy_npc',
        label: '呈示亲抄经偈 · 向法空老僧空帚印心',
        badge: '抄经留偈',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0101'] },
            atStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q30_copy_triggered', value: true },
          openScene('scene_slq30_04', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSweepLeafZenQuest.scenes').then((m) => m.SCENES),
  },
]
