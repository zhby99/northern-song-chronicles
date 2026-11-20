import { describe, expect, it } from 'vitest'
import { QUEST_EFFECT_HANDLERS, type QuestEffectBatchContext } from '../quest/effectHandlers'
import { createInitialStoreData } from '../../store/storeHelpers'
import type { GameStoreState } from '../../store/storeTypes'
import type { QuestEffect, StorySceneDef } from '../../types/quest'
import { getLoadedQuestScenes, preloadAllQuestScenes } from '../quest/sceneRegistry'

function collectTeaches(effs: QuestEffect[] | undefined, out: Extract<QuestEffect, { type: 'teachMartialArt' }>[]) {
  for (const e of effs ?? []) {
    if (e.type === 'teachMartialArt') out.push(e)
    else if (e.type === 'branch') {
      collectTeaches(e.thenEffects, out)
      collectTeaches(e.elseEffects, out)
    }
  }
}

function teachesIn(scenes: StorySceneDef[]) {
  const out: Extract<QuestEffect, { type: 'teachMartialArt' }>[] = []
  for (const sc of scenes) {
    collectTeaches(sc.onFinishEffects, out)
    for (const c of sc.choices ?? []) collectTeaches(c.effects, out)
  }
  return out
}

describe('华山《混元功》提前传授', () => {
  it('气宗 Q03 与剑宗 Q06（二流下品前后）即传《混元功》并顶替华山基础心法', async () => {
    await preloadAllQuestScenes()
    for (const qid of ['QST-SECT-05-03', 'QST-SECT-05-06']) {
      const scenes = Object.values(getLoadedQuestScenes(qid) ?? {})
      const teach = teachesIn(scenes).find((t) => t.artId === 'MA-058')
      expect(teach, qid).toBeDefined()
      expect(teach!.autoEquip).toBe(true)
      expect(teach!.replaceArtIds).toContain('MA-160')
    }
  })

  it('replaceArtIds 让传功顶替入门心法运使栏', () => {
    const base = createInitialStoreData()
    let draft = {
      ...base,
      learnedArts: [{ artId: 'MA-160', level: 10, exp: 0 }],
      equippedArts: { ...base.equippedArts, neigong: 'MA-160' },
    } as unknown as GameStoreState
    const ctx = {
      get draft() {
        return draft
      },
      patchDraft: (p: Partial<GameStoreState>) => {
        draft = { ...draft, ...p }
      },
    } as unknown as QuestEffectBatchContext
    QUEST_EFFECT_HANDLERS.teachMartialArt(
      { type: 'teachMartialArt', artId: 'MA-058', level: 1, autoEquip: true, replaceArtIds: ['MA-160'] },
      ctx,
    )
    expect(draft.equippedArts.neigong).toBe('MA-058')
    expect(draft.learnedArts.find((a) => a.artId === 'MA-058')?.level).toBe(1)
  })
})

describe('华山《混元功》旧档补授', () => {
  it('Q03 挂有补授动作，未习得《混元功》时可见', async () => {
    const { QUEST_MAP } = await import('../../data/quests')
    const act = QUEST_MAP['QST-SECT-05-03']!.npcActions!.find((a) => a.id === 'act_hs_hunyuan_catchup_npc')
    expect(act).toBeDefined()
    expect(JSON.stringify(act!.visibleWhen)).toContain('MA-058')
  })
})
