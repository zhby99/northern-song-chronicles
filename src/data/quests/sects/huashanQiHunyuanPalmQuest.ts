import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q04_QUEST_ID = 'QST-SECT-05-04'

export const HUASHAN_Q04_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus('QST-SECT-05-03', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'qi',
      label: '华山气宗正脉弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-147', minLevel: 3 },
    qStatus(HUASHAN_Q04_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
  ],
}

export const HUASHAN_Q04_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q04_QUEST_ID,
    title: '渭水惊澜 · 混元破寨',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流下品 ～ 二流中品',
    maxOpponentRealm: '二流中品（赤沙帮主 · 沙通海）',
    recommendedNote:
      '华山气宗正脉 Lv.2 内门中篇（全十八幕）。须完成《玉女晨钟 · 浩然养吾》且《养吾剑法》达三重。渭水悍匪“赤沙帮”暗通西夏黑市劫掠京兆府赈灾官粮与华山巡商，随宁清羽查探长安西市、于渭水秋舟获授良品《华山混元掌》（MA-109），子夜奇袭水寨掌裂重盾、生死决战击毙沙通海！',
    startHint:
      '完成《玉女晨钟 · 浩然养吾》并将《养吾剑法》修至三重后，前往【玉女峰紫霞道观 · 洗头盆清泉演剑院】寻【宁清羽】开启渭水缉匪。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
    },
    startCondition: HUASHAN_Q04_START_CONDITION,
    summary:
      '{reignYear}深秋，暗结西夏黑市的渭水巨寇“赤沙帮”连劫京兆府赈灾官粮与华山巡商船队。你随【宁清羽】西赴【长安西市 · 车马行栈】揪出赤沙帮销赃眼线，锁定渭黄交汇芦苇水寨。顺渭水泛舟东进途中，宁清羽于秋江孤舟亲授刚柔并济的《华山混元掌》。子夜奇袭连环水寨，你在狭窄栈桥左掌催动混元暗劲震碎尺厚西夏铁木重盾、右手施展《养吾剑法》杀入聚义水阁，生死决战掌毙二流中品帮主沙通海，火焚匪寨夺回救命官粮！',
    initialStepId: 'investigate_changan_xishi',
    steps: {
      investigate_changan_xishi: {
        id: 'investigate_changan_xishi',
        title: '西市追赃 · 揪出暗桩',
        objective:
          '渭水赈粮与华山商船遭“赤沙帮”洗劫！请随宁清羽赶赴【京兆府 · 西市胡商坊 · 车马行栈 · 镖局坪】，向幸存镖师问明敌情并揪出西夏黑市销赃眼线！',
        nextHint:
          '前往【京兆府（changan） · 西市胡商坊 · 车马行栈 · 镖局坪（ca_xishi_west）】，点击「查访遇劫镖师 · 搜捕赤沙帮暗桩」。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_west',
          customLabel: '京兆府 · 西市胡商坊 · 车马行栈 · 镖局坪',
        },
      },
      weishui_ferry_palm: {
        id: 'weishui_ferry_palm',
        title: '秋江孤舟 · 渭水传掌',
        objective:
          '已审明赤沙帮水寨匿于渭水入黄交汇芦苇荡！请赶赴【潼关 / 西岳华山 · 潼关天险瓮城 · 黄河大折惊涛烽火台】渡口登舟，随宁清羽顺渭水潜行并领受破盾掌法！',
        nextHint:
          '前往【潼关天险瓮城 · 黄河大折惊涛烽火台（tg_ft_beacon）】，点击「登渭水孤舟 · 领受宁师叔传授混元掌」。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
          customLabel: '潼关 / 西岳华山 · 渭黄交汇渡口（黄河大折惊涛烽火台）',
        },
      },
      midnight_raid_chisha: {
        id: 'midnight_raid_chisha',
        title: '子夜栈桥 · 混元破寨',
        objective:
          '已习得《华山混元掌》！整备披挂与武学后，请于【黄河大折惊涛烽火台】水道趁子夜浓雾奇袭赤沙水寨，掌裂重盾、诛杀帮主沙通海夺回赈灾官粮！',
        nextHint:
          '于【潼关天险瓮城 · 黄河大折惊涛烽火台（tg_ft_beacon）】点击「子夜奇袭赤沙水寨 · 掌裂重盾斩沙通海」（建议先在枢机菜单装备《华山混元掌》）。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_beacon',
          customLabel: '潼关 / 西岳华山 · 赤沙帮连环水寨（黄河大折惊涛烽火台）',
        },
      },
      return_zixia_spring: {
        id: 'return_zixia_spring',
        title: '焚寨夺粮 · 清泉复命',
        objective:
          '已掌毙沙通海、焚毁赤沙水寨并将赈灾官粮移交京兆府官吏！请返回【玉女峰紫霞道观 · 洗头盆清泉演剑院】向宁清羽复命。',
        nextHint:
          '返回【玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，点击「渭水凯旋 · 向宁师叔禀明混元掌剑心得」或与宁清羽交谈。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_spring',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq04_start_spring',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_q04_start_triggered',
        condition: HUASHAN_Q04_START_CONDITION,
        effects: [openScene('scene_hsq04_01', HUASHAN_Q04_QUEST_ID)],
      },
      {
        id: 'trig_hsq04_xishi_arrive',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
        onceFlag: 'hs_q04_xishi_triggered',
        condition: atStep(HUASHAN_Q04_QUEST_ID, 'investigate_changan_xishi'),
        effects: [openScene('scene_hsq04_03', HUASHAN_Q04_QUEST_ID)],
      },
      {
        id: 'trig_hsq04_ferry_arrive',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        onceFlag: 'hs_q04_ferry_triggered',
        condition: atStep(HUASHAN_Q04_QUEST_ID, 'weishui_ferry_palm'),
        effects: [openScene('scene_hsq04_06', HUASHAN_Q04_QUEST_ID)],
      },
      {
        id: 'trig_hsq04_return_spring',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        onceFlag: 'hs_q04_return_triggered',
        condition: atStep(HUASHAN_Q04_QUEST_ID, 'return_zixia_spring'),
        effects: [openScene('scene_hsq04_17', HUASHAN_Q04_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq04_start_spring',
        label: '【气宗内门】接阅渭水急报 · 随宁师叔追查赤沙帮劫粮案',
        badge: '渭水惊澜',
        subtitle: '气宗中篇 · 洗头盆清泉演剑院',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: HUASHAN_Q04_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q04_start_triggered', value: true },
          openScene('scene_hsq04_01', HUASHAN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq04_xishi_probe',
        label: '【气宗内门】查访遇劫镖师 · 搜捕赤沙帮暗桩',
        badge: '西市追赃',
        subtitle: '第三幕 · 车马行栈 · 镖局坪',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
        visibleWhen: atStep(HUASHAN_Q04_QUEST_ID, 'investigate_changan_xishi'),
        effects: [
          { type: 'setFlag', flag: 'hs_q04_xishi_triggered', value: true },
          openScene('scene_hsq04_03', HUASHAN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq04_ferry_boat',
        label: '【气宗内门】登渭水孤舟 · 领受宁师叔传授混元掌',
        badge: '渭水传掌',
        subtitle: '第六幕 · 渭黄交汇渡口登舟',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_Q04_QUEST_ID, 'weishui_ferry_palm'),
        effects: [
          { type: 'setFlag', flag: 'hs_q04_ferry_triggered', value: true },
          openScene('scene_hsq04_06', HUASHAN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq04_midnight_raid',
        label: '【气宗内门】子夜奇袭赤沙水寨 · 掌裂重盾斩沙通海',
        badge: '混元破寨',
        subtitle: '第九幕 · 生死决战二流中品帮主沙通海',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        visibleWhen: atStep(HUASHAN_Q04_QUEST_ID, 'midnight_raid_chisha'),
        effects: [openScene('scene_hsq04_09', HUASHAN_Q04_QUEST_ID)],
      },
      {
        id: 'spot_hsq04_return_spring',
        label: '【气宗内门】渭水凯旋 · 向宁师叔禀明混元掌剑心得',
        badge: '焚寨凯旋',
        subtitle: '第十七幕 · 洗头盆清泉演剑院',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        visibleWhen: atStep(HUASHAN_Q04_QUEST_ID, 'return_zixia_spring'),
        effects: [
          { type: 'setFlag', flag: 'hs_q04_return_triggered', value: true },
          openScene('scene_hsq04_17', HUASHAN_Q04_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq04_start_npc',
        label: '请命追查渭水赤沙帮劫掠赈灾官粮一案',
        badge: '渭水惊澜',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
            HUASHAN_Q04_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q04_start_triggered', value: true },
          openScene('scene_hsq04_01', HUASHAN_Q04_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq04_return_npc',
        label: '禀报焚毁赤沙水寨、夺回京兆府赈粮经过',
        badge: '混元凯旋',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
            atStep(HUASHAN_Q04_QUEST_ID, 'return_zixia_spring'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q04_return_triggered', value: true },
          openScene('scene_hsq04_17', HUASHAN_Q04_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanQiHunyuanPalmQuest.scenes').then((m) => m.SCENES),
  },
]
