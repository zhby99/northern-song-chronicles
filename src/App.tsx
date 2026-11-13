import { useEffect } from 'react'
import { BottomHud } from './components/hud/BottomHud'
import { ContextInspectorCard } from './components/hud/ContextInspectorCard'
import { MapTooltip } from './components/hud/MapTooltip'
import { TopHud } from './components/hud/TopHud'
import { TravelBanner } from './components/hud/TravelBanner'
import { RegionMapCanvas } from './components/map/RegionMapCanvas'
import { WorldMapCanvas } from './components/map/WorldMapCanvas'
import { SystemMenuModal } from './components/menu/SystemMenuModal'
import { useGameStore } from './store/useGameStore'
import { syncBgmSceneContext, toggleBgmPlayback } from './utils/bgmManager'
import { purgeLegacySaveDatabases } from './utils/saveManager'

export function App() {
  const viewMode = useGameStore((s) => s.viewMode)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const isTraveling = useGameStore((s) => s.traveling !== null)
  const menuOpen = useGameStore((s) => s.menuOpen)
  const compendiumOpen = useGameStore((s) => s.compendiumOpen)
  const stepTravelTick = useGameStore((s) => s.stepTravelTick)
  const openMenu = useGameStore((s) => s.openMenu)
  const closeMenu = useGameStore((s) => s.closeMenu)
  const openCompendium = useGameStore((s) => s.openCompendium)
  const closeCompendium = useGameStore((s) => s.closeCompendium)

  // 启动时自动清除旧版浏览器残留存档库
  useEffect(() => {
    purgeLegacySaveDatabases()
  }, [])

  // Sync scene/region BGM playlist (world/1,2... vs regions/<id>/1,2...) automatically
  useEffect(() => {
    syncBgmSceneContext(viewMode, activeRegionId)
  }, [viewMode, activeRegionId])

  // Global ESC shortcut for system/compendium menu, G for Compendium, & M for BGM toggle
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (compendiumOpen) closeCompendium()
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
        if (e.key === 'm' || e.key === 'M') {
          toggleBgmPlayback()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, compendiumOpen, openMenu, closeMenu, openCompendium, closeCompendium])

  // 九州山海行路时钟：每 0.25s 前进一步（一个时辰），一日十二时辰累计 3.0s
  useEffect(() => {
    if (!isTraveling) return
    const timer = window.setInterval(() => {
      stepTravelTick()
    }, 250)
    return () => window.clearInterval(timer)
  }, [isTraveling, stepTravelTick])

  return (
    <main
      id="map-viewport"
      className="w-screen h-screen relative overflow-hidden ocean-backdrop cursor-grab active:cursor-grabbing"
    >
      <TopHud />
      <TravelBanner />

      {viewMode === 'world' ? <WorldMapCanvas /> : <RegionMapCanvas />}

      <BottomHud />
      <ContextInspectorCard />
      <MapTooltip />
      <SystemMenuModal />
    </main>
  )
}

export default App
