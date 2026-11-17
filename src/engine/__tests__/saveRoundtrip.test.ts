import { describe, expect, it } from 'vitest'
import { useGameStore } from '../../store/useGameStore'
import { validateSaveEnvelope } from '../../utils/saveManager'

describe('saveManager roundtrip serialization', () => {
  it('roundtrips full store state including empty learnedArts: [] and quest/art progression', () => {
    const store = useGameStore.getState()
    const baseEnvelope = store.buildSaveEnvelope('slot-1', '单元测试存档')

    // Mutate critical edge cases: zero learnedArts, custom artExps, flags, active quests
    const modifiedEnvelope = {
      ...baseEnvelope,
      state: {
        ...baseEnvelope.state,
        playerName: '赵子龙',
        dayCount: 735,
        shichenIdx: 7,
        silver: 4321,
        learnedArts: [],
        equippedArts: {
          neigong: null,
          qinggong: null,
          move1: null,
          move2: null,
          move3: null,
          move4: null,
        },
        artExps: { 经义: 1200, 算术: 450 },
        artMilestoneFlags: ['经义:80'],
        questState: {
          ...baseEnvelope.state.questState,
          flags: { taihang_heavy_injury: true, test_marker: 'ok' },
        },
      },
    }

    const rawJson = JSON.stringify(modifiedEnvelope)
    const parsed = JSON.parse(rawJson) as unknown
    const validated = validateSaveEnvelope(parsed)

    expect(validated).not.toBeNull()
    expect(validated?.state.playerName).toBe('赵子龙')
    expect(validated?.state.dayCount).toBe(735)
    expect(validated?.state.shichenIdx).toBe(7)
    expect(validated?.state.silver).toBe(4321)
    expect(validated?.state.learnedArts).toEqual([])
    expect(validated?.state.artExps?.经义).toBe(1200)
    expect(validated?.state.artMilestoneFlags).toEqual(['经义:80'])
    expect(validated?.state.questState?.flags.taihang_heavy_injury).toBe(true)
    expect(validated?.state.questState?.flags.test_marker).toBe('ok')
  })

  it('rejects invalid schema versions or malformed envelopes cleanly', () => {
    expect(validateSaveEnvelope(null)).toBeNull()
    expect(validateSaveEnvelope({ gameTitle: '北宋立志传', schemaVersion: 'OLD_V0' })).toBeNull()
  })
})
