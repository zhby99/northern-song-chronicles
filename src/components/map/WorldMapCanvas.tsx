import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { getUnlockedLockedRegionKey, isRegionUnlockedByKey } from '../../data/itemsDb'
import { WORLD_SVG_DEFS_MARKUP, WORLD_SVG_STATIC_GEO_MARKUP } from '../../data/worldBaseSvg'
import { useGameStore } from '../../store/useGameStore'
import type { FactionKind, RoamingMaster, WorldNode } from '../../types/game'
import { clientToSvgCoords, findBestRoute, NODE_MAP, WORLD_GRAPH } from '../../engine/world/mapMath'

const CAPITALS = new Set([
  'bianliang',
  'linhuang_liao',
  'xingqing_xixia',
  'luoxie_tubo',
  'dali_city',
])

const ALERT_NODES = WORLD_GRAPH.nodes.filter((n) => n.alert)

const FACTION_GRAD: Record<FactionKind, string> = {
  orthodox: 'url(#factionGradOrthodox)',
  hermit: 'url(#factionGradHermit)',
  clan: 'url(#factionGradClan)',
  hostile: 'url(#factionGradHostile)',
}

const StaticDefs = memo(function StaticDefs() {
  return <g dangerouslySetInnerHTML={{ __html: WORLD_SVG_DEFS_MARKUP }} />
})

const StaticGeography = memo(function StaticGeography() {
  return <g dangerouslySetInnerHTML={{ __html: WORLD_SVG_STATIC_GEO_MARKUP }} />
})

const WorldFactionsLayer = memo(function WorldFactionsLayer() {
  return (
    <g id="svg-layer-factions">
      {WORLD_GRAPH.nodes.map((n) => (
        <circle
          key={`fac-${n.id}`}
          cx={n.x}
          cy={n.y}
          r={n.type === 'city' ? 76 : 56}
          fill={FACTION_GRAD[n.factionType] ?? FACTION_GRAD.orthodox}
          pointerEvents="none"
        />
      ))}
    </g>
  )
})

interface WorldEdgesLayerProps {
  hasActiveRoute: boolean
  isMacroZoom: boolean
  isTraveling: boolean
  showDistanceOverlay: boolean
  markerScale: number
  activeEdgeKeys: ReadonlySet<string>
}

const WorldEdgesLayer = memo(function WorldEdgesLayer({
  hasActiveRoute,
  isMacroZoom,
  isTraveling,
  showDistanceOverlay,
  markerScale,
  activeEdgeKeys,
}: WorldEdgesLayerProps) {
  return (
    <g
      id="svg-layer-edges"
      className="lod-fade"
      style={{
        opacity: hasActiveRoute ? (!isMacroZoom ? 1 : 0.4) : 0,
        pointerEvents: 'none',
      }}
    >
      {WORLD_GRAPH.edges.map(([u, v, dist, terrain], idx) => {
        const nu = NODE_MAP[u]
        const nv = NODE_MAP[v]
        if (!nu || !nv) return null
        const meta = WORLD_GRAPH.terrainMeta[terrain]
        const onRoute = activeEdgeKeys.has(`${u}__${v}`)
        const mx = (nu.x + nv.x) / 2
        const my = (nu.y + nv.y) / 2
        return (
          <g key={`edge-${u}-${v}-${idx}`}>
            <line
              x1={nu.x}
              y1={nu.y}
              x2={nv.x}
              y2={nv.y}
              stroke={meta.stroke}
              strokeWidth={meta.width * markerScale}
              strokeOpacity={onRoute ? 0.16 : isTraveling ? 0.2 : 0.34}
              className={meta.cls || undefined}
            />
            {hasActiveRoute && (showDistanceOverlay || onRoute) && !isMacroZoom && (
              <g
                transform={`translate(${mx}, ${my}) scale(${markerScale})`}
                className="edge-dist-label lod-fade"
                pointerEvents="none"
              >
                <rect
                  x={-19}
                  y={-6.5}
                  width={38}
                  height={12.5}
                  rx={2}
                  fill={onRoute ? '#eef8f1' : '#faf2e1'}
                  stroke={onRoute ? '#1e7e4e' : '#8c7353'}
                  strokeWidth={onRoute ? 0.8 : 0.5}
                />
                <text
                  x={0}
                  y={2.5}
                  textAnchor="middle"
                  fontSize={8.2}
                  fontWeight={onRoute ? 700 : 600}
                  fill={onRoute ? '#145334' : '#3a2918'}
                >
                  {dist}里
                </text>
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
})

interface WorldAlertsLayerProps {
  isMacroZoom: boolean
  markerScale: number
}

const WorldAlertsLayer = memo(function WorldAlertsLayer({
  isMacroZoom,
  markerScale,
}: WorldAlertsLayerProps) {
  return (
    <g id="svg-layer-alerts" className="lod-fade" style={{ opacity: !isMacroZoom ? 1 : 0.3 }}>
      {ALERT_NODES.map((n) => (
        <g
          key={`alert-${n.id}`}
          transform={`translate(${n.x}, ${n.y}) scale(${markerScale})`}
          pointerEvents="none"
        >
          <circle
            r={18}
            fill="none"
            stroke="#b8251e"
            strokeWidth={1.8}
            strokeDasharray="4 3"
            className="alert-ring"
          />
        </g>
      ))}
    </g>
  )
})

interface WorldNodesLayerProps {
  selectedNodeId: string | null
  currentNodeId: string
  isOffCity: boolean
  unlockedRegionKey: string
  markerScale: number
  isMacroZoom: boolean
  isSub94Zoom: boolean
  cityLabelsOverlay: boolean
  showCityLabels: boolean
  showMinorLabels: boolean
  onNodeHover: (e: React.MouseEvent, node: WorldNode) => void
  onNodeMove: (e: React.MouseEvent) => void
  onNodeLeave: () => void
  onNodeActivate: (e: React.MouseEvent, nodeId: string) => void
}

const WorldNodesLayer = memo(function WorldNodesLayer({
  selectedNodeId,
  currentNodeId,
  isOffCity,
  unlockedRegionKey,
  markerScale,
  isMacroZoom,
  isSub94Zoom,
  cityLabelsOverlay,
  showCityLabels,
  showMinorLabels,
  onNodeHover,
  onNodeMove,
  onNodeLeave,
  onNodeActivate,
}: WorldNodesLayerProps) {
  return (
    <g id="svg-layer-nodes">
      {WORLD_GRAPH.nodes.map((n) => {
        const isCapital = CAPITALS.has(n.id)
        const isSelected = selectedNodeId === n.id
        const isCurrent = currentNodeId === n.id && !isOffCity
        const isLocked = !isRegionUnlockedByKey(n.id, unlockedRegionKey)
        const baseShortName = n.name.replace('（万山之祖）', '')
        const shortName = isLocked ? `🔒${baseShortName}` : baseShortName
        const boxW = baseShortName.length * 10.5 + (isLocked ? 21 : 9)

        let markerOpacity = 1
        if (isMacroZoom) {
          markerOpacity = isCapital ? 0.92 : n.type === 'city' ? 0.52 : 0.25
        } else if (isSub94Zoom && cityLabelsOverlay) {
          markerOpacity = n.type === 'city' ? 1 : 0.78
        }
        if (isLocked && !isSelected) {
          markerOpacity *= 0.72
        }

        const showLabel = n.type === 'city' ? showCityLabels : showMinorLabels
        const regStyle =
          (n.regime && WORLD_GRAPH.regimeBadge[n.regime]) || WORLD_GRAPH.regimeBadge.song
        const sz = isCapital ? 8.6 : 7.5

        return (
          <g
            key={n.id}
            transform={`translate(${n.x}, ${n.y}) scale(${markerScale})`}
            className="cursor-pointer map-node-group"
            onMouseEnter={(e) => onNodeHover(e, n)}
            onMouseMove={onNodeMove}
            onMouseLeave={onNodeLeave}
            onClick={(e) => onNodeActivate(e, n.id)}
          >
            {isSelected && (
              <circle
                r={15}
                fill={isLocked ? '#6b5338' : '#d99b26'}
                fillOpacity={0.32}
                stroke={isLocked ? '#8f1d14' : '#a8620a'}
                strokeWidth={1.6}
              />
            )}

            {isLocked && !isMacroZoom && (
              <circle
                r={12.2}
                fill="none"
                stroke="#781710"
                strokeWidth={1.15}
                strokeDasharray="2.8 2.4"
                strokeOpacity={0.75}
              />
            )}

            <g className="node-marker lod-fade" style={{ opacity: markerOpacity }}>
              {n.type === 'city' ? (
                <>
                  <rect
                    x={-sz}
                    y={-sz}
                    width={sz * 2}
                    height={sz * 2}
                    rx={2}
                    fill={regStyle.fill}
                    stroke="#fbf4e4"
                    strokeWidth={1.5}
                  />
                  <rect
                    x={-3.5}
                    y={-3.5}
                    width={7.0}
                    height={7.0}
                    fill={isCapital ? '#f5cb5c' : regStyle.inner}
                  />
                </>
              ) : n.type === 'sect' ? (
                <>
                  <circle
                    r={n.id === 'kunlun' ? 8.8 : 6.8}
                    fill={
                      isLocked
                        ? '#5a4d3f'
                        : n.id === 'kunlun'
                          ? '#1d566e'
                          : '#285948'
                    }
                    stroke={isLocked ? '#d6c7ad' : '#fbf4e4'}
                    strokeWidth={1.4}
                  />
                  <circle
                    r={n.id === 'kunlun' ? 3.2 : 2.3}
                    fill={
                      isLocked
                        ? '#cbb997'
                        : n.id === 'kunlun'
                          ? '#ffffff'
                          : '#dfeee7'
                    }
                  />
                </>
              ) : (
                <polygon
                  points="0,-8.4 8.4,0 0,8.4 -8.4,0"
                  fill="#8c5119"
                  stroke="#fbf4e4"
                  strokeWidth={1.4}
                />
              )}
            </g>

            <g
              className="node-label-wrap lod-fade"
              style={{
                opacity: showLabel ? 1 : 0,
                pointerEvents: showLabel ? 'auto' : 'none',
              }}
            >
              <rect
                x={-boxW / 2}
                y={10}
                width={boxW}
                height={14.8}
                rx={3}
                fill={isCurrent ? '#3b2412' : isLocked ? '#ede2cb' : '#fbf4e3'}
                stroke={isSelected ? '#b56e12' : isLocked ? '#8f1d14' : '#7a6345'}
                strokeWidth={isSelected ? 1.15 : 0.75}
              />
              <text
                x={0}
                y={20.6}
                textAnchor="middle"
                fontSize={n.type === 'city' ? 10.4 : 9.6}
                fontWeight={n.type === 'city' ? 700 : 600}
                className="song-serif"
                fill={
                  isCurrent
                    ? '#fde68a'
                    : isLocked
                      ? '#6b4d32'
                      : n.regime && n.regime !== 'song' && n.type === 'city'
                        ? '#3a224d'
                        : '#24170e'
                }
              >
                {shortName}
              </text>
            </g>
          </g>
        )
      })}
    </g>
  )
})

interface WorldMastersLayerProps {
  roamingMasters: readonly RoamingMaster[]
  markerScale: number
}

const WorldMastersLayer = memo(function WorldMastersLayer({
  roamingMasters,
  markerScale,
}: WorldMastersLayerProps) {
  return (
    <g id="svg-layer-masters" className="lod-fade" pointerEvents="none">
      {roamingMasters.map((m, idx) => {
        const n = NODE_MAP[m.nodeId]
        if (!n) return null
        const offsetX = idx % 2 === 0 ? 15 : -15
        return (
          <g key={m.id} transform={`translate(${n.x}, ${n.y}) scale(${markerScale})`}>
            <g transform={`translate(${offsetX}, -13.5)`}>
              <rect
                x={-30}
                y={-7.5}
                width={60}
                height={12.5}
                rx={6}
                fill="#1d473a"
                stroke="#e6f5ee"
                strokeWidth={0.85}
              />
              <text x={0} y={1.5} textAnchor="middle" fontSize={8} fill="#f0fdf4">
                {m.name}
              </text>
            </g>
          </g>
        )
      })}
    </g>
  )
})

export function WorldMapCanvas() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const dragRef = useRef<{
    pointerId: number
    downClientX: number
    downClientY: number
    startSvgX: number
    startSvgY: number
    initPanX: number
    initPanY: number
    moved: boolean
  } | null>(null)

  const worldPan = useGameStore((s) => s.worldPan)
  const overlays = useGameStore((s) => s.overlays)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const selectedNodeId = useGameStore((s) => s.selectedNodeId)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const agility = useGameStore((s) => s.agility)
  const unlockedRegionKey = useGameStore((s) => getUnlockedLockedRegionKey(s.inventory))
  const roamingMasters = useGameStore((s) => s.roamingMasters)
  const traveling = useGameStore((s) => s.traveling)
  const campPos = useGameStore((s) => s.campPos)

  const setWorldPan = useGameStore((s) => s.setWorldPan)
  const zoomWorldBy = useGameStore((s) => s.zoomWorldBy)
  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const setTooltip = useGameStore((s) => s.setTooltip)
  const moveTooltip = useGameStore((s) => s.moveTooltip)

  const s = worldPan.scale
  // 放大舆图（s > 1）时反向抵消容器缩放，使城池/地区图标、文字与标记始终固定在视距 1.0× 的舒适尺寸，绝不随放大而膨胀拥挤
  const markerScale = s > 1 ? 1 / s : 1
  const isMacroZoom = s < 0.85
  const isSub94Zoom = s < 0.94
  const showMinorLabels = overlays.sectPassLabels && !isSub94Zoom
  const showCityLabels = overlays.cityLabels && !isMacroZoom
  const anyPlaceLabelOn = overlays.cityLabels || overlays.sectPassLabels

  // Sync static geography SVG internal layer opacities & border stroke widths on zoom/toggle
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const minorWatermarks = svg.querySelector<SVGGElement>('#svg-layer-minor-watermarks')
    if (minorWatermarks) {
      minorWatermarks.style.opacity = anyPlaceLabelOn ? (!isMacroZoom ? '1' : '0.45') : '0'
    }

    const unchartedTitles = svg.querySelector<SVGGElement>('#svg-layer-uncharted-titles')
    if (unchartedTitles) {
      unchartedTitles.style.opacity = anyPlaceLabelOn ? '1' : '0'
    }

    const macroRegimes = svg.querySelector<SVGGElement>('#svg-layer-macro-regimes')
    if (macroRegimes) {
      if (isMacroZoom) {
        macroRegimes.style.opacity = '0.94'
      } else if (!anyPlaceLabelOn) {
        macroRegimes.style.opacity = '0'
      } else if (isSub94Zoom) {
        macroRegimes.style.opacity = '0.52'
      } else if (s > 1.35) {
        macroRegimes.style.opacity = '0.14'
      } else {
        macroRegimes.style.opacity = '0.24'
      }
    }

    const borderMain = svg.querySelector<SVGGElement>('#border-main-paths')
    const borderHalo = svg.querySelector<SVGGElement>('#border-halo-paths')
    if (borderMain && borderHalo) {
      if (isMacroZoom) {
        const inv = Math.min(1.55, 1 / s)
        borderMain.setAttribute('stroke-width', (2.7 * inv).toFixed(2))
        borderMain.setAttribute('stroke-opacity', '0.90')
        borderHalo.setAttribute('stroke-width', (6.8 * inv).toFixed(2))
        borderHalo.setAttribute('stroke-opacity', '0.78')
      } else {
        borderMain.setAttribute('stroke-width', (2.35 * markerScale).toFixed(2))
        borderMain.setAttribute('stroke-opacity', '0.80')
        borderHalo.setAttribute('stroke-width', (6.0 * markerScale).toFixed(2))
        borderHalo.setAttribute('stroke-opacity', '0.66')
      }
    }
  }, [s, markerScale, isMacroZoom, isSub94Zoom, anyPlaceLabelOn])

  // Native non-passive wheel listener for smooth zoom around cursor
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.16 : 0.86
      const pt = clientToSvgCoords(svg, e.clientX, e.clientY)
      zoomWorldBy(factor, pt.x, pt.y)
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [zoomWorldBy])

  // Pointer drag pan listeners (unified mouse + touch + trackpad + pen)
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const session = dragRef.current
      const svg = svgRef.current
      if (!session || !svg || e.pointerId !== session.pointerId) return
      const movedPx = Math.hypot(e.clientX - session.downClientX, e.clientY - session.downClientY)
      if (movedPx > 5 && !session.moved) {
        session.moved = true
        setTooltip(null)
      }
      if (!session.moved) return
      const curPt = clientToSvgCoords(svg, e.clientX, e.clientY)
      setWorldPan({
        x: session.initPanX + (curPt.x - session.startSvgX),
        y: session.initPanY + (curPt.y - session.startSvgY),
        scale: useGameStore.getState().worldPan.scale,
      })
    }

    const onPointerEnd = (e: PointerEvent) => {
      if (dragRef.current && e.pointerId === dragRef.current.pointerId) {
        setTimeout(() => {
          dragRef.current = null
        }, 0)
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerEnd)
    window.addEventListener('pointercancel', onPointerEnd)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
    }
  }, [setTooltip, setWorldPan])

  const plannedRoute = useMemo(() => {
    if (traveling) return null
    if (!selectedNodeId || (selectedNodeId === currentNodeId && !campPos)) return null
    const route = findBestRoute(
      currentNodeId,
      selectedNodeId,
      {
        mountKey,
        qinggongBonus,
        ridingSkill,
        agility,
      },
      campPos,
      unlockedRegionKey,
    )
    return route && route.segments.length > 0 ? route : null
  }, [
    traveling,
    selectedNodeId,
    currentNodeId,
    campPos,
    mountKey,
    qinggongBonus,
    ridingSkill,
    agility,
    unlockedRegionKey,
  ])

  const activeRoute = traveling
    ? traveling.route.segments.length > 0
      ? traveling.route
      : null
    : plannedRoute

  const activeRoutePoints = useMemo(() => {
    if (!activeRoute || activeRoute.segments.length === 0) return null
    if (traveling) {
      const pts: string[] = [`${traveling.playerPos.x},${traveling.playerPos.y}`]
      for (let i = traveling.segIdx; i < traveling.route.segments.length; i++) {
        const seg = traveling.route.segments[i]
        const nt = seg ? NODE_MAP[seg.to] : undefined
        if (nt) pts.push(`${nt.x},${nt.y}`)
      }
      return pts.length >= 2 ? pts.join(' ') : null
    }
    const pts: string[] = []
    const firstSeg = activeRoute.segments[0]
    if (firstSeg.fromCoords) {
      pts.push(`${firstSeg.fromCoords.x},${firstSeg.fromCoords.y}`)
    } else {
      const n0 = NODE_MAP[firstSeg.from]
      if (n0) pts.push(`${n0.x},${n0.y}`)
    }
    for (const seg of activeRoute.segments) {
      const nt = NODE_MAP[seg.to]
      if (nt) pts.push(`${nt.x},${nt.y}`)
    }
    return pts.length >= 2 ? pts.join(' ') : null
  }, [activeRoute, traveling])

  const activeEdgeSignature = useMemo(() => {
    if (!activeRoute) return ''
    const startIdx = traveling ? traveling.segIdx : 0
    let sig = `${startIdx}:`
    for (let i = startIdx; i < activeRoute.segments.length; i++) {
      const seg = activeRoute.segments[i]
      if (seg) sig += `${seg.from}>${seg.to};`
    }
    return sig
  }, [activeRoute, traveling])

  const activeEdgeKeys = useMemo(() => {
    const keys = new Set<string>()
    if (!activeEdgeSignature) return keys
    const body = activeEdgeSignature.slice(activeEdgeSignature.indexOf(':') + 1)
    for (const pair of body.split(';')) {
      if (!pair) continue
      const [from, to] = pair.split('>')
      if (from && to) {
        keys.add(`${from}__${to}`)
        keys.add(`${to}__${from}`)
      }
    }
    return keys
  }, [activeEdgeSignature])

  const hasActiveRoute = activeRoute !== null
  const isTraveling = traveling !== null
  const isOffCity = Boolean(traveling || campPos)

  const playerCoords = traveling
    ? traveling.playerPos
    : campPos
      ? { x: campPos.x, y: campPos.y }
      : {
          x: NODE_MAP[currentNodeId]?.x ?? 856.8,
          y: NODE_MAP[currentNodeId]?.y ?? 379.9,
        }

  const handleNodeHover = useCallback(
    (e: React.MouseEvent, node: WorldNode) => {
      if (dragRef.current?.moved) return
      setTooltip({
        kind: 'worldNode',
        x: e.clientX,
        y: e.clientY,
        node,
      })
    },
    [setTooltip],
  )

  const handleNodeMove = useCallback(
    (e: React.MouseEvent) => {
      moveTooltip(e.clientX, e.clientY)
    },
    [moveTooltip],
  )

  const handleNodeLeave = useCallback(() => {
    setTooltip(null)
  }, [setTooltip])

  const handleNodeActivate = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (dragRef.current?.moved) return
    e.stopPropagation()
    const st = useGameStore.getState()
    if (st.currentNodeId === nodeId && !st.traveling && !st.campPos) {
      st.enterRegionMap(nodeId)
    } else {
      st.selectWorldNode(nodeId)
    }
  }, [])

  return (
    <svg
      id="song-map-svg"
      ref={svgRef}
      viewBox="0 0 1600 1000"
      className="w-full h-full block select-none touch-none"
      onPointerDown={(e) => {
        if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return
        const pt = clientToSvgCoords(svgRef.current, e.clientX, e.clientY)
        dragRef.current = {
          pointerId: e.pointerId,
          downClientX: e.clientX,
          downClientY: e.clientY,
          startSvgX: pt.x,
          startSvgY: pt.y,
          initPanX: worldPan.x,
          initPanY: worldPan.y,
          moved: false,
        }
      }}
      onClick={() => {
        if (dragRef.current?.moved) return
        clearFloatingSelection()
      }}
    >
      <StaticDefs />

      <g
        id="map-pan-zoom-root"
        transform={`translate(${worldPan.x}, ${worldPan.y}) scale(${worldPan.scale})`}
      >
        <StaticGeography />

        {/* 10. 门派与四国势力圈 */}
        {overlays.factions && <WorldFactionsLayer />}

        {/* 11. 水陆交通路网与可选里程牌（仅在切换城池路段时更新，4Hz 行军逐帧不重绘全图道路） */}
        <WorldEdgesLayer
          hasActiveRoute={hasActiveRoute}
          isMacroZoom={isMacroZoom}
          isTraveling={isTraveling}
          showDistanceOverlay={overlays.distance}
          markerScale={markerScale}
          activeEdgeKeys={activeEdgeKeys}
        />

        {/* 12. 最优寻路/行军路线高亮（翠绿虚线） */}
        <g id="svg-layer-route" pointerEvents="none">
          {activeRoutePoints && (
            <polyline
              points={activeRoutePoints}
              fill="none"
              stroke="#1e7e4e"
              strokeWidth={3.6 * markerScale}
              strokeDasharray={`${(8.5 * markerScale).toFixed(2)} ${(5.5 * markerScale).toFixed(2)}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={
                {
                  '--route-period': `${(28 * markerScale).toFixed(2)}px`,
                } as React.CSSProperties
              }
              className="active-route-glow"
            />
          )}
        </g>

        {/* 13. 边关渗透警报圈 */}
        {overlays.alerts && <WorldAlertsLayer isMacroZoom={isMacroZoom} markerScale={markerScale} />}

        {/* 14. 四十三处州府、名山宗门与战略雄关节点（memo 隔离：4Hz 行军期间零重渲染） */}
        <WorldNodesLayer
          selectedNodeId={selectedNodeId}
          currentNodeId={currentNodeId}
          isOffCity={isOffCity}
          unlockedRegionKey={unlockedRegionKey}
          markerScale={markerScale}
          isMacroZoom={isMacroZoom}
          isSub94Zoom={isSub94Zoom}
          cityLabelsOverlay={overlays.cityLabels}
          showCityLabels={showCityLabels}
          showMinorLabels={showMinorLabels}
          onNodeHover={handleNodeHover}
          onNodeMove={handleNodeMove}
          onNodeLeave={handleNodeLeave}
          onNodeActivate={handleNodeActivate}
        />

        {/* 15. 名侠游历踪迹胶囊 */}
        {overlays.masters && !isMacroZoom && (
          <WorldMastersLayer roamingMasters={roamingMasters} markerScale={markerScale} />
        )}

        {/* 16. 玩家动态脉冲令牌 */}
        <g
          id="svg-layer-player"
          transform={`translate(${playerCoords.x}, ${playerCoords.y}) scale(${markerScale})`}
          pointerEvents="none"
        >
          <g transform="translate(0, -14)">
            <circle
              r={11.2}
              fill="none"
              stroke={campPos && !traveling ? '#059669' : '#d97706'}
              strokeWidth={2.0}
              className="player-pulse"
            />
            <circle
              r={9.8}
              fill={campPos && !traveling ? '#047857' : '#b45309'}
              stroke="#fffbeb"
              strokeWidth={1.8}
            />
            <text
              x={0}
              y={3.5}
              textAnchor="middle"
              fontSize={10}
              fontWeight="bold"
              className="song-serif"
              fill="#fffbeb"
            >
              {campPos && !traveling ? '营' : mountKey === 'walk' ? '侠' : '骑'}
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}
