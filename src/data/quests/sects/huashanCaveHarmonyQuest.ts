import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q14_QUEST_ID = 'QST-SECT-05-14'

export const HUASHAN_Q14_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    qStatus('QST-SECT-05-13', 'completed'),
    {
      type: 'flag',
      flag: 'hs_cave',
      op: 'eq',
      value: 'harmony',
      label: '思过崖抉择：削壁止戈（剑气同源）',
    },
    qStatus('QST-SECT-05-15', 'not_completed'),
    qStatus(HUASHAN_Q14_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q14_QUEST: QuestDefinition = {
  id: HUASHAN_Q14_QUEST_ID,
  title: '石室止戈 · 剑气同源',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流中品',
  maxOpponentRealm: '一流上品（秦烈山与宁清羽同源喂招考校）',
  recommendedNote:
    '华山派思过崖正统同源分支长卷（二十幕）。承接《寒风面壁》中【削壁止戈】抉择，挥剑削平【秘洞古剑刻石室】同室操戈魔刻、收敛先辈骸骨，恭请岳沧溟、秦烈山、宁清羽、封不弃四老共入石室祭奠化冰；四老感念大义当场打破门户藩篱交叉授艺——剑宗弟子破格获传地阶中品《混元功》，气宗弟子获授《太岳剑髓》永久剑伤加成！',
  startHint:
    '在《寒风面壁 · 铁锁惊雷》中选择【削壁止戈】后，于【思过崖古山洞 · 秘洞古剑刻石室】挥剑削魔立冢开启。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_siguoya',
    spotId: 'tg_sg_cave',
    customLabel: '潼关 / 西岳华山 · 思过崖古山洞 · 秘洞古剑刻石室',
  },
  startCondition: HUASHAN_Q14_START_CONDITION,
  summary:
    '{reignYear}思过崖雨霁天青，你铭记入门之初「剑气本出一源」的铮铮誓言，于【秘洞古剑刻石室】挥剑如雪，将四壁专杀同门的阴毒破招尽数削平，并恭敬收敛十余具先辈遗骸立冢安葬。随后你下崖禀明掌门岳沧溟与宁清羽，飞书邀来落雁峰秦烈山与长安封不弃。四位宿老时隔三十年再入石室，抚冢泣拜，连素来偏执的封不弃亦长叹释怀。四老当场打破气剑藩篱交叉授艺：剑宗真传破例获宁清羽亲授地阶中品《混元功》，气宗真传则获秦烈山倾授「太岳剑髓」真谛，西岳三十年坚冰自此初融！',
  initialStepId: 'q14_invite_elders',
  steps: {
    q14_invite_elders: {
      id: 'q14_invite_elders',
      title: '削壁葬骨 · 恭请四老',
      objective:
        '已削平石室同室操戈魔刻并收敛先辈遗骨立冢！请前往【玉女峰紫霞道观 · 紫霞正气主殿】向岳沧溟与宁清羽禀明始末，并传讯秦烈山、封不弃共赴思过崖祭奠！',
      nextHint:
        '前往【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】面见掌门岳沧溟。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
      },
    },
    q14_cave_mourn_teach: {
      id: 'q14_cave_mourn_teach',
      title: '四老泣拜 · 交叉授艺',
      objective:
        '岳沧溟、秦烈山、宁清羽、封不弃四老已应邀同登思过崖！请重返【思过崖古山洞 · 秘洞古剑刻石室】主持先辈祭礼，见证三十载坚冰消融并领受跨宗绝学！',
      nextHint:
        '前往【思过崖古山洞 · 秘洞古剑刻石室（tg_sg_cave）】，点击「迎四老入石室祭奠 · 领受剑气同源真传」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_cave',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_hsq14_zixia_hall',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq14_zixia_hall_triggered',
      condition: atStep(HUASHAN_Q14_QUEST_ID, 'q14_invite_elders'),
      effects: [openScene('scene_hsq14_07', HUASHAN_Q14_QUEST_ID)],
    },
    {
      id: 'trig_hsq14_cave_return',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      onceFlag: 'hsq14_cave_return_triggered',
      condition: atStep(HUASHAN_Q14_QUEST_ID, 'q14_cave_mourn_teach'),
      effects: [openScene('scene_hsq14_12', HUASHAN_Q14_QUEST_ID)],
    },
  ],
  spotActions: [
    {
      id: 'spot_hsq14_start_cave',
      label: '挥剑削平弑亲魔刻 · 收敛先辈遗骨立冢（开启《石室止戈》）',
      badge: '削壁止戈',
      subtitle: '秘洞古剑刻石室 · 剑气本出一源',
      tone: 'jade',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      visibleWhen: HUASHAN_Q14_START_CONDITION,
      effects: [openScene('scene_hsq14_01', HUASHAN_Q14_QUEST_ID)],
    },
    {
      id: 'spot_hsq14_invite_elders',
      label: '向岳掌门禀报石室始末 · 恭请四老同赴思过崖',
      badge: '恭请四老',
      subtitle: '紫霞正气主殿 · 化干戈为玉帛',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q14_QUEST_ID, 'q14_invite_elders'),
      effects: [openScene('scene_hsq14_07', HUASHAN_Q14_QUEST_ID)],
    },
    {
      id: 'spot_hsq14_cave_mourn',
      label: '迎四老入石室祭奠 · 领受剑气同源真传',
      badge: '剑气同源',
      subtitle: '秘洞古剑刻石室 · 打破门户藩篱',
      tone: 'jade',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      visibleWhen: atStep(HUASHAN_Q14_QUEST_ID, 'q14_cave_mourn_teach'),
      effects: [openScene('scene_hsq14_12', HUASHAN_Q14_QUEST_ID)],
    },
  ],
  npcActions: [
    {
      id: 'act_hsq14_elder_start_backup',
      label: '前往思过崖石室削壁葬骨 · 开启《石室止戈 · 剑气同源》',
      badge: '削壁止戈',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147', 'NPC-0166'] },
          HUASHAN_Q14_START_CONDITION,
        ],
      },
      effects: [
        { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_siguoya', spotId: 'tg_sg_cave' },
        openScene('scene_hsq14_01', HUASHAN_Q14_QUEST_ID),
      ],
    },
    {
      id: 'act_hsq14_yue_invite',
      label: '禀明思过崖诛谍葬骨始末 · 请四老同入石室祭拜',
      badge: '恭请四老',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
          atStep(HUASHAN_Q14_QUEST_ID, 'q14_invite_elders'),
        ],
      },
      effects: [openScene('scene_hsq14_07', HUASHAN_Q14_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./huashanCaveHarmonyQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q14_QUESTS: QuestDefinition[] = [HUASHAN_Q14_QUEST]
