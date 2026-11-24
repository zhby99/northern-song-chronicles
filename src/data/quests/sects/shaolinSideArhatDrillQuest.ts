import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE11_QUEST_ID = 'QST-SECT-01-SIDE-11'

export const SHAOLIN_SIDE11_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE11_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '策论', min: 35 },
    { type: 'npcAlive', npcId: 'NPC-0254', npcName: '慧轮' },
    { type: 'npcAlive', npcId: 'NPC-0769', npcName: '虚胜' },
  ],
}

export const SHAOLIN_SIDE11_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE11_QUEST_ID,
    title: '罗汉涂金 · 顽徒试炼',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（嵩山绿林狂徒 · 铁锤霸）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门压轴支线（全九幕）。策论达三十五后，于十八铜人罗汉堂演武正殿受慧轮之托调教偷懒顽劣的外门武僧排演“小罗汉阵”：可凭弈理经义寓阵于弈激励士气，临战由顽徒牵制喽啰助你单挑铁锤霸；亦可铁律严训加桩立威，独自车轮连破闯山三狂徒，战后亲裁奖惩。',
    startHint:
      '晋升少林内门策论不低于三十五后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿】寻慧轮或虚胜即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    },
    startCondition: SHAOLIN_SIDE11_START_CONDITION,
    summary:
      '{reignYear}嵩山少林寺十八铜人罗汉堂正值秋操大演，罗汉堂慧字辈首徒【慧轮】见门下年轻外门顽徒【虚胜】、【虚觉】等人偷懒打盹、各行其是，特邀通晓兵法策论的你出任教习督导排演“小罗汉阵”。你或因材施教寓阵于弈、或铁律戒尺严训立威，正逢嵩山绿林狂徒【铁锤霸】携双锤闯山门叫阵，你亲出阵眼重创狂徒、令顽徒心悦诚服，并亲定战后奖惩之法。',
    initialStepId: 'drill_and_defend',
    steps: {
      drill_and_defend: {
        id: 'drill_and_defend',
        title: '排演罗汉 · 阵困狂徒',
        objective:
          '已领慧轮师兄之托督导虚胜、虚觉演练小罗汉阵！请留在【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】调教顽徒合阵，并迎击闯山叫阵的嵩山绿林狂徒。',
        nextHint:
          '在【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】点击「督导小罗汉阵合练，迎击闯山狂徒铁锤霸」或与慧轮交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_main',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls11_start',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_side11_start_triggered',
        condition: SHAOLIN_SIDE11_START_CONDITION,
        effects: [openScene('scene_sls11_01', SHAOLIN_SIDE11_QUEST_ID)],
      },
      {
        id: 'trig_sls11_drill',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_side11_drill_triggered',
        condition: atStep(SHAOLIN_SIDE11_QUEST_ID, 'drill_and_defend'),
        effects: [openScene('scene_sls11_03', SHAOLIN_SIDE11_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls11_start',
        label: '【少林支线】协助慧轮督导顽徒排演小罗汉阵',
        badge: '罗汉涂金',
        subtitle: '罗汉堂演武正殿 · 慧轮与虚胜',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: SHAOLIN_SIDE11_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side11_start_triggered', value: true },
          openScene('scene_sls11_01', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls11_drill',
        label: '【少林支线】督导小罗汉阵合练，迎击闯山狂徒铁锤霸',
        badge: '阵破狂徒',
        subtitle: '罗汉堂演武正殿',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: atStep(SHAOLIN_SIDE11_QUEST_ID, 'drill_and_defend'),
        effects: [
          { type: 'setFlag', flag: 'sl_side11_drill_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side11_hammer_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls11_06', SHAOLIN_SIDE11_QUEST_ID)],
            elseEffects: [openScene('scene_sls11_03', SHAOLIN_SIDE11_QUEST_ID)],
          },
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls11_start_npc',
        label: '协助慧轮督导虚胜、虚觉排演小罗汉阵',
        badge: '罗汉涂金',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0254', 'NPC-0769'] },
            SHAOLIN_SIDE11_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side11_start_triggered', value: true },
          openScene('scene_sls11_01', SHAOLIN_SIDE11_QUEST_ID),
        ],
      },
      {
        id: 'act_sls11_drill_npc',
        label: '督导小罗汉阵迎击闯山叫阵的嵩山狂徒',
        badge: '阵破狂徒',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0254', 'NPC-0769', 'NPC-0861'] },
            atStep(SHAOLIN_SIDE11_QUEST_ID, 'drill_and_defend'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side11_drill_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side11_hammer_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls11_06', SHAOLIN_SIDE11_QUEST_ID)],
            elseEffects: [openScene('scene_sls11_03', SHAOLIN_SIDE11_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideArhatDrillQuest.scenes').then((m) => m.SCENES),
  },
]
