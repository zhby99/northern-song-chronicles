import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q13_QUEST_ID = 'QST-SECT-05-13'

export const HUASHAN_Q13_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    {
      type: 'any',
      hint: '必修前置：完结《落雁借剑 · 太岳三峰》或《白玉问剑 · 潼关剑神》',
      conditions: [
        qStatus('QST-SECT-05-10', 'completed'),
        qStatus('QST-SECT-05-12', 'completed'),
      ],
    },
    { type: 'learnedArtAtLeast', artId: 'MA-049', minLevel: 4 },
    qStatus(HUASHAN_Q13_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
  ],
}

export const HUASHAN_Q13_QUEST: QuestDefinition = {
  id: HUASHAN_Q13_QUEST_ID,
  title: '寒风面壁 · 铁锁惊雷',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流中品',
  maxOpponentRealm: '一流中品（西夏一品堂暗夜绝密死谍）',
  recommendedNote:
    '华山派气剑双线汇流转折长卷（二十二幕）。将《太岳三青峰》修至四重后，奉命驻守【思过崖古山洞 · 面壁思过寒风剑坪】沉淀剑意；暴风雨夜西夏一品堂顶尖密谍斩断后洞重石铁锁，追入【秘洞古剑刻石室】诛杀强敌，直面三十年前气剑相残的枯骨魔刻，作出一念正邪的宿命抉择（决定后续走向《石室止戈》或《魔刻噬心》）！',
  startHint:
    '完结气宗或剑宗三青峰任务并将《太岳三青峰》修至四重后，前往【玉女峰紫霞道观 · 紫霞正气主殿】向岳沧溟领命赴思过崖，或直接登【面壁思过寒风剑坪】。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_zixia',
    spotId: 'tg_zx_hall',
    customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
  },
  startCondition: HUASHAN_Q13_START_CONDITION,
  summary:
    '{reignYear}你既将镇山《太岳三青峰》修至炉火纯青，奉掌门岳沧溟之命驻守【思过崖古山洞 · 面壁思过寒风剑坪】迎风涤心。岂料狂风暴雨之夜，后崖禁地传来金铁断裂巨响——一名西夏一品堂顶尖密谍竟劈断封锁【秘洞古剑刻石室】三十载的玄铁巨锁！你提剑举火追入幽深石室，惊见满地三十年前华山气剑内讧同归于尽的先辈枯骨，四壁更刻满专破紫霞混元、专破三仙三青峰的阴毒同室操戈剑痕！血战诛杀西夏密谍后，你独立泣血石壁之前，在「削壁止戈、收敛遗骨」与「私拓秘刻、重锁图霸」之间作出了改写华山国运的一念抉择！',
  initialStepId: 'q13_ledge_meditate',
  steps: {
    q13_ledge_meditate: {
      id: 'q13_ledge_meditate',
      title: '寒风面壁 · 雷夜惊变',
      objective:
        '已领掌门法旨。请前往【思过崖古山洞 · 面壁思过寒风剑坪】驻守面壁，收敛《太岳三青峰》锋芒，严防外敌窥伺西岳禁地！',
      nextHint:
        '前往【思过崖古山洞 · 面壁思过寒风剑坪（tg_sg_ledge）】触发面壁与雨夜断锁惊变。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_ledge',
      },
    },
    q13_cave_pursuit: {
      id: 'q13_cave_pursuit',
      title: '断锁追凶 · 石室抉择',
      objective:
        '暴风雨夜后洞玄铁重锁遭贼人斩断！请立刻闯入【思过崖古山洞 · 秘洞古剑刻石室】追缉潜入的西夏一品堂密谍，查明石室尘封三十载的真相！',
      nextHint:
        '进入【思过崖古山洞 · 秘洞古剑刻石室（tg_sg_cave）】，点击「持火闯入秘洞 · 追杀断锁潜入密谍」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_siguoya',
        spotId: 'tg_sg_cave',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_hsq13_ledge',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_ledge',
      onceFlag: 'hsq13_ledge_triggered',
      condition: atStep(HUASHAN_Q13_QUEST_ID, 'q13_ledge_meditate'),
      effects: [openScene('scene_hsq13_05', HUASHAN_Q13_QUEST_ID)],
    },
    {
      id: 'trig_hsq13_cave',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      onceFlag: 'hsq13_cave_triggered',
      condition: atStep(HUASHAN_Q13_QUEST_ID, 'q13_cave_pursuit'),
      effects: [openScene('scene_hsq13_11', HUASHAN_Q13_QUEST_ID)],
    },
  ],
  spotActions: [
    {
      id: 'spot_hsq13_start_hall',
      label: '向岳沧溟凛报三青峰功成 · 领命思过崖面壁（开启《寒风面壁》）',
      badge: '思过驻剑',
      subtitle: '紫霞正气主殿 · 奉命涤荡剑意',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: HUASHAN_Q13_START_CONDITION,
      effects: [openScene('scene_hsq13_01', HUASHAN_Q13_QUEST_ID)],
    },
    {
      id: 'spot_hsq13_start_ledge_direct',
      label: '登临寒风剑坪 · 奉掌门谕令面壁磨剑（开启《寒风面壁》）',
      badge: '思过驻剑',
      subtitle: '面壁思过寒风剑坪 · 敛锋悟道',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_ledge',
      visibleWhen: HUASHAN_Q13_START_CONDITION,
      effects: [openScene('scene_hsq13_01', HUASHAN_Q13_QUEST_ID)],
    },
    {
      id: 'spot_hsq13_ledge_meditate',
      label: '寒风剑坪盘膝面壁 · 倾听暴风雨夜异响',
      badge: '铁锁惊雷',
      subtitle: '面壁思过寒风剑坪 · 雷夜巡查',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_ledge',
      visibleWhen: atStep(HUASHAN_Q13_QUEST_ID, 'q13_ledge_meditate'),
      effects: [openScene('scene_hsq13_05', HUASHAN_Q13_QUEST_ID)],
    },
    {
      id: 'spot_hsq13_cave_pursuit',
      label: '持火闯入秘洞 · 追杀断锁潜入密谍',
      badge: '幽窟诛谍',
      subtitle: '秘洞古剑刻石室 · 一念正邪',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_siguoya',
      spotId: 'tg_sg_cave',
      visibleWhen: atStep(HUASHAN_Q13_QUEST_ID, 'q13_cave_pursuit'),
      effects: [openScene('scene_hsq13_11', HUASHAN_Q13_QUEST_ID)],
    },
  ],
  npcActions: [
    {
      id: 'act_hsq13_yue_start',
      label: '禀明《太岳三青峰》已臻四重 · 请赴思过崖沉淀剑意',
      badge: '寒风面壁',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118'] },
          HUASHAN_Q13_START_CONDITION,
        ],
      },
      effects: [openScene('scene_hsq13_01', HUASHAN_Q13_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./huashanSiguoyaSecretQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q13_QUESTS: QuestDefinition[] = [HUASHAN_Q13_QUEST]
