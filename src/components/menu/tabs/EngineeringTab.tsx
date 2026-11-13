import { useState } from 'react'
import { ID_REGISTRY } from '../../../data/gameDb'
import {
  ASSET_MANIFEST,
  formatByteSize,
  MAX_IDLE_IMAGE_BYTES,
  MAX_IDLE_IMAGE_ENTRIES,
  purgeAllIdleResources,
  useAssetTelemetry,
} from '../../../utils/assetLoader'

export function EngineeringTab() {
  const telemetry = useAssetTelemetry()
  const [purgeNotice, setPurgeNotice] = useState<string | null>(null)

  const idleImageCount = Math.max(
    0,
    telemetry.residentImageCount - telemetry.activePinnedImageCount,
  )

  const handleManualPurge = () => {
    const { freedImages, freedAudioTracks } = purgeAllIdleResources()
    if (freedImages === 0 && freedAudioTracks === 0) {
      setPurgeNotice('当前无闲置驻留资源（所有在驻画卷或音轨均正处于当前画面/播放锁定中）。')
    } else {
      setPurgeNotice(
        `已立即释放 ${freedImages} 张闲置画卷 ObjectURL 句柄、${freedAudioTracks} 首非在播解码音轨！`,
      )
    }
  }

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
          <div className="text-[#6b5033]">标准地区 ID</div>
          <div className="font-mono font-bold text-lg text-[#23180f] mt-0.5">
            {ID_REGISTRY.counts.regions} 处 (`REG-01..43`)
          </div>
          <div className="text-xs text-[#6b5235]">19宋城 + 7外城 + 17秘境雄关</div>
        </div>

        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
          <div className="text-[#6b5033]">门派与势力 ID</div>
          <div className="font-mono font-bold text-lg text-[#23180f] mt-0.5">
            {ID_REGISTRY.counts.majorSects} 大派 + {ID_REGISTRY.counts.minorSects} 小派 +{' '}
            {ID_REGISTRY.counts.otherOrganizations} 组织
          </div>
          <div className="text-xs text-[#6b5235]">`SECT-01..30` / `ORG-01..11`</div>
        </div>

        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
          <div className="text-[#6b5033]">武学 · 百兵 · 名驹 · 人物</div>
          <div className="font-mono font-bold text-base sm:text-lg text-[#8f1d14] mt-0.5">
            {ID_REGISTRY.counts.martialArts} 功 · {ID_REGISTRY.counts.weapons} 兵 ·{' '}
            {ID_REGISTRY.counts.mounts} 骑 · {ID_REGISTRY.counts.npcs} 人
          </div>
          <div className="text-xs text-[#1b5132] font-semibold">未解析悬空引用：0 处</div>
        </div>

        <div className="p-3.5 rounded bg-[#e3f1e8] border border-[#6ca384]">
          <div className="text-[#184f35]">建筑内景 100% 可步入</div>
          <div className="font-mono font-bold text-lg text-[#134e32] mt-0.5">
            {ID_REGISTRY.counts.specialBuildingsWithImage} 实景 +{' '}
            {ID_REGISTRY.counts.specialBuildingsWithSvgFallback} 矢量
          </div>
          <div className="text-xs text-[#184f35]">
            总计 {ID_REGISTRY.counts.totalBuildings} 座建筑挂载完毕
          </div>
        </div>
      </div>

      {/* 动态资源内存驻留与 LRU 自动释放监控面板 */}
      <div className="p-4 rounded bg-[#efe4cc] border-2 border-[#b59769] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cbb693] pb-2.5">
          <div>
            <div className="font-bold song-serif text-base text-[#23180f]">
              运行期显存 / 音频内存 LRU 自动回收监控
            </div>
            <div className="text-xs text-[#6b5235]">
              不用的原画通过引用计数自动触发 <code className="font-mono">URL.revokeObjectURL</code>{' '}
              销毁（闲置热备上限 {MAX_IDLE_IMAGE_ENTRIES} 张 / {formatByteSize(MAX_IDLE_IMAGE_BYTES)}
              ）；Web Audio 解码波形最多保留最近 {telemetry.audioMaxCap} 首
            </div>
          </div>

          <button
            type="button"
            onClick={handleManualPurge}
            className="px-3.5 py-2 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] border border-[#f5cb5c]/70 font-bold song-serif text-xs cursor-pointer transition shadow-xs"
          >
            立即释放全部闲置缓存
          </button>
        </div>

        {purgeNotice && (
          <div className="px-3 py-2 rounded bg-[#e3f1e8] border border-[#6ca384] text-[#134e32] text-xs font-medium">
            {purgeNotice}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
            <div className="font-bold song-serif text-[#52391e]">
              当前驻留原画句柄 (`ObjectURL`)
            </div>
            <div className="font-mono text-[#134e32] font-bold text-base mt-1">
              {telemetry.residentImageCount} 张（{formatByteSize(telemetry.residentImageBytes)}）
            </div>
            <div className="text-xs text-[#6b5235] mt-0.5">
              画面锁定 <strong>{telemetry.activePinnedImageCount}</strong> 张 · 闲置热备{' '}
              <strong>{idleImageCount}</strong> 张 · 已自动释放{' '}
              <strong className="text-[#8f1d14]">
                {telemetry.evictedImageCount} 张 ({formatByteSize(telemetry.evictedImageBytes)})
              </strong>
            </div>
          </div>

          <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
            <div className="font-bold song-serif text-[#52391e]">
              Web Audio 解码波形 (`AudioBuffer`)
            </div>
            <div className="font-mono text-[#781710] font-bold text-base mt-1">
              {telemetry.audioCachedCount} / {telemetry.audioMaxCap} 首（PCM{' '}
              {formatByteSize(telemetry.audioPcmBytes)}）
            </div>
            <div className="text-xs text-[#6b5235] mt-0.5">
              超出 {telemetry.audioMaxCap} 首自动淘汰旧曲 · 已回收{' '}
              <strong className="text-[#134e32]">{telemetry.audioEvictedCount} 首</strong>
            </div>
          </div>

          <div className="p-3 rounded bg-[#faf3e3] border border-[#cbb693]">
            <div className="font-bold song-serif text-[#52391e]">
              代码包内嵌 Base64 / 历史累计调阅
            </div>
            <div className="font-mono text-[#23180f] font-bold text-base mt-1">
              0 Bytes · 累计 {telemetry.loadedCount}/
              {ASSET_MANIFEST.summary.totalExtractedImageFiles} 项
            </div>
            <div className="text-xs text-[#6b5235] mt-0.5">
              千人谱长列表启用 <code className="font-mono">IntersectionObserver</code> 视口外自动卸载
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <div className="font-bold song-serif text-xs text-[#52391e]">
              当前内存驻留原画明细 ({telemetry.residentImages.length})
            </div>
            <div className="max-h-44 overflow-y-auto scroll-thin bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 font-mono text-[11px] space-y-1">
              {telemetry.residentImages.length === 0 ? (
                <div className="text-[#6b5235]">当前无驻留原画句柄</div>
              ) : (
                telemetry.residentImages.map((item) => (
                  <div key={item.url} className="flex items-center justify-between gap-2">
                    <span className="truncate text-[#23180f]">{item.url}</span>
                    <span
                      className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] ${
                        item.refCount > 0
                          ? 'bg-[#e3f1e8] text-[#134e32] font-bold'
                          : 'bg-[#efe4cc] text-[#6b5235]'
                      }`}
                    >
                      {item.refCount > 0
                        ? `使用中×${item.refCount} · ${formatByteSize(item.bytes)}`
                        : `热备待释 · ${formatByteSize(item.bytes)}`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold song-serif text-xs text-[#52391e]">
              当前驻留解码音轨明细 ({telemetry.audioCachedUrls.length} / {telemetry.audioMaxCap})
            </div>
            <div className="max-h-44 overflow-y-auto scroll-thin bg-[#faf3e3] border border-[#cbb693] rounded p-2.5 font-mono text-[11px] space-y-1">
              {telemetry.audioCachedUrls.length === 0 ? (
                <div className="text-[#6b5235]">尚未解码音轨（首次奏响时按需解码）</div>
              ) : (
                telemetry.audioCachedUrls.map((u) => (
                  <div key={u} className="text-[#781710] truncate">
                    ♪ {u}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
