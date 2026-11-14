import { useMemo, useState } from 'react'
import {
  BUILDING_DB_MAP,
  getCompiledNpcsByBuilding,
  getCompiledNpcsBySpot,
  REGION_DB_MAP,
  resolveNpcByName,
  resolveRoamingMasterLeafTarget,
  TEN_ART_KEYS,
} from '../../data/gameDb'
import { useGameStore } from '../../store/useGameStore'
import type {
  NodeNpc,
  NpcCombatStats,
  NpcTalents,
  NpcTenArts,
  RoamingMaster,
} from '../../types/game'
import {
  findBestRoute,
  getRegionAllBuildings,
  NODE_MAP,
  WORLD_GRAPH,
} from '../../utils/mapMath'
import { ManagedAssetImg } from '../common/ManagedAssetImg'

function buildRoamingFallbackStats(m: RoamingMaster): {
  stats: NpcCombatStats
  talents: NpcTalents
  tenArts: NpcTenArts
} {
  const isHeaven = m.realm.includes('天阶')
  return {
    stats: isHeaven
      ? { hp: 7200, mp: 6800, agi: 84, res: 76, isBenchmark: true }
      : { hp: 4600, mp: 4200, agi: 76, res: 66, isBenchmark: true },
    talents: isHeaven
      ? { bone: 86, comprehension: 88, charm: 74 }
      : { bone: 78, comprehension: 79, charm: 68 },
    tenArts: {
      骑术: 76,
      算术: 48,
      经义: m.sect.includes('寺') || m.sect.includes('少林') ? 82 : 54,
      策论: 52,
      诗词: 46,
      琴: 42,
      棋: 55,
      书: 48,
      画: 40,
      辩才: 64,
    },
  }
}

export function ContextInspectorCard() {
  const viewMode = useGameStore((s) => s.viewMode)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const selectedNodeId = useGameStore((s) => s.selectedNodeId)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const selectedSpotId = useGameStore((s) => s.selectedSpotId)
  const traveling = useGameStore((s) => s.traveling)
  const campPos = useGameStore((s) => s.campPos)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const agility = useGameStore((s) => s.agility)
  const roamingMasters = useGameStore((s) => s.roamingMasters)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const selectRegionBuilding = useGameStore((s) => s.selectRegionBuilding)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const enterBuildingMap = useGameStore((s) => s.enterBuildingMap)
  const startJourney = useGameStore((s) => s.startJourney)
  const doBuildingAction = useGameStore((s) => s.doBuildingAction)
  const interactNpc = useGameStore((s) => s.interactNpc)
  const openNpcInteraction = useGameStore((s) => s.openNpcInteraction)
  const openNpcDetailInCompendium = useGameStore((s) => s.openNpcDetailInCompendium)

  const currentContextKey = `${viewMode}:${activeRegionId}:${activeBuildingInteriorId ?? ''}:${selectedBuildingId ?? ''}:${selectedSpotId ?? ''}`
  const [expandedEntry, setExpandedEntry] = useState<{
    contextKey: string
    npcKey: string
  } | null>(null)

  // Strict Leaf-Only NPC Resolution:
  // Players ONLY encounter NPCs when at the deepest leaf level:
  // 1) A base building in `region` view that cannot be entered (`interior === null`)
  // 2) Inside a single-hall enterable building (`viewMode === 'building'` with `spots.length === 0`, e.g. city taverns & inns)
  // 3) A specific sub-building spot (`selectedSpotId`) inside a multi-spot `building` interior view
  const { isLeafBuilding, contextNpcs } = useMemo<{
    isLeafBuilding: boolean
    contextNpcs: NodeNpc[]
  }>(() => {
    const node = NODE_MAP[activeRegionId]
    if (!node) return { isLeafBuilding: false, contextNpcs: [] }

    const activeInterior = activeBuildingInteriorId
      ? (BUILDING_DB_MAP[activeBuildingInteriorId]?.interior ?? null)
      : null

    const isLeafBaseBuilding =
      viewMode === 'region' &&
      Boolean(selectedBuildingId) &&
      BUILDING_DB_MAP[selectedBuildingId ?? '']?.interior === null

    const isLeafSingleHallInterior =
      viewMode === 'building' &&
      Boolean(activeBuildingInteriorId) &&
      Boolean(activeInterior) &&
      activeInterior!.spots.length === 0

    const isLeafInteriorSpot =
      viewMode === 'building' &&
      Boolean(activeBuildingInteriorId) &&
      Boolean(activeInterior) &&
      activeInterior!.spots.length > 0 &&
      Boolean(selectedSpotId)

    if (!isLeafBaseBuilding && !isLeafSingleHallInterior && !isLeafInteriorSpot) {
      return { isLeafBuilding: false, contextNpcs: [] }
    }

    const leafBuildingId = isLeafSingleHallInterior
      ? activeBuildingInteriorId!
      : selectedBuildingId!

    const leafNpcs = isLeafInteriorSpot
      ? getCompiledNpcsBySpot(selectedSpotId!)
      : getCompiledNpcsByBuilding(leafBuildingId).filter((c) => !c.assignedSpotId)

    // Handcrafted custom talk lines from worldGraph if present
    const talkMap = new Map<string, string>()
    for (const legacyNpc of node.npcs ?? []) {
      const clean = legacyNpc.name.replace(/（.*?）|\(.*?\)/g, '').trim()
      talkMap.set(clean, legacyNpc.talk)
    }

    const combined: NodeNpc[] = []
    const seenNames = new Set<string>()

    // Only include roaming masters whose exact leaf target matches this leaf building/spot
    const roamingAtThisLeaf = roamingMasters.filter((m) => {
      if (m.nodeId !== node.id) return false
      const target = resolveRoamingMasterLeafTarget(m)
      if (!target) return false
      if (isLeafInteriorSpot) {
        return (
          target.buildingId === activeBuildingInteriorId && target.spotId === selectedSpotId
        )
      }
      return target.buildingId === leafBuildingId && target.spotId === null
    })

    for (const m of roamingAtThisLeaf) {
      const resolved =
        resolveNpcByName(m.name) ?? resolveNpcByName(m.name.replace(/大师$/, ''))
      const fb = buildRoamingFallbackStats(m)
      seenNames.add(m.name)
      if (resolved) seenNames.add(resolved.name)
      combined.push({
        id: resolved?.id,
        name: m.name,
        title: `${m.sect} · 游历暂驻`,
        realm: m.realm,
        avatarUrl: resolved?.avatarUrl,
        factionName: m.sect,
        stats: resolved?.stats ?? fb.stats,
        talents: resolved?.talents ?? fb.talents,
        tenArts: resolved?.tenArts ?? fb.tenArts,
        fullLocationLabel: resolved?.fullLocationLabel,
        talk: `“某近日游历至${node.name}，暂歇于此，幸晤少侠，当浮一大白！”`,
      })
    }

    for (const c of leafNpcs) {
      if (seenNames.has(c.name)) continue
      seenNames.add(c.name)
      const customTalk = talkMap.get(c.name)
      const placeShort = c.assignedSpotName
        ? `${c.assignedBuildingName}·${c.assignedSpotName}`
        : c.assignedBuildingName
      combined.push({
        id: c.id,
        name: c.name,
        title: `${c.factionName} · ${c.role}`,
        realm: c.realm,
        avatarUrl: c.avatarUrl,
        factionName: c.factionName,
        stats: c.stats,
        talents: c.talents,
        tenArts: c.tenArts,
        fullLocationLabel: c.fullLocationLabel,
        talk:
          customTalk ??
          `“在下${c.name}（${c.title}），常驻${c.locationLabel}【${placeShort}】，少侠若有暇不妨切磋论道。”`,
      })
    }

    return {
      isLeafBuilding: true,
      contextNpcs: combined,
    }
  }, [
    activeRegionId,
    viewMode,
    activeBuildingInteriorId,
    selectedBuildingId,
    selectedSpotId,
    roamingMasters,
  ])

  // 1) World Map Node Inspector
  if (viewMode === 'world') {
    if (!selectedNodeId || traveling) return null
    const node = NODE_MAP[selectedNodeId]
    if (!node) return null

    const isHere = currentNodeId === node.id && !campPos
    const route = !isHere
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
              <span className="px-1.5 py-0.5 rounded bg-[#5c4024] text-[#fff8ee] text-[10px]">
                {typeBadge}
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

  const activeBldgRecord =
    viewMode === 'building' && activeBuildingInteriorId
      ? BUILDING_DB_MAP[activeBuildingInteriorId]
      : null

  if (activeBldgRecord && activeBldgRecord.interior) {
    if (activeBldgRecord.interior.spots.length === 0) {
      if (selectedBuildingId !== activeBldgRecord.id) {
        return (
          <div className="absolute bottom-3.5 right-3.5 z-20 select-none">
            <button
              type="button"
              onClick={() => selectRegionBuilding(activeBldgRecord.id)}
              className="px-3.5 py-2 rounded-md bg-[#f8f1e1] hover:bg-[#efe3c8] text-[#23180f] border-2 border-[#6e5233] shadow-xl text-xs font-bold song-serif flex items-center gap-2 transition cursor-pointer"
            >
              <span className="text-[#8f1d14]">▣</span>
              <span>
                展开【{activeBldgRecord.name}】堂内交互与人物（{contextNpcs.length}人）
              </span>
            </button>
          </div>
        )
      }
      tierLabel = regionNode.name
      targetItem = {
        id: activeBldgRecord.id,
        name: activeBldgRecord.name,
        tag: activeBldgRecord.tag,
        desc: activeBldgRecord.desc,
        actLabel: activeBldgRecord.actLabel,
        cost: activeBldgRecord.cost,
        effect: activeBldgRecord.effect,
        isSpecial: activeBldgRecord.isSpecial,
      }
    } else {
      tierLabel = activeBldgRecord.name
      const sp = selectedSpotId
        ? activeBldgRecord.interior.spots.find((s) => s.id === selectedSpotId)
        : null
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
    }
  } else {
    const buildings = getRegionAllBuildings(regionNode.id)
    const b = selectedBuildingId ? buildings.find((it) => it.id === selectedBuildingId) : null
    if (b) {
      targetItem = b
    }
  }

  if (!targetItem) return null

  const targetBuildingDb = viewMode === 'region' ? BUILDING_DB_MAP[targetItem.id] : null
  const activeCanEnter = Boolean(viewMode === 'region' && targetBuildingDb?.interior)
  const targetHasSubSpots = (targetBuildingDb?.interior?.spots.length ?? 0) > 0

  return (
    <div
      id="floating-context-card"
      className="absolute bottom-3.5 right-3.5 z-20 w-80 sm:w-[356px] max-h-[72vh] overflow-y-auto scroll-thin bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-md p-3.5 shadow-2xl space-y-2.5 text-xs select-none"
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

      {activeCanEnter && (
        <button
          type="button"
          onClick={() => enterBuildingMap(targetItem.id)}
          className="w-full px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
        >
          进入【{targetItem.name}】
          {targetBuildingDb?.interior?.mode === 'image'
            ? '半3D实景'
            : targetHasSubSpots
              ? '宋式内院'
              : '市井大堂'}{' '}
          →
        </button>
      )}

      {!activeCanEnter && (
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
      )}

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

      {!isLeafBuilding ? (
        <div className="pt-2 border-t border-[#cbb693] text-[11px] text-[#6b5235] leading-relaxed">
          {targetHasSubSpots ? (
            <>
              此建筑内设多处殿宇/子建筑（院内共驻{' '}
              <strong className="text-[#8f1d14]">
                {targetBuildingDb?.residentNpcIds.length ?? 0}
              </strong>{' '}
              人），请步入内院并点选最末层子建筑寻访常驻人物。
            </>
          ) : (
            <>
              此建筑为可步入的市井独堂实景（堂内共驻{' '}
              <strong className="text-[#8f1d14]">
                {targetBuildingDb?.residentNpcIds.length ?? 0}
              </strong>{' '}
              人，内无子建筑），请步入大堂互动与寻访人物。
            </>
          )}
        </div>
      ) : contextNpcs.length === 0 ? (
        <div className="pt-2 border-t border-[#cbb693] text-[11px] text-[#6b5235]">
          此殿宇/铺舍当前暂无常驻人物。
        </div>
      ) : (
        <div className="pt-2 border-t border-[#cbb693] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold song-serif text-[#5e472d]">
              本处驻留人物 ({contextNpcs.length} 人)
            </span>
            <span className="text-[10px] text-[#7a5f3e]">最末层建筑实景交互</span>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto scroll-thin pr-0.5">
            {contextNpcs.map((p) => {
              const npcKey = p.id ?? p.name
              const isExpanded =
                expandedEntry?.contextKey === currentContextKey &&
                expandedEntry.npcKey === npcKey
              return (
                <div
                  key={npcKey}
                  className="p-2 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5"
                >
                  <button
                    type="button"
                    onClick={() => openNpcInteraction(p)}
                    title={`点击与【${p.name}】交互`}
                    className="w-full text-left flex items-center justify-between gap-2 p-1 -m-1 rounded hover:bg-[#e4d3b0] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {p.avatarUrl ? (
                        <ManagedAssetImg
                          url={p.avatarUrl}
                          alt={p.name}
                          viewportLazy
                          className="w-8 h-8 rounded object-cover border border-[#8c6e46] shrink-0 bg-[#2b1d12]"
                        />
                      ) : (
                        <span className="w-8 h-8 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center song-serif font-bold text-xs shrink-0">
                          {p.name.slice(0, 1)}
                        </span>
                      )}
                      <div className="truncate">
                        <div className="font-bold song-serif text-[#23180f] truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-[#6b5235] truncate">{p.title}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dcc9a7] text-[#4a3219] shrink-0">
                      {p.realm}
                    </span>
                  </button>

                  {/* 紧凑属性速览条（四维 + 先天三维） */}
                  {p.stats && p.talents && (
                    <div className="px-1.5 py-1 rounded bg-[#faf3e3] border border-[#d6c3a1] text-[10px] font-mono text-[#4a3219] flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
                      <span>
                        血<strong className="text-[#8f1d14]">{p.stats.hp}</strong> 内
                        <strong className="text-[#1d473a]">{p.stats.mp}</strong> 身
                        <strong>{p.stats.agi}</strong> 抗<strong>{p.stats.res}</strong>
                      </span>
                      <span className="text-[#6b5235]">
                        根<strong className="text-[#23180f]">{p.talents.bone}</strong> 悟
                        <strong className="text-[#23180f]">{p.talents.comprehension}</strong> 颜
                        <strong className="text-[#23180f]">{p.talents.charm}</strong>
                      </span>
                    </div>
                  )}

                  {/* 展开完整三维 + 四维 + 十艺百工数值 */}
                  {isExpanded && p.stats && p.talents && p.tenArts && (
                    <div className="p-2 rounded bg-[#faf3e3] border border-[#cbb693] space-y-1.5 text-[10px]">
                      <div className="grid grid-cols-4 gap-1 text-center font-mono">
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">气血</span>
                          <strong className="text-[#8f1d14]">{p.stats.hp}</strong>
                        </div>
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">内力</span>
                          <strong className="text-[#1d473a]">{p.stats.mp}</strong>
                        </div>
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">身法</span>
                          <strong>{p.stats.agi}</strong>
                        </div>
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">抗性</span>
                          <strong>{p.stats.res}</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-center font-mono">
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">先天根骨</span>
                          <strong className="text-[#781710]">{p.talents.bone}</strong>
                        </div>
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">先天悟性</span>
                          <strong className="text-[#1f4d3b]">{p.talents.comprehension}</strong>
                        </div>
                        <div className="bg-[#efe4cc] rounded py-0.5">
                          <span className="text-[#6b5235] block text-[9px]">风姿颜值</span>
                          <strong className="text-[#6d3b1a]">{p.talents.charm}</strong>
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-semibold text-[#6b5235] mb-1">
                          十艺百工（骑 / 算 / 经 / 策 / 词 / 琴 / 棋 / 书 / 画 / 辩）
                        </div>
                        <div className="grid grid-cols-5 gap-1 text-center font-mono">
                          {TEN_ART_KEYS.map((artKey) => {
                            const val = p.tenArts?.[artKey] ?? 0
                            return (
                              <div
                                key={artKey}
                                className={`rounded py-0.5 border ${
                                  val >= 80
                                    ? 'bg-[#f4e1c1] border-[#c58b38] text-[#781710] font-bold'
                                    : 'bg-[#efe4cc]/70 border-[#dcc9a7] text-[#3d2b19]'
                                }`}
                              >
                                <span className="block text-[9px] text-[#6b5235] font-sans">
                                  {artKey}
                                </span>
                                <span>{val}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-1">
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
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedEntry(
                          isExpanded ? null : { contextKey: currentContextKey, npcKey },
                        )
                      }
                      className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                        isExpanded
                          ? 'bg-[#5c4024] text-[#fff8ee] border-[#5c4024]'
                          : 'bg-[#f8f1e1] hover:bg-[#e5d7bc] border-[#b59c77] text-[#3d2812]'
                      }`}
                    >
                      {isExpanded ? '收起属性' : '十艺详值'}
                    </button>
                    {p.id && (
                      <button
                        type="button"
                        onClick={() => openNpcDetailInCompendium(p.id!)}
                        className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d1b0] border border-[#9e7b47] text-[#781710] text-[11px] font-medium cursor-pointer ml-auto"
                      >
                        图鉴立绘
                      </button>
                    )}
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
