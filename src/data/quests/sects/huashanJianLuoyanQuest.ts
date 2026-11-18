import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_Q07_QUEST_ID = 'QST-SECT-05-07'

export const HUASHAN_Q07_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus('QST-SECT-05-06', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'jian',
      label: '华山剑宗支脉弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-147', minLevel: 3 },
    qStatus(HUASHAN_Q07_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q07_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q07_QUEST_ID,
    title: '风陵夜渡 · 平沙落雁',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流中品',
    maxOpponentRealm: '二流中品（黄河九曲连环寨水匪头领）',
    recommendedNote:
      '十八幕华山剑宗进阶任务：需《养吾剑法》修至第 3 重以上。随封不弃赴黄河风陵渡夜观寒雁扑波获授《落雁剑法》，三更孤身驾扁舟于半柱香内连破九曲连环寨三道水哨，斩杀二流中品水寨头领而滴血不沾衣。',
    startHint:
      '完成《潼关血刃 · 以快驭正》且《养吾剑法》≥ 3 重后，前往【潼关天险瓮城 > 黄河大折惊涛烽火台】或寻【封不弃】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      customLabel: '潼关 / 西岳华山 · 黄河大折惊涛烽火台（或寻封不弃）',
    },
    startCondition: HUASHAN_Q07_START_CONDITION,
    summary:
      '{reignYear}深秋，盘踞黄河风陵渡的水匪“九曲连环寨”屡劫晋陕行商。你奉【封不弃】之召登临【黄河大折惊涛烽火台】，于寒夜怒涛间观秋雁斜掠激浪，获授《落雁剑法》。三更时分，封不弃抱剑立于古槐树下，严令你独乘一叶扁舟于半柱香内连破三道水哨。你在颠簸船舷间施展“回风扑雁”，连斩前哨先锋与两名二流中品水寨当家，衣袂不染半点血星，令封不弃抚掌畅笑。',
    initialStepId: 'fengling_geese',
    steps: {
      fengling_geese: {
        id: 'fengling_geese',
        title: '寒渡观雁 · 夜授新剑',
        objective:
          '九曲连环寨水匪横行风陵渡！请前往【潼关天险瓮城 > 黄河大折惊涛烽火台】临河夜观秋雁扑波，随封不弃修习《落雁剑法》！',
        nextHint: '前往【潼关天险瓮城 > 黄河大折惊涛烽火台】观雁习剑。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
        },
      },
      skiff_vanguard: {
        id: 'skiff_vanguard',
        title: '三更扁舟 · 半香破哨',
        objective:
          '已习得《落雁剑法》！三更已至，请自【潼关天险瓮城 > 黄河大折惊涛烽火台】渡口独乘扁舟顺流突袭，半柱香内破除九曲连环寨前两道水哨！',
        nextHint: '于【黄河大折惊涛烽火台】登扁舟突袭水匪前哨。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
        },
      },
      skiff_chieftain: {
        id: 'skiff_chieftain',
        title: '回风扑雁 · 剑不沾衣',
        objective:
          '前哨已破！继续在【黄河大折惊涛烽火台】芦苇主航道踏浪跃上连环主船，于摇晃船舷上以《落雁剑法》斩杀九曲水寨两名当家！',
        nextHint: '于【黄河大折惊涛烽火台】主船迎战九曲连环寨头领。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
        },
      },
      locust_report: {
        id: 'locust_report',
        title: '古槐残香 · 渡口复命',
        objective:
          '九曲连环寨覆灭，晋陕商船获救！请登岸前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】老槐树下向【封不弃】复命！',
        nextHint: '前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】（或寻封不弃）复命领赏。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq07_beacon_start',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        onceFlag: 'hsq07_intro_triggered',
        condition: HUASHAN_Q07_START_CONDITION,
        effects: [openScene('scene_hsq07_01', HUASHAN_Q07_QUEST_ID)],
      },
      {
        id: 'trig_hsq07_locust_report',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        onceFlag: 'hsq07_report_triggered',
        condition: atStep(HUASHAN_Q07_QUEST_ID, 'locust_report'),
        effects: [openScene('scene_hsq07_16', HUASHAN_Q07_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq07_start_beacon',
        label: '会晤封不弃 · 夜瞰风陵渡水寨（开启《风陵夜渡 · 平沙落雁》）',
        badge: '风陵夜渡',
        subtitle: '第一幕 · 黄河大折惊涛烽火台',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: HUASHAN_Q07_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq07_intro_triggered', value: true },
          openScene('scene_hsq07_01', HUASHAN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq07_geese_learn',
        label: '临河夜观秋雁扑波 · 领受封不弃亲传《落雁剑法》',
        badge: '寒渡观雁',
        subtitle: '第三幕 · 黄河大折惊涛烽火台',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_Q07_QUEST_ID, 'fengling_geese'),
        effects: [openScene('scene_hsq07_03', HUASHAN_Q07_QUEST_ID)],
      },
      {
        id: 'spot_hsq07_skiff_vanguard',
        label: '三更独登扁舟 · 半柱香突袭九曲水匪前哨',
        badge: '孤舟破哨',
        subtitle: '第六幕 · 风陵渡口芦苇暗水道',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_Q07_QUEST_ID, 'skiff_vanguard'),
        effects: [openScene('scene_hsq07_06', HUASHAN_Q07_QUEST_ID)],
      },
      {
        id: 'spot_hsq07_skiff_chieftain',
        label: '跃登连环蒙冲主船 · 回风扑雁决战水寨双魁',
        badge: '船舷斗剑',
        subtitle: '第十幕 · 九曲连环寨主船',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_Q07_QUEST_ID, 'skiff_chieftain'),
        effects: [openScene('scene_hsq07_10', HUASHAN_Q07_QUEST_ID)],
      },
      {
        id: 'spot_hsq07_locust_report',
        label: '携商船谢礼登岸 · 赴老槐树下向封不弃复命',
        badge: '槐下抚掌',
        subtitle: '第十六幕 · 潼关镇河主城楼与瓮城',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_Q07_QUEST_ID, 'locust_report'),
        effects: [
          { type: 'setFlag', flag: 'hsq07_report_triggered', value: true },
          openScene('scene_hsq07_16', HUASHAN_Q07_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq07_feng_start',
        label: '请缨随赴黄河风陵渡 · 修习《落雁剑法》（开启《风陵夜渡》）',
        badge: '平沙落雁',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            HUASHAN_Q07_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq07_intro_triggered', value: true },
          openScene('scene_hsq07_01', HUASHAN_Q07_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq07_feng_report',
        label: '呈验九曲连环寨战果 · 请封师叔考校衣袂血迹',
        badge: '槐下复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            atStep(HUASHAN_Q07_QUEST_ID, 'locust_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq07_report_triggered', value: true },
          openScene('scene_hsq07_16', HUASHAN_Q07_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanJianLuoyanQuest.scenes').then((m) => m.SCENES),
  },
]
