import {
  BUILDING_DB_MAP,
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPCS_DB,
} from '../../data/gameDb'
import { QUEST_MAP } from '../../data/quests'
import type { GameStoreData, GameStoreState } from '../../store/storeTypes'
import type {
  EquippedArtsMap,
  GameOverState,
  MartialArtSlotKey,
  NodeNpc,
  PlayerSectState,
} from '../../types/game'
import type { QuestEffect } from '../../types/quest'
import {
  buildPlayerCombatant,
  createCombatSession,
  type DuelStakesKind,
} from '../combat'
import {
  cloneQuestRuntimeState,
  evaluateQuestCondition,
  type QuestEvalContext,
  resolveQuestCombatOpponent,
} from '../questEngine'
import {
  buildJoinSectPatch,
  clonePlayerSectState,
  getSectEntryQuestBlockReason,
  resetSectMembership,
  resolveMonasticSecularRestore,
  getSectMonthlyStipend,
  getSectRankTitle,
  isSongAlignedNpc,
  SHAOLIN_CHORE_TARGET_DAYS,
} from '../sect'
import { addItemToInventory, removeItemFromInventory } from '../shared/inventory'
import { withNpcsMarkedDead } from '../social/npcDeath'
import { INITIAL_NPC_FAVOR, MAX_NPC_FAVOR, MIN_NPC_FAVOR } from '../social/npcFavor'
import { syncArtLevelsToExpsAndMilestones } from '../stats/artsProgression'
import {
  cloneHeroBaseStats,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
} from '../stats/heroStats'
import {
  advanceShichenClock,
  computeTimeAdvanceState,
  createLogEntry,
} from '../time'
import {
  formatSongDate,
  interpolateReignYear,
  NODE_MAP,
  QUEST_LOCKED_BUILDINGS,
} from '../world/mapMath'
import { resolveQuestSceneAsync, resolveQuestSceneSync } from './sceneRegistry'

export interface QuestEffectBatchContext {
  draft: GameStoreState
  contextNpc: NodeNpc | null
  questIdHint: string | null
  daysAddedTotal: number
  overdueSpyAmbush: NodeNpc | null
  halted: boolean
  pendingAsyncScene?: { sceneId: string; questId?: string }
  patchDraft: (partial: Partial<GameStoreData>) => void
  flushDraft: () => void
  getStore: () => GameStoreState
  applyNestedEffects: (subEffects: QuestEffect[]) => void
}

type QuestEffectHandler<E extends QuestEffect> = (
  eff: E,
  ctx: QuestEffectBatchContext,
) => void

type QuestEffectHandlerMap = {
  [K in QuestEffect['type']]: QuestEffectHandler<Extract<QuestEffect, { type: K }>>
}

function buildDraftEvalContext(
  s: GameStoreState,
  targetNpc?: NodeNpc | null,
): QuestEvalContext {
  return {
    dayCount: s.dayCount,
    shichenIdx: s.shichenIdx,
    silver: s.silver,
    renown: s.renown,
    chivalry: s.chivalry,
    food: s.food,
    hp: s.hp,
    maxHp: s.maxHp,
    mp: s.mp,
    maxMp: s.maxMp,
    agility: s.agility,
    res: s.res,
    ridingSkill: s.ridingSkill,
    baseStats: s.baseStats,
    equipped: s.equipped,
    equippedArts: s.equippedArts,
    skills: s.skills,
    inventory: s.inventory,
    learnedArts: s.learnedArts,
    npcFavor: s.npcFavor,
    deadNpcIds: s.deadNpcIds,
    playerGender: s.playerGender,
    sectState: s.sectState,
    questState: s.questState,
    targetNpc: targetNpc ?? null,
  }
}

export const QUEST_EFFECT_HANDLERS: QuestEffectHandlerMap = {
  openScene: (eff, ctx) => {
    if ('scene' in eff) {
      ctx.patchDraft({
        activeStoryScene: {
          scene: eff.scene,
          beatIndex: 0,
          contextNpc: ctx.contextNpc ?? null,
        },
        activeNpcInteraction: null,
        menuOpen: false,
        compendiumOpen: false,
        tooltip: null,
      })
      return
    }
    const resolvedQuestId = eff.questId ?? ctx.questIdHint ?? undefined
    const syncScene = resolveQuestSceneSync(eff.sceneId, resolvedQuestId)
    if (syncScene) {
      ctx.patchDraft({
        activeStoryScene: {
          scene: syncScene,
          beatIndex: 0,
          contextNpc: ctx.contextNpc ?? null,
        },
        activeNpcInteraction: null,
        menuOpen: false,
        compendiumOpen: false,
        tooltip: null,
      })
      return
    }
    ctx.pendingAsyncScene = { sceneId: eff.sceneId, questId: resolvedQuestId }
  },

  startQuest: (eff, ctx) => {
    const s = ctx.draft
    ctx.questIdHint = eff.questId
    const qDef = QUEST_MAP[eff.questId]
    const sectBlock = getSectEntryQuestBlockReason(eff.questId, s.sectState, s.questState.flags)
    if (sectBlock) {
      ctx.patchDraft({ actionFeedback: { text: sectBlock, tone: 'warn' } })
      return
    }
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
    ctx.patchDraft({
      questState: nextQuest,
      actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'success' },
      logs: eff.silent
        ? s.logs
        : [createLogEntry(s.dayCount, '纪事开篇', msg, true, s.shichenIdx), ...s.logs].slice(0, 60),
    })
  },

  setQuestStep: (eff, ctx) => {
    const s = ctx.draft
    ctx.questIdHint = eff.questId
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
    ctx.patchDraft({
      questState: nextQuest,
      actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'talk' },
      logs: eff.silent
        ? s.logs
        : [createLogEntry(s.dayCount, '纪事推进', msg, false, s.shichenIdx), ...s.logs].slice(0, 60),
    })
  },

  completeQuest: (eff, ctx) => {
    const s = ctx.draft
    ctx.questIdHint = eff.questId
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
    ctx.patchDraft({
      questState: nextQuest,
      combatExp: nextCombatExp,
      actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'success' },
      logs: eff.silent
        ? s.logs
        : [createLogEntry(s.dayCount, '纪事完结', msg, true, s.shichenIdx), ...s.logs].slice(0, 60),
    })
  },

  abandonQuest: (eff, ctx) => {
    const s = ctx.draft
    const qDef = QUEST_MAP[eff.questId]
    const nextQuest = cloneQuestRuntimeState(s.questState)
    delete nextQuest.activeQuests[eff.questId]
    nextQuest.dynamicActors = nextQuest.dynamicActors.filter((a) => a.questId !== eff.questId)
    const msg = `任务《${qDef?.title ?? eff.questId}》已中止作罢。`
    ctx.patchDraft({
      questState: nextQuest,
      actionFeedback: eff.silent ? s.actionFeedback : { text: msg, tone: 'warn' },
      logs: eff.silent
        ? s.logs
        : [createLogEntry(s.dayCount, '纪事中止', msg, false, s.shichenIdx), ...s.logs].slice(0, 60),
    })
  },

  setFlag: (eff, ctx) => {
    const s = ctx.draft
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
      ctx.patchDraft({
        questState: nextQuest,
        sectState: nextSect,
        maxHp: derived.maxHp,
        hp: Math.min(s.hp, derived.maxHp),
        agility: derived.agility,
      })
      return
    }
    if (eff.flag === 'taihang_bandits_eradicated' && Boolean(eff.value)) {
      // 只清退太行山一支的游历宗师；京东水寨一支未受剿灭
      const filteredMasters = s.roamingMasters.filter((m) => !m.sect.includes('太行'))
      ctx.patchDraft({
        questState: nextQuest,
        sectState: nextSect,
        roamingMasters: filteredMasters,
      })
      return
    }
    ctx.patchDraft({ questState: nextQuest, sectState: nextSect })
  },

  addFlagNumber: (eff, ctx) => {
    const nextQuest = cloneQuestRuntimeState(ctx.draft.questState)
    const curVal = Number(nextQuest.flags[eff.flag] ?? 0)
    nextQuest.flags[eff.flag] = curVal + eff.delta
    ctx.patchDraft({ questState: nextQuest })
  },

  giveSilver: (eff, ctx) => {
    ctx.patchDraft({ silver: Math.max(0, ctx.draft.silver + eff.amount) })
  },

  giveFood: (eff, ctx) => {
    ctx.patchDraft({ food: Math.max(0, ctx.draft.food + eff.amount) })
  },

  giveCombatExp: (eff, ctx) => {
    ctx.patchDraft({ combatExp: Math.max(0, ctx.draft.combatExp + eff.amount) })
  },

  modifyRenown: (eff, ctx) => {
    const s = ctx.draft
    const nextRenown = Math.max(0, s.renown + eff.delta)
    const sign = eff.delta >= 0 ? `+${eff.delta}` : `${eff.delta}`
    const reason = eff.reason ? `（${eff.reason}）` : ''
    ctx.patchDraft({
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
  },

  modifyChivalry: (eff, ctx) => {
    const s = ctx.draft
    const nextChivalry = s.chivalry + eff.delta
    const sign = eff.delta >= 0 ? `+${eff.delta}` : `${eff.delta}`
    const reason = eff.reason ? `（${eff.reason}）` : ''
    ctx.patchDraft({
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
  },

  giveItem: (eff, ctx) => {
    const nextInv = addItemToInventory(ctx.draft.inventory, eff.itemId, eff.qty ?? 1)
    ctx.patchDraft({ inventory: nextInv })
  },

  removeItem: (eff, ctx) => {
    const s = ctx.draft
    const needQty = eff.qty ?? 1
    const existing = s.inventory.find((x) => x.itemId === eff.itemId)
    if (existing) {
      const actualRemove = Math.min(existing.qty, needQty)
      const nextInv = removeItemFromInventory(s.inventory, eff.itemId, actualRemove)
      if (nextInv) ctx.patchDraft({ inventory: nextInv })
    }
  },

  modifySkill: (eff, ctx) => {
    const s = ctx.draft
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
    const syncedArts = syncArtLevelsToExpsAndMilestones({
      baseStats: nextBase,
      artExps: s.artExps,
      artMilestoneFlags: s.artMilestoneFlags,
      keysToSync: [eff.key],
    })
    const derived = deriveHeroEffectiveStats(
      nextBase,
      s.equipped,
      s.equippedArts,
      s.learnedArts,
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )
    const nextLogs =
      syncedArts.milestoneNotes.length > 0
        ? [
            createLogEntry(
              s.dayCount,
              '十艺化境',
              syncedArts.milestoneNotes.join(' · '),
              true,
              s.shichenIdx,
            ),
            ...s.logs,
          ].slice(0, 60)
        : s.logs
    ctx.patchDraft({
      baseStats: nextBase,
      artExps: syncedArts.artExps,
      artMilestoneFlags: syncedArts.artMilestoneFlags,
      ridingSkill: derived.ridingSkill,
      skills: derived.skills,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp),
      agility: derived.agility,
      res: derived.res,
      logs: nextLogs,
    })
  },

  healPlayer: (eff, ctx) => {
    const s = ctx.draft
    const addHp = eff.hpPct ? Math.round(s.maxHp * (eff.hpPct / 100)) : 0
    const addMp = eff.mpPct ? Math.round(s.maxMp * (eff.mpPct / 100)) : 0
    ctx.patchDraft({
      hp: Math.max(1, Math.min(s.maxHp, s.hp + addHp)),
      mp: Math.max(0, Math.min(s.maxMp, s.mp + addMp)),
    })
  },

  teachMartialArt: (eff, ctx) => {
    const s = ctx.draft
    const art = MARTIAL_ART_DB_MAP[eff.artId]
    if (!art) return
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
      const alreadySlotted = (Object.keys(nextEquippedArts) as MartialArtSlotKey[]).some(
        (k) => nextEquippedArts[k] === eff.artId,
      )
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
      { heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury) },
    )
    const hpGain = Math.max(0, derived.maxHp - s.maxHp)
    const mpGain = Math.max(0, derived.maxMp - s.maxMp)
    const msg = `剧情传功：领悟${art.fullTier}${art.category}《${art.cleanName}》（第 ${targetLv} 重${
      initExp > 0 ? `，初始熟练度 +${initExp}` : ''
    }）${autoEquippedLabel}！`
    ctx.patchDraft({
      learnedArts: nextLearned,
      equippedArts: nextEquippedArts,
      maxHp: derived.maxHp,
      hp: Math.min(derived.maxHp, s.hp + hpGain),
      maxMp: derived.maxMp,
      mp: Math.min(derived.maxMp, s.mp + mpGain),
      agility: derived.agility,
      res: derived.res,
      qinggongBonus: derived.qinggongBonus,
      logs: [createLogEntry(s.dayCount, '绝学传授', msg, true, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  addArtExp: (eff, ctx) => {
    const s = ctx.draft
    const amount = Math.max(0, Math.round(eff.amount))
    if (amount <= 0) return
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
    if (!targetId) return
    const idx = nextLearned.findIndex((x) => x.artId === targetId)
    if (idx === -1) return
    nextLearned[idx] = {
      ...nextLearned[idx]!,
      exp: nextLearned[idx]!.exp + amount,
    }
    const artName = MARTIAL_ART_DB_MAP[targetId]?.cleanName ?? targetId
    ctx.patchDraft({
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
  },

  joinSect: (eff, ctx) => {
    const s = ctx.draft
    const joinRes = buildJoinSectPatch({
      sectId: eff.sectId,
      dayCount: s.dayCount,
      silver: s.silver,
      inventory: s.inventory,
      sectState: s.sectState,
      questState: s.questState,
      startingRank: eff.rank,
      allowOfficialTransfer: eff.allowOfficialTransfer,
    })
    if (!joinRes.ok) {
      ctx.patchDraft({
        actionFeedback: { text: joinRes.errorReason ?? '拜师未成。', tone: 'warn' },
      })
      return
    }

    const droppedTitles = joinRes.droppedEntryQuestIds.map(
      (qid) => `《${QUEST_MAP[qid]?.title ?? qid}》`,
    )

    const giftSuffix =
      joinRes.grantedGiftNames.length > 0
        ? ` 入门获赐制式披挂：${joinRes.grantedGiftNames.join('、')}！`
        : ''
    const dropSuffix =
      droppedTitles.length > 0 ? ` 既已拜师，${droppedTitles.join('、')}等他派入门线自此作罢。` : ''
    const msg = `正式拜入【${joinRes.factionName}】，授职第 ${joinRes.startingRank} 阶【${joinRes.startingRankLabel}】${joinRes.identitySuffix}！${giftSuffix}${dropSuffix}`
    ctx.patchDraft({
      silver: joinRes.nextSilver,
      inventory: joinRes.nextInventory,
      sectState: joinRes.nextSectState,
      questState: joinRes.nextQuestState,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [createLogEntry(s.dayCount, '拜入宗门', msg, true, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  confirmJoinSect: (eff, ctx) => {
    ctx.flushDraft()
    ctx.getStore().joinSect(eff.sectId, ctx.contextNpc ?? undefined)
    ctx.draft = { ...ctx.getStore() }
  },

  setSectRank: (eff, ctx) => {
    const s = ctx.draft
    if (s.sectState.sectId !== eff.sectId) return
    if (eff.promoteOnly && eff.rank <= s.sectState.rank) return
    const nextRankLabel = getSectRankTitle(eff.sectId, eff.rank)
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      rank: eff.rank,
      rankLabel: nextRankLabel,
    }
    const isPromo = eff.rank >= s.sectState.rank
    const fName = FACTION_DB_MAP[eff.sectId]?.name ?? eff.sectId
    // 官面军伍（禁军 / 常山边军）沿用「奉诏 · 军职」措辞，开封府为官职，其余江湖门派为门派职阶
    const isMilitary = eff.sectId === 'SECT-33' || eff.sectId === 'SECT-22'
    const isOfficial = isMilitary || eff.sectId === 'SECT-17'
    const logMsg = isPromo
      ? isOfficial
        ? `奉诏晋升【${fName}】第 ${eff.rank} 阶${isMilitary ? '军职' : '官职'}——【${nextRankLabel}】！`
        : `师门擢升：晋为【${fName}】第 ${eff.rank} 阶【${nextRankLabel}】！`
      : isOfficial
        ? `朝堂问责降级：【${fName}】职衔贬为第 ${eff.rank} 阶【${nextRankLabel}】！`
        : `师门惩戒：【${fName}】职阶降为第 ${eff.rank} 阶【${nextRankLabel}】！`
    ctx.patchDraft({
      sectState: nextSect,
      logs: [
        createLogEntry(
          s.dayCount,
          isPromo ? (isOfficial ? '军职晋升' : '门派晋升') : isOfficial ? '削职降级' : '门派降阶',
          logMsg,
          true,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  fineSectSalary: (eff, ctx) => {
    const s = ctx.draft
    const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
    const configuredStipend = getSectMonthlyStipend(s.sectState.sectId, s.sectState.rank)
    const perMonth = configuredStipend > 0 ? configuredStipend : 30
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
    ctx.patchDraft({
      silver: nextSilver,
      sectState: nextSect,
      logs: [createLogEntry(s.dayCount, '朝堂罚俸', fineMsg, true, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  leaveSect: (eff, ctx) => {
    const s = ctx.draft
    if (!s.sectState.sectId) return
    if (eff.skipPenalty) {
      const leavingSectId = s.sectState.sectId
      const factionName = FACTION_DB_MAP[leavingSectId]?.name ?? leavingSectId
      const secular = resolveMonasticSecularRestore({
        leavingSectId,
        prevDiscipleType: s.sectState.shaolinDiscipleType,
        playerName: s.playerName,
        playerPortraitId: s.playerPortraitId,
        playerGender: s.playerGender,
        questFlags: s.questState.flags,
      })
      const nextSect = resetSectMembership(s.sectState)
      const nextQuest = cloneQuestRuntimeState(s.questState)
      if (leavingSectId === 'SECT-17' || leavingSectId === 'SECT-33') {
        delete nextQuest.activeQuests['QST-SECT-17-TAIHANG-BANDIT']
      }
      ctx.patchDraft({
        playerName: secular.playerName,
        playerPortraitId: secular.playerPortraitId,
        sectState: nextSect,
        questState: nextQuest,
        logs: [
          createLogEntry(
            s.dayCount,
            '奉命离宗',
            `少侠依约脱离【${factionName}】${secular.restored ? `，换回俗家装束，复归本名「${secular.playerName}」` : ''}。`,
            false,
            s.shichenIdx,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
    } else {
      ctx.flushDraft()
      ctx.getStore().leaveSect()
      ctx.draft = { ...ctx.getStore() }
    }
  },

  markNpcsDead: (eff, ctx) => {
    const s = ctx.draft
    ctx.patchDraft({ deadNpcIds: withNpcsMarkedDead(s.deadNpcIds, eff.npcIds) })
  },

  addSectContribution: (eff, ctx) => {
    const s = ctx.draft
    if (!s.sectState.sectId) return
    const nextSect = clonePlayerSectState(s.sectState)
    nextSect.contribution = Math.max(0, nextSect.contribution + eff.amount)
    ctx.patchDraft({ sectState: nextSect })
  },

  activateShaolinNovice: (_eff, ctx) => {
    const s = ctx.draft
    const nextSect = clonePlayerSectState(s.sectState)
    nextSect.shaolinNoviceState = 'active'
    const msg = `经知客禅师【玄净】收录为【嵩山少林寺 · 杂役弟子】（当前不计正式门籍）。可在少林寺山门自选天数洒扫担水，累计当值满 ${SHAOLIN_CHORE_TARGET_DAYS} 天即可正式引荐入门！`
    ctx.patchDraft({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [createLogEntry(s.dayCount, '山门挂单', msg, true, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  ordainShaolinMonk: (eff, ctx) => {
    const s = ctx.draft
    const prevName = s.playerName
    const nextSect = clonePlayerSectState(s.sectState)
    nextSect.shaolinDiscipleType = 'monk'
    const nextQuest = cloneQuestRuntimeState(s.questState)
    if (!nextQuest.flags.secular_player_portrait_id) {
      nextQuest.flags.secular_player_portrait_id = s.playerPortraitId
    }
    if (!nextQuest.flags.secular_player_name) {
      nextQuest.flags.secular_player_name = prevName
    }
    nextQuest.flags.ordained_monk_dharma_name = eff.dharmaName
    const nextPortraitId =
      s.playerGender === '女' && eff.portraitId === 'hero_02_shaolin'
        ? s.playerPortraitId
        : eff.portraitId
    const isNanShaolin = eff.sectId === 'SECT-04' || nextSect.sectId === 'SECT-04'
    const isWutai = eff.sectId === 'SECT-03' || nextSect.sectId === 'SECT-03'
    const msg = isNanShaolin
      ? `于莆田南少林九莲大雄宝殿礼拜方丈【元苦】受戒入佛门，俗名「${prevName}」化入空门，赐弘字辈法号【${eff.dharmaName}】！自此南少林地阶秘传功法尽数敞开！`
      : isWutai
        ? `于五台山清凉寺大雄主殿礼拜方丈【道清】受戒入清凉空门，俗名「${prevName}」赐明字辈护法法号【${eff.dharmaName}】！自此执杖护国，禅武双修！`
        : `于少林大雄正殿礼拜方丈【玄慈】受戒入空门，俗名「${prevName}」赐慧字辈法号【${eff.dharmaName}】！自此少林地阶与天阶秘传绝学尽数敞开！`
    ctx.patchDraft({
      playerName: eff.dharmaName,
      playerPortraitId: nextPortraitId,
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [createLogEntry(s.dayCount, '剃度受戒', msg, true, s.shichenIdx), ...s.logs].slice(
        0,
        60,
      ),
    })
  },

  modifyNpcFavor: (eff, ctx) => {
    const s = ctx.draft
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
    ctx.patchDraft({ npcFavor: nextFavor })
  },

  spawnDynamicActor: (eff, ctx) => {
    const nextQuest = cloneQuestRuntimeState(ctx.draft.questState)
    nextQuest.dynamicActors = [
      ...nextQuest.dynamicActors.filter((a) => a.actorId !== eff.actor.actorId),
      {
        ...eff.actor,
        stats: { ...eff.actor.stats },
      },
    ]
    ctx.patchDraft({ questState: nextQuest })
  },

  removeDynamicActor: (eff, ctx) => {
    const nextQuest = cloneQuestRuntimeState(ctx.draft.questState)
    nextQuest.dynamicActors = nextQuest.dynamicActors.filter((a) => {
      if (eff.actorId && a.actorId === eff.actorId) return false
      if (eff.questId && a.questId === eff.questId) return false
      return true
    })
    ctx.patchDraft({ questState: nextQuest })
  },

  teleportPlayer: (eff, ctx) => {
    const s = ctx.draft
    const bRec = eff.buildingId ? BUILDING_DB_MAP[eff.buildingId] : null
    const enterBldg = Boolean(bRec?.interior)
    const lockCfg = eff.buildingId ? QUEST_LOCKED_BUILDINGS[eff.buildingId] : undefined
    let nextQuest = s.questState
    if (lockCfg?.unlockFlag && !s.questState.flags[lockCfg.unlockFlag]) {
      nextQuest = cloneQuestRuntimeState(s.questState)
      nextQuest.flags[lockCfg.unlockFlag] = true
    }
    ctx.patchDraft({
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
  },

  advanceShichen: (eff, ctx) => {
    const s = ctx.draft
    const adv = computeTimeAdvanceState({
      dayCount: s.dayCount,
      shichenIdx: s.shichenIdx,
      deltaShichen: eff.count,
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
      vitalityFactor: 0,
      rotateMasters: false,
    })
    ctx.daysAddedTotal += adv.daysAdded
    if (adv.overdueSpyAmbush) {
      ctx.overdueSpyAmbush = adv.overdueSpyAmbush
    }
    ctx.patchDraft({
      dayCount: adv.dayCount,
      shichenIdx: adv.shichenIdx,
      silver: adv.silver,
      sectState: adv.sectState,
      npcFavor: adv.npcFavor,
      logs: adv.logs,
    })
  },

  startCombat: (eff, ctx) => {
    const s = ctx.draft
    const opp = resolveQuestCombatOpponent(
      eff.opponent,
      ctx.contextNpc ?? null,
      s.questState.dynamicActors,
    )
    if (!opp) return

    const extraEnemyNodes = (eff.extraOpponents ?? [])
      .map((spec) =>
        resolveQuestCombatOpponent(spec, ctx.contextNpc ?? null, s.questState.dynamicActors),
      )
      .filter((n): n is NodeNpc => Boolean(n))
    const allyNodes = (eff.allies ?? [])
      .map((spec) =>
        resolveQuestCombatOpponent(spec, ctx.contextNpc ?? null, s.questState.dynamicActors),
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
      heavyInjury: Boolean(s.questState.flags.taihang_heavy_injury),
      hsSwordEssence: Boolean(s.questState.flags.hs_taiyue_sword_essence),
      hsPoyueGuijian: Boolean(s.questState.flags.hs_poyue_guijian),
      heroTitleOverride:
        typeof s.questState.flags.hs_summit_title === 'string'
          ? s.questState.flags.hs_summit_title
          : undefined,
    })

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
              : eff.onEscape
                ? null
                : // 剧情切磋未设脱战分支：抽身既不推进剧情、又能保住战前所得，故一律锁定，杜绝「领奖→首合脱战」反复刷取
                  '剧情交锋正值紧要关头，不可半途抽身！',
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

    ctx.patchDraft({
      dayCount: clock.dayCount,
      shichenIdx: clock.shichenIdx,
      activeCombat: session,
      activeStoryScene: null,
      activeNpcInteraction: null,
      menuOpen: false,
      compendiumOpen: false,
      tooltip: null,
    })
  },

  triggerGameOver: (eff, ctx) => {
    const s = ctx.draft
    const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
    const songDate = formatSongDate(s.dayCount, s.shichenIdx)
    const payload: GameOverState = {
      reasonTitle: eff.reasonTitle,
      reasonDetail: eff.reasonDetail,
      killerName: eff.killerName ?? '江湖劫数',
      songDate,
      locationName: regionName,
    }
    ctx.patchDraft({
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
    ctx.halted = true
  },

  toast: (eff, ctx) => {
    const s = ctx.draft
    const msg = interpolateReignYear(eff.text, s.dayCount)
    ctx.patchDraft({
      actionFeedback: {
        text: msg,
        tone: eff.tone ?? 'talk',
      },
      logs: [
        createLogEntry(s.dayCount, eff.logTag ?? '江湖纪事', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  branch: (eff, ctx) => {
    const evalRes = evaluateQuestCondition(
      eff.condition,
      buildDraftEvalContext(ctx.draft, ctx.contextNpc),
    )
    const subEffects = evalRes.passed ? eff.thenEffects : (eff.elseEffects ?? [])
    if (subEffects.length > 0) {
      ctx.applyNestedEffects(subEffects)
    }
  },
}

function dispatchSingleQuestEffect<E extends QuestEffect>(
  eff: E,
  ctx: QuestEffectBatchContext,
): void {
  const handler = QUEST_EFFECT_HANDLERS[eff.type] as QuestEffectHandler<E>
  handler(eff, ctx)
}

let nextAsyncSceneToken = 1

/**
 * Execute a list of `QuestEffect`s via the handler registry, coalescing synchronous
 * mutations into a single Zustand `set()` call to minimize React re-renders.
 */
export function executeQuestEffectsBatch(params: {
  effects: QuestEffect[]
  contextNpc: NodeNpc | null
  questIdHint?: string | null
  set: (partial: Partial<GameStoreState>) => void
  get: () => GameStoreState
  _continuationToken?: number
}): void {
  const { effects, contextNpc, set, get, _continuationToken } = params
  if (effects.length === 0 || get().gameOver) return
  // 异步剧本分片加载窗口期内阻断外部重复点击/重入触发，仅放行同一 token 的续行批次
  const inFlight = get().pendingSceneLoad
  if (inFlight && inFlight.token !== _continuationToken) return

  const dirtyKeys = new Set<keyof GameStoreData>()
  const ctx: QuestEffectBatchContext = {
    draft: { ...get() },
    contextNpc,
    questIdHint: params.questIdHint ?? null,
    daysAddedTotal: 0,
    overdueSpyAmbush: null,
    halted: false,
    patchDraft: (partial) => {
      for (const k of Object.keys(partial) as Array<keyof GameStoreData>) {
        dirtyKeys.add(k)
      }
      Object.assign(ctx.draft, partial)
    },
    flushDraft: () => {
      if (dirtyKeys.size === 0) return
      const patchObj: Partial<GameStoreData> = {}
      for (const k of dirtyKeys) {
        ;(patchObj as Record<string, unknown>)[k] = ctx.draft[k]
      }
      dirtyKeys.clear()
      set(patchObj)
      ctx.draft = { ...get() }
    },
    getStore: get,
    applyNestedEffects: (subEffects) => {
      runSlice(subEffects)
    },
  }

  let remainingAfterAsync: QuestEffect[] = []

  function runSlice(list: QuestEffect[]): void {
    for (let i = 0; i < list.length; i += 1) {
      if (ctx.halted || ctx.draft.gameOver) return
      const eff = list[i]!
      dispatchSingleQuestEffect(eff, ctx)
      if (ctx.pendingAsyncScene) {
        remainingAfterAsync = list.slice(i + 1)
        return
      }
    }
  }

  runSlice(effects)

  let asyncToken: number | null = null
  if (ctx.pendingAsyncScene && !ctx.draft.gameOver) {
    asyncToken = nextAsyncSceneToken++
    ctx.patchDraft({
      pendingSceneLoad: {
        sceneId: ctx.pendingAsyncScene.sceneId,
        questId: ctx.pendingAsyncScene.questId,
        token: asyncToken,
      },
      traveling: null,
      activeNpcInteraction: null,
      menuOpen: false,
      compendiumOpen: false,
      tooltip: null,
    })
  }

  ctx.flushDraft()

  if (ctx.daysAddedTotal > 0 && !get().gameOver) {
    get().checkExpiredQuestDeadlines()
  }
  if (ctx.overdueSpyAmbush && !get().gameOver && !get().activeCombat) {
    if (asyncToken !== null && get().pendingSceneLoad?.token === asyncToken) {
      set({ pendingSceneLoad: null })
    }
    get().startNpcCombat(ctx.overdueSpyAmbush, 'duel', 'liao_spy_duel', true)
    return
  }

  if (ctx.pendingAsyncScene && asyncToken !== null) {
    const { sceneId, questId } = ctx.pendingAsyncScene
    const rest = remainingAfterAsync
    const finalHint = ctx.questIdHint
    const token = asyncToken
    void resolveQuestSceneAsync(sceneId, questId)
      .then((loadedScene) => {
        if (get().pendingSceneLoad?.token !== token) return
        set({ pendingSceneLoad: null })
        if (get().gameOver || get().activeCombat) return
        if (loadedScene) {
          set({
            activeStoryScene: {
              scene: loadedScene,
              beatIndex: 0,
              contextNpc: contextNpc ?? null,
            },
            activeNpcInteraction: null,
            menuOpen: false,
            compendiumOpen: false,
            tooltip: null,
          })
        }
        if (rest.length > 0) {
          executeQuestEffectsBatch({
            effects: rest,
            contextNpc,
            questIdHint: finalHint,
            set,
            get,
            _continuationToken: token,
          })
        }
      })
      .catch(() => {
        if (get().pendingSceneLoad?.token !== token) return
        set({
          pendingSceneLoad: null,
          actionFeedback: {
            text: '剧情卷宗加载受阻，请稍后重试。',
            tone: 'warn',
          },
        })
      })
  }
}
