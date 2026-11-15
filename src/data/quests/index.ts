import type { QuestDefinition } from '../../types/quest'
import { BABUGANCHAN_QUESTS } from './adventures/babuganchanQuest'
import { TAOHUADAO_MAP_QUESTS } from './adventures/taohuadaoMapQuest'
import { YANZIWU_MAP_QUESTS } from './adventures/yanziwuMapQuest'
import { DAMING_BAJI_QUESTS } from './cities/damingBajiQuest'
import { CHANGSHAN_LONGLING_QUESTS } from './sects/changshanLonglingQuest'
import { EMEI_ENTRY_QUESTS } from './sects/emeiEntryQuest'
import { GAIBANG_ENTRY_QUESTS } from './sects/gaibangEntryQuest'
import { HUASHAN_ENTRY_QUESTS } from './sects/huashanEntryQuest'
import { KAIFENG_MURONG_QUEST_1 } from './sects/kaifengMurongQuest1'
import { KAIFENG_MURONG_QUEST_2 } from './sects/kaifengMurongQuest2'
import { KAIFENG_RENZONG_ESCORT_QUEST } from './sects/kaifengRenzongEscortQuest'
import { KAIFENG_TAIHANG_BANDIT_QUESTS } from './sects/kaifengTaihangBanditQuest'
import { NANSHAOLIN_ENTRY_QUESTS } from './sects/nanshaolinEntryQuest'
import { QINGCHENG_ENTRY_QUESTS } from './sects/qingchengEntryQuest'
import { SECOND_TIER_QUESTS } from './sects/secondTierQuests'
import { SHAOLIN_ENTRY_QUESTS } from './sects/shaolinEntryQuest'
import { TAISHAN_ENTRY_QUESTS } from './sects/taishanEntryQuest'
import { TIANBO_BAWANG_QUESTS } from './sects/tianboBawangQuest'
import { TIEZHANG_ENTRY_QUESTS } from './sects/tiezhangEntryQuest'
import { XINGXIU_ENTRY_QUESTS } from './sects/xingxiuEntryQuest'
import { ZHENWU_ENTRY_QUESTS } from './sects/zhenwuEntryQuest'

/**
 * 全局声明式剧情任务链注册表：
 * 后续每新增一个一流门派或一座城池的剧情，仅需在 `src/data/quests/sects/` 或 `src/data/quests/cities/`
 * 下新建独立文件并在此数组注册即可，底层 Store / 存档 / UI 自动挂载生效。
 */
export const QUEST_REGISTRY: QuestDefinition[] = [
  ...SECOND_TIER_QUESTS,
  ...SHAOLIN_ENTRY_QUESTS,
  ...GAIBANG_ENTRY_QUESTS,
  ...NANSHAOLIN_ENTRY_QUESTS,
  ...HUASHAN_ENTRY_QUESTS,
  ...TAISHAN_ENTRY_QUESTS,
  ...EMEI_ENTRY_QUESTS,
  ...QINGCHENG_ENTRY_QUESTS,
  ...TIEZHANG_ENTRY_QUESTS,
  ...XINGXIU_ENTRY_QUESTS,
  ...CHANGSHAN_LONGLING_QUESTS,
  ...TIANBO_BAWANG_QUESTS,
  ...DAMING_BAJI_QUESTS,
  ...BABUGANCHAN_QUESTS,
  ...YANZIWU_MAP_QUESTS,
  ...TAOHUADAO_MAP_QUESTS,
  ...KAIFENG_MURONG_QUEST_1,
  ...KAIFENG_MURONG_QUEST_2,
  ...KAIFENG_RENZONG_ESCORT_QUEST,
  ...KAIFENG_TAIHANG_BANDIT_QUESTS,
  ...ZHENWU_ENTRY_QUESTS,
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
  QUEST_REGISTRY.push(
    ...SECOND_TIER_QUESTS,
    ...SHAOLIN_ENTRY_QUESTS,
    ...GAIBANG_ENTRY_QUESTS,
    ...NANSHAOLIN_ENTRY_QUESTS,
    ...HUASHAN_ENTRY_QUESTS,
    ...TAISHAN_ENTRY_QUESTS,
    ...EMEI_ENTRY_QUESTS,
    ...QINGCHENG_ENTRY_QUESTS,
    ...TIEZHANG_ENTRY_QUESTS,
    ...XINGXIU_ENTRY_QUESTS,
    ...CHANGSHAN_LONGLING_QUESTS,
    ...TIANBO_BAWANG_QUESTS,
    ...DAMING_BAJI_QUESTS,
    ...BABUGANCHAN_QUESTS,
    ...YANZIWU_MAP_QUESTS,
    ...TAOHUADAO_MAP_QUESTS,
    ...KAIFENG_MURONG_QUEST_1,
    ...KAIFENG_MURONG_QUEST_2,
    ...KAIFENG_RENZONG_ESCORT_QUEST,
    ...KAIFENG_TAIHANG_BANDIT_QUESTS,
    ...ZHENWU_ENTRY_QUESTS,
  )
  for (const k of Object.keys(QUEST_MAP)) {
    delete QUEST_MAP[k]
  }
  for (const q of QUEST_REGISTRY) {
    QUEST_MAP[q.id] = q
  }
}
