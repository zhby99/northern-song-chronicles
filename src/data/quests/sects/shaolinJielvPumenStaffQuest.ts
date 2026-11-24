import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q13_QUEST_ID = 'QST-SECT-01-13'

export const SHAOLIN_Q13_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 2 },
    qStatus('QST-SECT-01-04', 'completed'),
    qStatus(SHAOLIN_Q13_QUEST_ID, 'not_started'),
    flag('sl_branch', 'eq', 'jielv'),
    flag('shaolin_disciple_type', 'eq', 'monk'),
    { type: 'skillAtLeast', key: '经义', min: 50 },
    { type: 'npcAlive', npcId: 'NPC-0134', npcName: '玄寂' },
    { type: 'npcAlive', npcId: 'NPC-0193', npcName: '玄净' },
  ],
}

export const SHAOLIN_Q13_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q13_QUEST_ID,
    title: '钟鼓执杖 · 清规如铁',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '二流下品',
    maxOpponentRealm: '二流下品（破戒叛僧 · 慧癞）',
    recommendedNote:
      '嵩山少林寺 Lv.2 戒律药王脉首回任务链（全十一幕，出家弟子专属）。归入戒律药王院后，于钟鼓禅院演武坪蒙玄寂亲授《普门杖法》，奉谕驰赴汝州南郊下院古庙查办破戒叛僧慧癞闹事反咬案。动手前可凭算术查账验米仓、辩才当堂质询证人揭穿其私吞香火赌酒铁证，或执杖径直拿人；生擒慧癞后直面其孤老苦情，于「清规如铁 · 逐出山门」与「慈悲度化 · 废功留院劈柴赎罪」间定下执戒之道。',
    startHint:
      '晋升少林内门并归入戒律药王脉（出家弟子）、经义 ≥ 50 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】拜见玄寂长老即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    },
    startCondition: SHAOLIN_Q13_START_CONDITION,
    summary:
      '{reignYear}清秋晨钟初歇，你既已剃度晋升内门、归入戒律药王一脉，于【钟鼓禅院 · 演武坪】蒙戒律院主【玄寂】亲授少林执杖正法《普门杖法》。未料汝州急报骤至：昔日派赴汝州下院的杂役僧【慧癞】破戒伤人，更在古庙院前反咬下院老住持克扣斋粮、挑拨围观乡民。你佩紫铜令牌星夜驰赴汝州下院古庙，或以算术验仓、或以辩才质证揭穿其私吞香火赌钱藏酒的真面目，亦可径直执杖震慑拿人。杖下生擒慧癞、听闻其孤老李老丈血泪实情后，你在逐出山门与废功留院劈柴赎罪之间定下生平第一道戒律裁断。',
    initialStepId: 'pumen_staff_drill',
    steps: {
      pumen_staff_drill: {
        id: 'pumen_staff_drill',
        title: '钟鼓受杖 · 领谕下山',
        objective:
          '玄寂长老已于【钟鼓禅院 · 演武坪】开讲《普门杖法》要义，并有汝州下院急报传上山门。请留在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】听训受杖、领令牌下山。',
        nextHint:
          '在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】点击「听受《普门杖法》 · 领戒律令牌」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
      ruzhou_temple_verdict: {
        id: 'ruzhou_temple_verdict',
        title: '汝州古庙 · 查案擒叛',
        objective:
          '已领戒律院紫铜令牌并习得《普门杖法》，破戒叛僧慧癞正于汝州南郊下院古庙反咬老住持、蛊惑乡民。请于【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】出发驰赴汝州现场查证并擒拿慧癞！',
        nextHint:
          '在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】点击「驰赴汝州下院古庙 · 现场查案擒拿慧癞」。',
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
        id: 'trig_slq13_start_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q13_start_triggered',
        condition: SHAOLIN_Q13_START_CONDITION,
        effects: [openScene('scene_slq13_01', SHAOLIN_Q13_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq13_start_west',
        label: '【戒律院】钟鼓执杖 · 听玄寂长老训示清规',
        badge: '清规如铁',
        subtitle: '第一幕 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_Q13_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q13_start_triggered', value: true },
          openScene('scene_slq13_01', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq13_staff_drill',
        label: '【戒律院】演武坪受法 · 参悟《普门杖法》并接汝州急报',
        badge: '普门杖法',
        subtitle: '第二幕 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
        effects: [openScene('scene_slq13_02', SHAOLIN_Q13_QUEST_ID)],
      },
      {
        id: 'spot_slq13_ruzhou_chase',
        label: '【戒律院】驰赴汝州下院古庙 · 现场查案擒拿慧癞',
        badge: '古庙查案',
        subtitle: '验仓查账、质询证人或执杖立威 · 裁断清规',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q13_QUEST_ID, 'ruzhou_temple_verdict'),
        effects: [openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID)],
      },
    ],

    npcActions: [
      {
        id: 'act_slq13_start_npc',
        label: '合十参礼 · 领受戒律院执杖初训',
        badge: '清规如铁',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            SHAOLIN_Q13_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q13_start_triggered', value: true },
          openScene('scene_slq13_01', SHAOLIN_Q13_QUEST_ID),
        ],
      },
      {
        id: 'act_slq13_continue_npc',
        label: '向玄寂师伯禀告 · 续行汝州查案缉叛之任',
        badge: '普门杖法',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0134'] },
            {
              type: 'any',
              conditions: [
                atStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
                atStep(SHAOLIN_Q13_QUEST_ID, 'ruzhou_temple_verdict'),
              ],
            },
          ],
        },
        effects: [
          {
            type: 'branch',
            condition: atStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
            thenEffects: [openScene('scene_slq13_02', SHAOLIN_Q13_QUEST_ID)],
            elseEffects: [openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvPumenStaffQuest.scenes').then((m) => m.SCENES),
  },
]
