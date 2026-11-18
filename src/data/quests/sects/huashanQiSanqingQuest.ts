import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_Q10_QUEST_ID = 'QST-SECT-05-10'

export const HUASHAN_Q10_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    qStatus('QST-SECT-05-09', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'qi',
      label: '华山气宗真传弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-058', minLevel: 4 },
    qStatus(HUASHAN_Q10_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
  ],
}

export const HUASHAN_Q10_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q10_QUEST_ID,
    title: '落雁借剑 · 太岳三峰',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（秦烈山七成功力十剑考校 & 塞外凶徒血刀恶僧）',
    recommendedNote:
      '二十六幕华山气宗杀伐真传长卷：需完成《东峰迎曦 · 由外而内》且《混元功》≥ 4 重。携岳沧溟亲笔信登落雁峰向剑神秦烈山求剑，先于白玉论剑坛硬接七成功力秦烈山十合不退半步，复单骑出潼关风雪截杀一流中品“血刀恶僧”，终令秦烈山动容开启白玉石匣，获赐《华山太岳三青峰剑谱》并亲授地阶上品《太岳三青峰》！',
    startHint:
      '完成《东峰迎曦 · 由外而内》且《混元功》≥ 4 重后，前往【玉女峰紫霞道观 > 紫霞正气主殿】或寻掌门【岳沧溟】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      customLabel: '潼关 / 西岳华山 · 紫霞正气主殿',
    },
    startCondition: HUASHAN_Q10_START_CONDITION,
    summary:
      '{reignYear}冬雪初临，掌门【岳沧溟】见你《混元功》火候渐深，修书命你登【落雁峰白玉论剑坛】向潼关剑神【秦烈山】求授镇岳杀剑。秦烈山素厌气宗迂阔，定下双重铁考：你先于白玉坛顶催动混元真气硬接其七成功力十剑而寸步不退，复冒风雪单骑出【潼关天险瓮城】截杀屠戮边民的一流中品凶徒“血刀恶僧”。当你踏雪携首级重登绝顶，秦烈山慨叹“紫霞门下竟真出了铁骨剑客”，开启白玉石匣赐予【《华山太岳三青峰剑谱》】并亲授地阶上品绝学《太岳三青峰》！',
    initialStepId: 'summit_present_letter',
    steps: {
      summit_present_letter: {
        id: 'summit_present_letter',
        title: '掌门手书 · 落雁求剑',
        objective:
          '已领受掌门岳沧溟亲笔书信。请登临【华山绝顶论剑台 > 落雁峰白玉论剑坛】拜见潼关剑神【秦烈山】，求授华山杀伐重剑！',
        nextHint: '前往【华山绝顶论剑台 > 落雁峰白玉论剑坛】向秦烈山呈交手书。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_altar',
        },
      },
      altar_ten_rounds: {
        id: 'altar_ten_rounds',
        title: '白玉铁考 · 十剑不退',
        objective:
          '秦烈山设下首道铁考！请于【华山绝顶论剑台 > 落雁峰白玉论剑坛】全力运转《混元功》，硬接秦烈山七成功力十合猛攻而半步不退！',
        nextHint: '于【落雁峰白玉论剑坛】撑过秦烈山七成功力十合考校。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_altar',
        },
      },
      tongguan_blood_monk: {
        id: 'tongguan_blood_monk',
        title: '风雪出关 · 截斩恶僧',
        objective:
          '十剑考校已过！请遵秦烈山次道铁考，驰赴【潼关天险瓮城 > 潼关镇河主城楼与瓮城】单骑出关，截杀流窜陕甘边境的凶徒“血刀恶僧”！',
        nextHint: '前往【潼关天险瓮城 > 潼关镇河主城楼与瓮城】出关追斩血刀恶僧。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_fort',
          spotId: 'tg_ft_barbican',
        },
      },
      altar_impart_sanqing: {
        id: 'altar_impart_sanqing',
        title: '踏雪献首 · 太岳三峰',
        objective:
          '血刀恶僧已伏诛！请携木匣冒雪返登【华山绝顶论剑台 > 落雁峰白玉论剑坛】面见【秦烈山】，领受《太岳三青峰》真传！',
        nextHint: '返回【华山绝顶论剑台 > 落雁峰白玉论剑坛】（或寻秦烈山）献首受剑。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_summit',
          spotId: 'tg_sm_altar',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq10_hall_start',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'hsq10_intro_triggered',
        condition: HUASHAN_Q10_START_CONDITION,
        effects: [openScene('scene_hsq10_01', HUASHAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_hsq10_summit_letter',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hsq10_letter_triggered',
        condition: atStep(HUASHAN_Q10_QUEST_ID, 'summit_present_letter'),
        effects: [openScene('scene_hsq10_03', HUASHAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_hsq10_tongguan_monk',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        onceFlag: 'hsq10_tongguan_triggered',
        condition: atStep(HUASHAN_Q10_QUEST_ID, 'tongguan_blood_monk'),
        effects: [openScene('scene_hsq10_10', HUASHAN_Q10_QUEST_ID)],
      },
      {
        id: 'trig_hsq10_altar_impart',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        onceFlag: 'hsq10_impart_triggered',
        condition: atStep(HUASHAN_Q10_QUEST_ID, 'altar_impart_sanqing'),
        effects: [openScene('scene_hsq10_18', HUASHAN_Q10_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq10_start_hall',
        label: '拜见掌门岳沧溟 · 领手书赴落雁峰借剑（开启《落雁借剑 · 太岳三峰》）',
        badge: '落雁借剑',
        subtitle: '第一幕 · 紫霞正气主殿',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: HUASHAN_Q10_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq10_intro_triggered', value: true },
          openScene('scene_hsq10_01', HUASHAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq10_present_letter',
        label: '呈上岳沧溟亲笔书信 · 向秦烈山求授镇岳杀剑',
        badge: '绝顶呈书',
        subtitle: '第三幕 · 落雁峰白玉论剑坛',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: atStep(HUASHAN_Q10_QUEST_ID, 'summit_present_letter'),
        effects: [
          { type: 'setFlag', flag: 'hsq10_letter_triggered', value: true },
          openScene('scene_hsq10_03', HUASHAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq10_ten_rounds',
        label: '立定白玉坛心 · 催动混元真气硬接秦烈山十剑考校',
        badge: '十剑不退',
        subtitle: '第六幕 · 落雁峰白玉论剑坛',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: atStep(HUASHAN_Q10_QUEST_ID, 'altar_ten_rounds'),
        effects: [openScene('scene_hsq10_06', HUASHAN_Q10_QUEST_ID)],
      },
      {
        id: 'spot_hsq10_blood_monk',
        label: '风雪单骑出潼关 · 追截塞外凶徒血刀恶僧',
        badge: '出关斩恶',
        subtitle: '第十幕 · 潼关镇河主城楼与瓮城',
        tone: 'danger',
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        visibleWhen: atStep(HUASHAN_Q10_QUEST_ID, 'tongguan_blood_monk'),
        effects: [
          { type: 'setFlag', flag: 'hsq10_tongguan_triggered', value: true },
          openScene('scene_hsq10_10', HUASHAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq10_impart_sanqing',
        label: '踏雪呈验恶僧首级 · 受传《太岳三青峰》真卷',
        badge: '太岳三峰',
        subtitle: '第十八幕 · 落雁峰白玉论剑坛',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
        visibleWhen: atStep(HUASHAN_Q10_QUEST_ID, 'altar_impart_sanqing'),
        effects: [
          { type: 'setFlag', flag: 'hsq10_impart_triggered', value: true },
          openScene('scene_hsq10_18', HUASHAN_Q10_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq10_yue_start',
        label: '请掌门指点气宗杀伐重剑（开启《落雁借剑 · 太岳三峰》）',
        badge: '落雁借剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118'] },
            HUASHAN_Q10_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq10_intro_triggered', value: true },
          openScene('scene_hsq10_01', HUASHAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq10_qin_letter',
        label: '呈递岳掌门亲笔信 · 求授《太岳三青峰》',
        badge: '绝顶借剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            atStep(HUASHAN_Q10_QUEST_ID, 'summit_present_letter'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq10_letter_triggered', value: true },
          openScene('scene_hsq10_03', HUASHAN_Q10_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq10_qin_ten_rounds',
        label: '请秦师伯出剑 · 应战七成功力十剑不退考校',
        badge: '十剑不退',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            atStep(HUASHAN_Q10_QUEST_ID, 'altar_ten_rounds'),
          ],
        },
        effects: [openScene('scene_hsq10_06', HUASHAN_Q10_QUEST_ID)],
      },
      {
        id: 'act_hsq10_qin_impart',
        label: '呈献血刀恶僧首级 · 领受《太岳三青峰》真传',
        badge: '太岳三峰',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
            atStep(HUASHAN_Q10_QUEST_ID, 'altar_impart_sanqing'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq10_impart_triggered', value: true },
          openScene('scene_hsq10_18', HUASHAN_Q10_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanQiSanqingQuest.scenes').then((m) => m.SCENES),
  },
]
