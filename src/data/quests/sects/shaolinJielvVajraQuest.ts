import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q27_QUEST_ID = 'QST-SECT-01-27'

export const SHAOLIN_Q27_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-26', 'completed'),
    qStatus(SHAOLIN_Q27_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 420 },
    { type: 'skillAtLeast', key: '经义', min: 76 },
    { type: 'skillAtLeast', key: '书', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q27_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q27_QUEST_ID,
    title: '铁指断欲 · 降伏其心',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（关洛邪道巨擘 · 欢喜魔僧）',
    recommendedNote:
      '嵩山少林寺戒律药王脉 / 俗家护法脉真传单脉终章（全十一幕高交互）。须完成《东厢古碑 · 掌吐梵音》、入寺满 420 日且经义 ≥ 76、书 ≥ 60。关洛邪道「欢喜魔僧」冒穿少林袈裟祸乱汝许；玄寂与玄痛联手传授《大力金刚指》并赐「戒律黑铁法牌」。你直捣废寺地宫，于迷香铜铃幻阵中定心破幻，一指戳破闭穴邪功、妥善安置被掳女子并押魔返山典刑！',
    startHint:
      '完成《东厢古碑 · 掌吐梵音》、入寺满 420 日且经义 ≥ 76、书 ≥ 60 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】（或寻玄寂、玄痛）领受戒律法牌。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    },
    startCondition: SHAOLIN_Q27_START_CONDITION,
    summary:
      '{reignYear}入寺逾载，汝州、许州忽起滔天丑闻：关洛邪道巨擘【欢喜魔僧】冒穿少林红黄袈裟设坛害民、掳掠良家女子，致使少林清誉蒙尘！一拍神僧【玄寂】与铁掌禅师【玄痛】于【钟鼓禅院 · 演武坪】联手传授克制闭穴邪功的《大力金刚指》，并亲赐【戒律黑铁法牌】！你奉旨直捣汝许废寺地宫，勘破迷香铜铃欢喜禅幻阵，凭刚猛至阳之《大力金刚指》一指戳破魔僧闭穴罩门，妥善护送被掳女子归乡，并将妖僧锁拿押回嵩山典刑！',
    initialStepId: 'purge_ruxu_crypt',
    steps: {
      purge_ruxu_crypt: {
        id: 'purge_ruxu_crypt',
        title: '执牌清门 · 破幻伏魔',
        objective:
          '你已得玄寂、玄痛联手传授《大力金刚指》并受领【戒律黑铁法牌】！冒穿少林袈裟祸乱汝许的【欢喜魔僧】正盘踞汝许荒山废寺地宫，请自【钟鼓禅院 · 演武坪（sl_daxiong_west）】启程讨魔，破迷香幻阵、戳破其闭穴气功并解救被掳女子！',
        nextHint:
          '在【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】点击「手持戒律黑铁法牌杀入汝许废寺地宫 · 缉拿欢喜魔僧」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
      return_daxiong_west: {
        id: 'return_daxiong_west',
        title: '押魔返山 · 钟鼓院典刑',
        objective:
          '你已戳破欢喜魔僧的闭穴邪功、剥下伪袈裟并妥善安置被掳女子！请押解此獠返回【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】交由玄寂、玄痛二位长老依律典刑，圆满收束真传单脉！',
        nextHint:
          '返回【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】（或寻玄寂、玄痛），点击「押解欢喜魔僧返山典刑 · 交还戒律黑铁法牌」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq27_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q27_start_triggered',
        condition: SHAOLIN_Q27_START_CONDITION,
        effects: [openScene('scene_slq27_01', SHAOLIN_Q27_QUEST_ID)],
      },
      {
        id: 'trig_slq27_crypt_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q27_crypt_triggered',
        condition: atStep(SHAOLIN_Q27_QUEST_ID, 'purge_ruxu_crypt'),
        effects: [openScene('scene_slq27_04', SHAOLIN_Q27_QUEST_ID)],
      },
      {
        id: 'trig_slq27_report_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q27_report_triggered',
        condition: atStep(SHAOLIN_Q27_QUEST_ID, 'return_daxiong_west'),
        effects: [openScene('scene_slq27_10', SHAOLIN_Q27_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq27_start_west',
        label: '【戒律终章】赴钟鼓禅院演武坪 · 领法牌习《大力金刚指》',
        badge: '铁指断欲',
        subtitle: '戒律/俗家真传终章 · 钟鼓禅院 · 演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_Q27_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q27_start_triggered', value: true },
          openScene('scene_slq27_01', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq27_crypt_west',
        label: '【执牌讨魔】杀入汝许废寺地宫 · 破幻缉拿欢喜魔僧',
        badge: '地宫伏魔',
        subtitle: '废寺地宫实战 · 破欢喜禅迷阵生擒欢喜魔僧',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q27_QUEST_ID, 'purge_ruxu_crypt'),
        effects: [
          { type: 'setFlag', flag: 'sl_q27_crypt_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_crypt_entered', op: 'truthy' },
            thenEffects: [openScene('scene_slq27_06', SHAOLIN_Q27_QUEST_ID)],
            elseEffects: [openScene('scene_slq27_04', SHAOLIN_Q27_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq27_report_west',
        label: '【押魔典刑】押解欢喜魔僧返山 · 交还戒律黑铁法牌',
        badge: '降伏其心',
        subtitle: '钟鼓禅院演武坪复命 · 习得《大力金刚指》',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q27_QUEST_ID, 'return_daxiong_west'),
        effects: [
          { type: 'setFlag', flag: 'sl_q27_report_triggered', value: true },
          openScene('scene_slq27_10', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq27_start_npc',
        label: '合十请令 · 恳请玄寂与玄痛师伯授指赐牌清剿欢喜魔僧',
        badge: '铁指断欲',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134', 'NPC-0156'] },
            SHAOLIN_Q27_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q27_start_triggered', value: true },
          openScene('scene_slq27_01', SHAOLIN_Q27_QUEST_ID),
        ],
      },
      {
        id: 'act_slq27_crypt_npc',
        label: '辞别二位师伯 · 持黑铁法牌杀入汝许废寺地宫缉魔',
        badge: '地宫伏魔',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134', 'NPC-0156'] },
            atStep(SHAOLIN_Q27_QUEST_ID, 'purge_ruxu_crypt'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q27_crypt_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q27_crypt_entered', op: 'truthy' },
            thenEffects: [openScene('scene_slq27_06', SHAOLIN_Q27_QUEST_ID)],
            elseEffects: [openScene('scene_slq27_04', SHAOLIN_Q27_QUEST_ID)],
          },
        ],
      },
      {
        id: 'act_slq27_report_npc',
        label: '向玄寂与玄痛师伯复命 · 押解欢喜魔僧依律典刑',
        badge: '降伏其心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134', 'NPC-0156'] },
            atStep(SHAOLIN_Q27_QUEST_ID, 'return_daxiong_west'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q27_report_triggered', value: true },
          openScene('scene_slq27_10', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvVajraQuest.scenes').then((m) => m.SCENES),
  },
]
