import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q05_QUEST_ID = 'QST-SECT-05-05'

export const HUASHAN_Q05_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 2 },
    qStatus('QST-SECT-05-04', 'completed'),
    {
      type: 'flag',
      flag: 'hs_branch',
      op: 'eq',
      value: 'qi',
      label: '华山气宗正脉弟子',
    },
    { type: 'learnedArtAtLeast', artId: 'MA-109', minLevel: 3 },
    qStatus(HUASHAN_Q05_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
  ],
}

export const HUASHAN_Q05_QUESTS: QuestDefinition[] = [
  {
    id: HUASHAN_Q05_QUEST_ID,
    title: '楼观护道 · 希夷剑韵',
    category: 'sect_mission',
    factionId: 'SECT-05',
    regionId: 'tongguan',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（姑苏慕容还施水阁搜书使 · 慕容彦）',
    recommendedNote:
      '华山气宗正脉 Lv.2 晋升 Lv.3 真传弟子大戏（全二十二幕）。须完成《渭水惊澜 · 混元破寨》且《华山混元掌》达三重。奉掌门岳沧溟之命携礼赴终南古观礼敬五代宋初华山睡仙陈抟（希夷先生）遗脉、迎回古道藏遗卷；归途子午谷松碑林遭姑苏慕容“还施水阁”伪装道人伏击，得宁清羽驰援临阵传授地阶《希夷剑法》（MA-089），以无相剑幕重创一流下品强敌，返山晋升【真传弟子】！',
    startHint:
      '完成《渭水惊澜 · 混元破寨》并将《华山混元掌》修至三重后，前往【玉女峰紫霞道观 · 紫霞正气主殿】面见掌门【岳沧溟】（或寻宁清羽）领受护道重任。',
    startLocation: {
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
    },
    startCondition: HUASHAN_Q05_START_CONDITION,
    summary:
      '{reignYear}初冬，掌门【岳沧溟】召你入【紫霞正气主殿】，命你携西岳清供南赴【终南山隐宗 · 重阳古观前脉道院】，礼敬五代宋初华山道祖睡仙陈抟（希夷先生）法脉，并于经阁解开博台古棋残局，迎奉《希夷手泽道卷》归山。北返途经子午谷松碑古林时，遭伪装游方道人的姑苏慕容氏“还施水阁”精锐搜书客伏击！【宁清羽】翩然驰援，于古碑松涛间临阵传授地阶下品《希夷剑法》。你领悟“视之不见名曰夷、听之不闻名曰希”之无相剑意，生死决战重创并击退一流下品搜书使慕容彦，护卷返山获擢升为华山派【真传弟子】！',
    initialStepId: 'louguan_homage',
    steps: {
      louguan_homage: {
        id: 'louguan_homage',
        title: '捧礼南行 · 楼观礼祖',
        objective:
          '已奉掌门岳沧溟法旨携礼下山！请前往【终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿】，参拜睡仙陈抟（希夷先生）遗脉并呈递华山法帖！',
        nextHint:
          '前往【终南山隐宗（zhongnanshan） · 重阳古观前脉道院 · 重阳玄门清修主殿（zn_to_hall）】，点击「呈递华山紫霞法帖 · 参拜希夷先生道统」。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_hall',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 重阳玄门清修主殿',
        },
      },
      louguan_scroll_vault: {
        id: 'louguan_scroll_vault',
        title: '经阁残局 · 恭迎道卷',
        objective:
          '已于玄门主殿礼敬希夷先祖！请随玄静观主步入后院【道藏经阁与紫金丹院】，参悟陈抟古谱残棋并迎奉《希夷手泽道卷》！',
        nextHint:
          '前往同建筑内【道藏经阁与紫金丹院（zn_to_alchemy）】，点击「入道藏经阁对弈 · 恭迎希夷手泽道卷」。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tao',
          spotId: 'zn_to_alchemy',
          customLabel: '终南山隐宗 · 重阳古观前脉道院 · 道藏经阁与紫金丹院',
        },
      },
      ziwu_pine_ambush: {
        id: 'ziwu_pine_ambush',
        title: '子午松碑 · 希夷破敌',
        objective:
          '已恭迎《希夷手泽道卷》，但闻近日有江南口音的假道人窥伺经阁！请背负道卷途经【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪】（子午谷松碑古道）谨慎北返！',
        nextHint:
          '前往【终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，点击「护送希夷道卷穿行子午谷松碑林」。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_stream',
          spotId: 'zn_st_sword',
          customLabel: '终南山隐宗 · 子午谷松碑古林（繁花幽谷双剑合璧坪）',
        },
      },
      escort_return_zixia: {
        id: 'escort_return_zixia',
        title: '奉卷归岳 · 真传授绶',
        objective:
          '已以《希夷剑法》重创并击退姑苏慕容还施水阁搜书使！请护送毫发无损的《希夷手泽道卷》返回【潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿】向岳沧溟复命晋升真传！',
        nextHint:
          '返回【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】，点击「呈奉希夷手泽道卷 · 领受真传弟子紫绶」或与岳沧溟交谈。',
        targetLocation: {
          regionId: 'tongguan',
          buildingId: 'tg_zixia',
          spotId: 'tg_zx_hall',
          customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_hsq05_start_hall',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'hs_q05_start_triggered',
        condition: HUASHAN_Q05_START_CONDITION,
        effects: [openScene('scene_hsq05_01', HUASHAN_Q05_QUEST_ID)],
      },
      {
        id: 'trig_hsq05_louguan_hall',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        onceFlag: 'hs_q05_louguan_triggered',
        condition: atStep(HUASHAN_Q05_QUEST_ID, 'louguan_homage'),
        effects: [openScene('scene_hsq05_04', HUASHAN_Q05_QUEST_ID)],
      },
      {
        id: 'trig_hsq05_louguan_vault',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        onceFlag: 'hs_q05_vault_triggered',
        condition: atStep(HUASHAN_Q05_QUEST_ID, 'louguan_scroll_vault'),
        effects: [openScene('scene_hsq05_06', HUASHAN_Q05_QUEST_ID)],
      },
      {
        id: 'trig_hsq05_ziwu_ambush',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        onceFlag: 'hs_q05_ambush_triggered',
        condition: atStep(HUASHAN_Q05_QUEST_ID, 'ziwu_pine_ambush'),
        effects: [openScene('scene_hsq05_09', HUASHAN_Q05_QUEST_ID)],
      },
      {
        id: 'trig_hsq05_return_hall',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        onceFlag: 'hs_q05_return_triggered',
        condition: atStep(HUASHAN_Q05_QUEST_ID, 'escort_return_zixia'),
        effects: [openScene('scene_hsq05_19', HUASHAN_Q05_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_hsq05_start_hall',
        label: '【气宗真传试】入紫霞正气主殿 · 领受终南迎奉希夷遗卷法旨',
        badge: '楼观护道',
        subtitle: '气宗上篇 · 紫霞正气主殿',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: HUASHAN_Q05_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'hs_q05_start_triggered', value: true },
          openScene('scene_hsq05_01', HUASHAN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq05_louguan_homage',
        label: '【楼观护道】呈递华山紫霞法帖 · 参拜希夷先生道统',
        badge: '楼观礼祖',
        subtitle: '第四幕 · 重阳玄门清修主殿',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_hall',
        visibleWhen: atStep(HUASHAN_Q05_QUEST_ID, 'louguan_homage'),
        effects: [
          { type: 'setFlag', flag: 'hs_q05_louguan_triggered', value: true },
          openScene('scene_hsq05_04', HUASHAN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq05_louguan_vault',
        label: '【楼观护道】入道藏经阁对弈 · 恭迎希夷手泽道卷',
        badge: '经阁迎卷',
        subtitle: '第六幕 · 道藏经阁与紫金丹院',
        tone: 'primary',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tao',
        spotId: 'zn_to_alchemy',
        visibleWhen: atStep(HUASHAN_Q05_QUEST_ID, 'louguan_scroll_vault'),
        effects: [
          { type: 'setFlag', flag: 'hs_q05_vault_triggered', value: true },
          openScene('scene_hsq05_06', HUASHAN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq05_ziwu_ambush',
        label: '【楼观护道】护送希夷道卷穿行子午谷松碑林',
        badge: '松碑伏击',
        subtitle: '第九幕 · 迎战姑苏慕容还施水阁搜书使',
        tone: 'danger',
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        visibleWhen: atStep(HUASHAN_Q05_QUEST_ID, 'ziwu_pine_ambush'),
        effects: [
          { type: 'setFlag', flag: 'hs_q05_ambush_triggered', value: true },
          openScene('scene_hsq05_09', HUASHAN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'spot_hsq05_return_hall',
        label: '【楼观护道】呈奉希夷手泽道卷 · 领受真传弟子紫绶',
        badge: '晋升真传',
        subtitle: '第十九幕 · 紫霞正气主殿',
        tone: 'gold',
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        visibleWhen: atStep(HUASHAN_Q05_QUEST_ID, 'escort_return_zixia'),
        effects: [
          { type: 'setFlag', flag: 'hs_q05_return_triggered', value: true },
          openScene('scene_hsq05_19', HUASHAN_Q05_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_hsq05_start_npc',
        label: '奉召领受终南古观迎奉《希夷手泽道卷》重任',
        badge: '楼观护道',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
            HUASHAN_Q05_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q05_start_triggered', value: true },
          openScene('scene_hsq05_01', HUASHAN_Q05_QUEST_ID),
        ],
      },
      {
        id: 'act_hsq05_return_npc',
        label: '呈奉《希夷手泽道卷》 · 禀报子午谷剑挫慕容搜书客',
        badge: '晋升真传',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0166'] },
            atStep(HUASHAN_Q05_QUEST_ID, 'escort_return_zixia'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'hs_q05_return_triggered', value: true },
          openScene('scene_hsq05_19', HUASHAN_Q05_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./huashanQiXiyiQuest.scenes').then((m) => m.SCENES),
  },
]
