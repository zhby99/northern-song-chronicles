import { useState } from 'react'
import { FACTION_DB_MAP } from '../../../data/gameDb'
import { ITEM_DB_MAP } from '../../../data/itemsDb'
import type { SPOT_SHOPS_BY_SPOT_ID } from '../../../data/spotShops'
import {
  computeArithmeticBuyDiscountRatio,
  computeArithmeticSellBonusRatio,
  computeItemSellPrice,
  computeShopBuyPrice,
  getXiangguoAuctionSchedule,
  getXiangguoMonthlyAuctionLots,
  isItemSellable,
} from '../../../engine/economy'
import type { EquippedSlotsMap, InventoryStack } from '../../../types/game'
import { NODE_MAP } from '../../../engine/world/mapMath'

type SpotShopDef = NonNullable<(typeof SPOT_SHOPS_BY_SPOT_ID)[string]>
type ShopGroupKey = 'weapon' | 'armor' | 'mount' | 'scrolls' | 'medicine' | 'tools' | 'misc'
type ShopTradeTab = 'buy' | 'sell' | 'auction'

const SHOP_GROUP_ORDER: Array<{ key: ShopGroupKey; label: string }> = [
  { key: 'weapon', label: '神兵利器' },
  { key: 'armor', label: '衣甲履佩' },
  { key: 'mount', label: '名驹坐骑' },
  { key: 'scrolls', label: '典籍书画' },
  { key: 'medicine', label: '丹药毒物' },
  { key: 'tools', label: '雅器百工' },
  { key: 'misc', label: '行囊杂物' },
]

interface InspectorShopSectionProps {
  activeShop: SpotShopDef
  currentContextKey: string
  isAtCurrentRegion: boolean
  playerSectId: string | null
  silver: number
  dayCount: number
  arithmeticSkill: number
  equipped: EquippedSlotsMap
  consumedUniqueIds: string[]
  auctionBoughtByMonth: Record<string, string[]>
  inventory: InventoryStack[]
  onBuyItem: (spotId: string, itemId: string, qty: number) => void
  onSellItem: (itemId: string, qty: number) => void
  onBuyAuctionLot: (itemId: string) => void
}

export function InspectorShopSection({
  activeShop,
  currentContextKey,
  isAtCurrentRegion,
  playerSectId,
  silver,
  dayCount,
  arithmeticSkill,
  equipped,
  consumedUniqueIds,
  auctionBoughtByMonth,
  inventory,
  onBuyItem,
  onSellItem,
  onBuyAuctionLot,
}: InspectorShopSectionProps) {
  const [tradeTabState, setTradeTabState] = useState<{
    contextKey: string
    tab: ShopTradeTab
  } | null>(null)
  const [shopFilterState, setShopFilterState] = useState<{
    contextKey: string
    category: 'all' | ShopGroupKey
  } | null>(null)
  const [pendingPurchase, setPendingPurchase] = useState<{
    spotId: string
    shopTitle: string
    itemId: string
    itemName: string
    rarity: string
    note: string
    basePrice: number
    price: number
    qty: number
  } | null>(null)
  const [pendingSale, setPendingSale] = useState<{
    itemId: string
    itemName: string
    rarity: string
    subType: string
    unitSellPrice: number
    ownedQty: number
    qty: number
  } | null>(null)

  const isXiangguoAuctionVenue = activeShop.spotId === 'bl_xg_market'
  const rawTab = tradeTabState?.contextKey === currentContextKey ? tradeTabState.tab : 'buy'
  const activeTab: ShopTradeTab =
    rawTab === 'auction' && !isXiangguoAuctionVenue ? 'buy' : rawTab

  const reqSectName = activeShop.requiredSectId
    ? (FACTION_DB_MAP[activeShop.requiredSectId]?.name ?? activeShop.requiredSectId)
    : null
  const sectEligible = !activeShop.requiredSectId || playerSectId === activeShop.requiredSectId
  const shopRegName = NODE_MAP[activeShop.regionId]?.name ?? activeShop.regionId
  const canTradeHere = isAtCurrentRegion && sectEligible
  const canSellHere = isAtCurrentRegion

  const buyDiscountPct = Number((computeArithmeticBuyDiscountRatio(arithmeticSkill) * 100).toFixed(1))
  const sellBonusPct = Number((computeArithmeticSellBonusRatio(arithmeticSkill) * 100).toFixed(1))

  const buckets: Record<
    ShopGroupKey,
    Array<{
      entry: (typeof activeShop.items)[number]
      def: NonNullable<(typeof ITEM_DB_MAP)[string]>
    }>
  > = {
    weapon: [],
    armor: [],
    mount: [],
    scrolls: [],
    medicine: [],
    tools: [],
    misc: [],
  }

  for (const entry of activeShop.items) {
    const def = ITEM_DB_MAP[entry.itemId]
    if (!def) continue
    let gk: ShopGroupKey = 'misc'
    if (def.mountMeta || def.equipSlot === 'mount') {
      gk = 'mount'
    } else if (def.equipSlot || def.weaponMeta || def.gearMeta) {
      gk =
        def.equipSlot === 'weapon' || def.equipSlot === 'bow' || Boolean(def.weaponMeta)
          ? 'weapon'
          : 'armor'
    } else if (def.category === 'scrolls') {
      gk = 'scrolls'
    } else if (def.category === 'medicine') {
      gk = 'medicine'
    } else if (def.category === 'tools') {
      gk = 'tools'
    }
    buckets[gk].push({ entry, def })
  }

  const availableGroups = SHOP_GROUP_ORDER.filter((g) => buckets[g.key].length > 0)
  const totalItemsCount = availableGroups.reduce((acc, g) => acc + buckets[g.key].length, 0)
  const rawSelected =
    shopFilterState?.contextKey === currentContextKey ? shopFilterState.category : 'all'
  const selectedCategory =
    rawSelected === 'all' || availableGroups.some((g) => g.key === rawSelected)
      ? rawSelected
      : 'all'
  const visibleGroups =
    selectedCategory === 'all'
      ? availableGroups
      : availableGroups.filter((g) => g.key === selectedCategory)

  const bagSellEntries = inventory
    .filter((st) => st.qty > 0 && Boolean(ITEM_DB_MAP[st.itemId]))
    .map((st) => {
      const def = ITEM_DB_MAP[st.itemId]!
      const sellable = isItemSellable(st.itemId, def)
      const unitSell = sellable ? computeItemSellPrice(def, arithmeticSkill) : 0
      return { stack: st, def, sellable, unitSell }
    })
    .sort((a, b) => {
      if (a.sellable !== b.sellable) return a.sellable ? -1 : 1
      return b.unitSell - a.unitSell || a.def.name.localeCompare(b.def.name, 'zh-Hans-CN')
    })

  const auctionSchedule = getXiangguoAuctionSchedule(dayCount)
  const boughtAuctionIds = auctionBoughtByMonth[`Y${auctionSchedule.yearIdx}`] ?? []
  const auctionLots =
    isXiangguoAuctionVenue && auctionSchedule.isOpen
      ? getXiangguoMonthlyAuctionLots(
          auctionSchedule.yearIdx,
          arithmeticSkill,
          new Set(consumedUniqueIds),
        )
      : []

  return (
    <>
      <div className="p-2.5 rounded-md bg-[#f5e7cb] border-2 border-[#b58742] space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold song-serif text-[#781710]">
              ⚖ {activeShop.title}
            </div>
            <div className="text-[10px] text-[#6b5235]">{activeShop.subtitle}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[11px] font-mono font-bold text-[#6b4614]">
              现银 {silver.toLocaleString()} 两
            </div>
            {arithmeticSkill > 0 && (
              <div className="text-[9px] text-[#1f4d3b] font-semibold">
                算术 {arithmeticSkill} · 买-{buyDiscountPct}% / 卖+{sellBonusPct}%
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-[#d4b986] pb-1.5">
          <button
            type="button"
            onClick={() => setTradeTabState({ contextKey: currentContextKey, tab: 'buy' })}
            className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif border transition cursor-pointer ${
              activeTab === 'buy'
                ? 'bg-[#781710] border-[#781710] text-[#fff8ee] shadow-sm'
                : 'bg-[#efe4cc] hover:bg-[#e5d3b3] border-[#cbb07e] text-[#5c3d1e]'
            }`}
          >
            采办买进 ({totalItemsCount})
          </button>
          <button
            type="button"
            onClick={() => setTradeTabState({ contextKey: currentContextKey, tab: 'sell' })}
            className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif border transition cursor-pointer ${
              activeTab === 'sell'
                ? 'bg-[#215744] border-[#215744] text-[#fff8ee] shadow-sm'
                : 'bg-[#efe4cc] hover:bg-[#e5d3b3] border-[#cbb07e] text-[#5c3d1e]'
            }`}
          >
            典卖折银 ({bagSellEntries.length})
          </button>
          {isXiangguoAuctionVenue && (
            <button
              type="button"
              onClick={() => setTradeTabState({ contextKey: currentContextKey, tab: 'auction' })}
              className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif border transition cursor-pointer ${
                activeTab === 'auction'
                  ? 'bg-[#6b4614] border-[#6b4614] text-[#fde68a] shadow-sm'
                  : 'bg-[#fbf1d9] hover:bg-[#f2e2bb] border-[#b58742] text-[#781710]'
              }`}
            >
              ★ 六月拍场 ({auctionSchedule.isOpen ? auctionLots.length : '休市'})
            </button>
          )}
        </div>

        {!isAtCurrentRegion && (
          <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
            🔒 须亲临【{shopRegName}】方可在此采办交易或典卖折银
          </div>
        )}
        {activeTab === 'buy' && isAtCurrentRegion && !sectEligible && reqSectName && (
          <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
            🔒 内部甲仗重地，仅限【{reqSectName}】弟子/成员购置
          </div>
        )}

        {activeTab === 'buy' && (
          <>
            {availableGroups.length > 1 && (
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setShopFilterState({ contextKey: currentContextKey, category: 'all' })
                  }
                  className={`px-2 py-0.5 rounded text-[10px] font-bold song-serif border transition cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#781710] border-[#781710] text-[#fff8ee] shadow-sm'
                      : 'bg-[#efe4cc] hover:bg-[#e5d3b3] border-[#cbb07e] text-[#5c3d1e]'
                  }`}
                >
                  全部 ({totalItemsCount})
                </button>
                {availableGroups.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() =>
                      setShopFilterState({
                        contextKey: currentContextKey,
                        category: g.key,
                      })
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-bold song-serif border transition cursor-pointer ${
                      selectedCategory === g.key
                        ? 'bg-[#781710] border-[#781710] text-[#fff8ee] shadow-sm'
                        : 'bg-[#efe4cc] hover:bg-[#e5d3b3] border-[#cbb07e] text-[#5c3d1e]'
                    }`}
                  >
                    {g.label} ({buckets[g.key].length})
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2.5 max-h-72 overflow-y-auto scroll-thin pr-0.5">
              {visibleGroups.map((g) => {
                const sortedItems = [...buckets[g.key]].sort(
                  (a, b) =>
                    b.entry.price - a.entry.price ||
                    b.def.value - a.def.value ||
                    a.def.name.localeCompare(b.def.name, 'zh-Hans-CN'),
                )
                return (
                  <div key={g.key} className="space-y-1">
                    <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#e8d5b0] border border-[#cbb07e] text-[10px] font-bold song-serif text-[#5c3d1e]">
                      <span>{g.label}</span>
                      <span className="font-mono text-[#6b5235]">
                        {sortedItems.length} 种 · 按价值降序
                      </span>
                    </div>
                    {sortedItems.map(({ entry, def }) => {
                      const ownedQty =
                        inventory.find((st) => st.itemId === entry.itemId)?.qty ?? 0
                      const unitPrice = computeShopBuyPrice(entry.price, arithmeticSkill)
                      const affordable = silver >= unitPrice
                      const btnEnabled = canTradeHere && affordable
                      const mnt = def.mountMeta
                      const bonusParts: string[] = []
                      if (mnt) {
                        bonusParts.push(`脚力${mnt.baseSpeed}`)
                        bonusParts.push(`${mnt.terrainTrait}+${mnt.terrainBonusPct}%`)
                      } else if (def.equipBonus) {
                        if (def.equipBonus.attack) bonusParts.push(`攻+${def.equipBonus.attack}`)
                        if (def.equipBonus.defense) bonusParts.push(`防+${def.equipBonus.defense}`)
                        if (def.equipBonus.maxHp) bonusParts.push(`血+${def.equipBonus.maxHp}`)
                        if (def.equipBonus.maxMp) bonusParts.push(`内+${def.equipBonus.maxMp}`)
                        if (def.equipBonus.agility) bonusParts.push(`身+${def.equipBonus.agility}`)
                        if (def.equipBonus.res) bonusParts.push(`抗+${def.equipBonus.res}`)
                      }
                      return (
                        <div
                          key={entry.itemId}
                          className="flex items-center justify-between gap-2 p-2 rounded bg-[#faf3e3] border border-[#cbb693]"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold song-serif text-xs text-[#23180f]">
                                {def.name}
                              </span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-[#efe0c4] text-[#6b4614]">
                                {def.rarity}
                              </span>
                              {ownedQty > 0 && (
                                <span className="text-[9px] px-1 py-0.2 rounded bg-[#1f4d3b]/15 text-[#1f4d3b] font-mono">
                                  已藏×{ownedQty}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-[#6b5235] truncate">
                              {entry.note ?? def.subType}
                              {bonusParts.length > 0 ? ` · ${bonusParts.join(' ')}` : ''}
                            </div>
                          </div>
                          <button
                            type="button"
                            disabled={!btnEnabled}
                            onClick={() =>
                              setPendingPurchase({
                                spotId: activeShop.spotId,
                                shopTitle: activeShop.title,
                                itemId: entry.itemId,
                                itemName: def.name,
                                rarity: def.rarity,
                                note: entry.note ?? def.subType,
                                basePrice: entry.price,
                                price: unitPrice,
                                qty: 1,
                              })
                            }
                            className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif shrink-0 transition ${
                              btnEnabled
                                ? 'bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] cursor-pointer shadow-sm'
                                : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                            }`}
                          >
                            {unitPrice < entry.price && (
                              <span className="line-through opacity-70 mr-1 text-[10px] font-mono">
                                {entry.price}
                              </span>
                            )}
                            {unitPrice} 两购置
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {activeTab === 'sell' && (
          <div className="space-y-1.5">
            <div className="text-[10px] text-[#5c3d1e] bg-[#efe4cc] px-2 py-1 rounded border border-[#cbb07e] flex items-center justify-between gap-2">
              <span>行囊余货按原值 40% 折银收购，关键任务信物已自动加锁禁售</span>
              {arithmeticSkill > 0 && (
                <span className="font-mono text-[#1f4d3b] font-bold shrink-0">
                  算术溢价 +{sellBonusPct}%
                </span>
              )}
            </div>
            {bagSellEntries.length === 0 ? (
              <div className="p-3 text-center text-xs text-[#6b5235] bg-[#faf3e3] rounded border border-[#cbb693]">
                行囊空空如也，暂无旧物可供折银典卖。
              </div>
            ) : (
              <div className="space-y-1.5 max-h-72 overflow-y-auto scroll-thin pr-0.5">
                {bagSellEntries.map(({ stack, def, sellable, unitSell }) => (
                  <div
                    key={stack.itemId}
                    className="flex items-center justify-between gap-2 p-2 rounded bg-[#faf3e3] border border-[#cbb693]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold song-serif text-xs text-[#23180f]">
                          {def.name}
                        </span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#efe0c4] text-[#6b4614]">
                          {def.rarity}
                        </span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#5c3d1e]/15 text-[#5c3d1e] font-mono">
                          库存×{stack.qty}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6b5235] truncate">
                        {def.subType} · 原值 {def.value} 两
                      </div>
                    </div>
                    {sellable ? (
                      <button
                        type="button"
                        disabled={!canSellHere}
                        onClick={() =>
                          setPendingSale({
                            itemId: stack.itemId,
                            itemName: def.name,
                            rarity: def.rarity,
                            subType: def.subType,
                            unitSellPrice: unitSell,
                            ownedQty: stack.qty,
                            qty: 1,
                          })
                        }
                        className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif shrink-0 transition ${
                          canSellHere
                            ? 'bg-[#215744] hover:bg-[#2a6d56] text-[#fff8ee] cursor-pointer shadow-sm'
                            : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                        }`}
                      >
                        折银 +{unitSell} 两
                      </button>
                    ) : (
                      <span className="px-2 py-1 rounded text-[10px] font-bold song-serif bg-[#e6dcc8] text-[#8f1d14] border border-[#cbb693] shrink-0">
                        🔒 信物禁售
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'auction' && isXiangguoAuctionVenue && (
          <div className="space-y-2">
            <div className="text-[10px] text-[#5c3d1e] bg-[#fbf1d9] px-2 py-1.5 rounded border border-[#b58742] flex items-center justify-between gap-2">
              <span>
                大相国寺每年六月整月开启年度拍场（第 {auctionSchedule.yearIdx + 1} 年 · 四席孤品重器），一槌定音
              </span>
              <span className="font-mono text-[#781710] font-bold shrink-0">每年六月限拍 1 次/席</span>
            </div>
            {!auctionSchedule.isOpen ? (
              <div className="p-3 rounded bg-[#efe4cc] border border-[#cbb693] text-[11px] text-[#5c3d1e] leading-relaxed">
                本届大相国寺年度拍场须待每年<strong>六月整月</strong>方可开拍（当前第{' '}
                <span className="font-mono font-bold text-[#781710]">
                  {auctionSchedule.monthOfYear}
                </span>{' '}
                月，距六月开拍尚余{' '}
                <span className="font-mono font-bold text-[#781710]">
                  {auctionSchedule.monthsUntilOpen}
                </span>{' '}
                个月）。
              </div>
            ) : (
              <div className="space-y-1.5 max-h-72 overflow-y-auto scroll-thin pr-0.5">
                {auctionLots.map((lot) => {
                  const alreadyBought = boughtAuctionIds.includes(lot.itemId)
                  const isEquipped = Object.values(equipped).includes(lot.itemId)
                  const ownedQty = inventory.find((st) => st.itemId === lot.itemId)?.qty ?? 0
                  const alreadyOwnedNonStack = !lot.item.stackable && (isEquipped || ownedQty > 0)
                  const canBid =
                    isAtCurrentRegion &&
                    !alreadyBought &&
                    !alreadyOwnedNonStack &&
                    silver >= lot.finalPrice
                  return (
                    <div
                      key={lot.itemId}
                      className="flex items-center justify-between gap-2 p-2 rounded bg-[#faf3e3] border border-[#b58742]"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#781710] text-[#fde68a] font-bold">
                            {lot.lotCategoryLabel}
                          </span>
                          <span className="font-bold song-serif text-xs text-[#23180f]">
                            {lot.item.name}
                          </span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[#efe0c4] text-[#6b4614]">
                            {lot.item.rarity}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#6b5235] truncate">
                          {lot.item.subType} · {lot.item.desc}
                        </div>
                        {lot.discountSaved > 0 && (
                          <div className="text-[9px] text-[#1f4d3b] font-mono">
                            起拍估价 {lot.estimatePrice} 两 · 算术压价省 {lot.discountSaved} 两
                          </div>
                        )}
                      </div>
                      {alreadyBought ? (
                        <span className="px-2 py-1 rounded text-[10px] font-bold song-serif bg-[#e6dcc8] text-[#1f4d3b] border border-[#cbb693] shrink-0">
                          ✓ 本年已拍得
                        </span>
                      ) : alreadyOwnedNonStack ? (
                        <span className="px-2 py-1 rounded text-[10px] font-bold song-serif bg-[#e6dcc8] text-[#6b5235] border border-[#cbb693] shrink-0">
                          已藏孤本
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={!canBid}
                          onClick={() => onBuyAuctionLot(lot.itemId)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif shrink-0 transition ${
                            canBid
                              ? 'bg-[#6b4614] hover:bg-[#825518] text-[#fde68a] cursor-pointer shadow-sm'
                              : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                          }`}
                        >
                          {lot.finalPrice.toLocaleString()} 两竞拍
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {pendingPurchase && (() => {
        const unitPrice = Math.max(1, pendingPurchase.price)
        const maxAffordable = Math.max(1, Math.floor(silver / unitPrice))
        const maxQtyCap = Math.min(999, maxAffordable)
        const qty = Math.max(1, Math.min(999, Math.floor(pendingPurchase.qty || 1)))
        const totalCost = unitPrice * qty
        const canAfford = silver >= totalCost
        const ownedQty =
          inventory.find((st) => st.itemId === pendingPurchase.itemId)?.qty ?? 0

        const updateQty = (nextQty: number) => {
          const clamped = Math.max(1, Math.min(999, Math.floor(nextQty || 1)))
          setPendingPurchase((prev) => (prev ? { ...prev, qty: clamped } : null))
        }

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[1px] p-4"
            onClick={() => setPendingPurchase(null)}
          >
            <div
              className="w-full max-w-sm rounded-xl border-2 border-[#9e7b47] bg-[#f7eedc] text-[#23180f] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 bg-gradient-to-r from-[#5a140f] via-[#781710] to-[#5a140f] text-[#fff8ee] flex items-center justify-between">
                <div>
                  <div className="song-serif font-bold text-base tracking-wider">
                    商贸采办确认
                  </div>
                  <div className="text-[11px] text-[#f2d6ae]">
                    【{pendingPurchase.shopTitle}】
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingPurchase(null)}
                  className="px-2 py-0.5 rounded hover:bg-white/15 text-[#f7e7c4] font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-3.5 text-xs">
                <div className="p-3 rounded-lg bg-[#faf3e3] border border-[#cbb693] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="song-serif font-bold text-sm text-[#23180f]">
                        {pendingPurchase.itemName}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#efe0c4] text-[#6b4614]">
                        {pendingPurchase.rarity}
                      </span>
                    </div>
                    {ownedQty > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1f4d3b]/15 text-[#1f4d3b] font-mono">
                        已藏×{ownedQty}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#6b5235]">{pendingPurchase.note}</div>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-[#5c3d1e]">
                    <span>
                      单价：
                      {unitPrice < pendingPurchase.basePrice && (
                        <span className="line-through text-[#8c785c] mr-1 font-mono">
                          {pendingPurchase.basePrice}
                        </span>
                      )}
                      <strong className="font-mono text-[#781710]">
                        {unitPrice.toLocaleString()}
                      </strong>{' '}
                      两 / 个
                    </span>
                    <span>
                      当前银两：
                      <strong className="font-mono text-[#23180f]">
                        {silver.toLocaleString()}
                      </strong>{' '}
                      两
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="song-serif font-bold text-[#3d2b19]">购买数量</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={qty <= 1}
                        onClick={() => updateQty(qty - 1)}
                        className="w-7 h-7 rounded border border-[#b5986e] bg-[#efe4cc] hover:bg-[#e3d1af] disabled:opacity-45 disabled:cursor-not-allowed font-bold text-sm cursor-pointer"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={qty}
                        onChange={(e) => {
                          const parsed = Number.parseInt(e.target.value, 10)
                          updateQty(Number.isNaN(parsed) ? 1 : parsed)
                        }}
                        className="w-16 h-7 text-center font-mono font-bold text-sm rounded border border-[#b5986e] bg-white text-[#23180f] focus:outline-none focus:border-[#781710]"
                      />
                      <button
                        type="button"
                        disabled={qty >= maxQtyCap}
                        onClick={() => updateQty(qty + 1)}
                        className="w-7 h-7 rounded border border-[#b5986e] bg-[#efe4cc] hover:bg-[#e3d1af] disabled:opacity-45 disabled:cursor-not-allowed font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {[1, 5, 10].map((preset) => {
                      const presetDisabled = silver < unitPrice * preset
                      return (
                        <button
                          key={preset}
                          type="button"
                          disabled={presetDisabled}
                          onClick={() => updateQty(preset)}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono border transition ${
                            qty === preset
                              ? 'bg-[#781710] border-[#781710] text-[#fff8ee]'
                              : presetDisabled
                                ? 'bg-[#e6dcc8] border-[#cbb693] text-[#9b8d79] cursor-not-allowed'
                                : 'bg-[#efe4cc] hover:bg-[#e3d1af] border-[#b5986e] text-[#4e361c] cursor-pointer'
                          }`}
                        >
                          ×{preset}
                        </button>
                      )
                    })}
                    <button
                      type="button"
                      disabled={silver < unitPrice}
                      onClick={() => updateQty(maxQtyCap)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono border transition ${
                        qty === maxQtyCap && maxQtyCap > 1
                          ? 'bg-[#781710] border-[#781710] text-[#fff8ee]'
                          : silver < unitPrice
                            ? 'bg-[#e6dcc8] border-[#cbb693] text-[#9b8d79] cursor-not-allowed'
                            : 'bg-[#efe4cc] hover:bg-[#e3d1af] border-[#b5986e] text-[#4e361c] cursor-pointer'
                      }`}
                    >
                      最大(×{maxQtyCap})
                    </button>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border text-xs space-y-1 ${
                    canAfford
                      ? 'bg-[#efe4cc]/80 border-[#b5986e] text-[#23180f]'
                      : 'bg-[#fce8e6] border-[#c53929] text-[#8f1d14]'
                  }`}
                >
                  <div className="song-serif font-bold text-[13px] leading-snug">
                    将花费{' '}
                    <span className="font-mono text-[#781710] text-sm">
                      {totalCost.toLocaleString()}
                    </span>{' '}
                    两银子，购买{' '}
                    <span className="font-mono text-[#781710] text-sm">{qty}</span>{' '}
                    个【{pendingPurchase.itemName}】
                  </div>
                  <div className="text-[11px]">
                    {canAfford ? (
                      <>
                        购后余银：
                        <span className="font-mono font-bold">
                          {(silver - totalCost).toLocaleString()}
                        </span>{' '}
                        两
                      </>
                    ) : (
                      <>纹银不足！尚差 {(totalCost - silver).toLocaleString()} 两银子。</>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPendingPurchase(null)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#b5986e] bg-[#efe4cc] hover:bg-[#e3d1af] text-[#4e361c] font-bold song-serif cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => {
                      onBuyItem(pendingPurchase.spotId, pendingPurchase.itemId, qty)
                      setPendingPurchase(null)
                    }}
                    className={`px-4 py-1.5 rounded-lg font-bold song-serif transition ${
                      canAfford
                        ? 'bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] shadow cursor-pointer'
                        : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                    }`}
                  >
                    确认购置
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {pendingSale && (() => {
        const maxSellQty = Math.max(1, pendingSale.ownedQty)
        const qty = Math.max(1, Math.min(maxSellQty, Math.floor(pendingSale.qty || 1)))
        const totalGain = pendingSale.unitSellPrice * qty

        const updateSellQty = (nextQty: number) => {
          const clamped = Math.max(1, Math.min(maxSellQty, Math.floor(nextQty || 1)))
          setPendingSale((prev) => (prev ? { ...prev, qty: clamped } : null))
        }

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[1px] p-4"
            onClick={() => setPendingSale(null)}
          >
            <div
              className="w-full max-w-sm rounded-xl border-2 border-[#215744] bg-[#f7eedc] text-[#23180f] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 bg-gradient-to-r from-[#163d2f] via-[#215744] to-[#163d2f] text-[#fff8ee] flex items-center justify-between">
                <div>
                  <div className="song-serif font-bold text-base tracking-wider">
                    商肆折银典卖确认
                  </div>
                  <div className="text-[11px] text-[#cde8dc]">【{activeShop.title}】当场交割</div>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingSale(null)}
                  className="px-2 py-0.5 rounded hover:bg-white/15 text-[#f7e7c4] font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-3.5 text-xs">
                <div className="p-3 rounded-lg bg-[#faf3e3] border border-[#cbb693] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="song-serif font-bold text-sm text-[#23180f]">
                        {pendingSale.itemName}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#efe0c4] text-[#6b4614]">
                        {pendingSale.rarity}
                      </span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5c3d1e]/15 text-[#5c3d1e] font-mono">
                      行囊×{pendingSale.ownedQty}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6b5235]">{pendingSale.subType}</div>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-[#5c3d1e]">
                    <span>
                      收购价：
                      <strong className="font-mono text-[#215744]">
                        +{pendingSale.unitSellPrice.toLocaleString()}
                      </strong>{' '}
                      两 / 个
                    </span>
                    <span>
                      当前银两：
                      <strong className="font-mono text-[#23180f]">
                        {silver.toLocaleString()}
                      </strong>{' '}
                      两
                    </span>
                  </div>
                </div>

                {maxSellQty > 1 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="song-serif font-bold text-[#3d2b19]">卖出数量</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={qty <= 1}
                          onClick={() => updateSellQty(qty - 1)}
                          className="w-7 h-7 rounded border border-[#b5986e] bg-[#efe4cc] hover:bg-[#e3d1af] disabled:opacity-45 disabled:cursor-not-allowed font-bold text-sm cursor-pointer"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={maxSellQty}
                          value={qty}
                          onChange={(e) => {
                            const parsed = Number.parseInt(e.target.value, 10)
                            updateSellQty(Number.isNaN(parsed) ? 1 : parsed)
                          }}
                          className="w-16 h-7 text-center font-mono font-bold text-sm rounded border border-[#b5986e] bg-white text-[#23180f] focus:outline-none focus:border-[#215744]"
                        />
                        <button
                          type="button"
                          disabled={qty >= maxSellQty}
                          onClick={() => updateSellQty(qty + 1)}
                          className="w-7 h-7 rounded border border-[#b5986e] bg-[#efe4cc] hover:bg-[#e3d1af] disabled:opacity-45 disabled:cursor-not-allowed font-bold text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {[1, 5, 10]
                        .filter((p) => p <= maxSellQty)
                        .map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => updateSellQty(preset)}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition cursor-pointer ${
                              qty === preset
                                ? 'bg-[#215744] border-[#215744] text-[#fff8ee]'
                                : 'bg-[#efe4cc] hover:bg-[#e3d1af] border-[#b5986e] text-[#4e361c]'
                            }`}
                          >
                            ×{preset}
                          </button>
                        ))}
                      <button
                        type="button"
                        onClick={() => updateSellQty(maxSellQty)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono border transition cursor-pointer ${
                          qty === maxSellQty
                            ? 'bg-[#215744] border-[#215744] text-[#fff8ee]'
                            : 'bg-[#efe4cc] hover:bg-[#e3d1af] border-[#b5986e] text-[#4e361c]'
                        }`}
                      >
                        全部(×{maxSellQty})
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-lg border bg-[#eef5f0] border-[#215744]/40 text-[#23180f] text-xs space-y-1">
                  <div className="song-serif font-bold text-[13px] leading-snug">
                    将卖出{' '}
                    <span className="font-mono text-[#215744] text-sm">{qty}</span> 个【
                    {pendingSale.itemName}】，实收{' '}
                    <span className="font-mono text-[#215744] text-sm">
                      +{totalGain.toLocaleString()}
                    </span>{' '}
                    两纹银
                  </div>
                  <div className="text-[11px]">
                    卖后现银：
                    <span className="font-mono font-bold">
                      {(silver + totalGain).toLocaleString()}
                    </span>{' '}
                    两
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPendingSale(null)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#b5986e] bg-[#efe4cc] hover:bg-[#e3d1af] text-[#4e361c] font-bold song-serif cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSellItem(pendingSale.itemId, qty)
                      setPendingSale(null)
                    }}
                    className="px-4 py-1.5 rounded-lg font-bold song-serif bg-[#215744] hover:bg-[#2a6d56] text-[#fff8ee] shadow cursor-pointer transition"
                  >
                    确认典卖
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </>
  )
}
