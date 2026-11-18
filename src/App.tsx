import { lazy, Suspense, useEffect, useState } from 'react'
import type { BootIntent } from './components/GameWorkspace'
import { StartScreen } from './components/hud/StartScreen'
import { syncBgmSceneContext, toggleBgmPlayback } from './utils/bgmManager'
import { peekExistingSaveCount } from './utils/saveStorageProbe'

const GameWorkspace = lazy(() =>
  import('./components/GameWorkspace').then((m) => ({ default: m.GameWorkspace })),
)

export function App() {
  const [bootIntent, setBootIntent] = useState<BootIntent | null>(null)
  const [bootSaveCount, setBootSaveCount] = useState(0)

  useEffect(() => {
    syncBgmSceneContext('region', 'bianliang')
    let cancelled = false
    void peekExistingSaveCount().then((count) => {
      if (!cancelled) setBootSaveCount(count)
    })

    // 首屏完成绘制后，利用空闲窗口在后台静默预热主工作区与数据库分包，兼顾瞬开首屏与零等待入局
    let timerId: number | null = null
    const rafId = window.requestAnimationFrame(() => {
      timerId = window.setTimeout(() => {
        void import('./components/GameWorkspace')
      }, 80)
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(rafId)
      if (timerId !== null) window.clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (bootIntent !== null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'm' || e.key === 'M') {
        toggleBgmPlayback()
      } else if (e.key === 'g' || e.key === 'G') {
        setBootIntent('compendium')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [bootIntent])

  if (bootIntent === null) {
    return (
      <main id="map-viewport" className="w-screen h-screen relative overflow-hidden bg-[#120c08]">
        <StartScreen
          onNewGame={() => setBootIntent('newGame')}
          onOpenLoadMenu={() => setBootIntent('loadMenu')}
          onOpenCompendium={() => setBootIntent('compendium')}
          existingSaveCount={bootSaveCount}
        />
      </main>
    )
  }

  return (
    <Suspense
      fallback={
        <main className="w-screen h-screen flex items-center justify-center bg-[#120c08] text-[#f5dfb5] song-serif text-base tracking-widest">
          正在展卷《皇祐九州百代典籍》……
        </main>
      }
    >
      <GameWorkspace initialIntent={bootIntent} />
    </Suspense>
  )
}

export default App
