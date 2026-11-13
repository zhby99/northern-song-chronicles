import { useMemo, useState } from 'react'
import { Check, Plus, Search, Shield, Sparkles } from 'lucide-react'
import { GEAR_DB, REGION_DB_MAP } from '../../data/gameDb'
import {
  checkGearEquipRequirements,
  DEFAULT_HERO_TALENTS,
  formatBonusBadges,
} from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type { CompiledGearRecord, EquipmentTier, GearSlotType } from '../../types/game'

interface GearCompendiumPanelProps {
  slotFilter: GearSlotType
  onJumpToRegion?: (regionId: string) => void
  onJumpToLoadout?: () => void
}

const TIER_FILTERS: Array<'all' | EquipmentTier> = ['all', '天阶', '地阶', '良阶', '凡阶']

const TIER_BADGE_MAP: Record<EquipmentTier, string> = {
  天阶: 'bg-[#7f1d1d] text-amber-100 border-[#e6be68]',
  地阶: 'bg-[#5b21b6] text-purple-100 border-purple-300/60',
  良阶: 'bg-[#1e3a8a] text-sky-100 border-sky-300/60',
  凡阶: 'bg-[#57493a] text-[#f5ecd9] border-[#a89068]',
}

const SLOT_TITLES: Record<GearSlotType, { title: string; subtitle: string }> = {
  armor: {
    title: '第二卷 · 衣甲服饰谱（56 件）',
    subtitle: '6 天阶 · 10 地阶 · 16 良阶 · 24 凡阶 — 护体气血与抗性根基',
  },
  shoes: {
    title: '第三卷 · 履靴行缠谱（28 双）',
    subtitle: '3 天阶 · 5 地阶 · 8 良阶 · 12 凡阶 — 提振实战身法与行军耐力',
  },
  bow: {
    title: '第四卷 · 强弓劲弩谱（28 具）',
    subtitle: '3 天阶 · 5 地阶 · 8 良阶 · 12 凡阶 — 远射军械与破甲奇弩',
  },
  accessory: {
    title: '第五卷 · 玉佩奇珍谱（56 件）',
    subtitle: '6 天阶 · 10 地阶 · 16 良阶 · 24 凡阶 — 玉佩佛珠护心镜双槽奇珍',
  },
}

export function GearCompendiumPanel({
  slotFilter,
  onJumpToRegion,
  onJumpToLoadout,
}: GearCompendiumPanelProps) {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<'all' | EquipmentTier>('all')
  const [subTypeFilter, setSubTypeFilter] = useState<string>('all')

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

  const subTypes = useMemo(() => {
    const set = new Set<string>()
    for (const item of slotItems) set.add(item.subType)
    return ['all', ...Array.from(set)]
  }, [slotItems])

  const filtered = useMemo(() => {
    const kw = search.trim().toLowerCase()
    return slotItems.filter((item) => {
      if (tierFilter !== 'all' && item.tier !== tierFilter) return false
      if (subTypeFilter !== 'all' && item.subType !== subTypeFilter) return false
      if (!kw) return true
      return (
        item.name.toLowerCase().includes(kw) ||
        item.id.toLowerCase().includes(kw) ||
        item.origin.toLowerCase().includes(kw) ||
        item.description.toLowerCase().includes(kw)
      )
    })
  }, [slotItems, tierFilter, subTypeFilter, search])

  const ownedSet = useMemo(() => {
    const set = new Set<string>()
    for (const stack of inventory) {
      if (stack.qty > 0) set.add(stack.itemId)
    }
    for (const v of Object.values(equipped)) {
      if (v) set.add(v)
    }
    return set
  }, [inventory, equipped])

  const handleAcquireAndEquip = (item: CompiledGearRecord, equipNow: boolean) => {
    if (equipNow) {
      const targetSlot = item.slot === 'accessory' ? 'accessory1' : item.slot
      equipItemToSlot(item.id, targetSlot)
    }
  }

  const headerMeta = SLOT_TITLES[slotFilter]

  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#cbb693] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-bold song-serif text-[#2a1d11] text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#8f1d14]" />
            {headerMeta.title}
          </h4>
          <p className="text-xs text-[#6b5235] mt-0.5">{headerMeta.subtitle}</p>
        </div>
        <div className="text-xs font-mono text-[#52391e] bg-white/70 px-2.5 py-1 rounded border border-[#d6c3a3]">
          当前收录：{filtered.length} / {slotItems.length} 件
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#7a6042] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="检索名称、编号、产地或特效..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-white border border-[#cbb693] text-xs text-[#2a1d11] focus:outline-none focus:border-[#8f1d14]"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {TIER_FILTERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTierFilter(t)}
              className={`px-2.5 py-1 rounded text-xs font-bold border transition cursor-pointer ${
                tierFilter === t
                  ? 'bg-[#8f1d14] text-amber-100 border-[#e6be68]'
                  : 'bg-[#f4ead5] text-[#52391e] border-[#cbb693] hover:bg-[#ead9b7]'
              }`}
            >
              {t === 'all' ? '全阶' : t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {subTypes.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSubTypeFilter(st)}
              className={`px-2 py-1 rounded text-[11px] border transition cursor-pointer ${
                subTypeFilter === st
                  ? 'bg-[#2a1d11] text-amber-100 border-[#c89d54]'
                  : 'bg-white/70 text-[#52391e] border-[#d6c3a3] hover:bg-[#f4ead5]'
              }`}
            >
              {st === 'all' ? '全部类别' : st}
            </button>
          ))}
        </div>
      </div>

      {/* 列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((item) => {
          const isOwned = ownedSet.has(item.id)
          const isEquipped =
            equipped.armor === item.id ||
            equipped.shoes === item.id ||
            equipped.bow === item.id ||
            equipped.accessory1 === item.id ||
            equipped.accessory2 === item.id
          const bonuses = formatBonusBadges(item.equipBonus)
          const reqCheck = checkGearEquipRequirements(item, {
            talents: DEFAULT_HERO_TALENTS,
            maxHp,
            maxMp,
            agility,
            res,
            ridingSkill,
            skills,
          })
          const regionName = REGION_DB_MAP[item.regionId]?.name ?? item.origin

          return (
            <div
              key={item.id}
              className={`p-3 rounded-lg border transition flex flex-col justify-between gap-2 ${
                isEquipped
                  ? 'bg-[#fff9eb] border-[#c89d54] shadow-sm'
                  : 'bg-white/85 border-[#d6c3a3] hover:border-[#a88248]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${TIER_BADGE_MAP[item.tier]}`}
                      >
                        {item.tier}·{item.grade}
                      </span>
                      <span className="text-[10px] font-mono text-[#7a6042]">{item.id}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f4ead5] text-[#52391e] border border-[#d6c3a3]">
                        {item.subType}
                      </span>
                    </div>
                    <h5 className="font-bold song-serif text-[#2a1d11] text-sm mt-1 flex items-center gap-1.5">
                      {item.name}
                      {isEquipped && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-700 text-white font-sans">
                          已披挂
                        </span>
                      )}
                    </h5>
                  </div>
                  <div className="text-right text-[11px] font-mono text-[#7a6042] shrink-0">
                    {item.value} 两
                  </div>
                </div>

                {bonuses.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {bonuses.map((b) => (
                      <span
                        key={b}
                        className="px-1.5 py-0.5 rounded bg-[#f7efde] text-[#6d2415] border border-[#e0cea8] text-[10px] font-mono font-bold"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-[#4a3520] mt-2 leading-relaxed">
                  {item.specialTag && (
                    <span className="font-bold text-[#8f1d14] mr-1">【{item.specialTag}】</span>
                  )}
                  {item.description}
                </p>

                {item.prerequisitesText && (
                  <div
                    className={`mt-1.5 text-[11px] px-2 py-1 rounded border flex items-center gap-1 ${
                      reqCheck.ok
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>
                      佩备条件：{item.prerequisitesText}（{reqCheck.ok ? '已达标' : '未达标'}）
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-dashed border-[#e0cea8] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => onJumpToRegion?.(item.regionId)}
                  className="text-[#1f5c3a] hover:underline font-medium cursor-pointer"
                >
                  产地：{regionName} ▸
                </button>
                <div className="flex items-center gap-1.5">
                  {!isOwned ? (
                    <button
                      type="button"
                      onClick={() => handleAcquireAndEquip(item, false)}
                      className="px-2 py-1 rounded bg-[#f4ead5] hover:bg-[#ead9b7] text-[#3d2914] border border-[#cbb693] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      收入行囊
                    </button>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                      <Check className="w-3 h-3" />
                      已持有
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      handleAcquireAndEquip(item, true)
                      onJumpToLoadout?.()
                    }}
                    disabled={!reqCheck.ok}
                    className={`px-2 py-1 rounded border font-bold transition cursor-pointer ${
                      reqCheck.ok
                        ? 'bg-[#8f1d14] hover:bg-[#a9241a] text-amber-100 border-[#e6be68]'
                        : 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed'
                    }`}
                  >
                    立即披挂
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
