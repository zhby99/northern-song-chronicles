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
      '嵩山少林寺 Lv.2 俗家护法脉终极晋升任务链（全二十二幕）。须入寺满 300 日、完成莆田南渡历练且经义 ≥ 70、书 ≥ 45、策论 ≥ 40、玄慈方丈好感 ≥ 50。登封贪官勾结黑虎涧绿林双煞诬告少林私藏甲胄企图强夺药庄；你以俗家之身入汴京相国寺请出皇家护寺勘合文书当堂喝退贪官，复于暴雨夜单刀斩杀嵩山绿林双煞，终在大雄宝殿破格晋升 Lv.3 俗家护法都统（真传职级）！',
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
      '{reignYear}夏雨如注，登封贪官【严世昌】觊觎少林嵩山外院药庄田产，竟勾结【黑虎涧绿林双煞】暗埋废甲栽赃，诬告少林寺私藏军械、意图谋逆！危急关头，你于【开封府 · 大相国寺】接获嵩山急信，以俗家护法身份亲赴【资圣八角琉璃宝塔】求见祠部郎中，凭深厚经义策论与亲笔陈情书请出大宋敕赐《护寺勘合文书》，并击退贪官截杀死士。你星夜驰返【嵩山少林寺】，于大雄宝殿前展宣勘合文书喝退严世昌一伙；是夜暴雨倾盆，走投无路的绿林双煞【黑风煞】与【血狼煞】夜袭药庄杀人灭口，你单刀立于雷雨之中血战双煞，终将二凶尽数伏诛！次日清晨，【玄慈】方丈于大雄正殿当众破格赐予紫衣令牌，晋升你为少林【俗家护法都统】（Lv.3 真传职级）！',
    initialStepId: 'imperial_writ',
    steps: {
      imperial_writ: {
        id: 'imperial_writ',
        title: '汴京请勘 · 截杀破围',
        objective:
          '登封贪官严世昌正欲借「私藏甲胄」之名强封嵩山药庄！请速赴【开封府 · 大相国寺 · 资圣八角琉璃宝塔（bl_xg_pagoda）】面谒礼部祠部郎中崔文清，以策论书法陈情请出朝廷《护寺勘合文书》！',
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
        title: '喝退贪官 · 雨夜斩煞',
        objective:
          '你已请出大宋敕赐《护寺勘合文书》并击退严府截杀死士！速星夜驰返【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，当堂喝退贪官严世昌，并于暴雨夜单刀迎战黑虎涧绿林双煞！',
        nextHint:
          '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「呈递护寺勘合文书喝退贪官 · 暴雨夜战绿林双煞」。',
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
        effects: [openScene('scene_slq20_05', SHAOLIN_Q20_QUEST_ID)],
      },
      {
        id: 'trig_slq20_rain',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q20_rain_triggered',
        condition: atStep(SHAOLIN_Q20_QUEST_ID, 'blacktiger_rain'),
        effects: [openScene('scene_slq20_10', SHAOLIN_Q20_QUEST_ID)],
      },
      {
        id: 'trig_slq20_investiture',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q20_investiture_triggered',
        condition: atStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
        effects: [openScene('scene_slq20_18', SHAOLIN_Q20_QUEST_ID)],
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
        subtitle: '第五幕 · 以策论书法请出皇家勘合并破死士截杀',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(SHAOLIN_Q20_QUEST_ID, 'imperial_writ'),
        effects: [
          { type: 'setFlag', flag: 'sl_q20_pagoda_triggered', value: true },
          openScene('scene_slq20_05', SHAOLIN_Q20_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq20_rain',
        label: '【俗家护法】呈递护寺勘合文书喝退贪官 · 暴雨夜战绿林双煞',
        badge: '雨夜斩煞',
        subtitle: '第十幕 · 喝退严世昌，单刀决战黑风煞与血狼煞',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q20_QUEST_ID, 'blacktiger_rain'),
        effects: [
          { type: 'setFlag', flag: 'sl_q20_rain_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q20_official_rebuked', op: 'truthy' },
            thenEffects: [openScene('scene_slq20_14', SHAOLIN_Q20_QUEST_ID)],
            elseEffects: [openScene('scene_slq20_10', SHAOLIN_Q20_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq20_investiture',
        label: '【俗家护法】登大雄正殿 · 受方丈册封紫衣俗家护法都统',
        badge: '晋升都统',
        subtitle: '第十八幕 · 破格晋升少林 Lv.3 真传职级',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q20_QUEST_ID, 'commander_investiture'),
        effects: [
          { type: 'setFlag', flag: 'sl_q20_investiture_triggered', value: true },
          openScene('scene_slq20_18', SHAOLIN_Q20_QUEST_ID),
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
          openScene('scene_slq20_18', SHAOLIN_Q20_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLaymanCommanderQuest.scenes').then((m) => m.SCENES),
  },
]
