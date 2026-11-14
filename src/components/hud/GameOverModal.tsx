import { useGameStore } from '../../store/useGameStore'

export function GameOverModal() {
  const gameOver = useGameStore((s) => s.gameOver)
  const menuOpen = useGameStore((s) => s.menuOpen)
  const openMenu = useGameStore((s) => s.openMenu)
  const restartAfterGameOver = useGameStore((s) => s.restartAfterGameOver)

  if (!gameOver || menuOpen) return null

  return (
    <div
      className="fixed inset-0 z-45 bg-[#0c0705]/92 backdrop-blur-md flex items-center justify-center p-4 select-none"
      role="alertdialog"
      aria-label="江湖终局"
    >
      <div className="w-full max-w-2xl rounded-xl border-2 border-[#8f1d14] bg-gradient-to-b from-[#21130d] via-[#190e09] to-[#120906] text-[#f5dfb5] shadow-[0_24px_80px_rgba(0,0,0,0.92)] overflow-hidden">
        {/* 顶部朱砂丧幡栏 */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#4a0e0a] via-[#6e150f] to-[#4a0e0a] border-b border-[#b57952]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#1c0a08] border border-[#d68c6b] text-[#ffd4c7] text-xs font-bold tracking-widest song-serif">
              黄泉路远 · 壮志未酬
            </span>
            <span className="text-xs font-mono text-[#f0c7a8]">{gameOver.songDate}</span>
          </div>
          <span className="text-xs text-[#e8bfa0]">命殒之地：{gameOver.locationName}</span>
        </div>

        {/* 主体碑文 */}
        <div className="px-7 py-8 space-y-5 text-center">
          <div className="space-y-2">
            <div className="text-xs tracking-[0.35em] text-[#c78d6b] uppercase">
              Northern Song Chronicles · Game Over
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold song-serif text-[#ffded6] tracking-wider">
              {gameOver.reasonTitle}
            </h2>
          </div>

          <div className="mx-auto max-w-xl px-5 py-4 rounded-lg bg-[#2b1911]/85 border border-[#7c4d32]/70 text-sm sm:text-base text-[#f0dec2] leading-relaxed">
            {gameOver.reasonDetail}
          </div>

          {gameOver.killerName && (
            <div className="text-xs sm:text-sm text-[#d4a887] font-medium">
              终结对手：<span className="text-[#ffb8ab] font-bold">【{gameOver.killerName}】</span>
            </div>
          )}

          <p className="text-xs text-[#a8896c]">
            江湖路险，非切磋之生死相搏一着不慎便是万劫不复。少侠可启封往昔卷宗回溯天命，或重入皇祐二年正月初一再谱新篇。
          </p>
        </div>

        {/* 底部操作按钮 */}
        <div className="px-6 py-4 bg-[#170d09] border-t border-[#5c3a24]/70 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => openMenu('load')}
            className="px-5 py-2.5 rounded-lg bg-[#3d2814] hover:bg-[#54371c] border border-[#c89d54] text-[#fff4de] song-serif text-sm font-bold shadow-lg cursor-pointer transition-colors"
          >
            读取存档卷宗
          </button>
          <button
            type="button"
            onClick={restartAfterGameOver}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-[#9c261b] to-[#701810] hover:from-[#b82f22] hover:to-[#871d14] border border-[#f0be69]/85 text-[#fff0cc] song-serif text-sm font-bold shadow-lg cursor-pointer transition-colors"
          >
            重入皇祐江湖（重新开始）
          </button>
        </div>
      </div>
    </div>
  )
}
