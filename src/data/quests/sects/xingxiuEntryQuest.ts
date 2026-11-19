import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, toast, openScene } from '../../../engine/quest/dsl'

export const XINGXIU_ENTRY_QUEST_ID = 'QST-SECT-19-ENTRY'

export const ACTOR_CHUCHENZI_KUNLUN_ID = 'ACT-XX-CHUCHENZI-KL'

const XINGXIU_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('xx_permanently_rejected', 'falsy'),
    qStatus('QST-SECT-33-YONGZHOU-NANMAN', 'not_started'),
    qStatus('QST-SECT-33-YONGZHOU-NANMAN', 'not_completed'),
    { type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' },
    { type: 'npcAlive', npcId: 'NPC-0181', npcName: '摘星子' },
    qStatus(XINGXIU_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const XINGXIU_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: XINGXIU_ENTRY_QUEST_ID,
    title: '星宿紫烟 · 投名血契',
    category: 'sect_entry',
    factionId: 'SECT-19',
    regionId: 'yanan',
    recommendedRealm: '不入流 ～ 三流下品（邪宗恶人线：零武学开局，须亲手杀人立投名状）',
    maxOpponentRealm: '不入流（内斗毒杀与下药暗算正道侠士，胜后方能晋阶）',
    recommendedNote:
      '十六幕星宿邪宗恶人长卷：延安黑市若不肯落井下石即永久无缘星宿；入彀后随驼队赴昆仑毒海活人试药破零习武、寒窟借刀杀人、毒沼踩死恶师兄，更须领血令返延安下药暗算并格杀一名正道侠士割首献功！最终于奇货堂面见丁春秋，四选一零提示问心答错即永久逐出。',
    startHint:
      '无门无派时前往【延安府】，点击进入【塞上番马黑市】（或寻四师兄出尘子）即可开启十六幕星宿邪宗入门长卷。',
    startLocation: {
      regionId: 'yanan',
      buildingId: 'ya_blackmkt',
      spotId: 'ya_blackmkt_main',
      customLabel: '延安府 · 塞上番马黑市（步入即触发）',
    },
    startCondition: XINGXIU_START_CONDITION,
    summary:
      '{reignYear}塞上番马黑市紫烟弥漫，星宿派四师兄【出尘子】正逼索西域毒草。你见利忘义、主动递刀拦下逃跑商贩献草立功（若不肯助纣为虐转身离去，则此生永绝星宿）；吞下「三日腐心丸」学唱《星宿颂》后，随押药驼队西赴昆仑【星宿海毒泉外脉】。在丝竹吹捧、人命如草的邪窟中，你于活人丹炉逆引毒气破零习得《星宿腐毒行气诀》，寒窟撒粉借刀杀人，毒囊贿师换得《毒蒺藜散手》，并于毒沼一脚踩碎师兄乌承山咽喉上位。随后接大师兄【摘星子】血令重返延安，下药暗算并亲手格杀关中正道侠士【赵清风】割首为投名状！最终在奇货堂丝竹震天中面见【丁春秋】，答过零提示问心，获授《五毒砂掌》并披上星宿紫衣！',
    initialStepId: 'seek_chuchenzi_yanan',
    steps: {
      seek_chuchenzi_yanan: {
        id: 'seek_chuchenzi_yanan',
        title: '黑市递刀 · 吞丸入彀',
        objective:
          '你已在延安黑市主动拦下胡商、献上毒草投诚。请往黑市西侧【车马行栈 · 镖局坪】寻星宿四师兄【出尘子】，吞下「三日腐心丸」并学唱《星宿颂》领牌西行！',
        nextHint: '在延安府【塞上番马黑市】点击西侧【车马行栈 · 镖局坪】，与【出尘子】对话。',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_west',
        },
      },
      report_herb_pavilion: {
        id: 'report_herb_pavilion',
        title: '毒泉丹炉 · 活人试药',
        objective:
          '已随押药驼队抵达昆仑【星宿海毒泉外脉】，见识大师兄摘星子把废柴踹入毒沼的死规。请前往【星宿百草炼毒庐】在活人丹炉前强纳紫烟毒气，破零习武！',
        nextHint: '在【星宿海毒泉外脉】点击【星宿百草炼毒庐】触发丹炉试药。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
      },
      gather_ice_dew: {
        id: 'gather_ice_dew',
        title: '冰蚕寒窟 · 借刀杀人',
        objective:
          '丹炉逆引毒气已成《星宿腐毒行气诀》。请前往西侧【雪山冰蚕寒石窟】采掘冰蚕毒露，并提防外门恶师兄乌承山的暗算！',
        nextHint: '在【星宿海毒泉外脉】点击【雪山冰蚕寒石窟】。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_cave',
        },
      },
      bribe_and_duel_marsh: {
        id: 'bribe_and_duel_marsh',
        title: '贿师换招 · 毒沼踩尸',
        objective:
          '寒窟已借刀除掉眼线并搜得毒囊！请先赴【星宿百草炼毒庐】将毒囊贿赂驻谷四师兄【出尘子】换取《毒蒺藜散手》，再到【紫雾五彩毒泉沼】踩死恶师兄乌承山！',
        nextHint: '先在【星宿百草炼毒庐】找【出尘子】换招，再赴正中【紫雾五彩毒泉沼】决战乌承山。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_marsh',
        },
      },
      hunt_orthodox_yanan: {
        id: 'hunt_orthodox_yanan',
        title: '血令追杀 · 投名血契',
        objective:
          '踩死乌承山后，大师兄摘星子丢下血令：须返【延安府 · 塞上番马黑市】外围，下药暗算并亲手格杀正道侠士【赵清风】，提其首级归来方准面见丁老仙！',
        nextHint: '返回延安府【塞上番马黑市】西侧【车马行栈 · 镖局坪】寻踪暗算关中侠士赵清风。',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_west',
        },
      },
      audience_ding_chunqiu: {
        id: 'audience_ding_chunqiu',
        title: '奇货献首 · 问心紫衣',
        objective:
          '正道侠士赵清风已死于你手，首级与腰牌封入石灰盒中！请步入延安【番坊正市 · 奇货堂】，面见星宿老仙【丁春秋】献首颂德，答过问心即可披上星宿紫衣！',
        nextHint: '在延安府【塞上番马黑市 · 番坊正市奇货堂】与掌门【丁春秋】对话（零提示问心答错永绝山门）。',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_main',
        },
      },
    },

    locationTriggers: [
      // 1) 无门无派首次踏入延安府【塞上番马黑市】自动开启第 1 幕
      {
        id: 'trig_xx_enter_yanan_blackmkt',
        regionId: 'yanan',
        buildingId: 'ya_blackmkt',
        onceFlag: 'xingxiu_market_triggered',
        condition: XINGXIU_START_CONDITION,
        effects: [openScene('scene_xx_01_black_market_betrayal', 'QST-SECT-19-ENTRY')],
      },
      // 2) 抵达昆仑毒谷【星宿百草炼毒庐】自动衔接第 4 幕丹炉试药
      {
        id: 'trig_xx_enter_herb_pavilion',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        condition: atStep(XINGXIU_ENTRY_QUEST_ID, 'report_herb_pavilion'),
        effects: [openScene('scene_xx_04_poison_furnace', 'QST-SECT-19-ENTRY')],
      },
      // 3) 抵达【雪山冰蚕寒石窟】自动衔接第 5 幕寒窟借刀杀人
      {
        id: 'trig_xx_enter_ice_cave',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_cave',
        condition: atStep(XINGXIU_ENTRY_QUEST_ID, 'gather_ice_dew'),
        effects: [openScene('scene_xx_05_ice_cave_trap', 'QST-SECT-19-ENTRY')],
      },
    ],

    spotActions: [
      {
        id: 'spot_xx_poison_furnace',
        label: '入百草炼毒庐 · 丹炉活人试药冲脉',
        badge: '活人试毒',
        subtitle: '第四幕 · 逆引紫烟悟《星宿腐毒行气诀》',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'report_herb_pavilion'),
        effects: [openScene('scene_xx_04_poison_furnace', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_ice_cave_trap',
        label: '入冰蚕寒石窟 · 采露反算恶师兄',
        badge: '借刀杀人',
        subtitle: '第五幕 · 毒粉引蚕夺毒囊',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_cave',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'gather_ice_dew'),
        effects: [openScene('scene_xx_05_ice_cave_trap', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_bribe_chuchenzi',
        label: '入丹庐偏房 · 献毒囊贿赂出尘子换暗器',
        badge: '贿师换招',
        subtitle: '第六幕 · 换取《毒蒺藜散手》',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(XINGXIU_ENTRY_QUEST_ID, 'bribe_and_duel_marsh'),
            flag('xx_learned_dart', 'falsy'),
          ],
        },
        effects: [openScene('scene_xx_06_bribe_chuchenzi', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_marsh_duel',
        label: '踏上毒泉石坪 · 决战并踩死恶师兄乌承山！',
        badge: '踩尸上位',
        subtitle: '第七幕 · 毒沼死斗',
        tone: 'danger',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_marsh',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'bribe_and_duel_marsh'),
        effects: [openScene('scene_xx_07_marsh_duel', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_hunt_orthodox',
        label: '暗桩寻踪 · 下药诱杀关中侠士赵清风',
        badge: '投名血契',
        subtitle: '第九幕 · 延安黑市外围截杀正道',
        tone: 'danger',
        regionId: 'yanan',
        buildingId: 'ya_blackmkt',
        spotId: 'ya_blackmkt_west',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'hunt_orthodox_yanan'),
        effects: [openScene('scene_xx_09_ambush_orthodox', 'QST-SECT-19-ENTRY')],
      },
    ],

    npcActions: [
      {
        id: 'act_xx_manual_start',
        label: '旁观番市索药 · 择定是否递刀投靠星宿（开启入门十六幕）',
        badge: '邪宗机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0262', 'NPC-0181', 'NPC-0122'] },
            XINGXIU_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'xingxiu_market_triggered', value: true },
          openScene('scene_xx_01_black_market_betrayal', 'QST-SECT-19-ENTRY'),
        ],
      },
      {
        id: 'act_xx_seek_chuchenzi_pill',
        label: '向四师兄出尘子领丸 · 学唱《星宿颂》西赴昆仑',
        badge: '吞丸入彀',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0262'] },
            atStep(XINGXIU_ENTRY_QUEST_ID, 'seek_chuchenzi_yanan'),
          ],
        },
        effects: [openScene('scene_xx_02_swallow_pill_chant', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'act_xx_caravan_return_kunlun',
        label: '搭乘星宿押药驼队 · 重返昆仑星宿海毒泉外脉',
        badge: '驼队护送',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0262'] },
            {
              type: 'any',
              conditions: [
                atStep(XINGXIU_ENTRY_QUEST_ID, 'report_herb_pavilion'),
                atStep(XINGXIU_ENTRY_QUEST_ID, 'gather_ice_dew'),
                atStep(XINGXIU_ENTRY_QUEST_ID, 'bribe_and_duel_marsh'),
              ],
            },
          ],
        },
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'kunlun',
            buildingId: 'kl_poison',
            spotId: 'kl_ps_pavilion',
          },
          toast('已随星宿押药驼队重返【昆仑山 · 星宿海毒泉外脉】！', 'talk'),
        ],
      },
      {
        id: 'act_xx_kunlun_chuchenzi_bribe',
        label: '献毒囊贿赂四师兄 · 换取《毒蒺藜散手》',
        badge: '贿师换招',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [ACTOR_CHUCHENZI_KUNLUN_ID] },
            atStep(XINGXIU_ENTRY_QUEST_ID, 'bribe_and_duel_marsh'),
            flag('xx_learned_dart', 'falsy'),
          ],
        },
        effects: [openScene('scene_xx_06_bribe_chuchenzi', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'act_xx_audience_ding_chunqiu',
        label: '呈献正道侠士首级 · 面见丁春秋颂仙拜师',
        badge: '老仙法驾',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0122', 'NPC-0181'] },
            atStep(XINGXIU_ENTRY_QUEST_ID, 'audience_ding_chunqiu'),
          ],
        },
        effects: [openScene('scene_xx_12_return_snatch_credit', 'QST-SECT-19-ENTRY')],
      },
    ],
    loadScenes: () => import('./xingxiuEntryQuest.scenes').then((m) => m.SCENES),
  },
]
