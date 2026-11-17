import { describe, expect, it } from 'vitest'
import { MARTIAL_ARTS_DB } from '../../data/gameDb'
import { DEFAULT_EQUIPPED_SLOTS } from '../../data/itemsDb'
import { cloneHeroBaseStats } from '../../utils/heroStats'
import {
  COMBAT_EFFECT_REGISTRY,
  buildPlayerCombatant,
  canFighterEscape,
  computeDodgeChancePreview,
  computeEffectiveAgility,
  createCombatSession,
  createSeededRng,
  getMartialCategoryInstinct,
  resolveCombatRound,
} from '../../utils/combatEngine'

function makeTestPlayer(overrides: Partial<ReturnType<typeof buildPlayerCombatant>> = {}) {
  const base = buildPlayerCombatant({
    playerName: '测试少侠',
    hp: 600,
    mp: 300,
    baseStats: cloneHeroBaseStats(),
    equipped: { ...DEFAULT_EQUIPPED_SLOTS },
    equippedArts: {
      neigong: 'MA-179',
      qinggong: 'MA-177',
      move1: 'MA-182',
      move2: 'MA-187',
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-179', level: 5, exp: 0 },
      { artId: 'MA-177', level: 5, exp: 0 },
      { artId: 'MA-182', level: 5, exp: 0 },
      { artId: 'MA-187', level: 5, exp: 0 },
    ],
  })
  return { ...base, ...overrides }
}

describe('combatEngine formulas & P0 tactical rules', () => {
  it('computes effective agility with slow debuffs and Kuihua haste', () => {
    const f = makeTestPlayer({ agility: 100 })
    expect(computeEffectiveAgility(f)).toBe(100)

    const slowed = { ...f, slowTurns: 2, slowPct: 25 }
    expect(computeEffectiveAgility(slowed)).toBe(75)
  })

  it('enforces escape restrictions by stakes, slow status, and agility gap >= 20', () => {
    const hero = makeTestPlayer({ agility: 50 })
    const fastEnemy = makeTestPlayer({ unitId: 'enemy-0', team: 'enemy', isPlayer: false, agility: 70 })
    const closeEnemy = { ...fastEnemy, agility: 65 }

    expect(canFighterEscape(hero, closeEnemy, 'spar').allowed).toBe(true)
    expect(canFighterEscape(hero, fastEnemy, 'spar').allowed).toBe(false)
    expect(canFighterEscape(hero, closeEnemy, 'zhan_zhao_arrest').allowed).toBe(false)
    expect(canFighterEscape(hero, closeEnemy, 'liao_spy_duel').allowed).toBe(false)
    expect(canFighterEscape({ ...hero, slowTurns: 1 }, closeEnemy, 'spar').allowed).toBe(false)
  })

  it('caps base agility dodge at 35% and halves dodge when exposed', () => {
    const defender = makeTestPlayer({ agility: 300, equippedArts: { neigong: null, qinggong: null, move1: null, move2: null, move3: null, move4: null } })
    const attacker = makeTestPlayer({ agility: 10, equippedArts: { neigong: null, qinggong: null, move1: null, move2: null, move3: null, move4: null } })

    const baseDodge = computeDodgeChancePreview(defender, attacker, false)
    expect(baseDodge).toBe(0.35)

    const exposedDodge = computeDodgeChancePreview({ ...defender, exposed: true }, attacker, false)
    expect(exposedDodge).toBeCloseTo(0.175, 5)
  })

  it('returns martial category instincts and resolves guard MP recovery / exposed debuff', () => {
    expect(getMartialCategoryInstinct('刀法')?.shortTag).toBe('破守+30%')
    expect(getMartialCategoryInstinct('剑法')?.shortTag).toBe('先手+10')
    expect(getMartialCategoryInstinct('暗器')?.shortTag).toBe('无视30%闪')
    expect(getMartialCategoryInstinct('毒功')?.shortTag).toBe('持续蚀血')
    expect(getMartialCategoryInstinct('音功')?.shortTag).toBe('削减内力')
    expect(getMartialCategoryInstinct('枪法')?.shortTag).toBe('后手+20%')

    const player = makeTestPlayer({ hp: 1000, maxHp: 1000, mp: 100, maxMp: 500 })
    const session = createCombatSession({
      mode: 'spar',
      player,
      npcNode: {
        id: 'TEST-ENEMY',
        name: '木人桩对手',
        title: '陪练',
        realm: '三流中品',
        talk: '“请赐教！”',
        stats: { hp: 1200, mp: 300, agi: 25, res: 15, isBenchmark: false },
      },
    })

    const next = resolveCombatRound(session, { type: 'defend' }, createSeededRng(1050))
    expect(next.round).toBe(2)
    expect(next.player.mp).toBeGreaterThanOrEqual(150)
  })

  it('produces 100% deterministic snapshots when given identical seeded RNGs', () => {
    const player = makeTestPlayer({ hp: 1000, maxHp: 1000, mp: 400, maxMp: 500 })
    const baseSession = createCombatSession({
      mode: 'spar',
      player,
      npcNode: {
        id: 'TEST-ENEMY-RNG',
        name: '铜人桩',
        title: '机关',
        realm: '二流下品',
        talk: '“试招！”',
        stats: { hp: 1400, mp: 400, agi: 60, res: 30, isBenchmark: false },
      },
    })

    let runA = baseSession
    let runB = baseSession
    const rngA = createSeededRng(20261050)
    const rngB = createSeededRng(20261050)
    const actions = [
      { type: 'move' as const, slot: 'move1' as const },
      { type: 'defend' as const },
      { type: 'move' as const, slot: 'move2' as const },
    ]
    for (const act of actions) {
      runA = resolveCombatRound(runA, act, rngA)
      runB = resolveCombatRound(runB, act, rngB)
    }

    expect(runA.player.hp).toBe(runB.player.hp)
    expect(runA.player.mp).toBe(runB.player.mp)
    expect(runA.npc.hp).toBe(runB.npc.hp)
    expect(runA.logs).toEqual(runB.logs)
  })

  it('registers every specialEffect key from MARTIAL_ARTS_DB in COMBAT_EFFECT_REGISTRY', () => {
    const missing: string[] = []
    for (const art of MARTIAL_ARTS_DB) {
      for (const lvl of art.levels ?? []) {
        for (const fx of lvl.specialEffects ?? []) {
          if (!(fx.id in COMBAT_EFFECT_REGISTRY)) {
            missing.push(`${art.id}@L${lvl.level}:${fx.id}`)
          }
        }
      }
    }
    expect(missing).toEqual([])
  })
})

describe('one-shot control flags (stun / seal / disarm)', () => {
  it('a stunned NPC cannot attack on the following round', () => {
    const player = makeTestPlayer({ hp: 6000, maxHp: 6000 })
    const session = createCombatSession({
      mode: 'spar',
      player,
      npcNode: {
        id: 'TEST-STUN',
        name: '受震木人',
        title: '陪练',
        realm: '三流中品',
        talk: '“请赐教！”',
        stats: { hp: 99999, mp: 3000, agi: 25, res: 15, isBenchmark: false },
      },
    })
    session.enemies[0]!.stunnedNextRound = true
    session.npc = session.enemies[0]!
    for (let seed = 1; seed <= 30; seed += 1) {
      const next = resolveCombatRound(structuredClone(session), { type: 'defend' }, createSeededRng(seed))
      expect(next.logs.some((l) => l.text.includes('受震木人催动'))).toBe(false)
      expect(next.enemies[0]!.stunnedNextRound).toBe(false)
    }
  })
})
