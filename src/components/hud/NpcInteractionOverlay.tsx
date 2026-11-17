import { isNpcDead } from '../../engine/social/npcDeath'
import { useMemo, useState } from 'react'
import { NPC_DB_MAP, resolveNpcByName } from '../../data/gameDb'
import { getEffectiveTalents } from '../../data/itemsDb'
import {
  BANQUET_TIERS,
  computeBanquetFavorGain,
  resolveNpcFavor,
} from '../../engine/economy'
import { getAvailableNpcQuestActions } from '../../engine/questEngine'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import { getNpcFavorProfile } from '../../engine/social/npcFavor'
import { inferTemplatePortrait } from '../../utils/portraitFallback'
import {
  getSectContactNpcId,
  getSectLeaderNpcId,
  isJoinableSectFaction,
  isSongOfficialForRobbery,
} from '../../engine/sect'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'
import { NpcGiftPanel } from './npc/NpcGiftPanel'
import { NpcStatsSheetPanel } from './npc/NpcStatsSheetPanel'
import { SectAffairsPanel } from './npc/SectAffairsPanel'

type SubPanelMode = 'none' | 'panel' | 'gift' | 'banquet' | 'sect'

export function NpcInteractionOverlay() {
  const npc = useGameStore((s) => s.activeNpcInteraction)
  const closeNpcInteraction = useGameStore((s) => s.closeNpcInteraction)
  const interactNpc = useGameStore((s) => s.interactNpc)
  const hostNpcBanquet = useGameStore((s) => s.hostNpcBanquet)
  const startNpcCombat = useGameStore((s) => s.startNpcCombat)
  const giftNpcItem = useGameStore((s) => s.giftNpcItem)
  const equipped = useGameStore((s) => s.equipped)
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const inventory = useGameStore((s) => s.inventory)
  const silver = useGameStore((s) => s.silver)
  const renown = useGameStore((s) => s.renown)
  const chivalry = useGameStore((s) => s.chivalry)
  const food = useGameStore((s) => s.food)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const ridingSkill = useGameStore((s) => s.ridingSkill)
  const baseStats = useGameStore((s) => s.baseStats)
  const skills = useGameStore((s) => s.skills)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const sectState = useGameStore((s) => s.sectState)
  const deadNpcIds = useGameStore((s) => s.deadNpcIds)
  const questState = useGameStore((s) => s.questState)
  const npcFavorMap = useGameStore((s) => s.npcFavor)
  const npcTalkedMonth = useGameStore((s) => s.npcTalkedMonth)
  const npcSparredMonth = useGameStore((s) => s.npcSparredMonth)
  const npcBanquetedMonth = useGameStore((s) => s.npcBanquetedMonth)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const completeKaifengInvestigation = useGameStore((s) => s.completeKaifengInvestigation)
  const completeSectTaskStep = useGameStore((s) => s.completeSectTaskStep)
  const runQuestEffects = useGameStore((s) => s.runQuestEffects)

  const [subPanel, setSubPanel] = useState<SubPanelMode>('none')
  const [dialogueText, setDialogueText] = useState<string | null>(null)

  const dbRecord = useMemo(() => {
    if (
      !npc ||
      npc.isDynamicLiaoSpy ||
      npc.isDynamicKaifengWarrant ||
      npc.dynamicQuestActorId
    ) {
      return undefined
    }
    if (npc.id && NPC_DB_MAP[npc.id]) return NPC_DB_MAP[npc.id]
    return (
      resolveNpcByName(npc.name) ??
      resolveNpcByName(npc.name.replace(/大师$/, '')) ??
      undefined
    )
  }, [npc])

  const portraitUrl = useMemo(() => {
    if (npc?.portraitUrl) return npc.portraitUrl
    if (dbRecord?.fullbodyUrl) return dbRecord.fullbodyUrl
    if (dbRecord?.templateUrl && !dbRecord.templateUrl.includes('tpl_greenwood_hero_fb')) {
      return dbRecord.templateUrl
    }
    if (npc) {
      return inferTemplatePortrait({
        name: npc.name,
        title: dbRecord?.role ?? npc.title,
        factionId: npc.factionId ?? dbRecord?.factionId ?? undefined,
        factionName: dbRecord?.factionName ?? npc.factionName,
      })
    }
    return '/assets/characters/templates/tpl_sanren_male_fb.jpg'
  }, [npc, dbRecord])

  const targetFactionId = npc?.factionId ?? dbRecord?.factionId ?? null
  const factionName = dbRecord?.factionName ?? npc?.factionName ?? '江湖散人'
  const roleName = dbRecord?.role ?? npc?.title ?? ''
  const realmName = dbRecord?.realm ?? npc?.realm ?? '不入流'
  const npcSectRank = npc?.sectRank ?? dbRecord?.sectRank ?? undefined
  const npcSectRankLabel = npc?.sectRankLabel ?? dbRecord?.sectRankLabel ?? undefined
  const bio = dbRecord?.bio ?? undefined

  const npcQuestActions = useMemo(() => {
    if (!npc) return []
    const enrichedNpc = {
      ...npc,
      id: npc.id ?? dbRecord?.id,
      factionId: targetFactionId ?? undefined,
      sectRank: npcSectRank,
    }
    const evalCtx = buildStoreEvalContext(
      {
        dayCount,
        shichenIdx,
        silver,
        renown,
        chivalry,
        food,
        hp,
        maxHp,
        mp,
        maxMp,
        agility,
        res,
        ridingSkill,
        baseStats,
        skills,
        inventory,
        learnedArts,
        npcFavor: npcFavorMap,
        sectState,
        questState,
      },
      enrichedNpc,
    )
    return getAvailableNpcQuestActions(enrichedNpc, evalCtx)
  }, [
    npc,
    dbRecord?.id,
    targetFactionId,
    npcSectRank,
    dayCount,
    shichenIdx,
    silver,
    renown,
    chivalry,
    food,
    hp,
    maxHp,
    mp,
    maxMp,
    agility,
    res,
    ridingSkill,
    baseStats,
    skills,
    inventory,
    learnedArts,
    npcFavorMap,
    sectState,
    questState,
  ])

  const sectPanelQuestActions = useMemo(
    () => npcQuestActions.filter((x) => Boolean(x.action.showInSectPanel)),
    [npcQuestActions],
  )
  const bottomBarQuestActions = useMemo(
    () =>
      npcQuestActions.filter(
        (x) =>
          x.action.showInBottomBar === true ||
          (x.action.showInBottomBar !== false && !x.action.showInSectPanel),
      ),
    [npcQuestActions],
  )

  if (!npc) return null

  const effTalents = getEffectiveTalents(baseStats.talents, equipped)
  const playerCharm = effTalents.颜值
  const eloquence = skills['辩才'] ?? 0
  const npcKey = npc.id ?? npc.name
  const curFavor = resolveNpcFavor(npcFavorMap, npcKey, playerCharm)
  const favorProfile = getNpcFavorProfile({
    id: npc.id ?? dbRecord?.id,
    name: npc.name,
    category: dbRecord?.category,
    factionName,
    role: roleName,
    bio,
  })
  const likesTeaWine = favorProfile.likes.includes('茶酒珍馐')
  const curMonthIdx = Math.floor((dayCount - 1) / 30)
  const hasTalkedThisMonth = npcTalkedMonth[npcKey] === curMonthIdx
  const hasSparredThisMonth = npcSparredMonth[npcKey] === curMonthIdx
  const hasBanquetedThisMonth = npcBanquetedMonth[npcKey] === curMonthIdx
  const canSpar = curFavor >= 20 && !hasSparredThisMonth
  const isKaifengWarrantTarget = Boolean(
    npc.isDynamicKaifengWarrant || npc.id?.startsWith('KAIFENG_WARRANT_'),
  )
  const isKaifengClueTarget = Boolean(
    isKaifengWarrantTarget && npc.kaifengWarrantKind === 'investigate',
  )
  const isHostileBountyTarget = Boolean(
    npc.isDynamicLiaoSpy || (isKaifengWarrantTarget && !isKaifengClueTarget),
  )
  const resolvedNpcId = npc.id ?? dbRecord?.id
  const canOpenSectMenu =
    !isHostileBountyTarget &&
    isJoinableSectFaction(targetFactionId) &&
    Boolean(
      targetFactionId &&
        resolvedNpcId &&
        resolvedNpcId === getSectContactNpcId(targetFactionId, deadNpcIds),
    )
  // 星宿派弱肉强食：第 4 阶弟子可向掌门丁春秋发起弑师夺位生死决斗
  const canChallengeXingxiuLeader = Boolean(
    sectState.sectId === 'SECT-19' &&
      sectState.rank === 4 &&
      !sectState.killedDingChunqiu &&
      !isNpcDead(deadNpcIds, getSectLeaderNpcId('SECT-19')) &&
      resolvedNpcId &&
      resolvedNpcId === getSectLeaderNpcId('SECT-19'),
  )
  const hasQuestRobAction = bottomBarQuestActions.some(
    (x) => x.action.id === 'act_rob_song_official_scene',
  )
  const canRobForToumingzhuang =
    !isHostileBountyTarget &&
    !hasQuestRobAction &&
    sectState.toumingzhuangState === 'accepted' &&
    isSongOfficialForRobbery({
      id: resolvedNpcId,
      factionId: targetFactionId ?? undefined,
    })

  const activeSectTask = sectState.activeSectTask
  const canDeliverSectLetter = Boolean(
    activeSectTask &&
      !activeSectTask.completedStep &&
      activeSectTask.kind === 'deliver_letter' &&
      resolvedNpcId === activeSectTask.targetNpcId,
  )
  const canGatherSectIntel = Boolean(
    activeSectTask &&
      !activeSectTask.completedStep &&
      activeSectTask.kind === 'gather_intel' &&
      npc.id === `SECT_INTEL_${activeSectTask.id}`,
  )
  const isSectCoachingTrainee = Boolean(
    activeSectTask &&
      !activeSectTask.completedStep &&
      activeSectTask.kind === 'martial_coaching' &&
      (resolvedNpcId === activeSectTask.traineeNpcId ||
        (!resolvedNpcId && npc.name === activeSectTask.traineeNpcName)),
  )

  const handleTalk = () => {
    setSubPanel('none')
    interactNpc(npc, 'talk')
    setDialogueText(null)
  }

  const handleSpar = () => {
    if (!canSpar) return
    setSubPanel('none')
    startNpcCombat(npc, 'spar')
    setDialogueText(null)
  }

  const handleLifeDeathDuel = () => {
    setSubPanel('none')
    const stakes = npc.isDynamicLiaoSpy
      ? 'liao_spy_duel'
      : npc.isDynamicKaifengWarrant
        ? 'kaifeng_warrant'
        : 'duel'
    startNpcCombat(npc, 'duel', stakes)
    setDialogueText(null)
  }

  const handleRobOfficialDuel = () => {
    setSubPanel('none')
    startNpcCombat(npc, 'duel', 'rob_official')
    setDialogueText(null)
  }

  const handleGift = (itemId: string) => {
    giftNpcItem(npc, itemId)
    setSubPanel('none')
    setDialogueText(null)
  }

  const handleBanquet = (tier: 'standard' | 'grand') => {
    hostNpcBanquet(npc, tier)
    setSubPanel('none')
    setDialogueText(null)
  }

  const activeMessage = dialogueText ?? actionFeedback?.text ?? npc.talk

  return (
    <div
      className="fixed inset-0 z-35 pointer-events-auto flex flex-col justify-end items-center select-none"
      role="dialog"
      aria-label={`${npc.name}交互`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#120c07]/76 via-transparent to-[#120c07]/12 transition-opacity"
        onClick={closeNpcInteraction}
      />

      <div
        className={`absolute inset-x-0 top-12 bottom-28 z-10 flex items-end justify-center pointer-events-none transition-transform duration-300 ${
          subPanel !== 'none' ? 'lg:-translate-x-[22vw]' : ''
        }`}
      >
        <div
          className="relative h-full w-full max-w-[90vw] flex items-end justify-center"
          style={{
            filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.75))',
          }}
        >
          <CutoutPortraitImg
            url={portraitUrl}
            alt={npc.name}
            className="object-contain select-none"
          />
        </div>
      </div>

      {subPanel === 'panel' && (
        <NpcStatsSheetPanel
          npc={npc}
          dbRecord={dbRecord}
          roleName={roleName}
          npcSectRank={npcSectRank}
          npcSectRankLabel={npcSectRankLabel}
          realmName={realmName}
          factionName={factionName}
          curFavor={curFavor}
          bio={bio}
          onClose={() => setSubPanel('none')}
        />
      )}

      {subPanel === 'sect' && targetFactionId && (
        <SectAffairsPanel
          npc={npc}
          dbRecord={dbRecord}
          targetFactionId={targetFactionId}
          factionName={factionName}
          npcSectRank={npcSectRank}
          sectPanelQuestActions={sectPanelQuestActions}
          onCloseSubPanel={() => setSubPanel('none')}
        />
      )}

      {subPanel === 'gift' && (
        <NpcGiftPanel
          npcName={npc.name}
          curFavor={curFavor}
          playerCharm={playerCharm}
          favorProfile={favorProfile}
          inventory={inventory}
          onGift={handleGift}
          onClose={() => setSubPanel('none')}
        />
      )}

      {subPanel === 'banquet' && (
        <div className="relative z-20 w-[min(92vw,480px)] lg:self-end lg:mr-10 mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden">
          <div className="px-4 py-2 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
            <div>
              <span className="text-sm font-bold song-serif">设宴款待【{npc.name}】</span>
              <div className="text-[10px] text-[#d4bc91]">
                现银 {silver.toLocaleString()} 两 · 每人每月限宴请一次 · 颜值 {playerCharm}
                {likesTeaWine ? ' · 雅好茶酒（+25%）' : ''}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSubPanel('none')}
              className="text-xs px-2 py-0.5 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
            >
              取消
            </button>
          </div>
          <div className="p-3 space-y-2">
            {(['standard', 'grand'] as const).map((tierKey) => {
              const tierDef = BANQUET_TIERS[tierKey]
              const preview = computeBanquetFavorGain(tierKey, playerCharm, likesTeaWine)
              const canAfford = silver >= preview.cost && !hasBanquetedThisMonth
              return (
                <div
                  key={tierKey}
                  className="p-2.5 rounded bg-[#efe4cc] border border-[#cbb693] flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold song-serif text-[#2d1e10]">
                      {tierDef.label}（好感 +{preview.favorDelta}）
                    </div>
                    <div className="text-[10px] text-[#6b5235]">
                      {tierDef.desc} · 耗 3 时辰
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => handleBanquet(tierKey)}
                    className={`px-3 py-1.5 rounded text-xs font-bold song-serif shrink-0 transition ${
                      canAfford
                        ? 'bg-[#781710] hover:bg-[#931e15] text-[#fde68a] shadow-sm cursor-pointer'
                        : 'bg-[#c9bba3] text-[#7a6d5a] cursor-not-allowed'
                    }`}
                  >
                    {hasBanquetedThisMonth ? '本月已宴' : `${preview.cost} 两设席`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 底部名牌与对话栏 + 交互按钮 */}
      <div className="relative z-20 w-[min(95vw,840px)] mb-5 space-y-2.5">
        <div className="px-4 py-3 rounded-xl bg-[#1e140c]/92 border border-[#b59461]/70 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-base font-bold song-serif text-[#f5dfb5]">
              {npc.name}
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#5c3d1e] text-[#fde8c8]">
              {npc.title}
            </span>
            {npcSectRankLabel && (
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#734e24] text-[#fff4de]">
                {npcSectRankLabel}
              </span>
            )}
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#781710] text-[#fff3df]">
              {realmName}
            </span>
            {!isHostileBountyTarget && (
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded font-mono ${
                  curFavor < 0
                    ? 'bg-[#8f1d14] text-[#ffdeda]'
                    : 'bg-[#1f4d3b]/90 text-[#e7f7ef]'
                }`}
              >
                好感 {curFavor}
              </span>
            )}
            <span className="text-[11px] text-[#cbb693] ml-auto">{factionName}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#efe4cc] leading-relaxed">
            {activeMessage}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setSubPanel((prev) => (prev === 'panel' ? 'none' : 'panel'))}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors cursor-pointer ${
              subPanel === 'panel'
                ? 'bg-[#8f1d14] border-[#d49a6a] text-[#fff8ee]'
                : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#f5dfb5]'
            }`}
          >
            人物面板
          </button>

          <button
            type="button"
            disabled={hasTalkedThisMonth}
            title={
              hasTalkedThisMonth
                ? '每人每月仅可交谈一次，本月已交谈'
                : `每人每月限交谈一次，耗 2 时辰（当前辩才 ${eloquence}，额外好感加成 +${(eloquence / 30).toFixed(1)}）`
            }
            onClick={handleTalk}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors ${
              hasTalkedThisMonth
                ? 'bg-[#2a2016]/80 border-[#6e5a3f] text-[#9e8b6f] cursor-not-allowed'
                : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#f5dfb5] cursor-pointer'
            }`}
          >
            {hasTalkedThisMonth ? '交谈（本月已叙）' : '交谈'}
          </button>

          {!isHostileBountyTarget && (
            <>
              <button
                type="button"
                onClick={() => setSubPanel((prev) => (prev === 'gift' ? 'none' : 'gift'))}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors cursor-pointer ${
                  subPanel === 'gift'
                    ? 'bg-[#8f1d14] border-[#d49a6a] text-[#fff8ee]'
                    : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#f5dfb5]'
                }`}
              >
                送礼
              </button>

              <button
                type="button"
                disabled={hasBanquetedThisMonth}
                title={
                  hasBanquetedThisMonth
                    ? '每人每月限设宴款待一次，本月已宴请'
                    : '破钞设席款待（雅酌小宴 18 两 / 珍馐华筵 45 两），大幅增进好感'
                }
                onClick={() => setSubPanel((prev) => (prev === 'banquet' ? 'none' : 'banquet'))}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors ${
                  hasBanquetedThisMonth
                    ? 'bg-[#2a2016]/80 border-[#6e5a3f] text-[#9e8b6f] cursor-not-allowed'
                    : subPanel === 'banquet'
                      ? 'bg-[#8f1d14] border-[#d49a6a] text-[#fff8ee] cursor-pointer'
                      : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#fde68a] cursor-pointer'
                }`}
              >
                {hasBanquetedThisMonth ? '设宴（本月已宴）' : '设宴'}
              </button>
            </>
          )}

          {canOpenSectMenu && (
            <button
              type="button"
              onClick={() => {
                setSubPanel((prev) => (prev === 'sect' ? 'none' : 'sect'))
                setDialogueText(null)
              }}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border shadow-md transition-colors cursor-pointer ${
                subPanel === 'sect'
                  ? 'bg-[#1f4d3b] border-[#9fd0b4] text-[#fff8ee]'
                  : 'bg-[#214536]/95 hover:bg-[#2b5946] border-[#82b99d] text-[#e7f7ef]'
              }`}
            >
              门派事务
            </button>
          )}

          {npc.isDynamicLiaoSpy ? (
            <button
              type="button"
              onClick={handleLifeDeathDuel}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#9e1911] hover:bg-[#ba1f16] border-2 border-[#f2be8d] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              诛杀辽谍（生死决战）
            </button>
          ) : isKaifengWarrantTarget && !isKaifengClueTarget ? (
            <button
              type="button"
              onClick={handleLifeDeathDuel}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#9e1911] hover:bg-[#ba1f16] border-2 border-[#f2be8d] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              缉拿海捕要犯（生死决战）
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSpar}
              title={
                curFavor < 20
                  ? `需好感度 ≥ 20 方可切磋（当前 ${curFavor}/100）`
                  : hasSparredThisMonth
                    ? '每人每月限切磋一次，本月已切磋'
                    : '每人每月限切磋一次，耗 2 时辰'
              }
              onClick={handleSpar}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors ${
                !canSpar
                  ? 'bg-[#3a2e24]/80 border-[#756552] text-[#b3a48e] cursor-not-allowed'
                  : isSectCoachingTrainee
                    ? 'bg-[#1f4d3b] hover:bg-[#28634c] border-[#9fd0b4] text-[#fff8ee] font-bold cursor-pointer'
                    : 'bg-[#6b3a19]/95 hover:bg-[#82471f] border-[#d49a6a] text-[#fff8ee] cursor-pointer'
              }`}
            >
              {hasSparredThisMonth
                ? '切磋（本月已战）'
                : curFavor < 20
                  ? `切磋（好感需≥20）`
                  : isSectCoachingTrainee
                    ? '切磋（宗门教学）'
                    : '切磋'}
            </button>
          )}

          {canChallengeXingxiuLeader && (
            <button
              type="button"
              onClick={handleLifeDeathDuel}
              title="生死决斗：落败即身死（游戏结束），胜则弑师夺位登临掌门"
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#9e1911] hover:bg-[#ba1f16] border-2 border-[#f2be8d] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              弑师夺位（生死决斗）
            </button>
          )}

          {bottomBarQuestActions.map((qa) => {
            const toneCls =
              qa.action.tone === 'danger'
                ? 'bg-[#a31b12] hover:bg-[#c22117] border-2 border-[#f5c78e] text-[#fff8ee]'
                : qa.action.tone === 'jade'
                  ? 'bg-[#1f4d3b] hover:bg-[#27614a] border-2 border-[#9fd0b4] text-[#fff8ee]'
                  : qa.action.tone === 'gold'
                    ? 'bg-[#6b4614] hover:bg-[#825518] border-2 border-[#f3c66f] text-[#fff8ee]'
                    : 'bg-[#5c3d1e] hover:bg-[#734c26] border border-[#d49a6a] text-[#fff8ee]'
            return (
              <button
                key={`${qa.quest.id}:${qa.action.id}`}
                type="button"
                disabled={!qa.enabled}
                title={!qa.enabled && qa.disabledReason ? qa.disabledReason : qa.quest.title}
                onClick={() => {
                  if (!qa.enabled) return
                  setSubPanel('none')
                  runQuestEffects(qa.action.effects, {
                    ...npc,
                    id: resolvedNpcId,
                    factionId: targetFactionId ?? undefined,
                    sectRank: npcSectRank,
                  })
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-lg transition-colors flex items-center gap-1.5 ${
                  qa.enabled
                    ? `${toneCls} cursor-pointer`
                    : 'bg-[#5c5042]/80 border border-[#8f816d] text-[#d9ceb8] cursor-not-allowed'
                }`}
              >
                <span>{qa.action.label}</span>
                {qa.action.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-black/25 text-[10px] font-normal">
                    {qa.action.badge}
                  </span>
                )}
              </button>
            )
          })}

          {canDeliverSectLetter && (
            <button
              type="button"
              onClick={() => {
                setSubPanel('none')
                setDialogueText(null)
                completeSectTaskStep()
              }}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#1f4d3b] hover:bg-[#28634c] border-2 border-[#9fd0b4] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              交付师门密信
            </button>
          )}

          {isKaifengClueTarget && (
            <button
              type="button"
              onClick={() => {
                setSubPanel('none')
                setDialogueText(null)
                completeKaifengInvestigation()
                closeNpcInteraction()
              }}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#1d3557] hover:bg-[#2a4a75] border-2 border-[#8fb2d9] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              查明六扇门案情线索
            </button>
          )}

          {canGatherSectIntel && (
            <button
              type="button"
              onClick={() => {
                setSubPanel('none')
                setDialogueText(null)
                completeSectTaskStep()
              }}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#1f4d3b] hover:bg-[#28634c] border-2 border-[#9fd0b4] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              打探掌门所需情报
            </button>
          )}

          {canRobForToumingzhuang && (
            <button
              type="button"
              onClick={handleRobOfficialDuel}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#a31b12] hover:bg-[#c22117] border-2 border-[#f5c78e] text-[#fff8ee] shadow-lg transition-colors cursor-pointer"
            >
              劫道纳投名状（生死战）
            </button>
          )}

          <button
            type="button"
            onClick={closeNpcInteraction}
            className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#1e140c]/90 hover:bg-[#2d1e12] border border-[#8c6e46] text-[#d6be96] shadow-md transition-colors cursor-pointer"
          >
            告辞
          </button>
        </div>
      </div>
    </div>
  )
}
