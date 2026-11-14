import type { QuestDefinition } from '../../types/quest'
import { DAMING_BAJI_QUESTS } from './cities/damingBajiQuest'
import { CHANGSHAN_LONGLING_QUESTS } from './sects/changshanLonglingQuest'
import { SECOND_TIER_QUESTS } from './sects/secondTierQuests'

/**
 * 全局声明式剧情任务链注册表：
 * 后续每新增一个一流门派或一座城池的剧情，仅需在 `src/data/quests/sects/` 或 `src/data/quests/cities/`
 * 下新建独立文件并在此数组注册即可，底层 Store / 存档 / UI 自动挂载生效。
 */
export const QUEST_REGISTRY: QuestDefinition[] = [
  ...SECOND_TIER_QUESTS,
  ...CHANGSHAN_LONGLING_QUESTS,
  ...DAMING_BAJI_QUESTS,
]

export const QUEST_MAP: Record<string, QuestDefinition> = Object.fromEntries(
  QUEST_REGISTRY.map((q) => [q.id, q]),
)

export function getQuestsByFaction(factionId: string): QuestDefinition[] {
  return QUEST_REGISTRY.filter((q) => q.factionId === factionId)
}

export function registerExtraQuests(extra: QuestDefinition[]): void {
  for (const q of extra) {
    const existingIdx = QUEST_REGISTRY.findIndex((x) => x.id === q.id)
    if (existingIdx >= 0) {
      QUEST_REGISTRY[existingIdx] = q
    } else {
      QUEST_REGISTRY.push(q)
    }
    QUEST_MAP[q.id] = q
  }
}

export function resetRegisteredQuests(): void {
  QUEST_REGISTRY.length = 0
  QUEST_REGISTRY.push(...SECOND_TIER_QUESTS, ...CHANGSHAN_LONGLING_QUESTS, ...DAMING_BAJI_QUESTS)
  for (const k of Object.keys(QUEST_MAP)) {
    delete QUEST_MAP[k]
  }
  for (const q of QUEST_REGISTRY) {
    QUEST_MAP[q.id] = q
  }
}
