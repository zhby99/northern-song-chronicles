import {
  Compass,
  Crosshair,
  Eye,
  GitBranch,
  Lock,
  Maximize2,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
  Search,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useShallow } from 'zustand/react/shallow'
import { REGION_DB_MAP } from '../../../data/gameDb'
import { QUEST_MAP } from '../../../data/quests'
import { useGameStore } from '../../../store/useGameStore'
import type { InventoryStack, LearnedArtEntry, PlayerSectState } from '../../../types/game'
import type { QuestRuntimeState, QuestTargetLocationHint } from '../../../types/quest'

type TreeFactionKey = 'changshan' | 'baji' | 'kaifeng' | 'jinjun' | 'side'
type FactionFilterKey = 'all' | TreeFactionKey
type MutexGroupKey = 'daming_ending' | 'palace_decree_choice' | 'hebei_spy_ending'
type FocusNodeStatus = 'completed' | 'active' | 'available' | 'blocked' | 'locked'

interface FocusTreeNode {
  id: string
  col: number
  row: number
  faction: TreeFactionKey
  factionLabel: string
  kind: string
  code: string
  title: string
  subtitle: string
  icon: string
  mutexGroup?: MutexGroupKey
  questId?: string
  targetLocation?: QuestTargetLocationHint
  prereqs: string[]
  steps: string[]
  rewards: string[]
  warning?: string
}

interface FocusTreeEdge {
  from: string
  to: string
  type: 'solid' | 'dashed'
}

interface MutexBridgeDef {
  left: string
  right: string
  label: string
}

interface TierBandDef {
  id: string
  title: string
  subtitle: string
  topRow: number
  bottomRow: number
}

// Canvas geometry constants (collision-free 8-column × 14-row grid)
const NODE_W = 216
const NODE_H = 92
const COL_STEP = 244
const ROW_STEP = 146
const PAD_X = 40
const PAD_Y = 48
const CANVAS_W = 2030
const CANVAS_H = 2140

const colX = (col: number) => PAD_X + col * COL_STEP
const rowY = (row: number) => PAD_Y + row * ROW_STEP

const FACTION_META: Record<
  TreeFactionKey,
  {
    shortLabel: string
    barBg: string
    sealBg: string
    sealText: string
    chipCls: string
  }
> = {
  changshan: {
    shortLabel: '常山枪派',
    barBg: 'bg-gradient-to-r from-[#2c5e7a] to-[#4682a3]',
    sealBg: 'bg-[#2c5e7a]',
    sealText: 'text-[#eef7fc]',
    chipCls: 'bg-[#2c5e7a] border-[#2c5e7a] text-[#fff8ee]',
  },
  baji: {
    shortLabel: '沧州八极门',
    barBg: 'bg-gradient-to-r from-[#8f4f1d] to-[#b56a2c]',
    sealBg: 'bg-[#8f4f1d]',
    sealText: 'text-[#fff3e2]',
    chipCls: 'bg-[#8f4f1d] border-[#8f4f1d] text-[#fff8ee]',
  },
  kaifeng: {
    shortLabel: '开封府·六扇门',
    barBg: 'bg-gradient-to-r from-[#781710] to-[#a6261d]',
    sealBg: 'bg-[#781710]',
    sealText: 'text-[#fff5eb]',
    chipCls: 'bg-[#781710] border-[#781710] text-[#fff8ee]',
  },
  jinjun: {
    shortLabel: '大宋禁军',
    barBg: 'bg-gradient-to-r from-[#7a5612] to-[#b38222]',
    sealBg: 'bg-[#7a5612]',
    sealText: 'text-[#fff8e1]',
    chipCls: 'bg-[#7a5612] border-[#7a5612] text-[#fff8ee]',
  },
  side: {
    shortLabel: '奇遇与绿林',
    barBg: 'bg-gradient-to-r from-[#3f594a] to-[#567865]',
    sealBg: 'bg-[#3f594a]',
    sealText: 'text-[#edf7f1]',
    chipCls: 'bg-[#3f594a] border-[#3f594a] text-[#fff8ee]',
  },
}

const TIER_BANDS: ReadonlyArray<TierBandDef> = [
  {
    id: 'tier_1',
    title: '第一阶 · 河朔二流双脉（常山枪派 SECT-22 & 沧州八极门 SECT-23）',
    subtitle: '白身从军 / 查拳引荐 / 大名府《铁锁镇河朔》奇案 ── 凝聚公门保举信物',
    topRow: 0,
    bottomRow: 3,
  },
  {
    id: 'tier_2',
    title: '第二阶 · 京畿公门枢机（开封府 / 六扇门 SECT-17 · Lv.1 役卒巡捕 → Lv.4 御前护卫）',
    subtitle: '半年海捕考绩 · 姑苏燕子坞两探慕容 · 华北太行宿怨 · 汴梁夜雨三战血护宋仁宗',
    topRow: 4,
    bottomRow: 8,
  },
  {
    id: 'tier_3',
    title: '第三阶 · 紫宸双恩分流 & 天子亲军（大宋禁军 SECT-33 · 四厢都指挥 → 三衙都虞候）',
    subtitle: '左翼：鎏金虎符勘破河北暗桩（双天阶终局） ｜ 右翼：三征太行山雪耻封侯（苦读武经破连营）',
    topRow: 9,
    bottomRow: 13,
  },
]

const FOCUS_NODES: ReadonlyArray<FocusTreeNode> = [
  // ---------------- TIER 1: 常山枪派 & 沧州八极门 (Rows 0 - 3) ----------------
  {
    id: 'cs_join',
    col: 0,
    row: 0,
    faction: 'changshan',
    factionLabel: '常山枪派 · SECT-22',
    kind: '入门起点',
    code: 'SECT-22 · Lv.1',
    title: '投军入伍 · 枪堂外门',
    subtitle: '免束脩从军 · 月领边饷 15 两',
    icon: '枪',
    targetLocation: {
      regionId: 'zhending',
      buildingId: 'zd_spear',
      customLabel: '真定府 · 常山演武堂',
    },
    prereqs: [
      '当前无门无派（自由游侠）',
      '清白之身：未列【大宋朝廷海捕黑名单】',
      '未背负【通辽嫌疑】恶名',
    ],
    steps: [
      '前往【真定府 · 常山演武堂】直接参军入伍，免收拜师束脩银两',
      '可向掌门赵括苍请领日常宗门差遣（代师送信 / 探听情报 / 武艺教学，好感 +10）',
    ],
    rewards: [
      '授常山枪派 Lv.1【枪堂外门】，按月支放军饷 15 两（随阶位升至 30/50/75/110 两）',
      '解锁外门枪棒功法传授与军需商铺',
    ],
    warning:
      '私自退派将背负【通辽嫌疑】恶名（大宋全阵营 NPC 好感 -30，常山与开封府永不录用）！须凭推荐信合法奉调转任。',
  },
  {
    id: 'cs_spy_duty',
    col: 2,
    row: 0,
    faction: 'changshan',
    factionLabel: '常山枪派 · 军纪制度',
    kind: '半年军令',
    code: '每年 2月1日 / 8月1日',
    title: '燕云锄奸 · 半年军令',
    subtitle: '限期 60 日北上诛杀辽谍',
    icon: '令',
    targetLocation: {
      regionId: 'xijin',
      customLabel: '析津府 · 燕云密谍潜伏处',
    },
    prereqs: ['身属【常山枪派 (SECT-22)】期间每半年自动派发'],
    steps: [
      '每年二月初一、八月初一自动生成一名潜伏于【析津府 / 大定府】酒肆客栈武馆的辽国密谍（三流中品 ~ 二流中品）',
      '须于 60 日限期内赶赴燕云寻获并当场生死对决诛除',
    ],
    rewards: ['完成实战历练、保住边军军籍与掌门信任'],
    warning:
      '逾 60 日未完成：任务自动撤销且掌门赵括苍好感 -15；累计 2 次失期直接按军纪除名开除！',
  },
  {
    id: 'cq_join',
    col: 4,
    row: 0,
    faction: 'baji',
    factionLabel: '齐鲁查拳馆 · SECT-25',
    kind: '三流跳板',
    code: 'SECT-25 · Lv.1→Lv.2',
    title: '拜入齐鲁查拳馆',
    subtitle: '束脩 20 两 · 升内堂武师',
    icon: '拳',
    targetLocation: {
      regionId: 'jinan',
      buildingId: 'jn_chaquan',
      customLabel: '济南府 · 齐鲁查拳总馆',
    },
    prereqs: ['当前无门无派', '随身纹银 ≥ 20 两（拜师束脩）'],
    steps: [
      '前往【济南府 · 齐鲁查拳总馆】奉银 20 两入门',
      '修至境界【三流中品】+ 在派满 60 日 + 总馆主好感度 ≥ 20，晋升 Lv.2【内堂武师】',
    ],
    rewards: ['解锁向本馆 Lv.4 金牌总教头暗通关节求取《齐鲁查拳馆举荐帖》的资格'],
  },
  {
    id: 'dm_case_start',
    col: 6,
    row: 0,
    faction: 'baji',
    factionLabel: '大名府 · 皇祐风云',
    kind: '奇案起点',
    code: 'QST-CITY-DAMING-BAJI',
    title: '铁锁镇河朔 · 临津问冤',
    subtitle: '七日限期 · 三线勘查断索案',
    icon: '案',
    questId: 'QST-CITY-DAMING-BAJI',
    targetLocation: {
      regionId: 'daming',
      buildingId: 'daming_base_tavern',
      customLabel: '大名府 · 黄河北岸临津酒楼',
    },
    prereqs: [
      '建议境界：【二流中品】（校场看破破绽则三流上品亦可一战）',
      '前往【大名府 · 黄河北岸临津酒楼】或【沧州八极分馆】即可触发',
    ],
    steps: [
      '讲武堂寻金牌教头卢婉月问明真传教习崔帆坤沉铁冤案',
      '7 日限期内三线搜证（满 2 条即可呈堂，3 条俱全有额外厚赏）：① 黄河渡口验半月霜纹断口；② 留守司衙核黄册揭周文焕私卖生铁；③ 烽旗望楼访丐帮陈孤雁探知防辽沙盘图谋',
    ],
    rewards: ['集齐铁证推进至北京留守行宫面谒前宰相【贾昌朝】'],
    warning: '接案后须在 7 日内呈交至少两条线索，逾限则崔帆坤含冤刺配登州、奇案失败结案！',
  },

  // Row 1
  {
    id: 'cs_rank2',
    col: 0,
    row: 1,
    faction: 'changshan',
    factionLabel: '常山枪派 · SECT-22',
    kind: '职阶晋升',
    code: 'SECT-22 · Lv.2',
    title: '晋升内堂枪士 (Lv.2)',
    subtitle: '修习梨花枪 / 六合枪 ≥ 3 重',
    icon: '阶',
    targetLocation: {
      regionId: 'zhending',
      buildingId: 'zd_spear',
      customLabel: '真定府 · 常山演武堂',
    },
    prereqs: [
      '前置节点：投军入伍 · 枪堂外门',
      '武学境界 ≥【三流中品】',
      '在派天数 ≥ 60 日 & 掌门赵括苍好感度 ≥ 20',
    ],
    steps: [
      '在常山演武堂申请晋升第 2 阶【内堂枪士】',
      '将《杨氏梨花枪》(MA-174) 或《六合大枪》(MA-116) 任意一门修至 ≥ 第 3 重',
    ],
    rewards: [
      '月度军饷提升至 30 两/月',
      '满足常山镇派长卷《白沟寒星 · 幽州无名卷》全部开启条件！',
    ],
  },
  {
    id: 'cs_rank3',
    col: 1,
    row: 1,
    faction: 'changshan',
    factionLabel: '常山枪派 · SECT-22',
    kind: '职阶晋升',
    code: 'SECT-22 · Lv.3',
    title: '晋升演武教习 (Lv.3)',
    subtitle: '边军宿校 · 解锁开封推荐资格',
    icon: '校',
    targetLocation: {
      regionId: 'zhending',
      buildingId: 'zd_spear',
      customLabel: '真定府 · 常山演武堂',
    },
    prereqs: [
      '前置节点：晋升内堂枪士 (Lv.2)',
      '武学境界 ≥【二流下品】',
      '在派天数 ≥ 365 日 & 掌门赵括苍好感度 ≥ 50',
    ],
    steps: ['通过日常差遣与半年锄奸累积资历好感，升任第 3 阶【演武教习】'],
    rewards: [
      '月度军饷提升至 50 两/月，解锁高阶门派枪法权限（与 Lv.4 同享武学传授权限）',
      '解锁向掌门/首座申领《开封府推荐信》权限',
    ],
  },
  {
    id: 'baji_referral',
    col: 4,
    row: 1,
    faction: 'baji',
    factionLabel: '沧州八极门 · 入门线①',
    kind: '引荐任务',
    code: 'QST-SECT-23-REFERRAL',
    title: '武林同气 · 八极引荐帖',
    subtitle: '贿银 20 两求取同道保举',
    icon: '帖',
    questId: 'QST-SECT-23-REFERRAL',
    targetLocation: {
      regionId: 'jinan',
      buildingId: 'jn_chaquan',
      customLabel: '济南府 · 齐鲁查拳总馆',
    },
    prereqs: [
      '前置节点：齐鲁查拳馆晋升至 Lv.2【内堂武师】',
      '随身纹银 ≥ 20 两（茶敬贿银）',
    ],
    steps: [
      '在济南府齐鲁查拳总馆寻 Lv.4【金牌总教头】暗奉 20 两纹银',
      '取得信物《齐鲁查拳馆举荐帖》(ITM-MSC-004) 后脱离查拳馆',
    ],
    rewards: ['获得《齐鲁查拳馆举荐帖》(ITM-MSC-004)，可合法拜入沧州八极门外院'],
  },
  {
    id: 'dm_leitai_sandtable',
    col: 6,
    row: 1,
    faction: 'baji',
    factionLabel: '大名府 · 皇祐风云',
    kind: '核心战役',
    code: '铁锁镇河朔 · 二/三幕',
    title: '八角试金 · 子夜沙盘捉辽',
    subtitle: '校场破乌古乃 · 行宫擒耶律裂山',
    icon: '战',
    questId: 'QST-CITY-DAMING-BAJI',
    targetLocation: {
      regionId: 'daming',
      buildingId: 'dm_baji',
      customLabel: '大名府 · 沧州八极门武场',
    },
    prereqs: ['前置节点：铁锁镇河朔 · 临津问冤（7 日内呈禀 ≥ 2 条铁证）'],
    steps: [
      '崇政殿谒贾昌朝定明贬暗钓计，赴河北枪棒大校场八角擂台连战太行刺头焦三斧、契丹先锋【乌古乃】（可看穿其换气旧伤破绽）',
      '于戌/亥/子/丑夜潜入北京留守行宫【防辽舆图沙盘阁】，合围内鬼周文焕与铁林千夫长【耶律裂山】',
    ],
    rewards: ['洗刷沧州八极门沉铁奇冤，开启终幕三途互斥结局抉择！'],
  },

  // Row 2
  {
    id: 'cs_longling_1',
    col: 0,
    row: 2,
    faction: 'changshan',
    factionLabel: '常山枪派 · 传承长卷',
    kind: '师门要务',
    code: 'QST_SECT22_LONGLING (上)',
    title: '白沟寒星 · 潜燕焚图',
    subtitle: '乔装入析津 · 死守萧远风四合',
    icon: '燕',
    questId: 'QST_SECT22_LONGLING',
    targetLocation: {
      regionId: 'zhending',
      buildingId: 'zd_spear',
      spotId: 'zd_sp_hall',
      customLabel: '真定府 · 常山龙胆枪脉宗祠正堂',
    },
    prereqs: [
      '身在【常山枪派】且阶位 ≥ Lv.2【内堂枪士】',
      '习得《杨氏梨花枪》或《六合大枪》≥ 第 3 重',
      '建议境界：【二流上品】',
    ],
    steps: [
      '宗祠验悯忠寺血书铜牌，真定府衙密见安抚使【韩琦】，随都监【郭逵】乔装马商北渡拒马河',
      '析津府榷马大市应付盘查 → 悯忠寺取《南牧山川策》副本（可先赴义勇拳馆取《夜禁换防图》）',
      '潜入【辽南京兵马元帅府】焚毁正本（无换防图则检定经义/书 ≥ 45），在武林统制【萧远风】枪下死守 4 回合借烟幕突围！',
    ],
    rewards: ['武学熟练度 +1,200~1,700，战斗经验 +60，携《南牧山川策》副本西撤雁门关'],
    warning: '元帅府突围战为强制生死战（不可逃跑，未撑满 4 回合当场殉国）！',
  },
  {
    id: 'cs_kf_letter1',
    col: 1,
    row: 2,
    faction: 'changshan',
    factionLabel: '常山枪派 · 奉调信物',
    kind: '公门保举',
    code: 'ITM-MSC-006',
    title: '申领《开封府推荐信》',
    subtitle: '常山 Lv.3 正当调任公门凭证',
    icon: '信',
    targetLocation: {
      regionId: 'zhending',
      buildingId: 'zd_spear',
      customLabel: '真定府 · 常山演武堂',
    },
    prereqs: ['前置节点：晋升常山枪派 Lv.3【演武教习】', '尚未领取过该推荐信'],
    steps: ['向掌门赵括苍或首座请领河北都部署签发的《开封府推荐信》'],
    rewards: [
      '获得《开封府推荐信》(ITM-MSC-006)',
      '可凭信直接从常山枪派奉调转入【开封府 / 六扇门 Lv.1 役卒巡捕】，免受退派通辽惩罚！',
    ],
  },
  {
    id: 'baji_join_lv1',
    col: 3,
    row: 2,
    faction: 'baji',
    factionLabel: '沧州八极门 · SECT-23',
    kind: '门派养成',
    code: 'SECT-23 · Lv.1→Lv.4',
    title: '持帖拜入沧州八极门',
    subtitle: '习八极崩山拳枪 · 历练升总教头',
    icon: '八',
    targetLocation: {
      regionId: 'daming',
      buildingId: 'dm_baji',
      customLabel: '大名府 · 沧州八极门武场',
    },
    prereqs: ['前置节点：持有《齐鲁查拳馆举荐帖》(ITM-MSC-004)，且已脱离原武馆'],
    steps: [
      '赴【大名府 · 沧州八极门武场】呈帖拜入 Lv.1【外院学徒】',
      '向总馆主【卢铁山】请领日常差遣，按境界（三流中/二流下/二流上）+ 在派（60/365/730日）+ 好感（20/50/80）升至 Lv.4【金牌总教头】',
    ],
    rewards: [
      '修习八极门刚猛拳法与六合枪术；若同时勘破《铁锁镇河朔》选结局 A 获《北京留守举荐信》，可合法奉调开封府 Lv.2！',
    ],
  },
  {
    id: 'dm_end_a',
    col: 5,
    row: 2,
    faction: 'baji',
    factionLabel: '铁锁镇河朔 · 结局 A',
    kind: '互斥抉择',
    code: 'ITM-MSC-007 · 忠义入幕',
    title: '忠义入幕 · 留守举荐信',
    subtitle: '贾昌朝亲签 · 直授开封府 Lv.2',
    icon: '幕',
    mutexGroup: 'daming_ending',
    questId: 'QST-CITY-DAMING-BAJI',
    prereqs: [
      '前置节点：八角试金 · 子夜沙盘捉辽',
      '与【铁锁横江·八极真传】【夺银盗图·夜遁黄河】三选一互斥',
    ],
    steps: ['于沙盘阁破案后选择「忠义入幕 · 河朔干城」，志在公门靖平天下'],
    rewards: [
      '获颁《北京留守幕府举荐信》(ITM-MSC-007)（赴开封府直授 Lv.2 捕头都头；八极门弟子凭此信亦可奉调转入！）',
      '破案赏银 +100 两、十艺【策论】+3',
    ],
  },
  {
    id: 'dm_end_b',
    col: 6,
    row: 2,
    faction: 'baji',
    factionLabel: '铁锁镇河朔 · 结局 B',
    kind: '互斥抉择',
    code: 'MA-116 · 八极真传',
    title: '铁锁横江 · 八极授真传',
    subtitle: '直入八极内堂 Lv.2 · 授六合大枪',
    icon: '传',
    mutexGroup: 'daming_ending',
    questId: 'QST-CITY-DAMING-BAJI',
    prereqs: [
      '前置节点：八角试金 · 子夜沙盘捉辽',
      '与【忠义入幕·留守举荐信】【夺银盗图·夜遁黄河】三选一互斥',
    ],
    steps: ['婉谢贾留守官身，入沧州八极分馆【千斤铁锁秘传室】受总馆主卢铁山传艺'],
    rewards: [
      '亲授《六合大枪》(MA-116 · 第2重) + 良阶上品【大名六合浑铁枪】(WPN-035) + 纹银 50 两 + 声望/侠义 +80',
      '无门派者破格直入【沧州八极门 Lv.2 内堂武师】；已在八极门者功绩 +200；他派弟子获《八极铁锁令》(ITM-MSC-008)',
    ],
  },
  {
    id: 'dm_end_c',
    col: 7,
    row: 2,
    faction: 'side',
    factionLabel: '铁锁镇河朔 · 结局 C',
    kind: '互斥抉择',
    code: '邪线 · 朝廷通缉',
    title: '夺银盗图 · 夜遁黄河',
    subtitle: '黑吃黑劫银 180 两 · 上黑名单',
    icon: '盗',
    mutexGroup: 'daming_ending',
    questId: 'QST-CITY-DAMING-BAJI',
    prereqs: ['前置节点：八角试金 · 子夜沙盘捉辽', '与结局 A、结局 B 互斥'],
    steps: ['趁沙盘阁混战夺取赃银与防辽残图，破窗夜遁黄河'],
    rewards: ['劫获纹银 +180 两、《河北防辽舆图残卷》'],
    warning:
      '永久列入【大宋朝廷海捕黑名单】！无法加入常山枪派/开封府，且踏入东京开封府即遭展昭生死缉拿！',
  },

  // Row 3
  {
    id: 'cs_longling_2',
    col: 0,
    row: 3,
    faction: 'changshan',
    factionLabel: '常山枪派 · 传承收官',
    kind: '师门要务',
    code: 'QST_SECT22_LONGLING (下)',
    title: '雁门死战 · 龙胆传薪',
    subtitle: '授《常山龙胆枪》与联合举荐信',
    icon: '龙',
    questId: 'QST_SECT22_LONGLING',
    prereqs: ['前置节点：白沟寒星 · 潜燕焚图'],
    steps: [
      '雁门关外乱石绝壁双路线抉择：路线 A 斩铁林百夫长保图突围（侠义+50）；路线 B 独撑半血萧远风 4 合护百名燕云遗老入关（侠义+100）',
      '返真定隆兴大佛寺观音阁面韩琦焚毁行动名录，归常山宗祠赵云牌位前受谱',
    ],
    rewards: [
      '传授镇派绝学《常山龙胆枪》(MA-074) + 名器【亮银枪】(WPN-014) + 熟练度 +3,500 + 战斗经验 +180',
      '获韩琦与赵括苍联署《常山·定州联合举荐信》(ITM-MSC-013)：可直入【开封府 Lv.2 捕头都头】或转投【五台山清凉寺】！',
    ],
  },
  {
    id: 'tianbo_bawang',
    col: 2,
    row: 3,
    faction: 'side',
    factionLabel: '枪脉联动 · 皇祐风云',
    kind: '皇祐风云',
    code: 'QST_TIANBO_BAWANG',
    title: '天波忠魂 · 霸王枪出',
    subtitle: '三州试炼会狄青 · 授杨家霸王枪',
    icon: '霸',
    questId: 'QST_TIANBO_BAWANG',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bianliang_base_dojo',
      customLabel: '开封府 · 西坊演武拳馆（杨排风）',
    },
    prereqs: [
      '常山/八极枪法自然延伸：《六合大枪》或《杨氏梨花枪》≥ 第 6 重',
      '侠义 ≥ 120、气血 ≥ 2,800、骑术 ≥ 65、非一品堂且无通辽（终章授谱需根骨 ≥ 82、气血 ≥ 3,200、骑术 ≥ 80）',
    ],
    steps: [
      '开封西坊武馆接杨排风三十六路烧火棍 → 太原天波旧祠谒杨文广',
      '并行完成太原捉谍胜呼延庆、五台山破禅演棍、雁门关血战三试炼 → 延安鄜延大营偕狄青破西夏铁鹞子 → 宗祠十合考校',
    ],
    rewards: ['承接天阶下品绝学《杨家霸王枪》(MA-037)！'],
  },
  {
    id: 'wutai_transfer',
    col: 4,
    row: 3,
    faction: 'side',
    factionLabel: '五台山清凉寺 · 联动旁支',
    kind: '跨派剃度',
    code: 'QST-SECT-03-ENTRY',
    title: '带功剃度 · 清凉残雪',
    subtitle: '持常山联合荐信削发入五台山',
    icon: '禅',
    questId: 'QST-SECT-03-ENTRY',
    targetLocation: {
      regionId: 'wutaishan',
      buildingId: 'wt_main',
      spotId: 'wt_main_main',
      customLabel: '五台山清凉寺 · 大雄主殿',
    },
    prereqs: ['常山枪派弟子持有《常山·定州联合举荐信》(ITM-MSC-013)（白身亦可直接叩门）'],
    steps: [
      '赴五台山清凉寺大雄主殿向知客首座智猛呈验联合荐信（声望额外 +8），历二十幕护孤、试棍与雁门破辽探',
    ],
    rewards: [
      '合法脱离常山枪派剃度入【五台山清凉寺】，赐「明」字辈法号，亲授《五郎八卦棍》与《清凉禅定吐纳法》',
    ],
  },
  {
    id: 'taihang_touming',
    col: 7,
    row: 3,
    faction: 'side',
    factionLabel: '太行绿林盟 · 官府死敌线',
    kind: '绿林投名状',
    code: 'QST-SECT-18-TOUMINGZHUANG',
    title: '太行聚义 · 纳投名状',
    subtitle: '劫杀大宋命官 · 列海捕黑名单',
    icon: '匪',
    questId: 'QST-SECT-18-TOUMINGZHUANG',
    targetLocation: {
      regionId: 'taihang',
      buildingId: 'th_hall',
      customLabel: '太行山 · 聚义总寨',
    },
    prereqs: ['无门无派，赴太行山聚义总寨请领「纳投名状」试炼'],
    steps: [
      '寻任意大宋朝廷官员（文臣/边帅/六扇门/禁军，皇室除外）发起【劫道纳投名状】生死战并获胜',
    ],
    rewards: ['夺得官银 60 两，获准拜入【太行/京东绿林盟 (SECT-18)】'],
    warning:
      '与公门路线彻底决裂！列入朝廷海捕黑名单，踏入开封府必遭展昭拦街问斩（亦是日后禁军三征太行的宿敌势力）。',
  },

  // ---------------- TIER 2: 开封府 / 六扇门 (Rows 4 - 8) ----------------
  {
    id: 'kf_join_lv1',
    col: 1,
    row: 4,
    faction: 'kaifeng',
    factionLabel: '开封府 / 六扇门 · SECT-17',
    kind: '公门入职',
    code: 'SECT-17 · Lv.1',
    title: '奉调入府 · 役卒巡捕',
    subtitle: '持《开封府推荐信》授 Lv.1',
    icon: '捕',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      customLabel: '开封府 · 开封府衙（六扇门）',
    },
    prereqs: [
      '持有常山枪派 Lv.3 颁发的《开封府推荐信》(ITM-MSC-006)',
      '无朝廷黑名单、无【通辽嫌疑】（常山弟子可直接奉调转入）',
    ],
    steps: ['前往【开封府 · 开封府衙】呈交推荐公函正式入职第 1 阶【役卒巡捕】'],
    rewards: ['月度官俸 30 两/月，配发六扇门腰牌皂衣，开启六扇门情报侦查案卷权限'],
  },
  {
    id: 'kf_join_lv2',
    col: 3,
    row: 4,
    faction: 'kaifeng',
    factionLabel: '开封府 / 六扇门 · SECT-17',
    kind: '破格入职',
    code: 'SECT-17 · 直授 Lv.2',
    title: '破格直授 · 捕头都头',
    subtitle: '持联合举荐信 / 北京留守举荐信',
    icon: '都',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      customLabel: '开封府 · 开封府衙（六扇门）',
    },
    prereqs: [
      '持有《常山·定州联合举荐信》(ITM-MSC-013) 或大名府《北京留守幕府举荐信》(ITM-MSC-007)',
      '无朝廷黑名单、无【通辽嫌疑】（常山枪派 / 沧州八极门弟子均可直接奉调入职！）',
    ],
    steps: [
      '赴【开封府衙】呈交高规格举荐信，跳过役卒阶段直接授任第 2 阶【捕头都头】，并当日起算 Lv.2 任期天数！',
    ],
    rewards: ['直授开封府 Lv.2【捕头都头】（月俸 50 两/月），节省 Lv.1 升迁时间'],
  },
  {
    id: 'kf_warrant_sys',
    col: 5,
    row: 4,
    faction: 'kaifeng',
    factionLabel: '开封府 / 六扇门 · 办案制度',
    kind: '制度案卷',
    code: '主动领案 + 半年钦限案',
    title: '六扇门海捕与半年公案',
    subtitle: '积攒晋升办案量 · 逾限重罚',
    icon: '牍',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      customLabel: '开封府 · 开封府衙（六扇门）',
    },
    prereqs: ['身居【开封府 / 六扇门】Lv.1 ~ Lv.3（升至 Lv.4 后免派常规案件）'],
    steps: [
      '【主动领案】随时在府衙领取（可退回重领）；【半年钦限案】每年 2月1日、8月1日自动派发，限期 60 日且不可退回',
      'Lv.1 办【民间线索调查】（赏 15 两）；Lv.2 缉拿【三流中~二流下要犯】；Lv.3 缉拿【二流下~二流上大寇】',
    ],
    rewards: [
      '每结一案累计当前阶位【办案量 +1】（晋升下一阶的核心硬指标，每次晋升后清零重计）',
    ],
    warning:
      '半年钦限案逾 60 日未结：罚没整整两年官俸（24个月俸银）；累计 2 次失职直接革职开除！',
  },
  {
    id: 'kf_zhanzhao_arrest',
    col: 7,
    row: 4,
    faction: 'kaifeng',
    factionLabel: '开封府 · 铁面法度',
    kind: '通缉拦截',
    code: 'NPC-0140 · 御猫展昭',
    title: '天街剑影 · 南侠缉凶',
    subtitle: '黑名单踏入汴梁强制生死战',
    icon: '铡',
    targetLocation: {
      regionId: 'bianliang',
      customLabel: '东京开封府 · 御街天街',
    },
    prereqs: [
      '身负【大宋朝廷黑名单】（由《太行纳投名状》或大名府《夺银盗图》触发）',
      '踏入或途经【开封府（东京汴梁）】即刻强制触发',
    ],
    steps: ['御前四品带刀护卫「南侠」展昭（一流高手）持巨阙剑封锁天街，不可逃跑！'],
    rewards: [
      '若侥幸战胜可杀出重围（黑名单仍在，再入仍遭缉拿）；战败则押赴开封府狗头铡问斩（游戏结束）！',
    ],
  },

  // Row 5
  {
    id: 'kf_promo_lv2',
    col: 1,
    row: 5,
    faction: 'kaifeng',
    factionLabel: '开封府 / 六扇门 · SECT-17',
    kind: '职阶晋升',
    code: 'Lv.1 ──► Lv.2',
    title: '考绩升迁 · 捕头都头',
    subtitle: '三流上品 + 调查办案满 2 次',
    icon: '升',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      customLabel: '开封府 · 开封府衙（六扇门）',
    },
    prereqs: [
      '前置节点：奉调入府 · 役卒巡捕 (Lv.1)',
      '武学境界 ≥【三流上品】',
      'Lv.1 期间累计完成六扇门调查案卷 ≥ 2 次',
    ],
    steps: ['于门派面板申请晋升第 2 阶【捕头都头】（办案累计数清零，开始计算 Lv.2 任期天数）'],
    rewards: ['月俸升至 50 两/月，案卷升级为海捕缉拿要犯，汇入 Lv.2 主干线'],
  },
  {
    id: 'adv_yanziwu_map',
    col: 4,
    row: 5,
    faction: 'side',
    factionLabel: '江南奇遇 · 必做前置',
    kind: '江湖奇遇',
    code: 'QST-ADV-YANZIWU-MAP',
    title: '烟波三叠 · 燕子坞水图',
    subtitle: '破铁掌帮暗舵 · 绘太湖秘径图',
    icon: '图',
    questId: 'QST-ADV-YANZIWU-MAP',
    targetLocation: {
      regionId: 'suzhou',
      buildingId: 'sz_taihu',
      spotId: 'sz_th_pier',
      customLabel: '苏州府 · 太湖烟波渡口',
    },
    prereqs: ['建议境界：【二流中品】（无门派限制，建议在开封府 Lv.2 任期两年内南下顺路完成）'],
    steps: [
      '苏州虎丘救沈氏书生败沙九江 → 扬州盐帮演武院败盛黑风夺漕渠卷 → 江宁石头城试剑台败堂主焦沧澜',
    ],
    rewards: [
      '合绘取得《太湖燕子坞烟波水路舆图》—— 六扇门两次潜入姑苏燕子坞的必备渡船凭证！',
    ],
  },

  // Row 6
  {
    id: 'kf_murong_1',
    col: 3,
    row: 6,
    faction: 'kaifeng',
    factionLabel: '开封府 · 一阶晋升长卷',
    kind: '师门要务',
    code: 'QST-SECT-17-MURONG-1',
    title: '燕子坞暗影 · 姑苏密查',
    subtitle: '连破包风二将 · 参合十合逃生',
    icon: '燕',
    questId: 'QST-SECT-17-MURONG-1',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_liushan',
      customLabel: '开封府衙 · 六扇门捕快演武院',
    },
    prereqs: [
      '身居开封府 Lv.2【捕头都头】且任捕头都头满 730 日（整两年）',
      '入燕子坞须已完成《烟波三叠 · 燕子坞水图》',
      '建议境界：【二流巅峰】（需在一流中品邓百川手下撑 10 合）',
    ],
    steps: [
      '六扇门演武院领命微服南下 → 苏州枫桥寒山寺古钟楼截获兵甲密信',
      '太湖烟波渡口败包不同夺木牌 → 曼陀山茶幽径败风波恶 → 参合庄秘档室抄录密账并在【邓百川】掌下死守 10 回合脱身 → 返开封呈密卷',
    ],
    rewards: ['查明姑苏慕容氏私囤兵甲暗流，达成【Lv.3 金牌总捕】剧情考核条件！'],
  },
  {
    id: 'kf_promo_lv3',
    col: 5,
    row: 6,
    faction: 'kaifeng',
    factionLabel: '开封府 / 六扇门 · SECT-17',
    kind: '职阶晋升',
    code: 'Lv.2 ──► Lv.3',
    title: '晋升金牌总捕 (Lv.3)',
    subtitle: '任满 730 日 + 办案 5 次 + 密查结案',
    icon: '金',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      customLabel: '开封府 · 开封府衙（六扇门）',
    },
    prereqs: [
      '捕头都头（Lv.2）在任满 730 日',
      'Lv.2 期间累计办案量 ≥ 5 次',
      '已完成晋升任务《燕子坞暗影 · 姑苏密查》',
    ],
    steps: ['晋升为开封府第 3 阶【金牌总捕】（办案计数清零，解锁高阶公门武学权限）'],
    rewards: ['月俸提升至 80 两/月，解锁《参合剑气 · 姑苏对质》与华北《太行劫匪》奇遇'],
  },

  // Row 7
  {
    id: 'kf_taihang_bandit',
    col: 2,
    row: 7,
    faction: 'kaifeng',
    factionLabel: '开封府 · 华北奇遇长卷',
    kind: '伏笔长卷',
    code: 'QST-SECT-17-TAIHANG-BANDIT',
    title: '太行劫匪 · 华北风云',
    subtitle: '斩雷震山 · 遭王重岳史万山围杀',
    icon: '险',
    questId: 'QST-SECT-17-TAIHANG-BANDIT',
    targetLocation: {
      regionId: 'taihang',
      customLabel: '华北官道 · 太行山麓',
    },
    prereqs: [
      '身居开封府 Lv.3【金牌总捕】及以上',
      '在华北官道（汴洛/大名/真定/太原/济南/太行）赶路时概率触发（全 25 幕）',
    ],
    steps: [
      '荒驿生擒太行二流上品悍匪【雷震山】押返开封府会审，5 日后市曹问斩',
      '冷却 30 日后再行华北官道，遭太行天王【王重岳】+ 九纹狂龙【史万山】1v2 寻仇截杀，须死守 5 回合坠涧逃生，返衙竹院养伤一月',
    ],
    rewards: ['结下太行山宿怨伏笔（日后转任大宋禁军统兵三征太行时将亲手清算双凶！）'],
    warning: '王重岳与史万山 1v2 截杀战若未撑满 5 回合，将被押回太行总寨斩首！',
  },
  {
    id: 'kf_murong_2',
    col: 4,
    row: 7,
    faction: 'kaifeng',
    factionLabel: '开封府 · 二阶晋升长卷',
    kind: '师门要务',
    code: 'QST-SECT-17-MURONG-2',
    title: '参合剑气 · 姑苏对质',
    subtitle: '连破公冶邓百川 · 十合战慕容复',
    icon: '剑',
    questId: 'QST-SECT-17-MURONG-2',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_liushan',
      customLabel: '开封府衙 · 六扇门捕快演武院',
    },
    prereqs: [
      '身居开封府 Lv.3【金牌总捕】且已完成《燕子坞暗影 · 姑苏密查》',
      '持有《太湖燕子坞烟波水路舆图》 · 建议境界：【一流中品及以上】',
    ],
    steps: [
      '汴梁四步：相国雅市查燕史 → 六扇演武听展昭析斗转星移 → 樊楼屋脊擒契丹密使 → 升堂正殿奉紫宸密旨南巡',
      '姑苏五战：夜探虎丘铁甲窟 → 寒山诗轩火中夺盐铁账 → 太湖渡口败【公冶乾】→ 参合庄演武坪败【邓百川】→ 还施水阁当面质问【慕容复】并撑满 10 回合立约收手',
    ],
    rewards: [
      '封存太湖私甲北返复命：赏银 +260 两、战斗经验 +600、声望 +80、侠义 +40，解锁 Lv.4 晋升资格！',
    ],
  },
  {
    id: 'kf_promo_lv4',
    col: 6,
    row: 7,
    faction: 'kaifeng',
    factionLabel: '开封府 / 六扇门 · SECT-17',
    kind: '职阶晋升',
    code: 'Lv.3 ──► Lv.4',
    title: '晋升御前护卫 (Lv.4)',
    subtitle: '办案 10 次 + 姑苏对质结案',
    icon: '御',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      customLabel: '开封府 · 开封府衙（六扇门）',
    },
    prereqs: [
      'Lv.3 金牌总捕期间累计办案量 ≥ 10 次',
      '已完成二阶晋升任务《参合剑气 · 姑苏对质》',
    ],
    steps: [
      '正式升任第 4 阶【御前护卫】（与南侠展昭同列御前带刀宿卫，从此免除半年常规派案！）',
    ],
    rewards: ['月俸升至 120 两/月，免派常规杂案，获出入紫宸殿面圣护驾资格'],
  },

  // Row 8
  {
    id: 'kf_renzong_escort',
    col: 4,
    row: 8,
    faction: 'kaifeng',
    factionLabel: '开封府 · 仕途转折枢机',
    kind: '护驾长卷',
    code: 'QST-SECT-17-RENZONG-ESCORT',
    title: '微服汴梁 · 血护龙颜',
    subtitle: '三连 1v2 破一品堂死士护仁宗',
    icon: '龙',
    questId: 'QST-SECT-17-RENZONG-ESCORT',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      customLabel: '开封府 · 大内皇宫 · 垂拱紫宸正殿',
    },
    prereqs: [
      '身居开封府 Lv.4【御前护卫】',
      '宋仁宗赵祯（NPC-0001）好感度 ≥ 20',
      '建议境界：【一流下品 ~ 一流上品】（含连续三轮 1v2 生死决战，全 38 幕）',
    ],
    steps: [
      '大内垂拱紫宸正殿领命，单人随微服“赵六郎”（宋仁宗）夜访大相国寺灯市撞破西夏暗桩',
      '连闯三环死局：① 资圣琉璃宝塔 1v2 破先遣双刺 → ② 樊楼飞桥雅阁点求援灯 1v2 破红牌血刺 → ③ 虹桥夜雨酒肆 1v2 死战银狼双统领，迎王德用、展昭接驾还朝',
    ],
    rewards: [
      '紫宸殿天子特旨双恩抉择：决定终老六扇门习大内秘典，还是奉敕执掌八十万禁军帅印！',
    ],
  },

  // ---------------- TIER 3: 紫宸双恩分流 & 大宋禁军 (Rows 9 - 13) ----------------
  {
    id: 'kf_stay_kuihua',
    col: 2,
    row: 9,
    faction: 'kaifeng',
    factionLabel: '血护龙颜 · 抉择乙（公门终局）',
    kind: '互斥抉择',
    code: 'ITM-MSC-025 · 葵花残卷',
    title: '留守公门 · 承大内密卷',
    subtitle: '留任开封府 Lv.4 · 领悟葵花残卷',
    icon: '葵',
    mutexGroup: 'palace_decree_choice',
    questId: 'QST-SECT-17-RENZONG-ESCORT',
    prereqs: [
      '前置节点：完成《微服汴梁 · 血护龙颜》三轮护驾血战',
      '与【改授禁军·四厢都指挥】二选一互斥（选此项将留在开封府，不入大宋禁军）',
    ],
    steps: ['于垂拱紫宸正殿奏请继续留守开封府辅佐包拯、展昭'],
    rewards: [
      '获赐【御赐《葵花残卷》秘匣】(ITM-MSC-025)，当场领悟绝学《葵花残卷（大内秘藏前本）》',
      '内库特赐纹银 +1,000 两',
    ],
  },
  {
    id: 'jj_join_lv3',
    col: 5,
    row: 9,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · SECT-33 唯一入口',
    kind: '互斥抉择',
    code: 'SECT-33 · 直授 Lv.3',
    title: '改授禁军 · 四厢都指挥',
    subtitle: '奉敕转任三衙亲军 · 赐御马龙骧骢',
    icon: '帅',
    mutexGroup: 'palace_decree_choice',
    questId: 'QST-SECT-17-RENZONG-ESCORT',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      customLabel: '开封府 · 八十万禁军大教场',
    },
    prereqs: [
      '前置节点：完成《微服汴梁 · 血护龙颜》三轮护驾血战',
      '与【留守公门·承大内密卷】二选一互斥（进入大宋禁军的唯一合法途径！）',
    ],
    steps: ['奉宋仁宗圣旨改换武职，由开封府正式调入【大宋禁军】直授第 3 阶【四厢都指挥】'],
    rewards: [
      '入职大宋禁军 Lv.3【四厢都指挥】（月俸 180 两/月），获赐名驹【玉津园御赐龙骧骢】(MNT-004) + 纹银 1,000 两',
      '解锁禁军两大史诗任务链：《御前泄密 · 河北暗桩》与《太行剿匪》三部曲！',
    ],
  },

  // Row 10
  {
    id: 'jj_spy_vol1_2',
    col: 2,
    row: 10,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · 反谍长卷（卷一/二）',
    kind: '师门要务',
    code: 'QST-SECT-33-HEBEI-SPY (上)',
    title: '御前泄密 · 汴京真定勘谍',
    subtitle: '佩鎏金虎符 · 追查微服泄密内鬼',
    icon: '符',
    questId: 'QST-SECT-33-HEBEI-SPY',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      customLabel: '八十万禁军大教场 · 擂鼓聚将点兵帅台',
    },
    prereqs: [
      '身居大宋禁军 Lv.3【四厢都指挥】及以上，且已完成《微服汴梁 · 血护龙颜》',
      '建议境界：【一流下品 ~ 一流中品】（全篇 48 幕长卷剧本）',
    ],
    steps: [
      '卷一（汴梁）：大教场点兵帅台受王德用【鎏金密查虎符】→ 皇城角楼会韦青衣核门簿 → 开封府架阁楼与公孙策破千字文密押（算术/书 ≥ 65）→ 汴河巡检司 1v2 战黑水双煞截周承业',
      '卷二（真定）：燕赵酒楼接头雷巽虎、仝云韵 → 并行侦查真定榷场（1v2雪夜战，骑术≥70）、常山演武堂（会郭逵赵括苍）、隆兴大佛寺（经义≥60）三处要害',
    ],
    rewards: ['锁定三衙叛将韩崇矩携乌铜秘匣混入冬衣车队南下大名府之铁证'],
  },
  {
    id: 'jj_taihang_1',
    col: 6,
    row: 10,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · 剿匪三部曲（壹）',
    kind: '统帅战役',
    code: 'QST-SECT-33-TAIHANG-CAMPAIGN-1',
    title: '太行剿匪 · 壹 · 骄兵折戟',
    subtitle: '暂授都虞候北伐 · 黑风涧浴血断后',
    icon: '折',
    questId: 'QST-SECT-33-TAIHANG-CAMPAIGN-1',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      customLabel: '八十万禁军大教场 · 擂鼓聚将点兵帅台',
    },
    prereqs: [
      '身居大宋禁军 Lv.3【四厢都指挥】且在禁军任职满 365 日（整一年）',
      '刚性触发条件：尚未通晓兵书 ——【经义 ≤ 40】或【策论 ≤ 60】（至少一项未超标）！',
      '建议境界：【二流上品 ~ 一流下品】（全 40 幕）',
    ],
    steps: [
      '紫宸殿奉旨先授 Lv.4【三衙都虞候】，点五千禁军会师大名府，连破太行外山口与鹿角寨两场 1v2 后轻敌冒进黑风愁猿涧',
      '惨遭断道火攻！交虎符令高怀亮撤残军，独自在一线天先胜追寇（1v2），再硬撼【王重岳 + 史万山】死守撑满 6 回合！',
      '丧师两千返紫宸殿叩首请罪，削去冠带贬回【Lv.3 四厢都指挥】并罚俸一年，秋雨赴汴郊义冢祭魂',
    ],
    rewards: ['完成沙场挫败洗礼，60 日后解锁枢密使王德用亲授《武经总要》雪耻二征！'],
    warning:
      '卡点提醒：入禁军满 365 日前切勿同时把经义修过 40 且策论修过 60，否则无法触发首卷轻敌折戟剧情！',
  },

  // Row 11
  {
    id: 'jj_spy_vol3',
    col: 2,
    row: 11,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · 反谍长卷（卷三）',
    kind: '师门要务',
    code: 'QST-SECT-33-HEBEI-SPY (下)',
    title: '黄河铁索 · 决战萧远风',
    subtitle: '武库擒叛校 · 横江浮桥夺秘匣',
    icon: '澜',
    questId: 'QST-SECT-33-HEBEI-SPY',
    targetLocation: {
      regionId: 'daming',
      buildingId: 'daming_base_tavern',
      customLabel: '大名府 · 黄河北岸临津酒楼',
    },
    prereqs: ['前置节点：御前泄密 · 汴京真定勘谍'],
    steps: [
      '大名府临津酒楼摸底 → 河北枪棒大校场开箱查猛火油，八角擂台 1v2 拿下叛将韩崇矩',
      '北京留守行宫沙盘阁会猛将王信，择定【官军铁甲封渡】或【河朔群侠奇兵（欧阳春等）】合围方略',
      '奔赴【黄河铁索渡口】拦截猛火油船，横江浮桥决战辽南京武林统制【萧远风 + 修罗副统领】，夺回《京营泄密名录》，凯旋归京入紫宸殿！',
    ],
    rewards: [
      '战斗经验 +950，并开启紫宸殿丹墀【当殿直谏肃贪】vs【密火留线反间】双天阶结局抉择！',
    ],
  },
  {
    id: 'jj_taihang_2',
    col: 6,
    row: 11,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · 剿匪三部曲（贰）',
    kind: '统帅战役',
    code: 'QST-SECT-33-TAIHANG-CAMPAIGN-2',
    title: '太行剿匪 · 贰 · 刮目相看',
    subtitle: '苦读武经达标 · 连拔四寨困狂龙',
    icon: '略',
    questId: 'QST-SECT-33-TAIHANG-CAMPAIGN-2',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_jinjun',
      spotId: 'bl_jj_platform',
      customLabel: '八十万禁军大教场 · 擂鼓聚将点兵帅台',
    },
    prereqs: [
      '前置节点：《太行剿匪 · 骄兵折戟》结案满 60 日，身居禁军 Lv.3+',
      '出征硬性考校：修满十艺【经义 ≥ 40】且【策论 ≥ 70】！',
    ],
    steps: [
      '点兵帅台王德用煮茶勉励（吕蒙刮目相看），赐《武经总要 · 枢密院行军钞本》(ITM-MSC-029，研读策论+15、经义+8)',
      '修满经义≥40 & 策论≥70 后通过沙盘三策考校，王德用金殿押印力保统兵五千再征太行',
      '断水熏烟零亡拔苍狼前寨 → 鹰愁岭围点打援破黑风中寨 → 封暗渠奇袭太行藏金义仓 → 飞狐断魂索桥正面击败【史万山】，筑六碉锁困王重岳，押十匪献俘开封市曹十斩！',
    ],
    rewards: ['获秘籍《武经总要钞本》、洗刷黑风峡兵败之耻，将太行残寇死锁绝崖'],
  },

  // Row 12
  {
    id: 'jj_spy_end_a',
    col: 1,
    row: 12,
    faction: 'jinjun',
    factionLabel: '河北暗桩 · 抉择甲（刚正肃贪）',
    kind: '互斥抉择',
    code: 'ARM-003 · 步人玄铁重铠',
    title: '铁面弹劾 · 玄铁重铠赐干城',
    subtitle: '当殿彻查勋贵蛀虫 · 赐天阶重甲',
    icon: '铠',
    mutexGroup: 'hebei_spy_ending',
    questId: 'QST-SECT-33-HEBEI-SPY',
    prereqs: [
      '前置节点：黄河铁索 · 决战萧远风（凯旋紫宸早朝）',
      '与【密火留线·紫宸玄枢腰牌】二选一互斥',
    ],
    steps: [
      '于垂拱紫宸正殿联合包拯、欧阳修当殿唱名弹劾，将涉案三衙校尉与勋贵管事一查到底明正典刑',
    ],
    rewards: [
      '御赐天阶重宝【大宋步人玄铁重铠】(ARM-003) + 户部纹银 1,500 两',
      '声望 +140、侠义 +65、包拯/欧阳修/仁宗/王德用及大宋全阵营好感大幅提升',
    ],
  },
  {
    id: 'jj_spy_end_b',
    col: 3,
    row: 12,
    faction: 'jinjun',
    factionLabel: '河北暗桩 · 抉择乙（反间暗棋）',
    kind: '互斥抉择',
    code: 'ITM-MSC-032 · 玄枢腰牌',
    title: '密火留线 · 紫宸玄枢授密使',
    subtitle: '留虚桩倒钓北院 · 赐天阶腰牌仙丹',
    icon: '枢',
    mutexGroup: 'hebei_spy_ending',
    questId: 'QST-SECT-33-HEBEI-SPY',
    prereqs: [
      '前置节点：黄河铁索 · 决战萧远风（凯旋紫宸早朝）',
      '与【铁面弹劾·玄铁重铠赐干城】二选一互斥',
    ],
    steps: [
      '密奏诛除韩崇矩知情死党，故意保留两条不知深浅的外围采买线由皇城司喂假情报倒钓辽国北院',
    ],
    rewards: [
      '东暖阁秘赐天阶【紫宸玄枢密使腰牌】(ITM-MSC-032) + 大内秘藏【少林九转大还丹】(ITM-MED-101) + 内帑纹银 1,200 两',
      '策论 +4、声望 +100、宋仁宗(+30)/王德用(+25)/韦青衣(+20)深度倚重',
    ],
  },
  {
    id: 'jj_taihang_3',
    col: 6,
    row: 12,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · 剿匪三部曲（叁·终章）',
    kind: '统帅决战',
    code: 'QST-SECT-33-TAIHANG-CAMPAIGN-3',
    title: '太行剿匪 · 叁 · 犁庭扫穴',
    subtitle: '后崖夜袭擒双凶 · 市曹横刃护法场',
    icon: '捷',
    questId: 'QST-SECT-33-TAIHANG-CAMPAIGN-3',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_kaifengfu',
      spotId: 'bl_kf_court',
      customLabel: '开封府衙 · 开封府升堂正殿',
    },
    prereqs: [
      '前置节点：《刮目相看 · 武经破寨》结案满 60 日，身居大宋禁军 Lv.3+',
      '前往【开封府衙 · 升堂正殿】与南侠展昭对话开启（全 40 幕大结局）',
      '建议境界：【一流中品 ~ 一流上品】',
    ],
    steps: [
      '卧底“孤雁”献《太行暗道图》，高怀亮万炬佯攻断魂桥；子夜偕【展昭】率五十玄衣精锐攀后崖 1v2 拔鹰愁暗哨',
      '破入聚义忠义大堂，与展昭并肩 2v2 生擒太行天王【王重岳】与九纹狂龙【史万山】，迫降满山群寇槛车押返汴梁',
      '东京市曹监斩之日，京东义虎【晁云飞】+ 立地太岁【阮惊涛】暴起劫法场，横刃护台 1v2 击溃双寇，将王、史二凶当场正法！',
    ],
    rewards: ['永久铲除太行绿林匪患！推进至垂拱紫宸正殿受封三衙统帅勋阶！'],
  },

  // Row 13
  {
    id: 'jj_rank4_coronation',
    col: 6,
    row: 13,
    faction: 'jinjun',
    factionLabel: '大宋禁军 · 三衙统帅终局',
    kind: '紫宸册封',
    code: 'SECT-33 · 正式晋封 Lv.4',
    title: '紫宸受封 · 三衙都虞候',
    subtitle: '晴光御酒祭忠魂 · 执掌京畿宿卫',
    icon: '侯',
    questId: 'QST-SECT-33-TAIHANG-CAMPAIGN-3',
    targetLocation: {
      regionId: 'bianliang',
      buildingId: 'bl_palace',
      spotId: 'bl_palace_hall',
      customLabel: '大内皇宫 · 垂拱紫宸正殿',
    },
    prereqs: ['前置节点：完成《太行剿匪 · 叁 · 犁庭扫穴》'],
    steps: [
      '垂拱紫宸正殿受宋仁宗正式册封，退朝后携三坛御赐荷池眉寿醇酒，与王德用、高怀亮、展昭并骑赴西郊晴光松冈祭奠两千阵亡同袍',
    ],
    rewards: [
      '正式晋封大宋禁军 Lv.4【三衙都虞候】（月俸升至 240 两/月）',
      '御赐纹银 +1,000 两、江湖声望 +150、侠义 +100、门派功绩 +300、战斗经验 +1,200！',
    ],
  },
]

const FOCUS_EDGES: ReadonlyArray<FocusTreeEdge> = [
  // Changshan
  { from: 'cs_join', to: 'cs_rank2', type: 'solid' },
  { from: 'cs_join', to: 'cs_spy_duty', type: 'dashed' },
  { from: 'cs_rank2', to: 'cs_rank3', type: 'solid' },
  { from: 'cs_rank2', to: 'cs_longling_1', type: 'solid' },
  { from: 'cs_rank3', to: 'cs_kf_letter1', type: 'solid' },
  { from: 'cs_longling_1', to: 'cs_longling_2', type: 'solid' },
  { from: 'cs_longling_2', to: 'tianbo_bawang', type: 'dashed' },
  { from: 'cs_longling_2', to: 'wutai_transfer', type: 'dashed' },

  // Baji & Daming
  { from: 'cq_join', to: 'baji_referral', type: 'solid' },
  { from: 'baji_referral', to: 'baji_join_lv1', type: 'solid' },
  { from: 'dm_case_start', to: 'dm_leitai_sandtable', type: 'solid' },
  { from: 'dm_leitai_sandtable', to: 'dm_end_a', type: 'solid' },
  { from: 'dm_leitai_sandtable', to: 'dm_end_b', type: 'solid' },
  { from: 'dm_leitai_sandtable', to: 'dm_end_c', type: 'solid' },
  { from: 'dm_end_b', to: 'tianbo_bawang', type: 'dashed' },

  // Outlaw blacklist -> Zhan Zhao arrest
  { from: 'dm_end_c', to: 'kf_zhanzhao_arrest', type: 'dashed' },
  { from: 'taihang_touming', to: 'kf_zhanzhao_arrest', type: 'solid' },

  // Entry into Kaifeng
  { from: 'cs_kf_letter1', to: 'kf_join_lv1', type: 'solid' },
  { from: 'cs_longling_2', to: 'kf_join_lv2', type: 'dashed' },
  { from: 'dm_end_a', to: 'kf_join_lv2', type: 'dashed' },
  { from: 'baji_join_lv1', to: 'kf_join_lv2', type: 'dashed' },

  // Kaifeng Progression
  { from: 'kf_join_lv1', to: 'kf_promo_lv2', type: 'solid' },
  { from: 'kf_promo_lv2', to: 'kf_murong_1', type: 'dashed' },
  { from: 'kf_join_lv2', to: 'kf_murong_1', type: 'dashed' },
  { from: 'kf_warrant_sys', to: 'kf_promo_lv3', type: 'dashed' },
  { from: 'adv_yanziwu_map', to: 'kf_murong_1', type: 'dashed' },
  { from: 'kf_murong_1', to: 'kf_promo_lv3', type: 'solid' },
  { from: 'kf_promo_lv3', to: 'kf_taihang_bandit', type: 'dashed' },
  { from: 'kf_promo_lv3', to: 'kf_murong_2', type: 'solid' },
  { from: 'kf_murong_2', to: 'kf_promo_lv4', type: 'solid' },
  { from: 'kf_promo_lv4', to: 'kf_renzong_escort', type: 'solid' },

  // Palace Decree Split -> Stay Kaifeng vs Join Jinjun
  { from: 'kf_renzong_escort', to: 'kf_stay_kuihua', type: 'solid' },
  { from: 'kf_renzong_escort', to: 'jj_join_lv3', type: 'solid' },

  // Jinjun Dual Branches
  { from: 'jj_join_lv3', to: 'jj_spy_vol1_2', type: 'solid' },
  { from: 'jj_spy_vol1_2', to: 'jj_spy_vol3', type: 'solid' },
  { from: 'jj_spy_vol3', to: 'jj_spy_end_a', type: 'solid' },
  { from: 'jj_spy_vol3', to: 'jj_spy_end_b', type: 'solid' },

  { from: 'jj_join_lv3', to: 'jj_taihang_1', type: 'solid' },
  { from: 'jj_taihang_1', to: 'jj_taihang_2', type: 'solid' },
  { from: 'jj_taihang_2', to: 'jj_taihang_3', type: 'solid' },
  { from: 'kf_taihang_bandit', to: 'jj_taihang_3', type: 'dashed' },
  { from: 'jj_taihang_3', to: 'jj_rank4_coronation', type: 'solid' },
]

const MUTEX_BRIDGES: ReadonlyArray<MutexBridgeDef> = [
  { left: 'dm_end_a', right: 'dm_end_b', label: '铁锁镇河朔三结局互斥（择一而终）' },
  { left: 'dm_end_b', right: 'dm_end_c', label: '铁锁镇河朔三结局互斥（择一而终）' },
  {
    left: 'kf_stay_kuihua',
    right: 'jj_join_lv3',
    label: '紫宸丹墀双恩互斥：留守公门 vs 改授禁军',
  },
  {
    left: 'jj_spy_end_a',
    right: 'jj_spy_end_b',
    label: '河北暗桩终局互斥：当殿弹劾 vs 反间留线',
  },
]

const FOCUS_NODE_MAP: Record<string, FocusTreeNode> = Object.fromEntries(
  FOCUS_NODES.map((n) => [n.id, n]),
)

const UNLOCK_RULES: Record<string, (done: ReadonlySet<string>) => boolean> = {
  cs_join: () => true,
  cs_spy_duty: (s) => s.has('cs_join'),
  cq_join: () => true,
  dm_case_start: () => true,
  taihang_touming: () => true,
  adv_yanziwu_map: () => true,

  cs_rank2: (s) => s.has('cs_join'),
  cs_rank3: (s) => s.has('cs_rank2'),
  baji_referral: (s) => s.has('cq_join'),
  dm_leitai_sandtable: (s) => s.has('dm_case_start'),

  cs_longling_1: (s) => s.has('cs_rank2'),
  cs_kf_letter1: (s) => s.has('cs_rank3'),
  baji_join_lv1: (s) => s.has('baji_referral'),
  dm_end_a: (s) => s.has('dm_leitai_sandtable'),
  dm_end_b: (s) => s.has('dm_leitai_sandtable'),
  dm_end_c: (s) => s.has('dm_leitai_sandtable'),

  cs_longling_2: (s) => s.has('cs_longling_1'),
  tianbo_bawang: (s) => s.has('cs_longling_2') || s.has('dm_end_b') || s.has('baji_join_lv1'),
  wutai_transfer: (s) => s.has('cs_longling_2'),
  kf_zhanzhao_arrest: (s) => s.has('dm_end_c') || s.has('taihang_touming'),

  kf_join_lv1: (s) => s.has('cs_kf_letter1') && !s.has('dm_end_c') && !s.has('taihang_touming'),
  kf_join_lv2: (s) =>
    (s.has('cs_longling_2') || s.has('dm_end_a')) &&
    !s.has('dm_end_c') &&
    !s.has('taihang_touming'),
  kf_warrant_sys: (s) => s.has('kf_join_lv1') || s.has('kf_join_lv2'),

  kf_promo_lv2: (s) => s.has('kf_join_lv1'),
  kf_murong_1: (s) => (s.has('kf_join_lv2') || s.has('kf_promo_lv2')) && s.has('adv_yanziwu_map'),
  kf_promo_lv3: (s) => s.has('kf_murong_1'),
  kf_taihang_bandit: (s) => s.has('kf_promo_lv3'),
  kf_murong_2: (s) => s.has('kf_promo_lv3'),
  kf_promo_lv4: (s) => s.has('kf_murong_2'),
  kf_renzong_escort: (s) => s.has('kf_promo_lv4'),

  kf_stay_kuihua: (s) => s.has('kf_renzong_escort'),
  jj_join_lv3: (s) => s.has('kf_renzong_escort'),

  jj_spy_vol1_2: (s) => s.has('jj_join_lv3'),
  jj_spy_vol3: (s) => s.has('jj_spy_vol1_2'),
  jj_spy_end_a: (s) => s.has('jj_spy_vol3'),
  jj_spy_end_b: (s) => s.has('jj_spy_vol3'),

  jj_taihang_1: (s) => s.has('jj_join_lv3'),
  jj_taihang_2: (s) => s.has('jj_taihang_1'),
  jj_taihang_3: (s) => s.has('jj_taihang_2'),
  jj_rank4_coronation: (s) => s.has('jj_taihang_3'),
}

const STATUS_META: Record<
  FocusNodeStatus,
  {
    label: string
    pillCls: string
    cardCls: string
    tooltipBadgeCls: string
  }
> = {
  completed: {
    label: '✓ 已达成',
    pillCls: 'bg-[#1f4d3b] text-[#eefaf3] border-[#62b588]',
    cardCls:
      'bg-gradient-to-b from-[#fbf5e3] to-[#f1e3be] border-[#b8860b] shadow-[0_3px_12px_rgba(184,134,11,0.25)]',
    tooltipBadgeCls: 'bg-[#1f4d3b] text-[#e7f7ef] border-[#52a678]',
  },
  active: {
    label: '● 进行中',
    pillCls: 'bg-[#781710] text-[#fff6ea] border-[#d4695e]',
    cardCls:
      'bg-gradient-to-b from-[#fff7ec] to-[#f7e4cf] border-[#a83226] shadow-[0_3px_12px_rgba(168,50,38,0.22)]',
    tooltipBadgeCls: 'bg-[#781710] text-[#fff3df] border-[#d67b72]',
  },
  available: {
    label: '◆ 可推进',
    pillCls: 'bg-[#355263] text-[#eef7fc] border-[#6b9bb8]',
    cardCls:
      'bg-gradient-to-b from-[#fdf9f0] to-[#f3ead6] border-[#7b6544] shadow-[0_2px_8px_rgba(45,30,16,0.12)]',
    tooltipBadgeCls: 'bg-[#355263] text-[#eef7fc] border-[#6c9db9]',
  },
  blocked: {
    label: '✕ 互斥锁死',
    pillCls: 'bg-[#5a1e1a] text-[#ffd9d6] border-[#9e4740]',
    cardCls: 'bg-[#ebe1d1]/80 border-[#a98d78] opacity-60 saturate-50',
    tooltipBadgeCls: 'bg-[#6e1c17] text-[#ffe5e2] border-[#b85a52]',
  },
  locked: {
    label: '前置未达',
    pillCls: 'bg-[#d9ccb4] text-[#6b563c] border-[#b8a587]',
    cardCls: 'bg-[#f2ead9]/90 border-[#cbb99a] opacity-85',
    tooltipBadgeCls: 'bg-[#4a3928] text-[#e6d7c0] border-[#82694d]',
  },
}

function hasItemOrConsumed(
  itemId: string,
  inventory: ReadonlyArray<InventoryStack>,
  consumedUniqueIds: ReadonlyArray<string>,
): boolean {
  return (
    inventory.some((st) => st.itemId === itemId && st.qty > 0) ||
    consumedUniqueIds.includes(itemId)
  )
}

function deriveLiveProgress(
  sectState: PlayerSectState,
  questState: QuestRuntimeState,
  inventory: ReadonlyArray<InventoryStack>,
  consumedUniqueIds: ReadonlyArray<string>,
  learnedArts: ReadonlyArray<LearnedArtEntry>,
): { completed: Set<string>; active: Set<string> } {
  const completed = new Set<string>()
  const active = new Set<string>()

  const doneQuests = questState.completedQuests
  const activeQuests = questState.activeQuests
  const flags = questState.flags

  // 1. 常山枪派 (SECT-22)
  const inChangshan = sectState.sectId === 'SECT-22'
  const hadChangshanHistory =
    inChangshan ||
    sectState.claimedKaifengLetter ||
    Boolean(doneQuests.QST_SECT22_LONGLING) ||
    hasItemOrConsumed('ITM-MSC-006', inventory, consumedUniqueIds) ||
    hasItemOrConsumed('ITM-MSC-013', inventory, consumedUniqueIds)

  if (hadChangshanHistory) completed.add('cs_join')
  if (inChangshan && sectState.activeLiaoSpy) active.add('cs_spy_duty')
  else if (hadChangshanHistory && sectState.lastLiaoSpyMissionYear > 0) {
    completed.add('cs_spy_duty')
  }

  if ((inChangshan && sectState.rank >= 2) || Boolean(doneQuests.QST_SECT22_LONGLING) || sectState.claimedKaifengLetter) {
    completed.add('cs_rank2')
  }
  if ((inChangshan && sectState.rank >= 3) || sectState.claimedKaifengLetter) {
    completed.add('cs_rank3')
  }
  if (sectState.claimedKaifengLetter || hasItemOrConsumed('ITM-MSC-006', inventory, consumedUniqueIds)) {
    completed.add('cs_kf_letter1')
  }

  if (doneQuests.QST_SECT22_LONGLING) {
    completed.add('cs_longling_1')
    completed.add('cs_longling_2')
  } else if (activeQuests.QST_SECT22_LONGLING) {
    const stepId = activeQuests.QST_SECT22_LONGLING.stepId
    if (stepId.includes('yanmen') || stepId.includes('hanqi') || stepId.includes('inherit')) {
      completed.add('cs_longling_1')
      active.add('cs_longling_2')
    } else {
      active.add('cs_longling_1')
    }
  }

  // 2. 齐鲁查拳馆 (SECT-25) & 沧州八极门 (SECT-23) & 铁锁镇河朔
  const hasBajiReferral =
    Boolean(doneQuests['QST-SECT-23-REFERRAL']) ||
    sectState.bribedReferralSects.includes('SECT-25') ||
    hasItemOrConsumed('ITM-MSC-004', inventory, consumedUniqueIds)

  if (sectState.sectId === 'SECT-25') {
    if (sectState.rank >= 2) completed.add('cq_join')
    else active.add('cq_join')
  } else if (hasBajiReferral) {
    completed.add('cq_join')
  }

  if (hasBajiReferral) completed.add('baji_referral')
  else if (activeQuests['QST-SECT-23-REFERRAL']) active.add('baji_referral')

  if (sectState.sectId === 'SECT-23') {
    completed.add('baji_join_lv1')
  }

  const dmDone = doneQuests['QST-CITY-DAMING-BAJI']
  if (dmDone && dmDone.outcome !== 'failed_deadline') {
    completed.add('dm_case_start')
    completed.add('dm_leitai_sandtable')
    if (dmDone.outcome === 'ending_official_patronage') {
      completed.add('dm_end_a')
    } else if (
      dmDone.outcome === 'ending_baji_inheritance' ||
      dmDone.outcome === 'joined_via_daming_heroics'
    ) {
      completed.add('dm_end_b')
    } else if (dmDone.outcome === 'ending_outlaw_heist') {
      completed.add('dm_end_c')
    }
  } else if (activeQuests['QST-CITY-DAMING-BAJI']) {
    const stepId = activeQuests['QST-CITY-DAMING-BAJI'].stepId
    if (
      stepId.includes('leitai') ||
      stepId.includes('sandtable') ||
      stepId.includes('finale') ||
      stepId.includes('ending')
    ) {
      completed.add('dm_case_start')
      active.add('dm_leitai_sandtable')
    } else {
      active.add('dm_case_start')
    }
  }

  // 3. 联动旁支（天波霸王枪 / 五台山剃度 / 太行投名状 / 燕子坞水图）
  if (doneQuests.QST_TIANBO_BAWANG || learnedArts.some((a) => a.artId === 'MA-037')) {
    completed.add('tianbo_bawang')
  } else if (activeQuests.QST_TIANBO_BAWANG) {
    active.add('tianbo_bawang')
  }

  if (doneQuests['QST-SECT-03-ENTRY'] || sectState.sectId === 'SECT-03') {
    completed.add('wutai_transfer')
  } else if (activeQuests['QST-SECT-03-ENTRY']) {
    active.add('wutai_transfer')
  }

  if (
    doneQuests['QST-SECT-18-TOUMINGZHUANG'] ||
    sectState.toumingzhuangState === 'completed' ||
    sectState.sectId === 'SECT-18'
  ) {
    completed.add('taihang_touming')
  } else if (
    activeQuests['QST-SECT-18-TOUMINGZHUANG'] ||
    sectState.toumingzhuangState === 'accepted'
  ) {
    active.add('taihang_touming')
  }

  if (sectState.songCourtBlacklisted) {
    active.add('kf_zhanzhao_arrest')
  }

  if (doneQuests['QST-ADV-YANZIWU-MAP']) {
    completed.add('adv_yanziwu_map')
  } else if (activeQuests['QST-ADV-YANZIWU-MAP']) {
    active.add('adv_yanziwu_map')
  }

  // 4. 开封府 / 六扇门 (SECT-17)
  const inKaifeng = sectState.sectId === 'SECT-17'
  const inJinjun = sectState.sectId === 'SECT-33'
  const reachedKaifengOrJinjun =
    inKaifeng ||
    inJinjun ||
    Boolean(doneQuests['QST-SECT-17-MURONG-1']) ||
    Boolean(doneQuests['QST-SECT-17-MURONG-2']) ||
    Boolean(doneQuests['QST-SECT-17-RENZONG-ESCORT'])

  if (reachedKaifengOrJinjun) {
    const usedLv2Direct =
      hasItemOrConsumed('ITM-MSC-007', inventory, consumedUniqueIds) ||
      hasItemOrConsumed('ITM-MSC-013', inventory, consumedUniqueIds) ||
      completed.has('dm_end_a') ||
      completed.has('cs_longling_2')

    if (usedLv2Direct && !sectState.claimedKaifengLetter) {
      completed.add('kf_join_lv2')
    } else {
      completed.add('kf_join_lv1')
      if ((inKaifeng && sectState.rank >= 2) || inJinjun || Boolean(doneQuests['QST-SECT-17-MURONG-1'])) {
        completed.add('kf_promo_lv2')
      }
    }

    if (inKaifeng && sectState.rank < 4 && sectState.activeKaifengWarrant) {
      active.add('kf_warrant_sys')
    } else if ((inKaifeng && sectState.kaifengCasesSolved > 0) || (inKaifeng && sectState.rank >= 2) || inJinjun) {
      completed.add('kf_warrant_sys')
    }
  }

  if (doneQuests['QST-SECT-17-MURONG-1']) completed.add('kf_murong_1')
  else if (activeQuests['QST-SECT-17-MURONG-1']) active.add('kf_murong_1')

  if ((inKaifeng && sectState.rank >= 3) || inJinjun || Boolean(doneQuests['QST-SECT-17-MURONG-2'])) {
    completed.add('kf_promo_lv3')
  }

  if (doneQuests['QST-SECT-17-TAIHANG-BANDIT']) completed.add('kf_taihang_bandit')
  else if (activeQuests['QST-SECT-17-TAIHANG-BANDIT']) active.add('kf_taihang_bandit')

  if (doneQuests['QST-SECT-17-MURONG-2']) completed.add('kf_murong_2')
  else if (activeQuests['QST-SECT-17-MURONG-2']) active.add('kf_murong_2')

  if ((inKaifeng && sectState.rank >= 4) || inJinjun || Boolean(doneQuests['QST-SECT-17-RENZONG-ESCORT'])) {
    completed.add('kf_promo_lv4')
  }

  const escortDone = doneQuests['QST-SECT-17-RENZONG-ESCORT']
  if (escortDone) {
    completed.add('kf_renzong_escort')
    if (escortDone.outcome === 'stayed_kaifeng_kuihua') {
      completed.add('kf_stay_kuihua')
    } else if (escortDone.outcome === 'joined_imperial_guard_lv3' || inJinjun) {
      completed.add('jj_join_lv3')
    }
  } else if (activeQuests['QST-SECT-17-RENZONG-ESCORT']) {
    active.add('kf_renzong_escort')
  } else if (inJinjun) {
    completed.add('kf_renzong_escort')
    completed.add('jj_join_lv3')
  }

  // 5. 大宋禁军 (SECT-33)
  const spyDone = doneQuests['QST-SECT-33-HEBEI-SPY']
  if (spyDone) {
    completed.add('jj_spy_vol1_2')
    completed.add('jj_spy_vol3')
    if (flags.jj_spy_ending_branch === 'righteous_impeach') {
      completed.add('jj_spy_end_a')
    } else if (flags.jj_spy_ending_branch === 'counter_espionage') {
      completed.add('jj_spy_end_b')
    }
  } else if (activeQuests['QST-SECT-33-HEBEI-SPY']) {
    const stepId = activeQuests['QST-SECT-33-HEBEI-SPY'].stepId
    if (stepId.includes('dm') || stepId.includes('daming') || stepId.includes('ferry') || stepId.includes('court')) {
      completed.add('jj_spy_vol1_2')
      active.add('jj_spy_vol3')
    } else {
      active.add('jj_spy_vol1_2')
    }
  }

  if (doneQuests['QST-SECT-33-TAIHANG-CAMPAIGN-1'] || Boolean(flags.jinjun_taihang_camp1_done)) {
    completed.add('jj_taihang_1')
  } else if (activeQuests['QST-SECT-33-TAIHANG-CAMPAIGN-1']) {
    active.add('jj_taihang_1')
  }

  if (doneQuests['QST-SECT-33-TAIHANG-CAMPAIGN-2'] || Boolean(flags.jinjun_taihang_camp2_done)) {
    completed.add('jj_taihang_2')
  } else if (activeQuests['QST-SECT-33-TAIHANG-CAMPAIGN-2']) {
    active.add('jj_taihang_2')
  }

  if (doneQuests['QST-SECT-33-TAIHANG-CAMPAIGN-3'] || Boolean(flags.taihang_bandits_eradicated)) {
    completed.add('jj_taihang_3')
    completed.add('jj_rank4_coronation')
  } else if (activeQuests['QST-SECT-33-TAIHANG-CAMPAIGN-3']) {
    active.add('jj_taihang_3')
  }

  return { completed, active }
}

function computeNodeStatus(
  node: FocusTreeNode,
  completedSet: ReadonlySet<string>,
  activeSet: ReadonlySet<string>,
): FocusNodeStatus {
  if (completedSet.has(node.id)) return 'completed'
  if (activeSet.has(node.id)) return 'active'

  if (node.mutexGroup) {
    const siblingChosen = FOCUS_NODES.some(
      (other) =>
        other.id !== node.id &&
        other.mutexGroup === node.mutexGroup &&
        completedSet.has(other.id),
    )
    if (siblingChosen) return 'blocked'
  }

  if (
    (node.id === 'kf_join_lv1' || node.id === 'kf_join_lv2') &&
    (completedSet.has('dm_end_c') || completedSet.has('taihang_touming'))
  ) {
    return 'blocked'
  }

  const rule = UNLOCK_RULES[node.id]
  if (rule && rule(completedSet)) return 'available'
  return 'locked'
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

export function QuestTreeTab() {
  const { sectState, questState, inventory, consumedUniqueIds, learnedArts } = useGameStore(
    useShallow((s) => ({
      sectState: s.sectState,
      questState: s.questState,
      inventory: s.inventory,
      consumedUniqueIds: s.consumedUniqueIds,
      learnedArts: s.learnedArts,
    })),
  )
  const locateQuestTargetOnMap = useGameStore((s) => s.locateQuestTargetOnMap)
  const setMenuTab = useGameStore((s) => s.setMenuTab)

  const [selectedId, setSelectedId] = useState<string>('kf_renzong_escort')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [factionFilter, setFactionFilter] = useState<FactionFilterKey>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)

  // Mode: live save sync vs sandbox simulation
  const [simMode, setSimMode] = useState<boolean>(false)
  const [simCompleted, setSimCompleted] = useState<Set<string>>(() => new Set())

  // Pan & zoom state
  const [scale, setScale] = useState<number>(0.68)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 18, y: 12 })
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{
    active: boolean
    startX: number
    startY: number
    originPanX: number
    originPanY: number
    moved: boolean
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originPanX: 0,
    originPanY: 0,
    moved: false,
  })

  const liveProgress = useMemo(
    () => deriveLiveProgress(sectState, questState, inventory, consumedUniqueIds, learnedArts),
    [sectState, questState, inventory, consumedUniqueIds, learnedArts],
  )

  const effectiveCompleted = simMode ? simCompleted : liveProgress.completed
  const effectiveActive = useMemo(
    () => (simMode ? new Set<string>() : liveProgress.active),
    [simMode, liveProgress.active],
  )

  const statusByNodeId = useMemo(() => {
    const map: Record<string, FocusNodeStatus> = {}
    for (const n of FOCUS_NODES) {
      map[n.id] = computeNodeStatus(n, effectiveCompleted, effectiveActive)
    }
    return map
  }, [effectiveCompleted, effectiveActive])

  const countsByStatus = useMemo(() => {
    let completed = 0
    let active = 0
    let available = 0
    for (const n of FOCUS_NODES) {
      const st = statusByNodeId[n.id]
      if (st === 'completed') completed += 1
      else if (st === 'active') active += 1
      else if (st === 'available') available += 1
    }
    return { completed, active, available }
  }, [statusByNodeId])

  const connectedFocusSet = useMemo(() => {
    const focusId = hoveredId ?? selectedId
    const s = new Set<string>([focusId])
    for (const e of FOCUS_EDGES) {
      if (e.from === focusId) s.add(e.to)
      if (e.to === focusId) s.add(e.from)
    }
    return s
  }, [hoveredId, selectedId])

  const matchesSearchOrFilter = useCallback(
    (node: FocusTreeNode): boolean => {
      if (factionFilter !== 'all' && node.faction !== factionFilter) return false
      const q = searchQuery.trim().toLowerCase()
      if (!q) return true
      const hay = [
        node.title,
        node.subtitle,
        node.code,
        node.factionLabel,
        ...node.prereqs,
        ...node.rewards,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    },
    [factionFilter, searchQuery],
  )

  const centerOnNode = useCallback(
    (nodeId: string, targetScale?: number) => {
      const node = FOCUS_NODE_MAP[nodeId]
      const vp = viewportRef.current
      if (!node || !vp) return
      const nextScale = targetScale ?? scale
      const rect = vp.getBoundingClientRect()
      const cx = colX(node.col) + NODE_W / 2
      const cy = rowY(node.row) + NODE_H / 2
      setScale(nextScale)
      setPan({
        x: Math.round(rect.width / 2 - cx * nextScale),
        y: Math.round(rect.height / 2 - cy * nextScale),
      })
    },
    [scale],
  )

  const fitOverview = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const rect = vp.getBoundingClientRect()
    const fitS = clamp((rect.width - 28) / CANVAS_W, 0.44, 0.85)
    setScale(Number(fitS.toFixed(2)))
    setPan({ x: 14, y: 12 })
  }, [])

  // Attach non-passive wheel listener for smooth cursor-anchored zoom without scrolling the outer modal
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault()
      ev.stopPropagation()
      const rect = vp.getBoundingClientRect()
      const mx = ev.clientX - rect.left
      const my = ev.clientY - rect.top
      const factor = ev.deltaY < 0 ? 1.09 : 0.92
      setScale((prevScale) => {
        const nextScale = clamp(Number((prevScale * factor).toFixed(3)), 0.42, 1.35)
        setPan((prevPan) => ({
          x: Math.round(mx - ((mx - prevPan.x) / prevScale) * nextScale),
          y: Math.round(my - ((my - prevPan.y) / prevScale) * nextScale),
        }))
        return nextScale
      })
    }
    vp.addEventListener('wheel', onWheel, { passive: false })
    return () => vp.removeEventListener('wheel', onWheel)
  }, [])

  const handleToggleSimNode = useCallback((node: FocusTreeNode) => {
    setSimCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(node.id)) {
        next.delete(node.id)
        return next
      }
      const st = computeNodeStatus(node, next, new Set())
      if (st === 'blocked') return prev
      // Auto-complete direct chain or allow testing available focus
      if (st === 'available' || st === 'locked') {
        if (node.mutexGroup) {
          for (const sibling of FOCUS_NODES) {
            if (sibling.mutexGroup === node.mutexGroup) {
              next.delete(sibling.id)
            }
          }
        }
        next.add(node.id)
      }
      return next
    })
  }, [])

  const selectedNode = FOCUS_NODE_MAP[selectedId] ?? FOCUS_NODES[0]
  const selectedStatus = statusByNodeId[selectedNode.id] ?? 'locked'
  const hoveredNode = hoveredId ? FOCUS_NODE_MAP[hoveredId] ?? null : null
  const hoveredStatus = hoveredNode ? statusByNodeId[hoveredNode.id] ?? 'locked' : 'locked'

  const selectedUpstream = useMemo(
    () =>
      FOCUS_EDGES.filter((e) => e.to === selectedNode.id)
        .map((e) => FOCUS_NODE_MAP[e.from])
        .filter(Boolean),
    [selectedNode.id],
  )
  const selectedDownstream = useMemo(
    () =>
      FOCUS_EDGES.filter((e) => e.from === selectedNode.id)
        .map((e) => FOCUS_NODE_MAP[e.to])
        .filter(Boolean),
    [selectedNode.id],
  )

  // Resolve live targetLocation (prefers active quest step target if currently active)
  const resolvedLocateTarget = useMemo((): QuestTargetLocationHint | undefined => {
    if (selectedNode.questId) {
      const activeProg = questState.activeQuests[selectedNode.questId]
      const qDef = QUEST_MAP[selectedNode.questId]
      if (activeProg && qDef?.steps[activeProg.stepId]?.targetLocation) {
        return qDef.steps[activeProg.stepId]?.targetLocation
      }
      if (qDef?.startLocation) {
        return qDef.startLocation
      }
    }
    return selectedNode.targetLocation
  }, [selectedNode, questState.activeQuests])

  // Viewport-clamped fixed coordinates for Paradox tooltip
  const tooltipStyle = useMemo(() => {
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1440
    const winH = typeof window !== 'undefined' ? window.innerHeight : 900
    const tipW = 368
    const estH = 340
    let left = pointerPos.x + 18
    let top = pointerPos.y + 16
    if (left + tipW > winW - 14) {
      left = Math.max(14, pointerPos.x - tipW - 18)
    }
    if (top + estH > winH - 14) {
      top = Math.max(14, winH - estH - 14)
    }
    return { left, top, width: tipW }
  }, [pointerPos])

  return (
    <div className="flex flex-col gap-2.5 h-[690px] max-h-[calc(95vh-225px)] min-h-[520px] text-xs text-[#2a1d11] select-none">
      {/* 顶部国策控制栏 */}
      <div className="p-2.5 rounded-lg bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* 左侧：阵营聚焦筛选 */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { key: 'all', label: `全脉络 (${FOCUS_NODES.length})`, cls: 'bg-[#261910] border-[#261910] text-[#fbf2e0]' },
              { key: 'changshan', label: '常山枪派', cls: FACTION_META.changshan.chipCls },
              { key: 'baji', label: '沧州八极门', cls: FACTION_META.baji.chipCls },
              { key: 'kaifeng', label: '开封府·六扇门', cls: FACTION_META.kaifeng.chipCls },
              { key: 'jinjun', label: '大宋禁军', cls: FACTION_META.jinjun.chipCls },
              { key: 'side', label: '奇遇与绿林', cls: FACTION_META.side.chipCls },
            ] as const
          ).map((item) => {
            const active = factionFilter === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFactionFilter(item.key)}
                className={`px-2.5 py-1 rounded font-bold song-serif border cursor-pointer transition-colors ${
                  active
                    ? item.cls
                    : 'bg-[#faf3e3] hover:bg-[#e8d8b9] border-[#bca37b] text-[#3d2814]'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* 右侧：检索、实况/推演切换、缩放与详单开关 */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7a5f3e] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜节点/信物/绝学…"
              className="w-36 sm:w-44 pl-7 pr-2 py-1 rounded bg-[#faf4e6] border border-[#bca37b] text-xs text-[#261910] placeholder:text-[#8c7353] focus:outline-none focus:border-[#781710]"
            />
          </div>

          {/* 存档实况 vs 沙盘推演 */}
          <button
            type="button"
            onClick={() => {
              if (!simMode) {
                setSimCompleted(new Set(liveProgress.completed))
                setSimMode(true)
              } else {
                setSimMode(false)
              }
            }}
            className={`px-2.5 py-1 rounded font-bold song-serif border flex items-center gap-1 cursor-pointer transition-colors ${
              simMode
                ? 'bg-[#781710] border-[#781710] text-[#fff8ee]'
                : 'bg-[#1f4d3b] border-[#1f4d3b] text-[#eefaf3]'
            }`}
            title={
              simMode
                ? '当前为沙盘推演模式（点击节点可模拟点亮与互斥锁死），点击切回存档实况'
                : '当前实时同步少侠存档进度，点击可进入沙盘推演模式自由点亮测试路线'
            }
          >
            {simMode ? <Sparkles className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{simMode ? '沙盘推演中' : '存档实况'}</span>
          </button>

          {simMode && (
            <button
              type="button"
              onClick={() => setSimCompleted(new Set())}
              className="px-2 py-1 rounded bg-[#faf3e3] hover:bg-[#e8d8b9] border border-[#bca37b] text-[#5c3d1e] font-bold song-serif flex items-center gap-1 cursor-pointer"
              title="清空沙盘推演点亮状态"
            >
              <RotateCcw className="w-3 h-3" />
              <span>清空</span>
            </button>
          )}

          {/* 缩放与居中控制 */}
          <div className="flex items-center rounded border border-[#bca37b] bg-[#faf3e3] overflow-hidden">
            <button
              type="button"
              onClick={() => setScale((s) => clamp(Number((s - 0.1).toFixed(2)), 0.42, 1.35))}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#3d2814] cursor-pointer"
              title="缩小画布"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setScale(0.75)}
              className="px-2 py-1 font-mono text-[11px] font-bold text-[#5c3d1e] hover:bg-[#e8d8b9] border-x border-[#d8c7a9] cursor-pointer"
              title="恢复标准缩放 (75%)"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setScale((s) => clamp(Number((s + 0.1).toFixed(2)), 0.42, 1.35))}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#3d2814] cursor-pointer"
              title="放大画布"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={fitOverview}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#3d2814] border-l border-[#d8c7a9] cursor-pointer"
              title="全图居中概览"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => centerOnNode('kf_renzong_escort', 0.78)}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#781710] border-l border-[#d8c7a9] font-bold song-serif cursor-pointer flex items-center gap-0.5"
              title="聚焦紫宸护驾分流枢机"
            >
              <Crosshair className="w-3 h-3" />
              <span>枢机</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            className="px-2.5 py-1 rounded bg-[#faf3e3] hover:bg-[#e8d8b9] border border-[#bca37b] text-[#3d2814] font-bold song-serif flex items-center gap-1 cursor-pointer"
            title={drawerOpen ? '收起右侧节点卷宗详单' : '展开右侧节点卷宗详单'}
          >
            {drawerOpen ? (
              <PanelRightClose className="w-3.5 h-3.5" />
            ) : (
              <PanelRightOpen className="w-3.5 h-3.5" />
            )}
            <span>{drawerOpen ? '收起详单' : '展开详单'}</span>
          </button>
        </div>
      </div>

      {/* 主体：左画布 + 右侧可折叠卷宗检视栏 */}
      <div className="flex-1 min-h-0 flex gap-2.5">
        {/* 国策树可拖拽缩放画布 */}
        <div
          ref={viewportRef}
          onMouseDown={(e) => {
            if (e.button !== 0) return
            dragRef.current = {
              active: true,
              startX: e.clientX,
              startY: e.clientY,
              originPanX: pan.x,
              originPanY: pan.y,
              moved: false,
            }
            setIsDragging(true)
          }}
          onMouseMove={(e) => {
            setPointerPos({ x: e.clientX, y: e.clientY })
            if (!dragRef.current.active) return
            const dx = e.clientX - dragRef.current.startX
            const dy = e.clientY - dragRef.current.startY
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
              dragRef.current.moved = true
            }
            setPan({
              x: dragRef.current.originPanX + dx,
              y: dragRef.current.originPanY + dy,
            })
          }}
          onMouseUp={() => {
            dragRef.current.active = false
            setIsDragging(false)
          }}
          onMouseLeave={() => {
            dragRef.current.active = false
            setIsDragging(false)
            setHoveredId(null)
          }}
          className={`relative flex-1 min-w-0 h-full rounded-lg border border-[#c8b28e] overflow-hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            backgroundColor: '#f3e8d2',
            backgroundImage: 'radial-gradient(rgba(92, 61, 30, 0.16) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* 左下角悬浮图例与实况计数条 */}
          <div className="absolute left-3 bottom-3 z-20 px-3 py-1.5 rounded-md bg-[#261910]/90 text-[#fbf2e0] border border-[#a58654] shadow-md flex flex-wrap items-center gap-3 text-[11px] pointer-events-none">
            <span className="font-bold text-[#f5d08a] song-serif">
              {simMode ? '沙盘推演态' : '存档进度'}：
            </span>
            <span>
              已达成 <strong className="font-mono text-[#7ee2a8]">{countsByStatus.completed}</strong>
            </span>
            {!simMode && (
              <span>
                进行中 <strong className="font-mono text-[#ff9e94]">{countsByStatus.active}</strong>
              </span>
            )}
            <span>
              可推进 <strong className="font-mono text-[#9ad4f5]">{countsByStatus.available}</strong>
            </span>
            <span className="hidden xl:inline text-[#d8c7a9]">
              ｜ 实线=必修直通 · 虚线=可选/跨派合流 ·{' '}
              <span className="inline-block px-1 rounded bg-[#8f1d14] text-white font-bold">!</span>{' '}
              互斥抉择 · 悬停检视前置要求
            </span>
          </div>

          {/* 缩放与平移世界层 */}
          <div
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
              transformOrigin: '0 0',
            }}
            className="relative"
          >
            {/* 1. 三大仕途阶段横幅底纹 */}
            {TIER_BANDS.map((band) => {
              const top = rowY(band.topRow) - 34
              const height = (band.bottomRow - band.topRow) * ROW_STEP + NODE_H + 54
              return (
                <div
                  key={band.id}
                  style={{ top, left: 16, width: CANVAS_W - 32, height }}
                  className="absolute rounded-xl border border-[#cbb48c]/80 bg-gradient-to-r from-[#efe1c4]/65 via-[#f7eedb]/40 to-[#efe1c4]/65 px-4 py-2 pointer-events-none"
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-[#d7c39f]/70 pb-1">
                    <span className="text-xs font-bold song-serif text-[#4a2f16] tracking-wide">
                      {band.title}
                    </span>
                    <span className="text-[11px] text-[#6b5235]">{band.subtitle}</span>
                  </div>
                </div>
              )
            })}

            {/* 2. 正交国策连线 SVG 层 */}
            <svg
              width={CANVAS_W}
              height={CANVAS_H}
              className="absolute inset-0 pointer-events-none overflow-visible"
            >
              <defs>
                <marker
                  id="qt-arrow-base"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b7352" />
                </marker>
                <marker
                  id="qt-arrow-highlight"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8.5 5 L 0 9 z" fill="#9c2318" />
                </marker>
                <marker
                  id="qt-arrow-done"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8.5 5 L 0 9 z" fill="#1f6b4a" />
                </marker>
              </defs>

              {FOCUS_EDGES.map((edge) => {
                const src = FOCUS_NODE_MAP[edge.from]
                const dst = FOCUS_NODE_MAP[edge.to]
                if (!src || !dst) return null

                const x1 = colX(src.col) + NODE_W / 2
                const y1 = rowY(src.row) + NODE_H
                const x2 = colX(dst.col) + NODE_W / 2
                const y2 = rowY(dst.row)
                const midY = y1 + (y2 - y1) * 0.5
                const d =
                  x1 === x2
                    ? `M ${x1} ${y1} L ${x2} ${y2 - 3}`
                    : `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2 - 3}`

                const focusId = hoveredId ?? selectedId
                const isBothDone =
                  effectiveCompleted.has(edge.from) && effectiveCompleted.has(edge.to)
                const isFocusEdge = edge.from === focusId || edge.to === focusId
                const dimmed =
                  !matchesSearchOrFilter(src) && !matchesSearchOrFilter(dst)

                const stroke = isBothDone
                  ? '#1f6b4a'
                  : isFocusEdge
                    ? '#9c2318'
                    : '#937b58'
                const strokeWidth = isBothDone || isFocusEdge ? 2.6 : 1.75
                const markerEnd = isBothDone
                  ? 'url(#qt-arrow-done)'
                  : isFocusEdge
                    ? 'url(#qt-arrow-highlight)'
                    : 'url(#qt-arrow-base)'

                return (
                  <path
                    key={`${edge.from}->${edge.to}`}
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={edge.type === 'dashed' ? '6 4' : undefined}
                    markerEnd={markerEnd}
                    opacity={dimmed ? 0.16 : isBothDone || isFocusEdge ? 1 : 0.72}
                  />
                )
              })}
            </svg>

            {/* 3. HOI4 风格互斥惊叹号桥接标记 (!) */}
            {MUTEX_BRIDGES.map((m) => {
              const leftNode = FOCUS_NODE_MAP[m.left]
              const rightNode = FOCUS_NODE_MAP[m.right]
              if (!leftNode || !rightNode) return null
              const xLeft = colX(leftNode.col) + NODE_W
              const xRight = colX(rightNode.col)
              const cy = rowY(leftNode.row) + NODE_H / 2
              const bridgeW = Math.max(16, xRight - xLeft)
              return (
                <div
                  key={`${m.left}-${m.right}`}
                  style={{ left: xLeft, top: cy - 10, width: bridgeW }}
                  title={m.label}
                  className="absolute h-5 flex items-center justify-center z-10"
                >
                  <div className="w-full border-t-2 border-dashed border-[#a83226]/75 absolute top-1/2 -translate-y-1/2 pointer-events-none" />
                  <span className="relative z-10 px-1.5 py-0.5 rounded-full bg-[#8f1d14] text-[#fff8ee] border border-[#f5cb5c] text-[10px] font-extrabold leading-none shadow">
                    !
                  </span>
                </div>
              )
            })}

            {/* 4. 40 枚国策任务牌匾节点 */}
            {FOCUS_NODES.map((node) => {
              const st = statusByNodeId[node.id] ?? 'locked'
              const stMeta = STATUS_META[st]
              const facMeta = FACTION_META[node.faction]
              const isSelected = selectedId === node.id
              const isHovered = hoveredId === node.id
              const isConnected = connectedFocusSet.has(node.id)
              const matches = matchesSearchOrFilter(node)

              return (
                <button
                  key={node.id}
                  type="button"
                  style={{
                    left: colX(node.col),
                    top: rowY(node.row),
                    width: NODE_W,
                    height: NODE_H,
                  }}
                  onMouseEnter={(e) => {
                    setPointerPos({ x: e.clientX, y: e.clientY })
                    setHoveredId(node.id)
                  }}
                  onMouseMove={(e) => {
                    setPointerPos({ x: e.clientX, y: e.clientY })
                  }}
                  onMouseLeave={() => {
                    setHoveredId((prev) => (prev === node.id ? null : prev))
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (dragRef.current.moved) return
                    setSelectedId(node.id)
                    if (simMode) {
                      handleToggleSimNode(node)
                    }
                  }}
                  className={`absolute rounded-lg border-2 text-left overflow-hidden transition-transform duration-100 cursor-pointer focus:outline-none ${
                    stMeta.cardCls
                  } ${
                    isSelected
                      ? 'ring-2 ring-[#781710] ring-offset-2 ring-offset-[#f3e8d2] z-20 -translate-y-0.5'
                      : isHovered
                        ? 'border-[#8f1d14] z-20 -translate-y-0.5'
                        : 'z-10'
                  } ${
                    !matches
                      ? 'opacity-20 grayscale'
                      : hoveredId && !isConnected
                        ? 'opacity-75'
                        : ''
                  }`}
                >
                  {/* 顶部势力绶带 */}
                  <div className={`h-1.5 w-full ${facMeta.barBg}`} />

                  <div className="p-2 flex flex-col justify-between h-[calc(100%-6px)]">
                    {/* 上半：徽记 + 标题 */}
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-7 h-7 rounded border border-[#d6b77c]/80 flex items-center justify-center font-bold song-serif text-sm shrink-0 shadow-inner ${facMeta.sealBg} ${facMeta.sealText}`}
                      >
                        {node.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold song-serif text-[13px] leading-tight text-[#23180f] truncate">
                          {node.title}
                        </div>
                        <div className="text-[11px] text-[#6b5235] truncate mt-0.5">
                          {node.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* 下半：类型代号 + 状态印章 */}
                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#d8c6a5]/70">
                      <span className="text-[10px] font-mono text-[#7a5f3e] truncate">
                        {node.kind}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded border text-[10px] font-bold leading-none shrink-0 ${stMeta.pillCls}`}
                      >
                        {st === 'locked' ? (
                          <span className="inline-flex items-center gap-0.5">
                            <Lock className="w-2.5 h-2.5" />
                            {stMeta.label}
                          </span>
                        ) : (
                          stMeta.label
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 右侧：选中节点详情卷宗抽屉 */}
        {drawerOpen && (
          <div className="w-80 xl:w-96 shrink-0 h-full rounded-lg bg-[#faf3e3] border border-[#c8b28e] flex flex-col overflow-hidden">
            {/* 头部 */}
            <div className="p-3 bg-[#efe4cc] border-b border-[#c8b28e] space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#261910] text-[#f5d08a]">
                  {selectedNode.factionLabel}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded border ${STATUS_META[selectedStatus].pillCls}`}
                >
                  {STATUS_META[selectedStatus].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center font-bold song-serif text-base shrink-0 ${FACTION_META[selectedNode.faction].sealBg} ${FACTION_META[selectedNode.faction].sealText}`}
                >
                  {selectedNode.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold song-serif text-base text-[#23180f] leading-snug">
                    {selectedNode.title}
                  </h4>
                  <div className="text-[11px] font-mono text-[#7a5f3e]">{selectedNode.code}</div>
                </div>
              </div>
            </div>

            {/* 详情滚动体 */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs leading-relaxed">
              {/* 快捷动作栏 */}
              <div className="flex flex-wrap gap-1.5">
                {resolvedLocateTarget && (
                  <button
                    type="button"
                    onClick={() => locateQuestTargetOnMap(resolvedLocateTarget)}
                    className="px-2.5 py-1.5 rounded bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff8ee] font-bold song-serif flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>
                      舆图定位：
                      {resolvedLocateTarget.customLabel ??
                        REGION_DB_MAP[resolvedLocateTarget.regionId]?.name ??
                        resolvedLocateTarget.regionId}{' '}
                      ▸
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => centerOnNode(selectedNode.id)}
                  className="px-2.5 py-1.5 rounded bg-[#efe4cc] hover:bg-[#e3d2b1] border border-[#c8b28e] text-[#3d2814] font-bold song-serif cursor-pointer"
                >
                  画布居中
                </button>
                {selectedNode.questId && (
                  <button
                    type="button"
                    onClick={() => setMenuTab('quests')}
                    className="px-2.5 py-1.5 rounded bg-[#efe4cc] hover:bg-[#e3d2b1] border border-[#c8b28e] text-[#781710] font-bold song-serif cursor-pointer"
                  >
                    查阅纪事卷宗
                  </button>
                )}
              </div>

              {/* 1. 触发与前置条件 */}
              <div className="p-2.5 rounded bg-[#f5ecd9] border border-[#d8c49e] space-y-1">
                <div className="font-bold song-serif text-[#781710] flex items-center gap-1">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>触发与前置要求</span>
                </div>
                <ul className="space-y-1 text-[#3d2814]">
                  {selectedNode.prereqs.map((req) => (
                    <li key={req} className="flex items-start gap-1.5">
                      <span className="text-[#8f1d14] font-bold shrink-0">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. 执行流程纪要 */}
              <div className="p-2.5 rounded bg-[#fffbf2] border border-[#dfd0b2] space-y-1">
                <div className="font-bold song-serif text-[#355263]">执行流程与考校要点</div>
                <ol className="space-y-1.5 list-decimal list-inside text-[#2d1e10]">
                  {selectedNode.steps.map((stText) => (
                    <li key={stText}>{stText}</li>
                  ))}
                </ol>
              </div>

              {/* 3. 完成奖励与仕途效果 */}
              <div className="p-2.5 rounded bg-[#eef7f1] border border-[#a5cfb5] space-y-1">
                <div className="font-bold song-serif text-[#1f4d3b]">完成奖励与仕途影响</div>
                <ul className="space-y-1 text-[#193d2e]">
                  {selectedNode.rewards.map((rw) => (
                    <li key={rw} className="flex items-start gap-1.5">
                      <span className="text-[#1f4d3b] font-bold shrink-0">✦</span>
                      <span>{rw}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. 警示 */}
              {selectedNode.warning && (
                <div className="p-2.5 rounded bg-[#f8e3e1] border border-[#d6887f] text-[#781710] space-y-0.5">
                  <div className="font-bold song-serif">军纪死限 / 路线互斥警示</div>
                  <div>{selectedNode.warning}</div>
                </div>
              )}

              {/* 5. 上下游关联节点跳转 */}
              {(selectedUpstream.length > 0 || selectedDownstream.length > 0) && (
                <div className="pt-2 border-t border-[#dfd0b2] space-y-2">
                  {selectedUpstream.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-[#6b5235] mb-1">
                        上游前置节点（点击定位）：
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedUpstream.map((up) => (
                          <button
                            key={up.id}
                            type="button"
                            onClick={() => {
                              setSelectedId(up.id)
                              centerOnNode(up.id)
                            }}
                            className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d0ad] border border-[#c8b28e] text-[11px] font-bold song-serif text-[#3d2814] cursor-pointer"
                          >
                            ↑ {up.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDownstream.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-[#6b5235] mb-1">
                        下游解锁节点（点击定位）：
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedDownstream.map((dn) => (
                          <button
                            key={dn.id}
                            type="button"
                            onClick={() => {
                              setSelectedId(dn.id)
                              centerOnNode(dn.id)
                            }}
                            className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d0ad] border border-[#c8b28e] text-[11px] font-bold song-serif text-[#781710] cursor-pointer"
                          >
                            ↓ {dn.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 欧陆风云 / 钢铁雄心风格鼠标悬停浮动前置检视框 (Portal 防裁剪) */}
      {hoveredNode &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            style={tooltipStyle}
            className="fixed z-[9999] pointer-events-none rounded-lg bg-[#1e150e]/96 text-[#faf2e1] border-2 border-[#b89249] shadow-[0_12px_32px_rgba(0,0,0,0.55)] p-3 space-y-2 text-xs leading-relaxed"
          >
            {/* Tooltip Header */}
            <div className="border-b border-[#594327] pb-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#dfbe7d] font-semibold">
                  {hoveredNode.factionLabel}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${STATUS_META[hoveredStatus].tooltipBadgeCls}`}
                >
                  {STATUS_META[hoveredStatus].label}
                </span>
              </div>
              <div className="font-bold song-serif text-sm text-[#fff7e6] mt-0.5">
                {hoveredNode.title}
              </div>
              <div className="text-[11px] font-mono text-[#bca47c]">
                {hoveredNode.code} · {hoveredNode.subtitle}
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <div className="text-[11px] font-bold song-serif text-[#f5cb5c] mb-0.5">
                ◆ 触发与前置条件：
              </div>
              <ul className="space-y-0.5 text-[11px] text-[#f2e6cf]">
                {hoveredNode.prereqs.map((req) => (
                  <li key={req} className="flex items-start gap-1.5">
                    <span className="text-[#f5cb5c] shrink-0">▸</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rewards */}
            <div className="border-t border-[#47351f] pt-1.5">
              <div className="text-[11px] font-bold song-serif text-[#83dca8] mb-0.5">
                ✦ 完成效果与奖励：
              </div>
              <ul className="space-y-0.5 text-[11px] text-[#dff5e7]">
                {hoveredNode.rewards.map((rw) => (
                  <li key={rw} className="flex items-start gap-1.5">
                    <span className="text-[#83dca8] shrink-0">+</span>
                    <span>{rw}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning */}
            {hoveredNode.warning && (
              <div className="p-1.5 rounded bg-[#5c1914]/85 border border-[#b54c43] text-[11px] text-[#ffdedb]">
                <strong className="text-[#ffb3ab]">警示：</strong>
                {hoveredNode.warning}
              </div>
            )}

            <div className="text-[10px] text-[#a9926c] pt-0.5 flex items-center justify-between border-t border-[#3b2c1a]">
              <span>点击节点固定右侧卷宗详单</span>
              {simMode && <span>推演模式下点击可点亮/互斥</span>}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
