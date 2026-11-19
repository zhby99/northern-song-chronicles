import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q15_QUEST_ID = 'QST-SECT-05-15'

export const HUASHAN_Q15_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    qStatus('QST-SECT-05-13', 'completed'),
    {
      type: 'flag',
      flag: 'hs_cave',
      op: 'eq',
      value: 'usurp',
      label: '思过崖抉择：私拓秘刻（魔刻噬心）',
    },
    qStatus('QST-SECT-05-14', 'not_completed'),
    qStatus(HUASHAN_Q15_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q15_QUEST: QuestDefinition = {
  id: HUASHAN_Q15_QUEST_ID,
  title: '魔刻噬心 · 破尽同门',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流中品',
  maxOpponentRealm: '一流下品（玉女峰东峰月度校剑精英师兄）',
  recommendedNote:
    '华山派思过崖霸道夺位分支长卷（二十幕）。承接《寒风面壁》中【私拓秘刻】抉择，暗夜于【秘洞古剑刻石室】烛光私拓克制华山全派武学的残招、重锁石门，领悟专属霸道被动「破岳诡剑」（对华山功法增伤25%），气宗弟子更自骸骨遗卷偷学《夺命连环三仙剑》！随后东峰校剑重创同门师兄，获封不弃寒庐密召共谋夺权大计！',
  startHint:
    '在《寒风面壁 · 铁锁惊雷》中选择【私拓秘刻】后，于【思过崖古山洞 · 秘洞古剑刻石室】暗夜拓印魔刻开启。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_siguoya',
    spotId: 'tg_sg_cave',
    customLabel: '潼关 / 西岳华山 · 思过崖古山洞 · 秘洞古剑刻石室',
  },
  startCondition: HUASHAN_Q15_START_CONDITION,
  summary:
    '{reignYear}思过崖暗夜幽深，你低语「成王败寇，何拘同门外敌」，于【秘洞古剑刻石室】摇曳烛火下将破尽华山气剑诸学的魔刻悉数私拓默记，更从前辈枯骨怀中搜得《夺命连环三仙剑》残卷，练成专克本门的「破岳诡剑」后重锁石门秘而不宣。数日后【东峰紫气迎曦石坪】门内校剑，你寥寥数剑便以刁钻狠辣的破招洞穿同门师兄护体剑幕令其吐血重伤！岳沧溟与宁清羽惊觉你剑中森然霸意，而封不弃却暗夜传信长安寒庐狂喜召见，与你定下倾覆紫霞、夺掌西岳之密谋！',
  initialStepId: 'q15_terrace_spar',
  steps: {
    q15_terrace_spar: {
      id: 'q15_terrace_spar',
      title: '东峰校剑 · 诡刺伤同',
      objective:
        '已于白骨前习成「破岳诡剑」并重锁后洞石门！请返回【玉女峰紫霞道观 · 东峰紫气迎曦石坪】参加门内朔望校剑，检验克制本门武学的霸道威力！',
      nextHint:
        '前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】触发门内校剑。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
      },
    },
    q15_changan_plot: {
      id: 'q15_changan_plot',
      title: '寒庐夜召 · 密谋夺宗',
      objective:
        '东峰校剑一刺惊四座，袖中悄然多出一封封不弃的暗夜密柬！请星夜下山赶赴【京兆府 · 西市胡商坊 · 车马行栈】后庐密见封不弃！',
      nextHint:
        '前往【京兆府 · 西市胡商坊 · 车马行栈 · 镖局坪（ca_xishi_west）】，点击「暗夜叩开寒庐 · 密会封不弃共商霸图」。',
      targetLocation: {
        regionId: 'changan',
        buildingId: 'ca_xishi',
        spotId: 'ca_xishi_west',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_hsq15_terrace_spar',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      onceFlag: 'hsq15_terrace_spar_triggered',
      condition: atStep(HUASHAN_Q15_QUEST_ID, 'q15_terrace_spar'),
      effects: [openScene('scene_hsq15_07', HUASHAN_Q15_QUEST_ID)],
    },
    {
      id: 'trig_hsq15_changan_plot',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_west',
      onceFlag: 'hsq15_changan_plot_triggered',
      condition: atStep(HUASHAN_Q15_QUEST_ID, 'q15_changan_plot'),
      effects: [openScene('scene_hsq15_15', HUASHAN_Q15_QUEST_ID)],
    },
  ],
  spotActions: [
    {
      id: 'spot_hsq15_start_cave',
      label: '秉烛私拓石壁魔刻 · 对白骨习破岳诡剑（开启《魔刻噬心》）',
      badge: '暗夜私拓',
      subtitle: '秘洞古剑刻石室 · 成王败寇',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      visibleWhen: HUASHAN_Q15_START_CONDITION,
      effects: [openScene('scene_hsq15_01', HUASHAN_Q15_QUEST_ID)],
    },
    {
      id: 'spot_hsq15_terrace_spar',
      label: '登东峰演武石坪 · 门内校剑试演破岳诡招',
      badge: '诡剑伤同',
      subtitle: '东峰紫气迎曦石坪 · 一剑破尽同门',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      visibleWhen: atStep(HUASHAN_Q15_QUEST_ID, 'q15_terrace_spar'),
      effects: [openScene('scene_hsq15_07', HUASHAN_Q15_QUEST_ID)],
    },
    {
      id: 'spot_hsq15_changan_plot',
      label: '暗夜叩开寒庐 · 密会封不弃共商霸图',
      badge: '寒庐密谋',
      subtitle: '西市车马行栈后庐 · 倾覆紫霞之盟',
      tone: 'danger',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_west',
      visibleWhen: atStep(HUASHAN_Q15_QUEST_ID, 'q15_changan_plot'),
      effects: [openScene('scene_hsq15_15', HUASHAN_Q15_QUEST_ID)],
    },
  ],
  npcActions: [
    {
      id: 'act_hsq15_feng_start_backup',
      label: '重返思过崖石室私拓秘刻 · 开启《魔刻噬心 · 破尽同门》',
      badge: '暗夜私拓',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167', 'NPC-0118'] },
          HUASHAN_Q15_START_CONDITION,
        ],
      },
      effects: [
        { type: 'teleportPlayer', regionId: 'tongguan', buildingId: 'tg_siguoya', spotId: 'tg_sg_cave' },
        openScene('scene_hsq15_01', HUASHAN_Q15_QUEST_ID),
      ],
    },
    {
      id: 'act_hsq15_feng_plot',
      label: '出示袖中密柬 · 与封师叔密议夺掌西岳大计',
      badge: '寒庐密谋',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
          atStep(HUASHAN_Q15_QUEST_ID, 'q15_changan_plot'),
        ],
      },
      effects: [openScene('scene_hsq15_15', HUASHAN_Q15_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./huashanCaveUsurpQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q15_QUESTS: QuestDefinition[] = [HUASHAN_Q15_QUEST]
