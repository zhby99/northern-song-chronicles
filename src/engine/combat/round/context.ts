import { cloneCombatant } from '../combatants'
import { COMBAT_EFFECT_REGISTRY } from '../effects/registry'
import { getSlotEffectsMap } from '../formulas'
import type { CombatRng } from '../rng'
import type {
  CombatActionChoice,
  CombatantState,
  CombatLogEntry,
  CombatRoundBeat,
  CombatSessionState,
  CombatUnitSnapshot,
  FxKey,
} from '../types'

export interface BlindDecisionEntry {
  fighter: CombatantState
  choice: CombatActionChoice
  targetUnitId: string
}

export interface ScoredOrderEntry extends BlindDecisionEntry {
  agi: number
  instinctInitBonus: number
  hasDuguPriority: boolean
  initScore: number
}

export interface CombatRoundContext {
  session: CombatSessionState
  round: number
  rng: CombatRng
  allies: CombatantState[]
  enemies: CombatantState[]
  player: CombatantState
  isMultiCombat: boolean
  initialPrimaryNpc: CombatantState
  initialPlayerHp: number
  initialPlayerMp: number
  initialNpcHp: number
  initialNpcMp: number
  initialUnitSnapshots: Record<string, CombatUnitSnapshot>
  unitById: Map<string, CombatantState>
  roundEvents: CombatLogEntry[]
  beats: CombatRoundBeat[]
  interruptedIds: Set<string>
  pendingExposedIds: Set<string>
  escapedSuccess: boolean
  currentStepActorUnitId: string | undefined
  currentStepTargetUnitId: string | undefined
  getPrimaryNpc: () => CombatantState
  captureSnapshots: () => Record<string, CombatUnitSnapshot>
  pushLog: (tone: CombatLogEntry['tone'], text: string) => void
  nextPopupId: () => string
  flushBeat: (
    meta: Omit<
      CombatRoundBeat,
      'id' | 'logs' | 'playerHp' | 'playerMp' | 'npcHp' | 'npcMp' | 'unitSnapshots'
    >,
  ) => void
  hasUnflushedLogs: () => boolean
}

export function createCombatRoundContext(
  session: CombatSessionState,
  rng: CombatRng,
): CombatRoundContext {
  const round = session.round
  const sourceAllies =
    session.allies && session.allies.length > 0 ? session.allies : [session.player]
  const sourceEnemies =
    session.enemies && session.enemies.length > 0 ? session.enemies : [session.npc]

  const allies = sourceAllies.map(cloneCombatant)
  const enemies = sourceEnemies.map(cloneCombatant)
  const player = allies[0]!
  const getPrimaryNpc = () => enemies.find((e) => e.hp > 0) ?? enemies[0]!
  const isMultiCombat = allies.length > 1 || enemies.length > 1

  const captureSnapshots = (): Record<string, CombatUnitSnapshot> => {
    const map: Record<string, CombatUnitSnapshot> = {}
    for (const f of [...allies, ...enemies]) {
      map[f.unitId] = { hp: f.hp, mp: f.mp }
    }
    return map
  }

  const initialUnitSnapshots = captureSnapshots()
  const initialPrimaryNpc = getPrimaryNpc()
  const initialPlayerHp = player.hp
  const initialPlayerMp = player.mp
  const initialNpcHp = initialPrimaryNpc.hp
  const initialNpcMp = initialPrimaryNpc.mp

  const roundEvents: CombatLogEntry[] = []
  const beats: CombatRoundBeat[] = []
  let logSeq = 0
  let logCursor = 0
  let popupSeq = 0

  const unitById = new Map<string, CombatantState>(
    [...allies, ...enemies].map((u) => [u.unitId, u]),
  )

  const ctx: CombatRoundContext = {
    session,
    round,
    rng,
    allies,
    enemies,
    player,
    isMultiCombat,
    initialPrimaryNpc,
    initialPlayerHp,
    initialPlayerMp,
    initialNpcHp,
    initialNpcMp,
    initialUnitSnapshots,
    unitById,
    roundEvents,
    beats,
    interruptedIds: new Set<string>(),
    pendingExposedIds: new Set<string>(),
    escapedSuccess: false,
    currentStepActorUnitId: undefined,
    currentStepTargetUnitId: undefined,
    getPrimaryNpc,
    captureSnapshots,
    pushLog(tone, text) {
      logSeq += 1
      roundEvents.push({
        id: `cbt-r${round}-${logSeq}`,
        round,
        tone,
        text,
      })
    },
    nextPopupId() {
      popupSeq += 1
      return `pop-${round}-${popupSeq}`
    },
    flushBeat(meta) {
      const sliced = roundEvents.slice(logCursor)
      logCursor = roundEvents.length
      const resolvedActorUnitId = meta.actorUnitId ?? ctx.currentStepActorUnitId
      const resolvedTargetUnitId = meta.targetUnitId ?? ctx.currentStepTargetUnitId
      const enrichedPopups = meta.popups.map((p) => {
        if (p.unitId) return p
        if (meta.actorSide && p.side === meta.actorSide && resolvedActorUnitId) {
          return { ...p, unitId: resolvedActorUnitId }
        }
        if (meta.targetSide && p.side === meta.targetSide && resolvedTargetUnitId) {
          return { ...p, unitId: resolvedTargetUnitId }
        }
        return {
          ...p,
          unitId: p.side === 'player' ? player.unitId : getPrimaryNpc().unitId,
        }
      })
      const activeNpc = getPrimaryNpc()
      beats.push({
        ...meta,
        actorUnitId: resolvedActorUnitId,
        targetUnitId: resolvedTargetUnitId,
        popups: enrichedPopups,
        id: `beat-${round}-${beats.length + 1}`,
        logs: sliced,
        playerHp: player.hp,
        playerMp: player.mp,
        npcHp: activeNpc.hp,
        npcMp: activeNpc.mp,
        unitSnapshots: captureSnapshots(),
      })
    },
    hasUnflushedLogs: () => logCursor < roundEvents.length,
  }

  // 回合初：运行天阶内功回合初钩子（如紫霞神功叠层）& 清除上回合一次性受控标记
  const livingFightersAtStart = [...allies, ...enemies].filter((f) => f.hp > 0)
  for (const f of livingFightersAtStart) {
    const ngFx = getSlotEffectsMap(f, 'neigong')
    for (const [key, val] of Object.entries(ngFx) as Array<[FxKey, number]>) {
      COMBAT_EFFECT_REGISTRY[key]?.onRoundStart?.(val, f, { pushLog: ctx.pushLog })
    }
    f.stunnedNextRound = false
    f.disarmedNextRound = false
  }

  return ctx
}
