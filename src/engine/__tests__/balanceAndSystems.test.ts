import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../data/itemsDb'
import { QUEST_REGISTRY } from '../../data/quests'
import { SPOT_SHOPS } from '../../data/spotShops'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import type { QuestCondition } from '../../types/quest'
import { applyCombatSettlementRules } from '../combat/settlement'
import {
  buildPlayerCombatant,
  COMBAT_ITEM_USE_LIMIT,
  createCombatSession,
  createSeededRng,
  getMartialCategoryInstinct,
  resolveCombatRound,
  setGameRng,
} from '../combat'
import { effectsOpenModal, findMatchingLocationTriggers } from '../questEngine'
import {
  buildJoinSectPatch,
  clonePlayerSectState,
  getSectEntryQuestBlockReason,
  SECT_ENTRY_TRANSFER_SOURCES,
} from '../sect'
import { calcDailyExpByCategory, cloneHeroBaseStats } from '../stats/heroStats'
import { getRidingTerrainCoeff } from '../world/mapMath'
import {
  buildNodeNpcFromYamenBounty,
  getYamenBountyPostings,
} from '../world/yamenBounty'

const INITIAL_STATE = useGameStore.getState()

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
  setGameRng(createSeededRng(17))
})
afterEach(() => setGameRng(null))

function makeSession(overrides?: { npcAgi?: number }) {
  const player = buildPlayerCombatant({
    playerName: '测试少侠',
    hp: 3000,
    mp: 600,
    baseStats: cloneHeroBaseStats(),
    equipped: { ...DEFAULT_EQUIPPED_SLOTS },
    equippedArts: {
      neigong: 'MA-179',
      qinggong: 'MA-177',
      move1: 'MA-182',
      move2: null,
      move3: null,
      move4: null,
    },
    learnedArts: [
      { artId: 'MA-179', level: 5, exp: 0 },
      { artId: 'MA-177', level: 5, exp: 0 },
      { artId: 'MA-182', level: 5, exp: 0 },
    ],
  })
  return createCombatSession({
    mode: 'spar',
    player,
    npcNode: {
      id: 'TEST-SYS',
      name: '木人桩',
      title: '陪练',
      realm: '三流中品',
      talk: '',
      stats: { hp: 9999, mp: 600, agi: overrides?.npcAgi ?? 1, res: 10, isBenchmark: false },
    },
  })
}

describe('character growth tuning', () => {
  it('uses the 0.35 + 3.65·(T/100)^3 cultivation curve', () => {
    const at = (t: number) => calcDailyExpByCategory(true, { 根骨: t, 悟性: t, 颜值: 50 })
    expect(at(100)).toBe(400)
    expect(at(90)).toBe(301)
    expect(at(50)).toBe(81)
  })

  it('骑术 eases 塞外 / 蜀道 slowdown only while mounted', () => {
    expect(getRidingTerrainCoeff('mountain', 100, true)).toBeCloseTo(1.24)
    expect(getRidingTerrainCoeff('steppe', 100, true)).toBeCloseTo(1.08)
    expect(getRidingTerrainCoeff('steppe', 50, true)).toBeCloseTo(1.14)
    expect(getRidingTerrainCoeff('mountain', 100, false)).toBeCloseTo(1.6)
    expect(getRidingTerrainCoeff('official', 100, true)).toBe(1)
  })

  it('拳掌 now has a category instinct', () => {
    expect(getMartialCategoryInstinct('拳掌')?.shortTag).toContain('透甲')
  })
})

describe('combat item rules', () => {
  it('using an item keeps the no-repeat lock on the last move', () => {
    const session = makeSession()
    session.player.lastUsedArtId = 'MA-182'
    const next = resolveCombatRound(session, { type: 'item', itemId: 'ITM-MED-121' }, createSeededRng(4))
    expect(next.lastRoundSummary?.playerItemUsedId).toBe('ITM-MED-121')
    expect(next.player.lastUsedArtId).toBe('MA-182')
    expect(next.player.itemUses).toBe(1)
  })

  it(`caps items at ${COMBAT_ITEM_USE_LIMIT} per fight`, () => {
    const session = makeSession()
    session.player.itemUses = COMBAT_ITEM_USE_LIMIT
    const next = resolveCombatRound(session, { type: 'item', itemId: 'ITM-MED-121' }, createSeededRng(4))
    expect(next.lastRoundSummary?.playerItemUsedId ?? null).toBeNull()
    expect(next.player.itemUses).toBe(COMBAT_ITEM_USE_LIMIT)
  })

  it('thrown poison can be dodged by a nimble enemy', () => {
    let dodged = 0
    for (let seed = 1; seed <= 40; seed += 1) {
      const session = makeSession({ npcAgi: 200 })
      const hpBefore = session.npc.hp
      const next = resolveCombatRound(session, { type: 'item', itemId: 'ITM-MED-130' }, createSeededRng(seed))
      expect(next.lastRoundSummary?.playerItemUsedId).toBe('ITM-MED-130')
      if (next.npc.slowTurns === 0 && next.npc.hp >= hpBefore - 0) dodged += 1
    }
    expect(dodged).toBeGreaterThan(0)
  })
})

describe('common manuals in shops', () => {
  it('every 凡品 manual ITM-SCR-061..080 is sold somewhere', () => {
    const sold = new Set(SPOT_SHOPS.flatMap((s) => s.items.map((i) => i.itemId)))
    for (let n = 61; n <= 80; n += 1) {
      expect(sold.has(`ITM-SCR-0${n}`)).toBe(true)
    }
  })
})

describe('yamen bounty board', () => {
  it('posts three graded bounties per city per month and hides solved ones', () => {
    const postings = getYamenBountyPostings({ issueRegionId: 'luoyang', dayCount: 40 })
    expect(postings.map((p) => p.grade)).toEqual([1, 2, 3])
    expect(getYamenBountyPostings({ issueRegionId: 'luoyang', dayCount: 40 })).toEqual(postings)
    const after = getYamenBountyPostings({
      issueRegionId: 'luoyang',
      dayCount: 40,
      doneIds: [postings[0]!.id],
    })
    expect(after.map((p) => p.grade)).toEqual([2, 3])
  })

  it('a sect-less hero can take a bounty at the yamen and is paid on capture', () => {
    useGameStore.setState({
      currentNodeId: 'luoyang',
      activeRegionId: 'luoyang',
      viewMode: 'region',
      selectedBuildingId: 'luoyang_base_yamen',
      activeBuildingInteriorId: null,
    })
    const posting = getYamenBountyPostings({ issueRegionId: 'luoyang', dayCount: 1 })[0]!
    useGameStore.getState().acceptYamenBounty(posting.id)
    const s = useGameStore.getState()
    expect(s.activeYamenBounty?.id).toBe(posting.id)

    const session = makeSession()
    session.targetNpcNode = buildNodeNpcFromYamenBounty(s.activeYamenBounty!)
    session.duelStakes = 'yamen_bounty'
    session.outcome = 'player_win'
    const d = applyCombatSettlementRules(
      {
        silver: 10,
        inventory: [],
        sectState: clonePlayerSectState(s.sectState),
        questState: s.questState,
        combatExp: 0,
        chivalry: 0,
        escortContract: null,
        yamenBounty: s.activeYamenBounty,
        yamenBountyDoneIds: [],
        hp: 100,
        mp: 100,
        logTag: '',
        logText: '',
        triggerKaifengZhanZhao: false,
        nextTournamentOpponent: null,
        deadNpcIds: [],
      },
      {
        session,
        res: { combatExpGain: 20, derived: { skills: {}, maxHp: 1000, maxMp: 500 } },
        qHook: null,
        dbTarget: null,
        activeRegionId: 'luoyang',
        activeEscortContract: null,
      },
    )
    expect(d.yamenBounty).toBeNull()
    expect(d.yamenBountyDoneIds).toEqual([posting.id])
    expect(d.silver).toBe(10 + posting.rewardSilver)
    expect(d.combatExp).toBe(posting.rewardCombatExp)
    expect(d.chivalry).toBe(posting.rewardChivalry)
  })
})

describe('sect exclusivity', () => {
  it('a quest finale cannot silently overwrite an existing sect', () => {
    const base = useGameStore.getState()
    const res = buildJoinSectPatch({
      sectId: 'SECT-19',
      dayCount: 10,
      silver: 0,
      inventory: [],
      sectState: clonePlayerSectState({ sectId: 'SECT-01', rank: 1 }),
      questState: base.questState,
    })
    expect(res.ok).toBe(false)
    expect(res.errorReason).toContain('不可二门兼投')
  })

  it('other sects’ entry lines stop while the hero belongs to a sect or is a Shaolin novice', () => {
    const inShaolin = clonePlayerSectState({ sectId: 'SECT-01', rank: 1 })
    expect(getSectEntryQuestBlockReason('QST-SECT-19-ENTRY', inShaolin)).not.toBeNull()
    expect(getSectEntryQuestBlockReason('QST-SECT-01-ENTRY', inShaolin)).toBeNull()
    const novice = clonePlayerSectState({ shaolinNoviceState: 'active' })
    expect(getSectEntryQuestBlockReason('QST-SECT-05-ENTRY', novice)).not.toBeNull()
    // 设计内的带艺投师：陇右金环刀堂弟子可走华山入门线
    const jinhuan = clonePlayerSectState({ sectId: 'SECT-28', rank: 2 })
    expect(getSectEntryQuestBlockReason('QST-SECT-05-ENTRY', jinhuan)).toBeNull()
  })

  it('transfer sources match the quests’ own notInAnySect exceptions', () => {
    const found: Record<string, Set<string>> = {}
    const walk = (c: QuestCondition | undefined, sectId: string) => {
      if (!c) return
      if (c.type === 'notInAnySect' && c.allowTransferFromSectId) {
        ;(found[sectId] ??= new Set()).add(c.allowTransferFromSectId)
      }
      if (c.type === 'all' || c.type === 'any') c.conditions.forEach((x) => walk(x, sectId))
      if (c.type === 'not') walk(c.condition, sectId)
    }
    for (const q of QUEST_REGISTRY) {
      const m = /^QST-(SECT-\d+)-ENTRY$/.exec(q.id)
      if (!m) continue
      for (const t of q.locationTriggers ?? []) walk(t.condition, m[1]!)
      for (const a of q.spotActions ?? []) {
        walk(a.visibleWhen, m[1]!)
        walk(a.enabledWhen, m[1]!)
      }
    }
    for (const [sectId, sources] of Object.entries(found)) {
      expect([...sources].sort()).toEqual([...(SECT_ENTRY_TRANSFER_SOURCES[sectId] ?? [])].sort())
    }
  })

  it('entry-line location triggers do not fire for members of another sect', () => {
    useGameStore.setState({
      sectState: clonePlayerSectState({ sectId: 'SECT-01', rank: 1 }),
      silver: 1,
    })
    const ctx = buildStoreEvalContext(useGameStore.getState())
    const matched = findMatchingLocationTriggers({ regionId: 'changan' }, ctx)
    expect(matched.some((m) => m.quest.id === 'QST-SECT-05-ENTRY')).toBe(false)
  })
})

describe('quest triggers and story combat', () => {
  it('only one scene-opening trigger fires per visit; the other keeps its once-flag', () => {
    const s = useGameStore.getState()
    const qs = s.questState
    useGameStore.setState({
      questState: {
        ...qs,
        activeQuests: {
          ...qs.activeQuests,
          'QST-SECT-14-ENTRY': {
            questId: 'QST-SECT-14-ENTRY',
            stepId: 'chengdu_teahouse_errand',
            startedDay: 1,
            deadlineDay: null,
            vars: {},
          },
        },
      },
    })
    const loc = { regionId: 'chengdu', buildingId: 'cd_teahouse' }
    const matched = findMatchingLocationTriggers(loc, buildStoreEvalContext(useGameStore.getState()))
    expect(matched.filter((m) => effectsOpenModal(m.trigger.effects)).length).toBeGreaterThanOrEqual(2)

    useGameStore.getState().fireLocationTriggersForCurrentSpot(loc)
    const after = findMatchingLocationTriggers(loc, buildStoreEvalContext(useGameStore.getState()))
    // 被顺延的那条触发器仍可在下次到访时触发
    expect(after.length).toBeGreaterThanOrEqual(1)
  })

  it('effectsOpenModal sees scenes nested in branches', () => {
    expect(
      effectsOpenModal([
        {
          type: 'branch',
          condition: { type: 'flag', flag: 'x', op: 'truthy' },
          thenEffects: [],
          elseEffects: [{ type: 'openScene', sceneId: 'a' }],
        },
      ]),
    ).toBe(true)
    expect(effectsOpenModal([{ type: 'giveSilver', amount: 1 }])).toBe(false)
  })

  it('quest spars without an escape branch lock escaping', () => {
    useGameStore.getState().runQuestEffects(
      [
        {
          type: 'startCombat',
          opponent: {
            kind: 'custom',
            npc: {
              id: 'TEST-QS',
              name: '陪练',
              title: '',
              realm: '三流中品',
              talk: '',
              stats: { hp: 500, mp: 100, agi: 10, res: 5, isBenchmark: false },
            },
          },
          rule: 'spar',
          onWin: [],
        },
      ],
      null,
    )
    expect(useGameStore.getState().activeCombat?.forbidEscapeReason).toBeTruthy()
  })

  it('Taihang part-3 key battles are retryable instead of dead-code retries', async () => {
    const q = QUEST_REGISTRY.find((x) => x.id === 'QST-SECT-33-TAIHANG-CAMPAIGN-3')!
    const scenes = (await q.loadScenes!()) as Record<string, { choices?: Array<{ effects: unknown[] }> }>
    const combats: Array<{ rule: string; onLose?: unknown[] }> = []
    for (const sc of Object.values(scenes)) {
      for (const ch of sc.choices ?? []) {
        for (const e of ch.effects as Array<{ type: string; rule: string; onLose?: unknown[] }>) {
          if (e.type === 'startCombat') combats.push(e)
        }
      }
    }
    for (const c of combats) {
      if (c.onLose && c.onLose.length > 0) expect(c.rule).not.toBe('duel')
    }
  })
})
