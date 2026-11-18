import { useMemo } from 'react'
import { filterLivingNpcs, isNpcAbsentFromWorld } from '../../../engine/social/npcDeath'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  getCompiledNpcsByBuilding,
  getCompiledNpcsBySpot,
  resolveRoamingMasterLeafTarget,
} from '../../../data/gameDb'
import { SPOT_SHOPS_BY_SPOT_ID } from '../../../data/spotShops'
import {
  buildNodeNpcFromCompiledRecord,
  buildNodeNpcFromDynamicActor,
  buildRoamingMasterNodeNpc,
} from '../../../engine/npcFactory'
import { getAvailableSpotQuestActions } from '../../../engine/questEngine'
import { useQuestEvalContext } from '../../../hooks/useQuestEvalContext'
import { useGameStore } from '../../../store/useGameStore'
import type { NodeNpc } from '../../../types/game'
import { getBuildingArtTrainingOptions } from '../../../engine/stats/artsProgression'
import {
  isInnBuildingRecord,
  isPlayerInFreeLodgingRegion,
  isTavernBuildingRecord,
} from '../../../engine/stats/heroStats'
import { getRegionAllBuildings, NODE_MAP } from '../../../engine/world/mapMath'
import {
  buildNodeNpcFromKaifengWarrant,
  buildNodeNpcFromLiaoSpy,
  buildNodeNpcFromSectTaskIntel,
  buildNodeNpcFromSectTaskTrainee,
} from '../../../engine/sect'
import {
  buildNodeNpcFromYamenBounty,
  isYamenBountyExpired,
} from '../../../engine/world/yamenBounty'

export interface InspectedTargetSummary {
  id: string
  name: string
  tag: string
  desc: string
  actLabel: string
  cost?: number
  effect: unknown
  isSpecial: boolean
}

export function useInspectorContext() {
  const viewMode = useGameStore((s) => s.viewMode)
  const dayCount = useGameStore((s) => s.dayCount)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const birthplaceId = useGameStore((s) => s.birthplaceId)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const selectedSpotId = useGameStore((s) => s.selectedSpotId)
  const campPos = useGameStore((s) => s.campPos)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const silver = useGameStore((s) => s.silver)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const speedParams = useMemo(
    () => ({ mountKey, qinggongBonus, ridingSkill, agility }),
    [mountKey, qinggongBonus, ridingSkill, agility],
  )
  const inventory = useGameStore((s) => s.inventory)
  const inscribedPoemSpotIds = useGameStore((s) => s.inscribedPoemSpotIds)
  const activeEscortContract = useGameStore((s) => s.activeEscortContract)
  const activeYamenBounty = useGameStore((s) => s.activeYamenBounty)
  const yamenBountyDoneIds = useGameStore((s) => s.yamenBountyDoneIds)
  const roamingMasters = useGameStore((s) => s.roamingMasters)
  const deadNpcIds = useGameStore((s) => s.deadNpcIds)
  const sectState = useGameStore((s) => s.sectState)
  const questState = useGameStore((s) => s.questState)
  const actionFeedback = useGameStore((s) => s.actionFeedback)
  const evalCtx = useQuestEvalContext()

  const currentContextKey = `${viewMode}:${activeRegionId}:${activeBuildingInteriorId ?? ''}:${selectedBuildingId ?? ''}:${selectedSpotId ?? ''}`

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

    const rawLeafNpcs = isLeafInteriorSpot
      ? getCompiledNpcsBySpot(selectedSpotId!)
      : getCompiledNpcsByBuilding(resolvedLeafBuildingId).filter((c) => !c.assignedSpotId)
    const leafNpcs = filterLivingNpcs(rawLeafNpcs, deadNpcIds, questState.flags)

    const talkMap = new Map<string, string>()
    for (const legacyNpc of node.npcs ?? []) {
      const clean = legacyNpc.name.replace(/（.*?）|\(.*?\)/g, '').trim()
      talkMap.set(clean, legacyNpc.talk)
    }

    const combined: NodeNpc[] = []
    const seenNames = new Set<string>()

    const spy = sectState.activeLiaoSpy
    if (spy && spy.regionId === node.id) {
      const spyMatchesLeaf =
        spy.buildingId === resolvedLeafBuildingId && (spy.spotId ?? null) === resolvedLeafSpotId
      if (spyMatchesLeaf) {
        seenNames.add(spy.name)
        combined.push(buildNodeNpcFromLiaoSpy(spy))
      }
    }

    const warrant = sectState.activeKaifengWarrant
    if (
      warrant &&
      warrant.regionId === node.id &&
      warrant.buildingId === resolvedLeafBuildingId &&
      resolvedLeafSpotId === null
    ) {
      seenNames.add(warrant.targetName)
      combined.push(buildNodeNpcFromKaifengWarrant(warrant))
    }

    const bounty = activeYamenBounty
    if (
      bounty &&
      !isYamenBountyExpired(bounty, dayCount) &&
      bounty.regionId === node.id &&
      bounty.buildingId === resolvedLeafBuildingId &&
      resolvedLeafSpotId === null
    ) {
      seenNames.add(bounty.targetName)
      combined.push(buildNodeNpcFromYamenBounty(bounty))
    }

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
      const built = buildRoamingMasterNodeNpc(m, node.name)
      if (!built) continue
      if (isNpcAbsentFromWorld(built.resolvedRecord?.id, deadNpcIds, questState.flags)) continue
      seenNames.add(m.name)
      if (built.resolvedRecord) seenNames.add(built.resolvedRecord.name)
      combined.push(built.npc)
    }

    for (const c of leafNpcs) {
      if (seenNames.has(c.name)) continue
      seenNames.add(c.name)
      combined.push(
        buildNodeNpcFromCompiledRecord(c, {
          talkOverride: talkMap.get(c.name),
        }),
      )
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
    deadNpcIds,
    questState.flags,
    sectState.activeLiaoSpy,
    sectState.activeKaifengWarrant,
    activeYamenBounty,
    dayCount,
    sectState.activeSectTask,
    questState.dynamicActors,
  ])

  const spotQuestActions = useMemo(() => {
    if (!isLeafBuilding || !leafBuildingId) return []
    return getAvailableSpotQuestActions(
      {
        regionId: activeRegionId,
        buildingId: leafBuildingId,
        spotId: leafSpotId,
      },
      evalCtx,
    )
  }, [isLeafBuilding, leafBuildingId, leafSpotId, activeRegionId, evalCtx])

  const regionNode = NODE_MAP[activeRegionId] ?? null
  const activeBldgRecord =
    viewMode === 'building' && activeBuildingInteriorId
      ? (BUILDING_DB_MAP[activeBuildingInteriorId] ?? null)
      : null

  let targetItem: InspectedTargetSummary | null = null
  let tierLabel = regionNode?.name ?? ''
  let singleHallCollapsed = false

  if (regionNode) {
    if (activeBldgRecord && activeBldgRecord.interior) {
      if (activeBldgRecord.interior.spots.length === 0) {
        if (selectedBuildingId !== activeBldgRecord.id) {
          singleHallCollapsed = true
        } else {
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
  }

  const isAtCurrentRegion = currentNodeId === activeRegionId && !campPos
  const showShaolinChorePanel =
    viewMode === 'region' &&
    activeRegionId === 'shaolin' &&
    sectState.shaolinNoviceState === 'active' &&
    !sectState.sectId

  const targetBuildingDb =
    viewMode === 'region' && targetItem ? (BUILDING_DB_MAP[targetItem.id] ?? null) : null
  const activeCanEnter = Boolean(viewMode === 'region' && targetBuildingDb?.interior)
  const targetHasSubSpots = (targetBuildingDb?.interior?.spots.length ?? 0) > 0

  const inspectedRootBldg = activeBldgRecord ?? targetBuildingDb
  const playerFaction = sectState.sectId ? FACTION_DB_MAP[sectState.sectId] : null
  const isOwnSectGrounds = Boolean(
    isAtCurrentRegion &&
      inspectedRootBldg &&
      playerFaction &&
      playerFaction.coreBuildingIds.includes(inspectedRootBldg.id),
  )
  const isInnBldg = isInnBuildingRecord(inspectedRootBldg)
  const isTavernBldg = isTavernBuildingRecord(inspectedRootBldg)
  const isOddJobBldg = isTavernBldg || isInnBldg
  const isInnVenue = Boolean(isAtCurrentRegion && !isOwnSectGrounds && isInnBldg)
  const inOwnSectCity = isPlayerInFreeLodgingRegion(
    currentNodeId,
    campPos,
    sectState.sectId,
    birthplaceId,
  )
  const isBirthplaceCity = Boolean(!campPos && birthplaceId && currentNodeId === birthplaceId)

  const canStudyScripture = Boolean(
    (activeRegionId === 'shaolin' &&
      (activeBuildingInteriorId === 'sl_cangjing' || selectedBuildingId === 'sl_cangjing')) ||
      (activeRegionId === 'nanshaolin' &&
        (selectedSpotId === 'nsl_main_east' ||
          activeBuildingInteriorId === 'nsl_main' ||
          selectedBuildingId === 'nsl_main')),
  )

  const artOptions = useMemo(
    () => (inspectedRootBldg ? getBuildingArtTrainingOptions(inspectedRootBldg) : []),
    [inspectedRootBldg],
  )

  const activeShopId = leafSpotId ?? leafBuildingId
  const activeShop = activeShopId ? SPOT_SHOPS_BY_SPOT_ID[activeShopId] : undefined

  return {
    currentContextKey,
    activeRegionId,
    dayCount,
    regionNode,
    activeBldgRecord,
    singleHallCollapsed,
    targetItem,
    tierLabel,
    isAtCurrentRegion,
    showShaolinChorePanel,
    targetBuildingDb,
    activeCanEnter,
    targetHasSubSpots,
    inspectedRootBldg,
    isOwnSectGrounds,
    isInnVenue,
    isOddJobBldg,
    isTavernBldg,
    inOwnSectCity,
    isBirthplaceCity,
    canStudyScripture,
    artOptions,
    activeShop,
    isLeafBuilding,
    contextNpcs,
    spotQuestActions,
    silver,
    hp,
    maxHp,
    mp,
    maxMp,
    skills,
    speedParams,
    inventory,
    inscribedPoemSpotIds,
    activeEscortContract,
    activeYamenBounty,
    yamenBountyDoneIds,
    sectState,
    actionFeedback,
  }
}
