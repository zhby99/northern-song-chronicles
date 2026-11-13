import { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  BookOpen,
  Coins,
  Heart,
  Moon,
  Music,
  SkipBack,
  SkipForward,
  Sun,
  Volume2,
  VolumeX,
  Wheat,
  Zap,
} from 'lucide-react'
import { BUILDING_DB_MAP } from '../../data/gameDb'
import { useGameStore } from '../../store/useGameStore'
import type { LabelToggleKey } from '../../types/game'
import { ASSET_MANIFEST, formatByteSize, useAssetTelemetry } from '../../utils/assetLoader'
import {
  type BgmPlaylistItem,
  formatAudioTime,
  getActiveTrackItem,
  playNextBgmTrack,
  playPrevBgmTrack,
  seekBgmTo,
  selectBgmTrackIndex,
  setBgmVolume,
  toggleBgmPlayback,
  useBgmMetaState,
  useBgmProgress,
} from '../../utils/bgmManager'
import { getSongDateParts, NODE_MAP, REGIONAL_CONFIGS, WORLD_GRAPH } from '../../utils/mapMath'

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

/**
 * 隔离组件 1：皇祐纪年与十二时辰徽章（行路 250ms 时钟步进仅重绘此微型组件）
 */
const TopClockBadge = memo(function TopClockBadge() {
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const dateParts = getSongDateParts(dayCount, shichenIdx)

  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <div className="w-7 h-7 rounded bg-[#8f1d14] border border-[#f5cb5c]/80 flex items-center justify-center song-serif font-bold text-xs text-[#fff8eb] shadow">
        宋
      </div>
      <div className="flex items-center gap-2 bg-[#1a110a]/80 border border-[#8c6e46]/60 rounded px-2.5 py-1">
        <span className="song-serif font-bold text-xs sm:text-sm text-amber-200 tracking-wide">
          {dateParts.yearName} · {dateParts.monthName}
          {dateParts.dayName}
        </span>
        <span className="text-[#8c6e46]">|</span>
        <span
          title={`${dateParts.shichen.name}（${dateParts.shichen.period} · ${dateParts.shichen.range}）`}
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold song-serif border ${
            dateParts.shichen.isNight
              ? 'bg-[#1e293b] text-indigo-200 border-indigo-400/40'
              : 'bg-[#5c3d1e] text-amber-200 border-amber-400/50'
          }`}
        >
          {dateParts.shichen.isNight ? (
            <Moon className="w-3 h-3 text-indigo-300" />
          ) : (
            <Sun className="w-3 h-3 text-amber-300" />
          )}
          <span>{dateParts.shichen.name}</span>
          <span className="hidden xl:inline text-[10px] font-normal opacity-85">
            ({dateParts.shichen.period})
          </span>
        </span>
      </div>
    </div>
  )
})

/**
 * 隔离组件 2：主角气血、体能与行军资粮条
 */
const TopHeroVitalsBar = memo(function TopHeroVitalsBar() {
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const stamina = useGameStore((s) => s.stamina)
  const maxStamina = useGameStore((s) => s.maxStamina)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const openMenu = useGameStore((s) => s.openMenu)

  const hpPct = Math.min(100, Math.max(0, Math.round((hp / Math.max(1, maxHp)) * 100)))
  const staPct = Math.min(100, Math.max(0, Math.round((stamina / Math.max(1, maxStamina)) * 100)))
  const isFoodLow = food <= 5
  const isStaminaLow = staPct <= 25

  return (
    <div className="flex items-center gap-2 sm:gap-3.5 overflow-x-auto no-scrollbar">
      {/* 气血 & 体能 (点击直达主角面板) */}
      <button
        type="button"
        onClick={() => openMenu('hero')}
        title="点击打开【主角面板】检视气血、体能、先天三维与十艺修为"
        className="flex items-center gap-3 px-2.5 py-1 rounded bg-[#1a110a]/75 hover:bg-[#332215] border border-[#8c6e46]/60 transition cursor-pointer"
      >
        <div className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]/30 shrink-0" />
          <div className="text-left">
            <div className="flex items-center justify-between gap-2 text-[11px] leading-none">
              <span className="text-[#dfcfb0] song-serif font-semibold">气血</span>
              <span className="font-mono font-bold text-[#fca5a5]">
                {hp}/{maxHp}
              </span>
            </div>
            <div className="w-20 sm:w-24 h-1.5 rounded-full bg-[#3b231b] overflow-hidden mt-1 border border-black/40">
              <div
                className="h-full bg-gradient-to-r from-[#991b1b] to-[#ef4444] transition-all duration-300"
                style={{ width: `${hpPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#6e5539]/50" />

        <div className="flex items-center gap-1.5">
          <Zap
            className={`w-3.5 h-3.5 shrink-0 ${
              isStaminaLow ? 'text-amber-400 animate-pulse' : 'text-emerald-400'
            }`}
          />
          <div className="text-left">
            <div className="flex items-center justify-between gap-2 text-[11px] leading-none">
              <span className="text-[#dfcfb0] song-serif font-semibold">体能</span>
              <span
                className={`font-mono font-bold ${
                  isStaminaLow ? 'text-amber-300' : 'text-emerald-300'
                }`}
              >
                {stamina}/{maxStamina}
              </span>
            </div>
            <div className="w-20 sm:w-24 h-1.5 rounded-full bg-[#1a2e24] overflow-hidden mt-1 border border-black/40">
              <div
                className={`h-full transition-all duration-300 ${
                  isStaminaLow
                    ? 'bg-gradient-to-r from-[#b45309] to-[#f59e0b]'
                    : 'bg-gradient-to-r from-[#059669] to-[#34d399]'
                }`}
                style={{ width: `${staPct}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      {/* 资金 & 粮草 (点击直达四分类背包) */}
      <button
        type="button"
        onClick={() => openMenu('bag')}
        title="点击打开【四分类行囊】管理银两、粮草、典籍丹药与百工器具"
        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded bg-[#1a110a]/75 hover:bg-[#332215] border border-[#8c6e46]/60 transition cursor-pointer text-xs"
      >
        <span className="flex items-center gap-1">
          <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[#dfcfb0] song-serif hidden sm:inline">资金</span>
          <strong className="font-mono text-amber-300">{silver}两</strong>
        </span>

        <span className="text-[#6e5539]">|</span>

        <span className="flex items-center gap-1">
          <Wheat
            className={`w-3.5 h-3.5 shrink-0 ${
              isFoodLow ? 'text-red-400 animate-pulse' : 'text-[#a3e635]'
            }`}
          />
          <span className="text-[#dfcfb0] song-serif hidden sm:inline">粮草</span>
          <strong className={`font-mono ${isFoodLow ? 'text-red-300' : 'text-[#d9f99d]'}`}>
            {food}日份
          </strong>
        </span>
      </button>
    </div>
  )
})

/**
 * 隔离组件 3a：仅在【皇祐雅乐匣】浮层展开时挂载的秒级进度条，关闭浮层时 0 定时器、0 重绘
 */
const BgmProgressScrubber = memo(function BgmProgressScrubber({
  activeTrackItem,
  trackCount,
}: {
  activeTrackItem: BgmPlaylistItem | null
  trackCount: number
}) {
  const progress = useBgmProgress()

  return (
    <>
      <div className="flex items-center justify-between text-[11px]">
        <span className="song-serif font-bold text-[#781710] truncate">
          {activeTrackItem
            ? `${activeTrackItem.label} · ${activeTrackItem.fileName}`
            : '暂无曲目'}
        </span>
        <span className="font-mono text-[#5e472d] shrink-0">
          {formatAudioTime(progress.currentTime)} / {formatAudioTime(progress.duration)}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {trackCount > 1 && (
          <button
            type="button"
            onClick={playPrevBgmTrack}
            title="上一曲"
            className="p-1 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#b8a07a] text-[#4a3219] cursor-pointer"
          >
            <SkipBack className="w-3 h-3" />
          </button>
        )}
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(progress.duration || 100))}
          step={1}
          value={Math.floor(progress.currentTime)}
          onChange={(e) => seekBgmTo(Number(e.target.value))}
          className="flex-1 accent-[#8f1d14] cursor-pointer h-1.5"
        />
        {trackCount > 1 && (
          <button
            type="button"
            onClick={playNextBgmTrack}
            title="下一曲"
            className="p-1 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#b8a07a] text-[#4a3219] cursor-pointer"
          >
            <SkipForward className="w-3 h-3" />
          </button>
        )}
      </div>
    </>
  )
})

/**
 * 隔离组件 3b：皇祐雅乐匣按钮与下拉浮层（稳态播放时 0 Hz 静默，绝不触发 TopHud 重绘）
 */
const TopBgmWidget = memo(function TopBgmWidget() {
  const [bgmPopoverOpen, setBgmPopoverOpen] = useState(false)
  const bgmPopoverRef = useRef<HTMLDivElement | null>(null)
  const bgm = useBgmMetaState()
  const activeTrackItem = getActiveTrackItem(bgm)

  useEffect(() => {
    if (!bgmPopoverOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (
        bgmPopoverRef.current &&
        e.target instanceof Node &&
        !bgmPopoverRef.current.contains(e.target)
      ) {
        setBgmPopoverOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [bgmPopoverOpen])

  return (
    <div ref={bgmPopoverRef} className="relative flex items-center">
      <div className="flex items-center rounded bg-[#1a110a]/90 border border-[#c89d54]/60 overflow-hidden shadow">
        <button
          type="button"
          onClick={toggleBgmPlayback}
          title={
            bgm.enabled
              ? `点击暂停配乐（快捷键 M）· 当前：${bgm.playlist.sceneTitle}`
              : `点击开启配乐（快捷键 M）· 当前：${bgm.playlist.sceneTitle}`
          }
          className={`px-2 py-1.5 flex items-center gap-1.5 text-xs transition cursor-pointer ${
            bgm.isPlaying
              ? 'bg-[#3b2514] text-amber-200 hover:bg-[#4d311b]'
              : bgm.enabled && bgm.awaitingGesture
                ? 'bg-[#2f2013] text-amber-300/90 hover:bg-[#422c1a]'
                : 'text-[#bfa888] hover:bg-[#2e1f14]'
          }`}
        >
          {bgm.enabled && bgm.volume > 0 ? (
            <Volume2
              className={`w-3.5 h-3.5 shrink-0 ${
                bgm.isPlaying ? 'text-amber-300 animate-pulse' : 'text-amber-400/80'
              }`}
            />
          ) : (
            <VolumeX className="w-3.5 h-3.5 shrink-0 text-[#9c8465]" />
          )}
          <span className="song-serif font-bold tracking-wide hidden md:inline">
            {bgm.playlist.sceneTitle}
          </span>
          {bgm.playlist.tracks.length > 1 && (
            <span className="hidden lg:inline font-mono text-[10px] text-amber-300/85">
              {bgm.trackIndex + 1}/{bgm.playlist.tracks.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setBgmPopoverOpen((v) => !v)}
          title="展开【皇祐雅乐匣】查看当前地域/大地图顺序歌单与音量"
          className="px-1.5 py-1.5 border-l border-[#8c6e46]/45 text-[10px] text-[#e6d2b0] hover:bg-[#382719] transition cursor-pointer"
        >
          ▾
        </button>
      </div>

      {bgmPopoverOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#faf3e3] text-[#23180f] border-2 border-[#5c4024] rounded-md shadow-2xl p-3 space-y-2.5 z-50">
          <div className="flex items-start justify-between gap-2 border-b border-[#8c7353]/40 pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#8f1d14]" />
                <span className="song-serif font-bold text-sm text-[#52391e]">
                  {bgm.playlist.sceneTitle}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#eadec6] border border-[#9e8462] text-[10px] font-mono text-[#4a3219]">
                  {bgm.playlist.tracks.length > 0
                    ? `${bgm.trackIndex + 1}/${bgm.playlist.tracks.length}`
                    : '空'}
                </span>
              </div>
              <div className="text-[11px] text-[#6b5235] mt-0.5">
                {bgm.playlist.sceneSubtitle}
              </div>
            </div>
            <button
              type="button"
              onClick={toggleBgmPlayback}
              className={`px-2.5 py-1 rounded text-xs font-bold song-serif border cursor-pointer shrink-0 ${
                bgm.enabled
                  ? 'bg-[#8f1d14] text-[#fff8eb] border-[#5c1612] hover:bg-[#a9241a]'
                  : 'bg-[#eadec6] text-[#3d2812] border-[#8c6e46] hover:bg-[#dfd0b2]'
              }`}
            >
              {bgm.isPlaying ? '暂停丝竹' : bgm.enabled ? '点击奏乐' : '开启雅乐'}
            </button>
          </div>

          <div className="bg-[#efe4cc] border border-[#c8b28e] rounded p-2 space-y-1.5">
            <BgmProgressScrubber
              activeTrackItem={activeTrackItem}
              trackCount={bgm.playlist.tracks.length}
            />

            {bgm.playlist.tracks.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {bgm.playlist.tracks.map((tr, idx) => {
                  const isCur = idx === bgm.trackIndex
                  return (
                    <button
                      key={tr.url}
                      type="button"
                      onClick={() => selectBgmTrackIndex(idx)}
                      title={`播放 ${tr.label} (${tr.url})`}
                      className={`px-2 py-1 rounded text-[10px] song-serif border transition cursor-pointer ${
                        isCur
                          ? 'bg-[#5c4024] text-[#fff8ee] border-[#3d2812] font-bold'
                          : 'bg-[#faf3e3] text-[#4a3219] border-[#b8a07a] hover:bg-[#e5d6b8]'
                      }`}
                    >
                      {tr.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2.5 text-xs">
            <span className="song-serif font-semibold text-[#52391e] shrink-0">丝竹音量</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(bgm.volume * 100)}
              onChange={(e) => setBgmVolume(Number(e.target.value) / 100)}
              className="flex-1 accent-[#5c4024] cursor-pointer h-1.5"
            />
            <span className="font-mono text-[11px] text-[#4a3219] w-9 text-right">
              {Math.round(bgm.volume * 100)}%
            </span>
          </div>

          <div className="text-[10px] text-[#6b5338] leading-relaxed border-t border-[#8c7353]/30 pt-1.5">
            同曲跨州切换无缝不断曲；对应目录放入 <code className="font-mono">1.mp3</code> 即自动优先覆盖共享曲（快捷键 <kbd className="font-mono">M</kbd> 静音）。
          </div>
        </div>
      )}
    </div>
  )
})

/**
 * 隔离组件 4：静态资源懒加载实时监控徽章（图片/音轨完成加载时仅重绘自身）
 */
const TopAssetTelemetryBadge = memo(function TopAssetTelemetryBadge() {
  const openMenu = useGameStore((s) => s.openMenu)
  const telemetry = useAssetTelemetry()
  const totalEvicted = telemetry.evictedImageCount + telemetry.audioEvictedCount

  return (
    <button
      type="button"
      onClick={() => openMenu('engineering')}
      title={`点击检视内存驻留与自动回收详情 · 当前驻留原画 ${telemetry.residentImageCount} 张 (${formatByteSize(telemetry.residentImageBytes)}) · 解码音轨 ${telemetry.audioCachedCount}/${telemetry.audioMaxCap} 首 (PCM ${formatByteSize(telemetry.audioPcmBytes)}) · 本局累计调阅 ${telemetry.loadedCount}/${ASSET_MANIFEST.summary.totalExtractedImageFiles}`}
      className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a110a]/90 hover:bg-[#382719] text-[#f5dfb5] border border-[#c89d54]/50 text-[11px] font-mono cursor-pointer transition"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400" />
      <span>
        驻留 {telemetry.residentImageCount}图 · 音轨 {telemetry.audioCachedCount}/
        {telemetry.audioMaxCap}
        {totalEvicted > 0 ? ` · 已释${totalEvicted}` : ''}
      </span>
    </button>
  )
})

/**
 * 隔离组件 5：第二行场景上下文子导航条（滚轮缩放视距变化仅重绘此条，不触碰顶部全局状态栏）
 */
const SceneSubNavBar = memo(function SceneSubNavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const overlays = useGameStore((s) => s.overlays)
  const worldScale = useGameStore((s) => s.worldPan.scale)
  const regionScale = useGameStore((s) => s.regionPan.scale)

  const handleUpperLevelBack = useGameStore((s) => s.handleUpperLevelBack)
  const toggleRegionLabels = useGameStore((s) => s.toggleRegionLabels)
  const enterRegionMap = useGameStore((s) => s.enterRegionMap)
  const toggleOverlay = useGameStore((s) => s.toggleOverlay)
  const setAllLabelToggles = useGameStore((s) => s.setAllLabelToggles)

  useEffect(() => {
    if (!dropdownOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (
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

  if (viewMode === 'world') {
    const activeLabelCount = LABEL_MENU_ITEMS.filter((it) => overlays[it.key]).length
    const isMacroZoom = worldScale < 0.85

    let lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 山海详图（标注 ${activeLabelCount}/4）`
    let lodBadgeCls =
      'px-2 py-0.5 rounded bg-[#eadec6] text-[#4a3219] border border-[#9e8462] font-medium song-serif'
    if (isMacroZoom) {
      lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 列国总览（仅显国号疆界）`
      lodBadgeCls =
        'px-2 py-0.5 rounded bg-[#8f241e] text-[#fff8ee] border border-[#5c1612] font-medium song-serif'
    } else if (activeLabelCount === 0) {
      lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 纯净图标模式`
      lodBadgeCls =
        'px-2 py-0.5 rounded bg-[#2d4a3e] text-[#fff8ee] border border-[#1a2e26] font-medium song-serif'
    } else if (worldScale < 0.94) {
      lodBadgeText = `视距 ${worldScale.toFixed(2)}× · 州府中观`
      lodBadgeCls =
        'px-2 py-0.5 rounded bg-[#dfc9a3] text-[#3d2812] border border-[#8c6f46] font-medium song-serif'
    }

    return (
      <div
        id="world-top-hud"
        className="absolute top-14 left-3.5 z-20 flex flex-wrap items-center gap-1.5 bg-[#f8f1e1]/95 text-[#2a1f16] border border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-md text-xs"
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
                注：放大舆图时城池与地区图标文字保持 1.0× 舒适尺寸不膨胀；各城连线仅于点选异地寻路或行路时显现。
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
    )
  }

  const regionNode = NODE_MAP[activeRegionId]
  const regionCfg = REGIONAL_CONFIGS[activeRegionId]
  const activeBuilding =
    viewMode === 'building' && activeBuildingInteriorId
      ? (BUILDING_DB_MAP[activeBuildingInteriorId] ?? null)
      : null

  return (
    <div
      id="region-top-hud"
      className="absolute top-14 left-3.5 right-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-2.5 bg-[#261a10]/95 text-[#fbf3e2] border-2 border-[#c89d54] rounded-md px-3 py-1.5 shadow-xl">
        <button
          type="button"
          onClick={handleUpperLevelBack}
          className="px-2.5 py-1 rounded bg-[#9c2a22] hover:bg-[#b8342b] text-[#fff9ef] font-bold song-serif text-xs border border-[#f2c97d]/60 shadow transition flex items-center gap-1 cursor-pointer"
        >
          <span>←</span>
          <span>
            {activeBuilding
              ? `步出建筑 · 返【${regionNode?.name ?? '本州'}】`
              : '出城 · 天下舆图'}
          </span>
        </button>
        <div className="h-5 w-px bg-[#8c6e46]/60" />
        <div>
          <div className="flex items-center gap-2">
            <span className="song-serif font-bold text-xs sm:text-sm text-amber-300 tracking-wide">
              {activeBuilding
                ? `${regionNode?.name ?? ''} > ★ ${activeBuilding.name}`
                : `${regionNode?.code ? `${regionNode.code} · ` : ''}${regionNode?.name ?? ''} — 半3D全景互动舆图`}
            </span>
            <span className="hidden md:inline px-2 py-0.5 rounded bg-[#4a3520] text-[#f5dfb5] text-[11px] border border-[#9e7b47]/50">
              {activeBuilding
                ? activeBuilding.interior?.mode === 'image'
                  ? '第三层 · 手绘实景'
                  : '第三层 · 营造矢量卷'
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

      <div className="pointer-events-auto flex items-center gap-2 bg-[#f8f1e1]/95 text-[#2a1f16] border-2 border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-lg text-xs">
        <button
          type="button"
          onClick={toggleRegionLabels}
          className={
            showRegionLabels
              ? 'px-2 py-1 rounded bg-[#5c4024] text-[#fff8ee] border border-[#3d2812] font-medium text-xs hover:opacity-90 transition cursor-pointer'
              : 'px-2 py-1 rounded bg-[#eadec6] text-[#3d2812] border border-[#8c6e46] font-medium text-xs hover:bg-[#dfd0b2] transition cursor-pointer'
          }
        >
          {showRegionLabels ? '牌匾：显示' : '牌匾：隐藏'}
        </button>

        <span className="px-2 py-0.5 rounded bg-[#eadec6] border border-[#9e8462] text-[#4a3219] font-medium song-serif">
          视距 {regionScale.toFixed(2)}×
        </span>

        <span className="opacity-40">|</span>

        <select
          value={activeRegionId}
          onChange={(e) => enterRegionMap(e.target.value, true)}
          title="43处地区巡览切换"
          className="px-2 py-1 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] font-medium text-xs cursor-pointer"
        >
          <optgroup label="大宋十九府（统一三字府名）">
            {groupedRegions.citiesSong.map((n) => (
              <option key={n.id} value={n.id}>
                {n.code ? `${n.code} · ` : ''}
                {n.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="辽·夏·吐蕃·大理七城">
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
  )
})

export function TopHud() {
  const openMenu = useGameStore((s) => s.openMenu)
  const openCompendium = useGameStore((s) => s.openCompendium)

  return (
    <>
      <header
        id="global-status-topbar"
        className="absolute top-0 inset-x-0 z-30 h-12 bg-gradient-to-b from-[#23170e] via-[#2b1d12] to-[#20150c] text-[#fbf2e0] border-b-2 border-[#c89d54] shadow-xl px-3.5 flex items-center justify-between gap-2 select-none"
      >
        <TopClockBadge />
        <TopHeroVitalsBar />

        <div className="flex items-center gap-2 shrink-0">
          <TopBgmWidget />
          <TopAssetTelemetryBadge />

          <button
            id="compendium-menu-trigger"
            type="button"
            onClick={() => openCompendium()}
            title="打开《皇祐万象图鉴》检阅地区图鉴(43地)、门派图鉴(30派+11势力)、群侠千人谱、216门武学总纲、百兵谱(100兵)、坐骑图鉴(28骑)与博物图鉴（快捷键 G）"
            className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] border border-[#e6be68] shadow transition flex items-center gap-1.5 font-bold song-serif text-xs sm:text-sm tracking-wide cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span>图鉴</span>
            <span className="hidden sm:inline text-[10px] font-mono opacity-85 bg-black/30 px-1 py-0.5 rounded">
              G
            </span>
          </button>

          <button
            id="system-menu-trigger"
            type="button"
            onClick={() => openMenu()}
            className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] border border-[#e6be68] shadow transition flex items-center gap-1.5 font-bold song-serif text-xs sm:text-sm tracking-wide cursor-pointer"
          >
            <span>☰</span>
            <span>行囊枢机</span>
            <span className="hidden sm:inline text-[10px] font-mono opacity-85 bg-black/30 px-1 py-0.5 rounded">
              ESC
            </span>
          </button>
        </div>
      </header>

      <SceneSubNavBar />
    </>
  )
}
