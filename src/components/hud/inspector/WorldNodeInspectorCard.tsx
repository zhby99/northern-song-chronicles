import { REGION_DB_MAP } from '../../../data/gameDb'
import {
  getRegionUnlockRequirement,
  getUnlockedLockedRegionKey,
  isRegionUnlockedByKey,
} from '../../../data/itemsDb'
import { useGameStore } from '../../../store/useGameStore'
import { findBestRoute, NODE_MAP, WORLD_GRAPH } from '../../../utils/mapMath'

export function WorldNodeInspectorCard() {
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const selectedNodeId = useGameStore((s) => s.selectedNodeId)
  const traveling = useGameStore((s) => s.traveling)
  const campPos = useGameStore((s) => s.campPos)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const agility = useGameStore((s) => s.agility)
  const unlockedRegionKey = useGameStore((s) => getUnlockedLockedRegionKey(s.inventory))

  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const startJourney = useGameStore((s) => s.startJourney)
  const openMenu = useGameStore((s) => s.openMenu)

  if (!selectedNodeId && !traveling && campPos) {
    const nodeU = NODE_MAP[campPos.u]
    const nodeV = NODE_MAP[campPos.v]
    return (
      <div
        id="floating-context-card"
        className="absolute bottom-3.5 right-3.5 z-20 w-80 bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-md p-3.5 shadow-2xl space-y-2.5 text-xs select-none"
      >
        <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
          <span className="song-serif font-bold text-sm text-[#23180f]">
            ⛺ 旷野行辕营地
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#215744] text-[#fff8ee] text-[10px]">
            野外扎营中
          </span>
        </div>
        <p className="text-[#3d2b19] leading-relaxed">
          当前驻扎于【{nodeU?.name ?? campPos.u}】（距 {Math.round(campPos.distU)} 里）至【
          {nodeV?.name ?? campPos.v}】（距 {Math.round(campPos.distV)} 里）驿道途中。可点选任意城池拔营续行，或就地篝火闭关精修武学。
        </p>
        <button
          type="button"
          onClick={() => openMenu('loadout')}
          className="w-full px-3 py-2 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif shadow transition cursor-pointer"
        >
          营地闭关修炼（耗粮 1 份/日 · 效率 85%）→
        </button>
      </div>
    )
  }

  if (!selectedNodeId || traveling) return null
  const node = NODE_MAP[selectedNodeId]
  if (!node) return null

  const isHere = currentNodeId === node.id && !campPos
  const isLocked = !isRegionUnlockedByKey(node.id, unlockedRegionKey)
  const lockReq = getRegionUnlockRequirement(node.id)
  const route =
    !isHere && !isLocked
      ? findBestRoute(
          currentNodeId,
          node.id,
          {
            mountKey,
            qinggongBonus,
            ridingSkill,
            agility,
          },
          campPos,
          unlockedRegionKey,
        )
      : null

  const typeBadge =
    node.type === 'city'
      ? (node.regime && WORLD_GRAPH.regimeBadge[node.regime]?.label) || '天下名城'
      : node.type === 'sect'
        ? '名山秘境'
        : '战略雄关'

  const regRecord = REGION_DB_MAP[node.id]

  return (
    <div
      id="floating-context-card"
      className="absolute bottom-3.5 right-3.5 z-20 w-80 max-h-[68vh] overflow-y-auto scroll-thin bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-md p-3.5 shadow-2xl space-y-2.5 text-xs select-none"
    >
      <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="song-serif font-bold text-sm text-[#23180f]">
              {node.code ? `${node.code} · ` : ''}
              {node.name}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[#fff8ee] text-[10px] ${
                isLocked ? 'bg-[#8f1d14]' : 'bg-[#5c4024]'
              }`}
            >
              {isLocked ? '🔒 舆图未得' : typeBadge}
            </span>
          </div>
          <div className="text-[11px] text-[#6b5235] mt-0.5">
            {node.circuit}
            {regRecord ? ` · 常驻群侠 ${regRecord.residentNpcIds.length} 人` : ''}
          </div>
        </div>
        <button
          type="button"
          onClick={clearFloatingSelection}
          className="px-1.5 py-0.5 rounded hover:bg-[#e5d7bc] text-[#5e472d] font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="text-[#3d2b19] leading-relaxed">{node.desc}</p>

      {node.sects.length > 0 && (
        <div className="text-[11px] text-[#781710] bg-[#efe4cc] border border-[#c8b28e] rounded px-2 py-1 font-medium">
          驻地宗门：{node.sects.join('、')}
        </div>
      )}

      {isLocked && lockReq ? (
        <div className="p-2.5 rounded bg-[#f8e3e1] border border-[#d6887f] space-y-1.5 text-[#781710]">
          <div className="font-bold song-serif text-xs">
            🔒 迷障封绝 · 尚未解锁抵达航道
          </div>
          <p className="text-[11px] text-[#4a251d] leading-relaxed">{lockReq.lockReason}</p>
          <div className="pt-1">
            <button
              type="button"
              disabled
              className="w-full px-3 py-1.5 rounded bg-[#9e8462]/60 text-[#5c4630] font-bold song-serif cursor-not-allowed"
            >
              需持有{lockReq.mapItemName}方可前往
            </button>
          </div>
        </div>
      ) : isHere ? (
        <button
          type="button"
          onClick={() => enterRegionMap(node.id)}
          className="w-full px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] font-bold song-serif shadow transition cursor-pointer"
        >
          进入【{node.name}】全景图 →
        </button>
      ) : route ? (
        <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[#5e472d]">
              路程：<strong className="font-mono text-[#23180f]">{route.totalLi}</strong> 里
            </span>
            <span className="font-mono font-bold text-[#8f1d14]">
              预计 {route.totalDays.toFixed(1)} 日
            </span>
          </div>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => startJourney(node.id)}
              className="w-full px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] font-bold song-serif shadow transition cursor-pointer"
            >
              策马出发（全程 {route.totalLi} 里）
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
