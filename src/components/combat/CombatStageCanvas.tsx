import { Crosshair } from 'lucide-react'
import { lazy, Suspense } from 'react'
import type { CompiledBuildingRecord } from '../../types/game'
import { useLazyImage } from '../../utils/assetLoader'
import type {
  CombatantState,
  CombatOutcome,
  CombatRoundBeat,
} from '../../engine/combat'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'

const SvgBuildingInteriorFallback = lazy(() =>
  import('../map/SvgBuildingInteriorFallback').then((m) => ({
    default: m.SvgBuildingInteriorFallback,
  })),
)

interface CombatStageCanvasProps {
  backgroundUri: string | undefined
  duelBuilding: CompiledBuildingRecord | null
  sceneTitle: string
  allies: CombatantState[]
  enemies: CombatantState[]
  effectiveTargetId: string
  onSelectTargetId: (unitId: string) => void
  outcome: CombatOutcome
  isAnimating: boolean
  isImpactPose: boolean
  activeBeat: CombatRoundBeat | null
  getUnitShownHp: (unit: CombatantState) => number
}

export function CombatStageCanvas({
  backgroundUri,
  duelBuilding,
  sceneTitle,
  allies,
  enemies,
  effectiveTargetId,
  onSelectTargetId,
  outcome,
  isAnimating,
  isImpactPose,
  activeBeat,
  getUnitShownHp,
}: CombatStageCanvasProps) {
  const { loadedUrl: loadedBgUrl } = useLazyImage(backgroundUri)
  const isMultiAlly = allies.length > 1
  const isMultiEnemy = enemies.length > 1

  const portraitTransitionCss = isImpactPose
    ? 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease-out, opacity 240ms ease-out'
    : 'transform 540ms cubic-bezier(0.25, 1, 0.5, 1), filter 420ms ease-out, opacity 320ms ease-out'

  const shakeAnim = !isImpactPose
    ? undefined
    : activeBeat?.shakeLevel === 3
      ? 'cbtShakeHeavy 440ms cubic-bezier(0.36,0.07,0.19,0.97)'
      : activeBeat?.shakeLevel === 2
        ? 'cbtShakeMed 340ms cubic-bezier(0.36,0.07,0.19,0.97)'
        : activeBeat?.shakeLevel === 1
          ? 'cbtShakeLight 260ms ease-out'
          : undefined

  return (
    <>
      <style>{`
        @keyframes cbtShakeLight {
          0%, 100% { transform: translate3d(0, 0, 0); }
          25% { transform: translate3d(-5px, 3px, 0); }
          50% { transform: translate3d(5px, -3px, 0); }
          75% { transform: translate3d(-3px, 2px, 0); }
        }
        @keyframes cbtShakeMed {
          0%, 100% { transform: translate3d(0, 0, 0); }
          18% { transform: translate3d(-10px, 6px, 0); }
          36% { transform: translate3d(10px, -6px, 0); }
          54% { transform: translate3d(-7px, 4px, 0); }
          72% { transform: translate3d(6px, -3px, 0); }
        }
        @keyframes cbtShakeHeavy {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          15% { transform: translate3d(-16px, 9px, 0) scale(1.015); }
          30% { transform: translate3d(15px, -9px, 0) scale(1.015); }
          48% { transform: translate3d(-11px, 6px, 0) scale(1.008); }
          68% { transform: translate3d(9px, -5px, 0) scale(1.004); }
          85% { transform: translate3d(-4px, 3px, 0) scale(1); }
        }
      `}</style>

      <div
        key={isImpactPose && activeBeat?.shakeLevel ? `shake-${activeBeat.id}` : 'shake-idle'}
        className="absolute inset-0"
        style={shakeAnim ? { animation: shakeAnim } : undefined}
      >
        {/* 所在建筑实景背景层 */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#241a12]">
          {loadedBgUrl ? (
            <img
              src={loadedBgUrl}
              alt={sceneTitle}
              className="w-full h-full object-cover object-center blur-[6px] scale-105 brightness-95"
              decoding="async"
            />
          ) : duelBuilding ? (
            <Suspense fallback={null}>
              <svg
                viewBox="0 0 1600 900"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full block blur-[6px] scale-105 brightness-95"
              >
                <SvgBuildingInteriorFallback building={duelBuilding} width={1600} height={900} />
              </svg>
            </Suspense>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#120b06]/70 via-[#120b06]/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#100905]/90 via-[#120b06]/45 to-transparent" />
        </div>

        {/* 左右 3x 巨幅等比全身立绘对峙舞台 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[118px] h-[72vh] min-h-[420px] max-h-[780px] z-10 flex items-end justify-between px-[3vw] lg:px-[7vw] xl:px-[10vw]">
          {/* 左阵营立绘 */}
          <div className="relative h-full w-[45vw] max-w-[580px] flex items-end justify-center">
            {allies.map((unit, idx) => {
              const uHp = getUnitShownHp(unit)
              const isDefeated = uHp <= 0
              const isUnitLunging =
                isImpactPose &&
                (activeBeat?.kind === 'attack' || activeBeat?.kind === 'dodge') &&
                (activeBeat.actorUnitId
                  ? activeBeat.actorUnitId === unit.unitId
                  : idx === 0 && activeBeat.actorSide === 'player')
              const isUnitHit =
                isImpactPose &&
                activeBeat?.kind === 'attack' &&
                (activeBeat.targetUnitId
                  ? activeBeat.targetUnitId === unit.unitId
                  : idx === 0 && activeBeat.targetSide === 'player')
              const isUnitDodging =
                isImpactPose &&
                activeBeat?.kind === 'dodge' &&
                (activeBeat.targetUnitId
                  ? activeBeat.targetUnitId === unit.unitId
                  : idx === 0 && activeBeat.targetSide === 'player')

              const baseSlotClass = isMultiAlly
                ? idx === 0
                  ? 'absolute bottom-0 left-0 h-[96%] w-[64%] flex items-end justify-center'
                  : 'absolute bottom-[5%] right-0 h-[87%] w-[58%] flex items-end justify-center'
                : 'relative h-full w-full flex items-end justify-center'

              return (
                <div
                  key={unit.unitId}
                  className={baseSlotClass}
                  style={{
                    zIndex: isUnitLunging ? 26 : idx === 0 ? 15 : 12,
                    transition: portraitTransitionCss,
                    transform: isUnitLunging
                      ? 'translate3d(8vw, -8px, 0) scale(1.07)'
                      : isUnitHit
                        ? 'translate3d(-28px, 6px, 0) rotate(-2.5deg) scale(0.97)'
                        : isUnitDodging
                          ? 'translate3d(-44px, -12px, 0) scale(1.02)'
                          : isDefeated || (!isAnimating && outcome === 'npc_win')
                            ? 'translate3d(-14px, 12px, 0) scale(0.94)'
                            : 'translate3d(0, 0, 0) scale(1)',
                    filter: isUnitHit
                      ? 'brightness(1.38) sepia(0.35) saturate(2.2) hue-rotate(-25deg) drop-shadow(0 0 28px rgba(239, 68, 68, 0.9))'
                      : isDefeated
                        ? 'grayscale(0.88) brightness(0.62) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8))'
                        : isUnitLunging
                          ? 'drop-shadow(0 16px 36px rgba(251, 191, 36, 0.58))'
                          : 'drop-shadow(0 18px 32px rgba(0, 0, 0, 0.78))',
                    opacity: isDefeated ? 0.56 : !isAnimating && outcome === 'npc_win' ? 0.78 : 1,
                  }}
                >
                  {isUnitDodging && (
                    <CutoutPortraitImg
                      url={unit.portraitUrl}
                      alt=""
                      className="absolute bottom-0 object-contain object-bottom opacity-40 pointer-events-none"
                      style={{
                        height: '96%',
                        maxHeight: '100%',
                        width: 'auto',
                        maxWidth: isMultiAlly ? '28vw' : '40vw',
                        transform: 'translateX(40px)',
                        filter: 'hue-rotate(155deg) saturate(2.2) brightness(1.3)',
                      }}
                    />
                  )}
                  <CutoutPortraitImg
                    url={unit.portraitUrl}
                    alt={unit.name}
                    className="object-contain object-bottom"
                    style={{
                      height: '96%',
                      maxHeight: '100%',
                      width: 'auto',
                      maxWidth: isMultiAlly ? '28vw' : '40vw',
                    }}
                  />
                  {isMultiAlly && (
                    <div className="absolute bottom-3 px-2 py-0.5 rounded-full bg-[#17100a]/88 border border-[#d4a455]/65 text-[11px] song-serif text-[#ffebc2] shadow-lg whitespace-nowrap">
                      {idx === 0 ? '少侠' : `助阵 · ${unit.name}`}
                      {isDefeated && <span className="ml-1 text-[#ff8b7d] font-bold">【力竭】</span>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 右阵营立绘 */}
          <div className="relative h-full w-[45vw] max-w-[580px] flex items-end justify-center">
            {enemies.map((unit, idx) => {
              const uHp = getUnitShownHp(unit)
              const isDefeated = uHp <= 0
              const isSelectedTarget = isMultiEnemy && effectiveTargetId === unit.unitId && !isDefeated
              const canClickSelect =
                isMultiEnemy && !isDefeated && outcome === 'ongoing' && !isAnimating
              const isUnitLunging =
                isImpactPose &&
                (activeBeat?.kind === 'attack' || activeBeat?.kind === 'dodge') &&
                (activeBeat.actorUnitId
                  ? activeBeat.actorUnitId === unit.unitId
                  : idx === 0 && activeBeat.actorSide === 'npc')
              const isUnitHit =
                isImpactPose &&
                activeBeat?.kind === 'attack' &&
                (activeBeat.targetUnitId
                  ? activeBeat.targetUnitId === unit.unitId
                  : idx === 0 && activeBeat.targetSide === 'npc')
              const isUnitDodging =
                isImpactPose &&
                activeBeat?.kind === 'dodge' &&
                (activeBeat.targetUnitId
                  ? activeBeat.targetUnitId === unit.unitId
                  : idx === 0 && activeBeat.targetSide === 'npc')

              const baseSlotClass = isMultiEnemy
                ? idx === 0
                  ? 'absolute bottom-0 right-0 h-[96%] w-[64%] flex items-end justify-center'
                  : 'absolute bottom-[5%] left-0 h-[87%] w-[58%] flex items-end justify-center'
                : 'relative h-full w-full flex items-end justify-center'

              return (
                <div
                  key={unit.unitId}
                  onClick={canClickSelect ? () => onSelectTargetId(unit.unitId) : undefined}
                  className={`${baseSlotClass} ${canClickSelect ? 'pointer-events-auto cursor-pointer group' : ''}`}
                  style={{
                    zIndex: isUnitLunging ? 26 : isSelectedTarget ? 18 : idx === 0 ? 15 : 12,
                    transition: portraitTransitionCss,
                    transform: isUnitLunging
                      ? 'translate3d(-8vw, -8px, 0) scale(1.07)'
                      : isUnitHit
                        ? 'translate3d(28px, 6px, 0) rotate(2.5deg) scale(0.97)'
                        : isUnitDodging
                          ? 'translate3d(44px, -12px, 0) scale(1.02)'
                          : isDefeated || (!isAnimating && outcome === 'player_win')
                            ? 'translate3d(14px, 12px, 0) scale(0.94)'
                            : isSelectedTarget
                              ? 'translate3d(0, -4px, 0) scale(1.02)'
                              : 'translate3d(0, 0, 0) scale(1)',
                    filter: isUnitHit
                      ? 'brightness(1.38) sepia(0.35) saturate(2.2) hue-rotate(-25deg) drop-shadow(0 0 28px rgba(239, 68, 68, 0.9))'
                      : isDefeated
                        ? 'grayscale(0.9) brightness(0.58) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8))'
                        : isUnitLunging
                          ? 'drop-shadow(0 16px 36px rgba(251, 191, 36, 0.58))'
                          : isSelectedTarget
                            ? 'drop-shadow(0 0 22px rgba(245, 199, 107, 0.65)) drop-shadow(0 16px 28px rgba(0, 0, 0, 0.82))'
                            : 'drop-shadow(0 18px 32px rgba(0, 0, 0, 0.78))',
                    opacity: isDefeated ? 0.52 : !isAnimating && outcome === 'player_win' ? 0.78 : 1,
                  }}
                >
                  {isUnitDodging && (
                    <CutoutPortraitImg
                      url={unit.portraitUrl}
                      alt=""
                      className="absolute bottom-0 object-contain object-bottom opacity-40 pointer-events-none"
                      style={{
                        height: '96%',
                        maxHeight: '100%',
                        width: 'auto',
                        maxWidth: isMultiEnemy ? '28vw' : '40vw',
                        transform: 'translateX(-40px)',
                        filter: 'hue-rotate(155deg) saturate(2.2) brightness(1.3)',
                      }}
                    />
                  )}
                  <CutoutPortraitImg
                    url={unit.portraitUrl}
                    alt={unit.name}
                    className="object-contain object-bottom"
                    style={{
                      height: '96%',
                      maxHeight: '100%',
                      width: 'auto',
                      maxWidth: isMultiEnemy ? '28vw' : '40vw',
                    }}
                  />
                  {isMultiEnemy && (
                    <div
                      className={`absolute bottom-3 px-2.5 py-0.5 rounded-full border text-[11px] song-serif shadow-lg flex items-center gap-1 whitespace-nowrap transition ${
                        isDefeated
                          ? 'bg-[#1a120d]/90 border-[#7d5f46]/50 text-[#a8947d]'
                          : isSelectedTarget
                            ? 'bg-[#7d1d14]/95 border-[#fde047] text-[#fff6d6]'
                            : 'bg-[#17100a]/88 border-[#d4a455]/55 text-[#ebd7b7] group-hover:border-[#f5c76b]'
                      }`}
                    >
                      {isSelectedTarget && !isDefeated && (
                        <Crosshair className="w-3 h-3 text-[#fde047]" />
                      )}
                      <span>{unit.name}</span>
                      {isDefeated ? (
                        <span className="text-[#ff8b7d] font-bold">【败退】</span>
                      ) : isSelectedTarget ? (
                        <span className="text-[10px] text-[#fde047]">[当前目标]</span>
                      ) : (
                        <span className="text-[10px] text-[#cbb493]">[点击选敌]</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
