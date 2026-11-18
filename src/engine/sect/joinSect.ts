import { FACTION_DB_MAP } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { computeCelunBonusAmount } from '../economy'
import { cloneQuestRuntimeState } from '../questEngine'
import type {
  ActiveKaifengWarrant,
  InventoryStack,
  PlayerSectState,
  SectRankLevel,
} from '../../types/game'
import type { QuestRuntimeState } from '../../types/quest'
import type { RngFn } from '../combat/rng'
import { addItemToInventory, removeItemFromInventory } from '../shared/inventory'
import { getEntryQuestSectId, getSectExclusivityBlockReason } from './exclusivity'
import { generateKaifengWarrant } from './kaifengWarrant'
import { getHalfYearPeriodInfo, SEMI_ANNUAL_DEADLINE_DAYS } from './liaoSpy'
import { clonePlayerSectState, getSectRankTitle, SHAOLIN_CHORE_TARGET_DAYS } from './ranks'
import { getSectRule } from './rules'
import { getSectMonthlyStipend } from './stipends'

export interface BuildJoinSectPatchInput {
  sectId: string
  dayCount: number
  silver: number
  inventory: InventoryStack[]
  sectState: PlayerSectState
  questState: QuestRuntimeState
  startingRank?: SectRankLevel
  costSilver?: number
  consumeItemId?: string | null
  allowOfficialTransfer?: boolean
  /** 调用方（如门派事务面板 evaluateSectEntry）已完成门派排他与转任校验时跳过 */
  skipExclusivityCheck?: boolean
  completeEntryQuest?: boolean
  entryQuestOutcome?: string
  celunSkill?: number
  rng?: RngFn
}

export interface BuildJoinSectPatchResult {
  ok: boolean
  errorReason: string | null
  factionName: string
  startingRank: SectRankLevel
  startingRankLabel: string
  identitySuffix: string
  nextSilver: number
  nextInventory: InventoryStack[]
  nextSectState: PlayerSectState
  nextQuestState: QuestRuntimeState
  initialStipendPaid: number
  dispatchedWarrant: ActiveKaifengWarrant | null
  dispatchedWarrantDeadlineDay: number | null
  grantedGiftNames: string[]
  droppedEntryQuestIds: string[]
}

/**
 * Pure state transition for joining any sect (`sectSlice.joinSect`, `questSlice` `joinSect` effect,
 * and `cultivationSlice` 365-day Shaolin chore graduation).
 */
/** questState.flags 中记录「已领取某门派入门赠装」的旗标前缀 */
export const SECT_STARTER_GEAR_FLAG_PREFIX = 'sect_starter_gear_granted_'

export function buildJoinSectPatch(input: BuildJoinSectPatchInput): BuildJoinSectPatchResult {
  const {
    sectId,
    dayCount,
    silver,
    inventory,
    sectState,
    questState,
    costSilver = 0,
    consumeItemId = null,
    allowOfficialTransfer = false,
    skipExclusivityCheck = false,
    completeEntryQuest = false,
    entryQuestOutcome = 'joined',
    celunSkill = 0,
    rng,
  } = input

  const faction = FACTION_DB_MAP[sectId]
  const rule = getSectRule(sectId)
  const startingRank: SectRankLevel =
    input.startingRank ?? (faction?.acceptsOuterDisciple === false ? 2 : 1)
  const startingRankLabel = getSectRankTitle(sectId, startingRank)
  const identitySuffix = rule?.joinIdentitySuffix ?? ''
  const exclusivityReason = skipExclusivityCheck
    ? null
    : getSectExclusivityBlockReason(sectId, sectState, allowOfficialTransfer)

  if (!faction || exclusivityReason) {
    return {
      ok: false,
      errorReason: exclusivityReason ?? '未知势力，无法拜入。',
      factionName: faction?.name ?? sectId,
      startingRank,
      startingRankLabel,
      identitySuffix,
      nextSilver: silver,
      nextInventory: inventory,
      nextSectState: sectState,
      nextQuestState: questState,
      initialStipendPaid: 0,
      dispatchedWarrant: null,
      dispatchedWarrantDeadlineDay: null,
      grantedGiftNames: [],
      droppedEntryQuestIds: [],
    }
  }

  let nextSilver = silver - costSilver
  let nextInv = inventory.map((x) => ({ ...x }))

  if (consumeItemId) {
    const removed = removeItemFromInventory(nextInv, consumeItemId, 1)
    if (!removed) {
      return {
        ok: false,
        errorReason: '行囊中缺少所需荐书信物！',
        factionName: faction.name,
        startingRank,
        startingRankLabel,
        identitySuffix,
        nextSilver: silver,
        nextInventory: inventory,
        nextSectState: sectState,
        nextQuestState: questState,
        initialStipendPaid: 0,
        dispatchedWarrant: null,
        dispatchedWarrantDeadlineDay: null,
        grantedGiftNames: [],
        droppedEntryQuestIds: [],
      }
    }
    nextInv = removed
  }

  const curMonthIdx = Math.floor((dayCount - 1) / 30)
  const prevPeriodInfo = getHalfYearPeriodInfo(Math.max(0, dayCount - 1))
  const curPeriodInfo = getHalfYearPeriodInfo(dayCount)

  const nextSect: PlayerSectState = {
    ...clonePlayerSectState(sectState),
    sectId,
    rank: startingRank,
    rankLabel: startingRankLabel,
    contribution: 0,
    joinedDay: dayCount,
    lastStipendMonth: curMonthIdx,
    lastLiaoSpyMissionYear:
      rule?.semiAnnualDutyKind === 'liao_spy'
        ? prevPeriodInfo.latestPeriod
        : sectState.lastLiaoSpyMissionYear,
    changshanMissedCount: 0,
    activeLiaoSpy: allowOfficialTransfer ? null : sectState.activeLiaoSpy,
    activeSectTask: null,
    wonSectTournament: false,
    activeSectTournament: null,
    xingxiuDefeatedRanks: [],
    killedDingChunqiu: sectState.killedDingChunqiu,
    kaifengCasesSolved: 0,
    kaifengMissedCount: 0,
    lastKaifengCasePeriod:
      rule?.semiAnnualDutyKind === 'kaifeng_warrant' ? prevPeriodInfo.latestPeriod : 0,
    kaifengRank2Day:
      rule?.semiAnnualDutyKind === 'kaifeng_warrant' && startingRank >= 2 ? dayCount : null,
    activeKaifengWarrant: null,
    shaolinNoviceState: sectId === 'SECT-01' ? 'completed' : sectState.shaolinNoviceState,
    shaolinChoreDays: sectId === 'SECT-01' ? SHAOLIN_CHORE_TARGET_DAYS : sectState.shaolinChoreDays,
    shaolinDiscipleType:
      rule?.defaultDiscipleTypeOnJoin ??
      (sectState.sectId === sectId ? sectState.shaolinDiscipleType : 'lay'),
  }

  let initialStipendPaid = 0
  if (rule?.payInitialStipendOnJoin) {
    initialStipendPaid = computeCelunBonusAmount(
      getSectMonthlyStipend(sectId, startingRank),
      celunSkill,
    )
    nextSilver += initialStipendPaid
  }

  let dispatchedWarrant: ActiveKaifengWarrant | null = null
  let dispatchedWarrantDeadlineDay: number | null = null
  if (
    rule?.semiAnnualDutyKind === 'kaifeng_warrant' &&
    startingRank < 4 &&
    curPeriodInfo.latestPeriod > nextSect.lastKaifengCasePeriod
  ) {
    nextSect.lastKaifengCasePeriod = curPeriodInfo.latestPeriod
    const deadlineDay = curPeriodInfo.latestDispatchDay + SEMI_ANNUAL_DEADLINE_DAYS
    const warrant = generateKaifengWarrant(curPeriodInfo.latestDispatchDay, startingRank, {
      deadlineDay,
      rng,
    })
    if (warrant) {
      nextSect.activeKaifengWarrant = warrant
      dispatchedWarrant = warrant
      dispatchedWarrantDeadlineDay = deadlineDay
    }
  }

  const nextQuest = cloneQuestRuntimeState(questState)

  // 入门披挂兵刃每个门派一生只赐一次：防止「拜师 → 退派 → 再拜师」反复领取后变卖刷银
  const grantedGiftNames: string[] = []
  const starterGearFlag = `${SECT_STARTER_GEAR_FLAG_PREFIX}${sectId}`
  if (!nextQuest.flags[starterGearFlag]) {
    for (const gid of rule?.starterGearGifts ?? []) {
      const def = ITEM_DB_MAP[gid]
      if (def) {
        nextInv = addItemToInventory(nextInv, gid, 1)
        grantedGiftNames.push(`【${def.name}】`)
      }
    }
    if (grantedGiftNames.length > 0) {
      nextQuest.flags[starterGearFlag] = true
    }
  }
  const linkedQuestId = rule?.entryQuestId
  if (
    completeEntryQuest &&
    linkedQuestId &&
    (nextQuest.activeQuests[linkedQuestId] || rule?.autoCompleteEntryQuestOnJoin)
  ) {
    delete nextQuest.activeQuests[linkedQuestId]
    const prevComp = nextQuest.completedQuests[linkedQuestId]
    nextQuest.completedQuests[linkedQuestId] = {
      questId: linkedQuestId,
      outcome: entryQuestOutcome,
      completedDay: dayCount,
      count: (prevComp?.count ?? 0) + 1,
    }
  }

  // 无论通过剧情还是门派事务面板拜师，其余门派尚在进行中的入门线一律作罢并清退临时演员
  const droppedEntryQuestIds: string[] = []
  for (const qid of Object.keys(nextQuest.activeQuests)) {
    const entrySect = getEntryQuestSectId(qid)
    if (entrySect && entrySect !== sectId) {
      delete nextQuest.activeQuests[qid]
      nextQuest.dynamicActors = nextQuest.dynamicActors.filter((a) => a.questId !== qid)
      droppedEntryQuestIds.push(qid)
    }
  }

  return {
    ok: true,
    errorReason: null,
    factionName: faction.name,
    startingRank,
    startingRankLabel,
    identitySuffix,
    nextSilver,
    nextInventory: nextInv,
    nextSectState: nextSect,
    nextQuestState: nextQuest,
    initialStipendPaid,
    dispatchedWarrant,
    dispatchedWarrantDeadlineDay,
    grantedGiftNames,
    droppedEntryQuestIds,
  }
}
