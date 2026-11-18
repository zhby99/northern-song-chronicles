import {
  Compass,
  Eye,
  GitBranch,
  Lock,
  Maximize2,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
  Search,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useShallow } from 'zustand/react/shallow'
import { FACTION_DB_MAP, REGION_DB_MAP } from '../../../data/gameDb'
import { getRegionUnlockRequirement, isRegionUnlockedByInventory } from '../../../data/itemsDb'
import { QUEST_MAP, QUEST_REGISTRY } from '../../../data/quests'
import {
  buildQuestDependencyGraph,
  type QuestEdgeDef,
  type ResolvedQuestNode,
} from '../../../engine/quest/questGraphBuilder'
import { collectUnmetQuestReasons } from '../../../engine/questEngine'
import { clamp } from '../../../engine/shared/math'
import { buildStoreEvalContext, useGameStore } from '../../../store/useGameStore'
import type { QuestCategoryKey, QuestTargetLocationHint } from '../../../types/quest'
import { interpolateReignYear } from '../../../engine/world/mapMath'
import { assessQuestRealmReadiness } from '../../../engine/stats/realmUtils'

type CategoryFilterKey = 'ALL' | 'sect_entry' | 'sect_mission' | 'adventure' | 'huangyou'
type NodeStatus = 'completed' | 'active' | 'available' | 'locked'

const QUEST_GRAPH = buildQuestDependencyGraph(QUEST_REGISTRY)
const QUEST_EDGES = QUEST_GRAPH.edges
const STANDALONE_ROW_COUNT = QUEST_GRAPH.standaloneRowCount

// 7-column × dynamic-row collision-free layout
const NODE_W = 222
const NODE_H = 92
const COL_STEP = 248
const ROW_STEP = 148
const ZONE_GAP_AFTER_STANDALONE = 46
const PAD_X = 36
const PAD_Y = 50
const CANVAS_W = 1788

function colX(col: number): number {
  return PAD_X + col * COL_STEP
}

function rowY(row: number): number {
  return PAD_Y + row * ROW_STEP + (row >= STANDALONE_ROW_COUNT ? ZONE_GAP_AFTER_STANDALONE : 0)
}

const CANVAS_H = Math.max(1480, rowY(QUEST_GRAPH.maxRow) + NODE_H + 96)

const CATEGORY_VISUAL: Record<
  QuestCategoryKey,
  {
    label: string
    barCls: string
    sealCls: string
    badgeCls: string
  }
> = {
  sect_entry: {
    label: '宗门入门',
    barCls: 'bg-gradient-to-r from-[#1f4d3b] to-[#34785d]',
    sealCls: 'bg-[#1f4d3b] text-[#e7f7ef]',
    badgeCls: 'bg-[#1f4d3b] text-[#e7f7ef]',
  },
  sect_mission: {
    label: '师门要务',
    barCls: 'bg-gradient-to-r from-[#781710] to-[#a6261d]',
    sealCls: 'bg-[#781710] text-[#fff3df]',
    badgeCls: 'bg-[#781710] text-[#fff3df]',
  },
  adventure: {
    label: '江湖奇遇',
    barCls: 'bg-gradient-to-r from-[#355263] to-[#4b738a]',
    sealCls: 'bg-[#355263] text-[#eef7fc]',
    badgeCls: 'bg-[#355263] text-[#eef7fc]',
  },
  city_story: {
    label: '皇祐风云',
    barCls: 'bg-gradient-to-r from-[#8f1d14] to-[#bd6b19]',
    sealCls: 'bg-[#8f1d14] text-[#fff8ee]',
    badgeCls: 'bg-[#8f1d14] text-[#fff8ee]',
  },
  main_story: {
    label: '皇祐风云',
    barCls: 'bg-gradient-to-r from-[#8f1d14] to-[#bd6b19]',
    sealCls: 'bg-[#8f1d14] text-[#fff8ee]',
    badgeCls: 'bg-[#8f1d14] text-[#fff8ee]',
  },
}

const CATEGORY_TABS: ReadonlyArray<{
  key: CategoryFilterKey
  label: string
  activeCls: string
}> = [
  { key: 'ALL', label: '全部任务', activeCls: 'bg-[#261910] border-[#261910] text-[#fbf2e0]' },
  { key: 'sect_entry', label: '宗门入门', activeCls: 'bg-[#1f4d3b] border-[#1f4d3b] text-[#e7f7ef]' },
  { key: 'sect_mission', label: '师门要务', activeCls: 'bg-[#781710] border-[#781710] text-[#fff3df]' },
  { key: 'adventure', label: '江湖奇遇', activeCls: 'bg-[#355263] border-[#355263] text-[#eef7fc]' },
  { key: 'huangyou', label: '皇祐风云', activeCls: 'bg-[#8f1d14] border-[#8f1d14] text-[#fff8ee]' },
]

function matchesCategoryFilter(cat: QuestCategoryKey, filter: CategoryFilterKey): boolean {
  if (filter === 'ALL') return true
  if (filter === 'huangyou') return cat === 'main_story' || cat === 'city_story'
  return cat === filter
}

const STATUS_STYLE: Record<
  NodeStatus,
  {
    label: string
    pillCls: string
    cardCls: string
    tipBadgeCls: string
  }
> = {
  completed: {
    label: '✓ 已完结',
    pillCls: 'bg-[#1f4d3b] text-[#eefaf3] border-[#62b588]',
    cardCls:
      'bg-gradient-to-b from-[#fbf5e3] to-[#f0e0b6] border-[#b8860b] shadow-[0_3px_12px_rgba(184,134,11,0.24)]',
    tipBadgeCls: 'bg-[#1f4d3b] text-[#e7f7ef] border-[#52a678]',
  },
  active: {
    label: '● 进行中',
    pillCls: 'bg-[#781710] text-[#fff6ea] border-[#d4695e]',
    cardCls:
      'bg-gradient-to-b from-[#fff7ec] to-[#f7e3cc] border-[#a83226] shadow-[0_3px_12px_rgba(168,50,38,0.22)]',
    tipBadgeCls: 'bg-[#781710] text-[#fff3df] border-[#d67b72]',
  },
  available: {
    label: '◆ 可触发',
    pillCls: 'bg-[#355263] text-[#eef7fc] border-[#6b9bb8]',
    cardCls:
      'bg-gradient-to-b from-[#fdf9f0] to-[#f3ead6] border-[#7b6544] shadow-[0_2px_8px_rgba(45,30,16,0.11)]',
    tipBadgeCls: 'bg-[#355263] text-[#eef7fc] border-[#6c9db9]',
  },
  locked: {
    label: '前置未达',
    pillCls: 'bg-[#d9ccb4] text-[#6b563c] border-[#b8a587]',
    cardCls: 'bg-[#f2ead9]/92 border-[#cbb99a]',
    tipBadgeCls: 'bg-[#4a3928] text-[#e6d7c0] border-[#82694d]',
  },
}

export function QuestTreeTab() {
  const evalState = useGameStore(
    useShallow((s) => ({
      dayCount: s.dayCount,
      shichenIdx: s.shichenIdx,
      silver: s.silver,
      renown: s.renown,
      chivalry: s.chivalry,
      food: s.food,
      hp: s.hp,
      maxHp: s.maxHp,
      mp: s.mp,
      maxMp: s.maxMp,
      agility: s.agility,
      res: s.res,
      ridingSkill: s.ridingSkill,
      baseStats: s.baseStats,
      equipped: s.equipped,
      equippedArts: s.equippedArts,
      skills: s.skills,
      inventory: s.inventory,
      learnedArts: s.learnedArts,
      npcFavor: s.npcFavor,
      deadNpcIds: s.deadNpcIds,
      sectState: s.sectState,
      questState: s.questState,
    })),
  )
  const locateQuestTargetOnMap = useGameStore((s) => s.locateQuestTargetOnMap)
  const setMenuTab = useGameStore((s) => s.setMenuTab)

  const { maxHp, maxMp, inventory, questState } = evalState
  const questEvalCtx = useMemo(() => buildStoreEvalContext(evalState), [evalState])

  const allNodes = QUEST_GRAPH.nodes

  const nodeMap = useMemo(
    () => Object.fromEntries(allNodes.map((n) => [n.questId, n])),
    [allNodes],
  )

  const [selectedId, setSelectedId] = useState<string>('QST-SECT-17-MURONG-1')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterKey>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)

  // Sandbox simulation mode vs live save state
  const [simMode, setSimMode] = useState<boolean>(false)
  const [simCompleted, setSimCompleted] = useState<Set<string>>(() => new Set())

  // Pan & zoom (starts fitted so all 7 columns are immediately visible!)
  const [scale, setScale] = useState<number>(0.68)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 14, y: 10 })
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{
    active: boolean
    startX: number
    startY: number
    originPanX: number
    originPanY: number
    moved: boolean
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originPanX: 0,
    originPanY: 0,
    moved: false,
  })

  // Live unmet condition reasons per quest from the real questEngine
  const liveUnmetByQuestId = useMemo(() => {
    const map: Record<string, string[]> = {}
    for (const node of allNodes) {
      const reasons: string[] = []
      if (node.qDef.startCondition) {
        for (const r of collectUnmetQuestReasons(node.qDef.startCondition, questEvalCtx, QUEST_MAP)) {
          if (!reasons.includes(r)) reasons.push(r)
        }
      }
      // Also check mandatory solid upstream quests
      for (const edge of QUEST_EDGES) {
        if (edge.to === node.questId && edge.type === 'solid') {
          if (!questState.completedQuests[edge.from]) {
            const upTitle = QUEST_MAP[edge.from]?.title ?? edge.from
            const msg = `需先完结前置任务《${upTitle}》`
            if (!reasons.includes(msg)) reasons.unshift(msg)
          }
        }
      }
      if (node.qDef.startLocation && !isRegionUnlockedByInventory(node.qDef.startLocation.regionId, inventory)) {
        const req = getRegionUnlockRequirement(node.qDef.startLocation.regionId)
        if (req) {
          const msg = `需先持有${req.mapItemName}解锁【${req.regionName}】`
          if (!reasons.includes(msg)) reasons.push(msg)
        }
      }
      map[node.questId] = reasons
    }
    return map
  }, [allNodes, questEvalCtx, questState.completedQuests, inventory])

  const statusByQuestId = useMemo(() => {
    const map: Record<string, NodeStatus> = {}
    for (const node of allNodes) {
      const qid = node.questId
      if (simMode) {
        if (simCompleted.has(qid)) {
          map[qid] = 'completed'
        } else {
          const solidParents = QUEST_EDGES.filter((e) => e.to === qid && e.type === 'solid')
          const allSolidDone = solidParents.every((e) => simCompleted.has(e.from))
          map[qid] = allSolidDone ? 'available' : 'locked'
        }
      } else {
        if (questState.completedQuests[qid]) {
          map[qid] = 'completed'
        } else if (questState.activeQuests[qid]) {
          map[qid] = 'active'
        } else if ((liveUnmetByQuestId[qid]?.length ?? 0) === 0) {
          map[qid] = 'available'
        } else {
          map[qid] = 'locked'
        }
      }
    }
    return map
  }, [allNodes, simMode, simCompleted, questState.completedQuests, questState.activeQuests, liveUnmetByQuestId])

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilterKey, number> = {
      ALL: allNodes.length,
      sect_entry: 0,
      sect_mission: 0,
      adventure: 0,
      huangyou: 0,
    }
    for (const n of allNodes) {
      const cat = n.qDef.category
      if (cat === 'sect_entry') counts.sect_entry += 1
      else if (cat === 'sect_mission') counts.sect_mission += 1
      else if (cat === 'adventure') counts.adventure += 1
      else if (cat === 'main_story' || cat === 'city_story') counts.huangyou += 1
    }
    return counts
  }, [allNodes])

  const statusCounts = useMemo(() => {
    let completed = 0
    let active = 0
    let available = 0
    for (const n of allNodes) {
      const st = statusByQuestId[n.questId]
      if (st === 'completed') completed += 1
      else if (st === 'active') active += 1
      else if (st === 'available') available += 1
    }
    return { completed, active, available }
  }, [allNodes, statusByQuestId])

  const connectedSet = useMemo(() => {
    const focusId = hoveredId ?? selectedId
    const s = new Set<string>([focusId])
    for (const e of QUEST_EDGES) {
      if (e.from === focusId) s.add(e.to)
      if (e.to === focusId) s.add(e.from)
    }
    return s
  }, [hoveredId, selectedId])

  const matchesNodeFilter = useCallback(
    (node: ResolvedQuestNode): boolean => {
      if (!matchesCategoryFilter(node.qDef.category, categoryFilter)) return false
      const q = searchQuery.trim().toLowerCase()
      if (!q) return true
      const facName = node.qDef.factionId ? FACTION_DB_MAP[node.qDef.factionId]?.name ?? '' : ''
      const regName = node.qDef.regionId ? REGION_DB_MAP[node.qDef.regionId]?.name ?? '' : ''
      const hay = [
        node.qDef.title,
        node.questId,
        node.shortTag,
        facName,
        regName,
        node.qDef.summary,
        ...node.prereqs,
        ...node.rewards,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    },
    [categoryFilter, searchQuery],
  )

  const fitCanvas = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const rect = vp.getBoundingClientRect()
    const fitS = clamp((rect.width - 24) / CANVAS_W, 0.45, 0.85)
    setScale(Number(fitS.toFixed(2)))
    setPan({ x: 12, y: 10 })
  }, [])

  const centerOnNode = useCallback(
    (questId: string, nextScale?: number) => {
      const node = nodeMap[questId]
      const vp = viewportRef.current
      if (!node || !vp) return
      const s = nextScale ?? scale
      const rect = vp.getBoundingClientRect()
      const cx = colX(node.col) + NODE_W / 2
      const cy = rowY(node.row) + NODE_H / 2
      setScale(s)
      setPan({
        x: Math.round(rect.width / 2 - cx * s),
        y: Math.round(rect.height / 2 - cy * s),
      })
    },
    [nodeMap, scale],
  )

  // Auto-fit width once on initial mount so all 7 columns sit cleanly inside viewport
  useEffect(() => {
    fitCanvas()
  }, [fitCanvas])

  // Non-passive wheel zoom anchored to cursor
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault()
      ev.stopPropagation()
      const rect = vp.getBoundingClientRect()
      const mx = ev.clientX - rect.left
      const my = ev.clientY - rect.top
      const factor = ev.deltaY < 0 ? 1.09 : 0.92
      setScale((prevScale) => {
        const nextScale = clamp(Number((prevScale * factor).toFixed(3)), 0.42, 1.35)
        setPan((prevPan) => ({
          x: Math.round(mx - ((mx - prevPan.x) / prevScale) * nextScale),
          y: Math.round(my - ((my - prevPan.y) / prevScale) * nextScale),
        }))
        return nextScale
      })
    }
    vp.addEventListener('wheel', onWheel, { passive: false })
    return () => vp.removeEventListener('wheel', onWheel)
  }, [])

  const toggleSimNode = useCallback((questId: string) => {
    setSimCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(questId)) {
        next.delete(questId)
      } else {
        next.add(questId)
      }
      return next
    })
  }, [])

  const selectedNode = nodeMap[selectedId] ?? allNodes[0]
  const selectedStatus = statusByQuestId[selectedNode.questId] ?? 'locked'
  const hoveredNode = hoveredId ? nodeMap[hoveredId] ?? null : null
  const hoveredStatus = hoveredNode ? statusByQuestId[hoveredNode.questId] ?? 'locked' : 'locked'

  const selectedUpstream = useMemo(
    () =>
      QUEST_EDGES.filter((e) => e.to === selectedNode.questId)
        .map((e) => ({ edge: e, node: nodeMap[e.from] }))
        .filter((x): x is { edge: QuestEdgeDef; node: ResolvedQuestNode } => Boolean(x.node)),
    [selectedNode.questId, nodeMap],
  )
  const selectedDownstream = useMemo(
    () =>
      QUEST_EDGES.filter((e) => e.from === selectedNode.questId)
        .map((e) => ({ edge: e, node: nodeMap[e.to] }))
        .filter((x): x is { edge: QuestEdgeDef; node: ResolvedQuestNode } => Boolean(x.node)),
    [selectedNode.questId, nodeMap],
  )

  const selectedLocateTarget = useMemo((): QuestTargetLocationHint | undefined => {
    const activeProg = questState.activeQuests[selectedNode.questId]
    if (activeProg) {
      const stepTarget = selectedNode.qDef.steps[activeProg.stepId]?.targetLocation
      if (stepTarget) return stepTarget
    }
    return selectedNode.qDef.startLocation
  }, [selectedNode, questState.activeQuests])

  const tooltipStyle = useMemo(() => {
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1440
    const winH = typeof window !== 'undefined' ? window.innerHeight : 900
    const tipW = 376
    const estH = 350
    let left = pointerPos.x + 18
    let top = pointerPos.y + 16
    if (left + tipW > winW - 14) {
      left = Math.max(14, pointerPos.x - tipW - 18)
    }
    if (top + estH > winH - 14) {
      top = Math.max(14, winH - estH - 14)
    }
    return { left, top, width: tipW }
  }, [pointerPos])

  const zone1Top = rowY(0) - 34
  const zone1Height = rowY(Math.max(0, STANDALONE_ROW_COUNT - 1)) - rowY(0) + NODE_H + 50
  const zone2Top = rowY(STANDALONE_ROW_COUNT) - 34
  const zone2Height = rowY(QUEST_GRAPH.maxRow) - rowY(STANDALONE_ROW_COUNT) + NODE_H + 50

  return (
    <div className="flex flex-col gap-2.5 h-[690px] max-h-[calc(95vh-225px)] min-h-[520px] text-xs text-[#2a1d11] select-none">
      {/* 顶部控制栏：与【江湖纪事】一致的四大任务门类筛选 + 搜索 + 缩放 */}
      <div className="p-2.5 rounded-lg bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_TABS.map((tab) => {
            const active = categoryFilter === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setCategoryFilter(tab.key)}
                className={`px-2.5 py-1 rounded font-bold song-serif border cursor-pointer transition-colors ${
                  active
                    ? tab.activeCls
                    : 'bg-[#faf3e3] hover:bg-[#e8d8b9] border-[#bca37b] text-[#3d2814]'
                }`}
              >
                {tab.label} ({categoryCounts[tab.key]})
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7a5f3e] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜任务名 / 门派 / 奖励…"
              className="w-40 sm:w-48 pl-7 pr-2 py-1 rounded bg-[#faf4e6] border border-[#bca37b] text-xs text-[#261910] placeholder:text-[#8c7353] focus:outline-none focus:border-[#781710]"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              if (!simMode) {
                setSimCompleted(new Set(Object.keys(questState.completedQuests)))
                setSimMode(true)
              } else {
                setSimMode(false)
              }
            }}
            className={`px-2.5 py-1 rounded font-bold song-serif border flex items-center gap-1 cursor-pointer transition-colors ${
              simMode
                ? 'bg-[#781710] border-[#781710] text-[#fff8ee]'
                : 'bg-[#1f4d3b] border-[#1f4d3b] text-[#eefaf3]'
            }`}
            title={
              simMode
                ? '当前为沙盘推演模式（点击任意任务节点模拟完结），点击切回存档实况'
                : '当前实时同步少侠存档状态，点击可进入沙盘推演模式'
            }
          >
            {simMode ? <Sparkles className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{simMode ? '沙盘推演中' : '存档实况'}</span>
          </button>

          {simMode && (
            <button
              type="button"
              onClick={() => setSimCompleted(new Set())}
              className="px-2 py-1 rounded bg-[#faf3e3] hover:bg-[#e8d8b9] border border-[#bca37b] text-[#5c3d1e] font-bold song-serif flex items-center gap-1 cursor-pointer"
              title="清空推演状态"
            >
              <RotateCcw className="w-3 h-3" />
              <span>清空</span>
            </button>
          )}

          <div className="flex items-center rounded border border-[#bca37b] bg-[#faf3e3] overflow-hidden">
            <button
              type="button"
              onClick={() => setScale((s) => clamp(Number((s - 0.1).toFixed(2)), 0.42, 1.35))}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#3d2814] cursor-pointer"
              title="缩小"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setScale(0.75)}
              className="px-2 py-1 font-mono text-[11px] font-bold text-[#5c3d1e] hover:bg-[#e8d8b9] border-x border-[#d8c7a9] cursor-pointer"
              title="标准缩放 (75%)"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setScale((s) => clamp(Number((s + 0.1).toFixed(2)), 0.42, 1.35))}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#3d2814] cursor-pointer"
              title="放大"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={fitCanvas}
              className="px-2 py-1 hover:bg-[#e8d8b9] text-[#3d2814] border-l border-[#d8c7a9] cursor-pointer flex items-center gap-1 font-bold song-serif"
              title="适应全图宽度"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>全览</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            className="px-2.5 py-1 rounded bg-[#faf3e3] hover:bg-[#e8d8b9] border border-[#bca37b] text-[#3d2814] font-bold song-serif flex items-center gap-1 cursor-pointer"
          >
            {drawerOpen ? (
              <PanelRightClose className="w-3.5 h-3.5" />
            ) : (
              <PanelRightOpen className="w-3.5 h-3.5" />
            )}
            <span>{drawerOpen ? '收起详单' : '展开详单'}</span>
          </button>
        </div>
      </div>

      {/* 主区域：左任务树画布 + 右单任务详情抽屉 */}
      <div className="flex-1 min-h-0 flex gap-2.5">
        <div
          ref={viewportRef}
          onMouseDown={(e) => {
            if (e.button !== 0) return
            dragRef.current = {
              active: true,
              startX: e.clientX,
              startY: e.clientY,
              originPanX: pan.x,
              originPanY: pan.y,
              moved: false,
            }
            setIsDragging(true)
          }}
          onMouseMove={(e) => {
            setPointerPos({ x: e.clientX, y: e.clientY })
            if (!dragRef.current.active) return
            const dx = e.clientX - dragRef.current.startX
            const dy = e.clientY - dragRef.current.startY
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
              dragRef.current.moved = true
            }
            setPan({
              x: dragRef.current.originPanX + dx,
              y: dragRef.current.originPanY + dy,
            })
          }}
          onMouseUp={() => {
            dragRef.current.active = false
            setIsDragging(false)
          }}
          onMouseLeave={() => {
            dragRef.current.active = false
            setIsDragging(false)
            setHoveredId(null)
          }}
          className={`relative flex-1 min-w-0 h-full rounded-lg border border-[#c8b28e] overflow-hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            backgroundColor: '#f3e8d2',
            backgroundImage: 'radial-gradient(rgba(92, 61, 30, 0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {/* 左下角简洁图例条 */}
          <div className="absolute left-3 bottom-3 z-20 px-3 py-1.5 rounded-md bg-[#261910]/90 text-[#fbf2e0] border border-[#a58654] shadow-md flex flex-wrap items-center gap-3 text-[11px] pointer-events-none">
            <span className="font-bold text-[#f5d08a] song-serif">
              全 {allNodes.length} 卷任务（1 任务 = 1 节点）：
            </span>
            <span>
              已完结 <strong className="font-mono text-[#7ee2a8]">{statusCounts.completed}</strong>
            </span>
            {!simMode && (
              <span>
                进行中 <strong className="font-mono text-[#ff9e94]">{statusCounts.active}</strong>
              </span>
            )}
            <span>
              可触发 <strong className="font-mono text-[#9ad4f5]">{statusCounts.available}</strong>
            </span>
            <span className="hidden xl:inline text-[#d8c7a9]">
              ｜ 实线 = 必修前置任务 · 虚线 = 举荐信/同脉联动 · 鼠标悬停查看前置条件
            </span>
          </div>

          <div
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
              transformOrigin: '0 0',
            }}
            className="relative"
          >
            {/* 分区 1：顶部独立宗门入门与江湖奇遇（单节点） */}
            <div
              style={{ top: zone1Top, left: 16, width: CANVAS_W - 32, height: zone1Height }}
              className="absolute rounded-xl border border-[#cbb48c]/85 bg-gradient-to-r from-[#e9f2ec]/65 via-[#f7f1e3]/50 to-[#e9eff4]/65 px-4 py-2 pointer-events-none"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-[#d5c19c]/75 pb-1">
                <span className="text-xs font-bold song-serif text-[#1f4d3b] tracking-wide">
                  独立宗门入门与江湖奇遇（顶部独立单节点 · 无前后任务依赖）
                </span>
                <span className="text-[11px] text-[#6b5235]">
                  少林 · 丐帮 · 华山 · 峨眉 · 武当 · 青城 · 星宿 · 太行绿林 · 八步赶蝉 · 东海桃花岛
                </span>
              </div>
            </div>

            {/* 分区 2：跨派引荐与朝堂仕途串联任务树 */}
            <div
              style={{ top: zone2Top, left: 16, width: CANVAS_W - 32, height: zone2Height }}
              className="absolute rounded-xl border border-[#cbb48c]/85 bg-gradient-to-r from-[#efe1c4]/65 via-[#f7eedb]/45 to-[#efe1c4]/65 px-4 py-2 pointer-events-none"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-[#d5c19c]/75 pb-1">
                <span className="text-xs font-bold song-serif text-[#781710] tracking-wide">
                  跨门派引荐与朝堂公门禁军任务树（前后置串联脉络）
                </span>
                <span className="text-[11px] text-[#6b5235]">
                  常山枪派 / 大名府八极 / 燕子坞水图 ──► 开封府六扇门 ──► 大宋禁军（三征太行 & 河北暗桩）｜ 右侧：二流引荐支脉
                </span>
              </div>
            </div>

            {/* 正交不交叉 SVG 连线层 */}
            <svg
              width={CANVAS_W}
              height={CANVAS_H}
              className="absolute inset-0 pointer-events-none overflow-visible"
            >
              <defs>
                <marker
                  id="qt2-arrow-base"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b7352" />
                </marker>
                <marker
                  id="qt2-arrow-focus"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8.5 5 L 0 9 z" fill="#9c2318" />
                </marker>
                <marker
                  id="qt2-arrow-done"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8.5 5 L 0 9 z" fill="#1f6b4a" />
                </marker>
              </defs>

              {QUEST_EDGES.map((edge) => {
                const src = nodeMap[edge.from]
                const dst = nodeMap[edge.to]
                if (!src || !dst) return null

                const x1 = colX(src.col) + NODE_W / 2
                const y1 = rowY(src.row) + NODE_H
                const x2 = colX(dst.col) + NODE_W / 2 + (edge.dstOffsetX ?? 0)
                const y2 = rowY(dst.row)

                // Route multi-row edges cleanly down src column to the empty corridor right above dst row!
                const baseTurnY =
                  dst.row - src.row > 1 ? y2 - 26 : y1 + (y2 - y1) * 0.5
                const turnY = baseTurnY + (edge.trackOffset ?? 0)
                const d =
                  x1 === x2
                    ? `M ${x1} ${y1} L ${x2} ${y2 - 3}`
                    : `M ${x1} ${y1} L ${x1} ${turnY} L ${x2} ${turnY} L ${x2} ${y2 - 3}`

                const focusId = hoveredId ?? selectedId
                const isBothDone =
                  statusByQuestId[edge.from] === 'completed' &&
                  statusByQuestId[edge.to] === 'completed'
                const isFocusEdge = edge.from === focusId || edge.to === focusId
                const dimmed = !matchesNodeFilter(src) && !matchesNodeFilter(dst)

                const stroke = isBothDone
                  ? '#1f6b4a'
                  : isFocusEdge
                    ? '#9c2318'
                    : '#8f7754'
                const strokeWidth = isBothDone || isFocusEdge ? 2.8 : 1.85
                const markerEnd = isBothDone
                  ? 'url(#qt2-arrow-done)'
                  : isFocusEdge
                    ? 'url(#qt2-arrow-focus)'
                    : 'url(#qt2-arrow-base)'

                return (
                  <path
                    key={`${edge.from}->${edge.to}`}
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={edge.type === 'dashed' ? '6 4' : undefined}
                    markerEnd={markerEnd}
                    opacity={dimmed ? 0.15 : isBothDone || isFocusEdge ? 1 : 0.75}
                  />
                )
              })}
            </svg>

            {/* 全部任务牌匾节点（1 任务 = 1 节点） */}
            {allNodes.map((node) => {
              const st = statusByQuestId[node.questId] ?? 'locked'
              const stStyle = STATUS_STYLE[st]
              const catVis =
                CATEGORY_VISUAL[node.qDef.category] ?? CATEGORY_VISUAL.adventure
              const isSelected = selectedId === node.questId
              const isHovered = hoveredId === node.questId
              const isConnected = connectedSet.has(node.questId)
              const matches = matchesNodeFilter(node)

              return (
                <button
                  key={node.questId}
                  type="button"
                  style={{
                    left: colX(node.col),
                    top: rowY(node.row),
                    width: NODE_W,
                    height: NODE_H,
                  }}
                  onMouseEnter={(e) => {
                    setPointerPos({ x: e.clientX, y: e.clientY })
                    setHoveredId(node.questId)
                  }}
                  onMouseMove={(e) => {
                    setPointerPos({ x: e.clientX, y: e.clientY })
                  }}
                  onMouseLeave={() => {
                    setHoveredId((prev) => (prev === node.questId ? null : prev))
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (dragRef.current.moved) return
                    setSelectedId(node.questId)
                    if (simMode) {
                      toggleSimNode(node.questId)
                    }
                  }}
                  className={`absolute rounded-lg border-2 text-left overflow-hidden transition-transform duration-100 cursor-pointer focus:outline-none ${
                    stStyle.cardCls
                  } ${
                    isSelected
                      ? 'ring-2 ring-[#781710] ring-offset-2 ring-offset-[#f3e8d2] z-20 -translate-y-0.5'
                      : isHovered
                        ? 'border-[#8f1d14] z-20 -translate-y-0.5'
                        : 'z-10'
                  } ${
                    !matches
                      ? 'opacity-20 grayscale'
                      : hoveredId && !isConnected
                        ? 'opacity-75'
                        : ''
                  }`}
                >
                  <div className={`h-1.5 w-full ${catVis.barCls}`} />

                  <div className="p-2 flex flex-col justify-between h-[calc(100%-6px)]">
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-7 h-7 rounded border border-[#d6b77c]/80 flex items-center justify-center font-bold song-serif text-sm shrink-0 shadow-inner ${catVis.sealCls}`}
                      >
                        {node.seal}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold song-serif text-[13px] leading-tight text-[#23180f] truncate">
                          {node.qDef.title}
                        </div>
                        <div className="text-[11px] text-[#6b5235] truncate mt-0.5">
                          {node.shortTag}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#d8c6a5]/70">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold leading-none ${catVis.badgeCls}`}
                      >
                        {catVis.label}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded border text-[10px] font-bold leading-none shrink-0 ${stStyle.pillCls}`}
                      >
                        {st === 'locked' ? (
                          <span className="inline-flex items-center gap-0.5">
                            <Lock className="w-2.5 h-2.5" />
                            {stStyle.label}
                          </span>
                        ) : (
                          stStyle.label
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 右侧：单卷任务详情面板 */}
        {drawerOpen && (() => {
          const catVis =
            CATEGORY_VISUAL[selectedNode.qDef.category] ?? CATEGORY_VISUAL.adventure
          const readiness = assessQuestRealmReadiness(
            maxHp,
            maxMp,
            selectedNode.qDef.recommendedRealm,
            selectedNode.qDef.maxOpponentRealm,
          )
          const activeProg = questState.activeQuests[selectedNode.questId]
          const completedRec = questState.completedQuests[selectedNode.questId]
          const unmetList = liveUnmetByQuestId[selectedNode.questId] ?? []

          return (
            <div className="w-80 xl:w-96 shrink-0 h-full rounded-lg bg-[#faf3e3] border border-[#c8b28e] flex flex-col overflow-hidden">
              <div className="p-3 bg-[#efe4cc] border-b border-[#c8b28e] space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${catVis.badgeCls}`}>
                      {catVis.label}
                    </span>
                    <span className="text-[11px] text-[#5c3d1e] font-semibold">
                      {selectedNode.shortTag}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded border ${STATUS_STYLE[selectedStatus].pillCls}`}
                  >
                    {STATUS_STYLE[selectedStatus].label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center font-bold song-serif text-base shrink-0 ${catVis.sealCls}`}
                  >
                    {selectedNode.seal}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold song-serif text-base text-[#23180f] leading-snug">
                      《{selectedNode.qDef.title}》
                    </h4>
                    <div className="text-[11px] text-[#6b5235]">
                      建议修为：<strong>{readiness.recommendedRealm.label}</strong>（{readiness.statusLabel}）
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs leading-relaxed">
                {/* 快捷操作按钮 */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocateTarget && (
                    <button
                      type="button"
                      onClick={() => locateQuestTargetOnMap(selectedLocateTarget)}
                      className="px-2.5 py-1.5 rounded bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff8ee] font-bold song-serif flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>
                        舆图定位：
                        {selectedLocateTarget.customLabel ??
                          REGION_DB_MAP[selectedLocateTarget.regionId]?.name ??
                          selectedLocateTarget.regionId}{' '}
                        ▸
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => centerOnNode(selectedNode.questId)}
                    className="px-2.5 py-1.5 rounded bg-[#efe4cc] hover:bg-[#e3d2b1] border border-[#c8b28e] text-[#3d2814] font-bold song-serif cursor-pointer"
                  >
                    画布居中
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuTab('quests')}
                    className="px-2.5 py-1.5 rounded bg-[#efe4cc] hover:bg-[#e3d2b1] border border-[#c8b28e] text-[#781710] font-bold song-serif cursor-pointer"
                  >
                    跳转江湖纪事
                  </button>
                </div>

                {/* 当前存档实时状态提示 */}
                {activeProg && (
                  <div className="p-2.5 rounded bg-[#fdf2e9] border border-[#d6887f] text-[#781710] space-y-0.5">
                    <div className="font-bold song-serif">
                      当前进行步骤：{selectedNode.qDef.steps[activeProg.stepId]?.title ?? activeProg.stepId}
                    </div>
                    <div className="text-[#4a3219]">
                      {selectedNode.qDef.steps[activeProg.stepId]?.objective}
                    </div>
                  </div>
                )}

                {completedRec && (
                  <div className="p-2.5 rounded bg-[#e8f5ee] border border-[#78b791] text-[#1b5132]">
                    ✓ 已于第 <strong>{completedRec.completedDay}</strong> 日完结（结局标识：
                    <span className="font-mono ml-1">{completedRec.outcome}</span>）
                  </div>
                )}

                {/* 卷宗梗概 */}
                <div className="p-2.5 rounded bg-[#fffbf2] border border-[#dfd0b2] space-y-1">
                  <div className="font-bold song-serif text-[#355263]">任务卷宗梗概</div>
                  <p className="text-[#2d1e10]">
                    {interpolateReignYear(selectedNode.qDef.summary, evalState.dayCount)}
                  </p>
                  {selectedNode.qDef.startHint && (
                    <div className="pt-1 border-t border-[#ece0c8] text-[#5c3d1e]">
                      <strong className="text-[#781710]">触发线索：</strong>
                      {interpolateReignYear(selectedNode.qDef.startHint, evalState.dayCount)}
                    </div>
                  )}
                </div>

                {/* 触发与前置条件 */}
                <div className="p-2.5 rounded bg-[#f5ecd9] border border-[#d8c49e] space-y-1.5">
                  <div className="font-bold song-serif text-[#781710] flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>触发与前置要求</span>
                  </div>
                  <ul className="space-y-1 text-[#3d2814]">
                    {selectedNode.prereqs.map((req) => (
                      <li key={req} className="flex items-start gap-1.5">
                        <span className="text-[#8f1d14] font-bold shrink-0">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  {!simMode && !completedRec && !activeProg && unmetList.length > 0 && (
                    <div className="pt-1.5 border-t border-[#d8c49e] text-[#8f1d14] space-y-0.5">
                      <div className="font-bold">当前存档尚未满足：</div>
                      {unmetList.map((u) => (
                        <div key={u}>• {u}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 核心奖励 */}
                <div className="p-2.5 rounded bg-[#eef7f1] border border-[#a5cfb5] space-y-1">
                  <div className="font-bold song-serif text-[#1f4d3b]">完成奖励与后续影响</div>
                  <ul className="space-y-1 text-[#193d2e]">
                    {selectedNode.rewards.map((rw) => (
                      <li key={rw} className="flex items-start gap-1.5">
                        <span className="text-[#1f4d3b] font-bold shrink-0">✦</span>
                        <span>{rw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedNode.branchNote && (
                  <div className="p-2.5 rounded bg-[#f8e3e1] border border-[#d6887f] text-[#781710]">
                    <strong>路线提示：</strong>
                    {selectedNode.branchNote}
                  </div>
                )}

                {/* 上下游关联任务一键跳转 */}
                {(selectedUpstream.length > 0 || selectedDownstream.length > 0) && (
                  <div className="pt-2 border-t border-[#dfd0b2] space-y-2">
                    {selectedUpstream.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-[#6b5235]">
                          上游关联任务（点击定位）：
                        </div>
                        {selectedUpstream.map(({ edge, node }) => (
                          <button
                            key={node.questId}
                            type="button"
                            onClick={() => {
                              setSelectedId(node.questId)
                              centerOnNode(node.questId)
                            }}
                            className="w-full text-left p-1.5 rounded bg-[#efe4cc] hover:bg-[#e2d0ad] border border-[#c8b28e] cursor-pointer"
                          >
                            <div className="font-bold song-serif text-[#3d2814]">
                              ↑ 《{node.qDef.title}》
                              <span className="ml-1 text-[10px] font-normal text-[#781710]">
                                [{edge.type === 'solid' ? '必修前置' : '联动支线'}]
                              </span>
                            </div>
                            <div className="text-[11px] text-[#6b5235]">{edge.relation}</div>
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedDownstream.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-[#6b5235]">
                          下游开启任务（点击定位）：
                        </div>
                        {selectedDownstream.map(({ edge, node }) => (
                          <button
                            key={node.questId}
                            type="button"
                            onClick={() => {
                              setSelectedId(node.questId)
                              centerOnNode(node.questId)
                            }}
                            className="w-full text-left p-1.5 rounded bg-[#efe4cc] hover:bg-[#e2d0ad] border border-[#c8b28e] cursor-pointer"
                          >
                            <div className="font-bold song-serif text-[#781710]">
                              ↓ 《{node.qDef.title}》
                              <span className="ml-1 text-[10px] font-normal text-[#5c3d1e]">
                                [{edge.type === 'solid' ? '必修后续' : '可选联动'}]
                              </span>
                            </div>
                            <div className="text-[11px] text-[#6b5235]">{edge.relation}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </div>

      {/* 欧陆风云 / 钢铁雄心风格鼠标悬停前置检视浮窗 */}
      {hoveredNode &&
        typeof document !== 'undefined' &&
        createPortal(
          (() => {
            const catVis =
              CATEGORY_VISUAL[hoveredNode.qDef.category] ?? CATEGORY_VISUAL.adventure
            const readiness = assessQuestRealmReadiness(
              maxHp,
              maxMp,
              hoveredNode.qDef.recommendedRealm,
              hoveredNode.qDef.maxOpponentRealm,
            )
            const unmet = liveUnmetByQuestId[hoveredNode.questId] ?? []
            const isDone = Boolean(questState.completedQuests[hoveredNode.questId])
            const isAct = Boolean(questState.activeQuests[hoveredNode.questId])

            return (
              <div
                role="tooltip"
                style={tooltipStyle}
                className="fixed z-[9999] pointer-events-none rounded-lg bg-[#1e150e]/96 text-[#faf2e1] border-2 border-[#b89249] shadow-[0_12px_32px_rgba(0,0,0,0.55)] p-3 space-y-2 text-xs leading-relaxed"
              >
                <div className="border-b border-[#594327] pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#dfbe7d] font-semibold">
                      [{catVis.label}] {hoveredNode.shortTag}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[10px] font-bold ${STATUS_STYLE[hoveredStatus].tipBadgeCls}`}
                    >
                      {STATUS_STYLE[hoveredStatus].label}
                    </span>
                  </div>
                  <div className="font-bold song-serif text-sm text-[#fff7e6] mt-0.5">
                    《{hoveredNode.qDef.title}》
                  </div>
                  <div className="text-[11px] text-[#bca47c]">
                    建议修为：{readiness.recommendedRealm.label}（{readiness.statusLabel}）
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold song-serif text-[#f5cb5c] mb-0.5">
                    ◆ 触发与前置条件：
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-[#f2e6cf]">
                    {hoveredNode.prereqs.map((req) => (
                      <li key={req} className="flex items-start gap-1.5">
                        <span className="text-[#f5cb5c] shrink-0">▸</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  {!simMode && !isDone && !isAct && unmet.length > 0 && (
                    <div className="mt-1.5 p-1.5 rounded bg-[#4a2019]/90 border border-[#9e473e] text-[11px] text-[#ffd7d2]">
                      <div className="font-bold text-[#ffb4ab]">当前存档尚未满足：</div>
                      {unmet.slice(0, 4).map((u) => (
                        <div key={u}>• {u}</div>
                      ))}
                    </div>
                  )}
                  {!simMode && !isDone && !isAct && unmet.length === 0 && (
                    <div className="mt-1 text-[11px] text-[#83dca8] font-semibold">
                      ✓ 当前存档已满足触发门槛
                    </div>
                  )}
                </div>

                <div className="border-t border-[#47351f] pt-1.5">
                  <div className="text-[11px] font-bold song-serif text-[#83dca8] mb-0.5">
                    ✦ 完成奖励与后续：
                  </div>
                  <ul className="space-y-0.5 text-[11px] text-[#dff5e7]">
                    {hoveredNode.rewards.map((rw) => (
                      <li key={rw} className="flex items-start gap-1.5">
                        <span className="text-[#83dca8] shrink-0">+</span>
                        <span>{rw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {hoveredNode.branchNote && (
                  <div className="p-1.5 rounded bg-[#5c1914]/85 border border-[#b54c43] text-[11px] text-[#ffdedb]">
                    {hoveredNode.branchNote}
                  </div>
                )}
              </div>
            )
          })(),
          document.body,
        )}
    </div>
  )
}
