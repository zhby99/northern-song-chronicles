import { isNpcDead } from '../../engine/social/npcDeath'
import type { StoreSlice } from '../storeTypes'
import {
  NPC_DB_MAP,
  resolveNpcByName,
  UNIQUE_ARTIFACT_MAP,
} from '../../data/gameDb'
import {
  getEffectiveTalents,
  ITEM_DB_MAP,
  NON_GIFTABLE_KEY_ITEM_IDS,
} from '../../data/itemsDb'
import {
  BANQUET_TIERS,
  computeBanquetFavorGain,
  computeTalkFavorDelta,
  resolveNpcFavor,
} from '../../engine/economy'
import {
  cloneQuestRuntimeState,
} from '../../engine/questEngine'
import type {
  GameOverState,
} from '../../types/game'
import { applyConsumableStatEffects } from '../../engine/stats/elixirEffects'
import {
  formatSongDate,
  NODE_MAP,
} from '../../engine/world/mapMath'
import {
  MAX_NPC_FAVOR,
  MIN_NPC_FAVOR,
  computeGiftFavorGain,
  getNpcFavorProfile,
} from '../../engine/social/npcFavor'
import {
  getNpcGiftDialogue,
  getNpcTalkDialogue,
} from '../../engine/social/npcDialogues'
import {
  buildPlayerCombatant,
  canUseCombatItem,
  COMBAT_ITEM_USE_LIMIT,
  createCombatSession,
  gameRng,
  resolveCombatRound,
  type DuelStakesKind,
} from '../../engine/combat'
import {
  applyCombatSettlementRules,
  buildCombatDeathPayload,
} from '../../engine/combat/settlement'
import {
  buildZhanZhaoArrestNodeNpc,
  clonePlayerSectState,
  isSongOfficialForRobbery,
} from '../../engine/sect'
import {
  commitTimeAdvance,
  createLogEntry,
  removeItemFromInventory,
  computeCombatSettlement,
  createInitialStoreData,
} from '../storeHelpers'

export type CombatSocialKeys =
  | 'interactNpc'
  | 'hostNpcBanquet'
  | 'startNpcCombat'
  | 'submitCombatAction'
  | 'consumeArenaCombatItem'
  | 'syncArenaCombatProgress'
  | 'finishCombatSession'
  | 'restartAfterGameOver'
  | 'openNpcInteraction'
  | 'closeNpcInteraction'
  | 'giftNpcItem'

export const createCombatSocialSlice: StoreSlice<CombatSocialKeys> = (set, get) => ({
  interactNpc: (npc, mode) => {
    const s = get()
    if (mode === 'talk') {
      const npcKey = npc.id ?? npc.name
      const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
      const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped, s.equippedArts, s.learnedArts).颜值
      const curFavor = resolveNpcFavor(s.npcFavor, npcKey, effCharm)
      if (s.npcTalkedMonth[npcKey] === curMonthIdx) {
        set({
          actionFeedback: {
            text: `${npc.name}：${npc.talk}（本月已交谈过，好感度不再变动，当前 ${curFavor}/100）`,
            tone: 'talk',
          },
        })
        return
      }
      const eloSkill = s.skills['辩才'] ?? 0
      const { delta } = computeTalkFavorDelta(eloSkill, gameRng)
      const nextFavor = Math.max(MIN_NPC_FAVOR, Math.min(MAX_NPC_FAVOR, curFavor + delta))
      const actualDelta = nextFavor - curFavor
      const deltaLabel =
        actualDelta > 0
          ? `好感 +${actualDelta}`
          : actualDelta < 0
            ? `好感 ${actualDelta}`
            : '好感未变'
      const talkLine = getNpcTalkDialogue(npc, delta)

      commitTimeAdvance(set, get, {
        deltaShichen: 2,
        chargeForeignLodging: true,
        vitalityFactor: 1,
        buildExtraPatch: (adv) => ({
          npcFavor: {
            ...adv.npcFavor,
            [npcKey]: nextFavor,
          },
          npcTalkedMonth: {
            ...s.npcTalkedMonth,
            [npcKey]: curMonthIdx,
          },
          actionFeedback: {
            text: `${npc.name}：「${talkLine}」（耗 2 时辰 · 辩才 ${eloSkill} · ${deltaLabel}，当前好感度 ${nextFavor}/100${adv.lodgingFee > 0 ? ` · 宿费及草料 -${adv.lodgingFee}两` : ''}）`,
            tone: actualDelta < 0 ? 'warn' : 'talk',
          },
        }),
      })
      return
    }
    if (mode === 'spar') {
      get().startNpcCombat(npc, 'spar')
    }
  },

  startNpcCombat: (npc, mode = 'spar', duelStakes, forceMandatory = false) => {
    const s = get()
    if (s.gameOver) return
    if (isNpcDead(s.deadNpcIds, npc.id)) {
      set({ actionFeedback: { text: `【${npc.name}】已然身故，无从交手。`, tone: 'warn' } })
      return
    }

    const effectiveStakes: DuelStakesKind = duelStakes ?? (mode === 'duel' ? 'duel' : 'spar')
    const effectiveMode: 'spar' | 'duel' =
      effectiveStakes === 'spar' ||
      effectiveStakes === 'sect_tournament' ||
      effectiveStakes === 'escort_ambush' ||
      effectiveStakes === 'yamen_bounty'
        ? 'spar'
        : 'duel'

    if (effectiveStakes === 'rob_official') {
      const dbNpc = (npc.id && NPC_DB_MAP[npc.id]) || resolveNpcByName(npc.name)
      if (
        !isSongOfficialForRobbery({
          id: npc.id ?? dbNpc?.id,
          factionId: npc.factionId ?? dbNpc?.factionId,
        })
      ) {
        set({
          actionFeedback: {
            text: '「纳投名状」须挑大宋朝廷命官下手，寻常江湖人物不算数！',
            tone: 'warn',
          },
        })
        return
      }
    }

    if (!forceMandatory && s.hp <= 1) {
      set({
        actionFeedback: {
          text: `少侠当前气血奄奄一息（${s.hp}/${s.maxHp}），请先服食伤药或调息恢复气血后再与名宿交手！`,
          tone: 'warn',
        },
      })
      return
    }

    const npcKey = npc.id ?? npc.name
    const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
    if (effectiveStakes === 'spar' && !forceMandatory) {
      const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped, s.equippedArts, s.learnedArts).颜值
      const curFavor = resolveNpcFavor(s.npcFavor, npcKey, effCharm)
      if (curFavor < 20) {
        set({
          actionFeedback: {
            text: `与【${npc.name}】交情尚浅，需好感度达到 20 方可切磋（当前 ${curFavor}/100）。`,
            tone: 'warn',
          },
        })
        return
      }
      if (s.npcSparredMonth[npcKey] === curMonthIdx) {
        set({
          actionFeedback: {
            text: `每人每月仅可切磋一次，本月已与【${npc.name}】切磋过！`,
            tone: 'warn',
          },
        })
        return
      }
    }

    commitTimeAdvance(set, get, {
      deltaShichen: effectiveStakes === 'spar' ? 2 : 1,
      chargeForeignLodging: !forceMandatory,
      skipSectDayHooks: forceMandatory,
      skipAmbushTrigger: true,
      hpOverride: Math.max(1, s.hp),
      vitalityFactor: 1,
      buildExtraPatch: (adv) => {
        const startHp = Math.max(1, adv.hp)
        const playerCombatant = buildPlayerCombatant({
          playerName: s.playerName,
          playerPortraitId: s.playerPortraitId,
          hp: startHp,
          mp: adv.mp,
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
        const session = createCombatSession({
          mode: effectiveMode,
          duelStakes: effectiveStakes,
          player: playerCombatant,
          npcNode: npc,
        })
        return {
          ...(effectiveStakes === 'spar' && !forceMandatory
            ? {
                npcSparredMonth: {
                  ...s.npcSparredMonth,
                  [npcKey]: curMonthIdx,
                },
              }
            : {}),
          activeCombat: session,
          menuOpen: false,
          compendiumOpen: false,
          tooltip: null,
          actionFeedback: null,
        }
      },
    })
  },

  submitCombatAction: (choice) => {
    const s = get()
    if (!s.activeCombat || s.activeCombat.outcome !== 'ongoing') return

    let nextInventory = s.inventory
    let nextBaseStats = s.baseStats
    let nextArtExps = s.artExps
    let nextArtMilestoneFlags = s.artMilestoneFlags
    let nextLearnedArts = s.learnedArts
    let nextConsumedUniqueIds = s.consumedUniqueIds
    let nextConsumedOnceItemIds = s.consumedOnceItemIds
    let nextFood = s.food

    if (choice.type === 'item') {
      const def = ITEM_DB_MAP[choice.itemId]
      if (!def || def.category !== 'medicine') return
      if (def.useEffect?.onceOnly && s.consumedOnceItemIds.includes(choice.itemId)) {
        set({
          actionFeedback: {
            text: `【${def.name}】初品已尽得其效，再食已无裨益。`,
            tone: 'warn',
          },
        })
        return
      }
      if (!s.inventory.some((st) => st.itemId === choice.itemId && st.qty > 0)) return
      if (!canUseCombatItem(s.activeCombat.player)) {
        set({
          actionFeedback: {
            text: `本场交锋已探囊 ${COMBAT_ITEM_USE_LIMIT} 次，随身丹药毒物一时再难取用。`,
            tone: 'warn',
          },
        })
        return
      }
    }

    let nextSession = resolveCombatRound(s.activeCombat, choice)
    // 只有真正轮到出手、药力 / 毒性已经生效时才从行囊扣除（被先手击倒或敌阵已清空则原物保留）
    if (
      choice.type === 'item' &&
      nextSession.lastRoundSummary?.playerItemUsedId === choice.itemId
    ) {
      const def = ITEM_DB_MAP[choice.itemId]!
      const removed = removeItemFromInventory(s.inventory, choice.itemId, 1)
      if (!removed) return
      nextInventory = removed
      if (
        UNIQUE_ARTIFACT_MAP[choice.itemId] &&
        !s.consumedUniqueIds.includes(choice.itemId)
      ) {
        nextConsumedUniqueIds = [...s.consumedUniqueIds, choice.itemId]
      }
      if (def.useEffect?.onceOnly && !s.consumedOnceItemIds.includes(choice.itemId)) {
        nextConsumedOnceItemIds = [...s.consumedOnceItemIds, choice.itemId]
      }
      if (def.useEffect) {
        const applied = applyConsumableStatEffects({
          itemDef: def,
          baseStats: s.baseStats,
          artExps: nextArtExps,
          artMilestoneFlags: nextArtMilestoneFlags,
          food: nextFood,
        })
        nextBaseStats = applied.baseStats
        nextArtExps = applied.artExps
        nextArtMilestoneFlags = applied.artMilestoneFlags
        nextFood = applied.food
      }
    }
    if (nextSession.outcome !== 'ongoing') {
      const preview = computeCombatSettlement(
        {
          ...s,
          baseStats: nextBaseStats,
          learnedArts: nextLearnedArts,
        },
        nextSession,
      )
      const qHook = nextSession.questCombatHook
      const killerLabel =
        nextSession.enemies && nextSession.enemies.length > 1
          ? nextSession.enemies.map((e) => e.name).join('、')
          : nextSession.npc.name
      const deathNotice =
        nextSession.mode === 'duel' && nextSession.outcome === 'npc_win'
          ? qHook?.deathDetail
            ? `${qHook.deathDetail}（游戏结束）`
            : nextSession.duelStakes === 'zhan_zhao_arrest'
              ? '少侠重伤被南侠展昭生擒归案，即将押赴开封府市曹处斩（游戏结束）！'
              : nextSession.duelStakes === 'kaifeng_warrant'
                ? `缉拿海捕要犯失手！少侠命陨于凶徒【${killerLabel}】毒刃之下（游戏结束）！`
                : `生死决斗败亡！少侠命陨于【${killerLabel}】之手（游戏结束）！`
          : nextSession.surviveToWin &&
              nextSession.outcome === 'player_win' &&
              nextSession.npc.hp > 0
            ? `稳守撑满 ${nextSession.maxRounds} 合考校不倒！ · ${preview.rewardsSummary}`
            : preview.rewardsSummary
      nextSession = {
        ...nextSession,
        rewardsSummary: deathNotice,
      }
    }
    set({
      activeCombat: nextSession,
      inventory: nextInventory,
      baseStats: nextBaseStats,
      artExps: nextArtExps,
      artMilestoneFlags: nextArtMilestoneFlags,
      learnedArts: nextLearnedArts,
      consumedUniqueIds: nextConsumedUniqueIds,
      consumedOnceItemIds: nextConsumedOnceItemIds,
      food: nextFood,
    })
  },

  consumeArenaCombatItem: (itemId) => {
    const s = get()
    if (!s.activeCombat || s.activeCombat.outcome !== 'ongoing') {
      return { applied: false, itemName: '', healHp: 0, healMp: 0, poisonDmg: 0, reason: '战斗未在进行中' }
    }
    const def = ITEM_DB_MAP[itemId]
    if (!def || def.category !== 'medicine') {
      return { applied: false, itemName: '', healHp: 0, healMp: 0, poisonDmg: 0, reason: '此物不可在战中服用' }
    }
    if (def.useEffect?.onceOnly && s.consumedOnceItemIds.includes(itemId)) {
      return {
        applied: false,
        itemName: def.name,
        healHp: 0,
        healMp: 0,
        poisonDmg: 0,
        reason: `【${def.name}】初品已尽得其效，再食已无裨益。`,
      }
    }
    if (!s.inventory.some((st) => st.itemId === itemId && st.qty > 0)) {
      return { applied: false, itemName: def.name, healHp: 0, healMp: 0, poisonDmg: 0, reason: '行囊中已无此物' }
    }
    if (!canUseCombatItem(s.activeCombat.player)) {
      return {
        applied: false,
        itemName: def.name,
        healHp: 0,
        healMp: 0,
        poisonDmg: 0,
        reason: `本场交锋已探囊 ${COMBAT_ITEM_USE_LIMIT} 次，随身丹药毒物一时再难取用。`,
      }
    }
    const removed = removeItemFromInventory(s.inventory, itemId, 1)
    if (!removed) {
      return { applied: false, itemName: def.name, healHp: 0, healMp: 0, poisonDmg: 0, reason: '行囊扣减失败' }
    }

    let nextBaseStats = s.baseStats
    let nextArtExps = s.artExps
    let nextArtMilestoneFlags = s.artMilestoneFlags
    let nextFood = s.food
    let nextConsumedUniqueIds = s.consumedUniqueIds
    let nextConsumedOnceItemIds = s.consumedOnceItemIds

    if (UNIQUE_ARTIFACT_MAP[itemId] && !s.consumedUniqueIds.includes(itemId)) {
      nextConsumedUniqueIds = [...s.consumedUniqueIds, itemId]
    }
    if (def.useEffect?.onceOnly && !s.consumedOnceItemIds.includes(itemId)) {
      nextConsumedOnceItemIds = [...s.consumedOnceItemIds, itemId]
    }
    if (def.useEffect) {
      const applied = applyConsumableStatEffects({
        itemDef: def,
        baseStats: s.baseStats,
        artExps: nextArtExps,
        artMilestoneFlags: nextArtMilestoneFlags,
        food: nextFood,
      })
      nextBaseStats = applied.baseStats
      nextArtExps = applied.artExps
      nextArtMilestoneFlags = applied.artMilestoneFlags
      nextFood = applied.food
    }

    const healHp = def.useEffect?.hp ?? 0
    const healMp = def.useEffect?.mp ?? 0
    const poisonDmg = def.poisonEffect ? 35 : 0
    const nextItemUses = (s.activeCombat.player.itemUses ?? 0) + 1
    const nextPlayer = { ...s.activeCombat.player, itemUses: nextItemUses }

    set({
      inventory: removed,
      baseStats: nextBaseStats,
      artExps: nextArtExps,
      artMilestoneFlags: nextArtMilestoneFlags,
      food: nextFood,
      consumedUniqueIds: nextConsumedUniqueIds,
      consumedOnceItemIds: nextConsumedOnceItemIds,
      activeCombat: {
        ...s.activeCombat,
        player: nextPlayer,
        allies: s.activeCombat.allies.map((a) => (a.isPlayer ? { ...a, itemUses: nextItemUses } : a)),
      },
    })
    return { applied: true, itemName: def.name, healHp, healMp, poisonDmg }
  },

  syncArenaCombatProgress: (payload) => {
    const s = get()
    if (!s.activeCombat) return
    const cur = s.activeCombat
    const nextPlayerHp = Math.max(0, Math.min(cur.player.maxHp, Math.round(payload.playerHp)))
    const nextPlayerMp = Math.max(0, Math.min(cur.player.maxMp, Math.round(payload.playerMp)))
    const nextAllies = cur.allies.map((a) => {
      if (a.isPlayer) return { ...a, hp: nextPlayerHp, mp: nextPlayerMp }
      const ahp = payload.allyHps?.[a.unitId]
      return typeof ahp === 'number' ? { ...a, hp: Math.max(0, Math.min(a.maxHp, Math.round(ahp))) } : a
    })
    const nextEnemies = cur.enemies.map((e) => {
      const ehp = payload.enemyHps[e.unitId]
      return typeof ehp === 'number' ? { ...e, hp: Math.max(0, Math.min(e.maxHp, Math.round(ehp))) } : e
    })
    const nextNpc = nextEnemies.find((e) => e.unitId === cur.npc.unitId) ?? nextEnemies[0] ?? cur.npc
    const nextRound =
      typeof payload.elapsedRounds === 'number' && payload.elapsedRounds > cur.round
        ? Math.min(cur.maxRounds, payload.elapsedRounds)
        : cur.round

    let nextSession: typeof cur = {
      ...cur,
      round: nextRound,
      outcome: payload.outcome,
      player: { ...cur.player, hp: nextPlayerHp, mp: nextPlayerMp },
      npc: nextNpc,
      allies: nextAllies,
      enemies: nextEnemies,
      logs: payload.summaryLogText
        ? [
            ...cur.logs,
            {
              id: `arena3d-${Date.now()}`,
              round: nextRound,
              tone: payload.outcome === 'player_win' ? 'special' : payload.outcome === 'npc_win' ? 'enemy' : 'info',
              text: payload.summaryLogText,
            },
          ]
        : cur.logs,
    }

    if (payload.outcome !== 'ongoing') {
      const preview = computeCombatSettlement(
        { ...s, baseStats: s.baseStats, learnedArts: s.learnedArts },
        nextSession,
      )
      const qHook = nextSession.questCombatHook
      const killerLabel =
        nextSession.enemies && nextSession.enemies.length > 1
          ? nextSession.enemies.map((e) => e.name).join('、')
          : nextSession.npc.name
      const deathNotice =
        nextSession.mode === 'duel' && nextSession.outcome === 'npc_win'
          ? qHook?.deathDetail
            ? `${qHook.deathDetail}（游戏结束）`
            : nextSession.duelStakes === 'zhan_zhao_arrest'
              ? '少侠重伤被南侠展昭生擒归案，即将押赴开封府市曹处斩（游戏结束）！'
              : nextSession.duelStakes === 'kaifeng_warrant'
                ? `缉拿海捕要犯失手！少侠命陨于凶徒【${killerLabel}】毒刃之下（游戏结束）！`
                : `生死决斗败亡！少侠命陨于【${killerLabel}】之手（游戏结束）！`
          : nextSession.surviveToWin &&
              nextSession.outcome === 'player_win' &&
              nextSession.npc.hp > 0
            ? `稳守撑满 ${nextSession.maxRounds} 合考校不倒！ · ${preview.rewardsSummary}`
            : preview.rewardsSummary
      nextSession = {
        ...nextSession,
        rewardsSummary: deathNotice,
      }
    }

    set({ activeCombat: nextSession })
  },

  finishCombatSession: () => {
    const s = get()
    const session = s.activeCombat
    if (!session || session.outcome === 'ongoing') return

    const regionName = NODE_MAP[s.activeRegionId]?.name ?? '江湖'
    const songDate = formatSongDate(s.dayCount, s.shichenIdx)
    const qHook = session.questCombatHook
    const killerLabel =
      session.enemies && session.enemies.length > 1
        ? session.enemies.map((e) => e.name).join('、')
        : session.npc.name

    // 1. 非切磋类的生死对决失败 -> 死亡机制（Game Over）
    if (session.mode === 'duel' && session.outcome === 'npc_win') {
      const gameOverPayload: GameOverState = buildCombatDeathPayload(session, {
        killerLabel,
        songDate,
        locationName: regionName,
      })

      set({
        activeCombat: null,
        activeNpcInteraction: null,
        activeStoryScene: null,
        hp: 0,
        gameOver: gameOverPayload,
        logs: [
          createLogEntry(
            s.dayCount,
            gameOverPayload.reasonTitle,
            gameOverPayload.reasonDetail,
            true,
            s.shichenIdx,
          ),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    // 2. 存活结算（切磋/剧情试炼/撑回合任意结局 或 生死对决获胜/平局/脱逃）
    const res = computeCombatSettlement(s, session)
    const dbTarget =
      (session.targetNpcNode.id && NPC_DB_MAP[session.targetNpcNode.id]) ||
      resolveNpcByName(session.targetNpcNode.name)
    const d = applyCombatSettlementRules(
      {
        silver: s.silver,
        inventory: s.inventory,
        sectState: clonePlayerSectState(s.sectState),
        questState: cloneQuestRuntimeState(s.questState),
        combatExp: res.nextCombatExp,
        chivalry: s.chivalry,
        escortContract: s.activeEscortContract,
        yamenBounty: s.activeYamenBounty,
        yamenBountyDoneIds: s.yamenBountyDoneIds,
        hp: res.nextHp,
        mp: res.nextMp,
        logTag: res.logTag,
        logText: res.logText,
        triggerKaifengZhanZhao: false,
        nextTournamentOpponent: null,
        deadNpcIds: s.deadNpcIds,
      },
      {
        session,
        res,
        qHook,
        dbTarget,
        activeRegionId: s.activeRegionId,
        activeEscortContract: s.activeEscortContract,
      },
    )

    set({
      activeCombat: null,
      activeNpcInteraction:
        qHook ||
        session.duelStakes === 'escort_ambush' ||
        (session.duelStakes === 'yamen_bounty' && session.outcome === 'player_win') ||
        ((session.duelStakes === 'liao_spy_duel' || session.duelStakes === 'kaifeng_warrant') &&
          session.outcome === 'player_win')
          ? null
          : s.activeNpcInteraction,
      combatExp: d.combatExp,
      deadNpcIds: d.deadNpcIds,
      chivalry: d.chivalry,
      activeEscortContract: d.escortContract,
      activeYamenBounty: d.yamenBounty,
      yamenBountyDoneIds: d.yamenBountyDoneIds,
      silver: d.silver,
      inventory: d.inventory,
      sectState: d.sectState,
      questState: d.questState,
      baseStats: res.nextBaseStats,
      learnedArts: res.nextLearnedArts,
      npcFavor: res.nextNpcFavor,
      mountKey: res.derived.mountKey,
      qinggongBonus: res.derived.qinggongBonus,
      ridingSkill: res.derived.ridingSkill,
      agility: res.derived.agility,
      res: res.derived.res,
      skills: res.derived.skills,
      maxHp: res.derived.maxHp,
      hp: d.hp,
      maxMp: res.derived.maxMp,
      mp: d.mp,
      actionFeedback: {
        text: d.logText,
        tone: session.outcome === 'npc_win' || session.outcome === 'escaped' ? 'warn' : 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          d.logTag,
          d.logText,
          session.outcome === 'player_win' || res.anyBreakthrough,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })

    if (d.nextTournamentOpponent) {
      get().startNpcCombat(d.nextTournamentOpponent, 'spar', 'sect_tournament', true)
      return
    }

    let triggerZhanZhao = d.triggerKaifengZhanZhao

    // 3. 若挂载了声明式剧情战后回调钩子，按结局分支执行 QuestEffect[]
    if (qHook) {
      const followUp =
        session.outcome === 'player_win'
          ? qHook.onWin
          : session.outcome === 'npc_win'
            ? (qHook.onLose ?? [])
            : session.outcome === 'escaped'
              ? (qHook.onEscape ?? [])
              : // 平局（含同归于尽）未设 onDraw 时按落败分支处理，以免触发器已消耗而任务死锁
                (qHook.onDraw ?? qHook.onLose ?? [])

      if (followUp.length > 0) {
        get().runQuestEffects(followUp, session.targetNpcNode)
      }

      const afterHook = get()
      if (
        session.duelStakes === 'rob_official' &&
        session.outcome === 'player_win' &&
        afterHook.activeRegionId === 'bianliang' &&
        (afterHook.sectState.songCourtBlacklisted ||
          Boolean(afterHook.questState.flags.song_court_blacklisted)) &&
        !afterHook.activeCombat &&
        !afterHook.gameOver
      ) {
        triggerZhanZhao = true
      }
    }

    if (triggerZhanZhao) {
      get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
      return
    }

    if (!get().activeCombat && !get().gameOver) {
      void get().saveToSlot('autosave', `${regionName} · 战后调息`, true)
    }
  },

  restartAfterGameOver: () => {
    const s = get()
    // 以初始存档数据为唯一来源整体重置（游历宗师、十艺经验、出生地、身故名录等一律清零），
    // 仅保留存档槽列表与界面偏好，杜绝上一局状态污染新局
    const fresh = createInitialStoreData()
    set({
      ...fresh,
      characterCreated: false,
      saveSlots: s.saveSlots,
      showRegionLabels: s.showRegionLabels,
      overlays: s.overlays,
      cultivationSpeedStep: s.cultivationSpeedStep,
      actionFeedback: {
        text: '大梦初醒，重返皇祐二年正月初一东京汴梁！',
        tone: 'success',
      },
      logs: [
        createLogEntry(
          1,
          '重入江湖',
          '前尘旧梦俱散，少侠重返皇祐二年正月初一【开封府】，再谱武林新篇！',
          true,
          4,
        ),
      ],
    })
  },

  openNpcInteraction: (npc) => {
    if (isNpcDead(get().deadNpcIds, npc.id)) {
      set({ actionFeedback: { text: `【${npc.name}】已然身故，斯人已逝。`, tone: 'warn' } })
      return
    }
    set({
      activeNpcInteraction: npc,
      tooltip: null,
    })
  },

  closeNpcInteraction: () => {
    set({ activeNpcInteraction: null })
  },

  hostNpcBanquet: (npc, tier) => {
    const s = get()
    if (s.campPos || s.traveling) {
      set({
        actionFeedback: {
          text: '荒郊野岭无酒肆筵席，请入城后再设宴款待贵客！',
          tone: 'warn',
        },
      })
      return
    }
    const npcKey = npc.id ?? npc.name
    const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
    const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped, s.equippedArts, s.learnedArts).颜值
    const currentFavor = resolveNpcFavor(s.npcFavor, npcKey, effCharm)

    if (s.npcBanquetedMonth[npcKey] === curMonthIdx) {
      set({
        actionFeedback: {
          text: `本月已设宴款待过【${npc.name}】，杯酒言欢贵在适度，请下月再邀！（当前好感 ${currentFavor}/100）`,
          tone: 'talk',
        },
      })
      return
    }

    const tierDef = BANQUET_TIERS[tier]
    const profile = getNpcFavorProfile(npc)
    const likesTeaWine =
      profile.likes.includes('茶酒珍馐') && !profile.dislikes.includes('茶酒珍馐')
    const { cost, favorDelta } = computeBanquetFavorGain(tier, effCharm, likesTeaWine)

    if (s.silver < cost) {
      set({
        actionFeedback: {
          text: `纹银不足！设办【${tierDef.label}】需纹银 ${cost} 两（当前仅余 ${s.silver} 两）。`,
          tone: 'warn',
        },
      })
      return
    }

    const nextFavor = Math.max(MIN_NPC_FAVOR, Math.min(MAX_NPC_FAVOR, currentFavor + favorDelta))
    const actualGain = nextFavor - currentFavor

    commitTimeAdvance(set, get, {
      deltaShichen: 2,
      silverOverride: s.silver - cost,
      chargeForeignLodging: true,
      vitalityFactor: 1,
      buildExtraPatch: (adv) => {
        const msg = `花费 ${cost} 两纹银设【${tierDef.label}】款待【${npc.name}】${likesTeaWine ? '（正投茶酒之好！）' : ''}，推杯换盏相谈甚欢（好感度 +${actualGain}，当前 ${nextFavor}/100）！`
        return {
          npcFavor: {
            ...adv.npcFavor,
            [npcKey]: nextFavor,
          },
          npcBanquetedMonth: {
            ...s.npcBanquetedMonth,
            [npcKey]: curMonthIdx,
          },
          actionFeedback: { text: msg, tone: 'success' },
          logs: [
            createLogEntry(adv.dayCount, '设宴结交', msg, true, adv.shichenIdx),
            ...adv.logs,
          ].slice(0, 60),
        }
      },
    })
  },

  giftNpcItem: (npc, itemId) => {
    const s = get()
    const item = ITEM_DB_MAP[itemId]
    if (!item) return
    if (
      NON_GIFTABLE_KEY_ITEM_IDS.has(itemId) ||
      !['scrolls', 'medicine', 'tools'].includes(item.category) ||
      (item.rarity !== '良阶' && item.rarity !== '凡阶') ||
      Boolean(item.equipSlot || item.mountMeta || item.weaponMeta || item.gearMeta)
    ) {
      set({
        actionFeedback: {
          text: `「${item.name}」不可作为常规赠礼（仅限赠予良阶或凡阶的典籍书画、丹药毒物与雅器百工）！`,
          tone: 'warn',
        },
      })
      return
    }
    const existing = s.inventory.find((st) => st.itemId === itemId && st.qty > 0)
    if (!existing) return
    const nextInventory = s.inventory
      .map((st) => (st.itemId === itemId ? { ...st, qty: st.qty - 1 } : st))
      .filter((st) => st.qty > 0)

    const npcKey = npc.id ?? npc.name
    const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped, s.equippedArts, s.learnedArts).颜值
    const currentFavor = resolveNpcFavor(s.npcFavor, npcKey, effCharm)
    const profile = getNpcFavorProfile(npc)
    const res = computeGiftFavorGain(currentFavor, item, profile, effCharm)

    const reactionText = getNpcGiftDialogue(npc, res.reaction, item.name, res.giftCategory)

    set({
      inventory: nextInventory,
      npcFavor: {
        ...s.npcFavor,
        [npcKey]: res.nextFavor,
      },
      actionFeedback: {
        text: `向【${npc.name}】赠予「${item.name}」（价值${item.value}两）：${reactionText}（好感度 +${res.favorGain}，当前 ${res.nextFavor}/100）`,
        tone: res.reaction === 'disliked' ? 'warn' : 'success',
      },
    })
  },
})
