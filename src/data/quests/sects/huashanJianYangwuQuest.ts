import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_Q06_QUEST_ID = 'QST-SECT-05-06'

export const HUASHAN_Q06_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus('QST-SECT-05-02', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'jian',
      label: '华山剑宗支脉弟子（博台大比择定剑宗）',
    },
    qStatus(HUASHAN_Q06_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q06_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q06_QUEST_ID,
    title: '潼关血刃 · 以快驭正',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流下品（潼关乱葬岗关外悍匪双头目）',
    recommendedNote:
      '十五幕华山剑宗首篇任务：初入剑宗门墙，封不弃掷来气宗《养吾剑法》与地阶中品内功《混元功》口诀命你知己知彼，随即押赴潼关乱葬岗实战拆招，连斩两名二流下品关外悍匪头目，参透“宁在一思进、莫在一思停”之快剑真谛。',
    startHint:
      '华山第 2 阶剑宗支脉弟子完成博台大比（QST-SECT-05-02）后，前往【华山绝顶论剑台 > 朝阳孤松观海亭】、【思过崖古山洞 > 绝壁银瀑涤心寒潭】或寻【封不弃】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_pine',
      customLabel: '潼关 / 西岳华山 · 朝阳孤松观海亭（或寻封不弃）',
    },
    startCondition: HUASHAN_Q06_START_CONDITION,
    summary:
      '{reignYear}你择定华山剑宗支脉之初，宿老【封不弃】于西峰剑庐旧址冷言掷来气宗《养吾剑法》，喝令先熟记四平八稳之正门旧架，再赴生死场拆成贴身杀招。当夜你随封不弃奔袭【潼关天险瓮城】外乱葬岗，面对凶悍嗜血的关外流窜刀匪，在刀锋及颈之际化守为刺，连斩两名二流下品悍匪头目，终悟“宁在一思进、莫在一思停”之剑宗精义。',
    initialStepId: 'jianlu_drill',
    steps: {
      jianlu_drill: {
        id: 'jianlu_drill',
        title: '西峰立诫 · 拆解养吾',
        objective:
          '已获授《养吾剑法》。请前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】西峰剑庐旧址旁，依封不弃之命拆解气宗守势旧架！',
        nextHint: '前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】演剑拆招。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_siguoya',
          spotId: 'tg_sg_falls',
        },
      },
      tongguan_scout: {
        id: 'tongguan_scout',
        title: '夜奔潼关 · 乱岗索匪',
        objective:
          '潼关外乱葬岗有流窜刀匪劫杀商旅！请随封不弃前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】，出城夜探乱葬岗匪踪！',
        nextHint: '前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】探查乱葬岗刀匪。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
        },
      },
      tongguan_slay: {
        id: 'tongguan_slay',
        title: '以快驭正 · 血刃双匪',
        objective:
          '已锁定关外刀匪巢穴！于【潼关天险瓮城 > 潼关镇河主城楼与瓮城】外乱葬岗拔剑迎敌，将《养吾剑法》守势化作夺命疾刺，连斩两名刀匪头目！',
        nextHint: '于【潼关镇河主城楼与瓮城】迎战乱葬岗刀匪头目。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
        },
      },
      pine_report: {
        id: 'pine_report',
        title: '孤松涤剑 · 领悟进机',
        objective:
          '乱葬岗悍匪伏诛！请返回【华山绝顶论剑台 > 朝阳孤松观海亭】向【封不弃】复命，印证快剑拆招所得！',
        nextHint: '前往【华山绝顶论剑台 > 朝阳孤松观海亭】（或寻封不弃）复命领赏。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_pine',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq06_pine_start',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        onceFlag: 'hsq06_intro_triggered',
        condition: HUASHAN_Q06_START_CONDITION,
        effects: [openScene('scene_hsq06_01', HUASHAN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_hsq06_jianlu_drill',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        onceFlag: 'hsq06_drill_triggered',
        condition: atStep(HUASHAN_Q06_QUEST_ID, 'jianlu_drill'),
        effects: [openScene('scene_hsq06_03', HUASHAN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_hsq06_tongguan_scout',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        onceFlag: 'hsq06_scout_triggered',
        condition: atStep(HUASHAN_Q06_QUEST_ID, 'tongguan_scout'),
        effects: [openScene('scene_hsq06_06', HUASHAN_Q06_QUEST_ID)],
      },
      {
        id: 'trig_hsq06_pine_report',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        onceFlag: 'hsq06_report_triggered',
        condition: atStep(HUASHAN_Q06_QUEST_ID, 'pine_report'),
        effects: [openScene('scene_hsq06_14', HUASHAN_Q06_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq06_start_pine',
        label: '叩见封不弃 · 领受剑宗初训（开启《潼关血刃 · 以快驭正》）',
        badge: '剑宗初训',
        subtitle: '第一幕 · 朝阳孤松观海亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        visibleWhen: HUASHAN_Q06_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq06_intro_triggered', value: true },
          openScene('scene_hsq06_01', HUASHAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq06_start_falls',
        label: '步入西峰剑庐旧址 · 聆听封不弃掷剑立诫',
        badge: '剑宗初训',
        subtitle: '第一幕 · 绝壁银瀑涤心寒潭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        visibleWhen: HUASHAN_Q06_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq06_intro_triggered', value: true },
          openScene('scene_hsq06_01', HUASHAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq06_jianlu_drill',
        label: '寒潭试剑 · 拆解《养吾剑法》正门守架',
        badge: '拆招削繁',
        subtitle: '第三幕 · 绝壁银瀑涤心寒潭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        visibleWhen: atStep(HUASHAN_Q06_QUEST_ID, 'jianlu_drill'),
        effects: [
          { type: 'setFlag', flag: 'hsq06_drill_triggered', value: true },
          openScene('scene_hsq06_03', HUASHAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq06_tongguan_scout',
        label: '夜出潼关瓮城 · 潜入乱葬岗逼视刀匪',
        badge: '乱岗索匪',
        subtitle: '第六幕 · 潼关镇河主城楼与瓮城',
        tone: 'primary',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_Q06_QUEST_ID, 'tongguan_scout'),
        effects: [
          { type: 'setFlag', flag: 'hsq06_scout_triggered', value: true },
          openScene('scene_hsq06_06', HUASHAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq06_tongguan_slay',
        label: '拔剑破守为刺 · 决战乱葬岗关外悍匪头目',
        badge: '生死拆招',
        subtitle: '第八幕 · 潼关城外乱葬岗',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_Q06_QUEST_ID, 'tongguan_slay'),
        effects: [openScene('scene_hsq06_08', HUASHAN_Q06_QUEST_ID)],
      },
      {
        id: 'spot_hsq06_pine_report',
        label: '孤松复命 · 向封不弃印证“宁在一思进”剑理',
        badge: '孤松复命',
        subtitle: '第十四幕 · 朝阳孤松观海亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        visibleWhen: atStep(HUASHAN_Q06_QUEST_ID, 'pine_report'),
        effects: [
          { type: 'setFlag', flag: 'hsq06_report_triggered', value: true },
          openScene('scene_hsq06_14', HUASHAN_Q06_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq06_feng_start',
        label: '拜聆剑宗门规 · 请封师叔传剑（开启《潼关血刃 · 以快驭正》）',
        badge: '剑宗传剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            HUASHAN_Q06_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq06_intro_triggered', value: true },
          openScene('scene_hsq06_01', HUASHAN_Q06_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq06_feng_report',
        label: '呈禀乱葬岗斩匪始末 · 印证以快驭正剑心',
        badge: '孤松复命',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
            atStep(HUASHAN_Q06_QUEST_ID, 'pine_report'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq06_report_triggered', value: true },
          openScene('scene_hsq06_14', HUASHAN_Q06_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanJianYangwuQuest.scenes').then((m) => m.SCENES),
  },
]
