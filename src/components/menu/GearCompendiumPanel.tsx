import { useMemo, useState } from 'react'
import {
  FACTION_DB_MAP,
  GEAR_DB,
  REGION_DB_MAP,
  UNIQUE_ARTIFACT_MAP,
} from '../../data/gameDb'
import {
  checkGearEquipRequirements,
  formatBonusBadges,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type { CompiledGearRecord, EquipmentTier, GearSlotType } from '../../types/game'
import { ItemAcquisitionBanner } from './ItemAcquisitionBanner'
import { UniqueOwnershipBadge, UniqueOwnershipBanner } from './UniqueOwnershipBanner'

interface GearCompendiumPanelProps {
  slotFilter: GearSlotType
  focusedGearId?: string | null
  onJumpToRegion: (regionId: string) => void
  onJumpToSect: (sectId: string) => void
  onJumpToLoadout: () => void
  onCloseModal: () => void
}

const SLOT_COMPENDIUM_META: Record<
  GearSlotType,
  {
    unit: string
    slotLabel: string
    subTypeHeading: string
    originLabel: string
    placeholder: string
  }
> = {
  armor: {
    unit: '件',
    slotLabel: '衣甲护身槽',
    subTypeHeading: '服饰形制',
    originLabel: '织造/执掌',
    placeholder:
      '搜索服饰编号、名称、当前归属人、无主、产地或典故（如：ARM-001、赵祯、乔峰、无主、软猬甲）…',
  },
  shoes: {
    unit: '双',
    slotLabel: '鞋履行缠槽',
    subTypeHeading: '履靴形制',
    originLabel: '制履/执掌',
    placeholder:
      '搜索鞋履编号、名称、当前归属人、无主、产地或典故（如：BOT-001、段誉、萧远山、无主、凌波）…',
  },
  bow: {
    unit: '具',
    slotLabel: '远射弓弩槽',
    subTypeHeading: '弓弩形制',
    originLabel: '督造/执掌',
    placeholder:
      '搜索弓弩编号、名称、当前归属人、无主、产地或典故（如：BOW-001、狄青、耶律洪基、神臂弓）…',
  },
  accessory: {
    unit: '件',
    slotLabel: '双配饰槽（壹/贰）',
    subTypeHeading: '奇珍形制',
    originLabel: '琢制/执掌',
    placeholder:
      '搜索配饰编号、名称、当前归属人、无主、产地或典故（如：ACC-001、无崖子、包拯、七宝指环）…',
  },
}

export function GearCompendiumPanel({
  slotFilter,
  focusedGearId,
  onJumpToRegion,
  onJumpToSect,
  onJumpToLoadout,
  onCloseModal,
}: GearCompendiumPanelProps) {
  const baseStats = useGameStore((s) => s.baseStats)
  const inventory = useGameStore((s) => s.inventory)
  const equipped = useGameStore((s) => s.equipped)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const skills = useGameStore((s) => s.skills)
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)

  const slotItems = useMemo(
    () => GEAR_DB.filter((g) => g.slot === slotFilter),
    [slotFilter],
  )

  const [gearQuery, setGearQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<'ALL' | EquipmentTier>('ALL')
  const [subTypeFilter, setSubTypeFilter] = useState<string>('ALL')
  const [selectedGearId, setSelectedGearId] = useState<string>(
    () => focusedGearId ?? slotItems[0]?.id ?? '',
  )

  const meta = SLOT_COMPENDIUM_META[slotFilter]

  const playerEquipCtx = useMemo(
    () => ({
      talents: baseStats.talents,
      maxHp,
      maxMp,
      agility,
      res,
      ridingSkill,
      skills,
    }),
    [baseStats.talents, maxHp, maxMp, agility, res, ridingSkill, skills],
  )

  const inventoryQtyMap = useMemo(() => {
    const m = new Map<string, number>()
    for (const st of inventory) {
      m.set(st.itemId, st.qty)
    }
    return m
  }, [inventory])

  const tierCounts = useMemo(() => {
    const counts: Record<EquipmentTier, number> = {
      天阶: 0,
      地阶: 0,
      良阶: 0,
      凡阶: 0,
    }
    for (const item of slotItems) {
      counts[item.tier] += 1
    }
    return counts
  }, [slotItems])

  const subTypes = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of slotItems) {
      map.set(item.subType, (map.get(item.subType) ?? 0) + 1)
    }
    return Array.from(map.entries())
  }, [slotItems])

  const filteredGear = useMemo(() => {
    const q = gearQuery.trim().toLowerCase()
    return slotItems.filter((item) => {
      if (tierFilter !== 'ALL' && item.tier !== tierFilter) return false
      if (subTypeFilter !== 'ALL' && item.subType !== subTypeFilter) return false
      if (!q) return true
      const uRec = UNIQUE_ARTIFACT_MAP[item.id]
      const ownerMatch = uRec
        ? (uRec.ownerNpcName?.toLowerCase().includes(q) ?? false) ||
          (uRec.ownerNpcTitle?.toLowerCase().includes(q) ?? false) ||
          uRec.note.toLowerCase().includes(q) ||
          (uRec.ownerType === 'unowned' && '无主'.includes(q)) ||
          '孤品'.includes(q)
        : false
      const regionName = REGION_DB_MAP[item.regionId]?.name ?? ''
      return (
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.subType.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        regionName.toLowerCase().includes(q) ||
        (item.specialTag ?? '').toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        ownerMatch
      )
    })
  }, [slotItems, tierFilter, subTypeFilter, gearQuery])

  const selectedGear: CompiledGearRecord | null =
    filteredGear.find((g) => g.id === selectedGearId) ??
    filteredGear[0] ??
    slotItems[0] ??
    null

  const isGearEquipped = (itemId: string) =>
    equipped.armor === itemId ||
    equipped.shoes === itemId ||
    equipped.bow === itemId ||
    equipped.accessory1 === itemId ||
    equipped.accessory2 === itemId

  return (
    <>
      {/* 检索与品阶/形制筛选栏（与第一卷·百兵谱完全一致） */}
      <div className="bg-[#efe4cc] p-3 rounded border border-[#c8b28e] space-y-2.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="text"
            value={gearQuery}
            onChange={(e) => setGearQuery(e.target.value)}
            placeholder={meta.placeholder}
            className="flex-1 min-w-[220px] px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
          />
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as 'ALL' | EquipmentTier)}
            className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
          >
            <option value="ALL">
              全部四阶 ({slotItems.length} {meta.unit})
            </option>
            <option value="天阶">
              天阶绝品 ({tierCounts.天阶} {meta.unit} · 孤品)
            </option>
            <option value="地阶">
              地阶珍品 ({tierCounts.地阶} {meta.unit} · 孤品)
            </option>
            <option value="良阶">
              良阶佳品 ({tierCounts.良阶} {meta.unit})
            </option>
            <option value="凡阶">
              凡阶制式 ({tierCounts.凡阶} {meta.unit})
            </option>
          </select>
          <span className="text-xs text-[#5e472d] font-mono">
            筛选结果：{filteredGear.length} / {slotItems.length} {meta.unit}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#6b5235] font-bold song-serif mr-1">
            {meta.subTypeHeading}：
          </span>
          <button
            type="button"
            onClick={() => setSubTypeFilter('ALL')}
            className={`px-2.5 py-1 rounded text-[11px] song-serif font-bold cursor-pointer transition ${
              subTypeFilter === 'ALL'
                ? 'bg-[#261910] text-amber-200 border border-[#f5cb5c]'
                : 'bg-[#faf3e3] text-[#4a3219] border border-[#b89f78] hover:bg-[#e5d6b8]'
            }`}
          >
            全部细类 ({slotItems.length})
          </button>
          {subTypes.map(([st, cnt]) => {
            const isCur = subTypeFilter === st
            return (
              <button
                key={st}
                type="button"
                onClick={() => setSubTypeFilter(st)}
                className={`px-2.5 py-1 rounded text-[11px] song-serif font-bold cursor-pointer transition ${
                  isCur
                    ? 'bg-[#8f1d14] text-[#fff8eb] border border-[#f5cb5c]'
                    : 'bg-[#faf3e3] text-[#4a3219] border border-[#b89f78] hover:bg-[#e5d6b8]'
                }`}
              >
                {st} ({cnt})
              </button>
            )
          })}
        </div>
      </div>

      {/* 左：披挂名录列表（7列）；右：选中器物考据与属性详情（5列），与第一卷·百兵谱完全统一 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 max-h-[580px] overflow-y-auto scroll-thin pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 content-start">
          {filteredGear.map((item) => {
            const isSel = selectedGear?.id === item.id
            const isEquipped = isGearEquipped(item.id)
            const inBagQty = inventoryQtyMap.get(item.id) ?? 0
            const rStyle = RARITY_STYLE_MAP[item.tier]
            const primaryBonus = formatBonusBadges(item.equipBonus).slice(0, 2).join(' ')
            const regionLabel = REGION_DB_MAP[item.regionId]?.name ?? item.origin

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedGearId(item.id)}
                className={`p-3 rounded border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                  isSel
                    ? 'bg-[#261910] text-[#fff8eb] border-[#f5cb5c] shadow'
                    : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[10px] opacity-80">{item.id}</span>
                    <span className="song-serif font-bold text-xs sm:text-sm truncate">
                      {item.name}
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
                    <UniqueOwnershipBadge itemId={item.id} />
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isSel ? 'text-[#d6c5a5]' : 'text-[#6b5235]'
                    }`}
                  >
                    {item.subType}
                    {primaryBonus ? ` · ${primaryBonus}` : ''} · {regionLabel}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                >
                  {item.tier}·{item.grade}
                </span>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-5 p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-3 max-h-[580px] overflow-y-auto scroll-thin">
          {selectedGear ? (
            (() => {
              const isEquipped = isGearEquipped(selectedGear.id)
              const inBagQty = inventoryQtyMap.get(selectedGear.id) ?? 0
              const reqCheck = checkGearEquipRequirements(selectedGear, playerEquipCtx)
              const rStyle = RARITY_STYLE_MAP[selectedGear.tier]
              const sectEntry = selectedGear.sectId
                ? FACTION_DB_MAP[selectedGear.sectId]
                : null
              const targetEquipSlot =
                selectedGear.slot === 'accessory'
                  ? equipped.accessory1 && !equipped.accessory2
                    ? 'accessory2'
                    : 'accessory1'
                  : selectedGear.slot

              return (
                <>
                  <div className="border-b border-[#cbb693] pb-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-200">
                        {selectedGear.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                      >
                        {selectedGear.tier}·{selectedGear.grade} · {selectedGear.subType}
                      </span>
                    </div>
                    <div className="song-serif font-bold text-lg text-[#23180f] mt-1.5 flex items-center gap-2 flex-wrap">
                      <span>{selectedGear.name}</span>
                      {selectedGear.specialTag && (
                        <span className="px-2 py-0.5 rounded bg-[#8f1d14]/15 border border-[#8f1d14]/40 text-xs text-[#8f1d14] font-bold">
                          【{selectedGear.specialTag}】
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#4a3219] mt-1 flex items-center gap-1.5 flex-wrap">
                      <span>
                        {meta.originLabel}：<strong>{selectedGear.origin}</strong>（`
                        {selectedGear.regionId}`
                        {sectEntry ? ` · ${sectEntry.shortName}` : ''}）
                      </span>
                      <button
                        type="button"
                        onClick={() => onJumpToRegion(selectedGear.regionId)}
                        className="px-2 py-0.5 rounded bg-[#5c4024] hover:bg-[#73512e] text-[#fff8eb] text-[10px] font-semibold cursor-pointer"
                      >
                        地区图鉴 ▸
                      </button>
                      {sectEntry && (
                        <button
                          type="button"
                          onClick={() => onJumpToSect(sectEntry.id)}
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
                            selectedNodeId: selectedGear.regionId,
                          })
                          onCloseModal()
                        }}
                        className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-[10px] cursor-pointer"
                      >
                        舆图寻路定位 →
                      </button>
                    </div>
                  </div>

                  <UniqueOwnershipBanner itemId={selectedGear.id} />
                  <ItemAcquisitionBanner itemId={selectedGear.id} />

                  {/* 披挂规格与银两估值（与第一卷三格卡片完全对齐） */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-2 text-xs">
                    <div>
                      <div className="text-[10px] text-[#6b5235]">披挂部位槽</div>
                      <strong className="song-serif text-[#8f1d14]">{meta.slotLabel}</strong>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6b5235]">器物形制细类</div>
                      <strong className="song-serif text-[#23180f]">{selectedGear.subType}</strong>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6b5235]">皇祐市估价值</div>
                      <strong className="font-mono text-[#52391e]">
                        {selectedGear.value} 两
                      </strong>
                    </div>
                  </div>

                  {/* 装备属性增益 */}
                  <div className="space-y-1.5">
                    <div className="font-bold song-serif text-xs text-[#52391e]">
                      佩备实战与百工增益：
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formatBonusBadges(selectedGear.equipBonus).map((b) => (
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
                    {selectedGear.description}
                  </p>

                  {/* 天地阶佩戴门槛 */}
                  {selectedGear.prerequisitesText && (
                    <div className="p-3 rounded bg-[#faf3e3] border border-[#b89f78] space-y-2">
                      <div className="font-bold song-serif text-sm text-[#8f1d14]">
                        认主/佩戴修为门槛：
                      </div>
                      <div className="text-xs text-[#4a3219] leading-relaxed">
                        {selectedGear.prerequisitesText}
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

                  {/* 纯净持有状态展示与已持有装备操作（无任何凭空入囊作弊按钮） */}
                  <div className="pt-2 border-t border-[#cbb693] flex flex-wrap items-center justify-between gap-2">
                    {isEquipped ? (
                      <span className="text-xs font-bold text-[#8f1d14] song-serif">
                        ★ 当前已佩备于少侠【{meta.slotLabel}】
                      </span>
                    ) : inBagQty > 0 ? (
                      <span className="text-xs font-bold text-[#184f35] song-serif">
                        ✓ 已在少侠【行囊杂物】中（存有 {inBagQty} {meta.unit}）
                      </span>
                    ) : (
                      <span className="text-xs text-[#6b5235] song-serif">
                        尚未收入行囊（须经商肆购置、名宿馈赠或江湖奇遇所得）
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {!isEquipped && inBagQty > 0 && (
                        <button
                          type="button"
                          onClick={() => equipItemToSlot(selectedGear.id, targetEquipSlot)}
                          className="px-3 py-1.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                        >
                          立即佩备上阵
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={onJumpToLoadout}
                        className="px-2.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 font-bold song-serif text-xs cursor-pointer"
                      >
                        前往披挂槽 →
                      </button>
                    </div>
                  </div>
                </>
              )
            })()
          ) : (
            <div className="h-full flex items-center justify-center text-center text-[#7a6042] py-12">
              未检索到符合条件的披挂器物
            </div>
          )}
        </div>
      </div>
    </>
  )
}
