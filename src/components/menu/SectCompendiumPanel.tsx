import {
  Award,
  Building2,
  Compass,
  Crown,
  Flame,
  MapPin,
  Search,
  Shield,
  Sword,
  Users,
  ZoomIn,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  BUILDING_DB_MAP,
  ID_REGISTRY,
  MARTIAL_ART_DB_MAP,
  NPCS_DB,
  NPC_DB_MAP,
  REGION_DB_MAP,
  WEAPON_DB_MAP,
} from '../../data/gameDb'
import type {
  CanonicalFactionEntry,
  CompiledBuildingRecord,
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  CompiledWeaponRecord,
  SectTierKind,
} from '../../types/game'
import { ManagedAssetImg } from '../common/ManagedAssetImg'

interface SectCompendiumPanelProps {
  selectedFactionId: string
  onSelectFactionId: (factionId: string) => void
  learnedArtIds: Set<string>
  onJumpToRegion: (regionId: string) => void
  onJumpToNpc: (npc: CompiledNpcRecord) => void
  onJumpToArt: (art: CompiledMartialArtRecord) => void
  onJumpToWeapon: (weapon: CompiledWeaponRecord) => void
  onLocateOnWorldMap: (regionId: string) => void
  onOpenPortraitLightbox: (npc: CompiledNpcRecord, mode: 'fullbody' | 'avatar') => void
}

type TierFilterKey = 'ALL' | SectTierKind

const TIER_FILTER_OPTIONS: Array<{ key: TierFilterKey; label: string }> = [
  { key: 'ALL', label: `全录 ${ID_REGISTRY.factions.length} 势力` },
  {
    key: '一流大派',
    label: `一流名门大派 (${ID_REGISTRY.factions.filter((f) => f.sectTier === '一流大派').length})`,
  },
  {
    key: '二流门派',
    label: `二流世家武盟 (${ID_REGISTRY.factions.filter((f) => f.sectTier === '二流门派').length})`,
  },
  {
    key: '三流小派',
    label: `三流市井武馆 (${ID_REGISTRY.factions.filter((f) => f.sectTier === '三流小派').length})`,
  },
  {
    key: '朝堂与地域组织',
    label: `庙堂儒林与四夷 (${ID_REGISTRY.factions.filter((f) => f.sectTier === '朝堂与地域组织').length})`,
  },
]

const TIER_BADGE_META: Record<SectTierKind, { badgeCls: string; shortTag: string }> = {
  一流大派: {
    badgeCls: 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c]',
    shortTag: '一流泰斗',
  },
  二流门派: {
    badgeCls: 'bg-[#1f5c3a] text-[#ebfff4] border-[#7bc49d]',
    shortTag: '二流中坚',
  },
  三流小派: {
    badgeCls: 'bg-[#5c4024] text-[#fff3dc] border-[#d4a059]',
    shortTag: '三流筑基',
  },
  朝堂与地域组织: {
    badgeCls: 'bg-[#253c52] text-[#e8f4fa] border-[#82adc9]',
    shortTag: '庙堂四夷',
  },
}

const ART_TIER_BADGE_CLS: Record<string, string> = {
  天阶: 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c]',
  地阶: 'bg-[#54284e] text-[#fcebfa] border-[#c78bbf]',
  良品: 'bg-[#1f5c3a] text-[#ebfff4] border-[#7bc49d]',
  凡品: 'bg-[#4f4335] text-[#f5efe4] border-[#b59c77]',
}

export function SectCompendiumPanel({
  selectedFactionId,
  onSelectFactionId,
  learnedArtIds,
  onJumpToRegion,
  onJumpToNpc,
  onJumpToArt,
  onJumpToWeapon,
  onLocateOnWorldMap,
  onOpenPortraitLightbox,
}: SectCompendiumPanelProps) {
  const [query, setQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<TierFilterKey>('ALL')
  const [groupFilter, setGroupFilter] = useState<string>('ALL')

  const npcsByFaction = useMemo(() => {
    const map = new Map<string, CompiledNpcRecord[]>()
    for (const npc of NPCS_DB) {
      const arr = map.get(npc.factionId) ?? []
      arr.push(npc)
      map.set(npc.factionId, arr)
    }
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => {
        if (a.realmRank !== b.realmRank) return a.realmRank - b.realmRank
        return a.id.localeCompare(b.id)
      })
      map.set(k, arr)
    }
    return map
  }, [])

  const availableGroups = useMemo(() => {
    const base =
      tierFilter === 'ALL'
        ? ID_REGISTRY.factions
        : ID_REGISTRY.factions.filter((f) => f.sectTier === tierFilter)
    const s = new Set<string>()
    for (const f of base) {
      s.add(f.group)
    }
    return Array.from(s)
  }, [tierFilter])

  const filteredFactions = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ID_REGISTRY.factions.filter((f) => {
      if (tierFilter !== 'ALL' && f.sectTier !== tierFilter) return false
      if (groupFilter !== 'ALL' && f.group !== groupFilter) return false
      if (!q) return true

      const hqName = f.hqRegionId ? (REGION_DB_MAP[f.hqRegionId]?.name.toLowerCase() ?? '') : ''
      const leaderNames = f.leaderNpcIds
        .map((id) => NPC_DB_MAP[id]?.name.toLowerCase() ?? '')
        .join(' ')
      const artNames = f.martialArtIds
        .map((id) => MARTIAL_ART_DB_MAP[id]?.name.toLowerCase() ?? '')
        .join(' ')

      return (
        f.id.toLowerCase().includes(q) ||
        f.name.toLowerCase().includes(q) ||
        f.shortName.toLowerCase().includes(q) ||
        f.group.toLowerCase().includes(q) ||
        f.stance.toLowerCase().includes(q) ||
        f.stanceMotto.toLowerCase().includes(q) ||
        f.summary.toLowerCase().includes(q) ||
        f.entryAndFeatures.toLowerCase().includes(q) ||
        f.aliases.some((a) => a.toLowerCase().includes(q)) ||
        hqName.includes(q) ||
        leaderNames.includes(q) ||
        artNames.includes(q)
      )
    })
  }, [query, tierFilter, groupFilter])

  const activeFaction: CanonicalFactionEntry = useMemo(() => {
    const exact = ID_REGISTRY.factions.find((f) => f.id === selectedFactionId)
    if (exact && filteredFactions.some((f) => f.id === exact.id)) return exact
    return filteredFactions[0] ?? exact ?? ID_REGISTRY.factions[0]
  }, [selectedFactionId, filteredFactions])

  const hqRegion = activeFaction.hqRegionId
    ? (REGION_DB_MAP[activeFaction.hqRegionId] ?? null)
    : null

  const factionMembers = useMemo(
    () => npcsByFaction.get(activeFaction.id) ?? [],
    [npcsByFaction, activeFaction.id],
  )

  const leaderNpcs = useMemo(() => {
    const explicit = activeFaction.leaderNpcIds
      .map((id) => NPC_DB_MAP[id])
      .filter((n): n is CompiledNpcRecord => Boolean(n))
    if (explicit.length > 0) return explicit
    return factionMembers.slice(0, 2)
  }, [activeFaction.leaderNpcIds, factionMembers])

  const representativeNpc = leaderNpcs[0] ?? factionMembers[0] ?? null

  const coreBuildings: CompiledBuildingRecord[] = useMemo(
    () =>
      activeFaction.coreBuildingIds
        .map((bid) => BUILDING_DB_MAP[bid])
        .filter((b): b is CompiledBuildingRecord => Boolean(b)),
    [activeFaction.coreBuildingIds],
  )

  const sectMartialArts: CompiledMartialArtRecord[] = useMemo(() => {
    if (activeFaction.martialArtIds.length > 0) {
      return activeFaction.martialArtIds
        .map((id) => MARTIAL_ART_DB_MAP[id])
        .filter((m): m is CompiledMartialArtRecord => Boolean(m))
    }
    // For non-sect organizations (e.g., 大理皇室 / 吐蕃诸部 / 隐世散人), aggregate unique arts known by members
    const seen = new Set<string>()
    const list: CompiledMartialArtRecord[] = []
    for (const mNpc of factionMembers) {
      for (const aid of mNpc.knownArtIds) {
        if (seen.has(aid)) continue
        const ma = MARTIAL_ART_DB_MAP[aid]
        if (ma) {
          seen.add(aid)
          list.push(ma)
        }
      }
    }
    return list.sort((a, b) => a.id.localeCompare(b.id))
  }, [activeFaction.martialArtIds, factionMembers])

  const sectWeapons: CompiledWeaponRecord[] = useMemo(
    () =>
      activeFaction.weaponIds
        .map((wid) => WEAPON_DB_MAP[wid])
        .filter((w): w is CompiledWeaponRecord => Boolean(w)),
    [activeFaction.weaponIds],
  )

  // Distribution of members across regions
  const regionFootprint = useMemo(() => {
    const counts = new Map<string, number>()
    for (const m of factionMembers) {
      counts.set(m.regionId, (counts.get(m.regionId) ?? 0) + 1)
    }
    return Array.from(counts.entries())
      .map(([rid, count]) => ({
        region: REGION_DB_MAP[rid],
        count,
        isHq: rid === activeFaction.hqRegionId,
      }))
      .filter((x): x is { region: NonNullable<typeof x.region>; count: number; isHq: boolean } =>
        Boolean(x.region),
      )
      .sort((a, b) => {
        if (a.isHq !== b.isHq) return a.isHq ? -1 : 1
        return b.count - a.count
      })
  }, [factionMembers, activeFaction.hqRegionId])

  const tierMeta = TIER_BADGE_META[activeFaction.sectTier]
  const isPlayableSect = activeFaction.isMajorSect || activeFaction.isMinorSect

  return (
    <div className="space-y-4">
      {/* 顶部三级门派金字塔总纲横幅 */}
      <div className="p-3.5 rounded-md bg-gradient-to-r from-[#2c1a12] via-[#3d2519] to-[#2c1a12] text-[#fbf2e0] border border-[#c89d54]/70 shadow flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#8f1d14] border border-[#f5cb5c]/70 flex items-center justify-center text-amber-200 shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="song-serif font-bold text-sm sm:text-base text-amber-200 flex items-center gap-2">
              <span>《皇祐武林三十门派与庙堂四夷全典》· 三级生态金字塔</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/35 border border-[#c89d54]/50 text-[#f5dfb5]">
                SECT-01..30 &amp; ORG-01..11
              </span>
            </div>
            <p className="text-xs text-[#e5d5bc] mt-0.5">
              <strong>6 大三流市井武馆</strong>（零门槛筑基·打工攒银·5重圆满出师获《江湖举荐帖》） →{' '}
              <strong>6 大二流世家武盟</strong>（水陆漕运·绿林走镖·带艺投师保举） →{' '}
              <strong>18 大一流泰山北斗</strong>（37 门天阶镇派与奇缘绝学） +{' '}
              <strong>11 大庙堂儒林四夷组织</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 筛选控制栏 */}
      <div className="p-3.5 rounded-md bg-[#efe4cc] border border-[#c8b28e] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold song-serif text-[#4a3219] mr-1">金字塔层级：</span>
            {TIER_FILTER_OPTIONS.map((opt) => {
              const active = tierFilter === opt.key
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setTierFilter(opt.key)
                    setGroupFilter('ALL')
                  }}
                  className={`px-2.5 py-1 rounded text-xs song-serif border transition cursor-pointer ${
                    active
                      ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] font-bold shadow-xs'
                      : 'bg-[#faf4e6] hover:bg-[#e5d6b7] text-[#3d2812] border-[#bfa782]'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-[#d8c6a8]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold song-serif text-[#4a3219] mr-1">阵营脉络：</span>
            <button
              type="button"
              onClick={() => setGroupFilter('ALL')}
              className={`px-2.5 py-1 rounded text-xs song-serif border transition cursor-pointer ${
                groupFilter === 'ALL'
                  ? 'bg-[#5c4024] text-[#fff8eb] border-[#d9b36c] font-bold'
                  : 'bg-[#faf4e6] hover:bg-[#e5d6b7] text-[#3d2812] border-[#bfa782]'
              }`}
            >
              全部阵营
            </button>
            {availableGroups.map((grp) => {
              const active = groupFilter === grp
              return (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setGroupFilter(grp)}
                  className={`px-2.5 py-1 rounded text-xs song-serif border transition cursor-pointer ${
                    active
                      ? 'bg-[#5c4024] text-[#fff8eb] border-[#d9b36c] font-bold'
                      : 'bg-[#faf4e6] hover:bg-[#e5d6b7] text-[#3d2812] border-[#bfa782]'
                  }`}
                >
                  {grp}
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
              placeholder="检索 SECT/ORG / 门派名 / 掌门 / 镇派绝学 / 驻地..."
              className="w-full pl-8 pr-3 py-1 rounded bg-[#fffdf8] border border-[#b59c77] text-xs text-[#23180f] placeholder:text-[#8c7353] focus:outline-none focus:border-[#8f1d14]"
            />
          </div>
        </div>
      </div>

      {/* 主体：左侧 41 门派/势力目录 + 右侧门派详卷 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 左侧列表 */}
        <div className="lg:col-span-4 rounded-md bg-[#efe4cc] border border-[#bfa782] flex flex-col h-[590px] overflow-hidden">
          <div className="px-3.5 py-2.5 bg-[#dfd0b2] border-b border-[#bfa782] flex items-center justify-between text-xs font-bold song-serif text-[#3b2712]">
            <span>门派与势力名录</span>
            <span className="font-mono text-[11px] text-[#5c4024]">
              匹配 {filteredFactions.length} / {ID_REGISTRY.factions.length} 家
            </span>
          </div>

          <div className="flex-1 overflow-y-auto scroll-thin p-2 space-y-1.5">
            {filteredFactions.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#6b5235] song-serif">
                未检索到匹配的门派或组织，请调整筛选条件。
              </div>
            ) : (
              filteredFactions.map((fac) => {
                const isSelected = fac.id === activeFaction.id
                const tBadge = TIER_BADGE_META[fac.sectTier]
                const hqReg = fac.hqRegionId ? REGION_DB_MAP[fac.hqRegionId] : null
                return (
                  <button
                    key={fac.id}
                    type="button"
                    onClick={() => onSelectFactionId(fac.id)}
                    className={`w-full p-2.5 rounded border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#8f1d14] text-[#fff8eb] border-2 border-[#f5cb5c] shadow-md'
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
                          {fac.id}
                        </span>
                        <span className="song-serif font-bold text-sm truncate">{fac.name}</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 font-semibold ${tBadge.badgeCls}`}
                      >
                        {tBadge.shortTag}
                      </span>
                    </div>

                    <div
                      className={`mt-1.5 flex items-center justify-between text-[11px] ${
                        isSelected ? 'text-[#f7dfcf]' : 'text-[#6b5235]'
                      }`}
                    >
                      <span className="truncate">
                        {hqReg ? hqReg.name : '散居诸州'} · {fac.stanceMotto}
                      </span>
                      <span className="font-mono shrink-0">
                        {fac.memberCount}人 · {fac.martialArtIds.length}功
                      </span>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* 右侧门派详卷 */}
        <div className="lg:col-span-8 rounded-md bg-[#fffbf2] border border-[#bfa782] p-4 space-y-4 h-[590px] overflow-y-auto scroll-thin">
          {/* 顶部掌门绘像 + 门派核心铭牌 */}
          <div className="flex flex-col sm:flex-row gap-4 border-b border-[#d8c6a8] pb-4">
            {/* 代表人物 / 门派服饰立轴 */}
            {representativeNpc && (
              <div
                onClick={() => onOpenPortraitLightbox(representativeNpc, 'fullbody')}
                title="点击放大品鉴掌门/首脑立绘与门派衣冠"
                className="w-32 sm:w-36 aspect-[3/4] shrink-0 rounded-md overflow-hidden border-2 border-[#c89d54] bg-[#1e140c] relative group cursor-zoom-in self-center sm:self-start shadow"
              >
                <ManagedAssetImg
                  key={representativeNpc.id}
                  url={representativeNpc.fullbodyUrl ?? representativeNpc.templateUrl}
                  alt={representativeNpc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-2 py-1.5 text-center">
                  <div className="song-serif font-bold text-xs text-amber-200 truncate">
                    {representativeNpc.name}
                  </div>
                  <div className="text-[10px] text-[#e5d5bc] truncate">
                    {representativeNpc.role}
                  </div>
                </div>
                <div className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 text-amber-200 opacity-80 group-hover:opacity-100">
                  <ZoomIn className="w-3 h-3" />
                </div>
              </div>
            )}

            {/* 门派题跋信息 */}
            <div className="flex-1 min-w-0 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-300 font-bold">
                      {activeFaction.id}
                    </span>
                    <h4 className="song-serif font-bold text-xl text-[#23180f]">
                      {activeFaction.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded border font-bold song-serif ${tierMeta.badgeCls}`}
                    >
                      {activeFaction.sectTier}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#efe4cc] border border-[#bfa782] text-[#4a3219] font-semibold">
                      {activeFaction.stanceMotto}
                    </span>
                  </div>

                  {hqRegion && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onJumpToRegion(hqRegion.id)}
                        className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] text-xs font-bold song-serif flex items-center gap-1 cursor-pointer transition"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>总舵：{hqRegion.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onLocateOnWorldMap(hqRegion.id)}
                        title="在天下舆图定位总舵所在州府/名山"
                        className="px-2 py-1 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-xs font-bold song-serif flex items-center gap-1 cursor-pointer transition"
                      >
                        <Compass className="w-3 h-3" />
                        <span>舆图</span>
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#3b2712] leading-relaxed font-medium">
                  {activeFaction.summary}
                </p>
                <div className="text-xs text-[#6b5235]">
                  <span className="font-bold text-[#4a3219]">驻地脉络：</span>
                  {activeFaction.hqDisplay}
                </div>
              </div>

              {/* 关键数值四格 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2 rounded bg-[#f6eedb] border border-[#d4be98]">
                  <div className="text-[10px] text-[#6b5235]">阵营归属</div>
                  <div className="song-serif font-bold text-xs text-[#23180f] truncate mt-0.5">
                    {activeFaction.group}
                  </div>
                </div>
                <div className="p-2 rounded bg-[#f6eedb] border border-[#d4be98]">
                  <div className="text-[10px] text-[#6b5235]">在册门人/名宿</div>
                  <div className="font-mono font-bold text-xs text-[#8f1d14] mt-0.5">
                    {activeFaction.memberCount} 人（遍布 {regionFootprint.length} 地）
                  </div>
                </div>
                <div className="p-2 rounded bg-[#f6eedb] border border-[#d4be98]">
                  <div className="text-[10px] text-[#6b5235]">最高武学品阶</div>
                  <div className="song-serif font-bold text-xs text-[#1f5c3a] mt-0.5">
                    {activeFaction.highestArtTier}
                  </div>
                </div>
                <div className="p-2 rounded bg-[#f6eedb] border border-[#d4be98]">
                  <div className="text-[10px] text-[#6b5235]">传承武学 / 独门兵刃</div>
                  <div className="font-mono font-bold text-xs text-[#52391e] mt-0.5">
                    {sectMartialArts.length} 功 / {sectWeapons.length} 兵
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 入门条件、日常差事与阶梯晋升机制 */}
          <div className="p-3.5 rounded bg-[#fbf2e4] border border-[#d9b38c] space-y-1.5">
            <div className="text-xs font-bold song-serif text-[#781710] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>
                {isPlayableSect
                  ? '入门门槛 · 门派特色与阶梯举荐通道'
                  : '皇祐二年（1050）庙堂/地域定位与交互机缘'}
              </span>
            </div>
            <p className="text-xs text-[#2b1a0e] leading-relaxed">
              {activeFaction.entryAndFeatures}
            </p>
          </div>

          {/* 专属建筑与分舵足迹 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
              <div className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#8f1d14]" />
                <span>核心总堂与关联建筑（{coreBuildings.length} 座）</span>
              </div>
              {coreBuildings.length === 0 ? (
                <p className="text-xs text-[#6b5235]">
                  云游四海或分驻诸州书院/行辕，无单一固定山门总坛。
                </p>
              ) : (
                <div className="space-y-1.5">
                  {coreBuildings.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onJumpToRegion(b.regionId)}
                      className="w-full p-2 rounded bg-[#fffdf8] hover:bg-[#eadcc2] border border-[#cbb693] text-left flex items-center justify-between gap-2 transition cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="song-serif font-bold text-xs text-[#23180f] truncate">
                          {b.isSpecial ? '★ ' : ''}
                          {b.name}
                        </div>
                        <div className="text-[10px] text-[#6b5235] truncate">{b.desc}</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#efe4cc] text-[#52391e] shrink-0">
                        {b.regionName} ▸
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
              <div className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#1f5c3a]" />
                <span>门人驻留舆地分布（点击跳转【壹 · 地区图鉴】）</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {regionFootprint.map(({ region, count, isHq }) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => onJumpToRegion(region.id)}
                    className={`px-2 py-1 rounded border text-xs song-serif flex items-center gap-1 transition cursor-pointer ${
                      isHq
                        ? 'bg-[#1f5c3a] text-[#fff8eb] border-[#f5cb5c] font-bold'
                        : 'bg-[#fffdf8] hover:bg-[#eadcc2] text-[#23180f] border-[#cbb693]'
                    }`}
                  >
                    <span>{region.name}</span>
                    {isHq && (
                      <span className="text-[10px] px-1 rounded bg-amber-300 text-[#23180f] font-bold">
                        总舵
                      </span>
                    )}
                    <span className="font-mono text-[10px] opacity-80">({count}人)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 本门传承武学（或组织名宿绝艺） */}
          <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#8f1d14]" />
                <span>
                  {activeFaction.martialArtIds.length > 0
                    ? `本门镇派与传承武学谱系（共 ${sectMartialArts.length} 门 · 点击直达【肆 · 武学总纲】）`
                    : `门下名宿兼修代表武学（共 ${sectMartialArts.length} 门 · 点击直达【肆 · 武学总纲】）`}
                </span>
              </span>
            </div>

            {sectMartialArts.length === 0 ? (
              <p className="text-xs text-[#6b5235]">
                该组织以庙堂政略、儒学经义或百工杏林立世，不设专属武学秘谱。
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sectMartialArts.map((ma) => {
                  const isLearned = learnedArtIds.has(ma.id)
                  const badgeCls =
                    ART_TIER_BADGE_CLS[ma.tier] ?? 'bg-[#4f4335] text-[#f5efe4] border-[#b59c77]'
                  return (
                    <button
                      key={ma.id}
                      type="button"
                      onClick={() => onJumpToArt(ma)}
                      className="p-2 rounded bg-[#fffdf8] hover:bg-[#eadcc2] border border-[#cbb693] text-left flex items-center justify-between gap-2 transition cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-[#781710] shrink-0">
                            {ma.id}
                          </span>
                          <span className="song-serif font-bold text-xs text-[#23180f] truncate">
                            《{ma.cleanName}》
                          </span>
                          {isLearned && (
                            <span className="text-[10px] px-1 rounded bg-emerald-700 text-white font-bold shrink-0">
                              已习
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#6b5235] truncate mt-0.5">
                          {ma.category} · {ma.description}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 font-semibold ${badgeCls}`}
                      >
                        {ma.fullTier}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* 门派关联神兵（若有） */}
          {sectWeapons.length > 0 && (
            <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
              <div className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Sword className="w-3.5 h-3.5 text-[#5c4024]" />
                <span>
                  本门成名神兵与制式利器（共 {sectWeapons.length} 件 · 点击直达【伍 · 披挂总纲】）
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sectWeapons.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onJumpToWeapon(w)}
                    className="px-2.5 py-1.5 rounded bg-[#fffdf8] hover:bg-[#eadcc2] border border-[#bfa782] text-xs song-serif flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="font-mono text-[10px] text-[#781710]">{w.id}</span>
                    <span className="font-bold text-[#23180f]">{w.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#efe4cc] text-[#52391e]">
                      {w.fullTier} · {w.weaponType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 掌门、长老与门下群侠名录（点击直达【叁 · 群侠图鉴】） */}
          <div className="p-3 rounded bg-[#f6eedb] border border-[#d4be98] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold song-serif text-[#4a3219] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#1f5c3a]" />
                <span>
                  掌门首脑与在册门人名录（共 {factionMembers.length} 人 · 点击直达【叁 · 群侠图鉴】）
                </span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {factionMembers.slice(0, 15).map((npc) => {
                const isLeader = activeFaction.leaderNpcIds.includes(npc.id)
                return (
                  <button
                    key={npc.id}
                    type="button"
                    onClick={() => onJumpToNpc(npc)}
                    className={`p-2 rounded border text-left flex items-center gap-2 transition cursor-pointer ${
                      isLeader
                        ? 'bg-[#fff7e8] hover:bg-[#f5e6c8] border-[#c89d54]'
                        : 'bg-[#fffdf8] hover:bg-[#eadcc2] border-[#cbb693]'
                    }`}
                  >
                    {(npc.avatarUrl ?? npc.templateAvatarUrl) ? (
                      <ManagedAssetImg
                        url={(npc.avatarUrl ?? npc.templateAvatarUrl)!}
                        alt={npc.name}
                        viewportLazy
                        className="w-9 h-9 rounded-full object-cover border border-[#8c6e46] shrink-0 bg-[#2b1d12]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#3b2712] text-amber-200 border border-[#c89d54] flex items-center justify-center song-serif font-bold text-xs shrink-0">
                        {npc.name.slice(0, 1)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="song-serif font-bold text-xs text-[#23180f] truncate">
                          {isLeader ? '★ ' : ''}
                          {npc.name}
                        </span>
                        <span className="text-[10px] px-1 rounded bg-[#efe4cc] text-[#781710] shrink-0">
                          {npc.realm}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#6b5235] truncate">
                        {npc.role} · {npc.locationLabel}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            {factionMembers.length > 15 && (
              <div className="text-[11px] text-[#6b5235] text-right">
                其余 {factionMembers.length - 15} 位本势力成员可在【叁 · 群侠图鉴】按门派筛选全览
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
