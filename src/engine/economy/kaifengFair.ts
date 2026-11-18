import { UNIQUE_ARTIFACT_MAP } from '../../data/gameDb'
import { ITEMS_DB, normalizeItemTier } from '../../data/itemsDb'
import type { GameItemDef } from '../../types/game'
import { computeShopBuyPrice, isItemSellable } from './index'

// ============================================================================
// 开封大集：每年【六月】整月于东京大相国寺万姓交易雅市开市，
// 从「天下无主」的地阶奇珍中随机陈列 3 件，按物品价值 × 3 出售（另享【算术】采办折扣）。
// 有主孤品（名宿随身神兵等）与天阶神物一律不入集；某件在往年已被少侠购得即永久下架。
// ============================================================================

export const KAIFENG_FAIR_MONTH = 6
export const KAIFENG_FAIR_LOT_COUNT = 3
export const KAIFENG_FAIR_PRICE_MULT = 3
export const KAIFENG_FAIR_SPOT_ID = 'bl_xg_market'

/** 可入集的地阶无主奇珍（天下唯一、无人持有、可售） */
export const KAIFENG_FAIR_POOL: readonly GameItemDef[] = ITEMS_DB.filter((it) => {
  if (normalizeItemTier(it.rarity) !== '地阶') return false
  if (!isItemSellable(it.id, it)) return false
  const unique = UNIQUE_ARTIFACT_MAP[it.id]
  return Boolean(unique && unique.ownerType === 'unowned' && !unique.ownerNpcId)
})

export interface KaifengFairSchedule {
  yearIdx: number
  monthOfYear: number
  isOpen: boolean
  monthsUntilOpen: number
}

export function getKaifengFairSchedule(dayCount: number): KaifengFairSchedule {
  const zeroIdx = Math.max(0, Math.floor(dayCount) - 1)
  const yearIdx = Math.floor(zeroIdx / 360)
  const monthOfYear = Math.floor((zeroIdx % 360) / 30) + 1
  const isOpen = monthOfYear === KAIFENG_FAIR_MONTH
  const monthsUntilOpen =
    monthOfYear <= KAIFENG_FAIR_MONTH
      ? KAIFENG_FAIR_MONTH - monthOfYear
      : 12 + KAIFENG_FAIR_MONTH - monthOfYear
  return { yearIdx, monthOfYear, isOpen, monthsUntilOpen }
}

export interface KaifengFairLot {
  itemId: string
  item: GameItemDef
  basePrice: number
  finalPrice: number
  discountSaved: number
  boughtThisYear: boolean
}

function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const out = [...arr]
  let a = (seed * 2654435761 + 0x9e3779b9) >>> 0 || 1
  const rand = () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

/**
 * 某年开封大集陈列的拍品（确定性随机）。
 * @param purchases 少侠历年购得记录 itemId → 购入年份；往年购得者永久下架，本年购得者仍列出并标记已购
 * @param consumedUniqueIds 已服食炼化的孤品同样下架
 */
export function getKaifengFairLots(params: {
  yearIdx: number
  arithmeticSkill?: number
  purchases?: Readonly<Record<string, number>>
  consumedUniqueIds?: readonly string[]
}): KaifengFairLot[] {
  const { yearIdx, arithmeticSkill = 0, purchases = {}, consumedUniqueIds = [] } = params
  const available = KAIFENG_FAIR_POOL.filter((it) => {
    const boughtYear = purchases[it.id]
    if (boughtYear !== undefined && boughtYear < yearIdx) return false
    return !consumedUniqueIds.includes(it.id)
  })
  return seededShuffle(available, yearIdx + 1)
    .slice(0, KAIFENG_FAIR_LOT_COUNT)
    .map((item) => {
      const basePrice = Math.round(item.value * KAIFENG_FAIR_PRICE_MULT)
      const finalPrice = computeShopBuyPrice(basePrice, arithmeticSkill)
      return {
        itemId: item.id,
        item,
        basePrice,
        finalPrice,
        discountSaved: Math.max(0, basePrice - finalPrice),
        boughtThisYear: purchases[item.id] === yearIdx,
      }
    })
}
