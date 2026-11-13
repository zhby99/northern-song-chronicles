import { useEffect, useState, useSyncExternalStore } from 'react'
import rawManifest from '../data/assetManifest.json'
import type { AssetManifestData } from '../types/game'

export const ASSET_MANIFEST = rawManifest as AssetManifestData

const assetBytesIndex = new Map<string, number>()
for (const r of ASSET_MANIFEST.regions) {
  assetBytesIndex.set(r.url, r.bytes)
}
for (const b of ASSET_MANIFEST.buildings) {
  assetBytesIndex.set(b.url, b.bytes)
}
for (const t of ASSET_MANIFEST.templates) {
  assetBytesIndex.set(t.url, t.bytes)
}

const loadedUrls = new Set<string>()
let loadedBytesTotal = 0
const inflightRequests = new Map<string, Promise<void>>()
const listeners = new Set<() => void>()

export interface AssetTelemetrySnapshot {
  loadedCount: number
  loadedBytes: number
  loadedUrls: string[]
}

let cachedSnapshot: AssetTelemetrySnapshot = {
  loadedCount: 0,
  loadedBytes: 0,
  loadedUrls: [],
}

function emitChange() {
  cachedSnapshot = {
    loadedCount: loadedUrls.size,
    loadedBytes: loadedBytesTotal,
    loadedUrls: Array.from(loadedUrls),
  }
  for (const fn of listeners) {
    fn()
  }
}

export function recordAssetLoaded(url: string, fallbackBytes = 148000) {
  if (!url || loadedUrls.has(url)) return
  loadedUrls.add(url)
  const knownBytes = assetBytesIndex.get(url) ?? fallbackBytes
  loadedBytesTotal += knownBytes
  emitChange()
}

export function isAssetCached(url: string | null | undefined): boolean {
  if (!url) return false
  return loadedUrls.has(url)
}

declare global {
  interface Window {
    __NSC_ASSET_PACK__?: Record<string, string>
  }
}

export function resolveAssetUrl(url: string): string {
  if (!url) return url
  if (typeof window !== 'undefined' && window.__NSC_ASSET_PACK__?.[url]) {
    return window.__NSC_ASSET_PACK__[url]
  }
  return url
}

export function preloadImage(url: string): Promise<void> {
  if (!url || loadedUrls.has(url)) {
    return Promise.resolve()
  }
  const existing = inflightRequests.get(url)
  if (existing) return existing

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      inflightRequests.delete(url)
      recordAssetLoaded(url)
      resolve()
    }
    img.onerror = () => {
      inflightRequests.delete(url)
      reject(new Error(`Failed to load asset: ${url}`))
    }
    img.src = resolveAssetUrl(url)
  })

  inflightRequests.set(url, promise)
  return promise
}

export type LazyImageStatus = 'idle' | 'loading' | 'loaded' | 'error'

export function useLazyImage(url: string | null | undefined): {
  status: LazyImageStatus
  loadedUrl: string | null
} {
  // Subscribe to loadedUrls updates so component re-renders automatically when preloadImage resolves
  useSyncExternalStore(subscribeTelemetry, getTelemetrySnapshot)
  const [errorUrl, setErrorUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!url || loadedUrls.has(url)) {
      return
    }
    let cancelled = false
    preloadImage(url).catch(() => {
      if (!cancelled) {
        setErrorUrl(url)
      }
    })
    return () => {
      cancelled = true
    }
  }, [url])

  if (!url) return { status: 'idle', loadedUrl: null }
  if (loadedUrls.has(url)) return { status: 'loaded', loadedUrl: resolveAssetUrl(url) }
  if (errorUrl === url) return { status: 'error', loadedUrl: null }
  return { status: 'loading', loadedUrl: null }
}

function subscribeTelemetry(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getTelemetrySnapshot(): AssetTelemetrySnapshot {
  return cachedSnapshot
}

export function useAssetTelemetry(): AssetTelemetrySnapshot {
  return useSyncExternalStore(subscribeTelemetry, getTelemetrySnapshot)
}

export function formatByteSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
