import { UNIQUE_ARTIFACT_MAP } from '../../data/gameDb'
import {
  ITEM_DB_MAP,
  ITEMS_DB,
  NON_GIFTABLE_KEY_ITEM_IDS,
  normalizeItemTier,
} from '../../data/itemsDb'
import type {
  ActiveEscortContract,
  CompiledMartialArtRecord,
  GameItemDef,
  InventoryStack,
  NodeNpc,
  TerrainType,
  VocationKey,
} from '../../types/game'
import { defaultRng } from '../combat/rng'
import { makeQuestNpc } from '../npcFactory'
import {
  findBestRoute,
  NODE_MAP,
  type SpeedParams,
  WORLD_GRAPH,
} from '../world/mapMath'

// ============================================================================
// 一、 买卖折算与【算术】被动加成
// ============================================================================

/** 基础卖出回收折率：40% */
export const BASE_ITEM_SELL_RATIO = 0.4

/** 允许自由折银兑现的特殊商贸杂物（大宋交子铺银票） */
const SELLABLE_MISC_ITEM_IDS = new Set<string>(['ITM-MSC-002'])

/**
 * 判断行囊物品是否允许向商铺卖出（任务信物、门派荐书、通关文牒、秘境舆图等严禁误卖）
 */
export function isItemSellable(itemId: string, itemDef?: GameItemDef | null): boolean {
  const def = itemDef ?? ITEM_DB_MAP[itemId]
  if (!def || def.value <= 0) return false
  if (NON_GIFTABLE_KEY_ITEM_IDS.has(itemId)) return false
  if (/^ITM-MSC-/i.test(itemId) && !SELLABLE_MISC_ITEM_IDS.has(itemId)) {
    return false
  }
  return true
}

/** 算术买入折扣比例：min(20%, 算术 / 5 %) */
export function computeArithmeticBuyDiscountRatio(arithmeticSkill: number): number {
  return Math.min(0.2, Math.max(0, arithmeticSkill) / 500)
}

/** 算术卖出溢价比例：+算术 / 10 % */
export function computeArithmeticSellBonusRatio(arithmeticSkill: number): number {
  return Math.max(0, arithmeticSkill) / 1000
}

/** 计算商铺实际买进单价（叠加算术折扣） */
export function computeShopBuyPrice(basePrice: number, arithmeticSkill = 0): number {
  if (basePrice <= 0) return 0
  const discount = computeArithmeticBuyDiscountRatio(arithmeticSkill)
  return Math.max(1, Math.round(basePrice * (1 - discount)))
}

/** 计算物品卖出回收单价（基础 40% 叠加 +算术/10%） */
export function computeItemSellPrice(
  itemOrValue: GameItemDef | number,
  arithmeticSkill = 0,
): number {
  const rawVal = typeof itemOrValue === 'number' ? itemOrValue : itemOrValue.value
  if (rawVal <= 0) return 0
  const bonus = computeArithmeticSellBonusRatio(arithmeticSkill)
  return Math.max(1, Math.round(rawVal * BASE_ITEM_SELL_RATIO * (1 + bonus)))
}

// ============================================================================
// 二、 城市分级宿费与坐骑草料消耗
// ============================================================================

export type CityLodgingTier = 'capital' | 'prefecture' | 'frontier'

export interface RegionLodgingInfo {
  tier: CityLodgingTier
  tierLabel: string
  dailyCost: number
}

/** 四朝都城与大宋三京（2 两/日） */
const CAPITAL_REGION_IDS = new Set<string>([
  'bianliang', // 东京开封府
  'luoyang', // 西京洛阳府
  'daming', // 北京大名府
  'xijin_liao', // 辽南京析津府
  'linhuang_liao', // 辽上京临潢府
  'xingqing_xixia', // 西夏中兴兴庆府
  'luoxie_tubo', // 吐蕃逻些圣城
  'dali_city', // 大理阳苴咩城
])

/** 塞北重镇与西北边城（1 两/日；其余关隘与名门山门亦按 1 两/日计） */
const FRONTIER_CITY_IDS = new Set<string>([
  'yanan', // 延安府
  'qinzhou', // 秦州府
  'zhending', // 真定府
  'taiyuan', // 太原府
  'dading_liao', // 辽中京大定府
  'liaoyang_liao', // 辽东京辽阳府
])

/**
 * 按地区获取每日宿费分级：
 * 以门派俸禄为物价锚（六扇门役卒月俸 30 两 ≈ 1 两/日，常山枪派新兵 15 两/月）：
 * - 京城：2 两/日
 * - 州府：1 两/日
 * - 边镇 / 关隘 / 山门：1 两/日
 */
export function getRegionLodgingInfo(regionId: string): RegionLodgingInfo {
  if (CAPITAL_REGION_IDS.has(regionId)) {
    return { tier: 'capital', tierLabel: '京城上房', dailyCost: 2 }
  }
  const node = NODE_MAP[regionId]
  if (FRONTIER_CITY_IDS.has(regionId) || (node && node.type !== 'city')) {
    return { tier: 'frontier', tierLabel: '边镇山门', dailyCost: 1 }
  }
  return { tier: 'prefecture', tierLabel: '州府邸店', dailyCost: 1 }
}

export function getDailyMountFodderSilver(_equippedMountId?: string | null): number {
  return 0
}

export function getDailyMountTravelFoodCost(_equippedMountId?: string | null): number {
  return 0
}

// ============================================================================
// 三、 先天禀赋（颜值）与十艺被动公式
// ============================================================================

/** 颜值决定初始好感：round((颜值 - 50) / 5) */
export function computeInitialNpcFavor(charm: number): number {
  return Math.round((charm - 50) / 5)
}

/** 读取某位 NPC 当前好感（若尚未结交，则按主角当前颜值返回初始印象好感） */
export function resolveNpcFavor(
  npcFavorMap: Record<string, number> | undefined,
  npcKey: string,
  charm: number,
): number {
  if (npcFavorMap && Object.prototype.hasOwnProperty.call(npcFavorMap, npcKey)) {
    return npcFavorMap[npcKey] ?? 0
  }
  return computeInitialNpcFavor(charm)
}

/** 颜值赠礼与设宴好感倍率：1 + (颜值 - 50) / 250 */
export function computeCharmFavorMultiplier(charm: number): number {
  return Math.max(0.5, 1 + (charm - 50) / 250)
}

/** 辩才交谈好感增益：rand(-1, 3) + 辩才 / 30 */
export function computeTalkFavorDelta(
  eloquenceSkill: number,
  rng: () => number = defaultRng,
): { rawRoll: number; bonus: number; delta: number } {
  const clampedRng = Math.min(0.999999, Math.max(0, rng()))
  const rawRoll = Math.floor(clampedRng * 5) - 1 // 均匀取整数 -1..3
  const bonus = Math.max(0, eloquenceSkill) / 30
  const delta = Math.round(rawRoll + bonus)
  return { rawRoll, bonus, delta }
}

/** 辩才拦路劫匪不战劝退率：辩才 / 150（上限 95%） */
export function computeHighwaymanPersuadeChance(eloquenceSkill: number): number {
  return Math.min(0.95, Math.max(0, eloquenceSkill) / 150)
}

/** 经义内功闭关修炼速度倍率：1 + 经义 / 400 */
export function computeJingyiNeigongMultiplier(jingyiSkill: number): number {
  return 1 + Math.max(0, jingyiSkill) / 400
}

/** 策论月俸与朝廷缉拿赏格倍率：1 + 策论 / 200 */
export function computeCelunMultiplier(celunSkill: number): number {
  return 1 + Math.max(0, celunSkill) / 200
}

export function computeCelunBonusAmount(baseSilver: number, celunSkill = 0): number {
  if (baseSilver <= 0) return 0
  return Math.max(1, Math.round(baseSilver * computeCelunMultiplier(celunSkill)))
}

/** 诗词名楼名山题壁声望收益：max(1, round(诗词 / 10)) */
export function computePoemRenownGain(poetrySkill: number): number {
  return Math.max(1, Math.round(Math.max(0, poetrySkill) / 10))
}

/** 琴艺对【音功】招式伤害增幅：+琴 / 4 % */
export function computeQinSoundAmpPct(qinSkill: number): number {
  return Math.max(0, qinSkill) / 400
}

/** 书法对【笔法/书帖】招式伤害增幅：+书 / 5 % */
export function computeShuBrushAmpPct(shuSkill: number): number {
  return Math.max(0, shuSkill) / 500
}

/** 判定招式是否属于音律武学（受【琴】增伤） */
export function isSoundMartialArt(art: CompiledMartialArtRecord | null | undefined): boolean {
  if (!art) return false
  if (art.category === '音功' || art.id === 'MA-070') return true
  return /琴|箫|音|曲|啸/.test(art.cleanName)
}

/** 判定招式是否属于笔法/法帖武学（受【书】增伤） */
export function isBrushMartialArt(
  art: CompiledMartialArtRecord | null | undefined,
  weaponId?: string | null,
): boolean {
  if (!art) return false
  if (art.id === 'MA-096' || /笔|帖|书|墨/.test(art.cleanName)) return true
  if (
    (weaponId === 'WPN-023' || weaponId === 'WPN-060') &&
    (art.category === '奇门' || art.category === '剑法')
  ) {
    return true
  }
  return false
}

// ============================================================================
// 四、 设宴结交（NPC 社交支出）
// ============================================================================

export type BanquetTierKey = 'standard' | 'grand'

export interface BanquetTierDef {
  key: BanquetTierKey
  label: string
  cost: number
  baseFavor: number
  desc: string
}

export const BANQUET_TIERS: Record<BanquetTierKey, BanquetTierDef> = {
  standard: {
    key: 'standard',
    label: '雅酌小宴',
    cost: 18,
    baseFavor: 8,
    desc: '清酒时鲜小酌叙话，耗 18 两纹银',
  },
  grand: {
    key: 'grand',
    label: '珍馐华筵',
    cost: 45,
    baseFavor: 18,
    desc: '名楼雅阁张筵款待，耗 45 两纹银',
  },
}

export function computeBanquetFavorGain(
  tier: BanquetTierKey,
  playerCharm: number,
  likesTeaWine: boolean,
): { cost: number; favorDelta: number; charmMult: number } {
  const def = BANQUET_TIERS[tier]
  const charmMult = computeCharmFavorMultiplier(playerCharm)
  const prefMult = likesTeaWine ? 1.25 : 1.0
  const favorDelta = Math.max(2, Math.round(def.baseFavor * charmMult * prefMult))
  return {
    cost: def.cost,
    favorDelta,
    charmMult,
  }
}

// ============================================================================
// 五、 大相国寺万姓雅市 · 月度奇珍拍卖
// ============================================================================

export interface XiangguoAuctionLot {
  itemId: string
  item: GameItemDef
  estimatePrice: number
  finalPrice: number
  discountSaved: number
  lotCategoryLabel: string
}

const AUCTION_CANDIDATE_POOLS: {
  weaponsAndGear: GameItemDef[]
  scrolls: GameItemDef[]
  elixirs: GameItemDef[]
  mountsAndCurios: GameItemDef[]
} = (() => {
  const isAuctionEligible = (it: GameItemDef): boolean => {
    if (!isItemSellable(it.id, it)) return false
    // 有主孤品（名宿随身神兵、御赐宝马、门派秘藏灵丹等）只经剧情 / 名宿获取，不进拍场以免出现双份
    if (UNIQUE_ARTIFACT_MAP[it.id]) return false
    const tier = normalizeItemTier(it.rarity)
    // 拍场最高只到地阶：天阶神物一律不入拍
    if (tier === '天阶') return false
    // 精选地阶重宝与高价良阶上品奇珍进入拍场，保留天阶唯一神兵于专属剧情与名宿手中；
    // 地阶兵甲与灵丹皆为有主孤品，故兵甲 / 灵丹两栏以良阶上品补位（披挂 ≥ 60 两、良阶丹药）
    if (tier === '地阶') return it.value >= 120
    if (tier === '良阶') {
      if (it.value >= 140) return true
      if (it.equipSlot && it.equipSlot !== 'mount') return it.value >= 60
      return it.category === 'medicine'
    }
    return false
  }

  const eligible = ITEMS_DB.filter(isAuctionEligible)
  return {
    weaponsAndGear: eligible.filter(
      (it) =>
        it.equipSlot === 'weapon' ||
        it.equipSlot === 'armor' ||
        it.equipSlot === 'shoes' ||
        it.equipSlot === 'bow' ||
        it.equipSlot === 'accessory1' ||
        it.equipSlot === 'accessory2',
    ),
    scrolls: eligible.filter((it) => it.category === 'scrolls'),
    elixirs: eligible.filter((it) => it.category === 'medicine'),
    mountsAndCurios: eligible.filter(
      (it) => it.equipSlot === 'mount' || it.category === 'tools',
    ),
  }
})()

/** 大相国寺拍品起价 = 物品价值 × 3（另享【算术】采办折扣） */
export const XIANGGUO_AUCTION_PRICE_MULT = 3

function seededIndex(seed: number, salt: number, length: number): number {
  if (length <= 0) return 0
  const h = Math.imul(seed * 31 + salt * 997 + 17, 2654435761) >>> 0
  return h % length
}

export interface XiangguoAuctionSchedule {
  yearIdx: number
  monthOfYear: number
  isOpen: boolean
  monthsUntilOpen: number
}

/**
 * 大相国寺万姓雅市奇珍拍卖改为每年一次，于每年【六月】（第 6 月）开市一整个月
 */
export function getXiangguoAuctionSchedule(dayCount: number): XiangguoAuctionSchedule {
  const zeroIdx = Math.max(0, Math.floor(dayCount) - 1)
  const yearIdx = Math.floor(zeroIdx / 360)
  const monthOfYear = Math.floor((zeroIdx % 360) / 30) + 1 // 1..12
  const isOpen = monthOfYear === 6
  const monthsUntilOpen = monthOfYear <= 6 ? 6 - monthOfYear : 18 - monthOfYear
  return {
    yearIdx,
    monthOfYear,
    isOpen,
    monthsUntilOpen,
  }
}

/**
 * 按当前年份索引生成大相国寺当年六月 4 件拍品（神兵披挂 / 秘籍孤本 / 灵丹妙药 / 良驹雅器）
 */
export function getXiangguoMonthlyAuctionLots(
  yearOrMonthIdx: number,
  arithmeticSkill = 0,
  excludedItemIds?: ReadonlySet<string>,
): XiangguoAuctionLot[] {
  const buckets: Array<{ label: string; pool: GameItemDef[]; salt: number }> = [
    { label: '兵甲重器', pool: AUCTION_CANDIDATE_POOLS.weaponsAndGear, salt: 11 },
    { label: '孤本秘卷', pool: AUCTION_CANDIDATE_POOLS.scrolls, salt: 29 },
    { label: '宫闱灵丹', pool: AUCTION_CANDIDATE_POOLS.elixirs, salt: 53 },
    { label: '名驹雅器', pool: AUCTION_CANDIDATE_POOLS.mountsAndCurios, salt: 79 },
  ]

  const pickedIds = new Set<string>()
  const lots: XiangguoAuctionLot[] = []

  for (const bucket of buckets) {
    const filtered = bucket.pool.filter(
      (it) => !pickedIds.has(it.id) && !(excludedItemIds?.has(it.id) ?? false),
    )
    if (filtered.length === 0) continue
    const idx = seededIndex(Math.max(0, yearOrMonthIdx), bucket.salt, filtered.length)
    const item = filtered[idx]
    if (!item) continue
    pickedIds.add(item.id)
    const estimatePrice = Math.round(item.value * XIANGGUO_AUCTION_PRICE_MULT)
    const finalPrice = computeShopBuyPrice(estimatePrice, arithmeticSkill)
    lots.push({
      itemId: item.id,
      item,
      estimatePrice,
      finalPrice,
      discountSaved: Math.max(0, estimatePrice - finalPrice),
      lotCategoryLabel: bucket.label,
    })
  }

  return lots
}

// ============================================================================
// 六、 名楼名山题壁（【诗词】一次性声望打卡）
// ============================================================================

export interface LandmarkPoemSpotDef {
  buildingId: string
  title: string
  verseSample: string
}

export const LANDMARK_POEM_SPOTS: Record<string, LandmarkPoemSpotDef> = {
  bl_fanlou: {
    buildingId: 'bl_fanlou',
    title: '东京樊楼 · 飞阁题词',
    verseSample: '凤箫声动玉壶光，十二珠帘夜未央。',
  },
  hzf_tengwang: {
    buildingId: 'hzf_tengwang',
    title: '洪州滕王阁 · 临江赋诗',
    verseSample: '落霞孤鹜齐飞处，秋水长天共一色。',
  },
  tzf_tianxin: {
    buildingId: 'tzf_tianxin',
    title: '潭州天心阁 · 楚天题壁',
    verseSample: '城南杰阁瞰湘流，万里衡云入望收。',
  },
  tzf_yuelu: {
    buildingId: 'tzf_yuelu',
    title: '岳麓书院 · 讲堂留句',
    verseSample: '惟楚有材兴讲席，满山枫叶读书声。',
  },
  ya_pagoda: {
    buildingId: 'ya_pagoda',
    title: '延安嘉岭宝塔 · 塞上勒铭',
    verseSample: '孤城百战胡笳月，老范胸中十万兵。',
  },
  hz_tide: {
    buildingId: 'hz_tide',
    title: '钱塘观潮台 · 怒涛豪吟',
    verseSample: '八月涛声吼地来，头高数丈触山回。',
  },
  hz_lingyin: {
    buildingId: 'hz_lingyin',
    title: '灵隐飞来峰 · 摩崖留墨',
    verseSample: '桂子月中落，天香云外飘。',
  },
  sz_hanshan: {
    buildingId: 'sz_hanshan',
    title: '枫桥寒山寺 · 诗碑续韵',
    verseSample: '姑苏城外寒山寺，夜半钟声到客船。',
  },
  jn2_qixia: {
    buildingId: 'jn2_qixia',
    title: '金陵栖霞山 · 千佛题咏',
    verseSample: '六朝烟水钟山秀，千佛丹枫映晚秋。',
  },
  xy_wall: {
    buildingId: 'xy_wall',
    title: '襄阳雄城楼 · 凭栏长啸',
    verseSample: '汉水东流接大江，铁城高峙锁荆襄。',
  },
  ym_tower: {
    buildingId: 'ym_tower',
    title: '雁门雄关 · 戍楼题壁',
    verseSample: '黑云压城城欲摧，朔风吹雪满龙堆。',
  },
  jm_gate: {
    buildingId: 'jm_gate',
    title: '剑门箭楼 · 蜀道留诗',
    verseSample: '剑阁峥嵘而崔嵬，一夫当关万夫莫开。',
  },
  jm_pine: {
    buildingId: 'jm_pine',
    title: '翠云廊驿亭 · 古柏题句',
    verseSample: '三百里程十万树，翠云深处听铃声。',
  },
  ts_yuhuang: {
    buildingId: 'ts_yuhuang',
    title: '泰山玉皇顶 · 登封长歌',
    verseSample: '会当凌绝顶，一览众山小。',
  },
  tg_summit: {
    buildingId: 'tg_summit',
    title: '华山绝顶 · 论剑题崖',
    verseSample: '只有天在上，更无山与齐。',
  },
  em_jinding: {
    buildingId: 'em_jinding',
    title: '峨眉金顶 · 云海题诗',
    verseSample: '峨眉山月半轮秋，金顶祥光万里浮。',
  },
  wd_golden: {
    buildingId: 'wd_golden',
    title: '武当太和金殿 · 柱石留墨',
    verseSample: '七十二峰朝大顶，紫霄云海荡松风。',
  },
  kl_summit: {
    buildingId: 'kl_summit',
    title: '昆仑瑶池雪台 · 冰峰铭句',
    verseSample: '横空出世莽昆仑，万古寒冰接帝阍。',
  },
  wl_yubi: {
    buildingId: 'wl_yubi',
    title: '澜沧无量玉壁 · 仙崖题咏',
    verseSample: '剑影仙姿映碧潭，空山明月照无量。',
  },
  qzf_maijishan: {
    buildingId: 'qzf_maijishan',
    title: '秦州麦积烟雨 · 栈阁留诗',
    verseSample: '麦积凌空千佛龛，陇头烟雨暗松杉。',
  },
}

export function getLandmarkPoemSpot(buildingId: string | null | undefined): LandmarkPoemSpotDef | null {
  if (!buildingId) return null
  return LANDMARK_POEM_SPOTS[buildingId] ?? null
}

// ============================================================================
// 七、 职业化当差（复用十艺：账房 / 塾师 / 卖字画 / 讼师）
// ============================================================================

export interface VocationDef {
  key: VocationKey
  name: string
  roleLabel: string
  formulaText: string
  primaryArtLabel: string
  minSkillRequired: number
  desc: string
}

export const VOCATION_DEFS: Record<VocationKey, VocationDef> = {
  accountant: {
    key: 'accountant',
    name: '账房掌算',
    roleLabel: '邸店商号账房',
    formulaText: '0.015 × 算术 两/日（算术 100 约 45 两/月）',
    primaryArtLabel: '算术',
    minSkillRequired: 20,
    desc: '替客栈商号勾稽流水、核算子母银票，食宿自理，按日支取薪俸。',
  },
  tutor: {
    key: 'tutor',
    name: '书院塾师',
    roleLabel: '蒙馆经义讲席',
    formulaText: '0.014 × 经义 两/日（经义 100 约 42 两/月）',
    primaryArtLabel: '经义',
    minSkillRequired: 20,
    desc: '于书院蒙馆开讲四书五经、批阅童生课艺，束脩丰俭随经义造诣而增。',
  },
  calligrapher: {
    key: 'calligrapher',
    name: '悬润卖字画',
    roleLabel: '市肆挥毫丹青',
    formulaText: '0.015 × max(书, 画) 两/日（满级约 45 两/月）',
    primaryArtLabel: '书/画',
    minSkillRequired: 20,
    desc: '设案代写春帖子、中堂条幅与扇面丹青，笔墨精妙则润格倍增。',
  },
  litigator: {
    key: 'litigator',
    name: '公门讼师',
    roleLabel: '衙前代书状师',
    formulaText: '0.015 × 辩才 两/日（辩才 100 约 45 两/月）',
    primaryArtLabel: '辩才',
    minSkillRequired: 30,
    desc: '于州府衙前替百姓草拟诉状、剖析刑名律例，全凭三寸不烂之舌博取酬金。',
  },
}

/** 计算指定职业的精确日薪（保留两位小数，结算整日时四舍五入） */
export function calcVocationDailyWage(
  vocationKey: VocationKey,
  skills: Record<string, number>,
): number {
  const arith = Math.max(0, skills['算术'] ?? 0)
  const jingyi = Math.max(0, skills['经义'] ?? 0)
  const shu = Math.max(0, skills['书'] ?? 0)
  const hua = Math.max(0, skills['画'] ?? 0)
  const biancai = Math.max(0, skills['辩才'] ?? 0)

  switch (vocationKey) {
    // 以门派俸禄为锚：文职满级约 45 两/月，与常山枪派三阶月俸（50 两）相当，不超过官面当差
    case 'accountant':
      return Number((0.015 * arith).toFixed(2))
    case 'tutor':
      return Number((0.014 * jingyi).toFixed(2))
    case 'calligrapher':
      return Number((0.015 * Math.max(shu, hua)).toFixed(2))
    case 'litigator':
      return Number((0.015 * biancai).toFixed(2))
  }
}

export function checkVocationSkillMet(
  vocationKey: VocationKey,
  skills: Record<string, number>,
): { ok: boolean; reason: string | null } {
  const def = VOCATION_DEFS[vocationKey]
  const val =
    vocationKey === 'accountant'
      ? (skills['算术'] ?? 0)
      : vocationKey === 'tutor'
        ? (skills['经义'] ?? 0)
        : vocationKey === 'calligrapher'
          ? Math.max(skills['书'] ?? 0, skills['画'] ?? 0)
          : (skills['辩才'] ?? 0)
  if (val < def.minSkillRequired) {
    return {
      ok: false,
      reason: `需【${def.primaryArtLabel}】造诣 ≥ ${def.minSkillRequired} 方可担任【${def.name}】`,
    }
  }
  return { ok: true, reason: null }
}

/** 根据当前所处建筑匹配可承接的文职打工项 */
export function getAvailableVocationsForBuilding(
  buildingId: string | null | undefined,
  buildingName = '',
  actLabel = '',
): VocationKey[] {
  if (!buildingId) return []
  const text = `${buildingName} ${actLabel}`
  const list: VocationKey[] = []

  if (
    buildingId.endsWith('_base_inn') ||
    buildingId.endsWith('_base_tavern') ||
    buildingId === 'bl_fanlou' ||
    buildingId === 'bl_xiangguosi' ||
    /客栈|酒肆|茶坊|商|市|楼|集|榷场|柜坊/.test(text)
  ) {
    list.push('accountant')
  }

  if (
    buildingId.endsWith('_base_academy') ||
    /书院|国子监|太学|文庙|讲堂|藏书/.test(text)
  ) {
    list.push('tutor', 'calligrapher')
  } else if (
    buildingId === 'bl_xiangguosi' ||
    buildingId === 'bl_fanlou' ||
    buildingId.endsWith('_base_tavern') ||
    /雅市|书肆|茶坊|画院|碑林/.test(text)
  ) {
    list.push('calligrapher')
  }

  if (
    buildingId.endsWith('_base_yamen') ||
    buildingId === 'bl_kaifengfu' ||
    /衙|府尹|公堂|留守|按察|经略/.test(text)
  ) {
    list.push('litigator')
  }

  return Array.from(new Set(list))
}

/** 判断当前建筑是否提供【镖师走镖】榜文承接 */
export function isEscortVenueBuilding(
  buildingId: string | null | undefined,
  buildingName = '',
): boolean {
  if (!buildingId) return false
  if (buildingId.endsWith('_base_inn') || buildingId === 'qz_zhenyuan') return true
  return /镖局|客栈|馆驿|驿站|马市|榷场/.test(buildingName)
}

// ============================================================================
// 八、 镖师走镖榜文生成与劫镖绿林强人构造
// ============================================================================

const TERRAIN_ESCORT_DANGER: Record<TerrainType, number> = {
  official: 1.0,
  water: 1.25,
  steppe: 1.45,
  mountain: 1.65,
}

const ESCORT_CARGO_NAMES = [
  '川蜀锦缎红货箱',
  '三司折帛官银鞘',
  '建溪龙团贡茶担',
  '景德御窑青白瓷匣',
  '熟药所珍稀药材箱',
  '河东解盐引票铁匣',
]

export function getEscortDangerLabel(dangerCoeff: number): string {
  if (dangerCoeff >= 1.48) return '绝险山塞'
  if (dangerCoeff >= 1.3) return '风沙险途'
  if (dangerCoeff >= 1.15) return '水陆盘查'
  return '官道坦途'
}

/**
 * 为当前城市生成最多 3 单（近程 / 中程 / 远程）走镖红货榜文，按「里程 × 险度」计酬
 */
export function getAvailableEscortContracts(params: {
  originRegionId: string
  dayCount: number
  speedParams: SpeedParams
  inventory: ReadonlyArray<InventoryStack>
}): ActiveEscortContract[] {
  const { originRegionId, dayCount, speedParams, inventory } = params
  const originNode = NODE_MAP[originRegionId]
  if (!originNode) return []

  const monthIdx = Math.floor((Math.max(1, dayCount) - 1) / 30)
  const candidates: Array<{
    destId: string
    destName: string
    totalLi: number
    dangerCoeff: number
  }> = []

  for (const node of WORLD_GRAPH.nodes) {
    if (node.id === originRegionId) continue
    if (node.type === 'sect') continue
    const route = findBestRoute(originRegionId, node.id, speedParams, null, inventory)
    if (!route || route.totalLi <= 0 || route.segments.length === 0) continue

    let weightedDanger = 0
    for (const seg of route.segments) {
      weightedDanger += seg.dist * (TERRAIN_ESCORT_DANGER[seg.terrain] ?? 1.0)
    }
    const dangerCoeff = Number((weightedDanger / route.totalLi).toFixed(2))
    candidates.push({
      destId: node.id,
      destName: node.name,
      totalLi: route.totalLi,
      dangerCoeff,
    })
  }

  candidates.sort((a, b) => a.totalLi - b.totalLi)
  if (candidates.length === 0) return []

  const shortPool = candidates.filter((c) => c.totalLi <= 320)
  const midPool = candidates.filter((c) => c.totalLi > 320 && c.totalLi <= 680)
  const longPool = candidates.filter((c) => c.totalLi > 680)

  const originSeed = Array.from(originRegionId).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const buckets = [
    { pool: shortPool.length > 0 ? shortPool : candidates, salt: 7 },
    { pool: midPool.length > 0 ? midPool : candidates, salt: 23 },
    { pool: longPool.length > 0 ? longPool : candidates, salt: 47 },
  ]

  const chosenDestIds = new Set<string>()
  const contracts: ActiveEscortContract[] = []

  buckets.forEach((b, idx) => {
    const avail = b.pool.filter((c) => !chosenDestIds.has(c.destId))
    if (avail.length === 0) return
    const pick = avail[seededIndex(originSeed + monthIdx * 13, b.salt, avail.length)]
    if (!pick) return
    chosenDestIds.add(pick.destId)

    const cargoName =
      ESCORT_CARGO_NAMES[
        seededIndex(originSeed + monthIdx * 5 + idx, b.salt + 3, ESCORT_CARGO_NAMES.length)
      ] ?? '重宝红货镖箱'
    // 镖酬 = 里程 × 险度 × 0.015（近途约 3~6 两，千里险道约 15~25 两；以门派俸禄为物价锚）
    const rewardSilver = Math.max(3, Math.round(pick.totalLi * pick.dangerCoeff * 0.015))
    contracts.push({
      id: `ESC-${originRegionId}-${pick.destId}-M${monthIdx}`,
      cargoName,
      originRegionId,
      originName: originNode.name,
      destRegionId: pick.destId,
      destName: pick.destName,
      totalLi: pick.totalLi,
      dangerCoeff: pick.dangerCoeff,
      dangerLabel: getEscortDangerLabel(pick.dangerCoeff),
      rewardSilver,
      acceptedDay: dayCount,
      ambushResolved: false,
    })
  })

  return contracts
}

/** 构造走镖途中拦路劫镖的绿林头目战斗对象 */
export function buildEscortHighwaymanNpc(contract: ActiveEscortContract): NodeNpc {
  const isHighDanger = contract.dangerCoeff >= 1.35 || contract.totalLi >= 600
  return makeQuestNpc({
    id: `ESCORT_HIGHWAYMAN_${contract.id}`,
    name: isHighDanger ? '黑风寨劫镖头领' : '剪径夺镖响马',
    title: `${contract.dangerLabel} · 拦路劫镖巨寇`,
    realm: isHighDanger ? '二流中品' : '三流上品',
    factionName: '绿林响马',
    talk: `“呔！留下【${contract.cargoName}】，饶尔等性命；若敢护镖逞强，管教血溅五步！”`,
    stats: isHighDanger
      ? { hp: 1350, mp: 420, agi: 68, res: 42 }
      : { hp: 920, mp: 260, agi: 52, res: 28 },
    equippedArts: isHighDanger
      ? { neigong: 'MA-179', move1: 'MA-187' }
      : { move1: 'MA-182' },
    learnedArts: isHighDanger
      ? [
          { artId: 'MA-179', level: 5 },
          { artId: 'MA-187', level: 6 },
        ]
      : [{ artId: 'MA-182', level: 4 }],
  })
}
