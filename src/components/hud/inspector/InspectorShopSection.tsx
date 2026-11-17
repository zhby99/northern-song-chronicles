import { useState } from 'react'
import { FACTION_DB_MAP } from '../../../data/gameDb'
import { ITEM_DB_MAP } from '../../../data/itemsDb'
import type { SPOT_SHOPS_BY_SPOT_ID } from '../../../data/spotShops'
import type { InventoryStack } from '../../../types/game'
import { NODE_MAP } from '../../../utils/mapMath'

type SpotShopDef = NonNullable<(typeof SPOT_SHOPS_BY_SPOT_ID)[string]>
type ShopGroupKey = 'weapon' | 'armor' | 'mount' | 'scrolls' | 'medicine' | 'tools' | 'misc'

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
  inventory: InventoryStack[]
  onBuyItem: (spotId: string, itemId: string, qty: number) => void
}

export function InspectorShopSection({
  activeShop,
  currentContextKey,
  isAtCurrentRegion,
  playerSectId,
  silver,
  inventory,
  onBuyItem,
}: InspectorShopSectionProps) {
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
    price: number
    qty: number
  } | null>(null)

  const reqSectName = activeShop.requiredSectId
    ? (FACTION_DB_MAP[activeShop.requiredSectId]?.name ?? activeShop.requiredSectId)
    : null
  const sectEligible = !activeShop.requiredSectId || playerSectId === activeShop.requiredSectId
  const shopRegName = NODE_MAP[activeShop.regionId]?.name ?? activeShop.regionId
  const canTradeHere = isAtCurrentRegion && sectEligible

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
          <span className="text-[11px] font-mono font-bold text-[#6b4614] shrink-0">
            现银 {silver} 两
          </span>
        </div>

        {!isAtCurrentRegion && (
          <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
            🔒 须亲临【{shopRegName}】方可在此采办交易
          </div>
        )}
        {isAtCurrentRegion && !sectEligible && reqSectName && (
          <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
            🔒 内部甲仗重地，仅限【{reqSectName}】弟子/成员购置
          </div>
        )}

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
                  const affordable = silver >= entry.price
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
                            price: entry.price,
                            qty: 1,
                          })
                        }
                        className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif shrink-0 transition ${
                          btnEnabled
                            ? 'bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] cursor-pointer shadow-sm'
                            : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                        }`}
                      >
                        {entry.price} 两购置
                      </button>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
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
                      单价：<strong className="font-mono text-[#781710]">{unitPrice.toLocaleString()}</strong> 两 / 个
                    </span>
                    <span>
                      当前银两：<strong className="font-mono text-[#23180f]">{silver.toLocaleString()}</strong> 两
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
    </>
  )
}
