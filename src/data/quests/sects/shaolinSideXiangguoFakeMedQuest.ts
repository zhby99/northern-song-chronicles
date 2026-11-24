import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE06_QUEST_ID = 'QST-SECT-01-SIDE-06'

export const SHAOLIN_SIDE06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus(SHAOLIN_SIDE06_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-0984', npcName: '净安' },
    { type: 'npcAlive', npcId: 'NPC-0418', npcName: '慧音' },
  ],
}

export const SHAOLIN_SIDE06_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE06_QUEST_ID,
    title: '万姓雅市 · 假药风波',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'bianliang',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流中品（江淮毒贩双煞 · 砒霜手胡三）',
    recommendedNote:
      '嵩山少林寺 Lv.2 内门支线（全十幕）。经义达五十后，于开封府大相国寺万姓交易雅市接净安、慧音急报：江淮毒贩假冒少林小还丹骗财害命。现场三丸无提示辨伪揭穿骗局，再于城外废窑黑坊以联合开封厢兵封门、买通市井脚夫走暗窗或正门强冲三策生擒砒霜手胡三，并自决善后救民抑封存证物。',
    startHint:
      '晋升少林内门经义不低于五十后，前往【开封府 · 大相国寺（八角宝塔） · 相国寺万姓交易雅市】寻净安或慧音即可触发。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_market',
      customLabel: '开封府 · 大相国寺（八角宝塔） · 相国寺万姓交易雅市',
    },
    startCondition: SHAOLIN_SIDE06_START_CONDITION,
    summary:
      '{reignYear}开封府大相国寺万姓交易雅市人声鼎沸，驻寺僧人【净安】与【慧音】却忧心忡忡——近半月来，雅市西角有江淮毒贩冒用“嵩山少林小还丹”之名高价兜售假药，数名京城百姓服后腹痛吐血、险些丧命。你当场勘验三味药丸识破朱砂掺石灰、遇醋发青的致命毒假丸，易装顺藤摸瓜追至城外废窑黑坊，凭联合开封厢兵封门、买通脚夫潜入后窗或正门强冲破窟，生擒【砒霜手胡三】并焚毁假药，护住少林百年药王清誉。',
    initialStepId: 'raid_black_workshop',
    steps: {
      raid_black_workshop: {
        id: 'raid_black_workshop',
        title: '乔装暗访 · 捣毁黑坊',
        objective:
          '已识破假冒少林丹丸掺毒真相！请在【开封府 · 大相国寺（八角宝塔） · 相国寺万姓交易雅市（bl_xg_market）】换装接头，顺藤摸瓜直捣城外假药黑坊。',
        nextHint:
          '在【相国寺万姓交易雅市（bl_xg_market）】点击「乔装购药，循迹直捣城外假药黑坊」或与慧音交谈。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_market',
          customLabel: '开封府 · 大相国寺（八角宝塔） · 相国寺万姓交易雅市',
        },
      },
      return_report: {
        id: 'return_report',
        title: '焚药归寺 · 昭雪清誉',
        objective:
          '江淮毒贩已伏法、城外假药黑坊尽数捣毁！请返回【大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）（bl_xg_hall）】向慧音与净安复命并安抚香客。',
        nextHint:
          '前往【大雄宝殿（香云宝鼎）（bl_xg_hall）】点击「向慧音、净安复命并布告清誉」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_hall',
          customLabel: '开封府 · 大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls06_start',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        onceFlag: 'sl_side06_start_triggered',
        condition: SHAOLIN_SIDE06_START_CONDITION,
        effects: [openScene('scene_sls06_01', SHAOLIN_SIDE06_QUEST_ID)],
      },
      {
        id: 'trig_sls06_raid',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        onceFlag: 'sl_side06_raid_triggered',
        condition: atStep(SHAOLIN_SIDE06_QUEST_ID, 'raid_black_workshop'),
        effects: [openScene('scene_sls06_04', SHAOLIN_SIDE06_QUEST_ID)],
      },
      {
        id: 'trig_sls06_report',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        onceFlag: 'sl_side06_report_triggered',
        condition: atStep(SHAOLIN_SIDE06_QUEST_ID, 'return_report'),
        effects: [openScene('scene_sls06_09', SHAOLIN_SIDE06_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls06_start',
        label: '【少林支线】问询雅市假冒少林药丸风波',
        badge: '假药风波',
        subtitle: '万姓交易雅市 · 净安与慧音',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: SHAOLIN_SIDE06_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side06_start_triggered', value: true },
          openScene('scene_sls06_01', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls06_raid',
        label: '【少林支线】乔装购药，循迹直捣城外假药黑坊',
        badge: '捣毁黑坊',
        subtitle: '万姓交易雅市 · 暗访江淮毒贩',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: atStep(SHAOLIN_SIDE06_QUEST_ID, 'raid_black_workshop'),
        effects: [
          { type: 'setFlag', flag: 'sl_side06_raid_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side06_boss_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls06_05', SHAOLIN_SIDE06_QUEST_ID)],
            elseEffects: [openScene('scene_sls06_04', SHAOLIN_SIDE06_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls06_report',
        label: '【少林支线】向慧音、净安复命并布告少林药王清誉',
        badge: '焚药昭雪',
        subtitle: '大雄宝殿（香云宝鼎）',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        visibleWhen: atStep(SHAOLIN_SIDE06_QUEST_ID, 'return_report'),
        effects: [
          { type: 'setFlag', flag: 'sl_side06_report_triggered', value: true },
          openScene('scene_sls06_09', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls06_start_npc',
        label: '问询万姓雅市假冒“少林小还丹”风波',
        badge: '假药风波',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0984', 'NPC-0418'] },
            SHAOLIN_SIDE06_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side06_start_triggered', value: true },
          openScene('scene_sls06_01', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
      {
        id: 'act_sls06_raid_npc',
        label: '乔装暗访假药贩子，顺藤摸瓜捣毁黑坊',
        badge: '捣毁黑坊',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0984', 'NPC-0418'] },
            atStep(SHAOLIN_SIDE06_QUEST_ID, 'raid_black_workshop'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side06_raid_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side06_boss_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls06_05', SHAOLIN_SIDE06_QUEST_ID)],
            elseEffects: [openScene('scene_sls06_04', SHAOLIN_SIDE06_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideXiangguoFakeMedQuest.scenes').then((m) => m.SCENES),
  },
]
