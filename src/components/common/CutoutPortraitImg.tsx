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
function resolveCutoutPortraitUrl(portraitUrl: string | null | undefined): string | null {
  if (!portraitUrl) return null
  if (portraitUrl.includes('/assets/characters/cutouts/')) {
    return portraitUrl
  }
  const match = /^\/assets\/characters\/(fullbody|templates)\/([^/.]+)\.[a-z0-9]+$/i.exec(
    portraitUrl,
  )
  if (match) {
    return `/assets/characters/cutouts/${match[1]}/${match[2]}.webp`
  }
  return null
}

interface CutoutPortraitImgProps {
  url: string
  alt: string
  className?: string
  style?: CSSProperties
}

export function CutoutPortraitImg({ url, alt, className, style }: CutoutPortraitImgProps) {
  const cutoutUrl = resolveCutoutPortraitUrl(url)
  const { loadedUrl } = useLazyImage(cutoutUrl)

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

  const heightPct =
    (cutoutUrl ? CUTOUT_HEIGHT_PCT_BY_URL[cutoutUrl] : undefined) ?? DEFAULT_CUTOUT_HEIGHT_PCT

  return (
    <img
      src={loadedUrl}
      alt={alt}
      className={className}
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
