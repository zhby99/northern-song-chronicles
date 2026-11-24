import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q17_QUEST_ID = 'QST-SECT-01-17'

export const SHAOLIN_Q17_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-04', 'completed'),
    qStatus(SHAOLIN_Q17_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'layman'),
    { type: 'skillAtLeast', key: '经义', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-0273', npcName: '慧照' },
    { type: 'npcAlive', npcId: 'NPC-0728', npcName: '卫弘龙' },
  ],
}

export const SHAOLIN_Q17_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q17_QUEST_ID,
    title: '相国暗影 · 红尘刀杖',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'bianliang',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流中品（青蛇帮主 · 毒蛇钱五）',
    recommendedNote:
      '嵩山少林寺 Lv.2 俗家护法脉首回历练（全十一幕）。须择定俗家护法脉、完成木桩百劫大考且经义 ≥ 50。驻守汴京大相国寺万姓交易雅市，或散银买线、或弈棋辩才套话、或仗义直闯瓦子查清青蛇帮巢穴；蒙慧照禅师双授《普门杖法》与《慈悲刀法》，夜破聚宝暗坊擒毒蛇钱五，并自定市井赃银归处。',
    startHint:
      '择定俗家护法脉且经义 ≥ 50 后，前往【开封府 · 大相国寺 · 相国寺万姓交易雅市】（或寻慧照禅师、卫弘龙）即可领命驻守雅市。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_market',
      customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
    },
    startCondition: SHAOLIN_Q17_START_CONDITION,
    summary:
      '{reignYear}春深，你既择少林【俗家护法脉】，遂领嵩山法谕东出汴京，驻守【大相国寺 · 相国寺万姓交易雅市】。地头蛇【青蛇帮】买通寺院逐出之败类刁三，伪造租契强收三成「青蛇平安钱」欺压西廊商户。你协同金刚僧【慧照】、俗家师兄【卫弘龙】与【郑刚】暗访汴京瓦子——或散银打赏牙人、或借弈棋辩才套话摸清赌坊暗道，亦或直闯瓦子街口截住帮众逼供；随后赴【大雄宝殿（香云宝鼎）】蒙慧照亲授《普门杖法》与《慈悲刀法》，是夜带发提刀直捣聚宝暗坊力擒青蛇帮主【毒蛇钱五】，重还汴京商道清明。',
    initialStepId: 'market_patrol',
    steps: {
      market_patrol: {
        id: 'market_patrol',
        title: '万姓暗访 · 瓦子寻踪',
        objective:
          '青蛇帮正勾结寺院败类刁三在西廊勒索商户，主使毒蛇钱五藏身城南瓦子赌坊。请留在【大相国寺 · 相国寺万姓交易雅市（bl_xg_market）】查访西廊药铺并在瓦子茶棚设法摸清毒蛇钱五巢穴底细。',
        nextHint:
          '在【开封府 · 大相国寺 · 相国寺万姓交易雅市（bl_xg_market）】点击「巡查西廊与瓦子茶棚 · 暗访青蛇帮暗线」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_market',
          customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
        },
      },
      hall_training: {
        id: 'hall_training',
        title: '香云听偈 · 刀杖双授',
        objective:
          '已探明青蛇帮主「毒蛇钱五」今夜二更将在瓦子聚宝暗坊聚众纵火。速赴【大相国寺 · 大雄宝殿（香云宝鼎）（bl_xg_hall）】禀报慧照禅师，领受《普门杖法》与《慈悲刀法》护法真传！',
        nextHint:
          '前往【开封府 · 大相国寺 · 大雄宝殿（香云宝鼎）（bl_xg_hall）】，点击「参拜香云宝鼎 · 领受慧照刀杖护法真传」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_hall',
          customLabel: '开封府 · 大相国寺 · 大雄宝殿（香云宝鼎）',
        },
      },
      wazi_showdown: {
        id: 'wazi_showdown',
        title: '红尘提刀 · 夜荡瓦子',
        objective:
          '慧照禅师已将《普门杖法》与《慈悲刀法》真意倾囊相授，二更将至！请速返【大相国寺 · 相国寺万姓交易雅市（bl_xg_market）】，带发提刀夜入瓦子聚宝暗坊擒拿毒蛇钱五！',
        nextHint:
          '前往【开封府 · 大相国寺 · 相国寺万姓交易雅市（bl_xg_market）】，点击「夜入瓦子聚宝暗坊 · 决战毒蛇钱五」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_market',
          customLabel: '开封府 · 大相国寺 · 相国寺万姓交易雅市',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq17_start_market',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        onceFlag: 'sl_q17_start_triggered',
        condition: SHAOLIN_Q17_START_CONDITION,
        effects: [openScene('scene_slq17_01', SHAOLIN_Q17_QUEST_ID)],
      },
      {
        id: 'trig_slq17_patrol',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        onceFlag: 'sl_q17_patrol_triggered',
        condition: atStep(SHAOLIN_Q17_QUEST_ID, 'market_patrol'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_intel_mode', op: 'eq', value: 'brawl' },
            thenEffects: [openScene('scene_slq17_04', SHAOLIN_Q17_QUEST_ID)],
            elseEffects: [openScene('scene_slq17_02', SHAOLIN_Q17_QUEST_ID)],
          },
        ],
      },
      {
        id: 'trig_slq17_hall',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        onceFlag: 'sl_q17_hall_triggered',
        condition: atStep(SHAOLIN_Q17_QUEST_ID, 'hall_training'),
        effects: [openScene('scene_slq17_06', SHAOLIN_Q17_QUEST_ID)],
      },
      {
        id: 'trig_slq17_wazi',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        onceFlag: 'sl_q17_wazi_triggered',
        condition: atStep(SHAOLIN_Q17_QUEST_ID, 'wazi_showdown'),
        effects: [openScene('scene_slq17_08', SHAOLIN_Q17_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq17_start',
        label: '【俗家护法】驻守大相国寺雅市 · 拜会慧照与卫弘龙',
        badge: '红尘护法',
        subtitle: '相国寺万姓交易雅市 · 领命护持寺院商铺',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: SHAOLIN_Q17_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q17_start_triggered', value: true },
          openScene('scene_slq17_01', SHAOLIN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq17_patrol',
        label: '【俗家护法】巡查西廊与瓦子茶棚 · 暗访青蛇帮暗线',
        badge: '市井暗访',
        subtitle: '或散银买线、或弈棋套话、或直闯街口逼供',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: atStep(SHAOLIN_Q17_QUEST_ID, 'market_patrol'),
        effects: [
          { type: 'setFlag', flag: 'sl_q17_patrol_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q17_intel_mode', op: 'eq', value: 'brawl' },
            thenEffects: [openScene('scene_slq17_04', SHAOLIN_Q17_QUEST_ID)],
            elseEffects: [openScene('scene_slq17_02', SHAOLIN_Q17_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq17_hall',
        label: '【俗家护法】参拜香云宝鼎 · 领受慧照刀杖护法真传',
        badge: '刀杖双授',
        subtitle: '大雄宝殿香云宝鼎 · 领悟《普门杖法》与《慈悲刀法》',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        visibleWhen: atStep(SHAOLIN_Q17_QUEST_ID, 'hall_training'),
        effects: [
          { type: 'setFlag', flag: 'sl_q17_hall_triggered', value: true },
          openScene('scene_slq17_06', SHAOLIN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq17_wazi',
        label: '【俗家护法】夜入瓦子聚宝暗坊 · 决战毒蛇钱五',
        badge: '夜荡青蛇',
        subtitle: '暗道奇袭或破门硬闯 · 荡平青蛇帮恶党',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: atStep(SHAOLIN_Q17_QUEST_ID, 'wazi_showdown'),
        effects: [
          { type: 'setFlag', flag: 'sl_q17_wazi_triggered', value: true },
          openScene('scene_slq17_08', SHAOLIN_Q17_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq17_start_npc',
        label: '出示嵩山法谕 · 报到驻守相国寺万姓雅市',
        badge: '红尘护法',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0273', 'NPC-0728', 'NPC-0570'] },
            SHAOLIN_Q17_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q17_start_triggered', value: true },
          openScene('scene_slq17_01', SHAOLIN_Q17_QUEST_ID),
        ],
      },
      {
        id: 'act_slq17_hall_npc',
        label: '禀报青蛇帮动向 · 请慧照禅师指点刀杖护法绝学',
        badge: '刀杖双授',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0273'] },
            atStep(SHAOLIN_Q17_QUEST_ID, 'hall_training'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q17_hall_triggered', value: true },
          openScene('scene_slq17_06', SHAOLIN_Q17_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLaymanXiangguoQuest.scenes').then((m) => m.SCENES),
  },
]
