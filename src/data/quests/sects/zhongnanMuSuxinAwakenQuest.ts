import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q35_QUEST_ID = 'QST-SECT-11-35'

export const ZHONGNAN_Q35_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-11', minRank: 4 },
    {
      type: 'any',
      conditions: [
        qStatus('QST-SECT-11-34', 'completed'),
        {
          type: 'all',
          conditions: [
            qStatus('QST-SECT-11-33', 'completed'),
            flag('zn_cross', 'eq', 'harmony'),
          ],
        },
      ],
    },
    qStatus(ZHONGNAN_Q35_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0114', npcName: '林朝瑶' },
    { type: 'npcAlive', npcId: 'NPC-1053', npcName: '段延庆' },
  ],
}

export const zhongnanMuSuxinAwakenQuest: QuestDefinition = {
  id: ZHONGNAN_Q35_QUEST_ID,
  title: '繁花似锦 · 玉女素心',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'zhongnanshan',
  recommendedRealm: '宗师中品',
  maxOpponentRealm: '宗师中品（恶贯满盈 · 段延庆）',
  recommendedNote:
    '终南隐宗天阶剑法觉醒线（全三十幕）。须达宗门四阶，并完成古墓线《QST-SECT-11-34》，或完成古观线《QST-SECT-11-33》且处于道墓合流路线（可共修）。于繁花幽谷双剑合璧坪迎战亲临终南的西夏一品堂首席客卿段延庆——合流线以双剑合璧共破强敌，孤绝线则以分心二用独运阴阳双剑，彻底悟通天阶绝学【玉女素心剑法】将段延庆重创逐出终南山！',
  startHint:
    '达成前置条件后，前往【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】即可触发。',
  startLocation: {
    regionId: 'zhongnanshan',
    buildingId: 'zn_stream',
    spotId: 'zn_st_sword',
    customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
  },
  startCondition: ZHONGNAN_Q35_START_CONDITION,
  summary:
    '{reignYear}早春，终南幽谷残雪未消，山梅已然初绽。西夏一品堂首席宗师【段延庆】为雪前耻并强夺终南总谱，亲率恶徒直闯【繁花幽谷双剑合璧坪】！寒玉仙子【林朝瑶】为你点破重阳剑法与玉女剑法相克相生之极意。绝境激战中，你或与同道双剑合璧、心意相通，或以孤绝冰心强运分心二用，左右手互使重阳与玉女两路剑招，于漫天落花间彻底悟通天阶无上剑道【玉女素心剑法】，一举重创段延庆并将其逐出终南山！',
  initialStepId: 'suxin_duel_duan',
  steps: {
    suxin_duel_duan: {
      id: 'suxin_duel_duan',
      title: '双剑坪前 · 恶首临谷',
      objective:
        '段延庆已携一阳指铁杖神功杀至【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】！速与强敌决战，于生死锋芒间彻悟天阶《玉女素心剑法》！',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「繁花落剑 · 决战恶贯满盈段延庆」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
    suxin_mastery_seal: {
      id: 'suxin_mastery_seal',
      title: '繁花似锦 · 素心大成',
      objective:
        '段延庆已被玉女素心剑气重创逐出终南山！请留在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】，与林朝瑶印证方才顿悟的天阶剑道真意！',
      nextHint:
        '在【终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪（zn_st_sword）】点击「印证剑意 · 正式修成天阶《玉女素心剑法》」。',
      targetLocation: {
        regionId: 'zhongnanshan',
        buildingId: 'zn_stream',
        spotId: 'zn_st_sword',
        customLabel: '终南山隐宗 · 终南后山寒玉涧 · 繁花幽谷双剑合璧坪',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq35_start',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q35_start_triggered',
      condition: ZHONGNAN_Q35_START_CONDITION,
      effects: [openScene('scene_znq35_01', ZHONGNAN_Q35_QUEST_ID)],
    },
    {
      id: 'trig_znq35_duel',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q35_duel_triggered',
      condition: atStep(ZHONGNAN_Q35_QUEST_ID, 'suxin_duel_duan'),
      effects: [openScene('scene_znq35_09', ZHONGNAN_Q35_QUEST_ID)],
    },
    {
      id: 'trig_znq35_mastery',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      onceFlag: 'zn_q35_mastery_triggered',
      condition: atStep(ZHONGNAN_Q35_QUEST_ID, 'suxin_mastery_seal'),
      effects: [openScene('scene_znq35_23', ZHONGNAN_Q35_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq35_start',
      label: '【繁花似锦】赴双剑合璧坪 · 聆听林朝瑶点破玉女素心极意',
      badge: '玉女素心',
      subtitle: '第一幕 · 山梅初绽，于双剑合璧坪窥见终南至高剑道',
      tone: 'jade',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: ZHONGNAN_Q35_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'zn_q35_start_triggered', value: true },
        openScene('scene_znq35_01', ZHONGNAN_Q35_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq35_duel',
      label: '【繁花似锦】繁花落剑 · 决战恶贯满盈段延庆',
      badge: '宗师决战',
      subtitle: '第九幕 · 段延庆铁杖临坪，于生死激战间彻悟玉女素心剑法！',
      tone: 'danger',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q35_QUEST_ID, 'suxin_duel_duan'),
      effects: [
        { type: 'setFlag', flag: 'zn_q35_duel_triggered', value: true },
        openScene('scene_znq35_09', ZHONGNAN_Q35_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq35_mastery',
      label: '【繁花似锦】印证剑意 · 正式修成天阶《玉女素心剑法》',
      badge: '素心大成',
      subtitle: '第二十三幕 · 重创逐退段延庆，天阶剑法彻底归心',
      tone: 'gold',
      regionId: 'zhongnanshan',
      buildingId: 'zn_stream',
      spotId: 'zn_st_sword',
      visibleWhen: atStep(ZHONGNAN_Q35_QUEST_ID, 'suxin_mastery_seal'),
      effects: [
        { type: 'setFlag', flag: 'zn_q35_mastery_triggered', value: true },
        openScene('scene_znq35_23', ZHONGNAN_Q35_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq35_lin_start',
      label: '请益林朝瑶 · 赴双剑合璧坪参悟《玉女素心剑法》',
      badge: '玉女素心',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0114'] },
          ZHONGNAN_Q35_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'zn_q35_start_triggered', value: true },
        openScene('scene_znq35_01', ZHONGNAN_Q35_QUEST_ID),
      ],
    },
  ],

  loadScenes: () =>
    import('./zhongnanMuSuxinAwakenQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q35_QUESTS: QuestDefinition[] = [zhongnanMuSuxinAwakenQuest]
