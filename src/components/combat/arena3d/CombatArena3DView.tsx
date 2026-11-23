import { Package, Shield, Sparkles, Swords, Wind } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  COMBAT_ITEM_USE_LIMIT,
  type CombatOutcome,
  type CombatSessionState,
  type MoveSlotKey,
} from '../../../engine/combat'
import {
  applyArenaItemDrink,
  ArenaInputController,
  ArenaRenderer3D,
  createArenaSimState,
  inferArenaTheme,
  stepArenaSimulation,
  type ArenaSimState,
} from '../../../engine/combat3d'
import {
  duckBgmForImpact,
  endCombatBgmSession,
  setBgmCombatMood,
  startCombatBgmSession,
} from '../../../utils/bgmManager'
import {
  playSfxAttackImpact,
  playSfxCombatEnd,
  playSfxCombatStart,
  playSfxCounterExecute,
  playSfxDodge,
  playSfxGuardStance,
  playSfxHealMedicine,
  playSfxParryClang,
  playSfxSwordSwing,
  playSfxTelegraphWarn,
} from '../../../utils/combatSfx'
import { CutoutPortraitImg } from '../../common/CutoutPortraitImg'
import { CombatCenterBanner } from '../CombatCenterBanner'
import { CombatItemDrawer, type CombatBagStackEntry } from '../CombatItemDrawer'
import { CombatActionDeck } from '../CombatActionDeck'

interface CombatArena3DViewProps {
  session: CombatSessionState
  sceneTitle: string
  escapeAllowed: boolean
  combatBagItems: CombatBagStackEntry[]
  consumedOnceItemIds: string[]
  onConsumeItem: (itemId: string) => {
    applied: boolean
    itemName: string
    healHp: number
    healMp: number
    poisonDmg: number
    reason?: string
  }
  onSyncProgress: (payload: {
    playerHp: number
    playerMp: number
    enemyHps: Record<string, number>
    allyHps?: Record<string, number>
    outcome: CombatOutcome
    elapsedRounds?: number
    summaryLogText?: string
  }) => void
  onFinishCombat: () => void
  onSwitchToClassic: () => void
}

interface ProjectedFloatItem {
  id: string
  x: number
  y: number
  text: string
  tone: string
  opacity: number
}

interface HudSnapshot {
  playerHp: number
  playerMaxHp: number
  playerMp: number
  playerMaxMp: number
  playerPosture: number
  playerMaxPosture: number
  playerItemUses: number
  dodgeCd: number
  dodgeCdMax: number
  counterWindow: number
  guardHeld: boolean
  escapeProgress: number
  surviveTimer: number
  outcome: CombatOutcome
  outcomeBanner: string | null
  skills: Array<{
    slot: MoveSlotKey
    name: string
    cooldown: number
    cooldownMax: number
    mpCost: number
    isHeavenTier: boolean
  }>
  enemies: Array<{
    unitId: string
    name: string
    title: string
    portraitUrl: string
    hp: number
    maxHp: number
    posture: number
    maxPosture: number
    exposed: boolean
  }>
  floats: ProjectedFloatItem[]
  debugText: string
}

declare global {
  interface Window {
    __NSC_ARENA_DEBUG__?: {
      step: (frames?: number, dt?: number) => void
      press: (...codes: string[]) => void
      getState: () => {
        elapsedTime: number
        outcome: CombatOutcome
        hitCount: number
        parryCount: number
        executeCount: number
        player: { x: number; z: number; hp: number; mp: number; posture: number; actionState: string }
        enemies: Array<{ name: string; x: number; z: number; hp: number; posture: number; exposedTimer: number }>
        vfxCount: number
        isWebGLSupported: boolean
      }
    }
  }
}

export function CombatArena3DView({
  session,
  sceneTitle,
  escapeAllowed,
  combatBagItems,
  consumedOnceItemIds,
  onConsumeItem,
  onSyncProgress,
  onFinishCombat,
  onSwitchToClassic,
}: CombatArena3DViewProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const simRef = useRef<ArenaSimState | null>(null)
  const rendererRef = useRef<ArenaRenderer3D | null>(null)
  const inputRef = useRef<ArenaInputController>(new ArenaInputController())
  const syncedOutcomeRef = useRef<string | null>(null)

  const [bagOpen, setBagOpen] = useState(false)
  const [f3Open, setF3Open] = useState(false)
  const [itemNotice, setItemNotice] = useState<string | null>(null)
  const [webglFallbackNotice, setWebglFallbackNotice] = useState(false)

  // 延迟掉血残影条（玩家 & 主敌）
  const [playerHpTrail, setPlayerHpTrail] = useState(session.player.hp)
  const [enemyHpTrail, setEnemyHpTrail] = useState(session.npc.hp)
  const [hud, setHud] = useState<HudSnapshot | null>(null)

  // 触屏摇杆状态
  const [stickPos, setStickPos] = useState<{ active: boolean; ox: number; oy: number; dx: number; dy: number }>({
    active: false,
    ox: 0,
    oy: 0,
    dx: 0,
    dy: 0,
  })

  const buildSnapshot = useCallback((sim: ArenaSimState): HudSnapshot => {
    const player = sim.actors.find((a) => a.isPlayer) ?? sim.actors[0]!
    const enemies = sim.actors.filter((a) => a.team === 'enemy')
    const w = stageRef.current?.clientWidth ?? 1280
    const h = stageRef.current?.clientHeight ?? 720
    const floats: ProjectedFloatItem[] = []
    if (rendererRef.current?.isWebGLSupported) {
      for (const ft of sim.floatingTexts) {
        const prog = ft.age / Math.max(0.01, ft.duration)
        const p = rendererRef.current.projectToScreen(ft.x, ft.y + prog * 0.75, ft.z, w, h)
        if (p.visible) {
          floats.push({
            id: ft.id,
            x: p.x,
            y: p.y,
            text: ft.text,
            tone: ft.tone,
            opacity: prog > 0.7 ? Math.max(0, 1 - (prog - 0.7) / 0.3) : 1,
          })
        }
      }
    }

    const diag = inputRef.current.getDiagnostics()
    const e0 = enemies[0]
    const debugText = [
      `held: ${diag.heldKeys.join(' ') || '-'} | touch: ${diag.hasTouchInput}`,
      `player: (${player.x.toFixed(2)}, ${player.z.toFixed(2)}) state=${player.actionState} invuln=${player.invulnTimer.toFixed(2)}s`,
      e0
        ? `foe0(${e0.name}): (${e0.x.toFixed(2)}, ${e0.z.toFixed(2)}) hp=${Math.round(e0.hp)}/${e0.maxHp} state=${e0.actionState}`
        : 'foe0: none',
      `hits=${sim.hitCount} parries=${sim.parryCount} executes=${sim.executeCount} vfx=${sim.vfxEvents.length}`,
      `recent: ${diag.recentLog.join(' ')}`,
    ].join('\n')

    return {
      playerHp: Math.round(player.hp),
      playerMaxHp: player.maxHp,
      playerMp: Math.round(player.mp),
      playerMaxMp: player.maxMp,
      playerPosture: Math.round(player.posture),
      playerMaxPosture: player.maxPosture,
      playerItemUses: player.itemUses,
      dodgeCd: player.dodgeCooldown,
      dodgeCdMax: player.stats.dodgeCooldownMax,
      counterWindow: player.counterWindowTimer,
      guardHeld: player.guardHeld,
      escapeProgress: sim.escapeHoldProgress,
      surviveTimer: sim.surviveTimer,
      outcome: sim.outcome,
      outcomeBanner: sim.outcomeBanner,
      skills: player.skills.map((sk) => ({
        slot: sk.slot,
        name: sk.name,
        cooldown: sk.cooldown,
        cooldownMax: sk.cooldownMax,
        mpCost: sk.mpCost,
        isHeavenTier: sk.isHeavenTier,
      })),
      enemies: enemies.map((e) => ({
        unitId: e.unitId,
        name: e.name,
        title: e.title,
        portraitUrl: e.portraitUrl,
        hp: Math.round(e.hp),
        maxHp: e.maxHp,
        posture: Math.round(e.posture),
        maxPosture: e.maxPosture,
        exposed: e.exposedTimer > 0,
      })),
      floats,
      debugText,
    }
  }, [])

  const flushSfx = useCallback((sim: ArenaSimState) => {
    while (sim.sfxQueue.length > 0) {
      const ev = sim.sfxQueue.shift()
      if (!ev) break
      if (ev.type === 'swing') playSfxSwordSwing(ev.vfx)
      else if (ev.type === 'parry') {
        duckBgmForImpact('heavy')
        playSfxParryClang()
      } else if (ev.type === 'execute') {
        duckBgmForImpact('heavy')
        playSfxCounterExecute()
      } else if (ev.type === 'dodge') playSfxDodge()
      else if (ev.type === 'guard') playSfxGuardStance()
      else if (ev.type === 'telegraph') playSfxTelegraphWarn()
      else if (ev.type === 'heal') playSfxHealMedicine()
      else if (ev.type === 'impact') {
        if (ev.isCrit || ev.isHeavenTier) duckBgmForImpact('heavy')
        playSfxAttackImpact(ev.vfx, {
          isCrit: ev.isCrit,
          isGuarded: ev.isGuarded,
          isHeavenTier: ev.isHeavenTier,
        })
      } else if (ev.type === 'end') {
        playSfxCombatEnd(ev.outcome)
      }
    }
  }, [])

  // 战阵 BGM
  useEffect(() => {
    startCombatBgmSession()
    playSfxCombatStart()
    return () => {
      endCombatBgmSession()
    }
  }, [session.sessionId])

  useEffect(() => {
    if (!hud) return
    if (hud.outcome !== 'ongoing') {
      setBgmCombatMood('aftermath')
    } else if (
      hud.playerHp / Math.max(1, hud.playerMaxHp) <= 0.32 ||
      (hud.enemies[0] && hud.enemies[0].hp / Math.max(1, hud.enemies[0].maxHp) <= 0.32)
    ) {
      setBgmCombatMood('climax')
    } else {
      setBgmCombatMood('duel')
    }
  }, [hud])

  // 延迟掉血残影平滑追赶
  useEffect(() => {
    if (!hud) return
    const timer = window.setInterval(() => {
      setPlayerHpTrail((prev) =>
        prev > hud.playerHp ? Math.max(hud.playerHp, prev - Math.max(2, Math.ceil((prev - hud.playerHp) * 0.14))) : hud.playerHp,
      )
      const e0Hp = hud.enemies[0]?.hp ?? 0
      setEnemyHpTrail((prev) =>
        prev > e0Hp ? Math.max(e0Hp, prev - Math.max(2, Math.ceil((prev - e0Hp) * 0.14))) : e0Hp,
      )
    }, 45)
    return () => window.clearInterval(timer)
  }, [hud])

  // 主 3D 演武循环 + 输入 + 确定性调试钩子
  useEffect(() => {
    const container = stageRef.current
    if (!container) return

    const theme = inferArenaTheme(sceneTitle)
    const sim = createArenaSimState(session, theme)
    sim.escapeAllowed = escapeAllowed
    simRef.current = sim
    syncedOutcomeRef.current = null

    const renderer = new ArenaRenderer3D(container, sim)
    rendererRef.current = renderer
    if (!renderer.isWebGLSupported) {
      setWebglFallbackNotice(true)
    }

    const inputCtrl = inputRef.current
    const detach = inputCtrl.attach(container, {
      onToggleDebugPanel: () => setF3Open((v) => !v),
      onOpenBag: () => setBagOpen((v) => !v),
    })

    const advanceOneFrame = (dt: number) => {
      if (renderer.isWebGLSupported) {
        const hit = renderer.raycastGroundAim(inputCtrl.mouseNdc.x, inputCtrl.mouseNdc.y)
        inputCtrl.aimWorldPoint = hit
      }
      const frameInput = inputCtrl.sampleFrame()
      stepArenaSimulation(sim, frameInput, dt)
      inputCtrl.endFrame()
      flushSfx(sim)
      if (renderer.isWebGLSupported) {
        renderer.render(sim)
      }
      if (sim.outcome !== 'ongoing' && syncedOutcomeRef.current !== sim.sessionId) {
        syncedOutcomeRef.current = sim.sessionId
        const player = sim.actors.find((a) => a.isPlayer)!
        const enemyHps: Record<string, number> = {}
        const allyHps: Record<string, number> = {}
        for (const a of sim.actors) {
          if (a.team === 'enemy') enemyHps[a.unitId] = a.hp
          else allyHps[a.unitId] = a.hp
        }
        onSyncProgress({
          playerHp: player.hp,
          playerMp: player.mp,
          enemyHps,
          allyHps,
          outcome: sim.outcome,
          elapsedRounds: Math.max(1, Math.round(sim.elapsedTime / 4)),
          summaryLogText: `【3D演武】历经 ${sim.elapsedTime.toFixed(1)} 秒交锋（命中 ${sim.hitCount} · 弹反 ${sim.parryCount} · 处决 ${sim.executeCount}），${sim.outcomeBanner ?? '分出胜负'}`,
        })
      }
    }

    window.__NSC_ARENA_DEBUG__ = {
      step: (frames = 10, dt = 1 / 60) => {
        for (let i = 0; i < frames; i += 1) {
          advanceOneFrame(dt)
        }
        setHud(buildSnapshot(sim))
      },
      press: (...codes: string[]) => {
        inputCtrl.simulatePress(...codes)
      },
      getState: () => {
        const p = sim.actors.find((a) => a.isPlayer) ?? sim.actors[0]!
        return {
          elapsedTime: sim.elapsedTime,
          outcome: sim.outcome,
          hitCount: sim.hitCount,
          parryCount: sim.parryCount,
          executeCount: sim.executeCount,
          player: {
            x: p.x,
            z: p.z,
            hp: p.hp,
            mp: p.mp,
            posture: p.posture,
            actionState: p.actionState,
          },
          enemies: sim.actors
            .filter((a) => a.team === 'enemy')
            .map((e) => ({
              name: e.name,
              x: e.x,
              z: e.z,
              hp: e.hp,
              posture: e.posture,
              exposedTimer: e.exposedTimer,
            })),
          vfxCount: sim.vfxEvents.length,
          isWebGLSupported: renderer.isWebGLSupported,
        }
      },
    }

    const onResize = () => {
      if (stageRef.current) {
        renderer.updateSize(stageRef.current.clientWidth, stageRef.current.clientHeight)
      }
    }
    window.addEventListener('resize', onResize)

    let rafId = 0
    let lastTs = performance.now()
    let hudTick = 0

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTs) / 1000))
      lastTs = now
      advanceOneFrame(dt)
      hudTick += 1
      if (hudTick % 2 === 0 || sim.outcome !== 'ongoing') {
        setHud(buildSnapshot(sim))
      }
      rafId = window.requestAnimationFrame(loop)
    }

    setHud(buildSnapshot(sim))
    rafId = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      detach()
      inputCtrl.detachAll()
      delete window.__NSC_ARENA_DEBUG__
      renderer.dispose()
      rendererRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.sessionId])

  const handleUseBagItem = (itemId: string) => {
    const res = onConsumeItem(itemId)
    if (!res.applied) {
      setItemNotice(res.reason ?? '此时无法使用')
      return
    }
    setBagOpen(false)
    setItemNotice(null)
    if (simRef.current) {
      applyArenaItemDrink(simRef.current, res.itemName, res.healHp, res.healMp, res.poisonDmg)
      flushSfx(simRef.current)
      setHud(buildSnapshot(simRef.current))
    }
  }

  const handleSwitchMode = () => {
    if (simRef.current && simRef.current.outcome === 'ongoing') {
      const sim = simRef.current
      const p = sim.actors.find((a) => a.isPlayer)!
      const enemyHps: Record<string, number> = {}
      const allyHps: Record<string, number> = {}
      for (const a of sim.actors) {
        if (a.team === 'enemy') enemyHps[a.unitId] = a.hp
        else allyHps[a.unitId] = a.hp
      }
      onSyncProgress({
        playerHp: p.hp,
        playerMp: p.mp,
        enemyHps,
        allyHps,
        outcome: 'ongoing',
      })
    }
    onSwitchToClassic()
  }

  const primaryEnemy = hud?.enemies[0]
  const playerHpPct = hud ? Math.max(0, Math.min(100, (hud.playerHp / Math.max(1, hud.playerMaxHp)) * 100)) : 100
  const playerTrailPct = hud ? Math.max(playerHpPct, Math.min(100, (playerHpTrail / Math.max(1, hud.playerMaxHp)) * 100)) : 100
  const playerMpPct = hud ? Math.max(0, Math.min(100, (hud.playerMp / Math.max(1, hud.playerMaxMp)) * 100)) : 100
  const playerPosturePct = hud ? Math.max(0, Math.min(100, (hud.playerPosture / Math.max(1, hud.playerMaxPosture)) * 100)) : 0

  const enemyHpPct = primaryEnemy ? Math.max(0, Math.min(100, (primaryEnemy.hp / Math.max(1, primaryEnemy.maxHp)) * 100)) : 100
  const enemyTrailPct = primaryEnemy ? Math.max(enemyHpPct, Math.min(100, (enemyHpTrail / Math.max(1, primaryEnemy.maxHp)) * 100)) : 100
  const enemyPosturePct = primaryEnemy ? Math.max(0, Math.min(100, (primaryEnemy.posture / Math.max(1, primaryEnemy.maxPosture)) * 100)) : 0

  const noop = useMemo(() => () => {}, [])

  return (
    <div
      className="fixed inset-0 z-45 pointer-events-auto select-none overflow-hidden bg-[#120d09] text-[#f5e7cb]"
      role="dialog"
      aria-label="北宋三维演武场"
    >
      {/* 1. Three.js 3D 演武画布 */}
      <div ref={stageRef} className="absolute inset-0 w-full h-full" />

      {/* 无 WebGL 硬件加速时提示切换策略模式 */}
      {webglFallbackNotice && (
        <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center bg-[#140e09]/92">
          <div className="pointer-events-auto max-w-md rounded-2xl border border-[#d4a455]/70 bg-[#1c130c] p-5 text-center shadow-2xl">
            <div className="song-serif text-lg font-bold text-[#fde68a]">当前环境暂未开启 WebGL 3D 渲染</div>
            <p className="mt-2 text-xs text-[#d6be9a] leading-relaxed">
              可直接切换至「策略盲选」回合界面继续交锋，玩法数值与奖励完全一致。
            </p>
            <button
              type="button"
              onClick={handleSwitchMode}
              className="mt-4 px-4 py-2 rounded-lg bg-[#7d1d14] border border-[#f5c76b] text-xs font-bold text-[#fff3c4] cursor-pointer"
            >
              切换至策略盲选模式
            </button>
          </div>
        </div>
      )}

      {/* 2. 屏幕空间投影漂浮伤害数字 */}
      <div className="pointer-events-none fixed inset-0 z-15 overflow-hidden">
        {hud?.floats.map((f) => (
          <div
            key={f.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 song-serif font-black tracking-wide whitespace-nowrap ${
              f.tone === 'crit' || f.tone === 'parry'
                ? 'text-2xl sm:text-3xl text-[#fde047] drop-shadow-[0_2px_10px_rgba(220,38,38,0.95)]'
                : f.tone === 'dodge'
                  ? 'text-xl font-bold italic text-[#7dd3fc] drop-shadow-[0_2px_8px_rgba(8,145,178,0.95)]'
                  : f.tone === 'heal'
                    ? 'text-xl font-bold text-[#86efac] drop-shadow-[0_2px_8px_rgba(6,95,70,0.95)]'
                    : f.tone === 'guard'
                      ? 'text-lg font-bold text-[#a7f3d0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
                      : 'text-xl sm:text-2xl text-[#ff7b6b] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
            }`}
            style={{ left: `${f.x}px`, top: `${f.y}px`, opacity: f.opacity }}
          >
            {f.text}
          </div>
        ))}
      </div>

      {/* 3. F3 诊断面板 */}
      {f3Open && hud && (
        <pre className="pointer-events-none fixed left-3 top-28 z-40 rounded-lg border border-[#34d399]/50 bg-black/75 px-3 py-2 font-mono text-[11px] leading-snug text-[#9fe0c0] whitespace-pre">
          {hud.debugText}
        </pre>
      )}

      {/* 4. 顶部代码绘制武侠血条 & 双模切换栏 */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-2.5 pointer-events-none">
        {/* 主角代码绘制血条 / 架势 / 内力 */}
        <div className="pointer-events-auto w-full lg:w-[330px] rounded-xl border border-[#d4a455]/70 bg-[#17100a]/85 backdrop-blur-md p-2.5 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#e6b968]/70 bg-[#261a11] shrink-0">
              <CutoutPortraitImg url={session.player.portraitUrl} alt={session.player.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="song-serif text-sm font-bold text-[#ffebc2] truncate">{session.player.name}</span>
                <span className="font-mono text-[11px] text-[#fca5a5]">
                  {hud?.playerHp ?? session.player.hp} / {session.player.maxHp}
                </span>
              </div>
              {/* 斜切端头细框 + 延迟伤势残影血条 */}
              <div className="mt-1 h-3 bg-[#1f140f] border border-[#b48a4e]/75 overflow-hidden relative" style={{ transform: 'skewX(-14deg)' }}>
                <div
                  className="absolute inset-y-0 left-0 bg-[#fef08a]/85 transition-none"
                  style={{ width: `${playerTrailPct}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#f87171]"
                  style={{ width: `${playerHpPct}%` }}
                />
                <div
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_6px_#fff]"
                  style={{ left: `calc(${playerHpPct}% - 1px)` }}
                />
              </div>
              {/* 内力 & 架势条 */}
              <div className="mt-1 grid grid-cols-2 gap-1.5">
                <div className="h-1.5 bg-[#0f172a] border border-[#38bdf8]/45 overflow-hidden" style={{ transform: 'skewX(-14deg)' }}>
                  <div className="h-full bg-gradient-to-r from-[#0284c7] to-[#7dd3fc]" style={{ width: `${playerMpPct}%` }} />
                </div>
                <div className="h-1.5 bg-[#1c140d] border border-[#fbbf24]/45 overflow-hidden" style={{ transform: 'skewX(-14deg)' }}>
                  <div className="h-full bg-gradient-to-r from-[#d97706] to-[#fde047]" style={{ width: `${playerPosturePct}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 顶部中枢铭牌 + 双模一键切换 */}
        <div className="flex flex-col items-center gap-1.5">
          <CombatCenterBanner
            mode={session.mode}
            formationTag={session.enemies.length > 1 ? `${session.allies.length}v${session.enemies.length}` : null}
            sceneTitle={sceneTitle}
            shownRound={session.round}
            maxRounds={session.maxRounds}
            isVisualClimax={false}
            paceMode="normal"
            onCyclePaceMode={noop}
            npcName={session.npc.name}
            playerEffAgi={session.player.agility}
            npcEffAgi={session.npc.agility}
          />
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleSwitchMode}
              className="px-3 py-1 rounded-full bg-[#2b1d12]/90 hover:bg-[#3f2a19] border border-[#f5c76b]/80 text-[11px] song-serif font-bold text-[#ffe9b8] shadow-lg flex items-center gap-1.5 cursor-pointer transition"
              title="随时切换为回合制策略盲选画面"
            >
              <Swords className="w-3.5 h-3.5 text-[#fbbf24]" />
              切回策略盲选
            </button>
            {session.surviveToWin && hud && hud.outcome === 'ongoing' && (
              <span className="px-2.5 py-1 rounded-full bg-[#173628]/90 border border-[#6ee7b7]/70 text-[11px] font-mono text-[#a7f3d0]">
                守阵倒计时 {Math.max(0, hud.surviveTimer).toFixed(1)}s
              </span>
            )}
            <span className="hidden md:inline-block px-2.5 py-1 rounded-full bg-[#170f09]/75 border border-[#8c6e46]/45 text-[10px] text-[#cbb694]">
              [WASD] 身法 · [左键/J] 连招 · [右键/K] 格挡弹反 · [Space] 闪避 · [1~4] 绝学 · [F3] 探针
            </span>
          </div>
        </div>

        {/* 对手代码绘制血条 */}
        {primaryEnemy && (
          <div className="pointer-events-auto w-full lg:w-[330px] rounded-xl border border-[#e07a5f]/70 bg-[#17100a]/85 backdrop-blur-md p-2.5 shadow-2xl">
            <div className="flex items-center gap-2.5 flex-row-reverse">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#f87171]/70 bg-[#261a11] shrink-0">
                <CutoutPortraitImg url={primaryEnemy.portraitUrl} alt={primaryEnemy.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#fca5a5]">
                    {primaryEnemy.hp} / {primaryEnemy.maxHp}
                  </span>
                  <span className="song-serif text-sm font-bold text-[#ffd6cc] truncate">
                    {primaryEnemy.name}
                    {primaryEnemy.exposed && <span className="ml-1 text-[10px] text-[#fde047]">【破绽】</span>}
                  </span>
                </div>
                <div className="mt-1 h-3 bg-[#1f140f] border border-[#b45309]/75 overflow-hidden relative" style={{ transform: 'skewX(14deg)' }}>
                  <div
                    className="absolute inset-y-0 right-0 bg-[#fde68a]/85 transition-none"
                    style={{ width: `${enemyTrailPct}%` }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 bg-gradient-to-l from-[#991b1b] via-[#dc2626] to-[#f87171]"
                    style={{ width: `${enemyHpPct}%` }}
                  />
                </div>
                <div className="mt-1 h-1.5 bg-[#1c140d] border border-[#fbbf24]/45 overflow-hidden" style={{ transform: 'skewX(14deg)' }}>
                  <div className="ml-auto h-full bg-gradient-to-l from-[#d97706] to-[#fde047]" style={{ width: `${enemyPosturePct}%` }} />
                </div>
              </div>
            </div>
            {hud && hud.enemies.length > 1 && (
              <div className="mt-1.5 flex flex-wrap justify-end gap-1.5 text-[10px]">
                {hud.enemies.slice(1).map((sub) => (
                  <span key={sub.unitId} className="px-2 py-0.5 rounded bg-black/45 border border-[#a8844c]/40 text-[#e8d5b5]">
                    {sub.name} {sub.hp}/{sub.maxHp}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. 弹反成功破招处决提示环 */}
      {hud && hud.counterWindow > 0 && hud.outcome === 'ongoing' && (
        <div className="pointer-events-none fixed inset-x-0 bottom-36 z-30 flex justify-center">
          <div className="px-5 py-2 rounded-full bg-gradient-to-r from-[#78350f]/95 via-[#b45309]/95 to-[#78350f]/95 border-2 border-[#fde047] shadow-[0_0_28px_rgba(250,204,21,0.75)] animate-pulse flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#fef08a]" />
            <span className="song-serif text-sm font-black tracking-widest text-[#fef9c3]">
              卸劲成功！立即按 [左键 / J] 发动破招处决（{hud.counterWindow.toFixed(1)}s）
            </span>
          </div>
        </div>
      )}

      {/* 6. 丹毒匣浮窗 */}
      {bagOpen && hud?.outcome === 'ongoing' && (
        <CombatItemDrawer
          combatBagItems={combatBagItems}
          consumedOnceItemIds={consumedOnceItemIds}
          itemUsesLeft={Math.max(0, COMBAT_ITEM_USE_LIMIT - hud.playerItemUses)}
          itemUseLimit={COMBAT_ITEM_USE_LIMIT}
          playerMaxHp={hud.playerMaxHp}
          playerMaxMp={hud.playerMaxMp}
          onClose={() => setBagOpen(false)}
          onUseItem={handleUseBagItem}
        />
      )}
      {itemNotice && (
        <div className="pointer-events-none fixed inset-x-0 top-24 z-35 flex justify-center">
          <div className="px-4 py-1.5 rounded-full bg-[#450a0a]/90 border border-[#f87171] text-xs text-[#fecaca]">
            {itemNotice}
          </div>
        </div>
      )}

      {/* 7. 移动端触屏虚拟摇杆（左侧半屏） */}
      <div
        className="sm:hidden fixed left-3 bottom-28 z-25 w-36 h-36 touch-none"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          setStickPos({ active: true, ox: e.clientX, oy: e.clientY, dx: 0, dy: 0 })
        }}
        onPointerMove={(e) => {
          if (!stickPos.active) return
          const dx = Math.max(-42, Math.min(42, e.clientX - stickPos.ox))
          const dy = Math.max(-42, Math.min(42, e.clientY - stickPos.oy))
          setStickPos((prev) => ({ ...prev, dx, dy }))
          inputRef.current.setTouchMove(dx / 42, dy / 42)
        }}
        onPointerUp={() => {
          setStickPos({ active: false, ox: 0, oy: 0, dx: 0, dy: 0 })
          inputRef.current.setTouchMove(0, 0)
        }}
        onPointerCancel={() => {
          setStickPos({ active: false, ox: 0, oy: 0, dx: 0, dy: 0 })
          inputRef.current.setTouchMove(0, 0)
        }}
      >
        <div className="w-24 h-24 rounded-full border border-[#d4a455]/45 bg-black/35 flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full bg-[#f5c76b]/70 border border-white/70"
            style={{ transform: `translate(${stickPos.dx}px, ${stickPos.dy}px)` }}
          />
        </div>
      </div>

      {/* 8. 底部实时武学技能栏 & 终局结算条 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-25 px-3 sm:px-6 pb-3 flex justify-center">
        {hud && hud.outcome !== 'ongoing' ? (
          <div className="pointer-events-auto w-full max-w-4xl">
            <CombatActionDeck
              session={{
                ...session,
                outcome: hud.outcome,
                rewardsSummary: session.rewardsSummary ?? hud.outcomeBanner,
              }}
              npc={session.npc}
              sceneTitle={sceneTitle}
              isAnimating={false}
              activeBeat={null}
              moveOptions={[]}
              effectiveTargetId={session.npc.unitId}
              onSelectTargetId={noop}
              escapeStatus={{ allowed: escapeAllowed, reason: null }}
              escapeChancePct={100}
              defendDodgePct={0}
              agiDiff={0}
              combatBagCount={combatBagItems.length}
              onOpenBag={noop}
              onSkipChoreography={noop}
              onSubmitAction={noop}
              onFinishCombat={onFinishCombat}
            />
          </div>
        ) : (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#d4a455]/65 bg-[#160f09]/88 backdrop-blur-md px-3 py-2 shadow-2xl"
          >
            {/* 平招连击 */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation()
                if (e.pointerType === 'touch') inputRef.current.triggerTouchAction('KeyJ')
              }}
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current.simulatePress('KeyJ')
              }}
              className="px-3 py-2 rounded-xl border border-[#eab308]/70 bg-gradient-to-b from-[#3f2310] to-[#261409] hover:border-[#fde047] text-left cursor-pointer min-w-[84px]"
            >
              <div className="text-[10px] font-mono text-[#fde68a]">[左键 / J]</div>
              <div className="song-serif text-xs font-bold text-[#fffbeb]">平招连击</div>
            </button>

            {/* 四槽武学 */}
            {hud?.skills.map((sk, idx) => {
              const keyDigit = idx + 1
              const onCd = sk.cooldown > 0.05
              const lowMp = hud.playerMp < sk.mpCost
              return (
                <button
                  key={sk.slot}
                  type="button"
                  disabled={onCd}
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    if (e.pointerType === 'touch') inputRef.current.triggerTouchAction(`Digit${keyDigit}`)
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    inputRef.current.simulatePress(`Digit${keyDigit}`)
                  }}
                  className={`relative overflow-hidden px-3 py-2 rounded-xl border text-left min-w-[104px] transition ${
                    onCd
                      ? 'border-[#574534] bg-[#1a130e] opacity-65 cursor-not-allowed'
                      : 'border-[#d4a455]/75 bg-gradient-to-b from-[#2e1e12] to-[#1a1009] hover:border-[#fde047] cursor-pointer'
                  }`}
                >
                  {onCd && (
                    <div
                      className="absolute inset-0 bg-black/55 pointer-events-none"
                      style={{ height: `${Math.min(100, (sk.cooldown / Math.max(0.1, sk.cooldownMax)) * 100)}%` }}
                    />
                  )}
                  <div className="relative flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="text-[#f5d598]">[{keyDigit}]</span>
                    <span className={lowMp ? 'text-[#f97316]' : 'text-[#7dd3fc]'}>
                      {onCd ? `${sk.cooldown.toFixed(1)}s` : `内${sk.mpCost}`}
                    </span>
                  </div>
                  <div className="relative song-serif text-xs font-bold text-[#ffeed4] truncate max-w-[116px]">
                    {sk.name}
                  </div>
                </button>
              )
            })}

            {/* 守御/弹反 */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation()
                if (e.pointerType === 'touch') {
                  inputRef.current.setTouchGuard(true)
                } else {
                  inputRef.current.pressed.add('KeyK')
                  inputRef.current.keys.add('KeyK')
                }
              }}
              onPointerUp={(e) => {
                if (e.pointerType === 'touch') inputRef.current.setTouchGuard(false)
                else inputRef.current.keys.delete('KeyK')
              }}
              onPointerCancel={(e) => {
                if (e.pointerType === 'touch') inputRef.current.setTouchGuard(false)
                else inputRef.current.keys.delete('KeyK')
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'touch') inputRef.current.setTouchGuard(false)
                else inputRef.current.keys.delete('KeyK')
              }}
              className={`px-3 py-2 rounded-xl border text-left min-w-[88px] cursor-pointer ${
                hud?.guardHeld
                  ? 'border-[#6ee7b7] bg-[#14532d]'
                  : 'border-[#63b594]/70 bg-[#122921] hover:border-[#93ebd0]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#a7f3d0]">
                <span>[右键/K]</span>
                <Shield className="w-3 h-3" />
              </div>
              <div className="song-serif text-xs font-bold text-[#ecfdf5]">守御·弹反</div>
            </button>

            {/* 轻功闪避 */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation()
                if (e.pointerType === 'touch') inputRef.current.triggerTouchAction('Space')
              }}
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current.simulatePress('Space')
              }}
              className="px-3 py-2 rounded-xl border border-[#38bdf8]/70 bg-[#0f293a] hover:border-[#7dd3fc] text-left min-w-[84px] cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#bae6fd]">
                <span>[Space]</span>
                <Wind className="w-3 h-3" />
              </div>
              <div className="song-serif text-xs font-bold text-[#e0f2fe]">
                {hud && hud.dodgeCd > 0.05 ? `冷却 ${hud.dodgeCd.toFixed(1)}s` : '轻功闪避'}
              </div>
            </button>

            {/* 行囊丹毒 */}
            <button
              type="button"
              onClick={() => setBagOpen((v) => !v)}
              className="px-3 py-2 rounded-xl border border-[#cf8a55]/70 bg-[#2e1a11] hover:border-[#f7bc7c] text-left cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#fed7aa]">
                <span>[B]</span>
                <Package className="w-3 h-3" />
              </div>
              <div className="song-serif text-xs font-bold text-[#ffedd5]">丹毒 ({combatBagItems.length})</div>
            </button>

            {/* 脱战 */}
            {escapeAllowed && (
              <div className="px-2.5 py-2 rounded-xl border border-[#94a3b8]/50 bg-[#1e293b]/70 text-left">
                <div className="text-[10px] font-mono text-[#cbd5e1]">[长按 E]</div>
                <div className="song-serif text-xs font-bold text-[#f1f5f9]">
                  {hud && hud.escapeProgress > 0.05
                    ? `脱战 ${Math.round(hud.escapeProgress * 100)}%`
                    : '抽身脱战'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
