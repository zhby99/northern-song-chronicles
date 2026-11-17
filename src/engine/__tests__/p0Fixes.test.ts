import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { QUEST_MAP } from '../../data/quests'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import type { NodeNpc } from '../../types/game'
import type { StoryChoiceDef } from '../../types/quest'
import { createSeededRng, setGameRng } from '../combat'
import { npcFromDb } from '../npcFactory'
import { evaluateQuestCondition, getVisibleStoryChoices } from '../questEngine'
import {
  buildJoinSectPatch,
  clonePlayerSectState,
  getSectTournamentDateInfo,
  shouldPauseForSectTournament,
} from '../sect'

const INITIAL_STATE = useGameStore.getState()

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
  setGameRng(createSeededRng(7))
})
afterEach(() => setGameRng(null))

describe('P0-1 targetNpcMatch with both npcIds and dynamicActorIds', () => {
  const cond = {
    type: 'targetNpcMatch' as const,
    npcIds: ['NPC-0866'],
    dynamicActorIds: ['ACT-QC-SHEN-QINGLAN'],
  }
  const evalWith = (target: NodeNpc) =>
    evaluateQuestCondition(cond, buildStoreEvalContext(useGameStore.getState(), target)).passed

  it('matches either the catalog NPC or the quest-only actor', () => {
    expect(evalWith(npcFromDb('NPC-0866')!)).toBe(true)
    const actor = {
      id: 'ACT-QC-SHEN-QINGLAN',
      dynamicQuestActorId: 'ACT-QC-SHEN-QINGLAN',
      name: '沈清岚',
      title: '青城孤崖弟子',
      realm: '三流中品',
      talk: '',
    } as NodeNpc
    expect(evalWith(actor)).toBe(true)
    expect(evalWith(npcFromDb('NPC-0142')!)).toBe(false)
  })
})

describe('P0-2 referral letter from a rank-4 elder', () => {
  it('a rank-2 钱塘怒潮帮 disciple can buy the 漕帮 referral from the vice-chief', () => {
    useGameStore.setState({
      silver: 100,
      sectState: clonePlayerSectState({ sectId: 'SECT-26', rank: 2 }),
    })
    useGameStore.getState().bribeForReferral(npcFromDb('NPC-0373')!)
    const s = useGameStore.getState()
    expect(s.inventory.some((st) => st.itemId === 'ITM-MSC-003')).toBe(true)
    expect(s.silver).toBe(80)
  })
})

describe('P0-3 Bawang root-bone gate is checked before starting', () => {
  it('a low 根骨 hero cannot start the quest', () => {
    const quest = QUEST_MAP['QST-TIANBO-BAWANG']!
    const s = useGameStore.getState()
    useGameStore.setState({
      baseStats: { ...s.baseStats, talents: { ...s.baseStats.talents, 根骨: 60 } },
    })
    const ctx = buildStoreEvalContext(useGameStore.getState())
    const cond = quest.startCondition!
    const conds = cond.type === 'all' ? cond.conditions : [cond]
    const boneGate = conds.find((c) => c.type === 'talentAtLeast')
    expect(boneGate).toBeDefined()
    expect(evaluateQuestCondition(boneGate!, ctx).passed).toBe(false)
  })
})

describe('P0-5 sect tournament window', () => {
  it('runs from 二月初一 to 初十 every year', () => {
    expect(getSectTournamentDateInfo(30).isTournamentDay).toBe(false) // 正月三十
    expect(getSectTournamentDateInfo(31).isTournamentDay).toBe(true) // 二月初一
    expect(getSectTournamentDateInfo(40).isTournamentDay).toBe(true) // 二月初十
    expect(getSectTournamentDateInfo(41).isTournamentDay).toBe(false)
    expect(getSectTournamentDateInfo(360 + 35).isTournamentDay).toBe(true)
  })

  it('a 48x cultivation jump into the window pauses only eligible disciples', () => {
    const huashan = clonePlayerSectState({ sectId: 'SECT-05', rank: 2 })
    expect(
      shouldPauseForSectTournament({ prevDayCount: 29, nextDayCount: 33, sectState: huashan }),
    ).toBe(true)
    // 已在会期内继续闭关不再重复打断
    expect(
      shouldPauseForSectTournament({ prevDayCount: 33, nextDayCount: 37, sectState: huashan }),
    ).toBe(false)
    // 本年已参赛不打断
    expect(
      shouldPauseForSectTournament({
        prevDayCount: 29,
        nextDayCount: 33,
        sectState: { ...huashan, lastTournamentYear: 1 },
      }),
    ).toBe(false)
    // 非道剑门派不打断
    expect(
      shouldPauseForSectTournament({
        prevDayCount: 29,
        nextDayCount: 33,
        sectState: clonePlayerSectState({ sectId: 'SECT-01', rank: 2 }),
      }),
    ).toBe(false)
  })
})

describe('P0-6 no saving after death', () => {
  it('saveToSlot refuses while game over', async () => {
    useGameStore.setState({
      gameOver: {
        reasonTitle: 't',
        reasonDetail: 'd',
        killerName: 'k',
        songDate: '',
        locationName: '',
      },
    })
    const before = useGameStore.getState().saveSlots
    await useGameStore.getState().saveToSlot('slot-1', '死后存档')
    const s = useGameStore.getState()
    expect(s.saveSlots).toBe(before)
    expect(s.saveNotice?.text).toContain('身故')
  })
})

describe('P0-7 starter gear is granted once per sect', () => {
  it('rejoining the same sect gives no second set of gear', () => {
    const base = useGameStore.getState()
    const first = buildJoinSectPatch({
      sectId: 'SECT-18',
      dayCount: 10,
      silver: 0,
      inventory: [],
      sectState: base.sectState,
      questState: base.questState,
    })
    expect(first.ok).toBe(true)
    expect(first.grantedGiftNames.length).toBeGreaterThan(0)
    const second = buildJoinSectPatch({
      sectId: 'SECT-18',
      dayCount: 11,
      silver: 0,
      inventory: first.nextInventory,
      sectState: clonePlayerSectState({ ...first.nextSectState, sectId: null }),
      questState: first.nextQuestState,
    })
    expect(second.ok).toBe(true)
    expect(second.grantedGiftNames).toEqual([])
    expect(second.nextInventory).toEqual(first.nextInventory)
  })
})

describe('P0-8 travel crosses days at midnight', () => {
  it('the calendar never runs backwards and camping cannot dodge the day change', () => {
    useGameStore.setState({ shichenIdx: 10, food: 10, viewMode: 'world' })
    const startDay = useGameStore.getState().dayCount
    useGameStore.getState().startJourney('luoyang')
    expect(useGameStore.getState().traveling).not.toBeNull()

    useGameStore.getState().stepTravelTick() // 亥时
    expect(useGameStore.getState().dayCount).toBe(startDay)
    useGameStore.getState().stepTravelTick() // 子时 → 次日
    expect(useGameStore.getState().shichenIdx).toBe(0)
    expect(useGameStore.getState().dayCount).toBe(startDay + 1)

    // 扎营再出发也照样在下一个子时跨日
    useGameStore.getState().campStop()
    useGameStore.setState({ shichenIdx: 11 })
    useGameStore.getState().startJourney('luoyang')
    useGameStore.getState().stepTravelTick()
    expect(useGameStore.getState().dayCount).toBe(startDay + 2)
  })
})

describe('P0-9 scenes whose choices are all hidden', () => {
  it('treats them as having no choices', () => {
    const hidden: StoryChoiceDef[] = [
      {
        id: 'a',
        label: 'a',
        condition: { type: 'flag', flag: 'never_set_flag', op: 'truthy' },
        hideWhenUnavailable: true,
        effects: [],
      },
    ]
    const ctx = buildStoreEvalContext(useGameStore.getState())
    expect(getVisibleStoryChoices(hidden, ctx)).toEqual([])

    useGameStore.setState({
      activeStoryScene: {
        scene: {
          id: 'test_scene',
          title: 't',
          beats: [{ speaker: { kind: 'narrator' }, text: 'x' }],
          choices: hidden,
          onFinishEffects: [{ type: 'setFlag', flag: 'test_scene_done', value: true }],
        },
        beatIndex: 0,
        contextNpc: null,
      } as never,
    })
    useGameStore.getState().advanceStoryScene()
    const s = useGameStore.getState()
    expect(s.activeStoryScene).toBeNull()
    expect(s.questState.flags.test_scene_done).toBe(true)
  })
})
