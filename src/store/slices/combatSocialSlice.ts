import type { StoreSlice } from '../storeTypes'
import {
  NPC_DB_MAP,
  resolveNpcByName,
  UNIQUE_ARTIFACT_MAP,
} from '../../data/gameDb'
import {
  DEFAULT_EQUIPPED_SLOTS,
  getEffectiveTalents,
  ITEM_DB_MAP,
  NON_GIFTABLE_KEY_ITEM_IDS,
} from '../../data/itemsDb'
import {
  BANQUET_TIERS,
  computeBanquetFavorGain,
  computeCelunBonusAmount,
  computeTalkFavorDelta,
  resolveNpcFavor,
} from '../../engine/economy'
import {
  cloneQuestRuntimeState,
  DEFAULT_QUEST_RUNTIME_STATE,
} from '../../engine/questEngine'
import type {
  EquippedArtsMap,
  GameOverState,
  LearnedArtEntry,
  NodeNpc,
} from '../../types/game'
import { syncArtLevelsToExpsAndMilestones } from '../../utils/artsProgression'
import {
  cloneHeroBaseStats,
  DEFAULT_HERO_BASE_STATS,
  deriveHeroEffectiveStats,
  HERO_BASE_CAPS,
} from '../../utils/heroStats'
import {
  formatSongDate,
  NODE_MAP,
} from '../../utils/mapMath'
import {
  MAX_NPC_FAVOR,
  MIN_NPC_FAVOR,
  computeGiftFavorGain,
  getNpcFavorProfile,
} from '../../utils/npcFavor'
import {
  getNpcGiftDialogue,
  getNpcTalkDialogue,
} from '../../utils/npcDialogues'
import {
  buildPlayerCombatant,
  createCombatSession,
  resolveCombatRound,
  type DuelStakesKind,
} from '../../utils/combatEngine'
import {
  buildNodeNpcFromTournamentOpponent,
  buildZhanZhaoArrestNodeNpc,
  clonePlayerSectState,
  DEFAULT_PLAYER_SECT_STATE,
  getSectRankTitle,
  isSongOfficialForRobbery,
  SECT_TOURNAMENT_TOKEN_ITEM_ID,
} from '../../utils/sectMechanics'
import {
  commitTimeAdvance,
  createLogEntry,
  addItemToInventory,
  removeItemFromInventory,
  computeCombatSettlement,
} from '../storeHelpers'

export type CombatSocialKeys =
  | 'interactNpc'
  | 'hostNpcBanquet'
  | 'startNpcCombat'
  | 'submitCombatAction'
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
      const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped).颜值
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
      const { delta } = computeTalkFavorDelta(eloSkill, Math.random)
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

    const effectiveStakes: DuelStakesKind = duelStakes ?? (mode === 'duel' ? 'duel' : 'spar')
    const effectiveMode: 'spar' | 'duel' =
      effectiveStakes === 'spar' ||
      effectiveStakes === 'sect_tournament' ||
      effectiveStakes === 'escort_ambush'
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
      const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped).颜值
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
      const eff = def.useEffect
      if (eff) {
        const cloned = cloneHeroBaseStats(s.baseStats)
        if (def.rarity === '天阶' || def.rarity === '地阶') {
          if (eff.maxHp) cloned.maxHp = (cloned.maxHp ?? 0) + eff.maxHp
          if (eff.maxMp) cloned.maxMp = (cloned.maxMp ?? 0) + eff.maxMp
          if (eff.agi) cloned.agility = (cloned.agility ?? 0) + eff.agi
          if (eff.res) cloned.res = (cloned.res ?? 0) + eff.res
        }
        if (eff.skillGain) {
          const [sk, gain] = eff.skillGain
          cloned.skills[sk] = Math.min(
            HERO_BASE_CAPS.civilSkill,
            (cloned.skills[sk] ?? 40) + gain,
          )
          const synced = syncArtLevelsToExpsAndMilestones({
            baseStats: cloned,
            artExps: nextArtExps,
            artMilestoneFlags: nextArtMilestoneFlags,
          })
          nextArtExps = synced.artExps
          nextArtMilestoneFlags = synced.artMilestoneFlags
        }
        if (eff.food) nextFood += eff.food
        nextBaseStats = cloned
      }
    }

    let nextSession = resolveCombatRound(s.activeCombat, choice)
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
      const gameOverPayload: GameOverState =
        qHook?.deathTitle || qHook?.deathDetail
          ? {
              reasonTitle: qHook.deathTitle ?? '命陨江湖 · 侠踪绝响',
              reasonDetail:
                qHook.deathDetail ??
                `生死相搏，刀剑无眼！少侠在与【${killerLabel}】的生死决战中气绝败北。`,
              killerName: killerLabel,
              songDate,
              locationName: regionName,
            }
          : session.duelStakes === 'zhan_zhao_arrest'
            ? {
                reasonTitle: '开封府市曹处斩',
                reasonDetail:
                  '少侠因领绿林「纳投名状」劫掠大宋朝廷命官，名列朝廷黑名单。今踏入东京开封府被御前四品带刀护卫「南侠」展昭缉拿归案，押赴开封府市曹，狗头铡下明正典刑！',
                killerName: killerLabel,
                songDate,
                locationName: regionName,
              }
            : session.duelStakes === 'liao_spy_duel'
              ? {
                  reasonTitle: '喋血燕云 · 为国捐躯',
                  reasonDetail: `少侠奉常山枪派军令赴燕云诛除契丹密谍，在与【${killerLabel}】的生死决战中力竭重创，命陨塞北，马革裹尸！`,
                  killerName: killerLabel,
                  songDate,
                  locationName: regionName,
                }
              : session.duelStakes === 'kaifeng_warrant'
                ? {
                    reasonTitle: '缉盗失手 · 血溅街巷',
                    reasonDetail: `少侠奉开封府海捕公文缉拿江洋要犯【${killerLabel}】，殊死搏杀中力竭失手，惨遭凶徒毒刃反噬，血洒当场！`,
                    killerName: killerLabel,
                    songDate,
                    locationName: regionName,
                  }
                : session.duelStakes === 'rob_official'
                  ? {
                      reasonTitle: '劫官败亡 · 伏尸当场',
                      reasonDetail: `少侠欲劫掠大宋官员【${killerLabel}】以纳绿林投名状，岂料失手落败，当场毙命于刀兵之下！`,
                      killerName: killerLabel,
                      songDate,
                      locationName: regionName,
                    }
                  : session.surviveToWin
                    ? {
                        reasonTitle: `${session.maxRounds}合未竟 · 命陨当场`,
                        reasonDetail: `刀剑无眼，强敌难撄！少侠在与【${killerLabel}】的交锋中未能撑满 ${session.maxRounds} 回合，真气溃散重创倒地，当场毙命！`,
                        killerName: killerLabel,
                        songDate,
                        locationName: regionName,
                      }
                    : {
                        reasonTitle: '命陨江湖 · 侠踪绝响',
                        reasonDetail: `生死相搏，刀剑无眼！少侠在与【${killerLabel}】的生死对决中气绝败北，血染尘沙，一世风云就此落幕。`,
                        killerName: killerLabel,
                        songDate,
                        locationName: regionName,
                      }

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
    let nextSilver = s.silver
    let nextInventory = s.inventory
    const nextSectState = clonePlayerSectState(s.sectState)
    const nextQuestState = cloneQuestRuntimeState(s.questState)
    let extraLogText = res.logText
    let extraLogTag = res.logTag
    let triggerKaifengZhanZhao = false
    let nextTournamentOpponent: NodeNpc | null = null
    let finalHp = res.nextHp
    let finalMp = res.nextMp

    // 同门切磋获胜积攒微末功绩
    const dbTarget =
      (session.targetNpcNode.id && NPC_DB_MAP[session.targetNpcNode.id]) ||
      resolveNpcByName(session.targetNpcNode.name)
    if (
      session.outcome === 'player_win' &&
      nextSectState.sectId &&
      dbTarget?.factionId === nextSectState.sectId
    ) {
      nextSectState.contribution += 12
      extraLogText += `（同门印证获门派功绩 +12，现 ${nextSectState.contribution}）`
    }

    // 星宿派（SECT-19）实力晋升判定：击败 Lv.2/Lv.3/Lv.4(或摘星子) 同门记录，杀死丁春秋即成掌门
    if (session.outcome === 'player_win' && nextSectState.sectId === 'SECT-19') {
      if (dbTarget?.factionId === 'SECT-19' && dbTarget.sectRank) {
        const defeated = new Set(nextSectState.xingxiuDefeatedRanks)
        defeated.add(dbTarget.sectRank)
        if (dbTarget.id === 'NPC-0181') {
          defeated.add(4)
        }
        nextSectState.xingxiuDefeatedRanks = Array.from(defeated)
      }
      if (
        session.mode === 'duel' &&
        (dbTarget?.id === 'NPC-0122' || session.npc.name === '丁春秋')
      ) {
        nextSectState.killedDingChunqiu = true
        nextSectState.rank = 5
        nextSectState.rankLabel = getSectRankTitle('SECT-19', 5)
        extraLogTag = '弑师夺位'
        extraLogText = `少侠在生死决斗中击杀星宿老怪【丁春秋】！依星宿派弱肉强食之规，正式登临第 5 阶【${nextSectState.rankLabel}】尊位！`
      }
    }

    // 二三流门派「武艺教学」切磋任务完成判定
    if (
      session.mode === 'spar' &&
      session.outcome === 'player_win' &&
      nextSectState.activeSectTask?.kind === 'martial_coaching' &&
      !nextSectState.activeSectTask.completedStep
    ) {
      const task = nextSectState.activeSectTask
      const matchedTarget =
        (session.targetNpcNode.id && session.targetNpcNode.id === task.traineeNpcId) ||
        (!session.targetNpcNode.id && session.targetNpcNode.name === task.traineeNpcName)
      if (matchedTarget) {
        nextSectState.activeSectTask = { ...task, completedStep: true }
        extraLogTag = '宗门教学'
        extraLogText += `（已完成宗门任务【${task.title}】切磋指点！请回【${task.sectName}】向掌门【${task.leaderName}】复命）`
      }
    }

    // 绿林盟「纳投名状」劫官胜利（非声明式 hook 调用时的直通兜底）
    if (!qHook && session.duelStakes === 'rob_official' && session.outcome === 'player_win') {
      nextSilver += 60
      nextSectState.toumingzhuangState = 'completed'
      nextSectState.songCourtBlacklisted = true
      nextQuestState.flags.toumingzhuang_state = 'completed'
      nextQuestState.flags.toumingzhuang_completed = true
      nextQuestState.flags.song_court_blacklisted = true
      if (nextQuestState.activeQuests['QST-SECT-18-TOUMINGZHUANG']) {
        nextQuestState.activeQuests['QST-SECT-18-TOUMINGZHUANG'] = {
          ...nextQuestState.activeQuests['QST-SECT-18-TOUMINGZHUANG']!,
          stepId: 'return_to_join',
        }
      }
      extraLogTag = '投名状成'
      extraLogText = `劫掠大宋官员【${session.npc.name}】得手，夺得官银 +60 两、战斗经验 +${res.combatExpGain}，已完成绿林【纳投名状】！⚠️ 少侠已被列入大宋朝廷黑名单：其他城池无碍，一旦进入【开封府】必遭南侠展昭挑战缉斩！`
      if (s.activeRegionId === 'bianliang') {
        triggerKaifengZhanZhao = true
      }
    }

    let nextCombatExp = res.nextCombatExp
    let nextChivalry = s.chivalry
    let nextEscortContract = s.activeEscortContract

    // 常山枪派「半年度燕云锄奸」诛杀辽谍胜利（赏银受【策论】干略加成）
    if (session.duelStakes === 'liao_spy_duel' && session.outcome === 'player_win') {
      const spyBounty = computeCelunBonusAmount(50, res.derived.skills['策论'] ?? 0)
      nextSectState.activeLiaoSpy = null
      nextSectState.changshanMissedCount = 0
      nextSectState.contribution += 100
      nextSilver += spyBounty
      extraLogTag = '燕云锄奸'
      extraLogText = `浴血诛除辽国密谍【${session.npc.name}】！圆满完成常山枪派半年军令，获门派功绩 +100（现 ${nextSectState.contribution}）、战斗经验 +${res.combatExpGain}、犒赏纹银 +${spyBounty} 两${spyBounty > 50 ? `（含策论加成 +${spyBounty - 50} 两）` : ''}！`
    }

    // 若从展昭剑下侥幸获胜
    if (session.duelStakes === 'zhan_zhao_arrest' && session.outcome === 'player_win') {
      extraLogTag = '震动东京'
      extraLogText = `少侠竟在东京街头力挫御前四品带刀护卫「南侠」展昭（战斗经验 +${res.combatExpGain}），杀出重围！然朝廷黑名单未消，再度踏入开封仍将遭展昭截杀！`
    }

    // 开封府 / 六扇门「海捕公文」缉拿要犯胜利（赏银受【策论】干略加成）
    if (
      session.outcome === 'player_win' &&
      nextSectState.sectId === 'SECT-17' &&
      nextSectState.activeKaifengWarrant &&
      session.targetNpcNode.id === `KAIFENG_WARRANT_${nextSectState.activeKaifengWarrant.id}`
    ) {
      const warrant = nextSectState.activeKaifengWarrant
      const warrantBounty = computeCelunBonusAmount(15, res.derived.skills['策论'] ?? 0)
      nextSectState.activeKaifengWarrant = null
      nextSectState.kaifengCasesSolved += 1
      if (warrant.deadlineDay) {
        nextSectState.kaifengMissedCount = 0
      }
      nextSilver += warrantBounty
      extraLogTag = '缉拿归案'
      extraLogText = `少侠顺利擒获海捕要犯【${warrant.targetName}（${warrant.targetTitle}）】归案！当前阶位办案量 +1（累计 ${nextSectState.kaifengCasesSolved} 次），获开封府赏银 +${warrantBounty} 两${warrantBounty > 15 ? `（含策论加成 +${warrantBounty - 15} 两）` : ''}、战斗经验 +${res.combatExpGain}！`
    }

    // 镖师走镖「绿林劫镖」护送战结算
    if (session.duelStakes === 'escort_ambush') {
      const contract = s.activeEscortContract
      if (session.outcome === 'player_win') {
        nextCombatExp += 25
        nextChivalry += 1
        extraLogTag = '击退劫匪'
        extraLogText = `刀光染血，少侠力挫【${session.npc.name}】，死死护住镖车【${contract?.cargoName ?? '红货'}】毫发无损（额外战斗经验 +25 · 侠义 +1）！请于天下舆图继续启程赶赴【${contract?.destName ?? '目的地'}】交割领酬。`
      } else if (session.outcome === 'escaped') {
        nextEscortContract = null
        extraLogTag = '弃镖脱身'
        extraLogText = `劫匪势众凶悍，少侠只得弃下镖箱【${contract?.cargoName ?? '红货'}】抽身掠出重围，此趟走镖差事宣告失利。`
      } else {
        const lostSilver = Math.min(nextSilver, 10)
        nextSilver -= lostSilver
        nextEscortContract = null
        finalHp = Math.max(1, Math.min(finalHp, Math.round(res.derived.maxHp * 0.35)))
        extraLogTag = '失镖受挫'
        extraLogText = `少侠双拳难敌四手，被【${session.npc.name}】夺走镖车【${contract?.cargoName ?? '红货'}】${lostSilver > 0 ? `并搜去盘缠 ${lostSilver} 两` : ''}，幸得留下一命！`
      }
    }

    // 道门与名山剑派「宗门大比」1v1 淘汰赛结算
    if (session.duelStakes === 'sect_tournament' && nextSectState.activeSectTournament) {
      const tourney = nextSectState.activeSectTournament
      if (session.outcome === 'player_win') {
        if (tourney.round < 3) {
          const nextRound = (tourney.round + 1) as 2 | 3
          nextSectState.activeSectTournament = { ...tourney, round: nextRound }
          finalHp = res.derived.maxHp
          finalMp = res.derived.maxMp
          const nextOpp = tourney.opponents[nextRound - 1]!
          nextTournamentOpponent = buildNodeNpcFromTournamentOpponent(
            tourney.sectId,
            nextOpp,
            nextRound,
          )
          extraLogTag = '宗门大比'
          extraLogText = `宗门大比第 ${tourney.round} 轮力克【${session.npc.name}】，成功晋级${nextRound === 2 ? '四强' : '决赛'}！经演武场调息恢复后，迎战下一位同门【${nextOpp.name}】！`
        } else {
          // 连胜三轮夺魁
          nextSectState.activeSectTournament = null
          nextSectState.wonSectTournament = true
          nextInventory = addItemToInventory(nextInventory, SECT_TOURNAMENT_TOKEN_ITEM_ID, 1)
          nextInventory = addItemToInventory(nextInventory, 'ITM-MED-111', 1)
          nextInventory = addItemToInventory(nextInventory, 'ITM-MED-113', 1)
          nextSilver += 50
          extraLogTag = '大比夺魁'
          extraLogText = `连克三阵，力压群雄！少侠夺得【${tourney.sectName}】第 ${tourney.yearIndex} 届宗门大比冠军！获赐《宗门大比冠军信物》×1、嵩山少林小还丹 ×1、太医局紫雪神丹 ×1、纹银 +50 两！`
        }
      } else {
        // 止步当前轮次，发放对应名次奖励
        nextSectState.activeSectTournament = null
        extraLogTag = '宗门大比'
        if (tourney.round === 1) {
          nextInventory = addItemToInventory(nextInventory, 'ITM-MED-122', 1)
          nextSilver += 10
          extraLogText = `宗门大比首轮止步八强，宗门赐予慰勉：熟药所行军跌打丸 ×1、纹银 +10 两。`
        } else if (tourney.round === 2) {
          nextInventory = addItemToInventory(nextInventory, 'ITM-MED-122', 1)
          nextInventory = addItemToInventory(nextInventory, 'ITM-MED-123', 1)
          nextSilver += 20
          extraLogText = `宗门大比闯入四强，惜败于半决赛！宗门赐予嘉奖：熟药所行军跌打丸 ×1、太乙回气清心散 ×1、纹银 +20 两。`
        } else {
          nextInventory = addItemToInventory(nextInventory, 'ITM-MED-111', 1)
          nextSilver += 35
          extraLogText = `宗门大比杀入决赛，惜居亚军！宗门赐予厚赏：嵩山少林小还丹 ×1、纹银 +35 两。`
        }
      }
    }

    set({
      activeCombat: null,
      activeNpcInteraction:
        qHook ||
        session.duelStakes === 'escort_ambush' ||
        ((session.duelStakes === 'liao_spy_duel' || session.duelStakes === 'kaifeng_warrant') &&
          session.outcome === 'player_win')
          ? null
          : s.activeNpcInteraction,
      combatExp: nextCombatExp,
      chivalry: nextChivalry,
      activeEscortContract: nextEscortContract,
      silver: nextSilver,
      inventory: nextInventory,
      sectState: nextSectState,
      questState: nextQuestState,
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
      hp: finalHp,
      maxMp: res.derived.maxMp,
      mp: finalMp,
      actionFeedback: {
        text: extraLogText,
        tone: session.outcome === 'npc_win' || session.outcome === 'escaped' ? 'warn' : 'success',
      },
      logs: [
        createLogEntry(
          s.dayCount,
          extraLogTag,
          extraLogText,
          session.outcome === 'player_win' || res.anyBreakthrough,
          s.shichenIdx,
        ),
        ...s.logs,
      ].slice(0, 60),
    })

    if (nextTournamentOpponent) {
      get().startNpcCombat(nextTournamentOpponent, 'spar', 'sect_tournament', true)
      return
    }

    // 3. 若挂载了声明式剧情战后回调钩子，按结局分支执行 QuestEffect[]
    if (qHook) {
      const followUp =
        session.outcome === 'player_win'
          ? qHook.onWin
          : session.outcome === 'npc_win'
            ? (qHook.onLose ?? [])
            : session.outcome === 'escaped'
              ? (qHook.onEscape ?? [])
              : (qHook.onDraw ?? [])

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
        triggerKaifengZhanZhao = true
      }
    }

    if (triggerKaifengZhanZhao) {
      get().startNpcCombat(buildZhanZhaoArrestNodeNpc(), 'duel', 'zhan_zhao_arrest', true)
      return
    }

    if (!get().activeCombat && !get().gameOver) {
      void get().saveToSlot('autosave', `${regionName} · 战后调息`, true)
    }
  },

  restartAfterGameOver: () => {
    const freshBase = cloneHeroBaseStats(DEFAULT_HERO_BASE_STATS)
    const freshEquip = { ...DEFAULT_EQUIPPED_SLOTS }
    const freshLearned: LearnedArtEntry[] = []
    const freshEqArts: EquippedArtsMap = {
      neigong: null,
      qinggong: null,
      move1: null,
      move2: null,
      move3: null,
      move4: null,
    }
    const derived = deriveHeroEffectiveStats(freshBase, freshEquip, freshEqArts, freshLearned)

    set({
      characterCreated: false,
      dayCount: 1,
      shichenIdx: 4,
      viewMode: 'region',
      activeRegionId: 'bianliang',
      activeBuildingInteriorId: null,
      selectedNodeId: null,
      selectedBuildingId: null,
      selectedSpotId: null,
      currentNodeId: 'bianliang',
      traveling: null,
      cultivationSession: null,
      campPos: null,
      baseStats: freshBase,
      mountKey: derived.mountKey,
      qinggongBonus: derived.qinggongBonus,
      ridingSkill: derived.ridingSkill,
      agility: derived.agility,
      combatExp: 80,
      renown: 0,
      chivalry: 0,
      silver: 150,
      food: 25,
      hp: derived.maxHp,
      maxHp: derived.maxHp,
      mp: derived.maxMp,
      maxMp: derived.maxMp,
      res: derived.res,
      skills: { ...derived.skills },
      equipped: freshEquip,
      learnedArts: freshLearned,
      equippedArts: freshEqArts,
      inventory: [],
      consumedUniqueIds: [],
      consumedOnceItemIds: [],
      npcFavor: {},
      npcTalkedMonth: {},
      npcSparredMonth: {},
      npcBanquetedMonth: {},
      inscribedPoemSpotIds: [],
      auctionBoughtByMonth: {},
      activeEscortContract: null,
      sectState: clonePlayerSectState(DEFAULT_PLAYER_SECT_STATE),
      questState: cloneQuestRuntimeState(DEFAULT_QUEST_RUNTIME_STATE),
      hiddenQuestIds: [],
      gameOver: null,
      activeCombat: null,
      activeStoryScene: null,
      activeNpcInteraction: null,
      menuOpen: false,
      compendiumOpen: false,
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
    const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped).颜值
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
    const effCharm = getEffectiveTalents(s.baseStats.talents, s.equipped).颜值
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
