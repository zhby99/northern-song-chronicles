import { useMemo, useState } from 'react'
import { FACTION_DB_MAP, REGION_DB_MAP } from '../../../data/gameDb'
import { QUEST_MAP, QUEST_REGISTRY } from '../../../data/quests'
import { useGameStore } from '../../../store/useGameStore'
import type { QuestCategoryKey } from '../../../types/quest'
import {
  assessQuestRealmReadiness,
  estimateHeroRealm,
  type RealmReadinessStatus,
} from '../../../utils/realmUtils'

const QUEST_CATEGORY_META: Record<
  QuestCategoryKey,
  { label: string; bg: string; text: string }
> = {
  sect_entry: {
    label: '宗门入门',
    bg: 'bg-[#1f4d3b]',
    text: 'text-[#e7f7ef]',
  },
  sect_mission: {
    label: '师门要务',
    bg: 'bg-[#781710]',
    text: 'text-[#fff3df]',
  },
  city_story: {
    label: '州府风华',
    bg: 'bg-[#5c3d1e]',
    text: 'text-[#fde8c8]',
  },
  main_story: {
    label: '皇祐风云',
    bg: 'bg-[#8f1d14]',
    text: 'text-[#fff8ee]',
  },
  adventure: {
    label: '江湖奇遇',
    bg: 'bg-[#355263]',
    text: 'text-[#eef7fc]',
  },
}

const READINESS_BADGE_META: Record<RealmReadinessStatus, string> = {
  ready: 'bg-[#e2f2e8] border-[#78b791] text-[#1b5132]',
  challenging: 'bg-[#fdf2dc] border-[#d6a34f] text-[#8a5210]',
  dangerous: 'bg-[#f8e3e1] border-[#d6887f] text-[#8f1d14]',
}

export function QuestsTab() {
  const dayCount = useGameStore((s) => s.dayCount)
  const maxHp = useGameStore((s) => s.maxHp)
  const maxMp = useGameStore((s) => s.maxMp)
  const sectState = useGameStore((s) => s.sectState)
  const questState = useGameStore((s) => s.questState)
  const locateQuestTargetOnMap = useGameStore((s) => s.locateQuestTargetOnMap)

  const [subTab, setSubTab] = useState<'active' | 'available' | 'completed' | 'causal'>('active')

  const playerRealm = useMemo(() => estimateHeroRealm(maxHp, maxMp), [maxHp, maxMp])
  const activeList = Object.values(questState.activeQuests)
  const completedList = Object.values(questState.completedQuests)
  const availableList = useMemo(
    () =>
      QUEST_REGISTRY.filter(
        (q) => !questState.activeQuests[q.id] && !questState.completedQuests[q.id],
      ),
    [questState.activeQuests, questState.completedQuests],
  )
  const activeSpy = sectState.sectId === 'SECT-22' ? sectState.activeLiaoSpy : null
  const totalActiveCount = activeList.length + (activeSpy ? 1 : 0)

  const customFlags = Object.entries(questState.flags)

  return (
    <div className="space-y-4 text-xs sm:text-sm text-[#2a1d11]">
      {/* 顶部统计与子页签切换 */}
      <div className="p-3.5 rounded-lg bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSubTab('active')}
            className={`px-3.5 py-1.5 rounded font-bold song-serif border cursor-pointer transition-colors ${
              subTab === 'active'
                ? 'bg-[#781710] border-[#781710] text-[#fff8ee]'
                : 'bg-[#faf3e3] hover:bg-[#e8d8b9] border-[#bca37b] text-[#3d2814]'
            }`}
          >
            进行中卷宗 ({totalActiveCount})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('available')}
            className={`px-3.5 py-1.5 rounded font-bold song-serif border cursor-pointer transition-colors ${
              subTab === 'available'
                ? 'bg-[#355263] border-[#355263] text-[#fff8ee]'
                : 'bg-[#faf3e3] hover:bg-[#e8d8b9] border-[#bca37b] text-[#3d2814]'
            }`}
          >
            江湖传闻 · 可接 ({availableList.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('completed')}
            className={`px-3.5 py-1.5 rounded font-bold song-serif border cursor-pointer transition-colors ${
              subTab === 'completed'
                ? 'bg-[#1f4d3b] border-[#1f4d3b] text-[#fff8ee]'
                : 'bg-[#faf3e3] hover:bg-[#e8d8b9] border-[#bca37b] text-[#3d2814]'
            }`}
          >
            已了结传记 ({completedList.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('causal')}
            className={`px-3.5 py-1.5 rounded font-bold song-serif border cursor-pointer transition-colors ${
              subTab === 'causal'
                ? 'bg-[#5c3d1e] border-[#5c3d1e] text-[#fff8ee]'
                : 'bg-[#faf3e3] hover:bg-[#e8d8b9] border-[#bca37b] text-[#3d2814]'
            }`}
          >
            江湖因果与声名
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6b5235]">
          <span className="px-2 py-0.5 rounded bg-[#faf3e3] border border-[#cbb693] text-[#781710] font-bold">
            当前修为：{playerRealm.label}
          </span>
          <span>
            师门隶属：
            <strong className="text-[#23180f] ml-1">
              {sectState.sectId
                ? `${FACTION_DB_MAP[sectState.sectId]?.name ?? sectState.sectId} · ${sectState.rankLabel}`
                : '无门无派（自由游侠）'}
            </strong>
          </span>
        </div>
      </div>

      {/* 子页签 1：进行中卷宗 */}
      {subTab === 'active' && (
        <div className="space-y-3">
          {/* 常山枪派年度强制锄奸军令 */}
          {activeSpy && (() => {
            const spyReadiness = assessQuestRealmReadiness(maxHp, maxMp, undefined, activeSpy.realm)
            return (
              <div className="p-4 rounded-lg bg-[#fdf3eb] border-2 border-[#a83226] shadow-sm space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#8f1d14] text-[#fff8ee]">
                      半年度强制军令
                    </span>
                    <span className="font-bold song-serif text-base text-[#781710]">
                      燕云锄奸 · 诛杀辽国密谍【{activeSpy.name}】
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e] font-semibold">
                      建议修为：{spyReadiness.recommendedRealm.label}（敌手：{activeSpy.realm}）
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded border font-bold ${READINESS_BADGE_META[spyReadiness.status]}`}
                    >
                      {spyReadiness.statusLabel}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#f8e3e1] border border-[#d69891] text-[#8f1d14] font-bold">
                    军令死限：第 {activeSpy.deadlineDay} 日前（剩余{' '}
                    {Math.max(0, activeSpy.deadlineDay - dayCount)} 日）
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a3219] leading-relaxed">
                  河北边军密报：契丹密谍<strong>【{activeSpy.name}（{activeSpy.title} · {activeSpy.realm}）】</strong>
                  已潜入燕云<strong>【{activeSpy.regionName} · {activeSpy.buildingName}】</strong>
                  。请于期限届满前赶赴该处寻获密谍并开启生死对决将其诛除！
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      locateQuestTargetOnMap({
                        regionId: activeSpy.regionId,
                        buildingId: activeSpy.buildingId,
                        spotId: activeSpy.spotId ?? undefined,
                        customLabel: `${activeSpy.regionName} · ${activeSpy.buildingName}`,
                      })
                    }
                    className="px-3.5 py-1.5 rounded bg-[#781710] hover:bg-[#961f16] text-[#fff8ee] text-xs font-bold song-serif cursor-pointer shadow"
                  >
                    舆图定位：{activeSpy.regionName} · {activeSpy.buildingName} ▸
                  </button>
                </div>
              </div>
            )
          })()}

          {activeList.length === 0 && !activeSpy ? (
            <div className="p-8 rounded-lg bg-[#faf3e3] border border-[#d8c7a9] text-center space-y-1.5">
              <div className="song-serif font-bold text-base text-[#5c3d1e]">
                当前尚无进行中的江湖任务卷宗
              </div>
              <div className="text-xs text-[#7a5f3e]">
                少侠可切换至【江湖传闻 · 可接】查阅四方任务线索，或游历州府触发奇遇。
              </div>
            </div>
          ) : (
            activeList.map((prog) => {
              const qDef = QUEST_MAP[prog.questId]
              const step = qDef?.steps[prog.stepId]
              const catMeta =
                QUEST_CATEGORY_META[qDef?.category ?? 'adventure'] ??
                QUEST_CATEGORY_META.adventure
              const factionName = qDef?.factionId
                ? FACTION_DB_MAP[qDef.factionId]?.name
                : undefined
              const regName = qDef?.regionId ? REGION_DB_MAP[qDef.regionId]?.name : undefined
              const readiness = assessQuestRealmReadiness(
                maxHp,
                maxMp,
                qDef?.recommendedRealm,
                qDef?.maxOpponentRealm,
              )

              return (
                <div
                  key={prog.questId}
                  className="p-4 rounded-lg bg-[#faf3e3] border border-[#c8b28e] shadow-sm space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2d3b5] pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${catMeta.bg} ${catMeta.text}`}
                      >
                        {catMeta.label}
                      </span>
                      <span className="font-bold song-serif text-base text-[#23180f]">
                        《{qDef?.title ?? prog.questId}》
                      </span>
                      {factionName && (
                        <span className="text-xs px-2 py-0.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e]">
                          {factionName}
                        </span>
                      )}
                      {regName && (
                        <span className="text-xs text-[#7a5f3e]">· {regName}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#6b5235]">
                      <span className="px-2 py-0.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e] font-sans font-semibold">
                        建议修为：{readiness.recommendedRealm.label}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded border font-sans font-bold ${READINESS_BADGE_META[readiness.status]}`}
                      >
                        {readiness.statusLabel}
                      </span>
                      <span>第 {prog.startedDay} 日领受</span>
                      {prog.deadlineDay !== null && (
                        <span className="px-2 py-0.5 rounded bg-[#f8e3e1] text-[#8f1d14] font-bold">
                          限第 {prog.deadlineDay} 日前（剩{' '}
                          {Math.max(0, prog.deadlineDay - dayCount)} 日）
                        </span>
                      )}
                    </div>
                  </div>

                  {qDef?.recommendedNote && (
                    <div className="text-xs px-2.5 py-1.5 rounded bg-[#f5ecd7] border border-[#d8c49e] text-[#5c3d1e]">
                      <strong>修为参考：</strong>
                      {qDef.recommendedNote}
                    </div>
                  )}

                  {qDef?.summary && (
                    <p className="text-xs text-[#6b5235] leading-relaxed">{qDef.summary}</p>
                  )}

                  <div className="p-3 rounded bg-[#efe4cc]/85 border border-[#cbb693] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1 max-w-2xl">
                      <div className="font-bold text-[#781710] song-serif">
                        当前步骤：{step?.title ?? prog.stepId}
                      </div>
                      <div className="text-xs sm:text-sm text-[#2d1e10] leading-relaxed">
                        {step?.objective ?? '请按江湖线索继续探访。'}
                      </div>
                      {step?.nextHint && (
                        <div className="text-xs text-[#1f4d3b] font-semibold">
                          下一步提示：{step.nextHint}
                        </div>
                      )}
                    </div>

                    {step?.targetLocation && (
                      <button
                        type="button"
                        onClick={() => locateQuestTargetOnMap(step.targetLocation!)}
                        className="px-3.5 py-2 rounded bg-[#1f4d3b] hover:bg-[#27614a] text-[#fff8ee] text-xs font-bold song-serif cursor-pointer shadow shrink-0"
                      >
                        舆图定位：
                        {step.targetLocation.customLabel ??
                          REGION_DB_MAP[step.targetLocation.regionId]?.name ??
                          step.targetLocation.regionId}{' '}
                        ▸
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* 子页签 2：江湖传闻（可接取） */}
      {subTab === 'available' && (
        <div className="space-y-3">
          {availableList.length === 0 ? (
            <div className="p-8 rounded-lg bg-[#faf3e3] border border-[#d8c7a9] text-center text-xs text-[#7a5f3e]">
              当前已收录的江湖传闻均已承接或了结。
            </div>
          ) : (
            availableList.map((qDef) => {
              const catMeta =
                QUEST_CATEGORY_META[qDef.category] ?? QUEST_CATEGORY_META.adventure
              const factionName = qDef.factionId
                ? FACTION_DB_MAP[qDef.factionId]?.name
                : undefined
              const regName = qDef.regionId ? REGION_DB_MAP[qDef.regionId]?.name : undefined
              const readiness = assessQuestRealmReadiness(
                maxHp,
                maxMp,
                qDef.recommendedRealm,
                qDef.maxOpponentRealm,
              )

              return (
                <div
                  key={qDef.id}
                  className="p-4 rounded-lg bg-[#faf3e3] border border-[#c8b28e] shadow-sm space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2d3b5] pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${catMeta.bg} ${catMeta.text}`}
                      >
                        {catMeta.label}
                      </span>
                      <span className="font-bold song-serif text-base text-[#23180f]">
                        《{qDef.title}》
                      </span>
                      {factionName && (
                        <span className="text-xs px-2 py-0.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e]">
                          {factionName}
                        </span>
                      )}
                      {regName && <span className="text-xs text-[#7a5f3e]">· {regName}</span>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#efe4cc] border border-[#cbb693] text-[#5c3d1e] font-semibold">
                        建议修为：{readiness.recommendedRealm.label}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded border font-bold ${READINESS_BADGE_META[readiness.status]}`}
                      >
                        {readiness.statusLabel}
                      </span>
                    </div>
                  </div>

                  {qDef.recommendedNote && (
                    <div className="text-xs px-2.5 py-1.5 rounded bg-[#f5ecd7] border border-[#d8c49e] text-[#5c3d1e]">
                      <strong>修为参考：</strong>
                      {qDef.recommendedNote}
                    </div>
                  )}

                  <p className="text-xs text-[#6b5235] leading-relaxed">{qDef.summary}</p>

                  <div className="p-2.5 rounded bg-[#efe4cc]/85 border border-[#cbb693] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-[#2d1e10] max-w-2xl">
                      <strong className="text-[#781710]">触发线索：</strong>
                      {qDef.startHint ?? '游历对应州府与门派即可触发。'}
                    </div>
                    {qDef.startLocation && (
                      <button
                        type="button"
                        onClick={() => locateQuestTargetOnMap(qDef.startLocation!)}
                        className="px-3 py-1.5 rounded bg-[#355263] hover:bg-[#43687d] text-[#fff8ee] text-xs font-bold song-serif cursor-pointer shadow shrink-0"
                      >
                        舆图定位：{qDef.startLocation.customLabel ?? qDef.startLocation.regionId} ▸
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* 子页签 2：已了结传记 */}
      {subTab === 'completed' && (
        <div className="space-y-2.5">
          {completedList.length === 0 ? (
            <div className="p-8 rounded-lg bg-[#faf3e3] border border-[#d8c7a9] text-center text-xs text-[#7a5f3e]">
              尚无已完结的江湖任务传记。
            </div>
          ) : (
            completedList.map((rec) => {
              const qDef = QUEST_MAP[rec.questId]
              return (
                <div
                  key={rec.questId}
                  className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#cbb693] flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-bold song-serif text-[#1f4d3b] text-sm sm:text-base">
                      ✓ 《{qDef?.title ?? rec.questId}》
                    </div>
                    {qDef?.summary && (
                      <div className="text-xs text-[#6b5235] mt-0.5">{qDef.summary}</div>
                    )}
                  </div>
                  <div className="text-xs font-mono text-[#5c3d1e] bg-[#efe4cc] px-2.5 py-1 rounded border border-[#cbb693]">
                    第 {rec.completedDay} 日了结 · 结局：{rec.outcome}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* 子页签 3：江湖因果与门规声名 */}
      {subTab === 'causal' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              className={`p-3.5 rounded-lg border ${
                sectState.songCourtBlacklisted
                  ? 'bg-[#f8e3e1] border-[#c96f65]'
                  : 'bg-[#faf3e3] border-[#cbb693]'
              }`}
            >
              <div className="font-bold song-serif text-sm flex items-center justify-between">
                <span>大宋朝廷海捕黑名单</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold ${
                    sectState.songCourtBlacklisted
                      ? 'bg-[#8f1d14] text-[#fff8ee]'
                      : 'bg-[#e2f2e8] text-[#1b5132]'
                  }`}
                >
                  {sectState.songCourtBlacklisted ? '海捕通缉中' : '清白良民'}
                </span>
              </div>
              <p className="text-xs text-[#5c4024] mt-1.5 leading-relaxed">
                {sectState.songCourtBlacklisted
                  ? '少侠曾劫杀大宋命官以纳绿林投名状，名列开封府海捕文书！踏入其他州府尚可隐匿，一旦踏入【东京开封府】必遭御猫展昭拦路锁拿问斩！'
                  : '少侠未曾犯下劫杀大宋命官之重案，可自由出入东京开封府。'}
              </p>
            </div>

            <div
              className={`p-3.5 rounded-lg border ${
                sectState.liaoSuspicionDebuff
                  ? 'bg-[#f8e3e1] border-[#c96f65]'
                  : 'bg-[#faf3e3] border-[#cbb693]'
              }`}
            >
              <div className="font-bold song-serif text-sm flex items-center justify-between">
                <span>河北军伍 · 通辽嫌疑</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold ${
                    sectState.liaoSuspicionDebuff
                      ? 'bg-[#8f1d14] text-[#fff8ee]'
                      : 'bg-[#e2f2e8] text-[#1b5132]'
                  }`}
                >
                  {sectState.liaoSuspicionDebuff ? '背负恶名（大宋好感-30）' : '忠义无瑕'}
                </span>
              </div>
              <p className="text-xs text-[#5c4024] mt-1.5 leading-relaxed">
                {sectState.liaoSuspicionDebuff
                  ? '少侠曾擅自脱离常山枪派军伍，惹来私通契丹之嫌，大宋朝野与武林同道好感度均已折损 30 点。'
                  : '未曾擅离抗辽边军（若入常山枪派，须升至教习凭《开封府推荐信》正当调任方可免责）。'}
              </p>
            </div>
          </div>

          {customFlags.length > 0 && (
            <div className="p-3.5 rounded-lg bg-[#faf3e3] border border-[#cbb693] space-y-2">
              <div className="font-bold song-serif text-sm text-[#5c3d1e]">
                已铭刻的江湖因果印记 ({customFlags.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {customFlags.map(([k, v]) => (
                  <span
                    key={k}
                    className="px-2.5 py-1 rounded bg-[#efe4cc] border border-[#c8b28e] text-xs font-mono text-[#3d2814]"
                  >
                    {k}: <strong>{String(v)}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
