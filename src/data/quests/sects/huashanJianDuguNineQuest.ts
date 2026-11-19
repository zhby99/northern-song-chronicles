import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q18_QUEST_ID = 'QST-SECT-05-18'

export const HUASHAN_Q18_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 4 },
    qStatus('QST-SECT-05-16', 'completed'),
    { type: 'flag', flag: 'hs_branch', op: 'eq', value: 'jian', label: '华山剑宗执剑长老专属' },
    qStatus(HUASHAN_Q18_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-1053', npcName: '段延庆' },
    { type: 'npcAlive', npcId: 'NPC-0233', npcName: '叶二娘' },
    { type: 'npcAlive', npcId: 'NPC-0183', npcName: '岳老三' },
    { type: 'npcAlive', npcId: 'NPC-0182', npcName: '云中鹤' },
  ],
}

const SYNC_CAVE_FLAG_EFFECT: QuestEffect = {
  type: 'branch',
  condition: flag('hs_cave', 'eq', 'usurp'),
  thenEffects: [{ type: 'setFlag', flag: 'hs_q18_cave_usurp', value: true }],
  elseEffects: [{ type: 'setFlag', flag: 'hs_q18_cave_usurp', value: false }],
}

export const HUASHAN_Q18_QUEST: QuestDefinition = {
  id: HUASHAN_Q18_QUEST_ID,
  title: '思过绝壁 · 独孤求败',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流上品 ～ 宗师下品（华山剑宗 Lv.4 长老专属天阶绝学篇）',
  maxOpponentRealm: '宗师中品（西夏一品堂绝顶剑客 · 凶神恶煞岳老三 · 恶贯满盈段延庆）',
  recommendedNote:
    '三十六幕华山剑宗天阶绝学觉醒长卷：四大恶人偕西夏一品堂精锐星夜奇袭西岳，你独追绕往后崖包抄的西夏绝顶剑客杀入思过崖古剑刻石室，剑气激荡轰碎百年风化暗壁，惊现剑魔独孤求败隐居石窟！于风雷惊夜顿悟天阶上品《独孤九剑》九式真谛，飞掠回援紫霞观，以破箭式尽扫强弩、挫败岳老三、破气式十招直刺一阳指气机命门重创段延庆，逼退四恶！',
  startHint:
    '升任华山剑宗 Lv.4 长老并完结前序剑宗要务后，前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪】（或寻封不弃、岳沧溟）触发西夏夜袭惊变。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_zixia',
    spotId: 'tg_zx_terrace',
    customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
  },
  startCondition: HUASHAN_Q18_START_CONDITION,
  summary:
    '{reignYear}深秋寒夜，四大恶人（段延庆、叶二娘、岳老三、云中鹤）联手西夏一品堂精锐趁夜奇袭西岳华山！正面山道喊杀震天之际，你敏锐察觉一名西夏绝顶剑客正借夜雾攀越后崖企图背刺玉女峰，遂独身追入【思过崖古山洞 · 秘洞古剑刻石室】将其阵斩。两股沛然剑气余波轰碎石室最深处风化百年的暗壁，赫然露出剑魔独孤求败“败尽英雄，天下更无抗手”之隐居石窟！绝壁风雷夜中，你剑心通明，一朝贯通总决、破剑、破刀、破枪、破鞭、破索、破掌、破箭、破气九式，悟得天阶上品神功《独孤九剑》！随即长啸掠回【玉女峰紫霞道观 · 紫霞正气主殿】，以“破箭式”瞬间尽扫西夏漫天强弩，三剑挫败岳老三，更以“破气式”直指纯阳气机命门，十招之内刺伤宗师中品段延庆，迫使四大恶人骇然遁逃！',
  initialStepId: 'pursue_siguoya',
  steps: {
    pursue_siguoya: {
      id: 'pursue_siguoya',
      title: '绝壁追凶 · 秘洞决剑',
      objective:
        '四大恶人与西夏一品堂夜袭华山！一名西夏绝顶剑客正从后崖奇险绝壁潜向玉女峰侧翼，请即刻追入【思过崖古山洞 · 秘洞古剑刻石室】将其截杀！',
      nextHint: '前往【思过崖古山洞 · 秘洞古剑刻石室（tg_sg_cave）】点击「踏月追凶 · 截杀西夏绝顶剑客」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_cave',
        customLabel: '潼关 / 西岳华山 · 思过崖古山洞 · 秘洞古剑刻石室',
      },
    },
    dugu_enlighten: {
      id: 'dugu_enlighten',
      title: '剑魔遗窟 · 风雷悟剑',
      objective:
        '剑气余波轰碎了秘洞最深处的风化暗壁，尘封百年的剑魔石窟重见天日！请步入【思过崖古山洞 · 秘洞古剑刻石室】内窟，参悟壁上《独孤九剑》九式总纲！',
      nextHint: '在【思过崖古山洞 · 秘洞古剑刻石室（tg_sg_cave）】点击「步入剑魔隐窟 · 参悟独孤九剑」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_cave',
        customLabel: '潼关 / 西岳华山 · 思过崖古山洞 · 秘洞古剑刻石室',
      },
    },
    rescue_zixia: {
      id: 'rescue_zixia',
      title: '天外飞仙 · 破气惊神',
      objective:
        '已于风雷夜顿悟天阶绝学《独孤九剑》！玉女峰方向杀声震天，四大恶人正围攻紫霞道观，请火速飞掠回援【玉女峰紫霞道观 · 紫霞正气主殿】力挽狂澜！',
      nextHint: '前往【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】点击「天外飞仙驰援 · 独孤九剑退四恶」。',
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
      id: 'trig_hsq18_start_terrace',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      onceFlag: 'hsq18_intro_triggered',
      condition: HUASHAN_Q18_START_CONDITION,
      effects: [SYNC_CAVE_FLAG_EFFECT, openScene('scene_hsq18_01', HUASHAN_Q18_QUEST_ID)],
    },
    {
      id: 'trig_hsq18_siguoya_pursuit',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      onceFlag: 'hsq18_siguoya_triggered',
      condition: atStep(HUASHAN_Q18_QUEST_ID, 'pursue_siguoya'),
      effects: [openScene('scene_hsq18_06', HUASHAN_Q18_QUEST_ID)],
    },
    {
      id: 'trig_hsq18_zixia_rescue',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq18_zixia_rescue_triggered',
      condition: atStep(HUASHAN_Q18_QUEST_ID, 'rescue_zixia'),
      effects: [openScene('scene_hsq18_23', HUASHAN_Q18_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_hsq18_start',
      label: '夜观关中烽烟 · 警觉西夏夜袭惊变（剑宗天阶篇）',
      badge: '独孤求败',
      subtitle: '需华山剑宗 Lv.4 长老且完结前序剑宗要务',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      visibleWhen: HUASHAN_Q18_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'hsq18_intro_triggered', value: true },
        SYNC_CAVE_FLAG_EFFECT,
        openScene('scene_hsq18_01', HUASHAN_Q18_QUEST_ID),
      ],
    },
    {
      id: 'spot_hsq18_pursue_cave',
      label: '踏月追凶 · 截杀潜入秘洞之西夏绝顶剑客',
      badge: '绝壁追凶',
      subtitle: '思过崖古山洞 · 秘洞古剑刻石室',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      visibleWhen: atStep(HUASHAN_Q18_QUEST_ID, 'pursue_siguoya'),
      effects: [openScene('scene_hsq18_06', HUASHAN_Q18_QUEST_ID)],
    },
    {
      id: 'spot_hsq18_enlighten_grotto',
      label: '步入剑魔隐窟 · 参悟《独孤九剑》九式真谛',
      badge: '风雷悟剑',
      subtitle: '思过崖古山洞 · 百年隐居石窟',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      visibleWhen: atStep(HUASHAN_Q18_QUEST_ID, 'dugu_enlighten'),
      effects: [openScene('scene_hsq18_12', HUASHAN_Q18_QUEST_ID)],
    },
    {
      id: 'spot_hsq18_rescue_zixia',
      label: '天外飞仙驰援 · 独孤九剑迎击四大恶人',
      badge: '破气惊神',
      subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q18_QUEST_ID, 'rescue_zixia'),
      effects: [openScene('scene_hsq18_23', HUASHAN_Q18_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_hsq18_npc_start',
      label: '禀报山岚杀机 · 迎击西夏与四大恶人夜袭（剑宗天阶篇）',
      badge: '独孤求败',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167', 'NPC-0118', 'NPC-0147'] },
          HUASHAN_Q18_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'hsq18_intro_triggered', value: true },
        SYNC_CAVE_FLAG_EFFECT,
        openScene('scene_hsq18_01', HUASHAN_Q18_QUEST_ID),
      ],
    },
    {
      id: 'act_hsq18_npc_rescue',
      label: '施展独孤九剑 · 解紫霞主殿重围',
      badge: '破气惊神',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147', 'NPC-0166', 'NPC-0167'] },
          atStep(HUASHAN_Q18_QUEST_ID, 'rescue_zixia'),
        ],
      },
      effects: [openScene('scene_hsq18_23', HUASHAN_Q18_QUEST_ID)],
    },
  ],

  loadScenes: () => import('./huashanJianDuguNineQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q18_QUESTS: QuestDefinition[] = [HUASHAN_Q18_QUEST]
