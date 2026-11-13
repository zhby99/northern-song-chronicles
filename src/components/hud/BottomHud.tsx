import { useGameStore } from '../../store/useGameStore'
import { formatSongDate } from '../../utils/mapMath'

export function BottomHud() {
  const viewMode = useGameStore((s) => s.viewMode)
  const dayCount = useGameStore((s) => s.dayCount)
  const logs = useGameStore((s) => s.logs)
  const logDrawerOpen = useGameStore((s) => s.logDrawerOpen)

  const zoomWorldBy = useGameStore((s) => s.zoomWorldBy)
  const focusZhongyuan = useGameStore((s) => s.focusZhongyuan)
  const focusMacroRegimes = useGameStore((s) => s.focusMacroRegimes)
  const resetWorldView = useGameStore((s) => s.resetWorldView)

  const zoomRegionBy = useGameStore((s) => s.zoomRegionBy)
  const focusSelectedBuilding = useGameStore((s) => s.focusSelectedBuilding)
  const resetRegionView = useGameStore((s) => s.resetRegionView)
  const toggleLogDrawer = useGameStore((s) => s.toggleLogDrawer)

  return (
    <>
      {viewMode === 'world' ? (
        <div id="world-bottom-hud" className="absolute bottom-3 left-3 z-20 flex items-end gap-2">
          <div className="bg-[#f8f1e1] text-[#2a1f16] border border-[#6e5539] rounded-md px-3 py-2 shadow-md text-xs space-y-1">
            <div className="font-bold song-serif text-[#52391e] border-b border-[#8c7353]/40 pb-0.5 mb-1 flex items-center justify-between gap-4">
              <span>《华夷山海全图》图例（滚轮缩小自动隐去地名、凸显列国疆界）</span>
              <span className="font-mono text-[11px] text-[#8f1d14]">
                {formatSongDate(dayCount)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 bg-[#8f241e] border border-[#3a1d12]" />
                北宋 15 城
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 bg-[#5b3b73] border border-[#281836]" />
                辽/夏/蕃/理 6 城
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#285948] border border-[#143328]" />
                名山宗门/昆仑
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[#8a5219] border border-[#422508]" />
                战略雄关
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-4 h-0.5 bg-[#8e2f24]" />
                列国疆界
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 bg-[#9e8b6e] border border-[#5e4d36]" />
                塞外未辟绝域（雕版云纹）
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#55422f]">
              <span>── 官道 (1.0)</span>
              <span>╌╌ 运河海路 (0.8)</span>
              <span>─ - 塞外戈壁 (1.2)</span>
              <span>┈┈ 崇山高原 (1.6)</span>
            </div>
          </div>

          <div className="flex flex-col bg-[#f8f1e1] text-[#2a1f16] border border-[#6e5539] rounded-md overflow-hidden shadow-md text-xs">
            <button
              type="button"
              onClick={() => zoomWorldBy(1.22)}
              title="放大舆图"
              className="px-2.5 py-1.5 hover:bg-[#e8dcc4] font-bold border-b border-[#8c7353]/40 cursor-pointer"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => zoomWorldBy(0.82)}
              title="缩小舆图（<0.85× 切换列国总览）"
              className="px-2.5 py-1.5 hover:bg-[#e8dcc4] font-bold border-b border-[#8c7353]/40 cursor-pointer"
            >
              −
            </button>
            <button
              type="button"
              onClick={focusZhongyuan}
              title="聚焦中原"
              className="px-2 py-1 hover:bg-[#e8dcc4] border-b border-[#8c7353]/40 text-[11px] cursor-pointer"
            >
              中原
            </button>
            <button
              type="button"
              onClick={focusMacroRegimes}
              title="缩小至列国宏观总览"
              className="px-2 py-1 hover:bg-[#e8dcc4] border-b border-[#8c7353]/40 text-[11px] text-[#8f241e] font-semibold cursor-pointer"
            >
              列国
            </button>
            <button
              type="button"
              onClick={resetWorldView}
              title="全景山海 (1.0×)"
              className="px-2 py-1 hover:bg-[#e8dcc4] text-[11px] cursor-pointer"
            >
              全图
            </button>
          </div>

          <button
            type="button"
            onClick={toggleLogDrawer}
            className="px-3 py-2 rounded-md bg-[#261a10] hover:bg-[#3a2819] text-[#fbf3e2] border border-[#c89d54] shadow-md text-xs song-serif font-bold cursor-pointer"
          >
            {logDrawerOpen ? '收起行纪' : `江湖行纪 (${logs.length})`}
          </button>
        </div>
      ) : (
        <div id="region-bottom-hud" className="absolute bottom-3 left-3 z-20 flex items-end gap-2">
          <div className="bg-[#f8f1e1] text-[#2a1f16] border-2 border-[#6e5539] rounded-md px-3 py-2 shadow-lg text-xs space-y-1">
            <div className="font-bold song-serif text-[#52391e] border-b border-[#8c7353]/40 pb-0.5 mb-1 flex items-center justify-between gap-4">
              <span>
                地区互动建筑图例（滚轮缩放 · 按住左键自由拖拽平移 · 点击建筑移步入内）
              </span>
              <span className="font-mono text-[11px] text-[#8f1d14]">
                {formatSongDate(dayCount)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="flex items-center gap-1.5 font-semibold text-[#8f241e]">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#9e221b] border-2 border-[#f3c65f]" />
                ★ 独有特殊建筑（机缘/绝学/十艺）
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#355263] border border-[#d8cbb2]" />
                城池基础建筑（官署/酒馆/武馆/书院/客栈）
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rotate-45 bg-[#2d5a43] border border-[#e6f4ec]" />
                城门 / 山门出口（返回上一级）
              </span>
            </div>
          </div>

          <div className="flex flex-col bg-[#f8f1e1] text-[#2a1f16] border-2 border-[#6e5539] rounded-md overflow-hidden shadow-lg text-xs">
            <button
              type="button"
              onClick={() => zoomRegionBy(1.24)}
              title="放大内景细节"
              className="px-2.5 py-1.5 hover:bg-[#e8dcc4] font-bold border-b border-[#8c7353]/40 cursor-pointer"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => zoomRegionBy(0.81)}
              title="缩小内景"
              className="px-2.5 py-1.5 hover:bg-[#e8dcc4] font-bold border-b border-[#8c7353]/40 cursor-pointer"
            >
              −
            </button>
            <button
              type="button"
              onClick={focusSelectedBuilding}
              title="聚焦当前选中建筑"
              className="px-2 py-1 hover:bg-[#e8dcc4] border-b border-[#8c7353]/40 text-[11px] text-[#8f241e] font-semibold cursor-pointer"
            >
              聚焦
            </button>
            <button
              type="button"
              onClick={resetRegionView}
              title="复位内景全图 (1.0×)"
              className="px-2 py-1 hover:bg-[#e8dcc4] text-[11px] cursor-pointer"
            >
              全图
            </button>
          </div>

          <button
            type="button"
            onClick={toggleLogDrawer}
            className="px-3 py-2 rounded-md bg-[#261a10] hover:bg-[#3a2819] text-[#fbf3e2] border-2 border-[#c89d54] shadow-lg text-xs song-serif font-bold cursor-pointer"
          >
            {logDrawerOpen ? '收起行纪' : `江湖行纪 (${logs.length})`}
          </button>
        </div>
      )}

      {/* 可按需展开的《江湖行纪》事件日志抽屉 */}
      {logDrawerOpen && (
        <div className="absolute bottom-28 left-3 z-30 w-96 max-h-60 bg-[#faf3e3] text-[#23180f] border-2 border-[#5c4024] rounded-md shadow-2xl flex flex-col overflow-hidden text-xs">
          <div className="bg-[#261910] text-[#fbf2e0] px-3 py-1.5 flex items-center justify-between border-b border-[#c89d54]">
            <span className="song-serif font-bold tracking-wide text-amber-300">
              《江湖行纪》实时卷宗
            </span>
            <button
              type="button"
              onClick={toggleLogDrawer}
              className="text-[#d6c5a5] hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="p-2.5 overflow-y-auto scroll-thin space-y-1.5">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className={`leading-relaxed ${
                  entry.highlight ? 'text-[#8f1d14] font-semibold' : 'text-[#2b1d10]'
                }`}
              >
                <span className="text-[11px] text-[#6b5235] font-mono">[{entry.date}]</span>{' '}
                <span className="font-bold">[{entry.tag}]</span> {entry.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
