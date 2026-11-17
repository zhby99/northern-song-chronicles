import { useMemo } from 'react'
import {
  BAG_CATEGORY_METAS,
  ITEM_DB_MAP,
  NON_GIFTABLE_KEY_ITEM_IDS,
} from '../../../data/itemsDb'
import type { InventoryStack } from '../../../types/game'

const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  BAG_CATEGORY_METAS.map((m) => [m.key, m.label]),
)

interface NpcGiftPanelProps {
  npcName: string
  inventory: InventoryStack[]
  onGift: (itemId: string) => void
  onClose: () => void
}

export function NpcGiftPanel({
  npcName,
  inventory,
  onGift,
  onClose,
}: NpcGiftPanelProps) {
  const giftableItems = useMemo(() => {
    const allowedCategories = new Set(['scrolls', 'medicine', 'tools'])
    const allowedRarities = new Set(['良阶', '凡阶'])
    return inventory
      .filter((st) => {
        if (st.qty <= 0 || NON_GIFTABLE_KEY_ITEM_IDS.has(st.itemId)) return false
        const def = ITEM_DB_MAP[st.itemId]
        if (!def) return false
        return (
          allowedCategories.has(def.category) &&
          allowedRarities.has(def.rarity) &&
          !def.equipSlot &&
          !def.mountMeta &&
          !def.weaponMeta &&
          !def.gearMeta
        )
      })
      .map((st) => ({
        stack: st,
        item: ITEM_DB_MAP[st.itemId]!,
      }))
      .sort(
        (a, b) =>
          b.item.value - a.item.value ||
          a.item.name.localeCompare(b.item.name, 'zh-Hans-CN'),
      )
  }, [inventory])

  return (
    <div className="relative z-20 w-[min(92vw,560px)] lg:self-end lg:mr-10 max-h-[52vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
      <div className="px-4 py-2 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
        <div>
          <span className="text-sm font-bold song-serif">
            向【{npcName}】赠礼（择一行囊物什）
          </span>
          <div className="text-[10px] text-[#d4bc91]">
            仅限赠予良阶、凡阶的典籍书画、丹药毒物与雅器百工 · 按价值由高到低排列
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs px-2 py-0.5 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer shrink-0"
        >
          取消
        </button>
      </div>
      <div className="p-3 overflow-y-auto scroll-thin grid grid-cols-1 sm:grid-cols-2 gap-2">
        {giftableItems.length === 0 ? (
          <div className="col-span-full py-6 text-center text-xs text-[#6b5235]">
            行囊中暂无可赠予的良阶/凡阶典籍书画、丹药毒物或雅器百工。
          </div>
        ) : (
          giftableItems.map(({ stack, item }) => (
            <button
              key={stack.itemId}
              type="button"
              onClick={() => onGift(stack.itemId)}
              className="text-left p-2 rounded bg-[#efe4cc] hover:bg-[#e5d3b3] border border-[#cbb693] transition-colors cursor-pointer flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#2d1e10] truncate">
                  {item.name}
                </div>
                <div className="text-[10px] text-[#6b5235] truncate">
                  {CATEGORY_LABEL_MAP[item.category] ?? item.category} · {item.rarity} · 价值 {item.value} 两
                </div>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#faf3e3] border border-[#dcc9a7] text-[#4a3219] shrink-0">
                ×{stack.qty}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
