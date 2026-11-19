import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q18_QUEST_ID = 'QST-SECT-11-18'

export const ZHONGNAN_Q18_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-17', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q18_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0138', npcName: '苏星河' },
    { type: 'npcAlive', npcId: 'NPC-0046', npcName: '邵雍' },
    { type: 'npcAlive', npcId: 'NPC-0182', npcName: '云中鹤' },
    { type: 'npcAlive', npcId: 'NPC-0211', npcName: '苟读' },
  ],
}

export const ZHONGNAN_Q18_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q18_QUEST_ID,
    title: '洛水琴棋 · 聪辩雅集',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'luoyang',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（西夏一品堂 · 穷凶极恶 云中鹤）',
    recommendedNote:
      '终南古墓真传东行洛阳卷（全二十四幕）。携星宿残笺东赴西京洛阳，于白马书院垂柳荷池手谈水亭拜会「聪辩先生」苏星河与易学宗师邵雍，手谈论琴以破西夏耳目；随后赶赴洛阳牡丹园碧溪虹桥琴画水榭，力护「函谷八友」书呆苟读，并以《踏雪无痕》轻功力压天下轻功大贼云中鹤！',
    startHint:
      '完成《冰魄银针 · 含沙凝霜》后，前往【洛阳府 · 白马书院（洛学讲席） · 垂柳荷池手谈水亭】，凭终南古墓旧谊拜会苏星河与邵雍。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_shuyuan',
      spotId: 'ly_sy_pavilion',
      customLabel: '洛阳府 · 白马书院（洛学讲席） · 垂柳荷池手谈水亭',
    },
    startCondition: ZHONGNAN_Q18_START_CONDITION,
    summary:
      '{reignYear}冬月，你循秦岭死士残笺线索东赴西京洛阳，于【白马书院 · 垂柳荷池手谈水亭】拜会逍遥派「聪辩先生」【苏星河】与大宋易学名儒【邵雍】。席间手谈论琴，示警西夏一品堂暗谋，却惊闻西夏轻功大恶「穷凶极恶」【云中鹤】正于洛阳牡丹园截杀「函谷八友」之【苟读】！你急赴【洛阳牡丹园 · 碧溪虹桥琴画水榭】，以古墓绝顶轻功《踏雪无痕》截住云中鹤鬼魅身法，正面力压强敌护下苟读，并与苏星河、邵雍结下莫逆之交！',
    initialStepId: 'peony_rescue_goudu',
    steps: {
      peony_rescue_goudu: {
        id: 'peony_rescue_goudu',
        title: '牡丹水榭 · 力压云鹤',
        objective:
          '已于白马书院会晤苏星河与邵雍，惊闻云中鹤正在牡丹园围攻苟读！请速赴【洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭】驰援苟读并力压云中鹤！',
        nextHint:
          '前往【洛阳府（luoyang） · 洛阳牡丹园 · 碧溪虹桥琴画水榭（ly_pn_waterside）】，护下苟读迎战云中鹤。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_peony',
          spotId: 'ly_pn_waterside',
          customLabel: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
        },
      },
      return_shuyuan_farewell: {
        id: 'return_shuyuan_farewell',
        title: '聪辩赠言 · 琴棋结谊',
        objective:
          '已以《踏雪无痕》力压云中鹤并护下苟读！请返回【洛阳府 · 白马书院 · 垂柳荷池手谈水亭】向苏星河与邵雍辞行。',
        nextHint:
          '返回【洛阳府 · 白马书院 · 垂柳荷池手谈水亭（ly_sy_pavilion）】，听取苏星河关于秦岭内奸的暗中提醒。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_shuyuan',
          spotId: 'ly_sy_pavilion',
          customLabel: '洛阳府 · 白马书院（洛学讲席） · 垂柳荷池手谈水亭',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq18_start',
        regionId: 'luoyang',
        buildingId: 'ly_shuyuan',
        spotId: 'ly_sy_pavilion',
        onceFlag: 'zn_q18_start_triggered',
        condition: ZHONGNAN_Q18_START_CONDITION,
        effects: [openScene('scene_znq18_01', ZHONGNAN_Q18_QUEST_ID)],
      },
      {
        id: 'trig_znq18_peony',
        regionId: 'luoyang',
        buildingId: 'ly_peony',
        spotId: 'ly_pn_waterside',
        onceFlag: 'zn_q18_peony_triggered',
        condition: atStep(ZHONGNAN_Q18_QUEST_ID, 'peony_rescue_goudu'),
        effects: [openScene('scene_znq18_10', ZHONGNAN_Q18_QUEST_ID)],
      },
      {
        id: 'trig_znq18_return',
        regionId: 'luoyang',
        buildingId: 'ly_shuyuan',
        spotId: 'ly_sy_pavilion',
        onceFlag: 'zn_q18_return_triggered',
        condition: atStep(ZHONGNAN_Q18_QUEST_ID, 'return_shuyuan_farewell'),
        effects: [openScene('scene_znq18_20', ZHONGNAN_Q18_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq18_start',
        label: '【聪辩雅集】步入手谈水亭 · 拜会苏星河与邵雍',
        badge: '古墓真传',
        subtitle: '第一幕 · 垂柳荷池手谈水亭',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_shuyuan',
        spotId: 'ly_sy_pavilion',
        visibleWhen: ZHONGNAN_Q18_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q18_start_triggered', value: true },
          openScene('scene_znq18_01', ZHONGNAN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq18_peony',
        label: '【聪辩雅集】疾驰琴画水榭 · 护苟读力压云中鹤',
        badge: '轻功争锋',
        subtitle: '第十幕 · 碧溪虹桥琴画水榭',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_peony',
        spotId: 'ly_pn_waterside',
        visibleWhen: atStep(ZHONGNAN_Q18_QUEST_ID, 'peony_rescue_goudu'),
        effects: [
          { type: 'setFlag', flag: 'zn_q18_peony_triggered', value: true },
          openScene('scene_znq18_10', ZHONGNAN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq18_return',
        label: '【聪辩雅集】返手谈水亭 · 拜别苏星河与邵雍',
        badge: '琴棋结谊',
        subtitle: '第二十幕 · 垂柳荷池手谈水亭',
        tone: 'jade',
        regionId: 'luoyang',
        buildingId: 'ly_shuyuan',
        spotId: 'ly_sy_pavilion',
        visibleWhen: atStep(ZHONGNAN_Q18_QUEST_ID, 'return_shuyuan_farewell'),
        effects: [
          { type: 'setFlag', flag: 'zn_q18_return_triggered', value: true },
          openScene('scene_znq18_20', ZHONGNAN_Q18_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq18_start',
        label: '【聪辩雅集】向苏星河先生出示秦岭残笺示警',
        badge: '古墓真传',
        tone: 'gold',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q18_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0138', 'NPC-0046'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q18_start_triggered', value: true },
          openScene('scene_znq18_01', ZHONGNAN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'npc_znq18_goudu',
        label: '【聪辩雅集】护住苟读先生，迎战西夏恶人云中鹤',
        badge: '驰援苟读',
        tone: 'danger',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHONGNAN_Q18_QUEST_ID, 'peony_rescue_goudu'),
            { type: 'targetNpcMatch', npcIds: ['NPC-0211'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q18_peony_triggered', value: true },
          openScene('scene_znq18_10', ZHONGNAN_Q18_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuLuoyangChessQuest.scenes').then((m) => m.SCENES),
  },
]
