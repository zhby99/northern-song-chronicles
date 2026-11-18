import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const HUASHAN_Q09_QUEST_ID = 'QST-SECT-05-09'

export const HUASHAN_Q09_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    qStatus('QST-SECT-05-05', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'qi',
      label: '华山气宗真传弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-089', minLevel: 3 },
    qStatus(HUASHAN_Q09_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
  ],
}

export const HUASHAN_Q09_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q09_QUEST_ID,
    title: '东峰迎曦 · 由外而内',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '一流下品',
    maxOpponentRealm: '一流下品（星宿腐骨道人及西夏死士重围）',
    recommendedNote:
      '二十五幕华山气宗真传核心长卷：需气宗真传身份且《希夷剑法》≥ 3 重。于东峰迎曦石坪得宁清羽与高沧云合授地阶中品《混元功》（由外而内、掌剑混元），旋即与大师兄高沧云驰赴长安西市鬼市清剿散播尸毒的星宿妖人“腐骨道人”。废宅火油毒阵突围之际面临同门情义与独占首功的生死抉择，获授地阶宝衣【华山紫霞剑客衫】！',
    startHint:
      '华山第 3 阶气宗真传弟子完成《QST-SECT-05-05》且《希夷剑法》≥ 3 重后，前往【玉女峰紫霞道观 > 东峰紫气迎曦石坪】或寻【宁清羽】/【高沧云】开启。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      customLabel: '潼关 / 西岳华山 · 东峰紫气迎曦石坪',
    },
    startCondition: HUASHAN_Q09_START_CONDITION,
    summary:
      '{reignYear}你在【东峰紫气迎曦石坪】得玉女剑仙【宁清羽】与大师兄【高沧云】合授华山独门地阶内功《混元功》，参透“由外而内、掌剑混元”之妙。适逢关中急报：星宿派妖人“腐骨道人”勾结西夏死士于【京兆府 · 西市胡商坊】鬼市散播腐尸毒。你与高沧云并骑夜袭废宅，身陷猛火油与毒网重围，凭《混元功》引毒返震正面击毙腐骨道人；突围关头，你在护卫重伤师兄与独追西夏首恶抢功之间定下本心，终获地阶宝衣【华山紫霞剑客衫】。',
    initialStepId: 'terrace_hunyuan',
    steps: {
      terrace_hunyuan: {
        id: 'terrace_hunyuan',
        title: '东峰迎曦 · 混元受功',
        objective:
          '请于【玉女峰紫霞道观 > 东峰紫气迎曦石坪】随【宁清羽】与大师兄【高沧云】修习地阶中品《混元功》，体悟由外而内行气之法！',
        nextHint: '于【玉女峰紫霞道观 > 东峰紫气迎曦石坪】领受《混元功》。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
        },
      },
      changan_ghost_bazaar: {
        id: 'changan_ghost_bazaar',
        title: '并骑入秦 · 西市追毒',
        objective:
          '星宿妖人“腐骨道人”勾结西夏死士在长安散播尸毒！请与高沧云赶赴【京兆府 > 西市胡商坊（丝路起点） > 番坊正市 · 奇货堂】暗查鬼市毒源！',
        nextHint: '前往【京兆府 > 西市胡商坊 > 番坊正市 · 奇货堂】追查鬼市腐毒。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_main',
        },
      },
      courtyard_ambush: {
        id: 'courtyard_ambush',
        title: '火油毒网 · 混元返震',
        objective:
          '已锁定鬼市北隅染坊废宅！请于【西市胡商坊 > 番坊正市 · 奇货堂】夜袭废宅毒巢，催动《混元功》破除星宿腐毒并击毙腐骨道人！',
        nextHint: '于【西市胡商坊 > 番坊正市 · 奇货堂】夜闯废宅迎战腐骨道人。',
        targetLocation: {
          regionId: 'changan',
          buildingId: 'ca_xishi',
          spotId: 'ca_xishi_main',
        },
      },
      return_ally: {
        id: 'return_ally',
        title: '肝胆相照 · 东峰解衣',
        objective:
          '已死战断后护送重伤的高沧云杀出重围！请返回【玉女峰紫霞道观 > 东峰紫气迎曦石坪】与【宁清羽】、【高沧云】复命！',
        nextHint: '返回【玉女峰紫霞道观 > 东峰紫气迎曦石坪】向宁清羽与高沧云复命。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_terrace',
        },
      },
      return_estranged: {
        id: 'return_estranged',
        title: '独携首功 · 紫霞领赏',
        objective:
          '已独追斩杀西夏黑市主使夺获毒匣！请返回【玉女峰紫霞道观 > 紫霞正气主殿】面见掌门【岳沧溟】呈功受赏！',
        nextHint: '返回【玉女峰紫霞道观 > 紫霞正气主殿】向掌门岳沧溟复命。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_hall',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq09_terrace_start',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hsq09_intro_triggered',
        condition: HUASHAN_Q09_START_CONDITION,
        effects: [openScene('scene_hsq09_01', HUASHAN_Q09_QUEST_ID)],
      },
      {
        id: 'trig_hsq09_changan_bazaar',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        onceFlag: 'hsq09_bazaar_triggered',
        condition: atStep(HUASHAN_Q09_QUEST_ID, 'changan_ghost_bazaar'),
        effects: [openScene('scene_hsq09_06', HUASHAN_Q09_QUEST_ID)],
      },
      {
        id: 'trig_hsq09_return_ally',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        onceFlag: 'hsq09_ally_return_triggered',
        condition: atStep(HUASHAN_Q09_QUEST_ID, 'return_ally'),
        effects: [openScene('scene_hsq09_18', HUASHAN_Q09_QUEST_ID)],
      },
      {
        id: 'trig_hsq09_return_estranged',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'hsq09_estranged_return_triggered',
        condition: atStep(HUASHAN_Q09_QUEST_ID, 'return_estranged'),
        effects: [openScene('scene_hsq09_23', HUASHAN_Q09_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq09_start_terrace',
        label: '登东峰迎曦石坪 · 领受气宗地阶《混元功》（开启《东峰迎曦 · 由外而内》）',
        badge: '混元真传',
        subtitle: '第一幕 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: HUASHAN_Q09_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hsq09_intro_triggered', value: true },
          openScene('scene_hsq09_01', HUASHAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq09_terrace_hunyuan',
        label: '迎紫气纳朝阳 · 随宁清羽与高沧云参悟《混元功》',
        badge: '由外而内',
        subtitle: '第二幕 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_Q09_QUEST_ID, 'terrace_hunyuan'),
        effects: [openScene('scene_hsq09_02', HUASHAN_Q09_QUEST_ID)],
      },
      {
        id: 'spot_hsq09_changan_bazaar',
        label: '与高沧云暗访西市鬼市 · 追查星宿腐尸毒源',
        badge: '鬼市追毒',
        subtitle: '第六幕 · 番坊正市 · 奇货堂',
        tone: 'primary',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        visibleWhen: atStep(HUASHAN_Q09_QUEST_ID, 'changan_ghost_bazaar'),
        effects: [
          { type: 'setFlag', flag: 'hsq09_bazaar_triggered', value: true },
          openScene('scene_hsq09_06', HUASHAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq09_courtyard_ambush',
        label: '夜袭染坊废宅 · 催动混元真气决战腐骨道人',
        badge: '混元破毒',
        subtitle: '第九幕 · 西市北隅废弃染坊',
        tone: 'danger',
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_main',
        visibleWhen: atStep(HUASHAN_Q09_QUEST_ID, 'courtyard_ambush'),
        effects: [openScene('scene_hsq09_09', HUASHAN_Q09_QUEST_ID)],
      },
      {
        id: 'spot_hsq09_return_ally',
        label: '归返东峰迎曦石坪 · 受高沧云解衣赠紫霞剑客衫',
        badge: '同门情深',
        subtitle: '第十八幕 · 东峰紫气迎曦石坪',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        visibleWhen: atStep(HUASHAN_Q09_QUEST_ID, 'return_ally'),
        effects: [
          { type: 'setFlag', flag: 'hsq09_ally_return_triggered', value: true },
          openScene('scene_hsq09_18', HUASHAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq09_return_estranged',
        label: '步入紫霞正气主殿 · 呈上首功密匣受赏紫霞剑客衫',
        badge: '正殿论功',
        subtitle: '第二十三幕 · 紫霞正气主殿',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: atStep(HUASHAN_Q09_QUEST_ID, 'return_estranged'),
        effects: [
          { type: 'setFlag', flag: 'hsq09_estranged_return_triggered', value: true },
          openScene('scene_hsq09_23', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq09_start_npc',
        label: '请受气宗地阶《混元功》（开启《东峰迎曦 · 由外而内》）',
        badge: '混元真传',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166', 'NPC-0202', 'NPC-0118'] },
            HUASHAN_Q09_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq09_intro_triggered', value: true },
          openScene('scene_hsq09_01', HUASHAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq09_return_ally_npc',
        label: '与宁师叔、高师兄复盘西市除毒始末',
        badge: '肝胆相照',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0166', 'NPC-0202'] },
            atStep(HUASHAN_Q09_QUEST_ID, 'return_ally'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq09_ally_return_triggered', value: true },
          openScene('scene_hsq09_18', HUASHAN_Q09_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq09_return_estranged_npc',
        label: '向岳掌门呈献西夏毒方密匣首功',
        badge: '正殿论功',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118'] },
            atStep(HUASHAN_Q09_QUEST_ID, 'return_estranged'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hsq09_estranged_return_triggered', value: true },
          openScene('scene_hsq09_23', HUASHAN_Q09_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanQiHunyuanGongQuest.scenes').then((m) => m.SCENES),
  },
]
