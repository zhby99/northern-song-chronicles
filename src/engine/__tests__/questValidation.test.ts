import { describe, expect, it } from 'vitest'
import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import { buildQuestDependencyGraph } from '../quest/questGraphBuilder'
import { preloadAllQuestScenes } from '../quest/sceneRegistry'
import { validateAllRegisteredQuests } from '../questEngine'

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
