import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_Q08_QUEST_ID = 'QST-SECT-05-08'

export const HUASHAN_Q08_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus('QST-SECT-05-07', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'jian',
      label: '华山剑宗支脉弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-128', minLevel: 3 },
    qStatus(HUASHAN_Q08_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q08_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q08_QUEST_ID,
    title: '云台残局 · 希夷求变',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流上品',
    maxOpponentRealm: '二流上品（西夏黑市雇佣西域奇门双刺客围攻）',
    recommendedNote:
      '二十二幕华山剑宗晋升真传大考：需《落雁剑法》修至第 3 重以上。于博台孤峰弈棋亭受潼关剑神秦烈山三合点破快剑空门，赴思过崖寒潭参悟陈抟弈理习得地阶《希夷剑法》，并在飞瀑下以一敌二斩杀盗取道家古铜钟的西域奇门双刺客，获秦烈山与封不弃联名保举晋升第 3 阶真传弟子！',
    startHint:
      '完成《风陵夜渡 · 平沙落雁》且《落雁剑法》≥ 3 重后，前往【华山绝顶论剑台 > 博台孤峰弈棋亭】或寻【秦烈山】/【封不弃】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_chess',
      customLabel: '潼关 / 西岳华山 · 博台孤峰弈棋亭',
    },
    startCondition: HUASHAN_Q08_START_CONDITION,
    summary:
      '{reignYear}你携风陵渡大捷之锐气登【博台孤峰弈棋亭】受考，不料潼关剑神【秦烈山】仅用三合便点破你快剑后力不继之空门，痛斥“一味图快而无虚实奇正，不过匹夫之剑”。秦烈山携你自陈抟遗局参悟弃取之道，并赴【绝壁银瀑涤心寒潭】亲授地阶下品《希夷剑法》。暮色中两名受雇于西夏黑市的西域奇门刺客潜入盗取华山镇观古铜钟，你在飞瀑下以《希夷剑法》虚招诱敌、合《落雁剑法》疾剑封喉，孤身独斩二流上品双刺客！返登【落雁峰白玉论剑坛】，秦烈山与【封不弃】联名作保，正式擢升你为华山真传弟子！',
    initialStepId: 'botai_test',
    steps: {
      botai_test: {
        id: 'botai_test',
        title: '博台折锋 · 三合问弊',
        objective:
          '已随封不弃登临绝顶。请于【华山绝顶论剑台 > 博台孤峰弈棋亭】拔剑向潼关剑神【秦烈山】请益考校！',
        nextHint: '于【华山绝顶论剑台 > 博台孤峰弈棋亭】接受秦烈山三合考校。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_chess',
        },
      },
      falls_xiyi: {
        id: 'falls_xiyi',
        title: '银瀑听涛 · 希夷求变',
        objective:
          '快剑空门被三合点破！请遵秦烈山之命前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】涤除躁气，习练道家虚实相生之地阶《希夷剑法》！',
        nextHint: '前往【思过崖古山洞 > 绝壁银瀑涤心寒潭】修习《希夷剑法》。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_siguoya',
          spotId: 'tg_sg_falls',
        },
      },
      falls_assassins: {
        id: 'falls_assassins',
        title: '寒潭护钟 · 银瀑封喉',
        objective:
          '寒潭古道龛惊现异响！请在【思过崖古山洞 > 绝壁银瀑涤心寒潭】查探潜入盗钟的西夏黑市刺客，以希夷虚实合落雁快剑独斩强敌！',
        nextHint: '于【绝壁银瀑涤心寒潭】迎战潜入盗钟的西域奇门双刺客。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_siguoya',
          spotId: 'tg_sg_falls',
        },
      },
      altar_promote: {
        id: 'altar_promote',
        title: '白玉联保 · 擢升真传',
        objective:
          '飞瀑下独斩西域双刺客，护住镇观古铜钟！请登临【华山绝顶论剑台 > 落雁峰白玉论剑坛】，接受【秦烈山】与【封不弃】联名保举晋升真传弟子！',
        nextHint: '前往【华山绝顶论剑台 > 落雁峰白玉论剑坛】晋升华山真传弟子。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_altar',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq08_chess_start',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        onceFlag: 'hsq08_intro_triggered',
        condition: HUASHAN_Q08_START_CONDITION,
        effects: [openScene('scene_hsq08_01', HUASHAN_Q08_QUEST_ID)],
      },
      {
        id: 'trig_hsq08_falls_xiyi',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        onceFlag: 'hsq08_falls_triggered',
        condition: atStep(HUASHAN_Q08_QUEST_ID, 'falls_xiyi'),
        effects: [openScene('scene_hsq08_07', HUASHAN_Q08_QUEST_ID)],
      },
      {
        id: 'trig_hsq08_altar_promote',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hsq08_promote_triggered',
        condition: atStep(HUASHAN_Q08_QUEST_ID, 'altar_promote'),
        effects: [openScene('scene_hsq08_19', HUASHAN_Q08_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq08_start_chess',
        label: '登博台弈棋亭 · 请潼关剑神考校快剑（开启《云台残局 · 希夷求变》）',
        badge: '博台问剑',
        subtitle: '第一幕 · 博台孤峰弈棋亭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: HUASHAN_Q08_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq08_intro_triggered', value: true },
          openScene('scene_hsq08_01', HUASHAN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq08_botai_test',
        label: '于博台孤峰拔剑 · 向秦烈山递出落雁快剑',
        badge: '三合试锋',
        subtitle: '第二幕 · 博台孤峰弈棋亭',
        tone: 'primary',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_chess',
        visibleWhen: atStep(HUASHAN_Q08_QUEST_ID, 'botai_test'),
        effects: [openScene('scene_hsq08_02', HUASHAN_Q08_QUEST_ID)],
      },
      {
        id: 'spot_hsq08_falls_xiyi',
        label: '静听银瀑惊涛 · 领受秦烈山亲授《希夷剑法》',
        badge: '希夷求变',
        subtitle: '第七幕 · 绝壁银瀑涤心寒潭',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        visibleWhen: atStep(HUASHAN_Q08_QUEST_ID, 'falls_xiyi'),
        effects: [
          { type: 'setFlag', flag: 'hsq08_falls_triggered', value: true },
          openScene('scene_hsq08_07', HUASHAN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq08_falls_assassins',
        label: '潜行寒潭古龛 · 希夷诱敌独战西域盗钟双刺客',
        badge: '银瀑封喉',
        subtitle: '第十二幕 · 绝壁银瀑涤心寒潭',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_falls',
        visibleWhen: atStep(HUASHAN_Q08_QUEST_ID, 'falls_assassins'),
        effects: [openScene('scene_hsq08_12', HUASHAN_Q08_QUEST_ID)],
      },
      {
        id: 'spot_hsq08_altar_promote',
        label: '登落雁峰白玉论剑坛 · 受双宿联保晋升真传弟子',
        badge: '晋升真传',
        subtitle: '第十九幕 · 落雁峰白玉论剑坛',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: atStep(HUASHAN_Q08_QUEST_ID, 'altar_promote'),
        effects: [
          { type: 'setFlag', flag: 'hsq08_promote_triggered', value: true },
          openScene('scene_hsq08_19', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq08_start_npc',
        label: '请秦师伯与封师叔考校《落雁剑法》（开启《云台残局 · 希夷求变》）',
        badge: '真传大考',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147', 'NPC-0167'] },
            HUASHAN_Q08_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq08_intro_triggered', value: true },
          openScene('scene_hsq08_01', HUASHAN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq08_promote_npc',
        label: '呈验西夏黑市密牌 · 受保举晋升华山真传弟子',
        badge: '晋升真传',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147', 'NPC-0167'] },
            atStep(HUASHAN_Q08_QUEST_ID, 'altar_promote'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq08_promote_triggered', value: true },
          openScene('scene_hsq08_19', HUASHAN_Q08_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanJianXiyiQuest.scenes').then((m) => m.SCENES),
  },
]
