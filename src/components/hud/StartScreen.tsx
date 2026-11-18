import { resolveAssetUrl } from '../../utils/assetLoader'
import { toggleBgmPlayback, useBgmMetaState } from '../../utils/bgmManager'

export interface StartScreenProps {
  onNewGame: () => void
  onOpenLoadMenu: () => void
  onOpenCompendium: () => void
  existingSaveCount: number
}

export function StartScreen({
  onNewGame,
  onOpenLoadMenu,
  onOpenCompendium,
  existingSaveCount,
}: StartScreenProps) {
  const { enabled: bgmEnabled } = useBgmMetaState()
  const backdropUrl = resolveAssetUrl('/assets/regions/bianliang.jpg')

  return (
    <div
      id="game-start-screen"
      className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden select-none bg-[#120c08]"
    >
      {/* 背景：东京汴梁青绿工笔全景 + 墨金暗角遮罩 */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-45"
        style={{ backgroundImage: `url("${backdropUrl}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120c08]/85 via-[#1a110b]/60 to-[#120c08]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(12,8,5,0.85)_100%)]" />

      {/* 顶部微标与声效开关 */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 pt-5 sm:pt-7">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full border border-[#c89d54]/60 bg-[#23170e]/80 text-[#e8d2a6] text-xs sm:text-sm tracking-widest">
            公元 1050 年 · 宋仁宗皇祐二年 · 正月初一
          </span>
        </div>
        <button
          type="button"
          onClick={() => toggleBgmPlayback()}
          className="px-4 py-1.5 rounded-full border border-[#c89d54]/60 bg-[#23170e]/80 hover:bg-[#3a2617] text-[#f5dfb5] text-xs sm:text-sm transition-colors cursor-pointer"
        >
          {!bgmEnabled ? '🔇 雅乐已静（点击开启）' : '🎵 宋韵雅乐（M 键静音）'}
        </button>
      </header>

      {/* 中央主标题与三大入口 */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-xl flex flex-col items-center text-center">
          {/* 朱印徽记 */}
          <div className="mb-4 px-4 py-1 rounded border border-[#8f1d14] bg-[#8f1d14]/90 text-[#fff5e1] song-serif text-sm sm:text-base tracking-[0.35em] shadow-lg">
            皇祐群侠 · 九州志
          </div>

          {/* 主标题 */}
          <h1 className="song-serif text-5xl sm:text-7xl font-bold tracking-[0.18em] text-[#f7e7c4] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
            北宋立志传
          </h1>
          <p className="mt-3 text-sm sm:text-lg tracking-[0.25em] text-[#d6be96]/90 uppercase">
            Northern Song Chronicles
          </p>

          {/* 装饰分割线 */}
          <div className="my-6 sm:my-8 flex items-center gap-4 w-72 sm:w-96">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c89d54]/80" />
            <span className="text-[#c89d54] text-sm">❖</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c89d54]/80" />
          </div>

          {/* 三大核心入口 */}
          <div className="w-full max-w-md flex flex-col gap-4">
            <button
              type="button"
              onClick={onNewGame}
              className="group relative w-full py-4 px-6 rounded-xl border-2 border-[#d6be96]/70 bg-gradient-to-r from-[#7d1710] via-[#961f16] to-[#7d1710] hover:from-[#961f16] hover:via-[#b0261c] hover:to-[#961f16] text-[#fff8eb] shadow-[0_8px_28px_rgba(143,29,20,0.5)] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between"
            >
              <div className="text-left">
                <div className="song-serif text-2xl sm:text-3xl font-bold tracking-widest">
                  初入江湖
                </div>
                <div className="text-xs sm:text-sm text-[#f5d7b8]/90 mt-0.5">
                  创建新主角 · 年方十二，自开封府启程
                </div>
              </div>
              <span className="text-2xl text-[#f7e7c4] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenLoadMenu}
              className="group w-full py-3.5 px-6 rounded-xl border-2 border-[#b5986e]/80 bg-[#2a1c12]/90 hover:bg-[#3b2719] text-[#f7e7c4] shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between"
            >
              <div className="text-left">
                <div className="flex items-center gap-2.5">
                  <span className="song-serif text-xl sm:text-2xl font-bold tracking-widest">
                    再续前缘
                  </span>
                  {existingSaveCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#c89d54]/25 border border-[#c89d54]/60 text-[#f5dfb5] text-xs">
                      已有 {existingSaveCount} 份卷宗
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-[#cbb693] mt-0.5">
                  读取旧档 · 续写未竟之江湖行迹
                </div>
              </div>
              <span className="text-xl text-[#d6be96] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenCompendium}
              className="group w-full py-3.5 px-6 rounded-xl border-2 border-[#b5986e]/80 bg-[#2a1c12]/90 hover:bg-[#3b2719] text-[#f7e7c4] shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between"
            >
              <div className="text-left">
                <div className="song-serif text-xl sm:text-2xl font-bold tracking-widest">
                  图鉴大赏
                </div>
                <div className="text-xs sm:text-sm text-[#cbb693] mt-0.5">
                  九州舆图 · 三十二大门派 · 千名人物 · 神兵绝学
                </div>
              </div>
              <span className="text-xl text-[#d6be96] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* 底部风物注脚 */}
      <footer className="relative z-10 px-6 pb-5 text-center text-xs sm:text-sm text-[#cbb693]/80 tracking-wider">
        四十三府州山海全景 · 三十二武林门派 · 二百四十六门武学 · 一千零四十七位北宋人物
      </footer>
    </div>
  )
}
