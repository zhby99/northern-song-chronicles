import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q38_QUEST_ID = 'QST-SECT-01-38'

export const SHAOLIN_Q38_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-36', 'completed'),
    qStatus(SHAOLIN_Q38_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 8030 },
    { type: 'skillAtLeast', key: '经义', min: 90 },
    { type: 'skillAtLeast', key: '书', min: 75 },
    { type: 'skillAtLeast', key: '辩才', min: 65 },
    { type: 'renownAtLeast', min: 600 },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0233', npcName: '叶二娘' },
  ],
}

export const shaolinEndingMercifulAbbotQuest: QuestDefinition = {
  id: SHAOLIN_Q38_QUEST_ID,
  title: '杖责还业 · 达摩传衣',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品 ～ 宗师上品',
  maxOpponentRealm: '宗师中品（血刀邪客 · 厉千煞 / 阴风邪老 · 阎三毒）',
  recommendedNote:
    '嵩山少林寺终局抉择之一【慈悲方丈线】（全三十二幕）。须入寺满 8030 日（二十二载）、完成前序慈悲抉择《QST-SECT-01-36》、经义 ≥ 90、书 ≥ 75、辩才 ≥ 65、威望 ≥ 600。大雄宝殿前，你护持玄慈方丈坦然自领戒律二百刑杖还业，力挫趁乱围杀叶二娘母子的邪派恶徒；玄慈圆寂前亲手将天阶圣衣《少林达摩袈裟》披于你肩头托付禅宗正统，四十八房高僧合十恭迎新任方丈！',
  startHint:
    '完成《QST-SECT-01-36》、入寺满 8030 日且经义 ≥ 90、书 ≥ 75、辩才 ≥ 65、威望 ≥ 600 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】即可触发终局。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_main',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
  },
  startCondition: SHAOLIN_Q38_START_CONDITION,
  summary:
    '{reignYear}深秋，嵩山钟声苍凉彻云。尘封二十余载的旧日私情终在天下群雄与满寺僧众面前大白于天下，少林千年清誉悬于一线。你没有落井下石，亦未包庇徇私，而是于【大雄正殿】护持方丈【玄慈】坦然脱去袈裟、自领戒律院二百记玄铁戒杖，以血肉之躯还尽一生情债与寺规重业！岂料血刀邪客【厉千煞】与阴风邪老【阎三毒】趁乱率众闯入钟鼓禅院，欲当场虐杀虚弱的【叶二娘】母子以羞辱少林。你含怒出手，以无上佛门神功于演武坪力挫双凶、护住孤寡。刑满之际，玄慈伤重垂危却面露解脱微笑，亲手将天阶圣衣【少林达摩袈裟】披于你的肩头，托付禅宗千年衣钵后含笑圆寂；叶二娘亦殉情随去。四十八房玄字辈高僧齐声合十，共迎你继任少林新一代【慈悲方丈】！',
  initialStepId: 'confession_hall',
  steps: {
    confession_hall: {
      id: 'confession_hall',
      title: '佛前担业 · 二百刑杖',
      objective:
        '玄慈方丈已在【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】脱去方丈袈裟，请以真传长老之身护持公审，见证玄慈自领戒律二百刑杖还业！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「护持大殿公审 · 见证玄慈方丈自领二百刑杖」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    defend_mother_child: {
      id: 'defend_mother_child',
      title: '钟院护孤 · 力挫群邪',
      objective:
        '邪派恶徒厉千煞与阎三毒趁少林公审之乱直扑【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，企图虐杀叶二娘母子以辱禅宗！速去拦截斩邪！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「截杀血刀邪客与阴风邪老 · 护持叶二娘母子」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
    kasaya_entrust: {
      id: 'kasaya_entrust',
      title: '达摩传衣 · 暮钟圆寂',
      objective:
        '群邪已伏诛于演武坪，然玄慈方丈二百刑杖已毕、气若游丝！请速返【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】聆听方丈临终遗命！',
      nextHint:
        '返回【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「步入大雄正殿 · 聆听玄慈方丈临终传衣」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    merciful_enthronement: {
      id: 'merciful_enthronement',
      title: '禅宗正统 · 慈悲升座',
      objective:
        '玄慈方丈与叶二娘俱已化去，达摩袈裟已披于你肩头。请于【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】登坛升座，受四十八房高僧合十礼拜，正式继任少林方丈！',
      nextHint:
        '在【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】点击「身披达摩袈裟 · 登坛继任少林慈悲方丈」。',
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
      id: 'trig_slq38_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q38_start_triggered',
      condition: SHAOLIN_Q38_START_CONDITION,
      effects: [openScene('scene_slq38_01', SHAOLIN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_slq38_confession',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q38_confession_triggered',
      condition: atStep(SHAOLIN_Q38_QUEST_ID, 'confession_hall'),
      effects: [openScene('scene_slq38_05', SHAOLIN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_slq38_defend',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q38_defend_triggered',
      condition: atStep(SHAOLIN_Q38_QUEST_ID, 'defend_mother_child'),
      effects: [openScene('scene_slq38_12', SHAOLIN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_slq38_entrust',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q38_entrust_triggered',
      condition: atStep(SHAOLIN_Q38_QUEST_ID, 'kasaya_entrust'),
      effects: [openScene('scene_slq38_19', SHAOLIN_Q38_QUEST_ID)],
    },
    {
      id: 'trig_slq38_enthrone',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q38_enthrone_triggered',
      condition: atStep(SHAOLIN_Q38_QUEST_ID, 'merciful_enthronement'),
      effects: [openScene('scene_slq38_27', SHAOLIN_Q38_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq38_start',
      label: '【少林终局 · 慈悲方丈】赴大雄正殿 · 见证玄慈方丈佛前担业',
      badge: '杖责还业',
      subtitle: '少林终局线一 · 慈悲护法，承接达摩衣钵',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: SHAOLIN_Q38_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q38_start_triggered', value: true },
        openScene('scene_slq38_01', SHAOLIN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq38_confession',
      label: '【杖责还业】护持大殿公审 · 见证玄慈方丈自领二百刑杖',
      badge: '二百刑杖',
      subtitle: '第五幕 · 法不阿贵，慈悲不弃，血肉还尽三十年旧业',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q38_QUEST_ID, 'confession_hall'),
      effects: [
        { type: 'setFlag', flag: 'sl_q38_confession_triggered', value: true },
        openScene('scene_slq38_05', SHAOLIN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq38_defend',
      label: '【杖责还业】截杀血刀邪客与阴风邪老 · 护持叶二娘母子',
      badge: '钟院护孤',
      subtitle: '第十二幕 · 宗师级 1v2 硬仗，力挫趁乱辱寺群邪',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q38_QUEST_ID, 'defend_mother_child'),
      effects: [
        { type: 'setFlag', flag: 'sl_q38_defend_triggered', value: true },
        openScene('scene_slq38_12', SHAOLIN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq38_entrust',
      label: '【杖责还业】步入大雄正殿 · 聆听玄慈方丈临终传衣',
      badge: '达摩传衣',
      subtitle: '第十九幕 · 亲授天阶达摩袈裟，叶落暮钟',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q38_QUEST_ID, 'kasaya_entrust'),
      effects: [
        { type: 'setFlag', flag: 'sl_q38_entrust_triggered', value: true },
        openScene('scene_slq38_19', SHAOLIN_Q38_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq38_enthrone',
      label: '【杖责还业】身披达摩袈裟 · 登坛继任少林慈悲方丈',
      badge: '慈悲升座',
      subtitle: '第二十七幕 · 四十八房高僧合十恭迎，晋升少林 Lv.5 掌门',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q38_QUEST_ID, 'merciful_enthronement'),
      effects: [
        { type: 'setFlag', flag: 'sl_q38_enthrone_triggered', value: true },
        openScene('scene_slq38_27', SHAOLIN_Q38_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq38_xuanci_start',
      label: '面谒玄慈方丈 · 论佛前还业与少林正统',
      badge: '杖责还业',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0112'] },
          SHAOLIN_Q38_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q38_start_triggered', value: true },
        openScene('scene_slq38_01', SHAOLIN_Q38_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinEndingMercifulAbbotQuest.scenes').then((m) => m.SHAOLIN_Q38_SCENES),
}

export const SHAOLIN_Q38_QUESTS: QuestDefinition[] = [shaolinEndingMercifulAbbotQuest]
