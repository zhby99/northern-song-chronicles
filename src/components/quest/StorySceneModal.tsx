import { useEffect, useMemo } from 'react'
import { evaluateQuestCondition, resolveStorySpeaker } from '../../engine/questEngine'
import { buildStoreEvalContext, useGameStore } from '../../store/useGameStore'
import { CutoutPortraitImg } from '../common/CutoutPortraitImg'

export function StorySceneModal() {
  const activeStoryScene = useGameStore((s) => s.activeStoryScene)
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const silver = useGameStore((s) => s.silver)
  const food = useGameStore((s) => s.food)
  const hp = useGameStore((s) => s.hp)
  const maxHp = useGameStore((s) => s.maxHp)
  const mp = useGameStore((s) => s.mp)
  const maxMp = useGameStore((s) => s.maxMp)
  const agility = useGameStore((s) => s.agility)
  const res = useGameStore((s) => s.res)
  const baseStats = useGameStore((s) => s.baseStats)
  const skills = useGameStore((s) => s.skills)
  const inventory = useGameStore((s) => s.inventory)
  const learnedArts = useGameStore((s) => s.learnedArts)
  const npcFavor = useGameStore((s) => s.npcFavor)
  const sectState = useGameStore((s) => s.sectState)
  const questState = useGameStore((s) => s.questState)
  const actionFeedback = useGameStore((s) => s.actionFeedback)

  const advanceStoryScene = useGameStore((s) => s.advanceStoryScene)
  const selectStoryChoice = useGameStore((s) => s.selectStoryChoice)
  const closeStoryScene = useGameStore((s) => s.closeStoryScene)

  const evalCtx = useMemo(
    () =>
      buildStoreEvalContext(
        {
          dayCount,
          shichenIdx,
          silver,
          food,
          hp,
          maxHp,
          mp,
          maxMp,
          agility,
          res,
          baseStats,
          skills,
          inventory,
          learnedArts,
          npcFavor,
          sectState,
          questState,
        },
        activeStoryScene?.contextNpc ?? null,
      ),
    [
      dayCount,
      shichenIdx,
      silver,
      food,
      hp,
      maxHp,
      mp,
      maxMp,
      agility,
      res,
      baseStats,
      skills,
      inventory,
      learnedArts,
      npcFavor,
      sectState,
      questState,
      activeStoryScene?.contextNpc,
    ],
  )

  useEffect(() => {
    if (!activeStoryScene) return
    const { scene, beatIndex } = activeStoryScene
    const isLastBeat = beatIndex >= scene.beats.length - 1
    const hasChoices = Boolean(scene.choices && scene.choices.length > 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (!isLastBeat || !hasChoices) {
          e.preventDefault()
          e.stopPropagation()
          advanceStoryScene()
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (!scene.mandatory) {
          closeStoryScene()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [activeStoryScene, advanceStoryScene, closeStoryScene])

  if (!activeStoryScene) return null

  const { scene, beatIndex, contextNpc } = activeStoryScene
  const currentBeat = scene.beats[Math.min(beatIndex, scene.beats.length - 1)]
  if (!currentBeat) return null

  const speakerInfo = resolveStorySpeaker(currentBeat.speaker, contextNpc)
  const isLastBeat = beatIndex >= scene.beats.length - 1
  const rawChoices = isLastBeat ? (scene.choices ?? []) : []

  const evaluatedChoices = rawChoices
    .map((ch) => {
      const check = ch.condition
        ? evaluateQuestCondition(ch.condition, evalCtx)
        : { passed: true, reason: null }
      return { choice: ch, passed: check.passed, reason: check.reason }
    })
    .filter((item) => !(item.choice.hideWhenUnavailable && !item.passed))

  return (
    <div
      className="fixed inset-0 z-42 pointer-events-auto flex flex-col justify-end items-center select-none"
      role="dialog"
      aria-modal="true"
      aria-label={scene.title}
    >
      {/* 宋式剧场暗角幕布 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a06]/90 via-[#17100a]/45 to-[#0f0a06]/60" />

      {/* 顶部卷题横匾 */}
      <div className="absolute top-6 inset-x-0 z-20 flex justify-center px-4 pointer-events-none">
        <div className="px-6 py-2 rounded-full bg-[#24170d]/92 border-2 border-[#c89d54] shadow-2xl text-center">
          <div className="song-serif font-bold text-base sm:text-lg text-[#f7e3b5] tracking-widest">
            《{scene.title}》
          </div>
          {scene.subtitle && (
            <div className="text-[11px] text-[#cbb289] tracking-wide">{scene.subtitle}</div>
          )}
        </div>
      </div>

      {/* 发言人物立绘层 */}
      {!speakerInfo.isNarrator && speakerInfo.portraitUrl && (
        <div className="absolute inset-x-0 top-16 bottom-36 z-10 flex items-end justify-center pointer-events-none">
          <div
            className="relative h-full w-full max-w-[86vw] flex items-end justify-center transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.85))',
            }}
          >
            <CutoutPortraitImg
              url={speakerInfo.portraitUrl}
              alt={speakerInfo.name}
              className="object-contain select-none"
            />
          </div>
        </div>
      )}

      {/* 底部宋风台词与抉择画卷 */}
      <div className="relative z-20 w-[min(94vw,920px)] mb-5 space-y-3">
        {/* 分支抉择区（抵达最后一幕且配置了 choices 时显现） */}
        {isLastBeat && evaluatedChoices.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#20150c]/95 border-2 border-[#b58b4c] shadow-2xl space-y-2">
            <div className="text-xs font-bold song-serif text-[#e7c78b] flex items-center justify-between border-b border-[#6e5233]/60 pb-1.5">
              <span>◆ 少侠抉择（不同禀赋、十艺与信物将导向殊途因果）</span>
              {actionFeedback && actionFeedback.tone === 'warn' && (
                <span className="text-[#ff9c8f] font-normal">{actionFeedback.text}</span>
              )}
            </div>
            <div className="space-y-2">
              {evaluatedChoices.map(({ choice, passed, reason }) => {
                const toneStyle = !passed
                  ? 'bg-[#2a2119]/75 border-[#635342] text-[#9e8e7a] cursor-not-allowed'
                  : choice.tone === 'danger'
                    ? 'bg-[#6e1710]/95 hover:bg-[#8c1e15] border-[#e3937b] text-[#fff6ee] cursor-pointer'
                    : choice.tone === 'jade'
                      ? 'bg-[#1b4636]/95 hover:bg-[#245c47] border-[#86c7ac] text-[#ecfaf3] cursor-pointer'
                      : choice.tone === 'primary'
                        ? 'bg-[#6b441b]/95 hover:bg-[#855522] border-[#e8be74] text-[#fff8e8] cursor-pointer'
                        : 'bg-[#362415]/95 hover:bg-[#4a321d] border-[#ab8856] text-[#f5e4c3] cursor-pointer'

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => selectStoryChoice(choice.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border transition-colors flex flex-wrap items-center justify-between gap-2 shadow ${toneStyle}`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold song-serif text-sm">{choice.label}</div>
                      {choice.subLabel && (
                        <div className="text-[11px] opacity-85">{choice.subLabel}</div>
                      )}
                    </div>
                    {choice.condition && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-mono shrink-0 ${
                          passed
                            ? 'bg-[#173b2d] text-[#9de3c4] border border-[#4e9979]'
                            : 'bg-[#4d1b16] text-[#ffb8ae] border border-[#9e473e]'
                        }`}
                      >
                        {passed ? '✓ 条件满足' : `🔒 ${reason ?? '条件未足'}`}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 台词主框 */}
        <div
          onClick={() => {
            if (!isLastBeat || evaluatedChoices.length === 0) {
              advanceStoryScene()
            }
          }}
          className={`px-6 py-4 rounded-xl bg-[#1d130b]/95 border-2 border-[#c89d54] shadow-2xl text-[#f7eedc] ${
            !isLastBeat || evaluatedChoices.length === 0 ? 'cursor-pointer hover:border-[#e6be73]' : ''
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 border-b border-[#5c4024]/70 pb-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold song-serif ${
                  speakerInfo.isNarrator
                    ? 'bg-[#5c4024] text-[#f7e3b5]'
                    : speakerInfo.isPlayer
                      ? 'bg-[#1f4d3b] text-[#e7f7ef]'
                      : 'bg-[#781710] text-[#fff3df]'
                }`}
              >
                {speakerInfo.name}
              </span>
              <span className="text-xs text-[#cbb289]">{speakerInfo.title}</span>
              {speakerInfo.factionName && (
                <span className="text-[11px] text-[#a38b67]">· {speakerInfo.factionName}</span>
              )}
            </div>
            <span className="text-[11px] font-mono text-[#a38b67]">
              第 {beatIndex + 1} / {scene.beats.length} 幕
            </span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#faf0dc] min-h-[3.2rem]">
            {currentBeat.text}
          </p>

          {(!isLastBeat || evaluatedChoices.length === 0) && (
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  advanceStoryScene()
                }}
                className="px-3.5 py-1 rounded bg-[#5c3d1e] hover:bg-[#785129] border border-[#d4aa63] text-xs font-bold song-serif text-[#fff6e0] cursor-pointer"
              >
                {isLastBeat ? '展卷续行 ▸' : '继续对话 (Space) ▸'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
