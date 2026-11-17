import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-ADV-BABUGANCHAN'

export const BABUGANCHAN_QUESTS: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '秋蝉八步 · 汴洛遗踪',
    category: 'adventure',
    regionId: 'bianliang',
    recommendedRealm: '二流下品',
    maxOpponentRealm: '二流上品（阴九幽）',
    recommendedNote:
      '刚性前置：江湖声望 ≥ 120（无门派限制）；后续须先后前往开封樊楼、大相国寺及洛阳白马寺、牡丹园迎战截风门高手。',
    startHint:
      '江湖声望达到 120 后，前往【开封府 · 临街酒楼（醉仙楼 / 汴河虹桥临水酒肆）】即可自动触发（或点击「打探「秋蝉令」旧事」）开启奇遇。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bianliang_base_tavern',
      customLabel: '开封府 · 临街酒楼 · 醉仙楼（程万里）',
    },
    startCondition: { type: 'renownAtLeast', min: 120 },
    initialStepId: 'start_rumor',
    summary:
      '三十年前轻功宗师沈疏影护送边防密折遭“截风门”伏杀，地阶轻功《八步赶蝉》一分为三散落汴洛。江湖声望达 120 后，于开封汴河虹桥酒肆拾得半枚“秋蝉令”，循迹追查并集齐三卷秘谱，方可重现绝学。',
    steps: {
      start_rumor: {
        id: 'start_rumor',
        title: '虹桥残令问前尘',
        objective: '于开封汴河虹桥临水酒肆向听风老人程万里请教“秋蝉令”来历。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_tavern',
          customLabel: '开封府 · 汴河虹桥临水酒肆',
        },
      },
      kaifeng_fanlou: {
        id: 'kaifeng_fanlou',
        title: '夜探樊楼擒暗哨',
        objective: '前往开封樊楼【三层五楼飞桥雅阁】，截查潜伏东京的截风门暗哨。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_fanlou',
          spotId: 'bl_fl_towers',
          customLabel: '开封府 · 樊楼 · 三层五楼飞桥雅阁',
        },
      },
      kaifeng_pagoda: {
        id: 'kaifeng_pagoda',
        title: '资圣宝塔取上卷',
        objective: '前往开封大相国寺【资圣八角琉璃宝塔】，叩问守塔老僧并寻取上卷《蝉蜕息》。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
        },
      },
      luoyang_pagoda: {
        id: 'luoyang_pagoda',
        title: '西行白马求振羽',
        objective: '西行洛阳府白马寺【齐云密檐舍利古塔】，拜会青霜姥姥并抵御截风门二当家陆横。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_baimasi',
          spotId: 'ly_bm_pagoda',
          customLabel: '洛阳府 · 白马寺 · 齐云密檐舍利古塔',
        },
      },
      luoyang_waterside: {
        id: 'luoyang_waterside',
        title: '碧溪水榭破鬼影',
        objective: '驰援洛阳牡丹园【碧溪虹桥琴画水榭】，救出守谱少年阿蝉并力挫截风门主阴九幽，三卷合璧悟得《八步赶蝉》。',
        targetLocation: {
          regionId: 'luoyang',
          buildingId: 'ly_peony',
          spotId: 'ly_pn_waterside',
          customLabel: '洛阳府 · 洛阳牡丹园 · 碧溪虹桥琴画水榭',
        },
      },
      return_kaifeng: {
        id: 'return_kaifeng',
        title: '东返虹桥告故人',
        objective: '返回开封府【汴河虹桥临水酒肆】，向听风老人程万里复命饮酒。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_tavern',
          customLabel: '开封府 · 汴河虹桥临水酒肆',
        },
      },
    },
    locationTriggers: [
      {
        id: 'trig_bbgc_hongqiao_intro',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        onceFlag: 'bbgc_intro_triggered',
        condition: {
          type: 'all',
          conditions: [
            qStatus(QUEST_ID, 'not_started'),
            qStatus(QUEST_ID, 'not_completed'),
            { type: 'renownAtLeast', min: 120 },
          ],
        },
        effects: [openScene('scene_bbgc_01_hongqiao_rumor', 'QST-ADV-BABUGANCHAN')],
      },
    ],
    spotActions: [
      // 1) 开封汴河虹桥酒肆：手动触发 / 声望提示入口
      {
        id: 'spot_bbgc_hongqiao_rumor',
        label: '打探「秋蝉令」旧事',
        badge: '地阶轻功奇遇',
        subtitle: '要求江湖声望 ≥ 120 · 追寻失传轻功《八步赶蝉》三卷遗踪',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        visibleWhen: {
          type: 'all',
          conditions: [
            qStatus(QUEST_ID, 'not_started'),
            qStatus(QUEST_ID, 'not_completed'),
          ],
        },
        enabledWhen: { type: 'renownAtLeast', min: 120 },
        effects: [openScene('scene_bbgc_01_hongqiao_rumor', 'QST-ADV-BABUGANCHAN')],
      },
      // 1b) 若第一幕对话未进到第二幕时的续接按钮
      {
        id: 'spot_bbgc_cheng_continue',
        label: '向听风老人程万里请教「秋蝉令」',
        badge: '支线推进',
        subtitle: '程万里正于临水酒肆角落独酌等候',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        visibleWhen: atStep(QUEST_ID, 'start_rumor'),
        effects: [openScene('scene_bbgc_02_cheng_explains', 'QST-ADV-BABUGANCHAN')],
      },
      // 2) 开封樊楼：飞桥雅阁擒暗哨
      {
        id: 'spot_bbgc_fanlou_ambush',
        label: '巡查飞桥雅阁 · 截杀截风门暗哨',
        badge: '支线第3-4幕',
        subtitle: '程万里指明截风门探子「灰鹞」陆七正潜伏于此',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_fanlou',
        spotId: 'bl_fl_towers',
        visibleWhen: atStep(QUEST_ID, 'kaifeng_fanlou'),
        effects: [openScene('scene_bbgc_03_fanlou_observe', 'QST-ADV-BABUGANCHAN')],
      },
      // 3) 开封大相国寺资圣宝塔：寻取上卷
      {
        id: 'spot_bbgc_xiangguosi_pagoda',
        label: '登临资圣宝塔 · 寻访守塔老僧',
        badge: '支线第5-8幕',
        subtitle: '探查上卷《蝉蜕息》下落',
        tone: 'jade',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(QUEST_ID, 'kaifeng_pagoda'),
        effects: [openScene('scene_bbgc_05_pagoda_ascent', 'QST-ADV-BABUGANCHAN')],
      },
      // 4) 洛阳白马寺齐云古塔：会见青霜姥姥 + 战陆横
      {
        id: 'spot_bbgc_baimasi_pagoda',
        label: '叩问齐云古塔 · 寻访青霜姥姥',
        badge: '支线第9-13幕',
        subtitle: '求取中卷《振羽步》并提防截风门伏击',
        tone: 'primary',
        regionId: 'luoyang',
        buildingId: 'ly_baimasi',
        spotId: 'ly_bm_pagoda',
        visibleWhen: atStep(QUEST_ID, 'luoyang_pagoda'),
        effects: [openScene('scene_bbgc_09_luoyang_baimasi', 'QST-ADV-BABUGANCHAN')],
      },
      // 5) 洛阳牡丹园碧溪水榭：终战阴九幽 + 悟得《八步赶蝉》
      {
        id: 'spot_bbgc_peony_waterside',
        label: '夜渡碧溪水榭 · 营救阿蝉并破阴九幽',
        badge: '终幕决战',
        subtitle: '支线第14-21幕 · 三卷合璧习得地阶轻功《八步赶蝉》',
        tone: 'danger',
        regionId: 'luoyang',
        buildingId: 'ly_peony',
        spotId: 'ly_pn_waterside',
        visibleWhen: atStep(QUEST_ID, 'luoyang_waterside'),
        effects: [openScene('scene_bbgc_14_luoyang_road', 'QST-ADV-BABUGANCHAN')],
      },
      // 6) 返回开封汴河虹桥酒肆复命
      {
        id: 'spot_bbgc_return_kaifeng',
        label: '与听风老人程万里饮酒复命',
        badge: '支线终幕',
        subtitle: '第22幕 · 告慰三十年忠魂并领取赏赐',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        spotId: null,
        visibleWhen: atStep(QUEST_ID, 'return_kaifeng'),
        effects: [openScene('scene_bbgc_22_kaifeng_epilogue', 'QST-ADV-BABUGANCHAN')],
      },
    ],
    loadScenes: () => import('./babuganchanQuest.scenes').then((m) => m.SCENES),
  },
]
