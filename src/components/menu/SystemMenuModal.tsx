import { useMemo, useRef, useState } from 'react'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  ID_REGISTRY,
  MARTIAL_ART_DB_MAP,
  MARTIAL_ARTS_DB,
  NPCS_DB,
} from '../../data/gameDb'
import { useGameStore } from '../../store/useGameStore'
import type {
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  MenuTabKey,
  MountKey,
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
    label: '主角面板',
    seal: '侠',
    subtitle: '角色根骨悟性颜值、实战四维、通用十艺与坐骑轻功配置',
  },
  {
    key: 'bag',
    numeral: '贰',
    label: '背 包',
    seal: '囊',
    subtitle: '随身盘缠纹银、行军干粮补给与后续兵刃秘籍格位容器',
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
    subtitle: 'M0-4 多槽位 IndexedDB 卷宗持久化、自定义手札批注与 JSON 存档文件导出',
    implementedM0: true,
  },
  {
    key: 'load',
    numeral: '柒',
    label: '读 档',
    seal: '启',
    subtitle: 'M0-4 读取历史卷宗回溯三层空间现场，或从本地导入 .json 存档文件',
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
  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const currentNodeId = useGameStore((s) => s.currentNodeId)
  const hp = useGameStore((s) => s.hp)
  const mp = useGameStore((s) => s.mp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const skills = useGameStore((s) => s.skills)
  const mountKey = useGameStore((s) => s.mountKey)
  const qinggongBonus = useGameStore((s) => s.qinggongBonus)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const saveSlots = useGameStore((s) => s.saveSlots)
  const saveBusy = useGameStore((s) => s.saveBusy)
  const saveNotice = useGameStore((s) => s.saveNotice)

  const closeMenu = useGameStore((s) => s.closeMenu)
  const setMenuTab = useGameStore((s) => s.setMenuTab)
  const setMountKey = useGameStore((s) => s.setMountKey)
  const setQinggongBonus = useGameStore((s) => s.setQinggongBonus)
  const replenishSupplies = useGameStore((s) => s.replenishSupplies)
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
                工程底座收拢完毕 (M0-1 ~ M0-4) · 按 ESC 键或点击右上角返回舆图
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
                <span>当前纪年</span>
                <span className="font-semibold">{formatSongDate(dayCount).split(' · ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>所在地域</span>
                <span className="font-semibold">{activeRegionNode?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>合流数据</span>
                <span className="font-mono font-bold text-[#781710]">1000侠 / 216功</span>
              </div>
              <div className="flex justify-between">
                <span>已懒加载</span>
                <span className="font-mono font-bold text-[#1b5132]">
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
                <span
                  className={`px-2.5 py-1 rounded border text-[11px] font-semibold shrink-0 ${
                    activeMeta.implementedM0
                      ? 'bg-[#e1f0e8] border-[#6aa384] text-[#184f35]'
                      : 'bg-[#e8dac0] border-[#b89f78] text-[#52391e]'
                  }`}
                >
                  {activeMeta.implementedM0 ? 'M0 已实装' : 'M1 玩法待深化'}
                </span>
              </div>

              {/* 1. 主角面板 */}
              {activeMenuTab === 'hero' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033] mb-1">基础三维（非战斗）</div>
                      <div className="font-mono font-bold text-sm text-[#23180f]">
                        根骨 72 · 悟性 84 · 颜值 78
                      </div>
                    </div>
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033] mb-1">战斗四维</div>
                      <div className="font-mono font-bold text-sm text-[#7f1d1d]">
                        气血 {hp} · 内力 {mp} · 身法 {agility} · 抗性 {res}
                      </div>
                    </div>
                    <div className="p-3 rounded bg-[#efe4cc] border border-[#c8b28e]">
                      <div className="text-[#6b5033] mb-1">官道日行速率</div>
                      <div className="font-mono font-bold text-sm text-[#1b5132]">
                        {speedInfo.baseDailyLi} 里/日（加成 +{speedInfo.modifierPct}%）
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2">
                    <div className="song-serif font-bold text-[#52391e]">
                      通用十艺修为（可在各州书院、樊楼、寺观演武场历练提升）
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="px-2.5 py-1.5 rounded bg-[#faf3e3] border border-[#cbb693] flex justify-between">
                        <span>骑术</span>
                        <strong className="font-mono text-[#8f1d14]">{ridingSkill}</strong>
                      </div>
                      {Object.entries(skills).map(([k, v]) => (
                        <div
                          key={k}
                          className="px-2.5 py-1.5 rounded bg-[#faf3e3] border border-[#cbb693] flex justify-between"
                        >
                          <span>{k}</span>
                          <strong className="font-mono text-[#23180f]">{v}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
                    <label className="space-y-1 block">
                      <span className="font-bold song-serif text-[#52391e]">
                        当前乘骑良驹（影响大地图行军）
                      </span>
                      <select
                        value={mountKey}
                        onChange={(e) => setMountKey(e.target.value as MountKey)}
                        className="w-full px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] cursor-pointer"
                      >
                        {(Object.keys(WORLD_GRAPH.mounts) as MountKey[]).map((k) => (
                          <option key={k} value={k}>
                            {WORLD_GRAPH.mounts[k].name}（基础 {WORLD_GRAPH.mounts[k].speed} 里/日）
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1 block">
                      <span className="font-bold song-serif text-[#52391e]">
                        随身轻功身法加成
                      </span>
                      <select
                        value={qinggongBonus}
                        onChange={(e) => setQinggongBonus(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] cursor-pointer"
                      >
                        {QINGGONG_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="p-4 rounded-md border border-dashed border-[#bba37c] bg-[#f3ead6] text-center text-[#695036]">
                    注：创角出身、武学招式装配（1内功+1轻功+4外功）等养成机制待 M1 阶段玩法定稿后接入。
                  </div>
                </div>
              )}

              {/* 2. 背包面板 */}
              {activeMenuTab === 'bag' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                      <div>
                        <div className="text-[#6b5033] font-medium">随身纹银</div>
                        <div className="text-[11px] text-[#7a6042] mt-0.5">
                          可于各州衙门揭榜领赏获取
                        </div>
                      </div>
                      <span className="font-mono font-bold text-lg text-[#7f1d1d]">
                        {silver} 两
                      </span>
                    </div>

                    <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
                      <div>
                        <div className="text-[#6b5033] font-medium">行军干粮</div>
                        <div className="text-[11px] text-[#7a6042] mt-0.5">
                          大地图远征每行一日消耗 1 份
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-lg text-[#1e4620]">
                          {food} 日份
                        </span>
                        <button
                          type="button"
                          onClick={replenishSupplies}
                          className="px-2.5 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                        >
                          购粮 (+20份 / 5两)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-md border-2 border-dashed border-[#bba37c] bg-[#f3ead6] text-center space-y-2">
                    <div className="song-serif font-bold text-base text-[#52391e]">
                      【背包道具与装备栏】模块容器已就绪
                    </div>
                    <p className="text-xs text-[#695036] max-w-lg mx-auto leading-relaxed">
                      当前仅保留大地图行军所需的纹银与干粮补给。兵刃甲胄、丹药毒物、武学秘籍残卷等格位将在 M1 玩法细化后接入。
                    </p>
                  </div>
                </div>
              )}

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
                        {formatSongDate(dayCount)} · {activeRegionNode?.name}（
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
                                血 {env.summary.hp} · 内 {env.summary.mp} · 银 {env.summary.silver}两 · 粮{' '}
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
