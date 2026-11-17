import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  duckBgmForImpact,
  endCombatBgmSession,
  setBgmCombatMood,
  startCombatBgmSession,
} from '../../utils/bgmManager'
import type {
  CombatActionChoice,
  CombatantState,
  CombatLogEntry,
  CombatRoundBeat,
  CombatSessionState,
  MoveActionAvailability,
} from '../../utils/combatEngine'
import {
  playSfxAttackImpact,
  playSfxCombatEnd,
  playSfxCombatStart,
  playSfxDodge,
  playSfxGuardStance,
  playSfxHealMedicine,
  playSfxRevealChoices,
  playSfxSpecialPulse,
} from '../../utils/combatSfx'

export type CombatPaceMode = 'slow' | 'normal' | 'fast'

interface UseCombatChoreographyParams {
  session: CombatSessionState | null
  moveOptions: MoveActionAvailability[]
  escapeAllowed: boolean
  livingEnemiesCount: number
  effectiveTargetId: string
  bagOpen: boolean
  setBagOpen: React.Dispatch<React.SetStateAction<boolean>>
  cycleTargetEnemy: () => void
  submitCombatAction: (choice: CombatActionChoice) => void
  finishCombatSession: () => void
}

export function useCombatChoreography({
  session,
  moveOptions,
  escapeAllowed,
  livingEnemiesCount,
  effectiveTargetId,
  bagOpen,
  setBagOpen,
  cycleTargetEnemy,
  submitCombatAction,
  finishCombatSession,
}: UseCombatChoreographyParams) {
  const [paceMode, setPaceMode] = useState<CombatPaceMode>(() => {
    try {
      const saved = localStorage.getItem('nsc_combat_pace_v2')
      if (saved === 'slow' || saved === 'normal' || saved === 'fast') return saved
    } catch {
      // ignore
    }
    return 'normal'
  })

  const paceScale = paceMode === 'slow' ? 1.42 : paceMode === 'fast' ? 0.56 : 1.0

  const [beatProgress, setBeatProgress] = useState<{
    roundKey: string
    beatIdx: number
    subPhase: 'impact' | 'settle'
    done: boolean
  }>({ roundKey: '', beatIdx: 0, subPhase: 'impact', done: true })

  const lastStartedSessionIdRef = useRef<string | null>(null)

  const currentRoundKey = session?.lastRoundSummary
    ? `${session.sessionId}:r${session.lastRoundSummary.round}`
    : null
  const currentBeats = session?.lastRoundSummary?.beats ?? []
  const currentBeatIdx = currentRoundKey
    ? beatProgress.roundKey === currentRoundKey
      ? beatProgress.beatIdx
      : 0
    : 0
  const currentSubPhase: 'impact' | 'settle' =
    currentRoundKey && beatProgress.roundKey === currentRoundKey
      ? beatProgress.subPhase
      : 'impact'
  const isRoundDone =
    !currentRoundKey ||
    currentBeats.length === 0 ||
    (beatProgress.roundKey === currentRoundKey && beatProgress.done) ||
    currentBeatIdx >= currentBeats.length
  const isAnimating = !isRoundDone
  const activeBeat: CombatRoundBeat | null = isAnimating
    ? (currentBeats[currentBeatIdx] ?? null)
    : null

  const activeSessionId = session?.sessionId ?? null
  const liveShownPlayerHp = session ? (activeBeat ? activeBeat.playerHp : session.player.hp) : 100
  const liveShownNpcHp = session ? (activeBeat ? activeBeat.npcHp : session.npc.hp) : 100
  const isVisualAftermath = Boolean(
    session && session.outcome !== 'ongoing' && (!isAnimating || activeBeat?.kind === 'end'),
  )
  const isVisualClimax = Boolean(
    session &&
      !isVisualAftermath &&
      (liveShownPlayerHp / Math.max(1, session.player.maxHp) <= 0.32 ||
        liveShownNpcHp / Math.max(1, session.npc.maxHp) <= 0.32),
  )

  const cyclePaceMode = useCallback(() => {
    setPaceMode((prev) => {
      const next = prev === 'normal' ? 'slow' : prev === 'slow' ? 'fast' : 'normal'
      try {
        localStorage.setItem('nsc_combat_pace_v2', next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const skipChoreography = useCallback(() => {
    if (!session || !currentRoundKey) return
    if (session.outcome !== 'ongoing') {
      playSfxCombatEnd(session.outcome)
    }
    setBeatProgress({
      roundKey: currentRoundKey,
      beatIdx: currentBeats.length,
      subPhase: 'impact',
      done: true,
    })
  }, [session, currentRoundKey, currentBeats.length])

  // Switch into & out of battle BGM
  useEffect(() => {
    if (!activeSessionId) return
    startCombatBgmSession()
    return () => {
      endCombatBgmSession()
    }
  }, [activeSessionId])

  // Dynamic battle BGM mood progression
  useEffect(() => {
    if (!activeSessionId) return
    if (isVisualAftermath) {
      setBgmCombatMood('aftermath')
    } else if (isVisualClimax) {
      setBgmCombatMood('climax')
    } else {
      setBgmCombatMood('duel')
    }
  }, [activeSessionId, isVisualAftermath, isVisualClimax])

  // Opening war drum & sword draw SFX
  useEffect(() => {
    if (!session) {
      lastStartedSessionIdRef.current = null
      return
    }
    if (lastStartedSessionIdRef.current !== session.sessionId) {
      lastStartedSessionIdRef.current = session.sessionId
      playSfxCombatStart()
    }
  }, [session])

  // Beat-by-beat choreography timer & SFX triggers
  useEffect(() => {
    if (!isAnimating || !activeBeat || !currentRoundKey || !session) return

    const hasSettleBreather =
      activeBeat.kind === 'attack' ||
      activeBeat.kind === 'dodge' ||
      activeBeat.kind === 'escape'

    if (currentSubPhase === 'impact') {
      if (activeBeat.kind === 'reveal') {
        playSfxRevealChoices()
        if (activeBeat.vfxCategory === 'guard') {
          playSfxGuardStance()
        }
      } else if (activeBeat.kind === 'attack') {
        duckBgmForImpact(
          activeBeat.isCrit || activeBeat.isHeavenTier || activeBeat.shakeLevel === 3
            ? 'heavy'
            : activeBeat.isGuarded || activeBeat.shakeLevel === 2
              ? 'medium'
              : 'light',
        )
        playSfxAttackImpact(activeBeat.vfxCategory ?? 'palm', {
          isCrit: activeBeat.isCrit,
          isGuarded: activeBeat.isGuarded,
          isHeavenTier: activeBeat.isHeavenTier,
        })
      } else if (activeBeat.kind === 'dodge' || activeBeat.kind === 'escape') {
        playSfxDodge()
      } else if (activeBeat.kind === 'item') {
        playSfxHealMedicine()
      } else if (activeBeat.kind === 'status') {
        playSfxSpecialPulse()
      } else if (activeBeat.kind === 'end' && session.outcome !== 'ongoing') {
        playSfxCombatEnd(session.outcome)
      }
    }

    const isHeavyBeat = Boolean(
      activeBeat.isCrit || activeBeat.isHeavenTier || activeBeat.popups.length >= 2,
    )

    let baseMs: number
    if (hasSettleBreather && currentSubPhase === 'impact') {
      baseMs = activeBeat.kind === 'attack' ? (isHeavyBeat ? 1220 : 1040) : 920
    } else if (hasSettleBreather && currentSubPhase === 'settle') {
      baseMs = activeBeat.kind === 'attack' ? (isHeavyBeat ? 1040 : 880) : 740
    } else {
      baseMs =
        activeBeat.kind === 'reveal'
          ? 1260
          : activeBeat.kind === 'item'
            ? 1520
            : activeBeat.kind === 'end'
              ? 1460
              : 1300
    }

    const waitMs = Math.max(260, Math.round(baseMs * paceScale))

    const timer = window.setTimeout(() => {
      if (hasSettleBreather && currentSubPhase === 'impact') {
        setBeatProgress({
          roundKey: currentRoundKey,
          beatIdx: currentBeatIdx,
          subPhase: 'settle',
          done: false,
        })
      } else if (currentBeatIdx + 1 < currentBeats.length) {
        setBeatProgress({
          roundKey: currentRoundKey,
          beatIdx: currentBeatIdx + 1,
          subPhase: 'impact',
          done: false,
        })
      } else {
        if (session.outcome !== 'ongoing' && activeBeat.kind !== 'end') {
          playSfxCombatEnd(session.outcome)
        }
        setBeatProgress({
          roundKey: currentRoundKey,
          beatIdx: currentBeats.length,
          subPhase: 'impact',
          done: true,
        })
      }
    }, waitMs)

    return () => window.clearTimeout(timer)
  }, [
    isAnimating,
    activeBeat,
    currentRoundKey,
    currentBeatIdx,
    currentSubPhase,
    currentBeats.length,
    session,
    paceScale,
  ])

  const visibleLogs: CombatLogEntry[] = useMemo(() => {
    if (!session) return []
    if (!isAnimating || !session.lastRoundSummary) {
      return session.logs
    }
    const prevCount = Math.max(
      0,
      session.logs.length - session.lastRoundSummary.events.length,
    )
    const baseLogs = session.logs.slice(0, prevCount)
    const revealedLogs = session.lastRoundSummary.beats
      .slice(0, currentBeatIdx + 1)
      .flatMap((b) => b.logs)
    return [...baseLogs, ...revealedLogs]
  }, [session, isAnimating, currentBeatIdx])

  // Global combat keyboard shortcuts
  useEffect(() => {
    if (!session) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (isAnimating) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          e.stopPropagation()
          skipChoreography()
        }
        return
      }
      if (session.outcome !== 'ongoing') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          finishCombatSession()
        }
        return
      }
      if (e.key === 'Tab' && livingEnemiesCount > 1) {
        e.preventDefault()
        e.stopPropagation()
        cycleTargetEnemy()
        return
      }
      if (e.key === 'Escape' && bagOpen) {
        e.preventDefault()
        e.stopPropagation()
        setBagOpen(false)
        return
      }
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        setBagOpen((v) => !v)
        return
      }
      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const idx = Number(e.key) - 1
        const opt = moveOptions[idx]
        if (opt && !opt.disabled && opt.art) {
          e.preventDefault()
          setBagOpen(false)
          submitCombatAction({ type: 'move', slot: opt.slot, targetId: effectiveTargetId })
        }
      } else if (e.key === '5' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setBagOpen(false)
        submitCombatAction({ type: 'defend' })
      } else if (e.key === '6' || e.key === 'e' || e.key === 'E') {
        if (escapeAllowed) {
          e.preventDefault()
          setBagOpen(false)
          submitCombatAction({ type: 'escape' })
        }
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [
    session,
    isAnimating,
    bagOpen,
    setBagOpen,
    moveOptions,
    escapeAllowed,
    livingEnemiesCount,
    effectiveTargetId,
    cycleTargetEnemy,
    skipChoreography,
    submitCombatAction,
    finishCombatSession,
  ])

  const getUnitShownHp = useCallback(
    (unit: CombatantState) => {
      if (!activeBeat) return unit.hp
      const snap = activeBeat.unitSnapshots?.[unit.unitId]
      if (snap) return snap.hp
      return unit.team === 'ally' ? activeBeat.playerHp : activeBeat.npcHp
    },
    [activeBeat],
  )

  const getUnitShownMp = useCallback(
    (unit: CombatantState) => {
      if (!activeBeat) return unit.mp
      const snap = activeBeat.unitSnapshots?.[unit.unitId]
      if (snap) return snap.mp
      return unit.team === 'ally' ? activeBeat.playerMp : activeBeat.npcMp
    },
    [activeBeat],
  )

  return {
    paceMode,
    paceScale,
    cyclePaceMode,
    skipChoreography,
    isAnimating,
    activeBeat,
    currentSubPhase,
    isVisualClimax,
    visibleLogs,
    getUnitShownHp,
    getUnitShownMp,
  }
}
