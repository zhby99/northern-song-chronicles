import type { QuestDefinition } from '../../types/quest'
import { BABUGANCHAN_QUESTS } from './adventures/babuganchanQuest'
import { TAOHUADAO_MAP_QUESTS } from './adventures/taohuadaoMapQuest'
import { YANZIWU_MAP_QUESTS } from './adventures/yanziwuMapQuest'
import { DAMING_BAJI_QUESTS } from './cities/damingBajiQuest'
import { CHANGSHAN_LONGLING_QUESTS } from './sects/changshanLonglingQuest'
import { EMEI_ENTRY_QUESTS } from './sects/emeiEntryQuest'
import { GAIBANG_ENTRY_QUESTS } from './sects/gaibangEntryQuest'
import { HUASHAN_ENTRY_QUESTS } from './sects/huashanEntryQuest'
import { JINJUN_FANLOU_NIGHT_QUESTS } from './sects/jinjunFanlouNightQuest'
import { JINJUN_HEBEI_SPY_QUESTS } from './sects/jinjunHebeiSpyQuest'
import { JINJUN_MURONG_ARC_1_QUESTS } from './sects/jinjunMurongArc1Quest'
import { JINJUN_MURONG_ARC_2_QUESTS } from './sects/jinjunMurongArc2Quest'
import { JINJUN_MURONG_ARC_3_QUESTS } from './sects/jinjunMurongArc3Quest'
import { JINJUN_QINZHOU_HORSE_QUESTS } from './sects/jinjunQinzhouHorseQuest'
import { JINJUN_TAIHANG_QUEST_1 } from './sects/jinjunTaihangQuest1'
import { JINJUN_TAIHANG_QUEST_2 } from './sects/jinjunTaihangQuest2'
import { JINJUN_TAIHANG_QUEST_3 } from './sects/jinjunTaihangQuest3'
import { JINJUN_TAIYUAN_IRON_QUESTS } from './sects/jinjunTaiyuanIronQuest'
import { JINJUN_YUJINYUAN_HORSE_QUESTS } from './sects/jinjunYujinyuanHorseQuest'
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
import { WUTAI_ENTRY_QUESTS } from './sects/wutaiEntryQuest'
import { XINGXIU_ENTRY_QUESTS } from './sects/xingxiuEntryQuest'
import { ZHENWU_ENTRY_QUESTS } from './sects/zhenwuEntryQuest'

/**
 * 全局不可变声明式剧情任务链注册表：
 * 各任务仅在首屏加载轻量元信息与触发器，对话剧本（`.scenes.ts`）通过 `loadScenes()` 按需懒加载。
 */
export const QUEST_REGISTRY: readonly QuestDefinition[] = Object.freeze([
  ...SECOND_TIER_QUESTS,
  ...SHAOLIN_ENTRY_QUESTS,
  ...GAIBANG_ENTRY_QUESTS,
  ...WUTAI_ENTRY_QUESTS,
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
  ...JINJUN_HEBEI_SPY_QUESTS,
  ...KAIFENG_TAIHANG_BANDIT_QUESTS,
  ...JINJUN_TAIHANG_QUEST_1,
  ...JINJUN_TAIHANG_QUEST_2,
  ...JINJUN_TAIHANG_QUEST_3,
  ...JINJUN_FANLOU_NIGHT_QUESTS,
  ...JINJUN_YUJINYUAN_HORSE_QUESTS,
  ...JINJUN_TAIYUAN_IRON_QUESTS,
  ...JINJUN_QINZHOU_HORSE_QUESTS,
  ...JINJUN_MURONG_ARC_1_QUESTS,
  ...JINJUN_MURONG_ARC_2_QUESTS,
  ...JINJUN_MURONG_ARC_3_QUESTS,
  ...ZHENWU_ENTRY_QUESTS,
])

export const QUEST_MAP: Readonly<Record<string, QuestDefinition>> = Object.freeze(
  Object.fromEntries(QUEST_REGISTRY.map((q) => [q.id, q])),
)

export function getQuestsByFaction(factionId: string): QuestDefinition[] {
  return QUEST_REGISTRY.filter((q) => q.factionId === factionId)
}
