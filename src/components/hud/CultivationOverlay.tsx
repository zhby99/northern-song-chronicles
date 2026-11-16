import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { getArtExpRequired } from '../../data/playerMartialArts'
import { useGameStore } from '../../store/useGameStore'
import type { CultivationSpeedStep } from '../../types/game'
import {
  getArtStageLabel,
  getExpForArtLevel,
  MAX_ART_EXP,
} from '../../utils/artsProgression'

const SPEED_OPTIONS: Array<{ step: CultivationSpeedStep; label: string; desc: string }> = [
  { step: 1, label: '1x', desc: '0.1秒/时辰' },
  { step: 3, label: '3x', desc: '0.1秒/3时辰' },
  { step: 6, label: '6x', desc: '0.1秒/半日' },
  { step: 12, label: '12x', desc: '0.1秒/1日' },
  { step: 48, label: '48x', desc: '0.1秒/4日' },
]

export function CultivationOverlay() {
  const session = useGameStore((s) => s.cultivationSession)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const baseStats = useGameStore((s) => s.baseStats)
  const artExps = useGameStore((s) => s.artExps)
  const sectChoreDays = useGameStore((s) => s.sectState.shaolinChoreDays)
  const speedStep = useGameStore((s) => s.cultivationSpeedStep)
  const setSpeedStep = useGameStore((s) => s.setCultivationSpeedStep)
  const stopCultivationEarly = useGameStore((s) => s.stopCultivationEarly)

  if (!session) return null

  const isScripture = session.kind === 'scripture'
  const isShaolinChore = session.kind === 'shaolin_chore'
  const isOddJob = session.kind === 'odd_job'
  const isTenArt = session.kind === 'ten_art' && Boolean(session.tenArtKey)
  const tenArtKey = session.tenArtKey

  const art =
    isScripture || isTenArt || isShaolinChore || isOddJob
      ? undefined
      : MARTIAL_ART_DB_MAP[session.artId]
  const curEntry =
    isScripture || isTenArt || isShaolinChore || isOddJob
      ? undefined
      : learnedArts.find((x) => x.artId === session.artId)

  const tenArtLv =
    isTenArt && tenArtKey
      ? tenArtKey === '骑术'
        ? baseStats.ridingSkill
        : (baseStats.skills[tenArtKey] ?? 0)
      : 0
  const tenArtExp =
    isTenArt && tenArtKey ? (artExps[tenArtKey] ?? getExpForArtLevel(tenArtLv)) : 0
  const tenArtPct = Math.min(100, Math.round((tenArtExp / MAX_ART_EXP) * 1000) / 10)

  const fullDays = Math.floor(session.shichensElapsed / 12)
  const remShichen = session.shichensElapsed % 12
  const elapsedLabel =
    fullDays > 0 && remShichen > 0
      ? `${fullDays} 天 ${remShichen} 时辰`
      : fullDays > 0
        ? `${fullDays} 天`
        : `${remShichen} 时辰`

  const curChoreDays = isShaolinChore
    ? Math.min(365, Math.max(sectChoreDays, session.startLevel + fullDays))
    : sectChoreDays
  const chorePct = Math.min(100, Math.round((curChoreDays / 365) * 100))

  const curLevel = isTenArt ? tenArtLv : (curEntry?.level ?? session.startLevel)
  const curExp = isTenArt ? tenArtExp : (curEntry?.exp ?? session.startExp)
  const reqExp = isTenArt ? MAX_ART_EXP : art ? getArtExpRequired(art, curLevel) : 0
  const expPct = isShaolinChore
    ? chorePct
    : isTenArt
      ? tenArtPct
      : curLevel >= 10
        ? 100
        : reqExp > 0
          ? Math.min(100, Math.round((curExp / reqExp) * 100))
          : 0

  const isFixedDays = session.mode !== 'until_breakthrough'
  const timePct = isFixedDays
    ? Math.min(100, Math.round((session.shichensElapsed / session.targetShichens) * 100))
    : null

  const costSummary =
    session.silverSpent > 0
      ? `${isTenArt ? '束脩' : '宿费'} -${session.silverSpent} 两`
      : session.foodSpent > 0
        ? `干粮 -${session.foodSpent} 份`
        : isOddJob
          ? '店家包食宿'
          : isShaolinChore
            ? '斋饭免费'
            : isTenArt
              ? '免费修行'
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
            {session.venueLabel} ·{' '}
            {isOddJob
              ? '市井帮工 · 包管食宿'
              : isShaolinChore
                ? '洒扫担水 · 磨砺禅心'
                : isScripture
                  ? '焚香诵经'
                  : isTenArt
                    ? '十艺研习'
                    : '周天吐纳'}
          </div>

          <div className="cultivation-breathe my-2 inline-flex items-center justify-center rounded-full border border-[#c89d54]/60 bg-[#3b2514]/80 px-7 py-2 shadow-inner">
            <span className="song-serif text-3xl font-bold tracking-[0.35em] pl-[0.35em] text-[#fde6b8]">
              {isOddJob ? '做工中' : isShaolinChore ? '劳作中' : isTenArt ? '修行中' : '闭关中'}
            </span>
          </div>

          <div className="mt-2 text-sm font-semibold text-[#f8e7c4] song-serif">
            {session.artName}
            <span className="ml-2 text-xs font-normal text-[#c89d54]">
              {isOddJob
                ? `月例工钱 ${session.dailyGain} 两 / 30 天`
                : isShaolinChore
                  ? `累计杂役 ${curChoreDays} / 365 天`
                  : isScripture
                    ? `当前经义 ${session.startLevel} 点`
                    : isTenArt
                      ? `Lv.${curLevel} / 100 · ${getArtStageLabel(curLevel)}`
                      : `${session.artFullTier} · 第 ${curLevel} 重`}
            </span>
          </div>

          {/* 进度条（武学火候 / 十艺修为 / 少林杂役满期进度） */}
          {!isScripture && !isOddJob && (
            <div className="mt-3 w-full">
              <div className="flex justify-between text-[11px] text-[#d6be96] mb-1">
                <span>
                  {isShaolinChore ? '山门杂役总期' : isTenArt ? '十艺累积修为' : '当前火候'}
                </span>
                <span>
                  {isShaolinChore
                    ? `${curChoreDays} / 365 天 (${chorePct}%)`
                    : isTenArt
                      ? `${curExp.toLocaleString()} / ${MAX_ART_EXP.toLocaleString()} (${expPct}%)`
                      : curLevel >= 10
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
          )}

          {/* 固定天数时程进度条 */}
          {timePct !== null && (
            <div className="mt-3 w-full">
              <div className="flex justify-between text-[11px] text-[#d6be96] mb-1">
                <span>
                  {isOddJob
                    ? `做工时程（目标 ${session.mode} 天 · 一月）`
                    : isShaolinChore
                      ? `本次当值时程（目标 ${session.mode} 天）`
                      : isScripture
                        ? '研读时程（目标 30 天）'
                        : isTenArt
                          ? `修行时程（目标 ${session.mode} 天）`
                          : `闭关时程（目标 ${session.mode} 天）`}
                </span>
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
              <div className="text-[10px] text-[#a98f68]">
                {isOddJob
                  ? '已做工时日'
                  : isShaolinChore
                    ? '本次已劳作'
                    : isScripture
                      ? '已研读天数'
                      : '已修时辰'}
              </div>
              <div className="mt-0.5 font-semibold text-[#fde6b8]">{elapsedLabel}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#a98f68]">
                {isOddJob
                  ? '已结工钱'
                  : isShaolinChore
                    ? '距引荐入门'
                    : isScripture
                      ? '圆满增幅'
                      : isTenArt
                        ? '经验增幅'
                        : '熟练度增幅'}
              </div>
              <div className="mt-0.5 font-semibold text-[#fbbf24]">
                {isOddJob
                  ? `+${session.totalExpGained} / ${session.dailyGain} 两`
                  : isShaolinChore
                    ? `尚余 ${Math.max(0, 365 - curChoreDays)} 天`
                    : isScripture
                      ? '经义 +1'
                      : `+${session.totalExpGained.toLocaleString()}`}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#a98f68]">耗费</div>
              <div className="mt-0.5 font-semibold text-[#e6d0a7]">{costSummary}</div>
            </div>
          </div>

          {/* 修行/闭关速度调节 */}
          <div className="mt-3 flex w-full items-center justify-between gap-2 rounded-lg border border-[#6e5233]/50 bg-[#181009]/60 px-3 py-2 text-[11px]">
            <span className="text-[#c89d54] shrink-0">推演速度</span>
            <div className="flex flex-wrap items-center justify-end gap-1">
              {SPEED_OPTIONS.map((opt) => {
                const active = speedStep === opt.step
                return (
                  <button
                    key={opt.step}
                    type="button"
                    onClick={() => setSpeedStep(opt.step)}
                    className={`cursor-pointer rounded px-2 py-0.5 text-[10px] font-semibold transition ${
                      active
                        ? 'border border-[#e6b86a] bg-[#8c541f] text-[#fff6e0] shadow-sm'
                        : 'border border-[#6e5233]/60 bg-[#2a1d12] text-[#c7b08a] hover:bg-[#3a2819]'
                    }`}
                    title={opt.desc}
                  >
                    {opt.desc}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={stopCultivationEarly}
            className="mt-4 cursor-pointer rounded-lg border border-[#c89d54]/80 bg-[#5e2318] px-6 py-2 text-xs font-semibold tracking-wider text-[#fde6b8] shadow transition hover:bg-[#7c2d1e] active:scale-[0.98]"
          >
            {isOddJob
              ? '结账收工 (ESC)'
              : isShaolinChore
                ? '暂歇收工 (ESC)'
                : isTenArt
                  ? '结束修行 (ESC)'
                  : '收功出关 (ESC)'}
          </button>

          <p className="mt-2.5 text-[11px] text-[#a98f68]">
            当前{' '}
            <span className="text-[#fde6b8] font-medium">
              {SPEED_OPTIONS.find((o) => o.step === speedStep)?.desc ?? '0.1秒/时辰'}
            </span>
            ，按{' '}
            <kbd className="rounded border border-[#6e5233] bg-[#2a1d12] px-1.5 py-0.5 text-[10px] text-[#fde6b8]">
              ESC
            </kbd>
            {isOddJob
              ? ' 可随时按已满天数结账收工（每满 3 天结 1 两，满 30 天结 10 两）'
              : isShaolinChore
                ? ' 可随时按整日累计杂役并收工歇息'
                : isScripture
                  ? ' 可随时收功出关（未满 30 天不计增幅）'
                  : ' 可随时按实际时长结算收功'}
          </p>
        </div>
      </div>
    </div>
  )
}
