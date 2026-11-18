import {
  compareSaveSchemaVersions,
  CURRENT_SAVE_SCHEMA_VERSION,
  isFutureSaveSchemaVersion,
  isSupportedSaveSchemaVersion,
} from './saveStorageProbe'

// ============================================================================
// 跨版本存档迁移链
// ----------------------------------------------------------------------------
// 读取任意历代版本（`SAVE_SCHEMA_HISTORY`）写出的存档时，依次执行「目标版本高于存档版本」的
// 迁移步骤，把原始 state 改写成当前结构，再交给 `validateSaveEnvelope` 的常规净化流程。
// 净化流程本身对缺失字段一律回填默认值，所以迁移步骤只需处理：改名、删除、语义变化的字段。
//
// 递增 `CURRENT_SAVE_SCHEMA_VERSION` 时必须：
//   1. 在 `saveStorageProbe.ts` 的 `SAVE_SCHEMA_HISTORY` 末尾追加新版本号；
//   2. 在下方 `SAVE_MIGRATIONS` 追加一条 `to: 新版本` 的步骤（即使只是新增可缺省字段，也写一条说明）。
// ============================================================================

type RawState = Record<string, unknown>

export interface SaveMigrationStep {
  /** 迁移后的版本号 */
  to: string
  /** 给玩家 / 开发者看的变化说明 */
  note: string
  migrate: (state: RawState) => void
}

const dropKeys = (state: RawState, keys: string[]) => {
  for (const k of keys) delete state[k]
}

const setDefault = (state: RawState, key: string, value: unknown) => {
  if (state[key] === undefined || state[key] === null) state[key] = value
}

export const SAVE_MIGRATIONS: readonly SaveMigrationStep[] = [
  {
    to: 'M1.3.0',
    note: '旧版坐骑整体换为 28 匹北宋名驹（无效坐骑在读档净化时自动卸下）',
    migrate: () => {},
  },
  {
    to: 'M1.3.1',
    note: '武学库扩充为 218 门（无效武学在读档净化时自动剔除）',
    migrate: () => {},
  },
  {
    to: 'M1.4.0',
    note: '新增门派身份、NPC 好感与孤品消耗记录',
    migrate: (st) => {
      setDefault(st, 'npcFavor', {})
      setDefault(st, 'consumedUniqueIds', [])
    },
  },
  {
    to: 'M1.4.1',
    note: '新增声明式剧情任务状态',
    migrate: () => {},
  },
  {
    to: 'M1.5.0',
    note: '取消体能条，改为战斗经验与按日闭关',
    migrate: (st) => {
      dropKeys(st, ['stamina', 'maxStamina'])
      setDefault(st, 'combatExp', 0)
    },
  },
  {
    to: 'M1.5.1',
    note: '新增江湖声望与侠义',
    migrate: (st) => {
      setDefault(st, 'renown', 0)
      setDefault(st, 'chivalry', 0)
    },
  },
  {
    to: 'M1.5.2',
    note: '（无结构变化）',
    migrate: () => {},
  },
  {
    to: 'M1.5.3',
    note: '新增出生地、异乡宿费计时、NPC 月度交谈/切磋/宴请记录与走镖镖单',
    migrate: (st) => {
      setDefault(st, 'birthplaceId', typeof st.currentNodeId === 'string' ? st.currentNodeId : 'bianliang')
      setDefault(st, 'cityStayShichens', 0)
      setDefault(st, 'npcTalkedMonth', {})
      setDefault(st, 'npcSparredMonth', {})
      setDefault(st, 'npcBanquetedMonth', {})
      setDefault(st, 'activeEscortContract', null)
    },
  },
  {
    to: 'M1.5.4',
    note: '新增 NPC 生死名录',
    migrate: (st) => {
      setDefault(st, 'deadNpcIds', [])
    },
  },
  {
    to: 'M1.5.5',
    note: '取消大相国寺拍卖改为开封大集；新增衙门悬赏',
    migrate: (st) => {
      dropKeys(st, ['auctionBoughtByMonth'])
      setDefault(st, 'kaifengFairPurchases', {})
      setDefault(st, 'activeYamenBounty', null)
      setDefault(st, 'yamenBountyDoneIds', [])
    },
  },
]

export type SaveMigrationOutcome =
  | { ok: true; raw: Record<string, unknown>; migratedFrom: string | null; appliedNotes: string[] }
  | { ok: false; reason: 'not_a_save' | 'future_version' | 'unsupported_version'; version: unknown }

/**
 * 把任意受支持版本的原始存档对象升级为当前版本结构（返回深拷贝，不修改入参）。
 */
export function migrateRawSaveEnvelope(raw: unknown): SaveMigrationOutcome {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, reason: 'not_a_save', version: null }
  }
  const src = raw as Record<string, unknown>
  const version = src.schemaVersion
  if (isFutureSaveSchemaVersion(version)) {
    return { ok: false, reason: 'future_version', version }
  }
  if (!isSupportedSaveSchemaVersion(version)) {
    return { ok: false, reason: 'unsupported_version', version }
  }
  if (version === CURRENT_SAVE_SCHEMA_VERSION) {
    return { ok: true, raw: src, migratedFrom: null, appliedNotes: [] }
  }

  const copy = JSON.parse(JSON.stringify(src)) as Record<string, unknown>
  const state = (copy.state && typeof copy.state === 'object' ? copy.state : {}) as RawState
  copy.state = state
  const appliedNotes: string[] = []
  for (const step of SAVE_MIGRATIONS) {
    if (compareSaveSchemaVersions(step.to, version) <= 0) continue
    if (compareSaveSchemaVersions(step.to, CURRENT_SAVE_SCHEMA_VERSION) > 0) break
    step.migrate(state)
    appliedNotes.push(`${step.to}：${step.note}`)
  }
  copy.schemaVersion = CURRENT_SAVE_SCHEMA_VERSION
  return { ok: true, raw: copy, migratedFrom: String(version), appliedNotes }
}
