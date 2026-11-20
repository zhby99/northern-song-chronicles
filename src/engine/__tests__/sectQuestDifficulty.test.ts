import { beforeEach, describe, expect, it } from 'vitest'
import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import { NPC_DB_MAP } from '../../data/gameDb'
import type { QuestCombatOpponentSpec, QuestDefinition, QuestEffect } from '../../types/quest'
import { parseRealmTier } from '../stats/realmUtils'
import { scaleNodeNpcDownToRealm, buildNodeNpcFromCompiledId } from '../npcFactory'
import { getLoadedQuestScenes, preloadAllQuestScenes } from '../quest/sceneRegistry'
import { buildAvailableQuestEntries, getSuggestedSectMainQuest, isQuestPermanentlyClosed } from '../quest/sectQuestGuide'
import { getSectMonthlyStipend } from '../sect/stipends'
import { isFreeSectTenArtStudy } from '../stats/heroStats'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import { makeQuestNpc } from '../quest/dsl'
import { SHAOLIN_STARTER_GEAR_IDS, SHAOLIN_STARTER_KIT_EFFECTS } from '../../data/quests/sects/sectStarterKits'

const GUARDED_SECTS = ['SECT-01', 'SECT-05', 'SECT-11']

function realmRankOfSpec(spec: QuestCombatOpponentSpec, actors: Record<string, string>): number {
  if (spec.kind === 'npc') return parseRealmTier(spec.realmCap ?? NPC_DB_MAP[spec.npcId]?.realm).rank
  if (spec.kind === 'custom') return parseRealmTier(spec.npc.realm).rank
  if (spec.kind === 'dynamicActor') return parseRealmTier(actors[spec.actorId]).rank
  return 0
}

function collectCombats(node: unknown, out: Extract<QuestEffect, { type: 'startCombat' }>[], actors: Record<string, string>) {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    node.forEach((n) => collectCombats(n, out, actors))
    return
  }
  const obj = node as Record<string, unknown>
  const actor = obj.actor as { actorId?: string; npc?: { realm?: string }; realm?: string } | undefined
  if (actor?.actorId) actors[actor.actorId] = actor.npc?.realm ?? actor.realm ?? ''
  if (obj.type === 'startCombat') out.push(obj as Extract<QuestEffect, { type: 'startCombat' }>)
  for (const v of Object.values(obj)) collectCombats(v, out, actors)
}

function lowerBoundRank(q: QuestDefinition): number {
  const lo = (q.recommendedRealm ?? '').split(/[～~]/)[0]?.trim()
  return parseRealmTier(lo).rank
}

describe('少林 / 华山 / 终南：剧情围攻难度护栏', () => {
  it('同时围攻（1vN 且无对等同伴）的每个敌人都须比任务推荐下限低两档以上，否则必须改为车轮连战', async () => {
    await preloadAllQuestScenes()
    const violations: string[] = []
    for (const q of QUEST_REGISTRY) {
      if (!GUARDED_SECTS.includes(q.factionId ?? '')) continue
      const combats: Extract<QuestEffect, { type: 'startCombat' }>[] = []
      const actors: Record<string, string> = {}
      collectCombats(getLoadedQuestScenes(q.id), combats, actors)
      collectCombats([q.locationTriggers, q.spotActions, q.npcActions], combats, actors)
      const cap = lowerBoundRank(q) - 2
      for (const c of combats) {
        const extras = c.extraOpponents ?? []
        if (extras.length === 0 || c.format === 'gauntlet') continue
        if ((c.allies?.length ?? 0) >= extras.length) continue
        const top = Math.max(...[c.opponent, ...extras].map((s) => realmRankOfSpec(s, actors)))
        if (top > cap) violations.push(`${q.id}: 敌方最高 r${top} > 允许 r${cap}`)
      }
    }
    expect(violations).toEqual([])
  })
})

describe('车轮连战（format: gauntlet）', () => {
  beforeEach(() => {
    useGameStore.setState({ activeCombat: null, activeStoryScene: null, gameOver: null })
  })

  it('逐阵单挑：首阵只有一名对手，胜后调息并迎下一阵，末阵获胜才执行原 onWin', () => {
    const mk = (id: string) =>
      makeQuestNpc({ id, name: id, title: '恶徒', talk: '……', realm: '不入流', stats: { hp: 200, mp: 50, agi: 10, res: 5 } })
    useGameStore.getState().runQuestEffects(
      [
        {
          type: 'startCombat',
          format: 'gauntlet',
          opponent: { kind: 'custom', npc: mk('A') },
          extraOpponents: [{ kind: 'custom', npc: mk('B') }],
          rule: 'story_trial',
          introText: '【车轮连战 · 测试】',
          onWin: [{ type: 'setFlag', flag: 'gauntlet_done', value: true }],
        },
      ],
      null,
    )
    const first = useGameStore.getState().activeCombat!
    expect(first.npc.name).toBe('A')
    expect(first.enemies?.length ?? 1).toBe(1)
    const hook = first.questCombatHook!
    expect(hook.onWin.some((e) => e.type === 'healPlayer')).toBe(true)
    const next = hook.onWin.find((e) => e.type === 'startCombat') as Extract<QuestEffect, { type: 'startCombat' }>
    expect(next.opponent).toMatchObject({ kind: 'custom' })
    expect(next.onWin).toEqual([{ type: 'setFlag', flag: 'gauntlet_done', value: true }])

    useGameStore.setState({ activeCombat: null })
    useGameStore.getState().runQuestEffects([next], null)
    const second = useGameStore.getState().activeCombat!
    expect(second.npc.name).toBe('B')
    expect(second.questCombatHook!.onWin).toEqual([{ type: 'setFlag', flag: 'gauntlet_done', value: true }])
  })
})

describe('realmCap：图鉴境界高于剧情设定时按设定压低', () => {
  it('周海（图鉴三流中品）在罗汉开蒙中按三流下品出战', () => {
    const base = buildNodeNpcFromCompiledId('NPC-0673')!
    const capped = scaleNodeNpcDownToRealm(base, '三流下品')
    expect(capped.realm).toBe('三流下品')
    expect(capped.stats!.hp).toBeLessThan(base.stats!.hp)
    expect(capped.stats!.mp).toBeLessThan(base.stats!.mp)
    // 只降不升
    expect(scaleNodeNpcDownToRealm(base, '一流上品')).toBe(base)
  })
})

describe('少林常住单银与寺内免束脩', () => {
  it('Lv.1~4 月俸 1 / 3 / 5 / 10 两', () => {
    expect([1, 2, 3, 4].map((r) => getSectMonthlyStipend('SECT-01', r as 1 | 2 | 3 | 4))).toEqual([1, 3, 5, 10])
  })

  it('少林门人在嵩山少林寺内修习十艺免费，离寺或他派照常收费', () => {
    expect(isFreeSectTenArtStudy('shaolin', null, 'SECT-01')).toBe(true)
    expect(isFreeSectTenArtStudy('luoyang', null, 'SECT-01')).toBe(false)
    expect(isFreeSectTenArtStudy('huashan', null, 'SECT-05')).toBe(false)
  })
})

describe('少林起步行装', () => {
  it('发放一套良阶披挂配饰与良品轻功《穿云纵》', () => {
    useGameStore.setState({ learnedArts: [], inventory: [] })
    useGameStore.getState().runQuestEffects(SHAOLIN_STARTER_KIT_EFFECTS, null)
    const s = useGameStore.getState()
    expect(s.learnedArts.some((a) => a.artId === 'MA-139')).toBe(true)
    for (const id of SHAOLIN_STARTER_GEAR_IDS) {
      expect(s.inventory.some((st) => st.itemId === id)).toBe(true)
    }
    expect(s.questState.flags.sl_starter_kit_granted).toBe(true)
  })
})

describe('门派主线下一步建议', () => {
  it('入门后推荐首章；首章完成后推荐次章并列出未满足条件', () => {
    const st = useGameStore.getState()
    useGameStore.setState({
      sectState: { ...st.sectState, sectId: 'SECT-01', rank: 1, rankLabel: '外门' },
      questState: {
        ...st.questState,
        activeQuests: {},
        completedQuests: { 'QST-SECT-01-ENTRY': { questId: 'QST-SECT-01-ENTRY', outcome: 'completed', completedDay: 1, count: 1 } },
      } as typeof st.questState,
    })
    const sug1 = getSuggestedSectMainQuest(buildStoreEvalContext(useGameStore.getState()), QUEST_REGISTRY, QUEST_MAP)
    expect(sug1?.quest.id).toBe('QST-SECT-01-01')

    const s2 = useGameStore.getState()
    useGameStore.setState({
      questState: {
        ...s2.questState,
        completedQuests: {
          ...s2.questState.completedQuests,
          'QST-SECT-01-01': { questId: 'QST-SECT-01-01', outcome: 'completed', completedDay: 2, count: 1 },
        },
      } as typeof s2.questState,
    })
    const sug2 = getSuggestedSectMainQuest(buildStoreEvalContext(useGameStore.getState()), QUEST_REGISTRY, QUEST_MAP)
    expect(sug2?.quest.id).toBe('QST-SECT-01-02')
    if (!sug2!.available) expect(sug2!.unmetReasons.length).toBeGreaterThan(0)
  })
})

describe('江湖纪事可接列表：本门优先、他派隐藏、绝路不列', () => {
  it('只列本门师门要务，主线在前、支线在后，路线已断的任务不列', () => {
    const st = useGameStore.getState()
    useGameStore.setState({
      sectState: { ...st.sectState, sectId: 'SECT-01', rank: 1, rankLabel: '外门' },
      deadNpcIds: [],
      questState: {
        ...st.questState,
        activeQuests: {},
        flags: { shaolin_disciple_type: 'layman', sl_branch: 'layman' },
        completedQuests: { 'QST-SECT-01-ENTRY': { questId: 'QST-SECT-01-ENTRY', outcome: 'completed', completedDay: 1, count: 1 } },
      } as typeof st.questState,
    })
    const ctx = buildStoreEvalContext(useGameStore.getState())
    const entries = buildAvailableQuestEntries(ctx, QUEST_REGISTRY, QUEST_MAP)
    const ids = entries.map((e) => e.quest.id)

    const foreign = entries.filter((e) => e.quest.category === 'sect_mission' && e.quest.factionId !== 'SECT-01')
    expect(foreign).toEqual([])
    expect(ids[0]).toBe('QST-SECT-01-01')
    expect(entries[0].suggested).toBe(true)
    const groups = entries.map((e) => e.group)
    expect([...groups].sort((a, b) => a - b)).toEqual(groups)
    expect(entries.some((e) => e.group === 1)).toBe(true)
    // 俗家路线：出家专属终局《铁腕法王》永久关闭
    expect(ids).not.toContain('QST-SECT-01-39')
    expect(isQuestPermanentlyClosed(QUEST_MAP['QST-SECT-01-39'], ctx, QUEST_MAP)).toBe(true)
  })

  it('未入门派时不列任何师门要务', () => {
    const st = useGameStore.getState()
    useGameStore.setState({ sectState: { ...st.sectState, sectId: null, rank: 1, rankLabel: '' } })
    const entries = buildAvailableQuestEntries(buildStoreEvalContext(useGameStore.getState()), QUEST_REGISTRY, QUEST_MAP)
    expect(entries.filter((e) => e.quest.category === 'sect_mission')).toEqual([])
  })
})

describe('门派支线日常均奖励江湖声望', () => {
  it('少林 / 华山 / 终南每条 SIDE 支线结算时都有 modifyRenown 正向奖励', async () => {
    await preloadAllQuestScenes()
    const missing: string[] = []
    for (const q of QUEST_REGISTRY) {
      if (!/^QST-SECT-(01|05|11)-SIDE-/.test(q.id)) continue
      const found: number[] = []
      const walk = (n: unknown) => {
        if (!n || typeof n !== 'object') return
        if (Array.isArray(n)) return n.forEach(walk)
        const o = n as Record<string, unknown>
        if (o.type === 'modifyRenown' && typeof o.delta === 'number') found.push(o.delta)
        Object.values(o).forEach(walk)
      }
      walk([getLoadedQuestScenes(q.id), q.npcActions, q.spotActions, q.locationTriggers])
      if (!found.some((d) => d > 0)) missing.push(q.id)
    }
    expect(missing).toEqual([])
  })
})

describe('掌门自取本门全部功法', () => {
  it('一流门派掌门（Lv.5）可在门派事务中直接修习剧情亲授的本门功法，Lv.4 仍不可', async () => {
    const { getSectTeachableArts } = await import('../sect')
    const st = useGameStore.getState()
    const target = [...getSectTeachableArts('SECT-05')].sort((a, b) => b.requiredRank - a.requiredRank)[0]!
    const maxed = (o: Record<string, number>) => Object.fromEntries(Object.keys(o).map((k) => [k, 100]))
    const strong = { ...st.baseStats, talents: { 根骨: 100, 悟性: 100, 颜值: 100 } }
    for (const [rank, expectLearned] of [[4, false], [5, true]] as const) {
      useGameStore.setState({
        sectState: { ...st.sectState, sectId: 'SECT-05', rank, rankLabel: rank === 5 ? '掌门' : '长老' },
        learnedArts: [],
        baseStats: strong,
        skills: maxed(st.skills),
        ridingSkill: 100,
        maxHp: 99999,
        maxMp: 99999,
        agility: 999,
        res: 999,
      })
      useGameStore.getState().learnSectMartialArt(target.art.id)
      const learned = useGameStore.getState().learnedArts.some((a) => a.artId === target.art.id)
      expect(learned, `${rank} → ${useGameStore.getState().actionFeedback?.text}`).toBe(expectLearned)
    }
  })
})
