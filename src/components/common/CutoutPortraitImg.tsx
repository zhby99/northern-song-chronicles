import { useLazyImage } from '../../utils/assetLoader'

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
}

export function CutoutPortraitImg({ url, alt, className }: CutoutPortraitImgProps) {
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

  return <img src={loadedUrl} alt={alt} className={className} decoding="async" />
}
