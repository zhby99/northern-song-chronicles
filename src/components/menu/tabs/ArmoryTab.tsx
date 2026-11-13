import { useMemo, useState } from 'react'
import { FACTION_DB_MAP, MARTIAL_ART_DB_MAP, WEAPONS_DB } from '../../../data/gameDb'
import {
  checkWeaponEquipRequirements,
  DEFAULT_HERO_TALENTS,
  formatBonusBadges,
  RARITY_STYLE_MAP,
} from '../../../data/itemsDb'
import { useGameStore } from '../../../store/useGameStore'
import type {
  CompiledMartialArtRecord,
  CompiledWeaponRecord,
  EquipmentTier,
  WeaponSubCategory,
} from '../../../types/game'
import { WEAPON_SUB_CATEGORIES } from '../menuShared'

interface ArmoryTabProps {
  selectedWeapon: CompiledWeaponRecord | null
  onSelectWeapon: (wpn: CompiledWeaponRecord) => void
  wpnTierFilter: 'ALL' | EquipmentTier
  onChangeWpnTierFilter: (tier: 'ALL' | EquipmentTier) => void
  wpnTypeFilter: 'ALL' | WeaponSubCategory
  onChangeWpnTypeFilter: (type: 'ALL' | WeaponSubCategory) => void
  onJumpToRegion: (regionId: string) => void
  onJumpToSect: (sectId: string) => void
  onJumpToMartialArt: (art: CompiledMartialArtRecord) => void
  onJumpToWeaponLoadout: () => void
  onCloseModal: () => void
}

export function ArmoryTab({
  selectedWeapon,
  onSelectWeapon,
  wpnTierFilter,
  onChangeWpnTierFilter,
  wpnTypeFilter,
  onChangeWpnTypeFilter,
  onJumpToRegion,
  onJumpToSect,
  onJumpToMartialArt,
  onJumpToWeaponLoadout,
  onCloseModal,
}: ArmoryTabProps) {
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const skills = useGameStore((s) => s.skills)
  const equipped = useGameStore((s) => s.equipped)
  const inventory = useGameStore((s) => s.inventory)

  const acquireWeaponToBag = useGameStore((s) => s.acquireWeaponToBag)
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)

  const [wpnQuery, setWpnQuery] = useState('')

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

  return (
    <div className="space-y-3.5 text-xs">
      {/* 七槽披挂总卷进度横幅 */}
      <div className="p-3 rounded bg-[#efe4cc] border-2 border-[#b5986e] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] font-bold song-serif">
            皇祐披挂总典
          </span>
          <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
            第一卷《百兵谱》100 种武器已定稿（10 天阶 · 20 地阶 · 30 良阶 · 40 凡阶）
          </span>
        </div>
        <span className="text-[11px] text-[#6b5235]">
          其余六槽（服饰 / 鞋履 / 弓箭 / 双配饰 / 坐骑）旧占位披挂已清空，待后续专卷录入
        </span>
      </div>

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
            onChange={(e) => onChangeWpnTierFilter(e.target.value as 'ALL' | EquipmentTier)}
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
          <span className="text-[11px] text-[#6b5235] font-bold song-serif mr-1">七大兵种：</span>
          <button
            type="button"
            onClick={() => onChangeWpnTypeFilter('ALL')}
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
                onClick={() => onChangeWpnTypeFilter(cat)}
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
                onClick={() => onSelectWeapon(wpn)}
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
                    {wpn.weaponType} · 攻+{wpn.equipBonus.attack ?? 0} · 射程{wpn.attackRange}档 ·{' '}
                    {wpn.locationLabel}
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
          {selectedWeapon
            ? (() => {
                const isEquipped = equipped.weapon === selectedWeapon.id
                const inBagQty = inventoryQtyMap.get(selectedWeapon.id) ?? 0
                const reqCheck = checkWeaponEquipRequirements(selectedWeapon, playerEquipCtx)
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
                          onClick={() => onJumpToRegion(selectedWeapon.regionId)}
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
                              selectedNodeId: selectedWeapon.regionId,
                            })
                            onCloseModal()
                          }}
                          className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-[10px] cursor-pointer"
                        >
                          舆图寻路定位 →
                        </button>
                      </div>
                    </div>

                    {/* 交锋规格与银两估值 */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-2 text-xs">
                      <div>
                        <div className="text-[10px] text-[#6b5235]">交锋射程档位</div>
                        <strong className="font-mono text-[#8f1d14]">
                          {selectedWeapon.attackRange} 档
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
                                      onJumpToMartialArt(art)
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
                            onClick={() => equipItemToSlot(selectedWeapon.id, 'weapon')}
                            className="px-3 py-1.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer transition"
                          >
                            立即佩备上阵
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={onJumpToWeaponLoadout}
                          className="px-2.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 font-bold song-serif text-xs cursor-pointer"
                        >
                          前往披挂槽 →
                        </button>
                      </div>
                    </div>
                  </>
                )
              })()
            : null}
        </div>
      </div>
    </div>
  )
}
