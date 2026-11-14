import { useMemo, useState } from 'react'
import { MARTIAL_ART_DB_MAP } from '../../../data/gameDb'
import {
  canItemFitSlot,
  checkGearEquipRequirements,
  checkMountEquipRequirements,
  checkWeaponEquipRequirements,
  computeEquipmentTotals,
  computeWeaponArtSynergy,
  EQUIPMENT_SLOT_METAS,
  formatBonusBadges,
  ITEM_DB_MAP,
  RARITY_STYLE_MAP,
} from '../../../data/itemsDb'
import {
  canArtFitSlot,
  calcNeigongTransferGain,
  computeEquippedArtsTotals,
  computeSingleArtBonus,
  formatArtBonusBadges,
  getArtCombatExpRequired,
  getArtExpRequired,
  getArtTierRank,
  getMasteryStageLabel,
  isArtNeigong,
  MARTIAL_ART_SLOT_METAS,
} from '../../../data/playerMartialArts'
import { useGameStore } from '../../../store/useGameStore'
import {
  calcDailyCultivationExpGain,
  calcDailyExpByCategory,
  resolveCultivationVenue,
} from '../../../utils/heroStats'
import { resolveMountMeta } from '../../../utils/mapMath'
import type {
  CompiledMartialArtRecord,
  EquipmentSlotKey,
  LearnedArtEntry,
  MartialArtSlotKey,
} from '../../../types/game'
import { ManagedAssetImg } from '../../common/ManagedAssetImg'
import { ArtSlotIcon, SlotIcon } from '../MenuIcons'

interface LoadoutTabProps {
  selectedEquipSlot: EquipmentSlotKey
  onSelectEquipSlot: (slot: EquipmentSlotKey) => void
  inspectedLearnedArtId: string
  onSelectInspectedArtId: (artId: string) => void
}

export function LoadoutTab({
  selectedEquipSlot,
  onSelectEquipSlot,
  inspectedLearnedArtId,
  onSelectInspectedArtId,
}: LoadoutTabProps) {
  const baseStats = useGameStore((s) => s.baseStats)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const combatExp = useGameStore((s) => s.combatExp)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const equipped = useGameStore((s) => s.equipped)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const equippedArts = useGameStore((s) => s.equippedArts)
  const inventory = useGameStore((s) => s.inventory)
  const traveling = useGameStore((s) => s.traveling)
  const campPos = useGameStore((s) => s.campPos)
  const viewMode = useGameStore((s) => s.viewMode)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const sectState = useGameStore((s) => s.sectState)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)
  const unequipSlot = useGameStore((s) => s.unequipSlot)
  const equipArtToSlot = useGameStore((s) => s.equipArtToSlot)
  const unequipArtSlot = useGameStore((s) => s.unequipArtSlot)
  const cultivateLearnedArt = useGameStore((s) => s.cultivateLearnedArt)
  const breakthroughLearnedArt = useGameStore((s) => s.breakthroughLearnedArt)
  const transferNeigongProficiency = useGameStore((s) => s.transferNeigongProficiency)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const setBagCategory = useGameStore((s) => s.setBagCategory)
  const setMenuTab = useGameStore((s) => s.setMenuTab)

  const [selectedArtSlot, setSelectedArtSlot] = useState<MartialArtSlotKey>('neigong')
  const [transferPeerId, setTransferPeerId] = useState<string>('')

  const venueStatus = useMemo(
    () =>
      resolveCultivationVenue({
        traveling: Boolean(traveling),
        campPos,
        viewMode,
        currentNodeId,
        activeRegionId,
        activeBuildingInteriorId,
        selectedBuildingId,
        sectId: sectState.sectId,
      }),
    [
      traveling,
      campPos,
      viewMode,
      currentNodeId,
      activeRegionId,
      activeBuildingInteriorId,
      selectedBuildingId,
      sectState.sectId,
    ],
  )
  const dailyNeigongRate = useMemo(
    () => calcDailyExpByCategory(true, baseStats.talents, venueStatus.multiplier),
    [baseStats.talents, venueStatus.multiplier],
  )
  const dailyOuterRate = useMemo(
    () => calcDailyExpByCategory(false, baseStats.talents, venueStatus.multiplier),
    [baseStats.talents, venueStatus.multiplier],
  )

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
      talents: baseStats.talents,
    }),
    [maxHp, maxMp, agility, res, ridingSkill, skills, baseStats.talents],
  )
  const learnedMap = useMemo(() => {
    const m = new Map<string, { level: number; exp: number }>()
    for (const e of learnedArts) {
      m.set(e.artId, { level: e.level, exp: e.exp })
    }
    return m
  }, [learnedArts])

  const equippedCount = Object.values(equipped).filter(Boolean).length

  // --- 上半卷：7槽装备逻辑 ---
  const leftSlots = EQUIPMENT_SLOT_METAS.filter((m) => m.column === 'left')
  const rightSlots = EQUIPMENT_SLOT_METAS.filter((m) => m.column === 'right')
  const mountSlotMeta = EQUIPMENT_SLOT_METAS.find((m) => m.slot === 'mount')!
  const activeSlotMeta =
    EQUIPMENT_SLOT_METAS.find((m) => m.slot === selectedEquipSlot) ?? EQUIPMENT_SLOT_METAS[0]
  const activeEquippedItemId = equipped[selectedEquipSlot]
  const activeEquippedDef = activeEquippedItemId ? ITEM_DB_MAP[activeEquippedItemId] : null
  const compatibleBagItems = inventory
    .map((st) => ({ ...st, def: ITEM_DB_MAP[st.itemId] }))
    .filter((x) => x.def && canItemFitSlot(x.def, selectedEquipSlot))

  // --- 下半卷：6槽武学与所习武学逻辑 ---
  const activeArtSlotMeta =
    MARTIAL_ART_SLOT_METAS.find((m) => m.slot === selectedArtSlot) ?? MARTIAL_ART_SLOT_METAS[0]
  const activeEquippedArtId = equippedArts[selectedArtSlot]
  const activeEquippedArt = activeEquippedArtId ? MARTIAL_ART_DB_MAP[activeEquippedArtId] : null
  const activeEquippedArtMastery = activeEquippedArtId ? learnedMap.get(activeEquippedArtId) : null

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
  const inspectedArt = inspectedEntry ? MARTIAL_ART_DB_MAP[inspectedEntry.artId] : null

  const renderVisualSlotCard = (meta: (typeof EQUIPMENT_SLOT_METAS)[number]) => {
    const itemId = equipped[meta.slot]
    const itemDef = itemId ? ITEM_DB_MAP[itemId] : null
    const isSelected = selectedEquipSlot === meta.slot
    const rStyle = itemDef ? RARITY_STYLE_MAP[itemDef.rarity] : null

    return (
      <button
        key={meta.slot}
        type="button"
        onClick={() => onSelectEquipSlot(meta.slot)}
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
          <SlotIcon slot={meta.slot} className="w-4 h-4" />
          <span className="text-[9px] song-serif font-bold mt-0.5 leading-none">{meta.seal}</span>
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
          if (artId) onSelectInspectedArtId(artId)
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
          <ArtSlotIcon slot={meta.slot} className="w-4 h-4" />
          <span className="text-[9px] song-serif font-bold mt-0.5 leading-none">{meta.seal}</span>
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
                  <ManagedAssetImg
                    url="/assets/characters/templates/tpl_song_scholar_fb.jpg"
                    alt="少侠披挂立绘"
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
                <div className="text-[10px] text-[#52391e]">{resolveMountMeta(mountKey).name}</div>
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
                    <SlotIcon slot={activeSlotMeta.slot} className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="song-serif font-bold text-sm text-[#23180f]">
                      槽位检视：{activeSlotMeta.label}
                    </div>
                    <div className="text-[11px] text-[#6b5235]">{activeSlotMeta.hint}</div>
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
                          : activeEquippedDef.gearMeta
                            ? `${activeEquippedDef.gearMeta.tier}${activeEquippedDef.gearMeta.grade} · ${activeEquippedDef.gearMeta.subType}`
                            : activeEquippedDef.rarity}
                    </span>
                  </div>
                  {activeEquippedDef.weaponMeta && (
                    <div className="text-[11px] text-[#6b5235] font-mono">
                      编号 {activeEquippedDef.id} · 交锋射程 {activeEquippedDef.weaponMeta.attackRange}{' '}
                      档 · 劲力【
                      {activeEquippedDef.weaponMeta.forceTrait}】
                      {activeEquippedDef.weaponMeta.specialTag
                        ? ` · 特效【${activeEquippedDef.weaponMeta.specialTag}】`
                        : ''}
                    </div>
                  )}
                  {activeEquippedDef.mountMeta && (
                    <div className="text-[11px] text-[#6b5235] font-mono">
                      编号 {activeEquippedDef.id} · 日行基础 {activeEquippedDef.mountMeta.baseSpeed}{' '}
                      里 · 地貌【
                      {activeEquippedDef.mountMeta.terrainTrait}+
                      {activeEquippedDef.mountMeta.terrainBonusPct}%】
                      {activeEquippedDef.mountMeta.specialTag
                        ? ` · 神骏【${activeEquippedDef.mountMeta.specialTag}】`
                        : ''}
                    </div>
                  )}
                  {activeEquippedDef.gearMeta && (
                    <div className="text-[11px] text-[#6b5235] font-mono">
                      编号 {activeEquippedDef.id} · 产地【{activeEquippedDef.gearMeta.origin}】
                      {activeEquippedDef.gearMeta.specialTag
                        ? ` · 词条【${activeEquippedDef.gearMeta.specialTag}】`
                        : ''}
                    </div>
                  )}
                  <p className="text-xs text-[#4a3520] leading-relaxed">{activeEquippedDef.desc}</p>
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
                  {activeSlotMeta.slot === 'weapon' && weaponSynergy.matches.length > 0 && (
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
                            {m.isSignature ? '本命绝配' : '兵种契合'}《{m.artName}》+{m.pct}%（外功 +
                            {m.bonusAttack}）
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
                    : '（可从下方随身行囊或【图鉴·披挂总纲】调取披挂穿佩）'}
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
                        : def.gearMeta
                          ? checkGearEquipRequirements(def.gearMeta, playerEquipCtx)
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
                                    : def.gearMeta
                                      ? `${def.gearMeta.tier}${def.gearMeta.grade}·${def.gearMeta.subType}`
                                      : def.rarity}
                              </span>
                              {qty > 1 && (
                                <span className="font-mono text-[10px] text-[#6b5235]">×{qty}</span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#7f1d1d] font-mono truncate mt-0.5">
                              {formatBonusBadges(def.equipBonus).join(' · ')}
                            </div>
                            {!reqCheck.ok && (
                              <div className="text-[10px] text-[#b91c1c] mt-0.5">
                                佩备门槛未达：{unmetLabels.join('、')}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => equipItemToSlot(itemId, activeSlotMeta.slot)}
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

      {/* 二、 6 槽位主角武学运使与按日闭关破境区 */}
      <div className="p-4 rounded-lg bg-[#efe4cc] border-2 border-[#8c6e46] space-y-4 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cbb693] pb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#261910] text-amber-200 song-serif font-bold text-xs border border-[#c89d54]/60">
              下卷 · 武学闭关与配招
            </span>
            <span className="song-serif font-bold text-sm sm:text-base text-[#23180f]">
              少侠武学配招（1 主运内功 + 1 轻功身法 + 4 出战招式）与按日闭关破境
            </span>
          </div>
          <span className="text-xs text-[#781710] font-mono font-semibold">
            武学增益：攻+{artTotals.attack} · 防+{artTotals.defense} · 血+{artTotals.maxHp} · 内+
            {artTotals.maxMp} · 身法+{artTotals.agility} · 轻功+
            {Math.round(artTotals.qinggongBonus * 100)}%
          </span>
        </div>

        {/* 闭关场所核验与单日进境/战斗经验通栏 */}
        <div
          className={`p-3 rounded-md border flex flex-col gap-2 ${
            venueStatus.venue
              ? 'bg-[#eef6f1] border-[#6aa384] text-[#184f35]'
              : 'bg-[#fdf3e7] border-[#c58b38] text-[#781710]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold song-serif ${
                  venueStatus.venue
                    ? 'bg-[#1f5c3a] text-[#fff8eb]'
                    : 'bg-[#8f1d14] text-[#fff8eb]'
                }`}
              >
                {venueStatus.venue ? `可闭关 · ${venueStatus.venueLabel}` : '不可闭关'}
              </span>
              <span className="text-xs font-medium">
                {venueStatus.venue ? (
                  <>
                    场所倍率 <strong>{Math.round(venueStatus.multiplier * 100)}%</strong> ·{' '}
                    {venueStatus.dailyFoodCost > 0
                      ? `每日耗粮 ${venueStatus.dailyFoodCost} 份（现余 ${food} 份）`
                      : venueStatus.dailySilverCost > 0
                        ? `每日客栈宿费 ${venueStatus.dailySilverCost} 两（现余 ${silver} 两）`
                        : '师门驻地免住宿银两'}
                  </>
                ) : (
                  venueStatus.blockedReason
                )}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs shrink-0">
              <span className="text-[#3d2b19]">
                单日熟练：内功 <strong>+{dailyNeigongRate}</strong>/天 · 外轻{' '}
                <strong>+{dailyOuterRate}</strong>/天
              </span>
              <span className="px-2 py-0.5 rounded bg-[#261910] text-amber-200 font-bold">
                战斗经验：{combatExp.toLocaleString()} 点
              </span>
            </div>
          </div>
          {actionFeedback && (
            <div
              className={`text-[11px] px-2.5 py-1 rounded border ${
                actionFeedback.tone === 'warn'
                  ? 'bg-[#f8e3e1] border-[#d69891] text-[#781710] font-semibold'
                  : 'bg-[#fffaf0] border-[#cbb693] text-[#1b5132]'
              }`}
            >
              {actionFeedback.text}
            </div>
          )}
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

            {/* 已习得全部武学名录（含重数进度与闭关/破境按钮） */}
            <div className="pt-2.5 border-t border-[#cbb693] space-y-2">
              <div className="flex items-center justify-between">
                <span className="song-serif font-bold text-xs sm:text-sm text-[#23180f]">
                  少侠已习得武学全表（共 {learnedArts.length} 门 · 点击检视或按日闭关）
                </span>
                <button
                  type="button"
                  onClick={() => openCompendium('martialArts')}
                  className="text-[11px] text-[#8f1d14] font-bold hover:underline cursor-pointer"
                >
                  查阅天下 242 武学总纲 →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto scroll-thin pr-1">
                {learnedArts.map((entry) => {
                  const art = MARTIAL_ART_DB_MAP[entry.artId]
                  if (!art) return null
                  const isInspected = inspectedEntry?.artId === entry.artId
                  const isEquippedAnywhere = Object.values(equippedArts).includes(entry.artId)
                  const rStyle = RARITY_STYLE_MAP[art.tier]
                  const reqExp = getArtExpRequired(art, entry.level)
                  const reqCombatExp = getArtCombatExpRequired(art, entry.level)
                  const readyToBreak = entry.level < 10 && entry.exp >= reqExp
                  const canAffordBreak = combatExp >= reqCombatExp
                  const expPct =
                    entry.level >= 10 || reqExp <= 0
                      ? 100
                      : Math.min(100, Math.round((entry.exp / reqExp) * 100))
                  return (
                    <div
                      key={entry.artId}
                      onClick={() => onSelectInspectedArtId(entry.artId)}
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
                            {art.fullTier}
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
                            {art.category} · {entry.level}/10重（{getMasteryStageLabel(entry.level)}）
                          </span>
                          <span className="font-mono">
                            {entry.level >= 10
                              ? '圆满'
                              : `${entry.exp.toLocaleString()}/${reqExp.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-[#d8c5a3] rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full ${readyToBreak ? 'bg-[#1f5c3a]' : 'bg-[#8f1d14]'}`}
                            style={{ width: `${expPct}%` }}
                          />
                        </div>
                      </div>
                      {entry.level >= 10 ? (
                        <span className="px-2 py-1 rounded text-[10px] font-bold song-serif shrink-0 bg-[#d8c5a3] text-[#6b5235]">
                          圆满
                        </span>
                      ) : readyToBreak ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectInspectedArtId(entry.artId)
                            breakthroughLearnedArt(entry.artId)
                          }}
                          title={
                            canAffordBreak
                              ? `消耗 ${reqCombatExp} 点战斗经验冲破至第 ${entry.level + 1} 重`
                              : `破境需 ${reqCombatExp} 点战斗经验（当前 ${combatExp} 点）`
                          }
                          className={`px-2 py-1 rounded text-[10px] font-bold song-serif shrink-0 cursor-pointer ${
                            canAffordBreak
                              ? 'bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb]'
                              : 'bg-[#9a6b28] hover:bg-[#7d561e] text-[#fff8eb]'
                          }`}
                        >
                          破境({reqCombatExp}战)
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectInspectedArtId(entry.artId)
                            cultivateLearnedArt(entry.artId, 1)
                          }}
                          title={
                            venueStatus.venue
                              ? `于【${venueStatus.venueLabel}】闭关精修 1 天`
                              : (venueStatus.blockedReason ?? '未在闭关场所')
                          }
                          className={`px-2 py-1 rounded text-[10px] font-bold song-serif shrink-0 cursor-pointer ${
                            venueStatus.venue
                              ? 'bg-[#5c4024] hover:bg-[#78532f] text-[#fff8ee]'
                              : 'bg-[#bfa680] text-[#52391e]'
                          }`}
                        >
                          闭关1天
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 右：当前选中武学槽位配置 & 按日闭关破境控制台 */}
          <div className="lg:col-span-5 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3.5 flex flex-col justify-between gap-3">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#dccab0] pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-[#8f1d14] text-[#fff8eb] flex items-center justify-center">
                    <ArtSlotIcon slot={activeArtSlotMeta.slot} className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="song-serif font-bold text-sm text-[#23180f]">
                      武学槽位：{activeArtSlotMeta.label}
                    </div>
                    <div className="text-[11px] text-[#6b5235]">{activeArtSlotMeta.hint}</div>
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
                <div className="space-y-1.5 max-h-40 overflow-y-auto scroll-thin pr-1">
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
                            onClick={() => equipArtToSlot(artId, activeArtSlotMeta.slot)}
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

            {/* 底部检视武学：按日闭关精修 & 战斗经验破境控制台 */}
            {inspectedArt && inspectedEntry && (() => {
              const reqExp = getArtExpRequired(inspectedArt, inspectedEntry.level)
              const reqCombatExp = getArtCombatExpRequired(inspectedArt, inspectedEntry.level)
              const singleDayGain = calcDailyCultivationExpGain(
                inspectedArt,
                baseStats.talents,
                venueStatus.multiplier,
              )
              const isMaxLevel = inspectedEntry.level >= 10
              const isReadyBreak = !isMaxLevel && inspectedEntry.exp >= reqExp
              const daysNeeded = isMaxLevel
                ? 0
                : Math.max(1, Math.ceil((reqExp - inspectedEntry.exp) / Math.max(1, singleDayGain)))
              return (
                <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="song-serif font-bold text-xs text-[#23180f] truncate">
                      闭关精修：{inspectedArt.name}（{inspectedArt.fullTier} · 第{' '}
                      {inspectedEntry.level}/10 重）
                    </div>
                    {!isMaxLevel && (
                      <span className="font-mono text-[10px] text-[#1b5132] font-bold shrink-0">
                        +{singleDayGain}/天
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] text-[#52391e] font-mono">
                    <span>
                      {isMaxLevel
                        ? '十重返璞归真（圆满化境）'
                        : `熟练 ${inspectedEntry.exp.toLocaleString()} / ${reqExp.toLocaleString()}（约需 ${daysNeeded} 天）`}
                    </span>
                    {!isMaxLevel && (
                      <span className="text-[#781710] font-semibold">
                        {reqCombatExp > 0
                          ? `破境战经 ${reqCombatExp}（现 ${combatExp}）`
                          : '凡品免战经自动连破'}
                      </span>
                    )}
                  </div>

                  {isMaxLevel ? (
                    <div className="w-full py-1.5 rounded bg-[#d8c5a3] text-center text-[#52391e] font-bold song-serif text-xs">
                      已臻十重圆满化境
                    </div>
                  ) : isReadyBreak ? (
                    <button
                      type="button"
                      onClick={() => breakthroughLearnedArt(inspectedEntry.artId)}
                      className={`w-full py-2 rounded font-bold song-serif text-xs shadow cursor-pointer transition ${
                        combatExp >= reqCombatExp
                          ? 'bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb]'
                          : 'bg-[#9a6b28] hover:bg-[#7d561e] text-[#fff8eb]'
                      }`}
                    >
                      {combatExp >= reqCombatExp
                        ? `冲关破境 → 晋入第 ${inspectedEntry.level + 1} 重（消耗 ${reqCombatExp} 战经）`
                        : `战斗经验不足（破境需 ${reqCombatExp} 点，当前 ${combatExp} 点）`}
                    </button>
                  ) : (
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        type="button"
                        onClick={() => cultivateLearnedArt(inspectedEntry.artId, 1)}
                        className={`py-1.5 rounded font-bold song-serif text-[11px] cursor-pointer transition ${
                          venueStatus.venue
                            ? 'bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb]'
                            : 'bg-[#bfa680] text-[#52391e]'
                        }`}
                      >
                        闭关 1天
                      </button>
                      <button
                        type="button"
                        onClick={() => cultivateLearnedArt(inspectedEntry.artId, 7)}
                        className={`py-1.5 rounded font-bold song-serif text-[11px] cursor-pointer transition ${
                          venueStatus.venue
                            ? 'bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb]'
                            : 'bg-[#bfa680] text-[#52391e]'
                        }`}
                      >
                        闭关 7天
                      </button>
                      <button
                        type="button"
                        onClick={() => cultivateLearnedArt(inspectedEntry.artId, 30)}
                        className={`py-1.5 rounded font-bold song-serif text-[11px] cursor-pointer transition ${
                          venueStatus.venue
                            ? 'bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb]'
                            : 'bg-[#bfa680] text-[#52391e]'
                        }`}
                      >
                        闭关 30天
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          cultivateLearnedArt(inspectedEntry.artId, 'until_breakthrough')
                        }
                        className={`py-1.5 rounded font-bold song-serif text-[11px] cursor-pointer transition ${
                          venueStatus.venue
                            ? 'bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb]'
                            : 'bg-[#bfa680] text-[#52391e]'
                        }`}
                      >
                        闭关至破境
                      </button>
                    </div>
                  )}

                  {/* 内功转修制：低阶总熟练度折半转入高阶，旧内功总熟练度清零 */}
                  {isArtNeigong(inspectedArt) && (() => {
                    const curRank = getArtTierRank(inspectedArt)
                    const curGain = calcNeigongTransferGain(inspectedArt, inspectedEntry)
                    const options: Array<{
                      fromId: string
                      toId: string
                      label: string
                      sourceTotalExp: number
                      transferExp: number
                    }> = []

                    for (const le of learnedArts) {
                      if (le.artId === inspectedArt.id) continue
                      const other = MARTIAL_ART_DB_MAP[le.artId]
                      if (!other || !isArtNeigong(other)) continue
                      const otherRank = getArtTierRank(other)
                      // 1) 当前为高阶未圆满内功：可吸纳更低阶内功的熟练度
                      if (!isMaxLevel && otherRank < curRank) {
                        const g = calcNeigongTransferGain(other, le)
                        if (g.transferExp > 0) {
                          options.push({
                            fromId: other.id,
                            toId: inspectedArt.id,
                            label: `吸纳《${other.cleanName}》（${other.fullTier}·${le.level}重）`,
                            sourceTotalExp: g.sourceTotalExp,
                            transferExp: g.transferExp,
                          })
                        }
                      }
                      // 2) 当前为低阶已修内功：可转修至更高阶未圆满内功
                      if (curGain.transferExp > 0 && otherRank > curRank && le.level < 10) {
                        options.push({
                          fromId: inspectedArt.id,
                          toId: other.id,
                          label: `转修至《${other.cleanName}》（${other.fullTier}·${le.level}重）`,
                          sourceTotalExp: curGain.sourceTotalExp,
                          transferExp: curGain.transferExp,
                        })
                      }
                    }

                    if (options.length === 0) return null
                    const activeOpt =
                      options.find((o) => `${o.fromId}->${o.toId}` === transferPeerId) ?? options[0]!
                    const activeFromName =
                      MARTIAL_ART_DB_MAP[activeOpt.fromId]?.cleanName ?? activeOpt.fromId
                    const activeToName =
                      MARTIAL_ART_DB_MAP[activeOpt.toId]?.cleanName ?? activeOpt.toId

                    return (
                      <div className="pt-2 mt-2 border-t border-[#cbb693] space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="song-serif font-bold text-[#781710]">
                            内功转修（散功承继）
                          </span>
                          <span className="font-mono text-[10px] text-[#5c3d1e]">
                            原总熟练 {activeOpt.sourceTotalExp.toLocaleString()} ÷ 2 → +
                            {activeOpt.transferExp.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <select
                            value={`${activeOpt.fromId}->${activeOpt.toId}`}
                            onChange={(e) => setTransferPeerId(e.target.value)}
                            className="flex-1 min-w-0 px-2 py-1 rounded bg-[#faf3e3] border border-[#bfa680] text-[11px] text-[#23180f]"
                          >
                            {options.map((opt) => (
                              <option
                                key={`${opt.fromId}->${opt.toId}`}
                                value={`${opt.fromId}->${opt.toId}`}
                              >
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              transferNeigongProficiency(activeOpt.fromId, activeOpt.toId)
                            }
                            className="px-2.5 py-1 rounded bg-[#781710] hover:bg-[#961f16] text-[#fff8eb] font-bold song-serif text-[11px] shrink-0 cursor-pointer transition"
                            title={`将《${activeFromName}》总熟练度清零，折半注入《${activeToName}》`}
                          >
                            确认转修
                          </button>
                        </div>
                        <div className="text-[10px] text-[#6b5235]">
                          提示：转修后《{activeFromName}》将重置为第 1 重（总熟练度清 0），折半熟练度注入《
                          {activeToName}》。
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
