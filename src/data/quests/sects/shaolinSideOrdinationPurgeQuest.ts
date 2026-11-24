import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE16_QUEST_ID = 'QST-SECT-01-SIDE-16'

export const SHAOLIN_SIDE16_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus(SHAOLIN_SIDE16_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '策论', min: 55 },
    { type: 'skillAtLeast', key: '算术', min: 45 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'not', condition: { type: 'flag', flag: 'sl_xuanci_deposed', op: 'truthy' } },
    { type: 'npcAlive', npcId: 'NPC-0013', npcName: '包拯' },
    { type: 'npcAlive', npcId: 'NPC-0140', npcName: '展昭' },
    { type: 'npcAlive', npcId: 'NPC-0193', npcName: '玄净' },
  ],
}

export const shaolinSideOrdinationPurgeQuest: QuestDefinition = {
  id: SHAOLIN_SIDE16_QUEST_ID,
  title: '清源正本 · 度牒大案',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师下品',
  maxOpponentRealm: '宗师下品（官府供奉邪僧 · 血袈裟摩罗）',
  recommendedNote:
    '少林寺 Lv.4 宗师级清源支线（全十六幕）。已登长老首座、策论与算术兼通后，于大雄宝殿正殿承玄慈方丈密托，追查昔年「佛缘有价」度牒索贿背后牵连官府的私卖度牒大案。奉旨赴汴京开封府正堂会同包拯与御猫展昭勘核密档，夜袭京西贪官私庄，一对一击毙宗师供奉邪僧「血袈裟」摩罗，回山当众颁立新规彻底废除少林索贿陋习。',
  startHint:
    '跻身少林寺四阶首座长老、且精修策论与算术后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿】拜见玄慈方丈即可领命。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_main',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿',
  },
  startCondition: SHAOLIN_SIDE16_START_CONDITION,
  summary:
    '{reignYear}深秋，你既已登临少林长老首座，玄慈方丈于【大雄宝殿正殿】屏退左右，将一叠密查多年的知客院暗账交予你手——昔年你初叩嵩门所历「佛缘有价」索贿旧弊，绝非知客僧玄净一人贪墨，其背后竟牵连京西转运判官赵克己勾结洛阳牙人私卖御赐空白度牒、借佛门免役免税之名吞田洗银的滔天巨案！你奉命持方丈手书星夜赴【汴京开封府 · 开封府正堂】会同包拯与御猫展昭，凭过人算术与策论在【开封府架阁库】逐卷钩沉，锁定京西黑庄所在。是夜随展昭突袭私庄，于火光血影中一对一击毙坐镇私庄的宗师下品邪僧「血袈裟」摩罗，人赃并获。凯旋归山后，你于大雄宝殿当众宣读开封府公文，革除陋习、立碑颁行《少林度牒清源新规》，千年古刹自此风清气正。',
  initialStepId: 'meet_kaifeng_court',
  steps: {
    meet_kaifeng_court: {
      id: 'meet_kaifeng_court',
      title: '密卷赴汴 · 会审开封府',
      objective:
        '已领玄慈方丈密托，携知客院暗账启程前往【汴京开封府 · 开封府正堂（bl_kf_court）】，面呈包拯与御猫展昭共议查办度牒大案。',
      nextHint:
        '前往【汴京 · 开封府 · 开封府正堂（bl_kf_court）】，点击「携少林度牒暗账拜见包拯与展昭」或与包拯交谈。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        customLabel: '汴京 · 开封府 · 开封府正堂',
      },
    },
    raid_west_manor: {
      id: 'raid_west_manor',
      title: '架阁钩沉 · 夜袭京西私庄',
      objective:
        '包拯已准调阅御史台与祠部度牒底册！请前往【汴京 · 开封府 · 架阁库（bl_kf_archive）】核对银两流向、锁定京西贪官私庄位址，随展昭星夜突袭擒贼！',
      nextHint:
        '前往【汴京 · 开封府 · 架阁库（bl_kf_archive）】，点击「核对度牒底册，随展昭夜袭京西贪官私庄」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_archive',
        customLabel: '汴京 · 开封府 · 架阁库',
      },
    },
    announce_reform: {
      id: 'announce_reform',
      title: '清源正本 · 颁立少林新规',
      objective:
        '京西私庄已破，邪僧「血袈裟」摩罗伏诛，贪官赵克己亦押解开封府候审！请携包拯勘结公文返回【嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿（sl_daxiong_main）】，当众整肃寺风、废除索贿陋习。',
      nextHint:
        '返回【嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿（sl_daxiong_main）】，点击「呈上开封府公文，当众颁立度牒清源新规」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_sls16_start_daxiong',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_side16_start_triggered',
      condition: SHAOLIN_SIDE16_START_CONDITION,
      effects: [openScene('scene_sls16_01', SHAOLIN_SIDE16_QUEST_ID)],
    },
    {
      id: 'trig_sls16_kaifeng_court',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      onceFlag: 'sl_side16_court_triggered',
      condition: atStep(SHAOLIN_SIDE16_QUEST_ID, 'meet_kaifeng_court'),
      effects: [openScene('scene_sls16_04', SHAOLIN_SIDE16_QUEST_ID)],
    },
    {
      id: 'trig_sls16_kaifeng_archive',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_archive',
      onceFlag: 'sl_side16_archive_triggered',
      condition: atStep(SHAOLIN_SIDE16_QUEST_ID, 'raid_west_manor'),
      effects: [openScene('scene_sls16_08', SHAOLIN_SIDE16_QUEST_ID)],
    },
    {
      id: 'trig_sls16_return_daxiong',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_side16_reform_triggered',
      condition: atStep(SHAOLIN_SIDE16_QUEST_ID, 'announce_reform'),
      effects: [openScene('scene_sls16_14', SHAOLIN_SIDE16_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_sls16_start',
      label: '【少林支线】拜见玄慈方丈，密议度牒索贿旧弊',
      badge: '度牒大案',
      subtitle: '大雄宝殿正殿',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: SHAOLIN_SIDE16_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_side16_start_triggered', value: true },
        openScene('scene_sls16_01', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls16_court',
      label: '【少林支线】携少林度牒暗账拜见包拯与展昭',
      badge: '会审开封',
      subtitle: '开封府正堂',
      tone: 'jade',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      visibleWhen: atStep(SHAOLIN_SIDE16_QUEST_ID, 'meet_kaifeng_court'),
      effects: [
        { type: 'setFlag', flag: 'sl_side16_court_triggered', value: true },
        openScene('scene_sls16_04', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls16_archive',
      label: '【少林支线】核对度牒底册，随展昭夜袭京西私庄',
      badge: '夜破私庄',
      subtitle: '开封府架阁库',
      tone: 'danger',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_archive',
      visibleWhen: atStep(SHAOLIN_SIDE16_QUEST_ID, 'raid_west_manor'),
      effects: [
        { type: 'setFlag', flag: 'sl_side16_archive_triggered', value: true },
        openScene('scene_sls16_08', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls16_return',
      label: '【少林支线】呈上开封府公文，当众颁立度牒清源新规',
      badge: '清源正本',
      subtitle: '大雄宝殿正殿',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_SIDE16_QUEST_ID, 'announce_reform'),
      effects: [
        { type: 'setFlag', flag: 'sl_side16_reform_triggered', value: true },
        openScene('scene_sls16_14', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_sls16_start_npc',
      label: '领受玄慈方丈密托，彻查度牒索贿大案',
      badge: '度牒大案',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
          SHAOLIN_SIDE16_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side16_start_triggered', value: true },
        openScene('scene_sls16_01', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
    {
      id: 'act_sls16_kaifeng_npc',
      label: '向包拯、展昭呈递少林度牒暗账',
      badge: '会审开封',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0013', 'NPC-0140'] },
          atStep(SHAOLIN_SIDE16_QUEST_ID, 'meet_kaifeng_court'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side16_court_triggered', value: true },
        openScene('scene_sls16_04', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
    {
      id: 'act_sls16_return_npc',
      label: '向玄慈方丈呈报开封府公文并颁立清源新规',
      badge: '清源正本',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
          atStep(SHAOLIN_SIDE16_QUEST_ID, 'announce_reform'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_side16_reform_triggered', value: true },
        openScene('scene_sls16_14', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinSideOrdinationPurgeQuest.scenes').then((m) => m.SHAOLIN_SIDE16_SCENES),
}

export const SHAOLIN_SIDE16_QUESTS: QuestDefinition[] = [shaolinSideOrdinationPurgeQuest]
