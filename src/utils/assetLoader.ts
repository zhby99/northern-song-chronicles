import { useEffect, useState, useSyncExternalStore } from 'react'
import rawManifest from '../data/assetManifest.json'
import type { AssetManifestData } from '../types/game'

export const ASSET_MANIFEST = rawManifest as AssetManifestData

/**
 * Maximum unreferenced (refCount === 0) images kept warm for instant 1-step back navigation.
 * Any older unmounted panoramas / portraits beyond these caps have `URL.revokeObjectURL()`
 * called automatically to release Blob & decoded texture memory.
 */
export const MAX_IDLE_IMAGE_ENTRIES = 4
export const MAX_IDLE_IMAGE_BYTES = Math.round(1.2 * 1024 * 1024)
const UNMOUNT_GRACE_MS = 180

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

interface ManagedAssetEntry {
  url: string
  objectUrl: string
  isBlobUrl: boolean
  bytes: number
  refCount: number
  releaseTimer: number | null
}

export interface AudioBufferMemoryInfo {
  cachedCount: number
  maxCap: number
  pcmBytes: number
  evictedCount: number
  cachedUrls: string[]
}

export interface ResidentAssetItem {
  url: string
  bytes: number
  refCount: number
}

export interface AssetTelemetrySnapshot {
  /** Historical unique asset paths loaded at least once in this session */
  loadedCount: number
  loadedBytes: number
  loadedUrls: string[]
  /** Live in-memory managed image pool stats */
  residentImageCount: number
  activePinnedImageCount: number
  residentImageBytes: number
  residentImages: ResidentAssetItem[]
  evictedImageCount: number
  evictedImageBytes: number
  /** Live Web Audio decoded PCM AudioBuffer pool stats */
  audioCachedCount: number
  audioMaxCap: number
  audioPcmBytes: number
  audioEvictedCount: number
  audioCachedUrls: string[]
}

const loadedUrls = new Set<string>()
let loadedBytesTotal = 0

const managedAssets = new Map<string, ManagedAssetEntry>()
const pendingRefCounts = new Map<string, number>()
const inflightFetches = new Map<string, Promise<ManagedAssetEntry>>()

let evictedImageCount = 0
let evictedImageBytes = 0

let audioMemoryInfo: AudioBufferMemoryInfo = {
  cachedCount: 0,
  maxCap: 3,
  pcmBytes: 0,
  evictedCount: 0,
  cachedUrls: [],
}

let idleAudioPurger: (() => number) | null = null
const listeners = new Set<() => void>()

function buildTelemetrySnapshot(): AssetTelemetrySnapshot {
  let residentImageBytes = 0
  let activePinnedImageCount = 0
  const residentImages: ResidentAssetItem[] = []

  for (const entry of managedAssets.values()) {
    residentImageBytes += entry.bytes
    if (entry.refCount > 0) activePinnedImageCount += 1
    residentImages.push({
      url: entry.url,
      bytes: entry.bytes,
      refCount: entry.refCount,
    })
  }

  return {
    loadedCount: loadedUrls.size,
    loadedBytes: loadedBytesTotal,
    loadedUrls: Array.from(loadedUrls),
    residentImageCount: managedAssets.size,
    activePinnedImageCount,
    residentImageBytes,
    residentImages,
    evictedImageCount,
    evictedImageBytes,
    audioCachedCount: audioMemoryInfo.cachedCount,
    audioMaxCap: audioMemoryInfo.maxCap,
    audioPcmBytes: audioMemoryInfo.pcmBytes,
    audioEvictedCount: audioMemoryInfo.evictedCount,
    audioCachedUrls: audioMemoryInfo.cachedUrls,
  }
}

let cachedSnapshot: AssetTelemetrySnapshot = buildTelemetrySnapshot()

function emitChange() {
  cachedSnapshot = buildTelemetrySnapshot()
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

export function reportAudioBufferTelemetry(info: AudioBufferMemoryInfo) {
  audioMemoryInfo = info
  emitChange()
}

export function registerIdleAudioPurger(fn: () => number) {
  idleAudioPurger = fn
}

export function isAssetCached(url: string | null | undefined): boolean {
  if (!url) return false
  return managedAssets.has(url)
}

export function peekManagedAssetUrl(url: string | null | undefined): string | null {
  if (!url) return null
  return managedAssets.get(url)?.objectUrl ?? null
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

function evictIdleManagedAssets(forceZeroIdle = false): number {
  const maxEntries = forceZeroIdle ? 0 : MAX_IDLE_IMAGE_ENTRIES
  const maxBytes = forceZeroIdle ? 0 : MAX_IDLE_IMAGE_BYTES

  let idleCount = 0
  let idleBytes = 0
  for (const entry of managedAssets.values()) {
    if (entry.refCount === 0) {
      if (forceZeroIdle && entry.releaseTimer !== null && typeof window !== 'undefined') {
        window.clearTimeout(entry.releaseTimer)
        entry.releaseTimer = null
      }
      if (entry.releaseTimer === null) {
        idleCount += 1
        idleBytes += entry.bytes
      }
    }
  }

  let freed = 0
  for (const [key, entry] of managedAssets.entries()) {
    if (idleCount <= maxEntries && idleBytes <= maxBytes) break
    if (entry.refCount > 0 || entry.releaseTimer !== null) continue

    if (entry.isBlobUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
      URL.revokeObjectURL(entry.objectUrl)
    }
    managedAssets.delete(key)
    idleCount -= 1
    idleBytes -= entry.bytes
    evictedImageCount += 1
    evictedImageBytes += entry.bytes
    freed += 1
  }

  return freed
}

/**
 * Manually purge 100% of currently unmounted image ObjectURLs and non-playing decoded AudioBuffers.
 * Active on-screen images (`refCount > 0`) and the currently playing BGM track remain untouched.
 */
export function purgeAllIdleResources(): { freedImages: number; freedAudioTracks: number } {
  const freedImages = evictIdleManagedAssets(true)
  const freedAudioTracks = idleAudioPurger ? idleAudioPurger() : 0
  if (freedImages > 0 || freedAudioTracks > 0) {
    emitChange()
  }
  return { freedImages, freedAudioTracks }
}

function loadManagedEntry(url: string): Promise<ManagedAssetEntry> {
  const existingInflight = inflightFetches.get(url)
  if (existingInflight) return existingInflight

  const promise = (async (): Promise<ManagedAssetEntry> => {
    const packed = typeof window !== 'undefined' ? window.__NSC_ASSET_PACK__?.[url] : undefined
    const fallbackBytes = assetBytesIndex.get(url) ?? 115000

    let objectUrl: string
    let isBlobUrl = false
    let bytes = fallbackBytes

    if (packed) {
      objectUrl = packed
    } else {
      const res = await fetch(resolveAssetUrl(url))
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} loading asset ${url}`)
      }
      const blob = await res.blob()
      bytes = blob.size || fallbackBytes
      objectUrl = URL.createObjectURL(blob)
      isBlobUrl = true
    }

    const initialRefs = pendingRefCounts.get(url) ?? 0
    pendingRefCounts.delete(url)

    const entry: ManagedAssetEntry = {
      url,
      objectUrl,
      isBlobUrl,
      bytes,
      refCount: initialRefs,
      releaseTimer: null,
    }

    managedAssets.set(url, entry)
    if (!loadedUrls.has(url)) {
      loadedUrls.add(url)
      loadedBytesTotal += bytes
    }

    if (entry.refCount === 0) {
      evictIdleManagedAssets(false)
    }
    emitChange()
    return entry
  })().finally(() => {
    inflightFetches.delete(url)
  })

  inflightFetches.set(url, promise)
  return promise
}

export function acquireManagedAsset(url: string): Promise<string> {
  const existing = managedAssets.get(url)
  if (existing) {
    if (existing.releaseTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(existing.releaseTimer)
      existing.releaseTimer = null
    }
    existing.refCount += 1
    // Refresh LRU position to newest
    managedAssets.delete(url)
    managedAssets.set(url, existing)
    emitChange()
    return Promise.resolve(existing.objectUrl)
  }

  pendingRefCounts.set(url, (pendingRefCounts.get(url) ?? 0) + 1)
  return loadManagedEntry(url).then((entry) => entry.objectUrl)
}

export function releaseManagedAsset(url: string) {
  const existing = managedAssets.get(url)
  if (!existing) {
    const prev = pendingRefCounts.get(url) ?? 0
    if (prev <= 1) pendingRefCounts.delete(url)
    else pendingRefCounts.set(url, prev - 1)
    return
  }

  existing.refCount = Math.max(0, existing.refCount - 1)
  // Refresh LRU recency on release so most-recently-viewed stays warmest
  managedAssets.delete(url)
  managedAssets.set(url, existing)

  if (existing.refCount === 0 && typeof window !== 'undefined') {
    if (existing.releaseTimer !== null) {
      window.clearTimeout(existing.releaseTimer)
    }
    existing.releaseTimer = window.setTimeout(() => {
      existing.releaseTimer = null
      if (existing.refCount === 0) {
        evictIdleManagedAssets(false)
        emitChange()
      }
    }, UNMOUNT_GRACE_MS)
  }

  emitChange()
}

export function preloadImage(url: string): Promise<void> {
  if (!url || managedAssets.has(url)) {
    return Promise.resolve()
  }
  return loadManagedEntry(url).then(() => undefined)
}

export type LazyImageStatus = 'idle' | 'loading' | 'loaded' | 'error'

export function useLazyImage(url: string | null | undefined): {
  status: LazyImageStatus
  loadedUrl: string | null
} {
  const [resolved, setResolved] = useState<{
    sourceUrl: string | null
    objectUrl: string | null
    status: LazyImageStatus
  }>(() => {
    const warm = peekManagedAssetUrl(url)
    return warm && url
      ? { sourceUrl: url, objectUrl: warm, status: 'loaded' }
      : { sourceUrl: url ?? null, objectUrl: null, status: url ? 'loading' : 'idle' }
  })

  useEffect(() => {
    if (!url) return
    let cancelled = false

    acquireManagedAsset(url)
      .then((objectUrl) => {
        if (!cancelled) {
          setResolved({ sourceUrl: url, objectUrl, status: 'loaded' })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResolved({ sourceUrl: url, objectUrl: null, status: 'error' })
        }
      })

    return () => {
      cancelled = true
      releaseManagedAsset(url)
    }
  }, [url])

  if (!url) return { status: 'idle', loadedUrl: null }
  if (resolved.sourceUrl === url && resolved.status === 'loaded' && resolved.objectUrl) {
    return { status: 'loaded', loadedUrl: resolved.objectUrl }
  }
  const warmUrl = peekManagedAssetUrl(url)
  if (warmUrl) {
    return { status: 'loaded', loadedUrl: warmUrl }
  }
  if (resolved.sourceUrl === url && resolved.status === 'error') {
    return { status: 'error', loadedUrl: null }
  }
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
