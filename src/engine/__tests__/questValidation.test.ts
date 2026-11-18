import { describe, expect, it } from 'vitest'
import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import { buildQuestDependencyGraph } from '../quest/questGraphBuilder'
import { preloadAllQuestScenes } from '../quest/sceneRegistry'
import {
  computeQuestMaxTenArtsGain,
  MAX_QUEST_TEN_ARTS_GAIN,
  validateAllRegisteredQuests,
} from '../questEngine'

describe('validateAllRegisteredQuests & buildQuestDependencyGraph', () => {
  it('validates all 29 registered quest chains (including lazy scenes) with zero broken references', async () => {
    expect(Object.isFrozen(QUEST_REGISTRY)).toBe(true)
    expect(Object.isFrozen(QUEST_MAP)).toBe(true)
    expect(QUEST_REGISTRY.length).toBeGreaterThanOrEqual(29)
    await preloadAllQuestScenes()
    const result = validateAllRegisteredQuests(QUEST_REGISTRY)
    expect(result.errors).toEqual([])
    expect(result.valid).toBe(true)
  })

  it('enforces single-quest Ten-Arts gain cap (<= 3 points) across any reachable path', async () => {
    await preloadAllQuestScenes()
    const overCap = QUEST_REGISTRY.map((q) => ({
      id: q.id,
      gain: computeQuestMaxTenArtsGain(q),
    })).filter((item) => item.gain > MAX_QUEST_TEN_ARTS_GAIN)
    expect(overCap).toEqual([])
  })

  it('detects synthetic quests exceeding the single-quest Ten-Arts cap', () => {
    const syntheticOverCapQuest = {
      id: 'QST-TEST-OVER-CAP',
      title: '测试超限任务',
      category: 'adventure' as const,
      summary: '测试',
      initialStepId: 'step1',
      steps: {
        step1: { id: 'step1', title: '第一步', objective: '第一步' },
        step2: { id: 'step2', title: '第二步', objective: '第二步' },
      },
      npcActions: [
        {
          id: 'act1',
          label: '推进第一步',
          visibleWhen: { type: 'questStatus' as const, questId: 'QST-TEST-OVER-CAP', status: 'not_started' as const },
          effects: [
            { type: 'startQuest' as const, questId: 'QST-TEST-OVER-CAP', stepId: 'step1' },
            { type: 'modifySkill' as const, key: '经义' as const, delta: 2 },
            { type: 'setQuestStep' as const, questId: 'QST-TEST-OVER-CAP', stepId: 'step2' },
          ],
        },
        {
          id: 'act2',
          label: '收尾获书',
          visibleWhen: { type: 'questStatus' as const, questId: 'QST-TEST-OVER-CAP', status: 'active' as const, stepId: 'step2' },
          effects: [
            { type: 'giveItem' as const, itemId: 'ITM-MSC-025', qty: 1 },
            { type: 'completeQuest' as const, questId: 'QST-TEST-OVER-CAP', outcome: 'done' },
          ],
        },
      ],
    }
    expect(computeQuestMaxTenArtsGain(syntheticOverCapQuest, {})).toBe(4)
  })

  it('auto-derives collision-free quest DAG layout and solid/dashed edges from QUEST_REGISTRY', () => {
    const graph = buildQuestDependencyGraph(QUEST_REGISTRY)
    expect(graph.nodes.length).toBe(QUEST_REGISTRY.length)
    expect(graph.edges.length).toBeGreaterThanOrEqual(15)

    const seenCoords = new Set<string>()
    const nodeById = new Map(graph.nodes.map((n) => [n.questId, n]))
    for (const n of graph.nodes) {
      const key = `${n.row}:${n.col}`
      expect(seenCoords.has(key)).toBe(false)
      seenCoords.add(key)
      expect(n.col).toBeGreaterThanOrEqual(0)
      expect(n.col).toBeLessThan(7)
      expect(n.prereqs.length).toBeGreaterThan(0)
    }

    for (const e of graph.edges) {
      const src = nodeById.get(e.from)
      const dst = nodeById.get(e.to)
      expect(src).toBeDefined()
      expect(dst).toBeDefined()
      expect(src!.row).toBeLessThan(dst!.row)
    }
  })
})
