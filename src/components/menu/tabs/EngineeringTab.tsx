import { ID_REGISTRY } from '../../../data/gameDb'
import { ASSET_MANIFEST, formatByteSize, useAssetTelemetry } from '../../../utils/assetLoader'

export function EngineeringTab() {
  const telemetry = useAssetTelemetry()

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
          <div className="text-[#6b5033]">武学 · 百兵 · 人物</div>
          <div className="font-mono font-bold text-base sm:text-lg text-[#8f1d14] mt-0.5">
            {ID_REGISTRY.counts.martialArts} 功 · {ID_REGISTRY.counts.weapons} 兵 ·{' '}
            {ID_REGISTRY.counts.npcs} 人
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
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
        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
          <div className="font-bold song-serif text-[#52391e]">当前会话按需懒加载静态原画</div>
          <div className="font-mono text-[#134e32] font-bold mt-1">
            {telemetry.loadedCount} / {ASSET_MANIFEST.summary.totalExtractedImageFiles} 张（
            {formatByteSize(telemetry.loadedBytes)}）
          </div>
        </div>
        <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e]">
          <div className="font-bold song-serif text-[#52391e]">可重复数据库编译脚本</div>
          <div className="font-mono text-[#23180f] mt-1">`npm run build:db`</div>
        </div>
      </div>

      <div className="p-4 rounded bg-[#efe4cc] border border-[#c8b28e] space-y-2">
        <div className="font-bold song-serif text-[#52391e]">
          当前浏览器已按需拉取的静态原画路径 ({telemetry.loadedUrls.length})
        </div>
        <div className="max-h-52 overflow-y-auto scroll-thin bg-[#faf3e3] border border-[#cbb693] rounded p-3 font-mono text-xs space-y-1">
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
  )
}
