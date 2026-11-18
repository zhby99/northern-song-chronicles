import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q21_QUEST_ID = 'QST-SECT-05-21'

export const HUASHAN_Q21_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 4 },
    qStatus('QST-SECT-05-18', 'completed'),
    qStatus('QST-SECT-05-14', 'completed'),
    { type: 'flag', flag: 'hs_branch', op: 'eq', value: 'jian', label: '华山剑宗支脉传人' },
    { type: 'flag', flag: 'hs_cave', op: 'eq', value: 'harmony', label: '曾于思过崖削壁止戈（剑气同源）' },
    { type: 'learnedArtAtLeast', artId: 'MA-007', minLevel: 5 },
    qStatus(HUASHAN_Q21_QUEST_ID, 'not_started'),
    qStatus('QST-SECT-05-20', 'not_completed'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
  ],
}

export const HUASHAN_Q21_QUEST: QuestDefinition = {
  id: HUASHAN_Q21_QUEST_ID,
  title: '两仪归元 · 西岳共主',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '宗师下品 ～ 宗师中品（华山剑宗剑气合流 Lv.5 王道终局）',
  maxOpponentRealm: '宗师中品（西夏一品堂督战铁卫 · 西夏关中主帅拓跋雄）',
  recommendedNote:
    '三十二幕华山剑气合流王道终局长卷：虽将《独孤九剑》修至大成，却力拒同室操戈，与气宗首徒高沧云并肩统率剑气两脉弟子同出潼关奇袭西夏大营，以独孤九剑合紫霞剑阵一举荡平风陵敌营、斩杀主帅拓跋雄！凯旋后当殿拒封不弃逼宫之议，献上敌酋战旗痛陈“剑无气不长久，气无剑不锋芒”，令掌门岳沧溟老怀大慰欣然禅位亲传《太岳紫霞长剑》、高沧云奉上《华山紫霞剑客衫》，消弭三十载纷争登位 Lv.5 华山剑气共主！',
  startHint:
    '剑宗削壁止戈线完结《独孤求败》且将《独孤九剑》修至第五重后，前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪】（或寻封不弃、高沧云、岳沧溟）开启剑气联师靖边之章。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_zixia',
    spotId: 'tg_zx_terrace',
    customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
  },
  startCondition: HUASHAN_Q21_START_CONDITION,
  summary:
    '{reignYear}寒冬将近，你已将天阶《独孤九剑》修至化境，面对恩师【封不弃】夺回掌门之劝，你恪守昔日思过崖削壁止戈初心，断然拒绝同门相残。恰逢西夏关中主帅【拓跋雄】屯重兵于风陵荒原欲犯潼关，你主动携手气宗首徒【高沧云】，统率剑气两脉弟子并肩出【潼关天险瓮城】，以《独孤九剑》配合紫霞剑阵一举荡平风陵敌营、阵斩宗师中品主帅拓跋雄！凯旋【紫霞正气主殿】之际，你再次回绝封不弃乘势逼宫之议，向历代祖师牌位献上缴获西夏帅旗，痛陈“剑无气不长久，气无剑不锋芒”至理。掌门【岳沧溟】老怀大慰，当众举行盛大禅位大典亲传《太岳紫霞长剑》，高沧云亦双手奉上《华山紫霞剑客衫》宣誓效忠，三十载剑气裂痕彻底弥合，你正式继任华山剑气共主！',
  initialStepId: 'rally_tongguan',
  steps: {
    rally_tongguan: {
      id: 'rally_tongguan',
      title: '剑气联师 · 同出潼关',
      objective:
        '剑气两脉合兵讨夏之议已定！请与气宗大师兄高沧云统率两脉精锐弟子赶赴【潼关天险瓮城 · 潼关镇河主城楼与瓮城】会师出关！',
      nextHint: '前往【潼关天险瓮城 · 潼关镇河主城楼与瓮城（tg_ft_barbican）】点击「剑气并肩 · 联师出潼关」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城 · 潼关镇河主城楼与瓮城',
      },
    },
    crush_tuoba: {
      id: 'crush_tuoba',
      title: '九剑合霞 · 荡平风陵',
      objective:
        '两脉义师已潜抵风陵荒原前哨！请前往【潼关天险瓮城 · 黄河大折惊涛烽火台】布开紫霞剑阵，以《独孤九剑》直捣西夏中军，斩杀主帅拓跋雄！',
      nextHint: '前往【潼关天险瓮城 · 黄河大折惊涛烽火台（tg_ft_beacon）】点击「九剑靖边 · 合紫霞剑阵斩拓跋雄」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城 · 黄河大折惊涛烽火台（风陵前哨）',
      },
    },
    harmony_abdicate: {
      id: 'harmony_abdicate',
      title: '献旗止争 · 欣然禅位',
      objective:
        '风陵敌营荡平，西夏帅旗在手！请与高沧云统率两脉弟子凯旋返回【玉女峰紫霞道观 · 紫霞正气主殿】，于祖师牌位前献旗止争，开创剑气并尊盛世！',
      nextHint: '返回【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】点击「献旗祖师堂 · 受禅登位剑气共主」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_hsq21_start_terrace',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      onceFlag: 'hsq21_intro_triggered',
      condition: HUASHAN_Q21_START_CONDITION,
      effects: [openScene('scene_hsq21_01', HUASHAN_Q21_QUEST_ID)],
    },
    {
      id: 'trig_hsq21_barbican',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      onceFlag: 'hsq21_barbican_triggered',
      condition: atStep(HUASHAN_Q21_QUEST_ID, 'rally_tongguan'),
      effects: [openScene('scene_hsq21_07', HUASHAN_Q21_QUEST_ID)],
    },
    {
      id: 'trig_hsq21_beacon',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      onceFlag: 'hsq21_beacon_triggered',
      condition: atStep(HUASHAN_Q21_QUEST_ID, 'crush_tuoba'),
      effects: [openScene('scene_hsq21_12', HUASHAN_Q21_QUEST_ID)],
    },
    {
      id: 'trig_hsq21_hall_abdicate',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq21_abdicate_triggered',
      condition: atStep(HUASHAN_Q21_QUEST_ID, 'harmony_abdicate'),
      effects: [openScene('scene_hsq21_22', HUASHAN_Q21_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_hsq21_start',
      label: '力拒同室操戈 · 倡议剑气两脉联师讨夏（剑气共主终局）',
      badge: '两仪归元',
      subtitle: '需《独孤九剑》≥ 第五重且曾削壁止戈',
      tone: 'jade',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      visibleWhen: HUASHAN_Q21_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'hsq21_intro_triggered', value: true },
        openScene('scene_hsq21_01', HUASHAN_Q21_QUEST_ID),
      ],
    },
    {
      id: 'spot_hsq21_barbican',
      label: '剑气并肩 · 与高沧云统率两脉弟子同出潼关',
      badge: '两脉会师',
      subtitle: '潼关天险瓮城 · 潼关镇河主城楼与瓮城',
      tone: 'primary',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      visibleWhen: atStep(HUASHAN_Q21_QUEST_ID, 'rally_tongguan'),
      effects: [openScene('scene_hsq21_07', HUASHAN_Q21_QUEST_ID)],
    },
    {
      id: 'spot_hsq21_beacon',
      label: '九剑靖边 · 合紫霞剑阵荡平风陵斩拓跋雄',
      badge: '九剑靖边',
      subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      visibleWhen: atStep(HUASHAN_Q21_QUEST_ID, 'crush_tuoba'),
      effects: [openScene('scene_hsq21_12', HUASHAN_Q21_QUEST_ID)],
    },
    {
      id: 'spot_hsq21_hall_abdicate',
      label: '献旗祖师堂 · 岳沧溟欣然禅位登剑气共主',
      badge: '欣然禅位',
      subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q21_QUEST_ID, 'harmony_abdicate'),
      effects: [openScene('scene_hsq21_22', HUASHAN_Q21_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_hsq21_npc_start',
      label: '婉拒门户私争 · 请合剑气两脉之力共破风陵夏营（剑气共主终局）',
      badge: '两仪归元',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167', 'NPC-0202', 'NPC-0118'] },
          HUASHAN_Q21_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'hsq21_intro_triggered', value: true },
        openScene('scene_hsq21_01', HUASHAN_Q21_QUEST_ID),
      ],
    },
    {
      id: 'act_hsq21_npc_abdicate',
      label: '当殿献上西夏帅旗 · 痛陈剑气互济至理',
      badge: '献旗止争',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0167', 'NPC-0202'] },
          atStep(HUASHAN_Q21_QUEST_ID, 'harmony_abdicate'),
        ],
      },
      effects: [openScene('scene_hsq21_22', HUASHAN_Q21_QUEST_ID)],
    },
  ],

  loadScenes: () => import('./huashanEndingSwordHarmonyQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q21_QUESTS: QuestDefinition[] = [HUASHAN_Q21_QUEST]
