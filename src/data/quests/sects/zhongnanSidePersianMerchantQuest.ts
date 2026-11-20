import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE05_QUEST_ID = 'QST-SECT-11-SIDE-05'

export const ZHONGNAN_SIDE05_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus(ZHONGNAN_SIDE05_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0705', npcName: '乌承海' },
  ],
}

export const zhongnanSidePersianMerchantQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE05_QUEST_ID,
  title: '西市迷香 · 波斯胡商案',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'changan',
  recommendedRealm: '三流上品 ～ 二流中品',
  maxOpponentRealm: '三流中品 × 2（星宿乌承海及其毒功同伙 车轮连战）',
  recommendedNote:
    '终南隐宗二阶西市探案支线（全十二幕）。长安西市胡商坊频发迷香劫宝案，波斯大商队珍藏的苏合辟毒香与明珠被窃。你在西市偶遇同在追查此事的华山剑宗高手封不弃，循着异香蛛丝马迹锁定西市废窖，孤身夜捣暗窖车轮连战击溃星宿派恶徒乌承海及其同伙、追回全部赃物，获胡商厚赠纹银与辟毒良药。',
  startHint:
    '晋升终南隐宗二阶后，前往【京兆府 · 西市胡商坊（ca_xishi_main）】偶遇封不弃即可触发。',
  startLocation: {
    regionId: 'changan',
    buildingId: 'ca_xishi',
    spotId: 'ca_xishi_main',
    customLabel: '京兆府 · 西市胡商坊',
  },
  startCondition: ZHONGNAN_SIDE05_START_CONDITION,
  summary:
    '{reignYear}夏末，长安【西市胡商坊（ca_xishi_main）】连发奇案，波斯大商队夜宿胡栈竟遭剧烈迷香放倒，西域苏合辟毒香与数箱明珠不翼而飞。你下山采办时偶遇华山剑宗名宿封不弃，二人识破此迷香乃西域星宿派毒术所制，顺藤摸瓜查出贼窝藏于西市荒废酒窖。入夜后由封不弃在外封锁巷口，你孤身破门直捣暗窖，车轮连战 激战星宿恶徒乌承海及其同伙，一举歼破毒阵、追回全部失物，获波斯胡商重金酬谢与西域辟毒良药。',
  initialStepId: 'raid_xishi_cellar',
  steps: {
    raid_xishi_cellar: {
      id: 'raid_xishi_cellar',
      title: '夜捣暗窖 · 车轮连战 破星宿',
      objective:
        '已锁定星宿贼人藏身于【京兆府 · 西市胡商坊（ca_xishi_main）】后的荒废酒窖！封不弃已在巷口布防，请速入暗窖车轮连战击溃乌承海及其同伙，夺回波斯商队失物。',
      nextHint:
        '在【京兆府 · 西市胡商坊（ca_xishi_main）】点击「夜捣西市暗窖，车轮连战 破星宿乌承海及其同伙」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        customLabel: '京兆府 · 西市胡商坊',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side05_start',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      onceFlag: 'zn_side05_start_triggered',
      condition: ZHONGNAN_SIDE05_START_CONDITION,
      effects: [openScene('scene_zns05_01', ZHONGNAN_SIDE05_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side05_start',
      label: '【终南风物】会封不弃勘查波斯胡商迷香失窃案',
      badge: '西市迷香',
      subtitle: '西市胡商坊',
      tone: 'jade',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      visibleWhen: ZHONGNAN_SIDE05_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side05_start_triggered', value: true },
        openScene('scene_zns05_01', ZHONGNAN_SIDE05_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side05_raid',
      label: '【终南风物】夜捣西市暗窖，车轮连战 破星宿乌承海及其同伙',
      badge: '暗窖破毒',
      subtitle: '西市胡商坊',
      tone: 'danger',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_main',
      visibleWhen: atStep(ZHONGNAN_SIDE05_QUEST_ID, 'raid_xishi_cellar'),
      effects: [openScene('scene_zns05_06', ZHONGNAN_SIDE05_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side05_feng',
      label: '与封不弃商议追查西市波斯胡商失窃案',
      badge: '西市迷香',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
          ZHONGNAN_SIDE05_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side05_start_triggered', value: true },
        openScene('scene_zns05_01', ZHONGNAN_SIDE05_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSidePersianMerchantQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE05_QUESTS: QuestDefinition[] = [zhongnanSidePersianMerchantQuest]
