import {
  type CSSProperties,
  type MouseEventHandler,
  memo,
  useEffect,
  useState,
} from 'react'
import { useLazyImage } from '../../utils/assetLoader'

type VisibilityCallback = (inView: boolean) => void

let sharedObserver: IntersectionObserver | null = null
const observerTargets = new WeakMap<Element, VisibilityCallback>()

function getSharedViewportObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = observerTargets.get(entry.target)
          if (cb) {
            cb(entry.isIntersecting)
          }
        }
      },
      {
        rootMargin: '220px 0px 220px 0px',
        threshold: 0,
      },
    )
  }
  return sharedObserver
}

interface ManagedAssetImgProps {
  url: string | null | undefined
  alt: string
  className?: string
  title?: string
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLElement>
  /**
   * When true, uses a single shared IntersectionObserver to unmount offscreen `<img>`
   * elements and release their ObjectURL reference when scrolled outside the 220px buffer.
   */
  viewportLazy?: boolean
}

export const ManagedAssetImg = memo(function ManagedAssetImg({
  url,
  alt,
  className,
  title,
  style,
  onClick,
  viewportLazy = false,
}: ManagedAssetImgProps) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState<boolean>(() => !viewportLazy)

  useEffect(() => {
    if (!viewportLazy) {
      setInView(true)
      return
    }
    if (!node) return
    const obs = getSharedViewportObserver()
    if (!obs) {
      setInView(true)
      return
    }
    observerTargets.set(node, setInView)
    obs.observe(node)
    return () => {
      observerTargets.delete(node)
      obs.unobserve(node)
    }
  }, [viewportLazy, node])

  const activeUrl = inView ? url : null
  const { loadedUrl } = useLazyImage(activeUrl)

  if (loadedUrl) {
    return (
      <img
        ref={setNode}
        src={loadedUrl}
        alt={alt}
        title={title}
        style={style}
        onClick={onClick}
        decoding="async"
        className={className}
      />
    )
  }

  return (
    <div
      ref={setNode}
      role="img"
      aria-label={alt}
      title={title}
      style={style}
      onClick={onClick}
      className={className}
    />
  )
})
