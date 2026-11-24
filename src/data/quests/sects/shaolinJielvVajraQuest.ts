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
      '嵩山少林寺戒律药王脉 / 俗家护法脉真传单脉终章（全二十二幕）。须完成《东厢古碑 · 掌吐梵音》、入寺满 420 日且经义 ≥ 76、书 ≥ 60。关洛邪道巨擘「欢喜魔僧」冒穿少林袈裟祸乱汝州、许州一带，败坏佛门清誉；戒律二老玄寂与玄痛于钟鼓禅院演武坪联手传授《大力金刚指》，赐你「戒律黑铁法牌」代寺行刑。你孤身杀入汝许废寺地宫，一指戳破欢喜魔僧的闭穴邪功，剥其伪袈裟、押回嵩山依律典刑！',
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
      '{reignYear}入寺十载，汝州与许州一带忽起滔天丑闻：关洛邪道巨擘【欢喜魔僧】竟冒穿少林红黄袈裟、假托少林高僧名号设坛敛财害民，致使少林清誉蒙尘！一拍神僧【玄寂】与铁掌禅师【玄痛】震怒之下，于【钟鼓禅院 · 演武坪】联手为你传授克制邪道横练闭穴功的少林绝艺《大力金刚指》，并亲授象征少林戒律最高权柄的【戒律黑铁法牌】！你奉旨下山直捣汝许荒山废寺地宫，于阴森妖坛前迎战一流中品欢喜魔僧，凭刚猛至阳之《大力金刚指》一指戳破其闭穴气功、废其邪艺，将其剥去伪袈裟、铁链锁拿押回嵩山典刑，正气震彻关洛！',
    initialStepId: 'purge_ruxu_crypt',
    steps: {
      purge_ruxu_crypt: {
        id: 'purge_ruxu_crypt',
        title: '执牌清门 · 杀入废寺地宫',
        objective:
          '你已得玄寂、玄痛联手传授《大力金刚指》并受领【戒律黑铁法牌】！冒穿少林袈裟祸乱汝许的【欢喜魔僧】正盘踞汝许荒山废寺地宫，请自【钟鼓禅院 · 演武坪（sl_daxiong_west）】启程讨魔，戳破其闭穴气功、将其押回嵩山！',
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
          '你已戳破欢喜魔僧的闭穴邪功并剥下其伪冒袈裟！请押解此獠返回【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】交由玄寂、玄痛二位长老依律典刑，圆满收束真传单脉！',
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
        effects: [openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID)],
      },
      {
        id: 'trig_slq27_report_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q27_report_triggered',
        condition: atStep(SHAOLIN_Q27_QUEST_ID, 'return_daxiong_west'),
        effects: [openScene('scene_slq27_19', SHAOLIN_Q27_QUEST_ID)],
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
        label: '【执牌讨魔】杀入汝许废寺地宫 · 戳破欢喜魔僧闭穴气功',
        badge: '地宫伏魔',
        subtitle: '废寺地宫实战 · 生擒关洛邪道巨擘欢喜魔僧（一流中品）',
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
            thenEffects: [openScene('scene_slq27_14', SHAOLIN_Q27_QUEST_ID)],
            elseEffects: [openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID)],
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
          openScene('scene_slq27_19', SHAOLIN_Q27_QUEST_ID),
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
            thenEffects: [openScene('scene_slq27_14', SHAOLIN_Q27_QUEST_ID)],
            elseEffects: [openScene('scene_slq27_09', SHAOLIN_Q27_QUEST_ID)],
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
          openScene('scene_slq27_19', SHAOLIN_Q27_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvVajraQuest.scenes').then((m) => m.SCENES),
  },
]
