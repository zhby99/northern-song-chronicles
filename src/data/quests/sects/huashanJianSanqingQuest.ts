import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, flag, openScene, qStatus } from '../../../engine/quest/dsl'

export const HUASHAN_Q12_QUEST_ID = 'QST-SECT-05-12'

export const HUASHAN_Q12_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    { type: 'inSect', sectId: 'SECT-05', minRank: 3 },
    qStatus('QST-SECT-05-11', 'completed'),
    { type: 'flag', flag: 'hs_branch', op: 'eq', value: 'jian', label: '华山剑宗真传弟子' },
    { type: 'learnedArtAtLeast', artId: 'MA-068', minLevel: 4 },
    qStatus(HUASHAN_Q12_QUEST_ID, 'not_started'),
    { type: 'npcAlive', npcId: 'NPC-0147', npcName: '秦烈山' },
    { type: 'npcAlive', npcId: 'NPC-0167', npcName: '封不弃' },
  ],
}

export const HUASHAN_Q12_QUEST: QuestDefinition = {
  id: HUASHAN_Q12_QUEST_ID,
  title: '白玉问剑 · 潼关剑神',
  category: 'sect_mission',
  factionId: 'SECT-05',
  regionId: 'tongguan',
  recommendedRealm: '一流下品 ～ 一流中品',
  maxOpponentRealm: '一流上品（秦烈山十五合问剑 · 风陵渡塞外双煞）',
  recommendedNote:
    '华山派剑宗三阶真传进阶长卷（二十六幕）。需完结《狂风快剑 · 夺命三仙》且《夺命连环三仙剑》修至四重以上，赴【京兆府 · 西市胡商坊 · 车马行栈】见封不弃启程，登白玉论剑坛问剑潼关剑神秦烈山，夜闯风陵渡黑店连斩塞外双煞，获授地阶上品绝学《太岳三青峰》与《华山太岳三青峰剑谱》！',
  startHint:
    '剑宗三阶真传完结《狂风快剑 · 夺命三仙》并将《夺命连环三仙剑》修至四重后，前往【京兆府 · 西市胡商坊 · 车马行栈】寻封不弃指点。',
  startLocation: {
    regionId: 'changan',
    buildingId: 'ca_xishi',
    spotId: 'ca_xishi_west',
    customLabel: '京兆府 · 西市胡商坊 · 车马行栈 · 镖局坪',
  },
  startCondition: HUASHAN_Q12_START_CONDITION,
  summary:
    '{reignYear}关中朔雪初降，封不弃深知《夺命连环三仙剑》偏走奇险，欲成剑宗百年难遇之大器，必求华山镇山绝学《太岳三青峰》，遂指点你孤身登临【落雁峰白玉论剑坛】叩问「潼关剑神」秦烈山。白玉坛上寒云翻涌，你将落雁、希夷、三仙三路剑意熔于一炉，在秦烈山狂飙剑压下死战十五合，纵佩剑崩裂仍以断刃直指咽喉寸步不退！秦烈山赞许之余，命你夜赴黄河风陵渡荒店铲除凶名赫赫的「塞外双煞」以证正道锋芒。你孤剑破局连斩双煞凯旋，秦烈山欣然长笑，亲手托付《华山太岳三青峰剑谱》并倾授地阶上品《太岳三青峰》，白玉坛顶三剑齐发，流云尽散！',
  initialStepId: 'q12_summit_ask_sword',
  steps: {
    q12_summit_ask_sword: {
      id: 'q12_summit_ask_sword',
      title: '踏雪登坛 · 白玉问剑',
      objective:
        '已领封不弃指点。请孤身前往【潼关 / 西岳华山 · 华山绝顶论剑台 · 落雁峰白玉论剑坛】，拜见「潼关剑神」秦烈山求请《太岳三青峰》真传！',
      nextHint:
        '前往【潼关 / 西岳华山 · 华山绝顶论剑台 · 落雁峰白玉论剑坛（tg_sm_altar）】触发踏雪问剑。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
      },
    },
    q12_black_inn_raid: {
      id: 'q12_black_inn_raid',
      title: '风陵夜雪 · 孤剑诛煞',
      objective:
        '白玉坛十五合断刃问剑已获秦烈山首肯！请连夜下山赶赴【潼关天险瓮城 · 黄河大折惊涛烽火台（毗邻风陵渡口荒店）】，孤身闯入黑店诛灭流窜关中的「塞外双煞」！',
      nextHint:
        '前往【潼关天险瓮城 · 黄河大折惊涛烽火台（tg_ft_beacon）】，点击「夜闯风陵黑店 · 孤剑迎战塞外双煞」。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_fort',
        spotId: 'tg_ft_beacon',
      },
    },
    q12_return_summit: {
      id: 'q12_return_summit',
      title: '提首复命 · 剑神托谱',
      objective:
        '已于风陵渡黑店连斩塞外双煞，救出被困行商！请重返【华山绝顶论剑台 · 落雁峰白玉论剑坛】向秦烈山复命，领受《太岳三青峰》真传！',
      nextHint:
        '返回【华山绝顶论剑台 · 落雁峰白玉论剑坛（tg_sm_altar）】面见秦烈山。',
      targetLocation: {
        regionId: 'tongguan',
        buildingId: 'tg_summit',
        spotId: 'tg_sm_altar',
      },
    },
  },
  locationTriggers: [
    {
      id: 'trig_hsq12_summit_altar',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      onceFlag: 'hsq12_summit_altar_triggered',
      condition: atStep(HUASHAN_Q12_QUEST_ID, 'q12_summit_ask_sword'),
      effects: [openScene('scene_hsq12_06', HUASHAN_Q12_QUEST_ID)],
    },
    {
      id: 'trig_hsq12_fort_beacon',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      onceFlag: 'hsq12_fort_beacon_triggered',
      condition: atStep(HUASHAN_Q12_QUEST_ID, 'q12_black_inn_raid'),
      effects: [openScene('scene_hsq12_14', HUASHAN_Q12_QUEST_ID)],
    },
  ],
  spotActions: [
    {
      id: 'spot_hsq12_start',
      label: '向封不弃请教三仙剑破障之法（开启《白玉问剑》）',
      badge: '剑宗问剑',
      subtitle: '西市车马行栈 · 求索镇派三青峰',
      tone: 'gold',
      regionId: 'changan',
      buildingId: 'ca_xishi',
      spotId: 'ca_xishi_west',
      visibleWhen: HUASHAN_Q12_START_CONDITION,
      effects: [openScene('scene_hsq12_01', HUASHAN_Q12_QUEST_ID)],
    },
    {
      id: 'spot_hsq12_summit_ask',
      label: '踏雪登白玉论剑坛 · 向秦烈山问剑十五合',
      badge: '白玉问剑',
      subtitle: '落雁峰绝顶 · 断刃证剑心',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      visibleWhen: atStep(HUASHAN_Q12_QUEST_ID, 'q12_summit_ask_sword'),
      effects: [openScene('scene_hsq12_06', HUASHAN_Q12_QUEST_ID)],
    },
    {
      id: 'spot_hsq12_black_inn',
      label: '夜闯风陵黑店 · 孤剑迎战塞外双煞',
      badge: '夜闯黑店',
      subtitle: '黄河大折烽火台下 · 死斗双凶',
      tone: 'danger',
      regionId: 'tongguan',
      buildingId: 'tg_fort',
      spotId: 'tg_ft_beacon',
      visibleWhen: atStep(HUASHAN_Q12_QUEST_ID, 'q12_black_inn_raid'),
      effects: [openScene('scene_hsq12_14', HUASHAN_Q12_QUEST_ID)],
    },
    {
      id: 'spot_hsq12_return_summit',
      label: '重登白玉论剑坛 · 领受太岳三青峰剑谱',
      badge: '剑神托谱',
      subtitle: '落雁峰绝顶 · 修成太岳三青峰',
      tone: 'gold',
      regionId: 'tongguan',
      buildingId: 'tg_summit',
      spotId: 'tg_sm_altar',
      visibleWhen: atStep(HUASHAN_Q12_QUEST_ID, 'q12_return_summit'),
      effects: [openScene('scene_hsq12_21', HUASHAN_Q12_QUEST_ID)],
    },
  ],
  npcActions: [
    {
      id: 'act_hsq12_feng_start',
      label: '请教三仙剑百尺竿头更进一步之法（剑宗三阶）',
      badge: '白玉问剑',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0167'] },
          HUASHAN_Q12_START_CONDITION,
        ],
      },
      effects: [openScene('scene_hsq12_01', HUASHAN_Q12_QUEST_ID)],
    },
    {
      id: 'act_hsq12_qin_ask',
      label: '拔剑叩请秦师伯 · 十五合问剑太岳三青峰',
      badge: '白玉问剑',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
          atStep(HUASHAN_Q12_QUEST_ID, 'q12_summit_ask_sword'),
        ],
      },
      effects: [openScene('scene_hsq12_06', HUASHAN_Q12_QUEST_ID)],
    },
    {
      id: 'act_hsq12_qin_return',
      label: '呈报风陵诛煞首功 · 领受太岳三青峰真传',
      badge: '剑神托谱',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0147'] },
          atStep(HUASHAN_Q12_QUEST_ID, 'q12_return_summit'),
          flag('hs_branch', 'eq', 'jian'),
        ],
      },
      effects: [openScene('scene_hsq12_21', HUASHAN_Q12_QUEST_ID)],
    },
  ],
  loadScenes: () => import('./huashanJianSanqingQuest.scenes').then((m) => m.SCENES),
}

export const HUASHAN_Q12_QUESTS: QuestDefinition[] = [HUASHAN_Q12_QUEST]
