import { beforeEach, describe, expect, it } from 'vitest'
import { useGameStore } from '../../store/useGameStore'
import { validateSaveEnvelope } from '../../utils/saveManager'
import { migrateRawSaveEnvelope, SAVE_MIGRATIONS } from '../../utils/saveMigrations'
import {
  compareSaveSchemaVersions,
  CURRENT_SAVE_SCHEMA_VERSION,
  isFutureSaveSchemaVersion,
  isSupportedSaveSchemaVersion,
  SAVE_SCHEMA_HISTORY,
} from '../../utils/saveStorageProbe'

const INITIAL_STATE = useGameStore.getState()

beforeEach(() => {
  useGameStore.setState(INITIAL_STATE, true)
})

/** 用当前存档改写成「某旧版本」的样子：改版本号、删掉后来才有的字段、塞入已废弃字段 */
function makeOldEnvelope(version: string) {
  const env = JSON.parse(
    JSON.stringify(useGameStore.getState().buildSaveEnvelope('slot-3', '旧档')),
  ) as Record<string, unknown>
  env.schemaVersion = version
  const st = env.state as Record<string, unknown>
  for (const k of [
    'kaifengFairPurchases',
    'activeYamenBounty',
    'yamenBountyDoneIds',
    'deadNpcIds',
    'birthplaceId',
    'cityStayShichens',
    'renown',
    'chivalry',
    'combatExp',
  ]) {
    delete st[k]
  }
  st.stamina = 80
  st.maxStamina = 100
  st.auctionBoughtByMonth = { Y0: ['WPN-031'] }
  return env
}

describe('save schema versions', () => {
  it('history is ordered and ends at the current version', () => {
    for (let i = 1; i < SAVE_SCHEMA_HISTORY.length; i += 1) {
      expect(compareSaveSchemaVersions(SAVE_SCHEMA_HISTORY[i - 1], SAVE_SCHEMA_HISTORY[i])).toBeLessThan(0)
    }
    expect(SAVE_SCHEMA_HISTORY[SAVE_SCHEMA_HISTORY.length - 1]).toBe(CURRENT_SAVE_SCHEMA_VERSION)
  })

  it('every version after the first has a migration step', () => {
    const steps = SAVE_MIGRATIONS.map((m) => m.to)
    expect(steps).toEqual(SAVE_SCHEMA_HISTORY.slice(1))
  })

  it('classifies supported, future and unknown versions', () => {
    expect(isSupportedSaveSchemaVersion('M1.2.0')).toBe(true)
    expect(isSupportedSaveSchemaVersion(CURRENT_SAVE_SCHEMA_VERSION)).toBe(true)
    expect(isSupportedSaveSchemaVersion('M1.1.9')).toBe(false)
    expect(isFutureSaveSchemaVersion('M9.0.0')).toBe(true)
    expect(isSupportedSaveSchemaVersion('M9.0.0')).toBe(false)
    expect(isSupportedSaveSchemaVersion('garbage')).toBe(false)
  })
})

describe('cross-version loading', () => {
  it('upgrades an M1.4.1 save and loads it into the store', () => {
    const old = makeOldEnvelope('M1.4.1')
    const env = validateSaveEnvelope(old)
    expect(env).not.toBeNull()
    expect(env!.schemaVersion).toBe(CURRENT_SAVE_SCHEMA_VERSION)
    expect(env!.migratedFrom).toBe('M1.4.1')
    const st = env!.state as unknown as Record<string, unknown>
    expect(st.stamina).toBeUndefined()
    expect(st.auctionBoughtByMonth).toBeUndefined()
    expect(st.kaifengFairPurchases).toEqual({})
    expect(st.deadNpcIds).toEqual([])
    expect(st.combatExp).toBe(0)

    useGameStore.getState().loadFromEnvelope(env!, true)
    const s = useGameStore.getState()
    expect(s.kaifengFairPurchases).toEqual({})
    expect(s.activeYamenBounty).toBeNull()
    expect(s.logs[0]?.text).toContain('升级')
  })

  it('does not mutate the original raw save while migrating', () => {
    const old = makeOldEnvelope('M1.5.3')
    const snapshot = JSON.stringify(old)
    const res = migrateRawSaveEnvelope(old)
    expect(res.ok).toBe(true)
    expect(JSON.stringify(old)).toBe(snapshot)
  })

  it('current-version saves pass through without a migratedFrom tag', () => {
    const env = validateSaveEnvelope(
      JSON.parse(JSON.stringify(useGameStore.getState().buildSaveEnvelope('slot-1'))),
    )
    expect(env?.migratedFrom).toBeUndefined()
  })

  it('refuses saves from a newer game version', () => {
    const future = makeOldEnvelope('M9.0.0')
    expect(validateSaveEnvelope(future)).toBeNull()
    const res = migrateRawSaveEnvelope(future)
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.reason).toBe('future_version')
  })
})
