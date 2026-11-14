import { useMemo, useState } from 'react'
import { FACTION_DB_MAP, MOUNTS_DB, UNIQUE_ARTIFACT_MAP } from '../../data/gameDb'
import {
  checkMountEquipRequirements,
  formatBonusBadges,
  type PlayerEquipCheckContext,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type {
  CompiledMountRecord,
  EquipmentSlotKey,
  EquipmentTier,
  MenuTabKey,
  MountBreedCategory,
  MountTerrainTrait,
} from '../../types/game'
import { WORLD_GRAPH } from '../../utils/mapMath'
import { ItemAcquisitionBanner } from './ItemAcquisitionBanner'
import { UniqueOwnershipBadge, UniqueOwnershipBanner } from './UniqueOwnershipBanner'

const MOUNT_BREED_CATEGORIES: MountBreedCategory[] = [
  '西域神驹',
  '塞北北马',
  '党项夏马',
  '青唐番马',
  '西南山骏',
  '中原官马',
  '市井骡驴',
]

const TERRAIN_TRAIT_DESC: Record<MountTerrainTrait, string> = {
  全地形: '九州通途（官道 / 水网 / 戈壁草原 / 崇山高原全地貌行军速度增幅）',
  踏平川: '官道驿路专精（中原平川与驿传大道行军速度增幅）',
  驰大漠: '塞外荒漠草原专精（河西、契丹与瀚海草地行军速度增幅）',
  逾险峰: '崇山栈道专精（蜀道、青唐雪域与五岳险岭行军速度增幅）',
  渡烟波: '水网湿地专精（江淮运河、太湖烟雨与闽浙梅雨古道行军速度增幅）',
}

interface MountCompendiumPanelProps {
  selectedMountId: string
  onSelectMount: (mountId: string) => void
  equippedMountId: string | null
  inventoryQtyMap: Map<string, number>
  playerEquipCtx: PlayerEquipCheckContext
  onOpenRegionInCompendium: (regionId: string) => void
  onOpenSectInCompendium: (sectId: string) => void
  onLocateRegionOnMap: (regionId: string) => void
  onOpenLoadoutMountSlot: (slot: EquipmentSlotKey, tab: MenuTabKey) => void
}

export function MountCompendiumPanel({
  selectedMountId,
  onSelectMount,
  equippedMountId,
  inventoryQtyMap,
  playerEquipCtx,
  onOpenRegionInCompendium,
  onOpenSectInCompendium,
  onLocateRegionOnMap,
  onOpenLoadoutMountSlot,
}: MountCompendiumPanelProps) {
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)
  const unequipSlot = useGameStore((s) => s.unequipSlot)

  const [mntQuery, setMntQuery] = useState('')
  const [mntTierFilter, setMntTierFilter] = useState<'ALL' | EquipmentTier>('ALL')
  const [mntBreedFilter, setMntBreedFilter] = useState<'ALL' | MountBreedCategory>('ALL')

  const filteredMounts = useMemo(() => {
    const q = mntQuery.trim().toLowerCase()
    return MOUNTS_DB.filter((m) => {
      if (mntTierFilter !== 'ALL' && m.tier !== mntTierFilter) return false
      if (mntBreedFilter !== 'ALL' && m.breedCategory !== mntBreedFilter) return false
      if (!q) return true
      const uRec = UNIQUE_ARTIFACT_MAP[m.id]
      const ownerMatch = uRec
        ? (uRec.ownerNpcName?.toLowerCase().includes(q) ?? false) ||
          (uRec.ownerNpcTitle?.toLowerCase().includes(q) ?? false) ||
          uRec.note.toLowerCase().includes(q) ||
          (uRec.ownerType === 'unowned' && '无主'.includes(q)) ||
          (uRec.ownerType === 'player' && ('主角'.includes(q) || '少侠'.includes(q))) ||
          '孤品'.includes(q)
        : false
      return (
        m.id.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.breedCategory.toLowerCase().includes(q) ||
        m.originFull.toLowerCase().includes(q) ||
        m.terrainTrait.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        ownerMatch
      )
    })
  }, [mntQuery, mntTierFilter, mntBreedFilter])

  const selectedMount: CompiledMountRecord =
    filteredMounts.find((m) => m.id === selectedMountId) ??
    MOUNTS_DB.find((m) => m.id === selectedMountId) ??
    filteredMounts[0] ??
    MOUNTS_DB[0]

  const ownedCount = useMemo(
    () =>
      MOUNTS_DB.filter(
        (m) => equippedMountId === m.id || (inventoryQtyMap.get(m.id) ?? 0) > 0,
      ).length,
    [equippedMountId, inventoryQtyMap],
  )

  const walkSpeed = WORLD_GRAPH.mounts.walk.speed

  return (
    <div className="space-y-3.5 text-xs">
      {/* 顶部总纲横幅 */}
      <div className="p-3 rounded bg-[#efe4cc] border-2 border-[#b5986e] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-[#1f5c3a] text-[#fff8eb] font-bold song-serif">
            第六卷 · 名驹鞍辔谱
          </span>
          <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
            皇祐二十八骑全录（3 天阶 · 5 地阶［天地阶皆举世孤品］ · 8 良阶 · 12 凡阶）
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#5e472d]">
          <span>
            无马基准：<strong>徒步急行 {walkSpeed} 里/日</strong>
          </span>
          <span className="font-mono font-bold text-[#1f5c3a]">
            已收录良驹：{ownedCount} / {MOUNTS_DB.length} 匹
          </span>
        </div>
      </div>

      {/* 检索与品阶/马政谱系筛选栏 */}
      <div className="bg-[#efe4cc] p-3 rounded border border-[#c8b28e] space-y-2.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="text"
            value={mntQuery}
            onChange={(e) => setMntQuery(e.target.value)}
            placeholder="搜索名驹编号、马名、当前归属人、无主、产地或特质（如：MNT-001、狄青、乔峰、无主、汗血）…"
            className="flex-1 min-w-[220px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
          />
          <select
            value={mntTierFilter}
            onChange={(e) => setMntTierFilter(e.target.value as 'ALL' | EquipmentTier)}
            className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
          >
            <option value="ALL">全部四阶 (28 骑)</option>
            <option value="天阶">天阶神驹 (3 骑 · 孤品)</option>
            <option value="地阶">地阶名马 (5 骑 · 孤品)</option>
            <option value="良阶">良阶骏马 (8 骑)</option>
            <option value="凡阶">凡阶鞍马骡驴 (12 骑)</option>
          </select>
          <span className="text-xs text-[#5e472d] font-mono">
            筛选结果：{filteredMounts.length} / {MOUNTS_DB.length} 匹
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#6b5235] font-bold song-serif mr-1">
            七大马政谱系：
          </span>
          <button
            type="button"
            onClick={() => setMntBreedFilter('ALL')}
            className={`px-2.5 py-1 rounded text-[11px] song-serif font-bold cursor-pointer transition ${
              mntBreedFilter === 'ALL'
                ? 'bg-[#261910] text-amber-200 border border-[#f5cb5c]'
                : 'bg-[#faf3e3] text-[#4a3219] border border-[#b89f78] hover:bg-[#e5d6b8]'
            }`}
          >
            全部谱系 (28)
          </button>
          {MOUNT_BREED_CATEGORIES.map((breed) => {
            const cnt = MOUNTS_DB.filter((m) => m.breedCategory === breed).length
            const isCur = mntBreedFilter === breed
            return (
              <button
                key={breed}
                type="button"
                onClick={() => setMntBreedFilter(breed)}
                className={`px-2.5 py-1 rounded text-[11px] song-serif font-bold cursor-pointer transition ${
                  isCur
                    ? 'bg-[#8f1d14] text-[#fff8eb] border border-[#f5cb5c]'
                    : 'bg-[#faf3e3] text-[#4a3219] border border-[#b89f78] hover:bg-[#e5d6b8]'
                }`}
              >
                {breed} ({cnt})
              </button>
            )
          })}
        </div>
      </div>

      {/* 左：28 骑列表；右：选中名驹详情与乘骑操作 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 max-h-[580px] overflow-y-auto scroll-thin pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 content-start">
          {filteredMounts.map((mnt) => {
            const isSel = selectedMount?.id === mnt.id
            const isEquipped = equippedMountId === mnt.id
            const inBagQty = inventoryQtyMap.get(mnt.id) ?? 0
            const rStyle = RARITY_STYLE_MAP[mnt.tier]
            return (
              <button
                key={mnt.id}
                type="button"
                onClick={() => onSelectMount(mnt.id)}
                className={`p-3 rounded border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                  isSel
                    ? 'bg-[#261910] text-[#fff8eb] border-[#f5cb5c] shadow'
                    : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[10px] opacity-80">{mnt.id}</span>
                    <span className="song-serif font-bold text-xs sm:text-sm truncate">
                      {mnt.name}
                    </span>
                    {isEquipped && (
                      <span className="px-1.5 py-0.2 rounded bg-[#8f1d14] text-amber-200 text-[9px] font-bold shrink-0">
                        正乘骑
                      </span>
                    )}
                    {!isEquipped && inBagQty > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-[#215744] text-[#fff8eb] text-[9px] font-bold shrink-0">
                        在厩囊
                      </span>
                    )}
                    <UniqueOwnershipBadge itemId={mnt.id} />
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isSel ? 'text-[#d6c5a5]' : 'text-[#6b5235]'
                    }`}
                  >
                    {mnt.breedCategory} · 日行{mnt.baseSpeed}里 · {mnt.terrainTrait}+
                    {mnt.terrainBonusPct}% · {mnt.locationLabel}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                >
                  {mnt.fullTier}
                </span>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-5 p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-3 max-h-[580px] overflow-y-auto scroll-thin">
          {selectedMount && (() => {
            const isEquipped = equippedMountId === selectedMount.id
            const inBagQty = inventoryQtyMap.get(selectedMount.id) ?? 0
            const reqCheck = checkMountEquipRequirements(selectedMount, playerEquipCtx)
            const rStyle = RARITY_STYLE_MAP[selectedMount.tier]
            const sectEntry = selectedMount.sectId ? FACTION_DB_MAP[selectedMount.sectId] : null
            const speedRatio = (selectedMount.baseSpeed / walkSpeed).toFixed(1)

            return (
              <>
                <div className="border-b border-[#cbb693] pb-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-200">
                      {selectedMount.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                    >
                      {selectedMount.fullTier} · {selectedMount.breedCategory}
                    </span>
                  </div>
                  <div className="song-serif font-bold text-lg text-[#23180f] mt-1.5 flex items-center gap-2 flex-wrap">
                    <span>{selectedMount.name}</span>
                    {selectedMount.specialTag && (
                      <span className="px-2 py-0.5 rounded bg-[#8f1d14]/15 border border-[#8f1d14]/40 text-xs text-[#8f1d14] font-bold">
                        【{selectedMount.specialTag}】
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#4a3219] mt-1 flex items-center gap-1.5 flex-wrap">
                    <span>
                      马政产地：<strong>{selectedMount.originFull}</strong>（`
                      {selectedMount.regionId}`
                      {sectEntry ? ` · ${sectEntry.shortName}` : ''}）
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenRegionInCompendium(selectedMount.regionId)}
                      className="px-2 py-0.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                    >
                      地区图鉴 ▸
                    </button>
                    {sectEntry && (
                      <button
                        type="button"
                        onClick={() => onOpenSectInCompendium(sectEntry.id)}
                        className="px-2 py-0.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                      >
                        门派图鉴 ▸
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onLocateRegionOnMap(selectedMount.regionId)}
                      className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-[10px] cursor-pointer"
                    >
                      舆图寻路定位 →
                    </button>
                  </div>
                </div>

                {/* 天地阶孤品归属横幅 */}
                <UniqueOwnershipBanner itemId={selectedMount.id} />
                <ItemAcquisitionBanner itemId={selectedMount.id} />

                {/* 日行脚力与地貌规格 */}
                <div className="grid grid-cols-3 gap-2 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-2 text-xs">
                  <div>
                    <div className="text-[10px] text-[#6b5235]">日行基础脚力</div>
                    <strong className="font-mono text-[#1b5132]">
                      {selectedMount.baseSpeed} 里/日
                    </strong>
                    <div className="text-[10px] text-[#7a6042]">约为徒步 {speedRatio} 倍</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6b5235]">专擅地貌亲和</div>
                    <strong className="song-serif text-[#8f1d14]">
                      {selectedMount.terrainTrait} +{selectedMount.terrainBonusPct}%
                    </strong>
                    <div className="text-[10px] text-[#7a6042]">对应地貌提速</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6b5235]">皇祐榷场估值</div>
                    <strong className="font-mono text-[#52391e]">
                      {selectedMount.value} 两
                    </strong>
                    <div className="text-[10px] text-[#7a6042]">茶马互市估银</div>
                  </div>
                </div>

                {/* 地貌特质说明 */}
                <div className="p-2.5 rounded bg-[#faf3e3] border border-[#cbb693] space-y-1">
                  <div className="font-bold song-serif text-xs text-[#1f5c3a]">
                    行军地貌特质【{selectedMount.terrainTrait}】：
                  </div>
                  <div className="text-[11px] text-[#4a3219] leading-relaxed">
                    {TERRAIN_TRAIT_DESC[selectedMount.terrainTrait]}
                  </div>
                </div>

                {/* 乘骑随身实战与百工增益 */}
                <div className="space-y-1.5">
                  <div className="font-bold song-serif text-xs text-[#52391e]">
                    乘骑实战耐力与百工增益：
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formatBonusBadges({
                      ...selectedMount.equipBonus,
                      mountKey: selectedMount.id as `MNT-${string}`,
                    }).map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded bg-[#fff9ec] border border-[#bfa680] text-[11px] font-mono font-semibold text-[#7f1d1d]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">
                  {selectedMount.description}
                </p>

                {/* 天阶神驹驯服乘骑门槛 */}
                {selectedMount.prerequisitesText && (
                  <div className="p-3 rounded bg-[#faf3e3] border border-[#b89f78] space-y-2">
                    <div className="font-bold song-serif text-sm text-[#8f1d14]">
                      天阶神驹驯服/乘骑门槛：
                    </div>
                    <div className="text-xs text-[#4a3219] leading-relaxed">
                      {selectedMount.prerequisitesText}
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

                {/* 持有状态展示与已持有乘骑操作（无凭空入囊作弊按钮） */}
                <div className="pt-2 border-t border-[#cbb693] flex flex-wrap items-center justify-between gap-2">
                  {isEquipped ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8f1d14] song-serif">
                        ★ 少侠当前正乘骑此驹驰骋九州
                      </span>
                      <button
                        type="button"
                        onClick={() => unequipSlot('mount')}
                        className="px-2.5 py-1 rounded bg-[#7f1d1d] hover:bg-[#991b1b] text-[#fff8eb] font-bold song-serif text-[11px] cursor-pointer transition"
                      >
                        下马徒步
                      </button>
                    </div>
                  ) : inBagQty > 0 ? (
                    <span className="text-xs font-bold text-[#184f35] song-serif">
                      ✓ 已在少侠【行囊杂物】备用鞍厩中
                    </span>
                  ) : (
                    <span className="text-xs text-[#6b5235] song-serif">
                      尚未收入厩囊（须经榷场马市购置、名将馈赠或奇遇驯服所得）
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {!isEquipped && inBagQty > 0 && (
                      <button
                        type="button"
                        onClick={() => equipItemToSlot(selectedMount.id, 'mount')}
                        className="px-3 py-1.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                      >
                        立即上鞍乘骑
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onOpenLoadoutMountSlot('mount', 'loadout')}
                      className="px-2.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 font-bold song-serif text-xs cursor-pointer"
                    >
                      前往坐骑槽 →
                    </button>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
