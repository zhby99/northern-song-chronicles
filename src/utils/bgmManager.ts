import { useMemo, useSyncExternalStore } from 'react'
import type { ViewMode } from '../types/game'

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

export type BgmCombatMood = 'none' | 'duel' | 'climax' | 'aftermath'

const STORAGE_KEY_VOLUME = 'nsc_bgm_volume_v1'

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

type BgmCoreModule = typeof import('./bgmManagerCore')

let loadedCore: BgmCoreModule | null = null
let coreLoadPromise: Promise<BgmCoreModule> | null = null

let pendingScene: { viewMode: ViewMode; activeRegionId: string } = {
  viewMode: 'region',
  activeRegionId: 'bianliang',
}
let pendingOverride: { characterId: string | null; eventId: string | null } = {
  characterId: null,
  eventId: null,
}
let pendingMood: BgmCombatMood = 'none'

const metaListeners = new Set<() => void>()
const progressListeners = new Set<() => void>()

let metaSnapshot: BgmMetaSnapshot = {
  playlist: {
    playlistKey: 'regions:bianliang',
    category: 'regions',
    sceneTitle: '宋韵雅乐',
    sceneSubtitle: '轻触屏幕或按键后自动奏响无缝循环雅乐',
    isFallbackToWorld: false,
    tracks: [],
  },
  trackIndex: 0,
  enabled: true,
  isPlaying: false,
  awaitingGesture: true,
  volume: readInitialVolume(),
  activeGainDb: 0,
  activeIntegratedLufs: null,
}

let progressSnapshot: BgmProgressSnapshot = {
  currentTime: 0,
  duration: 0,
}

function emitMetaFacade(next?: BgmMetaSnapshot) {
  metaSnapshot = next ? { ...next } : { ...metaSnapshot }
  for (const fn of metaListeners) fn()
}

function emitProgressFacade(next: BgmProgressSnapshot) {
  progressSnapshot = next
  for (const fn of progressListeners) fn()
}

function ensureBgmCore(unlockAudioImmediately = false): Promise<BgmCoreModule | null> {
  if (loadedCore) return Promise.resolve(loadedCore)
  if (!coreLoadPromise) {
    unbindFacadeGesture()
    coreLoadPromise = import('./bgmManagerCore').then((mod) => {
      loadedCore = mod
      mod.initBgmCore({
        initialEnabled: metaSnapshot.enabled,
        initialVolume: metaSnapshot.volume,
        scene: pendingScene,
        override: pendingOverride,
        mood: pendingMood,
        unlockAudioImmediately,
        callbacks: {
          onMetaChange: emitMetaFacade,
          onProgressChange: emitProgressFacade,
          hasProgressSubscribers: () => progressListeners.size > 0,
        },
      })
      return mod
    })
  }
  return coreLoadPromise.catch(() => null)
}

const FACADE_GESTURE_EVENTS = ['pointerdown', 'click', 'touchend', 'keydown'] as const
let facadeGestureBound = false

function onFirstFacadeGesture() {
  unbindFacadeGesture()
  if (!metaSnapshot.enabled) return
  void ensureBgmCore(true)
}

function bindFacadeGesture() {
  if (facadeGestureBound || typeof window === 'undefined') return
  facadeGestureBound = true
  for (const ev of FACADE_GESTURE_EVENTS) {
    window.addEventListener(ev, onFirstFacadeGesture, true)
  }
}

function unbindFacadeGesture() {
  if (!facadeGestureBound || typeof window === 'undefined') return
  facadeGestureBound = false
  for (const ev of FACADE_GESTURE_EVENTS) {
    window.removeEventListener(ev, onFirstFacadeGesture, true)
  }
}

bindFacadeGesture()

export function getActiveTrackItem(
  snap: Pick<BgmMetaSnapshot, 'playlist' | 'trackIndex'> = metaSnapshot,
): BgmPlaylistItem | null {
  if (snap.playlist.tracks.length === 0) return null
  const safeIdx = Math.min(snap.playlist.tracks.length - 1, Math.max(0, snap.trackIndex))
  return snap.playlist.tracks[safeIdx] ?? null
}

export function hasBattleBgmTracks(): boolean {
  return loadedCore ? loadedCore.hasBattleBgmTracksCore() : true
}

export function preloadBattleBgm(): void {
  void ensureBgmCore(false).then((core) => core?.preloadBattleBgmCore())
}

export function syncBgmSceneContext(viewMode: ViewMode, activeRegionId: string) {
  pendingScene = { viewMode, activeRegionId }
  if (loadedCore) {
    loadedCore.syncBgmSceneContextCore(viewMode, activeRegionId)
  }
}

export function setBgmOverride(opts: { characterId?: string | null; eventId?: string | null }) {
  if (opts.characterId !== undefined) pendingOverride.characterId = opts.characterId
  if (opts.eventId !== undefined) pendingOverride.eventId = opts.eventId
  if (loadedCore) {
    loadedCore.setBgmOverrideCore(opts)
  } else if (opts.characterId || opts.eventId) {
    void ensureBgmCore(true)
  }
}

export function setBgmCombatMood(mood: BgmCombatMood) {
  pendingMood = mood
  if (loadedCore) {
    loadedCore.setBgmCombatMoodCore(mood)
  }
}

export function duckBgmForImpact(strength: 'light' | 'medium' | 'heavy') {
  loadedCore?.duckBgmForImpactCore(strength)
}

export function startCombatBgmSession() {
  pendingMood = 'duel'
  pendingOverride.eventId = 'battle'
  if (loadedCore) {
    loadedCore.setBgmCombatMoodCore('duel')
    loadedCore.setBgmOverrideCore({ eventId: 'battle' })
  } else {
    void ensureBgmCore(true)
  }
}

export function endCombatBgmSession() {
  pendingMood = 'none'
  pendingOverride.eventId = null
  if (loadedCore) {
    loadedCore.setBgmCombatMoodCore('none')
    loadedCore.setBgmOverrideCore({ eventId: null })
  }
}

export function selectBgmTrackIndex(index: number) {
  if (loadedCore) {
    loadedCore.selectBgmTrackIndexCore(index)
    return
  }
  metaSnapshot.enabled = true
  void ensureBgmCore(true).then((core) => core?.selectBgmTrackIndexCore(index))
}

export function playNextBgmTrack() {
  if (loadedCore) {
    loadedCore.playNextBgmTrackCore()
    return
  }
  void ensureBgmCore(true).then((core) => core?.playNextBgmTrackCore())
}

export function playPrevBgmTrack() {
  if (loadedCore) {
    loadedCore.playPrevBgmTrackCore()
    return
  }
  void ensureBgmCore(true).then((core) => core?.playPrevBgmTrackCore())
}

export function toggleBgmPlayback() {
  if (loadedCore) {
    loadedCore.toggleBgmPlaybackCore()
    return
  }
  if (metaSnapshot.enabled && !metaSnapshot.isPlaying) {
    void ensureBgmCore(true).then((core) => core?.setBgmEnabledCore(true))
    return
  }
  setBgmEnabled(!metaSnapshot.enabled)
}

export function setBgmEnabled(enabled: boolean) {
  metaSnapshot.enabled = enabled
  if (!enabled && !loadedCore) {
    metaSnapshot.isPlaying = false
    metaSnapshot.awaitingGesture = false
    unbindFacadeGesture()
    emitMetaFacade()
    return
  }
  void ensureBgmCore(true).then((core) => core?.setBgmEnabledCore(enabled))
}

export function setBgmVolume(volume: number) {
  const clamped = Math.min(1, Math.max(0, volume))
  metaSnapshot.volume = clamped
  try {
    localStorage.setItem(STORAGE_KEY_VOLUME, clamped.toFixed(2))
  } catch {
    // ignore
  }
  if (loadedCore) {
    loadedCore.setBgmVolumeCore(clamped)
    return
  }
  if (clamped > 0 && !metaSnapshot.enabled) {
    setBgmEnabled(true)
    return
  }
  emitMetaFacade()
}

export function seekBgmTo(timeSec: number) {
  if (loadedCore) {
    loadedCore.seekBgmToCore(timeSec)
    return
  }
  void ensureBgmCore(true).then((core) => core?.seekBgmToCore(timeSec))
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
    if (loadedCore) {
      progressSnapshot = loadedCore.computeLiveProgressCore()
      loadedCore.updateProgressTimerStateCore()
    } else {
      void ensureBgmCore(false)
    }
  }
  return () => {
    progressListeners.delete(listener)
    if (progressListeners.size === 0) {
      loadedCore?.updateProgressTimerStateCore()
    }
  }
}

function getProgressSnapshot(): BgmProgressSnapshot {
  return progressSnapshot
}

export function useBgmMetaState(): BgmMetaSnapshot {
  return useSyncExternalStore(subscribeMeta, getMetaSnapshot)
}

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

const EMPTY_CATALOG_SUMMARY = {
  worldTracks: 0,
  regionCountWithMusic: 0,
  sharedRegionCount: 0,
  uniqueTrackCount: 0,
  totalRegionTracks: 0,
  totalCharacterTracks: 0,
  totalEventTracks: 0,
}

export function getAudioCatalogSummary() {
  if (loadedCore) {
    return loadedCore.getAudioCatalogSummaryCore()
  }
  void ensureBgmCore(false)
  return EMPTY_CATALOG_SUMMARY
}
