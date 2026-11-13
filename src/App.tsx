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

export function App() {
  const viewMode = useGameStore((s) => s.viewMode)
  const isTraveling = useGameStore((s) => s.traveling !== null)
  const menuOpen = useGameStore((s) => s.menuOpen)
  const stepTravelTick = useGameStore((s) => s.stepTravelTick)
  const openMenu = useGameStore((s) => s.openMenu)
  const closeMenu = useGameStore((s) => s.closeMenu)

  // Global ESC shortcut for system menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) closeMenu()
        else openMenu()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, openMenu, closeMenu])

  // Road travel interval loop when traveling on World Map
  useEffect(() => {
    if (!isTraveling) return
    const timer = window.setInterval(() => {
      stepTravelTick()
    }, 220)
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
