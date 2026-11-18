import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, qStatus, openScene } from '../../../engine/quest/dsl'

export const TAISHAN_ENTRY_QUEST_ID = 'QST-SECT-06-ENTRY'

export const TAISHAN_ENTRY_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('song_court_blacklisted', 'falsy'),
    flag('ts_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0129', npcName: '褚玄机' },
    qStatus(TAISHAN_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const TAISHAN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: TAISHAN_ENTRY_QUEST_ID,
    title: '东岳砺剑 · 封禅问心',
    category: 'sect_entry',
    factionId: 'SECT-06',
    regionId: 'taishan',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '三流下品（黑风匪徒、同门试剑与劫囚头目，砺骨立威）',
    recommendedNote:
      '十五幕泰山道门剑派长卷：五岳独尊泰山派宁缺毋滥，只收从未入过任何门派、且未学过良品及以上武学的白纸弟子！历岱庙验底、趵突泉托牌退匪、十八盘挑水（作弊即永拒）、道院授剑试锋、押匪破劫囚，终登玉皇顶答褚玄机零提示问剑（答错永绝山门）拜入东岳。',
    startHint:
      '从未加入过任何门派且未学良品及以上武学时，前往【济南府 · 泰山岱庙行祠】拜见天松道人即可开启。',
    startLocation: {
      regionId: 'jinan',
      buildingId: 'jn_daimiao',
      spotId: 'jn_daimiao_east',
      customLabel: '济南府 · 泰山岱庙行祠（步入自动触发）',
    },
    startCondition: TAISHAN_ENTRY_START_CONDITION,
    summary:
      '{reignYear}济南府泰山岱庙行祠，泰山长老【天松道人】验明你从未投身他派、亦无他派高深武学杂念，方许你赴趵突泉单手托举十斤铁木试剑牌。出城南行击退企图抢牌的黑风寨喽啰后，于【十八盘云梯石阶】接铁剑道人【单天门】挑水规矩——半滴不洒登顶过关（偷倒作弊则永绝泰山）。当夜在【五大夫松观云亭】鸣钟擒下黑风寨探子，次日于【泰山派东岳道院】获执法长老【天柏道人】亲授《泰山松风养气诀》与《泰山剑法（筑基篇）》，并在苍松剑坪与同门试锋、下山击溃劫囚匪首。五更破晓登临【玉皇顶古封禅台】，于沧海红日之下答过掌门【褚玄机】四选一零提示问剑，获赐青袍剑佩拜入泰山派！',
    initialStepId: 'baotu_iron_plaque',
    steps: {
      baotu_iron_plaque: {
        id: 'baotu_iron_plaque',
        title: '趵突托牌 · 凡躯退匪',
        objective:
          '天松道人已验明你白纸清白之身。请前往济南府【趵突泉（观澜榭）】，单手托举十斤铁木试剑牌稳立一炷香，并击退截路抢牌的黑风寨喽啰！',
        nextHint: '前往济南府【趵突泉（观澜榭）】触发试剑铁牌考校。',
        targetLocation: {
          regionId: 'jinan',
          buildingId: 'jn_baotu',
          spotId: 'jn_baotu_west',
        },
      },
      climb_18pan: {
        id: 'climb_18pan',
        title: '十八盘阶 · 挑泉砺骨',
        objective:
          '已保住铁木试剑牌。请南赴【东岳泰山 · 十八盘云梯石阶】，接受铁剑道人【单天门】挑水登梯之试，并于夜宿【五大夫松观云亭】时警醒防匪！',
        nextHint: '前往东岳泰山【十八盘云梯石阶】，持木牌拜见【单天门】。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_18pan',
          spotId: 'ts_18pan_main',
        },
      },
      daoyuan_neigong_spar: {
        id: 'daoyuan_neigong_spar',
        title: '道院授剑 · 破贼立功',
        objective:
          '挑水砺骨过关且夜擒黑风探子！请前往【泰山派东岳道院 · 苍松石坪演剑院】，领受【天柏道人】传授《泰山松风养气诀》与《泰山剑法（筑基篇）》，完成同门试剑并押匪破劫囚！',
        nextHint: '前往东岳泰山【泰山派东岳道院】拜见【天柏道人】。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_daoyuan',
          spotId: 'ts_daoyuan_west',
        },
      },
      yuhuang_summit_oath: {
        id: 'yuhuang_summit_oath',
        title: '玉皇观日 · 封禅问剑',
        objective:
          '试剑破贼俱已立功，木牌已加盖朱印！请于五更登临【玉皇顶古封禅台】，面见掌门「东灵道长」【褚玄机】，答过东灵问剑即可授袍入门！',
        nextHint: '前往东岳泰山【玉皇顶古封禅台】拜谒掌门【褚玄机】（零提示问剑答错永绝山门）。',
        targetLocation: {
          regionId: 'taishan',
          buildingId: 'ts_yuhuang',
          spotId: 'ts_yh_altar',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_ts_daimiao_auto_start',
        regionId: 'jinan',
        buildingId: 'jn_daimiao',
        onceFlag: 'taishan_daimiao_intro_triggered',
        condition: TAISHAN_ENTRY_START_CONDITION,
        effects: [openScene('scene_ts_01_daimiao_verify', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_ts_baotu_plaque',
        regionId: 'jinan',
        buildingId: 'jn_baotu',
        onceFlag: 'taishan_baotu_plaque_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'baotu_iron_plaque'),
        effects: [openScene('scene_ts_02_baotu_iron_plaque', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_ts_18pan_gate',
        regionId: 'taishan',
        buildingId: 'ts_18pan',
        onceFlag: 'taishan_18pan_gate_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'climb_18pan'),
        effects: [openScene('scene_ts_04_18pan_water_rule', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_ts_daoyuan_neigong',
        regionId: 'taishan',
        buildingId: 'ts_daoyuan',
        onceFlag: 'taishan_daoyuan_neigong_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_neigong_spar'),
        effects: [openScene('scene_ts_08_daoyuan_teach_sword', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'trig_ts_yuhuang_summit',
        regionId: 'taishan',
        buildingId: 'ts_yuhuang',
        onceFlag: 'taishan_yuhuang_summit_triggered',
        condition: atStep(TAISHAN_ENTRY_QUEST_ID, 'yuhuang_summit_oath'),
        effects: [openScene('scene_ts_13_yuhuang_sunrise', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_ts_baotu_plaque',
        label: '单手托举十斤铁木试剑牌',
        badge: '筋骨验牌',
        subtitle: '第二幕 · 趵突观澜榭试剑牌',
        tone: 'gold',
        regionId: 'jinan',
        buildingId: 'jn_baotu',
        spotId: 'jn_baotu_west',
        visibleWhen: atStep(TAISHAN_ENTRY_QUEST_ID, 'baotu_iron_plaque'),
        effects: [openScene('scene_ts_02_baotu_iron_plaque', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_ts_18pan_water',
        label: '挑担山泉登十八盘云梯',
        badge: '挑泉砺骨',
        subtitle: '第四幕 · 十八盘云梯石阶',
        tone: 'gold',
        regionId: 'taishan',
        buildingId: 'ts_18pan',
        spotId: 'ts_18pan_main',
        visibleWhen: atStep(TAISHAN_ENTRY_QUEST_ID, 'climb_18pan'),
        effects: [openScene('scene_ts_04_18pan_water_rule', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'spot_ts_daoyuan_sword',
        label: '入东岳道院领受泰山筑基剑法',
        badge: '道院授剑',
        subtitle: '第八幕 · 苍松石坪演剑院',
        tone: 'gold',
        regionId: 'taishan',
        buildingId: 'ts_daoyuan',
        spotId: 'ts_daoyuan_west',
        visibleWhen: atStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_neigong_spar'),
        effects: [openScene('scene_ts_08_daoyuan_teach_sword', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_ts_manual_start',
        label: '拜见泰山长老 · 呈验白纸身家叩问东岳（开启十五幕）',
        badge: '泰山机缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0129', 'NPC-0168', 'NPC-0204', 'NPC-0205'],
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
          openScene('scene_ts_01_daimiao_verify', TAISHAN_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_ts_baotu_talk_tiansong',
        label: '托举十斤铁木试剑牌 · 领牌登岳',
        badge: '趵突验牌',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0204'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'baotu_iron_plaque'),
          ],
        },
        effects: [openScene('scene_ts_02_baotu_iron_plaque', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_ts_18pan_talk_shantianmen',
        label: '呈验铁木试剑牌 · 挑水登十八盘',
        badge: '十八盘试炼',
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
        effects: [openScene('scene_ts_04_18pan_water_rule', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_ts_daoyuan_learn_sword',
        label: '请天柏道人传授《泰山松风养气诀》与筑基剑法',
        badge: '道院授剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0205'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'daoyuan_neigong_spar'),
          ],
        },
        effects: [openScene('scene_ts_08_daoyuan_teach_sword', TAISHAN_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_ts_yuhuang_talk_chuxuanji',
        label: '登玉皇顶古封禅台 · 面见褚玄机问剑拜师',
        badge: '封禅问心',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0129'] },
            atStep(TAISHAN_ENTRY_QUEST_ID, 'yuhuang_summit_oath'),
          ],
        },
        effects: [openScene('scene_ts_13_yuhuang_sunrise', TAISHAN_ENTRY_QUEST_ID)],
      },
    ],
    loadScenes: () => import('./taishanEntryQuest.scenes').then((m) => m.SCENES),
  },
]
