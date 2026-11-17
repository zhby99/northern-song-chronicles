import { Crosshair, Package, Shield, Wind } from 'lucide-react'
import { getArtLevelStats } from '../../data/playerMartialArts'
import {
  getMartialCategoryInstinct,
  getSlotEffectsMap,
  type CombatActionChoice,
  type CombatantState,
  type CombatRoundBeat,
  type CombatSessionState,
  type MoveActionAvailability,
  type MoveSlotKey,
} from '../../engine/combat'

const SLOT_SHORTCUT_LABELS: Record<MoveSlotKey, string> = {
  move1: '1',
  move2: '2',
  move3: '3',
  move4: '4',
}

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

interface CombatActionDeckProps {
  session: CombatSessionState
  npc: CombatantState
  sceneTitle: string
  isAnimating: boolean
  activeBeat: CombatRoundBeat | null
  moveOptions: MoveActionAvailability[]
  effectiveTargetId: string
  onSelectTargetId: (unitId: string) => void
  escapeStatus: { allowed: boolean; reason: string | null }
  escapeChancePct: number
  defendDodgePct: number
  agiDiff: number
  combatBagCount: number
  onOpenBag: () => void
  onSkipChoreography: () => void
  onSubmitAction: (choice: CombatActionChoice) => void
  onFinishCombat: () => void
}

export function CombatActionDeck({
  session,
  npc,
  sceneTitle,
  isAnimating,
  activeBeat,
  moveOptions,
  effectiveTargetId,
  onSelectTargetId,
  escapeStatus,
  escapeChancePct,
  defendDodgePct,
  agiDiff,
  combatBagCount,
  onOpenBag,
  onSkipChoreography,
  onSubmitAction,
  onFinishCombat,
}: CombatActionDeckProps) {
  const { player, allies, enemies, outcome } = session
  const isMultiEnemy = enemies.length > 1
  const isMultiAlly = allies.length > 1
  const playerNgFx = getSlotEffectsMap(player, 'neigong')

  return (
    <div className="pointer-events-auto w-full max-w-7xl space-y-1.5">
      {!isAnimating && outcome === 'ongoing' && isMultiEnemy && (
        <div className="flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-xl border border-[#d4a455]/60 bg-[#1a110a]/88 backdrop-blur-md shadow-lg text-xs">
          <span className="flex items-center gap-1 text-[#f5dfb8] font-medium">
            <Crosshair className="w-3.5 h-3.5 text-[#fde047]" />
            本合出招目标（按 [Tab] 切换）：
          </span>
          {enemies.map((enemyUnit) => {
            const isDead = enemyUnit.hp <= 0
            const isSelected = !isDead && effectiveTargetId === enemyUnit.unitId
            return (
              <button
                key={enemyUnit.unitId}
                type="button"
                disabled={isDead}
                onClick={() => onSelectTargetId(enemyUnit.unitId)}
                className={`px-3 py-1 rounded-full border song-serif font-bold flex items-center gap-1.5 transition ${
                  isDead
                    ? 'bg-[#1c140e]/60 border-[#5c4836]/40 text-[#8a7560] line-through cursor-not-allowed'
                    : isSelected
                      ? 'bg-[#8f1d14] border-[#fde047] text-[#fff6d6] shadow-[0_0_12px_rgba(250,204,21,0.35)] cursor-pointer'
                      : 'bg-[#2b1d12] hover:bg-[#3d2819] border-[#b89258]/60 text-[#ebd6b5] cursor-pointer'
                }`}
              >
                {isSelected && <Crosshair className="w-3 h-3 text-[#fde047]" />}
                <span>{enemyUnit.name}</span>
                <span className="font-mono text-[10px] opacity-85">
                  {isDead ? '(败退)' : `(${enemyUnit.hp}/${enemyUnit.maxHp})`}
                </span>
              </button>
            )
          })}
          {isMultiAlly && allies[1] && allies[1].hp > 0 && (
            <span className="text-[11px] text-[#9bf2d0] ml-1">
              · 同伴【{allies[1].name}】亦将择敌协同出招
            </span>
          )}
        </div>
      )}

      {isAnimating ? (
        <button
          type="button"
          onClick={onSkipChoreography}
          className="w-full min-h-[76px] rounded-xl border border-[#e6b968]/75 bg-gradient-to-r from-[#24160c]/90 via-[#3b2212]/92 to-[#24160c]/90 hover:border-[#fde047] backdrop-blur-md px-5 py-3 shadow-2xl flex items-center justify-between gap-4 cursor-pointer transition"
        >
          <div className="flex items-center gap-3 text-left">
            <span className="px-2.5 py-1 rounded bg-[#7c2d12] border border-[#fbbf24]/70 text-xs font-bold song-serif text-[#fef3c7] animate-pulse">
              拆招演武中
            </span>
            <div>
              <div className="song-serif text-sm font-bold text-[#ffebc2]">
                {activeBeat?.bannerTitle ?? '双方交手拆招'}
              </div>
              <div className="text-xs text-[#d6be99]">
                {activeBeat?.bannerSubtitle ?? '金铁交鸣，真气激荡'}
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-black/45 border border-[#d4a455]/60 text-xs text-[#ffe3ad] shrink-0">
            点击此处或按 [Space] 跳过演出 ⏭
          </span>
        </button>
      ) : outcome === 'ongoing' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {moveOptions.map((opt) => {
            const shortcut = SLOT_SHORTCUT_LABELS[opt.slot]
            const art = opt.art
            const st = art ? getArtLevelStats(art, opt.level) : null
            const instinct = art ? getMartialCategoryInstinct(art.category) : null
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
                onClick={() =>
                  onSubmitAction({
                    type: 'move',
                    slot: opt.slot,
                    targetId: effectiveTargetId,
                  })
                }
                title={instinct ? `${art.cleanName}（${instinct.detail}）` : art.cleanName}
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

                  {(instinct || fxSummary) && (
                    <div
                      className="mt-0.5 text-[10px] text-[#e3bfff] truncate"
                      title={[instinct?.detail, fxSummary].filter(Boolean).join(' · ')}
                    >
                      {instinct && (
                        <span className="text-[#fbdf8c] mr-1">◆{instinct.shortTag}</span>
                      )}
                      {fxSummary && <span>✦ {fxSummary}</span>}
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
                      <span className="text-[#dfc8a4] truncate">
                        {isMultiEnemy ? `攻·${npc.name}` : '出招'}
                      </span>
                    </>
                  )}
                </div>
              </button>
            )
          })}

          {/* 5. 守御架势 */}
          <button
            type="button"
            onClick={() => onSubmitAction({ type: 'defend' })}
            title={`守御回复 10% 内力（+${Math.max(1, Math.round(player.maxMp * 0.1))}），双方同守回复 15%（+${Math.max(1, Math.round(player.maxMp * 0.15))}）；若对手本合强攻守御目标，下合陷入【破绽】（受创+25%·闪避-50%）`}
            className="rounded-xl border border-[#63b594]/65 bg-gradient-to-b from-[#163027]/92 to-[#0f211b]/92 hover:from-[#1f4236] hover:to-[#152e25] hover:border-[#93ebd0] p-2 text-left transition shadow-xl cursor-pointer active:scale-[0.99] flex flex-col justify-between min-h-[92px] backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 rounded bg-[#1f4236] border border-[#6bc49f]/50 text-[10px] font-mono text-[#c4f7df]">
                  [5 / D]
                </span>
                <Shield className="w-3.5 h-3.5 text-[#8fe3c0]" />
              </div>
              <div className="song-serif text-sm font-bold text-[#e3fcf0] mt-1">守御架势</div>
              <div className="text-[10px] text-[#b0e3cc] mt-0.5 leading-tight">
                受创减半 · 诱敌露破绽
                {playerNgFx.jingang_rebound ? ` · 反震${playerNgFx.jingang_rebound}%` : ''}
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-[#5bb892]/30 flex justify-between text-[10px] text-[#96e0c0]">
              <span>回内 +{Math.max(1, Math.round(player.maxMp * 0.1))}(10%)</span>
              <span>闪避 {defendDodgePct}%</span>
            </div>
          </button>

          {/* 6. 行囊丹毒 */}
          <button
            type="button"
            onClick={onOpenBag}
            className="rounded-xl border border-[#cf8a55]/65 bg-gradient-to-b from-[#331d14]/92 to-[#21120c]/92 hover:from-[#47281b] hover:to-[#2e1911] hover:border-[#f7bc7c] p-2 text-left transition shadow-xl cursor-pointer active:scale-[0.99] flex flex-col justify-between min-h-[92px] backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 rounded bg-[#47281b] border border-[#d9955b]/50 text-[10px] font-mono text-[#ffe0bd]">
                  [B]
                </span>
                <Package className="w-3.5 h-3.5 text-[#f5b97a]" />
              </div>
              <div className="song-serif text-sm font-bold text-[#ffebd4] mt-1">行囊丹毒</div>
              <div className="text-[10px] text-[#debca0] mt-0.5 leading-tight">
                探囊服食灵丹或施放奇毒
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-[#b87c4c]/30 flex justify-between text-[10px] text-[#f5caa0]">
              <span>可用 {combatBagCount} 种</span>
              <span>点击展匣</span>
            </div>
          </button>

          {/* 7. 抽身脱战 */}
          <button
            type="button"
            disabled={!escapeStatus.allowed}
            onClick={() => onSubmitAction({ type: 'escape' })}
            className={`rounded-xl border p-2 text-left transition flex flex-col justify-between min-h-[92px] backdrop-blur-md ${
              !escapeStatus.allowed
                ? 'border-[#7a382e]/55 bg-[#24120f]/80 opacity-75 cursor-not-allowed'
                : 'border-[#c4a05e]/65 bg-gradient-to-b from-[#2b2214]/92 to-[#1c160d]/92 hover:from-[#3b2f1c] hover:to-[#261e12] hover:border-[#f0d499] shadow-xl cursor-pointer active:scale-[0.99]'
            }`}
            title={
              escapeStatus.reason ??
              `当前双方身法差 ${agiDiff >= 0 ? `+${agiDiff}` : agiDiff}，脱战成功率 ${escapeChancePct}%`
            }
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 rounded bg-[#382d1c] border border-[#bfa065]/45 text-[10px] font-mono text-[#f2dfb6]">
                  [6 / E]
                </span>
                <Wind className="w-3.5 h-3.5 text-[#e6cb95]" />
              </div>
              <div className="song-serif text-sm font-bold text-[#faecd0] mt-1">抽身脱战</div>
              <div className="text-[10px] text-[#d4c09b] mt-0.5 leading-tight">
                {!escapeStatus.allowed
                  ? '身法悬殊受制，无法脱战'
                  : `身法差 ${agiDiff >= 0 ? `+${agiDiff}` : agiDiff} · 轻功撤离`}
              </div>
            </div>
            <div className="mt-1 pt-1 border-t border-[#9e824d]/30 text-[10px]">
              {!escapeStatus.allowed ? (
                <span className="text-[#ff9c8f] truncate block">🔒 {escapeStatus.reason}</span>
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
                    : outcome === 'npc_win' && session.mode === 'duel'
                      ? 'bg-[#5c0d08] border-[#ef7b6c] text-[#ffd6d1]'
                      : outcome === 'draw'
                        ? 'bg-[#423015] border-[#d9ae5f] text-[#f7dfad]'
                        : 'bg-[#2a2520] border-[#9e8b74] text-[#e3d5c3]'
                }`}
              >
                {outcome === 'player_win'
                  ? session.surviveToWin && session.npc.hp > 0
                    ? `撑满 ${session.maxRounds} 合 · 成功破局`
                    : session.mode === 'duel'
                      ? '生死决胜 · 斩敌凯旋'
                      : '承让 · 武林凯旋'
                  : outcome === 'draw'
                    ? '秋色平分 · 不分伯仲'
                    : outcome === 'escaped'
                      ? '虚晃一招 · 飘然脱身'
                      : session.mode === 'duel'
                        ? session.duelStakes === 'zhan_zhao_arrest'
                          ? '失手被擒 · 押赴市曹处斩'
                          : '生死败亡 · 命殒当场'
                        : '点到为止 · 抱拳认输'}
              </span>
              <span className="text-xs text-[#dec7a6]">
                于【{sceneTitle}】共交锋 {session.round} 合
              </span>
            </div>
            <p className="text-xs text-[#faebd0]">
              {outcome === 'npc_win' && session.mode === 'duel' ? (
                <span className="text-[#ffaba1] font-medium">
                  {session.duelStakes === 'zhan_zhao_arrest'
                    ? '少侠难敌御猫展昭巨阙锋芒，戴枷押入开封府死牢，狗头铡下身首异处……'
                    : `刀剑无眼，生死相搏既分高下亦决生死，少侠气绝倒地，命殒【${enemies.map((e) => e.name).join('、')}】手下……`}
                </span>
              ) : outcome === 'player_win' && session.duelStakes === 'liao_spy_duel' ? (
                <span className="text-[#ffe7b8]">
                  辽国密谍【{enemies.map((e) => e.name).join('、')}】已伏诛毙命，塞北边患暂平。少侠收枪整衣，径直抽身离去。（{session.rewardsSummary ?? '已印证所学武道。'}）
                </span>
              ) : outcome === 'player_win' && session.duelStakes === 'kaifeng_warrant' ? (
                <span className="text-[#ffe7b8]">
                  海捕要犯【{enemies.map((e) => e.name).join('、')}】已被少侠当场制伏，交由地方官府押解归案。少侠收刃整衣，径直离去。（{session.rewardsSummary ?? '已印证所学武道。'}）
                </span>
              ) : (
                <>
                  <strong className="text-[#ffd68a]">实战收获：</strong>
                  {session.rewardsSummary ?? '已印证所学武道。'}
                </>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onFinishCombat}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-[#9c261b] to-[#701810] hover:from-[#b82f22] hover:to-[#871d14] border border-[#f0be69]/85 song-serif text-sm font-bold tracking-wider text-[#fff0cc] shadow-lg cursor-pointer shrink-0"
          >
            {outcome === 'npc_win' && session.mode === 'duel'
              ? '阖目赴死 · 进入结局结算 [Enter]'
              : outcome === 'player_win' &&
                  (session.duelStakes === 'liao_spy_duel' ||
                    session.duelStakes === 'kaifeng_warrant')
                ? '收招离去 [Enter]'
                : '抱拳收招 · 返回场景 [Enter]'}
          </button>
        </div>
      )}
    </div>
  )
}
