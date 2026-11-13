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
} from '../types/game'

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

export function getCompiledNpcsByRegion(regionId: string): CompiledNpcRecord[] {
  return npcsByRegionId.get(regionId) ?? []
}

export function getCompiledNpcsByBuilding(buildingId: string): CompiledNpcRecord[] {
  return npcsByBuildingId.get(buildingId) ?? []
}

export function resolveNpcByName(rawName: string): CompiledNpcRecord | null {
  const clean = rawName.replace(/（.*?）|\(.*?\)/g, '').trim()
  return npcByCleanName.get(clean) ?? npcByCleanName.get(rawName) ?? null
}
