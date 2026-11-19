import type { QuestDefinition } from '../../../types/quest'
import { atStep, openScene } from '../../../engine/quest/dsl'

export const JINJUN_TAIHANG_QUEST_3_ID = 'QST-SECT-33-TAIHANG-CAMPAIGN-3'

const START_JINJUN_TAIHANG_3_CONDITIONS = [
  {
    type: 'questCompletedDaysAgoAtLeast' as const,
    questId: 'QST-SECT-33-TAIHANG-CAMPAIGN-2',
    minDays: 60,
  },
  { type: 'inSect' as const, sectId: 'SECT-33', minRank: 3 as const },
  { type: 'npcAlive' as const, npcId: 'NPC-0140', npcName: '展昭' },
  { type: 'npcAlive' as const, npcId: 'NPC-0013', npcName: '包拯' },
  { type: 'npcAlive' as const, npcId: 'NPC-0038', npcName: '王德用' },
  {
    type: 'questStatus' as const,
    questId: JINJUN_TAIHANG_QUEST_3_ID,
    status: 'not_started' as const,
  },
  {
    type: 'questStatus' as const,
    questId: JINJUN_TAIHANG_QUEST_3_ID,
    status: 'not_completed' as const,
  },
]

export const JINJUN_TAIHANG_CAMPAIGN_3_QUEST: QuestDefinition = {
  id: JINJUN_TAIHANG_QUEST_3_ID,
  title: '太行剿匪 · 叁 · 犁庭扫穴',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '一流中品 ~ 一流上品',
  maxOpponentRealm: '一流上品（太行天王王重岳 2v2 / 京东双寇劫法场 1v2）',
  recommendedNote:
    '大宋禁军（SECT-33）太行剿匪三部曲终章！须于《太行剿匪 · 贰 · 刮目相看》结案满 60 日且身居禁军 Lv.3【四厢都指挥】及以上，赴开封府升堂正殿拜会南侠展昭开启。全长四十幕，完成后永久铲除太行绿林势力并敕封 Lv.4【三衙都虞候】！',
  startHint:
    '《太行剿匪 · 贰》完成满 60 日且禁军阶位达 Lv.3 后，前往【开封府 · 开封府衙（六扇门） · 开封府升堂正殿】与【南侠 · 展昭】对话开启。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_kaifengfu',
    spotId: 'bl_kf_court',
    customLabel: '开封府 · 开封府衙（六扇门） · 开封府升堂正殿',
  },
  startCondition: {
    type: 'all',
    conditions: START_JINJUN_TAIHANG_3_CONDITIONS,
  },
  summary:
    '二征太行满六十日后，开封府潜伏太行核心一载的内线暗桩“孤雁”冒死送出《太行山绿林防备暗道图》，揭露王重岳与史万山欲勾结山东绿林突围之谋。少侠与枢密使王德用、包拯、展昭合定奇策：由高怀亮率禁军主力万炬铁桶合围太行、夜擂战鼓佯攻飞狐索桥；子夜时分少侠与展昭率五十名夜行衣精锐攀后崖绝壁潜入，无声拔除鹰愁暗哨，破入聚义忠义大堂 2v2 生擒王重岳与史万山，大开寨门迫降群寇！押返东京市曹处斩之日，京东义虎晁云飞与立地太岁阮惊涛暴起强劫法场，少侠横刃护台 1v2 击退双寇，将王、史二凶当场正法，彻底荡平太行匪患，于垂拱紫宸正殿受官家敕封【三衙都虞候】，晴光之下携御酒祭奠两千阵亡忠魂。',
  initialStepId: 'encircle_taihang',
  steps: {
    encircle_taihang: {
      id: 'encircle_taihang',
      title: '万炬锁山 · 兵临断魂桥',
      objective:
        '已获内线暗桩“孤雁”冒死绘出的《太行山绿林防备暗道图》，并与王德用、展昭定下奇正合击之计。请率军赶赴【太行山绿林总寨 · 飞狐断魂索桥 · 水寨望楼】部署铁桶合围与子夜佯攻！',
      nextHint:
        '前往太行山【飞狐断魂索桥 · 水寨望楼（th_bridge_main）】，点击「部署禁军铁桶合围与子夜奇袭」。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_bridge',
        spotId: 'th_bridge_main',
        customLabel: '太行山绿林总寨 · 飞狐断魂索桥 · 水寨望楼',
      },
    },
    infiltrate_cliff_post: {
      id: 'infiltrate_cliff_post',
      title: '子夜玄衣 · 拔除鹰愁哨',
      objective:
        '已偕展昭率五十名夜行衣精锐循《太行山绿林防备暗道图》攀上后崖暗道！须在警世铜锣敲响前，于【太行藏金义仓 · 绝壁石刻 · 剑痕崖】雷霆击毙鹰愁暗哨正副统领石破山与裴夜枭！',
      nextHint:
        '在【太行藏金义仓 · 绝壁石刻 · 剑痕崖（th_vault_east）】点击「突袭拔除鹰愁暗哨」迎战两名二流暗哨统领。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_vault',
        spotId: 'th_vault_east',
        customLabel: '太行山绿林总寨 · 太行藏金义仓 · 绝壁石刻（鹰愁暗哨）',
      },
    },
    storm_juyi_hall: {
      id: 'storm_juyi_hall',
      title: '中心开花 · 破门擒双凶',
      objective:
        '已救出内线暗桩“孤雁”并由五十玄衣死士封锁外院！立即与南侠展昭一同破开【聚义忠义大堂 · 雄关箭楼】大门，2v2 联手生擒太行天王王重岳与九纹狂龙史万山，大开寨门降服群寇！',
      nextHint:
        '在【聚义忠义大堂 · 雄关箭楼（th_hall_main）】点击「破门突入聚义大堂」，与展昭并肩 2v2 决战王重岳、史万山。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_hall',
        spotId: 'th_hall_main',
        customLabel: '太行山绿林总寨 · 聚义忠义大堂',
      },
    },
    escort_chiefs_to_kaifeng: {
      id: 'escort_chiefs_to_kaifeng',
      title: '槛车献俘 · 凯旋归汴梁',
      objective:
        '太行总寨已大开寨门、残匪尽数跪地投降！请押解锁入精铁槛车的首恶【王重岳】与【史万山】班师返回【开封府 · 开封府衙 · 开封府升堂正殿】，交包拯与王德用会审定谳！',
      nextHint:
        '返回开封府【开封府衙 · 升堂正殿（bl_kf_court）】，与展昭对话或点击场景按钮押解双凶入堂受审。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        customLabel: '开封府 · 开封府衙 · 开封府升堂正殿',
      },
    },
    defend_execution_ground: {
      id: 'defend_execution_ground',
      title: '市曹监斩 · 横刃镇法场',
      objective:
        '王重岳与史万山已判处斩立决，然京东义虎【晁云飞】与立地太岁【阮惊涛】已潜入京师妄图强劫法场！请整顿最强披挂武学，赴【东京市曹刑场（由开封府升堂正殿出发）】贴身镇守断头刑台，1v2 击溃劫场双寇，将太行渠魁彻底正法！',
      nextHint:
        '整备完毕后，在【开封府 · 开封府衙 · 升堂正殿（bl_kf_court）】点击「奔赴市曹护持法场」开启劫法场 1v2 决战。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_kaifengfu',
        spotId: 'bl_kf_court',
        customLabel: '开封府 · 开封府衙 · 升堂正殿（赴东京市曹监斩）',
      },
    },
  },
  npcActions: [
    {
      id: 'act_jtc3_start_from_zhanzhao',
      label: '商议太行绝密军情：《太行剿匪 · 叁 · 犁庭扫穴》',
      badge: '禁军终章',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140'] },
          ...START_JINJUN_TAIHANG_3_CONDITIONS,
        ],
      },
      effects: [openScene('scene_jtc3_01_kaifeng_urgent_summon', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'act_jtc3_handover_prison_carts',
      label: '押解王重岳与史万山槛车献俘会审',
      badge: '太行献俘',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140', 'NPC-0013'] },
          atStep(JINJUN_TAIHANG_QUEST_3_ID, 'escort_chiefs_to_kaifeng'),
        ],
      },
      effects: [openScene('scene_jtc3_28_triumph_return_bianliang', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'act_jtc3_guard_execution_platform',
      label: '奔赴东京市曹护持法场（迎战劫囚双寇）',
      badge: '市曹决战',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0140', 'NPC-0013'] },
          atStep(JINJUN_TAIHANG_QUEST_3_ID, 'defend_execution_ground'),
        ],
      },
      effects: [openScene('scene_jtc3_34_defend_platform_1v2', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
  ],
  spotActions: [
    {
      id: 'spot_jtc3_start_kaifeng_court',
      label: '开启终章战役：《太行剿匪 · 叁 · 犁庭扫穴》',
      badge: 'Lv.3→Lv.4 终章',
      subtitle: '会见南侠展昭与包拯 · 查阅暗桩“孤雁”冒死送出的《太行山绿林防备暗道图》',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      visibleWhen: {
        type: 'all',
        conditions: START_JINJUN_TAIHANG_3_CONDITIONS,
      },
      effects: [openScene('scene_jtc3_01_kaifeng_urgent_summon', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'spot_jtc3_encircle_taihang',
      label: '部署禁军铁桶合围与子夜玄衣奇袭',
      badge: '第11-18幕',
      subtitle: '令高怀亮燃万炬佯攻飞狐索桥 · 子夜偕展昭率五十夜行衣精锐潜度后崖',
      tone: 'primary',
      regionId: 'taihang',
      buildingId: 'th_bridge',
      spotId: 'th_bridge_main',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_3_ID, 'encircle_taihang'),
      effects: [openScene('scene_jtc3_11_arrive_taihang_foot', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'spot_jtc3_infiltrate_cliff',
      label: '突袭拔除鹰愁暗哨（1v2 夺槌灭口）',
      badge: '第19-22幕',
      subtitle: '抢在警世铜锣敲响前击毙暗哨正副统领石破山、裴夜枭，营救暗桩“孤雁”',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_vault',
      spotId: 'th_vault_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_3_ID, 'infiltrate_cliff_post'),
      effects: [openScene('scene_jtc3_19_cliff_sentry_ambush_battle', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'spot_jtc3_storm_juyi_hall',
      label: '破门突入聚义大堂（偕展昭 2v2 决战王重岳与史万山）',
      badge: '第23-27幕',
      subtitle: '与南侠展昭联手生擒太行正副总瓢把子，大开寨门迫降全山残匪',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_hall',
      spotId: 'th_hall_main',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_3_ID, 'storm_juyi_hall'),
      effects: [openScene('scene_jtc3_23_kick_open_juyi_hall_2v2', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'spot_jtc3_escort_to_kaifeng',
      label: '押解王重岳与史万山精铁槛车入堂会审',
      badge: '第28-33幕',
      subtitle: '包拯与王德用联堂定谳 · 押赴东京市曹明正典刑',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_3_ID, 'escort_chiefs_to_kaifeng'),
      effects: [openScene('scene_jtc3_28_triumph_return_bianliang', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
    {
      id: 'spot_jtc3_defend_execution_ground',
      label: '奔赴市曹护持法场（1v2 迎战晁云飞与阮惊涛）',
      badge: '第34-40幕',
      subtitle: '横刃镇守断头刑台击退京东劫场双寇，处斩太行渠魁并入紫宸殿受封都虞候',
      tone: 'danger',
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_3_ID, 'defend_execution_ground'),
      effects: [openScene('scene_jtc3_34_defend_platform_1v2', 'QST-SECT-33-TAIHANG-CAMPAIGN-3')],
    },
  ],
  loadScenes: () => import('./jinjunTaihangQuest3.scenes').then((m) => m.SCENES),
}

export const JINJUN_TAIHANG_QUEST_3: QuestDefinition[] = [JINJUN_TAIHANG_CAMPAIGN_3_QUEST]
