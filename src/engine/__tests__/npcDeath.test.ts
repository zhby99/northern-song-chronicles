import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useGameStore } from '../../store/useGameStore'
import type { NodeNpc } from '../../types/game'
import { validateSaveEnvelope } from '../../utils/saveManager'
import { createSeededRng, setGameRng, type CombatOutcome, type DuelStakesKind } from '../combat'
import { NPCS_DB } from '../../data/gameDb'
import { npcFromDb } from '../npcFactory'
import { resolveQuestSceneAsync } from '../quest/sceneRegistry'
import { clonePlayerSectState, generateSectTournament, getSectContactNpcId } from '../sect'
import { countLivingNpcIds, filterLivingNpcs, isNpcDead, withNpcMarkedDead } from '../social/npcDeath'

const INITIAL_STATE = useGameStore.getState()
const DING = 'NPC-0122'

function settle(npc: NodeNpc, mode: 'spar' | 'duel', stakes: DuelStakesKind, outcome: CombatOutcome) {
  useGameStore.getState().startNpcCombat(npc, mode, stakes, true)
  const combat = useGameStore.getState().activeCombat
  expect(combat).not.toBeNull()
  useGameStore.setState({ activeCombat: { ...combat!, outcome } })
  useGameStore.getState().finishCombatSession()
  return useGameStore.getState()
}

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
  setGameRng(createSeededRng(4242))
})
afterEach(() => setGameRng(null))

describe('npcDeath helpers', () => {
  it('marks catalog NPCs dead idempotently and ignores unknown ids', () => {
    let dead = withNpcMarkedDead([], DING)
    dead = withNpcMarkedDead(dead, DING)
    dead = withNpcMarkedDead(dead, 'NOT-A-REAL-NPC')
    expect(dead).toEqual([DING])
    expect(isNpcDead(dead, DING)).toBe(true)
    expect(isNpcDead(dead, undefined)).toBe(false)
    expect(filterLivingNpcs([{ id: DING }, { id: 'NPC-0181' }], dead)).toEqual([{ id: 'NPC-0181' }])
    expect(countLivingNpcIds([DING, 'NPC-0181'], dead)).toBe(1)
  })

  it('hands sect affairs to the highest-ranked living member once the leader dies', () => {
    expect(getSectContactNpcId('SECT-19', [])).toBe(DING)
    const contact = getSectContactNpcId('SECT-19', [DING])
    expect(contact).not.toBeNull()
    expect(contact).not.toBe(DING)
  })

  it('never drafts a dead NPC into the sect tournament', () => {
    const t1 = generateSectTournament('SECT-05', 1, createSeededRng(3))!
    const victim = t1.opponents.find((o) => o.npcId)?.npcId
    expect(victim).toBeDefined()
    for (let seed = 1; seed <= 20; seed += 1) {
      const t = generateSectTournament('SECT-05', 1, createSeededRng(seed), [victim!])!
      expect(t.opponents.some((o) => o.npcId === victim)).toBe(false)
    }
  })
})

describe('NPC death in the store', () => {
  it('killing Ding Chunqiu in a life-or-death duel removes him from the world', () => {
    useGameStore.setState({ sectState: clonePlayerSectState({ sectId: 'SECT-19', rank: 4 }) })
    const ding = npcFromDb(DING)!
    const after = settle(ding, 'duel', 'duel', 'player_win')
    expect(after.deadNpcIds).toContain(DING)
    expect(after.sectState.rank).toBe(5)

    // 不可再交谈或交手
    useGameStore.getState().openNpcInteraction(ding)
    expect(useGameStore.getState().activeNpcInteraction).toBeNull()
    useGameStore.getState().startNpcCombat(ding, 'spar', 'spar', true)
    expect(useGameStore.getState().activeCombat).toBeNull()
  })

  it('sparring or losing does not kill anyone', () => {
    const ding = npcFromDb(DING)!
    expect(settle(ding, 'spar', 'spar', 'player_win').deadNpcIds).toEqual([])
    useGameStore.setState(INITIAL_STATE, true)
    expect(settle(ding, 'duel', 'duel', 'draw').deadNpcIds).toEqual([])
  })

  it('the markNpcsDead quest effect kills catalog NPCs and ignores unknown ids', () => {
    useGameStore
      .getState()
      .runQuestEffects([{ type: 'markNpcsDead', npcIds: ['NPC-0181', 'BOGUS', 'NPC-0181'] }])
    expect(useGameStore.getState().deadNpcIds).toEqual(['NPC-0181'])
  })

  it('dead NPCs survive a save roundtrip; unknown ids are dropped', () => {
    useGameStore.setState({ deadNpcIds: [DING] })
    const env = useGameStore.getState().buildSaveEnvelope('slot-1', '生死测试')
    const parsed = JSON.parse(JSON.stringify({ ...env, state: { ...env.state, deadNpcIds: [DING, 'BOGUS', 7] } }))
    const validated = validateSaveEnvelope(parsed)
    expect(validated?.state.deadNpcIds).toEqual([DING])
  })
})

describe('Taihang campaign finale', () => {
  it('kills only the Taihang wing of SECT-18; the Jingdong water-fortress wing survives', async () => {
    const scene = await resolveQuestSceneAsync(
      'scene_jtc3_36_blades_fall_eradicated',
      'QST-SECT-33-TAIHANG-CAMPAIGN-3',
    )
    expect(scene).not.toBeNull()
    const killEffect = scene!.onFinishEffects?.find((e) => e.type === 'markNpcsDead')
    expect(killEffect).toBeDefined()

    useGameStore.getState().runQuestEffects([killEffect!])
    const dead = useGameStore.getState().deadNpcIds
    const members = NPCS_DB.filter((n) => n.factionId === 'SECT-18')
    const deadMembers = members.filter((n) => dead.includes(n.id))
    const aliveMembers = members.filter((n) => !dead.includes(n.id))

    expect(deadMembers).toHaveLength(35)
    expect(aliveMembers).toHaveLength(10)
    // 太行渠魁伏诛，京东水寨头领在世
    for (const id of ['NPC-0142', 'NPC-0229']) expect(dead).toContain(id)
    for (const id of ['NPC-0180', 'NPC-0230']) expect(dead).not.toContain(id)
    // 身份写明太行者一律身故，写明京东者一律在世
    expect(members.filter((n) => n.role.includes('太行')).every((n) => dead.includes(n.id))).toBe(true)
    expect(aliveMembers.some((n) => n.role.includes('太行'))).toBe(false)
    expect(members.filter((n) => n.role.includes('京东')).some((n) => dead.includes(n.id))).toBe(false)
    // 名单只涉及绿林盟成员
    expect(dead.every((id) => members.some((m) => m.id === id))).toBe(true)
    // 绿林盟由在世的京东一支代掌门派事务
    const contact = getSectContactNpcId('SECT-18', dead)
    expect(aliveMembers.map((n) => n.id)).toContain(contact)
  })
})
