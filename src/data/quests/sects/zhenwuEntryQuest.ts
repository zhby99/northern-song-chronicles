import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, flag, openScene } from '../../../engine/quest/dsl'

export const ZHENWU_ENTRY_QUEST_ID = 'QST-SECT-08-ENTRY'

export const ZHENWU_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'neverJoinedAnySect' },
    { type: 'noLearnedArtAtOrAboveTier', tier: '良品下品' },
    flag('shaolin_novice_state', 'eq', 'none'),
    flag('zw_permanently_rejected', 'falsy'),
    { type: 'npcAlive', npcId: 'NPC-0119', npcName: '张玄素' },
    qStatus(ZHENWU_ENTRY_QUEST_ID, 'not_started'),
  ],
}

export const ZHENWU_ENTRY_QUESTS: QuestDefinition[] = [
  {
    id: ZHENWU_ENTRY_QUEST_ID,
    title: '汉水止戈 · 龟蛇问剑',
    category: 'sect_entry',
    factionId: 'SECT-08',
    regionId: 'wudangshan',
    recommendedRealm: '不入流 ～ 三流下品（须从未入过他派且未修习良品及以上武学）',
    maxOpponentRealm: '三流下品（汉水打手、殷峰峰一成力切磋与三峡旧部沈沧）',
    recommendedNote:
      '十四幕真武道宗白纸入门长卷：真武门下只收从未加入过任何门派、且未修习良品及以上武学的白纸弟子！历襄阳汉水码头化解船帮血斗、古隆中取信、观云台解剑饮茶、紫霄禹迹池受传《武当长剑》并以慢缠快接下殷峰峰十招、南岩剑痕崖拆招止戈化解莫清谷三峡旧怨（若嗜杀邀功则当场永绝山门），终登太和紫金正殿择定心志拜入武当。',
    startHint:
      '从未加入过任何门派且未学良品及以上武学时，前往【襄阳府 · 汉水大码头】即可触发船帮泊位风波（或与莫清谷 / 张清溪交谈开启）。',
    startLocation: {
      regionId: 'xiangyang',
      buildingId: 'xy_dock',
      spotId: 'xy_dock_west',
      customLabel: '襄阳府 · 汉水大码头（临江演武船坞）',
    },
    startCondition: ZHENWU_START_CONDITION,
    summary:
      '{reignYear}襄阳汉水大码头，官盐船帮与木筏客争抢泊位剑拔弩张。真武智囊道人【张清溪】与【莫清谷】见你身家清白、未染门户偏见，托你出面斡旋，你依张清溪点拨以凡躯制住掀桌打手、兵不血刃化解血斗。复赴【古隆中草庐】拜会【俞清虚】领药信北上武当，经【天柱绝顶观云台】解剑饮茶，于【紫霄宫 · 禹迹池畔太极坪】观龟蛇而得【宋远乔】亲授《武当长剑》，并以慢剑缠住【殷峰峰】快招。随后在【南岩绝壁试剑崖】拆招化解【莫清谷】的三峡旧怨、绝不嗜杀邀功，终登【太和紫金正殿】在掌教【张玄素】座前甘守三年寂寞慢功，受赐真武松纹道剑拜入真武道宗！',
    initialStepId: 'hanshui_dispute',
    steps: {
      hanshui_dispute: {
        id: 'hanshui_dispute',
        title: '汉水止戈 · 化解泊位之争',
        objective:
          '在【襄阳府 · 汉水大码头】协助真武门下张清溪与莫清谷斡旋官盐船帮与木筏客的泊位争执，制住蛮横打手、消弭血斗。',
        nextHint: '于【襄阳府 · 汉水大码头】完成泊位风波后，张清溪将验明身家并赠解剑木牌。',
        targetLocation: {
          regionId: 'xiangyang',
          buildingId: 'xy_dock',
          spotId: 'xy_dock_west',
          customLabel: '襄阳府 > 汉水大码头 > 临江演武船坞',
        },
      },
      longzhong_letter: {
        id: 'longzhong_letter',
        title: '古隆中呈牌 · 拜会俞长老',
        objective:
          '持莫清谷所赠【武当解剑木牌】，前往襄阳城西【古隆中草庐 > 临风观景轩】拜会玄武真人【俞清虚】，领取紫苏药囊与荐书。',
        nextHint: '前往【襄阳府 · 古隆中草庐】进入【临风观景轩】或与俞清虚交谈。',
        targetLocation: {
          regionId: 'xiangyang',
          buildingId: 'xy_longzhong',
          spotId: 'xy_longzhong_west',
          customLabel: '襄阳府 > 古隆中草庐 > 临风观景轩',
        },
      },
      zixiao_sword_circle: {
        id: 'zixiao_sword_circle',
        title: '观云解剑 · 禹迹池受剑试手',
        objective:
          '北上【武当山真武道宗】，先登【太和绝顶真武金殿 > 天柱绝顶观云台】随执事清鹤饮茶解剑，再赴【紫霄道宫丹房 > 禹迹池畔太极坪】拜见首座【宋远乔】，领受《武当长剑》并接下【殷峰峰】试手。',
        nextHint: '先去【天柱绝顶观云台】解剑饮茶，再去【禹迹池畔太极坪】习剑试手。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_golden',
          spotId: 'wd_golden_west',
          customLabel: '武当山真武道宗 > 太和绝顶真武金殿 > 天柱绝顶观云台',
        },
      },
      nanyan_old_grudge: {
        id: 'nanyan_old_grudge',
        title: '南岩绝壁 · 拆招化旧怨',
        objective:
          '已习得《武当长剑》并胜过殷峰峰试手！请随莫清谷前往【南岩绝壁试剑崖 > 绝壁石刻 · 剑痕崖】送丹，应对三峡水寇旧部沈沧寻仇，切记武当止戈之旨！',
        nextHint: '前往【南岩绝壁试剑崖】进入【绝壁石刻 · 剑痕崖】（或与莫清谷 / 宋远乔 / 殷峰峰交谈）。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_nanyan',
          spotId: 'wd_nanyan_east',
          customLabel: '武当山真武道宗 > 南岩绝壁试剑崖 > 绝壁石刻 · 剑痕崖',
        },
      },
      golden_hall_oath: {
        id: 'golden_hall_oath',
        title: '太和紫金殿 · 甘守慢功入道',
        objective:
          '南岩旧怨既解，寒玉榻调息已毕。请登【太和绝顶真武金殿 > 太和紫金正殿】觐见掌教天师【张玄素】，明心见性、受剑入道！',
        nextHint: '进入【太和绝顶真武金殿 > 太和紫金正殿】（或与张玄素交谈）。',
        targetLocation: {
          regionId: 'wudangshan',
          buildingId: 'wd_golden',
          spotId: 'wd_golden_main',
          customLabel: '武当山真武道宗 > 太和绝顶真武金殿 > 太和紫金正殿',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_zw_hanshui_dock',
        regionId: 'xiangyang',
        buildingId: 'xy_dock',
        onceFlag: 'zw_entry_triggered',
        condition: ZHENWU_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zw_entry_triggered', value: true },
          { type: 'startQuest', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'hanshui_dispute', silent: true },
          openScene('SCENE_ZW_01_HANSHUI_DISPUTE', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_zw_longzhong_yu',
        regionId: 'xiangyang',
        buildingId: 'xy_longzhong',
        spotId: 'xy_longzhong_west',
        onceFlag: 'zw_longzhong_seen',
        condition: atStep(ZHENWU_ENTRY_QUEST_ID, 'longzhong_letter'),
        effects: [
          { type: 'setFlag', flag: 'zw_longzhong_seen', value: true },
          openScene('SCENE_ZW_04_LONGZHONG_YU', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_zw_cloud_tea',
        regionId: 'wudangshan',
        buildingId: 'wd_golden',
        spotId: 'wd_golden_west',
        onceFlag: 'zw_cloud_tea_seen',
        condition: atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_sword_circle'),
        effects: [
          { type: 'setFlag', flag: 'zw_cloud_tea_seen', value: true },
          openScene('SCENE_ZW_05_CLOUD_TEA', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_zw_zixiao_pool',
        regionId: 'wudangshan',
        buildingId: 'wd_zixiao',
        spotId: 'wd_zixiao_west',
        onceFlag: 'zw_zixiao_pool_seen',
        condition: {
          type: 'all',
          conditions: [
            atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_sword_circle'),
            flag('zw_cloud_tea_seen', 'truthy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_zixiao_pool_seen', value: true },
          openScene('SCENE_ZW_07_TURTLE_SNAKE', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_zw_nanyan_cliff',
        regionId: 'wudangshan',
        buildingId: 'wd_nanyan',
        spotId: 'wd_nanyan_east',
        onceFlag: 'zw_nanyan_cliff_seen',
        condition: atStep(ZHENWU_ENTRY_QUEST_ID, 'nanyan_old_grudge'),
        effects: [
          { type: 'setFlag', flag: 'zw_nanyan_cliff_seen', value: true },
          openScene('SCENE_ZW_10_NANYAN_CLIFF', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'trig_zw_golden_hall',
        regionId: 'wudangshan',
        buildingId: 'wd_golden',
        spotId: 'wd_golden_main',
        onceFlag: 'zw_golden_hall_seen',
        condition: atStep(ZHENWU_ENTRY_QUEST_ID, 'golden_hall_oath'),
        effects: [
          { type: 'setFlag', flag: 'zw_golden_hall_seen', value: true },
          openScene('SCENE_ZW_13_GOLDEN_HALL', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
    ],
    spotActions: [
      {
        id: 'spot_act_zw_longzhong',
        regionId: 'xiangyang',
        buildingId: 'xy_longzhong',
        spotId: 'xy_longzhong_west',
        label: '呈递解剑木牌 · 拜会俞清虚',
        badge: '真武引路',
        tone: 'jade',
        visibleWhen: atStep(ZHENWU_ENTRY_QUEST_ID, 'longzhong_letter'),
        effects: [
          { type: 'setFlag', flag: 'zw_longzhong_seen', value: true },
          openScene('SCENE_ZW_04_LONGZHONG_YU', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_zw_cloud_tea',
        regionId: 'wudangshan',
        buildingId: 'wd_golden',
        spotId: 'wd_golden_west',
        label: '观云台饮茶 · 解剑入山',
        badge: '太和解剑',
        tone: 'jade',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_sword_circle'),
            flag('zw_cloud_tea_seen', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_cloud_tea_seen', value: true },
          openScene('SCENE_ZW_05_CLOUD_TEA', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_zw_zixiao_pool',
        regionId: 'wudangshan',
        buildingId: 'wd_zixiao',
        spotId: 'wd_zixiao_west',
        label: '禹迹池观龟蛇 · 授剑试手',
        badge: '紫霄授剑',
        tone: 'jade',
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_sword_circle'),
            flag('zw_cloud_tea_seen', 'truthy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_zixiao_pool_seen', value: true },
          openScene('SCENE_ZW_07_TURTLE_SNAKE', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_zw_nanyan',
        regionId: 'wudangshan',
        buildingId: 'wd_nanyan',
        spotId: 'wd_nanyan_east',
        label: '南岩剑痕崖 · 拆招化怨',
        badge: '南岩止戈',
        tone: 'gold',
        visibleWhen: atStep(ZHENWU_ENTRY_QUEST_ID, 'nanyan_old_grudge'),
        effects: [
          { type: 'setFlag', flag: 'zw_nanyan_cliff_seen', value: true },
          openScene('SCENE_ZW_10_NANYAN_CLIFF', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'spot_act_zw_golden_hall',
        regionId: 'wudangshan',
        buildingId: 'wd_golden',
        spotId: 'wd_golden_main',
        label: '太和紫金正殿 · 拜师入道',
        badge: '太和授剑',
        tone: 'gold',
        visibleWhen: atStep(ZHENWU_ENTRY_QUEST_ID, 'golden_hall_oath'),
        effects: [
          { type: 'setFlag', flag: 'zw_golden_hall_seen', value: true },
          openScene('SCENE_ZW_13_GOLDEN_HALL', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'act_zw_moqinggu_start',
        label: '呈验白纸身家 · 斡旋汉水泊位之争',
        badge: '真武入门',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0209', 'NPC-0208'] },
            ZHENWU_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_entry_triggered', value: true },
          { type: 'startQuest', questId: ZHENWU_ENTRY_QUEST_ID, stepId: 'hanshui_dispute', silent: true },
          openScene('SCENE_ZW_01_HANSHUI_DISPUTE', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_zw_hanshui_resume',
        label: '续行斡旋汉水船帮之争',
        badge: '汉水止戈',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0209', 'NPC-0208'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'hanshui_dispute'),
          ],
        },
        effects: [openScene('SCENE_ZW_01_HANSHUI_DISPUTE', ZHENWU_ENTRY_QUEST_ID)],
      },
      {
        id: 'act_zw_yuqingxu_visit',
        label: '呈递解剑木牌 · 拜会俞长老',
        badge: '古隆中',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: false,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0170'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'longzhong_letter'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_longzhong_seen', value: true },
          openScene('SCENE_ZW_04_LONGZHONG_YU', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_zw_qinghe_tea',
        label: '随清鹤执事登观云台 · 解剑饮茶',
        badge: '太和解剑',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0364'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_sword_circle'),
            flag('zw_cloud_tea_seen', 'falsy'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_cloud_tea_seen', value: true },
          openScene('SCENE_ZW_05_CLOUD_TEA', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_zw_songyuanqiao_zixiao',
        label: '于禹迹池畔拜见宋首座 · 授剑试手',
        badge: '紫霄授剑',
        tone: 'jade',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0148', 'NPC-0502'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'zixiao_sword_circle'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_zixiao_pool_seen', value: true },
          openScene('SCENE_ZW_07_TURTLE_SNAKE', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_zw_nanyan_grudge',
        label: '随莫师叔赴南岩剑痕崖 · 拆招化怨',
        badge: '南岩止戈',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0326', 'NPC-0148', 'NPC-0209'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'nanyan_old_grudge'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_nanyan_cliff_seen', value: true },
          openScene('SCENE_ZW_10_NANYAN_CLIFF', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
      {
        id: 'act_zw_zhangxuansu_oath',
        label: '登太和紫金正殿 · 拜见张真人',
        badge: '太和授剑',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0119'] },
            atStep(ZHENWU_ENTRY_QUEST_ID, 'golden_hall_oath'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zw_golden_hall_seen', value: true },
          openScene('SCENE_ZW_13_GOLDEN_HALL', ZHENWU_ENTRY_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhenwuEntryQuest.scenes').then((m) => m.SCENES),
  },
]
