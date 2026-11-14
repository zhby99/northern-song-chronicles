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
  gainDb?: number
  integratedLufs?: number
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
      const isBattle = overrideEventId === 'battle'
      return {
        playlistKey: `events:${overrideEventId}`,
        category: 'events',
        sceneTitle: isBattle ? '武林交锋战曲' : `事件配乐 · ${overrideEventId}`,
        sceneSubtitle: isBattle
          ? evTracks.length === 1
            ? '金戈铁马 · 零空白无缝循环战曲'
            : `战阵曲库 · 共 ${evTracks.length} 首激斗轮播`
          : `按序轮播 (${evTracks.length} 首)`,
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

export const BGM_TARGET_LUFS = -14.0

export interface BgmMetaSnapshot {
  playlist: BgmPlaylistContext
  trackIndex: number
  enabled: boolean
  isPlaying: boolean
  awaitingGesture: boolean
  volume: number
  activeGainDb: number
  activeIntegratedLufs: number | null
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
      if (!Number.isNaN(parsed) && parsed > 0) {
        return Math.min(1, Math.max(0.05, parsed))
      }
    }
  } catch {
    // ignore
  }
  return 0.55
}

export type BgmCombatMood = 'none' | 'duel' | 'climax' | 'aftermath'

let audioCtx: AudioContext | null = null
let trackNormGain: GainNode | null = null
let combatToneFilter: BiquadFilterNode | null = null
let combatPresenceShelf: BiquadFilterNode | null = null
let combatMixGain: GainNode | null = null
let masteringLimiter: DynamicsCompressorNode | null = null
let masterGain: GainNode | null = null
let activeSource: AudioBufferSourceNode | null = null
let activeBuffer: AudioBuffer | null = null
let activeBufferTrimStart = 0
let activeBufferTrimEnd = 0
let activeTrackLinearGain = 1.0
let activePlaybackRate = 1.0
let activeCombatMood: BgmCombatMood = 'none'
let nextFadeInSec = 0.03
let activeLoadToken = 0
let playAnchorCtxTime = 0
let pausedOffsetSec = 0
let tickTimer: number | null = null
let gestureListenersBound = false
let activeTrackUrlLoaded: string | null = null
let pinnedBattleTrackUrl: string | null = null
let battlePreloadScheduled = false

const MAX_DECODED_AUDIO_BUFFERS = 4

interface CachedDecodedAudioEntry {
  promise: Promise<AudioBuffer>
  pcmBytes: number
}

interface RuntimeLoudnessEstimate {
  gainDb: number
  integratedLufs: number
}

const decodedBufferCache = new Map<string, CachedDecodedAudioEntry>()
const runtimeLoudnessCache = new Map<string, RuntimeLoudnessEstimate>()
let audioEvictedCount = 0

function dbToLinearGain(db: number): number {
  return 10 ** (db / 20)
}

/**
 * Fast ITU-R BS.1770 K-weighted gated loudness + short-term median estimator
 * (~1.5ms on a 3-min track). Used automatically when a user drops a custom MP3
 * into `public/assets/audio/` that has no precomputed entry in `loudness_profiles.json`.
 */
function estimateAudioBufferLoudness(buf: AudioBuffer): RuntimeLoudnessEstimate {
  const sr = buf.sampleRate
  const ch0 = buf.getChannelData(0)
  const ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : ch0
  const len = buf.length
  if (len === 0) return { gainDb: 0, integratedLufs: BGM_TARGET_LUFS }

  // Sample 50ms slices every 250ms across the track with a simple 1st-order high-pass + high-shelf K-weight approximation
  const stepSamples = Math.max(1, Math.floor(sr * 0.25))
  const sliceSamples = Math.min(stepSamples, Math.max(64, Math.floor(sr * 0.05)))
  const hpAlpha = Math.exp((-2 * Math.PI * 60) / sr)
  const blockEnergies: number[] = []

  for (let start = 0; start + sliceSamples <= len; start += stepSamples) {
    let prev0 = ch0[start]
    let prev1 = ch1[start]
    let hp0 = 0
    let hp1 = 0
    let sumSq = 0
    const end = start + sliceSamples
    for (let i = start; i < end; i += 2) {
      const x0 = ch0[i]
      const x1 = ch1[i]
      const d0 = x0 - prev0
      const d1 = x1 - prev1
      hp0 = hpAlpha * (hp0 + d0)
      hp1 = hpAlpha * (hp1 + d1)
      // High-shelf boost (+4 dB approx on high-frequency diff) + RLB high-pass
      const k0 = hp0 + 0.58 * d0
      const k1 = hp1 + 0.58 * d1
      sumSq += 0.5 * (k0 * k0 + k1 * k1)
      prev0 = x0
      prev1 = x1
    }
    const count = Math.ceil(sliceSamples / 2)
    const meanSq = sumSq / Math.max(1, count)
    const lufs = -0.691 + 10 * Math.log10(Math.max(1e-12, meanSq))
    if (lufs > -70.0) {
      blockEnergies.push(meanSq)
    }
  }

  if (blockEnergies.length === 0) {
    return { gainDb: 0, integratedLufs: BGM_TARGET_LUFS }
  }

  // BS.1770 relative gate (-10 LU below ungated mean)
  const ungatedMean = blockEnergies.reduce((a, b) => a + b, 0) / blockEnergies.length
  const relGateLinear = ungatedMean * 0.1
  const gated = blockEnergies.filter((e) => e >= relGateLinear)
  const gatedMean =
    (gated.length > 0 ? gated : blockEnergies).reduce((a, b) => a + b, 0) /
    Math.max(1, gated.length > 0 ? gated.length : blockEnergies.length)
  const integratedLufs = Math.round((-0.691 + 10 * Math.log10(Math.max(1e-12, gatedMean))) * 100) / 100

  const sortedLufs = blockEnergies
    .map((e) => -0.691 + 10 * Math.log10(Math.max(1e-12, e)))
    .filter((v) => v > -55.0)
    .sort((a, b) => a - b)
  const medianLufs =
    sortedLufs.length > 0 ? sortedLufs[Math.floor(sortedLufs.length / 2)] : integratedLufs

  const effectiveLufs =
    medianLufs < integratedLufs
      ? 0.65 * integratedLufs + 0.35 * medianLufs
      : integratedLufs
  const gainDb = Math.round(Math.max(-9.0, Math.min(8.0, BGM_TARGET_LUFS - effectiveLufs)) * 100) / 100

  return { gainDb, integratedLufs }
}

function resolveTrackLoudness(item: BgmPlaylistItem, buf: AudioBuffer): RuntimeLoudnessEstimate {
  if (typeof item.gainDb === 'number') {
    return {
      gainDb: item.gainDb,
      integratedLufs: item.integratedLufs ?? BGM_TARGET_LUFS - item.gainDb,
    }
  }
  const cached = runtimeLoudnessCache.get(item.url)
  if (cached) return cached
  const computed = estimateAudioBufferLoudness(buf)
  runtimeLoudnessCache.set(item.url, computed)
  return computed
}

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
    if (!forceAllIdle && url === pinnedBattleTrackUrl) {
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
const playlistSavedOffsets = new Map<string, number>()

const metaListeners = new Set<() => void>()
const progressListeners = new Set<() => void>()

const initialPlaylist = resolveBgmPlaylistForState({
  viewMode: 'region',
  activeRegionId: 'bianliang',
})

let metaSnapshot: BgmMetaSnapshot = {
  playlist: initialPlaylist,
  trackIndex: 0,
  enabled: true,
  isPlaying: false,
  awaitingGesture: false,
  volume: readInitialVolume(),
  activeGainDb: initialPlaylist.tracks[0]?.gainDb ?? 0,
  activeIntegratedLufs: initialPlaylist.tracks[0]?.integratedLufs ?? null,
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

function getCombatMoodTargets(mood: BgmCombatMood): {
  mixGain: number
  lowpassHz: number
  shelfDb: number
  rate: number
} {
  switch (mood) {
    case 'duel':
      return { mixGain: 0.9, lowpassHz: 20000, shelfDb: 0.5, rate: 1.0 }
    case 'climax':
      return { mixGain: 0.98, lowpassHz: 20000, shelfDb: 2.4, rate: 1.048 }
    case 'aftermath':
      return { mixGain: 0.28, lowpassHz: 920, shelfDb: -2.0, rate: 1.0 }
    case 'none':
    default:
      return { mixGain: 1.0, lowpassHz: 20000, shelfDb: 0.0, rate: 1.0 }
  }
}

function computeLiveProgress(): BgmProgressSnapshot {
  if (!activeBuffer) {
    return { currentTime: 0, duration: 0 }
  }
  const span = Math.max(0.1, activeBufferTrimEnd - activeBufferTrimStart)
  if (audioCtx && metaSnapshot.isPlaying) {
    const elapsed = Math.max(0, (audioCtx.currentTime - playAnchorCtxTime) * activePlaybackRate)
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

    const moodTargets = getCombatMoodTargets(activeCombatMood)

    // Per-track EBU R128 loudness normalization -> dynamic combat EQ/ducking -> soft ceiling limiter -> user master volume
    trackNormGain = audioCtx.createGain()
    trackNormGain.gain.value = activeTrackLinearGain

    combatToneFilter = audioCtx.createBiquadFilter()
    combatToneFilter.type = 'lowpass'
    combatToneFilter.frequency.value = moodTargets.lowpassHz
    combatToneFilter.Q.value = 0.7

    combatPresenceShelf = audioCtx.createBiquadFilter()
    combatPresenceShelf.type = 'highshelf'
    combatPresenceShelf.frequency.value = 2400
    combatPresenceShelf.gain.value = moodTargets.shelfDb

    combatMixGain = audioCtx.createGain()
    combatMixGain.gain.value = moodTargets.mixGain

    masteringLimiter = audioCtx.createDynamicsCompressor()
    masteringLimiter.threshold.value = -2.0
    masteringLimiter.knee.value = 4.0
    masteringLimiter.ratio.value = 12.0
    masteringLimiter.attack.value = 0.002
    masteringLimiter.release.value = 0.16

    masterGain = audioCtx.createGain()
    masterGain.gain.value = metaSnapshot.volume

    trackNormGain.connect(combatToneFilter)
    combatToneFilter.connect(combatPresenceShelf)
    combatPresenceShelf.connect(combatMixGain)
    combatMixGain.connect(masteringLimiter)
    masteringLimiter.connect(masterGain)
    masterGain.connect(audioCtx.destination)
  }
  return audioCtx
}

/**
 * Strip MP3 encoder/decoder padding AND up to 4.5s of leading/trailing dead air (< -69 dBFS)
 * so every track starts immediately upon entering a city and loops seamlessly without silent gaps.
 */
function detectSeamlessLoopBounds(buf: AudioBuffer): { start: number; end: number } {
  const ch0 = buf.getChannelData(0)
  const ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : ch0
  const len = buf.length
  const threshold = 3.5e-4

  let first = 0
  const maxCheck = Math.min(Math.floor(len * 0.4), Math.floor(buf.sampleRate * 4.5))
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
  if (!ctx || !masterGain || !trackNormGain || !activeBuffer) return

  stopActiveSourceNode()

  const isSingleLoop = metaSnapshot.playlist.tracks.length === 1
  const span = Math.max(0.05, activeBufferTrimEnd - activeBufferTrimStart)
  const safeOffset = ((offsetWithinTrimmedSec % span) + span) % span
  const moodTargets = getCombatMoodTargets(activeCombatMood)
  activePlaybackRate = moodTargets.rate

  const src = ctx.createBufferSource()
  src.buffer = activeBuffer
  src.playbackRate.value = activePlaybackRate
  src.loop = isSingleLoop
  if (isSingleLoop) {
    src.loopStart = activeBufferTrimStart
    src.loopEnd = activeBufferTrimEnd
  }

  const now = ctx.currentTime
  trackNormGain.gain.cancelScheduledValues(now)
  trackNormGain.gain.setValueAtTime(activeTrackLinearGain, now)

  if (combatToneFilter && combatPresenceShelf && combatMixGain) {
    combatToneFilter.frequency.cancelScheduledValues(now)
    combatToneFilter.frequency.setValueAtTime(moodTargets.lowpassHz, now)
    combatPresenceShelf.gain.cancelScheduledValues(now)
    combatPresenceShelf.gain.setValueAtTime(moodTargets.shelfDb, now)
    combatMixGain.gain.cancelScheduledValues(now)
    combatMixGain.gain.setValueAtTime(moodTargets.mixGain, now)
  }

  const fadeSec = Math.max(0.025, nextFadeInSec)
  nextFadeInSec = 0.03

  // Smooth fade-in on initial start/seek/resume; subsequent hardware loop wraps stay 0-sample seamless!
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(0.0001, now)
  masterGain.gain.linearRampToValueAtTime(metaSnapshot.volume, now + fadeSec)

  src.connect(trackNormGain)

  if (!isSingleLoop) {
    bindMultiTrackEndedHandler(src, activeLoadToken)
  }

  src.start(0, activeBufferTrimStart + safeOffset)
  activeSource = src
  playAnchorCtxTime = now - safeOffset / activePlaybackRate
  pausedOffsetSec = safeOffset
  metaSnapshot.isPlaying = true
  metaSnapshot.awaitingGesture = false
  updateProgressTimerState()
  syncProgressSnapshot(true)
  emitMeta()
  scheduleBackgroundBattlePreload()
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
    activeTrackLinearGain = 1.0
    metaSnapshot.activeGainDb = 0
    metaSnapshot.activeIntegratedLufs = null
    syncProgressSnapshot(true)
    emitMeta()
    return
  }

  activeTrackUrlLoaded = item.url
  const ctx = ensureAudioContext()
  if (!ctx) return

  // Bind gesture unlock immediately before async fetch so even a click in the first 100ms unlocks Web Audio
  if (autoPlay && metaSnapshot.enabled && ctx.state !== 'running') {
    bindUnlockGesture()
  }

  try {
    const buf = await fetchAndDecodeBuffer(item)
    if (token !== activeLoadToken) return

    activeBuffer = buf
    const loudness = resolveTrackLoudness(item, buf)
    activeTrackLinearGain = dbToLinearGain(loudness.gainDb)
    metaSnapshot.activeGainDb = loudness.gainDb
    metaSnapshot.activeIntegratedLufs = loudness.integratedLufs

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

const GESTURE_UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'click', 'touchend', 'keydown'] as const

function unbindUnlockGesture() {
  if (!gestureListenersBound || typeof window === 'undefined') return
  gestureListenersBound = false
  for (const ev of GESTURE_UNLOCK_EVENTS) {
    window.removeEventListener(ev, handleFirstUserGesture, true)
  }
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
  for (const ev of GESTURE_UNLOCK_EVENTS) {
    window.addEventListener(ev, handleFirstUserGesture, true)
  }
}

export function hasBattleBgmTracks(): boolean {
  return (audioManifest.events.battle?.length ?? 0) > 0
}

export function preloadBattleBgm(): void {
  const battleTracks = audioManifest.events.battle ?? []
  if (battleTracks.length === 0) return
  const firstItem = toPlaylistItems(battleTracks)[0]
  if (!firstItem) return
  pinnedBattleTrackUrl = firstItem.url
  if (decodedBufferCache.has(firstItem.url)) return
  void fetchAndDecodeBuffer(firstItem).catch(() => {
    // Non-fatal background warm-up
  })
}

function scheduleBackgroundBattlePreload() {
  if (battlePreloadScheduled || typeof window === 'undefined' || !hasBattleBgmTracks()) return
  battlePreloadScheduled = true
  window.setTimeout(() => {
    preloadBattleBgm()
  }, 650)
}

export function syncBgmSceneContext(viewMode: ViewMode, activeRegionId: string) {
  lastSceneParams = { viewMode, activeRegionId }
  const prevPlaylist = metaSnapshot.playlist
  const prevKey = prevPlaylist.playlistKey
  const nextPlaylist = resolveBgmPlaylistForState({
    viewMode,
    activeRegionId,
    overrideCharacterId,
    overrideEventId,
  })

  const keyChanged = nextPlaylist.playlistKey !== prevKey
  if (!keyChanged) {
    const currentItem = getActiveTrackItem()
    if (currentItem && activeTrackUrlLoaded === currentItem.url) {
      metaSnapshot.playlist = nextPlaylist
      emitMeta()
      return
    }
  }

  // Bookmark outgoing world/region playback position before switching to battle/event BGM
  if (keyChanged && prevPlaylist.category !== 'events' && prevPlaylist.tracks.length > 0) {
    const livePos = computeLiveProgress().currentTime
    playlistSavedOffsets.set(prevKey, livePos)
    playlistLastIndex.set(prevKey, metaSnapshot.trackIndex)
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

  const nextKey = nextPlaylist.playlistKey
  const trackCount = nextPlaylist.tracks.length
  let nextTrackIdx = 0
  let nextOffsetSec = 0

  if (nextKey === 'events:battle' && trackCount > 0) {
    // Rotate across multiple battle tracks if the player placed several in events/battle or others/
    const lastBattleIdx = playlistLastIndex.get(nextKey)
    nextTrackIdx = lastBattleIdx !== undefined ? (lastBattleIdx + 1) % trackCount : 0
    nextOffsetSec = 0
    nextFadeInSec = 0.05
  } else if (prevPlaylist.category === 'events' && nextPlaylist.category !== 'events') {
    // Returning from battle/event back to city/world: seamlessly resume from bookmarked timestamp!
    const savedIdx = playlistLastIndex.get(nextKey) ?? 0
    nextTrackIdx = trackCount > 0 ? Math.min(trackCount - 1, Math.max(0, savedIdx)) : 0
    nextOffsetSec = playlistSavedOffsets.get(nextKey) ?? 0
    nextFadeInSec = 0.48
  } else {
    nextFadeInSec = 0.04
  }

  metaSnapshot.playlist = nextPlaylist
  metaSnapshot.trackIndex = nextTrackIdx
  pausedOffsetSec = nextOffsetSec
  playlistLastIndex.set(nextKey, nextTrackIdx)
  activeTrackUrlLoaded = getActiveTrackItem()?.url ?? null
  void loadAndPlayCurrentTrack(true)
}

export function setBgmOverride(opts: { characterId?: string | null; eventId?: string | null }) {
  if (opts.characterId !== undefined) overrideCharacterId = opts.characterId
  if (opts.eventId !== undefined) overrideEventId = opts.eventId
  syncBgmSceneContext(lastSceneParams.viewMode, lastSceneParams.activeRegionId)
}

/**
 * Dynamically adjust battle BGM tempo, brightness, and curtain-call low-pass filter:
 * - `'duel'`: clean headroom for weapon SFX
 * - `'climax'`: +4.8% adrenaline speed & upper-mid presence when either fighter <= 32% HP
 * - `'aftermath'`: warm muffled 920 Hz curtain-call bed on victory/defeat banner
 * - `'none'`: transparent peaceful exploration mix
 */
export function setBgmCombatMood(mood: BgmCombatMood) {
  if (activeCombatMood === mood) return
  activeCombatMood = mood

  const ctx = audioCtx
  if (!ctx) return

  const now = ctx.currentTime
  const targets = getCombatMoodTargets(mood)

  if (activeSource && activePlaybackRate !== targets.rate) {
    // Rebase playAnchorCtxTime before changing playbackRate so progress tracking stays continuous
    const liveCur = computeLiveProgress().currentTime
    activePlaybackRate = targets.rate
    playAnchorCtxTime = now - liveCur / activePlaybackRate
    activeSource.playbackRate.cancelScheduledValues(now)
    activeSource.playbackRate.setTargetAtTime(targets.rate, now, 0.22)
  } else {
    activePlaybackRate = targets.rate
  }

  if (combatToneFilter) {
    combatToneFilter.frequency.cancelScheduledValues(now)
    combatToneFilter.frequency.setTargetAtTime(
      targets.lowpassHz,
      now,
      mood === 'aftermath' ? 0.26 : 0.16,
    )
  }
  if (combatPresenceShelf) {
    combatPresenceShelf.gain.cancelScheduledValues(now)
    combatPresenceShelf.gain.setTargetAtTime(targets.shelfDb, now, 0.18)
  }
  if (combatMixGain) {
    combatMixGain.gain.cancelScheduledValues(now)
    combatMixGain.gain.setTargetAtTime(targets.mixGain, now, mood === 'aftermath' ? 0.24 : 0.14)
  }
}

/**
 * Sidechain-style BGM micro-ducking on weapon/palm impacts so crits & Heaven-Tier strikes
 * punch through the battle music with visceral clarity before swelling right back up.
 */
export function duckBgmForImpact(strength: 'light' | 'medium' | 'heavy') {
  if (!audioCtx || !combatMixGain || !metaSnapshot.isPlaying) return
  if (activeCombatMood === 'aftermath') return

  const now = audioCtx.currentTime
  const baseGain = getCombatMoodTargets(activeCombatMood).mixGain
  const dipRatio = strength === 'heavy' ? 0.46 : strength === 'medium' ? 0.66 : 0.82
  const dipGain = Math.max(0.12, baseGain * dipRatio)
  const holdSec = strength === 'heavy' ? 0.055 : 0.025
  const releaseSec = strength === 'heavy' ? 0.34 : strength === 'medium' ? 0.22 : 0.15

  combatMixGain.gain.cancelScheduledValues(now)
  combatMixGain.gain.setValueAtTime(combatMixGain.gain.value, now)
  combatMixGain.gain.linearRampToValueAtTime(dipGain, now + 0.014)
  combatMixGain.gain.setValueAtTime(dipGain, now + 0.014 + holdSec)
  combatMixGain.gain.linearRampToValueAtTime(baseGain, now + 0.014 + holdSec + releaseSec)
}

export function startCombatBgmSession() {
  setBgmCombatMood('duel')
  setBgmOverride({ eventId: 'battle' })
}

export function endCombatBgmSession() {
  setBgmCombatMood('none')
  setBgmOverride({ eventId: null })
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
  // If BGM is enabled by default on startup and only waiting for browser's first user gesture,
  // clicking the BGM button should immediately resume & play rather than flipping it to muted!
  if (metaSnapshot.enabled && !metaSnapshot.isPlaying) {
    setBgmEnabled(true)
    return
  }
  setBgmEnabled(!metaSnapshot.enabled)
}

export function setBgmEnabled(enabled: boolean) {
  metaSnapshot.enabled = enabled

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

  const ctx = ensureAudioContext()
  if (ctx && ctx.state === 'suspended') {
    void ctx.resume().then(() => {
      if (ctx.state === 'running' && metaSnapshot.enabled && activeBuffer && !metaSnapshot.isPlaying) {
        unbindUnlockGesture()
        startBufferSourceFromOffset(pausedOffsetSec)
      }
    })
  }

  if (activeBuffer && ctx && ctx.state === 'running') {
    startBufferSourceFromOffset(pausedOffsetSec)
  } else if (!activeBuffer) {
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
