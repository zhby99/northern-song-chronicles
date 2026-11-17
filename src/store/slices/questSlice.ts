import type { StoreSlice } from '../storeTypes'
import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPCS_DB,
} from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { QUEST_MAP } from '../../data/quests'
import {
  cloneQuestRuntimeState,
  evaluateQuestCondition,
  findMatchingLocationTriggers,
  resolveQuestCombatOpponent,
} from '../../engine/questEngine'
import type {
  EquippedArtsMap,
  GameOverState,
  MartialArtSlotKey,
  NodeNpc,
  PlayerSectState,
  SectRankLevel,
} from '../../types/game'
import {
  cloneHeroBaseStats,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
} from '../../utils/heroStats'
import {
  formatSongDate,
  NODE_MAP,
  QUEST_LOCKED_BUILDINGS,
} from '../../utils/mapMath'
import {
  INITIAL_NPC_FAVOR,
  MAX_NPC_FAVOR,
  MIN_NPC_FAVOR,
} from '../../utils/npcFavor'
import {
  buildPlayerCombatant,
  createCombatSession,
  type DuelStakesKind,
} from '../../utils/combatEngine'
import {
  clonePlayerSectState,
  generateKaifengWarrant,
  getChangshanMonthlyStipend,
  getHalfYearPeriodInfo,
  getImperialGuardMonthlyStipend,
  getKaifengMonthlyStipend,
  getSectRankTitle,
  isSongAlignedNpc,
  SECT_ENTRY_GEAR_GIFTS,
  SEMI_ANNUAL_DEADLINE_DAYS,
  SHAOLIN_CHORE_TARGET_DAYS,
} from '../../utils/sectMechanics'
import {
  createLogEntry,
  advanceShichenClock,
  addItemToInventory,
  removeItemFromInventory,
  applyDayProgressionSectHooks,
  buildStoreEvalContext,
} from '../storeHelpers'

export type QuestKeys =
  | 'toggleHideTrackedQuest'
  | 'unhideAllTrackedQuests'
  | 'runQuestEffects'
  | 'advanceStoryScene'
  | 'selectStoryChoice'
  | 'closeStoryScene'
  | 'fireLocationTriggersForCurrentSpot'
  | 'checkExpiredQuestDeadlines'

export const createQuestSlice: StoreSlice<QuestKeys> = (set, get) => ({
  toggleHideTrackedQuest: (trackKey) =>
    set((s) => {
      const exists = s.hiddenQuestIds.includes(trackKey)
      return {
        hiddenQuestIds: exists
          ? s.hiddenQuestIds.filter((id) => id !== trackKey)
          : [...s.hiddenQuestIds, trackKey],
      }
    }),
  unhideAllTrackedQuests: () => set({ hiddenQuestIds: [] }),

  runQuestEffects: (effects, contextNpc = null) => {
    for (const eff of effects) {
      const s = get()
      if (s.gameOver) return

      switch (eff.type) {
        case 'openScene': {
          set({
            activeStoryScene: {
              scene: eff.scene,
              beatIndex: 0,
              contextNpc: contextNpc ?? null,
            },
            activeNpcInteraction: null,
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
          })
          break
        }

        case 'startQuest': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          const stepId = eff.stepId ?? qDef?.initialStepId ?? 'init'
          nextQuest.activeQuests[eff.questId] = {
            questId: eff.questId,
            stepId,
            startedDay: s.dayCount,
            deadlineDay: eff.deadlineDays ? s.dayCount + eff.deadlineDays : null,
            vars: { ...(eff.vars ?? {}) },
          }
          delete nextQuest.completedQuests[eff.questId]

          const stepTitle = qDef?.steps[stepId]?.title ?? stepId
          const msg = `开启江湖卷宗《${qDef?.title ?? eff.questId}》——当前指引：${stepTitle}`
          set({
            questState: nextQuest,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'success' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事开篇', msg, true, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'setQuestStep': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          const prev = nextQuest.activeQuests[eff.questId]
          nextQuest.activeQuests[eff.questId] = {
            questId: eff.questId,
            stepId: eff.stepId,
            startedDay: prev?.startedDay ?? s.dayCount,
            deadlineDay:
              eff.deadlineDays === undefined
                ? (prev?.deadlineDay ?? null)
                : eff.deadlineDays === null
                  ? null
                  : s.dayCount + eff.deadlineDays,
            vars: { ...(prev?.vars ?? {}), ...(eff.varsPatch ?? {}) },
          }
          const stepTitle = qDef?.steps[eff.stepId]?.title ?? eff.stepId
          const msg = `《${qDef?.title ?? eff.questId}》推进至新阶段：【${stepTitle}】`
          set({
            questState: nextQuest,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'talk' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事推进', msg, false, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'completeQuest': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          delete nextQuest.activeQuests[eff.questId]
          const prevComp = nextQuest.completedQuests[eff.questId]
          const outcomeStr = eff.outcome ?? 'completed'
          nextQuest.completedQuests[eff.questId] = {
            questId: eff.questId,
            outcome: outcomeStr,
            completedDay: s.dayCount,
            count: (prevComp?.count ?? 0) + 1,
          }
          const isSuccessOutcome = outcomeStr !== 'failed' && outcomeStr !== 'abandoned'
          const combatExpBonus =
            typeof eff.combatExp === 'number'
              ? eff.combatExp
              : isSuccessOutcome
                ? qDef?.category === 'main_story'
                  ? 120
                  : 60
                : 0
          const nextCombatExp = Math.max(0, s.combatExp + combatExpBonus)
          const msg = `圆满了结江湖卷宗《${qDef?.title ?? eff.questId}》${
            combatExpBonus > 0 ? `（战斗经验 +${combatExpBonus}，现 ${nextCombatExp}）` : ''
          }！`
          set({
            questState: nextQuest,
            combatExp: nextCombatExp,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'success' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事完结', msg, true, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'abandonQuest': {
          const qDef = QUEST_MAP[eff.questId]
          const nextQuest = cloneQuestRuntimeState(s.questState)
          delete nextQuest.activeQuests[eff.questId]
          nextQuest.dynamicActors = nextQuest.dynamicActors.filter(
            (a) => a.questId !== eff.questId,
          )
          const msg = `任务《${qDef?.title ?? eff.questId}》已中止作罢。`
          set({
            questState: nextQuest,
            actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'warn' },
            logs: eff.silent
              ? s.logs
              : [
                  createLogEntry(s.dayCount, '纪事中止', msg, false, s.shichenIdx),
                  ...s.logs,
                ].slice(0, 60),
          })
          break
        }

        case 'setFlag': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          nextQuest.flags[eff.flag] = eff.value
          const nextSect = clonePlayerSectState(s.sectState)
          if (
            eff.flag === 'toumingzhuang_state' &&
            (eff.value === 'none' || eff.value === 'accepted' || eff.value === 'completed')
          ) {
            nextSect.toumingzhuangState = eff.value
          }
          if (eff.flag === 'song_court_blacklisted') {
            nextSect.songCourtBlacklisted = Boolean(eff.value)
          }
          if (eff.flag === 'liao_suspicion_debuff') {
            nextSect.liaoSuspicionDebuff = Boolean(eff.value)
          }
          if (eff.flag === 'taihang_heavy_injury') {
            const derived = deriveHeroEffectiveStats(
              s.baseStats,
              s.equipped,
              s.equippedArts,
              s.learnedArts,
              { heavyInjury: Boolean(eff.value) },
            )
            set({
              questState: nextQuest,
              sectState: nextSect,
              maxHp: derived.maxHp,
              hp: Math.min(s.hp, derived.maxHp),
              agility: derived.agility,
            })
            break
          }
          if (eff.flag === 'taihang_bandits_eradicated' && Boolean(eff.value)) {
            const filteredMasters = s.roamingMasters.filter(
              (m) => !m.sect.includes('太行') && !m.sect.includes('绿林'),
            )
            set({
              questState: nextQuest,
              sectState: nextSect,
              roamingMasters: filteredMasters,
            })
            break
          }
          set({ questState: nextQuest, sectState: nextSect })
          break
        }

        case 'addFlagNumber': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          const curVal = Number(nextQuest.flags[eff.flag] ?? 0)
          nextQuest.flags[eff.flag] = curVal + eff.delta
          set({ questState: nextQuest })
          break
        }

        case 'giveSilver': {
          set({ silver: Math.max(0, s.silver + eff.amount) })
          break
        }

        case 'giveFood': {
          set({ food: Math.max(0, s.food + eff.amount) })
          break
        }

        case 'giveCombatExp': {
          set({ combatExp: Math.max(0, s.combatExp + eff.amount) })
          break
        }

        case 'modifyRenown': {
          const nextRenown = Math.max(0, s.renown + eff.delta)
          const sign = eff.delta >= 0 ? `+${eff.delta}` : `${eff.delta}`
          const reason = eff.reason ? `（${eff.reason}）` : ''
          set({
            renown: nextRenown,
            logs:
              eff.delta !== 0
                ? [
                    createLogEntry(
                      s.dayCount,
                      '声名远播',
                      `江湖声望 ${sign}${reason}，当前 ${nextRenown} 点。`,
                      true,
                      s.shichenIdx,
                    ),
                    ...s.logs,
                  ].slice(0, 60)
                : s.logs,
          })
          break
        }

        case 'modifyChivalry': {
          const nextChivalry = s.chivalry + eff.delta
          const sign = eff.delta >= 0 ? `+${eff.delta}` : `${eff.delta}`
          const reason = eff.reason ? `（${eff.reason}）` : ''
          set({
            chivalry: nextChivalry,
            logs:
              eff.delta !== 0
                ? [
                    createLogEntry(
                      s.dayCount,
                      '侠义之举',
                      `江湖侠义 ${sign}${reason}，当前 ${nextChivalry} 点。`,
                      true,
                      s.shichenIdx,
                    ),
                    ...s.logs,
                  ].slice(0, 60)
                : s.logs,
          })
          break
        }

        case 'giveItem': {
          const nextInv = addItemToInventory(s.inventory, eff.itemId, eff.qty ?? 1)
          set({ inventory: nextInv })
          break
        }

        case 'removeItem': {
          const needQty = eff.qty ?? 1
          const existing = s.inventory.find((x) => x.itemId === eff.itemId)
          if (existing) {
            const actualRemove = Math.min(existing.qty, needQty)
            const nextInv = removeItemFromInventory(s.inventory, eff.itemId, actualRemove)
            if (nextInv) set({ inventory: nextInv })
          }
          break
        }

        case 'modifySkill': {
          const nextBase = cloneHeroBaseStats(s.baseStats)
          if (eff.key === '骑术') {
            nextBase.ridingSkill = Math.max(
              0,
              Math.min(HERO_BASE_CAPS.ridingSkill, nextBase.ridingSkill + eff.delta),
            )
          } else {
            const cur = nextBase.skills[eff.key] ?? 40
            nextBase.skills[eff.key] = Math.max(
              0,
              Math.min(HERO_BASE_CAPS.civilSkill, cur + eff.delta),
            )
          }
          const derived = deriveHeroEffectiveStats(
            nextBase,
            s.equipped,
            s.equippedArts,
            s.learnedArts,
          )
          set({
            baseStats: nextBase,
            ridingSkill: derived.ridingSkill,
            skills: derived.skills,
          })
          break
        }

        case 'healPlayer': {
          const addHp = eff.hpPct ? Math.round(s.maxHp * (eff.hpPct / 100)) : 0
          const addMp = eff.mpPct ? Math.round(s.maxMp * (eff.mpPct / 100)) : 0
          set({
            hp: Math.max(1, Math.min(s.maxHp, s.hp + addHp)),
            mp: Math.max(0, Math.min(s.maxMp, s.mp + addMp)),
          })
          break
        }

        case 'teachMartialArt': {
          const art = MARTIAL_ART_DB_MAP[eff.artId]
          if (!art) break
          const targetLv = Math.max(1, Math.min(10, eff.level ?? 1))
          const initExp = Math.max(0, eff.exp ?? 0)
          const nextLearned = s.learnedArts.map((x) => ({ ...x }))
          const idx = nextLearned.findIndex((x) => x.artId === eff.artId)
          if (idx === -1) {
            nextLearned.push({ artId: eff.artId, level: targetLv, exp: initExp })
          } else {
            const prev = nextLearned[idx]!
            nextLearned[idx] = {
              artId: eff.artId,
              level: Math.max(prev.level, targetLv),
              exp: prev.exp + initExp,
            }
          }
          const nextEquippedArts: EquippedArtsMap = { ...s.equippedArts }
          let autoEquippedLabel = ''
          if (eff.autoEquip) {
            const alreadySlotted = (
              Object.keys(nextEquippedArts) as MartialArtSlotKey[]
            ).some((k) => nextEquippedArts[k] === eff.artId)
            if (!alreadySlotted) {
              if (
                art.category === '内功' &&
                (nextEquippedArts.neigong === null || nextEquippedArts.neigong === 'MA-199')
              ) {
                nextEquippedArts.neigong = eff.artId
                autoEquippedLabel = '，并已运使为主修内功'
              } else if (
                art.category === '轻功' &&
                (nextEquippedArts.qinggong === null || nextEquippedArts.qinggong === 'MA-217')
              ) {
                nextEquippedArts.qinggong = eff.artId
                autoEquippedLabel = '，并已运使为轻功身法'
              } else if (art.category !== '内功' && art.category !== '轻功') {
                const moveSlots: MartialArtSlotKey[] = ['move1', 'move2', 'move3', 'move4']
                const emptySlot = moveSlots.find((ms) => nextEquippedArts[ms] === null)
                if (emptySlot) {
                  nextEquippedArts[emptySlot] = eff.artId
                  autoEquippedLabel = '，并已装入出战招式槽'
                }
              }
            }
          }
          const derived = deriveHeroEffectiveStats(
            s.baseStats,
            s.equipped,
            nextEquippedArts,
            nextLearned,
          )
          const hpGain = Math.max(0, derived.maxHp - s.maxHp)
          const mpGain = Math.max(0, derived.maxMp - s.maxMp)
          const msg = `剧情传功：领悟${art.fullTier}${art.category}《${art.cleanName}》（第 ${targetLv} 重${
            initExp > 0 ? `，初始熟练度 +${initExp}` : ''
          }）${autoEquippedLabel}！`
          set({
            learnedArts: nextLearned,
            equippedArts: nextEquippedArts,
            maxHp: derived.maxHp,
            hp: Math.min(derived.maxHp, s.hp + hpGain),
            maxMp: derived.maxMp,
            mp: Math.min(derived.maxMp, s.mp + mpGain),
            agility: derived.agility,
            res: derived.res,
            qinggongBonus: derived.qinggongBonus,
            logs: [
              createLogEntry(s.dayCount, '绝学传授', msg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'addArtExp': {
          const amount = Math.max(0, Math.round(eff.amount))
          if (amount <= 0) break
          const nextLearned = s.learnedArts.map((x) => ({ ...x }))
          let targetId = eff.artId
          if (!targetId) {
            targetId =
              s.equippedArts.move1 ??
              s.equippedArts.neigong ??
              s.equippedArts.qinggong ??
              s.equippedArts.move2 ??
              s.equippedArts.move3 ??
              s.equippedArts.move4 ??
              nextLearned[0]?.artId
          }
          if (!targetId) break
          const idx = nextLearned.findIndex((x) => x.artId === targetId)
          if (idx === -1) break
          nextLearned[idx] = {
            ...nextLearned[idx]!,
            exp: nextLearned[idx]!.exp + amount,
          }
          const artName = MARTIAL_ART_DB_MAP[targetId]?.cleanName ?? targetId
          set({
            learnedArts: nextLearned,
            logs: [
              createLogEntry(
                s.dayCount,
                '武学精进',
                `实战感悟：《${artName}》熟练度 +${amount}！`,
                false,
                s.shichenIdx,
              ),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'confirmJoinSect': {
          get().joinSect(eff.sectId, contextNpc ?? undefined)
          break
        }

        case 'setSectRank': {
          if (s.sectState.sectId !== eff.sectId) break
          const nextRankLabel = getSectRankTitle(eff.sectId, eff.rank)
          const nextSect: PlayerSectState = {
            ...clonePlayerSectState(s.sectState),
            rank: eff.rank,
            rankLabel: nextRankLabel,
          }
          const isPromo = eff.rank >= s.sectState.rank
          const fName = FACTION_DB_MAP[eff.sectId]?.name ?? eff.sectId
          const logMsg = isPromo
            ? `奉诏晋升【${fName}】第 ${eff.rank} 阶军职——【${nextRankLabel}】！`
            : `朝堂问责降级：【${fName}】职衔贬为第 ${eff.rank} 阶【${nextRankLabel}】！`
          set({
            sectState: nextSect,
            logs: [
              createLogEntry(s.dayCount, isPromo ? '军职晋升' : '削职降级', logMsg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'fineSectSalary': {
          const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
          const perMonth =
            s.sectState.sectId === 'SECT-33'
              ? getImperialGuardMonthlyStipend(s.sectState.rank)
              : s.sectState.sectId === 'SECT-17'
                ? getKaifengMonthlyStipend(s.sectState.rank)
                : s.sectState.sectId === 'SECT-22'
                  ? getChangshanMonthlyStipend(s.sectState.rank)
                  : 30
          const totalFine = Math.max(0, perMonth * eff.months)
          const paidNow = Math.min(s.silver, totalFine)
          const nextSilver = Math.max(0, s.silver - paidNow)
          const unpaid = Math.max(0, totalFine - paidNow)
          const withholdMonths = unpaid > 0 ? Math.ceil(unpaid / Math.max(1, perMonth)) : 0
          const nextSect: PlayerSectState = {
            ...clonePlayerSectState(s.sectState),
            lastStipendMonth:
              withholdMonths > 0
                ? Math.max(s.sectState.lastStipendMonth, curMonthIdx + withholdMonths)
                : s.sectState.lastStipendMonth,
          }
          const fineMsg =
            withholdMonths > 0
              ? `奉旨罚俸 ${eff.months} 个月（共 ${totalFine} 两纹银）：已扣缴现银 ${paidNow} 两，余欠俸银折抵停发后续 ${withholdMonths} 个月官俸！`
              : `奉旨罚没 ${eff.months} 个月俸禄，共计扣缴纹银 ${totalFine} 两！`
          set({
            silver: nextSilver,
            sectState: nextSect,
            logs: [
              createLogEntry(s.dayCount, '朝堂罚俸', fineMsg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'joinSect': {
          const faction = FACTION_DB_MAP[eff.sectId]
          if (!faction) break
          const startRank: SectRankLevel =
            eff.rank ?? (faction.acceptsOuterDisciple === false ? 2 : 1)
          const rankLabel = getSectRankTitle(eff.sectId, startRank)
          const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
          const prevPeriodInfo = getHalfYearPeriodInfo(Math.max(0, s.dayCount - 1))
          const curPeriodInfo = getHalfYearPeriodInfo(s.dayCount)

          const nextSect: PlayerSectState = {
            ...clonePlayerSectState(s.sectState),
            sectId: eff.sectId,
            rank: startRank,
            rankLabel,
            contribution: 0,
            joinedDay: s.dayCount,
            lastStipendMonth: curMonthIdx,
            lastLiaoSpyMissionYear:
              eff.sectId === 'SECT-22'
                ? prevPeriodInfo.latestPeriod
                : s.sectState.lastLiaoSpyMissionYear,
            changshanMissedCount: 0,
            activeLiaoSpy: eff.allowOfficialTransfer ? null : s.sectState.activeLiaoSpy,
            kaifengCasesSolved: 0,
            kaifengMissedCount: 0,
            lastKaifengCasePeriod:
              eff.sectId === 'SECT-17' ? prevPeriodInfo.latestPeriod : 0,
            kaifengRank2Day: eff.sectId === 'SECT-17' && startRank >= 2 ? s.dayCount : null,
            activeKaifengWarrant: null,
            shaolinNoviceState:
              eff.sectId === 'SECT-01' ? 'completed' : s.sectState.shaolinNoviceState,
            shaolinChoreDays:
              eff.sectId === 'SECT-01' ? SHAOLIN_CHORE_TARGET_DAYS : s.sectState.shaolinChoreDays,
            shaolinDiscipleType:
              eff.sectId === 'SECT-01' || eff.sectId === 'SECT-04'
                ? 'lay'
                : eff.sectId === 'SECT-03'
                  ? 'monk'
                  : s.sectState.shaolinDiscipleType,
          }

          let nextSilver = s.silver
          if (eff.sectId === 'SECT-22') {
            nextSilver += getChangshanMonthlyStipend(startRank)
          }
          if (eff.sectId === 'SECT-33') {
            nextSilver += getImperialGuardMonthlyStipend(startRank)
          }
          if (
            eff.sectId === 'SECT-17' &&
            startRank < 4 &&
            curPeriodInfo.latestPeriod > nextSect.lastKaifengCasePeriod
          ) {
            nextSect.lastKaifengCasePeriod = curPeriodInfo.latestPeriod
            nextSect.activeKaifengWarrant = generateKaifengWarrant(
              curPeriodInfo.latestDispatchDay,
              startRank,
              { deadlineDay: curPeriodInfo.latestDispatchDay + SEMI_ANNUAL_DEADLINE_DAYS },
            )
          }

          let nextInv = s.inventory
          const entryGiftIds = SECT_ENTRY_GEAR_GIFTS[eff.sectId] ?? []
          const grantedGiftNames: string[] = []
          for (const gid of entryGiftIds) {
            const def = ITEM_DB_MAP[gid]
            if (def) {
              nextInv = addItemToInventory(nextInv, gid, 1)
              grantedGiftNames.push(`【${def.name}】`)
            }
          }

          const giftSuffix =
            grantedGiftNames.length > 0
              ? ` 入门获赐制式披挂：${grantedGiftNames.join('、')}！`
              : ''
          const msg = `正式拜入【${faction.name}】，授职第 ${startRank} 阶【${rankLabel}】${
            eff.sectId === 'SECT-01'
              ? '（俗家弟子）'
              : eff.sectId === 'SECT-03'
                ? '（出家僧众）'
                : eff.sectId === 'SECT-04'
                  ? '（护寺俗家）'
                  : ''
          }！${giftSuffix}`
          set({
            silver: nextSilver,
            inventory: nextInv,
            sectState: nextSect,
            actionFeedback: { text: msg, tone: 'success' },
            logs: [
              createLogEntry(s.dayCount, '拜入宗门', msg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'leaveSect': {
          if (!s.sectState.sectId) break
          if (eff.skipPenalty) {
            const leavingSectId = s.sectState.sectId
            const factionName =
              FACTION_DB_MAP[leavingSectId]?.name ?? leavingSectId
            const nextSect: PlayerSectState = {
              ...clonePlayerSectState(s.sectState),
              sectId: null,
              rank: 1,
              rankLabel: '无门无派',
              contribution: 0,
              activeLiaoSpy: null,
              shaolinDiscipleType:
                leavingSectId === 'SECT-01' ||
                leavingSectId === 'SECT-03' ||
                leavingSectId === 'SECT-04'
                  ? 'lay'
                  : s.sectState.shaolinDiscipleType,
            }
            set({
              sectState: nextSect,
              logs: [
                createLogEntry(
                  s.dayCount,
                  '奉命离宗',
                  `少侠依约脱离【${factionName}】。`,
                  false,
                  s.shichenIdx,
                ),
                ...s.logs,
              ].slice(0, 60),
            })
          } else {
            get().leaveSect()
          }
          break
        }

        case 'addSectContribution': {
          if (!s.sectState.sectId) break
          const nextSect = clonePlayerSectState(s.sectState)
          nextSect.contribution = Math.max(0, nextSect.contribution + eff.amount)
          set({ sectState: nextSect })
          break
        }

        case 'activateShaolinNovice': {
          const nextSect = clonePlayerSectState(s.sectState)
          nextSect.shaolinNoviceState = 'active'
          const msg = `经知客禅师【玄净】收录为【嵩山少林寺 · 杂役弟子】（当前不计正式门籍）。可在少林寺山门自选天数洒扫担水，累计当值满 ${SHAOLIN_CHORE_TARGET_DAYS} 天即可正式引荐入门！`
          set({
            sectState: nextSect,
            actionFeedback: { text: msg, tone: 'success' },
            logs: [
              createLogEntry(s.dayCount, '山门挂单', msg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'ordainShaolinMonk': {
          const prevName = s.playerName
          const nextSect = clonePlayerSectState(s.sectState)
          nextSect.shaolinDiscipleType = 'monk'
          const isNanShaolin =
            eff.sectId === 'SECT-04' || nextSect.sectId === 'SECT-04'
          const isWutai =
            eff.sectId === 'SECT-03' || nextSect.sectId === 'SECT-03'
          const msg = isNanShaolin
            ? `于莆田南少林九莲大雄宝殿礼拜方丈【元苦】落发受戒，俗名「${prevName}」化入空门，赐弘字辈法号【${eff.dharmaName}】！自此换穿佛子僧衣，南少林地阶秘传功法尽数向小师父敞开！`
            : isWutai
              ? `于五台山清凉寺大雄主殿礼拜方丈【道清】落发受戒，俗名「${prevName}」化入清凉空门，赐明字辈护法法号【${eff.dharmaName}】！自此换穿清凉僧衣，执杖护国，禅武双修！`
              : `于少林大雄正殿礼拜方丈【玄慈】落发受戒，俗名「${prevName}」化入空门，赐慧字辈法号【${eff.dharmaName}】！自此换穿佛子僧衣，少林地阶与天阶秘传绝学尽数向小师父敞开！`
          set({
            playerName: eff.dharmaName,
            playerPortraitId: eff.portraitId,
            sectState: nextSect,
            actionFeedback: { text: msg, tone: 'success' },
            logs: [
              createLogEntry(s.dayCount, '剃度受戒', msg, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'modifyNpcFavor': {
          const nextFavor = { ...s.npcFavor }
          if (eff.target.kind === 'npc') {
            const cur = nextFavor[eff.target.npcId] ?? INITIAL_NPC_FAVOR
            nextFavor[eff.target.npcId] = Math.max(
              MIN_NPC_FAVOR,
              Math.min(MAX_NPC_FAVOR, cur + eff.delta),
            )
          } else {
            for (const npc of NPCS_DB) {
              if (!isSongAlignedNpc(npc)) continue
              const cur = nextFavor[npc.id] ?? INITIAL_NPC_FAVOR
              nextFavor[npc.id] = Math.max(
                MIN_NPC_FAVOR,
                Math.min(MAX_NPC_FAVOR, cur + eff.delta),
              )
            }
          }
          set({ npcFavor: nextFavor })
          break
        }

        case 'spawnDynamicActor': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          nextQuest.dynamicActors = [
            ...nextQuest.dynamicActors.filter((a) => a.actorId !== eff.actor.actorId),
            {
              ...eff.actor,
              stats: { ...eff.actor.stats },
            },
          ]
          set({ questState: nextQuest })
          break
        }

        case 'removeDynamicActor': {
          const nextQuest = cloneQuestRuntimeState(s.questState)
          nextQuest.dynamicActors = nextQuest.dynamicActors.filter((a) => {
            if (eff.actorId && a.actorId === eff.actorId) return false
            if (eff.questId && a.questId === eff.questId) return false
            return true
          })
          set({ questState: nextQuest })
          break
        }

        case 'teleportPlayer': {
          const bRec = eff.buildingId ? BUILDING_DB_MAP[eff.buildingId] : null
          const enterBldg = Boolean(bRec?.interior)
          const lockCfg = eff.buildingId ? QUEST_LOCKED_BUILDINGS[eff.buildingId] : undefined
          let nextQuest = s.questState
          if (lockCfg && !s.questState.flags[lockCfg.unlockFlag]) {
            nextQuest = cloneQuestRuntimeState(s.questState)
            nextQuest.flags[lockCfg.unlockFlag] = true
          }
          set({
            questState: nextQuest,
            traveling: null,
            campPos: null,
            currentNodeId: eff.regionId,
            activeRegionId: eff.regionId,
            selectedNodeId: eff.regionId,
            viewMode: enterBldg ? 'building' : 'region',
            activeBuildingInteriorId: enterBldg && bRec ? bRec.id : null,
            selectedBuildingId: enterBldg
              ? eff.spotId
                ? null
                : (bRec?.id ?? null)
              : (eff.buildingId ?? null),
            selectedSpotId: enterBldg ? (eff.spotId ?? null) : null,
            regionPan: { x: 0, y: 0, scale: 1 },
          })
          break
        }

        case 'advanceShichen': {
          const clock = advanceShichenClock(s.dayCount, s.shichenIdx, eff.count)
          const dayHook =
            clock.daysAdded > 0
              ? applyDayProgressionSectHooks({
                  nextDayCount: clock.dayCount,
                  shichenIdx: clock.shichenIdx,
                  silver: s.silver,
                  sectState: s.sectState,
                  logs: s.logs,
                  npcFavor: s.npcFavor,
                })
              : {
                  silver: s.silver,
                  sectState: s.sectState,
                  logs: s.logs,
                  npcFavor: s.npcFavor,
                  overdueSpyAmbush: null,
                }
          set({
            dayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            silver: dayHook.silver,
            sectState: dayHook.sectState,
            npcFavor: dayHook.npcFavor,
            logs: dayHook.logs.slice(0, 60),
          })
          if (clock.daysAdded > 0) {
            get().checkExpiredQuestDeadlines()
          }
          break
        }

        case 'startCombat': {
          const opp = resolveQuestCombatOpponent(
            eff.opponent,
            contextNpc ?? null,
            s.questState.dynamicActors,
          )
          if (!opp) break

          const extraEnemyNodes = (eff.extraOpponents ?? [])
            .map((spec) =>
              resolveQuestCombatOpponent(spec, contextNpc ?? null, s.questState.dynamicActors),
            )
            .filter((n): n is NodeNpc => Boolean(n))
          const allyNodes = (eff.allies ?? [])
            .map((spec) =>
              resolveQuestCombatOpponent(spec, contextNpc ?? null, s.questState.dynamicActors),
            )
            .filter((n): n is NodeNpc => Boolean(n))

          const clock = advanceShichenClock(s.dayCount, s.shichenIdx, 1)
          const startHp = Math.max(1, s.hp)
          const playerCombatant = buildPlayerCombatant({
            playerName: s.playerName,
            playerPortraitId: s.playerPortraitId,
            hp: startHp,
            mp: s.mp,
            baseStats: s.baseStats,
            equipped: s.equipped,
            equippedArts: s.equippedArts,
            learnedArts: s.learnedArts,
          })

          // 任务战斗规则：非切磋性质的任务战斗（rule === 'duel' 或 lethalOnLose === true）一旦败北均直接判定死亡（Game Over）；明确标注为切磋/宗门考校的试炼则点到为止。
          const isLethalDuel = eff.rule === 'duel' || Boolean(eff.lethalOnLose)
          const isSurviveRounds = eff.rule === 'survive_rounds'
          const stakes: DuelStakesKind = eff.duelStakesTag ?? (isLethalDuel ? 'duel' : 'spar')

          const session = createCombatSession({
            mode: isLethalDuel ? 'duel' : 'spar',
            duelStakes: stakes,
            player: playerCombatant,
            npcNode: opp,
            allyNpcNodes: allyNodes,
            extraEnemyNpcNodes: extraEnemyNodes,
            maxRounds: eff.maxRounds ?? (isSurviveRounds ? 10 : undefined),
            surviveToWin: isSurviveRounds,
            forbidEscapeReason:
              eff.forbidEscapeReason !== undefined
                ? eff.forbidEscapeReason
                : isSurviveRounds
                  ? isLethalDuel
                    ? '生死交锋十合之内，退路已封，不可临阵脱逃！'
                    : '师门考校试炼之中，不可临阵脱逃！'
                  : isLethalDuel
                    ? '任务生死交锋正值紧要关头，不可临阵脱逃！'
                    : null,
            customIntroText: eff.introText,
            questCombatHook: {
              questId: eff.questId,
              rule: eff.rule,
              lethalOnLose: eff.lethalOnLose,
              deathTitle: eff.deathTitle,
              deathDetail: eff.deathDetail,
              onWin: eff.onWin,
              onLose: eff.onLose,
              onEscape: eff.onEscape,
              onDraw: eff.onDraw,
            },
          })

          set({
            dayCount: clock.dayCount,
            shichenIdx: clock.shichenIdx,
            activeCombat: session,
            activeStoryScene: null,
            activeNpcInteraction: null,
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
          })
          break
        }

        case 'triggerGameOver': {
          const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
          const songDate = formatSongDate(s.dayCount, s.shichenIdx)
          const payload: GameOverState = {
            reasonTitle: eff.reasonTitle,
            reasonDetail: eff.reasonDetail,
            killerName: eff.killerName ?? '江湖劫数',
            songDate,
            locationName: regionName,
          }
          set({
            activeCombat: null,
            activeStoryScene: null,
            activeNpcInteraction: null,
            hp: 0,
            gameOver: payload,
            logs: [
              createLogEntry(s.dayCount, eff.reasonTitle, eff.reasonDetail, true, s.shichenIdx),
              ...s.logs,
            ].slice(0, 60),
          })
          return
        }

        case 'toast': {
          set({
            actionFeedback: {
              text: eff.text,
              tone: eff.tone ?? 'talk',
            },
            logs: [
              createLogEntry(
                s.dayCount,
                eff.logTag ?? '江湖纪事',
                eff.text,
                true,
                s.shichenIdx,
              ),
              ...s.logs,
            ].slice(0, 60),
          })
          break
        }

        case 'branch': {
          const evalRes = evaluateQuestCondition(
            eff.condition,
            buildStoreEvalContext(s, contextNpc),
          )
          const subEffects = evalRes.passed ? eff.thenEffects : (eff.elseEffects ?? [])
          if (subEffects.length > 0) {
            get().runQuestEffects(subEffects, contextNpc)
          }
          break
        }
      }
    }
  },

  advanceStoryScene: () => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur) return

    if (cur.beatIndex + 1 < cur.scene.beats.length) {
      set({
        activeStoryScene: {
          ...cur,
          beatIndex: cur.beatIndex + 1,
        },
      })
      return
    }

    // Reached final beat: if there are no choices, close scene and execute onFinishEffects
    if (!cur.scene.choices || cur.scene.choices.length === 0) {
      const finishEffects = cur.scene.onFinishEffects ?? []
      const ctxNpc = cur.contextNpc
      set({ activeStoryScene: null })
      if (finishEffects.length > 0) {
        get().runQuestEffects(finishEffects, ctxNpc)
      }
    }
  },

  selectStoryChoice: (choiceId) => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur || !cur.scene.choices) return
    const choice = cur.scene.choices.find((c) => c.id === choiceId)
    if (!choice) return

    if (choice.condition) {
      const check = evaluateQuestCondition(
        choice.condition,
        buildStoreEvalContext(s, cur.contextNpc),
      )
      if (!check.passed) {
        set({
          actionFeedback: {
            text: check.reason ?? '尚未满足该抉择条件。',
            tone: 'warn',
          },
        })
        return
      }
    }

    const ctxNpc = cur.contextNpc
    set({ activeStoryScene: null })
    if (choice.effects.length > 0) {
      get().runQuestEffects(choice.effects, ctxNpc)
    }
  },

  closeStoryScene: () => {
    const s = get()
    const cur = s.activeStoryScene
    if (!cur || cur.scene.mandatory) return
    // Only allow direct close if there are no choices, or if one of the choices has empty effects
    if (cur.scene.choices && cur.scene.choices.length > 0) {
      const safeExit = cur.scene.choices.find((c) => !c.condition && c.effects.length === 0)
      if (!safeExit) return
      set({ activeStoryScene: null })
      return
    }
    const finishEffects = cur.scene.onFinishEffects ?? []
    const ctxNpc = cur.contextNpc
    set({ activeStoryScene: null })
    if (finishEffects.length > 0) {
      get().runQuestEffects(finishEffects, ctxNpc)
    }
  },

  fireLocationTriggersForCurrentSpot: (loc) => {
    const s = get()
    if (s.gameOver || s.activeCombat) return false
    const matched = findMatchingLocationTriggers(loc, buildStoreEvalContext(s))
    if (matched.length === 0) return false

    for (const { trigger } of matched) {
      const latest = get()
      if (latest.gameOver || latest.activeCombat) break
      if (trigger.onceFlag) {
        const nextQuest = cloneQuestRuntimeState(latest.questState)
        nextQuest.flags[trigger.onceFlag] = true
        set({ questState: nextQuest })
      }
      get().runQuestEffects(trigger.effects, null)
    }
    return true
  },

  checkExpiredQuestDeadlines: () => {
    const s = get()
    if (s.gameOver) return
    const activeEntries = Object.values(s.questState.activeQuests)
    for (const prog of activeEntries) {
      if (prog.deadlineDay === null || s.dayCount <= prog.deadlineDay) continue
      const qDef = QUEST_MAP[prog.questId]
      // Clear deadline first so it never loops infinitely
      const nextQuest = cloneQuestRuntimeState(get().questState)
      if (nextQuest.activeQuests[prog.questId]) {
        nextQuest.activeQuests[prog.questId] = {
          ...nextQuest.activeQuests[prog.questId]!,
          deadlineDay: null,
        }
        set({ questState: nextQuest })
      }
      if (
        qDef?.onDeadlineExpired &&
        (!qDef.onDeadlineExpired.stepId || qDef.onDeadlineExpired.stepId === prog.stepId)
      ) {
        get().runQuestEffects(qDef.onDeadlineExpired.effects, null)
      }
    }
  },
})
