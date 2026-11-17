import { describe, expect, it } from 'vitest'
import { QUEST_MAP } from '../../data/quests'
import {
  collectUnmetQuestReasons,
  DEFAULT_QUEST_RUNTIME_STATE,
  evaluateQuestCondition,
  type QuestEvalContext,
} from '../questEngine'
import { cloneHeroBaseStats } from '../stats/heroStats'
import { clonePlayerSectState } from '../sect'

function makeContext(overrides: Partial<QuestEvalContext> = {}): QuestEvalContext {
  const baseStats = cloneHeroBaseStats()
  return {
    dayCount: 10,
    shichenIdx: 4,
    silver: 100,
    renown: 20,
    chivalry: 15,
    food: 10,
    hp: 300,
    maxHp: 300,
    mp: 120,
    maxMp: 120,
    agility: 35,
    res: 20,
    ridingSkill: baseStats.ridingSkill,
    baseStats,
    skills: { ...baseStats.skills },
    inventory: [{ itemId: 'ITM-MSC-006', qty: 1 }],
    learnedArts: [{ artId: 'MA-182', level: 3, exp: 0 }],
    npcFavor: { 'NPC-0013': 65 },
    sectState: clonePlayerSectState(),
    questState: {
      ...DEFAULT_QUEST_RUNTIME_STATE,
      activeQuests: {},
      completedQuests: {},
      flags: { met_mentor: true, trials_passed: 3 },
      dynamicActors: [],
    },
    ...overrides,
  }
}

describe('evaluateQuestCondition & collectUnmetQuestReasons', () => {
  it('evaluates talent, skill, silver, renown, chivalry, and combat stat thresholds', () => {
    const ctx = makeContext()
    expect(evaluateQuestCondition({ type: 'talentAtLeast', key: '悟性', min: 50 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'talentAtMost', key: '根骨', max: 10 }, ctx).passed).toBe(false)
    expect(evaluateQuestCondition({ type: 'skillAtLeast', key: '经义', min: 60 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'skillAtLeast', key: '骑术', min: 80 }, ctx).passed).toBe(false)
    expect(evaluateQuestCondition({ type: 'silverAtLeast', min: 80 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'silverAtMost', max: 3 }, ctx).passed).toBe(false)
    expect(evaluateQuestCondition({ type: 'combatStatAtLeast', key: 'agility', min: 30 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'renownAtLeast', min: 25 }, ctx).passed).toBe(false)
    expect(evaluateQuestCondition({ type: 'chivalryAtLeast', min: 10 }, ctx).passed).toBe(true)
  })

  it('evaluates logical combinators (all, any, not) and deduplicates unmet reasons', () => {
    const ctx = makeContext({ silver: 5 })
    const compound = {
      type: 'all' as const,
      conditions: [
        { type: 'silverAtLeast' as const, min: 50 },
        { type: 'talentAtLeast' as const, key: '根骨' as const, min: 99 },
        { type: 'silverAtLeast' as const, min: 50 },
      ],
    }
    const res = evaluateQuestCondition(compound, ctx)
    expect(res.passed).toBe(false)
    expect(res.reason).toContain('纹银 ≥ 50')

    const reasons = collectUnmetQuestReasons(compound, ctx)
    expect(reasons).toHaveLength(2)
    expect(reasons[0]).toContain('纹银 ≥ 50')
    expect(reasons[1]).toContain('先天根骨 ≥ 99')

    expect(
      evaluateQuestCondition(
        {
          type: 'any',
          conditions: [
            { type: 'silverAtLeast', min: 500 },
            { type: 'flag', flag: 'met_mentor', op: 'truthy' },
          ],
        },
        ctx,
      ).passed,
    ).toBe(true)

    expect(
      evaluateQuestCondition(
        {
          type: 'not',
          condition: { type: 'flag', flag: 'non_existent_flag', op: 'truthy' },
        },
        ctx,
      ).passed,
    ).toBe(true)
  })

  it('evaluates inventory, learnedArts, sect membership, shichen, flags, and questStatus', () => {
    const sampleQuestId = Object.keys(QUEST_MAP)[0]!
    const ctx = makeContext({
      sectState: {
        ...clonePlayerSectState(),
        sectId: 'SECT-22',
        rank: 2,
        rankLabel: '精锐什长',
        joinedDay: 1,
      },
      questState: {
        activeQuests: {
          [sampleQuestId]: {
            questId: sampleQuestId,
            stepId: 'step_a',
            startedDay: 2,
            deadlineDay: null,
            vars: {},
          },
        },
        completedQuests: {},
        flags: { count_flag: 5 },
        dynamicActors: [],
      },
    })

    expect(evaluateQuestCondition({ type: 'hasItem', itemId: 'ITM-MSC-006', qty: 1 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'learnedArtAtLeast', artId: 'MA-182', minLevel: 3 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'inSect', sectId: 'SECT-22', minRank: 2 }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'notInAnySect', allowTransferFromSectId: 'SECT-22' }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'notInAnySect' }, ctx).passed).toBe(false)
    expect(evaluateQuestCondition({ type: 'shichenIn', indices: [3, 4, 5] }, ctx).passed).toBe(true)
    expect(evaluateQuestCondition({ type: 'flag', flag: 'count_flag', op: 'gte', value: 5 }, ctx).passed).toBe(true)
    expect(
      evaluateQuestCondition(
        { type: 'questStatus', questId: sampleQuestId, status: 'active', stepId: 'step_a' },
        ctx,
      ).passed,
    ).toBe(true)
  })
})
