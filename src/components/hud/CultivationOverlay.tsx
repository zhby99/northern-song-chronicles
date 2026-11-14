import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { getArtExpRequired } from '../../data/playerMartialArts'
import { useGameStore } from '../../store/useGameStore'

export function CultivationOverlay() {
  const session = useGameStore((s) => s.cultivationSession)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const stopCultivationEarly = useGameStore((s) => s.stopCultivationEarly)

  if (!session) return null

  const art = MARTIAL_ART_DB_MAP[session.artId]
  const curEntry = learnedArts.find((x) => x.artId === session.artId)
  const curLevel = curEntry?.level ?? session.startLevel
  const curExp = curEntry?.exp ?? session.startExp
  const reqExp = art ? getArtExpRequired(art, curLevel) : 0
  const expPct =
    curLevel >= 10 ? 100 : reqExp > 0 ? Math.min(100, Math.round((curExp / reqExp) * 100)) : 0

  const fullDays = Math.floor(session.shichensElapsed / 12)
  const remShichen = session.shichensElapsed % 12
  const elapsedLabel =
    fullDays > 0 && remShichen > 0
      ? `${fullDays} 天 ${remShichen} 时辰`
      : fullDays > 0
        ? `${fullDays} 天`
        : `${remShichen} 时辰`

  const isFixedDays = session.mode !== 'until_breakthrough'
  const timePct = isFixedDays
    ? Math.min(100, Math.round((session.shichensElapsed / session.targetShichens) * 100))
    : null

  const costSummary =
    session.silverSpent > 0
      ? `宿费 -${session.silverSpent} 两`
      : session.foodSpent > 0
        ? `干粮 -${session.foodSpent} 份`
        : '师门驻地免费'

  return (
    <div
      id="cultivation-overlay"
      className="fixed inset-x-0 bottom-0 top-12 z-40 flex items-center justify-center bg-[#140e09]/60 backdrop-blur-[2px] select-none"
    >
      <div className="relative w-[min(92vw,440px)] rounded-xl border-2 border-[#c89d54]/80 bg-gradient-to-b from-[#2a1d12]/95 via-[#1f150c]/95 to-[#170f08]/95 px-7 py-6 text-[#f5dfb5] shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
        {/* 四角宋式铜饰线 */}
        <div className="pointer-events-none absolute inset-2 rounded-lg border border-[#c89d54]/25" />

        <div className="relative flex flex-col items-center text-center">
          <div className="text-[11px] tracking-[0.25em] text-[#c89d54] song-serif mb-1">
            {session.venueLabel} · 周天吐纳
          </div>

          <div className="cultivation-breathe my-2 inline-flex items-center justify-center rounded-full border border-[#c89d54]/60 bg-[#3b2514]/80 px-7 py-2 shadow-inner">
            <span className="song-serif text-3xl font-bold tracking-[0.35em] pl-[0.35em] text-[#fde6b8]">
              闭关中
            </span>
          </div>

          <div className="mt-2 text-sm font-semibold text-[#f8e7c4] song-serif">
            {session.artName}
            <span className="ml-2 text-xs font-normal text-[#c89d54]">
              {session.artFullTier} · 第 {curLevel} 重
            </span>
          </div>

          {/* 武学当前火候进度条 */}
          <div className="mt-3 w-full">
            <div className="flex justify-between text-[11px] text-[#d6be96] mb-1">
              <span>当前火候</span>
              <span>
                {curLevel >= 10
                  ? '第 10 重圆满'
                  : `${curExp.toLocaleString()} / ${reqExp.toLocaleString()} (${expPct}%)`}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#3a2819] border border-[#6e5233]/60">
              <div
                className="h-full bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#f59e0b] transition-all duration-100"
                style={{ width: `${expPct}%` }}
              />
            </div>
          </div>

          {/* 固定天数闭关时辰进度条 */}
          {timePct !== null && (
            <div className="mt-3 w-full">
              <div className="flex justify-between text-[11px] text-[#d6be96] mb-1">
                <span>闭关时程（目标 {session.mode} 天）</span>
                <span>{timePct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#3a2819] border border-[#6e5233]/50">
                <div
                  className="h-full bg-gradient-to-r from-[#0f766e] to-[#14b8a6] transition-all duration-100"
                  style={{ width: `${timePct}%` }}
                />
              </div>
            </div>
          )}

          {/* 实时统计信息 */}
          <div className="mt-4 grid w-full grid-cols-3 gap-2 rounded-lg border border-[#6e5233]/50 bg-[#181009]/70 px-3 py-2.5 text-xs">
            <div>
              <div className="text-[10px] text-[#a98f68]">已修时辰</div>
              <div className="mt-0.5 font-semibold text-[#fde6b8]">{elapsedLabel}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#a98f68]">熟练度增幅</div>
              <div className="mt-0.5 font-semibold text-[#fbbf24]">
                +{session.totalExpGained.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#a98f68]">耗费</div>
              <div className="mt-0.5 font-semibold text-[#e6d0a7]">{costSummary}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={stopCultivationEarly}
            className="mt-5 cursor-pointer rounded-lg border border-[#c89d54]/80 bg-[#5e2318] px-6 py-2 text-xs font-semibold tracking-wider text-[#fde6b8] shadow transition hover:bg-[#7c2d1e] active:scale-[0.98]"
          >
            收功出关 (ESC)
          </button>

          <p className="mt-2.5 text-[11px] text-[#a98f68]">
            每 0.125 秒走过一个时辰（1.5 秒一日），按 <kbd className="rounded border border-[#6e5233] bg-[#2a1d12] px-1.5 py-0.5 text-[10px] text-[#fde6b8]">ESC</kbd> 可随时按实际时长结算收功
          </p>
        </div>
      </div>
    </div>
  )
}
