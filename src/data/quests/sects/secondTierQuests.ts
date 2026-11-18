import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const SECOND_TIER_QUESTS: QuestDefinition[] = [
  {
    id: 'QST-SECT-18-TOUMINGZHUANG',
    title: '太行聚义 · 纳投名状',
    category: 'sect_entry',
    factionId: 'SECT-18',
    regionId: 'taihang',
    recommendedRealm: '三流中品',
    maxOpponentRealm: '三流下品',
    recommendedNote: '需生死劫杀一名大宋官吏（最弱官吏约三流下品），建议至少【三流中品】再行领命',
    startHint: '前往太行山【聚义总寨】或寻任意绿林盟豪杰，在门派事务中请领「纳投名状」试炼。',
    startLocation: {
      regionId: 'taihang',
      buildingId: 'th_hall',
      customLabel: '太行山 · 聚义总寨',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'notInAnySect' },
        { type: 'flag', flag: 'toumingzhuang_completed', op: 'falsy', label: '尚未完成太行投名状' },
      ],
    },
    summary:
      '欲入太行/京东绿林盟聚义堂，须按草莽铁律立下「投名状」——拦路劫杀一名大宋朝廷命官。此举将令少侠名列大宋官府海捕黑名单，一旦踏入东京开封府必遭御猫展昭锁拿问斩！',
    initialStepId: 'rob_official',
    steps: {
      rob_official: {
        id: 'rob_official',
        title: '劫道朝廷命官',
        objective:
          '寻访任意大宋朝廷官员（中枢/封疆文臣、边塞将帅或开封府六扇门官员），在人物交互中发起【劫道纳投名状（生死战）】并获胜。',
        nextHint: '寻一名大宋官吏（三流下品及以上），在人物交互中发起【劫道纳投名状】生死战并取胜',
      },
      return_to_join: {
        id: 'return_to_join',
        title: '持状投奔绿林盟',
        objective:
          '已成功劫掠大宋命官立下投名状（已列入大宋朝廷黑名单，切忌踏入东京开封府！），前往太行山或寻任意绿林盟豪杰即可正式拜入【太行/京东绿林盟】。',
        nextHint: '前往太行山·聚义总寨呈递投名状，正式拜入绿林盟（切忌踏入开封府！）',
        targetLocation: {
          regionId: 'taihang',
          buildingId: 'th_hall',
          customLabel: '太行山 · 聚义总寨',
        },
      },
    },
    npcActions: [
      {
        id: 'act_accept_toumingzhuang_scene',
        label: '请领「纳投名状」试炼',
        badge: '绿林入门',
        tone: 'danger',
        showInBottomBar: false,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-18'] },
            qStatus('QST-SECT-18-TOUMINGZHUANG', 'not_started'),
            flag('toumingzhuang_completed', 'falsy'),
            { type: 'notInAnySect' },
          ],
        },
        effects: [
          openScene('scene_toumingzhuang_intro', 'QST-SECT-18-TOUMINGZHUANG'),
        ],
      },
      {
        id: 'act_rob_song_official_scene',
        label: '劫道纳投名状（生死战）',
        badge: '投名状',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              specialGroup: 'song_official_for_robbery',
            },
            {
              type: 'any',
              conditions: [
                atStep('QST-SECT-18-TOUMINGZHUANG', 'rob_official'),
                flag('toumingzhuang_state', 'eq', 'accepted'),
              ],
            },
          ],
        },
        effects: [
          openScene('scene_rob_official_ambush', 'QST-SECT-18-TOUMINGZHUANG'),
        ],
      },
    ],
    locationTriggers: [
      {
        id: 'trig_kaifeng_zhan_zhao_arrest',
        regionId: 'bianliang',
        triggerOnPassThrough: true,
        condition: flag('song_court_blacklisted', 'truthy'),
        effects: [
          {
            type: 'branch',
            condition: {
              type: 'all',
              conditions: [
                flag('dm_stole_hebei_defense_map', 'truthy'),
                flag('toumingzhuang_completed', 'falsy'),
              ],
            },
            thenEffects: [
              openScene('scene_zhan_zhao_daming_map_arrest', 'QST-SECT-18-TOUMINGZHUANG'),
            ],
            elseEffects: [
              openScene('scene_zhan_zhao_kaifeng_arrest', 'QST-SECT-18-TOUMINGZHUANG'),
            ],
          },
        ],
      },
    ],
    loadScenes: () => import('./secondTierQuests.scenes').then((m) => m.SCENES_BY_QUEST['QST-SECT-18-TOUMINGZHUANG']),
  },
  {
    id: 'QST-SECT-16-REFERRAL',
    title: '运河衣钵 · 漕帮引荐帖',
    category: 'sect_entry',
    factionId: 'SECT-16',
    regionId: 'hangzhou',
    recommendedRealm: '三流下品',
    recommendedNote: '无强制死斗，三流下品即可游历办理（备足 40 两纹银：拜师 20 两 + 贿赂 20 两）',
    startHint: '前往扬州府【江淮漕帮总舵】寻帮众打听入门规矩，或径直赴杭州拜入钱塘怒潮帮。',
    startLocation: {
      regionId: 'yangzhou',
      buildingId: 'yz_chaoguan',
      customLabel: '扬州府 · 江淮漕帮总舵',
    },
    startCondition: {
      type: 'all',
      conditions: [
        {
          type: 'not',
          condition: { type: 'hasItem', itemId: 'ITM-MSC-003' },
          reason: '已持有《钱塘怒潮帮举荐帖》，可直接持帖入门',
        },
        {
          type: 'not',
          condition: { type: 'inSect', sectId: 'SECT-16' },
          reason: '少侠已身在【江淮漕帮】门墙',
        },
      ],
    },
    summary:
      '二流大帮【江淮漕帮】把控汴河漕运命脉，不收来历不明之外人。须先投身杭州【钱塘怒潮帮】晋升至第2阶「内门香主」，再以20两纹银贿赂副帮主陈承涛求取《钱塘怒潮帮举荐帖》。',
    initialStepId: 'get_nuchao_letter',
    steps: {
      get_nuchao_letter: {
        id: 'get_nuchao_letter',
        title: '求取钱塘怒潮帮举荐帖',
        objective:
          '前往临安府（杭州）拜入【钱塘怒潮帮】（20两），晋升第2阶「内门香主」后，向第4阶副帮主【陈承涛】奉银20两求取《钱塘怒潮帮举荐帖》。',
        nextHint: '赴杭州入钱塘怒潮帮并升至「内门香主」，向副帮主陈承涛贿银 20 两取帖',
        targetLocation: {
          regionId: 'hangzhou',
          buildingId: 'hz_nuchao',
          customLabel: '临安府 · 钱塘怒潮帮总舵',
        },
      },
      join_caobang: {
        id: 'join_caobang',
        title: '持帖拜入江淮漕帮',
        objective:
          '已获《钱塘怒潮帮举荐帖》，脱离钱塘怒潮帮后前往扬州府寻【江淮漕帮】帮众呈帖入门。',
        nextHint: '脱离钱塘怒潮帮后，赴扬州府·江淮漕帮总舵呈帖入门',
        targetLocation: {
          regionId: 'yangzhou',
          buildingId: 'yz_chaoguan',
          customLabel: '扬州府 · 江淮漕帮总舵',
        },
      },
    },
    npcActions: [
      {
        id: 'act_ask_caobang_entry',
        label: '打听江淮漕帮入门规矩',
        badge: '入门指引',
        tone: 'jade',
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-16'] },
            qStatus('QST-SECT-16-REFERRAL', 'not_started'),
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-003' } },
            { type: 'not', condition: { type: 'inSect', sectId: 'SECT-16' } },
          ],
        },
        effects: [
          openScene('scene_caobang_guide', 'QST-SECT-16-REFERRAL'),
        ],
      },
    ],
    loadScenes: () => import('./secondTierQuests.scenes').then((m) => m.SCENES_BY_QUEST['QST-SECT-16-REFERRAL']),
  },
  {
    id: 'QST-SECT-23-REFERRAL',
    title: '武林同气 · 八极门引荐帖',
    category: 'sect_entry',
    factionId: 'SECT-23',
    regionId: 'jinan',
    recommendedRealm: '三流下品',
    recommendedNote: '无强制死斗，三流下品即可游历办理（备足 40 两纹银：拜师 20 两 + 贿赂 20 两）',
    startHint: '前往大名府【沧州八极门武场】打听拜师门径，或赴济南府拜入齐鲁查拳馆。',
    startLocation: {
      regionId: 'daming',
      buildingId: 'dm_baji',
      customLabel: '大名府 · 沧州八极门武场',
    },
    startCondition: {
      type: 'all',
      conditions: [
        {
          type: 'not',
          condition: { type: 'hasItem', itemId: 'ITM-MSC-004' },
          reason: '已持有《齐鲁查拳馆举荐帖》，可直接持帖入门',
        },
        {
          type: 'not',
          condition: { type: 'hasItem', itemId: 'ITM-MSC-008' },
          reason: '已持有《八极铁证直入信物》，可直接持信物入门',
        },
        {
          type: 'not',
          condition: { type: 'inSect', sectId: 'SECT-23' },
          reason: '少侠已身在【沧州八极门】门墙',
        },
      ],
    },
    summary:
      '河北名门【沧州八极门】拳风刚猛霸道，非武林同道保举不纳门墙。须先在济南府【齐鲁查拳馆】晋升至第2阶「内堂武师」，再奉银20两贿赂金牌总教头求取《齐鲁查拳馆举荐帖》。',
    initialStepId: 'get_chaquan_letter',
    steps: {
      get_chaquan_letter: {
        id: 'get_chaquan_letter',
        title: '求取齐鲁查拳馆举荐帖',
        objective:
          '前往济南府拜入【齐鲁查拳馆】（20两），晋升第2阶「内堂武师」后，向第4阶金牌总教头奉银20两求取《齐鲁查拳馆举荐帖》。',
        nextHint: '赴济南入齐鲁查拳馆并升至「内堂武师」，向金牌总教头贿银 20 两取帖',
        targetLocation: {
          regionId: 'jinan',
          buildingId: 'jn_chaquan',
          customLabel: '济南府 · 齐鲁查拳总馆',
        },
      },
      join_baji: {
        id: 'join_baji',
        title: '持帖拜入沧州八极门',
        objective:
          '已获《齐鲁查拳馆举荐帖》，脱离查拳馆后前往大名府寻【沧州八极门】门人呈帖入门。',
        nextHint: '脱离齐鲁查拳馆后，赴大名府·沧州八极门武场呈帖入门',
        targetLocation: {
          regionId: 'daming',
          buildingId: 'dm_baji',
          customLabel: '大名府 · 沧州八极门武场',
        },
      },
    },
    npcActions: [
      {
        id: 'act_ask_baji_entry',
        label: '打听沧州八极门拜师门径',
        badge: '入门指引',
        tone: 'jade',
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-23'] },
            qStatus('QST-SECT-23-REFERRAL', 'not_started'),
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-004' } },
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-008' } },
            { type: 'not', condition: { type: 'inSect', sectId: 'SECT-23' } },
          ],
        },
        effects: [
          openScene('scene_baji_guide', 'QST-SECT-23-REFERRAL'),
        ],
      },
    ],
    loadScenes: () => import('./secondTierQuests.scenes').then((m) => m.SCENES_BY_QUEST['QST-SECT-23-REFERRAL']),
  },
  {
    id: 'QST-SECT-24-REFERRAL',
    title: '东南镖路 · 镇远镖局引荐帖',
    category: 'sect_entry',
    factionId: 'SECT-24',
    regionId: 'guangzhou',
    recommendedRealm: '三流下品',
    recommendedNote: '无强制死斗，三流下品即可游历办理（备足 40 两纹银：拜师 20 两 + 贿赂 20 两）',
    startHint: '前往泉州府【闽海镇远总镖局】打听入局门径，或赴广州府拜入岭南洪门武馆。',
    startLocation: {
      regionId: 'quanzhou',
      buildingId: 'qz_zhenyuan',
      customLabel: '泉州府 · 闽海镇远总镖局',
    },
    startCondition: {
      type: 'all',
      conditions: [
        {
          type: 'not',
          condition: { type: 'hasItem', itemId: 'ITM-MSC-005' },
          reason: '已持有《岭南洪门武馆举荐帖》，可直接持帖入门',
        },
        {
          type: 'not',
          condition: { type: 'inSect', sectId: 'SECT-24' },
          reason: '少侠已身在【闽海镇远镖局】门墙',
        },
      ],
    },
    summary:
      '泉州【闽海镇远镖局】专走闽粤南洋重宝红货，非硬桥硬马名馆保举不可入局。须先在广州府【岭南洪门武馆】晋升至第2阶「内堂武师」，再奉银20两贿赂金牌总教头求取《岭南洪门武馆举荐帖》。',
    initialStepId: 'get_hongmen_letter',
    steps: {
      get_hongmen_letter: {
        id: 'get_hongmen_letter',
        title: '求取岭南洪门武馆举荐帖',
        objective:
          '前往广州府拜入【岭南洪门武馆】（20两），晋升第2阶「内堂武师」后，向第4阶金牌总教头奉银20两求取《岭南洪门武馆举荐帖》。',
        nextHint: '赴广州入岭南洪门武馆并升至「内堂武师」，向金牌总教头贿银 20 两取帖',
        targetLocation: {
          regionId: 'guangzhou',
          buildingId: 'gz_hongmen',
          customLabel: '广州府 · 岭南洪门总馆',
        },
      },
      join_zhenyuan: {
        id: 'join_zhenyuan',
        title: '持帖拜入闽海镇远镖局',
        objective:
          '已获《岭南洪门武馆举荐帖》，脱离洪门武馆后前往泉州府寻【闽海镇远镖局】趟子手/镖头呈帖入局。',
        nextHint: '脱离岭南洪门武馆后，赴泉州府·闽海镇远总镖局呈帖入局',
        targetLocation: {
          regionId: 'quanzhou',
          buildingId: 'qz_zhenyuan',
          customLabel: '泉州府 · 闽海镇远总镖局',
        },
      },
    },
    npcActions: [
      {
        id: 'act_ask_zhenyuan_entry',
        label: '打听镇远镖局入局门径',
        badge: '入门指引',
        tone: 'jade',
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-24'] },
            qStatus('QST-SECT-24-REFERRAL', 'not_started'),
            { type: 'not', condition: { type: 'hasItem', itemId: 'ITM-MSC-005' } },
            { type: 'not', condition: { type: 'inSect', sectId: 'SECT-24' } },
          ],
        },
        effects: [
          openScene('scene_zhenyuan_guide', 'QST-SECT-24-REFERRAL'),
        ],
      },
    ],
    loadScenes: () => import('./secondTierQuests.scenes').then((m) => m.SCENES_BY_QUEST['QST-SECT-24-REFERRAL']),
  },
]
