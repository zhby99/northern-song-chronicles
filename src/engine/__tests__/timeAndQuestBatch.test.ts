import { describe, expect, it, vi } from 'vitest'
import { createInitialStoreData } from '../../store/storeHelpers'
import type { GameStoreState } from '../../store/storeTypes'
import { createSeededRng } from '../combat/rng'
import { executeQuestEffectsBatch } from '../quest/effectHandlers'
import { buildJoinSectPatch, getSectRule } from '../sect'
import {
  computeTimeAdvanceState,
  tickMartialArtSession,
  tickTenArtSession,
} from '../time'

describe('P0.4-P0.6 Engine Refactoring: JoinSect, TimeAdvance, CultivationTicks & EffectBatch', () => {
  it('buildJoinSectPatch grants starter gear, initial stipend (SECT-22), and completes entry quest', () => {
    const base = createInitialStoreData()
    base.questState.activeQuests['QST-SECT-01-ENTRY'] = {
      questId: 'QST-SECT-01-ENTRY',
      stepId: 'chore',
      startedDay: 1,
      deadlineDay: null,
      vars: {},
    }

    const shaolinRes = buildJoinSectPatch({
      sectId: 'SECT-01',
      dayCount: 370,
      silver: 100,
      inventory: [],
      sectState: base.sectState,
      questState: base.questState,
      completeEntryQuest: true,
    })

    expect(shaolinRes.ok).toBe(true)
    expect(shaolinRes.nextSectState.sectId).toBe('SECT-01')
    expect(shaolinRes.nextSectState.shaolinDiscipleType).toBe('lay')
    expect(shaolinRes.nextQuestState.activeQuests['QST-SECT-01-ENTRY']).toBeUndefined()
    expect(shaolinRes.nextQuestState.completedQuests['QST-SECT-01-ENTRY']?.outcome).toBe('joined')
    expect(shaolinRes.grantedGiftNames.length).toBeGreaterThan(0)

    const changshanRes = buildJoinSectPatch({
      sectId: 'SECT-22',
      dayCount: 10,
      silver: 50,
      inventory: [],
      sectState: base.sectState,
      questState: base.questState,
    })
    expect(changshanRes.ok).toBe(true)
    expect(changshanRes.initialStipendPaid).toBe(15)
    expect(changshanRes.nextSilver).toBe(65)
    expect(getSectRule('SECT-33')?.hasExclusiveMartialArts).toBe(false)
  })

  it('computeTimeAdvanceState handles day rollover, foreign lodging, vitality, and monthly stipend', () => {
    const base = createInitialStoreData()
    const rng = createSeededRng(42)
    base.hp = 100
    base.mp = 50
    base.silver = 200
    base.dayCount = 30
    base.shichenIdx = 11 // 亥时 -> +2 时辰 crosses into Day 31 (Month 2)
    base.sectState.sectId = 'SECT-33'
    base.sectState.rank = 1
    base.sectState.rankLabel = '殿前司十将'
    base.sectState.lastStipendMonth = 0
    base.currentNodeId = 'luoyang' // foreign city for SECT-33 (bianliang)

    const adv = computeTimeAdvanceState({
      dayCount: base.dayCount,
      shichenIdx: base.shichenIdx,
      deltaShichen: 2,
      silver: base.silver,
      hp: base.hp,
      maxHp: base.maxHp,
      mp: base.mp,
      maxMp: base.maxMp,
      currentNodeId: base.currentNodeId,
      campPos: null,
      sectState: base.sectState,
      npcFavor: base.npcFavor,
      roamingMasters: base.roamingMasters,
      logs: base.logs,
      chargeForeignLodging: true,
      vitalityFactor: 1,
      rng,
    })

    expect(adv.dayCount).toBe(31)
    expect(adv.daysAdded).toBe(1)
    expect(adv.lodgingFee).toBeGreaterThan(0)
    expect(adv.silver).toBeGreaterThan(200 - adv.lodgingFee) // received SECT-33 monthly stipend!
    expect(adv.hpGain).toBeGreaterThan(0)
    expect(adv.mpGain).toBeGreaterThan(0)
  })

  it('tickTenArtSession and tickMartialArtSession advance session state purely', () => {
    const base = createInitialStoreData()
    base.learnedArts = [{ artId: 'MA-179', level: 1, exp: 0 }]

    const tenRes = tickTenArtSession(
      base,
      {
        kind: 'ten_art',
        tenArtKey: '算术',
        artId: 'TEN_ART_算术',
        artName: '算术',
        artCleanName: '算术',
        artFullTier: '十艺百工',
        mode: 1,
        venue: 'city_building',
        venueLabel: '开封府 · 书院',
        multiplier: 1.2,
        dailySilverCost: 2,
        dailyFoodCost: 0,
        dailyGain: 120,
        targetShichens: 12,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: base.baseStats.skills['算术'] ?? 50,
        startExp: 0,
      },
      12,
      createSeededRng(7),
    )

    expect(tenRes.daysAdded).toBe(1)
    expect(tenRes.patch.cultivationSession).toBeNull() // finished 1-day session
    expect(tenRes.patch.silver).toBe(base.silver - 2)

    const maRes = tickMartialArtSession(
      base,
      {
        artId: 'MA-179',
        artName: '太祖长拳',
        artCleanName: '太祖长拳',
        artFullTier: '凡阶上品',
        mode: 5,
        venue: 'inn',
        venueLabel: '开封府 · 客栈',
        multiplier: 1.0,
        dailySilverCost: 2,
        dailyFoodCost: 0,
        dailyGain: 60,
        targetShichens: 60,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: 1,
        startExp: 0,
      },
      6,
      createSeededRng(9),
    )

    expect(maRes.patch.cultivationSession?.shichensElapsed).toBe(6)
    expect(maRes.patch.cultivationSession?.totalExpGained).toBeGreaterThan(0)
  })

  it('executeQuestEffectsBatch coalesces multiple synchronous effects into a single set() call', () => {
    let state = {
      ...createInitialStoreData(),
      checkExpiredQuestDeadlines: vi.fn(),
      startNpcCombat: vi.fn(),
      runQuestEffects: vi.fn(),
    } as unknown as GameStoreState

    const setSpy = vi.fn((partial: Partial<GameStoreState>) => {
      state = { ...state, ...partial }
    })
    const getFn = () => state

    executeQuestEffectsBatch({
      effects: [
        { type: 'setFlag', flag: 'test_batch_flag', value: true },
        { type: 'giveSilver', amount: 88, reason: '官府赏银' },
        { type: 'modifyRenown', delta: 15, reason: '义举传扬' },
        { type: 'modifyChivalry', delta: 10 },
        { type: 'toast', text: '任务阶段推进', tone: 'success' },
      ],
      contextNpc: null,
      set: setSpy,
      get: getFn,
    })

    expect(setSpy).toHaveBeenCalledTimes(1)
    expect(state.questState.flags.test_batch_flag).toBe(true)
    expect(state.silver).toBe(150 + 88)
    expect(state.renown).toBe(15)
    expect(state.chivalry).toBe(10)
  })
})
