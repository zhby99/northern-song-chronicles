import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_SIDE07_QUEST_ID = 'QST-SECT-11-SIDE-07'

export const ZHONGNAN_SIDE07_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 3 },
    qStatus(ZHONGNAN_SIDE07_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0285', npcName: '苏秋桃' },
    { type: 'npcAlive', npcId: 'NPC-0203', npcName: '梁惊风' },
    { type: 'npcAlive', npcId: 'NPC-0166', npcName: '宁清羽' },
  ],
}

export const zhongnanSideHuashanEnvoyQuest: QuestDefinition = {
  id: ZHONGNAN_SIDE07_QUEST_ID,
  title: '秦晋同盟 · 西岳送剑帖',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'changan',
  recommendedRealm: '二流中品 ～ 一流下品',
  maxOpponentRealm: '二流上品（截道绿林头目）',
  recommendedNote:
    '终南隐宗三阶秦晋结盟支线（全十四幕）。于京兆府终南草堂遇负伤求援的华山女侠苏秋桃，得知她身怀关中联防剑帖却遭西夏重金收买的绿林悍匪一路截杀。你仗义相助，护送苏秋桃东行至潼关天险瓮城，联手华山「朝阳快剑」梁惊风斩除截道绿林头目，再登西岳玉女峰紫霞道观将剑帖亲手交予「玉女剑仙」宁清羽，促成终南华山守望相助之盟。',
  startHint:
    '晋升终南隐宗三阶后，前往【京兆府 · 终南草堂（ca_caotang_east）】偶遇负伤的苏秋桃即可触发。',
  startLocation: {
    regionId: 'changan',
    buildingId: 'ca_caotang',
    spotId: 'ca_caotang_east',
    customLabel: '京兆府 · 终南草堂',
  },
  startCondition: ZHONGNAN_SIDE07_START_CONDITION,
  summary:
    '{reignYear}深秋，你途经【京兆府 · 终南草堂（ca_caotang_east）】时，偶遇身负重伤却死死护住一封鎏金剑帖的华山派女侠苏秋桃。原来此帖事关终南与华山两派联手防范西夏暗线的机密，不料走漏风声，引来大队绿林亡命之徒沿途截杀。你慨然护送苏秋桃东赴【潼关 / 西岳华山 · 潼关天险瓮城（tg_ft_barbican）】，与前来接应的「朝阳快剑」梁惊风并肩斩除绿林头目；随后直上【玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，将密帖亲手呈交「玉女剑仙」宁清羽，缔结秦晋同盟佳话。',
  initialStepId: 'escort_to_tongguan',
  steps: {
    escort_to_tongguan: {
      id: 'escort_to_tongguan',
      title: '东行潼关 · 瓮城斩绿林',
      objective:
        '请护送负伤的华山女侠苏秋桃携剑帖东行至【潼关 / 西岳华山 · 潼关天险瓮城（tg_ft_barbican）】，会合梁惊风并击退截杀的绿林头目。',
      nextHint:
        '前往【潼关 / 西岳华山 · 潼关天险瓮城（tg_ft_barbican）】，点击「护送苏秋桃入瓮城，助梁惊风斩除截道绿林头目」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城',
      },
    },
    deliver_letter_zixia: {
      id: 'deliver_letter_zixia',
      title: '登峰递帖 · 紫霞定同盟',
      objective:
        '潼关绿林截匪已除！请携联防剑帖登上【潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，亲手交予宁清羽前辈。',
      nextHint:
        '前往【潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院（tg_zx_spring）】，点击「将终南联防剑帖呈交宁清羽前辈」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_spring',
        customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 洗头盆清泉演剑院',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_zn_side07_start',
      regionId: 'changan',
      buildingId: 'ca_caotang',
      spotId: 'ca_caotang_east',
      onceFlag: 'zn_side07_start_triggered',
      condition: ZHONGNAN_SIDE07_START_CONDITION,
      effects: [openScene('scene_zns07_01', ZHONGNAN_SIDE07_QUEST_ID)],
    },
    {
      id: 'trig_zn_side07_fort',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      onceFlag: 'zn_side07_fort_triggered',
      condition: atStep(ZHONGNAN_SIDE07_QUEST_ID, 'escort_to_tongguan'),
      effects: [openScene('scene_zns07_05', ZHONGNAN_SIDE07_QUEST_ID)],
    },
    {
      id: 'trig_zn_side07_zixia',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      onceFlag: 'zn_side07_zixia_triggered',
      condition: atStep(ZHONGNAN_SIDE07_QUEST_ID, 'deliver_letter_zixia'),
      effects: [openScene('scene_zns07_10', ZHONGNAN_SIDE07_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_zn_side07_start',
      label: '【终南风物】救治负伤的华山女侠苏秋桃，承接护送剑帖之托',
      badge: '秦晋同盟',
      subtitle: '终南草堂',
      tone: 'gold',
      regionId: 'changan',
      buildingId: 'ca_caotang',
      spotId: 'ca_caotang_east',
      visibleWhen: ZHONGNAN_SIDE07_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_side07_start_triggered', value: true },
        openScene('scene_zns07_01', ZHONGNAN_SIDE07_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side07_fort',
      label: '【终南风物】护送苏秋桃入瓮城，助梁惊风斩除截道绿林头目',
      badge: '瓮城截匪',
      subtitle: '潼关天险瓮城',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      visibleWhen: atStep(ZHONGNAN_SIDE07_QUEST_ID, 'escort_to_tongguan'),
      effects: [
        { type: 'setFlag', flag: 'zn_side07_fort_triggered', value: true },
        openScene('scene_zns07_05', ZHONGNAN_SIDE07_QUEST_ID),
      ],
    },
    {
      id: 'spot_zn_side07_zixia',
      label: '【终南风物】将终南联防剑帖呈交玉女剑仙宁清羽',
      badge: '西岳递帖',
      subtitle: '洗头盆清泉演剑院',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_spring',
      visibleWhen: atStep(ZHONGNAN_SIDE07_QUEST_ID, 'deliver_letter_zixia'),
      effects: [
        { type: 'setFlag', flag: 'zn_side07_zixia_triggered', value: true },
        openScene('scene_zns07_10', ZHONGNAN_SIDE07_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_zn_side07_suqiutao',
      label: '照料负伤的苏秋桃并询问西岳剑帖之事',
      badge: '秦晋同盟',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0285'] },
          ZHONGNAN_SIDE07_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side07_start_triggered', value: true },
        openScene('scene_zns07_01', ZHONGNAN_SIDE07_QUEST_ID),
      ],
    },
    {
      id: 'act_zn_side07_ningqingyu',
      label: '呈递终南—华山关中联防剑帖',
      badge: '西岳递帖',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0166'] },
          atStep(ZHONGNAN_SIDE07_QUEST_ID, 'deliver_letter_zixia'),
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_side07_zixia_triggered', value: true },
        openScene('scene_zns07_10', ZHONGNAN_SIDE07_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanSideHuashanEnvoyQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_SIDE07_QUESTS: QuestDefinition[] = [zhongnanSideHuashanEnvoyQuest]
