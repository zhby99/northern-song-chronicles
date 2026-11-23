import { lazy, Suspense, useEffect, useState } from 'react'
import { NPC_DB_MAP, NPCS_DB } from '../data/gameDb'
import { buildNpcCombatant, createCombatSession } from '../engine/combat'
import { useGameStore } from '../store/useGameStore'
import { syncBgmSceneContext, toggleBgmPlayback } from '../utils/bgmManager'
import { setCombatSfxEnabled } from '../utils/combatSfx'
import { purgeLegacySaveDatabases } from '../utils/saveManager'
import { BottomHud } from './hud/BottomHud'
import { CharacterCreationModal } from './hud/CharacterCreationModal'
import { ContextInspectorCard } from './hud/ContextInspectorCard'
import { CultivationOverlay } from './hud/CultivationOverlay'
import { GameOverModal } from './hud/GameOverModal'
import { MapTooltip } from './hud/MapTooltip'
import { NpcInteractionOverlay } from './hud/NpcInteractionOverlay'
import { QuestTrackerPanel } from './hud/QuestTrackerPanel'
import { StartScreen } from './hud/StartScreen'
import { TopHud } from './hud/TopHud'
import { TravelBanner } from './hud/TravelBanner'
import { RegionMapCanvas } from './map/RegionMapCanvas'
import { StorySceneModal } from './quest/StorySceneModal'

const WorldMapCanvas = lazy(() =>
  import('./map/WorldMapCanvas').then((m) => ({ default: m.WorldMapCanvas })),
)

const SystemMenuModal = lazy(() =>
  import('./menu/SystemMenuModal').then((m) => ({ default: m.SystemMenuModal })),
)

const CombatOverlay = lazy(() =>
  import('./combat/CombatOverlay').then((m) => ({ default: m.CombatOverlay })),
)

export type BootIntent = 'newGame' | 'loadMenu' | 'compendium' | 'demoCombat'

interface GameWorkspaceProps {
  initialIntent: BootIntent
}

export function GameWorkspace({ initialIntent }: GameWorkspaceProps) {
  const [creatingNewGame, setCreatingNewGame] = useState(() => initialIntent === 'newGame')
  const characterCreated = useGameStore((s) => s.characterCreated)
  const [prevCharacterCreated, setPrevCharacterCreated] = useState(characterCreated)
  if (characterCreated !== prevCharacterCreated) {
    setPrevCharacterCreated(characterCreated)
    if (characterCreated && creatingNewGame) {
      setCreatingNewGame(false)
    }
  }

  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const isTraveling = useGameStore((s) => s.traveling !== null)
  const isCultivating = useGameStore((s) => s.cultivationSession !== null)
  const menuOpen = useGameStore((s) => s.menuOpen)
  const activeMenuTab = useGameStore((s) => s.activeMenuTab)
  const compendiumOpen = useGameStore((s) => s.compendiumOpen)
  const activeNpcInteraction = useGameStore((s) => s.activeNpcInteraction)
  const activeCombat = useGameStore((s) => s.activeCombat)
  const activeStoryScene = useGameStore((s) => s.activeStoryScene)
  const gameOver = useGameStore((s) => s.gameOver)
  const saveSlots = useGameStore((s) => s.saveSlots)
  const refreshSaveSlots = useGameStore((s) => s.refreshSaveSlots)
  const stepTravelTick = useGameStore((s) => s.stepTravelTick)
  const stepCultivationTick = useGameStore((s) => s.stepCultivationTick)
  const stopCultivationEarly = useGameStore((s) => s.stopCultivationEarly)
  const openMenu = useGameStore((s) => s.openMenu)
  const closeMenu = useGameStore((s) => s.closeMenu)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const closeCompendium = useGameStore((s) => s.closeCompendium)
  const closeNpcInteraction = useGameStore((s) => s.closeNpcInteraction)

  useEffect(() => {
    purgeLegacySaveDatabases()
    void refreshSaveSlots()
    if (initialIntent === 'loadMenu') {
      openMenu('load')
    } else if (initialIntent === 'compendium') {
      openCompendium()
    } else if (initialIntent === 'demoCombat') {
      try {
        const params = new URLSearchParams(window.location.search)
        if (params.get('mute') === '1') {
          setCombatSfxEnabled(false)
        }
      } catch {
        // ignore
      }
      const st = useGameStore.getState()
      const murongRec = NPC_DB_MAP['NPC-0104'] ?? NPCS_DB[0]
      const xiaoRec = NPC_DB_MAP['NPC-0105'] ?? NPCS_DB[1]
      if (murongRec && xiaoRec && !st.activeCombat) {
        const murongCombatant = {
          ...buildNpcCombatant(
            {
              id: murongRec.id,
              name: murongRec.name,
              title: murongRec.title,
              realm: murongRec.realm,
              factionId: murongRec.factionId,
              factionName: murongRec.factionName,
              talk: '以彼之道，还施彼身！',
            },
            { unitId: 'ally-0', team: 'ally' },
          ),
          isPlayer: true,
        }
        const xiaoNode = {
          id: xiaoRec.id,
          name: xiaoRec.name,
          title: xiaoRec.title,
          realm: xiaoRec.realm,
          factionId: xiaoRec.factionId,
          factionName: xiaoRec.factionName,
          talk: '少林藏经阁一别，今日正好分个高下！',
        }
        const session = createCombatSession({
          mode: 'spar',
          duelStakes: 'spar',
          player: murongCombatant,
          npcNode: xiaoNode,
        })
        useGameStore.setState({
          characterCreated: true,
          playerName: murongRec.name,
          playerPortraitId: 'hero-male-1',
          viewMode: 'building',
          currentNodeId: 'shaolin',
          activeRegionId: 'shaolin',
          activeBuildingInteriorId: 'sl_cangjing',
          hp: murongCombatant.hp,
          maxHp: murongCombatant.maxHp,
          mp: murongCombatant.mp,
          maxMp: murongCombatant.maxMp,
          agility: murongCombatant.agility,
          res: murongCombatant.res,
          equipped: { ...murongCombatant.equipped },
          equippedArts: { ...murongCombatant.equippedArts },
          learnedArts: murongCombatant.learnedArts.map((e) => ({ ...e })),
          inventory: [{ itemId: 'ITM-MED-121', qty: 3 }],
          activeCombat: session,
          menuOpen: false,
          compendiumOpen: false,
          tooltip: null,
        })
      }
    } else {
      const timer = window.setTimeout(() => {
        void import('./menu/SystemMenuModal')
      }, 900)
      return () => window.clearTimeout(timer)
    }
  }, [initialIntent, openCompendium, openMenu, refreshSaveSlots])

  // Sync scene/region BGM playlist (world/1,2... vs regions/<id>/1,2...) automatically
  useEffect(() => {
    syncBgmSceneContext(viewMode, activeRegionId)
  }, [viewMode, activeRegionId])

  // Global ESC shortcut for cultivation/system/compendium menu, G for Compendium, J for Quest Journal, & M for BGM toggle
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeCombat || activeStoryScene) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'm' || e.key === 'M')) {
          toggleBgmPlayback()
        }
        return
      }
      if (!characterCreated) {
        if (e.key === 'Escape') {
          if (compendiumOpen) closeCompendium()
          else if (menuOpen) closeMenu()
          else if (creatingNewGame) setCreatingNewGame(false)
          return
        }
        const isTypingTarget =
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        if (!e.ctrlKey && !e.metaKey && !e.altKey && !isTypingTarget) {
          if (e.key === 'g' || e.key === 'G') {
            if (compendiumOpen) closeCompendium()
            else openCompendium()
          } else if (e.key === 'm' || e.key === 'M') {
            toggleBgmPlayback()
          }
        }
        return
      }
      if (gameOver) {
        if (e.key === 'Escape' && menuOpen) {
          closeMenu()
        }
        return
      }
      if (e.key === 'Escape') {
        if (isCultivating && (menuOpen || compendiumOpen)) {
          if (compendiumOpen) closeCompendium()
          else closeMenu()
          return
        }
        if (isCultivating) {
          stopCultivationEarly()
          return
        }
        if (activeNpcInteraction) closeNpcInteraction()
        else if (compendiumOpen) closeCompendium()
        else if (menuOpen) closeMenu()
        else openMenu()
        return
      }
      const isTypingTarget =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      if (!e.ctrlKey && !e.metaKey && !e.altKey && !isTypingTarget) {
        if (!isCultivating && (e.key === 'g' || e.key === 'G')) {
          if (compendiumOpen) closeCompendium()
          else openCompendium()
          return
        }
        if (!isCultivating && (e.key === 'j' || e.key === 'J')) {
          if (menuOpen && activeMenuTab === 'quests') closeMenu()
          else openMenu('quests')
          return
        }
        if (e.key === 'm' || e.key === 'M') {
          toggleBgmPlayback()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    characterCreated,
    creatingNewGame,
    isCultivating,
    menuOpen,
    activeMenuTab,
    compendiumOpen,
    activeNpcInteraction,
    activeCombat,
    activeStoryScene,
    gameOver,
    stopCultivationEarly,
    openMenu,
    closeMenu,
    openCompendium,
    closeCompendium,
    closeNpcInteraction,
  ])

  // 九州山海行路时钟：每 0.25s 前进一步（一个时辰），一日十二时辰累计 3.0s
  useEffect(() => {
    if (!isTraveling || gameOver || activeCombat || activeStoryScene) return
    const timer = window.setInterval(() => {
      stepTravelTick()
    }, 250)
    return () => window.clearInterval(timer)
  }, [isTraveling, gameOver, activeCombat, activeStoryScene, stepTravelTick])

  // 闭关吐纳与十艺修行时钟：每 0.1s 走一步（可于弹窗内调节 1 时辰 ~ 1 日/0.1s）
  useEffect(() => {
    if (!isCultivating || gameOver || activeCombat || activeStoryScene) return
    const timer = window.setInterval(() => {
      stepCultivationTick()
    }, 100)
    return () => window.clearInterval(timer)
  }, [isCultivating, gameOver, activeCombat, activeStoryScene, stepCultivationTick])

  const existingSaveCount = Object.values(saveSlots).filter(Boolean).length

  return (
    <main
      id="map-viewport"
      className="w-screen h-screen relative overflow-hidden ocean-backdrop cursor-grab active:cursor-grabbing"
    >
      {characterCreated && (
        <>
          <TopHud />
          <TravelBanner />

          {viewMode === 'world' ? (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-[#1b130d] text-[#f5dfb5] song-serif text-sm">
                  正在铺展《皇祐九州山海舆图》……
                </div>
              }
            >
              <WorldMapCanvas />
            </Suspense>
          ) : (
            <RegionMapCanvas />
          )}

          {!isCultivating &&
            !activeNpcInteraction &&
            !activeStoryScene &&
            !activeCombat &&
            !gameOver && (
              <>
                <BottomHud />
                <QuestTrackerPanel />
                <ContextInspectorCard />
              </>
            )}
          <MapTooltip />
          {isCultivating && !activeCombat && !activeStoryScene && !gameOver && (
            <CultivationOverlay />
          )}
          {activeNpcInteraction && !activeStoryScene && !activeCombat && !gameOver && (
            <NpcInteractionOverlay
              key={activeNpcInteraction.id ?? activeNpcInteraction.name}
            />
          )}
          {activeStoryScene && !activeCombat && !gameOver && <StorySceneModal />}
          {activeCombat && (
            <Suspense fallback={null}>
              <CombatOverlay />
            </Suspense>
          )}
          {gameOver && <GameOverModal />}
        </>
      )}

      {(menuOpen || compendiumOpen) && (
        <Suspense fallback={null}>
          <SystemMenuModal />
        </Suspense>
      )}
      {!characterCreated && !menuOpen && !compendiumOpen && (
        creatingNewGame ? (
          <CharacterCreationModal onBack={() => setCreatingNewGame(false)} />
        ) : (
          <StartScreen
            onNewGame={() => setCreatingNewGame(true)}
            onOpenLoadMenu={() => openMenu('load')}
            onOpenCompendium={() => openCompendium()}
            existingSaveCount={existingSaveCount}
          />
        )
      )}
    </main>
  )
}
