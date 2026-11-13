import {
  AlertTriangle,
  Building2,
  Compass,
  Landmark,
  MapPin,
  Mountain,
  Navigation,
  Search,
  Shield,
  Users,
  ZoomIn,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  BUILDING_DB_MAP,
  ID_REGISTRY,
  REGIONS_DB,
  WEAPON_DB_MAP,
  getCompiledNpcsByRegion,
} from '../../data/gameDb'
import type {
  CanonicalFactionEntry,
  CompiledBuildingRecord,
  CompiledNpcRecord,
  CompiledRegionRecord,
  CompiledWeaponRecord,
  NodeKind,
  RegimeKey,
} from '../../types/game'
import { recordAssetLoaded, resolveAssetUrl } from '../../utils/assetLoader'
import { ADJACENCY_MAP, NODE_MAP, WORLD_GRAPH } from '../../utils/mapMath'
import { SvgRegionPanoramaFallback } from '../map/SvgRegionPanoramaFallback'

interface RegionCompendiumPanelProps {
  selectedRegionId: string
  onSelectRegionId: (regionId: string) => void
  currentNodeId: string
  hasWildernessCamp: boolean
  isTraveling: boolean
  onJumpToSect: (sectId: string) => void
  onJumpToNpc: (npc: CompiledNpcRecord) => void
  onJumpToWeapon: (weapon: CompiledWeaponRecord) => void
  onLocateOnWorldMap: (regionId: string) => void
  onEnterCurrentRegion: (regionId: string) => void
  onOpenPanoramaLightbox: (payload: {
    url: string
    title: string
    subtitle: string
  }) => void
}

type RegimeFilterKey = 'ALL' | 'song' | 'liao' | 'xixia' | 'dali' | 'tubo' | 'wild'
type NodeTypeFilterKey = 'ALL' | NodeKind

const REGIME_FILTER_OPTIONS: Array<{ key: RegimeFilterKey; label: string }> = [
  { key: 'ALL', label: '全境 43 处' },
  { key: 'song', label: '大宋疆域' },
  { key: 'liao', label: '大辽四京' },
  { key: 'xixia', label: '西夏王庭' },
  { key: 'dali', label: '大理佛国' },
  { key: 'tubo', label: '雪域吐蕃' },
  { key: 'wild', label: '昆仑绝域' },
]

const TYPE_FILTER_OPTIONS: Array<{ key: NodeTypeFilterKey; label: string }> = [
  { key: 'ALL', label: '全部形制' },
  { key: 'city', label: '州府重镇 (26)' },
  { key: 'sect', label: '名山秘境 (14)' },
  { key: 'pass', label: '战略雄关 (3)' },
]

const REGIME_LABEL_MAP: Record<RegimeKey, { name: string; badgeCls: string }> = {
  song: {
    name: '大宋',
    badgeCls: 'bg-[#8f1d14] text-[#fff8eb] border-[#c89d54]',
  },
  liao: {
    name: '大辽',
    badgeCls: 'bg-[#1f3b4d] text-[#e8f4fa] border-[#7fa8c4]',
  },
  xixia: {
    name: '西夏',
    badgeCls: 'bg-[#6b3c1b] text-[#fff3dc] border-[#d4a059]',
  },
  dali: {
    name: '大理',
    badgeCls: 'bg-[#1e563a] text-[#ebfff4] border-[#7bc49d]',
  },
  tubo: {
    name: '吐蕃',
    badgeCls: 'bg-[#54284e] text-[#fcebfa] border-[#c78bbf]',
  },
  wild: {
    name: '塞外绝域',
    badgeCls: 'bg-[#3d362d] text-[#f5efe4] border-[#a89b87]',
  },
}

const NODE_TYPE_META: Record<NodeKind, { label: string; badgeCls: string }> = {
  city: {
    label: '州府重镇',
    badgeCls: 'bg-[#fef3c7] text-[#78350f] border-[#d97706]/50',
  },
  sect: {
    label: '名山秘境',
    badgeCls: 'bg-[#dcfce7] text-[#14532d] border-[#16a34a]/50',
  },
  pass: {
    label: '天下雄关',
    badgeCls: 'bg-[#fee2e2] text-[#7f1d1d] border-[#dc2626]/50',
  },
}

export function RegionCompendiumPanel({
  selectedRegionId,
  onSelectRegionId,
  currentNodeId,
  hasWildernessCamp,
  isTraveling,
  onJumpToSect,
  onJumpToNpc,
  onJumpToWeapon,
  onLocateOnWorldMap,
  onEnterCurrentRegion,
  onOpenPanoramaLightbox,
}: RegionCompendiumPanelProps) {
  const [query, setQuery] = useState('')
  const [regimeFilter, setRegimeFilter] = useState<RegimeFilterKey>('ALL')
  const [typeFilter, setTypeFilter] = useState<NodeTypeFilterKey>('ALL')
  const [onlyFrontierAlert, setOnlyFrontierAlert] = useState(false)

  // Map regionId -> factions headquartered here or having members stationed here
  const sectsByHqRegion = useMemo(() => {
    const map = new Map<string, CanonicalFactionEntry[]>()
    for (const fac of ID_REGISTRY.factions) {
      if (!fac.hqRegionId) continue
      const arr = map.get(fac.hqRegionId) ?? []
      arr.push(fac)
      map.set(fac.hqRegionId, arr)
    }
    return map
  }, [])

  const weaponsByRegion = useMemo(() => {
    const map = new Map<string, CompiledWeaponRecord[]>()
    for (const wRef of ID_REGISTRY.weaponIndex) {
      const fullW = WEAPON_DB_MAP[wRef.id]
      if (!fullW) continue
      const arr = map.get(wRef.regionId) ?? []
      arr.push(fullW)
      map.set(wRef.regionId, arr)
    }
    return map
  }, [])

  const filteredRegions = useMemo(() => {
    const q = query.trim().toLowerCase()
    return REGIONS_DB.filter((r) => {
      if (regimeFilter !== 'ALL' && r.regime !== regimeFilter) return false
      if (typeFilter !== 'ALL' && r.type !== typeFilter) return false
      if (onlyFrontierAlert && !r.alert) return false
      if (!q) return true

      const hqSects = sectsByHqRegion.get(r.id) ?? []
      return (
        r.standardCode.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.circuit.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.windscapeLore.toLowerCase().includes(q) ||
        r.rumor.toLowerCase().includes(q) ||
        r.landmarks.some((l) => l.toLowerCase().includes(q)) ||
        r.sects.some((s) => s.toLowerCase().includes(q)) ||
        r.legacyAliases.some((a) => a.toLowerCase().includes(q)) ||
        hqSects.some((f) => f.name.toLowerCase().includes(q))
      )
    })
  }, [query, regimeFilter, typeFilter, onlyFrontierAlert, sectsByHqRegion])

  const activeRegion: CompiledRegionRecord = useMemo(() => {
    const exact = REGIONS_DB.find((r) => r.id === selectedRegionId)
    if (exact && filteredRegions.some((r) => r.id === exact.id)) return exact
    return filteredRegions[0] ?? exact ?? REGIONS_DB[0]
  }, [selectedRegionId, filteredRegions])

  const specialBuildings: CompiledBuildingRecord[] = useMemo(
    () =>
      activeRegion.specialBuildingIds
        .map((id) => BUILDING_DB_MAP[id])
        .filter((b): b is CompiledBuildingRecord => Boolean(b)),
    [activeRegion],
  )

  const baseBuildings: CompiledBuildingRecord[] = useMemo(
    () =>
      activeRegion.baseBuildingIds
        .map((id) => BUILDING_DB_MAP[id])
        .filter((b): b is CompiledBuildingRecord => Boolean(b)),
    [activeRegion],
  )

  const residentNpcs = useMemo(
    () => getCompiledNpcsByRegion(activeRegion.id),
    [activeRegion.id],
  )

  const hqFactions = useMemo(
    () => sectsByHqRegion.get(activeRegion.id) ?? [],
    [sectsByHqRegion, activeRegion.id],
  )

  const stationedFactions = useMemo(() => {
    const counts = new Map<string, number>()
    for (const n of residentNpcs) {
      counts.set(n.factionId, (counts.get(n.factionId) ?? 0) + 1)
    }
    return ID_REGISTRY.factions
      .filter((f) => (counts.get(f.id) ?? 0) > 0)
      .map((f) => ({
        faction: f,
        localCount: counts.get(f.id) ?? 0,
        isHq: f.hqRegionId === activeRegion.id,
      }))
      .sort((a, b) => {
        if (a.isHq !== b.isHq) return a.isHq ? -1 : 1
        return b.localCount - a.localCount
      })
  }, [residentNpcs, activeRegion.id])

  const neighborEdges = useMemo(
    () => ADJACENCY_MAP[activeRegion.id] ?? [],
    [activeRegion.id],
  )

  const localWeapons = useMemo(
    () => weaponsByRegion.get(activeRegion.id) ?? [],
    [weaponsByRegion, activeRegion.id],
  )

  const isPlayerHere =
    currentNodeId === activeRegion.id && !hasWildernessCamp && !isTraveling
  const [vw, vh] = activeRegion.isoViewBox
  const regimeMeta = REGIME_LABEL_MAP[activeRegion.regime] ?? REGIME_LABEL_MAP.song
  const typeMeta = NODE_TYPE_META[activeRegion.type]

  const totalCitiesCount = useMemo(
    () => REGIONS_DB.filter((r) => r.type === 'city').length,
    [],
  )
  const handPaintedCount = useMemo(
    () => REGIONS_DB.filter((r) => Boolean(r.panoramaUri)).length,
    [],
  )

  return (
    <div className="space-y-4">
      {/* 顶部总览横幅 */}
      <div className="p-3.5 rounded-md bg-gradient-to-r from-[#20382c] via-[#274637] to-[#20382c] text-[#fbf2e0] border border-[#c89d54]/70 shadow flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#15281f] border border-[#f5cb5c]/60 flex items-center justify-center text-amber-300 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="song-serif font-bold text-sm sm:text-base text-amber-200 flex items-center gap-2">
              <span>《皇祐山海舆地全鉴》· 四十三地三层空间总录</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/35 border border-[#c89d54]/50 text-[#f5dfb5]">
                REG-01 ~ REG-43
              </span>
            </div>
            <p className="text-xs text-[#d6e4dc] mt-0.5">
              统辖天下 <strong>{totalCitiesCount}</strong> 座州府王都与{' '}
              <strong>{REGIONS_DB.length - totalCitiesCount}</strong> 处名山秘境雄关 · 共计{' '}
              <strong>{ID_REGISTRY.counts.specialBuildings}</strong> 座特殊地标建筑（含{' '}
              {ID_REGISTRY.counts.interiorSubBuildings ?? 414} 处内景子院）+{' '}
              <strong>{ID_REGISTRY.counts.cityBaseBuildings}</strong> 座市井基础建筑 ·{' '}
              {handPaintedCount} 幅手绘青绿全景 + {REGIONS_DB.length - handPaintedCount} 幅宋辽营造矢量长卷
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectRegionId(currentNodeId)}
          className="px-3 py-1.5 rounded bg-[#f5cb5c] hover:bg-[#fbd978] text-[#23180f] font-bold song-serif text-xs shadow transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>定位少侠当前驻地（{NODE_MAP[currentNodeId]?.name ?? currentNodeId}）</span>
        </button>
      </div>

      {/* 多维筛选控制栏 */}
      <div className="p-3.5 rounded-md bg-[#efe4cc] border border-[#c8b28e] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold song-serif text-[#4a3219] mr-1">政权疆界：</span>
            {REGIME_FILTER_OPTIONS.map((opt) => {
              const active = regimeFilter === opt.key
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setRegimeFilter(opt.key)}
                  className={`px-2.5 py-1 rounded text-xs song-serif border transition cursor-pointer ${
                    active
                      ? 'bg-[#1f5c3a] text-[#fff8eb] border-[#f5cb5c] font-bold shadow-xs'
                      : 'bg-[#faf4e6] hover:bg-[#e5d6b7] text-[#3d2812] border-[#bfa782]'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setOnlyFrontierAlert((v) => !v)}
            className={`px-2.5 py-1 rounded text-xs song-serif border flex items-center gap-1 transition cursor-pointer ${
              onlyFrontierAlert
                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] font-bold'
                : 'bg-[#faf4e6] hover:bg-[#e5d6b7] text-[#5c2818] border-[#bfa782]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>边防渗透警报区</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-[#d8c6a8]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold song-serif text-[#4a3219] mr-1">地理形制：</span>
            {TYPE_FILTER_OPTIONS.map((opt) => {
              const active = typeFilter === opt.key
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setTypeFilter(opt.key)}
                  className={`px-2.5 py-1 rounded text-xs song-serif border transition cursor-pointer ${
                    active
                      ? 'bg-[#5c4024] text-[#fff8eb] border-[#d9b36c] font-bold'
                      : 'bg-[#faf4e6] hover:bg-[#e5d6b7] text-[#3d2812] border-[#bfa782]'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-3.5 h-3.5 text-[#7a6042] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="检索 REG 编号 / 州府名山 / 路道 / 地标 / 门派..."
              className="w-full pl-8 pr-3 py-1 rounded bg-[#fffdf8] border border-[#b59c77] text-xs text-[#23180f] placeholder:text-[#8c7353] focus:outline-none focus:border-[#1f5c3a]"
            />
          </div>
        </div>
      </div>

      {/* 主体：左侧 43 地区卷目列表 + 右侧舆地全景与建筑群侠详卷 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 左侧目录 */}
        <div className="lg:col-span-4 rounded-md bg-[#efe4cc] border border-[#bfa782] flex flex-col h-[590px] overflow-hidden">
          <div className="px-3.5 py-2.5 bg-[#dfd0b2] border-b border-[#bfa782] flex items-center justify-between text-xs font-bold song-serif text-[#3b2712]">
            <span>山海舆地目录</span>
            <span className="font-mono text-[11px] text-[#5c4024]">
              匹配 {filteredRegions.length} / {REGIONS_DB.length} 处
            </span>
          </div>

          <div className="flex-1 overflow-y-auto scroll-thin p-2 space-y-1.5">
            {filteredRegions.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#6b5235] song-serif">
                未检索到匹配的州府或名山秘境，请调整上方筛选条件。
              </div>
            ) : (
              filteredRegions.map((reg) => {
                const isSelected = reg.id === activeRegion.id
                const isCurHere = reg.id === currentNodeId && !hasWildernessCamp
                const rBadge = REGIME_LABEL_MAP[reg.regime] ?? REGIME_LABEL_MAP.song
                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => onSelectRegionId(reg.id)}
                    className={`w-full p-2.5 rounded border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#1f5c3a] text-[#fff8eb] border-2 border-[#f5cb5c] shadow-md'
                        : 'bg-[#faf4e6] hover:bg-[#eadcc2] text-[#23180f] border-[#cbb693]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                            isSelected
                              ? 'bg-black/30 text-amber-200 border-amber-300/50'
                              : 'bg-[#e8dac0] text-[#52391e] border-[#bfa782]'
                          }`}
                        >
                          {reg.standardCode}
                        </span>
                        <span className="song-serif font-bold text-sm truncate">{reg.name}</span>
                        {isCurHere && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-[#23180f] font-bold shrink-0">
                            驻留中
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 font-semibold ${rBadge.badgeCls}`}
                      >
                        {rBadge.name}
                      </span>
                    </div>

                    <div
                      className={`mt-1.5 flex items-center justify-between text-[11px] ${
                        isSelected ? 'text-[#d8ede1]' : 'text-[#6b5235]'
                      }`}
                    >
                      <span className="truncate">
                        {reg.circuit} · {reg.type === 'city' ? '州府' : reg.type === 'sect' ? '名山秘境' : '雄关'}
                      </span>
                      <span className="font-mono shrink-0 flex items-center gap-2">
                        {reg.alert && (
                          <span
                            className={
                              isSelected ? 'text-amber-300 font-bold' : 'text-[#991b1b] font-bold'
                            }
                          >
                            ★警
                          </span>
                        )}
                        <span>
                          {reg.specialBuildingIds.length + reg.baseBuildingIds.length}建 ·{' '}
                          {reg.residentNpcIds.length}人
                        </span>
                      </span>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* 右侧舆地详卷 */}
        <div className="lg:col-span-8 rounded-md bg-[#fffbf2] border border-[#bfa782] p-4 space-y-4 h-[590px] overflow-y-auto scroll-thin">
          {/* 标题头与快捷跳转 */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#d8c6a8] pb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-300 font-bold">
                  {activeRegion.standardCode}
                </span>
                <h4 className="song-serif font-bold text-xl text-[#23180f]">
                  {activeRegion.name}
                </h4>
                <span
                  className={`text-xs px-2 py-0.5 rounded border font-bold song-serif ${regimeMeta.badgeCls}`}
                >
                  {regimeMeta.name} · {activeRegion.circuit}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded border font-semibold ${typeMeta.badgeCls}`}
                >
                  {typeMeta.label}
                </span>
                {activeRegion.alert && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[#fee2e2] text-[#991b1b] border border-[#f87171] font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    边关暗流警报
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6b5235] mt-1 font-serif">
                {activeRegion.sceneSubtitle}
                {activeRegion.legacyAliases.length > 0 && (
                  <span className="ml-2 text-[#8c7353]">
                    （古称/别称：{activeRegion.legacyAliases.join('、')}）
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onLocateOnWorldMap(activeRegion.id)}
                className="px-3 py-1.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-xs font-bold song-serif flex items-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>舆图寻路定位 →</span>
              </button>
              {isPlayerHere && (
                <button
                  type="button"
                  onClick={() => onEnterCurrentRegion(activeRegion.id)}
                  className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#f5cb5c] text-xs font-bold song-serif flex items-center gap-1.5 cursor-pointer transition shadow-xs"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>步入本地全景 →</span>
                </button>
              )}
            </div>
          </div>

          {/* 等轴全景画卷预览（38 手绘 JPG + 5 新辟州府青绿营造 SVG 矢量长卷） */}
          <div className="rounded-md overflow-hidden border-2 border-[#bfa782] bg-[#1b130d] relative group shadow">
            {activeRegion.panoramaUri ? (
              <div
                onClick={() =>
                  onOpenPanoramaLightbox({
                    url: activeRegion.panoramaUri,
                    title: `${activeRegion.standardCode} ${activeRegion.name} · 半3D青绿重彩全景长卷`,
                    subtitle: `${regimeMeta.name} · ${activeRegion.circuit} · ${activeRegion.sceneSubtitle}`,
                  })
                }
                title="点击放大品鉴高清全景画卷"
                className="relative aspect-[16/9] w-full overflow-hidden cursor-zoom-in"
              >
                <img
                  src={resolveAssetUrl(activeRegion.panoramaUri)}
                  alt={activeRegion.name}
                  loading="lazy"
                  onLoad={() => recordAssetLoaded(activeRegion.panoramaUri, 195000)}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/75 text-[#fff8eb] border border-[#c89d54]/70 text-[11px] song-serif flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                  <span>手绘青绿全景 · 点击放大品鉴</span>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <svg
                  viewBox={`0 0 ${vw} ${vh}`}
                  className="w-full h-full block"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <SvgRegionPanoramaFallback
                    regionId={activeRegion.id}
                    regionName={activeRegion.name}
                    regime={activeRegion.regime}
                    circuit={activeRegion.circuit}
                    width={vw}
                    height={vh}
                  />
                </svg>
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-black/75 text-amber-200 border border-[#c89d54]/70 text-[11px] song-serif">
                  《营造法式》青绿山水矢量长卷
                </div>
              </div>
            )}
          </div>

          {/* 风物考据 & 江湖风闻 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-1.5">
              <div className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-[#1f5c3a]" />
                <span>山川形势与皇祐风物志</span>
              </div>
              <p className="text-xs text-[#2b1d10] leading-relaxed">{activeRegion.desc}</p>
              {activeRegion.windscapeLore &&
                activeRegion.windscapeLore !== activeRegion.sceneSubtitle && (
                  <p className="text-[11px] text-[#5e472d] leading-relaxed border-t border-[#decba8] pt-1.5">
                    {activeRegion.windscapeLore}
                  </p>
                )}
            </div>

            <div className="p-3 rounded bg-[#fbf2e4] border border-[#d9b38c] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold song-serif text-[#781710] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>皇祐二年（1050）地方风闻录</span>
                </div>
                <p className="text-xs text-[#3b2314] leading-relaxed">
                  {activeRegion.rumor || '四方商旅往来络绎，茶肆酒旗间多有江湖豪客纵论天下武事。'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#e3c7a6] text-center">
                <div className="p-1.5 rounded bg-[#fff9ef] border border-[#dec4a1]">
                  <div className="text-[10px] text-[#6b5235]">特殊地标</div>
                  <div className="font-mono font-bold text-sm text-[#8f1d14]">
                    {specialBuildings.length} 座
                  </div>
                </div>
                <div className="p-1.5 rounded bg-[#fff9ef] border border-[#dec4a1]">
                  <div className="text-[10px] text-[#6b5235]">市井基础</div>
                  <div className="font-mono font-bold text-sm text-[#1f5c3a]">
                    {baseBuildings.length} 座
                  </div>
                </div>
                <div className="p-1.5 rounded bg-[#fff9ef] border border-[#dec4a1]">
                  <div className="text-[10px] text-[#6b5235]">常驻群侠</div>
                  <div className="font-mono font-bold text-sm text-[#23180f]">
                    {residentNpcs.length} 人
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 驻扎门派与关联势力（点击直达【门派图鉴】） */}
          <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold song-serif text-[#4a3219]">
                总舵驻派与地方活动势力（点击直达【贰 · 门派图鉴】）
              </span>
              {hqFactions.length > 0 && (
                <span className="text-[11px] text-[#1f5c3a] font-semibold">
                  共 {hqFactions.length} 处势力设总舵于此
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stationedFactions.map(({ faction, localCount, isHq }) => (
                <button
                  key={faction.id}
                  type="button"
                  onClick={() => onJumpToSect(faction.id)}
                  className={`px-2.5 py-1 rounded border text-xs song-serif flex items-center gap-1.5 transition cursor-pointer ${
                    isHq
                      ? 'bg-[#8f1d14] hover:bg-[#a62319] text-[#fff8eb] border-[#f5cb5c] font-bold shadow-xs'
                      : 'bg-[#fffdf8] hover:bg-[#e7d9bc] text-[#2b1a0e] border-[#bfa782]'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-85">{faction.id}</span>
                  <span>{faction.name}</span>
                  {isHq && (
                    <span className="text-[10px] px-1 rounded bg-amber-300 text-[#23180f] font-bold">
                      总舵
                    </span>
                  )}
                  <span className="font-mono text-[10px] opacity-80">({localCount}人)</span>
                </button>
              ))}
            </div>
          </div>

          {/* 官道水驿相邻路线网 */}
          <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
            <div className="text-xs font-bold song-serif text-[#4a3219] flex items-center justify-between">
              <span>四通八达 · 相邻官道水陆驿路（共 {neighborEdges.length} 条直通干线）</span>
              <span className="text-[11px] text-[#6b5235] font-normal">点击邻近节点可切换查阅</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {neighborEdges.map((edge) => {
                const nb = REGIONS_DB.find((r) => r.id === edge.to)
                const tMeta = WORLD_GRAPH.terrainMeta[edge.terrain]
                if (!nb) return null
                return (
                  <button
                    key={edge.to}
                    type="button"
                    onClick={() => onSelectRegionId(nb.id)}
                    className="px-2.5 py-1.5 rounded bg-[#fffdf8] hover:bg-[#e7d9bc] border border-[#bfa782] text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <span className="font-mono text-[10px] text-[#6b5235]">{nb.standardCode}</span>
                    <span className="song-serif font-bold text-[#23180f]">{nb.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#efe4cc] text-[#52391e]">
                      {tMeta?.name ?? edge.terrain} · {edge.dist}里
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 特殊地标建筑与基础建筑全录 */}
          <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#8f1d14]" />
                <span>
                  城郭山门建筑全录（★特殊地标 {specialBuildings.length} 座 + 市井基础{' '}
                  {baseBuildings.length} 座）
                </span>
              </span>
              <span className="text-[11px] text-[#6b5235]">
                出城/山门：{activeRegion.gate.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specialBuildings.map((b) => {
                const spotCount = b.interior?.spots.length ?? 0
                return (
                  <div
                    key={b.id}
                    className="p-2.5 rounded bg-[#fffdf8] border border-[#cfa96e] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="song-serif font-bold text-xs text-[#781710] truncate">
                        ★ {b.name}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                          b.hasPanoramaImage
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {b.hasPanoramaImage ? '手绘内景' : '营造矢量院'} · {spotCount}子院
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5e472d] line-clamp-2">{b.desc}</p>
                    <div className="flex items-center justify-between text-[10px] text-[#7a6042] pt-0.5">
                      <span>交互：{b.actLabel}</span>
                      <span className="font-mono font-semibold text-[#23180f]">
                        驻留 {b.residentNpcIds.length} 人
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {baseBuildings.length > 0 && (
              <div className="pt-1.5 border-t border-[#decba8]">
                <div className="text-[11px] font-semibold text-[#5e472d] mb-1.5">
                  五类城池常设坊市建筑：
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {baseBuildings.map((b) => (
                    <span
                      key={b.id}
                      className="px-2 py-1 rounded bg-[#faf4e6] border border-[#cbb693] text-[11px] text-[#3b2712]"
                    >
                      <strong className="song-serif">{b.name}</strong>
                      <span className="font-mono text-[10px] text-[#6b5235] ml-1">
                        ({b.residentNpcIds.length}人)
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 地方名兵特产（若有） */}
          {localWeapons.length > 0 && (
            <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
              <div className="text-xs font-bold song-serif text-[#4a3219]">
                本境百兵谱神兵名刃（共 {localWeapons.length} 件 · 点击直达【伍 · 披挂总纲】）
              </div>
              <div className="flex flex-wrap gap-1.5">
                {localWeapons.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onJumpToWeapon(w)}
                    className="px-2.5 py-1 rounded bg-[#fffdf8] hover:bg-[#e7d9bc] border border-[#bfa782] text-xs song-serif flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="font-mono text-[10px] text-[#781710]">{w.id}</span>
                    <span className="font-bold text-[#23180f]">{w.name}</span>
                    <span className="text-[10px] px-1 rounded bg-[#efe4cc] text-[#52391e]">
                      {w.fullTier} · {w.weaponType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 常驻代表群侠（点击直达【叁 · 群侠图鉴】） */}
          <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1f5c3a]" />
                <span>
                  本境常驻历史名臣与江湖群侠（共 {residentNpcs.length} 人 · 点击直达【叁 · 群侠图鉴】）
                </span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {residentNpcs.slice(0, 12).map((npc) => (
                <button
                  key={npc.id}
                  type="button"
                  onClick={() => onJumpToNpc(npc)}
                  className="p-2 rounded bg-[#fffdf8] hover:bg-[#eadcc2] border border-[#cbb693] text-left flex items-center gap-2 transition cursor-pointer"
                >
                  {npc.avatarUrl ? (
                    <img
                      src={resolveAssetUrl(npc.avatarUrl)}
                      alt={npc.name}
                      loading="lazy"
                      onLoad={() => recordAssetLoaded(npc.avatarUrl!, 48000)}
                      className="w-9 h-9 rounded-full object-cover border border-[#8c6e46] shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#3b2712] text-amber-200 border border-[#c89d54] flex items-center justify-center song-serif font-bold text-xs shrink-0">
                      {npc.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="song-serif font-bold text-xs text-[#23180f] truncate">
                        {npc.name}
                      </span>
                      <span className="text-[10px] px-1 rounded bg-[#efe4cc] text-[#781710] shrink-0">
                        {npc.realm}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6b5235] truncate">
                      {npc.factionName} · {npc.assignedBuildingName}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {residentNpcs.length > 12 && (
              <div className="text-[11px] text-[#6b5235] text-right">
                其余 {residentNpcs.length - 12} 位本境驻留人物可在【叁 · 群侠图鉴】按地区筛选全览
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
