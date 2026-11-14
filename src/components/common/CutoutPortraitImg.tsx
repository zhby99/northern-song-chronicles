import type { CSSProperties } from 'react'
import cutoutMetricsJson from '../../data/cutoutMetrics.json'
import { useLazyImage } from '../../utils/assetLoader'

const CUTOUT_HEIGHT_PCT_BY_URL: Record<string, number> = cutoutMetricsJson
const DEFAULT_CUTOUT_HEIGHT_PCT = 88

/**
 * Maps a fullbody or template portrait URL (`/assets/characters/{fullbody,templates}/<name>.jpg`)
 * to its AI-segmented transparent foreground WebP (`/assets/characters/cutouts/{fullbody,templates}/<name>.webp`),
 * so painted Song-style room/landscape backgrounds are completely stripped before compositing
 * onto the active region or building scene.
 */
function resolveCutoutPortraitUrl(portraitUrl: string | null | undefined): {
  targetUrl: string | null
  isCutout: boolean
} {
  if (!portraitUrl) return { targetUrl: null, isCutout: false }
  if (portraitUrl.includes('/assets/characters/cutouts/')) {
    return { targetUrl: portraitUrl, isCutout: true }
  }
  const match = /^\/assets\/characters\/(fullbody|templates|protagonists)\/([^/.]+)\.[a-z0-9]+$/i.exec(
    portraitUrl,
  )
  if (match) {
    const cutoutCandidate = `/assets/characters/cutouts/${match[1]}/${match[2]}.webp`
    if (Object.prototype.hasOwnProperty.call(CUTOUT_HEIGHT_PCT_BY_URL, cutoutCandidate)) {
      return { targetUrl: cutoutCandidate, isCutout: true }
    }
  }
  return { targetUrl: portraitUrl, isCutout: false }
}

interface CutoutPortraitImgProps {
  url: string
  alt: string
  className?: string
  style?: CSSProperties
}

export function CutoutPortraitImg({ url, alt, className, style }: CutoutPortraitImgProps) {
  const { targetUrl, isCutout } = resolveCutoutPortraitUrl(url)
  const primary = useLazyImage(targetUrl)
  const fallback = useLazyImage(
    primary.status === 'error' && targetUrl !== url ? url : null,
  )

  const usingFallback = primary.status === 'error' && targetUrl !== url
  const loadedUrl = usingFallback ? fallback.loadedUrl : primary.loadedUrl
  const effectiveIsCutout = usingFallback ? false : isCutout

  if (!loadedUrl) {
    return (
      <div
        aria-label={alt}
        className="w-52 h-[56vh] flex items-center justify-center text-xs song-serif text-[#f5dfb5]/70 animate-pulse"
      >
        正在迎候人物……
      </div>
    )
  }

  const heightPct = effectiveIsCutout
    ? ((targetUrl ? CUTOUT_HEIGHT_PCT_BY_URL[targetUrl] : undefined) ?? DEFAULT_CUTOUT_HEIGHT_PCT)
    : 82

  return (
    <img
      src={loadedUrl}
      alt={alt}
      className={`${className ?? ''}${effectiveIsCutout ? '' : ' rounded-xl border border-[#8c6e46]/55'}`.trim()}
      style={{
        height: `${heightPct}%`,
        width: 'auto',
        maxWidth: '88vw',
        ...style,
      }}
      decoding="async"
    />
  )
}
