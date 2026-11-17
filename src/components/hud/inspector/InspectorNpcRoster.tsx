import { countLivingNpcIds } from '../../../engine/social/npcDeath'
import { useGameStore } from '../../../store/useGameStore'
import { useState } from 'react'
import { TEN_ART_KEYS } from '../../../data/gameDb'
import type { CompiledBuildingRecord, NodeNpc } from '../../../types/game'
import type { DuelStakesKind } from '../../../engine/combat'
import { ManagedAssetImg } from '../../common/ManagedAssetImg'

interface InspectorNpcRosterProps {
  currentContextKey: string
  isLeafBuilding: boolean
  targetHasSubSpots: boolean
  targetBuildingDb: CompiledBuildingRecord | null
  contextNpcs: NodeNpc[]
  onOpenNpcInteraction: (npc: NodeNpc) => void
  onInteractNpc: (npc: NodeNpc, action: 'talk' | 'spar') => void
  onStartNpcCombat: (npc: NodeNpc, mode: 'spar' | 'duel', stakes?: DuelStakesKind) => void
  onCompleteKaifengInvestigation: () => void
  onOpenNpcDetailInCompendium: (npcId: string) => void
}

export function InspectorNpcRoster({
  currentContextKey,
  isLeafBuilding,
  targetHasSubSpots,
  targetBuildingDb,
  contextNpcs,
  onOpenNpcInteraction,
  onInteractNpc,
  onStartNpcCombat,
  onCompleteKaifengInvestigation,
  onOpenNpcDetailInCompendium,
}: InspectorNpcRosterProps) {
  const [expandedEntry, setExpandedEntry] = useState<{
    contextKey: string
    npcKey: string
  } | null>(null)

  const deadNpcIds = useGameStore((st) => st.deadNpcIds)

  if (!isLeafBuilding) {
    return (
      <div className="pt-2 border-t border-[#cbb693] text-[11px] text-[#6b5235] leading-relaxed">
        {targetHasSubSpots ? (
          <>
            此建筑内设多处殿宇/子建筑（院内共驻{' '}
            <strong className="text-[#8f1d14]">
              {countLivingNpcIds(targetBuildingDb?.residentNpcIds, deadNpcIds)}
            </strong>{' '}
            人），请步入内院并点选最末层子建筑寻访常驻人物。
          </>
        ) : (
          <>
            此建筑为可步入的市井独堂实景（堂内共驻{' '}
            <strong className="text-[#8f1d14]">
              {countLivingNpcIds(targetBuildingDb?.residentNpcIds, deadNpcIds)}
            </strong>{' '}
            人，内无子建筑），请步入大堂互动与寻访人物。
          </>
        )}
      </div>
    )
  }

  if (contextNpcs.length === 0) {
    return (
      <div className="pt-2 border-t border-[#cbb693] text-[11px] text-[#6b5235]">
        此殿宇/铺舍当前暂无常驻人物。
      </div>
    )
  }

  return (
    <div className="pt-2 border-t border-[#cbb693] space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold song-serif text-[#5e472d]">
          本处驻留人物 ({contextNpcs.length} 人)
        </span>
        <span className="text-[10px] text-[#7a5f3e]">最末层建筑实景交互</span>
      </div>
      <div className="space-y-2 max-h-72 overflow-y-auto scroll-thin pr-0.5">
        {contextNpcs.map((p) => {
          const npcKey = p.id ?? p.name
          const isExpanded =
            expandedEntry?.contextKey === currentContextKey &&
            expandedEntry.npcKey === npcKey
          return (
            <div
              key={npcKey}
              onClick={() => onOpenNpcInteraction(p)}
              title={`点击拜会【${p.name}】`}
              className="p-2 rounded bg-[#efe4cc] hover:bg-[#e8d9bb] border border-[#c8b28e] hover:border-[#9e7b47] transition-colors space-y-1.5 cursor-pointer"
            >
              <div className="w-full text-left flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {p.avatarUrl ? (
                    <ManagedAssetImg
                      url={p.avatarUrl}
                      alt={p.name}
                      viewportLazy
                      className="w-8 h-8 rounded object-cover border border-[#8c6e46] shrink-0 bg-[#2b1d12]"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center song-serif font-bold text-xs shrink-0">
                      {p.name.slice(0, 1)}
                    </span>
                  )}
                  <div className="truncate">
                    <div className="font-bold song-serif text-[#23180f] truncate flex items-center gap-1">
                      <span className="truncate">{p.name}</span>
                      {p.isDynamicLiaoSpy && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#8f1d14] text-[#fff8ee] font-sans shrink-0">
                          军令必诛
                        </span>
                      )}
                      {p.questBadgeLabel && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#781710] text-[#fff8ee] font-sans shrink-0">
                          {p.questBadgeLabel}
                        </span>
                      )}
                      {!p.isDynamicLiaoSpy && p.sectRankLabel && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#e5d3b3] text-[#5c3d1e] font-sans shrink-0">
                          {p.sectRankLabel}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#6b5235] truncate">{p.title}</div>
                  </div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dcc9a7] text-[#4a3219] shrink-0">
                  {p.realm}
                </span>
              </div>

              {p.stats && p.talents && (
                <div className="px-1.5 py-1 rounded bg-[#faf3e3] border border-[#d6c3a1] text-[10px] font-mono text-[#4a3219] flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
                  <span>
                    血<strong className="text-[#8f1d14]">{p.stats.hp}</strong> 内
                    <strong className="text-[#1d473a]">{p.stats.mp}</strong> 身
                    <strong>{p.stats.agi}</strong> 抗<strong>{p.stats.res}</strong>
                  </span>
                  <span className="text-[#6b5235]">
                    根<strong className="text-[#23180f]">{p.talents.bone}</strong> 悟
                    <strong className="text-[#23180f]">{p.talents.comprehension}</strong> 颜
                    <strong className="text-[#23180f]">{p.talents.charm}</strong>
                  </span>
                </div>
              )}

              {isExpanded && p.stats && p.talents && p.tenArts && (
                <div className="p-2 rounded bg-[#faf3e3] border border-[#cbb693] space-y-1.5 text-[10px]">
                  <div className="grid grid-cols-4 gap-1 text-center font-mono">
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">气血</span>
                      <strong className="text-[#8f1d14]">{p.stats.hp}</strong>
                    </div>
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">内力</span>
                      <strong className="text-[#1d473a]">{p.stats.mp}</strong>
                    </div>
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">身法</span>
                      <strong>{p.stats.agi}</strong>
                    </div>
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">抗性</span>
                      <strong>{p.stats.res}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-center font-mono">
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">先天根骨</span>
                      <strong className="text-[#781710]">{p.talents.bone}</strong>
                    </div>
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">先天悟性</span>
                      <strong className="text-[#1f4d3b]">{p.talents.comprehension}</strong>
                    </div>
                    <div className="bg-[#efe4cc] rounded py-0.5">
                      <span className="text-[#6b5235] block text-[9px]">风姿颜值</span>
                      <strong className="text-[#6d3b1a]">{p.talents.charm}</strong>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-semibold text-[#6b5235] mb-1">
                      十艺百工（骑 / 算 / 经 / 策 / 词 / 琴 / 棋 / 书 / 画 / 辩）
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-center font-mono">
                      {TEN_ART_KEYS.map((artKey) => {
                        const val = p.tenArts?.[artKey] ?? 0
                        return (
                          <div
                            key={artKey}
                            className={`rounded py-0.5 border ${
                              val >= 80
                                ? 'bg-[#f4e1c1] border-[#c58b38] text-[#781710] font-bold'
                                : 'bg-[#efe4cc]/70 border-[#dcc9a7] text-[#3d2b19]'
                            }`}
                          >
                            <span className="block text-[9px] text-[#6b5235] font-sans">
                              {artKey}
                            </span>
                            <span>{val}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex flex-wrap items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => onOpenNpcInteraction(p)}
                  className="px-2 py-0.5 rounded bg-[#781710] hover:bg-[#931e15] text-[#fff8ee] text-[11px] font-medium cursor-pointer"
                >
                  拜会交互
                </button>
                {p.isDynamicLiaoSpy ? (
                  <button
                    type="button"
                    onClick={() => onStartNpcCombat(p, 'duel', 'liao_spy_duel')}
                    className="px-2 py-0.5 rounded bg-[#a11b12] hover:bg-[#be2217] border border-[#f2b98a] text-[#fff8ee] text-[11px] font-bold cursor-pointer"
                  >
                    生死诛谍
                  </button>
                ) : p.isDynamicKaifengWarrant && p.kaifengWarrantKind === 'investigate' ? (
                  <button
                    type="button"
                    onClick={onCompleteKaifengInvestigation}
                    className="px-2 py-0.5 rounded bg-[#1d3557] hover:bg-[#2a4a75] border border-[#8fb2d9] text-[#fff8ee] text-[11px] font-bold cursor-pointer"
                  >
                    查明案情线索
                  </button>
                ) : p.isDynamicKaifengWarrant ? (
                  <button
                    type="button"
                    onClick={() => onStartNpcCombat(p, 'duel', 'kaifeng_warrant')}
                    className="px-2 py-0.5 rounded bg-[#a11b12] hover:bg-[#be2217] border border-[#f2b98a] text-[#fff8ee] text-[11px] font-bold cursor-pointer"
                  >
                    缉拿要犯（生死战）
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => onInteractNpc(p, 'talk')}
                      className="px-2 py-0.5 rounded bg-[#7c4a1e] hover:bg-[#935824] text-[#fff8ee] text-[11px] cursor-pointer"
                    >
                      交谈
                    </button>
                    <button
                      type="button"
                      onClick={() => onInteractNpc(p, 'spar')}
                      className="px-2 py-0.5 rounded bg-[#f8f1e1] hover:bg-[#e5d7bc] border border-[#b59c77] text-[#3d2812] text-[11px] cursor-pointer"
                    >
                      切磋
                    </button>
                  </>
                )}
                {!p.isDynamicLiaoSpy && !p.isDynamicKaifengWarrant && p.tenArts && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedEntry(
                        isExpanded ? null : { contextKey: currentContextKey, npcKey },
                      )
                    }
                    className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                      isExpanded
                        ? 'bg-[#5c4024] text-[#fff8ee] border-[#5c4024]'
                        : 'bg-[#f8f1e1] hover:bg-[#e5d7bc] border-[#b59c77] text-[#3d2812]'
                    }`}
                  >
                    {isExpanded ? '收起属性' : '十艺详值'}
                  </button>
                )}
                {p.id &&
                  !p.isDynamicLiaoSpy &&
                  !p.isDynamicKaifengWarrant &&
                  !p.dynamicQuestActorId && (
                    <button
                      type="button"
                      onClick={() => onOpenNpcDetailInCompendium(p.id!)}
                      className="px-2 py-0.5 rounded bg-[#efe4cc] hover:bg-[#e2d1b0] border border-[#9e7b47] text-[#781710] text-[11px] font-medium cursor-pointer ml-auto"
                    >
                      图鉴立绘
                    </button>
                  )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
