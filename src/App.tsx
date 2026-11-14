import { lazy, Suspense, useEffect } from 'react'
import { CombatOverlay } from './components/combat/CombatOverlay'
import { BottomHud } from './components/hud/BottomHud'
import { ContextInspectorCard } from './components/hud/ContextInspectorCard'
import { GameOverModal } from './components/hud/GameOverModal'
import { MapTooltip } from './components/hud/MapTooltip'
import { NpcInteractionOverlay } from './components/hud/NpcInteractionOverlay'
import { TopHud } from './components/hud/TopHud'
import { TravelBanner } from './components/hud/TravelBanner'
import { RegionMapCanvas } from './components/map/RegionMapCanvas'
import { StorySceneModal } from './components/quest/StorySceneModal'
import { useGameStore } from './store/useGameStore'
import { syncBgmSceneContext, toggleBgmPlayback } from './utils/bgmManager'
import { purgeLegacySaveDatabases } from './utils/saveManager'

const WorldMapCanvas = lazy(() =>
  import('./components/map/WorldMapCanvas').then((m) => ({ default: m.WorldMapCanvas })),
)

const SystemMenuModal = lazy(() =>
  import('./components/menu/SystemMenuModal').then((m) => ({ default: m.SystemMenuModal })),
)

export function App() {
  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const isTraveling = useGameStore((s) => s.traveling !== null)
  const menuOpen = useGameStore((s) => s.menuOpen)
  const activeMenuTab = useGameStore((s) => s.activeMenuTab)
  const compendiumOpen = useGameStore((s) => s.compendiumOpen)
  const activeNpcInteraction = useGameStore((s) => s.activeNpcInteraction)
  const activeCombat = useGameStore((s) => s.activeCombat)
  const activeStoryScene = useGameStore((s) => s.activeStoryScene)
  const gameOver = useGameStore((s) => s.gameOver)
  const stepTravelTick = useGameStore((s) => s.stepTravelTick)
  const openMenu = useGameStore((s) => s.openMenu)
  const closeMenu = useGameStore((s) => s.closeMenu)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const closeCompendium = useGameStore((s) => s.closeCompendium)
  const closeNpcInteraction = useGameStore((s) => s.closeNpcInteraction)

  // 启动时自动清除旧版浏览器残留存档库，并在首屏空闲后静默预热菜单壳层
  useEffect(() => {
    purgeLegacySaveDatabases()
    const timer = window.setTimeout(() => {
      void import('./components/menu/SystemMenuModal')
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [])

  // Sync scene/region BGM playlist (world/1,2... vs regions/<id>/1,2...) automatically
  useEffect(() => {
    syncBgmSceneContext(viewMode, activeRegionId)
  }, [viewMode, activeRegionId])

  // Global ESC shortcut for system/compendium menu, G for Compendium, J for Quest Journal, & M for BGM toggle
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeCombat || activeStoryScene) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'm' || e.key === 'M')) {
          toggleBgmPlayback()
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
        if (e.key === 'g' || e.key === 'G') {
          if (compendiumOpen) closeCompendium()
          else openCompendium()
          return
        }
        if (e.key === 'j' || e.key === 'J') {
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
    menuOpen,
    activeMenuTab,
    compendiumOpen,
    activeNpcInteraction,
    activeCombat,
    activeStoryScene,
    gameOver,
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

  return (
    <main
      id="map-viewport"
      className="w-screen h-screen relative overflow-hidden ocean-backdrop cursor-grab active:cursor-grabbing"
    >
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

      {!activeNpcInteraction && !activeStoryScene && !activeCombat && !gameOver && <BottomHud />}
      {!activeNpcInteraction && !activeStoryScene && !activeCombat && !gameOver && (
        <ContextInspectorCard />
      )}
      <MapTooltip />
      {activeNpcInteraction && !activeStoryScene && !activeCombat && !gameOver && (
        <NpcInteractionOverlay
          key={activeNpcInteraction.id ?? activeNpcInteraction.name}
        />
      )}
      {activeStoryScene && !activeCombat && !gameOver && <StorySceneModal />}
      {activeCombat && <CombatOverlay />}
      {gameOver && <GameOverModal />}

      {(menuOpen || compendiumOpen) && (
        <Suspense fallback={null}>
          <SystemMenuModal />
        </Suspense>
      )}
    </main>
  )
}

export default App
