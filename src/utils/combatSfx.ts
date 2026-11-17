import { useSyncExternalStore } from 'react'

export type CombatSfxVfxKind =
  | 'sword'
  | 'blade'
  | 'palm'
  | 'finger'
  | 'polearm'
  | 'hidden'
  | 'sonic'
  | 'poison'
  | 'guard'
  | 'heal'
  | 'escape'

const STORAGE_KEY_SFX_ENABLED = 'nsc_combat_sfx_enabled_v1'

let sfxEnabled = (() => {
  try {
    const v = localStorage.getItem(STORAGE_KEY_SFX_ENABLED)
    return v === null ? true : v === '1'
  } catch {
    return true
  }
})()

const listeners = new Set<() => void>()

function emitSfxChange() {
  for (const fn of listeners) fn()
}

export function isCombatSfxEnabled(): boolean {
  return sfxEnabled
}

export function setCombatSfxEnabled(enabled: boolean): void {
  sfxEnabled = enabled
  try {
    localStorage.setItem(STORAGE_KEY_SFX_ENABLED, enabled ? '1' : '0')
  } catch {
    // ignore
  }
  emitSfxChange()
}

export function toggleCombatSfxEnabled(): boolean {
  const next = !sfxEnabled
  setCombatSfxEnabled(next)
  return next
}

function subscribeSfx(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

export function useCombatSfxEnabled(): boolean {
  return useSyncExternalStore(subscribeSfx, isCombatSfxEnabled)
}

type CombatSfxCoreModule = typeof import('./combatSfxCore')
let loadedSfxCore: CombatSfxCoreModule | null = null
let sfxCorePromise: Promise<CombatSfxCoreModule> | null = null

function ensureSfxCore(): Promise<CombatSfxCoreModule | null> {
  if (loadedSfxCore) return Promise.resolve(loadedSfxCore)
  if (!sfxCorePromise) {
    sfxCorePromise = import('./combatSfxCore').then((mod) => {
      loadedSfxCore = mod
      return mod
    })
  }
  return sfxCorePromise.catch(() => null)
}

export function preloadCombatSfx(): void {
  void ensureSfxCore()
}

export function playSfxCombatStart(): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxCombatStartCore()
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxCombatStartCore())
}

export function playSfxRevealChoices(): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxRevealChoicesCore()
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxRevealChoicesCore())
}

export function playSfxAttackImpact(
  kind: CombatSfxVfxKind,
  opts: { isCrit?: boolean; isGuarded?: boolean; isHeavenTier?: boolean } = {},
): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxAttackImpactCore(kind, opts)
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxAttackImpactCore(kind, opts))
}

export function playSfxDodge(): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxDodgeCore()
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxDodgeCore())
}

export function playSfxGuardStance(): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxGuardStanceCore()
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxGuardStanceCore())
}

export function playSfxHealMedicine(): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxHealMedicineCore()
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxHealMedicineCore())
}

export function playSfxSpecialPulse(): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxSpecialPulseCore()
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxSpecialPulseCore())
}

export function playSfxCombatEnd(
  outcome: 'player_win' | 'npc_win' | 'draw' | 'escaped',
): void {
  if (!sfxEnabled) return
  if (loadedSfxCore) {
    loadedSfxCore.playSfxCombatEndCore(outcome)
    return
  }
  void ensureSfxCore().then((m) => m?.playSfxCombatEndCore(outcome))
}
