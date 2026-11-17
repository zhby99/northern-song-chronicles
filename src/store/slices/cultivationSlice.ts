import type { StoreSlice } from '../storeTypes'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
} from '../../data/gameDb'
import {
  getEffectiveTalents,
  ITEM_DB_MAP,
} from '../../data/itemsDb'
import {
  getArtCombatExpRequired,
  getArtExpRequired,
} from '../../data/playerMartialArts'
import { cloneQuestRuntimeState } from '../../engine/questEngine'
import type {
  NodeNpc,
  SectRankLevel,
} from '../../types/game'
import {
  computeDailyArtExpGain,
  getArtLevelFromExp,
  getExpForArtLevel,
  MAX_ART_EXP,
  syncArtLevelsToExpsAndMilestones,
} from '../../utils/artsProgression'
import {
  SHAOLIN_CHORE_COMPLETE_JOIN_SCENE,
  SHAOLIN_ENTRY_QUEST_ID,
} from '../../data/quests/sects/shaolinEntryQuest'
import {
  calcDailyCultivationExpGain,
  cloneHeroBaseStats,
  DAYS_PER_MONTH,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
  isInnBuildingRecord,
  isTavernBuildingRecord,
  MONTHLY_ODD_JOB_SILVER,
  resolveCultivationVenue,
} from '../../utils/heroStats'
import {
  ADJACENCY_MAP,
  formatSongDate,
  NODE_MAP,
} from '../../utils/mapMath'
import {
  clonePlayerSectState,
  getSectRankTitle,
  SECT_ENTRY_GEAR_GIFTS,
  SHAOLIN_CHORE_TARGET_DAYS,
} from '../../utils/sectMechanics'
import {
  createLogEntry,
  advanceShichenClock,
  addItemToInventory,
  applyDailyVitalityRecovery,
  applyDayProgressionSectHooks,
} from '../storeHelpers'

export type CultivationKeys =
  | 'cultivateLearnedArt'
  | 'startScriptureSeclusion'
  | 'startShaolinChore'
  | 'startOddJobWork'
  | 'startTenArtPractice'
  | 'stepCultivationTick'
  | 'stopCultivationEarly'
  | 'studyArtSkill'
  | 'setCultivationSpeedStep'
  | 'setInspectedLearnedArtId'

export const createCultivationSlice: StoreSlice<CultivationKeys> = (set, get) => ({
  cultivateLearnedArt: (artId, mode = 1) => {
    const s = get()
    if (s.cultivationSession) return
    const art = MARTIAL_ART_DB_MAP[artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === artId)
    if (!art || idx === -1) return

    const cur = s.learnedArts[idx]!
    if (cur.level >= 10) {
      set({
        actionFeedback: {
          text: `【${art.name}】已臻十重返璞归真之境，无需再闭关苦修！`,
          tone: 'success',
        },
      })
      return
    }

    const initReqExp = getArtExpRequired(art, cur.level)
    const initReqCombat = getArtCombatExpRequired(art, cur.level)
    if (cur.exp >= initReqExp) {
      if (s.combatExp >= initReqCombat) {
        get().breakthroughLearnedArt(artId)
        return
      }
      set({
        actionFeedback: {
          text: `《${art.cleanName}》第 ${cur.level} 重火候已满！破境升入第 ${cur.level + 1} 重需消耗 ${initReqCombat} 点战斗经验（当前 ${s.combatExp} 点），请先出关实战历练！`,
          tone: 'warn',
        },
      })
      return
    }

    const venueStatus = resolveCultivationVenue({
      traveling: Boolean(s.traveling),
      campPos: s.campPos,
      viewMode: s.viewMode,
      currentNodeId: s.currentNodeId,
      activeRegionId: s.activeRegionId,
      activeBuildingInteriorId: s.activeBuildingInteriorId,
      selectedBuildingId: s.selectedBuildingId,
      sectId: s.sectState.sectId,
    })

    if (!venueStatus.venue) {
      set({
        actionFeedback: {
          text:
            venueStatus.blockedReason ??
            '只能在【客栈】、【本门派演武场】或大地图【野外扎营】发起闭关修炼！',
          tone: 'warn',
        },
      })
      return
    }

    if (venueStatus.dailySilverCost > 0 && s.silver < venueStatus.dailySilverCost) {
      set({
        actionFeedback: {
          text: `客栈闭关每日需宿费 ${venueStatus.dailySilverCost} 两纹银（当前 ${s.silver} 两），银两不足无法闭关！`,
          tone: 'warn',
        },
      })
      return
    }

    if (venueStatus.dailyFoodCost > 0 && s.food < venueStatus.dailyFoodCost) {
      set({
        actionFeedback: {
          text: `野外扎营闭关每日需消耗 ${venueStatus.dailyFoodCost} 份行军干粮，当前粮草已尽！`,
          tone: 'warn',
        },
      })
      return
    }

    const targetShichens = mode === 'until_breakthrough' ? 3600 * 12 : mode * 12
    const dailyGain = calcDailyCultivationExpGain(
      art,
      getEffectiveTalents(s.baseStats.talents, s.equipped),
      venueStatus.multiplier,
    )

    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      inspectedLearnedArtId: artId,
      cultivationSession: {
        artId,
        artName: art.name,
        artCleanName: art.cleanName,
        artFullTier: art.fullTier,
        mode,
        venue: venueStatus.venue,
        venueLabel: venueStatus.venueLabel,
        multiplier: venueStatus.multiplier,
        dailySilverCost: venueStatus.dailySilverCost,
        dailyFoodCost: venueStatus.dailyFoodCost,
        dailyGain,
        targetShichens,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: cur.level,
        startExp: cur.exp,
      },
    })
  },

  startScriptureSeclusion: () => {
    const s = get()
    if (s.gameOver || s.activeCombat || s.activeStoryScene) return
    if (s.cultivationSession) return
    const curBuilding = s.activeBuildingInteriorId ?? s.selectedBuildingId
    const inShaolinLibrary =
      s.activeRegionId === 'shaolin' && curBuilding === 'sl_cangjing'
    const inNanShaolinLibrary =
      s.activeRegionId === 'nanshaolin' &&
      (s.selectedSpotId === 'nsl_main_east' || curBuilding === 'nsl_main')
    if (!inShaolinLibrary && !inNanShaolinLibrary) {
      set({
        actionFeedback: {
          text: '须前往【少林寺 · 藏经阁】或【莆田南少林 · 东厢碑廊藏经橱】方可闭关研读经义！',
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.sectId !== 'SECT-01' && s.sectState.sectId !== 'SECT-04') {
      set({
        actionFeedback: {
          text: '藏经阁乃佛门重地，仅【嵩山少林寺】或【莆田南少林】弟子方可入内闭关研读！',
          tone: 'warn',
        },
      })
      return
    }
    const curScripture = s.skills['经义'] ?? 0
    if (curScripture >= HERO_BASE_CAPS.civilSkill) {
      set({
        actionFeedback: {
          text: `少侠【经义】已臻 ${HERO_BASE_CAPS.civilSkill} 点圆融无碍之境，无需再闭关研读！`,
          tone: 'success',
        },
      })
      return
    }
    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      cultivationSession: {
        kind: 'scripture',
        artId: 'SCRIPTURE_STUDY',
        artName: '藏经阁研读经义',
        artCleanName: '研读经义',
        artFullTier: '佛门经义',
        mode: 30,
        venue: 'sect_grounds',
        venueLabel: inShaolinLibrary ? '少林寺 · 藏经阁' : '莆田南少林 · 藏经橱',
        multiplier: 1,
        dailySilverCost: 0,
        dailyFoodCost: 0,
        dailyGain: 0,
        targetShichens: 30 * 12,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: curScripture,
        startExp: 0,
      },
    })
  },

  startShaolinChore: (days) => {
    const s = get()
    if (s.gameOver || s.activeCombat || s.activeStoryScene) return
    if (s.cultivationSession || s.traveling) return
    if (s.currentNodeId !== 'shaolin' || s.campPos || s.activeRegionId !== 'shaolin') {
      set({
        actionFeedback: {
          text: '须亲临【嵩山少林寺】山门方可承担杂役劳作！',
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.sectId) {
      set({
        actionFeedback: {
          text: `少侠已拜入【${FACTION_DB_MAP[s.sectState.sectId]?.name ?? s.sectState.sectId}】，无需再充任少林山门杂役！`,
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.shaolinNoviceState !== 'active') {
      set({
        actionFeedback: {
          text: '尚未获准充任少林杂役弟子！请先拜见知客禅师【玄净】通过问心复试。',
          tone: 'warn',
        },
      })
      return
    }
    const remaining = Math.max(0, SHAOLIN_CHORE_TARGET_DAYS - s.sectState.shaolinChoreDays)
    if (remaining <= 0) {
      get().joinSect('SECT-01')
      return
    }
    const safeDays = Math.max(1, Math.min(remaining, Math.floor(days) || 1))
    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      cultivationSession: {
        kind: 'shaolin_chore',
        artId: 'SHAOLIN_CHORE',
        artName: '少林山门 · 洒扫担水杂役',
        artCleanName: '山门杂役',
        artFullTier: '少林杂役弟子',
        mode: safeDays,
        venue: 'sect_grounds',
        venueLabel: '嵩山少林寺 · 山门石阶',
        multiplier: 1,
        dailySilverCost: 0,
        dailyFoodCost: 0,
        dailyGain: 1,
        targetShichens: safeDays * 12,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: s.sectState.shaolinChoreDays,
        startExp: 0,
      },
    })
  },

  startOddJobWork: () => {
    const s = get()
    if (s.gameOver || s.activeCombat || s.activeStoryScene) return
    if (s.cultivationSession || s.traveling) return
    const curBuildingId = s.activeBuildingInteriorId ?? s.selectedBuildingId
    const bldg = curBuildingId ? BUILDING_DB_MAP[curBuildingId] : null
    const isAtCurrentRegion = s.currentNodeId === s.activeRegionId && !s.campPos
    const isTavern = isTavernBuildingRecord(bldg)
    const isInn = isInnBuildingRecord(bldg)
    if (!isAtCurrentRegion || !bldg || bldg.regionId !== s.currentNodeId || (!isTavern && !isInn)) {
      set({
        actionFeedback: {
          text: '须亲临城池【酒馆/酒楼】或【客栈/馆驿】方可在此做工赚取工钱！',
          tone: 'warn',
        },
      })
      return
    }
    const regionName = NODE_MAP[s.currentNodeId]?.name ?? bldg.regionName
    const jobTitle = isTavern ? '酒肆跑堂温酒做工' : '客栈迎客打杂做工'
    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      cultivationSession: {
        kind: 'odd_job',
        artId: 'ODD_JOB_WORK',
        artName: jobTitle,
        artCleanName: isTavern ? '酒馆做工' : '客栈做工',
        artFullTier: isTavern ? '市井酒肆帮工' : '车马客栈帮工',
        mode: DAYS_PER_MONTH,
        venue: 'city_building',
        venueLabel: `${regionName} · ${bldg.name}`,
        multiplier: 1,
        dailySilverCost: 0,
        dailyFoodCost: 0,
        dailyGain: MONTHLY_ODD_JOB_SILVER,
        targetShichens: DAYS_PER_MONTH * 12,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: s.silver,
        startExp: 0,
      },
    })
  },

  startTenArtPractice: (artKey, days, venueLabel, envMultiplier, dailySilverCost) => {
    const s = get()
    if (s.gameOver || s.activeCombat || s.activeStoryScene) return
    if (s.cultivationSession || s.traveling) return
    if (dailySilverCost > 0 && s.silver < dailySilverCost) {
      set({
        actionFeedback: {
          text: `随身银两不足（每日需 ${dailySilverCost} 两，当前 ${s.silver} 两），无法在此修行【${artKey}】。`,
          tone: 'warn',
        },
      })
      return
    }
    const curLv = artKey === '骑术' ? s.baseStats.ridingSkill : (s.baseStats.skills[artKey] ?? 0)
    if (curLv >= 100) {
      set({
        actionFeedback: {
          text: `少侠【${artKey}】已臻 100 级一代宗师之境，无需再修！`,
          tone: 'success',
        },
      })
      return
    }
    const curExp = Math.max(s.artExps[artKey] ?? 0, getExpForArtLevel(curLv))
    const dailyGain = computeDailyArtExpGain(
      getEffectiveTalents(s.baseStats.talents, s.equipped).悟性,
      envMultiplier,
      0,
    )
    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      cultivationSession: {
        kind: 'ten_art',
        tenArtKey: artKey,
        artId: `TEN_ART_${artKey}`,
        artName: artKey,
        artCleanName: artKey,
        artFullTier: '十艺百工',
        mode: days,
        venue: 'city_building',
        venueLabel,
        multiplier: envMultiplier,
        dailySilverCost,
        dailyFoodCost: 0,
        dailyGain,
        targetShichens: days * 12,
        shichensElapsed: 0,
        silverSpent: 0,
        foodSpent: 0,
        combatExpSpent: 0,
        totalExpGained: 0,
        settledExpFloor: 0,
        startLevel: curLv,
        startExp: curExp,
      },
    })
  },

  stepCultivationTick: () => {
    const s = get()
    const session = s.cultivationSession
    if (!session || s.gameOver || s.activeCombat || s.activeStoryScene) return
    const speedStep = s.cultivationSpeedStep ?? 1
    const heavyInjuryOpt = { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) }

    if (session.kind === 'ten_art' && session.tenArtKey) {
      const artKey = session.tenArtKey
      const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
      const deltaShichen = Math.min(speedStep, remainTarget)
      const clock = advanceShichenClock(s.dayCount, s.shichenIdx, deltaShichen)
      const nextDayCount = clock.dayCount
      const nextShichenIdx = clock.shichenIdx
      const nextShichensElapsed = session.shichensElapsed + deltaShichen

      let nextSilver = s.silver
      let nextSilverSpent = session.silverSpent
      let stopNote: string | null = null

      const prevFullDays = Math.floor(session.shichensElapsed / 12)
      const nextFullDays = Math.floor(nextShichensElapsed / 12)
      const silverDaysToPay = Math.max(0, nextFullDays - prevFullDays)
      if (silverDaysToPay > 0 && session.dailySilverCost > 0) {
        const neededSilver = session.dailySilverCost * silverDaysToPay
        if (nextSilver < neededSilver) {
          stopNote = '随身银两不足，修行提前结束'
        } else {
          nextSilver -= neededSilver
          nextSilverSpent += neededSilver
        }
      }

      let nextSectState = s.sectState
      let nextLogs = s.logs
      let nextMasters = s.roamingMasters
      let nextNpcFavor = s.npcFavor
      let overdueSpyAmbush: NodeNpc | null = null

      if (clock.daysAdded > 0) {
        if ((nextDayCount - 1) % 30 === 0) {
          nextMasters = nextMasters.map((m) => {
            const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
            if (neighbors.length === 0) return m
            const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
            return { ...m, nodeId: pick!.to }
          })
        }
        const dayHook = applyDayProgressionSectHooks({
          nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: clonePlayerSectState(nextSectState),
          logs: [...nextLogs],
          npcFavor: nextNpcFavor,
        })
        nextSilver = dayHook.silver
        nextSectState = dayHook.sectState
        nextLogs = dayHook.logs
        nextNpcFavor = dayHook.npcFavor
        overdueSpyAmbush = dayHook.overdueSpyAmbush
      }

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
      const recTenArt = applyDailyVitalityRecovery({
        hp: s.hp,
        maxHp: nextDerived.maxHp,
        mp: s.mp,
        maxMp: nextDerived.maxMp,
        daysAdded: clock.daysAdded,
        factor: 1,
      })
      const nextTotalExpGained = session.totalExpGained + expGainNow
      const reachedTarget = nextShichensElapsed >= session.targetShichens
      const reachedMax = nextLv >= 100
      const finished = reachedTarget || reachedMax || Boolean(stopNote) || Boolean(overdueSpyAmbush)

      if (milestoneNotes.length > 0) {
        nextLogs = [
          createLogEntry(nextDayCount, '十艺蜕变', milestoneNotes.join(' · '), true, nextShichenIdx),
          ...nextLogs,
        ].slice(0, 60)
      }

      if (finished) {
        const fullDays = Math.floor(nextShichensElapsed / 12)
        const remShichen = nextShichensElapsed % 12
        const durationLabel =
          fullDays > 0 && remShichen > 0
            ? `${fullDays} 天 ${remShichen} 时辰`
            : fullDays > 0
              ? `${fullDays} 天`
              : `${remShichen} 时辰`
        const leveledUp = nextLv > session.startLevel
        const summary = `于【${session.venueLabel}】修行【${artKey}】${durationLabel}（经验 +${nextTotalExpGained.toLocaleString()}${nextSilverSpent > 0 ? ` · 花费 ${nextSilverSpent} 两` : ''}）：当前 Lv.${nextLv}${leveledUp ? `（突破 +${nextLv - session.startLevel} 级）` : ''}${stopNote ? ` [${stopNote}]` : ''}`
        nextLogs = [
          createLogEntry(nextDayCount, leveledUp ? '十艺精进' : '十艺修行', summary, leveledUp, nextShichenIdx),
          ...nextLogs,
        ].slice(0, 60)
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          roamingMasters: nextMasters,
          baseStats: nextBase,
          artExps: { ...s.artExps, [artKey]: nextExp },
          artMilestoneFlags: nextFlags,
          ridingSkill: nextDerived.ridingSkill,
          skills: nextDerived.skills,
          agility: nextDerived.agility,
          maxHp: nextDerived.maxHp,
          hp: recTenArt.hp,
          maxMp: nextDerived.maxMp,
          mp: recTenArt.mp,
          res: nextDerived.res,
          cultivationSession: null,
          actionFeedback: { text: summary, tone: stopNote ? 'warn' : 'success' },
          logs: nextLogs,
        })
        if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
        if (overdueSpyAmbush) {
          get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        }
        return
      }

      set({
        dayCount: nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        npcFavor: nextNpcFavor,
        roamingMasters: nextMasters,
        baseStats: nextBase,
        artExps: { ...s.artExps, [artKey]: nextExp },
        artMilestoneFlags: nextFlags,
        ridingSkill: nextDerived.ridingSkill,
        skills: nextDerived.skills,
        agility: nextDerived.agility,
        maxHp: nextDerived.maxHp,
        hp: recTenArt.hp,
        maxMp: nextDerived.maxMp,
        mp: recTenArt.mp,
        res: nextDerived.res,
        logs: nextLogs,
        cultivationSession: {
          ...session,
          shichensElapsed: nextShichensElapsed,
          silverSpent: nextSilverSpent,
          totalExpGained: nextTotalExpGained,
          settledExpFloor: targetFloor,
        },
      })
      if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
      return
    }

    if (session.kind === 'scripture') {
      const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
      const deltaShichen = Math.min(speedStep, remainTarget)
      const clock = advanceShichenClock(s.dayCount, s.shichenIdx, deltaShichen)
      const nextDayCount = clock.dayCount
      const nextShichenIdx = clock.shichenIdx
      const nextShichensElapsed = session.shichensElapsed + deltaShichen

      let nextSilver = s.silver
      let nextSectState = s.sectState
      let nextLogs = s.logs
      let nextNpcFavor = s.npcFavor
      let nextMasters = s.roamingMasters
      let overdueSpyAmbush: NodeNpc | null = null

      if (clock.daysAdded > 0) {
        if ((nextDayCount - 1) % 30 === 0) {
          nextMasters = nextMasters.map((m) => {
            const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
            if (neighbors.length === 0) return m
            const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
            return { ...m, nodeId: pick!.to }
          })
        }

        const dayHook = applyDayProgressionSectHooks({
          nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: clonePlayerSectState(nextSectState),
          logs: [...nextLogs],
          npcFavor: nextNpcFavor,
        })
        nextSilver = dayHook.silver
        nextSectState = dayHook.sectState
        nextLogs = dayHook.logs
        nextNpcFavor = dayHook.npcFavor
        overdueSpyAmbush = dayHook.overdueSpyAmbush
      }

      const recScripture = applyDailyVitalityRecovery({
        hp: s.hp,
        maxHp: s.maxHp,
        mp: s.mp,
        maxMp: s.maxMp,
        daysAdded: clock.daysAdded,
        factor: 1,
      })

      const reachedTarget = nextShichensElapsed >= session.targetShichens
      if (reachedTarget || overdueSpyAmbush) {
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
          msgText = `边关军令期限已至，提前收功出关应战。`
        }
        nextLogs = [
          createLogEntry(
            nextDayCount,
            reachedTarget ? '研读经义' : '闭关中止',
            msgText,
            reachedTarget,
            nextShichenIdx,
          ),
          ...nextLogs,
        ].slice(0, 60)
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          roamingMasters: nextMasters,
          baseStats: nextBaseStats,
          artExps: nextArtExps,
          artMilestoneFlags: nextArtFlags,
          skills: nextDerived.skills,
          maxHp: nextDerived.maxHp,
          hp: Math.min(nextDerived.maxHp, recScripture.hp),
          maxMp: nextDerived.maxMp,
          mp: Math.min(nextDerived.maxMp, recScripture.mp),
          agility: nextDerived.agility,
          res: nextDerived.res,
          cultivationSession: null,
          actionFeedback: {
            text: msgText,
            tone: reachedTarget ? 'success' : 'warn',
          },
          logs: nextLogs,
        })
        if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
        if (overdueSpyAmbush) {
          get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
          return
        }
        if (reachedTarget) {
          void get().saveToSlot('autosave', '藏经阁研读经义', true)
        }
        return
      }

      set({
        dayCount: nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        hp: recScripture.hp,
        mp: recScripture.mp,
        sectState: nextSectState,
        npcFavor: nextNpcFavor,
        roamingMasters: nextMasters,
        logs: nextLogs.slice(0, 60),
        cultivationSession: {
          ...session,
          shichensElapsed: nextShichensElapsed,
        },
      })
      if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
      return
    }

    if (session.kind === 'shaolin_chore') {
      const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
      const deltaShichen = Math.min(speedStep, remainTarget)
      const clock = advanceShichenClock(s.dayCount, s.shichenIdx, deltaShichen)
      const nextDayCount = clock.dayCount
      const nextShichenIdx = clock.shichenIdx
      const nextShichensElapsed = session.shichensElapsed + deltaShichen

      let nextSilver = s.silver
      let nextSectState = clonePlayerSectState(s.sectState)
      let nextLogs = s.logs
      let nextMasters = s.roamingMasters
      let nextNpcFavor = s.npcFavor
      let overdueSpyAmbush: NodeNpc | null = null

      if (clock.daysAdded > 0) {
        if ((nextDayCount - 1) % 30 === 0) {
          nextMasters = nextMasters.map((m) => {
            const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
            if (neighbors.length === 0) return m
            const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
            return { ...m, nodeId: pick!.to }
          })
        }
        const dayHook = applyDayProgressionSectHooks({
          nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: nextSectState,
          logs: [...nextLogs],
          npcFavor: nextNpcFavor,
        })
        nextSilver = dayHook.silver
        nextSectState = dayHook.sectState
        nextLogs = dayHook.logs
        nextNpcFavor = dayHook.npcFavor
        overdueSpyAmbush = dayHook.overdueSpyAmbush
      }

      const fullDaysInSession = Math.floor(nextShichensElapsed / 12)
      const nextChoreDays = Math.min(
        SHAOLIN_CHORE_TARGET_DAYS,
        Math.max(nextSectState.shaolinChoreDays, session.startLevel + fullDaysInSession),
      )
      nextSectState = {
        ...nextSectState,
        shaolinChoreDays: nextChoreDays,
      }

      const recChore = applyDailyVitalityRecovery({
        hp: s.hp,
        maxHp: s.maxHp,
        mp: s.mp,
        maxMp: s.maxMp,
        daysAdded: clock.daysAdded,
        factor: 1,
      })

      // 累计满 365 天且当前无门无派：正式引荐拜入嵩山少林寺（Lv.1 外门弟子 · 默认俗家弟子）
      if (nextChoreDays >= SHAOLIN_CHORE_TARGET_DAYS && !nextSectState.sectId) {
        const startRank: SectRankLevel = 1
        const rankLabel = getSectRankTitle('SECT-01', startRank)
        const curMonthIdx = Math.floor((nextDayCount - 1) / 30)
        nextSectState = {
          ...nextSectState,
          sectId: 'SECT-01',
          rank: startRank,
          rankLabel,
          contribution: 0,
          joinedDay: nextDayCount,
          lastStipendMonth: curMonthIdx,
          activeSectTask: null,
          wonSectTournament: false,
          activeSectTournament: null,
          shaolinNoviceState: 'completed',
          shaolinChoreDays: SHAOLIN_CHORE_TARGET_DAYS,
          shaolinDiscipleType: 'lay',
        }

        let nextInv = s.inventory
        const entryGiftIds = SECT_ENTRY_GEAR_GIFTS['SECT-01'] ?? []
        const grantedGiftNames: string[] = []
        for (const gid of entryGiftIds) {
          const def = ITEM_DB_MAP[gid]
          if (def) {
            nextInv = addItemToInventory(nextInv, gid, 1)
            grantedGiftNames.push(`【${def.name}】`)
          }
        }

        const nextQuest = cloneQuestRuntimeState(s.questState)
        delete nextQuest.activeQuests[SHAOLIN_ENTRY_QUEST_ID]
        const prevComp = nextQuest.completedQuests[SHAOLIN_ENTRY_QUEST_ID]
        nextQuest.completedQuests[SHAOLIN_ENTRY_QUEST_ID] = {
          questId: SHAOLIN_ENTRY_QUEST_ID,
          outcome: 'joined_lay',
          completedDay: nextDayCount,
          count: (prevComp?.count ?? 0) + 1,
        }
        const nextCombatExp = Math.max(0, s.combatExp + 60)

        const giftSuffix =
          grantedGiftNames.length > 0
            ? ` 获赐入门衣履兵刃：${grantedGiftNames.join('、')}！`
            : ''
        const joinMsg = `少林山门杂役累计满 ${SHAOLIN_CHORE_TARGET_DAYS} 天，蒙知客禅师玄净引荐，正式拜入【嵩山少林寺】第 1 阶【${rankLabel}】（俗家弟子 · 战斗经验 +60）！${giftSuffix}（随时可赴大雄正殿找玄慈方丈剃度转为出家弟子「慧见」以解锁地阶/天阶武学）`

        nextLogs = [
          createLogEntry(nextDayCount, '拜入少林', joinMsg, true, nextShichenIdx),
          ...nextLogs,
        ].slice(0, 60)

        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          combatExp: nextCombatExp,
          inventory: nextInv,
          sectState: nextSectState,
          questState: nextQuest,
          npcFavor: nextNpcFavor,
          roamingMasters: nextMasters,
          hp: s.maxHp,
          mp: s.maxMp,
          cultivationSession: null,
          actionFeedback: { text: joinMsg, tone: 'success' },
          logs: nextLogs,
        })
        if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
        void get().saveToSlot('autosave', '杂役期满拜入少林', true)
        get().runQuestEffects(
          [{ type: 'openScene', scene: SHAOLIN_CHORE_COMPLETE_JOIN_SCENE }],
          null,
        )
        return
      }

      const reachedTarget = nextShichensElapsed >= session.targetShichens
      if (reachedTarget || Boolean(overdueSpyAmbush)) {
        const remainDays = Math.max(0, SHAOLIN_CHORE_TARGET_DAYS - nextChoreDays)
        const msgText = overdueSpyAmbush
          ? `边关军令期限已至，被迫中断少林山门杂役应战。`
          : `于【嵩山少林寺 · 山门】当值劳作 ${fullDaysInSession} 天，当前累计杂役 ${nextChoreDays} / ${SHAOLIN_CHORE_TARGET_DAYS} 天（尚差 ${remainDays} 天正式引荐入门）！`
        nextLogs = [
          createLogEntry(
            nextDayCount,
            '少林杂役',
            msgText,
            false,
            nextShichenIdx,
          ),
          ...nextLogs,
        ].slice(0, 60)
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          roamingMasters: nextMasters,
          hp: recChore.hp,
          mp: recChore.mp,
          cultivationSession: null,
          actionFeedback: {
            text: msgText,
            tone: overdueSpyAmbush ? 'warn' : 'success',
          },
          logs: nextLogs,
        })
        if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
        if (overdueSpyAmbush) {
          get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
          return
        }
        if (fullDaysInSession >= 10) {
          void get().saveToSlot('autosave', '少林山门杂役当值', true)
        }
        return
      }

      set({
        dayCount: nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        npcFavor: nextNpcFavor,
        roamingMasters: nextMasters,
        hp: recChore.hp,
        mp: recChore.mp,
        logs: nextLogs.slice(0, 60),
        cultivationSession: {
          ...session,
          shichensElapsed: nextShichensElapsed,
          totalExpGained: fullDaysInSession,
        },
      })
      if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
      return
    }

    if (session.kind === 'odd_job') {
      const remainTarget = Math.max(1, session.targetShichens - session.shichensElapsed)
      const deltaShichen = Math.min(speedStep, remainTarget)
      const clock = advanceShichenClock(s.dayCount, s.shichenIdx, deltaShichen)
      const nextDayCount = clock.dayCount
      const nextShichenIdx = clock.shichenIdx
      const nextShichensElapsed = session.shichensElapsed + deltaShichen

      const fullDaysInSession = Math.floor(nextShichensElapsed / 12)
      const targetSilverEarned = Math.floor(
        (fullDaysInSession * MONTHLY_ODD_JOB_SILVER) / DAYS_PER_MONTH,
      )
      const silverGainNow = Math.max(0, targetSilverEarned - session.settledExpFloor)
      let nextSilver = s.silver + silverGainNow
      const nextTotalEarned = session.totalExpGained + silverGainNow

      let nextSectState = s.sectState
      let nextLogs = s.logs
      let nextMasters = s.roamingMasters
      let nextNpcFavor = s.npcFavor
      let overdueSpyAmbush: NodeNpc | null = null

      if (clock.daysAdded > 0) {
        if (Math.floor((nextDayCount - 1) / 30) > Math.floor((s.dayCount - 1) / 30)) {
          nextMasters = nextMasters.map((m) => {
            const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
            if (neighbors.length === 0) return m
            const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
            return { ...m, nodeId: pick!.to }
          })
        }
        const dayHook = applyDayProgressionSectHooks({
          nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: clonePlayerSectState(nextSectState),
          logs: [...nextLogs],
          npcFavor: nextNpcFavor,
        })
        nextSilver = dayHook.silver
        nextSectState = dayHook.sectState
        nextLogs = dayHook.logs
        nextNpcFavor = dayHook.npcFavor
        overdueSpyAmbush = dayHook.overdueSpyAmbush
      }

      const recWork = applyDailyVitalityRecovery({
        hp: s.hp,
        maxHp: s.maxHp,
        mp: s.mp,
        maxMp: s.maxMp,
        daysAdded: clock.daysAdded,
        factor: 1,
      })

      const reachedTarget = nextShichensElapsed >= session.targetShichens
      if (reachedTarget || Boolean(overdueSpyAmbush)) {
        const msgText = overdueSpyAmbush
          ? `边关军令期限已至，于【${session.venueLabel}】做工 ${fullDaysInSession} 天后结账应战（工钱 +${nextTotalEarned} 两，现银 ${nextSilver} 两）。`
          : `于【${session.venueLabel}】勤恳做工满一月（${DAYS_PER_MONTH} 天 · 店家包食宿），掌柜结清月例工钱纹银 +${nextTotalEarned} 两（现银 ${nextSilver} 两）！`
        nextLogs = [
          createLogEntry(
            nextDayCount,
            '市井做工',
            msgText,
            !overdueSpyAmbush,
            nextShichenIdx,
          ),
          ...nextLogs,
        ].slice(0, 60)
        set({
          dayCount: nextDayCount,
          shichenIdx: nextShichenIdx,
          silver: nextSilver,
          sectState: nextSectState,
          npcFavor: nextNpcFavor,
          roamingMasters: nextMasters,
          hp: recWork.hp,
          mp: recWork.mp,
          cultivationSession: null,
          actionFeedback: {
            text: msgText,
            tone: overdueSpyAmbush ? 'warn' : 'success',
          },
          logs: nextLogs,
        })
        if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
        if (overdueSpyAmbush) {
          get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
          return
        }
        void get().saveToSlot('autosave', '市井做工领薪', true)
        return
      }

      set({
        dayCount: nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: nextSectState,
        npcFavor: nextNpcFavor,
        roamingMasters: nextMasters,
        hp: recWork.hp,
        mp: recWork.mp,
        logs: nextLogs.slice(0, 60),
        cultivationSession: {
          ...session,
          shichensElapsed: nextShichensElapsed,
          totalExpGained: nextTotalEarned,
          settledExpFloor: targetSilverEarned,
        },
      })
      if (clock.daysAdded > 0) get().checkExpiredQuestDeadlines()
      return
    }

    const art = MARTIAL_ART_DB_MAP[session.artId]
    const idx = s.learnedArts.findIndex((x) => x.artId === session.artId)
    if (!art || idx === -1) {
      set({ cultivationSession: null })
      return
    }

    const finalize = (stopNote: string | null, overdueSpyAmbush: NodeNpc | null = null) => {
      const latest = get()
      const sess = latest.cultivationSession
      if (!sess) return
      const curArt = MARTIAL_ART_DB_MAP[sess.artId]
      const curIdx = latest.learnedArts.findIndex((x) => x.artId === sess.artId)
      const curEntry = curIdx !== -1 ? latest.learnedArts[curIdx]! : { artId: sess.artId, level: sess.startLevel, exp: sess.startExp }

      const fullDays = Math.floor(sess.shichensElapsed / 12)
      const remShichen = sess.shichensElapsed % 12
      const durationLabel =
        fullDays > 0 && remShichen > 0
          ? `${fullDays} 天 ${remShichen} 时辰`
          : fullDays > 0
            ? `${fullDays} 天`
            : `${remShichen} 时辰`

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
            : `甫一入定便即收功出关，未耗时辰。`
          : `于【${sess.venueLabel}】闭关潜修【${sess.artName}】${durationLabel}（${costParts.join(' · ')} · 熟练度 +${sess.totalExpGained.toLocaleString()}）：${progressPart}${stopNote ? ` [${stopNote}]` : ''}`

      const nextLogs =
        sess.shichensElapsed > 0 || Boolean(stopNote)
          ? [
              createLogEntry(
                latest.dayCount,
                leveledUp ? '闭关突破' : '闭关苦修',
                msgText,
                leveledUp || Boolean(stopNote),
                latest.shichenIdx,
              ),
              ...latest.logs,
            ].slice(0, 60)
          : latest.logs

      set({
        cultivationSession: null,
        ...(session.kind !== 'scripture' && session.kind !== 'ten_art'
          ? { inspectedLearnedArtId: session.artId }
          : {}),
        ...(!overdueSpyAmbush && !latest.gameOver
          ? { menuOpen: true, activeMenuTab: 'loadout' as const }
          : {}),
        actionFeedback: {
          text: msgText,
          tone: stopNote && !leveledUp ? 'warn' : 'success',
        },
        logs: nextLogs,
      })

      if (overdueSpyAmbush) {
        get().startNpcCombat(overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
        return
      }

      if (sess.shichensElapsed >= 84 || leveledUp) {
        void get().saveToSlot('autosave', `闭关潜修${sess.artCleanName}`, true)
      }
    }

    const remainTarget =
      session.mode === 'until_breakthrough'
        ? speedStep
        : Math.max(1, session.targetShichens - session.shichensElapsed)
    const deltaShichen = Math.min(speedStep, remainTarget)

    let nextSilver = s.silver
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
      if (silverNeeded > 0 && nextSilver < silverNeeded) {
        finalize('纹银不足支付后续宿费，提前收功出关')
        return
      }
      if (foodNeeded > 0 && nextFood < foodNeeded) {
        finalize('行囊干粮耗尽，提前收功拔营')
        return
      }
      nextSilver -= silverNeeded
      nextFood -= foodNeeded
      nextSilverSpent += silverNeeded
      nextFoodSpent += foodNeeded
    }

    const clock = advanceShichenClock(s.dayCount, s.shichenIdx, deltaShichen)
    const nextDayCount = clock.dayCount
    const nextShichenIdx = clock.shichenIdx
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

    let nextSectState = s.sectState
    let nextLogs = s.logs
    let nextNpcFavor = s.npcFavor
    let nextMasters = s.roamingMasters
    let overdueSpyAmbush: NodeNpc | null = null

    if (clock.daysAdded > 0) {
      if ((nextDayCount - 1) % 30 === 0) {
        nextMasters = nextMasters.map((m) => {
          const neighbors = ADJACENCY_MAP[m.nodeId] ?? []
          if (neighbors.length === 0) return m
          const pick = neighbors[Math.floor(Math.random() * neighbors.length)]
          return { ...m, nodeId: pick!.to }
        })
        const sample = nextMasters[Math.floor(Math.random() * nextMasters.length)]
        if (sample) {
          nextLogs = [
            createLogEntry(
              nextDayCount,
              '月度风云',
              `《天下江湖风闻录》更新：【${sample.name}】近日现身于【${NODE_MAP[sample.nodeId]?.name ?? sample.nodeId}】！`,
              true,
              nextShichenIdx,
            ),
            ...nextLogs,
          ]
        }
      }

      const dayHook = applyDayProgressionSectHooks({
        nextDayCount,
        shichenIdx: nextShichenIdx,
        silver: nextSilver,
        sectState: clonePlayerSectState(nextSectState),
        logs: [...nextLogs],
        npcFavor: s.npcFavor,
      })
      nextSilver = dayHook.silver
      nextSectState = dayHook.sectState
      nextLogs = dayHook.logs
      nextNpcFavor = dayHook.npcFavor
      overdueSpyAmbush = dayHook.overdueSpyAmbush
      if (overdueSpyAmbush) {
        stopNote = '边关锄奸军令期限已至，被迫提前收功应战'
      }
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
    const recArt = applyDailyVitalityRecovery({
      hp: s.hp,
      maxHp: derived.maxHp,
      mp: s.mp,
      maxMp: derived.maxMp,
      daysAdded: clock.daysAdded,
      factor: session.venue === 'wilderness_camp' ? 0.4 : 1,
    })

    set({
      dayCount: nextDayCount,
      shichenIdx: nextShichenIdx,
      silver: nextSilver,
      food: nextFood,
      combatExp: nextCombatExp,
      sectState: nextSectState,
      npcFavor: nextNpcFavor,
      roamingMasters: nextMasters,
      learnedArts: nextLearned,
      qinggongBonus: derived.qinggongBonus,
      maxHp: derived.maxHp,
      hp: recArt.hp,
      maxMp: derived.maxMp,
      mp: recArt.mp,
      agility: derived.agility,
      res: derived.res,
      logs: nextLogs.slice(0, 60),
      cultivationSession: {
        ...session,
        shichensElapsed: nextShichensElapsed,
        silverSpent: nextSilverSpent,
        foodSpent: nextFoodSpent,
        combatExpSpent: nextCombatExpSpent,
        totalExpGained: nextTotalExpGained,
        settledExpFloor: targetFloor,
      },
    })

    if (clock.daysAdded > 0) {
      get().checkExpiredQuestDeadlines()
    }

    const reachedTarget = nextShichensElapsed >= session.targetShichens
    const reachedMax = nextLv >= 10
    const reachedBreakthrough = session.mode === 'until_breakthrough' && brokeThroughNow

    if (
      reachedTarget ||
      reachedMax ||
      reachedBreakthrough ||
      hitBottleneck ||
      Boolean(overdueSpyAmbush)
    ) {
      finalize(stopNote, overdueSpyAmbush)
    }
  },

  stopCultivationEarly: () => {
    const s = get()
    const sess = s.cultivationSession
    if (!sess) return
    if (sess.kind === 'ten_art' && sess.tenArtKey) {
      const artKey = sess.tenArtKey
      const curLv = artKey === '骑术' ? s.baseStats.ridingSkill : (s.baseStats.skills[artKey] ?? 0)
      const fullDays = Math.floor(sess.shichensElapsed / 12)
      const remShichen = sess.shichensElapsed % 12
      const durationLabel =
        fullDays > 0 && remShichen > 0
          ? `${fullDays} 天 ${remShichen} 时辰`
          : fullDays > 0
            ? `${fullDays} 天`
            : `${remShichen} 时辰`
      const leveledUp = curLv > sess.startLevel
      const msgText =
        sess.shichensElapsed <= 0
          ? `甫一落座便即起身，未耗时辰。`
          : `于【${sess.venueLabel}】修行【${artKey}】${durationLabel}（经验 +${sess.totalExpGained.toLocaleString()}${sess.silverSpent > 0 ? ` · 花费 ${sess.silverSpent} 两` : ''}）：当前 Lv.${curLv}${leveledUp ? `（突破 +${curLv - sess.startLevel} 级）` : ''} [提前收功]`
      set({
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
      })
      return
    }
    if (sess.kind === 'scripture') {
      const fullDays = Math.floor(sess.shichensElapsed / 12)
      const msgText =
        fullDays > 0
          ? `于【${sess.venueLabel}】研读经义 ${fullDays} 天，未满 30 日提前收功出关。`
          : `甫一入座便即合卷出关，未耗时日。`
      set({
        cultivationSession: null,
        actionFeedback: { text: msgText, tone: 'warn' },
        logs:
          fullDays > 0
            ? [
                createLogEntry(s.dayCount, '研读经义', msgText, false, s.shichenIdx),
                ...s.logs,
              ].slice(0, 60)
            : s.logs,
      })
      return
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
      set({
        cultivationSession: null,
        sectState: {
          ...clonePlayerSectState(s.sectState),
          shaolinChoreDays: nextChoreDays,
        },
        actionFeedback: { text: msgText, tone: 'talk' },
        logs:
          fullDays > 0
            ? [
                createLogEntry(s.dayCount, '山门杂役', msgText, false, s.shichenIdx),
                ...s.logs,
              ].slice(0, 60)
            : s.logs,
      })
      return
    }
    if (sess.kind === 'odd_job') {
      const fullDays = Math.floor(sess.shichensElapsed / 12)
      const earned = sess.totalExpGained
      const msgText =
        fullDays > 0
          ? `于【${sess.venueLabel}】做工 ${fullDays} 天提前辞工结账，共领工钱纹银 +${earned} 两（现银 ${s.silver} 两）。`
          : `甫一系上围裙便即辞工歇手，未满一日。`
      set({
        cultivationSession: null,
        actionFeedback: {
          text: msgText,
          tone: earned > 0 ? 'success' : 'talk',
        },
        logs:
          fullDays > 0
            ? [
                createLogEntry(s.dayCount, '市井做工', msgText, earned > 0, s.shichenIdx),
                ...s.logs,
              ].slice(0, 60)
            : s.logs,
      })
      return
    }
    const curArt = MARTIAL_ART_DB_MAP[sess.artId]
    const curIdx = s.learnedArts.findIndex((x) => x.artId === sess.artId)
    const curEntry =
      curIdx !== -1
        ? s.learnedArts[curIdx]!
        : { artId: sess.artId, level: sess.startLevel, exp: sess.startExp }

    const fullDays = Math.floor(sess.shichensElapsed / 12)
    const remShichen = sess.shichensElapsed % 12
    const durationLabel =
      fullDays > 0 && remShichen > 0
        ? `${fullDays} 天 ${remShichen} 时辰`
        : fullDays > 0
          ? `${fullDays} 天`
          : `${remShichen} 时辰`

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

    const stopNote = '主动收功出关'
    const msgText =
      sess.shichensElapsed <= 0
        ? `甫一入定便即收功出关，未耗时辰。`
        : `于【${sess.venueLabel}】闭关潜修【${sess.artName}】${durationLabel}（${costParts.join(' · ')} · 熟练度 +${sess.totalExpGained.toLocaleString()}）：${progressPart} [${stopNote}]`

    const nextLogs =
      sess.shichensElapsed > 0
        ? [
            createLogEntry(
              s.dayCount,
              leveledUp ? '闭关突破' : '闭关苦修',
              msgText,
              leveledUp,
              s.shichenIdx,
            ),
            ...s.logs,
          ].slice(0, 60)
        : s.logs

    set({
      cultivationSession: null,
      ...(sess.kind !== 'ten_art'
        ? { inspectedLearnedArtId: sess.artId }
        : {}),
      ...(!s.gameOver ? { menuOpen: true, activeMenuTab: 'loadout' as const } : {}),
      actionFeedback: {
        text: msgText,
        tone: leveledUp ? 'success' : 'warn',
      },
      logs: nextLogs,
    })

    if (sess.shichensElapsed >= 84 || leveledUp) {
      void get().saveToSlot('autosave', `闭关潜修${sess.artCleanName}`, true)
    }
  },

  studyArtSkill: (artKey, days, envMultiplier = 1.0, costSilver = 0, sourceLabel = '专心研习') => {
    const s = get()
    if (days <= 0) return { ok: false, message: '研习天数须大于 0。' }
    if (costSilver > 0 && s.silver < costSilver) {
      return { ok: false, message: `随身银两不足（需 ${costSilver} 两，当前 ${s.silver} 两）。` }
    }

    const nextBase = cloneHeroBaseStats(s.baseStats)
    const currentLv =
      artKey === '骑术' ? nextBase.ridingSkill : (nextBase.skills[artKey] ?? 0)
    if (currentLv >= 100) {
      return { ok: false, message: `【${artKey}】已达 100 级一代宗师之境，无需再修。` }
    }

    const prevExp = Math.max(s.artExps[artKey] ?? 0, getExpForArtLevel(currentLv))
    const dailyGain = computeDailyArtExpGain(
      getEffectiveTalents(nextBase.talents, s.equipped).悟性,
      envMultiplier,
      0,
    )
    const gainedExp = dailyGain * days
    const nextExp = Math.min(MAX_ART_EXP, prevExp + gainedExp)
    const nextLv = getArtLevelFromExp(nextExp)

    if (artKey === '骑术') {
      nextBase.ridingSkill = nextLv
    } else {
      nextBase.skills[artKey] = nextLv
    }

    const nextFlags = [...s.artMilestoneFlags]
    const milestoneNotes: string[] = []

    // 琴、书、画、诗词达到 80 级 -> 颜值 +2
    if (
      (artKey === '琴' || artKey === '书' || artKey === '画' || artKey === '诗词') &&
      nextLv >= 80 &&
      !nextFlags.includes(`art80:${artKey}`)
    ) {
      nextFlags.push(`art80:${artKey}`)
      const prevVal = nextBase.talents.颜值
      nextBase.talents.颜值 = Math.min(100, prevVal + 2)
      milestoneNotes.push(`【${artKey}】初入 80 级，腹有诗书气自华，【颜值 +${nextBase.talents.颜值 - prevVal}】！`)
    }

    // 骑术达到 90 级 -> 根骨 +2；其余十艺达到 90 级 -> 悟性 +2
    if (nextLv >= 90 && !nextFlags.includes(`art90:${artKey}`)) {
      nextFlags.push(`art90:${artKey}`)
      if (artKey === '骑术') {
        const prevVal = nextBase.talents.根骨
        nextBase.talents.根骨 = Math.min(100, prevVal + 2)
        milestoneNotes.push(`【骑术】初入 90 级，筋骨强健，【根骨 +${nextBase.talents.根骨 - prevVal}】！`)
      } else {
        const prevVal = nextBase.talents.悟性
        nextBase.talents.悟性 = Math.min(100, prevVal + 2)
        milestoneNotes.push(`【${artKey}】初入 90 级，触类旁通，【悟性 +${nextBase.talents.悟性 - prevVal}】！`)
      }
    }

    const derived = deriveHeroEffectiveStats(
      nextBase,
      s.equipped,
      s.equippedArts,
      s.learnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )

    const nextDay = s.dayCount + days
    const levelNote =
      nextLv > currentLv
        ? `【${artKey}】精进至 ${nextLv} 级（+${nextLv - currentLv}）`
        : `【${artKey}】修习 +${gainedExp} 经验（当前 ${nextLv} 级）`
    const fullMessage = `${sourceLabel} ${days} 日：${levelNote}${milestoneNotes.length > 0 ? ' · ' + milestoneNotes.join(' ') : ''}`

    const newLog = {
      id: `art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: formatSongDate(nextDay),
      tag: '十艺',
      text: fullMessage,
      highlight: nextLv > currentLv || milestoneNotes.length > 0,
    }

    set({
      dayCount: nextDay,
      silver: s.silver - costSilver,
      baseStats: nextBase,
      artExps: { ...s.artExps, [artKey]: nextExp },
      artMilestoneFlags: nextFlags,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      agility: derived.agility,
      maxHp: derived.maxHp,
      maxMp: derived.maxMp,
      res: derived.res,
      logs: [newLog, ...s.logs].slice(0, 120),
    })

    return { ok: true, message: fullMessage }
  },

  setCultivationSpeedStep: (step) => set({ cultivationSpeedStep: step }),

  setInspectedLearnedArtId: (artId) => set({ inspectedLearnedArtId: artId }),
})
