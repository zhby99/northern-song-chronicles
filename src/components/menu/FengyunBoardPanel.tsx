import { useMemo, useState } from 'react'
import { REGION_DB_MAP } from '../../data/gameDb'
import { getRegionUnlockRequirement, isRegionUnlockedByInventory } from '../../data/itemsDb'
import { getProtagonistPortrait } from '../../data/protagonistPresets'
import {
  buildFengyunBoard,
  computeHeroMartialPower,
  describeFengyunGap,
  FENGYUN_MILESTONES,
  getFengyunTitle,
  type FengyunEntry,
} from '../../engine/stats/fengyunRanking'
import { useGameStore } from '../../store/useGameStore'
import type { CompiledNpcRecord } from '../../types/game'
import { ManagedAssetImg } from '../common/ManagedAssetImg'

const RANK_MEDAL: Record<number, string> = {
  1: 'bg-[#a87b2d] text-[#fff8ee] border-[#7a5718]',
  2: 'bg-[#8d8f94] text-[#fff8ee] border-[#6b6d72]',
  3: 'bg-[#9a5b2e] text-[#fff8ee] border-[#74411d]',
}

function formatPower(n: number): string {
  return n.toLocaleString('en-US')
}

export function FengyunBoardPanel({
  onJumpToNpc,
}: {
  onJumpToNpc: (npc: CompiledNpcRecord) => void
}) {
  const baseStats = useGameStore((s) => s.baseStats)
  const equipped = useGameStore((s) => s.equipped)
  const equippedArts = useGameStore((s) => s.equippedArts)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const heavyInjury = useGameStore((s) => Boolean(s.questState.flags.taihang_heavy_injury))
  const deadNpcIds = useGameStore((s) => s.deadNpcIds)
  const killedDing = useGameStore((s) => s.sectState.killedDingChunqiu)
  const playerName = useGameStore((s) => s.playerName)
  const playerPortraitId = useGameStore((s) => s.playerPortraitId)
  const inventory = useGameStore((s) => s.inventory)
  const locateQuestTargetOnMap = useGameStore((s) => s.locateQuestTargetOnMap)

  const board = useMemo(() => {
    const heroPower = computeHeroMartialPower({ baseStats, equipped, equippedArts, learnedArts, heavyInjury })
    return buildFengyunBoard({
      heroPower,
      deadNpcIds,
      isNpcDead: (id) => id === 'NPC-0122' && killedDing,
    })
  }, [baseStats, equipped, equippedArts, learnedArts, heavyInjury, deadNpcIds, killedDing])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected: FengyunEntry | null =
    board.entries.find((e) => (e.isHero ? '__hero__' : e.npc!.id) === selectedId) ?? board.entries[0] ?? null

  const heroPortrait = getProtagonistPortrait(playerPortraitId)
  const heroOnBoard = board.heroRank <= board.entries.length
  const nextMilestone = [...FENGYUN_MILESTONES].find((m) => board.heroRank > m.rank)
  const nextTarget = nextMilestone ? board.thresholds[nextMilestone.rank] : null
  const nextGap = nextMilestone ? describeFengyunGap(board.heroPower, nextTarget) : null
  const fmtThreshold = (t: typeof nextTarget) => (t ? `${t.realmLabel} · 战力 ${formatPower(t.total)}` : '—')

  return (
    <div className="space-y-4 text-xs sm:text-sm text-[#2a1d11]">
      {/* 主角位次与成长阶梯 */}
      <div className="p-4 rounded-lg bg-[#efe4cc] border border-[#c8b28e] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ManagedAssetImg
              url={heroPortrait.avatarUrl}
              alt={playerName}
              className="w-12 h-12 rounded object-cover border border-[#8c6e46] bg-[#2b1d12]"
            />
            <div>
              <div className="song-serif font-bold text-base text-[#23180f]">
                {playerName || '少侠'}
                <span className="ml-2 text-xs px-2 py-0.5 rounded bg-[#781710] text-[#fff8ee]">
                  {getFengyunTitle(board.heroRank)}
                </span>
              </div>
              <div className="text-xs text-[#6b5235] mt-0.5">
                {board.heroPower.realmLabel} · 战力 <strong className="font-mono text-[#781710]">{formatPower(board.heroPower.total)}</strong>
                {' · '}天下第 <strong className="font-mono text-[#781710]">{board.heroRank}</strong> / {board.totalCount} 位
              </div>
            </div>
          </div>
          <div className="text-xs text-[#5c3d1e] max-w-sm">
            {nextMilestone ? (
              <>
                距【{nextMilestone.label}】：<strong className="text-[#781710]">{nextGap ?? '已可跻身'}</strong>
                （当前第 {nextMilestone.rank} 位为 {fmtThreshold(nextTarget)}）
              </>
            ) : (
              <strong className="text-[#781710]">已问鼎天下第一，傲视群雄！</strong>
            )}
          </div>
        </div>

        <ol className="grid grid-cols-5 gap-1.5" aria-label="风云榜成长阶梯">
          {[{ key: 'none', label: '榜上无名', rank: Infinity }, ...FENGYUN_MILESTONES].map((m) => {
            const reached = board.heroRank <= m.rank
            const current = m.key === 'none' ? !heroOnBoard : getFengyunTitle(board.heroRank) === getFengyunTitle(m.rank)
            return (
              <li
                key={m.key}
                className={`px-2 py-1.5 rounded border text-center song-serif font-bold text-[11px] sm:text-xs ${
                  current
                    ? 'bg-[#781710] border-[#781710] text-[#fff8ee] shadow'
                    : reached
                      ? 'bg-[#e2f2e8] border-[#78b791] text-[#1b5132]'
                      : 'bg-[#faf3e3] border-[#d2be99] text-[#9a8466]'
                }`}
              >
                {m.label}
                {m.key !== 'none' && (
                  <div className="font-mono font-normal text-[10px] opacity-80">
                    {m.rank === 1 ? '第 1 位' : `前 ${m.rank}`}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
        <p className="text-[11px] text-[#7a5f3e] leading-relaxed">
          排名规则：先比境界，同一境界再比战力。战力 = 气血 ×1.5 + 内力 ×1.8 + 身法 ×30 + 抗性 ×30 + 攻击 ×2 + 防御 ×1.5 + 最高一门外功武学「品阶 × 重数 × 30」+ 天阶特效每条 500（四门外功的特效合计最多计 2 条）。攻击只算最强一招及其兵器契合；四维与攻守均为披挂与运使武学后的实时值。已身故的人物不再入榜；换上更好的披挂、运使更高阶的武学、闭关提升重数都会即时反映在榜上。
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* 榜单 */}
        <div className="rounded-lg border border-[#c8b28e] bg-[#faf3e3] overflow-hidden">
          <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_4.5rem] gap-2 px-3 py-2 bg-[#261910] text-[#fbf2e0] text-xs font-bold song-serif">
            <span>位次</span>
            <span>高手</span>
            <span className="text-right">战力</span>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-[#e2d3b5]">
            {board.entries.map((e) => {
              const key = e.isHero ? '__hero__' : e.npc!.id
              const isSel = selected && (selected.isHero ? '__hero__' : selected.npc!.id) === key
              const name = e.isHero ? playerName || '少侠' : e.npc!.name
              const avatar = e.isHero ? heroPortrait.avatarUrl : (e.npc!.avatarUrl ?? e.npc!.templateAvatarUrl ?? null)
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(key)}
                    className={`w-full grid grid-cols-[2.5rem_minmax(0,1fr)_4.5rem] gap-2 items-center px-3 py-1.5 text-left cursor-pointer transition-colors ${
                      e.isHero
                        ? 'bg-[#fdf0d5] hover:bg-[#f8e4bb]'
                        : isSel
                          ? 'bg-[#efe1c4]'
                          : 'hover:bg-[#f3e8d2]'
                    } ${isSel ? 'ring-2 ring-inset ring-[#a87b2d]' : ''}`}
                  >
                    <span
                      className={`w-8 h-6 flex items-center justify-center rounded border font-mono text-xs font-bold ${
                        RANK_MEDAL[e.rank] ?? 'bg-[#efe4cc] border-[#cbb693] text-[#5c3d1e]'
                      }`}
                    >
                      {e.rank}
                    </span>
                    <span className="flex items-center gap-2 min-w-0">
                      {avatar ? (
                        <ManagedAssetImg
                          url={avatar}
                          alt={name}
                          viewportLazy
                          className="w-7 h-7 rounded object-cover border border-[#8c6e46] shrink-0 bg-[#2b1d12]"
                        />
                      ) : (
                        <span className="w-7 h-7 rounded bg-[#5c4024] text-[#fff8ee] flex items-center justify-center song-serif font-bold text-xs shrink-0">
                          {name.slice(0, 1)}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-bold song-serif text-[#23180f] truncate">
                          {name}
                          {e.isHero && <span className="ml-1 text-[10px] px-1.5 py-px rounded bg-[#781710] text-[#fff8ee]">少侠</span>}
                        </span>
                        <span className="block text-[11px] text-[#7a5f3e] truncate">
                          {e.isHero ? e.power.realmLabel : `${e.npc!.realm} · ${e.npc!.factionName}`}
                          {e.power.signatureArt ? ` · ${e.power.signatureArt}` : ''}
                        </span>
                      </span>
                    </span>
                    <span className="text-right font-mono text-xs font-bold text-[#781710]">
                      {formatPower(e.power.total)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {!heroOnBoard && (
            <div className="px-3 py-2 border-t border-[#c8b28e] bg-[#fdf0d5] text-xs text-[#5c3d1e]">
              少侠尚在榜外：天下第 <strong className="font-mono text-[#781710]">{board.heroRank}</strong> 位，战力{' '}
              <strong className="font-mono text-[#781710]">{formatPower(board.heroPower.total)}</strong>。
              风云百强门槛：{fmtThreshold(board.thresholds[100])}。
            </div>
          )}
        </div>

        {/* 详情：风闻驻地 */}
        {selected && (
          <FengyunDetailCard
            entry={selected}
            heroName={playerName || '少侠'}
            heroRealmLabel={board.heroPower.realmLabel}
            heroAvatar={heroPortrait.fullbodyUrl}
            regionLocked={
              selected.npc ? !isRegionUnlockedByInventory(selected.npc.regionId, inventory) : false
            }
            onLocate={(npc) =>
              locateQuestTargetOnMap({
                regionId: npc.regionId,
                buildingId: npc.assignedBuildingId,
                spotId: npc.assignedSpotId ?? undefined,
                customLabel: npc.fullLocationLabel,
              })
            }
            onJumpToNpc={onJumpToNpc}
          />
        )}
      </div>
    </div>
  )
}

function FengyunDetailCard({
  entry,
  heroName,
  heroRealmLabel,
  heroAvatar,
  regionLocked,
  onLocate,
  onJumpToNpc,
}: {
  entry: FengyunEntry
  heroName: string
  heroRealmLabel: string
  heroAvatar: string
  regionLocked: boolean
  onLocate: (npc: CompiledNpcRecord) => void
  onJumpToNpc: (npc: CompiledNpcRecord) => void
}) {
  const npc = entry.npc
  const p = entry.power
  const lockReq = npc && regionLocked ? getRegionUnlockRequirement(npc.regionId) : null
  const rows: [string, number][] = [
    ['四维根基', p.vitals],
    ['攻守披挂', p.offense],
    ['最高外功 品阶×重数×30', p.arts],
    [`天阶特效 × ${p.heavenEffectCount}`, p.heaven],
  ]
  return (
    <aside className="rounded-lg border border-[#c8b28e] bg-[#faf3e3] p-4 space-y-3 self-start">
      <div className="flex items-start gap-3">
        <ManagedAssetImg
          url={npc ? (npc.fullbodyUrl ?? npc.templateUrl) : heroAvatar}
          alt={npc?.name ?? heroName}
          className="w-20 h-28 rounded object-cover object-top border border-[#8c6e46] bg-[#2b1d12] shrink-0"
        />
        <div className="min-w-0 space-y-1">
          <div className="text-xs text-[#7a5f3e]">天下风云榜 · 第 {entry.rank} 位</div>
          <div className="song-serif font-bold text-lg text-[#23180f]">{npc?.name ?? heroName}</div>
          <div className="text-xs text-[#5c3d1e]">{npc ? `${npc.factionName} · ${npc.role}` : '主角'}</div>
          <div className="text-xs text-[#5c3d1e]">境界：{npc?.realm ?? heroRealmLabel}</div>
          <div className="text-xs">
            战力 <strong className="font-mono text-[#781710]">{p.total.toLocaleString('en-US')}</strong>
          </div>
        </div>
      </div>

      {p.signatureArt && (
        <div className="text-xs px-2.5 py-1.5 rounded bg-[#f5ecd7] border border-[#d8c49e] text-[#5c3d1e]">
          <strong>压箱外功：</strong>
          {p.signatureArt}
        </div>
      )}

      <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-[#6b5235]">{k}</dt>
            <dd className="font-mono text-right text-[#2d1e10]">{v.toLocaleString('en-US')}</dd>
          </div>
        ))}
      </dl>

      {npc && (
        <div className="space-y-2 pt-2 border-t border-[#e2d3b5]">
          <div className="text-xs text-[#2d1e10]">
            <strong className="text-[#781710]">风闻驻地：</strong>
            {npc.fullLocationLabel}
          </div>
          {regionLocked && lockReq && (
            <div className="text-[11px] text-[#8f1d14]">需先持有{lockReq.mapItemName}方可前往【{lockReq.regionName}】</div>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={regionLocked}
              onClick={() => onLocate(npc)}
              title={regionLocked && lockReq ? `需先持有${lockReq.mapItemName}` : `舆图定位：${npc.fullLocationLabel}`}
              className={`px-3 py-1.5 rounded text-xs font-bold song-serif shadow ${
                regionLocked
                  ? 'bg-[#cfc3ae] text-[#6d5c46] border border-[#b4a389] cursor-not-allowed opacity-75'
                  : 'bg-[#355263] hover:bg-[#43687d] text-[#fff8ee] cursor-pointer'
              }`}
            >
              舆图定位：{REGION_DB_MAP[npc.regionId]?.name ?? npc.locationLabel} ▸
            </button>
            <button
              type="button"
              onClick={() => onJumpToNpc(npc)}
              className="px-3 py-1.5 rounded text-xs font-bold song-serif border border-[#a87b2d] bg-[#fdf4dd] hover:bg-[#f6e5bc] text-[#781710] cursor-pointer"
            >
              群侠图鉴 ▸
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
