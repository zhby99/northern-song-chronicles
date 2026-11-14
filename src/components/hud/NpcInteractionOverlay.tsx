import { useMemo, useState } from 'react'
import {
  FACTION_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  resolveNpcByName,
} from '../../data/gameDb'
import {
  BAG_CATEGORY_METAS,
  EQUIPMENT_SLOT_METAS,
  ITEM_DB_MAP,
  normalizeItemTier,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import { MARTIAL_ART_SLOT_METAS } from '../../data/playerMartialArts'
import { getAvailableNpcQuestActions } from '../../engine/questEngine'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import type { TenArtKey } from '../../types/game'
import { deriveNpcEffectiveStats, getHeroAge } from '../../utils/heroStats'
import { INITIAL_NPC_FAVOR, getNpcFavorProfile } from '../../utils/npcFavor'
import {
  canPlayerLearnSectArt,
  CHANGSHAN_ADULT_AGE,
  evaluateSectEntry,
  evaluateSectPromotion,
  getChangshanMonthlyStipend,
  getSectLeaderNpcId,
  getSectTeachableArts,
  isJoinableSectFaction,
  isMinorOrSecondTierSect,
  isSongOfficialForRobbery,
  KAIFENG_RECOMMENDATION_ITEM_ID,
  REFERRAL_BRIBE_BY_SOURCE_SECT,
} from '../../utils/sectMechanics'
import { estimateHeroRealm } from '../../utils/realmUtils'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'

const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  BAG_CATEGORY_METAS.map((m) => [m.key, m.label]),
)

const TEN_ART_KEYS: TenArtKey[] = [
  '骑术',
  '算术',
  '经义',
  '策论',
  '诗词',
  '琴',
  '棋',
  '书',
  '画',
  '辩才',
]

type SubPanelMode = 'none' | 'panel' | 'gift' | 'sect'

export function NpcInteractionOverlay() {
  const npc = useGameStore((s) => s.activeNpcInteraction)
  const closeNpcInteraction = useGameStore((s) => s.closeNpcInteraction)
  const interactNpc = useGameStore((s) => s.interactNpc)
  const startNpcCombat = useGameStore((s) => s.startNpcCombat)
  const giftNpcItem = useGameStore((s) => s.giftNpcItem)
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const inventory = useGameStore((s) => s.inventory)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const baseStats = useGameStore((s) => s.baseStats)
  const skills = useGameStore((s) => s.skills)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const sectState = useGameStore((s) => s.sectState)
  const questState = useGameStore((s) => s.questState)
  const npcFavorMap = useGameStore((s) => s.npcFavor)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const joinSect = useGameStore((s) => s.joinSect)
  const leaveSect = useGameStore((s) => s.leaveSect)
  const acceptToumingzhuang = useGameStore((s) => s.acceptToumingzhuang)
  const performSectDuty = useGameStore((s) => s.performSectDuty)
  const promoteSectRank = useGameStore((s) => s.promoteSectRank)
  const acceptSectTask = useGameStore((s) => s.acceptSectTask)
  const abandonSectTask = useGameStore((s) => s.abandonSectTask)
  const completeSectTaskStep = useGameStore((s) => s.completeSectTaskStep)
  const turnInSectTask = useGameStore((s) => s.turnInSectTask)
  const bribeForReferral = useGameStore((s) => s.bribeForReferral)
  const claimKaifengRecommendation = useGameStore((s) => s.claimKaifengRecommendation)
  const learnSectMartialArt = useGameStore((s) => s.learnSectMartialArt)
  const runQuestEffects = useGameStore((s) => s.runQuestEffects)

  const [subPanel, setSubPanel] = useState<SubPanelMode>('none')
  const [dialogueText, setDialogueText] = useState<string | null>(null)
  const [confirmLeaveChangshan, setConfirmLeaveChangshan] = useState(false)

  const dbRecord = useMemo(() => {
    if (!npc || npc.isDynamicLiaoSpy || npc.dynamicQuestActorId) return undefined
    if (npc.id && NPC_DB_MAP[npc.id]) return NPC_DB_MAP[npc.id]
    return (
      resolveNpcByName(npc.name) ??
      resolveNpcByName(npc.name.replace(/大师$/, ''))
    )
  }, [npc])

  const portraitUrl =
    npc?.portraitUrl ??
    dbRecord?.fullbodyUrl ??
    dbRecord?.templateUrl ??
    '/assets/characters/templates/tpl_song_scholar_fb.jpg'

  const stats = dbRecord?.stats ?? npc?.stats
  const talents = dbRecord?.talents ?? npc?.talents
  const tenArts = dbRecord?.tenArts ?? npc?.tenArts
  const targetFactionId = npc?.factionId ?? dbRecord?.factionId ?? null
  const factionMeta = targetFactionId ? FACTION_DB_MAP[targetFactionId] : undefined
  const factionName = dbRecord?.factionName ?? npc?.factionName ?? '江湖散人'
  const roleName = dbRecord?.role ?? npc?.title ?? ''
  const realmName = dbRecord?.realm ?? npc?.realm ?? '不入流'
  const npcSectRank = npc?.sectRank ?? dbRecord?.sectRank
  const npcSectRankLabel = npc?.sectRankLabel ?? dbRecord?.sectRankLabel
  const bio = dbRecord?.bio

  const giftableItems = useMemo(() => {
    return inventory
      .filter((st) => st.qty > 0 && Boolean(ITEM_DB_MAP[st.itemId]))
      .map((st) => ({
        stack: st,
        item: ITEM_DB_MAP[st.itemId]!,
      }))
  }, [inventory])

  const sectTeachableArts = useMemo(() => {
    if (!targetFactionId || !isJoinableSectFaction(targetFactionId)) return []
    return getSectTeachableArts(targetFactionId)
  }, [targetFactionId])

  const learnedArtMap = useMemo(() => {
    return new Map(learnedArts.map((e) => [e.artId, e]))
  }, [learnedArts])

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
        food,
        hp,
        maxHp,
        mp,
        maxMp,
        agility,
        res,
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
    food,
    hp,
    maxHp,
    mp,
    maxMp,
    agility,
    res,
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

  const npcKey = npc.id ?? npc.name
  const curFavor = npcFavorMap[npcKey] ?? INITIAL_NPC_FAVOR
  const canOpenSectMenu = !npc.isDynamicLiaoSpy && isJoinableSectFaction(targetFactionId)
  const hasQuestRobAction = bottomBarQuestActions.some(
    (x) => x.action.id === 'act_rob_song_official_scene',
  )
  const canRobForToumingzhuang =
    !npc.isDynamicLiaoSpy &&
    !hasQuestRobAction &&
    sectState.toumingzhuangState === 'accepted' &&
    isSongOfficialForRobbery({
      id: npc.id ?? dbRecord?.id,
      factionId: targetFactionId ?? undefined,
    })

  const handleTalk = () => {
    setSubPanel('none')
    interactNpc(npc, 'talk')
    setDialogueText(npc.talk || bio || `${npc.name}微微颔首，示意少侠有礼了。`)
  }

  const handleArt = () => {
    setSubPanel('none')
    interactNpc(npc, 'art')
    setDialogueText(null)
  }

  const handleSpar = () => {
    setSubPanel('none')
    startNpcCombat(npc, 'spar')
    setDialogueText(null)
  }

  const handleLifeDeathDuel = () => {
    setSubPanel('none')
    startNpcCombat(npc, 'duel', npc.isDynamicLiaoSpy ? 'liao_spy_duel' : 'duel')
    setDialogueText(null)
  }

  const handleRobOfficialDuel = () => {
    setSubPanel('none')
    startNpcCombat(npc, 'duel', 'rob_official')
    setDialogueText(null)
  }

  const handleTogglePanel = () => {
    setSubPanel((prev) => (prev === 'panel' ? 'none' : 'panel'))
  }

  const handleToggleGift = () => {
    setSubPanel((prev) => (prev === 'gift' ? 'none' : 'gift'))
  }

  const handleToggleSect = () => {
    setConfirmLeaveChangshan(false)
    setSubPanel((prev) => (prev === 'sect' ? 'none' : 'sect'))
    setDialogueText(null)
  }

  const handleGift = (itemId: string) => {
    giftNpcItem(npc, itemId)
    setSubPanel('none')
    setDialogueText(null)
  }

  const activeMessage = dialogueText ?? actionFeedback?.text ?? npc.talk

  const isPlayerInThisSect = Boolean(targetFactionId && sectState.sectId === targetFactionId)
  const entryEval =
    targetFactionId && !isPlayerInThisSect
      ? evaluateSectEntry({
          targetSectId: targetFactionId,
          sectState,
          silver,
          baseStats,
          inventory,
        })
      : null

  const heroRealm = estimateHeroRealm(maxHp, maxMp)
  const promoEval =
    targetFactionId && isPlayerInThisSect
      ? evaluateSectPromotion({
          sectId: targetFactionId,
          currentRank: sectState.rank,
          dayCount,
          joinedDay: sectState.joinedDay,
          heroRealmRank: heroRealm.rank,
          heroRealmLabel: heroRealm.label,
          npcFavor: npcFavorMap,
        })
      : null

  const resolvedNpcId = npc.id ?? dbRecord?.id
  const isSectLeaderNpc = Boolean(
    isPlayerInThisSect &&
      targetFactionId &&
      resolvedNpcId &&
      resolvedNpcId === getSectLeaderNpcId(targetFactionId),
  )
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

  const referralBribeCfg = targetFactionId
    ? REFERRAL_BRIBE_BY_SOURCE_SECT[targetFactionId]
    : undefined

  return (
    <div
      className="fixed inset-0 z-35 pointer-events-auto flex flex-col justify-end items-center select-none"
      role="dialog"
      aria-label={`${npc.name}交互`}
    >
      {/* 轻薄暗角遮罩：完整保留当前地区/建筑背景，仅在底部衬托对话与交互按钮 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#120c07]/76 via-transparent to-[#120c07]/12 transition-opacity"
        onClick={closeNpcInteraction}
      />

      {/* 已剥离立绘背景的人物主体：独立层固定在当前场景前，展开子面板时平滑左移并排展示 */}
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

      {/* 子面板：人物面板（各个维度数值、武学情况、披挂情况） */}
      {subPanel === 'panel' && (
        <div className="relative z-20 w-[min(94vw,1160px)] lg:self-end lg:mr-8 max-h-[80vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xl font-bold song-serif">{npc.name}</span>
              <span className="text-sm px-2.5 py-0.5 rounded bg-[#6b4823] text-[#fde8c8]">
                {roleName}
              </span>
              {npcSectRankLabel && (
                <span className="text-xs px-2 py-0.5 rounded bg-[#8c6230] text-[#fff8ee]">
                  {npcSectRankLabel}
                  {npcSectRank ? `（第${npcSectRank}阶）` : ''}
                </span>
              )}
              <span className="text-sm px-2.5 py-0.5 rounded bg-[#781710] text-[#fff3df]">
                {realmName}
              </span>
              <span className="text-sm text-[#d6be96]">{factionName}</span>
              <span
                className={`text-sm px-2.5 py-0.5 rounded font-mono ${
                  curFavor < 0
                    ? 'bg-[#781710] text-[#ffdeda]'
                    : 'bg-[#1f4d3b] text-[#e7f7ef]'
                }`}
              >
                好感度 {curFavor}/100
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSubPanel('none')}
              className="text-sm px-3 py-1 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
            >
              收起
            </button>
          </div>

          <div className="p-5 overflow-y-auto scroll-thin space-y-4 text-sm text-[#2d1e10]">
            {!npc.isDynamicLiaoSpy && (() => {
              const favorProf = getNpcFavorProfile(npc)
              return (
                <div className="flex flex-wrap items-center gap-2.5 px-3.5 py-2 rounded bg-[#efe4cc] border border-[#cbb693]">
                  <span className="font-bold text-[#5c3d1e]">好感偏好：</span>
                  <span className="px-2 py-0.5 rounded bg-[#e2f2e8] text-[#1b5132] border border-[#9fd0b4] text-xs font-medium">
                    喜好（2.0×）：{favorProf.likes.join('、')}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#f8e3e1] text-[#8f1d14] border border-[#dfaba6] text-xs font-medium">
                    厌恶（0.2×）：{favorProf.dislikes.join('、')}
                  </span>
                </div>
              )
            })()}
            {bio && (
              <p className="px-3.5 py-2.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#4a3219] leading-relaxed">
                {bio}
              </p>
            )}

            {/* 各个维度数值 */}
            {stats &&
              talents &&
              (() => {
                const eff = dbRecord ? deriveNpcEffectiveStats(dbRecord) : null
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#5c3d1e] song-serif">实战交锋属性</span>
                        <span className="text-[10px] text-[#7a5f3e]">武学+披挂实时派生</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">气血</span>
                          <strong className="text-[#8f1d14] text-sm">
                            {eff ? eff.maxHp : stats.hp}
                          </strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">内力</span>
                          <strong className="text-[#1d473a] text-sm">
                            {eff ? eff.maxMp : stats.mp}
                          </strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">身法</span>
                          <strong className="text-sm">{eff ? eff.agility : stats.agi}</strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">抗性</span>
                          <strong className="text-sm">{eff ? eff.res : stats.res}</strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">外功杀伤</span>
                          <strong className="text-[#8f1d14] text-sm">
                            +{eff ? eff.totalAttack : 0}
                          </strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">护体防御</span>
                          <strong className="text-[#1b5132] text-sm">
                            +{eff ? eff.totalDefense : 0}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                      <div className="font-bold text-[#5c3d1e] song-serif">先天三维禀赋</div>
                      <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">先天根骨</span>
                          <strong className="text-[#781710] text-sm">{talents.bone}</strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">先天悟性</span>
                          <strong className="text-[#1f4d3b] text-sm">
                            {talents.comprehension}
                          </strong>
                        </div>
                        <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                          <span className="block text-[10px] text-[#6b5235]">风姿颜值</span>
                          <strong className="text-[#6d3b1a] text-sm">{talents.charm}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

            {/* 十艺百工 */}
            {tenArts && (
              <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                <div className="font-bold text-[#5c3d1e] song-serif">十艺百工</div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center font-mono">
                  {TEN_ART_KEYS.map((artKey) => {
                    const val = tenArts[artKey] ?? 0
                    return (
                      <div
                        key={artKey}
                        className={`rounded py-1 border ${
                          val >= 80
                            ? 'bg-[#f4e1c1] border-[#c58b38] text-[#781710] font-bold'
                            : 'bg-[#faf3e3] border-[#dcc9a7] text-[#3d2b19]'
                        }`}
                      >
                        <span className="block text-[10px] text-[#6b5235] font-sans">
                          {artKey}
                        </span>
                        <span>{val}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 武学情况（6槽）与披挂情况（7槽） */}
            {(dbRecord || npc.equippedArts) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">六槽运使武学</div>
                  <div className="space-y-1">
                    {MARTIAL_ART_SLOT_METAS.map((meta) => {
                      const eqArts = dbRecord?.equippedArts ?? npc.equippedArts
                      const lrArts = dbRecord?.learnedArts ?? npc.learnedArts ?? []
                      const aid = eqArts?.[meta.slot] ?? null
                      const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
                      const lv = lrArts.find((e) => e.artId === aid)?.level ?? 1
                      return (
                        <div
                          key={meta.slot}
                          className="px-2 py-1 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="px-1 py-0.2 rounded bg-[#5e472d] text-[#fff8eb] text-[9px] font-bold shrink-0">
                              {meta.shortLabel}
                            </span>
                            <span className="font-bold text-[#2d1e10] truncate">
                              {art ? art.cleanName : '未装配'}
                            </span>
                          </div>
                          {art && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e5d3b3] text-[#781710] shrink-0">
                              {art.tier}·{lv}重
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">七槽随身披挂</div>
                  <div className="space-y-1">
                    {EQUIPMENT_SLOT_METAS.map((meta) => {
                      const eqItems = dbRecord?.equipped ?? npc.equipped
                      const iid = eqItems?.[meta.slot] ?? null
                      const item = iid ? ITEM_DB_MAP[iid] : null
                      const tier = item ? normalizeItemTier(item.rarity) : null
                      const rStyle = tier ? RARITY_STYLE_MAP[tier] : null
                      return (
                        <div
                          key={meta.slot}
                          className="px-2 py-1 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="px-1 py-0.2 rounded bg-[#6b5235] text-[#fff8eb] text-[9px] font-bold shrink-0">
                              {meta.shortLabel}
                            </span>
                            <span className="font-medium text-[#2d1e10] truncate">
                              {item ? item.name : '空置'}
                            </span>
                          </div>
                          {tier && rStyle && (
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {tier}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 子面板：门派事务（拜师入门 / 职阶晋升 / 贿赂举荐帖 / 领纳投名状 / 武学传授 / 退派） */}
      {subPanel === 'sect' && targetFactionId && (
        <div className="relative z-20 w-[min(94vw,980px)] lg:self-end lg:mr-8 max-h-[78vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-lg sm:text-xl font-bold song-serif">
                【{factionMeta?.name ?? factionName}】门派枢机
              </span>
              {factionMeta?.sectTier && (
                <span className="text-xs px-2 py-0.5 rounded bg-[#781710] text-[#fff3df] font-medium">
                  {factionMeta.sectTier}
                </span>
              )}
              {isPlayerInThisSect ? (
                <span className="text-xs px-2.5 py-0.5 rounded bg-[#1f4d3b] text-[#e7f7ef] font-medium">
                  本门职阶：第{sectState.rank}阶【{sectState.rankLabel}】 · 功绩{' '}
                  {sectState.contribution}
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded bg-[#5c3d1e] text-[#fde8c8]">
                  当前门派：
                  {sectState.sectId
                    ? `${FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId}（${sectState.rankLabel}）`
                    : '无门无派'}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSubPanel('none')}
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

            {/* 声明式门派试炼 / 入门剧情链入口（任意一流/二流门派任务自动挂载） */}
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
                            setSubPanel('none')
                            runQuestEffects(qa.action.effects, {
                              ...npc,
                              id: npc.id ?? dbRecord?.id,
                              factionId: targetFactionId ?? undefined,
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
              <div className="p-4 rounded-lg bg-[#efe4cc]/90 border border-[#b59461] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-[#5c3d1e] song-serif text-base">
                      拜入【{factionMeta?.name ?? factionName}】入门章程
                    </div>
                    <div className="text-xs text-[#6b5235] mt-0.5">
                      入门条件：{entryEval.requirementSummary}
                    </div>
                  </div>
                  <div className="text-xs font-mono px-2.5 py-1 rounded bg-[#faf3e3] border border-[#cbb693] text-[#4a3219]">
                    入门授阶：Lv.{entryEval.startingRank}【{entryEval.startingRankLabel}】 · 现银{' '}
                    {silver} 两
                  </div>
                </div>

                {entryEval.blockedReason && (
                  <div className="px-3 py-2 rounded bg-[#f8e3e1] border border-[#d69891] text-[#8f1d14] text-xs font-medium">
                    入门受阻：{entryEval.blockedReason}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => joinSect(targetFactionId, npc)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm border shadow cursor-pointer transition-colors ${
                      entryEval.canJoin
                        ? 'bg-[#1f4d3b] hover:bg-[#27614a] border-[#8fc7ae] text-[#fff8ee]'
                        : 'bg-[#8c7b65]/60 hover:bg-[#8c7b65]/80 border-[#a89882] text-[#f7eedc]'
                    }`}
                  >
                    {targetFactionId === 'SECT-17' &&
                    (sectState.sectId === 'SECT-22' || sectState.sectId === 'SECT-23')
                      ? '呈交举荐信奉调开封府'
                      : `拜入【${factionMeta?.name ?? factionName}】`}
                    {entryEval.costSilver > 0 ? `（奉银 ${entryEval.costSilver} 两）` : ''}
                  </button>

                  {targetFactionId === 'SECT-18' &&
                    sectState.toumingzhuangState !== 'completed' &&
                    !sectPanelQuestActions.some(
                      (x) => x.action.id === 'act_accept_toumingzhuang_scene',
                    ) && (
                      <button
                        type="button"
                        onClick={() => acceptToumingzhuang(npc)}
                        className="px-4 py-2 rounded-lg font-bold text-xs sm:text-sm bg-[#781710] hover:bg-[#961f16] border border-[#d49a6a] text-[#fff8ee] shadow cursor-pointer transition-colors"
                      >
                        {sectState.toumingzhuangState === 'accepted'
                          ? '已领「纳投名状」（去劫朝廷命官）'
                          : '领取「纳投名状」劫官任务'}
                      </button>
                    )}
                </div>
              </div>
            )}

            {/* 情况 B：已是本门弟子 */}
            {isPlayerInThisSect && (
              <div className="space-y-3">
                {/* 日常当差与晋升 */}
                <div className="p-3.5 rounded-lg bg-[#efe4cc]/90 border border-[#b59461] space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#5c3d1e] song-serif text-base">
                        师门职司与晋升考核
                      </span>
                      <p className="text-xs text-[#6b5235] mt-0.5">
                        {promoEval
                          ? promoEval.reason
                          : sectState.rank >= 5
                            ? '少侠已登临本门第5阶【掌门】绝顶尊位，可修习本门镇派天阶上品绝学！'
                            : '少侠已达常规晋升最高阶（第4阶），掌门之位不可通过常规晋升获得。'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => performSectDuty()}
                        className="px-3.5 py-1.5 rounded-lg bg-[#5c3d1e] hover:bg-[#734c26] border border-[#b59461] text-[#fff8ee] text-xs font-medium cursor-pointer"
                      >
                        门派当差（功绩+35 · 战经+40 · 津贴+8两）
                      </button>
                      {promoEval && (
                        <button
                          type="button"
                          disabled={Boolean(promoEval.isFirstTierPendingDesign)}
                          onClick={() => promoteSectRank()}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border ${
                            promoEval.isFirstTierPendingDesign
                              ? 'bg-[#8c7b65]/40 border-[#a89882] text-[#f7eedc]/80 cursor-not-allowed'
                              : promoEval.canPromote
                                ? 'bg-[#1f4d3b] hover:bg-[#28634c] border-[#8fc7ae] text-[#fff8ee] cursor-pointer'
                                : 'bg-[#8c7b65]/60 border-[#a89882] text-[#f7eedc] cursor-pointer'
                          }`}
                        >
                          {promoEval.isFirstTierPendingDesign
                            ? '一流晋升待实装'
                            : `晋升【${promoEval.targetRankLabel}】`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 二流/三流门派：掌门宗门任务（送信 / 酒馆情报 / 武艺教学） */}
                {targetFactionId && isMinorOrSecondTierSect(targetFactionId) && (
                  <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#b59461] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
                          宗门任务（掌门亲派差遣）
                        </div>
                        <div className="text-xs text-[#6b5235] mt-0.5">
                          完成一次宗门任务可获掌门好感 +10；放弃任务则降低 5 点好感。
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {!activeSectTask ? (
                          isSectLeaderNpc ? (
                            <button
                              type="button"
                              onClick={() => acceptSectTask()}
                              className="px-3.5 py-1.5 rounded-lg bg-[#1f4d3b] hover:bg-[#28634c] border border-[#8fc7ae] text-[#fff8ee] text-xs font-bold cursor-pointer"
                            >
                              领取宗门任务
                            </button>
                          ) : (
                            <span className="text-xs px-2.5 py-1 rounded bg-[#efe4cc] border border-[#cbb693] text-[#6b5235]">
                              请向本门掌门领取宗门任务
                            </span>
                          )
                        ) : (
                          <>
                            {isSectLeaderNpc && activeSectTask.completedStep && (
                              <button
                                type="button"
                                onClick={() => turnInSectTask()}
                                className="px-3.5 py-1.5 rounded-lg bg-[#1f4d3b] hover:bg-[#28634c] border border-[#8fc7ae] text-[#fff8ee] text-xs font-bold cursor-pointer"
                              >
                                向掌门交差（好感+10）
                              </button>
                            )}
                            {isSectLeaderNpc && (
                              <button
                                type="button"
                                onClick={() => abandonSectTask()}
                                className="px-3 py-1.5 rounded-lg bg-[#781710]/90 hover:bg-[#961f16] border border-[#d49a6a] text-[#fff8ee] text-xs font-medium cursor-pointer"
                              >
                                放弃任务（好感-5）
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {activeSectTask && (
                      <div
                        className={`px-3 py-2 rounded border text-xs leading-relaxed ${
                          activeSectTask.completedStep
                            ? 'bg-[#e2f2e8] border-[#82b99d] text-[#1b5132]'
                            : 'bg-[#f4ebd9] border-[#cbb693] text-[#4a3219]'
                        }`}
                      >
                        <div className="font-bold">
                          【{activeSectTask.title}】
                          {activeSectTask.completedStep ? '（已完成，请向掌门复命）' : '（进行中）'}
                        </div>
                        <div className="mt-0.5">{activeSectTask.summary}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* 三流门派向二流门派贿赂求取举荐帖专属栏 */}
                {referralBribeCfg && (
                  <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#c58b38] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5 max-w-xl">
                      <div className="font-bold text-[#781710] song-serif">
                        二流名门引荐关节：《{referralBribeCfg.itemName}》
                      </div>
                      <div className="text-xs text-[#5c3d1e]">
                        晋升至本门第2阶内门后，寻本门第4阶【{referralBribeCfg.elderTitleHint}】奉银{' '}
                        {referralBribeCfg.costSilver} 两即可获授举荐帖，退派后凭帖直入【
                        {referralBribeCfg.targetSectName}】！
                      </div>
                    </div>
                    {npcSectRank === 4 ? (
                      <button
                        type="button"
                        onClick={() => bribeForReferral(npc)}
                        className="px-3.5 py-2 rounded-lg bg-[#781710] hover:bg-[#961f16] border border-[#e3b07b] text-[#fff8ee] text-xs font-bold shadow cursor-pointer"
                      >
                        奉银{referralBribeCfg.costSilver}两求取《{referralBribeCfg.itemName}》
                      </button>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded bg-[#efe4cc] border border-[#cbb693] text-[#6b5235]">
                        当前交互对象非第4阶【{referralBribeCfg.elderTitleHint}】
                      </span>
                    )}
                  </div>
                )}

                {/* 常山枪派（参军制）专属军饷、半年度诛杀辽谍军令与开封府推荐信 */}
                {targetFactionId === 'SECT-22' && (() => {
                  const heroAge = getHeroAge(dayCount)
                  return (
                  <div className="p-3.5 rounded-lg bg-[#faf3e3] border-2 border-[#8f1d14]/70 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-[#781710] song-serif text-sm sm:text-base">
                        河北边军·常山枪派军籍要务
                      </div>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1f4d3b] text-[#e7f7ef]">
                        {heroAge < CHANGSHAN_ADULT_AGE
                          ? '月度军饷：未满18岁暂不领饷'
                          : `月度军饷：${getChangshanMonthlyStipend(sectState.rank)} 两纹银 / 月`}
                      </span>
                    </div>

                    {sectState.activeLiaoSpy ? (
                      <div className="px-3 py-2 rounded bg-[#f8e3e1] border border-[#d69891] text-[#781710] text-xs leading-relaxed">
                        <strong>
                          【第 {sectState.activeLiaoSpy.yearIndex} 期半年度死斗军令】
                        </strong>{' '}
                        辽国北院密谍【{sectState.activeLiaoSpy.name}】（
                        {sectState.activeLiaoSpy.title} · {sectState.activeLiaoSpy.realm}）现潜伏于燕云【
                        {sectState.activeLiaoSpy.regionName} ·{' '}
                        {sectState.activeLiaoSpy.buildingName}
                        {sectState.activeLiaoSpy.spotName
                          ? ` · ${sectState.activeLiaoSpy.spotName}`
                          : ''}
                        】！须于第 {sectState.activeLiaoSpy.deadlineDay}{' '}
                        日前赶赴燕云将其诛杀，逾期辽谍将主动截杀！
                      </div>
                    ) : heroAge < CHANGSHAN_ADULT_AGE ? (
                      <div className="px-3 py-1.5 rounded bg-[#e8f0eb] border border-[#a9c7b5] text-[#1f4d3b] text-xs">
                        少侠年方 {heroAge} 岁（未满十八），暂免燕云诛杀辽谍军令，专心练枪筑基；年满十八岁后每半年须领受一次诛谍军令。
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 rounded bg-[#e2f2e8] border border-[#9fd0b4] text-[#1b5132] text-xs">
                        本期半年度燕云诛杀辽谍军令已圆满交令，静候下半年度军帖。
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <span className="text-xs text-[#5c3d1e]">
                        晋升至第3阶【演武教习】可申领《开封府推荐信》，凭信赴汴梁正当调任【开封府 / 六扇门】。
                      </span>
                      <button
                        type="button"
                        onClick={() => claimKaifengRecommendation(npc)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                          sectState.rank >= 3 &&
                          !sectState.claimedKaifengLetter &&
                          !inventory.some(
                            (st) =>
                              st.itemId === KAIFENG_RECOMMENDATION_ITEM_ID && st.qty > 0,
                          )
                            ? 'bg-[#781710] hover:bg-[#961f16] border-[#e3b07b] text-[#fff8ee]'
                            : 'bg-[#8c7b65]/60 border-[#a89882] text-[#f7eedc]'
                        }`}
                      >
                        {sectState.claimedKaifengLetter
                          ? '已申领《开封府推荐信》'
                          : '申领《开封府推荐信》'}
                      </button>
                    </div>
                  </div>
                  )
                })()}
              </div>
            )}

            {/* 本门武学传授目录（按 5 阶权限分级列出） */}
            <div className="p-3.5 rounded-lg bg-[#efe4cc]/85 border border-[#cbb693] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
                  本门武学传授名录（共 {sectTeachableArts.length} 门）
                </span>
                <span className="text-[11px] text-[#6b5235]">
                  良阶上品起需内门 · 地阶上品起需真传/长老（同权） · 天阶上品唯掌门可学
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[30vh] overflow-y-auto scroll-thin pr-1">
                {sectTeachableArts.map((entry) => {
                  const learned = learnedArtMap.get(entry.art.id)
                  const unlocked =
                    isPlayerInThisSect &&
                    canPlayerLearnSectArt(sectState.rank, entry.requiredRank)
                  return (
                    <div
                      key={entry.art.id}
                      className="px-3 py-2 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-[#2d1e10] truncate">
                            {entry.art.cleanName}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#e5d3b3] text-[#781710] font-medium">
                            {entry.art.fullTier}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e]">
                            {entry.art.category}
                          </span>
                          {entry.isSharedFromShaolin && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#f4e1c1] text-[#8a4b0f]">
                              少林共传
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#6b5235]">
                          门槛：Lv.{entry.requiredRank}【{entry.requiredRankLabel}】
                        </div>
                      </div>

                      {learned ? (
                        <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#e2f2e8] border border-[#9fd0b4] text-[#1b5132] shrink-0">
                          已习·{learned.level}重
                        </span>
                      ) : isPlayerInThisSect ? (
                        <button
                          type="button"
                          onClick={() => learnSectMartialArt(entry.art.id)}
                          className={`px-2.5 py-1 rounded text-xs font-bold border shrink-0 cursor-pointer ${
                            unlocked
                              ? 'bg-[#781710] hover:bg-[#961f16] border-[#d49a6a] text-[#fff8ee]'
                              : 'bg-[#dcd1be] border-[#bfb097] text-[#7a6a53]'
                          }`}
                        >
                          {unlocked ? '修习入门' : '职阶不足'}
                        </button>
                      ) : (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#efe4cc] text-[#7a6a53] shrink-0">
                          需入门
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 脱离门派操作区 */}
            {isPlayerInThisSect && (
              <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#cbb693]">
                {targetFactionId === 'SECT-22' ? (
                  <span className="text-xs text-[#8f1d14] font-medium">
                    ⚠️ 军纪铁律：擅自脱离【常山枪派】将坐实【通辽嫌疑】，所有大宋人物对主角好感度立减
                    30！（持推荐信赴开封府调任则无此罚）
                  </span>
                ) : (
                  <span className="text-xs text-[#6b5235]">
                    脱离门派后门派功绩清零，已习得武学仍保留于自身。
                  </span>
                )}

                {targetFactionId === 'SECT-22' && !confirmLeaveChangshan ? (
                  <button
                    type="button"
                    onClick={() => setConfirmLeaveChangshan(true)}
                    className="px-3 py-1.5 rounded bg-[#781710] hover:bg-[#961f16] text-[#fff8ee] text-xs font-bold cursor-pointer"
                  >
                    主动脱离常山枪派…
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {confirmLeaveChangshan && (
                      <button
                        type="button"
                        onClick={() => setConfirmLeaveChangshan(false)}
                        className="px-2.5 py-1 rounded bg-[#efe4cc] border border-[#8c6e46] text-[#3d2814] text-xs cursor-pointer"
                      >
                        取消
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmLeaveChangshan(false)
                        leaveSect()
                      }}
                      className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#ad2217] border border-[#f0a899] text-[#fff8ee] text-xs font-bold cursor-pointer"
                    >
                      {targetFactionId === 'SECT-22'
                        ? '确认背军退派（大宋好感-30）'
                        : '主动脱离本门'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 子面板：送礼行囊选择 */}
      {subPanel === 'gift' && (
        <div className="relative z-20 w-[min(92vw,560px)] lg:self-end lg:mr-10 max-h-[52vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-2 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
            <span className="text-sm font-bold song-serif">
              向【{npc.name}】赠礼（择一行囊物什）
            </span>
            <button
              type="button"
              onClick={() => setSubPanel('none')}
              className="text-xs px-2 py-0.5 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
            >
              取消
            </button>
          </div>
          <div className="p-3 overflow-y-auto scroll-thin grid grid-cols-1 sm:grid-cols-2 gap-2">
            {giftableItems.length === 0 ? (
              <div className="col-span-full py-6 text-center text-xs text-[#6b5235]">
                行囊空空如也，暂无可赠之物。
              </div>
            ) : (
              giftableItems.map(({ stack, item }) => (
                <button
                  key={stack.itemId}
                  type="button"
                  onClick={() => handleGift(stack.itemId)}
                  className="text-left p-2 rounded bg-[#efe4cc] hover:bg-[#e5d3b3] border border-[#cbb693] transition-colors cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#2d1e10] truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#6b5235] truncate">
                      {CATEGORY_LABEL_MAP[item.category] ?? item.category} · {item.rarity}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#faf3e3] border border-[#dcc9a7] text-[#4a3219] shrink-0">
                    ×{stack.qty}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* 底部名牌与对话栏 + 交互按钮 */}
      <div className="relative z-20 w-[min(95vw,840px)] mb-5 space-y-2.5">
        {/* 对话与反馈框 */}
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
            {!npc.isDynamicLiaoSpy && (
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

        {/* 下方交互按钮栏 */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleTogglePanel}
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
            onClick={handleTalk}
            className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#3d2814]/95 hover:bg-[#54371c] border border-[#b59461] text-[#f5dfb5] shadow-md transition-colors cursor-pointer"
          >
            交谈
          </button>

          {!npc.isDynamicLiaoSpy && (
            <button
              type="button"
              onClick={handleToggleGift}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors cursor-pointer ${
                subPanel === 'gift'
                  ? 'bg-[#8f1d14] border-[#d49a6a] text-[#fff8ee]'
                  : 'bg-[#3d2814]/95 hover:bg-[#54371c] border-[#b59461] text-[#f5dfb5]'
              }`}
            >
              送礼
            </button>
          )}

          {canOpenSectMenu && (
            <button
              type="button"
              onClick={handleToggleSect}
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
          ) : (
            <>
              <button
                type="button"
                onClick={handleSpar}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border shadow-md transition-colors cursor-pointer ${
                  isSectCoachingTrainee
                    ? 'bg-[#1f4d3b] hover:bg-[#28634c] border-[#9fd0b4] text-[#fff8ee] font-bold'
                    : 'bg-[#6b3a19]/95 hover:bg-[#82471f] border-[#d49a6a] text-[#fff8ee]'
                }`}
              >
                {isSectCoachingTrainee ? '切磋（宗门教学）' : '切磋'}
              </button>
              <button
                type="button"
                onClick={handleLifeDeathDuel}
                className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#781710]/95 hover:bg-[#961f16] border border-[#e69d8f] text-[#fff8ee] shadow-md transition-colors cursor-pointer"
              >
                生死决斗
              </button>
            </>
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
                    id: npc.id ?? dbRecord?.id,
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

          {!npc.isDynamicLiaoSpy && (
            <button
              type="button"
              onClick={handleArt}
              className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#3d2814]/95 hover:bg-[#54371c] border border-[#b59461] text-[#f5dfb5] shadow-md transition-colors cursor-pointer"
            >
              唱和
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
