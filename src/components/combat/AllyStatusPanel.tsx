import { Package } from 'lucide-react'
import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import {
  EQUIPMENT_SLOT_METAS,
  ITEM_DB_MAP,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import {
  computeEffectiveAgility,
  getLearnedLevel,
  type CombatantState,
  type CombatOutcome,
} from '../../utils/combatEngine'
import { FighterStatusBadges } from './FighterStatusBadges'

interface AllyStatusPanelProps {
  player: CombatantState
  allies: CombatantState[]
  shownPlayerHp: number
  shownPlayerMp: number
  playerEffAgi: number
  playerDodgePct: number
  isPlayerHit: boolean
  outcome: CombatOutcome
  isAnimating: boolean
  bagOpen: boolean
  onToggleBag: () => void
  combatBagCount: number
  getUnitShownHp: (unit: CombatantState) => number
  getUnitShownMp: (unit: CombatantState) => number
}

export function AllyStatusPanel({
  player,
  allies,
  shownPlayerHp,
  shownPlayerMp,
  playerEffAgi,
  playerDodgePct,
  isPlayerHit,
  outcome,
  isAnimating,
  bagOpen,
  onToggleBag,
  combatBagCount,
  getUnitShownHp,
  getUnitShownMp,
}: AllyStatusPanelProps) {
  const isMultiAlly = allies.length > 1
  const playerQiDrivePct = Math.round((Math.sqrt(Math.max(0, shownPlayerMp)) / 50) * 100)
  const pHpPct = Math.max(0, Math.min(100, Math.round((shownPlayerHp / Math.max(1, player.maxHp)) * 100)))
  const pMpPct = Math.max(0, Math.min(100, Math.round((shownPlayerMp / Math.max(1, player.maxMp)) * 100)))

  const pNeigong = player.equippedArts.neigong ? MARTIAL_ART_DB_MAP[player.equippedArts.neigong] : null
  const pNeigongLv = getLearnedLevel(player.learnedArts, player.equippedArts.neigong)
  const pQinggong = player.equippedArts.qinggong ? MARTIAL_ART_DB_MAP[player.equippedArts.qinggong] : null
  const pQinggongLv = getLearnedLevel(player.learnedArts, player.equippedArts.qinggong)

  return (
    <section
      className={`pointer-events-auto w-full lg:w-[370px] xl:w-[405px] rounded-xl border bg-[#17100a]/82 backdrop-blur-md p-3 shadow-2xl space-y-2 transition-colors ${
        isPlayerHit ? 'border-[#ff6b57]' : 'border-[#d4a455]/55'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="song-serif text-base font-bold text-[#fff0d4] tracking-wide">
            {player.name}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#3b2514] border border-[#d4a455]/60 text-[#f5d28c]">
            {player.realm}
          </span>
          <span className="text-[11px] text-[#cbb697] truncate hidden sm:inline">
            · 身法 {playerEffAgi} / 闪避 {playerDodgePct}%
          </span>
        </div>

        {outcome === 'ongoing' && !isAnimating && (
          <button
            type="button"
            onClick={onToggleBag}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition cursor-pointer shrink-0 shadow ${
              bagOpen
                ? 'bg-[#8f1d14] border-[#f5c76b] text-[#fff6e0]'
                : 'bg-[#2e1e12] hover:bg-[#422a18] border-[#d4a455]/70 text-[#ffdf9e]'
            }`}
            title="打开随身行囊使用丹药或战阵奇毒（快捷键 B）"
          >
            <Package className="w-3.5 h-3.5" />
            <span>行囊丹毒 ({combatBagCount}) [B]</span>
          </button>
        )}
      </div>

      {/* 气血与内力条 */}
      <div className="space-y-1.5">
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="text-[#f5bdb3] font-medium">气血</span>
            <span className="font-mono text-[#ffe8e3]">
              {shownPlayerHp} / {player.maxHp} ({pHpPct}%)
            </span>
          </div>
          <div className="relative h-2.5 rounded-full bg-[#2e1310] border border-[#8c352b]/70 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fde68a] to-[#fca5a5] opacity-90"
              style={{
                width: `${pHpPct}%`,
                transition: 'width 1150ms cubic-bezier(0.22, 1, 0.36, 1) 280ms',
              }}
            />
            <div
              className="relative h-full bg-gradient-to-r from-[#991f15] via-[#cf382b] to-[#f06254] transition-all duration-150 ease-out"
              style={{ width: `${pHpPct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="text-[#a6dbf2] font-medium">
              内力 <span className="text-[10px] text-[#84bed9]">（催劲 +{playerQiDrivePct}%）</span>
            </span>
            <span className="font-mono text-[#dff4fc]">
              {shownPlayerMp} / {player.maxMp}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[#102530] border border-[#2f6e8f]/70 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1c5978] via-[#2d87b0] to-[#52bce8] transition-all duration-200"
              style={{ width: `${pMpPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2v2 助阵同伴紧凑血内状态匣 */}
      {allies.slice(1).map((ally) => {
        const aHp = getUnitShownHp(ally)
        const aMp = getUnitShownMp(ally)
        const aHpPct = Math.max(0, Math.min(100, Math.round((aHp / Math.max(1, ally.maxHp)) * 100)))
        const aMpPct = Math.max(0, Math.min(100, Math.round((aMp / Math.max(1, ally.maxMp)) * 100)))
        const aAgi = computeEffectiveAgility(ally)
        return (
          <div
            key={ally.unitId}
            className={`rounded-lg border px-2.5 py-1.5 space-y-1 ${
              aHp <= 0
                ? 'bg-[#1c130e]/70 border-[#6e563e]/40 opacity-65'
                : 'bg-[#23180f]/90 border-[#6bc49f]/55'
            }`}
          >
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#193b2d] border border-[#68d4ab]/60 text-[#ccf7e6] shrink-0">
                  并肩助阵
                </span>
                <span className="song-serif font-bold text-[#ffefd2] truncate">{ally.name}</span>
                <span className="text-[10px] text-[#bfa786] truncate">· 身法 {aAgi}</span>
              </div>
              <span className="font-mono text-[10px] text-[#ffe5de] shrink-0">
                {aHp <= 0 ? '已力竭退阵' : `HP ${aHp}/${ally.maxHp}`}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="col-span-2 h-1.5 rounded-full bg-[#2e1310] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#b92b1f] to-[#f26b5e] transition-all duration-200"
                  style={{ width: `${aHpPct}%` }}
                />
              </div>
              <div className="h-1.5 rounded-full bg-[#102530] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#247299] to-[#5ec4f0] transition-all duration-200"
                  style={{ width: `${aMpPct}%` }}
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* 少侠随身七槽披挂与内轻功一览 */}
      <div className="pt-1 border-t border-[#9e7d4f]/35 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-[#cbb493]">
          <span>
            内功：<strong className="text-[#f5e2c1]">{pNeigong ? `${pNeigong.cleanName}·${pNeigongLv}重` : '未运'}</strong>
            {' · '}
            轻功：<strong className="text-[#cbf2df]">{pQinggong ? `${pQinggong.cleanName}·${pQinggongLv}重` : '未运'}</strong>
          </span>
          <span className="font-mono text-[#dfc8a4]">
            攻{player.equipAttack} 防{player.equipDefense} 抗{player.res}
          </span>
        </div>

        {!isMultiAlly && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            {EQUIPMENT_SLOT_METAS.map((meta) => {
              const itemId = player.equipped[meta.slot]
              const item = itemId ? ITEM_DB_MAP[itemId] : null
              const rarityStyle = item ? RARITY_STYLE_MAP[item.rarity] : null
              return (
                <div
                  key={meta.slot}
                  className={`px-1.5 py-0.5 rounded border text-[10px] truncate ${
                    item
                      ? 'bg-[#261a10]/90 border-[#b38e59]/50 text-[#f5e4c6]'
                      : 'bg-[#1a120b]/55 border-[#634e35]/30 text-[#857158]'
                  }`}
                  title={
                    item
                      ? `${meta.shortLabel}：${item.name}（${item.rarity}）`
                      : `${meta.shortLabel}：未佩戴`
                  }
                >
                  <span className="text-[#b89b72] mr-0.5">{meta.seal}:</span>
                  <span className={rarityStyle ? 'text-[#ffebc2] font-medium' : ''}>
                    {item ? item.name : '未佩'}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <FighterStatusBadges fighter={player} />
    </section>
  )
}
