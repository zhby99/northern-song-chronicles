import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q22_QUEST_ID = 'QST-SECT-05-22'

export const HUASHAN_Q22_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 5 },
    {
      type: 'any',
      hint: '必修前置：继任华山派 Lv.5 掌门（完结《紫霞浩荡》《剑压紫霞》或《两仪归元》任一终局）',
      conditions: [
        qStatus('QST-SECT-05-19', 'completed'),
        qStatus('QST-SECT-05-20', 'completed'),
        qStatus('QST-SECT-05-21', 'completed'),
      ],
    },
    qStatus(HUASHAN_Q22_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
    { type: 'npcAlive', npcId: 'NPC-0120', npcName: '慕容复' },
    { type: 'npcAlive', npcId: 'NPC-0104', npcName: '慕容博' },
    { type: 'npcAlive', npcId: 'NPC-1053', npcName: '段延庆' },
  ],
}

const SYNC_Q22_LINEAGE_FLAGS: QuestEffect[] = [
  {
    type: 'branch',
    condition: flag('hs_branch', 'eq', 'qi'),
    thenEffects: [{ type: 'setFlag', flag: 'hs_q22_is_qi', value: true }],
    elseEffects: [{ type: 'setFlag', flag: 'hs_q22_is_qi', value: false }],
  },
  {
    type: 'branch',
    condition: flag('hs_ending', 'eq', 'sword_usurp'),
    thenEffects: [{ type: 'setFlag', flag: 'hs_q22_is_usurp', value: true }],
    elseEffects: [{ type: 'setFlag', flag: 'hs_q22_is_usurp', value: false }],
  },
]

export const HUASHAN_Q22_QUEST: QuestDefinition = {
  id: HUASHAN_Q22_QUEST_ID,
  title: '西岳绝顶 · 华山论剑',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '宗师中品 ～ 绝顶大宗师（华山派全路线大圆满终章）',
  maxOpponentRealm: '宗师上品（南慕容慕容复 · 大轮明王鸠摩智 · 灰衣老僧慕容博 · 北乔峰）',
  recommendedNote:
    '四十五幕华山剑派巅峰大结局长卷：腊月大雪封山，于落雁峰白玉论剑坛重开甲子“华山绝顶论剑”！惊退窥伺崖松的段延庆，连历四场震古烁今的绝顶交锋——首战十合破去南慕容“斗转星移”、次战暴雪劈散吐蕃国师鸠摩智“小无相功·火焰刀”、三战孤松一剑逼退暗施“参合指”试探的灰衣老僧慕容博、终战与北乔峰摔碗痛饮激斗“降龙十八掌”二十合！万剑齐鸣结为异姓生死知己，获尊「太岳真君」或「西岳剑神」绝世名号！',
  startHint:
    '晋升华山派 Lv.5 掌门（完成《紫霞浩荡》《剑压紫霞》或《两仪归元》任一终局）后，前往【华山绝顶论剑台 · 落雁峰白玉论剑坛】（或于紫霞道观寻岳沧溟）重开甲子华山论剑！',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_summit',
    spotId: 'tg_sm_altar',
    customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 落雁峰白玉论剑坛',
  },
  startCondition: HUASHAN_Q22_START_CONDITION,
  summary:
    '{reignYear}腊月大雪封山，执掌西岳华山的你于【落雁峰白玉论剑坛】重开六十年一遇的甲子“华山绝顶论剑”！四海巨擘踏雪毕至，连潜伏崖畔窥探的段延庆亦被你冲霄剑意惊得悄然退去。白玉坛上四战定乾坤：首战迎击姑苏「南慕容」【慕容复】，十合破去斗转星移震落长剑；次战漫天暴雪硬撼吐蕃国师「大轮明王」【鸠摩智】小无相功与火焰刀，一剑劈散漫天刀影迫明王合十退坛；三战于朝阳孤松下洞察暗施参合指试探的灰衣老僧【慕容博】，凌厉剑意将其一剑逼退；终战与踏雪携酒登峰的丐帮帮主「北乔峰」【乔峰】摔碗痛饮，华山至高剑道与降龙十八掌激荡落雁云霄二十合！双雄抚掌大笑结义，四海群豪万剑齐鸣，西岳华山荣登天下第一剑派绝巅，你亦获尊「太岳真君」或「西岳剑神」之无上名号！',
  initialStepId: 'open_summit',
  steps: {
    open_summit: {
      id: 'open_summit',
      title: '绝顶开坛 · 十合破燕',
      objective:
        '甲子英雄帖已遍传天下！大雪封山之日，请登临【华山绝顶论剑台 · 落雁峰白玉论剑坛】主持开坛大典，并于首战十合之内破去姑苏「南慕容」慕容复的斗转星移！',
      nextHint: '前往【华山绝顶论剑台 · 落雁峰白玉论剑坛（tg_sm_altar）】点击「绝顶开坛 · 首战南慕容慕容复」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 落雁峰白玉论剑坛',
      },
    },
    bout_jiumozhi: {
      id: 'bout_jiumozhi',
      title: '暴雪战佛 · 剑碎火焰',
      objective:
        '已十合震落慕容复长剑！风雪骤急，吐蕃国师「大轮明王」鸠摩智踏雪登坛挑战，请于【华山绝顶论剑台 · 落雁峰白玉论剑坛】硬撼其小无相功与炽烈火焰刀！',
      nextHint: '在【落雁峰白玉论剑坛（tg_sm_altar）】点击「暴雪战佛 · 迎战大轮明王鸠摩智」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 落雁峰白玉论剑坛',
      },
    },
    bout_murongbo: {
      id: 'bout_murongbo',
      title: '孤松暗指 · 一剑惊老',
      objective:
        '大轮明王合十退坛之际，朝阳孤松风雪深处掠过一缕深不可测的阴冷指意！请独步前往【华山绝顶论剑台 · 朝阳孤松观海亭】，逼出暗中窥伺的灰衣老僧慕容博！',
      nextHint: '前往【华山绝顶论剑台 · 朝阳孤松观海亭（tg_sm_pine）】点击「踏雪寻踪 · 迎击灰衣老僧参合指」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 朝阳孤松观海亭',
      },
    },
    bout_qiaofeng: {
      id: 'bout_qiaofeng',
      title: '剑啸亢龙 · 万剑齐鸣',
      objective:
        '一剑惊退灰衣老僧慕容博！落雁峰主坛传来豪迈长笑，丐帮帮主「北乔峰」携酒踏雪登峰，请重返【华山绝顶论剑台 · 落雁峰白玉论剑坛】与乔峰痛饮论交、印证二十合武道极境！',
      nextHint: '返回【华山绝顶论剑台 · 落雁峰白玉论剑坛（tg_sm_altar）】点击「摔碗痛饮 · 决战北乔峰降龙十八掌」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 落雁峰白玉论剑坛',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_hsq22_start_altar',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      onceFlag: 'hsq22_intro_triggered',
      condition: HUASHAN_Q22_START_CONDITION,
      effects: [...SYNC_Q22_LINEAGE_FLAGS, openScene('scene_hsq22_01', HUASHAN_Q22_QUEST_ID)],
    },
    {
      id: 'trig_hsq22_pine_murongbo',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_pine',
      onceFlag: 'hsq22_murongbo_triggered',
      condition: atStep(HUASHAN_Q22_QUEST_ID, 'bout_murongbo'),
      effects: [openScene('scene_hsq22_25', HUASHAN_Q22_QUEST_ID)],
    },
    {
      id: 'trig_hsq22_altar_qiaofeng',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      onceFlag: 'hsq22_qiaofeng_triggered',
      condition: atStep(HUASHAN_Q22_QUEST_ID, 'bout_qiaofeng'),
      effects: [openScene('scene_hsq22_33', HUASHAN_Q22_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_hsq22_start',
      label: '重开甲子华山论剑 · 群雄毕至落雁绝顶（华山大结局）',
      badge: '华山论剑',
      subtitle: '需继任 Lv.5 华山掌门，会战四海绝顶宗师',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      visibleWhen: HUASHAN_Q22_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'hsq22_intro_triggered', value: true },
        ...SYNC_Q22_LINEAGE_FLAGS,
        openScene('scene_hsq22_01', HUASHAN_Q22_QUEST_ID),
      ],
    },
    {
      id: 'spot_hsq22_bout1_murongfu',
      label: '绝顶开坛 · 首战十合破南慕容斗转星移',
      badge: '十合破燕',
      subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      visibleWhen: atStep(HUASHAN_Q22_QUEST_ID, 'open_summit'),
      effects: [openScene('scene_hsq22_05', HUASHAN_Q22_QUEST_ID)],
    },
    {
      id: 'spot_hsq22_bout2_jiumozhi',
      label: '暴雪战佛 · 硬撼大轮明王鸠摩智火焰刀',
      badge: '剑碎刀影',
      subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      visibleWhen: atStep(HUASHAN_Q22_QUEST_ID, 'bout_jiumozhi'),
      effects: [openScene('scene_hsq22_15', HUASHAN_Q22_QUEST_ID)],
    },
    {
      id: 'spot_hsq22_bout3_murongbo',
      label: '踏雪孤松 · 迎击灰衣老僧慕容博参合神指',
      badge: '一剑惊老',
      subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_pine',
      visibleWhen: atStep(HUASHAN_Q22_QUEST_ID, 'bout_murongbo'),
      effects: [openScene('scene_hsq22_25', HUASHAN_Q22_QUEST_ID)],
    },
    {
      id: 'spot_hsq22_bout4_qiaofeng',
      label: '摔碗痛饮 · 二十合巅峰论剑北乔峰',
      badge: '万剑齐鸣',
      subtitle: '华山绝顶论剑台 · 落雁峰白玉论剑坛',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      visibleWhen: atStep(HUASHAN_Q22_QUEST_ID, 'bout_qiaofeng'),
      effects: [openScene('scene_hsq22_33', HUASHAN_Q22_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_hsq22_npc_start',
      label: '腊月大雪封山 · 启坛召开甲子「华山绝顶论剑」（大结局）',
      badge: '华山论剑',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147', 'NPC-0166', 'NPC-0167', 'NPC-0202'] },
          HUASHAN_Q22_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'hsq22_intro_triggered', value: true },
        ...SYNC_Q22_LINEAGE_FLAGS,
        openScene('scene_hsq22_01', HUASHAN_Q22_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./huashanMountaintopSummitQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q22_QUESTS: QuestDefinition[] = [HUASHAN_Q22_QUEST]
