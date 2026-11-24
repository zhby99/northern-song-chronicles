import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE10_QUEST_ID = 'QST-SECT-01-SIDE-10'

export const SHAOLIN_SIDE10_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE10_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '书', min: 40 },
    { type: 'npcAlive', npcId: 'NPC-0498', npcName: '虚广' },
  ],
}

export const SHAOLIN_SIDE10_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE10_QUEST_ID,
    title: '西厢晒经 · 芸香防蠹',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '无战斗（北宋古籍修缮三关雅趣）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门文德支线（全八幕，无战斗）。经义五十五、书法四十后，于少林藏经阁西厢晒经校勘石台助虚广抢救受潮生蠹的唐代写经与宋版孤本：亲历「辨蠹防潮古法」「《金刚经》残卷补字」「扫地老僧法空微尘一问」三关无提示雅趣，悟禅武之理并获法空罕见微颔。',
    startHint:
      '晋升少林内门经义不低于五十五、书法不低于四十后，前往【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台】寻虚广即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      customLabel: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
    },
    startCondition: SHAOLIN_SIDE10_START_CONDITION,
    summary:
      '{reignYear}伏夏将过、秋阳高照，少林藏经阁依例开晒古籍，却惊觉一批唐代写经与宋版佛经孤本因连月湿气而遭书蠹侵蚀、纸页发脆。药王院采药僧【虚广】正于西厢晒经校勘石台急得团团转，你闻讯上前相助，亲历辨蠹防潮、小楷校勘《金刚经》脱字残卷，又在《楞伽经》夹页读到前代高僧朱笔禅武遗批。暮色降临之际，古杏树下扫叶的无名老僧【法空】偶经晒经坪，微问「经卷能防蠹，人心之蠹何以防之」，你的对答终赢得老僧罕见微颔。',
    initialStepId: 'sun_and_restore',
    steps: {
      sun_and_restore: {
        id: 'sun_and_restore',
        title: '配香护卷 · 校勘孤本',
        objective:
          '已应虚广之请抢救藏经阁受蠹唐宋孤本！请留在【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】辨法防蠹、校勘《金刚经》残页并安妥入阁。',
        nextHint:
          '在【少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】点击「配制芸香防蠹方，助虚广晒经校勘宋版孤本」或与虚广交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_cangjing',
          spotId: 'sl_cj_terrace',
          customLabel: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls10_start',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_side10_start_triggered',
        condition: SHAOLIN_SIDE10_START_CONDITION,
        effects: [openScene('scene_sls10_01', SHAOLIN_SIDE10_QUEST_ID)],
      },
      {
        id: 'trig_sls10_restore',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        onceFlag: 'sl_side10_restore_triggered',
        condition: atStep(SHAOLIN_SIDE10_QUEST_ID, 'sun_and_restore'),
        effects: [openScene('scene_sls10_03', SHAOLIN_SIDE10_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls10_start',
        label: '【少林支线】查探西厢晒经石台古籍生蠹之事',
        badge: '芸香防蠹',
        subtitle: '西厢晒经校勘石台 · 虚广',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: SHAOLIN_SIDE10_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side10_start_triggered', value: true },
          openScene('scene_sls10_01', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls10_restore',
        label: '【少林支线】配制芸香防蠹方，助虚广晒经校勘宋版孤本',
        badge: '晒经校勘',
        subtitle: '西厢晒经校勘石台',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_terrace',
        visibleWhen: atStep(SHAOLIN_SIDE10_QUEST_ID, 'sun_and_restore'),
        effects: [
          { type: 'setFlag', flag: 'sl_side10_restore_triggered', value: true },
          openScene('scene_sls10_03', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls10_start_npc',
        label: '问询藏经阁宋版孤本遭书蠹侵蚀之事',
        badge: '芸香防蠹',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0498'] },
            SHAOLIN_SIDE10_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side10_start_triggered', value: true },
          openScene('scene_sls10_01', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'act_sls10_restore_npc',
        label: '随虚广配制芸香樟脑、摊晒并补抄宋版孤本',
        badge: '晒经校勘',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0498'] },
            atStep(SHAOLIN_SIDE10_QUEST_ID, 'sun_and_restore'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side10_restore_triggered', value: true },
          openScene('scene_sls10_03', SHAOLIN_SIDE10_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideSunScriptureQuest.scenes').then((m) => m.SCENES),
  },
]
