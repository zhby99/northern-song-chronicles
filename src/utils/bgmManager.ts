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

  const worldTracks = toPlaylistItems(audioManifest.world)
  if (viewMode === 'region' || viewMode === 'building') {
    const regionName = REGION_DB_MAP[activeRegionId]?.name ?? activeRegionId
    const regEntries = audioManifest.regions[activeRegionId] ?? []
    if (regEntries.length > 0) {
      return {
        playlistKey: `regions:${activeRegionId}`,
        category: 'regions',
        sceneTitle: `${regionName}配乐`,
        sceneSubtitle:
          regEntries.length === 1
            ? '地区专属配乐 · 无缝单曲循环'
            : `地区专属曲库 · 共 ${regEntries.length} 首按序轮播`,
        isFallbackToWorld: false,
        tracks: toPlaylistItems(regEntries),
      }
    }

    return {
      playlistKey: 'world',
      category: 'world',
      sceneTitle: '山海舆图配乐',
      sceneSubtitle: `${regionName}暂未置入专属曲目 · 沿用大地图无缝循环曲`,
      isFallbackToWorld: true,
      tracks: worldTracks,
    }
  }

  return {
    playlistKey: 'world',
    category: 'world',
    sceneTitle: '大地图背景乐',
    sceneSubtitle:
      worldTracks.length === 1
        ? '天下舆图高潮选段 · 无缝单曲循环'
        : `天下舆图曲库 · 共 ${worldTracks.length} 首按序轮播`,
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

let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null
let activeSource: AudioBufferSourceNode | null = null
let activeBuffer: AudioBuffer | null = null
let activeBufferTrimStart = 0
let activeBufferTrimEnd = 0
let activeLoadToken = 0
let playAnchorCtxTime = 0
let pausedOffsetSec = 0
let tickTimer: number | null = null
let gestureListenersBound = false

const decodedBufferCache = new Map<string, Promise<AudioBuffer>>()

let overrideCharacterId: string | null = null
let overrideEventId: string | null = null
let lastSceneParams: { viewMode: ViewMode; activeRegionId: string } = {
  viewMode: 'region',
  activeRegionId: 'bianliang',
}
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

function ensureAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audioCtx = new Ctor()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = snapshot.volume
    masterGain.connect(audioCtx.destination)
  }
  return audioCtx
}

/**
 * Find non-silent sample bounds to strip any browser MP3 decoder Delay/Padding frames
 * so `loopStart` / `loopEnd` wraps with 0-sample gapless precision.
 */
function detectSeamlessLoopBounds(buf: AudioBuffer): { start: number; end: number } {
  const ch0 = buf.getChannelData(0)
  const ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : ch0
  const len = buf.length
  const threshold = 1e-4

  let first = 0
  // Only trim up to 60ms (MP3 encoder/decoder delay is typically 528..2257 samples)
  const maxCheck = Math.min(len, Math.floor(buf.sampleRate * 0.06))
  while (first < maxCheck && Math.abs(ch0[first]) < threshold && Math.abs(ch1[first]) < threshold) {
    first += 1
  }

  let last = len - 1
  const minEnd = Math.max(first + 1, len - maxCheck)
  while (last > minEnd && Math.abs(ch0[last]) < threshold && Math.abs(ch1[last]) < threshold) {
    last -= 1
  }

  return {
    start: first / buf.sampleRate,
    end: (last + 1) / buf.sampleRate,
  }
}

function fetchAndDecodeBuffer(item: BgmPlaylistItem): Promise<AudioBuffer> {
  const cached = decodedBufferCache.get(item.url)
  if (cached) return cached

  const ctx = ensureAudioContext()
  if (!ctx) return Promise.reject(new Error('Web Audio unavailable'))

  const promise = fetch(resolveAssetUrl(item.url))
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${item.url}`)
      return res.arrayBuffer()
    })
    .then((arr) => ctx.decodeAudioData(arr))
    .then((audioBuf) => {
      recordAssetLoaded(item.url, item.bytes)
      return audioBuf
    })
    .catch((err) => {
      decodedBufferCache.delete(item.url)
      throw err
    })

  decodedBufferCache.set(item.url, promise)
  return promise
}

function stopActiveSourceNode() {
  if (activeSource) {
    activeSource.onended = null
    try {
      activeSource.stop()
    } catch {
      // already stopped
    }
    activeSource.disconnect()
    activeSource = null
  }
}

function updateProgressTimerState() {
  if (typeof window === 'undefined') return
  if (snapshot.isPlaying && tickTimer === null) {
    tickTimer = window.setInterval(() => {
      if (!audioCtx || !snapshot.isPlaying || !activeBuffer) return
      const span = Math.max(0.1, activeBufferTrimEnd - activeBufferTrimStart)
      const elapsed = Math.max(0, audioCtx.currentTime - playAnchorCtxTime)
      snapshot.currentTime = snapshot.playlist.tracks.length === 1 ? elapsed % span : Math.min(span, elapsed)
      snapshot.duration = span
      emit()
    }, 350)
  } else if (!snapshot.isPlaying && tickTimer !== null) {
    window.clearInterval(tickTimer)
    tickTimer = null
  }
}

function startBufferSourceFromOffset(offsetWithinTrimmedSec: number) {
  const ctx = ensureAudioContext()
  if (!ctx || !masterGain || !activeBuffer) return

  stopActiveSourceNode()

  const isSingleLoop = snapshot.playlist.tracks.length === 1
  const span = Math.max(0.05, activeBufferTrimEnd - activeBufferTrimStart)
  const safeOffset = ((offsetWithinTrimmedSec % span) + span) % span

  const src = ctx.createBufferSource()
  src.buffer = activeBuffer
  src.loop = isSingleLoop
  if (isSingleLoop) {
    src.loopStart = activeBufferTrimStart
    src.loopEnd = activeBufferTrimEnd
  }

  // Smooth 30ms micro fade-in on initial start/seek to eliminate any click from mid-waveform start;
  // subsequent loop wraps inside BufferSourceNode stay at steady gain with 0-sample seamlessness!
  const now = ctx.currentTime
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(0.0001, now)
  masterGain.gain.linearRampToValueAtTime(snapshot.volume, now + 0.03)

  src.connect(masterGain)

  if (!isSingleLoop) {
    const tokenAtStart = activeLoadToken
    src.onended = () => {
      if (tokenAtStart !== activeLoadToken || !snapshot.enabled) return
      const count = snapshot.playlist.tracks.length
      if (count > 1) {
        const nextIdx = (snapshot.trackIndex + 1) % count
        snapshot.trackIndex = nextIdx
        playlistLastIndex.set(snapshot.playlist.playlistKey, nextIdx)
        pausedOffsetSec = 0
        void loadAndPlayCurrentTrack(true)
      }
    }
  }

  src.start(0, activeBufferTrimStart + safeOffset)
  activeSource = src
  playAnchorCtxTime = now - safeOffset
  pausedOffsetSec = safeOffset
  snapshot.currentTime = safeOffset
  snapshot.duration = span
  snapshot.isPlaying = true
  snapshot.awaitingGesture = false
  updateProgressTimerState()
  emit()
}

async function loadAndPlayCurrentTrack(autoPlay: boolean) {
  const item = getActiveTrackItem()
  const token = ++activeLoadToken

  stopActiveSourceNode()
  snapshot.isPlaying = false
  updateProgressTimerState()

  if (!item) {
    activeBuffer = null
    snapshot.currentTime = 0
    snapshot.duration = 0
    emit()
    return
  }

  const ctx = ensureAudioContext()
  if (!ctx) return

  try {
    const buf = await fetchAndDecodeBuffer(item)
    if (token !== activeLoadToken) return

    activeBuffer = buf
    const bounds = detectSeamlessLoopBounds(buf)
    activeBufferTrimStart = bounds.start
    activeBufferTrimEnd = bounds.end
    snapshot.duration = Math.max(0.1, bounds.end - bounds.start)

    if (!autoPlay || !snapshot.enabled) {
      emit()
      return
    }

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch {
        // Autoplay blocked until gesture
      }
    }

    if (ctx.state !== 'running') {
      snapshot.awaitingGesture = true
      bindUnlockGesture()
      emit()
      return
    }

    unbindUnlockGesture()
    startBufferSourceFromOffset(pausedOffsetSec)
  } catch {
    if (token === activeLoadToken) {
      emit()
    }
  }
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
  const ctx = ensureAudioContext()
  if (!ctx) return
  ctx
    .resume()
    .then(() => {
      if (ctx.state === 'running') {
        unbindUnlockGesture()
        if (activeBuffer && !snapshot.isPlaying) {
          startBufferSourceFromOffset(pausedOffsetSec)
        } else if (!activeBuffer) {
          void loadAndPlayCurrentTrack(true)
        }
      }
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

let activeTrackUrlLoaded: string | null = null

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

  const currentItem = getActiveTrackItem()
  if (!keyChanged && currentItem && activeTrackUrlLoaded === currentItem.url) {
    emit()
    return
  }

  snapshot.trackIndex = 0
  pausedOffsetSec = 0
  playlistLastIndex.set(nextPlaylist.playlistKey, 0)
  activeTrackUrlLoaded = getActiveTrackItem()?.url ?? null
  void loadAndPlayCurrentTrack(true)
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
  pausedOffsetSec = 0
  playlistLastIndex.set(snapshot.playlist.playlistKey, clamped)
  activeTrackUrlLoaded = getActiveTrackItem()?.url ?? null
  if (!snapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  void loadAndPlayCurrentTrack(true)
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

  if (!enabled) {
    if (audioCtx && snapshot.isPlaying && activeBuffer) {
      const span = Math.max(0.1, activeBufferTrimEnd - activeBufferTrimStart)
      pausedOffsetSec = Math.max(0, audioCtx.currentTime - playAnchorCtxTime) % span
    }
    stopActiveSourceNode()
    snapshot.isPlaying = false
    snapshot.awaitingGesture = false
    unbindUnlockGesture()
    updateProgressTimerState()
    emit()
    return
  }

  if (activeBuffer && audioCtx && audioCtx.state === 'running') {
    startBufferSourceFromOffset(pausedOffsetSec)
  } else {
    void loadAndPlayCurrentTrack(true)
  }
}

export function setBgmVolume(volume: number) {
  const clamped = Math.min(1, Math.max(0, volume))
  snapshot.volume = clamped
  try {
    localStorage.setItem(STORAGE_KEY_VOLUME, clamped.toFixed(2))
  } catch {
    // ignore
  }
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(clamped, audioCtx.currentTime, 0.02)
  }
  if (clamped > 0 && !snapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  emit()
}

export function seekBgmTo(timeSec: number) {
  if (snapshot.playlist.tracks.length === 0) return
  const maxDur = snapshot.duration > 0 ? snapshot.duration - 0.05 : timeSec
  const target = Math.max(0, Math.min(maxDur, timeSec))
  pausedOffsetSec = target
  snapshot.currentTime = target

  if (!snapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  if (activeBuffer && audioCtx && audioCtx.state === 'running') {
    startBufferSourceFromOffset(target)
  } else {
    void loadAndPlayCurrentTrack(true)
  }
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
