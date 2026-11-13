import { useMemo } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { NodeNpc } from '../../types/game'
import { recordAssetLoaded } from '../../utils/assetLoader'
import {
  BUILDING_PANORAMAS,
  findBestRoute,
  getRegionAllBuildings,
  NODE_MAP,
  resolveCharacterByNpcName,
  WORLD_GRAPH,
} from '../../utils/mapMath'

export function ContextInspectorCard() {
  const viewMode = useGameStore((s) => s.viewMode)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const selectedNodeId = useGameStore((s) => s.selectedNodeId)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const selectedSpotId = useGameStore((s) => s.selectedSpotId)
  const traveling = useGameStore((s) => s.traveling)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const agility = useGameStore((s) => s.agility)
  const roamingMasters = useGameStore((s) => s.roamingMasters)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const enterBuildingMap = useGameStore((s) => s.enterBuildingMap)
  const startJourney = useGameStore((s) => s.startJourney)
  const doBuildingAction = useGameStore((s) => s.doBuildingAction)
  const interactNpc = useGameStore((s) => s.interactNpc)

  const regionNpcs = useMemo<NodeNpc[]>(() => {
    const node = NODE_MAP[activeRegionId]
    if (!node) return []
    const roamingHere = roamingMasters.filter((m) => m.nodeId === node.id)
    return [
      ...(node.npcs ?? []),
      ...roamingHere.map((m) => ({
        name: m.name,
        title: `${m.sect} · 游历至此`,
        realm: m.realm,
        talk: `“某游历至${node.name}，幸晤少侠，快哉！”`,
      })),
    ]
  }, [activeRegionId, roamingMasters])

  // 1) World Map Node Inspector
  if (viewMode === 'world') {
    if (!selectedNodeId || traveling) return null
    const node = NODE_MAP[selectedNodeId]
    if (!node) return null

    const isHere = currentNodeId === node.id
    const route = !isHere
      ? findBestRoute(currentNodeId, node.id, {
          mountKey,
          qinggongBonus,
          ridingSkill,
          agility,
        })
      : null

    const typeBadge =
      node.type === 'city'
        ? (node.regime && WORLD_GRAPH.regimeBadge[node.regime]?.label) || '天下名城'
        : node.type === 'sect'
          ? '名山秘境'
          : '战略雄关'

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
              <span className="px-1.5 py-0.5 rounded bg-[#5c4024] text-[#fff8ee] text-[10px]">
                {typeBadge}
              </span>
            </div>
            <div className="text-[11px] text-[#6b5235] mt-0.5">{node.circuit}</div>
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

        {isHere ? (
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
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => startJourney(node.id)}
                className="flex-1 px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] font-bold song-serif shadow transition cursor-pointer"
              >
                策马出发
              </button>
              <button
                type="button"
                onClick={() => enterRegionMap(node.id, true)}
                className="px-2.5 py-1.5 rounded bg-[#efe5d0] hover:bg-[#e2d3b5] border border-[#9e8462] text-[#3d2812] font-semibold song-serif transition cursor-pointer"
              >
                直接入图
              </button>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  // 2) Region or Building Interior Inspector
  const regionNode = NODE_MAP[activeRegionId]
  if (!regionNode) return null

  let targetItem: {
    id: string
    name: string
    tag: string
    desc: string
    actLabel: string
    cost?: number
    effect: Parameters<typeof doBuildingAction>[0]['effect']
    isSpecial: boolean
  } | null = null
  let tierLabel = regionNode.name

  if (
    viewMode === 'building' &&
    activeBuildingInteriorId &&
    BUILDING_PANORAMAS[activeBuildingInteriorId]
  ) {
    const bPano = BUILDING_PANORAMAS[activeBuildingInteriorId]
    tierLabel = bPano.name
    const sp = selectedSpotId ? bPano.spots.find((s) => s.id === selectedSpotId) : null
    if (sp) {
      targetItem = {
        id: sp.id,
        name: sp.name,
        tag: sp.tag,
        desc: sp.desc,
        actLabel: sp.actLabel,
        cost: sp.cost,
        effect: sp.effect,
        isSpecial: true,
      }
    }
  } else {
    const buildings = getRegionAllBuildings(regionNode.id)
    const b = selectedBuildingId ? buildings.find((it) => it.id === selectedBuildingId) : null
    if (b) {
      targetItem = b
    }
  }

  if (!targetItem) return null

  const activeHasSub =
    viewMode === 'region' && targetItem.isSpecial && Boolean(BUILDING_PANORAMAS[targetItem.id])

  return (
    <div
      id="floating-context-card"
      className="absolute bottom-3.5 right-3.5 z-20 w-80 max-h-[68vh] overflow-y-auto scroll-thin bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-md p-3.5 shadow-2xl space-y-2.5 text-xs select-none"
    >
      <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2">
        <div>
          <div className="text-[10px] text-[#6b5235] font-semibold">
            {tierLabel} · {targetItem.tag || '建筑互动'}
          </div>
          <div className="song-serif font-bold text-sm text-[#23180f] mt-0.5">
            {targetItem.isSpecial ? '★ ' : ''}
            {targetItem.name}
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

      <p className="text-[#3d2b19] leading-relaxed">{targetItem.desc}</p>

      {activeHasSub && (
        <button
          type="button"
          onClick={() => enterBuildingMap(targetItem.id)}
          className="w-full px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
        >
          进入【{targetItem.name}】半3D内景 →
        </button>
      )}

      <button
        type="button"
        onClick={() =>
          doBuildingAction({
            name: targetItem.name,
            cost: targetItem.cost,
            effect: targetItem.effect,
          })
        }
        className="w-full px-3 py-2 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
      >
        {targetItem.actLabel}
      </button>

      {actionFeedback && (
        <div
          className={`p-2 rounded bg-[#efe4cc] border border-[#c8b28e] text-xs leading-relaxed ${
            actionFeedback.tone === 'warn'
              ? 'text-[#8f1d14] font-semibold'
              : actionFeedback.tone === 'talk'
                ? 'text-[#523018]'
                : 'text-[#1b5132] font-medium'
          }`}
        >
          {actionFeedback.text}
        </div>
      )}

      {regionNpcs.length > 0 && (
        <div className="pt-2 border-t border-[#cbb693] space-y-1.5">
          <div className="text-[11px] font-bold song-serif text-[#5e472d]">
            在此人物 ({regionNpcs.length})
          </div>
          <div className="space-y-1.5">
            {regionNpcs.map((p) => {
              const matchedPortrait = resolveCharacterByNpcName(p.name)
              return (
                <div
                  key={p.name}
                  className="p-2 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {matchedPortrait?.avatarUrl ? (
                        <img
                          src={matchedPortrait.avatarUrl}
                          alt={p.name}
                          loading="lazy"
                          onLoad={() => {
                            if (matchedPortrait.avatarUrl) {
                              recordAssetLoaded(matchedPortrait.avatarUrl, 58000)
                            }
                          }}
                          className="w-8 h-8 rounded object-cover border border-[#8c6e46] shrink-0 bg-[#2b1d12]"
                        />
                      ) : (
                        <span className="w-8 h-8 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center song-serif font-bold text-xs shrink-0">
                          {p.name.slice(0, 1)}
                        </span>
                      )}
                      <div className="truncate">
                        <div className="font-bold song-serif text-[#23180f] truncate">{p.name}</div>
                        <div className="text-[10px] text-[#6b5235] truncate">{p.title}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dcc9a7] text-[#4a3219] shrink-0">
                      {p.realm}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => interactNpc(p, 'talk')}
                      className="px-2 py-0.5 rounded bg-[#7c4a1e] hover:bg-[#935824] text-[#fff8ee] text-[11px] cursor-pointer"
                    >
                      交谈
                    </button>
                    <button
                      type="button"
                      onClick={() => interactNpc(p, 'art')}
                      className="px-2 py-0.5 rounded bg-[#f8f1e1] hover:bg-[#e5d7bc] border border-[#b59c77] text-[#3d2812] text-[11px] cursor-pointer"
                    >
                      唱和
                    </button>
                    <button
                      type="button"
                      onClick={() => interactNpc(p, 'spar')}
                      className="px-2 py-0.5 rounded bg-[#f8f1e1] hover:bg-[#e5d7bc] border border-[#b59c77] text-[#3d2812] text-[11px] cursor-pointer"
                    >
                      讨教
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
