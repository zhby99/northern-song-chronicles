import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q08_QUEST_ID = 'QST-SECT-01-08'

export const SHAOLIN_Q08_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    { type: 'flag', flag: 'shaolin_disciple_type', op: 'eq', value: 'monk', label: '已剃度出家为少林僧众' },
    qStatus('QST-SECT-01-07', 'completed'),
    qStatus(SHAOLIN_Q08_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 1800 },
    { type: 'skillAtLeast', key: '经义', min: 70 },
    { type: 'skillAtLeast', key: '书', min: 50 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0112', min: 50, npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0254', npcName: '慧轮' },
    { type: 'npcAlive', npcId: 'NPC-0126', npcName: '玄苦' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q08_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q08_QUEST_ID,
    title: '十八铜人 · 罗汉金身',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流上品 ～ 一流下品',
    maxOpponentRealm: '一流下品（铜人阵眼 · 慧轮）',
    recommendedNote:
      '嵩山少林寺罗汉堂脉 Lv.2 内门晋升 Lv.3 真传弟子终极考阵（全二十二幕）。须入寺满 1800 日、完成碎碑擒龙之役，且经义 ≥ 70、书法 ≥ 50、玄慈方丈好感 ≥ 50。于罗汉堂演武正殿单身硬闯慧轮、慧印等十八金漆铜人所布「三才六合大阵」，连破伏魔棍阵、金身刀盾阵与核心阵眼慧轮三关；破阵而出时少林古钟连鸣九响，赴大雄正殿蒙玄慈方丈亲赐袈裟、册封少林派 Lv.3【真传弟子】！',
    startHint:
      '入寺满 1800 日、完成【碎碑擒龙 · 少室捉谍】且经义 ≥ 70、书 ≥ 50、玄慈好感 ≥ 50 后，前往【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿】（或寻玄苦、玄痛、慧轮）叩关挑战十八铜人三才六合大阵。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_luohan',
      spotId: 'sl_luohan_main',
      customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
    },
    startCondition: SHAOLIN_Q08_START_CONDITION,
    summary:
      '{reignYear}五载寒暑瞬息而过，你在少林罗汉堂潜修禅武、屡立奇功，终于迎来少林寺传承百年的真传终极试炼——【十八铜人 · 罗汉金身】！在降魔尊者【玄苦】与戒律长老【玄痛】监阵之下，你只身步入【罗汉堂演武正殿】，直面大金刚僧【慧轮】、禅武僧【慧印】等十八名身涂金漆的罗汉堂顶尖武僧所布「三才六合大阵」。你以《慈悲刀法》《韦陀杵》《龙爪手》融会贯通，先破慧印领衔的伏魔棍阵，再撕裂铜墙铁壁般的金身刀盾阵，终在核心阵眼一对一正面力挫一流下品的大金刚僧慧轮！十八铜人合十退让，少室古钟连鸣九响。你步入【大雄正殿 · 佛前蒲团】，蒙伏虎方丈【玄慈】亲授真传紫金袈裟，正式册封为嵩山少林寺【真传弟子】！',
    initialStepId: 'arhat_array_trial',
    steps: {
      arhat_array_trial: {
        id: 'arhat_array_trial',
        title: '三才六合 · 连破三阵',
        objective:
          '十八金漆铜人已在【十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】列成「三才六合大阵」！请单身闯阵，依次连破【伏魔棍阵】、【金身刀盾阵】与核心阵眼【大金刚僧 · 慧轮】三关！',
        nextHint:
          '在【嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿（sl_luohan_main）】点击「步入十八铜人大阵 · 连破棍阵刀盾阵与慧轮」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_luohan',
          spotId: 'sl_luohan_main',
          customLabel: '嵩山少林寺 · 十八铜人罗汉堂 · 罗汉堂演武正殿',
        },
      },
      zhenchuan_ceremony: {
        id: 'zhenchuan_ceremony',
        title: '钟鸣九响 · 册封真传',
        objective:
          '你已硬闯十八金漆铜人三才六合大阵，力挫核心阵眼慧轮！少林钟楼古钟九响震彻嵩岳，请速赴【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】受玄慈方丈亲封少林【真传弟子】！',
        nextHint:
          '前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「登大雄正殿 · 受玄慈方丈册封真传弟子」。',
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
        id: 'trig_slq08_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_q08_start_triggered',
        condition: SHAOLIN_Q08_START_CONDITION,
        effects: [openScene('scene_slq08_01', SHAOLIN_Q08_QUEST_ID)],
      },
      {
        id: 'trig_slq08_array_main',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        onceFlag: 'sl_q08_array_triggered',
        condition: atStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
        effects: [openScene('scene_slq08_04', SHAOLIN_Q08_QUEST_ID)],
      },
      {
        id: 'trig_slq08_ceremony_daxiong',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q08_ceremony_triggered',
        condition: atStep(SHAOLIN_Q08_QUEST_ID, 'zhenchuan_ceremony'),
        effects: [openScene('scene_slq08_19', SHAOLIN_Q08_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq08_start_main',
        label: '【真传大考】叩关罗汉堂正殿 · 挑战十八铜人三才六合大阵',
        badge: '十八铜人',
        subtitle: '五载苦修圆满 · 罗汉堂演武正殿',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: SHAOLIN_Q08_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q08_start_triggered', value: true },
          openScene('scene_slq08_01', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq08_array_main',
        label: '【真传大考】步入十八铜人大阵 · 连破棍阵刀盾阵与慧轮',
        badge: '连破三阵',
        subtitle: '棍阵 → 刀盾阵 → 阵眼慧轮（一流下品）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_luohan',
        spotId: 'sl_luohan_main',
        visibleWhen: atStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
        effects: [
          { type: 'setFlag', flag: 'sl_q08_array_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q08_wave2_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq08_13', SHAOLIN_Q08_QUEST_ID)],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q08_wave1_cleared', op: 'truthy' },
                thenEffects: [openScene('scene_slq08_09', SHAOLIN_Q08_QUEST_ID)],
                elseEffects: [openScene('scene_slq08_04', SHAOLIN_Q08_QUEST_ID)],
              },
            ],
          },
        ],
      },
      {
        id: 'spot_slq08_ceremony_daxiong',
        label: '【真传大典】登大雄正殿 · 受玄慈方丈册封真传弟子',
        badge: '钟鸣九响',
        subtitle: '大雄正殿 · 佛前蒲团（晋升 Lv.3 真传弟子）',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q08_QUEST_ID, 'zhenchuan_ceremony'),
        effects: [
          { type: 'setFlag', flag: 'sl_q08_ceremony_triggered', value: true },
          openScene('scene_slq08_19', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq08_start_npc',
        label: '合十请闯【十八铜人三才六合大阵】以求真传',
        badge: '十八铜人',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126', 'NPC-0156', 'NPC-0254'] },
            SHAOLIN_Q08_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q08_start_triggered', value: true },
          openScene('scene_slq08_01', SHAOLIN_Q08_QUEST_ID),
        ],
      },
      {
        id: 'act_slq08_array_npc',
        label: '向监阵高僧与铜人施礼 · 续闯十八铜人三才六合大阵',
        badge: '连破三阵',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0126', 'NPC-0156', 'NPC-0254'] },
            atStep(SHAOLIN_Q08_QUEST_ID, 'arhat_array_trial'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q08_array_triggered', value: true },
          {
            type: 'branch',
            condition: { type: 'flag', flag: 'sl_q08_wave2_cleared', op: 'truthy' },
            thenEffects: [openScene('scene_slq08_13', SHAOLIN_Q08_QUEST_ID)],
            elseEffects: [
              {
                type: 'branch',
                condition: { type: 'flag', flag: 'sl_q08_wave1_cleared', op: 'truthy' },
                thenEffects: [openScene('scene_slq08_09', SHAOLIN_Q08_QUEST_ID)],
                elseEffects: [openScene('scene_slq08_04', SHAOLIN_Q08_QUEST_ID)],
              },
            ],
          },
        ],
      },
      {
        id: 'act_slq08_ceremony_npc',
        label: '跪拜玄慈方丈 · 领受少林真传弟子紫金袈裟',
        badge: '钟鸣九响',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0126', 'NPC-0156'] },
            atStep(SHAOLIN_Q08_QUEST_ID, 'zhenchuan_ceremony'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q08_ceremony_triggered', value: true },
          openScene('scene_slq08_19', SHAOLIN_Q08_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinLuohanArhatArrayQuest.scenes').then((m) => m.SCENES),
  },
]
