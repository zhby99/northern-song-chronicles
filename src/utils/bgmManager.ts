import { useSyncExternalStore } from 'react'
import { recordAssetLoaded, resolveAssetUrl } from './assetLoader'

export type BgmCategoryKey = 'world' | 'regions' | 'characters' | 'events'

export interface BgmTrackDef {
  id: string
  category: BgmCategoryKey
  regionId?: string
  characterId?: string
  eventId?: string
  title: string
  subtitle: string
  composerNote: string
  modeLabel: string
  url: string
  durationSec: number
  approxBytes: number
  chapters: Array<{
    startSec: number
    endSec: number
    name: string
    desc: string
  }>
}

export const BGM_TRACKS: BgmTrackDef[] = [
  {
    id: 'dongjing_menghua',
    category: 'regions',
    regionId: 'bianliang',
    title: '《东京梦华》',
    subtitle: '开封府地区配乐 · 曲笛 / 洞箫 / 古筝 / 琵琶 / 编钟 / 笙',
    composerNote:
      '取意孟元老《东京梦华录》与仁宗皇祐盛景：以 D 宫清乐五声起兴，历「汴水晨钟」「御街春晓」「州桥夜市」「樊楼月影」而归于「梦回皇祐」，首尾无缝循环。',
    modeLabel: 'D宫清乐 · 75 BPM',
    url: '/assets/audio/regions/bianliang/dongjing_menghua.mp3',
    durationSec: 102.4,
    approxBytes: 2048000,
    chapters: [
      { startSec: 0, endSec: 12.8, name: '引子 · 汴水晨钟', desc: '相国寺编钟清磬、古筝流水破晓' },
      { startSec: 12.8, endSec: 38.4, name: '呈示 · 御街春晓', desc: '曲笛昂扬主旋律，十里御街冠盖如云' },
      { startSec: 38.4, endSec: 64.0, name: '展开 · 州桥夜市', desc: '樊楼琵琶轮拂交织檀板堂鼓，灯火达旦' },
      { startSec: 64.0, endSec: 89.6, name: '梦幻 · 樊楼月影', desc: '洞箫幽咽独吟，汴河画舫月影清辉' },
      { startSec: 89.6, endSec: 102.4, name: '归韵 · 梦回皇祐', desc: '丝竹余音袅袅收束，无缝回环复始' },
    ],
  },
]

const STORAGE_KEY_VOLUME = 'nsc_bgm_volume_v1'
const STORAGE_KEY_ENABLED = 'nsc_bgm_enabled_v1'

export interface BgmSnapshot {
  trackId: string
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
    // ignore storage errors
  }
  return 0.55
}

function readInitialEnabled(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENABLED)
    if (raw === '0' || raw === 'false') return false
  } catch {
    // ignore storage errors
  }
  return true
}

let audioEl: HTMLAudioElement | null = null
let gestureListenersBound = false
const listeners = new Set<() => void>()

let snapshot: BgmSnapshot = {
  trackId: BGM_TRACKS[0].id,
  enabled: readInitialEnabled(),
  isPlaying: false,
  awaitingGesture: false,
  volume: readInitialVolume(),
  currentTime: 0,
  duration: BGM_TRACKS[0].durationSec,
}

function emit() {
  snapshot = { ...snapshot }
  for (const fn of listeners) {
    fn()
  }
}

export function getActiveBgmTrack(): BgmTrackDef {
  return BGM_TRACKS.find((t) => t.id === snapshot.trackId) ?? BGM_TRACKS[0]
}

export function getCurrentBgmChapter(currentTime: number, track = getActiveBgmTrack()) {
  const t = currentTime % Math.max(1, track.durationSec)
  return (
    track.chapters.find((c) => t >= c.startSec && t < c.endSec) ??
    track.chapters[track.chapters.length - 1]
  )
}

function ensureAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return null
  if (audioEl) return audioEl

  const track = getActiveBgmTrack()
  const el = new Audio()
  el.preload = 'auto'
  el.loop = true
  el.volume = snapshot.volume
  el.src = resolveAssetUrl(track.url)

  el.addEventListener('loadeddata', () => {
    recordAssetLoaded(track.url, track.approxBytes)
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

  el.addEventListener('timeupdate', () => {
    // Throttle state updates to ~2.5Hz so HUD progress stays smooth with minimal React renders
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
  if (!el) return
  el.play()
    .then(() => {
      snapshot.isPlaying = true
      snapshot.awaitingGesture = false
      unbindUnlockGesture()
      emit()
    })
    .catch(() => {
      // Keep waiting if gesture was non-activating
    })
}

function bindUnlockGesture() {
  if (gestureListenersBound || typeof window === 'undefined') return
  gestureListenersBound = true
  window.addEventListener('pointerdown', handleFirstUserGesture, true)
  window.addEventListener('keydown', handleFirstUserGesture, true)
}

export function initBgmAutoStart() {
  if (typeof window === 'undefined') return
  if (!snapshot.enabled) return

  const el = ensureAudioElement()
  if (!el || !el.paused) return

  el.play()
    .then(() => {
      snapshot.isPlaying = true
      snapshot.awaitingGesture = false
      unbindUnlockGesture()
      emit()
    })
    .catch(() => {
      // Browser autoplay policy requires first user gesture; unlock seamlessly on first click/key
      snapshot.awaitingGesture = true
      bindUnlockGesture()
      emit()
    })
}

export function toggleBgmPlayback() {
  const nextEnabled = !snapshot.enabled
  setBgmEnabled(nextEnabled)
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

  if (el) {
    el.volume = snapshot.volume
    el.play()
      .then(() => {
        snapshot.isPlaying = true
        snapshot.awaitingGesture = false
        unbindUnlockGesture()
        emit()
      })
      .catch(() => {
        snapshot.awaitingGesture = true
        bindUnlockGesture()
        emit()
      })
  } else {
    emit()
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
  if (!el) return
  const target = Math.max(0, Math.min(snapshot.duration - 0.1, timeSec))
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
  const total = Math.max(0, Math.floor(sec))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
