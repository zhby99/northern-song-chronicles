import audioManifest, { type VirtualAudioTrackEntry } from 'virtual:audio-manifest'
import { REGION_DB_MAP } from '../data/gameDb'
import type { ViewMode } from '../types/game'
import {
  getPackedAssetArrayBuffer,
  recordAssetLoaded,
  registerIdleAudioPurger,
  reportAudioBufferTelemetry,
  resolveAssetUrl,
} from './assetLoader'
import {
  BGM_TARGET_LUFS,
  type BgmCombatMood,
  type BgmMetaSnapshot,
  type BgmPlaylistContext,
  type BgmPlaylistItem,
  type BgmProgressSnapshot,
} from './bgmManager'

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

export interface BgmCoreCallbacks {
  onMetaChange: (next: BgmMetaSnapshot) => void
  onProgressChange: (next: BgmProgressSnapshot) => void
  hasProgressSubscribers: () => boolean
}

let callbacks: BgmCoreCallbacks | null = null
let coreInitialized = false

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

function estimateAudioBufferLoudness(buf: AudioBuffer): RuntimeLoudnessEstimate {
  const sr = buf.sampleRate
  const ch0 = buf.getChannelData(0)
  const ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : ch0
  const len = buf.length
  if (len === 0) return { gainDb: 0, integratedLufs: BGM_TARGET_LUFS }

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

  const ungatedMean = blockEnergies.reduce((a, b) => a + b, 0) / blockEnergies.length
  const relGateLinear = ungatedMean * 0.1
  const gated = blockEnergies.filter((e) => e >= relGateLinear)
  const gatedMean =
    (gated.length > 0 ? gated : blockEnergies).reduce((a, b) => a + b, 0) /
    Math.max(1, gated.length > 0 ? gated.length : blockEnergies.length)
  const integratedLufs =
    Math.round((-0.691 + 10 * Math.log10(Math.max(1e-12, gatedMean))) * 100) / 100

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
  const gainDb =
    Math.round(Math.max(-9.0, Math.min(8.0, BGM_TARGET_LUFS - effectiveLufs)) * 100) / 100

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

let metaSnapshot: BgmMetaSnapshot = {
  playlist: resolveBgmPlaylistForState({ viewMode: 'region', activeRegionId: 'bianliang' }),
  trackIndex: 0,
  enabled: true,
  isPlaying: false,
  awaitingGesture: false,
  volume: 0.55,
  activeGainDb: 0,
  activeIntegratedLufs: null,
}

let progressSnapshot: BgmProgressSnapshot = {
  currentTime: 0,
  duration: 0,
}

function emitMeta() {
  metaSnapshot = { ...metaSnapshot }
  callbacks?.onMetaChange(metaSnapshot)
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

export function computeLiveProgressCore(): BgmProgressSnapshot {
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
  const next = computeLiveProgressCore()
  const changedSec =
    Math.floor(next.currentTime) !== Math.floor(progressSnapshot.currentTime) ||
    Math.floor(next.duration) !== Math.floor(progressSnapshot.duration)
  if (!forceEmit && !changedSec) return
  progressSnapshot = next
  callbacks?.onProgressChange(progressSnapshot)
}

function getActiveItem(): BgmPlaylistItem | null {
  if (metaSnapshot.playlist.tracks.length === 0) return null
  const safeIdx = Math.min(
    metaSnapshot.playlist.tracks.length - 1,
    Math.max(0, metaSnapshot.trackIndex),
  )
  return metaSnapshot.playlist.tracks[safeIdx] ?? null
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

  const rawBytesPromise: Promise<ArrayBuffer> = (() => {
    const packedBuf = getPackedAssetArrayBuffer(item.url)
    if (packedBuf) return Promise.resolve(packedBuf)
    return fetch(resolveAssetUrl(item.url)).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${item.url}`)
      return res.arrayBuffer()
    })
  })()

  entry.promise = rawBytesPromise
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

export function updateProgressTimerStateCore() {
  if (typeof window === 'undefined') return
  const hasSubs = Boolean(callbacks?.hasProgressSubscribers())
  const shouldTick = metaSnapshot.isPlaying && hasSubs
  if (shouldTick && tickTimer === null) {
    tickTimer = window.setInterval(() => {
      if (!audioCtx || !metaSnapshot.isPlaying || !activeBuffer || !callbacks?.hasProgressSubscribers()) {
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
      activeTrackUrlLoaded = getActiveItem()?.url ?? null
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
  updateProgressTimerStateCore()
  syncProgressSnapshot(true)
  emitMeta()
  scheduleBackgroundBattlePreload()
}

async function loadAndPlayCurrentTrack(autoPlay: boolean) {
  const item = getActiveItem()
  const token = ++activeLoadToken

  stopActiveSourceNode()
  metaSnapshot.isPlaying = false
  updateProgressTimerStateCore()

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
    .catch(() => {})
}

function bindUnlockGesture() {
  if (gestureListenersBound || typeof window === 'undefined') return
  gestureListenersBound = true
  for (const ev of GESTURE_UNLOCK_EVENTS) {
    window.addEventListener(ev, handleFirstUserGesture, true)
  }
}

export function hasBattleBgmTracksCore(): boolean {
  return (audioManifest.events.battle?.length ?? 0) > 0
}

export function preloadBattleBgmCore(): void {
  const battleTracks = audioManifest.events.battle ?? []
  if (battleTracks.length === 0) return
  const firstItem = toPlaylistItems(battleTracks)[0]
  if (!firstItem) return
  pinnedBattleTrackUrl = firstItem.url
  if (decodedBufferCache.has(firstItem.url)) return
  void fetchAndDecodeBuffer(firstItem).catch(() => {})
}

function scheduleBackgroundBattlePreload() {
  if (battlePreloadScheduled || typeof window === 'undefined' || !hasBattleBgmTracksCore()) return
  battlePreloadScheduled = true
  window.setTimeout(() => {
    preloadBattleBgmCore()
  }, 650)
}

export function syncBgmSceneContextCore(viewMode: ViewMode, activeRegionId: string) {
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
    const currentItem = getActiveItem()
    if (currentItem && activeTrackUrlLoaded === currentItem.url) {
      metaSnapshot.playlist = nextPlaylist
      emitMeta()
      return
    }
  }

  if (keyChanged && prevPlaylist.category !== 'events' && prevPlaylist.tracks.length > 0) {
    const livePos = computeLiveProgressCore().currentTime
    playlistSavedOffsets.set(prevKey, livePos)
    playlistLastIndex.set(prevKey, metaSnapshot.trackIndex)
  }

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
    const lastBattleIdx = playlistLastIndex.get(nextKey)
    nextTrackIdx = lastBattleIdx !== undefined ? (lastBattleIdx + 1) % trackCount : 0
    nextOffsetSec = 0
    nextFadeInSec = 0.05
  } else if (prevPlaylist.category === 'events' && nextPlaylist.category !== 'events') {
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
  activeTrackUrlLoaded = getActiveItem()?.url ?? null
  void loadAndPlayCurrentTrack(metaSnapshot.enabled)
}

export function setBgmOverrideCore(opts: {
  characterId?: string | null
  eventId?: string | null
}) {
  if (opts.characterId !== undefined) overrideCharacterId = opts.characterId
  if (opts.eventId !== undefined) overrideEventId = opts.eventId
  syncBgmSceneContextCore(lastSceneParams.viewMode, lastSceneParams.activeRegionId)
}

export function setBgmCombatMoodCore(mood: BgmCombatMood) {
  if (activeCombatMood === mood) return
  activeCombatMood = mood

  const ctx = audioCtx
  if (!ctx) return

  const now = ctx.currentTime
  const targets = getCombatMoodTargets(mood)

  if (activeSource && activePlaybackRate !== targets.rate) {
    const liveCur = computeLiveProgressCore().currentTime
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

export function duckBgmForImpactCore(strength: 'light' | 'medium' | 'heavy') {
  if (!audioCtx || !combatMixGain || !metaSnapshot.isPlaying) return
  if (activeCombatMood === 'aftermath') return

  const now = audioCtx.currentTime
  const baseGain = getCombatMoodTargets(activeCombatMood).mixGain
  const dipRatio = strength === 'heavy' ? 0.46 : strength === 'medium' ? 0.66 : 0.82
  const dipGain = Math.max(0.12, baseGain * dipRatio)
  const holdSec = strength === 'heavy' ? 0.055 : 0.025
  const releaseSec = strength === 'heavy' ? 0.34 : strength === 'medium' ? 0.15 : 0.15

  combatMixGain.gain.cancelScheduledValues(now)
  combatMixGain.gain.setValueAtTime(combatMixGain.gain.value, now)
  combatMixGain.gain.linearRampToValueAtTime(dipGain, now + 0.014)
  combatMixGain.gain.setValueAtTime(dipGain, now + 0.014 + holdSec)
  combatMixGain.gain.linearRampToValueAtTime(baseGain, now + 0.014 + holdSec + releaseSec)
}

export function selectBgmTrackIndexCore(index: number) {
  const count = metaSnapshot.playlist.tracks.length
  if (count === 0) return
  const clamped = ((index % count) + count) % count
  metaSnapshot.trackIndex = clamped
  pausedOffsetSec = 0
  playlistLastIndex.set(metaSnapshot.playlist.playlistKey, clamped)
  activeTrackUrlLoaded = getActiveItem()?.url ?? null
  if (!metaSnapshot.enabled) {
    setBgmEnabledCore(true)
    return
  }
  void loadAndPlayCurrentTrack(true)
}

export function playNextBgmTrackCore() {
  selectBgmTrackIndexCore(metaSnapshot.trackIndex + 1)
}

export function playPrevBgmTrackCore() {
  selectBgmTrackIndexCore(metaSnapshot.trackIndex - 1)
}

export function toggleBgmPlaybackCore() {
  if (metaSnapshot.enabled && !metaSnapshot.isPlaying) {
    setBgmEnabledCore(true)
    return
  }
  setBgmEnabledCore(!metaSnapshot.enabled)
}

export function setBgmEnabledCore(enabled: boolean) {
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
    updateProgressTimerStateCore()
    syncProgressSnapshot(true)
    emitMeta()
    return
  }

  const ctx = ensureAudioContext()
  if (ctx && ctx.state === 'suspended') {
    void ctx
      .resume()
      .then(() => {
        if (
          ctx.state === 'running' &&
          metaSnapshot.enabled &&
          activeBuffer &&
          !metaSnapshot.isPlaying
        ) {
          unbindUnlockGesture()
          startBufferSourceFromOffset(pausedOffsetSec)
        }
      })
      .catch(() => {})
  }

  if (activeBuffer && ctx && ctx.state === 'running') {
    startBufferSourceFromOffset(pausedOffsetSec)
  } else if (!activeBuffer) {
    void loadAndPlayCurrentTrack(true)
  }
}

export function setBgmVolumeCore(clamped: number) {
  metaSnapshot.volume = clamped
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(clamped, audioCtx.currentTime, 0.02)
  }
  if (clamped > 0 && !metaSnapshot.enabled) {
    setBgmEnabledCore(true)
    return
  }
  emitMeta()
}

export function seekBgmToCore(timeSec: number) {
  if (metaSnapshot.playlist.tracks.length === 0) return
  const liveDur = computeLiveProgressCore().duration
  const maxDur = liveDur > 0 ? liveDur - 0.05 : timeSec
  const target = Math.max(0, Math.min(maxDur, timeSec))
  pausedOffsetSec = target

  if (!metaSnapshot.enabled) {
    setBgmEnabledCore(true)
    return
  }
  if (activeBuffer && audioCtx && audioCtx.state === 'running') {
    startBufferSourceFromOffset(target)
  } else {
    syncProgressSnapshot(true)
    void loadAndPlayCurrentTrack(true)
  }
}

export function getAudioCatalogSummaryCore() {
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

export function initBgmCore(params: {
  initialEnabled: boolean
  initialVolume: number
  scene: { viewMode: ViewMode; activeRegionId: string }
  override: { characterId: string | null; eventId: string | null }
  mood: BgmCombatMood
  callbacks: BgmCoreCallbacks
  unlockAudioImmediately: boolean
}) {
  callbacks = params.callbacks
  if (coreInitialized) return
  coreInitialized = true

  lastSceneParams = params.scene
  overrideCharacterId = params.override.characterId
  overrideEventId = params.override.eventId
  activeCombatMood = params.mood

  const playlist = resolveBgmPlaylistForState({
    viewMode: params.scene.viewMode,
    activeRegionId: params.scene.activeRegionId,
    overrideCharacterId,
    overrideEventId,
  })

  metaSnapshot = {
    playlist,
    trackIndex: 0,
    enabled: params.initialEnabled,
    isPlaying: false,
    awaitingGesture: false,
    volume: params.initialVolume,
    activeGainDb: playlist.tracks[0]?.gainDb ?? 0,
    activeIntegratedLufs: playlist.tracks[0]?.integratedLufs ?? null,
  }
  activeTrackUrlLoaded = getActiveItem()?.url ?? null

  if (params.unlockAudioImmediately && params.initialEnabled) {
    const ctx = ensureAudioContext()
    if (ctx && ctx.state === 'suspended') {
      void ctx.resume().catch(() => {})
    }
  }

  emitMeta()
  if (params.initialEnabled) {
    void loadAndPlayCurrentTrack(true)
  }
}
