import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, toast, openScene } from '../../../engine/quest/dsl'

export const XINGXIU_ENTRY_QUEST_ID = 'QST-SECT-19-ENTRY'

export const ACTOR_SUBANXIA_ID = 'ACT-XX-SUBANXIA'

export const ACTOR_CHUCHENZI_KUNLUN_ID = 'ACT-XX-CHUCHENZI-KL'

const XINGXIU_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect' },
    flag('shaolin_novice_state', 'eq', 'none'),
    qStatus(XINGXIU_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const XINGXIU_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: XINGXIU_ENTRY_QUEST_ID,
    title: '紫烟迷市 · 毒泉求生',
    category: 'sect_entry',
    factionId: 'SECT-19',
    regionId: 'yanan',
    recommendedRealm: '不入流（专为零内功、零武学开局设计的二十幕体验长卷）',
    maxOpponentRealm: '不入流（剧情试炼点到为止，苏半夏暗助兜底零卡关）',
    recommendedNote:
      '无门无派时踏入【延安府 · 塞上番马黑市】自动开启。全程无需任何初始内功武学，由智退恶徒染奇毒入彀，历昆仑丹炉冲脉悟《星宿腐毒行气诀》、向四师兄出尘子求授《毒蒺藜散手》，与患难师姐苏半夏及同期少年小石子结下生死羁绊，终返延安面见丁春秋拜入星宿派。',
    startHint:
      '无门无派时前往【延安府】，点击进入特殊建筑【塞上番马黑市】（或寻出尘子）即可触发二十幕星宿入门长卷。',
    startLocation: {
      regionId: 'yanan',
      buildingId: 'ya_blackmkt',
      customLabel: '延安府 · 塞上番马黑市（步入即触发）',
    },
    startCondition: XINGXIU_START_CONDITION,
    summary:
      '{reignYear}塞上番马黑市紫烟弥漫，你偶遇采药孤女【苏半夏】与延州短工少年【小石子】，无内功之下急智掀摊扬石灰护她脱险，却被星宿袖箭擦伤染上奇毒【三日腐心散】。为求一线生机，你以妙语哄得星宿四师兄【出尘子】赐下压毒丸，随押药驼队西赴昆仑山【星宿海毒泉外脉】。在丝竹颂仙、人命如草的邪窟之中，你与苏半夏互为微光：丹炉炸裂生死一线间逆引毒气悟得《星宿腐毒行气诀》，腐瓮惊魂前考验寸心良知，向出尘子献礼讨得《毒蒺藜散手》挫败恶霸师兄，更在冰蚕寒石窟彻夜替替你挡箭的苏半夏逼毒守夜。最终识破大师兄【摘星子】锦盒掉包毒计，重返延安番坊面见宗师【丁春秋】，巧舌献香、护花脱籍，披上星宿紫衣踏入波澜壮阔的大宋江湖！',
    initialStepId: 'seek_chuchenzi_yanan',
    steps: {
      seek_chuchenzi_yanan: {
        id: 'seek_chuchenzi_yanan',
        title: '腐心蚀脉 · 求药矮道',
        objective:
          '左腕已染星宿奇毒【三日腐心散】，金银花仅能暂封两时辰。速往延安塞上番马黑市西侧【车马行栈 · 镖局坪】寻星宿派四师兄【出尘子】，投其所好求取压毒续命丸！',
        nextHint:
          '在延安府【塞上番马黑市】内点击西侧【车马行栈 · 镖局坪】，与【出尘子】对话。',
        targetLocation: {
          regionId: 'yanan',
          buildingId: 'ya_blackmkt',
          spotId: 'ya_blackmkt_west',
        },
      },
      report_herb_pavilion: {
        id: 'report_herb_pavilion',
        title: '初入毒海 · 丹庐试药',
        objective:
          '已随押药驼队抵达昆仑山【星宿海毒泉外脉】。请依大师兄摘星子严令，前往东侧岩壁下的【星宿百草炼毒庐】报到领差，寻机化解体内余毒。',
        nextHint: '在【星宿海毒泉外脉】内点击【星宿百草炼毒庐】触发试药剧情。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
      },
      gather_ice_dew: {
        id: 'gather_ice_dew',
        title: '冰蚕寒窟 · 同采寒露',
        objective:
          '已修成《星宿腐毒行气诀》第一缕真气并熬过腐瓮风波。请前往昆仑毒谷西侧【雪山冰蚕寒石窟】，与司药师姐【苏半夏】一同刮取冰蚕寒露。',
        nextHint: '在【星宿海毒泉外脉】内点击【雪山冰蚕寒石窟】。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_cave',
        },
      },
      learn_dart_from_chuchenzi: {
        id: 'learn_dart_from_chuchenzi',
        title: '战前筹谋 · 拜求毒技',
        objective:
          '外门恶霸【乌承山】强索寒露并约战毒泉沼！你初通内息尚缺克敌招式，请速赴【星宿百草炼毒庐】寻四师兄【出尘子】献上好处或美言，求授一招实用防身毒技！',
        nextHint:
          '在【星宿海毒泉外脉】点击【星宿百草炼毒庐】，与驻谷四师兄【出尘子】对话（或点击景点行动）。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_pavilion',
        },
      },
      duel_at_poison_marsh: {
        id: 'duel_at_poison_marsh',
        title: '紫雾毒沼 · 亮锋护花',
        objective:
          '已习得四师兄出尘子亲授《毒蒺藜散手》！请前往【紫雾五彩毒泉沼】石坪，迎战恶师兄【乌承山】，护住苏半夏与冰蚕寒露！',
        nextHint: '在【星宿海毒泉外脉】点击正中【紫雾五彩毒泉沼】发起约战。',
        targetLocation: {
          regionId: 'kunlun',
          buildingId: 'kl_poison',
          spotId: 'kl_ps_marsh',
        },
      },
      audience_ding_chunqiu: {
        id: 'audience_ding_chunqiu',
        title: '重返延安 · 面圣献香',
        objective:
          '已与苏半夏暗换紫檀锦盒破去摘星子毒计，随队重返【延安府 · 塞上番马黑市】。请步入【番坊正市 · 奇货堂】，向掌门星宿老仙【丁春秋】呈献引虫香！',
        nextHint: '在延安府【塞上番马黑市 · 番坊正市奇货堂】与掌门【丁春秋】对话。',
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
        effects: [openScene('scene_xx_01_purple_smoke_market', 'QST-SECT-19-ENTRY')],
      },
      // 2) 若第 6 幕选“先看清毒谷地形”，点击进入【星宿百草炼毒庐】自动衔接第 7 幕
      {
        id: 'trig_xx_enter_herb_pavilion_step2',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        condition: atStep(XINGXIU_ENTRY_QUEST_ID, 'report_herb_pavilion'),
        effects: [openScene('scene_xx_07_herb_pavilion_pact', 'QST-SECT-19-ENTRY')],
      },
      // 3) 若第 10 幕选“自行前往寒石窟”，点击进入【雪山冰蚕寒石窟】自动衔接第 11 幕
      {
        id: 'trig_xx_enter_ice_cave_step3',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_cave',
        condition: atStep(XINGXIU_ENTRY_QUEST_ID, 'gather_ice_dew'),
        effects: [openScene('scene_xx_11_ice_silkworm_cave', 'QST-SECT-19-ENTRY')],
      },
    ],

    spotActions: [
      // 景点级交互保障：在【星宿百草炼毒庐】随时可推进试药或拜访出尘子学《毒蒺藜散手》
      {
        id: 'spot_xx_report_pavilion',
        label: '入百草炼毒庐领差试药（会合苏半夏）',
        badge: '星宿求生',
        subtitle: '第七幕 · 百草丹庐暗授方',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'report_herb_pavilion'),
        effects: [openScene('scene_xx_07_herb_pavilion_pact', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_bribe_chuchenzi',
        label: '入丹庐偏房拜见四师兄出尘子 · 求授防身毒技',
        badge: '战前求招',
        subtitle: '第十三幕 · 碎银彩虹换《毒蒺藜散手》',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_pavilion',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'learn_dart_from_chuchenzi'),
        effects: [openScene('scene_xx_13_bribe_chuchenzi_dart', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_gather_ice_dew',
        label: '入冰蚕寒石窟与苏半夏同采寒露',
        badge: '寒窟诉愿',
        subtitle: '第十一幕 · 冰蚕寒窟诉江南',
        tone: 'gold',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_cave',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'gather_ice_dew'),
        effects: [openScene('scene_xx_11_ice_silkworm_cave', 'QST-SECT-19-ENTRY')],
      },
      {
        id: 'spot_xx_marsh_duel',
        label: '踏上毒泉石坪 · 迎战恶师兄乌承山！',
        badge: '毒沼亮锋',
        subtitle: '第十四幕 · 运使《毒蒺藜散手》护住苏半夏',
        tone: 'danger',
        regionId: 'kunlun',
        buildingId: 'kl_poison',
        spotId: 'kl_ps_marsh',
        visibleWhen: atStep(XINGXIU_ENTRY_QUEST_ID, 'duel_at_poison_marsh'),
        effects: [openScene('scene_xx_14_marsh_duel', 'QST-SECT-19-ENTRY')],
      },
    ],

    npcActions: [
      // 1) 手动开启兜底：若玩家直接找到出尘子/摘星子/丁春秋亦可开启第 1 幕
      {
        id: 'act_xx_manual_start',
        label: '探访番市迷香 · 偶遇采药孤女（开启星宿入门二十幕）',
        badge: '星宿机缘',
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
          openScene('scene_xx_01_purple_smoke_market', 'QST-SECT-19-ENTRY'),
        ],
      },

      // 2) 第 4 幕：在延安车马行栈找四师兄出尘子求取压毒丸
      {
        id: 'act_xx_seek_chuchenzi_pill',
        label: '奉承四师兄出尘子 · 求取腐心散压毒灵丸',
        badge: '入彀求生',
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
        effects: [openScene('scene_xx_04_flatter_chuchenzi', 'QST-SECT-19-ENTRY')],
      },

      // 3) 防卡死护航：若玩家在昆仑步骤期间意外离开昆仑返回了延安，可在出尘子处乘押药驼队回昆仑毒谷
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
                atStep(XINGXIU_ENTRY_QUEST_ID, 'learn_dart_from_chuchenzi'),
                atStep(XINGXIU_ENTRY_QUEST_ID, 'duel_at_poison_marsh'),
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

      // 4) 第 13 幕：在昆仑丹庐找动态驻谷的四师兄出尘子求授《毒蒺藜散手》
      {
        id: 'act_xx_kunlun_chuchenzi_dart',
        label: '献礼美言哄四师兄 · 求授《毒蒺藜散手》',
        badge: '求授毒招',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [ACTOR_CHUCHENZI_KUNLUN_ID] },
            atStep(XINGXIU_ENTRY_QUEST_ID, 'learn_dart_from_chuchenzi'),
          ],
        },
        effects: [openScene('scene_xx_13_bribe_chuchenzi_dart', 'QST-SECT-19-ENTRY')],
      },

      // 5) 第 19 幕：重返延安奇货堂找掌门丁春秋献香拜师
      {
        id: 'act_xx_audience_ding_chunqiu',
        label: '呈献紫檀引虫香盒 · 颂仙拜入星宿门墙',
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
        effects: [openScene('scene_xx_19_ding_chunqiu_audience', 'QST-SECT-19-ENTRY')],
      },

      // 6) 入门后温情回访：在昆仑冰蚕寒石窟与苏半夏品雪莲茶叙旧恢复状态
      {
        id: 'act_xx_reunion_subanxia_tea',
        label: '轻叩暗号 · 与苏半夏共饮雪莲冰泉茶叙旧',
        badge: '患难红颜',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', dynamicActorIds: [ACTOR_SUBANXIA_ID] },
            qStatus(XINGXIU_ENTRY_QUEST_ID, 'completed'),
          ],
        },
        effects: [openScene('scene_xx_reunion_subanxia', 'QST-SECT-19-ENTRY')],
      },
    ],
    loadScenes: () => import('./xingxiuEntryQuest.scenes').then((m) => m.SCENES),
  },
]
