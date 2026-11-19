import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q09_QUEST_ID = 'QST-SECT-01-09'

export const SHAOLIN_Q09_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-04', 'completed'),
    qStatus(SHAOLIN_Q09_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'damo'),
    flag('shaolin_disciple_type', 'eq', 'monk'),
    { type: 'skillAtLeast', key: '经义', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
  ],
}

export const SHAOLIN_Q09_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q09_QUEST_ID,
    title: '剑痕绝壁 · 达摩初剑',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流下品',
    maxOpponentRealm: '二流下品（关西邪剑首 · 阴风剑韩厉）',
    recommendedNote:
      '嵩山少林寺达摩院脉 Lv.2 初阶传承任务链（全十六幕）。须已剃度出家、择定达摩院脉且经义 ≥ 50。随达摩院首座玄难登绝壁石刻剑痕崖观历代剑意、领悟《伏魔剑》起手心法，并以戒剑迎战闯山挑衅的关西三邪剑，于眉心半寸处收剑伏魔。',
    startHint:
      '归入达摩院脉（出家弟子）且经义 ≥ 50 后，前往【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖】（或寻达摩院首座玄难）即可开启《剑痕绝壁 · 达摩初剑》。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_Q09_START_CONDITION,
    summary:
      '{reignYear}你既入少林达摩院脉，首座【玄难】亲引你攀上云雾缭绕的【绝壁石刻 · 剑痕崖】，观摩历代禅师留于青壁之上的剑痕笔意，口授少林正宗剑诀《伏魔剑》，叮嘱「佛门执剑，非为嗜杀，乃斩外魔与心障」。正值你静心参悟崖壁剑势之际，关西三邪剑——首恶【阴风剑 · 韩厉】率曹枭、魏七闯上剑痕崖，狂言和尚只配敲木鱼念经、不配佩剑，更欲削平石刻。你手执玄铁戒剑挺身迎敌，先破双凶诡刺夹击，再以《伏魔剑》正大剑意直取韩厉中宫，剑尖点至其眉心半寸戛然收手。三邪剑骇然拜服而退，玄难亲授《伏魔剑》法本。',
    initialStepId: 'study_sword_cliff',
    steps: {
      study_sword_cliff: {
        id: 'study_sword_cliff',
        title: '观崖悟剑 · 邪客登门',
        objective:
          '玄难首座已在剑痕崖指点《伏魔剑》起手剑意。请留驻【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】静观壁上石痕，参悟剑路轻重缓急。',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】点击「临崖参悟石刻剑意 · 演练伏魔初剑」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_east',
          customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
        },
      },
      repel_guanxi_swords: {
        id: 'repel_guanxi_swords',
        title: '戒剑伏魔 · 破关西三邪',
        objective:
          '关西三邪剑闯上剑痕崖辱骂少林、欲毁先贤剑刻！请在【达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】执戒剑连破曹枭、魏七与首恶「阴风剑 · 韩厉」，以伏魔剑意镇压群邪！',
        nextHint:
          '在【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖（sl_damo_east）】点击「手执戒剑 · 迎战关西三邪剑」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_east',
          customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq09_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q09_start_triggered',
        condition: SHAOLIN_Q09_START_CONDITION,
        effects: [openScene('scene_slq09_01', SHAOLIN_Q09_QUEST_ID)],
      },
      {
        id: 'trig_slq09_cliff_study',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q09_study_triggered',
        condition: atStep(SHAOLIN_Q09_QUEST_ID, 'study_sword_cliff'),
        effects: [openScene('scene_slq09_05', SHAOLIN_Q09_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq09_start_east',
        label: '【达摩院脉】登绝壁剑痕崖 · 随玄难首座初参伏魔剑',
        badge: '达摩初剑',
        subtitle: '达摩院脉第一回 · 绝壁石刻 · 剑痕崖',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: SHAOLIN_Q09_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q09_start_triggered', value: true },
          openScene('scene_slq09_01', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq09_cliff_study',
        label: '【达摩院脉】临崖参悟石刻剑意 · 演练伏魔初剑',
        badge: '观崖悟剑',
        subtitle: '绝壁石刻 · 剑痕崖（参悟剑意引出邪剑客）',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q09_QUEST_ID, 'study_sword_cliff'),
        effects: [
          { type: 'setFlag', flag: 'sl_q09_study_triggered', value: true },
          openScene('scene_slq09_05', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq09_duel_hanli',
        label: '【达摩院脉】手执戒剑 · 迎战关西三邪剑',
        badge: '戒剑伏魔',
        subtitle: '剑痕崖实战 · 连破关西三邪剑',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: atStep(SHAOLIN_Q09_QUEST_ID, 'repel_guanxi_swords'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q09_minions_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq09_12', SHAOLIN_Q09_QUEST_ID)],
            elseEffects: [openScene('scene_slq09_10', SHAOLIN_Q09_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq09_start_npc',
        label: '合十请益 · 随玄难首座登剑痕崖习练《伏魔剑》',
        badge: '达摩初剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [{ type: 'targetNpcMatch', npcIds: ['NPC-0127'] }, SHAOLIN_Q09_START_CONDITION],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q09_start_triggered', value: true },
          openScene('scene_slq09_01', SHAOLIN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'act_slq09_study_npc',
        label: '向玄难首座禀报观崖心得 · 续参石刻剑意',
        badge: '观崖悟剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
            atStep(SHAOLIN_Q09_QUEST_ID, 'study_sword_cliff'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q09_study_triggered', value: true },
          openScene('scene_slq09_05', SHAOLIN_Q09_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoFumoSwordQuest.scenes').then((m) => m.SCENES),
  },
]
