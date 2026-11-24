import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q10_QUEST_ID = 'QST-SECT-01-10'

export const SHAOLIN_Q10_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-09', 'completed'),
    qStatus(SHAOLIN_Q10_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 150 },
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '书', min: 35 },
    { type: 'skillAtLeast', key: '棋', min: 30 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
  ],
}

export const SHAOLIN_Q10_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q10_QUEST_ID,
    title: '洛水飞花 · 散花破幻',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品（星宿派妖女 · 毒罗刹）',
    recommendedNote:
      '嵩山少林寺达摩院脉 Lv.2 中阶历练任务链（全十一幕）。须完成《剑痕绝壁 · 达摩初剑》、入寺满 150 日且经义 ≥ 55、书 ≥ 35、棋 ≥ 30。玄难借落英禅棋传授《散花掌》，命你下山赴洛阳查探牡丹会画舫毒案；夜探瑶华舫于丝竹诱饵间鉴伪识毒，择策破功直挑毒罗刹或正面降妖，战后更须决断散药济众之道。',
    startHint:
      '完成《剑痕绝壁 · 达摩初剑》、入寺满 150 日且经义 ≥ 55、书 ≥ 35、棋 ≥ 30 后，前往【嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖】（或寻玄难首座）开启任务。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      customLabel: '嵩山少林寺 · 达摩院 · 绝壁石刻 · 剑痕崖',
    },
    startCondition: SHAOLIN_Q10_START_CONDITION,
    summary:
      '{reignYear}暮春洛阳牡丹盛会期间，星宿派妖女【毒罗刹 · 柳碧烟】携护法【腐骨子】潜伏洛水画舫，暗布幻毒诱困中原武林名宿。达摩院首座【玄难】在剑痕崖借落英与禅棋步法传授《散花掌》，遣你下山赴洛阳破局。你自洛阳酒肆暗访查明「瑶华舫」泊位，亥时孤身登舟于清茶、无灰莲花香炉与牡丹绘扇之间辨伪破幻，继而以击碎毒炉、棋局护众或正面散花反卷毒粉击溃星宿二凶，救出温老英雄与船客歌姬，扬少林侠名于洛水。',
    initialStepId: 'luoyang_boat_probe',
    steps: {
      luoyang_boat_probe: {
        id: 'luoyang_boat_probe',
        title: '洛阳暗访 · 寻踪画舫',
        objective:
          '玄难首座已传授《散花掌》起手心法，遣你下山救援遭星宿妖女暗算的武林名宿。请前往【洛阳府 · 洛阳酒肆（luoyang_base_tavern）】打探牡丹会洛水画舫泊位！',
        nextHint:
          '前往【洛阳府 · 洛阳酒肆（luoyang_base_tavern）】，点击「暗访洛水画舫线索 · 夜探星宿毒舟」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'luoyang_base_tavern',
          customLabel: '洛阳府 · 洛阳酒肆',
        },
      },
      luoshui_boat_battle: {
        id: 'luoshui_boat_battle',
        title: '散花破幻 · 画舫擒妖',
        objective:
          '你已识破假扮雅士的星宿妖女「毒罗刹」！请在【洛阳府 · 洛阳酒肆（luoyang_base_tavern）】登舟破局，以《散花掌》降服星宿妖人并救出人质！',
        nextHint:
          '在【洛阳府 · 洛阳酒肆（luoyang_base_tavern）】点击「夜探洛水画舫 · 以散花掌力战星宿妖女」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'luoyang_base_tavern',
          customLabel: '洛阳府 · 洛阳酒肆（洛水画舫）',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq10_start_east',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        onceFlag: 'sl_q10_start_triggered',
        condition: SHAOLIN_Q10_START_CONDITION,
        effects: [openScene('scene_slq10_01', SHAOLIN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_slq10_luoyang_tavern',
        regionId: 'luoyang',
        buildingId: 'luoyang_base_tavern',
        onceFlag: 'sl_q10_tavern_triggered',
        condition: atStep(SHAOLIN_Q10_QUEST_ID, 'luoyang_boat_probe'),
        effects: [openScene('scene_slq10_03', SHAOLIN_Q10_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq10_start_east',
        label: '【达摩院脉】剑痕崖观落英对弈 · 领受《散花掌》赴洛阳破毒',
        badge: '洛水飞花',
        subtitle: '达摩院脉第二回 · 绝壁石刻 · 剑痕崖',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        visibleWhen: SHAOLIN_Q10_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q10_start_triggered', value: true },
          openScene('scene_slq10_01', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq10_luoyang_probe',
        label: '【达摩院脉】暗访洛水画舫线索 · 夜探星宿毒舟',
        badge: '洛阳暗访',
        subtitle: '洛阳酒肆 · 寻踪星宿妖女毒罗刹',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'luoyang_base_tavern',
        visibleWhen: atStep(SHAOLIN_Q10_QUEST_ID, 'luoyang_boat_probe'),
        effects: [
          { type: 'setFlag', flag: 'sl_q10_tavern_triggered', value: true },
          openScene('scene_slq10_03', SHAOLIN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq10_boat_battle',
        label: '【达摩院脉】夜探洛水画舫 · 以散花掌力战星宿妖女',
        badge: '散花破幻',
        subtitle: '洛水画舫实战 · 破星宿毒局救出名宿',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'luoyang_base_tavern',
        visibleWhen: atStep(SHAOLIN_Q10_QUEST_ID, 'luoshui_boat_battle'),
        effects: [openScene('scene_slq10_06', SHAOLIN_Q10_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_slq10_start_npc',
        label: '拜见玄难首座 · 闻洛阳牡丹会星宿毒案并习《散花掌》',
        badge: '洛水飞花',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [{ type: 'targetNpcMatch', npcIds: ['NPC-0127'] }, SHAOLIN_Q10_START_CONDITION],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q10_start_triggered', value: true },
          openScene('scene_slq10_01', SHAOLIN_Q10_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinDamoSanhuaPalmQuest.scenes').then((m) => m.SCENES),
  },
]
