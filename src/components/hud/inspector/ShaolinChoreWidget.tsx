import { useState } from 'react'
import { SHAOLIN_CHORE_TARGET_DAYS } from '../../../engine/sect'

interface ShaolinChoreWidgetProps {
  shaolinChoreDays: number
  isAtCurrentRegion: boolean
  onStartShaolinChore: (days: number) => void
}

export function ShaolinChoreWidget({
  shaolinChoreDays,
  isAtCurrentRegion,
  onStartShaolinChore,
}: ShaolinChoreWidgetProps) {
  const [choreDaysInput, setChoreDaysInput] = useState<string>('30')
  const remainChoreDays = Math.max(0, SHAOLIN_CHORE_TARGET_DAYS - shaolinChoreDays)
  const chorePct = Math.min(
    100,
    Math.round((shaolinChoreDays / SHAOLIN_CHORE_TARGET_DAYS) * 100),
  )

  const handleStartCustomChore = (daysToRun?: number) => {
    const parsed =
      daysToRun !== undefined ? daysToRun : Math.max(1, Math.floor(Number(choreDaysInput) || 1))
    const clamped = Math.max(1, Math.min(Math.max(1, remainChoreDays), parsed))
    setChoreDaysInput(String(clamped))
    onStartShaolinChore(clamped)
  }

  return (
    <div className="p-3.5 rounded-md bg-[#f5e7cb] border-2 border-[#b58742] space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold song-serif text-[#781710]">
          ★ 嵩山少林寺 · 山门杂役当值（非正式门籍）
        </span>
        <span className="text-[11px] font-mono font-bold text-[#5c3d1e]">
          {shaolinChoreDays} / {SHAOLIN_CHORE_TARGET_DAYS} 天
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[#dcc8a6] border border-[#b5986e]">
        <div
          className="h-full bg-gradient-to-r from-[#8f1d14] via-[#b45309] to-[#d97706] transition-all"
          style={{ width: `${chorePct}%` }}
        />
      </div>

      <p className="text-xs text-[#4a3520] leading-relaxed">
        挑水劈柴、洒扫山门石阶。寺内管斋饭免费，可自由指定本次劳作天数（支持中途按 ESC 暂歇累计）。尚差{' '}
        <strong className="text-[#8f1d14]">{remainChoreDays}</strong> 天期满引荐为少林【外门俗家弟子】。
      </p>

      {isAtCurrentRegion ? (
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-[#5c3d1e] shrink-0">
              自选劳作天数：
            </label>
            <input
              type="number"
              min={1}
              max={Math.max(1, remainChoreDays)}
              value={choreDaysInput}
              onChange={(e) => setChoreDaysInput(e.target.value)}
              className="w-24 px-2 py-1 rounded bg-[#fffaf0] border border-[#8c6e46] text-xs font-mono font-bold text-[#23180f] focus:outline-none focus:border-[#8f1d14]"
            />
            <span className="text-xs text-[#6b5235]">天</span>
            <button
              type="button"
              onClick={() => handleStartCustomChore()}
              className="ml-auto px-3.5 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
            >
              执帚上工
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-[#6b5235] mr-0.5">快捷排期：</span>
            {[1, 10, 30, 90]
              .filter((d) => d < remainChoreDays)
              .map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleStartCustomChore(d)}
                  className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e3d2b0] border border-[#b5986e] text-[11px] font-medium text-[#3d2814] cursor-pointer transition"
                >
                  劳作 {d} 天
                </button>
              ))}
            {remainChoreDays > 0 && (
              <button
                type="button"
                onClick={() => handleStartCustomChore(remainChoreDays)}
                className="px-2.5 py-0.5 rounded bg-[#6b4614] hover:bg-[#825518] border border-[#c89d54] text-[11px] font-bold text-[#fff8eb] cursor-pointer transition"
              >
                做满剩余（{remainChoreDays} 天）
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-xs text-[#8f1d14] font-medium">
          🔒 须少侠亲至【嵩山少林寺】山门驻足，方可开始杂役当值。
        </div>
      )}
    </div>
  )
}
