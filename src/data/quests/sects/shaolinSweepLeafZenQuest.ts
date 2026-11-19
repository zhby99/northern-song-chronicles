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
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 5475 },
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
    maxOpponentRealm: '无战斗（古杏扫叶禅悟）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传合流分支任务（慈悲默察线 · 全二十幕）。须入寺满十五载（5475 日）、于《琉璃夜影 · 曝书惊变》择定「慈悲默察」方略、未开启《铁血伏魔 · 暗布天罗》，且经义 ≥ 82、书法 ≥ 70。你于古银杏无名老僧扫叶庭陪伴扫地老僧法空默扫月余，听风观叶间闻得「武学障深唯有佛法能解」之无上禅机；更于藏经阁案头亲抄《楞伽经》留置绝技橱侧，以大慈悲心欲度潜伏盗经之人，终得心境圆明、武学大进！',
    startHint:
      '入寺满 5475 日、于《曝书惊变》选择慈悲默察且经义 ≥ 82、书 ≥ 70 后，前往【嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭】（或寻法空）开启扫叶禅悟。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_sweeper',
      customLabel: '嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭',
    },
    startCondition: SHAOLIN_Q30_START_CONDITION,
    summary:
      '{reignYear}深秋，古银杏落叶满庭。你谨守七夕曝书之夜立下的「慈悲默察」心志，持一柄青竹扫帚来到【古银杏无名老僧扫叶庭】，陪伴终年扫地的无名老僧【法空】默扫月余。朝露暮霜之间，法空一句「武学障深，唯有佛法能解」如醍醐灌顶，令你彻底洞悉少林七十二绝技与慈悲禅心相生相克的玄机！其后你登临经案，以七十余重端庄楷法亲抄《楞伽经》要义，悄然置放于「般若」「禅定」经橱案头，不求捉贼邀功，但愿以佛法慈悲点化潜伏阁中的迷途宗师。扫帚落空、心境圆明，你亦于无声处得法空深许。',
    initialStepId: 'ginkgo_sweeping',
    steps: {
      ginkgo_sweeping: {
        id: 'ginkgo_sweeping',
        title: '古杏扫叶 · 默察禅机',
        objective:
          '你已拿起青竹扫帚，陪法空老僧于古银杏树下默扫落叶。请留在【藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】，静心体悟扫叶听风之禅境。',
        nextHint:
          '在【藏经阁 · 古银杏无名老僧扫叶庭（sl_cj_sweeper）】点击「执帚随法空扫叶 · 参悟武学障与佛法真意」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_sweeper',
          customLabel: '嵩山少林寺 · 藏经阁 · 古银杏无名老僧扫叶庭',
        },
      },
      copy_sutra_mercy: {
        id: 'copy_sutra_mercy',
        title: '案头抄经 · 慈悲度人',
        objective:
          '得法空点破「武学障深唯有佛法能解」后，你决意亲抄《楞伽经》留置经橱案头以度盗经人！请前往【藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】或回到【古银杏无名老僧扫叶庭（sl_cj_sweeper）】研墨抄经、归还扫帚。',
        nextHint:
          '在【藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】或【古银杏无名老僧扫叶庭（sl_cj_sweeper）】点击「研墨亲抄《楞伽经》 · 置卷度人」。',
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
        effects: [openScene('scene_slq30_11', SHAOLIN_Q30_QUEST_ID)],
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
        label: '【少林禅悟】执帚随法空扫叶 · 参悟武学障与佛法真意',
        badge: '扫叶参禅',
        subtitle: '古银杏无名老僧扫叶庭',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        visibleWhen: atStep(SHAOLIN_Q30_QUEST_ID, 'ginkgo_sweeping'),
        effects: [openScene('scene_slq30_05', SHAOLIN_Q30_QUEST_ID)],
      },
      {
        id: 'spot_slq30_copy_sweeper',
        label: '【少林禅悟】研墨亲抄《楞伽经》 · 置卷度人',
        badge: '抄经度人',
        subtitle: '古银杏无名老僧扫叶庭',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_sweeper',
        visibleWhen: atStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
        effects: [
          { type: 'setFlag', flag: 'sl_q30_copy_triggered', value: true },
          openScene('scene_slq30_11', SHAOLIN_Q30_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq30_copy_terrace',
        label: '【少林禅悟】于西厢石台亲抄《楞伽经》 · 慈悲度人',
        badge: '抄经度人',
        subtitle: '西厢晒经校勘石台',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: atStep(SHAOLIN_Q30_QUEST_ID, 'copy_sutra_mercy'),
        effects: [
          { type: 'setFlag', flag: 'sl_q30_copy_triggered', value: true },
          openScene('scene_slq30_11', SHAOLIN_Q30_QUEST_ID),
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
        label: '呈示亲抄《楞伽经》 · 向法空老僧归还扫帚',
        badge: '抄经度人',
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
          openScene('scene_slq30_11', SHAOLIN_Q30_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSweepLeafZenQuest.scenes').then((m) => m.SCENES),
  },
]
