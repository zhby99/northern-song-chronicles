import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE17_QUEST_ID = 'QST-SECT-01-SIDE-17'

export const SHAOLIN_SIDE17_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus(SHAOLIN_SIDE17_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 85 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'not', condition: { type: 'flag', flag: 'sl_xuanci_deposed', op: 'truthy' } },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const shaolinSideSnowRedemptionQuest: QuestDefinition = {
  id: SHAOLIN_SIDE17_QUEST_ID,
  title: '少室大雪 · 慈航度恶',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师下品 ～ 宗师中品',
  maxOpponentRealm: '宗师中品（西夏一品堂追魂使 · 玄霜鬼手拓跋烈）',
  recommendedNote:
    '少林寺 Lv.4 宗师级禅心慈悲支线（全十幕，深度回响禅心与杀业积累）。跻身首座长老、且经义湛深后，腊月大雪封山之际于钟鼓禅院遇身受重伤、怀抱幼女的西夏逃亡杀手「断魂铁爪」贺兰枭叩门求庇，山门外西夏一品堂宗师追魂使拓跋烈裹挟关洛苦主逼门讨人。须于漫天飞雪中择策当雪喝退傲气或正面死战击退拓跋烈，再于佛前废其毒爪恶功、抉择剃度收留塔林或伤愈押交官府赎罪并妥善安顿其幼女。',
  startHint:
    '跻身少林寺四阶首座长老、且经义达 85 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院】寻玄寂首座即可触发。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_west',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院',
  },
  startCondition: SHAOLIN_SIDE17_START_CONDITION,
  summary:
    '{reignYear}腊月，大雪封锁少室山。暮色骤暗之际，【大雄宝殿方丈院 · 钟鼓禅院】外急促叩门，身受重伤、怀抱五岁幼女的西夏逃亡杀手「断魂铁爪」贺兰枭伏倒雪阶泣血求庇。未及半柱香，西夏一品堂宗师追魂使「玄霜鬼手」拓跋烈裹挟关洛苦主逼至【罗汉堂 · 演武大坪】前山门嚣张索人。你明辨慈悲与戒律之界：先于漫天飞雪山门前以佛门正理或铁骨威仪独力击退宗师追魂使拓跋烈，守住少林千年威严；继而引关洛苦主入【大雄宝殿正殿】佛祖座前，亲手废去贺兰枭毒爪恶功、令其尽吐赃银抚恤遗孤，并于佛前对这名已生悔悟的罪人与其无辜幼女作出终极度恶抉择，令关洛苦主合十心服。',
  initialStepId: 'confront_snow_gate',
  steps: {
    confront_snow_gate: {
      id: 'confront_snow_gate',
      title: '风雪山门 · 独退一品堂',
      objective:
        '西夏一品堂宗师追魂使「玄霜鬼手」拓跋烈已携关洛苦主逼至山门外演武大坪！请速赴【嵩山少林寺 · 罗汉堂 · 演武大坪（sl_luohan_main）】护住山门威严，与拓跋烈雪中对决。',
      nextHint:
        '前往【嵩山少林寺 · 罗汉堂 · 演武大坪（sl_luohan_main）】，点击「踏雪赴山门前，迎战西夏一品堂追魂使」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        customLabel: '嵩山少林寺 · 罗汉堂 · 演武大坪',
      },
    },
    redeem_in_pagoda: {
      id: 'redeem_in_pagoda',
      title: '佛前断恶 · 慈航度余生',
      objective:
        '已于漫天飞雪中击退一品堂追魂使拓跋烈！请引关洛苦主前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿（sl_daxiong_main）】佛祖座前，亲手废去贺兰枭毒爪恶功，公断因果并安顿其幼女。',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿（sl_daxiong_main）】，点击「于佛前废去悍匪毒爪恶功，公断因果度恶」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_sls17_start_zhonggu',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_side17_start_triggered',
      condition: SHAOLIN_SIDE17_START_CONDITION,
      effects: [openScene('scene_sls17_01', SHAOLIN_SIDE17_QUEST_ID)],
    },
    {
      id: 'trig_sls17_confront_luohan',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      onceFlag: 'sl_side17_gate_triggered',
      condition: atStep(SHAOLIN_SIDE17_QUEST_ID, 'confront_snow_gate'),
      effects: [openScene('scene_sls17_03', SHAOLIN_SIDE17_QUEST_ID)],
    },
    {
      id: 'trig_sls17_redeem_daxiong',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_side17_redeem_triggered',
      condition: atStep(SHAOLIN_SIDE17_QUEST_ID, 'redeem_in_pagoda'),
      effects: [openScene('scene_sls17_07', SHAOLIN_SIDE17_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_sls17_start',
      label: '【少林支线】大雪夜闻急叩山门，勘问泣血恶徒',
      badge: '慈航度恶',
      subtitle: '钟鼓禅院',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: SHAOLIN_SIDE17_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_side17_start_triggered', value: true },
        openScene('scene_sls17_01', SHAOLIN_SIDE17_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls17_gate',
      label: '【少林支线】踏雪赴山门前，迎战西夏一品堂追魂使',
      badge: '风雪退敌',
      subtitle: '罗汉堂演武大坪',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      visibleWhen: atStep(SHAOLIN_SIDE17_QUEST_ID, 'confront_snow_gate'),
      effects: [
        { type: 'setFlag', flag: 'sl_side17_gate_triggered', value: true },
        openScene('scene_sls17_03', SHAOLIN_SIDE17_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls17_redeem',
      label: '【少林支线】于佛前废去悍匪毒爪恶功，公断因果度恶',
      badge: '因果度恶',
      subtitle: '大雄宝殿正殿',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_SIDE17_QUEST_ID, 'redeem_in_pagoda'),
      effects: [
        { type: 'setFlag', flag: 'sl_side17_redeem_triggered', value: true },
        openScene('scene_sls17_07', SHAOLIN_SIDE17_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_sls17_start_npc',
      label: '与玄寂首座察看大雪夜叩门求庇的西夏逃亡者',
      badge: '慈航度恶',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
          SHAOLIN_SIDE17_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side17_start_triggered', value: true },
        openScene('scene_sls17_01', SHAOLIN_SIDE17_QUEST_ID),
      ],
    },
    {
      id: 'act_sls17_redeem_npc',
      label: '禀明玄慈方丈，佛前废功度恶安抚关洛苦主',
      badge: '因果度恶',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
          atStep(SHAOLIN_SIDE17_QUEST_ID, 'redeem_in_pagoda'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side17_redeem_triggered', value: true },
        openScene('scene_sls17_07', SHAOLIN_SIDE17_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinSideSnowRedemptionQuest.scenes').then((m) => m.SHAOLIN_SIDE17_SCENES),
}

export const SHAOLIN_SIDE17_QUESTS: QuestDefinition[] = [shaolinSideSnowRedemptionQuest]
