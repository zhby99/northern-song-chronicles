import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { HelpCircle, Package, Shield, Skull, Sparkles, Wind, X } from 'lucide-react'
import {
  BUILDING_DB_MAP,
  MARTIAL_ART_DB_MAP,
  NPC_DB_MAP,
  resolveNpcByName,
} from '../../data/gameDb'
import {
  EQUIPMENT_SLOT_METAS,
  ITEM_DB_MAP,
  RARITY_STYLE_MAP,
} from '../../data/itemsDb'
import { getArtLevelStats } from '../../data/playerMartialArts'
import { useGameStore } from '../../store/useGameStore'
import { useLazyImage } from '../../utils/assetLoader'
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
import { NODE_MAP, REGIONAL_CONFIGS } from '../../utils/mapMath'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'

const SvgBuildingInteriorFallback = lazy(() =>
  import('../map/SvgBuildingInteriorFallback').then((m) => ({
    default: m.SvgBuildingInteriorFallback,
  })),
)

const SLOT_SHORTCUT_LABELS: Record<MoveSlotKey, string> = {
  move1: '1',
  move2: '2',
  move3: '3',
  move4: '4',
}

type BagFilterMode = 'all' | 'elixir' | 'poison'

function getTierBadgeStyle(tier: string): string {
  if (tier.startsWith('天阶上品')) {
    return 'bg-[#5c1912] text-[#ffe19c] border-[#f0bc5e]/80'
  }
  if (tier.startsWith('天阶')) {
    return 'bg-[#452610] text-[#f7cf83] border-[#d4a353]/70'
  }
  if (tier.startsWith('地阶')) {
    return 'bg-[#173b2e] text-[#a6ebd0] border-[#52b88e]/65'
  }
  if (tier.startsWith('良品') || tier.startsWith('良阶')) {
    return 'bg-[#183147] text-[#add8fa] border-[#5da0d6]/60'
  }
  return 'bg-[#2b221a] text-[#dfd0b8] border-[#967e5e]/50'
}

function getLogRowStyle(tone: CombatLogEntry['tone']): string {
  switch (tone) {
    case 'crit':
      return 'bg-[#4a1610]/90 border-l-2 border-[#f5be58] text-[#ffe8ba] font-medium'
    case 'special':
      return 'bg-[#2f1b38]/88 border-l-2 border-[#d19cf7] text-[#f0dcff]'
    case 'dodge':
      return 'bg-[#13332a]/88 border-l-2 border-[#63d9ac] text-[#c7f7e3]'
    case 'player':
      return 'bg-[#291d11]/85 border-l-2 border-[#e0ab58] text-[#faead0]'
    case 'enemy':
      return 'bg-[#331714]/85 border-l-2 border-[#de7262] text-[#fad5cd]'
    case 'system':
      return 'bg-[#332414]/92 border border-[#d4a455]/55 text-[#ffe1a8] font-semibold'
    default:
      return 'bg-[#1f160f]/82 border-l-2 border-[#967b58] text-[#e6d8c3]'
  }
}

function FighterStatusBadges({ fighter }: { fighter: CombatantState }) {
  const lockedArt = fighter.lastUsedArtId ? MARTIAL_ART_DB_MAP[fighter.lastUsedArtId] : null
  return (
    <div className="flex flex-wrap gap-1">
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

export function CombatOverlay() {
  const session = useGameStore((s) => s.activeCombat)
  const activeRegionId = useGameStore((s) => s.activeRegionId)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const selectedBuildingId = useGameStore((s) => s.selectedBuildingId)
  const inventory = useGameStore((s) => s.inventory)
  const submitCombatAction = useGameStore((s) => s.submitCombatAction)
  const finishCombatSession = useGameStore((s) => s.finishCombatSession)

  const [showRulesHelp, setShowRulesHelp] = useState(false)
  const [bagOpen, setBagOpen] = useState(false)
  const [bagFilter, setBagFilter] = useState<BagFilterMode>('all')
  const logContainerRef = useRef<HTMLDivElement | null>(null)

  // 解析双方交战所在的建筑实景（优先当前内景建筑 -> NPC 所属建筑 -> 当前选中建筑）
  const duelBuilding = useMemo(() => {
    if (activeBuildingInteriorId && BUILDING_DB_MAP[activeBuildingInteriorId]) {
      return BUILDING_DB_MAP[activeBuildingInteriorId]!
    }
    if (session) {
      const npcRec =
        NPC_DB_MAP[session.npc.id] ??
        resolveNpcByName(session.npc.name) ??
        resolveNpcByName(session.npc.name.replace(/大师$/, ''))
      if (npcRec?.assignedBuildingId && BUILDING_DB_MAP[npcRec.assignedBuildingId]) {
        return BUILDING_DB_MAP[npcRec.assignedBuildingId]!
      }
    }
    if (selectedBuildingId && BUILDING_DB_MAP[selectedBuildingId]) {
      return BUILDING_DB_MAP[selectedBuildingId]!
    }
    return null
  }, [activeBuildingInteriorId, selectedBuildingId, session])

  const regionName = NODE_MAP[activeRegionId]?.name ?? '江湖'
  const sceneTitle = duelBuilding ? `${regionName} · ${duelBuilding.name}` : regionName

  const backgroundUri = useMemo(() => {
    if (duelBuilding?.interior?.panoramaUri) {
      return duelBuilding.interior.panoramaUri
    }
    if (!duelBuilding) {
      return REGIONAL_CONFIGS[activeRegionId]?.panoramaUri
    }
    return undefined
  }, [duelBuilding, activeRegionId])

  const { loadedUrl: loadedBgUrl } = useLazyImage(backgroundUri)

  // 行囊内可用的【丹药毒物】列表
  const combatBagItems = useMemo(() => {
    return inventory
      .filter((st) => {
        if (st.qty <= 0) return false
        const def = ITEM_DB_MAP[st.itemId]
        return Boolean(def && def.category === 'medicine' && (def.useEffect || def.poisonEffect))
      })
      .map((st) => ({
        qty: st.qty,
        item: ITEM_DB_MAP[st.itemId]!,
      }))
  }, [inventory])

  const filteredBagItems = useMemo(() => {
    if (bagFilter === 'elixir') {
      return combatBagItems.filter((x) => Boolean(x.item.useEffect) && !x.item.poisonEffect)
    }
    if (bagFilter === 'poison') {
      return combatBagItems.filter((x) => Boolean(x.item.poisonEffect))
    }
    return combatBagItems
  }, [combatBagItems, bagFilter])

  const moveOptions = useMemo(
    () => (session ? getMoveActionsAvailability(session.player) : []),
    [session],
  )
  const escapeStatus = useMemo(
    () =>
      session
        ? canFighterEscape(session.player, session.npc)
        : { allowed: true, reason: null },
    [session],
  )
  const escapeChancePct = useMemo(
    () =>
      session
        ? Math.round(computeEscapeChancePreview(session.player, session.npc) * 100)
        : 50,
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

  // 键盘快捷键：1~4 出招，5/D 守御，6/E 脱战，B 开关行囊；结束时 Enter/Space/Esc 收招
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
      if (e.key === 'Escape' && bagOpen) {
        e.preventDefault()
        e.stopPropagation()
        setBagOpen(false)
        return
      }
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        setBagOpen((v) => !v)
        return
      }
      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        const idx = Number(e.key) - 1
        const opt = moveOptions[idx]
        if (opt && !opt.disabled && opt.art) {
          e.preventDefault()
          setBagOpen(false)
          submitCombatAction({ type: 'move', slot: opt.slot })
        }
      } else if (e.key === '5' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setBagOpen(false)
        submitCombatAction({ type: 'defend' })
      } else if (e.key === '6' || e.key === 'e' || e.key === 'E') {
        if (escapeStatus.allowed) {
          e.preventDefault()
          setBagOpen(false)
          submitCombatAction({ type: 'escape' })
        }
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [session, bagOpen, moveOptions, escapeStatus.allowed, submitCombatAction, finishCombatSession])

  if (!session) return null

  const { player, npc, lastRoundSummary, outcome } = session
  const playerEffAgi = computeEffectiveAgility(player)
  const npcEffAgi = computeEffectiveAgility(npc)
  const agiDiff = playerEffAgi - npcEffAgi
  const playerDodgePct = Math.round(computeDodgeChancePreview(player, npc, false) * 100)
  const npcDodgePct = Math.round(computeDodgeChancePreview(npc, player, false) * 100)
  const playerQiDrivePct = Math.round((Math.sqrt(Math.max(0, player.mp)) / 50) * 100)
  const npcQiDrivePct = Math.round((Math.sqrt(Math.max(0, npc.mp)) / 50) * 100)
  const playerNgFx = getSlotEffectsMap(player, 'neigong')

  const pHpPct = Math.max(0, Math.min(100, Math.round((player.hp / Math.max(1, player.maxHp)) * 100)))
  const pMpPct = Math.max(0, Math.min(100, Math.round((player.mp / Math.max(1, player.maxMp)) * 100)))
  const nHpPct = Math.max(0, Math.min(100, Math.round((npc.hp / Math.max(1, npc.maxHp)) * 100)))
  const nMpPct = Math.max(0, Math.min(100, Math.round((npc.mp / Math.max(1, npc.maxMp)) * 100)))

  const pNeigong = player.equippedArts.neigong ? MARTIAL_ART_DB_MAP[player.equippedArts.neigong] : null
  const pNeigongLv = getLearnedLevel(player.learnedArts, player.equippedArts.neigong)
  const pQinggong = player.equippedArts.qinggong ? MARTIAL_ART_DB_MAP[player.equippedArts.qinggong] : null
  const pQinggongLv = getLearnedLevel(player.learnedArts, player.equippedArts.qinggong)

  const nNeigong = npc.equippedArts.neigong ? MARTIAL_ART_DB_MAP[npc.equippedArts.neigong] : null
  const nNeigongLv = getLearnedLevel(npc.learnedArts, npc.equippedArts.neigong)
  const nQinggong = npc.equippedArts.qinggong ? MARTIAL_ART_DB_MAP[npc.equippedArts.qinggong] : null
  const nQinggongLv = getLearnedLevel(npc.learnedArts, npc.equippedArts.qinggong)
  const npcWeapon = npc.equipped.weapon ? ITEM_DB_MAP[npc.equipped.weapon] : null

  const handleUseBagItem = (itemId: string) => {
    setBagOpen(false)
    submitCombatAction({ type: 'item', itemId })
  }

  return (
    <div
      className="fixed inset-0 z-45 pointer-events-auto select-none overflow-hidden text-[#f5e7cb]"
      role="dialog"
      aria-label="武林回合交锋"
    >
      {/* 0. 所在建筑实景背景层（景深柔焦虚化，烘托前景 3x 对峙立绘与宋韵空间感） */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#241a12]">
        {loadedBgUrl ? (
          <img
            src={loadedBgUrl}
            alt={sceneTitle}
            className="w-full h-full object-cover object-center blur-[6px] scale-105 brightness-95"
            decoding="async"
          />
        ) : duelBuilding ? (
          <Suspense fallback={null}>
            <svg
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full block blur-[6px] scale-105 brightness-95"
            >
              <SvgBuildingInteriorFallback building={duelBuilding} width={1600} height={900} />
            </svg>
          </Suspense>
        ) : null}

        {/* 顶底轻柔暗角衬托牌匾与战报文字 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#120b06]/70 via-[#120b06]/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#100905]/90 via-[#120b06]/45 to-transparent" />
      </div>

      {/* 1. 左右 3x 巨幅等比全身立绘对峙舞台（立于建筑庭院地面之上） */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[118px] h-[72vh] min-h-[420px] max-h-[780px] z-10 flex items-end justify-between px-[4vw] lg:px-[10vw] xl:px-[13vw]">
        {/* 左立绘：少侠 */}
        <div
          className="relative h-full w-[42vw] max-w-[520px] flex items-end justify-center transition-transform duration-300"
          style={{
            filter: 'drop-shadow(0 18px 32px rgba(0, 0, 0, 0.78))',
          }}
        >
          <CutoutPortraitImg
            url={player.portraitUrl}
            alt={player.name}
            className="object-contain object-bottom"
            style={{
              height: '96%',
              maxHeight: '100%',
              width: 'auto',
              maxWidth: '40vw',
            }}
          />
        </div>

        {/* 右立绘：对手名宿 */}
        <div
          className="relative h-full w-[42vw] max-w-[520px] flex items-end justify-center transition-transform duration-300"
          style={{
            filter: 'drop-shadow(0 18px 32px rgba(0, 0, 0, 0.78))',
          }}
        >
          <CutoutPortraitImg
            url={npc.portraitUrl}
            alt={npc.name}
            className="object-contain object-bottom"
            style={{
              height: '96%',
              maxHeight: '100%',
              width: 'auto',
              maxWidth: '40vw',
            }}
          />
        </div>
      </div>

      {/* 2. 顶部三段式浮空交锋铭牌（左：少侠血内+七槽披挂+背包按钮 | 中：建筑与回合牌 | 右：对手情报） */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-2.5 pointer-events-none">
        {/* 左上：少侠状态与披挂匣 */}
        <section className="pointer-events-auto w-full lg:w-[370px] xl:w-[405px] rounded-xl border border-[#d4a455]/55 bg-[#17100a]/82 backdrop-blur-md p-3 shadow-2xl space-y-2">
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

            {outcome === 'ongoing' && (
              <button
                type="button"
                onClick={() => setBagOpen((v) => !v)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition cursor-pointer shrink-0 shadow ${
                  bagOpen
                    ? 'bg-[#8f1d14] border-[#f5c76b] text-[#fff6e0]'
                    : 'bg-[#2e1e12] hover:bg-[#422a18] border-[#d4a455]/70 text-[#ffdf9e]'
                }`}
                title="打开随身行囊使用丹药或战阵奇毒（快捷键 B）"
              >
                <Package className="w-3.5 h-3.5" />
                <span>行囊丹毒 ({combatBagItems.length}) [B]</span>
              </button>
            )}
          </div>

          {/* 气血与内力条 */}
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="text-[#f5bdb3] font-medium">气血</span>
                <span className="font-mono text-[#ffe8e3]">
                  {player.hp} / {player.maxHp} ({pHpPct}%)
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#2e1310] border border-[#8c352b]/70 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#991f15] via-[#cf382b] to-[#f06254] transition-all duration-300"
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
                  {player.mp} / {player.maxMp}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#102530] border border-[#2f6e8f]/70 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1c5978] via-[#2d87b0] to-[#52bce8] transition-all duration-300"
                  style={{ width: `${pMpPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* 血条下方：少侠随身七槽披挂与内轻功一览 */}
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
          </div>

          <FighterStatusBadges fighter={player} />
        </section>

        {/* 中上：所在建筑匾额 + 回合计数 + 法则速查 */}
        <div className="pointer-events-auto flex flex-col items-center gap-1.5 shrink-0">
          <div className="px-4 py-1.5 rounded-full bg-[#1a110a]/84 backdrop-blur-md border border-[#d4a455]/70 shadow-xl flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-[#7d1d14] border border-[#eba45e]/70 song-serif text-[11px] font-bold text-[#ffebc2]">
              {session.mode === 'spar' ? '点到为止' : '江湖死斗'}
            </span>
            <span className="song-serif text-sm font-bold text-[#ffe09e] tracking-wider">
              【{sceneTitle}】 · 第 {session.round} / {session.maxRounds} 合
            </span>
            <button
              type="button"
              onClick={() => setShowRulesHelp((v) => !v)}
              className="p-1 rounded-full hover:bg-[#382415] text-[#f2d496] transition cursor-pointer"
              title="查看交锋法则"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-0.5 rounded-full bg-[#170f09]/75 border border-[#a8844c]/45 text-[11px] text-[#e6d2b3]">
            实战身法比：<strong className="text-[#ffe3ad]">{playerEffAgi}</strong> vs{' '}
            <strong className="text-[#f7c5b9]">{npcEffAgi}</strong>
            <span className="ml-2 text-[#bfa886]">
              （{agiDiff >= 0 ? `少侠快 ${agiDiff}` : `对手快 ${-agiDiff}`}）
            </span>
          </div>

          {showRulesHelp && (
            <div className="mt-1 w-88 sm:w-96 rounded-xl border border-[#d4a455]/75 bg-[#1a110a]/96 backdrop-blur-md p-3.5 shadow-2xl text-xs text-[#ebd9be] space-y-1.5 leading-relaxed">
              <div className="flex items-center justify-between border-b border-[#8c6e46]/40 pb-1">
                <span className="song-serif font-bold text-[#ffd98e]">《皇祐武林实战交锋律》</span>
                <button
                  type="button"
                  onClick={() => setShowRulesHelp(false)}
                  className="text-[#bfa682] hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p>1. <strong>同步盲选</strong>：每合从［四式外功 / 守御 / 行囊丹毒 / 脱战］择一亮牌；禁连续两合出同一武学（守御或用丹毒后解除限制）。</p>
              <p>2. <strong>身法脱战铁律</strong>：脱战成功率随双方身法差动态升降；<strong>若我方身法比对手低 20 点及以上，被死死缠住无法脱战！</strong></p>
              <p>3. <strong>真气催劲与护体</strong>：耗内=威力×0.35；内力不足强催威力六折且无招式特效；物理受护具+内力+身法抵御，奇门毒音暗器受抗性抵御。</p>
            </div>
          )}
        </div>

        {/* 右上：对手状态与四招情报 */}
        <section className="pointer-events-auto w-full lg:w-[370px] xl:w-[405px] rounded-xl border border-[#d4a455]/55 bg-[#17100a]/82 backdrop-blur-md p-3 shadow-2xl space-y-2">
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

          {/* 对手气血与内力条 */}
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="font-mono text-[#ffe8e3]">
                  {npc.hp} / {npc.maxHp} ({nHpPct}%)
                </span>
                <span className="text-[#f5bdb3] font-medium">气血</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#2e1310] border border-[#8c352b]/70 overflow-hidden">
                <div
                  className="h-full ml-auto bg-gradient-to-l from-[#991f15] via-[#cf382b] to-[#f06254] transition-all duration-300"
                  style={{ width: `${nHpPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span className="font-mono text-[#dff4fc]">
                  {npc.mp} / {npc.maxMp}
                </span>
                <span className="text-[#a6dbf2] font-medium">
                  <span className="text-[10px] text-[#84bed9]">（催劲 +{npcQiDrivePct}%）</span> 内力
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#102530] border border-[#2f6e8f]/70 overflow-hidden">
                <div
                  className="h-full ml-auto bg-gradient-to-l from-[#1c5978] via-[#2d87b0] to-[#52bce8] transition-all duration-300"
                  style={{ width: `${nMpPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* 对手内轻功与四式外功锁提示 */}
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
      </div>

      {/* 3. 随身行囊 · 丹毒匣浮窗（点击【行囊丹毒】或按 B 呼出） */}
      {bagOpen && outcome === 'ongoing' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-2xl rounded-2xl border-2 border-[#d4a455] bg-[#f6ecd8] text-[#261a10] shadow-2xl overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-[#2c1b10] via-[#3d2515] to-[#2c1b10] text-[#ffebc2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#f5c76b]" />
                <h3 className="song-serif font-bold text-base tracking-wide">
                  随身行囊 · 临阵丹药与奇毒匣
                </h3>
                <span className="text-[11px] text-[#d6be99]">
                  （择一使用即作为本合亮牌行动，并解除连招锁）
                </span>
              </div>
              <button
                type="button"
                onClick={() => setBagOpen(false)}
                className="p-1 rounded hover:bg-white/10 text-[#e6cfab] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 分类筛选条 */}
            <div className="px-4 py-2 bg-[#eadbc0] border-b border-[#c9b086] flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setBagFilter('all')}
                className={`px-3 py-1 rounded-full border font-medium cursor-pointer ${
                  bagFilter === 'all'
                    ? 'bg-[#8f1d14] border-[#8f1d14] text-[#fff8eb]'
                    : 'bg-[#f7efe0] border-[#bfa377] text-[#4a3520]'
                }`}
              >
                全部 ({combatBagItems.length})
              </button>
              <button
                type="button"
                onClick={() => setBagFilter('elixir')}
                className={`px-3 py-1 rounded-full border font-medium flex items-center gap-1 cursor-pointer ${
                  bagFilter === 'elixir'
                    ? 'bg-[#1f5942] border-[#1f5942] text-[#fff8eb]'
                    : 'bg-[#f7efe0] border-[#bfa377] text-[#4a3520]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                疗伤灵丹茶膳
              </button>
              <button
                type="button"
                onClick={() => setBagFilter('poison')}
                className={`px-3 py-1 rounded-full border font-medium flex items-center gap-1 cursor-pointer ${
                  bagFilter === 'poison'
                    ? 'bg-[#592154] border-[#592154] text-[#fff8eb]'
                    : 'bg-[#f7efe0] border-[#bfa377] text-[#4a3520]'
                }`}
              >
                <Skull className="w-3 h-3" />
                战阵奇毒迷药
              </button>
            </div>

            {/* 物品列表 */}
            <div className="max-h-[52vh] overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredBagItems.length === 0 ? (
                <div className="col-span-2 py-10 text-center text-sm text-[#6e563a] song-serif">
                  当前分类下暂无可用丹药或毒物。战后可前往城中熟药所、药铺或行囊四库备置。
                </div>
              ) : (
                filteredBagItems.map(({ item, qty }) => {
                  const rStyle = RARITY_STYLE_MAP[item.rarity]
                  const isPoison = Boolean(item.poisonEffect)
                  const effTags: string[] = []
                  if (item.useEffect?.hp) effTags.push(`气血 +${item.useEffect.hp}`)
                  if (item.useEffect?.mp) effTags.push(`内力 +${item.useEffect.mp}`)
                  if (item.useEffect?.maxHp) effTags.push(`气血上限 +${item.useEffect.maxHp}`)
                  if (item.useEffect?.maxMp) effTags.push(`内力上限 +${item.useEffect.maxMp}`)
                  if (item.useEffect?.agi) effTags.push(`身法 +${item.useEffect.agi}`)
                  if (item.useEffect?.res) effTags.push(`抗性 +${item.useEffect.res}`)

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border-2 ${rStyle.borderCls} ${rStyle.cardBg} p-3 flex flex-col justify-between gap-2 shadow-sm`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${rStyle.badgeBg} ${rStyle.badgeText}`}
                            >
                              {item.rarity}
                            </span>
                            <span className="song-serif font-bold text-sm text-[#24180e] truncate">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#6b4f2e] shrink-0">
                            ×{qty}
                          </span>
                        </div>

                        <div className="mt-1 text-[11px] text-[#59432b] line-clamp-2">
                          {isPoison ? item.poisonEffect : effTags.join(' · ') || item.desc}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-[#cbb28a]/60">
                        <span className="text-[10px] text-[#785e3f]">{item.subType}</span>
                        <button
                          type="button"
                          onClick={() => handleUseBagItem(item.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold text-white shadow cursor-pointer transition ${
                            isPoison
                              ? 'bg-[#631d5c] hover:bg-[#7d2474]'
                              : 'bg-[#8f1d14] hover:bg-[#ad2419]'
                          }`}
                        >
                          {isPoison ? '临阵施毒' : '探囊服食'}
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. 下方居中：紧凑半透亮牌条与演武战报 + 底部指令台 */}
      <div className="absolute inset-x-0 bottom-0 z-25 px-3 sm:px-5 pb-3 flex flex-col items-center gap-2 pointer-events-none">
        {/* 中央轻薄半透战报匣（限宽居中，绝不遮挡两侧 3x 立绘与上方建筑内景） */}
        <div className="pointer-events-auto w-full max-w-3xl rounded-xl border border-[#d4a455]/50 bg-[#140d08]/76 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="px-3.5 py-1.5 border-b border-[#c99b4f]/30 bg-[#26170e]/85 flex items-center justify-between gap-2 text-xs">
            {lastRoundSummary ? (
              <>
                <span className="truncate">
                  <span className="text-[#c9b089] mr-1">少侠：</span>
                  <strong className="song-serif text-[#ffebc2]">
                    {lastRoundSummary.playerChoiceLabel}
                  </strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4d1a13] border border-[#e09b52]/60 text-[11px] text-[#ffdc9e] shrink-0">
                  第 {lastRoundSummary.round} 合先手：
                  <strong>{lastRoundSummary.firstMover === 'player' ? '少侠' : npc.name}</strong>
                </span>
                <span className="truncate text-right">
                  <span className="text-[#c9b089] mr-1">{npc.name}：</span>
                  <strong className="song-serif text-[#ffd2c7]">
                    {lastRoundSummary.npcChoiceLabel}
                  </strong>
                </span>
              </>
            ) : (
              <div className="w-full text-center text-[#ebd6b3] song-serif">
                双方于【{sceneTitle}】对峙行礼已毕 —— 请于下方盲选本合拆招指令
              </div>
            )}
          </div>

          <div
            ref={logContainerRef}
            className="max-h-[116px] overflow-y-auto px-3 py-1.5 space-y-1"
          >
            {session.logs.map((entry) => (
              <div
                key={entry.id}
                className={`px-2.5 py-1 rounded text-xs leading-snug ${getLogRowStyle(entry.tone)}`}
              >
                <span className="inline-block mr-1.5 font-mono text-[10px] opacity-75">
                  {entry.round === 0 ? '[开场]' : `[第${entry.round}合]`}
                </span>
                <span>{entry.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 底部操作指令台（4 外功 + 守御 + 行囊丹毒 + 抽身脱战） */}
        <div className="pointer-events-auto w-full max-w-7xl">
          {outcome === 'ongoing' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
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
                      className="rounded-xl border border-[#755b3e]/35 bg-[#17100b]/72 backdrop-blur-sm p-2 text-left opacity-55 cursor-not-allowed flex flex-col justify-between min-h-[92px]"
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
                    </button>
                  )
                }

                return (
                  <button
                    key={opt.slot}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => submitCombatAction({ type: 'move', slot: opt.slot })}
                    className={`rounded-xl border p-2 text-left transition flex flex-col justify-between min-h-[92px] backdrop-blur-md ${
                      opt.disabled
                        ? 'border-[#6e5239]/40 bg-[#1a120d]/75 opacity-60 cursor-not-allowed'
                        : 'border-[#d4a455]/65 bg-gradient-to-b from-[#2b1c11]/92 to-[#1c120b]/92 hover:from-[#3d2717] hover:to-[#28190f] hover:border-[#f5c76b] shadow-xl cursor-pointer active:scale-[0.99]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="px-1 py-0.5 rounded bg-[#3b2616] border border-[#c99b4f]/50 text-[10px] font-mono text-[#f5d598] shrink-0">
                            [{shortcut}]
                          </span>
                          <span className="song-serif text-sm font-bold text-[#ffeed4] truncate">
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

                      <div className="flex items-center gap-1 mt-1 text-[10px] text-[#d4be9c] truncate">
                        <span>
                          {opt.damageKind}·{art.category}
                        </span>
                        <span>·</span>
                        <span>
                          威力 <strong className="text-[#ffd891]">{opt.moveDamage}</strong>
                        </span>
                        {synPct > 0 && <span className="text-[#8ef0c0]">+{synPct}%</span>}
                      </div>

                      {fxSummary && (
                        <div className="mt-0.5 text-[10px] text-[#e3bfff] truncate" title={fxSummary}>
                          ✦ {fxSummary}
                        </div>
                      )}
                    </div>

                    <div className="mt-1 pt-1 border-t border-[#8c6e46]/30 flex items-center justify-between text-[10px]">
                      {opt.disabled ? (
                        <span className="text-[#f59889] truncate">🔒 {opt.disabledReason}</span>
                      ) : opt.lowMpWarning ? (
                        <span className="text-[#f7ad72] truncate">
                          ⚠️ 耗内 {opt.mpCost}（威力六折）
                        </span>
                      ) : (
                        <>
                          <span className="text-[#a3daf2]">耗内 {opt.mpCost}</span>
                          <span className="text-[#dfc8a4]">出招</span>
                        </>
                      )}
                    </div>
                  </button>
                )
              })}

              {/* 5. 守御架势 */}
              <button
                type="button"
                onClick={() => submitCombatAction({ type: 'defend' })}
                className="rounded-xl border border-[#63b594]/65 bg-gradient-to-b from-[#163027]/92 to-[#0f211b]/92 hover:from-[#1f4236] hover:to-[#152e25] hover:border-[#93ebd0] p-2 text-left transition shadow-xl cursor-pointer active:scale-[0.99] flex flex-col justify-between min-h-[92px] backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded bg-[#1f4236] border border-[#6bc49f]/50 text-[10px] font-mono text-[#c4f7df]">
                      [5 / D]
                    </span>
                    <Shield className="w-3.5 h-3.5 text-[#8fe3c0]" />
                  </div>
                  <div className="song-serif text-sm font-bold text-[#e3fcf0] mt-1">
                    守御架势
                  </div>
                  <div className="text-[10px] text-[#b0e3cc] mt-0.5 leading-tight">
                    受创减半 · 解除连招锁
                    {playerNgFx.jingang_rebound ? ` · 反震${playerNgFx.jingang_rebound}%` : ''}
                  </div>
                </div>
                <div className="mt-1 pt-1 border-t border-[#5bb892]/30 flex justify-between text-[10px] text-[#96e0c0]">
                  <span>耗内 0</span>
                  <span>闪避 {defendDodgePct}%</span>
                </div>
              </button>

              {/* 6. 行囊丹毒 */}
              <button
                type="button"
                onClick={() => setBagOpen(true)}
                className="rounded-xl border border-[#cf8a55]/65 bg-gradient-to-b from-[#331d14]/92 to-[#21120c]/92 hover:from-[#47281b] hover:to-[#2e1911] hover:border-[#f7bc7c] p-2 text-left transition shadow-xl cursor-pointer active:scale-[0.99] flex flex-col justify-between min-h-[92px] backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded bg-[#47281b] border border-[#d9955b]/50 text-[10px] font-mono text-[#ffe0bd]">
                      [B]
                    </span>
                    <Package className="w-3.5 h-3.5 text-[#f5b97a]" />
                  </div>
                  <div className="song-serif text-sm font-bold text-[#ffebd4] mt-1">
                    行囊丹毒
                  </div>
                  <div className="text-[10px] text-[#debca0] mt-0.5 leading-tight">
                    探囊服食灵丹或施放奇毒
                  </div>
                </div>
                <div className="mt-1 pt-1 border-t border-[#b87c4c]/30 flex justify-between text-[10px] text-[#f5caa0]">
                  <span>可用 {combatBagItems.length} 种</span>
                  <span>点击展匣</span>
                </div>
              </button>

              {/* 7. 抽身脱战（与双方身法强绑定，低 20 以上禁止脱战） */}
              <button
                type="button"
                disabled={!escapeStatus.allowed}
                onClick={() => submitCombatAction({ type: 'escape' })}
                className={`rounded-xl border p-2 text-left transition flex flex-col justify-between min-h-[92px] backdrop-blur-md ${
                  !escapeStatus.allowed
                    ? 'border-[#7a382e]/55 bg-[#24120f]/80 opacity-75 cursor-not-allowed'
                    : 'border-[#c4a05e]/65 bg-gradient-to-b from-[#2b2214]/92 to-[#1c160d]/92 hover:from-[#3b2f1c] hover:to-[#261e12] hover:border-[#f0d499] shadow-xl cursor-pointer active:scale-[0.99]'
                }`}
                title={escapeStatus.reason ?? `当前双方身法差 ${agiDiff >= 0 ? `+${agiDiff}` : agiDiff}，脱战成功率 ${escapeChancePct}%`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded bg-[#382d1c] border border-[#bfa065]/45 text-[10px] font-mono text-[#f2dfb6]">
                      [6 / E]
                    </span>
                    <Wind className="w-3.5 h-3.5 text-[#e6cb95]" />
                  </div>
                  <div className="song-serif text-sm font-bold text-[#faecd0] mt-1">
                    抽身脱战
                  </div>
                  <div className="text-[10px] text-[#d4c09b] mt-0.5 leading-tight">
                    {!escapeStatus.allowed
                      ? '身法悬殊受制，无法脱战'
                      : `身法差 ${agiDiff >= 0 ? `+${agiDiff}` : agiDiff} · 轻功撤离`}
                  </div>
                </div>
                <div className="mt-1 pt-1 border-t border-[#9e824d]/30 text-[10px]">
                  {!escapeStatus.allowed ? (
                    <span className="text-[#ff9c8f] truncate block">
                      🔒 {escapeStatus.reason}
                    </span>
                  ) : (
                    <div className="flex justify-between text-[#ebd3a7]">
                      <span>成功率 {escapeChancePct}%</span>
                      <span>虚晃脱身</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ) : (
            /* 战后结算横卷 */
            <div className="rounded-xl border-2 border-[#d4a455]/85 bg-[#21140b]/92 backdrop-blur-md px-5 py-3.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
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
                  <span className="text-xs text-[#dec7a6]">
                    于【{sceneTitle}】共拆招 {session.round} 合
                  </span>
                </div>
                <p className="text-xs text-[#faebd0]">
                  <strong className="text-[#ffd68a]">演武收获：</strong>
                  {session.rewardsSummary ?? '已印证所学武道。'}
                </p>
              </div>

              <button
                type="button"
                onClick={finishCombatSession}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-[#9c261b] to-[#701810] hover:from-[#b82f22] hover:to-[#871d14] border border-[#f0be69]/85 song-serif text-sm font-bold tracking-wider text-[#fff0cc] shadow-lg cursor-pointer shrink-0"
              >
                抱拳收招 · 返回场景 [Enter]
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
