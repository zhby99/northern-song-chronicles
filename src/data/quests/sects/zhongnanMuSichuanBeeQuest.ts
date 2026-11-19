import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q14_QUEST_ID = 'QST-SECT-11-14'

export const ZHONGNAN_Q14_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 2 },
    qStatus('QST-SECT-11-13', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q14_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0316', npcName: '苏百草' },
    { type: 'npcAlive', npcId: 'NPC-0067', npcName: '唐慎微' },
    { type: 'npcAlive', npcId: 'NPC-0219', npcName: '唐红袖' },
  ],
}

export const ZHONGNAN_Q14_QUESTS: QuestDefinition[] = [
  {
    id: ZHONGNAN_Q14_QUEST_ID,
    title: '玉蜂琼浆 · 蜀道求药',
    category: 'sect_mission',
    factionId: 'SECT-11',
    regionId: 'chengdu',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（蜀中唐门 · 毒观音 唐红袖 / 青城抢药恶徒）',
    recommendedNote:
      '终南古墓主干第三卷（全二十二幕）。活死人墓玉蜂染上西夏瘴毒瘟疫！你翻越剑门关悬空栈道入蜀，遍访成都西川百草药武堂苏百草、青羊道宫名医唐慎微，勇赴青城山万毒试炼涧悬栈采得紫雪断肠花，又于锦江万里桥茶肆与唐红袖切磋交易并击退抢药青城恶徒，终携奇药返墓救活玉蜂！',
    startHint:
      '完成《西市飞霜 · 踏雪无痕》后，前往【终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩】查探玉蜂染瘴危情。',
    startLocation: {
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_honey',
      customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩',
    },
    startCondition: ZHONGNAN_Q14_START_CONDITION,
    summary:
      '{reignYear}盛夏，果如西市密档所料，古墓【玉蜂百花酿蜜幽轩】中大批玉蜂染上奇异瘴毒，奄奄一息！你受命入蜀寻药：先越【剑门关 · 剑阁鸟道悬空栈】入天府之国，于【成都府 · 西川百草药武堂】拜访药王【苏百草】，再赴【青羊道宫】请教名医【唐慎微】定下「紫雪断肠花配百毒清露」之奇方；随后冒险攀上【青城山 · 唐门万毒试炼涧 · 飞瀑铁索采药悬栈】采得紫雪断肠花，于【成都府 · 锦江万里桥茶肆】与蜀中唐门【唐红袖】切磋换药并击退抢药青城恶徒，星夜北返救活古墓玉蜂！',
    initialStepId: 'cross_jianmen',
    steps: {
      cross_jianmen: {
        id: 'cross_jianmen',
        title: '蜀道难行 · 飞渡剑阁',
        objective:
          '玉蜂染瘴危在旦夕！请南下取道【剑门关 · 剑阁鸟道悬空栈】入蜀求药！',
        nextHint:
          '前往【剑门关（jianmenguan） · 剑阁鸟道悬空栈（jm_plank / jm_plank_main）】，运起踏雪无痕翻越蜀道天险。',
        targetLocation: {
          regionId: 'jianmenguan',
          buildingId: 'jm_plank',
          spotId: 'jm_plank_main',
          customLabel: '剑门关 · 剑阁鸟道悬空栈',
        },
      },
      visit_su_baicao: {
        id: 'visit_su_baicao',
        title: '百草药堂 · 寻访药王',
        objective:
          '已翻越剑门关入蜀！请前往【成都府 · 西川百草药武堂】拜访「锦江药王」苏百草，求问化解玉蜂瘴毒之法。',
        nextHint:
          '前往【成都府（chengdu） · 西川百草药武堂（cd_baicao / cd_baicao_main）】，拜见苏百草。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_baicao',
          spotId: 'cd_baicao_main',
          customLabel: '成都府 · 西川百草药武堂',
        },
      },
      visit_tang_shenwei: {
        id: 'visit_tang_shenwei',
        title: '青羊问道 · 审元定方',
        objective:
          '苏百草虽辨出瘴毒源头，却缺以毒攻毒的古方君药！请前往【成都府 · 青羊道宫】请教大宋医家名士唐慎微。',
        nextHint:
          '前往【成都府（chengdu） · 青羊道宫（cd_qingyang / cd_qingyang_main）】，拜见唐慎微求取解毒奇方。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_qingyang',
          spotId: 'cd_qingyang_main',
          customLabel: '成都府 · 青羊道宫',
        },
      },
      pick_purple_flower: {
        id: 'pick_purple_flower',
        title: '万毒悬栈 · 采紫雪花',
        objective:
          '唐慎微已定下以毒攻毒奇方，主药「紫雪断肠花」仅生于青城险崖！请前往【青城山 · 唐门万毒试炼涧 · 飞瀑铁索采药悬栈】采药！',
        nextHint:
          '前往【青城山（qingcheng） · 唐门万毒试炼涧 · 飞瀑铁索采药悬栈（qc_ps_bridge）】，采集紫雪断肠花。',
        targetLocation: {
          regionId: 'qingcheng',
          buildingId: 'qc_poison',
          spotId: 'qc_ps_bridge',
          customLabel: '青城山 · 唐门万毒试炼涧 · 飞瀑铁索采药悬栈',
        },
      },
      teahouse_tang_hongxiu: {
        id: 'teahouse_tang_hongxiu',
        title: '锦江茶肆 · 切磋换露',
        objective:
          '已采得紫雪断肠花！尚需蜀中唐门独门药引方能中和花毒，请前往【成都府 · 锦江万里桥茶肆】会晤「毒观音」唐红袖！',
        nextHint:
          '前往【成都府（chengdu） · 锦江万里桥茶肆（cd_teahouse / cd_teahouse_main）】，与唐红袖切磋交易并防备抢药之徒。',
        targetLocation: {
          regionId: 'chengdu',
          buildingId: 'cd_teahouse',
          spotId: 'cd_teahouse_main',
          customLabel: '成都府 · 锦江万里桥茶肆',
        },
      },
      return_save_bees: {
        id: 'return_save_bees',
        title: '星夜北返 · 琼浆救蜂',
        objective:
          '紫雪断肠花与唐门解毒灵露俱已到手！请速返【终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩】救活玉蜂！',
        nextHint:
          '返回【终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩（zn_tb_honey）】，配药救治玉蜂。',
        targetLocation: {
          regionId: 'zhongnanshan',
          buildingId: 'zn_tomb',
          spotId: 'zn_tb_honey',
          customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_znq14_start',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_honey',
        onceFlag: 'zn_q14_start_triggered',
        condition: ZHONGNAN_Q14_START_CONDITION,
        effects: [openScene('scene_znq14_01', ZHONGNAN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_znq14_jianmen',
        regionId: 'jianmenguan',
        buildingId: 'jm_plank',
        spotId: 'jm_plank_main',
        onceFlag: 'zn_q14_jm_triggered',
        condition: atStep(ZHONGNAN_Q14_QUEST_ID, 'cross_jianmen'),
        effects: [openScene('scene_znq14_04', ZHONGNAN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_znq14_baicao',
        regionId: 'chengdu',
        buildingId: 'cd_baicao',
        spotId: 'cd_baicao_main',
        onceFlag: 'zn_q14_baicao_triggered',
        condition: atStep(ZHONGNAN_Q14_QUEST_ID, 'visit_su_baicao'),
        effects: [openScene('scene_znq14_06', ZHONGNAN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_znq14_qingyang',
        regionId: 'chengdu',
        buildingId: 'cd_qingyang',
        spotId: 'cd_qingyang_main',
        onceFlag: 'zn_q14_qingyang_triggered',
        condition: atStep(ZHONGNAN_Q14_QUEST_ID, 'visit_tang_shenwei'),
        effects: [openScene('scene_znq14_09', ZHONGNAN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_znq14_bridge',
        regionId: 'qingcheng',
        buildingId: 'qc_poison',
        spotId: 'qc_ps_bridge',
        onceFlag: 'zn_q14_bridge_triggered',
        condition: atStep(ZHONGNAN_Q14_QUEST_ID, 'pick_purple_flower'),
        effects: [openScene('scene_znq14_12', ZHONGNAN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_znq14_teahouse',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        spotId: 'cd_teahouse_main',
        onceFlag: 'zn_q14_tea_triggered',
        condition: atStep(ZHONGNAN_Q14_QUEST_ID, 'teahouse_tang_hongxiu'),
        effects: [openScene('scene_znq14_15', ZHONGNAN_Q14_QUEST_ID)],
      },
      {
        id: 'trig_znq14_return',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_honey',
        onceFlag: 'zn_q14_return_triggered',
        condition: atStep(ZHONGNAN_Q14_QUEST_ID, 'return_save_bees'),
        effects: [openScene('scene_znq14_20', ZHONGNAN_Q14_QUEST_ID)],
      },
    ],
    spotActions: [
      {
        id: 'spot_znq14_start',
        label: '【蜀道求药】查看玉蜂百花幽轩 · 救治染瘴玉蜂',
        badge: '古墓主干',
        subtitle: '第一幕 · 玉蜂百花酿蜜幽轩',
        tone: 'gold',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_honey',
        visibleWhen: ZHONGNAN_Q14_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'zn_q14_start_triggered', value: true },
          openScene('scene_znq14_01', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq14_jianmen',
        label: '【蜀道求药】踏雪飞渡剑阁悬空栈道',
        badge: '蜀道难行',
        subtitle: '第四幕 · 剑阁鸟道悬空栈',
        tone: 'primary',
        regionId: 'jianmenguan',
        buildingId: 'jm_plank',
        spotId: 'jm_plank_main',
        visibleWhen: atStep(ZHONGNAN_Q14_QUEST_ID, 'cross_jianmen'),
        effects: [
          { type: 'setFlag', flag: 'zn_q14_jm_triggered', value: true },
          openScene('scene_znq14_04', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq14_baicao',
        label: '【蜀道求药】拜访锦江药王苏百草 · 辨识蜂瘴',
        badge: '百草药堂',
        subtitle: '第六幕 · 西川百草药武堂',
        tone: 'primary',
        regionId: 'chengdu',
        buildingId: 'cd_baicao',
        spotId: 'cd_baicao_main',
        visibleWhen: atStep(ZHONGNAN_Q14_QUEST_ID, 'visit_su_baicao'),
        effects: [
          { type: 'setFlag', flag: 'zn_q14_baicao_triggered', value: true },
          openScene('scene_znq14_06', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq14_qingyang',
        label: '【蜀道求药】拜见名医唐慎微 · 求取解毒奇方',
        badge: '青羊问道',
        subtitle: '第九幕 · 青羊道宫',
        tone: 'primary',
        regionId: 'chengdu',
        buildingId: 'cd_qingyang',
        spotId: 'cd_qingyang_main',
        visibleWhen: atStep(ZHONGNAN_Q14_QUEST_ID, 'visit_tang_shenwei'),
        effects: [
          { type: 'setFlag', flag: 'zn_q14_qingyang_triggered', value: true },
          openScene('scene_znq14_09', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq14_bridge',
        label: '【蜀道求药】踏铁索悬栈 · 采摘紫雪断肠花',
        badge: '万毒采药',
        subtitle: '第十二幕 · 飞瀑铁索采药悬栈',
        tone: 'gold',
        regionId: 'qingcheng',
        buildingId: 'qc_poison',
        spotId: 'qc_ps_bridge',
        visibleWhen: atStep(ZHONGNAN_Q14_QUEST_ID, 'pick_purple_flower'),
        effects: [
          { type: 'setFlag', flag: 'zn_q14_bridge_triggered', value: true },
          openScene('scene_znq14_12', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq14_teahouse',
        label: '【蜀道求药】入锦江茶肆 · 会晤唐红袖换药退敌',
        badge: '茶肆风波',
        subtitle: '第十五幕 · 锦江万里桥茶肆',
        tone: 'danger',
        regionId: 'chengdu',
        buildingId: 'cd_teahouse',
        spotId: 'cd_teahouse_main',
        visibleWhen: atStep(ZHONGNAN_Q14_QUEST_ID, 'teahouse_tang_hongxiu'),
        effects: [
          { type: 'setFlag', flag: 'zn_q14_tea_triggered', value: true },
          openScene('scene_znq14_15', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'spot_znq14_return',
        label: '【蜀道求药】返玉蜂幽轩 · 调配琼浆救活玉蜂',
        badge: '琼浆救蜂',
        subtitle: '第二十幕 · 玉蜂百花酿蜜幽轩',
        tone: 'jade',
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_honey',
        visibleWhen: atStep(ZHONGNAN_Q14_QUEST_ID, 'return_save_bees'),
        effects: [
          { type: 'setFlag', flag: 'zn_q14_return_triggered', value: true },
          openScene('scene_znq14_20', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
    ],
    npcActions: [
      {
        id: 'npc_znq14_su',
        label: '【蜀道求药】请锦江药王查验终南玉蜂瘴毒',
        badge: '辨识蜂瘴',
        tone: 'primary',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHONGNAN_Q14_QUEST_ID, 'visit_su_baicao'),
            { type: 'targetNpcMatch', npcIds: ['NPC-0316'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q14_baicao_triggered', value: true },
          openScene('scene_znq14_06', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
      {
        id: 'npc_znq14_tang_sw',
        label: '【蜀道求药】向唐慎微先生请教解毒古方',
        badge: '求取奇方',
        tone: 'primary',
        showInBottomBar: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            atStep(ZHONGNAN_Q14_QUEST_ID, 'visit_tang_shenwei'),
            { type: 'targetNpcMatch', npcIds: ['NPC-0067'] },
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'zn_q14_qingyang_triggered', value: true },
          openScene('scene_znq14_09', ZHONGNAN_Q14_QUEST_ID),
        ],
      },
    ],
    loadScenes: () => import('./zhongnanMuSichuanBeeQuest.scenes').then((m) => m.SCENES),
  },
]
