import { useMemo, useState } from 'react'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  getCompiledNpcsByBuilding,
  getCompiledNpcsBySpot,
  REGION_DB_MAP,
  resolveNpcByName,
  resolveRoamingMasterLeafTarget,
  TEN_ART_KEYS,
} from '../../data/gameDb'
import {
  buildNodeNpcFromDynamicActor,
  getAvailableSpotQuestActions,
} from '../../engine/questEngine'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { SPOT_SHOPS_BY_SPOT_ID } from '../../data/spotShops'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import type {
  NodeNpc,
  NpcCombatStats,
  NpcTalents,
  NpcTenArts,
  RoamingMaster,
} from '../../types/game'
import {
  DAILY_INN_LODGING_COST,
  isInnBuildingRecord,
  isPlayerInOwnSectRegion,
} from '../../utils/heroStats'
import {
  findBestRoute,
  getRegionAllBuildings,
  NODE_MAP,
  WORLD_GRAPH,
} from '../../utils/mapMath'
import {
  buildNodeNpcFromLiaoSpy,
  buildNodeNpcFromSectTaskIntel,
  buildNodeNpcFromSectTaskTrainee,
} from '../../utils/sectMechanics'
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
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
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
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const baseStats = useGameStore((s) => s.baseStats)
  const skills = useGameStore((s) => s.skills)
  const inventory = useGameStore((s) => s.inventory)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const npcFavor = useGameStore((s) => s.npcFavor)
  const roamingMasters = useGameStore((s) => s.roamingMasters)
  const sectState = useGameStore((s) => s.sectState)
  const questState = useGameStore((s) => s.questState)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const selectRegionBuilding = useGameStore((s) => s.selectRegionBuilding)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const enterBuildingMap = useGameStore((s) => s.enterBuildingMap)
  const startJourney = useGameStore((s) => s.startJourney)
  const doBuildingAction = useGameStore((s) => s.doBuildingAction)
  const buySpotShopItem = useGameStore((s) => s.buySpotShopItem)
  const runQuestEffects = useGameStore((s) => s.runQuestEffects)
  const interactNpc = useGameStore((s) => s.interactNpc)
  const startNpcCombat = useGameStore((s) => s.startNpcCombat)
  const openNpcInteraction = useGameStore((s) => s.openNpcInteraction)
  const openNpcDetailInCompendium = useGameStore((s) => s.openNpcDetailInCompendium)
  const openMenu = useGameStore((s) => s.openMenu)

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
  const { isLeafBuilding, leafBuildingId, leafSpotId, contextNpcs } = useMemo<{
    isLeafBuilding: boolean
    leafBuildingId: string | null
    leafSpotId: string | null
    contextNpcs: NodeNpc[]
  }>(() => {
    const node = NODE_MAP[activeRegionId]
    if (!node) {
      return { isLeafBuilding: false, leafBuildingId: null, leafSpotId: null, contextNpcs: [] }
    }

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
      return { isLeafBuilding: false, leafBuildingId: null, leafSpotId: null, contextNpcs: [] }
    }

    const resolvedLeafBuildingId = isLeafInteriorSpot
      ? activeBuildingInteriorId!
      : isLeafSingleHallInterior
        ? activeBuildingInteriorId!
        : selectedBuildingId!
    const resolvedLeafSpotId = isLeafInteriorSpot ? selectedSpotId! : null

    const leafNpcs = isLeafInteriorSpot
      ? getCompiledNpcsBySpot(selectedSpotId!)
      : getCompiledNpcsByBuilding(resolvedLeafBuildingId).filter((c) => !c.assignedSpotId)

    // Handcrafted custom talk lines from worldGraph if present
    const talkMap = new Map<string, string>()
    for (const legacyNpc of node.npcs ?? []) {
      const clean = legacyNpc.name.replace(/（.*?）|\(.*?\)/g, '').trim()
      talkMap.set(clean, legacyNpc.talk)
    }

    const combined: NodeNpc[] = []
    const seenNames = new Set<string>()

    // Dynamic annual Liao Spy spawned for Changshan Spear Sect (SECT-22)
    const spy = sectState.activeLiaoSpy
    if (spy && spy.regionId === node.id) {
      const spyMatchesLeaf =
        spy.buildingId === resolvedLeafBuildingId && (spy.spotId ?? null) === resolvedLeafSpotId
      if (spyMatchesLeaf) {
        seenNames.add(spy.name)
        combined.push(buildNodeNpcFromLiaoSpy(spy))
      }
    }

    // Dynamic Sect Task temporary NPC (gather_intel informant or temporary martial_coaching trainee)
    const sectTask = sectState.activeSectTask
    if (
      sectTask &&
      !sectTask.completedStep &&
      sectTask.regionId === node.id &&
      sectTask.buildingId === resolvedLeafBuildingId &&
      (sectTask.spotId ?? null) === resolvedLeafSpotId
    ) {
      if (sectTask.kind === 'gather_intel') {
        const intelNpc = buildNodeNpcFromSectTaskIntel(sectTask)
        seenNames.add(intelNpc.name)
        combined.push(intelNpc)
      } else if (sectTask.kind === 'martial_coaching' && sectTask.traineeIsTemp) {
        const traineeNpc = buildNodeNpcFromSectTaskTrainee(sectTask)
        seenNames.add(traineeNpc.name)
        combined.push(traineeNpc)
      }
    }

    // Dynamic Quest Actors spawned by declarative QuestEffect ('spawnDynamicActor')
    for (const dynActor of questState.dynamicActors) {
      if (dynActor.regionId !== node.id) continue
      const matchesLeaf =
        dynActor.buildingId === resolvedLeafBuildingId &&
        (dynActor.spotId ?? null) === resolvedLeafSpotId
      if (matchesLeaf) {
        seenNames.add(dynActor.name)
        combined.push(buildNodeNpcFromDynamicActor(dynActor))
      }
    }

    // Only include roaming masters whose exact leaf target matches this leaf building/spot
    const roamingAtThisLeaf = roamingMasters.filter((m) => {
      if (m.nodeId !== node.id) return false
      const target = resolveRoamingMasterLeafTarget(m)
      if (!target) return false
      return (
        target.buildingId === resolvedLeafBuildingId &&
        (target.spotId ?? null) === resolvedLeafSpotId
      )
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
        avatarUrl: resolved?.avatarUrl ?? resolved?.templateAvatarUrl,
        factionId: resolved?.factionId,
        factionName: m.sect,
        sectRank: resolved?.sectRank,
        sectRankLabel: resolved?.sectRankLabel,
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
        avatarUrl: c.avatarUrl ?? c.templateAvatarUrl,
        factionId: c.factionId,
        factionName: c.factionName,
        sectRank: c.sectRank,
        sectRankLabel: c.sectRankLabel,
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
      leafBuildingId: resolvedLeafBuildingId,
      leafSpotId: resolvedLeafSpotId,
      contextNpcs: combined,
    }
  }, [
    activeRegionId,
    viewMode,
    activeBuildingInteriorId,
    selectedBuildingId,
    selectedSpotId,
    roamingMasters,
    sectState.activeLiaoSpy,
    sectState.activeSectTask,
    questState.dynamicActors,
  ])

  const spotQuestActions = useMemo(() => {
    if (!isLeafBuilding || !leafBuildingId) return []
    const evalCtx = buildStoreEvalContext({
      dayCount,
      shichenIdx,
      silver,
      food,
      hp,
      maxHp,
      mp,
      maxMp,
      agility,
      res,
      baseStats,
      skills,
      inventory,
      learnedArts,
      npcFavor,
      sectState,
      questState,
    })
    return getAvailableSpotQuestActions(
      {
        regionId: activeRegionId,
        buildingId: leafBuildingId,
        spotId: leafSpotId,
      },
      evalCtx,
    )
  }, [
    isLeafBuilding,
    leafBuildingId,
    leafSpotId,
    activeRegionId,
    dayCount,
    shichenIdx,
    silver,
    food,
    hp,
    maxHp,
    mp,
    maxMp,
    agility,
    res,
    baseStats,
    skills,
    inventory,
    learnedArts,
    npcFavor,
    sectState,
    questState,
  ])

  // 1) World Map Node Inspector (or Wilderness Camp Inspector)
  if (viewMode === 'world') {
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

  const inspectedRootBldg = activeBldgRecord ?? targetBuildingDb
  const playerFaction = sectState.sectId ? FACTION_DB_MAP[sectState.sectId] : null
  const isAtCurrentRegion = currentNodeId === activeRegionId && !campPos
  const isOwnSectGrounds = Boolean(
    isAtCurrentRegion &&
      inspectedRootBldg &&
      playerFaction &&
      playerFaction.coreBuildingIds.includes(inspectedRootBldg.id),
  )
  const isInnVenue = Boolean(
    isAtCurrentRegion && !isOwnSectGrounds && isInnBuildingRecord(inspectedRootBldg),
  )
  const inOwnSectCity = isPlayerInOwnSectRegion(currentNodeId, campPos, sectState.sectId)

  return (
    <div
      id="floating-context-card"
      className="absolute bottom-3.5 right-3.5 z-20 w-[min(92vw,700px)] max-h-[84vh] overflow-y-auto scroll-thin bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-lg p-5 shadow-2xl space-y-3.5 text-sm select-none"
    >
      <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-3">
        <div>
          <div className="text-xs text-[#6b5235] font-semibold">
            {tierLabel} · {targetItem.tag || '建筑互动'}
          </div>
          <div className="song-serif font-bold text-lg text-[#23180f] mt-0.5">
            {targetItem.isSpecial ? '★ ' : ''}
            {targetItem.name}
          </div>
        </div>
        <button
          type="button"
          onClick={clearFloatingSelection}
          className="px-2.5 py-1 rounded hover:bg-[#e5d7bc] text-[#5e472d] text-base font-bold cursor-pointer"
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

      {spotQuestActions.length > 0 && (
        <div className="p-2.5 rounded-md bg-[#f5e7cb] border-2 border-[#b58742] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold song-serif text-[#781710]">
            <span>★ 剧情机缘与宗门试炼 ({spotQuestActions.length})</span>
            <span className="text-[10px] font-sans text-[#6b5235]">驻地奇遇</span>
          </div>
          <div className="space-y-1.5">
            {spotQuestActions.map((qa) => {
              const toneCls =
                qa.action.tone === 'danger'
                  ? 'bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] border-[#e69d8f]'
                  : qa.action.tone === 'jade'
                    ? 'bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff8eb] border-[#8fc7ae]'
                    : qa.action.tone === 'gold'
                      ? 'bg-[#6b4614] hover:bg-[#825518] text-[#fff8eb] border-[#e6c27a]'
                      : 'bg-[#5c3d1e] hover:bg-[#734c26] text-[#fff8eb] border-[#cbb693]'
              return (
                <div key={`${qa.quest.id}:${qa.action.id}`} className="space-y-1">
                  <button
                    type="button"
                    disabled={!qa.enabled}
                    onClick={() => {
                      if (!qa.enabled) return
                      runQuestEffects(qa.action.effects, null)
                    }}
                    className={`w-full px-3 py-2 rounded border text-xs font-bold song-serif shadow transition flex items-center justify-between gap-2 ${
                      qa.enabled
                        ? `${toneCls} cursor-pointer`
                        : 'bg-[#b5a58d] text-[#f5eedf] border-[#9c8c74] cursor-not-allowed opacity-80'
                    }`}
                  >
                    <span className="truncate">{qa.action.label}</span>
                    {qa.action.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-black/25 text-[10px] font-sans shrink-0">
                        {qa.action.badge}
                      </span>
                    )}
                  </button>
                  {!qa.enabled && qa.disabledReason && (
                    <div className="text-[11px] text-[#8f1d14] px-1">
                      🔒 {qa.disabledReason}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {(isOwnSectGrounds || isInnVenue) && (
        <button
          type="button"
          onClick={() => openMenu('loadout')}
          className="w-full px-3 py-2 rounded bg-[#5c3d1e] hover:bg-[#734c26] border border-[#c89d54]/70 text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
        >
          {isOwnSectGrounds
            ? '在此发起闭关修炼（师门演武场 · 效率 125% · 免宿费）→'
            : `在此发起闭关修炼（客栈闭关 · 效率 100% · ${
                inOwnSectCity ? '师门驻地免宿费' : `${DAILY_INN_LODGING_COST} 两/日`
              }）→`}
        </button>
      )}

      {(() => {
        const activeShop = leafSpotId ? SPOT_SHOPS_BY_SPOT_ID[leafSpotId] : undefined
        if (!activeShop) return null
        const reqSectName = activeShop.requiredSectId
          ? (FACTION_DB_MAP[activeShop.requiredSectId]?.name ?? activeShop.requiredSectId)
          : null
        const sectEligible = !activeShop.requiredSectId || sectState.sectId === activeShop.requiredSectId
        const shopRegName = NODE_MAP[activeShop.regionId]?.name ?? activeShop.regionId
        const canTradeHere = isAtCurrentRegion && sectEligible

        return (
          <div className="p-2.5 rounded-md bg-[#f5e7cb] border-2 border-[#b58742] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold song-serif text-[#781710]">
                  ⚖ {activeShop.title}
                </div>
                <div className="text-[10px] text-[#6b5235]">{activeShop.subtitle}</div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#6b4614] shrink-0">
                现银 {silver} 两
              </span>
            </div>

            {!isAtCurrentRegion && (
              <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
                🔒 须亲临【{shopRegName}】方可在此采办交易
              </div>
            )}
            {isAtCurrentRegion && !sectEligible && reqSectName && (
              <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
                🔒 内部甲仗重地，仅限【{reqSectName}】弟子/成员购置
              </div>
            )}

            <div className="space-y-1.5 max-h-60 overflow-y-auto scroll-thin pr-0.5">
              {activeShop.items.map((entry) => {
                const def = ITEM_DB_MAP[entry.itemId]
                if (!def) return null
                const ownedQty =
                  inventory.find((st) => st.itemId === entry.itemId)?.qty ?? 0
                const affordable = silver >= entry.price
                const btnEnabled = canTradeHere && affordable
                const mnt = def.mountMeta
                const bonusParts: string[] = []
                if (mnt) {
                  bonusParts.push(`脚力${mnt.baseSpeed}`)
                  bonusParts.push(`${mnt.terrainTrait}+${mnt.terrainBonusPct}%`)
                } else if (def.equipBonus) {
                  if (def.equipBonus.attack) bonusParts.push(`攻+${def.equipBonus.attack}`)
                  if (def.equipBonus.defense) bonusParts.push(`防+${def.equipBonus.defense}`)
                  if (def.equipBonus.maxHp) bonusParts.push(`血+${def.equipBonus.maxHp}`)
                  if (def.equipBonus.maxMp) bonusParts.push(`内+${def.equipBonus.maxMp}`)
                  if (def.equipBonus.agility) bonusParts.push(`身+${def.equipBonus.agility}`)
                  if (def.equipBonus.res) bonusParts.push(`抗+${def.equipBonus.res}`)
                }
                return (
                  <div
                    key={entry.itemId}
                    className="flex items-center justify-between gap-2 p-2 rounded bg-[#faf3e3] border border-[#cbb693]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold song-serif text-xs text-[#23180f]">
                          {def.name}
                        </span>
                        {ownedQty > 0 && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[#1f4d3b]/15 text-[#1f4d3b] font-mono">
                            已藏×{ownedQty}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#6b5235] truncate">
                        {entry.note ?? def.subType}
                        {bonusParts.length > 0 ? ` · ${bonusParts.join(' ')}` : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={!btnEnabled}
                      onClick={() => buySpotShopItem(activeShop.spotId, entry.itemId)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold song-serif shrink-0 transition ${
                        btnEnabled
                          ? 'bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] cursor-pointer shadow-sm'
                          : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                      }`}
                    >
                      {entry.price} 两购置
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

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
                  onClick={() => openNpcInteraction(p)}
                  title={`点击拜会【${p.name}】`}
                  className="p-2 rounded bg-[#efe4cc] hover:bg-[#e8d9bb] border border-[#c8b28e] hover:border-[#9e7b47] transition-colors space-y-1.5 cursor-pointer"
                >
                  <div className="w-full text-left flex items-center justify-between gap-2">
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
                        <div className="font-bold song-serif text-[#23180f] truncate flex items-center gap-1">
                          <span className="truncate">{p.name}</span>
                          {p.isDynamicLiaoSpy && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#8f1d14] text-[#fff8ee] font-sans shrink-0">
                              军令必诛
                            </span>
                          )}
                          {p.questBadgeLabel && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#781710] text-[#fff8ee] font-sans shrink-0">
                              {p.questBadgeLabel}
                            </span>
                          )}
                          {!p.isDynamicLiaoSpy && p.sectRankLabel && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#e5d3b3] text-[#5c3d1e] font-sans shrink-0">
                              {p.sectRankLabel}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#6b5235] truncate">{p.title}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dcc9a7] text-[#4a3219] shrink-0">
                      {p.realm}
                    </span>
                  </div>

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

                  <div
                    className="flex flex-wrap items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => openNpcInteraction(p)}
                      className="px-2 py-0.5 rounded bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] text-[11px] font-medium cursor-pointer"
                    >
                      拜会交互
                    </button>
                    {p.isDynamicLiaoSpy ? (
                      <button
                        type="button"
                        onClick={() => startNpcCombat(p, 'duel', 'liao_spy_duel')}
                        className="px-2 py-0.5 rounded bg-[#a11b12] hover:bg-[#be2217] border border-[#f2b98a] text-[#fff8ee] text-[11px] font-bold cursor-pointer"
                      >
                        生死诛谍
                      </button>
                    ) : (
                      <>
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
                          切磋
                        </button>
                      </>
                    )}
                    {!p.isDynamicLiaoSpy && p.tenArts && (
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
                    )}
                    {p.id && !p.isDynamicLiaoSpy && !p.dynamicQuestActorId && (
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
