import { describe, expect, it } from 'vitest'
import { cloneHeroBaseStats } from '../../utils/heroStats'
import {
  BAJI_IRON_TOKEN_ITEM_ID,
  clonePlayerSectState,
  DAMING_RECOMMENDATION_ITEM_ID,
  evaluateSectEntry,
  evaluateSectPromotion,
  KAIFENG_RECOMMENDATION_ITEM_ID,
} from '../../utils/sectMechanics'

describe('evaluateSectEntry & evaluateSectPromotion', () => {
  it('evaluates third-tier, second-tier, Changshan, Kaifeng, and Imperial Guard entry rules', () => {
    const baseStats = cloneHeroBaseStats()
    const emptySect = clonePlayerSectState()

    // Third-tier sect requires 20 silver
    expect(
      evaluateSectEntry({
        targetSectId: 'SECT-25',
        sectState: emptySect,
        silver: 10,
        baseStats,
        inventory: [],
      }).canJoin,
    ).toBe(false)
    expect(
      evaluateSectEntry({
        targetSectId: 'SECT-25',
        sectState: emptySect,
        silver: 25,
        baseStats,
        inventory: [],
      }).canJoin,
    ).toBe(true)

    // SECT-23 Baji Iron Token grants Rank 2 direct entry
    const bajiEval = evaluateSectEntry({
      targetSectId: 'SECT-23',
      sectState: emptySect,
      silver: 0,
      baseStats,
      inventory: [{ itemId: BAJI_IRON_TOKEN_ITEM_ID, qty: 1 }],
    })
    expect(bajiEval.canJoin).toBe(true)
    expect(bajiEval.startingRank).toBe(2)

    // SECT-17 Kaifeng entry with recommendation letters
    const kfRank1 = evaluateSectEntry({
      targetSectId: 'SECT-17',
      sectState: emptySect,
      silver: 0,
      baseStats,
      inventory: [{ itemId: KAIFENG_RECOMMENDATION_ITEM_ID, qty: 1 }],
    })
    expect(kfRank1.canJoin).toBe(true)
    expect(kfRank1.startingRank).toBe(1)

    const kfRank2 = evaluateSectEntry({
      targetSectId: 'SECT-17',
      sectState: { ...emptySect, sectId: 'SECT-23', rank: 2 },
      silver: 0,
      baseStats,
      inventory: [{ itemId: DAMING_RECOMMENDATION_ITEM_ID, qty: 1 }],
    })
    expect(kfRank2.canJoin).toBe(true)
    expect(kfRank2.startingRank).toBe(2)

    // SECT-33 Imperial Guard blocks casual entry
    expect(
      evaluateSectEntry({
        targetSectId: 'SECT-33',
        sectState: emptySect,
        silver: 999,
        baseStats,
        inventory: [],
      }).canJoin,
    ).toBe(false)
  })

  it('evaluates sect promotion rules across Kaifeng, Xingxiu, Shaolin, Dao-Sword, and 2nd/3rd-tier sects', () => {
    // Kaifeng Lv1 -> Lv2 requires realm >= 3 and 2 solved cases
    expect(
      evaluateSectPromotion({
        sectId: 'SECT-17',
        currentRank: 1,
        dayCount: 50,
        joinedDay: 1,
        heroRealmRank: 3,
        heroRealmLabel: '三流上品',
        npcFavor: {},
        kaifengCasesSolved: 2,
      })?.canPromote,
    ).toBe(true)

    // Xingxiu Lv4 -> Lv5 requires killing Ding Chunqiu
    expect(
      evaluateSectPromotion({
        sectId: 'SECT-19',
        currentRank: 4,
        dayCount: 500,
        joinedDay: 1,
        heroRealmRank: 10,
        heroRealmLabel: '宗师下品',
        npcFavor: {},
        killedDingChunqiu: true,
      })?.canPromote,
    ).toBe(true)

    // Dao-Sword Lv2 -> Lv3 requires tournament win
    expect(
      evaluateSectPromotion({
        sectId: 'SECT-05',
        currentRank: 2,
        dayCount: 800,
        joinedDay: 1,
        heroRealmRank: 6,
        heroRealmLabel: '二流上品',
        npcFavor: { 'NPC-0174': 80, 'NPC-0175': 80 },
        wonSectTournament: false,
      })?.canPromote,
    ).toBe(false)

    // Third-tier sect Lv1 -> Lv2
    const tier3LeaderPromotion = evaluateSectPromotion({
      sectId: 'SECT-25',
      currentRank: 1,
      dayCount: 100,
      joinedDay: 1,
      heroRealmRank: 3,
      heroRealmLabel: '三流上品',
      npcFavor: new Proxy({}, { get: () => 80 }),
    })
    expect(tier3LeaderPromotion?.canPromote).toBe(true)
  })
})
