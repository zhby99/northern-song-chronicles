import { useMemo, useSyncExternalStore } from 'react'
import audioManifest, { type VirtualAudioTrackEntry } from 'virtual:audio-manifest'
import { REGION_DB_MAP } from '../data/gameDb'
import type { ViewMode } from '../types/game'
import {
  recordAssetLoaded,
  registerIdleAudioPurger,
  reportAudioBufferTelemetry,
  resolveAssetUrl,
} from './assetLoader'

export type BgmCategoryKey = 'world' | 'regions' | 'characters' | 'events'

export interface BgmPlaylistItem {
  url: string
  fileName: string
  stem: string
  order: number
  bytes: number
  label: string
  sharedThemeId?: string
  sharedThemeTitle?: string
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

function formatTrackOrdinal(
  idxZeroBased: number,
  stem: string,
  sharedThemeTitle?: string,
): string {
  const n = idxZeroBased + 1
  const cn = n <= 10 ? CN_NUMERALS[n] : String(n)
  if (sharedThemeTitle) {
    return `第${cn}曲 · ${sharedThemeTitle}`
  }
  if (/^\d+$/.test(stem)) {
    return `第${cn}曲 (${stem})`
  }
  return `第${n}曲 · ${stem}`
}

function toPlaylistItems(entries: VirtualAudioTrackEntry[]): BgmPlaylistItem[] {
  return entries.map((entry, idx) => ({
    ...entry,
    label: formatTrackOrdinal(idx, entry.stem, entry.sharedThemeTitle),
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
      const sharedTitle = regEntries[0]?.sharedThemeTitle
      return {
        playlistKey: `regions:${activeRegionId}`,
        category: 'regions',
        sceneTitle: `${regionName}配乐`,
        sceneSubtitle: sharedTitle
          ? `跨州同曲雅乐（${sharedTitle}）· 同曲切境不断曲`
          : regEntries.length === 1
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

export interface BgmMetaSnapshot {
  playlist: BgmPlaylistContext
  trackIndex: number
  enabled: boolean
  isPlaying: boolean
  awaitingGesture: boolean
  volume: number
}

export interface BgmProgressSnapshot {
  currentTime: number
  duration: number
}

export interface BgmSnapshot extends BgmMetaSnapshot, BgmProgressSnapshot {}

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
let activeTrackUrlLoaded: string | null = null

const MAX_DECODED_AUDIO_BUFFERS = 3

interface CachedDecodedAudioEntry {
  promise: Promise<AudioBuffer>
  pcmBytes: number
}

const decodedBufferCache = new Map<string, CachedDecodedAudioEntry>()
let audioEvictedCount = 0

function syncAudioMemoryTelemetry() {
  let pcmBytes = 0
  const cachedUrls: string[] = []
  for (const [url, entry] of decodedBufferCache.entries()) {
    pcmBytes += entry.pcmBytes
    cachedUrls.push(url)
  }
  reportAudioBufferTelemetry({
    cachedCount: decodedBufferCache.size,
    maxCap: MAX_DECODED_AUDIO_BUFFERS,
    pcmBytes,
    evictedCount: audioEvictedCount,
    cachedUrls,
  })
}

function evictOverflowAudioBuffers(forceAllIdle = false): number {
  let freed = 0
  for (const url of Array.from(decodedBufferCache.keys())) {
    if (!forceAllIdle && decodedBufferCache.size <= MAX_DECODED_AUDIO_BUFFERS) {
      break
    }
    if (url === activeTrackUrlLoaded) {
      continue
    }
    decodedBufferCache.delete(url)
    audioEvictedCount += 1
    freed += 1
  }
  if (freed > 0) {
    syncAudioMemoryTelemetry()
  }
  return freed
}

registerIdleAudioPurger(() => evictOverflowAudioBuffers(true))

let overrideCharacterId: string | null = null
let overrideEventId: string | null = null
let lastSceneParams: { viewMode: ViewMode; activeRegionId: string } = {
  viewMode: 'region',
  activeRegionId: 'bianliang',
}
const playlistLastIndex = new Map<string, number>()

const metaListeners = new Set<() => void>()
const progressListeners = new Set<() => void>()

let metaSnapshot: BgmMetaSnapshot = {
  playlist: resolveBgmPlaylistForState({ viewMode: 'region', activeRegionId: 'bianliang' }),
  trackIndex: 0,
  enabled: readInitialEnabled(),
  isPlaying: false,
  awaitingGesture: false,
  volume: readInitialVolume(),
}

let progressSnapshot: BgmProgressSnapshot = {
  currentTime: 0,
  duration: 0,
}

function emitMeta() {
  metaSnapshot = { ...metaSnapshot }
  for (const fn of metaListeners) {
    fn()
  }
}

function computeLiveProgress(): BgmProgressSnapshot {
  if (!activeBuffer) {
    return { currentTime: 0, duration: 0 }
  }
  const span = Math.max(0.1, activeBufferTrimEnd - activeBufferTrimStart)
  if (audioCtx && metaSnapshot.isPlaying) {
    const elapsed = Math.max(0, audioCtx.currentTime - playAnchorCtxTime)
    const cur =
      metaSnapshot.playlist.tracks.length === 1 ? elapsed % span : Math.min(span, elapsed)
    return { currentTime: cur, duration: span }
  }
  return {
    currentTime: Math.min(span, Math.max(0, pausedOffsetSec)),
    duration: span,
  }
}

function syncProgressSnapshot(forceEmit = false) {
  const next = computeLiveProgress()
  const changedSec =
    Math.floor(next.currentTime) !== Math.floor(progressSnapshot.currentTime) ||
    Math.floor(next.duration) !== Math.floor(progressSnapshot.duration)
  if (!forceEmit && !changedSec) return
  progressSnapshot = next
  for (const fn of progressListeners) {
    fn()
  }
}

export function getActiveTrackItem(
  snap: Pick<BgmMetaSnapshot, 'playlist' | 'trackIndex'> = metaSnapshot,
): BgmPlaylistItem | null {
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
    masterGain.gain.value = metaSnapshot.volume
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
  if (cached) {
    // Refresh LRU position so most recently played tracks stay resident
    decodedBufferCache.delete(item.url)
    decodedBufferCache.set(item.url, cached)
    syncAudioMemoryTelemetry()
    return cached.promise
  }

  const ctx = ensureAudioContext()
  if (!ctx) return Promise.reject(new Error('Web Audio unavailable'))

  const entry: CachedDecodedAudioEntry = {
    promise: Promise.resolve(null as unknown as AudioBuffer),
    pcmBytes: 0,
  }

  entry.promise = fetch(resolveAssetUrl(item.url))
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${item.url}`)
      return res.arrayBuffer()
    })
    .then((arr) => ctx.decodeAudioData(arr))
    .then((audioBuf) => {
      entry.pcmBytes = audioBuf.length * audioBuf.numberOfChannels * 4
      recordAssetLoaded(item.url, item.bytes)
      evictOverflowAudioBuffers(false)
      syncAudioMemoryTelemetry()
      return audioBuf
    })
    .catch((err) => {
      decodedBufferCache.delete(item.url)
      syncAudioMemoryTelemetry()
      throw err
    })

  decodedBufferCache.set(item.url, entry)
  evictOverflowAudioBuffers(false)
  syncAudioMemoryTelemetry()
  return entry.promise
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

/**
 * Progress timer runs ONLY when audio is playing AND at least one UI progress bar
 * (`TopBgmWidget` open popover or `SettingsTab`) is actively mounted!
 * When the popover is closed, 0 timers run in the background and TopHud never re-renders.
 */
function updateProgressTimerState() {
  if (typeof window === 'undefined') return
  const shouldTick = metaSnapshot.isPlaying && progressListeners.size > 0
  if (shouldTick && tickTimer === null) {
    tickTimer = window.setInterval(() => {
      if (!audioCtx || !metaSnapshot.isPlaying || !activeBuffer || progressListeners.size === 0) {
        return
      }
      syncProgressSnapshot(false)
    }, 500)
  } else if (!shouldTick && tickTimer !== null) {
    window.clearInterval(tickTimer)
    tickTimer = null
  }
}

function bindMultiTrackEndedHandler(src: AudioBufferSourceNode, tokenAtStart: number) {
  src.onended = () => {
    if (tokenAtStart !== activeLoadToken || !metaSnapshot.enabled) return
    const count = metaSnapshot.playlist.tracks.length
    if (count > 1) {
      const nextIdx = (metaSnapshot.trackIndex + 1) % count
      metaSnapshot.trackIndex = nextIdx
      playlistLastIndex.set(metaSnapshot.playlist.playlistKey, nextIdx)
      pausedOffsetSec = 0
      activeTrackUrlLoaded = getActiveTrackItem()?.url ?? null
      void loadAndPlayCurrentTrack(true)
    }
  }
}

function startBufferSourceFromOffset(offsetWithinTrimmedSec: number) {
  const ctx = ensureAudioContext()
  if (!ctx || !masterGain || !activeBuffer) return

  stopActiveSourceNode()

  const isSingleLoop = metaSnapshot.playlist.tracks.length === 1
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
  masterGain.gain.linearRampToValueAtTime(metaSnapshot.volume, now + 0.03)

  src.connect(masterGain)

  if (!isSingleLoop) {
    bindMultiTrackEndedHandler(src, activeLoadToken)
  }

  src.start(0, activeBufferTrimStart + safeOffset)
  activeSource = src
  playAnchorCtxTime = now - safeOffset
  pausedOffsetSec = safeOffset
  metaSnapshot.isPlaying = true
  metaSnapshot.awaitingGesture = false
  updateProgressTimerState()
  syncProgressSnapshot(true)
  emitMeta()
}

async function loadAndPlayCurrentTrack(autoPlay: boolean) {
  const item = getActiveTrackItem()
  const token = ++activeLoadToken

  stopActiveSourceNode()
  metaSnapshot.isPlaying = false
  updateProgressTimerState()

  if (!item) {
    activeBuffer = null
    activeTrackUrlLoaded = null
    syncProgressSnapshot(true)
    emitMeta()
    return
  }

  activeTrackUrlLoaded = item.url
  const ctx = ensureAudioContext()
  if (!ctx) return

  try {
    const buf = await fetchAndDecodeBuffer(item)
    if (token !== activeLoadToken) return

    activeBuffer = buf
    const bounds = detectSeamlessLoopBounds(buf)
    activeBufferTrimStart = bounds.start
    activeBufferTrimEnd = bounds.end
    syncProgressSnapshot(true)

    if (!autoPlay || !metaSnapshot.enabled) {
      emitMeta()
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
      metaSnapshot.awaitingGesture = true
      bindUnlockGesture()
      emitMeta()
      return
    }

    unbindUnlockGesture()
    startBufferSourceFromOffset(pausedOffsetSec)
  } catch {
    if (token === activeLoadToken) {
      emitMeta()
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
  if (!metaSnapshot.enabled) {
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
        if (activeBuffer && !metaSnapshot.isPlaying) {
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

export function syncBgmSceneContext(viewMode: ViewMode, activeRegionId: string) {
  lastSceneParams = { viewMode, activeRegionId }
  const nextPlaylist = resolveBgmPlaylistForState({
    viewMode,
    activeRegionId,
    overrideCharacterId,
    overrideEventId,
  })

  const keyChanged = nextPlaylist.playlistKey !== metaSnapshot.playlist.playlistKey
  if (!keyChanged) {
    const currentItem = getActiveTrackItem()
    if (currentItem && activeTrackUrlLoaded === currentItem.url) {
      metaSnapshot.playlist = nextPlaylist
      emitMeta()
      return
    }
  }

  // 同曲共享不断曲：若新场景/新州府歌单中包含当前正在播放（或已解码待奏）的同一音轨 URL，
  // 直接更新歌单标题与曲目索引，保持当前播放采样点无缝续播！
  const sameTrackIdx =
    activeTrackUrlLoaded !== null
      ? nextPlaylist.tracks.findIndex((t) => t.url === activeTrackUrlLoaded)
      : -1

  if (
    sameTrackIdx !== -1 &&
    (metaSnapshot.isPlaying ||
      activeBuffer !== null ||
      decodedBufferCache.has(activeTrackUrlLoaded!))
  ) {
    metaSnapshot.playlist = nextPlaylist
    metaSnapshot.trackIndex = sameTrackIdx
    playlistLastIndex.set(nextPlaylist.playlistKey, sameTrackIdx)

    if (activeSource && activeBuffer) {
      const isSingleLoop = nextPlaylist.tracks.length === 1
      activeSource.loop = isSingleLoop
      if (isSingleLoop) {
        activeSource.loopStart = activeBufferTrimStart
        activeSource.loopEnd = activeBufferTrimEnd
        activeSource.onended = null
      } else {
        bindMultiTrackEndedHandler(activeSource, activeLoadToken)
      }
    }
    emitMeta()
    return
  }

  metaSnapshot.playlist = nextPlaylist
  metaSnapshot.trackIndex = 0
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
  const count = metaSnapshot.playlist.tracks.length
  if (count === 0) return
  const clamped = ((index % count) + count) % count
  metaSnapshot.trackIndex = clamped
  pausedOffsetSec = 0
  playlistLastIndex.set(metaSnapshot.playlist.playlistKey, clamped)
  activeTrackUrlLoaded = getActiveTrackItem()?.url ?? null
  if (!metaSnapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  void loadAndPlayCurrentTrack(true)
}

export function playNextBgmTrack() {
  selectBgmTrackIndex(metaSnapshot.trackIndex + 1)
}

export function playPrevBgmTrack() {
  selectBgmTrackIndex(metaSnapshot.trackIndex - 1)
}

export function toggleBgmPlayback() {
  setBgmEnabled(!metaSnapshot.enabled)
}

export function setBgmEnabled(enabled: boolean) {
  metaSnapshot.enabled = enabled
  try {
    localStorage.setItem(STORAGE_KEY_ENABLED, enabled ? '1' : '0')
  } catch {
    // ignore
  }

  if (!enabled) {
    if (audioCtx && metaSnapshot.isPlaying && activeBuffer) {
      const span = Math.max(0.1, activeBufferTrimEnd - activeBufferTrimStart)
      pausedOffsetSec = Math.max(0, audioCtx.currentTime - playAnchorCtxTime) % span
    }
    stopActiveSourceNode()
    metaSnapshot.isPlaying = false
    metaSnapshot.awaitingGesture = false
    unbindUnlockGesture()
    updateProgressTimerState()
    syncProgressSnapshot(true)
    emitMeta()
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
  metaSnapshot.volume = clamped
  try {
    localStorage.setItem(STORAGE_KEY_VOLUME, clamped.toFixed(2))
  } catch {
    // ignore
  }
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(clamped, audioCtx.currentTime, 0.02)
  }
  if (clamped > 0 && !metaSnapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  emitMeta()
}

export function seekBgmTo(timeSec: number) {
  if (metaSnapshot.playlist.tracks.length === 0) return
  const liveDur = computeLiveProgress().duration
  const maxDur = liveDur > 0 ? liveDur - 0.05 : timeSec
  const target = Math.max(0, Math.min(maxDur, timeSec))
  pausedOffsetSec = target

  if (!metaSnapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  if (activeBuffer && audioCtx && audioCtx.state === 'running') {
    startBufferSourceFromOffset(target)
  } else {
    syncProgressSnapshot(true)
    void loadAndPlayCurrentTrack(true)
  }
}

function subscribeMeta(listener: () => void) {
  metaListeners.add(listener)
  return () => {
    metaListeners.delete(listener)
  }
}

function getMetaSnapshot(): BgmMetaSnapshot {
  return metaSnapshot
}

function subscribeProgress(listener: () => void) {
  const wasEmpty = progressListeners.size === 0
  progressListeners.add(listener)
  if (wasEmpty) {
    progressSnapshot = computeLiveProgress()
    updateProgressTimerState()
  }
  return () => {
    progressListeners.delete(listener)
    if (progressListeners.size === 0) {
      updateProgressTimerState()
    }
  }
}

function getProgressSnapshot(): BgmProgressSnapshot {
  return progressSnapshot
}

/**
 * Low-frequency BGM metadata subscription (0 Hz during steady playback).
 * Ideal for TopHud so background music NEVER triggers TopHud re-renders!
 */
export function useBgmMetaState(): BgmMetaSnapshot {
  return useSyncExternalStore(subscribeMeta, getMetaSnapshot)
}

/**
 * On-demand 1s playback progress subscription.
 * Only activates a timer while at least one progress bar UI is mounted.
 */
export function useBgmProgress(): BgmProgressSnapshot {
  return useSyncExternalStore(subscribeProgress, getProgressSnapshot)
}

export function useBgmState(): BgmSnapshot {
  const meta = useBgmMetaState()
  const progress = useBgmProgress()
  return useMemo(() => ({ ...meta, ...progress }), [meta, progress])
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
  const sharedRegionCount = Object.values(audioManifest.regions).filter((list) =>
    Boolean(list[0]?.sharedThemeId),
  ).length
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
    sharedRegionCount,
    uniqueTrackCount: audioManifest.uniqueTrackCount,
    totalRegionTracks,
    totalCharacterTracks,
    totalEventTracks,
  }
}
