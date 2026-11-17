import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const NANSHAOLIN_ENTRY_QUEST_ID = 'QST-SECT-04-ENTRY'

export const NANSHAOLIN_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus(NANSHAOLIN_ENTRY_QUEST_ID, 'not_started'),
    {
      type: 'not',
      condition: { type: 'inSect', sectId: 'SECT-04' },
      reason: '少侠已身在莆田南少林门墙',
    },
    {
      type: 'any',
      hint: '需为无门无派之身，或由闽海镇远镖局、岭南洪门武馆同脉转投',
      conditions: [
        { type: 'notInAnySect' },
        { type: 'inSect', sectId: 'SECT-24' },
        { type: 'inSect', sectId: 'SECT-27' },
      ],
    },
  ],
}

export const NANSHAOLIN_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: NANSHAOLIN_ENTRY_QUEST_ID,
    title: '刺桐风起 · 铁桥问禅',
    category: 'sect_entry',
    factionId: 'SECT-04',
    regionId: 'nanshaolin',
    recommendedRealm: '不入流（零内功零武学开局友好 · 剧情传功筑基）',
    maxOpponentRealm: '三流下品（宗门考校点到为止，胜败皆可通关）',
    recommendedNote:
      '专为零武学根基少侠打造的二十幕港式南拳入门长卷：前八幕零战斗重资质与市井善缘，第九幕因材施教传授并自动运使内功与南派拳棍，历经刺桐港雨夜护民与百杰木人巷破关，自选【清修武僧】或【护寺俗家】拜入莆田南少林！',
    startHint:
      '前往【泉州府 · 刺桐港万国番坊】或【泉州开元寺东西双塔】（或直接赴【莆田南少林】向寺中僧众打听拜山门径），即可开启二十幕南少林入门长卷。',
    startLocation: {
      regionId: 'quanzhou',
      buildingId: 'qz_port',
      spotId: 'qz_port_east',
      customLabel: '泉州府 · 刺桐港万国番坊（或开元寺 / 南少林山门）',
    },
    startCondition: NANSHAOLIN_START_CONDITION,
    summary:
      '{reignYear}海风猎猎，初入江湖、尚无内功傍身的你，在泉州刺桐港栈桥仗义化解黑鲨恶牙对采药渔翁陈阿公与小沙弥戒藏的欺凌，亲睹南少林戒律首座元觉“大力金刚指”捏凹熟铜棍的绝世神威。持引牌登临莆田九莲山后，于铁桥禅师元通门下经历挑水踏梅花桩、寒泉浸铁腕之苦功，因材施教破零领悟第一门内功与南拳。及至秋潮暴雨之夜，东洋浪人勾结北朝暗桩夜袭刺桐药栈，你以前番善缘借乌篷小舟奇袭，以初成铁桥硬架倭刀护住同门，终闯过百杰木人巷十二关，于九莲大雄宝殿敬奉武夷岩茶，堂堂正正归位南少林！',
    initialStepId: 'go_jiulian_gate',
    steps: {
      go_jiulian_gate: {
        id: 'go_jiulian_gate',
        title: '乌木引牌 · 初登九莲',
        objective:
          '已在泉州刺桐港与小沙弥【戒藏】结下患难之谊，并获开元寺戒律首座【元觉】赐予挂单乌木牌。请北上前往【莆田南少林 · 南少林百杰木人巷（九莲山门演武坪）】呈牌拜山。',
        nextHint: '大地图前往【莆田南少林】，进入【南少林百杰木人巷】即可触发山门试马剧情。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_wooden',
          spotId: 'nsl_wooden_west',
        },
      },
      tripod_water_training: {
        id: 'tripod_water_training',
        title: '寒泉铁腕 · 挑水扎马',
        objective:
          '铁罗汉堂主【元通】点破你尚无内家桩功根基，命你与【戒藏】前往【千斤铁鼎炼体坪 · 淬火寒泉池】苦练铁环挑水与四平大马，熬出南派桥手筋骨。',
        nextHint: '进入莆田南少林【千斤铁鼎炼体坪】（或与【弘禅】/【元通】对话）开启筑基苦修与传功。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_tripod',
          spotId: 'nsl_tripod_east',
        },
      },
      night_rescue_port: {
        id: 'night_rescue_port',
        title: '刺桐夜雨 · 铁桥护港',
        objective:
          '八月望日大潮之夜，东洋浪人勾结黑鲨水匪突袭泉州药栈并绑架老船工陈阿公！请速随【戒藏】、【弘禅】下山赶赴【泉州府 · 刺桐港万国番坊】后栈救援！',
        nextHint: '速返【泉州府】，进入【刺桐港万国番坊（望流求海道）】触发雨夜栈桥决战！',
        targetLocation: {
          regionId: 'quanzhou',
          buildingId: 'qz_port',
          spotId: 'qz_port_west',
        },
      },
      wooden_alley_trial: {
        id: 'wooden_alley_trial',
        title: '百杰木巷 · 破关受考',
        objective:
          '刺桐港之危已解，你死守铁桥之举获元觉、元通两位禅师力荐！请返回【莆田南少林 · 南少林百杰木人巷】向达摩堂主【元海】请开初阵十二铜皮木人关！',
        nextHint: '前往莆田南少林【南少林百杰木人巷】，与达摩堂主【元海】或【戒藏】对话闯关。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_wooden',
          spotId: 'nsl_wooden_main',
        },
      },
      abbot_tea_ceremony: {
        id: 'abbot_tea_ceremony',
        title: '九莲晨钟 · 宝殿奉茶',
        objective:
          '已凭一身硬桥真功夫闯出百杰木人巷！请移步【九莲大雄宝殿 · 大雄正殿】拜谒南少林方丈【元苦】，敬奉武夷岩茶并择定【清修武僧】或【护寺俗家】衣钵！',
        nextHint: '前往莆田南少林【九莲大雄宝殿】，与方丈【元苦】对话完成入门大典。',
        targetLocation: {
          regionId: 'nanshaolin',
          buildingId: 'nsl_main',
          spotId: 'nsl_main_main',
        },
      },
    },

    locationTriggers: [
      // 阶段 1 -> 踏入莆田南少林【百杰木人巷（含九莲山门）】自动触发第 6 幕山门试马
      {
        id: 'trig_nsl_enter_mountain_gate',
        regionId: 'nanshaolin',
        buildingId: 'nsl_wooden',
        onceFlag: 'nsl_gate_stance_triggered',
        condition: atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'go_jiulian_gate'),
        effects: [openScene('scene_nsl_06_gate_stance', 'QST-SECT-04-ENTRY')],
      },
      // 阶段 2 -> 踏入【千斤铁鼎炼体坪】自动触发第 7～10 幕苦练传功与试手
      {
        id: 'trig_nsl_enter_tripod_yard',
        regionId: 'nanshaolin',
        buildingId: 'nsl_tripod',
        onceFlag: 'nsl_tripod_training_triggered',
        condition: atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'tripod_water_training'),
        effects: [openScene('scene_nsl_07_water_buckets', 'QST-SECT-04-ENTRY')],
      },
      // 阶段 3 -> 驰援踏入泉州【刺桐港万国番坊】自动触发第 12～15 幕雨夜决战
      {
        id: 'trig_nsl_night_port_rescue',
        regionId: 'quanzhou',
        buildingId: 'qz_port',
        onceFlag: 'nsl_night_port_triggered',
        condition: atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'night_rescue_port'),
        effects: [openScene('scene_nsl_12_boatman_karma', 'QST-SECT-04-ENTRY')],
      },
    ],

    spotActions: [
      // 刺桐港万国番坊 · 千帆栈桥建筑奇遇入口
      {
        id: 'spot_nsl_start_at_port',
        label: '仗义上前 · 栈桥血竭药篓风波',
        badge: '南少林机缘',
        subtitle: '开启二十幕港式南拳入门长卷《刺桐风起 · 铁桥问禅》',
        tone: 'gold',
        regionId: 'quanzhou',
        buildingId: 'qz_port',
        spotId: 'qz_port_east',
        visibleWhen: NANSHAOLIN_START_CONDITION,
        effects: [openScene('scene_nsl_01_port_bully', 'QST-SECT-04-ENTRY')],
      },
      // 泉州开元寺双塔 · 宝塔底层入口（平滑转入刺桐港收药风波）
      {
        id: 'spot_nsl_start_at_kaiyuan',
        label: '寻访下院 · 探听南少林求艺机缘',
        badge: '南少林机缘',
        subtitle: '随开元寺僧众赴刺桐港接应采药沙弥戒藏',
        tone: 'gold',
        regionId: 'quanzhou',
        buildingId: 'qz_kaiyuan',
        spotId: 'qz_kaiyuan_main',
        visibleWhen: NANSHAOLIN_START_CONDITION,
        effects: [
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
          openScene('scene_nsl_01_port_bully', 'QST-SECT-04-ENTRY'),
        ],
      },
      // 九莲山门演武坪景点入口
      {
        id: 'spot_nsl_start_at_mountain_gate',
        label: '叩拜山门 · 打听南少林下院试缘',
        badge: '南少林机缘',
        subtitle: '遵九莲山门规，赴邻近泉州刺桐港接应采药沙弥戒藏',
        tone: 'gold',
        regionId: 'nanshaolin',
        buildingId: 'nsl_wooden',
        spotId: 'nsl_wooden_west',
        visibleWhen: NANSHAOLIN_START_CONDITION,
        effects: [
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
          openScene('scene_nsl_01_port_bully', 'QST-SECT-04-ENTRY'),
        ],
      },
    ],

    npcActions: [
      // 1a) 在泉州府找元觉（NPC-0165）、戒山（NPC-0982）或林镇海（NPC-0286）直接开启第 1 幕
      {
        id: 'act_nsl_quanzhou_npc_start',
        label: '铁桥问禅 · 赴刺桐港相助采药沙弥（南少林入门）',
        badge: '南少林入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0165', 'NPC-0982', 'NPC-0286'] },
            NANSHAOLIN_START_CONDITION,
          ],
        },
        effects: [
          { type: 'teleportPlayer', regionId: 'quanzhou', buildingId: 'qz_port', spotId: 'qz_port_east' },
          openScene('scene_nsl_01_port_bully', 'QST-SECT-04-ENTRY'),
        ],
      },
      // 1b) 若玩家直接跑上莆田南少林找任意 SECT-04 僧众（排除已在泉州的元觉/戒山，避免重复按钮），弹出知客序引送往刺桐港
      {
        id: 'act_nsl_mountain_npc_start',
        label: '叩拜九莲山门 · 求赐南少林入门试缘',
        badge: '南少林入门',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-04'] },
            {
              type: 'not',
              condition: { type: 'targetNpcMatch', npcIds: ['NPC-0165', 'NPC-0982'] },
            },
            NANSHAOLIN_START_CONDITION,
          ],
        },
        effects: [openScene('scene_nsl_prelude_from_mountain', 'QST-SECT-04-ENTRY')],
      },
      // 2) 阶段 go_jiulian_gate 兜底对话按钮（找元通/戒藏/元海均可触发第 6 幕）
      {
        id: 'act_nsl_present_wood_plaque',
        label: '呈验开元寺挂单乌木牌 · 拜山受训',
        badge: '九莲试马',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', factionIds: ['SECT-04'] },
            atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'go_jiulian_gate'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'nsl_gate_stance_triggered', value: true },
          openScene('scene_nsl_06_gate_stance', 'QST-SECT-04-ENTRY'),
        ],
      },
      // 3) 阶段 tripod_water_training 兜底按钮（找元通/弘禅/戒藏均可开启寒泉挑水）
      {
        id: 'act_nsl_start_tripod_water',
        label: '腕扣铁环 · 赴寒泉梅花桩挑水筑基',
        badge: '铁桥苦功',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0164', 'NPC-0674', 'NPC-0909', 'NPC-0201'] },
            atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'tripod_water_training'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'nsl_tripod_training_triggered', value: true },
          openScene('scene_nsl_07_water_buckets', 'QST-SECT-04-ENTRY'),
        ],
      },
      // 4) 阶段 wooden_alley_trial：找达摩堂主元海（NPC-0200）或戒藏（NPC-0909）闯百杰木人巷
      {
        id: 'act_nsl_challenge_wooden_alley',
        label: '请开百杰木人巷 · 硬桥闯初阵十二关',
        badge: '木人巷大考',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0200', 'NPC-0909', 'NPC-0620'] },
            atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'wooden_alley_trial'),
          ],
        },
        effects: [openScene('scene_nsl_16_enter_alley', 'QST-SECT-04-ENTRY')],
      },
      // 5) 阶段 abbot_tea_ceremony：找九莲大雄宝殿方丈元苦（NPC-0124）或藏经首座元空（NPC-0201）奉茶入门
      {
        id: 'act_nsl_abbot_tea_ceremony',
        label: '九莲宝殿奉岩茶 · 择定僧俗衣钵入门',
        badge: '铁桥归宗',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0124', 'NPC-0201'] },
            atStep(NANSHAOLIN_ENTRY_QUEST_ID, 'abbot_tea_ceremony'),
          ],
        },
        effects: [openScene('scene_nsl_19_tea_ceremony', 'QST-SECT-04-ENTRY')],
      },
    ],
    loadScenes: () => import('./nanshaolinEntryQuest.scenes').then((m) => m.SCENES),
  },
]
