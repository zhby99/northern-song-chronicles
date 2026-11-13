export type NodeKind = 'city' | 'sect' | 'pass'
export type RegimeKey = 'song' | 'liao' | 'xixia' | 'tubo' | 'dali' | 'wild'
export type FactionKind = 'orthodox' | 'hermit' | 'clan' | 'hostile'
export type TerrainType = 'official' | 'water' | 'steppe' | 'mountain'
export type MountKey = 'walk' | 'horse' | 'xiXia' | 'ferghana'
export type ViewMode = 'world' | 'region' | 'building'
export type MenuTabKey =
  | 'hero'
  | 'bag'
  | 'portraits'
  | 'engineering'
  | 'save'
  | 'load'
  | 'settings'

export interface NodeNpc {
  name: string
  title: string
  realm: string
  talk: string
}

export interface WorldNode {
  id: string
  code?: string
  name: string
  type: NodeKind
  regime?: RegimeKey
  circuit: string
  x: number
  y: number
  desc: string
  landmarks: string[]
  sects: string[]
  factionType: FactionKind
  alert: boolean
  rumor: string
  npcs: NodeNpc[]
}

export type WorldEdgeTuple = [string, string, number, TerrainType]

export interface TerrainMeta {
  name: string
  coeff: number
  stroke: string
  width: number
  cls: string
}

export interface MountMeta {
  name: string
  speed: number
}

export interface RegimeBadgeMeta {
  label: string
  fill: string
  inner: string
}

export interface RoamingMaster {
  id: string
  name: string
  sect: string
  nodeId: string
  realm: string
}

export interface WorldGraphData {
  nodes: WorldNode[]
  edges: WorldEdgeTuple[]
  terrainMeta: Record<TerrainType, TerrainMeta>
  mounts: Record<MountKey, MountMeta>
  regimeBadge: Record<RegimeKey, RegimeBadgeMeta>
  roamingMasters: RoamingMaster[]
}

export type SkillTuple = [string, number]

export interface ActionEffect {
  hp?: number
  mp?: number
  agi?: number
  res?: number
  riding?: number
  silver?: number
  skill?: SkillTuple
  skill2?: SkillTuple
  skill3?: SkillTuple
}

export interface RegionSpecialBuilding {
  id: string
  name: string
  kind: string
  x: number
  y: number
  poly?: string
  tag: string
  desc: string
  actLabel: string
  cost?: number
  effect: ActionEffect
}

export type BaseBuildingKey = 'yamen' | 'tavern' | 'inn' | 'dojo' | 'academy'

export interface RegionBasePlacement {
  key: BaseBuildingKey
  customName?: string
  x: number
  y: number
  poly?: string
}

export interface RegionConfig {
  theme: string
  isoViewBox?: [number, number]
  panoramaUri: string
  sceneSubtitle: string
  gateLabel: string
  gatePos: [number, number]
  gatePoly?: string
  specials: RegionSpecialBuilding[]
  bases?: RegionBasePlacement[]
}

export interface BuildingItem {
  id: string
  name: string
  kind: string
  x: number
  y: number
  poly: string | null
  tag: string
  desc: string
  actLabel: string
  cost: number
  effect: ActionEffect
  isSpecial: boolean
  order: number
}

export interface BuildingExitGate {
  label: string
  x: number
  y: number
  poly: string
}

export interface BuildingSpot {
  id: string
  name: string
  tag: string
  x: number
  y: number
  poly: string
  desc: string
  actLabel: string
  cost?: number
  effect: ActionEffect
}

export interface BuildingPanorama {
  id: string
  regionId: string
  name: string
  subtitle: string
  exitGate: BuildingExitGate
  spots: BuildingSpot[]
  panoramaUri: string
}

export interface PortraitCharacter {
  id: string
  name: string
  title: string
  cat: string
  gender: string
  age: number
  faction: string
  role: string
  loc: string
  realm: string
  arts: string
  bio: string
  avatarUrl: string | null
  fullbodyUrl: string | null
}

export interface PortraitTemplate {
  id: string
  url: string
  bytes: number
}

export interface PortraitCatalogData {
  characters: PortraitCharacter[]
  templates: PortraitTemplate[]
}

export interface AssetManifestEntry {
  id: string
  regionId?: string
  url: string
  bytes: number
}

export interface AssetManifestData {
  generatedBy: string
  legacySizes: {
    northern_song_map_html_bytes: number
    character_portrait_gallery_html_bytes: number
  }
  summary: {
    regionPanoramasCount: number
    regionPanoramasBytes: number
    buildingPanoramasCount: number
    buildingPanoramasBytes: number
    characterAvatarsCount: number
    characterFullbodiesCount: number
    characterTemplatesCount: number
    characterAssetsBytes: number
    totalExtractedImageFiles: number
    totalExtractedImageBytes: number
  }
  regions: AssetManifestEntry[]
  buildings: AssetManifestEntry[]
  templates: AssetManifestEntry[]
}

export interface OverlayToggles {
  cityLabels: boolean
  sectPassLabels: boolean
  masters: boolean
  distance: boolean
  factions: boolean
  alerts: boolean
}

export type LabelToggleKey = 'cityLabels' | 'sectPassLabels' | 'masters' | 'distance'

export interface RouteSegment {
  from: string
  to: string
  dist: number
  terrain: TerrainType
  days: number
}

export interface ComputedRoute {
  nodes: string[]
  segments: RouteSegment[]
  totalLi: number
  totalDays: number
}

export interface TravelState {
  targetId: string
  route: ComputedRoute
  segIdx: number
  segProgressDays: number
  dayAccumulator: number
  playerPos: { x: number; y: number }
}

export interface CameraPan {
  x: number
  y: number
  scale: number
}

export interface LogEntry {
  id: string
  date: string
  tag: string
  text: string
  highlight: boolean
}

export type TooltipPayload =
  | {
      kind: 'worldNode'
      x: number
      y: number
      node: WorldNode
    }
  | {
      kind: 'building'
      x: number
      y: number
      item: {
        id: string
        name: string
        desc: string
        actLabel: string
        isSpecial: boolean
        isSpot?: boolean
      }
    }
