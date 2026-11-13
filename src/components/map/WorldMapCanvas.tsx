import { memo, useEffect, useMemo, useRef } from 'react'
import { WORLD_SVG_DEFS_MARKUP, WORLD_SVG_STATIC_GEO_MARKUP } from '../../data/worldBaseSvg'
import { useGameStore } from '../../store/useGameStore'
import type { FactionKind, WorldNode } from '../../types/game'
import { clientToSvgCoords, findBestRoute, NODE_MAP, WORLD_GRAPH } from '../../utils/mapMath'

const CAPITALS = new Set([
  'bianliang',
  'linhuang_liao',
  'xingqing_xixia',
  'luoxie_tubo',
  'dali_city',
])

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

export function WorldMapCanvas() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const dragRef = useRef<{
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
  const roamingMasters = useGameStore((s) => s.roamingMasters)
  const traveling = useGameStore((s) => s.traveling)

  const setWorldPan = useGameStore((s) => s.setWorldPan)
  const zoomWorldBy = useGameStore((s) => s.zoomWorldBy)
  const selectWorldNode = useGameStore((s) => s.selectWorldNode)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const setTooltip = useGameStore((s) => s.setTooltip)
  const moveTooltip = useGameStore((s) => s.moveTooltip)

  const s = worldPan.scale
  const isMacroZoom = s < 0.85
  const showMinorLabels = overlays.sectPassLabels && s >= 0.94
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
      } else if (s < 0.94) {
        macroRegimes.style.opacity = '0.52'
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
        borderMain.setAttribute('stroke-width', '2.35')
        borderMain.setAttribute('stroke-opacity', '0.80')
        borderHalo.setAttribute('stroke-width', '6.0')
        borderHalo.setAttribute('stroke-opacity', '0.66')
      }
    }
  }, [s, isMacroZoom, anyPlaceLabelOn])

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

  // Mouse drag pan listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const session = dragRef.current
      const svg = svgRef.current
      if (!session || !svg) return
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

    const onMouseUp = () => {
      if (dragRef.current) {
        setTimeout(() => {
          dragRef.current = null
        }, 0)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [setTooltip, setWorldPan])

  const activeRoutePoints = useMemo(() => {
    const targetId = traveling ? traveling.targetId : selectedNodeId
    if (!targetId || targetId === currentNodeId) return null
    const route = traveling
      ? traveling.route
      : findBestRoute(currentNodeId, targetId, {
          mountKey,
          qinggongBonus,
          ridingSkill,
          agility,
        })
    if (!route || route.segments.length === 0) return null
    return route.nodes
      .map((id) => {
        const n = NODE_MAP[id]
        return n ? `${n.x},${n.y}` : ''
      })
      .filter(Boolean)
      .join(' ')
  }, [traveling, selectedNodeId, currentNodeId, mountKey, qinggongBonus, ridingSkill, agility])

  const playerCoords = useMemo(() => {
    if (traveling) return traveling.playerPos
    const curr = NODE_MAP[currentNodeId]
    return { x: curr?.x ?? 856.8, y: curr?.y ?? 379.9 }
  }, [traveling, currentNodeId])

  const handleNodeHover = (e: React.MouseEvent, node: WorldNode) => {
    if (dragRef.current?.moved) return
    setTooltip({
      kind: 'worldNode',
      x: e.clientX,
      y: e.clientY,
      node,
    })
  }

  return (
    <svg
      id="song-map-svg"
      ref={svgRef}
      viewBox="0 0 1600 1000"
      className="w-full h-full block select-none"
      onMouseDown={(e) => {
        if (e.button !== 0) return
        const pt = clientToSvgCoords(svgRef.current, e.clientX, e.clientY)
        dragRef.current = {
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
        {overlays.factions && (
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
        )}

        {/* 11. 水陆交通路网与可选里程牌 */}
        <g id="svg-layer-edges" className="lod-fade" style={{ opacity: !isMacroZoom ? 1 : 0.28 }}>
          {WORLD_GRAPH.edges.map(([u, v, dist, terrain], idx) => {
            const nu = NODE_MAP[u]
            const nv = NODE_MAP[v]
            if (!nu || !nv) return null
            const meta = WORLD_GRAPH.terrainMeta[terrain]
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
                  strokeWidth={meta.width}
                  strokeOpacity={0.62}
                  className={meta.cls || undefined}
                />
                {overlays.distance && !isMacroZoom && (
                  <g className="edge-dist-label lod-fade" pointerEvents="none">
                    <rect
                      x={mx - 20}
                      y={my - 7}
                      width={40}
                      height={13}
                      rx={2}
                      fill="#faf2e1"
                      stroke="#8c7353"
                      strokeWidth={0.5}
                    />
                    <text
                      x={mx}
                      y={my + 2.5}
                      textAnchor="middle"
                      fontSize={8.5}
                      fontWeight={600}
                      fill="#3a2918"
                    >
                      {dist}里
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </g>

        {/* 12. 最优行军路线高亮 */}
        <g id="svg-layer-route" pointerEvents="none">
          {activeRoutePoints && (
            <polyline
              points={activeRoutePoints}
              fill="none"
              stroke="#c42b1c"
              strokeWidth={4.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="active-route-glow"
            />
          )}
        </g>

        {/* 13. 边关渗透警报圈 */}
        {overlays.alerts && (
          <g id="svg-layer-alerts" className="lod-fade" style={{ opacity: !isMacroZoom ? 1 : 0.3 }}>
            {WORLD_GRAPH.nodes
              .filter((n) => n.alert)
              .map((n) => (
                <circle
                  key={`alert-${n.id}`}
                  cx={n.x}
                  cy={n.y}
                  r={19}
                  fill="none"
                  stroke="#b8251e"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  className="alert-ring"
                  pointerEvents="none"
                />
              ))}
          </g>
        )}

        {/* 14. 三十八处州府、名山宗门与战略雄关节点 */}
        <g id="svg-layer-nodes">
          {WORLD_GRAPH.nodes.map((n) => {
            const isCapital = CAPITALS.has(n.id)
            const isSelected = selectedNodeId === n.id
            const isCurrent = currentNodeId === n.id && !traveling
            const shortName = n.name.replace('（万山之祖）', '')
            const boxW = shortName.length * 11 + 10

            let markerOpacity = 1
            if (isMacroZoom) {
              markerOpacity = isCapital ? 0.92 : n.type === 'city' ? 0.52 : 0.25
            } else if (s < 0.94 && overlays.cityLabels) {
              markerOpacity = n.type === 'city' ? 1 : 0.78
            }

            const showLabel = n.type === 'city' ? showCityLabels : showMinorLabels
            const regStyle =
              (n.regime && WORLD_GRAPH.regimeBadge[n.regime]) || WORLD_GRAPH.regimeBadge.song
            const sz = isCapital ? 9.2 : 8.0

            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                className="cursor-pointer map-node-group"
                onMouseEnter={(e) => handleNodeHover(e, n)}
                onMouseMove={(e) => moveTooltip(e.clientX, e.clientY)}
                onMouseLeave={() => setTooltip(null)}
                onClick={(e) => {
                  if (dragRef.current?.moved) return
                  e.stopPropagation()
                  if (currentNodeId === n.id && !traveling) {
                    enterRegionMap(n.id)
                  } else {
                    selectWorldNode(n.id)
                  }
                }}
              >
                {isSelected && (
                  <circle
                    r={16}
                    fill="#d99b26"
                    fillOpacity={0.32}
                    stroke="#a8620a"
                    strokeWidth={1.8}
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
                        strokeWidth={1.6}
                      />
                      <rect
                        x={-3.8}
                        y={-3.8}
                        width={7.6}
                        height={7.6}
                        fill={isCapital ? '#f5cb5c' : regStyle.inner}
                      />
                    </>
                  ) : n.type === 'sect' ? (
                    <>
                      <circle
                        r={n.id === 'kunlun' ? 9.5 : 7.2}
                        fill={n.id === 'kunlun' ? '#1d566e' : '#285948'}
                        stroke="#fbf4e4"
                        strokeWidth={1.5}
                      />
                      <circle
                        r={n.id === 'kunlun' ? 3.5 : 2.4}
                        fill={n.id === 'kunlun' ? '#ffffff' : '#dfeee7'}
                      />
                    </>
                  ) : (
                    <polygon
                      points="0,-9 9,0 0,9 -9,0"
                      fill="#8c5119"
                      stroke="#fbf4e4"
                      strokeWidth={1.5}
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
                    y={10.5}
                    width={boxW}
                    height={15.5}
                    rx={3}
                    fill={isCurrent ? '#3b2412' : '#fbf4e3'}
                    stroke={isSelected ? '#b56e12' : '#7a6345'}
                    strokeWidth={isSelected ? 1.2 : 0.75}
                  />
                  <text
                    x={0}
                    y={21.5}
                    textAnchor="middle"
                    fontSize={n.type === 'city' ? 10.8 : 10}
                    fontWeight={n.type === 'city' ? 700 : 600}
                    className="song-serif"
                    fill={
                      isCurrent
                        ? '#fde68a'
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

        {/* 15. 名侠游历踪迹胶囊 */}
        {overlays.masters && !isMacroZoom && (
          <g id="svg-layer-masters" className="lod-fade" pointerEvents="none">
            {roamingMasters.map((m, idx) => {
              const n = NODE_MAP[m.nodeId]
              if (!n) return null
              const offsetX = idx % 2 === 0 ? 16 : -16
              return (
                <g key={m.id} transform={`translate(${n.x + offsetX}, ${n.y - 14})`}>
                  <rect
                    x={-32}
                    y={-8}
                    width={64}
                    height={13}
                    rx={6}
                    fill="#1d473a"
                    stroke="#e6f5ee"
                    strokeWidth={0.85}
                  />
                  <text x={0} y={1.5} textAnchor="middle" fontSize={8.2} fill="#f0fdf4">
                    {m.name}
                  </text>
                </g>
              )
            })}
          </g>
        )}

        {/* 16. 玩家动态脉冲令牌 */}
        <g
          id="svg-layer-player"
          transform={`translate(${playerCoords.x}, ${playerCoords.y - 15})`}
          pointerEvents="none"
        >
          <circle
            r={12}
            fill="none"
            stroke="#d97706"
            strokeWidth={2.2}
            className="player-pulse"
          />
          <circle r={10.5} fill="#b45309" stroke="#fffbeb" strokeWidth={2} />
          <text
            x={0}
            y={3.8}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight="bold"
            className="song-serif"
            fill="#fffbeb"
          >
            {mountKey === 'walk' ? '侠' : '骑'}
          </text>
        </g>
      </g>
    </svg>
  )
}
