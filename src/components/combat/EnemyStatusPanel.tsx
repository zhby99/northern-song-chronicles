import { Crosshair } from 'lucide-react'
import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import {
  computeDodgeChancePreview,
  computeEffectiveAgility,
  getLearnedLevel,
  MOVE_SLOT_KEYS,
  type CombatantState,
  type CombatOutcome,
  type CombatRoundBeat,
} from '../../engine/combat'
import { FighterStatusBadges } from './FighterStatusBadges'

interface EnemyStatusPanelProps {
  player: CombatantState
  npc: CombatantState
  enemies: CombatantState[]
  livingEnemiesCount: number
  effectiveTargetId: string
  onSelectTargetId: (unitId: string) => void
  shownNpcHp: number
  shownNpcMp: number
  npcEffAgi: number
  npcDodgePct: number
  isNpcHit: boolean
  isImpactPose: boolean
  activeBeat: CombatRoundBeat | null
  outcome: CombatOutcome
  isAnimating: boolean
  getUnitShownHp: (unit: CombatantState) => number
  getUnitShownMp: (unit: CombatantState) => number
}

export function EnemyStatusPanel({
  player,
  npc,
  enemies,
  livingEnemiesCount,
  effectiveTargetId,
  onSelectTargetId,
  shownNpcHp,
  shownNpcMp,
  npcEffAgi,
  npcDodgePct,
  isNpcHit,
  isImpactPose,
  activeBeat,
  outcome,
  isAnimating,
  getUnitShownHp,
  getUnitShownMp,
}: EnemyStatusPanelProps) {
  if (enemies.length > 1) {
    return (
      <section className="pointer-events-auto w-full lg:w-[385px] xl:w-[420px] space-y-1.5">
        <div className="flex items-center justify-between px-2 py-0.5 rounded-lg bg-[#1a110a]/85 border border-[#d4a455]/50 text-[11px] text-[#f5dfb8]">
          <span className="flex items-center gap-1 font-medium">
            <Crosshair className="w-3.5 h-3.5 text-[#fde047]" />
            点击下方敌手或立绘切换攻击目标（快捷键 Tab）
          </span>
          <span className="font-mono text-[10px] text-[#d6be99]">
            在阵 {livingEnemiesCount}/{enemies.length}
          </span>
        </div>

        {enemies.map((enemyUnit) => {
          const eHp = getUnitShownHp(enemyUnit)
          const eMp = getUnitShownMp(enemyUnit)
          const eHpPct = Math.max(0, Math.min(100, Math.round((eHp / Math.max(1, enemyUnit.maxHp)) * 100)))
          const eMpPct = Math.max(0, Math.min(100, Math.round((eMp / Math.max(1, enemyUnit.maxMp)) * 100)))
          const eAgi = computeEffectiveAgility(enemyUnit)
          const eDodge = Math.round(computeDodgeChancePreview(enemyUnit, player, false) * 100)
          const eWeapon = enemyUnit.equipped.weapon ? ITEM_DB_MAP[enemyUnit.equipped.weapon] : null
          const isDead = eHp <= 0
          const isTargeted = !isDead && effectiveTargetId === enemyUnit.unitId
          const unitHitNow =
            isImpactPose &&
            activeBeat?.kind === 'attack' &&
            activeBeat.targetUnitId === enemyUnit.unitId

          return (
            <div
              key={enemyUnit.unitId}
              onClick={
                !isDead && outcome === 'ongoing' && !isAnimating
                  ? () => onSelectTargetId(enemyUnit.unitId)
                  : undefined
              }
              className={`rounded-xl border backdrop-blur-md p-2.5 shadow-xl space-y-1.5 transition ${
                isDead
                  ? 'bg-[#17100a]/60 border-[#5e4a36]/35 opacity-55'
                  : unitHitNow
                    ? 'bg-[#2a120e]/90 border-[#ff6b57]'
                    : isTargeted
                      ? 'bg-[#24140d]/90 border-2 border-[#fde047] shadow-[0_0_18px_rgba(250,204,21,0.28)] cursor-pointer'
                      : 'bg-[#17100a]/82 border-[#d4a455]/45 hover:border-[#f5c76b] cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {isDead ? (
                    <span className="px-1.5 py-0.5 rounded bg-[#36201a] border border-[#8c584c]/50 text-[10px] text-[#d99e91]">
                      已败退
                    </span>
                  ) : isTargeted ? (
                    <span className="px-1.5 py-0.5 rounded bg-[#8f1d14] border border-[#fde047] text-[10px] font-bold text-[#fff5cc] flex items-center gap-0.5">
                      <Crosshair className="w-2.5 h-2.5" /> 锁定目标
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-[#2b1d12] border border-[#96774d]/50 text-[10px] text-[#dfc8a4]">
                      点击锁定
                    </span>
                  )}
                  <span className="text-[10px] text-[#cbb493] truncate">
                    {eWeapon ? eWeapon.name : '徒手'} · 身法{eAgi} · 闪{eDodge}%
                  </span>
                </div>

                <div className="flex items-center gap-1 min-w-0">
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#421c16] border border-[#d98773]/60 text-[#ffd2c7] shrink-0">
                    {enemyUnit.realm}
                  </span>
                  <span className="song-serif text-sm font-bold text-[#fff0d4] truncate">
                    {enemyUnit.name}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#ffe8e3] w-24 shrink-0">
                    HP {eHp}/{enemyUnit.maxHp}
                  </span>
                  <div className="relative flex-1 h-2 rounded-full bg-[#2e1310] border border-[#8c352b]/70 overflow-hidden">
                    <div
                      className="h-full ml-auto bg-gradient-to-l from-[#991f15] via-[#cf382b] to-[#f06254] transition-all duration-150"
                      style={{ width: `${eHpPct}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#dff4fc] w-24 shrink-0">
                    MP {eMp}/{enemyUnit.maxMp}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-[#102530] border border-[#2f6e8f]/60 overflow-hidden">
                    <div
                      className="h-full ml-auto bg-gradient-to-l from-[#1c5978] to-[#52bce8] transition-all duration-200"
                      style={{ width: `${eMpPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <FighterStatusBadges fighter={enemyUnit} />
            </div>
          )
        })}
      </section>
    )
  }

  const npcQiDrivePct = Math.round((Math.sqrt(Math.max(0, shownNpcMp)) / 50) * 100)
  const nHpPct = Math.max(0, Math.min(100, Math.round((shownNpcHp / Math.max(1, npc.maxHp)) * 100)))
  const nMpPct = Math.max(0, Math.min(100, Math.round((shownNpcMp / Math.max(1, npc.maxMp)) * 100)))
  const nNeigong = npc.equippedArts.neigong ? MARTIAL_ART_DB_MAP[npc.equippedArts.neigong] : null
  const nNeigongLv = getLearnedLevel(npc.learnedArts, npc.equippedArts.neigong)
  const nQinggong = npc.equippedArts.qinggong ? MARTIAL_ART_DB_MAP[npc.equippedArts.qinggong] : null
  const nQinggongLv = getLearnedLevel(npc.learnedArts, npc.equippedArts.qinggong)
  const npcWeapon = npc.equipped.weapon ? ITEM_DB_MAP[npc.equipped.weapon] : null

  return (
    <section
      className={`pointer-events-auto w-full lg:w-[370px] xl:w-[405px] rounded-xl border bg-[#17100a]/82 backdrop-blur-md p-3 shadow-2xl space-y-2 transition-colors ${
        isNpcHit ? 'border-[#ff6b57]' : 'border-[#d4a455]/55'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="px-2 py-0.5 rounded bg-[#26190f] border border-[#96774d]/50 text-[10px] text-[#e6d2b3] shrink-0">
          兵刃：{npcWeapon ? npcWeapon.name : '徒手空拳'}
        </span>
        <div className="text-right min-w-0">
          <div className="flex items-center justify-end gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#421c16] border border-[#d98773]/60 text-[#ffd2c7]">
              {npc.realm}
            </span>
            <span className="song-serif text-base font-bold text-[#fff0d4] truncate">
              {npc.name}
            </span>
          </div>
          <div className="text-[10px] text-[#cbb697] truncate">
            {npc.factionName} · {npc.title} · 身法 {npcEffAgi} / 闪避 {npcDodgePct}%
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="font-mono text-[#ffe8e3]">
              {shownNpcHp} / {npc.maxHp} ({nHpPct}%)
            </span>
            <span className="text-[#f5bdb3] font-medium">气血</span>
          </div>
          <div className="relative h-2.5 rounded-full bg-[#2e1310] border border-[#8c352b]/70 overflow-hidden">
            <div
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-[#fde68a] to-[#fca5a5] opacity-90"
              style={{
                width: `${nHpPct}%`,
                transition: 'width 1150ms cubic-bezier(0.22, 1, 0.36, 1) 280ms',
              }}
            />
            <div
              className="relative h-full ml-auto bg-gradient-to-l from-[#991f15] via-[#cf382b] to-[#f06254] transition-all duration-150 ease-out"
              style={{ width: `${nHpPct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="font-mono text-[#dff4fc]">
              {shownNpcMp} / {npc.maxMp}
            </span>
            <span className="text-[#a6dbf2] font-medium">
              <span className="text-[10px] text-[#84bed9]">（催劲 +{npcQiDrivePct}%）</span> 内力
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[#102530] border border-[#2f6e8f]/70 overflow-hidden">
            <div
              className="h-full ml-auto bg-gradient-to-l from-[#1c5978] via-[#2d87b0] to-[#52bce8] transition-all duration-200"
              style={{ width: `${nMpPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-1 border-t border-[#9e7d4f]/35 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-[#cbb493]">
          <span className="font-mono text-[#dfc8a4]">
            攻{npc.equipAttack} 防{npc.equipDefense} 抗{npc.res}
          </span>
          <span className="truncate">
            内：<strong className="text-[#f5e2c1]">{nNeigong ? `${nNeigong.cleanName}·${nNeigongLv}重` : '未运'}</strong>
            {' · '}
            轻：<strong className="text-[#cbf2df]">{nQinggong ? `${nQinggong.cleanName}·${nQinggongLv}重` : '未运'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          {MOVE_SLOT_KEYS.map((slot) => {
            const aid = npc.equippedArts[slot]
            const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
            const lv = getLearnedLevel(npc.learnedArts, aid)
            const isLocked = Boolean(art && npc.lastUsedArtId === art.id)
            return (
              <div
                key={slot}
                className={`px-1.5 py-0.5 rounded text-[10px] border truncate text-center ${
                  !art
                    ? 'bg-[#1a120b]/50 border-[#5c4832]/25 text-[#7d6a54]'
                    : isLocked
                      ? 'bg-[#361d15]/85 border-[#b86548]/65 text-[#d99e89] line-through'
                      : 'bg-[#261a10]/90 border-[#a68353]/45 text-[#f2dec0]'
                }`}
                title={
                  art
                    ? `${art.cleanName}（第${lv}重）${isLocked ? ' · 上合刚出，本合禁连发' : ''}`
                    : '空置'
                }
              >
                {art ? `${isLocked ? '🔒' : '⚔'}${art.cleanName}` : '—'}
              </div>
            )
          })}
        </div>
      </div>

      <FighterStatusBadges fighter={npc} />
    </section>
  )
}
