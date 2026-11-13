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
  | 'engineering'
  | 'save'
  | 'load'
  | 'settings'

export type CompendiumTabKey =
  | 'regions'
  | 'sects'
  | 'portraits'
  | 'martialArts'
  | 'armory'
  | 'treasures'

export type TenArtKey =
  | '骑术'
  | '算术'
  | '经义'
  | '策论'
  | '诗词'
  | '琴'
  | '棋'
  | '书'
  | '画'
  | '辩才'

export interface NpcTalents {
  bone: number
  comprehension: number
  charm: number
}

export type NpcTenArts = Record<TenArtKey, number>

export interface NodeNpc {
  id?: string
  name: string
  title: string
  realm: string
  talk: string
  avatarUrl?: string | null
  factionName?: string
  stats?: NpcCombatStats
  talents?: NpcTalents
  tenArts?: NpcTenArts
  fullLocationLabel?: string
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
  residentNpcIds?: string[]
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

export interface MartialArtSpecialEffect {
  id: string
  name: string
  value: number
  unit: string
  desc: string
}

export interface MartialArtLevelStats {
  level: number
  expRequired?: number
  maxMp?: number
  maxHp?: number
  agility?: number
  resistance?: number
  constitution?: number
  charm?: number
  physicalDamage?: number
  poisonDamage?: number
  soundDamage?: number
  hiddenWeaponDamage?: number
  specialEffects?: MartialArtSpecialEffect[]
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
  levels?: MartialArtLevelStats[]
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
  assignedBuildingId: string
  assignedBuildingName: string
  assignedSpotId: string | null
  assignedSpotName: string | null
  fullLocationLabel: string
  realm: string
  majorRealm: string
  minorRealm: string | null
  realmRank: number
  stats: NpcCombatStats
  talents: NpcTalents
  tenArts: NpcTenArts
  artsText: string
  knownArtIds: string[]
  specialtyTags: string[]
  bio: string
  avatarUrl: string | null
  fullbodyUrl: string | null
  templateUrl: string
}

export type SectTierKind = '一流大派' | '二流门派' | '三流小派' | '朝堂与地域组织'

export interface CanonicalFactionEntry {
  id: string
  name: string
  shortName: string
  isMajorSect: boolean
  isMinorSect: boolean
  sectTier: SectTierKind
  group: string
  stance: string
  hqRegionId: string | null
  aliases: string[]
  stanceMotto: string
  hqDisplay: string
  leaderNpcIds: string[]
  coreBuildingIds: string[]
  highestArtTier: string
  summary: string
  entryAndFeatures: string
  memberCount: number
  martialArtIds: string[]
  weaponIds: string[]
}

export interface CanonicalIdRegistry {
  schemaVersion: string
  counts: {
    regions: number
    majorSects: number
    minorSects: number
    totalSects: number
    otherOrganizations: number
    totalFactions: number
    specialBuildings: number
    specialBuildingsWithImage: number
    specialBuildingsWithSvgFallback: number
    cityBaseBuildings: number
    totalBuildings: number
    interiorSubBuildings?: number
    martialArts: number
    weapons: number
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
  weaponIndex: Array<{
    id: string
    code: string
    name: string
    fullTier: string
    weaponType: WeaponSubCategory
    regionId: string
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
// [M1-0 & M1-3] Time (Shichen), Stamina, 7-Slot Equipment, 100 Weapons & 4-Category Bag
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

export type EquipmentTier = '天阶' | '地阶' | '良阶' | '凡阶'
export type ItemRarity = '天阶' | '地阶' | '良阶' | '凡阶' | '良品' | '凡品'

export type WeaponSubCategory =
  | '剑'
  | '刀'
  | '枪'
  | '棍棒'
  | '拳掌护手'
  | '暗器'
  | '奇门音兵'

export type WeaponForceTrait = '刚猛' | '阴柔' | '轻灵' | '奇巧' | '中正'

export interface WeaponSynergyRule {
  category: string
  bonusPct: number
}

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

export interface CompiledWeaponRecord {
  id: string
  code: string
  name: string
  slot: 'weapon'
  weaponType: WeaponSubCategory
  tier: EquipmentTier
  subTier: MartialArtSubTier
  fullTier: string
  regionId: string
  locationLabel: string
  origin: string
  originFull: string
  sectId: string | null
  forceTrait: WeaponForceTrait
  attackRange: number
  value: number
  equipBonus: EquipmentStatBonus
  synergies: WeaponSynergyRule[]
  signatureArtIds: string[]
  specialTag: string | null
  description: string
  prerequisitesText: string | null
  statRequirements: MartialArtStatReq[]
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
  maxHp?: number
  maxMp?: number
  maxStamina?: number
  agi?: number
  res?: number
  riding?: number
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
  weaponMeta?: CompiledWeaponRecord
  poisonEffect?: string
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
  campPos?: WildernessCamp | null

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
  schemaVersion: 'M1.2.0'
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

export interface WildernessCamp {
  x: number
  y: number
  u: string
  v: string
  distU: number
  distV: number
  terrain: TerrainType
}

export interface RouteSegment {
  from: string
  to: string
  dist: number
  terrain: TerrainType
  days: number
  fromCoords?: { x: number; y: number }
  campEdge?: {
    u: string
    v: string
    distU: number
    distV: number
    terrain: TerrainType
  }
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
        residentCount?: number
      }
    }
