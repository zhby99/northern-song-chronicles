import { useMemo, useState } from 'react'
import type { LearnedArtEntry, PlayerSectState } from '../../../types/game'
import {
  canPlayerLearnSectArt,
  getSectTeachableArts,
  isJoinableSectFaction,
  isShaolinArtBlockedForLayDisciple,
} from '../../../engine/sect'

interface SectTeachArtsWidgetProps {
  targetFactionId: string
  isPlayerInThisSect: boolean
  sectState: PlayerSectState
  learnedArts: LearnedArtEntry[]
  onLearnArt: (artId: string) => void
  onLeaveSect: () => void
}

export function SectTeachArtsWidget({
  targetFactionId,
  isPlayerInThisSect,
  sectState,
  learnedArts,
  onLearnArt,
  onLeaveSect,
}: SectTeachArtsWidgetProps) {
  const [confirmLeaveChangshan, setConfirmLeaveChangshan] = useState(false)

  const sectTeachableArts = useMemo(() => {
    if (!isJoinableSectFaction(targetFactionId)) return []
    return getSectTeachableArts(targetFactionId)
  }, [targetFactionId])

  const learnedArtMap = useMemo(
    () => new Map(learnedArts.map((e) => [e.artId, e])),
    [learnedArts],
  )

  return (
    <>
      {/* 本门武学传授目录（按 5 阶权限分级列出） */}
      <div className="p-3.5 rounded-lg bg-[#efe4cc]/85 border border-[#cbb693] space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
            本门武学传授名录（共 {sectTeachableArts.length} 门）
          </span>
          <span className="text-[11px] text-[#6b5235]">
            良阶上品起需内门 · 地阶上品起需真传/长老（同权） · 天阶上品唯掌门可学
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[30vh] overflow-y-auto scroll-thin pr-1">
          {sectTeachableArts.map((entry) => {
            const learned = learnedArtMap.get(entry.art.id)
            const rankOk =
              isPlayerInThisSect &&
              canPlayerLearnSectArt(sectState.rank, entry.requiredRank)
            const blockedByLay = isShaolinArtBlockedForLayDisciple(
              targetFactionId,
              entry.art,
              sectState.shaolinDiscipleType,
            )
            const unlocked = rankOk && !blockedByLay
            const isShaolinMonkOnlyTier =
              (targetFactionId === 'SECT-01' || targetFactionId === 'SECT-04') &&
              (entry.art.tier === '地阶' || entry.art.tier === '天阶')
            return (
              <div
                key={entry.art.id}
                className="px-3 py-2 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-[#2d1e10] truncate">
                      {entry.art.cleanName}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#e5d3b3] text-[#781710] font-medium">
                      {entry.art.fullTier}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e]">
                      {entry.art.category}
                    </span>
                    {entry.isSharedFromShaolin && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#f4e1c1] text-[#8a4b0f]">
                        少林共传
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#6b5235]">
                    门槛：Lv.{entry.requiredRank}【{entry.requiredRankLabel}】
                    {isShaolinMonkOnlyTier
                      ? targetFactionId === 'SECT-04'
                        ? ' · 限清修武僧（俗家永不开放）'
                        : ' · 限出家僧众'
                      : ''}
                  </div>
                </div>

                {learned ? (
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-[#e2f2e8] border border-[#9fd0b4] text-[#1b5132] shrink-0">
                    已习·{learned.level}重
                  </span>
                ) : isPlayerInThisSect ? (
                  <button
                    type="button"
                    onClick={() => onLearnArt(entry.art.id)}
                    className={`px-2.5 py-1 rounded text-xs font-bold border shrink-0 cursor-pointer ${
                      unlocked
                        ? 'bg-[#781710] hover:bg-[#961f16] border-[#d49a6a] text-[#fff8ee]'
                        : blockedByLay && rankOk
                          ? 'bg-[#6b4614]/20 border-[#b58742] text-[#781710]'
                          : 'bg-[#dcd1be] border-[#bfb097] text-[#7a6a53]'
                    }`}
                  >
                    {unlocked
                      ? '修习入门'
                      : !rankOk
                        ? '职阶不足'
                        : targetFactionId === 'SECT-04'
                          ? '俗家永不开放'
                          : '需剃度出家'}
                  </button>
                ) : (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#efe4cc] text-[#7a6a53] shrink-0">
                    需入门
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 脱离门派操作区 */}
      {isPlayerInThisSect && (
        <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#cbb693]">
          {targetFactionId === 'SECT-22' ? (
            <span className="text-xs text-[#8f1d14] font-medium">
              ⚠️ 军纪铁律：擅自脱离【常山枪派】将坐实【通辽嫌疑】，所有大宋人物对主角好感度立减
              30！（持推荐信赴开封府调任则无此罚）
            </span>
          ) : (
            <span className="text-xs text-[#6b5235]">
              脱离门派后门派功绩清零，已习得武学仍保留于自身。
            </span>
          )}

          {targetFactionId === 'SECT-22' && !confirmLeaveChangshan ? (
            <button
              type="button"
              onClick={() => setConfirmLeaveChangshan(true)}
              className="px-3 py-1.5 rounded bg-[#781710] hover:bg-[#961f16] text-[#fff8ee] text-xs font-bold cursor-pointer"
            >
              主动脱离常山枪派…
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {confirmLeaveChangshan && (
                <button
                  type="button"
                  onClick={() => setConfirmLeaveChangshan(false)}
                  className="px-2.5 py-1 rounded bg-[#efe4cc] border border-[#8c6e46] text-[#3d2814] text-xs cursor-pointer"
                >
                  取消
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setConfirmLeaveChangshan(false)
                  onLeaveSect()
                }}
                className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#ad2217] border border-[#f0a899] text-[#fff8ee] text-xs font-bold cursor-pointer"
              >
                {targetFactionId === 'SECT-22'
                  ? '确认背军退派（大宋好感-30）'
                  : '主动脱离本门'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
