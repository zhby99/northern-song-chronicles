import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const TAISHAN_ENTRY_QUEST_ID = 'QST-SECT-06-ENTRY'

export const TAISHAN_ENTRY_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'notInAnySect', allowTransferFromSectId: 'SECT-25' },
    {
      type: 'flag',
      flag: 'shaolin_novice_state',
      op: 'eq',
      value: 'none',
      label: '未在嵩山少林寺充任挂单杂役',
    },
    {
      type: 'flag',
      flag: 'song_court_blacklisted',
      op: 'falsy',
      label: '未背负朝廷海捕黑名单恶名',
    },
    qStatus(TAISHAN_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const TAISHAN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: TAISHAN_ENTRY_QUEST_ID,
    title: '岱宗问数 · 松风破茧',
    category: 'sect_entry',
    factionId: 'SECT-06',
    regionId: 'taishan',
    recommendedRealm: '不入流（专为零内功白丁或查拳馆学子量身打造的二十幕入门长卷）',
    maxOpponentRealm: '不入流（前八幕零硬战，第九幕授内功铁剑后再试锋芒，切磋不死卡关）',
    recommendedNote:
      '无门无派（或济南【齐鲁查拳总馆】弟子）踏入【济南府 · 泰山岱庙行祠】即可自动触发；全篇二十幕重体验、重剧情、重同门缘分与先天十艺资质检定。',
    startHint:
      '无门无派（或隶属齐鲁查拳馆）时，前往【济南府 · 泰山岱庙行祠】偶遇俗家弟子鲁苍岳护碑风波即可开启。',
    startLocation: {
      regionId: 'jinan',
      buildingId: 'jn_daimiao',
      spotId: 'jn_daimiao_east',
      customLabel: '济南府 · 泰山岱庙行祠（步入自动触发）',
    },
    startCondition: TAISHAN_ENTRY_START_CONDITION,
    summary:
      '一介尚未修习内功的布衣行者，于济南府岱庙行祠挺身护住古碑与木讷赤诚的泰山俗家弟子鲁苍岳，由此卷入京东黑风寨觊觎《东封七宿青铜算筹》的连环暗流。经趵突泉天松道人茶席考心、历下客栈夜雨拒五十两贿银、十八盘千级风雪云梯喋血挑泉，终于东岳道院得授《泰山松风养气诀》与《泰山剑法·筑基篇》破茧入武；随后押牌力保蒙冤同门、鹰愁涧松林并肩夺筹，终在破晓之时登临玉皇顶汉白玉封禅坛，于沧海红日之下对答掌门褚玄机圭表问数，堂堂正正拜入五岳独尊泰山门墙！',
    initialStepId: 'visit_baotu_tiansong',
    steps: {
      visit_baotu_tiansong: {
        id: 'visit_baotu_tiansong',
        title: '趵突烹泉 · 求牌天松',
        objective:
          '已在岱庙东厢碑廊结识泰山俗家弟子【鲁苍岳】并察觉碑阴盗拓暗记。请前往济南府【趵突泉（观澜榭）】，拜谒玉皇阁长老【天松道人】求取登山试剑木牌。',
        nextHint: '在【济南府】点击进入【趵突泉（观澜榭）】（或直接与临风观景轩的【天松道人】交谈）。',
        targetLocation: {
          regionId: 'jinan',
          buildingId: 'jn_baotu',
          spotId: 'jn_baotu_west',
        },
      },
      inn_night_oath: {
        id: 'inn_night_oath',
        title: '历下夜雨 · 整装待旦',
        objective:
          '已获天松道人亲赐《东岳松纹试剑木牌》。请随鲁苍岳前往济南府【历下泉畔悦来客栈】投宿整备，明晨同登泰山。',
        nextHint: '进入济南府【历下泉畔悦来客栈】触发夜雨客栈剧情。',
        targetLocation: {
          regionId: 'jinan',
          buildingId: 'jinan_base_inn',
        },
      },
      climb_18pan: {
        id: 'climb_18pan',
        title: '千级云梯 · 铁剑磨骨',
        objective:
          '历下夜雨严拒五十两贿银，与鲁苍岳立下同登东岳之约。请由大地图南行前往【东岳泰山 · 十八盘云梯石阶】，持木牌接受传功师叔【单天门】的凡躯砺骨考校！',
        nextHint: '由济南府前往相邻的【东岳泰山】，点击进入【十八盘云梯石阶】。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_18pan',
          spotId: 'ts_18pan_main',
        },
      },
      daoyuan_neigong: {
        id: 'daoyuan_neigong',
        title: '松风引气 · 道院授剑',
        objective:
          '昨夜于五大夫松观云亭机警撞钟惊退潜入黑影。请前往【东岳泰山 · 泰山派东岳道院】苍松石坪演剑院，听候执法长老【天柏道人】传授泰山筑基内功与剑法！',
        nextHint: '在东岳泰山进入【泰山派东岳道院】，与【天柏道人】交谈。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_west',
        },
      },
      daoyuan_spar: {
        id: 'daoyuan_spar',
        title: '苍松试剑 · 初露锋芒',
        objective:
          '已习得《泰山松风养气诀》与《泰山剑法（筑基篇）》第一重并获赐《武馆三才铁剑》！可先在【贰·披挂与武学】装备铁剑或调息闭关，准备妥当后向【天柏道人】或【盛定】请考演武。',
        nextHint:
          '打开顶部菜单装备《武馆三才铁剑》，随后在【东岳道院 · 苍松石坪演剑院】找【天柏道人】或【盛定】开启第十幕试剑。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_west',
        },
      },
      investigate_daoyuan_theft: {
        id: 'investigate_daoyuan_theft',
        title: '偏殿失筹 · 碑廊寻踪',
        objective:
          '镇山重宝《东封七宿青铜算筹》失窃，同门挚友鲁苍岳遭贼人遗留墨袖嫁祸！请速在【东岳道院 · 东厢丹房碑廊】勘验紫檀秘匣锁痕与窗外足印，缉拿黑风寨真凶！',
        nextHint: '前往东岳道院【东厢丹房碑廊】点击勘查线索（或与道院同门对话追查）。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_east',
        },
      },
      yuhuang_summit_oath: {
        id: 'yuhuang_summit_oath',
        title: '汉坛观日 · 岱宗问数',
        objective:
          '黑风寨盗筹阴谋已破，青铜算筹完璧归赵！掌门东灵道长【褚玄机】传谕召见，请登临【东岳泰山 · 玉皇顶古封禅台】汉白玉封禅坛，于沧海日出之际问数拜师！',
        nextHint: '在东岳泰山点击进入【玉皇顶古封禅台】（或与【褚玄机】交谈）。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_yuhuang',
          spotId: 'ts_yh_altar',
        },
      },
    },

    locationTriggers: [
      // 1) 踏入济南府【泰山岱庙行祠】自动开启第一幕
      {
        id: 'trig_ts_daimiao_auto_start',
        regionId: 'jinan',
        buildingId: 'jn_daimiao',
        onceFlag: 'taishan_daimiao_intro_triggered',
        condition: TAISHAN_ENTRY_START_CONDITION,
        effects: [openScene('scene_ts_01_daimiao_conflict', 'QST-SECT-06-ENTRY')],
      },
      // 2) 踏入济南府【趵突泉（观澜榭）】自动触发第三幕天松烹泉
      {
        id: 'trig_ts_baotu_tea',
        regionId: 'jinan',
        buildingId: 'jn_baotu',
        onceFlag: 'taishan_baotu_tea_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'visit_baotu_tiansong'),
        effects: [openScene('scene_ts_03_baotu_tea_trial', 'QST-SECT-06-ENTRY')],
      },
      // 3) 若处于 inn_night_oath 阶段，踏入历下泉畔悦来客栈触发第四幕
      {
        id: 'trig_ts_jinan_inn_night',
        regionId: 'jinan',
        buildingId: 'jinan_base_inn',
        onceFlag: 'taishan_inn_night_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'inn_night_oath'),
        effects: [openScene('scene_ts_04_rainy_inn_bribe', 'QST-SECT-06-ENTRY')],
      },
      // 4) 踏入东岳泰山【十八盘云梯石阶】自动触发第五幕单天门拦路
      {
        id: 'trig_ts_18pan_gate',
        regionId: 'taishan',
        buildingId: 'ts_18pan',
        onceFlag: 'taishan_18pan_gate_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'climb_18pan'),
        effects: [openScene('scene_ts_05_iron_sword_gate', 'QST-SECT-06-ENTRY')],
      },
      // 5) 若处于 daoyuan_neigong 阶段，踏入东岳道院触发第九幕传功破茧
      {
        id: 'trig_ts_daoyuan_neigong',
        regionId: 'taishan',
        buildingId: 'ts_daoyuan',
        onceFlag: 'taishan_daoyuan_neigong_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_neigong'),
        effects: [openScene('scene_ts_09_pine_wind_awakening', 'QST-SECT-06-ENTRY')],
      },
      // 6) 踏入东岳泰山【玉皇顶古封禅台】自动触发第十七幕观日问数终章
      {
        id: 'trig_ts_yuhuang_summit',
        regionId: 'taishan',
        buildingId: 'ts_yuhuang',
        onceFlag: 'taishan_yuhuang_summit_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'yuhuang_summit_oath'),
        effects: [openScene('scene_ts_17_gnomon_sword_calc', 'QST-SECT-06-ENTRY')],
      },
    ],

    spotActions: [
      {
        id: 'spot_ts_daoyuan_inspect_box',
        label: '勘验失窃紫檀铜匣锁痕与窗台赤泥足印',
        badge: '追缉盗筹',
        subtitle: '细查《东封七宿青铜算筹》失窃现场，还同门鲁苍岳清白',
        tone: 'gold',
        regionId: 'taishan',
        buildingId: 'ts_daoyuan',
        spotId: 'ts_daoyuan_east',
        visibleWhen: atStep(TAISHAN_ENTRY_QUEST_ID, 'investigate_daoyuan_theft'),
        effects: [openScene('scene_ts_12_stele_corridor_clues', 'QST-SECT-06-ENTRY')],
      },
    ],

    npcActions: [
      // 1) 手动开启兜底入口：向泰山长老或鲁苍岳请教入门机缘，自动引往济南岱庙开启第一幕
      {
        id: 'act_ts_manual_start',
        label: '慕名问剑东岳 · 开启《岱宗问数 · 松风破茧》入门试炼',
        badge: '泰山机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: [
                'NPC-0129',
                'NPC-0168',
                'NPC-0204',
                'NPC-0205',
                'NPC-0267',
                'NPC-0278',
                'NPC-0827',
              ],
            },
            TAISHAN_ENTRY_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'taishan_daimiao_intro_triggered', value: true },
          {
            type: 'teleportPlayer',
            regionId: 'jinan',
            buildingId: 'jn_daimiao',
            spotId: 'jn_daimiao_east',
          },
          openScene('scene_ts_01_daimiao_conflict', 'QST-SECT-06-ENTRY'),
        ],
      },

      // 2) 趵突泉拜见天松道人 / 鲁星帆（兜底按钮）
      {
        id: 'act_ts_baotu_talk_tiansong',
        label: '与鲁苍岳一同拜谒天松长老 · 求取登山试剑木牌',
        badge: '趵突论茶',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0204', 'NPC-0278'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'visit_baotu_tiansong'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'taishan_baotu_tea_triggered', value: true },
          openScene('scene_ts_03_baotu_tea_trial', 'QST-SECT-06-ENTRY'),
        ],
      },

      // 3) 十八盘拜见单天门应试（兜底按钮）
      {
        id: 'act_ts_18pan_talk_shantianmen',
        label: '呈验《东岳松纹试剑木牌》 · 应试十八盘千级云梯',
        badge: '云梯砺骨',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0168'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'climb_18pan'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'taishan_18pan_gate_triggered', value: true },
          openScene('scene_ts_05_iron_sword_gate', 'QST-SECT-06-ENTRY'),
        ],
      },

      // 4) 东岳道院接受天柏道人传功（兜底按钮）
      {
        id: 'act_ts_daoyuan_learn_neigong',
        label: '向天柏道人领受《泰山松风养气诀》与筑基剑法',
        badge: '松风破茧',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0205', 'NPC-0533', 'NPC-0545'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_neigong'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'taishan_daoyuan_neigong_triggered', value: true },
          openScene('scene_ts_09_pine_wind_awakening', 'QST-SECT-06-ENTRY'),
        ],
      },

      // 5) 第九幕选择“先佩剑调息”后，找天柏道人或盛定开启第十幕演武首战
      {
        id: 'act_ts_daoyuan_start_spar',
        label: '佩剑整备已毕 · 请考苍松石坪筑基试剑',
        badge: '演武首战',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0205', 'NPC-0533'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_spar'),
          ],
        },
        effects: [openScene('scene_ts_10_courtyard_first_spar', 'QST-SECT-06-ENTRY')],
      },

      // 6) 东厢碑廊查案兜底入口（与盛定/鲍景森/天柏道人对话亦可进入第十二幕）
      {
        id: 'act_ts_daoyuan_investigate_npc',
        label: '赴东厢碑廊勘验《东封七宿青铜算筹》失窃现场',
        badge: '洗冤缉盗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0205', 'NPC-0533', 'NPC-0545'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'investigate_daoyuan_theft'),
          ],
        },
        effects: [
          {
            type: 'teleportPlayer',
            regionId: 'taishan',
            buildingId: 'ts_daoyuan',
            spotId: 'ts_daoyuan_east',
          },
          openScene('scene_ts_12_stele_corridor_clues', 'QST-SECT-06-ENTRY'),
        ],
      },

      // 7) 玉皇顶古封禅台拜谒掌门褚玄机（兜底按钮）
      {
        id: 'act_ts_yuhuang_talk_chuxuanji',
        label: '登汉白玉封禅坛拜谒掌门褚玄机 · 观日问数受剑入门',
        badge: '岱宗定鼎',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0129', 'NPC-0302'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'yuhuang_summit_oath'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'taishan_yuhuang_summit_triggered', value: true },
          openScene('scene_ts_17_gnomon_sword_calc', 'QST-SECT-06-ENTRY'),
        ],
      },
    ],
    loadScenes: () => import('./taishanEntryQuest.scenes').then((m) => m.SCENES),
  },
]
