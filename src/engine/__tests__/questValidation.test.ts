import { describe, expect, it } from 'vitest'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import type { QuestCondition, QuestEffect } from '../../types/quest'
import { buildQuestDependencyGraph } from '../quest/questGraphBuilder'
import { getLoadedQuestScenes, preloadAllQuestScenes } from '../quest/sceneRegistry'
import {
  computeQuestMaxTenArtsGain,
  MAX_QUEST_TEN_ARTS_GAIN,
  validateAllRegisteredQuests,
} from '../quest/questValidator'

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

  it('enforces 5-sect white-paper entry rule and forbids 天阶/地阶 items in SECT-33 Lv.3-4 side quests', async () => {
    await preloadAllQuestScenes()

    const hasConjunct = (cond: QuestCondition | undefined, fn: (c: QuestCondition) => boolean): boolean => {
      if (!cond) return false
      if (fn(cond)) return true
      if (cond.type === 'all') return cond.conditions.some((sub) => hasConjunct(sub, fn))
      return false
    }

    const whitePaperIds = [
      'QST-SECT-05-ENTRY',
      'QST-SECT-06-ENTRY',
      'QST-SECT-07-ENTRY',
      'QST-SECT-08-ENTRY',
      'QST-SECT-13-ENTRY',
      'QST-SECT-14-ENTRY',
    ]
    for (const qid of whitePaperIds) {
      const q = QUEST_MAP[qid]!
      expect(hasConjunct(q.startCondition, (c) => c.type === 'neverJoinedAnySect')).toBe(true)
      expect(
        hasConjunct(
          q.startCondition,
          (c) => c.type === 'noLearnedArtAtOrAboveTier' && c.tier === '良品下品',
        ),
      ).toBe(true)
    }

    const collectItems = (effs: readonly QuestEffect[] | undefined, out: string[]) => {
      for (const e of effs ?? []) {
        if (e.type === 'giveItem') out.push(e.itemId)
        else if (e.type === 'branch') {
          collectItems(e.thenEffects, out)
          collectItems(e.elseEffects, out)
        } else if (e.type === 'startCombat') {
          collectItems(e.onWin, out)
          collectItems(e.onLose, out)
          collectItems(e.onEscape, out)
          collectItems(e.onDraw, out)
        } else if (e.type === 'openScene' && 'scene' in e) {
          e.scene.choices?.forEach((c) => collectItems(c.effects, out))
          collectItems(e.scene.onFinishEffects, out)
        }
      }
    }

    const sideQuestIds = [
      'QST-SECT-33-FANLOU-NIGHT',
      'QST-SECT-33-YUJINYUAN-HORSE',
      'QST-SECT-33-TAIYUAN-IRON',
      'QST-SECT-33-QINZHOU-HORSE',
    ]
    for (const qid of sideQuestIds) {
      const q = QUEST_MAP[qid]!
      const scenes = getLoadedQuestScenes(qid) ?? q.scenes ?? {}
      const given: string[] = []
      q.locationTriggers?.forEach((t) => collectItems(t.effects, given))
      q.npcActions?.forEach((a) => collectItems(a.effects, given))
      q.spotActions?.forEach((a) => collectItems(a.effects, given))
      for (const sc of Object.values(scenes)) {
        sc.choices?.forEach((c) => collectItems(c.effects, given))
        collectItems(sc.onFinishEffects, given)
      }
      const forbidden = given
        .map((id) => ITEM_DB_MAP[id])
        .filter((d) => d && (d.rarity === '天阶' || d.rarity === '地阶'))
      expect(forbidden).toEqual([])
    }
  })

  it('grants ITM-MSC-022 (Kunlun map) upon completing Xingxiu entry quest so disciples can reach HQ', async () => {
    await preloadAllQuestScenes()
    const scenes = getLoadedQuestScenes('QST-SECT-19-ENTRY')
    const finale = scenes?.scene_xx_16_purple_robe_oath
    expect(finale).toBeDefined()
    const joinChoice = finale?.choices?.find((c) => c.id === 'xx16_join_xingxiu')
    expect(joinChoice).toBeDefined()
    const grantsKunlunMap = joinChoice?.effects?.some(
      (e) => e.type === 'giveItem' && e.itemId === 'ITM-MSC-022' && (e.qty ?? 1) >= 1,
    )
    expect(grantsKunlunMap).toBe(true)
  })
})
