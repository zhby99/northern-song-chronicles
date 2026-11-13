import { useMemo, useState } from 'react'
import { MARTIAL_ARTS_DB } from '../../../data/gameDb'
import { computeSingleArtBonus, formatArtBonusBadges } from '../../../data/playerMartialArts'
import { useGameStore } from '../../../store/useGameStore'
import type { CompiledMartialArtRecord } from '../../../types/game'

interface MartialArtsTabProps {
  selectedArt: CompiledMartialArtRecord | null
  onSelectArt: (art: CompiledMartialArtRecord) => void
  artTierFilter: string
  onChangeArtTierFilter: (tier: string) => void
  artCatFilter: string
  onChangeArtCatFilter: (cat: string) => void
  onJumpToLoadoutArt: (artId: string) => void
}

export function MartialArtsTab({
  selectedArt,
  onSelectArt,
  artTierFilter,
  onChangeArtTierFilter,
  artCatFilter,
  onChangeArtCatFilter,
  onJumpToLoadoutArt,
}: MartialArtsTabProps) {
  const learnedArts = useGameStore((s) => s.learnedArts)
  const [artQuery, setArtQuery] = useState('')

  const learnedMap = useMemo(() => {
    const m = new Map<string, { level: number; exp: number }>()
    for (const e of learnedArts) {
      m.set(e.artId, { level: e.level, exp: e.exp })
    }
    return m
  }, [learnedArts])

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

  return (
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
          onChange={(e) => onChangeArtTierFilter(e.target.value)}
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
          onChange={(e) => onChangeArtCatFilter(e.target.value)}
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
                onClick={() => onSelectArt(art)}
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
                      {selectedArt.levels.reduce((s, x) => s + (x.expRequired ?? 0), 0)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formatArtBonusBadges(computeSingleArtBonus(selectedArt, 10)).map((badge) => (
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
                          <div key={fx.id} className="text-[11px] text-[#781710] leading-relaxed">
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
                    onClick={() => onJumpToLoadoutArt(selectedArt.id)}
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
  )
}
