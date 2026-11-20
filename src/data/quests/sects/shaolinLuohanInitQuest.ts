import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'
import {
  buildStarterKitBackfillAction,
  SHAOLIN_STARTER_KIT_EFFECTS,
  SHAOLIN_STARTER_KIT_FLAG,
} from './sectStarterKits'

export const SHAOLIN_Q01_QUEST_ID = 'QST-SECT-01-01'

export const SHAOLIN_Q01_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 1 },
    qStatus('QST-SECT-01-ENTRY', 'completed'),
    qStatus(SHAOLIN_Q01_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0483', npcName: '虚松' },
    { type: 'npcAlive', npcId: 'NPC-0627', npcName: '虚音' },
    { type: 'npcAlive', npcId: 'NPC-0673', npcName: '周海' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q01_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q01_QUEST_ID,
    title: '晨钟木鱼 · 罗汉开蒙',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '不入流 ～ 三流下品',
    maxOpponentRealm: '三流下品（富家外门 · 周海）',
    recommendedNote:
      '嵩山少林寺 Lv.1 外门弟子开蒙任务链（全十二幕）。杂役满期初入外门寮房，五更闻钟随虚松、虚音师兄于钟鼓禅院演武坪习练《少林小乘禅功》与《罗汉拳》，并挺身制止富家外门周海伙同挂单恶僧强占寮房冬衣，终获巡堂戒律长老玄痛嘉许。',
    startHint:
      '完成少林入门后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院】（或寻虚松、虚音师兄）即可开启罗汉开蒙晨课。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
    },
    startCondition: SHAOLIN_Q01_START_CONDITION,
    summary:
      '{reignYear}杂役满期，你初入少林外门寮房。五更晨钟未响，【虚松】与【虚音】二位师兄便以井水泼醒新晋弟子，于【大雄宝殿方丈院 · 钟鼓禅院】演武坪传授少林筑基心法《少林小乘禅功》与入门拳架《罗汉拳》。同批富商之子【周海】仗着家中丰厚香油钱，勾结两名挂单恶僧在寮房强抢寒门同门冬衣、霸占暖炕。你怒而挺身，于演武青石上连战两场，先以罗汉拳架击退两名挂单恶僧，再正面力挫周海。巡堂至此的戒律长老【玄痛】亲睹全程，沉声赞许「佛门亦有金刚怒目」，正式准你领受《少林小乘禅功》与《罗汉拳》法本。',
    initialStepId: 'morning_drill',
    steps: {
      morning_drill: {
        id: 'morning_drill',
        title: '五更闻钟 · 演武开蒙',
        objective:
          '已在钟鼓禅院演武坪随虚松、虚音二位师兄初习《少林小乘禅功》与《罗汉拳》起手式。午后寮房忽传喧闹，速留守【大雄宝殿方丈院 · 钟鼓禅院】查明同门争执原委。',
        nextHint:
          '在【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院（sl_daxiong_west）】点击「查看外门寮房风波 · 挺身护同门」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
        },
      },
      confront_zhouhai: {
        id: 'confront_zhouhai',
        title: '金刚怒目 · 演武惩霸',
        objective:
          '富家外门周海仗香油钱伙同两名挂单恶僧欺凌寒门同门！请于【大雄宝殿方丈院 · 钟鼓禅院】演武坪青石上连战恶僧与周海，护住外门清规！',
        nextHint:
          '在【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院（sl_daxiong_west）】点击「登演武坪青石 · 迎战周海与挂单恶僧」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq01_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q01_start_triggered',
        condition: SHAOLIN_Q01_START_CONDITION,
        effects: [openScene('scene_slq01_01', SHAOLIN_Q01_QUEST_ID)],
      },
      {
        id: 'trig_slq01_dorm_brawl',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q01_dorm_triggered',
        condition: atStep(SHAOLIN_Q01_QUEST_ID, 'morning_drill'),
        effects: [openScene('scene_slq01_05', SHAOLIN_Q01_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq01_start_west',
        label: '【少林师门】五更闻钟 · 随虚松虚音罗汉开蒙',
        badge: '罗汉开蒙',
        subtitle: '外门初课 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_Q01_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q01_start_triggered', value: true },
          openScene('scene_slq01_01', SHAOLIN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq01_dorm_brawl',
        label: '【少林师门】查看外门寮房风波 · 挺身护同门',
        badge: '寮房风波',
        subtitle: '第五幕 · 富家外门周海仗势强抢冬衣',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q01_QUEST_ID, 'morning_drill'),
        effects: [
          { type: 'setFlag', flag: 'sl_q01_dorm_triggered', value: true },
          openScene('scene_slq01_05', SHAOLIN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq01_duel_zhouhai',
        label: '【少林师门】登演武坪青石 · 迎战周海与挂单恶僧',
        badge: '金刚怒目',
        subtitle: '演武实战 · 连战挂单恶僧与周海',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q01_QUEST_ID, 'confront_zhouhai'),
        effects: [openScene('scene_slq01_07', SHAOLIN_Q01_QUEST_ID)],
      },
    ],

    npcActions: [
      buildStarterKitBackfillAction({
        id: 'act_slq01_starter_kit_backfill',
        sectId: 'SECT-01',
        questId: SHAOLIN_Q01_QUEST_ID,
        flag: SHAOLIN_STARTER_KIT_FLAG,
        npcIds: ['NPC-0483', 'NPC-0627'],
        label: '领取外门行脚披挂 · 学《穿云纵》身法',
        effects: SHAOLIN_STARTER_KIT_EFFECTS,
      }),
      {
        id: 'act_slq01_start_npc',
        label: '拜见师兄 · 领受五更晨课与罗汉拳开蒙',
        badge: '罗汉开蒙',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0483', 'NPC-0627'] },
            SHAOLIN_Q01_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q01_start_triggered', value: true },
          openScene('scene_slq01_01', SHAOLIN_Q01_QUEST_ID),
        ],
      },
      {
        id: 'act_slq01_dorm_npc',
        label: '禀告寮房争执 · 随师兄赴演武坪公断',
        badge: '寮房风波',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0483', 'NPC-0627'] },
            atStep(SHAOLIN_Q01_QUEST_ID, 'morning_drill'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q01_dorm_triggered', value: true },
          openScene('scene_slq01_05', SHAOLIN_Q01_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanInitQuest.scenes').then((m) => m.SCENES),
  },
]
