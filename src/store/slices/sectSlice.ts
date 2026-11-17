import type { StoreSlice } from '../storeTypes'
import {
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  resolveNpcByName,
} from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { cloneQuestRuntimeState } from '../../engine/questEngine'
import type {
  LearnedArtEntry,
  LogEntry,
  PlayerSectState,
} from '../../types/game'
import { EMEI_ENTRY_QUEST_ID } from '../../data/quests/sects/emeiEntryQuest'
import { GAIBANG_ENTRY_QUEST_ID } from '../../data/quests/sects/gaibangEntryQuest'
import { HUASHAN_ENTRY_QUEST_ID } from '../../data/quests/sects/huashanEntryQuest'
import { NANSHAOLIN_ENTRY_QUEST_ID } from '../../data/quests/sects/nanshaolinEntryQuest'
import { QINGCHENG_ENTRY_QUEST_ID } from '../../data/quests/sects/qingchengEntryQuest'
import { TIEZHANG_ENTRY_QUEST_ID } from '../../data/quests/sects/tiezhangEntryQuest'
import { WUTAI_ENTRY_QUEST_ID } from '../../data/quests/sects/wutaiEntryQuest'
import { SHAOLIN_ENTRY_QUEST_ID } from '../../data/quests/sects/shaolinEntryQuest'
import { TAISHAN_ENTRY_QUEST_ID } from '../../data/quests/sects/taishanEntryQuest'
import {
  INITIAL_NPC_FAVOR,
  MAX_NPC_FAVOR,
  MIN_NPC_FAVOR,
} from '../../utils/npcFavor'
import {
  applySongLiaoSuspicionFavorPenalty,
  buildNodeNpcFromTournamentOpponent,
  canPlayerLearnSectArt,
  canReceiveSectLeaderTask,
  clonePlayerSectState,
  evaluateSectEntry,
  evaluateSectPromotion,
  generateKaifengWarrant,
  generateMinorSectTask,
  generateSectTournament,
  getChangshanMonthlyStipend,
  getHalfYearPeriodInfo,
  getKaifengMonthlyStipend,
  getSectLeaderNpcId,
  getSectTeachableArts,
  getSectTournamentDateInfo,
  isDaoSwordSect,
  isShaolinArtBlockedForLayDisciple,
  KAIFENG_RECOMMENDATION_ITEM_ID,
  REFERRAL_BRIBE_BY_SOURCE_SECT,
  SECT_ENTRY_GEAR_GIFTS,
  SECT_TOURNAMENT_TOKEN_ITEM_ID,
  SEMI_ANNUAL_DEADLINE_DAYS,
  SHAOLIN_CHORE_TARGET_DAYS,
} from '../../utils/sectMechanics'
import { estimateHeroRealm } from '../../utils/realmUtils'
import {
  createLogEntry,
  addItemToInventory,
  removeItemFromInventory,
} from '../storeHelpers'

export type SectKeys =
  | 'joinSect'
  | 'leaveSect'
  | 'acceptToumingzhuang'
  | 'promoteSectRank'
  | 'startSectTournament'
  | 'continueSectTournamentRound'
  | 'acceptSectTask'
  | 'abandonSectTask'
  | 'acceptKaifengWarrant'
  | 'abandonKaifengWarrant'
  | 'completeKaifengInvestigation'
  | 'completeSectTaskStep'
  | 'turnInSectTask'
  | 'bribeForReferral'
  | 'claimKaifengRecommendation'
  | 'learnSectMartialArt'

export const createSectSlice: StoreSlice<SectKeys> = (set, get) => ({
  joinSect: (targetSectId, mentorNpc) => {
    const s = get()
    const evalRes = evaluateSectEntry({
      targetSectId,
      sectState: s.sectState,
      silver: s.silver,
      baseStats: s.baseStats,
      inventory: s.inventory,
    })

    if (!evalRes.canJoin) {
      const warn = evalRes.blockedReason ?? '尚未满足入门条件。'
      set({
        actionFeedback: { text: warn, tone: 'warn' },
      })
      return
    }

    const faction = FACTION_DB_MAP[targetSectId]
    if (!faction) return

    let nextSilver = s.silver - evalRes.costSilver
    let nextInv = s.inventory
    if (evalRes.consumeItemId) {
      const removed = removeItemFromInventory(nextInv, evalRes.consumeItemId, 1)
      if (!removed) {
        set({
          actionFeedback: { text: '行囊中缺少所需荐书信物！', tone: 'warn' },
        })
        return
      }
      nextInv = removed
    }

    const curMonthIdx = Math.floor((s.dayCount - 1) / 30)
    const prevPeriodInfo = getHalfYearPeriodInfo(Math.max(0, s.dayCount - 1))
    const curPeriodInfo = getHalfYearPeriodInfo(s.dayCount)
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      sectId: targetSectId,
      rank: evalRes.startingRank,
      rankLabel: evalRes.startingRankLabel,
      contribution: 0,
      joinedDay: s.dayCount,
      lastStipendMonth: curMonthIdx,
      lastLiaoSpyMissionYear:
        targetSectId === 'SECT-22'
          ? prevPeriodInfo.latestPeriod
          : s.sectState.lastLiaoSpyMissionYear,
      changshanMissedCount: 0,
      activeLiaoSpy: evalRes.allowOfficialTransferFromChangshan
        ? null
        : s.sectState.activeLiaoSpy,
      activeSectTask: null,
      wonSectTournament: false,
      activeSectTournament: null,
      xingxiuDefeatedRanks: [],
      killedDingChunqiu: false,
      kaifengCasesSolved: 0,
      kaifengMissedCount: 0,
      lastKaifengCasePeriod:
        targetSectId === 'SECT-17' ? prevPeriodInfo.latestPeriod : 0,
      kaifengRank2Day: targetSectId === 'SECT-17' && evalRes.startingRank >= 2 ? s.dayCount : null,
      activeKaifengWarrant: null,
      shaolinNoviceState:
        targetSectId === 'SECT-01' ? 'completed' : s.sectState.shaolinNoviceState,
      shaolinChoreDays:
        targetSectId === 'SECT-01' ? SHAOLIN_CHORE_TARGET_DAYS : s.sectState.shaolinChoreDays,
      shaolinDiscipleType:
        targetSectId === 'SECT-01' || targetSectId === 'SECT-04'
          ? 'lay'
          : targetSectId === 'SECT-03'
            ? 'monk'
            : s.sectState.shaolinDiscipleType,
    }

    // 同步完结对应的入门剧情任务链（若曾开启）
    const nextQuest = cloneQuestRuntimeState(s.questState)
    const entryQuestBySect: Record<string, string> = {
      'SECT-01': SHAOLIN_ENTRY_QUEST_ID,
      'SECT-02': GAIBANG_ENTRY_QUEST_ID,
      'SECT-03': WUTAI_ENTRY_QUEST_ID,
      'SECT-04': NANSHAOLIN_ENTRY_QUEST_ID,
      'SECT-05': HUASHAN_ENTRY_QUEST_ID,
      'SECT-06': TAISHAN_ENTRY_QUEST_ID,
      'SECT-07': EMEI_ENTRY_QUEST_ID,
      'SECT-14': QINGCHENG_ENTRY_QUEST_ID,
      'SECT-15': TIEZHANG_ENTRY_QUEST_ID,
      'SECT-18': 'QST-SECT-18-TOUMINGZHUANG',
      'SECT-16': 'QST-SECT-16-REFERRAL',
      'SECT-23': 'QST-SECT-23-REFERRAL',
      'SECT-24': 'QST-SECT-24-REFERRAL',
    }
    const linkedQuestId = entryQuestBySect[targetSectId]
    if (
      linkedQuestId &&
      (nextQuest.activeQuests[linkedQuestId] ||
        targetSectId === 'SECT-18' ||
        targetSectId === 'SECT-01' ||
        targetSectId === 'SECT-02' ||
        targetSectId === 'SECT-03' ||
        targetSectId === 'SECT-04' ||
        targetSectId === 'SECT-05' ||
        targetSectId === 'SECT-06' ||
        targetSectId === 'SECT-07' ||
        targetSectId === 'SECT-14' ||
        targetSectId === 'SECT-15')
    ) {
      delete nextQuest.activeQuests[linkedQuestId]
      const prevComp = nextQuest.completedQuests[linkedQuestId]
      nextQuest.completedQuests[linkedQuestId] = {
        questId: linkedQuestId,
        outcome: 'joined',
        completedDay: s.dayCount,
        count: (prevComp?.count ?? 0) + 1,
      }
    }

    const newLogs: LogEntry[] = []
    let feedbackMsg = `正式拜入【${faction.name}】，授职【${evalRes.startingRankLabel}】${
      targetSectId === 'SECT-01'
        ? '（俗家弟子）'
        : targetSectId === 'SECT-03'
          ? '（出家僧众）'
          : targetSectId === 'SECT-04'
            ? '（护寺俗家）'
            : ''
    }！`
    if (evalRes.costSilver > 0) {
      feedbackMsg += `（奉上拜师束脩 ${evalRes.costSilver} 两纹银）`
    }
    if (evalRes.consumeItemId && ITEM_DB_MAP[evalRes.consumeItemId]) {
      feedbackMsg += `（呈交《${ITEM_DB_MAP[evalRes.consumeItemId]!.name}》）`
    }
    if (evalRes.allowOfficialTransferFromChangshan) {
      const originName = s.sectState.sectId
        ? (FACTION_DB_MAP[s.sectState.sectId]?.name ?? s.sectState.sectId)
        : '原门派'
      const letterName =
        (evalRes.consumeItemId && ITEM_DB_MAP[evalRes.consumeItemId]?.name) || '举荐公函'
      feedbackMsg = `由【${originName}】呈验《${letterName}》，正式奉调入职【${faction.name} · ${evalRes.startingRankLabel}】（正当保举调任）！`
    }

    // 常山枪派：无年龄限制，入门即领军饷 15 两，入门满一年后每年2月1日和8月1日自动派发半年任务
    if (targetSectId === 'SECT-22') {
      const stipendAmt = getChangshanMonthlyStipend(nextSect.rank)
      nextSilver += stipendAmt
      feedbackMsg += ` 入门即支领首月边军饷银 +${stipendAmt} 两（此后每满一月领 ${stipendAmt} 两），入门满一年后，每年2月1日、8月1日自动派发半年军令（限两个月内完成）。`
    }

    if (targetSectId === 'SECT-17') {
      const stipendAmt = getKaifengMonthlyStipend(nextSect.rank)
      feedbackMsg += ` 每满一月可支领官俸 ${stipendAmt} 两纹银；每年2月1日、8月1日自动派发六扇门公案（限两个月内结案），并可随时领取公文办案升迁。`
      if (
        nextSect.rank < 4 &&
        !nextSect.activeKaifengWarrant &&
        curPeriodInfo.latestPeriod > nextSect.lastKaifengCasePeriod
      ) {
        nextSect.lastKaifengCasePeriod = curPeriodInfo.latestPeriod
        const deadlineDay = curPeriodInfo.latestDispatchDay + SEMI_ANNUAL_DEADLINE_DAYS
        const warrant = generateKaifengWarrant(curPeriodInfo.latestDispatchDay, nextSect.rank, {
          deadlineDay,
        })
        if (warrant) {
          nextSect.activeKaifengWarrant = warrant
          const caseMsg = `【六扇门半年公案】奉命前往【${warrant.regionName} · ${warrant.buildingName}】办理「${warrant.targetName}」，须于第 ${deadlineDay} 日前结案！`
          feedbackMsg += ` ${caseMsg}`
          newLogs.push(createLogEntry(s.dayCount, '六扇门派案', caseMsg, true, s.shichenIdx))
        }
      }
    }

    const entryGiftIds = SECT_ENTRY_GEAR_GIFTS[targetSectId] ?? []
    const grantedGiftNames: string[] = []
    for (const gid of entryGiftIds) {
      const def = ITEM_DB_MAP[gid]
      if (def) {
        nextInv = addItemToInventory(nextInv, gid, 1)
        grantedGiftNames.push(`【${def.name}】`)
      }
    }
    if (grantedGiftNames.length > 0) {
      feedbackMsg += ` 入门获赐制式披挂：${grantedGiftNames.join('、')}！`
    }

    newLogs.push(
      createLogEntry(
        s.dayCount,
        '拜入宗门',
        `${mentorNpc ? `经【${mentorNpc.name}】引见，` : ''}${feedbackMsg}`,
        true,
        s.shichenIdx,
      ),
    )

    set({
      silver: nextSilver,
      inventory: nextInv,
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: feedbackMsg, tone: 'success' },
      logs: [...newLogs, ...s.logs].slice(0, 60),
    })
  },

  leaveSect: () => {
    const s = get()
    const curSectId = s.sectState.sectId
    if (!curSectId) return
    const factionName = FACTION_DB_MAP[curSectId]?.name ?? curSectId

    if (curSectId === 'SECT-22') {
      const { nextFavor, affectedCount } = applySongLiaoSuspicionFavorPenalty(s.npcFavor, 30)
      const nextSect: PlayerSectState = {
        ...clonePlayerSectState(s.sectState),
        sectId: null,
        rank: 1,
        rankLabel: '无门无派',
        contribution: 0,
        activeLiaoSpy: null,
        activeSectTask: null,
        activeKaifengWarrant: null,
        kaifengRank2Day: null,
        liaoSuspicionDebuff: true,
      }
      const nextQuest = cloneQuestRuntimeState(s.questState)
      nextQuest.flags.liao_suspicion_debuff = true
      const msg = `少侠主动退出【${factionName}】，因擅离河北抗辽军伍，背上【通辽嫌疑】恶名！所有大宋朝野与武林人物（共 ${affectedCount} 人）对少侠好感度 -30！`
      set({
        sectState: nextSect,
        questState: nextQuest,
        npcFavor: nextFavor,
        actionFeedback: { text: msg, tone: 'warn' },
        logs: [
          createLogEntry(s.dayCount, '通辽恶名', msg, true, s.shichenIdx),
          ...s.logs,
        ].slice(0, 60),
      })
      return
    }

    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      sectId: null,
      rank: 1,
      rankLabel: '无门无派',
      contribution: 0,
      activeSectTask: null,
      wonSectTournament: false,
      activeSectTournament: null,
      xingxiuDefeatedRanks: [],
      killedDingChunqiu: false,
      kaifengRank2Day: null,
      activeKaifengWarrant: null,
      shaolinDiscipleType:
        curSectId === 'SECT-01' || curSectId === 'SECT-03' || curSectId === 'SECT-04'
          ? 'lay'
          : s.sectState.shaolinDiscipleType,
    }
    const msg =
      curSectId === 'SECT-33'
        ? `少侠已向枢密院与三衙缴回虎符腰牌，正式辞去【${factionName} · ${s.sectState.rankLabel}】军职，恢复自由游侠之身。`
        : `少侠已向【${factionName}】缴回腰牌，正式脱离门墙，恢复自由游侠之身。`
    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'talk' },
      logs: [
        createLogEntry(s.dayCount, '脱离门派', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acceptToumingzhuang: (npc) => {
    const s = get()
    if (s.sectState.toumingzhuangState === 'completed') {
      set({
        actionFeedback: {
          text: '少侠已纳过投名状，可直接拜入【太行/京东绿林盟】！',
          tone: 'success',
        },
      })
      return
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      toumingzhuangState: 'accepted',
    }
    const nextQuest = cloneQuestRuntimeState(s.questState)
    nextQuest.flags.toumingzhuang_state = 'accepted'
    if (!nextQuest.activeQuests['QST-SECT-18-TOUMINGZHUANG']) {
      nextQuest.activeQuests['QST-SECT-18-TOUMINGZHUANG'] = {
        questId: 'QST-SECT-18-TOUMINGZHUANG',
        stepId: 'rob_official',
        startedDay: s.dayCount,
        deadlineDay: null,
        vars: {},
      }
    }
    const msg = `已向${npc ? `【${npc.name}】` : '绿林盟'}立誓领受【纳投名状】任务！请前往外州府寻任一大宋官员发起【劫道纳投名状（生死战）】（切记：得手后将入大宋官府黑名单，踏入开封府会被展昭挑战处斩！）。`
    set({
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: msg, tone: 'warn' },
      logs: [
        createLogEntry(s.dayCount, '纳投名状', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  promoteSectRank: () => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId) return
    const heroRealm = estimateHeroRealm(s.maxHp, s.maxMp)
    const hasTournamentToken = s.inventory.some(
      (st) => st.itemId === SECT_TOURNAMENT_TOKEN_ITEM_ID && st.qty > 0,
    )
    const promo = evaluateSectPromotion({
      sectId,
      currentRank: s.sectState.rank,
      dayCount: s.dayCount,
      joinedDay: s.sectState.joinedDay,
      heroRealmRank: heroRealm.rank,
      heroRealmLabel: heroRealm.label,
      npcFavor: s.npcFavor,
      wonSectTournament: s.sectState.wonSectTournament,
      hasTournamentToken,
      skills: s.skills,
      xingxiuDefeatedRanks: s.sectState.xingxiuDefeatedRanks,
      killedDingChunqiu: s.sectState.killedDingChunqiu,
      kaifengCasesSolved: s.sectState.kaifengCasesSolved,
      kaifengRank2Day: s.sectState.kaifengRank2Day,
      kaifengMurongQuest1Done: Boolean(s.questState.completedQuests['QST-SECT-17-MURONG-1']),
      kaifengMurongQuest2Done: Boolean(s.questState.completedQuests['QST-SECT-17-MURONG-2']),
    })
    if (!promo) {
      set({
        actionFeedback: {
          text:
            s.sectState.rank >= 5
              ? '少侠已位列本门最高掌门尊位！'
              : '已达常规晋升最高阶（第4阶），不可通过常规晋升成为门派掌门！',
          tone: 'warn',
        },
      })
      return
    }
    if (!promo.canPromote) {
      set({
        actionFeedback: { text: promo.reason, tone: 'warn' },
      })
      return
    }

    const factionName = FACTION_DB_MAP[sectId]?.name ?? sectId
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      rank: promo.targetRank,
      rankLabel: promo.targetRankLabel,
      kaifengCasesSolved: sectId === 'SECT-17' ? 0 : s.sectState.kaifengCasesSolved,
      kaifengRank2Day:
        sectId === 'SECT-17' && promo.targetRank === 2
          ? s.dayCount
          : s.sectState.kaifengRank2Day,
    }
    let msg = `功勋与资历俱备！少侠于【${factionName}】正式晋升为第 ${promo.targetRank} 阶【${promo.targetRankLabel}】！`
    if (sectId === 'SECT-17') {
      msg +=
        promo.targetRank >= 4
          ? ' 办案累计数已清零，晋升【金牌总捕】后不再派发常规案件！'
          : ' 办案累计数已清零，后续将按新职阶派发相应案件。'
    }
    if (sectId === 'SECT-22' && promo.targetRank === 3) {
      msg += ' 已达【演武教习】职阶，现可向掌门或首座领取《开封府推荐信》！'
    }

    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '门派晋升', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  startSectTournament: () => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId || !isDaoSwordSect(sectId)) {
      set({
        actionFeedback: { text: '仅道门与名山剑派弟子可参加本门宗门大比！', tone: 'warn' },
      })
      return
    }
    if (s.sectState.activeSectTournament) {
      get().continueSectTournamentRound()
      return
    }
    const { yearIndex, isTournamentDay } = getSectTournamentDateInfo(s.dayCount)
    if (!isTournamentDay) {
      set({
        actionFeedback: {
          text: '宗门大比定于每年【二月一日】举行，今日非大比之期！',
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.lastTournamentYear >= yearIndex) {
      set({
        actionFeedback: { text: '少侠本年度已参加过宗门大比，请待来年二月一日！', tone: 'warn' },
      })
      return
    }
    const heroRealm = estimateHeroRealm(s.maxHp, s.maxMp)
    if (heroRealm.rank < 1 || heroRealm.rank > 6) {
      set({
        actionFeedback: {
          text: `宗门大比限三流或二流境界弟子报名（当前境界【${heroRealm.label}】）。`,
          tone: 'warn',
        },
      })
      return
    }
    const tourney = generateSectTournament(sectId, yearIndex)
    if (!tourney) return

    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      lastTournamentYear: yearIndex,
      activeSectTournament: tourney,
    }
    const firstOpp = tourney.opponents[0]!
    const oppNode = buildNodeNpcFromTournamentOpponent(sectId, firstOpp, 1)
    const msg = `报名参加【${tourney.sectName}】第 ${yearIndex} 届宗门大比！八强战首轮迎战同门【${firstOpp.name}（${firstOpp.realm}）】！`
    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '宗门大比', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
    get().startNpcCombat(oppNode, 'spar', 'sect_tournament', true)
  },

  continueSectTournamentRound: () => {
    const s = get()
    const tourney = s.sectState.activeSectTournament
    if (!tourney) return
    const opp = tourney.opponents[tourney.round - 1]
    if (!opp) return
    const oppNode = buildNodeNpcFromTournamentOpponent(tourney.sectId, opp, tourney.round)
    get().startNpcCombat(oppNode, 'spar', 'sect_tournament', true)
  },

  acceptSectTask: () => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId || !canReceiveSectLeaderTask(sectId)) {
      set({
        actionFeedback: { text: '除开封府/六扇门外，各武林门派皆可向掌门领取宗门任务！', tone: 'warn' },
      })
      return
    }
    if (s.sectState.activeSectTask) {
      set({
        actionFeedback: {
          text: `少侠尚有未完成的宗门任务【${s.sectState.activeSectTask.title}】，请先完成或放弃！`,
          tone: 'warn',
        },
      })
      return
    }
    const leaderNpcId = getSectLeaderNpcId(sectId)
    if (!leaderNpcId) {
      set({
        actionFeedback: { text: '本门掌门暂未现身，无法指派宗门任务。', tone: 'warn' },
      })
      return
    }
    const heroRealm = estimateHeroRealm(s.maxHp, s.maxMp)
    const task = generateMinorSectTask({
      sectId,
      dayCount: s.dayCount,
      heroRealmRank: heroRealm.rank,
      leaderNpcId,
    })
    if (!task) {
      set({
        actionFeedback: { text: '掌门沉吟片刻，今日暂无紧要差遣。', tone: 'warn' },
      })
      return
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeSectTask: task,
    }
    const msg = `接取宗门任务【${task.title}】：${task.summary}`
    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '宗门任务', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  abandonSectTask: () => {
    const s = get()
    const task = s.sectState.activeSectTask
    if (!task) return
    const curFavor = s.npcFavor[task.leaderNpcId] ?? INITIAL_NPC_FAVOR
    const nextFavorVal = Math.max(MIN_NPC_FAVOR, curFavor - 5)
    const nextFavor = {
      ...s.npcFavor,
      [task.leaderNpcId]: nextFavorVal,
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeSectTask: null,
    }
    const msg = `少侠放弃了宗门任务【${task.title}】，掌门【${task.leaderName}】略有失望（好感度 -5，现 ${nextFavorVal}）。`
    set({
      sectState: nextSect,
      npcFavor: nextFavor,
      actionFeedback: { text: msg, tone: 'warn' },
      logs: [
        createLogEntry(s.dayCount, '放弃差遣', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  acceptKaifengWarrant: () => {
    const s = get()
    if (s.sectState.sectId !== 'SECT-17') {
      set({
        actionFeedback: { text: '仅开封府 / 六扇门捕快可领取六扇门案卷！', tone: 'warn' },
      })
      return
    }
    if (s.sectState.rank >= 4) {
      set({
        actionFeedback: {
          text: '少侠已升任第4阶【金牌总捕】，府衙不再派发常规案件！',
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.activeKaifengWarrant) {
      set({
        actionFeedback: {
          text: `少侠尚有在身公案【${s.sectState.activeKaifengWarrant.targetName}】，请先办理结案！`,
          tone: 'warn',
        },
      })
      return
    }
    const warrant = generateKaifengWarrant(s.dayCount, s.sectState.rank)
    if (!warrant) {
      set({
        actionFeedback: { text: '近日四方安靖，府衙暂无新增案卷。', tone: 'warn' },
      })
      return
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeKaifengWarrant: warrant,
    }
    const msg =
      warrant.kind === 'investigate'
        ? `领取六扇门侦查案卷：【${warrant.targetName}（${warrant.targetTitle}）】！请前往【${warrant.regionName} · ${warrant.buildingName}】寻访【${warrant.clueNpcName ?? '知情人士'}】调查情报线索。`
        : `领取开封府海捕公文：缉拿【${warrant.targetName}（${warrant.targetTitle} · ${warrant.realm}）】！据报此犯潜匿于【${warrant.regionName} · ${warrant.buildingName}】。`
    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '六扇门案卷', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  abandonKaifengWarrant: () => {
    const s = get()
    const w = s.sectState.activeKaifengWarrant
    if (!w) return
    if (w.deadlineDay) {
      set({
        actionFeedback: {
          text: `【${w.targetName}】乃六扇门半年度强制派发公案，不可擅自退回！须于第 ${w.deadlineDay} 日前办结。`,
          tone: 'warn',
        },
      })
      return
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeKaifengWarrant: null,
    }
    const msg = `少侠已退回【${w.targetName}】的案卷，暂不计过，可随时重领新案。`
    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'warn' },
      logs: [
        createLogEntry(s.dayCount, '退回案卷', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  completeKaifengInvestigation: () => {
    const s = get()
    const w = s.sectState.activeKaifengWarrant
    if (s.sectState.sectId !== 'SECT-17' || !w || w.kind !== 'investigate') return
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeKaifengWarrant: null,
      kaifengCasesSolved: s.sectState.kaifengCasesSolved + 1,
      kaifengMissedCount: w.deadlineDay ? 0 : s.sectState.kaifengMissedCount,
    }
    const nextSilver = s.silver + 15
    const msg = `查明六扇门案卷【${w.targetName}】：${w.clueDetail ?? '已取得关键口供与物证！'}（当前阶位办案量 +1，累计 ${nextSect.kaifengCasesSolved} 次；赏银 +15 两）`
    set({
      sectState: nextSect,
      silver: nextSilver,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '案情查明', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  completeSectTaskStep: () => {
    const s = get()
    const task = s.sectState.activeSectTask
    if (!task || task.completedStep) return
    if (task.kind !== 'deliver_letter' && task.kind !== 'gather_intel') return

    const updatedTask = { ...task, completedStep: true }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeSectTask: updatedTask,
    }

    let msg = ''
    if (task.kind === 'deliver_letter') {
      msg = `已将掌门【${task.leaderName}】的师门密信亲手交予【${task.targetNpcName}】！请速回【${task.sectName}】向掌门复命交差。`
    } else {
      msg = `自【${task.tempNpcName}】处探得情报「${task.intelTitle}」：${task.intelText} 请回【${task.sectName}】向掌门【${task.leaderName}】复命！`
    }

    set({
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '宗门任务', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  turnInSectTask: () => {
    const s = get()
    const task = s.sectState.activeSectTask
    if (!task) return
    if (!task.completedStep) {
      set({
        actionFeedback: { text: '该宗门任务尚未达成目标，尚不可向掌门交差！', tone: 'warn' },
      })
      return
    }
    const curFavor = s.npcFavor[task.leaderNpcId] ?? INITIAL_NPC_FAVOR
    const nextFavorVal = Math.min(MAX_NPC_FAVOR, curFavor + 10)
    const nextFavor = {
      ...s.npcFavor,
      [task.leaderNpcId]: nextFavorVal,
    }
    const nextSect: PlayerSectState = {
      ...clonePlayerSectState(s.sectState),
      activeSectTask: null,
    }
    const msg = `向掌门【${task.leaderName}】圆满交差【${task.title}】！掌门甚为嘉许（好感度 +10，现 ${nextFavorVal}）。`
    set({
      sectState: nextSect,
      npcFavor: nextFavor,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '宗门交差', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  bribeForReferral: (npc) => {
    const s = get()
    const curSectId = s.sectState.sectId
    if (!curSectId) return
    const refCfg = REFERRAL_BRIBE_BY_SOURCE_SECT[curSectId]
    if (!refCfg) return

    const dbNpc = (npc.id && NPC_DB_MAP[npc.id]) || resolveNpcByName(npc.name)
    const npcFaction = npc.factionId ?? dbNpc?.factionId
    const npcRank = npc.sectRank ?? dbNpc?.sectRank ?? 1

    if (npcFaction !== curSectId || npcRank !== 4) {
      set({
        actionFeedback: {
          text: `须向本门第4阶【${refCfg.elderTitleHint}】奉银求取《${refCfg.itemName}》！`,
          tone: 'warn',
        },
      })
      return
    }
    if (s.sectState.rank < 2) {
      set({
        actionFeedback: {
          text: `须先晋升为本门第2阶内门（当前为【${s.sectState.rankLabel}】），方有资格向${refCfg.elderTitleHint}贿赂求取《${refCfg.itemName}》！`,
          tone: 'warn',
        },
      })
      return
    }
    if (s.inventory.some((st) => st.itemId === refCfg.itemId && st.qty > 0)) {
      set({
        actionFeedback: {
          text: `少侠行囊中已持有《${refCfg.itemName}》，脱离本门后即可前往拜入【${refCfg.targetSectName}】！`,
          tone: 'talk',
        },
      })
      return
    }
    if (s.silver < refCfg.costSilver) {
      set({
        actionFeedback: {
          text: `贿赂${refCfg.elderTitleHint}需纹银 ${refCfg.costSilver} 两（当前 ${s.silver} 两）！`,
          tone: 'warn',
        },
      })
      return
    }

    const nextInv = addItemToInventory(s.inventory, refCfg.itemId, 1)
    const nextSect = clonePlayerSectState(s.sectState)
    if (!nextSect.bribedReferralSects.includes(refCfg.targetSectId)) {
      nextSect.bribedReferralSects.push(refCfg.targetSectId)
    }

    const nextQuest = cloneQuestRuntimeState(s.questState)
    const referralQuestStepMap: Record<string, { questId: string; stepId: string }> = {
      'SECT-16': { questId: 'QST-SECT-16-REFERRAL', stepId: 'join_caobang' },
      'SECT-23': { questId: 'QST-SECT-23-REFERRAL', stepId: 'join_baji' },
      'SECT-24': { questId: 'QST-SECT-24-REFERRAL', stepId: 'join_zhenyuan' },
    }
    const rq = referralQuestStepMap[refCfg.targetSectId]
    if (rq && !nextQuest.completedQuests[rq.questId]) {
      const prev = nextQuest.activeQuests[rq.questId]
      nextQuest.activeQuests[rq.questId] = {
        questId: rq.questId,
        stepId: rq.stepId,
        startedDay: prev?.startedDay ?? s.dayCount,
        deadlineDay: prev?.deadlineDay ?? null,
        vars: prev?.vars ?? {},
      }
    }

    const msg = `暗中奉上 ${refCfg.costSilver} 两纹银，【${npc.name}】捻须笑纳，修书一封授少侠《${refCfg.itemName}》！持此帖脱离本门后即可拜入二流名门【${refCfg.targetSectName}】！`

    set({
      silver: s.silver - refCfg.costSilver,
      inventory: nextInv,
      sectState: nextSect,
      questState: nextQuest,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '暗通关节', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  claimKaifengRecommendation: (npc) => {
    const s = get()
    if (s.sectState.sectId !== 'SECT-22') return
    if (s.sectState.rank < 3) {
      set({
        actionFeedback: {
          text: `须在【常山枪派】晋升至第3阶【演武教习】（当前为【${s.sectState.rankLabel}】），方可获授《开封府推荐信》！`,
          tone: 'warn',
        },
      })
      return
    }
    if (
      s.sectState.claimedKaifengLetter ||
      s.inventory.some((st) => st.itemId === KAIFENG_RECOMMENDATION_ITEM_ID && st.qty > 0)
    ) {
      set({
        actionFeedback: {
          text: '少侠已领受过《开封府推荐信》，可赴东京开封府呈交包龙图或展护卫调任入府！',
          tone: 'talk',
        },
      })
      return
    }

    const nextInv = addItemToInventory(s.inventory, KAIFENG_RECOMMENDATION_ITEM_ID, 1)
    const nextSect = clonePlayerSectState(s.sectState)
    nextSect.claimedKaifengLetter = true
    const msg = `${npc ? `【${npc.name}】` : '常山枪派掌门'}嘉许少侠边关抗辽军功，亲颁河北都部署《开封府推荐信》一封！持信赴东京开封府即可正当调任入职，不沾叛军通辽之嫌！`

    set({
      inventory: nextInv,
      sectState: nextSect,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '荣膺军荐', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },

  learnSectMartialArt: (artId) => {
    const s = get()
    const sectId = s.sectState.sectId
    if (!sectId) return

    if (s.learnedArts.some((e) => e.artId === artId)) {
      const art = MARTIAL_ART_DB_MAP[artId]
      set({
        actionFeedback: {
          text: `少侠已习得《${art?.cleanName ?? artId}》，请赴【披挂与武学】演武提升火候！`,
          tone: 'talk',
        },
      })
      return
    }

    const teachList = getSectTeachableArts(sectId)
    const entry = teachList.find((x) => x.art.id === artId)
    if (!entry) {
      set({
        actionFeedback: { text: '此武学非本门可传授之列。', tone: 'warn' },
      })
      return
    }

    if (!canPlayerLearnSectArt(s.sectState.rank, entry.requiredRank)) {
      set({
        actionFeedback: {
          text: `职阶不足！《${entry.art.cleanName}》（${entry.art.fullTier}）需本门【${entry.requiredRankLabel}】方可修习（当前为【${s.sectState.rankLabel}】）。`,
          tone: 'warn',
        },
      })
      return
    }

    if (
      isShaolinArtBlockedForLayDisciple(sectId, entry.art, s.sectState.shaolinDiscipleType)
    ) {
      const warnText =
        sectId === 'SECT-04'
          ? `南少林祖训：少侠入门时已择定【带发入世 · 护寺俗家】名册，不可再行剃度，本门地阶秘传功法《${entry.art.cleanName}》（${entry.art.fullTier}）对少侠永远不开放！`
          : `少林清规：地阶与天阶秘传绝学概不轻授俗家弟子！《${entry.art.cleanName}》（${entry.art.fullTier}）须先赴【大雄宝殿方丈院 · 大雄正殿】拜见方丈【玄慈】剃度出家（受法号「慧见」）后方可修习。`
      set({
        actionFeedback: {
          text: warnText,
          tone: 'warn',
        },
      })
      return
    }

    const nextLearned: LearnedArtEntry[] = [
      ...s.learnedArts.map((x) => ({ ...x })),
      { artId: entry.art.id, level: 1, exp: 0 },
    ]
    const sharedTag = entry.isSharedFromShaolin ? '（南北少林同源共传）' : ''
    const msg = `蒙师门传授，正式习得${entry.art.fullTier}${entry.art.category}《${entry.art.cleanName}》第 1 重入门${sharedTag}！`

    set({
      learnedArts: nextLearned,
      actionFeedback: { text: msg, tone: 'success' },
      logs: [
        createLogEntry(s.dayCount, '师门传功', msg, true, s.shichenIdx),
        ...s.logs,
      ].slice(0, 60),
    })
  },
})
