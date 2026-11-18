import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_EQUIPPED_SLOTS, getEffectiveTalents } from '../../data/itemsDb'
import { QUEST_MAP } from '../../data/quests'
import { UNIQUE_ARTIFACT_MAP } from '../../data/gameDb'
import { extractSerializableState } from '../../store/storeHelpers'
import { useGameStore } from '../../store/useGameStore'
import {
  buildPlayerCombatant,
  COMBAT_EFFECT_REGISTRY,
  createCombatSession,
  createSeededRng,
  resolveCombatRound,
  setGameRng,
  type BeforeHitContext,
  type AfterHitContext,
} from '../combat'
import { getXiangguoMonthlyAuctionLots } from '../economy'
import { addItemToInventory } from '../shared/inventory'
import { getExpForArtLevel, syncArtLevelsToExpsAndMilestones } from '../stats/artsProgression'
import { cloneHeroBaseStats } from '../stats/heroStats'
import { WORLD_GRAPH } from '../world/mapMath'

const INITIAL_STATE = useGameStore.getState()

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
  setGameRng(createSeededRng(11))
})
afterEach(() => setGameRng(null))

function makeSession(playerHp = 3000) {
  const player = buildPlayerCombatant({
    playerName: '测试少侠',
    hp: playerHp,
    mp: 600,
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
  return createCombatSession({
    mode: 'spar',
    player,
    npcNode: {
      id: 'TEST-FIX',
      name: '木人桩',
      title: '陪练',
      realm: '三流中品',
      talk: '',
      stats: { hp: 9999, mp: 600, agi: 1, res: 10, isBenchmark: false },
    },
  })
}

describe('combat item usage', () => {
  it('a permanent elixir taken in combat also raises current 气血 and is reported as used', () => {
    const session = makeSession(500)
    session.enemies[0]!.stunnedNextRound = true
    session.npc = session.enemies[0]!
    const before = session.player.hp
    const next = resolveCombatRound(session, { type: 'item', itemId: 'ITM-MED-101' }, createSeededRng(3))
    expect(next.lastRoundSummary?.playerItemUsedId).toBe('ITM-MED-101')
    expect(next.player.hp).toBeGreaterThanOrEqual(before + 220)
  })

  it('an item is not reported as used when the hero is knocked out before acting', () => {
    let sawKnockout = false
    for (let seed = 1; seed <= 80 && !sawKnockout; seed += 1) {
      const session = makeSession(1)
      session.enemies[0]!.agility = 999
      session.npc = session.enemies[0]!
      const next = resolveCombatRound(session, { type: 'item', itemId: 'ITM-MED-121' }, createSeededRng(seed))
      if (next.player.hp <= 0) {
        sawKnockout = true
        expect(next.lastRoundSummary?.playerItemUsedId ?? null).toBeNull()
      }
    }
    expect(sawKnockout).toBe(true)
  })

  it('expired slow / weak debuffs clear their magnitude', () => {
    const session = makeSession()
    session.player.slowTurns = 1
    session.player.slowPct = 30
    session.player.weakTurns = 1
    session.player.weakPct = 25
    session.allies = [session.player]
    const next = resolveCombatRound(session, { type: 'defend' }, createSeededRng(5))
    expect(next.player.slowTurns).toBe(0)
    expect(next.player.slowPct).toBe(0)
    expect(next.player.weakPct).toBe(0)
  })
})

describe('tier-heaven effect fixes', () => {
  const beforeHit = (overrides: Partial<BeforeHitContext>) =>
    ({ specRed: 0, ...overrides }) as BeforeHitContext

  it('易筋经 no longer drops at its own 10th level; only 10重 attacks shave the wall', () => {
    const wall = COMBAT_EFFECT_REGISTRY.formless_qi_wall
    const vsLv5 = beforeHit({
      actor: { learnedArts: [{ artId: 'X', level: 5, exp: 0 }] } as never,
      art: { id: 'X' } as never,
      targetNgLv: 10,
    })
    wall.onBeforeHit!(45, vsLv5, 'target')
    expect(vsLv5.specRed).toBeCloseTo(0.45)
    const vsLv10 = beforeHit({
      actor: { learnedArts: [{ artId: 'X', level: 10, exp: 0 }] } as never,
      art: { id: 'X' } as never,
    })
    wall.onBeforeHit!(45, vsLv10, 'target')
    expect(vsLv10.specRed).toBeCloseTo(0.2475)
  })

  it('天山折梅手 stacks reduce damage even on rounds the defender does not use it', () => {
    const ctx = beforeHit({
      target: { zhemeishouStacks: 3 } as never,
      targetChoice: { type: 'defend' },
    })
    COMBAT_EFFECT_REGISTRY.zhemeishou_red.onBeforeHit!(5, ctx, 'target')
    expect(ctx.specRed).toBeCloseTo(0.15)
  })

  it('一阳指 purges the attacker’s poison on hit', () => {
    const actor = { name: '甲', poisonDotTurns: 2, poisonDotDmg: 30 }
    const ctx = {
      actor,
      target: { hp: 100, name: '乙' },
      targetControlImmune: false,
      controlTriggered: { stunOrSeal: false },
      rng: () => 0.99,
      pushLog: () => {},
      popups: [],
      nextPopupId: () => 'p',
    } as unknown as AfterHitContext
    COMBAT_EFFECT_REGISTRY.yiyang_seal.onAfterHit!(10, ctx, 'actor')
    expect(actor.poisonDotTurns).toBe(0)
    expect(actor.poisonDotDmg).toBe(0)
  })
})

describe('quest data', () => {
  it('no healPlayer effect uses fractional percentages', async () => {
    const bad: string[] = []
    const walk = (node: unknown, path: string) => {
      if (Array.isArray(node)) node.forEach((n, i) => walk(n, `${path}[${i}]`))
      else if (node && typeof node === 'object') {
        const o = node as Record<string, unknown>
        if (o.type === 'healPlayer') {
          for (const k of ['hpPct', 'mpPct'] as const) {
            const v = o[k]
            if (typeof v === 'number' && v > 0 && v < 5) bad.push(`${path}.${k}=${v}`)
          }
        }
        for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`)
      }
    }
    for (const q of Object.values(QUEST_MAP)) {
      walk(q, q.id)
      if (q.loadScenes) walk(await q.loadScenes(), `${q.id}:scenes`)
    }
    expect(bad).toEqual([])
  })
})

describe('talents and art requirements', () => {
  it('effective talents include accessory 颜值 and martial-art 根骨', () => {
    const talents = { 根骨: 50, 悟性: 50, 颜值: 50 }
    const eff = getEffectiveTalents(
      talents,
      { ...DEFAULT_EQUIPPED_SLOTS, accessory1: 'ACC-001' },
      { neigong: 'MA-001', qinggong: null, move1: null, move2: null, move3: null, move4: null },
      [{ artId: 'MA-001', level: 1, exp: 0 }],
    )
    expect(eff.颜值).toBe(56)
    expect(eff.根骨).toBe(52)
  })

  it('cannot equip a 天阶 art without meeting its stat requirements', () => {
    const s = useGameStore.getState()
    useGameStore.setState({
      learnedArts: [...s.learnedArts, { artId: 'MA-001', level: 1, exp: 0 }],
      baseStats: { ...s.baseStats, talents: { 根骨: 40, 悟性: 40, 颜值: 40 } },
    })
    const prev = useGameStore.getState().equippedArts.neigong
    useGameStore.getState().equipArtToSlot('MA-001', 'neigong')
    const after = useGameStore.getState()
    expect(after.equippedArts.neigong).toBe(prev)
    expect(after.actionFeedback?.text).toContain('未达门槛')
  })

  it('a book granting +1 level keeps the progress already earned inside the old level', () => {
    const base = cloneHeroBaseStats()
    const lv = 30
    base.skills['诗词'] = lv + 1
    const span = getExpForArtLevel(lv + 1) - getExpForArtLevel(lv)
    const prevExp = getExpForArtLevel(lv) + Math.floor(span * 0.9)
    const synced = syncArtLevelsToExpsAndMilestones({
      baseStats: base,
      artExps: { 诗词: prevExp },
      artMilestoneFlags: [],
      keysToSync: ['诗词'],
    })
    expect(synced.artExps['诗词']!).toBeGreaterThan(getExpForArtLevel(lv + 1))
    expect(synced.artExps['诗词']!).toBeLessThan(getExpForArtLevel(lv + 2))
  })
})

describe('economy & inventory', () => {
  it('auctions never offer owned unique artifacts and still fill several lots', () => {
    for (let y = 0; y < 30; y += 1) {
      const lots = getXiangguoMonthlyAuctionLots(y)
      expect(lots.length).toBeGreaterThanOrEqual(3)
      for (const lot of lots) expect(UNIQUE_ARTIFACT_MAP[lot.itemId]).toBeUndefined()
    }
  })

  it('auction lots top out at 地阶 and start at three times item value', () => {
    for (let y = 0; y < 30; y += 1) {
      for (const lot of getXiangguoMonthlyAuctionLots(y)) {
        expect(lot.item.rarity.startsWith('天')).toBe(false)
        expect(lot.estimatePrice).toBe(Math.round(lot.item.value * 3))
        expect(lot.finalPrice).toBe(lot.estimatePrice)
      }
    }
  })

  it('non-stackable items never stack past one copy', () => {
    let inv = addItemToInventory([], 'ITM-SCR-061', 1)
    inv = addItemToInventory(inv, 'ITM-SCR-061', 3)
    expect(inv).toEqual([{ itemId: 'ITM-SCR-061', qty: 1 }])
    let meds = addItemToInventory([], 'ITM-MED-121', 2)
    meds = addItemToInventory(meds, 'ITM-MED-121', 3)
    expect(meds).toEqual([{ itemId: 'ITM-MED-121', qty: 5 }])
  })
})

describe('restart & saving', () => {
  it('restarting after death fully resets world state but keeps save slots', () => {
    const slots = useGameStore.getState().saveSlots
    useGameStore.setState({
      roamingMasters: [],
      deadNpcIds: ['NPC-0122'],
      artExps: { 诗词: 9999 },
      birthplaceId: 'luoyang',
      gameOver: { reasonTitle: '', reasonDetail: '', killerName: '', songDate: '', locationName: '' },
    })
    useGameStore.getState().restartAfterGameOver()
    const s = useGameStore.getState()
    expect(s.roamingMasters).toHaveLength(WORLD_GRAPH.roamingMasters.length)
    expect(s.deadNpcIds).toEqual([])
    expect(s.artExps).toEqual({})
    expect(s.gameOver).toBeNull()
    expect(s.characterCreated).toBe(false)
    expect(s.saveSlots).toBe(slots)
  })

  it('saving mid-journey records the roadside position as a camp', () => {
    useGameStore.setState({ food: 10, viewMode: 'world' })
    useGameStore.getState().startJourney('luoyang')
    useGameStore.getState().stepTravelTick()
    useGameStore.getState().stepTravelTick()
    const st = useGameStore.getState()
    expect(st.traveling).not.toBeNull()
    const ser = extractSerializableState(st)
    expect(ser.campPos).not.toBeNull()
    expect([ser.campPos!.u, ser.campPos!.v]).toContain('luoyang')
  })
})
