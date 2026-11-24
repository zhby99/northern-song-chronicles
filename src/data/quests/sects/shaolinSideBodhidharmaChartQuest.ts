import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE18_QUEST_ID = 'QST-SECT-01-SIDE-18'

export const SHAOLIN_SIDE18_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus(SHAOLIN_SIDE18_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 88 },
    { type: 'skillAtLeast', key: '书', min: 75 },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0135', npcName: '玄渡' },
  ],
}

export const shaolinSideBodhidharmaChartQuest: QuestDefinition = {
  id: SHAOLIN_SIDE18_QUEST_ID,
  title: '达摩东渡 · 沧海遗图',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品',
  maxOpponentRealm: '宗师中品（天竺瑜伽大宗师 · 迦叶尊者 ／ 波斯明火宗师 · 巴赫曼尊使连战）',
  recommendedNote:
    '少林寺 Lv.4 宗师级压轴秘闻支线（全十幕）。已登长老首座、且经义与书法皆臻化境后，于达摩院整理初祖秘档时与玄难、玄渡发掘菩提达摩泛海东渡羊皮古卷《沧海遗图》。须赴藏经阁亲破古梵文海路密码，并于云海日出之际登临少室绝顶万丈冰崖，择策以古梵文「一花开五叶」先折迦叶傲气或正面车轮连战天竺、波斯两大宗师中品奇人，战后更可抉择公开拓本造福市舶海商或严密封藏达摩院密室。',
  startHint:
    '跻身少林寺四阶首座长老、且经义达 88、书达 75 后，前往【嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室】寻玄难、玄渡即可触发。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_damo',
    spotId: 'sl_damo_east',
    customLabel: '嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室',
  },
  startCondition: SHAOLIN_SIDE18_START_CONDITION,
  summary:
    '{reignYear}暮春，你与达摩院首座玄难、高僧玄渡于【达摩面壁石洞 · 东侧密禅室】清点初祖旧档时，自沉香经轴芯中发掘出密封五百余年的羊皮古卷——初祖菩提达摩亲绘《沧海东渡遗图》与古梵文海路禅偈！你携古卷赴【少林藏经阁 · 经阁正楼】破译海路密码，岂料引来天竺古瑜伽大宗师「迦叶尊者」与波斯圣火宗师「阿胡拉·巴赫曼」递帖邀战。翌日拂晓，你登临少室绝顶万丈冰崖（【飞瀑深潭 · 试炼涧】绝顶崖畔），于云海日出之际以古梵妙义或无上少林绝学车轮连战两大宗师中品异域奇人，以禅武合一令二人心悦诚服。归返达摩院后，你更对这份凝聚五百年航海星象与禅脉的《沧海遗图》作出终极归处抉择。',
  initialStepId: 'decipher_sutra_pavilion',
  steps: {
    decipher_sutra_pavilion: {
      id: 'decipher_sutra_pavilion',
      title: '经阁释偈 · 沧海密码',
      objective:
        '初祖菩提达摩《沧海东渡遗图》重见天日！请携羊皮古卷随玄渡前往【嵩山少林寺 · 少林藏经阁 · 经阁正楼（sl_cj_pavilion）】，对照南北朝古梵典破译海路密码与禅偈。',
      nextHint:
        '前往【嵩山少林寺 · 少林藏经阁 · 经阁正楼（sl_cj_pavilion）】，点击「对照古梵典考释达摩《沧海东渡遗图》禅偈」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_cangjing',
        spotId: 'sl_cj_pavilion',
        customLabel: '嵩山少林寺 · 少林藏经阁 · 经阁正楼',
      },
    },
    cloud_sea_duel: {
      id: 'cloud_sea_duel',
      title: '绝顶云海 · 连战异域双尊',
      objective:
        '天竺瑜伽大宗师「迦叶尊者」与波斯明火宗师「巴赫曼尊使」已登临少室绝顶万丈冰崖！请速赴【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】攀上绝顶冰崖，于云海日出之际迎战二位异域宗师！',
      nextHint:
        '前往【嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧（sl_damo_west）】，点击「登临少室绝顶万丈冰崖，于云海日出之际迎战异域双尊」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_west',
        customLabel: '嵩山少林寺 · 达摩面壁石洞 · 飞瀑深潭 · 试炼涧',
      },
    },
    seal_chart_damo: {
      id: 'seal_chart_damo',
      title: '沧海归处 · 复命达摩院',
      objective:
        '已于云海日出之际以禅武合一折服天竺、波斯两位异域宗师，护住初祖羊皮遗图！请返回【嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室（sl_damo_east）】与玄难、玄渡共定《沧海遗图》归处。',
      nextHint:
        '返回【嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室（sl_damo_east）】，点击「与玄难、玄渡共定《沧海东渡遗图》归处」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_damo',
        spotId: 'sl_damo_east',
        customLabel: '嵩山少林寺 · 达摩面壁石洞 · 东侧密禅室',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_sls18_start_damo_east',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      onceFlag: 'sl_side18_start_triggered',
      condition: SHAOLIN_SIDE18_START_CONDITION,
      effects: [openScene('scene_sls18_01', SHAOLIN_SIDE18_QUEST_ID)],
    },
    {
      id: 'trig_sls18_decipher_cangjing',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      onceFlag: 'sl_side18_decipher_triggered',
      condition: atStep(SHAOLIN_SIDE18_QUEST_ID, 'decipher_sutra_pavilion'),
      effects: [openScene('scene_sls18_03', SHAOLIN_SIDE18_QUEST_ID)],
    },
    {
      id: 'trig_sls18_duel_damo_west',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_west',
      onceFlag: 'sl_side18_duel_triggered',
      condition: atStep(SHAOLIN_SIDE18_QUEST_ID, 'cloud_sea_duel'),
      effects: [openScene('scene_sls18_05', SHAOLIN_SIDE18_QUEST_ID)],
    },
    {
      id: 'trig_sls18_return_damo_east',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      onceFlag: 'sl_side18_seal_triggered',
      condition: atStep(SHAOLIN_SIDE18_QUEST_ID, 'seal_chart_damo'),
      effects: [openScene('scene_sls18_08', SHAOLIN_SIDE18_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_sls18_start',
      label: '【少林支线】随玄难、玄渡整理达摩院初祖秘档',
      badge: '沧海遗图',
      subtitle: '东侧密禅室',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      visibleWhen: SHAOLIN_SIDE18_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_side18_start_triggered', value: true },
        openScene('scene_sls18_01', SHAOLIN_SIDE18_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls18_decipher',
      label: '【少林支线】对照古梵典考释达摩《沧海东渡遗图》禅偈',
      badge: '经阁释偈',
      subtitle: '藏经阁正楼',
      tone: 'jade',
      regionId: 'shaolin',
      buildingId: 'sl_cangjing',
      spotId: 'sl_cj_pavilion',
      visibleWhen: atStep(SHAOLIN_SIDE18_QUEST_ID, 'decipher_sutra_pavilion'),
      effects: [
        { type: 'setFlag', flag: 'sl_side18_decipher_triggered', value: true },
        openScene('scene_sls18_03', SHAOLIN_SIDE18_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls18_duel',
      label: '【少林支线】登临少室绝顶万丈冰崖，于云海日出之际迎战异域双尊',
      badge: '云海双战',
      subtitle: '飞瀑深潭 · 绝顶冰崖',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_west',
      visibleWhen: atStep(SHAOLIN_SIDE18_QUEST_ID, 'cloud_sea_duel'),
      effects: [
        { type: 'setFlag', flag: 'sl_side18_duel_triggered', value: true },
        openScene('scene_sls18_05', SHAOLIN_SIDE18_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls18_seal',
      label: '【少林支线】与玄难、玄渡共定《沧海东渡遗图》归处',
      badge: '沧海归藏',
      subtitle: '东侧密禅室',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_damo',
      spotId: 'sl_damo_east',
      visibleWhen: atStep(SHAOLIN_SIDE18_QUEST_ID, 'seal_chart_damo'),
      effects: [
        { type: 'setFlag', flag: 'sl_side18_seal_triggered', value: true },
        openScene('scene_sls18_08', SHAOLIN_SIDE18_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_sls18_start_npc',
      label: '与玄难、玄渡共理达摩院初祖秘档',
      badge: '沧海遗图',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0127', 'NPC-0135'] },
          SHAOLIN_SIDE18_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side18_start_triggered', value: true },
        openScene('scene_sls18_01', SHAOLIN_SIDE18_QUEST_ID),
      ],
    },
    {
      id: 'act_sls18_seal_npc',
      label: '向玄难、玄渡呈报云海退双尊始末并定古卷归处',
      badge: '沧海归藏',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0127', 'NPC-0135'] },
          atStep(SHAOLIN_SIDE18_QUEST_ID, 'seal_chart_damo'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side18_seal_triggered', value: true },
        openScene('scene_sls18_08', SHAOLIN_SIDE18_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinSideBodhidharmaChartQuest.scenes').then((m) => m.SHAOLIN_SIDE18_SCENES),
}

export const SHAOLIN_SIDE18_QUESTS: QuestDefinition[] = [shaolinSideBodhidharmaChartQuest]
