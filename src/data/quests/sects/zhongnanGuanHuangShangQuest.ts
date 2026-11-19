import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q23_QUEST_ID = 'QST-SECT-11-23'

export const ZHONGNAN_Q23_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-22', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q23_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0133', npcName: '王重楼' },
    { type: 'npcAlive', npcId: 'NPC-0107', npcName: '黄裳' },
  ],
}

export const ZHONGNAN_Q23_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q23_QUEST_ID,
  title: '刺桐校经 · 万寿道藏',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'quanzhou',
  recommendedRealm: '一流中品 ～ 一流上品（重阳古观远征卷三）',
  maxOpponentRealm: '一流上品（波斯摩尼教邪徒首领 · 江南黑道巨寇）',
  recommendedNote:
    '二十八幕刺桐问道长卷：奉紫阳真人王重楼密谕，千里南下闽海【泉州府 · 泉州开元寺东西双塔】，于东塔中层回廊拜谒道藏真君黄裳，协力校刻《万寿道藏》孤本！岂料波斯摩尼教邪徒勾结江南黑道巨寇夜袭西塔，妄图焚毁经板、劫掠道家秘典。你挺剑独守【西塔绝顶佛龛】，连破波斯圣火邪徒与黑道巨寇，护得五千卷道藏无损；事后与黄裳彻夜纵论“阴阳互济、刚柔并生”的无上天道，为日后参透《先天功》与执掌北斗阵奠定通天根基！',
  startHint:
    '完成《延水悲歌 · 青涧铁血》后，前往【泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画】拜见黄裳前辈。',
  startLocation: {
    regionId: 'quanzhou',
    buildingId: 'qz_kaiyuan',
    spotId: 'qz_kaiyuan_east',
    customLabel: '泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
  },
  startCondition: ZHONGNAN_Q23_START_CONDITION,
  summary:
    '{reignYear}深冬，你千里南下闽海刺桐古港，于【泉州开元寺东西双塔 · 中层回廊】拜谒道藏真君【黄裳】，奉师命协力校勘《万寿道藏》五千余卷。校经未半，海外波斯摩尼教邪徒勾结江南黑道巨寇趁夜突袭双塔，企图劫掠经卷并加害黄裳。你于【绝顶佛龛】仗剑迎敌，连斩摩尼教使者与黑道巨寇，护得经板安然无恙。战后海风拂塔，你与黄裳彻夜长谈，由道藏典籍悟及阴阳互济、损有余而补不足之天道至理，武道心境豁然开朗，更获黄裳亲题道偈相赠。',
  initialStepId: 'meet_huangshang',
  steps: {
    meet_huangshang: {
      id: 'meet_huangshang',
      title: '南下刺桐 · 东塔校经',
      objective:
        '请前往【泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画】，持王重楼亲笔信拜谒隐世宗师黄裳，协力校刻《万寿道藏》。',
      nextHint: '前往【泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画（qz_kaiyuan_east）】点击「拜谒黄裳 · 协校《万寿道藏》」。',
      targetLocation: {
        regionId: 'quanzhou',
        buildingId: 'qz_kaiyuan',
        spotId: 'qz_kaiyuan_east',
        customLabel: '泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
      },
    },
    defend_west_tower: {
      id: 'defend_west_tower',
      title: '西塔夜警 · 剑退邪寇',
      objective:
        '波斯摩尼教邪徒与江南黑道巨寇已摸上西塔绝顶！请速赴【泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺】截杀来敌，保卫《万寿道藏》！',
      nextHint: '前往【泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺（qz_kaiyuan_west）】点击「独守西塔 · 击退摩尼邪徒与黑道巨寇」。',
      targetLocation: {
        regionId: 'quanzhou',
        buildingId: 'qz_kaiyuan',
        spotId: 'qz_kaiyuan_west',
        customLabel: '泉州府 · 泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺',
      },
    },
    yinyang_discourse: {
      id: 'yinyang_discourse',
      title: '灯下论道 · 阴阳互济',
      objective:
        '强敌已退，经板无恙！请返回【泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画】与黄裳前辈彻夜纵论阴阳天道。',
      nextHint: '返回【泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画（qz_kaiyuan_east）】点击「彻夜论道 · 参悟阴阳互济天道」。',
      targetLocation: {
        regionId: 'quanzhou',
        buildingId: 'qz_kaiyuan',
        spotId: 'qz_kaiyuan_east',
        customLabel: '泉州府 · 泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq23_start',
      regionId: 'quanzhou',
      buildingId: 'qz_kaiyuan',
      spotId: 'qz_kaiyuan_east',
      onceFlag: 'znq23_intro_triggered',
      condition: ZHONGNAN_Q23_START_CONDITION,
      effects: [openScene('scene_znq23_01', ZHONGNAN_Q23_QUEST_ID)],
    },
    {
      id: 'trig_znq23_west',
      regionId: 'quanzhou',
      buildingId: 'qz_kaiyuan',
      spotId: 'qz_kaiyuan_west',
      onceFlag: 'znq23_west_triggered',
      condition: atStep(ZHONGNAN_Q23_QUEST_ID, 'defend_west_tower'),
      effects: [openScene('scene_znq23_13', ZHONGNAN_Q23_QUEST_ID)],
    },
    {
      id: 'trig_znq23_discourse',
      regionId: 'quanzhou',
      buildingId: 'qz_kaiyuan',
      spotId: 'qz_kaiyuan_east',
      onceFlag: 'znq23_discourse_triggered',
      condition: atStep(ZHONGNAN_Q23_QUEST_ID, 'yinyang_discourse'),
      effects: [openScene('scene_znq23_21', ZHONGNAN_Q23_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq23_start',
      label: '拜谒道藏真君黄裳 · 协校《万寿道藏》',
      badge: '刺桐校经',
      subtitle: '泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
      tone: 'jade',
      regionId: 'quanzhou',
      buildingId: 'qz_kaiyuan',
      spotId: 'qz_kaiyuan_east',
      visibleWhen: ZHONGNAN_Q23_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq23_intro_triggered', value: true },
        openScene('scene_znq23_01', ZHONGNAN_Q23_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq23_west',
      label: '登临西塔绝顶 · 截击波斯摩尼教邪徒与黑道巨寇',
      badge: '护经破邪',
      subtitle: '泉州开元寺东西双塔 · 绝顶佛龛 · 凭栏远眺',
      tone: 'danger',
      regionId: 'quanzhou',
      buildingId: 'qz_kaiyuan',
      spotId: 'qz_kaiyuan_west',
      visibleWhen: atStep(ZHONGNAN_Q23_QUEST_ID, 'defend_west_tower'),
      effects: [
        { type: 'setFlag', flag: 'znq23_west_triggered', value: true },
        openScene('scene_znq23_13', ZHONGNAN_Q23_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq23_discourse',
      label: '重返中层回廊 · 与黄裳彻夜纵论阴阳天道',
      badge: '阴阳天道',
      subtitle: '泉州开元寺东西双塔 · 中层回廊 · 浮雕壁画',
      tone: 'gold',
      regionId: 'quanzhou',
      buildingId: 'qz_kaiyuan',
      spotId: 'qz_kaiyuan_east',
      visibleWhen: atStep(ZHONGNAN_Q23_QUEST_ID, 'yinyang_discourse'),
      effects: [
        { type: 'setFlag', flag: 'znq23_discourse_triggered', value: true },
        openScene('scene_znq23_21', ZHONGNAN_Q23_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq23_npc_start',
      label: '呈递王重楼手书 · 协力校刻《万寿道藏》',
      badge: '万寿道藏',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0107', 'NPC-0133'] },
          ZHONGNAN_Q23_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq23_intro_triggered', value: true },
        openScene('scene_znq23_01', ZHONGNAN_Q23_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanGuanHuangShangQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q23_QUESTS: QuestDefinition[] = [ZHONGNAN_Q23_QUEST]
