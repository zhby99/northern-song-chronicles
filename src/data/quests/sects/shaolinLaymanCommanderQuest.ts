import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q20_QUEST_ID = 'QST-SECT-01-20'

export const SHAOLIN_Q20_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-19', 'completed'),
    qStatus(SHAOLIN_Q20_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 300 },
    { type: 'skillAtLeast', key: '经义', min: 70 },
    { type: 'skillAtLeast', key: '书', min: 45 },
    { type: 'skillAtLeast', key: '策论', min: 40 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0112', min: 50, npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
  ],
}

export const SHAOLIN_Q20_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q20_QUEST_ID,
    title: '紫衣护寺 · 俗家都统',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（嵩山绿林双煞 · 黑风煞）',
    recommendedNote:
      '嵩山少林寺 Lv.2 俗家护法脉终极晋升任务链（全十二幕）。须入寺满 300 日、完成莆田南渡历练且经义 ≥ 70、书 ≥ 45、策论 ≥ 40、玄慈方丈好感 ≥ 50。登封贪官严世昌携伪造查核公文勾结黑虎涧绿林双煞诬告少林；你赴汴京请出皇家《护寺勘合文书》破围归岳，于大雄宝殿前舌战苛吏拆穿官匪奸计，复在暴雨黑虎岭山道多策斩杀绿林双煞，终受玄慈方丈破格册封为 Lv.3 紫衣【俗家护法都统】！',
    startHint:
      '完成《莆田南渡 · 南北少林》、入寺满 300 日且经义 ≥ 70、书 ≥ 45、策论 ≥ 40、玄慈好感 ≥ 50 后，前往【开封府 · 大相国寺 · 大雄宝殿（香云宝鼎）】即可接获嵩山急信。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_xiangguosi',
      spotId: 'bl_xg_hall',
      customLabel: '开封府 · 大相国寺 · 大雄宝殿（香云宝鼎）',
    },
    startCondition: SHAOLIN_Q20_START_CONDITION,
    summary:
      '{reignYear}盛夏，登封贪官【严世昌】觊觎少林外院药庄田产，勾结【黑虎涧绿林双煞】暗埋废甲并携伪造查核赋税公文诬告少林。你于【开封府 · 大相国寺】接获嵩山急信，亲赴【资圣八角琉璃宝塔】面谒礼部祠部郎中崔文清，请出朝廷朱印《护寺勘合文书》并破严府死士截杀。星夜驰返【嵩山少林寺】后，你于大雄宝殿前与苛吏严世昌当堂舌战交锋，复于暴雨倾盆的黑虎岭药庄牌坊前运筹破敌、力斩绿林双煞【黑风煞】与【血狼煞】！次日清晨，【玄慈】方丈于大雄正殿亲赐织金紫衣与玄铁蟠龙令牌，破格晋升你为少林 Lv.3【俗家护法都统】！',
    initialStepId: 'imperial_writ',
    steps: {
      imperial_writ: {
        id: 'imperial_writ',
        title: '汴京请勘 · 塔廊破围',
        objective:
          '登封贪官严世昌携伪造公文诬告少林、欲强封嵩山药庄！速赴【开封府 · 大相国寺 · 资圣八角琉璃宝塔（bl_xg_pagoda）】面谒礼部祠部郎中崔文清，陈情请出朝廷《护寺勘合文书》并破截杀死士！',
        nextHint:
          '前往【开封府 · 大相国寺 · 资圣八角琉璃宝塔（bl_xg_pagoda）】，点击「登资圣宝塔面谒祠部郎中 · 请领护寺勘合文书」。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
        },
      },
      blacktiger_rain: {
        id: 'blacktiger_rain',
        title: '舌战苛吏 · 雨夜斩煞',
        objective:
          '你已请出礼部《护寺勘合文书》并星夜驰返嵩山！速赴【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】当堂舌战苛吏严世昌，并于暴雨夜迎战黑虎涧绿林双煞！',
        nextHint:
          '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「大殿前舌战苛吏 · 暴雨夜决战绿林双煞」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_main',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
        },
      },
      commander_investiture: {
        id: 'commander_investiture',
        title: '紫衣护寺 · 晋升都统',
        objective:
          '贪官严世昌已失势待罪，黑虎涧绿林双煞亦伏诛于暴雨之夜！请步入【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，受玄慈方丈破格册封为少林 Lv.3【俗家护法都统】！',
        nextHint:
          '在【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】点击「登大雄正殿 · 受方丈册封紫衣俗家护法都统」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_main',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq20_start_hall',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        onceFlag: 'sl_q20_start_triggered',
        condition: SHAOLIN_Q20_START_CONDITION,
        effects: [openScene('scene_slq20_01', SHAOLIN_Q20_QUEST_ID)],
      },
      {
        id: 'trig_slq20_pagoda',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        onceFlag: 'sl_q20_pagoda_triggered',
        condition: atStep(SHAOLIN_Q20_QUEST_ID, 'imperial_writ'),
        effects: [
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q20_writ_obtained', op: 'truthy' },
            thenEffects: [openScene('scene_slq20_03', SHAOLIN_Q20_QUEST_ID)],
            elseEffects: [openScene('scene_slq20_02', SHAOLIN_Q20_QUEST_ID)],
          },
        ],
      },
      {
        id: 'trig_slq20_rain',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q20_rain_triggered',
        condition: atStep(SHAOLIN_Q20_QUEST_ID, 'blacktiger_rain'),
        effects: [
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'flag', flag: 'sl_q20_court_done', op: 'truthy' },
                { type: 'flag', flag: 'sl_q20_official_rebuked', op: 'truthy' },
              ],
            },
            thenEffects: [openScene('scene_slq20_08', SHAOLIN_Q20_QUEST_ID)],
            elseEffects: [openScene('scene_slq20_05', SHAOLIN_Q20_QUEST_ID)],
          },
        ],
      },
      {
        id: 'trig_slq20_investiture',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q20_investiture_triggered',
        condition: atStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
        effects: [openScene('scene_slq20_10', SHAOLIN_Q20_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq20_start',
        label: '【俗家护法】拆阅嵩山急信 · 惊闻贪官勾结绿林诬陷少林',
        badge: '紫衣护寺',
        subtitle: '大雄宝殿（香云宝鼎） · 俗家护法脉终极晋升试炼',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_hall',
        visibleWhen: SHAOLIN_Q20_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q20_start_triggered', value: true },
          openScene('scene_slq20_01', SHAOLIN_Q20_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq20_pagoda',
        label: '【俗家护法】登资圣宝塔面谒祠部郎中 · 请领护寺勘合文书',
        badge: '汴京请勘',
        subtitle: '资圣八角琉璃宝塔 · 请出礼部勘合并破死士截杀',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(SHAOLIN_Q20_QUEST_ID, 'imperial_writ'),
        effects: [
          { type: 'setFlag', flag: 'sl_q20_pagoda_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q20_writ_obtained', op: 'truthy' },
            thenEffects: [openScene('scene_slq20_03', SHAOLIN_Q20_QUEST_ID)],
            elseEffects: [openScene('scene_slq20_02', SHAOLIN_Q20_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq20_rain',
        label: '【俗家护法】大殿前舌战苛吏 · 暴雨夜决战绿林双煞',
        badge: '雨夜斩煞',
        subtitle: '公堂驳斥严世昌，暴雨黑虎岭山道迎战黑风煞',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q20_QUEST_ID, 'blacktiger_rain'),
        effects: [
          { type: 'setFlag', flag: 'sl_q20_rain_triggered', value: true },
          {
            type: 'branch',
            condition: {
              type: 'any',
              conditions: [
                { type: 'flag', flag: 'sl_q20_court_done', op: 'truthy' },
                { type: 'flag', flag: 'sl_q20_official_rebuked', op: 'truthy' },
              ],
            },
            thenEffects: [openScene('scene_slq20_08', SHAOLIN_Q20_QUEST_ID)],
            elseEffects: [openScene('scene_slq20_05', SHAOLIN_Q20_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq20_investiture',
        label: '【俗家护法】登大雄正殿 · 受方丈册封紫衣俗家护法都统',
        badge: '晋升都统',
        subtitle: '大雄正殿 · 破格晋升少林 Lv.3 真传职级',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
        effects: [
          { type: 'setFlag', flag: 'sl_q20_investiture_triggered', value: true },
          openScene('scene_slq20_10', SHAOLIN_Q20_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq20_investiture_npc',
        label: '拜见玄慈方丈 · 呈报药庄平乱并受封紫衣俗家都统',
        badge: '晋升都统',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
            atStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q20_investiture_triggered', value: true },
          openScene('scene_slq20_10', SHAOLIN_Q20_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLaymanCommanderQuest.scenes').then((m) => m.SCENES),
  },
]
