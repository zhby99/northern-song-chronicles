import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import type { CombatantState } from '../../engine/combat'

export function FighterStatusBadges({ fighter }: { fighter: CombatantState }) {
  const lockedArt = fighter.lastUsedArtId ? MARTIAL_ART_DB_MAP[fighter.lastUsedArtId] : null
  return (
    <div className="flex flex-wrap gap-1">
      {fighter.exposed && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#69140e]/95 border border-[#ff9b73]/90 text-[#ffe0d4] font-semibold animate-pulse">
          破绽（受创+25%·闪避-50%）
        </span>
      )}
      {fighter.poisonDotTurns > 0 && fighter.poisonDotDmg > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#2e1636]/95 border border-[#c77dff]/80 text-[#f1d6ff]">
          奇毒蚀脉 -{fighter.poisonDotDmg}/合（{fighter.poisonDotTurns}合）
        </span>
      )}
      {fighter.zixiaStacks > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#3b1e47]/95 border border-[#cc95fa]/65 text-[#f0dbff]">
          紫霞蓄劲 ×{fighter.zixiaStacks}
        </span>
      )}
      {fighter.zhemeishouStacks > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1a382f]/95 border border-[#68d4ab]/65 text-[#ccf7e6]">
          折梅化劲 ×{fighter.zhemeishouStacks}
        </span>
      )}
      {fighter.stunnedNextRound && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#661912]/95 border border-[#ff8475]/85 text-[#ffdad4] animate-pulse">
          受震慑/封穴（禁出招）
        </span>
      )}
      {fighter.disarmedNextRound && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#542c11]/95 border border-[#f0a55b]/80 text-[#ffe4c7]">
          手腕受震（禁指/暗器）
        </span>
      )}
      {fighter.slowTurns > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#422f12]/95 border border-[#deb054]/75 text-[#fce7bc]">
          绊缠迟缓 -{fighter.slowPct}%（{fighter.slowTurns}合·禁逃）
        </span>
      )}
      {fighter.weakTurns > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#381b33]/95 border border-[#d97cc3]/75 text-[#fad5f2]">
          真气滞涩 -{fighter.weakPct}%（{fighter.weakTurns}合）
        </span>
      )}
      {lockedArt && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#2c2016]/92 border border-[#a8895f]/55 text-[#e3cfb2]">
          禁连发：《{lockedArt.cleanName}》
        </span>
      )}
    </div>
  )
}
