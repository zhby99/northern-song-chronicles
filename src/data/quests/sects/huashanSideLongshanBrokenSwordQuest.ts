import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_SIDE10_QUEST_ID = 'QST-SECT-05-SIDE-10'

export const HUASHAN_SIDE10_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-05-16', 'completed'),
    { type: 'inSect', sectId: 'SECT-05', minRank: 4 },
    { type: 'chivalryAtLeast', min: 40 },
    { type: 'renownAtLeast', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    qStatus(HUASHAN_SIDE10_QUEST_ID, 'not_started'),
  ],
}

export const HUASHAN_SIDE10_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_SIDE10_QUEST_ID,
    title: '陇山断道 · 西夏折剑令',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '一流上品 ～ 宗师中品',
    maxOpponentRealm: '宗师中品（西夏一品堂供奉「断剑魔陀」赫连断岳）',
    recommendedNote:
      '十八幕华山高阶终局支线：西夏一品堂宗师供奉「断剑魔陀 · 赫连断岳」携十二金牌剑奴与铁铸「折剑令」潜入关西，连杀三名关中剑老，直指华山。秦烈山破例下落雁峰，携你并骑西出陇山古道，先双剑合璧大破金牌剑奴阵，终由你以华山绝学震裂百斤玄铁重剑、一剑枭首赫连断岳，焚毁《西夏折剑录》。',
    startHint:
      '华山第 4 阶弟子完成宗师试炼（QST-SECT-05-16），侠义 ≥ 40、声望 ≥ 60 且【秦烈山】健在时，前往【华山绝顶论剑台 > 落雁峰顶白玉坛】或寻【秦烈山】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      customLabel: '潼关 / 华山绝顶论剑台 · 落雁峰顶白玉坛（或寻秦烈山）',
    },
    startCondition: HUASHAN_SIDE10_START_CONDITION,
    summary:
      '{reignYear}深秋，三柄断剑连同西夏铁铸「折剑令」惊现落雁峰——关中三位成名剑老一夜间惨遭西夏一品堂宗师供奉「断剑魔陀 · 赫连断岳」暗杀。素来不离绝顶半步的「潼关剑神」秦烈山震怒破例下山，携你并骑西驰【秦州府 · 陇右古道断碑烽火望夏台】截敌。残阳芦苇之间，你与秦烈山双剑合璧大破十二金牌剑奴阵；及至魔陀亲持百斤玄铁重剑压阵，你挺身独战宗师强敌，以华山绝学震裂玄铁重剑、一剑枭首赫连断岳，焚毁《西夏折剑录》，护得关中剑道尊严。',
    initialStepId: 'ride_longshan',
    steps: {
      ride_longshan: {
        id: 'ride_longshan',
        title: '双剑西出 · 截道陇山',
        objective:
          '「潼关剑神」秦烈山已破例下落雁峰，与你并骑西驰！请速赶赴【秦州府 / 陇右古道 > 断碑烽火望夏台】（qzf_longyou_east），截击西夏金牌剑奴与「断剑魔陀 · 赫连断岳」！',
        nextHint: '前往【秦州府 / 陇右古道 > 断碑烽火望夏台】与秦烈山联手迎战金牌剑奴阵。',
        targetLocation: {
          regionId: 'qinzhou',
          buildingId: 'qzf_longyou',
          spotId: 'qzf_longyou_east',
        },
      },
      slay_helian: {
        id: 'slay_helian',
        title: '斩落魔陀 · 震裂玄铁',
        objective:
          '金牌剑奴阵已被双剑合璧击破，秦烈山却在清理暗箭伏兵时略带箭毒！请于【秦州府 / 陇右古道 > 断碑烽火望夏台】（qzf_longyou_east）正面迎战西夏供奉「断剑魔陀 · 赫连断岳」，震裂其百斤玄铁重剑并将其枭首！',
        nextHint: '在【秦州府 / 陇右古道 > 断碑烽火望夏台】决战「断剑魔陀 · 赫连断岳」。',
        targetLocation: {
          regionId: 'qinzhou',
          buildingId: 'qzf_longyou',
          spotId: 'qzf_longyou_east',
        },
      },
      return_huashan: {
        id: 'return_huashan',
        title: '焚录归岳 · 落雁论功',
        objective:
          '「断剑魔陀 · 赫连断岳」已伏诛，《西夏折剑录》付之一炬！请随秦烈山返归【华山绝顶论剑台 > 落雁峰顶白玉坛】受赏并聆听宗师指点。',
        nextHint: '前往【华山绝顶论剑台 > 落雁峰顶白玉坛】（或寻秦烈山）复命领赏。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_altar',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hss10_altar_start',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hss10_intro_triggered',
        condition: HUASHAN_SIDE10_START_CONDITION,
        effects: [openScene('scene_hss10_01', HUASHAN_SIDE10_QUEST_ID)],
      },
      {
        id: 'trig_hss10_longshan_arrive',
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_east',
        onceFlag: 'hss10_longshan_triggered',
        condition: atStep(HUASHAN_SIDE10_QUEST_ID, 'ride_longshan'),
        effects: [openScene('scene_hss10_05', HUASHAN_SIDE10_QUEST_ID)],
      },
      {
        id: 'trig_hss10_return_huashan',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hss10_return_triggered',
        condition: atStep(HUASHAN_SIDE10_QUEST_ID, 'return_huashan'),
        effects: [openScene('scene_hss10_18', HUASHAN_SIDE10_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hss10_start_altar',
        label: '急谒秦烈山 · 查验血书与西夏「折剑令」（开启《陇山断道 · 西夏折剑令》）',
        badge: '西夏折剑令',
        subtitle: '第一幕 · 落雁峰顶白玉坛',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: HUASHAN_SIDE10_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hss10_intro_triggered', value: true },
          openScene('scene_hss10_01', HUASHAN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss10_longshan_array',
        label: '登临断碑烽火望夏台 · 与秦烈山双剑合璧破金牌剑奴阵',
        badge: '残阳破阵',
        subtitle: '第五幕 · 陇右古道断碑烽火望夏台',
        tone: 'danger',
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_east',
        visibleWhen: atStep(HUASHAN_SIDE10_QUEST_ID, 'ride_longshan'),
        effects: [
          { type: 'setFlag', flag: 'hss10_longshan_triggered', value: true },
          openScene('scene_hss10_05', HUASHAN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'spot_hss10_slay_helian',
        label: '独剑临风 · 决战西夏供奉「断剑魔陀 · 赫连断岳」',
        badge: '斩落魔陀',
        subtitle: '第十三幕 · 陇右古道断碑烽火望夏台',
        tone: 'danger',
        regionId: 'qinzhou',
        buildingId: 'qzf_longyou',
        spotId: 'qzf_longyou_east',
        visibleWhen: atStep(HUASHAN_SIDE10_QUEST_ID, 'slay_helian'),
        effects: [openScene('scene_hss10_13', HUASHAN_SIDE10_QUEST_ID)],
      },
      {
        id: 'spot_hss10_return_altar',
        label: '返登落雁峰白玉坛 · 随秦烈山论功受赏',
        badge: '焚录归岳',
        subtitle: '第十八幕 · 落雁峰顶白玉坛',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: atStep(HUASHAN_SIDE10_QUEST_ID, 'return_huashan'),
        effects: [
          { type: 'setFlag', flag: 'hss10_return_triggered', value: true },
          openScene('scene_hss10_18', HUASHAN_SIDE10_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hss10_qin_start',
        label: '禀察关中三剑老遇刺案 · 共议截击西夏折剑令（开启《陇山断道 · 西夏折剑令》）',
        badge: '西夏折剑令',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            HUASHAN_SIDE10_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hss10_intro_triggered', value: true },
          openScene('scene_hss10_01', HUASHAN_SIDE10_QUEST_ID),
        ],
      },
      {
        id: 'act_hss10_qin_return',
        label: '于落雁峰复命 · 聆听秦前辈评点陇山斩魔之战',
        badge: '焚录归岳',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            atStep(HUASHAN_SIDE10_QUEST_ID, 'return_huashan'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hss10_return_triggered', value: true },
          openScene('scene_hss10_18', HUASHAN_SIDE10_QUEST_ID),
        ],
      },
    ],

    loadScenes: () =>
      import('./huashanSideLongshanBrokenSwordQuest.scenes').then((m) => m.SCENES),
  },
]
