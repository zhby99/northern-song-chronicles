import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Compass, Eye, EyeOff, ScrollText, ShieldAlert } from 'lucide-react'
import { REGION_DB_MAP } from '../../data/gameDb'
import { QUEST_MAP } from '../../data/quests'
import { useGameStore } from '../../store/useGameStore'
import type { QuestCategoryKey, QuestPrimitiveValue } from '../../types/quest'
import {
  assessQuestRealmReadiness,
  estimateHeroRealm,
  type RealmReadinessStatus,
} from '../../engine/stats/realmUtils'

const CATEGORY_BADGE: Record<QuestCategoryKey, { label: string; cls: string }> = {
  sect_entry: { label: '宗门入门', cls: 'bg-[#1f4d3b] text-[#e7f7ef]' },
  sect_mission: { label: '师门要务', cls: 'bg-[#781710] text-[#fff3df]' },
  city_story: { label: '皇祐风云', cls: 'bg-[#8f1d14] text-[#fff8ee]' },
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
  const dayCount = useGameStore((s) => s.dayCount)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const sectState = useGameStore((s) => s.sectState)
  const activeYamenBounty = useGameStore((s) => s.activeYamenBounty)
  const questState = useGameStore((s) => s.questState)
  const hiddenQuestIds = useGameStore((s) => s.hiddenQuestIds)
  const toggleHideTrackedQuest = useGameStore((s) => s.toggleHideTrackedQuest)
  const unhideAllTrackedQuests = useGameStore((s) => s.unhideAllTrackedQuests)
  const locateQuestTargetOnMap = useGameStore((s) => s.locateQuestTargetOnMap)
  const openMenu = useGameStore((s) => s.openMenu)

  const [collapsed, setCollapsed] = useState(false)

  const hiddenSet = useMemo(() => new Set(hiddenQuestIds), [hiddenQuestIds])
  const playerRealm = useMemo(() => estimateHeroRealm(maxHp, maxMp), [maxHp, maxMp])
  const activeList = useMemo(
    () => Object.values(questState.activeQuests),
    [questState.activeQuests],
  )
  const activeSpy = sectState.sectId === 'SECT-22' ? sectState.activeLiaoSpy : null
  const activeKaifengWarrant =
    sectState.sectId === 'SECT-17' ? sectState.activeKaifengWarrant : null
  const activeSectTask = sectState.activeSectTask
  const visibleYamenBounty =
    activeYamenBounty && !hiddenSet.has('__yamen_bounty__') ? activeYamenBounty : null

  const visibleSpy = activeSpy && !hiddenSet.has('__liao_spy__') ? activeSpy : null
  const visibleKaifengWarrant =
    activeKaifengWarrant && !hiddenSet.has('__kaifeng_warrant__') ? activeKaifengWarrant : null
  const visibleSectTask =
    activeSectTask && !hiddenSet.has('__sect_task__') ? activeSectTask : null
  const visibleActiveList = useMemo(
    () => activeList.filter((q) => !hiddenSet.has(q.questId)),
    [activeList, hiddenSet],
  )

  const totalActiveCount =
    activeList.length +
    (activeSpy ? 1 : 0) +
    (activeKaifengWarrant ? 1 : 0) +
    (activeYamenBounty ? 1 : 0) +
    (activeSectTask ? 1 : 0)
  const visibleCount =
    visibleActiveList.length +
    (visibleSpy ? 1 : 0) +
    (visibleKaifengWarrant ? 1 : 0) +
    (visibleYamenBounty ? 1 : 0) +
    (visibleSectTask ? 1 : 0)
  const hiddenActiveCount = Math.max(0, totalActiveCount - visibleCount)

  const topOffsetClass = viewMode === 'world' ? 'top-[112px]' : 'top-[120px]'

  return (
    <aside
      aria-label="江湖任务追踪面板"
      className={`fixed left-3.5 ${topOffsetClass} z-20 w-72 sm:w-80 rounded-lg border border-[#a88754]/75 bg-[#1b120a]/90 backdrop-blur-md text-[#f6ebd4] shadow-2xl overflow-hidden transition-all`}
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
            {visibleCount}
          </span>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {hiddenActiveCount > 0 && (
            <button
              type="button"
              onClick={unhideAllTrackedQuests}
              title={`恢复显示已隐藏的 ${hiddenActiveCount} 项任务`}
              className="px-1.5 py-0.5 rounded bg-[#3b2715] hover:bg-[#52371e] border border-[#a88754]/60 text-[10px] text-amber-200 flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>+{hiddenActiveCount}</span>
            </button>
          )}
          <span
            title="依据少侠当前内力上限精准评定的武学境界"
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
        <div className="max-h-[38vh] overflow-y-auto p-2.5 space-y-2.5 text-xs">
          {/* 常山枪派半年度辽谍军令 */}
          {visibleSpy && (() => {
            const spy = visibleSpy
            const readiness = assessQuestRealmReadiness(maxHp, maxMp, undefined, spy.realm)
            const remainDays = Math.max(0, spy.deadlineDay - dayCount)
            return (
              <div className="p-2.5 rounded bg-[#2c1512]/90 border border-[#c25b4e]/75 space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#8f1d14] text-[#fff8ee]">
                    半年军令
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-rose-200 font-bold">
                      限期剩 {remainDays} 日
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleHideTrackedQuest('__liao_spy__')}
                      title="暂时隐藏此任务，不在追踪面板显示"
                      className="p-0.5 rounded hover:bg-[#4d231e] text-amber-200/70 hover:text-amber-100 cursor-pointer"
                    >
                      <EyeOff className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="song-serif font-bold text-[13px] text-amber-100 leading-snug">
                  燕云锄奸 · 诛杀辽谍【{spy.name}】
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
                  赶赴【{spy.regionName} · {spy.buildingName}】寻获辽谍（{spy.realm}）并开启生死对决。
                </div>

                <button
                  type="button"
                  onClick={() =>
                    locateQuestTargetOnMap({
                      regionId: spy.regionId,
                      buildingId: spy.buildingId,
                      spotId: spy.spotId ?? undefined,
                      customLabel: `${spy.regionName} · ${spy.buildingName}`,
                    })
                  }
                  className="w-full py-1 px-2 rounded bg-[#781710] hover:bg-[#961f16] text-[#fff6e5] text-[11px] font-bold song-serif flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>舆图指引：{spy.regionName}</span>
                </button>
              </div>
            )
          })()}

          {/* 二三流门派：宗门任务 */}
          {visibleSectTask && (
            <div className="p-2.5 rounded bg-[#271b10]/90 border border-[#a88754]/70 space-y-1.5">
              <div className="flex items-center justify-between gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1f4d3b] text-[#e7f7ef]">
                  宗门任务
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold ${
                      visibleSectTask.completedStep ? 'text-emerald-300' : 'text-amber-200'
                    }`}
                  >
                    {visibleSectTask.completedStep ? '待向掌门交差' : '进行中'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleHideTrackedQuest('__sect_task__')}
                    title="暂时隐藏此任务，不在追踪面板显示"
                    className="p-0.5 rounded hover:bg-[#3f2a17] text-amber-200/70 hover:text-amber-100 cursor-pointer"
                  >
                    <EyeOff className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="song-serif font-bold text-[13px] text-amber-100 leading-snug">
                {visibleSectTask.title}
              </div>

              <div className="text-[11px] text-[#e7d6b8] leading-relaxed">
                {visibleSectTask.completedStep
                  ? `已完成目标！请回【${visibleSectTask.sectName}】向掌门【${visibleSectTask.leaderName}】交差（好感 +10）。`
                  : visibleSectTask.summary}
              </div>

              {!visibleSectTask.completedStep && (
                <button
                  type="button"
                  onClick={() =>
                    locateQuestTargetOnMap({
                      regionId: visibleSectTask.regionId,
                      buildingId: visibleSectTask.buildingId,
                      spotId: visibleSectTask.spotId ?? undefined,
                      customLabel: `${visibleSectTask.regionName} · ${visibleSectTask.buildingName}`,
                    })
                  }
                  className="w-full py-1 px-2 rounded bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff6e5] text-[11px] font-bold song-serif flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>舆图指引：{visibleSectTask.regionName}</span>
                </button>
              )}
            </div>
          )}

          {/* 开封府 / 六扇门：六扇门公案（情报线索 / 海捕公文） */}
          {visibleKaifengWarrant && (() => {
            const warrant = visibleKaifengWarrant
            const isInvestigate = warrant.kind === 'investigate'
            const remainDays =
              warrant.deadlineDay !== undefined
                ? Math.max(0, warrant.deadlineDay - dayCount)
                : null
            return (
              <div className="p-2.5 rounded bg-[#142233]/90 border border-[#6f97c4]/75 space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1d3557] text-[#eef6ff]">
                    {isInvestigate ? '案情侦查' : '海捕公文'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-sky-200 font-bold">
                      {remainDays !== null ? `限期剩 ${remainDays} 日` : isInvestigate ? '查明线索' : '缉拿归案'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleHideTrackedQuest('__kaifeng_warrant__')}
                      title="暂时隐藏此任务，不在追踪面板显示"
                      className="p-0.5 rounded hover:bg-[#233a57] text-sky-200/70 hover:text-sky-100 cursor-pointer"
                    >
                      <EyeOff className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="song-serif font-bold text-[13px] text-amber-100 leading-snug">
                  {isInvestigate
                    ? `调查线索【${warrant.targetName}】`
                    : `缉拿要犯【${warrant.targetName}】`}
                </div>

                <div className="text-[11px] text-[#dbe8f5] leading-relaxed">
                  <span className="text-sky-300 font-semibold">线索：</span>
                  {isInvestigate
                    ? `${warrant.targetTitle}，前往【${warrant.regionName} · ${warrant.buildingName}】寻访【${warrant.clueNpcName ?? '知情人士'}】查明案情（赏银 +30 两）。`
                    : `${warrant.targetTitle}（${warrant.realm}），潜匿于【${warrant.regionName} · ${warrant.buildingName}】。击败即可破案（赏银 +30 两）。`}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    locateQuestTargetOnMap({
                      regionId: warrant.regionId,
                      buildingId: warrant.buildingId,
                      customLabel: `${warrant.regionName} · ${warrant.buildingName}`,
                    })
                  }
                  className="w-full py-1 px-2 rounded bg-[#1d3557] hover:bg-[#284875] text-[#fff6e5] text-[11px] font-bold song-serif flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>舆图指引：{warrant.regionName}</span>
                </button>
              </div>
            )
          })()}

          {/* 州府衙门悬赏缉凶 */}
          {visibleYamenBounty && (() => {
            const b = visibleYamenBounty
            const remainDays = b.deadlineDay - dayCount
            return (
              <div className="p-2.5 rounded bg-[#2a1a0d]/90 border border-[#c98a4a]/75 space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#7a3a12] text-[#fff1df]">
                    悬赏缉凶
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-amber-200 font-bold">
                      {remainDays >= 0 ? `限期剩 ${remainDays} 日` : '已逾期作废'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleHideTrackedQuest('__yamen_bounty__')}
                      title="暂时隐藏此任务，不在追踪面板显示"
                      className="p-0.5 rounded hover:bg-[#4a2e16] text-amber-200/70 hover:text-amber-100 cursor-pointer"
                    >
                      <EyeOff className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="song-serif font-bold text-[13px] text-amber-100 leading-snug">
                  缉拿【{b.targetName}】
                </div>
                <div className="text-[11px] text-[#f1dfc4] leading-relaxed">
                  <span className="text-amber-300 font-semibold">榜文：</span>
                  {b.gradeLabel}，{b.targetTitle}（{b.realm}），潜匿于【{b.regionName} · {b.buildingName}】。擒获即领{b.issueRegionName}衙门赏银 {b.rewardSilver} 两、战斗经验 +{b.rewardCombatExp}、侠义 +{b.rewardChivalry}。
                </div>
                <button
                  type="button"
                  onClick={() =>
                    locateQuestTargetOnMap({
                      regionId: b.regionId,
                      buildingId: b.buildingId,
                      customLabel: `${b.regionName} · ${b.buildingName}`,
                    })
                  }
                  className="w-full py-1 px-2 rounded bg-[#7a3a12] hover:bg-[#93481a] text-[#fff6e5] text-[11px] font-bold song-serif flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>舆图指引：{b.regionName}</span>
                </button>
              </div>
            )
          })()}

          {/* 进行中的声明式任务链 */}
          {visibleActiveList.map((prog) => {
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
                  <div className="flex items-center gap-1.5">
                    {remainDays !== null && (
                      <span className="text-[10px] font-mono text-rose-200 font-bold">
                        限期剩 {remainDays} 日
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleHideTrackedQuest(prog.questId)}
                      title="暂时隐藏此任务，不在追踪面板显示"
                      className="p-0.5 rounded hover:bg-[#3f2a17] text-amber-200/70 hover:text-amber-100 cursor-pointer"
                    >
                      <EyeOff className="w-3 h-3" />
                    </button>
                  </div>
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

          {/* 无进行中任务或全部隐藏时：保持精简提示 */}
          {totalActiveCount === 0 ? (
            <div className="py-2 px-1 text-[11px] text-[#cbb693] text-center leading-relaxed">
              当前暂无已承接的任务，可按 <kbd className="px-1 py-0.5 rounded bg-[#332212] border border-[#8c6e46]/50 text-amber-200 font-mono text-[10px]">J</kbd> 在《江湖纪事》中查阅江湖传闻。
            </div>
          ) : visibleCount === 0 ? (
            <div className="py-2 px-1 text-[11px] text-[#cbb693] text-center leading-relaxed space-y-1.5">
              <div>已隐藏全部 {hiddenActiveCount} 项追踪任务。</div>
              <button
                type="button"
                onClick={unhideAllTrackedQuests}
                className="px-2.5 py-1 rounded bg-[#3b2715] hover:bg-[#52371e] border border-[#a88754]/60 text-amber-200 text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>恢复显示全部任务</span>
              </button>
            </div>
          ) : null}

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
