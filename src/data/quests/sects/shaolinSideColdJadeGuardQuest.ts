import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE12_QUEST_ID = 'QST-SECT-01-SIDE-12'

export const SHAOLIN_SIDE12_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus(SHAOLIN_SIDE12_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0109', npcName: '玄澄' },
    { type: 'npcAlive', npcId: 'NPC-0322', npcName: '慧清' },
    { type: 'npcAlive', npcId: 'NPC-0255', npcName: '慧真' },
  ],
}

export const SHAOLIN_SIDE12_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE12_QUEST_ID,
    title: '寒玉护脉 · 伏虎除魔',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流下品 ～ 一流中品',
    maxOpponentRealm: '一流中品（邪派毒盗 · 玉面毒龙）',
    recommendedNote:
      '少林寺 Lv.3 高阶护法支线（全九幕）。跻身少林三阶高徒后，于达摩面壁石洞幽谷石室寒玉榻听慧清、慧真急报：昔日邪派毒盗「玉面毒龙」重修阴寒毒功潜回嵩山寻仇，在后山寒峡设毒瘴伏击并企图暗算闭关中的玄澄长老。于试炼涧反伏击可选逆风引山泉破瘴、轻功掠树梢抢解药或正面硬闯决战，战后亲裁押送戒律院或废其毒功，再返寒玉榻受玄澄点拨内息。',
    startHint:
      '跻身少林寺三阶高徒后，前往【嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻】寻玄澄、慧清即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_main',
      customLabel: '嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻',
    },
    startCondition: SHAOLIN_SIDE12_START_CONDITION,
    summary:
      '{reignYear}深冬，少室山幽谷寒雾沉沉，少林神僧【玄澄】正于【达摩面壁石洞 · 幽谷石室 · 寒玉榻】闭目调息。护经僧【慧清】与持杵武僧【慧真】忽带伤急报：十年前被玄澄废去邪功的毒盗「玉面毒龙」重修冰蚕毒砂至一流中品，今夜率余孽潜入后山寒峡设毒瘴伏击同门，妄图趁玄澄行功紧要关头以毒烟封洞报仇！你当机立断请命赴【飞瀑深潭 · 试炼涧】破瘴截敌，或引山泉冲散毒雾、或掠树梢抢夺解药、或以阳刚内劲硬破毒峡，力挫玉面毒龙并亲裁其去留，凯旋石室后受玄澄亲授寒玉护脉精义。',
    initialStepId: 'ambush_misty_gorge',
    steps: {
      ambush_misty_gorge: {
        id: 'ambush_misty_gorge',
        title: '寒雾截魔 · 飞瀑破毒龙',
        objective:
          '邪派毒盗「玉面毒龙」已率毒徒潜入后山寒峡设毒瘴伏击，企图暗算闭关中的玄澄长老！请速赴【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，配合慧真破瘴擒魔。',
        nextHint:
          '前往【达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，点击「协同慧真于寒雾深涧截杀玉面毒龙」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_west',
          customLabel: '嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
        },
      },
      return_cold_jade: {
        id: 'return_cold_jade',
        title: '魔氛尽涤 · 归榻复命',
        objective:
          '玉面毒龙已于寒雾深涧伏法，中毒武僧亦已得救！请速返【达摩面壁石洞 · 幽谷石室 · 寒玉榻（sl_damo_main）】向玄澄长老与慧清复命。',
        nextHint:
          '返回【达摩面壁石洞 · 幽谷石室 · 寒玉榻（sl_damo_main）】，点击「向玄澄长老禀报寒涧除魔始末」或与玄澄交谈。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_damo',
          spotId: 'sl_damo_main',
          customLabel: '嵩山少林寺 · 达摩面壁石洞 · 幽谷石室 · 寒玉榻',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls12_start_damo_main',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_side12_start_triggered',
        condition: SHAOLIN_SIDE12_START_CONDITION,
        effects: [openScene('scene_sls12_01', SHAOLIN_SIDE12_QUEST_ID)],
      },
      {
        id: 'trig_sls12_ambush_damo_west',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        onceFlag: 'sl_side12_ambush_triggered',
        condition: atStep(SHAOLIN_SIDE12_QUEST_ID, 'ambush_misty_gorge'),
        effects: [openScene('scene_sls12_04', SHAOLIN_SIDE12_QUEST_ID)],
      },
      {
        id: 'trig_sls12_return_damo_main',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        onceFlag: 'sl_side12_report_triggered',
        condition: atStep(SHAOLIN_SIDE12_QUEST_ID, 'return_cold_jade'),
        effects: [openScene('scene_sls12_08', SHAOLIN_SIDE12_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls12_start',
        label: '【少林支线】听慧清慧真急报毒贼寻仇',
        badge: '寒玉护脉',
        subtitle: '幽谷石室 · 寒玉榻',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: SHAOLIN_SIDE12_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side12_start_triggered', value: true },
          openScene('scene_sls12_01', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls12_ambush',
        label: '【少林支线】协同慧真于寒雾深涧截杀玉面毒龙',
        badge: '伏虎除魔',
        subtitle: '飞瀑深潭 · 试炼涧',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        visibleWhen: atStep(SHAOLIN_SIDE12_QUEST_ID, 'ambush_misty_gorge'),
        effects: [
          { type: 'setFlag', flag: 'sl_side12_ambush_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_side12_dragon_ready', op: 'truthy' },
            thenEffects: [openScene('scene_sls12_05', SHAOLIN_SIDE12_QUEST_ID)],
            elseEffects: [openScene('scene_sls12_04', SHAOLIN_SIDE12_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_sls12_return',
        label: '【少林支线】向玄澄长老禀报寒涧除魔始末',
        badge: '护脉复命',
        subtitle: '幽谷石室 · 寒玉榻',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_main',
        visibleWhen: atStep(SHAOLIN_SIDE12_QUEST_ID, 'return_cold_jade'),
        effects: [
          { type: 'setFlag', flag: 'sl_side12_report_triggered', value: true },
          openScene('scene_sls12_08', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls12_start_npc',
        label: '问询后山毒烟异动并请命护持玄澄长老',
        badge: '寒玉护脉',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0109', 'NPC-0322', 'NPC-0255'] },
            SHAOLIN_SIDE12_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side12_start_triggered', value: true },
          openScene('scene_sls12_01', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
      {
        id: 'act_sls12_report_npc',
        label: '向玄澄长老复命并聆听内息护脉指点',
        badge: '护脉复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0109', 'NPC-0322'] },
            atStep(SHAOLIN_SIDE12_QUEST_ID, 'return_cold_jade'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side12_report_triggered', value: true },
          openScene('scene_sls12_08', SHAOLIN_SIDE12_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideColdJadeGuardQuest.scenes').then((m) => m.SCENES),
  },
]
