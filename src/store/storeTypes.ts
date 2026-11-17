import type { StateCreator } from 'zustand'
import type {
  BagCategoryKey,
  CameraPan,
  CompendiumTabKey,
  CultivationDurationMode,
  CultivationSessionState,
  EquipmentSlotKey,
  EquippedArtsMap,
  EquippedSlotsMap,
  GameOverState,
  GameSaveEnvelope,
  HeroBaseStats,
  InventoryStack,
  LearnedArtEntry,
  LogEntry,
  MartialArtSlotKey,
  MenuTabKey,
  MountKey,
  NodeNpc,
  OverlayToggles,
  PlayerSectState,
  RoamingMaster,
  SaveSlotId,
  TooltipPayload,
  TravelState,
  ViewMode,
  WildernessCamp,
} from '../types/game'
import type {
  CultivationSpeedStep,
  ProtagonistGender,
  TenArtKey,
} from '../types/game'
import type {
  ActiveStorySceneState,
  QuestEffect,
  QuestRuntimeState,
  QuestTargetLocationHint,
} from '../types/quest'
import {
  type CombatActionChoice,
  type CombatSessionState,
  type DuelStakesKind,
} from '../utils/combatEngine'

export interface GameStoreState {
  dayCount: number
  characterCreated: boolean
  playerName: string
  playerPortraitId: string
  playerGender: ProtagonistGender
  playerAge: number
  completeCharacterCreation: (payload: {
    name: string
    portraitId: string
    gender?: ProtagonistGender
    silver: number
    baseStats: HeroBaseStats
    startNodeId?: string
  }) => void
  shichenIdx: number
  viewMode: ViewMode
  showRegionLabels: boolean
  activeRegionId: string
  activeBuildingInteriorId: string | null
  selectedNodeId: string | null
  selectedBuildingId: string | null
  selectedSpotId: string | null
  currentNodeId: string

  baseStats: HeroBaseStats
  mountKey: MountKey
  qinggongBonus: number
  ridingSkill: number
  agility: number
  combatExp: number
  renown: number
  chivalry: number
  silver: number
  food: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  res: number
  skills: Record<string, number>

  equipped: EquippedSlotsMap
  learnedArts: LearnedArtEntry[]
  equippedArts: EquippedArtsMap
  inventory: InventoryStack[]
  consumedUniqueIds: string[]
  consumedOnceItemIds: string[]
  activeBagCategory: BagCategoryKey

  overlays: OverlayToggles
  roamingMasters: RoamingMaster[]
  traveling: TravelState | null
  cultivationSession: CultivationSessionState | null
  campPos: WildernessCamp | null

  worldPan: CameraPan
  regionPan: CameraPan

  actionFeedback: { text: string; tone: 'success' | 'warn' | 'talk' } | null
  tooltip: TooltipPayload | null
  logs: LogEntry[]
  logDrawerOpen: boolean

  menuOpen: boolean
  activeNpcInteraction: NodeNpc | null
  activeCombat: CombatSessionState | null
  activeStoryScene: ActiveStorySceneState | null
  gameOver: GameOverState | null
  sectState: PlayerSectState
  questState: QuestRuntimeState
  activeMenuTab: MenuTabKey
  compendiumOpen: boolean
  activeCompendiumTab: CompendiumTabKey
  inspectedNpcId: string | null

  // Save/Load state
  saveSlots: Record<SaveSlotId, GameSaveEnvelope | null>
  saveBusy: boolean
  saveNotice: { text: string; tone: 'success' | 'error' } | null

  // Actions
  clearActionFeedback: () => void
  setTooltip: (payload: TooltipPayload | null) => void
  moveTooltip: (x: number, y: number) => void
  clearFloatingSelection: () => void
  selectWorldNode: (nodeId: string | null) => void
  selectRegionBuilding: (bldgId: string | null) => void
  selectBuildingSpot: (spotId: string | null) => void

  enterRegionMap: (nodeId: string, logSwitch?: boolean) => void
  enterBuildingMap: (bldgId: string) => void
  exitBuildingMap: () => void
  exitToWorldMap: () => void
  handleUpperLevelBack: () => void

  toggleRegionLabels: () => void
  toggleOverlay: (key: keyof OverlayToggles) => void
  setAllLabelToggles: (enabled: boolean) => void

  setWorldPan: (pan: CameraPan) => void
  zoomWorldBy: (factor: number, cx?: number, cy?: number) => void
  focusZhongyuan: () => void
  focusMacroRegimes: () => void
  resetWorldView: () => void

  setRegionPan: (pan: CameraPan) => void
  zoomRegionBy: (factor: number, cx?: number | null, cy?: number | null) => void
  focusSelectedBuilding: () => void
  resetRegionView: () => void

  setMountKey: (mountKey: MountKey) => void
  setQinggongBonus: (bonus: number) => void
  replenishSupplies: () => void
  restAndRecuperate: (days: 1 | 3 | 5) => void
  setBagCategory: (cat: BagCategoryKey) => void
  equipItemToSlot: (itemId: string, targetSlot?: EquipmentSlotKey) => void
  unequipSlot: (slot: EquipmentSlotKey) => void
  acquireWeaponToBag: (weaponId: string) => void
  acquireItemToBag: (itemId: string) => void
  equipArtToSlot: (artId: string, slot: MartialArtSlotKey) => void
  unequipArtSlot: (slot: MartialArtSlotKey) => void
  cultivateLearnedArt: (artId: string, mode?: CultivationDurationMode) => void
  startScriptureSeclusion: () => void
  startShaolinChore: (days: number) => void
  startOddJobWork: () => void
  stepCultivationTick: () => void
  stopCultivationEarly: () => void
  breakthroughLearnedArt: (artId: string) => void
  transferNeigongProficiency: (fromArtId: string, toArtId: string) => void
  consumeInventoryItem: (itemId: string, forceUseEffect?: boolean) => void

  buySpotShopItem: (spotId: string, itemId: string, qty?: number) => void
  interactNpc: (npc: NodeNpc, mode: 'talk' | 'spar') => void
  startNpcCombat: (
    npc: NodeNpc,
    mode?: 'spar' | 'duel',
    duelStakes?: DuelStakesKind,
    forceMandatory?: boolean,
  ) => void
  submitCombatAction: (choice: CombatActionChoice) => void
  finishCombatSession: () => void
  restartAfterGameOver: () => void

  // Sect & Faction Mechanics
  joinSect: (targetSectId: string, mentorNpc?: NodeNpc) => void
  leaveSect: () => void
  acceptToumingzhuang: (npc?: NodeNpc) => void
  promoteSectRank: () => void
  acceptSectTask: () => void
  abandonSectTask: () => void
  acceptKaifengWarrant: () => void
  abandonKaifengWarrant: () => void
  completeKaifengInvestigation: () => void
  completeSectTaskStep: () => void
  turnInSectTask: () => void
  startSectTournament: () => void
  continueSectTournamentRound: () => void
  bribeForReferral: (npc: NodeNpc) => void
  claimKaifengRecommendation: (npc?: NodeNpc) => void
  learnSectMartialArt: (artId: string) => void

  // Declarative Quest & Story Scene Engine
  runQuestEffects: (effects: QuestEffect[], contextNpc?: NodeNpc | null) => void
  advanceStoryScene: () => void
  selectStoryChoice: (choiceId: string) => void
  closeStoryScene: () => void
  fireLocationTriggersForCurrentSpot: (loc: {
    regionId: string
    buildingId?: string | null
    spotId?: string | null
    isPassThrough?: boolean
  }) => boolean
  checkExpiredQuestDeadlines: () => void
  locateQuestTargetOnMap: (target: QuestTargetLocationHint) => void

  startJourney: (targetId: string) => void
  stepTravelTick: () => void
  campStop: () => void

  toggleLogDrawer: () => void
  openMenu: (tab?: MenuTabKey) => void
  npcFavor: Record<string, number>
  npcTalkedMonth: Record<string, number>
  npcSparredMonth: Record<string, number>
  openNpcInteraction: (npc: NodeNpc) => void
  closeNpcInteraction: () => void
  giftNpcItem: (npc: NodeNpc, itemId: string) => void
  closeMenu: () => void
  setMenuTab: (tab: MenuTabKey) => void
  openCompendium: (tab?: CompendiumTabKey) => void
  closeCompendium: () => void
  setCompendiumTab: (tab: CompendiumTabKey) => void
  openNpcDetailInCompendium: (npcId: string) => void
  navigateToNpcLeafInCurrentRegion: (npcId: string) => void

  // Save/Load actions
  buildSaveEnvelope: (slotId: SaveSlotId, note?: string) => GameSaveEnvelope
  refreshSaveSlots: () => Promise<void>
  saveToSlot: (slotId: SaveSlotId, note?: string, silent?: boolean) => Promise<void>
  loadFromEnvelope: (envelope: GameSaveEnvelope, closeAfterLoad?: boolean) => void
  removeSaveSlot: (slotId: SaveSlotId) => Promise<void>
  setSaveNotice: (notice: { text: string; tone: 'success' | 'error' } | null) => void

  // Ten Arts Progression
  artExps: Partial<Record<TenArtKey, number>>
  artMilestoneFlags: string[]
  hiddenQuestIds: string[]
  toggleHideTrackedQuest: (trackKey: string) => void
  unhideAllTrackedQuests: () => void
  studyArtSkill: (
    artKey: TenArtKey,
    days: number,
    envMultiplier?: number,
    costSilver?: number,
    sourceLabel?: string,
  ) => { ok: boolean; message: string }
  startTenArtPractice: (
    artKey: TenArtKey,
    days: 3 | 10 | 30,
    venueLabel: string,
    envMultiplier: number,
    dailySilverCost: number,
  ) => void
  cultivationSpeedStep: CultivationSpeedStep
  setCultivationSpeedStep: (step: CultivationSpeedStep) => void
  inspectedLearnedArtId: string
  setInspectedLearnedArtId: (artId: string) => void
}

export type GameStoreData = {
  [K in keyof GameStoreState as GameStoreState[K] extends (...args: never[]) => unknown
    ? never
    : K]: GameStoreState[K]
}

export type StoreSlice<K extends keyof GameStoreState> = StateCreator<
  GameStoreState,
  [],
  [],
  Pick<GameStoreState, K>
>
