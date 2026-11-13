import { useGameStore } from '../../store/useGameStore'
import { NODE_MAP, WORLD_GRAPH } from '../../utils/mapMath'

export function TravelBanner() {
  const traveling = useGameStore((s) => s.traveling)
  const campStop = useGameStore((s) => s.campStop)

  if (!traveling) return null

  const seg = traveling.route.segments[traveling.segIdx]
  if (!seg) return null

  const ratio = Math.min(1, traveling.segProgressDays / seg.days)
  let remLi = Math.round(seg.dist * (1 - ratio))
  let remDays = Math.max(0, seg.days - traveling.segProgressDays)
  for (let i = traveling.segIdx + 1; i < traveling.route.segments.length; i++) {
    remLi += traveling.route.segments[i].dist
    remDays += traveling.route.segments[i].days
  }

  const targetName = NODE_MAP[traveling.targetId]?.name ?? traveling.targetId
  const terrainName = WORLD_GRAPH.terrainMeta[seg.terrain].name

  return (
    <div
      id="travel-banner"
      className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-[#281e15]/95 text-[#f7ebd2] border-2 border-[#c29b59] rounded-md px-4 py-2 shadow-xl flex items-center gap-4 text-xs"
    >
      <div>
        <div className="song-serif font-bold text-amber-300">
          正在赶往：{targetName}（当前：{terrainName}）
        </div>
        <div className="text-[#e6d8bc] mt-0.5">
          剩余里程：{remLi} 里 · 预计还需 {remDays.toFixed(1)} 日
        </div>
      </div>
      <button
        type="button"
        onClick={campStop}
        className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white font-medium transition cursor-pointer"
      >
        驻扎露营
      </button>
    </div>
  )
}
