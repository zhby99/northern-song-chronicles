import type { CombatFloatingPopup, CombatRoundBeat } from '../../utils/combatEngine'

interface CombatVfxStageProps {
  activeBeat: CombatRoundBeat | null
  playerName: string
  npcName: string
}

function getPopupColorClasses(style: CombatFloatingPopup['style']): string {
  switch (style) {
    case 'crit':
      return 'text-4xl sm:text-5xl font-black text-[#fff3ad] drop-shadow-[0_4px_16px_rgba(220,38,38,0.95)] scale-110'
    case 'damage':
      return 'text-3xl sm:text-4xl font-extrabold text-[#ff6b57] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]'
    case 'guard':
      return 'text-2xl sm:text-3xl font-bold text-[#9bf2d0] drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]'
    case 'dodge':
      return 'text-2xl sm:text-3xl font-extrabold italic text-[#8cecff] drop-shadow-[0_3px_12px_rgba(8,145,178,0.9)]'
    case 'heal':
      return 'text-2xl sm:text-3xl font-extrabold text-[#7ef7a4] drop-shadow-[0_3px_10px_rgba(6,95,70,0.95)]'
    case 'mp':
      return 'text-xl sm:text-2xl font-bold text-[#7dd3fc] drop-shadow-[0_3px_10px_rgba(12,74,110,0.95)]'
    case 'special':
      return 'text-2xl sm:text-3xl font-extrabold text-[#fde047] drop-shadow-[0_3px_12px_rgba(161,98,7,0.95)]'
    case 'debuff':
      return 'text-xl sm:text-2xl font-bold text-[#e879f9] drop-shadow-[0_3px_10px_rgba(88,28,135,0.95)]'
  }
}

export function CombatVfxStage({ activeBeat, playerName, npcName }: CombatVfxStageProps) {
  if (!activeBeat) return null

  const isPlayerTarget = activeBeat.targetSide === 'player'
  const isNpcTarget = activeBeat.targetSide === 'npc'
  const vfxSide =
    activeBeat.kind === 'item'
      ? activeBeat.actorSide
      : activeBeat.targetSide ?? activeBeat.actorSide

  const mirrorX = activeBeat.actorSide === 'npc'
  const actorLabel =
    activeBeat.actorSide === 'player'
      ? playerName
      : activeBeat.actorSide === 'npc'
        ? npcName
        : null

  const playerPopups = activeBeat.popups.filter((p) => p.side === 'player')
  const npcPopups = activeBeat.popups.filter((p) => p.side === 'npc')

  return (
    <>
      {/* 关键帧动画定义（纯 GPU transform + opacity，60fps 丝滑无卡顿） */}
      <style>{`
        @keyframes cbtSlashSweep {
          0% { opacity: 0; transform: scale(0.45) rotate(-18deg); }
          22% { opacity: 1; transform: scale(1.06) rotate(2deg); }
          100% { opacity: 0; transform: scale(1.22) rotate(8deg); }
        }
        @keyframes cbtShockRing {
          0% { opacity: 0.95; transform: scale(0.28); }
          65% { opacity: 0.75; transform: scale(1.08); }
          100% { opacity: 0; transform: scale(1.38); }
        }
        @keyframes cbtPopupFloat {
          0% { opacity: 0; transform: translateY(22px) scale(0.65); }
          20% { opacity: 1; transform: translateY(-6px) scale(1.12); }
          36% { opacity: 1; transform: translateY(-12px) scale(1.0); }
          82% { opacity: 1; transform: translateY(-28px) scale(1.0); }
          100% { opacity: 0; transform: translateY(-44px) scale(0.94); }
        }
        @keyframes cbtBannerSlam {
          0% { opacity: 0; transform: translateY(-14px) scale(1.18); }
          22% { opacity: 1; transform: translateY(0) scale(1); }
          86% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-6px) scale(0.97); }
        }
        @keyframes cbtCritFlash {
          0% { opacity: 0.72; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* 1. 暴击 / 天阶神功全屏边缘金红震颤光晕 */}
      {(activeBeat.isCrit || activeBeat.isHeavenTier) && activeBeat.kind === 'attack' && (
        <div
          key={`flash-${activeBeat.id}`}
          className="pointer-events-none fixed inset-0 z-15"
          style={{
            background: activeBeat.isCrit
              ? 'radial-gradient(circle at center, rgba(255,235,150,0.18) 0%, rgba(185,28,28,0.42) 100%)'
              : 'radial-gradient(circle at center, rgba(253,224,71,0.14) 0%, rgba(180,83,9,0.32) 100%)',
            animation: 'cbtCritFlash 340ms ease-out forwards',
          }}
        />
      )}

      {/* 2. 舞台正上方：宋韵水墨朱砂招式唱名横披 */}
      {activeBeat.bannerTitle && (
        <div
          key={`banner-${activeBeat.id}`}
          className="pointer-events-none fixed inset-x-0 top-[148px] sm:top-[132px] z-30 flex justify-center px-4"
          style={{ animation: 'cbtBannerSlam 560ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div
            className={`px-6 py-2 rounded-full border-2 shadow-2xl backdrop-blur-md text-center ${
              activeBeat.isCrit
                ? 'bg-gradient-to-r from-[#450a0a]/92 via-[#7f1d1d]/95 to-[#450a0a]/92 border-[#fde047]'
                : activeBeat.isHeavenTier
                  ? 'bg-gradient-to-r from-[#2e1605]/92 via-[#5c2b09]/95 to-[#2e1605]/92 border-[#f59e0b]'
                  : 'bg-gradient-to-r from-[#170f0a]/90 via-[#2b1b10]/94 to-[#170f0a]/90 border-[#d4a455]/80'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {actorLabel && (
                <span className="px-2 py-0.5 rounded bg-black/45 border border-[#e6c27a]/40 text-[11px] text-[#f5dfb5]">
                  {actorLabel}
                </span>
              )}
              <span
                className={`song-serif text-lg sm:text-2xl font-black tracking-widest ${
                  activeBeat.isCrit
                    ? 'text-[#fff3a8] drop-shadow-[0_2px_10px_rgba(250,204,21,0.8)]'
                    : activeBeat.isHeavenTier
                      ? 'text-[#fde68a]'
                      : 'text-[#faecd2]'
                }`}
              >
                {activeBeat.bannerTitle}
              </span>
              {activeBeat.isHeavenTier && (
                <span className="px-1.5 py-0.5 rounded bg-[#92400e] border border-[#fde68a] text-[10px] font-bold text-[#fef3c7]">
                  天阶绝学
                </span>
              )}
            </div>
            {activeBeat.bannerSubtitle && (
              <div className="text-[11px] sm:text-xs text-[#e5cfa8] mt-0.5 tracking-wide">
                {activeBeat.bannerSubtitle}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. 命中目标胸口处的兵刃刀光剑影 / 罡风掌印 / 护体气罩 SVG 特效 */}
      {vfxSide && activeBeat.vfxCategory && activeBeat.kind !== 'dodge' && (
        <div
          key={`vfx-${activeBeat.id}`}
          className={`pointer-events-none fixed bottom-[24vh] z-25 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] flex items-center justify-center ${
            vfxSide === 'player'
              ? 'left-[8vw] lg:left-[14vw]'
              : 'right-[8vw] lg:right-[14vw]'
          }`}
          style={{
            transform: mirrorX ? 'scaleX(-1)' : undefined,
          }}
        >
          {/* 守御金钟气罩叠加 */}
          {(activeBeat.isGuarded || activeBeat.vfxCategory === 'guard') && (
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 w-full h-full"
              style={{ animation: 'cbtShockRing 520ms ease-out forwards' }}
            >
              <circle
                cx="120"
                cy="120"
                r="88"
                fill="rgba(52, 211, 153, 0.14)"
                stroke="#6ee7b7"
                strokeWidth="4"
                strokeDasharray="14 6"
              />
              <circle
                cx="120"
                cy="120"
                r="72"
                fill="none"
                stroke="#fde68a"
                strokeWidth="2.5"
              />
            </svg>
          )}

          {/* 剑法：青霜寒芒新月剑弧 + 十字剑星 */}
          {activeBeat.vfxCategory === 'sword' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtSlashSweep 440ms ease-out forwards' }}
            >
              <defs>
                <linearGradient id="swordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="55%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 28 215 Q 138 92 234 26 Q 162 128 52 232 Z"
                fill="url(#swordGrad)"
              />
              <path
                d="M 45 190 Q 130 118 225 48"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <polygon
                points="146,104 156,74 166,104 196,114 166,124 156,154 146,124 116,114"
                fill="#e0f2fe"
              />
            </svg>
          )}

          {/* 刀法：赤金烈刃重劈狂飙 */}
          {activeBeat.vfxCategory === 'blade' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtSlashSweep 460ms ease-out forwards' }}
            >
              <defs>
                <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M 20 42 Q 175 95 238 228 Q 130 142 14 72 Z"
                fill="url(#bladeGrad)"
              />
              <path
                d="M 32 56 Q 162 112 226 218"
                stroke="#fffbeb"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}

          {/* 拳掌：金龙罡风掌印气浪 */}
          {activeBeat.vfxCategory === 'palm' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtShockRing 480ms ease-out forwards' }}
            >
              <circle
                cx="130"
                cy="130"
                r="92"
                fill="rgba(251, 191, 36, 0.18)"
                stroke="#fbbf24"
                strokeWidth="6"
              />
              <circle
                cx="130"
                cy="130"
                r="58"
                fill="rgba(239, 68, 68, 0.28)"
                stroke="#fef08a"
                strokeWidth="4"
              />
              <circle cx="130" cy="130" r="24" fill="#fffbeb" />
            </svg>
          )}

          {/* 指法：纯阳破穴金芒贯透 */}
          {activeBeat.vfxCategory === 'finger' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtSlashSweep 400ms ease-out forwards' }}
            >
              <line
                x1="12"
                y1="142"
                x2="236"
                y2="112"
                stroke="#fde047"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="142"
                x2="236"
                y2="112"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle
                cx="168"
                cy="121"
                r="34"
                fill="rgba(254, 240, 138, 0.35)"
                stroke="#fef08a"
                strokeWidth="4"
              />
            </svg>
          )}

          {/* 枪法/棍棒：横扫千军长兵劲芒 */}
          {activeBeat.vfxCategory === 'polearm' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtSlashSweep 450ms ease-out forwards' }}
            >
              <ellipse
                cx="130"
                cy="130"
                rx="112"
                ry="42"
                transform="rotate(-22 130 130)"
                fill="rgba(245, 158, 11, 0.2)"
                stroke="#fcd34d"
                strokeWidth="6"
              />
              <line
                x1="18"
                y1="176"
                x2="242"
                y2="84"
                stroke="#fffbeb"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* 暗器：漫天寒星破空急雨 */}
          {activeBeat.vfxCategory === 'hidden' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtSlashSweep 420ms ease-out forwards' }}
            >
              {[
                [24, 78, 206, 108],
                [18, 128, 224, 132],
                [32, 178, 202, 158],
                [48, 54, 188, 92],
                [44, 204, 194, 176],
              ].map(([x1, y1, x2, y2], idx) => (
                <g key={idx}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#e0f2fe"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx={x2} cy={y2} r="6" fill="#38bdf8" />
                </g>
              ))}
            </svg>
          )}

          {/* 音功：宫商音波涟漪阵 */}
          {activeBeat.vfxCategory === 'sonic' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtShockRing 520ms ease-out forwards' }}
            >
              <circle cx="130" cy="130" r="96" fill="none" stroke="#5eead4" strokeWidth="4" />
              <circle cx="130" cy="130" r="68" fill="none" stroke="#99f6e4" strokeWidth="3.5" />
              <circle cx="130" cy="130" r="40" fill="rgba(45,212,191,0.22)" stroke="#ccfbf1" strokeWidth="3" />
            </svg>
          )}

          {/* 毒功/施毒：紫碧蚀脉瘴雾 */}
          {activeBeat.vfxCategory === 'poison' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtShockRing 520ms ease-out forwards' }}
            >
              <circle
                cx="130"
                cy="130"
                r="86"
                fill="rgba(168, 85, 247, 0.25)"
                stroke="#c084fc"
                strokeWidth="5"
                strokeDasharray="10 8"
              />
              <circle
                cx="130"
                cy="130"
                r="52"
                fill="rgba(16, 185, 129, 0.28)"
                stroke="#34d399"
                strokeWidth="4"
              />
            </svg>
          )}

          {/* 疗伤/服丹：翠玉金莲周天瑞气 */}
          {activeBeat.vfxCategory === 'heal' && (
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              style={{ animation: 'cbtShockRing 560ms ease-out forwards' }}
            >
              <circle
                cx="130"
                cy="130"
                r="82"
                fill="rgba(74, 222, 128, 0.18)"
                stroke="#86efac"
                strokeWidth="4"
              />
              <circle
                cx="130"
                cy="130"
                r="48"
                fill="rgba(253, 224, 71, 0.2)"
                stroke="#fde047"
                strokeWidth="3"
              />
            </svg>
          )}
        </div>
      )}

      {/* 4. 左侧少侠头顶/胸前跳字组 */}
      {playerPopups.length > 0 && (
        <div
          key={`p-pops-${activeBeat.id}`}
          className="pointer-events-none fixed left-[8vw] lg:left-[15vw] bottom-[48vh] z-35 flex flex-col items-center gap-1.5"
        >
          {playerPopups.map((pop, idx) => (
            <div
              key={pop.id}
              className="flex flex-col items-center text-center"
              style={{
                animation: `cbtPopupFloat 660ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 70}ms both`,
              }}
            >
              <span className={`song-serif tracking-wider ${getPopupColorClasses(pop.style)}`}>
                {pop.text}
              </span>
              {pop.subText && (
                <span className="px-2 py-0.5 -mt-0.5 rounded bg-black/75 border border-[#e5c178]/50 text-[11px] font-bold text-[#ffebc2] shadow">
                  {pop.subText}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 5. 右侧对手头顶/胸前跳字组 */}
      {npcPopups.length > 0 && (
        <div
          key={`n-pops-${activeBeat.id}`}
          className="pointer-events-none fixed right-[8vw] lg:right-[15vw] bottom-[48vh] z-35 flex flex-col items-center gap-1.5"
        >
          {npcPopups.map((pop, idx) => (
            <div
              key={pop.id}
              className="flex flex-col items-center text-center"
              style={{
                animation: `cbtPopupFloat 660ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 70}ms both`,
              }}
            >
              <span className={`song-serif tracking-wider ${getPopupColorClasses(pop.style)}`}>
                {pop.text}
              </span>
              {pop.subText && (
                <span className="px-2 py-0.5 -mt-0.5 rounded bg-black/75 border border-[#e5c178]/50 text-[11px] font-bold text-[#ffebc2] shadow">
                  {pop.subText}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 6. 受击瞬间角色红光受创滤镜提示（供辅助辨识受创侧） */}
      {activeBeat.kind === 'attack' && (isPlayerTarget || isNpcTarget) && (
        <span className="sr-only">
          {isPlayerTarget ? playerName : npcName}受创
        </span>
      )}
    </>
  )
}
