import { describe, expect, it } from 'vitest'
import { QUEST_EFFECT_HANDLERS, type QuestEffectBatchContext } from '../quest/effectHandlers'
import { createInitialStoreData } from '../../store/storeHelpers'
import type { GameStoreState } from '../../store/storeTypes'
import type { SectRankLevel } from '../../types/game'

function runSetSectRank(sectId: string, curRank: SectRankLevel, rank: SectRankLevel, promoteOnly?: boolean) {
  const base = createInitialStoreData()
  let draft = {
    ...base,
    sectState: { ...base.sectState, sectId, rank, rankLabel: '' },
  } as unknown as GameStoreState
  draft = { ...draft, sectState: { ...draft.sectState, rank: curRank } }
  const ctx = {
    get draft() {
      return draft
    },
    patchDraft: (p: Partial<GameStoreState>) => {
      draft = { ...draft, ...p }
    },
  } as unknown as QuestEffectBatchContext
  QUEST_EFFECT_HANDLERS.setSectRank({ type: 'setSectRank', sectId, rank, promoteOnly }, ctx)
  return draft
}

describe('setSectRank promoteOnly', () => {
  it('never demotes a player already above the target rank (Huashan quests on legacy saves)', () => {
    const after = runSetSectRank('SECT-05', 4, 2, true)
    expect(after.sectState.rank).toBe(4)
  })

  it('still promotes with promoteOnly and uses sect wording instead of military wording', () => {
    const after = runSetSectRank('SECT-05', 1, 2, true)
    expect(after.sectState.rank).toBe(2)
    expect(after.logs[0]?.text ?? '').not.toContain('军职')
  })

  it('keeps explicit demotion for official sects when promoteOnly is not set', () => {
    const after = runSetSectRank('SECT-33', 4, 2)
    expect(after.sectState.rank).toBe(2)
  })
})
