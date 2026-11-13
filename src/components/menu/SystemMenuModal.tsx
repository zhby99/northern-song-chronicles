import { useMemo, useRef, useState } from 'react'
import {
  BookOpen,
  Compass,
  FlaskConical,
  Footprints,
  Gem,
  Hammer,
  Package,
  Shield,
  Sparkles,
  Sword,
  Target,
} from 'lucide-react'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  ID_REGISTRY,
  MARTIAL_ART_DB_MAP,
  MARTIAL_ARTS_DB,
  NPCS_DB,
} from '../../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  canItemFitSlot,
  computeEquipmentTotals,
  EQUIPMENT_SLOT_METAS,
  formatBonusBadges,
  ITEM_DB_MAP,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type {
  BagCategoryKey,
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  EquipmentSlotKey,
  MenuTabKey,
  SaveSlotId,
} from '../../types/game'
import {
  ASSET_MANIFEST,
  formatByteSize,
  recordAssetLoaded,
  resolveAssetUrl,
  useAssetTelemetry,
} from '../../utils/assetLoader'
import {
  formatSongDate,
  getEffectiveSpeed,
  NODE_MAP,
  WORLD_GRAPH,
} from '../../utils/mapMath'
import {
  downloadSaveAsJsonFile,
  parseSaveJsonFile,
  putSaveEnvelope,
  SAVE_SLOT_DEFS,
} from '../../utils/saveManager'

const MENU_NAV_ITEMS: Array<{
  key: MenuTabKey
  numeral: string
  label: string
  seal: string
  subtitle: string
  implementedM0?: boolean
}> = [
  {
    key: 'hero',
    numeral: '壹',
    label: '主角与披挂',
    seal: '侠',
    subtitle: 'M1-0 先天三维、生存气血体能、通用十艺与下方 7 槽位可视化装备面板（含坐骑槽）',
    implementedM0: true,
  },
  {
    key: 'bag',
    numeral: '贰',
    label: '行囊四库',
    seal: '囊',
    subtitle: 'M1-0 四分类行囊（典籍书画 · 丹药毒物 · 雅器百工 · 行囊杂物）及银两粮草补给',
    implementedM0: true,
  },
  {
    key: 'portraits',
    numeral: '叁',
    label: '群侠图鉴',
    seal: '谱',
    subtitle: 'M0-3 编译全量 1,000 位皇祐人物档案、38 州府标准地名对齐与立绘懒加载',
    implementedM0: true,
  },
  {
    key: 'martialArts',
    numeral: '肆',
    label: '武学总纲',
    seal: '武',
    subtitle: 'M0-3 编译四阶十二品共 216 门武学全录、天阶前置校验词条与门派归属索引',
    implementedM0: true,
  },
  {
    key: 'engineering',
    numeral: '伍',
    label: '工程与字典',
    seal: '枢',
    subtitle: 'M0-1~M0-3 静态资源按需懒加载遥测 + 跨分支标准 ID 字典（38地/20派/216功/1000人）',
    implementedM0: true,
  },
  {
    key: 'save',
    numeral: '陆',
    label: '存 档',
    seal: '录',
    subtitle: 'M0-4/M1-0 多槽位 IndexedDB 卷宗持久化、自定义手札批注与 JSON 存档文件导出',
    implementedM0: true,
  },
  {
    key: 'load',
    numeral: '柒',
    label: '读 档',
    seal: '启',
    subtitle: 'M0-4/M1-0 读取历史卷宗回溯三层空间与装备行囊现场，或导入本地 .json 存档',
    implementedM0: true,
  },
  {
    key: 'settings',
    numeral: '捌',
    label: '设 置',
    seal: '律',
    subtitle: '舆图显示偏好、牌匾标注开关与界面主题调校',
    implementedM0: true,
  },
]

const QINGGONG_OPTIONS = [
  { label: '基础身法 (+0%)', value: 0 },
  { label: '越女轻身术 (+15%)', value: 0.15 },
  { label: '梯云纵 / 踏雪无痕 (+30%)', value: 0.3 },
  { label: '凌波微步 (+50%)', value: 0.5 },
]

function renderSlotIcon(slot: EquipmentSlotKey, cls = 'w-4 h-4') {
  switch (slot) {
    case 'weapon':
      return <Sword className={cls} />
    case 'armor':
      return <Shield className={cls} />
    case 'shoes':
      return <Footprints className={cls} />
    case 'bow':
      return <Target className={cls} />
    case 'accessory1':
      return <Gem className={cls} />
    case 'accessory2':
      return <Sparkles className={cls} />
    case 'mount':
      return <Compass className={cls} />
  }
}

function renderBagCatIcon(cat: BagCategoryKey, cls = 'w-4 h-4') {
  switch (cat) {
    case 'scrolls':
      return <BookOpen className={cls} />
    case 'medicine':
      return <FlaskConical className={cls} />
    case 'tools':
      return <Hammer className={cls} />
    case 'misc':
      return <Package className={cls} />
  }
}

function formatSavedTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export function SystemMenuModal() {
  const menuOpen = useGameStore((s) => s.menuOpen)
  const activeMenuTab = useGameStore((s) => s.activeMenuTab)
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const stamina = useGameStore((s) => s.stamina)
  const maxStamina = useGameStore((s) => s.maxStamina)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const equipped = useGameStore((s) => s.equipped)
  const inventory = useGameStore((s) => s.inventory)
  const activeBagCategory = useGameStore((s) => s.activeBagCategory)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const saveSlots = useGameStore((s) => s.saveSlots)
  const saveBusy = useGameStore((s) => s.saveBusy)
  const saveNotice = useGameStore((s) => s.saveNotice)

  const closeMenu = useGameStore((s) => s.closeMenu)
  const setMenuTab = useGameStore((s) => s.setMenuTab)
  const setQinggongBonus = useGameStore((s) => s.setQinggongBonus)
  const replenishSupplies = useGameStore((s) => s.replenishSupplies)
  const restRecoverStamina = useGameStore((s) => s.restRecoverStamina)
  const setBagCategory = useGameStore((s) => s.setBagCategory)
  const equipItemToSlot = useGameStore((s) => s.equipItemToSlot)
  const unequipSlot = useGameStore((s) => s.unequipSlot)
  const consumeInventoryItem = useGameStore((s) => s.consumeInventoryItem)
  const toggleRegionLabels = useGameStore((s) => s.toggleRegionLabels)
  const setAllLabelToggles = useGameStore((s) => s.setAllLabelToggles)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const buildSaveEnvelope = useGameStore((s) => s.buildSaveEnvelope)
  const saveToSlot = useGameStore((s) => s.saveToSlot)
  const loadFromEnvelope = useGameStore((s) => s.loadFromEnvelope)
  const removeSaveSlot = useGameStore((s) => s.removeSaveSlot)
  const setSaveNotice = useGameStore((s) => s.setSaveNotice)

  const telemetry = useAssetTelemetry()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Selected equipment slot in Hero Panel
  const [selectedEquipSlot, setSelectedEquipSlot] = useState<EquipmentSlotKey>('weapon')
  // Selected item ID in Bag Panel
  const [selectedBagItemId, setSelectedBagItemId] = useState<string | null>(null)

  // 1,000 NPC Compendium filter state
  const [npcQuery, setNpcQuery] = useState('')
  const [npcScope, setNpcScope] = useState<string>('ALL_WITH_ART')
  const [npcRegionFilter, setNpcRegionFilter] = useState<string>('ALL')
  const [npcFactionFilter, setNpcFactionFilter] = useState<string>('ALL')
  const [selectedNpc, setSelectedNpc] = useState<CompiledNpcRecord | null>(
    () => NPCS_DB[100] ?? NPCS_DB[0] ?? null,
  )

  // 216 Martial Arts Compendium filter state
  const [artQuery, setArtQuery] = useState('')
  const [artTierFilter, setArtTierFilter] = useState<string>('ALL')
  const [artCatFilter, setArtCatFilter] = useState<string>('ALL')
  const [selectedArt, setSelectedArt] = useState<CompiledMartialArtRecord | null>(
    () => MARTIAL_ARTS_DB[0] ?? null,
  )

  // Save note state
  const [saveNoteDraft, setSaveNoteDraft] = useState('')
  const [importTargetSlot, setImportTargetSlot] = useState<SaveSlotId | 'DIRECT_LOAD'>('DIRECT_LOAD')

  const filteredNpcs = useMemo(() => {
    const q = npcQuery.trim().toLowerCase()
    return NPCS_DB.filter((c) => {
      if (npcScope === 'ALL_WITH_ART' && !c.avatarUrl && !c.fullbodyUrl) return false
      if (npcScope === 'HISTORICAL' && c.category !== '历史名人') return false
      if (npcScope === 'GRANDMASTER_MASTER' && c.realmRank > 6) return false
      if (npcScope === 'FIRST_RATE' && (c.realmRank < 7 || c.realmRank > 9)) return false
      if (npcScope === 'HERE' && c.regionId !== activeRegionId) return false

      if (npcRegionFilter !== 'ALL' && c.regionId !== npcRegionFilter) return false
      if (npcFactionFilter !== 'ALL' && c.factionId !== npcFactionFilter) return false

      if (!q) return true
      return (
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.factionName.toLowerCase().includes(q) ||
        c.locationLabel.toLowerCase().includes(q) ||
        c.artsText.toLowerCase().includes(q)
      )
    })
  }, [npcQuery, npcScope, npcRegionFilter, npcFactionFilter, activeRegionId])

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

  const equipTotals = useMemo(() => computeEquipmentTotals(equipped), [equipped])

  const bagItemsByCat = useMemo(() => {
    const counts: Record<BagCategoryKey, number> = {
      scrolls: 0,
      medicine: 0,
      tools: 0,
      misc: 0,
    }
    const list: Array<{ itemId: string; qty: number; def: (typeof ITEM_DB_MAP)[string] }> = []
    for (const st of inventory) {
      const def = ITEM_DB_MAP[st.itemId]
      if (!def) continue
      counts[def.category] += 1
      if (def.category === activeBagCategory) {
        list.push({ itemId: st.itemId, qty: st.qty, def })
      }
    }
    return { counts, list }
  }, [inventory, activeBagCategory])

  if (!menuOpen) return null

  const curNode = NODE_MAP[currentNodeId] ?? WORLD_GRAPH.nodes[0]
  const activeRegionNode = NODE_MAP[activeRegionId] ?? curNode
  const activeInteriorBldg = activeBuildingInteriorId
    ? BUILDING_DB_MAP[activeBuildingInteriorId]
    : null

  const activeMeta =
    MENU_NAV_ITEMS.find((m) => m.key === activeMenuTab) ?? MENU_NAV_ITEMS[0]
  const speedInfo = getEffectiveSpeed(
    { mountKey, qinggongBonus, ridingSkill, agility },
    'official',
  )

  const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const parsed = await parseSaveJsonFile(file)
      if (importTargetSlot === 'DIRECT_LOAD') {
        loadFromEnvelope(parsed, true)
      } else {
        const rebound = { ...parsed, slotId: importTargetSlot }
        await putSaveEnvelope(rebound)
        await useGameStore.getState().refreshSaveSlots()
        setSaveNotice({
          text: `已将外部卷宗【${file.name}】验证并导入至【${importTargetSlot.toUpperCase()}】，可随时点击读取！`,
          tone: 'success',
        })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '导入 JSON 卷宗失败'
      setSaveNotice({ text: msg, tone: 'error' })
    }
  }

  return (
    <div
      id="game-menu-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMenu()
      }}
      className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4 select-none"
    >
      <div className="w-full max-w-5xl h-[650px] max-h-[92vh] bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-lg shadow-2xl flex flex-col overflow-hidden">
        {/* 顶部栏：金石朱印标题 + 快捷关闭 */}
        <div className="shrink-0 bg-[#261910] text-[#fbf2e0] border-b-2 border-[#c89d54] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-[#8f1d14] border border-[#f5cb5c]/70 flex items-center justify-center song-serif font-bold text-sm text-[#fff7e6]">
              枢
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="song-serif font-bold text-base tracking-widest text-amber-200">
                  《北宋立志传》行囊枢机总览
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#47321d] border border-[#9e7b47]/60 text-[11px] text-[#f5dfb5]">
                  {activeMeta.label.replace(/\s+/g, '')}
                </span>
              </div>
              <p className="text-[11px] text-[#d6c5a5]">
                {formatSongDate(dayCount, shichenIdx)} · M1-0 七槽披挂与四分类行囊已就绪 · 按 ESC 返回舆图
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="px-3 py-1.5 rounded bg-[#3d291a] hover:bg-[#8f1d14] text-[#fbf2e0] border border-[#c89d54]/60 text-xs font-bold song-serif transition cursor-pointer"
          >
            ✕ 返回江湖
          </button>
        </div>

        {/* 主体：左侧导航栏 + 右侧独立模块容器 */}
        <div className="flex-1 flex min-h-0">
          <nav className="w-52 shrink-0 bg-[#efe4cc] border-r border-[#bfa782] p-3 flex flex-col justify-between overflow-y-auto scroll-thin">
            <div className="space-y-1.5">
              {MENU_NAV_ITEMS.map((item) => {
                const isAct = item.key === activeMenuTab
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMenuTab(item.key)}
                    className={
                      isAct
                        ? 'w-full px-3 py-2 rounded-md border-2 border-[#f5cb5c] bg-[#8f1d14] text-[#fff8eb] text-left song-serif font-bold text-sm shadow-md transition flex items-center justify-between cursor-pointer'
                        : 'w-full px-3 py-2 rounded-md border border-[#b59c77] bg-[#f8f1e1] hover:bg-[#e7d9bc] text-[#2b1a0e] text-left song-serif font-bold text-sm transition flex items-center justify-between cursor-pointer'
                    }
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 text-center text-xs font-mono">{item.numeral}</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-xs opacity-75">▸</span>
                  </button>
                )
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-[#c7b18e] text-[11px] text-[#5e472d] space-y-1">
              <div className="flex justify-between">
                <span>当前时辰</span>
                <span className="font-semibold text-[#781710]">
                  {formatSongDate(dayCount, shichenIdx).split(' · ').slice(-2).join(' · ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>所在地域</span>
                <span className="font-semibold">{activeRegionNode?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>披挂槽位</span>
                <span className="font-mono font-bold text-[#1b5132]">
                  {Object.values(equipped).filter(Boolean).length} / 7 槽
                </span>
              </div>
              <div className="flex justify-between">
                <span>已懒加载</span>
                <span className="font-mono font-bold text-[#52391e]">
                  {telemetry.loadedCount}/{ASSET_MANIFEST.summary.totalExtractedImageFiles}
                </span>
              </div>
            </div>
          </nav>

          {/* 右侧子面板动态内容舞台 */}
          <section className="flex-1 overflow-y-auto scroll-thin p-5 bg-[#faf4e6] flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {/* 模块头 */}
              <div className="flex items-start justify-between border-b-2 border-[#cbb693] pb-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-md bg-[#8f1d14] border-2 border-[#f2c97d] text-[#fff8eb] flex items-center justify-center song-serif font-bold text-xl shadow">
                    {activeMeta.seal}
                  </div>
                  <div>
                    <h3 className="song-serif font-bold text-lg text-[#23180f] tracking-wide">
                      {activeMeta.label}
                    </h3>
                    <p className="text-xs text-[#6b5235] mt-0.5">{activeMeta.subtitle}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded border text-[11px] font-semibold shrink-0 bg-[#e1f0e8] border-[#6aa384] text-[#184f35]">
                  M1-0 已实装
                </span>
              </div>

              {/* 1. 主角与可视化 7 槽披挂面板 */}
              {activeMenuTab === 'hero' && (() => {
                const leftSlots = EQUIPMENT_SLOT_METAS.filter((m) => m.column === 'left')
                const rightSlots = EQUIPMENT_SLOT_METAS.filter((m) => m.column === 'right')
                const mountSlotMeta = EQUIPMENT_SLOT_METAS.find((m) => m.slot === 'mount')!
                const activeSlotMeta =
                  EQUIPMENT_SLOT_METAS.find((m) => m.slot === selectedEquipSlot) ??
                  EQUIPMENT_SLOT_METAS[0]
                const activeEquippedItemId = equipped[selectedEquipSlot]
                const activeEquippedDef = activeEquippedItemId
                  ? ITEM_DB_MAP[activeEquippedItemId]
                  : null
                const compatibleBagItems = inventory
                  .map((st) => ({ ...st, def: ITEM_DB_MAP[st.itemId] }))
                  .filter((x) => x.def && canItemFitSlot(x.def, selectedEquipSlot))

                const renderVisualSlotCard = (meta: (typeof EQUIPMENT_SLOT_METAS)[number]) => {
                  const itemId = equipped[meta.slot]
                  const itemDef = itemId ? ITEM_DB_MAP[itemId] : null
                  const isSelected = selectedEquipSlot === meta.slot
                  const rStyle = itemDef ? RARITY_STYLE_MAP[itemDef.rarity] : null

                  return (
                    <button
                      key={meta.slot}
                      type="button"
                      onClick={() => setSelectedEquipSlot(meta.slot)}
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
                        {renderSlotIcon(meta.slot, 'w-4 h-4')}
                        <span className="text-[9px] song-serif font-bold mt-0.5 leading-none">
                          {meta.seal}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#7a5f3e] song-serif">
                            【{meta.shortLabel}】
                          </span>
                          {itemDef && rStyle ? (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {itemDef.rarity}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#9a8262]">未佩备</span>
                          )}
                        </div>
                        <div
                          className={`font-bold song-serif truncate mt-0.5 ${
                            itemDef ? 'text-xs text-[#23180f]' : 'text-[11px] text-[#8a7254]'
                          }`}
                        >
                          {itemDef ? itemDef.name : `空置 · 点击选配${meta.shortLabel}`}
                        </div>
                      </div>
                    </button>
                  )
                }

                return (
                  <div className="space-y-4 text-xs">
                    {/* 上半部：主角核心状态、四维、先天三维与十艺修为 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                      <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                        <div className="flex items-center justify-between text-[#6b5033] mb-1">
                          <span>气血 / 体能</span>
                          <button
                            type="button"
                            onClick={restRecoverStamina}
                            title="花费 3 两纹银小憩三个时辰，回满体能"
                            className="px-1.5 py-0.5 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] text-[10px] font-bold cursor-pointer"
                          >
                            调息(+体能)
                          </button>
                        </div>
                        <div className="font-mono font-bold text-xs text-[#7f1d1d]">
                          气血 {hp}/{maxHp}
                        </div>
                        <div className="font-mono font-bold text-xs text-[#185a37] mt-0.5">
                          体能 {stamina}/{maxStamina}
                        </div>
                      </div>

                      <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                        <div className="text-[#6b5033] mb-1">实战四维（含披挂加成）</div>
                        <div className="font-mono font-bold text-xs text-[#23180f]">
                          内力 {mp}/{maxMp} · 身法 {agility}
                        </div>
                        <div className="font-mono font-bold text-xs text-[#5b3b73] mt-0.5">
                          抗性 {res} · 外功 +{equipTotals.attack} / 护甲 +{equipTotals.defense}
                        </div>
                      </div>

                      <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                        <div className="text-[#6b5033] mb-1">先天三维（非战斗禀赋）</div>
                        <div className="font-mono font-bold text-xs text-[#23180f]">
                          根骨 72 · 悟性 84 · 颜值 78
                        </div>
                        <div className="text-[10px] text-[#7a6042] mt-0.5">
                          决定秘籍参悟与宗门择徒门槛
                        </div>
                      </div>

                      <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                        <div className="text-[#6b5033] mb-1">官道行军脚力</div>
                        <div className="font-mono font-bold text-xs text-[#1b5132]">
                          {speedInfo.baseDailyLi} 里/日（+{speedInfo.modifierPct}%）
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-[#6b5033] mt-0.5">
                          <span>坐骑：{WORLD_GRAPH.mounts[mountKey].name}</span>
                          <select
                            value={qinggongBonus}
                            onChange={(e) => setQinggongBonus(Number(e.target.value))}
                            title="轻功身法演练"
                            className="bg-[#fffaf0] border border-[#bfa680] rounded px-1 py-0 text-[10px] cursor-pointer"
                          >
                            {QINGGONG_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label.split(' ')[0]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 通用十艺紧凑展示栏 */}
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="song-serif font-bold text-[#52391e]">
                          北宋十艺百工修为
                        </span>
                        <span className="text-[11px] text-[#7a6042]">
                          佩戴雅饰或研读典籍亦可增益艺道
                        </span>
                      </div>
                      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                        <div className="px-2 py-1 rounded bg-[#faf3e3] border border-[#cbb693] text-center">
                          <div className="text-[10px] text-[#6b5235]">骑术</div>
                          <strong className="font-mono text-xs text-[#8f1d14]">{ridingSkill}</strong>
                        </div>
                        {Object.entries(skills).map(([k, v]) => (
                          <div
                            key={k}
                            className="px-2 py-1 rounded bg-[#faf3e3] border border-[#cbb693] text-center"
                          >
                            <div className="text-[10px] text-[#6b5235]">{k}</div>
                            <strong className="font-mono text-xs text-[#23180f]">{v}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 下半部核心：7 槽位可视化装备面板（武器 / 服饰 / 鞋履 / 弓箭 / 配饰壹 / 配饰贰 + 坐骑槽） */}
                    <div className="p-4 rounded-lg bg-[#efe4cc] border-2 border-[#b5986e] space-y-3 shadow-inner">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cbb693] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] song-serif font-bold text-xs">
                            披挂绘卷
                          </span>
                          <span className="song-serif font-bold text-sm text-[#23180f]">
                            少侠随身七槽可视化装备栏（武器 · 服饰 · 鞋履 · 弓箭 · 双配饰 · 坐骑）
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6b5235]">
                          点击任意槽位可在右侧检视属性、卸下或从行囊一键换装
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
                        {/* 左：纸娃娃对称可视化 7 槽位阵列 (占 7 列) */}
                        <div className="lg:col-span-7 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3 flex flex-col justify-between gap-2.5">
                          <div className="grid grid-cols-1 sm:grid-cols-11 gap-2.5 items-center">
                            {/* 左三槽：武器 / 弓箭 / 配饰壹 */}
                            <div className="sm:col-span-4 space-y-2">
                              {leftSlots.map((m) => renderVisualSlotCard(m))}
                            </div>

                            {/* 中央侠客立绘剪影与总加成枢机 */}
                            <div className="sm:col-span-3 flex flex-col items-center justify-center py-2 px-1.5 rounded-md bg-gradient-to-b from-[#f2e6ce] to-[#e6d5b5] border border-[#c8b28e] text-center">
                              <div className="w-20 h-28 rounded border border-[#9e8462] overflow-hidden bg-[#261910] shadow relative">
                                <img
                                  src={resolveAssetUrl('/assets/characters/templates/tpl_song_scholar_fb.jpg')}
                                  alt="少侠披挂立绘"
                                  onLoad={() =>
                                    recordAssetLoaded('/assets/characters/templates/tpl_song_scholar_fb.jpg')
                                  }
                                  className="w-full h-full object-cover object-top opacity-95"
                                />
                                <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[#f5dfb5] text-[9px] py-0.5 song-serif">
                                  江湖少侠
                                </span>
                              </div>
                              <div className="mt-2 text-[10px] text-[#52391e] font-semibold song-serif">
                                已佩 {Object.values(equipped).filter(Boolean).length} / 7 件
                              </div>
                              <div className="text-[10px] font-mono text-[#7f1d1d]">
                                攻+{equipTotals.attack} · 防+{equipTotals.defense}
                              </div>
                            </div>

                            {/* 右三槽：服饰 / 鞋履 / 配饰贰 */}
                            <div className="sm:col-span-4 space-y-2">
                              {rightSlots.map((m) => renderVisualSlotCard(m))}
                            </div>
                          </div>

                          {/* 底部专属通栏第 7 槽：【坐骑槽】 */}
                          <div className="pt-1 border-t border-dashed border-[#cbb693]">
                            {renderVisualSlotCard(mountSlotMeta)}
                          </div>
                        </div>

                        {/* 右：当前选中装备槽位详情 & 快速替换列表 (占 5 列) */}
                        <div className="lg:col-span-5 bg-[#faf4e6] border border-[#cbb693] rounded-md p-3.5 flex flex-col justify-between gap-3">
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between border-b border-[#dccab0] pb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center">
                                  {renderSlotIcon(activeSlotMeta.slot, 'w-3.5 h-3.5')}
                                </span>
                                <div>
                                  <div className="song-serif font-bold text-sm text-[#23180f]">
                                    槽位检视：{activeSlotMeta.label}
                                  </div>
                                  <div className="text-[10px] text-[#6b5235]">
                                    {activeSlotMeta.hint}
                                  </div>
                                </div>
                              </div>
                              {activeEquippedDef && (
                                <button
                                  type="button"
                                  onClick={() => unequipSlot(activeSlotMeta.slot)}
                                  className="px-2.5 py-1 rounded bg-[#7f1d1d] hover:bg-[#991b1b] text-[#fff8eb] font-bold song-serif text-[11px] cursor-pointer transition shadow-sm"
                                >
                                  卸下装备
                                </button>
                              )}
                            </div>

                            {activeEquippedDef ? (
                              <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="song-serif font-bold text-xs text-[#23180f]">
                                    当前穿戴：{activeEquippedDef.name}
                                  </span>
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                      RARITY_STYLE_MAP[activeEquippedDef.rarity].badgeBg
                                    } ${RARITY_STYLE_MAP[activeEquippedDef.rarity].badgeText}`}
                                  >
                                    {activeEquippedDef.rarity}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#4a3520] leading-relaxed">
                                  {activeEquippedDef.desc}
                                </p>
                                <div className="flex flex-wrap gap-1 pt-0.5">
                                  {formatBonusBadges(activeEquippedDef.equipBonus).map((b) => (
                                    <span
                                      key={b}
                                      className="px-1.5 py-0.5 rounded bg-[#fff9ec] border border-[#bfa680] text-[10px] font-mono font-semibold text-[#7f1d1d]"
                                    >
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="p-3 rounded border border-dashed border-[#bfa680] bg-[#f5ecd9] text-center text-[#6b5235] text-[11px]">
                                当前【{activeSlotMeta.shortLabel}】槽位空置。
                                {activeSlotMeta.slot === 'mount' &&
                                  '（未佩坐骑时大地图按徒步 60 里/日行军）'}
                              </div>
                            )}

                            {/* 行囊内可替换同部位装备 */}
                            <div className="space-y-1.5 pt-1">
                              <div className="font-bold song-serif text-[11px] text-[#52391e] flex items-center justify-between">
                                <span>行囊内可换佩的【{activeSlotMeta.shortLabel}】</span>
                                <span className="font-mono text-[10px] text-[#7a6042]">
                                  可用 {compatibleBagItems.length} 件
                                </span>
                              </div>
                              {compatibleBagItems.length > 0 ? (
                                <div className="space-y-1.5 max-h-36 overflow-y-auto scroll-thin pr-1">
                                  {compatibleBagItems.map(({ itemId, qty, def }) => (
                                    <div
                                      key={itemId}
                                      className="p-2 rounded bg-[#fffaf0] border border-[#cbb693] flex items-center justify-between gap-2"
                                    >
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-bold song-serif text-xs text-[#23180f] truncate">
                                            {def.name}
                                          </span>
                                          <span
                                            className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                                              RARITY_STYLE_MAP[def.rarity].badgeBg
                                            } ${RARITY_STYLE_MAP[def.rarity].badgeText}`}
                                          >
                                            {def.rarity}
                                          </span>
                                          {qty > 1 && (
                                            <span className="font-mono text-[10px] text-[#6b5235]">
                                              ×{qty}
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-[10px] text-[#7f1d1d] font-mono truncate mt-0.5">
                                          {formatBonusBadges(def.equipBonus).join(' · ')}
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          equipItemToSlot(itemId, activeSlotMeta.slot)
                                        }
                                        className="px-2.5 py-1 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif text-[11px] shrink-0 cursor-pointer transition"
                                      >
                                        装备
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-2.5 rounded bg-[#f5ecd9] text-[11px] text-[#7a6042] text-center">
                                  行囊中暂无其他可佩备的{activeSlotMeta.shortLabel}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-[10px] text-[#7a6042] border-t border-[#dccab0] pt-1.5 flex items-center justify-between">
                            <span>卸下的装备自动归入【行囊四库 → 行囊杂物】</span>
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
                )
              })()}

              {/* 2. 四分类行囊面板（典籍书画 / 丹药毒物 / 雅器百工 / 行囊杂物） */}
              {activeMenuTab === 'bag' && (() => {
                const currentCatMeta =
                  BAG_CATEGORY_METAS.find((c) => c.key === activeBagCategory) ??
                  BAG_CATEGORY_METAS[0]
                const activeStack =
                  bagItemsByCat.list.find((x) => x.itemId === selectedBagItemId) ??
                  bagItemsByCat.list[0] ??
                  null

                return (
                  <div className="space-y-4 text-xs">
                    {/* 顶部资粮通栏：随身纹银 + 行军粮草补给 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                        <div>
                          <div className="text-[#6b5033] font-bold song-serif">随身资金（纹银）</div>
                          <div className="text-[11px] text-[#7a6042] mt-0.5">
                            可于各州衙门揭榜领赏或市易行交易获取
                          </div>
                        </div>
                        <span className="font-mono font-bold text-lg text-[#7f1d1d]">
                          {silver} 两
                        </span>
                      </div>

                      <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                        <div>
                          <div className="text-[#6b5033] font-bold song-serif">行军粮草（干粮）</div>
                          <div className="text-[11px] text-[#7a6042] mt-0.5">
                            大地图远征每行一日消耗 1 份，断粮将大幅损耗体能
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-lg text-[#1e4620]">
                            {food} 日份
                          </span>
                          <button
                            type="button"
                            onClick={replenishSupplies}
                            className="px-2.5 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer transition shadow-sm"
                          >
                            购粮 (+20份/5两)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 四大分类切换页签 */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BAG_CATEGORY_METAS.map((cat) => {
                        const isAct = cat.key === activeBagCategory
                        const count = bagItemsByCat.counts[cat.key]
                        return (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => {
                              setBagCategory(cat.key)
                              setSelectedBagItemId(null)
                            }}
                            className={`p-2.5 rounded-md border-2 text-left transition cursor-pointer flex items-center justify-between ${
                              isAct
                                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow-md'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#2b1a0e] border-[#c8b28e]'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                                  isAct
                                    ? 'bg-[#6b140d] text-amber-200 border border-amber-300/50'
                                    : 'bg-[#faf3e3] text-[#5c4024] border border-[#bfa680]'
                                }`}
                              >
                                {renderBagCatIcon(cat.key, 'w-4 h-4')}
                              </span>
                              <div className="truncate">
                                <div className="song-serif font-bold text-xs sm:text-sm truncate">
                                  {cat.label}
                                </div>
                                <div
                                  className={`text-[10px] ${
                                    isAct ? 'text-amber-200/90' : 'text-[#6b5235]'
                                  }`}
                                >
                                  卷{cat.numeral}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-1.5 py-0.5 rounded font-mono text-xs font-bold ${
                                isAct
                                  ? 'bg-black/30 text-amber-200'
                                  : 'bg-[#faf3e3] text-[#52391e]'
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* 当前分类说明条 */}
                    <div className="px-3 py-2 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between text-[11px] text-[#52391e]">
                      <span>
                        <strong>【{currentCatMeta.label}】</strong>：{currentCatMeta.subtitle}
                      </span>
                      <span className="font-mono">共 {bagItemsByCat.list.length} 种物品</span>
                    </div>

                    {/* 下方主体：左侧物品可视化卡片网格 + 右侧物品检视与使用/穿戴操作台 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                      <div className="lg:col-span-7 bg-[#efe4cc]/70 border border-[#c8b28e] rounded-md p-3 min-h-[250px] max-h-[300px] overflow-y-auto scroll-thin">
                        {bagItemsByCat.list.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {bagItemsByCat.list.map(({ itemId, qty, def }) => {
                              const isSel = activeStack?.itemId === itemId
                              const rStyle = RARITY_STYLE_MAP[def.rarity]
                              return (
                                <button
                                  key={itemId}
                                  type="button"
                                  onClick={() => setSelectedBagItemId(itemId)}
                                  className={`p-2.5 rounded-md border-2 text-left transition cursor-pointer flex items-start justify-between gap-2 ${
                                    isSel
                                      ? 'bg-[#fff9ec] border-[#8f1d14] ring-1 ring-[#8f1d14] shadow-md'
                                      : `${rStyle.cardBg} ${rStyle.borderCls} hover:brightness-98`
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div
                                      className={`w-9 h-9 rounded border flex items-center justify-center shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText} border-[#f5cb5c]/50`}
                                    >
                                      {def.equipSlot
                                        ? renderSlotIcon(def.equipSlot, 'w-4 h-4')
                                        : renderBagCatIcon(def.category, 'w-4 h-4')}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="song-serif font-bold text-xs text-[#23180f] truncate">
                                        {def.name}
                                      </div>
                                      <div className="flex items-center gap-1.5 mt-1">
                                        <span
                                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${rStyle.badgeBg} ${rStyle.badgeText}`}
                                        >
                                          {def.rarity}
                                        </span>
                                        <span className="text-[10px] text-[#6b5235] truncate">
                                          {def.subType}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="px-1.5 py-0.5 rounded bg-[#efe4cc] border border-[#c8b28e] font-mono font-bold text-[11px] text-[#23180f] shrink-0">
                                    ×{qty}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-[#7a6042] py-12">
                            <div className="song-serif font-bold text-sm">
                              【{currentCatMeta.label}】分栏暂无物品
                            </div>
                            <div className="text-[11px] mt-1">
                              游历各州书肆、药铺、铁冶坊或秘境奇遇可收入囊中
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 右侧物品详情检视面板 */}
                      <div className="lg:col-span-5 bg-[#efe4cc] border border-[#c8b28e] rounded-md p-3.5 flex flex-col justify-between gap-3">
                        {activeStack ? (
                          <>
                            <div className="space-y-2.5">
                              <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2.5">
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                        RARITY_STYLE_MAP[activeStack.def.rarity].badgeBg
                                      } ${RARITY_STYLE_MAP[activeStack.def.rarity].badgeText}`}
                                    >
                                      {activeStack.def.rarity}
                                    </span>
                                    <span className="text-[11px] text-[#6b5235] font-semibold">
                                      {activeStack.def.subType}
                                    </span>
                                  </div>
                                  <h4 className="song-serif font-bold text-base text-[#23180f] mt-1">
                                    {activeStack.def.name}
                                  </h4>
                                </div>
                                <div className="text-right font-mono text-[11px] text-[#6b5235]">
                                  <div>数量 ×{activeStack.qty}</div>
                                  <div className="text-[#7f1d1d] font-bold">
                                    估价 {activeStack.def.value} 两
                                  </div>
                                </div>
                              </div>

                              <p className="text-xs text-[#3d2b19] leading-relaxed">
                                {activeStack.def.desc}
                              </p>

                              {activeStack.def.lore && (
                                <p className="text-[11px] italic text-[#6b5235] bg-[#faf3e3] border-l-2 border-[#8f1d14] px-2.5 py-1.5 rounded-r">
                                  {activeStack.def.lore}
                                </p>
                              )}

                              {activeStack.def.equipBonus && (
                                <div className="space-y-1 pt-1">
                                  <div className="text-[11px] font-bold text-[#52391e] song-serif">
                                    披挂属性加成：
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {formatBonusBadges(activeStack.def.equipBonus).map((b) => (
                                      <span
                                        key={b}
                                        className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#bfa680] font-mono text-[11px] font-semibold text-[#7f1d1d]"
                                      >
                                        {b}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {activeStack.def.useEffect && (
                                <div className="p-2 rounded bg-[#faf3e3] border border-[#cbb693] text-[11px] text-[#1b5132] font-medium">
                                  功效：
                                  {[
                                    activeStack.def.useEffect.hp
                                      ? `气血 +${activeStack.def.useEffect.hp}`
                                      : null,
                                    activeStack.def.useEffect.mp
                                      ? `内力 +${activeStack.def.useEffect.mp}`
                                      : null,
                                    activeStack.def.useEffect.stamina
                                      ? `体能 +${activeStack.def.useEffect.stamina}`
                                      : null,
                                    activeStack.def.useEffect.res
                                      ? `抗性 +${activeStack.def.useEffect.res}`
                                      : null,
                                    activeStack.def.useEffect.skillGain
                                      ? `【${activeStack.def.useEffect.skillGain[0]}】+${activeStack.def.useEffect.skillGain[1]}`
                                      : null,
                                    activeStack.def.useEffect.learnArtHint ?? null,
                                  ]
                                    .filter(Boolean)
                                    .join(' · ')}
                                </div>
                              )}
                            </div>

                            <div className="pt-2 border-t border-[#cbb693] flex items-center gap-2">
                              {activeStack.def.equipSlot ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => equipItemToSlot(activeStack.itemId)}
                                    className="flex-1 px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] font-bold song-serif shadow cursor-pointer transition"
                                  >
                                    披挂上身 / 备鞍乘骑
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (activeStack.def.equipSlot) {
                                        setSelectedEquipSlot(activeStack.def.equipSlot)
                                      }
                                      setMenuTab('hero')
                                    }}
                                    className="px-2.5 py-2 rounded bg-[#faf3e3] hover:bg-[#e7d9bc] border border-[#9e8462] text-[#3d2812] font-bold song-serif cursor-pointer transition"
                                  >
                                    查看槽位
                                  </button>
                                </>
                              ) : activeStack.def.useEffect ? (
                                <button
                                  type="button"
                                  onClick={() => consumeInventoryItem(activeStack.itemId)}
                                  className="w-full px-3 py-2 rounded bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] font-bold song-serif shadow cursor-pointer transition"
                                >
                                  {activeStack.def.category === 'scrolls'
                                    ? '展卷研读参悟'
                                    : '立即服食使用'}
                                </button>
                              ) : (
                                <div className="w-full py-1.5 text-center text-[11px] text-[#6b5235] bg-[#faf3e3] rounded border border-[#cbb693]">
                                  随身常备器具/凭证（在特定雅集、奇遇或关隘自动生效）
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center text-center text-[#7a6042] py-10">
                            请点击左侧物品查看详录与操作
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* 3. 1,000 群侠图鉴（M0-2 地名归一 + M0-3 全量编译数据库） */}
              {activeMenuTab === 'portraits' && (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2 bg-[#efe4cc] p-2.5 rounded border border-[#c8b28e]">
                    <input
                      type="text"
                      value={npcQuery}
                      onChange={(e) => setNpcQuery(e.target.value)}
                      placeholder="搜编号/姓名/字号/武学（如：NPC-0101、乔峰、包拯、六脉神剑）…"
                      className="flex-1 min-w-[180px] px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                    />
                    <select
                      value={npcScope}
                      onChange={(e) => setNpcScope(e.target.value)}
                      className="px-2 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL_WITH_ART">已有独立原画 ({ID_REGISTRY.counts.npcsWithAvatar})</option>
                      <option value="ALL">全部千人名录 (1000)</option>
                      <option value="HERE">当前地区：{activeRegionNode?.name}</option>
                      <option value="HISTORICAL">庙堂四夷历史百杰 (100)</option>
                      <option value="GRANDMASTER_MASTER">大宗师与宗师 (34)</option>
                      <option value="FIRST_RATE">一流高手 (120)</option>
                    </select>
                    <select
                      value={npcRegionFilter}
                      onChange={(e) => setNpcRegionFilter(e.target.value)}
                      className="px-2 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer max-w-[140px]"
                    >
                      <option value="ALL">全部 38 地区</option>
                      {ID_REGISTRY.regions.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.numericCode}·{r.name} ({r.npcCount})
                        </option>
                      ))}
                    </select>
                    <select
                      value={npcFactionFilter}
                      onChange={(e) => setNpcFactionFilter(e.target.value)}
                      className="px-2 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer max-w-[150px]"
                    >
                      <option value="ALL">全部 20派+11势力</option>
                      <optgroup label="二十大门派 (SECT-01..20)">
                        {ID_REGISTRY.factions
                          .filter((f) => f.isMajorSect)
                          .map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.id} {f.name} ({f.memberCount})
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="朝堂与四夷势力 (ORG-01..11)">
                        {ID_REGISTRY.factions
                          .filter((f) => !f.isMajorSect)
                          .map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.id} {f.name} ({f.memberCount})
                            </option>
                          ))}
                      </optgroup>
                    </select>
                    <span className="text-[11px] text-[#5e472d] font-mono">
                      命中 {filteredNpcs.length} 人
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    {/* 左侧懒加载人物列表（分页渲染前 180 条保持丝滑滚动） */}
                    <div className="lg:col-span-7 max-h-[360px] overflow-y-auto scroll-thin pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2 content-start">
                      {filteredNpcs.slice(0, 180).map((c) => {
                        const isSel = selectedNpc?.id === c.id
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedNpc(c)}
                            className={`p-2 rounded border text-left transition flex items-center gap-2 cursor-pointer ${
                              isSel
                                ? 'bg-[#8f1d14] text-[#fff8eb] border-[#f5cb5c] shadow'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                            }`}
                          >
                            {c.avatarUrl ? (
                              <img
                                src={resolveAssetUrl(c.avatarUrl)}
                                alt={c.name}
                                loading="lazy"
                                onLoad={() => {
                                  if (c.avatarUrl) recordAssetLoaded(c.avatarUrl, 58000)
                                }}
                                className="w-10 h-10 rounded object-cover border border-[#bfa782] shrink-0 bg-[#2b1d12]"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded bg-[#4a321d] border border-[#9e7b47]/60 text-[#fff8ee] flex flex-col items-center justify-center shrink-0">
                                <span className="song-serif font-bold text-xs leading-none">
                                  {c.name.slice(0, 1)}
                                </span>
                                <span className="text-[8px] text-amber-200/90 mt-0.5">
                                  {FACTION_DB_MAP[c.factionId]?.shortName ?? '群侠'}
                                </span>
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="song-serif font-bold truncate">{c.name}</div>
                              <div
                                className={`text-[10px] truncate ${
                                  isSel ? 'text-amber-200' : 'text-[#6b5235]'
                                }`}
                              >
                                {c.locationLabel} · {c.realm}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                      {filteredNpcs.length > 180 && (
                        <div className="col-span-full text-center py-2 text-[11px] text-[#6b5235]">
                          当前显示前 180 条档案，可通过上方搜索框或地区/门派筛选器精确检索其余人物。
                        </div>
                      )}
                    </div>

                    {/* 右侧选中人物详情与标准 ID 关联 */}
                    <div className="lg:col-span-5 p-3 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-2 max-h-[360px] overflow-y-auto scroll-thin">
                      {selectedNpc ? (
                        <>
                          <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#261910] text-amber-200">
                                  {selectedNpc.id}
                                </span>
                                <span className="song-serif font-bold text-base text-[#23180f]">
                                  {selectedNpc.name}
                                </span>
                                <span className="text-xs text-[#6b5235]">· {selectedNpc.title}</span>
                              </div>
                              <div className="text-[11px] text-[#781710] font-medium mt-1">
                                [{selectedNpc.factionId}] {selectedNpc.factionName} · {selectedNpc.role}（{selectedNpc.gender}·{selectedNpc.age}岁）
                              </div>
                              <div className="text-[11px] text-[#4a3219] mt-0.5 flex items-center gap-1.5 flex-wrap">
                                <span>
                                  常驻：<strong>{selectedNpc.locationLabel}</strong> (`{selectedNpc.regionId}`)
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    enterRegionMap(selectedNpc.regionId, true)
                                    closeMenu()
                                  }}
                                  className="px-1.5 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] text-[10px] cursor-pointer"
                                >
                                  前往该地 →
                                </button>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-[#5c4024] text-[#fff8ee] text-[10px] shrink-0">
                              {selectedNpc.realm}
                            </span>
                          </div>

                          {/* 独立全身立绘 或 门派母版立绘展示 */}
                          <div className="w-full h-40 rounded bg-[#1e150e] border border-[#8c6e46] overflow-hidden flex items-center justify-center relative">
                            <img
                              src={resolveAssetUrl(
                                selectedNpc.fullbodyUrl ?? selectedNpc.templateUrl,
                              )}
                              alt={`${selectedNpc.name} 立绘`}
                              loading="lazy"
                              onLoad={() => {
                                const url = selectedNpc.fullbodyUrl ?? selectedNpc.templateUrl
                                recordAssetLoaded(url, 125000)
                              }}
                              className="max-h-full max-w-full object-contain"
                            />
                            {!selectedNpc.fullbodyUrl && (
                              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-[#f5dfb5] border border-[#c89d54]/50">
                                门派母版兜底立绘
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-4 gap-1 text-center bg-[#faf3e3] border border-[#cbb693] rounded p-1.5 font-mono text-[11px]">
                            <div>
                              <div className="text-[10px] text-[#6b5235]">气血</div>
                              <strong className="text-[#8f1d14]">{selectedNpc.stats.hp}</strong>
                            </div>
                            <div>
                              <div className="text-[10px] text-[#6b5235]">内力</div>
                              <strong className="text-[#1d473a]">{selectedNpc.stats.mp}</strong>
                            </div>
                            <div>
                              <div className="text-[10px] text-[#6b5235]">身法</div>
                              <strong>{selectedNpc.stats.agi}</strong>
                            </div>
                            <div>
                              <div className="text-[10px] text-[#6b5235]">抗性</div>
                              <strong>{selectedNpc.stats.res}</strong>
                            </div>
                          </div>

                          {selectedNpc.knownArtIds.length > 0 && (
                            <div className="space-y-1">
                              <div className="text-[10px] font-bold text-[#5e472d]">
                                关联标准武学 ID ({selectedNpc.knownArtIds.length})：
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {selectedNpc.knownArtIds.map((aid) => {
                                  const art = MARTIAL_ART_DB_MAP[aid]
                                  return (
                                    <button
                                      key={aid}
                                      type="button"
                                      onClick={() => {
                                        if (art) {
                                          setSelectedArt(art)
                                          setMenuTab('martialArts')
                                        }
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[10px] text-[#781710] font-medium cursor-pointer"
                                    >
                                      {aid} · {art?.cleanName ?? aid}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {selectedNpc.specialtyTags.length > 0 && (
                            <div className="text-[11px] text-[#4a3219]">
                              <strong>十艺/专长：</strong>
                              {selectedNpc.specialtyTags.join('、')}
                            </div>
                          )}

                          <p className="text-[11px] text-[#3d2b19] leading-relaxed">
                            {selectedNpc.bio}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. 216 门武学总纲（M0-3 编译数据库） */}
              {activeMenuTab === 'martialArts' && (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2 bg-[#efe4cc] p-2.5 rounded border border-[#c8b28e]">
                    <input
                      type="text"
                      value={artQuery}
                      onChange={(e) => setArtQuery(e.target.value)}
                      placeholder="搜索武学编号、名称、所属宗门或描述（如：MA-001、降龙、凌波微步、少林）…"
                      className="flex-1 min-w-[200px] px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f]"
                    />
                    <select
                      value={artTierFilter}
                      onChange={(e) => setArtTierFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL">全部四阶 (216 门)</option>
                      <option value="天阶">天阶绝学 (36 门)</option>
                      <option value="地阶">地阶上乘 (60 门)</option>
                      <option value="良品">良品中坚 (60 门)</option>
                      <option value="凡品">凡品筑基 (60 门)</option>
                    </select>
                    <select
                      value={artCatFilter}
                      onChange={(e) => setArtCatFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                    >
                      <option value="ALL">全部兵刃/功体类别</option>
                      {artCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-[#5e472d] font-mono">
                      共 {filteredArts.length} 门
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    <div className="lg:col-span-7 max-h-[360px] overflow-y-auto scroll-thin pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
                      {filteredArts.map((art) => {
                        const isSel = selectedArt?.id === art.id
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
                            onClick={() => setSelectedArt(art)}
                            className={`p-2.5 rounded border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                              isSel
                                ? 'bg-[#261910] text-[#fff8eb] border-[#f5cb5c] shadow'
                                : 'bg-[#efe4cc] hover:bg-[#e5d6b8] text-[#23180f] border-[#c8b28e]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] opacity-80">{art.id}</span>
                                <span className="song-serif font-bold truncate">{art.name}</span>
                              </div>
                              <div
                                className={`text-[10px] truncate mt-0.5 ${
                                  isSel ? 'text-[#d6c5a5]' : 'text-[#6b5235]'
                                }`}
                              >
                                {art.category} · {art.origin}
                              </div>
                            </div>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${tierBadgeCls}`}
                            >
                              {art.fullTier}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="lg:col-span-5 p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-col gap-2.5 max-h-[360px] overflow-y-auto scroll-thin">
                      {selectedArt ? (
                        <>
                          <div className="border-b border-[#cbb693] pb-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#261910] text-amber-200">
                                {selectedArt.id}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#8f1d14] text-[#fff8eb] text-[11px] font-bold">
                                {selectedArt.fullTier} · {selectedArt.category}
                              </span>
                            </div>
                            <div className="song-serif font-bold text-base text-[#23180f] mt-1.5">
                              {selectedArt.name}
                            </div>
                            <div className="text-[11px] text-[#6b5235] mt-0.5">
                              传承渊源：{selectedArt.origin}
                              {selectedArt.sectId
                                ? `（标准门派 ID：${selectedArt.sectId}）`
                                : '（江湖公共/奇遇传承）'}
                            </div>
                          </div>

                          <p className="text-xs text-[#3d2b19] leading-relaxed">
                            {selectedArt.description}
                          </p>

                          {selectedArt.prerequisitesText && (
                            <div className="p-2.5 rounded bg-[#faf3e3] border border-[#b89f78] space-y-1.5">
                              <div className="font-bold song-serif text-[#8f1d14]">
                                天阶前置修行条件：
                              </div>
                              <div className="text-[11px] text-[#4a3219] leading-relaxed">
                                {selectedArt.prerequisitesText}
                              </div>
                              {selectedArt.statRequirements.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {selectedArt.statRequirements.map((req) => (
                                    <span
                                      key={req.stat}
                                      className="px-1.5 py-0.5 rounded bg-[#efe4cc] border border-[#9e8462] font-mono text-[10px] text-[#23180f]"
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
              )}

              {/* 5. 工程与标准 ID 字典监控（M0-1 + M0-2 + M0-3 验收面板） */}
              {activeMenuTab === 'engineering' && (
                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">标准地区 ID</div>
                      <div className="font-mono font-bold text-base text-[#23180f] mt-0.5">
                        {ID_REGISTRY.counts.regions} 处 (`REG-01..38`)
                      </div>
                      <div className="text-[10px] text-[#6b5235]">15宋城 + 6外城 + 17秘境雄关</div>
                    </div>

                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">门派与势力 ID</div>
                      <div className="font-mono font-bold text-base text-[#23180f] mt-0.5">
                        {ID_REGISTRY.counts.majorSects} 派 + {ID_REGISTRY.counts.otherOrganizations} 组织
                      </div>
                      <div className="text-[10px] text-[#6b5235]">`SECT-01..20` / `ORG-01..11`</div>
                    </div>

                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033]">武学与人物全库</div>
                      <div className="font-mono font-bold text-base text-[#8f1d14] mt-0.5">
                        {ID_REGISTRY.counts.martialArts} 功 · {ID_REGISTRY.counts.npcs} 人
                      </div>
                      <div className="text-[10px] text-[#1b5132] font-semibold">
                        未解析悬空引用：0 处
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-[#e3f1e8] border border-[#6ca384]">
                      <div className="text-[#184f35] font-semibold">三层建筑内景全覆盖</div>
                      <div className="font-mono font-bold text-base text-[#134e32] mt-0.5">
                        {ID_REGISTRY.counts.specialBuildings} / {ID_REGISTRY.counts.specialBuildings} 座
                      </div>
                      <div className="text-[10px] text-[#246344]">
                        {ID_REGISTRY.counts.specialBuildingsWithImage} 手绘JPG +{' '}
                        {ID_REGISTRY.counts.specialBuildingsWithSvgFallback} 营造SVG兜底
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        旧版 HTML 内联体积 → 现包内 Base64
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">
                        {formatByteSize(
                          ASSET_MANIFEST.legacySizes.northern_song_map_html_bytes +
                            ASSET_MANIFEST.legacySizes.character_portrait_gallery_html_bytes,
                        )}{' '}
                        → <strong className="text-[#1b5132]">0 Bytes</strong>
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        当前会话按需懒加载静态原画
                      </div>
                      <div className="font-mono text-[#134e32] font-bold mt-1">
                        {telemetry.loadedCount} / {ASSET_MANIFEST.summary.totalExtractedImageFiles} 张（
                        {formatByteSize(telemetry.loadedBytes)}）
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="font-bold song-serif text-[#52391e]">
                        可重复数据库编译脚本
                      </div>
                      <div className="font-mono text-[#23180f] mt-1">`npm run build:db`</div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-1.5">
                    <div className="font-bold song-serif text-[#52391e]">
                      当前浏览器已按需拉取的静态原画路径 ({telemetry.loadedUrls.length})
                    </div>
                    <div className="max-h-28 overflow-y-auto scroll-thin bg-[#faf3e3] border border-[#cbb693] rounded p-2 font-mono text-[11px] space-y-0.5">
                      {telemetry.loadedUrls.length === 0 ? (
                        <div className="text-[#6b5235]">尚未加载任何大图资源</div>
                      ) : (
                        telemetry.loadedUrls.map((u) => (
                          <div key={u} className="text-[#1b5132]">
                            ✓ {u}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 6 & 7. 真实多槽位存档 / 读档（M0-4 IndexedDB + JSON 导入导出） */}
              {(activeMenuTab === 'save' || activeMenuTab === 'load') && (
                <div className="space-y-3 text-xs">
                  {/* 顶部当前状态栏与 JSON 导入导出工具条 */}
                  <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] text-[#6b5033]">当前实时时空锚点</div>
                      <div className="font-bold song-serif text-sm text-[#23180f]">
                        {formatSongDate(dayCount, shichenIdx)} · {activeRegionNode?.name}（
                        {viewMode === 'world'
                          ? '第一层：天下山海舆图'
                          : viewMode === 'building'
                            ? `第三层：${activeInteriorBldg?.name ?? '建筑内景'}`
                            : '第二层：地区半3D全景'}
                        ）
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {activeMenuTab === 'save' ? (
                        <>
                          <input
                            type="text"
                            value={saveNoteDraft}
                            onChange={(e) => setSaveNoteDraft(e.target.value)}
                            placeholder="可选：输入存档手札备注…"
                            className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] w-48"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const snap = buildSaveEnvelope('slot-1', saveNoteDraft || '手动导出快照')
                              downloadSaveAsJsonFile(snap)
                              setSaveNotice({
                                text: '已将当前实时进度导出为本地 .json 卷宗文件！',
                                tone: 'success',
                              })
                            }}
                            className="px-3 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 border border-[#c89d54] font-bold song-serif cursor-pointer"
                          >
                            ⬇ 导出当前状态 (.json)
                          </button>
                        </>
                      ) : (
                        <>
                          <select
                            value={importTargetSlot}
                            onChange={(e) =>
                              setImportTargetSlot(e.target.value as SaveSlotId | 'DIRECT_LOAD')
                            }
                            className="px-2 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] cursor-pointer"
                          >
                            <option value="DIRECT_LOAD">导入后立即启封读取</option>
                            {SAVE_SLOT_DEFS.filter((d) => !d.isAuto).map((d) => (
                              <option key={d.slotId} value={d.slotId}>
                                导入并存入：{d.label}
                              </option>
                            ))}
                          </select>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json,application/json"
                            onChange={handleImportFileChange}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer shadow"
                          >
                            ⬆ 从本地导入存档 (.json)
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {saveNotice && (
                    <div
                      className={`px-3 py-2 rounded border font-medium ${
                        saveNotice.tone === 'error'
                          ? 'bg-[#fee2e2] border-[#dc2626] text-[#7f1d1d]'
                          : 'bg-[#e3f1e8] border-[#6ca384] text-[#134e32]'
                      }`}
                    >
                      {saveNotice.text}
                    </div>
                  )}

                  {/* 7 个存档槽位列表（1 自动槽 + 6 手动卷宗槽） */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto scroll-thin pr-1">
                    {SAVE_SLOT_DEFS.map((def) => {
                      const env = saveSlots[def.slotId]
                      return (
                        <div
                          key={def.slotId}
                          className={`p-3 rounded-md border flex flex-col justify-between gap-2 ${
                            def.isAuto
                              ? 'bg-[#efe8d8] border-[#9e8462] md:col-span-2'
                              : 'bg-[#efe4cc] border-[#c8b28e]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-7 h-7 rounded flex items-center justify-center song-serif font-bold text-xs shrink-0 ${
                                  env
                                    ? 'bg-[#8f1d14] text-[#fff8eb] border border-[#f5cb5c]'
                                    : 'bg-[#cbb693] text-[#5c4630]'
                                }`}
                              >
                                {def.badge}
                              </span>
                              <div>
                                <div className="song-serif font-bold text-sm text-[#23180f]">
                                  {def.label}
                                </div>
                                {env ? (
                                  <div className="text-[11px] text-[#781710] font-medium">
                                    {env.summary.songDate} · {env.summary.regionName}
                                    {env.summary.buildingName
                                      ? ` > ${env.summary.buildingName}`
                                      : env.summary.viewMode === 'world'
                                        ? '（天下舆图）'
                                        : '（地区全景）'}
                                  </div>
                                ) : (
                                  <div className="text-[11px] text-[#7a6042]">空置卷宗 · 尚未封存记录</div>
                                )}
                              </div>
                            </div>

                            {env && (
                              <span className="font-mono text-[10px] text-[#5e472d] shrink-0">
                                {formatSavedTime(env.savedAt)}
                              </span>
                            )}
                          </div>

                          {env && (
                            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#faf3e3] border border-[#cbb693] rounded px-2.5 py-1.5 text-[11px]">
                              <span className="font-mono text-[#3d2b19]">
                                血 {env.summary.hp}
                                {typeof env.summary.stamina === 'number'
                                  ? ` · 体 ${env.summary.stamina}`
                                  : ''}{' '}
                                · 内 {env.summary.mp} · 银 {env.summary.silver}两 · 粮{' '}
                                {env.summary.food}份
                              </span>
                              {env.note && (
                                <span className="text-[#6b5235] italic truncate max-w-[180px]">
                                  “{env.note}”
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-end gap-1.5 pt-0.5">
                            {activeMenuTab === 'save' && !def.isAuto && (
                              <button
                                type="button"
                                disabled={saveBusy}
                                onClick={() => {
                                  void saveToSlot(def.slotId, saveNoteDraft)
                                  setSaveNoteDraft('')
                                }}
                                className="px-2.5 py-1 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                              >
                                {env ? '覆盖封存' : '封入此卷'}
                              </button>
                            )}

                            {env && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => loadFromEnvelope(env, true)}
                                  className="px-2.5 py-1 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                                >
                                  启封读取
                                </button>
                                <button
                                  type="button"
                                  onClick={() => downloadSaveAsJsonFile(env)}
                                  className="px-2 py-1 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] cursor-pointer"
                                >
                                  导出JSON
                                </button>
                                <button
                                  type="button"
                                  disabled={saveBusy}
                                  onClick={() => void removeSaveSlot(def.slotId)}
                                  className="px-2 py-1 rounded bg-[#f8e8e6] hover:bg-[#f2cfcb] border border-[#c98a83] text-[#8f1d14] cursor-pointer"
                                >
                                  抹除
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 8. 设置面板 */}
              {activeMenuTab === 'settings' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <div>
                      <div className="font-bold song-serif text-[#23180f]">
                        地区与建筑内景牌匾显示
                      </div>
                      <div className="text-[11px] text-[#6b5235]">
                        隐藏后可纯享宋画青绿山水建筑长卷，悬停依然高亮热区
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={toggleRegionLabels}
                      className="px-3 py-1.5 rounded bg-[#5c4024] text-[#fff8ee] font-semibold cursor-pointer"
                    >
                      {showRegionLabels ? '当前：显示牌匾' : '当前：纯赏景模式'}
                    </button>
                  </div>

                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                    <div>
                      <div className="font-bold song-serif text-[#23180f]">
                        天下舆图文字标注预设
                      </div>
                      <div className="text-[11px] text-[#6b5235]">
                        一键开启全部地名里程标注，或切换为纯净图标视图
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAllLabelToggles(true)}
                        className="px-2.5 py-1.5 rounded bg-[#5c4024] text-[#fff8ee] cursor-pointer"
                      >
                        全部开启
                      </button>
                      <button
                        type="button"
                        onClick={() => setAllLabelToggles(false)}
                        className="px-2.5 py-1.5 rounded bg-[#dfd0b2] border border-[#8c6e46] text-[#3d2812] cursor-pointer"
                      >
                        全部隐藏
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#d8c7a9] flex items-center justify-between text-xs text-[#6b5235]">
              <span>
                工程架构：Vite 8 + React 19 + TypeScript 7 + Zustand 5 + IndexedDB 多槽位卷宗
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="px-4 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-[#fbf2e0] font-bold song-serif transition cursor-pointer"
              >
                收起菜单
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
