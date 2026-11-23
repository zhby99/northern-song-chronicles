import type {
  CombatOutcome,
  CombatVfxCategory,
  MoveSlotKey,
} from '../combat/types'

export type CombatDisplayMode = 'arena3d' | 'classic'

export type WeaponArchetype3D =
  | 'sword'
  | 'blade'
  | 'spear'
  | 'staff'
  | 'fan'
  | 'gauntlet'
  | 'hidden'

export type SectArchetype3D =
  | 'swordsman'
  | 'shaolin_monk'
  | 'taoist'
  | 'beggar'
  | 'imperial_guard'
  | 'western_monk'
  | 'emei_heroine'
  | 'poison_adept'

export type ArenaThemeKind = 'courtyard' | 'mountain' | 'market' | 'frontier'

export type ActorActionState3D =
  | 'idle'
  | 'move'
  | 'windup'
  | 'coil'
  | 'slash'
  | 'follow'
  | 'guard'
  | 'parry_success'
  | 'dodge'
  | 'drink'
  | 'stagger'
  | 'execute'
  | 'defeated'

export type AttackShapeKind = 'arc' | 'thrust' | 'projectile' | 'nova' | 'guard_buff'

export interface ArenaSkillSpec {
  slot: MoveSlotKey
  artId: string
  name: string
  category: string
  vfxCategory: CombatVfxCategory
  shape: AttackShapeKind
  isHeavenTier: boolean
  rawDamage: number
  mpCost: number
  cooldownMax: number
  cooldown: number
  reach: number
  arcHalfAngle: number
  windupSec: number
  coilSec: number
  slashSec: number
  followSec: number
  postureDamage: number
  knockback: number
  unblockable: boolean
  isGuardSkill?: boolean
  fxTags: string[]
}

export interface ArenaComputedStats {
  moveSpeed: number
  dodgeCooldownMax: number
  dodgeInvulnSec: number
  dodgeDurationSec: number
  parryWindowSec: number
  maxPosture: number
  postureRegenPerSec: number
  physMitigation: number
  qiMitigation: number
  poiseThreshold: number
  critChance: number
  baseAttackDamage: number
  weaponArchetype: WeaponArchetype3D
  sectArchetype: SectArchetype3D
  primaryVfx: CombatVfxCategory
  lifeStealPct: number
  mpDrainPct: number
  guardReboundPct: number
  hasXiaowuxiangSave: boolean
  damageAmpPct: number
}

export interface ArenaActor3D {
  unitId: string
  npcId: string
  team: 'ally' | 'enemy'
  isPlayer: boolean
  name: string
  title: string
  realm: string
  factionName: string
  portraitUrl: string
  stats: ArenaComputedStats
  skills: ArenaSkillSpec[]

  x: number
  z: number
  vx: number
  vz: number
  yaw: number
  radius: number

  hp: number
  maxHp: number
  mp: number
  maxMp: number
  posture: number
  maxPosture: number
  itemUses: number
  xiaowuxiangSaved: boolean

  actionState: ActorActionState3D
  actionTimer: number
  actionDuration: number
  comboStep: number
  comboResetTimer: number
  activeAttack: {
    kind: 'light' | 'skill' | 'execute'
    slot?: MoveSlotKey
    name: string
    vfxCategory: CombatVfxCategory
    shape: AttackShapeKind
    damage: number
    postureDamage: number
    knockback: number
    reach: number
    arcHalfAngle: number
    unblockable: boolean
    isHeavenTier: boolean
    hitApplied: boolean
    targetUnitId?: string
    magnetStartX: number
    magnetStartZ: number
    magnetTargetX: number
    magnetTargetZ: number
  } | null

  guardHeld: boolean
  guardStartTime: number
  dodgeCooldown: number
  invulnTimer: number
  hitstopTimer: number
  staggerTimer: number
  exposedTimer: number
  counterWindowTimer: number
  counterTargetId: string | null
  hurtFlashTimer: number
  poisonTimer: number
  poisonDps: number

  aiThinkTimer: number
  aiStrafeDir: 1 | -1
  hasMeleeToken: boolean
  attackCooldown: number
}

export interface ArenaProjectile3D {
  id: string
  ownerId: string
  team: 'ally' | 'enemy'
  x: number
  y: number
  z: number
  vx: number
  vz: number
  radius: number
  damage: number
  postureDamage: number
  vfxCategory: CombatVfxCategory
  life: number
  maxLife: number
  destructible: boolean
}

export interface ArenaTelegraph3D {
  id: string
  ownerId: string
  kind: 'fan' | 'line' | 'circle'
  x: number
  z: number
  yaw: number
  radius: number
  halfAngle: number
  progress: number
  unblockable: boolean
}

export interface ArenaVfxEvent3D {
  id: string
  kind: 'slash' | 'ink_trail' | 'nova' | 'spark' | 'parry' | 'dodge_ghost' | 'execute' | 'heal' | 'drop_orb'
  x: number
  y: number
  z: number
  yaw: number
  radius: number
  vfxCategory: CombatVfxCategory
  isHeavenTier: boolean
  isCrit: boolean
  label?: string
  age: number
  duration: number
}

export interface ArenaFloatingText3D {
  id: string
  x: number
  y: number
  z: number
  text: string
  tone: 'damage' | 'crit' | 'parry' | 'guard' | 'dodge' | 'heal' | 'special'
  age: number
  duration: number
}

export interface ArenaObstacle3D {
  id: string
  kind: 'pillar' | 'stone' | 'pine' | 'rack'
  x: number
  z: number
  radius: number
  height: number
  endX?: number
  endZ?: number
}

export interface ArenaInputFrame {
  moveX: number
  moveZ: number
  aimX: number
  aimZ: number
  hasAimPoint: boolean
  attackPressed: boolean
  dodgePressed: boolean
  guardHeld: boolean
  guardJustPressed: boolean
  skillPressed: MoveSlotKey | null
  escapeHeld: boolean
}

export interface ArenaSimState {
  sessionId: string
  theme: ArenaThemeKind
  mode: 'spar' | 'duel'
  surviveToWin: boolean
  surviveTimer: number
  escapeAllowed: boolean
  escapeHoldProgress: number
  arenaRadius: number
  elapsedTime: number
  slowMoTimer: number
  slowMoScale: number
  cameraShake: number
  outcome: CombatOutcome
  outcomeBanner: string | null

  actors: ArenaActor3D[]
  projectiles: ArenaProjectile3D[]
  telegraphs: ArenaTelegraph3D[]
  vfxEvents: ArenaVfxEvent3D[]
  floatingTexts: ArenaFloatingText3D[]
  obstacles: ArenaObstacle3D[]

  bufferedCommand: {
    kind: 'attack' | 'dodge' | 'skill'
    slot?: MoveSlotKey
    expiresAt: number
  } | null

  hitCount: number
  parryCount: number
  executeCount: number
  sfxQueue: Array<
    | { type: 'swing'; vfx: CombatVfxCategory }
    | { type: 'impact'; vfx: CombatVfxCategory; isCrit: boolean; isGuarded: boolean; isHeavenTier: boolean }
    | { type: 'parry' }
    | { type: 'dodge' }
    | { type: 'guard' }
    | { type: 'execute' }
    | { type: 'telegraph' }
    | { type: 'heal' }
    | { type: 'end'; outcome: Exclude<CombatOutcome, 'ongoing'> }
  >
}
