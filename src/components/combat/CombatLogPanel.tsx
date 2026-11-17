import { useEffect, useRef } from 'react'
import type { CombatLogEntry, CombatRoundSummary } from '../../utils/combatEngine'

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

interface CombatLogPanelProps {
  lastRoundSummary: CombatRoundSummary | null
  visibleLogs: CombatLogEntry[]
  isMultiAlly: boolean
  isMultiEnemy: boolean
  npcName: string
  formationTag: string | null
  sceneTitle: string
}

export function CombatLogPanel({
  lastRoundSummary,
  visibleLogs,
  isMultiAlly,
  isMultiEnemy,
  npcName,
  formationTag,
  sceneTitle,
}: CombatLogPanelProps) {
  const logContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = logContainerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [visibleLogs.length])

  return (
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
              <strong>
                {lastRoundSummary.firstMover === 'player'
                  ? isMultiAlly
                    ? '我方快手'
                    : '少侠'
                  : isMultiEnemy
                    ? '敌阵快手'
                    : npcName}
              </strong>
            </span>
            <span className="truncate text-right">
              <span className="text-[#c9b089] mr-1">
                {isMultiEnemy ? '敌阵：' : `${npcName}：`}
              </span>
              <strong className="song-serif text-[#ffd2c7]">
                {lastRoundSummary.npcChoiceLabel}
              </strong>
            </span>
          </>
        ) : (
          <div className="w-full text-center text-[#ebd6b3] song-serif">
            {formationTag ? `【${formationTag} 群战】` : ''}双方于【{sceneTitle}】对峙行礼已毕 ——{' '}
            {isMultiEnemy
              ? '请先选定本合攻击目标，再盲选拆招指令'
              : '请于下方盲选本合拆招指令'}
          </div>
        )}
      </div>

      <div
        ref={logContainerRef}
        className="max-h-[116px] overflow-y-auto px-3 py-1.5 space-y-1"
      >
        {visibleLogs.map((entry) => (
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
  )
}
