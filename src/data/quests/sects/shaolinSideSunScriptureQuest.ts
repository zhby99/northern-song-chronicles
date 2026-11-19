import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE10_QUEST_ID = 'QST-SECT-01-SIDE-10'

export const SHAOLIN_SIDE10_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE10_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 900 },
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
    maxOpponentRealm: '无战斗（校勘文德专项）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门文德支线（全十幕，无战斗）。入寺满九百日且经义五十五、书法四十后，于少林藏经阁西厢晒经校勘石台助虚广依古方调配芸香樟脑抢救受蠹宋版孤本，偶读前代高僧留下的禅武批注而大有进益，并获扫地僧法空于古杏树下远观颔首。',
    startHint:
      '晋升少林内门且入寺满九百日、经义不低于五十五、书法不低于四十后，前往【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台】寻虚广即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_terrace',
      customLabel: '嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台',
    },
    startCondition: SHAOLIN_SIDE10_START_CONDITION,
    summary:
      '{reignYear}伏夏将过、秋阳高照，少林藏经阁依例开晒古籍，却惊觉一批前朝与本朝初年的宋版佛经孤本因连月湿气而遭书蠹侵蚀，数卷残页几乎脆裂成灰。药王院采药僧【虚广】正于西厢晒经校勘石台急得团团转，你闻讯上前相助，按古籍《齐民要术》与佛门护经古法，以芸香草、冰片、樟脑与黄柏汁精心调配防蠹香囊与护纸药水，又以工整小楷逐字补抄残缺经文。晒经校勘之间，你无意在一部《楞伽经》夹页中读到前代少林高僧以朱笔写就的武学慈悲批注，顿觉胸中经义与武理豁然贯通；石台外百年古杏树下，灰衣扫地僧【法空】正停帚远观，微微颔首。',
    initialStepId: 'sun_and_restore',
    steps: {
      sun_and_restore: {
        id: 'sun_and_restore',
        title: '配香护卷 · 校勘孤本',
        objective:
          '已应虚广之请抢救藏经阁受蠹宋版孤本！请留在【嵩山少林寺 · 少林藏经阁 · 西厢晒经校勘石台（sl_cj_terrace）】调配芸香樟脑防蠹药囊，逐卷摊晒并补抄校勘残页。',
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
