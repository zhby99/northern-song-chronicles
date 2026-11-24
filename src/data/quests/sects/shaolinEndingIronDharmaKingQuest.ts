import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q39_QUEST_ID = 'QST-SECT-01-39'

export const SHAOLIN_Q39_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-37', 'completed'),
    qStatus(SHAOLIN_Q39_QUEST_ID, 'not_started'),
    flag('sl_branch', 'neq', 'layman'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 900 },
    { type: 'skillAtLeast', key: '经义', min: 85 },
    { type: 'skillAtLeast', key: '策论', min: 65 },
    { type: 'skillAtLeast', key: '书', min: 75 },
    { type: 'skillAtLeast', key: '辩才', min: 65 },
    { type: 'renownAtLeast', min: 600 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const shaolinEndingIronDharmaKingQuest: QuestDefinition = {
  id: SHAOLIN_Q39_QUEST_ID,
  title: '雷霆涤寺 · 铁腕法王',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师中品（赤练刀主 · 殷无咎 / 玄冥鞭王 · 杜阴山 / 血手铁剑 · 莫断魂 车轮连战）',
  recommendedNote:
    '嵩山少林寺终局抉择之二【铁腕法王线 · 出家剃度专属】（精炼十四幕史诗）。须为已剃度出家弟子（sl_branch != layman）、入寺满 900 日、完成前序铁腕抉择《QST-SECT-01-37》、经义 ≥ 85、策论 ≥ 65、书 ≥ 75、辩才 ≥ 65、威望 ≥ 600。高台执杖宣律，监刑杖责玄慈革去方丈之位令其入后山闭死关忏悔，三策整肃戒律与知客多年积弊；面对趁火打劫的三名邪派掌门，金刚金身当场震断三人兵刃！玄痛、玄寂率众拥戴你披《少林达摩袈裟》登位少林护教铁腕法王！',
  startHint:
    '已剃度出家、完成《QST-SECT-01-37》、入寺满 900 日且经义 ≥ 85、策论 ≥ 65、书 ≥ 75、辩才 ≥ 65、威望 ≥ 600 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】即可触发终局。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_main',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
  },
  startCondition: SHAOLIN_Q39_START_CONDITION,
  summary:
    '{reignYear}深秋，少室山霜寒凛冽。玄慈旧案既破，你力主「乱世重典、以霹雳手段行菩萨心肠」，亲登大雄正殿高台执杖宣律，监刑杖责【玄慈】并当众革去其方丈法位，敕令其退入后山达摩洞闭死关终生忏悔！旋即你携戒律院铁杖僧众直扑东厢藏经橱，雷霆清算知客与戒律两房多年暗账积弊！正当全寺整肃之际，赤练刀主【殷无咎】、玄冥鞭王【杜阴山】、血手铁剑【莫断魂】三名邪派掌门趁火打劫闯入演武坪逼宫。你一人独对三大邪道宗师，以金刚不坏金身当场震断三人神兵，慑得群邪胆寒溃逃！戒律院首座【玄痛】与罗汉堂长老【玄寂】率众齐拜，恭请你披上天阶圣衣【少林达摩袈裟】、执掌燃木戒刀，登位威震天下的少林护教【铁腕法王】！',
  initialStepId: 'iron_verdict',
  steps: {
    iron_verdict: {
      id: 'iron_verdict',
      title: '高台宣律 · 革位闭关',
      objective:
        '请登【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】高台执杖宣律，监刑杖责玄慈、革去方丈之位并令其入后山闭死关忏悔！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「登台执杖宣律 · 监刑革去玄慈方丈之位」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    purge_corrupt: {
      id: 'purge_corrupt',
      title: '雷霆涤寺 · 清查积弊',
      objective:
        '玄慈既已革位闭关，请即刻前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】择定整肃方略，雷霆清查戒律院与知客房多年暗账与徇私积弊！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，点击「查封东厢暗账 · 雷霆整肃戒律与知客积弊」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
      },
    },
    shatter_three_masters: {
      id: 'shatter_three_masters',
      title: '金刚断刃 · 独战三魔',
      objective:
        '赤练刀主殷无咎、玄冥鞭王杜阴山、血手铁剑莫断魂三名邪派掌门趁少林整肃之机闯入【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】联手逼宫！速以金刚金身迎战三魔、当场震断三人兵刃！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「独战三名邪派掌门 · 金刚金身震断群魔兵刃」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
    iron_enthronement: {
      id: 'iron_enthronement',
      title: '铁腕法王 · 披衣登座',
      objective:
        '三魔兵刃尽断、群邪胆寒溃逃！玄痛与玄寂已率四十八房铁血僧众齐集【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，恭迎你披达摩袈裟登位少林护教铁腕法王！',
      nextHint:
        '返回【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「受玄痛玄寂拥戴 · 登位少林护教铁腕法王」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_slq39_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q39_start_triggered',
      condition: SHAOLIN_Q39_START_CONDITION,
      effects: [openScene('scene_slq39_01', SHAOLIN_Q39_QUEST_ID)],
    },
    {
      id: 'trig_slq39_verdict',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q39_verdict_triggered',
      condition: atStep(SHAOLIN_Q39_QUEST_ID, 'iron_verdict'),
      effects: [
        {
          type: 'branch',
          condition: {
            type: 'any',
            conditions: [
              { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
              { type: 'flag', flag: 'sl_karma_wrath', op: 'gte', value: 8 },
            ],
          },
          thenEffects: [openScene('scene_slq39_02a', SHAOLIN_Q39_QUEST_ID)],
          elseEffects: [openScene('scene_slq39_02b', SHAOLIN_Q39_QUEST_ID)],
        },
      ],
    },
    {
      id: 'trig_slq39_purge',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      onceFlag: 'sl_q39_purge_triggered',
      condition: atStep(SHAOLIN_Q39_QUEST_ID, 'purge_corrupt'),
      effects: [openScene('scene_slq39_05', SHAOLIN_Q39_QUEST_ID)],
    },
    {
      id: 'trig_slq39_shatter',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q39_shatter_triggered',
      condition: atStep(SHAOLIN_Q39_QUEST_ID, 'shatter_three_masters'),
      effects: [openScene('scene_slq39_07', SHAOLIN_Q39_QUEST_ID)],
    },
    {
      id: 'trig_slq39_enthrone',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q39_enthrone_triggered',
      condition: atStep(SHAOLIN_Q39_QUEST_ID, 'iron_enthronement'),
      effects: [openScene('scene_slq39_10', SHAOLIN_Q39_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq39_start',
      label: '【少林终局 · 铁腕法王】赴大雄正殿 · 以霹雳手段整肃佛门',
      badge: '雷霆涤寺',
      subtitle: '少林终局线二（出家专属） · 铁律革位，金刚护教',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: SHAOLIN_Q39_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q39_start_triggered', value: true },
        openScene('scene_slq39_01', SHAOLIN_Q39_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq39_verdict',
      label: '【雷霆涤寺】登台执杖宣律 · 监刑革去玄慈方丈之位',
      badge: '高台宣律',
      subtitle: '宣读清规铁律，令玄慈受杖革位入后山闭死关',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q39_QUEST_ID, 'iron_verdict'),
      effects: [
        { type: 'setFlag', flag: 'sl_q39_verdict_triggered', value: true },
        {
          type: 'branch',
          condition: {
            type: 'any',
            conditions: [
              { type: 'flag', flag: 'sl_xuanjing_debt', op: 'truthy' },
              { type: 'flag', flag: 'sl_karma_wrath', op: 'gte', value: 8 },
            ],
          },
          thenEffects: [openScene('scene_slq39_02a', SHAOLIN_Q39_QUEST_ID)],
          elseEffects: [openScene('scene_slq39_02b', SHAOLIN_Q39_QUEST_ID)],
        },
      ],
    },
    {
      id: 'spot_slq39_purge',
      label: '【雷霆涤寺】查封东厢暗账 · 雷霆整肃戒律与知客积弊',
      badge: '涤清积弊',
      subtitle: '亲定治寺三策，拔除寺内包庇徇私蠹虫',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_east',
      visibleWhen: atStep(SHAOLIN_Q39_QUEST_ID, 'purge_corrupt'),
      effects: [
        { type: 'setFlag', flag: 'sl_q39_purge_triggered', value: true },
        openScene('scene_slq39_05', SHAOLIN_Q39_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq39_shatter',
      label: '【雷霆涤寺】独战三名邪派掌门 · 金刚金身震断群魔兵刃',
      badge: '金刚断刃',
      subtitle: '金刚震刃先破剑锋或车轮连战三魔，扬少林铁腕神威',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q39_QUEST_ID, 'shatter_three_masters'),
      effects: [
        { type: 'setFlag', flag: 'sl_q39_shatter_triggered', value: true },
        openScene('scene_slq39_07', SHAOLIN_Q39_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq39_enthrone',
      label: '【雷霆涤寺】受玄痛玄寂拥戴 · 登位少林护教铁腕法王',
      badge: '铁腕法王',
      subtitle: '披达摩袈裟定护教国策，晋升少林 Lv.5 护教方丈',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q39_QUEST_ID, 'iron_enthronement'),
      effects: [
        { type: 'setFlag', flag: 'sl_q39_enthrone_triggered', value: true },
        openScene('scene_slq39_10', SHAOLIN_Q39_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq39_xuantong_start',
      label: '会同玄痛首座 · 执杖登台雷霆涤寺',
      badge: '雷霆涤寺',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
          SHAOLIN_Q39_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q39_start_triggered', value: true },
        openScene('scene_slq39_01', SHAOLIN_Q39_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinEndingIronDharmaKingQuest.scenes').then((m) => m.SHAOLIN_Q39_SCENES),
}

export const SHAOLIN_Q39_QUESTS: QuestDefinition[] = [shaolinEndingIronDharmaKingQuest]
