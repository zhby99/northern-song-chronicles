import { useEffect, useMemo, useRef, useState } from 'react'
import { MARTIAL_ART_DB_MAP } from '../../data/gameDb'
import { ITEM_DB_MAP } from '../../data/itemsDb'
import { getArtLevelStats } from '../../data/playerMartialArts'
import { useGameStore } from '../../store/useGameStore'
import {
  canFighterEscape,
  computeDodgeChancePreview,
  computeEffectiveAgility,
  computeEscapeChancePreview,
  getLearnedLevel,
  getMoveActionsAvailability,
  getSlotEffectsMap,
  MOVE_SLOT_KEYS,
  type CombatantState,
  type CombatLogEntry,
  type MoveSlotKey,
} from '../../utils/combatEngine'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'

const SLOT_SHORTCUT_LABELS: Record<MoveSlotKey, string> = {
  move1: '1',
  move2: '2',
  move3: '3',
  move4: '4',
}

function getTierBadgeStyle(tier: string): string {
  if (tier.startsWith('天阶上品')) {
    return 'bg-[#4b1812] text-[#ffd98e] border-[#e2ad52]/75'
  }
  if (tier.startsWith('天阶')) {
    return 'bg-[#3d2310] text-[#f5ca7b] border-[#c99b4f]/65'
  }
  if (tier.startsWith('地阶')) {
    return 'bg-[#17362b] text-[#9fe3c4] border-[#4ca882]/60'
  }
  if (tier.startsWith('良品') || tier.startsWith('良阶')) {
    return 'bg-[#182d3f] text-[#a6d3f5] border-[#5795c7]/55'
  }
  return 'bg-[#2a221b] text-[#d6c5ab] border-[#8c7658]/45'
}

function getLogRowStyle(tone: CombatLogEntry['tone']): string {
  switch (tone) {
    case 'crit':
      return 'bg-[#3f1510]/85 border-l-2 border-[#f0b44c] text-[#ffe5b4] font-medium'
    case 'special':
      return 'bg-[#2b1a33]/75 border-l-2 border-[#c893f5] text-[#ebd6ff]'
    case 'dodge':
      return 'bg-[#132e26]/75 border-l-2 border-[#5ad1a4] text-[#bdf2dc]'
    case 'player':
      return 'bg-[#261b10]/70 border-l-2 border-[#d9a452] text-[#f7e5c4]'
    case 'enemy':
      return 'bg-[#2d1613]/70 border-l-2 border-[#d46a59] text-[#f5cfc7]'
    case 'system':
      return 'bg-[#2f2214]/90 border border-[#c99b4f]/45 text-[#f7dca4] font-semibold'
    default:
      return 'bg-[#1f160f]/65 border-l-2 border-[#8c7353] text-[#dfd0b8]'
  }
}

function FighterStatusBadges({ fighter }: { fighter: CombatantState }) {
  const lockedArt = fighter.lastUsedArtId ? MARTIAL_ART_DB_MAP[fighter.lastUsedArtId] : null
  return (
    <div className="flex flex-wrap gap-1">
      {fighter.zixiaStacks > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#361d42]/90 border border-[#c68ef5]/60 text-[#edd4ff]">
          紫霞蓄劲 ×{fighter.zixiaStacks}
        </span>
      )}
      {fighter.zhemeishouStacks > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1a332b]/90 border border-[#62c9a2]/60 text-[#c6f7e3]">
          折梅化劲 ×{fighter.zhemeishouStacks}
        </span>
      )}
      {fighter.stunnedNextRound && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#591812]/95 border border-[#f2796b]/80 text-[#ffd3cc] animate-pulse">
          受震慑/封穴（禁出招）
        </span>
      )}
      {fighter.disarmedNextRound && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#4d2911]/95 border border-[#e89d56]/75 text-[#ffe0bf]">
          手腕受震（禁指/暗器）
        </span>
      )}
      {fighter.slowTurns > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#3a2a12]/95 border border-[#d6a84f]/70 text-[#fae3b4]">
          绊缠减速 -{fighter.slowPct}%（{fighter.slowTurns}合·禁逃）
        </span>
      )}
      {fighter.weakTurns > 0 && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#321a2e]/95 border border-[#cf74ba]/70 text-[#f7cdeed9]">
          真气滞涩 -{fighter.weakPct}%（{fighter.weakTurns}合）
        </span>
      )}
      {lockedArt && (
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#2a1f16]/90 border border-[#9e8058]/50 text-[#d8c3a5]">
          禁连发：《{lockedArt.cleanName}》
        </span>
      )}
    </div>
  )
}

function FighterColumnCard({
  fighter,
  opponent,
  align,
}: {
  fighter: CombatantState
  opponent: CombatantState
  align: 'left' | 'right'
}) {
  const hpPct = Math.max(0, Math.min(100, Math.round((fighter.hp / Math.max(1, fighter.maxHp)) * 100)))
  const mpPct = Math.max(0, Math.min(100, Math.round((fighter.mp / Math.max(1, fighter.maxMp)) * 100)))
  const effAgi = computeEffectiveAgility(fighter)
  const dodgePct = Math.round(computeDodgeChancePreview(fighter, opponent, false) * 100)
  const qiDriveBonusPct = Math.round((Math.sqrt(Math.max(0, fighter.mp)) / 50) * 100)

  const neigongArt = fighter.equippedArts.neigong
    ? MARTIAL_ART_DB_MAP[fighter.equippedArts.neigong]
    : null
  const neigongLv = getLearnedLevel(fighter.learnedArts, fighter.equippedArts.neigong)
  const qinggongArt = fighter.equippedArts.qinggong
    ? MARTIAL_ART_DB_MAP[fighter.equippedArts.qinggong]
    : null
  const qinggongLv = getLearnedLevel(fighter.learnedArts, fighter.equippedArts.qinggong)
  const weaponDef = fighter.equipped.weapon ? ITEM_DB_MAP[fighter.equipped.weapon] : null

  return (
    <section className="col-span-12 lg:col-span-3 flex flex-col justify-between rounded-xl border border-[#c99b4f]/35 bg-[#19110b]/88 p-3 shadow-2xl overflow-hidden">
      {/* 顶部名帖头栏 */}
      <div>
        <div
          className={`flex items-center justify-between gap-2 ${
            align === 'right' ? 'flex-row-reverse text-right' : ''
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="song-serif text-base font-bold text-[#faeccf] tracking-wide">
                {fighter.name}
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#362314] border border-[#c99b4f]/55 text-[#f2cd88]">
                {fighter.realm}
              </span>
            </div>
            <p className="text-[11px] text-[#c7b293] mt-0.5">
              {fighter.factionName} · {fighter.title}
            </p>
          </div>
          <div className="px-2 py-1 rounded bg-[#24180f] border border-[#8f724d]/45 text-[11px] text-[#e6d2b3] shrink-0">
            兵刃：{weaponDef ? weaponDef.name : '徒手空拳'}
          </div>
        </div>
      </div>

      {/* 立绘舞台 */}
      <div className="relative flex-1 min-h-[120px] max-h-[250px] my-2 rounded-lg border border-[#c99b4f]/20 bg-gradient-to-t from-[#26180f]/90 via-[#1a110a]/45 to-transparent flex items-end justify-center overflow-hidden">
        <CutoutPortraitImg
          url={fighter.portraitUrl}
          alt={fighter.name}
          className={align === 'left' ? 'object-contain' : 'object-contain'}
          style={{
            height: '94%',
            maxHeight: '100%',
            width: 'auto',
            filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.75))',
          }}
        />
        <div className="absolute top-1.5 left-1.5 right-1.5 z-10 pointer-events-none">
          <FighterStatusBadges fighter={fighter} />
        </div>
      </div>

      {/* 气血与真气条 */}
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="text-[#f0b7ad] font-medium">气血</span>
            <span className="font-mono text-[#ffe3dc]">
              {fighter.hp} / {fighter.maxHp} ({hpPct}%)
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[#2b1411] border border-[#7a2e25]/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8f1d14] via-[#c43427] to-[#e65b4c] transition-all duration-300"
              style={{ width: `${hpPct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-0.5">
            <span className="text-[#9fd4eb] font-medium">
              内力 <span className="text-[10px] text-[#7fb8d4]">（催劲 +{qiDriveBonusPct}%）</span>
            </span>
            <span className="font-mono text-[#d8f1fc]">
              {fighter.mp} / {fighter.maxMp}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[#10232e] border border-[#2c6685]/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1b5470] via-[#2b7ea3] to-[#4cb2db] transition-all duration-300"
              style={{ width: `${mpPct}%` }}
            />
          </div>
        </div>

        {/* 主运内功与轻功 */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <div className="px-2 py-1 rounded bg-[#23170f] border border-[#96774f]/35">
            <div className="text-[10px] text-[#b89f7d]">主运内功</div>
            <div className="text-[11px] text-[#f5e2c1] truncate font-medium">
              {neigongArt ? `${neigongArt.cleanName}·${neigongLv}重` : '未运内功'}
            </div>
          </div>
          <div className="px-2 py-1 rounded bg-[#23170f] border border-[#96774f]/35">
            <div className="text-[10px] text-[#b89f7d]">轻功身法</div>
            <div className="text-[11px] text-[#d6f2e4] truncate font-medium">
              {qinggongArt ? `${qinggongArt.cleanName}·${qinggongLv}重` : '凡俗步法'}
            </div>
          </div>
        </div>

        {/* 若为对手，展示其随身四招情报（含上回合已出招封锁提示，供玩家博弈预判） */}
        {!fighter.isPlayer && (
          <div className="pt-0.5">
            <div className="text-[10px] text-[#b89f7d] mb-1">对手随身外功路数（禁连发同招）：</div>
            <div className="grid grid-cols-2 gap-1">
              {MOVE_SLOT_KEYS.map((slot) => {
                const aid = fighter.equippedArts[slot]
                const art = aid ? MARTIAL_ART_DB_MAP[aid] : null
                const lv = getLearnedLevel(fighter.learnedArts, aid)
                const isLocked = Boolean(art && fighter.lastUsedArtId === art.id)
                return (
                  <div
                    key={slot}
                    className={`px-1.5 py-0.5 rounded text-[10px] border truncate ${
                      !art
                        ? 'bg-[#1a120c]/50 border-[#5c4832]/25 text-[#7d6a54]'
                        : isLocked
                          ? 'bg-[#2e1c14]/70 border-[#a35c42]/55 text-[#c79581] line-through'
                          : 'bg-[#241910] border-[#96774f]/40 text-[#ebd6b5]'
                    }`}
                    title={
                      art
                        ? `${art.cleanName}（第${lv}重）${isLocked ? ' · 上合刚出，本合禁连发' : ''}`
                        : '未装配'
                    }
                  >
                    {art ? `${isLocked ? '🔒' : '⚔'} ${art.cleanName}` : '— 空置 —'}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 四维交锋速览 */}
        <div className="grid grid-cols-4 gap-1 pt-1 border-t border-[#8c6e46]/25 text-center">
          <div className="bg-[#20150d] rounded py-1">
            <div className="text-[9px] text-[#b39b7b]">实战身法</div>
            <div className="text-[11px] font-mono text-[#f5dfb8]">{effAgi}</div>
          </div>
          <div className="bg-[#20150d] rounded py-1">
            <div className="text-[9px] text-[#b39b7b]">兵刃外攻</div>
            <div className="text-[11px] font-mono text-[#f5dfb8]">{fighter.equipAttack}</div>
          </div>
          <div className="bg-[#20150d] rounded py-1">
            <div className="text-[9px] text-[#b39b7b]">护体防具</div>
            <div className="text-[11px] font-mono text-[#f5dfb8]">{fighter.equipDefense}</div>
          </div>
          <div className="bg-[#20150d] rounded py-1">
            <div className="text-[9px] text-[#b39b7b]">抗性/闪避</div>
            <div className="text-[11px] font-mono text-[#a9e8cb]">
              {fighter.res}/{dodgePct}%
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CombatOverlay() {
  const session = useGameStore((s) => s.activeCombat)
  const submitCombatAction = useGameStore((s) => s.submitCombatAction)
  const finishCombatSession = useGameStore((s) => s.finishCombatSession)

  const [showRulesHelp, setShowRulesHelp] = useState(false)
  const logContainerRef = useRef<HTMLDivElement | null>(null)

  const moveOptions = useMemo(
    () => (session ? getMoveActionsAvailability(session.player) : []),
    [session],
  )
  const escapeStatus = useMemo(
    () => (session ? canFighterEscape(session.player) : { allowed: true, reason: null }),
    [session],
  )
  const escapeChancePct = useMemo(
    () =>
      session
        ? Math.round(computeEscapeChancePreview(session.player, session.npc) * 100)
        : 45,
    [session],
  )
  const defendDodgePct = useMemo(
    () =>
      session
        ? Math.round(computeDodgeChancePreview(session.player, session.npc, true) * 100)
        : 0,
    [session],
  )

  // 自动滚动战报至最新回合
  useEffect(() => {
    const el = logContainerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [session?.logs.length])

  // 键盘快捷键：1~4 出招，5/D 防御，6/E 逃跑；战斗结束时 Enter/Space/Escape 收招结算
  useEffect(() => {
    if (!session) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (session.outcome !== 'ongoing') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          finishCombatSession()
        }
        return
      }
      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const idx = Number(e.key) - 1
        const opt = moveOptions[idx]
        if (opt && !opt.disabled && opt.art) {
          e.preventDefault()
          submitCombatAction({ type: 'move', slot: opt.slot })
        }
      } else if (e.key === '5' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        submitCombatAction({ type: 'defend' })
      } else if (e.key === '6' || e.key === 'e' || e.key === 'E') {
        if (escapeStatus.allowed) {
          e.preventDefault()
          submitCombatAction({ type: 'escape' })
        }
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [session, moveOptions, escapeStatus.allowed, submitCombatAction, finishCombatSession])

  if (!session) return null

  const { player, npc, lastRoundSummary, outcome } = session
  const playerEffAgi = computeEffectiveAgility(player)
  const npcEffAgi = computeEffectiveAgility(npc)
  const playerNgFx = getSlotEffectsMap(player, 'neigong')

  return (
    <div
      className="fixed inset-0 z-45 pointer-events-auto flex flex-col justify-between bg-gradient-to-b from-[#110a06]/92 via-[#18100a]/82 to-[#0f0906]/96 backdrop-blur-[2px] text-[#f5e7cb] select-none overflow-hidden"
      role="dialog"
      aria-label="武林回合交锋"
    >
      {/* 顶部交锋横额 */}
      <header className="shrink-0 px-4 py-2.5 border-b border-[#c99b4f]/35 bg-[#160e09]/92 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#7c1d15] border border-[#e39b56]/70 song-serif text-xs font-bold tracking-widest text-[#ffebc2]">
            {session.mode === 'spar' ? '点到为止 · 武林切磋' : '生死相搏 · 江湖决斗'}
          </span>
          <span className="text-xs text-[#cbb697] hidden sm:inline">
            同步盲选六策 · 禁连续两回合施展同一招式
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-1 rounded-full bg-[#281a0f] border border-[#c99b4f]/65 shadow-inner flex items-center gap-3">
            <span className="song-serif text-sm font-bold text-[#ffd98e] tracking-wider">
              第 {session.round} / {session.maxRounds} 合
            </span>
            <span className="text-[11px] text-[#d6c2a3] border-l border-[#8f7148]/50 pl-3">
              先手身法比：<strong className="text-[#f7e4be]">{playerEffAgi}</strong> vs{' '}
              <strong className="text-[#f5c4b8]">{npcEffAgi}</strong>
            </span>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <span className="text-[11px] text-[#b8a182] hidden md:inline">
            快捷键：[1-4] 出招 · [5/D] 守御 · [6/E] 脱战
          </span>
          <button
            type="button"
            onClick={() => setShowRulesHelp((v) => !v)}
            className="px-2.5 py-1 rounded border border-[#c99b4f]/50 bg-[#26190f] hover:bg-[#362315] text-xs text-[#f2d69e] transition cursor-pointer"
          >
            {showRulesHelp ? '收起法则' : '交锋法则'}
          </button>

          {showRulesHelp && (
            <div className="absolute right-0 top-9 w-88 sm:w-96 z-50 rounded-xl border border-[#c99b4f]/70 bg-[#1b120b]/98 p-3.5 shadow-2xl text-xs text-[#e6d5ba] space-y-1.5 leading-relaxed">
              <div className="song-serif font-bold text-[#ffd98e] border-b border-[#8c6e46]/40 pb-1">
                《皇祐武林实战交锋律》
              </div>
              <p>1. <strong>同步盲选</strong>：每合双方同时从［四式外功 / 守御 / 脱战］六策中择一亮牌，禁连续两回合施展同一武学（守御后重置限制）。</p>
              <p>2. <strong>先后手与闪避</strong>：按实战身法（±3微扰）定先手；闪避率 = (守身法−攻身法)×0.35% + 守身法×0.15%。</p>
              <p>3. <strong>真气催劲与枯竭</strong>：招式耗内 = 威力×0.35；当前内力越高催劲越强；内力不足强催时威力六折且招式特效不显。</p>
              <p>4. <strong>护体减伤与正态检定</strong>：物理招式受护具+内力×0.16+身法×1.5抵御，奇门毒音暗器受抗性×5+内力×0.08抵御；最终乘［0.50~1.50］正态分布交锋浮动。</p>
            </div>
          )}
        </div>
      </header>

      {/* 中央三栏演武场 */}
      <div className="flex-1 min-h-0 px-4 py-2.5 grid grid-cols-12 gap-3 items-stretch overflow-y-auto lg:overflow-hidden">
        <FighterColumnCard fighter={player} opponent={npc} align="left" />

        {/* 中栏：亮牌横幅 + 滚动武侠战报 */}
        <section className="col-span-12 lg:col-span-6 flex flex-col min-h-[240px] lg:min-h-0 rounded-xl border border-[#c99b4f]/40 bg-[#140d08]/92 shadow-2xl overflow-hidden">
          {/* 本合同步亮牌揭示条 */}
          <div className="shrink-0 px-3.5 py-2.5 border-b border-[#c99b4f]/30 bg-gradient-to-r from-[#26170e] via-[#301c10] to-[#26170e]">
            {lastRoundSummary ? (
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#3b2814] text-[#f5d38e] text-[10px]">
                    少侠亮牌
                  </span>
                  <span className="song-serif font-bold text-[#ffebc2]">
                    {lastRoundSummary.playerChoiceLabel}
                  </span>
                </div>

                <div className="px-2.5 py-0.5 rounded-full bg-[#451812] border border-[#d9954c]/60 text-[11px] text-[#ffd89b] shrink-0">
                  第 {lastRoundSummary.round} 合先手：
                  <strong>
                    {lastRoundSummary.firstMover === 'player' ? '少侠' : npc.name}
                  </strong>
                </div>

                <div className="flex items-center gap-1.5 text-right">
                  <span className="song-serif font-bold text-[#ffd2c7]">
                    {lastRoundSummary.npcChoiceLabel}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#3d1915] text-[#f2a799] text-[10px]">
                    对手亮牌
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-[#dfc9a6] song-serif">
                双方抱拳行礼已毕 —— 请于下方六策中盲选第 1 合拆招指令
              </div>
            )}
          </div>

          {/* 演武战报卷轴 */}
          <div
            ref={logContainerRef}
            className="flex-1 min-h-0 overflow-y-auto px-3.5 py-2.5 space-y-1.5"
          >
            {session.logs.map((entry) => (
              <div
                key={entry.id}
                className={`px-2.5 py-1.5 rounded text-xs leading-relaxed ${getLogRowStyle(
                  entry.tone,
                )}`}
              >
                <span className="inline-block mr-1.5 font-mono text-[10px] opacity-75">
                  {entry.round === 0 ? '[开场]' : `[第${entry.round}合]`}
                </span>
                <span>{entry.text}</span>
              </div>
            ))}
          </div>
        </section>

        <FighterColumnCard fighter={npc} opponent={player} align="right" />
      </div>

      {/* 底部六策指令台 或 战后结算横卷 */}
      <footer className="shrink-0 px-4 pb-3 pt-1">
        {outcome === 'ongoing' ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
            {moveOptions.map((opt) => {
              const shortcut = SLOT_SHORTCUT_LABELS[opt.slot]
              const art = opt.art
              const st = art ? getArtLevelStats(art, opt.level) : null
              const fxSummary =
                st?.specialEffects && st.specialEffects.length > 0
                  ? st.specialEffects.map((f) => `${f.name}${f.value}${f.unit}`).join(' · ')
                  : null
              const synPct = player.synergyBonusBySlot[opt.slot] ?? 0

              if (!art) {
                return (
                  <button
                    key={opt.slot}
                    type="button"
                    disabled
                    className="rounded-xl border border-[#6e563a]/30 bg-[#17100b]/60 p-2.5 text-left opacity-55 cursor-not-allowed flex flex-col justify-between min-h-[104px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded bg-[#261b12] text-[10px] font-mono text-[#9c8467]">
                        [{shortcut}]
                      </span>
                      <span className="text-[10px] text-[#8a745a]">未配招式</span>
                    </div>
                    <div className="text-xs text-[#8a745a] song-serif my-auto text-center">
                      空置招式槽
                    </div>
                    <div className="text-[10px] text-[#6e5a44] text-center">
                      可于［披挂与武学］装配
                    </div>
                  </button>
                )
              }

              return (
                <button
                  key={opt.slot}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => submitCombatAction({ type: 'move', slot: opt.slot })}
                  className={`relative rounded-xl border p-2.5 text-left transition flex flex-col justify-between min-h-[104px] ${
                    opt.disabled
                      ? 'border-[#6e5239]/35 bg-[#1a120d]/70 opacity-60 cursor-not-allowed'
                      : 'border-[#c99b4f]/55 bg-gradient-to-b from-[#281a10] to-[#1c120b] hover:from-[#382314] hover:to-[#26180e] hover:border-[#f0c067] shadow-lg cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="px-1.5 py-0.5 rounded bg-[#382415] border border-[#c99b4f]/45 text-[10px] font-mono text-[#f5d598] shrink-0">
                          [{shortcut}]
                        </span>
                        <span className="song-serif text-sm font-bold text-[#ffecd0] truncate">
                          {art.cleanName}
                        </span>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] border shrink-0 ${getTierBadgeStyle(
                          art.tier,
                        )}`}
                      >
                        {opt.level}重
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[#cbb493]">
                      <span>
                        {opt.damageKind}·{art.category}
                      </span>
                      <span>·</span>
                      <span>
                        威力 <strong className="text-[#ffd791]">{opt.moveDamage}</strong>
                      </span>
                      {synPct > 0 && (
                        <span className="text-[#8ef0c0]">共鸣+{synPct}%</span>
                      )}
                    </div>

                    {fxSummary && (
                      <div className="mt-1 text-[10px] text-[#e0b8ff] truncate" title={fxSummary}>
                        ✦ {fxSummary}
                      </div>
                    )}
                  </div>

                  <div className="mt-1.5 pt-1 border-t border-[#8c6e46]/25 flex items-center justify-between text-[10px]">
                    {opt.disabled ? (
                      <span className="text-[#f09486] truncate">🔒 {opt.disabledReason}</span>
                    ) : opt.lowMpWarning ? (
                      <span className="text-[#f5a76c] truncate">
                        ⚠️ 耗内 {opt.mpCost}（不足·威力六折）
                      </span>
                    ) : (
                      <>
                        <span className="text-[#9fd4eb]">耗内 {opt.mpCost}</span>
                        <span className="text-[#d6be99]">点击出招</span>
                      </>
                    )}
                  </div>
                </button>
              )
            })}

            {/* 第 5 策：守御架势 */}
            <button
              type="button"
              onClick={() => submitCombatAction({ type: 'defend' })}
              className="rounded-xl border border-[#5fa889]/60 bg-gradient-to-b from-[#152b23] to-[#0f1f19] hover:from-[#1d3b30] hover:to-[#142921] hover:border-[#8be3bd] p-2.5 text-left transition shadow-lg cursor-pointer active:scale-[0.99] flex flex-col justify-between min-h-[104px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-[#1f4034] border border-[#6bc49f]/45 text-[10px] font-mono text-[#bff5dc]">
                    [5 / D]
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#1e4235] text-[#9fe8c7] border border-[#5bb892]/50">
                    耗内 0
                  </span>
                </div>
                <div className="song-serif text-sm font-bold text-[#dcfaec] mt-1">
                  守御架势
                </div>
                <div className="text-[10px] text-[#a9dec6] mt-0.5 leading-snug">
                  本合受创减半 · 解除同招连发锁
                  {playerNgFx.jingang_rebound
                    ? ` · 金刚反震 ${playerNgFx.jingang_rebound}%`
                    : ''}
                </div>
              </div>
              <div className="mt-1.5 pt-1 border-t border-[#5bb892]/25 flex justify-between text-[10px] text-[#8fd9b8]">
                <span>守御闪避 {defendDodgePct}%</span>
                <span>稳守待机</span>
              </div>
            </button>

            {/* 第 6 策：抽身脱战 */}
            <button
              type="button"
              disabled={!escapeStatus.allowed}
              onClick={() => submitCombatAction({ type: 'escape' })}
              className={`rounded-xl border p-2.5 text-left transition flex flex-col justify-between min-h-[104px] ${
                !escapeStatus.allowed
                  ? 'border-[#6e5239]/35 bg-[#1a120d]/70 opacity-60 cursor-not-allowed'
                  : 'border-[#b89658]/55 bg-gradient-to-b from-[#292114] to-[#1b150d] hover:from-[#382d1b] hover:to-[#241c11] hover:border-[#ebd096] shadow-lg cursor-pointer active:scale-[0.99]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-[#382d1c] border border-[#bfa065]/45 text-[10px] font-mono text-[#f2dfb6]">
                    [6 / E]
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#362b19] text-[#e8cf9c] border border-[#b59457]/50">
                    成功率 {escapeChancePct}%
                  </span>
                </div>
                <div className="song-serif text-sm font-bold text-[#f7e8c8] mt-1">
                  抽身脱战
                </div>
                <div className="text-[10px] text-[#cbb894] mt-0.5 leading-snug">
                  比拼双方轻功身法跃出战圈，罢斗收招
                </div>
              </div>
              <div className="mt-1.5 pt-1 border-t border-[#9e824d]/25 text-[10px]">
                {!escapeStatus.allowed ? (
                  <span className="text-[#f09486] truncate">🔒 {escapeStatus.reason}</span>
                ) : (
                  <span className="text-[#dec89e]">虚晃脱身</span>
                )}
              </div>
            </button>
          </div>
        ) : (
          /* 战后结算横卷 */
          <div className="rounded-xl border-2 border-[#d4a455]/75 bg-gradient-to-r from-[#24160d] via-[#301c10] to-[#24160d] px-5 py-3.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span
                  className={`px-3 py-0.5 rounded song-serif text-sm font-bold tracking-widest border ${
                    outcome === 'player_win'
                      ? 'bg-[#7d1d14] border-[#f2be66] text-[#ffeaad]'
                      : outcome === 'draw'
                        ? 'bg-[#423015] border-[#d9ae5f] text-[#f7dfad]'
                        : 'bg-[#2a2520] border-[#9e8b74] text-[#e3d5c3]'
                  }`}
                >
                  {outcome === 'player_win'
                    ? '承让 · 武林凯旋'
                    : outcome === 'draw'
                      ? '秋色平分 · 不分伯仲'
                      : outcome === 'escaped'
                        ? '虚晃一招 · 飘然脱身'
                        : '点到为止 · 抱拳认输'}
                </span>
                <span className="text-xs text-[#d6bfa0]">
                  共历 {session.round} 合交锋
                </span>
              </div>
              <p className="text-xs text-[#f5e4c6]">
                <strong className="text-[#ffd68a]">演武收获：</strong>
                {session.rewardsSummary ?? '已印证所学武道。'}
              </p>
            </div>

            <button
              type="button"
              onClick={finishCombatSession}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-[#9c261b] to-[#701810] hover:from-[#b82f22] hover:to-[#871d14] border border-[#f0be69]/80 song-serif text-sm font-bold tracking-wider text-[#fff0cc] shadow-lg cursor-pointer shrink-0"
            >
              抱拳收招 · 返回场景 [Enter]
            </button>
          </div>
        )}
      </footer>
    </div>
  )
}
