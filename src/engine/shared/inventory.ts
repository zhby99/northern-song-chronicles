import { ITEM_DB_MAP } from '../../data/itemsDb'
import type { InventoryStack } from '../../types/game'

export function addItemToInventory(
  list: InventoryStack[],
  itemId: string,
  qty = 1,
): InventoryStack[] {
  const def = ITEM_DB_MAP[itemId]
  if (!def || qty <= 0) return list
  const next = list.map((x) => ({ ...x }))
  const existing = next.find((x) => x.itemId === itemId)
  if (existing) {
    existing.qty += qty
  } else {
    next.push({ itemId, qty })
  }
  return next
}

export function removeItemFromInventory(
  list: InventoryStack[],
  itemId: string,
  qty = 1,
): InventoryStack[] | null {
  const idx = list.findIndex((x) => x.itemId === itemId)
  if (idx === -1 || list[idx].qty < qty) return null
  const next = list.map((x) => ({ ...x }))
  next[idx].qty -= qty
  if (next[idx].qty <= 0) {
    next.splice(idx, 1)
  }
  return next
}
