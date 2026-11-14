import { MARTIAL_ART_DB_MAP, NPC_DB_MAP, resolveNpcByName } from '../data/gameDb'
import { computeEquipmentTotals, computeWeaponArtSynergy, ITEM_DB_MAP } from '../data/itemsDb'
import { computeEquippedArtsTotals, getArtLevelStats } from '../data/playerMartialArts'
import type {
  CompiledMartialArtRecord,
  CompiledNpcRecord,
  EquippedArtsMap,
  EquippedSlotsMap,
  HeroBaseStats,
  LearnedArtEntry,
  NodeNpc,
} from '../types/game'
import { deriveHeroEffectiveStats, deriveNpcEffectiveStats } from './heroStats'

export type MoveSlotKey = 'move1' | 'move2' | 'move3' | 'move4'

export const MOVE_SLOT_KEYS: MoveSlotKey[] = ['move1', 'move2', 'move3', 'move4']

export type CombatActionChoice =
  | { type: 'move'; slot: MoveSlotKey }
  | { type: 'defend' }
  | { type: 'escape' }
  | { type: 'item'; itemId: string }

export type CombatOutcome = 'ongoing' | 'player_win' | 'npc_win' | 'escaped' | 'draw'

export interface CombatantState {
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

  equipped: EquippedSlotsMap
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
  synergyBonusBySlot: Partial<Record<MoveSlotKey, number>>

  // 回合动态状态
  lastUsedArtId: string | null
  stunnedNextRound: boolean
  disarmedNextRound: boolean
  slowTurns: number
  slowPct: number
  weakTurns: number
  weakPct: number
  zixiaStacks: number
  zhemeishouStacks: number
  usedArtIdsHistory: string[]
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
  text: string
  subText?: string
  style: 'damage' | 'crit' | 'dodge' | 'heal' | 'mp' | 'special' | 'guard' | 'debuff'
}

export interface CombatRoundBeat {
  id: string
  kind: 'reveal' | 'attack' | 'dodge' | 'item' | 'escape' | 'status' | 'end'
  actorSide?: 'player' | 'npc'
  targetSide?: 'player' | 'npc'
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
  beats: CombatRoundBeat[]
  events: CombatLogEntry[]
}

export interface CombatSessionState {
  sessionId: string
  mode: 'spar' | 'duel'
  round: number
  maxRounds: number
  outcome: CombatOutcome
  player: CombatantState
  npc: CombatantState
  targetNpcNode: NodeNpc
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

let combatLogSeq = 1
function makeLog(
  round: number,
  tone: CombatLogEntry['tone'],
  text: string,
): CombatLogEntry {
  combatLogSeq += 1
  return {
    id: `cbt-${Date.now()}-${combatLogSeq}`,
    round,
    tone,
    text,
  }
}

/**
 * 截断正态分布采样 R ~ TruncNorm(mu=1.0, sigma=0.22, min=0.50, max=1.50)
 */
export function sampleDamageRoll(): RollFlavorResult {
  let r = 1.0
  for (let i = 0; i < 12; i += 1) {
    const u1 = Math.max(1e-7, Math.random())
    const u2 = Math.random()
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
    const cand = 1.0 + z * 0.22
    if (cand >= 0.5 && cand <= 1.5) {
      r = cand
      break
    }
    if (i === 11) {
      r = Math.max(0.5, Math.min(1.5, cand))
    }
  }
  const mult = Math.round(r * 100) / 100
  if (mult >= 1.35) {
    return {
      multiplier: mult,
      tag: '正中要害',
      desc: '招出如电，真劲直透死穴要害',
      isCrit: true,
    }
  }
  if (mult >= 1.12) {
    return {
      multiplier: mult,
      tag: '劲力贯满',
      desc: '内息吐纳正值巅峰，结结实实印在身上',
      isCrit: false,
    }
  }
  if (mult >= 0.88) {
    return {
      multiplier: mult,
      tag: '正面交锋',
      desc: '拳掌硬撼，实受这一记杀招',
      isCrit: false,
    }
  }
  if (mult >= 0.65) {
    return {
      multiplier: mult,
      tag: '卸去泰半',
      desc: '临危侧身挫肩，顺势化去数成力道',
      isCrit: false,
    }
  }
  return {
    multiplier: mult,
    tag: '擦衣掠过',
    desc: '招式堪堪擦身而过，仅受劲风余波震荡',
    isCrit: false,
  }
}

export function getLearnedLevel(learnedArts: LearnedArtEntry[], artId: string | null): number {
  if (!artId) return 1
  const found = learnedArts.find((e) => e.artId === artId)
  return found ? Math.max(1, Math.min(10, found.level)) : 1
}

export function getSlotEffectsMap(
  fighter: CombatantState,
  slot: keyof EquippedArtsMap,
): Record<string, number> {
  const artId = fighter.equippedArts[slot]
  if (!artId) return {}
  const art = MARTIAL_ART_DB_MAP[artId]
  if (!art) return {}
  const lv = getLearnedLevel(fighter.learnedArts, artId)
  const st = getArtLevelStats(art, lv)
  const map: Record<string, number> = {}
  for (const fx of st?.specialEffects ?? []) {
    map[fx.id] = fx.value
  }
  return map
}

export function getArtRawDamageAndKind(
  art: CompiledMartialArtRecord,
  level: number,
): { damage: number; kind: '物理' | '奇门'; subTypeLabel: string } {
  const st = getArtLevelStats(art, level)
  if (!st) return { damage: 40, kind: '物理', subTypeLabel: '外功' }
  if ((st.poisonDamage ?? 0) > 0) {
    return { damage: st.poisonDamage ?? 0, kind: '奇门', subTypeLabel: '奇毒' }
  }
  if ((st.soundDamage ?? 0) > 0) {
    return { damage: st.soundDamage ?? 0, kind: '奇门', subTypeLabel: '音律' }
  }
  if ((st.hiddenWeaponDamage ?? 0) > 0) {
    return { damage: st.hiddenWeaponDamage ?? 0, kind: '奇门', subTypeLabel: '暗器' }
  }
  return {
    damage: st.physicalDamage ?? 40,
    kind: '物理',
    subTypeLabel: art.category,
  }
}

export function computeEffectiveAgility(fighter: CombatantState): number {
  const qgFx = getSlotEffectsMap(fighter, 'qinggong')
  const haste = (qgFx.kuihua_haste ?? 0) / 100
  const slow = fighter.slowTurns > 0 ? fighter.slowPct / 100 : 0
  return Math.max(1, Math.round(fighter.agility * (1 + haste - slow)))
}

export function computeMoveMpCost(fighter: CombatantState, moveDamage: number): number {
  const ngFx = getSlotEffectsMap(fighter, 'neigong')
  const savePct = (ngFx.xiaowuxiang_save ?? 0) / 100
  return Math.max(1, Math.round(moveDamage * 0.35 * (1 - savePct)))
}

export function getMoveActionsAvailability(fighter: CombatantState): MoveActionAvailability[] {
  return MOVE_SLOT_KEYS.map((slot) => {
    const artId = fighter.equippedArts[slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] ?? null : null
    if (!art) {
      return {
        slot,
        art: null,
        level: 0,
        moveDamage: 0,
        damageKind: '物理',
        mpCost: 0,
        lowMpWarning: false,
        disabled: true,
        disabledReason: '未装配招式',
      }
    }
    const level = getLearnedLevel(fighter.learnedArts, art.id)
    const { damage, kind } = getArtRawDamageAndKind(art, level)
    const mpCost = computeMoveMpCost(fighter, damage)

    let disabled = false
    let disabledReason: string | null = null

    if (fighter.stunnedNextRound) {
      disabled = true
      disabledReason = '受震慑/封穴，本回合无法出招'
    } else if (fighter.lastUsedArtId === art.id) {
      disabled = true
      disabledReason = '禁连发同招（上回合刚施展）'
    } else if (
      fighter.disarmedNextRound &&
      (art.category === '暗器' || art.category === '指法')
    ) {
      disabled = true
      disabledReason = '手腕受震，暂无法施展指法/暗器'
    }

    return {
      slot,
      art,
      level,
      moveDamage: damage,
      damageKind: kind,
      mpCost,
      lowMpWarning: fighter.mp < mpCost,
      disabled,
      disabledReason,
    }
  })
}

export function canFighterEscape(
  escapee: CombatantState,
  pursuer: CombatantState,
): {
  allowed: boolean
  reason: string | null
} {
  if (escapee.slowTurns > 0) {
    return { allowed: false, reason: '身陷【绊缠】步法受制，无法脱战' }
  }
  const myAgi = computeEffectiveAgility(escapee)
  const oppAgi = computeEffectiveAgility(pursuer)
  if (oppAgi - myAgi >= 20) {
    return {
      allowed: false,
      reason: `身法比对手低 ${oppAgi - myAgi} 点（低 20 以上无法脱战）`,
    }
  }
  return { allowed: true, reason: null }
}

export function computeDodgeChancePreview(
  defender: CombatantState,
  attacker: CombatantState,
  defenderDefending = false,
): number {
  const defAgi = computeEffectiveAgility(defender)
  const atkAgi = computeEffectiveAgility(attacker)
  let dodge = Math.max(0, Math.min(1, ((defAgi - atkAgi) * 0.35 + defAgi * 0.15) / 100))
  const qgDef = getSlotEffectsMap(defender, 'qinggong')
  if (qgDef.lingbo_dodge) {
    const lb = (defenderDefending ? (qgDef.lingbo_def_dodge ?? qgDef.lingbo_dodge * 2) : qgDef.lingbo_dodge) / 100
    dodge = Math.max(dodge, lb)
  } else if (qgDef.shenxing_dodge) {
    dodge = Math.max(dodge, qgDef.shenxing_dodge / 100)
  }
  return Math.max(0, Math.min(1, dodge))
}

export function computeEscapeChancePreview(
  escapee: CombatantState,
  pursuer: CombatantState,
): number {
  if (!canFighterEscape(escapee, pursuer).allowed) {
    return 0
  }
  const myAgi = computeEffectiveAgility(escapee)
  const oppAgi = computeEffectiveAgility(pursuer)
  const diff = myAgi - oppAgi
  const qgFx = getSlotEffectsMap(escapee, 'qinggong')
  const bonus = (qgFx.shenxing_escape ?? 0) / 100
  return Math.max(0.05, Math.min(0.95, 0.5 + diff * 0.022 + bonus))
}

function estimateHeroRealmLabel(maxHp: number, maxMp: number): string {
  const avg = (maxHp + maxMp) / 2
  if (avg >= 8500) return '大宗师'
  if (avg >= 4500) return '宗师之境'
  if (avg >= 2200) return '一流高手'
  if (avg >= 1100) return '二流好手'
  if (avg >= 500) return '三流武者'
  return '初入江湖'
}

export function buildPlayerCombatant(params: {
  hp: number
  mp: number
  baseStats: HeroBaseStats
  equipped: EquippedSlotsMap
  equippedArts: EquippedArtsMap
  learnedArts: LearnedArtEntry[]
}): CombatantState {
  const eff = deriveHeroEffectiveStats(
    params.baseStats,
    params.equipped,
    params.equippedArts,
    params.learnedArts,
  )
  const equipTotals = computeEquipmentTotals(params.equipped)
  const artTotals = computeEquippedArtsTotals(params.equippedArts, params.learnedArts)
  const syn = computeWeaponArtSynergy(
    params.equipped.weapon,
    params.equippedArts,
    params.learnedArts,
  )
  const synergyBonusBySlot: Partial<Record<MoveSlotKey, number>> = {}
  for (const m of syn.matches) {
    if (m.slot === 'move1' || m.slot === 'move2' || m.slot === 'move3' || m.slot === 'move4') {
      synergyBonusBySlot[m.slot] = m.pct
    }
  }

  return {
    id: 'HERO',
    name: '少侠',
    title: '江湖行者',
    realm: estimateHeroRealmLabel(eff.maxHp, eff.maxMp),
    factionName: '自在游侠',
    portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
    isPlayer: true,

    hp: Math.max(1, Math.min(eff.maxHp, params.hp)),
    maxHp: eff.maxHp,
    mp: Math.max(0, Math.min(eff.maxMp, params.mp)),
    maxMp: eff.maxMp,
    agility: eff.agility,
    res: eff.res,
    equipAttack: equipTotals.attack,
    equipDefense: equipTotals.defense + artTotals.defense,

    equipped: { ...params.equipped },
    equippedArts: { ...params.equippedArts },
    learnedArts: params.learnedArts.map((e) => ({ ...e })),
    synergyBonusBySlot,

    lastUsedArtId: null,
    stunnedNextRound: false,
    disarmedNextRound: false,
    slowTurns: 0,
    slowPct: 0,
    weakTurns: 0,
    weakPct: 0,
    zixiaStacks: 0,
    zhemeishouStacks: 0,
    usedArtIdsHistory: [],
  }
}

export function buildNpcCombatant(npcNode: NodeNpc): CombatantState {
  const dbRecord: CompiledNpcRecord | null | undefined =
    (npcNode.id ? NPC_DB_MAP[npcNode.id] : undefined) ??
    resolveNpcByName(npcNode.name) ??
    resolveNpcByName(npcNode.name.replace(/大师$/, ''))

  if (dbRecord) {
    const eff = deriveNpcEffectiveStats(dbRecord)
    const syn = computeWeaponArtSynergy(
      dbRecord.equipped.weapon,
      dbRecord.equippedArts,
      dbRecord.learnedArts,
    )
    const synergyBonusBySlot: Partial<Record<MoveSlotKey, number>> = {}
    for (const m of syn.matches) {
      if (m.slot === 'move1' || m.slot === 'move2' || m.slot === 'move3' || m.slot === 'move4') {
        synergyBonusBySlot[m.slot] = m.pct
      }
    }
    return {
      id: dbRecord.id,
      name: dbRecord.name,
      title: dbRecord.role || npcNode.title || '江湖名宿',
      realm: dbRecord.realm || npcNode.realm || '不入流',
      factionName: dbRecord.factionName || npcNode.factionName || '江湖散人',
      portraitUrl:
        dbRecord.fullbodyUrl ??
        dbRecord.templateUrl ??
        '/assets/characters/templates/tpl_song_scholar_fb.jpg',
      isPlayer: false,

      hp: eff.maxHp,
      maxHp: eff.maxHp,
      mp: eff.maxMp,
      maxMp: eff.maxMp,
      agility: eff.agility,
      res: eff.res,
      equipAttack: eff.equipAttack,
      equipDefense: eff.totalDefense,

      equipped: { ...dbRecord.equipped },
      equippedArts: { ...dbRecord.equippedArts },
      learnedArts: dbRecord.learnedArts.map((e) => ({ ...e })),
      synergyBonusBySlot,

      lastUsedArtId: null,
      stunnedNextRound: false,
      disarmedNextRound: false,
      slowTurns: 0,
      slowPct: 0,
      weakTurns: 0,
      weakPct: 0,
      zixiaStacks: 0,
      zhemeishouStacks: 0,
      usedArtIdsHistory: [],
    }
  }

  // 兜底非注册表临时人物
  const fallbackHp = npcNode.stats?.hp ?? 600
  const fallbackMp = npcNode.stats?.mp ?? 300
  return {
    id: npcNode.id ?? npcNode.name,
    name: npcNode.name,
    title: npcNode.title || '江湖武人',
    realm: npcNode.realm || '三流中品',
    factionName: npcNode.factionName || '江湖散人',
    portraitUrl: '/assets/characters/templates/tpl_song_scholar_fb.jpg',
    isPlayer: false,
    hp: fallbackHp,
    maxHp: fallbackHp,
    mp: fallbackMp,
    maxMp: fallbackMp,
    agility: npcNode.stats?.agi ?? 25,
    res: npcNode.stats?.res ?? 15,
    equipAttack: 35,
    equipDefense: 35,
    equipped: {
      weapon: null,
      armor: null,
      shoes: null,
      bow: null,
      accessory1: null,
      accessory2: null,
      mount: null,
    },
    equippedArts: {
      neigong: 'MA-179',
      qinggong: 'MA-177',
      move1: 'MA-182',
      move2: 'MA-187',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-179', level: 4, exp: 0 },
      { artId: 'MA-177', level: 4, exp: 0 },
      { artId: 'MA-182', level: 5, exp: 0 },
      { artId: 'MA-187', level: 5, exp: 0 },
    ],
    synergyBonusBySlot: {},
    lastUsedArtId: null,
    stunnedNextRound: false,
    disarmedNextRound: false,
    slowTurns: 0,
    slowPct: 0,
    weakTurns: 0,
    weakPct: 0,
    zixiaStacks: 0,
    zhemeishouStacks: 0,
    usedArtIdsHistory: [],
  }
}

export function createCombatSession(params: {
  mode: 'spar' | 'duel'
  player: CombatantState
  npcNode: NodeNpc
}): CombatSessionState {
  const npc = buildNpcCombatant(params.npcNode)
  const intro = makeLog(
    0,
    'system',
    `【皇祐武林交锋】少侠（${params.player.realm}）抱拳请益 ${npc.name}（${npc.factionName} · ${npc.realm}）！双方凝神屏息，同步盲选拆招——`,
  )
  return {
    sessionId: `session-${Date.now()}`,
    mode: params.mode,
    round: 1,
    maxRounds: 30,
    outcome: 'ongoing',
    player: params.player,
    npc,
    targetNpcNode: params.npcNode,
    logs: [intro],
    lastRoundSummary: null,
    rewardsSummary: null,
  }
}

/**
 * 智能 NPC 回合盲选 AI：严格遵守 6 选 1 与「禁连续两回合使用同一武学」铁律
 */
export function chooseNpcCombatAction(
  npc: CombatantState,
  player: CombatantState,
): CombatActionChoice {
  if (npc.stunnedNextRound) {
    return { type: 'defend' }
  }
  const availMoves = getMoveActionsAvailability(npc).filter((m) => !m.disabled && m.art)
  if (availMoves.length === 0) {
    return { type: 'defend' }
  }

  const ngFx = getSlotEffectsMap(npc, 'neigong')
  const qgFx = getSlotEffectsMap(npc, 'qinggong')
  const affordableMoves = availMoves.filter((m) => !m.lowMpWarning)

  // 若内力不足以支撑大部分招式，或拥有金刚不坏体/凌波微步战术守御，有一定概率暗选【防御】
  let defendProb = 0.12
  if (affordableMoves.length === 0) defendProb = 0.38
  else if (ngFx.jingang_rebound || qgFx.lingbo_def_dodge) defendProb = 0.2
  else if (npc.hp < npc.maxHp * 0.3 && player.mp > player.maxMp * 0.5) defendProb = 0.22

  if (Math.random() < defendProb) {
    return { type: 'defend' }
  }

  const pool = affordableMoves.length > 0 ? affordableMoves : availMoves
  // 按招式综合威力带权随机，既优先强招又不被玩家轻易死猜固定套路
  const weights = pool.map((m) => {
    const fxBonus = (m.art?.levels?.[Math.max(0, m.level - 1)]?.specialEffects?.length ?? 0) > 0 ? 1.25 : 1.0
    const synBonus = 1 + (npc.synergyBonusBySlot[m.slot] ?? 0) / 100
    return Math.max(10, m.moveDamage * fxBonus * synBonus)
  })
  const totalW = weights.reduce((a, b) => a + b, 0)
  let pick = Math.random() * totalW
  for (let i = 0; i < pool.length; i += 1) {
    pick -= weights[i]!
    if (pick <= 0) {
      return { type: 'move', slot: pool[i]!.slot }
    }
  }
  return { type: 'move', slot: pool[0]!.slot }
}

function describeChoice(fighter: CombatantState, choice: CombatActionChoice): string {
  if (choice.type === 'defend') return '【守御架势】'
  if (choice.type === 'escape') return '【抽身脱战】'
  if (choice.type === 'item') {
    const def = ITEM_DB_MAP[choice.itemId]
    if (!def) return '【探囊取药】'
    return def.poisonEffect ? `【施毒·${def.name}】` : `【服丹·${def.name}】`
  }
  const aid = fighter.equippedArts[choice.slot]
  const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
  return art ? `《${art.cleanName}》` : '【徒手拆招】'
}

function cloneCombatant(c: CombatantState): CombatantState {
  return {
    ...c,
    equipped: { ...c.equipped },
    equippedArts: { ...c.equippedArts },
    learnedArts: c.learnedArts.map((e) => ({ ...e })),
    synergyBonusBySlot: { ...c.synergyBonusBySlot },
    usedArtIdsHistory: [...c.usedArtIdsHistory],
  }
}

/**
 * 结算单个完整回合（同步盲选亮牌 -> 先手判定 -> 先手行动 -> 后手行动 -> 回合末真气吐纳与胜负判定）
 */
export function resolveCombatRound(
  session: CombatSessionState,
  playerChoice: CombatActionChoice,
): CombatSessionState {
  if (session.outcome !== 'ongoing') return session

  if (playerChoice.type === 'move') {
    const slotAvail = getMoveActionsAvailability(session.player).find(
      (m) => m.slot === playerChoice.slot,
    )
    if (!slotAvail || slotAvail.disabled || !slotAvail.art) {
      return session
    }
  } else if (
    playerChoice.type === 'escape' &&
    !canFighterEscape(session.player, session.npc).allowed
  ) {
    return session
  } else if (playerChoice.type === 'item' && !ITEM_DB_MAP[playerChoice.itemId]) {
    return session
  }

  const round = session.round
  const player = cloneCombatant(session.player)
  const npc = cloneCombatant(session.npc)
  const initialPlayerHp = player.hp
  const initialPlayerMp = player.mp
  const initialNpcHp = npc.hp
  const initialNpcMp = npc.mp

  const npcChoice = chooseNpcCombatAction(npc, player)
  const roundEvents: CombatLogEntry[] = []
  const beats: CombatRoundBeat[] = []
  let logCursor = 0
  let popupSeq = 0

  const nextPopupId = () => {
    popupSeq += 1
    return `pop-${round}-${popupSeq}`
  }

  const flushBeat = (
    meta: Omit<
      CombatRoundBeat,
      'id' | 'logs' | 'playerHp' | 'playerMp' | 'npcHp' | 'npcMp'
    >,
  ) => {
    const sliced = roundEvents.slice(logCursor)
    logCursor = roundEvents.length
    beats.push({
      ...meta,
      id: `beat-${round}-${beats.length + 1}`,
      logs: sliced,
      playerHp: player.hp,
      playerMp: player.mp,
      npcHp: npc.hp,
      npcMp: npc.mp,
    })
  }

  const mapArtCategoryToVfx = (cat: string): CombatVfxCategory => {
    switch (cat) {
      case '剑法':
        return 'sword'
      case '刀法':
        return 'blade'
      case '拳掌':
        return 'palm'
      case '指法':
        return 'finger'
      case '枪法':
      case '棍棒':
        return 'polearm'
      case '暗器':
        return 'hidden'
      case '音功':
        return 'sonic'
      case '毒功':
        return 'poison'
      default:
        return 'palm'
    }
  }

  // 回合初：紫霞神功叠层 & 清除上回合一次性受控标记（已在本回合选招时生效）
  for (const f of [player, npc]) {
    const ngFx = getSlotEffectsMap(f, 'neigong')
    if (ngFx.zixia_stack && f.zixiaStacks < 5) {
      f.zixiaStacks += 1
      roundEvents.push(
        makeLog(round, 'special', `${f.name}周身紫气蒸腾，《紫霞神功》蓄至第 ${f.zixiaStacks} 层！`),
      )
    }
    f.stunnedNextRound = false
    f.disarmedNextRound = false
  }

  const pLabel = describeChoice(player, playerChoice)
  const nLabel = describeChoice(npc, npcChoice)

  // 1) 判定本回合先后手
  const pAgi = computeEffectiveAgility(player)
  const nAgi = computeEffectiveAgility(npc)
  const pMoveArt =
    playerChoice.type === 'move' && player.equippedArts[playerChoice.slot]
      ? MARTIAL_ART_DB_MAP[player.equippedArts[playerChoice.slot]!]
      : undefined
  const nMoveArt =
    npcChoice.type === 'move' && npc.equippedArts[npcChoice.slot]
      ? MARTIAL_ART_DB_MAP[npc.equippedArts[npcChoice.slot]!]
      : undefined

  const pMoveFx = pMoveArt ? getSlotEffectsMap(player, playerChoice.type === 'move' ? playerChoice.slot : 'move1') : {}
  const nMoveFx = nMoveArt ? getSlotEffectsMap(npc, npcChoice.type === 'move' ? npcChoice.slot : 'move1') : {}

  let firstMover: 'player' | 'npc' = 'player'
  let initReason = ''

  if (
    playerChoice.type === 'move' &&
    npcChoice.type === 'move' &&
    pMoveFx.dugu_interrupt &&
    !nMoveFx.dugu_interrupt
  ) {
    firstMover = 'player'
    initReason = '（《独孤九剑》料敌机先，无视身法抢占先机！）'
  } else if (
    playerChoice.type === 'move' &&
    npcChoice.type === 'move' &&
    nMoveFx.dugu_interrupt &&
    !pMoveFx.dugu_interrupt
  ) {
    firstMover = 'npc'
    initReason = '（《独孤九剑》料敌机先，无视身法抢占先机！）'
  } else {
    const pInit = pAgi + (Math.random() * 6 - 3)
    const nInit = nAgi + (Math.random() * 6 - 3)
    firstMover = pInit >= nInit ? 'player' : 'npc'
    initReason = `（实战身法 ${pAgi} : ${nAgi}）`
  }

  roundEvents.push(
    makeLog(
      round,
      'info',
      `第 ${round} 合亮牌：少侠出${pLabel}，${npc.name}出${nLabel} —— ${
        firstMover === 'player' ? '少侠' : npc.name
      }抢得先手${initReason}！`,
    ),
  )

  const revealPopups: CombatFloatingPopup[] = []

  // 若选择【防御】，重置连招限制，且本回合不耗内力、不回血回内
  if (playerChoice.type === 'defend') {
    player.lastUsedArtId = null
    roundEvents.push(
      makeLog(round, 'player', `少侠沉腰坐马敛气守御，门户严密（本回合不耗内力，所受伤害减半）。`),
    )
    revealPopups.push({
      id: nextPopupId(),
      side: 'player',
      text: '沉腰守御',
      subText: '受创减半',
      style: 'guard',
    })
  }
  if (npcChoice.type === 'defend') {
    npc.lastUsedArtId = null
    roundEvents.push(
      makeLog(round, 'enemy', `${npc.name}凝神敛息摆出守御架势，滴水不漏（所受伤害减半）。`),
    )
    revealPopups.push({
      id: nextPopupId(),
      side: 'npc',
      text: '凝神守御',
      subText: '受创减半',
      style: 'guard',
    })
  }

  flushBeat({
    kind: 'reveal',
    actorSide: firstMover,
    bannerTitle: `第 ${round} 合 · 亮招交锋`,
    bannerSubtitle: `${firstMover === 'player' ? '少侠' : npc.name}抢得先手 ${initReason}`,
    vfxCategory:
      playerChoice.type === 'defend' || npcChoice.type === 'defend' ? 'guard' : undefined,
    popups: revealPopups,
  })

  const interruptedIds = new Set<string>()
  let escapedSuccess = false

  const actionQueue: Array<{
    actor: CombatantState
    target: CombatantState
    choice: CombatActionChoice
    targetChoice: CombatActionChoice
  }> =
    firstMover === 'player'
      ? [
          { actor: player, target: npc, choice: playerChoice, targetChoice: npcChoice },
          { actor: npc, target: player, choice: npcChoice, targetChoice: playerChoice },
        ]
      : [
          { actor: npc, target: player, choice: npcChoice, targetChoice: playerChoice },
          { actor: player, target: npc, choice: playerChoice, targetChoice: npcChoice },
        ]

  for (const step of actionQueue) {
    const { actor, target, choice, targetChoice } = step
    const actorSide: 'player' | 'npc' = actor.isPlayer ? 'player' : 'npc'
    const targetSide: 'player' | 'npc' = target.isPlayer ? 'player' : 'npc'
    if (actor.hp <= 0 || target.hp <= 0 || escapedSuccess) break
    if (interruptedIds.has(actor.id)) continue

    // 处理【逃跑】
    if (choice.type === 'escape') {
      actor.lastUsedArtId = null
      const escCheck = canFighterEscape(actor, target)
      if (!escCheck.allowed) {
        roundEvents.push(
          makeLog(round, 'special', `${actor.name}欲抽身退走，奈何${escCheck.reason}！`),
        )
        flushBeat({
          kind: 'escape',
          actorSide,
          targetSide,
          bannerTitle: '抽身受阻',
          bannerSubtitle: escCheck.reason ?? '身法受制',
          vfxCategory: 'escape',
          popups: [
            {
              id: nextPopupId(),
              side: actorSide,
              text: '脱身受阻！',
              style: 'debuff',
            },
          ],
        })
        continue
      }
      const chance = computeEscapeChancePreview(actor, target)
      const finalEscapeChance = targetChoice.type === 'defend' ? Math.min(0.95, chance + 0.25) : chance
      if (Math.random() < finalEscapeChance) {
        escapedSuccess = true
        roundEvents.push(
          makeLog(
            round,
            'system',
            `${actor.name}虚晃一招纵身掠出战圈（身法比拼脱身率 ${Math.round(finalEscapeChance * 100)}% 成功），双方罢手收招！`,
          ),
        )
        flushBeat({
          kind: 'escape',
          actorSide,
          targetSide,
          bannerTitle: '虚晃一招 · 飘然脱身',
          bannerSubtitle: `轻功掠出战圈（成功率 ${Math.round(finalEscapeChance * 100)}%）`,
          vfxCategory: 'escape',
          popups: [
            {
              id: nextPopupId(),
              side: actorSide,
              text: '飘然脱战！',
              style: 'dodge',
            },
          ],
        })
        break
      } else {
        roundEvents.push(
          makeLog(
            round,
            'info',
            `${actor.name}纵身欲退，却被${target.name}欺身封住去路（脱身率 ${Math.round(finalEscapeChance * 100)}% 未果）！`,
          ),
        )
        flushBeat({
          kind: 'escape',
          actorSide,
          targetSide,
          bannerTitle: '抽身未果',
          bannerSubtitle: `${target.name}欺身封死退路`,
          vfxCategory: 'escape',
          popups: [
            {
              id: nextPopupId(),
              side: actorSide,
              text: '脱战未果！',
              style: 'debuff',
            },
          ],
        })
        continue
      }
    }

    // 处理【行囊丹药 / 战阵奇毒】
    if (choice.type === 'item') {
      actor.lastUsedArtId = null
      const itemDef = ITEM_DB_MAP[choice.itemId]
      if (!itemDef) continue

      if (itemDef.poisonEffect) {
        const targetNgFx = getSlotEffectsMap(target, 'neigong')
        const antiPoisonBoost = (targetNgFx.xiantian_antipoison ?? 0) / 100
        const wardScale = targetNgFx.xisui_ward
          ? Math.max(0.25, 1 - targetNgFx.xisui_ward / 100)
          : 1.0
        const effRes = target.res * (1 + antiPoisonBoost)
        const resMit = Math.min(0.8, effRes / 160)
        const postMult = targetChoice.type === 'defend' ? 0.65 : 1.0

        let basePoisonDmg = 120
        let mpDrainRatio = 0
        let slowAdd = 15
        let weakAdd = 15
        let stunProb = 0

        if (itemDef.rarity === '天阶') {
          basePoisonDmg = 920
          mpDrainRatio = 0.22
          slowAdd = 24
          weakAdd = 28
          stunProb = 0.55 * (1 - resMit)
        } else if (itemDef.rarity === '地阶') {
          basePoisonDmg = itemDef.id === 'ITM-MED-109' ? 320 : 540
          mpDrainRatio = itemDef.id === 'ITM-MED-109' ? 0.35 : 0.1
          slowAdd = 22
          weakAdd = 24
          if (itemDef.id === 'ITM-MED-110') {
            target.res = Math.max(0, target.res - 12)
          }
        } else if (itemDef.rarity === '良阶') {
          basePoisonDmg = itemDef.id === 'ITM-MED-120' ? 150 : 260
          mpDrainRatio = 0.08
          slowAdd = 20
          weakAdd = 18
          if (itemDef.id === 'ITM-MED-120') stunProb = 0.32 * (1 - resMit)
        } else {
          basePoisonDmg = 120
          slowAdd = 15
          weakAdd = 15
          if (itemDef.id === 'ITM-MED-128' && effRes < 65) {
            stunProb = 0.35 * (1 - resMit)
          }
        }

        const pDmg = Math.max(
          8,
          Math.round(basePoisonDmg * (1 - resMit) * wardScale * postMult),
        )
        const mpLost =
          mpDrainRatio > 0
            ? Math.round(target.mp * mpDrainRatio * (1 - resMit) * wardScale)
            : 0
        target.hp = Math.max(0, target.hp - pDmg)
        target.mp = Math.max(0, target.mp - mpLost)
        target.slowTurns = Math.max(target.slowTurns, 2)
        target.slowPct = Math.max(target.slowPct, Math.round(slowAdd * wardScale))
        target.weakTurns = Math.max(target.weakTurns, 2)
        target.weakPct = Math.max(target.weakPct, Math.round(weakAdd * wardScale))

        const extraNotes: string[] = [`毒伤 ${pDmg} 气血`]
        if (mpLost > 0) extraNotes.push(`蚀散 ${mpLost} 内力`)
        extraNotes.push(`迟缓 -${target.slowPct}% / 滞气 -${target.weakPct}%`)

        const poisonPopups: CombatFloatingPopup[] = [
          {
            id: nextPopupId(),
            side: targetSide,
            text: `-${pDmg}`,
            subText: `奇毒·${itemDef.name}`,
            style: 'debuff',
          },
        ]
        if (mpLost > 0) {
          poisonPopups.push({
            id: nextPopupId(),
            side: targetSide,
            text: `-${mpLost} 内力`,
            style: 'mp',
          })
        }

        if (target.hp > 0 && stunProb > 0 && Math.random() < stunProb) {
          target.stunnedNextRound = true
          extraNotes.push('麻痹封脉（下回合禁出招）')
          poisonPopups.push({
            id: nextPopupId(),
            side: targetSide,
            text: '麻痹封脉！',
            style: 'special',
          })
        }

        roundEvents.push(
          makeLog(
            round,
            'special',
            `${actor.name}翻掌暗扣【${itemDef.name}】骤然施放！${target.name}猝不及防受奇毒侵脉（${extraNotes.join(
              ' · ',
            )}）！`,
          ),
        )
        flushBeat({
          kind: 'attack',
          actorSide,
          targetSide,
          bannerTitle: `奇毒 · ${itemDef.name}`,
          bannerSubtitle: extraNotes.join(' · '),
          vfxCategory: 'poison',
          isHeavenTier: itemDef.rarity === '天阶',
          shakeLevel: itemDef.rarity === '天阶' ? 2 : 1,
          popups: poisonPopups,
        })
        continue
      }

      const eff = itemDef.useEffect
      if (eff) {
        const notes: string[] = []
        const itemPopups: CombatFloatingPopup[] = []
        if (eff.maxHp) {
          actor.maxHp += eff.maxHp
          notes.push(`气血上限 +${eff.maxHp}`)
        }
        if (eff.maxMp) {
          actor.maxMp += eff.maxMp
          notes.push(`内力上限 +${eff.maxMp}`)
        }
        if (eff.agi) {
          actor.agility += eff.agi
          notes.push(`身法 +${eff.agi}`)
        }
        if (eff.res) {
          actor.res += eff.res
          notes.push(`抗性 +${eff.res}`)
        }
        if (eff.hp) {
          const before = actor.hp
          actor.hp = Math.min(actor.maxHp, actor.hp + eff.hp)
          const gainedHp = actor.hp - before
          notes.push(`气血 +${gainedHp}`)
          if (gainedHp > 0) {
            itemPopups.push({
              id: nextPopupId(),
              side: actorSide,
              text: `+${gainedHp}`,
              subText: '气血回春',
              style: 'heal',
            })
          }
        }
        if (eff.mp) {
          const before = actor.mp
          actor.mp = Math.min(actor.maxMp, actor.mp + eff.mp)
          const gainedMp = actor.mp - before
          notes.push(`内力 +${gainedMp}`)
          if (gainedMp > 0) {
            itemPopups.push({
              id: nextPopupId(),
              side: actorSide,
              text: `+${gainedMp} 内力`,
              style: 'mp',
            })
          }
        }
        if ((eff.res && eff.res >= 2) || itemDef.rarity === '天阶') {
          if (actor.slowTurns > 0 || actor.weakTurns > 0) {
            actor.slowTurns = 0
            actor.weakTurns = 0
            notes.push('涤除体内滞涩奇毒')
            itemPopups.push({
              id: nextPopupId(),
              side: actorSide,
              text: '百毒涤清！',
              style: 'special',
            })
          }
        }
        if (itemPopups.length === 0) {
          itemPopups.push({
            id: nextPopupId(),
            side: actorSide,
            text: itemDef.name,
            subText: '药力周流',
            style: 'heal',
          })
        }
        roundEvents.push(
          makeLog(
            round,
            'player',
            `${actor.name}探囊取服【${itemDef.name}】，药力化开周流百骸（${
              notes.length > 0 ? notes.join(' · ') : '神清气爽'
            }）！`,
          ),
        )
        flushBeat({
          kind: 'item',
          actorSide,
          bannerTitle: `服丹 · ${itemDef.name}`,
          bannerSubtitle: notes.join(' · ') || '药力周流百骸',
          vfxCategory: 'heal',
          popups: itemPopups,
        })
      }
      continue
    }

    if (choice.type !== 'move') {
      continue
    }

    // 处理【出招】
    const artId = actor.equippedArts[choice.slot]
    const art = artId ? MARTIAL_ART_DB_MAP[artId] : undefined
    if (!art) continue

    actor.lastUsedArtId = art.id
    if (actor.isPlayer && !actor.usedArtIdsHistory.includes(art.id)) {
      actor.usedArtIdsHistory.push(art.id)
    }

    const level = getLearnedLevel(actor.learnedArts, art.id)
    const { damage: moveDmg, kind, subTypeLabel } = getArtRawDamageAndKind(art, level)
    const moveVfx = mapArtCategoryToVfx(art.category)
    const actorNgFx = getSlotEffectsMap(actor, 'neigong')
    const targetNgFx = getSlotEffectsMap(target, 'neigong')
    const actorQgFx = getSlotEffectsMap(actor, 'qinggong')
    let moveFx = getSlotEffectsMap(actor, choice.slot)

    // 1. 扣除招式内力消耗
    const mpCost = computeMoveMpCost(actor, moveDmg)
    let lowMpMult = 1.0
    let mpNote = `耗内 ${mpCost}`
    if (actor.mp < mpCost) {
      actor.mp = 0
      lowMpMult = 0.6
      moveFx = {}
      mpNote = `内力枯竭强催招式（威力六折）`
    } else {
      actor.mp -= mpCost
    }

    // 暴雨梨花针拦截逃跑
    let escapeLockBonus = 0
    if (targetChoice.type === 'escape' && moveFx.baoyu_lock) {
      escapeLockBonus = moveFx.baoyu_lock / 100
      interruptedIds.add(target.id)
      roundEvents.push(
        makeLog(
          round,
          'special',
          `《${art.cleanName}》漫天寒星封死退路，当场截断${target.name}的逃跑企图！`,
        ),
      )
    }

    // 2. 后手/受击方闪避判定：clamp((守方身法 - 攻方身法)*35% + 守方身法*15%, 0%, 100%)
    const defAgi = computeEffectiveAgility(target)
    const isTargetDefending = targetChoice.type === 'defend'
    let dodgeChance = computeDodgeChancePreview(target, actor, isTargetDefending)
    const ignoreDodgePct =
      (moveFx.baihong_curve ?? (moveFx.baoyu_lock ? 50 : 0)) / 100
    dodgeChance = Math.max(0, Math.min(1, dodgeChance * (1 - ignoreDodgePct)))

    if (Math.random() < dodgeChance) {
      const qgId = target.equippedArts.qinggong
      const qgName = qgId && MARTIAL_ART_DB_MAP[qgId] ? `《${MARTIAL_ART_DB_MAP[qgId]!.cleanName}》` : '轻灵身法'
      roundEvents.push(
        makeLog(
          round,
          'dodge',
          `${actor.name}施展《${art.cleanName}》（${mpNote}），${target.name}展开${qgName}潇洒滑开，片叶不沾！（闪避率 ${Math.round(
            dodgeChance * 100,
          )}%）`,
        ),
      )
      flushBeat({
        kind: 'dodge',
        actorSide,
        targetSide,
        bannerTitle: `《${art.cleanName}》`,
        bannerSubtitle: `${target.name}展开${qgName}掠影闪开！`,
        vfxCategory: moveVfx,
        popups: [
          {
            id: nextPopupId(),
            side: targetSide,
            text: '掠影闪避！',
            subText: qgName,
            style: 'dodge',
          },
        ],
      })
      continue
    }

    // 独孤九剑看破打断检定
    let didInterruptMove = false
    if (targetChoice.type === 'move' && moveFx.dugu_interrupt) {
      const targetImmune = Boolean(targetNgFx.bahuang_dom && target.hp > actor.hp)
      if (!targetImmune && Math.random() < moveFx.dugu_interrupt / 100) {
        interruptedIds.add(target.id)
        didInterruptMove = true
        roundEvents.push(
          makeLog(
            round,
            'special',
            `《独孤九剑》直指招式破绽，一剑封喉逼得${target.name}变招回防，本回合攻势瓦解！`,
          ),
        )
      }
    }

    // 3. 计算攻方 AttackPower
    // 真气催劲乘区 = 1 + sqrt(攻方当前内力) / 50
    const qiDriveMult = 1 + Math.sqrt(Math.max(0, actor.mp)) / 50

    let ampPct = (actor.synergyBonusBySlot[choice.slot] ?? 0) / 100 + escapeLockBonus
    ampPct += (actorNgFx.taixuan_amp ?? 0) / 100
    ampPct += (actorNgFx.xiaowuxiang_amp ?? 0) / 100
    if (
      actorNgFx.longxiang_might &&
      ['拳掌', '刀法', '枪法', '棍棒'].includes(art.category)
    ) {
      ampPct += actorNgFx.longxiang_might / 100
    }
    if (actorNgFx.bahuang_dom && actor.hp > target.hp) {
      ampPct += actorNgFx.bahuang_dom / 100
    } else if (actorNgFx.bahuang_base) {
      ampPct += actorNgFx.bahuang_base / 100
    }
    if (actorNgFx.zixia_stack && actor.zixiaStacks > 0) {
      ampPct += (actorNgFx.zixia_stack * actor.zixiaStacks) / 100
    }
    if (actorQgFx.tiezhang_palm && art.category === '拳掌') {
      ampPct += actorQgFx.tiezhang_palm / 100
    }
    if (moveFx.anran_despair) {
      const lostTenPct = Math.floor(((actor.maxHp - actor.hp) / Math.max(1, actor.maxHp)) * 10)
      ampPct += (moveFx.anran_despair * Math.max(0, lostTenPct)) / 100
    }
    if (moveFx.xuantie_crush && actor.mp > target.mp) {
      ampPct += moveFx.xuantie_crush / 100
    }
    if (moveFx.yangjia_carbine && actor.hp < target.hp) {
      ampPct += moveFx.yangjia_carbine / 100
    }
    if (moveFx.hujia_gap && targetChoice.type === 'move') {
      ampPct += moveFx.hujia_gap / 100
    }
    if (moveFx.dagou_bonus && target.slowTurns > 0) {
      ampPct += moveFx.dagou_bonus / 100
    }
    if (moveFx.xiangmo_crush && isTargetDefending) {
      ampPct += moveFx.xiangmo_crush / 100
    }
    if (moveFx.zhemeishou_amp) {
      ampPct += (moveFx.zhemeishou_amp * actor.zhemeishouStacks) / 100
      actor.zhemeishouStacks = Math.min(5, actor.zhemeishouStacks + 1)
    }

    const weakMult = actor.weakTurns > 0 ? Math.max(0.3, 1 - actor.weakPct / 100) : 1.0
    const attackPower =
      (moveDmg + actor.equipAttack * 1.2) *
      qiDriveMult *
      (1 + ampPct) *
      lowMpMult *
      weakMult

    // 4. 计算守方护体 DefRaw
    let defRaw = 0
    if (kind === '物理') {
      defRaw = target.equipDefense * 1.5 + target.mp * 0.16 + defAgi * 1.5
    } else {
      const antiPoisonBoost =
        art.category === '毒功' || actorNgFx.beiming_drain || actorNgFx.huagong_burn
          ? (targetNgFx.xiantian_antipoison ?? 0) / 100
          : 0
      const effRes = target.res * (1 + antiPoisonBoost)
      defRaw = effRes * 5 + target.mp * 0.08
    }

    // 破甲计算
    let piercePct =
      Math.max(
        moveFx.liumai_pierce ?? 0,
        moveFx.canhe_pierce ?? 0,
        actorNgFx.jiuyin_pierce ?? 0,
      ) / 100
    if (actorNgFx.taixuan_pierce) {
      piercePct = Math.min(0.85, piercePct + actorNgFx.taixuan_pierce / 100)
    }
    const targetNgLv = getLearnedLevel(target.learnedArts, target.equippedArts.neigong)
    if (targetNgFx.jingang_phys_red && targetNgLv >= 10) {
      piercePct = 0
    }

    const effDef = Math.max(0, defRaw * (1 - piercePct))
    const mitigation = effDef / (effDef + 800)

    // 守方护体功法百分比减伤
    let specRed = 0
    if (kind === '物理' && targetNgFx.jingang_phys_red) {
      specRed += targetNgFx.jingang_phys_red / 100
    }
    if (kind === '奇门' && targetNgFx.xisui_ward) {
      specRed += targetNgFx.xisui_ward / 100
    } else if (kind === '物理' && targetNgFx.xisui_phys_red) {
      specRed += targetNgFx.xisui_phys_red / 100
    }
    if (targetNgFx.formless_qi_wall) {
      const wallMult = targetNgLv >= 10 ? 0.55 : 1.0
      specRed += (targetNgFx.formless_qi_wall * wallMult) / 100
    }
    if (targetNgFx.zixia_stack && target.zixiaStacks > 0) {
      specRed += (targetNgFx.zixia_stack * target.zixiaStacks) / 100
    }
    if (targetChoice.type === 'move') {
      const tMoveFx = getSlotEffectsMap(target, targetChoice.slot)
      if (tMoveFx.taiji_guard) {
        specRed += tMoveFx.taiji_guard / 100
      }
      if (tMoveFx.zhemeishou_red && target.zhemeishouStacks > 0) {
        specRed += (tMoveFx.zhemeishou_red * target.zhemeishouStacks) / 100
      }
    }
    specRed = Math.min(0.75, specRed)

    // 防御姿态系数
    let postureMult = isTargetDefending ? 0.5 : 1.0
    if (isTargetDefending && (moveFx.huoyan_pen || moveFx.qixian_sap)) {
      const penPct = (moveFx.huoyan_pen ?? 25) / 100
      postureMult = 0.5 + 0.5 * penPct
    }

    // 5. [0.5, 1.5] 正态分布随机检定
    const roll = sampleDamageRoll()
    let finalDmg = Math.max(
      1,
      Math.round(attackPower * (1 - mitigation) * (1 - specRed) * postureMult * roll.multiplier),
    )

    // 6. 斗转星移 / 金刚不坏反震
    let reboundDmg = 0
    let reboundLabel = ''
    if (targetNgFx.douzhuan_high) {
      const dzPct =
        target.mp >= actor.mp ? targetNgFx.douzhuan_high : (targetNgFx.douzhuan_low ?? 12)
      reboundDmg = Math.round(finalDmg * (dzPct / 100))
      finalDmg = Math.max(1, finalDmg - reboundDmg)
      reboundLabel = `《斗转星移》移星换斗（${dzPct}%）卸去并反击 ${reboundDmg} 点气血`
    } else if (isTargetDefending && kind === '物理' && targetNgFx.jingang_rebound) {
      reboundDmg = Math.round(finalDmg * (targetNgFx.jingang_rebound / 100))
      reboundLabel = `《金刚不坏体》不动明王震回 ${reboundDmg} 点气血`
    }

    // 火焰刀额外燥火内伤
    let burnExtra = 0
    if (moveFx.huoyan_burn) {
      const resMit = Math.min(0.75, target.res / 180)
      burnExtra = Math.max(1, Math.round(finalDmg * (moveFx.huoyan_burn / 100) * (1 - resMit)))
    }

    const totalTargetLoss = finalDmg + burnExtra
    target.hp = Math.max(0, target.hp - totalTargetLoss)
    if (reboundDmg > 0) {
      actor.hp = Math.max(0, actor.hp - reboundDmg)
    }

    const attackPopups: CombatFloatingPopup[] = [
      {
        id: nextPopupId(),
        side: targetSide,
        text: `-${totalTargetLoss}`,
        subText: roll.isCrit
          ? `暴击 · ${roll.tag}`
          : isTargetDefending
            ? '守御格挡'
            : burnExtra > 0
              ? `含灼脉 ${burnExtra}`
              : roll.tag,
        style: roll.isCrit ? 'crit' : isTargetDefending ? 'guard' : 'damage',
      },
    ]

    if (didInterruptMove) {
      attackPopups.push({
        id: nextPopupId(),
        side: targetSide,
        text: '破招瓦解！',
        subText: '独孤九剑',
        style: 'special',
      })
    }

    roundEvents.push(
      makeLog(
        round,
        roll.isCrit ? 'crit' : actor.isPlayer ? 'player' : 'enemy',
        `${actor.name}催动《${art.cleanName}》［${subTypeLabel}·${mpNote}］——【${roll.tag} ×${roll.multiplier.toFixed(
          2,
        )}】${roll.desc}，重创${target.name} ${finalDmg} 点气血${
          burnExtra > 0 ? `（另附燥火灼脉 ${burnExtra} 点）` : ''
        }！`,
      ),
    )

    if (reboundDmg > 0) {
      roundEvents.push(makeLog(round, 'special', `${target.name}运起${reboundLabel}！`))
      attackPopups.push({
        id: nextPopupId(),
        side: actorSide,
        text: `-${reboundDmg}`,
        subText: targetNgFx.douzhuan_high ? '斗转反击' : '金刚反震',
        style: 'special',
      })
    }

    // 玉女素心剑法：双剑合璧追击
    if (target.hp > 0 && moveFx.yunv_double && Math.random() < moveFx.yunv_double / 100) {
      const secondHit = Math.max(1, Math.round(finalDmg * 0.4))
      target.hp = Math.max(0, target.hp - secondHit)
      roundEvents.push(
        makeLog(
          round,
          'special',
          `《玉女素心剑法》双剑合璧紧随刺出第二剑，再伤${target.name} ${secondHit} 点气血！`,
        ),
      )
      attackPopups.push({
        id: nextPopupId(),
        side: targetSide,
        text: `-${secondHit}`,
        subText: '双剑合璧',
        style: 'special',
      })
    }

    // 7. 命中附加特效（吸内 / 化功 / 吸血 / 封穴震慑 / 绊缠）
    const wardScale = targetNgFx.xisui_ward ? Math.max(0.25, 1 - targetNgFx.xisui_ward / 100) : 1.0
    const targetControlImmune = Boolean(targetNgFx.bahuang_dom && target.hp > actor.hp)

    if (actorNgFx.beiming_drain && target.mp > 0) {
      const resFactor = Math.max(0.2, 1 - target.res / 150)
      const drained = Math.round(
        target.mp * (actorNgFx.beiming_drain / 100) * resFactor * wardScale,
      )
      if (drained > 0) {
        target.mp = Math.max(0, target.mp - drained)
        actor.mp = Math.min(actor.maxMp, actor.mp + drained)
        roundEvents.push(
          makeLog(
            round,
            'special',
            `${actor.name}《北冥神功》北冥纳海吸取${target.name} ${drained} 点真气纳为己用！`,
          ),
        )
        attackPopups.push({
          id: nextPopupId(),
          side: actorSide,
          text: `+${drained} 吸内`,
          subText: '北冥纳海',
          style: 'mp',
        })
      }
    }

    if (actorNgFx.huagong_burn && target.mp > 0) {
      const resFactor = Math.max(0.2, 1 - target.res / 180)
      const burned = Math.round(target.mp * (actorNgFx.huagong_burn / 100) * resFactor * wardScale)
      if (burned > 0) {
        target.mp = Math.max(0, target.mp - burned)
        roundEvents.push(
          makeLog(round, 'special', `${actor.name}《化功大法》奇毒焚散${target.name} ${burned} 点真气！`),
        )
        attackPopups.push({
          id: nextPopupId(),
          side: targetSide,
          text: `-${burned} 内力`,
          subText: '化功焚脉',
          style: 'debuff',
        })
      }
      if (actorNgFx.huagong_weak) {
        target.weakTurns = 2
        target.weakPct = Math.round(actorNgFx.huagong_weak * wardScale)
      }
    }

    if ((moveFx.taiji_sap || moveFx.qixian_sap) && target.mp > 0) {
      const sapPct = moveFx.taiji_sap ?? moveFx.qixian_sap ?? 5
      const sapped = Math.round(target.mp * (sapPct / 100) * wardScale)
      if (sapped > 0) {
        target.mp = Math.max(0, target.mp - sapped)
        roundEvents.push(
          makeLog(round, 'special', `无形气劲震散${target.name} ${sapped} 点护体真气！`),
        )
      }
    }

    if (moveFx.liuyang_leech) {
      const healed = Math.max(1, Math.round(finalDmg * (moveFx.liuyang_leech / 100)))
      actor.hp = Math.min(actor.maxHp, actor.hp + healed)
      actor.weakTurns = 0
      actor.stunnedNextRound = false
      roundEvents.push(
        makeLog(round, 'special', `${actor.name}《天山六阳掌》阴阳相济回血 ${healed} 点并涤荡体内滞气！`),
      )
      attackPopups.push({
        id: nextPopupId(),
        side: actorSide,
        text: `+${healed}`,
        subText: '阴阳回血',
        style: 'heal',
      })
    }

    if (!targetControlImmune && target.hp > 0) {
      if (moveFx.xianglong_stun && Math.random() < moveFx.xianglong_stun / 100) {
        target.stunnedNextRound = true
        roundEvents.push(
          makeLog(round, 'special', `亢龙有悔掌威浩荡！${target.name}气血翻涌受震慑，下回合无法出招！`),
        )
        attackPopups.push({
          id: nextPopupId(),
          side: targetSide,
          text: '亢龙震慑！',
          subText: '下合禁招',
          style: 'debuff',
        })
      } else if (moveFx.yiyang_seal && Math.random() < moveFx.yiyang_seal / 100) {
        target.stunnedNextRound = true
        roundEvents.push(
          makeLog(round, 'special', `《一阳指》纯阳指力点中要穴！${target.name}下回合无法出招！`),
        )
        attackPopups.push({
          id: nextPopupId(),
          side: targetSide,
          text: '点穴封脉！',
          subText: '下合禁招',
          style: 'debuff',
        })
      }
      if (moveFx.tanzhi_disarm && Math.random() < moveFx.tanzhi_disarm / 100) {
        target.disarmedNextRound = true
        roundEvents.push(
          makeLog(round, 'special', `《弹指神通》惊雷震腕！${target.name}下回合无法施展指法与暗器！`),
        )
        attackPopups.push({
          id: nextPopupId(),
          side: targetSide,
          text: '惊雷震腕！',
          style: 'debuff',
        })
      }
      if (moveFx.dagou_slow) {
        target.slowTurns = 2
        target.slowPct = Math.round(moveFx.dagou_slow * wardScale)
        roundEvents.push(
          makeLog(
            round,
            'special',
            `《打狗棒法》绊缠字诀缠住双足！${target.name}两回合内身法降低 ${target.slowPct}% 且无法逃跑！`,
          ),
        )
        attackPopups.push({
          id: nextPopupId(),
          side: targetSide,
          text: `绊缠 -${target.slowPct}%`,
          subText: '封锁脱战',
          style: 'debuff',
        })
      }
    }

    flushBeat({
      kind: 'attack',
      actorSide,
      targetSide,
      bannerTitle: `《${art.cleanName}》`,
      bannerSubtitle: `【${roll.tag} ×${roll.multiplier.toFixed(2)}】${subTypeLabel}`,
      vfxCategory: moveVfx,
      isHeavenTier: art.tier === '天阶',
      isCrit: roll.isCrit,
      isGuarded: isTargetDefending,
      shakeLevel: roll.isCrit ? 3 : art.tier === '天阶' ? 2 : 1,
      popups: attackPopups,
    })
  }

  // 回合末：九阴疗伤 / 先天功生生不息 & 状态回合递减
  const statusPopups: CombatFloatingPopup[] = []
  if (!escapedSuccess && player.hp > 0 && npc.hp > 0) {
    for (const f of [player, npc]) {
      const fSide: 'player' | 'npc' = f.isPlayer ? 'player' : 'npc'
      const ngFx = getSlotEffectsMap(f, 'neigong')
      if (ngFx.jiuyin_heal) {
        const heal = Math.max(1, Math.round((f.maxHp * ngFx.jiuyin_heal) / 100))
        f.hp = Math.min(f.maxHp, f.hp + heal)
        roundEvents.push(makeLog(round, 'special', `${f.name}《九阴真经》疗伤篇流转，回复 ${heal} 点气血。`))
        statusPopups.push({
          id: nextPopupId(),
          side: fSide,
          text: `+${heal}`,
          subText: '九阴疗伤',
          style: 'heal',
        })
      }
      if (ngFx.xiantian_hp || ngFx.xiantian_mp) {
        const hpGain = ngFx.xiantian_hp ? Math.max(1, Math.round((f.maxHp * ngFx.xiantian_hp) / 100)) : 0
        const mpGain = ngFx.xiantian_mp ? Math.max(1, Math.round((f.maxMp * ngFx.xiantian_mp) / 100)) : 0
        f.hp = Math.min(f.maxHp, f.hp + hpGain)
        f.mp = Math.min(f.maxMp, f.mp + mpGain)
        roundEvents.push(
          makeLog(
            round,
            'special',
            `${f.name}《先天功》生生不息吐纳，回复 ${hpGain} 气血、${mpGain} 内力。`,
          ),
        )
        statusPopups.push({
          id: nextPopupId(),
          side: fSide,
          text: `+${hpGain} 血 / +${mpGain} 内`,
          subText: '先天吐纳',
          style: 'heal',
        })
      }
      if (f.slowTurns > 0) f.slowTurns -= 1
      if (f.weakTurns > 0) f.weakTurns -= 1
    }
  }
  if (statusPopups.length > 0) {
    flushBeat({
      kind: 'status',
      bannerTitle: '周天吐纳 · 生生不息',
      bannerSubtitle: '上乘内功运转周天修复经脉',
      vfxCategory: 'heal',
      popups: statusPopups,
    })
  }

  // 判定胜负结果
  let outcome: CombatOutcome = 'ongoing'
  if (escapedSuccess) {
    outcome = 'escaped'
  } else if (player.hp <= 0 && npc.hp <= 0) {
    outcome = 'draw'
    roundEvents.push(
      makeLog(round, 'system', `双方拼至力竭同时收掌后退，此番交锋不分伯仲！`),
    )
  } else if (npc.hp <= 0) {
    outcome = 'player_win'
    roundEvents.push(
      makeLog(
        round,
        'system',
        `承让！${npc.name}气血见底拱手认输，少侠历经 ${round} 合拆招获胜！`,
      ),
    )
  } else if (player.hp <= 0) {
    outcome = 'npc_win'
    roundEvents.push(
      makeLog(
        round,
        'system',
        `少侠气血不支抱拳退让，${npc.name}收势颔首点到为止。`,
      ),
    )
  } else if (round >= session.maxRounds) {
    const pRatio = player.hp / Math.max(1, player.maxHp)
    const nRatio = npc.hp / Math.max(1, npc.maxHp)
    outcome = Math.abs(pRatio - nRatio) < 0.03 ? 'draw' : pRatio > nRatio ? 'player_win' : 'npc_win'
    roundEvents.push(
      makeLog(
        round,
        'system',
        `拆招已满 ${session.maxRounds} 合！按双方余留气血气度裁定：${
          outcome === 'player_win' ? '少侠略胜半筹' : outcome === 'npc_win' ? `${npc.name}技高一筹` : '秋色平分'
        }！`,
      ),
    )
  }

  if (outcome !== 'ongoing' && logCursor < roundEvents.length) {
    flushBeat({
      kind: 'end',
      actorSide: outcome === 'player_win' ? 'player' : outcome === 'npc_win' ? 'npc' : undefined,
      bannerTitle:
        outcome === 'player_win'
          ? '承让 · 武林凯旋'
          : outcome === 'draw'
            ? '秋色平分 · 不分伯仲'
            : outcome === 'escaped'
              ? '虚晃一招 · 飘然脱身'
              : '点到为止 · 抱拳退让',
      bannerSubtitle: `共历 ${round} 合拆招定音`,
      popups: [],
    })
  }

  return {
    ...session,
    round: outcome === 'ongoing' ? round + 1 : round,
    outcome,
    player,
    npc,
    logs: [...session.logs, ...roundEvents],
    lastRoundSummary: {
      round,
      playerChoiceLabel: pLabel,
      npcChoiceLabel: nLabel,
      firstMover,
      initialPlayerHp,
      initialPlayerMp,
      initialNpcHp,
      initialNpcMp,
      beats,
      events: roundEvents,
    },
  }
}
