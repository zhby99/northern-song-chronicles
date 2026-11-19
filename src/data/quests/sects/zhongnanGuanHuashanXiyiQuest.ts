import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q08_QUEST_ID = 'QST-SECT-11-08'

export const ZHONGNAN_Q08_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-07', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q08_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1054', npcName: '马钰玄' },
    { type: 'npcAlive', npcId: 'NPC-1056', npcName: '刘处静' },
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
  ],
}

export const ZHONGNAN_Q08_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q08_QUEST_ID,
    title: '华岳论剑 · 睡仙希夷',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'tongguan',
    recommendedRealm: '二流中品 ～ 二流上品',
    maxOpponentRealm: '一流下品（博台论剑四合切磋高沧云）/ 二流上品（慕容假冒执事）',
    recommendedNote:
      '二十四幕重阳古观 Lv.2 晋升 Lv.3 古观真传核心长卷！随马钰玄、刘处静东赴西岳华山【玉女峰紫霞道观 · 紫霞正气主殿】与【华山绝顶论剑台 · 博台孤峰弈棋亭】，拜会岳沧溟、高沧云论剑切磋；识破并擒获混入华山盗窃陈抟遗谱的慕容假冒执事，得两派尊长共授地阶剑法《希夷剑法（MA-089）》！凯旋重阳玄门清修主殿，正式晋升【Lv.3 古观真传】！',
    startHint:
      '完成《秦州烽火 · 铁骑护马》后，前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿】（或寻岳沧溟、高沧云、马钰玄、刘处静）共赴华岳论剑。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
    },
    startCondition: ZHONGNAN_Q08_START_CONDITION,
    summary:
      '{reignYear}中秋，西岳云海如潮。你随【马钰玄】、【刘处静】应约东赴【玉女峰紫霞道观 · 紫霞正气主殿】，拜会华山掌门【岳沧溟】与紫霞首徒【高沧云】。两派登临【华山绝顶论剑台 · 博台孤峰弈棋亭】共参陈抟老祖「睡仙希夷」剑意，你与高沧云切磋四合不落下风。岂料论剑之际，一名假冒华山执事的姑苏慕容暗探趁机盗走《希夷剑谱》残卷！你施展金雁功凌空截住盗谱奸细并将其生擒，岳沧溟与马钰玄大喜，当场共授地阶剑法《希夷剑法》。凯旋【重阳玄门清修主殿】后，你正式晋升终南隐宗【Lv.3 古观真传】！',
    initialStepId: 'botai_sword_debate',
    steps: {
      botai_sword_debate: {
        id: 'botai_sword_debate',
        title: '绝顶博台 · 论剑擒奸',
        objective:
          '已在紫霞正气主殿拜会岳掌门！请随诸位尊长登临【华山绝顶论剑台 · 博台孤峰弈棋亭】，与高沧云论剑并追擒盗谱奸细！',
        nextHint: '前往【华山绝顶论剑台 · 博台孤峰弈棋亭（tg_sm_chess）】。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_chess',
          customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 博台孤峰弈棋亭',
        },
      },
      chongyang_promote_rank3: {
        id: 'chongyang_promote_rank3',
        title: '凯旋重阳 · 晋升真传',
        objective:
          '已习得地阶剑法《希夷剑法》并扬威华岳！请返回【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】，接受册封晋升【Lv.3 古观真传】！',
        nextHint: '返回【重阳玄门清修主殿（zn_to_hall）】接受真传册封。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_hall',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q08_start',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'zn_q08_start_triggered',
        condition: ZHONGNAN_Q08_START_CONDITION,
        effects: [openScene('scene_zn_q08_01', ZHONGNAN_Q08_QUEST_ID)],
      },
      {
        id: 'trig_zn_q08_botai',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        onceFlag: 'zn_q08_botai_triggered',
        condition: atStep(ZHONGNAN_Q08_QUEST_ID, 'botai_sword_debate'),
        effects: [openScene('scene_zn_q08_07', ZHONGNAN_Q08_QUEST_ID)],
      },
      {
        id: 'trig_zn_q08_promote',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'zn_q08_promote_triggered',
        condition: atStep(ZHONGNAN_Q08_QUEST_ID, 'chongyang_promote_rank3'),
        effects: [openScene('scene_zn_q08_20', ZHONGNAN_Q08_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q08_start',
        label: '【华岳论剑】步入紫霞正气主殿 · 拜会岳沧溟与高沧云',
        badge: '华岳论剑',
        subtitle: '第一幕 · 玉女峰紫霞道观',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: ZHONGNAN_Q08_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q08_start_triggered', value: true },
          openScene('scene_zn_q08_01', ZHONGNAN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q08_botai',
        label: '【博台论剑】登弈棋亭切磋高沧云 · 追擒慕容盗谱奸细',
        badge: '睡仙希夷',
        subtitle: '第七幕 · 华山绝顶论剑台',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: atStep(ZHONGNAN_Q08_QUEST_ID, 'botai_sword_debate'),
        effects: [
          { type: 'setFlag', flag: 'zn_q08_botai_triggered', value: true },
          openScene('scene_zn_q08_07', ZHONGNAN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q08_promote',
        label: '【古观真传】归重阳玄门清修主殿 · 晋升 Lv.3 古观真传',
        badge: '晋升真传',
        subtitle: '第二十幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: atStep(ZHONGNAN_Q08_QUEST_ID, 'chongyang_promote_rank3'),
        effects: [
          { type: 'setFlag', flag: 'zn_q08_promote_triggered', value: true },
          openScene('scene_zn_q08_20', ZHONGNAN_Q08_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q08_start',
        label: '呈递终南拜帖 · 启幕两派【华岳论剑】',
        badge: '华岳论剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0202', 'NPC-1054', 'NPC-1056'] },
            ZHONGNAN_Q08_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q08_start_triggered', value: true },
          openScene('scene_zn_q08_01', ZHONGNAN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q08_promote',
        label: '禀报华岳夺谱悟剑经过 · 领受古观真传册封',
        badge: '晋升真传',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1054', 'NPC-1056'] },
            atStep(ZHONGNAN_Q08_QUEST_ID, 'chongyang_promote_rank3'),
          ],
        },
        effects: [openScene('scene_zn_q08_20', ZHONGNAN_Q08_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanGuanHuashanXiyiQuest.scenes').then((m) => m.SCENES),
  },
]
