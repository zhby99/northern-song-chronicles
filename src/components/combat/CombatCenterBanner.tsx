import {
  FastForward,
  Flame,
  HelpCircle,
  Music,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useState } from 'react'
import {
  hasBattleBgmTracks,
  toggleBgmPlayback,
  useBgmMetaState,
} from '../../utils/bgmManager'
import { toggleCombatSfxEnabled, useCombatSfxEnabled } from '../../utils/combatSfx'
import type { CombatPaceMode } from './useCombatChoreography'

interface CombatCenterBannerProps {
  mode: 'spar' | 'duel'
  formationTag: string | null
  sceneTitle: string
  shownRound: number
  maxRounds: number
  isVisualClimax: boolean
  paceMode: CombatPaceMode
  onCyclePaceMode: () => void
  npcName: string
  playerEffAgi: number
  npcEffAgi: number
}

export function CombatCenterBanner({
  mode,
  formationTag,
  sceneTitle,
  shownRound,
  maxRounds,
  isVisualClimax,
  paceMode,
  onCyclePaceMode,
  npcName,
  playerEffAgi,
  npcEffAgi,
}: CombatCenterBannerProps) {
  const [showRulesHelp, setShowRulesHelp] = useState(false)
  const sfxEnabled = useCombatSfxEnabled()
  const bgmMeta = useBgmMetaState()
  const battleTracksReady = hasBattleBgmTracks()
  const agiDiff = playerEffAgi - npcEffAgi

  return (
    <div className="pointer-events-auto flex flex-col items-center gap-1.5 shrink-0">
      <div className="px-4 py-1.5 rounded-full bg-[#1a110a]/84 backdrop-blur-md border border-[#d4a455]/70 shadow-xl flex items-center gap-2.5">
        <span className="px-2 py-0.5 rounded bg-[#7d1d14] border border-[#eba45e]/70 song-serif text-[11px] font-bold text-[#ffebc2]">
          {mode === 'spar' ? '点到为止' : '江湖死斗'}
          {formationTag ? ` · ${formationTag}` : ''}
        </span>
        <span className="song-serif text-sm font-bold text-[#ffe09e] tracking-wider">
          【{sceneTitle}】 · 第 {shownRound} / {maxRounds} 合
        </span>

        {/* 战阵 BGM 开关 */}
        <button
          type="button"
          onClick={() => toggleBgmPlayback()}
          className={`px-2 py-0.5 rounded-full border text-[11px] flex items-center gap-1 transition cursor-pointer ${
            !bgmMeta.enabled
              ? 'bg-[#1f1710] border-[#6e5a40]/40 text-[#9c8669] hover:text-[#d4be9e]'
              : isVisualClimax
                ? 'bg-[#6b1610] border-[#fb923c] text-[#ffedd5] shadow-[0_0_12px_rgba(249,115,22,0.55)] animate-pulse'
                : 'bg-[#2c2013] border-[#d4a455]/60 text-[#ffe3ad] hover:bg-[#3d2c1a]'
          }`}
          title={
            bgmMeta.enabled
              ? battleTracksReady
                ? `当前战曲：${bgmMeta.playlist.tracks[bgmMeta.trackIndex]?.stem ?? '武林交锋战曲'}${isVisualClimax ? '（决死疾奏中！）' : ''} · 点击暂停背景乐`
                : '战阵背景乐已开启（沿用场景配乐；置入 audio/events/battle 或 audio/others 自动切换专属战曲）'
              : '点击开启背景战曲'
          }
        >
          {bgmMeta.enabled && isVisualClimax ? (
            <Flame className="w-3.5 h-3.5 text-[#fdba74]" />
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">
            {!bgmMeta.enabled ? '战曲停' : isVisualClimax ? '决死曲' : '战曲开'}
          </span>
        </button>

        {/* 演武音效开关 */}
        <button
          type="button"
          onClick={() => toggleCombatSfxEnabled()}
          className={`px-2 py-0.5 rounded-full border text-[11px] flex items-center gap-1 transition cursor-pointer ${
            sfxEnabled
              ? 'bg-[#2c2013] border-[#d4a455]/60 text-[#ffe3ad] hover:bg-[#3d2c1a]'
              : 'bg-[#1f1710] border-[#6e5a40]/40 text-[#9c8669] hover:text-[#d4be9e]'
          }`}
          title={sfxEnabled ? '点击关闭武侠交锋音效' : '点击开启武侠交锋音效'}
        >
          {sfxEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{sfxEnabled ? '音效开' : '静音'}</span>
        </button>

        {/* 三档演武节奏 */}
        <button
          type="button"
          onClick={onCyclePaceMode}
          className={`px-2.5 py-0.5 rounded-full border text-[11px] flex items-center gap-1 transition cursor-pointer ${
            paceMode === 'slow'
              ? 'bg-[#173628] border-[#6ee7b7]/80 text-[#d1fae5]'
              : paceMode === 'fast'
                ? 'bg-[#5c2b09] border-[#fbbf24] text-[#fef08a]'
                : 'bg-[#24180e] border-[#a8844c]/60 text-[#e8d3b2] hover:bg-[#362415]'
          }`}
          title="点击切换拆招演出节奏：标准（从容留白） -> 慢品（细看一招一式） -> 疾速（熟练快刷）"
        >
          <FastForward className="w-3 h-3" />
          <span>{paceMode === 'slow' ? '慢品' : paceMode === 'fast' ? '疾速' : '标准'}</span>
        </button>

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
        实战身法比（对 {npcName}）：<strong className="text-[#ffe3ad]">{playerEffAgi}</strong> vs{' '}
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
          <p>
            1. <strong>同步盲选与群战</strong>：每合在世参战者各自择敌亮牌，按实时身法高低依次出手（常规身法闪避封顶 35%）；1v2/2v2 可点选敌手或按 Tab 切换目标。
          </p>
          <p>
            2. <strong>守御与破绽博弈</strong>：守御受创减半、解除连招锁并回复 <strong>10% 内力上限</strong>（双方同守各回 <strong>15%</strong>）；若强攻守御目标，攻方下合陷入<strong>【破绽】（受创 +25% · 闪避 −50%）</strong>！
          </p>
          <p>
            3. <strong>外功大类本能</strong>：刀/棍破守 +30%；剑/指先手 +10；枪法后手反击 +20%；暗器无视 30% 闪避；毒功附着持续蚀血；音功震散削减内力。
          </p>
          <p>
            4. <strong>脱战与生死铁律</strong>：我方身法比敌阵快手低 20 点及以上无法脱战；非切磋实战一旦败亡即命殒当场（Game Over）。
          </p>
        </div>
      )}
    </div>
  )
}
