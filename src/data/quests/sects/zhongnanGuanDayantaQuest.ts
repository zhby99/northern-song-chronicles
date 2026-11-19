import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q09_QUEST_ID = 'QST-SECT-11-09'

export const ZHONGNAN_Q09_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus('QST-SECT-11-08', 'completed'),
    flag('zn_branch', 'eq', 'guguan'),
    qStatus(ZHONGNAN_Q09_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-1056', npcName: '刘处静' },
    { type: 'npcAlive', npcId: 'NPC-0695', npcName: '郝杏珠' },
    { type: 'npcAlive', npcId: 'NPC-0231', npcName: '狮吼子' },
    { type: 'npcAlive', npcId: 'NPC-0328', npcName: '白星焱' },
    { type: 'npcAlive', npcId: 'NPC-0327', npcName: '宋河麟' },
  ],
}

export const ZHONGNAN_Q09_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q09_QUEST_ID,
    title: '紫金丹劫 · 大雁除妖',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'changan',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（星宿狂狮护法 · 狮吼子）',
    recommendedNote:
      '二十二幕重阳古观 Lv.3 真传独当一面大戏！终南【道藏经阁与紫金丹院】忽发巨响，郝杏珠丹炉炸裂、长生子刘处静护经受创，星宿派「狂狮护法」狮吼子趁乱劫走《紫金丹经》！你星夜追凶至京兆府【慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺】，会合关中侠士白星焱、宋河麟清剿外围，一对一正面击退一流魔头狮吼子，夺回镇院丹经！',
    startHint:
      '晋升 Lv.3 古观真传后，前往【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院】（或寻刘处静、郝杏珠）查探丹院异变。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tao',
      spotId: 'zn_to_alchemy',
      customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
    },
    startCondition: ZHONGNAN_Q09_START_CONDITION,
    summary:
      '{reignYear}深秋，重阳古观【道藏经阁与紫金丹院】突发剧变！星宿派一流魔头「狂狮护法」【狮吼子】趁夜潜入丹院投毒引爆丹炉，【郝杏珠】险遭毒火吞噬，长生子【刘处静】为护弟子与经阁惨遭狮吼毒掌重创，镇院秘典《紫金丹经》亦被劫走！你既为古观真传，毅然独挑追凶重任，循此前西市密笺线索直奔【京兆府 · 慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺】。于塔顶会合仗义相助的【白星焱】与【宋河麟】截断贼人后路，你以《希夷剑法》与《劈空掌》一对一力克一流强敌狮吼子，夺回《紫金丹经》凯旋终南！',
    initialStepId: 'dayanta_pursue_lion',
    steps: {
      dayanta_pursue_lion: {
        id: 'dayanta_pursue_lion',
        title: '追凶大雁塔 · 力克狮吼子',
        objective:
          '丹院遇袭、刘师兄负伤！狮吼子已携《紫金丹经》逃往长安。请速赴【京兆府 · 慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺】，会合白星焱、宋河麟并一对一击退狮吼子夺回丹经！',
        nextHint: '前往【京兆府 · 慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺（ca_dayanta_west）】。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_dayanta',
          spotId: 'ca_dayanta_west',
          customLabel: '京兆府 · 慈恩寺大雁塔 · 绝顶佛龛 · 凭栏远眺',
        },
      },
      alchemy_return_scripture: {
        id: 'alchemy_return_scripture',
        title: '丹经完璧 · 归院疗伤',
        objective:
          '已在大雁塔顶击退狮吼子并夺回《紫金丹经》！请速返【终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院】，呈还丹经并照料刘处静与郝杏珠。',
        nextHint: '返回【道藏经阁与紫金丹院（zn_to_alchemy）】交还《紫金丹经》。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_alchemy',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_zn_q09_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        onceFlag: 'zn_q09_start_triggered',
        condition: ZHONGNAN_Q09_START_CONDITION,
        effects: [openScene('scene_zn_q09_01', ZHONGNAN_Q09_QUEST_ID)],
      },
      {
        id: 'trig_zn_q09_dayanta',
        regionId: 'changan',
        buildingId: 'ca_dayanta',
        spotId: 'ca_dayanta_west',
        onceFlag: 'zn_q09_dayanta_triggered',
        condition: atStep(ZHONGNAN_Q09_QUEST_ID, 'dayanta_pursue_lion'),
        effects: [openScene('scene_zn_q09_09', ZHONGNAN_Q09_QUEST_ID)],
      },
      {
        id: 'trig_zn_q09_return',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        onceFlag: 'zn_q09_return_triggered',
        condition: atStep(ZHONGNAN_Q09_QUEST_ID, 'alchemy_return_scripture'),
        effects: [openScene('scene_zn_q09_18', ZHONGNAN_Q09_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_zn_q09_start',
        label: '【丹院惊变】驰入道藏经阁与紫金丹院 · 查探丹炉炸裂之变',
        badge: '紫金丹劫',
        subtitle: '第一幕 · 道藏经阁与紫金丹院',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        visibleWhen: ZHONGNAN_Q09_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q09_start_triggered', value: true },
          openScene('scene_zn_q09_01', ZHONGNAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q09_dayanta',
        label: '【大雁除妖】登慈恩寺大雁塔绝顶 · 一对一决战狮吼子夺经',
        badge: '塔顶除妖',
        subtitle: '第九幕 · 绝顶佛龛 · 凭栏远眺',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_dayanta',
        spotId: 'ca_dayanta_west',
        visibleWhen: atStep(ZHONGNAN_Q09_QUEST_ID, 'dayanta_pursue_lion'),
        effects: [
          { type: 'setFlag', flag: 'zn_q09_dayanta_triggered', value: true },
          openScene('scene_zn_q09_09', ZHONGNAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_zn_q09_return',
        label: '【丹经归院】呈还《紫金丹经》 · 探望刘处静与郝杏珠',
        badge: '丹经完璧',
        subtitle: '第十八幕 · 道藏经阁与紫金丹院',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        visibleWhen: atStep(ZHONGNAN_Q09_QUEST_ID, 'alchemy_return_scripture'),
        effects: [
          { type: 'setFlag', flag: 'zn_q09_return_triggered', value: true },
          openScene('scene_zn_q09_18', ZHONGNAN_Q09_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_zn_q09_start',
        label: '驰援丹院 · 照料负伤的刘师兄并追查丹经失窃',
        badge: '紫金丹劫',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1056', 'NPC-0695'] },
            ZHONGNAN_Q09_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q09_start_triggered', value: true },
          openScene('scene_zn_q09_01', ZHONGNAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'act_zn_q09_dayanta',
        label: '会合白星焱、宋河麟 · 围截星宿狂狮护法狮吼子',
        badge: '大雁除妖',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0328', 'NPC-0327', 'NPC-0231'] },
            atStep(ZHONGNAN_Q09_QUEST_ID, 'dayanta_pursue_lion'),
          ],
        },
        effects: [openScene('scene_zn_q09_09', ZHONGNAN_Q09_QUEST_ID)],
      },
      {
        id: 'act_zn_q09_return',
        label: '呈还夺回的《紫金丹经》 · 禀报大雁塔除妖经过',
        badge: '丹经完璧',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-1056', 'NPC-0695'] },
            atStep(ZHONGNAN_Q09_QUEST_ID, 'alchemy_return_scripture'),
          ],
        },
        effects: [openScene('scene_zn_q09_18', ZHONGNAN_Q09_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./zhongnanGuanDayantaQuest.scenes').then((m) => m.SCENES),
  },
]
