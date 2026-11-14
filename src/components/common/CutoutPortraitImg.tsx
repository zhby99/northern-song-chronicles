import { useEffect, useState } from 'react'

const cutoutCache = new Map<string, string>()

function colorDist(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
): number {
  const dr = r1 - r2
  const dg = g1 - g2
  const db = b1 - b2
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

/**
 * 从立绘 JPG 中自动抠出人物主体（基于四边像素采样 + 边缘连通域泛洪去背 + 边缘羽化），
 * 去除立绘自带的宣纸/底色背景，保留人物轮廓内部浅色衣饰。
 */
async function removePortraitBackground(url: string): Promise<string> {
  const cached = cutoutCache.get(url)
  if (cached) return cached

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const w = img.naturalWidth
        const h = img.naturalHeight
        if (!w || !h) {
          resolve(url)
          return
        }

        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          resolve(url)
          return
        }

        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, w, h)
        const data = imageData.data

        // 1. 采样四边像素，计算背景基准色（取中位数避免局部装饰干扰）
        const sampleR: number[] = []
        const sampleG: number[] = []
        const sampleB: number[] = []
        const stepX = Math.max(1, Math.floor(w / 40))
        const stepY = Math.max(1, Math.floor(h / 40))

        for (let x = 0; x < w; x += stepX) {
          const topIdx = x * 4
          sampleR.push(data[topIdx])
          sampleG.push(data[topIdx + 1])
          sampleB.push(data[topIdx + 2])
        }
        for (let y = 0; y < h; y += stepY) {
          const leftIdx = y * w * 4
          const rightIdx = (y * w + (w - 1)) * 4
          sampleR.push(data[leftIdx], data[rightIdx])
          sampleG.push(data[leftIdx + 1], data[rightIdx + 1])
          sampleB.push(data[leftIdx + 2], data[rightIdx + 2])
        }

        sampleR.sort((a, b) => a - b)
        sampleG.sort((a, b) => a - b)
        sampleB.sort((a, b) => a - b)
        const mid = Math.floor(sampleR.length / 2)
        const bgR = sampleR[mid] ?? 235
        const bgG = sampleG[mid] ?? 225
        const bgB = sampleB[mid] ?? 205

        // 2. 从四边像素出发做 BFS 连通域泛洪去背
        const total = w * h
        const visited = new Uint8Array(total)
        const queue = new Int32Array(total)
        let head = 0
        let tail = 0

        const hardThresh = 46
        const softThresh = 74

        const tryPush = (idx: number) => {
          if (visited[idx]) return
          const p = idx * 4
          const dist = colorDist(data[p], data[p + 1], data[p + 2], bgR, bgG, bgB)
          if (dist <= softThresh) {
            visited[idx] = 1
            queue[tail++] = idx
          }
        }

        for (let x = 0; x < w; x++) {
          tryPush(x)
          tryPush((h - 1) * w + x)
        }
        for (let y = 1; y < h - 1; y++) {
          tryPush(y * w)
          tryPush(y * w + (w - 1))
        }

        while (head < tail) {
          const idx = queue[head++]
          const p = idx * 4
          const dist = colorDist(data[p], data[p + 1], data[p + 2], bgR, bgG, bgB)

          if (dist <= hardThresh) {
            data[p + 3] = 0
          } else {
            // 边缘羽化过渡
            const ratio = (dist - hardThresh) / (softThresh - hardThresh)
            data[p + 3] = Math.round(data[p + 3] * Math.min(1, Math.max(0, ratio)))
          }

          // 仅当当前像素足够接近背景时才继续向内部扩散
          if (dist <= hardThresh + 12) {
            const x = idx % w
            const y = (idx - x) / w
            if (x > 0) tryPush(idx - 1)
            if (x < w - 1) tryPush(idx + 1)
            if (y > 0) tryPush(idx - w)
            if (y < h - 1) tryPush(idx + w)
          }
        }

        ctx.putImageData(imageData, 0, 0)
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve(url)
            return
          }
          const objUrl = URL.createObjectURL(blob)
          cutoutCache.set(url, objUrl)
          resolve(objUrl)
        }, 'image/png')
      } catch {
        resolve(url)
      }
    }
    img.onerror = () => resolve(url)
    img.src = url
  })
}

interface CutoutPortraitImgProps {
  url: string
  alt: string
  className?: string
}

export function CutoutPortraitImg({ url, alt, className }: CutoutPortraitImgProps) {
  const [processed, setProcessed] = useState<{ src: string; cutout: string } | null>(null)
  const cached = cutoutCache.get(url)

  useEffect(() => {
    if (cached) return
    let cancelled = false
    void removePortraitBackground(url).then((res) => {
      if (!cancelled) setProcessed({ src: url, cutout: res })
    })
    return () => {
      cancelled = true
    }
  }, [url, cached])

  const displayUrl = cached ?? (processed?.src === url ? processed.cutout : url)

  return <img src={displayUrl} alt={alt} className={className} decoding="async" />
}
