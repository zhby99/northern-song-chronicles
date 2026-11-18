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
 * 一流大派青睐同脉弟子「带艺应试 / 同脉转投」：入门线条件（notInAnySect.allowTransferFromSectId 或非取反分支的 inSect）所允许的原属门派
 * （须与任务数据保持双向一致，见 balanceAndSystems 测试与 scripts/verify_quests.mjs）
 */
export const SECT_ENTRY_TRANSFER_SOURCES: Readonly<Record<string, readonly string[]>> = Object.freeze({
  'SECT-03': ['SECT-22'], // 五台山清凉寺 ← 常山枪派（需持联合举荐信，由任务条件校验）
  'SECT-04': ['SECT-24', 'SECT-27'], // 莆田南少林 ← 闽海镇远镖局 / 岭南洪门武馆
  'SECT-05': ['SECT-28'], // 华山派 ← 陇右金环刀堂
  'SECT-06': ['SECT-25'], // 泰山派 ← 齐鲁查拳馆
  'SECT-07': ['SECT-29'], // 峨眉派 ← 巴蜀百草药王门
  'SECT-15': ['SECT-16', 'SECT-26', 'SECT-30'], // 铁掌帮 ← 江淮漕帮 / 钱塘怒潮帮 / 湘西五溪蛊寨
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
