import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE01_QUEST_ID = 'QST-SECT-11-SIDE-01'

export const ZHONGNAN_SIDE01_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 1 },
    qStatus(ZHONGNAN_SIDE01_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0629', npcName: '马玄源' },
    { type: 'npcAlive', npcId: 'NPC-0931', npcName: '丘芷霜' },
  ],
}

export const zhongnanSideJadeBeeHoneyQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE01_QUEST_ID,
  title: '玉蜂百花 · 清芬酿蜜记',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '不入流 ～ 三流中品',
  maxOpponentRealm: '三流中品（秦岭黑熊 / 偷蜂药贩）',
  recommendedNote:
    '终南隐宗一阶山门风物支线（全十幕）。春日山花烂漫之际，前往活死人墓玉蜂百花酿蜜幽轩助马玄源与丘芷霜采花酿蜜，先驱赶闻香闯入蜂圃的秦岭黑熊，再于暮色中擒拿企图窃取玉蜂蜂王的奸猾药贩，获赠辟毒灵药、战历与门派贡献。',
  startHint:
    '加入终南隐宗后，前往【终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩（zn_tb_honey）】寻马玄源或丘芷霜即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_tomb',
    spotId: 'zn_tb_honey',
    customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩',
  },
  startCondition: ZHONGNAN_SIDE01_START_CONDITION,
  summary:
    '{reignYear}春暖花开，秦岭幽谷百花吐蕊，正是终南隐宗采酿「玉蜂百花蜜」的绝佳时节。你赴【活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩（zn_tb_honey）】协助马玄源与丘芷霜照料蜂箱、调和花露，不料浓郁蜜香引来一头皮糙肉厚的秦岭黑熊闯圃捣乱，暮色时更有贪财的偷蜂药贩潜入幽谷企图熏烟盗取玉蜂蜂王。你先后出手驱走黑熊、击退药贩，保住整座蜂轩春蜜收成，获赠解毒丹药与门派嘉奖。',
  initialStepId: 'guard_bee_pavilion',
  steps: {
    guard_bee_pavilion: {
      id: 'guard_bee_pavilion',
      title: '护圃酿蜜 · 驱熊擒贼',
      objective:
        '请留守【终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩（zn_tb_honey）】，协助马玄源与丘芷霜驱赶秦岭黑熊、擒拿偷蜂药贩。',
      nextHint:
        '在【终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩（zn_tb_honey）】点击「巡视玉蜂花圃，驱熊护蜜」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_tomb',
        spotId: 'zn_tb_honey',
        customLabel: '终南山隐宗 · 活死人墓幽谷石室 · 玉蜂百花酿蜜幽轩',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side01_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_honey',
      onceFlag: 'zn_side01_start_triggered',
      condition: ZHONGNAN_SIDE01_START_CONDITION,
      effects: [openScene('scene_zns01_01', ZHONGNAN_SIDE01_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side01_start',
      label: '【终南风物】助马玄源与丘芷霜采酿玉蜂百花蜜',
      badge: '清芬酿蜜',
      subtitle: '玉蜂百花酿蜜幽轩',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_honey',
      visibleWhen: ZHONGNAN_SIDE01_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side01_start_triggered', value: true },
        openScene('scene_zns01_01', ZHONGNAN_SIDE01_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side01_guard',
      label: '【终南风物】巡视玉蜂花圃，驱熊护蜜擒药贩',
      badge: '护圃驱贼',
      subtitle: '玉蜂百花酿蜜幽轩',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_tomb',
      spotId: 'zn_tb_honey',
      visibleWhen: atStep(ZHONGNAN_SIDE01_QUEST_ID, 'guard_bee_pavilion'),
      effects: [openScene('scene_zns01_04', ZHONGNAN_SIDE01_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side01_start',
      label: '协助照料玉蜂蜂箱，采酿春花玉露蜜',
      badge: '清芬酿蜜',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0629', 'NPC-0931'] },
          ZHONGNAN_SIDE01_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side01_start_triggered', value: true },
        openScene('scene_zns01_01', ZHONGNAN_SIDE01_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideJadeBeeHoneyQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE01_QUESTS: QuestDefinition[] = [zhongnanSideJadeBeeHoneyQuest]
