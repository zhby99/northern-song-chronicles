import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q13_QUEST_ID = 'QST-SECT-11-13'

export const ZHONGNAN_Q13_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-12', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q13_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0215', npcName: '白清霜' },
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
  ],
}

export const ZHONGNAN_Q13_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q13_QUEST_ID,
    title: '西市飞霜 · 踏雪无痕',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'changan',
    recommendedRealm: '二流中品 ～ 二流上品',
    maxOpponentRealm: '二流上品（西夏一品堂红牌头目）',
    recommendedNote:
      '终南古墓主干第二卷（全二十幕）。奉林朝瑶之命赴长安西市胡商坊东市接应寒谷飞霜白清霜，习得地阶轻功《踏雪无痕》（MA-098），随后夜潜西市西坊斩杀悬赏终南玉蜂的一品堂红牌头目！',
    startHint:
      '完成《幽谷百雀 · 金针渡影》后，前往【终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室】向师父【林朝瑶】领受下山接应白清霜之命。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_jadebed',
      customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 昆仑寒玉床冰魄石室',
    },
    startCondition: ZHONGNAN_Q13_START_CONDITION,
    summary:
      '{reignYear}夏初，寒玉仙子【林朝瑶】命你携古墓密信北出秦岭，前往【长安府 · 西市胡商坊（东市）】接应潜伏暗查的师姐「寒谷飞霜」【白清霜】。白清霜查明西夏一品堂红牌头目正借胡商货栈囤积毒药、暗谋终南，遂于夜幕前将古墓高阶轻功《踏雪无痕》倾囊相授。是夜，你踏瓦无声夜潜【西市胡商坊（西市）】，连破暗哨并斩杀一品堂红牌头目，焚毁密档，凯旋归报！',
    initialStepId: 'meet_bai_qingshuang',
    steps: {
      meet_bai_qingshuang: {
        id: 'meet_bai_qingshuang',
        title: '东市暗会 · 接应飞霜',
        objective:
          '已领受林朝瑶密令下山！请前往【长安府 · 西市胡商坊（东市）】寻访并接应师姐白清霜。',
        nextHint:
          '前往【长安府（changan） · 西市胡商坊（ca_xishi / ca_xishi_east）】，凭古墓玉蜂暗记接头白清霜。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_east',
          customLabel: '长安府 · 西市胡商坊（东市）',
        },
      },
      raid_xishi_west: {
        id: 'raid_xishi_west',
        title: '踏雪夜潜 · 斩杀红牌',
        objective:
          '已随白清霜习得地阶轻功《踏雪无痕》！请趁夜潜入【长安府 · 西市胡商坊（西市）】胡商暗栈，斩杀西夏一品堂红牌头目！',
        nextHint:
          '前往【长安府 · 西市胡商坊（ca_xishi / ca_xishi_west）】，夜潜暗栈斩杀红牌头目。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_west',
          customLabel: '长安府 · 西市胡商坊（西市）',
        },
      },
      report_bai_after_raid: {
        id: 'report_bai_after_raid',
        title: '焚档会合 · 飞霜复命',
        objective:
          '已斩杀一品堂红牌头目并截获密档！请返回【长安府 · 西市胡商坊（东市）】与白清霜会合复命。',
        nextHint:
          '返回【长安府 · 西市胡商坊（ca_xishi / ca_xishi_east）】，将密档交予白清霜。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_east',
          customLabel: '长安府 · 西市胡商坊（东市）',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq13_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        onceFlag: 'zn_q13_start_triggered',
        condition: ZHONGNAN_Q13_START_CONDITION,
        effects: [openScene('scene_znq13_01', ZHONGNAN_Q13_QUEST_ID)],
      },
      {
        id: 'trig_znq13_east',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        onceFlag: 'zn_q13_east_triggered',
        condition: atStep(ZHONGNAN_Q13_QUEST_ID, 'meet_bai_qingshuang'),
        effects: [openScene('scene_znq13_04', ZHONGNAN_Q13_QUEST_ID)],
      },
      {
        id: 'trig_znq13_west',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
        onceFlag: 'zn_q13_west_triggered',
        condition: atStep(ZHONGNAN_Q13_QUEST_ID, 'raid_xishi_west'),
        effects: [openScene('scene_znq13_11', ZHONGNAN_Q13_QUEST_ID)],
      },
      {
        id: 'trig_znq13_report',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        onceFlag: 'zn_q13_report_triggered',
        condition: atStep(ZHONGNAN_Q13_QUEST_ID, 'report_bai_after_raid'),
        effects: [openScene('scene_znq13_18', ZHONGNAN_Q13_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq13_start',
        label: '【西市飞霜】入冰魄石室 · 领受赴长安接应白清霜密令',
        badge: '古墓主干',
        subtitle: '第一幕 · 昆仑寒玉床冰魄石室',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_jadebed',
        visibleWhen: ZHONGNAN_Q13_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q13_start_triggered', value: true },
          openScene('scene_znq13_01', ZHONGNAN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq13_east',
        label: '【西市飞霜】赴西市东坊 · 接头寒谷飞霜白清霜',
        badge: '东市暗会',
        subtitle: '第四幕 · 西市胡商坊东市',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        visibleWhen: atStep(ZHONGNAN_Q13_QUEST_ID, 'meet_bai_qingshuang'),
        effects: [
          { type: 'setFlag', flag: 'zn_q13_east_triggered', value: true },
          openScene('scene_znq13_04', ZHONGNAN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq13_west',
        label: '【西市飞霜】踏雪夜潜西坊 · 斩杀一品堂红牌头目',
        badge: '夜潜斩敌',
        subtitle: '第十一幕 · 西市胡商坊西市',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
        visibleWhen: atStep(ZHONGNAN_Q13_QUEST_ID, 'raid_xishi_west'),
        effects: [
          { type: 'setFlag', flag: 'zn_q13_west_triggered', value: true },
          openScene('scene_znq13_11', ZHONGNAN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq13_report',
        label: '【西市飞霜】返西市东坊 · 携密档会合白清霜',
        badge: '凯旋会合',
        subtitle: '第十八幕 · 西市胡商坊东市',
        tone: 'jade',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_east',
        visibleWhen: atStep(ZHONGNAN_Q13_QUEST_ID, 'report_bai_after_raid'),
        effects: [
          { type: 'setFlag', flag: 'zn_q13_report_triggered', value: true },
          openScene('scene_znq13_18', ZHONGNAN_Q13_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq13_start',
        label: '【西市飞霜】向师父领受长安西市接应之命',
        badge: '古墓主干',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            ZHONGNAN_Q13_START_CONDITION,
            { type: 'targetNpcMatch', npcIds: ['NPC-0114'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q13_start_triggered', value: true },
          openScene('scene_znq13_01', ZHONGNAN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'npc_znq13_bai',
        label: '【西市飞霜】与白清霜师姐对暗号接头',
        badge: '东市暗会',
        tone: 'primary',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHONGNAN_Q13_QUEST_ID, 'meet_bai_qingshuang'),
            { type: 'targetNpcMatch', npcIds: ['NPC-0215'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q13_east_triggered', value: true },
          openScene('scene_znq13_04', ZHONGNAN_Q13_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuWestMarketQuest.scenes').then((m) => m.SCENES),
  },
]
