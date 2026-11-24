import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q18_QUEST_ID = 'QST-SECT-01-18'

export const SHAOLIN_Q18_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-17', 'completed'),
    qStatus(SHAOLIN_Q18_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 150 },
    { type: 'skillAtLeast', key: '经义', min: 55 },
    { type: 'skillAtLeast', key: '骑术', min: 30 },
    { type: 'npcAlive', npcId: 'NPC-0157', npcName: '玄悲' },
    { type: 'npcAlive', npcId: 'NPC-0186', npcName: '王元霸' },
  ],
}

export const SHAOLIN_Q18_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q18_QUEST_ID,
    title: '洛阳护镖 · 金刀少林',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'luoyang',
    recommendedRealm: '二流中品 ～ 二流上品',
    maxOpponentRealm: '二流上品（西夏游骑百夫长 · 拓跋烈）',
    recommendedNote:
      '嵩山少林寺 Lv.2 俗家护法脉第二回历练（全二十幕）。须入寺满 150 日、完成相国寺雅市历练且经义 ≥ 55、骑术 ≥ 30。奉命赴洛阳金刀王家，携手王元霸、虚净、虚慧与白马寺玄悲大师共护千斤紫金佛像入嵩山；伊阙龙门石窟突遭水匪与西夏游骑联手劫杀，危局中蒙玄悲破格传授《韦陀杵》并赠地阶神兵《少林韦陀伏魔杵》。',
    startHint:
      '完成《相国暗影 · 红尘刀杖》、入寺满 150 日且经义 ≥ 55、骑术 ≥ 30 后，前往【洛阳府 · 金刀王家 · 金刀威震正气大厅】（或寻王元霸、玄悲）即可共议护镖大计。',
    startLocation: {
      regionId: 'luoyang',
      buildingId: 'ly_jindao',
      spotId: 'ly_jd_hall',
      customLabel: '洛阳府 · 金刀王家 · 金刀威震正气大厅',
    },
    startCondition: SHAOLIN_Q18_START_CONDITION,
    summary:
      '{reignYear}秋风起于洛水，洛阳【金刀王家】家主【王元霸】感念少林昔年援手，特延请名匠铸成千斤紫金佛像一尊，拟由白马寺大韦陀僧【玄悲】携【虚净】、【虚慧】二僧护送入嵩山供奉。你奉嵩山调令赴【金刀威震正气大厅】协助护镖，点齐车马出白马寺南下伊阙龙门石窟古道。岂料伊水峡口暗伏杀机——黄河水匪竟勾结潜入中原的西夏游骑百夫长【拓跋烈】截桥劫佛！你先破水匪伏兵，复在龙门石桥上接过玄悲抛来的【少林韦陀伏魔杵】，临阵领悟少林降魔重器绝学《韦陀杵》，于千钧一发之际击溃西夏铁骑，护得紫金佛像毫发无损归抵白马大佛宝殿。',
    initialStepId: 'courtyard_muster',
    steps: {
      courtyard_muster: {
        id: 'courtyard_muster',
        title: '金刀点镖 · 整肃车马',
        objective:
          '已于正气大厅与王元霸、玄悲大师定下护佛之约。请移步【金刀王家 · 金刀石锁演武中庭（ly_jd_courtyard）】，点验千斤紫金佛像镖车与马匹鞍具，与虚净、虚慧二师兄合议伊阙防务。',
        nextHint:
          '前往【洛阳府 · 金刀王家 · 金刀石锁演武中庭（ly_jd_courtyard）】，点击「点验紫金佛像镖车 · 整肃护佛骑队」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_jindao',
          spotId: 'ly_jd_courtyard',
          customLabel: '洛阳府 · 金刀王家 · 金刀石锁演武中庭',
        },
      },
      longmen_ambush: {
        id: 'longmen_ambush',
        title: '伊阙伏击 · 韦陀镇桥',
        objective:
          '紫金佛像已启程赴白马寺汇合玄悲大师，正待南出伊阙龙门石窟奔赴嵩山！速赴【洛阳府 · 白马寺 · 白马大佛宝殿（ly_bm_main）】护队启行，提防水匪与西夏游骑劫杀！',
        nextHint:
          '前往【洛阳府 · 白马寺 · 白马大佛宝殿（ly_bm_main）】，点击「护送紫金佛像南下伊阙 · 迎战水匪与西夏游骑」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_main',
          customLabel: '洛阳府 · 白马寺 · 白马大佛宝殿',
        },
      },
      baima_confer: {
        id: 'baima_confer',
        title: '紫金安奉 · 伏魔授杵',
        objective:
          '你已在伊阙龙门石桥击溃黄河水匪与西夏百夫长拓跋烈！请于【洛阳府 · 白马寺 · 白马大佛宝殿（ly_bm_main）】拜见玄悲大师与王元霸老爷子，安奉佛像并领受《韦陀杵》真传与《少林韦陀伏魔杵》。',
        nextHint:
          '在【洛阳府 · 白马寺 · 白马大佛宝殿（ly_bm_main）】点击「拜见玄悲与王元霸 · 领受《韦陀杵》与伏魔宝杵」。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_main',
          customLabel: '洛阳府 · 白马寺 · 白马大佛宝殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_slq18_start_hall',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_hall',
        onceFlag: 'sl_q18_start_triggered',
        condition: SHAOLIN_Q18_START_CONDITION,
        effects: [openScene('scene_slq18_01', SHAOLIN_Q18_QUEST_ID)],
      },
      {
        id: 'trig_slq18_muster',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_courtyard',
        onceFlag: 'sl_q18_muster_triggered',
        condition: atStep(SHAOLIN_Q18_QUEST_ID, 'courtyard_muster'),
        effects: [openScene('scene_slq18_05', SHAOLIN_Q18_QUEST_ID)],
      },
      {
        id: 'trig_slq18_ambush',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        onceFlag: 'sl_q18_ambush_triggered',
        condition: atStep(SHAOLIN_Q18_QUEST_ID, 'longmen_ambush'),
        effects: [openScene('scene_slq18_09', SHAOLIN_Q18_QUEST_ID)],
      },
      {
        id: 'trig_slq18_confer',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        onceFlag: 'sl_q18_confer_triggered',
        condition: atStep(SHAOLIN_Q18_QUEST_ID, 'baima_confer'),
        effects: [openScene('scene_slq18_17', SHAOLIN_Q18_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq18_start',
        label: '【俗家护法】拜会王元霸与玄悲 · 共议护送紫金佛像',
        badge: '洛阳护镖',
        subtitle: '金刀威震正气大厅 · 嵩山与金刀王家合护佛像',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_hall',
        visibleWhen: SHAOLIN_Q18_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q18_start_triggered', value: true },
          openScene('scene_slq18_01', SHAOLIN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq18_muster',
        label: '【俗家护法】点验紫金佛像镖车 · 整肃护佛骑队',
        badge: '整肃车马',
        subtitle: '第五幕 · 金刀石锁演武中庭合兵启程',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_jindao',
        spotId: 'ly_jd_courtyard',
        visibleWhen: atStep(SHAOLIN_Q18_QUEST_ID, 'courtyard_muster'),
        effects: [
          { type: 'setFlag', flag: 'sl_q18_muster_triggered', value: true },
          openScene('scene_slq18_05', SHAOLIN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq18_ambush',
        label: '【俗家护法】护送紫金佛像南下伊阙 · 迎战水匪与西夏游骑',
        badge: '龙门血战',
        subtitle: '第九幕 · 伊阙龙门石窟遭遇水匪西夏联手劫杀',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        visibleWhen: atStep(SHAOLIN_Q18_QUEST_ID, 'longmen_ambush'),
        effects: [
          { type: 'setFlag', flag: 'sl_q18_ambush_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q18_pirates_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq18_13', SHAOLIN_Q18_QUEST_ID)],
            elseEffects: [openScene('scene_slq18_09', SHAOLIN_Q18_QUEST_ID)],
          },
        ],
      },
      {
        id: 'spot_slq18_confer',
        label: '【俗家护法】拜见玄悲与王元霸 · 领受《韦陀杵》与伏魔宝杵',
        badge: '伏魔授杵',
        subtitle: '第十七幕 · 白马大佛宝殿安奉佛像与破格传艺',
        tone: 'gold',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_main',
        visibleWhen: atStep(SHAOLIN_Q18_QUEST_ID, 'baima_confer'),
        effects: [
          { type: 'setFlag', flag: 'sl_q18_confer_triggered', value: true },
          openScene('scene_slq18_17', SHAOLIN_Q18_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq18_start_npc',
        label: '奉嵩山法谕拜见 · 协护千斤紫金佛像入少林',
        badge: '洛阳护镖',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0186', 'NPC-0157'] },
            SHAOLIN_Q18_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q18_start_triggered', value: true },
          openScene('scene_slq18_01', SHAOLIN_Q18_QUEST_ID),
        ],
      },
      {
        id: 'act_slq18_confer_npc',
        label: '禀报伊阙退敌 · 拜谢玄悲大师与王老爷子',
        badge: '伏魔授杵',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0157', 'NPC-0186'] },
            atStep(SHAOLIN_Q18_QUEST_ID, 'baima_confer'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q18_confer_triggered', value: true },
          openScene('scene_slq18_17', SHAOLIN_Q18_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLaymanLuoyangEscortQuest.scenes').then((m) => m.SCENES),
  },
]
