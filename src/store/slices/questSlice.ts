import type { StoreSlice } from '../storeTypes'
import { QUEST_MAP } from '../../data/quests'
import { executeQuestEffectsBatch } from '../../engine/quest/effectHandlers'
import {
  cloneQuestRuntimeState,
  evaluateQuestCondition,
  findMatchingLocationTriggers,
} from '../../engine/questEngine'
import { buildStoreEvalContext } from '../storeHelpers'

export type QuestKeys =
  | 'toggleHideTrackedQuest'
  | 'unhideAllTrackedQuests'
  | 'runQuestEffects'
  | 'advanceStoryScene'
  | 'selectStoryChoice'
  | 'closeStoryScene'
  | 'fireLocationTriggersForCurrentSpot'
  | 'checkExpiredQuestDeadlines'

export const createQuestSlice: StoreSlice<QuestKeys> = (set, get) => ({
  toggleHideTrackedQuest: (trackKey) =>
    set((s) => {
      const exists = s.hiddenQuestIds.includes(trackKey)
      return {
        hiddenQuestIds: exists
          ? s.hiddenQuestIds.filter((id) => id !== trackKey)
          : [...s.hiddenQuestIds, trackKey],
      }
    }),
  unhideAllTrackedQuests: () => set({ hiddenQuestIds: [] }),

  runQuestEffects: (effects, contextNpc = null) => {
    executeQuestEffectsBatch({
      effects,
      contextNpc,
      set,
      get,
    })
  },

  advanceStoryScene: () => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur) return

    if (cur.beatIndex + 1 < cur.scene.beats.length) {
      set({
        activeStoryScene: {
          ...cur,
          beatIndex: cur.beatIndex + 1,
        },
      })
      return
    }

    // Reached final beat: if there are no choices, close scene and execute onFinishEffects
    if (!cur.scene.choices || cur.scene.choices.length === 0) {
      const finishEffects = cur.scene.onFinishEffects ?? []
      const ctxNpc = cur.contextNpc
      set({ activeStoryScene: null })
      if (finishEffects.length > 0) {
        get().runQuestEffects(finishEffects, ctxNpc)
      }
    }
  },

  selectStoryChoice: (choiceId) => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur || !cur.scene.choices) return
    const choice = cur.scene.choices.find((c) => c.id === choiceId)
    if (!choice) return

    if (choice.condition) {
      const check = evaluateQuestCondition(
        choice.condition,
        buildStoreEvalContext(s, cur.contextNpc),
      )
      if (!check.passed) {
        set({
          actionFeedback: {
            text: check.reason ?? '尚未满足该抉择条件。',
            tone: 'warn',
          },
        })
        return
      }
    }

    const ctxNpc = cur.contextNpc
    set({ activeStoryScene: null })
    if (choice.effects.length > 0) {
      get().runQuestEffects(choice.effects, ctxNpc)
    }
  },

  closeStoryScene: () => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur || cur.scene.mandatory) return
    // Only allow direct close if there are no choices, or if one of the choices has empty effects
    if (cur.scene.choices && cur.scene.choices.length > 0) {
      const safeExit = cur.scene.choices.find((c) => !c.condition && c.effects.length === 0)
      if (!safeExit) return
      set({ activeStoryScene: null })
      return
    }
    const finishEffects = cur.scene.onFinishEffects ?? []
    const ctxNpc = cur.contextNpc
    set({ activeStoryScene: null })
    if (finishEffects.length > 0) {
      get().runQuestEffects(finishEffects, ctxNpc)
    }
  },

  fireLocationTriggersForCurrentSpot: (loc) => {
    const s = get()
    if (s.gameOver || s.activeCombat) return false
    const matched = findMatchingLocationTriggers(loc, buildStoreEvalContext(s))
    if (matched.length === 0) return false

    for (const { quest, trigger } of matched) {
      const latest = get()
      if (latest.gameOver || latest.activeCombat) break
      if (trigger.onceFlag) {
        const nextQuest = cloneQuestRuntimeState(latest.questState)
        nextQuest.flags[trigger.onceFlag] = true
        set({ questState: nextQuest })
      }
      executeQuestEffectsBatch({
        effects: trigger.effects,
        contextNpc: null,
        questIdHint: quest.id,
        set,
        get,
      })
    }
    return true
  },

  checkExpiredQuestDeadlines: () => {
    const s = get()
    if (s.gameOver) return
    const activeEntries = Object.values(s.questState.activeQuests)
    for (const prog of activeEntries) {
      if (prog.deadlineDay === null || s.dayCount <= prog.deadlineDay) continue
      const qDef = QUEST_MAP[prog.questId]
      // Clear deadline first so it never loops infinitely
      const nextQuest = cloneQuestRuntimeState(get().questState)
      if (nextQuest.activeQuests[prog.questId]) {
        nextQuest.activeQuests[prog.questId] = {
          ...nextQuest.activeQuests[prog.questId]!,
          deadlineDay: null,
        }
        set({ questState: nextQuest })
      }
      if (
        qDef?.onDeadlineExpired &&
        (!qDef.onDeadlineExpired.stepId || qDef.onDeadlineExpired.stepId === prog.stepId)
      ) {
        executeQuestEffectsBatch({
          effects: qDef.onDeadlineExpired.effects,
          contextNpc: null,
          questIdHint: prog.questId,
          set,
          get,
        })
      }
    }
  },
})
