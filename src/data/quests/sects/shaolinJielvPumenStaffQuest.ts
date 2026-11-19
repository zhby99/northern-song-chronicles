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
      '嵩山少林寺 Lv.2 戒律药王脉首回任务链（全十六幕，出家弟子专属）。归入戒律药王院后，于钟鼓禅院演武坪随玄寂长老受授《普门杖法》，奉谕星夜下山至汝州荒野山神庙追拿破戒杖杀巡检之叛僧慧癞。惊闻其杀官实因恶吏强抢俗家幼妹致死后，击败慧癞并于「严惩废功押回」与「安顿亲眷劝其自缚领罪」间抉择戒律执杖之道。',
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
      '{reignYear}清秋晨钟初歇，你既已剃度晋升内门、归入戒律药王一脉，于【钟鼓禅院 · 演武坪】蒙戒律院主【玄寂】亲授少林执杖正法《普门杖法》。未料汝州公文骤至：原寺中破戒叛僧【慧癞】竟在集镇杖毙巡检，逃匿汝州南郊山神庙。你奉戒律令牌驰赴荒庙擒敌，却骇然听闻那恶吏强抢慧癞俗家幼妹致其投井惨死、官府反诬其老父的血泪冤情。一战以普门杖法制伏慧癞后，你立于铁律与悲心之间，亲手定下此生第一道戒律裁断。',
    initialStepId: 'pumen_staff_drill',
    steps: {
      pumen_staff_drill: {
        id: 'pumen_staff_drill',
        title: '钟鼓受杖 · 领谕下山',
        objective:
          '玄寂长老已于【钟鼓禅院 · 演武坪】开讲《普门杖法》要义，并有汝州急报传上山门。请留在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】听训领命。',
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
        title: '汝州荒庙 · 擒拿慧癞',
        objective:
          '已领戒律院紫铜令牌，叛僧慧癞正藏身汝州南郊山神庙。请于【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】整装出发，驰赴汝州山神庙查明实情并擒拿慧癞归案！',
        nextHint:
          '在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】点击「驰赴汝州山神庙 · 追拿破戒叛僧慧癞」。',
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
        subtitle: '第三幕 · 钟鼓禅院演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q13_QUEST_ID, 'pumen_staff_drill'),
        effects: [openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID)],
      },
      {
        id: 'spot_slq13_ruzhou_chase',
        label: '【戒律院】驰赴汝州山神庙 · 追拿破戒叛僧慧癞',
        badge: '荒庙缉叛',
        subtitle: '第六幕 · 实战擒拿并裁断清规',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q13_QUEST_ID, 'ruzhou_temple_verdict'),
        effects: [openScene('scene_slq13_06', SHAOLIN_Q13_QUEST_ID)],
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
        label: '向玄寂师伯禀告 · 续行汝州缉叛之任',
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
            thenEffects: [openScene('scene_slq13_03', SHAOLIN_Q13_QUEST_ID)],
            elseEffects: [openScene('scene_slq13_06', SHAOLIN_Q13_QUEST_ID)],
          },
        ],
      },
    ],

    loadScenes: () => import('./shaolinJielvPumenStaffQuest.scenes').then((m) => m.SCENES),
  },
]
