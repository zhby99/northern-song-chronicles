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
      '嵩山少林寺 Lv.2 内门支线（全十二幕）。经义达五十后，于开封府大相国寺万姓交易雅市接净安、慧音急报：有歹徒冒充“少林药王院大力丸”兜售掺入微量砒霜的毒假药。乔装暗访摸清黑坊巢穴，车轮连战 击败江淮毒贩双煞并焚毁假药还少林清誉。',
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
      '{reignYear}开封府大相国寺万姓交易雅市人声鼎沸，驻寺僧人【净安】与【慧音】却忧心忡忡——近半月来，雅市西角有游方药贩冒用“少林药王院秘制大力丸”之名高价兜售丹药，数名京城百姓服后腹痛吐血、险些丧命。你以深厚佛门经义与药理识破假丸中暗掺微毒砒霜以图立竿见影的歹毒伎俩，乔装香客假意大宗购药，一路暗哨追踪至开封城外荒废砖窑黑坊。面对江淮毒贩双煞【砒霜手胡三】与【断肠客钱五】的毒砂夹击，你车轮连战力挫群凶，当众焚毁满缸假药并移交官府法办，护住少林百年药王清誉。',
    initialStepId: 'raid_black_workshop',
    steps: {
      raid_black_workshop: {
        id: 'raid_black_workshop',
        title: '乔装暗访 · 捣毁黑坊',
        objective:
          '已识破假冒少林大力丸掺毒真相！请在【开封府 · 大相国寺（八角宝塔） · 相国寺万姓交易雅市（bl_xg_market）】换装接头，顺藤摸瓜直捣城外假药黑坊。',
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
          '江淮毒贩双煞已伏法、城外假药黑坊尽数焚毁！请返回【大相国寺（八角宝塔） · 大雄宝殿（香云宝鼎）（bl_xg_hall）】向慧音与净安复命并安抚香客。',
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
        effects: [openScene('scene_sls06_11', SHAOLIN_SIDE06_QUEST_ID)],
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
            thenEffects: [openScene('scene_sls06_08', SHAOLIN_SIDE06_QUEST_ID)],
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
          openScene('scene_sls06_11', SHAOLIN_SIDE06_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls06_start_npc',
        label: '问询万姓雅市假冒“少林大力丸”风波',
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
            thenEffects: [openScene('scene_sls06_08', SHAOLIN_SIDE06_QUEST_ID)],
            elseEffects: [openScene('scene_sls06_04', SHAOLIN_SIDE06_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideXiangguoFakeMedQuest.scenes').then((m) => m.SCENES),
  },
]
