import { useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { QuestEvalContext } from '../engine/questEngine'
import { buildStoreEvalContext, useGameStore } from '../store/useGameStore'
import type { GameStoreState } from '../store/storeTypes'
import type { NodeNpc } from '../types/game'

export type QuestEvalStateSlice = Pick<
  GameStoreState,
  | 'dayCount'
  | 'shichenIdx'
  | 'silver'
  | 'renown'
  | 'chivalry'
  | 'food'
  | 'maxHp'
  | 'maxMp'
  | 'agility'
  | 'res'
  | 'ridingSkill'
  | 'baseStats'
  | 'equipped'
  | 'equippedArts'
  | 'skills'
  | 'inventory'
  | 'learnedArts'
  | 'npcFavor'
  | 'deadNpcIds'
  | 'sectState'
  | 'questState'
>

function pickQuestEvalState(s: GameStoreState): QuestEvalStateSlice {
  return {
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    silver: s.silver,
    renown: s.renown,
    chivalry: s.chivalry,
    food: s.food,
    maxHp: s.maxHp,
    maxMp: s.maxMp,
    agility: s.agility,
    res: s.res,
    ridingSkill: s.ridingSkill,
    baseStats: s.baseStats,
    equipped: s.equipped,
    equippedArts: s.equippedArts,
    skills: s.skills,
    inventory: s.inventory,
    learnedArts: s.learnedArts,
    npcFavor: s.npcFavor,
    deadNpcIds: s.deadNpcIds,
    sectState: s.sectState,
    questState: s.questState,
  }
}

/**
 * 统一订阅剧情条件求值所需的 21 个状态字段（刻意排除与任何 QuestCondition 无关的实时 hp/mp，
 * 避免服药、休息或切磋掉血触发无关重算）。
 */
export function useQuestEvalState(): QuestEvalStateSlice {
  return useGameStore(useShallow(pickQuestEvalState))
}

/**
 * 构建带缓存的 `QuestEvalContext`；当 `options.paused` 为 true（例如地图画布被闭关弹窗、
 * 战斗界面、剧情幕布或枢机菜单完全遮挡）时，Zustand 选择器返回恒定 `null`，彻底阻断后台
 * 高频 Tick（如 10Hz 闭关）引发的组件重渲染与全城 NPC 任务扫描，待遮挡解除后自动对齐最新状态。
 */
export function useQuestEvalContext(
  targetNpc: NodeNpc | null = null,
  options?: { paused?: boolean },
): QuestEvalContext {
  const paused = Boolean(options?.paused)
  const liveSlice = useGameStore(
    useShallow((s) => (paused ? null : pickQuestEvalState(s))),
  )

  return useMemo(() => {
    const source = liveSlice ?? pickQuestEvalState(useGameStore.getState())
    return buildStoreEvalContext(source, targetNpc)
  }, [liveSlice, targetNpc])
}
