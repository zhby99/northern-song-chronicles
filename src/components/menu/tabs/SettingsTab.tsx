import { useGameStore } from '../../../store/useGameStore'
import { formatByteSize } from '../../../utils/assetLoader'
import {
  formatAudioTime,
  getActiveTrackItem,
  getAudioCatalogSummary,
  playNextBgmTrack,
  playPrevBgmTrack,
  seekBgmTo,
  selectBgmTrackIndex,
  setBgmVolume,
  toggleBgmPlayback,
  useBgmState,
} from '../../../utils/bgmManager'

export function SettingsTab() {
  const showRegionLabels = useGameStore((s) => s.showRegionLabels)
  const toggleRegionLabels = useGameStore((s) => s.toggleRegionLabels)
  const setAllLabelToggles = useGameStore((s) => s.setAllLabelToggles)

  const bgm = useBgmState()
  const activeTrackItem = getActiveTrackItem(bgm)
  const audioCatalog = getAudioCatalogSummary()

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="p-4 rounded bg-[#efe4cc] border-2 border-[#b59769] space-y-3.5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold song-serif text-base text-[#23180f]">
                皇祐雅乐坊 · {bgm.playlist.sceneTitle}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#9e8462] text-xs font-mono text-[#52391e]">
                {bgm.playlist.tracks.length > 0
                  ? `第 ${bgm.trackIndex + 1} / ${bgm.playlist.tracks.length} 首`
                  : '暂无曲目'}
              </span>
            </div>
            <div className="text-xs text-[#6b5235] mt-0.5">{bgm.playlist.sceneSubtitle}</div>
          </div>

          <div className="flex items-center gap-1.5">
            {bgm.playlist.tracks.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={playPrevBgmTrack}
                  className="px-3 py-2 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] text-xs song-serif cursor-pointer"
                >
                  上一首
                </button>
                <button
                  type="button"
                  onClick={playNextBgmTrack}
                  className="px-3 py-2 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] text-xs song-serif cursor-pointer"
                >
                  下一首
                </button>
              </>
            )}
            <button
              type="button"
              onClick={toggleBgmPlayback}
              className={`px-4 py-2 rounded font-bold song-serif text-xs cursor-pointer transition ${
                bgm.enabled
                  ? 'bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb]'
                  : 'bg-[#dfd0b2] hover:bg-[#d2c09d] border border-[#8c6e46] text-[#3d2812]'
              }`}
            >
              {bgm.isPlaying
                ? '当前：丝竹奏鸣中（点击静音）'
                : bgm.enabled
                  ? '当前：待奏响（点击播放）'
                  : '当前：已静音（点击开启）'}
            </button>
          </div>
        </div>

        <div className="bg-[#faf3e3] border border-[#cbb693] rounded p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="song-serif font-bold text-[#781710]">
              正在播放：
              {activeTrackItem
                ? `${activeTrackItem.label}（${activeTrackItem.url}）`
                : '当前场景暂无曲目'}
            </span>
            <span className="font-mono text-[#5e472d]">
              {formatAudioTime(bgm.currentTime)} / {formatAudioTime(bgm.duration)}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={Math.max(1, Math.floor(bgm.duration || 100))}
            step={1}
            value={Math.floor(bgm.currentTime)}
            onChange={(e) => seekBgmTo(Number(e.target.value))}
            className="w-full accent-[#8f1d14] cursor-pointer h-1.5"
          />

          {bgm.playlist.tracks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-0.5">
              {bgm.playlist.tracks.map((tr, idx) => {
                const isCur = idx === bgm.trackIndex
                return (
                  <button
                    key={tr.url}
                    type="button"
                    onClick={() => selectBgmTrackIndex(idx)}
                    className={`px-3 py-2 rounded text-left border transition cursor-pointer ${
                      isCur
                        ? 'bg-[#5c4024] text-[#fff8ee] border-[#3d2812]'
                        : 'bg-[#efe4cc] text-[#3d2812] border-[#b8a07a] hover:bg-[#e3d3b3]'
                    }`}
                  >
                    <div className="song-serif font-bold text-xs">{tr.label}</div>
                    <div
                      className={`text-[10px] font-mono ${
                        isCur ? 'text-amber-200' : 'text-[#6b5235]'
                      }`}
                    >
                      {tr.fileName} · {formatByteSize(tr.bytes)}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="song-serif font-bold text-[#3d2812] shrink-0">
            雅乐音量（快捷键 M 静音）：
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(bgm.volume * 100)}
            onChange={(e) => setBgmVolume(Number(e.target.value) / 100)}
            className="flex-1 accent-[#5c4024] cursor-pointer"
          />
          <span className="font-mono font-bold text-[#52391e] w-12 text-right">
            {Math.round(bgm.volume * 100)}%
          </span>
        </div>

        <div className="text-xs text-[#6b5235] leading-relaxed flex flex-wrap items-center justify-between gap-2 border-t border-[#c8b28e] pt-2">
          <span>
            已自动扫描音频曲库：大地图 <strong>{audioCatalog.worldTracks}</strong> 首 · 地区专属{' '}
            <strong>{audioCatalog.totalRegionTracks}</strong> 首（覆盖{' '}
            {audioCatalog.regionCountWithMusic}/43 地） · 人物{' '}
            <strong>{audioCatalog.totalCharacterTracks}</strong> 首 · 事件{' '}
            <strong>{audioCatalog.totalEventTracks}</strong> 首
          </span>
          <span className="font-mono text-[11px]">规则：按 1, 2, 3, 4, 5... 顺序自动循环</span>
        </div>
      </div>

      <div className="p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
        <div>
          <div className="font-bold song-serif text-[#23180f]">地区与建筑内景牌匾显示</div>
          <div className="text-xs text-[#6b5235]">
            隐藏后可纯享宋画青绿山水建筑长卷，悬停依然高亮热区
          </div>
        </div>
        <button
          type="button"
          onClick={toggleRegionLabels}
          className="px-3.5 py-2 rounded bg-[#5c4024] text-[#fff8ee] font-semibold text-xs cursor-pointer"
        >
          {showRegionLabels ? '当前：显示牌匾' : '当前：纯赏景模式'}
        </button>
      </div>

      <div className="p-4 rounded bg-[#efe4cc] border border-[#c8b28e] flex items-center justify-between">
        <div>
          <div className="font-bold song-serif text-[#23180f]">天下舆图文字标注预设</div>
          <div className="text-xs text-[#6b5235]">
            一键开启全部地名里程标注，或切换为纯净图标视图
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAllLabelToggles(true)}
            className="px-3 py-2 rounded bg-[#5c4024] text-[#fff8ee] text-xs cursor-pointer"
          >
            全部开启
          </button>
          <button
            type="button"
            onClick={() => setAllLabelToggles(false)}
            className="px-3 py-2 rounded bg-[#dfd0b2] border border-[#8c6e46] text-[#3d2812] text-xs cursor-pointer"
          >
            全部隐藏
          </button>
        </div>
      </div>
    </div>
  )
}
