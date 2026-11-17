import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { getArtCombatExpRequired, getArtExpRequired } from '../../data/playerMartialArts'
import type { GameStoreData } from '../../store/storeTypes'
import type { CultivationSessionState, NodeNpc } from '../../types/game'
import type { QuestEffect } from '../../types/quest'
import { defaultRng, type RngFn } from '../combat/rng'
import {
  buildJoinSectPatch,
  clonePlayerSectState,
  SHAOLIN_CHORE_TARGET_DAYS,
} from '../sect'
import {
  getArtLevelFromExp,
  getExpForArtLevel,
  MAX_ART_EXP,
  syncArtLevelsToExpsAndMilestones,
} from '../stats/artsProgression'
import {
  cloneHeroBaseStats,
  DAYS_PER_MONTH,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
  MONTHLY_ODD_JOB_SILVER,
} from '../stats/heroStats'
import { computeTimeAdvanceState, createLogEntry } from './clock'

export type CultivationStateSnapshot = Pick<
  GameStoreData,
  | 'dayCount'
  | 'shichenIdx'
  | 'silver'
  | 'food'
  | 'combatExp'
  | 'hp'
  | 'maxHp'
  | 'mp'
  | 'maxMp'
  | 'currentNodeId'
  | 'campPos'
  | 'baseStats'
  | 'equipped'
  | 'equippedArts'
  | 'learnedArts'
  | 'inventory'
  | 'sectState'
  | 'questState'
  | 'npcFavor'
  | 'roamingMasters'
  | 'artExps'
  | 'artMilestoneFlags'
  | 'logs'
  | 'gameOver'
>

export interface CultivationTickResult {
  patch: Partial<GameStoreData>
  daysAdded: number
  overdueSpyAmbush: NodeNpc | null
  autosaveReason: string | null
  postEffects?: QuestEffect[]
}

function formatDurationLabel(shichensElapsed: number): string {
  const fullDays = Math.floor(shichensElapsed / 12)
  const remShichen = shichensElapsed % 12
  if (fullDays > 0 && remShichen > 0) return `${fullDays} 天 ${remShichen} 时辰`
  if (fullDays > 0) return `${fullDays} 天`
  return `${remShichen} 时辰`
}

/**
 * 1) 十艺百工修行纯函数 tick
 */
export function tickTenArtSession(
  s: CultivationStateSnapshot,
  session: CultivationSessionState,
  speedStep: number,
  rng: RngFn = defaultRng,
): CultivationTickResult {
  const artKey = session.tenArtKey!
  const heavyInjuryOpt = { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) }
  const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
  const deltaShichen = Math.min(speedStep, remainTarget)
  const nextShichensElapsed = session.shichensElapsed + deltaShichen

  let preSilver = s.silver
  let nextSilverSpent = session.silverSpent
  let stopNote: string | null = null

  const prevFullDays = Math.floor(session.shichensElapsed / 12)
  const nextFullDays = Math.floor(nextShichensElapsed / 12)
  const silverDaysToPay = Math.max(0, nextFullDays - prevFullDays)
  if (silverDaysToPay > 0 && session.dailySilverCost > 0) {
    const neededSilver = session.dailySilverCost * silverDaysToPay
    if (preSilver < neededSilver) {
      stopNote = '随身银两不足，修行提前结束'
    } else {
      preSilver -= neededSilver
      nextSilverSpent += neededSilver
    }
  }

  const adv = computeTimeAdvanceState({
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    deltaShichen,
    silver: preSilver,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    currentNodeId: s.currentNodeId,
    campPos: s.campPos,
    sectState: s.sectState,
    npcFavor: s.npcFavor,
    roamingMasters: s.roamingMasters,
    logs: s.logs,
    vitalityFactor: 0,
    rng,
  })

  const targetFloor = stopNote
    ? session.settledExpFloor
    : Math.floor((session.dailyGain * nextShichensElapsed) / 12)
  const expGainNow = Math.max(0, targetFloor - session.settledExpFloor)

  const nextBase = cloneHeroBaseStats(s.baseStats)
  const prevLv = artKey === '骑术' ? nextBase.ridingSkill : (nextBase.skills[artKey] ?? 0)
  const prevExp = Math.max(s.artExps[artKey] ?? 0, getExpForArtLevel(prevLv))
  const nextExp = Math.min(MAX_ART_EXP, prevExp + expGainNow)
  const nextLv = getArtLevelFromExp(nextExp)

  if (artKey === '骑术') nextBase.ridingSkill = nextLv
  else nextBase.skills[artKey] = nextLv

  const nextFlags = [...s.artMilestoneFlags]
  const milestoneNotes: string[] = []
  if (
    (artKey === '琴' || artKey === '书' || artKey === '画' || artKey === '诗词') &&
    nextLv >= 80 &&
    !nextFlags.includes(`art80:${artKey}`)
  ) {
    nextFlags.push(`art80:${artKey}`)
    const prevVal = nextBase.talents.颜值
    nextBase.talents.颜值 = Math.min(100, prevVal + 2)
    milestoneNotes.push(`【${artKey}】初入 80 级，【颜值 +${nextBase.talents.颜值 - prevVal}】`)
  }
  if (nextLv >= 90 && !nextFlags.includes(`art90:${artKey}`)) {
    nextFlags.push(`art90:${artKey}`)
    if (artKey === '骑术') {
      const prevVal = nextBase.talents.根骨
      nextBase.talents.根骨 = Math.min(100, prevVal + 2)
      milestoneNotes.push(`【骑术】初入 90 级，【根骨 +${nextBase.talents.根骨 - prevVal}】`)
    } else {
      const prevVal = nextBase.talents.悟性
      nextBase.talents.悟性 = Math.min(100, prevVal + 2)
      milestoneNotes.push(`【${artKey}】初入 90 级，【悟性 +${nextBase.talents.悟性 - prevVal}】`)
    }
  }

  const nextDerived = deriveHeroEffectiveStats(
    nextBase,
    s.equipped,
    s.equippedArts,
    s.learnedArts,
    heavyInjuryOpt,
  )
  const rec = computeTimeAdvanceState({
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    deltaShichen,
    silver: 0,
    hp: s.hp,
    maxHp: nextDerived.maxHp,
    mp: s.mp,
    maxMp: nextDerived.maxMp,
    currentNodeId: s.currentNodeId,
    campPos: s.campPos,
    sectState: s.sectState,
    npcFavor: s.npcFavor,
    roamingMasters: s.roamingMasters,
    logs: [],
    skipSectDayHooks: true,
    rotateMasters: false,
    vitalityFactor: 1,
    rng,
  })

  const nextTotalExpGained = session.totalExpGained + expGainNow
  const reachedTarget = nextShichensElapsed >= session.targetShichens
  const reachedMax = nextLv >= 100
  const finished =
    reachedTarget || reachedMax || Boolean(stopNote) || Boolean(adv.overdueSpyAmbush)

  let nextLogs = adv.logs
  if (milestoneNotes.length > 0) {
    nextLogs = [
      createLogEntry(adv.dayCount, '十艺蜕变', milestoneNotes.join(' · '), true, adv.shichenIdx),
      ...nextLogs,
    ].slice(0, 60)
  }

  if (finished) {
    const durationLabel = formatDurationLabel(nextShichensElapsed)
    const leveledUp = nextLv > session.startLevel
    const summary = `于【${session.venueLabel}】修行【${artKey}】${durationLabel}（经验 +${nextTotalExpGained.toLocaleString()}${nextSilverSpent > 0 ? ` · 花费 ${nextSilverSpent} 两` : ''}）：当前 Lv.${nextLv}${leveledUp ? `（突破 +${nextLv - session.startLevel} 级）` : ''}${stopNote ? ` [${stopNote}]` : ''}`
    nextLogs = [
      createLogEntry(
        adv.dayCount,
        leveledUp ? '十艺精进' : '十艺修行',
        summary,
        leveledUp,
        adv.shichenIdx,
      ),
      ...nextLogs,
    ].slice(0, 60)
    return {
      daysAdded: adv.daysAdded,
      overdueSpyAmbush: adv.overdueSpyAmbush,
      autosaveReason: null,
      patch: {
        dayCount: adv.dayCount,
        shichenIdx: adv.shichenIdx,
        silver: adv.silver,
        sectState: adv.sectState,
        npcFavor: adv.npcFavor,
        roamingMasters: adv.roamingMasters,
        baseStats: nextBase,
        artExps: { ...s.artExps, [artKey]: nextExp },
        artMilestoneFlags: nextFlags,
        ridingSkill: nextDerived.ridingSkill,
        skills: nextDerived.skills,
        agility: nextDerived.agility,
        maxHp: nextDerived.maxHp,
        hp: rec.hp,
        maxMp: nextDerived.maxMp,
        mp: rec.mp,
        res: nextDerived.res,
        cultivationSession: null,
        actionFeedback: { text: summary, tone: stopNote ? 'warn' : 'success' },
        logs: nextLogs,
      },
    }
  }

  return {
    daysAdded: adv.daysAdded,
    overdueSpyAmbush: null,
    autosaveReason: null,
    patch: {
      dayCount: adv.dayCount,
      shichenIdx: adv.shichenIdx,
      silver: adv.silver,
      sectState: adv.sectState,
      npcFavor: adv.npcFavor,
      roamingMasters: adv.roamingMasters,
      baseStats: nextBase,
      artExps: { ...s.artExps, [artKey]: nextExp },
      artMilestoneFlags: nextFlags,
      ridingSkill: nextDerived.ridingSkill,
      skills: nextDerived.skills,
      agility: nextDerived.agility,
      maxHp: nextDerived.maxHp,
      hp: rec.hp,
      maxMp: nextDerived.maxMp,
      mp: rec.mp,
      res: nextDerived.res,
      logs: nextLogs,
      cultivationSession: {
        ...session,
        shichensElapsed: nextShichensElapsed,
        silverSpent: nextSilverSpent,
        totalExpGained: nextTotalExpGained,
        settledExpFloor: targetFloor,
      },
    },
  }
}

/**
 * 2) 佛门藏经阁研读经义纯函数 tick
 */
export function tickScriptureSession(
  s: CultivationStateSnapshot,
  session: CultivationSessionState,
  speedStep: number,
  rng: RngFn = defaultRng,
): CultivationTickResult {
  const heavyInjuryOpt = { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) }
  const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
  const deltaShichen = Math.min(speedStep, remainTarget)
  const nextShichensElapsed = session.shichensElapsed + deltaShichen

  const adv = computeTimeAdvanceState({
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    deltaShichen,
    silver: s.silver,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    currentNodeId: s.currentNodeId,
    campPos: s.campPos,
    sectState: s.sectState,
    npcFavor: s.npcFavor,
    roamingMasters: s.roamingMasters,
    logs: s.logs,
    vitalityFactor: 1,
    rng,
  })

  const reachedTarget = nextShichensElapsed >= session.targetShichens
  if (reachedTarget || adv.overdueSpyAmbush) {
    let nextBaseStats = s.baseStats
    let nextArtExps = s.artExps
    let nextArtFlags = s.artMilestoneFlags
    let nextDerived = deriveHeroEffectiveStats(
      s.baseStats,
      s.equipped,
      s.equippedArts,
      s.learnedArts,
      heavyInjuryOpt,
    )
    let msgText = ''
    if (reachedTarget) {
      const clonedBase = cloneHeroBaseStats(s.baseStats)
      clonedBase.skills['经义'] = Math.min(
        HERO_BASE_CAPS.civilSkill,
        (clonedBase.skills['经义'] ?? 0) + 1,
      )
      const synced = syncArtLevelsToExpsAndMilestones({
        baseStats: clonedBase,
        artExps: s.artExps,
        artMilestoneFlags: s.artMilestoneFlags,
        keysToSync: ['经义'],
      })
      nextBaseStats = clonedBase
      nextArtExps = synced.artExps
      nextArtFlags = synced.artMilestoneFlags
      nextDerived = deriveHeroEffectiveStats(
        nextBaseStats,
        s.equipped,
        s.equippedArts,
        s.learnedArts,
        heavyInjuryOpt,
      )
      const milestoneSuffix =
        synced.milestoneNotes.length > 0 ? ` · ${synced.milestoneNotes.join(' ')}` : ''
      msgText = `于【${session.venueLabel}】闭关研读经义 30 天，佛理通达，经义 +1（现 ${nextDerived.skills['经义']}）${milestoneSuffix}！`
    } else {
      msgText = '边关军令期限已至，提前收功出关应战。'
    }
    const nextLogs = [
      createLogEntry(
        adv.dayCount,
        reachedTarget ? '研读经义' : '闭关中止',
        msgText,
        reachedTarget,
        adv.shichenIdx,
      ),
      ...adv.logs,
    ].slice(0, 60)

    return {
      daysAdded: adv.daysAdded,
      overdueSpyAmbush: adv.overdueSpyAmbush,
      autosaveReason: !adv.overdueSpyAmbush && reachedTarget ? '藏经阁研读经义' : null,
      patch: {
        dayCount: adv.dayCount,
        shichenIdx: adv.shichenIdx,
        silver: adv.silver,
        sectState: adv.sectState,
        npcFavor: adv.npcFavor,
        roamingMasters: adv.roamingMasters,
        baseStats: nextBaseStats,
        artExps: nextArtExps,
        artMilestoneFlags: nextArtFlags,
        skills: nextDerived.skills,
        maxHp: nextDerived.maxHp,
        hp: Math.min(nextDerived.maxHp, adv.hp),
        maxMp: nextDerived.maxMp,
        mp: Math.min(nextDerived.maxMp, adv.mp),
        agility: nextDerived.agility,
        res: nextDerived.res,
        cultivationSession: null,
        actionFeedback: {
          text: msgText,
          tone: reachedTarget ? 'success' : 'warn',
        },
        logs: nextLogs,
      },
    }
  }

  return {
    daysAdded: adv.daysAdded,
    overdueSpyAmbush: null,
    autosaveReason: null,
    patch: {
      dayCount: adv.dayCount,
      shichenIdx: adv.shichenIdx,
      silver: adv.silver,
      hp: adv.hp,
      mp: adv.mp,
      sectState: adv.sectState,
      npcFavor: adv.npcFavor,
      roamingMasters: adv.roamingMasters,
      logs: adv.logs,
      cultivationSession: {
        ...session,
        shichensElapsed: nextShichensElapsed,
      },
    },
  }
}

/**
 * 3) 劳作当值类（少林山门杂役 `shaolin_chore` / 市井做工 `odd_job`）纯函数 tick
 */
export function tickLaborSession(
  s: CultivationStateSnapshot,
  session: CultivationSessionState,
  speedStep: number,
  rng: RngFn = defaultRng,
): CultivationTickResult {
  const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
  const deltaShichen = Math.min(speedStep, remainTarget)
  const nextShichensElapsed = session.shichensElapsed + deltaShichen
  const fullDaysInSession = Math.floor(nextShichensElapsed / 12)

  if (session.kind === 'odd_job') {
    const targetSilverEarned = Math.floor(
      (fullDaysInSession * MONTHLY_ODD_JOB_SILVER) / DAYS_PER_MONTH,
    )
    const silverGainNow = Math.max(0, targetSilverEarned - session.settledExpFloor)
    const nextTotalEarned = session.totalExpGained + silverGainNow

    const adv = computeTimeAdvanceState({
      dayCount: s.dayCount,
      shichenIdx: s.shichenIdx,
      deltaShichen,
      silver: s.silver + silverGainNow,
      hp: s.hp,
      maxHp: s.maxHp,
      mp: s.mp,
      maxMp: s.maxMp,
      currentNodeId: s.currentNodeId,
      campPos: s.campPos,
      sectState: s.sectState,
      npcFavor: s.npcFavor,
      roamingMasters: s.roamingMasters,
      logs: s.logs,
      vitalityFactor: 1,
      rng,
    })

    const reachedTarget = nextShichensElapsed >= session.targetShichens
    if (reachedTarget || Boolean(adv.overdueSpyAmbush)) {
      const msgText = adv.overdueSpyAmbush
        ? `边关军令期限已至，于【${session.venueLabel}】做工 ${fullDaysInSession} 天后结账应战（工钱 +${nextTotalEarned} 两，现银 ${adv.silver} 两）。`
        : `于【${session.venueLabel}】勤恳做工满一月（${DAYS_PER_MONTH} 天 · 店家包食宿），掌柜结清月例工钱纹银 +${nextTotalEarned} 两（现银 ${adv.silver} 两）！`
      const nextLogs = [
        createLogEntry(
          adv.dayCount,
          '市井做工',
          msgText,
          !adv.overdueSpyAmbush,
          adv.shichenIdx,
        ),
        ...adv.logs,
      ].slice(0, 60)

      return {
        daysAdded: adv.daysAdded,
        overdueSpyAmbush: adv.overdueSpyAmbush,
        autosaveReason: adv.overdueSpyAmbush ? null : '市井做工领薪',
        patch: {
          dayCount: adv.dayCount,
          shichenIdx: adv.shichenIdx,
          silver: adv.silver,
          sectState: adv.sectState,
          npcFavor: adv.npcFavor,
          roamingMasters: adv.roamingMasters,
          hp: adv.hp,
          mp: adv.mp,
          cultivationSession: null,
          actionFeedback: {
            text: msgText,
            tone: adv.overdueSpyAmbush ? 'warn' : 'success',
          },
          logs: nextLogs,
        },
      }
    }

    return {
      daysAdded: adv.daysAdded,
      overdueSpyAmbush: null,
      autosaveReason: null,
      patch: {
        dayCount: adv.dayCount,
        shichenIdx: adv.shichenIdx,
        silver: adv.silver,
        sectState: adv.sectState,
        npcFavor: adv.npcFavor,
        roamingMasters: adv.roamingMasters,
        hp: adv.hp,
        mp: adv.mp,
        logs: adv.logs,
        cultivationSession: {
          ...session,
          shichensElapsed: nextShichensElapsed,
          totalExpGained: nextTotalEarned,
          settledExpFloor: targetSilverEarned,
        },
      },
    }
  }

  // shaolin_chore
  const adv = computeTimeAdvanceState({
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    deltaShichen,
    silver: s.silver,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    currentNodeId: s.currentNodeId,
    campPos: s.campPos,
    sectState: s.sectState,
    npcFavor: s.npcFavor,
    roamingMasters: s.roamingMasters,
    logs: s.logs,
    vitalityFactor: 1,
    rng,
  })

  const nextChoreDays = Math.min(
    SHAOLIN_CHORE_TARGET_DAYS,
    Math.max(adv.sectState.shaolinChoreDays, session.startLevel + fullDaysInSession),
  )
  const nextSectState = {
    ...clonePlayerSectState(adv.sectState),
    shaolinChoreDays: nextChoreDays,
  }

  // 累计满 365 天且当前无门无派：通过统一纯函数 buildJoinSectPatch 引荐拜入嵩山少林寺
  if (nextChoreDays >= SHAOLIN_CHORE_TARGET_DAYS && !nextSectState.sectId) {
    const joinRes = buildJoinSectPatch({
      sectId: 'SECT-01',
      dayCount: adv.dayCount,
      silver: adv.silver,
      inventory: s.inventory,
      sectState: nextSectState,
      questState: s.questState,
      startingRank: 1,
      completeEntryQuest: true,
      entryQuestOutcome: 'joined_lay',
      rng,
    })

    const nextCombatExp = Math.max(0, s.combatExp + 60)
    const giftSuffix =
      joinRes.grantedGiftNames.length > 0
        ? ` 获赐入门衣履兵刃：${joinRes.grantedGiftNames.join('、')}！`
        : ''
    const joinMsg = `少林山门杂役累计满 ${SHAOLIN_CHORE_TARGET_DAYS} 天，蒙知客禅师玄净引荐，正式拜入【嵩山少林寺】第 1 阶【${joinRes.startingRankLabel}】（俗家弟子 · 战斗经验 +60）！${giftSuffix}（随时可赴大雄正殿找玄慈方丈剃度转为出家弟子「慧见」以解锁地阶/天阶武学）`

    const nextLogs = [
      createLogEntry(adv.dayCount, '拜入少林', joinMsg, true, adv.shichenIdx),
      ...adv.logs,
    ].slice(0, 60)

    return {
      daysAdded: adv.daysAdded,
      overdueSpyAmbush: null,
      autosaveReason: '杂役期满拜入少林',
      postEffects: [
        {
          type: 'openScene',
          sceneId: 'scene_shaolin_chore_365_inducted',
          questId: 'QST-SECT-01-ENTRY',
        },
      ],
      patch: {
        dayCount: adv.dayCount,
        shichenIdx: adv.shichenIdx,
        silver: joinRes.nextSilver,
        combatExp: nextCombatExp,
        inventory: joinRes.nextInventory,
        sectState: joinRes.nextSectState,
        questState: joinRes.nextQuestState,
        npcFavor: adv.npcFavor,
        roamingMasters: adv.roamingMasters,
        hp: s.maxHp,
        mp: s.maxMp,
        cultivationSession: null,
        actionFeedback: { text: joinMsg, tone: 'success' },
        logs: nextLogs,
      },
    }
  }

  const reachedTarget = nextShichensElapsed >= session.targetShichens
  if (reachedTarget || Boolean(adv.overdueSpyAmbush)) {
    const remainDays = Math.max(0, SHAOLIN_CHORE_TARGET_DAYS - nextChoreDays)
    const msgText = adv.overdueSpyAmbush
      ? '边关军令期限已至，被迫中断少林山门杂役应战。'
      : `于【嵩山少林寺 · 山门】当值劳作 ${fullDaysInSession} 天，当前累计杂役 ${nextChoreDays} / ${SHAOLIN_CHORE_TARGET_DAYS} 天（尚差 ${remainDays} 天正式引荐入门）！`
    const nextLogs = [
      createLogEntry(adv.dayCount, '少林杂役', msgText, false, adv.shichenIdx),
      ...adv.logs,
    ].slice(0, 60)

    return {
      daysAdded: adv.daysAdded,
      overdueSpyAmbush: adv.overdueSpyAmbush,
      autosaveReason:
        !adv.overdueSpyAmbush && fullDaysInSession >= 10 ? '少林山门杂役当值' : null,
      patch: {
        dayCount: adv.dayCount,
        shichenIdx: adv.shichenIdx,
        silver: adv.silver,
        sectState: nextSectState,
        npcFavor: adv.npcFavor,
        roamingMasters: adv.roamingMasters,
        hp: adv.hp,
        mp: adv.mp,
        cultivationSession: null,
        actionFeedback: {
          text: msgText,
          tone: adv.overdueSpyAmbush ? 'warn' : 'success',
        },
        logs: nextLogs,
      },
    }
  }

  return {
    daysAdded: adv.daysAdded,
    overdueSpyAmbush: null,
    autosaveReason: null,
    patch: {
      dayCount: adv.dayCount,
      shichenIdx: adv.shichenIdx,
      silver: adv.silver,
      sectState: nextSectState,
      npcFavor: adv.npcFavor,
      roamingMasters: adv.roamingMasters,
      hp: adv.hp,
      mp: adv.mp,
      logs: adv.logs,
      cultivationSession: {
        ...session,
        shichensElapsed: nextShichensElapsed,
        totalExpGained: fullDaysInSession,
      },
    },
  }
}

function buildMartialFinalizePatch(params: {
  s: CultivationStateSnapshot
  sess: CultivationSessionState
  dayCount: number
  shichenIdx: number
  learnedArts: CultivationStateSnapshot['learnedArts']
  logs: CultivationStateSnapshot['logs']
  stopNote: string | null
  overdueSpyAmbush: NodeNpc | null
}): { patch: Partial<GameStoreData>; autosaveReason: string | null } {
  const { s, sess, dayCount, shichenIdx, learnedArts, logs, stopNote, overdueSpyAmbush } = params
  const curArt = MARTIAL_ART_DB_MAP[sess.artId]
  const curIdx = learnedArts.findIndex((x) => x.artId === sess.artId)
  const curEntry =
    curIdx !== -1
      ? learnedArts[curIdx]!
      : { artId: sess.artId, level: sess.startLevel, exp: sess.startExp }

  const durationLabel = formatDurationLabel(sess.shichensElapsed)
  const leveledUp = curEntry.level > sess.startLevel
  const costParts: string[] = []
  if (sess.silverSpent > 0) costParts.push(`宿费 -${sess.silverSpent}两`)
  else if (sess.foodSpent > 0) costParts.push(`干粮 -${sess.foodSpent}份`)
  else costParts.push('师门驻地免费')
  if (sess.combatExpSpent > 0) costParts.push(`破境耗战经 ${sess.combatExpSpent}`)

  const nextReqExp = curArt ? getArtExpRequired(curArt, curEntry.level) : 0
  const progressPart =
    curEntry.level >= 10
      ? '已臻第 10 重返璞归真大圆满！'
      : leveledUp
        ? `突破至第 ${curEntry.level} 重（${curEntry.exp.toLocaleString()}/${nextReqExp.toLocaleString()}）！`
        : `第 ${curEntry.level} 重（${curEntry.exp.toLocaleString()}/${nextReqExp.toLocaleString()}）`

  const msgText =
    sess.shichensElapsed <= 0
      ? stopNote
        ? `闭关未成：${stopNote}`
        : '甫一入定便即收功出关，未耗时辰。'
      : `于【${sess.venueLabel}】闭关潜修【${sess.artName}】${durationLabel}（${costParts.join(' · ')} · 熟练度 +${sess.totalExpGained.toLocaleString()}）：${progressPart}${stopNote ? ` [${stopNote}]` : ''}`

  const nextLogs =
    sess.shichensElapsed > 0 || Boolean(stopNote)
      ? [
          createLogEntry(
            dayCount,
            leveledUp ? '闭关突破' : '闭关苦修',
            msgText,
            leveledUp || Boolean(stopNote),
            shichenIdx,
          ),
          ...logs,
        ].slice(0, 60)
      : logs

  return {
    autosaveReason:
      !overdueSpyAmbush && (sess.shichensElapsed >= 84 || leveledUp)
        ? `闭关潜修${sess.artCleanName}`
        : null,
    patch: {
      cultivationSession: null,
      inspectedLearnedArtId: sess.artId,
      ...(!overdueSpyAmbush && !s.gameOver
        ? { menuOpen: true, activeMenuTab: 'loadout' as const }
        : {}),
      actionFeedback: {
        text: msgText,
        tone: stopNote && !leveledUp ? 'warn' : 'success',
      },
      logs: nextLogs,
    },
  }
}

/**
 * 4) 武学闭关潜修纯函数 tick
 */
export function tickMartialArtSession(
  s: CultivationStateSnapshot,
  session: CultivationSessionState,
  speedStep: number,
  rng: RngFn = defaultRng,
): CultivationTickResult {
  const art = MARTIAL_ART_DB_MAP[session.artId]
  const idx = s.learnedArts.findIndex((x) => x.artId === session.artId)
  if (!art || idx === -1) {
    return {
      patch: { cultivationSession: null },
      daysAdded: 0,
      overdueSpyAmbush: null,
      autosaveReason: null,
    }
  }

  const heavyInjuryOpt = { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) }
  const remainTarget =
    session.mode === 'until_breakthrough'
      ? speedStep
      : Math.max(1, session.targetShichens - session.shichensElapsed)
  const deltaShichen = Math.min(speedStep, remainTarget)

  let preSilver = s.silver
  let nextFood = s.food
  let nextSilverSpent = session.silverSpent
  let nextFoodSpent = session.foodSpent

  const nextShichensElapsedPreview = session.shichensElapsed + deltaShichen
  const prevPaidDays = session.shichensElapsed === 0 ? 0 : Math.ceil(session.shichensElapsed / 12)
  const nextPaidDays = Math.ceil(nextShichensElapsedPreview / 12)
  const daysToPay = Math.max(0, nextPaidDays - prevPaidDays)

  if (daysToPay > 0) {
    const silverNeeded = session.dailySilverCost * daysToPay
    const foodNeeded = session.dailyFoodCost * daysToPay
    if (silverNeeded > 0 && preSilver < silverNeeded) {
      const fin = buildMartialFinalizePatch({
        s,
        sess: session,
        dayCount: s.dayCount,
        shichenIdx: s.shichenIdx,
        learnedArts: s.learnedArts,
        logs: s.logs,
        stopNote: '纹银不足支付后续宿费，提前收功出关',
        overdueSpyAmbush: null,
      })
      return {
        patch: fin.patch,
        daysAdded: 0,
        overdueSpyAmbush: null,
        autosaveReason: fin.autosaveReason,
      }
    }
    if (foodNeeded > 0 && nextFood < foodNeeded) {
      const fin = buildMartialFinalizePatch({
        s,
        sess: session,
        dayCount: s.dayCount,
        shichenIdx: s.shichenIdx,
        learnedArts: s.learnedArts,
        logs: s.logs,
        stopNote: '行囊干粮耗尽，提前收功拔营',
        overdueSpyAmbush: null,
      })
      return {
        patch: fin.patch,
        daysAdded: 0,
        overdueSpyAmbush: null,
        autosaveReason: fin.autosaveReason,
      }
    }
    preSilver -= silverNeeded
    nextFood -= foodNeeded
    nextSilverSpent += silverNeeded
    nextFoodSpent += foodNeeded
  }

  const nextShichensElapsed = session.shichensElapsed + deltaShichen
  const targetFloor = Math.round((session.dailyGain * nextShichensElapsed) / 12)
  const deltaExp = Math.max(0, targetFloor - session.settledExpFloor)
  let nextTotalExpGained = session.totalExpGained + deltaExp

  const cur = s.learnedArts[idx]!
  let nextLv = cur.level
  let nextExp = cur.exp + deltaExp
  let nextCombatExp = s.combatExp
  let nextCombatExpSpent = session.combatExpSpent
  let hitBottleneck = false
  let brokeThroughNow = false
  let stopNote: string | null = null

  while (nextLv < 10) {
    const stepReqExp = getArtExpRequired(art, nextLv)
    if (stepReqExp <= 0 || nextExp < stepReqExp) break
    const stepReqCombat = getArtCombatExpRequired(art, nextLv)
    if (nextCombatExp >= stepReqCombat) {
      nextCombatExp -= stepReqCombat
      nextCombatExpSpent += stepReqCombat
      nextExp -= stepReqExp
      nextLv += 1
      brokeThroughNow = true
    } else {
      const overflow = nextExp - stepReqExp
      nextExp = stepReqExp
      nextTotalExpGained = Math.max(0, nextTotalExpGained - overflow)
      hitBottleneck = true
      stopNote = `第 ${nextLv} 重火候圆满，待积攒 ${stepReqCombat} 点战斗经验破境（当前 ${nextCombatExp}）`
      break
    }
  }
  if (nextLv >= 10) {
    nextExp = 0
  }

  const nextLearned = s.learnedArts.map((x) => ({ ...x }))
  nextLearned[idx] = { artId: session.artId, level: nextLv, exp: nextExp }

  const derived = deriveHeroEffectiveStats(
    s.baseStats,
    s.equipped,
    s.equippedArts,
    nextLearned,
    heavyInjuryOpt,
  )

  const adv = computeTimeAdvanceState({
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    deltaShichen,
    silver: preSilver,
    hp: s.hp,
    maxHp: derived.maxHp,
    mp: s.mp,
    maxMp: derived.maxMp,
    currentNodeId: s.currentNodeId,
    campPos: s.campPos,
    sectState: s.sectState,
    npcFavor: s.npcFavor,
    roamingMasters: s.roamingMasters,
    logs: s.logs,
    emitMasterRumorLog: true,
    vitalityFactor: session.venue === 'wilderness_camp' ? 0.4 : 1,
    rng,
  })

  if (adv.overdueSpyAmbush) {
    stopNote = '边关锄奸军令期限已至，被迫提前收功应战'
  }

  const updatedSession: CultivationSessionState = {
    ...session,
    shichensElapsed: nextShichensElapsed,
    silverSpent: nextSilverSpent,
    foodSpent: nextFoodSpent,
    combatExpSpent: nextCombatExpSpent,
    totalExpGained: nextTotalExpGained,
    settledExpFloor: targetFloor,
  }

  const basePatch: Partial<GameStoreData> = {
    dayCount: adv.dayCount,
    shichenIdx: adv.shichenIdx,
    silver: adv.silver,
    food: nextFood,
    combatExp: nextCombatExp,
    sectState: adv.sectState,
    npcFavor: adv.npcFavor,
    roamingMasters: adv.roamingMasters,
    learnedArts: nextLearned,
    qinggongBonus: derived.qinggongBonus,
    maxHp: derived.maxHp,
    hp: adv.hp,
    maxMp: derived.maxMp,
    mp: adv.mp,
    agility: derived.agility,
    res: derived.res,
    logs: adv.logs,
    cultivationSession: updatedSession,
  }

  const reachedTarget = nextShichensElapsed >= session.targetShichens
  const reachedMax = nextLv >= 10
  const reachedBreakthrough = session.mode === 'until_breakthrough' && brokeThroughNow

  if (
    reachedTarget ||
    reachedMax ||
    reachedBreakthrough ||
    hitBottleneck ||
    Boolean(adv.overdueSpyAmbush)
  ) {
    const fin = buildMartialFinalizePatch({
      s,
      sess: updatedSession,
      dayCount: adv.dayCount,
      shichenIdx: adv.shichenIdx,
      learnedArts: nextLearned,
      logs: adv.logs,
      stopNote,
      overdueSpyAmbush: adv.overdueSpyAmbush,
    })
    return {
      daysAdded: adv.daysAdded,
      overdueSpyAmbush: adv.overdueSpyAmbush,
      autosaveReason: fin.autosaveReason,
      patch: {
        ...basePatch,
        ...fin.patch,
      },
    }
  }

  return {
    daysAdded: adv.daysAdded,
    overdueSpyAmbush: null,
    autosaveReason: null,
    patch: basePatch,
  }
}

export function stepCultivationSessionPure(
  s: CultivationStateSnapshot,
  session: CultivationSessionState,
  speedStep: number,
  rng: RngFn = defaultRng,
): CultivationTickResult {
  if (session.kind === 'ten_art' && session.tenArtKey) {
    return tickTenArtSession(s, session, speedStep, rng)
  }
  if (session.kind === 'scripture') {
    return tickScriptureSession(s, session, speedStep, rng)
  }
  if (session.kind === 'shaolin_chore' || session.kind === 'odd_job') {
    return tickLaborSession(s, session, speedStep, rng)
  }
  return tickMartialArtSession(s, session, speedStep, rng)
}

export function buildEarlyStopCultivationPatch(
  s: CultivationStateSnapshot,
  sess: CultivationSessionState,
): { patch: Partial<GameStoreData>; autosaveReason: string | null } {
  if (sess.kind === 'ten_art' && sess.tenArtKey) {
    const artKey = sess.tenArtKey
    const curLv = artKey === '骑术' ? s.baseStats.ridingSkill : (s.baseStats.skills[artKey] ?? 0)
    const durationLabel = formatDurationLabel(sess.shichensElapsed)
    const leveledUp = curLv > sess.startLevel
    const msgText =
      sess.shichensElapsed <= 0
        ? '甫一落座便即起身，未耗时辰。'
        : `于【${sess.venueLabel}】修行【${artKey}】${durationLabel}（经验 +${sess.totalExpGained.toLocaleString()}${sess.silverSpent > 0 ? ` · 花费 ${sess.silverSpent} 两` : ''}）：当前 Lv.${curLv}${leveledUp ? `（突破 +${curLv - sess.startLevel} 级）` : ''} [提前收功]`
    return {
      autosaveReason: null,
      patch: {
        cultivationSession: null,
        actionFeedback: { text: msgText, tone: leveledUp ? 'success' : 'warn' },
        logs:
          sess.shichensElapsed > 0
            ? [
                createLogEntry(
                  s.dayCount,
                  leveledUp ? '十艺精进' : '十艺修行',
                  msgText,
                  leveledUp,
                  s.shichenIdx,
                ),
                ...s.logs,
              ].slice(0, 60)
            : s.logs,
      },
    }
  }

  if (sess.kind === 'scripture') {
    const fullDays = Math.floor(sess.shichensElapsed / 12)
    const msgText =
      fullDays > 0
        ? `于【${sess.venueLabel}】研读经义 ${fullDays} 天，未满 30 日提前收功出关。`
        : '甫一入座便即合卷出关，未耗时日。'
    return {
      autosaveReason: null,
      patch: {
        cultivationSession: null,
        actionFeedback: { text: msgText, tone: 'warn' },
        logs:
          fullDays > 0
            ? [createLogEntry(s.dayCount, '研读经义', msgText, false, s.shichenIdx), ...s.logs].slice(
                0,
                60,
              )
            : s.logs,
      },
    }
  }

  if (sess.kind === 'shaolin_chore') {
    const fullDays = Math.floor(sess.shichensElapsed / 12)
    const nextChoreDays = Math.min(
      SHAOLIN_CHORE_TARGET_DAYS,
      Math.max(s.sectState.shaolinChoreDays, sess.startLevel + fullDays),
    )
    const remainDays = Math.max(0, SHAOLIN_CHORE_TARGET_DAYS - nextChoreDays)
    const msgText =
      fullDays > 0
        ? `于【${sess.venueLabel}】当值劳作 ${fullDays} 天后暂歇收工（累计杂役 ${nextChoreDays}/${SHAOLIN_CHORE_TARGET_DAYS} 天，距引荐入门尚余 ${remainDays} 天）。`
        : `甫一执帚便即暂歇收工，未满一日（累计杂役 ${nextChoreDays}/${SHAOLIN_CHORE_TARGET_DAYS} 天）。`
    return {
      autosaveReason: null,
      patch: {
        cultivationSession: null,
        sectState: {
          ...clonePlayerSectState(s.sectState),
          shaolinChoreDays: nextChoreDays,
        },
        actionFeedback: { text: msgText, tone: 'talk' },
        logs:
          fullDays > 0
            ? [createLogEntry(s.dayCount, '山门杂役', msgText, false, s.shichenIdx), ...s.logs].slice(
                0,
                60,
              )
            : s.logs,
      },
    }
  }

  if (sess.kind === 'odd_job') {
    const fullDays = Math.floor(sess.shichensElapsed / 12)
    const earned = sess.totalExpGained
    const msgText =
      fullDays > 0
        ? `于【${sess.venueLabel}】做工 ${fullDays} 天提前辞工结账，共领工钱纹银 +${earned} 两（现银 ${s.silver} 两）。`
        : '甫一系上围裙便即辞工歇手，未满一日。'
    return {
      autosaveReason: null,
      patch: {
        cultivationSession: null,
        actionFeedback: {
          text: msgText,
          tone: earned > 0 ? 'success' : 'talk',
        },
        logs:
          fullDays > 0
            ? [createLogEntry(s.dayCount, '市井做工', msgText, earned > 0, s.shichenIdx), ...s.logs].slice(
                0,
                60,
              )
            : s.logs,
      },
    }
  }

  return buildMartialFinalizePatch({
    s,
    sess,
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    learnedArts: s.learnedArts,
    logs: s.logs,
    stopNote: '主动收功出关',
    overdueSpyAmbush: null,
  })
}
