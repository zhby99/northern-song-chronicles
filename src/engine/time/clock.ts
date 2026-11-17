import { FACTION_DB_MAP } from '../../data/gameDb'
import type {
  LogEntry,
  NodeNpc,
  PlayerSectState,
  RoamingMaster,
  WildernessCamp,
} from '../../types/game'
import type { GameStoreState } from '../../store/storeTypes'
import { defaultRng, type RngFn } from '../combat/rng'
import {
  computeCelunBonusAmount,
  getRegionLodgingInfo,
} from '../economy'
import {
  clonePlayerSectState,
  resetSectMembership,
  generateKaifengWarrant,
  getHalfYearPeriodInfo,
  getSectLeaderNpcId,
  getSectMonthlyStipend,
  getSectRule,
  SEMI_ANNUAL_DEADLINE_DAYS,
  spawnAnnualLiaoSpy,
} from '../sect'
import { INITIAL_NPC_FAVOR, MIN_NPC_FAVOR } from '../social/npcFavor'
import {
  DAYS_PER_YEAR,
  isPlayerInFreeLodgingRegion,
} from '../stats/heroStats'
import { ADJACENCY_MAP, getSongDateParts, NODE_MAP } from '../world/mapMath'

let nextLogSeq = 1
export function createLogEntry(
  dayCount: number,
  tag: string,
  text: string,
  highlight = false,
  shichenIdx?: number,
): LogEntry {
  const parts = getSongDateParts(dayCount, shichenIdx ?? 4)
  const datePart =
    typeof shichenIdx === 'number'
      ? `${parts.monthDay}·${parts.shichen.name}`
      : parts.monthDay
  nextLogSeq += 1
  return {
    id: `log-${Date.now()}-${nextLogSeq}`,
    date: datePart,
    tag,
    text,
    highlight,
  }
}

export function advanceShichenClock(dayCount: number, shichenIdx: number, deltaShichen: number) {
  const total = shichenIdx + deltaShichen
  const daysAdded = Math.floor(total / 12)
  const nextShichen = ((total % 12) + 12) % 12
  return {
    dayCount: Math.max(1, dayCount + daysAdded),
    shichenIdx: nextShichen,
    daysAdded,
  }
}

export function applyDailyVitalityRecovery(params: {
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  daysAdded: number
  factor?: number
}): { hp: number; mp: number; hpGain: number; mpGain: number } {
  const { hp, maxHp, mp, maxMp, daysAdded, factor = 1 } = params
  if (daysAdded <= 0 || factor <= 0) {
    return { hp, mp, hpGain: 0, mpGain: 0 }
  }
  const rawHpGain = maxHp > 0 ? Math.max(1, Math.round((maxHp / 20) * factor * daysAdded)) : 0
  const rawMpGain = maxMp > 0 ? Math.max(1, Math.round((maxMp / 10) * factor * daysAdded)) : 0
  const nextHp = Math.min(maxHp, hp + rawHpGain)
  const nextMp = Math.min(maxMp, mp + rawMpGain)
  return {
    hp: nextHp,
    mp: nextMp,
    hpGain: Math.max(0, nextHp - hp),
    mpGain: Math.max(0, nextMp - mp),
  }
}

export function rotateMonthlyRoamingMasters(params: {
  prevDayCount: number
  nextDayCount: number
  shichenIdx: number
  roamingMasters: RoamingMaster[]
  logs: LogEntry[]
  emitRumorLog?: boolean
  canEnterNode?: (regionId: string) => boolean
  rng?: RngFn
}): { roamingMasters: RoamingMaster[]; logs: LogEntry[] } {
  const {
    prevDayCount,
    nextDayCount,
    shichenIdx,
    roamingMasters,
    logs,
    emitRumorLog = false,
    canEnterNode,
    rng = defaultRng,
  } = params
  if (nextDayCount <= prevDayCount) {
    return { roamingMasters, logs }
  }
  const prevMonthIdx = Math.floor((prevDayCount - 1) / 30)
  const nextMonthIdx = Math.floor((nextDayCount - 1) / 30)
  const crossedMonth = nextMonthIdx > prevMonthIdx || (nextDayCount - 1) % 30 === 0
  if (!crossedMonth) {
    return { roamingMasters, logs }
  }

  const nextMasters = roamingMasters.map((m) => {
    const rawNeighbors = ADJACENCY_MAP[m.nodeId] ?? []
    const neighbors = canEnterNode
      ? rawNeighbors.filter((edge) => canEnterNode(edge.to))
      : rawNeighbors
    if (neighbors.length === 0) return m
    const pick = neighbors[Math.floor(rng() * neighbors.length)]
    return pick ? { ...m, nodeId: pick.to } : m
  })

  if (!emitRumorLog || nextMasters.length === 0) {
    return { roamingMasters: nextMasters, logs }
  }

  const sample = nextMasters[Math.floor(rng() * nextMasters.length)]
  if (!sample) {
    return { roamingMasters: nextMasters, logs }
  }
  const nextLogs = [
    createLogEntry(
      nextDayCount,
      '月度风云',
      `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
      true,
      shichenIdx,
    ),
    ...logs,
  ]
  return { roamingMasters: nextMasters, logs: nextLogs }
}

const STIPEND_LOG_FORMAT_BY_SECT: Record<
  string,
  { tag: string; format: (rankLabel: string, total: number, factionName: string) => string }
> = {
  'SECT-22': {
    tag: '常山军饷',
    format: (rankLabel, total) =>
      `河北边军按月支放【常山枪派 · ${rankLabel}】月度军饷 +${total} 两纹银！`,
  },
  'SECT-17': {
    tag: '开封府俸禄',
    format: (rankLabel, total) =>
      `大宋官府按月支放【开封府 / 六扇门 · ${rankLabel}】月度官俸 +${total} 两纹银！`,
  },
  'SECT-33': {
    tag: '禁军月俸',
    format: (rankLabel, total) =>
      `三衙司按月颁赐【大宋禁军 · ${rankLabel}】月度军俸 +${total} 两纹银！`,
  },
}

export function applyDayProgressionSectHooks(params: {
  nextDayCount: number
  shichenIdx: number
  silver: number
  sectState: PlayerSectState
  logs: LogEntry[]
  npcFavor?: Record<string, number>
  celunSkill?: number
  rng?: RngFn
}): {
  silver: number
  sectState: PlayerSectState
  logs: LogEntry[]
  npcFavor: Record<string, number>
  overdueSpyAmbush: NodeNpc | null
} {
  const { rng = defaultRng, celunSkill = 0 } = params
  let nextSilver = params.silver
  let nextSect = clonePlayerSectState(params.sectState)
  const nextLogs = [...params.logs]
  const nextNpcFavor = params.npcFavor ? { ...params.npcFavor } : {}
  const overdueSpyAmbush: NodeNpc | null = null

  const rule = getSectRule(nextSect.sectId)
  if (nextSect.sectId && rule?.monthlyStipends) {
    const curMonthIdx = Math.floor((params.nextDayCount - 1) / 30)
    if (curMonthIdx > nextSect.lastStipendMonth) {
      const months = curMonthIdx - nextSect.lastStipendMonth
      const basePerMonth = getSectMonthlyStipend(nextSect.sectId, nextSect.rank)
      const perMonth = computeCelunBonusAmount(basePerMonth, celunSkill)
      const totalStipend = perMonth * months
      const celunExtra = totalStipend - basePerMonth * months
      nextSilver += totalStipend
      nextSect.lastStipendMonth = curMonthIdx
      const factionName = FACTION_DB_MAP[nextSect.sectId]?.name ?? nextSect.sectId
      const fmt = STIPEND_LOG_FORMAT_BY_SECT[nextSect.sectId]
      const baseText = fmt
        ? fmt.format(nextSect.rankLabel, totalStipend, factionName)
        : `按月支领【${factionName} · ${nextSect.rankLabel}】月度俸银 +${totalStipend} 两纹银！`
      const celunSuffix = celunExtra > 0 ? `（含策论干略加成 +${celunExtra} 两）` : ''
      nextLogs.unshift(
        createLogEntry(
          params.nextDayCount,
          fmt?.tag ?? (rule.stipendTitle || '师门月俸'),
          `${baseText}${celunSuffix}`,
          true,
          params.shichenIdx,
        ),
      )
    }
  }

  if (rule?.semiAnnualDutyKind === 'liao_spy') {
    if (nextSect.activeLiaoSpy && params.nextDayCount >= nextSect.activeLiaoSpy.deadlineDay) {
      const expiredSpy = nextSect.activeLiaoSpy
      nextSect.activeLiaoSpy = null
      nextSect.changshanMissedCount += 1
      const leaderId = getSectLeaderNpcId(nextSect.sectId)
      if (leaderId) {
        const curFavor = nextNpcFavor[leaderId] ?? INITIAL_NPC_FAVOR
        nextNpcFavor[leaderId] = Math.max(MIN_NPC_FAVOR, curFavor - 15)
      }
      if (nextSect.changshanMissedCount >= 2) {
        nextSect = resetSectMembership(nextSect)
        nextLogs.unshift(
          createLogEntry(
            params.nextDayCount,
            '军纪除名',
            `半年度诛除辽谍【${expiredSpy.name}】军令逾两个月未成，任务自动撤销，掌门好感度 -15；因连续两次失期误事，少侠已被【常山枪派】开除出派！`,
            true,
            params.shichenIdx,
          ),
        )
      } else {
        nextLogs.unshift(
          createLogEntry(
            params.nextDayCount,
            '军令逾限',
            `半年度诛除辽谍【${expiredSpy.name}】军令逾两个月未成，任务已自动消失！掌门好感度下降 15 点（⚠️ 再失期一次将被开除出派）。`,
            true,
            params.shichenIdx,
          ),
        )
      }
    }

    if (nextSect.sectId) {
      const daysInSect = Math.max(0, params.nextDayCount - nextSect.joinedDay)
      if (daysInSect >= DAYS_PER_YEAR) {
        const { latestPeriod, latestDispatchDay } = getHalfYearPeriodInfo(params.nextDayCount)
        if (!nextSect.activeLiaoSpy && latestPeriod > nextSect.lastLiaoSpyMissionYear) {
          nextSect.lastLiaoSpyMissionYear = latestPeriod
          const deadlineDay = latestDispatchDay + SEMI_ANNUAL_DEADLINE_DAYS
          if (params.nextDayCount < deadlineDay) {
            const spy = spawnAnnualLiaoSpy(latestPeriod, latestDispatchDay, nextSect.rank, rng)
            nextSect.activeLiaoSpy = spy
            nextLogs.unshift(
              createLogEntry(
                params.nextDayCount,
                '燕云锄奸',
                `【常山枪派半年军令】辽国密谍【${spy.name}（${spy.title} · ${spy.realm}）】现踪燕云【${spy.regionName} · ${spy.buildingName}】！须于两个月内（第 ${spy.deadlineDay} 日前）寻获并诛除！`,
                true,
                params.shichenIdx,
              ),
            )
          }
        }
      }
    }
  }

  if (rule?.semiAnnualDutyKind === 'kaifeng_warrant') {
    if (
      nextSect.activeKaifengWarrant &&
      nextSect.activeKaifengWarrant.deadlineDay &&
      params.nextDayCount >= nextSect.activeKaifengWarrant.deadlineDay
    ) {
      const expiredCase = nextSect.activeKaifengWarrant
      nextSect.activeKaifengWarrant = null
      const twoYearSalaryFine = getSectMonthlyStipend(nextSect.sectId, nextSect.rank) * 24
      nextSilver = Math.max(0, nextSilver - twoYearSalaryFine)
      nextSect.kaifengMissedCount += 1
      if (nextSect.kaifengMissedCount >= 2) {
        nextSect = resetSectMembership(nextSect)
        nextLogs.unshift(
          createLogEntry(
            params.nextDayCount,
            '六扇门革职',
            `六扇门公案【${expiredCase.targetName}】逾两个月未结，案卷自动撤销并罚没两年俸禄 ${twoYearSalaryFine} 两纹银；因连续两次失职，少侠已被【开封府 / 六扇门】开除！`,
            true,
            params.shichenIdx,
          ),
        )
      } else {
        nextLogs.unshift(
          createLogEntry(
            params.nextDayCount,
            '公案逾限',
            `六扇门公案【${expiredCase.targetName}】逾两个月未结，案卷已自动消失！依律罚没两年俸禄 ${twoYearSalaryFine} 两纹银（⚠️ 再失职一次将被开除）。`,
            true,
            params.shichenIdx,
          ),
        )
      }
    }

    if (nextSect.sectId && nextSect.rank < 4) {
      const { latestPeriod, latestDispatchDay } = getHalfYearPeriodInfo(params.nextDayCount)
      if (latestPeriod > nextSect.lastKaifengCasePeriod) {
        nextSect.lastKaifengCasePeriod = latestPeriod
        const deadlineDay = latestDispatchDay + SEMI_ANNUAL_DEADLINE_DAYS
        if (
          params.nextDayCount < deadlineDay &&
          (!nextSect.activeKaifengWarrant || !nextSect.activeKaifengWarrant.deadlineDay)
        ) {
          const warrant = generateKaifengWarrant(latestDispatchDay, nextSect.rank, {
            deadlineDay,
            rng,
          })
          if (warrant) {
            nextSect.activeKaifengWarrant = warrant
            const kindLabel =
              warrant.kind === 'investigate' ? '调查情报线索' : `缉拿要犯（${warrant.realm}）`
            nextLogs.unshift(
              createLogEntry(
                params.nextDayCount,
                '六扇门派案',
                `【六扇门半年公案】奉命前往【${warrant.regionName} · ${warrant.buildingName}】办理「${warrant.targetName}」（${kindLabel}），须于两个月内（第 ${deadlineDay} 日前）结案！`,
                true,
                params.shichenIdx,
              ),
            )
          }
        }
      }
    }
  }

  return {
    silver: nextSilver,
    sectState: nextSect,
    logs: nextLogs,
    npcFavor: nextNpcFavor,
    overdueSpyAmbush,
  }
}

export interface ComputeTimeAdvanceParams {
  dayCount: number
  shichenIdx: number
  deltaShichen: number
  silver: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  currentNodeId: string
  birthplaceId?: string
  cityStayShichens?: number
  campPos: WildernessCamp | null
  sectState: PlayerSectState
  npcFavor: Record<string, number>
  roamingMasters: RoamingMaster[]
  logs: LogEntry[]
  chargeForeignLodging?: boolean
  equippedMountId?: string | null
  celunSkill?: number
  vitalityFactor?: number
  skipSectDayHooks?: boolean
  rotateMasters?: boolean
  emitMasterRumorLog?: boolean
  canMasterEnterNode?: (regionId: string) => boolean
  rng?: RngFn
}

export interface ComputeTimeAdvanceResult {
  dayCount: number
  shichenIdx: number
  daysAdded: number
  cityStayShichens: number
  silver: number
  lodgingFee: number
  hp: number
  mp: number
  hpGain: number
  mpGain: number
  sectState: PlayerSectState
  npcFavor: Record<string, number>
  roamingMasters: RoamingMaster[]
  logs: LogEntry[]
  overdueSpyAmbush: NodeNpc | null
}

/**
 * Pure unified time-advance state transition (`advanceShichenClock -> foreign lodging (per 12 shichens) -> monthly masters -> sect hooks -> daily vitality`).
 */
export function computeTimeAdvanceState(
  params: ComputeTimeAdvanceParams,
): ComputeTimeAdvanceResult {
  const {
    dayCount,
    shichenIdx,
    deltaShichen,
    silver,
    hp,
    maxHp,
    mp,
    maxMp,
    currentNodeId,
    birthplaceId,
    cityStayShichens = 0,
    campPos,
    sectState,
    npcFavor,
    roamingMasters,
    logs,
    chargeForeignLodging = false,
    celunSkill = 0,
    vitalityFactor = 1,
    skipSectDayHooks = false,
    rotateMasters = true,
    emitMasterRumorLog = false,
    canMasterEnterNode,
    rng = defaultRng,
  } = params

  const clock = advanceShichenClock(dayCount, shichenIdx, deltaShichen)
  const isFreeLodging = isPlayerInFreeLodgingRegion(
    currentNodeId,
    campPos,
    sectState.sectId,
    birthplaceId,
  )
  const lodgingInfo = getRegionLodgingInfo(currentNodeId)
  const safeStay = Math.max(0, Math.floor(cityStayShichens))
  const totalStay = safeStay + Math.max(0, deltaShichen)
  const lodgingPeriods = Math.floor(totalStay / 12) - Math.floor(safeStay / 12)
  const nextCityStayShichens = campPos || isFreeLodging ? 0 : totalStay % 12
  const lodgingFee =
    chargeForeignLodging && lodgingPeriods > 0 && !isFreeLodging && !campPos
      ? Math.min(silver, lodgingInfo.dailyCost * lodgingPeriods)
      : 0

  let nextSilver = silver - lodgingFee
  let nextSectState = sectState
  let nextNpcFavor = npcFavor
  let nextMasters = roamingMasters
  let nextLogs = logs
  let overdueSpyAmbush: NodeNpc | null = null

  if (lodgingFee > 0) {
    const cityName = NODE_MAP[currentNodeId]?.name ?? currentNodeId
    nextLogs = [
      createLogEntry(
        clock.dayCount,
        '邸店宿费',
        `于【${cityName}】留驻满 ${lodgingPeriods * 12} 时辰，依例扣缴【${lodgingInfo.tierLabel}】宿费 ${lodgingFee} 两纹银。`,
        false,
        clock.shichenIdx,
      ),
      ...nextLogs,
    ]
  }

  if (clock.daysAdded > 0) {
    if (rotateMasters) {
      const rot = rotateMonthlyRoamingMasters({
        prevDayCount: dayCount,
        nextDayCount: clock.dayCount,
        shichenIdx: clock.shichenIdx,
        roamingMasters: nextMasters,
        logs: nextLogs,
        emitRumorLog: emitMasterRumorLog,
        canEnterNode: canMasterEnterNode,
        rng,
      })
      nextMasters = rot.roamingMasters
      nextLogs = rot.logs
    }

    if (!skipSectDayHooks) {
      const dayHook = applyDayProgressionSectHooks({
        nextDayCount: clock.dayCount,
        shichenIdx: clock.shichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        logs: nextLogs,
        npcFavor: nextNpcFavor,
        celunSkill,
        rng,
      })
      nextSilver = dayHook.silver
      nextSectState = dayHook.sectState
      nextLogs = dayHook.logs
      nextNpcFavor = dayHook.npcFavor
      overdueSpyAmbush = dayHook.overdueSpyAmbush
    }
  }

  const rec = applyDailyVitalityRecovery({
    hp,
    maxHp,
    mp,
    maxMp,
    daysAdded: clock.daysAdded,
    factor: vitalityFactor,
  })

  return {
    dayCount: clock.dayCount,
    shichenIdx: clock.shichenIdx,
    daysAdded: clock.daysAdded,
    cityStayShichens: nextCityStayShichens,
    silver: nextSilver,
    lodgingFee,
    hp: rec.hp,
    mp: rec.mp,
    hpGain: rec.hpGain,
    mpGain: rec.mpGain,
    sectState: nextSectState,
    npcFavor: nextNpcFavor,
    roamingMasters: nextMasters,
    logs: nextLogs.slice(0, 60),
    overdueSpyAmbush,
  }
}

export interface CommitTimeAdvanceOptions {
  deltaShichen: number
  chargeForeignLodging?: boolean
  vitalityFactor?: number
  skipSectDayHooks?: boolean
  rotateMasters?: boolean
  emitMasterRumorLog?: boolean
  canMasterEnterNode?: (regionId: string) => boolean
  silverOverride?: number
  hpOverride?: number
  maxHpOverride?: number
  mpOverride?: number
  maxMpOverride?: number
  baseLogsOverride?: LogEntry[]
  buildExtraPatch?: (adv: ComputeTimeAdvanceResult) => Partial<GameStoreState>
  skipAmbushTrigger?: boolean
  autosaveReason?: string | null
  rng?: RngFn
}

/**
 * Unified store-level time advancement pipeline:
 * `advanceShichenClock -> 日钩子 -> set() -> checkExpiredQuestDeadlines -> 伏击 -> 自动存档`
 */
export function commitTimeAdvance(
  set: (partial: Partial<GameStoreState>) => void,
  get: () => GameStoreState,
  options: CommitTimeAdvanceOptions,
): ComputeTimeAdvanceResult {
  const s = get()
  const adv = computeTimeAdvanceState({
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    deltaShichen: options.deltaShichen,
    silver: options.silverOverride ?? s.silver,
    hp: options.hpOverride ?? s.hp,
    maxHp: options.maxHpOverride ?? s.maxHp,
    mp: options.mpOverride ?? s.mp,
    maxMp: options.maxMpOverride ?? s.maxMp,
    currentNodeId: s.currentNodeId,
    birthplaceId: s.birthplaceId,
    cityStayShichens: s.cityStayShichens,
    campPos: s.campPos,
    sectState: s.sectState,
    npcFavor: s.npcFavor,
    roamingMasters: s.roamingMasters,
    logs: options.baseLogsOverride ?? s.logs,
    chargeForeignLodging: options.chargeForeignLodging,
    equippedMountId: s.equipped.mount,
    celunSkill: s.skills['策论'] ?? 0,
    vitalityFactor: options.vitalityFactor,
    skipSectDayHooks: options.skipSectDayHooks,
    rotateMasters: options.rotateMasters,
    emitMasterRumorLog: options.emitMasterRumorLog,
    canMasterEnterNode: options.canMasterEnterNode,
    rng: options.rng,
  })

  const extraPatch = options.buildExtraPatch ? options.buildExtraPatch(adv) : {}
  set({
    dayCount: adv.dayCount,
    shichenIdx: adv.shichenIdx,
    cityStayShichens: adv.cityStayShichens,
    silver: adv.silver,
    hp: adv.hp,
    mp: adv.mp,
    sectState: adv.sectState,
    npcFavor: adv.npcFavor,
    roamingMasters: adv.roamingMasters,
    logs: adv.logs,
    ...extraPatch,
  })

  if (adv.daysAdded > 0) {
    get().checkExpiredQuestDeadlines()
  }
  if (!options.skipAmbushTrigger && adv.overdueSpyAmbush) {
    get().startNpcCombat(adv.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    return adv
  }
  if (options.autosaveReason) {
    void get().saveToSlot('autosave', options.autosaveReason, true)
  }
  return adv
}
