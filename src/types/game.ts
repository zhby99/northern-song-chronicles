export type NodeKind = 'city' | 'sect' | 'pass'
export type RegimeKey = 'song' | 'liao' | 'xixia' | 'tubo' | 'dali' | 'wild'
export type FactionKind = 'orthodox' | 'hermit' | 'clan' | 'hostile'
export type TerrainType = 'official' | 'water' | 'steppe' | 'mountain'
export type MountKey = 'walk' | 'horse' | 'xiXia' | 'ferghana'
export type ViewMode = 'world' | 'region' | 'building'
export type MenuTabKey =
  | 'hero'
  | 'loadout'
  | 'bag'
  | 'portraits'
  | 'martialArts'
  | 'engineering'
  | 'save'
  | 'load'
  | 'settings'

export interface NodeNpc {
  id?: string
  name: string
  title: string
  realm: string
  talk: string
  avatarUrl?: string | null
  factionName?: string
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

// ============================================================================
// [M0-2 & M0-3] Structured Game Database Schemas
// ============================================================================

export type BuildingInteriorMode = 'image' | 'svg_fallback'

export interface CompiledBuildingInterior {
  mode: BuildingInteriorMode
  panoramaUri: string | null
  subtitle: string
  exitGate: BuildingExitGate
  spots: BuildingSpot[]
}

export interface CompiledBuildingRecord {
  id: string
  regionId: string
  regionCode: string
  regionName: string
  name: string
  kind: string
  isSpecial: boolean
  order: number
  x: number
  y: number
  poly: string | null
  tag: string
  desc: string
  actLabel: string
  cost: number
  effect: ActionEffect
  hasPanoramaImage: boolean
  interior: CompiledBuildingInterior | null
  residentNpcIds: string[]
}

export interface CompiledRegionRecord {
  id: string
  standardCode: string
  numericCode: string
  name: string
  type: NodeKind
  regime: RegimeKey
  circuit: string
  worldCoord: { x: number; y: number }
  desc: string
  windscapeLore: string
  rumor: string
  alert: boolean
  factionType: FactionKind
  landmarks: string[]
  sects: string[]
  panoramaUri: string
  isoViewBox: [number, number]
  sceneSubtitle: string
  gate: {
    label: string
    pos: [number, number]
    poly?: string | null
  }
  specialBuildingIds: string[]
  baseBuildingIds: string[]
  residentNpcIds: string[]
  legacyAliases: string[]
}

export type MartialArtTier = '天阶' | '地阶' | '良品' | '凡品'
export type MartialArtSubTier = '上品' | '中品' | '下品'

export interface MartialArtStatReq {
  stat: string
  min: number
}

export interface CompiledMartialArtRecord {
  id: string
  code: string
  name: string
  cleanName: string
  tier: MartialArtTier
  subTier: MartialArtSubTier
  fullTier: string
  category: string
  origin: string
  sectId: string | null
  description: string
  prerequisitesText: string | null
  statRequirements: MartialArtStatReq[]
}

export interface NpcCombatStats {
  hp: number
  mp: number
  agi: number
  res: number
  isBenchmark: boolean
}

export interface CompiledNpcRecord {
  id: string
  name: string
  title: string
  category: '历史名人' | '武林群侠'
  gender: string
  age: number
  factionId: string
  factionName: string
  role: string
  regionId: string
  locationLabel: string
  subLocation: string | null
  assignedBuildingId: string | null
  realm: string
  majorRealm: string
  minorRealm: string | null
  realmRank: number
  stats: NpcCombatStats
  artsText: string
  knownArtIds: string[]
  specialtyTags: string[]
  bio: string
  avatarUrl: string | null
  fullbodyUrl: string | null
  templateUrl: string
}

export interface CanonicalFactionEntry {
  id: string
  name: string
  shortName: string
  isMajorSect: boolean
  group: string
  stance: string
  hqRegionId: string | null
  aliases: string[]
  memberCount: number
  martialArtIds: string[]
}

export interface CanonicalIdRegistry {
  schemaVersion: string
  counts: {
    regions: number
    majorSects: number
    otherOrganizations: number
    totalFactions: number
    specialBuildings: number
    specialBuildingsWithImage: number
    specialBuildingsWithSvgFallback: number
    cityBaseBuildings: number
    totalBuildings: number
    martialArts: number
    npcs: number
    npcsWithAvatar: number
    npcsWithFullbody: number
  }
  regions: Array<{
    id: string
    standardCode: string
    numericCode: string
    name: string
    type: NodeKind
    regime: RegimeKey
    legacyAliases: string[]
    npcCount: number
    specialBuildingCount: number
  }>
  factions: CanonicalFactionEntry[]
  locationAliasMap: Record<
    string,
    {
      regionId: string
      canonicalLabel: string
      subLocation: string | null
    }
  >
  martialArtIndex: Array<{
    id: string
    code: string
    name: string
    cleanName: string
    fullTier: string
    category: string
    sectId: string | null
  }>
}

// ============================================================================
// [M0-4] Multi-Slot Save / Load Schema
// ============================================================================

export type SaveSlotId =
  | 'autosave'
  | 'slot-1'
  | 'slot-2'
  | 'slot-3'
  | 'slot-4'
  | 'slot-5'
  | 'slot-6'

// ============================================================================
// [M1-0] Time (Shichen), Stamina, 7-Slot Equipment & 4-Category Bag Schemas
// ============================================================================

export type EquipmentSlotKey =
  | 'weapon'
  | 'armor'
  | 'shoes'
  | 'bow'
  | 'accessory1'
  | 'accessory2'
  | 'mount'

export type BagCategoryKey = 'scrolls' | 'medicine' | 'tools' | 'misc'

export type ItemRarity = '天阶' | '地阶' | '良品' | '凡品'

export interface EquipmentStatBonus {
  maxHp?: number
  maxMp?: number
  maxStamina?: number
  agility?: number
  res?: number
  attack?: number
  defense?: number
  riding?: number
  mountKey?: MountKey
  skills?: Record<string, number>
}

export type MartialArtSlotKey =
  | 'neigong'
  | 'qinggong'
  | 'move1'
  | 'move2'
  | 'move3'
  | 'move4'

export interface LearnedArtEntry {
  artId: string
  level: number // 1 ~ 10 重
  exp: number // 0 ~ 100 当前重熟练度
}

export type EquippedArtsMap = Record<MartialArtSlotKey, string | null>

export interface ItemUseEffect {
  hp?: number
  mp?: number
  stamina?: number
  res?: number
  food?: number
  skillGain?: [string, number]
  learnArtId?: string
  learnArtHint?: string
}

export interface GameItemDef {
  id: string
  name: string
  category: BagCategoryKey
  subType: string
  rarity: ItemRarity
  equipSlot?: EquipmentSlotKey
  stackable: boolean
  value: number
  desc: string
  lore?: string
  equipBonus?: EquipmentStatBonus
  useEffect?: ItemUseEffect
}

export interface InventoryStack {
  itemId: string
  qty: number
}

export type EquippedSlotsMap = Record<EquipmentSlotKey, string | null>

export interface SerializableGameState {
  dayCount: number
  shichenIdx: number
  viewMode: ViewMode
  showRegionLabels: boolean
  activeRegionId: string
  activeBuildingInteriorId: string | null
  selectedNodeId: string | null
  selectedBuildingId: string | null
  selectedSpotId: string | null
  currentNodeId: string

  mountKey: MountKey
  qinggongBonus: number
  ridingSkill: number
  agility: number
  silver: number
  food: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  stamina: number
  maxStamina: number
  res: number
  skills: Record<string, number>

  equipped: EquippedSlotsMap
  learnedArts: LearnedArtEntry[]
  equippedArts: EquippedArtsMap
  inventory: InventoryStack[]

  overlays: OverlayToggles
  roamingMasters: RoamingMaster[]
  worldPan: CameraPan
  regionPan: CameraPan
  logs: LogEntry[]
}

export interface GameSaveSummary {
  songDate: string
  dayCount: number
  shichenIdx?: number
  regionId: string
  regionName: string
  viewMode: ViewMode
  buildingId: string | null
  buildingName: string | null
  hp: number
  maxHp?: number
  stamina?: number
  maxStamina?: number
  mp: number
  silver: number
  food: number
}

export interface GameSaveEnvelope {
  gameTitle: '北宋立志传'
  schemaVersion: 'M0.4.0' | 'M1.0.0' | 'M1.1.0'
  slotId: SaveSlotId
  savedAt: string
  note: string
  summary: GameSaveSummary
  state: SerializableGameState
}

// Legacy compatibility types
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
        interiorMode?: BuildingInteriorMode | null
      }
    }
