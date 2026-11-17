import type { QuestDefinition } from '../../../types/quest'
import { atStep, qStatus, openScene } from '../../../engine/quest/dsl'

export const QUEST_ID = 'QST-SECT-17-RENZONG-ESCORT'

export const KAIFENG_RENZONG_ESCORT_QUEST: QuestDefinition[] = [
  {
    id: QUEST_ID,
    title: '微服汴梁 · 血护龙颜',
    category: 'sect_mission',
    factionId: 'SECT-17',
    regionId: 'bianliang',
    recommendedRealm: '一流下品 ~ 一流上品（含连续三轮 1v2 生死决战）',
    maxOpponentRealm: '一流中品（银狼双统领 1v2 合击）',
    recommendedNote:
      '需居【开封府 / 六扇门 Lv.4 御前护卫】且【宋仁宗赵祯好感度 ≥ 20】；全篇含 38 幕长篇群像（单周目 36 幕）、5 幅北宋画卷插画及三轮连续 1v2 一品堂死士截杀。',
    startHint:
      '晋升开封府 Lv.4 御前护卫并获赵祯好感度 ≥ 20 后，前往【开封府 · 大内皇宫 · 垂拱紫宸正殿】与宋仁宗赵祯接洽开启。',
    startLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
    },
    startCondition: {
      type: 'all',
      conditions: [
        { type: 'inSect', sectId: 'SECT-17', minRank: 4 },
        { type: 'npcFavorAtLeast', npcId: 'NPC-0001', min: 20 },
      ],
    },
    summary:
      '皇祐二年暮春，宋仁宗赵祯拒绝大队禁军仪仗，仅凭少侠这位开封府 Lv.4 御前护卫微服巡访东京夜市。谁料西夏主战派权重没藏讹庞暗遣一品堂死士潜伏汴京，于相国寺宝塔、樊楼雅阁与雨夜虹桥设下三环连杀！连破三轮 1v2 血战护驾返抵紫宸殿后，天子亲赐两途清贵殊荣：转任【大宋禁军 Lv.3 四厢都指挥】并获赐玉津园龙骧骢，抑或留守六扇门领受大内《葵花残卷》孤本与千两白银。',
    initialStepId: 'xiangguosi_market',
    steps: {
      xiangguosi_market: {
        id: 'xiangguosi_market',
        title: '随驾微服，初探相国灯市',
        objective:
          '护卫微服出宫的“赵六郎”（宋仁宗赵祯）前往【开封府 · 大相国寺 · 万姓交易雅市】，察看皇祐二年市井烟火与活字书摊，留意四方外谍异动。',
        nextHint: '相国寺夜市鱼龙混杂，谨记寸步不离官家左右。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_market',
          customLabel: '开封府 · 大相国寺 · 万姓交易雅市',
        },
      },
      xiangguosi_pagoda: {
        id: 'xiangguosi_pagoda',
        title: '塔影惊鸿，初破一品先遣',
        objective:
          '在相国寺集市撞破西夏铁鹞暗桩！护送赵祯避开万姓人流登上【开封府 · 大相国寺 · 资圣八角琉璃宝塔】，准备迎战第一轮西夏刺客（1v2 决战）。',
        nextHint: '首战敌人为二流上品双刺客合击，不可逃跑，战前请备妥兵刃武学与丹药。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_xiangguosi',
          spotId: 'bl_xg_pagoda',
          customLabel: '开封府 · 大相国寺 · 资圣八角琉璃宝塔',
        },
      },
      fanlou_towers: {
        id: 'fanlou_towers',
        title: '飞桥断弦，樊楼再挫血刺',
        objective:
          '已在宝塔力挫先遣双刺并审出“三环死局”密谋！护驾避开东坊假火警诱兵，登上【开封府 · 樊楼 · 三层五楼飞桥雅阁】发出碧玉号灯并迎击第二轮红牌刺客（1v2 决战）。',
        nextHint: '第二轮敌手为一流下品一品堂红牌双煞合击。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_fanlou',
          spotId: 'bl_fl_towers',
          customLabel: '开封府 · 樊楼 · 三层五楼飞桥雅阁',
        },
      },
      hongqiao_tavern: {
        id: 'hongqiao_tavern',
        title: '虹桥夜雨，孤身血战双狼',
        objective:
          '已在樊楼点亮求援号灯并夺获没藏讹庞蜡封死令！疾风骤雨之中护送赵祯奔赴【开封府 · 汴河虹桥 · 临水酒肆】，迎战西夏一品堂银狼双统领最后堵截（1v2 决战）。',
        nextHint: '第三轮终局战敌手为一流中品贺兰断岳与李破军双统领合击！',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bianliang_base_tavern',
          customLabel: '开封府 · 汴河虹桥 · 临水酒肆',
        },
      },
      palace_decree: {
        id: 'palace_decree',
        title: '还朝紫宸，丹墀双恩抉择',
        objective:
          '三轮 1v2 血战悉数大捷，展昭、韦青衣与殿前都指挥使王德用已率禁军接驾还朝！于【开封府 · 大内皇宫 · 垂拱紫宸正殿】登殿听旨，在晋升【大宋禁军 Lv.3 四厢都指挥】或留守开封府 / 六扇门领受《葵花残卷》之间作出抉择。',
        targetLocation: {
          regionId: 'bianliang',
          buildingId: 'bl_palace',
          spotId: 'bl_palace_hall',
          customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
        },
      },
    },
    npcActions: [
      {
        id: 'npc_rz_start',
        label: '奉密召陪官家微服私访：《微服汴梁 · 血护龙颜》',
        badge: '御前密召',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0001'] },
            { type: 'inSect', sectId: 'SECT-17', minRank: 4 },
            qStatus(QUEST_ID, 'not_started'),
            qStatus(QUEST_ID, 'not_completed'),
          ],
        },
        enabledWhen: { type: 'npcFavorAtLeast', npcId: 'NPC-0001', min: 20 },
        effects: [openScene('scene_rz_01_secret_summons', 'QST-SECT-17-RENZONG-ESCORT')],
      },
      {
        id: 'npc_rz_palace_decree',
        label: '紫宸登殿复命 · 抉择禁军重职或留守公门',
        badge: '终幕抉择',
        tone: 'gold',
        showInBottomBar: true,
        showInSectPanel: true,
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'targetNpcMatch', npcIds: ['NPC-0001'] },
            atStep(QUEST_ID, 'palace_decree'),
          ],
        },
        effects: [openScene('scene_rz_33_zichen_court_morning', 'QST-SECT-17-RENZONG-ESCORT')],
      },
    ],
    spotActions: [
      {
        id: 'spot_rz_start',
        label: '应紫宸密召 · 随宋仁宗赵祯微服夜巡《微服汴梁 · 血护龙颜》',
        badge: 'Lv.4 进阶剧情',
        subtitle:
          '需开封府 Lv.4 御前护卫且赵祯好感度 ≥ 20 · 三轮 1v2 血战后抉择转任禁军 Lv.3 四厢都指挥或留守受赏',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_hall',
        visibleWhen: {
          type: 'all',
          conditions: [
            { type: 'inSect', sectId: 'SECT-17', minRank: 4 },
            qStatus(QUEST_ID, 'not_started'),
            qStatus(QUEST_ID, 'not_completed'),
          ],
        },
        enabledWhen: { type: 'npcFavorAtLeast', npcId: 'NPC-0001', min: 20 },
        effects: [openScene('scene_rz_01_secret_summons', 'QST-SECT-17-RENZONG-ESCORT')],
      },
      {
        id: 'spot_rz_market',
        label: '随“赵六郎”漫步万姓灯市 · 施汤问卒、查书察谍',
        badge: '第5-8幕 · 插画一',
        subtitle: '陪宋仁宗逛相国寺夜市体察民情，警觉钟楼檐下西夏铁鹞暗哨窥伺',
        tone: 'primary',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_market',
        visibleWhen: atStep(QUEST_ID, 'xiangguosi_market'),
        effects: [openScene('scene_rz_05_market_twilight', 'QST-SECT-17-RENZONG-ESCORT')],
      },
      {
        id: 'spot_rz_pagoda',
        label: '护驾登上资圣宝塔 · 迎战第一轮西夏刺客（1v2）',
        badge: '第9-16幕 · 插画二',
        subtitle: '共话好水川前事，突遭一品堂飞檐先遣拓跋枭、野利寒鸦双刺合击',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_xiangguosi',
        spotId: 'bl_xg_pagoda',
        visibleWhen: atStep(QUEST_ID, 'xiangguosi_pagoda'),
        effects: [openScene('scene_rz_09_ascend_glazed_pagoda', 'QST-SECT-17-RENZONG-ESCORT')],
      },
      {
        id: 'spot_rz_fanlou',
        label: '步入樊楼飞桥雅阁 · 识破伪伙、再破红牌双煞（1v2）',
        badge: '第17-24幕 · 插画三',
        subtitle: '借《渔家傲》词声掩护发碧灯，激战嵬名赤锋与没藏血影夺取蜡封密令',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bl_fanlou',
        spotId: 'bl_fl_towers',
        visibleWhen: atStep(QUEST_ID, 'fanlou_towers'),
        effects: [openScene('scene_rz_17_fanlou_flying_bridge', 'QST-SECT-17-RENZONG-ESCORT')],
      },
      {
        id: 'spot_rz_hongqiao',
        label: '暴雨夜临汴河虹桥 · 血战一品堂银狼双统领（1v2）',
        badge: '第25-32幕 · 插画四',
        subtitle: '断袖裹伤死守虹桥，孤身迎击贺兰断岳与李破军至禁军火炬临门',
        tone: 'danger',
        regionId: 'bianliang',
        buildingId: 'bianliang_base_tavern',
        visibleWhen: atStep(QUEST_ID, 'hongqiao_tavern'),
        effects: [openScene('scene_rz_25_hongqiao_rain_arrival', 'QST-SECT-17-RENZONG-ESCORT')],
      },
      {
        id: 'spot_rz_decree',
        label: '晓入垂拱紫宸殿 · 承旨定议禁军重职或留守秘卷',
        badge: '第33-36幕 · 插画五',
        subtitle: '选择转入大宋禁军 Lv.3 四厢都指挥 + 龙骧骢 + 千两白银，或留守领受葵花残卷 + 千两白银',
        tone: 'gold',
        regionId: 'bianliang',
        buildingId: 'bl_palace',
        spotId: 'bl_palace_hall',
        visibleWhen: atStep(QUEST_ID, 'palace_decree'),
        effects: [openScene('scene_rz_33_zichen_court_morning', 'QST-SECT-17-RENZONG-ESCORT')],
      },
    ],
    loadScenes: () => import('./kaifengRenzongEscortQuest.scenes').then((m) => m.SCENES),
  },
]
