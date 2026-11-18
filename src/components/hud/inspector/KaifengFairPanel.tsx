import { useMemo } from 'react'
import {
  getKaifengFairLots,
  getKaifengFairSchedule,
  KAIFENG_FAIR_LOT_COUNT,
} from '../../../engine/economy/kaifengFair'
import { useGameStore } from '../../../store/useGameStore'

export function KaifengFairPanel({ isAtCurrentRegion }: { isAtCurrentRegion: boolean }) {
  const dayCount = useGameStore((s) => s.dayCount)
  const silver = useGameStore((s) => s.silver)
  const arithmeticSkill = useGameStore((s) => s.skills['算术'] ?? 0)
  const purchases = useGameStore((s) => s.kaifengFairPurchases)
  const consumedUniqueIds = useGameStore((s) => s.consumedUniqueIds)
  const buyKaifengFairLot = useGameStore((s) => s.buyKaifengFairLot)

  const schedule = getKaifengFairSchedule(dayCount)
  const lots = useMemo(
    () =>
      schedule.isOpen
        ? getKaifengFairLots({
            yearIdx: schedule.yearIdx,
            arithmeticSkill,
            purchases,
            consumedUniqueIds,
          })
        : [],
    [schedule.isOpen, schedule.yearIdx, arithmeticSkill, purchases, consumedUniqueIds],
  )

  return (
    <div className="space-y-2">
      <div className="text-[10px] text-[#5c3d1e] bg-[#fbf1d9] px-2 py-1.5 rounded border border-[#b58742] flex items-center justify-between gap-2">
        <span>
          开封大集每年六月整月开市（第 {schedule.yearIdx + 1} 年），随机陈列 {KAIFENG_FAIR_LOT_COUNT}{' '}
          件天下无主的地阶奇珍，按物值三倍出售
        </span>
        <span className="font-mono text-[#781710] font-bold shrink-0">一物一件</span>
      </div>
      {!schedule.isOpen ? (
        <div className="p-3 rounded bg-[#efe4cc] border border-[#cbb693] text-[11px] text-[#5c3d1e] leading-relaxed">
          开封大集须待每年<strong>六月</strong>方才开市（当前第{' '}
          <span className="font-mono font-bold text-[#781710]">{schedule.monthOfYear}</span> 月，距开市尚余{' '}
          <span className="font-mono font-bold text-[#781710]">{schedule.monthsUntilOpen}</span>{' '}
          个月）。
        </div>
      ) : lots.length === 0 ? (
        <div className="p-3 rounded bg-[#efe4cc] border border-[#cbb693] text-[11px] text-[#5c3d1e]">
          天下无主的地阶奇珍已尽归少侠囊中，今岁大集再无可陈之宝。
        </div>
      ) : (
        <div className="space-y-1.5">
          {lots.map((lot) => {
            const canBuy = isAtCurrentRegion && !lot.boughtThisYear && silver >= lot.finalPrice
            return (
              <div
                key={lot.itemId}
                className="flex items-center justify-between gap-2 p-2 rounded bg-[#faf3e3] border border-[#b58742]"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold song-serif text-xs text-[#23180f]">{lot.item.name}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#efe0c4] text-[#6b4614]">
                      {lot.item.rarity}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#6b5235] truncate">
                    {lot.item.subType} · {lot.item.desc}
                  </div>
                  {lot.discountSaved > 0 && (
                    <div className="text-[9px] text-[#1f4d3b] font-mono">
                      标价 {lot.basePrice} 两 · 算术议价省 {lot.discountSaved} 两
                    </div>
                  )}
                </div>
                {lot.boughtThisYear ? (
                  <span className="px-2 py-1 rounded text-[10px] font-bold song-serif bg-[#e6dcc8] text-[#1f4d3b] border border-[#cbb693] shrink-0">
                    ✓ 已购得
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={!canBuy}
                    onClick={() => buyKaifengFairLot(lot.itemId)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif shrink-0 transition ${
                      canBuy
                        ? 'bg-[#6b4614] hover:bg-[#825518] text-[#fde68a] cursor-pointer shadow-sm'
                        : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                    }`}
                  >
                    {lot.finalPrice.toLocaleString()} 两购置
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
