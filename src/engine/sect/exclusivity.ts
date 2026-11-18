import { FACTION_DB_MAP } from '../../data/gameDb'
import type { PlayerSectState } from '../../types/game'
import { SECT_RULES_BY_ID } from './rules'

// ============================================================================
// 门派排他：一人不可二门兼投。
// - 各门派「入门任务线」（rules.entryQuestId，举荐转投线 *-REFERRAL 除外）在玩家已身属别派、
//   或正处少林三百六十五日山门杂役期时，不再开启 / 推进；
// - 任务终幕 joinSect 遇已身属别派时拒绝静默覆盖 sectId（官面奉调转任 allowOfficialTransfer 例外）。
// ============================================================================

const ENTRY_QUEST_TO_SECT: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(
    Object.values(SECT_RULES_BY_ID)
      .filter((r) => r.entryQuestId && !r.entryQuestId.endsWith('-REFERRAL'))
      .map((r) => [r.entryQuestId!, r.sectId]),
  ),
)

/** 官面奉调可直接转任的原属势力（常山枪派边军 → 开封府 / 禁军；开封府六扇门 → 禁军） */
export const OFFICIAL_TRANSFER_SOURCE_SECT_IDS: ReadonlySet<string> = new Set([
  'SECT-17',
  'SECT-22',
  'SECT-23',
])

/**
 * 一流大派青睐同脉三流小派弟子「带艺应试」：入门线条件中 notInAnySect.allowTransferFromSectId 所列原属门派
 * （须与任务数据保持一致，见 sectExclusivity 测试）
 */
export const SECT_ENTRY_TRANSFER_SOURCES: Readonly<Record<string, readonly string[]>> = Object.freeze({
  'SECT-05': ['SECT-28'], // 华山 ← 陇右金环刀堂
  'SECT-06': ['SECT-25'], // 泰山 ← 齐鲁查拳馆
  'SECT-07': ['SECT-29'], // 峨眉 ← 巴蜀百草药王门
})

export function getEntryQuestSectId(questId: string): string | null {
  return ENTRY_QUEST_TO_SECT[questId] ?? null
}

/** 某门派入门线此刻能否开启 / 推进；不可则返回原因 */
export function getSectEntryQuestBlockReason(
  questId: string,
  sectState: Pick<PlayerSectState, 'sectId' | 'shaolinNoviceState'>,
): string | null {
  const targetSectId = getEntryQuestSectId(questId)
  if (!targetSectId) return null
  return getSectExclusivityBlockReason(targetSectId, sectState)
}

export function getSectExclusivityBlockReason(
  targetSectId: string,
  sectState: Pick<PlayerSectState, 'sectId' | 'shaolinNoviceState'>,
  allowOfficialTransfer = false,
): string | null {
  const cur = sectState.sectId
  if (cur && cur !== targetSectId) {
    if (allowOfficialTransfer && OFFICIAL_TRANSFER_SOURCE_SECT_IDS.has(cur)) return null
    if (SECT_ENTRY_TRANSFER_SOURCES[targetSectId]?.includes(cur)) return null
    const curName = FACTION_DB_MAP[cur]?.name ?? cur
    return `少侠已身属【${curName}】，不可二门兼投；须先脱离原门派方可另拜师门。`
  }
  if (!cur && sectState.shaolinNoviceState === 'active' && targetSectId !== 'SECT-01') {
    return '少侠正在嵩山少林寺山门杂役期，尚未圆满，不可转投他门。'
  }
  return null
}
