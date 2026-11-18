import type { QuestCondition, QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const JINJUN_TAIHANG_QUEST_1_ID = 'QST-SECT-33-TAIHANG-CAMPAIGN-1'

const LACKS_MILITARY_SCHOLARSHIP_CONDITION: QuestCondition = {
  type: 'any',
  hint: '尚未深研兵书韬略（经义 ≤ 40 或 策论 ≤ 60）',
  conditions: [
    { type: 'skillAtMost', key: '经义', max: 40 },
    { type: 'skillAtMost', key: '策论', max: 60 },
  ],
}

const START_VISIBILITY_BASE_CONDITIONS: QuestCondition[] = [
  { type: 'inSect', sectId: 'SECT-33', minRank: 3 },
  LACKS_MILITARY_SCHOLARSHIP_CONDITION,
  qStatus(JINJUN_TAIHANG_QUEST_1_ID, 'not_started'),
  qStatus(JINJUN_TAIHANG_QUEST_1_ID, 'not_completed'),
]

const FULL_START_CONDITION: QuestCondition = {
  type: 'all',
  conditions: [
    ...START_VISIBILITY_BASE_CONDITIONS,
    { type: 'sectDaysAtLeast', sectId: 'SECT-33', min: 365 },
  ],
}

export const JINJUN_TAIHANG_CAMPAIGN_1_QUEST: QuestDefinition = {
  id: JINJUN_TAIHANG_QUEST_1_ID,
  title: '太行剿匪 · 骄兵折戟',
  category: 'sect_mission',
  factionId: 'SECT-33',
  regionId: 'bianliang',
  recommendedRealm: '二流上品 ~ 一流下品',
  maxOpponentRealm: '一流上品（王重岳、史万山三合断后）',
  recommendedNote:
    '大宋禁军太行征讨三部曲 · 第一部（全四十幕）。触发条件：加入【大宋禁军】任 Lv.3 四厢都指挥满 365 天，且尚未通晓兵书（经义 ≤ 40 或 策论 ≤ 60）。',
  startHint:
    '在大宋禁军任职满 365 天、官居 Lv.3 四厢都指挥且经义 ≤ 40 或策论 ≤ 60 时，前往【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】与枢密使王德用对话或点击场景任务开启。',
  startLocation: {
    regionId: 'bianliang',
    buildingId: 'bl_jinjun',
    spotId: 'bl_jj_platform',
    customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
  },
  startCondition: FULL_START_CONDITION,
  initialStepId: 'summoned_to_zichen',
  summary:
    '入值大宋禁军操练满一载后，太行天王王重岳与九纹狂龙史万山大肆劫掠河北边军纲银。今上赵祯召对紫宸殿，特晋少侠为【三衙都虞候】，钦命统率五千禁军精锐、以高怀亮为副将北上剿匪。初战虽连破外山口与东麓鹿角寨，然因少侠未读兵书（经义或策论不足）、不谙“穷寇莫追”与山川火攻之忌，斥退副将苦谏孤军追入黑风愁猿涧，惨遭断道火攻！少侠悔恨泣血，强命高怀亮率残部突围，独留一线天连战追寇并硬撼王重岳、史万山三合断后，终折损两千余名禁军将士败归汴梁。紫宸殿上奉旨削回 四厢都指挥、罚俸一年，于汴郊秋雨新冢前泣血立誓潜修经史兵略。',
  steps: {
    summoned_to_zichen: {
      id: 'summoned_to_zichen',
      title: '金牌急召赴紫宸',
      objective:
        '河北八百里羽檄惊动朝堂，太行山王重岳、史万山连劫边军纲银！请即刻前往【开封府 · 大内皇宫 · 垂拱紫宸正殿】面见今上赵祯听旨议兵。',
      nextHint: '在大内皇宫垂拱紫宸正殿与今上赵祯交互，或点击当前场景剧情按钮登殿奏对。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_hall',
        customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
      },
    },
    depart_at_jinjun: {
      id: 'depart_at_jinjun',
      title: '晋阶点兵五千甲',
      objective:
        '已奉官家圣旨晋升为【Lv.4 三衙都虞候】！请返回【开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台】点齐五千禁军精锐祭旗出征。',
      nextHint: '前往八十万禁军大教场擂鼓聚将点兵帅台，点击「登台点齐五千禁军出师太行」。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_platform',
        customLabel: '开封府 · 八十万禁军大教场 · 擂鼓聚将点兵帅台',
      },
    },
    march_to_daming: {
      id: 'march_to_daming',
      title: '北渡黄河会大名',
      objective:
        '统率五千殿前司禁军北渡黄河，前往河北重镇【大名府 · 河北枪棒大校场 · 六合枪棒八角比武擂台】与宿将王信会合补充军粮。',
      nextHint: '赶往大名府河北枪棒大校场（六合枪棒八角比武擂台），点击任务按钮会合河北粮道。',
      targetLocation: {
        regionId: 'daming',
        buildingId: 'dm_drill',
        spotId: 'dm_dr_leitai',
        customLabel: '大名府 · 河北枪棒大校场 · 六合枪棒八角比武擂台',
      },
    },
    advance_to_taihang: {
      id: 'advance_to_taihang',
      title: '兵临太行破前哨',
      objective:
        '轻装急行西进太行山，前往【太行山绿林总寨 · 飞狐断魂索桥 · 千帆栈桥·装卸埠】击溃把守外山口的先锋雷武石与樊破山（1v2）。',
      nextHint: '抵达太行山飞狐断魂索桥（千帆栈桥·装卸埠），点击任务按钮挥师强攻外山口前哨。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_bridge',
        spotId: 'th_bridge_east',
        customLabel: '太行山绿林总寨 · 飞狐断魂索桥 · 千帆栈桥·装卸埠',
      },
    },
    storm_east_palisade: {
      id: 'storm_east_palisade',
      title: '乘胜强攻鹿角寨',
      objective:
        '外山口首战告捷，率五千大军直扑【太行山绿林总寨 · 太行藏金义仓 · 绝壁石刻·剑痕崖】（东麓鹿角寨），击败银枪叟史玄朗与铁掌汉燕刀柏（1v2）！',
      nextHint: '前往太行藏金义仓（绝壁石刻·剑痕崖），点击任务按钮猛攻东麓鹿角寨。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_vault',
        spotId: 'th_vault_east',
        customLabel: '太行山绿林总寨 · 太行藏金义仓 · 绝壁石刻·剑痕崖',
      },
    },
    canyon_rearguard_1: {
      id: 'canyon_rearguard_1',
      title: '火海横刃阻追寇',
      objective:
        '黑风愁猿涧惨遭断道火攻！已将虎符交予高怀亮率残军南撤，请于【一线天谷口】迎战追击头目神行手王浪青与铁莲花邬烟娘（1v2）！',
      nextHint: '调息完备后点击当前场景「横刃死守一线天 · 截杀追击双寇」迎战。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_vault',
        spotId: 'th_vault_east',
        customLabel: '太行山 · 黑风愁猿涧 · 一线天谷口',
      },
    },
    canyon_rearguard_2: {
      id: 'canyon_rearguard_2',
      title: '一线天浴血三合',
      objective:
        '太行天王【王重岳】与九纹狂龙【史万山】踏火亲至！须在一线天绝隘独自死守撑满 3 个回合，掩护两千八百残军逃出太行山！',
      nextHint: '补满状态后点击当前场景「浴血断后三合 · 独挡太行双雄」迎战王重岳与史万山（1v2 撑满 3 回合）。',
      targetLocation: {
        regionId: 'taihang',
        buildingId: 'th_vault',
        spotId: 'th_vault_east',
        customLabel: '太行山 · 黑风愁猿涧 · 一线天谷口',
      },
    },
    return_to_kaifeng_defeated: {
      id: 'return_to_kaifeng_defeated',
      title: '丧师两千归紫宸',
      objective:
        '黑风涧一役折损禁军将士两千一百四十三人，请率领幸存伤残袍泽返回【开封府 · 大内皇宫 · 垂拱紫宸正殿】向今上赵祯叩首请罪。',
      nextHint: '返回开封府大内皇宫垂拱紫宸正殿，与官家交互或点击场景任务按钮登殿领罪。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_hall',
        customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
      },
    },
    mourn_at_graveyard: {
      id: 'mourn_at_graveyard',
      title: '汴郊秋雨祭忠魂',
      objective:
        '已削去三衙都虞候冠带贬回 Lv.3 四厢都指挥并罚俸一年。请前往【开封府 · 八十万禁军大教场 · 禁军长枪方阵演武坪】会合林铁衣与高怀亮，携浊酒赴汴郊新冢祭奠两千阵亡忠魂。',
      nextHint: '前往八十万禁军大教场（禁军长枪方阵演武坪），点击任务按钮携酒出城祭奠袍泽。',
      targetLocation: {
        regionId: 'bianliang',
        buildingId: 'bl_jinjun',
        spotId: 'bl_jj_spear',
        customLabel: '开封府 · 八十万禁军大教场 · 禁军长枪方阵演武坪',
      },
    },
  },
  npcActions: [
    {
      id: 'npc_jtc1_start_wangdeyong',
      label: '校场晨操议军 · 开启《太行剿匪 · 骄兵折戟》',
      badge: '禁军太行篇·一',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0038'] },
          ...START_VISIBILITY_BASE_CONDITIONS,
        ],
      },
      enabledWhen: FULL_START_CONDITION,
      effects: [openScene('scene_jtc1_01_drill_ground_year', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'npc_jtc1_zichen_decree',
      label: '紫宸登殿奏对 · 请缨挂帅北剿太行',
      badge: '第5-7幕 · 晋升Lv.4',
      tone: 'gold',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0001'] },
          atStep(JINJUN_TAIHANG_QUEST_1_ID, 'summoned_to_zichen'),
        ],
      },
      effects: [openScene('scene_jtc1_05_zichen_court_debate', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'npc_jtc1_zichen_reprimand',
      label: '败师归京叩金砖 · 紫宸殿领受天威惩戒',
      badge: '第31-35幕 · 削阶罚俸',
      tone: 'danger',
      showInBottomBar: true,
      showInSectPanel: true,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0001'] },
          atStep(JINJUN_TAIHANG_QUEST_1_ID, 'return_to_kaifeng_defeated'),
        ],
      },
      effects: [openScene('scene_jtc1_31_tattered_return_bianliang', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'npc_jtc1_mourn_graveyard',
      label: '携酒冒雨赴汴郊 · 祭奠黑风涧两千阵亡袍泽',
      badge: '第36-40幕 · 终幕悔悟',
      tone: 'jade',
      showInBottomBar: true,
      showInSectPanel: false,
      visibleWhen: {
        type: 'all',
        conditions: [
          { type: 'targetNpcMatch', npcIds: ['NPC-0154', 'NPC-0043'] },
          atStep(JINJUN_TAIHANG_QUEST_1_ID, 'mourn_at_graveyard'),
        ],
      },
      effects: [openScene('scene_jtc1_36_empty_spear_racks', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
  ],
  spotActions: [
    {
      id: 'spot_jtc1_start_platform',
      label: '大教场晨操阅阵 · 开启《太行剿匪 · 骄兵折戟》',
      badge: '禁军太行篇·一',
      subtitle:
        '需禁军 Lv.3 满 365 天且经义 ≤ 40 或策论 ≤ 60 · 奉旨晋阶统兵五千征太行',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      visibleWhen: {
        type: 'all',
        conditions: START_VISIBILITY_BASE_CONDITIONS,
      },
      enabledWhen: FULL_START_CONDITION,
      effects: [openScene('scene_jtc1_01_drill_ground_year', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_zichen_summons',
      label: '登垂拱紫宸正殿 · 请缨北征晋阶三衙都虞候',
      badge: '第5-7幕 · 晋升Lv.4',
      subtitle: '面见今上赵祯、包拯与王德用，拜领 Lv.4 三衙都虞候与五千禁军兵符',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'summoned_to_zichen'),
      effects: [openScene('scene_jtc1_05_zichen_court_debate', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_depart_army',
      label: '登台点齐五千禁军 · 祭旗出师太行',
      badge: '第8-9幕 · 插画一',
      subtitle: '披挂三衙都虞候明光铠，统领殿前司五千铁甲北出封丘门',
      tone: 'gold',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'depart_at_jinjun'),
      effects: [openScene('scene_jtc1_08_depart_five_thousand', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_daming_supply',
      label: '会合北京大名府粮道 · 轻装西进太行山',
      badge: '第10-11幕',
      subtitle: '与河北驻将王信会合，拒带笨重偏厢战车，倍道急趋太行外山口',
      tone: 'primary',
      regionId: 'daming',
      buildingId: 'dm_drill',
      spotId: 'dm_dr_leitai',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'march_to_daming'),
      effects: [openScene('scene_jtc1_10_daming_rendezvous', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_outer_pass_battle',
      label: '挥师强攻太行外山口 · 迎战雷武石与樊破山（1v2）',
      badge: '第12-14幕 · 首战',
      subtitle: '摧锋击溃太行前哨先锋落雁枪雷武石、太行断门刀樊破山',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_bridge',
      spotId: 'th_bridge_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'advance_to_taihang'),
      effects: [openScene('scene_jtc1_12_outer_pass_vanguard', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_east_palisade_battle',
      label: '猛攻东麓鹿角寨 · 迎战银枪叟史玄朗与铁掌汉燕刀柏（1v2）',
      badge: '第15-26幕 · 连环剧变',
      subtitle: '攻破鹿角寨后拒谏盲追黑风愁猿涧，惨遭万箭火攻，独留一线天断后死战！',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_vault',
      spotId: 'th_vault_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'storm_east_palisade'),
      effects: [openScene('scene_jtc1_15_east_palisade_confront', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_rearguard_pursuers',
      label: '横刃死守一线天 · 截杀追击头目王浪青与邬烟娘（1v2）',
      badge: '第27幕 · 断后首战',
      subtitle: '死锁黑风涧一线天窄隘，阻截神行手王浪青与铁莲花邬烟娘掩杀伤兵',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_vault',
      spotId: 'th_vault_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'canyon_rearguard_1'),
      effects: [openScene('scene_jtc1_27_rearguard_clash_pursuers', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_rearguard_twins',
      label: '浴血断后三合 · 独挡太行天王王重岳与九纹狂龙史万山（撑满6合）',
      badge: '第29-30幕 · 绝境死战',
      subtitle: '以一身血肉硬撼太行正副总瓢把子 3 个回合，换取两千八百残军突围生机！',
      tone: 'danger',
      regionId: 'taihang',
      buildingId: 'th_vault',
      spotId: 'th_vault_east',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'canyon_rearguard_2'),
      effects: [openScene('scene_jtc1_29_ultimate_six_rounds_stand', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_return_zichen_reprimand',
      label: '率残兵入垂拱紫宸殿请罪 · 摘冠削阶罚俸一年',
      badge: '第31-35幕 · 插画五',
      subtitle: '丧师两千余人登殿伏法，官家念一线天死战断后免死，削回四厢都指挥并罚俸一年',
      tone: 'danger',
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'return_to_kaifeng_defeated'),
      effects: [openScene('scene_jtc1_31_tattered_return_bianliang', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
    {
      id: 'spot_jtc1_mourn_graveyard',
      label: '会合林铁衣与高怀亮 · 携浊酒赴汴郊秋雨新冢祭魂',
      badge: '第36-40幕 · 插画六',
      subtitle: '跪对两千一百四十三座阵亡忠魂木碑泣血悔悟，立誓潜修经史兵略雪耻太行',
      tone: 'jade',
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_spear',
      visibleWhen: atStep(JINJUN_TAIHANG_QUEST_1_ID, 'mourn_at_graveyard'),
      effects: [openScene('scene_jtc1_36_empty_spear_racks', 'QST-SECT-33-TAIHANG-CAMPAIGN-1')],
    },
  ],
  loadScenes: () => import('./jinjunTaihangQuest1.scenes').then((m) => m.SCENES),
}

export const JINJUN_TAIHANG_QUEST_1: QuestDefinition[] = [JINJUN_TAIHANG_CAMPAIGN_1_QUEST]
