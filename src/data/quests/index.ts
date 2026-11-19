import type { QuestDefinition } from '../../types/quest'
import { BABUGANCHAN_QUESTS } from './adventures/babuganchanQuest'
import { TAOHUADAO_MAP_QUESTS } from './adventures/taohuadaoMapQuest'
import { YANZIWU_MAP_QUESTS } from './adventures/yanziwuMapQuest'
import { DAMING_BAJI_QUESTS } from './cities/damingBajiQuest'
import { CHANGSHAN_LONGLING_QUESTS } from './sects/changshanLonglingQuest'
import { EMEI_ENTRY_QUESTS } from './sects/emeiEntryQuest'
import { GAIBANG_ENTRY_QUESTS } from './sects/gaibangEntryQuest'
import { HUASHAN_Q02_QUESTS } from './sects/huashanBotaiDivisionQuest'
import { HUASHAN_Q14_QUESTS } from './sects/huashanCaveHarmonyQuest'
import { HUASHAN_Q15_QUESTS } from './sects/huashanCaveUsurpQuest'
import { HUASHAN_Q21_QUESTS } from './sects/huashanEndingSwordHarmonyQuest'
import { HUASHAN_Q20_QUESTS } from './sects/huashanEndingSwordUsurpQuest'
import { HUASHAN_Q19_QUESTS } from './sects/huashanEndingZixiaMasterQuest'
import { HUASHAN_ENTRY_QUESTS } from './sects/huashanEntryQuest'
import { HUASHAN_Q18_QUESTS } from './sects/huashanJianDuguNineQuest'
import { HUASHAN_Q07_QUESTS } from './sects/huashanJianLuoyanQuest'
import { HUASHAN_Q12_QUESTS } from './sects/huashanJianSanqingQuest'
import { HUASHAN_Q11_QUESTS } from './sects/huashanJianSanxianQuest'
import { HUASHAN_Q08_QUESTS } from './sects/huashanJianXiyiQuest'
import { HUASHAN_Q06_QUESTS } from './sects/huashanJianYangwuQuest'
import { HUASHAN_Q22_QUESTS } from './sects/huashanMountaintopSummitQuest'
import { HUASHAN_Q09_QUESTS } from './sects/huashanQiHunyuanGongQuest'
import { HUASHAN_Q04_QUESTS } from './sects/huashanQiHunyuanPalmQuest'
import { HUASHAN_Q10_QUESTS } from './sects/huashanQiSanqingQuest'
import { HUASHAN_Q05_QUESTS } from './sects/huashanQiXiyiQuest'
import { HUASHAN_Q03_QUESTS } from './sects/huashanQiYangwuQuest'
import { HUASHAN_Q17_QUESTS } from './sects/huashanQiZixiaAwakenQuest'
import { HUASHAN_SIDE03_QUESTS } from './sects/huashanSideBotaiChessQuest'
import { HUASHAN_SIDE01_QUESTS } from './sects/huashanSideCanglongPathQuest'
import { HUASHAN_SIDE04_QUESTS } from './sects/huashanSideChanganImpostorQuest'
import { HUASHAN_SIDE06_QUESTS } from './sects/huashanSideJianTongguanQuest'
import { HUASHAN_SIDE08_QUESTS } from './sects/huashanSideLishanGhostMarketQuest'
import { HUASHAN_SIDE10_QUESTS } from './sects/huashanSideLongshanBrokenSwordQuest'
import { HUASHAN_SIDE05_QUESTS } from './sects/huashanSideQiFurnaceQuest'
import { HUASHAN_SIDE02_QUESTS } from './sects/huashanSideQinlingHerbQuest'
import { HUASHAN_SIDE07_QUESTS } from './sects/huashanSideWeibeiHarvestQuest'
import { HUASHAN_SIDE09_QUESTS } from './sects/huashanSideZhongnanTaoQuest'
import { HUASHAN_Q13_QUESTS } from './sects/huashanSiguoyaSecretQuest'
import { HUASHAN_Q16_QUESTS } from './sects/huashanYantaCrisisQuest'
import { HUASHAN_Q01_QUESTS } from './sects/huashanYaowangTrialQuest'
import { JINJUN_FANLOU_NIGHT_QUESTS } from './sects/jinjunFanlouNightQuest'
import { JINJUN_FINAL_1_QUEST } from './sects/jinjunFinal1Quest'
import { JINJUN_FINAL_2_QUEST } from './sects/jinjunFinal2Quest'
import { JINJUN_FINAL_3_QUEST } from './sects/jinjunFinal3Quest'
import { JINJUN_HEBEI_SPY_QUESTS } from './sects/jinjunHebeiSpyQuest'
import { JINJUN_MURONG_ARC_1_QUESTS } from './sects/jinjunMurongArc1Quest'
import { JINJUN_MURONG_ARC_2_QUESTS } from './sects/jinjunMurongArc2Quest'
import { JINJUN_MURONG_ARC_3_QUESTS } from './sects/jinjunMurongArc3Quest'
import { JINJUN_QINZHOU_HORSE_QUESTS } from './sects/jinjunQinzhouHorseQuest'
import { JINJUN_TAIHANG_QUEST_1 } from './sects/jinjunTaihangQuest1'
import { JINJUN_TAIHANG_QUEST_2 } from './sects/jinjunTaihangQuest2'
import { JINJUN_TAIHANG_QUEST_3 } from './sects/jinjunTaihangQuest3'
import { JINJUN_TAIYUAN_IRON_QUESTS } from './sects/jinjunTaiyuanIronQuest'
import { JINJUN_TONGWENGUAN_QUEST } from './sects/jinjunTongwenguanQuest'
import { JINJUN_YONGZHOU_NANMAN_QUEST } from './sects/jinjunYongzhouNanmanQuest'
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
import { TANGMEN_ENTRY_QUESTS } from './sects/tangmenEntryQuest'
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
  ...HUASHAN_Q01_QUESTS,
  ...HUASHAN_Q02_QUESTS,
  ...HUASHAN_Q03_QUESTS,
  ...HUASHAN_Q04_QUESTS,
  ...HUASHAN_Q05_QUESTS,
  ...HUASHAN_Q06_QUESTS,
  ...HUASHAN_Q07_QUESTS,
  ...HUASHAN_Q08_QUESTS,
  ...HUASHAN_Q09_QUESTS,
  ...HUASHAN_Q10_QUESTS,
  ...HUASHAN_Q11_QUESTS,
  ...HUASHAN_Q12_QUESTS,
  ...HUASHAN_Q13_QUESTS,
  ...HUASHAN_Q14_QUESTS,
  ...HUASHAN_Q15_QUESTS,
  ...HUASHAN_Q16_QUESTS,
  ...HUASHAN_Q17_QUESTS,
  ...HUASHAN_Q18_QUESTS,
  ...HUASHAN_Q19_QUESTS,
  ...HUASHAN_Q20_QUESTS,
  ...HUASHAN_Q21_QUESTS,
  ...HUASHAN_Q22_QUESTS,
  ...HUASHAN_SIDE01_QUESTS,
  ...HUASHAN_SIDE02_QUESTS,
  ...HUASHAN_SIDE03_QUESTS,
  ...HUASHAN_SIDE04_QUESTS,
  ...HUASHAN_SIDE05_QUESTS,
  ...HUASHAN_SIDE06_QUESTS,
  ...HUASHAN_SIDE07_QUESTS,
  ...HUASHAN_SIDE08_QUESTS,
  ...HUASHAN_SIDE09_QUESTS,
  ...HUASHAN_SIDE10_QUESTS,
  ...TAISHAN_ENTRY_QUESTS,
  ...EMEI_ENTRY_QUESTS,
  ...TANGMEN_ENTRY_QUESTS,
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
  JINJUN_TONGWENGUAN_QUEST,
  JINJUN_YONGZHOU_NANMAN_QUEST,
  JINJUN_FINAL_1_QUEST,
  JINJUN_FINAL_2_QUEST,
  JINJUN_FINAL_3_QUEST,
  ...ZHENWU_ENTRY_QUESTS,
])

export const QUEST_MAP: Readonly<Record<string, QuestDefinition>> = Object.freeze(
  Object.fromEntries(QUEST_REGISTRY.map((q) => [q.id, q])),
)

export function getQuestsByFaction(factionId: string): QuestDefinition[] {
  return QUEST_REGISTRY.filter((q) => q.factionId === factionId)
}
