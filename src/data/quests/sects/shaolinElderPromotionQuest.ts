import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_Q33_QUEST_ID = 'QST-SECT-01-33'

export const SHAOLIN_Q33_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus('QST-SECT-01-32', 'completed'),
    qStatus(SHAOLIN_Q33_QUEST_ID, 'not_started'),
    { type: 'sectDaysAtLeast', sectId: 'SECT-01', min: 720 },
    { type: 'skillAtLeast', key: '经义', min: 85 },
    { type: 'skillAtLeast', key: '书', min: 70 },
    { type: 'skillAtLeast', key: '辩才', min: 55 },
    { type: 'npcFavorAtLeast', npcId: 'NPC-0112', min: 80, npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0112', npcName: '玄慈' },
    { type: 'npcAlive', npcId: 'NPC-0127', npcName: '玄难' },
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_Q33_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_Q33_QUEST_ID,
    title: '菩提院议 · 首座之争',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '宗师下品',
    maxOpponentRealm: '宗师下品（首座演武印证 · 玄痛 / 玄难）',
    recommendedNote:
      '嵩山少林寺 Lv.3 真传晋升 Lv.4 长老/堂院首座终极合流大典（全十一幕）。须入寺满二载（720 日）、完成《药王瘟劫 · 九转回魂》，且经义 ≥ 85、书法 ≥ 70、辩才 ≥ 55、玄慈方丈好感 ≥ 80。大雄正殿召开全寺玄字辈菩提院大议，你先赴钟鼓禅院演武坪自选向刚猛铁掌玄痛或宗师下品禅武玄难演武印证，再返大雄正殿就「乱世少林当闭寺清修抑或入世护国」舌战群僧，玄慈与诸老依你的治寺纲领与藏经阁旧择给出差异化评语，终亲赐红锦首座袈裟晋升 Lv.4 少林长老！',
    startHint:
      '入寺满二载（720 日）、完成《药王瘟劫 · 九转回魂》且经义 ≥ 85、书 ≥ 70、辩才 ≥ 55、玄慈好感 ≥ 80 后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团】（或寻玄慈、玄难、玄痛）开启首座晋升大议。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_main',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团',
    },
    startCondition: SHAOLIN_Q33_START_CONDITION,
    summary:
      '{reignYear}仲春，你入嵩山少林寺已满二载！玄慈方丈于【大雄正殿 · 佛前蒲团】召集全寺玄字辈高僧召开「菩提院大议」，议定新一任少林长老与堂院首座人选，并辩论乱世治寺方略。你先步入【钟鼓禅院 · 演武坪】，自选向戒律院首座【玄痛】印证刚猛武道或向达摩院首座【玄难】印证宗师禅机；继而重返大雄正殿，就「山河动荡、辽夏窥伺，少林当闭寺清修抑或入世护国」的核心辩题舌战群僧！玄慈与诸位高僧印证你的肺腑纲领与藏经阁旧择后一致折服，亲授红锦首座袈裟与紫檀印信，正式敕封你晋升【少林长老 / 堂院首座】（Lv.4）！',
    initialStepId: 'elder_spar_verification',
    steps: {
      elder_spar_verification: {
        id: 'elder_spar_verification',
        title: '演武印证 · 首座考校',
        objective:
          '菩提院大议已启，按少林祖制须先以武印道！请前往【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，择请戒律院首座玄痛或达摩院首座玄难演武印证！',
        nextHint:
          '前往【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「登钟鼓演武坪 · 与玄痛或玄难首座演武印证」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
      bodhi_hall_debate: {
        id: 'bodhi_hall_debate',
        title: '舌战群僧 · 授衣晋阶',
        objective:
          '演武印证已令满坪折服！请重返【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，就乱世治寺纲领舌战玄字辈群僧，领受首座红锦袈裟、晋升 Lv.4 长老/堂院首座！',
        nextHint:
          '前往【大雄宝殿方丈院 · 大雄正殿 · 佛前蒲团（sl_daxiong_main）】，点击「返大雄正殿 · 舌战群僧并领受首座袈裟」。',
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
        id: 'trig_slq33_start_main',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q33_start_triggered',
        condition: SHAOLIN_Q33_START_CONDITION,
        effects: [openScene('scene_slq33_01', SHAOLIN_Q33_QUEST_ID)],
      },
      {
        id: 'trig_slq33_spar_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_q33_spar_triggered',
        condition: atStep(SHAOLIN_Q33_QUEST_ID, 'elder_spar_verification'),
        effects: [openScene('scene_slq33_02', SHAOLIN_Q33_QUEST_ID)],
      },
      {
        id: 'trig_slq33_debate_main',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        onceFlag: 'sl_q33_debate_triggered',
        condition: atStep(SHAOLIN_Q33_QUEST_ID, 'bodhi_hall_debate'),
        effects: [openScene('scene_slq33_05_hall_return', SHAOLIN_Q33_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_slq33_start_main',
        label: '【首座晋升】二载听钟 · 赴大雄正殿菩提院大议',
        badge: '首座之争',
        subtitle: '大雄正殿 · 佛前蒲团 · 晋升 Lv.4 长老/首座',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: SHAOLIN_Q33_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_q33_start_triggered', value: true },
          openScene('scene_slq33_01', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq33_spar_west',
        label: '【首座晋升】登钟鼓演武坪 · 与玄痛或玄难首座演武印证',
        badge: '演武印证',
        subtitle: '钟鼓禅院 · 演武坪（宗师下品切磋）',
        tone: 'danger',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_Q33_QUEST_ID, 'elder_spar_verification'),
        effects: [
          { type: 'setFlag', flag: 'sl_q33_spar_triggered', value: true },
          openScene('scene_slq33_02', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'spot_slq33_debate_main',
        label: '【首座晋升】返大雄正殿 · 舌战群僧并领受首座袈裟',
        badge: '舌战晋阶',
        subtitle: '大雄正殿 · 佛前蒲团',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_main',
        visibleWhen: atStep(SHAOLIN_Q33_QUEST_ID, 'bodhi_hall_debate'),
        effects: [
          { type: 'setFlag', flag: 'sl_q33_debate_triggered', value: true },
          openScene('scene_slq33_05_hall_return', SHAOLIN_Q33_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_slq33_start_npc',
        label: '合十参赴【菩提院议 · 首座之争】晋升大典',
        badge: '首座之争',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0127', 'NPC-0156'] },
            SHAOLIN_Q33_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q33_start_triggered', value: true },
          openScene('scene_slq33_01', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'act_slq33_spar_npc',
        label: '请教首座高招 · 进行晋升长老演武印证',
        badge: '演武印证',
        tone: 'danger',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0127', 'NPC-0156'] },
            atStep(SHAOLIN_Q33_QUEST_ID, 'elder_spar_verification'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q33_spar_triggered', value: true },
          openScene('scene_slq33_02', SHAOLIN_Q33_QUEST_ID),
        ],
      },
      {
        id: 'act_slq33_debate_npc',
        label: '于玄慈方丈座前陈词 · 舌战群僧领受首座袈裟',
        badge: '舌战晋阶',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0112', 'NPC-0127', 'NPC-0156'] },
            atStep(SHAOLIN_Q33_QUEST_ID, 'bodhi_hall_debate'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_q33_debate_triggered', value: true },
          openScene('scene_slq33_05_hall_return', SHAOLIN_Q33_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinElderPromotionQuest.scenes').then((m) => m.SCENES),
  },
]
