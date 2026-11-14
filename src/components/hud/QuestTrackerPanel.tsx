import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Compass, ScrollText, ShieldAlert } from 'lucide-react'
import { REGION_DB_MAP } from '../../data/gameDb'
import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import { useGameStore } from '../../store/useGameStore'
import type { QuestCategoryKey, QuestPrimitiveValue } from '../../types/quest'
import {
  assessQuestRealmReadiness,
  estimateHeroRealm,
  type RealmReadinessStatus,
} from '../../utils/realmUtils'

const CATEGORY_BADGE: Record<QuestCategoryKey, { label: string; cls: string }> = {
  sect_entry: { label: '宗门入门', cls: 'bg-[#1f4d3b] text-[#e7f7ef]' },
  sect_mission: { label: '师门要务', cls: 'bg-[#781710] text-[#fff3df]' },
  city_story: { label: '州府风华', cls: 'bg-[#5c3d1e] text-[#fde8c8]' },
  main_story: { label: '皇祐风云', cls: 'bg-[#8f1d14] text-[#fff8ee]' },
  adventure: { label: '江湖奇遇', cls: 'bg-[#355263] text-[#eef7fc]' },
}

const READINESS_PILL: Record<RealmReadinessStatus, string> = {
  ready: 'bg-[#1b5132]/90 text-[#dff7e9] border-[#4ca673]/60',
  challenging: 'bg-[#8a5210]/90 text-[#fff3d6] border-[#e2a94b]/60',
  dangerous: 'bg-[#8f1d14]/95 text-[#ffe7e4] border-[#e67c73]/70',
}

function getDamingClueSummary(flags: Record<string, QuestPrimitiveValue>) {
  const ferry = Boolean(flags.dm_baji_clue_ferry)
  const ledger = Boolean(flags.dm_baji_clue_ledger)
  const beggar = Boolean(flags.dm_baji_clue_beggar)
  const count = (ferry ? 1 : 0) + (ledger ? 1 : 0) + (beggar ? 1 : 0)
  return { ferry, ledger, beggar, count }
}

export function QuestTrackerPanel() {
  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const dayCount = useGameStore((s) => s.dayCount)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const sectState = useGameStore((s) => s.sectState)
  const questState = useGameStore((s) => s.questState)
  const locateQuestTargetOnMap = useGameStore((s) => s.locateQuestTargetOnMap)
  const openMenu = useGameStore((s) => s.openMenu)

  const [collapsed, setCollapsed] = useState(false)

  const playerRealm = useMemo(() => estimateHeroRealm(maxHp, maxMp), [maxHp, maxMp])
  const activeList = useMemo(
    () => Object.values(questState.activeQuests),
    [questState.activeQuests],
  )
  const activeSpy = sectState.sectId === 'SECT-22' ? sectState.activeLiaoSpy : null
  const totalActiveCount = activeList.length + (activeSpy ? 1 : 0)

  const discoverableQuests = useMemo(() => {
    if (totalActiveCount > 0) return []
    const focusRegionId = viewMode === 'world' ? currentNodeId : activeRegionId
    return QUEST_REGISTRY.filter(
      (q) => !questState.activeQuests[q.id] && !questState.completedQuests[q.id],
    )
      .sort((a, b) => {
        const aLocal = a.regionId === focusRegionId || a.startLocation?.regionId === focusRegionId ? 0 : 1
        const bLocal = b.regionId === focusRegionId || b.startLocation?.regionId === focusRegionId ? 0 : 1
        return aLocal - bLocal
      })
      .slice(0, 3)
  }, [totalActiveCount, viewMode, currentNodeId, activeRegionId, questState.activeQuests, questState.completedQuests])

  const topOffsetClass = viewMode === 'world' ? 'top-[56px]' : 'top-[96px]'

  return (
    <aside
      aria-label="江湖任务追踪面板"
      className={`fixed right-3.5 ${topOffsetClass} z-20 w-72 sm:w-80 rounded-lg border border-[#a88754]/75 bg-[#1b120a]/90 backdrop-blur-md text-[#f6ebd4] shadow-2xl overflow-hidden transition-all`}
    >
      {/* 顶栏：标题 + 当前修为 + 折叠按钮 */}
      <div className="px-3 py-2 bg-[#2a1b0e]/95 border-b border-[#8c6e46]/50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center gap-1.5 text-left min-w-0 flex-1 cursor-pointer"
        >
          <ScrollText className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="song-serif font-bold text-xs sm:text-sm text-amber-200 truncate">
            江湖任务追踪
          </span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#781710] text-[#fff6e5] text-[10px] font-mono font-bold shrink-0">
            {totalActiveCount}
          </span>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          <span
            title="依据少侠当前气血与内力上限综合评定的武学境界"
            className="px-1.5 py-0.5 rounded bg-[#3b2715] border border-[#a88754]/60 text-[10px] text-amber-200 font-semibold"
          >
            {playerRealm.label}
          </span>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="p-0.5 rounded hover:bg-[#3f2a17] text-amber-200/80 cursor-pointer"
            title={collapsed ? '展开任务追踪' : '收起任务追踪'}
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 面板内容 */}
      {!collapsed && (
        <div className="max-h-[40vh] overflow-y-auto p-2.5 space-y-2.5 text-xs">
          {/* 常山枪派年度辽谍军令 */}
          {activeSpy && (() => {
            const readiness = assessQuestRealmReadiness(maxHp, maxMp, undefined, activeSpy.realm)
            const remainDays = Math.max(0, activeSpy.deadlineDay - dayCount)
            return (
              <div className="p-2.5 rounded bg-[#2c1512]/90 border border-[#c25b4e]/75 space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#8f1d14] text-[#fff8ee]">
                    年度军令
                  </span>
                  <span className="text-[10px] font-mono text-rose-200 font-bold">
                    限期剩 {remainDays} 日
                  </span>
                </div>

                <div className="song-serif font-bold text-[13px] text-amber-100 leading-snug">
                  燕云锄奸 · 诛杀辽谍【{activeSpy.name}】
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-[#3b2715] border border-[#a88754]/50 text-amber-200">
                    建议修为：{readiness.recommendedRealm.label}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded border font-semibold ${READINESS_PILL[readiness.status]}`}>
                    {readiness.statusLabel}
                  </span>
                </div>

                <div className="text-[11px] text-[#e7d6b8] leading-relaxed">
                  <span className="text-amber-300 font-semibold">下一步：</span>
                  赶赴【{activeSpy.regionName} · {activeSpy.buildingName}】寻获辽谍（{activeSpy.realm}）并开启生死对决。
                </div>

                <button
                  type="button"
                  onClick={() =>
                    locateQuestTargetOnMap({
                      regionId: activeSpy.regionId,
                      buildingId: activeSpy.buildingId,
                      spotId: activeSpy.spotId ?? undefined,
                      customLabel: `${activeSpy.regionName} · ${activeSpy.buildingName}`,
                    })
                  }
                  className="w-full py-1 px-2 rounded bg-[#781710] hover:bg-[#961f16] text-[#fff6e5] text-[11px] font-bold song-serif flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>舆图指引：{activeSpy.regionName}</span>
                </button>
              </div>
            )
          })()}

          {/* 进行中的声明式任务链 */}
          {activeList.map((prog) => {
            const qDef = QUEST_MAP[prog.questId]
            const step = qDef?.steps[prog.stepId]
            const cat = CATEGORY_BADGE[qDef?.category ?? 'adventure'] ?? CATEGORY_BADGE.adventure
            const readiness = assessQuestRealmReadiness(
              maxHp,
              maxMp,
              qDef?.recommendedRealm,
              qDef?.maxOpponentRealm,
            )
            const remainDays =
              prog.deadlineDay !== null ? Math.max(0, prog.deadlineDay - dayCount) : null
            const damingClues =
              prog.questId === 'QST-CITY-DAMING-BAJI' && prog.stepId === 'investigate_clues'
                ? getDamingClueSummary(questState.flags)
                : null

            return (
              <div
                key={prog.questId}
                className="p-2.5 rounded bg-[#271b10]/90 border border-[#8c6e46]/60 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${cat.cls}`}>
                    {cat.label}
                  </span>
                  {remainDays !== null && (
                    <span className="text-[10px] font-mono text-rose-200 font-bold">
                      限期剩 {remainDays} 日
                    </span>
                  )}
                </div>

                <div className="song-serif font-bold text-[13px] text-amber-100 leading-snug">
                  《{qDef?.title ?? prog.questId}》
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-[#3b2715] border border-[#a88754]/50 text-amber-200">
                    建议修为：{readiness.recommendedRealm.label}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded border font-semibold ${READINESS_PILL[readiness.status]}`}>
                    {readiness.status === 'dangerous' && (
                      <ShieldAlert className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" />
                    )}
                    {readiness.statusLabel}
                  </span>
                </div>

                <div className="text-[11px] text-amber-200/95 font-semibold">
                  当前阶段：{step?.title ?? prog.stepId}
                </div>

                <div className="text-[11px] text-[#e7d6b8] leading-relaxed">
                  <span className="text-amber-300 font-semibold">下一步：</span>
                  {step?.nextHint ?? step?.objective ?? '请按江湖线索继续探访。'}
                </div>

                {damingClues && (
                  <div className="p-1.5 rounded bg-[#1b120a]/80 border border-[#735837]/50 space-y-1">
                    <div className="text-[10px] text-amber-200 font-semibold">
                      已查明铁证：{damingClues.count}/2（集齐3条另有厚赏）
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      <span
                        className={`px-1.5 py-0.5 rounded ${
                          damingClues.ferry
                            ? 'bg-[#1b5132] text-[#dff7e9]'
                            : 'bg-[#362717] text-[#bfa782]'
                        }`}
                      >
                        {damingClues.ferry ? '✓' : '○'} 渡口勘断口
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded ${
                          damingClues.ledger
                            ? 'bg-[#1b5132] text-[#dff7e9]'
                            : 'bg-[#362717] text-[#bfa782]'
                        }`}
                      >
                        {damingClues.ledger ? '✓' : '○'} 留守司查账
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded ${
                          damingClues.beggar
                            ? 'bg-[#1b5132] text-[#dff7e9]'
                            : 'bg-[#362717] text-[#bfa782]'
                        }`}
                      >
                        {damingClues.beggar ? '✓' : '○'} 望楼访陈孤雁
                      </span>
                    </div>
                  </div>
                )}

                {step?.targetLocation && (
                  <button
                    type="button"
                    onClick={() => locateQuestTargetOnMap(step.targetLocation!)}
                    className="w-full py-1 px-2 rounded bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff6e5] text-[11px] font-bold song-serif flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Compass className="w-3 h-3" />
                    <span>
                      舆图指引：
                      {step.targetLocation.customLabel ??
                        REGION_DB_MAP[step.targetLocation.regionId]?.name ??
                        step.targetLocation.regionId}
                    </span>
                  </button>
                )}
              </div>
            )
          })}

          {/* 无进行中任务时：展示可触发江湖传闻 */}
          {totalActiveCount === 0 && (
            <div className="space-y-2">
              <div className="text-[11px] text-[#cbb693] leading-relaxed">
                当前尚无在手卷宗，以下为四方江湖可接取传闻：
              </div>
              {discoverableQuests.map((q) => {
                const readiness = assessQuestRealmReadiness(
                  maxHp,
                  maxMp,
                  q.recommendedRealm,
                  q.maxOpponentRealm,
                )
                return (
                  <div
                    key={q.id}
                    className="p-2 rounded bg-[#271b10]/85 border border-[#8c6e46]/45 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="song-serif font-bold text-xs text-amber-100 truncate">
                        《{q.title}》
                      </span>
                      <span className={`px-1.5 py-0.2 rounded border text-[10px] shrink-0 ${READINESS_PILL[readiness.status]}`}>
                        建议 {readiness.recommendedRealm.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#d9c7a5] leading-snug">
                      {q.startHint ?? q.summary}
                    </div>
                    {q.startLocation && (
                      <button
                        type="button"
                        onClick={() => locateQuestTargetOnMap(q.startLocation!)}
                        className="w-full py-1 px-2 rounded bg-[#3f2a17] hover:bg-[#523820] text-amber-200 text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Compass className="w-3 h-3" />
                        <span>指引：{q.startLocation.customLabel ?? q.startLocation.regionId}</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* 底部快捷开启完整卷宗 */}
          <button
            type="button"
            onClick={() => openMenu('quests')}
            className="w-full py-1.5 px-2 rounded bg-[#332212] hover:bg-[#46301b] border border-[#8c6e46]/55 text-amber-200 text-[11px] font-bold song-serif cursor-pointer"
          >
            展开《江湖纪事》详卷 (J) ▸
          </button>
        </div>
      )}
    </aside>
  )
}
