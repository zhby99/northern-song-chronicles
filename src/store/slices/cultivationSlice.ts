import type { StoreSlice } from '../storeTypes'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
} from '../../data/gameDb'
import { getEffectiveTalents } from '../../data/itemsDb'
import {
  getArtCombatExpRequired,
  getArtExpRequired,
} from '../../data/playerMartialArts'
import {
  calcVocationDailyWage,
  checkVocationSkillMet,
  computePoemRenownGain,
  getAvailableVocationsForBuilding,
  getLandmarkPoemSpot,
  VOCATION_DEFS,
} from '../../engine/economy'
import {
  buildEarlyStopCultivationPatch,
  commitTimeAdvance,
  createLogEntry,
  stepCultivationSessionPure,
} from '../../engine/time'
import {
  computeDailyArtExpGain,
  getArtLevelFromExp,
  getExpForArtLevel,
  MAX_ART_EXP,
} from '../../engine/stats/artsProgression'
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
} from '../../engine/stats/heroStats'
import { NODE_MAP } from '../../engine/world/mapMath'
import {
  getSectRule,
  SHAOLIN_CHORE_TARGET_DAYS,
  shouldPauseForSectTournament,
} from '../../engine/sect'

export type CultivationKeys =
  | 'cultivateLearnedArt'
  | 'startScriptureSeclusion'
  | 'startShaolinChore'
  | 'startOddJobWork'
  | 'startVocationWork'
  | 'inscribeLandmarkPoem'
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
      birthplaceId: s.birthplaceId,
      equippedMountId: s.equipped.mount,
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
          text: `客栈闭关每日需宿费及草料 ${venueStatus.dailySilverCost} 两纹银（当前 ${s.silver} 两），银两不足无法闭关！`,
          tone: 'warn',
        },
      })
      return
    }

    if (venueStatus.dailyFoodCost > 0 && s.food < venueStatus.dailyFoodCost) {
      set({
        actionFeedback: {
          text: `野外扎营闭关每日需消耗 ${venueStatus.dailyFoodCost} 份行军干粮/草料，当前粮草不足！`,
          tone: 'warn',
        },
      })
      return
    }

    const targetShichens = mode === 'until_breakthrough' ? 3600 * 12 : mode * 12
    const dailyGain = calcDailyCultivationExpGain(
      art,
      getEffectiveTalents(s.baseStats.talents, s.equipped, s.equippedArts, s.learnedArts),
      venueStatus.multiplier,
      s.skills['经义'] ?? 0,
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
    if (!getSectRule(s.sectState.sectId)?.supportsScriptureCopying) {
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

  startVocationWork: (vocationKey, days) => {
    const s = get()
    if (s.gameOver || s.activeCombat || s.activeStoryScene) return
    if (s.cultivationSession || s.traveling) return
    const curBuildingId = s.activeBuildingInteriorId ?? s.selectedBuildingId
    const bldg = curBuildingId ? BUILDING_DB_MAP[curBuildingId] : null
    const isAtCurrentRegion = s.currentNodeId === s.activeRegionId && !s.campPos
    if (!isAtCurrentRegion || !bldg || bldg.regionId !== s.currentNodeId) {
      set({
        actionFeedback: {
          text: '须亲临所在城池对应书院、商号或衙署方可应募当差！',
          tone: 'warn',
        },
      })
      return
    }
    const available = getAvailableVocationsForBuilding(bldg.id, bldg.name, bldg.actLabel)
    if (!available.includes(vocationKey)) {
      set({
        actionFeedback: {
          text: `【${bldg.name}】并未招揽【${VOCATION_DEFS[vocationKey].name}】一职！`,
          tone: 'warn',
        },
      })
      return
    }
    const skillCheck = checkVocationSkillMet(vocationKey, s.skills)
    if (!skillCheck.ok) {
      set({
        actionFeedback: {
          text: skillCheck.reason ?? '造诣未达标，难以胜任此差事！',
          tone: 'warn',
        },
      })
      return
    }

    const def = VOCATION_DEFS[vocationKey]
    const dailyWageRate = calcVocationDailyWage(vocationKey, s.skills)
    if (dailyWageRate <= 0) {
      set({
        actionFeedback: {
          text: `当前【${def.primaryArtLabel}】造诣尚浅，暂无润格薪俸，请先研习精进！`,
          tone: 'warn',
        },
      })
      return
    }

    const safeDays = days === 5 || days === 10 || days === 30 ? days : 10
    const regionName = NODE_MAP[s.currentNodeId]?.name ?? bldg.regionName

    set({
      menuOpen: false,
      compendiumOpen: false,
      activeNpcInteraction: null,
      tooltip: null,
      actionFeedback: null,
      cultivationSession: {
        kind: 'vocation_work',
        vocationKey,
        dailyWageRate,
        artId: `VOCATION_${vocationKey.toUpperCase()}`,
        artName: `${def.name}（日薪 ${dailyWageRate.toFixed(2)} 两）`,
        artCleanName: def.name,
        artFullTier: def.roleLabel,
        mode: safeDays,
        venue: 'city_building',
        venueLabel: `${regionName} · ${bldg.name}`,
        multiplier: 1,
        dailySilverCost: 0,
        dailyFoodCost: 0,
        dailyGain: Math.round(dailyWageRate * safeDays),
        targetShichens: safeDays * 12,
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

  inscribeLandmarkPoem: () => {
    const s = get()
    if (s.gameOver || s.activeCombat || s.activeStoryScene) return
    if (s.cultivationSession || s.traveling) return
    const curBuildingId = s.activeBuildingInteriorId ?? s.selectedBuildingId
    const bldg = curBuildingId ? BUILDING_DB_MAP[curBuildingId] : null
    const spot = getLandmarkPoemSpot(curBuildingId)
    if (!spot || !bldg || s.campPos || s.currentNodeId !== bldg.regionId) {
      set({
        actionFeedback: {
          text: '须亲临天下名楼、古刹或五岳绝顶胜迹，方可挥毫题壁留名！',
          tone: 'warn',
        },
      })
      return
    }

    if (s.inscribedPoemSpotIds.includes(spot.buildingId)) {
      set({
        actionFeedback: {
          text: `少侠已于【${bldg.name}】题壁留墨，佳句传诵一时，无需重复落笔！`,
          tone: 'talk',
        },
      })
      return
    }

    const poetrySkill = s.skills['诗词'] ?? 0
    const renownGain = computePoemRenownGain(poetrySkill)
    const nextInscribed = [...s.inscribedPoemSpotIds, spot.buildingId]

    commitTimeAdvance(set, get, {
      deltaShichen: 1,
      chargeForeignLodging: true,
      autosaveReason: '名胜题壁留诗',
      buildExtraPatch: (adv) => {
        const nextRenown = s.renown + renownGain
        const msg = `登临【${bldg.name}】醉墨挥毫：「${spot.verseSample}」四座击节传抄，江湖声望 +${renownGain}（诗词 ${poetrySkill} · 现声望 ${nextRenown}）！`
        return {
          renown: nextRenown,
          inscribedPoemSpotIds: nextInscribed,
          actionFeedback: { text: msg, tone: 'success' },
          logs: [
            createLogEntry(adv.dayCount, '名胜题壁', msg, true, adv.shichenIdx),
            ...adv.logs,
          ].slice(0, 60),
        }
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
      getEffectiveTalents(s.baseStats.talents, s.equipped, s.equippedArts, s.learnedArts).悟性,
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
    const res = stepCultivationSessionPure(s, session, speedStep)

    set(res.patch)

    if (res.daysAdded > 0) {
      get().checkExpiredQuestDeadlines()
    }
    if (res.overdueSpyAmbush) {
      get().startNpcCombat(res.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
      return
    }
    if (res.postEffects && res.postEffects.length > 0) {
      get().runQuestEffects(res.postEffects, null)
    }
    if (res.autosaveReason) {
      void get().saveToSlot('autosave', res.autosaveReason, true)
    }
    // 闭关快进跨入二月初一宗门大比会期：自动收功并提示，避免一口气跳过大比
    const afterTick = get()
    if (
      afterTick.cultivationSession &&
      !afterTick.activeCombat &&
      !afterTick.activeStoryScene &&
      shouldPauseForSectTournament({
        prevDayCount: s.dayCount,
        nextDayCount: afterTick.dayCount,
        sectState: afterTick.sectState,
      })
    ) {
      get().stopCultivationEarly()
      set({
        actionFeedback: {
          text: '二月初一已至，本门宗门大比开幕（会期至初十）！闭关已自动收功，请速回山门面见掌门报名。',
          tone: 'warn',
        },
      })
    }
  },

  stopCultivationEarly: () => {
    const s = get()
    const sess = s.cultivationSession
    if (!sess) return
    const res = buildEarlyStopCultivationPatch(s, sess)
    set(res.patch)
    if (res.autosaveReason) {
      void get().saveToSlot('autosave', res.autosaveReason, true)
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
      getEffectiveTalents(nextBase.talents, s.equipped, s.equippedArts, s.learnedArts).悟性,
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

    const levelNote =
      nextLv > currentLv
        ? `【${artKey}】精进至 ${nextLv} 级（+${nextLv - currentLv}）`
        : `【${artKey}】修习 +${gainedExp} 经验（当前 ${nextLv} 级）`
    const fullMessage = `${sourceLabel} ${days} 日：${levelNote}${milestoneNotes.length > 0 ? ' · ' + milestoneNotes.join(' ') : ''}`

    commitTimeAdvance(set, get, {
      deltaShichen: days * 12,
      silverOverride: s.silver - costSilver,
      maxHpOverride: derived.maxHp,
      maxMpOverride: derived.maxMp,
      buildExtraPatch: (adv) => ({
        baseStats: nextBase,
        artExps: { ...s.artExps, [artKey]: nextExp },
        artMilestoneFlags: nextFlags,
        ridingSkill: derived.ridingSkill,
        skills: derived.skills,
        agility: derived.agility,
        maxHp: derived.maxHp,
        maxMp: derived.maxMp,
        res: derived.res,
        logs: [
          createLogEntry(
            adv.dayCount,
            '十艺',
            fullMessage,
            nextLv > currentLv || milestoneNotes.length > 0,
            adv.shichenIdx,
          ),
          ...adv.logs,
        ].slice(0, 60),
      }),
    })

    return { ok: true, message: fullMessage }
  },

  setCultivationSpeedStep: (step) => set({ cultivationSpeedStep: step }),

  setInspectedLearnedArtId: (artId) => set({ inspectedLearnedArtId: artId }),
})
