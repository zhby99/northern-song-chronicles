import type {
  CompiledMartialArtRecord,
  EquippedArtsMap,
  EquippedSlotsMap,
  LearnedArtEntry,
  NodeNpc,
} from '../../types/game'
import type { ActiveQuestCombatHook } from '../../types/quest'

export const FX_KEYS = [
  'anran_despair',
  'bahuang_base',
  'bahuang_dom',
  'baihong_curve',
  'baoyu_lock',
  'beiming_drain',
  'canhe_pierce',
  'dagou_bonus',
  'dagou_slow',
  'douzhuan_high',
  'douzhuan_low',
  'dugu_interrupt',
  'formless_qi_wall',
  'huagong_burn',
  'huagong_weak',
  'hujia_gap',
  'huoyan_burn',
  'huoyan_pen',
  'jingang_phys_red',
  'jingang_rebound',
  'jiuyin_heal',
  'jiuyin_pierce',
  'kuihua_haste',
  'lingbo_def_dodge',
  'lingbo_dodge',
  'liumai_pierce',
  'liuyang_leech',
  'longxiang_might',
  'qixian_sap',
  'shenxing_dodge',
  'shenxing_escape',
  'taiji_guard',
  'taiji_sap',
  'taixuan_amp',
  'taixuan_pierce',
  'tanzhi_disarm',
  'tiezhang_palm',
  'xianglong_stun',
  'xiangmo_crush',
  'xiantian_antipoison',
  'xiantian_hp',
  'xiantian_mp',
  'xiaowuxiang_amp',
  'xiaowuxiang_save',
  'xisui_phys_red',
  'xisui_ward',
  'xuantie_crush',
  'yangjia_carbine',
  'yangjia_pierce',
  'yiyang_seal',
  'yunv_double',
  'zhemeishou_amp',
  'zhemeishou_red',
  'zixia_stack',
] as const

export type FxKey = (typeof FX_KEYS)[number]

export type SlotEffectsMap = Partial<Record<FxKey, number>>

export function isFxKey(id: string): id is FxKey {
  return (FX_KEYS as readonly string[]).includes(id)
}

export type MoveSlotKey = 'move1' | 'move2' | 'move3' | 'move4'

export const MOVE_SLOT_KEYS: MoveSlotKey[] = ['move1', 'move2', 'move3', 'move4']

export type CombatTeam = 'ally' | 'enemy'

export type CombatActionChoice =
  | { type: 'move'; slot: MoveSlotKey; targetId?: string }
  | { type: 'defend' }
  | { type: 'escape' }
  | { type: 'item'; itemId: string; targetId?: string }

export type CombatOutcome = 'ongoing' | 'player_win' | 'npc_win' | 'escaped' | 'draw'

export interface CombatantState {
  unitId: string
  team: CombatTeam
  id: string
  name: string
  title: string
  realm: string
  factionName: string
  portraitUrl: string
  isPlayer: boolean

  hp: number
  maxHp: number
  mp: number
  maxMp: number
  agility: number
  res: number
  equipAttack: number
  equipDefense: number
  qinSkill?: number
  shuSkill?: number

  equipped: EquippedSlotsMap
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
  synergyBonusBySlot: Partial<Record<MoveSlotKey, number>>

  // 回合动态状态
  lastUsedArtId: string | null
  stunnedNextRound: boolean
  disarmedNextRound: boolean
  exposed: boolean
  consecutiveMoveRounds: number
  poisonDotTurns: number
  poisonDotDmg: number
  slowTurns: number
  slowPct: number
  weakTurns: number
  weakPct: number
  zixiaStacks: number
  zhemeishouStacks: number
  usedArtIdsHistory: string[]
}

export interface CombatUnitSnapshot {
  hp: number
  mp: number
}

export interface CombatLogEntry {
  id: string
  round: number
  tone: 'info' | 'player' | 'enemy' | 'special' | 'crit' | 'dodge' | 'system'
  text: string
}

export type CombatVfxCategory =
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

export interface CombatFloatingPopup {
  id: string
  side: 'player' | 'npc'
  unitId?: string
  text: string
  subText?: string
  style: 'damage' | 'crit' | 'dodge' | 'heal' | 'mp' | 'special' | 'guard' | 'debuff'
}

export interface CombatRoundBeat {
  id: string
  kind: 'reveal' | 'attack' | 'dodge' | 'item' | 'escape' | 'status' | 'end'
  actorSide?: 'player' | 'npc'
  targetSide?: 'player' | 'npc'
  actorUnitId?: string
  targetUnitId?: string
  bannerTitle?: string
  bannerSubtitle?: string
  vfxCategory?: CombatVfxCategory
  isHeavenTier?: boolean
  isCrit?: boolean
  isGuarded?: boolean
  shakeLevel?: 0 | 1 | 2 | 3
  popups: CombatFloatingPopup[]
  logs: CombatLogEntry[]
  playerHp: number
  playerMp: number
  npcHp: number
  npcMp: number
  unitSnapshots?: Record<string, CombatUnitSnapshot>
}

export interface CombatRoundSummary {
  round: number
  playerChoiceLabel: string
  npcChoiceLabel: string
  firstMover: 'player' | 'npc'
  initialPlayerHp: number
  initialPlayerMp: number
  initialNpcHp: number
  initialNpcMp: number
  initialUnitSnapshots?: Record<string, CombatUnitSnapshot>
  beats: CombatRoundBeat[]
  events: CombatLogEntry[]
}

export type DuelStakesKind =
  | 'spar'
  | 'duel'
  | 'rob_official'
  | 'zhan_zhao_arrest'
  | 'liao_spy_duel'
  | 'kaifeng_warrant'
  | 'sect_tournament'
  | 'escort_ambush'

export interface CombatSessionState {
  sessionId: string
  mode: 'spar' | 'duel'
  duelStakes: DuelStakesKind
  round: number
  maxRounds: number
  surviveToWin?: boolean
  forbidEscapeReason?: string | null
  questCombatHook?: ActiveQuestCombatHook | null
  outcome: CombatOutcome
  player: CombatantState
  npc: CombatantState
  allies: CombatantState[]
  enemies: CombatantState[]
  targetNpcNode: NodeNpc
  allyNpcNodes: NodeNpc[]
  enemyNpcNodes: NodeNpc[]
  logs: CombatLogEntry[]
  lastRoundSummary: CombatRoundSummary | null
  rewardsSummary: string | null
}

export interface MoveActionAvailability {
  slot: MoveSlotKey
  art: CompiledMartialArtRecord | null
  level: number
  moveDamage: number
  damageKind: '物理' | '奇门'
  mpCost: number
  lowMpWarning: boolean
  disabled: boolean
  disabledReason: string | null
}

export interface RollFlavorResult {
  multiplier: number
  tag: string
  desc: string
  isCrit: boolean
}

export interface MartialCategoryInstinct {
  shortTag: string
  detail: string
}
