import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const ZHONGNAN_Q25_QUEST_ID = 'QST-SECT-11-25'

export const ZHONGNAN_Q25_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    qStatus('QST-SECT-11-20', 'completed'),
    flag('zn_branch', 'eq', 'gumu'),
    qStatus(ZHONGNAN_Q25_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0173', npcName: '冷清秋' },
    { type: 'npcAlive', npcId: 'NPC-0552', npcName: '丘锦湘' },
    { type: 'npcAlive', npcId: 'NPC-0221', npcName: '贾天鹤' },
    { type: 'npcAlive', npcId: 'NPC-0139', npcName: '余沧澜' },
  ],
}

export const ZHONGNAN_Q25_QUEST: QuestDefinition = {
  id: ZHONGNAN_Q25_QUEST_ID,
  title: '剑阁猿啼 · 巴山折剑',
  category: 'sect_mission',
  factionId: 'SECT-11',
  regionId: 'jianmenguan',
  recommendedRealm: '一流下品 ～ 一流中品（活死人墓远征卷一）',
  maxOpponentRealm: '一流上品（青城派掌门松风真君 · 余沧澜）',
  recommendedNote:
    '二十二幕古墓远征首卷：古墓外门弟子丘锦湘南下巴蜀采药，竟遭青城派「青城鹤道人」贾天鹤以窥探青城秘籍为由扣押于【剑门关 · 剑门雄关箭楼】！你偕冷清秋师姐万里入蜀，先于剑门关望胡台剑破贾天鹤救出丘锦湘，继而直上【青城山 · 青城山上清宫松风殿】问罪青城掌门余沧澜——众目睽睽之下以古墓清灵绝剑十合挑落余沧澜道冠，令巴蜀武林震服终南古墓威名！',
  startHint:
    '完成《寒涧残碑 · 三十载赌约》（古墓路线）后，前往【剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台】营救丘锦湘，或寻冷清秋同行入蜀。',
  startLocation: {
    regionId: 'jianmenguan',
    buildingId: 'jm_gate',
    spotId: 'jm_gate_main',
    customLabel: '剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台',
  },
  startCondition: ZHONGNAN_Q25_START_CONDITION,
  summary:
    '{reignYear}深秋，古墓弟子【丘锦湘】奉命入蜀采办奇药，却在剑阁遭青城派长老【贾天鹤】诬陷扣押。你偕幽谷素女【冷清秋】千里入蜀，于【剑门雄关箭楼 · 望胡台】剑败贾天鹤，安然救出丘锦湘。为彻底讨还公道、立威巴蜀，二人更直上【青城山上清宫松风殿】登门问罪青城掌门【余沧澜】。松风殿前，你以古墓轻灵绝伦的玉女剑意破尽青城松风剑法，十合之内一剑挑落余沧澜头顶道冠！余沧澜颜面扫地、俯首致歉，终南古墓之威震动巴山蜀水。',
  initialStepId: 'rescue_jianmen',
  steps: {
    rescue_jianmen: {
      id: 'rescue_jianmen',
      title: '万里入蜀 · 剑阁救人',
      objective:
        '请偕冷清秋前往【剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台】，击败青城派贾天鹤，救出被扣押的同门丘锦湘！',
      nextHint: '前往【剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台（jm_gate_main）】点击「剑破贾天鹤 · 营救丘锦湘」。',
      targetLocation: {
        regionId: 'jianmenguan',
        buildingId: 'jm_gate',
        spotId: 'jm_gate_main',
        customLabel: '剑门关 · 剑门雄关箭楼 · 雄关箭楼 · 望胡台',
      },
    },
    duel_qingcheng: {
      id: 'duel_qingcheng',
      title: '直上青城 · 挑冠问罪',
      objective:
        '丘锦湘已然脱险，然青城派欺人太甚！请直上【青城山 · 青城山上清宫松风殿 · 上清松风演剑主殿】，向青城掌门余沧澜讨还公道！',
      nextHint: '前往【青城山 · 青城山上清宫松风殿 · 上清松风演剑主殿（qc_sq_hall）】点击「登殿问罪 · 十合挑落余沧澜道冠」。',
      targetLocation: {
        regionId: 'qingcheng',
        buildingId: 'qc_shangqing',
        spotId: 'qc_sq_hall',
        customLabel: '青城山 / 唐家堡 · 青城山上清宫松风殿 · 上清松风演剑主殿',
      },
    },
  },

  locationTriggers: [
    {
      id: 'trig_znq25_start',
      regionId: 'jianmenguan',
      buildingId: 'jm_gate',
      spotId: 'jm_gate_main',
      onceFlag: 'znq25_intro_triggered',
      condition: ZHONGNAN_Q25_START_CONDITION,
      effects: [openScene('scene_znq25_01', ZHONGNAN_Q25_QUEST_ID)],
    },
    {
      id: 'trig_znq25_qingcheng',
      regionId: 'qingcheng',
      buildingId: 'qc_shangqing',
      spotId: 'qc_sq_hall',
      onceFlag: 'znq25_qingcheng_triggered',
      condition: atStep(ZHONGNAN_Q25_QUEST_ID, 'duel_qingcheng'),
      effects: [openScene('scene_znq25_12', ZHONGNAN_Q25_QUEST_ID)],
    },
  ],

  spotActions: [
    {
      id: 'spot_znq25_start',
      label: '偕冷清秋闯剑门雄关 · 破贾天鹤救丘锦湘',
      badge: '剑阁救人',
      subtitle: '剑门雄关箭楼 · 雄关箭楼 · 望胡台',
      tone: 'danger',
      regionId: 'jianmenguan',
      buildingId: 'jm_gate',
      spotId: 'jm_gate_main',
      visibleWhen: ZHONGNAN_Q25_START_CONDITION,
      effects: [
        { type: 'setFlag', flag: 'znq25_intro_triggered', value: true },
        openScene('scene_znq25_01', ZHONGNAN_Q25_QUEST_ID),
      ],
    },
    {
      id: 'spot_znq25_qingcheng',
      label: '直上上清松风主殿 · 问罪青城掌门余沧澜',
      badge: '巴山折剑',
      subtitle: '青城山上清宫松风殿 · 上清松风演剑主殿',
      tone: 'gold',
      regionId: 'qingcheng',
      buildingId: 'qc_shangqing',
      spotId: 'qc_sq_hall',
      visibleWhen: atStep(ZHONGNAN_Q25_QUEST_ID, 'duel_qingcheng'),
      effects: [
        { type: 'setFlag', flag: 'znq25_qingcheng_triggered', value: true },
        openScene('scene_znq25_12', ZHONGNAN_Q25_QUEST_ID),
      ],
    },
  ],

  npcActions: [
    {
      id: 'act_znq25_npc_start',
      label: '偕冷清秋入蜀赴剑门关 · 营救丘锦湘',
      badge: '剑阁猿啼',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0173', 'NPC-0221'] },
          ZHONGNAN_Q25_START_CONDITION,
        ],
      },
      effects: [
        { type: 'setFlag', flag: 'znq25_intro_triggered', value: true },
        openScene('scene_znq25_01', ZHONGNAN_Q25_QUEST_ID),
      ],
    },
  ],

  loadScenes: () => import('./zhongnanMuQingchengDuelQuest.scenes').then((m) => m.SCENES),
}

export const ZHONGNAN_Q25_QUESTS: QuestDefinition[] = [ZHONGNAN_Q25_QUEST]
