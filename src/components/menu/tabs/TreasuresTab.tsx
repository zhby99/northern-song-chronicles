import { useMemo, useState } from 'react'
import { MARTIAL_ART_DB_MAP, UNIQUE_ARTIFACT_MAP } from '../../../data/gameDb'
import {
  formatBonusBadges,
  normalizeItemTier,
  RARITY_STYLE_MAP,
  TREASURE_COMPENDIUM_ITEMS,
  TREASURE_VOLUME_METAS,
  type TreasureVolumeKey,
} from '../../../data/itemsDb'
import { useGameStore } from '../../../store/useGameStore'
import type { BagCategoryKey, CompiledMartialArtRecord, EquipmentTier } from '../../../types/game'
import { BagCatIcon } from '../MenuIcons'
import type { TreasureCollectionStats } from '../menuShared'
import { UniqueOwnershipBadge, UniqueOwnershipBanner } from '../UniqueOwnershipBanner'

interface TreasuresTabProps {
  selectedTreasureId?: string
  onSelectTreasureId?: (id: string) => void
  treasureVolFilter: 'ALL' | TreasureVolumeKey
  onChangeTreasureVolFilter: (vol: 'ALL' | TreasureVolumeKey) => void
  treasureSubTypeFilter: string
  onChangeTreasureSubTypeFilter: (subType: string) => void
  treasureCollectionStats: TreasureCollectionStats
  onJumpToMartialArt: (art: CompiledMartialArtRecord) => void
  onJumpToBagItem: (category: BagCategoryKey, itemId: string) => void
}

export function TreasuresTab({
  selectedTreasureId: controlledTreasureId,
  onSelectTreasureId,
  treasureVolFilter,
  onChangeTreasureVolFilter,
  treasureSubTypeFilter,
  onChangeTreasureSubTypeFilter,
  treasureCollectionStats,
  onJumpToMartialArt,
  onJumpToBagItem,
}: TreasuresTabProps) {
  const inventory = useGameStore((s) => s.inventory)
  const equipped = useGameStore((s) => s.equipped)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const consumedUniqueIds = useGameStore((s) => s.consumedUniqueIds)
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)
  const consumeInventoryItem = useGameStore((s) => s.consumeInventoryItem)

  const [treasureTierFilter, setTreasureTierFilter] = useState<'ALL' | EquipmentTier>('ALL')
  const [treasureOwnedFilter, setTreasureOwnedFilter] = useState<'ALL' | 'OWNED' | 'UNOWNED'>(
    'ALL',
  )
  const [treasureQuery, setTreasureQuery] = useState<string>('')
  const [localSelectedTreasureId, setLocalSelectedTreasureId] = useState<string>(
    () => TREASURE_COMPENDIUM_ITEMS[0]?.id ?? 'ITM-SCR-001',
  )
  const selectedTreasureId = controlledTreasureId ?? localSelectedTreasureId
  const setSelectedTreasureId = (nextId: string) => {
    if (onSelectTreasureId) onSelectTreasureId(nextId)
    else setLocalSelectedTreasureId(nextId)
  }

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

  const consumedUniqueSet = useMemo(() => new Set(consumedUniqueIds), [consumedUniqueIds])

  const learnedMap = useMemo(() => {
    const m = new Map<string, { level: number; exp: number }>()
    for (const e of learnedArts) {
      m.set(e.artId, { level: e.level, exp: e.exp })
    }
    return m
  }, [learnedArts])

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
        (ownedQtyMap.get(it.id) ?? 0) > 0 ||
        equippedItemIdSet.has(it.id) ||
        consumedUniqueSet.has(it.id)
      if (treasureOwnedFilter === 'OWNED' && !isOwned) return false
      if (treasureOwnedFilter === 'UNOWNED' && isOwned) return false

      if (!q) return true
      const linkedArtName = it.useEffect?.learnArtId
        ? (MARTIAL_ART_DB_MAP[it.useEffect.learnArtId]?.name.toLowerCase() ?? '')
        : ''
      const uRec = UNIQUE_ARTIFACT_MAP[it.id]
      const ownerMatch = uRec
        ? (uRec.ownerNpcName?.toLowerCase().includes(q) ?? false) ||
          (uRec.ownerNpcTitle?.toLowerCase().includes(q) ?? false) ||
          uRec.note.toLowerCase().includes(q) ||
          (uRec.ownerType === 'unowned' && '无主'.includes(q)) ||
          '孤品'.includes(q)
        : false
      return (
        it.id.toLowerCase().includes(q) ||
        it.name.toLowerCase().includes(q) ||
        it.subType.toLowerCase().includes(q) ||
        it.desc.toLowerCase().includes(q) ||
        (it.lore?.toLowerCase().includes(q) ?? false) ||
        (it.poisonEffect?.toLowerCase().includes(q) ?? false) ||
        (it.useEffect?.learnArtHint?.toLowerCase().includes(q) ?? false) ||
        linkedArtName.includes(q) ||
        ownerMatch
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
    consumedUniqueSet,
  ])

  const selectedTreasure =
    filteredTreasures.find((it) => it.id === selectedTreasureId) ?? filteredTreasures[0] ?? null
  const allPct = Math.round(
    (treasureCollectionStats.ALL.owned / Math.max(1, treasureCollectionStats.ALL.total)) * 100,
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
            统录北宋皇祐二年（1050）百卷秘籍墨宝、三十味灵丹奇毒与五十件传世雅器百工（全库合计：20天阶孤品 · 35地阶孤品 · 55良阶 · 70凡阶）
          </p>
        </div>

        <div className="min-w-[210px] bg-[#1a110a]/80 border border-[#8c6e46]/70 rounded px-3 py-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#dfcfb0] song-serif font-semibold">少侠当前博物收录</span>
            <span className="font-mono font-bold text-amber-300">
              {treasureCollectionStats.ALL.owned} / {treasureCollectionStats.ALL.total} 品 ({allPct}
              %)
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
            onChangeTreasureVolFilter('ALL')
            onChangeTreasureSubTypeFilter('ALL')
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
                <div className="song-serif font-bold text-sm truncate">三卷合璧总览</div>
                <div
                  className={`text-[11px] truncate ${
                    treasureVolFilter === 'ALL' ? 'text-amber-200/90' : 'text-[#6b5235]'
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
          const unit = vol.key === 'scrolls' ? '卷' : vol.key === 'medicine' ? '品' : '件'
          return (
            <button
              key={vol.key}
              type="button"
              onClick={() => {
                onChangeTreasureVolFilter(vol.key)
                onChangeTreasureSubTypeFilter('ALL')
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
                    <BagCatIcon category={vol.key} className="w-4 h-4" />
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
                    isAct ? 'bg-black/30 text-amber-200' : 'bg-[#faf3e3] text-[#52391e]'
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
            <span className="text-[#5c4024] font-bold song-serif mr-0.5">四阶品级：</span>
            {(
              [
                { key: 'ALL', label: '全部品阶' },
                { key: '天阶', label: '天阶孤品' },
                { key: '地阶', label: '地阶孤品' },
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
            onChange={(e) => onChangeTreasureSubTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
          >
            <option value="ALL">全部器物/典籍细类（{treasureSubTypes.length} 类）</option>
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
            placeholder="检索编号、名目、当前归属人、无主、典故或功效（如：玄慈、无崖子、无主、九转、悲酥、兰亭、活字）…"
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
                onChangeTreasureSubTypeFilter('ALL')
                setTreasureOwnedFilter('ALL')
                setTreasureQuery('')
              }}
              className="px-2.5 py-1.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#781710] font-semibold cursor-pointer"
            >
              重置筛选
            </button>
          )}

          <span className="font-mono text-[#5e472d] ml-auto">
            当前筛选 <strong>{filteredTreasures.length}</strong> / {treasureVolumeItems.length} 品
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
                const isConsumedUnique = consumedUniqueSet.has(def.id)
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
                        <BagCatIcon category={def.category} className="w-3.5 h-3.5" />
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
                              isPurePoison ? 'text-[#6b21a8] font-semibold' : 'text-[#6b5235]'
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
                          <UniqueOwnershipBadge itemId={def.id} />
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
                          {def.stackable ? `已藏×${inBagQty}` : '已收录'}
                        </span>
                      ) : isConsumedUnique ? (
                        <span className="px-2 py-0.5 rounded bg-stone-700 text-stone-100 font-mono font-bold text-[10px]">
                          已炼化
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-[#efe4cc]/85 border border-[#c8b28e] font-mono text-[10px] text-[#7a6042]">
                          未收录
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-[#6b5235]">{def.value}两</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#7a6042] py-16">
              <div className="song-serif font-bold text-base">未检索到符合条件的四库奇珍</div>
              <div className="text-xs mt-1">请尝试切换分卷、品阶或点击上方【重置筛选】</div>
            </div>
          )}
        </div>

        {/* 右侧：考据详录、药理/武学/十艺效用与品鉴调取台 */}
        <div className="lg:col-span-5 bg-[#efe4cc] border border-[#c8b28e] rounded-md p-4 flex flex-col justify-between gap-3 max-h-[540px] overflow-y-auto scroll-thin">
          {selectedTreasure ? (
            (() => {
              const def = selectedTreasure
              const normTier = normalizeItemTier(def.rarity)
              const rStyle = RARITY_STYLE_MAP[def.rarity]
              const inBagQty = ownedQtyMap.get(def.id) ?? 0
              const isEquipped = equippedItemIdSet.has(def.id)
              const isConsumedUnique = consumedUniqueSet.has(def.id)
              const volMeta = TREASURE_VOLUME_METAS.find((v) => v.key === def.category)
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
                        <span className="text-xs font-semibold text-[#6b5235]">{def.subType}</span>
                      </div>

                      <h4 className="song-serif font-bold text-lg text-[#23180f] mt-1.5">
                        {def.name}
                      </h4>
                    </div>

                    <UniqueOwnershipBanner itemId={def.id} />

                    {/* 三格规制摘要 */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-2 text-xs">
                      <div>
                        <div className="text-[10px] text-[#6b5235]">器物规制</div>
                        <strong className="song-serif text-[#23180f]">
                          {def.equipSlot ? '可佩雅器' : def.stackable ? '叠放消耗' : '举世孤品'}
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
                                : isConsumedUnique
                                  ? 'text-stone-700'
                                  : 'text-[#7a6042]'
                          }`}
                        >
                          {isEquipped
                            ? '随身佩挂'
                            : inBagQty > 0
                              ? def.stackable
                                ? `囊藏 ×${inBagQty}`
                                : '已收录囊中'
                              : isConsumedUnique
                                ? '已服食炼化'
                                : '尚未收录'}
                        </strong>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#6b5235]">皇祐市估</div>
                        <strong className="font-mono text-[#7f1d1d]">{def.value} 两</strong>
                      </div>
                    </div>

                    {/* 详述与宋人考据题跋 */}
                    <p className="text-xs sm:text-sm text-[#3d2b19] leading-relaxed">{def.desc}</p>

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
                            def.useEffect.maxHp ? `气血上限 +${def.useEffect.maxHp}` : null,
                            def.useEffect.maxMp ? `内力上限 +${def.useEffect.maxMp}` : null,
                            def.useEffect.hp ? `气血 +${def.useEffect.hp}` : null,
                            def.useEffect.mp ? `内力 +${def.useEffect.mp}` : null,
                            def.useEffect.agi ? `身法 +${def.useEffect.agi}` : null,
                            def.useEffect.res ? `抗性 +${def.useEffect.res}` : null,
                            def.useEffect.riding ? `【骑术】+${def.useEffect.riding}` : null,
                            def.useEffect.food ? `粮草 +${def.useEffect.food}日份` : null,
                            def.useEffect.skillGain
                              ? `【${def.useEffect.skillGain[0]}】+${def.useEffect.skillGain[1]}`
                              : null,
                            def.useEffect.learnArtHint ?? null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </div>

                        {linkedArt && (
                          <div className="pt-1.5 border-t border-[#dfd0b3] space-y-1">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-[11px] text-[#52391e]">
                                关联武学：
                                <strong>{linkedArt.name}</strong>（{linkedArt.id} ·{' '}
                                {learnedInfo ? `已习得第 ${learnedInfo.level} 重` : '尚未习得'}）
                              </span>
                              <button
                                type="button"
                                onClick={() => onJumpToMartialArt(linkedArt)}
                                className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d1b0] border border-[#9e8462] text-[11px] text-[#781710] font-semibold cursor-pointer"
                              >
                                查阅武学总纲 →
                              </button>
                            </div>
                            <div className="text-[11px] text-[#7a6042]">
                              注：武学秘籍仅限初次展卷领悟入门（第1重），后续熟练度与重数须凭演武精修提升。
                            </div>
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

                  {/* 底部收录状态与已持有物品操作栏（无凭空入囊作弊按钮） */}
                  <div className="pt-3 border-t border-[#cbb693] flex flex-wrap items-center justify-between gap-2">
                    {isEquipped ? (
                      <span className="text-xs font-bold text-[#8f1d14] song-serif">
                        ★ 当前已随身佩挂中{!def.stackable ? '（举世孤品）' : ''}
                      </span>
                    ) : inBagQty > 0 ? (
                      <span className="text-xs font-bold text-[#184f35] song-serif">
                        ✓ 已收录于少侠行囊{def.stackable ? `（存有 ×${inBagQty}）` : '（举世孤品）'}
                      </span>
                    ) : !def.stackable && isConsumedUnique ? (
                      <span className="text-xs font-bold text-stone-700 song-serif">
                        ✓ 天地孤品已服食炼化（举世仅此一枚）
                      </span>
                    ) : (
                      <span className="text-xs text-[#6b5235] song-serif">
                        尚未收录入囊（须经书肆药铺购置、秘境寻幽或名士相赠所得）
                      </span>
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
                      {def.useEffect &&
                        inBagQty > 0 &&
                        !(def.useEffect.learnArtId && learnedInfo) && (
                          <button
                            type="button"
                            onClick={() => consumeInventoryItem(def.id, Boolean(def.equipSlot))}
                            className="px-2.5 py-1.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                          >
                            {def.category === 'scrolls'
                              ? '展卷研读'
                              : def.category === 'medicine'
                                ? '立即服食'
                                : '把玩修习'}
                          </button>
                        )}
                      {def.useEffect?.learnArtId && learnedInfo && inBagQty > 0 && (
                        <span className="px-2.5 py-1.5 rounded bg-[#e1f0e8] border border-[#6aa384] text-[#184f35] font-bold song-serif text-xs">
                          已领悟入门（第{learnedInfo.level}重）
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => onJumpToBagItem(def.category, def.id)}
                        className="px-2.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 font-bold song-serif text-xs cursor-pointer transition"
                      >
                        前往行囊四库 →
                      </button>
                    </div>
                  </div>
                </>
              )
            })()
          ) : (
            <div className="h-full flex items-center justify-center text-center text-[#7a6042] py-12">
              请从左侧选择一件典籍、丹毒或雅器查阅考据详录
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
