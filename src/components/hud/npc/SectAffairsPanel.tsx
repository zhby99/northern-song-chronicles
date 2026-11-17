import { FACTION_DB_MAP } from '../../../data/gameDb'
import type { getAvailableNpcQuestActions } from '../../../engine/questEngine'
import { useGameStore } from '../../../store/useGameStore'
import type { CompiledNpcRecord, NodeNpc } from '../../../types/game'
import { estimateHeroRealm } from '../../../engine/stats/realmUtils'
import {
  evaluateSectEntry,
  evaluateSectPromotion,
  getSectContactNpcId,
  SECT_TOURNAMENT_TOKEN_ITEM_ID,
  SHAOLIN_CHORE_TARGET_DAYS,
} from '../../../engine/sect'
import { SectEntryWidget } from './SectEntryWidget'
import { SectPromotionAndRulesWidget } from './SectPromotionAndRulesWidget'
import { SectTasksAndBountiesWidget } from './SectTasksAndBountiesWidget'
import { SectTeachArtsWidget } from './SectTeachArtsWidget'

type AvailableNpcQuestAction = ReturnType<typeof getAvailableNpcQuestActions>[number]

interface SectAffairsPanelProps {
  npc: NodeNpc
  dbRecord: CompiledNpcRecord | undefined
  targetFactionId: string
  factionName: string
  npcSectRank?: number
  sectPanelQuestActions: AvailableNpcQuestAction[]
  onCloseSubPanel: () => void
}

export function SectAffairsPanel({
  npc,
  dbRecord,
  targetFactionId,
  factionName,
  npcSectRank,
  sectPanelQuestActions,
  onCloseSubPanel,
}: SectAffairsPanelProps) {
  const dayCount = useGameStore((s) => s.dayCount)
  const silver = useGameStore((s) => s.silver)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const baseStats = useGameStore((s) => s.baseStats)
  const skills = useGameStore((s) => s.skills)
  const inventory = useGameStore((s) => s.inventory)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const playerName = useGameStore((s) => s.playerName)
  const sectState = useGameStore((s) => s.sectState)
  const deadNpcIds = useGameStore((s) => s.deadNpcIds)
  const questState = useGameStore((s) => s.questState)
  const npcFavorMap = useGameStore((s) => s.npcFavor)

  const joinSect = useGameStore((s) => s.joinSect)
  const leaveSect = useGameStore((s) => s.leaveSect)
  const acceptToumingzhuang = useGameStore((s) => s.acceptToumingzhuang)
  const promoteSectRank = useGameStore((s) => s.promoteSectRank)
  const acceptSectTask = useGameStore((s) => s.acceptSectTask)
  const abandonSectTask = useGameStore((s) => s.abandonSectTask)
  const acceptKaifengWarrant = useGameStore((s) => s.acceptKaifengWarrant)
  const abandonKaifengWarrant = useGameStore((s) => s.abandonKaifengWarrant)
  const turnInSectTask = useGameStore((s) => s.turnInSectTask)
  const startSectTournament = useGameStore((s) => s.startSectTournament)
  const continueSectTournamentRound = useGameStore((s) => s.continueSectTournamentRound)
  const bribeForReferral = useGameStore((s) => s.bribeForReferral)
  const claimKaifengRecommendation = useGameStore((s) => s.claimKaifengRecommendation)
  const learnSectMartialArt = useGameStore((s) => s.learnSectMartialArt)
  const runQuestEffects = useGameStore((s) => s.runQuestEffects)

  const factionMeta = FACTION_DB_MAP[targetFactionId]
  const sectDisplayName = factionMeta?.name ?? factionName
  const isPlayerInThisSect = sectState.sectId === targetFactionId

  const entryEval = !isPlayerInThisSect
    ? evaluateSectEntry({
        targetSectId: targetFactionId,
        sectState,
        silver,
        baseStats,
        inventory,
      })
    : null

  const heroRealm = estimateHeroRealm(maxHp, maxMp)
  const hasTournamentToken = inventory.some(
    (st) => st.itemId === SECT_TOURNAMENT_TOKEN_ITEM_ID && st.qty > 0,
  )
  const promoEval = isPlayerInThisSect
    ? evaluateSectPromotion({
        sectId: targetFactionId,
        currentRank: sectState.rank,
        dayCount,
        joinedDay: sectState.joinedDay,
        heroRealmRank: heroRealm.rank,
        heroRealmLabel: heroRealm.label,
        npcFavor: npcFavorMap,
        wonSectTournament: sectState.wonSectTournament,
        hasTournamentToken,
        skills,
        xingxiuDefeatedRanks: sectState.xingxiuDefeatedRanks,
        killedDingChunqiu: sectState.killedDingChunqiu,
        kaifengCasesSolved: sectState.kaifengCasesSolved,
        kaifengRank2Day: sectState.kaifengRank2Day,
        kaifengMurongQuest1Done: Boolean(questState.completedQuests['QST-SECT-17-MURONG-1']),
        kaifengMurongQuest2Done: Boolean(questState.completedQuests['QST-SECT-17-MURONG-2']),
      })
    : null

  const resolvedNpcId = npc.id ?? dbRecord?.id
  const isSectLeaderNpc = Boolean(
    isPlayerInThisSect &&
      resolvedNpcId &&
      resolvedNpcId === getSectContactNpcId(targetFactionId, deadNpcIds),
  )

  return (
    <div className="relative z-20 w-[min(94vw,980px)] lg:self-end lg:mr-8 max-h-[78vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
      <div className="px-5 py-3 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-lg sm:text-xl font-bold song-serif">
            【{sectDisplayName}】门派枢机
          </span>
          {factionMeta?.sectTier && (
            <span className="text-xs px-2 py-0.5 rounded bg-[#781710] text-[#fff3df] font-medium">
              {factionMeta.sectTier}
            </span>
          )}
          {isPlayerInThisSect ? (
            <>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#1f4d3b] text-[#e7f7ef] font-medium">
                本门职阶：第{sectState.rank}阶【{sectState.rankLabel}】 · 功绩{' '}
                {sectState.contribution}
              </span>
              {(targetFactionId === 'SECT-01' || targetFactionId === 'SECT-04') && (
                <span className="text-xs px-2 py-0.5 rounded bg-[#6b4614] text-[#fff6e0] font-medium">
                  {sectState.shaolinDiscipleType === 'monk'
                    ? `${targetFactionId === 'SECT-04' ? '清修武僧' : '出家僧众'} · 法号【${playerName}】`
                    : targetFactionId === 'SECT-04'
                      ? '护寺俗家'
                      : '俗家弟子'}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs px-2.5 py-0.5 rounded bg-[#5c3d1e] text-[#fde8c8]">
              当前门派：
              {sectState.sectId
                ? `${FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId}（${sectState.rankLabel}）`
                : sectState.shaolinNoviceState === 'active'
                  ? `少林杂役弟子（${sectState.shaolinChoreDays}/${SHAOLIN_CHORE_TARGET_DAYS}天 · 非正式门籍）`
                  : '无门无派'}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onCloseSubPanel}
          className="text-xs sm:text-sm px-3 py-1 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
        >
          收起
        </button>
      </div>

      <div className="p-4 sm:p-5 overflow-y-auto scroll-thin space-y-4 text-xs sm:text-sm text-[#2d1e10]">
        {/* 五级门派职阶总览 */}
        {factionMeta?.rankTitles && factionMeta.rankTitles.length >= 5 && (
          <div className="px-3.5 py-2 rounded bg-[#efe4cc] border border-[#cbb693] flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-[#5c3d1e] mr-1">五阶尊卑制度：</span>
            {factionMeta.rankTitles.map((rTitle, idx) => {
              const rLv = idx + 1
              const isCur = isPlayerInThisSect && sectState.rank === rLv
              const isDisabledOuter =
                rLv === 1 && factionMeta.acceptsOuterDisciple === false
              return (
                <span
                  key={rLv}
                  className={`px-2 py-0.5 rounded border ${
                    isCur
                      ? 'bg-[#781710] border-[#781710] text-[#fff8ee] font-bold'
                      : isDisabledOuter
                        ? 'bg-[#e6decb] border-[#cbb693] text-[#8c7b65] line-through'
                        : 'bg-[#faf3e3] border-[#dcc9a7] text-[#3d2814]'
                  }`}
                >
                  Lv.{rLv} {rTitle}
                  {rLv === 3 || rLv === 4 ? '（同权）' : ''}
                </span>
              )
            })}
          </div>
        )}

        {/* 声明式门派试炼 / 入门剧情链入口 */}
        {sectPanelQuestActions.length > 0 && (
          <div className="p-3.5 rounded-lg bg-[#f6e8cc] border-2 border-[#b58742] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold song-serif text-sm text-[#781710]">
                ★ 宗门试炼与专属剧情 ({sectPanelQuestActions.length})
              </span>
              <span className="text-[11px] text-[#6b5235]">门派任务链</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {sectPanelQuestActions.map((qa) => {
                const toneCls =
                  qa.action.tone === 'danger'
                    ? 'bg-[#8f1d14] hover:bg-[#a9251b] border-[#e69d8f] text-[#fff8ee]'
                    : qa.action.tone === 'jade'
                      ? 'bg-[#1f4d3b] hover:bg-[#27614a] border-[#8fc7ae] text-[#fff8ee]'
                      : qa.action.tone === 'gold'
                        ? 'bg-[#6b4614] hover:bg-[#825518] border-[#e6c27a] text-[#fff8ee]'
                        : 'bg-[#5c3d1e] hover:bg-[#734c26] border-[#cbb693] text-[#fff8ee]'
                return (
                  <div key={`${qa.quest.id}:${qa.action.id}`} className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={!qa.enabled}
                      onClick={() => {
                        if (!qa.enabled) return
                        onCloseSubPanel()
                        runQuestEffects(qa.action.effects, {
                          ...npc,
                          id: npc.id ?? dbRecord?.id,
                          factionId: targetFactionId,
                          sectRank: npcSectRank,
                        })
                      }}
                      className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm border shadow transition-colors flex items-center gap-2 ${
                        qa.enabled
                          ? `${toneCls} cursor-pointer`
                          : 'bg-[#8c7b65]/60 border-[#a89882] text-[#f7eedc] cursor-not-allowed'
                      }`}
                    >
                      <span>{qa.action.label}</span>
                      {qa.action.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-black/25 text-[10px] font-normal">
                          {qa.action.badge}
                        </span>
                      )}
                    </button>
                    {!qa.enabled && qa.disabledReason && (
                      <span className="text-[11px] text-[#8f1d14]">🔒 {qa.disabledReason}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 情况 A：尚未加入该门派 */}
        {!isPlayerInThisSect && entryEval && (
          <SectEntryWidget
            targetFactionId={targetFactionId}
            sectDisplayName={sectDisplayName}
            entryEval={entryEval}
            silver={silver}
            sectState={sectState}
            hasToumingzhuangQuestScene={sectPanelQuestActions.some(
              (x) => x.action.id === 'act_accept_toumingzhuang_scene',
            )}
            npc={npc}
            onJoinBlockedFeedback={() => joinSect(targetFactionId, npc)}
            onCloseSubPanel={onCloseSubPanel}
            onRunQuestEffects={runQuestEffects}
            onAcceptToumingzhuang={() => acceptToumingzhuang(npc)}
          />
        )}

        {/* 情况 B：已是本门弟子 */}
        {isPlayerInThisSect && (
          <div className="space-y-3">
            <SectPromotionAndRulesWidget
              targetFactionId={targetFactionId}
              isPlayerInThisSect={isPlayerInThisSect}
              sectState={sectState}
              playerName={playerName}
              dayCount={dayCount}
              heroRealmRank={heroRealm.rank}
              hasTournamentToken={hasTournamentToken}
              promoEval={promoEval}
              npc={npc}
              npcSectRank={npcSectRank}
              onPromoteSectRank={promoteSectRank}
              onCloseSubPanel={onCloseSubPanel}
              onStartTournament={startSectTournament}
              onContinueTournamentRound={continueSectTournamentRound}
              onBribeForReferral={bribeForReferral}
            />

            <SectTasksAndBountiesWidget
              targetFactionId={targetFactionId}
              sectState={sectState}
              dayCount={dayCount}
              inventory={inventory}
              npc={npc}
              isSectLeaderNpc={isSectLeaderNpc}
              onAcceptSectTask={acceptSectTask}
              onTurnInSectTask={turnInSectTask}
              onAbandonSectTask={abandonSectTask}
              onAcceptKaifengWarrant={acceptKaifengWarrant}
              onAbandonKaifengWarrant={abandonKaifengWarrant}
              onClaimKaifengRecommendation={claimKaifengRecommendation}
            />
          </div>
        )}

        <SectTeachArtsWidget
          targetFactionId={targetFactionId}
          isPlayerInThisSect={isPlayerInThisSect}
          sectState={sectState}
          learnedArts={learnedArts}
          onLearnArt={learnSectMartialArt}
          onLeaveSect={leaveSect}
        />
      </div>
    </div>
  )
}
