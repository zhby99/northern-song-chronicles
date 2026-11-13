import { useEffect, useMemo, useRef } from 'react'
import { BUILDING_DB_MAP } from '../../data/gameDb'
import { useGameStore } from '../../store/useGameStore'
import { useLazyImage } from '../../utils/assetLoader'
import {
  clientToSvgCoords,
  getRegionAllBuildings,
  getRegionViewBoxSize,
  NODE_MAP,
  REGIONAL_CONFIGS,
} from '../../utils/mapMath'
import { SvgBuildingInteriorFallback } from './SvgBuildingInteriorFallback'

export function RegionMapCanvas() {
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

  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const selectedSpotId = useGameStore((s) => s.selectedSpotId)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const regionPan = useGameStore((s) => s.regionPan)

  const setRegionPan = useGameStore((s) => s.setRegionPan)
  const zoomRegionBy = useGameStore((s) => s.zoomRegionBy)
  const selectRegionBuilding = useGameStore((s) => s.selectRegionBuilding)
  const selectBuildingSpot = useGameStore((s) => s.selectBuildingSpot)
  const enterBuildingMap = useGameStore((s) => s.enterBuildingMap)
  const exitBuildingMap = useGameStore((s) => s.exitBuildingMap)
  const exitToWorldMap = useGameStore((s) => s.exitToWorldMap)
  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const setTooltip = useGameStore((s) => s.setTooltip)
  const moveTooltip = useGameStore((s) => s.moveTooltip)

  const regionNode = NODE_MAP[activeRegionId]
  const regionCfg = REGIONAL_CONFIGS[activeRegionId]
  const activeBuildingRecord =
    viewMode === 'building' && activeBuildingInteriorId
      ? (BUILDING_DB_MAP[activeBuildingInteriorId] ?? null)
      : null
  const activeInterior = activeBuildingRecord?.interior ?? null

  const [vw, vh] = getRegionViewBoxSize(viewMode, activeRegionId)
  const targetPanoramaUri = activeInterior
    ? (activeInterior.panoramaUri ?? undefined)
    : regionCfg?.panoramaUri
  const { status: imgStatus, loadedUrl } = useLazyImage(targetPanoramaUri)

  const sortedBuildings = useMemo(() => {
    if (viewMode !== 'region') return []
    const all = getRegionAllBuildings(activeRegionId)
    return [...all].sort((a, b) => Number(a.isSpecial) - Number(b.isSpecial))
  }, [viewMode, activeRegionId])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.16 : 0.86
      const pt = clientToSvgCoords(svg, e.clientX, e.clientY)
      zoomRegionBy(factor, pt.x, pt.y)
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [zoomRegionBy])

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
      setRegionPan({
        x: session.initPanX + (curPt.x - session.startSvgX),
        y: session.initPanY + (curPt.y - session.startSvgY),
        scale: useGameStore.getState().regionPan.scale,
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
  }, [setRegionPan, setTooltip])

  if (!regionNode || !regionCfg) return null

  const sceneTitle = activeBuildingRecord ? activeBuildingRecord.name : regionNode.name

  return (
    <div className="relative w-full h-full bg-[#1e1610]">
      {/* 按需懒加载画卷状态遮罩（仅在需要拉取 JPG 原画且尚未命中缓存时浮现） */}
      {targetPanoramaUri && imgStatus === 'loading' && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#1b130d]/80">
          <div className="px-6 py-4 rounded-md bg-[#f8f1e1] border-2 border-[#c89d54] shadow-2xl text-center space-y-1.5">
            <div className="song-serif font-bold text-base text-[#8f1d14] tracking-wider">
              正在展卷 · 【{sceneTitle}】半3D青绿设色长卷
            </div>
            <div className="text-xs text-[#5c4630] font-mono">
              按需懒加载静态资源：{targetPanoramaUri}
            </div>
          </div>
        </div>
      )}

      {targetPanoramaUri && imgStatus === 'error' && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="px-5 py-3 rounded bg-[#7f1d1d] text-[#fff8eb] border border-[#f5cb5c] text-xs song-serif">
            原画资源加载失败：{targetPanoramaUri}
          </div>
        </div>
      )}

      <svg
        id="region-map-svg"
        ref={svgRef}
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full block select-none"
        onMouseDown={(e) => {
          if (e.button !== 0) return
          const pt = clientToSvgCoords(svgRef.current, e.clientX, e.clientY)
          dragRef.current = {
            downClientX: e.clientX,
            downClientY: e.clientY,
            startSvgX: pt.x,
            startSvgY: pt.y,
            initPanX: regionPan.x,
            initPanY: regionPan.y,
            moved: false,
          }
        }}
        onClick={() => {
          if (dragRef.current?.moved) return
          clearFloatingSelection()
        }}
      >
        <g
          id="region-pan-zoom-root"
          transform={`translate(${regionPan.x}, ${regionPan.y}) scale(${regionPan.scale})`}
        >
          <rect x={-800} y={-500} width={vw + 1600} height={vh + 1000} fill="#1b130d" />
          <rect
            x={-4}
            y={-4}
            width={vw + 8}
            height={vh + 8}
            rx={4}
            fill="#261b12"
            stroke="#c89d54"
            strokeWidth={3}
            strokeOpacity={0.65}
          />

          {/* 底图渲染：若有 JPG 原画则懒加载渲染；若为其余 65 座特殊建筑则渲染宋式《营造法式》矢量内景卷 */}
          {activeBuildingRecord && activeInterior?.mode === 'svg_fallback' ? (
            <SvgBuildingInteriorFallback building={activeBuildingRecord} width={vw} height={vh} />
          ) : (
            loadedUrl && <image href={loadedUrl} x={0} y={0} width={vw} height={vh} />
          )}

          {/* 第三层级：建筑内景图热区与出口（涵盖全部 123 座特殊建筑） */}
          {activeBuildingRecord && activeInterior ? (
            <>
              {/* 出口热区 */}
              {(() => {
                const eg = activeInterior.exitGate
                const gateText = `← ${eg.label}`
                const gateW = Math.max(120, gateText.length * 11 + 24)
                return (
                  <g
                    id="building-exit-gate"
                    className="cursor-pointer iso-hotspot-group"
                    onClick={(e) => {
                      if (dragRef.current?.moved) return
                      e.stopPropagation()
                      exitBuildingMap()
                    }}
                  >
                    <polygon
                      points={eg.poly}
                      fill="#10b981"
                      fillOpacity={0}
                      stroke="#6ee7b7"
                      strokeWidth={0}
                      strokeOpacity={0}
                      strokeLinejoin="round"
                      className="iso-poly-hotspot"
                    />
                    {showRegionLabels && (
                      <g transform={`translate(${eg.x}, ${eg.y})`} className="iso-plaque">
                        <rect
                          x={-gateW / 2}
                          y={-12}
                          width={gateW}
                          height={22}
                          rx={4}
                          fill="#183d2c"
                          stroke="#a7f3d0"
                          strokeWidth={1.8}
                        />
                        <text
                          x={0}
                          y={3}
                          textAnchor="middle"
                          fontSize={11}
                          fontWeight="bold"
                          className="song-serif"
                          fill="#ecfdf5"
                        >
                          {gateText}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })()}

              {/* 院落殿宇热区 */}
              <g id="building-spots-layer">
                {activeInterior.spots.map((sp) => {
                  const isSelected = sp.id === selectedSpotId
                  const spotResidentCount = sp.residentNpcIds?.length ?? 0
                  const spotTagLabel =
                    spotResidentCount > 0 ? `${sp.tag} · ${spotResidentCount}人` : sp.tag
                  const labelText = `★ ${sp.name}`
                  const plateW = Math.max(100, labelText.length * 11.2 + 22)
                  const plateFill = isSelected ? '#2b180b' : '#8f1d14'
                  const plateStroke = isSelected ? '#fbbf24' : '#f6cf65'
                  const tagW = Math.max(66, spotTagLabel.length * 9.0 + 16)

                  return (
                    <g
                      key={sp.id}
                      data-spot-id={sp.id}
                      className="cursor-pointer iso-hotspot-group"
                      onMouseEnter={(e) => {
                        if (dragRef.current?.moved) return
                        setTooltip({
                          kind: 'building',
                          x: e.clientX,
                          y: e.clientY,
                          item: {
                            id: sp.id,
                            name: sp.name,
                            desc: sp.desc,
                            actLabel: sp.actLabel,
                            isSpecial: true,
                            isSpot: true,
                            interiorMode: activeInterior.mode,
                            residentCount: spotResidentCount,
                          },
                        })
                      }}
                      onMouseMove={(e) => moveTooltip(e.clientX, e.clientY)}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={(e) => {
                        if (dragRef.current?.moved) return
                        e.stopPropagation()
                        selectBuildingSpot(sp.id)
                      }}
                    >
                      <polygon
                        points={sp.poly}
                        fill="#f59e0b"
                        fillOpacity={isSelected ? 0.26 : 0}
                        stroke="#fde047"
                        strokeWidth={isSelected ? 3.2 : 0}
                        strokeOpacity={isSelected ? 0.96 : 0}
                        strokeLinejoin="round"
                        className="iso-poly-hotspot"
                      />
                      {(showRegionLabels || isSelected) && (
                        <g transform={`translate(${sp.x}, ${sp.y})`} className="iso-plaque">
                          <line x1={0} y1={0} x2={0} y2={18} stroke={plateStroke} strokeWidth={2} />
                          <circle
                            cx={0}
                            cy={19}
                            r={4}
                            fill={plateStroke}
                            stroke="#1f1209"
                            strokeWidth={1.2}
                          />
                          <rect
                            x={-tagW / 2}
                            y={-31}
                            width={tagW}
                            height={14}
                            rx={7}
                            fill="#fef3c7"
                            stroke="#92400e"
                            strokeWidth={1.2}
                          />
                          <text
                            x={0}
                            y={-21}
                            textAnchor="middle"
                            fontSize={8.8}
                            fontWeight="bold"
                            fill="#781710"
                          >
                            {spotTagLabel}
                          </text>
                          <rect
                            x={-plateW / 2}
                            y={-15}
                            width={plateW}
                            height={21}
                            rx={4}
                            fill={plateFill}
                            stroke={plateStroke}
                            strokeWidth={isSelected ? 2.4 : 1.6}
                          />
                          <text
                            x={0}
                            y={-0.5}
                            textAnchor="middle"
                            fontSize={11}
                            fontWeight="bold"
                            className="song-serif"
                            fill={isSelected ? '#fde68a' : '#fff9ed'}
                          >
                            {labelText}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </g>
            </>
          ) : (
            /* 第二层级：地区半3D全景图热区与城门/山门出口 */
            <>
              {(() => {
                const [gx, gy] = regionCfg.gatePos
                const gateW = regionCfg.gateLabel.length * 11 + 24
                return (
                  <g
                    id="region-exit-gate"
                    className="cursor-pointer iso-hotspot-group"
                    onClick={(e) => {
                      if (dragRef.current?.moved) return
                      e.stopPropagation()
                      exitToWorldMap()
                    }}
                  >
                    {regionCfg.gatePoly && (
                      <polygon
                        points={regionCfg.gatePoly}
                        fill="#10b981"
                        fillOpacity={0}
                        stroke="#6ee7b7"
                        strokeWidth={0}
                        strokeOpacity={0}
                        strokeLinejoin="round"
                        className="iso-poly-hotspot"
                      />
                    )}
                    {showRegionLabels && (
                      <g transform={`translate(${gx}, ${gy})`} className="iso-plaque">
                        <rect
                          x={-gateW / 2}
                          y={-12}
                          width={gateW}
                          height={22}
                          rx={4}
                          fill="#183d2c"
                          stroke="#a7f3d0"
                          strokeWidth={1.8}
                        />
                        <text
                          x={0}
                          y={3}
                          textAnchor="middle"
                          fontSize={11}
                          fontWeight="bold"
                          className="song-serif"
                          fill="#ecfdf5"
                        >
                          ← {regionCfg.gateLabel}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })()}

              <g id="region-buildings-layer">
                {sortedBuildings.map((b) => {
                  const isSelected = b.id === selectedBuildingId
                  const dbBuilding = BUILDING_DB_MAP[b.id]
                  const interiorMode = dbBuilding?.interior?.mode ?? null
                  const canEnterInterior = Boolean(b.isSpecial && interiorMode)

                  const fillColor = b.isSpecial ? '#f59e0b' : '#38bdf8'
                  const strokeColor = b.isSpecial ? '#fde047' : '#bae6fd'
                  const labelText = (b.isSpecial ? '★ ' : '') + b.name
                  const plateW = Math.max(92, labelText.length * 11.2 + 22)
                  const plateFill = isSelected
                    ? '#2b180b'
                    : b.isSpecial
                      ? '#8f1d14'
                      : '#243a47'
                  const plateStroke = isSelected
                    ? '#fbbf24'
                    : b.isSpecial
                      ? '#f6cf65'
                      : '#cbd5e1'
                  const subTagText = canEnterInterior
                    ? interiorMode === 'image'
                      ? `${b.tag} · 步入实景`
                      : `${b.tag} · 步入内院`
                    : b.tag
                  const subTagW = Math.max(64, subTagText.length * 8.6 + 16)

                  return (
                    <g
                      key={b.id}
                      data-bldg-id={b.id}
                      className="cursor-pointer iso-hotspot-group"
                      onMouseEnter={(e) => {
                        if (dragRef.current?.moved) return
                        setTooltip({
                          kind: 'building',
                          x: e.clientX,
                          y: e.clientY,
                          item: {
                            id: b.id,
                            name: b.name,
                            desc: b.desc,
                            actLabel: b.actLabel,
                            isSpecial: b.isSpecial,
                            interiorMode,
                            residentCount: dbBuilding?.residentNpcIds.length ?? 0,
                          },
                        })
                      }}
                      onMouseMove={(e) => moveTooltip(e.clientX, e.clientY)}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={(e) => {
                        if (dragRef.current?.moved) return
                        e.stopPropagation()
                        if (canEnterInterior) {
                          enterBuildingMap(b.id)
                        } else {
                          selectRegionBuilding(b.id)
                        }
                      }}
                    >
                      {b.poly ? (
                        <polygon
                          points={b.poly}
                          fill={fillColor}
                          fillOpacity={isSelected ? 0.24 : 0}
                          stroke={strokeColor}
                          strokeWidth={isSelected ? 3.2 : 0}
                          strokeOpacity={isSelected ? 0.96 : 0}
                          strokeLinejoin="round"
                          className="iso-poly-hotspot"
                        />
                      ) : (
                        <circle
                          cx={b.x}
                          cy={b.y}
                          r={36}
                          fill={fillColor}
                          fillOpacity={isSelected ? 0.24 : 0}
                          stroke={strokeColor}
                          strokeWidth={isSelected ? 3.2 : 0}
                          strokeOpacity={isSelected ? 0.96 : 0}
                          className="iso-poly-hotspot"
                        />
                      )}

                      {(showRegionLabels || isSelected) && (
                        <g transform={`translate(${b.x}, ${b.y})`} className="iso-plaque">
                          <line x1={0} y1={0} x2={0} y2={18} stroke={plateStroke} strokeWidth={2} />
                          <circle
                            cx={0}
                            cy={19}
                            r={4}
                            fill={plateStroke}
                            stroke="#1f1209"
                            strokeWidth={1.2}
                          />
                          {b.isSpecial && (
                            <>
                              <rect
                                x={-subTagW / 2}
                                y={-31}
                                width={subTagW}
                                height={14}
                                rx={7}
                                fill={interiorMode === 'image' ? '#fef3c7' : '#e6f4ec'}
                                stroke={interiorMode === 'image' ? '#92400e' : '#246344'}
                                strokeWidth={1.2}
                              />
                              <text
                                x={0}
                                y={-21}
                                textAnchor="middle"
                                fontSize={8.6}
                                fontWeight="bold"
                                fill={interiorMode === 'image' ? '#781710' : '#184f35'}
                              >
                                {subTagText}
                              </text>
                            </>
                          )}
                          <rect
                            x={-plateW / 2}
                            y={-15}
                            width={plateW}
                            height={21}
                            rx={4}
                            fill={plateFill}
                            stroke={plateStroke}
                            strokeWidth={isSelected ? 2.4 : 1.6}
                          />
                          <text
                            x={0}
                            y={-0.5}
                            textAnchor="middle"
                            fontSize={11}
                            fontWeight="bold"
                            className="song-serif"
                            fill={isSelected ? '#fde68a' : '#fff9ed'}
                          >
                            {labelText}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </g>
            </>
          )}
        </g>
      </svg>
    </div>
  )
}
