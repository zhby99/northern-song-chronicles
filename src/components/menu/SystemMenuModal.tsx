import { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react'
import {
  GEAR_DB_MAP,
  ID_REGISTRY,
  MARTIAL_ARTS_DB,
  MOUNTS_DB,
  NPC_DB_MAP,
  NPCS_DB,
  WEAPON_DB_MAP,
  WEAPONS_DB,
} from '../../data/gameDb'
import { ITEM_DB_MAP, TREASURE_VOLUME_METAS, type TreasureVolumeKey } from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type {
  CompendiumTabKey,
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  CompiledWeaponRecord,
  EquipmentSlotKey,
  EquipmentTier,
  GearSlotType,
  MenuTabKey,
  WeaponSubCategory,
} from '../../types/game'
import { useAssetTelemetry } from '../../utils/assetLoader'
import { formatSongDate, NODE_MAP, WORLD_GRAPH } from '../../utils/mapMath'
import {
  buildNpcLightboxState,
  COMPENDIUM_NAV_ITEMS,
  computeTreasureCollectionStats,
  type LightboxState,
  type NavItemMeta,
  SYSTEM_NAV_ITEMS,
} from './menuShared'
import { PortraitLightbox } from './PortraitLightbox'

const MountCompendiumPanel = lazy(() =>
  import('./MountCompendiumPanel').then((m) => ({ default: m.MountCompendiumPanel })),
)
const RegionCompendiumPanel = lazy(() =>
  import('./RegionCompendiumPanel').then((m) => ({ default: m.RegionCompendiumPanel })),
)
const SectCompendiumPanel = lazy(() =>
  import('./SectCompendiumPanel').then((m) => ({ default: m.SectCompendiumPanel })),
)
const ArmoryTab = lazy(() => import('./tabs/ArmoryTab').then((m) => ({ default: m.ArmoryTab })))
const BagTab = lazy(() => import('./tabs/BagTab').then((m) => ({ default: m.BagTab })))
const EngineeringTab = lazy(() =>
  import('./tabs/EngineeringTab').then((m) => ({ default: m.EngineeringTab })),
)
const HeroTab = lazy(() => import('./tabs/HeroTab').then((m) => ({ default: m.HeroTab })))
const LoadoutTab = lazy(() =>
  import('./tabs/LoadoutTab').then((m) => ({ default: m.LoadoutTab })),
)
const MartialArtsTab = lazy(() =>
  import('./tabs/MartialArtsTab').then((m) => ({ default: m.MartialArtsTab })),
)
const PortraitsTab = lazy(() =>
  import('./tabs/PortraitsTab').then((m) => ({ default: m.PortraitsTab })),
)
const QuestsTab = lazy(() => import('./tabs/QuestsTab').then((m) => ({ default: m.QuestsTab })))
const SaveLoadTab = lazy(() =>
  import('./tabs/SaveLoadTab').then((m) => ({ default: m.SaveLoadTab })),
)
const SettingsTab = lazy(() =>
  import('./tabs/SettingsTab').then((m) => ({ default: m.SettingsTab })),
)
const TreasuresTab = lazy(() =>
  import('./tabs/TreasuresTab').then((m) => ({ default: m.TreasuresTab })),
)

export function SystemMenuModal() {
  const menuOpen = useGameStore((s) => s.menuOpen)
  const activeMenuTab = useGameStore((s) => s.activeMenuTab)
  const compendiumOpen = useGameStore((s) => s.compendiumOpen)
  const activeCompendiumTab = useGameStore((s) => s.activeCompendiumTab)
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const campPos = useGameStore((s) => s.campPos)
  const baseStats = useGameStore((s) => s.baseStats)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const skills = useGameStore((s) => s.skills)
  const equipped = useGameStore((s) => s.equipped)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const equippedArts = useGameStore((s) => s.equippedArts)
  const inventory = useGameStore((s) => s.inventory)
  const consumedUniqueIds = useGameStore((s) => s.consumedUniqueIds)
  const inspectedNpcId = useGameStore((s) => s.inspectedNpcId)
  const traveling = useGameStore((s) => s.traveling)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const openMenu = useGameStore((s) => s.openMenu)
  const closeMenu = useGameStore((s) => s.closeMenu)
  const setMenuTab = useGameStore((s) => s.setMenuTab)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const closeCompendium = useGameStore((s) => s.closeCompendium)
  const setCompendiumTab = useGameStore((s) => s.setCompendiumTab)
  const setBagCategory = useGameStore((s) => s.setBagCategory)
  const clearActionFeedback = useGameStore((s) => s.clearActionFeedback)

  // Cross-tab focus states for System Hub (Loadout & Bag)
  const [selectedEquipSlot, setSelectedEquipSlot] = useState<EquipmentSlotKey>('weapon')
  const [inspectedLearnedArtId, setInspectedLearnedArtId] = useState<string>('MA-179')
  const [selectedBagItemId, setSelectedBagItemId] = useState<string | null>(null)

  // Cross-tab focus states for Compendium (Regions, Sects, Mounts, Portraits, Martial Arts, Armory, Treasures)
  const [selectedRegionCompId, setSelectedRegionCompId] = useState<string>(
    () => activeRegionId || 'bianliang',
  )
  const [selectedSectCompId, setSelectedSectCompId] = useState<string>('SECT-01')
  const [selectedMountCompId, setSelectedMountCompId] = useState<string>('MNT-001')

  const [localNpcScope, setLocalNpcScope] = useState<string>('ALL_WITH_ART')
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

  const [artTierFilter, setArtTierFilter] = useState<string>('ALL')
  const [artCatFilter, setArtCatFilter] = useState<string>('ALL')
  const [selectedArt, setSelectedArt] = useState<CompiledMartialArtRecord | null>(
    () => MARTIAL_ARTS_DB[0] ?? null,
  )

  const [armorySubTab, setArmorySubTab] = useState<'weapons' | GearSlotType>('weapons')
  const [focusedGearId, setFocusedGearId] = useState<string | null>(null)
  const [wpnTierFilter, setWpnTierFilter] = useState<'ALL' | EquipmentTier>('ALL')
  const [wpnTypeFilter, setWpnTypeFilter] = useState<'ALL' | WeaponSubCategory>('ALL')
  const [selectedWeapon, setSelectedWeapon] = useState<CompiledWeaponRecord | null>(
    () => WEAPONS_DB[0] ?? null,
  )

  const [selectedTreasureId, setSelectedTreasureId] = useState<string>('ITM-SCR-001')
  const [treasureVolFilter, setTreasureVolFilter] = useState<'ALL' | TreasureVolumeKey>('ALL')
  const [treasureSubTypeFilter, setTreasureSubTypeFilter] = useState<string>('ALL')

  // High-res portrait / panorama zoom lightbox modal state
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

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

  const learnedArtIds = useMemo(() => new Set(learnedArts.map((e) => e.artId)), [learnedArts])

  const inventoryQtyMap = useMemo(() => {
    const m = new Map<string, number>()
    for (const st of inventory) {
      m.set(st.itemId, st.qty)
    }
    return m
  }, [inventory])

  const treasureCollectionStats = useMemo(
    () => computeTreasureCollectionStats(inventory, equipped, consumedUniqueIds),
    [inventory, equipped, consumedUniqueIds],
  )

  const playerEquipCtx = useMemo(
    () => ({
      maxHp,
      maxMp,
      agility,
      res,
      ridingSkill,
      skills,
      talents: baseStats.talents,
    }),
    [maxHp, maxMp, agility, res, ridingSkill, skills, baseStats.talents],
  )

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

  const activeMeta: NavItemMeta<string> = isCompendiumMode
    ? (COMPENDIUM_NAV_ITEMS.find((m) => m.key === activeCompendiumTab) ?? COMPENDIUM_NAV_ITEMS[0])
    : (SYSTEM_NAV_ITEMS.find((m) => m.key === activeMenuTab) ?? SYSTEM_NAV_ITEMS[0])

  const openNpcLightbox = (npc: CompiledNpcRecord, mode: 'fullbody' | 'avatar') => {
    setLightbox(buildNpcLightboxState(npc, mode))
  }

  const jumpToCompendiumNpc = (npc: CompiledNpcRecord) => {
    setSelectedNpc(npc)
    if (!npc.avatarUrl && !npc.fullbodyUrl && localNpcScope === 'ALL_WITH_ART') {
      setLocalNpcScope('ALL')
    }
    openCompendium('portraits')
  }

  const jumpToCompendiumArt = (art: CompiledMartialArtRecord) => {
    setSelectedArt(art)
    setArtTierFilter('ALL')
    setArtCatFilter('ALL')
    openCompendium('martialArts')
  }

  const jumpToCompendiumWeapon = (wpn: CompiledWeaponRecord) => {
    setArmorySubTab('weapons')
    setFocusedGearId(null)
    setSelectedWeapon(wpn)
    setWpnTierFilter('ALL')
    setWpnTypeFilter('ALL')
    openCompendium('armory')
  }

  const jumpToArtifactInCompendium = (itemId: string) => {
    const wpn = WEAPON_DB_MAP[itemId]
    if (wpn) {
      jumpToCompendiumWeapon(wpn)
      return
    }
    const gear = GEAR_DB_MAP[itemId]
    if (gear) {
      setArmorySubTab(gear.slot)
      setFocusedGearId(itemId)
      openCompendium('armory')
      return
    }
    if (itemId.startsWith('MNT-')) {
      setSelectedMountCompId(itemId)
      openCompendium('mounts')
      return
    }
    const def = ITEM_DB_MAP[itemId]
    if (def && (def.category === 'scrolls' || def.category === 'medicine' || def.category === 'tools')) {
      setTreasureVolFilter(def.category)
      setTreasureSubTypeFilter('ALL')
      setSelectedTreasureId(itemId)
      openCompendium('treasures')
    }
  }

  const locateRegionOnWorldMap = (regionId: string) => {
    useGameStore.setState({
      viewMode: 'world',
      selectedNodeId: regionId,
    })
    closeActiveModal()
  }

  const equippedCount = Object.values(equipped).filter(Boolean).length
  const equippedArtCount = Object.values(equippedArts).filter(Boolean).length
  const ownedWeaponsCount = WEAPONS_DB.filter(
    (w) => equipped.weapon === w.id || (inventoryQtyMap.get(w.id) ?? 0) > 0,
  ).length
  const ownedMountsCount = MOUNTS_DB.filter(
    (m) => equipped.mount === m.id || (inventoryQtyMap.get(m.id) ?? 0) > 0,
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
                  ? `${formatSongDate(dayCount, shichenIdx)} · 舆地43境 / 武林30派+11势力 / 群侠千人谱 / 武学${ID_REGISTRY.counts.martialArts}功 / 披挂268件 / 名驹28骑 / 博物180品 · 按 G 或 ESC 返回舆图`
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
                  <span>名驹收录</span>
                  <span className="font-mono font-bold text-[#781710]">
                    {ownedMountsCount} / {MOUNTS_DB.length} 骑
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
                <SidebarAssetSummaryLine />
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

              {actionFeedback && (
                <div
                  className={`px-3.5 py-2.5 rounded-md border flex items-center justify-between gap-3 text-xs sm:text-sm shadow-xs ${
                    actionFeedback.tone === 'warn'
                      ? 'bg-[#fff4e5] border-[#c97a2b] text-[#7c350d]'
                      : actionFeedback.tone === 'talk'
                        ? 'bg-[#f5eee0] border-[#a88a5e] text-[#4a3219]'
                        : 'bg-[#e6f4ec] border-[#5b9a78] text-[#15462c]'
                  }`}
                >
                  <div className="min-w-0 font-medium leading-relaxed">{actionFeedback.text}</div>
                  <button
                    type="button"
                    onClick={clearActionFeedback}
                    className="px-2 py-0.5 rounded bg-black/5 hover:bg-black/10 text-xs font-mono shrink-0 cursor-pointer"
                    title="关闭提示"
                  >
                    ✕
                  </button>
                </div>
              )}

              <Suspense
                fallback={
                  <div className="py-16 text-center text-sm song-serif text-[#6b5235]">
                    正在展卷调阅典籍……
                  </div>
                }
              >
                {activeViewKey === 'hero' && (
                  <HeroTab locationLabel={locationLabel} onOpenLightbox={setLightbox} />
                )}

                {activeViewKey === 'loadout' && (
                  <LoadoutTab
                    selectedEquipSlot={selectedEquipSlot}
                    onSelectEquipSlot={setSelectedEquipSlot}
                    inspectedLearnedArtId={inspectedLearnedArtId}
                    onSelectInspectedArtId={setInspectedLearnedArtId}
                  />
                )}

                {activeViewKey === 'bag' && (
                  <BagTab
                    selectedBagItemId={selectedBagItemId}
                    onSelectBagItemId={setSelectedBagItemId}
                    onOpenTreasureVolume={(vol) => {
                      setTreasureVolFilter(vol)
                      setTreasureSubTypeFilter('ALL')
                      openCompendium('treasures')
                    }}
                    onJumpToMartialArt={jumpToCompendiumArt}
                    onJumpToEquipSlot={(slot) => {
                      setSelectedEquipSlot(slot)
                      setMenuTab('loadout')
                    }}
                    onJumpToPracticeArt={(artId) => {
                      setInspectedLearnedArtId(artId)
                      setMenuTab('loadout')
                    }}
                  />
                )}

                {activeViewKey === 'quests' && <QuestsTab />}

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
                    onJumpToNpc={jumpToCompendiumNpc}
                    onJumpToWeapon={jumpToCompendiumWeapon}
                    onLocateOnWorldMap={locateRegionOnWorldMap}
                    onEnterCurrentRegion={(regionId) => {
                      useGameStore.getState().enterRegionMap(regionId, false)
                      closeActiveModal()
                    }}
                    onOpenPanoramaLightbox={({ url, title, subtitle }) =>
                      setLightbox({ url, title, subtitle })
                    }
                  />
                )}

                {activeViewKey === 'sects' && (
                  <SectCompendiumPanel
                    selectedFactionId={selectedSectCompId}
                    onSelectFactionId={setSelectedSectCompId}
                    learnedArtIds={learnedArtIds}
                    onJumpToRegion={(regionId) => {
                      setSelectedRegionCompId(regionId)
                      setCompendiumTab('regions')
                    }}
                    onJumpToNpc={jumpToCompendiumNpc}
                    onJumpToArt={jumpToCompendiumArt}
                    onJumpToWeapon={jumpToCompendiumWeapon}
                    onLocateOnWorldMap={locateRegionOnWorldMap}
                    onOpenPortraitLightbox={openNpcLightbox}
                  />
                )}

                {activeViewKey === 'portraits' && (
                  <PortraitsTab
                    selectedNpc={selectedNpc}
                    onSelectNpc={setSelectedNpc}
                    npcScope={npcScope}
                    onChangeNpcScope={setNpcScope}
                    onJumpToSect={(sectId) => {
                      setSelectedSectCompId(sectId)
                      setCompendiumTab('sects')
                    }}
                    onJumpToRegion={(regionId) => {
                      setSelectedRegionCompId(regionId)
                      setCompendiumTab('regions')
                    }}
                    onJumpToMartialArt={jumpToCompendiumArt}
                    onJumpToArtifact={jumpToArtifactInCompendium}
                    onOpenNpcLightbox={openNpcLightbox}
                    onCloseModal={closeActiveModal}
                  />
                )}

                {activeViewKey === 'martialArts' && (
                  <MartialArtsTab
                    selectedArt={selectedArt}
                    onSelectArt={setSelectedArt}
                    artTierFilter={artTierFilter}
                    onChangeArtTierFilter={setArtTierFilter}
                    artCatFilter={artCatFilter}
                    onChangeArtCatFilter={setArtCatFilter}
                    onJumpToLoadoutArt={(artId) => {
                      setInspectedLearnedArtId(artId)
                      openMenu('loadout')
                    }}
                  />
                )}

                {activeViewKey === 'armory' && (
                  <ArmoryTab
                    armorySubTab={armorySubTab}
                    onChangeArmorySubTab={setArmorySubTab}
                    focusedGearId={focusedGearId}
                    onClearFocusedGearId={() => setFocusedGearId(null)}
                    selectedWeapon={selectedWeapon}
                    onSelectWeapon={setSelectedWeapon}
                    wpnTierFilter={wpnTierFilter}
                    onChangeWpnTierFilter={setWpnTierFilter}
                    wpnTypeFilter={wpnTypeFilter}
                    onChangeWpnTypeFilter={setWpnTypeFilter}
                    onJumpToRegion={(regionId) => {
                      setSelectedRegionCompId(regionId)
                      setCompendiumTab('regions')
                    }}
                    onJumpToSect={(sectId) => {
                      setSelectedSectCompId(sectId)
                      setCompendiumTab('sects')
                    }}
                    onJumpToMartialArt={jumpToCompendiumArt}
                    onJumpToWeaponLoadout={() => {
                      setSelectedEquipSlot('weapon')
                      openMenu('loadout')
                    }}
                    onJumpToGearLoadout={(slot) => {
                      setSelectedEquipSlot(slot)
                      openMenu('loadout')
                    }}
                    onJumpToMounts={() => setCompendiumTab('mounts')}
                    onCloseModal={closeActiveModal}
                  />
                )}

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
                    onLocateRegionOnMap={locateRegionOnWorldMap}
                    onOpenLoadoutMountSlot={(slot, tab) => {
                      setSelectedEquipSlot(slot)
                      openMenu(tab)
                    }}
                  />
                )}

                {activeViewKey === 'treasures' && (
                  <TreasuresTab
                    selectedTreasureId={selectedTreasureId}
                    onSelectTreasureId={setSelectedTreasureId}
                    treasureVolFilter={treasureVolFilter}
                    onChangeTreasureVolFilter={setTreasureVolFilter}
                    treasureSubTypeFilter={treasureSubTypeFilter}
                    onChangeTreasureSubTypeFilter={setTreasureSubTypeFilter}
                    treasureCollectionStats={treasureCollectionStats}
                    onJumpToMartialArt={jumpToCompendiumArt}
                    onJumpToBagItem={(category, itemId) => {
                      setBagCategory(category)
                      setSelectedBagItemId(itemId)
                      openMenu('bag')
                    }}
                  />
                )}

                {activeViewKey === 'engineering' && <EngineeringTab />}

                {(activeViewKey === 'save' || activeViewKey === 'load') && (
                  <SaveLoadTab mode={activeViewKey} locationLabel={locationLabel} />
                )}

                {activeViewKey === 'settings' && <SettingsTab />}
              </Suspense>
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

      <PortraitLightbox
        lightbox={lightbox}
        onClose={() => setLightbox(null)}
        onSwitchNpcMode={openNpcLightbox}
      />
    </div>
  )
}

const SidebarAssetSummaryLine = memo(function SidebarAssetSummaryLine() {
  const telemetry = useAssetTelemetry()
  return (
    <div className="flex justify-between">
      <span>驻留缓存</span>
      <span className="font-mono font-bold text-[#52391e]">
        {telemetry.residentImageCount}图 · {telemetry.audioCachedCount}/{telemetry.audioMaxCap}曲
      </span>
    </div>
  )
})
