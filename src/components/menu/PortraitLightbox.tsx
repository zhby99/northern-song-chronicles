import { X } from 'lucide-react'
import type { CompiledNpcRecord } from '../../types/game'
import { useLazyImage } from '../../utils/assetLoader'
import type { LightboxState } from './menuShared'

interface PortraitLightboxProps {
  lightbox: LightboxState | null
  onClose: () => void
  onSwitchNpcMode: (npc: CompiledNpcRecord, mode: 'fullbody' | 'avatar') => void
}

export function PortraitLightbox({
  lightbox,
  onClose,
  onSwitchNpcMode,
}: PortraitLightboxProps) {
  const { status, loadedUrl } = useLazyImage(lightbox?.url)

  if (!lightbox) return null

  return (
    <div
      id="portrait-zoom-lightbox"
      onClick={(e) => {
        e.stopPropagation()
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-[#23170e] text-[#fbf2e0] border-2 border-[#c89d54] rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-[#8c6e46]/60 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="song-serif font-bold text-base sm:text-lg text-amber-200 truncate">
              {lightbox.title}
            </div>
            <div className="text-xs text-[#d6c5a5] truncate mt-0.5">{lightbox.subtitle}</div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {lightbox.npc && (lightbox.npc.avatarUrl || lightbox.npc.templateAvatarUrl) && (
              <div className="flex items-center rounded overflow-hidden border border-[#c89d54]/60 text-xs">
                <button
                  type="button"
                  onClick={() => onSwitchNpcMode(lightbox.npc!, 'fullbody')}
                  className={`px-2.5 py-1 song-serif font-bold cursor-pointer ${
                    lightbox.mode === 'fullbody'
                      ? 'bg-[#8f1d14] text-[#fff8eb]'
                      : 'bg-[#362417] text-[#d6c5a5] hover:bg-[#4a3220]'
                  }`}
                >
                  全身绘卷
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchNpcMode(lightbox.npc!, 'avatar')}
                  className={`px-2.5 py-1 song-serif font-bold cursor-pointer ${
                    lightbox.mode === 'avatar'
                      ? 'bg-[#8f1d14] text-[#fff8eb]'
                      : 'bg-[#362417] text-[#d6c5a5] hover:bg-[#4a3220]'
                  }`}
                >
                  半身头像
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-[#8f1d14] hover:bg-[#a9241a] text-[#fff8eb] text-xs font-bold song-serif flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>关闭大图 (ESC)</span>
            </button>
          </div>
        </div>

        <div
          onClick={onClose}
          title="点击画面任意处收起大图"
          className="flex-1 min-h-0 p-4 bg-[#140d08] flex items-center justify-center overflow-auto cursor-zoom-out"
        >
          {loadedUrl ? (
            <img
              src={loadedUrl}
              alt={lightbox.title}
              decoding="async"
              className="max-h-[76vh] max-w-full w-auto h-auto object-contain rounded border border-[#c89d54]/50 shadow-2xl"
            />
          ) : (
            <div className="py-24 px-12 text-sm song-serif text-[#d6c5a5]">
              {status === 'error' ? '画卷加载失败' : '正在展卷调阅高清丹青……'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
