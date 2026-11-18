import { useMemo } from 'react'
import { computeCelunBonusAmount } from '../../../engine/economy'
import {
  getYamenBountyPostings,
  isYamenBountyExpired,
  YAMEN_BOUNTY_DEADLINE_DAYS,
} from '../../../engine/world/yamenBounty'
import { useGameStore } from '../../../store/useGameStore'
import type { ActiveYamenBounty } from '../../../types/game'

interface InspectorYamenBountySectionProps {
  activeRegionId: string
  regionName: string
  dayCount: number
  isAtCurrentRegion: boolean
  isBoardBuilding: boolean
  activeYamenBounty: ActiveYamenBounty | null
  yamenBountyDoneIds: string[]
  celunSkill: number
}

const GRADE_TONE: Record<1 | 2 | 3, string> = {
  1: 'border-[#b58742] bg-[#faf3e3]',
  2: 'border-[#a65a1e] bg-[#f8eadb]',
  3: 'border-[#8f1d14] bg-[#f7e2dc]',
}

export function InspectorYamenBountySection({
  activeRegionId,
  regionName,
  dayCount,
  isAtCurrentRegion,
  isBoardBuilding,
  activeYamenBounty,
  yamenBountyDoneIds,
  celunSkill,
}: InspectorYamenBountySectionProps) {
  const activeLive =
    activeYamenBounty && !isYamenBountyExpired(activeYamenBounty, dayCount)
      ? activeYamenBounty
      : null
  const postings = useMemo(
    () =>
      isBoardBuilding && isAtCurrentRegion && !activeLive
        ? getYamenBountyPostings({
            issueRegionId: activeRegionId,
            dayCount,
            doneIds: yamenBountyDoneIds,
          })
        : [],
    [isBoardBuilding, isAtCurrentRegion, activeLive, activeRegionId, dayCount, yamenBountyDoneIds],
  )

  if (!isBoardBuilding) return null

  return (
    <div className="p-2.5 rounded-md bg-[#f5e7cb] border border-[#8f1d14]/60 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-bold song-serif text-[#781710]">
          ⚖ 州府悬赏缉凶榜 · 散人亦可揭榜
        </div>
        <span className="text-[10px] text-[#6b5235]">每月换榜 · 限 {YAMEN_BOUNTY_DEADLINE_DAYS} 日</span>
      </div>

      {activeYamenBounty ? (
        <div className="rounded border border-[#b58742] bg-[#faf3e3] p-2 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold song-serif text-[#23180f]">
              在案悬赏：【{activeYamenBounty.targetName}】
            </span>
            <span className="font-mono font-bold text-[#781710]">
              赏银 +{computeCelunBonusAmount(activeYamenBounty.rewardSilver, celunSkill)} 两
            </span>
          </div>
          <div className="text-[10px] text-[#5c3d1e]">
            {activeYamenBounty.gradeLabel} · {activeYamenBounty.targetTitle} · {activeYamenBounty.realm}
            ；潜匿【{activeYamenBounty.regionName} · {activeYamenBounty.buildingName}】
            {activeLive
              ? `，限第 ${activeYamenBounty.deadlineDay} 日前缉拿`
              : '（已逾期作废）'}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => useGameStore.getState().abandonYamenBounty()}
              className="px-2.5 py-0.5 rounded border border-[#c53929] bg-[#fce8e6] hover:bg-[#f8d2ce] text-[#8f1d14] text-[10px] font-bold song-serif cursor-pointer"
            >
              {activeLive ? '撕榜作罢（声望 -1）' : '销去逾期榜文'}
            </button>
          </div>
        </div>
      ) : null}

      {!activeLive &&
        (!isAtCurrentRegion ? (
          <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
            🔒 须亲临【{regionName}】衙门方可揭榜
          </div>
        ) : postings.length === 0 ? (
          <div className="text-[11px] text-[#6b5235]">本月榜文已被少侠悉数揭尽，下月再来。</div>
        ) : (
          <div className="space-y-1.5">
            {postings.map((p) => (
              <div
                key={p.id}
                className={`rounded border p-2 text-[11px] flex items-center justify-between gap-2 ${GRADE_TONE[p.grade]}`}
              >
                <div className="min-w-0">
                  <div className="font-bold song-serif text-[#23180f] truncate">
                    {p.gradeLabel}：{p.targetName}
                  </div>
                  <div className="text-[10px] text-[#5c3d1e]">
                    {p.targetTitle} · {p.realm} · 潜匿【{p.regionName}】约 {p.routeLi} 里
                  </div>
                  <div className="text-[10px] text-[#1f4d3b] font-semibold">
                    赏银 {computeCelunBonusAmount(p.rewardSilver, celunSkill)} 两 · 战斗经验 +
                    {p.rewardCombatExp} · 侠义 +{p.rewardChivalry}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => useGameStore.getState().acceptYamenBounty(p.id)}
                  className="shrink-0 px-2.5 py-1 rounded bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] text-[11px] font-bold song-serif cursor-pointer"
                >
                  揭榜
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
