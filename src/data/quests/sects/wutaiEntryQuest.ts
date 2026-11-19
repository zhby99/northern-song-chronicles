import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const WUTAI_ENTRY_QUEST_ID = 'QST-SECT-03-ENTRY'

export const WUTAI_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus(WUTAI_ENTRY_QUEST_ID, 'not_started'),
    {
      type: 'any',
      hint: '须为无门无派之身，或隶属常山枪派且身怀《常山·定州联合举荐信》',
      conditions: [
        { type: 'notInAnySect' },
        {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-22' },
            { type: 'hasItem', itemId: 'ITM-MSC-013' },
          ],
        },
      ],
    },
    {
      type: 'not',
      condition: flag('song_court_blacklisted', 'truthy'),
      reason: '身负朝廷海捕恶名之人，五台山护国禅林断不容留',
    },
    { type: 'npcAlive', npcId: 'NPC-0123', npcName: '道清' },
    { type: 'npcAlive', npcId: 'NPC-0162', npcName: '智光' },
  ],
}

export const WUTAI_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: WUTAI_ENTRY_QUEST_ID,
    title: '清凉残雪 · 雁门梵钟',
    category: 'sect_entry',
    factionId: 'SECT-03',
    regionId: 'wutaishan',
    recommendedRealm: '不入流 ～ 三流上品（专为零内功白身开局设计的体验长卷）',
    maxOpponentRealm: '不入流窄口守御 / 一流尊者全程助战（零卡关风险）',
    recommendedNote:
      '无门无派（或持《常山·定州联合举荐信》由常山枪派调转）赴五台山清凉寺即可开启。全篇二十幕重体验、重善缘、重资质分支，礼成剃度赐【明】字辈法号并亲授《五郎八卦棍》与《清凉禅定吐纳法》。',
    startHint:
      '前往【五台山清凉寺】，在山门或大雄主殿、松风禅亭与【善松】【智光】【智猛】【道清】任一僧人交谈即可开启风雪叩山门剧情。',
    startLocation: {
      regionId: 'wutaishan',
      buildingId: 'wt_main',
      spotId: 'wt_main_main',
    },
    startCondition: WUTAI_START_CONDITION,
    summary:
      '{reignYear}春寒残雪之际，一介无内功傍身的布衣少年踏上河东五台山清凉寺。于山阶结缘扫雪小沙弥善松，入慈济院煎药试温抚慰失语铁匠遗孤小石锁，登杨五郎演棍石台历经根骨、悟性或风雪苦桩三才试骨，更入冰涧为苦行僧明安寻回十八英烈菩提珠。适逢雁门关急报，少年冒雪独赴李牧古祠与乱石绝壁，以血肉凡躯横白蜡木杆死守石窟洞口护住孤雏，感召小石锁开口求援、随伏虎尊者法严大破契丹北院斥候。归山之后，四方善缘齐聚大雄宝殿作证，少年连答神僧道清三问，金刀落发受戒赐【明】字辈法号，获授《清凉禅定吐纳法》与《五郎八卦棍》，自此化身清凉护国禅僧！',
    initialStepId: 'visit_orphan_hall',
    steps: {
      visit_orphan_hall: {
        id: 'visit_orphan_hall',
        title: '慈院煎药 · 抚慰边孤',
        objective:
          '扫雪沙弥【善松】暗授入门机宜：欲求清凉禅武，先识边关众生之苦。请前往五台山【边关遗孤慈济院 · 正堂议事厅】拜谒首座医僧【智光】，协助煎熬驱寒汤药并安抚受惊失语的铁匠遗孤小石锁。',
        nextHint: '进入五台山【边关遗孤慈济院】，在【正堂议事厅】与【智光】对话。',
        targetLocation: {
          regionId: 'wutaishan',
          buildingId: 'wt_orphan',
          spotId: 'wt_orphan_main',
        },
      },
      visit_staff_terrace: {
        id: 'visit_staff_terrace',
        title: '演棍石台 · 三才试骨',
        objective:
          '已在慈济院结下孤雏善缘并获智光首座亲笔荐书。请持信前往北峰【杨五郎演棍石台 · 五郎八卦演棍主台】，拜见知客首座【铜杵僧 · 智猛】接受力、慧、志三才根器考校。',
        nextHint: '进入五台山【杨五郎演棍石台】，在【五郎八卦演棍主台】与【智猛】对话。',
        targetLocation: {
          regionId: 'wutaishan',
          buildingId: 'wt_staff',
          spotId: 'wt_staff_main',
        },
      },
      pine_pavilion_beads: {
        id: 'pine_pavilion_beads',
        title: '松风禅亭 · 寒涧拾珠',
        objective:
          '石台根器考校已过！智猛命你先移步西侧【松风观云禅亭】饮茶驱寒，顺道探望旧伤发作的苦行僧【明安】。',
        nextHint: '在【杨五郎演棍石台】内切换至西侧【松风观云禅亭】，与【明安】对话。',
        targetLocation: {
          regionId: 'wutaishan',
          buildingId: 'wt_staff',
          spotId: 'wt_staff_west',
        },
      },
      wooden_staff_trial: {
        id: 'wooden_staff_trial',
        title: '白蜡木杆 · 敛气试胆',
        objective:
          '已助明安大师寻回十八子菩提念珠并习得白身卸力口诀。请返回【五郎八卦演棍主台】找知客首座【智猛】，完成三合白蜡木杆试胆考校。',
        nextHint: '回到【五郎八卦演棍主台】，与知客首座【智猛】对话开启三合试胆。',
        targetLocation: {
          regionId: 'wutaishan',
          buildingId: 'wt_staff',
          spotId: 'wt_staff_main',
        },
      },
      go_yanmen_limu: {
        id: 'go_yanmen_limu',
        title: '驰赴雁门 · 李牧古祠',
        objective:
          '雁门关十万火急！辽国北院暗桩四处搜捕神武军老铁匠石百炼。请携小石锁的玄铁残扣与智猛书信，下山奔赴北邻的【雁门关 · 镇边李牧武安君祠】面见护寺武僧总领【伏虎尊者 · 法严】。',
        nextHint: '由大地图前往【雁门关】，进入【镇边李牧武安君祠 · 大雄正殿】与【法严】对话。',
        targetLocation: {
          regionId: 'yanmenguan',
          buildingId: 'ym_limu',
          spotId: 'ym_limu_main',
        },
      },
      guard_yanmen_cliff: {
        id: 'guard_yanmen_cliff',
        title: '乱石绝壁 · 横杖护孤',
        objective:
          '辽探在东口声东击西！请抄山间小径火速赶往雁门关【雁门关外乱石绝壁 · 幽谷石室】，通知重伤的老铁匠石百炼封紧石门，死守待援！',
        nextHint: '在雁门关进入【雁门关外乱石绝壁】，点击【幽谷石室 · 寒玉榻】触发护孤血战。',
        targetLocation: {
          regionId: 'yanmenguan',
          buildingId: 'ym_cliff',
          spotId: 'ym_cliff_main',
        },
      },
      return_wutai_ordination: {
        id: 'return_wutai_ordination',
        title: '归山问心 · 金刀剃度',
        objective:
          '雁门关危局已解，伏虎尊者法严亲授【清凉伏魔铁菩提】印信保举你入寺！请返回【五台山清凉寺 · 清凉寺大雄主殿】，于佛前蒲团拜见方丈【道清】行落发受戒大礼！',
        nextHint: '返回【五台山清凉寺】，进入【清凉寺大雄主殿 · 大雄正殿】与方丈【道清】对话。',
        targetLocation: {
          regionId: 'wutaishan',
          buildingId: 'wt_main',
          spotId: 'wt_main_main',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_wt_yanmen_cliff_auto',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_main',
        condition: atStep(WUTAI_ENTRY_QUEST_ID, 'guard_yanmen_cliff'),
        effects: [openScene('scene_wt_13_cliff_stand', 'QST-SECT-03-ENTRY')],
      },
    ],

    spotActions: [
      {
        id: 'spot_wt_start_at_main_hall',
        regionId: 'wutaishan',
        buildingId: 'wt_main',
        spotId: 'wt_main_main',
        label: '风雪叩山门 · 求拜五台清凉寺',
        badge: '清凉佛缘',
        tone: 'gold',
        visibleWhen: WUTAI_START_CONDITION,
        effects: [openScene('scene_wt_01_snow_gate', 'QST-SECT-03-ENTRY')],
      },
      {
        id: 'spot_wt_guard_yanmen_cliff',
        regionId: 'yanmenguan',
        buildingId: 'ym_cliff',
        spotId: 'ym_cliff_main',
        label: '疾叩石室 · 护佑老铁匠与孤雏',
        badge: '绝壁护生',
        tone: 'gold',
        visibleWhen: atStep(WUTAI_ENTRY_QUEST_ID, 'guard_yanmen_cliff'),
        effects: [openScene('scene_wt_13_cliff_stand', 'QST-SECT-03-ENTRY')],
      },
    ],

    npcActions: [
      // 1) 起始入口：找善松 / 智光 / 智猛 / 道清任一人皆可开启第一幕《五峰残雪叩山门》
      {
        id: 'act_wt_start_entry_quest',
        label: '风雪叩山门 · 诚求清凉剃度机缘',
        badge: '清凉佛缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            {
              type: 'targetNpcMatch',
              npcIds: ['NPC-0941', 'NPC-0162', 'NPC-0199', 'NPC-0123'],
            },
            WUTAI_START_CONDITION,
          ],
        },
        effects: [openScene('scene_wt_01_snow_gate', 'QST-SECT-03-ENTRY')],
      },

      // 2) 第一卷：边关遗孤慈济院找首座医僧【智光】（NPC-0162）煎药抚孤
      {
        id: 'act_wt_orphan_zhiguang',
        label: '协助智光大师 · 药庐煎汤抚孤雏',
        badge: '慈院善缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0162'] },
            atStep(WUTAI_ENTRY_QUEST_ID, 'visit_orphan_hall'),
          ],
        },
        effects: [openScene('scene_wt_03_orphan_hall', 'QST-SECT-03-ENTRY')],
      },

      // 3) 第二卷上：杨五郎演棍石台找知客首座【智猛】（NPC-0199）三才试骨
      {
        id: 'act_wt_terrace_zhimeng_talent',
        label: '呈递智光荐书 · 接受五郎石台试骨',
        badge: '三才试骨',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0199'] },
            atStep(WUTAI_ENTRY_QUEST_ID, 'visit_staff_terrace'),
          ],
        },
        effects: [openScene('scene_wt_06_wulang_terrace', 'QST-SECT-03-ENTRY')],
      },

      // 4) 第二卷中：松风观云禅亭找苦行僧【明安】（NPC-0504）拾取断线菩提珠
      {
        id: 'act_wt_pavilion_mingan_beads',
        label: '上前搀扶明安大师 · 冰涧寻拾菩提珠',
        badge: '禅亭善缘',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0504'] },
            atStep(WUTAI_ENTRY_QUEST_ID, 'pine_pavilion_beads'),
          ],
        },
        effects: [openScene('scene_wt_08_mingan_beads', 'QST-SECT-03-ENTRY')],
      },

      // 5) 第二卷下：回主台找【智猛】（NPC-0199）或【明广】（NPC-0755）进行白蜡木杆三合试胆
      {
        id: 'act_wt_terrace_wooden_spar',
        label: '手执白蜡木杆 · 接受三合敛气试胆',
        badge: '木杆试胆',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0199', 'NPC-0755'] },
            atStep(WUTAI_ENTRY_QUEST_ID, 'wooden_staff_trial'),
          ],
        },
        effects: [openScene('scene_wt_09_staff_spar_pre', 'QST-SECT-03-ENTRY')],
      },

      // 6) 第三卷：雁门关镇边李牧武安君祠找【法严】（NPC-0163）呈交玄铁残扣
      {
        id: 'act_wt_yanmen_fayan_report',
        label: '呈交玄铁残扣 · 驰报五台山急讯',
        badge: '雁门军情',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0163', 'NPC-0546'] },
            atStep(WUTAI_ENTRY_QUEST_ID, 'go_yanmen_limu'),
          ],
        },
        effects: [openScene('scene_wt_12_limu_shrine', 'QST-SECT-03-ENTRY')],
      },

      // 7) 第四卷：归五台山大雄主殿找方丈【道清】（NPC-0123）问心落发受戒
      {
        id: 'act_wt_abbot_daoqing_ordain',
        label: '呈验伏魔铁菩提 · 佛前问心落发受戒',
        badge: '剃度大典',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0123'] },
            atStep(WUTAI_ENTRY_QUEST_ID, 'return_wutai_ordination'),
          ],
        },
        effects: [openScene('scene_wt_17_main_hall_debate', 'QST-SECT-03-ENTRY')],
      },
    ],
    loadScenes: () => import('./wutaiEntryQuest.scenes').then((m) => m.SCENES),
  },
]
