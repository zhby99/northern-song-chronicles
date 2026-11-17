import { Package, Skull, Sparkles, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { RARITY_STYLE_MAP } from '../../data/itemsDb'
import type { GameItemDef } from '../../types/game'
import { scaleMedicineRecovery } from '../../utils/realmUtils'

type BagFilterMode = 'all' | 'elixir' | 'poison'

export interface CombatBagStackEntry {
  qty: number
  item: GameItemDef
}

interface CombatItemDrawerProps {
  combatBagItems: CombatBagStackEntry[]
  consumedOnceItemIds: string[]
  playerMaxHp: number
  playerMaxMp: number
  onClose: () => void
  onUseItem: (itemId: string) => void
}

export function CombatItemDrawer({
  combatBagItems,
  consumedOnceItemIds,
  playerMaxHp,
  playerMaxMp,
  onClose,
  onUseItem,
}: CombatItemDrawerProps) {
  const [bagFilter, setBagFilter] = useState<BagFilterMode>('all')

  const filteredBagItems = useMemo(() => {
    if (bagFilter === 'elixir') {
      return combatBagItems.filter((x) => Boolean(x.item.useEffect) && !x.item.poisonEffect)
    }
    if (bagFilter === 'poison') {
      return combatBagItems.filter((x) => Boolean(x.item.poisonEffect))
    }
    return combatBagItems
  }, [combatBagItems, bagFilter])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-2xl rounded-2xl border-2 border-[#d4a455] bg-[#f6ecd8] text-[#261a10] shadow-2xl overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-[#2c1b10] via-[#3d2515] to-[#2c1b10] text-[#ffebc2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#f5c76b]" />
            <h3 className="song-serif font-bold text-base tracking-wide">
              随身行囊 · 临阵丹药与奇毒匣
            </h3>
            <span className="text-[11px] text-[#d6be99]">
              （择一使用即作为本合亮牌行动，并解除连招锁）
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-[#e6cfab] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 分类筛选条 */}
        <div className="px-4 py-2 bg-[#eadbc0] border-b border-[#c9b086] flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setBagFilter('all')}
            className={`px-3 py-1 rounded-full border font-medium cursor-pointer ${
              bagFilter === 'all'
                ? 'bg-[#8f1d14] border-[#8f1d14] text-[#fff8eb]'
                : 'bg-[#f7efe0] border-[#bfa377] text-[#4a3520]'
            }`}
          >
            全部 ({combatBagItems.length})
          </button>
          <button
            type="button"
            onClick={() => setBagFilter('elixir')}
            className={`px-3 py-1 rounded-full border font-medium flex items-center gap-1 cursor-pointer ${
              bagFilter === 'elixir'
                ? 'bg-[#1f5942] border-[#1f5942] text-[#fff8eb]'
                : 'bg-[#f7efe0] border-[#bfa377] text-[#4a3520]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            疗伤灵丹茶膳
          </button>
          <button
            type="button"
            onClick={() => setBagFilter('poison')}
            className={`px-3 py-1 rounded-full border font-medium flex items-center gap-1 cursor-pointer ${
              bagFilter === 'poison'
                ? 'bg-[#592154] border-[#592154] text-[#fff8eb]'
                : 'bg-[#f7efe0] border-[#bfa377] text-[#4a3520]'
            }`}
          >
            <Skull className="w-3 h-3" />
            战阵奇毒迷药
          </button>
        </div>

        {/* 物品列表 */}
        <div className="max-h-[52vh] overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredBagItems.length === 0 ? (
            <div className="col-span-2 py-10 text-center text-sm text-[#6e563a] song-serif">
              当前分类下暂无可用丹药或毒物。战后可前往城中熟药所、药铺或行囊四库备置。
            </div>
          ) : (
            filteredBagItems.map(({ item, qty }) => {
              const rStyle = RARITY_STYLE_MAP[item.rarity]
              const isPoison = Boolean(item.poisonEffect)
              const isOnceUsed = Boolean(
                item.useEffect?.onceOnly && consumedOnceItemIds.includes(item.id),
              )
              const effTags: string[] = []
              if (item.useEffect?.hp) {
                const scaledHp = scaleMedicineRecovery(
                  item.useEffect.hp,
                  playerMaxHp,
                  playerMaxMp,
                )
                effTags.push(`气血恢复 +${scaledHp}`)
              }
              if (item.useEffect?.mp) {
                const scaledMp = scaleMedicineRecovery(
                  item.useEffect.mp,
                  playerMaxHp,
                  playerMaxMp,
                )
                effTags.push(`内力回复 +${scaledMp}`)
              }
              if (item.useEffect?.maxHp) effTags.push(`气血上限 +${item.useEffect.maxHp}`)
              if (item.useEffect?.maxMp) effTags.push(`内力上限 +${item.useEffect.maxMp}`)
              if (item.useEffect?.agi) effTags.push(`身法 +${item.useEffect.agi}`)
              if (item.useEffect?.res) effTags.push(`抗性 +${item.useEffect.res}`)
              if (item.useEffect?.curePoison) effTags.push('涤除奇毒异常')
              if (isOnceUsed) effTags.push('已初品一次·再食无效')

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border-2 ${rStyle.borderCls} ${rStyle.cardBg} p-3 flex flex-col justify-between gap-2 shadow-sm`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                        >
                          {item.rarity}
                        </span>
                        <span className="song-serif font-bold text-sm text-[#24180e] truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#6b4f2e] shrink-0">
                        ×{qty}
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] text-[#59432b] line-clamp-2">
                      {isPoison ? item.poisonEffect : effTags.join(' · ') || item.desc}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[#cbb28a]/60">
                    <span className="text-[10px] text-[#785e3f]">{item.subType}</span>
                    <button
                      type="button"
                      disabled={isOnceUsed}
                      onClick={() => onUseItem(item.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold text-white shadow transition ${
                        isOnceUsed
                          ? 'bg-[#8d7c65] opacity-60 cursor-not-allowed'
                          : isPoison
                            ? 'bg-[#631d5c] hover:bg-[#7d2474] cursor-pointer'
                            : 'bg-[#8f1d14] hover:bg-[#ad2419] cursor-pointer'
                      }`}
                    >
                      {isOnceUsed ? '再食无效' : isPoison ? '临阵施毒' : '探囊服食'}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
