import { useSyncExternalStore } from 'react'
import audioManifest, { type VirtualAudioTrackEntry } from 'virtual:audio-manifest'
import { REGION_DB_MAP } from '../data/gameDb'
import type { ViewMode } from '../types/game'
import { recordAssetLoaded, resolveAssetUrl } from './assetLoader'

export type BgmCategoryKey = 'world' | 'regions' | 'characters' | 'events'

export interface BgmPlaylistItem {
  url: string
  fileName: string
  stem: string
  order: number
  bytes: number
  label: string
}

export interface BgmPlaylistContext {
  playlistKey: string
  category: BgmCategoryKey
  sceneTitle: string
  sceneSubtitle: string
  isFallbackToWorld: boolean
  tracks: BgmPlaylistItem[]
}

const CN_NUMERALS = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']

function formatTrackOrdinal(idxZeroBased: number, stem: string): string {
  const n = idxZeroBased + 1
  if (/^\d+$/.test(stem)) {
    const cn = n <= 10 ? CN_NUMERALS[n] : String(n)
    return `第${cn}曲 (${stem})`
  }
  return `第${n}曲 · ${stem}`
}

function toPlaylistItems(entries: VirtualAudioTrackEntry[]): BgmPlaylistItem[] {
  return entries.map((entry, idx) => ({
    ...entry,
    label: formatTrackOrdinal(idx, entry.stem),
  }))
}

export function resolveBgmPlaylistForState(params: {
  viewMode: ViewMode
  activeRegionId: string
  overrideCharacterId?: string | null
  overrideEventId?: string | null
}): BgmPlaylistContext {
  const { viewMode, activeRegionId, overrideCharacterId, overrideEventId } = params

  // 1. Highest priority: Event BGM override (if active and has files in events/<eventId>)
  if (overrideEventId) {
    const evTracks = audioManifest.events[overrideEventId] ?? []
    if (evTracks.length > 0) {
      return {
        playlistKey: `events:${overrideEventId}`,
        category: 'events',
        sceneTitle: `事件配乐 · ${overrideEventId}`,
        sceneSubtitle: `按序轮播 (${evTracks.length} 首)`,
        isFallbackToWorld: false,
        tracks: toPlaylistItems(evTracks),
      }
    }
  }

  // 2. Character BGM override (if active and has files in characters/<characterId>)
  if (overrideCharacterId) {
    const chTracks = audioManifest.characters[overrideCharacterId] ?? []
    if (chTracks.length > 0) {
      return {
        playlistKey: `characters:${overrideCharacterId}`,
        category: 'characters',
        sceneTitle: `人物配乐 · ${overrideCharacterId}`,
        sceneSubtitle: `按序轮播 (${chTracks.length} 首)`,
        isFallbackToWorld: false,
        tracks: toPlaylistItems(chTracks),
      }
    }
  }

  // 3. Region / Building view: play regions/<activeRegionId>/1, 2, 3... if available
  const worldTracks = toPlaylistItems(audioManifest.world)
  if (viewMode === 'region' || viewMode === 'building') {
    const regionName = REGION_DB_MAP[activeRegionId]?.name ?? activeRegionId
    const regEntries = audioManifest.regions[activeRegionId] ?? []
    if (regEntries.length > 0) {
      return {
        playlistKey: `regions:${activeRegionId}`,
        category: 'regions',
        sceneTitle: `${regionName}配乐`,
        sceneSubtitle: `地区专属曲库 · 共 ${regEntries.length} 首按序轮播`,
        isFallbackToWorld: false,
        tracks: toPlaylistItems(regEntries),
      }
    }

    // Fallback cleanly to World Map BGM if this region has no tracks yet
    return {
      playlistKey: 'world',
      category: 'world',
      sceneTitle: '山海舆图配乐',
      sceneSubtitle: `${regionName}暂未置入专属曲目 · 沿用大地图曲库 (${worldTracks.length} 首)`,
      isFallbackToWorld: true,
      tracks: worldTracks,
    }
  }

  // 4. World Map view: play world/1, 2, 3... in order
  return {
    playlistKey: 'world',
    category: 'world',
    sceneTitle: '大地图背景乐',
    sceneSubtitle: `天下舆图曲库 · 共 ${worldTracks.length} 首按序轮播`,
    isFallbackToWorld: false,
    tracks: worldTracks,
  }
}

const STORAGE_KEY_VOLUME = 'nsc_bgm_volume_v1'
const STORAGE_KEY_ENABLED = 'nsc_bgm_enabled_v1'

export interface BgmSnapshot {
  playlist: BgmPlaylistContext
  trackIndex: number
  enabled: boolean
  isPlaying: boolean
  awaitingGesture: boolean
  volume: number
  currentTime: number
  duration: number
}

function readInitialVolume(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VOLUME)
    if (raw !== null) {
      const parsed = Number(raw)
      if (!Number.isNaN(parsed)) {
        return Math.min(1, Math.max(0, parsed))
      }
    }
  } catch {
    // ignore
  }
  return 0.55
}

function readInitialEnabled(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENABLED)
    if (raw === '0' || raw === 'false') return false
  } catch {
    // ignore
  }
  return true
}

let audioEl: HTMLAudioElement | null = null
let gestureListenersBound = false
let overrideCharacterId: string | null = null
let overrideEventId: string | null = null
let lastSceneParams: { viewMode: ViewMode; activeRegionId: string } = {
  viewMode: 'region',
  activeRegionId: 'bianliang',
}
// Remember where the player left off in each playlist (optional resume index, starts at 0 = track 1)
const playlistLastIndex = new Map<string, number>()

const listeners = new Set<() => void>()

let snapshot: BgmSnapshot = {
  playlist: resolveBgmPlaylistForState({ viewMode: 'region', activeRegionId: 'bianliang' }),
  trackIndex: 0,
  enabled: readInitialEnabled(),
  isPlaying: false,
  awaitingGesture: false,
  volume: readInitialVolume(),
  currentTime: 0,
  duration: 0,
}

function emit() {
  snapshot = { ...snapshot }
  for (const fn of listeners) {
    fn()
  }
}

export function getActiveTrackItem(snap: BgmSnapshot = snapshot): BgmPlaylistItem | null {
  if (snap.playlist.tracks.length === 0) return null
  const safeIdx = Math.min(snap.playlist.tracks.length - 1, Math.max(0, snap.trackIndex))
  return snap.playlist.tracks[safeIdx] ?? null
}

function loadCurrentTrackIntoAudio(autoPlayIfEnabled: boolean) {
  const el = ensureAudioElement()
  const item = getActiveTrackItem()
  if (!el) return

  if (!item) {
    el.pause()
    el.removeAttribute('src')
    snapshot.isPlaying = false
    snapshot.currentTime = 0
    snapshot.duration = 0
    emit()
    return
  }

  const resolvedSrc = resolveAssetUrl(item.url)
  // Single-track folder loops seamlessly; multi-track folder advances 1 -> 2 -> 3 -> ... -> 1 on 'ended'
  el.loop = snapshot.playlist.tracks.length === 1
  el.volume = snapshot.volume

  if (el.getAttribute('data-track-url') !== item.url) {
    el.setAttribute('data-track-url', item.url)
    el.src = resolvedSrc
    snapshot.currentTime = 0
    snapshot.duration = 0
  }

  if (autoPlayIfEnabled && snapshot.enabled) {
    el.play()
      .then(() => {
        snapshot.isPlaying = true
        snapshot.awaitingGesture = false
        unbindUnlockGesture()
        emit()
      })
      .catch(() => {
        snapshot.isPlaying = false
        snapshot.awaitingGesture = true
        bindUnlockGesture()
        emit()
      })
  } else {
    emit()
  }
}

function ensureAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return null
  if (audioEl) return audioEl

  const el = new Audio()
  el.preload = 'auto'
  el.volume = snapshot.volume

  el.addEventListener('loadeddata', () => {
    const item = getActiveTrackItem()
    if (item) {
      recordAssetLoaded(item.url, item.bytes)
    }
    if (Number.isFinite(el.duration) && el.duration > 0) {
      snapshot.duration = el.duration
      emit()
    }
  })

  el.addEventListener('loadedmetadata', () => {
    if (Number.isFinite(el.duration) && el.duration > 0) {
      snapshot.duration = el.duration
      emit()
    }
  })

  el.addEventListener('play', () => {
    snapshot.isPlaying = true
    snapshot.awaitingGesture = false
    emit()
  })

  el.addEventListener('pause', () => {
    snapshot.isPlaying = false
    emit()
  })

  el.addEventListener('ended', () => {
    // Advance strictly in numerical order 1 -> 2 -> 3 -> ... -> 1
    const count = snapshot.playlist.tracks.length
    if (count <= 1) {
      el.currentTime = 0
      if (snapshot.enabled) {
        void el.play().catch(() => {})
      }
      return
    }
    const nextIdx = (snapshot.trackIndex + 1) % count
    snapshot.trackIndex = nextIdx
    playlistLastIndex.set(snapshot.playlist.playlistKey, nextIdx)
    loadCurrentTrackIntoAudio(true)
  })

  el.addEventListener('timeupdate', () => {
    if (Math.abs(el.currentTime - snapshot.currentTime) >= 0.35 || el.currentTime < 0.4) {
      snapshot.currentTime = el.currentTime
      if (Number.isFinite(el.duration) && el.duration > 0) {
        snapshot.duration = el.duration
      }
      emit()
    }
  })

  audioEl = el
  return el
}

function unbindUnlockGesture() {
  if (!gestureListenersBound || typeof window === 'undefined') return
  gestureListenersBound = false
  window.removeEventListener('pointerdown', handleFirstUserGesture, true)
  window.removeEventListener('keydown', handleFirstUserGesture, true)
}

function handleFirstUserGesture() {
  if (!snapshot.enabled) {
    unbindUnlockGesture()
    return
  }
  const el = ensureAudioElement()
  if (!el || snapshot.playlist.tracks.length === 0) return
  if (!el.getAttribute('data-track-url')) {
    loadCurrentTrackIntoAudio(true)
    return
  }
  el.play()
    .then(() => {
      snapshot.isPlaying = true
      snapshot.awaitingGesture = false
      unbindUnlockGesture()
      emit()
    })
    .catch(() => {
      // wait for next valid gesture
    })
}

function bindUnlockGesture() {
  if (gestureListenersBound || typeof window === 'undefined') return
  gestureListenersBound = true
  window.addEventListener('pointerdown', handleFirstUserGesture, true)
  window.addEventListener('keydown', handleFirstUserGesture, true)
}

/**
 * Sync BGM playlist with current game scene (world vs region/building).
 * When entering a new playlistKey (e.g., switching from Kaifeng `regions:bianliang` to World `world`),
 * starts from Track 1 (index 0) and plays sequentially 1 -> 2 -> 3...
 * Staying within the same playlistKey (e.g., entering a building inside Kaifeng, or moving between two regions that both fallback to `world`) keeps current playback uninterrupted!
 */
export function syncBgmSceneContext(viewMode: ViewMode, activeRegionId: string) {
  lastSceneParams = { viewMode, activeRegionId }
  const nextPlaylist = resolveBgmPlaylistForState({
    viewMode,
    activeRegionId,
    overrideCharacterId,
    overrideEventId,
  })

  const keyChanged = nextPlaylist.playlistKey !== snapshot.playlist.playlistKey
  snapshot.playlist = nextPlaylist

  if (!keyChanged && audioEl && audioEl.getAttribute('data-track-url')) {
    // Only subtitle may have updated (e.g. moving between two fallback regions)
    emit()
    return
  }

  // Always start from Track #1 (index 0) when switching into a new scene/region playlist
  snapshot.trackIndex = 0
  playlistLastIndex.set(nextPlaylist.playlistKey, 0)
  loadCurrentTrackIntoAudio(true)
}

export function setBgmOverride(opts: { characterId?: string | null; eventId?: string | null }) {
  if (opts.characterId !== undefined) overrideCharacterId = opts.characterId
  if (opts.eventId !== undefined) overrideEventId = opts.eventId
  syncBgmSceneContext(lastSceneParams.viewMode, lastSceneParams.activeRegionId)
}

export function selectBgmTrackIndex(index: number) {
  const count = snapshot.playlist.tracks.length
  if (count === 0) return
  const clamped = ((index % count) + count) % count
  snapshot.trackIndex = clamped
  playlistLastIndex.set(snapshot.playlist.playlistKey, clamped)
  if (!snapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  loadCurrentTrackIntoAudio(true)
}

export function playNextBgmTrack() {
  selectBgmTrackIndex(snapshot.trackIndex + 1)
}

export function playPrevBgmTrack() {
  selectBgmTrackIndex(snapshot.trackIndex - 1)
}

export function toggleBgmPlayback() {
  setBgmEnabled(!snapshot.enabled)
}

export function setBgmEnabled(enabled: boolean) {
  snapshot.enabled = enabled
  try {
    localStorage.setItem(STORAGE_KEY_ENABLED, enabled ? '1' : '0')
  } catch {
    // ignore
  }

  const el = ensureAudioElement()
  if (!enabled) {
    snapshot.awaitingGesture = false
    unbindUnlockGesture()
    if (el && !el.paused) {
      el.pause()
    }
    snapshot.isPlaying = false
    emit()
    return
  }

  loadCurrentTrackIntoAudio(true)
}

export function setBgmVolume(volume: number) {
  const clamped = Math.min(1, Math.max(0, volume))
  snapshot.volume = clamped
  try {
    localStorage.setItem(STORAGE_KEY_VOLUME, clamped.toFixed(2))
  } catch {
    // ignore
  }
  if (audioEl) {
    audioEl.volume = clamped
  }
  if (clamped > 0 && !snapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  emit()
}

export function seekBgmTo(timeSec: number) {
  const el = ensureAudioElement()
  if (!el || snapshot.playlist.tracks.length === 0) return
  const maxDur = snapshot.duration > 0 ? snapshot.duration - 0.1 : timeSec
  const target = Math.max(0, Math.min(maxDur, timeSec))
  el.currentTime = target
  snapshot.currentTime = target
  if (!snapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  if (el.paused) {
    void el.play().catch(() => {
      snapshot.awaitingGesture = true
      bindUnlockGesture()
    })
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): BgmSnapshot {
  return snapshot
}

export function useBgmState(): BgmSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot)
}

export function formatAudioTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const total = Math.floor(sec)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function getAudioCatalogSummary() {
  const regionCountWithMusic = Object.keys(audioManifest.regions).length
  const totalRegionTracks = Object.values(audioManifest.regions).reduce(
    (acc, list) => acc + list.length,
    0,
  )
  const totalCharacterTracks = Object.values(audioManifest.characters).reduce(
    (acc, list) => acc + list.length,
    0,
  )
  const totalEventTracks = Object.values(audioManifest.events).reduce(
    (acc, list) => acc + list.length,
    0,
  )
  return {
    worldTracks: audioManifest.world.length,
    regionCountWithMusic,
    totalRegionTracks,
    totalCharacterTracks,
    totalEventTracks,
  }
}
