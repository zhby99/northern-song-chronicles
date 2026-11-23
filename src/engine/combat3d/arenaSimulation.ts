import { canFighterEscape, getStrongestLivingEnemy } from '../combat/formulas'
import { gameRng } from '../combat/rng'
import type { CombatantState, CombatSessionState, CombatVfxCategory } from '../combat/types'
import { buildArenaSkills, computeArenaStats } from './arenaStats'
import type {
  ArenaActor3D,
  ArenaInputFrame,
  ArenaObstacle3D,
  ArenaSkillSpec,
  ArenaThemeKind,
  ArenaSimState,
} from './types'

let seqCounter = 0
function nextId(prefix: string): string {
  seqCounter += 1
  return `${prefix}-${seqCounter}`
}

function normalizeAngle(a: number): number {
  let x = a
  while (x > Math.PI) x -= Math.PI * 2
  while (x < -Math.PI) x += Math.PI * 2
  return x
}

function angleDiff(a: number, b: number): number {
  return Math.abs(normalizeAngle(a - b))
}

function createObstacles(theme: ArenaThemeKind): ArenaObstacle3D[] {
  if (theme === 'mountain') {
    return [
      { id: 'obs-1', kind: 'pine', x: -5.4, z: -4.2, radius: 0.72, height: 3.4 },
      { id: 'obs-2', kind: 'stone', x: 5.5, z: -3.8, radius: 0.8, height: 1.4 },
      { id: 'obs-3', kind: 'stone', x: -4.8, z: 4.9, radius: 0.75, height: 1.3 },
      { id: 'obs-4', kind: 'pine', x: 5.2, z: 4.7, radius: 0.72, height: 3.2 },
    ]
  }
  if (theme === 'market') {
    return [
      { id: 'obs-1', kind: 'rack', x: -5.8, z: -3.6, radius: 0.65, height: 1.8 },
      { id: 'obs-2', kind: 'pillar', x: 5.8, z: -3.6, radius: 0.6, height: 3.6 },
      { id: 'obs-3', kind: 'pillar', x: -5.8, z: 4.2, radius: 0.6, height: 3.6 },
      { id: 'obs-4', kind: 'rack', x: 5.8, z: 4.2, radius: 0.65, height: 1.8 },
    ]
  }
  if (theme === 'frontier') {
    return [
      { id: 'obs-1', kind: 'stone', x: -5.5, z: -4.4, radius: 0.85, height: 1.6 },
      { id: 'obs-2', kind: 'stone', x: 5.6, z: 4.4, radius: 0.85, height: 1.5 },
    ]
  }
  return [
    { id: 'obs-1', kind: 'pillar', x: -5.6, z: -4.0, radius: 0.58, height: 3.8 },
    { id: 'obs-2', kind: 'pillar', x: 5.6, z: -4.0, radius: 0.58, height: 3.8 },
    { id: 'obs-3', kind: 'pillar', x: -5.6, z: 4.2, radius: 0.58, height: 3.8 },
    { id: 'obs-4', kind: 'pillar', x: 5.6, z: 4.2, radius: 0.58, height: 3.8 },
  ]
}

function makeActor(
  c: CombatantState,
  x: number,
  z: number,
  yaw: number,
): ArenaActor3D {
  const stats = computeArenaStats(c)
  const skills = buildArenaSkills(c)
  return {
    unitId: c.unitId,
    npcId: c.id,
    team: c.team,
    isPlayer: c.isPlayer,
    name: c.name,
    title: c.title,
    realm: c.realm,
    factionName: c.factionName,
    portraitUrl: c.portraitUrl,
    stats,
    skills,
    x,
    z,
    vx: 0,
    vz: 0,
    yaw,
    radius: 0.46,
    hp: c.hp,
    maxHp: c.maxHp,
    mp: c.mp,
    maxMp: c.maxMp,
    posture: 0,
    maxPosture: stats.maxPosture,
    itemUses: c.itemUses,
    xiaowuxiangSaved: false,
    actionState: c.hp <= 0 ? 'defeated' : 'idle',
    actionTimer: 0,
    actionDuration: 0,
    comboStep: 0,
    comboResetTimer: 0,
    activeAttack: null,
    guardHeld: false,
    guardStartTime: -99,
    dodgeCooldown: 0,
    invulnTimer: 0,
    hitstopTimer: 0,
    staggerTimer: 0,
    exposedTimer: c.exposed ? 3.0 : 0,
    counterWindowTimer: 0,
    counterTargetId: null,
    hurtFlashTimer: 0,
    poisonTimer: c.poisonDotTurns > 0 ? 4 : 0,
    poisonDps: c.poisonDotDmg > 0 ? Math.max(4, Math.round(c.poisonDotDmg / 2)) : 0,
    aiThinkTimer: 0.35 + gameRng() * 0.45,
    aiStrafeDir: gameRng() > 0.5 ? 1 : -1,
    hasMeleeToken: false,
    attackCooldown: 0.9 + gameRng() * 0.6,
  }
}

export function createArenaSimState(
  session: CombatSessionState,
  theme: ArenaThemeKind = 'courtyard',
): ArenaSimState {
  const actors: ArenaActor3D[] = []
  session.allies.forEach((a, idx) => {
    const x = idx === 0 ? -3.4 : -4.6
    const z = idx === 0 ? 0.4 : -2.2 + idx * 2.4
    actors.push(makeActor(a, x, z, Math.PI / 2))
  })
  session.enemies.forEach((e, idx) => {
    const x = idx === 0 ? 3.4 : 4.6
    const z = session.enemies.length === 1 ? -0.4 : -2.4 + idx * 2.4
    actors.push(makeActor(e, x, z, -Math.PI / 2))
  })

  const strongest = getStrongestLivingEnemy(session)
  const escapeStatus = canFighterEscape(
    session.player,
    strongest,
    session.duelStakes,
    session.forbidEscapeReason,
  )

  return {
    sessionId: session.sessionId,
    theme,
    mode: session.mode,
    surviveToWin: Boolean(session.surviveToWin),
    surviveTimer: session.surviveToWin ? Math.max(18, session.maxRounds * 4.5) : 0,
    escapeAllowed: escapeStatus.allowed,
    escapeHoldProgress: 0,
    arenaRadius: 9.2,
    elapsedTime: 0,
    slowMoTimer: 0,
    slowMoScale: 1,
    cameraShake: 0,
    outcome: session.outcome,
    outcomeBanner: null,
    actors,
    projectiles: [],
    telegraphs: [],
    vfxEvents: [],
    floatingTexts: [],
    obstacles: createObstacles(theme),
    bufferedCommand: null,
    hitCount: 0,
    parryCount: 0,
    executeCount: 0,
    sfxQueue: [],
  }
}

export function applyArenaItemDrink(
  sim: ArenaSimState,
  itemName: string,
  healHp: number,
  healMp: number,
  poisonDmg: number,
): void {
  const player = sim.actors.find((a) => a.isPlayer)
  if (!player || player.hp <= 0 || sim.outcome !== 'ongoing') return
  player.itemUses += 1

  if (healHp > 0) {
    const actual = Math.min(player.maxHp - player.hp, healHp)
    player.hp = Math.min(player.maxHp, player.hp + healHp)
    sim.floatingTexts.push({
      id: nextId('ft'),
      x: player.x,
      y: 2.0,
      z: player.z,
      text: `+${actual} 气血`,
      tone: 'heal',
      age: 0,
      duration: 1.1,
    })
  }
  if (healMp > 0) {
    const actual = Math.min(player.maxMp - player.mp, healMp)
    player.mp = Math.min(player.maxMp, player.mp + healMp)
    sim.floatingTexts.push({
      id: nextId('ft'),
      x: player.x + 0.3,
      y: 2.3,
      z: player.z,
      text: `+${actual} 内力`,
      tone: 'special',
      age: 0,
      duration: 1.1,
    })
  }
  if (poisonDmg > 0) {
    const target = sim.actors.find((a) => a.team === 'enemy' && a.hp > 0)
    if (target) {
      target.poisonTimer = 5.0
      target.poisonDps = Math.max(8, Math.round(poisonDmg * 0.4))
      sim.floatingTexts.push({
        id: nextId('ft'),
        x: target.x,
        y: 2.1,
        z: target.z,
        text: `${itemName} · 中毒`,
        tone: 'special',
        age: 0,
        duration: 1.2,
      })
    }
  }

  player.actionState = 'drink'
  player.actionTimer = 0
  player.actionDuration = 0.42
  player.activeAttack = null
  sim.vfxEvents.push({
    id: nextId('vfx'),
    kind: 'heal',
    x: player.x,
    y: 0.1,
    z: player.z,
    yaw: 0,
    radius: 1.3,
    vfxCategory: 'heal',
    isHeavenTier: false,
    isCrit: false,
    label: itemName,
    age: 0,
    duration: 0.7,
  })
  sim.sfxQueue.push({ type: 'heal' })
}

function getLivingByTeam(sim: ArenaSimState, team: 'ally' | 'enemy'): ArenaActor3D[] {
  return sim.actors.filter((a) => a.team === team && a.hp > 0)
}

function findMagnetTarget(
  actor: ArenaActor3D,
  sim: ArenaSimState,
  desiredYaw: number,
  maxRange: number,
): ArenaActor3D | null {
  const foes = getLivingByTeam(sim, actor.team === 'ally' ? 'enemy' : 'ally')
  let best: ArenaActor3D | null = null
  let bestScore = Infinity
  for (const foe of foes) {
    const dist = Math.hypot(foe.x - actor.x, foe.z - actor.z)
    if (dist > maxRange) continue
    const toFoeYaw = Math.atan2(foe.x - actor.x, foe.z - actor.z)
    const ang = angleDiff(desiredYaw, toFoeYaw)
    const score = dist + ang * 1.4
    if (score < bestScore) {
      bestScore = score
      best = foe
    }
  }
  return best
}

function startLightAttack(
  actor: ArenaActor3D,
  sim: ArenaSimState,
  desiredYaw: number,
): void {
  const nextStep = (actor.comboStep % 3) + 1
  actor.comboStep = nextStep
  actor.comboResetTimer = 1.25

  const reach = nextStep === 3 ? 2.55 : 2.25
  const magnet = findMagnetTarget(actor, sim, desiredYaw, reach + 2.4)
  let yaw = desiredYaw
  let targetX = actor.x
  let targetZ = actor.z

  if (magnet) {
    const dx = magnet.x - actor.x
    const dz = magnet.z - actor.z
    const dist = Math.hypot(dx, dz)
    yaw = Math.atan2(dx, dz)
    const optimalStand = actor.radius + magnet.radius + 0.85
    if (dist > optimalStand) {
      const slide = Math.min(1.35, dist - optimalStand)
      targetX = actor.x + (dx / dist) * slide
      targetZ = actor.z + (dz / dist) * slide
    }
  }

  actor.yaw = yaw
  actor.guardHeld = false
  actor.actionState = 'windup'
  actor.actionTimer = 0
  actor.actionDuration = nextStep === 3 ? 0.14 : 0.1
  actor.activeAttack = {
    kind: 'light',
    name: nextStep === 1 ? '起手式' : nextStep === 2 ? '连环进招' : '沉肩重劈',
    vfxCategory: actor.stats.primaryVfx,
    shape: 'arc',
    damage: Math.round(actor.stats.baseAttackDamage * (nextStep === 3 ? 1.32 : nextStep === 2 ? 1.05 : 0.92)),
    postureDamage: nextStep === 3 ? 24 : 14,
    knockback: nextStep === 3 ? 1.65 : 0.75,
    reach,
    arcHalfAngle: nextStep === 3 ? 1.15 : 0.95,
    unblockable: false,
    isHeavenTier: false,
    hitApplied: false,
    targetUnitId: magnet?.unitId,
    magnetStartX: actor.x,
    magnetStartZ: actor.z,
    magnetTargetX: targetX,
    magnetTargetZ: targetZ,
  }
  sim.sfxQueue.push({ type: 'swing', vfx: actor.stats.primaryVfx })
}

function startExecuteAttack(
  actor: ArenaActor3D,
  target: ArenaActor3D,
  sim: ArenaSimState,
): void {
  const dx = target.x - actor.x
  const dz = target.z - actor.z
  const dist = Math.max(0.01, Math.hypot(dx, dz))
  const yaw = Math.atan2(dx, dz)
  const standDist = actor.radius + target.radius + 0.75
  const slide = Math.max(0, dist - standDist)

  actor.yaw = yaw
  actor.counterWindowTimer = 0
  actor.counterTargetId = null
  actor.invulnTimer = Math.max(actor.invulnTimer, 0.55)
  actor.actionState = 'execute'
  actor.actionTimer = 0
  actor.actionDuration = 0.32
  actor.activeAttack = {
    kind: 'execute',
    name: '卸劲破招 · 绝杀',
    vfxCategory: actor.stats.primaryVfx,
    shape: 'arc',
    damage: Math.round(actor.stats.baseAttackDamage * 2.55),
    postureDamage: 45,
    knockback: 2.3,
    reach: 2.8,
    arcHalfAngle: 1.3,
    unblockable: true,
    isHeavenTier: true,
    hitApplied: false,
    targetUnitId: target.unitId,
    magnetStartX: actor.x,
    magnetStartZ: actor.z,
    magnetTargetX: actor.x + (dx / dist) * slide,
    magnetTargetZ: actor.z + (dz / dist) * slide,
  }

  sim.executeCount += 1
  sim.slowMoTimer = 0.34
  sim.slowMoScale = 0.38
  sim.sfxQueue.push({ type: 'execute' })
  sim.floatingTexts.push({
    id: nextId('ft'),
    x: actor.x,
    y: 2.2,
    z: actor.z,
    text: '破招处决！',
    tone: 'crit',
    age: 0,
    duration: 1.0,
  })
}

function startSkillAttack(
  actor: ArenaActor3D,
  skill: ArenaSkillSpec,
  sim: ArenaSimState,
  desiredYaw: number,
): boolean {
  if (skill.cooldown > 0) return false
  const lowMp = actor.mp < skill.mpCost
  actor.mp = Math.max(0, actor.mp - skill.mpCost)
  skill.cooldown = skill.cooldownMax

  if (skill.isGuardSkill) {
    actor.posture = Math.max(0, actor.posture - Math.round(actor.maxPosture * 0.45))
    actor.invulnTimer = Math.max(actor.invulnTimer, 0.45)
    actor.actionState = 'guard'
    actor.guardHeld = true
    actor.guardStartTime = sim.elapsedTime
    sim.vfxEvents.push({
      id: nextId('vfx'),
      kind: 'nova',
      x: actor.x,
      y: 0.15,
      z: actor.z,
      yaw: 0,
      radius: 1.6,
      vfxCategory: 'guard',
      isHeavenTier: skill.isHeavenTier,
      isCrit: false,
      label: skill.name,
      age: 0,
      duration: 0.75,
    })
    sim.sfxQueue.push({ type: 'guard' })
    return true
  }

  const magnet = findMagnetTarget(actor, sim, desiredYaw, skill.reach + 2.8)
  let yaw = desiredYaw
  let targetX = actor.x
  let targetZ = actor.z
  if (magnet) {
    const dx = magnet.x - actor.x
    const dz = magnet.z - actor.z
    const dist = Math.hypot(dx, dz)
    yaw = Math.atan2(dx, dz)
    if (skill.shape === 'arc' || skill.shape === 'thrust') {
      const stand = actor.radius + magnet.radius + (skill.shape === 'thrust' ? 1.25 : 0.95)
      if (dist > stand) {
        const slide = Math.min(skill.shape === 'thrust' ? 2.4 : 1.5, dist - stand)
        targetX = actor.x + (dx / dist) * slide
        targetZ = actor.z + (dz / dist) * slide
      }
    }
  }

  const scaledDamage = Math.max(
    14,
    Math.round(skill.rawDamage * (lowMp ? 0.6 : 1.0) * (1 + actor.stats.damageAmpPct)),
  )

  actor.yaw = yaw
  actor.guardHeld = false
  actor.actionState = 'windup'
  actor.actionTimer = 0
  actor.actionDuration = skill.windupSec
  actor.activeAttack = {
    kind: 'skill',
    slot: skill.slot,
    name: skill.name,
    vfxCategory: skill.vfxCategory,
    shape: skill.shape,
    damage: scaledDamage,
    postureDamage: skill.postureDamage,
    knockback: skill.knockback,
    reach: skill.reach,
    arcHalfAngle: skill.arcHalfAngle,
    unblockable: skill.unblockable,
    isHeavenTier: skill.isHeavenTier,
    hitApplied: false,
    targetUnitId: magnet?.unitId,
    magnetStartX: actor.x,
    magnetStartZ: actor.z,
    magnetTargetX: targetX,
    magnetTargetZ: targetZ,
  }

  if (skill.unblockable && actor.team === 'enemy') {
    sim.sfxQueue.push({ type: 'telegraph' })
  } else {
    sim.sfxQueue.push({ type: 'swing', vfx: skill.vfxCategory })
  }
  return true
}

function startDodge(actor: ArenaActor3D, sim: ArenaSimState, moveX: number, moveZ: number): boolean {
  if (actor.dodgeCooldown > 0) return false
  if (actor.actionState === 'stagger' || actor.actionState === 'execute' || actor.actionState === 'defeated') {
    return false
  }
  // 闪避具有最高打断优先级：打断出招、格挡、喝药并切断顿帧
  actor.hitstopTimer = 0
  actor.activeAttack = null
  actor.guardHeld = false
  actor.dodgeCooldown = actor.stats.dodgeCooldownMax
  actor.invulnTimer = actor.stats.dodgeInvulnSec
  actor.actionState = 'dodge'
  actor.actionTimer = 0
  actor.actionDuration = actor.stats.dodgeDurationSec

  let dx = moveX
  let dz = moveZ
  if (Math.hypot(dx, dz) < 0.1) {
    dx = Math.sin(actor.yaw)
    dz = Math.cos(actor.yaw)
  } else {
    const len = Math.hypot(dx, dz)
    dx /= len
    dz /= len
    actor.yaw = Math.atan2(dx, dz)
  }
  actor.vx = dx * (actor.stats.moveSpeed * 1.95)
  actor.vz = dz * (actor.stats.moveSpeed * 1.95)

  sim.vfxEvents.push({
    id: nextId('vfx'),
    kind: 'dodge_ghost',
    x: actor.x,
    y: 0.05,
    z: actor.z,
    yaw: actor.yaw,
    radius: 0.8,
    vfxCategory: 'escape',
    isHeavenTier: false,
    isCrit: false,
    age: 0,
    duration: 0.42,
  })
  sim.sfxQueue.push({ type: 'dodge' })
  return true
}

function applyHitToTarget(
  attacker: ArenaActor3D,
  target: ArenaActor3D,
  opts: {
    damage: number
    postureDamage: number
    knockback: number
    vfxCategory: CombatVfxCategory
    unblockable: boolean
    isHeavenTier: boolean
    isExecute: boolean
    hitDirX: number
    hitDirZ: number
  },
  sim: ArenaSimState,
): void {
  if (target.hp <= 0 || sim.outcome !== 'ongoing') return

  // 1. 闪避无敌帧 -> 完美闪避判定
  if (target.invulnTimer > 0) {
    if (target.actionState === 'dodge') {
      target.mp = Math.min(target.maxMp, target.mp + Math.max(6, Math.round(target.maxMp * 0.12)))
      target.posture = Math.max(0, target.posture - 15)
      if (target.isPlayer) {
        sim.slowMoTimer = 0.28
        sim.slowMoScale = 0.42
      }
      sim.floatingTexts.push({
        id: nextId('ft'),
        x: target.x,
        y: 2.1,
        z: target.z,
        text: '凌波掠影！',
        tone: 'dodge',
        age: 0,
        duration: 0.95,
      })
    }
    return
  }

  // 2. 正面格挡 & 0.24s 卸劲弹反判定
  const toAttackerYaw = Math.atan2(attacker.x - target.x, attacker.z - target.z)
  const facingAttacker = angleDiff(target.yaw, toAttackerYaw) <= 1.45

  if (!opts.unblockable && target.guardHeld && facingAttacker && target.actionState === 'guard') {
    const heldSec = sim.elapsedTime - target.guardStartTime
    if (heldSec <= target.stats.parryWindowSec) {
      // 触发【卸劲弹反】！
      attacker.hitstopTimer = 0.14
      target.hitstopTimer = 0.12
      attacker.actionState = 'stagger'
      attacker.actionTimer = 0
      attacker.staggerTimer = 1.15
      attacker.activeAttack = null
      attacker.exposedTimer = 2.6
      attacker.posture = Math.min(attacker.maxPosture, attacker.posture + Math.round(attacker.maxPosture * 0.48))

      target.actionState = 'parry_success'
      target.actionTimer = 0
      target.actionDuration = 0.22
      target.counterWindowTimer = 0.9
      target.counterTargetId = attacker.unitId
      target.mp = Math.min(target.maxMp, target.mp + Math.max(5, Math.round(target.maxMp * 0.08)))

      if (target.isPlayer) sim.parryCount += 1
      sim.cameraShake = Math.max(sim.cameraShake, 0.28)
      sim.vfxEvents.push({
        id: nextId('vfx'),
        kind: 'parry',
        x: (attacker.x + target.x) * 0.5,
        y: 1.2,
        z: (attacker.z + target.z) * 0.5,
        yaw: toAttackerYaw,
        radius: 1.5,
        vfxCategory: 'guard',
        isHeavenTier: true,
        isCrit: true,
        age: 0,
        duration: 0.5,
      })
      sim.floatingTexts.push({
        id: nextId('ft'),
        x: target.x,
        y: 2.3,
        z: target.z,
        text: '卸劲弹反！',
        tone: 'parry',
        age: 0,
        duration: 1.1,
      })
      sim.sfxQueue.push({ type: 'parry' })
      return
    }

    // 普通持守格挡
    const guardCost = Math.round(opts.postureDamage * 1.1)
    target.posture += guardCost
    const chipDmg = Math.max(2, Math.round(opts.damage * 0.28 * (1 - target.stats.physMitigation * 0.5)))
    target.hp = Math.max(0, target.hp - chipDmg)
    target.hitstopTimer = 0.06
    attacker.hitstopTimer = 0.05

    if (target.stats.guardReboundPct > 0) {
      const reb = Math.max(2, Math.round(opts.damage * target.stats.guardReboundPct))
      attacker.hp = Math.max(1, attacker.hp - reb)
    }

    if (target.posture >= target.maxPosture) {
      // 破防！
      target.posture = 0
      target.guardHeld = false
      target.actionState = 'stagger'
      target.staggerTimer = 1.1
      target.exposedTimer = 2.2
      sim.floatingTexts.push({
        id: nextId('ft'),
        x: target.x,
        y: 2.2,
        z: target.z,
        text: '破防！',
        tone: 'crit',
        age: 0,
        duration: 1.0,
      })
    } else {
      sim.floatingTexts.push({
        id: nextId('ft'),
        x: target.x,
        y: 2.0,
        z: target.z,
        text: `挡 -${chipDmg}`,
        tone: 'guard',
        age: 0,
        duration: 0.85,
      })
    }
    sim.sfxQueue.push({
      type: 'impact',
      vfx: opts.vfxCategory,
      isCrit: false,
      isGuarded: true,
      isHeavenTier: opts.isHeavenTier,
    })
    return
  }

  // 3. 蓄力破招打断检测
  const interruptedWindup =
    target.actionState === 'windup' &&
    target.actionDuration > 0 &&
    target.actionTimer / target.actionDuration >= 0.45

  const isCrit = opts.isExecute || interruptedWindup || gameRng() < attacker.stats.critChance
  const exposedMult = target.exposedTimer > 0 ? 1.25 : 1.0
  const interruptMult = interruptedWindup ? 1.25 : 1.0
  const critMult = isCrit ? 1.45 : 1.0
  const mit = opts.vfxCategory === 'poison' || opts.vfxCategory === 'sonic'
    ? target.stats.qiMitigation
    : target.stats.physMitigation

  let finalDmg = Math.max(
    4,
    Math.round(opts.damage * (1 - mit) * exposedMult * interruptMult * critMult),
  )

  // 小无相功免死保底
  if (target.hp - finalDmg <= 0 && target.stats.hasXiaowuxiangSave && !target.xiaowuxiangSaved) {
    target.xiaowuxiangSaved = true
    finalDmg = Math.max(0, target.hp - 1)
    sim.floatingTexts.push({
      id: nextId('ft'),
      x: target.x,
      y: 2.4,
      z: target.z,
      text: '小无相护体！',
      tone: 'special',
      age: 0,
      duration: 1.3,
    })
  }

  target.hp = Math.max(0, target.hp - finalDmg)
  target.hurtFlashTimer = 0.16
  target.posture = Math.min(target.maxPosture, target.posture + opts.postureDamage)

  if (attacker.stats.lifeStealPct > 0 && finalDmg > 0) {
    attacker.hp = Math.min(attacker.maxHp, attacker.hp + Math.round(finalDmg * attacker.stats.lifeStealPct))
  }
  if (attacker.stats.mpDrainPct > 0 && finalDmg > 0) {
    attacker.mp = Math.min(attacker.maxMp, attacker.mp + Math.round(finalDmg * attacker.stats.mpDrainPct))
  }

  // 分级击退与硬直（仅在超过韧性阈值、被破招、处决或架势满时进入硬直）
  const forceStagger =
    interruptedWindup ||
    opts.isExecute ||
    opts.isHeavenTier ||
    finalDmg >= target.stats.poiseThreshold ||
    target.posture >= target.maxPosture

  if (target.hp <= 0) {
    target.actionState = 'defeated'
    target.activeAttack = null
    target.guardHeld = false
  } else if (forceStagger && target.actionState !== 'execute') {
    if (target.posture >= target.maxPosture) target.posture = 0
    target.actionState = 'stagger'
    target.actionTimer = 0
    target.staggerTimer = interruptedWindup ? 0.95 : opts.isHeavenTier ? 0.55 : 0.34
    target.activeAttack = null
    target.guardHeld = false
  }

  const kbScale = forceStagger ? opts.knockback : opts.knockback * 0.3
  target.vx += opts.hitDirX * kbScale * 4.2
  target.vz += opts.hitDirZ * kbScale * 4.2

  // 局部顿帧（仅攻守双方定格）
  const stopSec = opts.isExecute || opts.isHeavenTier ? 0.12 : isCrit ? 0.1 : 0.07
  attacker.hitstopTimer = Math.max(attacker.hitstopTimer, stopSec * 0.85)
  target.hitstopTimer = Math.max(target.hitstopTimer, stopSec)

  if (attacker.isPlayer) sim.hitCount += 1
  if (isCrit || opts.isHeavenTier) {
    sim.cameraShake = Math.max(sim.cameraShake, opts.isExecute ? 0.38 : 0.22)
  }

  sim.vfxEvents.push({
    id: nextId('vfx'),
    kind: 'spark',
    x: target.x - opts.hitDirX * 0.35,
    y: 1.15,
    z: target.z - opts.hitDirZ * 0.35,
    yaw: Math.atan2(opts.hitDirX, opts.hitDirZ),
    radius: 0.9,
    vfxCategory: opts.vfxCategory,
    isHeavenTier: opts.isHeavenTier,
    isCrit,
    age: 0,
    duration: 0.32,
  })

  sim.floatingTexts.push({
    id: nextId('ft'),
    x: target.x + (gameRng() - 0.5) * 0.4,
    y: 2.1,
    z: target.z,
    text: interruptedWindup ? `破招 -${finalDmg}` : isCrit ? `暴击 -${finalDmg}` : `-${finalDmg}`,
    tone: isCrit || interruptedWindup ? 'crit' : 'damage',
    age: 0,
    duration: 0.95,
  })

  sim.sfxQueue.push({
    type: 'impact',
    vfx: opts.vfxCategory,
    isCrit,
    isGuarded: false,
    isHeavenTier: opts.isHeavenTier,
  })
}

function executeAttackHitFrame(actor: ArenaActor3D, sim: ArenaSimState): void {
  const atk = actor.activeAttack
  if (!atk || atk.hitApplied) return
  atk.hitApplied = true

  // 1. 发出视觉特效（刀光弧面 / 墨迹 / 地面法阵）
  if (atk.shape === 'nova') {
    sim.vfxEvents.push({
      id: nextId('vfx'),
      kind: 'nova',
      x: actor.x,
      y: 0.08,
      z: actor.z,
      yaw: actor.yaw,
      radius: atk.reach,
      vfxCategory: atk.vfxCategory,
      isHeavenTier: atk.isHeavenTier,
      isCrit: atk.kind === 'execute',
      label: atk.name,
      age: 0,
      duration: 0.72,
    })
  } else if (atk.shape === 'projectile') {
    const speed = 13.5
    const vx = Math.sin(actor.yaw) * speed
    const vz = Math.cos(actor.yaw) * speed
    sim.projectiles.push({
      id: nextId('proj'),
      ownerId: actor.unitId,
      team: actor.team,
      x: actor.x + Math.sin(actor.yaw) * 0.7,
      y: 1.1,
      z: actor.z + Math.cos(actor.yaw) * 0.7,
      vx,
      vz,
      radius: 0.42,
      damage: atk.damage,
      postureDamage: atk.postureDamage,
      vfxCategory: atk.vfxCategory,
      life: 0,
      maxLife: 1.15,
      destructible: true,
    })
    return
  } else {
    sim.vfxEvents.push({
      id: nextId('vfx'),
      kind: 'slash',
      x: actor.x,
      y: 1.08,
      z: actor.z,
      yaw: actor.yaw,
      radius: atk.reach,
      vfxCategory: atk.vfxCategory,
      isHeavenTier: atk.isHeavenTier,
      isCrit: atk.kind === 'execute',
      label: atk.name,
      age: 0,
      duration: atk.isHeavenTier ? 0.56 : 0.4,
    })
    sim.vfxEvents.push({
      id: nextId('vfx'),
      kind: 'ink_trail',
      x: actor.x,
      y: 0.04,
      z: actor.z,
      yaw: actor.yaw,
      radius: atk.reach * 0.95,
      vfxCategory: atk.vfxCategory,
      isHeavenTier: atk.isHeavenTier,
      isCrit: false,
      age: 0,
      duration: 1.1,
    })
  }

  // 2. 斩落飞行中的敌方弹幕！
  for (let i = sim.projectiles.length - 1; i >= 0; i -= 1) {
    const p = sim.projectiles[i]!
    if (p.team === actor.team || !p.destructible) continue
    const dist = Math.hypot(p.x - actor.x, p.z - actor.z)
    if (dist <= atk.reach + 0.5) {
      sim.vfxEvents.push({
        id: nextId('vfx'),
        kind: 'spark',
        x: p.x,
        y: p.y,
        z: p.z,
        yaw: actor.yaw,
        radius: 0.7,
        vfxCategory: atk.vfxCategory,
        isHeavenTier: false,
        isCrit: false,
        age: 0,
        duration: 0.25,
      })
      sim.floatingTexts.push({
        id: nextId('ft'),
        x: p.x,
        y: 1.6,
        z: p.z,
        text: '斩落暗器！',
        tone: 'dodge',
        age: 0,
        duration: 0.7,
      })
      sim.projectiles.splice(i, 1)
    }
  }

  // 3. 判定命中敌方目标
  const foes = getLivingByTeam(sim, actor.team === 'ally' ? 'enemy' : 'ally')
  for (const foe of foes) {
    const dx = foe.x - actor.x
    const dz = foe.z - actor.z
    const dist = Math.hypot(dx, dz)
    if (dist > atk.reach + foe.radius) continue
    const toFoeYaw = Math.atan2(dx, dz)
    if (angleDiff(actor.yaw, toFoeYaw) > atk.arcHalfAngle && dist > 0.7) continue
    const nx = dist > 0.01 ? dx / dist : Math.sin(actor.yaw)
    const nz = dist > 0.01 ? dz / dist : Math.cos(actor.yaw)
    applyHitToTarget(
      actor,
      foe,
      {
        damage: atk.damage,
        postureDamage: atk.postureDamage,
        knockback: atk.knockback,
        vfxCategory: atk.vfxCategory,
        unblockable: atk.unblockable,
        isHeavenTier: atk.isHeavenTier,
        isExecute: atk.kind === 'execute',
        hitDirX: nx,
        hitDirZ: nz,
      },
      sim,
    )
  }
}

function clampActorToArenaAndObstacles(
  actor: ArenaActor3D,
  prevX: number,
  prevZ: number,
  sim: ArenaSimState,
): void {
  // 有机噪声圆形边界
  const ang = Math.atan2(actor.z, actor.x)
  const localLimit =
    sim.arenaRadius - 0.35 + Math.sin(ang * 3) * 0.28 + Math.cos(ang * 5) * 0.18 - actor.radius
  const distFromCenter = Math.hypot(actor.x, actor.z)
  if (distFromCenter > localLimit && distFromCenter > 0.001) {
    actor.x = (actor.x / distFromCenter) * localLimit
    actor.z = (actor.z / distFromCenter) * localLimit
  }

  for (const obs of sim.obstacles) {
    const dx = actor.x - obs.x
    const dz = actor.z - obs.z
    const dist = Math.hypot(dx, dz)
    const minDist = actor.radius + obs.radius
    if (dist < minDist) {
      if (dist < 0.001) {
        actor.x = prevX
        actor.z = prevZ
      } else {
        actor.x = obs.x + (dx / dist) * minDist
        actor.z = obs.z + (dz / dist) * minDist
      }
    }
  }
}

function updateAiController(
  actor: ArenaActor3D,
  sim: ArenaSimState,
  dt: number,
): void {
  if (actor.hp <= 0 || actor.hitstopTimer > 0) return
  if (actor.actionState === 'stagger' || actor.actionState === 'dodge') return

  const foes = getLivingByTeam(sim, actor.team === 'ally' ? 'enemy' : 'ally')
  if (foes.length === 0) return

  // 选定最近对手
  let target = foes[0]!
  let minDist = Math.hypot(target.x - actor.x, target.z - actor.z)
  for (let i = 1; i < foes.length; i += 1) {
    const f = foes[i]!
    const d = Math.hypot(f.x - actor.x, f.z - actor.z)
    if (d < minDist) {
      minDist = d
      target = f
    }
  }

  const dx = target.x - actor.x
  const dz = target.z - actor.z
  const targetYaw = Math.atan2(dx, dz)

  actor.aiThinkTimer -= dt
  if (actor.aiThinkTimer <= 0) {
    actor.aiThinkTimer = 0.55 + gameRng() * 0.65
    if (gameRng() < 0.35) {
      actor.aiStrafeDir = actor.aiStrafeDir === 1 ? -1 : 1
    }
  }

  if (actor.actionState !== 'idle' && actor.actionState !== 'move' && actor.actionState !== 'guard') {
    return
  }

  actor.yaw = targetYaw

  // 持有近战令牌或唯一近战者积极迫近出招；外圈者游走或发远程绝学
  const canApproach = actor.team === 'ally' || actor.hasMeleeToken
  const desiredRange = canApproach ? 2.05 : 5.2

  if (minDist > desiredRange + 0.35) {
    const speed = actor.stats.moveSpeed * (canApproach ? 0.92 : 0.78)
    actor.vx = (dx / Math.max(0.01, minDist)) * speed
    actor.vz = (dz / Math.max(0.01, minDist)) * speed
    actor.actionState = 'move'
    actor.guardHeld = false
  } else if (minDist < desiredRange - 1.0 && !canApproach) {
    const speed = actor.stats.moveSpeed * 0.65
    actor.vx = -(dx / Math.max(0.01, minDist)) * speed
    actor.vz = -(dz / Math.max(0.01, minDist)) * speed
    actor.actionState = 'move'
  } else {
    // 环绕游走
    const perpX = -Math.cos(targetYaw) * actor.aiStrafeDir
    const perpZ = Math.sin(targetYaw) * actor.aiStrafeDir
    actor.vx = perpX * actor.stats.moveSpeed * 0.45
    actor.vz = perpZ * actor.stats.moveSpeed * 0.45
    actor.actionState = 'move'
  }

  if (actor.attackCooldown <= 0) {
    if (!canApproach) {
      // 外圈敌人优先尝试远程暗器/音波技能
      const ranged = actor.skills.find(
        (sk) => sk.cooldown <= 0 && !sk.isGuardSkill && (sk.shape === 'projectile' || minDist < sk.reach),
      )
      if (ranged && startSkillAttack(actor, ranged, sim, targetYaw)) {
        actor.attackCooldown = 2.2 + gameRng() * 1.2
      }
      return
    }

    if (minDist <= 2.45) {
      const readySkill = actor.skills.find(
        (sk) => sk.cooldown <= 0 && !sk.isGuardSkill && minDist <= sk.reach + 0.4,
      )
      if (readySkill && gameRng() < 0.42 && startSkillAttack(actor, readySkill, sim, targetYaw)) {
        actor.attackCooldown = 1.65 + gameRng() * 0.85
      } else {
        startLightAttack(actor, sim, targetYaw)
        actor.attackCooldown = 1.2 + gameRng() * 0.7
      }
    }
  }
}

export function stepArenaSimulation(
  sim: ArenaSimState,
  input: ArenaInputFrame,
  rawDt: number,
): void {
  const clampedDt = Math.min(0.05, Math.max(0.001, rawDt))
  if (sim.outcome !== 'ongoing') {
    // 终局后仅推进特效与漂浮数字消散
    for (let i = sim.vfxEvents.length - 1; i >= 0; i -= 1) {
      const v = sim.vfxEvents[i]!
      v.age += clampedDt
      if (v.age >= v.duration) sim.vfxEvents.splice(i, 1)
    }
    for (let i = sim.floatingTexts.length - 1; i >= 0; i -= 1) {
      const f = sim.floatingTexts[i]!
      f.age += clampedDt
      if (f.age >= f.duration) sim.floatingTexts.splice(i, 1)
    }
    return
  }

  if (sim.slowMoTimer > 0) {
    sim.slowMoTimer = Math.max(0, sim.slowMoTimer - clampedDt)
  }
  const worldScale = sim.slowMoTimer > 0 ? sim.slowMoScale : 1
  const dt = clampedDt * worldScale
  sim.elapsedTime += dt
  sim.cameraShake = Math.max(0, sim.cameraShake - clampedDt * 1.4)

  // 撑回合倒计时获胜模式
  if (sim.surviveToWin) {
    sim.surviveTimer -= dt
    if (sim.surviveTimer <= 0) {
      sim.outcome = 'player_win'
      sim.outcomeBanner = '稳守考校撑满时限！'
      sim.sfxQueue.push({ type: 'end', outcome: 'player_win' })
      return
    }
  }

  // 多敌近战令牌分配：同一时间只让 1 名近战敌人持令牌压上
  const livingEnemies = getLivingByTeam(sim, 'enemy')
  const player = sim.actors.find((a) => a.isPlayer)
  if (livingEnemies.length > 0 && player) {
    let closest = livingEnemies[0]!
    let bestD = Math.hypot(closest.x - player.x, closest.z - player.z)
    for (let i = 1; i < livingEnemies.length; i += 1) {
      const e = livingEnemies[i]!
      const d = Math.hypot(e.x - player.x, e.z - player.z)
      if (d < bestD) {
        bestD = d
        closest = e
      }
    }
    for (const e of livingEnemies) {
      e.hasMeleeToken = e.unitId === closest.unitId
    }
  }

  // 主角输入缓冲记录（在顿帧或收招期间不吞键）
  if (input.dodgePressed) {
    sim.bufferedCommand = { kind: 'dodge', expiresAt: sim.elapsedTime + 0.18 }
  } else if (input.skillPressed) {
    sim.bufferedCommand = { kind: 'skill', slot: input.skillPressed, expiresAt: sim.elapsedTime + 0.18 }
  } else if (input.attackPressed) {
    sim.bufferedCommand = { kind: 'attack', expiresAt: sim.elapsedTime + 0.18 }
  }
  if (sim.bufferedCommand && sim.bufferedCommand.expiresAt < sim.elapsedTime) {
    sim.bufferedCommand = null
  }

  // 主角脱战读条
  if (player && player.hp > 0 && sim.escapeAllowed && input.escapeHeld) {
    sim.escapeHoldProgress = Math.min(1, sim.escapeHoldProgress + dt / 1.1)
    if (sim.escapeHoldProgress >= 1) {
      sim.outcome = 'escaped'
      sim.outcomeBanner = '轻功抽身，安然脱战！'
      sim.sfxQueue.push({ type: 'end', outcome: 'escaped' })
      return
    }
  } else {
    sim.escapeHoldProgress = Math.max(0, sim.escapeHoldProgress - dt * 1.8)
  }

  // 主角动作决策
  if (player && player.hp > 0) {
    let desiredYaw = player.yaw
    if (input.hasAimPoint) {
      const adx = input.aimX - player.x
      const adz = input.aimZ - player.z
      if (Math.hypot(adx, adz) > 0.25) {
        desiredYaw = Math.atan2(adx, adz)
      }
    } else if (Math.hypot(input.moveX, input.moveZ) > 0.1) {
      desiredYaw = Math.atan2(input.moveX, input.moveZ)
    }

    // 1. 闪避最高打断优先级
    if (sim.bufferedCommand?.kind === 'dodge') {
      if (startDodge(player, sim, input.moveX, input.moveZ)) {
        sim.bufferedCommand = null
      }
    }

    const canAct =
      player.hitstopTimer <= 0 &&
      (player.actionState === 'idle' ||
        player.actionState === 'move' ||
        player.actionState === 'guard' ||
        player.actionState === 'parry_success' ||
        player.actionState === 'follow')

    if (canAct) {
      if (sim.bufferedCommand?.kind === 'skill' && sim.bufferedCommand.slot) {
        const slot = sim.bufferedCommand.slot
        const skill = player.skills.find((sk) => sk.slot === slot)
        if (skill && startSkillAttack(player, skill, sim, desiredYaw)) {
          sim.bufferedCommand = null
        }
      } else if (sim.bufferedCommand?.kind === 'attack') {
        const counterTarget =
          player.counterWindowTimer > 0 && player.counterTargetId
            ? sim.actors.find((a) => a.unitId === player.counterTargetId && a.hp > 0)
            : null
        if (counterTarget) {
          startExecuteAttack(player, counterTarget, sim)
          sim.bufferedCommand = null
        } else {
          startLightAttack(player, sim, desiredYaw)
          sim.bufferedCommand = null
        }
      } else if (input.guardHeld) {
        if (player.actionState !== 'guard') {
          player.guardStartTime = sim.elapsedTime
          if (input.guardJustPressed) sim.sfxQueue.push({ type: 'guard' })
        }
        player.guardHeld = true
        player.actionState = 'guard'
        player.yaw = desiredYaw
        player.vx = input.moveX * player.stats.moveSpeed * 0.45
        player.vz = input.moveZ * player.stats.moveSpeed * 0.45
      } else {
        player.guardHeld = false
        if (Math.hypot(input.moveX, input.moveZ) > 0.08) {
          player.actionState = 'move'
          player.yaw = Math.atan2(input.moveX, input.moveZ)
          player.vx = input.moveX * player.stats.moveSpeed
          player.vz = input.moveZ * player.stats.moveSpeed
        } else {
          if (player.actionState === 'move' || player.actionState === 'guard') {
            player.actionState = 'idle'
          }
          player.vx = 0
          player.vz = 0
        }
      }
    } else if (!input.guardHeld) {
      player.guardHeld = false
    }
  }

  // 清空旧预警，由当前正在蓄力的动作重建
  sim.telegraphs = []

  // 更新全部角色状态、五拍动作与物理位置
  for (const actor of sim.actors) {
    if (actor.hp <= 0) {
      actor.actionState = 'defeated'
      actor.vx = 0
      actor.vz = 0
      continue
    }

    actor.dodgeCooldown = Math.max(0, actor.dodgeCooldown - dt)
    actor.invulnTimer = Math.max(0, actor.invulnTimer - dt)
    actor.exposedTimer = Math.max(0, actor.exposedTimer - dt)
    actor.counterWindowTimer = Math.max(0, actor.counterWindowTimer - dt)
    actor.hurtFlashTimer = Math.max(0, actor.hurtFlashTimer - dt)
    actor.attackCooldown = Math.max(0, actor.attackCooldown - dt)
    actor.comboResetTimer = Math.max(0, actor.comboResetTimer - dt)
    if (actor.comboResetTimer <= 0) actor.comboStep = 0

    for (const sk of actor.skills) {
      sk.cooldown = Math.max(0, sk.cooldown - dt)
    }

    if (actor.poisonTimer > 0) {
      actor.poisonTimer = Math.max(0, actor.poisonTimer - dt)
      actor.hp = Math.max(1, actor.hp - actor.poisonDps * dt)
    }

    if (!actor.guardHeld && actor.posture > 0) {
      actor.posture = Math.max(0, actor.posture - actor.stats.postureRegenPerSec * dt)
    }

    // 局部顿帧定格
    if (actor.hitstopTimer > 0) {
      actor.hitstopTimer = Math.max(0, actor.hitstopTimer - clampedDt)
      continue
    }

    if (!actor.isPlayer) {
      updateAiController(actor, sim, dt)
    }

    const prevX = actor.x
    const prevZ = actor.z

    // 五拍动作状态机推进
    if (actor.actionState === 'stagger') {
      actor.staggerTimer -= dt
      actor.vx *= Math.pow(0.06, dt)
      actor.vz *= Math.pow(0.06, dt)
      if (actor.staggerTimer <= 0) {
        actor.actionState = 'idle'
      }
    } else if (actor.actionState === 'dodge') {
      actor.actionTimer += dt
      actor.vx *= Math.pow(0.25, dt)
      actor.vz *= Math.pow(0.25, dt)
      if (actor.actionTimer >= actor.actionDuration) {
        actor.actionState = 'idle'
        actor.vx = 0
        actor.vz = 0
      }
    } else if (actor.actionState === 'drink' || actor.actionState === 'parry_success') {
      actor.actionTimer += dt
      actor.vx = 0
      actor.vz = 0
      if (actor.actionTimer >= actor.actionDuration) {
        actor.actionState = 'idle'
      }
    } else if (actor.actionState === 'execute' && actor.activeAttack) {
      actor.actionTimer += dt
      const t = Math.min(1, actor.actionTimer / Math.max(0.01, actor.actionDuration))
      const easeOut = 1 - Math.pow(1 - t, 3)
      actor.x =
        actor.activeAttack.magnetStartX +
        (actor.activeAttack.magnetTargetX - actor.activeAttack.magnetStartX) * easeOut
      actor.z =
        actor.activeAttack.magnetStartZ +
        (actor.activeAttack.magnetTargetZ - actor.activeAttack.magnetStartZ) * easeOut
      if (t >= 0.55 && !actor.activeAttack.hitApplied) {
        executeAttackHitFrame(actor, sim)
      }
      if (actor.actionTimer >= actor.actionDuration) {
        actor.activeAttack = null
        actor.actionState = 'idle'
      }
    } else if (actor.actionState === 'windup' && actor.activeAttack) {
      actor.actionTimer += dt
      const progress = Math.min(1, actor.actionTimer / Math.max(0.01, actor.actionDuration))
      if (actor.team === 'enemy' && actor.activeAttack.shape !== 'projectile') {
        sim.telegraphs.push({
          id: `tel-${actor.unitId}`,
          ownerId: actor.unitId,
          kind: actor.activeAttack.shape === 'nova' ? 'circle' : 'fan',
          x: actor.x,
          z: actor.z,
          yaw: actor.yaw,
          radius: actor.activeAttack.reach,
          halfAngle: actor.activeAttack.arcHalfAngle,
          progress,
          unblockable: actor.activeAttack.unblockable,
        })
      }
      if (actor.actionTimer >= actor.actionDuration) {
        actor.actionState = 'coil'
        actor.actionTimer = 0
        actor.actionDuration = 0.08
      }
    } else if (actor.actionState === 'coil' && actor.activeAttack) {
      actor.actionTimer += dt
      if (actor.team === 'enemy' && actor.activeAttack.shape !== 'projectile') {
        sim.telegraphs.push({
          id: `tel-${actor.unitId}`,
          ownerId: actor.unitId,
          kind: actor.activeAttack.shape === 'nova' ? 'circle' : 'fan',
          x: actor.x,
          z: actor.z,
          yaw: actor.yaw,
          radius: actor.activeAttack.reach,
          halfAngle: actor.activeAttack.arcHalfAngle,
          progress: 1,
          unblockable: actor.activeAttack.unblockable,
        })
      }
      if (actor.actionTimer >= actor.actionDuration) {
        actor.actionState = 'slash'
        actor.actionTimer = 0
        actor.actionDuration = 0.14
      }
    } else if (actor.actionState === 'slash' && actor.activeAttack) {
      actor.actionTimer += dt
      const t = Math.min(1, actor.actionTimer / Math.max(0.01, actor.actionDuration))
      // 四次方缓出快速挥出 + 攻击吸附滑步
      const quartOut = 1 - Math.pow(1 - t, 4)
      actor.x =
        actor.activeAttack.magnetStartX +
        (actor.activeAttack.magnetTargetX - actor.activeAttack.magnetStartX) * quartOut
      actor.z =
        actor.activeAttack.magnetStartZ +
        (actor.activeAttack.magnetTargetZ - actor.activeAttack.magnetStartZ) * quartOut
      if (t >= 0.35 && !actor.activeAttack.hitApplied) {
        executeAttackHitFrame(actor, sim)
      }
      if (actor.actionTimer >= actor.actionDuration) {
        actor.actionState = 'follow'
        actor.actionTimer = 0
        actor.actionDuration = 0.18
      }
    } else if (actor.actionState === 'follow') {
      actor.actionTimer += dt
      if (actor.actionTimer >= actor.actionDuration) {
        actor.activeAttack = null
        actor.actionState = 'idle'
      }
    }

    actor.x += actor.vx * dt
    actor.z += actor.vz * dt
    clampActorToArenaAndObstacles(actor, prevX, prevZ, sim)
  }

  // 角色间体积碰撞推开（闪避态除外）
  for (let i = 0; i < sim.actors.length; i += 1) {
    const a = sim.actors[i]!
    if (a.hp <= 0 || a.actionState === 'dodge') continue
    for (let j = i + 1; j < sim.actors.length; j += 1) {
      const b = sim.actors[j]!
      if (b.hp <= 0 || b.actionState === 'dodge') continue
      const dx = b.x - a.x
      const dz = b.z - a.z
      const dist = Math.hypot(dx, dz)
      const minD = a.radius + b.radius
      if (dist < minD && dist > 0.0001) {
        const push = (minD - dist) * 0.5
        const nx = dx / dist
        const nz = dz / dist
        a.x -= nx * push
        a.z -= nz * push
        b.x += nx * push
        b.z += nz * push
        clampActorToArenaAndObstacles(a, a.x, a.z, sim)
        clampActorToArenaAndObstacles(b, b.x, b.z, sim)
      }
    }
  }

  // 更新飞行暗器 / 剑气弹幕
  for (let i = sim.projectiles.length - 1; i >= 0; i -= 1) {
    const p = sim.projectiles[i]!
    p.life += dt
    p.x += p.vx * dt
    p.z += p.vz * dt
    let remove = p.life >= p.maxLife || Math.hypot(p.x, p.z) >= sim.arenaRadius
    if (!remove) {
      for (const obs of sim.obstacles) {
        if (Math.hypot(p.x - obs.x, p.z - obs.z) <= obs.radius + p.radius * 0.5) {
          remove = true
          break
        }
      }
    }
    if (!remove) {
      const foes = getLivingByTeam(sim, p.team === 'ally' ? 'enemy' : 'ally')
      const owner = sim.actors.find((a) => a.unitId === p.ownerId) ?? foes[0]!
      for (const foe of foes) {
        if (Math.hypot(p.x - foe.x, p.z - foe.z) <= foe.radius + p.radius) {
          const speed = Math.max(0.01, Math.hypot(p.vx, p.vz))
          applyHitToTarget(
            owner,
            foe,
            {
              damage: p.damage,
              postureDamage: p.postureDamage,
              knockback: 1.0,
              vfxCategory: p.vfxCategory,
              unblockable: false,
              isHeavenTier: false,
              isExecute: false,
              hitDirX: p.vx / speed,
              hitDirZ: p.vz / speed,
            },
            sim,
          )
          remove = true
          break
        }
      }
    }
    if (remove) {
      sim.projectiles.splice(i, 1)
    }
  }

  // 更新特效与漂浮伤害数字生命周期
  for (let i = sim.vfxEvents.length - 1; i >= 0; i -= 1) {
    const v = sim.vfxEvents[i]!
    v.age += dt
    if (v.age >= v.duration) sim.vfxEvents.splice(i, 1)
  }
  for (let i = sim.floatingTexts.length - 1; i >= 0; i -= 1) {
    const f = sim.floatingTexts[i]!
    f.age += dt
    if (f.age >= f.duration) sim.floatingTexts.splice(i, 1)
  }

  // 胜负终局判定
  const livingAllies = getLivingByTeam(sim, 'ally')
  const remEnemies = getLivingByTeam(sim, 'enemy')
  if (livingAllies.length === 0 || (player && player.hp <= 0)) {
    sim.outcome = 'npc_win'
    sim.outcomeBanner = '力战不支，败下阵来'
    sim.sfxQueue.push({ type: 'end', outcome: 'npc_win' })
  } else if (remEnemies.length === 0) {
    sim.outcome = 'player_win'
    sim.outcomeBanner = '力挫群敌，大获全胜！'
    sim.sfxQueue.push({ type: 'end', outcome: 'player_win' })
  }
}
