import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q02_QUEST_ID = 'QST-SECT-05-02'

export const HUASHAN_Q02_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 1 },
    qStatus('QST-SECT-05-01', 'completed'),
    { type: 'learnedArtAtLeast', artId: 'MA-167', minLevel: 3 },
    { type: 'learnedArtAtLeast', artId: 'MA-160', minLevel: 2 },
    qStatus(HUASHAN_Q02_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
  ],
}

export const HUASHAN_Q02_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q02_QUEST_ID,
    title: '博台大比 · 剑气分宗',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '三流中品 ～ 三流上品',
    maxOpponentRealm: '三流上品（外门魁首 · 陆展锋）',
    recommendedNote:
      '华山派 Lv.1 晋升 Lv.2 内门剑士核心分宗大戏（全十八幕）。须完成《药王除恶 · 十二初试》且《华山剑法（入门十二式）》达三重、《华山基础心法》达二重。于博台孤峰弈棋亭在四老观礼下连胜三场同门切磋夺魁，入夜于紫霞正气主殿在【紫霞气宗正脉】与【西峰剑宗支脉】间作出不可逆的师承抉择！',
    startHint:
      '完成《药王除恶 · 十二初试》并将《华山剑法（入门十二式）》修至三重、《华山基础心法》修至二重后，前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪】或【华山绝顶论剑台 · 博台孤峰弈棋亭】（或寻岳沧溟、秦烈山、宁清羽、封不弃）触发三年大比。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_chess',
      customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 博台孤峰弈棋亭',
    },
    startCondition: HUASHAN_Q02_START_CONDITION,
    summary:
      '{reignYear}西岳秋高气爽，三年一度的华山外门升堂大比于【华山绝顶论剑台 · 博台孤峰弈棋亭】隆重揭幕。掌门【岳沧溟】、潼关剑神【秦烈山】、玉女剑仙【宁清羽】与狂风快剑【封不弃】四位宿老并坐云海之巅观礼。你凭千锤百炼的《华山剑法（入门十二式）》连克新锐同门周云帆、资深师兄赵承钧，终在决胜局奇正相生震飞外门魁首陆展锋长剑，一举夺魁晋升【内门剑士】！是夜烛火摇曳，岳沧溟与封不弃于【紫霞正气主殿】当众挑明华山气宗与剑宗百年法统之争，你在正气浩然的气宗正脉与奇险夺命的剑宗支脉之间立下终生无悔之誓。',
    initialStepId: 'botai_tournament',
    steps: {
      botai_tournament: {
        id: 'botai_tournament',
        title: '绝顶博台 · 三轮试剑',
        objective:
          '三年一度的外门升堂大比已鸣钟启幕！请登临【华山绝顶论剑台 · 博台孤峰弈棋亭】，在岳沧溟、秦烈山、宁清羽、封不弃四老见证下连闯三轮同门切磋！',
        nextHint:
          '前往【华山绝顶论剑台 · 博台孤峰弈棋亭（tg_sm_chess）】，点击「登博台孤峰 · 出战外门升堂三轮大比」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_chess',
          customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 博台孤峰弈棋亭',
        },
      },
      zixia_night_choice: {
        id: 'zixia_night_choice',
        title: '烛影正气 · 剑气择脉',
        objective:
          '博台三战全胜夺得外门大比魁首！请于入夜后前往【玉女峰紫霞道观 · 紫霞正气主殿】，面见岳沧溟与封不弃，择定华山气宗或剑宗传承（此抉择不可逆）！',
        nextHint:
          '前往【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】，点击「夜入紫霞正气主殿 · 聆听剑气分宗抉择」。',
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
        id: 'trig_hsq02_start_terrace',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hs_q02_start_triggered',
        condition: HUASHAN_Q02_START_CONDITION,
        effects: [openScene('scene_hsq02_01', HUASHAN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_hsq02_start_chess',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        onceFlag: 'hs_q02_start_triggered',
        condition: HUASHAN_Q02_START_CONDITION,
        effects: [openScene('scene_hsq02_01', HUASHAN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_hsq02_botai_rounds',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        onceFlag: 'hs_q02_botai_triggered',
        condition: atStep(HUASHAN_Q02_QUEST_ID, 'botai_tournament'),
        effects: [openScene('scene_hsq02_03', HUASHAN_Q02_QUEST_ID)],
      },
      {
        id: 'trig_hsq02_night_hall',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'hs_q02_night_hall_triggered',
        condition: atStep(HUASHAN_Q02_QUEST_ID, 'zixia_night_choice'),
        effects: [openScene('scene_hsq02_12', HUASHAN_Q02_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq02_start_terrace',
        label: '【华山大比】晨钟集结 · 赴绝顶博台外门升堂大比',
        badge: '博台大比',
        subtitle: '三年一度 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: HUASHAN_Q02_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q02_start_triggered', value: true },
          openScene('scene_hsq02_01', HUASHAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq02_start_chess',
        label: '【华山大比】报名登坛 · 开启外门升堂大比',
        badge: '博台大比',
        subtitle: '三年一度 · 博台孤峰弈棋亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: HUASHAN_Q02_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q02_start_triggered', value: true },
          openScene('scene_hsq02_01', HUASHAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq02_botai_arena',
        label: '【华山大比】登博台孤峰 · 出战外门升堂三轮大比',
        badge: '三轮校剑',
        subtitle: '第三幕 · 四老观礼连战外门群英',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: atStep(HUASHAN_Q02_QUEST_ID, 'botai_tournament'),
        effects: [
          { type: 'setFlag', flag: 'hs_q02_botai_triggered', value: true },
          openScene('scene_hsq02_03', HUASHAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq02_night_division',
        label: '【华山分宗】夜入紫霞正气主殿 · 聆听剑气分宗抉择',
        badge: '剑气分宗',
        subtitle: '第十二幕 · 择定气宗正脉或剑宗支脉（不可逆）',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: atStep(HUASHAN_Q02_QUEST_ID, 'zixia_night_choice'),
        effects: [
          { type: 'setFlag', flag: 'hs_q02_night_hall_triggered', value: true },
          openScene('scene_hsq02_12', HUASHAN_Q02_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq02_start_npc',
        label: '禀请参加三年一度【博台外门升堂大比】',
        badge: '博台大比',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147', 'NPC-0166', 'NPC-0167', 'NPC-0202'] },
            HUASHAN_Q02_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q02_start_triggered', value: true },
          openScene('scene_hsq02_01', HUASHAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq02_botai_npc',
        label: '登博台孤峰向尊长行礼 · 开启三轮校剑',
        badge: '三轮校剑',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0147'] },
            atStep(HUASHAN_Q02_QUEST_ID, 'botai_tournament'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q02_botai_triggered', value: true },
          openScene('scene_hsq02_03', HUASHAN_Q02_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq02_night_npc',
        label: '步入烛影大殿 · 拜听剑气两脉师承抉择',
        badge: '剑气分宗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166', 'NPC-0167'] },
            atStep(HUASHAN_Q02_QUEST_ID, 'zixia_night_choice'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q02_night_hall_triggered', value: true },
          openScene('scene_hsq02_12', HUASHAN_Q02_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanBotaiDivisionQuest.scenes').then((m) => m.SCENES),
  },
]
