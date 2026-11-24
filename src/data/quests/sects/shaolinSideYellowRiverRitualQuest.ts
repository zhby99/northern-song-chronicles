import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE15_QUEST_ID = 'QST-SECT-01-SIDE-15'

export const SHAOLIN_SIDE15_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus(SHAOLIN_SIDE15_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 78 },
    { type: 'skillAtLeast', key: '骑术', min: 40 },
    { type: 'npcAlive', npcId: 'NPC-0450', npcName: '慧慈' },
  ],
}

export const SHAOLIN_SIDE15_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE15_QUEST_ID,
    title: '黄河水陆 · 孤忠超度',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流上品',
    maxOpponentRealm: '一流上品（西夏一品堂渡口双刺客 · 沙狼 / 鬼刃）',
    recommendedNote:
      '少林寺 Lv.3 终极护国支线（全十六幕）。、且经义 ≥ 78、骑术 ≥ 40 后，于达摩面壁石洞飞瀑深潭试炼涧应护法僧慧慈相邀，先往大雄宝殿方丈院领受皇家水陆法幢与敕牒，随即策马北赴孟州黄河渡口主持皇家水陆法会，超度历年抗辽夏阵亡将士英灵。夜半渡口风浪骤起，西夏一品堂一流上品双刺客「鬼刃」「沙狼」潜渡袭坛、企图焚毁忠魂牌位，须与慧慈于滔滔浮桥血战诛魔，护住水陆法会梵唱彻夜不绝！',
    startHint:
      '跻身少林寺三阶高徒、且经义 ≥ 78、骑术 ≥ 40 后，前往【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧】寻慧慈即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_west',
      customLabel: '嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
    },
    startCondition: SHAOLIN_SIDE15_START_CONDITION,
    summary:
      '{reignYear}深秋，朝廷颁敕于孟州黄河渡口设皇家水陆法会，超度历年血战西北、抗辽拒夏而殉国的大宋将士英灵。少林达摩院护法僧【慧慈】深感此行路途险恶、恐有西夏细作暗中破坏，特于【达摩面壁石洞 · 飞瀑深潭 · 试炼涧】诚邀你一同北行护法。你二人先赴【大雄宝殿方丈院（sl_daxiong_main）】领受水陆金幢与皇家敕牒，随后策马疾驰北渡孟州黄河。法会当夜，黄河水灯万盏、梵唱彻天，西夏一品堂两大一流上品刺客「鬼刃」与「沙狼」果然趁黑潜渡浮桥，妄图火焚忠魂牌位、震慑中原军心！你于滔滔浊浪之上的晃动浮桥先斩诡谲狠辣的「鬼刃」，再携慧慈于法坛前血战斩杀凶悍霸道的「沙狼」，自始至终未教法坛梵唱断绝一声！三军将士与两岸百姓无不感泣，你也终回试炼涧复命归宗。',
    initialStepId: 'depart_yellow_river',
    steps: {
      depart_yellow_river: {
        id: 'depart_yellow_river',
        title: '领幢北行 · 孟州水陆法会',
        objective:
          '已应慧慈之邀共赴孟州黄河渡口主持皇家水陆法会！请前往【嵩山少林寺 · 大雄宝殿方丈院（sl_daxiong_main）】领受皇家敕牒与水陆金幢，随即策马启程北赴黄河渡口。',
        nextHint:
          '前往【大雄宝殿方丈院正殿（sl_daxiong_main）】，点击「领受皇家水陆金幢，携慧慈策马北赴孟州黄河渡口」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_main',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院正殿',
        },
      },
      return_damo_west: {
        id: 'return_damo_west',
        title: '孤忠既安 · 归涧复命',
        objective:
          '孟州黄河渡口水陆法会圆满礼成，西夏一品堂双刺客「鬼刃」「沙狼」尽数伏诛于浮桥之上！请返回【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】与慧慈一同焚香回向、复命归宗。',
        nextHint:
          '返回【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，点击「与慧慈于试炼涧焚香回向 · 了结水陆功德」或与慧慈交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_west',
          customLabel: '嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls15_start_damo_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_side15_start_triggered',
        condition: SHAOLIN_SIDE15_START_CONDITION,
        effects: [openScene('scene_sls15_01', SHAOLIN_SIDE15_QUEST_ID)],
      },
      {
        id: 'trig_sls15_depart_daxiong_main',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_side15_depart_triggered',
        condition: atStep(SHAOLIN_SIDE15_QUEST_ID, 'depart_yellow_river'),
        effects: [openScene('scene_sls15_04', SHAOLIN_SIDE15_QUEST_ID)],
      },
      {
        id: 'trig_sls15_return_damo_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_side15_return_triggered',
        condition: atStep(SHAOLIN_SIDE15_QUEST_ID, 'return_damo_west'),
        effects: [openScene('scene_sls15_14', SHAOLIN_SIDE15_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls15_start',
        label: '【少林支线】听慧慈相邀共赴黄河水陆法会',
        badge: '黄河水陆',
        subtitle: '飞瀑深潭 · 试炼涧',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: SHAOLIN_SIDE15_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side15_start_triggered', value: true },
          openScene('scene_sls15_01', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls15_depart',
        label: '【少林支线】领受皇家水陆金幢，携慧慈策马北赴孟州黄河渡口',
        badge: '孤忠超度',
        subtitle: '大雄宝殿方丈院正殿',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_SIDE15_QUEST_ID, 'depart_yellow_river'),
        effects: [
          { type: 'setFlag', flag: 'sl_side15_depart_triggered', value: true },
          openScene('scene_sls15_04', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls15_return',
        label: '【少林支线】与慧慈于试炼涧焚香回向 · 了结水陆功德',
        badge: '功德圆满',
        subtitle: '飞瀑深潭 · 试炼涧',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: atStep(SHAOLIN_SIDE15_QUEST_ID, 'return_damo_west'),
        effects: [
          { type: 'setFlag', flag: 'sl_side15_return_triggered', value: true },
          openScene('scene_sls15_14', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls15_start_npc',
        label: '应慧慈之邀护持孟州黄河皇家水陆法会',
        badge: '黄河水陆',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0450'] },
            SHAOLIN_SIDE15_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side15_start_triggered', value: true },
          openScene('scene_sls15_01', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
      {
        id: 'act_sls15_return_npc',
        label: '与慧慈焚香回向黄河忠魂并了结法会功德',
        badge: '功德圆满',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0450'] },
            atStep(SHAOLIN_SIDE15_QUEST_ID, 'return_damo_west'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side15_return_triggered', value: true },
          openScene('scene_sls15_14', SHAOLIN_SIDE15_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideYellowRiverRitualQuest.scenes').then((m) => m.SCENES),
  },
]
