import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q37_QUEST_ID = 'QST-SECT-01-37'

export const SHAOLIN_Q37_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 4 },
    qStatus('QST-SECT-01-35', 'completed'),
    qStatus(SHAOLIN_Q37_QUEST_ID, 'not_started'),
    {
      type: 'any',
      hint: '须为金刚降魔脉或俗家护法脉传人',
      conditions: [
        { type: 'flag', flag: 'sl_pavilion', op: 'eq', value: 'ironfist', label: '金刚降魔脉传人' },
        { type: 'flag', flag: 'sl_branch', op: 'eq', value: 'layman', label: '俗家护法脉传人' },
      ],
    },
    { type: 'skillAtLeast', key: '经义', min: 75 },
    {
      type: 'any',
      hint: '须已修习《少林九阳功》或《盘山铁布衫（大成）》至少一重',
      conditions: [
        { type: 'learnedArtAtLeast', artId: 'MA-038', minLevel: 1 },
        { type: 'learnedArtAtLeast', artId: 'MA-080', minLevel: 1 },
      ],
    },
    { type: 'npcAlive', npcId: 'NPC-0113', npcName: '鸠摩智' },
    { type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
  ],
}

export const shaolinVajraBodyAwakenQuest: QuestDefinition = {
  id: SHAOLIN_Q37_QUEST_ID,
  title: '烈火金身 · 金刚不坏',
  category: 'sect_mission',
  factionId: 'SECT-01',
  regionId: 'shaolin',
  recommendedRealm: '宗师中品',
  maxOpponentRealm: '宗师中品（吐蕃国师 · 鸠摩智［火焰刀全力］）',
  recommendedNote:
    '嵩山少林寺 Lv.4 金刚降魔脉 / 俗家护法脉天阶神功觉醒线（全十三幕）。须完成《少室群雄 · 方丈丑闻》、经义 ≥ 75 且已修习《少林九阳功》或《盘山铁布衫（大成）》。鸠摩智趁乱以无形火焰刀连伤玄痛、玄寂，丁春秋暗放腐尸毒烟合围丹墀！你不退反进踏入火毒炼狱，历经两重硬功淬炼抉择，骨骼雷鸣泛起淡金宝光破茧悟成天阶外功《金刚不坏体神功》（出家僧众当场习得），随后踏下演武坪硬吃全力火焰刀一拳震飞鸠摩智，确立铁腕或红尘护教威望！',
  startHint:
    '完成《少室群雄 · 方丈丑闻》、属金刚降魔脉或俗家护法脉、经义 ≥ 75 且已习得《少林九阳功》或《盘山铁布衫（大成）》后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】即可直面丹墀火劫。',
  startLocation: {
    regionId: 'shaolin',
    buildingId: 'sl_daxiong',
    spotId: 'sl_daxiong_west',
    customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
  },
  startCondition: SHAOLIN_Q37_START_CONDITION,
  summary:
    '{reignYear}秋，少室山丑闻震荡全寺之际，吐蕃国师【鸠摩智】趁乱发难，悍然施展密宗绝学「火焰刀」无形罡气，接连重创挺身护寺的【玄痛】与【玄寂】两位高僧！星宿老怪【丁春秋】更趁火打劫，暗中掷出剧毒「腐尸毒烟」笼罩丹墀！生死存亡关头，你不退反进踏入烈火毒雾绝境，历经火毒熔炉两重淬炼，骨骼雷鸣、皮膜泛起淡金宝光，当场破茧成身悟透天阶外功《金刚不坏体神功》！震散星宿毒烟后，你步下【钟鼓禅院 · 演武坪】正面硬撼鸠摩智全力火焰刀，一拳雷霆将大轮明王轰飞十丈，一战镇压少室群豪！',
  initialStepId: 'fire_and_poison_crucible',
  steps: {
    fire_and_poison_crucible: {
      id: 'fire_and_poison_crucible',
      title: '烈火毒雾 · 护僧入绝境',
      objective:
        '鸠摩智火焰刀已连伤玄痛、玄寂二僧，丁春秋更趁乱暗放腐尸毒烟封锁大雄正殿丹墀！请立刻踏入【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】护住二位重伤长老，于火毒熔炉中破关成身！',
      nextHint:
        '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「逆踏烈火毒雾护住玄痛玄寂 · 极限破关悟成金刚不坏金身」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
      },
    },
    vajra_body_crush: {
      id: 'vajra_body_crush',
      title: '金刚镇世 · 硬撼火焰刀',
      objective:
        '你已于火毒熔炉中破茧成身并震散星宿毒烟！可先稳固境界，再大步踏下【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，正面硬撼鸠摩智全力火焰刀，将大轮明王震飞镇压群豪！',
      nextHint:
        '前往【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「以金刚不坏金身硬撼火焰刀 · 决战震飞大轮明王鸠摩智」。',
      targetLocation: {
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_slq37_start',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q37_start_triggered',
      condition: SHAOLIN_Q37_START_CONDITION,
      effects: [openScene('scene_slq37_01', SHAOLIN_Q37_QUEST_ID)],
    },
    {
      id: 'trig_slq37_crucible',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      onceFlag: 'sl_q37_crucible_triggered',
      condition: atStep(SHAOLIN_Q37_QUEST_ID, 'fire_and_poison_crucible'),
      effects: [openScene('scene_slq37_04', SHAOLIN_Q37_QUEST_ID)],
    },
    {
      id: 'trig_slq37_crush',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      onceFlag: 'sl_q37_crush_triggered',
      condition: atStep(SHAOLIN_Q37_QUEST_ID, 'vajra_body_crush'),
      effects: [openScene('scene_slq37_08', SHAOLIN_Q37_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_slq37_start',
      label: '【金刚不坏觉醒】丹墀突生火劫 · 鸠摩智火焰刀连伤二僧',
      badge: '烈火金身',
      subtitle: '钟鼓禅院演武坪 · 金刚降魔脉 / 俗家护法脉天阶神功觉醒',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: SHAOLIN_Q37_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'sl_q37_start_triggered', value: true },
        openScene('scene_slq37_01', SHAOLIN_Q37_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq37_crucible',
      label: '【烈火金身】逆踏烈火毒雾护住玄痛玄寂 · 极限破关悟成金身',
      badge: '火毒破关',
      subtitle: '第四幕 · 火毒熔炉两重硬功淬炼，骨骼雷鸣淡金宝光现世',
      tone: 'gold',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      visibleWhen: atStep(SHAOLIN_Q37_QUEST_ID, 'fire_and_poison_crucible'),
      effects: [
        { type: 'setFlag', flag: 'sl_q37_crucible_triggered', value: true },
        openScene('scene_slq37_04', SHAOLIN_Q37_QUEST_ID),
      ],
    },
    {
      id: 'spot_slq37_crush',
      label: '【烈火金身】以金刚不坏金身硬撼火焰刀 · 决战震飞鸠摩智',
      badge: '镇压群豪',
      subtitle: '第八幕 · 正面硬吃火焰刀罡气，雷霆击飞大轮明王',
      tone: 'danger',
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      visibleWhen: atStep(SHAOLIN_Q37_QUEST_ID, 'vajra_body_crush'),
      effects: [
        { type: 'setFlag', flag: 'sl_q37_crush_triggered', value: true },
        openScene('scene_slq37_08', SHAOLIN_Q37_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_slq37_start_xuantong',
      label: '驰援玄痛师叔 · 迎战鸠摩智火焰刀与丁春秋毒烟',
      badge: '烈火金身',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0156', 'NPC-0134'] },
          SHAOLIN_Q37_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'sl_q37_start_triggered', value: true },
        openScene('scene_slq37_01', SHAOLIN_Q37_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./shaolinVajraBodyAwakenQuest.scenes').then((m) => m.SHAOLIN_Q37_SCENES),
}
