import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE03_QUEST_ID = 'QST-SECT-01-SIDE-03'

export const SHAOLIN_SIDE03_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-ENTRY', 'completed'),
    qStatus(SHAOLIN_SIDE03_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '算术', min: 25 },
    { type: 'npcAlive', npcId: 'NPC-0789', npcName: '虚清' },
  ],
}

export const SHAOLIN_SIDE03_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE03_QUEST_ID,
    title: '登封买粮 · 斗秤破奸',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '三流中品',
    maxOpponentRealm: '三流中品（粮行恶护院 · 钱大棒）',
    recommendedNote:
      '少林寺 Lv.1 外门日常支线（全九幕）。算术初成后，于大雄宝殿方丈院钟鼓禅院演武坪随苦行僧虚清领命下山，赴登封县城恒丰粮行核验春粮账目。亲算官斛斤两、无提示当堂识破「大斗进、小斗出、秤砣灌铅」之奸计，力挫恶护院钱大棒并自决追回黑银归处。',
    startHint:
      '拜入嵩山少林寺且具相当算术造诣后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】寻苦行僧虚清即可领命。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    },
    startCondition: SHAOLIN_SIDE03_START_CONDITION,
    summary:
      '{reignYear}青黄不接之际，少室山千余僧众常住春粮告紧。苦行僧虚清疑心登封县城「恒丰粮行」所售斋米斤两暗亏，遂邀精于算学的你一同下山核验。你先往罗汉堂东庑校量官颁铁斛并领妥防身短棍，随即随虚清赴粮行过斗对账。当众查清黑心掌柜贾算盘大斗进、小斗出、秤砣灌铅克扣斤两的实数铁证，挫败恶护院「钱大棒」阻拦，追回多吞黑银并补足足秤新米，既护千僧口粮，亦惠及登封乡邻。',
    initialStepId: 'depart_dengfeng',
    steps: {
      depart_dengfeng: {
        id: 'depart_dengfeng',
        title: '校斛下山 · 登封验粮',
        objective:
          '已领苦行僧虚清所托！请前往【嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】核对官颁铁斛尺寸、备妥护身短棍，随后随虚清下山赴登封县城恒丰粮行采办常住春粮。',
        nextHint:
          '前往【十八铜人罗汉堂 · 东庑碑帖武库院（sl_luohan_west）】，点击「校斛领棍，随虚清下山赴登封粮行」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_west',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 东庑碑帖武库院',
        },
      },
      return_report: {
        id: 'return_report',
        title: '满载归山 · 结账复命',
        objective:
          '恒丰粮行灌铅暗秤已破，足秤常住斋粮已运回少室山！请返回【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】向苦行僧虚清结账复命。',
        nextHint:
          '返回【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「向虚清结清登封买粮账目」或与虚清交谈。',
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
        id: 'trig_sls03_start_daxiong_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_side03_start_triggered',
        condition: SHAOLIN_SIDE03_START_CONDITION,
        effects: [openScene('scene_sls03_01', SHAOLIN_SIDE03_QUEST_ID)],
      },
      {
        id: 'trig_sls03_depart_luohan_west',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        onceFlag: 'sl_side03_depart_triggered',
        condition: atStep(SHAOLIN_SIDE03_QUEST_ID, 'depart_dengfeng'),
        effects: [openScene('scene_sls03_02', SHAOLIN_SIDE03_QUEST_ID)],
      },
      {
        id: 'trig_sls03_return_daxiong_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_side03_report_triggered',
        condition: atStep(SHAOLIN_SIDE03_QUEST_ID, 'return_report'),
        effects: [openScene('scene_sls03_08', SHAOLIN_SIDE03_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls03_start',
        label: '【少林支线】问询千僧春粮采办事宜',
        badge: '登封买粮',
        subtitle: '钟鼓禅院 · 演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_SIDE03_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side03_start_triggered', value: true },
          openScene('scene_sls03_01', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls03_depart',
        label: '【少林支线】校斛领棍，随虚清下山赴登封粮行',
        badge: '斗秤破奸',
        subtitle: '东庑碑帖武库院',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_west',
        visibleWhen: atStep(SHAOLIN_SIDE03_QUEST_ID, 'depart_dengfeng'),
        effects: [
          { type: 'setFlag', flag: 'sl_side03_depart_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side03_fight_ready', op: 'truthy' },
            thenEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_s03_scam_exposed', op: 'truthy' },
                thenEffects: [openScene('scene_sls03_04_expose', SHAOLIN_SIDE03_QUEST_ID)],
                elseEffects: [openScene('scene_sls03_04_fail', SHAOLIN_SIDE03_QUEST_ID)],
              },
            ],
            elseEffects: [openScene('scene_sls03_02', SHAOLIN_SIDE03_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls03_return',
        label: '【少林支线】向虚清结清登封买粮账目',
        badge: '斋粮归仓',
        subtitle: '钟鼓禅院 · 演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_SIDE03_QUEST_ID, 'return_report'),
        effects: [
          { type: 'setFlag', flag: 'sl_side03_report_triggered', value: true },
          openScene('scene_sls03_08', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls03_start_npc',
        label: '随虚清师兄下山赴登封采办常住春粮',
        badge: '登封买粮',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0789'] },
            SHAOLIN_SIDE03_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side03_start_triggered', value: true },
          openScene('scene_sls03_01', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
      {
        id: 'act_sls03_report_npc',
        label: '向虚清师兄交割登封春粮与追回纹银',
        badge: '斋粮归仓',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0789'] },
            atStep(SHAOLIN_SIDE03_QUEST_ID, 'return_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side03_report_triggered', value: true },
          openScene('scene_sls03_08', SHAOLIN_SIDE03_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideGrainScaleQuest.scenes').then((m) => m.SCENES),
  },
]
