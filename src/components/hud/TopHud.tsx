import { useEffect, useMemo, useRef, useState } from 'react'
import { BUILDING_DB_MAP } from '../../data/gameDb'
import { useGameStore } from '../../store/useGameStore'
import type { LabelToggleKey } from '../../types/game'
import { ASSET_MANIFEST, formatByteSize, useAssetTelemetry } from '../../utils/assetLoader'
import { NODE_MAP, REGIONAL_CONFIGS, WORLD_GRAPH } from '../../utils/mapMath'

const LABEL_MENU_ITEMS: Array<{
  key: LabelToggleKey
  label: string
  swatchCls: string
  activePillCls: string
}> = [
  {
    key: 'cityLabels',
    label: '城市',
    swatchCls: 'bg-[#8f241e] border-[#3a1d12]',
    activePillCls: 'bg-[#5c4024] text-[#fff8ee]',
  },
  {
    key: 'sectPassLabels',
    label: '独立名山秘境与战略雄关',
    swatchCls: 'rounded-full bg-[#285948] border-[#143328]',
    activePillCls: 'bg-[#5c4024] text-[#fff8ee]',
  },
  {
    key: 'masters',
    label: '名侠踪迹',
    swatchCls: 'rounded-full bg-[#1d473a] border-[#0f2921]',
    activePillCls: 'bg-[#285647] text-[#fff8ee]',
  },
  {
    key: 'distance',
    label: '道路里程',
    swatchCls: 'rounded-sm bg-[#6b4f2c] border-[#3a2918]',
    activePillCls: 'bg-[#6b4f2c] text-[#fff8ee]',
  },
]

export function TopHud() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const overlays = useGameStore((s) => s.overlays)
  const worldScale = useGameStore((s) => s.worldPan.scale)
  const regionScale = useGameStore((s) => s.regionPan.scale)

  const openMenu = useGameStore((s) => s.openMenu)
  const handleUpperLevelBack = useGameStore((s) => s.handleUpperLevelBack)
  const toggleRegionLabels = useGameStore((s) => s.toggleRegionLabels)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const toggleOverlay = useGameStore((s) => s.toggleOverlay)
  const setAllLabelToggles = useGameStore((s) => s.setAllLabelToggles)

  const telemetry = useAssetTelemetry()

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [dropdownOpen])

  const groupedRegions = useMemo(() => {
    const citiesSong = WORLD_GRAPH.nodes.filter((n) => n.type === 'city' && n.regime === 'song')
    const citiesForeign = WORLD_GRAPH.nodes.filter((n) => n.type === 'city' && n.regime !== 'song')
    const sectsAndPasses = WORLD_GRAPH.nodes.filter((n) => n.type !== 'city')
    return { citiesSong, citiesForeign, sectsAndPasses }
  }, [])

  const activeLabelCount = LABEL_MENU_ITEMS.filter((it) => overlays[it.key]).length
  const isMacroZoom = worldScale < 0.85

  let lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 山海详图（标注开启 ${activeLabelCount}/4）`
  let lodBadgeCls =
    'px-2 py-0.5 rounded bg-[#eadec6] text-[#4a3219] border border-[#9e8462] font-medium song-serif'
  if (isMacroZoom) {
    lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 列国总览（仅显国号疆界）`
    lodBadgeCls =
      'px-2 py-0.5 rounded bg-[#8f241e] text-[#fff8ee] border border-[#5c1612] font-medium song-serif'
  } else if (activeLabelCount === 0) {
    lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 纯净图标模式（无文字干扰）`
    lodBadgeCls =
      'px-2 py-0.5 rounded bg-[#2d4a3e] text-[#fff8ee] border border-[#1a2e26] font-medium song-serif'
  } else if (worldScale < 0.94) {
    lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 州府中观（隐去山门关隘名）`
    lodBadgeCls =
      'px-2 py-0.5 rounded bg-[#dfc9a3] text-[#3d2812] border border-[#8c6f46] font-medium song-serif'
  }

  const regionNode = NODE_MAP[activeRegionId]
  const regionCfg = REGIONAL_CONFIGS[activeRegionId]
  const activeBuilding =
    viewMode === 'building' && activeBuildingInteriorId
      ? (BUILDING_DB_MAP[activeBuildingInteriorId] ?? null)
      : null

  return (
    <>
      {/* 右上角：群侠图鉴快捷入口 + 系统菜单触发按钮 */}
      <div className="absolute top-3.5 right-3.5 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => openMenu('engineering')}
          title="查看 M0-1 静态资源按需懒加载实时监控"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-2 rounded-md bg-[#261a10]/95 hover:bg-[#382719] text-[#f5dfb5] border border-[#c89d54]/70 shadow-lg text-xs font-mono cursor-pointer transition"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>
            懒加载 {telemetry.loadedCount}/{ASSET_MANIFEST.summary.totalExtractedImageFiles} ·{' '}
            {formatByteSize(telemetry.loadedBytes)}
          </span>
        </button>

        <button
          id="system-menu-trigger"
          type="button"
          onClick={() => openMenu()}
          className="px-3.5 py-2 rounded-md bg-[#7f1d1d] hover:bg-[#991b1b] text-[#fff8eb] border-2 border-[#e6be68] shadow-xl transition flex items-center gap-2 font-bold song-serif text-sm tracking-wide cursor-pointer select-none"
        >
          <span>☰</span>
          <span>菜单</span>
          <span className="text-[10px] font-mono opacity-85 bg-black/30 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </button>
      </div>

      {viewMode === 'world' ? (
        /* 天下舆图左上角：战略情报开关 + 地名文字下拉栏 + LOD 视距状态 */
        <div
          id="world-top-hud"
          className="absolute top-3.5 left-3.5 z-30 flex flex-wrap items-center gap-1.5 bg-[#f8f1e1] text-[#2a1f16] border border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-md text-xs"
        >
          <span className="song-serif font-bold text-[#52391e] mr-1">舆图谍报：</span>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className={`px-2.5 py-0.5 rounded border border-[#7c6344] font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeLabelCount > 0
                  ? 'bg-[#5c4024] text-[#fff8ee]'
                  : 'bg-[#f8f1e1] text-[#2a1f16] hover:bg-[#e8dcc4]'
              }`}
            >
              <span>
                {activeLabelCount === 0 ? '地名文字：全隐' : `地名文字 (${activeLabelCount}/4)`}
              </span>
              <span
                className={`text-[10px] opacity-85 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-64 bg-[#faf3e3] text-[#23180f] border-2 border-[#5c4024] rounded-md shadow-xl p-2.5 space-y-2 z-50">
                <div className="flex items-center justify-between border-b border-[#8c7353]/40 pb-1.5">
                  <span className="song-serif font-bold text-[#52391e] text-xs">
                    地图文字标注显示开关
                  </span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setAllLabelToggles(true)}
                      className="px-1.5 py-0.5 rounded bg-[#eadec6] hover:bg-[#dfd0b2] border border-[#9e8462] text-[#3d2812] transition cursor-pointer"
                    >
                      全显
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllLabelToggles(false)}
                      className="px-1.5 py-0.5 rounded bg-[#eadec6] hover:bg-[#dfd0b2] border border-[#9e8462] text-[#3d2812] transition cursor-pointer"
                    >
                      全隐(仅图标)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {LABEL_MENU_ITEMS.map((item) => {
                    const on = overlays[item.key]
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => toggleOverlay(item.key)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded border border-[#9e8462] transition text-xs cursor-pointer ${
                          on
                            ? 'bg-[#efe5cd] hover:bg-[#e6d8b8]'
                            : 'bg-[#f6efe0] hover:bg-[#e6d8b8] opacity-85'
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <span
                            className={`inline-block w-2.5 h-2.5 border shrink-0 ${item.swatchCls}`}
                          />
                          <span>{item.label}</span>
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            on ? item.activePillCls : 'bg-[#d8cbb2] text-[#5c4630]'
                          }`}
                        >
                          {on ? '显示' : '隐藏'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="text-[11px] text-[#6b5338] pt-0.5 leading-snug">
                  注：关闭后地图仍保留各地区图标与悬停详情；缩小至 &lt;0.85× 时自动切换为列国国号总览。
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleOverlay('factions')}
            className={`px-2 py-0.5 rounded border border-[#7c6344] transition cursor-pointer ${
              overlays.factions ? 'bg-[#3b5998] text-[#fff8ee]' : 'hover:bg-[#e8dcc4]'
            }`}
          >
            门派与四国势力圈
          </button>

          <button
            type="button"
            onClick={() => toggleOverlay('alerts')}
            className={`px-2 py-0.5 rounded border border-[#7c6344] transition cursor-pointer ${
              overlays.alerts ? 'bg-[#992b2b] text-[#fff8ee]' : 'hover:bg-[#e8dcc4]'
            }`}
          >
            边关渗透警报
          </button>

          <span className="mx-1 text-[#8c7353]">|</span>
          <span className={lodBadgeCls}>{lodBadgeText}</span>
        </div>
      ) : (
        /* 地区 / 建筑全景顶部横幅 */
        <div
          id="region-top-hud"
          className="absolute top-3.5 left-3.5 right-72 z-20 flex flex-wrap items-center gap-2 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-2.5 bg-[#261a10] text-[#fbf3e2] border-2 border-[#c89d54] rounded-md px-3.5 py-1.5 shadow-xl">
            <button
              type="button"
              onClick={handleUpperLevelBack}
              className="px-3 py-1 rounded bg-[#9c2a22] hover:bg-[#b8342b] text-[#fff9ef] font-bold song-serif text-xs border border-[#f2c97d]/60 shadow transition flex items-center gap-1 cursor-pointer"
            >
              <span>←</span>
              <span>
                {activeBuilding
                  ? `步出建筑 · 返回【${regionNode?.name ?? '本州'}】全景`
                  : '出城 · 返回天下舆图'}
              </span>
            </button>
            <div className="h-5 w-px bg-[#8c6e46]/60" />
            <div>
              <div className="flex items-center gap-2">
                <span className="song-serif font-bold text-sm text-amber-300 tracking-wide">
                  {activeBuilding
                    ? `${regionNode?.name ?? ''} > ★ ${activeBuilding.name} — ${
                        activeBuilding.interior?.mode === 'image' ? '建筑半3D全景图' : '宋式营造矢量内景'
                      }`
                    : `${regionNode?.code ? `${regionNode.code} · ` : ''}${regionNode?.name ?? ''} — 半3D全景互动舆图`}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#4a3520] text-[#f5dfb5] text-[11px] border border-[#9e7b47]/50">
                  {activeBuilding
                    ? activeBuilding.interior?.mode === 'image'
                      ? '第三层级 · 手绘实景'
                      : '第三层级 · 营造矢量卷'
                    : regionNode?.circuit}
                </span>
              </div>
              <div className="hidden 2xl:block text-[11px] text-[#dfcfb0] mt-0.5">
                {activeBuilding
                  ? activeBuilding.interior?.subtitle
                  : `${regionCfg?.sceneSubtitle ?? ''}（滚轮缩放 · 左键拖拽平移 · 点击特殊建筑入内）`}
              </div>
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 bg-[#f8f1e1] text-[#2a1f16] border-2 border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-lg text-xs">
            <button
              type="button"
              onClick={toggleRegionLabels}
              className={
                showRegionLabels
                  ? 'px-2 py-1 rounded bg-[#5c4024] text-[#fff8ee] border border-[#3d2812] font-medium text-xs hover:opacity-90 transition cursor-pointer'
                  : 'px-2 py-1 rounded bg-[#eadec6] text-[#3d2812] border border-[#8c6e46] font-medium text-xs hover:bg-[#dfd0b2] transition cursor-pointer'
              }
            >
              {showRegionLabels ? '建筑牌匾：显示' : '建筑牌匾：隐藏（纯赏景）'}
            </button>

            <span className="px-2 py-0.5 rounded bg-[#eadec6] border border-[#9e8462] text-[#4a3219] font-medium song-serif">
              视距 {regionScale.toFixed(2)}×
            </span>

            <span className="opacity-40">|</span>

            <select
              value={activeRegionId}
              onChange={(e) => enterRegionMap(e.target.value, true)}
              title="38处地区巡览切换"
              className="px-2 py-1 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] font-medium text-xs cursor-pointer"
            >
              <optgroup label="大宋十五府（统一三字府名）">
                {groupedRegions.citiesSong.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.code ? `${n.code} · ` : ''}
                    {n.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="辽·夏·吐蕃·大理六城">
                {groupedRegions.citiesForeign.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.code ? `${n.code} · ` : ''}
                    {n.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="十七名山宗门与雄关">
                {groupedRegions.sectsAndPasses.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.code ? `${n.code} · ` : ''}
                    {n.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      )}
    </>
  )
}
