import { buildSectJoinConfirmScene } from '../../../data/sectJoinDialogues'
import type { QuestEffect } from '../../../types/quest'
import type { NodeNpc, PlayerSectState } from '../../../types/game'
import type { SectJoinEvaluation } from '../../../utils/sectMechanics'

interface SectEntryWidgetProps {
  targetFactionId: string
  sectDisplayName: string
  entryEval: SectJoinEvaluation
  silver: number
  sectState: PlayerSectState
  hasToumingzhuangQuestScene: boolean
  npc: NodeNpc
  onJoinBlockedFeedback: () => void
  onCloseSubPanel: () => void
  onRunQuestEffects: (effects: QuestEffect[], npc?: NodeNpc) => void
  onAcceptToumingzhuang: () => void
}

export function SectEntryWidget({
  targetFactionId,
  sectDisplayName,
  entryEval,
  silver,
  sectState,
  hasToumingzhuangQuestScene,
  npc,
  onJoinBlockedFeedback,
  onCloseSubPanel,
  onRunQuestEffects,
  onAcceptToumingzhuang,
}: SectEntryWidgetProps) {
  return (
    <div className="p-4 rounded-lg bg-[#efe4cc]/90 border border-[#b59461] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="font-bold text-[#5c3d1e] song-serif text-base">
            拜入【{sectDisplayName}】入门章程
          </div>
          <div className="text-xs text-[#6b5235] mt-0.5">
            入门条件：{entryEval.requirementSummary}
          </div>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded bg-[#faf3e3] border border-[#cbb693] text-[#4a3219]">
          入门授阶：Lv.{entryEval.startingRank}【{entryEval.startingRankLabel}】 · 现银 {silver} 两
        </div>
      </div>

      {entryEval.blockedReason && (
        <div className="px-3 py-2 rounded bg-[#f8e3e1] border border-[#d69891] text-[#8f1d14] text-xs font-medium">
          入门受阻：{entryEval.blockedReason}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            if (!entryEval.canJoin) {
              onJoinBlockedFeedback()
              return
            }
            onCloseSubPanel()
            onRunQuestEffects(
              [
                {
                  type: 'openScene',
                  scene: buildSectJoinConfirmScene(targetFactionId, entryEval, npc),
                },
              ],
              npc,
            )
          }}
          className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm border shadow cursor-pointer transition-colors ${
            entryEval.canJoin
              ? 'bg-[#1f4d3b] hover:bg-[#27614a] border-[#8fc7ae] text-[#fff8ee]'
              : 'bg-[#8c7b65]/60 hover:bg-[#8c7b65]/80 border-[#a89882] text-[#f7eedc]'
          }`}
        >
          {targetFactionId === 'SECT-17' &&
          (sectState.sectId === 'SECT-22' || sectState.sectId === 'SECT-23')
            ? '呈交举荐信奉调开封府'
            : `拜入【${sectDisplayName}】`}
          {entryEval.costSilver > 0 ? `（奉银 ${entryEval.costSilver} 两）` : ''}
        </button>

        {targetFactionId === 'SECT-18' &&
          sectState.toumingzhuangState !== 'completed' &&
          !hasToumingzhuangQuestScene && (
            <button
              type="button"
              onClick={onAcceptToumingzhuang}
              className="px-4 py-2 rounded-lg font-bold text-xs sm:text-sm bg-[#781710] hover:bg-[#961f16] border border-[#d49a6a] text-[#fff8ee] shadow cursor-pointer transition-colors"
            >
              {sectState.toumingzhuangState === 'accepted'
                ? '已领「纳投名状」（去劫朝廷命官）'
                : '领取「纳投名状」劫官任务'}
            </button>
          )}
      </div>
    </div>
  )
}
