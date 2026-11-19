import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q16_QUEST_ID = 'QST-SECT-01-16'

export const SHAOLIN_Q16_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-15', 'completed'),
    qStatus(SHAOLIN_Q16_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1800 },
    { type: 'skillAtLeast', key: '经义', min: 70 },
    { type: 'skillAtLeast', key: '书', min: 50 },
    { type: 'skillAtLeast', key: '辩才', min: 45 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0112', min: 50, npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
    { type: 'npcAlive', npcId: 'NPC-0193', npcName: '玄净' },
    { type: 'npcAlive', npcId: 'NPC-0789', npcName: '虚清' },
  ],
}

export const SHAOLIN_Q16_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q16_QUEST_ID,
    title: '戒台问罪 · 贪嗔痴慢',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（黑市灭口杀手 · 影刃客）',
    recommendedNote:
      '嵩山少林寺 Lv.2 戒律药王脉晋升 Lv.3 真传弟子终章大案（全二十二幕）。入寺满一千八百日、完成戒律药王脉前三回且经义 ≥ 70、书 ≥ 50、辩才 ≥ 45、玄慈好感 ≥ 50 后触发。朝廷户部暗查私卖空名度牒旧案，知客玄净欲嫁祸苦行僧虚清并雇黑市一流杀手「影刃客」于后山灭口！你星夜截杀力战影刃客救下虚清与真凭底簿，继而登大雄正殿三堂会审当众对质玄净（回扣当年香火黑账抉择），削其知客职司罚入后山苦役，终蒙玄慈方丈亲授晋升【戒律院真传弟子】！',
    startHint:
      '入寺满 1800 日、完成《药王百草 · 拈花截脉》且经义 ≥ 70、书 ≥ 50、辩才 ≥ 45、玄慈好感 ≥ 50 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】拜见玄寂即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    },
    startCondition: SHAOLIN_Q16_START_CONDITION,
    summary:
      '{reignYear}深秋，朝廷户部暗查河南道私卖空名度牒大案，直指嵩山少林知客院！知客禅师【玄净】惊惧之下竟欲将罪责尽数推给忠厚老实的苦行僧【虚清】，更暗雇洛阳黑市一流杀手「影刃客」于少室后山截杀灭口。你奉戒律院主【玄寂】密谕驰援后山，苦战生擒影刃客、救下虚清并夺得《真伪度牒核对底簿》与玄净雇凶密信。次日晨钟响彻少室，你携人证物证直登【大雄正殿 · 佛前蒲团】三堂会审，与玄净当堂对质，令其哑口无言、削去知客职司罚入后山苦役二十年！方丈【玄慈】嘉许你五年清规苦修与护寺大功，亲颁真传法衣，晋升少林派【戒律院真传弟子】！',
    initialStepId: 'backmountain_rescue',
    steps: {
      backmountain_rescue: {
        id: 'backmountain_rescue',
        title: '后山截杀 · 营救虚清',
        objective:
          '户部暗查私卖度牒案，玄净欲嫁祸苦行僧虚清并雇杀手于少室后山灭口！请于【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】即刻星夜驰援后山崖道，力战黑市杀手「影刃客」救下虚清！',
        nextHint:
          '在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】点击「驰援少室后山 · 截杀影刃客营救虚清」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
      daxiong_jietai_trial: {
        id: 'daxiong_jietai_trial',
        title: '三堂会审 · 戒台问罪',
        objective:
          '已生擒黑市杀手「影刃客」并救出苦行僧虚清，人证物证俱全！请前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】参加三堂会审，当众对质玄净，肃清少林蛀虫并受晋真传！',
        nextHint:
          '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】点击「登大雄正殿 · 三堂会审对质玄净」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_main',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq16_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q16_start_triggered',
        condition: SHAOLIN_Q16_START_CONDITION,
        effects: [openScene('scene_slq16_01', SHAOLIN_Q16_QUEST_ID)],
      },
      {
        id: 'trig_slq16_trial_main',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q16_trial_triggered',
        condition: atStep(SHAOLIN_Q16_QUEST_ID, 'daxiong_jietai_trial'),
        effects: [openScene('scene_slq16_10', SHAOLIN_Q16_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq16_start_west',
        label: '【戒律晋升】户部密查度牒案 · 领玄寂密谕驰援后山',
        badge: '戒台问罪',
        subtitle: '第一幕 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_Q16_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q16_start_triggered', value: true },
          openScene('scene_slq16_01', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq16_rescue_west',
        label: '【戒台问罪】驰援少室后山 · 截杀影刃客营救虚清',
        badge: '后山截杀',
        subtitle: '实战一流下品黑市杀手 · 夺回真凭底簿',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q16_QUEST_ID, 'backmountain_rescue'),
        effects: [openScene('scene_slq16_03', SHAOLIN_Q16_QUEST_ID)],
      },
      {
        id: 'spot_slq16_trial_main',
        label: '【戒台问罪】登大雄正殿 · 三堂会审对质玄净（晋升真传）',
        badge: '三堂会审',
        subtitle: '大雄正殿 · 佛前蒲团（Lv.3 真传晋升）',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q16_QUEST_ID, 'daxiong_jietai_trial'),
        effects: [
          { type: 'setFlag', flag: 'sl_q16_trial_triggered', value: true },
          openScene('scene_slq16_10', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq16_start_npc',
        label: '听取玄寂师伯密谕 · 彻查户部度牒案',
        badge: '戒台问罪',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            SHAOLIN_Q16_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q16_start_triggered', value: true },
          openScene('scene_slq16_01', SHAOLIN_Q16_QUEST_ID),
        ],
      },
      {
        id: 'act_slq16_rescue_npc',
        label: '禀告玄寂师伯 · 即刻奔赴后山截杀救虚清',
        badge: '后山截杀',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            atStep(SHAOLIN_Q16_QUEST_ID, 'backmountain_rescue'),
          ],
        },
        effects: [openScene('scene_slq16_03', SHAOLIN_Q16_QUEST_ID)],
      },
      {
        id: 'act_slq16_trial_npc',
        label: '携人证物证上殿 · 启大雄正殿三堂会审',
        badge: '三堂会审',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0134', 'NPC-0193', 'NPC-0789'] },
            atStep(SHAOLIN_Q16_QUEST_ID, 'daxiong_jietai_trial'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q16_trial_triggered', value: true },
          openScene('scene_slq16_10', SHAOLIN_Q16_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvTrialPromoteQuest.scenes').then((m) => m.SCENES),
  },
]
