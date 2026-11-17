import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ITEMS_DB } from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import type {
  ActiveEscortContract,
  ActiveLiaoSpyMission,
  NodeNpc,
} from '../../types/game'
import {
  createSeededRng,
  resolveCombatRound,
  setGameRng,
  type CombatOutcome,
  type DuelStakesKind,
} from '../combat'
import { npcFromDb } from '../npcFactory'
import { clonePlayerSectState, generateSectTournament } from '../sect'

const INITIAL_STATE = useGameStore.getState()

const DUMMY_NPC: NodeNpc = {
  id: 'TEST-SETTLE',
  name: '结算木人',
  title: '陪练',
  realm: '三流中品',
  talk: '“请赐教！”',
  stats: { hp: 800, mp: 200, agi: 20, res: 10, isBenchmark: false },
}

/** 开战后直接改写战果并走完 finishCombatSession 的完整 store 结算 */
function settleCombat(
  npc: NodeNpc,
  mode: 'spar' | 'duel',
  stakes: DuelStakesKind,
  outcome: CombatOutcome,
) {
  useGameStore.getState().startNpcCombat(npc, mode, stakes, true)
  const combat = useGameStore.getState().activeCombat
  expect(combat).not.toBeNull()
  useGameStore.setState({ activeCombat: { ...combat!, outcome } })
  useGameStore.getState().finishCombatSession()
  return useGameStore.getState()
}

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
  setGameRng(createSeededRng(20250101))
})

afterEach(() => {
  setGameRng(null)
})

describe('finishCombatSession settlement registry (store level)', () => {
  it('duel defeat produces the stakes-specific game-over text', () => {
    const after = settleCombat(DUMMY_NPC, 'duel', 'kaifeng_warrant', 'npc_win')
    expect(after.gameOver?.reasonTitle).toBe('缉盗失手 · 血溅街巷')
    expect(after.gameOver?.reasonDetail).toContain('结算木人')
    expect(after.activeCombat).toBeNull()
    expect(after.hp).toBe(0)
  })

  it('generic duel defeat falls back to the default game-over text', () => {
    const after = settleCombat(DUMMY_NPC, 'duel', 'duel', 'npc_win')
    expect(after.gameOver?.reasonTitle).toBe('命陨江湖 · 侠踪绝响')
  })

  it('Changshan anti-Liao spy victory grants merit + bounty and clears the order', () => {
    const before = useGameStore.getState()
    useGameStore.setState({
      sectState: {
        ...clonePlayerSectState({ sectId: 'SECT-22', rank: 2, contribution: 10 }),
        changshanMissedCount: 1,
        activeLiaoSpy: { name: '结算木人' } as unknown as ActiveLiaoSpyMission,
      },
    })
    const after = settleCombat(DUMMY_NPC, 'duel', 'liao_spy_duel', 'player_win')
    expect(after.sectState.activeLiaoSpy).toBeNull()
    expect(after.sectState.changshanMissedCount).toBe(0)
    expect(after.sectState.contribution).toBe(110)
    expect(after.silver).toBeGreaterThanOrEqual(before.silver + 50)
    expect(after.logs[0]?.tag).toBe('燕云锄奸')
  })

  it('escaping an escort ambush abandons the contract', () => {
    useGameStore.setState({
      activeEscortContract: {
        id: 'E1',
        cargoName: '蜀锦',
        destName: '洛阳府',
      } as unknown as ActiveEscortContract,
    })
    const after = settleCombat(DUMMY_NPC, 'spar', 'escort_ambush', 'escaped')
    expect(after.activeEscortContract).toBeNull()
    expect(after.logs[0]?.tag).toBe('弃镖脱身')
  })

  it('winning a sect-tournament round advances and immediately starts the next bout', () => {
    const tourney = generateSectTournament('SECT-05', 1, createSeededRng(7))
    expect(tourney).not.toBeNull()
    useGameStore.setState({
      sectState: {
        ...clonePlayerSectState({ sectId: 'SECT-05', rank: 1 }),
        activeSectTournament: tourney,
      },
    })
    const after = settleCombat(DUMMY_NPC, 'spar', 'sect_tournament', 'player_win')
    expect(after.sectState.activeSectTournament?.round).toBe(2)
    expect(after.activeCombat?.duelStakes).toBe('sect_tournament')
    expect(after.activeCombat?.outcome).toBe('ongoing')
  })

  it('killing the Xingxiu leader in a life-or-death duel promotes a rank-4 disciple to leader', () => {
    const leader = npcFromDb('NPC-0122')
    expect(leader).not.toBeNull()
    useGameStore.setState({
      sectState: clonePlayerSectState({ sectId: 'SECT-19', rank: 4 }),
    })
    const after = settleCombat(leader!, 'duel', 'duel', 'player_win')
    expect(after.sectState.killedDingChunqiu).toBe(true)
    expect(after.sectState.rank).toBe(5)
    expect(after.logs[0]?.tag).toBe('弑师夺位')
  })
})

describe('data-driven poison items', () => {
  it('every combat poison declares structured poisonCombat numbers', () => {
    const poisons = ITEMS_DB.filter((it) => it.poisonEffect)
    expect(poisons.length).toBeGreaterThan(0)
    for (const it of poisons) {
      expect(it.poisonCombat, it.id).toBeDefined()
      expect(it.poisonCombat!.damage, it.id).toBeGreaterThan(0)
    }
  })
})

describe('global game rng', () => {
  it('setGameRng makes default-rng combat rounds reproducible', () => {
    useGameStore.getState().startNpcCombat(DUMMY_NPC, 'spar', 'spar', true)
    const session = useGameStore.getState().activeCombat!
    const run = () => {
      setGameRng(createSeededRng(99))
      const next = resolveCombatRound(structuredClone(session), { type: 'defend' })
      return next.logs.map((l) => l.text)
    }
    expect(run()).toEqual(run())
  })
})
