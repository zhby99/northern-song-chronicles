import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q20_QUEST_ID = 'QST-SECT-05-20'

export const HUASHAN_Q20_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 4 },
    qStatus('QST-SECT-05-18', 'completed'),
    qStatus('QST-SECT-05-15', 'completed'),
    { type: 'flag', flag: 'hs_branch', op: 'eq', value: 'jian', label: '华山剑宗支脉传人' },
    { type: 'flag', flag: 'hs_cave', op: 'eq', value: 'usurp', label: '曾于思过崖私拓秘刻（魔刻噬心）' },
    { type: 'learnedArtAtLeast', artId: 'MA-007', minLevel: 5 },
    qStatus(HUASHAN_Q20_QUEST_ID, 'not_started'),
    qStatus('QST-SECT-05-21', 'not_completed'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
  ],
}

export const HUASHAN_Q20_QUEST: QuestDefinition = {
  id: HUASHAN_Q20_QUEST_ID,
  title: '剑压紫霞 · 逆夺太岳',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '宗师中品（华山剑宗霸道夺位 Lv.5 终局）',
  maxOpponentRealm: '宗师中品（高沧云 · 宁清羽 · 秦烈山 · 满功紫霞岳沧溟 · 西夏主帅拓跋雄）',
  recommendedNote:
    '三十八幕华山剑宗霸道夺权终局长卷：身兼《独孤九剑》与《破岳诡剑》，由封不弃率剑宗群雄拥戴踏雪直上玉女峰连闯四重剑关——东峰石坪破剑式挑翻高沧云强夺《华山紫霞剑客衫》、演剑院破掌式挫败宁清羽、苍龙岭十五合硬破秦烈山《太岳三青峰》、紫霞正气主殿以破气式刺穿岳沧溟漫天紫气漩涡逆夺《太岳紫霞长剑》！继而下山血洗风陵夏营斩杀拓跋雄，霸道登基 Lv.5 西岳霸剑宗主！',
  startHint:
    '剑宗私拓秘刻线完结《独孤求败》且将《独孤九剑》修至第五重后，前往【思过崖古山洞 · 面壁思过寒风剑坪】（或寻封不弃）开启踏雪逼宫之局。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_siguoya',
    spotId: 'tg_sg_ledge',
    customLabel: '潼关 / 西岳华山 · 思过崖古山洞 · 面壁思过寒风剑坪',
  },
  startCondition: HUASHAN_Q20_START_CONDITION,
  summary:
    '{reignYear}冬雪初临，你将《独孤九剑》修至大成，与昔日私拓之《破岳诡剑》奇正交融、锋芒无匹。在剑宗宿老【封不弃】率众拥戴下，你踏雪直上玉女峰终结气宗三十载统治，连破四座剑关：首关东峰石坪以“破剑式”挑碎【高沧云】剑幕，强夺镇派宝衣《华山紫霞剑客衫》；二关清泉演剑院以“破掌式”封退【宁清羽】；三关苍龙岭朝阳孤松下十五合硬破潼关剑神【秦烈山】《太岳三青峰》；终关紫霞正气主殿正面硬撼催动十成《紫霞神功》的掌门【岳沧溟】，以至高“破气式”直贯漫天紫气漩涡震飞其佩剑！岳沧溟长叹退隐后山，你拾起镇派神兵《太岳紫霞长剑》，旋即率军疾下潼关血洗风陵西夏大营、阵斩主帅【拓跋雄】，携滔天凶威回山登基西岳霸剑宗主！',
  initialStepId: 'gate1_gao',
  steps: {
    gate1_gao: {
      id: 'gate1_gao',
      title: '首关东峰 · 破剑夺衫',
      objective:
        '思过崖誓师已毕！请随封不弃率剑宗群雄踏雪登上【玉女峰紫霞道观 · 东峰紫气迎曦石坪】，闯过紫霞首徒高沧云把守的第一道剑关，夺取《华山紫霞剑客衫》！',
      nextHint: '前往【玉女峰紫霞道观 · 东峰紫气迎曦石坪（tg_zx_terrace）】点击「闯首关 · 破剑式战高沧云」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_terrace',
        customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 东峰紫气迎曦石坪',
      },
    },
    gate2_ning: {
      id: 'gate2_ning',
      title: '二关清泉 · 破掌封仙',
      objective:
        '已挑败高沧云夺下《华山紫霞剑客衫》！请继续推进至【玉女峰紫霞道观 · 洗头盆清泉演剑院】，以“破掌式”闯过玉女剑仙宁清羽镇守的第二关！',
      nextHint: '前往【玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】点击「闯二关 · 破掌式战宁清羽」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
      },
    },
    gate3_qin: {
      id: 'gate3_qin',
      title: '三关孤松 · 硬破剑神',
      objective:
        '已过清泉演剑院！潼关剑神秦烈山正横剑立于苍龙岭孤松要冲，请前往【华山绝顶论剑台 · 朝阳孤松观海亭】十五合内硬破其《太岳三青峰》！',
      nextHint: '前往【华山绝顶论剑台 · 朝阳孤松观海亭（tg_sm_pine）】点击「闯三关 · 十五合战秦烈山」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_pine',
        customLabel: '潼关 / 西岳华山 · 华山绝顶论剑台 · 朝阳孤松观海亭',
      },
    },
    gate4_yue: {
      id: 'gate4_yue',
      title: '终关主殿 · 剑撼紫霞',
      objective:
        '秦烈山已收剑让道！请步入【玉女峰紫霞道观 · 紫霞正气主殿】，正面迎战催动十成《紫霞神功》的掌门岳沧溟，以“破气式”逆夺《太岳紫霞长剑》！',
      nextHint: '前往【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】点击「闯终关 · 破气式决战岳沧溟」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
      },
    },
    slaughter_fengling: {
      id: 'slaughter_fengling',
      title: '屠营祭剑 · 霸主登基',
      objective:
        '已夺《太岳紫霞长剑》！请携神锋疾赴【潼关天险瓮城 · 黄河大折惊涛烽火台】血洗风陵西夏大营、枭首主帅拓跋雄，以万敌之血铸就西岳霸剑宗主大位！',
      nextHint: '前往【潼关天险瓮城 · 黄河大折惊涛烽火台（tg_ft_beacon）】点击「太岳祭血 · 屠灭风陵夏营斩拓跋雄」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城 · 黄河大折惊涛烽火台（风陵敌营）',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_hsq20_start_ledge',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_ledge',
      onceFlag: 'hsq20_intro_triggered',
      condition: HUASHAN_Q20_START_CONDITION,
      effects: [openScene('scene_hsq20_01', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'trig_hsq20_gate1',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      onceFlag: 'hsq20_gate1_triggered',
      condition: atStep(HUASHAN_Q20_QUEST_ID, 'gate1_gao'),
      effects: [openScene('scene_hsq20_06', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'trig_hsq20_gate2',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      onceFlag: 'hsq20_gate2_triggered',
      condition: atStep(HUASHAN_Q20_QUEST_ID, 'gate2_ning'),
      effects: [openScene('scene_hsq20_12', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'trig_hsq20_gate3',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_pine',
      onceFlag: 'hsq20_gate3_triggered',
      condition: atStep(HUASHAN_Q20_QUEST_ID, 'gate3_qin'),
      effects: [openScene('scene_hsq20_17', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'trig_hsq20_gate4',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq20_gate4_triggered',
      condition: atStep(HUASHAN_Q20_QUEST_ID, 'gate4_yue'),
      effects: [openScene('scene_hsq20_23', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'trig_hsq20_fengling',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      onceFlag: 'hsq20_fengling_triggered',
      condition: atStep(HUASHAN_Q20_QUEST_ID, 'slaughter_fengling'),
      effects: [openScene('scene_hsq20_31', HUASHAN_Q20_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_hsq20_start',
      label: '受剑宗群雄拥戴 · 踏雪直上玉女峰夺位（剑宗霸道终局）',
      badge: '剑压紫霞',
      subtitle: '需《独孤九剑》≥ 第五重且曾私拓秘刻',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_ledge',
      visibleWhen: HUASHAN_Q20_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'hsq20_intro_triggered', value: true },
        openScene('scene_hsq20_01', HUASHAN_Q20_QUEST_ID),
      ],
    },
    {
      id: 'spot_hsq20_gate1',
      label: '闯首关 · 破剑式挑败高沧云强夺紫霞衫',
      badge: '首关夺衫',
      subtitle: '玉女峰紫霞道观 · 东峰紫气迎曦石坪',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_terrace',
      visibleWhen: atStep(HUASHAN_Q20_QUEST_ID, 'gate1_gao'),
      effects: [openScene('scene_hsq20_06', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'spot_hsq20_gate2',
      label: '闯二关 · 破掌式挫败玉女剑仙宁清羽',
      badge: '二关封掌',
      subtitle: '玉女峰紫霞道观 · 洗头盆清泉演剑院',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      visibleWhen: atStep(HUASHAN_Q20_QUEST_ID, 'gate2_ning'),
      effects: [openScene('scene_hsq20_12', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'spot_hsq20_gate3',
      label: '闯三关 · 十五合硬破潼关剑神秦烈山',
      badge: '三关破峰',
      subtitle: '华山绝顶论剑台 · 朝阳孤松观海亭',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_pine',
      visibleWhen: atStep(HUASHAN_Q20_QUEST_ID, 'gate3_qin'),
      effects: [openScene('scene_hsq20_17', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'spot_hsq20_gate4',
      label: '闯终关 · 破气式硬撼岳沧溟逆夺太岳剑',
      badge: '剑撼紫霞',
      subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q20_QUEST_ID, 'gate4_yue'),
      effects: [openScene('scene_hsq20_23', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'spot_hsq20_fengling',
      label: '太岳祭血 · 屠灭风陵夏营枭首拓跋雄',
      badge: '西岳霸主',
      subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      visibleWhen: atStep(HUASHAN_Q20_QUEST_ID, 'slaughter_fengling'),
      effects: [openScene('scene_hsq20_31', HUASHAN_Q20_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_hsq20_npc_start',
      label: '九剑诡剑双绝大成 · 议定踏雪逼宫夺回华山正统（剑宗霸道终局）',
      badge: '剑压紫霞',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
          HUASHAN_Q20_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'hsq20_intro_triggered', value: true },
        openScene('scene_hsq20_01', HUASHAN_Q20_QUEST_ID),
      ],
    },
    {
      id: 'act_hsq20_npc_gate1',
      label: '拔剑闯关 · 破剑式夺取《华山紫霞剑客衫》',
      badge: '首关夺衫',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0202'] },
          atStep(HUASHAN_Q20_QUEST_ID, 'gate1_gao'),
        ],
      },
      effects: [openScene('scene_hsq20_06', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'act_hsq20_npc_gate2',
      label: '拔剑闯关 · 破掌式请宁师叔让路',
      badge: '二关封掌',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
          atStep(HUASHAN_Q20_QUEST_ID, 'gate2_ning'),
        ],
      },
      effects: [openScene('scene_hsq20_12', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'act_hsq20_npc_gate3',
      label: '拔剑闯关 · 十五合硬撼《太岳三青峰》',
      badge: '三关破峰',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
          atStep(HUASHAN_Q20_QUEST_ID, 'gate3_qin'),
        ],
      },
      effects: [openScene('scene_hsq20_17', HUASHAN_Q20_QUEST_ID)],
    },
    {
      id: 'act_hsq20_npc_gate4',
      label: '独孤破气 · 终结气宗三十载掌门统治',
      badge: '剑撼紫霞',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118'] },
          atStep(HUASHAN_Q20_QUEST_ID, 'gate4_yue'),
        ],
      },
      effects: [openScene('scene_hsq20_23', HUASHAN_Q20_QUEST_ID)],
    },
  ],

  loadScenes: () => import('./huashanEndingSwordUsurpQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q20_QUESTS: QuestDefinition[] = [HUASHAN_Q20_QUEST]
