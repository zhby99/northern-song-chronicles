import { useRef, useState } from 'react'
import { BUILDING_DB_MAP } from '../../../data/gameDb'
import { useGameStore } from '../../../store/useGameStore'
import type { SaveSlotId } from '../../../types/game'
import { formatSongDate } from '../../../utils/mapMath'
import {
  downloadSaveAsJsonFile,
  parseSaveJsonFile,
  putSaveEnvelope,
  SAVE_SLOT_DEFS,
} from '../../../utils/saveManager'
import { formatSavedTime } from '../menuShared'

interface SaveLoadTabProps {
  mode: 'save' | 'load'
  locationLabel: string
}

export function SaveLoadTab({ mode, locationLabel }: SaveLoadTabProps) {
  const dayCount = useGameStore((s) => s.dayCount)
  const shichenIdx = useGameStore((s) => s.shichenIdx)
  const viewMode = useGameStore((s) => s.viewMode)
  const activeBuildingInteriorId = useGameStore((s) => s.activeBuildingInteriorId)
  const saveSlots = useGameStore((s) => s.saveSlots)
  const saveBusy = useGameStore((s) => s.saveBusy)
  const saveNotice = useGameStore((s) => s.saveNotice)

  const buildSaveEnvelope = useGameStore((s) => s.buildSaveEnvelope)
  const saveToSlot = useGameStore((s) => s.saveToSlot)
  const loadFromEnvelope = useGameStore((s) => s.loadFromEnvelope)
  const removeSaveSlot = useGameStore((s) => s.removeSaveSlot)
  const setSaveNotice = useGameStore((s) => s.setSaveNotice)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [saveNoteDraft, setSaveNoteDraft] = useState('')
  const [importTargetSlot, setImportTargetSlot] = useState<SaveSlotId | 'DIRECT_LOAD'>(
    'DIRECT_LOAD',
  )

  const activeInteriorBldg = activeBuildingInteriorId
    ? BUILDING_DB_MAP[activeBuildingInteriorId]
    : null

  const handleImportFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const parsed = await parseSaveJsonFile(file)
      if (importTargetSlot === 'DIRECT_LOAD') {
        loadFromEnvelope(parsed, true)
      } else {
        const rebound = { ...parsed, slotId: importTargetSlot }
        await putSaveEnvelope(rebound)
        await useGameStore.getState().refreshSaveSlots()
        setSaveNotice({
          text: `已将外部卷宗【${file.name}】验证并导入至【${importTargetSlot.toUpperCase()}】，可随时点击读取！`,
          tone: 'success',
        })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '导入 JSON 卷宗失败'
      setSaveNotice({ text: msg, tone: 'error' })
    }
  }

  return (
    <div className="space-y-3.5 text-xs sm:text-sm">
      <div className="p-3.5 rounded bg-[#efe4cc] border border-[#c8b28e] flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <div className="text-xs text-[#6b5033]">当前实时时空锚点</div>
          <div className="font-bold song-serif text-base text-[#23180f]">
            {formatSongDate(dayCount, shichenIdx)} · {locationLabel}（
            {viewMode === 'world'
              ? '第一层：天下山海舆图'
              : viewMode === 'building'
                ? `第三层：${activeInteriorBldg?.name ?? '建筑内景'}`
                : '第二层：地区半3D全景'}
            ）
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mode === 'save' ? (
            <>
              <input
                type="text"
                value={saveNoteDraft}
                onChange={(e) => setSaveNoteDraft(e.target.value)}
                placeholder="可选：输入存档手札备注…"
                className="px-3 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] w-56 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  const snap = buildSaveEnvelope('slot-1', saveNoteDraft || '手动导出快照')
                  downloadSaveAsJsonFile(snap)
                  setSaveNotice({
                    text: '已将当前实时进度导出为本地 .json 卷宗文件！',
                    tone: 'success',
                  })
                }}
                className="px-3.5 py-1.5 rounded bg-[#261910] hover:bg-[#3d291a] text-amber-200 border border-[#c89d54] font-bold song-serif text-xs cursor-pointer"
              >
                ⬇ 导出当前状态 (.json)
              </button>
            </>
          ) : (
            <>
              <select
                value={importTargetSlot}
                onChange={(e) =>
                  setImportTargetSlot(e.target.value as SaveSlotId | 'DIRECT_LOAD')
                }
                className="px-2.5 py-1.5 rounded bg-[#fffaf0] border border-[#9e8462] text-[#23180f] text-xs cursor-pointer"
              >
                <option value="DIRECT_LOAD">导入后立即启封读取</option>
                {SAVE_SLOT_DEFS.filter((d) => !d.isAuto).map((d) => (
                  <option key={d.slotId} value={d.slotId}>
                    导入并存入：{d.label}
                  </option>
                ))}
              </select>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImportFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif text-xs cursor-pointer shadow"
              >
                ⬆ 从本地导入存档 (.json)
              </button>
            </>
          )}
        </div>
      </div>

      {saveNotice && (
        <div
          className={`px-3.5 py-2.5 rounded border font-medium text-xs ${
            saveNotice.tone === 'error'
              ? 'bg-[#fee2e2] border-[#dc2626] text-[#7f1d1d]'
              : 'bg-[#e3f1e8] border-[#6ca384] text-[#134e32]'
          }`}
        >
          {saveNotice.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto scroll-thin pr-1">
        {SAVE_SLOT_DEFS.map((def) => {
          const env = saveSlots[def.slotId]
          return (
            <div
              key={def.slotId}
              className={`p-3.5 rounded-md border flex flex-col justify-between gap-2.5 ${
                def.isAuto
                  ? 'bg-[#efe8d8] border-[#9e8462] md:col-span-2'
                  : 'bg-[#efe4cc] border-[#c8b28e]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-8 h-8 rounded flex items-center justify-center song-serif font-bold text-xs shrink-0 ${
                      env
                        ? 'bg-[#8f1d14] text-[#fff8eb] border border-[#f5cb5c]'
                        : 'bg-[#cbb693] text-[#5c4630]'
                    }`}
                  >
                    {def.badge}
                  </span>
                  <div>
                    <div className="song-serif font-bold text-sm sm:text-base text-[#23180f]">
                      {def.label}
                    </div>
                    {env ? (
                      <div className="text-xs text-[#781710] font-medium">
                        {env.summary.songDate} · {env.summary.regionName}
                        {env.summary.buildingName
                          ? ` > ${env.summary.buildingName}`
                          : env.summary.viewMode === 'world'
                            ? '（天下舆图）'
                            : '（地区全景）'}
                      </div>
                    ) : (
                      <div className="text-xs text-[#7a6042]">空置卷宗 · 尚未封存记录</div>
                    )}
                  </div>
                </div>

                {env && (
                  <span className="font-mono text-[11px] text-[#5e472d] shrink-0">
                    {formatSavedTime(env.savedAt)}
                  </span>
                )}
              </div>

              {env && (
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#faf3e3] border border-[#cbb693] rounded px-3 py-1.5 text-xs">
                  <span className="font-mono text-[#3d2b19]">
                    血 {env.summary.hp} · 内 {env.summary.mp}
                    {typeof env.summary.combatExp === 'number'
                      ? ` · 战经 ${env.summary.combatExp}`
                      : ''}{' '}
                    · 银 {env.summary.silver}两 · 粮 {env.summary.food}份
                  </span>
                  {env.note && (
                    <span className="text-[#6b5235] italic truncate max-w-[220px]">
                      “{env.note}”
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-end gap-2 pt-0.5 text-xs">
                {mode === 'save' && !def.isAuto && (
                  <button
                    type="button"
                    disabled={saveBusy}
                    onClick={() => {
                      void saveToSlot(def.slotId, saveNoteDraft)
                      setSaveNoteDraft('')
                    }}
                    className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                  >
                    {env ? '覆盖封存' : '封入此卷'}
                  </button>
                )}

                {env && (
                  <>
                    <button
                      type="button"
                      onClick={() => loadFromEnvelope(env, true)}
                      className="px-3 py-1.5 rounded bg-[#1f5c3a] hover:bg-[#277048] text-[#fff8eb] font-bold song-serif cursor-pointer transition"
                    >
                      启封读取
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadSaveAsJsonFile(env)}
                      className="px-2.5 py-1.5 rounded bg-[#faf3e3] hover:bg-[#e5d6b8] border border-[#9e8462] text-[#3d2812] cursor-pointer"
                    >
                      导出JSON
                    </button>
                    <button
                      type="button"
                      disabled={saveBusy}
                      onClick={() => void removeSaveSlot(def.slotId)}
                      className="px-2.5 py-1.5 rounded bg-[#f8e8e6] hover:bg-[#f2cfcb] border border-[#c98a83] text-[#8f1d14] cursor-pointer"
                    >
                      抹除
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
