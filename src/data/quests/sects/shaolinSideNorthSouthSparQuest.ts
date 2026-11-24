import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const SHAOLIN_SIDE14_QUEST_ID = 'QST-SECT-01-SIDE-14'

export const SHAOLIN_SIDE14_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-01', minRank: 3 },
    qStatus(SHAOLIN_SIDE14_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0156', npcName: '玄痛' },
  ],
}

export const SHAOLIN_SIDE14_QUESTS: QuestDefinition[] = [
  {
    id: SHAOLIN_SIDE14_QUEST_ID,
    title: '铁线争锋 · 闽僧北访',
    category: 'sect_mission',
    factionId: 'SECT-01',
    regionId: 'shaolin',
    recommendedRealm: '一流中品',
    maxOpponentRealm: '一流中品（南少林护寺首座 · 元通 / 铁桥师兄）',
    recommendedNote:
      '少林寺 Lv.3 南北印证支线（全九幕）。跻身三阶高徒后，于大雄宝殿方丈院钟鼓禅院演武坪遇莆田南少林三位护寺首座（元通、铁桥师兄、洪刚师兄）奉南宗法帖北上嵩山以武会友（若曾完成《莆田南渡 · 南北少林》更有故友重逢叙旧剧情）。先雅论南北禅武异同，再于演武坪依次切磋一流中品铁桥师兄与元通首座；战后赴东厢碑廊品茗论艺，倾囊交流或谦逊请教皆可获南宗倾授《铁线拳》（已习得者化为深厚武学修为）。',
    startHint:
      '跻身少林寺三阶高徒后，前往【嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】寻玄痛长老即可触发。',
    startLocation: {
      regionId: 'shaolin',
      buildingId: 'sl_daxiong',
      spotId: 'sl_daxiong_west',
      customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
    },
    startCondition: SHAOLIN_SIDE14_START_CONDITION,
    summary:
      '{reignYear}金秋，福建莆田南少林三位护寺首座——【元通】、【铁桥师兄】与【洪刚师兄】携南宗拜帖千里北上嵩山，于【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪】拜会铁掌禅师【玄痛】，愿以武会友、印证南北少林拳脉。玄痛长老点名由你代表嵩山迎客。你先与南宗诸僧雅论南北禅武异同，旋即于秋风演武坪依次切磋一流中品【铁桥师兄】与南少林大首座【元通】，刚柔互破险胜半招。切磋既毕，南北同门移步【东厢碑廊 · 藏经橱】品茗论艺、互赠心得，元通慨然相授南宗秘传《铁线拳》（若已习得则化为深厚武学修为），南北少林情谊益笃。',
    initialStepId: 'courtyard_spar',
    steps: {
      courtyard_spar: {
        id: 'courtyard_spar',
        title: '钟鼓演武 · 南北印证',
        objective:
          '莆田南少林三位护寺首座已登嵩山，玄痛长老点名由你于【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】出战切磋，依次迎战铁桥师兄与元通首座！',
        nextHint:
          '在【大雄宝殿方丈院 · 钟鼓禅院 · 演武坪（sl_daxiong_west）】，点击「登演武坪与南少林护寺首座切磋印证」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_west',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 钟鼓禅院 · 演武坪',
        },
      },
      corridor_tea_gift: {
        id: 'corridor_tea_gift',
        title: '碑廊品茗 · 铁线相赠',
        objective:
          '钟鼓禅院南北少林切磋圆满落幕，元通首座对你大为倾佩！请移步【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，与玄痛长老及南少林诸僧共品清茶、互赠武学心得。',
        nextHint:
          '前往【大雄宝殿方丈院 · 东厢碑廊 · 藏经橱（sl_daxiong_east）】，点击「与元通首座及玄痛长老碑廊叙茗」。',
        targetLocation: {
          regionId: 'shaolin',
          buildingId: 'sl_daxiong',
          spotId: 'sl_daxiong_east',
          customLabel: '嵩山少林寺 · 大雄宝殿方丈院 · 东厢碑廊 · 藏经橱',
        },
      },
    },

    locationTriggers: [
      {
        id: 'trig_sls14_start_daxiong_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_side14_start_triggered',
        condition: SHAOLIN_SIDE14_START_CONDITION,
        effects: [openScene('scene_sls14_01', SHAOLIN_SIDE14_QUEST_ID)],
      },
      {
        id: 'trig_sls14_spar_daxiong_west',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        onceFlag: 'sl_side14_spar_triggered',
        condition: atStep(SHAOLIN_SIDE14_QUEST_ID, 'courtyard_spar'),
        effects: [openScene('scene_sls14_03', SHAOLIN_SIDE14_QUEST_ID)],
      },
      {
        id: 'trig_sls14_tea_daxiong_east',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        onceFlag: 'sl_side14_tea_triggered',
        condition: atStep(SHAOLIN_SIDE14_QUEST_ID, 'corridor_tea_gift'),
        effects: [openScene('scene_sls14_07', SHAOLIN_SIDE14_QUEST_ID)],
      },
    ],

    spotActions: [
      {
        id: 'spot_sls14_start',
        label: '【少林支线】迎候莆田南少林三护寺首座北访',
        badge: '闽僧北访',
        subtitle: '钟鼓禅院 · 演武坪',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: SHAOLIN_SIDE14_START_CONDITION,
        effects: [
          { type: 'setFlag', flag: 'sl_side14_start_triggered', value: true },
          openScene('scene_sls14_01', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls14_spar',
        label: '【少林支线】登演武坪与南少林护寺首座切磋印证',
        badge: '铁线争锋',
        subtitle: '钟鼓禅院 · 演武坪',
        tone: 'jade',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_west',
        visibleWhen: atStep(SHAOLIN_SIDE14_QUEST_ID, 'courtyard_spar'),
        effects: [
          { type: 'setFlag', flag: 'sl_side14_spar_triggered', value: true },
          openScene('scene_sls14_03', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'spot_sls14_tea',
        label: '【少林支线】与元通首座及玄痛长老碑廊叙茗',
        badge: '南北同源',
        subtitle: '东厢碑廊 · 藏经橱',
        tone: 'gold',
        regionId: 'shaolin',
        buildingId: 'sl_daxiong',
        spotId: 'sl_daxiong_east',
        visibleWhen: atStep(SHAOLIN_SIDE14_QUEST_ID, 'corridor_tea_gift'),
        effects: [
          { type: 'setFlag', flag: 'sl_side14_tea_triggered', value: true },
          openScene('scene_sls14_07', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
    ],

    npcActions: [
      {
        id: 'act_sls14_start_npc',
        label: '向玄痛长老请命出战迎候南少林三首座',
        badge: '闽僧北访',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
            SHAOLIN_SIDE14_START_CONDITION,
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side14_start_triggered', value: true },
          openScene('scene_sls14_01', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
      {
        id: 'act_sls14_tea_npc',
        label: '赴东厢碑廊陪玄痛长老与南少林诸僧叙茗',
        badge: '南北同源',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0156'] },
            atStep(SHAOLIN_SIDE14_QUEST_ID, 'corridor_tea_gift'),
          ],
        },
        effects: [
          { type: 'setFlag', flag: 'sl_side14_tea_triggered', value: true },
          openScene('scene_sls14_07', SHAOLIN_SIDE14_QUEST_ID),
        ],
      },
    ],

    loadScenes: () => import('./shaolinSideNorthSouthSparQuest.scenes').then((m) => m.SCENES),
  },
]
