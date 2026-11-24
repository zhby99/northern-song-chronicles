import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q41_QUEST_ID = 'QST-SECT-01-41'

export const SHAOLIN_Q41_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 5 },
    {
      type: 'any',
      hint: '须完成少林三大终局之一满 30 日',
      conditions: [
        { type: 'questCompletedDaysAgoAtLeast', questId: 'QST-SECT-01-38', minDays: 30 },
        { type: 'questCompletedDaysAgoAtLeast', questId: 'QST-SECT-01-39', minDays: 30 },
        { type: 'questCompletedDaysAgoAtLeast', questId: 'QST-SECT-01-40', minDays: 30 },
      ],
    },
    qStatus(SHAOLIN_Q41_QUEST_ID, 'not_started'),
    { type: 'skillAtLeast', key: '经义', min: 88 },
    { type: 'skillAtLeast', key: '辩才', min: 60 },
    { type: 'npcAlive', npcId: 'NPC-0110', npcName: '乔峰' },
    { type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const shaolinThousandMonkWarQuest: QuestDefinition = {
  id: SHAOLIN_Q41_QUEST_ID,
  title: '千僧列阵 · 血护少室',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师上品',
  maxOpponentRealm: '宗师上品（西夏一品堂统领 · 赫连铁树 / 星宿老怪 · 丁春秋）',
  recommendedNote:
    '嵩山少林寺终局大合战（精炼十五幕军阵史诗）。须已登位少林 Lv.5 掌门、完成三大终局之一满 30 日且经义 ≥ 88、辩才 ≥ 60。西夏一品堂统领赫连铁树联合星宿老怪丁春秋率两千铁骑毒人三路火烧少林！晨钟急撞九十九响，你以掌门总指挥之身亲布五百罗汉伏魔大阵、三次临阵调度改写战局，与玄难、玄痛、玄寂及万里驰援的萧峰并肩冲阵，斩碎赫连铁树帅旗、重创丁春秋退兵！',
  startHint:
    '登位少林 Lv.5 掌门满 30 日且经义 ≥ 88、辩才 ≥ 60 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】即可听闻九十九响急钟警报。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_west',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
  },
  startCondition: SHAOLIN_Q41_START_CONDITION,
  summary:
    '{reignYear}寒冬将至，嵩山北麓烽烟骤起！西夏一品堂统领【赫连铁树】怀恨中原佛门势大，竟暗中勾结星宿海毒魔【丁春秋】，亲率两千铁骑精锐与数百星宿毒人兵分三路合围少室山，扬言一夜火烧少林！大难临头，嵩山晨钟急撞九十九响震彻百里。你临危不乱，于【钟鼓禅院】升帐总领全寺千僧，亲布五百罗汉伏魔大阵，与【玄难】、【玄痛】、【玄寂】三院高僧死守山门，更凭精妙阵法调度于【罗汉堂演武正殿】前击溃星宿毒雾前军！正当两千敌骑压顶、千钧一发之际，豪雄【萧峰】万里驰援、降龙掌风如天雷滚滚撕裂敌阵！你与萧峰议定主攻方略并肩冲入中军，一举斩碎西夏一品堂黑狼帅旗、重创星宿老怪，迫使两千铁骑毒人仓皇溃退，血护少林千年祖庭！',
  initialStepId: 'bell_alarm',
  steps: {
    bell_alarm: {
      id: 'bell_alarm',
      title: '急钟九十九 · 点兵布阵',
      objective:
        '西夏一品堂赫连铁树与星宿老怪丁春秋率两千铁骑毒人三路压境！请速赴【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】集结千僧，亲布五百罗汉伏魔大阵并定破毒调度！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「升帐点兵 · 亲布五百罗汉伏魔大阵」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
    break_poison_vanguard: {
      id: 'break_poison_vanguard',
      title: '罗汉破毒 · 血战前军',
      objective:
        '星宿毒人首领与西夏先锋已施放化功毒雾强攻山腰！请速赴【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】率五百罗汉大阵与玄难并肩冲破毒雾前军！',
      nextHint:
        '前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】，点击「催动五百罗汉大阵 · 破灭星宿毒雾前军」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
      },
    },
    qiaofeng_charge: {
      id: 'qiaofeng_charge',
      title: '降龙驰援 · 斩旗破敌',
      objective:
        '萧峰已万里驰援杀破西夏左翼！请速返【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】依与萧峰议定之方略并肩冲锋中军，斩碎赫连铁树帅旗、重创丁春秋！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「与萧峰并肩冲阵 · 决战赫连铁树与丁春秋」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
    victory_memorial: {
      id: 'victory_memorial',
      title: '血护少室 · 铭碑志功',
      objective:
        '赫连铁树帅旗已断，丁春秋重伤溃逃，两千敌军尽数逐出嵩山！请步入【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】拜谢萧峰驰援、共商雁门暗流并铭碑志功！',
      nextHint:
        '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「凯旋大雄正殿 · 与萧峰论侠并铭碑志功」。',
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
      id: 'trig_slq41_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q41_start_triggered',
      condition: SHAOLIN_Q41_START_CONDITION,
      effects: [openScene('scene_slq41_01', SHAOLIN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_slq41_bell',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q41_bell_triggered',
      condition: atStep(SHAOLIN_Q41_QUEST_ID, 'bell_alarm'),
      effects: [openScene('scene_slq41_02', SHAOLIN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_slq41_vanguard',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      onceFlag: 'sl_q41_vanguard_triggered',
      condition: atStep(SHAOLIN_Q41_QUEST_ID, 'break_poison_vanguard'),
      effects: [openScene('scene_slq41_04', SHAOLIN_Q41_QUEST_ID)],
    },
    {
      id: 'trig_slq41_charge',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q41_charge_triggered',
      condition: atStep(SHAOLIN_Q41_QUEST_ID, 'qiaofeng_charge'),
      effects: [
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'sl_q41_target', op: 'eq', value: 'ding' },
          thenEffects: [openScene('scene_slq41_08b', SHAOLIN_Q41_QUEST_ID)],
          elseEffects: [openScene('scene_slq41_08a', SHAOLIN_Q41_QUEST_ID)],
        },
      ],
    },
    {
      id: 'trig_slq41_memorial',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q41_memorial_triggered',
      condition: atStep(SHAOLIN_Q41_QUEST_ID, 'victory_memorial'),
      effects: [openScene('scene_slq41_12', SHAOLIN_Q41_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq41_start',
      label: '【少林终局合战】听九十九响急钟 · 西夏与星宿三路火烧少林',
      badge: '千僧列阵',
      subtitle: '宗师上品史诗合战 · 赫连铁树与丁春秋两千铁骑毒人压境',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: SHAOLIN_Q41_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q41_start_triggered', value: true },
        openScene('scene_slq41_01', SHAOLIN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq41_bell',
      label: '【千僧列阵】升帐点兵 · 亲布五百罗汉伏魔大阵',
      badge: '点兵布阵',
      subtitle: '调度玄难、玄痛、玄寂三路迎敌，亲定破毒阵略',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q41_QUEST_ID, 'bell_alarm'),
      effects: [
        { type: 'setFlag', flag: 'sl_q41_bell_triggered', value: true },
        openScene('scene_slq41_02', SHAOLIN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq41_vanguard',
      label: '【千僧列阵】催动五百罗汉大阵 · 破灭星宿毒雾前军',
      badge: '罗汉破毒',
      subtitle: '火风反吹奇袭或重盾罗汉血战，与玄难共破前军',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      visibleWhen: atStep(SHAOLIN_Q41_QUEST_ID, 'break_poison_vanguard'),
      effects: [
        { type: 'setFlag', flag: 'sl_q41_vanguard_triggered', value: true },
        openScene('scene_slq41_04', SHAOLIN_Q41_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq41_charge',
      label: '【千僧列阵】与萧峰并肩冲阵 · 决战赫连铁树与丁春秋',
      badge: '斩旗破敌',
      subtitle: '宗师上品终极合战 · 依商定主攻顺序斩旗破毒',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q41_QUEST_ID, 'qiaofeng_charge'),
      effects: [
        { type: 'setFlag', flag: 'sl_q41_charge_triggered', value: true },
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'sl_q41_target', op: 'eq', value: 'ding' },
          thenEffects: [openScene('scene_slq41_08b', SHAOLIN_Q41_QUEST_ID)],
          elseEffects: [openScene('scene_slq41_08a', SHAOLIN_Q41_QUEST_ID)],
        },
      ],
    },
    {
      id: 'spot_slq41_memorial',
      label: '【千僧列阵】凯旋大雄正殿 · 与萧峰论侠并铭碑志功',
      badge: '血护少室',
      subtitle: '少林千年大捷，获赐御笔「护国禅林」金匾',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q41_QUEST_ID, 'victory_memorial'),
      effects: [
        { type: 'setFlag', flag: 'sl_q41_memorial_triggered', value: true },
        openScene('scene_slq41_12', SHAOLIN_Q41_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq41_xuannan_start',
      label: '听取玄难急报 · 西夏与星宿三路大军压境少室山',
      badge: '千僧列阵',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0127'] },
          SHAOLIN_Q41_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q41_start_triggered', value: true },
        openScene('scene_slq41_01', SHAOLIN_Q41_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinThousandMonkWarQuest.scenes').then((m) => m.SHAOLIN_Q41_SCENES),
}

export const SHAOLIN_Q41_QUESTS: QuestDefinition[] = [shaolinThousandMonkWarQuest]
