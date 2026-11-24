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
    '少林寺 Lv.4 宗师级清源支线（全十幕，深度回响 Q03《香火暗账》抉择）。已登长老首座、策论与算术兼通后，于大雄宝殿正殿承玄慈方丈密托，追查昔年知客院度牒索贿背后牵连京西贪官与洛阳豪绅的伪造空名度牒大案。赴开封府会同包拯与御猫展昭公堂对勘三份度牒真伪，夜袭西郊青柳黑庄择策喝散差役或正面破敌、击毙宗师下品邪僧「血袈裟」摩罗，回山整肃玄净并建言颁立少林度牒新规。',
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
    '{reignYear}深秋，你既已登临少林长老首座，玄慈方丈于【大雄宝殿正殿】屏退左右，交出追查多年的知客院暗账——昔年知客僧玄净倒卖度牒之弊，背后竟牵连京西转运判官赵克己勾结洛阳豪绅私造空名度牒、借佛门免役免税之名吞田洗银的滔天巨案！你持方丈密函星夜赴【汴京开封府 · 开封府正堂】会同包拯与展昭公堂勘验度牒真伪，继而赴【开封府架阁库】锁定汴京西郊青柳黑庄。是夜随展昭突袭私庄，或凭开封府火票喝散受蒙蔽差役、或正面突入强破，一对一击毙宗师下品邪僧「血袈裟」摩罗，人赃并获。凯旋归山后，你宣读开封府勘结公文整肃寺风、向方丈建言改制，千年古刹自此风清气正。',
  initialStepId: 'meet_kaifeng_court',
  steps: {
    meet_kaifeng_court: {
      id: 'meet_kaifeng_court',
      title: '密卷赴汴 · 会审开封府',
      objective:
        '已领玄慈方丈密托，携知客院暗账启程前往【汴京开封府 · 开封府正堂（bl_kf_court）】，面呈包拯与御猫展昭对勘度牒真伪、共议查办大案。',
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
        '包拯已准调阅密档并锁定西郊青柳黑庄！请前往【汴京 · 开封府 · 架阁库（bl_kf_archive）】与展昭汇合，星夜突袭私庄擒拿赵克己与血袈裟摩罗！',
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
        '西郊黑庄已破，邪僧「血袈裟」摩罗伏诛，贪官赵克己押解伏法！请携包拯勘结公文返回【嵩山少林寺 · 大雄宝殿方丈院 · 大雄宝殿正殿（sl_daxiong_main）】，当众整肃寺风、建言废除索贿陋习。',
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
      effects: [openScene('scene_sls16_02', SHAOLIN_SIDE16_QUEST_ID)],
    },
    {
      id: 'trig_sls16_kaifeng_archive',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_archive',
      onceFlag: 'sl_side16_archive_triggered',
      condition: atStep(SHAOLIN_SIDE16_QUEST_ID, 'raid_west_manor'),
      effects: [openScene('scene_sls16_05', SHAOLIN_SIDE16_QUEST_ID)],
    },
    {
      id: 'trig_sls16_return_daxiong',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_side16_reform_triggered',
      condition: atStep(SHAOLIN_SIDE16_QUEST_ID, 'announce_reform'),
      effects: [openScene('scene_sls16_08', SHAOLIN_SIDE16_QUEST_ID)],
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
        openScene('scene_sls16_02', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
    {
      id: 'spot_sls16_archive',
      label: '【少林支线】核对度牒底册，随展昭夜袭京西贪官私庄',
      badge: '夜破私庄',
      subtitle: '开封府架阁库',
      tone: 'danger',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_archive',
      visibleWhen: atStep(SHAOLIN_SIDE16_QUEST_ID, 'raid_west_manor'),
      effects: [
        { type: 'setFlag', flag: 'sl_side16_archive_triggered', value: true },
        openScene('scene_sls16_05', SHAOLIN_SIDE16_QUEST_ID),
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
        openScene('scene_sls16_08', SHAOLIN_SIDE16_QUEST_ID),
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
        openScene('scene_sls16_02', SHAOLIN_SIDE16_QUEST_ID),
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
        openScene('scene_sls16_08', SHAOLIN_SIDE16_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinSideOrdinationPurgeQuest.scenes').then((m) => m.SHAOLIN_SIDE16_SCENES),
}

export const SHAOLIN_SIDE16_QUESTS: QuestDefinition[] = [shaolinSideOrdinationPurgeQuest]
