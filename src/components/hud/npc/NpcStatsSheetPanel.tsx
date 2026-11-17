import {
  MARTIAL_ART_DB_MAP,
  TEN_ART_KEYS,
} from '../../../data/gameDb'
import {
  EQUIPMENT_SLOT_METAS,
  ITEM_DB_MAP,
  normalizeItemTier,
  RARITY_STYLE_MAP,
} from '../../../data/itemsDb'
import { MARTIAL_ART_SLOT_METAS } from '../../../data/playerMartialArts'
import type { CompiledNpcRecord, NodeNpc } from '../../../types/game'
import { deriveNpcEffectiveStats } from '../../../utils/heroStats'
import { getNpcFavorProfile } from '../../../utils/npcFavor'

interface NpcStatsSheetPanelProps {
  npc: NodeNpc
  dbRecord: CompiledNpcRecord | undefined
  roleName: string
  npcSectRank?: number
  npcSectRankLabel?: string
  realmName: string
  factionName: string
  curFavor: number
  bio?: string
  onClose: () => void
}

export function NpcStatsSheetPanel({
  npc,
  dbRecord,
  roleName,
  npcSectRank,
  npcSectRankLabel,
  realmName,
  factionName,
  curFavor,
  bio,
  onClose,
}: NpcStatsSheetPanelProps) {
  const stats = dbRecord?.stats ?? npc.stats
  const talents = dbRecord?.talents ?? npc.talents
  const tenArts = dbRecord?.tenArts ?? npc.tenArts

  return (
    <div className="relative z-20 w-[min(94vw,1160px)] lg:self-end lg:mr-8 max-h-[80vh] mb-3 rounded-xl bg-[#f7eedc]/97 border-2 border-[#8c6e46] shadow-2xl overflow-hidden flex flex-col">
      <div className="px-5 py-3 bg-[#3d2814] text-[#f5dfb5] flex items-center justify-between border-b border-[#8c6e46]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xl font-bold song-serif">{npc.name}</span>
          <span className="text-sm px-2.5 py-0.5 rounded bg-[#6b4823] text-[#fde8c8]">
            {roleName}
          </span>
          {npcSectRankLabel && (
            <span className="text-xs px-2 py-0.5 rounded bg-[#8c6230] text-[#fff8ee]">
              {npcSectRankLabel}
              {npcSectRank ? `（第${npcSectRank}阶）` : ''}
            </span>
          )}
          <span className="text-sm px-2.5 py-0.5 rounded bg-[#781710] text-[#fff3df]">
            {realmName}
          </span>
          <span className="text-sm text-[#d6be96]">{factionName}</span>
          <span
            className={`text-sm px-2.5 py-0.5 rounded font-mono ${
              curFavor < 0
                ? 'bg-[#781710] text-[#ffdeda]'
                : 'bg-[#1f4d3b] text-[#e7f7ef]'
            }`}
          >
            好感度 {curFavor}/100
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm px-3 py-1 rounded bg-[#5c3d1e] hover:bg-[#785129] text-[#f5dfb5] cursor-pointer"
        >
          收起
        </button>
      </div>

      <div className="p-5 overflow-y-auto scroll-thin space-y-4 text-sm text-[#2d1e10]">
        {!npc.isDynamicLiaoSpy && (() => {
          const favorProf = getNpcFavorProfile(npc)
          return (
            <div className="flex flex-wrap items-center gap-2.5 px-3.5 py-2 rounded bg-[#efe4cc] border border-[#cbb693]">
              <span className="font-bold text-[#5c3d1e]">好感偏好：</span>
              <span className="px-2 py-0.5 rounded bg-[#e2f2e8] text-[#1b5132] border border-[#9fd0b4] text-xs font-medium">
                喜好（2.0×）：{favorProf.likes.join('、')}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#f8e3e1] text-[#8f1d14] border border-[#dfaba6] text-xs font-medium">
                厌恶（0.2×）：{favorProf.dislikes.join('、')}
              </span>
            </div>
          )
        })()}
        {bio && (
          <p className="px-3.5 py-2.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#4a3219] leading-relaxed">
            {bio}
          </p>
        )}

        {stats &&
          talents &&
          (() => {
            const eff = dbRecord ? deriveNpcEffectiveStats(dbRecord) : null
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#5c3d1e] song-serif">实战交锋属性</span>
                    <span className="text-[10px] text-[#7a5f3e]">武学+披挂实时派生</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">气血</span>
                      <strong className="text-[#8f1d14] text-sm">
                        {eff ? eff.maxHp : stats.hp}
                      </strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">内力</span>
                      <strong className="text-[#1d473a] text-sm">
                        {eff ? eff.maxMp : stats.mp}
                      </strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">身法</span>
                      <strong className="text-sm">{eff ? eff.agility : stats.agi}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">抗性</span>
                      <strong className="text-sm">{eff ? eff.res : stats.res}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">外功杀伤</span>
                      <strong className="text-[#8f1d14] text-sm">
                        +{eff ? eff.totalAttack : 0}
                      </strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">护体防御</span>
                      <strong className="text-[#1b5132] text-sm">
                        +{eff ? eff.totalDefense : 0}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
                  <div className="font-bold text-[#5c3d1e] song-serif">先天三维禀赋</div>
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">先天根骨</span>
                      <strong className="text-[#781710] text-sm">{talents.bone}</strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">先天悟性</span>
                      <strong className="text-[#1f4d3b] text-sm">
                        {talents.comprehension}
                      </strong>
                    </div>
                    <div className="bg-[#faf3e3] rounded py-1 border border-[#dcc9a7]">
                      <span className="block text-[10px] text-[#6b5235]">风姿颜值</span>
                      <strong className="text-[#6d3b1a] text-sm">{talents.charm}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

        {tenArts && (
          <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
            <div className="font-bold text-[#5c3d1e] song-serif">十艺百工</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center font-mono">
              {TEN_ART_KEYS.map((artKey) => {
                const val = tenArts[artKey] ?? 0
                return (
                  <div
                    key={artKey}
                    className={`rounded py-1 border ${
                      val >= 80
                        ? 'bg-[#f4e1c1] border-[#c58b38] text-[#781710] font-bold'
                        : 'bg-[#faf3e3] border-[#dcc9a7] text-[#3d2b19]'
                    }`}
                  >
                    <span className="block text-[10px] text-[#6b5235] font-sans">
                      {artKey}
                    </span>
                    <span>{val}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {(dbRecord || npc.equippedArts) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
              <div className="font-bold text-[#5c3d1e] song-serif">六槽运使武学</div>
              <div className="space-y-1">
                {MARTIAL_ART_SLOT_METAS.map((meta) => {
                  const eqArts = dbRecord?.equippedArts ?? npc.equippedArts
                  const lrArts = dbRecord?.learnedArts ?? npc.learnedArts ?? []
                  const aid = eqArts?.[meta.slot] ?? null
                  const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
                  const lv = lrArts.find((e) => e.artId === aid)?.level ?? 1
                  return (
                    <div
                      key={meta.slot}
                      className="px-2 py-1 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="px-1 py-0.2 rounded bg-[#5e472d] text-[#fff8eb] text-[9px] font-bold shrink-0">
                          {meta.shortLabel}
                        </span>
                        <span className="font-bold text-[#2d1e10] truncate">
                          {art ? art.cleanName : '未装配'}
                        </span>
                      </div>
                      {art && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e5d3b3] text-[#781710] shrink-0">
                          {art.tier}·{lv}重
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#efe4cc]/80 border border-[#cbb693] space-y-1.5">
              <div className="font-bold text-[#5c3d1e] song-serif">七槽随身披挂</div>
              <div className="space-y-1">
                {EQUIPMENT_SLOT_METAS.map((meta) => {
                  const eqItems = dbRecord?.equipped ?? npc.equipped
                  const iid = eqItems?.[meta.slot] ?? null
                  const item = iid ? ITEM_DB_MAP[iid] : null
                  const tier = item ? normalizeItemTier(item.rarity) : null
                  const rStyle = tier ? RARITY_STYLE_MAP[tier] : null
                  return (
                    <div
                      key={meta.slot}
                      className="px-2 py-1 rounded bg-[#faf3e3] border border-[#dcc9a7] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="px-1 py-0.2 rounded bg-[#6b5235] text-[#fff8eb] text-[9px] font-bold shrink-0">
                          {meta.shortLabel}
                        </span>
                        <span className="font-medium text-[#2d1e10] truncate">
                          {item ? item.name : '空置'}
                        </span>
                      </div>
                      {tier && rStyle && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                        >
                          {tier}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
