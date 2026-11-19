import { describe, expect, it } from 'vitest'
import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { cloneHeroBaseStats } from '../stats/heroStats'
import {
  BAJI_IRON_TOKEN_ITEM_ID,
  clonePlayerSectState,
  DAMING_RECOMMENDATION_ITEM_ID,
  evaluateSectEntry,
  evaluateSectPromotion,
  generateKaifengWarrant,
  isHuashanArtBlockedBeforeMaster,
  KAIFENG_RECOMMENDATION_ITEM_ID,
  resetSectMembership,
} from '../sect'
import { NODE_MAP } from '../world/mapMath'

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

    // SECT-13 Tangmen requires bespoke white-paper entry quest QST-SECT-13-ENTRY
    const tangEval = evaluateSectEntry({
      targetSectId: 'SECT-13',
      sectState: emptySect,
      silver: 200,
      baseStats,
      inventory: [],
    })
    expect(tangEval.canJoin).toBe(false)
    expect(tangEval.requirementSummary).toContain('川药血引 · 万毒试药')
    expect(tangEval.blockedReason).toContain('西川百草药武堂')
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

    // Dao-Sword (e.g. SECT-06 Taishan) Lv2 -> Lv3 requires tournament win
    expect(
      evaluateSectPromotion({
        sectId: 'SECT-06',
        currentRank: 2,
        dayCount: 800,
        joinedDay: 1,
        heroRealmRank: 6,
        heroRealmLabel: '二流上品',
        npcFavor: new Proxy({}, { get: () => 80 }),
        wonSectTournament: false,
      })?.canPromote,
    ).toBe(false)

    // Huashan (SECT-05) promotions are strictly story-quest driven (huashan_quest)
    const hsPromo = evaluateSectPromotion({
      sectId: 'SECT-05',
      currentRank: 1,
      dayCount: 800,
      joinedDay: 1,
      heroRealmRank: 8,
      heroRealmLabel: '一流中品',
      npcFavor: new Proxy({}, { get: () => 100 }),
      wonSectTournament: true,
    })
    expect(hsPromo?.canPromote).toBe(false)
    expect(hsPromo?.reason).toContain('博台大比')

    // Huashan art gating: Lv.1..4 can only learn 凡品 from panel; 良品/地阶 require quest impartation until Lv.5 Master
    expect(isHuashanArtBlockedBeforeMaster('SECT-05', MARTIAL_ART_DB_MAP['MA-160']!, 1)).toBe(false)
    expect(isHuashanArtBlockedBeforeMaster('SECT-05', MARTIAL_ART_DB_MAP['MA-167']!, 1)).toBe(false)
    expect(isHuashanArtBlockedBeforeMaster('SECT-05', MARTIAL_ART_DB_MAP['MA-147']!, 1)).toBe(true)
    expect(isHuashanArtBlockedBeforeMaster('SECT-05', MARTIAL_ART_DB_MAP['MA-128']!, 2)).toBe(true)
    expect(isHuashanArtBlockedBeforeMaster('SECT-05', MARTIAL_ART_DB_MAP['MA-058']!, 4)).toBe(true)
    expect(isHuashanArtBlockedBeforeMaster('SECT-05', MARTIAL_ART_DB_MAP['MA-058']!, 5)).toBe(false)

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

describe('resetSectMembership', () => {
  it('clears membership and every in-progress sect duty while keeping cross-sect history', () => {
    const st = clonePlayerSectState({
      sectId: 'SECT-17',
      rank: 3,
      contribution: 120,
      songCourtBlacklisted: true,
      bribedReferralSects: ['SECT-25'],
      kaifengCasesSolved: 4,
      kaifengMissedCount: 1,
      kaifengRank2Day: 30,
      changshanMissedCount: 1,
      xingxiuDefeatedRanks: [2, 3],
      wonSectTournament: true,
    })
    st.activeSectTask = { id: 'T1' } as unknown as typeof st.activeSectTask
    st.activeKaifengWarrant = { id: 'W1' } as unknown as typeof st.activeKaifengWarrant
    st.activeLiaoSpy = { name: 'S' } as unknown as typeof st.activeLiaoSpy

    const next = resetSectMembership(st)
    expect(next.sectId).toBeNull()
    expect(next.rank).toBe(1)
    expect(next.rankLabel).toBe('无门无派')
    expect(next.contribution).toBe(0)
    expect(next.activeSectTask).toBeNull()
    expect(next.activeKaifengWarrant).toBeNull()
    expect(next.activeLiaoSpy).toBeNull()
    expect(next.activeSectTournament).toBeNull()
    expect(next.kaifengCasesSolved).toBe(0)
    expect(next.kaifengMissedCount).toBe(0)
    expect(next.kaifengRank2Day).toBeNull()
    expect(next.changshanMissedCount).toBe(0)
    expect(next.xingxiuDefeatedRanks).toEqual([])
    expect(next.wonSectTournament).toBe(false)
    // 跨门派江湖履历保留
    expect(next.songCourtBlacklisted).toBe(true)
    expect(next.bribedReferralSects).toEqual(['SECT-25'])
    // 不修改入参
    expect(st.sectId).toBe('SECT-17')
  })

  it('generates Kaifeng Six Doors warrants only in Great Song cities', () => {
    for (const rank of [1, 2, 3] as const) {
      for (let i = 0; i < 60; i += 1) {
        let step = 0
        const rng = () => {
          const val = ((i * 37 + step * 17) % 100) / 100
          step += 1
          return val
        }
        const warrant = generateKaifengWarrant(10 + i, rank, { rng })
        expect(warrant).not.toBeNull()
        const node = NODE_MAP[warrant!.regionId]
        expect(node).toBeDefined()
        expect(node?.type).toBe('city')
        expect(node?.regime).toBe('song')
        expect(warrant!.regionId).not.toBe('bianliang')
      }
    }
  })
})
