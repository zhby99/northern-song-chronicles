import { describe, expect, it } from 'vitest'
import { SHAOLIN_Q01_QUEST_ID } from '../../data/quests/sects/shaolinLuohanInitQuest'
import { getLoadedQuestScenes, preloadAllQuestScenes } from '../quest/sceneRegistry'
import { useGameStore } from '../../store/useGameStore'

const ARTS = ['MA-159', 'MA-163']
const hasArts = () => ARTS.every((id) => useGameStore.getState().learnedArts.some((e) => e.artId === id))

describe('少林《罗汉开蒙》开蒙武学在首战之前到手', () => {
  it('晨课收尾即授《少林小乘禅功》《罗汉拳》，首战前对缺失武学的旧档补授', async () => {
    await preloadAllQuestScenes()
    const scenes = getLoadedQuestScenes(SHAOLIN_Q01_QUEST_ID)!
    const start = scenes.scene_slq01_04!.choices![0]!.effects
    const fight = scenes.scene_slq01_07!.choices![0]!.effects

    // 新流程：晨课收尾即授
    useGameStore.setState({ learnedArts: [] })
    useGameStore.getState().runQuestEffects(start.filter((e) => e.type === 'teachMartialArt'), null)
    expect(hasArts()).toBe(true)

    // 旧档：首战前补授，且已习者不重复授（等级不被重置）
    useGameStore.setState({ learnedArts: [] })
    useGameStore.getState().runQuestEffects(fight.filter((e) => e.type === 'branch'), null)
    expect(hasArts()).toBe(true)
    useGameStore.setState({ learnedArts: ARTS.map((artId) => ({ artId, level: 3, exp: 5 })) })
    useGameStore.getState().runQuestEffects(fight.filter((e) => e.type === 'branch'), null)
    expect(useGameStore.getState().learnedArts.every((e) => e.level === 3)).toBe(true)
  })
})
