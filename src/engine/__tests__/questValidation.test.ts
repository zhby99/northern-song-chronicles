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

  it('requires 经义 and 辩才 (not 策论) for Shaolin 千僧列阵 (QST-SECT-01-41)', () => {
    const q = QUEST_MAP['QST-SECT-01-41']
    expect(q).toBeDefined()
    const conds = q?.startCondition?.type === 'all' ? q.startCondition.conditions : []
    const skillReqs = conds.filter((c) => c.type === 'skillAtLeast')
    expect(skillReqs.some((c) => c.key === '经义')).toBe(true)
    expect(skillReqs.some((c) => c.key === '辩才')).toBe(true)
    expect(skillReqs.some((c) => c.key === '策论')).toBe(false)
  })

  it('rejects synthetic temporary quest NPCs with >=4 martial arts or over-tier arts for 三流/二流', () => {
    const mkSyntheticQuest = (
      id: string,
      realm: string,
      equippedArts: Record<string, string | null>,
      learnedArts: Array<{ artId: string; level: number }>,
    ) => ({
      id,
      title: '测试临时NPC护栏',
      category: 'adventure' as const,
      summary: '测试',
      initialStepId: 's1',
      steps: { s1: { id: 's1', title: '一', objective: '一' } },
      npcActions: [
        {
          id: 'a1',
          label: '试招',
          visibleWhen: { type: 'questStatus' as const, questId: id, status: 'not_started' as const },
          effects: [
            {
              type: 'startCombat' as const,
              rule: 'spar' as const,
              opponent: {
                kind: 'custom' as const,
                npc: {
                  name: '测试临时敌手',
                  title: '测试',
                  realm,
                  talk: '……',
                  stats: { hp: 300, mp: 100, agi: 30, res: 10, isBenchmark: false },
                  equippedArts: {
                    neigong: equippedArts.neigong ?? null,
                    qinggong: equippedArts.qinggong ?? null,
                    move1: equippedArts.move1 ?? null,
                    move2: equippedArts.move2 ?? null,
                    move3: equippedArts.move3 ?? null,
                    move4: equippedArts.move4 ?? null,
                  },
                  learnedArts: learnedArts.map((x) => ({ ...x, exp: 0 })),
                },
              },
              onWin: [],
            },
          ],
        },
      ],
    })

    // 4 martial arts on any realm should fail
    const res4Arts = validateAllRegisteredQuests([
      mkSyntheticQuest(
        'QST-TEST-4ARTS',
        '一流下品',
        { neigong: 'MA-179', qinggong: 'MA-197', move1: 'MA-182', move2: 'MA-187' },
        [
          { artId: 'MA-179', level: 2 },
          { artId: 'MA-197', level: 2 },
          { artId: 'MA-182', level: 2 },
          { artId: 'MA-187', level: 2 },
        ],
      ),
    ])
    expect(res4Arts.valid).toBe(false)
    expect(res4Arts.errors.some((e) => e.includes('武学数量超限'))).toBe(true)

    // 三流 with 凡品上品 (MA-163) should fail
    const resSanliu = validateAllRegisteredQuests([
      mkSyntheticQuest(
        'QST-TEST-SANLIU',
        '三流上品',
        { neigong: 'MA-179', move1: 'MA-163' },
        [
          { artId: 'MA-179', level: 2 },
          { artId: 'MA-163', level: 2 },
        ],
      ),
    ])
    expect(resSanliu.valid).toBe(false)
    expect(resSanliu.errors.some((e) => e.includes('凡品下品/中品'))).toBe(true)

    // 二流 with 良品上品 (MA-103) or 地阶 (MA-046) should fail
    const resErliu = validateAllRegisteredQuests([
      mkSyntheticQuest(
        'QST-TEST-ERLIU',
        '二流上品',
        { neigong: 'MA-103', move1: 'MA-046' },
        [
          { artId: 'MA-103', level: 3 },
          { artId: 'MA-046', level: 3 },
        ],
      ),
    ])
    expect(resErliu.valid).toBe(false)
    expect(resErliu.errors.filter((e) => e.includes('良品中品及以下')).length).toBe(2)
  })

  it('heals player after every round and ramps 三流下品 -> 三流中品 -> 三流上品 in Huashan Botai Division (QST-SECT-05-02)', async () => {
    await preloadAllQuestScenes()
    const scenes = getLoadedQuestScenes('QST-SECT-05-02')
    expect(scenes).toBeDefined()
    const rounds = [
      { sceneId: 'scene_hsq02_04', expectedRealm: '三流下品' },
      { sceneId: 'scene_hsq02_06', expectedRealm: '三流中品' },
      { sceneId: 'scene_hsq02_09', expectedRealm: '三流上品' },
    ]
    for (const r of rounds) {
      const sc = scenes?.[r.sceneId]
      const combat = sc?.choices
        ?.flatMap((c) => c.effects)
        .find((e) => e.type === 'startCombat')
      expect(combat?.type).toBe('startCombat')
      if (combat?.type === 'startCombat') {
        expect(combat.opponent.kind).toBe('custom')
        if (combat.opponent.kind === 'custom') {
          expect(combat.opponent.npc.realm).toBe(r.expectedRealm)
        }
        expect(
          combat.onWin.some(
            (e) => e.type === 'healPlayer' && e.hpPct === 100 && e.mpPct === 100,
          ),
        ).toBe(true)
      }
    }
  })
})
