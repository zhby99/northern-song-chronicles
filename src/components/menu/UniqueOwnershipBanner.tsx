import { Crown, HelpCircle, UserCheck } from 'lucide-react'
import { resolveUniqueArtifactLiveOwnership } from '../../data/itemsDb'
import { useGameStore } from '../../store/useGameStore'

interface UniqueOwnershipProps {
  itemId: string
}

export function UniqueOwnershipBadge({ itemId }: UniqueOwnershipProps) {
  const inventory = useGameStore((s) => s.inventory)
  const equipped = useGameStore((s) => s.equipped)
  const consumedUniqueIds = useGameStore((s) => s.consumedUniqueIds)

  const info = resolveUniqueArtifactLiveOwnership(itemId, inventory, equipped, consumedUniqueIds)
  if (!info) return null

  const toneCls =
    info.liveStatus === 'player_equipped' || info.liveStatus === 'player_bag'
      ? 'bg-emerald-900/90 text-amber-100 border-emerald-400/60'
      : info.liveStatus === 'npc'
        ? 'bg-[#4a1c17] text-[#ffe9b5] border-[#d49b27]/70'
        : info.liveStatus === 'consumed'
          ? 'bg-stone-700 text-stone-200 border-stone-400/50'
          : 'bg-[#2a3f4d] text-[#e0f2fe] border-[#7dd3fc]/50'

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-bold tracking-tight ${toneCls}`}
      title={`孤品唯一 · ${info.ownerTitle}`}
    >
      <span>孤品</span>
      <span>·</span>
      <span>{info.badgeLabel}</span>
    </span>
  )
}

export function UniqueOwnershipBanner({ itemId }: UniqueOwnershipProps) {
  const inventory = useGameStore((s) => s.inventory)
  const equipped = useGameStore((s) => s.equipped)
  const consumedUniqueIds = useGameStore((s) => s.consumedUniqueIds)
  const openNpcDetailInCompendium = useGameStore((s) => s.openNpcDetailInCompendium)

  const info = resolveUniqueArtifactLiveOwnership(itemId, inventory, equipped, consumedUniqueIds)
  if (!info) return null

  const isPlayer = info.liveStatus === 'player_equipped' || info.liveStatus === 'player_bag'
  const isUnowned = info.liveStatus === 'unowned'

  return (
    <div
      className={`p-2.5 rounded-md border-2 space-y-1.5 ${
        isPlayer
          ? 'bg-[#eef8f2] border-[#3f856b]'
          : isUnowned
            ? 'bg-[#f0f6fa] border-[#6b93b0]'
            : 'bg-[#fdf5e4] border-[#c8963e]'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold song-serif text-[#781710]">
          {isPlayer ? (
            <UserCheck className="w-3.5 h-3.5 text-[#185a3d] shrink-0" />
          ) : isUnowned ? (
            <HelpCircle className="w-3.5 h-3.5 text-[#25577a] shrink-0" />
          ) : (
            <Crown className="w-3.5 h-3.5 text-[#9a5b13] shrink-0" />
          )}
          <span>【天地孤品 · 举世唯一】当前归属：</span>
          <span
            className={
              isPlayer
                ? 'text-[#134e32]'
                : isUnowned
                  ? 'text-[#1e4666]'
                  : 'text-[#8f1d14]'
            }
          >
            {info.ownerTitle}
          </span>
        </div>

        {info.ownerNpcId && (
          <button
            type="button"
            onClick={() => openNpcDetailInCompendium(info.ownerNpcId!)}
            className="px-2 py-0.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] border border-[#f5cb5c]/70 text-[11px] font-bold song-serif cursor-pointer transition"
          >
            寻访归属人物 ▸
          </button>
        )}
      </div>

      <div className="text-[11px] text-[#4a3520] leading-relaxed">{info.ownerSubtitle}</div>
    </div>
  )
}
