import { useCallback, useMemo, useState } from 'react'
import { BUILDING_DB_MAP, NPC_DB_MAP, resolveNpcByName } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'
import {
  canFighterEscape,
  computeDodgeChancePreview,
  computeEffectiveAgility,
  computeEscapeChancePreview,
  getMoveActionsAvailability,
  getStrongestLivingEnemy,
} from '../../engine/combat'
import { NODE_MAP, REGIONAL_CONFIGS } from '../../engine/world/mapMath'
import { AllyStatusPanel } from './AllyStatusPanel'
import { CombatActionDeck } from './CombatActionDeck'
import { CombatCenterBanner } from './CombatCenterBanner'
import { CombatItemDrawer, type CombatBagStackEntry } from './CombatItemDrawer'
import { CombatLogPanel } from './CombatLogPanel'
import { CombatStageCanvas } from './CombatStageCanvas'
import { CombatVfxStage } from './CombatVfxStage'
import { EnemyStatusPanel } from './EnemyStatusPanel'
import { useCombatChoreography } from './useCombatChoreography'

export function CombatOverlay() {
  const session = useGameStore((s) => s.activeCombat)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const inventory = useGameStore((s) => s.inventory)
  const consumedOnceItemIds = useGameStore((s) => s.consumedOnceItemIds)
  const submitCombatAction = useGameStore((s) => s.submitCombatAction)
  const finishCombatSession = useGameStore((s) => s.finishCombatSession)

  const [bagOpen, setBagOpen] = useState(false)
  const [selectedTargetId, setSelectedTargetId] = useState<string>('enemy-0')

  const duelBuilding = useMemo(() => {
    if (activeBuildingInteriorId && BUILDING_DB_MAP[activeBuildingInteriorId]) {
      return BUILDING_DB_MAP[activeBuildingInteriorId]!
    }
    if (session) {
      const npcRec =
        NPC_DB_MAP[session.npc.id] ??
        resolveNpcByName(session.npc.name) ??
        resolveNpcByName(session.npc.name.replace(/大师$/, ''))
      if (npcRec?.assignedBuildingId && BUILDING_DB_MAP[npcRec.assignedBuildingId]) {
        return BUILDING_DB_MAP[npcRec.assignedBuildingId]!
      }
    }
    if (selectedBuildingId && BUILDING_DB_MAP[selectedBuildingId]) {
      return BUILDING_DB_MAP[selectedBuildingId]!
    }
    return null
  }, [activeBuildingInteriorId, selectedBuildingId, session])

  const regionName = NODE_MAP[activeRegionId]?.name ?? '江湖'
  const sceneTitle = duelBuilding ? `${regionName} · ${duelBuilding.name}` : regionName

  const backgroundUri = useMemo(() => {
    if (duelBuilding?.interior?.panoramaUri) {
      return duelBuilding.interior.panoramaUri
    }
    if (!duelBuilding) {
      return REGIONAL_CONFIGS[activeRegionId]?.panoramaUri
    }
    return undefined
  }, [duelBuilding, activeRegionId])

  const combatBagItems: CombatBagStackEntry[] = useMemo(() => {
    return inventory
      .filter((st) => {
        if (st.qty <= 0) return false
        const def = ITEM_DB_MAP[st.itemId]
        return Boolean(def && def.category === 'medicine' && (def.useEffect || def.poisonEffect))
      })
      .map((st) => ({
        qty: st.qty,
        item: ITEM_DB_MAP[st.itemId]!,
      }))
  }, [inventory])

  const moveOptions = useMemo(
    () => (session ? getMoveActionsAvailability(session.player) : []),
    [session],
  )

  const livingEnemies = useMemo(
    () => (session ? session.enemies.filter((e) => e.hp > 0) : []),
    [session],
  )

  const effectiveTargetEnemy = useMemo(() => {
    if (!session) return null
    const picked = livingEnemies.find((e) => e.unitId === selectedTargetId)
    return picked ?? livingEnemies[0] ?? session.enemies[0] ?? session.npc
  }, [session, livingEnemies, selectedTargetId])

  const effectiveTargetId = effectiveTargetEnemy?.unitId ?? 'enemy-0'

  const strongestLivingEnemy = useMemo(
    () => (session ? getStrongestLivingEnemy(session) : null),
    [session],
  )

  const cycleTargetEnemy = useCallback(() => {
    if (livingEnemies.length <= 1) return
    const curIdx = livingEnemies.findIndex((e) => e.unitId === effectiveTargetId)
    const nextEnemy = livingEnemies[(curIdx + 1) % livingEnemies.length]!
    setSelectedTargetId(nextEnemy.unitId)
  }, [livingEnemies, effectiveTargetId])

  const escapeStatus = useMemo(
    () =>
      session && strongestLivingEnemy
        ? canFighterEscape(
            session.player,
            strongestLivingEnemy,
            session.duelStakes,
            session.forbidEscapeReason,
          )
        : { allowed: true, reason: null },
    [session, strongestLivingEnemy],
  )

  const escapeChancePct = useMemo(
    () =>
      session && strongestLivingEnemy
        ? Math.round(
            computeEscapeChancePreview(
              session.player,
              strongestLivingEnemy,
              session.duelStakes,
              session.forbidEscapeReason,
            ) * 100,
          )
        : 50,
    [session, strongestLivingEnemy],
  )

  const defendDodgePct = useMemo(
    () =>
      session && effectiveTargetEnemy
        ? Math.round(computeDodgeChancePreview(session.player, effectiveTargetEnemy, true) * 100)
        : 0,
    [session, effectiveTargetEnemy],
  )

  const {
    paceMode,
    paceScale,
    cyclePaceMode,
    skipChoreography,
    isAnimating,
    activeBeat,
    currentSubPhase,
    isVisualClimax,
    visibleLogs,
    getUnitShownHp,
    getUnitShownMp,
  } = useCombatChoreography({
    session,
    moveOptions,
    escapeAllowed: escapeStatus.allowed,
    livingEnemiesCount: livingEnemies.length,
    effectiveTargetId,
    bagOpen,
    setBagOpen,
    cycleTargetEnemy,
    submitCombatAction,
    finishCombatSession,
  })

  if (!session) return null

  const { player, allies, enemies, lastRoundSummary, outcome } = session
  const npc = effectiveTargetEnemy ?? session.npc
  const isMultiEnemy = enemies.length > 1
  const isMultiAlly = allies.length > 1
  const formationTag =
    allies.length > 1 || enemies.length > 1 ? `${allies.length}v${enemies.length}` : null

  const shownPlayerHp = getUnitShownHp(player)
  const shownPlayerMp = getUnitShownMp(player)
  const shownNpcHp = getUnitShownHp(npc)
  const shownNpcMp = getUnitShownMp(npc)

  const playerEffAgi = computeEffectiveAgility(player)
  const npcEffAgi = computeEffectiveAgility(npc)
  const agiDiff = playerEffAgi - npcEffAgi
  const playerDodgePct = Math.round(computeDodgeChancePreview(player, npc, false) * 100)
  const npcDodgePct = Math.round(computeDodgeChancePreview(npc, player, false) * 100)

  const isImpactPose = currentSubPhase === 'impact'
  const isPlayerHit =
    isImpactPose &&
    activeBeat?.kind === 'attack' &&
    (activeBeat.targetUnitId
      ? activeBeat.targetUnitId === player.unitId
      : activeBeat.targetSide === 'player')
  const isNpcHit =
    isImpactPose &&
    activeBeat?.kind === 'attack' &&
    (activeBeat.targetUnitId
      ? activeBeat.targetUnitId === npc.unitId
      : activeBeat.targetSide === 'npc')

  const handleUseBagItem = (itemId: string) => {
    setBagOpen(false)
    submitCombatAction({ type: 'item', itemId, targetId: effectiveTargetId })
  }

  return (
    <div
      className="fixed inset-0 z-45 pointer-events-auto select-none overflow-hidden text-[#f5e7cb]"
      role="dialog"
      aria-label="武林回合交锋"
    >
      <CombatStageCanvas
        backgroundUri={backgroundUri}
        duelBuilding={duelBuilding}
        sceneTitle={sceneTitle}
        allies={allies}
        enemies={enemies}
        effectiveTargetId={effectiveTargetId}
        onSelectTargetId={setSelectedTargetId}
        outcome={outcome}
        isAnimating={isAnimating}
        isImpactPose={isImpactPose}
        activeBeat={activeBeat}
        getUnitShownHp={getUnitShownHp}
      />

      <CombatVfxStage
        activeBeat={activeBeat}
        playerName={player.name}
        npcName={npc.name}
        allies={allies}
        enemies={enemies}
        paceScale={paceScale}
      />

      {/* 顶部三段式浮空交锋铭牌 */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-2.5 pointer-events-none">
        <AllyStatusPanel
          player={player}
          allies={allies}
          shownPlayerHp={shownPlayerHp}
          shownPlayerMp={shownPlayerMp}
          playerEffAgi={playerEffAgi}
          playerDodgePct={playerDodgePct}
          isPlayerHit={isPlayerHit}
          outcome={outcome}
          isAnimating={isAnimating}
          bagOpen={bagOpen}
          onToggleBag={() => setBagOpen((v) => !v)}
          combatBagCount={combatBagItems.length}
          getUnitShownHp={getUnitShownHp}
          getUnitShownMp={getUnitShownMp}
        />

        <CombatCenterBanner
          mode={session.mode}
          formationTag={formationTag}
          sceneTitle={sceneTitle}
          shownRound={isAnimating && lastRoundSummary ? lastRoundSummary.round : session.round}
          maxRounds={session.maxRounds}
          isVisualClimax={isVisualClimax}
          paceMode={paceMode}
          onCyclePaceMode={cyclePaceMode}
          npcName={npc.name}
          playerEffAgi={playerEffAgi}
          npcEffAgi={npcEffAgi}
        />

        <EnemyStatusPanel
          player={player}
          npc={npc}
          enemies={enemies}
          livingEnemiesCount={livingEnemies.length}
          effectiveTargetId={effectiveTargetId}
          onSelectTargetId={setSelectedTargetId}
          shownNpcHp={shownNpcHp}
          shownNpcMp={shownNpcMp}
          npcEffAgi={npcEffAgi}
          npcDodgePct={npcDodgePct}
          isNpcHit={isNpcHit}
          isImpactPose={isImpactPose}
          activeBeat={activeBeat}
          outcome={outcome}
          isAnimating={isAnimating}
          getUnitShownHp={getUnitShownHp}
          getUnitShownMp={getUnitShownMp}
        />
      </div>

      {/* 随身行囊 · 丹毒匣浮窗 */}
      {bagOpen && outcome === 'ongoing' && (
        <CombatItemDrawer
          combatBagItems={combatBagItems}
          consumedOnceItemIds={consumedOnceItemIds}
          playerMaxHp={player.maxHp}
          playerMaxMp={player.maxMp}
          onClose={() => setBagOpen(false)}
          onUseItem={handleUseBagItem}
        />
      )}

      {/* 下方居中：演武战报 + 底部操作指令台 */}
      <div className="absolute inset-x-0 bottom-0 z-25 px-3 sm:px-5 pb-3 flex flex-col items-center gap-2 pointer-events-none">
        <CombatLogPanel
          lastRoundSummary={lastRoundSummary}
          visibleLogs={visibleLogs}
          isMultiAlly={isMultiAlly}
          isMultiEnemy={isMultiEnemy}
          npcName={npc.name}
          formationTag={formationTag}
          sceneTitle={sceneTitle}
        />

        <CombatActionDeck
          session={session}
          npc={npc}
          sceneTitle={sceneTitle}
          isAnimating={isAnimating}
          activeBeat={activeBeat}
          moveOptions={moveOptions}
          effectiveTargetId={effectiveTargetId}
          onSelectTargetId={setSelectedTargetId}
          escapeStatus={escapeStatus}
          escapeChancePct={escapeChancePct}
          defendDodgePct={defendDodgePct}
          agiDiff={agiDiff}
          combatBagCount={combatBagItems.length}
          onOpenBag={() => setBagOpen(true)}
          onSkipChoreography={skipChoreography}
          onSubmitAction={submitCombatAction}
          onFinishCombat={finishCombatSession}
        />
      </div>
    </div>
  )
}
