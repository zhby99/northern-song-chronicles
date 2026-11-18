import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_EQUIPPED_SLOTS } from '../../data/itemsDb'
import { QUEST_MAP, QUEST_REGISTRY } from '../../data/quests'
import { buildQuestDependencyGraph } from '../quest/questGraphBuilder'
import { preloadAllQuestScenes } from '../quest/sceneRegistry'
import { evaluateQuestCondition, interpolateStoryText } from '../questEngine'
import { createSeededRng, setGameRng } from '../combat'
import { clonePlayerSectState } from '../sect'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'

const INITIAL_STATE = useGameStore.getState()

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
  setGameRng(createSeededRng(17))
})
afterEach(() => setGameRng(null))

describe('effective talents in quest conditions & beginner entry caps', () => {
  it('talentAtLeast evaluates effective talents (gear 颜值 + equipped art 根骨)', () => {
    const base = useGameStore.getState().baseStats
    useGameStore.setState({
      baseStats: {
        ...base,
        talents: { 根骨: 89, 悟性: 70, 颜值: 86 },
      },
      equipped: { ...DEFAULT_EQUIPPED_SLOTS, accessory1: 'ACC-001' }, // +6 颜值 => 92
      equippedArts: {
        neigong: 'MA-001', // +2 根骨 => 91
        qinggong: null,
        move1: null,
        move2: null,
        move3: null,
        move4: null,
      },
      learnedArts: [{ artId: 'MA-001', level: 1, exp: 0 }],
    })

    const ctx = buildStoreEvalContext(useGameStore.getState(), null)
    expect(
      evaluateQuestCondition({ type: 'talentAtLeast', key: '颜值', min: 90 }, ctx).passed,
    ).toBe(true)
    expect(
      evaluateQuestCondition({ type: 'talentAtLeast', key: '根骨', min: 90 }, ctx).passed,
    ).toBe(true)
    expect(
      evaluateQuestCondition({ type: 'talentAtMost', key: '颜值', max: 90 }, ctx).passed,
    ).toBe(false)
  })

  it('beginner sect entry quests do not require raw unboostable talents above TALENT_MAX (90)', async () => {
    await preloadAllQuestScenes()
    const beginnerEntryIds = [
      'QST-SECT-03-ENTRY',
      'QST-SECT-06-ENTRY',
      'QST-SECT-07-ENTRY',
      'QST-SECT-14-ENTRY',
    ]
    const over90: string[] = []
    const walk = (node: unknown, path: string) => {
      if (Array.isArray(node)) {
        node.forEach((n, i) => walk(n, `${path}[${i}]`))
      } else if (node && typeof node === 'object') {
        const o = node as Record<string, unknown>
        if (o.type === 'talentAtLeast' && typeof o.min === 'number' && o.min > 90) {
          over90.push(`${path}:${String(o.key)}>=${o.min}`)
        }
        for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`)
      }
    }
    for (const qid of beginnerEntryIds) {
      const q = QUEST_MAP[qid]!
      walk(q, qid)
      if (q.loadScenes) walk(await q.loadScenes(), `${qid}:scenes`)
    }
    expect(over90).toEqual([])
  })
})

describe('sect join cleanup & monastic secular restoration', () => {
  it('sectSlice.joinSect drops rival incomplete sect entry quests and dynamic actors', () => {
    useGameStore.setState({
      questState: {
        activeQuests: {
          'QST-SECT-07-ENTRY': {
            questId: 'QST-SECT-07-ENTRY',
            stepId: 'step_1',
            startedDay: 1,
            deadlineDay: null,
            vars: {},
          },
          'QST-ADV-YANZIWU-MAP': {
            questId: 'QST-ADV-YANZIWU-MAP',
            stepId: 'investigate_murong_hall',
            startedDay: 1,
            deadlineDay: null,
            vars: {},
          },
        },
        completedQuests: {},
        flags: {},
        dynamicActors: [
          {
            actorId: 'ACT-TEST-EMEI',
            questId: 'QST-SECT-07-ENTRY',
            name: '试炼弟子',
            title: '峨眉弟子',
            regionId: 'emei',
            buildingId: 'em_jinding',
            spotId: null,
            realm: '三流下品',
            stats: { hp: 200, mp: 100, agi: 20, res: 10, isBenchmark: false },
            talk: '',
          },
        ],
      },
    })

    // Join second-tier sect SECT-22 (Changshan Zhao) via panel joinSect
    useGameStore.setState({
      currentNodeId: 'zhending',
      activeRegionId: 'zhending',
      chivalry: 100,
      renown: 100,
    })
    useGameStore.getState().joinSect('SECT-22')

    const after = useGameStore.getState()
    expect(after.sectState.sectId).toBe('SECT-22')
    expect(after.questState.activeQuests['QST-SECT-07-ENTRY']).toBeUndefined()
    expect(after.questState.activeQuests['QST-ADV-YANZIWU-MAP']).toBeDefined()
    expect(
      after.questState.dynamicActors.some((a) => a.questId === 'QST-SECT-07-ENTRY'),
    ).toBe(false)
  })

  it('ordainShaolinMonk saves secular identity and leaveSect restores it (preserving female portrait)', () => {
    // Male protagonist: portrait switches to hero_02_shaolin, then restores on leaveSect
    useGameStore.setState({
      playerName: '赵子龙',
      playerGender: '男',
      playerPortraitId: 'hero_01_jianghu',
      sectState: {
        ...clonePlayerSectState(),
        sectId: 'SECT-01',
        rank: 1,
        joinedDay: 1,
      },
    })
    useGameStore
      .getState()
      .runQuestEffects(
        [{ type: 'ordainShaolinMonk', dharmaName: '慧真', portraitId: 'hero_02_shaolin' }],
        null,
      )
    const ordainedMale = useGameStore.getState()
    expect(ordainedMale.playerName).toBe('慧真')
    expect(ordainedMale.playerPortraitId).toBe('hero_02_shaolin')
    expect(ordainedMale.questState.flags.secular_player_name).toBe('赵子龙')
    expect(ordainedMale.questState.flags.secular_player_portrait_id).toBe('hero_01_jianghu')

    useGameStore.getState().leaveSect()
    const restoredMale = useGameStore.getState()
    expect(restoredMale.playerName).toBe('赵子龙')
    expect(restoredMale.playerPortraitId).toBe('hero_01_jianghu')

    // Female protagonist: portrait is NOT overwritten to male bald monk hero_02_shaolin
    useGameStore.setState({
      playerName: '苏婉清',
      playerGender: '女',
      playerPortraitId: 'hero_07_swordswoman',
      sectState: {
        ...clonePlayerSectState(),
        sectId: 'SECT-03',
        rank: 1,
        joinedDay: 1,
      },
      questState: { activeQuests: {}, completedQuests: {}, flags: {}, dynamicActors: [] },
    })
    useGameStore
      .getState()
      .runQuestEffects(
        [
          {
            type: 'ordainShaolinMonk',
            dharmaName: '明净',
            portraitId: 'hero_02_shaolin',
            sectId: 'SECT-03',
          },
        ],
        null,
      )
    expect(useGameStore.getState().playerPortraitId).toBe('hero_07_swordswoman')
  })
})

describe('npcAlive, markNpcsDead & cross-quest continuity fixes', () => {
  it('blocks Xingxiu entry quest when Ding Chunqiu (NPC-0122) is dead', () => {
    const xingxiuQuest = QUEST_MAP['QST-SECT-19-ENTRY']!
    expect(xingxiuQuest.startCondition).toBeDefined()

    const aliveCtx = buildStoreEvalContext(useGameStore.getState(), null)
    useGameStore.setState({ deadNpcIds: ['NPC-0122'] })
    const deadCtx = buildStoreEvalContext(useGameStore.getState(), null)

    expect(
      evaluateQuestCondition({ type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' }, aliveCtx)
        .passed,
    ).toBe(true)
    const deadRes = evaluateQuestCondition(
      { type: 'npcAlive', npcId: 'NPC-0122', npcName: '丁春秋' },
      deadCtx,
    )
    expect(deadRes.passed).toBe(false)
    expect(deadRes.reason).toContain('丁春秋')
    expect(evaluateQuestCondition(xingxiuQuest.startCondition!, deadCtx).passed).toBe(false)
  })

  it('interpolateStoryText branches cleanly on completed quests and sect state', async () => {
    await preloadAllQuestScenes()
    const jtc1Scenes = await QUEST_MAP['QST-SECT-33-TAIHANG-CAMPAIGN-1']!.loadScenes!()
    const scene28Beat = jtc1Scenes['scene_jtc1_28_twin_chiefs_descend']!.beats[2]!.text

    const withoutBandit = interpolateStoryText(scene28Beat, {
      dayCount: 400,
      sectId: 'SECT-33',
      questState: { completedQuests: {}, flags: {} },
    })
    expect(withoutBandit).not.toContain('跳涧逃命')
    expect(withoutBandit).toContain('屡次坏我绿林道好事')

    const withBandit = interpolateStoryText(scene28Beat, {
      dayCount: 400,
      sectId: 'SECT-33',
      questState: {
        completedQuests: {
          'QST-SECT-17-TAIHANG-BANDIT': {
            questId: 'QST-SECT-17-TAIHANG-BANDIT',
            completedDay: 120,
            outcome: 'survived_and_recovered',
            count: 1,
          },
        },
        flags: {},
      },
    })
    expect(withBandit).toContain('跳涧逃命')
  })

  it('Daming defense-map heist expels SECT-33 Imperial Guard and uses dedicated Zhan Zhao arrest scene', async () => {
    await preloadAllQuestScenes()
    useGameStore.setState({
      sectState: {
        ...clonePlayerSectState(),
        sectId: 'SECT-33',
        rank: 2,
        contribution: 50,
        joinedDay: 1,
      },
    })
    const damingScenes = await QUEST_MAP['QST-CITY-DAMING-BAJI']!.loadScenes!()
    const climaxScene = damingScenes['scene_dm_midnight_sandtable_climax']!
    const heistChoice = climaxScene.choices!.find(
      (c) => c.id === 'choice_sandtable_outlaw_heist',
    )!
    const combatEff = heistChoice.effects[0]!
    expect(combatEff.type).toBe('startCombat')
    if (combatEff.type === 'startCombat') {
      useGameStore.getState().runQuestEffects(combatEff.onWin, null)
    }

    const afterSteal = useGameStore.getState()
    expect(afterSteal.sectState.sectId).toBeNull()
    expect(afterSteal.questState.flags.dm_stole_hebei_defense_map).toBe(true)

    const secondTierScenes = await QUEST_MAP['QST-SECT-18-TOUMINGZHUANG']!.loadScenes!()
    expect(secondTierScenes['scene_zhan_zhao_daming_map_arrest']).toBeDefined()
    expect(
      secondTierScenes['scene_zhan_zhao_daming_map_arrest']!.beats.some((b) =>
        b.text.includes('河北防辽舆图'),
      ),
    ).toBe(true)
  })

  it('questGraphBuilder links referral letter items ITM-MSC-013 and ITM-MSC-007', () => {
    const graph = buildQuestDependencyGraph(QUEST_REGISTRY)
    const changshanEdge = graph.edges.find(
      (e) =>
        e.from === 'QST-SECT-22-LONGLING' &&
        e.relation.includes('常山·定州联合举荐信'),
    )
    const damingEdge = graph.edges.find(
      (e) =>
        e.from === 'QST-CITY-DAMING-BAJI' &&
        e.relation.includes('北京留守幕府举荐信'),
    )
    expect(changshanEdge).toBeDefined()
    expect(damingEdge).toBeDefined()
  })
})
