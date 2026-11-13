import { useMemo } from 'react'
import { REGION_DB_MAP } from '../../data/gameDb'
import { useGameStore } from '../../store/useGameStore'
import { findBestRoute, resolveMountMeta } from '../../utils/mapMath'

export function MapTooltip() {
  const tooltip = useGameStore((s) => s.tooltip)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const traveling = useGameStore((s) => s.traveling)
  const campPos = useGameStore((s) => s.campPos)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const agility = useGameStore((s) => s.agility)
  const roamingMasters = useGameStore((s) => s.roamingMasters)

  const hoveredWorldNodeId = tooltip?.kind === 'worldNode' ? tooltip.node.id : null
  const isHere = Boolean(
    hoveredWorldNodeId && hoveredWorldNodeId === currentNodeId && !traveling && !campPos,
  )

  const route = useMemo(() => {
    if (!hoveredWorldNodeId || isHere) return null
    return findBestRoute(
      currentNodeId,
      hoveredWorldNodeId,
      {
        mountKey,
        qinggongBonus,
        ridingSkill,
        agility,
      },
      campPos,
    )
  }, [hoveredWorldNodeId, isHere, currentNodeId, mountKey, qinggongBonus, ridingSkill, agility, campPos])

  const npcTotal = useMemo(() => {
    if (!hoveredWorldNodeId) return 0
    let roamingCount = 0
    for (const m of roamingMasters) {
      if (m.nodeId === hoveredWorldNodeId) roamingCount += 1
    }
    const dbResidentCount = REGION_DB_MAP[hoveredWorldNodeId]?.residentNpcIds.length ?? 0
    return dbResidentCount + roamingCount
  }, [hoveredWorldNodeId, roamingMasters])

  const mountMeta = useMemo(() => resolveMountMeta(mountKey), [mountKey])

  if (!tooltip) return null

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  let left = tooltip.x + 18
  let top = tooltip.y + 18
  if (left + 335 > vw) left = tooltip.x - 335
  if (top + 205 > vh) top = tooltip.y - 205
  left = Math.max(10, left)
  top = Math.max(10, top)

  if (tooltip.kind === 'worldNode') {
    const { node } = tooltip

    return (
      <div
        id="map-tooltip"
        style={{ left: `${left}px`, top: `${top}px` }}
        className="pointer-events-none fixed z-40 w-80 solid-map-tooltip text-[#23180f] rounded-md p-3.5 text-xs"
      >
        <div className="flex items-center justify-between bg-[#efe3c8] -mx-3.5 -mt-3.5 px-3.5 py-2 mb-2 rounded-t border-b border-[#b8a27e]">
          <span className="song-serif font-bold text-sm text-[#2b1a0e]">
            {node.code ? `${node.code} · ` : ''}
            {node.name}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#5c4024] text-[#fff9ed] text-[11px] font-medium">
            {node.circuit}
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          {isHere ? (
            <div className="px-2 py-1 rounded bg-[#e5efe9] text-[#1c543e] font-bold">
              ● 当前驻留于此（点击进入半3D专属互动全景图）
            </div>
          ) : route ? (
            <>
              <div className="flex justify-between py-0.5 border-b border-[#d8cbb2]">
                <span className="text-[#5c4630]">距离当前里程 (D)：</span>
                <strong className="font-mono text-[#23180f]">{route.totalLi} 里</strong>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#d8cbb2]">
                <span className="text-[#5c4630]">
                  按【{mountMeta.name}】预计抵达：
                </span>
                <strong className="text-[#9e2218] font-mono">
                  {route.totalDays.toFixed(1)} 天
                </strong>
              </div>
            </>
          ) : null}

          <div className="flex justify-between py-0.5">
            <span className="text-[#5c4630]">名录常驻与游历人物：</span>
            <strong className="font-mono text-[#23180f]">{npcTotal} 位群侠名流</strong>
          </div>

          <div className="p-2 rounded bg-[#f2e8d2] border border-[#cbb997] text-[#3d2b19] leading-relaxed">
            <span className="font-bold text-[#8f241e]">【江湖风闻】</span>
            {node.rumor}
          </div>
        </div>
      </div>
    )
  }

  const { item } = tooltip
  const canEnterInterior = !item.isSpot && item.isSpecial && Boolean(item.interiorMode)

  return (
    <div
      id="map-tooltip"
      style={{ left: `${left}px`, top: `${top}px` }}
      className="pointer-events-none fixed z-40 w-80 solid-map-tooltip text-[#23180f] rounded-md p-3.5 text-xs"
    >
      <div className="flex items-center justify-between bg-[#efe3c8] -mx-3.5 -mt-3.5 px-3.5 py-2 mb-2 rounded-t border-b border-[#b8a27e]">
        <span className="song-serif font-bold text-sm text-[#2b1a0e]">
          {item.isSpecial ? '★ ' : ''}
          {item.name}
        </span>
        <span
          className={`px-2 py-0.5 rounded ${
            item.isSpecial ? 'bg-[#8f1d14]' : 'bg-[#355263]'
          } text-[#fff9ed] text-[11px] font-medium`}
        >
          {item.isSpot ? '建筑内景热区' : item.isSpecial ? '特殊建筑' : '基础建筑'}
        </span>
      </div>

      <div className="space-y-1.5 text-xs">
        <p className="text-[#3d2b19] leading-relaxed">{item.desc}</p>
        {typeof item.residentCount === 'number' && (
          <div className="flex justify-between py-0.5 border-y border-[#d8cbb2]">
            <span className="text-[#5c4630]">
              {canEnterInterior ? '院内子建筑驻留人物：' : '本处常驻人物：'}
            </span>
            <strong className="font-mono text-[#23180f]">
              {item.residentCount > 0 ? `${item.residentCount} 位` : '暂无常驻'}
            </strong>
          </div>
        )}
        <div className="p-2 rounded bg-[#f2e8d2] border border-[#cbb997] text-[#781710] font-semibold">
          可互动机缘：{item.actLabel}
        </div>
        <div
          className={`text-[11px] font-semibold ${
            canEnterInterior ? 'text-[#8f1d14]' : 'text-[#5c4630]'
          }`}
        >
          {canEnterInterior
            ? item.interiorMode === 'image'
              ? `★ 点击切入【${item.name}】实景，点选子建筑方可寻访人物 →`
              : `★ 点击步入【${item.name}】内院，点选子建筑方可寻访人物 →`
            : '点击选中此最末层建筑，开启修习与驻留人物互动'}
        </div>
      </div>
    </div>
  )
}
