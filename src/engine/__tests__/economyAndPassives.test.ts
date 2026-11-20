import { describe, expect, it } from 'vitest'
import { DEFAULT_EQUIPPED_SLOTS, ITEM_DB_MAP } from '../../data/itemsDb'
import { createInitialStoreData } from '../../store/storeHelpers'
import { useGameStore } from '../../store/useGameStore'
import type { CultivationSessionState } from '../../types/game'
import {
  buildPlayerCombatant,
  createCombatSession,
  createSeededRng,
  resolveCombatRound,
} from '../combat'
import { calcDailyExpByCategory, cloneHeroBaseStats, isPlayerInFreeLodgingRegion } from '../stats/heroStats'
import { validateSaveEnvelope } from '../../utils/saveManager'
import {
  calcVocationDailyWage,
  checkVocationSkillMet,
  computeArithmeticBuyDiscountRatio,
  computeArithmeticSellBonusRatio,
  computeBanquetFavorGain,
  computeCelunBonusAmount,
  computeCharmFavorMultiplier,
  computeHighwaymanPersuadeChance,
  computeInitialNpcFavor,
  computeItemSellPrice,
  computePoemRenownGain,
  computeQinSoundAmpPct,
  computeShopBuyPrice,
  computeShuBrushAmpPct,
  computeTalkFavorDelta,
  getAvailableEscortContracts,
  getDailyMountFodderSilver,
  getDailyMountTravelFoodCost,
  getRegionLodgingInfo,
  isItemSellable,
  resolveNpcFavor,
} from '../economy'
import { computeGiftFavorGain, getNpcFavorProfile } from '../social/npcFavor'
import { computeTimeAdvanceState } from '../time/clock'
import {
  buildEarlyStopCultivationPatch,
  stepCultivationSessionPure,
} from '../time/cultivationTicks'

describe('P0 Economy Loop & P1 Talents / Ten-Arts Passives', () => {
  it('computes buy discounts, sell prices (40% + arithmetic/10%), and locks quest/key items', () => {
    expect(computeArithmeticBuyDiscountRatio(0)).toBe(0)
    expect(computeArithmeticBuyDiscountRatio(50)).toBeCloseTo(0.1, 5)
    expect(computeArithmeticBuyDiscountRatio(120)).toBeCloseTo(0.2, 5) // capped at 20%

    expect(computeShopBuyPrice(100, 0)).toBe(100)
    expect(computeShopBuyPrice(100, 50)).toBe(90)
    expect(computeShopBuyPrice(100, 100)).toBe(80)
    expect(computeShopBuyPrice(100, 150)).toBe(80)

    expect(computeArithmeticSellBonusRatio(100)).toBeCloseTo(0.1, 5)
    expect(computeItemSellPrice(100, 0)).toBe(40) // 40%
    expect(computeItemSellPrice(100, 100)).toBe(44) // 40% * 1.1 = 44

    // Ordinary gear/medicine is sellable; quest/misc key items are locked except ITM-MSC-002 (banknote)
    expect(isItemSellable('WPN-001')).toBe(true)
    expect(isItemSellable('ITM-MSC-002')).toBe(true)
    expect(isItemSellable('ITM-MSC-001')).toBe(false)
    expect(isItemSellable('ITM-MSC-005')).toBe(false)
  })

  it('computes tiered city lodging (2 / 1 / 1 silver), birthplace exemption, 12-shichen billing, and zero mount fodder', () => {
    expect(getRegionLodgingInfo('bianliang').dailyCost).toBe(2)
    expect(getRegionLodgingInfo('luoyang').dailyCost).toBe(2)
    expect(getRegionLodgingInfo('suzhou').dailyCost).toBe(1)
    expect(getRegionLodgingInfo('hangzhou').dailyCost).toBe(1)
    expect(getRegionLodgingInfo('yanan').dailyCost).toBe(1)
    expect(getRegionLodgingInfo('shaolin').dailyCost).toBe(1)
    expect(getRegionLodgingInfo('yanmenguan').dailyCost).toBe(1)

    expect(getDailyMountFodderSilver(null)).toBe(0)
    expect(getDailyMountFodderSilver('MNT-017')).toBe(0)
    expect(getDailyMountFodderSilver('MNT-001')).toBe(0)
    expect(getDailyMountTravelFoodCost(null)).toBe(0)
    expect(getDailyMountTravelFoodCost('MNT-001')).toBe(0)

    expect(isPlayerInFreeLodgingRegion('bianliang', null, null, 'bianliang')).toBe(true)
    expect(isPlayerInFreeLodgingRegion('luoyang', null, null, 'bianliang')).toBe(false)
    expect(isPlayerInFreeLodgingRegion('shaolin', null, 'SECT-01', 'bianliang')).toBe(true)

    const base = createInitialStoreData()
    // Staying 10 shichens from 0 -> no extra charge yet
    const stay10 = computeTimeAdvanceState({
      dayCount: 1,
      shichenIdx: 0,
      deltaShichen: 10,
      silver: 100,
      hp: 100,
      maxHp: 100,
      mp: 100,
      maxMp: 100,
      currentNodeId: 'luoyang',
      birthplaceId: 'bianliang',
      cityStayShichens: 0,
      campPos: null,
      sectState: base.sectState,
      npcFavor: base.npcFavor,
      roamingMasters: base.roamingMasters,
      logs: base.logs,
      chargeForeignLodging: true,
      rng: createSeededRng(1),
    })
    expect(stay10.lodgingFee).toBe(0)
    expect(stay10.cityStayShichens).toBe(10)

    // Advancing 4 more shichens (10 + 4 = 14) crosses 12 -> 1 lodging fee (2 silver) & remainder 2
    const stay14 = computeTimeAdvanceState({
      dayCount: stay10.dayCount,
      shichenIdx: stay10.shichenIdx,
      deltaShichen: 4,
      silver: stay10.silver,
      hp: 100,
      maxHp: 100,
      mp: 100,
      maxMp: 100,
      currentNodeId: 'luoyang',
      birthplaceId: 'bianliang',
      cityStayShichens: stay10.cityStayShichens,
      campPos: null,
      sectState: base.sectState,
      npcFavor: base.npcFavor,
      roamingMasters: base.roamingMasters,
      logs: base.logs,
      chargeForeignLodging: true,
      rng: createSeededRng(1),
    })
    expect(stay14.lodgingFee).toBe(2)
    expect(stay14.cityStayShichens).toBe(2)
  })

  it('applies Charm (颜值) to initial NPC favor, gifts, and banquets (strictly social)', () => {
    expect(computeInitialNpcFavor(50)).toBe(0)
    expect(computeInitialNpcFavor(80)).toBe(6) // (80 - 50) / 5 = +6
    expect(computeInitialNpcFavor(25)).toBe(-5)

    expect(resolveNpcFavor({}, 'NPC-0009', 80)).toBe(6)
    expect(resolveNpcFavor({ 'NPC-0009': 42 }, 'NPC-0009', 80)).toBe(42)

    expect(computeCharmFavorMultiplier(50)).toBeCloseTo(1.0, 5)
    expect(computeCharmFavorMultiplier(100)).toBeCloseTo(1.2, 5)

    const profile = getNpcFavorProfile({ name: '乔峰', factionName: '丐帮', role: '帮主' })
    const sampleItem = ITEM_DB_MAP['WPN-001']!
    const lowCharmGift = computeGiftFavorGain(0, sampleItem, profile, 30)
    const highCharmGift = computeGiftFavorGain(0, sampleItem, profile, 100)
    expect(highCharmGift.favorGain).toBeGreaterThanOrEqual(lowCharmGift.favorGain)

    const stdBanquet = computeBanquetFavorGain('standard', 50, false)
    const grandTeaWineBanquet = computeBanquetFavorGain('grand', 100, true)
    expect(stdBanquet.cost).toBe(18)
    expect(stdBanquet.favorDelta).toBe(8)
    expect(grandTeaWineBanquet.cost).toBe(45)
    expect(grandTeaWineBanquet.favorDelta).toBe(Math.round(18 * 1.2 * 1.25))
  })

  it('applies Eloquence (辩才), Jingyi (经义), Celun (策论), and Poetry (诗词) passives', () => {
    // 辩才: rand(-1, 3) + 辩才/30; highwayman persuasion = 辩才/150
    const lowRoll = computeTalkFavorDelta(90, () => 0.0) // rawRoll = -1, bonus = +3 => +2
    expect(lowRoll.rawRoll).toBe(-1)
    expect(lowRoll.delta).toBe(2)
    expect(computeHighwaymanPersuadeChance(75)).toBeCloseTo(0.5, 5)
    expect(computeHighwaymanPersuadeChance(200)).toBeCloseTo(0.95, 5)

    // 经义: neigong seclusion speed × (1 + 经义/400)
    const baseTalents = cloneHeroBaseStats().talents
    const expNoJingyi = calcDailyExpByCategory(true, baseTalents, 1.0, 0)
    const expWithJingyi = calcDailyExpByCategory(true, baseTalents, 1.0, 100) // ×1.25
    const outerWithJingyi = calcDailyExpByCategory(false, baseTalents, 1.0, 100)
    const outerNoJingyi = calcDailyExpByCategory(false, baseTalents, 1.0, 0)
    expect(expWithJingyi).toBeGreaterThan(expNoJingyi)
    expect(Math.abs(expWithJingyi - expNoJingyi * 1.25)).toBeLessThanOrEqual(1)
    expect(outerWithJingyi).toBe(outerNoJingyi) // 外功不受经义加成

    // 策论: stipends & bounties × (1 + 策论/200)
    expect(computeCelunBonusAmount(100, 0)).toBe(100)
    expect(computeCelunBonusAmount(100, 80)).toBe(140)

    // 诗词: landmark inscription renown = max(1, round(诗词/10))
    expect(computePoemRenownGain(0)).toBe(1)
    expect(computePoemRenownGain(64)).toBe(6)
    expect(computePoemRenownGain(96)).toBe(10)
  })

  it('amplifies sound martial arts by 琴/4% and brush martial arts by 书/5% in combat', () => {
    expect(computeQinSoundAmpPct(80)).toBeCloseTo(0.2, 5) // +20%
    expect(computeShuBrushAmpPct(100)).toBeCloseTo(0.2, 5) // +20%

    const baseStatsLow = cloneHeroBaseStats()
    baseStatsLow.skills['琴'] = 0
    baseStatsLow.skills['书'] = 0

    const baseStatsHigh = cloneHeroBaseStats()
    baseStatsHigh.skills['琴'] = 100 // +25% sound damage
    baseStatsHigh.skills['书'] = 100 // +20% brush damage

    // MA-070 碧海潮生曲 (音功), MA-096 判官夺命笔 (笔法)
    const commonArts = {
      neigong: 'MA-179',
      qinggong: null,
      move1: 'MA-070',
      move2: 'MA-096',
      move3: null,
      move4: null,
    } as const
    const commonLearned = [
      { artId: 'MA-179', level: 8, exp: 0 },
      { artId: 'MA-070', level: 8, exp: 0 },
      { artId: 'MA-096', level: 8, exp: 0 },
    ]

    const pLow = buildPlayerCombatant({
      playerName: '白丁',
      hp: 2000,
      mp: 1200,
      baseStats: baseStatsLow,
      equipped: { ...DEFAULT_EQUIPPED_SLOTS, weapon: 'WPN-023' },
      equippedArts: { ...commonArts },
      learnedArts: commonLearned,
    })
    const pHigh = buildPlayerCombatant({
      playerName: '琴书大家',
      hp: 2000,
      mp: 1200,
      baseStats: baseStatsHigh,
      equipped: { ...DEFAULT_EQUIPPED_SLOTS, weapon: 'WPN-023' },
      equippedArts: { ...commonArts },
      learnedArts: commonLearned,
    })

    const dummyTarget = {
      id: 'DUMMY-SANDBAG',
      name: '试招铜人',
      title: '木桩',
      realm: '三流下品',
      talk: '“……”',
      stats: { hp: 5000, mp: 0, agi: 1, res: 10, isBenchmark: false },
    }

    // Sound move1 comparison with identical RNG seed
    const sSoundLow = resolveCombatRound(
      createCombatSession({ mode: 'spar', player: pLow, npcNode: dummyTarget }),
      { type: 'move', slot: 'move1' },
      createSeededRng(777),
    )
    const sSoundHigh = resolveCombatRound(
      createCombatSession({ mode: 'spar', player: pHigh, npcNode: dummyTarget }),
      { type: 'move', slot: 'move1' },
      createSeededRng(777),
    )
    expect(5000 - sSoundHigh.npc.hp).toBeGreaterThan(5000 - sSoundLow.npc.hp)

    // Brush move2 comparison with identical RNG seed
    const sBrushLow = resolveCombatRound(
      createCombatSession({ mode: 'spar', player: pLow, npcNode: dummyTarget }),
      { type: 'move', slot: 'move2' },
      createSeededRng(888),
    )
    const sBrushHigh = resolveCombatRound(
      createCombatSession({ mode: 'spar', player: pHigh, npcNode: dummyTarget }),
      { type: 'move', slot: 'move2' },
      createSeededRng(888),
    )
    expect(5000 - sBrushHigh.npc.hp).toBeGreaterThan(5000 - sBrushLow.npc.hp)
  })

  it('computes vocation wages, runs vocation_work daily ticks & early checkout, and generates escorts', () => {
    const skills = { 算术: 50, 经义: 50, 书: 40, 画: 70, 辩才: 60 }
    expect(calcVocationDailyWage('accountant', skills)).toBe(0.75) // 0.015*50
    expect(calcVocationDailyWage('tutor', skills)).toBe(0.7) // 0.014*50
    expect(calcVocationDailyWage('calligrapher', skills)).toBe(1.05) // 0.015 * max(40, 70)
    expect(calcVocationDailyWage('litigator', skills)).toBe(0.9) // 0.015 * 60
    // 满级文职约 45 两/月，不超过常山枪派三阶月俸 50 两
    expect(calcVocationDailyWage('accountant', { 算术: 100 }) * 30).toBeLessThanOrEqual(50)

    expect(checkVocationSkillMet('calligrapher', { 书: 2, 画: 3 }).ok).toBe(false)
    expect(checkVocationSkillMet('accountant', { 算术: 10 }).ok).toBe(false)
    expect(checkVocationSkillMet('calligrapher', skills).ok).toBe(true)

    const storeSnap = useGameStore.getState()
    const vocSession: CultivationSessionState = {
      kind: 'vocation_work',
      vocationKey: 'accountant',
      dailyWageRate: 7,
      artId: 'VOCATION_ACCOUNTANT',
      artName: '账房掌算（日薪 7.00 两）',
      artCleanName: '账房掌算',
      artFullTier: '邸店商号账房',
      mode: 5,
      venue: 'city_building',
      venueLabel: '东京开封府 · 州桥客栈',
      multiplier: 1,
      dailySilverCost: 0,
      dailyFoodCost: 0,
      dailyGain: 35,
      targetShichens: 60, // 5 days
      shichensElapsed: 0,
      silverSpent: 0,
      foodSpent: 0,
      combatExpSpent: 0,
      totalExpGained: 0,
      settledExpFloor: 0,
      startLevel: storeSnap.silver,
      startExp: 0,
    }

    const tickRes = stepCultivationSessionPure(storeSnap, vocSession, 24, createSeededRng(42))
    expect(tickRes.daysAdded).toBe(2)
    expect(tickRes.patch.silver).toBe(storeSnap.silver + 14)
    expect(tickRes.patch.cultivationSession?.totalExpGained).toBe(14)

    const earlyStop = buildEarlyStopCultivationPatch(
      { ...storeSnap, silver: storeSnap.silver + 14 },
      tickRes.patch.cultivationSession!,
    )
    expect(earlyStop.patch.cultivationSession).toBeNull()
    expect(earlyStop.patch.actionFeedback?.text).toContain('+14 两')

    // Escort contracts scale by distance × terrain danger
    const escorts = getAvailableEscortContracts({
      originRegionId: 'bianliang',
      dayCount: 1,
      speedParams: { mountKey: 'walk', qinggongBonus: 0, ridingSkill: 10, agility: 30 },
      inventory: [],
    })
    expect(escorts.length).toBeGreaterThan(0)
    expect(escorts[0]!.rewardSilver).toBeGreaterThanOrEqual(3)
    expect(Math.max(...escorts.map((e) => e.rewardSilver))).toBeLessThanOrEqual(60)
  })

  it('roundtrips M1.5.3 economy & passive persistence fields in saveManager', () => {
    const store = useGameStore.getState()
    const baseEnv = store.buildSaveEnvelope('slot-2', '经济系统测试')
    const mutated = {
      ...baseEnv,
      state: {
        ...baseEnv.state,
        birthplaceId: 'luoyang',
        cityStayShichens: 7,
        npcBanquetedMonth: { 'NPC-0012': 2 },
        inscribedPoemSpotIds: ['bl_fanlou', 'hzf_tengwang'],
        activeEscortContract: {
          id: 'ESC-bianliang-luoyang-M0',
          cargoName: '三司折帛官银鞘',
          originRegionId: 'bianliang',
          originName: '开封府',
          destRegionId: 'luoyang',
          destName: '洛阳府',
          totalLi: 380,
          dangerCoeff: 1.0,
          dangerLabel: '官道坦途',
          rewardSilver: 32,
          acceptedDay: 5,
          ambushResolved: true,
        },
      },
    }

    const validated = validateSaveEnvelope(JSON.parse(JSON.stringify(mutated)))
    expect(validated).not.toBeNull()
    expect(validated?.schemaVersion).toBe('M1.5.6')
    expect(validated?.state.birthplaceId).toBe('luoyang')
    expect(validated?.state.cityStayShichens).toBe(7)
    expect(validated?.state.npcBanquetedMonth).toEqual({ 'NPC-0012': 2 })
    expect(validated?.state.inscribedPoemSpotIds).toEqual(['bl_fanlou', 'hzf_tengwang'])
    expect(validated?.state.activeEscortContract?.destRegionId).toBe('luoyang')
  })
})
