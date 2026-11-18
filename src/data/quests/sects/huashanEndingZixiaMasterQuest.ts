import type { QuestCondition, QuestDefinition, QuestEffect } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q19_QUEST_ID = 'QST-SECT-05-19'

export const HUASHAN_Q19_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 4 },
    qStatus('QST-SECT-05-17', 'completed'),
    { type: 'flag', flag: 'hs_branch', op: 'eq', value: 'qi', label: '华山气宗正脉传人' },
    { type: 'learnedArtAtLeast', artId: 'MA-030', minLevel: 5 },
    qStatus(HUASHAN_Q19_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0118', npcName: '岳沧溟' },
    { type: 'npcAlive', npcId: 'NPC-0202', npcName: '高沧云' },
  ],
}

const SYNC_Q19_CAVE_FLAG_EFFECT: QuestEffect = {
  type: 'branch',
  condition: flag('hs_cave', 'eq', 'usurp'),
  thenEffects: [{ type: 'setFlag', flag: 'hs_q19_cave_usurp', value: true }],
  elseEffects: [{ type: 'setFlag', flag: 'hs_q19_cave_usurp', value: false }],
}

export const HUASHAN_Q19_QUEST: QuestDefinition = {
  id: HUASHAN_Q19_QUEST_ID,
  title: '紫霞浩荡 · 太岳正主',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '宗师下品 ～ 宗师中品（华山气宗 Lv.5 掌门正统终局）',
  maxOpponentRealm: '宗师中品（西夏一品堂重甲先锋 · 西夏关中主帅拓跋雄）',
  recommendedNote:
    '三十幕华山气宗正统登位终局长卷：将天阶《紫霞神功（先天太岳卷）》修至第五重以上后，身披华山紫霞剑客衫、手执太岳紫霞长剑，统率高沧云与百名华山剑士星夜出潼关反袭风陵荒原西夏大营！紫气浩荡十里破寨斩将、正面枭首西夏关中主帅拓跋雄、焚尽粮草军械；凯旋玉女峰后获岳沧溟、秦烈山、宁清羽、封不弃四老冠簪授印，荣登 Lv.5 华山派掌门！',
  startHint:
    '升任华山气宗 Lv.4 长老、完结《先天太岳》且将《紫霞神功（先天太岳卷）》修至第五重后，前往【玉女峰紫霞道观 · 紫霞正气主殿】面见掌门岳沧溟。',
  startLocation: {
    regionId: 'tongguan',
    buildingId: 'tg_zixia',
    spotId: 'tg_zx_hall',
    customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
  },
  startCondition: HUASHAN_Q19_START_CONDITION,
  summary:
    '{reignYear}初冬，西夏一品堂关中主帅【拓跋雄】在黄河风陵荒原秘密屯集重兵粮械，妄图大举叩犯潼关！你已将《紫霞神功（先天太岳卷）》修至炉火纯青之境，奉掌门【岳沧溟】帅令，身披《华山紫霞剑客衫》、手执《太岳紫霞长剑》，偕大师兄【高沧云】统率百名华山精锐剑士星夜下山出【潼关天险瓮城】。皓月之下，你催动圆满紫霞真气绵延浩荡，席卷风陵荒原西夏大营，先斩重甲先锋，复于万军丛中单骑正面斩杀宗师中品主帅拓跋雄，一把烈火焚尽百车粮草军械，彻底粉碎西夏染指关中之野心！班师凯旋【紫霞正气主殿】，漫天朝阳紫气之中，决意退隐的岳沧溟会同秦烈山、宁清羽、封不弃四老为你冠簪授印，正式登位华山派掌门！',
  initialStepId: 'march_tongguan',
  steps: {
    march_tongguan: {
      id: 'march_tongguan',
      title: '紫衫奉剑 · 星夜出关',
      objective:
        '已领掌门帅令！请身披紫霞剑客衫、手执太岳紫霞长剑，与高沧云率百名华山剑士赶赴【潼关天险瓮城 · 潼关镇河主城楼与瓮城】集结出关！',
      nextHint: '前往【潼关天险瓮城 · 潼关镇河主城楼与瓮城（tg_ft_barbican）】点击「紫衫点兵 · 星夜出潼关」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_barbican',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城 · 潼关镇河主城楼与瓮城',
      },
    },
    raid_fengling: {
      id: 'raid_fengling',
      title: '紫气十里 · 阵斩拓跋',
      objective:
        '大军已潜渡黄河抵近风陵荒原前哨！请前往【潼关天险瓮城 · 黄河大折惊涛烽火台】俯瞰敌营，催动圆满《紫霞神功》夜袭西夏一品堂大营，阵斩主帅拓跋雄并焚毁粮械！',
      nextHint: '前往【潼关天险瓮城 · 黄河大折惊涛烽火台（tg_ft_beacon）】点击「紫气席卷风陵 · 决战主帅拓跋雄」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
        customLabel: '潼关 / 西岳华山 · 潼关天险瓮城 · 黄河大折惊涛烽火台（风陵前哨）',
      },
    },
    coronation_zixia: {
      id: 'coronation_zixia',
      title: '朝阳紫气 · 冠簪登位',
      objective:
        '风陵西夏大营已化焦土，主帅拓跋雄授首！请统率百名凯旋剑士班师返回【玉女峰紫霞道观 · 紫霞正气主殿】，接受岳沧溟四老冠簪授印，登位华山派掌门！',
      nextHint: '返回【玉女峰紫霞道观 · 紫霞正气主殿（tg_zx_hall）】点击「凯旋献捷 · 登位太岳正主」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_zixia',
        spotId: 'tg_zx_hall',
        customLabel: '潼关 / 西岳华山 · 玉女峰紫霞道观 · 紫霞正气主殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_hsq19_start_hall',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq19_intro_triggered',
      condition: HUASHAN_Q19_START_CONDITION,
      effects: [SYNC_Q19_CAVE_FLAG_EFFECT, openScene('scene_hsq19_01', HUASHAN_Q19_QUEST_ID)],
    },
    {
      id: 'trig_hsq19_barbican',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      onceFlag: 'hsq19_barbican_triggered',
      condition: atStep(HUASHAN_Q19_QUEST_ID, 'march_tongguan'),
      effects: [openScene('scene_hsq19_07', HUASHAN_Q19_QUEST_ID)],
    },
    {
      id: 'trig_hsq19_beacon_raid',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      onceFlag: 'hsq19_beacon_triggered',
      condition: atStep(HUASHAN_Q19_QUEST_ID, 'raid_fengling'),
      effects: [openScene('scene_hsq19_12', HUASHAN_Q19_QUEST_ID)],
    },
    {
      id: 'trig_hsq19_coronation',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      onceFlag: 'hsq19_coronation_triggered',
      condition: atStep(HUASHAN_Q19_QUEST_ID, 'coronation_zixia'),
      effects: [openScene('scene_hsq19_24', HUASHAN_Q19_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_hsq19_start',
      label: '奉太岳紫霞剑 · 领命出征风陵西夏大营（气宗掌门终局）',
      badge: '太岳正主',
      subtitle: '需《紫霞神功（先天太岳卷）》≥ 第五重',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: HUASHAN_Q19_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'hsq19_intro_triggered', value: true },
        SYNC_Q19_CAVE_FLAG_EFFECT,
        openScene('scene_hsq19_01', HUASHAN_Q19_QUEST_ID),
      ],
    },
    {
      id: 'spot_hsq19_march_barbican',
      label: '紫衫点兵 · 率高沧云与百名剑士星夜出潼关',
      badge: '紫衫出关',
      subtitle: '潼关天险瓮城 · 潼关镇河主城楼与瓮城',
      tone: 'primary',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_barbican',
      visibleWhen: atStep(HUASHAN_Q19_QUEST_ID, 'march_tongguan'),
      effects: [openScene('scene_hsq19_07', HUASHAN_Q19_QUEST_ID)],
    },
    {
      id: 'spot_hsq19_raid_fengling',
      label: '紫气席卷风陵 · 决战西夏关中主帅拓跋雄',
      badge: '紫气十里',
      subtitle: '潼关天险瓮城 · 黄河大折惊涛烽火台',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      visibleWhen: atStep(HUASHAN_Q19_QUEST_ID, 'raid_fengling'),
      effects: [openScene('scene_hsq19_12', HUASHAN_Q19_QUEST_ID)],
    },
    {
      id: 'spot_hsq19_coronation',
      label: '凯旋紫霞主殿 · 受四老冠簪登位华山掌门',
      badge: '冠簪授印',
      subtitle: '玉女峰紫霞道观 · 紫霞正气主殿',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_zixia',
      spotId: 'tg_zx_hall',
      visibleWhen: atStep(HUASHAN_Q19_QUEST_ID, 'coronation_zixia'),
      effects: [openScene('scene_hsq19_24', HUASHAN_Q19_QUEST_ID)],
    },
  ],

  npcActions: [
    {
      id: 'act_hsq19_npc_start',
      label: '呈验大成紫霞真气 · 请命反袭风陵西夏大营（气宗掌门终局）',
      badge: '太岳正主',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0202'] },
          HUASHAN_Q19_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'hsq19_intro_triggered', value: true },
        SYNC_Q19_CAVE_FLAG_EFFECT,
        openScene('scene_hsq19_01', HUASHAN_Q19_QUEST_ID),
      ],
    },
    {
      id: 'act_hsq19_npc_coronation',
      label: '献上风陵大捷露布 · 举行华山掌门冠簪大典',
      badge: '冠簪授印',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0118', 'NPC-0202'] },
          atStep(HUASHAN_Q19_QUEST_ID, 'coronation_zixia'),
        ],
      },
      effects: [openScene('scene_hsq19_24', HUASHAN_Q19_QUEST_ID)],
    },
  ],

  loadScenes: () => import('./huashanEndingZixiaMasterQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q19_QUESTS: QuestDefinition[] = [HUASHAN_Q19_QUEST]
