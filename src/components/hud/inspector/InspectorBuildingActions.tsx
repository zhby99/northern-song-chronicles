import type { getAvailableSpotQuestActions } from '../../../engine/questEngine'
import { useGameStore } from '../../../store/useGameStore'
import type { CompiledBuildingRecord, MenuTabKey, NodeNpc } from '../../../types/game'
import type { QuestEffect } from '../../../types/quest'
import type { getBuildingArtTrainingOptions } from '../../../utils/artsProgression'
import {
  DAILY_INN_LODGING_COST,
  DAYS_PER_MONTH,
  MONTHLY_ODD_JOB_SILVER,
} from '../../../utils/heroStats'

type AvailableSpotQuestAction = ReturnType<typeof getAvailableSpotQuestActions>[number]
type ArtTrainingOption = ReturnType<typeof getBuildingArtTrainingOptions>[number]

interface InspectorBuildingActionsProps {
  regionName: string
  inspectedRootBldg: CompiledBuildingRecord | null
  isAtCurrentRegion: boolean
  spotQuestActions: AvailableSpotQuestAction[]
  isOddJobBldg: boolean
  isTavernBldg: boolean
  isOwnSectGrounds: boolean
  isInnVenue: boolean
  inOwnSectCity: boolean
  canStudyScripture: boolean
  artOptions: ArtTrainingOption[]
  silver: number
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  onRunQuestEffects: (effects: QuestEffect[], npc?: NodeNpc | null) => void
  onOpenMenu: (tab: MenuTabKey) => void
}

export function InspectorBuildingActions({
  regionName,
  inspectedRootBldg,
  isAtCurrentRegion,
  spotQuestActions,
  isOddJobBldg,
  isTavernBldg,
  isOwnSectGrounds,
  isInnVenue,
  inOwnSectCity,
  canStudyScripture,
  artOptions,
  silver,
  hp,
  maxHp,
  mp,
  maxMp,
  onRunQuestEffects,
  onOpenMenu,
}: InspectorBuildingActionsProps) {
  return (
    <>
      {spotQuestActions.length > 0 && (
        <div className="p-2.5 rounded-md bg-[#f5e7cb] border-2 border-[#b58742] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold song-serif text-[#781710]">
            <span>★ 剧情机缘与宗门试炼 ({spotQuestActions.length})</span>
            <span className="text-[10px] font-sans text-[#6b5235]">驻地奇遇</span>
          </div>
          <div className="space-y-1.5">
            {spotQuestActions.map((qa) => {
              const toneCls =
                qa.action.tone === 'danger'
                  ? 'bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] border-[#e69d8f]'
                  : qa.action.tone === 'jade'
                    ? 'bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff8eb] border-[#8fc7ae]'
                    : qa.action.tone === 'gold'
                      ? 'bg-[#6b4614] hover:bg-[#825518] text-[#fff8eb] border-[#e6c27a]'
                      : 'bg-[#5c3d1e] hover:bg-[#734c26] text-[#fff8eb] border-[#cbb693]'
              return (
                <div key={`${qa.quest.id}:${qa.action.id}`} className="space-y-1">
                  <button
                    type="button"
                    disabled={!qa.enabled}
                    onClick={() => {
                      if (!qa.enabled) return
                      onRunQuestEffects(qa.action.effects, null)
                    }}
                    className={`w-full px-3 py-2 rounded border text-xs font-bold song-serif shadow transition flex items-center justify-between gap-2 ${
                      qa.enabled
                        ? `${toneCls} cursor-pointer`
                        : 'bg-[#b5a58d] text-[#f5eedf] border-[#9c8c74] cursor-not-allowed opacity-80'
                    }`}
                  >
                    <span className="truncate">{qa.action.label}</span>
                    {qa.action.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-black/25 text-[10px] font-sans shrink-0">
                        {qa.action.badge}
                      </span>
                    )}
                  </button>
                  {!qa.enabled && qa.disabledReason && (
                    <div className="text-[11px] text-[#8f1d14] px-1">
                      🔒 {qa.disabledReason}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {isOddJobBldg &&
        (isAtCurrentRegion ? (
          <button
            type="button"
            onClick={() => useGameStore.getState().startOddJobWork()}
            className="w-full px-3 py-2 rounded bg-[#8c541f] hover:bg-[#a66526] border border-[#e6b86a]/80 text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer flex items-center justify-between gap-2"
          >
            <span>
              {isTavernBldg ? '在此酒馆跑堂做工' : '在此客栈帮工打杂'}（一月 {DAYS_PER_MONTH}{' '}
              天 · 包食宿）
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/25 font-mono text-[11px] text-[#fde68a] shrink-0">
              +{MONTHLY_ODD_JOB_SILVER} 两纹银
            </span>
          </button>
        ) : (
          <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2.5 py-1.5 rounded border border-[#d6b38b]">
            🔒 须亲临【{regionName}】方可在此{isTavernBldg ? '酒馆' : '客栈'}做工赚取工钱
          </div>
        ))}

      {(isOwnSectGrounds || isInnVenue) && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onOpenMenu('loadout')}
            className="w-full px-3 py-2 rounded bg-[#5c3d1e] hover:bg-[#734c26] border border-[#c89d54]/70 text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
          >
            {isOwnSectGrounds
              ? '在此发起闭关修炼（师门演武场 · 效率 125% · 免宿费）→'
              : `在此发起闭关修炼（客栈闭关 · 效率 100% · ${
                  inOwnSectCity ? '师门驻地免宿费' : `${DAILY_INN_LODGING_COST} 两/日`
                }）→`}
          </button>

          <div className="rounded border border-[#215744]/35 bg-[#eef5f0]/90 p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#215744] song-serif">
              <span>调息休养（2.0× 倍速恢复气血内力）</span>
              <span className="text-[10px] font-normal text-[#5a5044]">
                {inOwnSectCity ? '师门驻地免宿费' : `客栈 ${DAILY_INN_LODGING_COST} 两/日`}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {([1, 3, 5] as const).map((days) => {
                const cost = inOwnSectCity ? 0 : DAILY_INN_LODGING_COST * days
                const cantAfford = silver < cost
                return (
                  <button
                    key={days}
                    type="button"
                    disabled={cantAfford}
                    onClick={() => useGameStore.getState().restAndRecuperate(days)}
                    title={`调息 ${days} 日：气血按 1/10/日、内力按 1/5/日 恢复（当前 ${hp}/${maxHp} · ${mp}/${maxMp}）`}
                    className={`px-2 py-1.5 rounded text-[11px] font-bold song-serif transition ${
                      cantAfford
                        ? 'bg-[#c9bfae] text-[#7a7165] cursor-not-allowed'
                        : 'bg-[#215744] hover:bg-[#2a6d56] text-[#fff8eb] shadow-sm cursor-pointer'
                    }`}
                  >
                    {days}天{cost > 0 ? ` · ${cost}两` : ' · 免费'}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {canStudyScripture && (
        <button
          type="button"
          onClick={() => useGameStore.getState().startScriptureSeclusion()}
          className="w-full px-3 py-2 rounded bg-[#1f4d3b] hover:bg-[#27614a] border border-[#8fc7ae] text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
        >
          藏经阁闭关研读经义（30天 · 经义 +1）
        </button>
      )}

      {inspectedRootBldg && artOptions.length > 0 && (() => {
        const venueLabel = `${regionName} · ${inspectedRootBldg.name}`
        return (
          <div className="p-2.5 rounded-md bg-[#f5ecd7] border border-[#bfa373] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold song-serif text-[#5c3d1e]">
                ◆ 此处可修十艺（0.1秒/时辰 · 按 ESC 随时收功）
              </div>
              <span className="text-[10px] text-[#7a6142]">
                效率 {Math.round(artOptions[0]!.envMultiplier * 100)}%
              </span>
            </div>
            {!isAtCurrentRegion ? (
              <div className="text-[11px] text-[#8f1d14] bg-[#efe4cc] px-2 py-1 rounded border border-[#d6b38b]">
                🔒 须亲临【{regionName}】此建筑方可在此修行十艺
              </div>
            ) : (
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-0.5">
                {artOptions.map((opt) => (
                  <div
                    key={opt.artKey}
                    className="rounded border border-[#d6c29b] bg-[#fdfaf1] px-2 py-1.5 text-[11px]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-[#4a2e16]">{opt.actionTitle}</span>
                        <span className="ml-1.5 text-[10px] text-[#8c3b20]">
                          [{opt.artKey}]
                        </span>
                      </div>
                      <span className="text-[10px] text-[#7a6142]">
                        {opt.dailySilverCost > 0 ? `${opt.dailySilverCost}两/日` : '免费'}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6e5638] mt-0.5">{opt.desc}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      {([3, 10, 30] as const).map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() =>
                            useGameStore
                              .getState()
                              .startTenArtPractice(
                                opt.artKey,
                                days,
                                venueLabel,
                                opt.envMultiplier,
                                opt.dailySilverCost,
                              )
                          }
                          className="cursor-pointer rounded border border-[#b79560] bg-[#f4e8ce] px-2 py-0.5 text-[10px] font-semibold text-[#4a2e16] hover:bg-[#ead6ae] transition"
                        >
                          修行 {days} 日
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })()}
    </>
  )
}
