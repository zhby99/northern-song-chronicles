import type { InventoryStack, NodeNpc, PlayerSectState } from '../../../types/game'
import {
  canReceiveSectLeaderTask,
  getChangshanMonthlyStipend,
  getKaifengMonthlyStipend,
  KAIFENG_RECOMMENDATION_ITEM_ID,
} from '../../../utils/sectMechanics'

interface SectTasksAndBountiesWidgetProps {
  targetFactionId: string
  sectState: PlayerSectState
  dayCount: number
  inventory: InventoryStack[]
  npc: NodeNpc
  isSectLeaderNpc: boolean
  onAcceptSectTask: () => void
  onTurnInSectTask: () => void
  onAbandonSectTask: () => void
  onAcceptKaifengWarrant: () => void
  onAbandonKaifengWarrant: () => void
  onClaimKaifengRecommendation: (npc: NodeNpc) => void
}

export function SectTasksAndBountiesWidget({
  targetFactionId,
  sectState,
  dayCount,
  inventory,
  npc,
  isSectLeaderNpc,
  onAcceptSectTask,
  onTurnInSectTask,
  onAbandonSectTask,
  onAcceptKaifengWarrant,
  onAbandonKaifengWarrant,
  onClaimKaifengRecommendation,
}: SectTasksAndBountiesWidgetProps) {
  const activeSectTask = sectState.activeSectTask

  return (
    <>
      {/* 武林门派（除开封府/六扇门外）：掌门宗门任务 */}
      {canReceiveSectLeaderTask(targetFactionId) && (
        <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#b59461] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-bold text-[#5c3d1e] song-serif text-sm sm:text-base">
                宗门任务（掌门亲派差遣）
              </div>
              <div className="text-xs text-[#6b5235] mt-0.5">
                完成一次宗门任务可获掌门好感 +10；放弃任务则降低 5 点好感。
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {!activeSectTask ? (
                isSectLeaderNpc ? (
                  <button
                    type="button"
                    onClick={onAcceptSectTask}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1f4d3b] hover:bg-[#28634c] border border-[#8fc7ae] text-[#fff8ee] text-xs font-bold cursor-pointer"
                  >
                    领取宗门任务
                  </button>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded bg-[#efe4cc] border border-[#cbb693] text-[#6b5235]">
                    请向本门掌门领取宗门任务
                  </span>
                )
              ) : (
                <>
                  {isSectLeaderNpc && activeSectTask.completedStep && (
                    <button
                      type="button"
                      onClick={onTurnInSectTask}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1f4d3b] hover:bg-[#28634c] border border-[#8fc7ae] text-[#fff8ee] text-xs font-bold cursor-pointer"
                    >
                      向掌门交差（好感+10）
                    </button>
                  )}
                  {isSectLeaderNpc && (
                    <button
                      type="button"
                      onClick={onAbandonSectTask}
                      className="px-3 py-1.5 rounded-lg bg-[#781710]/90 hover:bg-[#961f16] border border-[#d49a6a] text-[#fff8ee] text-xs font-medium cursor-pointer"
                    >
                      放弃任务（好感-5）
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {activeSectTask && (
            <div
              className={`px-3 py-2 rounded border text-xs leading-relaxed ${
                activeSectTask.completedStep
                  ? 'bg-[#e2f2e8] border-[#82b99d] text-[#1b5132]'
                  : 'bg-[#f4ebd9] border-[#cbb693] text-[#4a3219]'
              }`}
            >
              <div className="font-bold">
                【{activeSectTask.title}】
                {activeSectTask.completedStep ? '（已完成，请向掌门复命）' : '（进行中）'}
              </div>
              <div className="mt-0.5">{activeSectTask.summary}</div>
            </div>
          )}
        </div>
      )}

      {/* 开封府 / 六扇门（SECT-17）：月度官俸与海捕公文 */}
      {targetFactionId === 'SECT-17' && (() => {
        const nextRankTargetCases =
          sectState.rank === 1
            ? 2
            : sectState.rank === 2
              ? 5
              : sectState.rank === 3
                ? 10
                : null
        return (
          <div className="p-3.5 rounded-lg bg-[#f4f7fa] border border-[#7c94b0] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-bold text-[#1d3557] song-serif text-sm sm:text-base">
                  开封府 / 六扇门 · 官俸与六扇门公案
                </div>
                <div className="text-xs text-[#3b526d] mt-0.5">
                  月度官俸：<span className="font-bold text-[#1d3557]">{getKaifengMonthlyStipend(sectState.rank)} 两 / 月</span>
                  {nextRankTargetCases !== null && (
                    <>
                      {' · '}
                      本阶办案量：<span className="font-bold text-[#1d3557]">{sectState.kaifengCasesSolved} / {nextRankTargetCases} 次</span>
                    </>
                  )}
                  {sectState.rank === 2 && sectState.kaifengRank2Day !== null && (
                    <>
                      {' · '}
                      捕头历练：<span className="font-bold text-[#1d3557]">{Math.max(0, dayCount - sectState.kaifengRank2Day)} / 730 天</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {sectState.rank >= 4 ? (
                  <span className="text-xs px-2.5 py-1 rounded bg-[#e3ebf4] border border-[#9ab3ce] text-[#1d3557] font-medium">
                    已晋升第4阶【金牌总捕】，不再派发常规案件
                  </span>
                ) : !sectState.activeKaifengWarrant ? (
                  <button
                    type="button"
                    onClick={onAcceptKaifengWarrant}
                    className="px-3.5 py-1.5 rounded-lg bg-[#1d3557] hover:bg-[#2a4a75] border border-[#8fb2d9] text-[#fff8ee] text-xs font-bold cursor-pointer"
                  >
                    领取六扇门案卷
                  </button>
                ) : !sectState.activeKaifengWarrant.deadlineDay ? (
                  <button
                    type="button"
                    onClick={onAbandonKaifengWarrant}
                    className="px-3 py-1.5 rounded-lg bg-[#781710]/90 hover:bg-[#961f16] border border-[#d49a6a] text-[#fff8ee] text-xs font-medium cursor-pointer"
                  >
                    放弃当前案卷
                  </button>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded bg-[#f8e3e1] border border-[#d69891] text-[#781710] font-bold">
                    半年强制公案（限第 {sectState.activeKaifengWarrant.deadlineDay} 日前）
                  </span>
                )}
              </div>
            </div>

            {sectState.rank < 4 && (
              <div className="text-[11px] text-[#3b526d]">
                每年 2月1日、8月1日 自动派发半年公案，须于两个月内办结（逾期自动撤销且罚两年俸禄，连续两次将被开除）。
              </div>
            )}

            {sectState.activeKaifengWarrant && (
              <div className="px-3 py-2 rounded bg-[#e8eff7] border border-[#9ab3ce] text-xs text-[#1d3557] leading-relaxed">
                {sectState.activeKaifengWarrant.kind === 'investigate' ? (
                  <>
                    <div className="font-bold">
                      在案侦查线索：【{sectState.activeKaifengWarrant.targetName}】（{sectState.activeKaifengWarrant.targetTitle}）
                    </div>
                    <div className="mt-0.5 text-[#2d4665]">
                      线索地点：【{sectState.activeKaifengWarrant.regionName} · {sectState.activeKaifengWarrant.buildingName}】寻访【{sectState.activeKaifengWarrant.clueNpcName ?? '知情人士'}】查明案情线索即可结案（办案量 +1，赏银 +15 两）。
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-bold">
                      在案海捕要犯：【{sectState.activeKaifengWarrant.targetName}】（{sectState.activeKaifengWarrant.targetTitle} · {sectState.activeKaifengWarrant.realm}）
                    </div>
                    <div className="mt-0.5 text-[#2d4665]">
                      潜匿地点：【{sectState.activeKaifengWarrant.regionName} · {sectState.activeKaifengWarrant.buildingName}】。前往该处寻获此犯并在生死决战中将其击败，即可结案（办案量 +1，赏银 +15 两；⚠️ 若失手落败将命丧当场）。
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )
      })()}

      {/* 常山枪派（参军制）专属军饷、半年度诛杀辽谍军令与开封府推荐信 */}
      {targetFactionId === 'SECT-22' && (
        <div className="p-3.5 rounded-lg bg-[#faf3e3] border-2 border-[#8f1d14]/70 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="font-bold text-[#781710] song-serif text-sm sm:text-base">
              河北边军·常山枪派军籍要务
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#1f4d3b] text-[#e7f7ef]">
              {`月度军饷：${getChangshanMonthlyStipend(sectState.rank)} 两纹银 / 月`}
            </span>
          </div>

          {sectState.activeLiaoSpy ? (
            <div className="px-3 py-2 rounded bg-[#f8e3e1] border border-[#d69891] text-[#781710] text-xs leading-relaxed">
              <strong>
                【第 {sectState.activeLiaoSpy.yearIndex} 期半年死斗军令】
              </strong>{' '}
              辽国北院密谍【{sectState.activeLiaoSpy.name}】（
              {sectState.activeLiaoSpy.title} · {sectState.activeLiaoSpy.realm}）现潜伏于燕云【
              {sectState.activeLiaoSpy.regionName} ·{' '}
              {sectState.activeLiaoSpy.buildingName}
              {sectState.activeLiaoSpy.spotName
                ? ` · ${sectState.activeLiaoSpy.spotName}`
                : ''}
              】！须于两个月内（第 {sectState.activeLiaoSpy.deadlineDay}{' '}
              日前）赶赴燕云将其诛杀，逾期任务消失且掌门好感 -15（连续两次开除）。
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded bg-[#e2f2e8] border border-[#9fd0b4] text-[#1b5132] text-xs">
              当前暂无在身军令（入门满一年后，每年2月1日、8月1日自动派发半年军令，须于两个月内完成，逾期掌门好感 -15，连续两次开除）。
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-xs text-[#5c3d1e]">
              晋升至第3阶【演武教习】可申领《开封府推荐信》，凭信赴汴梁正当调任【开封府 / 六扇门】。
            </span>
            <button
              type="button"
              onClick={() => onClaimKaifengRecommendation(npc)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                sectState.rank >= 3 &&
                !sectState.claimedKaifengLetter &&
                !inventory.some(
                  (st) =>
                    st.itemId === KAIFENG_RECOMMENDATION_ITEM_ID && st.qty > 0,
                )
                  ? 'bg-[#781710] hover:bg-[#961f16] border-[#e3b07b] text-[#fff8ee]'
                  : 'bg-[#8c7b65]/60 border-[#a89882] text-[#f7eedc]'
              }`}
            >
              {sectState.claimedKaifengLetter
                ? '已申领《开封府推荐信》'
                : '申领《开封府推荐信》'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
