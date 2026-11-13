import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BookOpen,
  Compass,
  Flame,
  FlaskConical,
  Footprints,
  Gem,
  Hammer,
  Maximize2,
  Package,
  Shield,
  Sparkles,
  Sword,
  Target,
  Wind,
  X,
} from 'lucide-react'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  ID_REGISTRY,
  MARTIAL_ART_DB_MAP,
  MARTIAL_ARTS_DB,
  NPC_DB_MAP,
  NPCS_DB,
  TEN_ART_KEYS,
  WEAPONS_DB,
} from '../../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  canItemFitSlot,
  checkMountEquipRequirements,
  checkWeaponEquipRequirements,
  computeEquipmentTotals,
  computeWeaponArtSynergy,
  DEFAULT_HERO_TALENTS,
  EQUIPMENT_SLOT_METAS,
  formatBonusBadges,
  ITEM_DB_MAP,
  normalizeItemTier,
  RARITY_STYLE_MAP,
  TREASURE_COMPENDIUM_ITEMS,
  TREASURE_VOLUME_METAS,
  type TreasureVolumeKey,
} from '../../data/itemsDb'
import {
  canArtFitSlot,
  computeEquippedArtsTotals,
  computeSingleArtBonus,
  formatArtBonusBadges,
  getArtExpRequired,
  getMasteryStageLabel,
  MARTIAL_ART_SLOT_METAS,
} from '../../data/playerMartialArts'
import { useGameStore } from '../../store/useGameStore'
import { GearCompendiumPanel } from './GearCompendiumPanel'
import type {
  BagCategoryKey,
  CompendiumTabKey,
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  CompiledWeaponRecord,
  EquipmentSlotKey,
  EquipmentTier,
  GameItemDef,
  GearSlotType,
  LearnedArtEntry,
  MartialArtSlotKey,
  MenuTabKey,
  SaveSlotId,
  WeaponSubCategory,
} from '../../types/game'
import {
  ASSET_MANIFEST,
  formatByteSize,
  recordAssetLoaded,
  resolveAssetUrl,
  useAssetTelemetry,
} from '../../utils/assetLoader'
import {
  formatSongDate,
  getEffectiveSpeed,
  NODE_MAP,
  resolveMountMeta,
  WORLD_GRAPH,
} from '../../utils/mapMath'
import {
  downloadSaveAsJsonFile,
  parseSaveJsonFile,
  putSaveEnvelope,
  SAVE_SLOT_DEFS,
} from '../../utils/saveManager'
import {
  formatAudioTime,
  getActiveTrackItem,
  getAudioCatalogSummary,
  playNextBgmTrack,
  playPrevBgmTrack,
  seekBgmTo,
  selectBgmTrackIndex,
  setBgmVolume,
  toggleBgmPlayback,
  useBgmState,
} from '../../utils/bgmManager'
import { MountCompendiumPanel } from './MountCompendiumPanel'
import { RegionCompendiumPanel } from './RegionCompendiumPanel'
import { SectCompendiumPanel } from './SectCompendiumPanel'

const WEAPON_SUB_CATEGORIES: WeaponSubCategory[] = [
  '剑',
  '刀',
  '枪',
  '棍棒',
  '拳掌护手',
  '暗器',
  '奇门音兵',
]

interface NavItemMeta<K extends string> {
  key: K
  numeral: string
  label: string
  seal: string
  subtitle: string
  badge: string
}

// 【行囊枢机】专属卷册（不含任何图鉴）
const SYSTEM_NAV_ITEMS: Array<NavItemMeta<MenuTabKey>> = [
  {
    key: 'hero',
    numeral: '壹',
    label: '主角面板',
    seal: '侠',
    subtitle: '少侠全身立绘、生存气血体能、实战四维总览、先天三维禀赋、官道脚力与北宋十艺百工修为',
    badge: 'M1-0 已实装',
  },
  {
    key: 'loadout',
    numeral: '贰',
    label: '披挂与武学',
    seal: '武',
    subtitle: '7 槽位可视化随身披挂（百兵共鸣 + 名驹鞍辔）+ 6 槽位运使武学（主运内功 · 轻功身法 · 四门出战招式）',
    badge: '百兵名驹',
  },
  {
    key: 'bag',
    numeral: '叁',
    label: '行囊四库',
    seal: '囊',
    subtitle: '少侠随身四分类行囊（典籍书画 · 丹药毒物 · 雅器百工 · 行囊杂物）及银两粮草补给、展卷服食佩挂换骑',
    badge: '随身行囊',
  },
  {
    key: 'engineering',
    numeral: '肆',
    label: '工程与字典',
    seal: '枢',
    subtitle: '静态资源按需懒加载遥测 + 跨分支标准 ID 字典（43地 / 30派+11组织 / 216功 / 100兵 / 28骑 / 180奇珍 / 1000人）',
    badge: 'M0-2 已实装',
  },
  {
    key: 'save',
    numeral: '伍',
    label: '存 档',
    seal: '录',
    subtitle: '多槽位 IndexedDB 卷宗持久化（含披挂、名驹坐骑、武学重数与四库行囊）、手札批注与 JSON 导出',
    badge: 'M1.3 卷宗',
  },
  {
    key: 'load',
    numeral: '陆',
    label: '读 档',
    seal: '启',
    subtitle: '读取当前版本卷宗回溯三层空间与披挂武学现场，或从本地导入 .json 存档文件',
    badge: 'M1.3 卷宗',
  },
  {
    key: 'settings',
    numeral: '柒',
    label: '设 置',
    seal: '律',
    subtitle: '皇祐雅乐坊（《东京梦华》背景配乐控制）、舆图显示偏好与牌匾标注调校',
    badge: '雅乐已启',
  },
]

// 【图鉴】按钮专属卷册（统辖全部七大图鉴：地区 / 门派 / 群侠 / 武学 / 披挂 / 坐骑 / 博物）
const COMPENDIUM_NAV_ITEMS: Array<NavItemMeta<CompendiumTabKey>> = [
  {
    key: 'regions',
    numeral: '壹',
    label: '地区图鉴',
    seal: '舆',
    subtitle: '皇祐山海舆地全鉴：26座州府王都 + 17处名山秘境与雄关（共43地）、268座城郭殿宇、驿路网与风物风闻',
    badge: '43地全录',
  },
  {
    key: 'sects',
    numeral: '贰',
    label: '门派图鉴',
    seal: '宗',
    subtitle: '天下三十武林门派三级金字塔（20一流大派 · 4二流世家 · 6三流武馆）及 11 大庙堂儒林四夷组织全典',
    badge: '30派+11势力',
  },
  {
    key: 'portraits',
    numeral: '叁',
    label: '群侠图鉴',
    seal: '谱',
    subtitle: '全量 1,000 位皇祐人物档案、3:4 等比画轴全身像对齐与高清点击放大品鉴（头像/全身双视图）',
    badge: '1000人全录',
  },
  {
    key: 'martialArts',
    numeral: '肆',
    label: '武学总纲',
    seal: '典',
    subtitle: '四阶十二品共 216 门天下武学全录、天阶前置校验词条、门派归属索引与主角习得状态标记',
    badge: '216功全录',
  },
  {
    key: 'armory',
    numeral: '伍',
    label: '披挂总纲',
    seal: '兵',
    subtitle: '七槽披挂规制与第一卷《百兵谱》100 种武器全录（10天阶 · 20地阶 · 30良阶 · 40凡阶）及兵武共鸣',
    badge: '百兵已定',
  },
  {
    key: 'mounts',
    numeral: '陆',
    label: '坐骑图鉴',
    seal: '驹',
    subtitle: '第六卷《名驹鞍辔谱》28 种良驹全录（3天阶 · 5地阶 · 8良阶 · 12凡阶）、茶马榷场考据与专擅地貌脚力',
    badge: '28骑全录',
  },
  {
    key: 'treasures',
    numeral: '柒',
    label: '博物图鉴',
    seal: '鉴',
    subtitle: '皇祐三卷奇珍全录：卷壹《典籍书画》100卷 · 卷贰《丹药毒物》30品 · 卷叁《雅器百工》50件（共180品）',
    badge: '180品全录',
  },
]

function renderSlotIcon(slot: EquipmentSlotKey, cls = 'w-4 h-4') {
  switch (slot) {
    case 'weapon':
      return <Sword className={cls} />
    case 'armor':
      return <Shield className={cls} />
    case 'shoes':
      return <Footprints className={cls} />
    case 'bow':
      return <Target className={cls} />
    case 'accessory1':
      return <Gem className={cls} />
    case 'accessory2':
      return <Sparkles className={cls} />
    case 'mount':
      return <Compass className={cls} />
  }
}

function renderArtSlotIcon(slot: MartialArtSlotKey, cls = 'w-4 h-4') {
  if (slot === 'neigong') return <Flame className={cls} />
  if (slot === 'qinggong') return <Wind className={cls} />
  return <Sword className={cls} />
}

function renderBagCatIcon(cat: BagCategoryKey, cls = 'w-4 h-4') {
  switch (cat) {
    case 'scrolls':
      return <BookOpen className={cls} />
    case 'medicine':
      return <FlaskConical className={cls} />
    case 'tools':
      return <Hammer className={cls} />
    case 'misc':
      return <Package className={cls} />
  }
}

function formatSavedTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

interface LightboxState {
  url: string
  title: string
  subtitle: string
  npc?: CompiledNpcRecord
  mode?: 'fullbody' | 'avatar'
}

export function SystemMenuModal() {
  const menuOpen = useGameStore((s) => s.menuOpen)
  const activeMenuTab = useGameStore((s) => s.activeMenuTab)
  const compendiumOpen = useGameStore((s) => s.compendiumOpen)
  const activeCompendiumTab = useGameStore((s) => s.activeCompendiumTab)
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const campPos = useGameStore((s) => s.campPos)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const stamina = useGameStore((s) => s.stamina)
  const maxStamina = useGameStore((s) => s.maxStamina)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const equipped = useGameStore((s) => s.equipped)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const equippedArts = useGameStore((s) => s.equippedArts)
  const inventory = useGameStore((s) => s.inventory)
  const activeBagCategory = useGameStore((s) => s.activeBagCategory)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const inspectedNpcId = useGameStore((s) => s.inspectedNpcId)
  const traveling = useGameStore((s) => s.traveling)
  const saveSlots = useGameStore((s) => s.saveSlots)
  const saveBusy = useGameStore((s) => s.saveBusy)
  const saveNotice = useGameStore((s) => s.saveNotice)
  const [armorySubTab, setArmorySubTab] = useState<'weapons' | GearSlotType>('weapons')

  const openMenu = useGameStore((s) => s.openMenu)
  const closeMenu = useGameStore((s) => s.closeMenu)
  const setMenuTab = useGameStore((s) => s.setMenuTab)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const closeCompendium = useGameStore((s) => s.closeCompendium)
  const setCompendiumTab = useGameStore((s) => s.setCompendiumTab)
  const navigateToNpcLeafInCurrentRegion = useGameStore(
    (s) => s.navigateToNpcLeafInCurrentRegion,
  )
  const replenishSupplies = useGameStore((s) => s.replenishSupplies)
  const restRecoverStamina = useGameStore((s) => s.restRecoverStamina)
  const setBagCategory = useGameStore((s) => s.setBagCategory)
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)
  const unequipSlot = useGameStore((s) => s.unequipSlot)
  const acquireWeaponToBag = useGameStore((s) => s.acquireWeaponToBag)
  const acquireItemToBag = useGameStore((s) => s.acquireItemToBag)
  const equipArtToSlot = useGameStore((s) => s.equipArtToSlot)
  const unequipArtSlot = useGameStore((s) => s.unequipArtSlot)
  const practiceLearnedArt = useGameStore((s) => s.practiceLearnedArt)
  const consumeInventoryItem = useGameStore((s) => s.consumeInventoryItem)
  const toggleRegionLabels = useGameStore((s) => s.toggleRegionLabels)
  const setAllLabelToggles = useGameStore((s) => s.setAllLabelToggles)
  const buildSaveEnvelope = useGameStore((s) => s.buildSaveEnvelope)
  const saveToSlot = useGameStore((s) => s.saveToSlot)
  const loadFromEnvelope = useGameStore((s) => s.loadFromEnvelope)
  const removeSaveSlot = useGameStore((s) => s.removeSaveSlot)
  const setSaveNotice = useGameStore((s) => s.setSaveNotice)

  const telemetry = useAssetTelemetry()
  const bgm = useBgmState()
  const activeTrackItem = getActiveTrackItem(bgm)
  const audioCatalog = getAudioCatalogSummary()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Selected equipment & martial art slot in Loadout Panel (System Tab 2)
  const [selectedEquipSlot, setSelectedEquipSlot] = useState<EquipmentSlotKey>('weapon')
  const [selectedArtSlot, setSelectedArtSlot] = useState<MartialArtSlotKey>('neigong')
  const [inspectedLearnedArtId, setInspectedLearnedArtId] = useState<string>('MA-177')

  // Selected item ID in Bag Panel (System Tab 3 — personal inventory only)
  const [selectedBagItemId, setSelectedBagItemId] = useState<string | null>(null)

  // 43 Regions, 41 Sects/Organizations & 28 Mounts Compendium state
  const [selectedRegionCompId, setSelectedRegionCompId] = useState<string>(
    () => activeRegionId || 'bianliang',
  )
  const [selectedSectCompId, setSelectedSectCompId] = useState<string>('SECT-01')
  const [selectedMountCompId, setSelectedMountCompId] = useState<string>('MNT-001')

  // 1,000 NPC Compendium filter state (Compendium Tab 3)
  const [npcQuery, setNpcQuery] = useState('')
  const [localNpcScope, setLocalNpcScope] = useState<string>('ALL_WITH_ART')
  const [npcRegionFilter, setNpcRegionFilter] = useState<string>('ALL')
  const [npcFactionFilter, setNpcFactionFilter] = useState<string>('ALL')
  const [localSelectedNpc, setLocalSelectedNpc] = useState<CompiledNpcRecord | null>(
    () => NPCS_DB[100] ?? NPCS_DB[0] ?? null,
  )

  const inspectedTarget = inspectedNpcId ? (NPC_DB_MAP[inspectedNpcId] ?? null) : null
  const selectedNpc = inspectedTarget ?? localSelectedNpc
  const npcScope =
    inspectedTarget &&
    !inspectedTarget.avatarUrl &&
    !inspectedTarget.fullbodyUrl &&
    localNpcScope === 'ALL_WITH_ART'
      ? 'ALL'
      : localNpcScope

  const setSelectedNpc = (next: CompiledNpcRecord | null) => {
    if (inspectedNpcId) {
      useGameStore.setState({ inspectedNpcId: null })
    }
    setLocalSelectedNpc(next)
  }

  const setNpcScope = (nextScope: string) => {
    if (inspectedNpcId && selectedNpc) {
      setLocalSelectedNpc(selectedNpc)
      useGameStore.setState({ inspectedNpcId: null })
    }
    setLocalNpcScope(nextScope)
  }

  // High-res portrait zoom lightbox modal state
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  // 216 Martial Arts Compendium filter state (Compendium Tab 2)
  const [artQuery, setArtQuery] = useState('')
  const [artTierFilter, setArtTierFilter] = useState<string>('ALL')
  const [artCatFilter, setArtCatFilter] = useState<string>('ALL')
  const [selectedArt, setSelectedArt] = useState<CompiledMartialArtRecord | null>(
    () => MARTIAL_ARTS_DB[0] ?? null,
  )

  // 100 Weapons Armory Compendium filter state (Compendium Tab 3)
  const [wpnQuery, setWpnQuery] = useState('')
  const [wpnTierFilter, setWpnTierFilter] = useState<'ALL' | EquipmentTier>('ALL')
  const [wpnTypeFilter, setWpnTypeFilter] = useState<'ALL' | WeaponSubCategory>('ALL')
  const [selectedWeapon, setSelectedWeapon] = useState<CompiledWeaponRecord | null>(
    () => WEAPONS_DB[0] ?? null,
  )

  // 180 Treasures Compendium filter state (Compendium Tab 4: 典籍书画 100 + 丹药毒物 30 + 雅器百工 50)
  const [treasureVolFilter, setTreasureVolFilter] = useState<'ALL' | TreasureVolumeKey>('ALL')
  const [treasureTierFilter, setTreasureTierFilter] = useState<'ALL' | EquipmentTier>('ALL')
  const [treasureSubTypeFilter, setTreasureSubTypeFilter] = useState<string>('ALL')
  const [treasureOwnedFilter, setTreasureOwnedFilter] = useState<'ALL' | 'OWNED' | 'UNOWNED'>(
    'ALL',
  )
  const [treasureQuery, setTreasureQuery] = useState<string>('')
  const [selectedTreasureId, setSelectedTreasureId] = useState<string>(
    () => TREASURE_COMPENDIUM_ITEMS[0]?.id ?? 'ITM-SCR-001',
  )

  // Save note state
  const [saveNoteDraft, setSaveNoteDraft] = useState('')
  const [importTargetSlot, setImportTargetSlot] = useState<SaveSlotId | 'DIRECT_LOAD'>('DIRECT_LOAD')

  // Intercept ESC when portrait zoom lightbox is open so it closes lightbox first instead of whole menu
  useEffect(() => {
    if (!lightbox) return
    const onCaptureEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        e.preventDefault()
        setLightbox(null)
      }
    }
    window.addEventListener('keydown', onCaptureEsc, true)
    return () => window.removeEventListener('keydown', onCaptureEsc, true)
  }, [lightbox])

  const filteredNpcs = useMemo(() => {
    const q = npcQuery.trim().toLowerCase()
    return NPCS_DB.filter((c) => {
      if (npcScope === 'ALL_WITH_ART' && !c.avatarUrl && !c.fullbodyUrl) return false
      if (npcScope === 'HISTORICAL' && c.category !== '历史名人') return false
      if (npcScope === 'GRANDMASTER_MASTER' && c.realmRank > 6) return false
      if (npcScope === 'FIRST_RATE' && (c.realmRank < 7 || c.realmRank > 9)) return false
      if (npcScope === 'HERE' && c.regionId !== activeRegionId) return false

      if (npcRegionFilter !== 'ALL' && c.regionId !== npcRegionFilter) return false
      if (npcFactionFilter !== 'ALL' && c.factionId !== npcFactionFilter) return false

      if (!q) return true
      return (
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.factionName.toLowerCase().includes(q) ||
        c.locationLabel.toLowerCase().includes(q) ||
        c.fullLocationLabel.toLowerCase().includes(q) ||
        c.assignedBuildingName.toLowerCase().includes(q) ||
        (c.assignedSpotName?.toLowerCase().includes(q) ?? false) ||
        c.artsText.toLowerCase().includes(q)
      )
    })
  }, [npcQuery, npcScope, npcRegionFilter, npcFactionFilter, activeRegionId])

  const artCategories = useMemo(() => {
    const s = new Set<string>()
    for (const a of MARTIAL_ARTS_DB) {
      s.add(a.category)
    }
    return Array.from(s)
  }, [])

  const filteredArts = useMemo(() => {
    const q = artQuery.trim().toLowerCase()
    return MARTIAL_ARTS_DB.filter((a) => {
      if (artTierFilter !== 'ALL' && a.tier !== artTierFilter) return false
      if (artCatFilter !== 'ALL' && a.category !== artCatFilter) return false
      if (!q) return true
      return (
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.origin.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      )
    })
  }, [artQuery, artTierFilter, artCatFilter])

  const filteredWeapons = useMemo(() => {
    const q = wpnQuery.trim().toLowerCase()
    return WEAPONS_DB.filter((w) => {
      if (wpnTierFilter !== 'ALL' && w.tier !== wpnTierFilter) return false
      if (wpnTypeFilter !== 'ALL' && w.weaponType !== wpnTypeFilter) return false
      if (!q) return true
      return (
        w.id.toLowerCase().includes(q) ||
        w.name.toLowerCase().includes(q) ||
        w.weaponType.toLowerCase().includes(q) ||
        w.originFull.toLowerCase().includes(q) ||
        w.locationLabel.toLowerCase().includes(q) ||
        (w.specialTag ?? '').toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q)
      )
    })
  }, [wpnQuery, wpnTierFilter, wpnTypeFilter])

  const equipTotals = useMemo(() => computeEquipmentTotals(equipped), [equipped])
  const artTotals = useMemo(
    () => computeEquippedArtsTotals(equippedArts, learnedArts),
    [equippedArts, learnedArts],
  )
  const weaponSynergy = useMemo(
    () => computeWeaponArtSynergy(equipped.weapon, equippedArts, learnedArts),
    [equipped.weapon, equippedArts, learnedArts],
  )
  const playerEquipCtx = useMemo(
    () => ({
      maxHp,
      maxMp,
      agility,
      res,
      ridingSkill,
      skills,
      talents: DEFAULT_HERO_TALENTS,
    }),
    [maxHp, maxMp, agility, res, ridingSkill, skills],
  )
  const inventoryQtyMap = useMemo(() => {
    const m = new Map<string, number>()
    for (const st of inventory) {
      m.set(st.itemId, st.qty)
    }
    return m
  }, [inventory])
  const learnedMap = useMemo(() => {
    const m = new Map<string, { level: number; exp: number }>()
    for (const e of learnedArts) {
      m.set(e.artId, { level: e.level, exp: e.exp })
    }
    return m
  }, [learnedArts])

  const bagItemsByCat = useMemo(() => {
    const counts: Record<BagCategoryKey, number> = {
      scrolls: 0,
      medicine: 0,
      tools: 0,
      misc: 0,
    }
    const list: Array<{ itemId: string; qty: number; def: GameItemDef }> = []
    for (const st of inventory) {
      const def = ITEM_DB_MAP[st.itemId]
      if (!def) continue
      counts[def.category] += 1
      if (def.category === activeBagCategory) {
        list.push({ itemId: st.itemId, qty: st.qty, def })
      }
    }
    return { counts, list }
  }, [inventory, activeBagCategory])

  const ownedQtyMap = useMemo(() => {
    const m = new Map<string, number>()
    for (const st of inventory) {
      m.set(st.itemId, st.qty)
    }
    return m
  }, [inventory])

  const equippedItemIdSet = useMemo(() => {
    const s = new Set<string>()
    for (const id of Object.values(equipped)) {
      if (id) s.add(id)
    }
    return s
  }, [equipped])

  const treasureCollectionStats = useMemo(() => {
    const stats: Record<
      'ALL' | TreasureVolumeKey,
      { total: number; owned: number }
    > = {
      ALL: { total: 0, owned: 0 },
      scrolls: { total: 0, owned: 0 },
      medicine: { total: 0, owned: 0 },
      tools: { total: 0, owned: 0 },
    }
    for (const item of TREASURE_COMPENDIUM_ITEMS) {
      const cat = item.category as TreasureVolumeKey
      const isOwned =
        (ownedQtyMap.get(item.id) ?? 0) > 0 || equippedItemIdSet.has(item.id)
      stats.ALL.total += 1
      stats[cat].total += 1
      if (isOwned) {
        stats.ALL.owned += 1
        stats[cat].owned += 1
      }
    }
    return stats
  }, [ownedQtyMap, equippedItemIdSet])

  const treasureVolumeItems = useMemo(() => {
    if (treasureVolFilter === 'ALL') return TREASURE_COMPENDIUM_ITEMS
    return TREASURE_COMPENDIUM_ITEMS.filter((it) => it.category === treasureVolFilter)
  }, [treasureVolFilter])

  const treasureTierCounts = useMemo(() => {
    const counts: Record<'ALL' | EquipmentTier, number> = {
      ALL: treasureVolumeItems.length,
      天阶: 0,
      地阶: 0,
      良阶: 0,
      凡阶: 0,
    }
    for (const it of treasureVolumeItems) {
      counts[normalizeItemTier(it.rarity)] += 1
    }
    return counts
  }, [treasureVolumeItems])

  const treasureSubTypes = useMemo(() => {
    const s = new Set<string>()
    for (const it of treasureVolumeItems) {
      s.add(it.subType)
    }
    return Array.from(s)
  }, [treasureVolumeItems])

  const filteredTreasures = useMemo(() => {
    const q = treasureQuery.trim().toLowerCase()
    return treasureVolumeItems.filter((it) => {
      if (treasureTierFilter !== 'ALL' && normalizeItemTier(it.rarity) !== treasureTierFilter) {
        return false
      }
      if (treasureSubTypeFilter !== 'ALL' && it.subType !== treasureSubTypeFilter) {
        return false
      }
      const isOwned =
        (ownedQtyMap.get(it.id) ?? 0) > 0 || equippedItemIdSet.has(it.id)
      if (treasureOwnedFilter === 'OWNED' && !isOwned) return false
      if (treasureOwnedFilter === 'UNOWNED' && isOwned) return false

      if (!q) return true
      const linkedArtName = it.useEffect?.learnArtId
        ? (MARTIAL_ART_DB_MAP[it.useEffect.learnArtId]?.name.toLowerCase() ?? '')
        : ''
      return (
        it.id.toLowerCase().includes(q) ||
        it.name.toLowerCase().includes(q) ||
        it.subType.toLowerCase().includes(q) ||
        it.desc.toLowerCase().includes(q) ||
        (it.lore?.toLowerCase().includes(q) ?? false) ||
        (it.poisonEffect?.toLowerCase().includes(q) ?? false) ||
        (it.useEffect?.learnArtHint?.toLowerCase().includes(q) ?? false) ||
        linkedArtName.includes(q)
      )
    })
  }, [
    treasureVolumeItems,
    treasureTierFilter,
    treasureSubTypeFilter,
    treasureOwnedFilter,
    treasureQuery,
    ownedQtyMap,
    equippedItemIdSet,
  ])

  if (!menuOpen && !compendiumOpen) return null

  const isCompendiumMode = compendiumOpen
  const activeViewKey: MenuTabKey | CompendiumTabKey = isCompendiumMode
    ? activeCompendiumTab
    : activeMenuTab

  const closeActiveModal = () => {
    if (isCompendiumMode) closeCompendium()
    else closeMenu()
  }

  const curNode = NODE_MAP[currentNodeId] ?? WORLD_GRAPH.nodes[0]
  const activeRegionNode = NODE_MAP[activeRegionId] ?? curNode
  const locationLabel = campPos
    ? `${NODE_MAP[campPos.u]?.name ?? campPos.u}—${NODE_MAP[campPos.v]?.name ?? campPos.v}旷野营地`
    : (activeRegionNode?.name ?? '')
  const activeInteriorBldg = activeBuildingInteriorId
    ? BUILDING_DB_MAP[activeBuildingInteriorId]
    : null

  const activeMeta: NavItemMeta<string> = isCompendiumMode
    ? (COMPENDIUM_NAV_ITEMS.find((m) => m.key === activeCompendiumTab) ?? COMPENDIUM_NAV_ITEMS[0])
    : (SYSTEM_NAV_ITEMS.find((m) => m.key === activeMenuTab) ?? SYSTEM_NAV_ITEMS[0])
  const currentMountMeta = resolveMountMeta(mountKey)
  const speedInfo = getEffectiveSpeed(
    { mountKey, qinggongBonus, ridingSkill, agility },
    'official',
  )

  const openNpcLightbox = (npc: CompiledNpcRecord, mode: 'fullbody' | 'avatar') => {
    const url =
      mode === 'avatar' && npc.avatarUrl
        ? npc.avatarUrl
        : (npc.fullbodyUrl ?? npc.templateUrl)
    const kindLabel =
      mode === 'avatar' && npc.avatarUrl
        ? '独立半身头像'
        : npc.fullbodyUrl
          ? '独立全身立绘原画'
          : '门派身份母版全身像'
    setLightbox({
      url,
      title: `${npc.name} · ${npc.title}`,
      subtitle: `[${npc.id}] ${npc.factionName} · ${npc.role} · ${npc.realm} · 常驻【${npc.fullLocationLabel}】（${kindLabel}）`,
      npc,
      mode: mode === 'avatar' && npc.avatarUrl ? 'avatar' : 'fullbody',
    })
  }

  const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const parsed = await parseSaveJsonFile(file)
      if (importTargetSlot === 'DIRECT_LOAD') {
        loadFromEnvelope(parsed, true)
      } else {
        const rebound = { ...parsed, slotId: importTargetSlot }
        await putSaveEnvelope(rebound)
        await useGameStore.getState().refreshSaveSlots()
        setSaveNotice({
          text: `已将外部卷宗【${file.name}】验证并导入至【${importTargetSlot.toUpperCase()}】，可随时点击读取！`,
          tone: 'success',
        })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '导入 JSON 卷宗失败'
      setSaveNotice({ text: msg, tone: 'error' })
    }
  }

  const totalAttack = equipTotals.attack + artTotals.attack + weaponSynergy.totalSynergyAttack
  const totalDefense = equipTotals.defense + artTotals.defense
  const equippedCount = Object.values(equipped).filter(Boolean).length
  const equippedArtCount = Object.values(equippedArts).filter(Boolean).length
  const ownedWeaponsCount = WEAPONS_DB.filter(
    (w) => equipped.weapon === w.id || (inventoryQtyMap.get(w.id) ?? 0) > 0,
  ).length

  return (
    <div
      id={isCompendiumMode ? 'compendium-menu-overlay' : 'game-menu-overlay'}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeActiveModal()
      }}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2 sm:p-4 select-none"
    >
      {/* 菜单主窗体：1.5 倍宽幅展卷规制（1536px × 975px），随视口自适应防溢出 */}
      <div className="w-[96vw] max-w-[1536px] h-[975px] max-h-[95vh] bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* 顶部栏：独立区分【万象图鉴】与【行囊枢机】 */}
        <div
          className={`shrink-0 text-[#fbf2e0] border-b-2 border-[#c89d54] px-6 py-3.5 flex items-center justify-between ${
            isCompendiumMode
              ? 'bg-gradient-to-r from-[#183329] via-[#1f4235] to-[#183329]'
              : 'bg-[#261910]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <span
              className={`w-8 h-8 rounded border border-[#f5cb5c]/70 flex items-center justify-center song-serif font-bold text-base text-[#fff7e6] ${
                isCompendiumMode ? 'bg-[#1f5c3a]' : 'bg-[#8f1d14]'
              }`}
            >
              {isCompendiumMode ? '鉴' : '枢'}
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="song-serif font-bold text-lg tracking-widest text-amber-200">
                  {isCompendiumMode
                    ? '《北宋立志传》皇祐万象图鉴'
                    : '《北宋立志传》行囊枢机总览'}
                </h2>
                <span className="px-2.5 py-0.5 rounded bg-black/30 border border-[#c89d54]/50 text-xs text-[#f5dfb5]">
                  {activeMeta.numeral} · {activeMeta.label.replace(/\s+/g, '')}
                </span>
              </div>
              <p className="text-xs text-[#d6c5a5] mt-0.5">
                {isCompendiumMode
                  ? `${formatSongDate(dayCount, shichenIdx)} · 舆地43境 / 武林30派+11势力 / 群侠千人谱 / 武学216功 / 百兵谱 / 名驹28骑 / 博物180品 · 按 G 或 ESC 返回舆图`
                  : `${formatSongDate(dayCount, shichenIdx)} · 主角总览 / 披挂武学 / 行囊四库 / 卷宗存取 · 按 ESC 返回舆图`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeActiveModal}
            className="px-4 py-2 rounded bg-black/35 hover:bg-[#8f1d14] text-[#fbf2e0] border border-[#c89d54]/60 text-xs sm:text-sm font-bold song-serif transition cursor-pointer"
          >
            ✕ 返回江湖
          </button>
        </div>

        {/* 主体：左侧导航栏（严格按【图鉴】与【行囊枢机】分流） + 右侧独立模块舞台 */}
        <div className="flex-1 flex min-h-0">
          <nav className="w-60 shrink-0 bg-[#efe4cc] border-r border-[#bfa782] p-3.5 flex flex-col justify-between overflow-y-auto scroll-thin">
            {isCompendiumMode ? (
              <div className="space-y-1.5">
                {COMPENDIUM_NAV_ITEMS.map((item) => {
                  const isAct = item.key === activeCompendiumTab
                  return (
                    <div key={item.key} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setCompendiumTab(item.key)}
                        className={
                          isAct
                            ? 'w-full px-3.5 py-2.5 rounded-md border-2 border-[#f5cb5c] bg-[#1f5c3a] text-[#fff8eb] text-left song-serif font-bold text-sm shadow-md transition flex items-center justify-between cursor-pointer'
                            : 'w-full px-3.5 py-2.5 rounded-md border border-[#b59c77] bg-[#f8f1e1] hover:bg-[#e7d9bc] text-[#2b1a0e] text-left song-serif font-bold text-sm transition flex items-center justify-between cursor-pointer'
                        }
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-5 text-center text-xs font-mono">{item.numeral}</span>
                          <span>{item.label}</span>
                        </span>
                        <span className="text-xs opacity-75">▸</span>
                      </button>

                      {/* 博物图鉴三卷快捷分目：典籍书画 / 丹药毒物 / 雅器百工 */}
                      {item.key === 'treasures' && (
                        <div className="pl-3 space-y-1 pt-0.5">
                          {TREASURE_VOLUME_METAS.map((vol) => {
                            const isSubAct =
                              activeCompendiumTab === 'treasures' && treasureVolFilter === vol.key
                            const st = treasureCollectionStats[vol.key]
                            return (
                              <button
                                key={vol.key}
                                type="button"
                                onClick={() => {
                                  setCompendiumTab('treasures')
                                  setTreasureVolFilter(vol.key)
                                  setTreasureSubTypeFilter('ALL')
                                }}
                                className={`w-full px-2.5 py-1.5 rounded border text-left text-xs song-serif flex items-center justify-between transition cursor-pointer ${
                                  isSubAct
                                    ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] font-bold shadow-xs'
                                    : 'bg-[#faf4e6] hover:bg-[#e7d9bc] text-[#4a3219] border-[#cbb693]'
                                }`}
                              >
                                <span className="truncate">
                                  {vol.volNumeral} · {vol.label}
                                </span>
                                <span className="font-mono text-[10px] opacity-85">
                                  {st.owned}/{st.total}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-1.5">
                {SYSTEM_NAV_ITEMS.map((item) => {
                  const isAct = item.key === activeMenuTab
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setMenuTab(item.key)}
                      className={
                        isAct
                          ? 'w-full px-3.5 py-2.5 rounded-md border-2 border-[#f5cb5c] bg-[#8f1d14] text-[#fff8eb] text-left song-serif font-bold text-sm shadow-md transition flex items-center justify-between cursor-pointer'
                          : 'w-full px-3.5 py-2.5 rounded-md border border-[#b59c77] bg-[#f8f1e1] hover:bg-[#e7d9bc] text-[#2b1a0e] text-left song-serif font-bold text-sm transition flex items-center justify-between cursor-pointer'
                      }
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-5 text-center text-xs font-mono">{item.numeral}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-xs opacity-75">▸</span>
                    </button>
                  )
                })}
              </div>
            )}

            {isCompendiumMode ? (
              <div className="pt-3 mt-3 border-t border-[#c7b18e] text-xs text-[#5e472d] space-y-1">
                <div className="flex justify-between">
                  <span>山海舆地</span>
                  <span className="font-mono font-bold text-[#1f5c3a]">
                    {ID_REGISTRY.counts.regions} 地 / {ID_REGISTRY.counts.totalBuildings} 建
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>门派势力</span>
                  <span className="font-mono font-bold text-[#8f1d14]">
                    {ID_REGISTRY.counts.totalSects} 派 + {ID_REGISTRY.counts.otherOrganizations} 组织
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>群侠名录</span>
                  <span className="font-mono font-bold text-[#23180f]">
                    {ID_REGISTRY.counts.npcs} 人
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>所习武学</span>
                  <span className="font-mono font-bold text-[#781710]">
                    {learnedArts.length} / {ID_REGISTRY.counts.martialArts} 门
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>百兵收录</span>
                  <span className="font-mono font-bold text-[#52391e]">
                    {ownedWeaponsCount} / {WEAPONS_DB.length} 兵
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>博物收录</span>
                  <span className="font-mono font-bold text-[#184f35]">
                    {treasureCollectionStats.ALL.owned} / {treasureCollectionStats.ALL.total} 品
                  </span>
                </div>
              </div>
            ) : (
              <div className="pt-3.5 mt-3.5 border-t border-[#c7b18e] text-xs text-[#5e472d] space-y-1.5">
                <div className="flex justify-between">
                  <span>当前时辰</span>
                  <span className="font-semibold text-[#781710]">
                    {formatSongDate(dayCount, shichenIdx).split(' · ').slice(-2).join(' · ')}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="shrink-0">所在地域</span>
                  <span className="font-semibold text-right truncate">{locationLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>随身披挂</span>
                  <span className="font-mono font-bold text-[#1b5132]">{equippedCount} / 7 槽</span>
                </div>
                <div className="flex justify-between">
                  <span>运使武学</span>
                  <span className="font-mono font-bold text-[#781710]">
                    {equippedArtCount} / 6 槽（习 {learnedArts.length} 门）
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>已懒加载</span>
                  <span className="font-mono font-bold text-[#52391e]">
                    {telemetry.loadedCount}/{ASSET_MANIFEST.summary.totalExtractedImageFiles}
                  </span>
                </div>
              </div>
            )}
          </nav>

          {/* 右侧子面板动态内容舞台 */}
          <section className="flex-1 overflow-y-auto scroll-thin p-6 bg-[#faf4e6] flex flex-col justify-between gap-5">
            <div className="space-y-5">
              {/* 模块头 */}
              <div className="flex items-start justify-between border-b-2 border-[#cbb693] pb-3.5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-md border-2 border-[#f2c97d] text-[#fff8eb] flex items-center justify-center song-serif font-bold text-2xl shadow ${
                      isCompendiumMode ? 'bg-[#1f5c3a]' : 'bg-[#8f1d14]'
                    }`}
                  >
                    {activeMeta.seal}
                  </div>
                  <div>
                    <h3 className="song-serif font-bold text-xl text-[#23180f] tracking-wide">
                      {activeMeta.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6b5235] mt-0.5">{activeMeta.subtitle}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded border text-xs font-semibold shrink-0 bg-[#e1f0e8] border-[#6aa384] text-[#184f35]">
                  {activeMeta.badge}
                </span>
              </div>

              {/* ==================== 壹：独立主角面板 ==================== */}
              {activeViewKey === 'hero' && (() => {
                const hpPct = Math.min(100, Math.round((hp / Math.max(1, maxHp)) * 100))
                const mpPct = Math.min(100, Math.round((mp / Math.max(1, maxMp)) * 100))
                const staPct = Math.min(100, Math.round((stamina / Math.max(1, maxStamina)) * 100))
                const mainNeigong = equippedArts.neigong
                  ? MARTIAL_ART_DB_MAP[equippedArts.neigong]
                  : null
                const mainQinggong = equippedArts.qinggong
                  ? MARTIAL_ART_DB_MAP[equippedArts.qinggong]
                  : null
                const heroImgUrl = '/assets/characters/templates/tpl_song_scholar_fb.jpg'

                return (
                  <div className="space-y-5 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      {/* 左侧：少侠立绘名帖（支持点击放大） */}
                      <div className="lg:col-span-4 bg-[#efe4cc] border-2 border-[#b5986e] rounded-lg p-4 flex flex-col justify-between gap-3 shadow-inner">
                        <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
                          <div>
                            <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] text-[11px] font-bold song-serif">
                              江湖少侠 · 初涉汴京
                            </span>
                            <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1">
                              无名少侠（寒门游侠）
                            </h4>
                          </div>
                          <div className="text-right text-xs text-[#6b5235]">
                            <div>骨龄：十八岁</div>
                            <div className="font-semibold text-[#781710]">境界：三流好手</div>
                          </div>
                        </div>

                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            setLightbox({
                              url: heroImgUrl,
                              title: '江湖少侠 · 行侠全身绘像',
                              subtitle: `皇祐二年驻足【${locationLabel}】 · 已佩 ${equippedCount}/7 披挂 · 已运 ${equippedArtCount}/6 武学`,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setLightbox({
                                url: heroImgUrl,
                                title: '江湖少侠 · 行侠全身绘像',
                                subtitle: `皇祐二年驻足【${locationLabel}】 · 已佩 ${equippedCount}/7 披挂 · 已运 ${equippedArtCount}/6 武学`,
                              })
                            }
                          }}
                          className="w-full aspect-[3/4] max-h-[380px] mx-auto rounded-md bg-[#1e150e] border-2 border-[#8c6e46] overflow-hidden relative group cursor-zoom-in shadow-md flex items-center justify-center"
                        >
                          <img
                            src={resolveAssetUrl(heroImgUrl)}
                            alt="少侠全身像"
                            onLoad={() => recordAssetLoaded(heroImgUrl)}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <span className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 text-[#fff8eb] text-[11px] flex items-center gap-1 opacity-85 group-hover:opacity-100 transition">
                            <Maximize2 className="w-3 h-3 text-amber-300" />
                            <span>点击放大</span>
                          </span>
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 py-2 text-[#f5dfb5] text-xs flex items-center justify-between gap-2">
                            <span className="song-serif font-bold truncate">
                              驻留：{locationLabel}
                            </span>
                            <span className="font-mono text-amber-200">
                              银 {silver}两 · 粮 {food}份
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setMenuTab('loadout')}
                            className="px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif text-xs shadow cursor-pointer transition"
                          >
                            前往披挂与武学 →
                          </button>
                          <button
                            type="button"
                            onClick={() => setMenuTab('bag')}
                            className="px-3 py-2 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 border border-[#c89d54]/70 font-bold song-serif text-xs shadow cursor-pointer transition"
                          >
                            开启行囊四库 →
                          </button>
                        </div>
                      </div>

                      {/* 右侧：生存三维条、实战四维、先天三维禀赋、行军脚力与当前运功速览 */}
                      <div className="lg:col-span-8 flex flex-col justify-between gap-4">
                        {/* 1) 气血 / 内力 / 体能 进度条与调息 */}
                        <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-3">
                          <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
                            <span className="song-serif font-bold text-base text-[#23180f]">
                              周身气血 · 真气内息 · 日常体能
                            </span>
                            <button
                              type="button"
                              onClick={restRecoverStamina}
                              title="花费 3 两纹银于客舍小憩三个时辰，回满体能并平复气血内息"
                              className="px-3 py-1 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] text-xs font-bold song-serif cursor-pointer shadow-sm transition"
                            >
                              客舍调息（3两银 · 回满体能）
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                            <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="font-bold text-[#6b5033] song-serif">气血（生命）</span>
                                <span className="font-mono font-bold text-[#7f1d1d]">
                                  {hp} / {maxHp}
                                </span>
                              </div>
                              <div className="w-full h-2.5 rounded-full bg-[#dccab0] overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#8f1d14] to-[#dc2626]"
                                  style={{ width: `${hpPct}%` }}
                                />
                              </div>
                              <div className="text-[11px] text-[#7a6042] mt-1">
                                披挂 +{equipTotals.maxHp} · 武学 +{artTotals.maxHp}
                              </div>
                            </div>

                            <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="font-bold text-[#6b5033] song-serif">内力（真气）</span>
                                <span className="font-mono font-bold text-[#1e3a8a]">
                                  {mp} / {maxMp}
                                </span>
                              </div>
                              <div className="w-full h-2.5 rounded-full bg-[#dccab0] overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6]"
                                  style={{ width: `${mpPct}%` }}
                                />
                              </div>
                              <div className="text-[11px] text-[#7a6042] mt-1">
                                披挂 +{equipTotals.maxMp} · 武学 +{artTotals.maxMp}
                              </div>
                            </div>

                            <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="font-bold text-[#6b5033] song-serif">体能（精力）</span>
                                <span className="font-mono font-bold text-[#185a37]">
                                  {stamina} / {maxStamina}
                                </span>
                              </div>
                              <div className="w-full h-2.5 rounded-full bg-[#dccab0] overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#047857] to-[#10b981]"
                                  style={{ width: `${staPct}%` }}
                                />
                              </div>
                              <div className="text-[11px] text-[#7a6042] mt-1">
                                历练演武与强行军消耗 · 披挂 +{equipTotals.maxStamina}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2) 实战攻防四维 vs 先天三维禀赋 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-2.5">
                            <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1.5 flex items-center justify-between">
                              <span>实战交锋属性（装备+武学实时合计）</span>
                              <span className="text-[11px] text-[#8f1d14] font-mono">回合交锋</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5 text-xs">
                              <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                <div className="text-[#6b5235]">外功杀伤加成</div>
                                <div className="font-mono font-bold text-base text-[#8f1d14] mt-0.5">
                                  +{totalAttack}
                                </div>
                                <div className="text-[10px] text-[#7a6042]">
                                  兵刃+{equipTotals.attack} / 招式+{artTotals.attack}
                                  {weaponSynergy.totalSynergyAttack > 0
                                    ? ` / 共鸣+${weaponSynergy.totalSynergyAttack}`
                                    : ''}
                                </div>
                              </div>
                              <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                <div className="text-[#6b5235]">护体防御招架</div>
                                <div className="font-mono font-bold text-base text-[#1b5132] mt-0.5">
                                  +{totalDefense}
                                </div>
                                <div className="text-[10px] text-[#7a6042]">
                                  衣甲+{equipTotals.defense} / 功体+{artTotals.defense}
                                </div>
                              </div>
                              <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                <div className="text-[#6b5235]">实战身法（集气/闪避）</div>
                                <div className="font-mono font-bold text-base text-[#23180f] mt-0.5">
                                  {agility}
                                </div>
                                <div className="text-[10px] text-[#7a6042]">
                                  鞋履+{equipTotals.agility} / 轻功+{artTotals.agility}
                                </div>
                              </div>
                              <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                <div className="text-[#6b5235]">周身抗性（毒寒火封）</div>
                                <div className="font-mono font-bold text-base text-[#5b3b73] mt-0.5">
                                  {res}
                                </div>
                                <div className="text-[10px] text-[#7a6042]">
                                  佩饰+{equipTotals.res} / 心法+{artTotals.res}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] flex flex-col justify-between gap-2.5">
                            <div>
                              <div className="song-serif font-bold text-sm text-[#23180f] border-b border-[#cbb693] pb-1.5 flex items-center justify-between">
                                <span>先天三维禀赋（非战斗养成资质）</span>
                                <span className="text-[11px] text-[#6b5235]">满分 100</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2.5 text-center mt-2.5">
                                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                  <div className="text-xs text-[#6b5235] song-serif">根 骨</div>
                                  <div className="font-mono font-bold text-lg text-[#781710] mt-0.5">
                                    {DEFAULT_HERO_TALENTS.根骨}
                                  </div>
                                  <div className="text-[10px] text-[#7a6042]">内外功周天倍率</div>
                                </div>
                                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                  <div className="text-xs text-[#6b5235] song-serif">悟 性</div>
                                  <div className="font-mono font-bold text-lg text-[#1e3a8a] mt-0.5">
                                    {DEFAULT_HERO_TALENTS.悟性}
                                  </div>
                                  <div className="text-[10px] text-[#7a6042]">秘籍参悟与拆招</div>
                                </div>
                                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693]">
                                  <div className="text-xs text-[#6b5235] song-serif">颜 值</div>
                                  <div className="font-mono font-bold text-lg text-[#5b3b73] mt-0.5">
                                    {DEFAULT_HERO_TALENTS.颜值}
                                  </div>
                                  <div className="text-[10px] text-[#7a6042]">结交印象与奇遇</div>
                                </div>
                              </div>
                            </div>

                            {/* 官道行军速度与当前主运功法概览 */}
                            <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693] flex flex-wrap items-center justify-between gap-2 text-xs">
                              <div>
                                <span className="text-[#6b5235]">千里行军脚力：</span>
                                <strong className="font-mono text-[#1b5132] ml-1">
                                  {speedInfo.baseDailyLi} 里/日（+{speedInfo.modifierPct}%）
                                </strong>
                                <span className="text-[#7a6042] ml-2">
                                  [{currentMountMeta.name}]
                                </span>
                              </div>
                              <div className="text-[#52391e]">
                                主运：{mainNeigong ? mainNeigong.cleanName : '未运内功'} ·{' '}
                                {mainQinggong
                                  ? `${mainQinggong.cleanName} (+${Math.round(qinggongBonus * 100)}%)`
                                  : '基础步法'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 下方通栏：北宋十艺百工修为 */}
                    <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="song-serif font-bold text-base text-[#52391e]">
                          北宋十艺百工修为（满分 100 · 关系天阶绝学参悟、书院治学与名宿雅集论道）
                        </span>
                        <span className="text-xs text-[#7a6042]">
                          佩戴文雅配饰或于【行囊四库】研读经史字画可精进艺道
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                        <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-center">
                          <div className="text-xs text-[#6b5235] song-serif font-semibold">骑术</div>
                          <strong className="font-mono text-base text-[#8f1d14]">{ridingSkill}</strong>
                          <div className="w-full h-1 bg-[#e2d3b9] rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-[#8f1d14]"
                              style={{ width: `${Math.min(100, ridingSkill)}%` }}
                            />
                          </div>
                        </div>
                        {Object.entries(skills).map(([k, v]) => (
                          <div
                            key={k}
                            className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-center"
                          >
                            <div className="text-xs text-[#6b5235] song-serif font-semibold">{k}</div>
                            <strong className="font-mono text-base text-[#23180f]">{v}</strong>
                            <div className="w-full h-1 bg-[#e2d3b9] rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-[#5c4024]"
                                style={{ width: `${Math.min(100, v)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* ==================== 贰：披挂与武学面板（7槽随身装备 + 6槽运使武学 + 所习武学列表） ==================== */}
              {activeViewKey === 'loadout' && (() => {
                // --- 上半卷：7槽装备逻辑 ---
                const leftSlots = EQUIPMENT_SLOT_METAS.filter((m) => m.column === 'left')
                const rightSlots = EQUIPMENT_SLOT_METAS.filter((m) => m.column === 'right')
                const mountSlotMeta = EQUIPMENT_SLOT_METAS.find((m) => m.slot === 'mount')!
                const activeSlotMeta =
                  EQUIPMENT_SLOT_METAS.find((m) => m.slot === selectedEquipSlot) ??
                  EQUIPMENT_SLOT_METAS[0]
                const activeEquippedItemId = equipped[selectedEquipSlot]
                const activeEquippedDef = activeEquippedItemId
                  ? ITEM_DB_MAP[activeEquippedItemId]
                  : null
                const compatibleBagItems = inventory
                  .map((st) => ({ ...st, def: ITEM_DB_MAP[st.itemId] }))
                  .filter((x) => x.def && canItemFitSlot(x.def, selectedEquipSlot))

                // --- 下半卷：6槽武学与所习武学逻辑 ---
                const activeArtSlotMeta =
                  MARTIAL_ART_SLOT_METAS.find((m) => m.slot === selectedArtSlot) ??
                  MARTIAL_ART_SLOT_METAS[0]
                const activeEquippedArtId = equippedArts[selectedArtSlot]
                const activeEquippedArt = activeEquippedArtId
                  ? MARTIAL_ART_DB_MAP[activeEquippedArtId]
                  : null
                const activeEquippedArtMastery = activeEquippedArtId
                  ? learnedMap.get(activeEquippedArtId)
                  : null

                const compatibleLearnedArts = learnedArts
                  .map((entry) => ({
                    ...entry,
                    art: MARTIAL_ART_DB_MAP[entry.artId],
                  }))
                  .filter(
                    (x): x is LearnedArtEntry & { art: CompiledMartialArtRecord } =>
                      Boolean(x.art) && canArtFitSlot(x.art!, selectedArtSlot),
                  )

                const inspectedEntry =
                  learnedArts.find((x) => x.artId === inspectedLearnedArtId) ?? learnedArts[0]
                const inspectedArt = inspectedEntry
                  ? MARTIAL_ART_DB_MAP[inspectedEntry.artId]
                  : null

                const renderVisualSlotCard = (meta: (typeof EQUIPMENT_SLOT_METAS)[number]) => {
                  const itemId = equipped[meta.slot]
                  const itemDef = itemId ? ITEM_DB_MAP[itemId] : null
                  const isSelected = selectedEquipSlot === meta.slot
                  const rStyle = itemDef ? RARITY_STYLE_MAP[itemDef.rarity] : null

                  return (
                    <button
                      key={meta.slot}
                      type="button"
                      onClick={() => setSelectedEquipSlot(meta.slot)}
                      className={`w-full text-left p-2.5 rounded-md border-2 transition cursor-pointer flex items-center gap-2.5 relative ${
                        isSelected
                          ? 'ring-2 ring-[#8f1d14] border-[#8f1d14] bg-[#fff9ec] shadow-md'
                          : itemDef && rStyle
                            ? `${rStyle.cardBg} ${rStyle.borderCls} hover:brightness-98 shadow-sm`
                            : 'bg-[#f3ead6]/80 border-dashed border-[#bfa680] hover:border-[#8c6e46]'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-md border flex flex-col items-center justify-center shrink-0 ${
                          itemDef && rStyle
                            ? `${rStyle.badgeBg} ${rStyle.badgeText} border-[#f5cb5c]/60 shadow-inner`
                            : 'bg-[#e5d7bc] text-[#6b5235] border-[#bfa680]'
                        }`}
                      >
                        {renderSlotIcon(meta.slot, 'w-4 h-4')}
                        <span className="text-[9px] song-serif font-bold mt-0.5 leading-none">
                          {meta.seal}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-bold text-[#7a5f3e] song-serif">
                            【{meta.shortLabel}】
                          </span>
                          {itemDef && rStyle ? (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {itemDef.rarity}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#9a8262]">未佩备</span>
                          )}
                        </div>
                        <div
                          className={`font-bold song-serif truncate mt-0.5 ${
                            itemDef ? 'text-xs sm:text-sm text-[#23180f]' : 'text-xs text-[#8a7254]'
                          }`}
                        >
                          {itemDef ? itemDef.name : `空置 · 点击选配${meta.shortLabel}`}
                        </div>
                      </div>
                    </button>
                  )
                }

                const renderArtSlotCard = (meta: (typeof MARTIAL_ART_SLOT_METAS)[number]) => {
                  const artId = equippedArts[meta.slot]
                  const art = artId ? MARTIAL_ART_DB_MAP[artId] : null
                  const mastery = artId ? learnedMap.get(artId) : null
                  const isSelected = selectedArtSlot === meta.slot
                  const rStyle = art ? RARITY_STYLE_MAP[art.tier] : null

                  return (
                    <button
                      key={meta.slot}
                      type="button"
                      onClick={() => {
                        setSelectedArtSlot(meta.slot)
                        if (artId) setInspectedLearnedArtId(artId)
                      }}
                      className={`w-full text-left p-2.5 rounded-md border-2 transition cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'ring-2 ring-[#8f1d14] border-[#8f1d14] bg-[#fff9ec] shadow-md'
                          : art && rStyle
                            ? `${rStyle.cardBg} ${rStyle.borderCls} hover:brightness-98 shadow-sm`
                            : 'bg-[#f3ead6]/80 border-dashed border-[#bfa680] hover:border-[#8c6e46]'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-md border flex flex-col items-center justify-center shrink-0 ${
                          art && rStyle
                            ? `${rStyle.badgeBg} ${rStyle.badgeText} border-[#f5cb5c]/60`
                            : 'bg-[#e5d7bc] text-[#6b5235] border-[#bfa680]'
                        }`}
                      >
                        {renderArtSlotIcon(meta.slot, 'w-4 h-4')}
                        <span className="text-[9px] song-serif font-bold mt-0.5 leading-none">
                          {meta.seal}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-bold text-[#7a5f3e] song-serif">
                            【{meta.shortLabel}】
                          </span>
                          {art && rStyle && mastery ? (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {art.fullTier} · {mastery.level}重
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#9a8262]">未运使</span>
                          )}
                        </div>
                        <div
                          className={`font-bold song-serif truncate mt-0.5 ${
                            art ? 'text-xs sm:text-sm text-[#23180f]' : 'text-xs text-[#8a7254]'
                          }`}
                        >
                          {art ? art.name : `空置 · 点击选配${meta.shortLabel}`}
                        </div>
                      </div>
                    </button>
                  )
                }

                return (
                  <div className="space-y-5 text-xs">
                    {/* 一、 7 槽位可视化随身披挂区 */}
                    <div className="p-4 rounded-lg bg-[#efe4cc] border-2 border-[#b5986e] space-y-3.5 shadow-inner">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cbb693] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] song-serif font-bold text-xs">
                            上卷 · 随身披挂
                          </span>
                          <span className="song-serif font-bold text-sm sm:text-base text-[#23180f]">
                            少侠七槽可视化装备栏（武器 · 服饰 · 鞋履 · 弓箭 · 双配饰 · 坐骑）
                          </span>
                        </div>
                        <span className="text-xs text-[#6b5235] font-mono">
                          披挂增益：攻+{equipTotals.attack}
                          {weaponSynergy.totalSynergyAttack > 0
                            ? `（兵武共鸣 +${weaponSynergy.totalSynergyAttack}）`
                            : ''}{' '}
                          · 防+{equipTotals.defense} · 血+{equipTotals.maxHp} · 内+{equipTotals.maxMp}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                        {/* 左：纸娃娃对称可视化 7 槽位阵列 */}
                        <div className="lg:col-span-7 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3.5 flex flex-col justify-between gap-3">
                          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                            <div className="sm:col-span-4 space-y-2">
                              {leftSlots.map((m) => renderVisualSlotCard(m))}
                            </div>

                            <div className="sm:col-span-3 flex flex-col items-center justify-center py-2.5 px-2 rounded-md bg-gradient-to-b from-[#f2e6ce] to-[#e6d5b5] border border-[#c8b28e] text-center">
                              <div className="w-24 h-32 rounded border border-[#9e8462] overflow-hidden bg-[#261910] shadow relative">
                                <img
                                  src={resolveAssetUrl(
                                    '/assets/characters/templates/tpl_song_scholar_fb.jpg',
                                  )}
                                  alt="少侠披挂立绘"
                                  onLoad={() =>
                                    recordAssetLoaded(
                                      '/assets/characters/templates/tpl_song_scholar_fb.jpg',
                                    )
                                  }
                                  className="w-full h-full object-cover object-top opacity-95"
                                />
                                <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[#f5dfb5] text-[10px] py-0.5 song-serif">
                                  已佩 {equippedCount} / 7 件
                                </span>
                              </div>
                              <div className="mt-2 text-[11px] font-mono font-bold text-[#7f1d1d]">
                                攻+{equipTotals.attack + weaponSynergy.totalSynergyAttack} · 防+
                                {equipTotals.defense}
                              </div>
                              <div className="text-[10px] text-[#52391e]">
                                {currentMountMeta.name}
                              </div>
                            </div>

                            <div className="sm:col-span-4 space-y-2">
                              {rightSlots.map((m) => renderVisualSlotCard(m))}
                            </div>
                          </div>

                          <div className="pt-1.5 border-t border-dashed border-[#cbb693]">
                            {renderVisualSlotCard(mountSlotMeta)}
                          </div>
                        </div>

                        {/* 右：当前选中装备槽位详情 & 快速替换列表 */}
                        <div className="lg:col-span-5 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3.5 flex flex-col justify-between gap-3">
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between border-b border-[#dccab0] pb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center">
                                  {renderSlotIcon(activeSlotMeta.slot, 'w-4 h-4')}
                                </span>
                                <div>
                                  <div className="song-serif font-bold text-sm text-[#23180f]">
                                    槽位检视：{activeSlotMeta.label}
                                  </div>
                                  <div className="text-[11px] text-[#6b5235]">
                                    {activeSlotMeta.hint}
                                  </div>
                                </div>
                              </div>
                              {activeEquippedDef && (
                                <button
                                  type="button"
                                  onClick={() => unequipSlot(activeSlotMeta.slot)}
                                  className="px-2.5 py-1 rounded bg-[#7f1d1d] hover:bg-[#991b1b] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition shadow-sm"
                                >
                                  {activeSlotMeta.slot === 'mount' ? '下马卸鞍' : '卸下装备'}
                                </button>
                              )}
                            </div>

                            {activeEquippedDef ? (
                              <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
                                    {activeSlotMeta.slot === 'mount' ? '当前乘骑' : '当前穿戴'}：
                                    {activeEquippedDef.name}
                                  </span>
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                                      RARITY_STYLE_MAP[activeEquippedDef.rarity].badgeBg
                                    } ${RARITY_STYLE_MAP[activeEquippedDef.rarity].badgeText}`}
                                  >
                                    {activeEquippedDef.weaponMeta
                                      ? `${activeEquippedDef.weaponMeta.fullTier} · ${activeEquippedDef.weaponMeta.weaponType}`
                                      : activeEquippedDef.mountMeta
                                        ? `${activeEquippedDef.mountMeta.fullTier} · ${activeEquippedDef.mountMeta.breedCategory}`
                                        : activeEquippedDef.rarity}
                                  </span>
                                </div>
                                {activeEquippedDef.weaponMeta && (
                                  <div className="text-[11px] text-[#6b5235] font-mono">
                                    编号 {activeEquippedDef.id} · 战棋射程{' '}
                                    {activeEquippedDef.weaponMeta.attackRange} 格 · 劲力【
                                    {activeEquippedDef.weaponMeta.forceTrait}】
                                    {activeEquippedDef.weaponMeta.specialTag
                                      ? ` · 特效【${activeEquippedDef.weaponMeta.specialTag}】`
                                      : ''}
                                  </div>
                                )}
                                {activeEquippedDef.mountMeta && (
                                  <div className="text-[11px] text-[#6b5235] font-mono">
                                    编号 {activeEquippedDef.id} · 日行基础{' '}
                                    {activeEquippedDef.mountMeta.baseSpeed} 里 · 地貌【
                                    {activeEquippedDef.mountMeta.terrainTrait}+
                                    {activeEquippedDef.mountMeta.terrainBonusPct}%】
                                    {activeEquippedDef.mountMeta.specialTag
                                      ? ` · 神骏【${activeEquippedDef.mountMeta.specialTag}】`
                                      : ''}
                                  </div>
                                )}
                                <p className="text-xs text-[#4a3520] leading-relaxed">
                                  {activeEquippedDef.desc}
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {formatBonusBadges(activeEquippedDef.equipBonus).map((b) => (
                                    <span
                                      key={b}
                                      className="px-2 py-0.5 rounded bg-[#fff9ec] border border-[#bfa680] text-[11px] font-mono font-semibold text-[#7f1d1d]"
                                    >
                                      {b}
                                    </span>
                                  ))}
                                </div>
                                {activeSlotMeta.slot === 'weapon' &&
                                  weaponSynergy.matches.length > 0 && (
                                    <div className="mt-1.5 pt-1.5 border-t border-[#cbb693] space-y-1">
                                      <div className="text-[11px] font-bold text-[#8f1d14] song-serif">
                                        ★ 兵武共鸣已激活（合计外功 +{weaponSynergy.totalSynergyAttack}）：
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {weaponSynergy.matches.map((m) => (
                                          <span
                                            key={`${m.slot}-${m.artId}`}
                                            className="px-2 py-0.5 rounded bg-[#8f1d14]/10 border border-[#8f1d14]/40 text-[10px] text-[#781710] font-medium"
                                          >
                                            {m.isSignature ? '本命绝配' : '兵种契合'}《{m.artName}》+
                                            {m.pct}%（外功 +{m.bonusAttack}）
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            ) : (
                              <div className="p-3 rounded border border-dashed border-[#bfa680] bg-[#f5ecd9] text-center text-[#6b5235] text-xs">
                                当前【{activeSlotMeta.shortLabel}】槽位空置。
                                {activeSlotMeta.slot === 'mount'
                                  ? '（未乘坐骑时大地图按【徒步急行 60 里/日】行军，可从下方或【图鉴·坐骑图鉴】选骑上鞍）'
                                  : '（本卷披挂留待后续扩充，百兵谱 100 种武器与名驹谱 28 种坐骑已先行定稿）'}
                              </div>
                            )}

                            <div className="space-y-1.5 pt-1">
                              <div className="font-bold song-serif text-xs text-[#52391e] flex items-center justify-between">
                                <span>行囊内可换佩的【{activeSlotMeta.shortLabel}】</span>
                                <span className="font-mono text-[11px] text-[#7a6042]">
                                  可用 {compatibleBagItems.length} 件
                                </span>
                              </div>
                              {compatibleBagItems.length > 0 ? (
                                <div className="space-y-1.5 max-h-44 overflow-y-auto scroll-thin pr-1">
                                  {compatibleBagItems.map(({ itemId, qty, def }) => {
                                    const reqCheck = def.mountMeta
                                      ? checkMountEquipRequirements(def.mountMeta, playerEquipCtx)
                                      : checkWeaponEquipRequirements(def.weaponMeta, playerEquipCtx)
                                    const unmetLabels = reqCheck.details
                                      .filter((d) => !d.met)
                                      .map((d) => `${d.stat}≥${d.min}(现${d.current})`)
                                    return (
                                      <div
                                        key={itemId}
                                        className="p-2 rounded bg-[#fffaf0] border border-[#cbb693] flex items-center justify-between gap-2"
                                      >
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="font-bold song-serif text-xs text-[#23180f] truncate">
                                              {def.name}
                                            </span>
                                            <span
                                              className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                                RARITY_STYLE_MAP[def.rarity].badgeBg
                                              } ${RARITY_STYLE_MAP[def.rarity].badgeText}`}
                                            >
                                              {def.weaponMeta
                                                ? `${def.weaponMeta.fullTier}·${def.weaponMeta.weaponType}`
                                                : def.mountMeta
                                                  ? `${def.mountMeta.fullTier}·${def.mountMeta.breedCategory}`
                                                  : def.rarity}
                                            </span>
                                            {qty > 1 && (
                                              <span className="font-mono text-[10px] text-[#6b5235]">
                                                ×{qty}
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-[11px] text-[#7f1d1d] font-mono truncate mt-0.5">
                                            {formatBonusBadges(def.equipBonus).join(' · ')}
                                          </div>
                                          {!reqCheck.ok && (
                                            <div className="text-[10px] text-[#b91c1c] mt-0.5">
                                              天阶门槛未达：{unmetLabels.join('、')}
                                            </div>
                                          )}
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            equipItemToSlot(itemId, activeSlotMeta.slot)
                                          }
                                          className={`px-2.5 py-1 rounded font-bold song-serif text-xs shrink-0 cursor-pointer transition ${
                                            reqCheck.ok
                                              ? 'bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb]'
                                              : 'bg-[#9a8262] hover:bg-[#7d684c] text-[#fff8eb]'
                                          }`}
                                        >
                                          {reqCheck.ok
                                            ? activeSlotMeta.slot === 'mount'
                                              ? '乘骑'
                                              : '装备'
                                            : '门槛受限'}
                                        </button>
                                      </div>
                                    )
                                  })}
                                </div>
                              ) : (
                                <div className="p-2.5 rounded bg-[#f5ecd9] text-xs text-[#7a6042] text-center">
                                  行囊中暂无其他可佩备的{activeSlotMeta.shortLabel}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-[11px] text-[#7a6042] border-t border-[#dccab0] pt-2 flex flex-wrap items-center justify-between gap-2">
                            <span>卸下的装备归入【行囊杂物】</span>
                            <div className="flex items-center gap-2.5">
                              <button
                                type="button"
                                onClick={() => openCompendium('armory')}
                                className="text-[#1f5c3a] font-bold underline cursor-pointer"
                              >
                                百兵谱 100 兵图鉴 →
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setBagCategory('misc')
                                  setMenuTab('bag')
                                }}
                                className="text-[#8f1d14] font-bold underline cursor-pointer"
                              >
                                前往行囊 →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 二、 6 槽位主角武学运使与所习武学演练区 */}
                    <div className="p-4 rounded-lg bg-[#efe4cc] border-2 border-[#8c6e46] space-y-4 shadow-inner">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cbb693] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#261910] text-amber-200 song-serif font-bold text-xs border border-[#c89d54]/60">
                            下卷 · 武学修为
                          </span>
                          <span className="song-serif font-bold text-sm sm:text-base text-[#23180f]">
                            少侠武学配招（1 主运内功 + 1 轻功身法 + 4 出战招式）与所习功法火候
                          </span>
                        </div>
                        <span className="text-xs text-[#781710] font-mono font-semibold">
                          武学增益：攻+{artTotals.attack} · 防+{artTotals.defense} · 血+
                          {artTotals.maxHp} · 内+{artTotals.maxMp} · 身法+{artTotals.agility} · 轻功+
                          {Math.round(artTotals.qinggongBonus * 100)}%
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                        {/* 左：6 大武学装配槽位（2功体 + 4招式） */}
                        <div className="lg:col-span-7 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3.5 space-y-3">
                          <div>
                            <div className="text-xs font-bold song-serif text-[#52391e] mb-2 flex items-center justify-between">
                              <span>周天根基功体（内功心法 · 轻功身法）</span>
                              <span className="text-[11px] text-[#7a6042] font-normal">
                                轻功槽直接决定大地图行军提速
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {MARTIAL_ART_SLOT_METAS.filter((m) => m.group === 'core').map((m) =>
                                renderArtSlotCard(m),
                              )}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-dashed border-[#cbb693]">
                            <div className="text-xs font-bold song-serif text-[#52391e] mb-2 flex items-center justify-between">
                              <span>随身出战四招（拳指 · 刀剑 · 枪棍 · 毒暗音）</span>
                              <span className="text-[11px] text-[#7a6042] font-normal">
                                回合交锋【出招】时可轮番施展的四门绝技
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {MARTIAL_ART_SLOT_METAS.filter((m) => m.group === 'moves').map((m) =>
                                renderArtSlotCard(m),
                              )}
                            </div>
                          </div>

                          {/* 已习得全部武学名录（含重数进度与演练按钮） */}
                          <div className="pt-2.5 border-t border-[#cbb693] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
                                少侠已习得武学全表（共 {learnedArts.length} 门 · 点击检视或演武精修）
                              </span>
                              <button
                                type="button"
                                onClick={() => openCompendium('martialArts')}
                                className="text-[11px] text-[#8f1d14] font-bold hover:underline cursor-pointer"
                              >
                                查阅天下 216 武学总纲 →
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto scroll-thin pr-1">
                              {learnedArts.map((entry) => {
                                const art = MARTIAL_ART_DB_MAP[entry.artId]
                                if (!art) return null
                                const isInspected = inspectedEntry?.artId === entry.artId
                                const isEquippedAnywhere = Object.values(equippedArts).includes(
                                  entry.artId,
                                )
                                const rStyle = RARITY_STYLE_MAP[art.tier]
                                const reqExp = getArtExpRequired(art, entry.level)
                                const expPct =
                                  entry.level >= 10 || reqExp <= 0
                                    ? 100
                                    : Math.min(100, Math.round((entry.exp / reqExp) * 100))
                                return (
                                  <div
                                    key={entry.artId}
                                    onClick={() => setInspectedLearnedArtId(entry.artId)}
                                    className={`p-2 rounded border cursor-pointer transition flex items-center justify-between gap-2 ${
                                      isInspected
                                        ? 'bg-[#fff9ec] border-[#8f1d14] ring-1 ring-[#8f1d14]'
                                        : 'bg-[#efe4cc]/80 hover:bg-[#e7d9bc] border-[#c8b28e]'
                                    }`}
                                  >
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5">
                                        <span
                                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                                        >
                                          {art.tier}
                                        </span>
                                        <span className="song-serif font-bold text-xs text-[#23180f] truncate">
                                          {art.name}
                                        </span>
                                        {isEquippedAnywhere && (
                                          <span className="px-1 py-0.2 rounded bg-[#1f5c3a] text-[#fff8eb] text-[9px] font-bold shrink-0">
                                            运使中
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center justify-between text-[10px] text-[#6b5235] mt-1">
                                        <span>
                                          {art.category} · 第 {entry.level}/10 重（
                                          {getMasteryStageLabel(entry.level)}）
                                        </span>
                                        <span className="font-mono">
                                          {entry.level >= 10 ? '圆满' : `${entry.exp}/${reqExp}`}
                                        </span>
                                      </div>
                                      <div className="w-full h-1 bg-[#d8c5a3] rounded-full mt-1 overflow-hidden">
                                        <div
                                          className="h-full bg-[#8f1d14]"
                                          style={{ width: `${expPct}%` }}
                                        />
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        practiceLearnedArt(entry.artId)
                                      }}
                                      title="消耗 10 点体能与 1 个时辰演练该武学，提升熟练度与重数"
                                      className="px-2 py-1 rounded bg-[#5c4024] hover:bg-[#78532f] text-[#fff8ee] text-[10px] font-bold song-serif shrink-0 cursor-pointer"
                                    >
                                      演练
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>

                        {/* 右：当前选中武学槽位配置 & 武学心法详录 */}
                        <div className="lg:col-span-5 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3.5 flex flex-col justify-between gap-3">
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between border-b border-[#dccab0] pb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded bg-[#8f1d14] text-[#fff8eb] flex items-center justify-center">
                                  {renderArtSlotIcon(activeArtSlotMeta.slot, 'w-4 h-4')}
                                </span>
                                <div>
                                  <div className="song-serif font-bold text-sm text-[#23180f]">
                                    武学槽位：{activeArtSlotMeta.label}
                                  </div>
                                  <div className="text-[11px] text-[#6b5235]">
                                    {activeArtSlotMeta.hint}
                                  </div>
                                </div>
                              </div>
                              {activeEquippedArt && (
                                <button
                                  type="button"
                                  onClick={() => unequipArtSlot(activeArtSlotMeta.slot)}
                                  className="px-2.5 py-1 rounded bg-[#7f1d1d] hover:bg-[#991b1b] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                                >
                                  散功卸下
                                </button>
                              )}
                            </div>

                            {activeEquippedArt && activeEquippedArtMastery ? (
                              <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
                                    当前运使：{activeEquippedArt.name}
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-[#261910] text-amber-200 text-[10px] font-mono">
                                    {activeEquippedArt.fullTier} · 第{activeEquippedArtMastery.level}重
                                  </span>
                                </div>
                                <p className="text-xs text-[#4a3520] leading-relaxed">
                                  {activeEquippedArt.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {formatArtBonusBadges(
                                    computeSingleArtBonus(
                                      activeEquippedArt,
                                      activeEquippedArtMastery.level,
                                      activeArtSlotMeta.slot,
                                    ),
                                  ).map((b) => (
                                    <span
                                      key={b}
                                      className="px-2 py-0.5 rounded bg-[#fff9ec] border border-[#bfa680] text-[11px] font-mono font-semibold text-[#1b5132]"
                                    >
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="p-3 rounded border border-dashed border-[#bfa680] bg-[#f5ecd9] text-center text-[#6b5235] text-xs">
                                当前【{activeArtSlotMeta.label}】尚未运使武学，请从下方已习武学中点选配入。
                              </div>
                            )}

                            {/* 适配该武学槽位的可选已习武学 */}
                            <div className="space-y-1.5 pt-1">
                              <div className="font-bold song-serif text-xs text-[#52391e] flex items-center justify-between">
                                <span>可配入【{activeArtSlotMeta.shortLabel}】的所习武学</span>
                                <span className="font-mono text-[11px] text-[#7a6042]">
                                  适配 {compatibleLearnedArts.length} 门
                                </span>
                              </div>
                              <div className="space-y-1.5 max-h-44 overflow-y-auto scroll-thin pr-1">
                                {compatibleLearnedArts.map(({ artId, level, art }) => {
                                  const isCurSlot = equippedArts[activeArtSlotMeta.slot] === artId
                                  const bonusBadges = formatArtBonusBadges(
                                    computeSingleArtBonus(art, level, activeArtSlotMeta.slot),
                                  )
                                  return (
                                    <div
                                      key={artId}
                                      className="p-2 rounded bg-[#fffaf0] border border-[#cbb693] flex items-center justify-between gap-2"
                                    >
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-bold song-serif text-xs text-[#23180f] truncate">
                                            {art.name}
                                          </span>
                                          <span className="px-1.5 py-0.2 rounded bg-[#efe4cc] border border-[#bfa680] text-[10px] text-[#52391e]">
                                            {art.fullTier} · {level}重
                                          </span>
                                        </div>
                                        <div className="text-[11px] text-[#1b5132] font-mono truncate mt-0.5">
                                          {bonusBadges.join(' · ')}
                                        </div>
                                      </div>
                                      {isCurSlot ? (
                                        <span className="px-2 py-1 rounded bg-[#e1f0e8] border border-[#6aa384] text-[#184f35] text-[11px] font-bold shrink-0">
                                          已运使
                                        </span>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            equipArtToSlot(artId, activeArtSlotMeta.slot)
                                          }
                                          className="px-2.5 py-1 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif text-xs shrink-0 cursor-pointer transition"
                                        >
                                          运使
                                        </button>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>

                          {/* 底部检视武学快速演练条 */}
                          {inspectedArt && inspectedEntry && (
                            <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <div className="song-serif font-bold text-xs text-[#23180f] truncate">
                                  精修检视：{inspectedArt.name}（第 {inspectedEntry.level}/10 重）
                                </div>
                                <div className="text-[10px] text-[#6b5235] truncate">
                                  传承：{inspectedArt.origin} · 熟练度 {inspectedEntry.exp}/100
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => practiceLearnedArt(inspectedEntry.artId)}
                                className="px-2.5 py-1 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs shrink-0 cursor-pointer"
                              >
                                演武精修 (-10体能)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* ==================== 叁：行囊四库面板（典籍书画 / 丹药毒物 / 雅器百工 / 行囊杂物） ==================== */}
              {activeViewKey === 'bag' && (() => {
                const currentCatMeta =
                  BAG_CATEGORY_METAS.find((c) => c.key === activeBagCategory) ??
                  BAG_CATEGORY_METAS[0]
                const displayList = bagItemsByCat.list
                const activeStack =
                  displayList.find((x) => x.itemId === selectedBagItemId) ??
                  displayList[0] ??
                  null

                return (
                  <div className="space-y-4 text-xs sm:text-sm">
                    {/* 顶部资粮通栏：随身纹银 + 行军粮草补给 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                        <div>
                          <div className="text-[#6b5033] font-bold song-serif text-sm">
                            随身资金（纹银）
                          </div>
                          <div className="text-xs text-[#7a6042] mt-0.5">
                            可于各州衙门揭榜领赏或市易行交易获取
                          </div>
                        </div>
                        <span className="font-mono font-bold text-xl text-[#7f1d1d]">
                          {silver} 两
                        </span>
                      </div>

                      <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                        <div>
                          <div className="text-[#6b5033] font-bold song-serif text-sm">
                            行军粮草（干粮）
                          </div>
                          <div className="text-xs text-[#7a6042] mt-0.5">
                            大地图远征每行一日消耗 1 份，断粮将大幅损耗体能
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xl text-[#1e4620]">
                            {food} 日份
                          </span>
                          <button
                            type="button"
                            onClick={replenishSupplies}
                            className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition shadow-sm"
                          >
                            购粮 (+20份/5两)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 四大分类切换页签（仅显示少侠随身持有的行囊物品） */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {BAG_CATEGORY_METAS.map((cat) => {
                        const isAct = cat.key === activeBagCategory
                        const count = bagItemsByCat.counts[cat.key]
                        return (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => {
                              setBagCategory(cat.key)
                              setSelectedBagItemId(null)
                            }}
                            className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex items-center justify-between ${
                              isAct
                                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#2b1a0e] border-[#c8b28e]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                                  isAct
                                    ? 'bg-[#6b140d] text-amber-200 border border-amber-300/50'
                                    : 'bg-[#faf3e3] text-[#5c4024] border border-[#bfa680]'
                                }`}
                              >
                                {renderBagCatIcon(cat.key, 'w-4 h-4')}
                              </span>
                              <div className="truncate">
                                <div className="song-serif font-bold text-sm truncate">
                                  {cat.label}
                                </div>
                                <div
                                  className={`text-[11px] ${
                                    isAct ? 'text-amber-200/90' : 'text-[#6b5235]'
                                  }`}
                                >
                                  四库卷{cat.numeral} · 随身行囊
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                                isAct
                                  ? 'bg-black/30 text-amber-200'
                                  : 'bg-[#faf3e3] text-[#52391e]'
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* 当前分类说明条 + 跳转至顶部独立【图鉴】菜单快捷入口 */}
                    <div className="px-3.5 py-2.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2 text-xs text-[#52391e]">
                      <span>
                        <strong>【{currentCatMeta.label}】</strong>：{currentCatMeta.subtitle}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono">随身持有 {displayList.length} 种物品</span>
                        {activeBagCategory === 'scrolls' ||
                        activeBagCategory === 'medicine' ||
                        activeBagCategory === 'tools' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setTreasureVolFilter(activeBagCategory)
                              setTreasureSubTypeFilter('ALL')
                              openCompendium('treasures')
                            }}
                            className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition"
                          >
                            前往【图鉴·博物图鉴】→
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openCompendium('armory')}
                              className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition"
                            >
                              【图鉴·披挂总纲】→
                            </button>
                            <button
                              type="button"
                              onClick={() => openCompendium('mounts')}
                              className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition"
                            >
                              【图鉴·坐骑图鉴】→
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 下方主体：左侧随身物品卡片网格 + 右侧物品检视与使用/穿戴操作台 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      <div className="lg:col-span-7 bg-[#efe4cc]/70 border border-[#c8b28e] rounded-md p-3.5 min-h-[380px] max-h-[480px] overflow-y-auto scroll-thin">
                        {displayList.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {displayList.map(({ itemId, qty, def }) => {
                              const isSel = activeStack?.itemId === itemId
                              const rStyle = RARITY_STYLE_MAP[def.rarity]
                              const isPoison = Boolean(def.poisonEffect && !def.useEffect)
                              return (
                                <button
                                  key={itemId}
                                  type="button"
                                  onClick={() => setSelectedBagItemId(itemId)}
                                  className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex items-start justify-between gap-2 ${
                                    isSel
                                      ? 'bg-[#fff9ec] border-[#8f1d14] ring-1 ring-[#8f1d14] shadow-md'
                                      : `${rStyle.cardBg} ${rStyle.borderCls} hover:brightness-98`
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div
                                      className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText} border-[#f5cb5c]/50`}
                                    >
                                      {def.equipSlot
                                        ? renderSlotIcon(def.equipSlot, 'w-4 h-4')
                                        : renderBagCatIcon(def.category, 'w-4 h-4')}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="song-serif font-bold text-xs sm:text-sm text-[#23180f] truncate">
                                        {def.name}
                                      </div>
                                      <div className="flex items-center gap-1.5 mt-1">
                                        <span
                                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                                        >
                                          {def.rarity}
                                        </span>
                                        <span
                                          className={`text-[11px] truncate ${
                                            isPoison
                                              ? 'text-[#6b21a8] font-semibold'
                                              : 'text-[#6b5235]'
                                          }`}
                                        >
                                          {def.subType}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="px-2 py-0.5 rounded border bg-[#efe4cc] border-[#c8b28e] text-[#23180f] font-mono font-bold text-xs shrink-0">
                                    ×{qty}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-[#7a6042] py-16">
                            <div className="song-serif font-bold text-base">
                              【{currentCatMeta.label}】暂无随身藏品
                            </div>
                            <div className="text-xs mt-1">
                              游历各州书肆、药铺、铁冶坊或秘境奇遇可收入囊中（全谱名录请点击顶部【图鉴】查阅）
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 右侧物品详情检视面板 */}
                      <div className="lg:col-span-5 bg-[#efe4cc] border border-[#c8b28e] rounded-md p-4 flex flex-col justify-between gap-3">
                        {activeStack ? (
                          <>
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2.5">
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-1.5 py-0.5 rounded bg-[#261910] text-amber-200 font-mono text-[10px]">
                                      {activeStack.def.id}
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        RARITY_STYLE_MAP[activeStack.def.rarity].badgeBg
                                      } ${RARITY_STYLE_MAP[activeStack.def.rarity].badgeText}`}
                                    >
                                      {activeStack.def.rarity}
                                    </span>
                                    <span className="text-xs text-[#6b5235] font-semibold">
                                      {activeStack.def.subType}
                                    </span>
                                  </div>
                                  <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1">
                                    {activeStack.def.name}
                                  </h4>
                                </div>
                                <div className="text-right font-mono text-xs text-[#6b5235] shrink-0">
                                  <div>随身 ×{activeStack.qty}</div>
                                  <div className="text-[#7f1d1d] font-bold">
                                    估价 {activeStack.def.value} 两
                                  </div>
                                </div>
                              </div>

                              <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">
                                {activeStack.def.desc}
                              </p>

                              {activeStack.def.lore && (
                                <p className="text-xs italic text-[#6b5235] bg-[#faf3e3] border-l-2 border-[#8f1d14] px-3 py-2 rounded-r">
                                  {activeStack.def.lore}
                                </p>
                              )}

                              {activeStack.def.equipBonus && (
                                <div className="space-y-1.5 pt-1">
                                  <div className="text-xs font-bold text-[#52391e] song-serif">
                                    披挂属性加成：
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {formatBonusBadges(activeStack.def.equipBonus).map((b) => (
                                      <span
                                        key={b}
                                        className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#bfa680] font-mono text-xs font-semibold text-[#7f1d1d]"
                                      >
                                        {b}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {activeStack.def.useEffect && (
                                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-xs text-[#1b5132] font-medium leading-relaxed space-y-1.5">
                                  <div>
                                    研读/服食/使用功效：
                                    {[
                                      activeStack.def.useEffect.maxHp
                                        ? `气血上限 +${activeStack.def.useEffect.maxHp}`
                                        : null,
                                      activeStack.def.useEffect.maxMp
                                        ? `内力上限 +${activeStack.def.useEffect.maxMp}`
                                        : null,
                                      activeStack.def.useEffect.maxStamina
                                        ? `体能上限 +${activeStack.def.useEffect.maxStamina}`
                                        : null,
                                      activeStack.def.useEffect.hp
                                        ? `气血 +${activeStack.def.useEffect.hp}`
                                        : null,
                                      activeStack.def.useEffect.mp
                                        ? `内力 +${activeStack.def.useEffect.mp}`
                                        : null,
                                      activeStack.def.useEffect.stamina
                                        ? `体能 +${activeStack.def.useEffect.stamina}`
                                        : null,
                                      activeStack.def.useEffect.agi
                                        ? `身法 +${activeStack.def.useEffect.agi}`
                                        : null,
                                      activeStack.def.useEffect.res
                                        ? `抗性 +${activeStack.def.useEffect.res}`
                                        : null,
                                      activeStack.def.useEffect.riding
                                        ? `【骑术】+${activeStack.def.useEffect.riding}`
                                        : null,
                                      activeStack.def.useEffect.food
                                        ? `粮草 +${activeStack.def.useEffect.food}日份`
                                        : null,
                                      activeStack.def.useEffect.skillGain
                                        ? `【${activeStack.def.useEffect.skillGain[0]}】+${activeStack.def.useEffect.skillGain[1]}`
                                        : null,
                                      activeStack.def.useEffect.learnArtHint ?? null,
                                    ]
                                      .filter(Boolean)
                                      .join(' · ')}
                                  </div>
                                  {activeStack.def.useEffect.learnArtId &&
                                    MARTIAL_ART_DB_MAP[activeStack.def.useEffect.learnArtId] && (
                                      <div className="pt-1 border-t border-[#dfd0b3] flex items-center justify-between">
                                        <span className="text-[11px] text-[#52391e]">
                                          关联武学：
                                          <strong>
                                            {
                                              MARTIAL_ART_DB_MAP[
                                                activeStack.def.useEffect.learnArtId
                                              ].name
                                            }
                                          </strong>
                                          （{activeStack.def.useEffect.learnArtId}）
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const art =
                                              MARTIAL_ART_DB_MAP[
                                                activeStack.def.useEffect!.learnArtId!
                                              ]
                                            if (art) {
                                              setSelectedArt(art)
                                              openCompendium('martialArts')
                                            }
                                          }}
                                          className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d1b0] border border-[#9e8462] text-[11px] text-[#781710] font-semibold cursor-pointer"
                                        >
                                          查阅武学总纲 →
                                        </button>
                                      </div>
                                    )}
                                </div>
                              )}

                              {activeStack.def.poisonEffect && (
                                <div className="p-2.5 rounded bg-[#f7eefb] border border-[#9d7bb8] text-xs text-[#4c1d6e] font-medium leading-relaxed">
                                  毒理效用：{activeStack.def.poisonEffect}
                                </div>
                              )}
                            </div>

                            <div className="pt-3 border-t border-[#cbb693] flex items-center gap-2">
                              {activeStack.def.equipSlot ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => equipItemToSlot(activeStack.itemId)}
                                    className="flex-1 px-3 py-2.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                                  >
                                    {activeStack.def.category === 'tools'
                                      ? '佩挂雅器随身'
                                      : '披挂上身 / 备鞍乘骑'}
                                  </button>
                                  {activeStack.def.useEffect && (
                                    <button
                                      type="button"
                                      onClick={() => consumeInventoryItem(activeStack.itemId, true)}
                                      className="px-3 py-2.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                                    >
                                      抚弄修习
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (activeStack.def.equipSlot) {
                                        setSelectedEquipSlot(activeStack.def.equipSlot)
                                      }
                                      setMenuTab('loadout')
                                    }}
                                    className="px-3 py-2.5 rounded bg-[#faf3e3] hover:bg-[#e7d9bc] border border-[#9e8462] text-[#3d2812] font-bold song-serif text-xs sm:text-sm cursor-pointer transition"
                                  >
                                    查看槽位
                                  </button>
                                </>
                              ) : activeStack.def.useEffect ? (
                                <button
                                  type="button"
                                  onClick={() => consumeInventoryItem(activeStack.itemId)}
                                  className="w-full px-3 py-2.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs sm:text-sm shadow cursor-pointer transition"
                                >
                                  {activeStack.def.category === 'scrolls'
                                    ? '展卷研读参悟'
                                    : activeStack.def.category === 'tools'
                                      ? '把玩演练修习'
                                      : '立即服食使用'}
                                </button>
                              ) : activeStack.def.poisonEffect ? (
                                <div className="w-full py-2 text-center text-xs text-[#4c1d6e] bg-[#f7eefb] rounded border border-[#9d7bb8] font-medium">
                                  奇门毒物 · 不可直接内服（供战棋交锋施毒、淬炼兵刃或暗算剧情使用）
                                </div>
                              ) : (
                                <div className="w-full py-2 text-center text-xs text-[#6b5235] bg-[#faf3e3] rounded border border-[#cbb693]">
                                  随身常备器具/凭证（在特定雅集、奇遇或关隘自动生效）
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center text-center text-[#7a6042] py-12">
                            请点击左侧物品查看详录与操作
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* ==================== 图鉴壹：43 地区图鉴（山海舆地全鉴） ==================== */}
              {activeViewKey === 'regions' && (
                <RegionCompendiumPanel
                  selectedRegionId={selectedRegionCompId}
                  onSelectRegionId={setSelectedRegionCompId}
                  currentNodeId={currentNodeId}
                  hasWildernessCamp={Boolean(campPos)}
                  isTraveling={Boolean(traveling)}
                  onJumpToSect={(sectId) => {
                    setSelectedSectCompId(sectId)
                    setCompendiumTab('sects')
                  }}
                  onJumpToNpc={(npc) => {
                    setSelectedNpc(npc)
                    if (!npc.avatarUrl && !npc.fullbodyUrl && localNpcScope === 'ALL_WITH_ART') {
                      setLocalNpcScope('ALL')
                    }
                    setCompendiumTab('portraits')
                  }}
                  onJumpToWeapon={(wpn) => {
                    setSelectedWeapon(wpn)
                    setWpnTierFilter('ALL')
                    setWpnTypeFilter('ALL')
                    setCompendiumTab('armory')
                  }}
                  onLocateOnWorldMap={(regionId) => {
                    useGameStore.setState({
                      viewMode: 'world',
                      selectedNodeId: regionId,
                    })
                    closeActiveModal()
                  }}
                  onEnterCurrentRegion={(regionId) => {
                    useGameStore.getState().enterRegionMap(regionId, false)
                    closeActiveModal()
                  }}
                  onOpenPanoramaLightbox={({ url, title, subtitle }) =>
                    setLightbox({ url, title, subtitle })
                  }
                />
              )}

              {/* ==================== 图鉴贰：30 武林门派与 11 庙堂四夷图鉴 ==================== */}
              {activeViewKey === 'sects' && (
                <SectCompendiumPanel
                  selectedFactionId={selectedSectCompId}
                  onSelectFactionId={setSelectedSectCompId}
                  learnedArtIds={new Set(learnedArts.map((e) => e.artId))}
                  onJumpToRegion={(regionId) => {
                    setSelectedRegionCompId(regionId)
                    setCompendiumTab('regions')
                  }}
                  onJumpToNpc={(npc) => {
                    setSelectedNpc(npc)
                    if (!npc.avatarUrl && !npc.fullbodyUrl && localNpcScope === 'ALL_WITH_ART') {
                      setLocalNpcScope('ALL')
                    }
                    setCompendiumTab('portraits')
                  }}
                  onJumpToArt={(art) => {
                    setSelectedArt(art)
                    setArtTierFilter('ALL')
                    setArtCatFilter('ALL')
                    setCompendiumTab('martialArts')
                  }}
                  onJumpToWeapon={(wpn) => {
                    setSelectedWeapon(wpn)
                    setWpnTierFilter('ALL')
                    setWpnTypeFilter('ALL')
                    setCompendiumTab('armory')
                  }}
                  onLocateOnWorldMap={(regionId) => {
                    useGameStore.setState({
                      viewMode: 'world',
                      selectedNodeId: regionId,
                    })
                    closeActiveModal()
                  }}
                  onOpenPortraitLightbox={(npc, mode) => openNpcLightbox(npc, mode)}
                />
              )}

              {/* ==================== 图鉴叁：1,000 群侠图鉴（最末层常驻建筑 + 四维/三维/十艺全显 + 全身像品鉴） ==================== */}
              {activeViewKey === 'portraits' && (
                <div className="space-y-3.5 text-xs">
                  <div className="flex flex-wrap items-center gap-2.5 bg-[#efe4cc] p-3 rounded border border-[#c8b28e]">
                    <input
                      type="text"
                      value={npcQuery}
                      onChange={(e) => setNpcQuery(e.target.value)}
                      placeholder="搜编号/姓名/常驻殿宇/武学（如：NPC-0101、乔峰、垂拱殿、藏经阁、六脉神剑）…"
                      className="flex-1 min-w-[200px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                    />
                    <select
                      value={npcScope}
                      onChange={(e) => setNpcScope(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL_WITH_ART">
                        已有独立原画 ({ID_REGISTRY.counts.npcsWithAvatar})
                      </option>
                      <option value="ALL">全部千人名录 (1000)</option>
                      <option value="HERE">当前地区：{activeRegionNode?.name}</option>
                      <option value="HISTORICAL">庙堂四夷历史百杰 (100)</option>
                      <option value="GRANDMASTER_MASTER">大宗师与宗师 (34)</option>
                      <option value="FIRST_RATE">一流高手 (120)</option>
                    </select>
                    <select
                      value={npcRegionFilter}
                      onChange={(e) => setNpcRegionFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer max-w-[160px]"
                    >
                      <option value="ALL">全部 {ID_REGISTRY.counts.regions} 地区</option>
                      {ID_REGISTRY.regions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.numericCode}·{r.name} ({r.npcCount})
                        </option>
                      ))}
                    </select>
                    <select
                      value={npcFactionFilter}
                      onChange={(e) => setNpcFactionFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer max-w-[195px]"
                    >
                      <option value="ALL">全部 30派+11势力</option>
                      <optgroup label="一流名门大派 (SECT-01..20)">
                        {ID_REGISTRY.factions
                          .filter((f) => f.isMajorSect)
                          .map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.id} {f.name} ({f.memberCount})
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="二三流门派与武馆 (SECT-21..30)">
                        {ID_REGISTRY.factions
                          .filter((f) => f.isMinorSect)
                          .map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.id} {f.name} ({f.memberCount})
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="朝堂与四夷势力 (ORG-01..11)">
                        {ID_REGISTRY.factions
                          .filter((f) => !f.isMajorSect && !f.isMinorSect)
                          .map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.id} {f.name} ({f.memberCount})
                            </option>
                          ))}
                      </optgroup>
                    </select>
                    <span className="text-xs text-[#5e472d] font-mono">
                      命中 {filteredNpcs.length} 人
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* 左侧懒加载人物列表 */}
                    <div className="lg:col-span-7 h-[640px] max-h-[66vh] overflow-y-auto scroll-thin pr-1.5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 content-start">
                      {filteredNpcs.slice(0, 200).map((c) => {
                        const isSel = selectedNpc?.id === c.id
                        const leafLabel = c.assignedSpotName ?? c.assignedBuildingName
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedNpc(c)}
                            className={`p-2.5 rounded-md border text-left transition flex items-center gap-2.5 cursor-pointer ${
                              isSel
                                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                            }`}
                          >
                            {c.avatarUrl ? (
                              <img
                                src={resolveAssetUrl(c.avatarUrl)}
                                alt={c.name}
                                loading="lazy"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedNpc(c)
                                  openNpcLightbox(c, 'avatar')
                                }}
                                title="点击放大查看人物立绘"
                                onLoad={() => {
                                  if (c.avatarUrl) recordAssetLoaded(c.avatarUrl, 58000)
                                }}
                                className="w-12 h-12 rounded object-cover object-top border border-[#bfa782] shrink-0 bg-[#2b1d12] hover:ring-2 hover:ring-amber-300 cursor-zoom-in"
                              />
                            ) : (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedNpc(c)
                                  openNpcLightbox(c, 'fullbody')
                                }}
                                title="点击放大查看门派全身像"
                                className="w-12 h-12 rounded bg-[#4a321d] border border-[#9e7b47]/60 text-[#fff8ee] flex flex-col items-center justify-center shrink-0 hover:ring-2 hover:ring-amber-300 cursor-zoom-in"
                              >
                                <span className="song-serif font-bold text-sm leading-none">
                                  {c.name.slice(0, 1)}
                                </span>
                                <span className="text-[9px] text-amber-200/90 mt-0.5">
                                  {FACTION_DB_MAP[c.factionId]?.shortName ?? '群侠'}
                                </span>
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="song-serif font-bold text-xs sm:text-sm truncate">
                                {c.name}
                              </div>
                              <div
                                title={c.fullLocationLabel}
                                className={`text-[10px] truncate mt-0.5 ${
                                  isSel ? 'text-amber-200' : 'text-[#6b5235]'
                                }`}
                              >
                                {c.locationLabel} · {leafLabel}
                              </div>
                              <div
                                className={`text-[10px] truncate ${
                                  isSel ? 'text-amber-100/90' : 'text-[#7c5f3d]'
                                }`}
                              >
                                {c.realm}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {filteredNpcs.length > 200 && (
                        <div className="col-span-full text-center py-2.5 text-xs text-[#6b5235]">
                          当前显示前 200 条档案，可通过上方搜索框或地区/门派筛选器精确检索其余人物。
                        </div>
                      )}
                    </div>

                    {/* 右侧选中人物详情与统一 3:4 画幅全身像（杜绝 flex 压缩导致大小不一） */}
                    <div className="lg:col-span-5 p-4 rounded-md bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-3 h-[640px] max-h-[66vh] overflow-y-auto scroll-thin">
                      {selectedNpc ? (
                        <>
                          <div className="shrink-0 flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2.5">
                            <div className="flex items-start gap-2.5 min-w-0">
                              {selectedNpc.avatarUrl && (
                                <img
                                  src={resolveAssetUrl(selectedNpc.avatarUrl)}
                                  alt={`${selectedNpc.name} 头像`}
                                  onClick={() => openNpcLightbox(selectedNpc, 'avatar')}
                                  title="点击放大查看高清头像"
                                  className="w-12 h-12 rounded border border-[#8c6e46] object-cover shrink-0 cursor-zoom-in hover:ring-2 hover:ring-[#8f1d14]"
                                />
                              )}
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#261910] text-amber-200">
                                    {selectedNpc.id}
                                  </span>
                                  <span className="song-serif font-bold text-lg text-[#23180f]">
                                    {selectedNpc.name}
                                  </span>
                                  <span className="text-xs text-[#6b5235]">
                                    · {selectedNpc.title}
                                  </span>
                                </div>
                                <div className="text-xs text-[#781710] font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedSectCompId(selectedNpc.factionId)
                                      setCompendiumTab('sects')
                                    }}
                                    title="跳转至【贰 · 门派图鉴】查阅该门派/势力详录"
                                    className="px-1.5 py-0.5 rounded bg-[#8f1d14]/10 hover:bg-[#8f1d14]/20 border border-[#8f1d14]/40 text-[#781710] font-semibold cursor-pointer transition"
                                  >
                                    [{selectedNpc.factionId}] {selectedNpc.factionName} ▸
                                  </button>
                                  <span>
                                    · {selectedNpc.role}（{selectedNpc.gender}·{selectedNpc.age}岁）
                                  </span>
                                </div>
                                <div className="text-xs text-[#4a3219] mt-1 space-y-1">
                                  <div>
                                    常驻最末层：<strong>{selectedNpc.fullLocationLabel}</strong>（`
                                    {selectedNpc.regionId}`）
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedRegionCompId(selectedNpc.regionId)
                                        setCompendiumTab('regions')
                                      }}
                                      className="px-2 py-0.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                                    >
                                      地区图鉴 ▸
                                    </button>
                                    {currentNodeId === selectedNpc.regionId &&
                                      !campPos &&
                                      !traveling && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            navigateToNpcLeafInCurrentRegion(selectedNpc.id)
                                          }
                                          className="px-2 py-0.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                                        >
                                          直赴本城常驻殿宇 →
                                        </button>
                                      )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        useGameStore.setState({
                                          viewMode: 'world',
                                          selectedNodeId: selectedNpc.regionId,
                                        })
                                        closeActiveModal()
                                      }}
                                      className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-[10px] cursor-pointer"
                                    >
                                      舆图寻路定位 →
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#5c4024] text-[#fff8ee] text-xs shrink-0">
                              {selectedNpc.realm}
                            </span>
                          </div>

                          {/* 固定 3:4 标准画幅全身立绘框：shrink-0 杜绝被下方长小传文字挤压变矮，w-full h-full object-cover object-top 确保所有角色尺寸完全一致 */}
                          <div className="shrink-0 bg-[#18100a] border-2 border-[#8c6e46] rounded-md p-2 flex flex-col items-center">
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => openNpcLightbox(selectedNpc, 'fullbody')}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  openNpcLightbox(selectedNpc, 'fullbody')
                                }
                              }}
                              title="点击放大品鉴高清全身绘像"
                              className="w-[240px] h-[320px] rounded overflow-hidden relative group cursor-zoom-in bg-[#24180f] shadow-lg border border-[#c89d54]/40"
                            >
                              <img
                                key={selectedNpc.id}
                                src={resolveAssetUrl(
                                  selectedNpc.fullbodyUrl ?? selectedNpc.templateUrl,
                                )}
                                alt={`${selectedNpc.name} 全身立绘`}
                                loading="lazy"
                                onLoad={() => {
                                  const url = selectedNpc.fullbodyUrl ?? selectedNpc.templateUrl
                                  recordAssetLoaded(url, 125000)
                                }}
                                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                              />
                              <span className="absolute top-2 right-2 px-2 py-1 rounded bg-black/75 text-[#fff8eb] text-[11px] flex items-center gap-1 border border-[#c89d54]/50 shadow">
                                <Maximize2 className="w-3 h-3 text-amber-300" />
                                <span>点击放大</span>
                              </span>
                              {!selectedNpc.fullbodyUrl && (
                                <span className="absolute bottom-1.5 inset-x-1.5 text-center px-1.5 py-0.5 rounded bg-black/75 text-[10px] text-[#f5dfb5] border border-[#c89d54]/40">
                                  门派母版全身立绘
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 1) 实战四维属性 */}
                          <div className="shrink-0 bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold song-serif text-[#5e472d]">
                                实战四维属性
                              </span>
                              <span className="text-[10px] text-[#7a5f3e]">战棋交锋结算维度</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-xs">
                              <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">气血</div>
                                <strong className="text-[#8f1d14]">{selectedNpc.stats.hp}</strong>
                              </div>
                              <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">内力</div>
                                <strong className="text-[#1d473a]">{selectedNpc.stats.mp}</strong>
                              </div>
                              <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">身法</div>
                                <strong>{selectedNpc.stats.agi}</strong>
                              </div>
                              <div className="bg-[#efe4cc] rounded py-1 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">抗性</div>
                                <strong>{selectedNpc.stats.res}</strong>
                              </div>
                            </div>
                          </div>

                          {/* 2) 先天三维禀赋（根骨 / 悟性 / 颜值） */}
                          <div className="shrink-0 bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold song-serif text-[#5e472d]">
                                先天三维禀赋
                              </span>
                              <span className="text-[10px] text-[#7a5f3e]">
                                修炼瓶颈 · 奇遇 · 社交（不入战中伤害）
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs">
                              <div className="bg-[#efe4cc] rounded py-1 px-1.5 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">根骨</div>
                                <strong className="text-[#781710]">
                                  {selectedNpc.talents.bone}
                                </strong>
                                <span className="text-[10px] text-[#7a5f3e]">/100</span>
                              </div>
                              <div className="bg-[#efe4cc] rounded py-1 px-1.5 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">悟性</div>
                                <strong className="text-[#184f35]">
                                  {selectedNpc.talents.comprehension}
                                </strong>
                                <span className="text-[10px] text-[#7a5f3e]">/100</span>
                              </div>
                              <div className="bg-[#efe4cc] rounded py-1 px-1.5 border border-[#dcc9a7]">
                                <div className="text-[10px] text-[#6b5235] font-sans">颜值</div>
                                <strong className="text-[#6d3b1a]">
                                  {selectedNpc.talents.charm}
                                </strong>
                                <span className="text-[10px] text-[#7a5f3e]">/100</span>
                              </div>
                            </div>
                          </div>

                          {/* 3) 北宋十艺百工（0~100） */}
                          <div className="shrink-0 bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold song-serif text-[#5e472d]">
                                十艺百工造诣
                              </span>
                              <span className="text-[10px] text-[#7a5f3e]">0~100 雅艺与实务专精</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                              {TEN_ART_KEYS.map((artKey) => {
                                const score = selectedNpc.tenArts[artKey] ?? 0
                                const isMastery = score >= 80
                                return (
                                  <div
                                    key={artKey}
                                    className={`p-1.5 rounded border text-center ${
                                      isMastery
                                        ? 'bg-[#f4e2c2] border-[#c48a35]'
                                        : 'bg-[#efe4cc] border-[#dcc9a7]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between text-[10px]">
                                      <span className="text-[#5e472d] font-medium">{artKey}</span>
                                      <strong
                                        className={`font-mono ${
                                          isMastery ? 'text-[#8f1d14]' : 'text-[#23180f]'
                                        }`}
                                      >
                                        {score}
                                      </strong>
                                    </div>
                                    <div className="mt-1 h-1 w-full rounded-full bg-[#d8c6a5] overflow-hidden">
                                      <div
                                        style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                                        className={`h-full ${
                                          isMastery ? 'bg-[#8f1d14]' : 'bg-[#6b5235]'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {selectedNpc.knownArtIds.length > 0 && (
                            <div className="shrink-0 space-y-1">
                              <div className="text-[11px] font-bold text-[#5e472d]">
                                关联标准武学 ID ({selectedNpc.knownArtIds.length})：
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedNpc.knownArtIds.map((aid) => {
                                  const art = MARTIAL_ART_DB_MAP[aid]
                                  return (
                                    <button
                                      key={aid}
                                      type="button"
                                      onClick={() => {
                                        if (art) {
                                          setSelectedArt(art)
                                          setCompendiumTab('martialArts')
                                        }
                                      }}
                                      className="px-2 py-0.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[11px] text-[#781710] font-medium cursor-pointer"
                                    >
                                      {aid} · {art?.cleanName ?? aid}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {selectedNpc.specialtyTags.length > 0 && (
                            <div className="shrink-0 text-xs text-[#4a3219]">
                              <strong>雅好/头衔标签：</strong>
                              {selectedNpc.specialtyTags.join('、')}
                            </div>
                          )}

                          <p className="text-xs text-[#3d2b19] leading-relaxed pb-1">
                            {selectedNpc.bio}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 图鉴贰：216 门武学总纲 ==================== */}
              {activeViewKey === 'martialArts' && (
                <div className="space-y-3.5 text-xs">
                  <div className="flex flex-wrap items-center gap-2.5 bg-[#efe4cc] p-3 rounded border border-[#c8b28e]">
                    <input
                      type="text"
                      value={artQuery}
                      onChange={(e) => setArtQuery(e.target.value)}
                      placeholder="搜索武学编号、名称、所属宗门或描述（如：MA-001、降龙、凌波微步、少林）…"
                      className="flex-1 min-w-[220px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                    />
                    <select
                      value={artTierFilter}
                      onChange={(e) => setArtTierFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL">全部四阶 (216 门)</option>
                      <option value="天阶">天阶绝学 (37 门)</option>
                      <option value="地阶">地阶上乘 (59 门)</option>
                      <option value="良品">良品中坚 (60 门)</option>
                      <option value="凡品">凡品筑基 (60 门)</option>
                    </select>
                    <select
                      value={artCatFilter}
                      onChange={(e) => setArtCatFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL">全部兵刃/功体类别</option>
                      {artCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-[#5e472d] font-mono">
                      共 {filteredArts.length} 门（少侠已习 {learnedArts.length} 门）
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-7 max-h-[600px] overflow-y-auto scroll-thin pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 content-start">
                      {filteredArts.map((art) => {
                        const isSel = selectedArt?.id === art.id
                        const learnedInfo = learnedMap.get(art.id)
                        const tierBadgeCls =
                          art.tier === '天阶'
                            ? 'bg-[#8f1d14] text-amber-200'
                            : art.tier === '地阶'
                              ? 'bg-[#5b3b73] text-[#fff8ee]'
                              : art.tier === '良品'
                                ? 'bg-[#1d473a] text-[#fff8ee]'
                                : 'bg-[#5c4630] text-[#fff8ee]'
                        return (
                          <button
                            key={art.id}
                            type="button"
                            onClick={() => setSelectedArt(art)}
                            className={`p-3 rounded border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                              isSel
                                ? 'bg-[#261910] text-[#fff8eb] border-[#f5cb5c] shadow'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] opacity-80">{art.id}</span>
                                <span className="song-serif font-bold text-xs sm:text-sm truncate">
                                  {art.name}
                                </span>
                                {learnedInfo && (
                                  <span className="px-1.5 py-0.2 rounded bg-[#215744] text-[#fff8eb] text-[9px] font-bold shrink-0">
                                    已习·{learnedInfo.level}重
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-[11px] truncate mt-0.5 ${
                                  isSel ? 'text-[#d6c5a5]' : 'text-[#6b5235]'
                                }`}
                              >
                                {art.category} · {art.origin}
                              </div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${tierBadgeCls}`}
                            >
                              {art.fullTier}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="lg:col-span-5 p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-3 max-h-[600px] overflow-y-auto scroll-thin">
                      {selectedArt ? (
                        <>
                          <div className="border-b border-[#cbb693] pb-2.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-200">
                                {selectedArt.id}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] text-xs font-bold">
                                {selectedArt.fullTier} · {selectedArt.category}
                              </span>
                            </div>
                            <div className="song-serif font-bold text-lg text-[#23180f] mt-1.5">
                              {selectedArt.name}
                            </div>
                            <div className="text-xs text-[#6b5235] mt-0.5">
                              传承渊源：{selectedArt.origin}
                              {selectedArt.sectId
                                ? `（标准门派 ID：${selectedArt.sectId}）`
                                : '（江湖公共/奇遇传承）'}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">
                            {selectedArt.description}
                          </p>

                          {selectedArt.levels && selectedArt.levels.length >= 10 && (
                            <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693] space-y-2">
                              <div className="font-bold song-serif text-xs text-[#23180f] flex items-center justify-between">
                                <span>一重入门 → 十重圆满数值</span>
                                <span className="font-mono text-[10px] text-[#7a6042]">
                                  满十重需熟练{' '}
                                  {selectedArt.levels.reduce(
                                    (s, x) => s + (x.expRequired ?? 0),
                                    0,
                                  )}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {formatArtBonusBadges(
                                  computeSingleArtBonus(selectedArt, 10),
                                ).map((badge) => (
                                  <span
                                    key={badge}
                                    className="px-2 py-0.5 rounded bg-[#fffaf0] border border-[#bfa680] text-[11px] font-mono font-semibold text-[#1b5132]"
                                  >
                                    十重：{badge}
                                  </span>
                                ))}
                              </div>
                              {selectedArt.levels[9].specialEffects &&
                                selectedArt.levels[9].specialEffects.length > 0 && (
                                  <div className="pt-1 border-t border-dashed border-[#dccab0] space-y-1">
                                    {selectedArt.levels[9].specialEffects.map((fx) => (
                                      <div
                                        key={fx.id}
                                        className="text-[11px] text-[#781710] leading-relaxed"
                                      >
                                        <strong>
                                          【{fx.name} +{fx.value}
                                          {fx.unit}】
                                        </strong>
                                        ：{fx.desc}
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          )}

                          {learnedMap.has(selectedArt.id) && (
                            <div className="p-3 rounded bg-[#e1f0e8] border border-[#6aa384] flex items-center justify-between">
                              <div className="text-xs text-[#184f35] font-semibold">
                                少侠已习得此功（当前第 {learnedMap.get(selectedArt.id)?.level} 重）
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setInspectedLearnedArtId(selectedArt.id)
                                  openMenu('loadout')
                                }}
                                className="px-2.5 py-1 rounded bg-[#1f5c3a] text-[#fff8eb] text-xs font-bold song-serif cursor-pointer"
                              >
                                前往运使演练 →
                              </button>
                            </div>
                          )}

                          {selectedArt.prerequisitesText && (
                            <div className="p-3 rounded bg-[#faf3e3] border border-[#b89f78] space-y-2">
                              <div className="font-bold song-serif text-sm text-[#8f1d14]">
                                天阶前置修行条件：
                              </div>
                              <div className="text-xs text-[#4a3219] leading-relaxed">
                                {selectedArt.prerequisitesText}
                              </div>
                              {selectedArt.statRequirements.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {selectedArt.statRequirements.map((req) => (
                                    <span
                                      key={req.stat}
                                      className="px-2 py-0.5 rounded bg-[#efe4cc] border border-[#9e8462] font-mono text-[11px] text-[#23180f]"
                                    >
                                      {req.stat} ≥ {req.min}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 图鉴伍：披挂总纲（百兵 100 · 服饰 56 · 鞋履 28 · 弓箭 28 · 配饰 56） ==================== */}
              {activeViewKey === 'armory' && (
                <div className="space-y-3.5 text-xs">
                  {/* 七槽披挂总卷进度横幅 + 五卷切换栏 */}
                  <div className="p-3 rounded bg-[#efe4cc] border-2 border-[#b5986e] space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] font-bold song-serif">
                          皇祐披挂总典
                        </span>
                        <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
                          七槽披挂全录（百兵 100 · 服饰 56 · 鞋履 28 · 弓箭 28 · 配饰 56 · 名驹 28）
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCompendiumTab('mounts')}
                        className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-[11px] cursor-pointer transition"
                      >
                        前往陆·坐骑图鉴（28 骑）▸
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        [
                          { key: 'weapons', label: '第一卷 · 百兵谱 (100)' },
                          { key: 'armor', label: '第二卷 · 服饰谱 (56)' },
                          { key: 'shoes', label: '第三卷 · 鞋履谱 (28)' },
                          { key: 'bow', label: '第四卷 · 弓箭谱 (28)' },
                          { key: 'accessory', label: '第五卷 · 配饰谱 (56)' },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setArmorySubTab(tab.key)}
                          className={`px-3 py-1.5 rounded font-bold song-serif text-xs border transition cursor-pointer ${
                            armorySubTab === tab.key
                              ? 'bg-[#8f1d14] text-amber-100 border-[#e6be68] shadow-sm'
                              : 'bg-[#faf3e3] text-[#4a3520] border-[#cbb693] hover:bg-[#ead9b7]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {armorySubTab !== 'weapons' ? (
                    <GearCompendiumPanel
                      slotFilter={armorySubTab}
                      onJumpToRegion={() => {
                        setCompendiumTab('regions')
                      }}
                      onJumpToLoadout={() => setMenuTab('loadout')}
                    />
                  ) : (
                    <>

                  {/* 检索与品阶/兵种筛选栏 */}
                  <div className="bg-[#efe4cc] p-3 rounded border border-[#c8b28e] space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <input
                        type="text"
                        value={wpnQuery}
                        onChange={(e) => setWpnQuery(e.target.value)}
                        placeholder="搜索兵器编号、名称、锻造产地、词条或典故（如：WPN-001、冷锻、龙泉、打狗棒、开封府）…"
                        className="flex-1 min-w-[220px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                      />
                      <select
                        value={wpnTierFilter}
                        onChange={(e) =>
                          setWpnTierFilter(e.target.value as 'ALL' | EquipmentTier)
                        }
                        className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                      >
                        <option value="ALL">全部四阶 (100 兵)</option>
                        <option value="天阶">天阶神兵 (10 兵)</option>
                        <option value="地阶">地阶名器 (20 兵)</option>
                        <option value="良阶">良阶精兵 (30 兵)</option>
                        <option value="凡阶">凡阶制式 (40 兵)</option>
                      </select>
                      <span className="text-xs text-[#5e472d] font-mono">
                        筛选结果：{filteredWeapons.length} / {WEAPONS_DB.length} 件
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-[#6b5235] font-bold song-serif mr-1">
                        七大兵种：
                      </span>
                      <button
                        type="button"
                        onClick={() => setWpnTypeFilter('ALL')}
                        className={`px-2.5 py-1 rounded text-[11px] song-serif font-bold cursor-pointer transition ${
                          wpnTypeFilter === 'ALL'
                            ? 'bg-[#261910] text-amber-200 border border-[#f5cb5c]'
                            : 'bg-[#faf3e3] text-[#4a3219] border border-[#b89f78] hover:bg-[#e5d6b8]'
                        }`}
                      >
                        全部兵种 (100)
                      </button>
                      {WEAPON_SUB_CATEGORIES.map((cat) => {
                        const cnt = WEAPONS_DB.filter((w) => w.weaponType === cat).length
                        const isCur = wpnTypeFilter === cat
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setWpnTypeFilter(cat)}
                            className={`px-2.5 py-1 rounded text-[11px] song-serif font-bold cursor-pointer transition ${
                              isCur
                                ? 'bg-[#8f1d14] text-[#fff8eb] border border-[#f5cb5c]'
                                : 'bg-[#faf3e3] text-[#4a3219] border border-[#b89f78] hover:bg-[#e5d6b8]'
                            }`}
                          >
                            {cat} ({cnt})
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* 左：百兵列表；右：选中神兵考据与共鸣详情 */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-7 max-h-[580px] overflow-y-auto scroll-thin pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 content-start">
                      {filteredWeapons.map((wpn) => {
                        const isSel = selectedWeapon?.id === wpn.id
                        const isEquipped = equipped.weapon === wpn.id
                        const inBagQty = inventoryQtyMap.get(wpn.id) ?? 0
                        const rStyle = RARITY_STYLE_MAP[wpn.tier]
                        return (
                          <button
                            key={wpn.id}
                            type="button"
                            onClick={() => setSelectedWeapon(wpn)}
                            className={`p-3 rounded border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                              isSel
                                ? 'bg-[#261910] text-[#fff8eb] border-[#f5cb5c] shadow'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[10px] opacity-80">{wpn.id}</span>
                                <span className="song-serif font-bold text-xs sm:text-sm truncate">
                                  {wpn.name}
                                </span>
                                {isEquipped && (
                                  <span className="px-1.5 py-0.2 rounded bg-[#8f1d14] text-amber-200 text-[9px] font-bold shrink-0">
                                    已佩备
                                  </span>
                                )}
                                {!isEquipped && inBagQty > 0 && (
                                  <span className="px-1.5 py-0.2 rounded bg-[#215744] text-[#fff8eb] text-[9px] font-bold shrink-0">
                                    在囊中
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-[11px] truncate mt-0.5 ${
                                  isSel ? 'text-[#d6c5a5]' : 'text-[#6b5235]'
                                }`}
                              >
                                {wpn.weaponType} · 攻+{wpn.equipBonus.attack ?? 0} · 射程
                                {wpn.attackRange}格 · {wpn.locationLabel}
                              </div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {wpn.fullTier}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="lg:col-span-5 p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-3 max-h-[580px] overflow-y-auto scroll-thin">
                      {selectedWeapon ? (() => {
                        const isEquipped = equipped.weapon === selectedWeapon.id
                        const inBagQty = inventoryQtyMap.get(selectedWeapon.id) ?? 0
                        const reqCheck = checkWeaponEquipRequirements(
                          selectedWeapon,
                          playerEquipCtx,
                        )
                        const rStyle = RARITY_STYLE_MAP[selectedWeapon.tier]
                        const sectEntry = selectedWeapon.sectId
                          ? FACTION_DB_MAP[selectedWeapon.sectId]
                          : null

                        return (
                          <>
                            <div className="border-b border-[#cbb693] pb-2.5">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-200">
                                  {selectedWeapon.id}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                                >
                                  {selectedWeapon.fullTier} · {selectedWeapon.weaponType}
                                </span>
                              </div>
                              <div className="song-serif font-bold text-lg text-[#23180f] mt-1.5 flex items-center gap-2 flex-wrap">
                                <span>{selectedWeapon.name}</span>
                                {selectedWeapon.specialTag && (
                                  <span className="px-2 py-0.5 rounded bg-[#8f1d14]/15 border border-[#8f1d14]/40 text-xs text-[#8f1d14] font-bold">
                                    【{selectedWeapon.specialTag}】
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#4a3219] mt-1 flex items-center gap-1.5 flex-wrap">
                                <span>
                                  锻造/执掌：<strong>{selectedWeapon.originFull}</strong>（`
                                  {selectedWeapon.regionId}`
                                  {sectEntry ? ` · ${sectEntry.shortName}` : ''}）
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedRegionCompId(selectedWeapon.regionId)
                                    setCompendiumTab('regions')
                                  }}
                                  className="px-2 py-0.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                                >
                                  地区图鉴 ▸
                                </button>
                                {sectEntry && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedSectCompId(sectEntry.id)
                                      setCompendiumTab('sects')
                                    }}
                                    className="px-2 py-0.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                                  >
                                    门派图鉴 ▸
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    useGameStore.setState({
                                      viewMode: 'world',
                                      selectedNodeId: selectedWeapon.regionId,
                                    })
                                    closeActiveModal()
                                  }}
                                  className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-[10px] cursor-pointer"
                                >
                                  舆图寻路定位 →
                                </button>
                              </div>
                            </div>

                            {/* 战棋规格与银两估值 */}
                            <div className="grid grid-cols-3 gap-2 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-2 text-xs">
                              <div>
                                <div className="text-[10px] text-[#6b5235]">战棋攻击距离</div>
                                <strong className="font-mono text-[#8f1d14]">
                                  {selectedWeapon.attackRange} 格
                                </strong>
                              </div>
                              <div>
                                <div className="text-[10px] text-[#6b5235]">兵刃劲力属性</div>
                                <strong className="song-serif text-[#23180f]">
                                  {selectedWeapon.forceTrait}
                                </strong>
                              </div>
                              <div>
                                <div className="text-[10px] text-[#6b5235]">皇祐市估价值</div>
                                <strong className="font-mono text-[#52391e]">
                                  {selectedWeapon.value} 两
                                </strong>
                              </div>
                            </div>

                            {/* 装备属性增益 */}
                            <div className="space-y-1.5">
                              <div className="font-bold song-serif text-xs text-[#52391e]">
                                佩备实战与百工增益：
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {formatBonusBadges(selectedWeapon.equipBonus).map((b) => (
                                  <span
                                    key={b}
                                    className="px-2 py-0.5 rounded bg-[#fff9ec] border border-[#bfa680] text-[11px] font-mono font-semibold text-[#7f1d1d]"
                                  >
                                    {b}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* 兵武共鸣与本命绝配武学 */}
                            <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] space-y-2">
                              <div className="font-bold song-serif text-xs text-[#8f1d14]">
                                兵武共鸣规则（对应出战招式外功增幅）：
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedWeapon.synergies.map((syn) => (
                                  <span
                                    key={`${syn.category}-${syn.bonusPct}`}
                                    className="px-2 py-0.5 rounded bg-[#efe4cc] border border-[#9e8462] text-[11px] font-mono text-[#23180f]"
                                  >
                                    {syn.category}招式 +{syn.bonusPct}%
                                  </span>
                                ))}
                              </div>
                              {selectedWeapon.signatureArtIds.length > 0 && (
                                <div className="pt-1 border-t border-dashed border-[#cbb693] space-y-1">
                                  <div className="text-[11px] text-[#5e472d]">
                                    本命绝配武学（额外叠加 <strong>+12%</strong> 绝配共鸣）：
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {selectedWeapon.signatureArtIds.map((aid) => {
                                      const art = MARTIAL_ART_DB_MAP[aid]
                                      return (
                                        <button
                                          key={aid}
                                          type="button"
                                          onClick={() => {
                                            if (art) {
                                              setSelectedArt(art)
                                              setCompendiumTab('martialArts')
                                            }
                                          }}
                                          className="px-2 py-0.5 rounded bg-[#8f1d14]/10 hover:bg-[#8f1d14]/20 border border-[#8f1d14]/50 text-[11px] text-[#781710] font-medium cursor-pointer"
                                        >
                                          {aid} · {art?.cleanName ?? aid} →
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">
                              {selectedWeapon.description}
                            </p>

                            {/* 天阶神兵佩戴门槛 */}
                            {selectedWeapon.prerequisitesText && (
                              <div className="p-3 rounded bg-[#faf3e3] border border-[#b89f78] space-y-2">
                                <div className="font-bold song-serif text-sm text-[#8f1d14]">
                                  天阶神兵认主/佩戴门槛：
                                </div>
                                <div className="text-xs text-[#4a3219] leading-relaxed">
                                  {selectedWeapon.prerequisitesText}
                                </div>
                                {reqCheck.details.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {reqCheck.details.map((d) => (
                                      <span
                                        key={d.stat}
                                        className={`px-2 py-0.5 rounded border font-mono text-[11px] ${
                                          d.met
                                            ? 'bg-[#e3f1e8] border-[#6ca384] text-[#134e32]'
                                            : 'bg-[#fee2e2] border-[#dc2626]/60 text-[#991b1b]'
                                        }`}
                                      >
                                        {d.met ? '✓' : '✗'} {d.stat} ≥ {d.min}（少侠当前 {d.current}）
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* 试佩与行囊调度操作 */}
                            <div className="pt-2 border-t border-[#cbb693] flex flex-wrap items-center justify-between gap-2">
                              {isEquipped ? (
                                <span className="text-xs font-bold text-[#8f1d14] song-serif">
                                  ★ 当前已佩备于少侠【武器】槽位
                                </span>
                              ) : inBagQty > 0 ? (
                                <span className="text-xs font-bold text-[#184f35] song-serif">
                                  ✓ 已在少侠【行囊杂物】中（存有 {inBagQty} 件）
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => acquireWeaponToBag(selectedWeapon.id)}
                                  className="px-3 py-1.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8ee] font-bold song-serif text-xs cursor-pointer transition shadow-sm"
                                >
                                  + 调拨入囊试佩
                                </button>
                              )}

                              <div className="flex items-center gap-2">
                                {!isEquipped && inBagQty > 0 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      equipItemToSlot(selectedWeapon.id, 'weapon')
                                    }
                                    className="px-3 py-1.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                                  >
                                    立即佩备上阵
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedEquipSlot('weapon')
                                    openMenu('loadout')
                                  }}
                                  className="px-2.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 font-bold song-serif text-xs cursor-pointer"
                                >
                                  前往披挂槽 →
                                </button>
                              </div>
                            </div>
                          </>
                        )
                      })() : null}
                    </div>
                  </div>
                    </>
                  )}
                </div>
              )}

              {/* ==================== 图鉴陆：坐骑图鉴（第六卷《名驹鞍辔谱》28 种良驹全录） ==================== */}
              {activeViewKey === 'mounts' && (
                <MountCompendiumPanel
                  selectedMountId={selectedMountCompId}
                  onSelectMount={setSelectedMountCompId}
                  equippedMountId={equipped.mount}
                  inventoryQtyMap={inventoryQtyMap}
                  playerEquipCtx={playerEquipCtx}
                  onOpenRegionInCompendium={(regionId) => {
                    setSelectedRegionCompId(regionId)
                    setCompendiumTab('regions')
                  }}
                  onOpenSectInCompendium={(sectId) => {
                    setSelectedSectCompId(sectId)
                    setCompendiumTab('sects')
                  }}
                  onLocateRegionOnMap={(regionId) => {
                    useGameStore.setState({
                      viewMode: 'world',
                      selectedNodeId: regionId,
                    })
                    closeActiveModal()
                  }}
                  onOpenLoadoutMountSlot={(slot, tab) => {
                    setSelectedEquipSlot(slot)
                    openMenu(tab)
                  }}
                />
              )}

              {/* ==================== 图鉴柒：博物图鉴（典籍书画 100卷 · 丹药毒物 30品 · 雅器百工 50件） ==================== */}
              {activeViewKey === 'treasures' && (() => {
                const selectedTreasure =
                  filteredTreasures.find((it) => it.id === selectedTreasureId) ??
                  filteredTreasures[0] ??
                  null
                const allPct = Math.round(
                  (treasureCollectionStats.ALL.owned /
                    Math.max(1, treasureCollectionStats.ALL.total)) *
                    100,
                )

                return (
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    {/* 顶部总纲横幅与全馆收录进度 */}
                    <div className="p-3.5 rounded bg-gradient-to-r from-[#261910] via-[#352215] to-[#261910] text-[#fbf2e0] border border-[#c89d54] shadow flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-amber-200 border border-amber-300/60 font-bold song-serif text-xs">
                            皇祐四库博物志
                          </span>
                          <h4 className="song-serif font-bold text-base sm:text-lg text-amber-200">
                            典籍书画 · 丹药毒物 · 雅器百工全鉴（共 180 品）
                          </h4>
                        </div>
                        <p className="text-xs text-[#dfd0b3]">
                          统录北宋皇祐二年（1050）百卷秘籍墨宝、三十味灵丹奇毒与五十件传世雅器百工（全库合计：20天阶 · 35地阶 · 55良阶 · 70凡阶）
                        </p>
                      </div>

                      <div className="min-w-[210px] bg-[#1a110a]/80 border border-[#8c6e46]/70 rounded px-3 py-2 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#dfcfb0] song-serif font-semibold">
                            少侠当前博物收录
                          </span>
                          <span className="font-mono font-bold text-amber-300">
                            {treasureCollectionStats.ALL.owned} / {treasureCollectionStats.ALL.total}{' '}
                            品 ({allPct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#382618] overflow-hidden border border-black/40">
                          <div
                            className="h-full bg-gradient-to-r from-[#b45309] via-[#f59e0b] to-[#fde68a] transition-all duration-300"
                            style={{ width: `${allPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 三大分卷 + 三卷合览切换卡 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setTreasureVolFilter('ALL')
                          setTreasureSubTypeFilter('ALL')
                        }}
                        className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                          treasureVolFilter === 'ALL'
                            ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                            : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#2b1a0e] border-[#c8b28e]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-8 h-8 rounded flex items-center justify-center font-bold song-serif text-sm shrink-0 ${
                                treasureVolFilter === 'ALL'
                                  ? 'bg-[#6b140d] text-amber-200 border border-amber-300/50'
                                  : 'bg-[#faf3e3] text-[#8f1d14] border border-[#bfa680]'
                              }`}
                            >
                              总
                            </span>
                            <div className="min-w-0">
                              <div className="song-serif font-bold text-sm truncate">
                                三卷合璧总览
                              </div>
                              <div
                                className={`text-[11px] truncate ${
                                  treasureVolFilter === 'ALL'
                                    ? 'text-amber-200/90'
                                    : 'text-[#6b5235]'
                                }`}
                              >
                                20天 · 35地 · 55良 · 70凡
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-xs font-bold shrink-0 ${
                              treasureVolFilter === 'ALL'
                                ? 'bg-black/30 text-amber-200'
                                : 'bg-[#faf3e3] text-[#52391e]'
                            }`}
                          >
                            180品
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-current/15">
                          <span>已收录 {treasureCollectionStats.ALL.owned} 品</span>
                          <span>{allPct}%</span>
                        </div>
                      </button>

                      {TREASURE_VOLUME_METAS.map((vol) => {
                        const isAct = treasureVolFilter === vol.key
                        const st = treasureCollectionStats[vol.key]
                        const pct = Math.round((st.owned / Math.max(1, st.total)) * 100)
                        const unit =
                          vol.key === 'scrolls' ? '卷' : vol.key === 'medicine' ? '品' : '件'
                        return (
                          <button
                            key={vol.key}
                            type="button"
                            onClick={() => {
                              setTreasureVolFilter(vol.key)
                              setTreasureSubTypeFilter('ALL')
                            }}
                            className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                              isAct
                                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#2b1a0e] border-[#c8b28e]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                                    isAct
                                      ? 'bg-[#6b140d] text-amber-200 border border-amber-300/50'
                                      : 'bg-[#faf3e3] text-[#5c4024] border border-[#bfa680]'
                                  }`}
                                >
                                  {renderBagCatIcon(vol.key, 'w-4 h-4')}
                                </span>
                                <div className="min-w-0">
                                  <div className="song-serif font-bold text-sm truncate">
                                    {vol.volNumeral} · {vol.label}
                                  </div>
                                  <div
                                    className={`text-[11px] truncate ${
                                      isAct ? 'text-amber-200/90' : 'text-[#6b5235]'
                                    }`}
                                  >
                                    {vol.tierSummary}
                                  </div>
                                </div>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded font-mono text-xs font-bold shrink-0 ${
                                  isAct
                                    ? 'bg-black/30 text-amber-200'
                                    : 'bg-[#faf3e3] text-[#52391e]'
                                }`}
                              >
                                {st.total}
                                {unit}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-current/15">
                              <span>
                                已收录 {st.owned} / {st.total} {unit}
                              </span>
                              <span>{pct}%</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* 多维检索与品阶/细类/收录状态筛选栏 */}
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2.5 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[#5c4024] font-bold song-serif mr-0.5">
                            四阶品级：
                          </span>
                          {(
                            [
                              { key: 'ALL', label: '全部品阶' },
                              { key: '天阶', label: '天阶绝品' },
                              { key: '地阶', label: '地阶珍品' },
                              { key: '良阶', label: '良阶佳品' },
                              { key: '凡阶', label: '凡阶常品' },
                            ] as const
                          ).map((t) => {
                            const active = treasureTierFilter === t.key
                            return (
                              <button
                                key={t.key}
                                type="button"
                                onClick={() => setTreasureTierFilter(t.key)}
                                className={`px-2.5 py-1 rounded border font-bold song-serif cursor-pointer transition ${
                                  active
                                    ? 'bg-[#261910] text-amber-200 border-[#f5cb5c]'
                                    : 'bg-[#faf3e3] text-[#4a3219] border-[#bfa680] hover:bg-[#e5d6b8]'
                                }`}
                              >
                                {t.label} ({treasureTierCounts[t.key]})
                              </button>
                            )
                          })}
                        </div>

                        {/* 收录状态过滤 */}
                        <div className="inline-flex rounded border border-[#9e8462] overflow-hidden bg-[#faf3e3]">
                          {(
                            [
                              { key: 'ALL', label: '全部图鉴' },
                              { key: 'OWNED', label: '已收录' },
                              { key: 'UNOWNED', label: '未收录' },
                            ] as const
                          ).map((o, idx) => {
                            const active = treasureOwnedFilter === o.key
                            return (
                              <button
                                key={o.key}
                                type="button"
                                onClick={() => setTreasureOwnedFilter(o.key)}
                                className={`px-2.5 py-1 font-bold song-serif cursor-pointer transition ${
                                  idx > 0 ? 'border-l border-[#9e8462]' : ''
                                } ${
                                  active
                                    ? 'bg-[#215744] text-[#fff8eb]'
                                    : 'text-[#52391e] hover:bg-[#e5d6b8]'
                                }`}
                              >
                                {o.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#d8c5a3]">
                        <select
                          value={treasureSubTypeFilter}
                          onChange={(e) => setTreasureSubTypeFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                        >
                          <option value="ALL">
                            全部器物/典籍细类（{treasureSubTypes.length} 类）
                          </option>
                          {treasureSubTypes.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={treasureQuery}
                          onChange={(e) => setTreasureQuery(e.target.value)}
                          placeholder="检索编号、名目、细类、考据典故、关联武学或药毒功效（如：九转、悲酥、兰亭、九霄环佩、活字、汝窑）…"
                          className="flex-1 min-w-[220px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                        />

                        {(treasureTierFilter !== 'ALL' ||
                          treasureSubTypeFilter !== 'ALL' ||
                          treasureOwnedFilter !== 'ALL' ||
                          treasureQuery.trim() !== '') && (
                          <button
                            type="button"
                            onClick={() => {
                              setTreasureTierFilter('ALL')
                              setTreasureSubTypeFilter('ALL')
                              setTreasureOwnedFilter('ALL')
                              setTreasureQuery('')
                            }}
                            className="px-2.5 py-1.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#781710] font-semibold cursor-pointer"
                          >
                            重置筛选
                          </button>
                        )}

                        <span className="font-mono text-[#5e472d] ml-auto">
                          当前筛选 <strong>{filteredTreasures.length}</strong> /{' '}
                          {treasureVolumeItems.length} 品
                        </span>
                      </div>
                    </div>

                    {/* 主体双栏：左 7 列图鉴名录卡片网格 + 右 5 列考据详录与品鉴操作 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      <div className="lg:col-span-7 bg-[#efe4cc]/70 border border-[#c8b28e] rounded-md p-3.5 min-h-[420px] max-h-[540px] overflow-y-auto scroll-thin">
                        {filteredTreasures.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {filteredTreasures.map((def) => {
                              const isSel = selectedTreasure?.id === def.id
                              const inBagQty = ownedQtyMap.get(def.id) ?? 0
                              const isEquipped = equippedItemIdSet.has(def.id)
                              const normTier = normalizeItemTier(def.rarity)
                              const rStyle = RARITY_STYLE_MAP[def.rarity]
                              const isPurePoison = Boolean(def.poisonEffect && !def.useEffect)

                              return (
                                <button
                                  key={def.id}
                                  type="button"
                                  onClick={() => setSelectedTreasureId(def.id)}
                                  className={`p-3 rounded-md border-2 text-left transition cursor-pointer flex items-start justify-between gap-2 ${
                                    isSel
                                      ? 'bg-[#fff9ec] border-[#8f1d14] ring-1 ring-[#8f1d14] shadow-md'
                                      : `${rStyle.cardBg} ${rStyle.borderCls} hover:brightness-98`
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div
                                      className={`w-10 h-10 rounded border flex flex-col items-center justify-center shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText} border-[#f5cb5c]/50`}
                                    >
                                      {renderBagCatIcon(def.category, 'w-3.5 h-3.5')}
                                      <span className="text-[9px] font-mono leading-none mt-0.5">
                                        {def.id.slice(-3)}
                                      </span>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="song-serif font-bold text-xs sm:text-sm text-[#23180f] truncate">
                                        {def.name}
                                      </div>
                                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                        <span
                                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                                        >
                                          {normTier}
                                        </span>
                                        <span
                                          className={`text-[11px] truncate ${
                                            isPurePoison
                                              ? 'text-[#6b21a8] font-semibold'
                                              : 'text-[#6b5235]'
                                          }`}
                                        >
                                          {def.subType}
                                        </span>
                                        {def.useEffect?.learnArtId && (
                                          <span className="px-1 py-0.2 rounded bg-[#8f1d14]/15 text-[#8f1d14] text-[10px] font-bold">
                                            秘籍
                                          </span>
                                        )}
                                        {def.equipSlot && (
                                          <span className="px-1 py-0.2 rounded bg-[#215744]/15 text-[#184f35] text-[10px] font-bold">
                                            可佩
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-1 shrink-0">
                                    {isEquipped ? (
                                      <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-amber-200 font-mono font-bold text-[10px]">
                                        已佩挂
                                      </span>
                                    ) : inBagQty > 0 ? (
                                      <span className="px-2 py-0.5 rounded bg-[#1f5c3a] text-[#fff8eb] font-mono font-bold text-[10px]">
                                        已藏×{inBagQty}
                                      </span>
                                    ) : (
                                      <span className="px-1.5 py-0.5 rounded bg-[#efe4cc]/85 border border-[#c8b28e] font-mono text-[10px] text-[#7a6042]">
                                        未收录
                                      </span>
                                    )}
                                    <span className="font-mono text-[10px] text-[#6b5235]">
                                      {def.value}两
                                    </span>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-[#7a6042] py-16">
                            <div className="song-serif font-bold text-base">
                              未检索到符合条件的四库奇珍
                            </div>
                            <div className="text-xs mt-1">
                              请尝试切换分卷、品阶或点击上方【重置筛选】
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 右侧：考据详录、药理/武学/十艺效用与品鉴调取台 */}
                      <div className="lg:col-span-5 bg-[#efe4cc] border border-[#c8b28e] rounded-md p-4 flex flex-col justify-between gap-3 max-h-[540px] overflow-y-auto scroll-thin">
                        {selectedTreasure ? (() => {
                          const def = selectedTreasure
                          const normTier = normalizeItemTier(def.rarity)
                          const rStyle = RARITY_STYLE_MAP[def.rarity]
                          const inBagQty = ownedQtyMap.get(def.id) ?? 0
                          const isEquipped = equippedItemIdSet.has(def.id)
                          const volMeta = TREASURE_VOLUME_METAS.find(
                            (v) => v.key === def.category,
                          )
                          const linkedArt = def.useEffect?.learnArtId
                            ? MARTIAL_ART_DB_MAP[def.useEffect.learnArtId]
                            : null
                          const learnedInfo = linkedArt ? learnedMap.get(linkedArt.id) : undefined

                          return (
                            <>
                              <div className="space-y-3">
                                {/* 标题与品阶头栏 */}
                                <div className="border-b border-[#cbb693] pb-2.5">
                                  <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="px-2 py-0.5 rounded bg-[#261910] text-amber-200 font-mono text-xs">
                                        {def.id}
                                      </span>
                                      {volMeta && (
                                        <span className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#bfa680] text-[#52391e] font-bold song-serif text-[11px]">
                                          {volMeta.volNumeral}·{volMeta.label}
                                        </span>
                                      )}
                                      <span
                                        className={`px-2 py-0.5 rounded text-xs font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                                      >
                                        {normTier}
                                      </span>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6b5235]">
                                      {def.subType}
                                    </span>
                                  </div>

                                  <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1.5">
                                    {def.name}
                                  </h4>
                                </div>

                                {/* 三格规制摘要 */}
                                <div className="grid grid-cols-3 gap-2 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-2 text-xs">
                                  <div>
                                    <div className="text-[10px] text-[#6b5235]">器物规制</div>
                                    <strong className="song-serif text-[#23180f]">
                                      {def.equipSlot
                                        ? '可佩雅器'
                                        : def.stackable
                                          ? '叠放消耗'
                                          : '秘藏孤品'}
                                    </strong>
                                  </div>
                                  <div>
                                    <div className="text-[10px] text-[#6b5235]">收录状态</div>
                                    <strong
                                      className={`font-mono ${
                                        isEquipped
                                          ? 'text-[#8f1d14]'
                                          : inBagQty > 0
                                            ? 'text-[#184f35]'
                                            : 'text-[#7a6042]'
                                      }`}
                                    >
                                      {isEquipped
                                        ? '随身佩挂'
                                        : inBagQty > 0
                                          ? `囊藏 ×${inBagQty}`
                                          : '尚未收录'}
                                    </strong>
                                  </div>
                                  <div>
                                    <div className="text-[10px] text-[#6b5235]">皇祐市估</div>
                                    <strong className="font-mono text-[#7f1d1d]">
                                      {def.value} 两
                                    </strong>
                                  </div>
                                </div>

                                {/* 详述与宋人考据题跋 */}
                                <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">
                                  {def.desc}
                                </p>

                                {def.lore && (
                                  <div className="text-xs italic text-[#5e472d] bg-[#faf3e3] border-l-2 border-[#8f1d14] px-3 py-2 rounded-r leading-relaxed">
                                    <span className="not-italic font-bold text-[#8f1d14] song-serif mr-1">
                                      【博物考略】
                                    </span>
                                    {def.lore}
                                  </div>
                                )}

                                {/* 佩挂属性加成（如名琴、玉枰、铜人等可佩雅器） */}
                                {def.equipBonus && (
                                  <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] space-y-1.5">
                                    <div className="text-xs font-bold text-[#52391e] song-serif">
                                      随身佩挂增益（可佩于【配饰壹 / 配饰贰】）：
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {formatBonusBadges(def.equipBonus).map((b) => (
                                        <span
                                          key={b}
                                          className="px-2 py-0.5 rounded bg-[#fff9ec] border border-[#bfa680] font-mono text-[11px] font-semibold text-[#7f1d1d]"
                                        >
                                          {b}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* 展卷研读 / 服食灵丹 / 把玩修习功效 */}
                                {def.useEffect && (
                                  <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] text-xs text-[#1b5132] font-medium leading-relaxed space-y-2">
                                    <div>
                                      <span className="font-bold song-serif text-[#134e32]">
                                        {def.category === 'scrolls'
                                          ? '展卷参悟功效：'
                                          : def.category === 'medicine'
                                            ? '服食药理功效：'
                                            : '把玩修习功效：'}
                                      </span>
                                      {[
                                        def.useEffect.maxHp
                                          ? `气血上限 +${def.useEffect.maxHp}`
                                          : null,
                                        def.useEffect.maxMp
                                          ? `内力上限 +${def.useEffect.maxMp}`
                                          : null,
                                        def.useEffect.maxStamina
                                          ? `体能上限 +${def.useEffect.maxStamina}`
                                          : null,
                                        def.useEffect.hp ? `气血 +${def.useEffect.hp}` : null,
                                        def.useEffect.mp ? `内力 +${def.useEffect.mp}` : null,
                                        def.useEffect.stamina
                                          ? `体能 +${def.useEffect.stamina}`
                                          : null,
                                        def.useEffect.agi ? `身法 +${def.useEffect.agi}` : null,
                                        def.useEffect.res ? `抗性 +${def.useEffect.res}` : null,
                                        def.useEffect.riding
                                          ? `【骑术】+${def.useEffect.riding}`
                                          : null,
                                        def.useEffect.food
                                          ? `粮草 +${def.useEffect.food}日份`
                                          : null,
                                        def.useEffect.skillGain
                                          ? `【${def.useEffect.skillGain[0]}】+${def.useEffect.skillGain[1]}`
                                          : null,
                                        def.useEffect.learnArtHint ?? null,
                                      ]
                                        .filter(Boolean)
                                        .join(' · ')}
                                    </div>

                                    {linkedArt && (
                                      <div className="pt-1.5 border-t border-[#dfd0b3] flex items-center justify-between gap-2 flex-wrap">
                                        <span className="text-[11px] text-[#52391e]">
                                          关联武学：
                                          <strong>{linkedArt.name}</strong>（{linkedArt.id} ·{' '}
                                          {learnedInfo
                                            ? `已习得第 ${learnedInfo.level} 重`
                                            : '尚未习得'}
                                          ）
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSelectedArt(linkedArt)
                                            setCompendiumTab('martialArts')
                                          }}
                                          className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d1b0] border border-[#9e8462] text-[11px] text-[#781710] font-semibold cursor-pointer"
                                        >
                                          查阅武学总纲 →
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* 奇毒涂剂与毒理说明 */}
                                {def.poisonEffect && (
                                  <div className="p-2.5 rounded bg-[#f7eefb] border border-[#9d7bb8] text-xs text-[#4c1d6e] font-medium leading-relaxed">
                                    <span className="font-bold song-serif">毒理与奇门效用：</span>
                                    {def.poisonEffect}
                                  </div>
                                )}
                              </div>

                              {/* 底部调度与直接互动栏 */}
                              <div className="pt-3 border-t border-[#cbb693] flex flex-wrap items-center justify-between gap-2">
                                {!def.stackable && (isEquipped || inBagQty > 0) ? (
                                  <span className="text-xs font-bold text-[#184f35] song-serif">
                                    ✓ {isEquipped ? '已随身佩挂中' : '已收录于少侠行囊'}
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => acquireItemToBag(def.id)}
                                    className="px-3 py-1.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8ee] font-bold song-serif text-xs cursor-pointer transition shadow-sm"
                                  >
                                    {inBagQty > 0
                                      ? `+ 再调取一份 (囊藏×${inBagQty})`
                                      : '+ 调取入囊品鉴'}
                                  </button>
                                )}

                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {def.equipSlot && inBagQty > 0 && !isEquipped && (
                                    <button
                                      type="button"
                                      onClick={() => equipItemToSlot(def.id)}
                                      className="px-2.5 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                                    >
                                      佩挂随身
                                    </button>
                                  )}
                                  {def.useEffect && inBagQty > 0 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        consumeInventoryItem(def.id, Boolean(def.equipSlot))
                                      }
                                      className="px-2.5 py-1.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                                    >
                                      {def.category === 'scrolls'
                                        ? '展卷研读'
                                        : def.category === 'medicine'
                                          ? '立即服食'
                                          : '把玩修习'}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setBagCategory(def.category)
                                      setSelectedBagItemId(def.id)
                                      openMenu('bag')
                                    }}
                                    className="px-2.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 font-bold song-serif text-xs cursor-pointer transition"
                                  >
                                    前往行囊四库 →
                                  </button>
                                </div>
                              </div>
                            </>
                          )
                        })() : (
                          <div className="h-full flex items-center justify-center text-center text-[#7a6042] py-12">
                            请从左侧选择一件典籍、丹毒或雅器查阅考据详录
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* ==================== 肆：工程与标准 ID 字典监控 ==================== */}
              {activeViewKey === 'engineering' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">标准地区 ID</div>
                      <div className="font-mono font-bold text-lg text-[#23180f] mt-0.5">
                        {ID_REGISTRY.counts.regions} 处 (`REG-01..43`)
                      </div>
                      <div className="text-xs text-[#6b5235]">19宋城 + 7外城 + 17秘境雄关</div>
                    </div>

                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">门派与势力 ID</div>
                      <div className="font-mono font-bold text-lg text-[#23180f] mt-0.5">
                        {ID_REGISTRY.counts.majorSects} 大派 + {ID_REGISTRY.counts.minorSects} 小派 +{' '}
                        {ID_REGISTRY.counts.otherOrganizations} 组织
                      </div>
                      <div className="text-xs text-[#6b5235]">`SECT-01..30` / `ORG-01..11`</div>
                    </div>

                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">武学 · 百兵 · 名驹 · 人物</div>
                      <div className="font-mono font-bold text-base sm:text-lg text-[#8f1d14] mt-0.5">
                        {ID_REGISTRY.counts.martialArts} 功 · {ID_REGISTRY.counts.weapons} 兵 ·{' '}
                        {ID_REGISTRY.counts.mounts} 骑 · {ID_REGISTRY.counts.npcs} 人
                      </div>
                      <div className="text-xs text-[#1b5132] font-semibold">
                        未解析悬空引用：0 处
                      </div>
                    </div>

                    <div className="p-3.5 rounded bg-[#e3f1e8] border border-[#6ca384]">
                      <div className="text-[#184f35]">建筑内景 100% 可步入</div>
                      <div className="font-mono font-bold text-lg text-[#134e32] mt-0.5">
                        {ID_REGISTRY.counts.specialBuildingsWithImage} 实景 +{' '}
                        {ID_REGISTRY.counts.specialBuildingsWithSvgFallback} 矢量
                      </div>
                      <div className="text-xs text-[#184f35]">
                        总计 {ID_REGISTRY.counts.totalBuildings} 座建筑挂载完毕
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        旧版 HTML 内联体积 → 现包内 Base64
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">
                        {formatByteSize(
                          ASSET_MANIFEST.legacySizes.northern_song_map_html_bytes +
                            ASSET_MANIFEST.legacySizes.character_portrait_gallery_html_bytes,
                        )}{' '}
                        → <strong className="text-[#1b5132]">0 Bytes</strong>
                      </div>
                    </div>
                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        当前会话按需懒加载静态原画
                      </div>
                      <div className="font-mono text-[#134e32] font-bold mt-1">
                        {telemetry.loadedCount} / {ASSET_MANIFEST.summary.totalExtractedImageFiles}{' '}
                        张（
                        {formatByteSize(telemetry.loadedBytes)}）
                      </div>
                    </div>
                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        可重复数据库编译脚本
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">`npm run build:db`</div>
                    </div>
                  </div>

                  <div className="p-4 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2">
                    <div className="font-bold song-serif text-[#52391e]">
                      当前浏览器已按需拉取的静态原画路径 ({telemetry.loadedUrls.length})
                    </div>
                    <div className="max-h-52 overflow-y-auto scroll-thin bg-[#faf3e3] border border-[#cbb693] rounded p-3 font-mono text-xs space-y-1">
                      {telemetry.loadedUrls.length === 0 ? (
                        <div className="text-[#6b5235]">尚未加载任何大图资源</div>
                      ) : (
                        telemetry.loadedUrls.map((u) => (
                          <div key={u} className="text-[#1b5132]">
                            ✓ {u}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 伍 & 陆：真实多槽位存档 / 读档 ==================== */}
              {(activeViewKey === 'save' || activeViewKey === 'load') && (
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2.5">
                    <div>
                      <div className="text-xs text-[#6b5033]">当前实时时空锚点</div>
                      <div className="font-bold song-serif text-base text-[#23180f]">
                        {formatSongDate(dayCount, shichenIdx)} · {locationLabel}（
                        {viewMode === 'world'
                          ? '第一层：天下山海舆图'
                          : viewMode === 'building'
                            ? `第三层：${activeInteriorBldg?.name ?? '建筑内景'}`
                            : '第二层：地区半3D全景'}
                        ）
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {activeViewKey === 'save' ? (
                        <>
                          <input
                            type="text"
                            value={saveNoteDraft}
                            onChange={(e) => setSaveNoteDraft(e.target.value)}
                            placeholder="可选：输入存档手札备注…"
                            className="px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] w-56 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const snap = buildSaveEnvelope(
                                'slot-1',
                                saveNoteDraft || '手动导出快照',
                              )
                              downloadSaveAsJsonFile(snap)
                              setSaveNotice({
                                text: '已将当前实时进度导出为本地 .json 卷宗文件！',
                                tone: 'success',
                              })
                            }}
                            className="px-3.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 border border-[#c89d54] font-bold song-serif text-xs cursor-pointer"
                          >
                            ⬇ 导出当前状态 (.json)
                          </button>
                        </>
                      ) : (
                        <>
                          <select
                            value={importTargetSlot}
                            onChange={(e) =>
                              setImportTargetSlot(e.target.value as SaveSlotId | 'DIRECT_LOAD')
                            }
                            className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] text-xs cursor-pointer"
                          >
                            <option value="DIRECT_LOAD">导入后立即启封读取</option>
                            {SAVE_SLOT_DEFS.filter((d) => !d.isAuto).map((d) => (
                              <option key={d.slotId} value={d.slotId}>
                                导入并存入：{d.label}
                              </option>
                            ))}
                          </select>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json,application/json"
                            onChange={handleImportFileChange}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3.5 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer shadow"
                          >
                            ⬆ 从本地导入存档 (.json)
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {saveNotice && (
                    <div
                      className={`px-3.5 py-2.5 rounded border font-medium text-xs ${
                        saveNotice.tone === 'error'
                          ? 'bg-[#fee2e2] border-[#dc2626] text-[#7f1d1d]'
                          : 'bg-[#e3f1e8] border-[#6ca384] text-[#134e32]'
                      }`}
                    >
                      {saveNotice.text}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto scroll-thin pr-1">
                    {SAVE_SLOT_DEFS.map((def) => {
                      const env = saveSlots[def.slotId]
                      return (
                        <div
                          key={def.slotId}
                          className={`p-3.5 rounded-md border flex flex-col justify-between gap-2.5 ${
                            def.isAuto
                              ? 'bg-[#efe8d8] border-[#9e8462] md:col-span-2'
                              : 'bg-[#efe4cc] border-[#c8b28e]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-8 h-8 rounded flex items-center justify-center song-serif font-bold text-xs shrink-0 ${
                                  env
                                    ? 'bg-[#8f1d14] text-[#fff8eb] border border-[#f5cb5c]'
                                    : 'bg-[#cbb693] text-[#5c4630]'
                                }`}
                              >
                                {def.badge}
                              </span>
                              <div>
                                <div className="song-serif font-bold text-sm sm:text-base text-[#23180f]">
                                  {def.label}
                                </div>
                                {env ? (
                                  <div className="text-xs text-[#781710] font-medium">
                                    {env.summary.songDate} · {env.summary.regionName}
                                    {env.summary.buildingName
                                      ? ` > ${env.summary.buildingName}`
                                      : env.summary.viewMode === 'world'
                                        ? '（天下舆图）'
                                        : '（地区全景）'}
                                  </div>
                                ) : (
                                  <div className="text-xs text-[#7a6042]">
                                    空置卷宗 · 尚未封存记录
                                  </div>
                                )}
                              </div>
                            </div>

                            {env && (
                              <span className="font-mono text-[11px] text-[#5e472d] shrink-0">
                                {formatSavedTime(env.savedAt)}
                              </span>
                            )}
                          </div>

                          {env && (
                            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#faf3e3] border border-[#cbb693] rounded px-3 py-1.5 text-xs">
                              <span className="font-mono text-[#3d2b19]">
                                血 {env.summary.hp}
                                {typeof env.summary.stamina === 'number'
                                  ? ` · 体 ${env.summary.stamina}`
                                  : ''}{' '}
                                · 内 {env.summary.mp} · 银 {env.summary.silver}两 · 粮{' '}
                                {env.summary.food}份
                              </span>
                              {env.note && (
                                <span className="text-[#6b5235] italic truncate max-w-[220px]">
                                  “{env.note}”
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-end gap-2 pt-0.5 text-xs">
                            {activeViewKey === 'save' && !def.isAuto && (
                              <button
                                type="button"
                                disabled={saveBusy}
                                onClick={() => {
                                  void saveToSlot(def.slotId, saveNoteDraft)
                                  setSaveNoteDraft('')
                                }}
                                className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                              >
                                {env ? '覆盖封存' : '封入此卷'}
                              </button>
                            )}

                            {env && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => loadFromEnvelope(env, true)}
                                  className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                                >
                                  启封读取
                                </button>
                                <button
                                  type="button"
                                  onClick={() => downloadSaveAsJsonFile(env)}
                                  className="px-2.5 py-1.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] cursor-pointer"
                                >
                                  导出JSON
                                </button>
                                <button
                                  type="button"
                                  disabled={saveBusy}
                                  onClick={() => void removeSaveSlot(def.slotId)}
                                  className="px-2.5 py-1.5 rounded bg-[#f8e8e6] hover:bg-[#f2cfcb] border border-[#c98a83] text-[#8f1d14] cursor-pointer"
                                >
                                  抹除
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ==================== 柒：设置面板 ==================== */}
              {activeViewKey === 'settings' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 rounded bg-[#efe4cc] border-2 border-[#b59769] space-y-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold song-serif text-base text-[#23180f]">
                            皇祐雅乐坊 · {bgm.playlist.sceneTitle}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#9e8462] text-xs font-mono text-[#52391e]">
                            {bgm.playlist.tracks.length > 0
                              ? `第 ${bgm.trackIndex + 1} / ${bgm.playlist.tracks.length} 首`
                              : '暂无曲目'}
                          </span>
                        </div>
                        <div className="text-xs text-[#6b5235] mt-0.5">
                          {bgm.playlist.sceneSubtitle}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {bgm.playlist.tracks.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={playPrevBgmTrack}
                              className="px-3 py-2 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] text-xs song-serif cursor-pointer"
                            >
                              上一首
                            </button>
                            <button
                              type="button"
                              onClick={playNextBgmTrack}
                              className="px-3 py-2 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] text-xs song-serif cursor-pointer"
                            >
                              下一首
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={toggleBgmPlayback}
                          className={`px-4 py-2 rounded font-bold song-serif text-xs cursor-pointer transition ${
                            bgm.enabled
                              ? 'bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb]'
                              : 'bg-[#dfd0b2] hover:bg-[#d2c09d] border border-[#8c6e46] text-[#3d2812]'
                          }`}
                        >
                          {bgm.isPlaying
                            ? '当前：丝竹奏鸣中（点击静音）'
                            : bgm.enabled
                              ? '当前：待奏响（点击播放）'
                              : '当前：已静音（点击开启）'}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#faf3e3] border border-[#cbb693] rounded p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="song-serif font-bold text-[#781710]">
                          正在播放：
                          {activeTrackItem
                            ? `${activeTrackItem.label}（${activeTrackItem.url}）`
                            : '当前场景暂无曲目'}
                        </span>
                        <span className="font-mono text-[#5e472d]">
                          {formatAudioTime(bgm.currentTime)} / {formatAudioTime(bgm.duration)}
                        </span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={Math.max(1, Math.floor(bgm.duration || 100))}
                        step={1}
                        value={Math.floor(bgm.currentTime)}
                        onChange={(e) => seekBgmTo(Number(e.target.value))}
                        className="w-full accent-[#8f1d14] cursor-pointer h-1.5"
                      />

                      {bgm.playlist.tracks.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-0.5">
                          {bgm.playlist.tracks.map((tr, idx) => {
                            const isCur = idx === bgm.trackIndex
                            return (
                              <button
                                key={tr.url}
                                type="button"
                                onClick={() => selectBgmTrackIndex(idx)}
                                className={`px-3 py-2 rounded text-left border transition cursor-pointer ${
                                  isCur
                                    ? 'bg-[#5c4024] text-[#fff8ee] border-[#3d2812]'
                                    : 'bg-[#efe4cc] text-[#3d2812] border-[#b8a07a] hover:bg-[#e3d3b3]'
                                }`}
                              >
                                <div className="song-serif font-bold text-xs">
                                  {tr.label}
                                </div>
                                <div
                                  className={`text-[10px] font-mono ${
                                    isCur ? 'text-amber-200' : 'text-[#6b5235]'
                                  }`}
                                >
                                  {tr.fileName} · {formatByteSize(tr.bytes)}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="song-serif font-bold text-[#3d2812] shrink-0">
                        雅乐音量（快捷键 M 静音）：
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={Math.round(bgm.volume * 100)}
                        onChange={(e) => setBgmVolume(Number(e.target.value) / 100)}
                        className="flex-1 accent-[#5c4024] cursor-pointer"
                      />
                      <span className="font-mono font-bold text-[#52391e] w-12 text-right">
                        {Math.round(bgm.volume * 100)}%
                      </span>
                    </div>

                    <div className="text-xs text-[#6b5235] leading-relaxed flex flex-wrap items-center justify-between gap-2 border-t border-[#c8b28e] pt-2">
                      <span>
                        已自动扫描音频曲库：大地图 <strong>{audioCatalog.worldTracks}</strong> 首 ·
                        地区专属 <strong>{audioCatalog.totalRegionTracks}</strong> 首（覆盖{' '}
                        {audioCatalog.regionCountWithMusic}/38 地） · 人物{' '}
                        <strong>{audioCatalog.totalCharacterTracks}</strong> 首 · 事件{' '}
                        <strong>{audioCatalog.totalEventTracks}</strong> 首
                      </span>
                      <span className="font-mono text-[11px]">
                        规则：按 1, 2, 3, 4, 5... 顺序自动循环
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <div>
                      <div className="font-bold song-serif text-[#23180f]">
                        地区与建筑内景牌匾显示
                      </div>
                      <div className="text-xs text-[#6b5235]">
                        隐藏后可纯享宋画青绿山水建筑长卷，悬停依然高亮热区
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleRegionLabels}
                      className="px-3.5 py-2 rounded bg-[#5c4024] text-[#fff8ee] font-semibold text-xs cursor-pointer"
                    >
                      {showRegionLabels ? '当前：显示牌匾' : '当前：纯赏景模式'}
                    </button>
                  </div>

                  <div className="p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <div>
                      <div className="font-bold song-serif text-[#23180f]">
                        天下舆图文字标注预设
                      </div>
                      <div className="text-xs text-[#6b5235]">
                        一键开启全部地名里程标注，或切换为纯净图标视图
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAllLabelToggles(true)}
                        className="px-3 py-2 rounded bg-[#5c4024] text-[#fff8ee] text-xs cursor-pointer"
                      >
                        全部开启
                      </button>
                      <button
                        type="button"
                        onClick={() => setAllLabelToggles(false)}
                        className="px-3 py-2 rounded bg-[#dfd0b2] border border-[#8c6e46] text-[#3d2812] text-xs cursor-pointer"
                      >
                        全部隐藏
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3.5 border-t border-[#d8c7a9] flex items-center justify-between text-xs text-[#6b5235]">
              <span>
                工程架构：Vite 8 + React 19 + TypeScript 7 + Zustand 5 + IndexedDB 多槽位卷宗（1.5× 宽幅展卷视口）
              </span>
              <button
                type="button"
                onClick={closeActiveModal}
                className="px-4 py-2 rounded bg-[#261910] hover:bg-[#3d291a] text-[#fbf2e0] font-bold song-serif transition cursor-pointer"
              >
                {isCompendiumMode ? '收起图鉴' : '收起枢机'}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* ==================== 人物绘像高清点击放大灯箱（Portrait Zoom Lightbox） ==================== */}
      {lightbox && (
        <div
          id="portrait-zoom-lightbox"
          onClick={(e) => {
            e.stopPropagation()
            if (e.target === e.currentTarget) setLightbox(null)
          }}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-[#23170e] text-[#fbf2e0] border-2 border-[#c89d54] rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b border-[#8c6e46]/60 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="song-serif font-bold text-base sm:text-lg text-amber-200 truncate">
                  {lightbox.title}
                </div>
                <div className="text-xs text-[#d6c5a5] truncate mt-0.5">{lightbox.subtitle}</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {lightbox.npc && lightbox.npc.avatarUrl && (
                  <div className="flex items-center rounded overflow-hidden border border-[#c89d54]/60 text-xs">
                    <button
                      type="button"
                      onClick={() => openNpcLightbox(lightbox.npc!, 'fullbody')}
                      className={`px-2.5 py-1 song-serif font-bold cursor-pointer ${
                        lightbox.mode === 'fullbody'
                          ? 'bg-[#8f1d14] text-[#fff8eb]'
                          : 'bg-[#362417] text-[#d6c5a5] hover:bg-[#4a3220]'
                      }`}
                    >
                      全身绘卷
                    </button>
                    <button
                      type="button"
                      onClick={() => openNpcLightbox(lightbox.npc!, 'avatar')}
                      className={`px-2.5 py-1 song-serif font-bold cursor-pointer ${
                        lightbox.mode === 'avatar'
                          ? 'bg-[#8f1d14] text-[#fff8eb]'
                          : 'bg-[#362417] text-[#d6c5a5] hover:bg-[#4a3220]'
                      }`}
                    >
                      半身头像
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-xs font-bold song-serif flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>关闭大图 (ESC)</span>
                </button>
              </div>
            </div>

            <div
              onClick={() => setLightbox(null)}
              title="点击画面任意处收起大图"
              className="flex-1 min-h-0 p-4 bg-[#140d08] flex items-center justify-center overflow-auto cursor-zoom-out"
            >
              <img
                src={resolveAssetUrl(lightbox.url)}
                alt={lightbox.title}
                onLoad={() => recordAssetLoaded(lightbox.url, 125000)}
                className="max-h-[76vh] max-w-full w-auto h-auto object-contain rounded border border-[#c89d54]/50 shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
