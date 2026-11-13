import rawBuildings from './buildings.json'
import rawIdRegistry from './idRegistry.json'
import rawMartialArts from './martial_arts.json'
import rawNpcs from './npcs.json'
import rawRegions from './regions.json'
import type {
  CanonicalFactionEntry,
  CanonicalIdRegistry,
  CompiledBuildingRecord,
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  CompiledRegionRecord,
  RoamingMaster,
  TenArtKey,
} from '../types/game'

export const TEN_ART_KEYS: readonly TenArtKey[] = [
  '骑术',
  '算术',
  '经义',
  '策论',
  '诗词',
  '琴',
  '棋',
  '书',
  '画',
  '辩才',
]

export const ID_REGISTRY = rawIdRegistry as unknown as CanonicalIdRegistry
export const REGIONS_DB = rawRegions as unknown as CompiledRegionRecord[]
export const BUILDINGS_DB = rawBuildings as unknown as CompiledBuildingRecord[]
export const MARTIAL_ARTS_DB = rawMartialArts as unknown as CompiledMartialArtRecord[]
export const NPCS_DB = rawNpcs as unknown as CompiledNpcRecord[]

export const REGION_DB_MAP: Record<string, CompiledRegionRecord> = Object.fromEntries(
  REGIONS_DB.map((r) => [r.id, r]),
)

export const BUILDING_DB_MAP: Record<string, CompiledBuildingRecord> = Object.fromEntries(
  BUILDINGS_DB.map((b) => [b.id, b]),
)

export const MARTIAL_ART_DB_MAP: Record<string, CompiledMartialArtRecord> = Object.fromEntries(
  MARTIAL_ARTS_DB.map((m) => [m.id, m]),
)

export const NPC_DB_MAP: Record<string, CompiledNpcRecord> = Object.fromEntries(
  NPCS_DB.map((n) => [n.id, n]),
)

export const FACTION_DB_MAP: Record<string, CanonicalFactionEntry> = Object.fromEntries(
  ID_REGISTRY.factions.map((f) => [f.id, f]),
)

const npcByCleanName = new Map<string, CompiledNpcRecord>()
const npcsByRegionId = new Map<string, CompiledNpcRecord[]>()
const npcsByBuildingId = new Map<string, CompiledNpcRecord[]>()
const npcsBySpotId = new Map<string, CompiledNpcRecord[]>()

for (const npc of NPCS_DB) {
  npcByCleanName.set(npc.name, npc)

  const regList = npcsByRegionId.get(npc.regionId) ?? []
  regList.push(npc)
  npcsByRegionId.set(npc.regionId, regList)

  if (npc.assignedBuildingId) {
    const bList = npcsByBuildingId.get(npc.assignedBuildingId) ?? []
    bList.push(npc)
    npcsByBuildingId.set(npc.assignedBuildingId, bList)
  }

  if (npc.assignedSpotId) {
    const sList = npcsBySpotId.get(npc.assignedSpotId) ?? []
    sList.push(npc)
    npcsBySpotId.set(npc.assignedSpotId, sList)
  }
}

// Sort resident NPCs by realmRank (Grandmasters/Masters first) and historical prominence
function sortNpcsForDisplay(list: CompiledNpcRecord[]): CompiledNpcRecord[] {
  return [...list].sort((a, b) => {
    if (a.category !== b.category && (a.realmRank > 9 || b.realmRank > 9)) {
      if (a.category === '历史名人') return -1
      if (b.category === '历史名人') return 1
    }
    if (a.realmRank !== b.realmRank) return a.realmRank - b.realmRank
    return a.id.localeCompare(b.id)
  })
}

for (const [k, v] of npcsByRegionId.entries()) {
  npcsByRegionId.set(k, sortNpcsForDisplay(v))
}
for (const [k, v] of npcsByBuildingId.entries()) {
  npcsByBuildingId.set(k, sortNpcsForDisplay(v))
}
for (const [k, v] of npcsBySpotId.entries()) {
  npcsBySpotId.set(k, sortNpcsForDisplay(v))
}

export function getCompiledNpcsByRegion(regionId: string): CompiledNpcRecord[] {
  return npcsByRegionId.get(regionId) ?? []
}

export function getCompiledNpcsByBuilding(buildingId: string): CompiledNpcRecord[] {
  return npcsByBuildingId.get(buildingId) ?? []
}

export function getCompiledNpcsBySpot(spotId: string): CompiledNpcRecord[] {
  return npcsBySpotId.get(spotId) ?? []
}

/**
 * Resolve the exact leaf building / interior sub-building where a roaming master
 * temporarily stays while visiting `master.nodeId`, ensuring roaming masters NEVER
 * leak to city-wide or parent-building views.
 */
export function resolveRoamingMasterLeafTarget(master: RoamingMaster): {
  buildingId: string
  spotId: string | null
} | null {
  const reg = REGION_DB_MAP[master.nodeId]
  if (!reg) return null

  // In cities, roaming masters rest at the local tavern (or first base building)
  if (reg.baseBuildingIds.length > 0) {
    const tavernId = reg.baseBuildingIds.find((id) => id.endsWith('_base_tavern'))
    return {
      buildingId: tavernId ?? reg.baseBuildingIds[0],
      spotId: null,
    }
  }

  // In sect/pass regions (where all buildings are special buildings with interior spots),
  // place them at a deterministic leaf spot of the first special building
  const firstSpecId = reg.specialBuildingIds[0]
  const specBldg = firstSpecId ? BUILDING_DB_MAP[firstSpecId] : null
  const firstSpot = specBldg?.interior?.spots[0]
  if (specBldg && firstSpot) {
    return {
      buildingId: specBldg.id,
      spotId: firstSpot.id,
    }
  }
  return null
}

export function resolveNpcByName(rawName: string): CompiledNpcRecord | null {
  const clean = rawName.replace(/（.*?）|\(.*?\)/g, '').trim()
  return npcByCleanName.get(clean) ?? npcByCleanName.get(rawName) ?? null
}
