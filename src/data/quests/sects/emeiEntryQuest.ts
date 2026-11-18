import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const EMEI_ENTRY_QUEST_ID = 'QST-SECT-07-ENTRY'

export const EMEI_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('em_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0128', npcName: '云慧师太' },
    qStatus(EMEI_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const EMEI_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: EMEI_ENTRY_QUEST_ID,
    title: '大慈护粮 · 金顶禅心',
    category: 'sect_entry',
    factionId: 'SECT-07',
    regionId: 'emeishan',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '三流下品（大慈寺粮牙地痞、洗象池偷猎贼与金顶护法弟子）',
    recommendedNote:
      '十二幕峨眉派白纸入门长卷（男女皆宜）：峨眉门下只收从未加入过任何门派、且未修习良品及以上武学的白纸弟子！于成都大慈寺施粥棚护粮退地痞，登万年古寺随静玄师太立规、白水荷池习得《峨眉吐纳术》（凡品），赴洗象池击退迷烟采药贼护住灵猿（若私吞百年猴儿酒即被铁尼逐出永绝山门），终登金顶胜过护法试锋，于华藏普贤铜殿择定俗家剑脉或华藏净脉、受传《分水峨眉刺》拜入峨眉！',
    startHint:
      '从未加入过任何门派且未学良品及以上武学时，前往【成都府 · 大慈寺（唐宋壁画阁）】即可触发施粥棚护粮风波（或与静虚师太 / 苏梦清交谈开启）。',
    startLocation: {
      regionId: 'chengdu',
      buildingId: 'cd_dacisi',
      spotId: 'cd_dacisi_main',
      customLabel: '成都府 · 大慈寺（唐宋壁画阁）',
    },
    startCondition: EMEI_START_CONDITION,
    summary:
      '{reignYear}灌县春汛过后，大批流民涌入成都大慈寺施粥棚，粮牙地痞趁乱强抢义米。你以未入江湖的白纸之身挺身护住粥锅，与赶回护粮的峨眉俗家首席【苏梦清】联手制住地痞，得驻寺长老【静虚师太】验明身家赐予青玉信物。随后西上【蜀中峨眉山】，于【万年古寺禅院】拜见执法首座「峨眉铁尼」【静玄师太】立下戒律，并在白水荷池修成凡品内功《峨眉吐纳术》。复赴【洗象池灵猴剑坪】击退施放迷烟盗采灵药的采药贼，婉拒私吞百年猴儿酒之诱、守住佛门清心。终登【峨眉金顶睹光台】实打实胜过金顶护法考校，于【华藏金顶普贤铜殿】觐见掌门【云慧师太】，择定心仪一脉并受传《分水峨眉刺》，正式拜入峨眉派！',
    initialStepId: 'dacisi_grain_defense',
    steps: {
      dacisi_grain_defense: {
        id: 'dacisi_grain_defense',
        title: '大慈护粮 · 击退粮牙地痞',
        objective:
          '在【成都府 · 大慈寺（唐宋壁画阁）】协助峨眉派静虚师太与苏梦清护住施粥义米，击退趁乱强抢的粮牙地痞。',
        nextHint: '进入【成都府 · 大慈寺（唐宋壁画阁）】或与【静虚师太】交谈推进。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_dacisi',
          spotId: 'cd_dacisi_main',
          customLabel: '成都府 > 大慈寺（唐宋壁画阁） > 大雄正殿 · 佛前蒲团',
        },
      },
      wannian_iron_nun: {
        id: 'wannian_iron_nun',
        title: '万年古寺 · 铁尼立规习吐纳',
        objective:
          '已获静虚师太青玉信物。请前往【蜀中峨眉山 · 万年古寺禅院 > 回风拂柳演剑方庭】拜见执法首座【静玄师太】，并于白水荷池修习《峨眉吐纳术》！',
        nextHint: '前往【蜀中峨眉山】进入【万年古寺禅院 > 回风拂柳演剑方庭】（或与静玄师太交谈）。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_wannian',
          spotId: 'em_wn_courtyard',
          customLabel: '蜀中峨眉山 > 万年古寺禅院 > 回风拂柳演剑方庭',
        },
      },
      xixiang_protect_monkeys: {
        id: 'xixiang_protect_monkeys',
        title: '洗象护灵 · 拒贪守戒',
        objective:
          '已修成《峨眉吐纳术》第一缕清气！请登临【洗象池灵猴剑坪 > 灵猿戏剑苍松崖坪】，击退用迷烟熏倒山猿的采药贼，护住池畔灵物。',
        nextHint: '前往【洗象池灵猴剑坪 > 灵猿戏剑苍松崖坪】触发护灵之战。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_pond',
          spotId: 'em_pd_monkey',
          customLabel: '蜀中峨眉山 > 洗象池灵猴剑坪 > 灵猿戏剑苍松崖坪',
        },
      },
      jinding_trial_and_oath: {
        id: 'jinding_trial_and_oath',
        title: '金顶试锋 · 佛光择脉入峨眉',
        objective:
          '洗象池护灵清白无垢！请登临【峨眉金顶睹光台 > 华藏金顶普贤铜殿】接下金顶护法考校，并觐见掌门【云慧师太】择脉拜入峨眉。',
        nextHint: '前往【峨眉金顶睹光台 > 华藏金顶普贤铜殿】（或与云慧师太交谈）。',
        targetLocation: {
          regionId: 'emeishan',
          buildingId: 'em_jinding',
          spotId: 'em_jd_hall',
          customLabel: '蜀中峨眉山 > 峨眉金顶睹光台 > 华藏金顶普贤铜殿',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_em_dacisi_start',
        regionId: 'chengdu',
        buildingId: 'cd_dacisi',
        onceFlag: 'em_entry_triggered',
        condition: EMEI_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'em_entry_triggered', value: true },
          { type: 'startQuest', questId: EMEI_ENTRY_QUEST_ID, stepId: 'dacisi_grain_defense', silent: true },
          openScene('SCENE_EM_01_DACISI_PORRIDGE', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_em_wannian_courtyard',
        regionId: 'emeishan',
        buildingId: 'em_wannian',
        spotId: 'em_wn_courtyard',
        onceFlag: 'em_wannian_seen',
        condition: atStep(EMEI_ENTRY_QUEST_ID, 'wannian_iron_nun'),
        effects: [
          { type: 'setFlag', flag: 'em_wannian_seen', value: true },
          openScene('SCENE_EM_04_WANNIAN_JINGXUAN', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_em_xixiang_monkey',
        regionId: 'emeishan',
        buildingId: 'em_pond',
        spotId: 'em_pd_monkey',
        onceFlag: 'em_xixiang_seen',
        condition: atStep(EMEI_ENTRY_QUEST_ID, 'xixiang_protect_monkeys'),
        effects: [
          { type: 'setFlag', flag: 'em_xixiang_seen', value: true },
          openScene('SCENE_EM_07_XIXIANG_POACHER', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_em_jinding_hall',
        regionId: 'emeishan',
        buildingId: 'em_jinding',
        spotId: 'em_jd_hall',
        onceFlag: 'em_jinding_seen',
        condition: atStep(EMEI_ENTRY_QUEST_ID, 'jinding_trial_and_oath'),
        effects: [
          { type: 'setFlag', flag: 'em_jinding_seen', value: true },
          openScene('SCENE_EM_10_JINDING_SPAR', EMEI_ENTRY_QUEST_ID),
        ],
      },
    ],
    spotActions: [
      {
        id: 'spot_act_em_wannian',
        regionId: 'emeishan',
        buildingId: 'em_wannian',
        spotId: 'em_wn_courtyard',
        label: '拜见静玄师太 · 万年寺立规',
        badge: '峨眉筑基',
        tone: 'jade',
        visibleWhen: atStep(EMEI_ENTRY_QUEST_ID, 'wannian_iron_nun'),
        effects: [
          { type: 'setFlag', flag: 'em_wannian_seen', value: true },
          openScene('SCENE_EM_04_WANNIAN_JINGXUAN', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_em_xixiang',
        regionId: 'emeishan',
        buildingId: 'em_pond',
        spotId: 'em_pd_monkey',
        label: '洗象池护灵 · 击退采药贼',
        badge: '洗象守戒',
        tone: 'gold',
        visibleWhen: atStep(EMEI_ENTRY_QUEST_ID, 'xixiang_protect_monkeys'),
        effects: [
          { type: 'setFlag', flag: 'em_xixiang_seen', value: true },
          openScene('SCENE_EM_07_XIXIANG_POACHER', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_em_jinding',
        regionId: 'emeishan',
        buildingId: 'em_jinding',
        spotId: 'em_jd_hall',
        label: '金顶试锋 · 觐见云慧师太',
        badge: '金顶择脉',
        tone: 'gold',
        visibleWhen: atStep(EMEI_ENTRY_QUEST_ID, 'jinding_trial_and_oath'),
        effects: [
          { type: 'setFlag', flag: 'em_jinding_seen', value: true },
          openScene('SCENE_EM_10_JINDING_SPAR', EMEI_ENTRY_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'act_em_jingxu_start',
        label: '呈验白纸身家 · 护住大慈寺施粥棚',
        badge: '峨眉入门',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0206', 'NPC-0207'] },
            EMEI_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'em_entry_triggered', value: true },
          { type: 'startQuest', questId: EMEI_ENTRY_QUEST_ID, stepId: 'dacisi_grain_defense', silent: true },
          openScene('SCENE_EM_01_DACISI_PORRIDGE', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_em_dacisi_resume',
        label: '续行大慈寺护粮除痞',
        badge: '大慈护粮',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0206', 'NPC-0207'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'dacisi_grain_defense'),
          ],
        },
        effects: [openScene('SCENE_EM_01_DACISI_PORRIDGE', EMEI_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_em_jingxuan_wannian',
        label: '拜见静玄师太 · 领受万年寺试炼',
        badge: '万年古寺',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0169'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'wannian_iron_nun'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'em_wannian_seen', value: true },
          openScene('SCENE_EM_04_WANNIAN_JINGXUAN', EMEI_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_em_yunhui_jinding',
        label: '华藏金顶 · 试锋并拜见云慧师太',
        badge: '金顶拜师',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0128'] },
            atStep(EMEI_ENTRY_QUEST_ID, 'jinding_trial_and_oath'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'em_jinding_seen', value: true },
          openScene('SCENE_EM_10_JINDING_SPAR', EMEI_ENTRY_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./emeiEntryQuest.scenes').then((m) => m.SCENES),
  },
]
